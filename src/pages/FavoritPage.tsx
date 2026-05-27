import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useDestinasiByIds, useEventByIds } from '@/hooks/useSupabaseData'
import { imgUrl } from '@/utils/image'
import { formatRupiah } from '@/utils/currency'
import { WILAYAH_LABELS } from '@/constants'
import Icon from '@/components/common/Icon'
import PageMeta from '@/components/common/PageMeta'
import type { Destinasi, Event } from '@/types'

function EmptyState({ label, onBrowse }: { label: string; onBrowse: () => void }) {
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-20 h-20 rounded-full grid place-items-center mb-6"
        style={{ background: 'var(--accent)' }}
      >
        <Icon name="heart" size={36} />
      </div>
      <h3 className="serif text-[22px] text-primary mb-3">
        {isEn ? `No saved ${label} yet` : `Belum ada ${label} tersimpan`}
      </h3>
      <p className="text-[14px] text-[var(--text-muted)] max-w-[360px] mb-6 leading-relaxed">
        {isEn
          ? 'Browse and tap the bookmark icon to save your favorites here.'
          : 'Jelajahi dan klik ikon bookmark untuk menyimpan favoritmu di sini.'}
      </p>
      <button className="btn btn-primary" onClick={onBrowse}>
        {isEn ? 'Browse Now' : 'Jelajahi Sekarang'} <Icon name="arrowR" size={16} />
      </button>
    </div>
  )
}

function DestinasiCard({ d, onRemove }: { d: Destinasi; onRemove: (id: string) => void }) {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const area = WILAYAH_LABELS[d.wilayah] ?? d.wilayah

  return (
    <div
      className="bg-white rounded-[16px] overflow-hidden border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
      style={{ borderColor: 'var(--line)' }}
      onClick={() => navigate(`/destinasi/${d.kategori}/${d.id}`)}
    >
      <div className="relative" style={{ aspectRatio: '4/3' }}>
        <img
          src={imgUrl(d.foto_cover, 480)}
          alt={d.nama}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,.55))' }} />
        <div className="absolute bottom-3 left-3 text-white text-[12px] font-semibold flex items-center gap-1">
          <Icon name="pin" size={12} /> {area}
        </div>
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full grid place-items-center bg-white/90 text-primary transition-colors hover:bg-red-50 hover:text-red-500"
          onClick={e => { e.stopPropagation(); onRemove(d.id) }}
          title="Hapus dari favorit"
        >
          <Icon name="heart" size={14} />
        </button>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-[17px] text-primary mb-1 leading-snug">
          {isEn ? (d.nama_en || d.nama) : d.nama}
        </h3>
        <p className="text-[13px] leading-[1.55] mb-3" style={{ color: 'var(--text-muted)' }}>
          {isEn ? (d.deskripsi_en || d.deskripsi_singkat) : d.deskripsi_singkat}
        </p>
        <div className="flex gap-3 text-[12px]" style={{ color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-1">
            <Icon name="star" size={12} />
            <b style={{ color: 'var(--primary)' }}>{d.rating?.toFixed(1)}</b>
          </span>
          <span className="flex items-center gap-1">
            <Icon name="ticket" size={12} />
            {d.tiket.dewasa === 0 ? 'Gratis' : formatRupiah(d.tiket.dewasa)}
          </span>
        </div>
      </div>
    </div>
  )
}

function EventCard({ ev, onRemove }: { ev: Event; onRemove: (id: string) => void }) {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const statusLabel: Record<Event['status'], string> = {
    upcoming: isEn ? 'Upcoming' : 'Akan Datang',
    ongoing: isEn ? 'Ongoing' : 'Sedang Berlangsung',
    past: isEn ? 'Past' : 'Selesai',
  }
  const statusStyle: Record<Event['status'], string> = {
    upcoming: 'background:rgba(8,131,149,.9);color:#fff',
    ongoing: 'background:rgba(242,169,59,.95);color:#1A1A1A',
    past: 'background:rgba(0,0,0,.55);color:#fff',
  }

  return (
    <div
      className="bg-white rounded-[16px] overflow-hidden border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col"
      style={{ borderColor: 'var(--line)' }}
      onClick={() => navigate(`/event/${ev.slug}`)}
    >
      <div className="relative" style={{ aspectRatio: '4/5' }}>
        <img
          src={imgUrl(ev.poster, 480)}
          alt={ev.judul}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,.8))' }} />
        <span
          className="absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-md"
          style={statusStyle[ev.status].split(';').reduce((acc, s) => {
            const [k, v] = s.split(':')
            return { ...acc, [k]: v }
          }, {} as React.CSSProperties)}
        >
          {statusLabel[ev.status]}
        </span>
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full grid place-items-center bg-white/90 text-primary transition-colors hover:bg-red-50 hover:text-red-500"
          onClick={e => { e.stopPropagation(); onRemove(ev.id) }}
          title="Hapus dari favorit"
        >
          <Icon name="heart" size={14} />
        </button>
        <div className="absolute left-4 right-4 bottom-4">
          <h3 className="font-bold text-[18px] text-white leading-snug mb-1">
            {isEn ? (ev.judul_en || ev.judul) : ev.judul}
          </h3>
        </div>
      </div>
      <div className="p-4 text-[12px] flex flex-col gap-1" style={{ color: 'var(--text-muted)' }}>
        <span className="flex items-center gap-1">
          <Icon name="calendar" size={12} /> {ev.tanggal_mulai}
        </span>
        <span className="flex items-center gap-1">
          <Icon name="pin" size={12} /> {ev.lokasi.nama}
        </span>
      </div>
    </div>
  )
}

export default function FavoritPage() {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const [tab, setTab] = useState<'destinasi' | 'event'>('destinasi')

  const { destinasiIds, eventIds, toggleDestinasi, toggleEvent } = useFavoriteStore()
  const { data: destinasi, loading: loadingD } = useDestinasiByIds(destinasiIds)
  const { data: events, loading: loadingE } = useEventByIds(eventIds)

  const loading = tab === 'destinasi' ? loadingD : loadingE

  return (
    <>
      <PageMeta
        title={isEn ? 'My Favorites' : 'Favorit Saya'}
        description={isEn ? 'Your saved destinations and events in Pekalongan.' : 'Destinasi dan event Pekalongan yang kamu simpan.'}
        path="/favorit"
      />

      {/* Page Hero */}
      <div
        className="relative pt-[140px] pb-[50px] text-white overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
      >
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 30%, #fff 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="shell relative">
          <button
            className="flex items-center gap-2 text-white/70 hover:text-white text-[14px] mb-5 transition-colors"
            onClick={() => navigate(-1)}
          >
            <Icon name="arrowL" size={16} /> {isEn ? 'Back' : 'Kembali'}
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Icon name="heart" size={28} />
            <h1 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
              {isEn ? 'My Favorites' : 'Favorit Saya'}
            </h1>
          </div>
          <p className="text-[16px] opacity-90 max-w-[500px]">
            {isEn
              ? `${destinasiIds.length} destination${destinasiIds.length !== 1 ? 's' : ''} · ${eventIds.length} event${eventIds.length !== 1 ? 's' : ''} saved`
              : `${destinasiIds.length} destinasi · ${eventIds.length} event tersimpan`}
          </p>
        </div>
      </div>

      <div className="shell py-10">
        {/* Tab switcher */}
        <div className="flex gap-0 mb-8 bg-white rounded-full p-1 w-fit border" style={{ borderColor: 'var(--line)' }}>
          {(['destinasi', 'event'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all"
              style={tab === t
                ? { background: 'var(--primary)', color: '#fff' }
                : { color: 'var(--text-muted)' }
              }
            >
              {t === 'destinasi'
                ? (isEn ? `Destinations (${destinasiIds.length})` : `Destinasi (${destinasiIds.length})`)
                : (isEn ? `Events (${eventIds.length})` : `Event (${eventIds.length})`)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-[16px] bg-gray-100 animate-pulse" style={{ aspectRatio: '4/3' }} />
            ))}
          </div>
        ) : tab === 'destinasi' ? (
          destinasi.length === 0
            ? <EmptyState label={isEn ? 'destinations' : 'destinasi'} onBrowse={() => navigate('/destinasi')} />
            : (
              <div className="grid grid-cols-3 gap-6">
                {destinasi.map(d => (
                  <DestinasiCard key={d.id} d={d} onRemove={toggleDestinasi} />
                ))}
              </div>
            )
        ) : (
          events.length === 0
            ? <EmptyState label={isEn ? 'events' : 'event'} onBrowse={() => navigate('/event')} />
            : (
              <div className="grid grid-cols-3 gap-6">
                {events.map(ev => (
                  <EventCard key={ev.id} ev={ev} onRemove={toggleEvent} />
                ))}
              </div>
            )
        )}
      </div>
    </>
  )
}
