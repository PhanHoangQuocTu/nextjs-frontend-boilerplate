import type { MetadataRoute } from 'next';

import { isProductionEnv } from '@/constants/env';
import { INDEXABLE_ROUTES } from '@/constants/routes';
import { routing } from '@/i18n/routing';
import { getAbsoluteUrl, getLanguageAlternates } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionEnv) return [];

  return INDEXABLE_ROUTES.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: getAbsoluteUrl(locale, route),
      alternates: { languages: getLanguageAlternates(route) },
    }))
  );
}
