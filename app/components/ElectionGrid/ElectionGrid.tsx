import Image from "next/image";
import Link from "next/link";

export default function ElectionGrid({ posts }: { posts: any[] }) {
  if (!posts || posts.length < 5) return null;

  const featured = posts[0];
  const sidePosts = posts.slice(1, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 my-16">
      {/* Detalle superior: Bandera de Colombia */}
      <div className="flex h-1.5 w-full overflow-hidden rounded-t-full">
        <div className="flex-[2] bg-[#FCD116]"></div>
        <div className="flex-1 bg-[#003893]"></div>
        <div className="flex-1 bg-[#CE1126]"></div>
      </div>

      {/* Cabecera del Especial */}
      <div className="bg-white dark:bg-slate-950 py-10 flex flex-col md:flex-row justify-between items-end border-b-2 border-slate-100 dark:border-slate-800 mb-10 transition-colors">
        <div>
          <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tighter uppercase italic text-slate-900 dark:text-white leading-none">
            Elecciones <span className="text-[#2f86cc]">2026</span>
          </h2>
          <p className="text-xs font-sans font-bold text-slate-500 dark:text-slate-400 mt-4 flex items-center gap-2 tracking-widest uppercase">
            ESPECIAL PRESIDENCIAL{" "}
            <span className="text-[#FCD116] text-lg leading-none">•</span>{" "}
            CAMINO A LA CASA DE NARIÑO
          </p>
        </div>

        <div className="mt-6 md:mt-0 flex items-center gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-2.5 rounded-full">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#CE1126]"></span>
          </span>
          <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">
            Análisis en tiempo real
          </span>
        </div>
      </div>

      {/* Grid de Contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Noticia de Análisis Principal */}
        <div className="lg:col-span-7">
          <Link href={`/notas/${featured.slug}`} className="group block">
            <div className="relative aspect-video rounded-4xl overflow-hidden mb-8 bg-slate-100 dark:bg-slate-900 shadow-2xl shadow-slate-200/50 dark:shadow-none">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute top-6 left-6 bg-[#2f86cc] text-white text-[10px] font-sans font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                Cobertura Especial
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#2f86cc] dark:group-hover:text-[#2f86cc] transition-colors leading-[1.15] tracking-tight">
              {featured.title}
            </h3>
            <p className="mt-5 text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-sans">
              {featured.excerpt}
            </p>
          </Link>
        </div>

        {/* Noticias de Seguimiento Lateral */}
        <div className="lg:col-span-5 flex flex-col">
          <h4 className="text-[11px] font-sans font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] border-b border-slate-100 dark:border-slate-800 pb-3 mb-2">
            Últimas Actualizaciones
          </h4>

          <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
            {sidePosts.map((post) => (
              <Link
                key={post.id}
                href={`/notas/${post.slug}`}
                className="py-6 group">
                <div className="flex gap-5 items-start">
                  <div className="flex-1">
                    <h4 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-200 group-hover:text-[#2f86cc] transition-colors leading-snug">
                      {post.title}
                    </h4>
                    <span className="inline-flex items-center text-[10px] font-sans font-black text-[#2f86cc] mt-3 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      Leer informe <span className="ml-2">→</span>
                    </span>
                  </div>
                  <div className="relative w-28 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover opacity-100 dark:opacity-80 transition-all group-hover:scale-110"
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
