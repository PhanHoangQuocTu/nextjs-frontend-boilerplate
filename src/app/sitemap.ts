import type { MetadataRoute } from 'next';

import { INDEXABLE_ROUTES } from '@/constants/routes';
import { routing } from '@/i18n/routing';
import { getAbsoluteUrl, getLanguageAlternates } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: getAbsoluteUrl(locale, route),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '/' ? 1 : 0.7,
      alternates: { languages: getLanguageAlternates(route) },
    }))
  );
}
