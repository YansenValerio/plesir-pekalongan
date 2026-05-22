import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Event } from '@/types'
import AdminTable from '../components/AdminTable'

const STATUS_BADGE: Record<string, string> = {
  upcoming: '#F2A93B',
  ongoing: '#22c55e',
  past: '#6b7280',
}

export default function EventListPage() {
  const [rows, setRows] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  function load() {
    setLoading(true)
    supabase.from('event').select('*').order('tanggal_mulai', { ascending: false })
      .then(({ data }) => { setRows((data as Event[]) ?? []); setLoading(false) })
  }

  useEffect(load, [])

  async function handleDelete(id: string) {
    if (!confirm('Hapus event ini?')) return
    await supabase.from('event').delete().eq('id', id)
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="serif text-white text-2xl font-semibold">Event</h1>
          <p className="text-white/50 text-sm mt-0.5">{rows.length} event terdaftar</p>
        </div>
        <Link to="/admin/event/new" className="px-4 py-2 rounded-full text-sm font-semibold text-dark" style={{ background: 'var(--sun)' }}>
          + Tambah
        </Link>
      </div>

      <AdminTable
        rows={rows}
        loading={loading}
        keyFn={r => r.id}
        columns={[
          { header: 'Judul', render: r => <span className="font-medium text-white">{r.judul}</span> },
          { header: 'Kategori', render: r => <span className="capitalize text-white/70">{r.kategori}</span>, width: '100px' },
          {
            header: 'Status', width: '90px',
            render: r => (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${STATUS_BADGE[r.status]}22`, color: STATUS_BADGE[r.status] }}>
                {r.status}
              </span>
            ),
          },
          { header: 'Mulai', render: r => <span className="text-white/60">{new Date(r.tanggal_mulai).toLocaleDateString('id-ID')}</span>, width: '100px' },
          {
            header: 'Aksi', width: '120px',
            render: r => (
              <div className="flex gap-2">
                <Link to={`/admin/event/${r.id}/edit`} className="text-xs px-3 py-1 rounded-full text-white/70 hover:text-white" style={{ border: '1px solid rgba(255,255,255,.2)' }}>
                  Edit
                </Link>
                <button onClick={() => handleDelete(r.id)} className="text-xs px-3 py-1 rounded-full text-red-400 hover:text-red-300" style={{ border: '1px solid rgba(239,68,68,.3)' }}>
                  Hapus
                </button>
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}
