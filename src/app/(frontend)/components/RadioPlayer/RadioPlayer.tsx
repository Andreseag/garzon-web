'use client'

import { useState } from 'react'

export function RadioPlayer() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 transition-all duration-300 ease-in-out transform ${
        isOpen ? 'translate-y-0' : 'translate-y-[150px]'
      }`}
    >
      {/* BOTÓN PARA MINIMIZAR / MAXIMIZAR */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute cursor-pointer -top-10 right-4 bg-[#2f86cc] hover:bg-[#1e5a8a] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-t-xl shadow-lg border-t border-x border-white/10 flex items-center gap-2 transition-colors"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        {isOpen ? 'Ocultar Radio ✕' : 'Escuchar Radio En Vivo 📻'}
      </button>

      {/* CONTENEDOR DEL IFRAME */}
      <div className="bg-slate-900 border-t border-slate-800 shadow-2xl p-2 md:p-4 flex flex-col justify-center min-h-[150px]">
        <div className="max-w-7xl mx-auto w-full overflow-hidden rounded-xl bg-black/20">
          <iframe
            src="https://radio.zenit.com.co/public/radio_garzon/embed"
            frameBorder="0"
            allowTransparency={true}
            style={{ width: '100%', minHeight: '150px', height: '150px', border: 0 }}
          />
        </div>
      </div>
    </div>
  )
}
