import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  label: string;
  /** `true` renders the healthy (green) style. */
  ok?: boolean;
}

export const StatusBadge = ({ label, ok = true }: StatusBadgeProps) => (
  <Badge
    variant='secondary'
    className={cn(
      'border-transparent',
      ok ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' : 'bg-red-500/15 text-red-700 dark:text-red-400'
    )}
  >
    <span className='size-1.5 rounded-full bg-current' aria-hidden />
    {label}
  </Badge>
);
