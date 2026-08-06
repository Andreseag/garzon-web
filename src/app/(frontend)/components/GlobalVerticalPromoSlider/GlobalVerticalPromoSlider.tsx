'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'

interface GlobalVerticalPromoSliderProps {
  promos: any[]
}

export const GlobalVerticalPromoSlider = ({ promos }: GlobalVerticalPromoSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // 1. Memorizamos el filtrado y orden aleatorio de forma segura (sin mutar props directamente)
  const activePromos = useMemo(() => {
    const filtered = promos.filter(
      (p) => p.isActive && (p.verticalImageDesktop || p.verticalImageMobile),
    )
    return [...filtered].sort(() => Math.random() - 0.5)
  }, [promos])

  useEffect(() => {
    if (activePromos.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activePromos.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [activePromos.length])

  if (activePromos.length === 0) return null

  return (
    <div className="relative w-full bg-slate-950 text-white overflow-hidden shadow-lg border border-blue-900/30 rounded-xl">
      {/* Contenedor vertical con proporción fija ideal para banners laterales */}
      <div className="relative h-[138px] lg:h-[500px] w-full flex items-center justify-center overflow-hidden bg-slate-950">
        {activePromos.map((promo, idx) => {
          const dImg = promo.verticalImageDesktop as Media
          const dUrl = dImg?.cloudinary?.secure_url || dImg?.url || ''

          // Corrección del tipeo (antes decía dImg?.url por error)
          const hImg = promo.horizontalImageDesktop as Media
          const hUrl = hImg?.cloudinary?.secure_url || hImg?.url || ''

          const mImg = promo.horizontalImageMobile as Media
          const mUrl = mImg?.cloudinary?.secure_url || mImg?.url || ''

          const isVisible = idx === currentIndex

          // Contenido visual de la promo vertical
          const slideContent = (
            <div
              className={`absolute inset-0 transition-opacity duration-700 flex items-center justify-center ${
                isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
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

              {/* Versión Tablet */}
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

          // Enlace individual atado estrictamente a esta promo
          if (promo.ctaUrl) {
            return (
              <a
                key={promo.id}
                href={promo.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute inset-0 z-20 ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
              >
                {slideContent}
              </a>
            )
          }

          return (
            <div key={promo.id} className="absolute inset-0">
              {slideContent}
            </div>
          )
        })}
      </div>
    </div>
  )
}
