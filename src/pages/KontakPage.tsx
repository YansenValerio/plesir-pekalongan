import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { faqData, ticInfoData } from '@/data'
import Icon from '@/components/common/Icon'
import PageMeta from '@/components/common/PageMeta'
import { supabase } from '@/lib/supabase'
import type { FAQ } from '@/types'

type FAQKategori = FAQ['kategori'] | 'all'

const FAQ_CATS: { id: FAQKategori; label: string; label_en: string }[] = [
  { id: 'all', label: 'Semua', label_en: 'All' },
  { id: 'umum', label: 'Umum', label_en: 'General' },
  { id: 'transportasi', label: 'Transportasi', label_en: 'Transport' },
  { id: 'akomodasi', label: 'Akomodasi', label_en: 'Accommodation' },
  { id: 'kuliner', label: 'Kuliner', label_en: 'Culinary' },
  { id: 'budaya', label: 'Budaya', label_en: 'Culture' },
  { id: 'keamanan', label: 'Keamanan', label_en: 'Safety' },
  { id: 'wisata', label: 'Wisata', label_en: 'Tourism' },
  { id: 'tic', label: 'TIC', label_en: 'TIC' },
]

const SUBJECTS_ID = ['Informasi Wisata', 'Saran & Masukan', 'Kerjasama', 'Laporan', 'Lainnya']
const SUBJECTS_EN = ['Travel Information', 'Feedback & Suggestions', 'Collaboration', 'Report', 'Other']

const SOCIAL_ICONS = [
  { name: 'instagram', href: 'https://instagram.com/plesirpekalongan' },
  { name: 'facebook', href: 'https://facebook.com' },
  { name: 'tiktok', href: 'https://tiktok.com' },
  { name: 'youtube', href: 'https://youtube.com' },
  { name: 'twitter', href: 'https://twitter.com' },
]

export default function KontakPage() {
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  return (
    <>
      <PageMeta
        title={isEn ? 'Contact & FAQ' : 'Kontak & FAQ'}
        description={isEn ? 'Contact the Pekalongan Tourism Information Center. Address, hours, emergency contacts, and frequently asked questions.' : 'Hubungi Pusat Informasi Pariwisata Pekalongan. Alamat, jam buka, kontak darurat, dan pertanyaan umum.'}
        path="/kontak"
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
            {isEn ? 'Get in Touch' : 'Hubungi Kami'}
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
            {isEn ? 'Contact Us' : 'Hubungi Kami'}
          </h1>
          <p className="text-[16px] opacity-90 max-w-[640px] mt-3">
            {isEn
              ? 'We are ready to help you plan the perfect Pekalongan journey.'
              : 'Kami siap membantu rencana perjalananmu di Pekalongan.'}
          </p>
        </div>
      </div>

      {/* Kontak body — Original: .kontak-page */}
      <div className="shell py-[60px] pb-[100px]" style={{ background: 'var(--light)' }}>
        {/* Kontak grid — Original: .kontak-grid grid 1fr 1.3fr */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-[60px]">

          {/* ── Left column: info cards ── */}
          <div>
            {/* TIC Info */}
            <InfoCard title={isEn ? 'TIC Pekalongan' : 'TIC Kota Pekalongan'}>
              <InfoRow icon="location">
                <b className="block text-primary text-[13px] mb-0.5">{isEn ? 'Address' : 'Alamat'}</b>
                {ticInfoData.alamat.jalan}, {ticInfoData.alamat.kota}, {ticInfoData.alamat.provinsi} {ticInfoData.alamat.kode_pos}
              </InfoRow>
              <InfoRow icon="phone">
                <b className="block text-primary text-[13px] mb-0.5">{isEn ? 'Phone' : 'Telepon'}</b>
                {ticInfoData.kontak.telepon}
              </InfoRow>
              <InfoRow icon="mail">
                <b className="block text-primary text-[13px] mb-0.5">Email</b>
                <a href={`mailto:${ticInfoData.kontak.email}`} className="hover:text-secondary transition-colors">
                  {ticInfoData.kontak.email}
                </a>
              </InfoRow>
              <InfoRow icon="clock" last>
                <b className="block text-primary text-[13px] mb-0.5">{isEn ? 'Opening Hours' : 'Jam Buka'}</b>
                {isEn ? 'Mon–Fri' : 'Senin–Jumat'} {ticInfoData.jam_operasional.senin_jumat}<br />
                {isEn ? 'Sat–Sun: Closed' : 'Sabtu–Minggu: Tutup'}
              </InfoRow>
            </InfoCard>

            {/* Emergency contacts */}
            <InfoCard title={isEn ? 'Emergency Contacts' : 'Kontak Darurat Wisatawan'}>
              {ticInfoData.emergency_contacts.slice(0, 4).map((c, i) => (
                <InfoRow key={i} icon="phone" last={i === 3}>
                  <b className="block text-primary text-[13px] mb-0.5">{c.nama}</b>
                  <a href={`tel:${c.nomor.replace(/\s/g, '')}`} className="hover:text-secondary transition-colors font-mono">
                    {c.nomor}
                  </a>
                  <span className="text-text-muted text-[12px] block">{c.deskripsi}</span>
                </InfoRow>
              ))}
            </InfoCard>

            {/* Social media */}
            <InfoCard title={isEn ? 'Social Media' : 'Sosial Media'}>
              <div className="flex gap-2.5 flex-wrap mb-3">
                {SOCIAL_ICONS.map(s => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full grid place-items-center transition-all duration-150 hover:bg-sun hover:text-dark"
                    style={{ background: 'var(--primary)', color: '#fff' }}
                  >
                    <Icon name={s.name} size={18} />
                  </a>
                ))}
              </div>
              <p className="text-text-muted text-[13px]">
                @plesirpekalongan {isEn ? 'on all platforms' : 'di semua platform'}
              </p>
            </InfoCard>

            {/* TIC Services */}
            <InfoCard title={isEn ? 'Our Services' : 'Layanan Kami'}>
              <ul className="space-y-2">
                {ticInfoData.layanan.slice(0, 5).map((l, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px]">
                    <span className="text-secondary mt-1 flex-shrink-0">✓</span>
                    {l}
                  </li>
                ))}
              </ul>
            </InfoCard>
          </div>

          {/* ── Right column: form + map ── */}
          <div>
            <ContactForm isEn={isEn} />

            {/* Google Maps embed */}
            <div
              className="rounded-2xl overflow-hidden mt-4"
              style={{ border: '1px solid var(--line)' }}
            >
              <div style={{ aspectRatio: '16/9', position: 'relative' }}>
                <iframe
                  title="Lokasi TIC Pekalongan"
                  src={`https://www.google.com/maps?q=${ticInfoData.alamat.koordinat.lat},${ticInfoData.alamat.koordinat.lng}&t=&z=17&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ position: 'absolute', inset: 0, border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-3" style={{ background: '#f8fafb', borderTop: '1px solid var(--line)' }}>
                <div className="text-[13px] text-text-muted">
                  <span className="font-semibold text-primary">TIC Kota Pekalongan</span>
                  <span className="mx-1.5">·</span>
                  {ticInfoData.alamat.jalan}
                </div>
                <a
                  href={`https://maps.google.com/?q=${ticInfoData.alamat.koordinat.lat},${ticInfoData.alamat.koordinat.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-semibold text-primary hover:text-secondary transition-colors flex-shrink-0 ml-3"
                >
                  {isEn ? 'Open in Maps →' : 'Buka di Maps →'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ Section ── */}
        <FAQSection isEn={isEn} />
      </div>
    </>
  )
}

// ── Contact Form ──────────────────────────────────────────────────────────────

function ContactForm({ isEn }: { isEn: boolean }) {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const [form, setForm] = useState({ nama: '', email: '', subjek: '0', pesan: '' })

  const subjects = isEn ? SUBJECTS_EN : SUBJECTS_ID

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setSendError(null)
    const subjekText = subjects[Number(form.subjek)] ?? subjects[0]
    const { error } = await supabase.from('pesan_kontak').insert({
      nama: form.nama,
      email: form.email,
      subjek: subjekText,
      pesan: form.pesan,
    })
    setSending(false)
    if (error) { setSendError(error.message); return }
    setSubmitted(true)
  }

  return (
    <div className="rounded-2xl p-8" style={{ background: '#fff', border: '1px solid var(--line)' }}>
      <h3 className="text-primary text-[22px] serif mb-5">
        {isEn ? 'Send a Message' : 'Kirim Pesan'}
      </h3>
      {submitted ? (
        <div className="py-10 text-center">
          <div
            className="w-16 h-16 rounded-full inline-grid place-items-center mb-4"
            style={{ background: 'var(--secondary)', color: '#fff' }}
          >
            <Icon name="check" size={32} />
          </div>
          <h3 className="text-primary text-[20px] serif mb-2">
            {isEn ? 'Message Sent!' : 'Pesan Terkirim!'}
          </h3>
          <p className="text-text-muted text-[14px]">
            {isEn
              ? 'We will contact you within 1×24 hours.'
              : 'Kami akan menghubungi Anda dalam 1×24 jam.'}
          </p>
          <button
            className="btn btn-ghost mt-5"
            onClick={() => { setSubmitted(false); setForm({ nama: '', email: '', subjek: '0', pesan: '' }) }}
          >
            {isEn ? 'Send Another Message' : 'Kirim Pesan Lain'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <FormGroup label={isEn ? 'Full Name' : 'Nama Lengkap'}>
            <input
              required
              placeholder={isEn ? 'Your name' : 'Nama Anda'}
              value={form.nama}
              onChange={e => setForm(f => ({ ...f, nama: e.target.value }))}
              className="kontak-input"
            />
          </FormGroup>
          {/* Email */}
          <FormGroup label="Email">
            <input
              type="email"
              required
              placeholder="email@contoh.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="kontak-input"
            />
          </FormGroup>
          {/* Subject */}
          <FormGroup label={isEn ? 'Subject' : 'Subjek'}>
            <select
              value={form.subjek}
              onChange={e => setForm(f => ({ ...f, subjek: e.target.value }))}
              className="kontak-input"
            >
              {subjects.map((s, i) => (
                <option key={i} value={String(i)}>{s}</option>
              ))}
            </select>
          </FormGroup>
          {/* Message */}
          <FormGroup label={isEn ? 'Message' : 'Pesan'}>
            <textarea
              required
              placeholder={isEn ? 'Write your message...' : 'Tuliskan pesan Anda...'}
              value={form.pesan}
              onChange={e => setForm(f => ({ ...f, pesan: e.target.value }))}
              className="kontak-input"
              style={{ minHeight: 140, resize: 'vertical' }}
            />
          </FormGroup>
          {sendError && (
            <p className="text-red-600 text-[13px] bg-red-50 px-4 py-2 rounded-xl">{sendError}</p>
          )}
          <button type="submit" disabled={sending} className="btn btn-primary w-full justify-center disabled:opacity-60">
            {sending ? (isEn ? 'Sending...' : 'Mengirim...') : (isEn ? 'Send Message' : 'Kirim Pesan')}
          </button>
        </form>
      )}
    </div>
  )
}

// ── FAQ Section ───────────────────────────────────────────────────────────────

function FAQSection({ isEn }: { isEn: boolean }) {
  const [cat, setCat] = useState<FAQKategori>('all')
  const [q, setQ] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return faqData
      .filter(f => cat === 'all' || f.kategori === cat)
      .filter(f => {
        if (!q) return true
        const qLow = q.toLowerCase()
        const pertanyaan = isEn ? f.pertanyaan_en : f.pertanyaan
        const jawaban = isEn ? f.jawaban_en : f.jawaban
        return pertanyaan.toLowerCase().includes(qLow) || jawaban.toLowerCase().includes(qLow)
      })
      .sort((a, b) => a.urutan - b.urutan)
  }, [cat, q, isEn])

  return (
    <section className="mt-[80px]">
      {/* Section header */}
      <div className="text-center mb-10">
        <div className="sec-eyebrow justify-center mb-4">
          {isEn ? 'FAQ' : 'FAQ'}
        </div>
        <h2 className="serif text-primary" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
          {isEn ? 'Frequently Asked Questions' : 'Pertanyaan yang Sering Diajukan'}
        </h2>
        <p className="text-text-muted mt-3 max-w-[540px] mx-auto text-[15px]">
          {isEn
            ? 'Find answers to common questions about visiting Pekalongan'
            : 'Temukan jawaban untuk pertanyaan umum seputar wisata di Pekalongan'}
        </p>
      </div>

      <div className="max-w-[900px] mx-auto">
        {/* Search */}
        <div
          className="flex items-center gap-2.5 px-[18px] py-3 rounded-full mb-6"
          style={{ background: '#fff', border: '1px solid var(--line)' }}
        >
          <Icon name="search" size={16} className="text-text-muted flex-shrink-0" />
          <input
            className="border-none outline-none flex-1 text-[14px] bg-transparent"
            placeholder={isEn ? 'Search questions...' : 'Cari pertanyaan...'}
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {FAQ_CATS.map(c => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold border transition-all duration-150 ${
                cat === c.id
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-text-muted border-[var(--line)] hover:border-secondary hover:text-secondary'
              }`}
            >
              {isEn ? c.label_en : c.label}
            </button>
          ))}
        </div>

        {/* FAQ accordion list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-text-muted">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-[15px]">
              {isEn ? 'No matching questions found.' : 'Tidak ada pertanyaan yang cocok.'}
            </p>
            <button className="btn btn-ghost mt-4" onClick={() => { setQ(''); setCat('all') }}>
              {isEn ? 'Reset Filters' : 'Reset Filter'}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(faq => {
              const isOpen = openId === faq.id
              const pertanyaan = isEn ? faq.pertanyaan_en : faq.pertanyaan
              const jawaban = isEn ? faq.jawaban_en : faq.jawaban
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl overflow-hidden transition-shadow duration-200"
                  style={{ background: '#fff', border: '1px solid var(--line)', boxShadow: isOpen ? '0 4px 16px rgba(0,0,0,.06)' : 'none' }}
                >
                  {/* Question row */}
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-[var(--accent)]/30"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {faq.is_popular && (
                        <span
                          className="flex-shrink-0 px-2 py-0.5 rounded-full text-[11px] font-bold"
                          style={{ background: 'rgba(242,169,59,.15)', color: 'var(--sun)' }}
                        >
                          {isEn ? 'Popular' : 'Populer'}
                        </span>
                      )}
                      <span className="font-semibold text-[15px] text-dark">{pertanyaan}</span>
                    </div>
                    <span
                      className="flex-shrink-0 transition-transform duration-200"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--secondary)' }}
                    >
                      <Icon name="chevron" size={20} />
                    </span>
                  </button>

                  {/* Answer — Original: collapse/expand */}
                  {isOpen && (
                    <div
                      className="px-6 pb-5 text-[14px] leading-relaxed border-t"
                      style={{ color: 'var(--text-muted)', borderColor: 'var(--line)' }}
                    >
                      <p className="pt-4">{jawaban}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* CTA bottom — direct ke form */}
        <div
          className="mt-10 text-center px-8 py-8 rounded-2xl"
          style={{ background: 'rgba(10,77,104,.05)', border: '1px solid rgba(10,77,104,.1)' }}
        >
          <h3 className="serif text-primary text-[22px] mb-2">
            {isEn ? "Didn't find your answer?" : 'Tidak menemukan jawaban?'}
          </h3>
          <p className="text-text-muted text-[14px] mb-5">
            {isEn
              ? 'Our TIC Pekalongan team is ready to help you directly.'
              : 'Tim TIC Pekalongan siap membantu kamu langsung.'}
          </p>
          <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="btn btn-primary">
            {isEn ? 'Contact TIC →' : 'Hubungi TIC →'}
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Helper components ─────────────────────────────────────────────────────────

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-8 mb-4"
      style={{ background: '#fff', border: '1px solid var(--line)' }}
    >
      <h3 className="serif text-primary text-[22px] mb-4">{title}</h3>
      {children}
    </div>
  )
}

function InfoRow({ icon, children, last = false }: { icon: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div
      className={`flex gap-3 py-3 text-[14px] ${!last ? 'border-b' : ''}`}
      style={{ borderColor: 'var(--line)' }}
    >
      <span className="flex-shrink-0 mt-0.5 text-secondary">
        <Icon name={icon} size={18} />
      </span>
      <div className="text-text-muted leading-relaxed">{children}</div>
    </div>
  )
}

function FormGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-dark mb-1.5">{label}</label>
      {children}
    </div>
  )
}
