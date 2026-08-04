// src/components/PersonCard/PersonCard.tsx
import Image from 'next/image'
import { Media } from '@/payload-types'

export function PersonCard({ person }: { person: any }) {
  const { name, photo, achievement, bio } = person

  const photoMedia = photo as Media
  const photoUrl =
    photoMedia?.cloudinary?.secure_url ||
    photoMedia?.url ||
    (typeof photo === 'string' ? photo : null)

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 my-8">
      <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
        Persona de la semana
      </h2>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-100 dark:border-zinc-800 flex-shrink-0">
          {photoUrl ? (
            <Image src={photoUrl} alt={name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white text-xs font-medium">
              Sin foto
            </div>
          )}
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
