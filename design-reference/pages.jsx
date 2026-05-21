// Plesir Pekalongan — Destinasi, Event, Berita, Kontak pages

// ============ DESTINASI ============
const DestinasiPage = ({ setPage, subPath }) => {
  const { DESTINASI, CATEGORIES } = window.PP_DATA;
  const initCat = subPath || 'all';
  const [cat, setCat] = React.useState(initCat);
  const [q, setQ] = React.useState('');
  const filtered = DESTINASI.filter(d =>
    (cat === 'all' || d.kategori === cat) &&
    (q === '' || d.nama.toLowerCase().includes(q.toLowerCase()) || d.area.toLowerCase().includes(q.toLowerCase()))
  );
  const activeCat = CATEGORIES.find(c => c.id === cat);

  return (
    <>
      <div className="page-hero">
        <div className="shell">
          <div className="sec-eyebrow" style={{ color: 'rgba(255,255,255,.8)' }}>
            <span style={{ background: 'var(--sun)' }}></span>
            Destinasi
          </div>
          <h1 className="serif">{activeCat ? activeCat.label : 'Semua Destinasi'}</h1>
          <p>{activeCat ? activeCat.sub : 'Jelajahi seluruh kekayaan wisata Kota dan Kabupaten Pekalongan.'}</p>
        </div>
      </div>
      <div className="shell">
        <div className="dest-page" style={{ padding: '40px 0 100px' }}>
          <div className="dest-toolbar">
            <div className="search-input">
              <Icon name="search" size={16} />
              <input placeholder="Cari destinasi, area..." value={q} onChange={e => setQ(e.target.value)} />
            </div>
            <div className="cat-tabs">
              <button className={`cat-tab ${cat === 'all' ? 'active' : ''}`} onClick={() => setCat('all')}>Semua</button>
              {CATEGORIES.map(c => (
                <button key={c.id} className={`cat-tab ${cat === c.id ? 'active' : ''}`} onClick={() => setCat(c.id)}>
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
              Tidak ada destinasi yang sesuai.
            </div>
          ) : (
            <div className="dest-grid">
              {filtered.map(d => (
                <div key={d.id} className="dest-card" onClick={() => setPage('destinasi/' + d.slug)}>
                  <div className="dest-cover" style={{ backgroundImage: `url(${d.img})` }}>
                    <div className="dest-cat">{CATEGORIES.find(c => c.id === d.kategori)?.label}</div>
                    <div className="dest-area"><Icon name="location" size={12} /> {d.area}</div>
                  </div>
                  <div className="dest-body">
                    <h3>{d.nama}</h3>
                    <p>{d.desc}</p>
                    <div className="dest-meta">
                      <span><Icon name="clock" size={12} /> {d.jam}</span>
                      <span><Icon name="ticket" size={12} /> <b>{d.tiket}</b></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ============ EVENT ============
const STATUS_LABEL = { upcoming: 'Akan Datang', ongoing: 'Sedang Berlangsung', past: 'Telah Selesai' };

const EventCard = ({ e, setPage }) => (
  <div className="event-card" onClick={() => setPage('event/' + e.slug)}>
    <div className="event-cover" style={{ backgroundImage: `url(${e.img})` }}>
      <div className={`event-badge ${e.cat}`}>{e.cat.toUpperCase()}</div>
      <div className={`event-status status-${e.status}`}>{STATUS_LABEL[e.status]}</div>
      <div className="event-info">
        <h4>{e.title}</h4>
        <div className="event-meta">
          <span><Icon name="calendar" size={12} /> {e.date}</span>
          <span><Icon name="location" size={12} /> {e.lokasi.nama}</span>
        </div>
      </div>
    </div>
  </div>
);

const EventPage = ({ setPage }) => {
  const { EVENTS } = window.PP_DATA;
  const [tab, setTab] = React.useState('upcoming');
  const [pill, setPill] = React.useState('all');
  const [view, setView] = React.useState('list');
  const [year, setYear] = React.useState(2026);
  const [months, setMonths] = React.useState(new Set());
  const [q, setQ] = React.useState('');

  const cats = [
    { id: 'all', label: 'Semua', icon: '🎉' },
    { id: 'budaya', label: 'Budaya', icon: '🎭' },
    { id: 'kuliner', label: 'Kuliner', icon: '🍜' },
    { id: 'olahraga', label: 'Olahraga', icon: '🏃' },
    { id: 'seni', label: 'Seni', icon: '🎨' },
    { id: 'keagamaan', label: 'Keagamaan', icon: '🕌' },
  ];
  const monthNames = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];

  const filtered = EVENTS.filter(e =>
    (tab === 'upcoming' ? e.status !== 'past' : e.status === 'past') &&
    (pill === 'all' || e.cat === pill) &&
    (months.size === 0 || months.has(e.month)) &&
    (q === '' || e.title.toLowerCase().includes(q.toLowerCase()) || e.lokasi.nama.toLowerCase().includes(q.toLowerCase())) &&
    (new Date(e.dateStart).getFullYear() === year)
  );

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: `linear-gradient(135deg, rgba(10,77,104,.85), rgba(8,131,149,.85)), url(${'https://source.unsplash.com/1600x500/?indonesia,festival,parade'})`, backgroundSize: 'cover' }}>
        <div className="shell">
          <h1 className="serif">Event di Pekalongan</h1>
          <p>Kalender festival, ritual pesisir, dan kompetisi sepanjang tahun di Kota Batik Dunia.</p>
        </div>
      </div>
      <div className="shell">
        <div className="event-page">
          <aside className="event-sidebar">
            <div className="filter-box">
              <h4>Tipe Event</h4>
              <div className="filter-options">
                <label className="filter-opt"><input type="radio" checked={tab === 'upcoming'} onChange={() => setTab('upcoming')} /> Upcoming Event</label>
                <label className="filter-opt"><input type="radio" checked={tab === 'past'} onChange={() => setTab('past')} /> Past Event</label>
              </div>
            </div>
            <div className="filter-box">
              <h4>Tahun</h4>
              <div className="filter-options">
                <label className="filter-opt"><input type="radio" checked={year === 2025} onChange={() => setYear(2025)} /> 2025</label>
                <label className="filter-opt"><input type="radio" checked={year === 2026} onChange={() => setYear(2026)} /> 2026</label>
              </div>
            </div>
            <div className="filter-box">
              <h4>Bulan</h4>
              <div className="filter-options" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {monthNames.map((m, i) => (
                  <label key={m} className="filter-opt" style={{ fontSize: 13 }}>
                    <input type="checkbox" checked={months.has(i+1)} onChange={() => {
                      const n = new Set(months);
                      n.has(i+1) ? n.delete(i+1) : n.add(i+1);
                      setMonths(n);
                    }} /> {m}
                  </label>
                ))}
              </div>
            </div>
            {(months.size > 0 || pill !== 'all' || q) && (
              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setMonths(new Set()); setPill('all'); setQ(''); }}>
                Reset Filter
              </button>
            )}
          </aside>
          <div className="event-main">
            <div className="sec-eyebrow">Event Recommendations</div>
            <h2 className="sec-title" style={{ marginBottom: 24 }}>{tab === 'upcoming' ? 'Discover Upcoming Events' : 'Galeri Event Lampau'}</h2>
            <div className="event-controls">
              <div className="search-input">
                <Icon name="search" size={16} />
                <input placeholder="Cari nama event atau lokasi..." value={q} onChange={e => setQ(e.target.value)} />
              </div>
              <div className="view-toggle">
                <button className={`toggle-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>
                  <Icon name="grid" size={14} /> List View
                </button>
                <button className={`toggle-btn ${view === 'cal' ? 'active' : ''}`} onClick={() => setView('cal')}>
                  <Icon name="calendar" size={14} /> Calendar View
                </button>
              </div>
            </div>
            <div className="cat-pills">
              {cats.map(c => (
                <button key={c.id} className={`cat-pill ${pill === c.id ? 'active' : ''}`} onClick={() => setPill(c.id)}>
                  <span>{c.icon}</span> {c.label}
                </button>
              ))}
            </div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                Tidak ada event yang sesuai filter.
              </div>
            ) : view === 'list' ? (
              <div className="event-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {filtered.map(e => <EventCard key={e.id} e={e} setPage={setPage} />)}
              </div>
            ) : (
              <CalendarView events={filtered} setPage={setPage} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const CalendarView = ({ events, setPage }) => {
  const monthNames = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const byMonth = {};
  events.forEach(e => { (byMonth[e.month] = byMonth[e.month] || []).push(e); });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {Object.keys(byMonth).sort((a, b) => a - b).map(m => (
        <div key={m} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: 16, fontSize: 22 }}>{monthNames[m-1]} 2026</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {byMonth[m].map(e => (
              <div key={e.id} onClick={() => setPage('event/' + e.slug)} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--line)', cursor: 'pointer' }}>
                <div style={{ fontFamily: 'Playfair Display', fontSize: 32, color: 'var(--sun)', fontWeight: 600, lineHeight: 1 }}>{e.date.split(' ')[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>{e.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}><Icon name="location" size={12} /> {e.lokasi.nama}</div>
                </div>
                <div className={`event-badge ${e.cat}`} style={{ position: 'static' }}>{e.cat.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ============ EVENT DETAIL ============
const EventDetail = ({ slug, setPage }) => {
  const { EVENTS } = window.PP_DATA;
  const e = EVENTS.find(x => x.slug === slug);
  const [tab, setTab] = React.useState('tentang');
  const [lightbox, setLightbox] = React.useState(null);
  const [shared, setShared] = React.useState(false);
  const [addedToTrip, setAddedToTrip] = React.useState(false);

  if (!e) {
    return (
      <div className="shell" style={{ padding: '160px 0 100px', textAlign: 'center' }}>
        <h2 className="serif" style={{ fontSize: 32, color: 'var(--primary)' }}>Event tidak ditemukan</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: 12 }}>Mungkin event ini sudah berakhir atau di-arsipkan.</p>
        <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => setPage('event')}>
          <Icon name="arrowL" size={14} /> Kembali ke Daftar Event
        </button>
      </div>
    );
  }

  const related = EVENTS.filter(x => x.cat === e.cat && x.id !== e.id).slice(0, 4);
  const shareUrl = `https://plesirpekalongan.id/event/${e.slug}`;
  const handleShare = (platform) => {
    if (platform === 'copy') {
      navigator.clipboard?.writeText(shareUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };
  const handleAddToTrip = () => { setAddedToTrip(true); setTimeout(() => setAddedToTrip(false), 3000); };

  const sections = [
    { id: 'tentang', label: 'Tentang' },
    e.jadwal?.length && { id: 'jadwal', label: 'Jadwal' },
    e.tiket?.length && { id: 'tiket', label: 'Tiket' },
    { id: 'lokasi', label: 'Lokasi' },
    e.galeri?.length && { id: 'galeri', label: 'Galeri' },
    e.tips?.length && { id: 'tips', label: 'Tips' },
  ].filter(Boolean);

  return (
    <div className="event-detail">
      {/* HERO */}
      <div className="ed-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(10,77,104,.2) 0%, rgba(4,28,38,.85) 100%), url(${e.img})` }}>
        <div className="shell ed-hero-inner">
          <button className="btn btn-light" style={{ width: 'fit-content', marginBottom: 24 }} onClick={() => setPage('event')}>
            <Icon name="arrowL" size={14} /> Semua Event
          </button>
          <div className="ed-badges">
            <span className={`event-badge ${e.cat}`} style={{ position: 'static' }}>{e.cat.toUpperCase()}</span>
            <span className={`event-status status-${e.status}`} style={{ position: 'static' }}>{STATUS_LABEL[e.status]}</span>
          </div>
          <h1 className="serif">{e.title}</h1>
          <p>{e.desc}</p>
          <div className="ed-quickbar">
            <div className="ed-qb-item">
              <Icon name="calendar" size={20} />
              <div><small>Tanggal</small><b>{e.date}</b></div>
            </div>
            <div className="ed-qb-item">
              <Icon name="location" size={20} />
              <div><small>Lokasi</small><b>{e.lokasi.nama}</b></div>
            </div>
            <div className="ed-qb-item">
              <Icon name="ticket" size={20} />
              <div><small>Tiket</small><b>{e.tiket[0]?.harga || 'Gratis'}</b></div>
            </div>
            <div className="ed-qb-item">
              <Icon name="clock" size={20} />
              <div><small>Durasi</small><b>{e.jadwal?.length || 1} hari</b></div>
            </div>
          </div>
          <div className="ed-cta">
            <button className="btn btn-sun" disabled={e.status === 'past'}>
              <Icon name="ticket" size={16} />
              {e.status === 'past' ? 'Sudah Selesai' : (e.tiket[0]?.harga === 'Gratis' || e.tiket[0]?.harga === 'Rp 0' ? 'Daftar Sekarang' : 'Beli Tiket')}
            </button>
            <button className="btn" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1px solid rgba(255,255,255,.3)' }}>
              <Icon name="calendar" size={16} /> Tambah ke Kalender
            </button>
            <button className="btn" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1px solid rgba(255,255,255,.3)' }} onClick={handleAddToTrip}>
              {addedToTrip ? <><Icon name="check" size={16} /> Ditambahkan!</> : <><Icon name="plus" size={16} /> Tambah ke Rencana</>}
            </button>
          </div>
        </div>
      </div>

      {/* TAB NAV */}
      <div className="ed-tabnav">
        <div className="shell" style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
          {sections.map(s => (
            <a key={s.id} className={`ed-tab ${tab === s.id ? 'active' : ''}`} href={`#${s.id}`} onClick={() => setTab(s.id)}>
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="shell">
        <div className="ed-body">
          <main className="ed-content">
            <section id="tentang" className="ed-section">
              <h2 className="serif">Tentang Event</h2>
              {e.descLong?.map((p, i) => <p key={i}>{p}</p>) || <p>{e.desc}</p>}
            </section>

            {e.jadwal?.length > 0 && (
              <section id="jadwal" className="ed-section">
                <h2 className="serif">Jadwal Acara</h2>
                <div className="timeline">
                  {e.jadwal.map(d => (
                    <div key={d.hari} className="timeline-day">
                      <div className="timeline-day-marker">
                        <span>Hari</span>
                        <b>{d.hari}</b>
                      </div>
                      <div className="timeline-day-body">
                        <div className="timeline-day-date">{d.tanggal}</div>
                        <div className="timeline-events">
                          {d.acara.map(([t, a], i) => (
                            <div key={i} className="timeline-event">
                              <div className="timeline-time">{t}</div>
                              <div className="timeline-content">
                                <div className="timeline-dot"></div>
                                <span>{a}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {e.tiket?.length > 0 && (
              <section id="tiket" className="ed-section">
                <h2 className="serif">Informasi Tiket</h2>
                <div className="ticket-grid">
                  {e.tiket.map((t, i) => (
                    <div key={i} className={`ticket-card ${!t.tersedia ? 'sold' : ''} ${i === 0 ? 'featured' : ''}`}>
                      {i === 0 && t.tersedia && <div className="ticket-tag">Populer</div>}
                      <div className="ticket-name">{t.kat}</div>
                      <div className="ticket-price">{t.harga}</div>
                      <div className="ticket-desc">{t.fasilitas}</div>
                      <button className={`btn ${t.tersedia ? 'btn-primary' : ''}`} style={!t.tersedia ? { background: '#E5E7EB', color: 'var(--text-muted)', cursor: 'not-allowed' } : {}} disabled={!t.tersedia}>
                        {t.tersedia ? 'Pesan Sekarang' : 'Habis'}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section id="lokasi" className="ed-section">
              <h2 className="serif">Lokasi Event</h2>
              <div className="location-card">
                <div className="location-map" style={{ backgroundImage: `linear-gradient(135deg, rgba(10,77,104,.4), rgba(8,131,149,.4)), url(https://source.unsplash.com/800x400/?map,city,asia)` }}>
                  <div className="location-pin">
                    <div className="location-pin-dot"></div>
                    <div className="location-pin-pulse"></div>
                  </div>
                </div>
                <div className="location-info">
                  <h4>{e.lokasi.nama}</h4>
                  <p><Icon name="location" size={14} /> {e.lokasi.alamat}</p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                    <a className="btn btn-primary" target="_blank" rel="noopener" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.lokasi.nama + ' Pekalongan')}`}>
                      <Icon name="location" size={14} /> Petunjuk Arah
                    </a>
                    <button className="btn btn-ghost">
                      <Icon name="phone" size={14} /> Info Transportasi
                    </button>
                  </div>
                  <div className="location-transit">
                    <div><b>🚉 Stasiun terdekat:</b> Stasiun Pekalongan (~2 km)</div>
                    <div><b>🚌 Terminal:</b> Terminal Bus Pekalongan (~3 km)</div>
                    <div><b>✈️ Bandara:</b> Bandara A. Yani Semarang (~95 km)</div>
                  </div>
                </div>
              </div>
            </section>

            {e.galeri?.length > 0 && (
              <section id="galeri" className="ed-section">
                <h2 className="serif">Galeri{e.status === 'past' ? ' Edisi Sebelumnya' : ''}</h2>
                <div className="gallery-grid">
                  {e.galeri.map((g, i) => (
                    <div key={i} className="gallery-item" style={{ backgroundImage: `url(${g})` }} onClick={() => setLightbox(g)}>
                      <div className="gallery-overlay"><Icon name="plus" size={28} /></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {e.tips?.length > 0 && (
              <section id="tips" className="ed-section">
                <h2 className="serif">Tips Pengunjung</h2>
                <div className="tips-grid">
                  {e.tips.map((t, i) => (
                    <div key={i} className="tip-card">
                      <div className="tip-icon">💡</div>
                      <p>{t}</p>
                    </div>
                  ))}
                </div>
                <div className="access-bar">
                  <span><Icon name="check" size={14} /> Parkir luas</span>
                  <span><Icon name="check" size={14} /> Toilet umum</span>
                  <span><Icon name="check" size={14} /> Akses kursi roda</span>
                  <span><Icon name="check" size={14} /> Mushola</span>
                  <span><Icon name="check" size={14} /> Ramah anak</span>
                </div>
              </section>
            )}

            <section className="ed-section organizer">
              <h2 className="serif">Penyelenggara</h2>
              <div className="organizer-card">
                <div className="organizer-logo">
                  <Logo />
                </div>
                <div>
                  <h4>{e.penyelenggara.nama}</h4>
                  <div className="organizer-contact">
                    <span><Icon name="phone" size={14} /> {e.penyelenggara.kontak}</span>
                    <span><Icon name="instagram" size={14} /> {e.penyelenggara.ig}</span>
                    <span><Icon name="mail" size={14} /> event@plesirpekalongan.id</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="ed-section">
              <h2 className="serif">Bagikan Event Ini</h2>
              <div className="share-row">
                <button className="share-btn whatsapp" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(e.title + ' — ' + shareUrl)}`)}>
                  <span>💬</span> WhatsApp
                </button>
                <button className="share-btn facebook" onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)}>
                  <Icon name="facebook" size={16} /> Facebook
                </button>
                <button className="share-btn twitter" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(e.title)}&url=${encodeURIComponent(shareUrl)}`)}>
                  <Icon name="twitter" size={16} /> X / Twitter
                </button>
                <button className="share-btn" onClick={() => handleShare('copy')}>
                  {shared ? <><Icon name="check" size={16} /> Tersalin!</> : <><Icon name="share" size={16} /> Copy Link</>}
                </button>
              </div>
            </section>
          </main>

          <aside className="ed-side">
            <div className="ed-side-card">
              <h4>Quick Info</h4>
              <div className="ed-side-row"><span>Kategori</span><b>{e.cat}</b></div>
              <div className="ed-side-row"><span>Status</span><b className={`status-${e.status}`} style={{ color: e.status === 'upcoming' ? 'var(--secondary)' : e.status === 'past' ? 'var(--text-muted)' : 'var(--sun)' }}>{STATUS_LABEL[e.status]}</b></div>
              <div className="ed-side-row"><span>Mulai</span><b>{new Date(e.dateStart).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</b></div>
              <div className="ed-side-row"><span>Selesai</span><b>{new Date(e.dateEnd).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</b></div>
              <div className="ed-side-row"><span>Tiket</span><b>{e.tiket[0]?.harga || 'Gratis'}</b></div>
            </div>
            {e.tags?.length > 0 && (
              <div className="ed-side-card">
                <h4>Tags</h4>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {e.tags.map(t => <span key={t} className="ed-tag">#{t}</span>)}
                </div>
              </div>
            )}
            <div className="ed-side-card qr-card">
              <h4>Akses Cepat</h4>
              <div className="qr-mock">
                <svg viewBox="0 0 100 100" width="120" height="120">
                  <rect width="100" height="100" fill="#fff"/>
                  {Array.from({ length: 64 }).map((_, i) => {
                    const x = (i % 8) * 10 + 10;
                    const y = Math.floor(i / 8) * 10 + 10;
                    return (e.id.charCodeAt(0) * i) % 3 !== 0 ? <rect key={i} x={x} y={y} width="8" height="8" fill="#0A4D68"/> : null;
                  })}
                  <rect x={10} y={10} width="20" height="20" fill="none" stroke="#0A4D68" strokeWidth="2"/>
                  <rect x={70} y={10} width="20" height="20" fill="none" stroke="#0A4D68" strokeWidth="2"/>
                  <rect x={10} y={70} width="20" height="20" fill="none" stroke="#0A4D68" strokeWidth="2"/>
                </svg>
              </div>
              <p style={{ fontSize: 11, textAlign: 'center', color: 'var(--text-muted)', margin: '8px 0 0' }}>Scan untuk akses cepat</p>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="ed-section related">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
              <div>
                <div className="sec-eyebrow">Lainnya untukmu</div>
                <h2 className="serif" style={{ color: 'var(--primary)', fontSize: 32 }}>Event Terkait</h2>
              </div>
              <button className="btn btn-ghost" onClick={() => setPage('event')}>
                Lihat Semua <Icon name="arrowR" size={14} />
              </button>
            </div>
            <div className="event-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {related.map(r => <EventCard key={r.id} e={r} setPage={setPage} />)}
            </div>
          </section>
        )}
      </div>

      <button className="fab-trip" onClick={handleAddToTrip}>
        {addedToTrip ? <Icon name="check" size={20} /> : <Icon name="plus" size={20} />}
        <span>{addedToTrip ? 'Ditambahkan' : 'Rencana'}</span>
      </button>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}><Icon name="x" size={24} /></button>
          <img src={lightbox} alt="" />
        </div>
      )}
    </div>
  );
};

// ============ BERITA ============
const BeritaPage = ({ setPage }) => {
  const { BERITA } = window.PP_DATA;
  const [cat, setCat] = React.useState('Semua');
  const [q, setQ] = React.useState('');
  const cats = ['Semua', 'Pariwisata', 'Budaya', 'Kuliner', 'Event', 'UMKM', 'Heritage', 'Tips Wisata'];
  const filtered = BERITA.filter(b =>
    (cat === 'Semua' || b.kategori === cat) &&
    (q === '' || b.title.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <div className="page-hero">
        <div className="shell">
          <h1 className="serif">Berita & Artikel</h1>
          <p>Cerita pesisir, ulasan budaya, dan kabar terkini dari Kota Batik Dunia.</p>
        </div>
      </div>
      <div className="shell" style={{ padding: '40px 0 100px' }}>
        <div className="dest-toolbar">
          <div className="search-input">
            <Icon name="search" size={16} />
            <input placeholder="Cari artikel..." value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <select className="cat-tab" style={{ paddingRight: 32 }}>
            <option>Terbaru</option>
            <option>Terpopuler</option>
            <option>Pilihan Editor</option>
          </select>
        </div>
        <div className="cat-pills" style={{ marginBottom: 32 }}>
          {cats.map(c => (
            <button key={c} className={`cat-pill ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="berita-grid">
          {filtered.map(b => (
            <div key={b.id} className="berita-card" style={{ backgroundImage: `url(${b.img})` }} onClick={() => setPage('berita/' + b.slug)}>
              <div className="event-badge budaya" style={{ background: '#fff', color: 'var(--primary)' }}>{b.kategori}</div>
              <div className="berita-card-body">
                <h3>{b.title}</h3>
                <div className="berita-meta">
                  <span><Icon name="calendar" size={12} /> {b.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button className="page-num active">1</button>
          <button className="page-num">2</button>
          <button className="page-num">3</button>
          <button className="page-num">…</button>
          <button className="page-num">41</button>
          <button className="page-num">42</button>
          <button className="page-num">43</button>
        </div>
      </div>
    </>
  );
};

// ============ KONTAK ============
const KontakPage = () => {
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <>
      <div className="page-hero">
        <div className="shell">
          <h1 className="serif">Hubungi Kami</h1>
          <p>Kami siap membantu rencana perjalananmu di Pekalongan.</p>
        </div>
      </div>
      <div className="shell">
        <div className="kontak-page">
          <div className="kontak-grid">
            <div>
              <div className="kontak-info-card">
                <h3>TIC Kota Pekalongan</h3>
                <div className="row"><Icon name="location" size={18} className="ic" /><div><b>Alamat</b>Jl. Mataram No. 1, Pekalongan, Jawa Tengah 51111</div></div>
                <div className="row"><Icon name="phone" size={18} className="ic" /><div><b>Telepon</b>(0285) 421-200</div></div>
                <div className="row"><Icon name="mail" size={18} className="ic" /><div><b>Email</b>info@plesirpekalongan.id</div></div>
                <div className="row"><Icon name="clock" size={18} className="ic" /><div><b>Jam Buka</b>Senin–Jumat 08.00–16.00 WIB<br/>Sabtu 08.00–12.00 WIB</div></div>
              </div>
              <div className="kontak-info-card">
                <h3>Kontak Darurat Wisatawan</h3>
                <div className="row"><Icon name="phone" size={18} className="ic" /><div><b>Polisi Pariwisata</b>(0285) 432-110</div></div>
                <div className="row"><Icon name="phone" size={18} className="ic" /><div><b>RSUD Bendan</b>(0285) 421-621</div></div>
                <div className="row"><Icon name="phone" size={18} className="ic" /><div><b>Call Center Wisata</b>110 / 112</div></div>
              </div>
              <div className="kontak-info-card">
                <h3>Sosial Media</h3>
                <div className="social-row" style={{ marginTop: 8 }}>
                  <a className="social-btn" style={{ background: 'var(--primary)', color: '#fff' }}><Icon name="instagram" size={18} /></a>
                  <a className="social-btn" style={{ background: 'var(--primary)', color: '#fff' }}><Icon name="facebook" size={18} /></a>
                  <a className="social-btn" style={{ background: 'var(--primary)', color: '#fff' }}><Icon name="tiktok" size={18} /></a>
                  <a className="social-btn" style={{ background: 'var(--primary)', color: '#fff' }}><Icon name="youtube" size={18} /></a>
                  <a className="social-btn" style={{ background: 'var(--primary)', color: '#fff' }}><Icon name="twitter" size={18} /></a>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 12 }}>@plesirpekalongan di semua platform</div>
              </div>
            </div>
            <div>
              <div className="kontak-info-card">
                <h3>Kirim Pesan</h3>
                {submitted ? (
                  <div style={{ padding: '40px 0', textAlign: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 32, background: 'var(--secondary)', color: '#fff', display: 'inline-grid', placeItems: 'center', marginBottom: 16 }}>
                      <Icon name="check" size={32} />
                    </div>
                    <h3 style={{ color: 'var(--primary)', marginBottom: 8 }}>Pesan Terkirim!</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Kami akan menghubungi Anda dalam 1×24 jam.</p>
                    <button className="btn btn-ghost" style={{ marginTop: 16 }} onClick={() => setSubmitted(false)}>Kirim Pesan Lain</button>
                  </div>
                ) : (
                  <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                    <div className="form-group"><label>Nama Lengkap</label><input required placeholder="Nama Anda" /></div>
                    <div className="form-group"><label>Email</label><input type="email" required placeholder="email@contoh.com" /></div>
                    <div className="form-group"><label>Subjek</label>
                      <select><option>Informasi Wisata</option><option>Saran & Masukan</option><option>Kerjasama</option><option>Lainnya</option></select>
                    </div>
                    <div className="form-group"><label>Pesan</label><textarea required placeholder="Tuliskan pesan Anda..." /></div>
                    <button className="btn btn-primary" style={{ width: '100%' }} type="submit">Kirim Pesan</button>
                  </form>
                )}
              </div>
              <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--line)' }}>
                <div style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', position: 'relative', display: 'grid', placeItems: 'center', color: '#fff' }}>
                  <svg width="100%" height="100%" viewBox="0 0 800 450" style={{ position: 'absolute', inset: 0, opacity: .15 }}>
                    <defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0 L0 0 0 40" stroke="#fff" strokeWidth="0.5" fill="none"/></pattern></defs>
                    <rect width="800" height="450" fill="url(#g)"/>
                  </svg>
                  <div style={{ textAlign: 'center', zIndex: 2 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 28, background: 'var(--sun)', display: 'inline-grid', placeItems: 'center', marginBottom: 12, color: 'var(--dark)' }}>
                      <Icon name="location" size={28} />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>TIC Kota Pekalongan</div>
                    <div style={{ fontSize: 13, opacity: .85, marginTop: 4 }}>Jl. Mataram No. 1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { DestinasiPage, EventPage, EventDetail, BeritaPage, KontakPage });
