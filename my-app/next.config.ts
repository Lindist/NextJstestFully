import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tenor.com',
        port: '',
        pathname: '/th/**',
      },
    ],
  },/* config options here */
};

export default nextConfig;
