import { metadata as siteMetadata } from './metadata'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Arimo, Libre_Baskerville } from 'next/font/google'
import { Providers } from './providers'
import Script from 'next/script'
// @ts-ignore
import './styles.css'
import Logo from './components/Logo/Logo'
import TrendsBar from './components/TrendsBar/TrendsBar'
// import { RadioPlayer } from './components/RadioPlayer/RadioPlayer'
import Footer from './components/Footer/Footer'
import { GlobalPromoSlider } from './components/GlobalPromoSlider/GlobalPromoSlider'
import { DefaultModal } from './components/DefaultModal/DefaultModal'
import { Analytics } from '@vercel/analytics/next'

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Puedes usar una variable de entorno: process.env.NEXT_PUBLIC_GA_ID
  const GA_ID = 'G-0P0S3J7D41'

  const payload = await getPayload({ config: configPromise })

  // Consultar las promociones activas desde la base de datos
  const { docs: promos } = await payload.find({
    collection: 'promotions',
    where: {
      isActive: { equals: true },
    },
  })

  // Detectar automáticamente si el festival está activo evaluando las promociones cargadas
  const isFestivalActive = false

  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${arimo.variable} ${libreBaskerville.variable} ${isFestivalActive ? 'theme-colonias' : ''}`}
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
              <Analytics />
              <DefaultModal />

              {/* SLIDER DE PUBLICIDAD: Ubicado en la parte superior absoluta, sobre el logo/header */}
              <GlobalPromoSlider promos={promos} />

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
