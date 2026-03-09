'use client';

import { Event } from '@/types/event';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';

interface EventCardProps {
  event: Event;
  index?: number;
}

const categoryColors: Record<string, string> = {
  paper: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  model: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  person: 'bg-green-500/20 text-green-300 border-green-500/40',
  conference: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  milestone: 'bg-red-500/20 text-red-300 border-red-500/40',
  software: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  book: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
  product: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
};

export function EventCard({ event, index = 0 }: EventCardProps) {
  const locale = useLocale();

  const title = locale === 'zh' ? event.title_zh : event.title_en;
  const description = locale === 'zh' ? event.description_zh : event.description_en;
  const categoryColor = categoryColors[event.category];

  return (
    <Link
      href={`/${locale}/event/${event.slug}`}
      className={cn(
        'block group relative',
        'opacity-0 translate-y-8 animate-in',
        'animation-delay-custom'
      )}
      style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
    >
      <div className="relative bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-dark-700 hover:border-primary-500/50 overflow-hidden">
        {/* 发光效果 */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* 头部：日期和类别 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                {event.year}
              </span>
              <span className={cn(
                'px-3 py-1 rounded-full text-xs font-medium border',
                categoryColor
              )}>
                {event.category}
              </span>
            </div>
          </div>

          {/* 标题 */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {title}
          </h3>

          {/* 描述 */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {description}
          </p>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            {event.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-400 rounded-md text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 箭头图标 */}
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300">
            <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
