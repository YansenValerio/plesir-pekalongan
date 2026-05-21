// Plesir Pekalongan — dummy data
const img = (q, w = 800, h = 600) => `https://source.unsplash.com/${w}x${h}/?${encodeURIComponent(q)}`;

const DESTINASI = [
  { id: 'pasir-kencana', kategori: 'alam', nama: 'Pantai Pasir Kencana', area: 'Pekalongan Utara', img: img('beach,indonesia,sunset'), desc: 'Pantai keluarga ikonik Kota Pekalongan dengan dermaga panjang menjorok ke laut dan pemandangan matahari terbenam yang memukau.', jam: '06:00 — 22:00', tiket: 'Rp 10.000' },
  { id: 'slamaran', kategori: 'alam', nama: 'Pantai Slamaran Indah', area: 'Pekalongan Utara', img: img('beach,java,palm'), desc: 'Pantai tenang dengan deretan pohon cemara, populer untuk piknik akhir pekan dan menikmati ikan bakar segar.', jam: '06:00 — 18:00', tiket: 'Rp 7.500' },
  { id: 'depok', kategori: 'alam', nama: 'Pantai Depok', area: 'Kab. Pekalongan', img: img('beach,indonesia,fisherman'), desc: 'Pantai nelayan dengan kapal-kapal warna-warni dan sunrise yang dramatis.', jam: '05:00 — 18:00', tiket: 'Rp 5.000' },
  { id: 'curug-bajing', kategori: 'alam', nama: 'Curug Bajing', area: 'Petungkriyono', img: img('waterfall,jungle,java'), desc: 'Air terjun 75 meter di tengah hutan tropis Petungkriyono. Sejuk, hijau, dan menenangkan.', jam: '07:00 — 17:00', tiket: 'Rp 15.000' },
  { id: 'curug-madu', kategori: 'alam', nama: 'Curug Madu', area: 'Petungkriyono', img: img('waterfall,forest'), desc: 'Tersembunyi di balik hutan rapat, debit airnya deras dan kolamnya jernih.', jam: '07:00 — 17:00', tiket: 'Rp 10.000' },
  { id: 'hutan-pinus', kategori: 'alam', nama: 'Hutan Pinus Petungkriyono', area: 'Petungkriyono', img: img('pine,forest,mountain'), desc: 'Trek pendakian ringan dengan udara segar pegunungan dan deretan pinus simetris.', jam: '06:00 — 18:00', tiket: 'Rp 10.000' },
  { id: 'linggoasri', kategori: 'alam', nama: 'Linggoasri', area: 'Kajen', img: img('mountain,village,java'), desc: 'Kawasan wisata alam dataran tinggi dengan udara sejuk, kebun teh, dan pemandian air panas.', jam: '24 jam', tiket: 'Rp 12.000' },
  { id: 'black-canyon', kategori: 'alam', nama: 'Black Canyon Petungkriyono', area: 'Petungkriyono', img: img('canyon,river,java'), desc: 'Sungai dengan tebing batu hitam yang dramatis, populer untuk tubing dan fotografi.', jam: '08:00 — 16:00', tiket: 'Rp 25.000' },
  { id: 'sigebyar', kategori: 'alam', nama: 'Telaga Sigebyar', area: 'Petungkriyono', img: img('lake,mountain,forest'), desc: 'Telaga jernih di ketinggian dengan latar gunung Rogojembangan.', jam: '07:00 — 17:00', tiket: 'Rp 10.000' },
  { id: 'sokokembang', kategori: 'alam', nama: 'Sokokembang Forest', area: 'Petungkriyono', img: img('rainforest,monkey'), desc: 'Habitat owa Jawa yang terancam punah. Trekking edukasi konservasi.', jam: '08:00 — 15:00', tiket: 'Rp 20.000' },
  { id: 'aljami', kategori: 'religi', nama: "Masjid Agung Al-Jami' Pekalongan", area: 'Pekalongan Barat', img: img('mosque,java,indonesia'), desc: 'Masjid bersejarah berarsitektur perpaduan Jawa-Arab di alun-alun kota.', jam: '04:00 — 22:00', tiket: 'Gratis' },
  { id: 'sapuro', kategori: 'religi', nama: 'Makam Habib Ahmad Al-Attas', area: 'Sapuro', img: img('tomb,mosque,arabic'), desc: 'Makam ulama keramat tujuan ziarah utama warga Pekalongan dan luar daerah.', jam: '24 jam', tiket: 'Gratis' },
  { id: 'syekh-abdullah', kategori: 'religi', nama: 'Makam Syekh Sayyid Abdullah Al-Attas', area: 'Pekalongan Barat', img: img('tomb,heritage'), desc: 'Makam keramat dengan arsitektur khas Hadrami, ramai saat haul.', jam: '24 jam', tiket: 'Gratis' },
  { id: 'po-an-thian', kategori: 'religi', nama: 'Klenteng Po An Thian', area: 'Pekalongan Utara', img: img('chinese,temple,red'), desc: 'Klenteng tertua di Pekalongan, simbol harmoni multikultur kota.', jam: '06:00 — 21:00', tiket: 'Gratis' },
  { id: 'gpib', kategori: 'religi', nama: 'Gereja GPIB Immanuel', area: 'Pekalongan Barat', img: img('colonial,church,indonesia'), desc: 'Gereja kolonial Belanda 1851, salah satu bangunan heritage paling utuh.', jam: '08:00 — 17:00', tiket: 'Gratis' },
  { id: 'salafiyah', kategori: 'religi', nama: 'Pondok Pesantren Salafiyah', area: 'Kajen', img: img('pesantren,santri'), desc: 'Pesantren tertua dan terbesar, pusat kajian kitab kuning klasik.', jam: '06:00 — 18:00', tiket: 'Gratis' },
  { id: 'rifai', kategori: 'religi', nama: "Makam KH. Ageng Rifa'i", area: 'Kalisalak', img: img('grave,islamic'), desc: "Makam tokoh tarekat Rifa'iyah yang dihormati di pesisir utara Jawa.", jam: '24 jam', tiket: 'Gratis' },
  { id: 'museum-batik', kategori: 'budaya', nama: 'Museum Batik Pekalongan', area: 'Pekalongan Timur', img: img('batik,museum,pattern'), desc: 'Museum batik nasional dengan ribuan koleksi dari berbagai daerah, dilengkapi workshop membatik.', jam: '08:00 — 15:00', tiket: 'Rp 5.000' },
  { id: 'kauman', kategori: 'budaya', nama: 'Kampung Batik Kauman', area: 'Pekalongan Timur', img: img('batik,village,craftsman'), desc: 'Kampung dengan puluhan rumah produksi batik tulis halus generasi ketiga.', jam: '08:00 — 17:00', tiket: 'Gratis' },
  { id: 'pesindon', kategori: 'budaya', nama: 'Kampung Batik Pesindon', area: 'Pekalongan Barat', img: img('batik,textile,art'), desc: 'Sentra batik dengan mural batik raksasa di sepanjang gang.', jam: '08:00 — 17:00', tiket: 'Gratis' },
  { id: 'ibc', kategori: 'budaya', nama: 'International Batik Center', area: 'Wiradesa', img: img('batik,fashion,gallery'), desc: 'Pusat perdagangan batik terbesar di Jawa Tengah, satu atap.', jam: '08:00 — 21:00', tiket: 'Gratis' },
  { id: 'wiradesa', kategori: 'budaya', nama: 'Sentra Batik Wiradesa', area: 'Kab. Pekalongan', img: img('batik,wax,production'), desc: 'Desa pengrajin batik cap dan tulis dengan harga lokal.', jam: '08:00 — 17:00', tiket: 'Gratis' },
  { id: 'setono', kategori: 'budaya', nama: 'Galeri Batik Setono', area: 'Pekalongan Timur', img: img('batik,gallery,colorful'), desc: 'Galeri dan grosir batik pesisir dengan motif kontemporer.', jam: '08:00 — 21:00', tiket: 'Gratis' },
  { id: 'sintren', kategori: 'budaya', nama: 'Pertunjukan Sintren', area: 'Berbagai Lokasi', img: img('javanese,dance,mystic'), desc: 'Seni tari mistik pesisir yang masih hidup di desa-desa Pekalongan.', jam: 'Sesuai jadwal', tiket: 'Rp 25.000' },
  { id: 'simthudduror', kategori: 'budaya', nama: 'Kesenian Simthudduror', area: 'Berbagai Lokasi', img: img('religious,music,arabic'), desc: 'Pembacaan maulid khas pesisir dengan iringan rebana dan kostum putih.', jam: 'Sesuai jadwal', tiket: 'Gratis' },
  { id: 'pekan-batik', kategori: 'budaya', nama: 'Festival Pekan Batik Nusantara', area: 'Lapangan Jetayu', img: img('festival,batik,parade'), desc: 'Festival batik tahunan terbesar dengan parade, pameran, dan workshop nasional.', jam: 'Oktober', tiket: 'Gratis' },
  { id: 'sego-megono', kategori: 'kuliner', nama: 'Sego Megono', area: 'Khas Pekalongan', img: img('rice,javanese,food'), desc: 'Nasi dengan urap nangka muda parut dan kelapa berbumbu. Hidangan sarapan ikonik.', jam: '06:00 — 22:00', tiket: 'Rp 10.000 – 25.000' },
  { id: 'tauto', kategori: 'kuliner', nama: 'Tauto Pekalongan', area: 'Khas Pekalongan', img: img('soup,beef,indonesian'), desc: 'Soto khas berkuah merah dengan tauco fermentasi, daging sapi atau kerbau.', jam: '07:00 — 22:00', tiket: 'Rp 20.000 – 35.000' },
  { id: 'garang-asem', kategori: 'kuliner', nama: 'Garang Asem Masin', area: 'Pekalongan', img: img('chicken,curry,banana'), desc: 'Ayam masak dengan kuah asam pedas dibungkus daun pisang.', jam: '10:00 — 21:00', tiket: 'Rp 25.000 – 40.000' },
  { id: 'pindang-tetel', kategori: 'kuliner', nama: 'Pindang Tetel', area: 'Pekalongan Selatan', img: img('rice,bowl,traditional'), desc: 'Sup daging dengan kluwek hitam, gurih dan kaya rempah.', jam: '08:00 — 16:00', tiket: 'Rp 15.000 – 25.000' },
  { id: 'apem-kesesi', kategori: 'kuliner', nama: 'Apem Kesesi', area: 'Kesesi', img: img('cake,traditional,javanese'), desc: 'Kue apem tepung beras dengan gula merah, manis dan kenyal.', jam: '06:00 — 18:00', tiket: 'Rp 2.000 / pcs' },
  { id: 'iwak-panggang', kategori: 'kuliner', nama: 'Iwak Panggang', area: 'Pesisir', img: img('grilled,fish,coconut'), desc: 'Ikan laut segar dibakar dengan sambal kecombrang khas pesisir.', jam: '11:00 — 22:00', tiket: 'Rp 30.000 – 60.000' },
  { id: 'kluban', kategori: 'kuliner', nama: 'Kluban Bothok', area: 'Pekalongan', img: img('vegetable,salad,javanese'), desc: 'Urap sayur khas dengan bothok kelapa parut berbumbu.', jam: '06:00 — 14:00', tiket: 'Rp 8.000 – 15.000' },
  { id: 'hayam-wuruk', kategori: 'kuliner', nama: 'Sentra Kuliner Hayam Wuruk', area: 'Pekalongan Barat', img: img('street,food,nightmarket'), desc: 'Jalan kuliner malam paling ramai dengan puluhan gerobak khas.', jam: '17:00 — 02:00', tiket: 'Bervariasi' },
  { id: 'sorogenen', kategori: 'kuliner', nama: 'Pasar Sorogenen', area: 'Pekalongan Timur', img: img('marketplace,night,asia'), desc: 'Pasar malam dengan ratusan jajanan tradisional dan pesisir.', jam: '17:00 — 24:00', tiket: 'Bervariasi' },
  { id: 'grosir-setono', kategori: 'belanja', nama: 'Pasar Grosir Setono', area: 'Pekalongan Timur', img: img('market,fabric,batik'), desc: 'Pusat grosir batik terbesar, 1000+ toko dalam satu kompleks.', jam: '08:00 — 17:00', tiket: 'Gratis' },
  { id: 'ibc-shop', kategori: 'belanja', nama: 'International Batik Center', area: 'Wiradesa', img: img('mall,batik,shopping'), desc: 'Mall batik modern dengan brand premium dan kafe.', jam: '08:00 — 21:00', tiket: 'Gratis' },
  { id: 'banjarsari', kategori: 'belanja', nama: 'Pasar Banjarsari', area: 'Pekalongan Barat', img: img('traditional,market,asia'), desc: 'Pasar tradisional terbesar untuk oleh-oleh dan bahan baku khas.', jam: '05:00 — 17:00', tiket: 'Gratis' },
  { id: 'atbm-medono', kategori: 'belanja', nama: 'Sentra Kerajinan ATBM Medono', area: 'Medono', img: img('weaving,loom,craft'), desc: 'Sentra alat tenun bukan mesin, hasilkan tenun kontemporer.', jam: '08:00 — 16:00', tiket: 'Gratis' },
  { id: 'canting', kategori: 'belanja', nama: 'Kampung Canting Landungsari', area: 'Landungsari', img: img('craft,metal,traditional'), desc: 'Pengrajin canting batik dari kuningan, profesi langka.', jam: '08:00 — 16:00', tiket: 'Gratis' },
  { id: 'oleh-oleh', kategori: 'belanja', nama: 'Oleh-oleh Khas (Kerupuk Usek, Limun Oriental)', area: 'Berbagai Toko', img: img('snacks,indonesia,heritage'), desc: 'Toko-toko legendaris penjual oleh-oleh khas pesisir.', jam: '08:00 — 21:00', tiket: 'Gratis' },
];

const CATEGORIES = [
  { id: 'alam', label: 'Wisata Alam', icon: '🌊', sub: 'Pantai, curug, dan hutan tropis Petungkriyono' },
  { id: 'religi', label: 'Wisata Religi', icon: '🕌', sub: 'Masjid, makam keramat, dan pesantren' },
  { id: 'budaya', label: 'Wisata Budaya', icon: '🎭', sub: 'Batik, museum, dan kesenian tradisional' },
  { id: 'kuliner', label: 'Wisata Kuliner', icon: '🍜', sub: 'Sego megono, tauto, dan jajanan pesisir' },
  { id: 'belanja', label: 'Wisata Belanja', icon: '🛍️', sub: 'Grosir batik dan kerajinan tangan' },
];

const REGIONS = [
  { id: 'utara', label: 'Pekalongan Utara', x: 50, y: 24, desc: 'Pesisir, pelabuhan, dan pantai-pantai ikonik kota — Pantai Pasir Kencana, Slamaran, dan Klenteng Po An Thian.', symbol: 'wave', element: 'Air' },
  { id: 'barat', label: 'Pekalongan Barat', x: 28, y: 50, desc: 'Heritage kolonial, alun-alun, Masjid Agung, dan Kampung Batik Pesindon.', symbol: 'mosque', element: 'Religi' },
  { id: 'timur', label: 'Pekalongan Timur', x: 72, y: 50, desc: 'Kampung Kauman, Museum Batik, dan sentra batik Setono.', symbol: 'batik', element: 'Batik' },
  { id: 'selatan', label: 'Pekalongan Selatan', x: 50, y: 76, desc: 'Pemukiman santri, pasar tradisional, dan Pindang Tetel khas.', symbol: 'rice', element: 'Bumi' },
];

const SPOTLIGHTS = [
  { id: 'batik', title: 'Batik Pekalongan', desc: 'Diakui UNESCO sebagai warisan budaya dunia. Setiap motif menyimpan cerita pesisir nan beragam.', img: img('batik,colorful,pattern') },
  { id: 'megono', title: 'Sego Megono', desc: 'Sarapan ritual warga Pekalongan: nasi urap nangka muda yang gurih dan harum.', img: img('rice,indonesian,banana,leaf') },
  { id: 'tauto', title: 'Tauto', desc: 'Soto khas dengan kuah tauco yang dalam — perpaduan akulturasi Tionghoa-Jawa pesisir.', img: img('soup,beef,asian') },
  { id: 'syawalan', title: 'Syawalan Krapyak', desc: 'Tradisi lopis raksasa pasca-lebaran yang menarik puluhan ribu pengunjung.', img: img('festival,javanese,celebration') },
  { id: 'sintren', title: 'Tari Sintren', desc: 'Seni mistik pesisir yang masih lestari di desa-desa pinggir laut.', img: img('dance,traditional,indonesia') },
  { id: 'kanal', title: 'Kanal Belanda', desc: 'Jejak hidraulik kolonial yang membentuk wajah kota lama Pekalongan.', img: img('canal,colonial,boat') },
];

// Helper builders for event detail
const evt = (o) => ({
  status: 'upcoming', tiket: [], jadwal: [], galeri: [], tips: [], tags: [],
  penyelenggara: { nama: 'Dinas Kebudayaan, Pariwisata, Pemuda dan Olahraga Kota Pekalongan', kontak: '(0285) 421-200', ig: '@disporapar.pekalongan' },
  ...o,
});

const EVENTS = [
  evt({
    id: 'e1', slug: 'pekan-batik-nusantara-2026', title: 'Pekan Batik Nusantara 2026', cat: 'budaya',
    date: '01 Okt 2026 – 07 Okt 2026', dateStart: '2026-10-01', dateEnd: '2026-10-07', month: 10, status: 'upcoming',
    lokasi: { nama: 'Lapangan Jetayu', alamat: 'Jl. Jetayu, Pekalongan Utara', lat: -6.8740, lng: 109.6750 },
    img: img('batik,festival,parade'),
    galeri: [img('batik,parade'), img('batik,exhibition'), img('batik,workshop'), img('batik,dance'), img('batik,model'), img('batik,fashion')],
    desc: 'Festival batik nasional terbesar dengan parade, pameran, dan workshop dari pengrajin seluruh nusantara.',
    descLong: [
      'Pekan Batik Nusantara adalah perhelatan tahunan yang menjadi puncak kalender budaya Pekalongan. Selama tujuh hari penuh, Lapangan Jetayu disulap menjadi galeri raksasa yang menampilkan ribuan motif batik dari Sabang sampai Merauke.',
      'Diinisiasi sejak 2008, festival ini mempertemukan pengrajin tradisional dengan desainer kontemporer, akademisi, dan kolektor internasional. Tahun ini, tema "Batik Pesisir, Akar Dunia" mengangkat kekayaan motif pesisir utara Jawa.',
      'Pengunjung dapat menikmati parade busana batik, kompetisi membatik kilat, talkshow budaya, hingga bazar oleh-oleh khas. Edisi 2026 juga menghadirkan paviliun kolaborasi dengan Jepang, India, dan Malaysia.',
    ],
    jadwal: [
      { hari: 1, tanggal: '1 Okt 2026', acara: [['08:00', 'Pembukaan Resmi & Tari Sintren'], ['10:00', 'Pawai Batik Nusantara'], ['14:00', 'Pameran Koleksi UNESCO'], ['19:30', 'Konser Musik Pesisir']] },
      { hari: 2, tanggal: '2 Okt 2026', acara: [['09:00', 'Workshop Batik Tulis (Open)'], ['13:00', 'Talkshow Akademisi Batik'], ['20:00', 'Fashion Show Desainer Muda']] },
      { hari: 3, tanggal: '3 Okt 2026', acara: [['09:00', 'Kompetisi Membatik Kilat'], ['15:00', 'Diskusi Ekspor Batik']] },
      { hari: 7, tanggal: '7 Okt 2026', acara: [['19:00', 'Malam Penghargaan'], ['21:00', 'Penutupan & Pesta Rakyat']] },
    ],
    tiket: [
      { kat: 'Gratis (Pameran)', harga: 'Rp 0', fasilitas: 'Akses pameran dan parade', tersedia: true },
      { kat: 'Workshop', harga: 'Rp 75.000', fasilitas: 'Alat & kain mori 30×30 cm', tersedia: true },
      { kat: 'Fashion Show VIP', harga: 'Rp 250.000', fasilitas: 'Kursi VIP + welcome drink + goodie bag', tersedia: true },
    ],
    tips: ['Datang sebelum jam 4 sore untuk parade utama', 'Bawa topi/payung — area outdoor', 'Workshop terbatas 50 peserta/hari, daftar online', 'Tersedia mushola, kursi roda, dan stroller rental'],
    tags: ['batik', 'budaya', 'festival', 'fashion'],
  }),
  evt({
    id: 'e2', slug: 'syawalan-lopis-raksasa', title: 'Syawalan Lopis Raksasa Krapyak', cat: 'keagamaan',
    date: '20 Apr 2026 – 27 Apr 2026', dateStart: '2026-04-20', dateEnd: '2026-04-27', month: 4, status: 'upcoming',
    lokasi: { nama: 'Kampung Krapyak', alamat: 'Krapyak Lor, Pekalongan Utara', lat: -6.8810, lng: 109.6720 },
    img: img('cake,festival,javanese'),
    galeri: [img('lopis,javanese'), img('crowd,festival'), img('celebration,asia'), img('tradition,java')],
    desc: 'Tradisi pasca-lebaran membuat lopis raksasa setinggi 2 meter sebagai simbol perekat persaudaraan.',
    descLong: [
      'Syawalan adalah perayaan tujuh hari setelah Idul Fitri yang khas Pekalongan Utara. Puncaknya adalah pemotongan lopis raksasa setinggi 1,5–2 meter dengan diameter 1 meter, yang dibagi-bagi untuk warga.',
      'Tradisi ini sudah berlangsung sejak abad ke-19, dimulai dari para nelayan Krapyak yang merayakan kemenangan puasa dengan saling berbagi makanan dari beras ketan. Tahun 2024, Syawalan Krapyak ditetapkan sebagai Warisan Budaya Tak Benda Nasional.',
      'Selain pemotongan lopis, ada parade kostum karnaval, pertunjukan rebana, dan bazar kuliner pesisir. Acara dihadiri puluhan ribu pengunjung dari berbagai kota.',
    ],
    jadwal: [
      { hari: 1, tanggal: '20 Apr 2026', acara: [['07:00', 'Tahlilan & Doa Bersama'], ['10:00', 'Karnaval Budaya'], ['14:00', 'Lomba Bersih Pantai']] },
      { hari: 7, tanggal: '27 Apr 2026', acara: [['08:00', 'Prosesi Pemotongan Lopis Raksasa'], ['10:00', 'Pembagian Lopis ke Warga'], ['13:00', 'Pesta Rakyat & Rebana']] },
    ],
    tiket: [{ kat: 'Umum', harga: 'Gratis', fasilitas: 'Akses seluruh acara', tersedia: true }],
    tips: ['Datang pagi untuk dapat lopis', 'Parkir tersebar — sediakan ojek online', 'Bawa kantong belanja untuk membawa lopis'],
    tags: ['keagamaan', 'tradisi', 'syawalan', 'lopis'],
  }),
  evt({ id: 'e3', slug: 'festival-sintren', title: 'Festival Sintren Pekalongan', cat: 'seni', date: '12 Jun 2026 – 14 Jun 2026', dateStart: '2026-06-12', dateEnd: '2026-06-14', month: 6, status: 'upcoming', lokasi: { nama: 'Alun-alun Pekalongan', alamat: 'Jl. Alun-alun, Pekalongan Barat' }, img: img('javanese,dance,traditional'), galeri: [img('sintren,dance'), img('javanese,mystic'), img('traditional,performance')], desc: 'Pertunjukan tari mistik pesisir dengan iringan gamelan dan kemenyan.', descLong: ['Festival Sintren mengumpulkan grup-grup sintren dari berbagai desa pesisir untuk tampil bergantian selama tiga malam.', 'Tari sintren melibatkan penari muda yang dimasukkan ke dalam kurungan ayam berlapis kain dan keluar dalam keadaan trance dengan kostum lengkap — sebuah ritual yang sudah berusia ratusan tahun.', 'Festival ini bagian dari pelestarian seni tradisi yang terancam punah, dengan dukungan dari kolektor dan akademisi seni Indonesia.'], jadwal: [{ hari: 1, tanggal: '12 Jun', acara: [['19:00', 'Pembukaan & Sintren Krapyak'], ['21:00', 'Sintren Pesindon']] }, { hari: 2, tanggal: '13 Jun', acara: [['19:00', 'Sintren Wiradesa'], ['21:00', 'Sintren Tirto']] }], tiket: [{ kat: 'Umum', harga: 'Rp 25.000', fasilitas: 'Akses pertunjukan', tersedia: true }], tips: ['Acara malam — bawa jaket tipis', 'Dilarang flash saat penari trance'], tags: ['seni', 'tradisi', 'mistik'] }),
  evt({ id: 'e4', slug: 'pekalongan-carnival-2026', title: 'Pekalongan Carnival 2026', cat: 'budaya', date: '08 Sep 2026 – 09 Sep 2026', dateStart: '2026-09-08', dateEnd: '2026-09-09', month: 9, status: 'upcoming', lokasi: { nama: 'Jl. Hayam Wuruk', alamat: 'Sepanjang Hayam Wuruk, Pekalongan Barat' }, img: img('carnival,costume,asia'), galeri: [img('carnival,parade'), img('costume,colorful')], desc: 'Parade kostum berbahan batik karya ratusan desainer lokal.', descLong: ['Pekalongan Carnival adalah parade kostum tahunan yang menempatkan batik sebagai pusat ekspresi mode kontemporer.', 'Setiap tahun diikuti oleh 500+ peserta dari berbagai sekolah desain dan studio independen.'], jadwal: [{ hari: 1, tanggal: '8 Sep', acara: [['15:00', 'Parade Anak'], ['19:00', 'Parade Utama']] }], tiket: [{ kat: 'Umum', harga: 'Gratis', fasilitas: 'Akses sepanjang rute', tersedia: true }], tips: ['Ambil posisi di simpang Hayam Wuruk-Diponegoro untuk foto terbaik'], tags: ['budaya', 'fashion', 'parade'] }),
  evt({ id: 'e5', slug: 'nyadran-sedekah-laut', title: 'Nyadran Sedekah Laut', cat: 'keagamaan', date: '03 Agu 2026', dateStart: '2026-08-03', dateEnd: '2026-08-03', month: 8, status: 'upcoming', lokasi: { nama: 'Pantai Pasir Kencana', alamat: 'Pantai Pasir Kencana, Pekalongan Utara' }, img: img('boat,fisherman,ritual'), galeri: [img('fisherman,boat'), img('offering,sea')], desc: 'Ritual nelayan melarung sesaji ke laut sebagai wujud syukur.', descLong: ['Nyadran adalah tradisi pesisir yang dilakukan setahun sekali oleh nelayan Pekalongan untuk memohon keselamatan dan rezeki dari laut.', 'Sesaji berupa kepala kerbau, hasil bumi, dan ubarampe dilarung dengan kapal hias yang melaju ke tengah laut.'], jadwal: [{ hari: 1, tanggal: '3 Agu', acara: [['06:00', 'Doa Bersama'], ['08:00', 'Pelarungan Sesaji'], ['10:00', 'Selamatan']] }], tiket: [{ kat: 'Pengunjung', harga: 'Gratis', fasilitas: 'Akses pantai', tersedia: true }], tips: ['Datang subuh untuk lihat persiapan kapal', 'Hormati prosesi ritual'], tags: ['keagamaan', 'tradisi', 'nelayan'] }),
  evt({ id: 'e6', slug: 'khataman-akbar', title: "Khataman Akbar Pekalongan", cat: 'keagamaan', date: '14 Mei 2026', dateStart: '2026-05-14', dateEnd: '2026-05-14', month: 5, status: 'upcoming', lokasi: { nama: "Masjid Agung Al-Jami'", alamat: 'Jl. Alun-alun, Pekalongan Barat' }, img: img('mosque,prayer,indonesia'), desc: 'Khataman Al-Quran serentak diikuti ribuan santri Pekalongan.', descLong: ['Diselenggarakan setiap pertengahan Ramadhan, acara ini mempertemukan ribuan santri dari pesantren se-Pekalongan untuk khataman bersama.'], tiket: [{ kat: 'Umum', harga: 'Gratis', fasilitas: 'Akses masjid & buka bersama', tersedia: true }], tips: ['Datang setelah ashar', 'Dress code: pakaian muslim sopan'], tags: ['keagamaan', 'ramadhan'] }),
  evt({ id: 'e7', slug: 'pekalongan-culinary-festival', title: 'Pekalongan Culinary Festival', cat: 'kuliner', date: '22 Jul 2026 – 25 Jul 2026', dateStart: '2026-07-22', dateEnd: '2026-07-25', month: 7, status: 'upcoming', lokasi: { nama: 'Lapangan Mataram', alamat: 'Jl. Mataram, Pekalongan Barat' }, img: img('street,food,indonesia'), galeri: [img('food,festival'), img('street,food'), img('indonesian,cuisine')], desc: 'Pesta kuliner 100+ tenant menyajikan masakan khas Pekalongan dan nusantara.', descLong: ['Festival kuliner terbesar di pesisir utara Jawa, menampilkan sego megono, tauto, garang asem, pindang tetel, dan inovasi kuliner kontemporer.', 'Setiap hari ada demo masak dari chef ternama dan lomba kuliner antar UMKM.'], jadwal: [{ hari: 1, tanggal: '22 Jul', acara: [['16:00', 'Pembukaan'], ['18:00', 'Demo Masak Sego Megono']] }, { hari: 2, tanggal: '23 Jul', acara: [['16:00', 'Lomba Tauto Terbaik']] }], tiket: [{ kat: 'Masuk', harga: 'Rp 10.000', fasilitas: 'Akses + voucher Rp 5.000', tersedia: true }], tips: ['Datang lapar', 'Tukar uang tunai di pintu masuk untuk pembayaran tenant'], tags: ['kuliner', 'festival', 'umkm'] }),
  evt({ id: 'e8', slug: 'walikota-cup-burung', title: 'Lomba Burung Berkicau Walikota Cup', cat: 'olahraga', date: '11 Mar 2026', dateStart: '2026-03-11', dateEnd: '2026-03-11', month: 3, status: 'past', lokasi: { nama: 'Stadion Hoegeng', alamat: 'Stadion Hoegeng, Pekalongan' }, img: img('bird,cage,competition'), galeri: [img('bird,kicau'), img('competition,bird')], desc: 'Lomba kicau burung tingkat nasional dengan ratusan peserta.', descLong: ['Walikota Cup adalah kompetisi tahunan untuk komunitas kicau mania se-Jawa.'], tiket: [{ kat: 'Penonton', harga: 'Gratis', fasilitas: 'Akses tribun', tersedia: false }], tags: ['olahraga', 'komunitas'] }),
  evt({ id: 'e9', slug: 'pekalongan-coffee-festival', title: 'Pekalongan Coffee Festival', cat: 'kuliner', date: '04 Nov 2026 – 06 Nov 2026', dateStart: '2026-11-04', dateEnd: '2026-11-06', month: 11, status: 'upcoming', lokasi: { nama: 'International Batik Center', alamat: 'IBC Wiradesa, Kab. Pekalongan' }, img: img('coffee,festival,latte'), galeri: [img('coffee,barista'), img('coffee,latte')], desc: 'Pameran kopi spesialti dari petani Petungkriyono dan kompetisi barista.', descLong: ['Kopi Petungkriyono mulai diakui sebagai single origin Jawa Tengah. Festival ini menghubungkan petani langsung dengan roastery dan konsumen.'], tiket: [{ kat: 'Day Pass', harga: 'Rp 50.000', fasilitas: 'Akses + 3 kupon cupping', tersedia: true }], tips: ['Datang pagi untuk cupping session terbaik'], tags: ['kuliner', 'kopi', 'umkm'] }),
  evt({ id: 'e10', slug: 'festival-petungkriyono', title: 'Festival Petungkriyono 2026', cat: 'budaya', date: '17 Agu 2026', dateStart: '2026-08-17', dateEnd: '2026-08-17', month: 8, status: 'upcoming', lokasi: { nama: 'Lapangan Petungkriyono', alamat: 'Kec. Petungkriyono, Kab. Pekalongan' }, img: img('mountain,festival,village'), desc: 'Perayaan kemerdekaan ala desa pegunungan dengan kesenian khas.', descLong: ['Petungkriyono merayakan 17 Agustus dengan kompetisi panjat pinang raksasa, kesenian topeng, dan pawai obor di malam hari.'], tiket: [{ kat: 'Umum', harga: 'Gratis', fasilitas: 'Akses seluruh acara', tersedia: true }], tips: ['Bawa jaket — udara dingin malam'], tags: ['budaya', 'kemerdekaan'] }),
  evt({ id: 'e11', slug: 'batik-run-10k', title: 'Pekalongan Batik Run 10K', cat: 'olahraga', date: '06 Sep 2026', dateStart: '2026-09-06', dateEnd: '2026-09-06', month: 9, status: 'upcoming', lokasi: { nama: 'Alun-alun Kota', alamat: 'Alun-alun Pekalongan, Pekalongan Barat' }, img: img('running,marathon,city'), desc: 'Lomba lari 5K & 10K dengan jersey bermotif batik.', descLong: ['Batik Run sudah berlangsung sejak 2019 dan menjadi event lari paling instagrammable di pesisir.'], tiket: [{ kat: '5K', harga: 'Rp 200.000', fasilitas: 'Jersey batik + medali + race pack', tersedia: true }, { kat: '10K', harga: 'Rp 300.000', fasilitas: 'Jersey batik + medali + race pack + voucher kuliner', tersedia: true }], tips: ['Pendaftaran online via website', 'Race pack collection 1 hari sebelumnya'], tags: ['olahraga', 'lari'] }),
  evt({ id: 'e12', slug: 'pameran-lukisan-pesisir', title: 'Pameran Lukisan Pesisir', cat: 'seni', date: '02 Mei 2026 – 16 Mei 2026', dateStart: '2026-05-02', dateEnd: '2026-05-16', month: 5, status: 'past', lokasi: { nama: 'Museum Batik', alamat: 'Jl. Jetayu, Pekalongan Utara' }, img: img('painting,gallery,art'), galeri: [img('painting,art'), img('gallery,exhibition')], desc: 'Pameran karya 30 pelukis pesisir Jawa dengan tema laut dan batik.', descLong: ['Pameran dua minggu yang menampilkan 80 lukisan dari pelukis Pekalongan, Cirebon, dan Lasem.'], tiket: [{ kat: 'Umum', harga: 'Rp 10.000', fasilitas: 'Akses pameran', tersedia: false }], tags: ['seni', 'pameran'] }),
];

const BERITA = [
  { id: 'b1', title: 'Pekan Batik Nusantara 2026 Siap Hadir, Pekalongan Bersolek', date: '08 Mei 2026', kategori: 'Event', img: img('batik,pattern,red') },
  { id: 'b2', title: 'Mengulik Filosofi Motif Jlamprang, Permata Kampung Kauman', date: '02 Mei 2026', kategori: 'Budaya', img: img('batik,jlamprang,blue') },
  { id: 'b3', title: 'Petualangan Tubing di Black Canyon Petungkriyono', date: '28 Apr 2026', kategori: 'Pariwisata', img: img('canyon,river,adventure') },
  { id: 'b4', title: 'Resep Rahasia Tauto: Kunci Ada di Tauconya', date: '24 Apr 2026', kategori: 'Kuliner', img: img('soup,asian,herb') },
  { id: 'b5', title: 'Syawalan Krapyak: Lopis Setinggi 2 Meter Pecahkan Rekor', date: '20 Apr 2026', kategori: 'Event', img: img('cake,celebration,javanese') },
  { id: 'b6', title: 'UMKM Batik Cap Bertahan Lewat Ekspor ke Eropa', date: '18 Apr 2026', kategori: 'UMKM', img: img('craft,batik,stamp') },
  { id: 'b7', title: 'Gereja GPIB Immanuel Selesai Direstorasi', date: '15 Apr 2026', kategori: 'Heritage', img: img('colonial,church,white') },
  { id: 'b8', title: '5 Spot Foto Tersembunyi di Linggoasri', date: '12 Apr 2026', kategori: 'Tips Wisata', img: img('mountain,view,green') },
  { id: 'b9', title: 'Sego Megono: Sarapan Wajib di Pagi Pekalongan', date: '10 Apr 2026', kategori: 'Kuliner', img: img('rice,green,traditional') },
  { id: 'b10', title: 'Festival Sintren Kembali Ramaikan Pesisir', date: '06 Apr 2026', kategori: 'Event', img: img('javanese,trance,traditional') },
  { id: 'b11', title: 'Curug Bajing Tutup Sementara untuk Konservasi', date: '02 Apr 2026', kategori: 'Pariwisata', img: img('waterfall,forest,wild') },
  { id: 'b12', title: 'Owa Jawa: Penjaga Hutan Sokokembang', date: '28 Mar 2026', kategori: 'Pariwisata', img: img('monkey,rainforest,wild') },
];

window.PP_DATA = { DESTINASI, CATEGORIES, REGIONS, SPOTLIGHTS, EVENTS, BERITA };

// ============ Detail enrichment ============
// Slugs
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
DESTINASI.forEach(d => { d.slug = d.slug || d.id; });
BERITA.forEach(b => { b.slug = b.slug || slugify(b.title); });

// Per-destinasi rich detail (handwritten for hero spots, fallback for others)
const DESTINASI_DETAIL = {
  'pasir-kencana': {
    galeri: [img('beach,jetty,sunset',900,600), img('beach,sand,palm',900,600), img('seafood,grill',900,600), img('boat,fisherman,morning',900,600), img('beach,kids,family',900,600)],
    descLong: [
      'Pantai Pasir Kencana adalah jantung wisata pesisir Kota Pekalongan. Letaknya hanya 4,5 km dari pusat kota, menjadikannya destinasi paling mudah dijangkau bagi wisatawan yang baru tiba dari stasiun atau terminal.',
      'Ikon pantai ini adalah dermaga sepanjang 350 meter yang menjorok ke laut. Berjalan di ujung dermaga saat sore hari, Anda bisa menyaksikan kapal-kapal nelayan kembali ke pelabuhan diiringi semburat matahari terbenam — pemandangan yang sudah menjadi langganan fotografer.',
      'Pantai ini juga dilengkapi gazebo, area bermain anak, panggung outdoor untuk pertunjukan akhir pekan, serta deretan warung yang menjual ikan bakar, kerang rebus, dan es kelapa muda dengan harga terjangkau.',
    ],
    sejarah: 'Dibuka secara resmi pada 1978 sebagai bagian dari proyek revitalisasi pantai utara, Pasir Kencana awalnya hanya berupa pantai nelayan biasa. Renovasi besar tahun 2019 menambahkan dermaga modern dan ruang publik yang ramah keluarga.',
    highlights: ['Dermaga 350 meter dengan spot foto sunset', 'Panggung outdoor untuk live music akhir pekan', 'Warung ikan bakar segar dari TPI sebelah', 'Area bermain anak dan persewaan banana boat'],
    fasilitas: ['Toilet & musholla', 'Parkir motor & mobil', 'Persewaan tikar', 'Pos kesehatan', 'Wifi gratis', 'Aksesibel kursi roda'],
    tips: ['Datang jam 16.00–18.00 untuk sunset terbaik', 'Hindari weekend siang jika tidak suka ramai', 'Coba ikan kakap bakar di warung Pak Slamet ujung dermaga', 'Tiket parkir terpisah Rp 5.000 motor, Rp 10.000 mobil'],
    alamat: 'Jl. WR. Supratman No. 73, Panjang Wetan, Pekalongan Utara',
    rating: 4.5,
    review_count: 1247,
  },
  'curug-bajing': {
    galeri: [img('waterfall,jungle',900,600), img('hiking,forest,green',900,600), img('rainforest,mist',900,600), img('water,natural',900,600)],
    descLong: [
      'Curug Bajing menjulang setinggi 75 meter di tengah hutan hujan tropis Petungkriyono — salah satu air terjun tertinggi di Jawa Tengah. Lokasinya 38 km dari pusat kota, perjalanan 1,5 jam melewati jalan pegunungan yang berkelok.',
      'Trek menuju air terjun memakan waktu 15 menit dengan kemiringan ringan, melalui jembatan kayu yang membentang di atas sungai. Suara air yang menggemuruh terdengar dari kejauhan sebelum Anda tiba di kolam jatuhnya.',
      'Karena berada di kawasan konservasi, Curug Bajing tetap perawan — tidak ada bangunan permanen di sekitarnya. Kabut tipis sering menyelimuti area air terjun saat pagi, memberikan suasana mistis yang khas.',
    ],
    sejarah: '"Bajing" dalam bahasa Jawa berarti tupai — dahulu populasi tupai sangat banyak di sekitar air terjun ini. Curug Bajing baru dibuka untuk umum pada 2014 sebagai bagian dari ekowisata desa Kayupuring.',
    highlights: ['Air terjun setinggi 75 meter', 'Trek pendek 15 menit dari pos masuk', 'Spot foto rainbow saat pagi cerah', 'Habitat asli flora langka Petungkriyono'],
    fasilitas: ['Pos retribusi', 'Toilet sederhana', 'Parkir', 'Warung di pintu masuk', 'Pemandu desa (opsional)'],
    tips: ['Kunjungi pagi 08–10 untuk pelangi air terjun', 'Sepatu trekking wajib — jalur licin saat basah', 'Bawa jaket — udara di bawah 18°C', 'Sinyal HP minim — beritahu keluarga sebelum berangkat'],
    alamat: 'Desa Kayupuring, Kec. Petungkriyono, Kab. Pekalongan',
    rating: 4.8,
    review_count: 893,
  },
  'museum-batik': {
    galeri: [img('batik,museum,exhibition',900,600), img('batik,canting,wax',900,600), img('batik,pattern,blue',900,600), img('batik,fabric,red',900,600), img('craftsman,batik',900,600)],
    descLong: [
      'Museum Batik Pekalongan adalah museum batik terlengkap di Indonesia, menempati gedung kantor balaikota lama berarsitektur kolonial 1906. Diresmikan oleh Presiden SBY pada 2006, museum ini menjadi pusat penelitian dan pelestarian batik nusantara.',
      'Koleksi museum mencakup lebih dari 1.500 helai batik dari Aceh sampai Papua, dengan fokus khusus pada batik pesisir utara Jawa. Galeri unggulan menampilkan motif Jlamprang, Buketan, dan Hokokai yang menjadi ciri khas Pekalongan.',
      'Selain pameran, museum menyediakan workshop membatik 90 menit dengan instruktur bersertifikat. Anda akan diajak mengenal canting, malam, dan teknik dasar batik tulis hingga membawa pulang karya sendiri.',
    ],
    sejarah: 'Gedung museum awalnya kantor administrasi pemerintahan kolonial Hindia Belanda. Setelah kemerdekaan, beralih fungsi sebagai kantor walikota hingga 2006, lalu diresmikan sebagai Museum Batik Nasional.',
    highlights: ['1.500+ koleksi batik nusantara', 'Workshop membatik untuk semua usia', 'Gedung kolonial 1906 yang bersejarah', 'Perpustakaan batik dengan literatur langka'],
    fasilitas: ['AC seluruh ruangan', 'Toilet bersih', 'Parkir luas', 'Toko suvenir', 'Kafe & resto', 'Tour pemandu (Bahasa & English)'],
    tips: ['Datang weekday untuk pengalaman lebih intim', 'Booking workshop online H-3', 'Foto diperbolehkan tanpa flash', 'Kombinasi kunjungan dengan Kampung Kauman (3 menit jalan kaki)'],
    alamat: 'Jl. Jetayu No. 1, Panjang Wetan, Pekalongan Utara',
    rating: 4.7,
    review_count: 2156,
  },
  'kauman': {
    galeri: [img('batik,village,kampung',900,600), img('batik,canting',900,600), img('alley,colorful,asia',900,600), img('batik,craftswoman',900,600)],
    descLong: [
      'Kampung Batik Kauman adalah jantung batik tulis halus Pekalongan. Berada tepat di belakang Masjid Agung Al-Jami\', kampung ini menyimpan 60+ rumah produksi batik dari generasi ketiga hingga kelima.',
      'Berjalan di gang-gang sempit Kauman, Anda akan mendengar denting canting beradu lilin di setiap rumah. Ibu-ibu pembatik duduk bersila menghadap kain mori, menorehkan motif yang kadang butuh berbulan-bulan untuk satu helai.',
      'Sebagian rumah membuka showroom yang menjual langsung tanpa perantara — harga 40-60% di bawah harga toko. Beberapa workshop juga menerima trial gratis 30 menit.',
    ],
    sejarah: 'Nama "Kauman" merujuk pada komunitas Muslim taat yang tinggal dekat masjid. Tradisi batik di Kauman dimulai dari para istri ulama abad 18 yang membuat batik sebagai sumber penghidupan sambil menunggu suami pulang berdagang.',
    highlights: ['60+ rumah produksi batik aktif', 'Demo membatik gratis di showroom', 'Beli langsung dari pengrajin tanpa makelar', 'Mural batik raksasa di gang utama'],
    fasilitas: ['Kantor info wisata', 'Toilet di rumah warga (donasi)', 'Showroom-showroom AC', 'Kafe lokal "Kopi Tjanting"'],
    tips: ['Datang jam 09.00–14.00 saat pembatik bekerja', 'Hormati privasi rumah — minta izin sebelum foto', 'Sediakan budget Rp 200rb–2jt untuk batik tulis', 'Hari Jumat sebagian rumah tutup untuk ibadah'],
    alamat: 'Kel. Kauman, Pekalongan Timur',
    rating: 4.6,
    review_count: 1832,
  },
  'aljami': {
    galeri: [img('mosque,javanese,white',900,600), img('mosque,prayer,interior',900,600), img('minaret,asia',900,600)],
    descLong: [
      'Masjid Agung Al-Jami\' berdiri di sisi barat alun-alun Pekalongan sejak 1852. Arsitekturnya memadukan atap tumpang khas Jawa, lengkungan Arab, dan ornamen kolonial Belanda — menjadi simbol akulturasi yang khas pesisir utara.',
      'Masjid ini mampu menampung 15.000 jamaah saat hari raya, dengan halaman luas yang menyatu dengan alun-alun. Pada malam Jumat, kawasan ini ramai dengan jamaah tahlilan dan pedagang kaki lima yang menjajakan kuliner khas.',
    ],
    sejarah: 'Didirikan oleh KH. Bagus Kunyitan pada 1852 atas restu Bupati Pekalongan, masjid ini sempat dipugar tiga kali (1906, 1958, 2015) dengan tetap mempertahankan struktur tumpang asli.',
    highlights: ['Arsitektur akulturasi Jawa-Arab-Kolonial', 'Kapasitas 15.000 jamaah', 'Pusat kegiatan keagamaan kota', 'Tahlilan malam Jumat dengan jamaah ribuan'],
    fasilitas: ['Tempat wudhu luas', 'Toilet & kamar mandi', 'Tempat parkir', 'Ruang khusus wanita', 'Aksesibel kursi roda'],
    tips: ['Datang sholat Jumat untuk pengalaman lokal', 'Pakaian sopan dan tertutup', 'Jelajahi alun-alun setelah Maghrib untuk kuliner', 'Wisata gratis namun donasi disambut'],
    alamat: 'Jl. Alun-alun No. 1, Pekalongan Barat',
    rating: 4.8,
    review_count: 3421,
  },
  'sego-megono': {
    galeri: [img('rice,megono,javanese',900,600), img('jackfruit,curry',900,600), img('street,food,indonesian',900,600)],
    descLong: [
      'Sego Megono adalah identitas kuliner Pekalongan yang sudah ada sejak abad 18. "Megono" merujuk pada urap nangka muda parut yang dicampur kelapa berbumbu — disajikan di atas nasi hangat dengan lauk sederhana seperti tempe goreng, ikan asin, atau telur.',
      'Aromanya khas: harum daun jeruk, sereh, dan kunci yang berpadu dengan gurih kelapa parut. Setiap warung punya racikan bumbu sendiri yang dijaga turun-temurun. Beberapa warung legendaris di Hayam Wuruk sudah beroperasi sejak 1960-an.',
      'Tradisinya, sego megono disantap saat sarapan bersama teh tubruk panas. Warga lokal percaya makan megono di pagi hari memberikan stamina untuk seharian bekerja di pasar atau pelabuhan.',
    ],
    sejarah: 'Megono awalnya makanan rakyat para nelayan dan buruh batik. Bahannya murah (nangka muda dan kelapa melimpah di pesisir) namun mengenyangkan. Kini diakui sebagai Warisan Budaya Tak Benda Jawa Tengah (2019).',
    highlights: ['Sarapan ritual harian warga Pekalongan', 'Variasi lauk: tempe, ikan asin, mendoan', 'Aroma kunci & daun jeruk yang khas', 'Tersedia di hampir setiap warung pagi'],
    fasilitas: ['Tersebar di seluruh kota', 'Hampir semua warung halal', 'Beberapa buka 24 jam (Hayam Wuruk)', 'Harga ramah pelajar Rp 8rb–15rb'],
    tips: ['Pilih warung yang ramai = bumbunya terbukti', 'Cobalah versi "megono mendoan" untuk variasi', 'Pasangkan dengan teh tubruk Pekalongan', 'Hindari yang sudah dingin — aromanya hilang'],
    alamat: 'Tersebar — Rekomendasi: Megono Pak Toha (Jl. Hayam Wuruk), Megono Bu Sri (Jl. Diponegoro)',
    rating: 4.7,
    review_count: 4203,
  },
};

// Apply rich data to existing items
DESTINASI.forEach(d => {
  const detail = DESTINASI_DETAIL[d.id];
  if (detail) Object.assign(d, detail);
  // Defaults for ones without handwritten detail
  if (!d.galeri) d.galeri = [d.img, img(d.kategori + ',indonesia',900,600), img(d.area + ',java',900,600), img('travel,asia',900,600)];
  if (!d.descLong) d.descLong = [d.desc, `${d.nama} merupakan salah satu tujuan favorit kategori ${d.kategori} di ${d.area}. Lokasinya yang strategis dan suasananya yang khas menjadikannya kunjungan wajib bagi wisatawan yang ingin merasakan autentiknya Pekalongan.`, 'Disarankan untuk merencanakan kunjungan di luar musim hujan dan datang lebih pagi untuk pengalaman yang lebih intim.'];
  if (!d.highlights) d.highlights = ['Suasana khas Pekalongan yang autentik', 'Mudah dijangkau dari pusat kota', 'Cocok untuk kunjungan keluarga'];
  if (!d.fasilitas) d.fasilitas = ['Parkir', 'Toilet', 'Warung makan terdekat'];
  if (!d.tips) d.tips = ['Datang lebih pagi untuk menghindari ramai', 'Bawa kamera — banyak spot foto menarik', 'Kombinasikan dengan destinasi sekitar untuk hemat transport'];
  if (!d.alamat) d.alamat = `${d.area}, Pekalongan`;
  if (!d.rating) d.rating = (4 + Math.random()).toFixed(1) * 1;
  if (!d.review_count) d.review_count = Math.floor(Math.random() * 1500) + 200;
});

// Per-berita full article (handwritten for hero stories, fallback for others)
const BERITA_DETAIL = {
  'b1': {
    author: 'Rina Setiawati', authorRole: 'Reporter Pariwisata', authorAvatar: img('woman,journalist',200,200),
    readTime: '5 menit', tags: ['Batik', 'Festival', 'Pekan Batik 2026'],
    excerpt: 'Pekan Batik Nusantara 2026 dijadwalkan berlangsung 1–7 Oktober dengan tema "Batik Pesisir, Akar Dunia". Kota Pekalongan bersiap menyambut puluhan ribu pengunjung dari dalam dan luar negeri.',
    body: [
      'PEKALONGAN — Kota Batik Dunia bersiap menggelar perhelatan tahunan terbesarnya, Pekan Batik Nusantara, mulai 1 hingga 7 Oktober 2026. Festival yang sudah berlangsung sejak 2008 ini diperkirakan akan dihadiri lebih dari 80.000 pengunjung dari berbagai daerah dan mancanegara.',
      'Mengusung tema "Batik Pesisir, Akar Dunia", festival tahun ini akan mengangkat batik pesisir utara Jawa sebagai akar dari berbagai motif batik nusantara. Walikota Pekalongan, Salahudin, menyatakan bahwa Pekan Batik kali ini akan menjadi yang terbesar sepanjang sejarah penyelenggaraan.',
      '"Kami menyiapkan 200 booth pengrajin, paviliun kolaborasi internasional dengan Jepang, India, dan Malaysia, serta fashion show dengan desainer dari empat benua," jelas Salahudin dalam konferensi pers di Pendopo Walikota, Senin (5/5).',
      'Lapangan Jetayu akan disulap menjadi galeri raksasa selama tujuh hari. Pengunjung dapat menikmati parade busana batik, kompetisi membatik kilat, talkshow budaya bersama akademisi, hingga bazar oleh-oleh khas Pekalongan. Tak ketinggalan, workshop membatik terbuka untuk umum dengan kapasitas 50 peserta per hari.',
      'Salah satu daya tarik utama tahun ini adalah pameran khusus motif Jlamprang, motif batik geometris asli Kauman yang sudah diakui sebagai Warisan Budaya Tak Benda. Kurator pameran, Dr. Asti Wirawan dari Universitas Indonesia, menjelaskan bahwa motif Jlamprang akan ditampilkan dalam berbagai interpretasi kontemporer.',
      'Pemkot Pekalongan juga telah berkoordinasi dengan PT KAI untuk menambah jadwal kereta khusus selama festival, serta dengan asosiasi hotel untuk menjaga harga akomodasi tetap wajar. Pengunjung dianjurkan untuk memesan tiket dan akomodasi minimal sebulan sebelum festival.',
    ],
    quote: 'Pekan Batik bukan sekadar pameran. Ini adalah perayaan identitas yang menghubungkan Pekalongan dengan dunia.',
    quoteBy: 'Salahudin — Walikota Pekalongan',
    galeri: [img('batik,festival,parade',900,600), img('batik,workshop',900,600), img('batik,fashion,show',900,600), img('batik,exhibition,gallery',900,600)],
  },
  'b3': {
    author: 'Bayu Pratama', authorRole: 'Travel Writer', authorAvatar: img('man,traveler',200,200),
    readTime: '7 menit', tags: ['Petualangan', 'Petungkriyono', 'Adventure'],
    excerpt: 'Pengalaman tubing di Black Canyon Petungkriyono — tebing batu hitam, air sungai jernih, dan adrenalin yang sulit dilupakan.',
    body: [
      'PETUNGKRIYONO — Jam 6 pagi, udara masih dingin menusuk saat kami tiba di pos basecamp Black Canyon. Hutan tropis di sekitarnya masih berselimut kabut tipis, dan suara sungai yang menggemuruh terdengar dari kejauhan.',
      'Black Canyon adalah salah satu hidden gem Pekalongan yang baru populer dalam 3 tahun terakhir. Lokasinya di Kecamatan Petungkriyono, sekitar 50 km dari pusat kota, dengan perjalanan 1,5 jam menembus jalan pegunungan yang berkelok-kelok.',
      'Yang membuat tempat ini istimewa adalah formasi geologi tebing batu hitam yang membentuk ngarai sempit. Sungai jernih mengalir di antara tebing setinggi 15-20 meter, menciptakan jalur tubing alami sepanjang 1,2 km dengan beberapa jeram kecil yang aman untuk pemula.',
      'Pemandu kami, Pak Adi, memberikan briefing singkat sebelum kami diturunkan ke sungai dengan tube karet. "Tetap berkelompok, ikuti aba-aba, dan nikmati pemandangannya," pesannya sambil tersenyum.',
      'Selama 45 menit perjalanan, kami melewati formasi batu yang luar biasa indah. Cahaya pagi yang menerobos celah tebing menciptakan efek dramatis. Beberapa kali kami berhenti di kolam tenang untuk berenang atau sekadar berfoto di antara batu-batu raksasa.',
      'Highlight perjalanan adalah air terjun mini di tengah rute, dimana kami bisa melompat dari ketinggian 4 meter ke kolam dalam — tentu dengan pengawasan ketat pemandu. Aktivitas ini benar-benar memacu adrenalin sekaligus menyegarkan.',
      'Untuk yang ingin mencoba, basecamp menyediakan paket tubing Rp 150rb/orang sudah termasuk pemandu, peralatan, dan makan siang sederhana. Dianjurkan datang pagi sebelum jam 10 untuk debit air yang ideal. Pengunjung minimal harus bisa berenang dan dalam kondisi sehat.',
    ],
    quote: 'Tubing di Black Canyon mengingatkan saya pada arung jeram di Costa Rica — tapi dengan vibe yang lebih intim dan harga sepertiga.',
    quoteBy: 'Bayu Pratama — Travel Writer',
    galeri: [img('canyon,river,adventure',900,600), img('rafting,tubing',900,600), img('jungle,waterfall',900,600), img('mountain,river,asia',900,600)],
  },
  'b9': {
    author: 'Sari Wulan', authorRole: 'Food Writer', authorAvatar: img('woman,chef',200,200),
    readTime: '4 menit', tags: ['Kuliner', 'Sarapan', 'Sego Megono'],
    excerpt: 'Tidak ada pagi di Pekalongan tanpa sepiring sego megono. Mengapa hidangan sederhana ini begitu istimewa?',
    body: [
      'PEKALONGAN — Jam 5.30 pagi, warung Megono Pak Toha di Jalan Hayam Wuruk sudah ramai. Para pekerja pasar, buruh batik, hingga turis yang menginap di hotel terdekat mengantri untuk semangkuk nasi sederhana namun penuh cerita: sego megono.',
      'Sego megono adalah nasi yang disajikan dengan urap nangka muda parut bercampur kelapa berbumbu. Tampilannya tidak ada yang istimewa — hijau pucat, gurih, dan aroma daun jeruk yang khas. Tapi rasanya bisa membuat siapapun ketagihan.',
      '"Kuncinya di bumbu kelapa," kata Pak Toha sambil mengaduk kuali besar berisi parutan kelapa yang baru disangrai. "Kunci, kencur, daun jeruk, cabai rawit — semua harus segar. Kalau pakai bumbu kemarin, langsung beda rasanya."',
      'Warung Pak Toha sudah berdiri sejak 1972. Resepnya turun-temurun dari ibunya yang dulu berjualan keliling dengan dipikul. Sekarang anak ketiganya, Mas Bayu, sudah ikut membantu sambil mempersiapkan diri menggantikan generasi sebelumnya.',
      'Cara menyantap megono yang autentik: pesan dengan lauk tempe mendoan atau ikan asin teri, tambah sambal terasi, dan minum teh tubruk panas. Beberapa orang menambahkan kerupuk usek — kerupuk khas Pekalongan dari bahan ubi.',
      'Selain Pak Toha, ada beberapa warung legendaris lain: Megono Bu Sri (Jl. Diponegoro), Megono Mbak Yati (Pasar Banjarsari), dan Megono Pak Wahid (Jl. KH. Mansyur). Masing-masing punya racikan bumbu yang sedikit berbeda — eksplorasi semua untuk menemukan favorit Anda.',
    ],
    quote: 'Megono bukan sekadar makanan. Ini ritual pagi yang menghubungkan warga Pekalongan dengan akar pesisirnya.',
    quoteBy: 'Sari Wulan — Food Writer',
    galeri: [img('rice,jackfruit,javanese',900,600), img('street,food,asia',900,600), img('traditional,breakfast,indonesia',900,600)],
  },
};

BERITA.forEach(b => {
  const detail = BERITA_DETAIL[b.id];
  if (detail) Object.assign(b, detail);
  if (!b.author) b.author = ['Rina Setiawati', 'Bayu Pratama', 'Sari Wulan', 'Dimas Pradana', 'Lala Kusumastuti'][b.id.charCodeAt(1) % 5];
  if (!b.authorRole) b.authorRole = 'Kontributor';
  if (!b.authorAvatar) b.authorAvatar = img('person,portrait',200,200);
  if (!b.readTime) b.readTime = (3 + (b.id.charCodeAt(1) % 5)) + ' menit';
  if (!b.tags) b.tags = [b.kategori, 'Pekalongan', 'Wisata'];
  if (!b.excerpt) b.excerpt = b.title + '. Simak ulasan lengkapnya dalam artikel berikut.';
  if (!b.body) b.body = [
    `${b.title.split(',')[0]} menjadi sorotan masyarakat Pekalongan dalam beberapa hari terakhir. Antusiasme publik terhadap topik ini menunjukkan bagaimana sektor ${b.kategori.toLowerCase()} terus menjadi denyut nadi kota.`,
    'Berbagai pihak dari pemerintah daerah, pelaku usaha, hingga warga biasa memberikan tanggapan beragam. Sebagian besar menyambut positif dan berharap perkembangan ini berkelanjutan.',
    'Pemerintah Kota Pekalongan melalui Dinas terkait menyatakan komitmennya untuk terus mendorong sektor ini sebagai pilar utama pariwisata dan ekonomi kreatif. Beberapa program prioritas tahun ini diarahkan untuk mendukung tema serupa.',
    'Pengamat budaya dari Universitas Pekalongan, Dr. Hadiwijaya, menilai bahwa narasi seperti ini penting untuk menjaga identitas kota di era modernisasi. "Pekalongan punya kekayaan yang khas — kuncinya adalah bagaimana mengemasnya tanpa kehilangan jiwa," ujarnya.',
    'Bagi wisatawan, momen ini menjadi alasan tambahan untuk berkunjung. Sektor perhotelan dan kuliner di pusat kota dilaporkan mengalami peningkatan tingkat hunian dan transaksi.',
  ];
  if (!b.quote) b.quote = 'Pekalongan adalah perpaduan unik antara tradisi yang dijaga teguh dan keterbukaan terhadap kebaruan.';
  if (!b.quoteBy) b.quoteBy = 'Dr. Hadiwijaya — Pengamat Budaya';
  if (!b.galeri) b.galeri = [b.img, img(b.kategori,900,600), img('pekalongan,batik',900,600)];
});

// Re-export with enriched data
window.PP_DATA = { DESTINASI, CATEGORIES, REGIONS, SPOTLIGHTS, EVENTS, BERITA };
