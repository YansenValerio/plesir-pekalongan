import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

interface Counts {
  destinasi: number
  berita: number
  event: number
  faq: number
  pesan: number
}

interface RecentPesan {
  id: string
  nama: string
  email: string
  subjek: string
  created_at: string
}

interface TopBerita {
  id: string
  judul: string
  views: number
  kategori: string
}

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Counts>({ destinasi: 0, berita: 0, event: 0, faq: 0, pesan: 0 })
  const [recentPesan, setRecentPesan] = useState<RecentPesan[]>([])
  const [topBerita, setTopBerita] = useState<TopBerita[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('destinasi').select('*', { count: 'exact', head: true }),
      supabase.from('berita').select('*', { count: 'exact', head: true }),
      supabase.from('event').select('*', { count: 'exact', head: true }),
      supabase.from('faq').select('*', { count: 'exact', head: true }),
      supabase.from('pesan_kontak').select('*', { count: 'exact', head: true }),
      supabase.from('pesan_kontak').select('id, nama, email, subjek, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('berita').select('id, judul, views, kategori').order('views', { ascending: false }).limit(5),
    ]).then(([d, b, e, f, p, pesan, berita]) => {
      setCounts({
        destinasi: d.count ?? 0,
        berita: b.count ?? 0,
        event: e.count ?? 0,
        faq: f.count ?? 0,
        pesan: p.count ?? 0,
      })
      setRecentPesan((pesan.data as RecentPesan[]) ?? [])
      setTopBerita((berita.data as TopBerita[]) ?? [])
      setLoading(false)
    })
  }, [])

  const statCards = [
    { label: 'Destinasi', count: counts.destinasi, icon: '🏖', to: '/admin/destinasi', color: '#088395' },
    { label: 'Berita', count: counts.berita, icon: '📰', to: '/admin/berita', color: '#F2A93B' },
    { label: 'Event', count: counts.event, icon: '🎉', to: '/admin/event', color: '#0A4D68' },
    { label: 'FAQ', count: counts.faq, icon: '❓', to: '/admin/faq', color: '#8b5cf6' },
    { label: 'Pesan', count: counts.pesan, icon: '✉️', to: '/admin/pesan', color: '#10b981' },
  ]

  const sectionStyle = { background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }

  function timeAgo(iso: string) {
    const diff = Date.now() - new Date(iso).getTime()
    const m = Math.floor(diff / 60000)
    if (m < 60) return `${m} menit lalu`
    const h = Math.floor(m / 60)
    if (h < 24) return `${h} jam lalu`
    return `${Math.floor(h / 24)} hari lalu`
  }

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="serif text-white text-2xl font-semibold mb-1">Dashboard</h1>
      <p className="text-white/40 text-sm mb-8">Ringkasan konten Plesir Pekalongan</p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {statCards.map(card => (
          <Link
            key={card.label}
            to={card.to}
            className="rounded-xl p-5 flex flex-col gap-3 transition-all hover:scale-[1.02]"
            style={sectionStyle}
          >
            <span className="text-2xl">{card.icon}</span>
            <div>
              <div className="serif font-semibold" style={{ color: card.color, fontSize: 32 }}>
                {loading ? '—' : card.count}
              </div>
              <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-0.5">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Pesan terbaru */}
        <div className="rounded-xl p-5" style={sectionStyle}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Pesan Terbaru</h2>
            <Link to="/admin/pesan" className="text-white/40 hover:text-white text-xs transition-colors">Lihat semua →</Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-6">
              <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
            </div>
          ) : recentPesan.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-6">Belum ada pesan</p>
          ) : (
            <div className="flex flex-col gap-3">
              {recentPesan.map(p => (
                <div key={p.id} className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-dark" style={{ background: 'var(--sun)' }}>
                    {p.nama.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-white text-sm font-medium truncate">{p.nama}</span>
                      <span className="text-white/30 text-[11px] flex-shrink-0">{timeAgo(p.created_at)}</span>
                    </div>
                    <div className="text-white/50 text-xs truncate">{p.subjek}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top berita by views */}
        <div className="rounded-xl p-5" style={sectionStyle}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Berita Terpopuler</h2>
            <Link to="/admin/berita" className="text-white/40 hover:text-white text-xs transition-colors">Lihat semua →</Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-6">
              <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
            </div>
          ) : topBerita.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-6">Belum ada berita</p>
          ) : (
            <div className="flex flex-col gap-3">
              {topBerita.map((b, i) => (
                <div key={b.id} className="flex items-center gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                  <span className="serif text-white/20 text-xl w-5 flex-shrink-0">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-white text-sm font-medium truncate">{b.judul}</div>
                    <div className="text-white/40 text-xs capitalize">{b.kategori}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-white/70 text-sm font-semibold">{b.views.toLocaleString('id-ID')}</div>
                    <div className="text-white/30 text-[11px]">views</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Aksi cepat */}
      <div className="rounded-xl p-5" style={sectionStyle}>
        <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4">Aksi Cepat</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: '+ Destinasi', to: '/admin/destinasi/new' },
            { label: '+ Berita', to: '/admin/berita/new' },
            { label: '+ Event', to: '/admin/event/new' },
            { label: '+ FAQ', to: '/admin/faq/new' },
          ].map(a => (
            <Link
              key={a.to}
              to={a.to}
              className="px-4 py-2 rounded-full text-sm font-semibold text-dark transition-opacity hover:opacity-85"
              style={{ background: 'var(--sun)' }}
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
