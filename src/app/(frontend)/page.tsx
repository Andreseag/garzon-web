import FeaturedNewsServer from './components/FeaturedNewsServer/FeaturedNewsServer'
import PoderPublicoServer from './components/PoderPublicoServer/PoderPublicoServer'
import ScienceTechServer from './components/ScienceTechServer/ScienceTechServer'
import LensServer from './components/LensServer/LensServer'
import OpinionGridServer from './components/OpinionGridServer/OpinionGridServer'
import { ColoniasBanner } from './components/ColoniasBanner/ColoniasBanner'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <>
      <FeaturedNewsServer />

      {/* Banner promocional del Festival de Colonias */}
      {/* <ColoniasBanner /> */}

      <PoderPublicoServer />

      <OpinionGridServer />

      {/* <ElectionGrid posts={ELECCIONES_DATA} /> */}
      {/* <HoroscopeServer /> */}

      {/* <VideoGrid videos={VIDEO_POSTS} /> */}

      {/* <LatestNewsGrid posts={LATEST_NEWS_DATA} /> */}
      <ScienceTechServer />

      {/* <NewsShorts /> */}

      {/* <SpotifyPodcast
          spotifyUrl="https://open.spotify.com/embed/episode/3fPOH4Lv6x3wmrCwYSUom6"
          title="Garzón Podcast"
          description="Entrevistas exclusivas con los protagonistas de la noticia en el centro del Villanueva, Casanare."
        /> */}

      <LensServer />
    </>
  )
}
