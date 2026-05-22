import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { FAQ } from '@/types'
import AdminTable from '../components/AdminTable'

const KAT_COLORS: Record<string, string> = {
  umum: '#6366f1', transportasi: '#0ea5e9', akomodasi: '#f59e0b',
  kuliner: '#ef4444', budaya: '#8b5cf6', keamanan: '#10b981',
  wisata: '#06b6d4', tic: '#f97316',
}

export default function FaqListPage() {
  const [rows, setRows] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)

  function load() {
    setLoading(true)
    supabase.from('faq').select('*').order('urutan')
      .then(({ data }) => { setRows((data as FAQ[]) ?? []); setLoading(false) })
  }

  useEffect(load, [])

  async function handleDelete(id: string) {
    if (!confirm('Hapus FAQ ini?')) return
    await supabase.from('faq').delete().eq('id', id)
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="serif text-white text-2xl font-semibold">FAQ</h1>
          <p className="text-white/50 text-sm mt-0.5">{rows.length} pertanyaan terdaftar</p>
        </div>
        <Link to="/admin/faq/new" className="px-4 py-2 rounded-full text-sm font-semibold text-dark" style={{ background: 'var(--sun)' }}>
          + Tambah
        </Link>
      </div>

      <AdminTable
        rows={rows}
        loading={loading}
        keyFn={r => r.id}
        columns={[
          {
            header: 'Pertanyaan',
            render: r => (
              <div className="min-w-0">
                <div className="font-medium text-white text-sm truncate max-w-[400px]">{r.pertanyaan}</div>
                <div className="text-white/40 text-xs truncate max-w-[400px]">{r.pertanyaan_en}</div>
              </div>
            ),
          },
          {
            header: 'Kategori', width: '120px',
            render: r => (
              <span
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize text-white"
                style={{ background: KAT_COLORS[r.kategori] ?? '#64748b' }}
              >
                {r.kategori}
              </span>
            ),
          },
          {
            header: 'Urutan', width: '80px',
            render: r => <span className="text-white/60 text-sm">{r.urutan}</span>,
          },
          {
            header: 'Populer', width: '80px',
            render: r => <span>{r.is_popular ? '⭐' : '—'}</span>,
          },
          {
            header: 'Aksi', width: '120px',
            render: r => (
              <div className="flex gap-2">
                <Link
                  to={`/admin/faq/${r.id}/edit`}
                  className="text-xs px-3 py-1 rounded-full text-white/70 hover:text-white"
                  style={{ border: '1px solid rgba(255,255,255,.2)' }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-xs px-3 py-1 rounded-full text-red-400 hover:text-red-300"
                  style={{ border: '1px solid rgba(239,68,68,.3)' }}
                >
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
