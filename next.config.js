/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /* Remove X-Powered-By header — minor security + perf win */
  poweredByHeader: false,

  /* Compress responses with gzip */
  compress: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    /* Prefer AVIF → WebP → original. Next.js Image serves the best
       format the browser supports, dramatically reducing image weight. */
    formats: ['image/avif', 'image/webp'],

    /* Reasonable device sizes — avoids generating too many variants */
    deviceSizes: [640, 768, 1024, 1280, 1920],
    imageSizes: [64, 128, 256, 384],

    /* Minimise layout shift — keep optimised images cached for 7 days */
    minimumCacheTTL: 604800,
  },

  /* Security + performance headers on every response */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      /* Long-lived cache for static fonts */
      {
        source: '/fonts/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      /* Long-lived cache for all public images */
      {
        source: '/products/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
