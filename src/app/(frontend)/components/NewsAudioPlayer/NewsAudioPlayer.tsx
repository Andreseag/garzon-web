'use client'

import { extractPlainText } from '@/utilities/extractText'
import { useState, useEffect } from 'react'

interface AudioPlayerProps {
  title: string
  excerpt: string
  contentJson: any
}

export function NewsAudioPlayer({ title, excerpt, contentJson }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const synthInstance = window.speechSynthesis
      setSynth(synthInstance)

      const loadVoices = () => {
        const esVoices = synthInstance.getVoices().filter((v) => v.lang.startsWith('es'))
        setVoices(esVoices)
        if (esVoices.length > 0 && !selectedVoiceName) {
          // Ponemos la primera por defecto
          setSelectedVoiceName(esVoices[0].name)
        }
      }

      loadVoices()
      synthInstance.onvoiceschanged = loadVoices
    }
  }, [selectedVoiceName])

  const startAudio = () => {
    if (!synth) return

    if (isPaused) {
      synth.resume()
      setIsPlaying(true)
      setIsPaused(false)
      return
    }

    synth.cancel()

    const bodyText = extractPlainText(contentJson)
    const fullTextToRead = `${title}. ${excerpt}. ${bodyText}`

    const newUtterance = new SpeechSynthesisUtterance(fullTextToRead)
    newUtterance.lang = 'es-ES'
    newUtterance.rate = 1.0

    // Asignamos la voz que el usuario seleccionó en el dropdown
    const currentVoice = voices.find((v) => v.name === selectedVoiceName)
    if (currentVoice) newUtterance.voice = currentVoice

    newUtterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
    }
    newUtterance.onerror = () => {
      setIsPlaying(false)
      setIsPaused(false)
    }

    synth.speak(newUtterance)
    setIsPlaying(true)
  }

  const pauseAudio = () => {
    if (synth && isPlaying) {
      synth.pause()
      setIsPlaying(false)
      setIsPaused(true)
    }
  }

  const stopAudio = () => {
    if (synth) {
      synth.cancel()
      setIsPlaying(false)
      setIsPaused(false)
    }
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-4 my-8 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="p-3 bg-[#2f86cc]/10 text-[#2f86cc] rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
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
              ¿Prefieres escuchar la noticia?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Audio generado por el sistema
            </p>
          </div>
        </div>

        {/* CONTROLES */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-inner">
          {!isPlaying ? (
            <button
              onClick={startAudio}
              className="flex items-center gap-2 bg-[#2f86cc] hover:bg-[#1e5a8a] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-md"
            >
              ▶ {isPaused ? 'Reanudar' : 'Escuchar'}
            </button>
          ) : (
            <button
              onClick={pauseAudio}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-md"
            >
              ⏸ Pausar
            </button>
          )}
          {(isPlaying || isPaused) && (
            <button
              onClick={stopAudio}
              className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
            >
              ■
            </button>
          )}
        </div>
      </div>

      {/* SELECTOR DE VOZ (Solo aparece si hay más de una voz disponible) */}
      {voices.length > 1 && (
        <div className="flex items-center gap-2 border-t border-slate-200/60 dark:border-slate-800 pt-3 w-full">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Tipo de voz:
          </label>
          <select
            value={selectedVoiceName}
            onChange={(e) => {
              setSelectedVoiceName(e.target.value)
              if (isPlaying || isPaused) stopAudio() // Detener si cambia de voz a mitad de lectura
            }}
            className="text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2 py-1 max-w-xs focus:outline-none focus:border-[#2f86cc]"
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name.replace('Microsoft', '').replace('Google', '').trim()} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
