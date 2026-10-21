import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export const PageHeader = ({ title, description, actions, className }: PageHeaderProps) => (
  <div className={cn('flex flex-wrap items-start justify-between gap-4', className)}>
    <div className='space-y-1'>
      <h1 className='font-semibold text-2xl tracking-tight'>{title}</h1>
      {description ? <p className='text-muted-foreground text-sm'>{description}</p> : null}
    </div>
    {actions ? <div className='flex items-center gap-2'>{actions}</div> : null}
  </div>
);
