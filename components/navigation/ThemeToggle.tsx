'use client';

import { ThemePreference, useTheme } from '@/components/providers/ThemeProvider';

const preferences: ThemePreference[] = ['system', 'light', 'dark'];
const labels = {
  zh: { system: '跟随系统', light: '浅色', dark: '深色' },
  en: { system: 'System', light: 'Light', dark: 'Dark' },
};

export function ThemeToggle({ locale }: { locale: string }) {
  const { theme, setTheme } = useTheme();
  const copy = locale === 'zh' ? labels.zh : labels.en;
  const nextTheme = preferences[(preferences.indexOf(theme) + 1) % preferences.length];

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={locale === 'zh' ? `主题：${copy[theme]}。切换为${copy[nextTheme]}` : `Theme: ${copy[theme]}. Switch to ${copy[nextTheme]}`}
      className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:text-gray-300 dark:hover:bg-dark-800"
    >
      <span>{locale === 'zh' ? '外观' : 'Appearance'}</span>
      <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
          {theme === 'system' ? <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></> : theme === 'light' ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : <path d="M20.5 14.5A9 9 0 0 1 9.5 3.5a9 9 0 1 0 11 11Z" />}
        </svg>
        {copy[theme]}
      </span>
    </button>
  );
}
