'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types' // Asegúrate de regenerar los tipos con npx payload generate:types

interface GlobalPromoSliderProps {
  promos: any[]
}

export const GlobalPromoSlider = ({ promos }: GlobalPromoSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Filtrar solo las activas por seguridad
  const activePromos = promos.filter((p) => p.isActive)

  useEffect(() => {
    if (activePromos.length <= 1) return

    // Rotar automáticamente cada 5 segundos
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activePromos.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [activePromos.length])

  if (activePromos.length === 0) return null

  const currentPromo = activePromos[currentIndex]

  const content = (
    <div className="relative w-full bg-slate-950 text-white overflow-hidden shadow-lg border-y border-blue-900/30">
      {/* Contenedor del banner */}
      <div className="max-w-7xl mx-auto relative h-32 sm:h-36 md:h-40 w-full flex items-center justify-center overflow-hidden bg-slate-950">
        {activePromos.map((promo, idx) => {
          // Extraer ambas imágenes horizontales
          const hImgDesktop = promo.horizontalImageDesktop as Media
          const urlDesktop = hImgDesktop?.cloudinary?.secure_url || hImgDesktop?.url || ''

          const hImgMobile = promo.horizontalImageMobile as Media
          const urlMobile = hImgMobile?.cloudinary?.secure_url || hImgMobile?.url || ''

          return (
            <div
              key={promo.id}
              className={`absolute inset-0 transition-opacity duration-700 flex items-center justify-center ${
                idx === currentIndex
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* === VERSIÓN DESKTOP (Se oculta en mobile) === */}
              {urlDesktop && (
                <div className="hidden md:block relative w-full h-full">
                  <Image
                    src={urlDesktop}
                    alt={promo.title || 'Publicidad Desktop'}
                    fill
                    className="object-contain"
                    priority={idx === 0}
                  />
                </div>
              )}

              {/* === VERSIÓN MOBILE (Se oculta en desktop) === */}
              {urlMobile && (
                <div className="block md:hidden relative w-full h-full">
                  <Image
                    src={urlMobile}
                    alt={promo.title || 'Publicidad Mobile'}
                    fill
                    className="object-contain"
                    priority={idx === 0}
                  />
                </div>
              )}

              {/* Fallback por si no suben imagen */}
              {!urlDesktop && !urlMobile && (
                <div className="flex items-center justify-center w-full h-full bg-slate-900 px-4">
                  <span className="text-sm md:text-base font-bold">{promo.title}</span>
                </div>
              )}

              {/* Indicador sutil de publicidad */}
              <span className="absolute top-2 left-2 text-[9px] font-medium uppercase tracking-wider bg-slate-950/80 text-[#2f86cc] border border-blue-500/30 px-2 py-0.5 rounded z-10 backdrop-blur-sm">
                Publicidad
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )

  if (currentPromo.ctaUrl) {
    return (
      <a
        href={currentPromo.ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full group cursor-pointer"
      >
        {content}
      </a>
    )
  }

  return content
}
