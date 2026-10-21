import { env, isProductionEnv } from '@/constants/env';

export type SiteConfig = typeof siteConfig;

export { isProductionEnv };

/**
 * Locale-independent site facts (manifest, fallbacks).
 * Localised copy lives in `src/messages/<locale>/common.json` under `seo`.
 */
export const siteConfig = {
  appUrl: env.APP_URL,
  name: 'Frontend Boilerplate',
  shortName: 'Boilerplate',
  description: 'Production-ready Next.js frontend boilerplate.',
};
