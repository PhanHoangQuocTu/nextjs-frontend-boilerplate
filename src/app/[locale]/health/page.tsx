import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { MainLayout } from '@/components/layouts';
import { JsonLd } from '@/components/seo/JsonLd';
import { ROUTES } from '@/constants/routes';
import { useTranslationsServer } from '@/hooks/useTranslationsServer';
import { toLocale } from '@/i18n/routing';
import { breadcrumbJsonLd, buildMetadata, getAbsoluteUrl } from '@/lib/seo';
import Health from '@/modules/Health';
import type { PageProps } from '@/types/type';

type HealthPageProps = Pick<PageProps<{ locale: string }>, 'params'>;

export async function generateMetadata({ params }: HealthPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await useTranslationsServer('health', locale);

  return buildMetadata({
    locale: toLocale(locale),
    path: ROUTES.HEALTH,
    title: t('title'),
    description: t('description'),
    // Operational page: keep it out of search results.
    noIndex: true,
  });
}

export default async function HealthPage({ params }: HealthPageProps) {
  const { locale } = await params;
  const currentLocale = toLocale(locale);
  setRequestLocale(currentLocale);
  const [{ t }, { t: tc }] = await Promise.all([useTranslationsServer('health'), useTranslationsServer('common')]);

  return (
    <MainLayout>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tc('appName'), url: getAbsoluteUrl(currentLocale, ROUTES.HOME) },
          { name: t('title'), url: getAbsoluteUrl(currentLocale, ROUTES.HEALTH) },
        ])}
      />
      <Health />
    </MainLayout>
  );
}
