import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/',
      },
    ];
  }
};

export default nextConfig;
