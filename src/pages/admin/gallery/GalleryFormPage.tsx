import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import FormField from '../components/FormField'
import ImageUpload from '../components/ImageUpload'

function blank() {
  return {
    id: '', username: '', user_avatar: '', image: '',
    caption: '', likes: '0',
    posted_at: new Date().toISOString().split('T')[0],
    destinasi_tagged: '', hashtags: '',
  }
}

export default function GalleryFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [f, setF] = useState(blank())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    supabase.from('user_gallery').select('*').eq('id', id).single().then(({ data }) => {
      if (!data) return
      const d = data as Record<string, unknown>
      setF({
        id: String(d.id ?? ''),
        username: String(d.username ?? ''),
        user_avatar: String(d.user_avatar ?? ''),
        image: String(d.image ?? ''),
        caption: String(d.caption ?? ''),
        likes: String(d.likes ?? 0),
        posted_at: String(d.posted_at ?? '').split('T')[0],
        destinasi_tagged: String(d.destinasi_tagged ?? ''),
        hashtags: Array.isArray(d.hashtags) ? (d.hashtags as string[]).join('\n') : '',
      })
    })
  }, [id])

  function set(key: keyof typeof f) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setF(prev => ({ ...prev, [key]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      id: f.id,
      username: f.username,
      user_avatar: f.user_avatar || null,
      image: f.image,
      caption: f.caption,
      likes: Number(f.likes),
      posted_at: new Date(f.posted_at).toISOString(),
      destinasi_tagged: f.destinasi_tagged || null,
      hashtags: f.hashtags.split('\n').map(s => s.trim().replace(/^#/, '')).filter(Boolean),
    }

    const { error: err } = isEdit
      ? await supabase.from('user_gallery').update(payload).eq('id', id!)
      : await supabase.from('user_gallery').insert(payload)

    setSaving(false)
    if (err) { setError(err.message); return }
    navigate('/admin/gallery')
  }

  const sectionClass = 'rounded-xl p-6 flex flex-col gap-4 mb-4'
  const sectionStyle = { background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/admin/gallery')} className="text-white/50 hover:text-white text-sm">← Kembali</button>
        <h1 className="serif text-white text-xl font-semibold">{isEdit ? 'Edit Foto' : 'Foto Baru'}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Identitas */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Identitas</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="ID" required value={f.id} onChange={set('id')} disabled={isEdit} placeholder="ug-026" hint={isEdit ? 'Tidak bisa diubah' : ''} />
            <FormField label="Username" required value={f.username} onChange={set('username')} placeholder="@wisatawan_keren" />
          </div>
          <FormField label="Tanggal Posting" required type="date" value={f.posted_at} onChange={set('posted_at')} />
        </div>

        {/* Foto */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Foto</h2>
          <p className="text-white/40 text-xs -mt-2">Rekomendasi: 800×800px (square)</p>
          <ImageUpload
            label="Foto Utama" required
            value={f.image}
            onChange={url => setF(prev => ({ ...prev, image: url }))}
            folder="gallery"
          />
          <ImageUpload
            label="Avatar User"
            value={f.user_avatar}
            onChange={url => setF(prev => ({ ...prev, user_avatar: url }))}
            folder="gallery/avatar"
            hint="100×100px (square)"
          />
        </div>

        {/* Caption */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Detail</h2>
          <FormField as="textarea" label="Caption" required rows={3} value={f.caption} onChange={set('caption')} />
          <FormField label="Hashtags" as="textarea" rows={3} value={f.hashtags} onChange={set('hashtags')} hint="Satu hashtag per baris (tanpa #)" />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Likes" type="number" value={f.likes} onChange={set('likes')} />
            <FormField label="Destinasi Terkait" value={f.destinasi_tagged} onChange={set('destinasi_tagged')} placeholder="pantai-pasir-kencana" hint="Opsional · ID destinasi" />
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-full font-semibold text-sm text-dark disabled:opacity-50" style={{ background: 'var(--sun)' }}>
            {saving ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Foto'}
          </button>
          <button type="button" onClick={() => navigate('/admin/gallery')} className="px-6 py-2.5 rounded-full text-sm text-white/60 hover:text-white" style={{ border: '1px solid rgba(255,255,255,.2)' }}>
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
