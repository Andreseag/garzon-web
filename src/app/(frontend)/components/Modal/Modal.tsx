'use client'

import { useEffect, useState, ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-[90vw]',
}

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'lg' }: ModalProps) => {
  const [show, setShow] = useState(false)
  const [isRendered, setIsRendered] = useState(false)

  // Sincroniza la animación de entrada y salida
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true)
      document.body.style.overflow = 'hidden'
      const timer = setTimeout(() => setShow(true), 10)
      return () => clearTimeout(timer)
    } else {
      setShow(false)
      document.body.style.overflow = 'unset'
      const timer = setTimeout(() => setIsRendered(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Cerrar el modal al presionar la tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isRendered) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo oscuro difuminado */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          show ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Contenedor del Modal */}
      <div
        className={`relative w-full ${maxWidthClasses[maxWidth]} bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200 dark:border-stone-800 transition-all duration-300 ease-out transform ${
          show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Header condicional para ahorrar espacio */}
        {title ? (
          // Si hay título, mostramos una barra superior compacta (Slim Header)
          <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100 dark:border-stone-800">
            <h3 className="text-lg font-black tracking-tight">{title}</h3>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 bg-stone-100 dark:bg-stone-800 rounded-full transition-colors"
              aria-label="Cerrar modal"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          // Si NO hay título (ej. afiche), ponemos un botón flotante limpio que no quita espacio vertical
          onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-2 text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white bg-white/80 dark:bg-stone-900/80 hover:bg-white dark:hover:bg-stone-900 backdrop-blur-md rounded-full shadow-lg border border-stone-200/50 dark:border-stone-700/50 transition-all"
              aria-label="Cerrar modal"
            >
              <X size={18} />
            </button>
          )
        )}

        {/* Contenido Dinámico */}
        <div className="p-5 md:p-6 max-h-[85vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
