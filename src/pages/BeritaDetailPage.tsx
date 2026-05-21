import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { beritaData, getBeritaBySlug } from '@/data'
import Icon from '@/components/common/Icon'
import { BeritaCard, formatBeritaDate } from './BeritaPage'
import type { Berita } from '@/types'

// ── Related Articles scoring — from docs/06-features-detail.md ───────────────
// Score: same category (+3), tag overlap (+2/tag), same month (+1)
function getRelatedArticles(current: Berita, all: Berita[], limit = 3): Berita[] {
  const currentMonth = new Date(current.tanggal_publish).getMonth()
  return all
    .filter(a => a.id !== current.id)
    .map(a => {
      let score = 0
      if (a.kategori === current.kategori) score += 3
      const tagOverlap = a.tags.filter(t => current.tags.includes(t))
      score += tagOverlap.length * 2
      if (new Date(a.tanggal_publish).getMonth() === currentMonth) score += 1
      return { ...a, _score: score }
    })
    .filter(a => (a as typeof a & { _score: number })._score > 0)
    .sort((a, b) => (b as typeof b & { _score: number })._score - (a as typeof a & { _score: number })._score)
    .slice(0, limit)
}

// Parse markdown-ish content into sections with h2 headings and paragraphs
function parseContent(raw: string): { type: 'h1' | 'h2' | 'h3' | 'p'; text: string }[] {
  return raw.split('\n').filter(l => l.trim()).map(line => {
    if (line.startsWith('### ')) return { type: 'h3' as const, text: line.slice(4).trim() }
    if (line.startsWith('## ')) return { type: 'h2' as const, text: line.slice(3).trim() }
    if (line.startsWith('# ')) return { type: 'h1' as const, text: line.slice(2).trim() }
    return { type: 'p' as const, text: line.trim() }
  })
}

// Extract h2 headings from content as TOC entries
function extractTOC(raw: string): string[] {
  return raw.split('\n')
    .filter(l => l.startsWith('## '))
    .map(l => l.slice(3).trim())
}

export default function BeritaDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const [liked, setLiked] = useState(false)
  const [shared, setShared] = useState(false)
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)

  const article = slug ? getBeritaBySlug(slug) : undefined

  if (!article) {
    return (
      <div className="shell py-20 text-center">
        <div className="text-5xl mb-4">📰</div>
        <h2 className="text-2xl font-bold text-primary mb-2">{isEn ? 'Article not found' : 'Artikel tidak ditemukan'}</h2>
        <Link to="/berita" className="btn btn-primary mt-4">{isEn ? 'Back to News' : 'Kembali ke Berita'}</Link>
      </div>
    )
  }

  const judul = isEn ? article.judul_en : article.judul
  const excerpt = isEn ? article.excerpt_en : article.excerpt
  const konten = isEn ? article.konten_en : article.konten
  const shareUrl = `${window.location.origin}/berita/${article.slug}`

  const contentBlocks = parseContent(konten)
  const toc = extractTOC(konten)
  const relatedArticles = getRelatedArticles(article, beritaData)
  const moreArticles = beritaData.filter(b => b.id !== article.id).slice(0, 3)

  function handleShare(platform: 'wa' | 'fb' | 'tw' | 'copy') {
    if (platform === 'wa') window.open(`https://wa.me/?text=${encodeURIComponent(judul + ' — ' + shareUrl)}`)
    if (platform === 'fb') window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)
    if (platform === 'tw') window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(judul)}&url=${encodeURIComponent(shareUrl)}`)
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      })
    }
  }

  return (
    <>
      {/* ── Hero — Original: .bd-hero ──────────────────────────────────── */}
      <div
        className="relative text-white"
        style={{
          minHeight: 560,
          paddingTop: 140,
          paddingBottom: 60,
          backgroundImage: `linear-gradient(180deg, rgba(10,77,104,.5) 0%, rgba(4,28,38,.85) 100%), url(${article.cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate('/berita')}
          className="absolute top-[100px] left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[13px] font-semibold hover:bg-white/25 transition-colors"
        >
          <Icon name="arrowL" size={14} />
          {isEn ? 'All News' : 'Semua Berita'}
        </button>

        {/* Original: .bd-hero-inner max-w-[880px] */}
        <div className="shell relative">
          <div className="max-w-[880px] flex flex-col gap-4">
            {/* Category badge — Original: .bd-cat bg batik-red */}
            <span className="self-start bg-batik-red text-white px-[14px] py-[6px] rounded-[6px] text-[11px] font-bold tracking-[.1em] uppercase">
              {article.kategori.replace('-', ' ')}
            </span>
            {/* Title */}
            <h1
              className="serif text-white"
              style={{ fontSize: 'clamp(40px, 5.5vw, 64px)', lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,.3)', maxWidth: 820 }}
            >
              {judul}
            </h1>
            {/* Excerpt — italic Playfair */}
            <p className="text-white/95 max-w-[720px]" style={{ fontSize: 19, lineHeight: 1.55, fontStyle: 'italic', fontFamily: '"Playfair Display", serif', fontWeight: 400 }}>
              {excerpt}
            </p>
            {/* Meta: author + date + reading time */}
            <div className="flex items-center gap-4 flex-wrap mt-3">
              {/* Author */}
              <div className="flex items-center gap-3">
                {article.author.foto && (
                  <img
                    src={article.author.foto}
                    alt=""
                    className="w-11 h-11 rounded-full object-cover border-2 border-sun"
                  />
                )}
                <div>
                  <div className="font-bold text-[14px]">{article.author.nama}</div>
                  {article.author.bio && (
                    <div className="text-[11px] opacity-80">{isEn ? 'Editorial Team' : 'Tim Editorial'}</div>
                  )}
                </div>
              </div>
              <span className="w-px h-6 bg-white/30" />
              <span className="flex items-center gap-1.5 text-[13px] opacity-90">
                <Icon name="calendar" size={14} />
                {formatBeritaDate(article.tanggal_publish, isEn)}
              </span>
              <span className="flex items-center gap-1.5 text-[13px] opacity-90">
                <Icon name="clock" size={14} />
                {article.reading_time} {isEn ? 'min read' : 'menit baca'}
              </span>
              <span className="flex items-center gap-1.5 text-[13px] opacity-90">
                <Icon name="users" size={14} />
                {article.views.toLocaleString('id-ID')} {isEn ? 'views' : 'pembaca'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Share bar — Original: .bd-sharebar ───────────────────────────── */}
      <div className="shell">
        <div className="flex justify-between items-center py-[18px] border-b border-[var(--line)] flex-wrap gap-3">
          {/* Tags — Original: .bd-tags */}
          <div className="flex gap-2 flex-wrap">
            {article.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-[#f0f5f7] rounded-full text-[12px] text-primary font-medium">
                #{tag}
              </span>
            ))}
          </div>
          {/* Share actions — Original: .bd-share-actions .bd-action */}
          <div className="flex gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 px-[14px] py-2 rounded-full border text-[13px] font-semibold transition-all ${liked ? 'bg-[#FFF0EE] border-batik-red text-batik-red' : 'bg-white border-[var(--line)] text-text hover:border-primary'}`}
            >
              <span className="text-[15px]">{liked ? '❤️' : '🤍'}</span>
              {(article.views / 4).toFixed(0)}
            </button>
            <button onClick={() => handleShare('wa')} className="flex items-center gap-1.5 px-[14px] py-2 rounded-full bg-white border border-[var(--line)] text-[13px] font-semibold hover:border-primary transition-all">
              💬
            </button>
            <button onClick={() => handleShare('fb')} className="flex items-center gap-1.5 px-[14px] py-2 rounded-full bg-white border border-[var(--line)] text-[13px] font-semibold hover:border-primary transition-all">
              <Icon name="facebook" size={14} />
            </button>
            <button onClick={() => handleShare('tw')} className="flex items-center gap-1.5 px-[14px] py-2 rounded-full bg-white border border-[var(--line)] text-[13px] font-semibold hover:border-primary transition-all">
              <Icon name="twitter" size={14} />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className={`flex items-center gap-1.5 px-[14px] py-2 rounded-full border text-[13px] font-semibold transition-all ${shared ? 'bg-[#FFF0EE] border-batik-red text-batik-red' : 'bg-white border-[var(--line)] text-text hover:border-primary'}`}
            >
              <Icon name={shared ? 'check' : 'share'} size={14} />
              {shared ? (isEn ? 'Copied!' : 'Tersalin!') : (isEn ? 'Copy Link' : 'Salin Link')}
            </button>
          </div>
        </div>
      </div>

      {/* ── Body — Original: .bd-body grid 1fr 320px ─────────────────────── */}
      <div className="shell py-10 pb-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">

          {/* ── Main content column ── */}
          <main>
            {/* Article content — Original: .bd-article */}
            <article id="article" className="mb-12">
              {contentBlocks.map((block, i) => {
                if (block.type === 'h1') return null // skip top-level h1
                if (block.type === 'h2') return (
                  <h2 key={i} className="serif text-primary mt-10 mb-4" style={{ fontSize: '28px' }}>
                    {block.text}
                  </h2>
                )
                if (block.type === 'h3') return (
                  <h3 key={i} className="font-sans font-bold text-primary mt-8 mb-3" style={{ fontSize: '18px' }}>
                    {block.text}
                  </h3>
                )
                // Paragraph — Original: .bd-article p, first-child has drop cap
                const isFirst = contentBlocks.findIndex(b => b.type === 'p') === i
                return (
                  <p
                    key={i}
                    className={`text-dark mb-[22px] ${isFirst ? 'first-letter-dropcap' : ''}`}
                    style={{ fontSize: 17, lineHeight: 1.8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    {block.text}
                  </p>
                )
              })}

              {/* Inline figure — insert at 1/3 of the article */}
              {/* Rendered after the article text for simplicity */}
              {article.tanggal_update && (
                <div className="text-[12px] text-text-muted mt-4 italic">
                  {isEn ? 'Last updated:' : 'Diperbarui:'} {formatBeritaDate(article.tanggal_update, isEn)}
                </div>
              )}
            </article>

            {/* Gallery */}
            {article.related_destinasi && article.related_destinasi.length > 0 && (
              <section className="mb-12">
                <h2 className="font-sans text-[22px] font-bold text-primary mb-5 relative pb-3">
                  {isEn ? 'Related Destinations' : 'Destinasi Terkait'}
                  <span className="absolute bottom-0 left-0 w-10 h-[3px] rounded-full bg-sun" />
                </h2>
                <div className="flex flex-wrap gap-2">
                  {article.related_destinasi.map(id => (
                    <Link
                      key={id}
                      to={`/destinasi/alam/${id}`}
                      className="px-4 py-2 rounded-full bg-[#e8f4f8] text-primary text-[13px] font-semibold hover:bg-primary hover:text-white transition-colors"
                    >
                      🗺 {id.replace(/-/g, ' ')}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Author card — Original: .bd-author-card */}
            <section className="mb-12 p-6 bg-white rounded-2xl border border-[var(--line)]">
              <div className="flex items-start gap-5">
                {article.author.foto && (
                  <img
                    src={article.author.foto}
                    alt=""
                    className="w-16 h-16 rounded-full object-cover border-2 border-sun flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <div className="font-bold text-[16px] text-primary">{article.author.nama}</div>
                  <div className="text-[12px] text-text-muted mb-2">{isEn ? 'Editorial Team · Plesir Pekalongan' : 'Tim Editorial · Plesir Pekalongan'}</div>
                  {article.author.bio && (
                    <p className="text-[13px] text-text-muted leading-relaxed">{article.author.bio}</p>
                  )}
                  <div className="flex gap-2 mt-3">
                    <span className="w-8 h-8 rounded-full bg-[#f0f5f7] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                      <Icon name="instagram" size={14} />
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#f0f5f7] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                      <Icon name="twitter" size={14} />
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#f0f5f7] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                      <Icon name="mail" size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer share */}
            <section className="mb-12">
              <h2 className="serif text-primary mb-5" style={{ fontSize: '24px' }}>
                {isEn ? 'Enjoyed this article? Share it!' : 'Suka artikel ini? Bagikan!'}
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'wa' as const, icon: '💬', label: 'WhatsApp', color: '#25D366' },
                  { key: 'fb' as const, icon: null, iconName: 'facebook' as const, label: 'Facebook', color: '#1877F2' },
                  { key: 'tw' as const, icon: null, iconName: 'twitter' as const, label: 'X / Twitter', color: '#1DA1F2' },
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => handleShare(item.key)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[13px] font-semibold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon ? <span className="text-[16px]">{item.icon}</span> : <Icon name={item.iconName!} size={15} />}
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => handleShare('copy')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-[13px] font-semibold transition-all ${shared ? 'bg-[#FFF0EE] border-batik-red text-batik-red' : 'bg-white border-[var(--line)] text-text hover:border-primary'}`}
                >
                  <Icon name={shared ? 'check' : 'share'} size={15} />
                  {shared ? (isEn ? 'Link Copied!' : 'Tersalin!') : (isEn ? 'Copy Link' : 'Salin Link')}
                </button>
              </div>
            </section>
          </main>

          {/* ── Sidebar ── Original: .bd-side sticky top-[100px] ── */}
          <aside className="lg:sticky lg:top-[100px] lg:self-start flex flex-col gap-4">
            {/* Table of Contents — Original: .bd-toc */}
            {toc.length > 0 && (
              <div className="bg-white rounded-xl border border-[var(--line)] p-5">
                <h4 className="font-bold text-primary text-[13px] uppercase tracking-[.1em] mb-3">
                  {isEn ? 'Table of Contents' : 'Daftar Isi'}
                </h4>
                <ol className="list-none p-0 m-0 counter-reset-toc">
                  {toc.map((heading, i) => (
                    <li key={i} className="relative py-2 pl-8 border-b border-[var(--line)] last:border-0 text-[13px]">
                      <span
                        className="absolute left-0 top-2 serif font-bold text-sun"
                        style={{ fontSize: 14 }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-text hover:text-secondary cursor-pointer transition-colors">{heading}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Related articles — NEW: scoring algorithm from docs/06-features-detail.md */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-xl border border-[var(--line)] p-5">
                <h4 className="font-bold text-primary text-[13px] uppercase tracking-[.1em] mb-4">
                  {isEn ? 'Related Articles' : 'Artikel Terkait'}
                </h4>
                <div className="flex flex-col gap-3">
                  {relatedArticles.map(r => (
                    // Original: .bd-related-mini — grid 64px|1fr
                    <div
                      key={r.id}
                      className="grid gap-3 cursor-pointer group items-center"
                      style={{ gridTemplateColumns: '64px 1fr' }}
                      onClick={() => navigate(`/berita/${r.slug}`)}
                    >
                      {/* Original: .bd-related-img aspect 1:1 rounded-lg */}
                      <div
                        className="rounded-lg bg-cover bg-center"
                        style={{ aspectRatio: '1/1', backgroundImage: `url(${r.cover})` }}
                      />
                      <div>
                        <div className="text-[13px] font-semibold text-primary leading-[1.35] mb-1 line-clamp-2 group-hover:text-secondary transition-colors">
                          {isEn ? r.judul_en : r.judul}
                        </div>
                        <div className="text-[11px] text-text-muted">{formatBeritaDate(r.tanggal_publish, isEn)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter card — Original: .newsletter-card */}
            <div className="bg-white rounded-xl border border-[var(--line)] p-5">
              <h4 className="font-bold text-primary text-[13px] uppercase tracking-[.1em] mb-2">
                {isEn ? 'Weekly Newsletter' : 'Newsletter Mingguan'}
              </h4>
              <p className="text-[13px] text-text-muted mb-3 leading-relaxed">
                {isEn
                  ? 'Coastal stories & latest Pekalongan news directly to your inbox.'
                  : 'Cerita pesisir & berita terbaru Pekalongan langsung ke inbox Anda.'}
              </p>
              <input
                type="email"
                placeholder={isEn ? 'Your email' : 'Email Anda'}
                className="w-full px-3 py-2.5 rounded-lg border border-[var(--line)] text-[13px] mb-2 outline-none focus:border-secondary"
              />
              <button className="btn btn-primary w-full justify-center text-[13px]">
                {isEn ? 'Subscribe' : 'Berlangganan'}
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* ── More Articles — Related by scoring + more ─────────────────────── */}
      <div className="bg-[#f8fafb] py-12">
        <div className="shell">
          <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
            <div>
              <div className="sec-eyebrow mb-2">{isEn ? 'Read More' : 'Baca Juga'}</div>
              <h2 className="serif text-primary" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
                {isEn ? 'More Stories' : 'Cerita Lainnya'}
              </h2>
            </div>
            <Link to="/berita" className="btn btn-ghost flex items-center gap-2">
              {isEn ? 'All News' : 'Semua Berita'} <Icon name="arrowR" size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {moreArticles.map(b => (
              <BeritaCard
                key={b.id}
                b={b}
                isEn={isEn}
                onClick={() => {
                  navigate(`/berita/${b.slug}`)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            onClick={() => setLightboxImg(null)}
          >
            <Icon name="x" size={18} />
          </button>
          <img
            src={lightboxImg}
            alt=""
            className="max-h-[90vh] max-w-full rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
