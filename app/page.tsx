import Image from "next/image";
import TrendsBar from "./components/TrendsBar/TrendsBar";
import Logo from "./components/Logo/Logo";
import { NOTICIAS_DATA, POLITICA_DATA } from "./data/noticias";
import { COLUMNISTAS_DATA } from "./data/columnistas";
import FeaturedNewsGrid from "./components/FeaturedNewsGrid/FeaturedNewsGrid";
import TopicGrid from "./components/TopicGrid/TopicGrid";
import OpinionGrid from "./components/OpinionGrid/OpinionGrid";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-6xl flex-col px-4 bg-white dark:bg-black sm:items-start">
        <Logo />

        <TrendsBar />

        <FeaturedNewsGrid posts={NOTICIAS_DATA} />

        <TopicGrid topicTitle="Politica" posts={POLITICA_DATA} />

        <OpinionGrid columnists={COLUMNISTAS_DATA} />
      </main>
    </div>
  );
}
