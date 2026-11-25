import { useTranslationsServer } from '@/hooks/useTranslationsServer';

export const Footer = async () => {
  const { t } = await useTranslationsServer('common');

  return (
    <footer className='text-muted-foreground border-t py-6 text-center text-sm'>
      © {new Date().getFullYear()} {t('appName')}
    </footer>
  );
};
