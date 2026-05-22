import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import FormField from '../components/FormField'

const KATEGORI = ['pariwisata', 'budaya', 'kuliner', 'event', 'umkm', 'heritage', 'tips-wisata', 'hidden-gems'] as const

function blank() {
  return {
    id: '', slug: '', judul: '', judul_en: '',
    kategori: 'pariwisata', cover: '',
    excerpt: '', excerpt_en: '',
    konten: '', konten_en: '',
    author_nama: '', author_foto: '', author_bio: '',
    tanggal_publish: new Date().toISOString().split('T')[0],
    reading_time: '5', tags: '',
    views: '0', is_featured: false, is_trending: false,
  }
}

export default function BeritaFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [f, setF] = useState(blank())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    supabase.from('berita').select('*').eq('id', id).single().then(({ data }) => {
      if (!data) return
      const d = data as Record<string, unknown>
      const author = (d.author as Record<string, string>) ?? {}
      setF({
        id: String(d.id ?? ''), slug: String(d.slug ?? ''),
        judul: String(d.judul ?? ''), judul_en: String(d.judul_en ?? ''),
        kategori: String(d.kategori ?? 'pariwisata'), cover: String(d.cover ?? ''),
        excerpt: String(d.excerpt ?? ''), excerpt_en: String(d.excerpt_en ?? ''),
        konten: String(d.konten ?? ''), konten_en: String(d.konten_en ?? ''),
        author_nama: String(author.nama ?? ''), author_foto: String(author.foto ?? ''), author_bio: String(author.bio ?? ''),
        tanggal_publish: String(d.tanggal_publish ?? '').split('T')[0],
        reading_time: String(d.reading_time ?? 5),
        tags: Array.isArray(d.tags) ? (d.tags as string[]).join('\n') : '',
        views: String(d.views ?? 0),
        is_featured: Boolean(d.is_featured), is_trending: Boolean(d.is_trending),
      })
    })
  }, [id])

  function set(key: keyof typeof f) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setF(prev => ({ ...prev, [key]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }))
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      id: f.id, slug: f.slug,
      judul: f.judul, judul_en: f.judul_en,
      kategori: f.kategori, cover: f.cover,
      excerpt: f.excerpt, excerpt_en: f.excerpt_en,
      konten: f.konten, konten_en: f.konten_en,
      author: { nama: f.author_nama, foto: f.author_foto || undefined, bio: f.author_bio || undefined },
      tanggal_publish: f.tanggal_publish,
      reading_time: Number(f.reading_time),
      tags: f.tags.split('\n').map(s => s.trim()).filter(Boolean),
      views: Number(f.views),
      is_featured: f.is_featured, is_trending: f.is_trending,
    }

    const { error: err } = isEdit
      ? await supabase.from('berita').update(payload).eq('id', id!)
      : await supabase.from('berita').insert(payload)

    setSaving(false)
    if (err) { setError(err.message); return }
    navigate('/admin/berita')
  }

  const sectionClass = "rounded-xl p-6 flex flex-col gap-4 mb-4"
  const sectionStyle = { background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/admin/berita')} className="text-white/50 hover:text-white text-sm">← Kembali</button>
        <h1 className="serif text-white text-xl font-semibold">{isEdit ? 'Edit Berita' : 'Berita Baru'}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Identitas */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Identitas</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="ID" required value={f.id} onChange={set('id')} disabled={isEdit} hint={isEdit ? 'Tidak bisa diubah' : ''} />
            <FormField label="Slug" required value={f.slug} onChange={set('slug')} placeholder="nama-artikel" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Judul (ID)" required value={f.judul} onChange={set('judul')} />
            <FormField label="Judul (EN)" required value={f.judul_en} onChange={set('judul_en')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1.5">Kategori</label>
              <select value={f.kategori} onChange={set('kategori')} className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none" style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.15)' }}>
                {KATEGORI.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <FormField label="Tanggal Publish" required type="date" value={f.tanggal_publish} onChange={set('tanggal_publish')} />
          </div>
          <FormField label="URL Cover" required value={f.cover} onChange={set('cover')} placeholder="https://..." />
        </div>

        {/* Konten */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Konten</h2>
          <FormField as="textarea" label="Excerpt (ID)" required rows={2} value={f.excerpt} onChange={set('excerpt')} />
          <FormField as="textarea" label="Excerpt (EN)" required rows={2} value={f.excerpt_en} onChange={set('excerpt_en')} />
          <FormField as="textarea" label="Konten (ID) — Markdown" required rows={10} value={f.konten} onChange={set('konten')} />
          <FormField as="textarea" label="Konten (EN) — Markdown" required rows={10} value={f.konten_en} onChange={set('konten_en')} />
        </div>

        {/* Author */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Penulis</h2>
          <FormField label="Nama Penulis" required value={f.author_nama} onChange={set('author_nama')} />
          <FormField label="URL Foto Penulis" value={f.author_foto} onChange={set('author_foto')} />
          <FormField as="textarea" label="Bio Penulis" rows={2} value={f.author_bio} onChange={set('author_bio')} />
        </div>

        {/* Meta */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Meta</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Waktu Baca (menit)" type="number" value={f.reading_time} onChange={set('reading_time')} />
            <FormField label="Views" type="number" value={f.views} onChange={set('views')} />
          </div>
          <FormField label="Tags" value={f.tags} onChange={set('tags')} hint="Satu tag per baris" />
          <div className="flex gap-6">
            {(['is_featured', 'is_trending'] as const).map(key => (
              <label key={key} className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
                <input type="checkbox" checked={f[key] as boolean} onChange={set(key)} className="accent-[#088395] w-4 h-4" />
                {key === 'is_featured' ? 'Featured' : 'Trending'}
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-full font-semibold text-sm text-dark disabled:opacity-50" style={{ background: 'var(--sun)' }}>
            {saving ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Buat Berita'}
          </button>
          <button type="button" onClick={() => navigate('/admin/berita')} className="px-6 py-2.5 rounded-full text-sm text-white/60 hover:text-white" style={{ border: '1px solid rgba(255,255,255,.2)' }}>
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
