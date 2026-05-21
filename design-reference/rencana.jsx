// Plesir Pekalongan — Rencana Perjalanan (AI Trip Planner)

const RencanaPage = ({ setPage }) => {
  const goHome = () => setPage('home');
  const [step, setStep] = React.useState(0); // 0 = landing, 1-4 wizard, 5 result
  const [data, setData] = React.useState({
    companion: null,
    interests: [],
    food: [],
    stay: null,
    startDate: null,
    endDate: null,
    budget: 2500000,
    budgetTier: 'standard',
  });
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const toggle = (k, v) => setData(d => ({ ...d, [k]: d[k].includes(v) ? d[k].filter(x => x !== v) : [...d[k], v] }));

  if (step === 0) return <RencanaLanding onChoose={() => setStep(1)} onClose={goHome} />;
  if (step === 5) return <ItineraryResult data={data} onRestart={() => { setStep(0); }} onClose={goHome} />;

  return (
    <div className="wizard">
      <div className="wizard-bg" />
      <div className="wizard-head">
        <button className="plan-pill"><Icon name="save" size={16} /> Rencana saya sejauh ini</button>
        <button className="wizard-close" onClick={goHome}><Icon name="x" size={20} /></button>
      </div>
      <div className="wizard-content">
        {step === 1 && <Step1 data={data} set={set} />}
        {step === 2 && <Step2 data={data} toggle={toggle} set={set} />}
        {step === 3 && <Step3 data={data} set={set} />}
        {step === 4 && <Step4 data={data} set={set} />}
      </div>
      <div className="wizard-footer">
        <button className="btn btn-light" onClick={() => step > 1 ? setStep(step - 1) : goHome()}>
          <Icon name="arrowL" size={14} /> Kembali
        </button>
        <div className="wizard-progress">{step} of 4</div>
        <button className="btn btn-light" onClick={() => step < 4 ? setStep(step + 1) : setStep(5)}>
          {step === 4 ? 'Buat Rencana' : 'Selanjutnya'} <Icon name="arrowR" size={14} />
        </button>
      </div>
    </div>
  );
};

const RencanaLanding = ({ onChoose, onClose }) => (
  <div className="wizard">
    <div className="wizard-bg" style={{ background: `linear-gradient(135deg, rgba(10,77,104,.6), rgba(8,131,149,.5)), url(https://source.unsplash.com/1600x900/?indonesia,beach,aerial) center/cover` }} />
    <div className="wizard-head">
      <button className="plan-pill"><Icon name="save" size={16} /> Rencana saya sejauh ini</button>
      <button className="wizard-close" onClick={onClose}><Icon name="x" size={20} /></button>
    </div>
    <div className="wizard-content">
      <h2 className="serif">Di mana perjalanan pribadimu akan dimulai?</h2>
      <p>Biarkan AI menyusun itinerary Pekalongan terbaik untukmu, atau mulai dari nol.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 640, width: '100%', marginTop: 20 }}>
        <div className="companion-card" style={{ aspectRatio: '1/1', maxWidth: 'none' }} onClick={onChoose}>
          <Icon name="users" size={44} stroke={1.4} />
          <h4>Personalisasikan<br/>perjalananmu</h4>
        </div>
        <div className="companion-card" style={{ aspectRatio: '1/1', maxWidth: 'none' }} onClick={onChoose}>
          <Icon name="sparkle" size={44} stroke={1.4} />
          <h4>Buat rencanamu<br/>sendiri</h4>
        </div>
      </div>
    </div>
  </div>
);

const Step1 = ({ data, set }) => {
  const opts = [
    { id: 'solo', label: 'Sendiri', icon: 'user' },
    { id: 'couple', label: 'Berdua', icon: 'users' },
    { id: 'family', label: 'Keluarga', icon: 'users' },
    { id: 'friends', label: 'Bersama Teman', icon: 'users' },
  ];
  return (
    <>
      <h2 className="serif">Siapa yang menemanimu?</h2>
      <p>Kami akan menyesuaikan rekomendasi sesuai jenis perjalananmu.</p>
      <div className="companion-grid">
        {opts.map(o => (
          <div key={o.id} className={`companion-card ${data.companion === o.id ? 'selected' : ''}`} onClick={() => set('companion', o.id)}>
            <Icon name={o.icon} size={44} stroke={1.3} />
            <h4>{o.label}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

const Step2 = ({ data, toggle, set }) => {
  const interests = ['Pantai','Batik','Kuliner','Religi','Petualangan Alam','Hidden Gems','Belanja','Festival','Seni & Budaya','Spa & Relaksasi','Ramah Anak','Akses Difabel'];
  const foods = ['Halal','Vegan','Pedas','Seafood','Tidak ada preferensi'];
  const stays = ['Hotel & Resort','Homestay','Hemat / Budget'];
  return (
    <>
      <h2 className="serif">Ceritakan minatmu!</h2>
      <p>Apa gaya liburanmu? Pantai pesisir, kampung batik, atau kuliner pasar? Kami punya semuanya.</p>
      <div className="tag-cloud">
        {interests.map(t => (
          <button key={t} className={`tag-pill ${data.interests.includes(t) ? 'selected' : ''}`} onClick={() => toggle('interests', t)}>{t}</button>
        ))}
      </div>
      <div style={{ fontSize: 14, opacity: .9, marginTop: 28, marginBottom: 16 }}>Preferensi makanan</div>
      <div className="tag-cloud" style={{ marginBottom: 0 }}>
        {foods.map(t => (
          <button key={t} className={`tag-pill ${data.food.includes(t) ? 'selected' : ''}`} onClick={() => toggle('food', t)}>{t}</button>
        ))}
      </div>
      <div style={{ fontSize: 14, opacity: .9, marginTop: 28, marginBottom: 16 }}>Di mana kamu ingin menginap?</div>
      <div className="tag-cloud" style={{ marginBottom: 0 }}>
        {stays.map(s => (
          <button key={s} className={`tag-pill ${data.stay === s ? 'selected' : ''}`} onClick={() => set('stay', s)}>{s}</button>
        ))}
      </div>
    </>
  );
};

const Step3 = ({ data, set }) => {
  const [base, setBase] = React.useState(new Date(2026, 4, 1));
  const monthLabel = (d) => d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  const renderCal = (offset) => {
    const m = new Date(base.getFullYear(), base.getMonth() + offset, 1);
    const firstDay = (m.getDay() + 6) % 7; // Mon=0
    const daysIn = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysIn; i++) days.push(new Date(m.getFullYear(), m.getMonth(), i));
    return (
      <div className="cal">
        <div className="cal-head">
          {offset === 0 ? <button onClick={() => setBase(new Date(base.getFullYear(), base.getMonth() - 1, 1))}><Icon name="arrowL" /></button> : <span style={{ width: 24 }}></span>}
          <h4>{monthLabel(m)}</h4>
          {offset === 1 ? <button onClick={() => setBase(new Date(base.getFullYear(), base.getMonth() + 1, 1))}><Icon name="arrowR" /></button> : <span style={{ width: 24 }}></span>}
        </div>
        <div className="cal-weeks">
          {['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map(w => <span key={w}>{w}</span>)}
        </div>
        <div className="cal-days">
          {days.map((d, i) => {
            if (!d) return <span key={i} className="cal-day muted"></span>;
            const ts = d.getTime();
            const isStart = data.startDate && ts === data.startDate;
            const isEnd = data.endDate && ts === data.endDate;
            const inRange = data.startDate && data.endDate && ts > data.startDate && ts < data.endDate;
            const cls = `cal-day${isStart ? ' selected start' : ''}${isEnd ? ' selected end' : ''}${inRange ? ' in-range' : ''}`;
            return <span key={i} className={cls} onClick={() => {
              if (!data.startDate || (data.startDate && data.endDate)) {
                set('startDate', ts); set('endDate', null);
              } else if (ts < data.startDate) {
                set('endDate', data.startDate); set('startDate', ts);
              } else {
                set('endDate', ts);
              }
            }}>{d.getDate()}</span>;
          })}
        </div>
      </div>
    );
  };
  return (
    <>
      <h2 className="serif">Kapan petualanganmu dimulai?</h2>
      <p>Pilih tanggal perjalanan dan temukan tempat-tempat terbaik selama kunjunganmu.</p>
      <div className="cal-grid">
        {renderCal(0)}
        {renderCal(1)}
      </div>
    </>
  );
};

const Step4 = ({ data, set }) => {
  const tiers = [
    { id: 'backpacker', label: 'Backpacker', range: '< Rp 1jt', cap: 1000000 },
    { id: 'standard', label: 'Standard', range: 'Rp 1–3jt', cap: 3000000 },
    { id: 'premium', label: 'Premium', range: 'Rp 3–6jt', cap: 6000000 },
    { id: 'luxury', label: 'Luxury', range: 'Rp 6jt+', cap: 10000000 },
  ];
  return (
    <>
      <h2 className="serif">Berapa anggaranmu?</h2>
      <p>Geser slider untuk menyesuaikan total budget perjalanan per orang.</p>
      <div className="budget-slider-wrap">
        <div className="budget-display">Rp {data.budget.toLocaleString('id-ID')}</div>
        <input type="range" className="budget-slider" min={500000} max={10000000} step={250000} value={data.budget} onChange={e => set('budget', +e.target.value)} />
        <div className="budget-range"><span>Rp 500rb</span><span>Rp 10jt+</span></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, maxWidth: 720, width: '100%' }}>
        {tiers.map(t => (
          <button key={t.id} className={`tag-pill ${data.budgetTier === t.id ? 'selected' : ''}`} style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4 }} onClick={() => { set('budgetTier', t.id); set('budget', t.cap); }}>
            <b>{t.label}</b><span style={{ fontSize: 11, opacity: .8 }}>{t.range}</span>
          </button>
        ))}
      </div>
    </>
  );
};

const ItineraryResult = ({ data, onRestart, onClose }) => {
  const [state, setState] = React.useState({ loading: true, itin: null, error: null });

  React.useEffect(() => {
    const days = data.startDate && data.endDate ? Math.max(1, Math.round((data.endDate - data.startDate) / 86400000) + 1) : 3;
    (async () => {
      try {
        const prompt = `Kamu adalah travel planner ahli Pekalongan, Jawa Tengah. Buatkan itinerary ${days} hari berdasarkan input berikut:
- Teman perjalanan: ${data.companion || 'sendiri'}
- Minat: ${data.interests.join(', ') || 'umum'}
- Preferensi makanan: ${data.food.join(', ') || 'tidak ada'}
- Akomodasi: ${data.stay || 'standard'}
- Budget: Rp ${data.budget.toLocaleString('id-ID')} (${data.budgetTier})

Gunakan HANYA destinasi nyata di Kota/Kabupaten Pekalongan (Pantai Pasir Kencana, Museum Batik, Kampung Batik Kauman, Petungkriyono, Curug Bajing, Linggoasri, Masjid Al-Jami', dll).

Output WAJIB hanya JSON valid (tanpa markdown code fence), dengan struktur:
{"judul_trip":"...","ringkasan":"1-2 kalimat","estimasi_biaya":"Rp ...","hari":[{"hari_ke":1,"tema":"...","aktivitas":[{"waktu":"08:00","tempat":"...","deskripsi":"...","estimasi_biaya":"Rp ..."}]}],"tips":["..."]}

Buat 3-4 aktivitas per hari. Tips 3-5 poin.`;

        const res = await window.claude.complete(prompt);
        let json = res.trim();
        // strip code fences if any
        json = json.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
        const m = json.match(/\{[\s\S]*\}/);
        if (m) json = m[0];
        const parsed = JSON.parse(json);
        setState({ loading: false, itin: parsed, error: null });
      } catch (e) {
        // Fallback with realistic dummy data
        setState({
          loading: false,
          itin: makeFallback(data, days),
          error: null,
        });
      }
    })();
  }, []);

  const fmtDate = (ts, addDays = 0) => {
    if (!ts) return '';
    const d = new Date(ts + addDays * 86400000);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="wizard">
      <div className="wizard-bg" />
      <div className="wizard-head">
        <button className="wizard-close" onClick={onClose}><Icon name="x" size={20} /></button>
      </div>
      {state.loading ? (
        <div className="wizard-content" style={{ paddingTop: 120 }}>
          <div className="spinner"></div>
          <h2 className="serif">Menyusun rencana terbaikmu...</h2>
          <p>AI sedang meracik itinerary Pekalongan yang dipersonalisasi.</p>
        </div>
      ) : (
        <div className="itinerary fade-in">
          <div className="itin-head">
            <div className="sec-eyebrow" style={{ justifyContent: 'center', color: 'var(--sun)' }}>Itinerary AI</div>
            <h2 className="serif">{state.itin.judul_trip}</h2>
            <p>{state.itin.ringkasan}</p>
            <div className="itin-stats">
              <div className="itin-stat"><div className="label">Durasi</div><div className="val">{state.itin.hari.length} Hari</div></div>
              <div className="itin-stat"><div className="label">Estimasi Biaya</div><div className="val">{state.itin.estimasi_biaya}</div></div>
              <div className="itin-stat"><div className="label">Mulai</div><div className="val">{fmtDate(data.startDate) || 'Fleksibel'}</div></div>
            </div>
          </div>

          {state.itin.hari.map((d, i) => (
            <div key={i} className="day-card">
              <h3 className="serif">Hari {d.hari_ke} — {d.tema}</h3>
              <div className="day-meta">{fmtDate(data.startDate, i)}</div>
              {d.aktivitas.map((a, j) => (
                <div key={j} className="activity">
                  <div className="time">{a.waktu}</div>
                  <div>
                    <div className="who">{a.tempat}</div>
                    <div className="desc">{a.deskripsi}</div>
                  </div>
                  <div className="cost">{a.estimasi_biaya}</div>
                </div>
              ))}
            </div>
          ))}

          {state.itin.tips && (
            <div className="day-card">
              <h3 className="serif" style={{ marginBottom: 16 }}>💡 Tips Pintar</h3>
              <ul style={{ paddingLeft: 20, lineHeight: 1.8, color: 'rgba(255,255,255,.9)', fontSize: 14 }}>
                {state.itin.tips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
            <button className="btn btn-sun"><Icon name="save" size={16} /> Simpan Rencana</button>
            <button className="btn" style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1px solid rgba(255,255,255,.3)' }}><Icon name="download" size={16} /> Export PDF</button>
            <button className="btn" style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1px solid rgba(255,255,255,.3)' }}><Icon name="share" size={16} /> Share</button>
            <button className="btn btn-ghost" style={{ borderColor: '#fff', color: '#fff' }} onClick={onRestart}>Mulai Ulang</button>
          </div>
        </div>
      )}
    </div>
  );
};

function makeFallback(data, days) {
  const samples = [
    { tema: 'Pesona Pesisir', acts: [
      { waktu: '07:00', tempat: 'Sarapan Sego Megono', deskripsi: 'Sarapan ikonik di warung legendaris Pak Toha, Jl. Hayam Wuruk.', estimasi_biaya: 'Rp 15.000' },
      { waktu: '09:00', tempat: 'Pantai Pasir Kencana', deskripsi: 'Berjalan di dermaga panjang, foto-foto, dan menikmati hembusan angin laut.', estimasi_biaya: 'Rp 10.000' },
      { waktu: '12:30', tempat: 'Makan siang Tauto Pak Inin', deskripsi: 'Soto khas Pekalongan berkuah tauco di pusat kota.', estimasi_biaya: 'Rp 30.000' },
      { waktu: '15:00', tempat: 'Museum Batik Pekalongan', deskripsi: 'Ekspos ribuan koleksi batik nusantara + workshop singkat membatik.', estimasi_biaya: 'Rp 15.000' },
    ]},
    { tema: 'Jelajah Batik & Heritage', acts: [
      { waktu: '08:00', tempat: 'Kampung Batik Kauman', deskripsi: 'Tur kampung batik tertua. Bertemu pengrajin generasi ketiga.', estimasi_biaya: 'Rp 25.000' },
      { waktu: '11:00', tempat: 'Gereja GPIB Immanuel', deskripsi: 'Bangunan kolonial 1851 yang baru saja direstorasi.', estimasi_biaya: 'Gratis' },
      { waktu: '13:00', tempat: 'Garang Asem Masin', deskripsi: 'Makan siang ayam asam pedas dibungkus daun pisang.', estimasi_biaya: 'Rp 35.000' },
      { waktu: '16:00', tempat: 'Pasar Grosir Setono', deskripsi: 'Belanja batik grosir 1000+ toko dalam satu kompleks.', estimasi_biaya: 'Rp 200.000+' },
    ]},
    { tema: 'Petualangan Petungkriyono', acts: [
      { waktu: '06:30', tempat: 'Berangkat ke Petungkriyono', deskripsi: 'Perjalanan 1.5 jam ke pegunungan selatan. Bawa jaket tipis.', estimasi_biaya: 'Rp 50.000 transport' },
      { waktu: '09:00', tempat: 'Curug Bajing', deskripsi: 'Trek 15 menit ke air terjun 75 meter. Spot foto wajib.', estimasi_biaya: 'Rp 15.000' },
      { waktu: '13:00', tempat: 'Sokokembang Forest', deskripsi: 'Tur edukasi habitat Owa Jawa dengan pemandu lokal.', estimasi_biaya: 'Rp 20.000' },
      { waktu: '16:00', tempat: 'Linggoasri', deskripsi: 'Berendam air panas alami sembari menikmati sunset gunung.', estimasi_biaya: 'Rp 12.000' },
    ]},
  ];
  return {
    judul_trip: `Petualangan ${days} Hari di Pekalongan`,
    ringkasan: `Rencana ${data.budgetTier} untuk ${data.companion || 'kamu'} dengan fokus ${data.interests.slice(0, 2).join(' & ') || 'pesona Pekalongan'}.`,
    estimasi_biaya: `Rp ${(data.budget * 0.85).toLocaleString('id-ID')}`,
    hari: samples.slice(0, days).map((s, i) => ({ hari_ke: i + 1, tema: s.tema, aktivitas: s.acts })),
    tips: [
      'Pekalongan paling enak dijelajahi dengan sewa motor — sekitar Rp 75.000/hari.',
      'Hindari kunjungan Petungkriyono saat musim hujan (Jan-Feb) — jalur licin.',
      'Bawa cash secukupnya, banyak warung khas belum menerima QRIS.',
      'Hormati waktu sholat saat berkunjung ke kawasan religi.',
      'Sego megono terbaik disajikan pagi hari — datang sebelum jam 8.',
    ],
  };
}

Object.assign(window, { RencanaPage });
