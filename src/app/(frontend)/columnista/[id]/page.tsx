import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Media, News, Columnist } from '@/payload-types'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ColumnistDetailPage({ params }: PageProps) {
  const { id } = await params
  console.log('ID del columnista:', id) // Debug: Verificar que el ID se recibe correctamente
  const payload = await getPayload({ config: configPromise })

  // 1. Buscamos los datos del columnista
  const columnist = (await payload.findByID({
    collection: 'columnists',
    id: id,
  })) as Columnist

  if (!columnist) return notFound()

  // 2. Buscamos todas las noticias escritas por este columnista
  const { docs: newsItems } = await payload.find({
    collection: 'news',
    where: {
      columnist: { equals: id },
    },
    sort: '-publishDate',
  })

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* SECCIÓN DE PERFIL (Encabezado Azul) */}
      <section className="bg-gradient-to-br from-[#2f86cc] to-[#1e5a8a] py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl shrink-0">
            <Image
              src={
                (columnist.image as Media)?.cloudinary?.secure_url ||
                (columnist.image as Media)?.url ||
                ''
              }
              alt={columnist.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="text-center md:text-left text-white">
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              {columnist.specialty || 'Analista'}
            </span>
            <h1 className="text-5xl md:text-7xl font-sans font-black tracking-tighter uppercase italic leading-none mb-6">
              {columnist.name}
            </h1>
            <p className="text-lg md:text-xl text-blue-50/80 leading-relaxed max-w-2xl font-sans">
              {columnist.bio}
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE ARTÍCULOS */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl font-sans font-black uppercase tracking-tighter text-slate-900 dark:text-white">
            Columnas Publicadas
          </h2>
          <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
        </div>

        {newsItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {newsItems.map((item: News) => {
              const featuredImage = item.featuredImage as Media
              return (
                <Link key={item.id} href={`/notas/${item.slug}`} className="group block">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-900">
                    <Image
                      src={featuredImage?.cloudinary?.secure_url || featuredImage?.url || ''}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-sans font-black leading-tight text-slate-900 dark:text-white group-hover:text-[#2f86cc] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 italic">
                    {item.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-[10px] font-bold text-[#2f86cc] uppercase tracking-widest">
                    Leer columna{' '}
                    <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 font-sans italic text-lg">
              Este columnista aún no ha publicado artículos.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
