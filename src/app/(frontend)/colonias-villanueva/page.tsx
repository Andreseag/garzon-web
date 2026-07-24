import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { DateTabs } from '../components/DateTabs/DateTabs'
import { EventsGrid } from '../components/EventsGrid/EventsGrid'
import { FeaturedCarousel } from '../components/FeaturedCarousel/FeaturedCarousel'
import { Hero } from '../components/Hero/Hero'

interface PageProps {
  searchParams: Promise<{ day?: string }>
}

export default async function ColoniasPage({ searchParams }: PageProps) {
  const { day } = await searchParams
  const payload = await getPayload({ config: configPromise })

  // Traemos todos los eventos ordenados por fecha
  const { docs: allEvents } = await payload.find({
    collection: 'festival-events',
    sort: 'date',
  })

  // Extraemos fechas únicas para los tabs
  const uniqueDates = Array.from(
    new Set(allEvents.map((e) => new Date(e.date).toISOString().split('T')[0])),
  ).sort()

  const selectedDay = day || uniqueDates[0]

  // Filtramos los eventos para la vista actual
  const filteredEvents = allEvents.filter(
    (e) => new Date(e.date).toISOString().split('T')[0] === selectedDay,
  )

  const featuredEvents = allEvents.filter((e) => e.isFeatured)

  return (
    <main className="w-full mx-auto px-4 py-20">
      <Hero />

      <h1 className="text-4xl mt-20 md:text-6xl text-stone-50 text-center mb-8 tracking-tighter">
        Programación Colonias
      </h1>

      {/* Solo mostramos si hay destacados */}
      {featuredEvents.length > 0 && <FeaturedCarousel events={featuredEvents} />}

      {/* Tabs */}
      <DateTabs availableDates={uniqueDates} />

      {/* Grid */}
      <EventsGrid events={filteredEvents} />
    </main>
  )
}
