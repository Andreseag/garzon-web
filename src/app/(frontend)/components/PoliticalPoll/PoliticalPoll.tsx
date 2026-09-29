'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { CheckCircle2, BarChart3, Vote, Sparkles, Loader2, ArrowRight } from 'lucide-react'

interface Option {
  id: string
  text: string
  partyOrSubtitle?: string
  image?: {
    url: string
    alt?: string
  }
  votes: number
}

interface PollProps {
  pollId: string
  question: string
  imageUrl?: string
  options: Option[]
  totalVotesInitial: number
}

export default function PoliticalPoll({
  pollId,
  question,
  imageUrl,
  options: initialOptions,
  totalVotesInitial,
}: PollProps) {
  const [options, setOptions] = useState<Option[]>(initialOptions)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [showDemographicsModal, setShowDemographicsModal] = useState(false)
  const [totalVotes, setTotalVotes] = useState(totalVotesInitial)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [ageRange, setAgeRange] = useState('18-28')
  const [municipality, setMunicipality] = useState('')
  const [gender, setGender] = useState('Prefiero no decirlo')

  useEffect(() => {
    const votedOption = localStorage.getItem(`poll_voted_${pollId}`)
    if (votedOption) {
      setHasVoted(true)
      setSelectedOption(votedOption)
    }
  }, [pollId])

  // 1. Votar inmediatamente al hacer clic en la opción
  const handleSelectOption = async (optionId: string) => {
    if (hasVoted) return

    setSelectedOption(optionId)
    setHasVoted(true)
    localStorage.setItem(`poll_voted_${pollId}`, optionId)

    // Actualización optimista en la interfaz
    const optimisticOptions = options.map((opt) =>
      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt,
    )
    setOptions(optimisticOptions)
    setTotalVotes((prev) => prev + 1)

    // Abrir la encuesta demográfica DESPUÉS de haber votado
    setShowDemographicsModal(true)

    // Enviar el voto inicial al servidor (sin datos demográficos todavía)
    try {
      const response = await fetch('/api/polls/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pollId,
          optionId,
          demographics: null, // Se envía vacío inicialmente
        }),
      })

      if (!response.ok) throw new Error('Error al registrar el voto')

      const data = await response.json()
      setTotalVotes(data.totalVotes)
      setOptions(data.options)
    } catch (error) {
      console.error('Error al registrar el voto:', error)
    }
  }

  // 2. Enviar los datos demográficos opcionales ya habiendo votado
  const handleSaveDemographics = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/polls/demographics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pollId,
          optionId: selectedOption,
          demographics: { ageRange, municipality, gender },
        }),
      })

      if (!response.ok) throw new Error('Error al guardar datos demográficos')

      setShowDemographicsModal(false)
    } catch (error) {
      console.error('Error al enviar datos demográficos:', error)
    } finally {
      setIsSubmitting(false)
      setShowDemographicsModal(false)
    }
  }

  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0
    return Math.round((votes / totalVotes) * 100)
  }

  return (
    <section className="max-w-3xl mx-auto px-4 my-12">
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Imagen Principal del Sondeo */}
        {imageUrl && (
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 shadow-md">
            <img src={imageUrl} alt={question} className="object-cover w-full h-full" />
          </div>
        )}

        {/* Encabezado */}
        <div className="flex items-start gap-4 mb-8">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl shrink-0 mt-1">
            <Vote size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-primary mb-1">
              <Sparkles size={14} /> Sondeo Ciudadano Verificado
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
              {question}
            </h3>
          </div>
        </div>

        {/* Opciones del Sondeo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {options.map((option) => {
            const percentage = getPercentage(option.votes)
            const isSelected = selectedOption === option.id

            return (
              <div
                key={option.id}
                className={`relative overflow-hidden rounded-2xl transition-all duration-300 border ${
                  hasVoted
                    ? isSelected
                      ? 'border-primary bg-primary/5 dark:bg-primary/10 ring-2 ring-primary/30 shadow-lg'
                      : 'border-gray-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 opacity-90'
                    : 'border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-primary/60 hover:shadow-xl hover:-translate-y-1 cursor-pointer group'
                }`}
                onClick={() => !hasVoted && handleSelectOption(option.id)}
              >
                {hasVoted && (
                  <div
                    className={`absolute top-0 left-0 bottom-0 transition-all duration-1000 opacity-25 ${
                      isSelected ? 'bg-primary' : 'bg-gray-300 dark:bg-slate-700'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                )}

                <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-slate-800 shrink-0 border-2 border-white dark:border-slate-800 shadow-md">
                      {option.image?.url ? (
                        <Image
                          src={option.image.url}
                          alt={option.text}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-lg">
                          {option.text.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-slate-900 dark:text-white text-base md:text-lg truncate">
                        {option.text}
                      </h4>
                      {option.partyOrSubtitle && (
                        <p className="font-sans text-xs text-slate-500 dark:text-slate-400 truncate">
                          {option.partyOrSubtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {hasVoted ? (
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200/60 dark:border-slate-800/80">
                      {isSelected ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          <CheckCircle2 size={14} /> Tu elección
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Opción</span>
                      )}
                      <span className="font-sans font-black text-slate-900 dark:text-white text-sm md:text-base">
                        {percentage}%{' '}
                        <span className="text-xs font-normal text-slate-500">({option.votes})</span>
                      </span>
                    </div>
                  ) : (
                    <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-primary uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      <span>Votar por este candidato</span>
                      <span>→</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Modal Demográfico (Aparece DESPUÉS de haber votado) */}
        {showDemographicsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-1">
                <CheckCircle2 size={14} /> ¡Voto Registrado con Éxito!
              </span>
              <h4 className="text-xl font-serif font-bold text-slate-900 dark:text-white mt-1 mb-2">
                Ayúdanos con tus datos (Opcional)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-sans">
                Tu voto ya fue emitido y contabilizado. Si lo deseas, puedes responder esta breve
                encuesta anónima para las estadísticas del barómetro político.
              </p>

              <form onSubmit={handleSaveDemographics} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold font-sans uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                    Rango de Edad
                  </label>
                  <select
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                  >
                    <option value="18-28">18 - 28 años</option>
                    <option value="29-45">29 - 45 años</option>
                    <option value="46-60">46 - 60 años</option>
                    <option value="61+">Mayor de 60 años</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold font-sans uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                    Municipio / Zona
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Villanueva, Casanare"
                    value={municipality}
                    onChange={(e) => setMunicipality(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-sans uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                    Género
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                    <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                  </select>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowDemographicsModal(false)}
                    className="text-xs font-bold font-sans text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-4 py-2.5"
                  >
                    Omitir
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-white text-xs font-bold font-sans uppercase tracking-wider px-6 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-primary/20"
                  >
                    {isSubmitting ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        Enviar Respuestas <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-6 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-sans">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-primary" />
            <span>
              Participación total:{' '}
              <strong className="text-slate-900 dark:text-white">{totalVotes}</strong> votos
            </span>
          </div>
          {hasVoted && (
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 size={14} /> Voto emitido correctamente
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
