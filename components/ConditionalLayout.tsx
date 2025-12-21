'use client'

import { usePathname } from 'next/navigation'
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Hide TopBar, Header, and Footer for user and admin panels
  const isPanelRoute = pathname?.startsWith('/user') || pathname?.startsWith('/admin');
  
  if (isPanelRoute) {
    return <>{children}</>;
  }
  
  return (
    <>
      <TopBar />
      <Header />
      {children}
      <Footer />
    </>
  );
}

