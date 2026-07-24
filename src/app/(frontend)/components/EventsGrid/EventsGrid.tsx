import { EventCard } from '../EventCard/EventCard'

export const EventsGrid = ({ events }: { events: any[] }) => {
  if (events.length === 0) {
    return (
      <p className="text-center py-20 text-slate-400">No hay eventos programados por el momento.</p>
    )
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  )
}
