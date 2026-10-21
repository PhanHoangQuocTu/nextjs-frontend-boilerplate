'use client';

import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';

import { useTheme } from '@/components/providers/ThemeProvider';
import { useTranslations } from '@/hooks';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Theme } from '@/enums/enum';

export const ThemeSwitcher = () => {
  const { t } = useTranslations('common.theme');
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon-sm' aria-label={t('label')}>
          <SunIcon className='dark:hidden' />
          <MoonIcon className='hidden dark:block' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onSelect={() => setTheme(Theme.LIGHT)}>
          <SunIcon /> {t('light')}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme(Theme.DARK)}>
          <MoonIcon /> {t('dark')}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme(Theme.SYSTEM)}>
          <MonitorIcon /> {t('system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
