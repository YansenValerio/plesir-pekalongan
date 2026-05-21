# 📊 04 — Data Structure

Schema JSON untuk semua data di project. Semua file ini ada di folder `/data/` dan akan di-import ke `src/data/`.

---

## 1. `destinasi.json`

Array of destination objects per kategori.

```typescript
interface Destinasi {
  id: string;                    // unique slug, e.g. "pantai-pasir-kencana"
  nama: string;
  nama_en: string;               // English name
  kategori: "alam" | "religi" | "budaya" | "kuliner" | "belanja";
  sub_kategori?: string;         // e.g. "pantai", "curug", "masjid"
  wilayah: "utara" | "selatan" | "timur" | "barat";
  
  deskripsi: string;             // ID
  deskripsi_en: string;          // EN
  deskripsi_singkat: string;     // for card preview
  
  foto_cover: string;            // URL
  galeri: string[];              // array of image URLs
  
  lokasi: {
    alamat: string;
    koordinat: { lat: number; lng: number };
  };
  
  jam_operasional?: {
    senin: string;               // "08:00-17:00" atau "Tutup"
    selasa: string;
    rabu: string;
    kamis: string;
    jumat: string;
    sabtu: string;
    minggu: string;
  };
  
  tiket: {
    dewasa: number;              // dalam Rupiah, 0 = gratis
    anak: number;
    parkir_motor?: number;
    parkir_mobil?: number;
  };
  
  fasilitas: string[];           // ["parkir", "mushola", "toilet", "wifi", "ramah-difabel"]
  
  tips: string[];                // tip wisatawan
  tips_en: string[];
  
  rating: number;                // 1-5
  reviews_count: number;
  
  tags: string[];                // for search & related
  ramah_muslim: boolean;
  ramah_anak: boolean;
  ramah_difabel: boolean;
  
  best_time_to_visit?: string[]; // ["pagi", "sore"] atau ["April", "Mei"]
  
  created_at: string;            // ISO date
  updated_at: string;
}
```

---

## 2. `event.json`

```typescript
interface Event {
  id: string;
  slug: string;
  judul: string;
  judul_en: string;
  kategori: "budaya" | "kuliner" | "olahraga" | "seni" | "keagamaan" | "festival";
  status: "upcoming" | "ongoing" | "past";
  
  tanggal_mulai: string;         // ISO date "2026-10-01"
  tanggal_selesai: string;
  waktu_mulai?: string;          // "08:00"
  
  lokasi: {
    nama: string;
    alamat: string;
    koordinat: { lat: number; lng: number };
  };
  
  poster: string;
  galeri: string[];              // foto past event
  
  deskripsi_singkat: string;
  deskripsi_singkat_en: string;
  deskripsi_lengkap: string;     // markdown
  deskripsi_lengkap_en: string;
  
  sejarah?: string;              // untuk event tradisional
  
  jadwal: Array<{
    hari: number;
    tanggal: string;
    acara: Array<{
      waktu: string;
      kegiatan: string;
      lokasi_detail?: string;
    }>;
  }>;
  
  tiket: Array<{
    kategori: string;            // "Regular", "VIP", "Gratis"
    harga: number;               // 0 = gratis
    fasilitas: string[];
    tersedia: boolean;
    link_pembelian?: string;
  }>;
  
  penyelenggara: {
    nama: string;
    logo?: string;
    telepon?: string;
    email?: string;
    instagram?: string;
    website?: string;
  };
  
  tips: string[];
  tips_en: string[];
  
  // ⭐ FITUR LIVE STREAM
  youtube_live_url?: string;     // null kalau tidak ada live stream
  youtube_live_active?: boolean; // true kalau sedang live
  
  tags: string[];
  related_events?: string[];     // array of event id
}
```

---

## 3. `berita.json`

```typescript
interface Berita {
  id: string;
  slug: string;
  judul: string;
  judul_en: string;
  kategori: 
    | "pariwisata" 
    | "budaya" 
    | "kuliner" 
    | "event" 
    | "umkm" 
    | "heritage" 
    | "tips-wisata" 
    | "hidden-gems";
  
  cover: string;
  excerpt: string;               // 2-3 kalimat preview
  excerpt_en: string;
  
  konten: string;                // markdown body
  konten_en: string;
  
  author: {
    nama: string;
    foto?: string;
    bio?: string;
  };
  
  tanggal_publish: string;       // ISO
  tanggal_update?: string;
  reading_time: number;          // dalam menit
  
  tags: string[];                // ⭐ DIPAKAI UNTUK RELATED ARTICLES
  
  related_destinasi?: string[];  // array of destinasi id
  related_event?: string[];      // array of event id
  
  views: number;
  is_featured: boolean;          // untuk "Pilihan Editor"
  is_trending: boolean;
}
```

---

## 4. `faq.json`

Untuk halaman Kontak — FAQ lengkap dengan kategori.

```typescript
interface FAQ {
  id: string;
  kategori: 
    | "umum"
    | "transportasi"
    | "akomodasi"
    | "kuliner"
    | "budaya"
    | "keamanan"
    | "wisata"
    | "tic";
  
  pertanyaan: string;
  pertanyaan_en: string;
  jawaban: string;               // bisa markdown
  jawaban_en: string;
  
  urutan: number;                // sort order
  is_popular: boolean;           // top FAQ
}
```

---

## 5. `tic-info.json`

```typescript
interface TICInfo {
  nama: string;                  // "TIC Pekalongan"
  parent_dinas: string;          // nama dinas resmi
  
  alamat: {
    jalan: string;
    kelurahan: string;
    kecamatan: string;
    kota: string;
    provinsi: string;
    kode_pos?: string;
    koordinat: { lat: number; lng: number };
  };
  
  kontak: {
    telepon: string;
    whatsapp: string;
    email: string;
    website: string;
  };
  
  jam_operasional: {
    senin_jumat: string;         // "08:00-17:00"
    sabtu: string;
    minggu: string;
    libur_nasional: string;
  };
  
  sosial_media: {
    instagram: string;
    facebook: string;
    tiktok: string;
    youtube: string;
    x_twitter: string;
  };
  
  layanan: string[];             // daftar layanan TIC
  
  emergency_contacts: Array<{
    nama: string;
    nomor: string;
    deskripsi: string;
  }>;
}
```

---

## 6. `wilayah.json` (untuk Interactive Map)

```typescript
interface Wilayah {
  id: "utara" | "selatan" | "timur" | "barat";
  svg_id: string;                // matches SVG path id, e.g. "Pekalongan_Utara"
  nama: string;
  nama_en: string;
  
  tagline: string;               // "Kawasan pesisir dengan pantai dan kuliner laut"
  tagline_en: string;
  deskripsi: string;
  deskripsi_en: string;
  
  thumbnail: string;
  
  destinasi_unggulan: string[];  // array of destinasi id
  jumlah_destinasi: number;
  
  ciri_khas: string[];           // ["Pantai Pasir Kencana", "Tauto", "Sentra Ikan Asin"]
  
  warna: {
    fill: string;                // override default fill
    fill_hover: string;
    fill_active: string;
  };
}
```

---

## Konvensi Penamaan

### Slugs
- Gunakan kebab-case lowercase
- Hilangkan tanda baca & spasi
- Contoh: `pantai-pasir-kencana`, `pekan-batik-nusantara-2026`

### File Image Paths
Format URL: `https://images.unsplash.com/photo-{id}?w=800` 

Untuk dummy data, gunakan keyword query:
```
https://source.unsplash.com/800x600/?pekalongan
https://source.unsplash.com/800x600/?batik,indonesia
https://source.unsplash.com/800x600/?indonesia,beach
https://source.unsplash.com/800x600/?mosque,java
https://source.unsplash.com/800x600/?street-food,asia
```

### Tanggal
Selalu pakai ISO 8601: `YYYY-MM-DDTHH:mm:ss.sssZ` atau `YYYY-MM-DD` untuk date only.

### Currency
Selalu dalam angka Rupiah (integer), tanpa pemisah ribuan:
```json
"tiket": { "dewasa": 25000, "anak": 15000 }
```

Format display di UI menggunakan `Intl.NumberFormat`:
```typescript
new Intl.NumberFormat('id-ID', { 
  style: 'currency', 
  currency: 'IDR',
  minimumFractionDigits: 0 
}).format(25000)
// Output: "Rp 25.000"
```

---

## Loading Strategy

Untuk MVP, semua data di-import sebagai JSON static:

```typescript
// src/data/index.ts
import destinasiData from './destinasi.json';
import eventData from './event.json';
import beritaData from './berita.json';
import faqData from './faq.json';
import ticInfoData from './tic-info.json';
import wilayahData from './wilayah.json';

export {
  destinasiData,
  eventData,
  beritaData,
  faqData,
  ticInfoData,
  wilayahData,
};
```

**Untuk production nanti**, bisa migrate ke:
- Headless CMS (Strapi, Sanity, Contentful)
- Supabase / Firebase
- Custom API backend
