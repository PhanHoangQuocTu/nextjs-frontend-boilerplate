'use client';

import { useTranslations } from '@/hooks';

import { ErrorState } from '@/components/common';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useTranslations('common');

  return (
    <div className='mx-auto max-w-xl p-8'>
      <ErrorState
        title={t('error.title')}
        description={error.message || t('error.description')}
        action={
          <Button size='sm' variant='outline' onClick={reset}>
            {t('actions.retry')}
          </Button>
        }
      />
    </div>
  );
}
