import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a0a0a',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any', purpose: 'any' },
      { src: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  };
}
