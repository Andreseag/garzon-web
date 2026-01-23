import { Post } from "@/app/data/noticias";
import Image from "next/image";
import Link from "next/link";

export default function LatestNewsGrid({ posts }: { posts: Post[] }) {
  if (!posts || posts.length < 10) return null;

  // Segmentación para el nuevo layout
  const mainFeatured = posts[0];
  const middleRow = posts.slice(1, 4);
  const bottomGrid = posts.slice(4, 10);

  return (
    <section className="max-w-7xl mx-auto px-4 my-16">
      {/* CABECERA DE SECCIÓN */}
      <div className="mb-12">
        <h2 className="text-4xl font-black text-slate-900 mb-4 italic tracking-tight uppercase">
          Últimas <span className="text-[#2f86cc]">Noticias</span>
        </h2>
        <div className="h-1 w-full bg-slate-100 relative">
          <div className="absolute top-0 left-0 h-full w-20 bg-[#2f86cc]"></div>
        </div>
      </div>

      {/* NIVEL 1: Noticia Principal (Ancho total) */}
      <div className="mb-12">
        <Link
          href={`/notas/${mainFeatured.slug}`}
          className="group relative block h-125 overflow-hidden rounded-4xl bg-slate-900">
          <Image
            src={mainFeatured.image}
            alt={mainFeatured.title}
            fill
            className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/20 to-transparent" />

          <div className="absolute bottom-0 p-8 md:p-12 max-w-5xl">
            <span className="inline-block bg-[#FCD116] text-black text-[10px] font-black px-3 py-1 uppercase mb-4 tracking-[0.2em] rounded-sm">
              {mainFeatured.category}
            </span>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-[1.1] mb-6 group-hover:text-blue-50 transition-colors tracking-tighter">
              {mainFeatured.title}
            </h3>
            <p className="text-slate-200 line-clamp-2 text-lg font-medium opacity-90 leading-relaxed">
              {mainFeatured.excerpt}
            </p>
          </div>
        </Link>
      </div>

      {/* NIVEL 2: Tres noticias (Una al lado de la otra) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        {middleRow.map((post) => (
          <Link
            key={post.id}
            href={`/notas/${post.slug}`}
            className="group flex flex-col">
            <div className="relative aspect-16/10 mb-5 overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase text-[#2f86cc] tracking-widest">
                {post.category}
              </span>
              {post.time && (
                <span
                  className="text-[10px] text-slate-400 font-bold italic"
                  suppressHydrationWarning>
                  • {post.time}
                </span>
              )}
            </div>
            <h4 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-[#2f86cc] transition-colors line-clamp-3 tracking-tight">
              {post.title}
            </h4>
          </Link>
        ))}
      </div>

      {/* NIVEL 3: Seis noticias (Grid de 3 columnas x 2 filas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 border-t border-slate-100 pt-16">
        {bottomGrid.map((post) => (
          <Link
            key={post.id}
            href={`/notas/${post.slug}`}
            className="group flex gap-5 items-start">
            <div className="relative w-28 h-28 shrink-0 overflow-hidden rounded-2xl bg-slate-50">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-opacity group-hover:opacity-80"
              />
            </div>
            <div className="flex flex-col pt-1">
              <span className="text-[9px] font-black uppercase text-[#2f86cc] tracking-[0.15em] mb-2">
                {post.category}
              </span>
              <h4 className="text-[15px] font-bold text-slate-900 leading-snug group-hover:text-[#2f86cc] transition-colors line-clamp-3">
                {post.title}
              </h4>
              {post.time && (
                <span
                  className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter"
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
