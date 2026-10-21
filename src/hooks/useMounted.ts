'use client';

import { useEffect, useState } from 'react';

/** `false` during SSR and the first render, `true` after hydration. Use to avoid hydration mismatches. */
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted;
};
