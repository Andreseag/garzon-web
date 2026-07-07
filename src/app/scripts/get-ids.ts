import { getPayload } from 'payload'
import config from '../../payload.config' // Asegúrate que esta ruta sea correcta

async function run() {
  const payload = await getPayload({ config })

  // 1. Obtener Usuarios (para el campo "author")
  const users = await payload.find({ collection: 'users', limit: 10 })
  console.log('--- USUARIOS ---')
  users.docs.forEach((u) => console.log(`Email: ${u.email} | ID: ${u.id}`))

  // 2. Obtener Columnistas
  const cols = await payload.find({ collection: 'columnists', limit: 10 })
  console.log('\n--- COLUMNISTAS ---')
  cols.docs.forEach((c) => console.log(`Nombre: ${c.name || 'Sin nombre'} | ID: ${c.id}`))

  // 3. Obtener Medios (para el campo "featuredImage")
  const media = await payload.find({ collection: 'media', limit: 10 })
  console.log('\n--- MEDIA ---')
  media.docs.forEach((m) => console.log(`Filename: ${m.filename} | ID: ${m.id}`))
}

run()
