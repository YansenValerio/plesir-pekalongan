import CinematicHero from '@/components/home/CinematicHero'
import DiscoverMap from '@/components/home/DiscoverMap'
import Spotlight from '@/components/home/Spotlight'
import HalalBanner from '@/components/home/HalalBanner'
import EventsSection from '@/components/home/EventsSection'
import UserGalleryFeed from '@/components/home/UserGalleryFeed'
import PageMeta from '@/components/common/PageMeta'

export default function HomePage() {
  return (
    <>
      <PageMeta path="/" />
      <CinematicHero />
      <DiscoverMap />
      <Spotlight />
      <HalalBanner />
      <EventsSection />
      <UserGalleryFeed />
    </>
  )
}
