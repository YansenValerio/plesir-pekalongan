// Plesir Pekalongan — Home page sections

const Hero = ({ setPage, lang }) => {
  const chapters = [
    {
      kicker: 'Chapter 01',
      title: ['Pekalongan,', 'Menanti'],
      sub: 'Pesona kota pesisir Jawa — perpaduan batik, ombak, dan rempah yang tak tertandingi.',
      spot: 'Pantai Pasir Kencana',
      area: 'Pekalongan Utara',
      video: 'assets/hero-placeholder.mp4',
      bg: 'beach,sunset,indonesia,jetty',
      tint: 'rgba(10,77,104,0.55)',
    },
    {
      kicker: 'Chapter 02',
      title: ['Warisan', 'Batik Dunia'],
      sub: 'Telusuri kampung-kampung batik yang diakui UNESCO — setiap motif menyimpan cerita pesisir.',
      spot: 'Kampung Batik Kauman',
      area: 'Pekalongan Timur',
      video: 'assets/hero-placeholder.mp4',
      bg: 'batik,colorful,javanese,pattern',
      tint: 'rgba(199,62,58,0.45)',
    },
    {
      kicker: 'Chapter 03',
      title: ['Petualangan', 'Petungkriyono'],
      sub: 'Hutan hujan, air terjun 75 meter, dan habitat owa Jawa yang langka.',
      spot: 'Curug Bajing',
      area: 'Kab. Pekalongan',
      video: 'assets/hero-placeholder.mp4',
      bg: 'waterfall,jungle,tropical,green',
      tint: 'rgba(45,134,89,0.5)',
    },
    {
      kicker: 'Chapter 04',
      title: ['Pesta', 'Pesisir'],
      sub: 'Syawalan, Sintren, dan Pekan Batik Nusantara — kalender festival sepanjang tahun.',
      spot: 'Pekan Batik Nusantara',
      area: 'Lapangan Jetayu',
      video: 'assets/hero-placeholder.mp4',
      bg: 'festival,parade,asia,carnival',
      tint: 'rgba(242,169,59,0.45)',
    },
  ];
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const tickRef = React.useRef(null);
  const DURATION = 8000;

  // Autoplay tick
  React.useEffect(() => {
    if (paused) return;
    setProgress(0);
    const start = Date.now();
    tickRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / DURATION, 1);
      setProgress(p * 100);
      if (p >= 1) setI(v => (v + 1) % chapters.length);
    }, 60);
    return () => clearInterval(tickRef.current);
  }, [i, paused]);

  const go = (k) => { setI(((k % chapters.length) + chapters.length) % chapters.length); };
  const next = chapters[(i + 1) % chapters.length];
  const c = chapters[i];

  return (
    <section className="cine-hero" data-screen-label="01 Hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* MEDIA LAYER */}
      {chapters.map((ch, k) => (
        <div key={k} className={`cine-media ${k === i ? 'on' : ''}`} aria-hidden={k !== i}>
          <div className="cine-media-bg" style={{ backgroundImage: `url(https://source.unsplash.com/1920x1080/?${encodeURIComponent(ch.bg)})` }} />
          {k === i && (
            <video
              key={`v-${k}`}
              className="cine-video"
              autoPlay
              muted
              loop
              playsInline
              src={ch.video}
            />
          )}
          <div className="cine-tint" style={{ background: `linear-gradient(180deg, rgba(0,0,0,.2) 0%, ${ch.tint} 50%, rgba(4,28,38,.85) 100%)` }} />
        </div>
      ))}

      {/* GRAIN OVERLAY */}
      <div className="cine-grain"></div>

      {/* TOP-RIGHT controls */}
      <div className="cine-controls">
        <button className="cine-btn" onClick={() => setPaused(p => !p)} aria-label={paused ? 'Play' : 'Pause'}>
          {paused ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          ) : (
            <svg width="12" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          )}
        </button>
        <button className="cine-btn" aria-label="Mute">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10v4a1 1 0 0 0 1 1h3l5 4V5L7 9H4a1 1 0 0 0-1 1Z"/><line x1="16" y1="9" x2="22" y2="15"/><line x1="22" y1="9" x2="16" y2="15"/></svg>
        </button>
      </div>

      {/* SIDE marquee */}
      <div className="cine-side-tape">
        <span>EXPLORE · BATIK · PESISIR · PETUNGKRIYONO · KAULMAN · MEGONO · TAUTO · SINTREN · </span>
      </div>

      {/* MAIN CONTENT */}
      <div className="cine-content">
        <div className="shell cine-shell">
          <div key={`txt-${i}`} className="cine-text fade-up">
            <div className="cine-kicker">
              <span className="cine-kicker-dot"></span>
              <span>{c.kicker}</span>
              <span className="cine-kicker-sep"></span>
              <span>Plesir Pekalongan</span>
            </div>
            <h1 className="cine-title serif">
              <span className="cine-line">{c.title[0]}</span>
              <span className="cine-line cine-line-italic">{c.title[1]}</span>
            </h1>
            <p className="cine-sub">{c.sub}</p>
            <div className="cine-cta">
              <button className="btn btn-light" onClick={() => setPage('destinasi')}>
                Mulai Jelajahi <Icon name="arrowR" size={14} />
              </button>
              <button className="cine-watch" onClick={() => setPage('rencana')}>
                <span className="cine-watch-circle">
                  <Icon name="sparkle" size={16} />
                </span>
                Rencana AI
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="cine-bottom">
        <div className="shell cine-bottom-shell">
          {/* Left: counter + location */}
          <div className="cine-meta">
            <div className="cine-counter">
              <span className="cine-counter-now">0{i + 1}</span>
              <span className="cine-counter-sep">/</span>
              <span className="cine-counter-total">0{chapters.length}</span>
            </div>
            <div className="cine-location">
              <div className="cine-now-playing">
                <span className="cine-pulse"></span>
                NOW PLAYING
              </div>
              <div className="cine-spot serif">{c.spot}</div>
              <div className="cine-area">
                <Icon name="location" size={12} /> {c.area}
              </div>
            </div>
          </div>

          {/* Center: progress */}
          <div className="cine-progress">
            <div className="cine-progress-bar">
              <div className="cine-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="cine-dots">
              {chapters.map((_, k) => (
                <button key={k} className={`cine-dot ${k === i ? 'active' : ''}`} onClick={() => go(k)} aria-label={`Chapter ${k + 1}`} />
              ))}
            </div>
          </div>

          {/* Right: next preview */}
          <div className="cine-next-block">
            <button className="cine-nav" onClick={() => go(i - 1)} aria-label="Previous">
              <Icon name="arrowL" size={16} />
            </button>
            <div className="cine-up-next" onClick={() => go(i + 1)}>
              <div className="cine-up-thumb" style={{ backgroundImage: `url(https://source.unsplash.com/240x160/?${encodeURIComponent(next.bg)})` }}>
                <div className="cine-up-tag">UP NEXT</div>
              </div>
              <div className="cine-up-info">
                <small>{next.kicker}</small>
                <b>{next.spot}</b>
              </div>
            </div>
            <button className="cine-nav cine-nav-primary" onClick={() => go(i + 1)} aria-label="Next">
              <Icon name="arrowR" size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const DiscoverMap = ({ setPage }) => {
  const [hover, setHover] = React.useState(null);
  const { REGIONS, DESTINASI } = window.PP_DATA;
  const symbolFor = {
    wave: <path d="M2 14c3 0 3-3 6-3s3 3 6 3 3-3 6-3 3 3 6 3M2 18c3 0 3-3 6-3s3 3 6 3 3-3 6-3 3 3 6 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>,
    mosque: <g fill="currentColor"><path d="M12 3c-1 2-3 3-3 5s1 2 3 2 3 0 3-2-2-3-3-5Z"/><rect x="5" y="11" width="14" height="10" rx="1"/><rect x="11" y="13" width="2" height="3"/></g>,
    batik: <g fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><path d="M5 12c0-4 3-7 7-7M19 12c0 4-3 7-7 7"/></g>,
    rice: <g fill="currentColor"><path d="M12 3v9M9 7l3-2 3 2M6 11l6-2 6 2M5 14l7-2 7 2M19 17H5l1 4h12l1-4Z"/></g>,
  };

  return (
    <section className="discover" data-screen-label="02 Discover Map">
      <div className="shell">
        <div className="sec-eyebrow">Temukan Pesona Pekalongan</div>
        <h2 className="sec-title">Empat Wilayah, Empat Karakter</h2>
        <p className="sec-sub">Dari pesisir nelayan di utara, kampung batik bersejarah di timur, heritage kolonial di barat, hingga pemukiman santri di selatan kota.</p>

        <div className="atlas-wrap">
          <div className="atlas-frame">
            {/* Map canvas — sits in the purple inner area of the frame image */}
            <div className="atlas-canvas">
              <img src="assets/peta-pekalongan.svg" alt="Peta Kota Pekalongan" className="atlas-map-img" />

              {/* Region pins */}
              {REGIONS.map(r => {
                const count = DESTINASI.filter(d => {
                  const tail = r.label.split(' ').pop().toLowerCase();
                  return d.area.toLowerCase().includes(tail);
                }).length;
                return (
                  <button
                    key={r.id}
                    className={`atlas-pin ${hover === r.id ? 'active' : ''}`}
                    style={{ left: `${r.x}%`, top: `${r.y}%` }}
                    onMouseEnter={() => setHover(r.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setPage('destinasi')}
                  >
                    <div className="atlas-pin-disk">
                      <svg width="18" height="18" viewBox="0 0 24 24" className="atlas-pin-sym">{symbolFor[r.symbol]}</svg>
                    </div>
                    <div className="atlas-pin-label">
                      <b>{r.label}</b>
                      <small>{count || 6}+ tempat</small>
                    </div>
                  </button>
                );
              })}

              {/* Floating info popover */}
              {hover && (
                <div className="atlas-info">
                  <div className="atlas-info-header">
                    <span className="atlas-info-element">{REGIONS.find(r => r.id === hover).element}</span>
                    <b className="serif">{REGIONS.find(r => r.id === hover).label}</b>
                  </div>
                  <p>{REGIONS.find(r => r.id === hover).desc}</p>
                  <span className="atlas-info-cta">Jelajahi destinasi →</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Spotlight = ({ setPage }) => {
  const { SPOTLIGHTS } = window.PP_DATA;
  const railRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);

  const updateProgress = () => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? (el.scrollLeft / max) * 100 : 0);
  };
  const scroll = (d) => railRef.current?.scrollBy({ left: d, behavior: 'smooth' });

  return (
    <section className="spotlight">
      <div className="shell" style={{ position: 'relative' }}>
        <div className="spotlight-grid">
          <div>
            <div className="sec-eyebrow">Spotlight</div>
            <h2 className="sec-title">Ciri Khas Pekalongan</h2>
            <p className="sec-sub">Temukan keunikan budaya pesisir melalui batik, kuliner, dan tradisi yang masih hidup turun-temurun.</p>
            <button className="btn btn-sun" onClick={() => setPage('destinasi')}>
              Temukan Ciri Khas <Icon name="arrowR" size={16} />
            </button>
            <div className="spot-rail-controls">
              <div className="spot-progress"><div className="spot-progress-bar" style={{ width: `${progress}%` }}></div></div>
              <button className="rail-btn" onClick={() => scroll(-340)}><Icon name="arrowL" size={16} /></button>
              <button className="rail-btn" onClick={() => scroll(340)}><Icon name="arrowR" size={16} /></button>
            </div>
          </div>
          <div className="spot-rail" ref={railRef} onScroll={updateProgress}>
            {SPOTLIGHTS.map(s => (
              <div key={s.id} className="spot-card" style={{ backgroundImage: `url(${s.img})` }}>
                <div className="spot-card-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const HalalBanner = ({ setPage }) => (
  <section className="halal-banner" style={{ padding: 0 }}>
    <div className="halal-inner" style={{ maxWidth: 'var(--shell-w)', margin: '0 auto' }}>
      <div className="halal-text">
        <div className="sec-eyebrow" style={{ color: 'var(--sun)' }}>
          <span style={{ background: 'var(--sun)' }}></span>
          Wisata Ramah Muslim
        </div>
        <h2 className="serif">Jelajahi panduan lengkap wisata halal & destinasi religi di Pekalongan</h2>
        <p>Sebagai kota santri, Pekalongan menyajikan masjid bersejarah, makam keramat, kuliner halal terverifikasi, dan akomodasi ramah keluarga muslim.</p>
        <button className="btn btn-sun" onClick={() => setPage('destinasi/religi')}>
          Klik di sini <Icon name="arrowR" size={16} />
        </button>
      </div>
      <div className="halal-image" style={{ backgroundImage: `url(https://source.unsplash.com/800x600/?mosque,indonesia,family)` }} />
    </div>
  </section>
);

const Events = ({ setPage }) => {
  const { EVENTS } = window.PP_DATA;
  const featured = EVENTS.slice(0, 3);
  return (
    <section className="events">
      <div className="shell">
        <div className="events-head">
          <div>
            <div className="sec-eyebrow">Event Recommendations</div>
            <h2 className="sec-title">Acara yang Tidak Boleh Terlewatkan</h2>
          </div>
          <button className="btn btn-ghost" onClick={() => setPage('event')}>
            Jelajahi Semua Event <Icon name="arrowR" size={14} />
          </button>
        </div>
        <div className="event-grid">
          {featured.map(e => (
            <div key={e.id} className="event-card" onClick={() => setPage('event/' + e.slug)}>
              <div className="event-cover" style={{ backgroundImage: `url(${e.img})` }}>
                <div className={`event-badge ${e.cat}`}>{e.cat.toUpperCase()}</div>
                <div className="event-info">
                  <h4>{e.title}</h4>
                  <div className="event-meta">
                    <span><Icon name="calendar" size={12} /> {e.date}</span>
                    <span><Icon name="location" size={12} /> {e.lokasi.nama}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = ({ setPage, lang }) => (
  <>
    <Hero setPage={setPage} lang={lang} />
    <DiscoverMap setPage={setPage} />
    <Spotlight setPage={setPage} />
    <HalalBanner setPage={setPage} />
    <Events setPage={setPage} />
  </>
);

Object.assign(window, { Home });
