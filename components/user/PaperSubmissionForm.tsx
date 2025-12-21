'use client'

import { useState } from 'react'
import { collection, query, where, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage, auth } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Upload, FileText, AlertCircle, CheckCircle, Loader2, FileCheck } from 'lucide-react'

interface PaperSubmissionFormProps {
  userId: string
  registrationId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export default function PaperSubmissionForm({ userId, registrationId, onSuccess, onCancel }: PaperSubmissionFormProps) {
  const [form, setForm] = useState({
    paperTitle: '',
    paperAbstract: '',
    uploadedFile: null as File | null,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' })

  const validateField = (name: string, value: string | File | null): string => {
    switch (name) {
      case 'paperTitle':
        if (!value || (typeof value === 'string' && value.trim().length === 0)) {
          return 'Paper title is required'
        }
        return ''
      case 'paperAbstract':
        if (!value || (typeof value === 'string' && value.trim().length === 0)) {
          return 'Paper abstract is required'
        }
        if (typeof value === 'string' && value.trim().length < 150) {
          return 'Abstract should be at least 150 words'
        }
        return ''
      case 'uploadedFile':
        if (!value) {
          return 'File upload is required'
        }
        if (value instanceof File && !value.name.endsWith('.docx')) {
          return 'Please upload a DOCX file'
        }
        return ''
      default:
        return ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setForm({ ...form, uploadedFile: file })
      if (errors.uploadedFile) {
        setErrors({ ...errors, uploadedFile: validateField('uploadedFile', file) })
      }
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors({ ...errors, [name]: error })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: '', message: '' })

    // Validate all fields
    const newErrors: { [key: string]: string } = {}
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key as keyof typeof form])
      if (error) {
        newErrors[key] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setStatus({ type: 'error', message: 'Please fix the errors in the form before submitting.' })
      return
    }

    setLoading(true)

    try {
      // Upload file to Firebase Storage
      const file = form.uploadedFile!
      const timestamp = Date.now()
      const fileName = `${timestamp}_${file.name}`
      const storageRef = ref(storage, `papers/${fileName}`)

      await uploadBytes(storageRef, file)
      const fileUrl = await getDownloadURL(storageRef)

      // Update registration document with paper details
      const registrationRef = doc(db, 'registrations', registrationId)
      await updateDoc(registrationRef, {
        presentingPaper: true,
        paperTitle: form.paperTitle,
        paperAbstract: form.paperAbstract,
        fileUrl,
        uploadedFileName: file.name,
        storageFileName: fileName,
        paperUploadedAt: serverTimestamp(),
        paperStatus: 'pending', // Default status: pending, accepted, rejected
        paymentProofUrl: null,
        paymentProofUploadedAt: null,
      })

      setStatus({ type: 'success', message: 'Paper submitted successfully!' })
      setForm({ paperTitle: '', paperAbstract: '', uploadedFile: null })
      setErrors({})
      
      // Call success callback to refresh data
      setTimeout(() => {
        onSuccess?.()
      }, 1500)
    } catch (error: any) {
      console.error('Error submitting paper:', error)
      setStatus({ type: 'error', message: error.message || 'Failed to submit paper. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Submit New Paper
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="paperTitle" className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
              Paper Title *
            </Label>
            <div className="relative">
              <Input
                id="paperTitle"
                name="paperTitle"
                value={form.paperTitle}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your paper title"
                required
                className={`transition-all duration-200 ${
                  errors.paperTitle
                    ? 'border-destructive focus:ring-destructive/20'
                    : 'focus:ring-primary/20'
                }`}
                aria-invalid={!!errors.paperTitle}
              />
              {!errors.paperTitle && form.paperTitle && (
                <CheckCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
              )}
            </div>
            {errors.paperTitle && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.paperTitle}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="paperAbstract" className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
              Abstract * <span className="text-xs text-muted-foreground font-normal">(min. 150 words)</span>
            </Label>
            <div className="relative">
              <Textarea
                id="paperAbstract"
                name="paperAbstract"
                value={form.paperAbstract}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your paper abstract (minimum 150 words)"
                required
                className={`min-h-[150px] transition-all duration-200 ${
                  errors.paperAbstract
                    ? 'border-destructive focus:ring-destructive/20'
                    : 'focus:ring-primary/20'
                }`}
                aria-invalid={!!errors.paperAbstract}
              />
              {!errors.paperAbstract && form.paperAbstract && (
                <CheckCircle className="absolute right-2 top-3 w-4 h-4 text-green-600" />
              )}
            </div>
            {errors.paperAbstract && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.paperAbstract}
              </p>
            )}
            {form.paperAbstract && !errors.paperAbstract && (
              <p className="text-xs text-muted-foreground">
                Word count: {form.paperAbstract.trim().split(/\s+/).filter(Boolean).length} words
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="uploadedFile" className="flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-muted-foreground" />
              Upload Paper (DOCX) *
            </Label>
            <div className="relative">
              <div className="border-2 border-dashed rounded-lg p-6 bg-muted/20 hover:bg-muted/30 transition-colors">
                <Input
                  id="uploadedFile"
                  name="uploadedFile"
                  type="file"
                  onChange={handleFileChange}
                  accept=".docx"
                  required
                  className="cursor-pointer file:mr-4 file:px-4 file:py-2.5 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground file:cursor-pointer hover:file:bg-primary/90 transition-all duration-200 file:font-medium"
                  aria-invalid={!!errors.uploadedFile}
                />
                {form.uploadedFile && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileCheck className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{form.uploadedFile.name}</span>
                    <span className="text-xs">({(form.uploadedFile.size / 1024).toFixed(2)} KB)</span>
                  </div>
                )}
              </div>
            </div>
            {errors.uploadedFile && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.uploadedFile}
              </p>
            )}
          </div>

          {status.message && (
            <div
              className={`flex items-center gap-3 p-4 rounded-lg border ${
                status.type === 'error'
                  ? 'bg-destructive/10 border-destructive/20 text-destructive'
                  : 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400'
              }`}
            >
              {status.type === 'error' ? (
                <AlertCircle className="w-5 h-5 shrink-0" />
              ) : (
                <CheckCircle className="w-5 h-5 shrink-0" />
              )}
              <p className="font-semibold text-sm">{status.message}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setForm({ paperTitle: '', paperAbstract: '', uploadedFile: null })
                setErrors({})
                setStatus({ type: '', message: '' })
                if (onCancel) {
                  onCancel()
                }
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
              size="lg"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </span>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Paper
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

