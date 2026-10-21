'use client';

import { RefreshCwIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { useHealthQuery } from '@/api/health';
import { ErrorState } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from '@/hooks';
import { DATE_FORMAT, formatDate, formatDuration } from '@/utils';
import { HEALTH_REFETCH_INTERVAL_SEC } from '../const';
import { StatusBadge } from './StatusBadge';

const Row = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className='flex items-center justify-between gap-4 border-b py-2 text-sm last:border-b-0'>
    <dt className='text-muted-foreground'>{label}</dt>
    <dd className='font-medium'>{value}</dd>
  </div>
);

export const HealthStatusCard = () => {
  const { t } = useTranslations('health');
  const { t: tc } = useTranslations('common');
  const { data, error, isLoading, isFetching, refetch, dataUpdatedAt } = useHealthQuery({
    refetchInterval: HEALTH_REFETCH_INTERVAL_SEC * 1000,
  });

  if (error && !data) {
    return (
      <ErrorState
        title={t('error')}
        description={error.message}
        action={
          <Button size='sm' variant='outline' onClick={() => refetch()}>
            {tc('actions.retry')}
          </Button>
        }
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('app.title')}</CardTitle>
        <CardDescription>{t('autoRefresh', { seconds: HEALTH_REFETCH_INTERVAL_SEC })}</CardDescription>
        <CardAction>
          <Button
            size='icon-sm'
            variant='outline'
            aria-label={tc('actions.refresh')}
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCwIcon className={isFetching ? 'animate-spin' : undefined} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <div className='space-y-3'>
            <Skeleton className='h-5 w-full' />
            <Skeleton className='h-5 w-full' />
            <Skeleton className='h-5 w-2/3' />
          </div>
        ) : (
          <dl>
            <Row label={t('statusLabel')} value={<StatusBadge label={t('status.ok')} />} />
            <Row label={t('app.environment')} value={data.environment} />
            <Row label={t('app.version')} value={data.version} />
            <Row label={t('app.uptime')} value={formatDuration(data.uptime)} />
            <Row label={t('app.latency')} value={`${data.latencyMs} ms`} />
            <Row label={t('app.checkedAt')} value={formatDate(dataUpdatedAt, DATE_FORMAT.TIME)} />
          </dl>
        )}
      </CardContent>
    </Card>
  );
};
