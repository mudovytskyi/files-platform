/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@file-platform/ui', '@file-platform/shared-lib'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      include: [/packages\/ui/, /packages\/shared-lib/],
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    });
    return config;
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3001',
  },
};

module.exports = nextConfig;
