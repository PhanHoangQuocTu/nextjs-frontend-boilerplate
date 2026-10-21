import { siteConfig } from '@/config/site';
import { OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from '@/constants/const';
import { createOgImage } from '@/lib/og-image';

export const alt = siteConfig.name;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

// One locale-agnostic image: it lives outside `[locale]`, so its URL never needs a locale prefix (no redirect for crawlers).
export default function Image() {
  return createOgImage({ title: siteConfig.name, description: siteConfig.description });
}
