import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Theme } from '@/enums/enum';
import { THEME_STORAGE_KEY, themeInitScript } from '@/lib/theme';
import ThemeProvider, { useTheme } from '../ThemeProvider';

const mockMatchMedia = (prefersDark: boolean) => {
  const listeners = new Set<() => void>();
  const media = {
    matches: prefersDark,
    addEventListener: (_: string, cb: () => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
  };
  vi.stubGlobal('matchMedia', () => media);

  return {
    change: (next: boolean) => {
      media.matches = next;
      for (const cb of listeners) cb();
    },
  };
};

const Probe = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <>
      <output data-testid='state'>{`${theme}:${resolvedTheme}`}</output>
      <button type='button' onClick={() => setTheme(Theme.DARK)}>
        dark
      </button>
      <button type='button' onClick={() => setTheme(Theme.SYSTEM)}>
        system
      </button>
    </>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
  });
  afterEach(() => vi.unstubAllGlobals());

  it('follows the OS while the theme is "system"', () => {
    const media = mockMatchMedia(false);
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );

    expect(screen.getByTestId('state')).toHaveTextContent('system:light');
    act(() => media.change(true));
    expect(screen.getByTestId('state')).toHaveTextContent('system:dark');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('persists an explicit choice and applies the dark class', async () => {
    mockMatchMedia(false);
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );

    await userEvent.click(screen.getByText('dark'));

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');

    await userEvent.click(screen.getByText('system'));
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('restores the stored theme on mount', () => {
    mockMatchMedia(false);
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );

    expect(screen.getByTestId('state')).toHaveTextContent('dark:dark');
  });

  it('is a no-op without a provider', () => {
    render(<Probe />);

    expect(screen.getByTestId('state')).toHaveTextContent('system:undefined');
  });

  it('ships an init script that reads the same storage key', () => {
    expect(themeInitScript).toContain(THEME_STORAGE_KEY);
  });
});
