import { getPayload } from 'payload'
import config from '@/payload.config'
import LatestNewsGrid from '../LatestNewsGrid/LatestNewsGrid'
import { Category, CategoryLabels } from '@/constants/categories'

export default async function ScienceTechServer() {
  const payload = await getPayload({ config })

  // Traemos las noticias de Tecnología, Ciencia/Salud e Internacional
  const { docs } = await payload.find({
    collection: 'news',
    limit: 10, // Tu grid necesita al menos 10 para no retornar null
    sort: '-createdAt',
    where: {
      category: {
        // Usamos 'in' para buscar múltiples valores
        in: [Category.TECNOLOGIA, Category.CIENCIA_SALUD, Category.INTERNACIONAL],
      },
    },
  })

  // Mapeamos al formato que espera tu interfaz "Post"
  const formattedPosts = docs.map((doc: any) => ({
    id: doc.id,
    title: doc.title,
    excerpt: doc.excerpt || '',
    category: CategoryLabels[doc.category] || 'Actualidad',
    slug: doc.slug,
    // Priorizamos la imagen de Cloudinary
    image:
      typeof doc.featuredImage === 'object'
        ? doc.featuredImage.url || doc.featuredImage.thumbnailURL
        : '/placeholder.jpg',
    // Formateamos la fecha si tu componente usa 'time'
    time: new Date(doc.createdAt).toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
    }),
  }))

  // Si no hay suficientes noticias, no mostramos la sección
  if (formattedPosts.length < 10) return null

  return <LatestNewsGrid posts={formattedPosts} />
}
