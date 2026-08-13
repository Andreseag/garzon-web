import { getPayload } from 'payload'
import configPromise from '@payload-config'
import GenericCarousel from '../GenericCarousel/GenericCarousel'
import { TouristCard } from '../TouristCard/TouristCard'
// Importamos el icono de Wine
import { Utensils, Building2, Wine, MessageCircle } from 'lucide-react'

// IMPORTANTE: Asegúrate de regenerar los tipos con 'npx payload generate:types'
// para que 'Bar', 'Restaurant' y 'Hotel' aparezcan en payload-types.ts
import { Bar, Restaurant, Hotel } from '@/payload-types'

export default async function TurismoServer() {
  // Inicializa Payload
  const payload = await getPayload({ config: configPromise })

  // Consultamos las tres colecciones en paralelo
  // Filtramos por isActive=true para mayor seguridad en producción
  const [restaurantsRes, hotelsRes, barsRes] = await Promise.all([
    payload.find({
      collection: 'restaurants',
      sort: 'name',
      limit: 1000,
      where: { isActive: { equals: true } },
    }),
    payload.find({
      collection: 'hotels',
      sort: 'name',
      limit: 1000,
      where: { isActive: { equals: true } },
    }),
    payload.find({
      collection: 'bars',
      sort: 'name',
      limit: 1000,
      where: { isActive: { equals: true } },
    }),
  ])

  // Extrae los documentos tipados
  const restaurants = restaurantsRes.docs as Restaurant[]
  const hotels = hotelsRes.docs as Hotel[]
  const bars = barsRes.docs as Bar[]

  // Enlaces de WhatsApp para Garzón (Reemplaza '573000000000' por el número real)
  const baseWhatsApp = '573000000000'
  const getWhatsappUrl = (tipo: string, nombre?: string) => {
    const nombreItem = nombre ? `'${nombre}'` : 'mi establecimiento'
    return `https://wa.me/${baseWhatsApp}?text=${encodeURIComponent(
      `Hola Garzón, me interesa registrar ${nombreItem} (categoría ${tipo}) en la Guía Turística de las Colonias.`,
    )}`
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
          Guía Turística
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base">
          Descubre los mejores lugares para comer, hospedarte y disfrutar de la vida nocturna
          durante tu visita a las Colonias.
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
            // Card de estado vacío para Restaurantes
            <div className="flex-shrink-0 w-[280px] h-full">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full p-6 justify-between text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary">
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
                    href={getWhatsappUrl('restaurante')}
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

      {/* Sección Bares (Nueva) */}
      <section>
        <GenericCarousel title="Bares y Vida Nocturna">
          {bars.length > 0 ? (
            bars.map((bar, index) => (
              <div key={`${bar.id}-${index}`} className="flex-shrink-0 w-[280px]">
                <TouristCard item={bar} type="restaurant" />
              </div>
            ))
          ) : (
            // Card de estado vacío para Bares
            <div className="flex-shrink-0 w-[280px] h-full">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full p-6 justify-between text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Wine size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    ¡Anuncia tu Bar!
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Muestra el ambiente de tu local y atrae a más visitantes a tus eventos en las
                    Colonias.
                  </p>
                </div>
                <div className="pt-6">
                  <a
                    href={getWhatsappUrl('bar')}
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
        <GenericCarousel title="Hoteles y Balnearios">
          {hotels.length > 0 ? (
            hotels.map((hotel, index) => (
              <div key={`${hotel.id}-${index}`} className="flex-shrink-0 w-[280px]">
                <TouristCard item={hotel} type="hotel" />
              </div>
            ))
          ) : (
            // Card de estado vacío para Hoteles
            <div className="flex-shrink-0 w-[280px] h-full">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full p-6 justify-between text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary">
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
                    href={getWhatsappUrl('hotel u hospedaje')}
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
