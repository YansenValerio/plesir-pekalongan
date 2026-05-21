# 🤖 05 — API Integration

Panduan integrasi Google Gemini API untuk fitur AI Trip Planner.

---

## 🔑 Setup API Key

### Langkah 1: Dapatkan API Key

1. Kunjungi [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Login dengan akun Google
3. Klik **"Create API key"**
4. Copy key yang dihasilkan

### Langkah 2: Setup Environment Variable

Buat file `.env` di root project:

```bash
# .env (JANGAN COMMIT KE GIT!)
VITE_GEMINI_API_KEY=AIzaSy...your_key_here
```

Buat file `.env.example` untuk reference:

```bash
# .env.example (BOLEH commit)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Tambahkan ke `.gitignore`:

```
.env
.env.local
.env.production
```

### Langkah 3: Install SDK

```bash
npm install @google/generative-ai
```

---

## 🛠️ Implementation

### 1. Gemini Client (`src/lib/gemini-client.ts`)

```typescript
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("VITE_GEMINI_API_KEY tidak ditemukan di .env file");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 4096,
    responseMimeType: "application/json", // FORCE JSON OUTPUT
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
});
```

### 2. Trip Planner Hook (`src/hooks/useGemini.ts`)

```typescript
import { useState } from "react";
import { geminiModel } from "../lib/gemini-client";

interface TripInput {
  companion: "sendiri" | "berdua" | "keluarga" | "teman";
  interests: string[];
  food_preferences: string[];
  accommodation: "hotel" | "villa" | "hemat";
  start_date: string;
  end_date: string;
  budget_min: number;
  budget_max: number;
  origin_city?: string;
}

interface Itinerary {
  judul_trip: string;
  ringkasan: string;
  estimasi_biaya_total: number;
  breakdown_biaya: {
    transport: number;
    akomodasi: number;
    makan: number;
    tiket_aktivitas: number;
    oleh_oleh: number;
  };
  hari: Array<{
    hari_ke: number;
    tanggal: string;
    tema: string;
    aktivitas: Array<{
      waktu: string;
      tempat: string;
      deskripsi: string;
      durasi_menit: number;
      estimasi_biaya: number;
      koordinat?: { lat: number; lng: number };
      kategori: string;
    }>;
  }>;
  tips: string[];
  packing_list: string[];
}

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateItinerary(input: TripInput): Promise<Itinerary | null> {
    setLoading(true);
    setError(null);

    try {
      const prompt = buildPrompt(input);
      const result = await geminiModel.generateContent(prompt);
      const response = result.response.text();
      
      // Parse JSON response
      const itinerary: Itinerary = JSON.parse(response);
      return itinerary;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
      console.error("Gemini API error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { generateItinerary, loading, error };
}

function buildPrompt(input: TripInput): string {
  const durationDays = Math.ceil(
    (new Date(input.end_date).getTime() - new Date(input.start_date).getTime()) 
    / (1000 * 60 * 60 * 24)
  );

  return `Kamu adalah travel planner ahli untuk Kota Pekalongan, Jawa Tengah, Indonesia.

INPUT WISATAWAN:
- Jumlah orang: ${input.companion}
- Minat: ${input.interests.join(", ")}
- Preferensi makanan: ${input.food_preferences.join(", ")}
- Tipe akomodasi: ${input.accommodation}
- Tanggal: ${input.start_date} sampai ${input.end_date} (${durationDays} hari)
- Budget: Rp ${input.budget_min.toLocaleString("id-ID")} - Rp ${input.budget_max.toLocaleString("id-ID")}
${input.origin_city ? `- Asal kota: ${input.origin_city}` : ""}

TUGASMU:
Buatkan itinerary detail hari-per-hari untuk wisata di Kota Pekalongan saja.
Gunakan HANYA destinasi NYATA yang ada di Kota Pekalongan (utara, selatan, timur, barat).

DESTINASI POPULER YANG BISA KAMU REKOMENDASIKAN:
- Wisata Alam: Pantai Pasir Kencana, Pantai Slamaran, Pantai Depok
- Religi: Masjid Agung Al-Jami', Makam Habib Ahmad Al-Attas Sapuro
- Budaya: Museum Batik Pekalongan, Kampung Batik Kauman, Kampung Batik Pesindon, International Batik Center
- Kuliner: Tauto Pekalongan, Sego Megono, Garang Asem Masin, Pindang Tetel, Apem Kesesi
- Belanja: Pasar Grosir Setono, International Batik Center, Pasar Banjarsari

ATURAN PENTING:
1. Output HARUS dalam format JSON valid
2. Setiap hari minimal 3-5 aktivitas
3. Sesuaikan dengan budget user
4. Hormati preferensi halal jika user pilih (Pekalongan kota santri)
5. Untuk akomodasi "hemat", sarankan homestay/hostel
6. Sertakan estimasi biaya realistis (harga 2026)
7. Sertakan packing list yang sesuai musim
8. Sertakan tips lokal yang berguna

OUTPUT FORMAT (JSON):
{
  "judul_trip": "string - judul kreatif",
  "ringkasan": "string - 2-3 kalimat ringkasan",
  "estimasi_biaya_total": number,
  "breakdown_biaya": {
    "transport": number,
    "akomodasi": number,
    "makan": number,
    "tiket_aktivitas": number,
    "oleh_oleh": number
  },
  "hari": [
    {
      "hari_ke": 1,
      "tanggal": "YYYY-MM-DD",
      "tema": "string - tema hari ini",
      "aktivitas": [
        {
          "waktu": "HH:MM",
          "tempat": "string - nama tempat",
          "deskripsi": "string - deskripsi singkat & rekomendasi",
          "durasi_menit": number,
          "estimasi_biaya": number,
          "koordinat": { "lat": number, "lng": number },
          "kategori": "string - alam/budaya/kuliner/religi/belanja/transport"
        }
      ]
    }
  ],
  "tips": ["string array - tips lokal berguna"],
  "packing_list": ["string array - daftar barang yang perlu dibawa"]
}

PENTING: Hanya keluarkan JSON valid, tanpa markdown backticks atau penjelasan apapun.`;
}
```

### 3. Usage di Component

```typescript
// src/pages/Rencana.tsx
import { useGemini } from "../hooks/useGemini";
import { useTripStore } from "../store/tripStore";

export function RencanaResult() {
  const tripInput = useTripStore((s) => s.input);
  const { generateItinerary, loading, error } = useGemini();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  useEffect(() => {
    async function fetchItinerary() {
      const result = await generateItinerary(tripInput);
      if (result) {
        setItinerary(result);
        // Save to localStorage untuk offline access
        localStorage.setItem("last_itinerary", JSON.stringify(result));
      }
    }
    fetchItinerary();
  }, []);

  if (loading) return <LoadingSpinner message="AI sedang membuat itinerary..." />;
  if (error) return <ErrorState error={error} onRetry={() => fetchItinerary()} />;
  if (!itinerary) return null;

  return <ItineraryDisplay data={itinerary} />;
}
```

---

## 🚦 Rate Limiting & Caching

### Free Tier Limits

- **15 RPM** (Requests Per Minute)
- **1.500 RPD** (Requests Per Day)
- **1 juta TPM** (Tokens Per Minute)

### Strategi Caching

```typescript
// Cache itinerary di localStorage by input hash
function getCacheKey(input: TripInput): string {
  return `itinerary_${JSON.stringify(input)}`;
}

async function getItineraryWithCache(input: TripInput) {
  const cacheKey = getCacheKey(input);
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    const oneDayMs = 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp < oneDayMs) {
      return data;
    }
  }
  
  const fresh = await generateItinerary(input);
  if (fresh) {
    localStorage.setItem(cacheKey, JSON.stringify({
      data: fresh,
      timestamp: Date.now()
    }));
  }
  return fresh;
}
```

### Fallback ke Template

Kalau API gagal atau rate limit, fallback ke template hardcoded:

```typescript
// src/lib/itinerary-templates.ts
export const TEMPLATES = {
  "weekend-budaya": { /* ... */ },
  "family-3d2n": { /* ... */ },
  "backpacker-2d": { /* ... */ },
};

function getFallbackItinerary(input: TripInput) {
  if (input.interests.includes("Budaya")) return TEMPLATES["weekend-budaya"];
  if (input.companion === "keluarga") return TEMPLATES["family-3d2n"];
  return TEMPLATES["backpacker-2d"];
}
```

---

## 🛡️ Error Handling

```typescript
async function generateItinerary(input: TripInput) {
  try {
    const result = await geminiModel.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (err) {
    if (err.message?.includes("quota")) {
      // Rate limit hit
      return getFallbackItinerary(input);
    }
    if (err.message?.includes("API_KEY")) {
      // Invalid key
      throw new Error("API key tidak valid. Cek file .env");
    }
    if (err.message?.includes("JSON")) {
      // Response bukan valid JSON
      return getFallbackItinerary(input);
    }
    throw err;
  }
}
```

---

## 🧪 Testing API

Test script sederhana untuk verify API key:

```typescript
// src/scripts/test-gemini.ts
import { geminiModel } from "../lib/gemini-client";

async function test() {
  const result = await geminiModel.generateContent(
    "Sebutkan 3 destinasi wisata terkenal di Pekalongan. Output JSON: { destinasi: string[] }"
  );
  console.log(result.response.text());
}

test();
```

Run dengan:
```bash
npx tsx src/scripts/test-gemini.ts
```

---

## 🔒 Security Best Practices

1. **JANGAN PERNAH** commit `.env` ke Git
2. **JANGAN PERNAH** hardcode API key di kode
3. **JANGAN PERNAH** expose API key di browser console / network tab
4. Untuk production:
   - Pakai backend proxy (Vercel Functions / Cloudflare Workers)
   - Rate limit per IP
   - API key restriction by domain di Google Cloud Console

### Setup API Key Restriction (di Google Cloud Console):

1. Buka [console.cloud.google.com](https://console.cloud.google.com)
2. APIs & Services > Credentials
3. Edit API key
4. **Application restrictions:** HTTP referrers
5. Tambahkan: `*.vercel.app/*`, `localhost/*`, `plesirpekalongan.id/*`
6. **API restrictions:** Restrict to Generative Language API

---

## 📊 Monitoring Usage

Cek penggunaan di [aistudio.google.com](https://aistudio.google.com):
- Total requests hari ini
- Total tokens consumed
- Rate limit status

Untuk production, tambahkan logging:

```typescript
async function generateItinerary(input: TripInput) {
  const startTime = Date.now();
  try {
    const result = await geminiModel.generateContent(prompt);
    const duration = Date.now() - startTime;
    
    // Log untuk analytics
    console.log("[Gemini] Success", {
      duration_ms: duration,
      input_size: JSON.stringify(input).length,
      output_size: result.response.text().length,
    });
    
    return JSON.parse(result.response.text());
  } catch (err) {
    console.error("[Gemini] Error", err);
    throw err;
  }
}
```
