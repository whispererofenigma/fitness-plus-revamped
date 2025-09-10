import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // remotePatterns is the modern, recommended way to whitelist image sources.
    // We have removed the older 'domains' array to avoid conflicts.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        // This is the specific hostname from your R2 bucket.
        hostname: 'pub-32361a86652b4a0f95ba4bed9f014ed0.r2.dev',
      },
      {
        protocol: 'https',
        // This is the specific hostname from your R2 bucket.
        hostname: 'fitness-plus-revamped.vercel.app',
      },
    ],
  },
};

export default nextConfig;
