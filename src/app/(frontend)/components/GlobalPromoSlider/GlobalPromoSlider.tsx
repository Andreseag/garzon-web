'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'

interface GlobalPromoSliderProps {
  promos: any[]
}

export const GlobalPromoSlider = ({ promos }: GlobalPromoSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const activePromos = useMemo(() => {
    // IMPORTANTE: Usamos [...promos] para crear una copia antes de filtrar y ordenar
    // .sort() muta el array original, lo cual es peligroso en React.
    return [...promos].filter((p) => p.isActive).sort(() => Math.random() - 0.5)
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
    <div className="relative w-full bg-slate-950 text-white overflow-hidden shadow-lg border-y border-blue-900/30">
      <div className="max-w-7xl mx-auto relative h-32 sm:h-36 md:h-40 w-full flex items-center justify-center overflow-hidden bg-slate-950">
        {activePromos.map((promo, idx) => {
          const hImgDesktop = promo.horizontalImageDesktop as Media
          const urlDesktop = hImgDesktop?.cloudinary?.secure_url || hImgDesktop?.url || ''
          const hImgMobile = promo.horizontalImageMobile as Media
          const urlMobile = hImgMobile?.cloudinary?.secure_url || hImgMobile?.url || ''

          const isVisible = idx === currentIndex

          // Contenido visual de la promo
          const slideContent = (
            <div
              className={`absolute inset-0 transition-opacity duration-700 flex items-center justify-center ${
                isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              {urlDesktop && (
                <div className="hidden md:block relative w-full h-full">
                  <Image
                    src={urlDesktop}
                    alt={promo.title || 'Promo'}
                    fill
                    className="object-contain"
                    priority={idx === 0}
                  />
                </div>
              )}
              {urlMobile && (
                <div className="block md:hidden relative w-full h-full">
                  <Image
                    src={urlMobile}
                    alt={promo.title || 'Promo'}
                    fill
                    className="object-contain"
                    priority={idx === 0}
                  />
                </div>
              )}
              {!urlDesktop && !urlMobile && (
                <div className="flex items-center justify-center w-full h-full bg-slate-900 px-4">
                  <span className="text-sm md:text-base font-bold">{promo.title}</span>
                </div>
              )}
              <span className="absolute top-2 left-2 text-[9px] font-medium uppercase tracking-wider bg-slate-950/80 text-[#2f86cc] border border-blue-500/30 px-2 py-0.5 rounded z-10 backdrop-blur-sm">
                Publicidad
              </span>
            </div>
          )

          // Si tiene link, lo envolvemos individualmente. Si no, retornamos solo el div.
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
