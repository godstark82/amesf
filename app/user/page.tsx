'use client'

import { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db, auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LayoutDashboard, FileText, User, Calendar, CheckCircle2 } from 'lucide-react'

export default function UserDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [registration, setRegistration] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const unsubscribe = onAuthStateChanged(auth!, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        
        // Fetch user's registration data
        try {
          const q = query(
            collection(db, 'registrations'),
            where('userId', '==', currentUser.uid)
          )
          const querySnapshot = await getDocs(q)
          
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0]
            setRegistration({ id: doc.id, ...doc.data() })
          }
        } catch (error) {
          console.error('Error fetching registration:', error)
        }
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.email}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registration Status</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {registration ? 'Registered' : 'Not Registered'}
            </div>
            <p className="text-xs text-muted-foreground">
              {registration ? 'You are registered for the conference' : 'Complete your registration'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paper Submissions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {registration?.presentingPaper ? '1' : '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              {registration?.presentingPaper ? 'Paper submitted' : 'No papers submitted'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Category</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {registration?.category ? registration.category.split('(')[0].trim() : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Registration category
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Attending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {registration?.daysAttending || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Conference attendance
            </p>
          </CardContent>
        </Card>
      </div>

      {registration && (
        <Card>
          <CardHeader>
            <CardTitle>Registration Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                <p className="text-sm">{registration.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-sm">{registration.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="text-sm">{registration.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Affiliation</p>
                <p className="text-sm">{registration.affiliation}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Country</p>
                <p className="text-sm">{registration.country}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payment Reference ID</p>
                <p className="text-sm font-mono">{registration.paymentIntentId}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
