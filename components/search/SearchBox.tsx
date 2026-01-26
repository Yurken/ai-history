'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { searchClient } from '@/lib/search/client';
import { SearchIndex } from '@/lib/search/index';
import { Link } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils/cn';
import { useDebounce } from '@/lib/hooks/useDebounce';

interface SearchBoxProps {
  placeholder?: string;
}

export function SearchBox({ placeholder }: SearchBoxProps) {
  const t = useTranslations('search');
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchIndex[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    searchClient.init();
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsSearching(true);
      const searchResults = searchClient.search(debouncedQuery, 8);
      setResults(searchResults);
      setIsSearching(false);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  // 点击外部关闭
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
      {/* 搜索输入框 */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || t('placeholder')}
          className={cn(
            'w-full pl-12 pr-4 py-4 rounded-2xl',
            'bg-white dark:bg-dark-800',
            'border-2 border-gray-200 dark:border-dark-700',
            'focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20',
            'transition-all duration-200',
            'text-gray-900 dark:text-white',
            'placeholder:text-gray-400'
          )}
        />

        {isSearching && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-500 border-t-transparent" />
          </div>
        )}
      </div>

      {/* 搜索结果 */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-dark-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-700 overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            {results.map((result) => (
              <Link
                key={result.id}
                href={`/${locale}/event/${result.slug}`}
                className="block px-6 py-4 hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors border-b border-gray-100 dark:border-dark-800 last:border-0"
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {locale === 'zh' ? result.title_zh : result.title_en}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {locale === 'zh' ? result.description_zh : result.description_en}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                        {result.year}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {result.category}
                      </span>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <div className="px-6 py-3 bg-gray-50 dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700">
            <Link
              href={`/${locale}/search?q=${encodeURIComponent(query)}`}
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              {t('results')} ({results.length})
            </Link>
          </div>
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && !isSearching && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-dark-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-700 p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">{t('noResults')}</p>
        </div>
      )}
    </div>
  );
}
