import { withThemeByClassName } from '@storybook/addon-themes';
import type { Decorator, Preview } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { useState } from 'react';

import { TooltipProvider } from '../src/components/ui/tooltip';
import { messages } from '../src/messages';
// @ts-expect-error
import '../src/styles/globals.css';

/** Provides i18n, React Query and tooltips so any component renders like it does in the app. */
const withProviders: Decorator = (Story, context) => {
  const locale = (context.globals.locale ?? 'en') as keyof typeof messages;
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false } } }));

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className='font-sans text-foreground antialiased'>
            <Story />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
};

const preview: Preview = {
  decorators: [withThemeByClassName({ themes: { light: '', dark: 'dark' }, defaultTheme: 'light' }), withProviders],
  globalTypes: {
    locale: {
      description: 'Locale',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'vi', title: 'Tiếng Việt' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { locale: 'en' },
  parameters: {
    layout: 'centered',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'todo' },
  },
  tags: ['autodocs'],
};

export default preview;
