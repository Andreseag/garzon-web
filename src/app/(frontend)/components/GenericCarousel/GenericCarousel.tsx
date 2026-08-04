'use client'

import { useRef, ReactNode } from 'react'

interface GenericCarouselProps {
  title?: string
  description?: string
  children: ReactNode
}

export default function GenericCarousel({ title, children, description }: GenericCarouselProps) {
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
    <div className="w-full">
      {/* Cabecera con título opcional y flechas de navegación */}
      <div className="flex items-center gap-4 mb-2 md:mb-8">
        {title && (
          <h2 className="text-xl md:text-2xl font-sans font-black tracking-tighter text-slate-900 dark:text-slate-100 whitespace-nowrap">
            {title}
          </h2>
        )}

        {description && <p>{description}</p>}
        <div className="hidden md:block h-0.5 flex-1 bg-primary/20 dark:bg-primary/40"></div>

        {/* Controles de flechas */}
        <div className="items-center gap-2 flex-shrink-0 hidden md:flex">
          <button
            onClick={() => scroll('left')}
            aria-label="Anterior"
            className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary transition-colors cursor-pointer"
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
            className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Contenedor seguro para evitar desbordamientos y ocultar la barra de scroll */}
      <div className="w-full max-w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 py-4 items-stretch scroll-smooth w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
