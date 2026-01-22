import { Columnist } from "@/app/types/Columnist";
import Image from "next/image";
import Link from "next/link";

export default function OpinionGrid({ columnists }: { columnists: any[] }) {
  return (
    <section className="max-w-screen-xl mx-auto px-4 my-16">
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">
          Opinión
        </h2>
        {/* Usamos el azul de marca en la línea decorativa */}
        <div className="h-[2px] flex-1 bg-[#2f86cc]/20"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {columnists.map((author) => (
          <Link
            key={author.id}
            href={`/columnistas/${author.slug}`}
            className="group flex flex-col items-center text-center">
            <div className="relative w-24 h-24 mb-4">
              {/* Anillo de hover con el color exacto #2f86cc */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#2f86cc] transition-all duration-300 scale-110"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border border-gray-200">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#2f86cc] transition-colors">
              {author.name}
            </h3>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">
              {author.specialty}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
