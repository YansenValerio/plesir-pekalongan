import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEventBySlug, useEventList } from '@/hooks/useSupabaseData'
import PageMeta from '@/components/common/PageMeta'
import { formatRupiah } from '@/utils/currency'
import Icon from '@/components/common/Icon'
import { formatTanggal, getStatusLabel, getStatusStyle, getCatColor, CAT_LABELS, EventCard } from './EventPage'
import type { Event } from '@/types'

// ── Countdown Timer hook ───────────────────────────────────────────────────────
interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

function calcTimeLeft(targetDate: string): TimeLeft | null {
  const diff = new Date(targetDate).getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

function useCountdown(targetDate: string): TimeLeft | null {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => calcTimeLeft(targetDate))
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])
  return timeLeft
}

// ── Add to Calendar (.ics download) ──────────────────────────────────────────
function downloadICS(event: Event) {
  const pad = (n: number) => String(n).padStart(2, '0')
  const toICSDate = (dateStr: string, timeStr?: string) => {
    const d = new Date(dateStr)
    const t = timeStr ? timeStr.replace(':', '') + '00' : '090000'
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${t}`
  }
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Plesir Pekalongan//Event//ID',
    'BEGIN:VEVENT',
    `UID:${event.slug}@plesirpekalongan.id`,
    `DTSTART:${toICSDate(event.tanggal_mulai, event.waktu_mulai)}`,
    `DTEND:${toICSDate(event.tanggal_selesai)}T235900`,
    `SUMMARY:${event.judul}`,
    `DESCRIPTION:${event.deskripsi_singkat.replace(/[,;\\]/g, c => `\\${c}`).replace(/\n/g, '\\n')}`,
    `LOCATION:${event.lokasi.alamat}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.slug}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

// ── SectionTitle ──────────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-sans text-[22px] font-bold text-primary mb-5 relative pb-3">
      {children}
      <span className="absolute bottom-0 left-0 w-10 h-[3px] rounded-full bg-sun" />
    </h2>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const [activeTab, setActiveTab] = useState('tentang')
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const { data: event, loading } = useEventBySlug(slug)
  const { data: allEvents } = useEventList()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  )

  if (!event) {
    return (
      <div className="shell py-20 text-center">
        <div className="text-5xl mb-4">📅</div>
        <h2 className="text-2xl font-bold text-primary mb-2">{isEn ? 'Event not found' : 'Event tidak ditemukan'}</h2>
        <Link to="/event" className="btn btn-primary mt-4">{isEn ? 'Back to Events' : 'Kembali ke Event'}</Link>
      </div>
    )
  }

  const judul = isEn ? event.judul_en : event.judul
  const deskripsiSingkat = isEn ? event.deskripsi_singkat_en : event.deskripsi_singkat
  const deskripsiLengkap = isEn ? event.deskripsi_lengkap_en : event.deskripsi_lengkap
  const tips = isEn ? event.tips_en : event.tips
  const catColor = getCatColor(event.kategori)
  const catLabel = isEn ? CAT_LABELS[event.kategori]?.en : CAT_LABELS[event.kategori]?.id

  const tiketMin = event.tiket.length > 0 ? Math.min(...event.tiket.map(t => t.harga)) : null
  const tiketLabel = tiketMin === null ? '—' : tiketMin === 0 ? (isEn ? 'Free' : 'Gratis') : formatRupiah(tiketMin)
  const durasiDays = event.jadwal.length

  const TABS = [
    { id: 'tentang', label: isEn ? 'About' : 'Tentang' },
    { id: 'jadwal', label: isEn ? 'Schedule' : 'Jadwal' },
    { id: 'tiket', label: isEn ? 'Tickets' : 'Tiket' },
    { id: 'lokasi', label: isEn ? 'Location' : 'Lokasi' },
    ...(event.galeri.length > 0 ? [{ id: 'galeri', label: isEn ? 'Gallery' : 'Galeri' }] : []),
    ...(tips.length > 0 ? [{ id: 'tips', label: 'Tips' }] : []),
  ]

  function scrollToSection(id: string) {
    setActiveTab(id)
    const el = sectionRefs.current[id]
    if (el) {
      const offset = 100
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const relatedEvents = allEvents
    .filter(e => e.id !== event.id && e.kategori === event.kategori)
    .slice(0, 3)

  return (
    <>
      <PageMeta
        title={judul}
        description={deskripsiSingkat}
        image={event.poster}
        path={`/event/${event.slug}`}
      />
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div
        className="relative min-h-[500px] flex flex-col justify-end pb-10 text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${event.poster})` }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,.75) 100%)' }} />

        {/* Back button */}
        <button
          onClick={() => navigate('/event')}
          className="absolute top-[100px] left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[13px] font-semibold hover:bg-white/25 transition-colors"
        >
          <Icon name="arrowL" size={14} />
          {isEn ? 'All Events' : 'Semua Event'}
        </button>

        <div className="shell relative z-[2]">
          {/* Badges */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1.5 rounded-md text-[11px] font-bold ${getStatusStyle(event.status)}`}>
              {getStatusLabel(event.status, isEn)}
            </span>
            <span
              className="px-3 py-1.5 rounded-md text-[11px] font-bold text-white"
              style={{ backgroundColor: catColor }}
            >
              {catLabel}
            </span>
          </div>
          <h1 className="serif text-white mb-3" style={{ fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 1.15 }}>
            {judul}
          </h1>
          <p className="text-white/85 text-[16px] max-w-[700px] leading-relaxed">{deskripsiSingkat}</p>
        </div>
      </div>

      {/* ── Quick bar — 4 items ───────────────────────────────────────────── */}
      <div className="shell -mt-8 relative z-10 mb-0">
        <div
          className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden"
          style={{ background: 'rgba(10,77,104,0.92)', backdropFilter: 'blur(12px)' }}
        >
          {[
            {
              icon: 'calendar' as const,
              label: isEn ? 'Date' : 'Tanggal',
              value: formatTanggal(event.tanggal_mulai, event.tanggal_selesai, isEn),
            },
            {
              icon: 'location' as const,
              label: isEn ? 'Location' : 'Lokasi',
              value: event.lokasi.nama,
            },
            {
              icon: 'ticket' as const,
              label: isEn ? 'Ticket' : 'Tiket',
              value: tiketLabel,
            },
            {
              icon: 'clock' as const,
              label: isEn ? 'Duration' : 'Durasi',
              value: durasiDays > 1 ? `${durasiDays} ${isEn ? 'days' : 'hari'}` : (event.waktu_mulai ?? '—'),
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-5 py-4 text-white ${i < 3 ? 'border-r border-white/10' : ''}`}
            >
              <Icon name={item.icon} size={20} className="text-sun flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[11px] text-white/60 uppercase tracking-wider">{item.label}</div>
                <div className="text-[14px] font-semibold truncate">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA buttons ──────────────────────────────────────────────────── */}
      <div className="shell pt-6 pb-0 flex flex-wrap gap-3">
        {event.status !== 'past' && event.tiket.some(t => t.tersedia && t.harga > 0) ? (
          <a
            href={event.tiket.find(t => t.tersedia && t.link_pembelian)?.link_pembelian ?? '#'}
            className="btn btn-primary"
          >
            {isEn ? 'Buy Ticket' : 'Beli Tiket'}
          </a>
        ) : event.status !== 'past' && event.tiket.some(t => t.tersedia && t.harga === 0) ? (
          <button className="btn btn-primary">
            {isEn ? 'Register Free' : 'Daftar Gratis'}
          </button>
        ) : null}

        {/* Add to Calendar — NEW feature */}
        <button
          onClick={() => downloadICS(event)}
          className="btn btn-ghost flex items-center gap-2"
        >
          <Icon name="calendar" size={16} />
          {isEn ? 'Add to Calendar' : 'Tambah ke Kalender'}
        </button>

        {/* Share — social + copy */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(judul + ' — ' + window.location.href)}`}
          target="_blank" rel="noopener noreferrer"
          className="btn btn-ghost flex items-center gap-2"
          style={{ color: '#25D366' }}
        >
          💬 WhatsApp
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(judul)}&url=${encodeURIComponent(window.location.href)}`}
          target="_blank" rel="noopener noreferrer"
          className="btn btn-ghost flex items-center gap-2"
        >
          <Icon name="twitter" size={15} /> Twitter
        </a>
        <button onClick={handleShare} className="btn btn-ghost flex items-center gap-2">
          <Icon name={copied ? 'check' : 'share'} size={16} />
          {copied ? (isEn ? 'Copied!' : 'Tersalin!') : (isEn ? 'Copy Link' : 'Copy Link')}
        </button>
      </div>

      {/* ── YouTube Live Stream embed — NEW feature ───────────────────────── */}
      {event.youtube_live_active && event.youtube_live_url && (
        <div className="shell pt-8">
          <div className="rounded-2xl overflow-hidden border border-[var(--line)]">
            <div className="bg-[#ff0000] px-5 py-3 flex items-center gap-2">
              <Icon name="play" size={16} className="text-white" />
              <span className="text-white text-[13px] font-bold uppercase tracking-wider">
                {isEn ? 'Live Stream' : 'Live Streaming'}
              </span>
              <span className="ml-2 w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeId(event.youtube_live_url)}?autoplay=0&rel=0`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={judul}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Sticky tab nav ────────────────────────────────────────────────── */}
      <div className="sticky top-[76px] z-40 bg-white border-b border-[var(--line)] mt-8">
        <div className="shell overflow-x-auto scrollbar-hide">
          <div className="flex gap-0 whitespace-nowrap">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-5 py-4 text-[14px] font-semibold border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-primary'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body — 2-col layout ───────────────────────────────────────────── */}
      <div className="shell py-10 pb-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">

          {/* ── Main column ── */}
          <div className="flex flex-col gap-12">

            {/* Tentang */}
            <div ref={el => { sectionRefs.current['tentang'] = el }}>
              <SectionTitle>{isEn ? 'About This Event' : 'Tentang Event'}</SectionTitle>
              <div
                className="text-[15px] text-dark leading-[1.8] whitespace-pre-line"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {deskripsiLengkap}
              </div>
              {event.sejarah && (
                <div className="mt-6 p-5 bg-[var(--accent)] rounded-xl border-l-4 border-sun">
                  <h4 className="font-bold text-primary mb-2 text-[14px] uppercase tracking-wider">
                    {isEn ? 'History' : 'Sejarah'}
                  </h4>
                  <p className="text-[14px] text-dark leading-relaxed">{event.sejarah}</p>
                </div>
              )}
              {/* Tags */}
              {event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {event.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[#f0f5f7] rounded-full text-[12px] text-primary font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Jadwal — timeline */}
            <div ref={el => { sectionRefs.current['jadwal'] = el }}>
              <SectionTitle>{isEn ? 'Schedule' : 'Jadwal'}</SectionTitle>
              <div className="flex flex-col gap-5">
                {event.jadwal.map(day => (
                  <div key={day.hari} className="bg-white rounded-xl border border-[var(--line)] overflow-hidden">
                    {/* Day marker — Original: .timeline-day-marker */}
                    <div
                      className="px-5 py-3 font-bold text-white text-[13px]"
                      style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}
                    >
                      {isEn ? `Day ${day.hari}` : `Hari ke-${day.hari}`}
                      <span className="ml-3 font-normal opacity-80 text-[12px]">
                        {formatDayDate(day.tanggal, isEn)}
                      </span>
                    </div>
                    {/* Acara rows — Original: .timeline-day-body */}
                    <div>
                      {day.acara.map((acara, ai) => (
                        <div
                          key={ai}
                          className={`flex gap-4 px-5 py-4 ${ai < day.acara.length - 1 ? 'border-b border-[var(--line)]' : ''}`}
                        >
                          {/* Time in serif */}
                          <span className="serif text-primary text-[16px] flex-shrink-0 w-14 pt-0.5">
                            {acara.waktu}
                          </span>
                          {/* Dot connector */}
                          <div className="flex flex-col items-center flex-shrink-0 mt-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-sun" />
                            {ai < day.acara.length - 1 && (
                              <span className="w-px flex-1 mt-1 bg-[var(--line)]" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-[14px] text-dark">{acara.kegiatan}</div>
                            {acara.lokasi_detail && (
                              <div className="text-[12px] text-text-muted mt-0.5 flex items-center gap-1">
                                <Icon name="location" size={11} />
                                {acara.lokasi_detail}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tiket */}
            <div ref={el => { sectionRefs.current['tiket'] = el }}>
              <SectionTitle>{isEn ? 'Tickets' : 'Tiket'}</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {event.tiket.map((tiket, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border p-5 flex flex-col relative ${i === 0 ? 'border-primary bg-[#f0f8fc]' : 'border-[var(--line)] bg-white'}`}
                  >
                    {/* "Popular" tag for first ticket */}
                    {i === 0 && (
                      <span className="absolute -top-2.5 left-4 px-3 py-0.5 bg-primary text-white text-[11px] font-bold rounded-full">
                        {isEn ? 'Popular' : 'Populer'}
                      </span>
                    )}
                    <div className="text-[13px] text-text-muted font-semibold uppercase tracking-wider mb-2">
                      {tiket.kategori}
                    </div>
                    <div className="serif text-primary mb-4" style={{ fontSize: '28px' }}>
                      {tiket.harga === 0 ? (isEn ? 'Free' : 'Gratis') : formatRupiah(tiket.harga)}
                    </div>
                    <ul className="flex flex-col gap-2 mb-5 flex-1">
                      {tiket.fasilitas.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-[13px] text-dark">
                          <Icon name="check" size={14} className="text-secondary flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {tiket.tersedia && event.status !== 'past' ? (
                      <a
                        href={tiket.link_pembelian ?? '#'}
                        className={`btn text-center text-[13px] ${i === 0 ? 'btn-primary' : 'btn-ghost'}`}
                      >
                        {isEn ? 'Order' : 'Pesan'}
                      </a>
                    ) : (
                      <button disabled className="btn btn-ghost opacity-50 cursor-not-allowed text-[13px]">
                        {event.status === 'past' ? (isEn ? 'Event Ended' : 'Event Selesai') : (isEn ? 'Sold Out' : 'Habis')}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Lokasi */}
            <div ref={el => { sectionRefs.current['lokasi'] = el }}>
              <SectionTitle>{isEn ? 'Location' : 'Lokasi'}</SectionTitle>
              <div className="bg-white rounded-xl border border-[var(--line)] p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#e8f4f8] flex items-center justify-center flex-shrink-0">
                    <Icon name="location" size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-primary text-[15px]">{event.lokasi.nama}</div>
                    <div className="text-[13px] text-text-muted mt-0.5">{event.lokasi.alamat}</div>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${event.lokasi.koordinat.lat},${event.lokasi.koordinat.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost flex items-center gap-2 w-fit text-[13px]"
                >
                  <Icon name="map" size={15} />
                  {isEn ? 'Open in Google Maps' : 'Buka di Google Maps'}
                </a>
              </div>
            </div>

            {/* Galeri */}
            {event.galeri.length > 0 && (
              <div ref={el => { sectionRefs.current['galeri'] = el }}>
                <SectionTitle>{isEn ? 'Gallery' : 'Galeri'}</SectionTitle>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {event.galeri.map((img, i) => (
                    <div
                      key={i}
                      className="relative rounded-xl overflow-hidden cursor-pointer group"
                      style={{ aspectRatio: '4/3' }}
                      onClick={() => setLightboxImg(img)}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Icon name="plus" size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {tips.length > 0 && (
              <div ref={el => { sectionRefs.current['tips'] = el }}>
                <SectionTitle>Tips</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-[var(--line)] p-4">
                      <span className="serif text-sun text-[20px] flex-shrink-0 leading-none mt-0.5">{i + 1}</span>
                      <p className="text-[13px] text-dark leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="flex flex-col gap-5">

            {/* Countdown Timer — NEW feature */}
            {event.status === 'upcoming' && (
              <CountdownCard tanggal={event.tanggal_mulai} isEn={isEn} />
            )}
            {event.status === 'ongoing' && (
              <div className="bg-sun rounded-xl p-5 text-dark text-center">
                <div className="text-[13px] font-bold uppercase tracking-wider mb-1">
                  {isEn ? 'Status' : 'Status'}
                </div>
                <div className="serif text-[22px]">{isEn ? 'Currently Ongoing!' : 'Sedang Berlangsung!'}</div>
              </div>
            )}

            {/* Penyelenggara card */}
            <div className="bg-white rounded-xl border border-[var(--line)] p-5">
              <h4 className="font-bold text-primary text-[13px] uppercase tracking-[.1em] mb-4">
                {isEn ? 'Organizer' : 'Penyelenggara'}
              </h4>
              <div className="font-semibold text-[15px] text-dark mb-3">{event.penyelenggara.nama}</div>
              <div className="flex flex-col gap-2">
                {event.penyelenggara.telepon && (
                  <a href={`tel:${event.penyelenggara.telepon}`} className="flex items-center gap-2 text-[13px] text-text-muted hover:text-primary transition-colors">
                    <Icon name="phone" size={14} className="text-primary flex-shrink-0" />
                    {event.penyelenggara.telepon}
                  </a>
                )}
                {event.penyelenggara.email && (
                  <a href={`mailto:${event.penyelenggara.email}`} className="flex items-center gap-2 text-[13px] text-text-muted hover:text-primary transition-colors">
                    <Icon name="mail" size={14} className="text-primary flex-shrink-0" />
                    {event.penyelenggara.email}
                  </a>
                )}
                {event.penyelenggara.instagram && (
                  <a href={`https://instagram.com/${event.penyelenggara.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] text-text-muted hover:text-primary transition-colors">
                    <Icon name="instagram" size={14} className="text-primary flex-shrink-0" />
                    {event.penyelenggara.instagram}
                  </a>
                )}
                {event.penyelenggara.website && (
                  <a href={event.penyelenggara.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] text-text-muted hover:text-primary transition-colors">
                    <Icon name="globe" size={14} className="text-primary flex-shrink-0" />
                    {event.penyelenggara.website}
                  </a>
                )}
              </div>
            </div>

            {/* Quick info */}
            <div className="bg-white rounded-xl border border-[var(--line)] p-5">
              <h4 className="font-bold text-primary text-[13px] uppercase tracking-[.1em] mb-4">
                {isEn ? 'Event Info' : 'Info Event'}
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: isEn ? 'Date' : 'Tanggal', value: formatTanggal(event.tanggal_mulai, event.tanggal_selesai, isEn) },
                  { label: isEn ? 'Venue' : 'Tempat', value: event.lokasi.nama },
                  { label: isEn ? 'Duration' : 'Durasi', value: durasiDays > 1 ? `${durasiDays} ${isEn ? 'days' : 'hari'}` : '1 hari' },
                  { label: isEn ? 'Category' : 'Kategori', value: catLabel ?? '' },
                  { label: isEn ? 'Entry' : 'Tiket Masuk', value: tiketLabel },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-2 text-[13px]">
                    <span className="text-text-muted">{label}</span>
                    <span className="font-semibold text-dark text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Calendar CTA — sidebar version */}
            <button
              onClick={() => downloadICS(event)}
              className="btn btn-ghost w-full flex items-center justify-center gap-2"
            >
              <Icon name="download" size={15} />
              {isEn ? 'Add to Calendar (.ics)' : 'Simpan ke Kalender (.ics)'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Related events ────────────────────────────────────────────────── */}
      {relatedEvents.length > 0 && (
        <div className="bg-[#f8fafb] py-12">
          <div className="shell">
            <div className="sec-eyebrow mb-2">{isEn ? 'Similar Events' : 'Event Serupa'}</div>
            <h2 className="serif text-primary mb-8" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
              {isEn ? 'You May Also Like' : 'Mungkin Kamu Suka'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedEvents.map(e => (
                <EventCard
                  key={e.id}
                  e={e}
                  isEn={isEn}
                  onClick={() => {
                    navigate(`/event/${e.slug}`)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            onClick={() => setLightboxImg(null)}
          >
            <Icon name="x" size={18} />
          </button>
          <img
            src={lightboxImg}
            alt=""
            className="max-h-[90vh] max-w-full rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

// ── Countdown Timer Card ──────────────────────────────────────────────────────
function CountdownCard({ tanggal, isEn }: { tanggal: string; isEn: boolean }) {
  const timeLeft = useCountdown(tanggal)

  if (!timeLeft) return null

  const units = [
    { value: timeLeft.days, label: isEn ? 'Days' : 'Hari' },
    { value: timeLeft.hours, label: isEn ? 'Hours' : 'Jam' },
    { value: timeLeft.minutes, label: isEn ? 'Min' : 'Menit' },
    { value: timeLeft.seconds, label: isEn ? 'Sec' : 'Detik' },
  ]

  return (
    <div
      className="rounded-xl p-5 text-white"
      style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
    >
      <div className="text-[12px] font-bold uppercase tracking-[.15em] text-white/70 mb-3">
        {isEn ? 'Starts In' : 'Dimulai Dalam'}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {units.map(({ value, label }) => (
          <div key={label} className="text-center">
            <div className="bg-white/15 rounded-lg py-2 px-1 mb-1">
              <span className="serif text-[26px] leading-none">{String(value).padStart(2, '0')}</span>
            </div>
            <div className="text-[10px] text-white/65 uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDayDate(dateStr: string, isEn: boolean): string {
  const months = isEn
    ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    : ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sep','Okt','Nov','Des']
  const d = new Date(dateStr)
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function extractYouTubeId(url: string): string {
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : url
}
