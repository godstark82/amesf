'use client'

import { useEffect, useState } from 'react'
import { collection, query, where, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Download, Calendar, CheckCircle2, XCircle, Clock, Plus, Upload, Receipt, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PaperSubmissionForm from '@/components/user/PaperSubmissionForm'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage, db, auth } from '@/lib/firebase'

export default function UserSubmissionsPage() {
  const [user, setUser] = useState<any>(null)
  const [registration, setRegistration] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)
  const [showPaymentProofForm, setShowPaymentProofForm] = useState(false)
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null)
  const [uploadingProof, setUploadingProof] = useState(false)

  const fetchRegistration = async (currentUser: any) => {
    try {
      const q = query(
        collection(db, 'registrations'),
        where('userId', '==', currentUser.uid)
      )
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0]
        setRegistration({ id: docSnap.id, ...docSnap.data() })
      } else {
        setRegistration(null)
      }
    } catch (error) {
      console.error('Error fetching registration:', error)
      setRegistration(null)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const unsubscribe = onAuthStateChanged(auth!, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        await fetchRegistration(currentUser)
      } else {
        setUser(null)
        setRegistration(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleSubmissionSuccess = async () => {
    setShowSubmissionForm(false)
    if (user) {
      await fetchRegistration(user)
    }
  }

  const handlePaymentProofUpload = async () => {
    if (!paymentProofFile || !registration) return

    setUploadingProof(true)
    try {
      // Upload payment proof to Firebase Storage
      const timestamp = Date.now()
      const fileName = `payment_proof_${timestamp}_${paymentProofFile.name}`
      const storageRef = ref(storage, `payment-proofs/${fileName}`)

      await uploadBytes(storageRef, paymentProofFile)
      const fileUrl = await getDownloadURL(storageRef)

      // Update registration document with payment proof
      const registrationRef = doc(db, 'registrations', registration.id)
      await updateDoc(registrationRef, {
        paymentProofUrl: fileUrl,
        paymentProofFileName: paymentProofFile.name,
        paymentProofStorageFileName: fileName,
        paymentProofUploadedAt: serverTimestamp(),
      })

      // Refresh registration data
      if (user) {
        await fetchRegistration(user)
      }
      setShowPaymentProofForm(false)
      setPaymentProofFile(null)
    } catch (error) {
      console.error('Error uploading payment proof:', error)
      alert('Failed to upload payment proof. Please try again.')
    } finally {
      setUploadingProof(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'text-green-600 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900'
      case 'rejected':
        return 'text-red-600 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900'
      case 'pending':
      default:
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle2 className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      case 'pending':
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const hasPaper =
    !!registration?.presentingPaper && !!registration?.paperTitle

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Submissions</h1>
          <p className="text-muted-foreground">Manage and view your paper submissions</p>
        </div>
        {!hasPaper && !showSubmissionForm && (
          <Button onClick={() => setShowSubmissionForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Submit Paper
          </Button>
        )}
      </div>

      {hasPaper ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Paper Submission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <FileText className="h-4 w-4" />
                  Paper Title
                </div>
                <p className="text-sm font-medium">{registration.paperTitle}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <FileText className="h-4 w-4" />
                  Abstract
                </div>
                <p className="text-sm leading-relaxed">{registration.paperAbstract}</p>
              </div>

              {registration.fileUrl && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Download className="h-4 w-4" />
                    Uploaded File
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{registration.uploadedFileName}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(registration.fileUrl, '_blank')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2 pt-4 border-t">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Submitted At
                  </div>
                  <p className="text-sm font-medium">
                    {registration.paperUploadedAt && registration.paperUploadedAt.toDate
                      ? new Date(registration.paperUploadedAt.toDate()).toLocaleString()
                      : (registration.paperUploadedAt ? new Date(registration.paperUploadedAt).toLocaleString() : 'N/A')}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Paper Status
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getStatusColor(registration.paperStatus || 'pending')}`}>
                    {getStatusIcon(registration.paperStatus || 'pending')}
                    <p className="text-sm font-medium capitalize">{registration.paperStatus || 'pending'}</p>
                  </div>
                  {registration.paperStatus === 'pending' && (
                    <p className="text-xs text-muted-foreground">
                      Review results will be sent by September 15, 2025
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Link Section */}
              <div className="pt-4 border-t space-y-4">
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                    <CreditCard className="w-4 h-4" />
                    Payment Link
                  </h4>
                  <p className="text-xs text-muted-foreground mb-4">
                    Complete your payment using the link below
                  </p>
                </div>
                <Card className="border-none shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary to-primary/90 text-white py-3">
                    <h5 className="text-lg font-bold">Payment Information</h5>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Institute Name</p>
                          <p className="text-sm font-semibold text-foreground">IILM UNIVERSITY</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Branch Name</p>
                          <p className="text-sm font-semibold text-foreground">IILM University GN</p>
                        </div>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Form Link</p>
                        <a
                          href="https://form.qfixonline.com/internationaladvof"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium underline transition-colors"
                        >
                          <CreditCard className="w-4 h-4" />
                          https://form.qfixonline.com/internationaladvof
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Proof Section */}
              {hasPaper && (
                <div className="pt-4 border-t space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Receipt className="w-4 h-4" />
                        Payment Proof
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload payment proof after completing your payment
                      </p>
                    </div>
                    {!registration.paymentProofUrl && !showPaymentProofForm && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPaymentProofForm(true)}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Proof
                      </Button>
                    )}
                  </div>

                  {showPaymentProofForm && (
                    <div className="space-y-3 p-4 bg-muted/20 rounded-lg border">
                      <div className="space-y-2">
                        <Label htmlFor="paymentProof">Payment Proof (PDF/Image) *</Label>
                        <Input
                          id="paymentProof"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setPaymentProofFile(e.target.files[0])
                            }
                          }}
                          className="cursor-pointer"
                        />
                        {paymentProofFile && (
                          <p className="text-xs text-muted-foreground">
                            Selected: {paymentProofFile.name} ({(paymentProofFile.size / 1024).toFixed(2)} KB)
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setShowPaymentProofForm(false)
                            setPaymentProofFile(null)
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handlePaymentProofUpload}
                          disabled={!paymentProofFile || uploadingProof}
                        >
                          {uploadingProof ? (
                            <>
                              <span className="animate-spin mr-2">⏳</span>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-2" />
                              Upload
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {registration.paymentProofUrl && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Payment proof uploaded</p>
                        <p className="text-xs text-muted-foreground">
                          {registration.paymentProofFileName}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(registration.paymentProofUrl, '_blank')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : !showSubmissionForm ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Submissions</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You haven't submitted any papers yet. Click the button above to submit your first paper.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : registration ? (
        <PaperSubmissionForm
          userId={user?.uid}
          registrationId={registration.id}
          onSuccess={handleSubmissionSuccess}
          onCancel={() => setShowSubmissionForm(false)}
        />
      ) : null}
    </div>
  )
}

