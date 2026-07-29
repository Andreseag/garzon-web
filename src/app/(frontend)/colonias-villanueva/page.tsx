import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FeaturedCarousel } from '../components/FeaturedCarousel/FeaturedCarousel'
import { Hero } from '../components/Hero/Hero'
import ColoniasContent from '../components/ColoniasContent/ColoniasContent'
import TurismoServer from '../components/TurismoServer/TurismoServer'

export default async function ColoniasPage() {
  const payload = await getPayload({ config: configPromise })

  // Traemos todos los eventos ordenados por fecha una sola vez
  const { docs: allEvents } = await payload.find({
    collection: 'festival-events',
    sort: 'date',
  })

  // Extraemos fechas únicas para los tabs
  const uniqueDates = Array.from(
    new Set(allEvents.map((e) => new Date(e.date).toISOString().split('T')[0])),
  ).sort()

  const featuredEvents = allEvents.filter((e) => e.isFeatured)

  return (
    <main className="w-full mx-auto pb-20">
      {/* <Hero />

      <h1 className="text-3xl font-bold mt-20 md:text-5xl text-stone-900 dark:text-stone-50 text-center mb-8 tracking-tighter">
        Programación Colonias
      </h1> */}

      {/* Solo mostramos si hay destacados */}
      {featuredEvents.length > 0 && <FeaturedCarousel events={featuredEvents} />}

      {/* Contenedor cliente que maneja el estado de los tabs y el filtrado */}
      <ColoniasContent allEvents={allEvents} uniqueDates={uniqueDates}>
        {/* TurismoServer se ejecuta en el servidor y entra como hijo sin romper nada */}
        <TurismoServer />
      </ColoniasContent>
    </main>
  )
}
