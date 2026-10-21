'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type CopyFn = (text?: string) => Promise<boolean>;

const RESET_DELAY_MS = 2000;

/** Copy text to the clipboard. Falls back to `execCommand` on insecure origins. */
export function useCopy(resetDelay = RESET_DELAY_MS): [boolean, CopyFn] {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const copy = useCallback<CopyFn>(
    async (textToCopy) => {
      if (!textToCopy) return false;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
      } catch {
        return false;
      }

      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), resetDelay);
      return true;
    },
    [resetDelay]
  );

  return [copied, copy];
}
