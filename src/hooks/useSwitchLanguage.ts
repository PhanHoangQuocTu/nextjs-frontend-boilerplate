'use client';

import { useLocale } from 'next-intl';
import { useCallback, useState } from 'react';

import { usePathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

/**
 * Switch the active locale while staying on the current page (path, query and hash are kept).
 *
 * It performs a full page load on purpose. Changing the `[locale]` segment remounts the root layout,
 * and re-rendering its theme init `<script>` on the client makes React 19 log
 * "Encountered a script tag while rendering React component". A language change is rare, so a reload is cheap.
 */
export const useSwitchLanguage = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(false);

  const switchLanguage = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) return;

      setIsPending(true);
      const { search, hash } = window.location;
      // Always send the explicit prefix (`/en/...`): the proxy stores it in the NEXT_LOCALE cookie, then redirects to the clean URL.
      const path = pathname === '/' ? '' : pathname;
      window.location.assign(`/${nextLocale}${path}${search}${hash}`);
    },
    [locale, pathname]
  );

  return { locale, switchLanguage, isPending };
};
