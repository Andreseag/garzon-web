'use client'

import {
  MapPin,
  Phone,
  Navigation,
  ExternalLink,
  Utensils,
  BedDouble,
  Wine,
  Waves,
  MessageSquare,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Media } from '@/payload-types'

interface TouristCardProps {
  item: any
  type: 'restaurant' | 'hotel' | 'bar'
}

// Diccionarios globales fuera del componente para mejor rendimiento y orden
const COLLECTION_ROUTES = {
  restaurant: 'restaurants',
  hotel: 'hotels',
  bar: 'bars',
} as const

const CATEGORY_LABELS: Record<string, { label: string; icon: any }> = {
  // Hoteles / Balnearios
  hotel: { label: 'Hotel / Alojamiento', icon: BedDouble },
  balneario: { label: 'Balneario', icon: Waves },

  // Bares
  traditional_bar: { label: 'Bar Tradicional', icon: Wine },
  gastrobar: { label: 'Gastrobar', icon: Wine },
  nightclub: { label: 'Discoteca / Club', icon: Wine },
  brewery: { label: 'Cervecería', icon: Wine },
  other: { label: 'Bar / Nocturna', icon: Wine },
}

export const TouristCard = ({ item, type }: TouristCardProps) => {
  const featuredImage = item.featuredImage as Media
  const imageUrl = featuredImage?.cloudinary?.secure_url || featuredImage?.url || '/placeholder.jpg'

  const routePrefix = COLLECTION_ROUTES[type] || 'restaurants'

  const getWhatsAppSalesUrl = () => {
    if (!item.phone) return '#'
    const cleanPhone = item.phone.replace(/\D/g, '')

    const message =
      type === 'restaurant'
        ? `Hola ${item.name}, me gustaría ver el menú o hacer un pedido.`
        : type === 'hotel'
          ? `Hola ${item.name}, me gustaría consultar disponibilidad y hacer una reserva.`
          : `Hola ${item.name}, me gustaría consultar información sobre el bar.`

    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
  }

  // Obtención optimizada del icono y etiqueta del badge
  const getBadgeConfig = () => {
    if (type === 'restaurant') {
      return {
        icon: <Utensils size={14} />,
        label: item.cuisineType || 'Restaurante',
      }
    }

    // Para hoteles y bares, leemos el campo de categoría respectivo (category o barType)
    const categoryKey = type === 'hotel' ? item.category : item.barType
    const matchedCategory = CATEGORY_LABELS[categoryKey]

    if (matchedCategory) {
      const IconComponent = matchedCategory.icon
      return {
        icon: <IconComponent size={14} />,
        label: matchedCategory.label,
      }
    }

    // Fallback por defecto si no coincide con ninguno
    return {
      icon: type === 'hotel' ? <BedDouble size={14} /> : <Wine size={14} />,
      label: type === 'hotel' ? 'Alojamiento' : 'Bar / Nocturna',
    }
  }

  const badge = getBadgeConfig()

  return (
    <div className="group h-full flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <Link href={`/${routePrefix}/${item.slug}`} className="flex-1 flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#2f86cc] flex items-center gap-1.5 shadow-sm">
            {badge.icon}
            <span>{badge.label}</span>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-[#2f86cc] transition-colors">
              {item.name}
            </h3>

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
      </Link>

      <div className="p-5 pt-0 mt-auto">
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
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

          {item.phone && (
            <a
              href={getWhatsAppSalesUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageSquare size={16} />
              <span>
                {type === 'restaurant'
                  ? 'Pedir por WhatsApp'
                  : type === 'hotel'
                    ? 'Reservar por WhatsApp'
                    : 'Contactar por WhatsApp'}
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
