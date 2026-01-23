import TrendsBar from "./components/TrendsBar/TrendsBar";
import Logo from "./components/Logo/Logo";
import {
  NOTICIAS_DATA,
  POLITICA_DATA,
  ELECCIONES_DATA,
  VIDEO_POSTS,
  LATEST_NEWS_DATA,
  GALERY_EXAMPLE,
} from "./data/noticias";
import { COLUMNISTAS_DATA } from "./data/columnistas";
import FeaturedNewsGrid from "./components/FeaturedNewsGrid/FeaturedNewsGrid";
import TopicGrid from "./components/TopicGrid/TopicGrid";
import OpinionGrid from "./components/OpinionGrid/OpinionGrid";
import ElectionGrid from "./components/ElectionGrid/ElectionGrid";
import VideoGrid from "./components/VideoGrid/VideoGrid";
import LatestNewsGrid from "./components/LatestNewsGrid/LatestNewsGrid";
import Footer from "./components/Footer/Footer";
import NewsCarousel from "./components/NewsCarousel/NewsCarousel";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-7xl flex-col px-4 bg-white dark:bg-black sm:items-start">
        <Logo />

        <TrendsBar />

        <FeaturedNewsGrid posts={NOTICIAS_DATA} />

        <TopicGrid topicTitle="Politica" posts={POLITICA_DATA} />

        <OpinionGrid columnists={COLUMNISTAS_DATA} />

        <ElectionGrid posts={ELECCIONES_DATA} />

        <VideoGrid videos={VIDEO_POSTS} />

        <LatestNewsGrid posts={LATEST_NEWS_DATA} />

        <NewsCarousel images={GALERY_EXAMPLE} />

        <Footer />
      </main>
    </div>
  );
}
