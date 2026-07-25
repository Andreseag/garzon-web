import { getPayload } from 'payload'
import configPromise from '@payload-config'
import OpinionGrid from '../OpinionGrid/OpinionGrid'

export default async function OpinionGridServer() {
  const payload = await getPayload({ config: configPromise })

  // 1. Traemos un mayor número de columnistas para que el desplazamiento tenga contenido
  const { docs: columnists } = await payload.find({
    collection: 'columnists',
    limit: 50,
  })

  // 2. Buscamos la fecha del último post de cada columnista en paralelo
  const columnistsWithLatestPost = await Promise.all(
    columnists.map(async (columnist: any) => {
      const postsRes = await payload.find({
        collection: 'news', // Ajusta si tus columnas están en otra colección
        where: {
          columnist: { equals: columnist.id }, // Asumiendo que el campo de relación se llama 'columnist'
        },
        sort: '-createdAt',
        limit: 1,
      })

      const latestPost = postsRes.docs[0]
      const latestDate = latestPost ? new Date(latestPost.createdAt).getTime() : 0

      return {
        ...columnist,
        latestDate,
      }
    }),
  )

  // 3. Ordenamos para que los que subieron contenido más recientemente aparezcan primero
  const sortedColumnists = columnistsWithLatestPost.sort((a, b) => b.latestDate - a.latestDate)

  return <OpinionGrid columnists={sortedColumnists} />
}
