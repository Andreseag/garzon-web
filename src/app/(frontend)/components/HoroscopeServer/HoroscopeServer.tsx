import { getPayload } from 'payload'
import config from '@/payload.config'
import HoroscopeGrid from '../HoroscopeGrid/HoroscopeGrid' // Ajusta la ruta a tu componente anterior

export default async function HoroscopeServer() {
  const payload = await getPayload({ config })

  // 1. Obtenemos la fecha de hoy a las 00:00 para comparar
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // 2. Buscamos los horóscopos
  const { docs } = await payload.find({
    collection: 'horoscopes',
    limit: 12, // Traemos todos los signos si es posible
    sort: '-publishDate', // Los más recientes primero
    where: {
      publishDate: {
        greater_than_equal: today.toISOString(),
      },
    },
  })

  // 3. Si no hay datos, no renderizamos nada (o podrías traer los últimos 5 de ayer)
  if (!docs || docs.length === 0) {
    // Opcional: Reintento trayendo los últimos 5 sin importar la fecha
    const lastDocs = await payload.find({
      collection: 'horoscopes',
      limit: 5,
      sort: '-publishDate',
    })

    if (lastDocs.docs.length === 0) return null

    return <HoroscopeGrid posts={formatHoroscopes(lastDocs.docs)} />
  }

  return <HoroscopeGrid posts={formatHoroscopes(docs)} />
}

/**
 * Función auxiliar para limpiar los datos antes de enviarlos al Grid
 */
function formatHoroscopes(docs: any[]) {
  console.log('Horóscopos obtenidos:', docs) // Debug: Ver qué datos llegan

  return docs.map((doc) => ({
    id: doc.id,
    sign: doc.sign,
    description: doc.description,
    image:
      typeof doc.image === 'object'
        ? doc.image.cloudinary.secure_url || doc.image.url
        : '/placeholder.jpg',
  }))
}
