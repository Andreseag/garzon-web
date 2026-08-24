import Image from 'next/image'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  excerpt: string
  category: string
  image: string
  slug: string
  publishedAt?: string
  readingTime?: string
  publishDate?: string
  content?: any
}

interface TopicGridProps {
  topicTitle: string
  slugCategory: string
  posts: Post[]
}

// Función auxiliar para calcular el tiempo relativo real
const getRelativeTime = (dateString?: string) => {
  const targetDate = dateString
  if (!targetDate) return 'Reciente'

  const date = new Date(targetDate)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Hace un momento'
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60)
    return `Hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `Hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) return `Hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`

  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

// Función recursiva para extraer texto del JSON de Lexical
const extractTextFromLexical = (node: any): string => {
  if (!node) return ''
  if (node.type === 'text') return node.text || ''
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractTextFromLexical).join(' ')
  }
  return ''
}

const calculateReadingTime = (content: any): string => {
  if (!content) return '1 min'

  let text = ''
  if (typeof content === 'string') {
    text = content
  } else if (content.root && content.root.children) {
    text = content.root.children.map(extractTextFromLexical).join(' ')
  }

  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.ceil(words / 200)

  return `${Math.max(1, minutes)} min`
}

export default function TopicGrid({ topicTitle, posts, slugCategory }: TopicGridProps) {
  if (!posts || posts.length === 0) return null

  // Separamos el post principal (el más reciente o el primero) del resto
  const [mainPost, ...secondaryPosts] = posts

  return (
    <section className="max-w-7xl mx-auto px-4 my-12">
      {/* Encabezado de la Sección */}
      <div className="flex items-center justify-between border-b-2 border-gray-100 dark:border-slate-800 pb-4 mb-8">
        <h2 className="text-2xl font-sans font-black uppercase tracking-tighter text-slate-900 dark:text-slate-100 flex items-center gap-3">
          <span className="w-2 h-8 bg-primary inline-block"></span>
          {topicTitle}
        </h2>

        <Link
          href={`/categoria/${slugCategory}`}
          className="text-xs font-sans font-bold text-primary hover:opacity-70 transition-opacity uppercase tracking-widest"
        >
          Ver todo <span className="ml-1">→</span>
        </Link>
      </div>

      {/* 1. NOTICIA PRINCIPAL (LEAD STORY) - Ocupa todo el ancho con un diseño horizontal */}
      {mainPost &&
        (() => {
          const mainReadingTime = calculateReadingTime(mainPost.content)
          return (
            <article className="group cursor-pointer mb-12">
              <Link href={`/notas/${mainPost.slug}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-slate-50/50 dark:bg-slate-900/40 p-5 md:p-8 rounded-3xl border border-gray-100 dark:border-slate-800/80 transition-all duration-300 hover:border-primary/40 dark:hover:border-primary/40">
                  {/* Imagen Principal */}
                  <div className="relative lg:col-span-7 aspect-16/10 w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-slate-900">
                    <Image
                      src={mainPost.image}
                      alt={mainPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      Destacado
                    </div>
                  </div>

                  {/* Contenido Principal */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center text-[11px] font-sans font-bold text-primary uppercase tracking-[0.2em]">
                      <span suppressHydrationWarning>{getRelativeTime(mainPost.publishDate)}</span>
                      <span className="mx-2 opacity-50">•</span>
                      <span>Lectura: {mainReadingTime}</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-serif font-bold leading-tight text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                      {mainPost.title}
                    </h3>

                    <p className="font-sans text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed line-clamp-3">
                      {mainPost.excerpt}
                    </p>

                    <div className="pt-2 flex items-center text-xs font-sans font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      Leer nota completa{' '}
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          )
        })()}

      {/* 2. NOTICIAS SECUNDARIAS (GRID INFERIOR) */}
      {secondaryPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {secondaryPosts.map((post) => {
            const readingTimeText = calculateReadingTime(post.content)
            return (
              <article key={post.id} className="group cursor-pointer flex flex-col justify-between">
                <Link href={`/notas/${post.slug}`} className="flex flex-col h-full">
                  <div>
                    {/* Imagen compacta */}
                    <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl mb-4 bg-gray-100 dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {/* Título y Excerpt */}
                    <h4 className="text-lg font-serif font-bold leading-snug text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h4>

                    <p className="font-sans text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Meta-info inferior */}
                  <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center text-[10px] font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">
                    <span suppressHydrationWarning>{getRelativeTime(post.publishDate)}</span>
                    <span className="mx-2 text-primary opacity-50">•</span>
                    <span>Lectura: {readingTimeText}</span>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
