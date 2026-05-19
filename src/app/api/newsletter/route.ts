import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) return NextResponse.json({ error: 'Email requerido' }, { status: 400 })

  const payload = await getPayload({ config })

  try {
    await payload.create({
      collection: 'subscribers' as any,
      data: { email },
    })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    if (err.message?.includes('duplicate key value') || err.message?.includes('already exists')) {
      return NextResponse.json({ error: 'Este correo ya está suscrito.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Error al procesar la suscripción.' }, { status: 500 })
  }
}
