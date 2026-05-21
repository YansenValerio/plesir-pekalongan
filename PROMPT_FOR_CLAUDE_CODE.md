# 🤖 PROMPT UTAMA UNTUK CLAUDE CODE

> **Strategi:** Anda **TIDAK** membangun dari nol. Anda **memigrasi prototype yang sudah ada** di folder `design-reference/` ke production stack (Vite + React + TypeScript + Tailwind).
>
> **Cara pakai:** Copy seluruh isi file ini, paste sebagai pesan pertama ke Claude Code di root folder project.

---

## ⚠️ INSTRUKSI PALING PENTING — BACA DULU!

Folder `design-reference/` berisi **prototype Plesir Pekalongan yang sudah JADI** dengan:
- ✅ 29 React component fully working (vanilla React JSX)
- ✅ 1653 baris CSS dengan design system lengkap
- ✅ Data dummy lengkap di `data.js`
- ✅ Routing client-side sederhana
- ✅ Animasi & interactions sudah dirancang
- ✅ Layout & spacing yang sudah di-approve user

**TUGAS ANDA:** Migrasi prototype ini ke production stack tanpa kehilangan visual & behavior aslinya.

### ❌ JANGAN:
- Bangun dari nol berdasarkan deskripsi
- Mengubah layout/spacing/warna tanpa alasan teknis
- Mengubah copy text (semua sudah dalam Bahasa Indonesia yang benar)
- Buat komponen baru yang tidak ada di prototype

### ✅ HARUS:
- Buka & baca semua file di `design-reference/`
- Pertahankan **persis** visual & UX dari prototype
- Tingkatkan ke production (TypeScript, modular, optimized)
- Tambahkan fitur yang **belum ada** di prototype (lihat checklist di bawah)

---

## 📂 LANGKAH 1: BACA REFERENSI DULU

Sebelum coding apapun, **baca file-file ini secara berurutan**:

### A. Prototype yang sudah jadi (PRIMARY SOURCE):
1. `design-reference/styles.css` — Design system lengkap (warna, typo, spacing, semua komponen CSS)
2. `design-reference/app.jsx` — Routing & top-level structure
3. `design-reference/components.jsx` — Navbar, Footer, mega-menu, dll
4. `design-reference/home.jsx` — Halaman Home (Hero chapters, Map, Spotlight, dll)
5. `design-reference/pages.jsx` — Destinasi, Event, Berita, Kontak listings
6. `design-reference/details.jsx` — Detail destinasi, event, berita
7. `design-reference/rencana.jsx` — Trip planner wizard 4 langkah
8. `design-reference/data.js` — Semua dummy data

### B. Dokumentasi spec (SECONDARY — untuk konteks):
9. `docs/01-tech-stack.md` — Stack production yang dipakai
10. `docs/02-design-system.md` — (sudah selaras dengan styles.css)
11. `docs/03-pages-spec.md` — Spec halaman (validasi konsistensi)
12. `docs/04-data-structure.md` — Schema untuk migrasi data
13. `docs/05-api-integration.md` — **PENTING** untuk fitur AI
14. `docs/06-features-detail.md` — **PENTING** untuk fitur yang belum ada di prototype
15. `docs/07-development-phases.md` — Roadmap
16. `docs/08-deployment-guide.md` — Deploy ke Vercel

### C. Data tambahan (untuk migrasi):
17. `data/*.json` — Versi structured dari data prototype (lebih kaya)

### D. Asset visual:
18. `assets/Peta_Pekalongan.svg` — SVG map asli dengan ID region yang benar
19. `design-reference/assets/` — Asset prototype (placeholder video, dll)

---

## 🎯 LANGKAH 2: REVIEW SEBELUM EKSEKUSI

Setelah membaca semua file di atas, **konfirmasi pemahaman dengan ringkasan 5 poin** mencakup:

1. Apa yang sudah ada di prototype (komponen, halaman, fitur)
2. Apa yang belum ada di prototype tapi diminta di spec (lihat checklist Phase 2 di bawah)
3. Bagaimana strategi migrasi (vanilla → Vite + TS + Tailwind)
4. Risiko/concern teknis (kalau ada)
5. Phase mana yang mau dikerjakan duluan

**Tunggu approval user sebelum mulai coding!**

---

## 📊 LANGKAH 3: GAP ANALYSIS

### Yang SUDAH ada di prototype:
- ✅ Layout Home (hero chapters, destination grid, interactive map, spotlight, events)
- ✅ Layout Destinasi (kategori + listing + detail)
- ✅ Layout Event (listing + detail dengan section lengkap)
- ✅ Layout Berita (listing + detail)
- ✅ Layout Rencana Wizard (4 step)
- ✅ Layout Kontak
- ✅ Navbar transparent → solid on scroll
- ✅ Footer
- ✅ Design system (warna, typography, components)
- ✅ Dummy data destinasi, event, berita

### Yang BELUM ada di prototype, HARUS DITAMBAHKAN:

| Fitur | Sumber Spec | Catatan |
|-------|-------------|---------|
| ⭐ AI Trip Planner (Gemini) | `docs/05-api-integration.md` | Saat ini wizard hanya static, harus connect ke Gemini API |
| ⭐ Bilingual (i18n) | `docs/02-design-system.md` | Toggle EN/ID, semua copy harus ada English versi |
| ⭐ PWA + Offline mode | `docs/06-features-detail.md` E.3 | Service worker, manifest, cache |
| ⭐ User Generated Gallery | `docs/06-features-detail.md` B | Instagram-style feed di Home |
| ⭐ Add to Calendar | `docs/06-features-detail.md` C.2 | .ics generation |
| ⭐ Live Stream Embed | `docs/06-features-detail.md` C.3 | YouTube embed conditional |
| ⭐ Related Articles algoritma | `docs/06-features-detail.md` D | Scoring by category+tags |
| ⭐ Interactive Map View (Leaflet) | `docs/06-features-detail.md` E.1 | Map dengan rute itinerary |
| ⭐ Offline Download PDF | `docs/06-features-detail.md` E.2 | jsPDF export |
| ⭐ FAQ Lengkap dengan search | `docs/06-features-detail.md` F | 25 FAQ dari `data/faq.json` |
| ⭐ React Router | `docs/01-tech-stack.md` | Saat ini routing manual via state |
| ⭐ TypeScript types | `docs/04-data-structure.md` | Semua data harus typed |
| ⭐ SEO meta tags | `docs/08-deployment-guide.md` | react-helmet-async per page |

---

## 🚦 LANGKAH 4: EKSEKUSI BERTAHAP

### **PHASE 0: Setup Foundation** (1-2 hari)

1. Init project: `npm create vite@latest . -- --template react-ts`
2. Install dependencies sesuai `docs/01-tech-stack.md`
3. **Convert `styles.css` → Tailwind config:**
   - Map CSS variables `:root` → `tailwind.config.js` `theme.extend.colors`
   - Custom utility classes untuk yang kompleks
   - Sisa pakai inline Tailwind
4. Setup React Router dengan struktur:
   ```
   /                            → Home
   /destinasi                   → Destinasi listing (semua)
   /destinasi/:kategori         → Destinasi by kategori
   /destinasi/detail/:slug      → Destinasi detail
   /event                       → Event listing
   /event/:slug                 → Event detail
   /berita                      → Berita listing
   /berita/:slug                → Berita detail
   /rencana                     → Trip planner wizard
   /rencana/hasil               → AI itinerary result
   /kontak                      → Kontak + FAQ
   ```
5. Setup react-i18next dengan `src/locales/id.json` & `en.json`
6. Setup Zustand untuk state (terutama trip planner)
7. Migrasi `data.js` → typed TypeScript files di `src/data/`
8. **CHECKPOINT:** Konfirmasi struktur foundation OK.

### **PHASE 1: Migrasi Komponen Layout** (1 hari)

Migrasi component dari `design-reference/`:
- `components.jsx` → `src/components/layout/Navbar.tsx`, `Footer.tsx`, `MegaMenu.tsx`, `LanguageToggle.tsx`
- Pastikan styling **PERSIS** dengan original
- Convert ke functional components dengan TypeScript

**CHECKPOINT:** Navbar + Footer match prototype.

### **PHASE 2: Migrasi Home Page** (1-2 hari)

Migrasi `design-reference/home.jsx`:
- Hero chapters dengan auto-advance + progress bar
- Destination carousel
- Interactive Map section (pakai SVG asli di `assets/Peta_Pekalongan.svg`, replace SVG placeholder di prototype)
- Spotlight section
- Muslim-friendly banner
- Upcoming events grid
- **TAMBAH BARU:** User Generated Gallery (lihat `docs/06-features-detail.md` B)

**CHECKPOINT:** Home match prototype + ada Gallery.

### **PHASE 3: Migrasi Destinasi** (1-2 hari)

- Listing dengan 5 kategori
- Filter + sort
- Detail page lengkap
- **PERHATIKAN:** Migrasi data destinasi dari `design-reference/data.js` (DESTINASI array) — lebih lengkap dari `data/destinasi.json`

**CHECKPOINT.**

### **PHASE 4: Migrasi Event + Fitur Plus** (2 hari)

- Listing & filter (sudah ada di prototype)
- Detail event (sudah ada)
- **TAMBAH BARU:**
  - ⭐ Countdown Timer (sudah ada di prototype di Hero — extend ke event card)
  - ⭐ Add to Calendar (.ics generator) — lihat `docs/06-features-detail.md` C.2
  - ⭐ Live Stream Embed (conditional) — lihat `docs/06-features-detail.md` C.3

**CHECKPOINT.**

### **PHASE 5: Migrasi Berita + Related Articles** (1 hari)

- Listing & filter (sudah ada)
- Detail artikel (sudah ada)
- **TAMBAH BARU:** Related Articles dengan scoring algorithm — lihat `docs/06-features-detail.md` D

**CHECKPOINT.**

### **PHASE 6: AI Trip Planner — UTAMA!** (3-4 hari)

Prototype hanya punya wizard tanpa AI. **HARUS dilengkapi:**

1. Wizard 4 step UI (sudah ada di `design-reference/rencana.jsx`)
2. Zustand store untuk wizard state
3. **Integrasi Gemini API** — lihat `docs/05-api-integration.md`
4. Loading + error state
5. Hasil itinerary dengan timeline view (sudah ada di prototype)
6. **TAMBAH BARU:**
   - ⭐ Interactive Map View (Leaflet) — `docs/06-features-detail.md` E.1
   - ⭐ Offline Download PDF — `docs/06-features-detail.md` E.2

**CHECKPOINT.**

### **PHASE 7: Migrasi Kontak + FAQ** (1 hari)

- TIC info (data dari `data/tic-info.json`)
- Contact form dengan React Hook Form + Zod
- **TAMBAH BARU:** FAQ Accordion dengan 25 FAQ dari `data/faq.json` + search + filter — lihat `docs/06-features-detail.md` F

**CHECKPOINT.**

### **PHASE 8: PWA + i18n + Polish** (2 hari)

- Setup `vite-plugin-pwa` (`docs/06-features-detail.md` E.3)
- Setup react-i18next, translate semua copy ke English
- SEO meta tags per page (`docs/08-deployment-guide.md`)
- Performance optimization (lazy loading, code splitting)
- Lighthouse audit

**CHECKPOINT.**

### **PHASE 9: Deploy** (1 hari)

Follow `docs/08-deployment-guide.md`.

---

## ⚠️ ATURAN PENTING

1. **Visual fidelity #1 priority** — kalau ragu antara "tweak desain" vs "match prototype", pilih **match prototype**.
2. **TypeScript strict mode** — semua data typed.
3. **Mobile-first** — prototype sudah responsive, jangan rusak.
4. **API Key Security:**
   - JANGAN PERNAH hardcode key
   - Selalu pakai `import.meta.env.VITE_GEMINI_API_KEY`
   - File `.env` sudah ada di `.gitignore`
5. **Jangan kerjakan semua phase sekaligus** — selalu tunggu checkpoint approval.
6. **Kalau ragu**, tanya user dulu. Lebih baik bertanya dari pada salah jalan jauh.

---

## 🎨 PRIORITAS DESAIN

Layout & spacing **harus persis** seperti `design-reference/`. Yang boleh berubah hanya:
- Conversion ke Tailwind utility classes (tetap visual sama)
- Penambahan responsive breakpoints jika kurang
- Optimasi performance (lazy load image, dll)

**Pakai original CSS class names sebagai komentar** untuk traceability:
```tsx
// Original: .hero-chapter
<section className="relative h-screen overflow-hidden">
```

---

## ✅ START HERE

1. Baca semua file di folder `design-reference/` (terutama `styles.css`, `home.jsx`, `app.jsx`)
2. Baca semua file di `docs/`
3. Berikan **ringkasan 5 poin** pemahaman Anda
4. Tunggu approval user
5. Mulai **PHASE 0** setelah OK

**Pertanyaan boleh dan disarankan!** Jangan asumsi.
