import { useParams } from 'react-router-dom'
import DestinasiListing from '@/components/destinasi/DestinasiListing'
import type { KategoriId } from '@/constants'

const VALID_KATEGORI = ['alam', 'religi', 'budaya', 'kuliner', 'belanja']

export default function DestinasiListingPage() {
  const { kategori } = useParams<{ kategori: string }>()
  const validKat = VALID_KATEGORI.includes(kategori ?? '') ? (kategori as KategoriId) : 'all'
  return <DestinasiListing initialKategori={validKat} />
}
