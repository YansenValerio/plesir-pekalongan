import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Suspense, lazy } from 'react'

import Layout from '@/components/layout/Layout'
import NotFoundPage from '@/pages/NotFoundPage'

// Lazy load pages untuk code splitting
const HomePage = lazy(() => import('@/pages/HomePage'))
const DestinasiPage = lazy(() => import('@/pages/DestinasiPage'))
const DestinasiListingPage = lazy(() => import('@/pages/DestinasiListingPage'))
const DestinasiDetailPage = lazy(() => import('@/pages/DestinasiDetailPage'))
const EventPage = lazy(() => import('@/pages/EventPage'))
const EventDetailPage = lazy(() => import('@/pages/EventDetailPage'))
const BeritaPage = lazy(() => import('@/pages/BeritaPage'))
const BeritaDetailPage = lazy(() => import('@/pages/BeritaDetailPage'))
const RencanaPage = lazy(() => import('@/pages/RencanaPage'))
const RencanaWizardPage = lazy(() => import('@/pages/RencanaWizardPage'))
const RencanaHasilPage = lazy(() => import('@/pages/RencanaHasilPage'))
const KontakPage = lazy(() => import('@/pages/KontakPage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Routes dengan layout (Navbar + Footer) */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/destinasi" element={<DestinasiPage />} />
              <Route path="/destinasi/:kategori" element={<DestinasiListingPage />} />
              <Route path="/destinasi/:kategori/:slug" element={<DestinasiDetailPage />} />
              <Route path="/event" element={<EventPage />} />
              <Route path="/event/:slug" element={<EventDetailPage />} />
              <Route path="/berita" element={<BeritaPage />} />
              <Route path="/berita/:slug" element={<BeritaDetailPage />} />
              <Route path="/kontak" element={<KontakPage />} />
            </Route>

            {/* Trip planner — tanpa layout standard (fullscreen wizard) */}
            <Route path="/rencana" element={<RencanaPage />} />
            <Route path="/rencana/wizard" element={<RencanaWizardPage />} />
            <Route path="/rencana/hasil" element={<RencanaHasilPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}
