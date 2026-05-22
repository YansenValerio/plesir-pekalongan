import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
const faq = JSON.parse(readFileSync(join(__dirname, '../data/faq.json'), 'utf-8'))

console.log(`Seeding ${faq.length} FAQ entries...`)
const { error } = await supabase.from('faq').upsert(faq, { onConflict: 'id' })
if (error) { console.error('Error:', error.message); process.exit(1) }
console.log('Done.')
