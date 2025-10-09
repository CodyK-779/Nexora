import type { NextConfig } from "next";
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com", "avatars.githubusercontent.com", "randomuser.me"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
