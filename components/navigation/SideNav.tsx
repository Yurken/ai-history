'use client';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useActiveSection } from '@/lib/hooks/useActiveSection';
import { sections } from '@/lib/data/sections';
import { cn } from '@/lib/utils/cn';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const sectionIds = sections.map(section => section.id);
const navigationLinks = [
  { href: '/', zh: '首页', en: 'Home' },
  { href: '/timeline', zh: '时间线', en: 'Timeline' },
  { href: '/knowledge', zh: '技术谱系', en: 'Technology tree' },
  { href: '/search', zh: '搜索', en: 'Search' },
];
const focusableSelector = 'a[href], button:not([disabled]), [tabindex="0"]';

export function SideNav({ locale }: { locale: string }) {
  const pathname = usePathname();
  const activeSection = useActiveSection(sectionIds, pathname === '/');
  const routeKey = `${locale}:${pathname}`;
  const [openRoute, setOpenRoute] = useState<string | null>(null);
  const isOpen = openRoute === routeKey;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const pendingChapterRef = useRef<string | null>(null);
  const isChinese = locale === 'zh';
  const closeMenu = () => setOpenRoute(null);
  // Reset the menu when navigation changes, including browser back/forward.
  if (openRoute !== null && openRoute !== routeKey) setOpenRoute(null);

  useEffect(() => {
    if (pathname !== '/') return;
    const chapterId = pendingChapterRef.current ?? window.location.hash.slice(1);
    pendingChapterRef.current = null;
    if (!sectionIds.includes(chapterId)) return;

    let observer: MutationObserver | undefined;
    const scrollToChapter = () => {
      const chapter = document.getElementById(chapterId);
      if (!chapter) return false;
      chapter.scrollIntoView({ block: 'start', behavior: 'instant' });
      return true;
    };
    const frame = window.requestAnimationFrame(() => {
      if (scrollToChapter()) return;
      // The shared layout can update before a streamed page mounts its chapters.
      observer = new MutationObserver(() => {
        if (scrollToChapter()) observer?.disconnect();
      });
      observer.observe(document.getElementById('main-content') ?? document.body, { childList: true, subtree: true });
    });
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname, locale]);

  useEffect(() => {
    // Match Tailwind's lg boundary exactly; CSS determines which nav is visible.
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setOpenRoute(null);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog?.querySelector<HTMLElement>(focusableSelector)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpenRoute(null);
        return;
      }
      if (event.key !== 'Tab' || !dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) {
        event.preventDefault();
        dialog.focus();
      } else if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      if (!window.matchMedia('(min-width: 1024px)').matches) trigger?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <nav aria-label={isChinese ? '主导航' : 'Main navigation'} className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-gray-200 bg-white dark:border-dark-700 dark:bg-dark-900 lg:flex">
        <div className="border-b border-gray-200 px-6 py-7 dark:border-dark-700">
          <Link href="/" className="text-xl font-bold tracking-tight text-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600 dark:text-primary-400">
            AI History
          </Link>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{isChinese ? '人工智能全史' : 'A history of artificial intelligence'}</p>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-5">
          <NavItems pathname={pathname} activeSection={activeSection} locale={locale} onChapterClick={id => { if (pathname !== '/') pendingChapterRef.current = id; }} />
        </div>
        <NavSettings locale={locale} />
      </nav>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpenRoute(current => current === routeKey ? null : routeKey)}
        aria-label={isChinese ? (isOpen ? '关闭导航' : '打开导航') : (isOpen ? 'Close navigation' : 'Open navigation')}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-700 text-white shadow-lg transition-colors hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 lg:hidden"
      >
        <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
          <path d={isOpen ? 'M6 18 18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
        </svg>
      </button>

      {isOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-dark-950/60" aria-hidden="true" onClick={closeMenu} />
          <div
            ref={dialogRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            tabIndex={-1}
            className="fixed bottom-24 right-4 z-50 flex max-h-[calc(100dvh-8rem)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-dark-700 dark:bg-dark-900"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3 dark:border-dark-700">
              <h2 id="mobile-navigation-title" className="font-semibold text-gray-900 dark:text-gray-100">{isChinese ? '浏览 AI 全史' : 'Explore AI History'}</h2>
              <button type="button" onClick={closeMenu} aria-label={isChinese ? '关闭导航' : 'Close navigation'} className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 dark:text-gray-300 dark:hover:bg-dark-800">
                <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18 18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <nav aria-label={isChinese ? '主导航' : 'Main navigation'} className="overflow-y-auto px-3 py-3">
              <NavItems pathname={pathname} activeSection={activeSection} locale={locale} onItemClick={closeMenu} onChapterClick={id => { if (pathname !== '/') pendingChapterRef.current = id; }} />
            </nav>
            <NavSettings locale={locale} onItemClick={closeMenu} />
          </div>
        </div>
      )}
    </>
  );
}

function NavItems({ pathname, activeSection, onItemClick, onChapterClick, locale }: { pathname: string; activeSection: string; onItemClick?: () => void; onChapterClick: (id: string) => void; locale: string }) {
  const isChinese = locale === 'zh';
  return (
    <>
      <ul className="space-y-1">
        {navigationLinks.map(link => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link href={link.href} onClick={onItemClick} aria-current={active ? 'page' : undefined} className={cn('flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600', active ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-800')}>
                {isChinese ? link.zh : link.en}
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mb-3 mt-7 px-3 text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400">{isChinese ? '历史章节' : 'CHAPTERS'}</p>
      <ul className="space-y-1">
        {sections.filter(section => section.id !== 'hero').map((section, index) => {
          const active = pathname === '/' && activeSection === section.id;
          return (
            <li key={section.id}>
              <Link href={`/#${section.id}`} onClick={event => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                onChapterClick(section.id);
                onItemClick?.();
              }} aria-current={active ? 'location' : undefined} className={cn('flex gap-3 rounded-lg px-3 py-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600', active ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-800')}>
                <span aria-hidden="true" className="pt-0.5 text-xs tabular-nums text-gray-400 dark:text-gray-500">{String(index + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block text-sm leading-snug">{isChinese ? section.title_zh : section.title_en}</span>
                  <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">{isChinese ? section.period_zh : section.period}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function NavSettings({ locale, onItemClick }: { locale: string; onItemClick?: () => void }) {
  return (
    <div className="shrink-0 border-t border-gray-200 px-3 py-3 dark:border-dark-700">
      <Suspense fallback={<div className="min-h-11" aria-busy="true" />}>
        <LanguageSwitcher locale={locale} onItemClick={onItemClick} />
      </Suspense>
      <ThemeToggle locale={locale} />
    </div>
  );
}

function LanguageSwitcher({ locale, onItemClick }: { locale: string; onItemClick?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const query = useSearchParams().toString();
  const [hash, setHash] = useState('');
  const suffix = `${query ? `?${query}` : ''}${hash}`;

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener('hashchange', updateHash);
    window.addEventListener('popstate', updateHash);
    return () => {
      window.removeEventListener('hashchange', updateHash);
      window.removeEventListener('popstate', updateHash);
    };
  }, [pathname]);

  return (
      <div className="flex items-center justify-between px-3 text-sm">
        <span className="text-gray-500 dark:text-gray-400">{locale === 'zh' ? '语言' : 'Language'}</span>
        <div className="flex gap-1">
          {(['zh', 'en'] as const).map(language => (
            <Link
              key={language}
              href={`${pathname}${suffix}`}
              locale={language}
              lang={language}
              aria-label={language === 'zh' ? '切换到中文' : 'Switch to English'}
              aria-current={locale === language ? 'true' : undefined}
              onClick={event => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                event.preventDefault();
                router.replace(`${pathname}${window.location.search}${window.location.hash}`, { locale: language });
                onItemClick?.();
              }}
              className={cn('inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 text-xs font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600', locale === language ? 'text-primary-700 dark:text-primary-300' : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-800')}
            >
              {language === 'zh' ? '中文' : 'EN'}
            </Link>
          ))}
        </div>
      </div>
  );
}
