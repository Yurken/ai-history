'use client';

import { createContext, useContext, useEffect, useSyncExternalStore } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';
const storageKey = 'ai-history-theme';
const themeChangeEvent = 'ai-history-theme-change';
let sessionPreference: ThemePreference | null = null;

interface ThemeContextValue {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // The system preference still works when browser storage is unavailable.
  }
  return 'system';
}

function getPreference() {
  return sessionPreference ?? readStoredPreference();
}

function subscribe(onChange: () => void) {
  const syncStoredTheme = (event: StorageEvent) => {
    if (event.key !== storageKey && event.key !== null) return;
    sessionPreference = readStoredPreference();
    onChange();
  };
  window.addEventListener(themeChangeEvent, onChange);
  window.addEventListener('storage', syncStoredTheme);
  return () => {
    window.removeEventListener(themeChangeEvent, onChange);
    window.removeEventListener('storage', syncStoredTheme);
  };
}

function applyTheme(theme: ThemePreference) {
  const dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
}

function setTheme(nextTheme: ThemePreference) {
  sessionPreference = nextTheme;
  try {
    if (nextTheme === 'system') localStorage.removeItem(storageKey);
    else localStorage.setItem(storageKey, nextTheme);
  } catch {
    // Keep the selected theme for this session even without persistence.
  }
  applyTheme(nextTheme);
  window.dispatchEvent(new Event(themeChangeEvent));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getPreference, () => 'system' as const);

  useEffect(() => {
    applyTheme(theme);
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const syncSystemTheme = () => applyTheme(theme);
    media.addEventListener('change', syncSystemTheme);
    return () => media.removeEventListener('change', syncSystemTheme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
