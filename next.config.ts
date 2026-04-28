import type { NextConfig } from 'next';

// SECURITY: defense-in-depth headers. CSP restricts XSS impact even if a sink is missed.
// HSTS forces HTTPS. X-Frame-Options blocks clickjacking unless explicitly framed.
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://cdn.plitzi.com",
      "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com",
      "font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://cdn.plitzi.com",
      "connect-src 'self' https://api-dev.plitzi.com https://server-dev.plitzi.com https://ssr-dev.plitzi.com",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-site' }
];

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // SECURITY: stop emitting `X-Powered-By: Next.js` to reduce framework fingerprinting
  // (companion to F2 framework banner removal in api-dev).
  poweredByHeader: false,
  /* config options here */
  // turbopack: {
  //   root: '..',
  //   resolveAlias: {
  //     '@plitzi/plitzi-sdk': '../plitzi-workspace/apps/sdk'
  //     // react: require.resolve('react'),
  //     // 'react-dom': require.resolve('react-dom')
  //   }
  // },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  },
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
