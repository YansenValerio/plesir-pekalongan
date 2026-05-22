import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import FormField from '../components/FormField'

const KATEGORI = ['umum', 'transportasi', 'akomodasi', 'kuliner', 'budaya', 'keamanan', 'wisata', 'tic'] as const

function blank() {
  return {
    id: '', kategori: 'umum',
    pertanyaan: '', pertanyaan_en: '',
    jawaban: '', jawaban_en: '',
    urutan: '0', is_popular: false,
  }
}

export default function FaqFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [f, setF] = useState(blank())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    supabase.from('faq').select('*').eq('id', id).single().then(({ data }) => {
      if (!data) return
      const d = data as Record<string, unknown>
      setF({
        id: String(d.id ?? ''),
        kategori: String(d.kategori ?? 'umum'),
        pertanyaan: String(d.pertanyaan ?? ''),
        pertanyaan_en: String(d.pertanyaan_en ?? ''),
        jawaban: String(d.jawaban ?? ''),
        jawaban_en: String(d.jawaban_en ?? ''),
        urutan: String(d.urutan ?? 0),
        is_popular: Boolean(d.is_popular),
      })
    })
  }, [id])

  function set(key: keyof typeof f) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setF(prev => ({ ...prev, [key]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      id: f.id,
      kategori: f.kategori,
      pertanyaan: f.pertanyaan, pertanyaan_en: f.pertanyaan_en,
      jawaban: f.jawaban, jawaban_en: f.jawaban_en,
      urutan: Number(f.urutan),
      is_popular: f.is_popular,
    }

    const { error: err } = isEdit
      ? await supabase.from('faq').update(payload).eq('id', id!)
      : await supabase.from('faq').insert(payload)

    setSaving(false)
    if (err) { setError(err.message); return }
    navigate('/admin/faq')
  }

  const sectionClass = 'rounded-xl p-6 flex flex-col gap-4 mb-4'
  const sectionStyle = { background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/admin/faq')} className="text-white/50 hover:text-white text-sm">← Kembali</button>
        <h1 className="serif text-white text-xl font-semibold">{isEdit ? 'Edit FAQ' : 'FAQ Baru'}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Identitas */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Identitas</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="ID" required
              value={f.id} onChange={set('id')}
              disabled={isEdit}
              hint={isEdit ? 'Tidak bisa diubah' : 'Contoh: faq-026'}
            />
            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1.5">
                Kategori <span className="text-red-400">*</span>
              </label>
              <select
                value={f.kategori} onChange={set('kategori')}
                className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none capitalize"
                style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.15)' }}
              >
                {KATEGORI.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Urutan" type="number" value={f.urutan} onChange={set('urutan')} hint="Angka kecil = tampil lebih awal" />
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
                <input type="checkbox" checked={f.is_popular} onChange={set('is_popular')} className="accent-[#088395] w-4 h-4" />
                Tandai sebagai Populer
              </label>
            </div>
          </div>
        </div>

        {/* Pertanyaan */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Pertanyaan</h2>
          <FormField as="textarea" label="Pertanyaan (ID)" required rows={2} value={f.pertanyaan} onChange={set('pertanyaan')} />
          <FormField as="textarea" label="Pertanyaan (EN)" required rows={2} value={f.pertanyaan_en} onChange={set('pertanyaan_en')} />
        </div>

        {/* Jawaban */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Jawaban</h2>
          <FormField as="textarea" label="Jawaban (ID)" required rows={5} value={f.jawaban} onChange={set('jawaban')} />
          <FormField as="textarea" label="Jawaban (EN)" required rows={5} value={f.jawaban_en} onChange={set('jawaban_en')} />
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-full font-semibold text-sm text-dark disabled:opacity-50" style={{ background: 'var(--sun)' }}>
            {saving ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Buat FAQ'}
          </button>
          <button type="button" onClick={() => navigate('/admin/faq')} className="px-6 py-2.5 rounded-full text-sm text-white/60 hover:text-white" style={{ border: '1px solid rgba(255,255,255,.2)' }}>
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
