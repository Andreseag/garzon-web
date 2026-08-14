'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Modal } from '../Modal/Modal'

const SESSION_STORAGE_KEY = 'festival_modal_shown'

export function DefaultModal() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isColoniasVillanueva = pathname?.startsWith('/colonias-villanueva')

  useEffect(() => {
    // Verificamos si ya se mostró en esta sesión
    const hasBeenShown = sessionStorage.getItem(SESSION_STORAGE_KEY)

    if (!isColoniasVillanueva && !hasBeenShown) {
      setIsOpen(true)
      // Marcamos en sessionStorage que ya se mostró para esta sesión
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true')
    }
  }, [isColoniasVillanueva])

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} maxWidth="lg">
      <div className="space-y-3 text-center py-0.5">
        {/* Etiqueta promocional inspirada en el afiche */}
        <div className="inline-flex items-center gap-1.5 bg-yellow-400 dark:bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
          <Sparkles size={14} />
          <span>36° Edición Oficial</span>
        </div>

        {/* Títulos y descripción */}
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-950 dark:text-white uppercase">
            Festival Nacional de Colonias
          </h2>
          <p className="text-slate-600 dark:text-stone-300 text-xs md:text-sm max-w-sm mx-auto">
            Vive la tradición y descubre la programación oficial día por día.
          </p>
        </div>

        {/* Contenedor del Afiche Vertical */}
        <div className="relative w-full aspect-[3/4] max-h-[40vh] mx-auto rounded-xl overflow-hidden shadow-xl border border-amber-200 dark:border-stone-800 bg-amber-50 dark:bg-stone-900 flex items-center justify-center">
          <Image
            src="/afiche-colonias.jpg"
            alt="Afiche oficial del Festival de Colonias"
            fill
            className="object-cover"
          />
        </div>

        {/* Botones de llamada a la acción (CTA) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
          <Link
            href="/colonias-villanueva"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-950 hover:bg-amber-700 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-amber-400 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-[1.02]"
          >
            <span>Ver programación</span>
            <ArrowRight size={16} />
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto px-5 py-2 text-slate-600 hover:text-slate-950 dark:text-stone-400 dark:hover:text-stone-200 font-semibold transition-colors text-xs"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  )
}
