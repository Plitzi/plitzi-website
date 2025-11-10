import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  // turbopack: {
  //   root: '..',
  //   resolveAlias: {
  //     '@plitzi/plitzi-sdk': '../plitzi-workspace/apps/sdk'
  //     // react: require.resolve('react'),
  //     // 'react-dom': require.resolve('react-dom')
  //   }
  // },
  rewrites() {
    return Promise.resolve([
      {
        source: '/:path((?!node_modules|_next|static|favicon\\.ico).*)',
        destination: '/'
      }
    ]);
  }
};

export default nextConfig;
