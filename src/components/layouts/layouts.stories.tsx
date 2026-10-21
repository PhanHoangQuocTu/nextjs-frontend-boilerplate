import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcherView } from './LanguageSwitcher';

const meta = { title: 'Layouts/Switchers', parameters: { layout: 'centered' } } satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Language: Story = {
  render: () => {
    const [locale, setLocale] = useState('en');

    return <LanguageSwitcherView locale={locale} onChange={setLocale} />;
  },
};

/** The theme itself is driven by the Storybook toolbar; the switcher drives the first-party ThemeProvider in the app. */
export const Theme: Story = { render: () => <ThemeSwitcher /> };
