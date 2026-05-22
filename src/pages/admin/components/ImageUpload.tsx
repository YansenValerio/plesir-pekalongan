import { useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

const MAX_BYTES = 5 * 1024 * 1024 // 5MB

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
  value: string
  onChange: (url: string) => void
  folder: string
  required?: boolean
  hint?: string
}

export default function ImageUpload({ label, value, onChange, folder, required, hint }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_BYTES) { setError('Ukuran file maks 5MB'); return }
    setError(null)
    setUploading(true)
    try {
      const url = await uploadToStorage(file, folder)
      onChange(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload gagal')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const fieldStyle = { background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.15)' }

  return (
    <div>
      <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>

      {/* Preview */}
      <div
        className="w-full h-40 rounded-lg mb-2 overflow-hidden flex items-center justify-center relative"
        style={fieldStyle}
      >
        {value ? (
          <img src={value} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-white/30 text-sm flex flex-col items-center gap-1">
            <span className="text-3xl">🖼</span>
            <span>Belum ada gambar</span>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,.6)' }}>
            <div className="w-6 h-6 rounded-full border-2 border-white border-t-transparent animate-spin" />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2 items-center mb-2">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-dark disabled:opacity-50 transition-opacity hover:opacity-90 flex-shrink-0"
          style={{ background: 'var(--sun)' }}
        >
          {uploading ? '⏳ Mengupload...' : '📁 Pilih Gambar'}
        </button>
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="atau paste URL langsung..."
          className="flex-1 px-3 py-1.5 rounded-lg text-xs text-white outline-none"
          style={fieldStyle}
        />
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      {hint && <p className="text-white/40 text-xs">{hint}</p>}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      <p className="text-white/30 text-xs mt-1">Format: JPG, PNG, WebP · Maks 5MB</p>
    </div>
  )
}
