import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://plesirpekalongan.id'
const DEFAULT_OG = `${BASE_URL}/og-image.jpg`

interface PageMetaProps {
  title?: string
  description?: string
  image?: string
  path?: string
  type?: 'website' | 'article'
}

export default function PageMeta({
  title,
  description = 'Jelajahi keindahan Pekalongan, Kota Batik Dunia. Temukan destinasi wisata, event budaya, dan buat rencana perjalanan dengan AI.',
  image = DEFAULT_OG,
  path = '',
  type = 'website',
}: PageMetaProps) {
  const fullTitle = title
    ? `${title} — Plesir Pekalongan`
    : 'Plesir Pekalongan — Kota Batik Dunia'
  const canonical = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
