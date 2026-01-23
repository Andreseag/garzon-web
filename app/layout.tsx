import type { Metadata } from "next";
import { Arimo, Libre_Baskerville } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Noticias Huila | Elecciones 2026",
  description: "Portal informativo con Arimo y Libre Baskerville",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${arimo.variable} ${libreBaskerville.variable}`}>
      <body
        className="font-sans antialiased text-slate-900 bg-white"
        suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
