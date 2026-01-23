import { Post } from "@/app/data/noticias";
import Image from "next/image";
import Link from "next/link";

export default function LatestNewsGrid({ posts }: { posts: Post[] }) {
  if (!posts || posts.length < 10) return null;

  const mainFeatured = posts[0];
  const middleRow = posts.slice(1, 4);
  const bottomGrid = posts.slice(4, 10);

  return (
    <section className="max-w-7xl mx-auto px-4 my-20">
      {/* CABECERA DE SECCIÓN - Estilo Institucional con Arimo */}
      <div className="mb-14">
        <h2 className="text-4xl font-sans font-black text-slate-900 dark:text-white mb-5 italic tracking-tighter uppercase">
          Últimas <span className="text-[#2f86cc]">Noticias</span>
        </h2>
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 relative rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-24 bg-[#2f86cc]"></div>
        </div>
      </div>

      {/* NIVEL 1: Noticia Principal - Impacto Visual Máximo */}
      <div className="mb-16">
        <Link
          href={`/notas/${mainFeatured.slug}`}
          className="group relative block h-137.5 overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl shadow-blue-900/10 dark:shadow-none">
          <Image
            src={mainFeatured.image}
            alt={mainFeatured.title}
            fill
            className="object-cover opacity-85 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/40 to-transparent" />

          <div className="absolute bottom-0 p-8 md:p-14 max-w-5xl">
            {/* Categoría en Arimo */}
            <span className="inline-block bg-[#FCD116] text-black text-[10px] font-sans font-black px-4 py-1.5 uppercase mb-6 tracking-[0.2em] rounded-md shadow-lg">
              {mainFeatured.category}
            </span>
            {/* Título en Libre Baskerville */}
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white leading-[1.1] mb-6 group-hover:text-blue-50 transition-colors tracking-tight">
              {mainFeatured.title}
            </h3>
            {/* Excerpt en Arimo */}
            <p className="font-sans text-slate-200 line-clamp-2 text-lg font-medium opacity-90 leading-relaxed">
              {mainFeatured.excerpt}
            </p>
          </div>
        </Link>
      </div>

      {/* NIVEL 2: Fila Media (3 Columnas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        {middleRow.map((post) => (
          <Link key={post.id} href={`/notas/${post.slug}`} className="group">
            <div className="relative aspect-16/10 mb-6 overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-100 dark:opacity-90"
              />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-sans font-black uppercase text-[#2f86cc] tracking-widest">
                {post.category}
              </span>
              {post.time && (
                <span
                  className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-tighter"
                  suppressHydrationWarning>
                  • {post.time}
                </span>
              )}
            </div>
            <h4 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 leading-tight group-hover:text-[#2f86cc] dark:group-hover:text-[#2f86cc] transition-colors line-clamp-3">
              {post.title}
            </h4>
          </Link>
        ))}
      </div>

      {/* NIVEL 3: Grid Inferior (Listado Compacto) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14 border-t border-slate-100 dark:border-slate-800 pt-16">
        {bottomGrid.map((post) => (
          <Link
            key={post.id}
            href={`/notas/${post.slug}`}
            className="group flex gap-6 items-start">
            <div className="relative w-28 h-28 shrink-0 overflow-hidden rounded-[1.25rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-100 dark:opacity-80"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-sans font-black uppercase text-[#2f86cc] tracking-[0.2em] mb-2">
                {post.category}
              </span>
              <h4 className="text-[15px] font-serif font-bold text-slate-900 dark:text-slate-200 leading-snug group-hover:text-[#2f86cc] dark:group-hover:text-[#2f86cc] transition-colors line-clamp-3">
                {post.title}
              </h4>
              {post.time && (
                <span
                  className="text-[10px] font-sans text-slate-400 dark:text-slate-500 mt-3 font-bold uppercase tracking-tighter"
                  suppressHydrationWarning>
                  {post.time}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
