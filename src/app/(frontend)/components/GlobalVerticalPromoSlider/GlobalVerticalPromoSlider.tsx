'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'

interface GlobalVerticalPromoSliderProps {
  promos: any[]
}

export const GlobalVerticalPromoSlider = ({ promos }: GlobalVerticalPromoSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Filtrar solo las activas que tengan al menos una imagen vertical configurada
  const activePromos = promos.filter(
    (p) => p.isActive && (p.verticalImageDesktop || p.verticalImageMobile),
  )

  useEffect(() => {
    if (activePromos.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activePromos.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [activePromos.length])

  if (activePromos.length === 0) return null

  const currentPromo = activePromos[currentIndex]

  const content = (
    <div className="relative w-full bg-slate-950 text-white overflow-hidden shadow-lg border border-blue-900/30 rounded-xl">
      {/* Contenedor vertical con proporción fija ideal para banners laterales */}
      <div className="relative h-[138px] lg:h-[500px] w-full flex items-center justify-center overflow-hidden bg-slate-950">
        {activePromos.map((promo, idx) => {
          const dImg = promo.verticalImageDesktop as Media
          const dUrl = dImg?.cloudinary?.secure_url || dImg?.url || ''

          // Toma la imagen horizontal desktop
          const hImg = promo.horizontalImageDesktop as Media
          const hUrl = hImg?.cloudinary?.secure_url || dImg?.url || ''

          const mImg = promo.horizontalImageMobile as Media
          const mUrl = mImg?.cloudinary?.secure_url || mImg?.url || ''

          return (
            <div
              key={promo.id}
              className={`absolute inset-0 transition-opacity duration-700 flex items-center justify-center ${
                idx === currentIndex
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Versión Desktop */}
              {dUrl && (
                <div className="hidden lg:block relative w-full h-full">
                  <Image
                    src={dUrl}
                    alt={promo.title || 'Publicidad Vertical'}
                    fill
                    className="object-contain"
                    priority={idx === 0}
                  />
                </div>
              )}

              {/* Version Tablet */}
              {hUrl && (
                <div className="hidden md:block lg:hidden relative w-full h-full">
                  <Image
                    src={hUrl}
                    alt={promo.title || 'Publicidad Vertical'}
                    fill
                    className="object-contain"
                    priority={idx === 0}
                  />
                </div>
              )}

              {/* Versión Mobile */}
              {mUrl && (
                <div className="block md:hidden relative w-full h-full">
                  <Image
                    src={mUrl}
                    alt={promo.title || 'Publicidad Vertical'}
                    fill
                    className="object-contain"
                    priority={idx === 0}
                  />
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
