'use client'

import { useState, ReactNode } from 'react'
import { DateTabs } from '../DateTabs/DateTabs'
import { EventsGrid } from '../EventsGrid/EventsGrid'

interface ColoniasContentProps {
  allEvents: any[]
  uniqueDates: string[]
  children?: ReactNode // Aquí recibiremos el TurismoServer de forma segura
}

export default function ColoniasContent({
  allEvents,
  uniqueDates,
  children,
}: ColoniasContentProps) {
  const [selectedDay, setSelectedDay] = useState(uniqueDates[0] || '')

  // Filtramos los eventos de forma instantánea en el cliente
  const filteredEvents = allEvents.filter((e) => {
    const dateObj = new Date(e.date)
    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')

    const localDateString = `${year}-${month}-${day}`
    return localDateString === selectedDay
  })

  return (
    <>
      {/* Título de la programación con soporte para Dark/Light mode */}
      <h1 className="text-3xl font-bold mt-12 md:text-5xl text-stone-900 dark:text-stone-50 text-center mb-8 tracking-tighter">
        Programación Colonias
      </h1>

      <DateTabs
        availableDates={uniqueDates}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />
      <EventsGrid events={filteredEvents} />

      {/* Renderiza el componente de servidor pasado desde arriba */}
      {children}
    </>
  )
}
