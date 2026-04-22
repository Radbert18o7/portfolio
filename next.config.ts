const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',
  // Fix for the root directory warning:
  experimental: {
    turbo: {
      root: '.',
    },
  },
};