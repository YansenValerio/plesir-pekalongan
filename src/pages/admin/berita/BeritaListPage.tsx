import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Berita } from '@/types'
import AdminTable from '../components/AdminTable'

export default function BeritaListPage() {
  const [rows, setRows] = useState<Berita[]>([])
  const [loading, setLoading] = useState(true)

  function load() {
    setLoading(true)
    supabase.from('berita').select('*').order('tanggal_publish', { ascending: false })
      .then(({ data }) => { setRows((data as Berita[]) ?? []); setLoading(false) })
  }

  useEffect(load, [])

  async function handleDelete(id: string) {
    if (!confirm('Hapus berita ini?')) return
    await supabase.from('berita').delete().eq('id', id)
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="serif text-white text-2xl font-semibold">Berita</h1>
          <p className="text-white/50 text-sm mt-0.5">{rows.length} artikel terdaftar</p>
        </div>
        <Link to="/admin/berita/new" className="px-4 py-2 rounded-full text-sm font-semibold text-dark" style={{ background: 'var(--sun)' }}>
          + Tambah
        </Link>
      </div>

      <AdminTable
        rows={rows}
        loading={loading}
        keyFn={r => r.id}
        columns={[
          { header: 'Judul', render: r => <span className="font-medium text-white">{r.judul}</span> },
          { header: 'Kategori', render: r => <span className="capitalize text-white/70">{r.kategori}</span>, width: '120px' },
          { header: 'Tanggal', render: r => <span className="text-white/60">{new Date(r.tanggal_publish).toLocaleDateString('id-ID')}</span>, width: '110px' },
          { header: 'Featured', render: r => <span>{r.is_featured ? '⭐' : '—'}</span>, width: '80px' },
          {
            header: 'Aksi', width: '120px',
            render: r => (
              <div className="flex gap-2">
                <Link to={`/admin/berita/${r.id}/edit`} className="text-xs px-3 py-1 rounded-full text-white/70 hover:text-white" style={{ border: '1px solid rgba(255,255,255,.2)' }}>
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
