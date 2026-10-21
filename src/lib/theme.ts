import { Theme } from '@/enums/enum';

export const THEME_STORAGE_KEY = 'theme';
export const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

export const isTheme = (value: unknown): value is Theme => Object.values(Theme).includes(value as Theme);

/** `system` follows the OS preference. */
export const resolveTheme = (theme: Theme, prefersDark: boolean): Theme.LIGHT | Theme.DARK => {
  if (theme === Theme.SYSTEM) return prefersDark ? Theme.DARK : Theme.LIGHT;

  return theme;
};

/** Toggle the `dark` class and `color-scheme` on `<html>`. */
export const applyTheme = (resolved: Theme.LIGHT | Theme.DARK) => {
  const root = document.documentElement;
  root.classList.toggle('dark', resolved === Theme.DARK);
  root.style.colorScheme = resolved;
};

/**
 * Runs before first paint (see `[locale]/layout.tsx`) so the page never flashes the wrong theme.
 * Keep it dependency-free: it is inlined as a string.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}')||'${Theme.SYSTEM}';var d=t==='${Theme.DARK}'||(t==='${Theme.SYSTEM}'&&window.matchMedia('${DARK_MEDIA_QUERY}').matches);var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'${Theme.DARK}':'${Theme.LIGHT}'}catch(e){}})()`;
