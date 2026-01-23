import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({
  width = 280,
  height = 20,
  className = "my-8",
}: LogoProps) {
  return (
    <div className={`flex justify-center w-full ${className}`}>
      <Link href="/" aria-label="Volver al inicio">
        <Image
          src="/logo-garzon.png"
          alt="Garzón Logo"
          width={width}
          height={height}
          priority
          className="object-contain dark:hidden"
        />

        <Image
          src="/logo-garzon-white.png"
          alt="Garzón Logo"
          width={width}
          height={height}
          priority
          className="hidden object-contain dark:block"
        />
      </Link>
    </div>
  );
}
