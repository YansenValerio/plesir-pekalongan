import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Original: REGIONS from design-reference/data.js
const REGIONS = [
  {
    id: 'utara',
    label: 'Pekalongan Utara',
    label_en: 'North Pekalongan',
    x: 50, y: 24,
    desc: 'Pesisir, pelabuhan, dan pantai-pantai ikonik kota — Pantai Pasir Kencana, Slamaran, dan Klenteng Po An Thian.',
    desc_en: 'Coast, harbor, and iconic city beaches — Pasir Kencana, Slamaran, and Po An Thian Temple.',
    symbol: 'wave',
    element: 'Air',
    count: 8,
  },
  {
    id: 'barat',
    label: 'Pekalongan Barat',
    label_en: 'West Pekalongan',
    x: 28, y: 50,
    desc: 'Heritage kolonial, alun-alun, Masjid Agung, dan Kampung Batik Pesindon.',
    desc_en: 'Colonial heritage, town square, Grand Mosque, and Pesindon Batik Village.',
    symbol: 'mosque',
    element: 'Religi',
    count: 7,
  },
  {
    id: 'timur',
    label: 'Pekalongan Timur',
    label_en: 'East Pekalongan',
    x: 72, y: 50,
    desc: 'Kampung Kauman, Museum Batik, dan sentra batik Setono.',
    desc_en: 'Kauman Village, Batik Museum, and Setono batik center.',
    symbol: 'batik',
    element: 'Batik',
    count: 9,
  },
  {
    id: 'selatan',
    label: 'Pekalongan Selatan',
    label_en: 'South Pekalongan',
    x: 50, y: 76,
    desc: 'Pemukiman santri, pasar tradisional, dan Pindang Tetel khas.',
    desc_en: 'Islamic boarding school area, traditional markets, and Pindang Tetel specialty.',
    symbol: 'rice',
    element: 'Bumi',
    count: 6,
  },
]

// SVG symbols matching design-reference/home.jsx symbolFor
const SymbolIcon = ({ name }: { name: string }) => {
  if (name === 'wave') return (
    <path d="M2 14c3 0 3-3 6-3s3 3 6 3 3-3 6-3 3 3 6 3M2 18c3 0 3-3 6-3s3 3 6 3 3-3 6-3 3 3 6 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
  )
  if (name === 'mosque') return (
    <g fill="currentColor">
      <path d="M12 3c-1 2-3 3-3 5s1 2 3 2 3 0 3-2-2-3-3-5Z"/>
      <rect x="5" y="11" width="14" height="10" rx="1"/>
      <rect x="11" y="13" width="2" height="3"/>
    </g>
  )
  if (name === 'batik') return (
    <g fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="3"/>
      <circle cx="12" cy="12" r="7"/>
      <path d="M5 12c0-4 3-7 7-7M19 12c0 4-3 7-7 7"/>
    </g>
  )
  // rice
  return (
    <g fill="currentColor">
      <path d="M12 3v9M9 7l3-2 3 2M6 11l6-2 6 2M5 14l7-2 7 2M19 17H5l1 4h12l1-4Z"/>
    </g>
  )
}

export default function DiscoverMap() {
  const [hover, setHover] = useState<string | null>(null)
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const hovered = hover ? REGIONS.find(r => r.id === hover) : null

  return (
    // Original: .discover — dark radial gradient bg, crosshatch pattern overlay
    <section
      className="relative py-[100px] overflow-hidden text-[#f3e7c8]"
      style={{
        background: 'radial-gradient(ellipse at top, #1c3548 0%, #0e2230 60%, #051620 100%)',
      }}
    >
      {/* Crosshatch pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent 0 60px, rgba(245,231,194,.03) 60px 61px),
            repeating-linear-gradient(-45deg, transparent 0 60px, rgba(245,231,194,.03) 60px 61px)
          `,
        }}
      />

      <div className="shell relative">
        {/* Original: .discover .sec-eyebrow — centered, gold color, before+after lines */}
        <div
          className="flex items-center justify-center gap-4 text-[12px] font-bold tracking-[0.2em] uppercase mb-4"
          style={{ color: '#d4a849' }}
        >
          <span className="block w-[60px] h-px bg-[#d4a849]" />
          {isEn ? 'Discover the Charm of Pekalongan' : 'Temukan Pesona Pekalongan'}
          <span className="block w-[60px] h-px bg-[#d4a849]" />
        </div>

        {/* Original: .discover .sec-title — centered, Playfair Display italic */}
        <h2
          className="serif italic font-medium text-center mx-auto mb-4"
          style={{ fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: '1.05', color: '#f5e7c2' }}
        >
          {isEn ? 'Four Districts, Four Characters' : 'Empat Wilayah, Empat Karakter'}
        </h2>
        <p
          className="text-center mx-auto mb-[60px] text-[16px] leading-[1.6] max-w-[640px]"
          style={{ color: 'rgba(245,231,194,.65)' }}
        >
          {isEn
            ? 'From the northern fishing coast to historic batik villages in the east, colonial heritage in the west, and Islamic communities in the south.'
            : 'Dari pesisir nelayan di utara, kampung batik bersejarah di timur, heritage kolonial di barat, hingga pemukiman santri di selatan kota.'}
        </p>

        {/* Original: .atlas-wrap — centered grid */}
        <div className="grid place-items-center py-4">
          {/* Original: .atlas-frame — aspect-ratio 1195/896, background atlas-frame.png */}
          <div
            className="relative w-full max-w-[1100px]"
            style={{
              aspectRatio: '1195 / 896',
              backgroundImage: 'url(/assets/atlas-frame.png)',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,.55))',
            }}
          >
            {/* Original: .atlas-canvas — inset: 11% 8% 12% */}
            <div className="absolute" style={{ left: '8%', right: '8%', top: '11%', bottom: '12%', display: 'grid', placeItems: 'center' }}>
              {/* Map image — Original: .atlas-map-img */}
              <img
                src="/assets/peta-pekalongan.svg"
                alt="Peta Kota Pekalongan"
                className="w-[75%] max-h-[88%] object-contain opacity-90"
                style={{
                  filter: 'sepia(.35) saturate(.85) brightness(1.25) hue-rotate(-15deg) drop-shadow(0 4px 8px rgba(0,0,0,.4))',
                  mixBlendMode: 'screen',
                }}
              />

              {/* Region pins — Original: .atlas-pin */}
              {REGIONS.map(r => (
                <button
                  key={r.id}
                  className="absolute flex items-center gap-[10px] bg-transparent border-none cursor-pointer z-[5] p-0 text-[#3a2410] transition-transform duration-200 hover:scale-[1.08] hover:z-10"
                  style={{ left: `${r.x}%`, top: `${r.y}%`, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={() => setHover(r.id)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => navigate('/destinasi')}
                >
                  {/* Original: .atlas-pin-disk — gold radial gradient, border #5a3a1b, with ::before glow + ::after pointer */}
                  <div
                    className="w-[38px] h-[38px] rounded-full grid place-items-center flex-shrink-0 relative"
                    style={{
                      background: hover === r.id
                        ? 'radial-gradient(circle at 30% 30%, #fff3a8 0%, #f5cd6f 50%, #c73e3a 100%)'
                        : 'radial-gradient(circle at 30% 30%, #fdedc8 0%, #d4a849 60%, #8a5a2b 100%)',
                      border: `2px solid ${hover === r.id ? '#c73e3a' : '#5a3a1b'}`,
                      boxShadow: '0 4px 12px rgba(0,0,0,.55), 0 0 0 3px rgba(245,231,194,.18), inset 0 1px 2px rgba(255,255,255,.5)',
                      color: hover === r.id ? '#fff' : '#5a3a1b',
                    }}
                  >
                    {/* Glow ring */}
                    <span
                      className="absolute rounded-full"
                      style={{
                        inset: '-8px',
                        background: 'radial-gradient(circle, rgba(245,205,111,.4) 0%, transparent 70%)',
                        animation: 'atlasGlow 2.4s ease-in-out infinite',
                        zIndex: -1,
                      }}
                    />
                    <svg width="18" height="18" viewBox="0 0 24 24" className="relative z-[1]">
                      <SymbolIcon name={r.symbol} />
                    </svg>
                    {/* Pointer arrow */}
                    <span
                      className="absolute"
                      style={{
                        left: '50%',
                        bottom: '-9px',
                        width: 0,
                        height: 0,
                        transform: 'translateX(-50%)',
                        borderStyle: 'solid',
                        borderWidth: '9px 6px 0 6px',
                        borderColor: `${hover === r.id ? '#c73e3a' : '#5a3a1b'} transparent transparent transparent`,
                        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.4))',
                      }}
                    />
                  </div>

                  {/* Original: .atlas-pin-label — parchment bg, Playfair Display */}
                  <div
                    className="rounded-[4px] px-3 py-[5px] whitespace-nowrap"
                    style={{
                      background: 'linear-gradient(180deg, #f5e7c2 0%, #e8d3a0 100%)',
                      border: '1.5px solid #5a3a1b',
                      fontFamily: '"Playfair Display", serif',
                      boxShadow: '0 4px 12px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.5)',
                    }}
                  >
                    <b className="block text-[13px] font-semibold italic leading-[1.1]" style={{ color: '#3a2410' }}>
                      {isEn ? r.label_en : r.label}
                    </b>
                    <small
                      className="block text-[9px] font-bold tracking-[.1em] uppercase mt-[2px]"
                      style={{ color: '#8a5a2b', fontFamily: '"Plus Jakarta Sans", sans-serif', fontStyle: 'normal' }}
                    >
                      {r.count}+ tempat
                    </small>
                  </div>
                </button>
              ))}

              {/* Floating info popover — Original: .atlas-info */}
              {hovered && (
                <div
                  className="absolute z-[8] rounded-[6px] px-5 py-[14px] pb-3"
                  style={{
                    left: '50%',
                    bottom: '-10%',
                    transform: 'translateX(-50%)',
                    width: 'min(440px, 80%)',
                    background: 'linear-gradient(180deg, #f5e7c2 0%, #e0c990 100%)',
                    border: '2px solid #5a3a1b',
                    boxShadow: '0 12px 28px rgba(0,0,0,.55)',
                    color: '#3a2410',
                    animation: 'cineFadeUp .2s ease',
                  }}
                >
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span
                      className="text-[9px] font-bold tracking-[.15em] uppercase"
                      style={{ color: '#c73e3a', fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      {hovered.element}
                    </span>
                    <b className="serif text-[18px] italic font-semibold" style={{ color: '#3a2410' }}>
                      {isEn ? hovered.label_en : hovered.label}
                    </b>
                  </div>
                  <p className="text-[12.5px] leading-[1.55] m-0 mb-1.5" style={{ color: '#5a3a1b' }}>
                    {isEn ? hovered.desc_en : hovered.desc}
                  </p>
                  <span className="text-[11px] font-bold tracking-[.05em]" style={{ color: '#8a5a2b' }}>
                    {isEn ? 'Explore destinations →' : 'Jelajahi destinasi →'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
