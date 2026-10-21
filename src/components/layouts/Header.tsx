import { useTranslationsServer } from '@/hooks/useTranslationsServer';

import { ROUTES } from '@/constants/routes';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Header = async () => {
  const { t } = await useTranslationsServer('common');

  return (
    <header className='sticky top-0 z-40 border-b bg-background/80 backdrop-blur'>
      <div className='mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4'>
        <Link href={ROUTES.HOME} className='font-semibold tracking-tight'>
          {t('appName')}
        </Link>
        <div className='flex items-center gap-2'>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};
