import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { siteConfig } from '@/config/site';
import '../styles/globals.css';

type Props = {
  children: ReactNode;
};

// Resolves relative URLs of root-level metadata files (opengraph-image, twitter-image).
export const metadata: Metadata = { metadataBase: new URL(siteConfig.appUrl) };

// The `<html>` element lives in `[locale]/layout.tsx` so it can carry the `lang` attribute.
export default function RootLayout({ children }: Props) {
  return children;
}
