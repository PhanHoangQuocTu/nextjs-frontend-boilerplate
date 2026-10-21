'use client';

import { createContext, type PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { Theme } from '@/enums/enum';
import { applyTheme, DARK_MEDIA_QUERY, isTheme, resolveTheme, THEME_STORAGE_KEY } from '@/lib/theme';

interface ThemeContextValue {
  /** What the user picked: `light`, `dark` or `system`. */
  theme: Theme;
  /** What is actually applied. `undefined` until the client has mounted. */
  resolvedTheme: Theme.LIGHT | Theme.DARK | undefined;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: Theme.SYSTEM,
  resolvedTheme: undefined,
  setTheme: () => undefined,
});

/** Theme state for Client Components. Without a provider (tests, Storybook) it is a harmless no-op. */
export const useTheme = () => useContext(ThemeContext);

/**
 * Light / dark / system theme with persistence in `localStorage`.
 *
 * First-party on purpose: third-party providers render their init `<script>` from a Client Component,
 * which makes React 19 log "Encountered a script tag" whenever the locale layout remounts.
 * Here the script is rendered once by `[locale]/layout.tsx`.
 */
const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setThemeState] = useState<Theme>(Theme.SYSTEM);
  const [resolvedTheme, setResolvedTheme] = useState<ThemeContextValue['resolvedTheme']>();

  // Pick up the stored choice (and changes made in another tab).
  useEffect(() => {
    const read = () => {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      setThemeState(isTheme(stored) ? stored : Theme.SYSTEM);
    };
    const onStorage = (event: StorageEvent) => event.key === THEME_STORAGE_KEY && read();

    read();
    window.addEventListener('storage', onStorage);

    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Apply the theme, and follow the OS while it is `system`.
  useEffect(() => {
    const media = window.matchMedia(DARK_MEDIA_QUERY);
    const apply = () => {
      const resolved = resolveTheme(theme, media.matches);
      applyTheme(resolved);
      setResolvedTheme(resolved);
    };

    apply();
    media.addEventListener('change', apply);

    return () => media.removeEventListener('change', apply);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage may be blocked (private mode): the theme still applies for this session.
    }
  }, []);

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
