import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { Vote, ArrowRight, BarChart3 } from 'lucide-react'

export default async function LatestPollsSection() {
  const payload = getPayload({ config })

  // Consultamos los 3 sondeos más recientes y activos
  const polls = await (
    await payload
  ).find({
    collection: 'polls',
    where: {
      isActive: { equals: true },
    },
    limit: 3,
    sort: '-createdAt',
  })

  if (!polls.docs.length) return null

  return (
    <section className="w-full mx-auto px-4 my-16">
      {/* Encabezado de la sección */}
      <div className="flex items-center justify-between border-b-2 border-gray-100 dark:border-slate-800 pb-4 mb-8">
        <h2 className="text-2xl font-sans font-black uppercase tracking-tighter text-slate-900 dark:text-slate-100 flex items-center gap-3">
          <span className="w-2 h-8 bg-primary inline-block"></span>
          Sondeos de Opinión
        </h2>
        <Link
          href="/sondeos"
          className="text-xs font-sans font-bold text-primary hover:opacity-70 transition-opacity uppercase tracking-widest flex items-center gap-1"
        >
          Ver todos <ArrowRight size={14} />
        </Link>
      </div>

      {/* Grid de Sondeos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {polls.docs.map((poll: any) => {
          // Extraer la URL de la imagen de Payload (compatible con Cloudinary o URL local)
          const pollImg = poll.image as any
          const pollImgUrl = pollImg?.cloudinary?.secure_url || pollImg?.url

          return (
            <Link
              key={poll.id}
              href={`/sondeos/${poll.slug}`}
              className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Imagen Principal del Sondeo (si existe) */}
                {pollImgUrl && (
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 bg-slate-100 dark:bg-slate-800">
                    <img
                      src={pollImgUrl}
                      alt={poll.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 bg-primary/10 text-primary rounded-2xl">
                    <Vote size={20} />
                  </span>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Votación Abierta
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-3 mb-4">
                  {poll.title}
                </h3>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs font-sans text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <BarChart3 size={14} className="text-primary" />
                  {poll.totalVotes || 0} votos emitidos
                </span>
                <span className="font-bold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Participar →
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
