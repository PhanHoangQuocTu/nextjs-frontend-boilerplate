import { useTranslationsServer } from '@/hooks/useTranslationsServer';

export const Footer = async () => {
  const { t } = await useTranslationsServer('common');

  return (
    <footer className='border-t py-6 text-center text-muted-foreground text-sm'>
      © {new Date().getFullYear()} {t('appName')}
    </footer>
  );
};
