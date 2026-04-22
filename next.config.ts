import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',

  experimental: {
    serverActions: {},
  },
};

export default nextConfig;