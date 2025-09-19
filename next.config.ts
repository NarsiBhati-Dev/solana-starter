import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Export a fully static site to avoid serverless functions on Vercel
  output: 'export',
  images: {
    // Next Image optimization requires a server; disable for static export
    unoptimized: true,
  },
};

export default nextConfig;
