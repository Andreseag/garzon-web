'use client'

import { useState, useEffect } from 'react'
import { Media } from '@/payload-types'
import Image from 'next/image'
import { Calendar, MapPin, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'

export const FeaturedCarousel = ({ events }: { events: any[] }) => {
  if (!events || events.length === 0) return null

  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1))
  }

  // Opcional: Auto-avance cada 6 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [events.length])

  return (
    <div className="relative w-full mb-16 group">
      {/* Contenedor principal estilo Banner Hero */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden shadow-2xl bg-slate-900">
        {/* Contenedor de slides con fundido (Fade / Crossfade) */}
        <div className="relative w-full h-full">
          {events.map((event, index) => {
            const featuredImage = event.featuredImage as Media

            // Validamos si realmente existe una URL de imagen utilizable
            const imageUrl =
              featuredImage?.cloudinary?.secure_url ||
              featuredImage?.url ||
              (typeof event.featuredImage === 'string' ? event.featuredImage : null)

            const displayDate = new Date(event.date).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })

            const isActive = currentIndex === index

            return (
              <div
                key={event.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive
                    ? 'opacity-100 z-10 pointer-events-auto'
                    : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {imageUrl ? (
                  <Image src={imageUrl} alt={event.title} fill className="object-cover" />
                ) : (
                  /* Fallback elegante cuando no hay imagen en el carrusel */
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-primary/50 flex flex-col items-center justify-center">
                    <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white mb-3 shadow-inner">
                      <ImageIcon size={36} className="text-primary" />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                      Festival de Colonias
                    </span>
                  </div>
                )}

                {/* Gradiente inmersivo estilo Hero */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
                  <div className="max-w-3xl space-y-3">
                    <span className="bg-primary text-white font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full inline-block shadow-sm">
                      {event.category}
                    </span>

                    <h3 className="text-white text-2xl md:text-4xl font-black leading-tight tracking-tight">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-slate-200 text-sm pt-1">
                      {event.date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar size={16} className="text-primary" />
                          <span>{displayDate}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin size={16} className="text-primary" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Botones de navegación (Flechas laterales que aparecen al hacer hover) */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-20 cursor-pointer"
          aria-label="Evento anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-20 cursor-pointer"
          aria-label="Siguiente evento"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicadores (Puntitos inferiores) */}
        <div className="absolute bottom-4 right-6 md:right-10 flex gap-2 z-20">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index ? 'w-8 bg-primary' : 'w-2 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Ir al evento ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
