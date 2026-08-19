/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'superfan.in',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'superfan.in',
        pathname: '/**',
      },
    ],
    unoptimized: false,
  },
};

module.exports = nextConfig;
