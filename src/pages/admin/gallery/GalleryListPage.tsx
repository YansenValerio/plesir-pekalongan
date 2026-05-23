import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { UserGalleryItem } from '@/types'
import AdminTable from '../components/AdminTable'

export default function GalleryListPage() {
  const [rows, setRows] = useState<UserGalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  function load() {
    setLoading(true)
    supabase.from('user_gallery').select('*').order('posted_at', { ascending: false })
      .then(({ data }) => { setRows((data as UserGalleryItem[]) ?? []); setLoading(false) })
  }

  useEffect(load, [])

  async function handleDelete(id: string) {
    if (!confirm('Hapus foto ini?')) return
    await supabase.from('user_gallery').delete().eq('id', id)
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="serif text-white text-2xl font-semibold">Galeri Wisatawan</h1>
          <p className="text-white/50 text-sm mt-0.5">{rows.length} foto terdaftar</p>
        </div>
        <Link to="/admin/gallery/new" className="px-4 py-2 rounded-full text-sm font-semibold text-dark" style={{ background: 'var(--sun)' }}>
          + Tambah
        </Link>
      </div>

      <AdminTable
        rows={rows}
        loading={loading}
        keyFn={r => r.id}
        columns={[
          {
            header: 'Foto', width: '80px',
            render: r => (
              <img src={r.image} alt="" className="w-14 h-14 rounded-lg object-cover" />
            ),
          },
          {
            header: 'Pengirim',
            render: r => (
              <div className="flex items-center gap-2 min-w-0">
                {r.user_avatar && <img src={r.user_avatar} alt="" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />}
                <div className="min-w-0">
                  <div className="font-medium text-white text-sm truncate">{r.username}</div>
                  <div className="text-white/40 text-xs truncate max-w-[280px]">{r.caption}</div>
                </div>
              </div>
            ),
          },
          {
            header: 'Hashtags', width: '180px',
            render: r => (
              <div className="flex flex-wrap gap-1">
                {r.hashtags.slice(0, 2).map(h => (
                  <span key={h} className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70">#{h}</span>
                ))}
                {r.hashtags.length > 2 && <span className="text-[10px] text-white/40">+{r.hashtags.length - 2}</span>}
              </div>
            ),
          },
          {
            header: 'Likes', width: '70px',
            render: r => <span className="text-white/60 text-sm">{r.likes.toLocaleString('id-ID')}</span>,
          },
          {
            header: 'Tanggal', width: '110px',
            render: r => <span className="text-white/50 text-xs">{new Date(r.posted_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>,
          },
          {
            header: 'Aksi', width: '120px',
            render: r => (
              <div className="flex gap-2">
                <Link to={`/admin/gallery/${r.id}/edit`} className="text-xs px-3 py-1 rounded-full text-white/70 hover:text-white" style={{ border: '1px solid rgba(255,255,255,.2)' }}>
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
