import TurismoServer from '../components/TurismoServer/TurismoServer'

export const dynamic = 'force-dynamic'

export default function TurismoPage() {
  return (
    <main className="w-full mx-auto pb-20 pt-8 px-4 max-w-7xl">
      {/* <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Turismo y Alojamientos
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Descubre los mejores hoteles, alojamientos, restaurantes y bares de la región.
        </p>
      </div> */}

      <TurismoServer />
    </main>
  )
}
