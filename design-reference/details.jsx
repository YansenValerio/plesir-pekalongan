// Plesir Pekalongan — Destination Detail & News Detail pages

// ============ DESTINATION DETAIL ============
const DestinasiDetail = ({ slug, setPage }) => {
  const { DESTINASI, CATEGORIES } = window.PP_DATA;
  const d = DESTINASI.find(x => x.slug === slug || x.id === slug);
  const [lightbox, setLightbox] = React.useState(null);
  const [saved, setSaved] = React.useState(false);
  const [addedTrip, setAddedTrip] = React.useState(false);

  if (!d) {
    return (
      <div className="shell" style={{ padding: '160px 0 100px', textAlign: 'center' }}>
        <h2 className="serif" style={{ fontSize: 32, color: 'var(--primary)' }}>Destinasi tidak ditemukan</h2>
        <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => setPage('destinasi')}>
          <Icon name="arrowL" size={14} /> Kembali ke Destinasi
        </button>
      </div>
    );
  }

  const kategori = CATEGORIES.find(c => c.id === d.kategori);
  const related = DESTINASI.filter(x => x.kategori === d.kategori && x.id !== d.id).slice(0, 4);
  const shareUrl = `https://plesirpekalongan.id/destinasi/${d.slug}`;

  return (
    <div className="event-detail" data-screen-label={`destinasi-${d.slug}`}>
      {/* HERO */}
      <div className="ed-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(10,77,104,.15) 0%, rgba(4,28,38,.85) 100%), url(${d.img})` }}>
        <div className="shell ed-hero-inner">
          <button className="btn btn-light" style={{ width: 'fit-content', marginBottom: 24 }} onClick={() => setPage('destinasi')}>
            <Icon name="arrowL" size={14} /> Semua Destinasi
          </button>
          <div className="ed-badges">
            <span className={`event-badge ${d.kategori}`} style={{ position: 'static', background: 'rgba(255,255,255,.95)', color: 'var(--primary)' }}>{kategori?.icon} {kategori?.label}</span>
            <span className="event-status" style={{ position: 'static', background: 'rgba(242,169,59,.95)', color: 'var(--dark)' }}>
              ⭐ {d.rating}/5
            </span>
          </div>
          <h1 className="serif">{d.nama}</h1>
          <p>{d.desc}</p>
          <div className="ed-quickbar">
            <div className="ed-qb-item">
              <Icon name="location" size={20} />
              <div><small>Area</small><b>{d.area}</b></div>
            </div>
            <div className="ed-qb-item">
              <Icon name="clock" size={20} />
              <div><small>Jam Buka</small><b>{d.jam}</b></div>
            </div>
            <div className="ed-qb-item">
              <Icon name="ticket" size={20} />
              <div><small>Tiket</small><b>{d.tiket}</b></div>
            </div>
            <div className="ed-qb-item">
              <Icon name="user" size={20} />
              <div><small>Ulasan</small><b>{d.review_count.toLocaleString('id-ID')}+ orang</b></div>
            </div>
          </div>
          <div className="ed-cta">
            <a className="btn btn-sun" target="_blank" rel="noopener" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.nama + ' Pekalongan')}`}>
              <Icon name="location" size={16} /> Petunjuk Arah
            </a>
            <button className="btn" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1px solid rgba(255,255,255,.3)' }} onClick={() => setAddedTrip(!addedTrip)}>
              {addedTrip ? <><Icon name="check" size={16} /> Ditambahkan</> : <><Icon name="plus" size={16} /> Tambah ke Rencana</>}
            </button>
            <button className="btn" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1px solid rgba(255,255,255,.3)' }} onClick={() => setSaved(!saved)}>
              <Icon name="save" size={16} /> {saved ? 'Tersimpan' : 'Simpan'}
            </button>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="ed-body">
          <main className="ed-content">
            {/* TENTANG */}
            <section id="tentang" className="ed-section">
              <h2 className="serif">Tentang Destinasi</h2>
              {d.descLong.map((p, i) => <p key={i}>{p}</p>)}
            </section>

            {/* SEJARAH */}
            {d.sejarah && (
              <section className="ed-section">
                <h2 className="serif">Sejarah Singkat</h2>
                <div className="history-card">
                  <div className="history-icon"><Icon name="clock" size={28} /></div>
                  <p>{d.sejarah}</p>
                </div>
              </section>
            )}

            {/* HIGHLIGHTS */}
            <section className="ed-section">
              <h2 className="serif">Mengapa Kesini?</h2>
              <div className="highlight-grid">
                {d.highlights.map((h, i) => (
                  <div key={i} className="highlight-item">
                    <div className="highlight-num">{String(i + 1).padStart(2, '0')}</div>
                    <p>{h}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* GALERI */}
            {d.galeri?.length > 0 && (
              <section id="galeri" className="ed-section">
                <h2 className="serif">Galeri</h2>
                <div className="dest-gallery">
                  {d.galeri.slice(0, 5).map((g, i) => (
                    <div key={i} className={`dest-gallery-item gi-${i}`} style={{ backgroundImage: `url(${g})` }} onClick={() => setLightbox(g)}>
                      <div className="gallery-overlay"><Icon name="plus" size={28} /></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* LOKASI */}
            <section id="lokasi" className="ed-section">
              <h2 className="serif">Lokasi & Akses</h2>
              <div className="location-card">
                <div className="location-map" style={{ backgroundImage: `linear-gradient(135deg, rgba(10,77,104,.35), rgba(8,131,149,.35)), url(https://source.unsplash.com/800x500/?map,satellite,asia)` }}>
                  <div className="location-pin">
                    <div className="location-pin-dot"></div>
                    <div className="location-pin-pulse"></div>
                  </div>
                </div>
                <div className="location-info">
                  <h4>{d.nama}</h4>
                  <p><Icon name="location" size={14} /> {d.alamat}</p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
                    <a className="btn btn-primary" target="_blank" rel="noopener" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.nama + ' Pekalongan')}`}>
                      <Icon name="location" size={14} /> Buka di Maps
                    </a>
                    <button className="btn btn-ghost">
                      <Icon name="share" size={14} /> Bagikan Lokasi
                    </button>
                  </div>
                  <div className="location-transit">
                    <div><b>🚉</b> Stasiun Pekalongan {d.area.includes('Petungkriyono') || d.area.includes('Kajen') ? '— ±40 km' : '— ±5 km'}</div>
                    <div><b>🚌</b> Terminal Bus Pekalongan</div>
                    <div><b>🛵</b> Sewa motor: Rp 75rb/hari di area kota</div>
                    <div><b>🚖</b> Tarif taksi online: ±Rp {d.area.includes('Petung') ? '180.000' : '30.000'} dari pusat kota</div>
                  </div>
                </div>
              </div>
            </section>

            {/* FASILITAS */}
            <section className="ed-section">
              <h2 className="serif">Fasilitas Tersedia</h2>
              <div className="facility-grid">
                {d.fasilitas.map((f, i) => (
                  <div key={i} className="facility-item">
                    <Icon name="check" size={16} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* TIPS */}
            <section id="tips" className="ed-section">
              <h2 className="serif">Tips Berkunjung</h2>
              <div className="tips-grid">
                {d.tips.map((t, i) => (
                  <div key={i} className="tip-card">
                    <div className="tip-icon">💡</div>
                    <p>{t}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SHARE */}
            <section className="ed-section">
              <h2 className="serif">Bagikan Destinasi Ini</h2>
              <div className="share-row">
                <button className="share-btn whatsapp" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(d.nama + ' — ' + shareUrl)}`)}>
                  <span>💬</span> WhatsApp
                </button>
                <button className="share-btn facebook" onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)}>
                  <Icon name="facebook" size={16} /> Facebook
                </button>
                <button className="share-btn twitter" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(d.nama)}&url=${encodeURIComponent(shareUrl)}`)}>
                  <Icon name="twitter" size={16} /> X / Twitter
                </button>
                <button className="share-btn" onClick={() => { navigator.clipboard?.writeText(shareUrl); }}>
                  <Icon name="share" size={16} /> Copy Link
                </button>
              </div>
            </section>
          </main>

          <aside className="ed-side">
            <div className="ed-side-card review-card">
              <div className="review-score">
                <div className="rating-big">{d.rating}</div>
                <div>
                  <div className="rating-stars">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} style={{ color: i <= Math.round(d.rating) ? 'var(--sun)' : 'var(--line)' }}>★</span>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.review_count.toLocaleString('id-ID')} ulasan</div>
                </div>
              </div>
              <div className="rating-bars">
                {[{ s: 5, v: 0.78 }, { s: 4, v: 0.16 }, { s: 3, v: 0.04 }, { s: 2, v: 0.01 }, { s: 1, v: 0.01 }].map(r => (
                  <div key={r.s} className="rating-bar-row">
                    <span>{r.s}</span>
                    <div className="rating-bar"><div style={{ width: (r.v * 100) + '%' }}></div></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ed-side-card">
              <h4>Info Praktis</h4>
              <div className="ed-side-row"><span>Kategori</span><b>{kategori?.label}</b></div>
              <div className="ed-side-row"><span>Area</span><b>{d.area}</b></div>
              <div className="ed-side-row"><span>Jam Buka</span><b>{d.jam}</b></div>
              <div className="ed-side-row"><span>Tiket</span><b>{d.tiket}</b></div>
              <div className="ed-side-row"><span>Estimasi Waktu</span><b>1–3 jam</b></div>
            </div>

            <div className="ed-side-card">
              <h4>Cuaca Hari Ini</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '4px 0' }}>
                <div style={{ fontSize: 38 }}>☀️</div>
                <div>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: 28, color: 'var(--primary)', lineHeight: 1 }}>29°C</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Cerah berawan</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
                <span>🌡 24°-31°</span><span>💧 65%</span><span>💨 12 km/h</span>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="ed-section related" style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
              <div>
                <div className="sec-eyebrow">Eksplorasi Lanjutan</div>
                <h2 className="serif" style={{ color: 'var(--primary)', fontSize: 32 }}>Destinasi Sekitar</h2>
              </div>
              <button className="btn btn-ghost" onClick={() => setPage('destinasi/' + d.kategori)}>
                Lihat Semua <Icon name="arrowR" size={14} />
              </button>
            </div>
            <div className="dest-grid">
              {related.map(r => (
                <div key={r.id} className="dest-card" onClick={() => setPage('destinasi/d/' + r.slug)}>
                  <div className="dest-cover" style={{ backgroundImage: `url(${r.img})` }}>
                    <div className="dest-cat">{CATEGORIES.find(c => c.id === r.kategori)?.label}</div>
                    <div className="dest-area"><Icon name="location" size={12} /> {r.area}</div>
                  </div>
                  <div className="dest-body">
                    <h3>{r.nama}</h3>
                    <p>{r.desc}</p>
                    <div className="dest-meta">
                      <span><Icon name="clock" size={12} /> {r.jam}</span>
                      <span><Icon name="ticket" size={12} /> <b>{r.tiket}</b></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <button className="fab-trip" onClick={() => setAddedTrip(!addedTrip)}>
        {addedTrip ? <Icon name="check" size={20} /> : <Icon name="plus" size={20} />}
        <span>{addedTrip ? 'Ditambahkan' : 'Rencana'}</span>
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

// ============ BERITA DETAIL ============
const BeritaDetail = ({ slug, setPage }) => {
  const { BERITA } = window.PP_DATA;
  const b = BERITA.find(x => x.slug === slug || x.id === slug);
  const [lightbox, setLightbox] = React.useState(null);
  const [liked, setLiked] = React.useState(false);
  const [shared, setShared] = React.useState(false);

  if (!b) {
    return (
      <div className="shell" style={{ padding: '160px 0 100px', textAlign: 'center' }}>
        <h2 className="serif" style={{ fontSize: 32, color: 'var(--primary)' }}>Artikel tidak ditemukan</h2>
        <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => setPage('berita')}>
          <Icon name="arrowL" size={14} /> Kembali ke Berita
        </button>
      </div>
    );
  }

  const related = BERITA.filter(x => x.kategori === b.kategori && x.id !== b.id).slice(0, 3);
  const more = BERITA.filter(x => x.id !== b.id).slice(0, 4);
  const shareUrl = `https://plesirpekalongan.id/berita/${b.slug}`;

  const handleShare = (platform) => {
    if (platform === 'wa') window.open(`https://wa.me/?text=${encodeURIComponent(b.title + ' — ' + shareUrl)}`);
    if (platform === 'fb') window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
    if (platform === 'tw') window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(b.title)}&url=${encodeURIComponent(shareUrl)}`);
    if (platform === 'copy') {
      navigator.clipboard?.writeText(shareUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="berita-detail" data-screen-label={`berita-${b.slug}`}>
      {/* HERO */}
      <div className="bd-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(10,77,104,.5) 0%, rgba(4,28,38,.85) 100%), url(${b.img})` }}>
        <div className="shell bd-hero-inner">
          <button className="btn btn-light" style={{ width: 'fit-content', marginBottom: 24 }} onClick={() => setPage('berita')}>
            <Icon name="arrowL" size={14} /> Semua Berita
          </button>
          <div className="bd-cat">{b.kategori}</div>
          <h1 className="serif">{b.title}</h1>
          <p className="bd-excerpt">{b.excerpt}</p>
          <div className="bd-meta">
            <div className="bd-author">
              <div className="bd-avatar" style={{ backgroundImage: `url(${b.authorAvatar})` }}></div>
              <div>
                <div className="bd-author-name">{b.author}</div>
                <div className="bd-author-role">{b.authorRole}</div>
              </div>
            </div>
            <div className="bd-meta-divider"></div>
            <div className="bd-meta-item"><Icon name="calendar" size={14} /> {b.date}</div>
            <div className="bd-meta-item"><Icon name="clock" size={14} /> {b.readTime} baca</div>
          </div>
        </div>
      </div>

      {/* SHARE BAR */}
      <div className="shell">
        <div className="bd-sharebar">
          <div className="bd-tags">
            {b.tags.map(t => <span key={t} className="ed-tag">#{t}</span>)}
          </div>
          <div className="bd-share-actions">
            <button className={`bd-action ${liked ? 'liked' : ''}`} onClick={() => setLiked(!liked)} title="Suka">
              <span style={{ fontSize: 16 }}>{liked ? '❤️' : '🤍'}</span> {liked ? '1.2k+' : '1.2k'}
            </button>
            <button className="bd-action" onClick={() => handleShare('wa')} title="WhatsApp">💬</button>
            <button className="bd-action" onClick={() => handleShare('fb')} title="Facebook"><Icon name="facebook" size={14} /></button>
            <button className="bd-action" onClick={() => handleShare('tw')} title="Twitter"><Icon name="twitter" size={14} /></button>
            <button className={`bd-action ${shared ? 'liked' : ''}`} onClick={() => handleShare('copy')} title="Copy link">
              {shared ? <><Icon name="check" size={14} /> Tersalin</> : <><Icon name="share" size={14} /> Salin Link</>}
            </button>
          </div>
        </div>

        <div className="bd-body">
          <main className="bd-content">
            <article className="bd-article">
              {b.body.map((p, i) => (
                <React.Fragment key={i}>
                  <p>{p}</p>
                  {/* Insert pull quote midway */}
                  {b.quote && i === Math.floor(b.body.length / 2) - 1 && (
                    <blockquote className="bd-quote">
                      <svg width="48" height="38" viewBox="0 0 48 38" fill="none" style={{ marginBottom: 12 }}>
                        <path d="M14 0H0v18c0 11 4 18 14 20l2-6c-6-2-8-6-8-12h6V0Z" fill="#F2A93B"/>
                        <path d="M48 0H34v18c0 11 4 18 14 20l2-6c-6-2-8-6-8-12h6V0Z" fill="#F2A93B"/>
                      </svg>
                      <p>{b.quote}</p>
                      <cite>— {b.quoteBy}</cite>
                    </blockquote>
                  )}
                  {/* Insert inline image at 1/3 mark */}
                  {b.galeri[1] && i === Math.floor(b.body.length / 3) && (
                    <figure className="bd-figure" onClick={() => setLightbox(b.galeri[1])}>
                      <img src={b.galeri[1]} alt="" />
                      <figcaption>Dokumentasi terkait — {b.title}</figcaption>
                    </figure>
                  )}
                </React.Fragment>
              ))}
            </article>

            {/* GALERI */}
            {b.galeri?.length > 0 && (
              <section className="ed-section" style={{ marginTop: 56 }}>
                <h2 className="serif">Galeri Foto</h2>
                <div className="gallery-grid">
                  {b.galeri.map((g, i) => (
                    <div key={i} className="gallery-item" style={{ backgroundImage: `url(${g})` }} onClick={() => setLightbox(g)}>
                      <div className="gallery-overlay"><Icon name="plus" size={28} /></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* AUTHOR CARD */}
            <section className="ed-section">
              <div className="bd-author-card">
                <div className="bd-author-avatar-big" style={{ backgroundImage: `url(${b.authorAvatar})` }}></div>
                <div>
                  <div className="bd-author-name-big">{b.author}</div>
                  <div className="bd-author-role">{b.authorRole} · Plesir Pekalongan</div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginTop: 10 }}>
                    Telah menulis untuk Plesir Pekalongan sejak 2024 dengan fokus pada {b.kategori.toLowerCase()} dan pariwisata kota.
                  </p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <a className="social-btn" style={{ width: 32, height: 32 }}><Icon name="instagram" size={14} /></a>
                    <a className="social-btn" style={{ width: 32, height: 32 }}><Icon name="twitter" size={14} /></a>
                    <a className="social-btn" style={{ width: 32, height: 32 }}><Icon name="mail" size={14} /></a>
                  </div>
                </div>
              </div>
            </section>

            {/* FOOTER SHARE */}
            <section className="ed-section">
              <h2 className="serif">Suka artikel ini? Bagikan!</h2>
              <div className="share-row">
                <button className="share-btn whatsapp" onClick={() => handleShare('wa')}><span>💬</span> WhatsApp</button>
                <button className="share-btn facebook" onClick={() => handleShare('fb')}><Icon name="facebook" size={16} /> Facebook</button>
                <button className="share-btn twitter" onClick={() => handleShare('tw')}><Icon name="twitter" size={16} /> X / Twitter</button>
                <button className="share-btn" onClick={() => handleShare('copy')}>
                  {shared ? <><Icon name="check" size={16} /> Tersalin</> : <><Icon name="share" size={16} /> Copy Link</>}
                </button>
              </div>
            </section>
          </main>

          <aside className="bd-side">
            <div className="ed-side-card">
              <h4>Daftar Isi</h4>
              <ol className="bd-toc">
                <li><a href="#article">Pembukaan</a></li>
                <li><a href="#article">Konteks & Sejarah</a></li>
                <li><a href="#article">Suara Narasumber</a></li>
                <li><a href="#article">Dampak & Harapan</a></li>
              </ol>
            </div>

            {related.length > 0 && (
              <div className="ed-side-card">
                <h4>Artikel Terkait</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {related.map(r => (
                    <a key={r.id} className="bd-related-mini" onClick={() => setPage('berita/' + r.slug)}>
                      <div className="bd-related-img" style={{ backgroundImage: `url(${r.img})` }}></div>
                      <div>
                        <div className="bd-related-title">{r.title}</div>
                        <div className="bd-related-date">{r.date}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="ed-side-card newsletter-card">
              <h4>Newsletter Mingguan</h4>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.5 }}>
                Cerita pesisir & berita terbaru Pekalongan langsung ke inbox Anda.
              </p>
              <input placeholder="Email Anda" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 13, marginBottom: 8 }} />
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Berlangganan</button>
            </div>
          </aside>
        </div>

        {/* RELATED FULL */}
        {more.length > 0 && (
          <section className="ed-section related" style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
              <div>
                <div className="sec-eyebrow">Baca Juga</div>
                <h2 className="serif" style={{ color: 'var(--primary)', fontSize: 32 }}>Cerita Lainnya</h2>
              </div>
              <button className="btn btn-ghost" onClick={() => setPage('berita')}>
                Semua Berita <Icon name="arrowR" size={14} />
              </button>
            </div>
            <div className="berita-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {more.map(r => (
                <div key={r.id} className="berita-card" style={{ backgroundImage: `url(${r.img})`, aspectRatio: '3/4' }} onClick={() => setPage('berita/' + r.slug)}>
                  <div className="event-badge budaya" style={{ background: '#fff', color: 'var(--primary)' }}>{r.kategori}</div>
                  <div className="berita-card-body">
                    <h3>{r.title}</h3>
                    <div className="berita-meta">
                      <span><Icon name="calendar" size={12} /> {r.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}><Icon name="x" size={24} /></button>
          <img src={lightbox} alt="" />
        </div>
      )}
    </div>
  );
};

Object.assign(window, { DestinasiDetail, BeritaDetail });
