import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDestinasiList } from '@/hooks/useSupabaseData'
import { formatRupiah } from '@/utils/currency'
import { CATEGORIES, WILAYAH_LABELS, type KategoriId } from '@/constants'
import type { Destinasi } from '@/types'
import Icon from '@/components/common/Icon'

// Format jam_operasional → short display string
function formatJam(d: Destinasi): string {
  if (!d.jam_operasional) return '—'
  const jam = d.jam_operasional.senin ?? Object.values(d.jam_operasional)[0]
  return jam.replace('-', ' — ')
}

// Format tiket.dewasa → Rupiah or Gratis
function formatTiket(d: Destinasi): string {
  return d.tiket.dewasa === 0 ? 'Gratis' : formatRupiah(d.tiket.dewasa)
}

interface Props {
  initialKategori?: KategoriId | 'all'
}

export default function DestinasiListing({ initialKategori = 'all' }: Props) {
  const [cat, setCat] = useState<KategoriId | 'all'>(initialKategori)
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const { data: destinasiData, loading } = useDestinasiList()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  )

  const filtered = destinasiData.filter(d =>
    (cat === 'all' || d.kategori === cat) &&
    (q === '' ||
      d.nama.toLowerCase().includes(q.toLowerCase()) ||
      (d.nama_en ?? '').toLowerCase().includes(q.toLowerCase()) ||
      WILAYAH_LABELS[d.wilayah]?.toLowerCase().includes(q.toLowerCase()))
  )

  const activeCat = CATEGORIES.find(c => c.id === cat)

  return (
    <>
      {/* Page Hero — Original: .page-hero */}
      <div
        className="relative pt-[160px] pb-[60px] text-white overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
      >
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 30%, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
        <div className="shell relative">
          <div className="flex items-center gap-4 text-[12px] font-bold tracking-[0.2em] uppercase mb-4 text-white/80">
            <span className="block w-[60px] h-px bg-sun" />
            {isEn ? 'Destinations' : 'Destinasi'}
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
            {activeCat ? (isEn ? activeCat.label_en : activeCat.label) : (isEn ? 'All Destinations' : 'Semua Destinasi')}
          </h1>
          <p className="text-[16px] opacity-90 max-w-[640px] mt-3">
            {activeCat ? (isEn ? activeCat.sub_en : activeCat.sub) : (isEn ? 'Explore all tourism riches of Pekalongan City and Regency.' : 'Jelajahi seluruh kekayaan wisata Kota dan Kabupaten Pekalongan.')}
          </p>
        </div>
      </div>

      {/* Listing body */}
      <div className="shell py-10 pb-[100px]">
        {/* Toolbar — Original: .dest-toolbar */}
        <div className="flex gap-4 justify-between mb-8 flex-wrap">
          {/* Search */}
          <div className="flex items-center gap-2.5 bg-white px-[18px] py-3 rounded-full border border-[var(--line)] flex-1 max-w-[400px]">
            <Icon name="search" size={16} className="text-text-muted flex-shrink-0" />
            <input
              className="border-none outline-none flex-1 text-[14px] bg-transparent"
              placeholder={isEn ? 'Search destinations, area...' : 'Cari destinasi, area...'}
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>

          {/* Category tabs — Original: .cat-tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-wrap">
            <button
              className={`px-[18px] py-2.5 rounded-full border text-[13px] font-semibold whitespace-nowrap transition-all duration-150 ${cat === 'all' ? 'bg-primary text-white border-primary' : 'bg-white text-text-muted border-[var(--line)] hover:border-secondary hover:text-secondary'}`}
              onClick={() => setCat('all')}
            >
              {isEn ? 'All' : 'Semua'}
            </button>
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={`px-[18px] py-2.5 rounded-full border text-[13px] font-semibold whitespace-nowrap transition-all duration-150 ${cat === c.id ? 'bg-primary text-white border-primary' : 'bg-white text-text-muted border-[var(--line)] hover:border-secondary hover:text-secondary'}`}
                onClick={() => setCat(c.id)}
              >
                {c.icon} {isEn ? c.label_en : c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {q && (
          <p className="text-[13px] text-text-muted mb-6">
            {filtered.length} {isEn ? 'destinations found for' : 'destinasi ditemukan untuk'} <b className="text-primary">"{q}"</b>
          </p>
        )}

        {/* Grid or empty state */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-text-muted">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-[16px]">{isEn ? 'No destinations match your search.' : 'Tidak ada destinasi yang sesuai.'}</p>
            <button className="btn btn-ghost mt-4" onClick={() => { setQ(''); setCat('all') }}>
              {isEn ? 'Reset Filters' : 'Reset Filter'}
            </button>
          </div>
        ) : (
          // Original: .dest-grid — 3 columns, gap:24px
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(d => (
              <DestinasiCard
                key={d.id}
                d={d}
                isEn={isEn}
                onNavigate={() => navigate(`/destinasi/${d.kategori}/${d.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

// ── Destination Card ──────────────────────────────────────────────────────────
function DestinasiCard({ d, isEn, onNavigate }: { d: Destinasi; isEn: boolean; onNavigate: () => void }) {
  const cat = CATEGORIES.find(c => c.id === d.kategori)
  const area = WILAYAH_LABELS[d.wilayah] ?? d.wilayah

  return (
    // Original: .dest-card — rounded-[16px], border, hover translateY(-4px) + shadow
    <div
      className="bg-white rounded-[16px] overflow-hidden cursor-pointer border border-[var(--line)] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,.08)] hover:border-transparent"
      onClick={onNavigate}
    >
      {/* Original: .dest-cover — aspect-ratio:4/3 */}
      <div
        className="relative bg-cover bg-center"
        style={{ aspectRatio: '4/3', backgroundImage: `url(${d.foto_cover})` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,.6))' }} />
        {/* Category badge — Original: .dest-cat */}
        <span className="absolute top-[14px] left-[14px] z-[2] px-2.5 py-[5px] bg-white/95 rounded-[6px] text-[11px] font-bold text-primary">
          {cat?.icon} {isEn ? cat?.label_en : cat?.label}
        </span>
        {/* Area badge — Original: .dest-area */}
        <div className="absolute bottom-3 left-[14px] z-[2] text-white text-[12px] font-semibold flex items-center gap-1.5">
          <Icon name="location" size={12} /> {area}
        </div>
      </div>

      {/* Card body — Original: .dest-body — padding:20px */}
      <div className="p-5">
        <h3 className="font-sans text-[17px] font-bold text-primary mb-2 leading-[1.3]">
          {isEn ? d.nama_en : d.nama}
        </h3>
        <p className="text-[13px] text-text-muted leading-[1.55] m-0 mb-3.5 line-clamp-2">
          {d.deskripsi_singkat}
        </p>
        {/* Meta row — Original: .dest-meta */}
        <div className="flex gap-3.5 text-[12px] text-text-muted">
          <span className="inline-flex items-center gap-1">
            <Icon name="clock" size={12} /> {formatJam(d)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="ticket" size={12} /> <b className="text-primary font-bold">{formatTiket(d)}</b>
          </span>
          {d.rating > 0 && (
            <span className="inline-flex items-center gap-1 ml-auto text-sun font-bold">
              ★ {d.rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
