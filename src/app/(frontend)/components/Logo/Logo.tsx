"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({
  width = 220,
  height = 80, // Ajustado a una proporción más realista para logos
  className = "my-8",
}: LogoProps) {
  const [mounted, setMounted] = useState(false);

  // Esperamos a que el componente monte para evitar discrepancias de tema en el servidor
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`flex justify-center items-center w-full transition-all duration-300 ${className}`}>
      <Link
        href="/"
        aria-label="Volver al inicio"
        className="relative block hover:opacity-90 transition-opacity">
        {/* Logo para Modo Claro */}
        <Image
          src="/logo-garzon.png"
          alt="Garzón Logo"
          width={width}
          height={height}
          priority
          // Si no ha montado, mostramos el de modo claro por defecto
          className={`object-contain transition-opacity duration-500 ${
            mounted ? "dark:hidden" : "block"
          }`}
        />

        {/* Logo para Modo Oscuro */}
        {mounted && (
          <Image
            src="/logo-garzon-white.png"
            alt="Garzón Logo"
            width={width}
            height={height}
            priority
            className="hidden object-contain dark:block transition-opacity duration-500"
          />
        )}
      </Link>
    </div>
  );
}
