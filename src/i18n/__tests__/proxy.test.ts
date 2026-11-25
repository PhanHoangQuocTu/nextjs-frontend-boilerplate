import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server';

import { config } from '@/proxy';

vi.mock('next-intl/middleware', () => ({ default: vi.fn() }));

const matches = (url: string) => unstable_doesMiddlewareMatch({ config, nextConfig: {}, url });

describe('locale proxy matcher', () => {
  it.each(['/', '/health', '/vi/health', '/apiary', '/proxy-guides'])('negotiates locales for %s', (url) => {
    expect(matches(url)).toBe(true);
  });

  it.each([
    '/api',
    '/api/posts',
    '/proxy',
    '/proxy/posts',
    '/_next/static/file.js',
    '/sitemap.xml',
    '/opengraph-image',
  ])('skips endpoints and metadata outside locale negotiation for %s', (url) => {
    expect(matches(url)).toBe(false);
  });
});
