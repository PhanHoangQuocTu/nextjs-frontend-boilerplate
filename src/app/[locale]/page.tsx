import { ArrowRightIcon } from 'lucide-react';
import type { Metadata } from 'next';

import { MainLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/utilities';
import { ROUTES } from '@/constants/routes';
import { useTranslationsServer } from '@/hooks/useTranslationsServer';
import { Link } from '@/i18n/navigation';
import { toLocale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types/type';

type HomePageProps = Pick<PageProps<{ locale: string }>, 'params'>;

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await useTranslationsServer('common.seo', locale);

  return buildMetadata({
    locale: toLocale(locale),
    path: ROUTES.HOME,
    title: { absolute: t('defaultTitle') },
    description: t('description'),
  });
}

export default async function HomePage() {
  const { t } = await useTranslationsServer('common.home');

  return (
    <MainLayout>
      <FadeIn as='section' className='mx-auto flex max-w-2xl flex-col items-center gap-6 py-16 text-center'>
        <h1 className='font-semibold text-4xl tracking-tight'>{t('title')}</h1>
        <p className='text-muted-foreground'>{t('description')}</p>
        <Button asChild>
          <Link href={ROUTES.HEALTH}>
            {t('openHealth')}
            <ArrowRightIcon />
          </Link>
        </Button>
      </FadeIn>
    </MainLayout>
  );
}
