import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Suspense, lazy } from 'react'

import Layout from '@/components/layout/Layout'
import NotFoundPage from '@/pages/NotFoundPage'
import ErrorBoundary from '@/components/common/ErrorBoundary'

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

// Admin pages
const AdminLoginPage    = lazy(() => import('@/pages/admin/AdminLoginPage'))
const AdminLayout       = lazy(() => import('@/pages/admin/AdminLayout'))
const AdminDashboard    = lazy(() => import('@/pages/admin/AdminDashboardPage'))
const ProtectedRoute    = lazy(() => import('@/pages/admin/ProtectedRoute'))
const DestinasiListPage = lazy(() => import('@/pages/admin/destinasi/DestinasiListPage'))
const DestinasiFormPage = lazy(() => import('@/pages/admin/destinasi/DestinasiFormPage'))
const BeritaListPage    = lazy(() => import('@/pages/admin/berita/BeritaListPage'))
const BeritaFormPage    = lazy(() => import('@/pages/admin/berita/BeritaFormPage'))
const EventListPage     = lazy(() => import('@/pages/admin/event/EventListPage'))
const EventFormPage     = lazy(() => import('@/pages/admin/event/EventFormPage'))
const PesanListPage     = lazy(() => import('@/pages/admin/pesan/PesanListPage'))
const FaqListPage       = lazy(() => import('@/pages/admin/faq/FaqListPage'))
const FaqFormPage       = lazy(() => import('@/pages/admin/faq/FaqFormPage'))
const GalleryListPage   = lazy(() => import('@/pages/admin/gallery/GalleryListPage'))
const GalleryFormPage   = lazy(() => import('@/pages/admin/gallery/GalleryFormPage'))

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
        <ErrorBoundary fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#043545] text-white flex-col gap-4 px-6 text-center">
            <p className="text-5xl">⚠️</p>
            <h1 className="serif text-2xl">Terjadi Kesalahan</h1>
            <p className="text-white/60 text-sm">Muat ulang halaman atau kembali ke beranda.</p>
            <a href="/" className="px-6 py-3 rounded-full font-semibold text-sm" style={{ background: 'var(--sun)', color: '#1A1A1A' }}>
              Kembali ke Beranda
            </a>
          </div>
        }>
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

            {/* Admin panel */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="destinasi" element={<DestinasiListPage />} />
                <Route path="destinasi/new" element={<DestinasiFormPage />} />
                <Route path="destinasi/:id/edit" element={<DestinasiFormPage />} />
                <Route path="berita" element={<BeritaListPage />} />
                <Route path="berita/new" element={<BeritaFormPage />} />
                <Route path="berita/:id/edit" element={<BeritaFormPage />} />
                <Route path="event" element={<EventListPage />} />
                <Route path="event/new" element={<EventFormPage />} />
                <Route path="event/:id/edit" element={<EventFormPage />} />
                <Route path="faq" element={<FaqListPage />} />
                <Route path="faq/new" element={<FaqFormPage />} />
                <Route path="faq/:id/edit" element={<FaqFormPage />} />
                <Route path="gallery" element={<GalleryListPage />} />
                <Route path="gallery/new" element={<GalleryFormPage />} />
                <Route path="gallery/:id/edit" element={<GalleryFormPage />} />
                <Route path="pesan" element={<PesanListPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  )
}
