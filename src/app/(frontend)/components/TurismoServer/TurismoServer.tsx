import { getPayload } from 'payload'
import configPromise from '@payload-config'
import GenericCarousel from '../GenericCarousel/GenericCarousel'
import { TouristCard } from '../TouristCard/TouristCard'
import { Utensils, Building2, MessageCircle } from 'lucide-react'

export default async function TurismoServer() {
  const payload = await getPayload({ config: configPromise })

  const [restaurantsRes, hotelsRes] = await Promise.all([
    payload.find({ collection: 'restaurants', sort: 'name' }),
    payload.find({ collection: 'hotels', sort: 'name' }),
  ])

  const restaurants = restaurantsRes.docs
  const hotels = hotelsRes.docs

  // Enlaces de WhatsApp para Garzón (reemplaza '573000000000' por el número real)
  const restaurantWhatsAppUrl = `https://wa.me/573000000000?text=${encodeURIComponent(
    'Hola Garzón, me interesa registrar mi restaurante en la Guía Turística de las Colonias.',
  )}`

  const hotelWhatsAppUrl = `https://wa.me/573000000000?text=${encodeURIComponent(
    'Hola Garzón, me interesa registrar mi hotel u hospedaje en la Guía Turística de las Colonias.',
  )}`

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
          Guía Turística
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base">
          Descubre los mejores lugares para comer y hospedarte durante tu visita a las Colonias.
        </p>
      </div>

      {/* Sección Restaurantes */}
      <section>
        <GenericCarousel title="Gastronomía y Restaurantes">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => (
              <div key={`${restaurant.id}-${index}`} className="flex-shrink-0 w-[280px]">
                <TouristCard item={restaurant} type="restaurant" />
              </div>
            ))
          ) : (
            <div className="flex-shrink-0 w-[280px]">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full p-6 justify-between text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-[#2f86cc]/10 rounded-full flex items-center justify-center text-[#2f86cc]">
                    <Utensils size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    ¡Registra tu Restaurante!
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Haz que los visitantes encuentren tu menú y haz crecer tu negocio en las
                    Colonias.
                  </p>
                </div>
                <div className="pt-6">
                  <a
                    href={restaurantWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <MessageCircle size={16} />
                    <span>Ventas Garzón</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </GenericCarousel>
      </section>

      {/* Sección Hoteles */}
      <section>
        <GenericCarousel title="Hoteles y Alojamientos">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div key={hotel.id} className="flex-shrink-0 w-[280px]">
                <TouristCard item={hotel} type="hotel" />
              </div>
            ))
          ) : (
            <div className="flex-shrink-0 w-[280px]">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full p-6 justify-between text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-[#2f86cc]/10 rounded-full flex items-center justify-center text-[#2f86cc]">
                    <Building2 size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    ¡Anuncia tu Hotel!
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Muestra tus habitaciones y recibe reservas directas de los turistas en las
                    Colonias.
                  </p>
                </div>
                <div className="pt-6">
                  <a
                    href={hotelWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <MessageCircle size={16} />
                    <span>Ventas Garzón</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </GenericCarousel>
      </section>
    </main>
  )
}
