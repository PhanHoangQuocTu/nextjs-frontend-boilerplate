'use client';

import { useEffect, useRef, useState } from 'react';

/** Emit `value` at most once per `interval` ms. */
export const useThrottle = <T>(value: T, interval = 300): T => {
  const [throttled, setThrottled] = useState(value);
  const lastRun = useRef(Date.now());

  useEffect(() => {
    const remaining = interval - (Date.now() - lastRun.current);
    const timer = setTimeout(
      () => {
        lastRun.current = Date.now();
        setThrottled(value);
      },
      Math.max(remaining, 0)
    );

    return () => clearTimeout(timer);
  }, [value, interval]);

  return throttled;
};
