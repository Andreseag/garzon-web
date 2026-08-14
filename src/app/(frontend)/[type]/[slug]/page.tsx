import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Media } from '@/payload-types'
import { Hero } from '../../components/Detail/Hero'
import { SidebarContact } from '../../components/Detail/SidebarContact'

// 1. Definimos 'params' como una promesa según el estándar de Next.js moderno
interface PageProps {
  params: Promise<{ type: string; slug: string }>
}

export default async function Page({ params }: PageProps) {
  // 2. Hacemos el await de los parámetros obligatoriamente
  const resolvedParams = await params
  const { type, slug } = resolvedParams

  const payload = await getPayload({ config: configPromise })

  // 3. Validar tipo de colección usando la variable resuelta
  const collections = ['restaurants', 'hotels', 'bars']
  if (!collections.includes(type)) notFound()

  // 4. Buscar el documento
  const data = await payload.find({
    collection: type as any,
    where: { slug: { equals: slug }, isActive: { equals: true } },
    depth: 2,
  })

  if (!data.docs[0]) notFound()
  const item = data.docs[0] as any

  // Mapeo para etiquetas legibles de categoría
  const categoryLabels: Record<string, string> = {
    restaurants: 'Restaurante',
    hotels: 'Alojamiento / Hotel',
    bars: 'Bar / Vida Nocturna',
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 pb-16">
      {/* Barra superior de navegación / Volver */}
      <div className=" mx-auto px-4 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-[#2f86cc] dark:hover:text-sky-400 transition-colors bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800"
        >
          <ArrowLeft size={16} />
          <span>Volver al inicio</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className=" mx-auto px-4 mt-4">
        <Hero
          name={item.name}
          image={item.featuredImage}
          location={item.location}
          categoryLabel={categoryLabels[type]}
        />
      </div>

      {/* Contenido Principal en Grid de 2 columnas */}
      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-8 items-start">
          {/* Columna Izquierda: Descripción y Galería */}
          <div className="space-y-8">
            {/* Tarjeta de Descripción (RichText) */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2f86cc] bg-sky-50 dark:bg-sky-950/50 px-3 py-1 rounded-full">
                  {item.cuisineType || categoryLabels[type]}
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-3">
                  Acerca de la experiencia
                </h2>
              </div>

              {/* Renderizador de contenido rico de Payload */}
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description ? (
                  <RichText data={item.description} />
                ) : (
                  <p className="italic text-slate-400">
                    Este establecimiento aún no ha agregado una descripción detallada.
                  </p>
                )}
              </div>
            </div>

            {/* Galería de Fotos */}
            {item.gallery && item.gallery.length > 0 && (
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Galería fotográfica
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.gallery.map((galItem: any, idx: number) => {
                    const galImg = galItem.image as Media
                    const imgUrl = galImg?.cloudinary?.secure_url || galImg?.url
                    if (!imgUrl) return null
                    return (
                      <div
                        key={idx}
                        className="relative aspect-video rounded-2xl overflow-hidden shadow-sm group"
                      >
                        <img
                          src={imgUrl}
                          alt={`${item.name} - foto ${idx + 1}`}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Columna Derecha: Sidebar de Contacto Sticky */}
          <div className="lg:sticky lg:top-24">
            <SidebarContact
              phone={item.phone}
              name={item.name}
              type={type as any}
              mapUrl={item.googleMapsUrl}
              address={item.location}
              menuUrl={item.menuUrl || item.bookingUrl}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
