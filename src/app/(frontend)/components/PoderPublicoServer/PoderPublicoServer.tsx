import { getPayload } from 'payload'
import config from '@/payload.config'
import TopicGrid from '../TopicGrid/TopicGrid'
import { Category, CategoryLabels } from '@/constants/categories'
import { GlobalVerticalPromoSlider } from '../GlobalVerticalPromoSlider/GlobalVerticalPromoSlider'

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
  }))

  if (formattedPosts.length <= 4) return null

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Lateral con la Publicidad Vertical: order-1 en mobile (va primero), lg:order-2 en desktop (va a la derecha) */}
        <aside className="lg:col-span-1 lg:sticky top-6 order-1 lg:order-2">
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
              Patrocinado
            </h3>
            <GlobalVerticalPromoSlider promos={promosRes.docs} />
          </div>
        </aside>

        {/* Contenido principal (Grid de noticias): order-2 en mobile (va después), lg:order-1 en desktop (va a la izquierda) */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <TopicGrid
            slugCategory="poder-publico"
            topicTitle="Poder público"
            posts={formattedPosts}
          />
        </div>
      </div>
    </section>
  )
}
