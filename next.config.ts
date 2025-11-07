import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  // turbopack: {
  //   resolveAlias: {
  //     react: require.resolve('react'),
  //     'react-dom': require.resolve('react-dom')
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
