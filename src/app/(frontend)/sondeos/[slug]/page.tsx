import { getPayload } from 'payload'
import config from '@payload-config'
import PoliticalPoll from '@/app/(frontend)/components/PoliticalPoll/PoliticalPoll'
import { notFound } from 'next/navigation'
import { Media } from '@/payload-types'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function PollPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const pollsQuery = await payload.find({
    collection: 'polls' as any,
    where: {
      slug: { equals: slug },
      isActive: { equals: true },
    },
    limit: 1,
  })

  const poll = pollsQuery.docs[0]

  if (!poll) {
    notFound()
  }

  // Extraer la URL de la imagen principal del sondeo
  const pollImg = poll.image as Media
  const pollImageUrl = pollImg?.cloudinary?.secure_url || pollImg?.url

  const formattedOptions = poll.options.map((opt: any) => ({
    id: opt.id,
    text: opt.text,
    partyOrSubtitle: opt.partyOrSubtitle,
    image:
      opt.image && typeof opt.image === 'object'
        ? {
            url: (opt.image as Media)?.cloudinary?.secure_url || (opt.image as Media)?.url,
            alt: opt.text,
          }
        : undefined,
    votes: opt.votes || 0,
  }))

  return (
    <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 py-12">
      <div className="mx-auto px-4 mb-6 text-center">
        <span className="text-xs font-sans font-bold uppercase tracking-widest text-primary">
          Sección Electoral
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mt-1">
          Barómetro Político y Sondeos
        </h1>
      </div>

      <PoliticalPoll
        pollId={poll.id}
        question={poll.title}
        imageUrl={pollImageUrl ?? undefined}
        options={formattedOptions}
        totalVotesInitial={poll.totalVotes || 0}
      />
    </main>
  )
}
