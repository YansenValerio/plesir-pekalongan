# Roadmap & Catatan Pengembangan — Plesir Pekalongan

> Terakhir diperbarui: 22 Mei 2026  
> Stack: React 18 + Vite + TypeScript + Tailwind + Supabase + Vercel

---

## Status Saat Ini

| Modul | Status |
|---|---|
| Admin panel (Destinasi / Berita / Event / FAQ) | ✅ Selesai |
| Admin Pesan Masuk | ✅ Selesai |
| Admin Dashboard + Analytics | ✅ Selesai |
| Upload gambar ke Supabase Storage | ✅ Selesai |
| Halaman publik Destinasi | ✅ Selesai (Supabase) |
| Halaman publik Berita | ✅ Selesai (Supabase) |
| Halaman publik Event | ✅ Selesai (Supabase) |
| Halaman Kontak + FAQ | ✅ Selesai (Supabase) |
| Formulir kontak → simpan ke DB | ✅ Selesai |
| Trip Planner (Rencana + Wizard + AI) | ✅ Berfungsi |
| Fitur Bagikan (WA, Twitter, Copy) | ✅ Selesai |
| SEO meta tags (og:image, canonical) | ✅ Selesai |
| Vercel Analytics | ✅ Aktif |
| Pagination Berita & Destinasi | ✅ Selesai |

---

## Yang Masih Kurang

### 1. Komponen Homepage Masih Statis (Prioritas Tinggi)

Tiga komponen di halaman utama belum terhubung ke Supabase — data tidak berubah walaupun admin mengedit konten.

| Komponen | File | Masalah |
|---|---|---|
| `EventsSection` | `src/components/home/EventsSection.tsx` | Masih pakai `eventData` dari JSON statis |
| `UserGalleryFeed` | `src/components/home/UserGalleryFeed.tsx` | Masih pakai `userGalleryData` dari JSON statis |
| `Spotlight` | `src/components/home/Spotlight.tsx` | Hardcoded, pakai foto Unsplash placeholder |
| `DiscoverMap` | `src/components/home/DiscoverMap.tsx` | Angka jumlah destinasi per wilayah hardcoded |

**Solusi yang disarankan:**
- `EventsSection` → ganti import statis dengan `useEventList()` (hook sudah ada)
- `UserGalleryFeed` → buat tabel `user_gallery` di Supabase + admin CRUD
- `Spotlight` → buat tabel `spotlight` di Supabase atau hardcode data final yang benar
- `DiscoverMap` → hitung jumlah destinasi per wilayah live dari Supabase

---

### 2. Tidak Ada Admin untuk User Gallery

`UserGalleryFeed` di homepage menampilkan foto-foto wisatawan, tapi tidak ada cara untuk mengelola konten ini dari admin panel. Data saat ini hardcoded di `data/user-gallery.json`.

**Yang dibutuhkan:**
- Tabel `user_gallery` di Supabase (id, foto_url, username, lokasi, hashtags, caption)
- Halaman admin `/admin/gallery` untuk tambah / hapus foto
- Migrasi `UserGalleryFeed` dari JSON ke Supabase

---

### 3. Sitemap Statis — Tidak Mencakup Konten Individual

`public/sitemap.xml` hanya mencantumkan halaman-halaman utama. Halaman detail destinasi, berita, dan event tidak terindeks oleh mesin pencari.

**Yang dibutuhkan:**
- Generate sitemap dinamis dari data Supabase (Node.js script atau Vercel Edge Function)
- Atau: script yang dijalankan setiap kali deploy untuk menulis ulang `sitemap.xml`

Contoh URL yang hilang:
```
/destinasi/alam/pantai-pasir-kencana
/berita/mengenal-batik-pekalongan
/event/festival-batik-2026
```

---

### 4. Trip Planner — Hasil Tidak Tersimpan

Setelah AI menghasilkan itinerary di `/rencana/hasil`, hasilnya hilang begitu halaman ditutup atau di-refresh. Pengguna tidak bisa kembali ke itinerary yang sudah dibuat.

**Yang dibutuhkan:**
- Simpan hasil itinerary ke `localStorage` (mudah, tanpa backend)
- Atau: simpan ke tabel `itinerary` di Supabase dengan kode unik agar bisa dibagikan via link

---

### 5. Sistem Review & Rating Destinasi

Tabel `destinasi` sudah punya kolom `rating` dan `reviews_count`, tapi angka-angka ini diisi manual dari admin. Tidak ada cara bagi wisatawan untuk memberikan ulasan.

**Yang dibutuhkan:**
- Tabel `review` di Supabase (destinasi_id, nama, rating, komentar, created_at)
- Form kirim review di halaman detail destinasi
- Kalkulasi rata-rata rating otomatis (Supabase trigger atau kalkulasi di frontend)
- Tampilkan daftar review di tab baru di halaman detail

---

### 6. Optimasi Gambar

Gambar dari Supabase Storage dikirim dalam ukuran penuh tanpa kompresi. Ini memperlambat halaman, terutama di galeri dan kartu destinasi.

**Yang dibutuhkan:**
- Gunakan Supabase Image Transformation (sudah tersedia di Storage):
  `?width=800&quality=80` di URL gambar
- Atau: kompres gambar saat upload di komponen `ImageUpload.tsx`
- Tambah `loading="lazy"` pada semua tag `<img>` yang belum memilikinya

---

### 7. Global Search Belum Ada

Tidak ada fitur pencarian yang mencakup semua jenis konten sekaligus. Pencarian di `/destinasi` dan `/berita` hanya bekerja per halaman masing-masing.

**Yang dibutuhkan:**
- Komponen search bar global di Navbar
- Query ke tiga tabel sekaligus (destinasi, berita, event) dengan `ilike`
- Hasil pencarian dengan kelompok per tipe konten

---

### 8. Notifikasi Pesan Masuk untuk Admin

Ketika ada pesan baru dari form kontak, admin tidak mendapat pemberitahuan apapun — harus buka `/admin/pesan` secara manual.

**Yang dibutuhkan (pilih salah satu):**
- Email otomatis via Supabase Edge Function + Resend/SendGrid
- Atau: badge notifikasi di sidebar admin yang menampilkan jumlah pesan yang belum dibaca

---

### 9. Tidak Ada Halaman 404 Custom untuk Konten

Saat slug destinasi/berita/event tidak ditemukan di database, halaman detail hanya menampilkan pesan teks sederhana. Tidak ada redirect ke 404 yang proper.

**Yang dibutuhkan:**
- Redirect ke `<NotFoundPage>` jika data tidak ditemukan
- Atau: halaman "tidak ditemukan" per tipe konten yang lebih baik dengan CTA kembali

---

### 10. Tidak Ada Proteksi Rate Limit pada Form Kontak

Form kontak di `/kontak` bisa dikirim berkali-kali tanpa batasan. Berpotensi mengisi tabel `pesan_kontak` dengan spam.

**Yang dibutuhkan:**
- Tambah `cooldown` state di frontend (nonaktifkan tombol 30 detik setelah kirim)
- Atau: Supabase RLS policy yang membatasi insert per IP (butuh ekstensi `pg_net`)

---

## Yang Bisa Dikembangkan

### A. Fitur Favorit / Wishlist (Sudah Ada Sebagian)

`useFavoriteStore` sudah ada dan bisa menyimpan destinasi favorit di `localStorage`. Tapi belum ada:
- Halaman `/favorit` yang menampilkan semua destinasi tersimpan
- Sinkronisasi favorit ke akun (jika user login)

---

### B. Halaman Profil Wisatawan

Saat ini tidak ada autentikasi untuk pengguna publik (hanya admin). Menambahkan login wisatawan memungkinkan:
- Favorit tersimpan permanen
- Histori itinerary
- Submit review dengan nama terverifikasi

---

### C. Integrasi WhatsApp untuk Notifikasi Admin

Sebagai alternatif yang lebih sederhana dari email, notifikasi pesan baru bisa dikirim ke nomor WhatsApp admin via Fonnte / WhatsApp Business API.

---

### D. Mode Gelap (Dark Mode)

Saat ini tema sudah gelap di admin panel, tapi halaman publik belum mendukung dark mode. Bisa ditambahkan via Tailwind `dark:` variant + toggle di Navbar.

---

### E. PWA (Progressive Web App)

Tambah `manifest.json` dan service worker agar website bisa diinstall di smartphone dan bekerja offline (minimal halaman yang sudah dikunjungi).

---

### F. Multi-Admin / Role Management

Saat ini hanya ada satu akun admin. Jika dibutuhkan tim konten, perlu:
- Tabel `profiles` dengan kolom `role` (super_admin, editor)
- RLS policy berdasarkan role
- Halaman manajemen pengguna di admin panel

---

## Catatan Teknis

| Item | Catatan |
|---|---|
| `.env` | Tidak di-commit. Harus diset ulang di Vercel jika ada perubahan |
| `SUPABASE_SERVICE_ROLE_KEY` | Hanya dipakai untuk seed script, tidak boleh masuk ke kode frontend |
| Supabase Storage bucket | `media` — public bucket. Policy: auth insert, public read |
| Vercel deploy | Auto dari push ke branch `main` |
| Foto placeholder | Beberapa komponen masih pakai `source.unsplash.com` — perlu diganti dengan foto asli |
