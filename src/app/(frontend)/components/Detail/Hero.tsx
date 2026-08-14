import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Media } from '@/payload-types'

interface HeroProps {
  name: string
  image: any
  location: string
  categoryLabel: string
}

export const Hero = ({ name, image, location, categoryLabel }: HeroProps) => {
  // Extracción segura de la URL (soporta Cloudinary y almacenamiento local de Payload)
  const media = image as Media
  const url = media?.cloudinary?.secure_url || media?.url || '/placeholder.jpg'

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-xl">
      {/* Imagen de fondo */}
      <Image src={url} alt={name} fill priority className="object-cover" />

      {/* Degradado oscuro para contraste superior */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Contenido alineado al fondo */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 space-y-3">
        {/* Badge de Categoría */}
        <div>
          <span className="inline-block bg-[#2f86cc]/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm">
            {categoryLabel}
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          {name}
        </h1>

        {/* Ubicación */}
        {location && (
          <div className="flex items-center gap-2 text-slate-200 text-sm md:text-base font-medium">
            <MapPin size={18} className="text-[#4facfe]" />
            <span>{location}</span>
          </div>
        )}
      </div>
    </div>
  )
}
