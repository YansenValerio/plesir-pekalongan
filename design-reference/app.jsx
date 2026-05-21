// Plesir Pekalongan — main app router

const CATEGORY_IDS = ['alam', 'religi', 'budaya', 'kuliner', 'belanja'];

const App = () => {
  const [page, setPage] = React.useState('home');
  const [lang, setLang] = React.useState('id');

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  const parts = page.split('/');
  const base = parts[0];
  const sub = parts[1];
  const subsub = parts[2];
  const showNav = base !== 'rencana';
  const showFoot = base !== 'rencana';

  // Routing logic
  let content = null;
  if (base === 'home') content = <Home setPage={setPage} lang={lang} />;
  else if (base === 'destinasi') {
    if (sub && !CATEGORY_IDS.includes(sub)) {
      // destinasi/{slug} → detail
      content = <DestinasiDetail slug={sub} setPage={setPage} />;
    } else {
      // destinasi or destinasi/{kategori}
      content = <DestinasiPage setPage={setPage} subPath={sub} />;
    }
  }
  else if (base === 'event') content = sub ? <EventDetail slug={sub} setPage={setPage} /> : <EventPage setPage={setPage} />;
  else if (base === 'berita') content = sub ? <BeritaDetail slug={sub} setPage={setPage} /> : <BeritaPage setPage={setPage} />;
  else if (base === 'rencana') content = <RencanaPage setPage={setPage} />;
  else if (base === 'kontak') content = <KontakPage />;

  return (
    <>
      {showNav && <Navbar page={page} setPage={setPage} lang={lang} setLang={setLang} />}
      <main data-screen-label={`page-${base}${sub ? '-' + sub : ''}`}>
        {content}
      </main>
      {showFoot && <Footer setPage={setPage} lang={lang} />}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
