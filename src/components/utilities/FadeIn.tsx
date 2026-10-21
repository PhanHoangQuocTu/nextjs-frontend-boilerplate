'use client';

import { motion } from 'framer-motion';
import type { ComponentProps } from 'react';

type FadeInProps = Omit<ComponentProps<typeof motion.div>, 'initial' | 'animate' | 'transition'> & {
  /** Rendered element. */
  as?: 'div' | 'section' | 'article' | 'ul' | 'li';
  delay?: number;
  duration?: number;
  /** Start offset in px (slides up while fading in). */
  y?: number;
};

/** Fade + slide-up on mount. Honours `prefers-reduced-motion` through framer-motion's `MotionConfig`. */
export const FadeIn = ({ as = 'div', delay = 0, duration = 0.4, y = 12, children, ...props }: FadeInProps) => {
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </Component>
  );
};
