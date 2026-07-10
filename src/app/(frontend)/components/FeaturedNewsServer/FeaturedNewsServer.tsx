import { getPayload } from 'payload'
import config from '@/payload.config'
import FeaturedNewsGrid from '../FeaturedNewsGrid/FeaturedNewsGrid'
import { Category, CategoryLabels } from '@/constants/categories' // Importa lo anterior

export default async function FeaturedNewsServer() {
  const payload = await getPayload({ config })

  // Traemos las 4 noticias filtrando con el Enum
  const { docs } = await payload.find({
    collection: 'news',
    limit: 4,
    sort: '-createdAt',
    // where: {
    //   category: {
    //     equals: Category.ULTIMA_HORA, // Usamos el enum aquí
    //   },
    // },
  })

  // Mapeamos los datos
  const formattedPosts = docs.map((doc: any) => {
    // Obtenemos el label bonito, si no existe usamos el slug por defecto
    const label = CategoryLabels[doc.category] || doc.category

    return {
      id: doc.id,
      title: doc.title,
      excerpt: doc.excerpt || '',
      category: label, // <--- AQUÍ: Ahora pasamos "Última hora" en lugar de "ultima-hora"
      image:
        typeof doc.featuredImage === 'object'
          ? doc.featuredImage.cloudinary.secure_url || doc.featuredImage.url
          : '/placeholder.jpg',
      slug: doc.slug,
    }
  })

  return <FeaturedNewsGrid posts={formattedPosts} />
}
