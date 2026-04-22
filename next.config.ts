import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Tells Next.js to produce static files
  images: {
    unoptimized: true, // GitHub Pages doesn't support the Next.js Image Optimization API
  },
  // Replace 'portfolio' with your actual repository name
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',
};

export default nextConfig;
