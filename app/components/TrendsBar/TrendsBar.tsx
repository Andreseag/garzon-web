import Link from "next/link";

interface TrendTopic {
  id: string;
  label: string;
  slug: string;
}

interface TrendsBarProps {
  topics?: TrendTopic[];
}

const DEFAULT_TRENDS: TrendTopic[] = [
  { id: "1", label: "Dólar hoy", slug: "dolar-hoy" },
  { id: "2", label: "Elecciones 2026", slug: "elecciones-2026" },
  { id: "3", label: "IA en vivo", slug: "ia-noticias" },
  { id: "4", label: "Clima", slug: "clima-actual" },
  { id: "5", label: "Copa Libertadores", slug: "copa-libertadores" },
  { id: "6", label: "Reforma Salud", slug: "reforma-salud" },
];

export default function TrendsBar({ topics = DEFAULT_TRENDS }: TrendsBarProps) {
  return (
    <nav
      className="trends border-y h-12 w-full border-gray-300 bg-white transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950"
      aria-label="Tendencias">
      <div className="trends__container max-w-7xl mx-auto flex items-center h-full px-4 overflow-x-auto no-scrollbar">
        {/* Etiqueta "Tendencias" - El azul #2f86cc destaca bien en ambos modos */}
        <span className="flex items-center text-[10px] font-sans font-black uppercase tracking-widest text-[#2f86cc] mr-6 whitespace-nowrap">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2f86cc] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2f86cc]"></span>
          </span>
          Tendencias
        </span>

        <ul className="flex items-center gap-6">
          {topics.map((topic) => (
            <li key={topic.id} className="whitespace-nowrap">
              <Link
                href={`/tema/${topic.slug}`}
                className="text-xs font-sans font-bold text-gray-700 transition-colors duration-200 hover:text-[#2f86cc] dark:text-slate-400 dark:hover:text-[#2f86cc]">
                #{topic.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
