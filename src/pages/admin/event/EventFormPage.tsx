import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import FormField from '../components/FormField'

const KATEGORI = ['budaya', 'kuliner', 'olahraga', 'seni', 'keagamaan', 'festival'] as const
const STATUS   = ['upcoming', 'ongoing', 'past'] as const

function blank() {
  return {
    id: '', slug: '', judul: '', judul_en: '',
    kategori: 'budaya', status: 'upcoming',
    tanggal_mulai: '', tanggal_selesai: '', waktu_mulai: '',
    poster: '', galeri: '',
    deskripsi_singkat: '', deskripsi_singkat_en: '',
    deskripsi_lengkap: '', deskripsi_lengkap_en: '',
    sejarah: '',
    lokasi_nama: '', lokasi_alamat: '', lokasi_lat: '', lokasi_lng: '',
    penyelenggara_nama: '', penyelenggara_logo: '', penyelenggara_telepon: '',
    penyelenggara_email: '', penyelenggara_instagram: '', penyelenggara_website: '',
    jadwal_json: '[]',
    tiket_json: '[]',
    tips: '', tips_en: '', tags: '',
    youtube_live_url: '', youtube_live_active: false,
  }
}

export default function EventFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [f, setF] = useState(blank())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    supabase.from('event').select('*').eq('id', id).single().then(({ data }) => {
      if (!data) return
      const d = data as Record<string, unknown>
      const lok = (d.lokasi as Record<string, unknown>) ?? {}
      const kor = (lok.koordinat as { lat?: unknown; lng?: unknown }) ?? {}
      const peny = (d.penyelenggara as Record<string, string>) ?? {}
      setF({
        id: String(d.id ?? ''), slug: String(d.slug ?? ''),
        judul: String(d.judul ?? ''), judul_en: String(d.judul_en ?? ''),
        kategori: String(d.kategori ?? 'budaya'), status: String(d.status ?? 'upcoming'),
        tanggal_mulai: String(d.tanggal_mulai ?? ''), tanggal_selesai: String(d.tanggal_selesai ?? ''),
        waktu_mulai: String(d.waktu_mulai ?? ''),
        poster: String(d.poster ?? ''),
        galeri: Array.isArray(d.galeri) ? (d.galeri as string[]).join('\n') : '',
        deskripsi_singkat: String(d.deskripsi_singkat ?? ''), deskripsi_singkat_en: String(d.deskripsi_singkat_en ?? ''),
        deskripsi_lengkap: String(d.deskripsi_lengkap ?? ''), deskripsi_lengkap_en: String(d.deskripsi_lengkap_en ?? ''),
        sejarah: String(d.sejarah ?? ''),
        lokasi_nama: String(lok.nama ?? ''), lokasi_alamat: String(lok.alamat ?? ''),
        lokasi_lat: String(kor.lat ?? ''), lokasi_lng: String(kor.lng ?? ''),
        penyelenggara_nama: peny.nama ?? '', penyelenggara_logo: peny.logo ?? '',
        penyelenggara_telepon: peny.telepon ?? '', penyelenggara_email: peny.email ?? '',
        penyelenggara_instagram: peny.instagram ?? '', penyelenggara_website: peny.website ?? '',
        jadwal_json: JSON.stringify(d.jadwal ?? [], null, 2),
        tiket_json: JSON.stringify(d.tiket ?? [], null, 2),
        tips: Array.isArray(d.tips) ? (d.tips as string[]).join('\n') : '',
        tips_en: Array.isArray(d.tips_en) ? (d.tips_en as string[]).join('\n') : '',
        tags: Array.isArray(d.tags) ? (d.tags as string[]).join('\n') : '',
        youtube_live_url: String(d.youtube_live_url ?? ''),
        youtube_live_active: Boolean(d.youtube_live_active),
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

    let jadwal: unknown[], tiket: unknown[]
    try { jadwal = JSON.parse(f.jadwal_json) } catch { setError('Format JSON Jadwal tidak valid'); setSaving(false); return }
    try { tiket = JSON.parse(f.tiket_json) } catch { setError('Format JSON Tiket tidak valid'); setSaving(false); return }

    const payload = {
      id: f.id, slug: f.slug,
      judul: f.judul, judul_en: f.judul_en,
      kategori: f.kategori, status: f.status,
      tanggal_mulai: f.tanggal_mulai, tanggal_selesai: f.tanggal_selesai,
      waktu_mulai: f.waktu_mulai || null,
      poster: f.poster,
      galeri: f.galeri.split('\n').map(s => s.trim()).filter(Boolean),
      deskripsi_singkat: f.deskripsi_singkat, deskripsi_singkat_en: f.deskripsi_singkat_en,
      deskripsi_lengkap: f.deskripsi_lengkap, deskripsi_lengkap_en: f.deskripsi_lengkap_en,
      sejarah: f.sejarah || null,
      lokasi: { nama: f.lokasi_nama, alamat: f.lokasi_alamat, koordinat: { lat: Number(f.lokasi_lat), lng: Number(f.lokasi_lng) } },
      penyelenggara: { nama: f.penyelenggara_nama, logo: f.penyelenggara_logo || undefined, telepon: f.penyelenggara_telepon || undefined, email: f.penyelenggara_email || undefined, instagram: f.penyelenggara_instagram || undefined, website: f.penyelenggara_website || undefined },
      jadwal,
      tiket,
      tips: f.tips.split('\n').map(s => s.trim()).filter(Boolean),
      tips_en: f.tips_en.split('\n').map(s => s.trim()).filter(Boolean),
      tags: f.tags.split('\n').map(s => s.trim()).filter(Boolean),
      youtube_live_url: f.youtube_live_url || null,
      youtube_live_active: f.youtube_live_active,
    }

    const { error: err } = isEdit
      ? await supabase.from('event').update(payload).eq('id', id!)
      : await supabase.from('event').insert(payload)

    setSaving(false)
    if (err) { setError(err.message); return }
    navigate('/admin/event')
  }

  const sectionClass = "rounded-xl p-6 flex flex-col gap-4 mb-4"
  const sectionStyle = { background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }

  const SelectField = ({ field, label, options }: { field: keyof typeof f; label: string; options: readonly string[] }) => (
    <div>
      <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1.5">{label}</label>
      <select value={f[field] as string} onChange={set(field)} className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none capitalize" style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.15)' }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/admin/event')} className="text-white/50 hover:text-white text-sm">← Kembali</button>
        <h1 className="serif text-white text-xl font-semibold">{isEdit ? 'Edit Event' : 'Event Baru'}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Identitas */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Identitas</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="ID" required value={f.id} onChange={set('id')} disabled={isEdit} hint={isEdit ? 'Tidak bisa diubah' : ''} />
            <FormField label="Slug" required value={f.slug} onChange={set('slug')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Judul (ID)" required value={f.judul} onChange={set('judul')} />
            <FormField label="Judul (EN)" required value={f.judul_en} onChange={set('judul_en')} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <SelectField field="kategori" label="Kategori" options={KATEGORI} />
            <SelectField field="status" label="Status" options={STATUS} />
            <FormField label="Waktu Mulai" value={f.waktu_mulai} onChange={set('waktu_mulai')} placeholder="08.00 WIB" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tanggal Mulai" required type="date" value={f.tanggal_mulai} onChange={set('tanggal_mulai')} />
            <FormField label="Tanggal Selesai" required type="date" value={f.tanggal_selesai} onChange={set('tanggal_selesai')} />
          </div>
        </div>

        {/* Deskripsi */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Deskripsi</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField as="textarea" label="Singkat (ID)" required rows={2} value={f.deskripsi_singkat} onChange={set('deskripsi_singkat')} />
            <FormField as="textarea" label="Singkat (EN)" required rows={2} value={f.deskripsi_singkat_en} onChange={set('deskripsi_singkat_en')} />
          </div>
          <FormField as="textarea" label="Lengkap (ID)" required rows={6} value={f.deskripsi_lengkap} onChange={set('deskripsi_lengkap')} />
          <FormField as="textarea" label="Lengkap (EN)" required rows={6} value={f.deskripsi_lengkap_en} onChange={set('deskripsi_lengkap_en')} />
          <FormField as="textarea" label="Sejarah (opsional)" rows={3} value={f.sejarah} onChange={set('sejarah')} />
        </div>

        {/* Foto */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Foto</h2>
          <FormField label="URL Poster" required value={f.poster} onChange={set('poster')} placeholder="https://..." />
          <FormField as="textarea" label="URL Galeri" rows={3} value={f.galeri} onChange={set('galeri')} hint="Satu URL per baris" />
        </div>

        {/* Lokasi */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Lokasi</h2>
          <FormField label="Nama Tempat" required value={f.lokasi_nama} onChange={set('lokasi_nama')} />
          <FormField label="Alamat" required value={f.lokasi_alamat} onChange={set('lokasi_alamat')} />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Latitude" type="number" step="any" value={f.lokasi_lat} onChange={set('lokasi_lat')} />
            <FormField label="Longitude" type="number" step="any" value={f.lokasi_lng} onChange={set('lokasi_lng')} />
          </div>
        </div>

        {/* Penyelenggara */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Penyelenggara</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nama" required value={f.penyelenggara_nama} onChange={set('penyelenggara_nama')} />
            <FormField label="URL Logo" value={f.penyelenggara_logo} onChange={set('penyelenggara_logo')} />
            <FormField label="Telepon" value={f.penyelenggara_telepon} onChange={set('penyelenggara_telepon')} />
            <FormField label="Email" value={f.penyelenggara_email} onChange={set('penyelenggara_email')} />
            <FormField label="Instagram" value={f.penyelenggara_instagram} onChange={set('penyelenggara_instagram')} placeholder="@username" />
            <FormField label="Website" value={f.penyelenggara_website} onChange={set('penyelenggara_website')} />
          </div>
        </div>

        {/* Jadwal & Tiket */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Jadwal & Tiket (JSON)</h2>
          <FormField
            as="textarea" label="Jadwal (JSON array)" rows={6} value={f.jadwal_json} onChange={set('jadwal_json')}
            hint='Contoh: [{"hari": "Hari 1", "tanggal": "2025-07-01", "kegiatan": [{"waktu": "08.00", "deskripsi": "Pembukaan"}]}]'
          />
          <FormField
            as="textarea" label="Tiket (JSON array)" rows={5} value={f.tiket_json} onChange={set('tiket_json')}
            hint='Contoh: [{"nama": "Reguler", "harga": 50000, "tersedia": true}]'
          />
        </div>

        {/* Info tambahan */}
        <div className={sectionClass} style={sectionStyle}>
          <h2 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Info Tambahan</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField as="textarea" label="Tips (ID)" rows={3} value={f.tips} onChange={set('tips')} hint="Satu tip per baris" />
            <FormField as="textarea" label="Tips (EN)" rows={3} value={f.tips_en} onChange={set('tips_en')} hint="Satu tip per baris" />
          </div>
          <FormField label="Tags" value={f.tags} onChange={set('tags')} hint="Satu tag per baris" />
          <FormField label="URL YouTube Live" value={f.youtube_live_url} onChange={set('youtube_live_url')} />
          <label className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
            <input type="checkbox" checked={f.youtube_live_active} onChange={set('youtube_live_active')} className="accent-[#088395] w-4 h-4" />
            YouTube Live Aktif
          </label>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-full font-semibold text-sm text-dark disabled:opacity-50" style={{ background: 'var(--sun)' }}>
            {saving ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Buat Event'}
          </button>
          <button type="button" onClick={() => navigate('/admin/event')} className="px-6 py-2.5 rounded-full text-sm text-white/60 hover:text-white" style={{ border: '1px solid rgba(255,255,255,.2)' }}>
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
