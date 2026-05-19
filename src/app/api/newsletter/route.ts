import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) return NextResponse.json({ error: 'Email requerido' }, { status: 400 })

  const payload = await getPayload({ config })

  try {
    await payload.create({
      collection: 'subscribers' as any, // Asegúrate de crear esta colección en Payload
      data: { email },
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Error al guardar' }, { status: 500 })
  }
}
