'use client'

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, FileText, LogOut, LayoutDashboard, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/user",
  },
  {
    title: "My Profile",
    icon: User,
    href: "/user/profile",
  },
  {
    title: "My Submissions",
    icon: FileText,
    href: "/user/submissions",
  },
]

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const unsubscribe = onAuthStateChanged(auth!, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        router.push('/')
      }
      setLoading(false)
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
        <Sidebar variant="inset" className="border-r bg-background">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-sm">
                <User className="h-5 w-5" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-semibold truncate">User Panel</span>
                <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="pl-2 text-xs font-semibold text-muted-foreground tracking-wide uppercase mb-1">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          isActive={isActive}
                          className={`
                            px-3 py-2 rounded-md transition-colors duration-150 w-full flex items-center gap-3 group
                            ${isActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-muted-foreground hover:bg-accent hover:text-foreground"}
                          `}
                          aria-current={isActive ? "page" : undefined}
                          tooltip={item.title}
                        >
                          <Link href={item.href} className="flex flex-row items-center gap-3 w-full">
                            <item.icon
                              className={`
                                h-5 w-5 shrink-0
                                ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"}
                              `}
                            />
                            <span className={`text-sm truncate ${isActive ? "text-primary" : "group-hover:text-foreground"}`}>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator className="my-2" />
            <SidebarGroup>
              <SidebarGroupLabel className="sr-only">Back to Home</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className={`
                        px-3 py-2 rounded-md transition-colors duration-150 w-full flex items-center gap-3 group
                        ${pathname === '/' ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-accent hover:text-foreground"}
                      `}
                      tooltip="Back to Home"
                    >
                      <Link href="/" className="flex flex-row items-center gap-3 w-full">
                        <Home
                          className={`
                            h-5 w-5 shrink-0
                            ${pathname === '/' ? "text-primary" : "text-muted-foreground group-hover:text-primary"}
                          `}
                        />
                        <span className="text-sm truncate group-hover:text-foreground">Back to Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive transition-colors gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 overflow-auto">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
