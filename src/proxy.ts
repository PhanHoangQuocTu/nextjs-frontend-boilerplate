import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Next.js 16 renamed `middleware.ts` to `proxy.ts`. next-intl negotiates the locale and handles redirects here.
export default createMiddleware(routing);

export const config = {
  // Match full path segments so regular pages such as /apiary still get locale negotiation.
  matcher: ['/((?!(?:api|proxy|_next|_vercel|apple-icon|opengraph-image|twitter-image)(?:/|$)|.*\\..*).*)'],
};
