'use client'

import React from 'react'
import { Mic2, ExternalLink } from 'lucide-react'

interface SpotifyPodcastProps {
  spotifyUrl: string // URL de compartir de Spotify
  title?: string
  description?: string
}

export default function SpotifyPodcast({
  spotifyUrl,
  title = 'Garzón al Oído',
  description = 'Escucha las noticias más importantes y el análisis de la jornada en nuestro podcast diario.',
}: SpotifyPodcastProps) {
  // Función para convertir URL normal de Spotify en URL de Embed
  // const getEmbedUrl = (url: string) => {
  //   return url.replace("open.spotify.com/", "open.spotify.com/embed/");
  // };

  // const embedUrl = getEmbedUrl(spotifyUrl);

  return (
    <section className="max-w-7xl mx-auto px-4 my-8">
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-4xl p-6 md:p-10 border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Lado Izquierdo: Información del Podcast */}
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2f86cc]/10 text-[#2f86cc] dark:bg-[#2f86cc]/20">
              <Mic2 size={16} />
              <span className="text-xs font-sans font-black uppercase tracking-widest">
                Podcast Destacado
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">
              {title}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 font-sans text-base leading-relaxed max-w-lg">
              {description}
            </p>

            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#2f86cc] font-sans font-bold text-sm hover:underline"
            >
              Seguir en Spotify <ExternalLink size={14} />
            </a>
          </div>

          {/* Lado Derecho: Reproductor de Spotify */}
          <div className="w-full lg:w-100 shadow-2xl rounded-xl overflow-hidden bg-transparent">
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: '12px' }}
              src={`${spotifyUrl}?utm_source=generator&theme=0`} // theme=0 ayuda a la integración oscura
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
            {/* <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/embed/episode/3fPOH4Lv6x3wmrCwYSUom6/video?utm_source=generator"
              src="https://open.spotify.com/embed/embed/embed/episode/3fPOH4Lv6x3wmrCwYSUom6/video?utm_source=generator"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"></iframe> */}
          </div>
        </div>
      </div>
    </section>
  )
}
