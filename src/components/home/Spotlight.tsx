import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/common/Icon'

// Original: SPOTLIGHTS from design-reference/data.js
const SPOTLIGHTS = [
  {
    id: 'batik',
    title: 'Batik Pekalongan',
    title_en: 'Pekalongan Batik',
    desc: 'Diakui UNESCO sebagai warisan budaya dunia. Setiap motif menyimpan cerita pesisir nan beragam.',
    desc_en: 'Recognized by UNESCO as world cultural heritage. Every motif holds a diverse coastal story.',
    img: 'https://source.unsplash.com/640x880/?batik,colorful,pattern',
  },
  {
    id: 'megono',
    title: 'Sego Megono',
    title_en: 'Sego Megono',
    desc: 'Sarapan ritual warga Pekalongan: nasi urap nangka muda yang gurih dan harum.',
    desc_en: 'Pekalongan\'s ritual breakfast: fragrant rice with young jackfruit urap.',
    img: 'https://source.unsplash.com/640x880/?rice,indonesian,banana,leaf',
  },
  {
    id: 'tauto',
    title: 'Tauto',
    title_en: 'Tauto',
    desc: 'Soto khas dengan kuah tauco yang dalam — perpaduan akulturasi Tionghoa-Jawa pesisir.',
    desc_en: 'Signature soto with deep tauco broth — a blend of Chinese-Javanese coastal culture.',
    img: 'https://source.unsplash.com/640x880/?soup,beef,asian',
  },
  {
    id: 'syawalan',
    title: 'Syawalan Krapyak',
    title_en: 'Syawalan Krapyak',
    desc: 'Tradisi lopis raksasa pasca-lebaran yang menarik puluhan ribu pengunjung.',
    desc_en: 'Post-Eid giant lopis tradition attracting tens of thousands of visitors.',
    img: 'https://source.unsplash.com/640x880/?festival,javanese,celebration',
  },
  {
    id: 'sintren',
    title: 'Tari Sintren',
    title_en: 'Sintren Dance',
    desc: 'Seni mistik pesisir yang masih lestari di desa-desa pinggir laut.',
    desc_en: 'Mystical coastal art still preserved in seaside villages.',
    img: 'https://source.unsplash.com/640x880/?dance,traditional,indonesia',
  },
  {
    id: 'kanal',
    title: 'Kanal Belanda',
    title_en: 'Dutch Canal',
    desc: 'Jejak hidraulik kolonial yang membentuk wajah kota lama Pekalongan.',
    desc_en: 'Colonial hydraulic traces that shaped the face of old Pekalongan.',
    img: 'https://source.unsplash.com/640x880/?canal,colonial,boat',
  },
]

export default function Spotlight() {
  const railRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const updateProgress = () => {
    const el = railRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? (el.scrollLeft / max) * 100 : 0)
  }

  const scroll = (delta: number) => {
    railRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    // Original: .spotlight — linear-gradient(135deg, #0A4D68, #088395), overflow:hidden
    <section
      className="relative py-[100px] overflow-hidden text-white"
      style={{ background: 'linear-gradient(135deg, #0A4D68 0%, #088395 100%)' }}
    >
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 80px 80px',
        }}
      />

      <div className="shell relative">
        {/* Original: .spotlight-grid — 360px 1fr, gap:60px, align:end */}
        <div
          className="grid gap-[60px] items-end"
          style={{ gridTemplateColumns: '360px 1fr' }}
        >
          {/* Left: text column */}
          <div>
            {/* Original: .spotlight-grid .sec-eyebrow — color:sun */}
            <div className="flex items-center gap-4 text-[12px] font-bold tracking-[0.2em] uppercase mb-4 text-sun">
              <span className="block w-[60px] h-px bg-sun" />
              Spotlight
            </div>
            <h2
              className="serif text-white mb-4"
              style={{ fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: '1.05' }}
            >
              {isEn ? 'Hallmarks of Pekalongan' : 'Ciri Khas Pekalongan'}
            </h2>
            <p className="text-[16px] leading-[1.6] text-white/85 max-w-[600px] mb-12">
              {isEn
                ? 'Discover the uniqueness of coastal culture through batik, cuisine, and traditions passed down through generations.'
                : 'Temukan keunikan budaya pesisir melalui batik, kuliner, dan tradisi yang masih hidup turun-temurun.'}
            </p>
            <button className="btn btn-sun" onClick={() => navigate('/destinasi')}>
              {isEn ? 'Explore Highlights' : 'Temukan Ciri Khas'} <Icon name="arrowR" size={16} />
            </button>

            {/* Rail controls — Original: .spot-rail-controls */}
            <div className="flex gap-2 items-center mt-6">
              {/* Original: .spot-progress — flex:1, height:2px */}
              <div className="flex-1 h-[2px] bg-white/20 rounded-px max-w-[280px]">
                <div
                  className="h-full bg-sun rounded-px transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {/* Original: .rail-btn — 44×44, border:rgba(255,255,255,.4) */}
              <button
                onClick={() => scroll(-340)}
                className="w-[44px] h-[44px] rounded-full grid place-items-center bg-transparent border border-white/40 text-white transition-all duration-150 hover:bg-sun hover:border-sun hover:text-dark"
              >
                <Icon name="arrowL" size={16} />
              </button>
              <button
                onClick={() => scroll(340)}
                className="w-[44px] h-[44px] rounded-full grid place-items-center bg-transparent border border-white/40 text-white transition-all duration-150 hover:bg-sun hover:border-sun hover:text-dark"
              >
                <Icon name="arrowR" size={16} />
              </button>
            </div>
          </div>

          {/* Right: scroll rail — Original: .spot-rail */}
          <div
            ref={railRef}
            onScroll={updateProgress}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {SPOTLIGHTS.map(s => (
              // Original: .spot-card — flex:0 0 320px, height:440px, rounded-[18px], bg-cover
              <div
                key={s.id}
                className="flex-none w-[320px] h-[440px] rounded-[18px] overflow-hidden relative cursor-pointer bg-cover bg-center transition-transform duration-300 hover:-translate-y-[6px]"
                style={{ backgroundImage: `url(${s.img})`, scrollSnapAlign: 'start' }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,.85))' }} />
                {/* Original: .spot-card-body — abs bottom-22px */}
                <div className="absolute left-[22px] right-[22px] bottom-[22px] z-[2]">
                  <h3 className="serif text-[22px] text-white mb-2">{isEn ? s.title_en : s.title}</h3>
                  <p className="text-[13px] text-white/85 leading-[1.5] m-0">{isEn ? s.desc_en : s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
