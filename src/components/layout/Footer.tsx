// Original: Footer from design-reference/components.jsx + styles.css
import { Link } from 'react-router-dom'
import Icon from '@/components/common/Icon'
import Logo from '@/components/common/Logo'

const SOCIAL_ICONS = [
  { name: 'instagram', title: 'Instagram' },
  { name: 'facebook',  title: 'Facebook' },
  { name: 'tiktok',    title: 'TikTok' },
  { name: 'youtube',   title: 'YouTube' },
  { name: 'twitter',   title: 'X (Twitter)' },
] as const

export default function Footer() {
  return (
    // Original: .footer — background #0a1e26, color #c9d3d8, padding 80px 0 30px
    <footer style={{ background: '#0a1e26', color: '#c9d3d8' }} className="pt-[80px] pb-[30px]">
      <div className="shell">
        {/* Original: .footer-grid — 1.5fr 1fr 1fr 1fr, gap 48px, margin-bottom 60px */}
        <div
          className="grid gap-12 mb-[60px]"
          style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr' }}
        >
          {/* Brand column — Original: .footer-brand */}
          <div>
            <Logo light />
            {/* Original: .footer-brand p — font-size 14px, line-height 1.6, margin 16px 0 24px, max-width 320px */}
            <p className="text-[14px] leading-[1.6] mt-4 mb-6 max-w-[320px]">
              Portal resmi pariwisata Kota Pekalongan. Jelajahi pesona pesisir, warisan batik, dan kekayaan kuliner di kota santri.
            </p>
            {/* Original: .social-row — gap 10px */}
            <div className="flex gap-[10px]">
              {SOCIAL_ICONS.map(({ name, title }) => (
                <a
                  key={name}
                  href="#"
                  title={title}
                  // Original: .social-btn — 38×38, rounded-full, bg #1a323d, color #c9d3d8
                  // hover: bg var(--sun), color var(--dark)
                  className="w-[38px] h-[38px] rounded-full grid place-items-center transition-all duration-200
                    bg-[#1a323d] hover:bg-sun hover:text-dark"
                >
                  <Icon name={name} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Situs Web */}
          <div>
            {/* Original: .footer h5 — Plus Jakarta Sans, 13px, 700, uppercase, tracking 0.15em, color #fff, margin-bottom 20px */}
            <h5
              className="font-sans text-[13px] font-bold text-white uppercase mb-5"
              style={{ letterSpacing: '0.15em' }}
            >
              Situs Web Kami
            </h5>
            {/* Original: .footer ul — gap 12px; .footer ul a — 14px, color #c9d3d8, hover color sun */}
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {['Tentang Kami', 'Disclaimer', 'Kebijakan Privasi', 'Syarat & Ketentuan'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[14px] transition-colors duration-150 hover:text-sun">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h5
              className="font-sans text-[13px] font-bold text-white uppercase mb-5"
              style={{ letterSpacing: '0.15em' }}
            >
              Informasi
            </h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li><Link to="/berita" className="text-[14px] transition-colors duration-150 hover:text-sun">Berita</Link></li>
              <li><Link to="/event"  className="text-[14px] transition-colors duration-150 hover:text-sun">Event</Link></li>
              <li><Link to="/kontak" className="text-[14px] transition-colors duration-150 hover:text-sun">FAQ</Link></li>
              <li><a href="#" className="text-[14px] transition-colors duration-150 hover:text-sun">Sitemap</a></li>
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h5
              className="font-sans text-[13px] font-bold text-white uppercase mb-5"
              style={{ letterSpacing: '0.15em' }}
            >
              Layanan
            </h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li><Link to="/kontak" className="text-[14px] transition-colors duration-150 hover:text-sun">TIC Pekalongan</Link></li>
              <li><Link to="/rencana" className="text-[14px] transition-colors duration-150 hover:text-sun">Rencana Perjalanan</Link></li>
              <li><a href="#" className="text-[14px] transition-colors duration-150 hover:text-sun">Pengaduan Wisatawan</a></li>
              <li><a href="#" className="text-[14px] transition-colors duration-150 hover:text-sun">Kontak Darurat</a></li>
            </ul>
          </div>
        </div>

        {/* Original: .footer-bottom — border-top #1a323d, padding-top 24px, font-size 12px, color #7d8b91 */}
        <div
          className="flex flex-wrap justify-between gap-3 pt-6 text-[12px]"
          style={{ borderTop: '1px solid #1a323d', color: '#7d8b91' }}
        >
          <div>© 2026 Plesir Pekalongan — Dinas Kebudayaan, Pariwisata, Pemuda dan Olahraga Kota Pekalongan.</div>
          <div>Made with ☕ in Kota Batik Dunia</div>
        </div>
      </div>
    </footer>
  )
}
