/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  onDemandEntries: {
    maxInactiveAge: 24 * 60 * 1000,
    pagesBufferLength: 1,
  },
  experimental: {
    isrMemoryCacheSize: 0,
  },
}

export default nextConfig
