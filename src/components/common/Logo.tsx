// Original: Logo from design-reference/components.jsx
// .logo-mark gradient: sun (#F2A93B) → batik-red (#C73E3A)

interface LogoProps {
  light?: boolean
  className?: string
}

export default function Logo({ light = false, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 cursor-pointer ${className}`}>
      {/* .logo-mark */}
      <div
        className="w-[38px] h-[38px] rounded-[10px] grid place-items-center text-white flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #F2A93B, #C73E3A)' }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M2 14c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3" />
          <path d="M2 19c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3" />
        </svg>
      </div>

      {/* .logo-text */}
      <div
        className="font-serif font-bold text-[18px] leading-none"
        style={{ color: light ? '#fff' : 'inherit' }}
      >
        Plesir
        <br />
        <span style={{ color: light ? '#fff' : 'var(--text-muted)' }}>Pekalongan</span>
        <span
          className="block font-sans text-[9px] tracking-[0.25em] font-semibold mt-1"
          style={{ opacity: 0.8 }}
        >
          KOTA BATIK DUNIA
        </span>
      </div>
    </div>
  )
}
