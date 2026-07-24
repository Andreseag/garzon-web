import { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

export const FeaturedCarousel = ({ events }: { events: any[] }) => {
  return (
    <div className="relative w-full mb-16">
      <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">Destacados</h2>

      {/* Carrusel con scroll horizontal */}
      <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
        {events.map((event) => {
          const featuredImage = event.featuredImage as Media
          return (
            <div key={event.id} className="min-w-[85%] md:min-w-[400px] snap-center">
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={
                    featuredImage?.cloudinary?.secure_url ||
                    featuredImage?.url ||
                    '/placeholder.jpg'
                  }
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[#2f86cc] font-bold text-xs uppercase tracking-widest mb-1">
                    {event.category}
                  </span>
                  <h3 className="text-white text-2xl font-black leading-tight">{event.title}</h3>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
