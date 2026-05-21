# 🎨 02 — Design System

## Filosofi Visual

**Tema Pesisir** — terinspirasi laut utara Jawa Pekalongan: gradasi biru laut, pasir keemasan, dan sentuhan merah batik pesisir yang khas.

**Layout** — mirror persis dari indonesia.travel: clean, generous whitespace, hero-dominant, asymmetric card grids.

---

## 🎨 Palet Warna

### Primary (Laut Dalam)
```
#0A4D68 — deep ocean blue
```
**Use:** Headings utama, navbar solid, footer bg, primary buttons

### Secondary (Laut Dangkal)
```
#088395 — teal pesisir
```
**Use:** Accent links, secondary buttons, hover states, peta default

### Accent 1 (Pasir Pantai)
```
#F5E8C7 — warm sand
```
**Use:** Section backgrounds, card surfaces, soft highlights

### Accent 2 (Matahari Senja)
```
#F2A93B — golden sunset
```
**Use:** CTA buttons, badges "upcoming", hover state peta, highlights

### Accent 3 (Batik Pesisir)
```
#C73E3A — batik red
```
**Use:** Sparingly! Hanya untuk:
- Indikator "live now"
- Badge urgent
- Logo touch
- Error states

### Neutral

```
Background light:  #FAFAFA
Background dark:   #1A1A1A
Text primary:      #1A1A1A
Text secondary:    #5C6B73
Border:            #E5E7EB
Surface card:      #FFFFFF
```

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pesisir: {
          // Primary palette
          deep: "#0A4D68",
          teal: "#088395",
          sand: "#F5E8C7",
          sunset: "#F2A93B",
          batik: "#C73E3A",
          
          // Gradations
          50: "#F0F9FB",
          100: "#D9F0F5",
          200: "#B3E1EB",
          300: "#7FCBDB",
          400: "#3FACC4",
          500: "#088395",  // = teal
          600: "#066B7A",
          700: "#0A4D68",  // = deep
          800: "#0A3D52",
          900: "#0A2D3D",
        },
        // Override default neutral
        neutral: {
          50: "#FAFAFA",
          // ... default neutral palette
          900: "#1A1A1A",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      fontSize: {
        // Display sizes for hero
        "display-xl": ["clamp(3rem, 8vw, 6rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.2" }],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "float": "float 3s ease-in-out infinite",
        "wave": "wave 8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-25%)" },
        },
      },
    },
  },
};
```

---

## ✏️ Typography

### Font Pairing

**Headings: Playfair Display** (serif)
- Elegant, editorial feel
- Cocok untuk tagline "Pekalongan Menanti"
- Pakai untuk h1, h2, hero

**Body: Plus Jakarta Sans** (sans-serif)
- Bahasa Indonesia friendly
- Excellent readability
- Pakai untuk paragraph, navigation, UI

### Import Google Fonts

```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Scale Typography

| Element | Mobile | Desktop | Weight | Font |
|---------|--------|---------|--------|------|
| Hero H1 | 48px | 96px | 600 | Playfair Display |
| H1 | 36px | 56px | 600 | Playfair Display |
| H2 | 28px | 40px | 600 | Playfair Display |
| H3 | 24px | 28px | 600 | Plus Jakarta Sans |
| H4 | 20px | 22px | 600 | Plus Jakarta Sans |
| Body Large | 18px | 18px | 400 | Plus Jakarta Sans |
| Body | 16px | 16px | 400 | Plus Jakarta Sans |
| Caption | 14px | 14px | 400 | Plus Jakarta Sans |
| Small | 12px | 12px | 500 | Plus Jakarta Sans |

---

## 📐 Spacing System

Pakai Tailwind default scale (4px base unit).

**Section padding:**
- Mobile: `py-12 px-4` (48px vertical, 16px horizontal)
- Tablet: `py-16 px-8` (64px vertical, 32px horizontal)
- Desktop: `py-24 px-16` (96px vertical, 64px horizontal)

**Container max-width:**
```css
max-w-7xl mx-auto  /* 1280px */
```

**Card spacing:**
- Padding internal: `p-6` (24px)
- Gap antar card: `gap-6` (24px)

---

## 🎭 Components Pattern

### Buttons

**Primary CTA:**
```jsx
className="bg-pesisir-deep hover:bg-pesisir-700 text-white px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
```

**Secondary:**
```jsx
className="bg-white border-2 border-pesisir-deep text-pesisir-deep hover:bg-pesisir-50 px-8 py-3 rounded-full font-semibold transition-all"
```

**Sunset (warm CTA):**
```jsx
className="bg-pesisir-sunset hover:bg-pesisir-sunset/90 text-white px-8 py-3 rounded-full font-semibold"
```

### Cards

**Standard:**
```jsx
className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
```

**Image card (destinasi):**
```jsx
className="relative aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer"
// + gradient overlay bg-gradient-to-t from-black/80 via-black/20 to-transparent
```

### Inputs

```jsx
className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-pesisir-teal focus:ring-2 focus:ring-pesisir-teal/20 transition-all"
```

### Badges

**Category:**
```jsx
className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-pesisir-50 text-pesisir-deep"
```

**Status (upcoming/live/past):**
```jsx
// Upcoming
"bg-pesisir-sunset/10 text-pesisir-sunset"
// Live
"bg-pesisir-batik/10 text-pesisir-batik animate-pulse"
// Past
"bg-neutral-100 text-neutral-600"
```

---

## 🌊 Visual Patterns Khas Pesisir

### Wave Divider (SVG)

Pakai sebagai pemisah antar section:

```jsx
<svg viewBox="0 0 1440 120" className="w-full">
  <path
    fill="currentColor"
    d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,53.3C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,120L0,120Z"
  />
</svg>
```

### Gradient Backgrounds

```css
/* Ocean gradient */
bg-gradient-to-b from-pesisir-deep via-pesisir-teal to-pesisir-50

/* Sunset gradient */
bg-gradient-to-tr from-pesisir-deep via-pesisir-sunset to-pesisir-sand

/* Subtle section bg */
bg-gradient-to-b from-pesisir-50 to-white
```

### Decorative Elements

- **Wave pattern** sebagai background subtle
- **Dots pattern** untuk section "spotlight"
- **Batik motif** sebagai watermark transparan (sangat sparingly)

---

## 📱 Responsive Breakpoints

```javascript
// Tailwind defaults
sm: 640px   // Mobile landscape
md: 768px   // Tablet portrait
lg: 1024px  // Desktop small
xl: 1280px  // Desktop large
2xl: 1536px // Wide desktop
```

**Strategy: Mobile-First**
- Default: mobile
- Add complexity dari `md:` dan `lg:` saja

---

## ♿ Accessibility

### Color Contrast (WCAG AA minimum)

| Foreground | Background | Ratio | Pass? |
|-----------|-----------|-------|-------|
| `#0A4D68` deep | `#FFFFFF` white | 8.6:1 | ✅ AAA |
| `#088395` teal | `#FFFFFF` white | 5.4:1 | ✅ AA |
| `#5C6B73` text-2 | `#FFFFFF` white | 5.7:1 | ✅ AA |
| `#FFFFFF` white | `#0A4D68` deep | 8.6:1 | ✅ AAA |
| `#F2A93B` sunset | `#FFFFFF` white | 2.4:1 | ❌ — pakai hanya untuk large text |

### Focus States

Selalu visible focus ring:
```jsx
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pesisir-teal focus-visible:ring-offset-2
```

### Skip Link

```jsx
<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4">
  Skip to main content
</a>
```

---

## 🎬 Motion Design Principles

1. **Subtle, not flashy** — animasi tidak boleh distract
2. **Purpose-driven** — setiap animasi punya alasan UX
3. **Performance-aware** — pakai `transform` dan `opacity`, hindari `width/height`
4. **Respect prefers-reduced-motion** — disable animasi untuk user yang mau
5. **Duration konsisten:**
   - Micro (hover): 150-200ms
   - Standard (page elements): 300-400ms
   - Macro (page transitions): 500-700ms

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🌗 Dark Mode

**Tidak wajib di MVP**, tapi siapkan struktur:

```javascript
// tailwind.config.js
darkMode: 'class',
```

Bisa di-enable di Phase 2 nanti.

---

## 📋 Design Checklist Sebelum Ship

- [ ] Semua warna pakai design tokens (no hardcode hex)
- [ ] Semua spacing pakai Tailwind scale
- [ ] Heading hierarchy benar (h1 → h2 → h3, no skip)
- [ ] Semua interactive element punya hover & focus state
- [ ] Contrast ratio minimal AA
- [ ] Alt text untuk semua image
- [ ] Loading state untuk async operations
- [ ] Empty state untuk list/grid kosong
- [ ] Error state untuk form & API failure
- [ ] Mobile test di 375px, 414px, 768px
- [ ] Tablet test di 768px, 1024px
- [ ] Desktop test di 1280px, 1440px, 1920px
