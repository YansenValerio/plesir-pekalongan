# Roadmap & Catatan Pengembangan — Plesir Pekalongan

> Terakhir diperbarui: 23 Mei 2026  
> Stack: React 18 + Vite + TypeScript + Tailwind + Supabase + Vercel

---

## Fitur yang Sudah Selesai

- [x] Admin panel (Destinasi / Berita / Event / FAQ)
- [x] Admin Pesan Masuk
- [x] Admin Dashboard + Analytics
- [x] Upload gambar ke Supabase Storage (`ImageUpload` + `GalleryUpload`)
- [x] Halaman publik Destinasi (Supabase)
- [x] Halaman publik Berita (Supabase)
- [x] Halaman publik Event (Supabase)
- [x] Halaman Kontak + FAQ (Supabase)
- [x] Formulir kontak → simpan ke DB
- [x] Trip Planner (Rencana + Wizard + AI / Gemini)
- [x] Fitur Bagikan (WA, Twitter, Copy)
- [x] SEO meta tags (`og:image`, `canonical`)
- [x] Vercel Analytics
- [x] Pagination Berita & Destinasi

### Perbaikan & Peningkatan yang Sudah Dikerjakan

- [x] **#1 — Homepage dinamis**: `EventsSection` dan `DiscoverMap` terhubung ke Supabase (live count per wilayah)
- [x] **#2 — Admin User Gallery**: tabel `user_gallery`, halaman `/admin/gallery` (CRUD), seed script, migrasi `UserGalleryFeed` dari JSON ke Supabase
- [x] **#3 — Sitemap dinamis**: `scripts/generate-sitemap.mjs` generate URL destinasi/berita/event saat build, dijalankan otomatis via `prebuild` npm script
- [x] **#4 — Trip Planner tersimpan**: itinerary dipertahankan di `localStorage` via Zustand `persist`, tombol "Lihat Itinerary Tersimpan" muncul di `/rencana`
- [x] **#5 — Review & Rating Destinasi**: tabel `review`, form kirim ulasan di halaman detail, daftar review, rata-rata rating otomatis via Supabase trigger
- [x] **#6 — Optimasi Gambar**: `imgUrl()` utility menggunakan Supabase Image Transformation (`?width=N&quality=75`), diterapkan di semua komponen publik
- [x] **#7 — Global Search**: `SearchOverlay` di Navbar, query paralel ke destinasi/berita/event dengan `ilike`, hasil dikelompokkan per tipe, shortcut `Esc`
- [x] **#8 — Notifikasi Pesan Masuk**: badge unread di sidebar admin (Supabase Realtime), baris pesan tebal + dot merah jika belum dibaca, otomatis ditandai dibaca saat dibuka
- [x] **#9 — 404 Custom untuk Konten**: redirect `<Navigate to="/404" replace />` jika slug destinasi/berita/event tidak ditemukan
- [x] **#10 — Rate Limit Form Kontak**: cooldown 30 detik setelah kirim, tombol dinonaktifkan dengan countdown "Tunggu Xs..."

---

## Yang Masih Belum Dikerjakan

- [x] **Spotlight di Homepage**: `Spotlight.tsx` terhubung ke Supabase — ambil 6 destinasi teratas by rating, skeleton loading, klik navigasi ke detail, fallback hardcoded jika DB kosong

---

## Yang Bisa Dikembangkan

### A. Fitur Favorit / Wishlist
- [x] Halaman `/favorit` — tab Destinasi & Event, skeleton loading, empty state + CTA browse, tombol hapus per card
- [x] Tombol "Simpan" di EventDetailPage (toggle, visual feedback jika tersimpan)
- [ ] Sinkronisasi favorit ke akun jika user login

### B. Halaman Profil Wisatawan
- [ ] Login untuk pengguna publik (bukan hanya admin)
- [ ] Favorit tersimpan permanen ke akun
- [ ] Histori itinerary per user
- [ ] Submit review dengan nama terverifikasi

### C. Notifikasi Admin via WhatsApp
- [ ] Kirim notifikasi pesan baru ke nomor admin via Fonnte / WhatsApp Business API (alternatif lebih simpel dari email)

### D. Dark Mode untuk Halaman Publik
- [x] Toggle dark mode di Navbar (ikon moon/sun, persist ke localStorage)
- [x] CSS variable override `html.dark` — otomatis handle semua `var(--*)` style
- [x] Global `bg-white` override + form inputs dark mode via index.css
- [x] Navbar solid state + mega menu dark variant
- [x] Anti-flash script di index.html (sync sebelum React render)
- [x] `darkModeStore` Zustand + localStorage persist

### E. PWA (Progressive Web App)
- [ ] `manifest.json` + service worker
- [ ] Install ke smartphone
- [ ] Offline mode untuk halaman yang sudah dikunjungi

### F. Multi-Admin / Role Management
- [ ] Tabel `profiles` dengan kolom `role` (super_admin, editor)
- [ ] RLS policy berdasarkan role
- [ ] Halaman manajemen pengguna di admin panel

---

## Catatan Teknis

| Item | Catatan |
|---|---|
| `.env` | Tidak di-commit. Harus diset ulang di Vercel jika ada perubahan |
| `SUPABASE_SERVICE_ROLE_KEY` | Hanya dipakai untuk seed script, tidak boleh masuk ke kode frontend |
| Supabase Storage bucket | `media` — public bucket. Policy: auth insert, public read |
| Vercel deploy | Auto dari push ke branch `main`. Sitemap di-generate ulang tiap build |
| `imgUrl()` | `src/utils/image.ts` — graceful fallback untuk URL non-Supabase |
| Foto placeholder | Beberapa komponen masih pakai `source.unsplash.com` — perlu diganti foto asli |
