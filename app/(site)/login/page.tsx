'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, LogIn } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' })

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        if (!value || value.trim().length === 0) {
          return 'Email is required'
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address'
        }
        return ''
      case 'password':
        if (!value || value.trim().length === 0) {
          return 'Password is required'
        }
        return ''
      default:
        return ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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
      if (!auth) {
        throw new Error('Authentication service is not available. Please refresh the page.')
      }

      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password)
      const user = userCredential.user

      // Store user info
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('userEmail', user.email || '')
        sessionStorage.setItem('userId', user.uid)
      }

      // Check if user is an admin by fetching from Firestore
      try {
        const adminDocRef = doc(db, 'admin', 'admins')
        const adminDocSnap = await getDoc(adminDocRef)
        
        if (adminDocSnap.exists()) {
          const adminData = adminDocSnap.data()
          const adminEmails = adminData.emails || []
          
          if (Array.isArray(adminEmails) && adminEmails.includes(user.email || '')) {
            // User is an admin, redirect to admin panel
            router.push('/admin')
            return
          }
        }
      } catch (error) {
        console.error('Error checking admin status:', error)
        // If there's an error checking admin status, proceed as regular user
      }

      // Regular user, redirect to user panel
      router.push('/user')
    } catch (error: any) {
      console.error('Login error:', error)
      let errorMessage = 'Login failed. Please check your credentials and try again.'

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.'
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.'
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled.'
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed login attempts. Please try again later.'
      }

      setStatus({ type: 'error', message: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to manage your submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                Email Address *
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="your.email@example.com"
                  required
                  className={`transition-all duration-200 ${
                    errors.email
                      ? 'border-destructive focus:ring-destructive/20'
                      : 'focus:ring-primary/20'
                  }`}
                  aria-invalid={!!errors.email}
                />
                {!errors.email && form.email && (
                  <CheckCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                )}
              </div>
              {errors.email && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                Password *
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  required
                  className={`transition-all duration-200 pr-10 ${
                    errors.password
                      ? 'border-destructive focus:ring-destructive/20'
                      : 'focus:ring-primary/20'
                  }`}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                {!errors.password && form.password && (
                  <CheckCircle className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                )}
              </div>
              {errors.password && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Logging in...
                </span>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </>
              )}
            </Button>

            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/upload-paper" className="text-primary hover:underline font-medium">
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

