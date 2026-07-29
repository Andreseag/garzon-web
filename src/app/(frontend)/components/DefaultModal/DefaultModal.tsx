'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Modal } from '../Modal/Modal'

export function DefaultModal() {
  const [isOpen, setIsOpen] = useState(false)

  // Se abre automáticamente al cargar la página
  useEffect(() => {
    setIsOpen(true)
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      maxWidth="lg" // Mantiene el modal compacto y estilizado para formato vertical
    >
      <div className="space-y-4 text-center py-1">
        {/* Etiqueta promocional */}
        <div className="inline-flex items-center gap-1.5 bg-[#2f86cc]/10 text-[#2f86cc] dark:bg-[#2f86cc]/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
          <Sparkles size={14} />
          <span>¡Edición Especial!</span>
        </div>

        {/* Títulos y descripción */}
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-stone-900 dark:text-stone-100">
            Festival de Colonias 2026
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm max-w-sm mx-auto">
            Vive la tradición y descubre la programación oficial día por día.
          </p>
        </div>

        {/* Contenedor del Afiche Vertical (Proporción 3:4 con límite de altura) */}
        <div className="relative w-full aspect-[3/4] max-h-[55vh] mx-auto rounded-2xl overflow-hidden shadow-xl border border-stone-200 dark:border-stone-800 bg-stone-900 flex items-center justify-center">
          <Image
            src="/afiche-colonias.jpg" // Asegúrate de que tu imagen esté en public/images/afiche-colonias.jpg
            alt="Afiche oficial del Festival de Colonias"
            fill
            className="object-cover" // Cambia a "object-contain" si prefieres que se vea el afiche completo sin recortes en los bordes
          />
        </div>

        {/* Botones de llamada a la acción (CTA) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/colonias-villanueva"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2f86cc] hover:bg-[#2f86cc]/90 text-white font-bold rounded-2xl shadow-lg shadow-[#2f86cc]/20 transition-all hover:scale-[1.02]"
          >
            <span>Ver programación</span>
            <ArrowRight size={18} />
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto px-6 py-3 text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 font-semibold transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  )
}
