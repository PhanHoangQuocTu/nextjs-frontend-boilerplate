import { z } from 'zod';

import { AppEnv } from '@/enums/enum';

const emptyToUndefined = (value: string | undefined) => (value === '' ? undefined : value);

const envSchema = z.object({
  APP_ENV: z.enum(AppEnv).default(AppEnv.DEVELOPMENT),
  /** Public origin of this app. Used for canonical URLs, sitemap and Open Graph. */
  APP_URL: z.string().default('http://localhost:3000'),
  /** Backend origin the BFF route handlers and the `/proxy/*` rewrite forward to. */
  API_URL: z.string().default('https://jsonplaceholder.typicode.com'),
  /** Injected by `next.config.ts` from package.json. */
  APP_VERSION: z.string().default('0.0.0'),
});

/**
 * Typed, validated environment.
 *
 * Next.js only inlines `NEXT_PUBLIC_*` values on a literal `process.env.NAME` access,
 * so every variable is listed explicitly instead of spreading `process.env`.
 */
export const env = envSchema.parse({
  APP_ENV: emptyToUndefined(process.env.NEXT_PUBLIC_APP_ENV),
  APP_URL: emptyToUndefined(process.env.NEXT_PUBLIC_APP_URL)?.replace(/\/$/, ''),
  API_URL: emptyToUndefined(process.env.NEXT_PUBLIC_API_URL)?.replace(/\/$/, ''),
  APP_VERSION: emptyToUndefined(process.env.APP_VERSION),
});

export const isProductionEnv = env.APP_ENV === AppEnv.PRODUCTION;
export const isDevelopmentEnv = env.APP_ENV === AppEnv.DEVELOPMENT;
export const isServer = typeof window === 'undefined';
