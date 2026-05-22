import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Pesan {
  id: string
  nama: string
  email: string
  subjek: string
  pesan: string
  created_at: string
}

export default function PesanListPage() {
  const [data, setData] = useState<Pesan[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const { data: rows } = await supabase
      .from('pesan_kontak')
      .select('*')
      .order('created_at', { ascending: false })
    setData((rows as Pesan[]) ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: string) {
    if (!confirm('Hapus pesan ini?')) return
    setDeleting(id)
    await supabase.from('pesan_kontak').delete().eq('id', id)
    setData(prev => prev.filter(p => p.id !== id))
    setDeleting(null)
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
  }

  const rowStyle = { borderBottom: '1px solid rgba(255,255,255,.06)' }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="serif text-white text-xl font-semibold">Pesan Masuk</h1>
        <span className="text-white/40 text-sm">{data.length} pesan</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-7 h-7 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <div className="text-4xl mb-3">✉️</div>
          <p>Belum ada pesan masuk</p>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,.08)' }}>
          {/* Header */}
          <div
            className="grid grid-cols-[1fr_1fr_1.5fr_auto] gap-4 px-5 py-3 text-white/40 text-xs font-semibold uppercase tracking-wider"
            style={{ background: 'rgba(255,255,255,.04)' }}
          >
            <span>Pengirim</span>
            <span>Subjek</span>
            <span>Tanggal</span>
            <span />
          </div>

          {data.map(p => (
            <div key={p.id}>
              {/* Row */}
              <div
                className="grid grid-cols-[1fr_1fr_1.5fr_auto] gap-4 px-5 py-4 items-center cursor-pointer hover:bg-white/[.03] transition-colors"
                style={rowStyle}
                onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
              >
                <div className="min-w-0">
                  <div className="text-white text-sm font-semibold truncate">{p.nama}</div>
                  <div className="text-white/40 text-xs truncate">{p.email}</div>
                </div>
                <div className="text-white/70 text-sm truncate">{p.subjek}</div>
                <div className="text-white/40 text-xs">{formatDate(p.created_at)}</div>
                <div className="flex items-center gap-2">
                  <span className="text-white/40 text-xs transition-transform duration-150" style={{ display: 'inline-block', transform: expandedId === p.id ? 'rotate(180deg)' : 'none' }}>
                    ▾
                  </span>
                  <button
                    onClick={e => { e.stopPropagation(); handleDelete(p.id) }}
                    disabled={deleting === p.id}
                    className="text-red-400/60 hover:text-red-400 text-xs px-2 py-1 rounded transition-colors disabled:opacity-40"
                  >
                    Hapus
                  </button>
                </div>
              </div>

              {/* Expanded */}
              {expandedId === p.id && (
                <div
                  className="px-5 py-4 text-white/70 text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ background: 'rgba(255,255,255,.02)', borderBottom: '1px solid rgba(255,255,255,.06)' }}
                >
                  <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Pesan</div>
                  {p.pesan}
                  <a
                    href={`mailto:${p.email}?subject=Re: ${encodeURIComponent(p.subjek)}`}
                    className="inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full text-xs font-semibold text-dark"
                    style={{ background: 'var(--sun)' }}
                  >
                    ↩ Balas via Email
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
