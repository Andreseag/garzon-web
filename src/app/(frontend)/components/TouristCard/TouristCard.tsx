import {
  MapPin,
  Phone,
  Navigation,
  ExternalLink,
  Utensils,
  BedDouble,
  MessageSquare,
} from 'lucide-react'
import Image from 'next/image'
import { Media } from '@/payload-types'

interface TouristCardProps {
  item: any
  type: 'restaurant' | 'hotel'
}

export const TouristCard = ({ item, type }: TouristCardProps) => {
  const featuredImage = item.featuredImage as Media
  const imageUrl = featuredImage?.cloudinary?.secure_url || featuredImage?.url || '/placeholder.jpg'

  const getWhatsAppSalesUrl = () => {
    if (!item.phone) return '#'
    const cleanPhone = item.phone.replace(/\D/g, '')

    // Mensaje personalizado según el tipo de establecimiento
    const message =
      type === 'restaurant'
        ? `Hola ${item.name}, me gustaría ver el menú o hacer un pedido.`
        : `Hola ${item.name}, me gustaría consultar disponibilidad y hacer una reserva.`

    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
  }

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#2f86cc] flex items-center gap-1.5">
            {type === 'restaurant' ? <Utensils size={14} /> : <BedDouble size={14} />}
            <span>{type === 'restaurant' ? item.cuisineType || 'Restaurante' : 'Alojamiento'}</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
            {item.name}
          </h3>

          {/* <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
            {item.description}
          </p> */}

          <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#2f86cc] flex-shrink-0" />
              <span className="line-clamp-1">{item.location}</span>
            </div>
            {item.phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-[#2f86cc] flex-shrink-0" />
                <span>{item.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="p-5 pt-0">
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
          {/* Fila secundaria: Ubicación y enlace extra (Menú / Web) */}
          <div className="flex gap-2">
            {item.googleMapsUrl && (
              <a
                href={item.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-slate-700 rounded-xl transition-colors flex-1"
              >
                <Navigation size={16} />
                <span>Ubicación</span>
              </a>
            )}

            {(item.menuUrl || item.bookingUrl) && (
              <a
                href={item.menuUrl || item.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-[#2f86cc] dark:hover:bg-slate-700 rounded-xl transition-colors flex-1"
              >
                <span>{type === 'restaurant' ? 'Ver Menú' : 'Sitio Web'}</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          {/* CTA Principal de Ventas: WhatsApp de Ventas / Reservas */}
          {item.phone && (
            <a
              href={getWhatsAppSalesUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageSquare size={16} />
              <span>{type === 'restaurant' ? 'Pedir por WhatsApp' : 'Reservar por WhatsApp'}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
