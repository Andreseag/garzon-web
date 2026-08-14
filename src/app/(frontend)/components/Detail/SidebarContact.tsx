'use client'

import { Phone, Navigation, ExternalLink, MessageSquare, MapPin } from 'lucide-react'

interface SidebarContactProps {
  phone?: string
  mapUrl?: string
  name: string
  type: 'restaurant' | 'hotel' | 'bar'
  address?: string
  menuUrl?: string
}

export const SidebarContact = ({
  phone,
  mapUrl,
  name,
  type,
  address,
  menuUrl,
}: SidebarContactProps) => {
  // Limpieza del teléfono y generación de mensaje automático para WhatsApp
  const getWhatsAppSalesUrl = () => {
    if (!phone) return '#'
    const cleanPhone = phone.replace(/\D/g, '')

    const message =
      type === 'restaurant'
        ? `Hola ${name}, me gustaría ver el menú o hacer un pedido.`
        : type === 'hotel'
          ? `Hola ${name}, me gustaría consultar disponibilidad y hacer una reserva.`
          : `Hola ${name}, me gustaría consultar información sobre el bar.`

    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
      {/* Encabezado del Sidebar */}
      <div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          Información de Contacto
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Comunícate directamente o planifica tu visita.
        </p>
      </div>

      {/* Datos rápidos (Dirección y Teléfono plano) */}
      <div className="space-y-3 pt-1 border-t border-slate-100 dark:border-slate-800">
        {address && (
          <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 pt-3">
            <MapPin size={18} className="text-[#2f86cc] flex-shrink-0 mt-0.5" />
            <span className="leading-snug">{address}</span>
          </div>
        )}

        {phone && (
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <Phone size={18} className="text-[#2f86cc] flex-shrink-0" />
            <span className="font-medium">{phone}</span>
          </div>
        )}
      </div>

      {/* Botones de Acción */}
      <div className="space-y-3 pt-2">
        {phone && (
          <a
            href={getWhatsAppSalesUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
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

        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-3 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <Navigation size={16} />
            <span>Ver en Google Maps</span>
          </a>
        )}

        {menuUrl && (
          <a
            href={menuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-sky-50 hover:text-[#2f86cc] dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-3 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <span>{type === 'restaurant' ? 'Ver Menú Web' : 'Sitio Web Oficial'}</span>
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  )
}
