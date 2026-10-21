'use client';

import { useCallback, useState } from 'react';

export const useToggle = (initial = false) => {
  const [value, setValue] = useState(initial);

  const toggle = useCallback((next?: boolean) => setValue((prev) => (typeof next === 'boolean' ? next : !prev)), []);

  return [value, toggle] as const;
};
