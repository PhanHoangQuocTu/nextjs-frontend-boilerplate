'use client';

import { CheckIcon, LanguagesIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSwitchLanguage, useTranslations } from '@/hooks';
import { LOCALE_LABELS, LOCALES, type Locale } from '@/i18n/routing';

interface LanguageSwitcherViewProps {
  locale: string;
  onChange: (locale: Locale) => void;
  disabled?: boolean;
}

/** Presentational part (no router access), so it can be rendered in Storybook and tests. */
export const LanguageSwitcherView = ({ locale, onChange, disabled }: LanguageSwitcherViewProps) => {
  const { t } = useTranslations('common');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' disabled={disabled} aria-label={t('language')}>
          <LanguagesIcon />
          <span className='uppercase'>{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {LOCALES.map((item) => (
          <DropdownMenuItem key={item} onSelect={() => onChange(item)}>
            {LOCALE_LABELS[item]}
            {item === locale ? <CheckIcon className='ml-auto' /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const LanguageSwitcher = () => {
  const { locale, switchLanguage, isPending } = useSwitchLanguage();

  return <LanguageSwitcherView locale={locale} onChange={switchLanguage} disabled={isPending} />;
};
