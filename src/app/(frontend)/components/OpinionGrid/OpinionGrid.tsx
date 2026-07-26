'use client'

import { useRef } from 'react'
import { Columnist as PayloadColumnist, Media } from '@/payload-types'
import Image from 'next/image'

interface OpinionGridProps {
  columnists: PayloadColumnist[]
}

export default function OpinionGrid({ columnists }: OpinionGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = clientWidth * 0.75
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 my-8 w-full">
      {/* CABECERA DE SECCIÓN CON BOTONES DE NAVEGACIÓN */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-sans font-black uppercase tracking-tighter text-slate-900 dark:text-slate-100 whitespace-nowrap">
          Opinión
        </h2>
        <div className="h-0.5 flex-1 bg-[#2f86cc]/20 dark:bg-[#2f86cc]/40"></div>

        {/* Controles de flechas para el carrusel */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => scroll('left')}
            aria-label="Anterior"
            className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-[#2f86cc] hover:text-[#2f86cc] transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Siguiente"
            className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-[#2f86cc] hover:text-[#2f86cc] transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ENCAPSULADOR ESTRICTO: Impide que el contenido se desborde del ancho de la pantalla */}
      <div className="w-full max-w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 py-4 items-start scroll-smooth w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {columnists.map((author) => {
            const imageData = typeof author.image === 'object' ? author.image : null
            const avatar = imageData?.cloudinary?.secure_url as string

            if (!avatar) return null

            return (
              <a
                href={`/columnista/${author.id}`}
                key={author.id}
                className="group flex flex-col items-center text-center focus:outline-none flex-shrink-0 w-44"
              >
                <div className="relative w-24 h-24 mb-5">
                  {/* Anillo de hover animado */}
                  <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#2f86cc] transition-all duration-300 group-hover:scale-110"></div>

                  {/* Contenedor del Avatar */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                    <Image
                      src={avatar}
                      alt={author.name}
                      fill
                      sizes="96px"
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Nombre */}
                <h3 className="text-sm font-sans font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#2f86cc] dark:group-hover:text-[#2f86cc] transition-colors ">
                  {author.name}
                </h3>

                {/* Especialidad / Cargo */}
                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 mt-2 ">
                  {author.specialty}
                </p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
