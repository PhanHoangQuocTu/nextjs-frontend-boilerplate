import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Next.js 16 renamed `middleware.ts` to `proxy.ts`. next-intl negotiates the locale and handles redirects here.
export default createMiddleware(routing);

// Auth guard template -- compose it with the intl proxy when you need protected routes:
//
// import { type NextRequest, NextResponse } from 'next/server';
// import { STORAGE_KEYS } from '@/constants/const';
//
// const intlProxy = createMiddleware(routing);
//
// export default function proxy(req: NextRequest) {
//   const isProtected = /^(\/[a-z]{2})?\/dashboard/.test(req.nextUrl.pathname);
//   const session = req.cookies.get(STORAGE_KEYS.SESSION)?.value;
//
//   if (isProtected && !session) return NextResponse.redirect(new URL('/login', req.url));
//
//   return intlProxy(req);
// }

export const config = {
  // Skip API routes, the /proxy rewrite, Next internals, metadata files and files with an extension.
  matcher: ['/((?!api|proxy|_next|_vercel|apple-icon|opengraph-image|twitter-image|manifest.webmanifest|.*\\..*).*)'],
};
