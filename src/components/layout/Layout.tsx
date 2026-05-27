import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFloat from '@/components/common/WhatsAppFloat'
import { useDarkModeStore } from '@/stores/darkModeStore'

export default function Layout() {
  const { pathname } = useLocation()
  const { dark } = useDarkModeStore()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const isHome = pathname === '/'

  return (
    <div className="min-h-screen flex flex-col bg-light dark:bg-[#0c1b27]">
      <Navbar isHome={isHome} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
