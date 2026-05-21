import DestinasiListing from '@/components/destinasi/DestinasiListing'
import PageMeta from '@/components/common/PageMeta'

export default function DestinasiPage() {
  return (
    <>
      <PageMeta
        title="Destinasi Wisata"
        description="Temukan destinasi wisata terbaik di Pekalongan — pantai, budaya, alam, kuliner, dan belanja."
        path="/destinasi"
      />
      <DestinasiListing />
    </>
  )
}
