// Shared constants — used across Destinasi, Navbar, DiscoverMap, etc.

export const CATEGORIES = [
  { id: 'alam',    label: 'Wisata Alam',    label_en: 'Nature',    icon: '🏖️', sub: 'Pantai, curug, dan hutan tropis Petungkriyono', sub_en: 'Beaches, waterfalls & Petungkriyono rainforest' },
  { id: 'religi',  label: 'Wisata Religi',  label_en: 'Religious', icon: '🕌', sub: 'Masjid, makam keramat, dan pesantren',          sub_en: 'Mosques, sacred tombs & Islamic boarding schools' },
  { id: 'budaya',  label: 'Wisata Budaya',  label_en: 'Cultural',  icon: '🎨', sub: 'Batik, museum, dan kesenian tradisional',        sub_en: 'Batik villages, museums & traditional arts' },
  { id: 'kuliner', label: 'Wisata Kuliner', label_en: 'Culinary',  icon: '🍜', sub: 'Sego megono, tauto, dan jajanan pesisir',        sub_en: 'Sego megono, tauto & coastal street food' },
  { id: 'belanja', label: 'Wisata Belanja', label_en: 'Shopping',  icon: '🛍️', sub: 'Grosir batik dan kerajinan tangan',             sub_en: 'Batik wholesale & local handicrafts' },
] as const

export type KategoriId = typeof CATEGORIES[number]['id']

export const WILAYAH_LABELS: Record<string, string> = {
  utara: 'Pekalongan Utara',
  selatan: 'Pekalongan Selatan',
  timur: 'Pekalongan Timur',
  barat: 'Pekalongan Barat',
}
