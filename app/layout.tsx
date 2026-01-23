import { metadata as siteMetadata } from "./metadata";
import { Arimo, Libre_Baskerville } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

// Arimo para cuerpo, categorías, botones y meta-datos
const arimo = Arimo({
  subsets: ["latin"],
  variable: "--font-arimo",
});

// Libre Baskerville para darle autoridad a los titulares
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  weight: ["400", "700"],
});

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="es"
      className={`${arimo.variable} ${libreBaskerville.variable}`}>
      <body
        className="font-sans antialiased text-slate-900 bg-white"
        suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
