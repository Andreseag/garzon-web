import { getPayload } from 'payload'
import configPromise from '@payload-config'
import OpinionGrid from '../OpinionGrid/OpinionGrid'

export default async function OpinionGridServer() {
  const payload = await getPayload({ config: configPromise })

  const { docs: columnists } = await payload.find({
    collection: 'columnists',
    limit: 6, // Ajusta según tu diseño
    sort: 'name',
  })

  return (
    <main>
      {/* ... otros componentes */}
      <OpinionGrid columnists={columnists} />
    </main>
  )
}
