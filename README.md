# 🌊 Plesir Pekalongan

> Website pariwisata resmi Kota Pekalongan — "Jelajahi Pesona Kota Batik Dunia"

Adaptasi dari [indonesia.travel](https://www.indonesia.travel/id/id) dengan skala Kota Pekalongan, mengusung tema **pesisir** dan integrasi **AI Trip Planner** (Google Gemini).

---

## 🎉 Project Sudah Punya Prototype Lengkap!

Folder `design-reference/` berisi **prototype Plesir Pekalongan yang sudah jadi** — 29 React component working dengan design system lengkap. Claude Code akan **memigrasi prototype ini ke production stack**, bukan bangun dari nol.

**Lihat prototype sekarang:**  
Buka file `design-reference/Plesir Pekalongan (standalone).html` di browser → demo running!

---

## 📁 Struktur Folder

```
plesir-pekalongan/
├── README.md                          ← Anda di sini
├── PROJECT_BRIEF.md                   ← Brief & visi proyek
├── PROMPT_FOR_CLAUDE_CODE.md          ⭐ PROMPT UTAMA (paste ke Claude Code)
├── PROPOSAL_PEMDA.md                  ← Draft proposal untuk Dinas
├── assets-needed.md                   ← Checklist asset
├── .env.example                       ← Template environment
├── .gitignore
│
├── design-reference/                  ⭐ PROTOTYPE WORKING — source of truth
│   ├── Plesir Pekalongan (standalone).html  ← BUKA INI di browser untuk demo
│   ├── Plesir Pekalongan.html         ← Versi dev
│   ├── app.jsx                        ← Routing & top-level
│   ├── components.jsx                 ← Navbar, Footer, MegaMenu
│   ├── home.jsx                       ← Home page sections
│   ├── pages.jsx                      ← Destinasi/Event/Berita/Kontak listings
│   ├── details.jsx                    ← Detail pages
│   ├── rencana.jsx                    ← Trip planner wizard
│   ├── data.js                        ← Dummy data lengkap
│   ├── styles.css                     ← Design system (1653 baris)
│   └── assets/                        ← Asset prototype (video, png)
│
├── assets/
│   └── Peta_Pekalongan.svg            ← SVG map asli (4 region IDs)
│
├── docs/                              ← Dokumentasi teknis untuk migrasi
│   ├── 01-tech-stack.md
│   ├── 02-design-system.md
│   ├── 03-pages-spec.md
│   ├── 04-data-structure.md
│   ├── 05-api-integration.md          ⭐ Setup Gemini AI
│   ├── 06-features-detail.md          ⭐ 6 fitur yang BELUM ada di prototype
│   ├── 07-development-phases.md
│   └── 08-deployment-guide.md
│
└── data/                              ← Versi structured JSON dari dummy data
    ├── destinasi.json
    ├── event.json
    ├── berita.json
    ├── faq.json
    ├── tic-info.json
    ├── wilayah.json
    └── user-gallery.json
```

---

## 🚀 Quick Start

### Cara Pakai dengan Claude Code:

1. **Extract folder ini** ke lokasi project Anda
2. **Lihat prototype dulu** — buka `design-reference/Plesir Pekalongan (standalone).html` di browser
3. **Buka Claude Code** di terminal di dalam folder ini
4. **Copy seluruh isi `PROMPT_FOR_CLAUDE_CODE.md`**
5. **Paste ke Claude Code** sebagai pesan pertama
6. Claude Code akan baca folder `design-reference/`, `docs/`, dan `data/` secara otomatis
7. Eksekusi bertahap per Phase (0 sampai 9)

### Strategi Migrasi:

```
design-reference/      →   src/
├── styles.css         →   tailwind.config.js + utility classes
├── app.jsx            →   App.tsx + React Router
├── components.jsx     →   src/components/layout/*
├── home.jsx           →   src/pages/Home.tsx + src/components/home/*
├── pages.jsx          →   src/pages/*.tsx
├── details.jsx        →   src/pages/[Type]Detail.tsx
├── rencana.jsx        →   src/pages/Rencana.tsx + AI integration
└── data.js            →   src/data/*.ts (typed)
```

### Setup Environment:

```bash
# Buat file .env (jangan commit!)
cp .env.example .env

# Isi dengan API key Anda dari aistudio.google.com/apikey
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## ✨ Status Fitur

### ✅ Sudah ada di Prototype:
- Home dengan hero chapters, map interaktif, spotlight, events
- 5 kategori Destinasi + listing + detail
- Event listing + detail (11 section)
- Berita listing + detail
- Trip Planner wizard UI 4 step
- Kontak page
- Navbar dengan mega-menu + transparent → solid scroll
- Footer
- Design system lengkap (warna, typo, components)

### ⭐ Yang Akan Ditambahkan Claude Code:
- 🤖 **AI Trip Planner** integrasi Gemini API
- 🌐 **Bilingual** ID/EN dengan react-i18next
- 📱 **PWA + Offline Mode** dengan vite-plugin-pwa
- 📸 **User-Generated Gallery** Instagram-style di Home
- ⏰ **Countdown Timer** + **Add to Calendar** di Event
- 📺 **Live Stream Embed** untuk event berlangsung
- 🔗 **Related Articles** dengan scoring algorithm
- 🗺️ **Interactive Map View** (Leaflet) untuk itinerary
- 📥 **Offline Download** PDF
- ❓ **FAQ Accordion** dengan search + filter
- ⚛️ **React Router** + **TypeScript** untuk production
- 🔍 **SEO** dengan react-helmet-async

---

## 🛠️ Tech Stack Production

- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS (migrasi dari prototype CSS)
- **Routing:** React Router v6
- **Animation:** Framer Motion
- **Maps:** Leaflet.js + OpenStreetMap (gratis)
- **AI:** Google Gemini API (`gemini-1.5-flash`)
- **State:** Zustand
- **i18n:** react-i18next
- **PWA:** vite-plugin-pwa
- **PDF:** jsPDF + html2canvas
- **Calendar:** ics.js

Detail lengkap di [`docs/01-tech-stack.md`](docs/01-tech-stack.md).

---

## 📖 Dokumentasi

Mulai eksplorasi dari file yang sesuai kebutuhan:

- **Mau lihat hasil akhirnya seperti apa?** → Buka `design-reference/Plesir Pekalongan (standalone).html` di browser
- **Mau langsung migrasi ke production?** → [`PROMPT_FOR_CLAUDE_CODE.md`](PROMPT_FOR_CLAUDE_CODE.md)
- **Mau presentasi ke Pemda?** → [`PROPOSAL_PEMDA.md`](PROPOSAL_PEMDA.md)
- **Mau review desain?** → Buka `design-reference/styles.css`
- **Mau setup AI Gemini?** → [`docs/05-api-integration.md`](docs/05-api-integration.md)
- **Mau tahu fitur yang harus ditambah?** → [`docs/06-features-detail.md`](docs/06-features-detail.md)
- **Mau deploy?** → [`docs/08-deployment-guide.md`](docs/08-deployment-guide.md)

---

## 👤 Context

- **Tipe Project:** Proposal ke Pemda Kota Pekalongan
- **Target User:** Wisatawan domestik & mancanegara (bilingual ID/EN)
- **Budget:** 100% tools gratis (Vercel + Gemini free tier + OpenStreetMap)
- **Developer:** Solo developer
- **Status Prototype:** ✅ Selesai (di `design-reference/`)
- **Status Production:** ✅ Migrasi selesai (Phase 0–8), siap deploy

## 🚀 Deploy ke Vercel

```bash
# 1. Init git & push ke GitHub
git init
git add .
git commit -m "Initial commit: Plesir Pekalongan production"
git remote add origin https://github.com/USERNAME/plesir-pekalongan.git
git push -u origin main

# 2. Import repo di vercel.com/dashboard
# 3. Tambah env var: VITE_GEMINI_API_KEY = your_key
# 4. Deploy!
```

**Penting:** Jangan commit file `.env` — sudah ada di `.gitignore`.

---

## 📝 Lisensi

Untuk keperluan proposal & pengembangan internal. Tidak untuk distribusi komersial.
