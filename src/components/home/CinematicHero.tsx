import { useState, useEffect, useRef } from 'react'

const SLIDES = [
  {
    title: ['Pantai', 'Pasir Kencana'],
    spot: 'Pantai Pasir Kencana',
    area: 'Pekalongan Utara',
    bg: 'beach,sunset,indonesia,jetty',
    tint: 'rgba(4,28,38,0.45)',
  },
  {
    title: ['Kampung', 'Batik Kauman'],
    spot: 'Kampung Batik Kauman',
    area: 'Pekalongan Timur',
    bg: 'batik,colorful,javanese,pattern',
    tint: 'rgba(30,10,10,0.4)',
  },
  {
    title: ['Curug', 'Bajing'],
    spot: 'Curug Bajing',
    area: 'Kab. Pekalongan',
    bg: 'waterfall,jungle,tropical,green',
    tint: 'rgba(4,22,10,0.4)',
  },
  {
    title: ['Pekan Batik', 'Nusantara'],
    spot: 'Pekan Batik Nusantara',
    area: 'Lapangan Jetayu',
    bg: 'festival,parade,asia,carnival',
    tint: 'rgba(20,12,4,0.4)',
  },
]

const DURATION = 7000

export default function CinematicHero() {
  const [current, setCurrent] = useState(0)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    tickRef.current = setInterval(() => {
      setCurrent(v => (v + 1) % SLIDES.length)
    }, DURATION)
    return () => { if (tickRef.current) clearInterval(tickRef.current) }
  }, [])

  const go = (k: number) => {
    if (tickRef.current) clearInterval(tickRef.current)
    setCurrent(k)
    tickRef.current = setInterval(() => {
      setCurrent(v => (v + 1) % SLIDES.length)
    }, DURATION)
  }

  const c = SLIDES[current]

  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden text-white bg-[#041C26] isolate">

      {/* Cycling background images */}
      {SLIDES.map((slide, k) => (
        <div
          key={k}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${k === current ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={k !== current}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://source.unsplash.com/1920x1080/?${encodeURIComponent(slide.bg)})`,
              animation: 'cineKenBurns 14s ease-out infinite alternate',
            }}
          />
          {/* Per-slide tint */}
          <div className="absolute inset-0" style={{ background: slide.tint }} />
        </div>
      ))}

      {/* Heavy vignette at bottom for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.72) 100%)' }}
      />

      {/* Headline — centered bottom */}
      <div className="absolute inset-x-0 bottom-0 z-[3] pb-20 flex flex-col items-center text-center">
        <div
          key={`txt-${current}`}
          style={{ animation: 'cineFadeUp 0.9s cubic-bezier(.22,.85,.4,1) both' }}
        >
          {/* Big serif title */}
          <h1
            className="serif font-medium leading-[0.9] tracking-[-0.02em] mb-5"
            style={{ fontSize: 'clamp(52px, 8vw, 110px)' }}
          >
            <span className="block">{c.title[0]}</span>
            <span className="block italic text-sun" style={{ textShadow: '0 4px 40px rgba(242,169,59,.35)' }}>
              {c.title[1]}
            </span>
          </h1>

          {/* Destination name + area */}
          <div className="flex items-center justify-center gap-3 text-white/70 text-[13px] font-medium tracking-[0.12em] uppercase">
            <span className="w-5 h-px bg-white/40" />
            {c.spot}
            <span className="w-1 h-1 rounded-full bg-white/40" />
            {c.area}
            <span className="w-5 h-px bg-white/40" />
          </div>
        </div>

        {/* Slide dots */}
        <div className="flex gap-2 mt-8">
          {SLIDES.map((_, k) => (
            <button
              key={k}
              onClick={() => go(k)}
              aria-label={`Slide ${k + 1}`}
              className="h-[3px] rounded-full transition-all duration-300 bg-white/30 hover:bg-white/60"
              style={{ width: k === current ? '28px' : '10px', background: k === current ? 'var(--sun)' : undefined }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
