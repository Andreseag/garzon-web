import { EventCard } from '../EventCard/EventCard'
import GenericCarousel from '../GenericCarousel/GenericCarousel'

export const EventsGrid = ({ events }: { events: any[] }) => {
  if (events.length === 0) {
    return (
      <p className="text-center py-20 text-slate-400">No hay eventos programados por el momento.</p>
    )
  }

  // Creamos una key única combinando los IDs de los eventos del día actual.
  // Cuando cambias de tab, esta key cambia y obliga al carrusel a reiniciarse desde el inicio.
  const carouselKey = events.map((e) => e.id).join('-')

  return (
    <section className="max-w-7xl mx-auto px-4 my-8 w-full">
      <GenericCarousel key={carouselKey} title="Próximos Eventos">
        {events.map((event) => (
          <div key={event.id} className="flex-shrink-0 w-[260px] sm:w-[350px] md:w-[380px]">
            <EventCard event={event} />
          </div>
        ))}
      </GenericCarousel>
    </section>
  )
}
