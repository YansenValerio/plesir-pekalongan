# 📄 03 — Pages Specification

Detail lengkap struktur, konten, dan komponen untuk setiap halaman.

---

## 🏠 1. HOME PAGE (`/`)

### Layout Structure

```
┌─────────────────────────────────────────┐
│ NAVBAR (transparent → solid on scroll)  │
├─────────────────────────────────────────┤
│                                         │
│         HERO FULL SCREEN                │
│   (Video/Foto pantai + text overlay)    │
│                                         │
├─────────────────────────────────────────┤
│      DESTINATION CAROUSEL (auto)        │
├─────────────────────────────────────────┤
│   "TEMUKAN PESONA PEKALONGAN"           │
│        Interactive SVG Map              │
├─────────────────────────────────────────┤
│   SPOTLIGHT "Ciri Khas Pekalongan"      │
│      (horizontal scroll cards)          │
├─────────────────────────────────────────┤
│      MUSLIM-FRIENDLY BANNER             │
├─────────────────────────────────────────┤
│      UPCOMING EVENTS GRID (3 col)       │
├─────────────────────────────────────────┤
│  ⭐ USER GENERATED GALLERY              │
│     #PlesirPekalongan feed              │
├─────────────────────────────────────────┤
│             FOOTER                      │
└─────────────────────────────────────────┘
```

### Section Detail

#### 1.1 Hero Section
- **Background:** Looping video (10-15 detik) pantai Pasir Kencana, fallback foto
- **Overlay:** Gradient `from-black/50 to-transparent`
- **Content:**
  - Tagline kecil: "Selamat Datang di"
  - H1 hero: **"Plesir Pekalongan"** dengan font Playfair Display
  - Subtitle: "Jelajahi Pesona Kota Batik Dunia"
  - Search bar: "Mau jelajah apa hari ini?" + autocomplete destinasi
  - CTA primary: "Mulai Jelajahi" → scroll to next section
  - CTA secondary: "Buat Rencana Perjalanan" → `/rencana`
- **Bottom indicator:** 3 dots dengan nama destinasi (mirip indonesia.travel)

#### 1.2 Destination Carousel
- **Title:** "Destinasi Pilihan"
- **Subtitle:** "Mulai perjalananmu dengan tempat-tempat ikonik"
- **Format:** Auto-slide setiap 5 detik, pause on hover
- **Cards:** Aspect ratio 4:5, gradient overlay, judul di bawah
- **Count:** 6-8 destinasi unggulan
- **Navigation:** Prev/Next button + dots indicator

#### 1.3 Interactive Map Section
- **Title:** "Temukan Pesona Pekalongan"
- **Subtitle:** "Pilih wilayah untuk menjelajah destinasi"
- **Format:** SVG map dengan 4 region clickable
  - Pekalongan Utara (pesisir, pantai, kuliner laut)
  - Pekalongan Selatan (heritage, kampung batik)
  - Pekalongan Timur (kuliner, perdagangan)
  - Pekalongan Barat (religi, makam wali)
- **Interaction:**
  - Hover: change fill color ke sunset, tooltip muncul
  - Click: side panel slide-in dengan detail wilayah + CTA
- **Stats panel:**
  - Total destinasi
  - Total kuliner khas
  - Total event tahunan

#### 1.4 Spotlight Section
- **Title:** "Ciri Khas Pekalongan"
- **Format:** Horizontal scroll cards (mirip section Borobudur di indonesia.travel)
- **Items:**
  - Batik Pekalongan (UNESCO heritage)
  - Megono & Tauto (kuliner ikonik)
  - Syawalan & Lopis Raksasa
  - Kampung Batik Kauman
  - Sintren (kesenian tradisional)
  - Petungkriyono (hutan & curug)
- **Card design:** Large image left, text right with CTA "Pelajari Lebih Lanjut"
- **Counter:** "01 / 06" di kanan bawah

#### 1.5 Muslim-Friendly Banner
- **Layout:** Banner horizontal full-width
- **Background:** Foto Masjid Agung Al-Jami' + overlay
- **Content:**
  - "Wisata Halal & Ramah Muslim"
  - "Jelajahi destinasi religi dan kuliner halal di Kota Pekalongan"
  - CTA: "Klik di sini" → filter destinasi `?ramah-muslim=true`

#### 1.6 Upcoming Events Grid
- **Title:** "Acara yang Tidak Boleh Terlewatkan"
- **CTA top right:** "Jelajahi Semua Acara →"
- **Format:** 3 cards horizontal
- **Each card shows:**
  - Cover image dengan gradient overlay
  - Badge kategori
  - **Countdown timer ⭐** kalau < 30 hari
  - Judul event
  - Tanggal & lokasi
- **Click:** ke `/event/:slug`

#### 1.7 ⭐ User Generated Gallery
- **Title:** "Pekalongan dari Pandangan Wisatawan"
- **Subtitle:** "Bagikan momenmu dengan #PlesirPekalongan"
- **Format:** Masonry grid 4-6 kolom (responsive)
- **Source:** Static data dulu (15-20 foto Instagram-style), nanti bisa connect ke Instagram Graph API
- **Each photo:**
  - Hover: show username + caption
  - Click: lightbox modal dengan info
- **CTA bawah:** "Lihat Semua di Instagram" → buka @ticpekalongan
- **Filter chip:** Latest | Popular | Pantai | Batik | Kuliner

---

## 🗺️ 2. DESTINASI (`/destinasi`)

### 2.1 Landing Destinasi
**Layout:** 5 kategori cards full-bleed

```
┌─────────────────────────────────────┐
│  HERO: "Pengalaman Pekalongan"      │
├─────────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐             │
│ │Alam │ │Reli │ │Buday│             │
│ └─────┘ └─────┘ └─────┘             │
│ ┌─────┐ ┌─────┐                     │
│ │Kulin│ │Belan│                     │
│ └─────┘ └─────┘                     │
└─────────────────────────────────────┘
```

### 2.2 Listing per Kategori (`/destinasi/:kategori`)

- **Filter sidebar (left):**
  - Sub-kategori (cth: Pantai, Gunung, Air Terjun untuk Alam)
  - Wilayah (Utara, Selatan, Timur, Barat)
  - Fasilitas (parkir, mushola, toilet, ramah difabel)
  - Range harga tiket
- **Sort:**
  - Terpopuler
  - Rating tertinggi
  - Terbaru
  - A-Z
- **View toggle:** Grid / List / Map
- **Search bar:** dalam kategori

### 2.3 Detail Destinasi (`/destinasi/:kategori/:slug`)

```
┌─────────────────────────────────────┐
│  HERO: Foto gallery slider          │
├─────────────────────────────────────┤
│  Title + breadcrumb                 │
│  Rating | Reviews | Save | Share    │
├─────────────────────────────────────┤
│  Quick Info Bar:                    │
│  📍 Lokasi | 🕐 Jam | 💰 Tiket      │
├─────────────────────────────────────┤
│  Tentang (deskripsi)                │
├─────────────────────────────────────┤
│  Fasilitas (icon grid)              │
├─────────────────────────────────────┤
│  Tips Wisatawan                     │
├─────────────────────────────────────┤
│  Lokasi (Leaflet map)               │
├─────────────────────────────────────┤
│  Destinasi Terdekat (radius 5km)    │
├─────────────────────────────────────┤
│  CTA: "Tambah ke Rencana Saya"      │
└─────────────────────────────────────┘
```

---

## 🎉 3. EVENT (`/event`)

### 3.1 Listing

- **Hero kecil:** "Event di Pekalongan"
- **Tabs:** [Upcoming] [Past] [All]
- **Filter pills:**
  - Kategori: Semua | Budaya | Kuliner | Olahraga | Seni | Keagamaan
  - Bulan
- **View toggle:** List | Calendar
- **Sort:** Tanggal terdekat / Terpopuler / A-Z
- **Card content:**
  - Cover image
  - Badge kategori + status
  - **⭐ Countdown timer** (jika upcoming < 30 hari)
  - Judul
  - Tanggal range
  - Lokasi
  - **⭐ Quick Add to Calendar** button

### 3.2 Detail Event (`/event/:slug`)

**11 Sections (sesuai diskusi sebelumnya):**

1. **Hero Section** dengan poster + ⭐ **Countdown Timer**
2. **Tentang Event**
3. **Jadwal Acara** (timeline)
4. **Informasi Tiket**
5. **Lokasi** (embed Leaflet)
6. **Galeri Past Event** (lightbox)
7. **⭐ Live Stream Section** (YouTube embed — hanya muncul saat event berlangsung)
8. **Tips Pengunjung**
9. **Penyelenggara**
10. **Event Terkait**
11. **Bagikan + ⭐ Add to Calendar** (Google/Apple/Outlook)

### ⭐ Fitur Khusus Event:

**Countdown Timer Component:**
```jsx
<CountdownTimer 
  targetDate={event.tanggal_mulai}
  variant="card" // atau "hero"
/>
// Display: "12 Hari : 5 Jam : 32 Menit : 14 Detik"
```

**Add to Calendar:**
- Generate `.ics` file dengan library `ics`
- Buttons: Google Calendar, Apple Calendar, Outlook, Yahoo
- Auto-include: judul, deskripsi, lokasi (koordinat), tanggal

**Live Stream Embed:**
- Field di data: `youtube_live_url` (nullable)
- Tampil hanya kalau:
  - Tanggal hari ini ∈ range event
  - Field `youtube_live_url` tidak null
- Format: 16:9 aspect ratio embed dengan chat sidebar (kalau memungkinkan)

---

## 📰 4. BERITA (`/berita`)

### 4.1 Listing

- **Hero kecil:** "Berita & Artikel"
- **Search bar** dengan autocomplete
- **Filter kategori (pills):**
  - Semua | Pariwisata | Budaya | Kuliner | Event | UMKM | Heritage | Tips Wisata | Hidden Gems
- **Sort:** Terbaru | Terpopuler | Pilihan Editor
- **Grid:** 3 kolom desktop, 1 kolom mobile
- **Pagination:** 1 | 2 | 3 | ... | last
- **Card:**
  - Cover image dengan gradient bottom
  - Badge kategori
  - Judul (max 2 baris)
  - Excerpt (max 2 baris)
  - Meta: tanggal, reading time

### 4.2 Detail Artikel (`/berita/:slug`)

```
┌─────────────────────────────────────┐
│  HERO: Cover image                  │
├─────────────────────────────────────┤
│  Badge kategori                     │
│  H1 Judul (Playfair Display)        │
│  Meta: author, tanggal, reading time│
├─────────────────────────────────────┤
│  Reading Progress Bar (sticky top)  │
├─────────────────────────────────────┤
│  Konten artikel (max-w-2xl)         │
│  - Markdown rendering               │
│  - Pull quotes                      │
│  - Inline images                    │
├─────────────────────────────────────┤
│  Tags pills                         │
├─────────────────────────────────────┤
│  Share buttons (FB, X, WA, Copy)    │
├─────────────────────────────────────┤
│  ⭐ RELATED ARTICLES (3 cards)      │
└─────────────────────────────────────┘
```

### ⭐ Related Articles Algoritma:

```typescript
function getRelatedArticles(current: Article, all: Article[]): Article[] {
  return all
    .filter(a => a.id !== current.id)
    .map(a => ({
      ...a,
      score: 
        (a.kategori === current.kategori ? 3 : 0) +
        intersect(a.tags, current.tags).length * 2 +
        (sameMonth(a.tanggal, current.tanggal) ? 1 : 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
```

---

## 🤖 5. RENCANA PERJALANAN (`/rencana`)

### 5.1 Landing (`/rencana`)

- **Background:** Video aerial Pekalongan dengan overlay
- **Title:** "Di mana perjalananmu akan dimulai?"
- **2 Cards center:**
  - 🧭 "Personalisasi Perjalananmu" (recommended, badge "AI-Powered")
  - 🎉 "Buat Rencanamu Sendiri" (manual)

### 5.2 Wizard (`/rencana/wizard`)

**Layout per langkah:** Background image + center modal + step indicator bawah

**Step 1: Companion** (`1 of 4`)
- Title: "Siapa yang menemanimu dalam perjalananmu ke Pekalongan yang menakjubkan?"
- Subtitle: "Bagikan detail perjalananmu dan dapatkan rencana yang cocok untuk semua orang"
- 4 Cards:
  - 👤 Perjalanan sendiri
  - 👥 Perjalanan berdua
  - 👨‍👩‍👧 Perjalanan keluarga
  - 🎉 Perjalanan bersama teman

**Step 2: Interests** (`2 of 4`)
- Title: "Ceritakan pada kami tentang minatmu!"
- Multi-select pills:
  - Pantai, Batik, Kuliner Mewah, Belanja, Festival, Kuliner
  - Tur Wisata, Petualangan Alam, Hidden Gems, Spa & Relaksasi, Klub Malam
  - Seni & Budaya, Akses Difabel, Ramah Anak, + Tambahkan Minat
- Sub-question: Preferensi makanan
  - Vegan, Halal (default selected for Pekalongan), Pedas, Makanan laut, Makanan jalanan, Tidak ada preferensi
- Sub-question: Tempat menginap
  - Hotel & Resor, Villa, Hemat (Homestay/Hostel)

**Step 3: Dates** (`3 of 4`)
- Title: "Kapan petualanganmu dimulai?"
- Dual calendar picker (bulan ini + bulan depan)
- Pilih start date dan end date
- Display: "Durasi: 5 hari 4 malam"

**Step 4: Budget** (`4 of 4`)
- Title: "Berapa anggaran perjalananmu?"
- Slider: Rp 500rb - Rp 10jt
- Quick select pills:
  - 🎒 Backpacker (Rp 500rb - 1.5jt)
  - ✈️ Standard (Rp 1.5jt - 5jt)
  - ⭐ Premium (Rp 5jt - 10jt)
  - 💎 Luxury (Rp 10jt+)
- Sub-question (opsional): Asal kota (untuk hitung transport)

**CTA Final:** "Buat Itinerary dengan AI ✨"

### 5.3 Hasil Itinerary (`/rencana/hasil`)

```
┌─────────────────────────────────────┐
│  HEADER:                            │
│  "Rencana Perjalananmu di Pekalongan"│
│  📅 5 hari • 💰 Rp 3.5jt • 👥 2 orang│
├─────────────────────────────────────┤
│  TAB SWITCH: [Timeline] [⭐ Map View]│
├─────────────────────────────────────┤
│                                     │
│  TIMELINE VIEW:                     │
│  ┌─────────────────────────────┐   │
│  │ HARI 1: Pesisir & Batik     │   │
│  │ 08:00 - Pantai Pasir Kencana│   │
│  │ 11:00 - Kampung Batik Kauman│   │
│  │ 13:00 - Tauto Bahari        │   │
│  │ ...                          │   │
│  └─────────────────────────────┘   │
│                                     │
│  HARI 2, 3, dst...                  │
├─────────────────────────────────────┤
│  BUDGET BREAKDOWN (pie chart)       │
├─────────────────────────────────────┤
│  PACKING LIST (AI-generated)        │
├─────────────────────────────────────┤
│  TIPS PERJALANAN                    │
├─────────────────────────────────────┤
│  ACTIONS:                           │
│  💾 Simpan | 📥 ⭐ Download Offline│
│  🔗 Share | ✏️ Edit Itinerary       │
└─────────────────────────────────────┘
```

### ⭐ Interactive Map View

- **Leaflet map** full width
- **Markers** untuk setiap stop per hari
- **Route lines** menghubungkan marker dengan warna berbeda per hari
- **Popup marker:** foto + nama + waktu + estimasi biaya
- **Legend:** Day 1 (biru), Day 2 (sunset), Day 3 (teal), dst
- **Click marker:** Side panel dengan detail destinasi

### ⭐ Offline Download

- **Tombol:** "Download untuk Offline"
- **2 Opsi:**
  - **PDF** (jsPDF + html2canvas) — printable
  - **Simpan ke Browser** (localStorage) — bisa akses offline via PWA
- **PDF berisi:**
  - Cover dengan logo Plesir Pekalongan
  - Ringkasan trip
  - Timeline per hari dengan QR code lokasi
  - Map screenshot
  - Tips & emergency contact

---

## 📞 6. KONTAK (`/kontak`)

### Layout

```
┌─────────────────────────────────────┐
│  HERO: "Hubungi Kami"               │
├─────────────────────────────────────┤
│  TIC INFO (2 column):               │
│  Left: Info + jam buka              │
│  Right: Embed Leaflet map           │
├─────────────────────────────────────┤
│  CONTACT FORM:                      │
│  Nama, Email, Subjek, Pesan         │
├─────────────────────────────────────┤
│  SOSIAL MEDIA (icon grid besar)     │
├─────────────────────────────────────┤
│  EMERGENCY CONTACTS:                │
│  Polisi, RS, Tourist Hotline        │
├─────────────────────────────────────┤
│  ⭐ FAQ LENGKAP (Accordion)         │
└─────────────────────────────────────┘
```

### ⭐ FAQ Lengkap

- **Search bar** untuk cari FAQ
- **Filter kategori:**
  - Semua | Transportasi | Akomodasi | Kuliner | Budaya | Keamanan | Wisata | Lainnya
- **Format:** Accordion expand on click
- **Count:** Minimum 20-30 FAQ
- **CTA bawah:** "Tidak menemukan jawaban? Hubungi TIC →"

### TIC Info Data (dari `data/tic-info.json`):

```
TIC Pekalongan
📍 Jl. Wr. Supratman, Panjang Wetan, 
   Kec. Pekalongan Utara, Kota Pekalongan, 
   Jawa Tengah
📞 (0285) 421-XXX (placeholder)
📧 info@plesirpekalongan.id (placeholder)
🕐 Senin - Jumat: 08.00 - 17.00 WIB
   Sabtu - Minggu: Tutup
```

### Emergency Contacts:
- Polisi Pariwisata Pekalongan
- RSUD Bendan
- Damkar Pekalongan
- Tourist Hotline 24 jam

### Sosial Media:
- Instagram: @ticpekalongan
- Facebook: TIC Pekalongan
- TikTok: @ticpekalongan
- YouTube: TIC Pekalongan
- X (Twitter): @ticpekalongan

---

## 🦶 FOOTER (semua halaman)

```
┌─────────────────────────────────────────────────────────┐
│ [LOGO] Plesir Pekalongan                                │
│ Tagline & deskripsi singkat                             │
│                                                         │
│ Situs Web     Informasi    Media Sosial   Kontak       │
│ - Tentang     - Berita     - Instagram    - TIC info   │
│ - Disclaimer  - Event      - Facebook     - Email      │
│ - Privasi     - FAQ        - TikTok       - WhatsApp   │
│ - Sitemap     - API Docs   - YouTube                   │
│                                                         │
│ ─────────────────────────────────────────────────────  │
│ © 2026 Plesir Pekalongan                                │
│ Dinas Kebudayaan, Pariwisata, Pemuda dan Olahraga      │
│ Kota Pekalongan                                         │
└─────────────────────────────────────────────────────────┘
```

Background: `bg-pesisir-deep` dengan text putih + opacity layers.
