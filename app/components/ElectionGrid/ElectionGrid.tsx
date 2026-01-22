import Image from "next/image";
import Link from "next/link";

export default function ElectionGrid({ posts }: { posts: any[] }) {
  const featured = posts[0];
  const sidePosts = posts.slice(1, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 my-16">
      {/* Detalle superior: Bandera de Colombia en línea delgada */}
      <div className="flex h-1 w-full overflow-hidden">
        <div className="flex-[2] bg-[#FCD116]"></div>
        <div className="flex-1 bg-[#003893]"></div>
        <div className="flex-1 bg-[#CE1126]"></div>
      </div>

      {/* Cabecera Limpia en Fondo Blanco */}
      <div className="bg-white py-8 flex flex-col md:flex-row justify-between items-end border-b-2 border-slate-100 mb-8">
        <div>
          <h2 className="text-4xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">
            Elecciones <span className="text-[#2f86cc]">2026</span>
          </h2>
          <p className="text-sm font-bold text-slate-500 mt-2 flex items-center gap-2">
            ESPECIAL PRESIDENCIAL <span className="text-[#FCD116]">•</span>{" "}
            CAMINO A LA CASA DE NARIÑO
          </p>
        </div>

        <div className="mt-6 md:mt-0 flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CE1126]"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">
            Análisis en tiempo real
          </span>
        </div>
      </div>

      {/* Grid Especial con bordes sutiles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Noticia de Análisis Principal */}
        <div className="lg:col-span-7">
          <Link href={`/notas/${featured.slug}`} className="group">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-slate-100">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 bg-[#2f86cc] text-white text-[10px] font-bold px-3 py-1.5 rounded-md uppercase shadow-xl">
                Cobertura Especial
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 group-hover:text-[#2f86cc] transition-colors leading-tight tracking-tight">
              {featured.title}
            </h3>
            <p className="mt-4 text-slate-600 leading-relaxed text-lg">
              {featured.excerpt}
            </p>
          </Link>
        </div>

        {/* Noticias de Seguimiento Lateral */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">
            Últimas Actualizaciones
          </h4>
          <div className="flex flex-col divide-y divide-slate-100">
            {sidePosts.map((post) => (
              <Link
                key={post.id}
                href={`/notas/${post.slug}`}
                className="py-4 first:pt-0 group">
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 group-hover:text-[#2f86cc] transition-colors leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-[11px] text-[#2f86cc] font-bold mt-2 uppercase tracking-tight">
                      Leer informe →
                    </p>
                  </div>
                  <div className="relative w-24 h-16 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-opacity group-hover:opacity-80"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
