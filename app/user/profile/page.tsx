'use client'

import { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db, auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Mail, Phone, Building2, Globe, Calendar, FileText } from 'lucide-react'

export default function UserProfilePage() {
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
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">View and manage your profile information</p>
      </div>

      {registration ? (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    Full Name
                  </div>
                  <p className="text-sm font-medium">{registration.fullName}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </div>
                  <p className="text-sm font-medium">{registration.email}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </div>
                  <p className="text-sm font-medium">{registration.phone}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    Affiliation
                  </div>
                  <p className="text-sm font-medium">{registration.affiliation}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    Country
                  </div>
                  <p className="text-sm font-medium">{registration.country}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    Registration Category
                  </div>
                  <p className="text-sm font-medium">{registration.category}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Days Attending
                  </div>
                  <p className="text-sm font-medium">{registration.daysAttending}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    Paper Submission
                  </div>
                  <p className="text-sm font-medium">
                    {registration.presentingPaper ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No registration found. Please complete your registration first.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

