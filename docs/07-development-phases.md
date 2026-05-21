# 🗓️ 07 — Development Phases

Roadmap pengembangan bertahap untuk solo developer.

---

## 📍 Phase 1: Foundation (Week 1-2)

**Goal:** Setup project, layout dasar, routing siap.

### Tasks:
- [x] Init project: `npm create vite@latest plesir-pekalongan -- --template react-ts`
- [ ] Install all dependencies (lihat `01-tech-stack.md`)
- [ ] Setup Tailwind config dengan palet pesisir
- [ ] Setup react-router-dom dengan semua route
- [ ] Setup react-i18next dengan id.json & en.json
- [ ] Setup Zustand store skeleton
- [ ] Buat `Navbar` component dengan mega-menu
- [ ] Buat `Footer` component
- [ ] Buat `WhatsAppFloat` component
- [ ] Setup `.env`, `.env.example`, `.gitignore`
- [ ] Copy data JSON ke `src/data/`
- [ ] Setup react-helmet-async untuk SEO

### Deliverable:
- Layout dasar Home dengan navbar + footer kosong
- Route 5 halaman utama sudah bisa diakses (empty page OK)
- Language toggle berfungsi

---

## 📍 Phase 2: Home Page (Week 3)

**Goal:** Home page fully functional dengan semua section.

### Tasks:
- [ ] `HeroSection` dengan video background + search
- [ ] `DestinationCarousel` (auto-slide + dots indicator)
- [ ] `InteractiveMapSection` dengan SVG Pekalongan (4 region)
- [ ] `SpotlightSection` horizontal scroll
- [ ] `MuslimFriendlyBanner`
- [ ] `UpcomingEventsGrid` (3 cards)
- [ ] ⭐ `UserGalleryFeed` dengan static data

### Deliverable:
- Home page lengkap, mobile-responsive
- Semua section punya hover state & animation
- Galeri user-generated dengan lightbox modal

---

## 📍 Phase 3: Destinasi Pages (Week 4)

**Goal:** 5 kategori + listing + detail.

### Tasks:
- [ ] Landing page `/destinasi` dengan 5 category cards
- [ ] Listing page `/destinasi/:kategori`
  - [ ] Filter sidebar (sub-kategori, wilayah, fasilitas)
  - [ ] Sort dropdown
  - [ ] View toggle (Grid/List/Map)
  - [ ] Pagination
- [ ] Detail page `/destinasi/:kategori/:slug`
  - [ ] Photo gallery slider
  - [ ] Info bar (lokasi, jam, tiket)
  - [ ] Fasilitas icons
  - [ ] Embed Leaflet map
  - [ ] Destinasi terdekat
  - [ ] Tombol "Add to Trip Plan"

### Deliverable:
- 5 kategori berfungsi
- Minimum 30 destinasi (semua kategori)
- Filter & search bekerja
- Detail page lengkap

---

## 📍 Phase 4: Event Pages (Week 5)

**Goal:** Listing + detail event dengan fitur ⭐.

### Tasks:
- [ ] Listing `/event`
  - [ ] Tabs Upcoming / Past
  - [ ] Filter pills (kategori, bulan)
  - [ ] View toggle List/Calendar
  - [ ] Cards dengan ⭐ `CountdownTimer`
- [ ] Detail `/event/:slug` dengan 11 section
  - [ ] Hero dengan ⭐ CountdownTimer (variant: hero)
  - [ ] Tentang event
  - [ ] Jadwal timeline
  - [ ] Tiket info
  - [ ] Lokasi (Leaflet)
  - [ ] Galeri past event
  - [ ] ⭐ `LiveStreamEmbed`
  - [ ] Tips pengunjung
  - [ ] Penyelenggara
  - [ ] Event terkait
  - [ ] Share + ⭐ `AddToCalendar`

### Deliverable:
- Minimum 10 event (5 upcoming + 5 past)
- Countdown timer akurat real-time
- Add to calendar generate `.ics` valid
- Live stream embed kondisional

---

## 📍 Phase 5: Berita Pages (Week 6)

**Goal:** Listing + detail artikel dengan ⭐ Related Articles.

### Tasks:
- [ ] Listing `/berita`
  - [ ] Search bar
  - [ ] Category pills
  - [ ] Sort options
  - [ ] Grid 3 kolom
  - [ ] Pagination
- [ ] Detail `/berita/:slug`
  - [ ] Hero cover
  - [ ] Markdown content renderer
  - [ ] Reading progress bar (sticky)
  - [ ] Share buttons
  - [ ] ⭐ `RelatedArticles` dengan algoritma scoring

### Deliverable:
- Minimum 20 artikel dummy
- Markdown rendering bagus
- Related articles relevan
- Reading time calculation

---

## 📍 Phase 6: AI Trip Planner (Week 7-8)

**Goal:** Wizard 4 langkah + AI integration + ⭐ Map View + ⭐ Offline.

### Tasks:
- [ ] Landing `/rencana` dengan 2 opsi cards
- [ ] Wizard pages:
  - [ ] Step 1: Companion
  - [ ] Step 2: Interests
  - [ ] Step 3: Dates (dual calendar)
  - [ ] Step 4: Budget (slider)
- [ ] Step indicator component
- [ ] Zustand store untuk wizard state
- [ ] Gemini API integration (`useGemini` hook)
- [ ] Result page `/rencana/hasil`
  - [ ] Timeline view (default)
  - [ ] ⭐ `ItineraryMapView` (toggle)
  - [ ] Budget breakdown chart
  - [ ] Packing list
  - [ ] Tips section
  - [ ] ⭐ `OfflineDownload` (PDF + localStorage)
  - [ ] Share buttons
  - [ ] Edit/regenerate options
- [ ] Loading state dengan skeleton
- [ ] Error state dengan retry

### Deliverable:
- Wizard flow smooth
- AI generate itinerary < 10 detik
- Map view dengan rute per hari
- PDF export berfungsi
- localStorage save/load itinerary

---

## 📍 Phase 7: Kontak Page (Week 9)

**Goal:** Info TIC lengkap + ⭐ FAQ.

### Tasks:
- [ ] Hero section "Hubungi Kami"
- [ ] TIC info card dengan embed Leaflet
- [ ] Contact form dengan React Hook Form + Zod validation
- [ ] Form submission (mailto: link untuk MVP)
- [ ] Social media grid
- [ ] Emergency contacts section
- [ ] ⭐ `FAQAccordion` dengan search + filter

### Deliverable:
- TIC info akurat
- Form kontak submit ke email
- FAQ minimum 30 pertanyaan
- Search FAQ real-time

---

## 📍 Phase 8: PWA & Polish (Week 10)

**Goal:** PWA support, optimization, accessibility.

### Tasks:
- [ ] Setup `vite-plugin-pwa`
- [ ] Generate icons (192, 512, maskable)
- [ ] Create manifest.json
- [ ] Service worker dengan cache strategy
- [ ] Offline fallback page
- [ ] Install prompt
- [ ] Optimize images (WebP, lazy load)
- [ ] Code splitting per route
- [ ] Add SEO meta tags per page (Open Graph)
- [ ] Sitemap.xml
- [ ] robots.txt
- [ ] Accessibility audit (Lighthouse)
- [ ] Performance audit
- [ ] Cross-browser test
- [ ] Mobile device test (iOS Safari, Android Chrome)

### Deliverable:
- Lighthouse score > 90 di semua kategori
- PWA installable
- Offline mode bekerja
- SEO ready

---

## 📍 Phase 9: Deploy & Launch (Week 11)

**Goal:** Production deployment.

### Tasks:
- [ ] Setup Vercel project
- [ ] Connect Git repo
- [ ] Setup environment variables di Vercel
- [ ] Custom domain (opsional)
- [ ] SSL certificate auto
- [ ] Analytics setup (Vercel Analytics gratis)
- [ ] Error tracking (Sentry free tier)
- [ ] Setup Google Search Console
- [ ] Submit sitemap
- [ ] Monitor performance
- [ ] Setup uptime monitoring (UptimeRobot gratis)

### Deliverable:
- Live di production
- Domain custom (jika ada)
- Monitoring aktif
- Analytics tracking

---

## 📍 Phase 10: Post-Launch (Ongoing)

### Maintenance Tasks:
- [ ] Update event data secara berkala
- [ ] Tambah destinasi baru
- [ ] Publish artikel baru
- [ ] Monitor Gemini API usage
- [ ] Respond ke feedback user
- [ ] A/B test improvements
- [ ] SEO optimization based on data

### Future Enhancements:
- [ ] User accounts (saving favorites)
- [ ] Comment system
- [ ] Real Instagram integration
- [ ] Native mobile app (React Native)
- [ ] Multi-bahasa lainnya (Arab, Mandarin)
- [ ] Booking integration dengan UMKM lokal
- [ ] Tour guide marketplace
- [ ] AR preview destinasi
- [ ] Komunitas forum

---

## ⏱️ Time Estimate Summary

| Phase | Durasi | Effort |
|-------|--------|--------|
| 1. Foundation | 1-2 minggu | 20-40 jam |
| 2. Home | 1 minggu | 15-20 jam |
| 3. Destinasi | 1 minggu | 20-25 jam |
| 4. Event | 1 minggu | 20-25 jam |
| 5. Berita | 1 minggu | 15-20 jam |
| 6. AI Trip Planner | 2 minggu | 30-40 jam |
| 7. Kontak | 1 minggu | 10-15 jam |
| 8. PWA & Polish | 1 minggu | 15-20 jam |
| 9. Deploy | 3-5 hari | 5-10 jam |
| **TOTAL** | **9-11 minggu** | **150-215 jam** |

Asumsi solo developer dengan 15-25 jam/minggu.

---

## ✅ Checkpoint Per Phase

Setiap akhir phase, lakukan:

1. **Code Review** — clean up, refactor jika perlu
2. **Manual QA** — test semua flow utama
3. **Mobile Check** — Chrome DevTools mobile view
4. **Performance Check** — Lighthouse audit
5. **Documentation Update** — README, comments
6. **Git Commit & Tag** — `git tag -a "phase-X-complete"`
7. **Demo ke Stakeholder** — kalau ada
