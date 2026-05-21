# 🛠️ 01 — Tech Stack

## Filosofi Pemilihan Stack

Semua tools dipilih dengan kriteria:
1. **100% gratis** (free tier cukup untuk MVP)
2. **Modern & maintained** (komunitas aktif)
3. **Mudah dipelajari** (developer solo)
4. **Scalable** (bisa upgrade saat traffic naik)

---

## Core Framework

### **React 18 + Vite + TypeScript**

```bash
npm create vite@latest plesir-pekalongan -- --template react-ts
```

**Mengapa Vite?**
- Hot Module Replacement super cepat
- Bundle size lebih kecil dari Webpack
- Native TypeScript support
- Build time cepat

---

## Styling

### **Tailwind CSS + shadcn/ui**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npx shadcn-ui@latest init
```

**Komponen shadcn yang dipakai:**
- `button`, `card`, `dialog`, `input`, `select`
- `tabs`, `accordion`, `dropdown-menu`, `sheet`
- `calendar`, `popover`, `toast`, `skeleton`

---

## Routing

### **React Router v6**

```bash
npm install react-router-dom
```

**Route structure:**

```
/                          → Home
/destinasi                 → All categories
/destinasi/:kategori       → Listing per kategori
/destinasi/:kategori/:slug → Detail destinasi
/event                     → Event listing
/event/:slug               → Detail event
/berita                    → Berita listing
/berita/:slug              → Detail artikel
/rencana                   → Trip planner landing
/rencana/wizard            → Wizard 4 langkah
/rencana/hasil             → Hasil itinerary AI
/kontak                    → Kontak & FAQ
```

---

## State Management

### **Zustand**

```bash
npm install zustand
```

**Mengapa bukan Redux?**
- Lebih ringan (3KB)
- API sederhana
- Tidak butuh boilerplate
- Cukup untuk MVP

**Store yang dibuat:**
- `tripStore` — state wizard trip planner
- `langStore` — bahasa aktif (ID/EN)
- `favoriteStore` — bookmark destinasi/event

---

## Animasi

### **Framer Motion**

```bash
npm install framer-motion
```

**Use cases:**
- Page transitions
- Hero parallax
- Scroll-triggered animations
- Modal/drawer animations
- Card hover effects

---

## Maps

### **Leaflet.js + react-leaflet** (untuk Interactive Map View ⭐)

```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

**Mengapa Leaflet?**
- 100% gratis (no API key needed)
- Pakai OpenStreetMap tiles
- Ringan (~40KB)
- Mature & stable

**Untuk SVG Peta Pekalongan Section:** pakai native SVG, bukan Leaflet.

---

## Icons

### **Lucide React**

```bash
npm install lucide-react
```

**Mengapa Lucide?**
- 1000+ icons modern
- Tree-shakeable
- Open source (fork dari Feather)

---

## AI Integration

### **Google Gemini API** (`gemini-1.5-flash`)

```bash
npm install @google/generative-ai
```

**Setup:**
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
```

**Free tier limit:**
- 15 requests per minute
- 1.500 requests per day
- 1 million tokens per minute

---

## Internationalization

### **react-i18next**

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

**File structure:**
```
src/locales/
├── id.json (default)
└── en.json
```

---

## PWA (Offline Mode ⭐)

### **vite-plugin-pwa**

```bash
npm install -D vite-plugin-pwa
```

**Features:**
- Service worker otomatis
- Cache strategy untuk asset & API
- Install prompt
- Offline fallback page

**Strategi cache:**
- Static assets: Cache First
- API/data JSON: Stale While Revalidate
- Gemini response: Network First with cache fallback

---

## PDF Generation

### **jsPDF + html2canvas** (untuk Offline Download ⭐)

```bash
npm install jspdf html2canvas
```

**Use case:** Export itinerary jadi PDF untuk dibawa offline.

---

## Calendar Export

### **ics.js** (untuk Add to Calendar ⭐)

```bash
npm install ics
```

**Use case:** Generate .ics file untuk add event ke Google Calendar / Apple Calendar / Outlook.

---

## Form Handling

### **React Hook Form + Zod**

```bash
npm install react-hook-form zod @hookform/resolvers
```

**Use case:** Form kontak dengan validasi.

---

## Date Handling

### **date-fns**

```bash
npm install date-fns
```

**Mengapa bukan moment.js?**
- Tree-shakeable
- Modular
- Smaller bundle size

---

## SEO & Meta

### **react-helmet-async**

```bash
npm install react-helmet-async
```

**Use case:** Dynamic meta tags per halaman (Open Graph, Twitter Card).

---

## Development Tools

```bash
# Linting & Formatting
npm install -D eslint prettier eslint-plugin-react eslint-config-prettier

# Type checking
npm install -D typescript @types/react @types/react-dom

# Build optimization
npm install -D rollup-plugin-visualizer
```

---

## Hosting

### **Vercel** (recommended)

**Mengapa Vercel?**
- Deploy via Git push otomatis
- Free SSL
- Free custom domain
- Edge functions (jika dibutuhkan)
- Analytics free tier

**Alternatif:**
- **Netlify** — similar, sama gratisnya
- **Cloudflare Pages** — banyak bandwidth gratis
- **GitHub Pages** — terbatas, statis only

---

## Total Bundle Size Estimasi

| Library | Size (gzipped) |
|---------|---------------|
| React + ReactDOM | ~45 KB |
| React Router | ~10 KB |
| Tailwind (purged) | ~10 KB |
| Framer Motion | ~25 KB |
| Leaflet | ~40 KB |
| Lucide icons (used only) | ~5 KB |
| Zustand | ~3 KB |
| i18next | ~15 KB |
| **Total estimasi** | **~150-200 KB** |

Target: First Contentful Paint < 1.5s, LCP < 2.5s pada koneksi 4G.

---

## Package.json Final

```json
{
  "name": "plesir-pekalongan",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx"
  },
  "dependencies": {
    "@google/generative-ai": "^0.21.0",
    "@hookform/resolvers": "^3.9.0",
    "date-fns": "^4.1.0",
    "framer-motion": "^11.11.0",
    "html2canvas": "^1.4.1",
    "i18next": "^23.16.0",
    "i18next-browser-languagedetector": "^8.0.0",
    "ics": "^3.8.0",
    "jspdf": "^2.5.2",
    "leaflet": "^1.9.4",
    "lucide-react": "^0.451.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-helmet-async": "^2.0.5",
    "react-hook-form": "^7.53.0",
    "react-i18next": "^15.0.3",
    "react-leaflet": "^4.2.1",
    "react-router-dom": "^6.27.0",
    "zod": "^3.23.8",
    "zustand": "^5.0.0"
  },
  "devDependencies": {
    "@types/leaflet": "^1.9.12",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.12.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.6.2",
    "vite": "^5.4.8",
    "vite-plugin-pwa": "^0.20.5"
  }
}
```
