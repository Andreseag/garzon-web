'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface LogoProps {
  width?: number
  height?: number
  className?: string
  isHeader?: boolean
}

export default function Logo({
  width = 220,
  height = 80, // Ajustado a una proporción más realista para logos
  className = 'my-3',
  isHeader = false,
}: LogoProps) {
  const [mounted, setMounted] = useState(false)

  const responsiveLogoClass = isHeader
    ? 'max-w-[160px] md:max-w-[240px]'
    : 'max-w-[140px] md:max-w-[220px]'

  // Esperamos a que el componente monte para evitar discrepancias de tema en el servidor
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={`flex justify-center items-center w-full transition-all duration-300 ${className}`}
    >
      <Link
        href="/"
        aria-label="Volver al inicio"
        className="relative block hover:opacity-90 transition-opacity"
      >
        {/* Logo para Modo Claro */}
        <Image
          src="/logo-garzon.png"
          alt="Garzón Logo"
          width={width}
          height={height}
          sizes="(max-width: 767px) 140px, 220px"
          priority
          className={`object-contain transition-opacity duration-500 ${
            mounted ? 'dark:hidden' : 'block'
          } ${responsiveLogoClass}`}
        />

        {/* Logo para Modo Oscuro */}
        {mounted && (
          <Image
            src="/logo-garzon-white.png"
            alt="Garzón Logo"
            width={width}
            height={height}
            sizes="(max-width: 767px) 140px, 220px"
            priority
            className={`hidden object-contain dark:block transition-opacity duration-500 ${responsiveLogoClass}`}
          />
        )}
      </Link>
    </div>
  )
}
