import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  eslint: {
    // Esto permite que el build termine aunque haya errores de lint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Esto permite que el build termine aunque haya errores de tipos
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },

      // Si más adelante subes imágenes a Neon o S3, las agregarás aquí también
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    webpackConfig.cache = false
    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
