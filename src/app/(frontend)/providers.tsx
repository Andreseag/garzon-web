'use client'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class" // Esto es lo que busca la clase .dark
      defaultTheme="light"
      enableSystem={false} // Para que no dependa del color del navegador/Windows
    >
      {children}
    </ThemeProvider>
  )
}
