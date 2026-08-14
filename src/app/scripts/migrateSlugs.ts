import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Función para formatear slugs
const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

async function migrate() {
  console.log('--- Iniciando migración de Slugs ---')

  const payload = await getPayload({ config: configPromise })

  const collections = ['bars', 'restaurants', 'hotels']

  for (const collection of collections) {
    console.log(`Procesando colección: ${collection}...`)

    const results = await payload.find({
      collection: collection as any,
      limit: 1000,
      depth: 0,
    })

    for (const doc of results.docs) {
      if (!doc.slug && doc.name) {
        const newSlug = formatSlug(doc.name)

        await payload.update({
          collection: collection as any,
          id: doc.id,
          data: { slug: newSlug },
        })

        console.log(`✅ Actualizado [${collection}]: "${doc.name}" -> slug: "${newSlug}"`)
      } else {
        console.log(`ℹ️ Saltado [${collection}]: "${doc.name}" (ya tenía slug o no tiene nombre)`)
      }
    }
  }

  console.log('--- Migración finalizada ---')
  process.exit(0)
}

migrate().catch((err) => {
  console.error('Error durante la migración:', err)
  process.exit(1)
})
