import { useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

const MAX_BYTES = 5 * 1024 * 1024

async function uploadToStorage(file: File, folder: string): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from('media').upload(path, file, { upsert: false })
  if (error) throw new Error(error.message)
  const { data } = supabase.storage.from('media').getPublicUrl(path)
  return data.publicUrl
}

interface Props {
  label: string
  value: string[]
  onChange: (urls: string[]) => void
  folder: string
  hint?: string
}

export default function GalleryUpload({ label, value, onChange, folder, hint }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    const oversized = files.find(f => f.size > MAX_BYTES)
    if (oversized) { setError(`File "${oversized.name}" melebihi 5MB`); return }
    setError(null)
    setUploading(true)
    try {
      const urls = await Promise.all(files.map(f => uploadToStorage(f, folder)))
      onChange([...value, ...urls])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload gagal')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx))
  }

  const fieldStyle = { background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.15)' }

  return (
    <div>
      <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1.5">{label}</label>

      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((url, i) => (
          <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0" style={fieldStyle}>
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'rgba(0,0,0,.7)' }}
            >
              ✕
            </button>
          </div>
        ))}

        {/* Add button */}
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="w-24 h-24 rounded-lg flex flex-col items-center justify-center gap-1 text-white/50 hover:text-white/80 transition-colors disabled:opacity-50 flex-shrink-0"
          style={fieldStyle}
        >
          {uploading ? (
            <div className="w-5 h-5 rounded-full border-2 border-white/50 border-t-transparent animate-spin" />
          ) : (
            <>
              <span className="text-2xl">+</span>
              <span className="text-xs">Tambah</span>
            </>
          )}
        </button>
      </div>

      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
      {hint && <p className="text-white/40 text-xs">{hint}</p>}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      <p className="text-white/30 text-xs mt-1">Format: JPG, PNG, WebP · Maks 5MB per file · Bisa pilih banyak sekaligus</p>
    </div>
  )
}
