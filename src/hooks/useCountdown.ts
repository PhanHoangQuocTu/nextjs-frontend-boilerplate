'use client';

import { useEffect, useState } from 'react';

const getTimeLeft = (targetTime: string | number | Date) => Math.max(new Date(targetTime).getTime() - Date.now(), 0);

/** Milliseconds left until `targetTime` (ticks every second, stops at 0). */
export const useCountdown = (targetTime: string | number | Date) => {
  const [left, setLeft] = useState(() => getTimeLeft(targetTime));

  useEffect(() => {
    setLeft(getTimeLeft(targetTime));
    const interval = setInterval(() => setLeft(getTimeLeft(targetTime)), 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return left;
};
