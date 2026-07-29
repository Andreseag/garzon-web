import { getPayload } from 'payload'
import configPromise from '@payload-config'
import GenericCarousel from '../GenericCarousel/GenericCarousel'
import { TouristCard } from '../TouristCard/TouristCard'

export default async function TurismoServer() {
  const payload = await getPayload({ config: configPromise })

  const [restaurantsRes, hotelsRes] = await Promise.all([
    payload.find({ collection: 'restaurants', sort: 'name' }),
    payload.find({ collection: 'hotels', sort: 'name' }),
  ])

  const restaurants = restaurantsRes.docs
  const hotels = hotelsRes.docs
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
      {restaurants.length > 0 && (
        <section>
          <GenericCarousel title="Gastronomía y Restaurantes">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="flex-shrink-0 w-[280px]">
                <TouristCard item={restaurant} type="restaurant" />
              </div>
            ))}
          </GenericCarousel>
        </section>
      )}

      {/* Sección Hoteles */}
      {hotels.length > 0 && (
        <section>
          <GenericCarousel title="Hoteles y Alojamientos">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="flex-shrink-0 w-[280px]">
                <TouristCard item={hotel} type="hotel" />
              </div>
            ))}
          </GenericCarousel>
        </section>
      )}
    </main>
  )
}
