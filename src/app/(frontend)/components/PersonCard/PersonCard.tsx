// src/components/PersonCard/PersonCard.tsx
import Image from 'next/image'

export function PersonCard({ person }: { person: any }) {
  const { name, photo, achievement, bio } = person

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 my-8">
      <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">
        Persona de la semana
      </h2>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-100">
          <img src={photo.url} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase">{name}</h3>
          <p className="text-lg font-bold text-slate-600 dark:text-slate-400 mb-2">{achievement}</p>
          <div className="text-slate-700 dark:text-slate-300">
            {/* Aquí podrías usar tu componente RichText existente */}
          </div>
        </div>
      </div>
    </div>
  )
}
