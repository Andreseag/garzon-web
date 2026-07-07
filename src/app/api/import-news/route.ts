import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  // 1. Verificación de Auth (Siempre retorna)
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.IMPORT_SECRET_KEY}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    // 2. Parseo de JSON con manejo de errores
    const rawBody = await req.text()
    if (!rawBody) {
      return NextResponse.json({ error: 'Cuerpo de la petición vacío' }, { status: 400 })
    }

    const newsItems = JSON.parse(rawBody)

    if (!Array.isArray(newsItems)) {
      return NextResponse.json({ error: 'El formato debe ser un array' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const results = { success: 0, failed: 0, errors: [] as any[] }

    // 3. Procesamiento
    for (const item of newsItems) {
      try {
        // 1. Verificación manual rápida (Opcional pero recomendado para debug)
        if (!item.featuredImage) throw new Error('Falta el ID de Imagen Destacada')
        if (!item.author) throw new Error('Falta el ID de Autor')

        // 2. Intentar crear
        await payload.create({
          collection: 'news',
          data: item,
          context: { isBulkImport: true },
        })
        results.success++
      } catch (err: any) {
        // AQUÍ VEREMOS EL ERROR REAL
        console.error(`Error en noticia "${item.title}":`, err.message)
        results.failed++
        results.errors.push({
          title: item.title,
          error: err.message,
          fieldsTried: {
            img: item.featuredImage,
            col: item.columnist,
            auth: item.author,
          },
        })
      }
    }

    // 4. Retorno de éxito (OBLIGATORIO)
    return NextResponse.json({ message: 'Proceso completado', results }, { status: 200 })
  } catch (err: any) {
    // 5. Retorno de error global (OBLIGATORIO si falla algo en el try)
    console.error('Error crítico en importación:', err)
    return NextResponse.json(
      { error: 'Error interno del servidor', details: err.message },
      { status: 500 },
    )
  }
}
