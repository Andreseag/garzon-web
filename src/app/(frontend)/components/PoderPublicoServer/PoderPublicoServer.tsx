import { getPayload } from 'payload'
import config from '@/payload.config'
import TopicGrid from '../TopicGrid/TopicGrid' // Ajusta la ruta a tu archivo
import { Category, CategoryLabels } from '@/constants/categories'

export default async function PoderPublicoServer() {
  const payload = await getPayload({ config })

  // Traemos las últimas 6 noticias de "Poder público" para llenar bien el grid
  const { docs } = await payload.find({
    collection: 'news',
    limit: 6,
    sort: '-createdAt',
    where: {
      category: {
        equals: Category.PODER_PUBLICO, // Usamos el Enum: 'poder-publico'
      },
    },
  })

  // Mapeamos los datos al formato que espera tu interface "Post"
  const formattedPosts = docs.map((doc: any) => ({
    id: doc.id,
    title: doc.title,
    excerpt: doc.excerpt || '',
    category: CategoryLabels[doc.category] || 'Poder público',
    // Priorizamos la URL de Cloudinary
    image:
      typeof doc.featuredImage === 'object'
        ? doc.featuredImage.cloudinary.secure_url || doc.featuredImage.url
        : '/placeholder.jpg',
    slug: doc.slug,
  }))

  const showContent =
    formattedPosts.length > 4 ? (
      <TopicGrid slugCategory="poder-publico" topicTitle="Poder público" posts={formattedPosts} />
    ) : null

  return showContent
}
