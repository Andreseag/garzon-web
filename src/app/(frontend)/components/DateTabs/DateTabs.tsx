'use client'

interface DateTabsProps {
  availableDates: string[]
  selectedDay: string
  onSelectDay: (date: string) => void
}

export const DateTabs = ({ availableDates, selectedDay, onSelectDay }: DateTabsProps) => {
  if (availableDates.length === 0) return null

  return (
    <div className="flex justify-start sm:justify-center gap-4 mb-10 overflow-x-auto overflow-y-hidden px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {availableDates.map((dateStr) => {
        const dateObj = new Date(dateStr + 'T00:00:00') // Evita desfases de zona horaria
        const formattedLabel = dateObj.toLocaleDateString('es-ES', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })

        const isSelected = selectedDay === dateStr

        return (
          <button
            key={dateStr}
            onClick={() => onSelectDay(dateStr)}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 capitalize cursor-pointer whitespace-nowrap flex-shrink-0 ${
              isSelected
                ? 'bg-[#2f86cc] text-white shadow-lg shadow-[#2f86cc]/30 scale-105'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {formattedLabel}
          </button>
        )
      })}
    </div>
  )
}
