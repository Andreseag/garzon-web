import { getPayload } from 'payload'
import config from '@/payload.config'
import TopicGrid from '../TopicGrid/TopicGrid'
import { Category, CategoryLabels } from '@/constants/categories'
import { GlobalVerticalPromoSlider } from '../GlobalVerticalPromoSlider/GlobalVerticalPromoSlider'
import TopicGridNew from '../TopicGridNew/TopicGridNew'

export default async function PoderPublicoServer() {
  const payload = await getPayload({ config })

  // Traemos las noticias y las promociones activas en paralelo
  const [newsRes, promosRes] = await Promise.all([
    payload.find({
      collection: 'news',
      limit: 6,
      sort: '-createdAt',
      where: {
        category: {
          equals: Category.PODER_PUBLICO,
        },
      },
    }),
    payload.find({
      collection: 'promotions',
      where: {
        isActive: { equals: true },
      },
    }),
  ])

  // Traer noticias de la categoría "Deportes" para el segundo grid
  const sportsRes = await payload.find({
    collection: 'news',
    limit: 6,
    sort: '-createdAt',
    where: {
      category: {
        equals: Category.DEPORTES,
      },
    },
  })

  const formattedSportsPosts = sportsRes.docs.map((doc: any) => ({
    id: doc.id,
    title: doc.title,
    excerpt: doc.excerpt || '',
    category: CategoryLabels[doc.category] || 'Deportes',
    image:
      typeof doc.featuredImage === 'object' && doc.featuredImage !== null
        ? doc.featuredImage.cloudinary?.secure_url || doc.featuredImage.url
        : '/placeholder.jpg',
    slug: doc.slug,
    publishedAt: doc.publishedAt,
    readingTime: doc.readingTime,
    publishDate: doc.publishDate, // Agregamos la fecha de publicación real
    content: doc.content, // Agregamos el contenido en formato JSON de Lexical
  }))

  // Mapeamos los datos de las noticias
  const formattedPosts = newsRes.docs.map((doc: any) => ({
    id: doc.id,
    title: doc.title,
    excerpt: doc.excerpt || '',
    category: CategoryLabels[doc.category] || 'Poder público',
    image:
      typeof doc.featuredImage === 'object' && doc.featuredImage !== null
        ? doc.featuredImage.cloudinary?.secure_url || doc.featuredImage.url
        : '/placeholder.jpg',
    slug: doc.slug,
    publishedAt: doc.publishedAt,
    readingTime: doc.readingTime,
    publishDate: doc.publishDate, // Agregamos la fecha de publicación real
    content: doc.content, // Agregamos el contenido en formato JSON de Lexical
  }))

  if (formattedPosts.length <= 4) return null

  // Verificamos si hay promociones activas
  const hasPromos = promosRes.docs && promosRes.docs.length > 0

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Lateral con la Publicidad Vertical: Solo se renderiza si existen promos */}
        {hasPromos && (
          <aside className="lg:col-span-1 lg:sticky top-6 order-1 lg:order-2">
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
                Patrocinado
              </h3>
              <GlobalVerticalPromoSlider promos={promosRes.docs} />
            </div>
          </aside>
        )}

        {/* Contenido principal (Grid de noticias): Ocupa 3 columnas si hay promos, o las 4 columnas completas si no hay */}
        <div className={hasPromos ? 'lg:col-span-3 order-2 lg:order-1' : 'lg:col-span-4'}>
          <TopicGrid
            slugCategory="poder-publico"
            topicTitle="Poder público"
            posts={formattedPosts}
          />
          <div className="mt-20"></div>
          <TopicGridNew
            slugCategory="deportes"
            topicTitle="Deportes"
            posts={formattedSportsPosts}
          />
        </div>
      </div>
    </section>
  )
}
