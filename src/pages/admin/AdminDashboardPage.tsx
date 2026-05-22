import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

interface Count { destinasi: number; berita: number; event: number }

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Count>({ destinasi: 0, berita: 0, event: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('destinasi').select('*', { count: 'exact', head: true }),
      supabase.from('berita').select('*', { count: 'exact', head: true }),
      supabase.from('event').select('*', { count: 'exact', head: true }),
    ]).then(([d, b, e]) => {
      setCounts({ destinasi: d.count ?? 0, berita: b.count ?? 0, event: e.count ?? 0 })
      setLoading(false)
    })
  }, [])

  const cards = [
    { label: 'Destinasi', count: counts.destinasi, icon: '🏖', to: '/admin/destinasi', color: '#088395' },
    { label: 'Berita', count: counts.berita, icon: '📰', to: '/admin/berita', color: '#F2A93B' },
    { label: 'Event', count: counts.event, icon: '🎉', to: '/admin/event', color: '#0A4D68' },
  ]

  return (
    <div className="p-8">
      <h1 className="serif text-white text-2xl font-semibold mb-2">Dashboard</h1>
      <p className="text-white/50 text-sm mb-8">Ringkasan konten Plesir Pekalongan</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(card => (
          <Link
            key={card.label}
            to={card.to}
            className="rounded-xl p-6 flex items-center gap-4 transition-opacity hover:opacity-90"
            style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)' }}
          >
            <div className="text-3xl">{card.icon}</div>
            <div>
              <div className="text-white/60 text-xs font-semibold uppercase tracking-wider">{card.label}</div>
              <div className="serif text-3xl font-semibold mt-0.5" style={{ color: card.color }}>
                {loading ? '—' : card.count}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl p-6" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }}>
        <h2 className="text-white/70 text-sm font-semibold mb-4">Aksi Cepat</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: '+ Destinasi Baru', to: '/admin/destinasi/new' },
            { label: '+ Berita Baru', to: '/admin/berita/new' },
            { label: '+ Event Baru', to: '/admin/event/new' },
          ].map(a => (
            <Link
              key={a.to}
              to={a.to}
              className="px-4 py-2 rounded-full text-sm font-semibold text-dark transition-opacity hover:opacity-90"
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
