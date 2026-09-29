import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: Request) {
  try {
    const { pollId, optionId, demographics } = await request.json()

    if (!pollId || !optionId) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Buscar la encuesta actual
    const poll = await payload.findByID({
      collection: 'polls' as any,
      id: pollId,
    })

    if (!poll || !poll.isActive) {
      return NextResponse.json({ error: 'Encuesta no disponible' }, { status: 404 })
    }

    // Actualizar votos de la opción seleccionada y el total
    const newTotalVotes = (poll.totalVotes || 0) + 1
    const updatedOptions = poll.options.map((opt: any) => {
      if (opt.id === optionId) {
        return {
          ...opt,
          votes: (opt.votes || 0) + 1,
        }
      }
      return opt
    })

    // Guardar cambios en la base de datos
    const updatedPoll = await payload.update({
      collection: 'polls' as any,
      id: pollId,
      data: {
        totalVotes: newTotalVotes,
        options: updatedOptions,
      },
    })

    // Guardar el registro demográfico individual para estadísticas
    try {
      await payload.create({
        collection: 'poll-votes' as any,
        data: {
          poll: pollId,
          optionId,
          ageRange: demographics?.ageRange,
          municipality: demographics?.municipality,
          gender: demographics?.gender,
        },
      })
    } catch (err) {
      console.error('Error guardando demografía del voto:', err)
    }

    return NextResponse.json({
      success: true,
      totalVotes: updatedPoll.totalVotes,
      options: updatedPoll.options,
    })
  } catch (error) {
    console.error('Error procesando el voto:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
