import { COLUMNISTAS_DATA } from './data/columnistas'
import FeaturedNewsGrid from './components/FeaturedNewsGrid/FeaturedNewsGrid'
import ElectionGrid from './components/ElectionGrid/ElectionGrid'
import VideoGrid from './components/VideoGrid/VideoGrid'
import LatestNewsGrid from './components/LatestNewsGrid/LatestNewsGrid'
import Footer from './components/Footer/Footer'
import NewsCarousel from './components/NewsCarousel/NewsCarousel'
import SpotifyPodcast from './components/SpotifyPodcast/SpotifyPodcast'
import NewsShorts from './components/NewsShorts/NewsShorts'
import FeaturedNewsServer from './components/FeaturedNewsServer/FeaturedNewsServer'
import PoderPublicoServer from './components/PoderPublicoServer/PoderPublicoServer'
import HoroscopeServer from './components/HoroscopeServer/HoroscopeServer'
import ScienceTechServer from './components/ScienceTechServer/ScienceTechServer'
import LensServer from './components/LensServer/LensServer'
import OpinionGridServer from './components/OpinionGridServer/OpinionGridServer'
import { DefaultModal } from './components/DefaultModal/DefaultModal'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <>
      {/* Modal que aparece por defecto al cargar */}
      {/* <DefaultModal /> */}

      <FeaturedNewsServer />

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
