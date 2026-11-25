import type { MetadataRoute } from 'next';

import { env, isProductionEnv } from '@/constants/env';

export default function robots(): MetadataRoute.Robots {
  if (!isProductionEnv) return { rules: { userAgent: '*', disallow: '/' } };

  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/proxy/'] },
    sitemap: `${env.APP_URL}/sitemap.xml`,
  };
}
