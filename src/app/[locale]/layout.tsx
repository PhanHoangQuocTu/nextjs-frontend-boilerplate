import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import { JsonLd } from '@/components/seo/JsonLd';
import { fontMono, fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import { useTranslationsServer } from '@/hooks/useTranslationsServer';
import { routing, toLocale } from '@/i18n/routing';
import { themeInitScript } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { webSiteJsonLd } from '@/lib/seo';
import type { LayoutProps } from '@/types/type';
import Providers from './providers';
import '../../styles/globals.css';

export async function generateMetadata({ params }: Pick<LayoutProps<{ locale: string }>, 'params'>): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await useTranslationsServer('common.seo', locale);

  return {
    metadataBase: new URL(siteConfig.appUrl),
    applicationName: t('siteName'),
    // Pages override `title`; `%s` is replaced with their own title.
    title: { default: t('defaultTitle'), template: `%s | ${t('siteName')}` },
    description: t('description'),
    formatDetection: { email: false, address: false, telephone: false },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<{ locale: string }>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const { t } = await useTranslationsServer('common.seo', locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Sets the theme class before first paint (no flash). */}
        <Script id='theme-init' strategy='beforeInteractive'>
          {themeInitScript}
        </Script>
      </head>
      <body className={cn('bg-background font-sans antialiased', fontSans.variable, fontMono.variable)}>
        <JsonLd
          data={webSiteJsonLd({ locale: toLocale(locale), name: t('siteName'), description: t('description') })}
        />
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
