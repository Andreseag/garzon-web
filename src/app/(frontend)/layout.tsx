import { metadata as siteMetadata } from './metadata'
import { Arimo, Libre_Baskerville } from 'next/font/google'
import { Providers } from './providers'
import Script from 'next/script'
// @ts-ignore
import './styles.css'
import Logo from './components/Logo/Logo'
import TrendsBar from './components/TrendsBar/TrendsBar'
// import { RadioPlayer } from './components/RadioPlayer/RadioPlayer'
import Footer from './components/Footer/Footer'

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
  // Puedes usar una variable de entorno: process.env.NEXT_PUBLIC_GA_ID
  const GA_ID = 'G-0P0S3J7D41'

  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${arimo.variable} ${libreBaskerville.variable}`}
    >
      <head>
        {/* 1. Cargar el script de Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />

        {/* 2. Inicializar gtag */}
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="font-sans antialiased transition-colors duration-300"
      >
        <Providers>
          <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-7xl flex-col px-4 bg-white dark:bg-black sm:items-start">
              <Logo isHeader={true} />
              <TrendsBar />
              {children}
              {/* <RadioPlayer /> */}
            </main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
