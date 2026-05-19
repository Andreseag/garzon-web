import { CollectionAfterChangeHook } from 'payload'

// Reutilizamos tu extractor de texto plano de Lexical
function extractPlainText(contentJson: any): string {
  if (!contentJson?.root?.children) return ''
  return contentJson.root.children
    .map((node: any) => node.children?.map((child: any) => child.text || '').join('') || '')
    .join('. ')
}

export const generateAudioHook: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  // Evitamos bucles infinitos y solo actuamos si hay contenido
  if (!doc.content) return doc

  // Si el texto no ha cambiado y ya existe un audio, no gastamos API
  const oldText = extractPlainText(previousDoc?.content)
  const newText = extractPlainText(doc.content)
  if (oldText === newText && doc.audioNews) return doc

  try {
    const textToRead = `${doc.title}. ${doc.excerpt || ''}. ${newText}`

    // 1. Llamamos a la API de OpenAI
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1', // El modelo económico y rápido
        input: textToRead.slice(0, 4096), // OpenAI tiene un límite de 4096 caracteres por petición
        voice: 'alloy', // Voces sugeridas: alloy (neutral), onyx (hombre serio), nova (mujer enérgica)
      }),
    })

    if (!response.ok) throw new Error('Error al generar audio con OpenAI')

    // 2. Convertimos el resultado en un Buffer para Payload
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // 3. Creamos el archivo en la colección de Media de Payload
    // (Esto se subirá automáticamente a tu Cloudinary gracias a tu plugin)
    const mediaDoc = await req.payload.create({
      collection: 'media',
      data: {
        alt: `Audio de la noticia: ${doc.title}`,
      },
      file: {
        data: buffer,
        name: `audio-news-${doc.id}.mp3`,
        mimetype: 'audio/mpeg',
        size: buffer.length,
      },
    })

    // 4. Inyectamos el ID del nuevo medio en el campo audioNews de la noticia
    await req.payload.update({
      collection: 'news',
      id: doc.id,
      data: {
        audioNews: mediaDoc.id,
      },
    })
  } catch (error) {
    console.error('❌ Error en generateAudioHook:', error)
  }

  return doc
}
