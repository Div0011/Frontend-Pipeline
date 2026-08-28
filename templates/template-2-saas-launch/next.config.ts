import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      'three/addons': 'three/examples/jsm',
    },
  },
};

export default nextConfig;
