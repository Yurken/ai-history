'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { useSearchResults } from './useSearchResults';

interface SearchBoxProps {
  placeholder?: string;
  initialQuery?: string;
  showSuggestions?: boolean;
}

export function SearchBox({ placeholder, initialQuery = '', showSuggestions = true }: SearchBoxProps) {
  const t = useTranslations('search');
  const locale = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const { results, status, retry } = useSearchResults(showSuggestions ? debouncedQuery : '', 8);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const resultsId = `${inputId}-results`;
  const isWaiting = query.trim() !== debouncedQuery.trim();
  const isSearching = isWaiting || status === 'loading';
  const showResults = showSuggestions && isOpen && Boolean(query.trim());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <form
        role="search"
        className="flex items-stretch gap-2"
        onSubmit={event => {
          event.preventDefault();
          setIsOpen(false);
          router.push({ pathname: '/search', query: query.trim() ? { q: query.trim() } : {} });
        }}
        onKeyDown={event => {
          if (event.key === 'Escape') setIsOpen(false);
        }}
      >
        <label htmlFor={inputId} className="sr-only">{t('label')}</label>
        <div className="relative min-w-0 flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg aria-hidden="true" className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id={inputId}
            type="search"
            name="q"
            value={query}
            autoComplete="off"
            onChange={event => {
              setQuery(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            aria-controls={showResults ? resultsId : undefined}
            placeholder={placeholder || t('placeholder')}
            className={cn(
              'w-full rounded-2xl py-4 pl-12 pr-4',
              'bg-white dark:bg-dark-800 border-2 border-gray-200 dark:border-dark-700',
              'focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none',
              'transition-colors duration-200 text-gray-900 dark:text-white placeholder:text-gray-400'
            )}
          />
        </div>
        <button
          type="submit"
          className="shrink-0 rounded-2xl bg-primary-600 px-5 font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          {t('submit')}
        </button>
      </form>

      {showResults && (
        <section
          id={resultsId}
          aria-label={t('results')}
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-dark-700 dark:bg-dark-900"
        >
          {isSearching ? (
            <p role="status" className="p-6 text-center text-gray-500 dark:text-gray-400">{t('loading')}</p>
          ) : status === 'error' ? (
            <div className="p-6 text-center">
              <p role="alert" className="text-gray-600 dark:text-gray-400">{t('loadError')}</p>
              <button type="button" onClick={retry} className="mt-3 font-medium text-primary-600 hover:underline dark:text-primary-400">
                {t('retry')}
              </button>
            </div>
          ) : results.length ? (
            <>
              <div className="max-h-96 overflow-y-auto">
                {results.map(result => (
                  <Link
                    key={result.id}
                    href={`/event/${result.slug}`}
                    className="block border-b border-gray-100 px-6 py-4 transition-colors last:border-0 hover:bg-gray-50 focus-visible:bg-gray-50 dark:border-dark-800 dark:hover:bg-dark-800 dark:focus-visible:bg-dark-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                      {locale === 'zh' ? result.title_zh : result.title_en}
                    </h3>
                    <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                      {locale === 'zh' ? result.description_zh : result.description_en}
                    </p>
                    <span className="mt-2 block text-xs font-medium text-primary-600 dark:text-primary-400">{result.year}</span>
                  </Link>
                ))}
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 dark:border-dark-700 dark:bg-dark-800">
                <Link
                  href={{ pathname: '/search', query: { q: query.trim() } }}
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-primary-600 hover:underline dark:text-primary-400"
                >
                  {t('results')}
                </Link>
              </div>
            </>
          ) : (
            <p role="status" className="p-6 text-center text-gray-500 dark:text-gray-400">{t('noResults')}</p>
          )}
        </section>
      )}
    </div>
  );
}
