/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@file-platform/ui', '@file-platform/shared-lib'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/files/**',
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3001',
  },
};

module.exports = nextConfig;
