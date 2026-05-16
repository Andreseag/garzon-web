import { metadata as siteMetadata } from './metadata'
import { Arimo, Libre_Baskerville } from 'next/font/google'
import { Providers } from './providers'
// @ts-ignore: Allow importing global CSS without type declarations
import './styles.css'
import Logo from './components/Logo/Logo'
import TrendsBar from './components/TrendsBar/TrendsBar'
import { RadioPlayer } from './components/RadioPlayer/RadioPlayer'

const arimo = Arimo({
  subsets: ['latin'],
  variable: '--font-arimo',
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-libre-baskerville',
  weight: ['400', '700'],
})

export const metadata = siteMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${arimo.variable} ${libreBaskerville.variable}`}
    >
      <body
        suppressHydrationWarning
        className="font-sans antialiased transition-colors duration-300"
      >
        <Providers>
          <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-7xl flex-col px-4 bg-white dark:bg-black sm:items-start">
              <Logo />
              <TrendsBar />
              {children}
              <RadioPlayer />
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
