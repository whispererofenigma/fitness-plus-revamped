import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['placehold.co'],
       remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-your-bucket-id.r2.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
