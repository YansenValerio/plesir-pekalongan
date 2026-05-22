import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEventList } from '@/hooks/useSupabaseData'
import { formatDateRange } from '@/utils/date'
import Icon from '@/components/common/Icon'
import { imgUrl } from '@/utils/image'

// Badge colors matching design-reference/styles.css
const BADGE_COLORS: Record<string, string> = {
  budaya: 'bg-batik-red text-white',
  kuliner: 'bg-sun text-dark',
  olahraga: 'bg-secondary text-white',
  seni: 'bg-[#6b3fa0] text-white',
  keagamaan: 'bg-[#2d8659] text-white',
}

export default function EventsSection() {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const { data: events, loading } = useEventList()

  // Prioritize upcoming/ongoing, fill with past if needed
  const active = events.filter(e => e.status === 'upcoming' || e.status === 'ongoing')
  const featured = (active.length >= 3 ? active : events).slice(0, 3)

  return (
    // Original: .events — bg:#fff
    <section className="py-[100px] bg-white">
      <div className="shell">
        {/* Original: .events-head — justify:space-between, align:flex-end, mb:48px */}
        <div className="flex justify-between items-end mb-12 gap-6 flex-wrap">
          <div>
            <div className="sec-eyebrow">
              {isEn ? 'Event Recommendations' : 'Event Recommendations'}
            </div>
            <h2
              className="serif text-primary"
              style={{ fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: '1.05' }}
            >
              {isEn ? "Events You Can't Miss" : 'Acara yang Tidak Boleh Terlewatkan'}
            </h2>
          </div>
          <button
            className="btn btn-ghost"
            onClick={() => navigate('/event')}
          >
            {isEn ? 'All Events' : 'Jelajahi Semua Event'} <Icon name="arrowR" size={14} />
          </button>
        </div>

        {/* Original: .event-grid — 3 columns, gap:24px */}
        <div className="grid grid-cols-3 gap-6">
          {loading && featured.length === 0 && [0, 1, 2].map(i => (
            <div key={i} className="rounded-[16px] overflow-hidden bg-gray-100 animate-pulse" style={{ aspectRatio: '4/5' }} />
          ))}
          {featured.map(e => (
            <div
              key={e.id}
              // Original: .event-card — rounded-[16px], overflow:hidden, shadow 0 1px 0 line, hover translateY(-4px)
              className="rounded-[16px] overflow-hidden cursor-pointer bg-white flex flex-col transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(10,77,104,.15)]"
              style={{ boxShadow: '0 1px 0 var(--line)' }}
              onClick={() => navigate(`/event/${e.slug}`)}
            >
              {/* Original: .event-cover — aspect-ratio:4/5, bg-cover, with gradient overlay */}
              <div
                className="relative bg-cover bg-center"
                style={{ aspectRatio: '4/5', backgroundImage: `url(${imgUrl(e.poster, 600)})` }}
              >
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,.8))' }}
                />

                {/* Original: .event-badge — top:14px, left:14px */}
                <span
                  className={`absolute top-[14px] left-[14px] z-[2] px-3 py-1.5 rounded-[6px] text-[11px] font-bold tracking-[.05em] ${BADGE_COLORS[e.kategori] ?? 'bg-sun text-dark'}`}
                >
                  {e.kategori.toUpperCase()}
                </span>

                {/* Original: .event-info — abs bottom-18px */}
                <div className="absolute left-[18px] right-[18px] bottom-[18px] z-[2] text-white">
                  <h4 className="font-sans text-[18px] font-bold mb-1.5 leading-[1.25]">
                    {isEn ? e.judul_en : e.judul}
                  </h4>
                  <div className="text-[12px] opacity-90 flex flex-col gap-0.5">
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="calendar" size={12} />
                      {formatDateRange(e.tanggal_mulai, e.tanggal_selesai, isEn ? 'en' : 'id')}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="location" size={12} /> {e.lokasi.nama}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
