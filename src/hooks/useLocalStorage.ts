'use client';

import { useCallback, useEffect, useState } from 'react';

import { safeJsonParse } from '@/utils/object';

/** `useState` persisted in `localStorage` (SSR-safe: starts with `initialValue`, syncs after mount). */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(safeJsonParse<T>(window.localStorage.getItem(key), initialValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- read once per key
  }, [key, initialValue]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (prev: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // Storage may be full or blocked (private mode): keep the in-memory value.
        }
        return resolved;
      });
    },
    [key]
  );

  const remove = useCallback(() => {
    window.localStorage.removeItem(key);
    setValue(initialValue);
  }, [key, initialValue]);

  return [value, set, remove] as const;
}
