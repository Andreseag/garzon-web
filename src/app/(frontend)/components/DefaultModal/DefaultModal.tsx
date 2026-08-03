'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Modal } from '../Modal/Modal'

export function DefaultModal() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isColoniasVillanueva = pathname?.startsWith('/colonias-villanueva')

  // No mostrar el modal en la ruta de colonias-villanueva
  useEffect(() => {
    if (!isColoniasVillanueva) {
      setIsOpen(true)
    }
  }, [isColoniasVillanueva])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      maxWidth="lg" // Mantiene el modal compacto y estilizado para formato vertical
    >
      <div className="space-y-4 text-center py-1">
        {/* Etiqueta promocional inspirada en el afiche */}
        <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-slate-950 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
          <Sparkles size={14} />
          <span>36° Edición Oficial</span>
        </div>

        {/* Títulos y descripción */}
        <div className="space-y-1.5">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-950 uppercase">
            Festival Nacional de Colonias
          </h2>
          {/* <p className="text-amber-900 text-xs md:text-sm font-medium italic tracking-wide">
            "¡La cultura une regiones, exprésala con orgullo!"
          </p> */}
          <p className="text-slate-600 dark:text-stone-300 text-sm max-w-sm mx-auto pt-1">
            Vive la tradición y descubre la programación oficial día por día.
          </p>
        </div>

        {/* Contenedor del Afiche Vertical (Proporción 3:4 con límite de altura) */}
        <div className="relative w-full aspect-[3/4] max-h-[50vh] mx-auto rounded-2xl overflow-hidden shadow-xl border border-amber-200 bg-amber-50 flex items-center justify-center">
          <Image
            src="/afiche-colonias.jpg" // Asegúrate de que tu imagen esté en public/images/afiche-colonias.jpg
            alt="Afiche oficial del Festival de Colonias"
            fill
            className="object-cover"
          />
        </div>

        {/* Botones de llamada a la acción (CTA) con colores coordinados */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/colonias-villanueva"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-950 hover:bg-amber-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg transition-all hover:scale-[1.02]"
          >
            <span>Ver programación</span>
            <ArrowRight size={18} />
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto px-6 py-3 text-slate-600 hover:text-slate-950 dark:text-stone-400 dark:hover:text-stone-200 font-semibold transition-colors text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  )
}
