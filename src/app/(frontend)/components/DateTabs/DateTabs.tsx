'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface DateTabsProps {
  availableDates: string[] // ['2026-07-17', '2026-07-18']
}

export const DateTabs = ({ availableDates }: DateTabsProps) => {
  const searchParams = useSearchParams()
  const currentDay = searchParams.get('day') || availableDates[0]

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {availableDates.map((date) => {
        const isActive = currentDay === date
        const formatted = new Date(date).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
        })

        return (
          <Link
            key={date}
            href={`/colonias-villanueva?day=${date}`}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              isActive
                ? 'bg-[#2f86cc] text-white shadow-lg'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {formatted}
          </Link>
        )
      })}
    </div>
  )
}
