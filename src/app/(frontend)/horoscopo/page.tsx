import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Horoscope as HoroscopeType, Media } from '@/payload-types'
import Image from 'next/image'
import { notFound } from 'next/navigation'

// Mapeo de iconos para darle ese toque visual sin depender solo de la imagen subida
const SIGN_ICONS: Record<string, string> = {
  aries: '♈',
  tauro: '♉',
  geminis: '♊',
  cancer: '♋',
  leo: '♌',
  virgo: '♍',
  libra: '♎',
  escorpio: '♏',
  sagitario: '♐',
  capricornio: '♑',
  acuario: '♒',
  piscis: '♓',
}

export default async function HoroscopePage() {
  const payload = await getPayload({ config: configPromise })

  // 1. Traemos los últimos 12 registros (uno por cada signo)
  const { docs: horoscopes } = await payload.find({
    collection: 'horoscopes', // Usando tu slug en plural
    sort: '-publishDate',
    limit: 12,
  })

  if (!horoscopes || horoscopes.length === 0) return notFound()

  // 2. Tomamos la fecha del primer registro como referencia
  const displayDate = new Date(horoscopes[0].publishDate).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-sans font-black uppercase tracking-tighter text-slate-900 dark:text-white mb-4">
          Horóscopo <span className="text-[#2f86cc]">Garzón Web</span>
        </h1>
        <p className="text-slate-500 font-sans font-medium uppercase tracking-widest text-sm ">
          Predicciones para el {displayDate}
        </p>
      </header>

      {/* GRID DE SIGNOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {horoscopes.map((item: HoroscopeType) => {
          const image =
            typeof item.image === 'object'
              ? item.image.cloudinary?.secure_url || item.image.url
              : '/placeholder.jpg'

          const signLabel = item.sign.charAt(0).toUpperCase() + item.sign.slice(1)

          return (
            <article
              key={item.id}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-[#2f86cc] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col"
            >
              {/* IMAGEN DEL SIGNO */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={image || '/placeholder.jpg'}
                  alt={`Imagen de ${item.sign}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <span className="text-3xl text-white drop-shadow-md">
                    {SIGN_ICONS[item.sign]}
                  </span>
                  <h2 className="text-2xl font-sans font-bold text-white drop-shadow-md">
                    {signLabel}
                  </h2>
                </div>
              </div>

              {/* CONTENIDO DE LA PREDICCIÓN */}
              <div className="p-8">
                <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed text-lg italic">
                  "{item.description}"
                </p>

                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#2f86cc]">
                    Suerte Diaria
                  </span>
                  {/* Botón decorativo o funcional */}
                  <button className="text-slate-400 hover:text-[#2f86cc] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}
