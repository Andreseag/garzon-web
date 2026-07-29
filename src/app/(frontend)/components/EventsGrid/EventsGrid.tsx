import { EventCard } from '../EventCard/EventCard'
import GenericCarousel from '../GenericCarousel/GenericCarousel' // Ajusta la ruta según tu estructura

export const EventsGrid = ({ events }: { events: any[] }) => {
  if (events.length === 0) {
    return (
      <p className="text-center py-20 text-slate-400">No hay eventos programados por el momento.</p>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 my-8 w-full">
      <GenericCarousel title="Próximos Eventos">
        {events.map((event) => (
          <div key={event.id} className="flex-shrink-0 w-[260px] sm:w-[350px] md:w-[380px]">
            <EventCard event={event} />
          </div>
        ))}
      </GenericCarousel>
    </section>
  )
}
