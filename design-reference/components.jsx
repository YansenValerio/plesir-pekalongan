// Plesir Pekalongan — shared components (Navbar, Footer, Icons)

const Icon = ({ name, size = 18, stroke = 1.6 }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    search: <circle cx="11" cy="11" r="7" />,
    searchTail: <path d="m20 20-3-3" />,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    arrowR: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    arrowL: <><path d="M19 12H5"/><path d="m11 6-6 6 6 6"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></>,
    location: <><path d="M12 22s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12Z"/><circle cx="12" cy="10" r="2.5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    ticket: <><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4Z"/><path d="M13 6v12"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></>,
    facebook: <path d="M14 9V6a1 1 0 0 1 1-1h2V2h-3a4 4 0 0 0-4 4v3H7v3h3v9h4v-9h3l1-3Z"/>,
    twitter: <path d="M22 4 14 14l8 8h-4l-6-6-7 6H2l9-10L2 4h4l6 6 7-6Z"/>,
    youtube: <><path d="M22 8a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z"/><path d="m10 9 5 3-5 3Z"/></>,
    tiktok: <><path d="M14 4v10a4 4 0 1 1-4-4"/><path d="M14 4c0 3 2 5 5 5"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2A20 20 0 0 1 2 6.18 2 2 0 0 1 4 4h3a2 2 0 0 1 2 1.72c.12.96.34 1.9.66 2.81a2 2 0 0 1-.45 2.11l-1.3 1.3a16 16 0 0 0 6.65 6.65l1.3-1.3a2 2 0 0 1 2.11-.45c.91.32 1.85.54 2.81.66A2 2 0 0 1 22 16.92Z"/>,
    menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/></>,
    users: <><circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><path d="M16 4a4 4 0 0 1 0 8"/><path d="M22 20a7 7 0 0 0-5-6.7"/></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/></>,
    grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    check: <path d="m5 12 5 5 9-12"/>,
    download: <><path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M4 21h16"/></>,
    share: <><circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="m8.5 10.5 7-3M8.5 13.5l7 3"/></>,
    save: <><path d="M4 4h12l4 4v12a2 2 0 0 1-2 2H4Z"/><path d="M8 4v6h8V4"/></>,
    wave: <path d="M2 12c3 0 3-4 6-4s3 4 6 4 3-4 6-4 3 4 6 4M2 18c3 0 3-4 6-4s3 4 6 4 3-4 6-4 3 4 6 4" />,
    x: <><path d="m6 6 12 12"/><path d="m6 18 12-12"/></>,
    play: <path d="M8 5v14l11-7Z"/>,
  };
  if (name === 'search') return <svg {...common}>{paths.search}{paths.searchTail}</svg>;
  return <svg {...common}>{paths[name] || null}</svg>;
};

const Logo = ({ light, onClick }) => (
  <div className="logo" onClick={onClick}>
    <div className="logo-mark">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
        <path d="M2 14c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3"/>
        <path d="M2 19c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3"/>
      </svg>
    </div>
    <div className="logo-text" style={{ color: light ? '#fff' : 'inherit' }}>
      Plesir<br/>
      <span style={{ color: light ? '#fff' : 'var(--text-muted)' }}>Pekalongan</span>
      <span className="sub">KOTA BATIK DUNIA</span>
    </div>
  </div>
);

const Navbar = ({ page, setPage, lang, setLang }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState(false);
  const isHome = page === 'home';
  const transparent = isHome && !scrolled;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const Link = ({ id, label, dropdown }) => (
    <div
      className={`nav-link ${page.startsWith(id) ? 'active' : ''}`}
      onClick={() => !dropdown && setPage(id)}
      onMouseEnter={() => dropdown && setMegaOpen(true)}
    >
      {label}
      {dropdown && <Icon name="chevron" size={14} />}
    </div>
  );

  return (
    <nav className={`nav ${transparent ? 'transparent' : 'solid'}`} onMouseLeave={() => setMegaOpen(false)}>
      <div className="nav-inner">
        <Logo light={transparent} onClick={() => setPage('home')} />
        <div className="nav-links">
          <Link id="destinasi" label={lang === 'id' ? 'Destinasi' : 'Destinations'} dropdown />
          <Link id="event" label="Event" />
          <Link id="berita" label={lang === 'id' ? 'Berita' : 'News'} />
          <Link id="rencana" label={lang === 'id' ? 'Rencana Perjalanan' : 'Trip Planner'} />
          <Link id="kontak" label={lang === 'id' ? 'Kontak' : 'Contact'} />
        </div>
        <div className="nav-tools">
          <button className="lang-toggle" onClick={() => setLang(lang === 'id' ? 'en' : 'id')}>
            <Icon name="globe" size={14} />
            {lang === 'id' ? 'ID' : 'EN'}
          </button>
          <button className="nav-icon-btn"><Icon name="search" size={16} /></button>
        </div>
      </div>
      {megaOpen && (
        <div className="mega" onMouseLeave={() => setMegaOpen(false)}>
          <div className="mega-grid">
            {window.PP_DATA.CATEGORIES.map(cat => (
              <div key={cat.id} className="mega-card" onClick={() => { setPage('destinasi/' + cat.id); setMegaOpen(false); }}>
                <div className="icon">{cat.icon}</div>
                <h4>{cat.label}</h4>
                <p>{cat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ setPage, lang }) => (
  <footer className="footer">
    <div className="shell">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>Portal resmi pariwisata Kota Pekalongan. Jelajahi pesona pesisir, warisan batik, dan kekayaan kuliner di kota santri.</p>
          <div className="social-row">
            <a className="social-btn" title="Instagram"><Icon name="instagram" size={16} /></a>
            <a className="social-btn" title="Facebook"><Icon name="facebook" size={16} /></a>
            <a className="social-btn" title="TikTok"><Icon name="tiktok" size={16} /></a>
            <a className="social-btn" title="YouTube"><Icon name="youtube" size={16} /></a>
            <a className="social-btn" title="X"><Icon name="twitter" size={16} /></a>
          </div>
        </div>
        <div>
          <h5>Situs Web Kami</h5>
          <ul>
            <li><a>Tentang Kami</a></li>
            <li><a>Disclaimer</a></li>
            <li><a>Kebijakan Privasi</a></li>
            <li><a>Syarat &amp; Ketentuan</a></li>
          </ul>
        </div>
        <div>
          <h5>Informasi</h5>
          <ul>
            <li><a onClick={() => setPage('berita')}>Berita</a></li>
            <li><a onClick={() => setPage('event')}>Event</a></li>
            <li><a>FAQ</a></li>
            <li><a>Sitemap</a></li>
          </ul>
        </div>
        <div>
          <h5>Layanan</h5>
          <ul>
            <li><a onClick={() => setPage('kontak')}>TIC Pekalongan</a></li>
            <li><a onClick={() => setPage('rencana')}>Rencana Perjalanan</a></li>
            <li><a>Pengaduan Wisatawan</a></li>
            <li><a>Kontak Darurat</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 Plesir Pekalongan — Dinas Kebudayaan, Pariwisata, Pemuda dan Olahraga Kota Pekalongan.</div>
        <div>Made with ☕ in Kota Batik Dunia</div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Icon, Logo, Navbar, Footer });
