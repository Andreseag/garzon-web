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
  if (!posts || posts.length < 3) return null;

  const mainPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);

  return (
    <section className="max-w-7xl mx-auto my-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* COLUMNA 1: NOTICIA PRINCIPAL */}
        <div className="lg:col-span-8">
          <Link
            href={`/notas/${mainPost.slug}`}
            className="group relative block overflow-hidden rounded-xl bg-slate-900 h-full min-h-112.5">
            <Image
              src={mainPost.image}
              alt={mainPost.title}
              fill
              className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90"
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
            />
            {/* Gradiente sutilmente azulado usando tu color de marca con transparencia */}
            <div className="absolute inset-0 bg-linear-to-t from-[#2f86cc]/90 via-slate-900/40 to-transparent" />

            <div className="absolute bottom-0 p-6 md:p-10">
              {/* Badge con tu color principal #2f86cc */}
              <span className="mb-4 inline-block bg-[#2f86cc] px-3 py-1 text-xs font-bold uppercase tracking-widest text-white rounded-sm">
                {mainPost.category}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold leading-tight text-white group-hover:text-blue-50 transition-colors">
                {mainPost.title}
              </h2>
              <p className="mt-4 hidden max-w-2xl text-sm md:text-base text-slate-200 line-clamp-2 md:block">
                {mainPost.excerpt}
              </p>
            </div>
          </Link>
        </div>

        {/* COLUMNA 2: NOTICIAS SECUNDARIAS */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {secondaryPosts.map((post) => (
            <Link
              key={post.id}
              href={`/notas/${post.slug}`}
              className="group flex flex-col flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-[#2f86cc]/50">
              <div className="relative flex-1 min-h-40 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
              <div className="p-4 bg-white">
                {/* Texto de categoría con el color #2f86cc */}
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2f86cc]">
                  {post.category}
                </span>
                <h3 className="mt-1 text-base font-bold leading-snug text-slate-900 group-hover:text-[#2f86cc] transition-colors line-clamp-2">
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
