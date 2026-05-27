import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/common/Icon'

export default function HalalBanner() {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  return (
    // Original: .halal-banner — gradient(90deg, primary, secondary), padding:0, overflow:hidden
    <section
      className="relative overflow-hidden p-0"
      style={{ background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)' }}
    >
      {/* Original: .halal-inner — max-width:shell-w, grid 1.2fr 1fr, min-height:380px */}
      <div
        className="grid items-center"
        style={{
          maxWidth: 'var(--shell-w)',
          margin: '0 auto',
          gridTemplateColumns: '1.2fr 1fr',
          minHeight: '380px',
        }}
      >
        {/* Original: .halal-text — padding left edge-to-shell, padding right 24px, padding y 60px */}
        <div
          className="text-white py-[60px] pr-6"
          style={{ paddingLeft: 'max(24px, calc((100vw - var(--shell-w)) / 2 + 24px))' }}
        >
          {/* Original: sec-eyebrow in sun color */}
          <div className="flex items-center gap-4 text-[12px] font-bold tracking-[0.2em] uppercase mb-4 text-sun">
            <span className="block w-[60px] h-px bg-sun" />
            {isEn ? 'Muslim-Friendly Tourism' : 'Wisata Ramah Muslim'}
          </div>
          <h2
            className="serif text-white mb-4"
            style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: '1.1' }}
          >
            {isEn
              ? 'Explore the complete guide to halal tourism & religious destinations in Pekalongan'
              : 'Jelajahi panduan lengkap wisata halal & destinasi religi di Pekalongan'}
          </h2>
          <p className="text-[16px] leading-[1.5] max-w-[480px] mb-7 opacity-90">
            {isEn
              ? 'As a santri city, Pekalongan offers historic mosques, sacred tombs, verified halal cuisine, and Muslim family-friendly accommodation.'
              : 'Sebagai kota santri, Pekalongan menyajikan masjid bersejarah, makam keramat, kuliner halal terverifikasi, dan akomodasi ramah keluarga muslim.'}
          </p>
          <button className="btn btn-sun" onClick={() => navigate('/destinasi/religi')}>
            {isEn ? 'Explore Religi' : 'Klik di sini'} <Icon name="arrowR" size={16} />
          </button>
        </div>

        {/* Original: .halal-image — height:380px, bg image + batik pattern overlay */}
        <div
          className="relative h-[380px] bg-cover bg-center"
          style={{
            background: 'linear-gradient(135deg, #1a6e8c, #0A4D68)',
          }}
        >
          {/* Batik pattern overlay */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(242,169,59,.15) 25%, transparent 25%, transparent 75%, rgba(242,169,59,.15) 75%),
                linear-gradient(45deg, rgba(242,169,59,.15) 25%, transparent 25%, transparent 75%, rgba(242,169,59,.15) 75%)
              `,
              backgroundSize: '30px 30px',
              backgroundPosition: '0 0, 15px 15px',
            }}
          />
          {/* Actual image on top */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80&fit=crop)` }}
          />
        </div>
      </div>
    </section>
  )
}
