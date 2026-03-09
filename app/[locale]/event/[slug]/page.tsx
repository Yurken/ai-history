import { notFound } from 'next/navigation';
import { events } from '@/lib/data/events';
import { Link } from '@/i18n/routing';
import { SideNav } from '@/components/navigation/SideNav';

interface EventPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: EventPageProps) {
  const { slug, locale } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) return {};

  return {
    title: locale === 'zh' ? event.title_zh : event.title_en,
    description: locale === 'zh' ? event.description_zh : event.description_en,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug, locale } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const title = locale === 'zh' ? event.title_zh : event.title_en;
  const description = locale === 'zh' ? event.description_zh : event.description_en;
  const content = locale === 'zh' ? event.content_zh : event.content_en;

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      <SideNav locale={locale} />

      <main className="lg:ml-60">
        <article className="max-w-4xl mx-auto px-6 py-16">
          {/* 返回链接 */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {locale === 'zh' ? '返回首页' : 'Back to Home'}
          </Link>

          {/* 头部信息 */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {event.year}
              </span>
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                {event.category}
              </span>
            </div>

            <h1 className="text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              {title}
            </h1>

            <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          </header>

          {/* 标签 */}
          {event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {event.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/${locale}/tag/${tag}`}
                  className="px-4 py-2 bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* 内容 */}
          {content && (
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {content}
              </p>
            </div>
          )}

          {/* 链接 */}
          {event.links && event.links.length > 0 && (
            <div className="mb-12 p-6 bg-gray-50 dark:bg-dark-900 rounded-2xl border border-gray-200 dark:border-dark-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {locale === 'zh' ? '相关链接' : 'Related Links'}
              </h3>
              <ul className="space-y-3">
                {event.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 rounded text-xs font-medium uppercase">
                        {link.type}
                      </span>
                      <span className="flex-1">{link.title}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 相关事件 */}
          {event.related_events && event.related_events.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {locale === 'zh' ? '相关事件' : 'Related Events'}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {event.related_events.map((relatedId) => {
                  const relatedEvent = events.find((e) => e.id === relatedId);
                  if (!relatedEvent) return null;

                  return (
                    <Link
                      key={relatedEvent.id}
                      href={`/${locale}/event/${relatedEvent.slug}`}
                      className="block p-6 bg-white dark:bg-dark-900 rounded-2xl border border-gray-200 dark:border-dark-700 hover:border-primary-500/50 hover:shadow-lg transition-all"
                    >
                      <div className="text-sm text-primary-600 dark:text-primary-400 font-semibold mb-2">
                        {relatedEvent.year}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {locale === 'zh' ? relatedEvent.title_zh : relatedEvent.title_en}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                        {locale === 'zh' ? relatedEvent.description_zh : relatedEvent.description_en}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
