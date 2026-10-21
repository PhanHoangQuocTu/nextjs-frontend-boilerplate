'use client';

import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string, defaultValue = false) => {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);

    onChange();
    mql.addEventListener('change', onChange);

    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};
