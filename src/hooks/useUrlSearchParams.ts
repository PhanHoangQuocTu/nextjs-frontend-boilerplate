'use client';

import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

import { usePathname, useRouter } from '@/i18n/navigation';

/** Read and update the URL query string (locale-aware, keeps other params untouched). */
export const useUrlSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setParams = useCallback(
    (updates: Record<string, string | number | null | undefined>, mode: 'push' | 'replace' = 'replace') => {
      const next = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === undefined || value === '') next.delete(key);
        else next.set(key, String(value));
      }

      const query = next.toString();
      router[mode](query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return { searchParams, setParams };
};
