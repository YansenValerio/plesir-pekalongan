import { useState, useRef, type FormEvent } from 'react'
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDestinasiById, useDestinasiList, useReviewList } from '@/hooks/useSupabaseData'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { formatRupiah } from '@/utils/currency'
import { CATEGORIES, WILAYAH_LABELS } from '@/constants'
import type { Destinasi } from '@/types'
import Icon from '@/components/common/Icon'
import PageMeta from '@/components/common/PageMeta'
import { supabase } from '@/lib/supabase'
import { imgUrl } from '@/utils/image'

// Helper: format jam_operasional.senin
function formatJam(d: Destinasi): string {
  if (!d.jam_operasional) return '—'
  return (d.jam_operasional.senin ?? Object.values(d.jam_operasional)[0]).replace('-', ' — ')
}

// Helper: tiket display
function formatTiket(d: Destinasi): string {
  return d.tiket.dewasa === 0 ? 'Gratis' : formatRupiah(d.tiket.dewasa)
}

// Simplified rating bar distribution from overall score
function ratingDistribution(rating: number) {
  const base = rating - 1
  return [
    { s: 5, v: Math.min(0.95, Math.max(0.3, (base / 4) * 0.9 + 0.3)) },
    { s: 4, v: Math.min(0.5, Math.max(0.05, (1 - base / 4) * 0.35)) },
    { s: 3, v: 0.06 },
    { s: 2, v: 0.02 },
    { s: 1, v: 0.01 },
  ]
}

export default function DestinasiDetailPage() {
  const { kategori, slug } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('tentang')
  const [copied, setCopied] = useState(false)
  const tabNavRef = useRef<HTMLDivElement>(null)
  const { isDestinasiSaved, toggleDestinasi } = useFavoriteStore()
  const [reviewForm, setReviewForm] = useState({ nama: '', rating: 0, komentar: '' })
  const [submitting, setSubmitting] = useState(false)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [reviewError, setReviewError] = useState<string | null>(null)

  const { data: d, loading } = useDestinasiById(slug)
  const { data: allDestinasi } = useDestinasiList()
  const { data: reviews, loading: reviewsLoading } = useReviewList(d?.id)

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  )

  if (!d) return <Navigate to="/404" replace />

  const cat = CATEGORIES.find(c => c.id === d.kategori)
  const area = WILAYAH_LABELS[d.wilayah] ?? d.wilayah
  const related = allDestinasi.filter(x => x.kategori === d.kategori && x.id !== d.id).slice(0, 3)
  const isSaved = isDestinasiSaved(d.id)
  const shareUrl = `https://plesirpekalongan.id/destinasi/${d.kategori}/${d.id}`
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.nama + ' Pekalongan')}`

  function handleCopy() {
    navigator.clipboard?.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = (tabNavRef.current?.offsetHeight ?? 0) + 76 + 16
      window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' })
    }
    setActiveTab(id)
  }

  const TABS = [
    { id: 'tentang',   label: isEn ? 'About'       : 'Tentang'   },
    { id: 'galeri',    label: isEn ? 'Gallery'      : 'Galeri'    },
    { id: 'lokasi',    label: isEn ? 'Location'     : 'Lokasi'    },
    { id: 'fasilitas', label: isEn ? 'Facilities'   : 'Fasilitas' },
    { id: 'tips',      label: isEn ? 'Tips'         : 'Tips'      },
    { id: 'ulasan',    label: isEn ? `Reviews (${reviews.length})` : `Ulasan (${reviews.length})` },
  ]

  async function handleReviewSubmit(e: FormEvent) {
    e.preventDefault()
    if (!reviewForm.rating) { setReviewError(isEn ? 'Please select a rating' : 'Pilih rating terlebih dahulu'); return }
    setSubmitting(true)
    setReviewError(null)
    const { error } = await supabase.from('review').insert({
      destinasi_id: d!.id,
      nama: reviewForm.nama,
      rating: reviewForm.rating,
      komentar: reviewForm.komentar || null,
    })
    setSubmitting(false)
    if (error) { setReviewError(error.message); return }
    setReviewSubmitted(true)
    setReviewForm({ nama: '', rating: 0, komentar: '' })
  }

  const ratingBars = [5, 4, 3, 2, 1].map(s => ({
    s,
    v: reviews.length > 0 ? reviews.filter(r => r.rating === s).length / reviews.length : ratingDistribution(d?.rating ?? 0).find(r => r.s === s)?.v ?? 0,
  }))

  const nama = isEn ? d.nama_en : d.nama

  return (
    <div className="bg-[var(--light)] min-h-screen">
      <PageMeta
        title={nama}
        description={d.deskripsi_singkat}
        image={d.foto_cover}
        path={`/destinasi/${d.kategori}/${d.id}`}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      {/* Original: .ed-hero — min-height:580px, bg-cover, padding:140px 0 60px */}
      <div
        className="relative min-h-[580px] pt-[140px] pb-[60px] text-white bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(10,77,104,.15) 0%, rgba(4,28,38,.88) 100%), url(${imgUrl(d.foto_cover, 1400)})` }}
      >
        <div className="shell">
          <div className="flex flex-col gap-3.5 max-w-[920px]">
            {/* Back btn */}
            <Link
              to={`/destinasi/${d.kategori}`}
              className="btn btn-light w-fit text-[13px] py-2.5 px-5"
            >
              <Icon name="arrowL" size={14} /> {isEn ? 'All Destinations' : 'Semua Destinasi'}
            </Link>

            {/* Badges — Original: .ed-badges */}
            <div className="flex gap-2.5 items-center">
              <span className="px-2.5 py-1.5 rounded-[6px] text-[12px] font-bold bg-white/95 text-primary">
                {cat?.icon} {isEn ? cat?.label_en : cat?.label}
              </span>
              <span className="px-2.5 py-1.5 rounded-[6px] text-[12px] font-bold bg-sun/95 text-dark">
                ★ {d.rating.toFixed(1)}/5
              </span>
              {d.ramah_muslim && (
                <span className="px-2.5 py-1.5 rounded-[6px] text-[12px] font-bold bg-[#2d8659]/90 text-white">
                  🕌 Halal Friendly
                </span>
              )}
            </div>

            {/* Title — Original: .ed-hero h1 */}
            <h1
              className="serif m-0"
              style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: '1.05', textShadow: '0 2px 20px rgba(0,0,0,.3)' }}
            >
              {isEn ? d.nama_en : d.nama}
            </h1>
            <p className="text-[17px] leading-[1.6] max-w-[720px] opacity-95 m-0">
              {d.deskripsi_singkat}
            </p>

            {/* Quick bar — Original: .ed-quickbar — 4 columns glass card */}
            <div
              className="grid gap-3 mt-2 p-[22px] rounded-[16px] border border-white/20 backdrop-blur-[12px]"
              style={{ background: 'rgba(255,255,255,.1)', gridTemplateColumns: 'repeat(4, 1fr)' }}
            >
              {[
                { icon: 'location', label: isEn ? 'Area' : 'Area',       value: area },
                { icon: 'clock',    label: isEn ? 'Hours' : 'Jam Buka',  value: formatJam(d) },
                { icon: 'ticket',   label: isEn ? 'Ticket' : 'Tiket',    value: formatTiket(d) },
                { icon: 'user',     label: isEn ? 'Reviews' : 'Ulasan',  value: `${d.reviews_count.toLocaleString('id-ID')}+ orang` },
              ].map(item => (
                <div key={item.icon} className="flex gap-3 items-center min-w-0">
                  <Icon name={item.icon} size={20} className="flex-shrink-0 text-sun" />
                  <div>
                    <small className="block text-[10px] uppercase tracking-[.15em] opacity-75 mb-0.5">{item.label}</small>
                    <b className="text-[14px] font-bold word-break-all">{item.value}</b>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons — Original: .ed-cta */}
            <div className="flex gap-3 flex-wrap mt-1">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sun px-6 py-3.5"
              >
                <Icon name="location" size={16} /> {isEn ? 'Get Directions' : 'Petunjuk Arah'}
              </a>
              <button
                className="btn px-6 py-3.5 text-white border-white/30"
                style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)' }}
                onClick={() => toggleDestinasi(d.id)}
              >
                <Icon name="save" size={16} />
                {isSaved ? (isEn ? 'Saved' : 'Tersimpan') : (isEn ? 'Save' : 'Simpan')}
              </button>
              <button
                className="btn px-6 py-3.5 text-white"
                style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)' }}
                onClick={handleCopy}
              >
                <Icon name={copied ? 'check' : 'share'} size={16} />
                {copied ? (isEn ? 'Copied!' : 'Tersalin!') : (isEn ? 'Share' : 'Bagikan')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY TAB NAV ────────────────────────────────────────────────── */}
      {/* Original: .ed-tabnav — sticky top:76px, bg:white, border-bottom */}
      <div
        ref={tabNavRef}
        className="sticky z-[50] bg-white border-b border-[var(--line)] shadow-[0_1px_0_rgba(0,0,0,.02)]"
        style={{ top: '76px' }}
      >
        <div className="shell flex overflow-x-auto scrollbar-hide">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              // Original: .ed-tab — padding:18px 22px, weight:600, active border-bottom sun
              className={`px-[22px] py-[18px] text-[14px] font-semibold whitespace-nowrap border-b-[3px] transition-all duration-150 ${
                activeTab === tab.id
                  ? 'text-primary border-sun'
                  : 'text-text-muted border-transparent hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── BODY ──────────────────────────────────────────────────────────── */}
      <div className="shell">
        {/* Original: .ed-body — grid 1fr 320px, gap:48px, padding:56px 0 40px */}
        <div
          className="grid gap-12 py-14 pb-10"
          style={{ gridTemplateColumns: '1fr 320px' }}
        >
          {/* ── MAIN CONTENT ── */}
          <main className="min-w-0 flex flex-col gap-14">

            {/* TENTANG — Original: .ed-section */}
            <section id="tentang">
              <SectionTitle>{isEn ? 'About the Destination' : 'Tentang Destinasi'}</SectionTitle>
              <p className="text-[15px] leading-[1.75] text-text m-0">
                {isEn ? d.deskripsi_en : d.deskripsi}
              </p>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-5">
                {d.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1.5 rounded-[6px] bg-accent text-primary text-[11px] font-semibold">
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            {/* GALERI */}
            {d.galeri.length > 0 && (
              <section id="galeri">
                <SectionTitle>{isEn ? 'Gallery' : 'Galeri'}</SectionTitle>
                {/* Original: gallery grid — first item spans 2 cols */}
                <div className="grid grid-cols-3 gap-2">
                  {d.galeri.slice(0, 5).map((g, i) => (
                    <div
                      key={i}
                      className={`relative rounded-[12px] overflow-hidden cursor-pointer bg-cover bg-center group ${i === 0 ? 'col-span-2' : ''}`}
                      style={{ aspectRatio: i === 0 ? '16/9' : '1/1', backgroundImage: `url(${imgUrl(g, 800)})` }}
                      onClick={() => setLightbox(g)}
                    >
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <Icon name="plus" size={28} className="text-white" />
                      </div>
                      {/* "+N more" overlay on last visible */}
                      {i === 4 && d.galeri.length > 5 && (
                        <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                          <span className="text-white text-[18px] font-bold">+{d.galeri.length - 5}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* LOKASI */}
            <section id="lokasi">
              <SectionTitle>{isEn ? 'Location & Access' : 'Lokasi & Akses'}</SectionTitle>
              {/* Original: .location-card — grid 1.2fr 1fr, rounded-[16px] */}
              <div className="grid overflow-hidden rounded-[16px] border border-[var(--line)]" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
                {/* Map placeholder */}
                <div
                  className="relative min-h-[280px] bg-cover bg-center"
                  style={{ backgroundImage: `linear-gradient(135deg, rgba(10,77,104,.35), rgba(8,131,149,.35)), url(https://source.unsplash.com/800x500/?map,satellite,asia)` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px]">
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full bg-batik-red border-[3px] border-white z-[1]"
                      style={{ boxShadow: '0 4px 12px rgba(0,0,0,.3)' }}
                    />
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-batik-red/40"
                      style={{ animation: 'pulse 2s infinite' }}
                    />
                  </div>
                </div>
                {/* Location info */}
                <div className="p-7">
                  <h4 className="font-sans text-[18px] font-bold text-primary mb-2">{isEn ? d.nama_en : d.nama}</h4>
                  <p className="text-[14px] text-text-muted m-0 leading-[1.5] flex items-start gap-1.5">
                    <Icon name="location" size={14} className="flex-shrink-0 mt-0.5" /> {d.lokasi.alamat}
                  </p>
                  <div className="flex gap-2.5 flex-wrap mt-3.5">
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-[13px] py-2.5 px-4">
                      <Icon name="location" size={14} /> {isEn ? 'Open in Maps' : 'Buka di Maps'}
                    </a>
                    <button
                      className="btn btn-ghost text-[13px] py-2.5 px-4"
                      onClick={() => navigator.clipboard?.writeText(shareUrl)}
                    >
                      <Icon name="share" size={14} /> {isEn ? 'Share Location' : 'Bagikan Lokasi'}
                    </button>
                  </div>
                  {/* Transit info */}
                  <div className="mt-5 pt-5 border-t border-[var(--line)] flex flex-col gap-2 text-[13px] text-text-muted">
                    <div>🚉 {isEn ? 'Pekalongan Station' : 'Stasiun Pekalongan'} — ±5 km</div>
                    <div>🚌 {isEn ? 'Pekalongan Bus Terminal' : 'Terminal Bus Pekalongan'}</div>
                    <div>🛵 {isEn ? 'Motorbike rental: ±Rp 75,000/day' : 'Sewa motor: ±Rp 75.000/hari'}</div>
                  </div>
                </div>
              </div>
            </section>

            {/* FASILITAS */}
            {d.fasilitas.length > 0 && (
              <section id="fasilitas">
                <SectionTitle>{isEn ? 'Available Facilities' : 'Fasilitas Tersedia'}</SectionTitle>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {d.fasilitas.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-[10px] bg-white border border-[var(--line)] text-[13px]">
                      <Icon name="check" size={16} className="text-secondary flex-shrink-0" />
                      <span className="capitalize">{f}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TIPS */}
            {d.tips.length > 0 && (
              <section id="tips">
                <SectionTitle>{isEn ? 'Visiting Tips' : 'Tips Berkunjung'}</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(isEn ? d.tips_en : d.tips).map((tip, i) => (
                    <div key={i} className="flex gap-3.5 p-4 rounded-[14px] bg-white border border-[var(--line)]">
                      <span className="text-2xl flex-shrink-0">💡</span>
                      <p className="text-[13px] text-text leading-[1.6] m-0">{tip}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ULASAN */}
            <section id="ulasan">
              <SectionTitle>{isEn ? 'Reviews' : 'Ulasan Pengunjung'}</SectionTitle>

              {/* Form kirim ulasan */}
              {reviewSubmitted ? (
                <div className="p-5 rounded-[14px] bg-[#e6f4ec] border border-[#2d8659]/20 text-[#2d8659] text-sm font-semibold mb-6">
                  ✓ {isEn ? 'Thank you! Your review has been submitted.' : 'Terima kasih! Ulasan kamu sudah dikirim.'}
                  <button className="ml-3 underline font-normal" onClick={() => setReviewSubmitted(false)}>
                    {isEn ? 'Write another' : 'Tulis lagi'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="mb-8 p-5 rounded-[16px] bg-white border border-[var(--line)] flex flex-col gap-4">
                  <h4 className="font-sans text-[14px] font-bold text-primary">{isEn ? 'Write a Review' : 'Tulis Ulasan'}</h4>

                  {/* Star picker */}
                  <div>
                    <label className="block text-[12px] text-text-muted mb-1.5">{isEn ? 'Your Rating' : 'Rating Kamu'} <span className="text-red-500">*</span></label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setReviewForm(prev => ({ ...prev, rating: s }))}
                          className="text-[28px] transition-transform hover:scale-110"
                          style={{ color: s <= reviewForm.rating ? 'var(--sun)' : 'var(--line)' }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] text-text-muted mb-1.5">{isEn ? 'Your Name' : 'Nama Kamu'} <span className="text-red-500">*</span></label>
                    <input
                      required
                      value={reviewForm.nama}
                      onChange={e => setReviewForm(prev => ({ ...prev, nama: e.target.value }))}
                      placeholder={isEn ? 'e.g. Budi Santoso' : 'cth. Budi Santoso'}
                      className="w-full px-3 py-2 rounded-[10px] text-sm border border-[var(--line)] outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] text-text-muted mb-1.5">{isEn ? 'Comment (optional)' : 'Komentar (opsional)'}</label>
                    <textarea
                      rows={3}
                      value={reviewForm.komentar}
                      onChange={e => setReviewForm(prev => ({ ...prev, komentar: e.target.value }))}
                      placeholder={isEn ? 'Share your experience...' : 'Ceritakan pengalamanmu...'}
                      className="w-full px-3 py-2 rounded-[10px] text-sm border border-[var(--line)] outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  {reviewError && <p className="text-red-500 text-sm">{reviewError}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary self-start disabled:opacity-50"
                  >
                    {submitting ? (isEn ? 'Sending...' : 'Mengirim...') : (isEn ? 'Send Review' : 'Kirim Ulasan')}
                  </button>
                </form>
              )}

              {/* Daftar review */}
              {reviewsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
              ) : reviews.length === 0 ? (
                <p className="text-text-muted text-sm text-center py-8">
                  {isEn ? 'No reviews yet. Be the first!' : 'Belum ada ulasan. Jadilah yang pertama!'}
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  {reviews.map(r => (
                    <div key={r.id} className="flex gap-4 p-4 rounded-[14px] bg-white border border-[var(--line)]">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold bg-accent text-primary">
                        {r.nama.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-semibold text-[14px] text-primary">{r.nama}</span>
                          <span className="text-sun text-[13px]">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                          <span className="text-text-muted text-[11px] ml-auto">
                            {new Date(r.created_at).toLocaleDateString(isEn ? 'en-US' : 'id-ID', { dateStyle: 'medium' })}
                          </span>
                        </div>
                        {r.komentar && <p className="text-[13px] text-text leading-[1.6] m-0">{r.komentar}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* SHARE */}
            <section>
              <SectionTitle>{isEn ? 'Share This Destination' : 'Bagikan Destinasi Ini'}</SectionTitle>
              <div className="flex gap-3 flex-wrap">
                {[
                  {
                    label: 'WhatsApp', bg: '#25D366', color: '#fff',
                    href: `https://wa.me/?text=${encodeURIComponent((isEn ? d.nama_en : d.nama) + ' — ' + shareUrl)}`,
                    icon: '💬',
                  },
                  {
                    label: 'Facebook', bg: '#1877F2', color: '#fff',
                    href: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                    icon: null, iconName: 'facebook',
                  },
                  {
                    label: 'X / Twitter', bg: '#000', color: '#fff',
                    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(isEn ? d.nama_en : d.nama)}&url=${encodeURIComponent(shareUrl)}`,
                    icon: null, iconName: 'twitter',
                  },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn font-semibold text-[13px] px-5 py-3"
                    style={{ background: s.bg, color: s.color, border: 'none' }}
                  >
                    {s.icon ? <span>{s.icon}</span> : <Icon name={s.iconName!} size={15} />}
                    {s.label}
                  </a>
                ))}
                <button
                  className="btn btn-ghost text-[13px] px-5 py-3"
                  onClick={handleCopy}
                >
                  <Icon name={copied ? 'check' : 'share'} size={15} />
                  {copied ? (isEn ? 'Copied!' : 'Tersalin!') : 'Copy Link'}
                </button>
              </div>
            </section>
          </main>

          {/* ── SIDEBAR ── */}
          {/* Original: .ed-side — sticky top:140px, flex-col, gap:16px */}
          <aside className="flex flex-col gap-4 self-start" style={{ position: 'sticky', top: '140px' }}>

            {/* Rating card */}
            <div className="bg-white border border-[var(--line)] rounded-[16px] p-[22px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="serif text-[48px] font-medium text-primary leading-none">{d.rating.toFixed(1)}</div>
                <div>
                  <div className="flex gap-0.5 text-sun text-[20px]">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} style={{ color: i <= Math.round(d.rating) ? 'var(--sun)' : 'var(--line)' }}>★</span>
                    ))}
                  </div>
                  <div className="text-[11px] text-text-muted mt-1">{d.reviews_count.toLocaleString('id-ID')} {isEn ? 'reviews' : 'ulasan'}</div>
                </div>
              </div>
              {/* Rating bars */}
              <div className="flex flex-col gap-1.5">
                {ratingBars.map(r => (
                  <div key={r.s} className="flex items-center gap-2 text-[12px]">
                    <span className="w-3 text-text-muted font-semibold">{r.s}</span>
                    <div className="flex-1 h-[6px] bg-[var(--line)] rounded-full overflow-hidden">
                      <div className="h-full bg-sun rounded-full" style={{ width: `${r.v * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Praktis */}
            <div className="bg-white border border-[var(--line)] rounded-[16px] p-[22px]">
              <h4 className="font-sans text-[13px] font-bold text-primary uppercase tracking-[.12em] mb-3.5">
                {isEn ? 'Quick Info' : 'Info Praktis'}
              </h4>
              {[
                { label: isEn ? 'Category' : 'Kategori', value: isEn ? cat?.label_en : cat?.label },
                { label: isEn ? 'Area' : 'Area',         value: area },
                { label: isEn ? 'Hours' : 'Jam Buka',    value: formatJam(d) },
                { label: isEn ? 'Ticket' : 'Tiket',      value: formatTiket(d) },
                { label: isEn ? 'Est. Visit' : 'Est. Waktu', value: '1 — 3 jam' },
              ].map(row => (
                <div key={row.label} className="flex justify-between gap-3 py-2.5 border-b border-[var(--line)] last:border-b-0 last:pb-0 text-[13px]">
                  <span className="text-text-muted">{row.label}</span>
                  <b className="text-primary font-bold text-right">{row.value}</b>
                </div>
              ))}
            </div>

            {/* Family friendly tags */}
            <div className="bg-white border border-[var(--line)] rounded-[16px] p-[22px]">
              <h4 className="font-sans text-[13px] font-bold text-primary uppercase tracking-[.12em] mb-3.5">
                {isEn ? 'Visitor Type' : 'Ramah Untuk'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {d.ramah_muslim  && <span className="px-3 py-1.5 rounded-full bg-[#e6f4ec] text-[#2d8659] text-[12px] font-semibold">🕌 {isEn ? 'Muslim Friendly' : 'Ramah Muslim'}</span>}
                {d.ramah_anak    && <span className="px-3 py-1.5 rounded-full bg-accent text-primary text-[12px] font-semibold">👶 {isEn ? 'Kid Friendly' : 'Ramah Anak'}</span>}
                {d.ramah_difabel && <span className="px-3 py-1.5 rounded-full bg-[#e8f0fe] text-[#1a56db] text-[12px] font-semibold">♿ {isEn ? 'Accessible' : 'Difabel OK'}</span>}
                {!d.ramah_muslim && !d.ramah_anak && !d.ramah_difabel && (
                  <span className="text-[12px] text-text-muted">{isEn ? 'General public' : 'Umum'}</span>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* ── RELATED DESTINATIONS ── */}
        {related.length > 0 && (
          <section className="pb-[60px]">
            <div className="flex justify-between items-end mb-6">
              <div>
                <div className="sec-eyebrow">{isEn ? 'Further Exploration' : 'Eksplorasi Lanjutan'}</div>
                <h2 className="serif text-primary text-[32px]">{isEn ? 'Nearby Destinations' : 'Destinasi Sekitar'}</h2>
              </div>
              <Link to={`/destinasi/${d.kategori}`} className="btn btn-ghost">
                {isEn ? 'See All' : 'Lihat Semua'} <Icon name="arrowR" size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {related.map(r => {
                const rCat = CATEGORIES.find(c => c.id === r.kategori)
                return (
                  <div
                    key={r.id}
                    className="bg-white rounded-[16px] overflow-hidden cursor-pointer border border-[var(--line)] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,.08)]"
                    onClick={() => navigate(`/destinasi/${r.kategori}/${r.id}`)}
                  >
                    <div className="relative bg-cover bg-center" style={{ aspectRatio: '4/3', backgroundImage: `url(${imgUrl(r.foto_cover, 600)})` }}>
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,.6))' }} />
                      <span className="absolute top-3.5 left-3.5 z-[2] px-2.5 py-1 bg-white/95 rounded-[6px] text-[11px] font-bold text-primary">
                        {rCat?.icon} {isEn ? rCat?.label_en : rCat?.label}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-sans text-[15px] font-bold text-primary mb-1 leading-[1.3]">
                        {isEn ? r.nama_en : r.nama}
                      </h3>
                      <p className="text-[12px] text-text-muted leading-[1.5] m-0 line-clamp-2">{r.deskripsi_singkat}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <Icon name="x" size={20} />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-[90vh] rounded-[12px] object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

// Section title with sun underline — Original: .ed-section h2::after
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="serif text-[32px] text-primary mb-5 relative pb-3.5"
      style={{ '&::after': undefined } as React.CSSProperties}
    >
      {children}
      <span
        className="absolute left-0 bottom-0 block w-12 h-[3px] rounded-full bg-sun"
      />
    </h2>
  )
}
