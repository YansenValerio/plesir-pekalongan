import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'Plesir Pekalongan',
        short_name: 'Plesir PKL',
        description: 'Jelajahi keindahan Pekalongan, Kota Batik Dunia. Destinasi wisata, event budaya, dan AI Trip Planner.',
        theme_color: '#0A4D68',
        background_color: '#FAFAFA',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-stylesheets', expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-webfonts', expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
          {
            urlPattern: /^https:\/\/tile\.openstreetmap\.org\//,
            handler: 'CacheFirst',
            options: { cacheName: 'osm-tiles', expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 * 30 } },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          i18n: ['react-i18next', 'i18next'],
          motion: ['framer-motion'],
          maps: ['leaflet', 'react-leaflet'],
          gemini: ['@google/generative-ai'],
        },
      },
    },
  },
})
