"use client";

import React, { useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Play, X, Eye } from "lucide-react";

interface ShortVideo {
  id: string;
  url: string;
  title: string;
  views: string;
  category: string;
}

const SHORTS_DATA: ShortVideo[] = [
  {
    id: "1",
    url: "https://res.cloudinary.com/demo/video/upload/q_auto/sea_turtle.mp4",
    title: "Reporte: Así avanza la jornada de vacunación en el Huila",
    views: "2.4k",
    category: "SALUD",
  },
  {
    id: "2",
    url: "https://res.cloudinary.com/demo/video/upload/so_2,eo_10/elephants.mp4",
    title: "Naturaleza: Avistamiento de especies en la represa",
    views: "1.1k",
    category: "AMBIENTE",
  },
  {
    id: "3",
    url: "https://res.cloudinary.com/demo/video/upload/q_auto/sea_turtle.mp4",
    title: "Turismo: Los destinos más visitados esta semana",
    views: "4.2k",
    category: "TURISMO",
  },
  {
    id: "4",
    url: "https://res.cloudinary.com/demo/video/upload/so_5/dog.mp4",
    title: "Mascotas: Jornada de adopción en el parque central",
    views: "900",
    category: "SOCIAL",
  },
  {
    id: "5",
    url: "https://res.cloudinary.com/demo/video/upload/q_auto/sea_turtle.mp4",
    title: "Reporte: Así avanza la jornada de vacunación en el Huila",
    views: "2.4k",
    category: "SALUD",
  },
  {
    id: "6",
    url: "https://res.cloudinary.com/demo/video/upload/so_2,eo_10/elephants.mp4",
    title: "Naturaleza: Avistamiento de especies en la represa",
    views: "1.1k",
    category: "AMBIENTE",
  },
  {
    id: "7",
    url: "https://res.cloudinary.com/demo/video/upload/q_auto/sea_turtle.mp4",
    title: "Turismo: Los destinos más visitados esta semana",
    views: "4.2k",
    category: "TURISMO",
  },
  {
    id: "8",
    url: "https://res.cloudinary.com/demo/video/upload/so_5/dog.mp4",
    title: "Mascotas: Jornada de adopción en el parque central",
    views: "900",
    category: "SOCIAL",
  },
];

export default function NewsShorts() {
  const [emblaRef] = useEmblaCarousel({ align: "start", dragFree: true });
  const [selectedVideo, setSelectedVideo] = useState<ShortVideo | null>(null);

  return (
    // Agregamos overflow-hidden a la sección para que nada se escape del ancho de pantalla
    <section className="max-w-7xl mx-auto px-4 my-16 overflow-hidden">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-2 h-8 bg-[#2f86cc] inline-block shadow-[0_0_10px_rgba(47,134,204,0.5)]"></span>
        <h2 className="text-2xl font-sans font-black uppercase tracking-tighter text-slate-900 dark:text-white">
          Garzón en Segundos
        </h2>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        {/* Cambiamos gap-5 por un margen negativo para manejar el espaciado internamente */}
        <div className="flex -ml-5">
          {SHORTS_DATA.map((short) => (
            <div
              key={short.id}
              // AJUSTE CLAVE: 80% del ancho en mobile, 280px fijo en desktop.
              // pl-5 crea el espacio entre videos sin desbordar.
              className="flex-[0_0_80%] sm:flex-[0_0_280px] pl-5 min-w-0">
              <ShortCard
                short={short}
                onClick={() => setSelectedVideo(short)}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[100] bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-6 right-6 text-slate-900 dark:text-white p-2 hover:bg-[#2f86cc]/10 rounded-full transition-all z-[110]">
            <X size={40} strokeWidth={1} />
          </button>

          <div className="relative w-full max-w-[400px] aspect-9/16 bg-black rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl">
            <video
              src={selectedVideo.url}
              className="w-full h-full object-cover"
              controls
              autoPlay
            />
            <div className="absolute bottom-0 left-0 p-8 w-full bg-linear-to-t from-black/90 to-transparent">
              <span className="text-[#2f86cc] font-sans font-black text-[10px] tracking-widest uppercase mb-2 block">
                {selectedVideo.category}
              </span>
              <h3 className="text-white font-sans font-bold text-xl leading-tight">
                {selectedVideo.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ShortCard({
  short,
  onClick,
}: {
  short: ShortVideo;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      // Eliminamos el flex-basis de aquí porque ya lo maneja el div padre en el map
      className="relative aspect-9/16 rounded-4xl overflow-hidden bg-slate-100 dark:bg-slate-900 group cursor-pointer border border-transparent hover:border-[#2f86cc] transition-all duration-300"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      onClick={onClick}>
      <video
        ref={videoRef}
        src={short.url}
        muted
        loop
        playsInline
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#2f86cc] text-white text-[9px] font-sans font-black px-2 py-0.5 rounded-sm uppercase tracking-widest">
            {short.category}
          </span>
          <div className="flex items-center gap-1 text-white/80 font-sans text-[10px] font-bold">
            <Eye size={12} /> {short.views}
          </div>
        </div>
        <h3 className="text-white font-sans font-bold text-sm leading-snug group-hover:text-[#2f86cc] transition-colors line-clamp-2">
          {short.title}
        </h3>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white border border-white/30">
          <Play fill="white" size={24} />
        </div>
      </div>
    </div>
  );
}
