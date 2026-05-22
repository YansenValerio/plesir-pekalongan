import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useBeritaList } from '@/hooks/useSupabaseData'
import Icon from '@/components/common/Icon'
import PageMeta from '@/components/common/PageMeta'
import type { Berita } from '@/types'

const PAGE_SIZE = 9

type SortMode = 'terbaru' | 'terpopuler' | 'editor'
type KategoriId = Berita['kategori'] | 'all'

const KATEGORI_LIST: { id: KategoriId; label: string; label_en: string }[] = [
  { id: 'all', label: 'Semua', label_en: 'All' },
  { id: 'pariwisata', label: 'Pariwisata', label_en: 'Tourism' },
  { id: 'budaya', label: 'Budaya', label_en: 'Culture' },
  { id: 'kuliner', label: 'Kuliner', label_en: 'Culinary' },
  { id: 'event', label: 'Event', label_en: 'Event' },
  { id: 'umkm', label: 'UMKM', label_en: 'SME' },
  { id: 'heritage', label: 'Heritage', label_en: 'Heritage' },
  { id: 'tips-wisata', label: 'Tips Wisata', label_en: 'Travel Tips' },
  { id: 'hidden-gems', label: 'Hidden Gems', label_en: 'Hidden Gems' },
]

export function formatBeritaDate(dateStr: string, isEn: boolean): string {
  const d = new Date(dateStr)
  const months = isEn
    ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    : ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sep','Okt','Nov','Des']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export default function BeritaPage() {
  const [cat, setCat] = useState<KategoriId>('all')
  const [sort, setSort] = useState<SortMode>('terbaru')
  const [q, setQ] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const { data: beritaData, loading } = useBeritaList()

  const filtered = useMemo(() => {
    let list = beritaData.filter(b => {
      if (cat !== 'all' && b.kategori !== cat) return false
      if (q) {
        const qLow = q.toLowerCase()
        const judul = isEn ? b.judul_en : b.judul
        if (!judul.toLowerCase().includes(qLow)) return false
      }
      return true
    })
    if (sort === 'terbaru') list = [...list].sort((a, b) => new Date(b.tanggal_publish).getTime() - new Date(a.tanggal_publish).getTime())
    if (sort === 'terpopuler') list = [...list].sort((a, b) => b.views - a.views)
    if (sort === 'editor') list = list.filter(b => b.is_featured)
    return list
  }, [beritaData, cat, sort, q, isEn])

  useEffect(() => { setVisibleCount(PAGE_SIZE) }, [cat, sort, q])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  )

  return (
    <>
      <PageMeta
        title={isEn ? 'News & Updates' : 'Berita & Informasi'}
        description={isEn ? 'Latest news and updates about tourism, culture, and events in Pekalongan.' : 'Berita terkini dan informasi seputar pariwisata, budaya, dan event di Pekalongan.'}
        path="/berita"
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
            {isEn ? 'News & Stories' : 'Berita & Cerita'}
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
            {isEn ? 'News & Articles' : 'Berita & Artikel'}
          </h1>
          <p className="text-[16px] opacity-90 max-w-[640px] mt-3">
            {isEn
              ? 'Coastal stories, cultural reviews, and the latest news from the World Batik City.'
              : 'Cerita pesisir, ulasan budaya, dan kabar terkini dari Kota Batik Dunia.'}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="shell py-10 pb-[100px]">
        {/* Toolbar — Original: .dest-toolbar */}
        <div className="flex gap-4 justify-between mb-6 flex-wrap">
          <div className="flex items-center gap-2.5 bg-white px-[18px] py-3 rounded-full border border-[var(--line)] flex-1 max-w-[400px]">
            <Icon name="search" size={16} className="text-text-muted flex-shrink-0" />
            <input
              className="border-none outline-none flex-1 text-[14px] bg-transparent"
              placeholder={isEn ? 'Search articles...' : 'Cari artikel...'}
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>
          {/* Sort select */}
          <select
            className="px-4 py-3 rounded-full border border-[var(--line)] bg-white text-[14px] font-semibold text-dark pr-8 cursor-pointer"
            value={sort}
            onChange={e => setSort(e.target.value as SortMode)}
          >
            <option value="terbaru">{isEn ? 'Latest' : 'Terbaru'}</option>
            <option value="terpopuler">{isEn ? 'Most Popular' : 'Terpopuler'}</option>
            <option value="editor">{isEn ? "Editor's Pick" : 'Pilihan Editor'}</option>
          </select>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {KATEGORI_LIST.map(c => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`px-4 py-2 rounded-full border text-[13px] font-semibold transition-all duration-150 ${cat === c.id ? 'bg-primary text-white border-primary' : 'bg-white text-text-muted border-[var(--line)] hover:border-secondary hover:text-secondary'}`}
            >
              {isEn ? c.label_en : c.label}
            </button>
          ))}
        </div>

        {/* Featured article (first featured) */}
        {cat === 'all' && sort === 'terbaru' && q === '' && (
          <FeaturedCard
            b={beritaData.find(b => b.is_featured && b.is_trending) ?? beritaData[0]}
            isEn={isEn}
            onClick={slug => navigate(`/berita/${slug}`)}
          />
        )}

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-text-muted">
            <div className="text-5xl mb-4">📰</div>
            <p className="text-[16px]">{isEn ? 'No articles match your search.' : 'Tidak ada artikel yang sesuai.'}</p>
            <button className="btn btn-ghost mt-4" onClick={() => { setQ(''); setCat('all') }}>
              {isEn ? 'Reset Filters' : 'Reset Filter'}
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.slice(0, visibleCount).map(b => (
                <BeritaCard key={b.id} b={b} isEn={isEn} onClick={() => navigate(`/berita/${b.slug}`)} />
              ))}
            </div>
            {visibleCount < filtered.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
                  className="btn btn-ghost px-8"
                >
                  {isEn ? 'Load More' : 'Muat Lebih Banyak'}
                  <span className="ml-2 text-text-muted text-[13px]">
                    ({filtered.length - visibleCount} {isEn ? 'remaining' : 'tersisa'})
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

// ── Featured large card ───────────────────────────────────────────────────────
function FeaturedCard({ b, isEn, onClick }: { b: Berita; isEn: boolean; onClick: (slug: string) => void }) {
  if (!b) return null
  const judul = isEn ? b.judul_en : b.judul
  const excerpt = isEn ? b.excerpt_en : b.excerpt

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer mb-8 group"
      style={{ aspectRatio: '16/7', backgroundImage: `url(${b.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      onClick={() => onClick(b.slug)}
    >
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(0,0,0,.88))' }} />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-batik-red text-white">
            {b.kategori.replace('-', ' ')}
          </span>
          {b.is_featured && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-sun text-dark">
              {isEn ? 'Featured' : 'Pilihan'}
            </span>
          )}
        </div>
        <h2 className="serif text-white mb-2 group-hover:text-sun transition-colors" style={{ fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: 1.2, maxWidth: '800px' }}>
          {judul}
        </h2>
        <p className="text-white/80 text-[14px] max-w-[640px] line-clamp-2 italic" style={{ fontFamily: '"Playfair Display", serif' }}>
          {excerpt}
        </p>
        <div className="flex items-center gap-4 mt-4 text-[12px] text-white/70">
          {b.author.foto && (
            <img src={b.author.foto} alt="" className="w-7 h-7 rounded-full border-2 border-sun object-cover" />
          )}
          <span>{b.author.nama}</span>
          <span className="w-px h-4 bg-white/30" />
          <span className="flex items-center gap-1">
            <Icon name="calendar" size={11} />
            {formatBeritaDate(b.tanggal_publish, isEn)}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="clock" size={11} />
            {b.reading_time} {isEn ? 'min read' : 'menit'}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Berita Card ───────────────────────────────────────────────────────────────
// Original: .berita-card — aspect 3/4, bg-cover, gradient overlay, body absolute bottom
export function BeritaCard({ b, isEn, onClick }: { b: Berita; isEn: boolean; onClick: () => void }) {
  const judul = isEn ? b.judul_en : b.judul

  return (
    <div
      className="relative rounded-[12px] overflow-hidden cursor-pointer group hover:shadow-[0_16px_40px_rgba(0,0,0,.15)] transition-all duration-[250ms]"
      style={{ aspectRatio: '3/4', backgroundImage: `url(${b.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      onClick={onClick}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,.85))' }} />
      {/* Kategori badge */}
      <span className="absolute top-4 left-4 z-[2] px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-batik-red text-white">
        {b.kategori.replace('-', ' ')}
      </span>
      {/* Trending badge */}
      {b.is_trending && (
        <span className="absolute top-4 right-4 z-[2] px-2.5 py-1 rounded-md text-[11px] font-bold bg-sun text-dark">
          🔥 {isEn ? 'Trending' : 'Trending'}
        </span>
      )}
      {/* Card body — Original: .berita-card-body absolute bottom */}
      <div className="absolute left-5 right-5 bottom-5 z-[2] text-white">
        <h3 className="font-sans text-[17px] font-bold leading-[1.25] mb-2.5 group-hover:text-sun transition-colors">
          {judul}
        </h3>
        {/* Original: .berita-meta */}
        <div className="flex items-center gap-2.5 text-[11px] opacity-90">
          <span className="flex items-center gap-1">
            <Icon name="calendar" size={11} />
            {formatBeritaDate(b.tanggal_publish, isEn)}
          </span>
          <span className="w-px h-3 bg-white/40" />
          <span className="flex items-center gap-1">
            <Icon name="clock" size={11} />
            {b.reading_time} {isEn ? 'min' : 'mnt'}
          </span>
        </div>
      </div>
    </div>
  )
}
