import type { FC, HTMLAttributes } from 'react';

/**
 * Wraps interactive controls (checkboxes, buttons, selects) placed inside a clickable row or card
 * so their click / key events don't bubble up and trigger the parent's handler (e.g. row expand).
 */
export const StopPropagation: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div
    {...props}
    onClick={(e) => e.stopPropagation()}
    onKeyUp={(e) => e.stopPropagation()}
    onKeyDown={(e) => e.stopPropagation()}
  >
    {children}
  </div>
);
