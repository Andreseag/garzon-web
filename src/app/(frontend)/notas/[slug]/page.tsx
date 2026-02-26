import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Media, News, Columnist } from '@/payload-types'
import { RichText } from '../../components/RichText/RichText'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'news',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  const news = docs[0] as News
  if (!news) return notFound()

  const featuredImage = news.featuredImage as Media
  const columnist = news.columnist as Columnist

  const formattedDate = new Date(news.publishDate).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      {/* HEADER DE LA NOTICIA */}
      <header className="max-w-4xl mx-auto px-4 pt-12 md:pt-20 text-center">
        <div className="inline-block px-3 py-1 mb-6 text-[10px] font-black uppercase tracking-[0.2em] bg-[#2f86cc]/10 text-[#2f86cc] rounded-full">
          {news.category?.replace('-', ' ')}
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-sans font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1] mb-8">
          {news.title}
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-sans italic leading-relaxed mb-10 max-w-3xl mx-auto">
          "{news.excerpt}"
        </p>

        {/* METADATOS */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 border-y border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            {columnist?.image && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                <Image
                  src={(columnist.image as Media).thumbnailURL || ''}
                  alt={columnist.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                {columnist?.name || news.newAuthor}
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
                {columnist?.specialty || 'Redacción Garzón Web'}
              </p>
            </div>
          </div>
          <span className="hidden md:block text-slate-300">•</span>
          <time className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {formattedDate}
          </time>
        </div>
      </header>

      {/* IMAGEN DESTACADA */}
      <div className="max-w-6xl mx-auto px-4 my-12">
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={featuredImage.cloudinary?.secure_url || featuredImage.url || ''}
            alt={news.title}
            fill
            priority
            className="object-cover"
          />
        </div>
        {featuredImage.alt && (
          <p className="mt-4 text-center text-xs text-slate-400 italic">— {featuredImage.alt}</p>
        )}
      </div>

      {/* CUERPO DE LA NOTICIA */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 lg:col-start-3">
          <div
            className="prose prose-lg prose-slate dark:prose-invert max-w-none 
            prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase 
            prose-p:leading-relaxed prose-p:text-slate-700 dark:prose-p:text-slate-300
            prose-a:text-[#2f86cc] hover:prose-a:underline"
          >
            {/* Renderizador de Lexical */}
            <RichText content={news.content} />
          </div>

          {/* FIRMA AL FINAL */}
          {/* <footer className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
              {columnist?.image && (
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                  <Image
                    src={(columnist.image as Media).thumbnailURL || ''}
                    alt={columnist.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                  {columnist?.name || news.newAuthor}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                  {columnist?.bio || 'Colaborador especializado en Garzón Web.'}
                </p>
              </div>
            </div>
          </footer> */}
        </div>
      </div>
    </article>
  )
}
