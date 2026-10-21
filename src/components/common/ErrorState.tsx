import { AlertCircleIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorStateProps {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export const ErrorState = ({ title, description, action }: ErrorStateProps) => (
  <Alert variant='destructive'>
    <AlertCircleIcon />
    <AlertTitle>{title}</AlertTitle>
    {description ? <AlertDescription>{description}</AlertDescription> : null}
    {action ? <div className='col-start-2 mt-2'>{action}</div> : null}
  </Alert>
);
