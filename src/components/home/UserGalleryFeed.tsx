import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { userGalleryData } from '@/data'
import Icon from '@/components/common/Icon'

// Unique hashtags for filter chips
const ALL_TAGS = Array.from(
  new Set(userGalleryData.flatMap(item => item.hashtags))
).slice(0, 6)

export default function UserGalleryFeed() {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<typeof userGalleryData[0] | null>(null)
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const filtered = activeTag
    ? userGalleryData.filter(item => item.hashtags.includes(activeTag))
    : userGalleryData

  return (
    <section className="py-[100px] bg-[var(--light)]">
      <div className="shell">
        {/* Header */}
        <div className="flex justify-between items-end mb-10 gap-4 flex-wrap">
          <div>
            <div className="sec-eyebrow">
              {isEn ? 'User Gallery' : 'Galeri Wisatawan'}
            </div>
            <h2
              className="serif text-primary"
              style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', lineHeight: '1.05' }}
            >
              {isEn ? '#PlesirPekalongan' : '#PlesirPekalongan'}
            </h2>
            <p className="text-[16px] text-text-muted leading-[1.6] mt-2 max-w-[500px]">
              {isEn
                ? 'Photos from travelers who have explored the beauty of Pekalongan.'
                : 'Foto dari para wisatawan yang telah menjelajahi keindahan Pekalongan.'}
            </p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 flex-wrap mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-4 py-2 rounded-full text-[13px] font-semibold border transition-all duration-150 ${
              activeTag === null
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-text-muted border-[var(--line)] hover:border-secondary hover:text-secondary'
            }`}
          >
            {isEn ? 'All' : 'Semua'}
          </button>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold border transition-all duration-150 ${
                activeTag === tag
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-text-muted border-[var(--line)] hover:border-secondary hover:text-secondary'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Masonry-style grid using CSS columns */}
        <div
          className="gap-4"
          style={{ columns: 'auto 280px', columnGap: '16px' }}
        >
          {filtered.map(item => (
            <div
              key={item.id}
              className="break-inside-avoid mb-4 rounded-[14px] overflow-hidden bg-white border border-[var(--line)] cursor-pointer group transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(10,77,104,.12)]"
              onClick={() => setLightbox(item)}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full block transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                {/* Like overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  {item.likes.toLocaleString()}
                </div>
              </div>

              {/* Caption */}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={item.user_avatar}
                    alt={item.username}
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                  />
                  <span className="text-[12px] font-semibold text-primary">{item.username}</span>
                </div>
                <p className="text-[12px] text-text-muted leading-[1.5] line-clamp-2 m-0">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Upload CTA */}
        <div className="mt-10 text-center">
          <p className="text-[14px] text-text-muted mb-4">
            {isEn
              ? 'Share your Pekalongan experience with #PlesirPekalongan'
              : 'Bagikan pengalamanmu di Pekalongan dengan tagar #PlesirPekalongan'}
          </p>
          <a
            href="https://www.instagram.com/explore/tags/plesirpekalongan/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost inline-flex"
          >
            <Icon name="instagram" size={16} />
            {isEn ? 'Share on Instagram' : 'Bagikan di Instagram'}
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="bg-white rounded-[20px] overflow-hidden max-w-lg w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightbox.image}
              alt={lightbox.caption}
              className="w-full block max-h-[60vh] object-cover"
            />
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <img src={lightbox.user_avatar} alt={lightbox.username} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-[14px] text-primary">{lightbox.username}</div>
                  <div className="text-[11px] text-text-muted">{new Date(lightbox.posted_at).toLocaleDateString(isEn ? 'en-US' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>
                <div className="ml-auto flex items-center gap-1 text-[13px] font-semibold text-batik-red">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  {lightbox.likes.toLocaleString()}
                </div>
              </div>
              <p className="text-[14px] text-text leading-[1.6] m-0">{lightbox.caption}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {lightbox.hashtags.map(tag => (
                  <span key={tag} className="text-[11px] font-semibold text-secondary">#{tag}</span>
                ))}
              </div>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white grid place-items-center hover:bg-black/70 transition-colors"
            >
              <Icon name="x" size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
