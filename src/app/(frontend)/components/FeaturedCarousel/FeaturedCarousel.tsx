'use client'

import { useState, useEffect } from 'react'
import { Media } from '@/payload-types'
import Image from 'next/image'
import { Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

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
        {/* Pista deslizable con transform */}
        <div
          className="flex transition-transform duration-700 ease-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {events.map((event) => {
            const featuredImage = event.featuredImage as Media
            const displayDate = new Date(event.date).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })

            return (
              <div key={event.id} className="min-w-full h-full relative flex-shrink-0">
                <Image
                  src={
                    featuredImage?.cloudinary?.secure_url ||
                    featuredImage?.url ||
                    '/placeholder.jpg'
                  }
                  alt={event.title}
                  fill
                  className="object-cover"
                />

                {/* Gradiente inmersivo estilo Hero */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
                  <div className="max-w-3xl space-y-3">
                    <span className="bg-[#2f86cc] text-white font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full inline-block shadow-sm">
                      {event.category}
                    </span>

                    <h3 className="text-white text-2xl md:text-4xl font-black leading-tight tracking-tight">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-slate-200 text-sm pt-1">
                      {event.date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar size={16} className="text-[#2f86cc]" />
                          <span>{displayDate}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin size={16} className="text-[#2f86cc]" />
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
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-10"
          aria-label="Evento anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-10"
          aria-label="Siguiente evento"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicadores (Puntitos inferiores) */}
        <div className="absolute bottom-4 right-6 md:right-10 flex gap-2 z-10">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'w-8 bg-[#2f86cc]' : 'w-2 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Ir al evento ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
