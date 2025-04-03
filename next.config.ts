/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  experimental: {
    // Enable streaming responses
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Enable optimized cache handling
    isrMemoryCacheSize: 50,  // Increase ISR cache size
  },
  // Configure cache patterns
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/portfolio',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, stale-while-revalidate=600', // 1 min cache, 10 min stale
          },
        ],
      },
      {
        source: '/portfolio/:repoName*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, stale-while-revalidate=3600', // 5 min cache, 1 hour stale
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
