import Link from 'next/link'

export const Hero = () => {
  return (
    <section className="relative w-full py-20 md:py-32 px-4 bg-slate-900 overflow-hidden">
      {/* Fondo decorativo con gradiente tipo amanecer llanero */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2f86cc] via-indigo-900 to-slate-950 opacity-90" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <span className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-[0.3em] uppercase text-white/80 border border-white/20 rounded-full">
          Villanueva, Casanare
        </span>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-[0.9]">
          COLONIAS DE <br /> VILLANUEVA 2026
        </h1>

        <p className="text-lg md:text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          La fiesta que une a nuestra tierra. Vive la tradición, la cultura y la gastronomía de los
          llanos casanareños.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#programacion"
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-black uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors"
          >
            Ver programación
          </Link>
          <a
            href="https://wa.me/tu-numero"
            target="_blank"
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border-2 border-white/30 font-bold uppercase tracking-wider rounded-xl hover:bg-white/10 transition-colors"
          >
            Info Turística
          </a>
        </div>
      </div>
    </section>
  )
}
