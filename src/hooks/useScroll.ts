'use client';

import { useEffect } from 'react';

export function useScroll(handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      handler();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handler, enabled]);
}
