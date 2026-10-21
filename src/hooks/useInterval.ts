'use client';

import { useEffect, useRef } from 'react';

/** Declarative `setInterval`. Pass `null` as delay to pause. */
export const useInterval = (callback: () => void, delay: number | null) => {
  const saved = useRef(callback);

  useEffect(() => {
    saved.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => saved.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
};
