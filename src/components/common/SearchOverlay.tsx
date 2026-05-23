import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '@/lib/supabase'
import Icon from '@/components/common/Icon'

interface DestinasiResult { id: string; nama: string; nama_en: string; kategori: string }
interface BeritaResult    { slug: string; judul: string; judul_en: string; kategori: string }
interface EventResult     { slug: string; judul: string; judul_en: string; kategori: string }

interface Results {
  destinasi: DestinasiResult[]
  berita: BeritaResult[]
  event: EventResult[]
}

const EMPTY: Results = { destinasi: [], berita: [], event: [] }

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('')
  const [results, setResults] = useState<Results>(EMPTY)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    const trimmed = q.trim()
    if (trimmed.length < 2) { setResults(EMPTY); return }

    const timer = setTimeout(async () => {
      setLoading(true)
      const [d, b, e] = await Promise.all([
        supabase.from('destinasi').select('id, nama, nama_en, kategori')
          .or(`nama.ilike.%${trimmed}%,nama_en.ilike.%${trimmed}%`).limit(5),
        supabase.from('berita').select('slug, judul, judul_en, kategori')
          .or(`judul.ilike.%${trimmed}%,judul_en.ilike.%${trimmed}%`).limit(5),
        supabase.from('event').select('slug, judul, judul_en, kategori')
          .or(`judul.ilike.%${trimmed}%,judul_en.ilike.%${trimmed}%`).limit(5),
      ])
      setResults({
        destinasi: (d.data as DestinasiResult[]) ?? [],
        berita:    (b.data as BeritaResult[])    ?? [],
        event:     (e.data as EventResult[])     ?? [],
      })
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [q])

  function go(path: string) {
    navigate(path)
    onClose()
  }

  const total = results.destinasi.length + results.berita.length + results.event.length
  const hasQuery = q.trim().length >= 2

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center pt-[100px] px-4"
      style={{ background: 'rgba(4,28,38,.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[640px] rounded-[20px] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,.4)]"
        style={{ background: '#fff' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--line)]">
          <Icon name="search" size={18} className="text-text-muted flex-shrink-0" />
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={isEn ? 'Search destinations, news, or events...' : 'Cari destinasi, berita, atau event...'}
            className="flex-1 text-[16px] text-primary outline-none bg-transparent placeholder:text-text-muted"
          />
          {loading && (
            <div className="w-4 h-4 rounded-full border-2 border-secondary border-t-transparent animate-spin flex-shrink-0" />
          )}
          <button onClick={onClose} className="text-text-muted hover:text-primary transition-colors flex-shrink-0">
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {!hasQuery ? (
            <div className="px-5 py-8 text-center text-text-muted text-[14px]">
              {isEn ? 'Type at least 2 characters to search' : 'Ketik minimal 2 karakter untuk mencari'}
            </div>
          ) : total === 0 && !loading ? (
            <div className="px-5 py-8 text-center text-text-muted text-[14px]">
              {isEn ? `No results for "${q.trim()}"` : `Tidak ada hasil untuk "${q.trim()}"`}
            </div>
          ) : (
            <div className="py-2">
              <ResultGroup
                title={isEn ? 'Destinations' : 'Destinasi'}
                icon="🏖"
                items={results.destinasi.map(d => ({
                  label: isEn ? d.nama_en : d.nama,
                  sub: d.kategori,
                  path: `/destinasi/${d.kategori}/${d.id}`,
                }))}
                onGo={go}
              />
              <ResultGroup
                title={isEn ? 'News' : 'Berita'}
                icon="📰"
                items={results.berita.map(b => ({
                  label: isEn ? b.judul_en : b.judul,
                  sub: b.kategori.replace('-', ' '),
                  path: `/berita/${b.slug}`,
                }))}
                onGo={go}
              />
              <ResultGroup
                title="Event"
                icon="🎉"
                items={results.event.map(e => ({
                  label: isEn ? e.judul_en : e.judul,
                  sub: e.kategori,
                  path: `/event/${e.slug}`,
                }))}
                onGo={go}
              />
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 border-t border-[var(--line)] flex items-center gap-4 text-[11px] text-text-muted">
          <span><kbd className="px-1.5 py-0.5 rounded bg-[var(--line)] font-mono">Esc</kbd> {isEn ? 'to close' : 'tutup'}</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-[var(--line)] font-mono">↵</kbd> {isEn ? 'to open' : 'buka'}</span>
        </div>
      </div>
    </div>
  )
}

function ResultGroup({
  title, icon, items, onGo,
}: {
  title: string
  icon: string
  items: { label: string; sub: string; path: string }[]
  onGo: (path: string) => void
}) {
  if (items.length === 0) return null
  return (
    <div className="mb-1">
      <div className="px-5 py-2 text-[11px] font-bold uppercase tracking-[.12em] text-text-muted flex items-center gap-2">
        <span>{icon}</span> {title} <span className="text-[var(--line)]">({items.length})</span>
      </div>
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => onGo(item.path)}
          className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-accent transition-colors"
        >
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-medium text-primary truncate">{item.label}</div>
            <div className="text-[11px] text-text-muted capitalize">{item.sub}</div>
          </div>
          <Icon name="arrowR" size={14} className="text-text-muted flex-shrink-0" />
        </button>
      ))}
    </div>
  )
}
