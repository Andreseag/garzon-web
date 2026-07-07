// import { metadata as siteMetadata } from './metadata'
// import { Arimo, Libre_Baskerville } from 'next/font/google'
// import { Providers } from './providers'
// // @ts-ignore: Allow importing global CSS without type declarations
// import './styles.css'
// import Logo from './components/Logo/Logo'
// import TrendsBar from './components/TrendsBar/TrendsBar'
// import { RadioPlayer } from './components/RadioPlayer/RadioPlayer'

// const arimo = Arimo({
//   subsets: ['latin'],
//   variable: '--font-arimo',
// })

// const libreBaskerville = Libre_Baskerville({
//   subsets: ['latin'],
//   variable: '--font-libre-baskerville',
//   weight: ['400', '700'],
// })

// export const metadata = siteMetadata

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html
//       lang="es"
//       suppressHydrationWarning
//       className={`${arimo.variable} ${libreBaskerville.variable}`}
//     >
//       <body
//         suppressHydrationWarning
//         className="font-sans antialiased transition-colors duration-300"
//       >
//         <Providers>
//           <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//             <main className="flex min-h-screen w-full max-w-7xl flex-col px-4 bg-white dark:bg-black sm:items-start">
//               <Logo />
//               <TrendsBar />
//               {children}
//               <RadioPlayer />
//             </main>
//           </div>
//         </Providers>
//       </body>
//     </html>
//   )
// }

import { metadata as siteMetadata } from './metadata'
import { Arimo, Libre_Baskerville } from 'next/font/google'
import { Providers } from './providers'
import Script from 'next/script' // 1. Importa el componente Script
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
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${arimo.variable} ${libreBaskerville.variable}`}
    >
      <head>
        {/* 2. Script de GTM en el head */}
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}
      </head>
      <body
        suppressHydrationWarning
        className="font-sans antialiased transition-colors duration-300"
      >
        {/* 3. Fallback para usuarios sin JS */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

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
