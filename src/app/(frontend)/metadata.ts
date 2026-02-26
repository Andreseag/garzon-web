import type { Metadata } from "next";

export const metadata: Metadata = {
  // Título base y plantilla para páginas internas
  title: {
    default: "Garzón | Periodismo Independiente y Noticias en Vivo",
    template: "%s | Garzón",
  },
  description:
    "Portal informativo líder en análisis político, actualidad nacional y noticias de última hora. Información veraz desde el corazón de la noticia.",

  // Palabras clave para buscadores
  keywords: [
    "noticias",
    "periodismo",
    "actualidad",
    "elecciones 2026",
    "análisis político",
    "Garzón",
  ],

  // Configuración de Open Graph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: "Garzón | Información que Transforma",
    description:
      "Mantente al día con el análisis más profundo y las noticias más relevantes.",
    url: "https://garzon-web.vercel.app/", // Cambia por tu dominio real
    siteName: "Garzón",
    images: [
      {
        url: "/logo-garzon.png", // Imagen de 1200x630px en tu carpeta public
        width: 1200,
        height: 630,
        alt: "Garzón - Portal Informativo",
      },
    ],
    locale: "es_CO",
    type: "website",
  },

  // Configuración para X (Twitter)
  twitter: {
    card: "summary_large_image",
    title: "Garzón | Noticias de Última Hora",
    description:
      "El análisis que necesitas para entender la realidad nacional.",
    images: ["/logo-garzon.png"],
    creator: "@GarzonNoticias",
  },

  // Robots y rastreo
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Favicons y manifiesto
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};
