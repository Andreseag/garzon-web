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
  readingTime?: string // Ej: "3 min" o "5 min"
  publishDate?: string // Fecha de publicación en formato ISO 8601
  content?: any // Contenido en formato JSON de Lexical
}

interface TopicGridProps {
  topicTitle: string
  slugCategory: string
  posts: Post[]
}

// Función auxiliar para calcular el tiempo relativo real desde la fecha de publicación
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

// Función recursiva para extraer texto del JSON de Lexical y calcular minutos de lectura
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

  // Promedio de lectura: 200 palabras por minuto
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.ceil(words / 200)

  return `${Math.max(1, minutes)} min`
}

export default function TopicGrid({ topicTitle, posts, slugCategory }: TopicGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 my-8">
      {/* Encabezado de la Sección */}
      <div className="flex items-center justify-between border-b-2 border-gray-100 dark:border-slate-800 pb-4 mb-10">
        <h2 className="text-2xl font-sans font-black uppercase tracking-tighter text-slate-900 dark:text-slate-100 flex items-center gap-3">
          {/* Barra vertical decorativa usando la variable del tema */}
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

      {/* Grid de Noticias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {posts.map((post) => {
          const readingTimeText = calculateReadingTime(post.content)
          return (
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
                  <h3 className="text-xl font-serif font-bold leading-tight text-slate-900 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt en Arimo (Sans) */}
                  <p className="font-sans text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta-info real y dinámica */}
                  <div className="pt-2 flex items-center text-[10px] font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">
                    <span suppressHydrationWarning>{getRelativeTime(post.publishDate)}</span>

                    <span className="mx-2 text-primary opacity-50">•</span>
                    <span>Lectura: {readingTimeText}</span>
                  </div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}
