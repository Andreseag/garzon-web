'use client' // Importante para usar useState

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HoroscopeGrid({ posts }: { posts: any[] }) {
  const [selectedSign, setSelectedSign] = useState<any | null>(null)

  // Cerrar modal con la tecla Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSign(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  if (!posts || posts.length === 0) return null

  const featured = posts[0]
  const sidePosts = posts.slice(1, 5)

  return (
    <section className="max-w-7xl mx-auto px-4 my-8">
      {/* Detalle superior: Gradiente Cósmico */}
      <div className="flex h-1.5 w-full overflow-hidden rounded-t-full">
        <div className="flex-1 bg-[#1e293b]"></div>
        <div className="flex-1 bg-[#2f86cc]"></div>
        <div className="flex-1 bg-[#6366f1]"></div>
      </div>

      {/* Cabecera */}
      <div className="bg-white dark:bg-slate-950 py-10 px-2 flex flex-col md:flex-row justify-between items-end border-b-2 border-slate-100 dark:border-slate-800 mb-10 transition-colors">
        <div>
          <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tighter uppercase italic text-slate-900 dark:text-white leading-none">
            Horóscopo <span className="text-[#2f86cc]">Diario</span>
          </h2>
          <p className="text-xs font-sans font-bold text-slate-500 dark:text-slate-400 mt-4 flex items-center gap-2 tracking-widest uppercase">
            GUÍA ASTRAL <span className="text-[#2f86cc] text-lg leading-none">•</span> TU DESTINO
            SEGÚN LOS ASTROS
          </p>
        </div>

        <div className="mt-6 md:mt-0 flex items-center gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-2.5 rounded-full">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2f86cc]"></span>
          </span>
          <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">
            Actualizado hoy
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Signo Principal - Clickable */}
        <div
          className="lg:col-span-7 cursor-pointer group"
          onClick={() => setSelectedSign(featured)}
        >
          <div className="relative aspect-video rounded-4xl overflow-hidden mb-8 bg-slate-900 shadow-2xl shadow-blue-200/20 dark:shadow-none">
            <Image
              src={featured.image?.url || featured.image}
              alt={featured.sign}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80"
            />
            <div className="absolute top-6 left-6 bg-[#2f86cc] text-white text-[10px] font-sans font-black px-4 py-2 rounded-full uppercase tracking-widest">
              Signo del Día
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
          </div>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#2f86cc] transition-colors leading-[1.15] capitalize">
            {featured.sign}
          </h3>
          <p className="mt-5 text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-sans italic line-clamp-3">
            "{featured.description}"
          </p>
        </div>

        {/* Otros Signos */}
        <div className="lg:col-span-5 flex flex-col">
          <h4 className="text-[11px] font-sans font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] border-b border-slate-100 dark:border-slate-800 pb-3 mb-2">
            Más predicciones
          </h4>
          <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
            {sidePosts.map((item) => (
              <div
                key={item.id}
                className="py-6 group cursor-pointer"
                onClick={() => setSelectedSign(item)}
              >
                <div className="flex gap-5 items-start">
                  <div className="flex-1">
                    <h4 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-200 group-hover:text-[#2f86cc] transition-colors leading-snug capitalize">
                      {item.sign}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="relative w-28 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <Image
                      src={item.image?.url || item.image}
                      alt={item.sign}
                      fill
                      className="object-cover opacity-100 dark:opacity-80 transition-all group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/horoscopo"
            className="mt-6 text-center text-xs font-black uppercase tracking-[0.2em] py-4 bg-slate-50 dark:bg-slate-900 text-[#2f86cc] rounded-xl hover:bg-[#2f86cc] hover:text-white transition-all"
          >
            Ver todos los signos
          </Link>
        </div>
      </div>

      {/* --- POPUP / MODAL --- */}
      {selectedSign && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSelectedSign(null)}
          />

          {/* Contenido del Modal */}
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Botón Cerrar */}
            <button
              onClick={() => setSelectedSign(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col">
              {/* Imagen en el Modal */}
              <div className="relative h-64 md:h-80 w-full">
                <Image
                  src={selectedSign.image?.url || selectedSign.image}
                  alt={selectedSign.sign}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white capitalize">
                    {selectedSign.sign}
                  </h2>
                </div>
              </div>

              {/* Texto en el Modal */}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-8 bg-[#2f86cc]"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2f86cc]">
                    Predicción de hoy
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl font-sans leading-relaxed italic">
                  "{selectedSign.description}"
                </p>

                <button
                  onClick={() => setSelectedSign(null)}
                  className="mt-10 w-full py-4 bg-slate-900 dark:bg-[#2f86cc] text-white font-sans font-bold uppercase tracking-widest text-xs rounded-2xl hover:opacity-90 transition-opacity"
                >
                  Cerrar Lectura
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
