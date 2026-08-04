import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Media, News } from '@/payload-types'

interface PageProps {
  params: Promise<{ category: string }>
}

// Mapa para convertir slugs en títulos legibles
const CATEGORY_NAMES: Record<string, string> = {
  'poder-publico': 'Poder Público',
  judicial: 'Judicial',
  comunidad: 'Comunidad',
  deportes: 'Deportes',
  entretenimiento: 'Entretenimiento',
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const payload = await getPayload({ config: configPromise })

  // Buscamos las noticias que pertenezcan a esta categoría
  const { docs: newsItems } = await payload.find({
    collection: 'news',
    where: {
      category: { equals: category },
    },
    sort: '-publishDate',
  })

  // Si no hay noticias, mostramos 404 o un mensaje de "próximamente"
  if (!newsItems || newsItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black uppercase text-slate-300">
          No hay noticias en esta sección todavía
        </h1>
        <Link
          href="/"
          className="mt-8 inline-block text-primary font-bold uppercase tracking-widest text-sm border-b-2 border-primary"
        >
          Volver al inicio
        </Link>
      </div>
    )
  }

  const categoryTitle = CATEGORY_NAMES[category] || category.replace('-', ' ')

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* CABECERA DE CATEGORÍA */}
      <header className="mb-16 border-b-4 border-slate-900 dark:border-white pb-6 flex justify-between items-end">
        <div>
          <p className="text-primary font-sans font-black uppercase tracking-[0.3em] text-xs mb-2">
            Explorando sección
          </p>
          <h1 className="text-5xl md:text-7xl font-sans font-black uppercase tracking-tighter text-slate-900 dark:text-white italic">
            {categoryTitle}
          </h1>
        </div>
        <div className="hidden md:block text-right">
          <span className="text-slate-400 font-sans font-bold text-sm uppercase tracking-widest">
            {newsItems.length} Artículos encontrados
          </span>
        </div>
      </header>

      {/* GRID DE NOTICIAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {newsItems.map((item: News) => {
          const featuredImage = item.featuredImage as Media
          const date = new Date(item.publishDate).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })

          return (
            <Link key={item.id} href={`/notas/${item.slug}`} className="group flex flex-col">
              {/* Imagen con Hover de Garzón Web */}
              <div className="relative aspect-[16/10] mb-6 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900">
                <Image
                  src={
                    featuredImage.cloudinary?.secure_url || featuredImage.url || '/placeholder.jpg'
                  }
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Info de la Nota */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                  {date}
                </span>
                <span className="h-px w-8 bg-slate-200 dark:border-slate-800"></span>
              </div>

              <h2 className="text-2xl font-sans font-black leading-[1.1] text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-4">
                {item.title}
              </h2>

              <p className="text-slate-600 dark:text-slate-400 line-clamp-3 text-sm leading-relaxed">
                {item.excerpt}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Por
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-slate-200">
                  {item.newAuthor || 'Redacción'}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
