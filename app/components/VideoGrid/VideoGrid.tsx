import Link from "next/link";

export default function VideoGrid({ videos }: { videos: any[] }) {
  if (!videos || videos.length < 2) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 my-12">
      {/* Título de sección minimalista */}
      <div className="flex items-center gap-2 mb-8 border-l-4 border-[#2f86cc] pl-4">
        <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">
          Análisis en <span className="text-[#2f86cc]">Video</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {videos.slice(0, 2).map((video) => (
          <article key={video.id} className="group">
            {/* Contenedor YouTube sin bordes */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-[#2f86cc]/10">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                title={video.title}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            </div>

            {/* Información de la Noticia */}
            <div className="mt-5">
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-[#2f86cc] mb-2">
                {video.category}
              </span>
              <Link href={`/notas/${video.slug}`}>
                <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-[#2f86cc] transition-colors line-clamp-2">
                  {video.title}
                </h3>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
