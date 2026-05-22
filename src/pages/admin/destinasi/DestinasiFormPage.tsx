import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import FormField from '../components/FormField'

const KATEGORI = ['alam', 'religi', 'budaya', 'kuliner', 'belanja'] as const
const WILAYAH  = ['utara', 'selatan', 'timur', 'barat'] as const
const HARI     = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'] as const

type KV = Record<string, string>

function arrToText(arr: unknown): string {
  if (!Array.isArray(arr)) return ''
  return arr.join('\n')
}
function textToArr(text: string): string[] {
  return text.split('\n').map(s => s.trim()).filter(Boolean)
}

function blank() {
  return {
    id: '', nama: '', nama_en: '', kategori: 'alam', wilayah: 'utara',
    deskripsi: '', deskripsi_en: '', deskripsi_singkat: '', foto_cover: '',
    galeri: '', fasilitas: '', tips: '', tips_en: '', tags: '',
    lokasi_alamat: '', lokasi_lat: '', lokasi_lng: '',
    tiket_dewasa: '', tiket_anak: '', tiket_parkir_motor: '', tiket_parkir_mobil: '', tiket_catatan: '',
    rating: '0', reviews_count: '0',
    ramah_muslim: false, ramah_anak: false, ramah_difabel: false,
    jam: {} as KV,
  }
}

export default function DestinasiFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [f, setF] = useState(blank())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    supabase.from('destinasi').select('*').eq('id', id).single().then(({ data }) => {
      if (!data) return
      const d = data as Record<string, unknown>
      const lok = (d.lokasi as KV) ?? {}
      const kor = (lok.koordinat as { lat?: string | number; lng?: string | number }) ?? {}
      const tiket = (d.tiket as KV) ?? {}
      const jam = (d.jam_operasional as KV) ?? {}
      setF({
        id: String(d.id ?? ''),
        nama: String(d.nama ?? ''), nama_en: String(d.nama_en ?? ''),
        kategori: String(d.kategori ?? 'alam'), wilayah: String(d.wilayah ?? 'utara'),
        deskripsi: String(d.deskripsi ?? ''), deskripsi_en: String(d.deskripsi_en ?? ''),
        deskripsi_singkat: String(d.deskripsi_singkat ?? ''),
        foto_cover: String(d.foto_cover ?? ''),
        galeri: arrToText(d.galeri), fasilitas: arrToText(d.fasilitas),
        tips: arrToText(d.tips), tips_en: arrToText(d.tips_en), tags: arrToText(d.tags),
        lokasi_alamat: String(lok.alamat ?? ''),
        lokasi_lat: String(kor.lat ?? ''), lokasi_lng: String(kor.lng ?? ''),
        tiket_dewasa: String(tiket.harga_dewasa ?? ''),
        tiket_anak: String(tiket.harga_anak ?? ''),
        tiket_parkir_motor: String(tiket.parkir_motor ?? ''),
        tiket_parkir_mobil: String(tiket.parkir_mobil ?? ''),
        tiket_catatan: String(tiket.catatan ?? ''),
        rating: String(d.rating ?? 0), reviews_count: String(d.reviews_count ?? 0),
        ramah_muslim: Boolean(d.ramah_muslim), ramah_anak: Boolean(d.ramah_anak), ramah_difabel: Boolean(d.ramah_difabel),
        jam: Object.fromEntries(HARI.map(h => [h, String((jam as KV)[h] ?? '')])),
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
      id: f.id,
      nama: f.nama, nama_en: f.nama_en,
      kategori: f.kategori, wilayah: f.wilayah,
      deskripsi: f.deskripsi, deskripsi_en: f.deskripsi_en,
      deskripsi_singkat: f.deskripsi_singkat,
      foto_cover: f.foto_cover,
      galeri: textToArr(f.galeri),
      fasilitas: textToArr(f.fasilitas),
      tips: textToArr(f.tips), tips_en: textToArr(f.tips_en), tags: textToArr(f.tags),
      lokasi: { alamat: f.lokasi_alamat, koordinat: { lat: Number(f.lokasi_lat), lng: Number(f.lokasi_lng) } },
      tiket: { harga_dewasa: Number(f.tiket_dewasa), harga_anak: Number(f.tiket_anak), parkir_motor: Number(f.tiket_parkir_motor), parkir_mobil: Number(f.tiket_parkir_mobil), catatan: f.tiket_catatan },
      jam_operasional: Object.fromEntries(HARI.map(h => [h, f.jam[h] ?? ''])),
      rating: Number(f.rating), reviews_count: Number(f.reviews_count),
      ramah_muslim: f.ramah_muslim, ramah_anak: f.ramah_anak, ramah_difabel: f.ramah_difabel,
    }

    const { error: err } = isEdit
      ? await supabase.from('destinasi').update(payload).eq('id', id!)
      : await supabase.from('destinasi').insert(payload)

    setSaving(false)
    if (err) { setError(err.message); return }
    navigate('/admin/destinasi')
  }

  const sectionClass = "rounded-xl p-6 flex flex-col gap-4 mb-4"
  const sectionStyle = { background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/admin/destinasi')} className="text-white/50 hover:text-white text-sm">← Kembali</button>
        <h1 className="serif text-white text-xl font-semibold">{isEdit ? 'Edit Destinasi' : 'Destinasi Baru'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-0">
        {/* Identitas */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Identitas</h2>
          <FormField label="ID (slug)" required value={f.id} onChange={set('id')} disabled={isEdit} placeholder="pantai-pasir-kencana" hint={isEdit ? 'ID tidak bisa diubah' : 'Gunakan huruf kecil dan tanda -'} />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nama (ID)" required value={f.nama} onChange={set('nama')} />
            <FormField label="Nama (EN)" required value={f.nama_en} onChange={set('nama_en')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1.5">Kategori <span className="text-red-400">*</span></label>
              <select value={f.kategori} onChange={set('kategori')} className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none capitalize" style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.15)' }}>
                {KATEGORI.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1.5">Wilayah <span className="text-red-400">*</span></label>
              <select value={f.wilayah} onChange={set('wilayah')} className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none capitalize" style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.15)' }}>
                {WILAYAH.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Deskripsi</h2>
          <FormField label="Ringkasan singkat" required as="textarea" rows={2} value={f.deskripsi_singkat} onChange={set('deskripsi_singkat')} />
          <FormField label="Deskripsi (ID)" required as="textarea" rows={4} value={f.deskripsi} onChange={set('deskripsi')} />
          <FormField label="Deskripsi (EN)" required as="textarea" rows={4} value={f.deskripsi_en} onChange={set('deskripsi_en')} />
        </div>

        {/* Foto */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Foto</h2>
          <FormField label="URL Foto Cover" required value={f.foto_cover} onChange={set('foto_cover')} placeholder="https://..." />
          <FormField as="textarea" label="URL Galeri" rows={3} value={f.galeri} onChange={set('galeri')} hint="Satu URL per baris" />
        </div>

        {/* Lokasi */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Lokasi</h2>
          <FormField label="Alamat" required value={f.lokasi_alamat} onChange={set('lokasi_alamat')} />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Latitude" required type="number" step="any" value={f.lokasi_lat} onChange={set('lokasi_lat')} placeholder="-6.89" />
            <FormField label="Longitude" required type="number" step="any" value={f.lokasi_lng} onChange={set('lokasi_lng')} placeholder="109.67" />
          </div>
        </div>

        {/* Tiket */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Tiket (Rp)</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Harga Dewasa" type="number" value={f.tiket_dewasa} onChange={set('tiket_dewasa')} placeholder="0 = Gratis" />
            <FormField label="Harga Anak" type="number" value={f.tiket_anak} onChange={set('tiket_anak')} />
            <FormField label="Parkir Motor" type="number" value={f.tiket_parkir_motor} onChange={set('tiket_parkir_motor')} />
            <FormField label="Parkir Mobil" type="number" value={f.tiket_parkir_mobil} onChange={set('tiket_parkir_mobil')} />
          </div>
          <FormField label="Catatan Tiket" value={f.tiket_catatan} onChange={set('tiket_catatan')} />
        </div>

        {/* Jam Operasional */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Jam Operasional</h2>
          <div className="grid grid-cols-2 gap-3">
            {HARI.map(h => (
              <div key={h}>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1 capitalize">{h}</label>
                <input
                  value={f.jam[h] ?? ''}
                  onChange={e => setF(prev => ({ ...prev, jam: { ...prev.jam, [h]: e.target.value } }))}
                  className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none"
                  style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.15)' }}
                  placeholder="08.00–17.00"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info tambahan */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Info Tambahan</h2>
          <FormField as="textarea" label="Fasilitas" rows={3} value={f.fasilitas} onChange={set('fasilitas')} hint="Satu item per baris" />
          <div className="grid grid-cols-2 gap-4">
            <FormField as="textarea" label="Tips (ID)" rows={3} value={f.tips} onChange={set('tips')} hint="Satu tip per baris" />
            <FormField as="textarea" label="Tips (EN)" rows={3} value={f.tips_en} onChange={set('tips_en')} hint="Satu tip per baris" />
          </div>
          <FormField label="Tags" value={f.tags} onChange={set('tags')} hint="Satu tag per baris" />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Rating" type="number" step="0.1" min="0" max="5" value={f.rating} onChange={set('rating')} />
            <FormField label="Jumlah Review" type="number" value={f.reviews_count} onChange={set('reviews_count')} />
          </div>
          <div className="flex gap-6">
            {(['ramah_muslim', 'ramah_anak', 'ramah_difabel'] as const).map(key => (
              <label key={key} className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
                <input type="checkbox" checked={f[key] as boolean} onChange={set(key)} className="accent-[#088395] w-4 h-4" />
                <span className="capitalize">{key.replace('ramah_', 'Ramah ')}</span>
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-full font-semibold text-sm text-dark disabled:opacity-50" style={{ background: 'var(--sun)' }}>
            {saving ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Buat Destinasi'}
          </button>
          <button type="button" onClick={() => navigate('/admin/destinasi')} className="px-6 py-2.5 rounded-full text-sm text-white/60 hover:text-white" style={{ border: '1px solid rgba(255,255,255,.2)' }}>
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
