import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Media, News, Columnist, Promotion } from '@/payload-types'
import { RichText } from '../../components/RichText/RichText'
import { GlobalPromoSlider } from '../../components/GlobalPromoSlider/GlobalPromoSlider'
// import { NewsAudioPlayer } from '../../components/NewsAudioPlayer/NewsAudioPlayer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  // Consultar la noticia y las promociones activas en paralelo
  const [{ docs }, promosRes] = await Promise.all([
    payload.find({
      collection: 'news',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    }),
    payload.find({
      collection: 'promotions',
      where: {
        isActive: { equals: true },
      },
    }),
  ])

  const news = docs[0] as News
  if (!news) return notFound()

  const promos = promosRes.docs as Promotion[]

  const relatedNews = await payload.find({
    collection: 'news',
    where: {
      and: [
        { category: { equals: news.category } },
        { id: { not_equals: news.id } }, // Excluimos la nota actual
      ],
    },
    limit: 3, // Solo 3 tarjetas
    sort: '-publishDate',
  })

  const featuredImage = news.featuredImage as Media
  const columnist = news.columnist as Columnist

  const formattedDate = new Date(news.publishDate).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Dividir el contenido de Lexical (news.content) a la mitad
  const contentRoot = (news.content as any)?.root
  const children = contentRoot?.children || []
  const middleIndex = Math.floor(children.length / 2)

  const firstHalfChildren = children.slice(0, middleIndex)
  const secondHalfChildren = children.slice(middleIndex)

  const firstHalfContent =
    firstHalfChildren.length > 0
      ? {
          ...news.content,
          root: { ...contentRoot, children: firstHalfChildren },
        }
      : null

  const secondHalfContent =
    secondHalfChildren.length > 0
      ? {
          ...news.content,
          root: { ...contentRoot, children: secondHalfChildren },
        }
      : news.content

  return (
    <>
      <article className="min-h-screen w-full bg-white dark:bg-slate-950 pb-20">
        {/* HEADER DE LA NOTICIA */}
        <header className="max-w-4xl mx-auto px-4 pt-6 md:pt-20 text-center">
          <div className="inline-block px-3 py-1 mb-4 text-[10px] font-black uppercase tracking-[0.2em] bg-[#2f86cc]/10 text-[#2f86cc] rounded-full">
            {news.category?.replace('-', ' ') ||
              (news.format === 'person' && 'Persona de la semana')}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-5xl font-sans font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1] mb-8">
            {news.title}
          </h1>

          <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 font-sans italic leading-relaxed mb-6 max-w-3xl mx-auto">
            "{news.excerpt}"
          </p>

          {/* METADATOS */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 border-y border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {columnist?.image ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                  <Image
                    src={
                      (columnist.image as Media).thumbnailURL ||
                      'https://res.cloudinary.com/dnjussrbs/image/upload/v1783439421/payload-media/img-3611_1783439421559.jpg'
                    }
                    alt={columnist.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                  <Image
                    src={
                      'https://res.cloudinary.com/dnjussrbs/image/upload/v1783439421/payload-media/img-3611_1783439421559.jpg'
                    }
                    alt={'Redacción Garzón'}
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
        <div className="max-w-6xl mx-auto px-4 my-6">
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
              {/* Primera mitad del contenido */}
              {firstHalfContent && <RichText content={firstHalfContent} />}

              {/* Slider de Promociones insertado exactamente a la mitad */}
              {promos.length > 0 && (
                <div className="my-10 not-prose">
                  <GlobalPromoSlider promos={promos} />
                </div>
              )}

              {/* Segunda mitad del contenido */}
              <RichText content={secondHalfContent} />
            </div>
          </div>
        </div>

        {/* SECCIÓN DE RELACIONADAS */}
        {relatedNews.docs.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 mt-20 pt-16 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white mb-8">
              Más en {news.category?.replace('-', ' ')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedNews.docs.map((related) => {
                const relatedImage = related.featuredImage as Media
                return (
                  <a key={related.id} href={`/notas/${related.slug}`} className="group block">
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                      <Image
                        src={relatedImage.cloudinary?.secure_url || relatedImage.url || ''}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-[#2f86cc] transition-colors">
                      {related.title}
                    </h4>
                  </a>
                )
              })}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
