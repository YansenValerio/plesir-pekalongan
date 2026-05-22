// TypeScript interfaces — berdasarkan docs/04-data-structure.md

export interface Review {
  id: string;
  destinasi_id: string;
  nama: string;
  rating: number;
  komentar: string | null;
  created_at: string;
}

export interface Koordinat {
  lat: number;
  lng: number;
}

export interface JamOperasional {
  senin: string;
  selasa: string;
  rabu: string;
  kamis: string;
  jumat: string;
  sabtu: string;
  minggu: string;
}

export interface TiketDestinasi {
  dewasa: number;
  anak: number;
  parkir_motor?: number;
  parkir_mobil?: number;
}

export interface Destinasi {
  id: string;
  nama: string;
  nama_en: string;
  kategori: 'alam' | 'religi' | 'budaya' | 'kuliner' | 'belanja';
  sub_kategori?: string;
  wilayah: 'utara' | 'selatan' | 'timur' | 'barat';
  deskripsi: string;
  deskripsi_en: string;
  deskripsi_singkat: string;
  foto_cover: string;
  galeri: string[];
  lokasi: {
    alamat: string;
    koordinat: Koordinat;
  };
  jam_operasional?: JamOperasional;
  tiket: TiketDestinasi;
  fasilitas: string[];
  tips: string[];
  tips_en: string[];
  rating: number;
  reviews_count: number;
  tags: string[];
  ramah_muslim: boolean;
  ramah_anak: boolean;
  ramah_difabel: boolean;
  best_time_to_visit?: string[];
  created_at: string;
  updated_at: string;
}

export interface AcaraEvent {
  waktu: string;
  kegiatan: string;
  lokasi_detail?: string;
}

export interface JadwalEvent {
  hari: number;
  tanggal: string;
  acara: AcaraEvent[];
}

export interface TiketEvent {
  kategori: string;
  harga: number;
  fasilitas: string[];
  tersedia: boolean;
  link_pembelian?: string;
}

export interface Penyelenggara {
  nama: string;
  logo?: string;
  telepon?: string;
  email?: string;
  instagram?: string;
  website?: string;
}

export interface Event {
  id: string;
  slug: string;
  judul: string;
  judul_en: string;
  kategori: 'budaya' | 'kuliner' | 'olahraga' | 'seni' | 'keagamaan' | 'festival';
  status: 'upcoming' | 'ongoing' | 'past';
  tanggal_mulai: string;
  tanggal_selesai: string;
  waktu_mulai?: string;
  lokasi: {
    nama: string;
    alamat: string;
    koordinat: Koordinat;
  };
  poster: string;
  galeri: string[];
  deskripsi_singkat: string;
  deskripsi_singkat_en: string;
  deskripsi_lengkap: string;
  deskripsi_lengkap_en: string;
  sejarah?: string;
  jadwal: JadwalEvent[];
  tiket: TiketEvent[];
  penyelenggara: Penyelenggara;
  tips: string[];
  tips_en: string[];
  youtube_live_url?: string;
  youtube_live_active?: boolean;
  tags: string[];
  related_events?: string[];
}

export interface Author {
  nama: string;
  foto?: string;
  bio?: string;
}

export interface Berita {
  id: string;
  slug: string;
  judul: string;
  judul_en: string;
  kategori:
    | 'pariwisata'
    | 'budaya'
    | 'kuliner'
    | 'event'
    | 'umkm'
    | 'heritage'
    | 'tips-wisata'
    | 'hidden-gems';
  cover: string;
  excerpt: string;
  excerpt_en: string;
  konten: string;
  konten_en: string;
  author: Author;
  tanggal_publish: string;
  tanggal_update?: string;
  reading_time: number;
  tags: string[];
  related_destinasi?: string[];
  related_event?: string[];
  views: number;
  is_featured: boolean;
  is_trending: boolean;
}

export interface FAQ {
  id: string;
  kategori:
    | 'umum'
    | 'transportasi'
    | 'akomodasi'
    | 'kuliner'
    | 'budaya'
    | 'keamanan'
    | 'wisata'
    | 'tic';
  pertanyaan: string;
  pertanyaan_en: string;
  jawaban: string;
  jawaban_en: string;
  urutan: number;
  is_popular: boolean;
}

export interface TICInfo {
  nama: string;
  parent_dinas: string;
  alamat: {
    jalan: string;
    kelurahan: string;
    kecamatan: string;
    kota: string;
    provinsi: string;
    kode_pos?: string;
    koordinat: Koordinat;
  };
  kontak: {
    telepon: string;
    whatsapp: string;
    email: string;
    website: string;
  };
  jam_operasional: {
    senin_jumat: string;
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
  layanan: string[];
  emergency_contacts: Array<{
    nama: string;
    nomor: string;
    deskripsi: string;
  }>;
}

export interface Wilayah {
  id: 'utara' | 'selatan' | 'timur' | 'barat';
  svg_id: string;
  nama: string;
  nama_en: string;
  tagline: string;
  tagline_en: string;
  deskripsi: string;
  deskripsi_en: string;
  thumbnail: string;
  destinasi_unggulan: string[];
  jumlah_destinasi: number;
  ciri_khas: string[];
  warna: {
    fill: string;
    fill_hover: string;
    fill_active: string;
  };
}

export interface UserGalleryItem {
  id: string;
  username: string;
  user_avatar: string;
  image: string;
  caption: string;
  likes: number;
  posted_at: string;
  destinasi_tagged: string | null;
  hashtags: string[];
}

// Trip Planner types
export type Companion = 'solo' | 'couple' | 'family' | 'friends';
export type BudgetTier = 'backpacker' | 'standard' | 'premium' | 'luxury';
export type StayType = 'hotel' | 'homestay' | 'budget';

export interface WizardData {
  companion: Companion | null;
  interests: string[];
  food: string[];
  stay: StayType | null;
  startDate: number | null;
  endDate: number | null;
  budget: number;
  budgetTier: BudgetTier | null;
}

export interface ItineraryActivity {
  waktu: string;
  tempat: string;
  deskripsi: string;
  estimasi_biaya?: number;
  durasi_menit?: number;
  koordinat?: { lat: number; lng: number };
  kategori?: string;
}

export interface ItineraryDay {
  hari: number;
  tema: string;
  tanggal?: string;
  aktivitas: ItineraryActivity[];
}

export interface Itinerary {
  judul: string;
  ringkasan: string;
  durasi: number;
  estimasi_biaya: {
    min: number;
    max: number;
  };
  hari: ItineraryDay[];
  tips: string[];
  packing_list?: string[];
}
