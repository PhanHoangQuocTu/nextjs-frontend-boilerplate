import type { Metadata } from 'next';

import { MainLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useTranslationsServer } from '@/hooks/useTranslationsServer';
import { Link } from '@/i18n/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await useTranslationsServer('common.notFound');

  return { title: t('title'), robots: { index: false, follow: false } };
}

export default async function NotFound() {
  const { t } = await useTranslationsServer('common');

  return (
    <MainLayout>
      <section className='flex flex-col items-center gap-4 py-24 text-center'>
        <p className='font-semibold text-6xl tracking-tight'>404</p>
        <h1 className='font-semibold text-xl'>{t('notFound.title')}</h1>
        <p className='text-muted-foreground text-sm'>{t('notFound.description')}</p>
        <Button asChild>
          <Link href={ROUTES.HOME}>{t('actions.backHome')}</Link>
        </Button>
      </section>
    </MainLayout>
  );
}
