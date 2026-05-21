import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageMeta from '@/components/common/PageMeta'

export default function NotFoundPage() {
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  return (
    <>
      <PageMeta title="404" description="Halaman tidak ditemukan" path="/404" />
      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A4D68 0%, #043545 50%, #088395 100%)' }}
      >
        {/* Decorative radial blobs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse at 20% 30%, rgba(8,131,149,.35) 0%, transparent 55%),
                              radial-gradient(ellipse at 80% 70%, rgba(242,169,59,.12) 0%, transparent 55%)`,
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-[500px]">
          {/* Giant 404 */}
          <div
            className="serif font-bold leading-none mb-6 select-none"
            style={{ fontSize: 'clamp(100px, 20vw, 160px)', color: 'rgba(255,255,255,.08)', letterSpacing: '-0.04em' }}
          >
            404
          </div>

          {/* Wave icon */}
          <div className="-mt-10 mb-6 flex justify-center">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="28" fill="rgba(255,255,255,.1)" />
              <path d="M14 32c2-4 4-6 7-6s5 4 7 4 5-4 7-4 5 2 7 6" stroke="#F2A93B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M14 26c2-4 4-6 7-6s5 4 7 4 5-4 7-4 5 2 7 6" stroke="rgba(255,255,255,.4)" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <h1 className="serif text-white mb-3" style={{ fontSize: 'clamp(24px, 4vw, 32px)' }}>
            {isEn ? 'Page Not Found' : 'Halaman Tidak Ditemukan'}
          </h1>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8">
            {isEn
              ? "The page you're looking for doesn't exist or has been moved. Let's take you back to explore Pekalongan."
              : 'Halaman yang kamu cari tidak ada atau telah dipindahkan. Ayo kembali menjelajahi Pekalongan.'}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-[14px] transition-all hover:-translate-y-px"
              style={{ background: 'var(--sun)', color: 'var(--dark)', boxShadow: '0 4px 20px rgba(242,169,59,.3)' }}
            >
              {isEn ? '← Back to Home' : '← Kembali ke Beranda'}
            </Link>
            <Link
              to="/destinasi"
              className="flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-[14px] text-white transition-all hover:bg-white/15"
              style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)' }}
            >
              {isEn ? 'Explore Destinations' : 'Jelajahi Destinasi'}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
