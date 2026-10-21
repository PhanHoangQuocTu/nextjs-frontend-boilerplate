'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCopy } from '@/hooks';

export const CopyButton = ({ value, label = 'Copy' }: { value: string; label?: string }) => {
  const [copied, copy] = useCopy();

  return (
    <Button type='button' variant='ghost' size='icon-sm' aria-label={label} onClick={() => copy(value)}>
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
};
