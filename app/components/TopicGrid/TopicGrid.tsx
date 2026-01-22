import Image from "next/image";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  slug: string;
}

interface TopicGridProps {
  topicTitle: string;
  posts: Post[];
}

export default function TopicGrid({ topicTitle, posts }: TopicGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 my-12">
      {/* Encabezado de la Sección con el color de marca #2f86cc */}
      <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-8">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 flex items-center gap-3">
          {/* Barra vertical decorativa con el color de marca */}
          <span className="w-2 h-8 bg-[#2f86cc] inline-block"></span>
          {topicTitle}
        </h2>
        <Link
          href={`/categoria/${topicTitle.toLowerCase()}`}
          className="text-sm font-bold text-[#2f86cc] hover:opacity-80 transition-opacity uppercase tracking-widest">
          Ver todo →
        </Link>
      </div>

      {/* Grid de Noticias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="group cursor-pointer">
            <Link href={`/notas/${post.slug}`}>
              {/* Imagen con Aspect Ratio fijo */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg mb-4 bg-gray-100 border border-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Contenido */}
              <div>
                <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-[#2f86cc] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-slate-600 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Hace 2 horas</span>
                  <span className="mx-2">•</span>
                  <span>Lectura: 3 min</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
