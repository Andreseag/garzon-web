import { Columnist } from "@/app/types/Columnist";
import Image from "next/image";
import Link from "next/link";

export default function OpinionGrid({
  columnists,
}: {
  columnists: Columnist[];
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 my-16">
      {/* CABECERA DE SECCIÓN */}
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-sans font-black uppercase tracking-tighter text-slate-900 dark:text-slate-100">
          Opinión
        </h2>
        {/* Línea decorativa que se adapta al modo oscuro */}
        <div className="h-0.5 flex-1 bg-[#2f86cc]/20 dark:bg-[#2f86cc]/40"></div>
      </div>

      {/* GRID DE COLUMNISTAS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
        {columnists.map((author) => (
          <Link
            key={author.id}
            href={`/columnistas/${author.slug}`}
            className="group flex flex-col items-center text-center focus:outline-none">
            <div className="relative w-24 h-24 mb-5">
              {/* Anillo de hover animado con tu azul de marca */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#2f86cc] transition-all duration-300 group-hover:scale-110"></div>

              {/* Contenedor del Avatar */}
              <div className="relative w-full h-full rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Nombre en Arimo (font-sans) */}
            <h3 className="text-sm font-sans font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#2f86cc] dark:group-hover:text-[#2f86cc] transition-colors leading-snug">
              {author.name}
            </h3>

            {/* Especialidad en Arimo (font-sans) */}
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 mt-2">
              {author.specialty}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
