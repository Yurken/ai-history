'use client';

import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { events } from '@/lib/data/events';
import { eventCategories, filterTimeline, groupTimelineByYear } from '@/lib/utils/timeline';

const decades = Array.from(new Set(events.map((event) => Math.floor(event.year / 10) * 10))).sort((a, b) => a - b);
const availableCategories = eventCategories.filter((category) => events.some((event) => event.category === category));
const fieldClass = 'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/30 dark:border-dark-600 dark:bg-dark-900 dark:text-white';

export function TimelineBrowser() {
  const locale = useLocale();
  const t = useTranslations('timeline');
  const categoryLabel = useTranslations('event');
  const params = useSearchParams();
  const rawDecade = params.get('decade') || '';
  const rawCategory = params.get('category') || '';
  const decade = decades.some((value) => String(value) === rawDecade) ? rawDecade : '';
  const category = availableCategories.some((value) => value === rawCategory) ? rawCategory : '';
  const query = params.get('q') || '';
  const order = params.get('order') === 'desc' ? 'desc' : 'asc';
  const filteredEvents = filterTimeline(events, { decade, category, query, order });
  const years = groupTimelineByYear(filteredEvents);
  const hasFilters = Boolean(decade || category || query || order === 'desc');

  // Next's history integration keeps filters, reloads and browser back/forward in sync,
  // while the small local event collection can be filtered without a server request.
  function updateFilter(key: string, value: string, replace = false) {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
    const href = `${url.pathname}${url.search}${url.hash}`;
    if (replace) window.history.replaceState(null, '', href);
    else window.history.pushState(null, '', href);
  }

  function clearFilters() {
    const url = new URL(window.location.href);
    ['decade', 'category', 'q', 'order'].forEach((key) => url.searchParams.delete(key));
    window.history.pushState(null, '', `${url.pathname}${url.search}`);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-10 border-b border-gray-200 pb-10 dark:border-dark-700">
        <p className="mb-4 text-sm font-semibold tracking-widest text-primary-700 dark:text-primary-300">
          {Math.min(...events.map((event) => event.year))} — {Math.max(...events.map((event) => event.year))}
        </p>
        <h1 className="text-section font-display font-bold text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">{t('description')}</p>
      </header>

      <form role="search" onSubmit={(event) => event.preventDefault()} className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr]">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          <span className="mb-2 block">{t('keyword')}</span>
          <input type="search" name="q" value={query} onChange={(event) => updateFilter('q', event.target.value, true)} placeholder={t('placeholder')} className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          <span className="mb-2 block">{t('byDecade')}</span>
          <select name="decade" value={decade} onChange={(event) => updateFilter('decade', event.target.value)} className={fieldClass}>
            <option value="">{t('all')}</option>
            {decades.map((value) => <option key={value} value={value}>{t('decadeLabel', { decade: value })}</option>)}
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          <span className="mb-2 block">{t('byCategory')}</span>
          <select name="category" value={category} onChange={(event) => updateFilter('category', event.target.value)} className={fieldClass}>
            <option value="">{t('all')}</option>
            {availableCategories.map((value) => <option key={value} value={value}>{categoryLabel(value)}</option>)}
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          <span className="mb-2 block">{t('sort')}</span>
          <select name="order" value={order} onChange={(event) => updateFilter('order', event.target.value === 'asc' ? '' : 'desc')} className={fieldClass}>
            <option value="asc">{t('oldestFirst')}</option>
            <option value="desc">{t('newestFirst')}</option>
          </select>
        </label>
      </form>

      <div className="mb-10 flex min-h-10 flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" className="text-sm text-gray-600 dark:text-gray-300">{t('count', { count: filteredEvents.length, total: events.length })}</p>
        {hasFilters && <button type="button" onClick={clearFilters} className="rounded-lg px-3 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 dark:text-primary-300 dark:hover:bg-dark-800">{t('reset')}</button>}
      </div>

      {years.length ? (
        <div className="space-y-12">
          {years.map((group) => (
            <section key={group.year} aria-labelledby={`year-${group.year}`} className="grid gap-5 sm:grid-cols-[5rem_1fr] sm:gap-8">
              <h2 id={`year-${group.year}`} className="text-2xl font-bold tabular-nums text-primary-700 dark:text-primary-300 sm:sticky sm:top-8 sm:self-start">{group.year}</h2>
              <ol className="border-l border-gray-200 pl-5 dark:border-dark-700 sm:pl-8">
                {group.events.map((event, index) => (
                  <li key={event.id} className="relative border-b border-gray-200 py-6 first:pt-0 last:border-b-0 dark:border-dark-800">
                    <span aria-hidden="true" className={`absolute -left-[1.6rem] ${index === 0 ? 'top-2' : 'top-8'} h-3 w-3 rounded-full border-2 border-primary-600 bg-white dark:bg-dark-950 sm:-left-[2.4rem]`} />
                    <Link href={`/event/${event.slug}`} className="group block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary-600">
                      <span className="mb-2 inline-block text-xs font-semibold text-primary-700 dark:text-primary-300">{categoryLabel(event.category)}</span>
                      <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-300">{locale === 'zh' ? event.title_zh : event.title_en} <span aria-hidden="true" className="inline-block text-primary-600 transition-transform group-hover:translate-x-1">↗</span></h3>
                      <p className="max-w-3xl leading-relaxed text-gray-600 dark:text-gray-300">{locale === 'zh' ? event.description_zh : event.description_en}</p>
                      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">{event.tags.slice(0, 4).map((tag) => <span key={tag}>#{tag}</span>)}</div>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-gray-50 px-6 py-16 text-center dark:bg-dark-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('noResults')}</h2>
          <p className="mx-auto mt-3 max-w-md text-gray-600 dark:text-gray-300">{t('emptyHint')}</p>
          <button type="button" onClick={clearFilters} className="mt-6 rounded-xl bg-primary-700 px-5 py-3 font-semibold text-white hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600">{t('reset')}</button>
        </div>
      )}
    </div>
  );
}
