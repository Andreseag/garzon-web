'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react' // npm install lucide-react
import { CategoryLabels, Category } from '@/constants/categories'

interface TrendTopic {
  id: string
  label: string
  slug: string
}

interface TrendsBarProps {
  topics?: TrendTopic[]
}

export const DEFAULT_TRENDS: TrendTopic[] = [
  {
    id: '1',
    label: CategoryLabels[Category.ULTIMA_HORA],
    slug: Category.ULTIMA_HORA,
  },
  {
    id: '2',
    label: CategoryLabels[Category.PODER_PUBLICO],
    slug: Category.PODER_PUBLICO,
  },
  {
    id: '3',
    label: CategoryLabels[Category.DEPORTES],
    slug: Category.DEPORTES,
  },
  {
    id: '4',
    label: CategoryLabels[Category.ECONOMIA],
    slug: Category.ECONOMIA,
  },
  {
    id: '5',
    label: CategoryLabels[Category.DENUNCIA_CIUDADANA],
    slug: Category.DENUNCIA_CIUDADANA,
  },
  {
    id: '6',
    label: CategoryLabels[Category.ANALISIS],
    slug: Category.ANALISIS,
  },
]
export default function TrendsBar({ topics = DEFAULT_TRENDS }: TrendsBarProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evita errores de hidratación (SSR vs Client)
  useEffect(() => setMounted(true), [])

  return (
    <nav
      className="trends border-y h-12 w-full border-gray-300 bg-white transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950"
      aria-label="Tendencias"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-4">
        {/* LADO IZQUIERDO: Tendencias */}
        <div className="flex items-center overflow-x-auto no-scrollbar py-1">
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
                  href={`/categoria/${topic.slug}`}
                  className="text-xs font-sans font-bold text-gray-700 transition-colors duration-200 hover:text-[#2f86cc] dark:text-slate-400 dark:hover:text-[#2f86cc]"
                >
                  #{topic.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* LADO DERECHO: Switch de Tema */}
        {/* <div className="flex items-center ml-4 pl-4 border-l border-gray-200 dark:border-slate-800">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-[#2f86cc] dark:hover:text-[#2f86cc] transition-all"
              aria-label="Cambiar modo de color">
              {theme === "dark" ? (
                <Sun size={14} strokeWidth={2.5} />
              ) : (
                <Moon size={14} strokeWidth={2.5} />
              )}
            </button>
          )}
        </div> */}
      </div>
    </nav>
  )
}
