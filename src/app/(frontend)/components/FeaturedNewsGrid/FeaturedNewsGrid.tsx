import Image from 'next/image'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  excerpt: string
  category: string
  image: string
  slug: string
  format: string
}

interface NewsGridProps {
  posts: Post[]
}

export default function FeaturedNewsGrid({ posts }: NewsGridProps) {
  if (!posts || posts.length < 4) return null

  const mainPost = posts[0]
  const secondaryPosts = posts.slice(1, 4)

  return (
    <section className="max-w-7xl mx-auto my-6 px-4 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLUMNA 1: NOTICIA PRINCIPAL */}
        <div className="lg:col-span-7">
          <Link
            href={`/notas/${mainPost.slug}`}
            className="group relative block overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 h-85"
          >
            <Image
              src={mainPost.image}
              alt={mainPost.title}
              fill
              className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 dark:opacity-80"
              priority
            />
            {/* Gradiente optimizado para Dark Mode */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/20 to-transparent" />

            <div className="absolute bottom-0 p-6">
              <span className="mb-3 inline-block bg-primary px-2 py-0.5 text-[10px] font-sans font-black uppercase text-white rounded-sm tracking-widest">
                {mainPost.category || (mainPost.format === 'person' && 'Persona de la semana')}
              </span>
              <h2 className="text-xl md:text-2xl font-serif font-bold leading-tight text-white group-hover:text-blue-100 transition-colors">
                {mainPost.title}
              </h2>
            </div>
          </Link>
        </div>

        {/* COLUMNA 2: NOTICIAS SECUNDARIAS */}
        <div className="lg:col-span-5 flex flex-col justify-center h-85">
          {secondaryPosts.map((post, index) => (
            <Link
              key={post.id}
              href={`/notas/${post.slug}`}
              className={`group flex items-center gap-4 flex-1 overflow-hidden transition-colors
                ${index === 0 ? 'pt-0' : 'pt-2'} 
                ${
                  index === secondaryPosts.length - 1
                    ? 'pb-0'
                    : 'pb-2 border-b border-slate-100 dark:border-slate-800'
                }`}
            >
              {/* Imagen compacta con overlay sutil en dark mode */}
              <div className="relative w-24 h-16 md:w-38 md:h-full shrink-0 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-opacity group-hover:opacity-80 dark:opacity-90"
                />
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-[9px] font-sans font-black uppercase text-primary tracking-[0.15em] mb-1">
                  {post.category || (mainPost.format === 'person' && 'Persona de la semana')}
                </span>
                <h3 className="text-sm md:text-[15px] font-serif font-bold leading-snug text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
