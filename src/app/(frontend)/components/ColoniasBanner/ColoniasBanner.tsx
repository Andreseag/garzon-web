import Link from 'next/link'
import { Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react'

export function ColoniasBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 my-10">
      {/* Fondo claro y sutil borde dorado */}
      <div className="relative overflow-hidden rounded-3xl bg-amber-50 border border-amber-200 p-8 md:p-12 shadow-xl">
        {/* Destellos decorativos muy sutiles de fondo */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-60 h-60 bg-yellow-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left max-w-2xl">
            {/* Etiqueta con fondo amarillo fuerte y texto oscuro */}
            <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-sm">
              <Sparkles size={14} />
              <span>36° Edición Oficial</span>
            </span>

            {/* Título principal oscuro */}
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tighter uppercase leading-none">
              Festival Nacional de Colonias
            </h2>

            {/* Lema con color ámbar oscuro */}
            <p className="text-amber-900 text-sm md:text-base font-medium italic tracking-wide">
              "¡La cultura une regiones, exprésala con orgullo!"
            </p>

            {/* Descripción oscura */}
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Vive la cultura, la gastronomía y las tradiciones que nos unen en Villanueva. Explora
              la programación de eventos, los artistas y toda la guía turística oficial.
            </p>

            {/* Metadatos con fondo claro y borde, iconos ámbar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-700 text-sm pt-2">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-amber-200 shadow-inner">
                <Calendar size={16} className="text-amber-600" />
                <span>Programación oficial</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-amber-200 shadow-inner">
                <MapPin size={16} className="text-amber-600" />
                <span>Villanueva, Casanare</span>
              </div>
            </div>
          </div>

          {/* Botón principal oscuro con hover ámbar */}
          <div className="shrink-0 w-full md:w-auto">
            <Link
              href="/colonias-villanueva"
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-slate-950 hover:bg-amber-700 text-white font-black text-sm uppercase tracking-wider py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-amber-500/30 group"
            >
              <span>Explorar sección</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
