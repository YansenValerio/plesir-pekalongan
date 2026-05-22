import { lazy, Suspense, useRef, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import i18n from '@/i18n'
import { useTripStore } from '@/stores/tripStore'
import { formatRupiah, formatRupiahShort } from '@/utils/currency'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import type { Itinerary } from '@/types'

const ItineraryMap = lazy(() => import('@/components/rencana/ItineraryMap'))

const MONTH_NAMES_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des']
const MONTH_NAMES_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function fmtDate(dateStr: string, isEn: boolean): string {
  const d = new Date(dateStr)
  const months = isEn ? MONTH_NAMES_EN : MONTH_NAMES_ID
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export default function RencanaHasilPage() {
  const navigate = useNavigate()
  const isEn = i18n.language === 'en'
  const itinerary = useTripStore(s => s.itinerary)
  const data = useTripStore(s => s.data)
  const reset = useTripStore(s => s.reset)

  const printRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  if (!itinerary) return <Navigate to="/rencana" replace />

  async function downloadPDF() {
    if (!printRef.current) return
    setIsExporting(true)
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])
      const canvas = await html2canvas(printRef.current, { scale: 2, useCORS: true, backgroundColor: '#043545' })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      // Split into multiple A4 pages if content is tall
      const pageHeight = pdf.internal.pageSize.getHeight()
      let yOffset = 0
      while (yOffset < pdfHeight) {
        if (yOffset > 0) pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, -yOffset, pdfWidth, pdfHeight)
        yOffset += pageHeight
      }
      pdf.save(`itinerary-pekalongan.pdf`)
    } catch {
      // silently ignore export errors
    } finally {
      setIsExporting(false)
    }
  }

  function handleRestart() {
    reset()
    navigate('/rencana/wizard')
  }

  const startDateStr = data.startDate
    ? fmtDate(new Date(data.startDate).toISOString().split('T')[0], isEn)
    : (isEn ? 'Flexible' : 'Fleksibel')

  return (
    <div
      className="min-h-screen relative text-white"
      style={{ background: 'linear-gradient(135deg, #0A4D68 0%, #043545 50%, #088395 100%)' }}
    >
      {/* Radial overlays */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 20%, rgba(8,131,149,.3) 0%, transparent 50%),
                            radial-gradient(ellipse at 80% 80%, rgba(242,169,59,.1) 0%, transparent 50%)`,
        }}
      />

      {/* Sticky header */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-6 py-4"
        style={{ background: 'rgba(4,53,69,.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,.1)' }}
      >
        <button
          onClick={handleRestart}
          className="flex items-center gap-2 text-[14px] font-semibold text-white/80 hover:text-white transition-colors"
        >
          ← {isEn ? 'Plan Another Trip' : 'Buat Rencana Baru'}
        </button>
        <span className="serif text-[18px] font-semibold hidden sm:block">
          Plesir <span style={{ color: 'var(--sun)' }}>Pekalongan</span>
        </span>
        <button
          onClick={downloadPDF}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-all hover:bg-white/10"
          style={{ border: '1px solid rgba(255,255,255,.3)' }}
        >
          {isExporting ? '⏳' : '⬇'} {isEn ? 'Download PDF' : 'Unduh PDF'}
        </button>
      </div>

      {/* Printable content */}
      <div ref={printRef} className="relative z-10">
        <ItineraryContent itinerary={itinerary} isEn={isEn} startDateStr={startDateStr} />
      </div>
    </div>
  )
}

// ── Itinerary content (also used for PDF capture) ─────────────────────────────

function ItineraryContent({
  itinerary, isEn, startDateStr,
}: {
  itinerary: Itinerary; isEn: boolean; startDateStr: string
}) {
  return (
    <>
      {/* Head — Original: .itin-head */}
      <div className="text-center px-6 pt-16 pb-12 max-w-[980px] mx-auto">
        {/* Eyebrow */}
        <div
          className="sec-eyebrow justify-center mb-6"
          style={{ color: 'var(--sun)' }}
        >
          ✨ {isEn ? 'AI Itinerary' : 'Itinerary AI'}
        </div>
        <h1 className="serif text-white mb-4" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.1 }}>
          {itinerary.judul}
        </h1>
        <p className="text-white/80 max-w-[600px] mx-auto text-[15px] leading-relaxed">
          {itinerary.ringkasan}
        </p>

        {/* Stats row — Original: .itin-stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {[
            { label: isEn ? 'Duration' : 'Durasi', val: `${itinerary.durasi} ${isEn ? 'Days' : 'Hari'}` },
            { label: isEn ? 'Est. Budget' : 'Estimasi', val: `${formatRupiahShort(itinerary.estimasi_biaya.min)} – ${formatRupiahShort(itinerary.estimasi_biaya.max)}` },
            { label: isEn ? 'Start Date' : 'Mulai', val: startDateStr },
          ].map(s => (
            <div
              key={s.label}
              className="px-6 py-4 rounded-xl"
              style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.2)', backdropFilter: 'blur(10px)' }}
            >
              <div className="text-[11px] uppercase tracking-widest text-white/60 font-bold">{s.label}</div>
              <div className="serif mt-1 text-[22px]" style={{ color: 'var(--sun)' }}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Day cards — Original: .day-card */}
      <div className="max-w-[980px] mx-auto px-6 pb-8">
        {itinerary.hari.map(day => (
          <div
            key={day.hari}
            className="rounded-[20px] mb-4 p-7"
            style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.15)', backdropFilter: 'blur(10px)' }}
          >
            <h3 className="serif text-white text-[24px] mb-1">
              {isEn ? `Day ${day.hari}` : `Hari ${day.hari}`} — {day.tema}
            </h3>
            {day.tanggal && (
              <div className="text-[13px] font-semibold mb-5" style={{ color: 'var(--sun)' }}>
                {fmtDate(day.tanggal, isEn)}
              </div>
            )}

            {/* Activity list — Original: .activity grid 80px 1fr auto */}
            {day.aktivitas.map((act, j) => (
              <div
                key={j}
                className="grid gap-[18px] py-3.5"
                style={{
                  gridTemplateColumns: '80px 1fr auto',
                  borderBottom: j < day.aktivitas.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none',
                  alignItems: 'start',
                }}
              >
                {/* Time — Original: .activity .time */}
                <div className="serif text-[18px]" style={{ color: 'var(--sun)' }}>{act.waktu}</div>
                {/* Place + desc */}
                <div>
                  <div className="font-bold text-white text-[15px] mb-1">{act.tempat}</div>
                  <div className="text-[13px] leading-relaxed" style={{ opacity: 0.85 }}>{act.deskripsi}</div>
                </div>
                {/* Cost — Original: .activity .cost */}
                <div className="text-[12px] text-right whitespace-nowrap pt-1" style={{ opacity: 0.8 }}>
                  {act.estimasi_biaya !== undefined
                    ? act.estimasi_biaya === 0
                      ? (isEn ? 'Free' : 'Gratis')
                      : formatRupiah(act.estimasi_biaya)
                    : null}
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Tips card */}
        {itinerary.tips.length > 0 && (
          <div
            className="rounded-[20px] mb-4 p-7"
            style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.15)', backdropFilter: 'blur(10px)' }}
          >
            <h3 className="serif text-white text-[24px] mb-5">💡 {isEn ? 'Local Tips' : 'Tips Pintar'}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {itinerary.tips.map((tip, i) => (
                <div key={i} className="flex gap-3">
                  <span
                    className="serif text-[22px] flex-shrink-0 leading-none"
                    style={{ color: 'var(--sun)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[14px] leading-relaxed" style={{ opacity: 0.9 }}>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Packing list */}
        {itinerary.packing_list && itinerary.packing_list.length > 0 && (
          <div
            className="rounded-[20px] mb-8 p-7"
            style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.15)', backdropFilter: 'blur(10px)' }}
          >
            <h3 className="serif text-white text-[24px] mb-5">🎒 {isEn ? 'Packing List' : 'Bawaan'}</h3>
            <div className="flex flex-wrap gap-2.5">
              {itinerary.packing_list.map((item, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-[13px] font-medium"
                  style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)' }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Map section */}
        <div
          className="rounded-[20px] mb-8 overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,.15)', height: 400 }}
        >
          <ErrorBoundary
            fallback={
              <div
                className="h-full flex items-center justify-center text-white/40 text-[14px]"
                style={{ background: 'rgba(255,255,255,.05)' }}
              >
                {isEn ? 'Map unavailable' : 'Peta tidak tersedia'}
              </div>
            }
          >
            <Suspense
              fallback={
                <div
                  className="h-full flex items-center justify-center text-white/50 text-[14px]"
                  style={{ background: 'rgba(255,255,255,.05)' }}
                >
                  {isEn ? 'Loading map...' : 'Memuat peta...'}
                </div>
              }
            >
              <ItineraryMap itinerary={itinerary} />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-3 pb-16">
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[14px] text-dark transition-all hover:-translate-y-px"
            style={{ background: 'var(--sun)', boxShadow: '0 4px 16px rgba(242,169,59,.35)' }}
            onClick={() => window.print()}
          >
            🖨 {isEn ? 'Print' : 'Cetak'}
          </button>
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[14px] text-white transition-all hover:bg-white/15"
            style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.3)' }}
            onClick={() => {
              const url = window.location.href
              if (navigator.share) {
                navigator.share({ title: `Itinerary Pekalongan`, url })
              } else {
                navigator.clipboard.writeText(url)
              }
            }}
          >
            🔗 {isEn ? 'Share' : 'Bagikan'}
          </button>
        </div>
      </div>
    </>
  )
}
