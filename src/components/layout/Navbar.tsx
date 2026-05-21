// Original: Navbar & MegaMenu from design-reference/components.jsx
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/common/Icon'
import Logo from '@/components/common/Logo'
import { useLangStore } from '@/stores/langStore'
import { useScrollDetection } from '@/hooks/useScrollDetection'

interface NavbarProps {
  isHome?: boolean
}

// Dari design-reference/data.js CATEGORIES
const CATEGORIES = [
  { id: 'alam',    icon: '🏖️', label: 'Alam',    label_en: 'Nature',    sub: 'Pantai, Curug, Taman' },
  { id: 'religi',  icon: '🕌', label: 'Religi',  label_en: 'Religious', sub: 'Masjid, Makam, Pesantren' },
  { id: 'budaya',  icon: '🎨', label: 'Budaya',  label_en: 'Cultural',  sub: 'Museum, Kampung Batik, Heritage' },
  { id: 'kuliner', icon: '🍜', label: 'Kuliner', label_en: 'Culinary',  sub: 'Tauto, Megono, Seafood' },
  { id: 'belanja', icon: '🛍️', label: 'Belanja', label_en: 'Shopping',  sub: 'Batik, Oleh-oleh, Pasar' },
]

export default function Navbar({ isHome = false }: NavbarProps) {
  const [megaOpen, setMegaOpen] = useState(false)
  const scrolled = useScrollDetection(60)
  const { t } = useTranslation()
  const { lang, toggleLang } = useLangStore()
  const location = useLocation()
  const navigate = useNavigate()

  // Original: transparent = isHome && !scrolled
  const transparent = isHome && !scrolled

  const isActive = (path: string) => location.pathname.startsWith(path)

  // Original: .nav-link — padding 10px 14px, font-size 14px, weight 500, border-radius 8px
  const navLinkBase =
    'relative px-[14px] py-[10px] text-[14px] font-medium inline-flex items-center gap-[6px] rounded-[8px] cursor-pointer transition-[background] duration-200 select-none'

  const navLinkHover = transparent
    ? 'hover:bg-white/10'
    : 'hover:bg-[rgba(10,77,104,0.08)]'

  const navLinkActive = transparent ? 'text-sun' : 'text-secondary'

  return (
    // Original: .nav — fixed, z-index 100, transition background/shadow/color 0.3s
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-[background,box-shadow,color] duration-300 ${
        transparent
          ? 'bg-transparent text-white'
          // Original: .nav.solid — rgba(255,255,255,0.95), blur(10px), shadow 0 1px 0 var(--line)
          : 'bg-[rgba(255,255,255,0.95)] backdrop-blur-[10px] text-primary shadow-[0_1px_0_#E5E7EB]'
      }`}
      onMouseLeave={() => setMegaOpen(false)}
    >
      {/* Original: .nav-inner — max-width 1280px, padding 18px 24px */}
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 py-[18px]">

        {/* Logo */}
        <Link to="/" onClick={() => setMegaOpen(false)}>
          <Logo light={transparent} />
        </Link>

        {/* Original: .nav-links — gap 6px */}
        <div className="hidden md:flex gap-[6px] items-center">
          {/* Destinasi — hover buka mega menu */}
          <div
            className={`${navLinkBase} ${navLinkHover} ${isActive('/destinasi') ? navLinkActive : ''}`}
            onMouseEnter={() => setMegaOpen(true)}
          >
            {t('nav.destinasi')}
            <Icon name="chevron" size={14} />
          </div>

          <Link
            to="/event"
            className={`${navLinkBase} ${navLinkHover} ${isActive('/event') ? navLinkActive : ''}`}
            onClick={() => setMegaOpen(false)}
          >
            {t('nav.event')}
          </Link>

          <Link
            to="/berita"
            className={`${navLinkBase} ${navLinkHover} ${isActive('/berita') ? navLinkActive : ''}`}
            onClick={() => setMegaOpen(false)}
          >
            {t('nav.berita')}
          </Link>

          <Link
            to="/rencana"
            className={`${navLinkBase} ${navLinkHover} ${isActive('/rencana') ? navLinkActive : ''}`}
            onClick={() => setMegaOpen(false)}
          >
            {lang === 'id' ? 'Rencana Perjalanan' : 'Trip Planner'}
          </Link>

          <Link
            to="/kontak"
            className={`${navLinkBase} ${navLinkHover} ${isActive('/kontak') ? navLinkActive : ''}`}
            onClick={() => setMegaOpen(false)}
          >
            {t('nav.kontak')}
          </Link>
        </div>

        {/* Original: .nav-tools — gap 8px */}
        <div className="flex gap-2 items-center">
          {/* Original: .lang-toggle — padding 8px 14px, rounded-full, border currentColor */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-[6px] px-[14px] py-2 rounded-full border border-current text-[13px] font-semibold bg-transparent transition-colors duration-200 hover:bg-white/10"
          >
            <Icon name="globe" size={14} />
            {lang === 'id' ? 'ID' : 'EN'}
          </button>

          {/* Original: .nav-icon-btn — 38×38, rounded-full, border currentColor */}
          <button className="w-[38px] h-[38px] rounded-full border border-current grid place-items-center bg-transparent transition-colors duration-200 hover:bg-white/10">
            <Icon name="search" size={16} />
          </button>
        </div>
      </div>

      {/* Original: .mega — absolute, top 100%, bg white, shadow, padding 32px 0, border-top */}
      {megaOpen && (
        <div
          className="absolute top-full left-0 right-0 bg-white text-[var(--text)] shadow-[0_20px_40px_rgba(0,0,0,0.12)] py-8 border-t border-line"
          onMouseLeave={() => setMegaOpen(false)}
        >
          {/* Original: .mega-grid — max-width 1280px, 5 columns, gap 16px */}
          <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { navigate(`/destinasi/${cat.id}`); setMegaOpen(false) }}
                // Original: .mega-card — border line, border-radius 14px, padding 20px
                // hover: border-color secondary, translateY(-3px), shadow rgba(8,131,149,.15)
                className="group border border-line rounded-[14px] p-5 cursor-pointer bg-white transition-all duration-200 text-left
                  hover:border-secondary hover:-translate-y-[3px] hover:shadow-[0_12px_24px_rgba(8,131,149,0.15)]"
              >
                {/* Original: .mega-card .icon — 48×48, border-radius 12px, bg accent (#F5E8C7), font-size 24px */}
                <div className="w-12 h-12 rounded-[12px] grid place-items-center bg-accent text-2xl mb-[14px]">
                  {cat.icon}
                </div>
                {/* Original: .mega-card h4 — Plus Jakarta Sans, 15px, weight 700, color primary */}
                <h4 className="font-sans text-[15px] font-bold text-primary mb-[6px] group-hover:text-secondary transition-colors">
                  {lang === 'en' ? cat.label_en : cat.label}
                </h4>
                {/* Original: .mega-card p — 12px, color text-muted, line-height 1.5 */}
                <p className="text-xs text-text-muted leading-[1.5] m-0">{cat.sub}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
