import Link from "next/link";

// Definimos la estructura de un tópico
interface TrendTopic {
  id: string;
  label: string;
  slug: string;
}

// Props del componente (por si quieres pasarle los datos desde una página)
interface TrendsBarProps {
  topics?: TrendTopic[];
}

// Data de ejemplo (esto vendría de una API o base de datos)
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
      className="trends border-y h-12 w-full border-y-gray-300 bg-white"
      aria-label="Tendencias">
      <div className="trends__container max-w-7xl mx-auto flex items-center h-full px-4 overflow-x-auto no-scrollbar">
        {/* Título de la sección con TS, estilizado con Tailwind */}
        <span className="flex items-center text-[10px] font-bold uppercase tracking-tighter text-blue-600 mr-4 whitespace-nowrap">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          Tendencias
        </span>

        <ul className="flex items-center gap-5">
          {topics.map((topic) => (
            <li key={topic.id} className="whitespace-nowrap">
              <Link
                href={`/tema/${topic.slug}`}
                className="text-xs font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200">
                #{topic.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
