// import PlitziPlugin from '@plitzi/plitzi-webpack';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  // webpack: (config, options) => {
  //   if (!options.isServer) {
  //     config.plugins = [...config.plugins, new PlitziPlugin({ isHost: true })];
  //   }

  //   return config;
  // }
  rewrites() {
    return Promise.resolve([
      // Rewrite everything else to use `pages/index`
      {
        source: '/:path*',
        destination: '/'
      }
    ]);
  }
};

export default nextConfig;
