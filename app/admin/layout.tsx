'use client'

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Users, FileText, Settings, LogOut, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Submissions",
    icon: FileText,
    href: "/admin/submissions",
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined' || !auth) return

    const checkAdminAndSetUser = async (currentUser: any) => {
      try {
        // Fetch admin emails from Firestore
        const adminDocRef = doc(db, 'admin', 'admins')
        const adminDocSnap = await getDoc(adminDocRef)

        if (adminDocSnap.exists()) {
          const adminData = adminDocSnap.data()
          const adminEmails = adminData.emails || []

          if (Array.isArray(adminEmails) && adminEmails.includes(currentUser.email || '')) {
            // User is an admin
            setUser(currentUser)
          } else {
            // Not an admin, redirect to home
            router.push('/')
          }
        } else {
          // Admin document doesn't exist, redirect to home
          router.push('/')
        }
      } catch (error) {
        console.error('Error checking admin status:', error)
        // On error, redirect to home for security
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await checkAdminAndSetUser(currentUser)
      } else {
        router.push('/')
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut(auth!)
      sessionStorage.clear()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Admin Panel</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    className="px-3 py-2"
                  >
                    <Link href={item.href} className="flex flex-row items-center gap-3 w-full group">
                      <item.icon
                        className={
                          "h-5 w-5 text-primary group-hover:text-primary/90 " +
                          (pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground")
                        }
                      />
                      <span
                        className={
                          "text-base font-medium tracking-wide transition-colors duration-150 " +
                          (pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground")
                        }
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border p-4">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
