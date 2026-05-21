/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palet Pesisir Pekalongan — migrasi dari :root CSS variables
        primary: '#0A4D68',   // Laut Dalam
        secondary: '#088395', // Laut Dangkal
        accent: '#F5E8C7',    // Pasir Pantai
        sun: '#F2A93B',       // Matahari
        'batik-red': '#C73E3A', // Batik Pesisir
        light: '#FAFAFA',
        dark: '#1A1A1A',
        'text-muted': '#5C6B73',
        line: '#E5E7EB',
        // Skala warna pesisir lengkap
        pesisir: {
          50:  '#F0F9FB',
          100: '#D9F0F4',
          200: '#B3E2EA',
          300: '#7DCCDA',
          400: '#42AFC3',
          500: '#088395', // secondary
          600: '#076A79',
          700: '#065462',
          800: '#063F4C',
          900: '#0A4D68', // primary
          950: '#052333',
        },
        sand: {
          50:  '#FFFDF7',
          100: '#FDF8EC',
          200: '#F5E8C7', // accent
          300: '#EDD49F',
          400: '#E4BE77',
          500: '#F2A93B', // sun
          600: '#E09A2C',
          700: '#C07E1E',
          800: '#9B6318',
          900: '#7A4C12',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      maxWidth: {
        shell: '1280px',
      },
      keyframes: {
        kenBurns: {
          '0%':   { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-1%, -1%)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'ken-burns': 'kenBurns 12s ease-in-out infinite alternate',
        'marquee': 'marquee 30s linear infinite',
        'fade-up': 'fadeUp 0.5s ease forwards',
      },
    },
  },
  plugins: [],
}
