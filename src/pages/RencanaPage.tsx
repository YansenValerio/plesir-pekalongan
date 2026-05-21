import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTripStore } from '@/stores/tripStore'
import PageMeta from '@/components/common/PageMeta'

export default function RencanaPage() {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const reset = useTripStore(s => s.reset)

  function handleStart() {
    reset()
    navigate('/rencana/wizard')
  }

  return (
    <>
    <PageMeta
      title={isEn ? 'AI Trip Planner' : 'Rencanakan Perjalanan AI'}
      description={isEn ? 'Plan your Pekalongan trip with AI. Get a personalized itinerary in seconds.' : 'Rencanakan perjalananmu ke Pekalongan dengan AI. Dapatkan itinerary personal dalam hitungan detik.'}
      path="/rencana"
    />
    <div
      className="min-h-screen relative flex flex-col text-white overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A4D68 0%, #043545 50%, #088395 100%)' }}
    >
      {/* Radial overlays — Original: .wizard-bg::after */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at 30% 40%, rgba(8,131,149,.4) 0%, transparent 50%),
                            radial-gradient(ellipse at 70% 70%, rgba(242,169,59,.15) 0%, transparent 50%)`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 pt-8">
        <span className="serif text-[22px] font-semibold tracking-tight">
          Plesir <span style={{ color: 'var(--sun)' }}>Pekalongan</span>
        </span>
        <a
          href="/"
          className="flex items-center gap-1.5 text-white/70 hover:text-white text-[14px] transition-colors"
        >
          ← {isEn ? 'Back to Home' : 'Kembali ke Beranda'}
        </a>
      </header>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 text-[12px] font-bold tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--sun)' }}>
          <span className="w-10 h-px block" style={{ background: 'var(--sun)' }} />
          AI Trip Planner
          <span className="w-10 h-px block" style={{ background: 'var(--sun)' }} />
        </div>

        <h1 className="serif text-white mb-5" style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', lineHeight: 1.1 }}>
          {isEn ? (
            <>Plan Your Journey<br />to Pekalongan</>
          ) : (
            <>Rencanakan Perjalananmu<br />ke Pekalongan</>
          )}
        </h1>

        <p
          className="text-white/80 max-w-[560px] mb-10 text-[16px] leading-relaxed italic"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {isEn
            ? 'Tell us your preferences, and our AI will craft a personalized day-by-day itinerary just for you.'
            : 'Ceritakan preferensimu, dan AI kami akan meracik itinerary harian yang dipersonalisasi khusus untukmu.'}
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { icon: '🤖', label: isEn ? 'AI Personalized' : 'Dipersonalisasi AI' },
            { icon: '📍', label: isEn ? 'Local Destinations' : 'Destinasi Lokal' },
            { icon: '✨', label: isEn ? 'Free to Use' : 'Gratis' },
          ].map(f => (
            <span
              key={f.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold"
              style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)' }}
            >
              {f.icon} {f.label}
            </span>
          ))}
        </div>

        <button
          onClick={handleStart}
          className="flex items-center gap-3 px-10 py-4 rounded-full font-bold text-[17px] transition-all duration-200 hover:-translate-y-1"
          style={{
            background: 'linear-gradient(135deg, var(--sun), #e09a2c)',
            color: 'var(--dark)',
            boxShadow: '0 8px 32px rgba(242,169,59,.3)',
          }}
        >
          {isEn ? 'Start Planning' : 'Mulai Rencanakan'} →
        </button>

        <p className="mt-8 text-white/35 text-[12px]">Powered by Google Gemini AI</p>
      </div>
    </div>
    </>
  )
}
