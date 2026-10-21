'use client';

import { useTranslations } from '@/hooks';

import { usePostsQuery } from '@/api/posts';
import { ErrorState } from '@/components/common';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PROXY_POSTS_LIMIT } from '../const';

export const ProxyExampleCard = () => {
  const { t } = useTranslations('health.proxy');
  const { data, error, isLoading } = usePostsQuery({ page: 1, limit: PROXY_POSTS_LIMIT });

  const renderContent = () => {
    if (isLoading) return Array.from({ length: 3 }, (_, idx) => <Skeleton key={idx} className='h-5 w-full' />);
    if (error) return <ErrorState title={error.message} />;
    if (!data?.length) return <p className='text-muted-foreground text-sm'>{t('empty')}</p>;

    return (
      <ul className='divide-y text-sm'>
        {data.map((post) => (
          <li key={post.id} className='py-2'>
            <span className='mr-2 text-muted-foreground'>#{post.id}</span>
            {post.title}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        {renderContent()}
        <p className='text-muted-foreground text-xs'>{t('rewriteHint')}</p>
      </CardContent>
    </Card>
  );
};
