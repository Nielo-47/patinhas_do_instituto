import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.SUPABASE_DOMAIN!,
      },
    ], // Add your Supabase storage domain here
  },
};

export default nextConfig;
