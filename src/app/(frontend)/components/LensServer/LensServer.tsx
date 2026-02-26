import { getPayload } from 'payload'
import config from '@/payload.config'
import NewsCarouselFullWidth from '../NewsCarousel/NewsCarousel'
import { Gallery, Media } from '@/payload-types' // Importa tus tipos generados

export default async function LensServer() {
  const payload = await getPayload({ config })

  // Traemos la galería más reciente con tipado explícito
  const { docs } = await payload.find({
    collection: 'galleries',
    limit: 1,
    sort: '-createdAt',
  })

  // Cast del documento a tipo Gallery (el tipo que generó Payload)
  const latestGallery = docs[0] as unknown as Gallery

  if (!latestGallery || !latestGallery.images) {
    return null
  }

  // Formateamos los datos asegurando los tipos
  const formattedImages = latestGallery.images.map((item) => {
    // Validamos que 'image' esté cargado como objeto (Media)
    const imageMedia = item.image as Media

    return {
      url: imageMedia?.url || '',
      caption: item.caption || '',
      photographer: item.photographer || 'Redacción Garzón',
      credit: item.credit || 'Garzón Web',
    }
  })

  return <NewsCarouselFullWidth images={formattedImages} sectionTitle="El lente de Garzón" />
}
