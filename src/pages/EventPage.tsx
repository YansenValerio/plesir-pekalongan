import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEventList } from '@/hooks/useSupabaseData'
import Icon from '@/components/common/Icon'
import PageMeta from '@/components/common/PageMeta'
import type { Event } from '@/types'

type CategoryId = Event['kategori'] | 'all'
type ViewMode = 'grid' | 'calendar'

const EVENT_CATEGORIES: { id: CategoryId; label: string; label_en: string }[] = [
  { id: 'all', label: 'Semua', label_en: 'All' },
  { id: 'budaya', label: 'Budaya', label_en: 'Cultural' },
  { id: 'kuliner', label: 'Kuliner', label_en: 'Culinary' },
  { id: 'olahraga', label: 'Olahraga', label_en: 'Sports' },
  { id: 'seni', label: 'Seni', label_en: 'Arts' },
  { id: 'keagamaan', label: 'Keagamaan', label_en: 'Religious' },
  { id: 'festival', label: 'Festival', label_en: 'Festival' },
]

const MONTHS_ID = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December']

export function formatTanggal(mulai: string, selesai: string, isEn: boolean): string {
  const d1 = new Date(mulai)
  const d2 = new Date(selesai)
  const months = isEn ? MONTHS_EN : MONTHS_ID
  if (mulai === selesai)
    return `${d1.getDate()} ${months[d1.getMonth()]} ${d1.getFullYear()}`
  if (d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear())
    return `${d1.getDate()}–${d2.getDate()} ${months[d1.getMonth()]} ${d1.getFullYear()}`
  return `${d1.getDate()} ${months[d1.getMonth()]} – ${d2.getDate()} ${months[d2.getMonth()]} ${d2.getFullYear()}`
}

export function getStatusLabel(status: Event['status'], isEn: boolean): string {
  if (status === 'upcoming') return isEn ? 'Upcoming' : 'Akan Datang'
  if (status === 'ongoing') return isEn ? 'Ongoing' : 'Berlangsung'
  return isEn ? 'Past' : 'Selesai'
}

export function getStatusStyle(status: Event['status']): string {
  if (status === 'upcoming') return 'bg-secondary text-white'
  if (status === 'ongoing') return 'bg-sun text-dark'
  return 'bg-black/55 text-white'
}

export function getCatColor(kategori: Event['kategori']): string {
  const colors: Record<string, string> = {
    budaya: '#C73E3A', kuliner: '#F2A93B', olahraga: '#088395',
    seni: '#6b3fa0', keagamaan: '#2d8659', festival: '#0A4D68',
  }
  return colors[kategori] ?? '#0A4D68'
}

const CAT_LABELS: Record<string, { id: string; en: string }> = {
  budaya: { id: 'Budaya', en: 'Cultural' },
  kuliner: { id: 'Kuliner', en: 'Culinary' },
  olahraga: { id: 'Olahraga', en: 'Sports' },
  seni: { id: 'Seni', en: 'Arts' },
  keagamaan: { id: 'Keagamaan', en: 'Religious' },
  festival: { id: 'Festival', en: 'Festival' },
}

export { CAT_LABELS }

export default function EventPage() {
  const [statusFilter, setStatusFilter] = useState<Event['status'][]>([])
  const [yearFilter, setYearFilter] = useState<number[]>([])
  const [monthFilter, setMonthFilter] = useState<number[]>([])
  const [cat, setCat] = useState<CategoryId>('all')
  const [q, setQ] = useState('')
  const [view, setView] = useState<ViewMode>('grid')
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const { data: eventData, loading } = useEventList()

  const availableYears = useMemo(() => {
    const years = new Set(eventData.map(e => new Date(e.tanggal_mulai).getFullYear()))
    return [...years].sort()
  }, [eventData])

  const filtered = useMemo(() => eventData.filter(e => {
    const d = new Date(e.tanggal_mulai)
    if (statusFilter.length > 0 && !statusFilter.includes(e.status)) return false
    if (yearFilter.length > 0 && !yearFilter.includes(d.getFullYear())) return false
    if (monthFilter.length > 0 && !monthFilter.includes(d.getMonth() + 1)) return false
    if (cat !== 'all' && e.kategori !== cat) return false
    if (q) {
      const qLow = q.toLowerCase()
      const judul = isEn ? e.judul_en : e.judul
      if (!judul.toLowerCase().includes(qLow) && !e.lokasi.nama.toLowerCase().includes(qLow)) return false
    }
    return true
  }), [eventData, statusFilter, yearFilter, monthFilter, cat, q, isEn])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  )

  const hasFilter = statusFilter.length > 0 || yearFilter.length > 0 || monthFilter.length > 0 || cat !== 'all' || q !== ''

  const toggleStatus = (s: Event['status']) =>
    setStatusFilter(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  const toggleYear = (y: number) =>
    setYearFilter(prev => prev.includes(y) ? prev.filter(x => x !== y) : [...prev, y])
  const toggleMonth = (m: number) =>
    setMonthFilter(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  const resetFilters = () => {
    setStatusFilter([]); setYearFilter([]); setMonthFilter([]); setCat('all'); setQ('')
  }

  const months = isEn ? MONTHS_EN : MONTHS_ID

  return (
    <>
      <PageMeta
        title={isEn ? 'Events & Festivals' : 'Event & Festival'}
        description={isEn ? 'Discover cultural events, festivals, and activities in Pekalongan.' : 'Temukan event budaya, festival, dan kegiatan menarik di Pekalongan.'}
        path="/event"
      />
      {/* Page Hero — Original: .page-hero */}
      <div
        className="relative pt-[160px] pb-[60px] text-white overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
      >
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 30%, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
        <div className="shell relative">
          <div className="flex items-center gap-4 text-[12px] font-bold tracking-[0.2em] uppercase mb-4 text-white/80">
            <span className="block w-[60px] h-px bg-sun" />
            {isEn ? 'Events' : 'Event'}
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
            {isEn ? 'Event Calendar' : 'Kalender Event'}
          </h1>
          <p className="text-[16px] opacity-90 max-w-[640px] mt-3">
            {isEn
              ? 'Explore festivals, cultural events, and exciting activities in Pekalongan.'
              : 'Temukan festival, event budaya, dan aktivitas seru di Kota dan Kabupaten Pekalongan.'}
          </p>
        </div>
      </div>

      {/* Body — Original: .event-page grid 280px 1fr */}
      <div className="shell py-[60px] pb-[100px]">
        <div className="lg:grid lg:gap-10" style={{ gridTemplateColumns: '280px 1fr' }}>

          {/* ── Sidebar — Original: .event-sidebar sticky ── */}
          <aside className="hidden lg:block lg:sticky lg:top-[100px] lg:self-start">
            {/* Status filter — Original: .filter-box */}
            <div className="bg-white rounded-2xl p-6 border border-[var(--line)] mb-4">
              <h4 className="font-sans text-[13px] font-bold text-primary uppercase tracking-[.1em] mb-4">
                Status
              </h4>
              {(['upcoming', 'ongoing', 'past'] as const).map(s => (
                <label key={s} className="flex items-center gap-2.5 text-[14px] cursor-pointer mb-2.5 last:mb-0 select-none">
                  <input
                    type="checkbox"
                    checked={statusFilter.includes(s)}
                    onChange={() => toggleStatus(s)}
                    className="w-4 h-4 rounded accent-[var(--primary)]"
                  />
                  <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${getStatusStyle(s)}`} />
                  {getStatusLabel(s, isEn)}
                </label>
              ))}
            </div>

            {/* Year filter */}
            <div className="bg-white rounded-2xl p-6 border border-[var(--line)] mb-4">
              <h4 className="font-sans text-[13px] font-bold text-primary uppercase tracking-[.1em] mb-4">
                {isEn ? 'Year' : 'Tahun'}
              </h4>
              {availableYears.map(y => (
                <label key={y} className="flex items-center gap-2.5 text-[14px] cursor-pointer mb-2.5 last:mb-0 select-none">
                  <input
                    type="checkbox"
                    checked={yearFilter.includes(y)}
                    onChange={() => toggleYear(y)}
                    className="w-4 h-4 rounded accent-[var(--primary)]"
                  />
                  {y}
                </label>
              ))}
            </div>

            {/* Month filter — 2-col grid */}
            <div className="bg-white rounded-2xl p-6 border border-[var(--line)] mb-4">
              <h4 className="font-sans text-[13px] font-bold text-primary uppercase tracking-[.1em] mb-4">
                {isEn ? 'Month' : 'Bulan'}
              </h4>
              <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                {months.map((m, i) => (
                  <label key={i} className="flex items-center gap-2 text-[13px] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={monthFilter.includes(i + 1)}
                      onChange={() => toggleMonth(i + 1)}
                      className="w-3.5 h-3.5 rounded accent-[var(--primary)] flex-shrink-0"
                    />
                    {m.slice(0, 3)}
                  </label>
                ))}
              </div>
            </div>

            {hasFilter && (
              <button onClick={resetFilters} className="btn btn-ghost w-full">
                {isEn ? 'Reset Filters' : 'Reset Filter'}
              </button>
            )}
          </aside>

          {/* ── Main ─────────────────────────────────────────────────────── */}
          <div>
            <div className="sec-eyebrow mb-2">{isEn ? 'Pekalongan Events' : 'Event Pekalongan'}</div>
            <h2 className="serif text-primary mb-6" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
              {isEn ? "What's Happening" : 'Yang Sedang & Akan Terjadi'}
            </h2>

            {/* Controls — Original: .event-controls */}
            <div className="flex gap-4 items-center justify-between mb-4 flex-wrap">
              <div className="flex items-center gap-2.5 bg-white px-[18px] py-3 rounded-full border border-[var(--line)] flex-1 max-w-[360px]">
                <Icon name="search" size={16} className="text-text-muted flex-shrink-0" />
                <input
                  className="border-none outline-none flex-1 text-[14px] bg-transparent"
                  placeholder={isEn ? 'Search events...' : 'Cari event...'}
                  value={q}
                  onChange={e => setQ(e.target.value)}
                />
              </div>
              {/* View toggle — Original: .toggle-btn */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => setView('grid')}
                  className={`flex items-center gap-1.5 px-[14px] py-2 rounded-lg border text-[13px] font-semibold transition-all ${view === 'grid' ? 'bg-primary text-white border-primary' : 'bg-white text-text-muted border-[var(--line)] hover:border-secondary'}`}
                >
                  <Icon name="grid" size={13} />
                  Grid
                </button>
                <button
                  onClick={() => setView('calendar')}
                  className={`flex items-center gap-1.5 px-[14px] py-2 rounded-lg border text-[13px] font-semibold transition-all ${view === 'calendar' ? 'bg-primary text-white border-primary' : 'bg-white text-text-muted border-[var(--line)] hover:border-secondary'}`}
                >
                  <Icon name="calendar" size={13} />
                  {isEn ? 'Calendar' : 'Kalender'}
                </button>
              </div>
            </div>

            {/* Category pills — Original: .cat-pill */}
            <div className="flex gap-2 flex-wrap mb-6">
              {EVENT_CATEGORIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={`px-4 py-2 rounded-full border text-[13px] font-semibold transition-all duration-150 ${cat === c.id ? 'bg-primary text-white border-primary' : 'bg-white text-text-muted border-[var(--line)] hover:border-secondary hover:text-secondary'}`}
                >
                  {isEn ? c.label_en : c.label}
                </button>
              ))}
            </div>

            {hasFilter && (
              <p className="text-[13px] text-text-muted mb-5">
                {filtered.length} {isEn ? 'events found' : 'event ditemukan'}
              </p>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-text-muted">
                <div className="text-5xl mb-4">📅</div>
                <p className="text-[16px]">{isEn ? 'No events match your filters.' : 'Tidak ada event yang sesuai.'}</p>
                <button className="btn btn-ghost mt-4" onClick={resetFilters}>
                  {isEn ? 'Reset Filters' : 'Reset Filter'}
                </button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(e => (
                  <EventCard key={e.id} e={e} isEn={isEn} onClick={() => navigate(`/event/${e.slug}`)} />
                ))}
              </div>
            ) : (
              <CalendarView events={filtered} isEn={isEn} onNavigate={slug => navigate(`/event/${slug}`)} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

// ── Event Card ────────────────────────────────────────────────────────────────
export function EventCard({ e, isEn, onClick }: { e: Event; isEn: boolean; onClick: () => void }) {
  const catColor = getCatColor(e.kategori)

  return (
    // Original: .event-card — rounded-2xl, border, hover translateY(-4px) + shadow
    <div
      className="bg-white rounded-2xl overflow-hidden cursor-pointer border border-[var(--line)] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,.08)] hover:border-transparent"
      onClick={onClick}
    >
      {/* Poster — aspect 4/5, gradient overlay, status+category badges */}
      <div
        className="relative bg-cover bg-center"
        style={{ aspectRatio: '4/5', backgroundImage: `url(${e.poster})` }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,.7))' }} />
        <span className={`absolute top-3 left-3 z-[2] px-2.5 py-1 rounded-md text-[11px] font-bold ${getStatusStyle(e.status)}`}>
          {getStatusLabel(e.status, isEn)}
        </span>
        <span
          className="absolute top-3 right-3 z-[2] px-2.5 py-1 rounded-md text-[11px] font-bold text-white"
          style={{ backgroundColor: catColor }}
        >
          {isEn ? CAT_LABELS[e.kategori]?.en : CAT_LABELS[e.kategori]?.id}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-sans text-[16px] font-bold text-primary mb-2 leading-[1.3] line-clamp-2">
          {isEn ? e.judul_en : e.judul}
        </h3>
        <div className="flex flex-col gap-1.5 text-[12px] text-text-muted">
          <span className="flex items-center gap-1.5">
            <Icon name="calendar" size={12} className="flex-shrink-0" />
            {formatTanggal(e.tanggal_mulai, e.tanggal_selesai, isEn)}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="location" size={12} className="flex-shrink-0" />
            <span className="truncate">{e.lokasi.nama}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Calendar View — grouped by month ─────────────────────────────────────────
function CalendarView({ events, isEn, onNavigate }: {
  events: Event[]
  isEn: boolean
  onNavigate: (slug: string) => void
}) {
  const months = isEn ? MONTHS_EN : MONTHS_ID

  const grouped = useMemo(() => {
    const map = new Map<string, Event[]>()
    events.forEach(e => {
      const d = new Date(e.tanggal_mulai)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(e)
    })
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [events])

  return (
    <div className="flex flex-col gap-6">
      {grouped.map(([key, evs]) => {
        const [year, month] = key.split('-').map(Number)
        return (
          <div key={key} className="bg-white rounded-2xl border border-[var(--line)] overflow-hidden">
            {/* Month header */}
            <div className="px-6 py-4 border-b border-[var(--line)] bg-[#f8fafb]">
              <h3 className="serif text-primary" style={{ fontSize: '20px' }}>
                {months[month - 1]}{' '}
                <span className="text-text-muted font-sans font-normal text-[16px]">{year}</span>
              </h3>
            </div>
            {/* Event rows */}
            {evs.map((e, i) => {
              const d = new Date(e.tanggal_mulai)
              const catColor = getCatColor(e.kategori)
              return (
                <div
                  key={e.id}
                  className={`flex items-center gap-5 px-6 py-4 cursor-pointer hover:bg-[#f8fafb] transition-colors ${i < evs.length - 1 ? 'border-b border-[var(--line)]' : ''}`}
                  onClick={() => onNavigate(e.slug)}
                >
                  {/* Date number in Playfair Display */}
                  <div className="w-12 flex-shrink-0 text-center">
                    <span className="serif text-[28px] text-primary leading-none">{d.getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[15px] text-primary truncate">
                      {isEn ? e.judul_en : e.judul}
                    </div>
                    <div className="text-[12px] text-text-muted mt-0.5 flex items-center gap-1">
                      <Icon name="location" size={11} />
                      <span className="truncate">{e.lokasi.nama}</span>
                    </div>
                  </div>
                  <span className={`flex-shrink-0 px-2.5 py-1 rounded-md text-[11px] font-bold ${getStatusStyle(e.status)}`}>
                    {getStatusLabel(e.status, isEn)}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: catColor }} />
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
