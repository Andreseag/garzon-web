'use client'

import { useState, useRef, useEffect } from 'react'
import { Media } from '@/payload-types'

interface AudioPlayerProps {
  audioFile: Media | string | null | undefined
}

export function NewsAudioPlayer({ audioFile }: AudioPlayerProps) {
  // Extraemos la URL real del archivo (de Cloudinary o local)
  const audioUrl = (audioFile as Media)?.cloudinary?.secure_url || (audioFile as Media)?.url || ''

  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Si no se ha generado un audio para esta noticia, no mostramos el reproductor
  if (!audioUrl) return null

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 my-8 shadow-sm">
      {/* Elemento de audio nativo oculto */}
      <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />

      <div className="flex items-center gap-3 text-center sm:text-left">
        <div className="p-3 bg-[#2f86cc]/10 text-[#2f86cc] rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 animate-pulse"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Escuchar esta noticia
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Narrado por inteligencia artificial narrativa
          </p>
        </div>
      </div>

      <button
        onClick={togglePlay}
        className={`flex items-center gap-2 text-xs font-bold px-6 py-2.5 rounded-lg transition-all shadow-md ${
          isPlaying
            ? 'bg-amber-500 hover:bg-amber-600 text-white'
            : 'bg-[#2f86cc] hover:bg-[#1e5a8a] text-white'
        }`}
      >
        {isPlaying ? '⏸ Pausar Audio' : '▶ Reproducir Nota'}
      </button>
    </div>
  )
}
