import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFloat from '@/components/common/WhatsAppFloat'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  const isHome = pathname === '/'

  return (
    <div className="min-h-screen flex flex-col bg-light">
      <Navbar isHome={isHome} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
