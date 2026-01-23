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

interface NewsGridProps {
  posts: Post[];
}

export default function FeaturedNewsGrid({ posts }: NewsGridProps) {
  if (!posts || posts.length < 4) return null;

  const mainPost = posts[0];
  const secondaryPosts = posts.slice(1, 4);

  return (
    <section className="max-w-7xl mx-auto my-6 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLUMNA 1: NOTICIA PRINCIPAL */}
        <div className="lg:col-span-7">
          <Link
            href={`/notas/${mainPost.slug}`}
            className="group relative block overflow-hidden rounded-2xl bg-slate-100 h-85">
            <Image
              src={mainPost.image}
              alt={mainPost.title}
              fill
              className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 p-6">
              <span className="mb-2 inline-block bg-[#2f86cc] px-2 py-0.5 text-[10px] font-bold uppercase text-white rounded-sm">
                {mainPost.category}
              </span>
              <h2 className="text-xl md:text-2xl font-bold leading-tight text-white group-hover:text-blue-50 transition-colors">
                {mainPost.title}
              </h2>
            </div>
          </Link>
        </div>

        {/* COLUMNA 2: NOTICIAS SECUNDARIAS - ALINEACIÓN TOTAL */}
        <div className="lg:col-span-5 flex flex-col justify-center h-85">
          {secondaryPosts.map((post, index) => (
            <Link
              key={post.id}
              href={`/notas/${post.slug}`}
              className={`group flex items-center gap-4 flex-1 overflow-hidden
                ${index === 0 ? "pt-0" : "pt-2"} 
                ${index === secondaryPosts.length - 1 ? "pb-0" : "pb-2 border-b border-slate-100"}`}>
              {/* Imagen compacta */}
              <div className="relative w-24 h-16 md:w-38 md:h-full shrink-0 overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-opacity group-hover:opacity-80"
                />
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-[9px] font-black uppercase text-[#2f86cc] tracking-widest">
                  {post.category}
                </span>
                <h3 className="mt-1 text-sm md:text-[15px] font-bold leading-snug text-slate-900 group-hover:text-[#2f86cc] transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
