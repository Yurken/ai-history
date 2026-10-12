'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { EventCard } from '@/components/timeline/EventCard';
import { SearchBox } from '@/components/search/SearchBox';
import { useSearchResults } from '@/components/search/useSearchResults';
import { events } from '@/lib/data/events';

const eventsById = new Map(events.map(event => [event.id, event]));

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const t = useTranslations('search');
  const { results, status, retry } = useSearchResults(query, events.length, true);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-10">
        <h1 className="mb-6 font-display text-4xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
        <SearchBox key={query} initialQuery={query} showSuggestions={false} />
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
          {query.trim() ? (
            <>
              {t('resultsFor')} <span className="font-semibold text-primary-600 dark:text-primary-400">&quot;{query}&quot;</span>
            </>
          ) : t('allEvents')}
        </p>
      </header>

      {status === 'loading' ? (
        <p role="status" className="py-24 text-center text-gray-600 dark:text-gray-400">{t('loading')}</p>
      ) : status === 'error' ? (
        <div className="rounded-3xl border border-gray-200 bg-gray-50 px-6 py-16 text-center dark:border-dark-800 dark:bg-dark-900">
          <p role="alert" className="text-lg text-gray-600 dark:text-gray-400">{t('loadError')}</p>
          <button type="button" onClick={retry} className="mt-6 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700">
            {t('retry')}
          </button>
        </div>
      ) : results.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" aria-label={t('results')}>
          {results.map((result, index) => {
            const event = eventsById.get(result.id);
            return event ? <EventCard key={event.id} event={event} index={index} /> : null;
          })}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 py-24 text-center dark:border-dark-800 dark:bg-dark-900">
          <p role="status" className="text-xl text-gray-500 dark:text-gray-400">{t('noResults')}</p>
          <Link href="/" className="mt-6 inline-block text-primary-600 hover:underline dark:text-primary-400">{t('backHome')}</Link>
        </div>
      )}
    </div>
  );
}

function SearchFallback() {
  const t = useTranslations('search');
  return <p role="status" className="px-6 py-24 text-center text-gray-600 dark:text-gray-400">{t('loading')}</p>;
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResults />
    </Suspense>
  );
}
