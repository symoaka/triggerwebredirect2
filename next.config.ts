import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // This forces the entire app to use the runtime Cloudflare requires
    runtime: 'edge',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://discord.gg/triggeraim',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
