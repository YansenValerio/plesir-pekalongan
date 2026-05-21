import { GoogleGenerativeAI } from '@google/generative-ai'
import type { WizardData, Itinerary, ItineraryActivity, ItineraryDay } from '@/types'

// Gemini raw response shape (may differ from our Itinerary type)
interface GeminiRaw {
  judul_trip: string
  ringkasan: string
  estimasi_biaya_total: number
  hari: {
    hari_ke: number
    tanggal?: string
    tema: string
    aktivitas: {
      waktu: string
      tempat: string
      deskripsi: string
      durasi_menit?: number
      estimasi_biaya: number
      koordinat?: { lat: number; lng: number }
      kategori?: string
    }[]
  }[]
  tips: string[]
  packing_list?: string[]
}

function hashStr(s: string): string {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return Math.abs(h).toString(36)
}

function cacheKey(data: WizardData): string {
  const seed = JSON.stringify({
    companion: data.companion,
    interests: [...data.interests].sort(),
    food: [...data.food].sort(),
    stay: data.stay,
    startDate: data.startDate,
    endDate: data.endDate,
    budget: Math.round(data.budget / 500000) * 500000,
  })
  return `plesir_itin_${hashStr(seed)}`
}

function buildPrompt(data: WizardData): string {
  const durasi =
    data.startDate && data.endDate
      ? Math.max(1, Math.round((data.endDate - data.startDate) / 86400000) + 1)
      : 3

  const companionLabel: Record<string, string> = {
    solo: 'sendiri (1 orang)',
    couple: 'berdua (pasangan)',
    family: 'keluarga',
    friends: 'bersama teman',
  }
  const stayLabel: Record<string, string> = {
    hotel: 'Hotel & Resort',
    homestay: 'Homestay',
    budget: 'Hemat / Budget',
  }

  const startStr = data.startDate
    ? new Date(data.startDate).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0]
  const endStr = data.endDate
    ? new Date(data.endDate).toISOString().split('T')[0]
    : new Date(Date.now() + durasi * 86400000).toISOString().split('T')[0]

  return `Kamu adalah travel planner ahli untuk Kota Pekalongan, Jawa Tengah, Indonesia.

INPUT WISATAWAN:
- Teman perjalanan: ${companionLabel[data.companion ?? 'solo'] ?? 'sendiri'}
- Minat: ${data.interests.join(', ') || 'umum'}
- Preferensi makanan: ${data.food.join(', ') || 'tidak ada preferensi'}
- Akomodasi: ${stayLabel[data.stay ?? 'budget'] ?? 'Hemat'}
- Tanggal: ${startStr} sampai ${endStr} (${durasi} hari)
- Budget total: Rp ${data.budget.toLocaleString('id-ID')} (tier: ${data.budgetTier ?? 'standard'})

TUGASMU:
Buatkan itinerary detail ${durasi} hari untuk wisata di Kota/Kabupaten Pekalongan.
Gunakan HANYA destinasi nyata di wilayah Pekalongan.

DESTINASI YANG BISA DIREKOMENDASIKAN:
- Pantai: Pantai Pasir Kencana, Pantai Slamaran, Pantai Depok
- Religi: Masjid Agung Al-Jami', Makam Habib Ahmad Al-Attas Sapuro
- Budaya: Museum Batik Pekalongan, Kampung Batik Kauman, Kampung Batik Pesindon, International Batik Center
- Kuliner: Tauto Pekalongan, Sego Megono, Garang Asem Masin, Pindang Tetel
- Belanja: Pasar Grosir Setono, Pasar Banjarsari
- Alam: Petungkriyono, Curug Bajing, Linggoasri, Hutan Sokokembang

ATURAN:
1. Output HANYA JSON valid tanpa markdown fence atau penjelasan tambahan
2. Setiap hari 3-5 aktivitas
3. Sesuaikan dengan budget (estimasi_biaya per aktivitas adalah integer rupiah)
4. Jika ada preferensi Halal, semua rekomendasi kuliner harus halal
5. Sertakan koordinat GPS realistis untuk wilayah Pekalongan (lat -6.75 s/d -7.05, lng 109.55 s/d 109.85)
6. Tanggal per hari mengikuti ${startStr} + offset hari

OUTPUT FORMAT (semua biaya integer rupiah, bukan string):
{
  "judul_trip": "string kreatif",
  "ringkasan": "2-3 kalimat",
  "estimasi_biaya_total": 2500000,
  "hari": [
    {
      "hari_ke": 1,
      "tanggal": "${startStr}",
      "tema": "string",
      "aktivitas": [
        {
          "waktu": "08:00",
          "tempat": "nama tempat",
          "deskripsi": "deskripsi singkat",
          "durasi_menit": 90,
          "estimasi_biaya": 15000,
          "koordinat": { "lat": -6.89, "lng": 109.67 },
          "kategori": "kuliner"
        }
      ]
    }
  ],
  "tips": ["tip 1", "tip 2"],
  "packing_list": ["item 1", "item 2"]
}

PENTING: Hanya JSON valid. Tanpa backticks, tanpa penjelasan.`
}

export function makeFallback(data: WizardData): Itinerary {
  const durasi =
    data.startDate && data.endDate
      ? Math.max(1, Math.round((data.endDate - data.startDate) / 86400000) + 1)
      : 3

  const samples: { tema: string; aktivitas: ItineraryActivity[] }[] = [
    {
      tema: 'Pesona Pesisir Pekalongan',
      aktivitas: [
        { waktu: '07:00', tempat: 'Sego Megono Pak Toha', deskripsi: 'Sarapan ikonik di warung legendaris Jl. Hayam Wuruk. Nikmati nasi dengan sayur nangka muda berbumbu khas.', estimasi_biaya: 15000, kategori: 'kuliner', koordinat: { lat: -6.894, lng: 109.675 } },
        { waktu: '09:00', tempat: 'Pantai Pasir Kencana', deskripsi: 'Berjalan di dermaga panjang, foto-foto, dan menikmati hembusan angin laut. Tersedia wahana air dan kuliner pantai.', estimasi_biaya: 10000, kategori: 'alam', koordinat: { lat: -6.870, lng: 109.653 } },
        { waktu: '12:30', tempat: 'Tauto Pak Inin', deskripsi: 'Soto khas Pekalongan berkuah tauco segar di pusat kota. Wajib dicoba setiap berkunjung ke Pekalongan.', estimasi_biaya: 30000, kategori: 'kuliner', koordinat: { lat: -6.893, lng: 109.674 } },
        { waktu: '15:00', tempat: 'Museum Batik Pekalongan', deskripsi: 'Eksplorasi ribuan koleksi batik nusantara dan ikuti workshop membatik singkat bersama pengrajin berpengalaman.', estimasi_biaya: 15000, kategori: 'budaya', koordinat: { lat: -6.894, lng: 109.675 } },
      ],
    },
    {
      tema: 'Jelajah Batik & Heritage',
      aktivitas: [
        { waktu: '08:00', tempat: 'Kampung Batik Kauman', deskripsi: 'Tur kampung batik tertua di Pekalongan. Bertemu pengrajin generasi ketiga dan saksikan proses membatik tulis.', estimasi_biaya: 25000, kategori: 'budaya', koordinat: { lat: -6.894, lng: 109.674 } },
        { waktu: '11:00', tempat: "Masjid Agung Al-Jami'", deskripsi: 'Masjid bersejarah di jantung kota dengan arsitektur kolonial yang megah dan bernilai historis tinggi.', estimasi_biaya: 0, kategori: 'religi', koordinat: { lat: -6.893, lng: 109.670 } },
        { waktu: '13:00', tempat: 'Garang Asem Masin', deskripsi: 'Makan siang ayam asam pedas dibungkus daun pisang — kuliner paling otentik yang wajib dicoba di Pekalongan.', estimasi_biaya: 35000, kategori: 'kuliner', koordinat: { lat: -6.895, lng: 109.677 } },
        { waktu: '16:00', tempat: 'Pasar Grosir Setono', deskripsi: 'Belanja batik grosir di kompleks terbesar — lebih dari 1000 toko dengan harga langsung dari produsen.', estimasi_biaya: 200000, kategori: 'belanja', koordinat: { lat: -6.886, lng: 109.669 } },
      ],
    },
    {
      tema: 'Petualangan Petungkriyono',
      aktivitas: [
        { waktu: '06:30', tempat: 'Perjalanan ke Petungkriyono', deskripsi: 'Perjalanan 1.5 jam ke pegunungan selatan. Bawa jaket tipis — udara segar di ketinggian 1200 mdpl.', estimasi_biaya: 50000, kategori: 'transport', koordinat: { lat: -7.047, lng: 109.734 } },
        { waktu: '09:00', tempat: 'Curug Bajing', deskripsi: 'Trek 15 menit ke air terjun setinggi 75 meter yang memesona. Salah satu spot foto terbaik di Pekalongan.', estimasi_biaya: 15000, kategori: 'alam', koordinat: { lat: -7.049, lng: 109.731 } },
        { waktu: '13:00', tempat: 'Hutan Sokokembang', deskripsi: 'Tur edukasi habitat Owa Jawa yang terancam punah bersama pemandu lokal berpengalaman.', estimasi_biaya: 20000, kategori: 'alam', koordinat: { lat: -7.053, lng: 109.735 } },
        { waktu: '16:00', tempat: 'Pemandian Linggoasri', deskripsi: 'Berendam di sumber air dingin alami yang menyegarkan sambil menikmati pemandangan pegunungan.', estimasi_biaya: 12000, kategori: 'alam', koordinat: { lat: -7.020, lng: 109.714 } },
      ],
    },
  ]

  const hariList: ItineraryDay[] = Array.from({ length: durasi }, (_, i) => {
    const s = samples[i % samples.length]
    return {
      hari: i + 1,
      tema: s.tema,
      ...(data.startDate ? { tanggal: new Date(data.startDate + i * 86400000).toISOString().split('T')[0] } : {}),
      aktivitas: s.aktivitas,
    }
  })

  const total = data.budget * 0.85
  return {
    judul: `Petualangan ${durasi} Hari di Pekalongan`,
    ringkasan: `Rencana ${data.budgetTier ?? 'standard'} untuk ${data.companion ?? 'kamu'} dengan fokus ${data.interests.slice(0, 2).join(' & ') || 'pesona Pekalongan'}. Nikmati perpaduan wisata pantai, kuliner otentik, dan warisan budaya batik kota pesisir Jawa.`,
    durasi,
    estimasi_biaya: { min: Math.round(total * 0.9), max: Math.round(total * 1.1) },
    hari: hariList,
    tips: [
      'Pekalongan paling enak dijelajahi dengan sewa motor — sekitar Rp 75.000/hari.',
      'Hindari kunjungan Petungkriyono saat musim hujan (Jan–Feb) — jalur bisa licin.',
      'Bawa cash secukupnya, banyak warung khas belum menerima QRIS.',
      'Hormati waktu sholat saat berkunjung ke kawasan religi.',
      'Sego megono terbaik disajikan pagi hari — datang sebelum jam 08:00.',
    ],
    packing_list: ['Sunscreen & topi', 'Sandal pantai', 'Jaket tipis (Petungkriyono)', 'Kamera/tripod', 'Obat perut (banyak kuliner pedas)'],
  }
}

function transformResponse(raw: GeminiRaw, data: WizardData): Itinerary {
  const durasi =
    data.startDate && data.endDate
      ? Math.max(1, Math.round((data.endDate - data.startDate) / 86400000) + 1)
      : (raw.hari?.length ?? 3)

  const total = typeof raw.estimasi_biaya_total === 'number' ? raw.estimasi_biaya_total : data.budget

  return {
    judul: raw.judul_trip ?? 'Itinerary Pekalongan',
    ringkasan: raw.ringkasan ?? '',
    durasi,
    estimasi_biaya: {
      min: Math.round(total * 0.85),
      max: Math.round(total * 1.15),
    },
    hari: (raw.hari ?? []).map(h => ({
      hari: h.hari_ke,
      tema: h.tema,
      ...(h.tanggal ? { tanggal: h.tanggal } : {}),
      aktivitas: (h.aktivitas ?? []).map(a => ({
        waktu: a.waktu,
        tempat: a.tempat,
        deskripsi: a.deskripsi,
        ...(typeof a.estimasi_biaya === 'number' ? { estimasi_biaya: a.estimasi_biaya } : {}),
        ...(a.koordinat ? { koordinat: a.koordinat } : {}),
        ...(a.durasi_menit ? { durasi_menit: a.durasi_menit } : {}),
        ...(a.kategori ? { kategori: a.kategori } : {}),
      } as ItineraryActivity)),
    })),
    tips: raw.tips ?? [],
    ...(raw.packing_list ? { packing_list: raw.packing_list } : {}),
  }
}

export async function generateItinerary(data: WizardData): Promise<Itinerary> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined
  if (!apiKey) return makeFallback(data)

  // Check cache (TTL 24h)
  const ck = cacheKey(data)
  try {
    const cached = localStorage.getItem(ck)
    if (cached) {
      const { itinerary, ts } = JSON.parse(cached) as { itinerary: Itinerary; ts: number }
      if (Date.now() - ts < 24 * 60 * 60 * 1000) return itinerary
    }
  } catch {
    // ignore cache errors
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
        responseMimeType: 'application/json',
      },
    })
    const result = await model.generateContent(buildPrompt(data))
    let text = result.response.text().trim()
    // Strip markdown fences if model ignores the mime type hint
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')
    const m = text.match(/\{[\s\S]*\}/)
    if (m) text = m[0]
    const raw = JSON.parse(text) as GeminiRaw
    const itinerary = transformResponse(raw, data)
    try {
      localStorage.setItem(ck, JSON.stringify({ itinerary, ts: Date.now() }))
    } catch {
      // ignore storage quota errors
    }
    return itinerary
  } catch {
    return makeFallback(data)
  }
}
