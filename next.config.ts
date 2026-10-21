import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

import pkg from './package.json' with { type: 'json' };

const isProductionEnv = process.env.NEXT_PUBLIC_APP_ENV === 'production';

/**
 * Backend origin used by the `/proxy/*` rewrite: a zero-code alternative to Route Handlers.
 * The browser calls `/proxy/...` on this origin, so CORS never applies.
 */
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com').replace(/\/$/, '');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  env: { APP_VERSION: pkg.version },
  async rewrites() {
    return [{ source: '/proxy/:path*', destination: `${API_URL}/:path*` }];
  },
  async headers() {
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ];
    // Keep non-production environments out of search engines.
    const noindex = isProductionEnv ? [] : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }];

    return [{ source: '/:path*', headers: [...security, ...noindex] }];
  },
  images: {
    // Tighten `remotePatterns` to your CDN hosts before going to production.
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
