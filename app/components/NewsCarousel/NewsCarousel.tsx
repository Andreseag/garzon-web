"use client";

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Camera, User } from "lucide-react";

interface NewsImage {
  url: string;
  caption: string;
  credit: string;
  photographer: string; // Nuevo campo para el nombre del autor
}

interface NewsCarouselProps {
  images: NewsImage[];
  sectionTitle?: string;
}

export default function NewsCarouselFullWidth({
  images,
  sectionTitle = "El lente de Garzón",
}: NewsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = React.useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = React.useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  return (
    <section className="relative w-full my-16 group">
      {/* Título de la Sección */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="text-2xl font-sans font-black uppercase tracking-tighter text-slate-900 dark:text-slate-100 flex items-center gap-3">
          <span className="w-2 h-8 bg-[#2f86cc] inline-block"></span>
          {sectionTitle}
        </h2>
      </div>

      <div className="relative w-full">
        <div className="overflow-hidden bg-slate-900 shadow-2xl" ref={emblaRef}>
          <div className="flex">
            {images.map((img, index) => (
              <div className="relative flex-[0_0_100%] min-w-0" key={index}>
                <div className="relative h-[40vh] md:h-[50vh] min-h-[350px] max-h-[550px] w-full">
                  <Image
                    src={img.url}
                    alt={img.caption}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                </div>

                {/* Información de la fotografía con Autor */}
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-10">
                  <div className="max-w-7xl mx-auto">
                    <div className="max-w-2xl bg-black/40 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                      <p className="font-sans text-white text-sm md:text-base leading-snug mb-4 line-clamp-2">
                        {img.caption}
                      </p>

                      <div className="flex flex-wrap items-center gap-y-2 gap-x-6 border-t border-white/10 pt-3">
                        {/* Fotógrafo */}
                        <div className="flex items-center gap-2 text-white font-sans text-[10px] font-bold uppercase tracking-widest">
                          <User size={12} className="text-[#2f86cc]" />
                          <span>Por: {img.photographer}</span>
                        </div>

                        {/* Agencia / Medio */}
                        <div className="flex items-center gap-2 text-slate-300 font-sans text-[10px] font-bold uppercase tracking-widest">
                          <Camera size={12} className="text-slate-400" />
                          <span>{img.credit}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controles y Contador (Se mantienen igual) */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 pointer-events-none">
          <button
            onClick={scrollPrev}
            className="pointer-events-auto p-3 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10 hover:bg-[#2f86cc] transition-all opacity-0 group-hover:opacity-100">
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="pointer-events-auto p-3 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10 hover:bg-[#2f86cc] transition-all opacity-0 group-hover:opacity-100">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="absolute top-6 right-6 md:right-12 bg-black/60 px-3 py-1 rounded-md border border-white/10">
          <span className="text-white font-sans text-[10px] font-black tracking-tighter italic">
            GALERÍA | {images.length} FOTOS
          </span>
        </div>
      </div>
    </section>
  );
}
