import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      // Puedes agregar más dominios aquí
      {
        protocol: "https",
        hostname: "tu-api-de-noticias.com",
      },
    ],
  },
};

export default nextConfig;
