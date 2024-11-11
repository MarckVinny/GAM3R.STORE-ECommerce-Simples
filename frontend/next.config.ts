import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // hostname: '**', //* Libera qualquer URL
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
}

export default nextConfig;
