'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { events } from '@/lib/data/events';
import { EventCard } from '@/components/timeline/EventCard';
import { SideNav } from '@/components/navigation/SideNav';
import { Link } from '@/i18n/routing';

export default function TagPage() {
  const params = useParams();
  const slug = params.slug as string;
  const locale = useLocale();
  const t = useTranslations('search');
  
  const taggedEvents = events.filter(event => 
    event.tags.includes(slug.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      <SideNav locale={locale} />
      <main className="lg:ml-60">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <header className="mb-12">
            <div className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-bold mb-4">
              TAG
            </div>
            <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4 italic">
              #{slug}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {taggedEvents.length} {taggedEvents.length === 1 ? 'event' : 'events'} tagged with this keyword
            </p>
          </header>

          {taggedEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {taggedEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
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
      </main>
    </div>
  );
}
