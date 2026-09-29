import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { Vote, BarChart3, Sparkles } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SondeosPage() {
  const payload = await getPayload({ config })

  // Consultar todos los sondeos activos ordenados del más reciente al más antiguo
  const { docs: polls } = await payload.find({
    collection: 'polls',
    where: {
      isActive: { equals: true },
    },
    sort: '-createdAt',
  })

  return (
    <main className="w-full mx-auto px-4 py-12">
      {/* Encabezado de la Página */}
      <div className="mb-12 border-b-2 border-gray-100 dark:border-slate-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.2em] text-primary mb-2">
          <Sparkles size={16} /> Participación Ciudadana
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-black text-slate-900 dark:text-white tracking-tight">
          Sondeos y Barómetro Político
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-2xl font-sans text-base">
          Exprésate y conoce la opinión de la comunidad. Participa en nuestras encuestas oficiales
          verificadas.
        </p>
      </div>

      {/* Grid de Sondeos */}
      {polls.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800">
          <p className="text-slate-500 font-sans text-lg">
            No hay sondeos activos en este momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {polls.map((poll: any) => {
            // Extraer la URL de la imagen principal del sondeo
            const pollImg = poll.image
            const pollImageUrl = pollImg?.cloudinary?.secure_url || pollImg?.url

            return (
              <Link
                key={poll.id}
                href={`/sondeos/${poll.slug}`}
                className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Imagen Principal del Sondeo */}
                  {pollImageUrl && (
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-800">
                      <img
                        src={pollImageUrl}
                        alt={poll.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                      <Vote size={24} />
                    </div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                      Votación Activa
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-3 mb-4 leading-snug">
                    {poll.title}
                  </h3>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs font-sans text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <BarChart3 size={16} className="text-primary" />
                    {poll.totalVotes || 0} votos
                  </span>
                  <span className="font-bold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Votar ahora →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
