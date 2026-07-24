import { MapPin, Calendar, CalendarPlus, Share2 } from 'lucide-react'
import Image from 'next/image'
import { Media } from '@/payload-types'

interface EventCardProps {
  event: any
}

export const EventCard = ({ event }: EventCardProps) => {
  const featuredImage = event.featuredImage as Media

  // 1. Formateo para mostrar
  const displayDate = new Date(event.date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  // 2. Funciones para generar enlaces
  const getGoogleCalendarUrl = () => {
    const start = new Date(event.date)
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000) // Duración de 2 horas

    const format = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '')

    const base = 'https://www.google.com/calendar/render?action=TEMPLATE'
    const text = encodeURIComponent(event.title)
    const details = encodeURIComponent(`Evento en las Colonias de Villanueva: ${event.location}`)
    const dates = `${format(start)}/${format(end)}`
    const location = encodeURIComponent(event.location || 'Villanueva, Casanare')

    return `${base}&text=${text}&details=${details}&dates=${dates}&location=${location}`
  }

  const getWhatsAppShareUrl = () => {
    const text = encodeURIComponent(
      `¡No te pierdas este evento en las Colonias de Villanueva!\n\n*${event.title}*\n📅 ${displayDate}\n📍 ${event.location}\n\n¡Te espero allá!`,
    )
    return `https://wa.me/?text=${text}`
  }

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={featuredImage?.cloudinary?.secure_url || featuredImage?.url || '/placeholder.jpg'}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#2f86cc]">
          {event.category}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
          {event.title}
        </h3>

        <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{displayDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex gap-2">
            {/* Google Calendar */}
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              title="Añadir al calendario"
              className="p-2 text-slate-400 hover:text-[#2f86cc] hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <CalendarPlus size={20} />
            </a>
            {/* WhatsApp */}
            <a
              href={getWhatsAppShareUrl()}
              target="_blank"
              title="Compartir por WhatsApp"
              className="p-2 border text-slate-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Share2 size={20} />
            </a>
          </div>

          {event.promoUrl && (
            <a
              href={event.promoUrl}
              target="_blank"
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#2f86cc] transition-colors"
            >
              Info / Tickets
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
