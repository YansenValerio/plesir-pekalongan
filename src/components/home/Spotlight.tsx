import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/common/Icon'
import { useSpotlightData } from '@/hooks/useSupabaseData'
import { imgUrl } from '@/utils/image'
import type { Destinasi } from '@/types'

// Fallback jika Supabase kosong
const FALLBACK: Pick<Destinasi, 'id' | 'nama' | 'nama_en' | 'deskripsi_singkat' | 'deskripsi_en' | 'foto_cover'>[] = [
  {
    id: 'batik',
    nama: 'Batik Pekalongan',
    nama_en: 'Pekalongan Batik',
    deskripsi_singkat: 'Diakui UNESCO sebagai warisan budaya dunia. Setiap motif menyimpan cerita pesisir nan beragam.',
    deskripsi_en: 'Recognized by UNESCO as world cultural heritage. Every motif holds a diverse coastal story.',
    foto_cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&h=880&fit=crop',
  },
  {
    id: 'megono',
    nama: 'Sego Megono',
    nama_en: 'Sego Megono',
    deskripsi_singkat: 'Sarapan ritual warga Pekalongan: nasi urap nangka muda yang gurih dan harum.',
    deskripsi_en: "Pekalongan's ritual breakfast: fragrant rice with young jackfruit urap.",
    foto_cover: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=640&h=880&fit=crop',
  },
  {
    id: 'tauto',
    nama: 'Tauto',
    nama_en: 'Tauto',
    deskripsi_singkat: 'Soto khas dengan kuah tauco yang dalam — perpaduan akulturasi Tionghoa-Jawa pesisir.',
    deskripsi_en: 'Signature soto with deep tauco broth — a blend of Chinese-Javanese coastal culture.',
    foto_cover: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=640&h=880&fit=crop',
  },
  {
    id: 'syawalan',
    nama: 'Syawalan Krapyak',
    nama_en: 'Syawalan Krapyak',
    deskripsi_singkat: 'Tradisi lopis raksasa pasca-lebaran yang menarik puluhan ribu pengunjung.',
    deskripsi_en: 'Post-Eid giant lopis tradition attracting tens of thousands of visitors.',
    foto_cover: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?w=640&h=880&fit=crop',
  },
  {
    id: 'sintren',
    nama: 'Tari Sintren',
    nama_en: 'Sintren Dance',
    deskripsi_singkat: 'Seni mistik pesisir yang masih lestari di desa-desa pinggir laut.',
    deskripsi_en: 'Mystical coastal art still preserved in seaside villages.',
    foto_cover: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=640&h=880&fit=crop',
  },
  {
    id: 'kanal',
    nama: 'Kanal Belanda',
    nama_en: 'Dutch Canal',
    deskripsi_singkat: 'Jejak hidraulik kolonial yang membentuk wajah kota lama Pekalongan.',
    deskripsi_en: 'Colonial hydraulic traces that shaped the face of old Pekalongan.',
    foto_cover: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=640&h=880&fit=crop',
  },
]

function SkeletonCard() {
  return (
    <div className="flex-none w-[320px] h-[440px] rounded-[18px] overflow-hidden bg-white/10 animate-pulse" />
  )
}

export default function Spotlight() {
  const railRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const { data: supabaseData, loading } = useSpotlightData()
  const items = supabaseData.length > 0 ? supabaseData : FALLBACK

  const updateProgress = () => {
    const el = railRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? (el.scrollLeft / max) * 100 : 0)
  }

  const scroll = (delta: number) => {
    railRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  const handleCardClick = (item: typeof items[0]) => {
    // Hanya navigasi ke detail jika bukan fallback (id yang valid dari Supabase berupa UUID)
    if (item.id.length > 10) navigate(`/destinasi/${item.id}`)
  }

  return (
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
        <div
          className="grid gap-[60px] items-end"
          style={{ gridTemplateColumns: '360px 1fr' }}
        >
          {/* Left: text column */}
          <div>
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

            {/* Rail controls */}
            <div className="flex gap-2 items-center mt-6">
              <div className="flex-1 h-[2px] bg-white/20 rounded-px max-w-[280px]">
                <div
                  className="h-full bg-sun rounded-px transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
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

          {/* Right: scroll rail */}
          <div
            ref={railRef}
            onScroll={updateProgress}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              : items.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="flex-none w-[320px] h-[440px] rounded-[18px] overflow-hidden relative cursor-pointer bg-cover bg-center transition-transform duration-300 hover:-translate-y-[6px]"
                  style={{
                    backgroundImage: `url(${imgUrl(item.foto_cover, 640)})`,
                    scrollSnapAlign: 'start',
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,.85))' }}
                  />
                  <div className="absolute left-[22px] right-[22px] bottom-[22px] z-[2]">
                    <h3 className="serif text-[22px] text-white mb-2">
                      {isEn ? (item.nama_en || item.nama) : item.nama}
                    </h3>
                    <p className="text-[13px] text-white/85 leading-[1.5] m-0">
                      {isEn ? (item.deskripsi_en || item.deskripsi_singkat) : item.deskripsi_singkat}
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}
