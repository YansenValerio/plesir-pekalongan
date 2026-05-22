import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTripStore } from '@/stores/tripStore'
import { generateItinerary } from '@/lib/gemini'
import type { Companion, StayType, BudgetTier, WizardData } from '@/types'

// ── Constants ──────────────────────────────────────────────────────────────────

const COMPANIONS: { id: Companion; label: string; label_en: string; icon: string }[] = [
  { id: 'solo', label: 'Sendiri', label_en: 'Solo', icon: '🧍' },
  { id: 'couple', label: 'Berdua', label_en: 'Couple', icon: '👫' },
  { id: 'family', label: 'Keluarga', label_en: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'friends', label: 'Bersama Teman', label_en: 'With Friends', icon: '👥' },
]

const INTERESTS = [
  'Pantai', 'Batik & Kerajinan', 'Kuliner Khas', 'Wisata Religi',
  'Petualangan Alam', 'Hidden Gems', 'Belanja', 'Festival',
  'Seni & Budaya', 'Spa & Relaksasi', 'Ramah Anak', 'Akses Difabel',
]

const FOODS = ['Halal', 'Vegan', 'Pedas', 'Seafood', 'Tidak ada preferensi']

const STAYS: { id: StayType; label: string; label_en: string }[] = [
  { id: 'hotel', label: 'Hotel & Resort', label_en: 'Hotel & Resort' },
  { id: 'homestay', label: 'Homestay', label_en: 'Homestay' },
  { id: 'budget', label: 'Hemat / Budget', label_en: 'Budget' },
]

const TIERS: { id: BudgetTier; label: string; range: string; cap: number }[] = [
  { id: 'backpacker', label: 'Backpacker', range: '< Rp 1jt', cap: 1000000 },
  { id: 'standard', label: 'Standard', range: 'Rp 1–3jt', cap: 3000000 },
  { id: 'premium', label: 'Premium', range: 'Rp 3–6jt', cap: 6000000 },
  { id: 'luxury', label: 'Luxury', range: 'Rp 6jt+', cap: 10000000 },
]

const MONTH_NAMES_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const WEEK_DAYS_ID = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

// ── Wizard background (shared across loading and main layout) ──────────────────
const WIZARD_GRADIENT = 'linear-gradient(135deg, #0A4D68 0%, #043545 50%, #088395 100%)'

function WizardBg() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: WIZARD_GRADIENT }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at 30% 40%, rgba(8,131,149,.4) 0%, transparent 50%),
                            radial-gradient(ellipse at 70% 70%, rgba(242,169,59,.15) 0%, transparent 50%)`,
        }}
      />
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function RencanaWizardPage() {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const {
    step, data,
    setStep, nextStep, prevStep,
    setCompanion, toggleInterest, toggleFood, setStay, setDateRange, setBudget,
    setItinerary,
  } = useTripStore()

  const [isGenerating, setIsGenerating] = useState(false)
  const [genError, setGenError] = useState<string | null>(null)

  // Initialize step to 1 when landing from reset (step === 0)
  useEffect(() => {
    if (step < 1) setStep(1)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const currentStep = Math.max(1, step)

  function canProceed(): boolean {
    if (currentStep === 1) return data.companion !== null
    if (currentStep === 2) return data.interests.length > 0
    if (currentStep === 3) return data.startDate !== null && data.endDate !== null
    return true
  }

  async function handleSubmit() {
    setIsGenerating(true)
    setGenError(null)
    try {
      const result = await generateItinerary(data)
      setItinerary(result)
      setIsGenerating(false)
      navigate('/rencana/hasil')
    } catch (err) {
      console.error('[Rencana] generateItinerary error:', err)
      setGenError(isEn ? 'Something went wrong. Please try again.' : 'Terjadi kesalahan. Coba lagi.')
      setIsGenerating(false)
    }
  }

  // ── Loading screen ───────────────────────────────────────────────────────────
  if (isGenerating) {
    return (
      <div
        className="min-h-screen relative flex flex-col items-center justify-center text-white"
        style={{ background: WIZARD_GRADIENT }}
      >
        <WizardBg />
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div
            className="mb-6"
            style={{
              width: 56, height: 56, borderRadius: '50%',
              border: '4px solid rgba(255,255,255,.15)',
              borderTopColor: 'var(--sun)',
              animation: 'spin 1s linear infinite',
            }}
          />
          <h2 className="serif text-white mb-3" style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>
            {isEn ? 'Crafting your itinerary...' : 'Menyusun rencana terbaikmu...'}
          </h2>
          <p className="text-white/70 text-[15px] max-w-[400px] leading-relaxed">
            {isEn
              ? 'AI is personalizing a Pekalongan itinerary just for you. This takes a few seconds.'
              : 'AI sedang meracik itinerary Pekalongan yang dipersonalisasi. Ini butuh beberapa detik.'}
          </p>
          {genError && (
            <div
              className="mt-6 px-6 py-3 rounded-xl text-[14px] flex items-center gap-4"
              style={{ background: 'rgba(199,62,58,.2)', border: '1px solid rgba(199,62,58,.5)' }}
            >
              {genError}
              <button
                className="underline opacity-80 hover:opacity-100"
                onClick={() => { setGenError(null); setIsGenerating(false) }}
              >
                {isEn ? 'Retry' : 'Coba Lagi'}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── Main wizard ──────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen relative flex flex-col text-white"
      style={{ background: WIZARD_GRADIENT }}
    >
      <WizardBg />

      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 z-10" style={{ height: 3, background: 'rgba(255,255,255,.1)' }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${(currentStep / 4) * 100}%`, background: 'var(--sun)' }}
        />
      </div>

      {/* Header — Original: .wizard-head */}
      <div className="absolute top-4 left-0 right-0 z-10 flex items-center justify-between px-8 pt-4">
        <span className="serif text-[20px] font-semibold text-white/90 tracking-tight">
          Plesir <span style={{ color: 'var(--sun)' }}>Pekalongan</span>
        </span>
        <div className="flex items-center gap-3">
          <span
            className="px-4 py-2 rounded-full text-[13px] font-semibold"
            style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)' }}
          >
            {isEn ? `Step ${currentStep} of 4` : `Langkah ${currentStep} dari 4`}
          </span>
          {/* Original: .wizard-close */}
          <button
            onClick={() => navigate('/rencana')}
            className="w-11 h-11 rounded-full grid place-items-center font-bold text-[20px] transition-opacity hover:opacity-80"
            style={{ background: '#fff', color: 'var(--primary)' }}
            aria-label="Tutup wizard"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content — Original: .wizard-content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-[100px] max-w-[1100px] mx-auto w-full">
        {currentStep === 1 && (
          <Step1 data={data} isEn={isEn} setCompanion={setCompanion} />
        )}
        {currentStep === 2 && (
          <Step2 data={data} isEn={isEn} toggleInterest={toggleInterest} toggleFood={toggleFood} setStay={setStay} />
        )}
        {currentStep === 3 && (
          <Step3 data={data} isEn={isEn} setDateRange={setDateRange} />
        )}
        {currentStep === 4 && (
          <Step4 data={data} isEn={isEn} setBudget={setBudget} />
        )}
      </div>

      {/* Footer navigation — Original: .wizard-footer */}
      <div
        className="relative z-10 flex items-center justify-between px-8 py-6 gap-4"
        style={{ borderTop: '1px solid rgba(255,255,255,.1)' }}
      >
        <button
          onClick={() => currentStep > 1 ? prevStep() : navigate('/rencana')}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[14px] text-white transition-all hover:bg-white/10"
          style={{ border: '1px solid rgba(255,255,255,.3)' }}
        >
          ← {isEn ? 'Back' : 'Kembali'}
        </button>

        {/* Dot progress — Original: .wizard-progress */}
        <div className="flex gap-2 items-center">
          {[1, 2, 3, 4].map(i => (
            <span
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentStep ? 24 : 8,
                height: 8,
                background: i === currentStep ? 'var(--sun)' : 'rgba(255,255,255,.3)',
                display: 'block',
              }}
            />
          ))}
        </div>

        {currentStep < 4 ? (
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[14px] transition-all"
            style={{
              background: canProceed() ? 'rgba(255,255,255,.15)' : 'rgba(255,255,255,.05)',
              border: '1px solid rgba(255,255,255,.3)',
              color: canProceed() ? '#fff' : 'rgba(255,255,255,.4)',
              cursor: canProceed() ? 'pointer' : 'not-allowed',
            }}
          >
            {isEn ? 'Next' : 'Selanjutnya'} →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-[15px] transition-all hover:-translate-y-px"
            style={{
              background: 'linear-gradient(135deg, var(--sun), #e09a2c)',
              color: 'var(--dark)',
              boxShadow: '0 4px 20px rgba(242,169,59,.4)',
            }}
          >
            ✨ {isEn ? 'Create Itinerary' : 'Buat Itinerary'}
          </button>
        )}
      </div>
    </div>
  )
}

// ── Step 1: Companion ──────────────────────────────────────────────────────────

function Step1({
  data, isEn, setCompanion,
}: {
  data: WizardData; isEn: boolean; setCompanion: (c: Companion) => void
}) {
  return (
    <>
      <h2 className="serif text-white mb-3" style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1 }}>
        {isEn ? 'Who are you traveling with?' : 'Siapa yang menemanimu?'}
      </h2>
      <p className="text-white/80 text-[16px] max-w-[560px] mb-12">
        {isEn
          ? "We'll tailor our recommendations to match your travel style."
          : 'Kami akan menyesuaikan rekomendasi sesuai jenis perjalananmu.'}
      </p>
      {/* Original: .companion-grid — grid 4-col, gap 16, max-w 880 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-[880px] w-full">
        {COMPANIONS.map(c => (
          <button
            key={c.id}
            onClick={() => setCompanion(c.id)}
            className="flex flex-col items-center justify-center gap-3.5 p-5 rounded-2xl transition-all duration-200 mx-auto w-full"
            style={{
              aspectRatio: '1 / 1',
              maxWidth: 200,
              background: data.companion === c.id ? 'rgba(242,169,59,.2)' : 'rgba(255,255,255,.1)',
              border: `1px solid ${data.companion === c.id ? 'var(--sun)' : 'rgba(255,255,255,.2)'}`,
              backdropFilter: 'blur(10px)',
            }}
          >
            <span style={{ fontSize: 42 }}>{c.icon}</span>
            <span className="font-semibold text-white text-[15px]">{isEn ? c.label_en : c.label}</span>
          </button>
        ))}
      </div>
    </>
  )
}

// ── Step 2: Interests, Food, Stay ─────────────────────────────────────────────

function Step2({
  data, isEn, toggleInterest, toggleFood, setStay,
}: {
  data: WizardData; isEn: boolean;
  toggleInterest: (i: string) => void;
  toggleFood: (f: string) => void;
  setStay: (s: StayType) => void;
}) {
  return (
    <>
      <h2 className="serif text-white mb-3" style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1 }}>
        {isEn ? 'Tell us your interests!' : 'Ceritakan minatmu!'}
      </h2>
      <p className="text-white/80 text-[16px] max-w-[560px] mb-10">
        {isEn
          ? 'Beaches, batik villages, local food markets? We have it all.'
          : 'Pantai pesisir, kampung batik, atau kuliner pasar? Kami punya semuanya.'}
      </p>

      {/* Interests — Original: .tag-cloud */}
      <div className="flex flex-wrap gap-2.5 justify-center max-w-[800px] mb-8">
        {INTERESTS.map(t => (
          <TagPill key={t} label={t} selected={data.interests.includes(t)} onClick={() => toggleInterest(t)} />
        ))}
      </div>

      <p className="text-[14px] text-white/80 mb-4 font-semibold">
        {isEn ? 'Food preferences' : 'Preferensi makanan'}
      </p>
      <div className="flex flex-wrap gap-2.5 justify-center max-w-[800px] mb-8">
        {FOODS.map(t => (
          <TagPill key={t} label={t} selected={data.food.includes(t)} onClick={() => toggleFood(t)} />
        ))}
      </div>

      <p className="text-[14px] text-white/80 mb-4 font-semibold">
        {isEn ? 'Accommodation preference' : 'Di mana kamu ingin menginap?'}
      </p>
      <div className="flex flex-wrap gap-2.5 justify-center">
        {STAYS.map(s => (
          <TagPill key={s.id} label={isEn ? s.label_en : s.label} selected={data.stay === s.id} onClick={() => setStay(s.id)} />
        ))}
      </div>
    </>
  )
}

// ── Step 3: Date range calendar ───────────────────────────────────────────────

function Step3({
  data, isEn, setDateRange,
}: {
  data: WizardData; isEn: boolean; setDateRange: (s: number, e: number) => void
}) {
  const [base, setBase] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  // pendingStart: first click done, awaiting second click
  const [pendingStart, setPendingStart] = useState<number | null>(null)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayTs = today.getTime()

  // Displayed start/end: use pendingStart for "in progress" or confirmed store dates
  const displayStart = pendingStart ?? data.startDate
  const displayEnd = pendingStart ? null : data.endDate

  function handleDayClick(ts: number) {
    if (pendingStart !== null) {
      // Second click — commit range to store
      if (ts <= pendingStart) {
        setDateRange(ts, pendingStart)
      } else {
        setDateRange(pendingStart, ts)
      }
      setPendingStart(null)
    } else {
      // First click — start fresh selection, clear store range by setting same day
      setPendingStart(ts)
      setDateRange(ts, ts) // 1-day placeholder so validation is satisfied
    }
  }

  function renderCal(monthOffset: number) {
    const m = new Date(base.getFullYear(), base.getMonth() + monthOffset, 1)
    // Mon=0 week start — Original: (m.getDay() + 6) % 7
    const firstDayPad = (m.getDay() + 6) % 7
    const daysInMonth = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate()
    const cells: (Date | null)[] = []
    for (let i = 0; i < firstDayPad; i++) cells.push(null)
    for (let i = 1; i <= daysInMonth; i++) cells.push(new Date(m.getFullYear(), m.getMonth(), i))

    const monthLabel = `${MONTH_NAMES_ID[m.getMonth()]} ${m.getFullYear()}`

    return (
      <div
        className="rounded-[18px] p-[22px]"
        style={{ background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.2)' }}
      >
        {/* Cal header — Original: .cal-head */}
        <div className="flex items-center justify-between mb-4">
          {monthOffset === 0 ? (
            <button
              onClick={() => setBase(new Date(base.getFullYear(), base.getMonth() - 1, 1))}
              className="w-7 h-7 grid place-items-center text-white hover:bg-white/10 rounded-full text-[18px] transition-colors"
            >
              ←
            </button>
          ) : <span className="w-7" />}
          <h4 className="serif text-white text-[22px] font-medium">{monthLabel}</h4>
          {monthOffset === 1 ? (
            <button
              onClick={() => setBase(new Date(base.getFullYear(), base.getMonth() + 1, 1))}
              className="w-7 h-7 grid place-items-center text-white hover:bg-white/10 rounded-full text-[18px] transition-colors"
            >
              →
            </button>
          ) : <span className="w-7" />}
        </div>

        {/* Day of week labels — Original: .cal-weeks */}
        <div
          className="grid grid-cols-7 gap-1 text-[11px] text-center pb-2 mb-2"
          style={{ color: 'rgba(255,255,255,.5)', borderBottom: '1px solid rgba(255,255,255,.1)' }}
        >
          {WEEK_DAYS_ID.map(d => <span key={d}>{d}</span>)}
        </div>

        {/* Day cells — Original: .cal-days */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (!d) return <span key={`e-${i}`} />
            const ts = d.getTime()
            const isPast = ts < todayTs
            const isStart = displayStart !== null && ts === displayStart
            const isEnd = displayEnd !== null && ts === displayEnd
            const inRange = displayStart !== null && displayEnd !== null && ts > displayStart && ts < displayEnd

            let bg = 'transparent'
            let color = '#fff'
            let borderRadius = '8px'
            let fontWeight: number | string = 'normal'

            if (isStart || isEnd) {
              bg = 'var(--sun)'; color = 'var(--dark)'; fontWeight = 700
              if (isStart && isEnd) borderRadius = '8px'
              else if (isStart) borderRadius = '8px 0 0 8px'
              else borderRadius = '0 8px 8px 0'
            } else if (inRange) {
              bg = 'rgba(242,169,59,.25)'; borderRadius = '0'
            }

            return (
              <span
                key={i}
                onClick={isPast ? undefined : () => handleDayClick(ts)}
                className={`text-[14px] select-none transition-all duration-100 ${isPast ? 'opacity-30' : !isStart && !isEnd && !inRange ? 'hover:bg-white/10' : ''}`}
                style={{
                  aspectRatio: '1 / 1',
                  display: 'grid',
                  placeItems: 'center',
                  background: bg,
                  color,
                  borderRadius,
                  fontWeight,
                  cursor: isPast ? 'default' : 'pointer',
                }}
              >
                {d.getDate()}
              </span>
            )
          })}
        </div>
      </div>
    )
  }

  const durasi = data.startDate && data.endDate
    ? Math.max(1, Math.round((data.endDate - data.startDate) / 86400000) + 1)
    : null

  const fmtDate = (ts: number) => {
    const d = new Date(ts)
    return `${d.getDate()} ${MONTH_NAMES_ID[d.getMonth()]} ${d.getFullYear()}`
  }

  return (
    <>
      <h2 className="serif text-white mb-3" style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1 }}>
        {isEn ? 'When does your adventure begin?' : 'Kapan petualanganmu dimulai?'}
      </h2>
      <p className="text-white/80 text-[16px] max-w-[560px] mb-8">
        {isEn
          ? 'Select your travel dates and discover the best spots for your visit.'
          : 'Pilih tanggal perjalanan dan temukan tempat-tempat terbaik selama kunjunganmu.'}
      </p>

      {/* Dual calendar — Original: .cal-grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[900px] w-full mb-6">
        {renderCal(0)}
        {renderCal(1)}
      </div>

      {/* Range summary */}
      {pendingStart ? (
        <p className="text-white/50 text-[13px]">
          {isEn ? `${fmtDate(pendingStart)} selected → click an end date` : `${fmtDate(pendingStart)} dipilih → klik tanggal akhir`}
        </p>
      ) : data.startDate && data.endDate && durasi ? (
        <div
          className="px-6 py-3 rounded-full text-[14px] font-semibold"
          style={{ background: 'rgba(242,169,59,.15)', border: '1px solid rgba(242,169,59,.4)', color: 'var(--sun)' }}
        >
          {fmtDate(data.startDate)} – {fmtDate(data.endDate)} ({durasi} {isEn ? 'days' : 'hari'})
        </div>
      ) : null}
    </>
  )
}

// ── Step 4: Budget ─────────────────────────────────────────────────────────────

function Step4({
  data, isEn, setBudget,
}: {
  data: WizardData; isEn: boolean; setBudget: (amount: number, tier: BudgetTier | null) => void
}) {
  return (
    <>
      <h2 className="serif text-white mb-3" style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1 }}>
        {isEn ? "What's your budget?" : 'Berapa anggaranmu?'}
      </h2>
      <p className="text-white/80 text-[16px] max-w-[560px] mb-8">
        {isEn
          ? 'Drag the slider to set your total trip budget per person.'
          : 'Geser slider untuk menyesuaikan total budget perjalanan per orang.'}
      </p>

      {/* Budget display + slider — Original: .budget-slider-wrap, .budget-display */}
      <div className="max-w-[600px] w-full mb-8 mx-auto">
        <div className="serif mb-4 text-center" style={{ fontSize: 42, color: 'var(--sun)' }}>
          Rp {data.budget.toLocaleString('id-ID')}
        </div>
        <input
          type="range"
          className="budget-slider"
          min={500000}
          max={10000000}
          step={250000}
          value={data.budget}
          onChange={e => setBudget(Number(e.target.value), null)}
        />
        <div className="flex justify-between mt-2 text-[12px]" style={{ color: 'rgba(255,255,255,.6)' }}>
          <span>Rp 500rb</span>
          <span>Rp 10jt+</span>
        </div>
      </div>

      {/* Tier quick-select — Original: tag-pill grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-[720px] w-full">
        {TIERS.map(t => (
          <button
            key={t.id}
            onClick={() => setBudget(t.cap, t.id)}
            className="flex flex-col gap-1 px-4 py-4 rounded-2xl transition-all duration-150 text-left"
            style={{
              background: data.budgetTier === t.id ? 'rgba(8,131,149,.4)' : 'rgba(255,255,255,.08)',
              border: `1px solid ${data.budgetTier === t.id ? 'var(--secondary)' : 'rgba(255,255,255,.3)'}`,
              color: '#fff',
            }}
          >
            <span className="font-bold text-[14px]">{t.label}</span>
            <span className="text-[11px]" style={{ color: 'rgba(255,255,255,.7)' }}>{t.range}</span>
          </button>
        ))}
      </div>
    </>
  )
}

// ── Shared TagPill ─────────────────────────────────────────────────────────────

function TagPill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2.5 rounded-full text-[14px] font-medium transition-all duration-150 text-white"
      style={{
        background: selected ? 'var(--secondary)' : 'rgba(255,255,255,.08)',
        border: `1px solid ${selected ? 'var(--secondary)' : 'rgba(255,255,255,.3)'}`,
      }}
    >
      {label}
    </button>
  )
}
