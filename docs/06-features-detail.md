# ⭐ 06 — Features Detail (6 Fitur Pilihan)

Detail implementasi 6 fitur tambahan yang Anda pilih:

| # | Fitur | Halaman |
|---|-------|---------|
| A | Live Weather Widget | ~~Home~~ ❌ **DIBATALKAN** |
| B | Galeri User-Generated | Home |
| C | Countdown + Add to Calendar + Live Stream | Event |
| D | Related Articles | Berita |
| E | Interactive Map + Offline Mode | Trip Planner |
| F | FAQ Lengkap | Kontak |

---

## ⭐ B. Galeri User-Generated (Home Page)

### Konsep

Section di home page yang menampilkan foto-foto Pekalongan dari wisatawan dengan hashtag `#PlesirPekalongan`. Format mirip Instagram feed.

### MVP Implementation (Static Data)

Untuk MVP, gunakan static data dummy yang seolah-olah dari Instagram:

```typescript
// data/user-gallery.json
[
  {
    "id": "ug-001",
    "username": "@traveller_jane",
    "user_avatar": "https://i.pravatar.cc/100?img=1",
    "image": "https://source.unsplash.com/600x600/?pekalongan,batik",
    "caption": "Cantiknya batik Pekalongan! 🎨 #PlesirPekalongan #KotaBatik",
    "likes": 234,
    "posted_at": "2026-04-15T10:30:00Z",
    "destinasi_tagged": "kampung-batik-kauman",
    "hashtags": ["PlesirPekalongan", "KotaBatik", "BatikIndonesia"]
  },
  // ... 14-19 more
]
```

### Component Structure

```jsx
// src/components/home/UserGalleryFeed.tsx
function UserGalleryFeed() {
  const [filter, setFilter] = useState("latest");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-display-md text-pesisir-deep mb-4">
            Pekalongan dari Pandangan Wisatawan
          </h2>
          <p className="text-neutral-600">
            Bagikan momenmu dengan <span className="text-pesisir-teal font-semibold">#PlesirPekalongan</span>
          </p>
        </div>

        {/* Filter Chips */}
        <FilterChips 
          options={["Latest", "Popular", "Pantai", "Batik", "Kuliner"]}
          active={filter}
          onChange={setFilter}
        />

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {photos.map((photo) => (
            <GalleryItem 
              key={photo.id} 
              photo={photo}
              onClick={() => setSelectedPhoto(photo)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a 
            href="https://instagram.com/ticpekalongan" 
            target="_blank"
            className="inline-flex items-center gap-2 text-pesisir-teal hover:underline"
          >
            Lihat semua di Instagram <ExternalLink size={16} />
          </a>
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <Lightbox 
            photo={selectedPhoto} 
            onClose={() => setSelectedPhoto(null)} 
          />
        )}
      </div>
    </section>
  );
}
```

### Future Upgrade (Instagram Graph API)

Nanti bisa upgrade ke real Instagram feed:
- Pakai Instagram Basic Display API
- Atau scraping public hashtag dengan service seperti Behold.so
- Atau gunakan webhook untuk auto-sync

---

## ⭐ C. Countdown + Add to Calendar + Live Stream (Event Page)

### C.1 Countdown Timer

```tsx
// src/components/event/CountdownTimer.tsx
import { useState, useEffect } from "react";

interface Props {
  targetDate: string;
  variant?: "card" | "hero";
}

export function CountdownTimer({ targetDate, variant = "card" }: Props) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Don't show if event passed
  if (timeLeft.total <= 0) return null;
  
  // Don't show if more than 30 days away
  if (timeLeft.days > 30) return null;

  if (variant === "card") {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pesisir-sunset/20 text-pesisir-sunset text-xs font-semibold">
        <Clock size={12} />
        <span>{timeLeft.days}h {timeLeft.hours}j lagi</span>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-6 inline-flex gap-4">
      <TimeBlock value={timeLeft.days} label="Hari" />
      <TimeBlock value={timeLeft.hours} label="Jam" />
      <TimeBlock value={timeLeft.minutes} label="Menit" />
      <TimeBlock value={timeLeft.seconds} label="Detik" />
    </div>
  );
}

function calculateTimeLeft(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  
  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
```

### C.2 Add to Calendar

```tsx
// src/components/event/AddToCalendar.tsx
import { createEvent } from "ics";

interface Props {
  event: Event;
}

export function AddToCalendar({ event }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  
  function downloadICS() {
    const start = new Date(event.tanggal_mulai);
    const end = new Date(event.tanggal_selesai);
    
    createEvent({
      start: [start.getFullYear(), start.getMonth() + 1, start.getDate(), 8, 0],
      end: [end.getFullYear(), end.getMonth() + 1, end.getDate(), 20, 0],
      title: event.judul,
      description: event.deskripsi_singkat,
      location: event.lokasi.nama + ", " + event.lokasi.alamat,
      geo: { lat: event.lokasi.koordinat.lat, lon: event.lokasi.koordinat.lng },
      url: window.location.href,
      organizer: { name: event.penyelenggara.nama },
    }, (error, value) => {
      if (error) {
        console.error(error);
        return;
      }
      
      // Download .ics file
      const blob = new Blob([value], { type: "text/calendar" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${event.slug}.ics`;
      link.click();
      URL.revokeObjectURL(url);
    });
  }
  
  function openGoogleCalendar() {
    const start = new Date(event.tanggal_mulai).toISOString().replace(/[-:]|\.\d{3}/g, "");
    const end = new Date(event.tanggal_selesai).toISOString().replace(/[-:]|\.\d{3}/g, "");
    
    const url = new URL("https://calendar.google.com/calendar/render");
    url.searchParams.set("action", "TEMPLATE");
    url.searchParams.set("text", event.judul);
    url.searchParams.set("details", event.deskripsi_singkat);
    url.searchParams.set("location", `${event.lokasi.nama}, ${event.lokasi.alamat}`);
    url.searchParams.set("dates", `${start}/${end}`);
    
    window.open(url.toString(), "_blank");
  }
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary inline-flex items-center gap-2"
      >
        <CalendarPlus size={18} />
        Tambah ke Kalender
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl p-2 min-w-[200px] z-10">
          <button onClick={openGoogleCalendar} className="w-full text-left px-4 py-2 hover:bg-pesisir-50 rounded-lg">
            📅 Google Calendar
          </button>
          <button onClick={downloadICS} className="w-full text-left px-4 py-2 hover:bg-pesisir-50 rounded-lg">
            🍎 Apple Calendar (.ics)
          </button>
          <button onClick={downloadICS} className="w-full text-left px-4 py-2 hover:bg-pesisir-50 rounded-lg">
            📨 Outlook (.ics)
          </button>
        </div>
      )}
    </div>
  );
}
```

### C.3 Live Stream Embed

```tsx
// src/components/event/LiveStreamEmbed.tsx
interface Props {
  event: Event;
}

export function LiveStreamEmbed({ event }: Props) {
  // Only show if event is happening today AND has live URL
  const isLiveToday = isEventLiveNow(event);
  if (!isLiveToday || !event.youtube_live_url) return null;
  
  const videoId = extractYouTubeId(event.youtube_live_url);
  
  return (
    <section className="py-12 bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-pesisir-batik animate-pulse" />
          <span className="text-pesisir-batik font-semibold text-sm uppercase">LIVE NOW</span>
        </div>
        
        <h2 className="font-display text-3xl mb-6">
          Saksikan Langsung: {event.judul}
        </h2>
        
        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
            title={event.judul}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <a 
            href={event.youtube_live_url} 
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-pesisir-batik rounded-lg hover:bg-pesisir-batik/80"
          >
            <Youtube size={16} />
            Tonton di YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

function isEventLiveNow(event: Event): boolean {
  const now = Date.now();
  const start = new Date(event.tanggal_mulai).getTime();
  const end = new Date(event.tanggal_selesai).getTime() + 24 * 60 * 60 * 1000; // include end day
  return now >= start && now <= end;
}

function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([\w-]+)/);
  return match ? match[1] : "";
}
```

---

## ⭐ D. Related Articles (Berita Detail)

### Algoritma Scoring

Cari 3 artikel paling relevan berdasarkan:
- **Kategori sama** (weight: 3)
- **Tag overlap** (weight: 2 per tag)
- **Same month** (weight: 1)

```typescript
// src/lib/related-articles.ts
interface ScoredArticle extends Berita {
  relevance_score: number;
}

export function getRelatedArticles(
  current: Berita, 
  allArticles: Berita[],
  limit = 3
): Berita[] {
  return allArticles
    .filter(article => article.id !== current.id)
    .map(article => {
      let score = 0;
      
      // Same category
      if (article.kategori === current.kategori) score += 3;
      
      // Tag intersection
      const commonTags = article.tags.filter(t => current.tags.includes(t));
      score += commonTags.length * 2;
      
      // Same month
      const currentMonth = new Date(current.tanggal_publish).getMonth();
      const articleMonth = new Date(article.tanggal_publish).getMonth();
      if (currentMonth === articleMonth) score += 1;
      
      return { ...article, relevance_score: score } as ScoredArticle;
    })
    .filter(a => a.relevance_score > 0) // Min 1 point relevance
    .sort((a, b) => b.relevance_score - a.relevance_score)
    .slice(0, limit);
}
```

### Component

```tsx
// src/components/berita/RelatedArticles.tsx
import { getRelatedArticles } from "../../lib/related-articles";
import { beritaData } from "../../data";

export function RelatedArticles({ currentArticle }: { currentArticle: Berita }) {
  const related = getRelatedArticles(currentArticle, beritaData, 3);
  
  if (related.length === 0) return null;
  
  return (
    <section className="py-16 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display text-3xl mb-2 text-pesisir-deep">
          Artikel Terkait
        </h2>
        <p className="text-neutral-600 mb-8">
          Mungkin kamu juga tertarik dengan bacaan ini
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {related.map(article => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## ⭐ E. Interactive Map + Offline Mode (Trip Planner)

### E.1 Interactive Map View

Component yang menampilkan itinerary di Leaflet map dengan rute per hari.

```tsx
// src/components/trip-planner/ItineraryMapView.tsx
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  itinerary: Itinerary;
}

const DAY_COLORS = [
  "#0A4D68", // pesisir-deep
  "#F2A93B", // sunset
  "#088395", // teal
  "#C73E3A", // batik
  "#5C6B73", // neutral
];

export function ItineraryMapView({ itinerary }: Props) {
  // Center map on Pekalongan
  const center: [number, number] = [-6.8898, 109.6750];
  
  return (
    <div className="h-[600px] rounded-2xl overflow-hidden shadow-xl">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {itinerary.hari.map((day, dayIndex) => {
          const color = DAY_COLORS[dayIndex % DAY_COLORS.length];
          const route: [number, number][] = day.aktivitas
            .filter(a => a.koordinat)
            .map(a => [a.koordinat!.lat, a.koordinat!.lng]);
          
          return (
            <React.Fragment key={day.hari_ke}>
              {/* Markers untuk setiap stop */}
              {day.aktivitas.filter(a => a.koordinat).map((activity, i) => (
                <Marker
                  key={`${day.hari_ke}-${i}`}
                  position={[activity.koordinat!.lat, activity.koordinat!.lng]}
                  icon={createNumberedIcon(i + 1, color)}
                >
                  <Popup>
                    <div className="text-sm">
                      <div className="font-semibold text-base mb-1">
                        Hari {day.hari_ke} • {activity.waktu}
                      </div>
                      <div className="font-bold">{activity.tempat}</div>
                      <p className="mt-2">{activity.deskripsi}</p>
                      <div className="mt-2 text-xs text-neutral-600">
                        ⏱️ {activity.durasi_menit} menit • 
                        💰 Rp {activity.estimasi_biaya.toLocaleString("id-ID")}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              {/* Route polyline */}
              {route.length > 1 && (
                <Polyline 
                  positions={route} 
                  color={color}
                  weight={3}
                  opacity={0.7}
                  dashArray="5, 10"
                />
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>
      
      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <div className="text-xs font-semibold mb-2">Hari ke-</div>
        {itinerary.hari.map((day, i) => (
          <div key={day.hari_ke} className="flex items-center gap-2 text-xs mb-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: DAY_COLORS[i % DAY_COLORS.length] }}
            />
            <span>Hari {day.hari_ke} - {day.tema}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper: create numbered icon
function createNumberedIcon(number: number, color: string): Icon {
  const svg = `
    <svg width="32" height="40" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.16 0 0 7.16 0 16c0 8 16 24 16 24s16-16 16-24c0-8.84-7.16-16-16-16z" fill="${color}"/>
      <circle cx="16" cy="16" r="10" fill="white"/>
      <text x="16" y="20" font-family="Arial" font-size="12" font-weight="bold" fill="${color}" text-anchor="middle">${number}</text>
    </svg>
  `;
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svg)}`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });
}
```

### E.2 Offline Download

Export itinerary jadi PDF + save ke localStorage untuk PWA offline.

```tsx
// src/components/trip-planner/OfflineDownload.tsx
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Props {
  itinerary: Itinerary;
}

export function OfflineDownload({ itinerary }: Props) {
  const [exporting, setExporting] = useState(false);
  
  async function exportToPDF() {
    setExporting(true);
    
    try {
      const element = document.getElementById("itinerary-printable");
      if (!element) return;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Header with logo
      pdf.setFontSize(20);
      pdf.setTextColor("#0A4D68");
      pdf.text("Plesir Pekalongan", 20, 20);
      pdf.setFontSize(12);
      pdf.text(itinerary.judul_trip, 20, 30);
      
      pdf.addImage(imgData, "PNG", 0, 40, pdfWidth, pdfHeight);
      
      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor("#5C6B73");
      pdf.text("Generated by Plesir Pekalongan • plesirpekalongan.id", 20, 285);
      
      pdf.save(`itinerary-${itinerary.judul_trip.replace(/\s+/g, "-")}.pdf`);
    } catch (error) {
      console.error("PDF export error:", error);
      alert("Gagal mengekspor PDF. Coba lagi.");
    } finally {
      setExporting(false);
    }
  }
  
  function saveToLocalStorage() {
    const key = `itinerary_${Date.now()}`;
    const savedTrips = JSON.parse(localStorage.getItem("saved_trips") || "[]");
    savedTrips.push({ key, itinerary, saved_at: new Date().toISOString() });
    localStorage.setItem("saved_trips", JSON.stringify(savedTrips));
    alert("Itinerary tersimpan! Bisa diakses offline di browser ini.");
  }
  
  return (
    <div className="flex flex-wrap gap-3">
      <button 
        onClick={exportToPDF}
        disabled={exporting}
        className="btn-primary inline-flex items-center gap-2"
      >
        <Download size={18} />
        {exporting ? "Membuat PDF..." : "Download PDF"}
      </button>
      
      <button 
        onClick={saveToLocalStorage}
        className="btn-secondary inline-flex items-center gap-2"
      >
        <Save size={18} />
        Simpan untuk Offline
      </button>
    </div>
  );
}
```

### E.3 PWA Setup (untuk benar-benar offline)

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt"],
      manifest: {
        name: "Plesir Pekalongan",
        short_name: "Plesir",
        description: "Jelajahi Pesona Kota Batik Dunia",
        theme_color: "#0A4D68",
        background_color: "#FAFAFA",
        display: "standalone",
        orientation: "portrait",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/source\.unsplash\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "unsplash-images",
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.tile\.openstreetmap\.org\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "osm-tiles",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
});
```

---

## ⭐ F. FAQ Lengkap (Kontak Page)

### Implementation

```tsx
// src/components/kontak/FAQAccordion.tsx
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { faqData } from "../../data";

export function FAQAccordion() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("semua");
  const [openId, setOpenId] = useState<string | null>(null);
  
  const categories = [
    { id: "semua", label: "Semua" },
    { id: "umum", label: "Umum" },
    { id: "transportasi", label: "Transportasi" },
    { id: "akomodasi", label: "Akomodasi" },
    { id: "kuliner", label: "Kuliner" },
    { id: "budaya", label: "Budaya" },
    { id: "keamanan", label: "Keamanan" },
    { id: "wisata", label: "Wisata" },
    { id: "tic", label: "TIC" },
  ];
  
  const filteredFAQs = faqData
    .filter(faq => activeCategory === "semua" || faq.kategori === activeCategory)
    .filter(faq => 
      faq.pertanyaan.toLowerCase().includes(search.toLowerCase()) ||
      faq.jawaban.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.urutan - b.urutan);
  
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-display-md text-pesisir-deep mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-neutral-600">
            Temukan jawaban untuk pertanyaan umum seputar wisata di Pekalongan
          </p>
        </div>
        
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pertanyaan..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-pesisir-teal focus:ring-2 focus:ring-pesisir-teal/20"
          />
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-pesisir-deep text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        {/* FAQ List */}
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12 text-neutral-500">
            <p>Tidak ada FAQ yang cocok dengan pencarianmu.</p>
            <a href="#kontak-form" className="text-pesisir-teal hover:underline mt-4 inline-block">
              Hubungi TIC langsung →
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFAQs.map(faq => (
              <div 
                key={faq.id}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-pesisir-50/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    {faq.is_popular && (
                      <span className="px-2 py-0.5 text-xs bg-pesisir-sunset/20 text-pesisir-sunset rounded-full font-semibold">
                        Populer
                      </span>
                    )}
                    <span className="font-medium text-pesisir-deep">
                      {faq.pertanyaan}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`transition-transform ${openId === faq.id ? "rotate-180" : ""}`}
                    size={20}
                  />
                </button>
                
                {openId === faq.id && (
                  <div className="px-6 pb-4 text-neutral-700 leading-relaxed">
                    {faq.jawaban}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* CTA bottom */}
        <div className="mt-12 text-center p-8 bg-pesisir-50 rounded-2xl">
          <h3 className="font-semibold text-pesisir-deep mb-2">
            Tidak menemukan jawaban?
          </h3>
          <p className="text-neutral-600 mb-4">
            Tim TIC Pekalongan siap membantu kamu langsung
          </p>
          <a href="#kontak-form" className="btn-primary inline-flex items-center gap-2">
            Hubungi TIC →
          </a>
        </div>
      </div>
    </section>
  );
}
```
