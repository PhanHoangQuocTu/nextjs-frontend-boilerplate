'use client';

import { useEffect, useRef } from 'react';

/** Attach the returned ref to a sentinel element at the end of a list; `onLoadMore` fires when it nears the viewport. */
export const useInfiniteScroll = (enabled: boolean, onLoadMore: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore();
      },
      { rootMargin: '200px' }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [enabled, onLoadMore]);

  return ref;
};
