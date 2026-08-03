import {
  MapPin,
  Calendar,
  CalendarPlus,
  Share2,
  Navigation,
  Image as ImageIcon,
} from 'lucide-react'
import Image from 'next/image'
import { Media } from '@/payload-types'

interface EventCardProps {
  event: any
}

export const EventCard = ({ event }: EventCardProps) => {
  const featuredImage = event.featuredImage as Media

  // Validamos si realmente existe una URL de imagen utilizable
  const imageUrl =
    featuredImage?.cloudinary?.secure_url ||
    featuredImage?.url ||
    (typeof event.featuredImage === 'string' ? event.featuredImage : null)

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
    <div className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Imagen fija */}
      <div className="relative aspect-video overflow-hidden flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-[#2f86cc]/40 flex flex-col items-center justify-center p-6 text-center">
            <div className="p-3 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl text-white mb-2 shadow-inner">
              <ImageIcon
                size={28}
                className="text-[#2f86cc] group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">
              Festival de Colonias
            </span>
          </div>
        )}

        <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#2f86cc] shadow-sm">
          {event.category}
        </div>
      </div>

      {/* Cuerpo principal que se expande para alinear los botones abajo */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Título completo sin restricciones de líneas */}
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
            {event.title}
          </h3>

          <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="flex-shrink-0" />
              <span>{displayDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="flex-shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
        </div>

        {/* Acciones alineadas siempre al fondo */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3 mt-auto">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-[#2f86cc] dark:hover:bg-slate-700 rounded-xl transition-colors flex-1"
            >
              <CalendarPlus size={16} />
              <span>Agendar</span>
            </a>

            {event.googleMapsUrl && (
              <a
                href={event.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-slate-700 rounded-xl transition-colors flex-1"
              >
                <Navigation size={16} />
                <span>Ubicación</span>
              </a>
            )}

            <a
              href={getWhatsAppShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-green-50 hover:text-green-600 dark:hover:bg-slate-700 rounded-xl transition-colors flex-1"
            >
              <Share2 size={16} />
              <span>Compartir</span>
            </a>
          </div>

          {event.promoUrl && (
            <a
              href={event.promoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#2f86cc] dark:hover:bg-[#2f86cc] dark:hover:text-white transition-colors shadow-sm"
            >
              Info / Tickets
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
