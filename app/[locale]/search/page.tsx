'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { searchClient } from '@/lib/search/client';
import { SearchIndex } from '@/lib/search/index';
import { Link } from '@/lib/i18n/routing';
import { EventCard } from '@/components/timeline/EventCard';
import { events } from '@/lib/data/events';
import { SideNav } from '@/components/navigation/SideNav';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const locale = useLocale();
  const t = useTranslations('search');
  const [results, setResults] = useState<SearchIndex[]>([]);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    const performSearch = async () => {
      setIsSearching(true);
      await searchClient.init();
      const searchResults = searchClient.search(query, 20);
      setResults(searchResults);
      setIsSearching(false);
    };

    performSearch();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {query ? (
            <>
              {t('resultsFor')} <span className="text-primary-600 dark:text-primary-400 font-semibold">&quot;{query}&quot;</span>
            </>
          ) : (
            t('allEvents')
          )}
        </p>
      </header>

      {isSearching ? (
        <div className="flex justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
        </div>
      ) : results.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result, index) => {
            const event = events.find(e => e.id === result.id);
            if (!event) return null;
            return (
              <EventCard key={event.id} event={event} index={index} />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 dark:bg-dark-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-dark-800">
          <p className="text-xl text-gray-500 dark:text-gray-400">{t('noResults')}</p>
          <Link
            href={`/${locale}`}
            className="inline-block mt-6 text-primary-600 dark:text-primary-400 hover:underline"
          >
            {t('backHome')}
          </Link>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  const locale = useLocale();
  
  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      <SideNav locale={locale} />
      <main className="lg:ml-60">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults />
        </Suspense>
      </main>
    </div>
  );
}
