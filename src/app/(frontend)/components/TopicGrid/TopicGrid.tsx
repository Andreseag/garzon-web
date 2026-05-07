import Image from 'next/image'

import Link from 'next/link'

interface Post {
  id: string

  title: string

  excerpt: string

  category: string

  image: string

  slug: string
}

interface TopicGridProps {
  topicTitle: string
  slugCategory: string
  posts: Post[]
}

export default function TopicGrid({ topicTitle, posts, slugCategory }: TopicGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 my-8">
      {/* Encabezado de la Sección */}

      <div className="flex items-center justify-between border-b-2 border-gray-100 dark:border-slate-800 pb-4 mb-10">
        <h2 className="text-2xl font-sans font-black uppercase tracking-tighter text-slate-900 dark:text-slate-100 flex items-center gap-3">
          {/* Barra vertical decorativa */}

          <span className="w-2 h-8 bg-[#2f86cc] inline-block"></span>

          {topicTitle}
        </h2>

        <Link
          href={`/categoria/${slugCategory}`}
          className="text-xs font-sans font-bold text-[#2f86cc] hover:opacity-70 transition-opacity uppercase tracking-widest"
        >
          Ver todo <span className="ml-1">→</span>
        </Link>
      </div>

      {/* Grid de Noticias */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {posts.map((post) => (
          <article key={post.id} className="group cursor-pointer">
            <Link href={`/notas/${post.slug}`}>
              {/* Imagen con Aspect Ratio fijo y Dark Mode adapt */}

              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl mb-5 bg-gray-100 dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-100 dark:opacity-90"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Contenido */}

              <div className="space-y-3">
                {/* Título en Fuente Serif */}

                <h3 className="text-xl font-serif font-bold leading-tight text-slate-900 dark:text-slate-100 group-hover:text-[#2f86cc] dark:group-hover:text-[#2f86cc] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt en Arimo (Sans) */}

                <p className="font-sans text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta-info en Arimo (Sans) */}

                <div className="pt-2 flex items-center text-[10px] font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">
                  <span suppressHydrationWarning>Hace 2 horas</span>

                  <span className="mx-2 text-[#2f86cc] opacity-50">•</span>

                  <span>Lectura: 3 min</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
