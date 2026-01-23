import Link from "next/link";

export default function VideoGrid({ videos }: { videos: any[] }) {
  if (!videos || videos.length < 2) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 my-16">
      {/* Título de sección con Arimo (font-sans) */}
      <div className="flex items-center gap-2 mb-10 border-l-4 border-[#2f86cc] pl-5">
        <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-slate-900 dark:text-slate-100">
          Análisis en <span className="text-[#2f86cc]">Video</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {videos.slice(0, 2).map((video) => (
          <article key={video.id} className="group">
            {/* Contenedor YouTube con Adaptación Dark Mode */}
            <div className="relative aspect-video w-full overflow-hidden rounded-4xl bg-slate-100 dark:bg-slate-900 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#2f86cc]/20 border border-transparent dark:border-slate-800">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                title={video.title}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            </div>

            {/* Información del Video */}
            <div className="mt-6 px-2">
              {/* Categoría en Arimo (font-sans) */}
              <span className="inline-block text-[10px] font-sans font-black uppercase tracking-[0.2em] text-[#2f86cc] mb-3">
                {video.category}
              </span>

              <Link href={`/notas/${video.slug}`}>
                {/* Título en Serif para mayor peso editorial */}
                <h3 className="text-2xl font-serif font-bold leading-tight text-slate-900 dark:text-slate-100 group-hover:text-[#2f86cc] dark:group-hover:text-[#2f86cc] transition-colors line-clamp-2">
                  {video.title}
                </h3>
              </Link>

              {/* Indicador visual de "Ver ahora" en Arimo */}
              <div className="mt-4 flex items-center gap-2 text-xs font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                <svg
                  className="w-4 h-4 text-[#2f86cc]"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Reproducir Análisis
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
