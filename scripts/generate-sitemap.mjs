import { createClient } from '@supabase/supabase-js'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env if present (Vercel injects env vars directly so no file needed)
const envPath = join(__dirname, '../.env')
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = (m[2] ?? '').replace(/^["']|["']$/g, '')
    }
  }
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY
const SITE_URL = process.env.SITE_URL || 'https://plesirpekalongan.id'

if (!SUPABASE_URL || !ANON_KEY) {
  console.error('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, ANON_KEY)
const today = new Date().toISOString().split('T')[0]

function url(path, priority, changefreq, lastmod = today) {
  return `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const STATIC = [
  url('/',                  '1.0', 'weekly'),
  url('/destinasi',         '0.9', 'weekly'),
  url('/destinasi/alam',    '0.8', 'weekly'),
  url('/destinasi/religi',  '0.8', 'weekly'),
  url('/destinasi/budaya',  '0.8', 'weekly'),
  url('/destinasi/kuliner', '0.8', 'weekly'),
  url('/destinasi/belanja', '0.8', 'weekly'),
  url('/event',             '0.9', 'daily'),
  url('/berita',            '0.8', 'daily'),
  url('/rencana',           '0.9', 'monthly'),
  url('/rencana/wizard',    '0.7', 'monthly'),
  url('/kontak',            '0.7', 'monthly'),
]

console.log('Fetching content from Supabase...')

const [destinasi, berita, event] = await Promise.all([
  supabase.from('destinasi').select('id, kategori'),
  supabase.from('berita').select('slug, tanggal_publish'),
  supabase.from('event').select('slug, tanggal_mulai'),
])

if (destinasi.error || berita.error || event.error) {
  console.error('Supabase error:', destinasi.error || berita.error || event.error)
  process.exit(1)
}

const dynamic = [
  ...destinasi.data.map(d =>
    url(`/destinasi/${d.kategori}/${d.id}`, '0.7', 'weekly'),
  ),
  ...berita.data.map(b => {
    const lastmod = b.tanggal_publish ? new Date(b.tanggal_publish).toISOString().split('T')[0] : today
    return url(`/berita/${b.slug}`, '0.6', 'monthly', lastmod)
  }),
  ...event.data.map(e => {
    const lastmod = e.tanggal_mulai ? new Date(e.tanggal_mulai).toISOString().split('T')[0] : today
    return url(`/event/${e.slug}`, '0.7', 'weekly', lastmod)
  }),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC.join('\n')}
${dynamic.join('\n')}
</urlset>
`

const outPath = join(__dirname, '../public/sitemap.xml')
writeFileSync(outPath, xml)

console.log(`Wrote ${STATIC.length + dynamic.length} URLs to public/sitemap.xml`)
console.log(`  · ${STATIC.length} static routes`)
console.log(`  · ${destinasi.data.length} destinasi`)
console.log(`  · ${berita.data.length} berita`)
console.log(`  · ${event.data.length} event`)
