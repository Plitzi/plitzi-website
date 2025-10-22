import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  // webpack: (config, options) => {
  //   return config;
  // }
  rewrites() {
    return Promise.resolve([
      // Rewrite everything else to use `pages/index`
      { source: '/:path*', destination: '/' }
    ]);
  }
};

export default nextConfig;
