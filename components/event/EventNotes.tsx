import { getTranslations } from 'next-intl/server';
import type { EventNotes as EventNotesData } from '@/types/event';

interface EventNotesProps {
  notes: EventNotesData;
  locale: string;
}

function estimateReadingMinutes(texts: string[], isZh: boolean): number {
  const total = texts.join(' ').length;
  // 中文按每分钟约 350 字、英文按每分钟约 220 词估算
  const units = isZh ? total : total / 6;
  return Math.max(1, Math.round(units / (isZh ? 350 : 220)));
}

export default async function EventNotes({ notes, locale }: EventNotesProps) {
  const t = await getTranslations({ locale, namespace: 'eventNotes' });
  const isZh = locale === 'zh';

  const background = isZh ? notes.background_zh : notes.background_en;
  const keyPoints = isZh ? notes.keyPoints_zh : notes.keyPoints_en;
  const technical = isZh ? notes.technical_zh : notes.technical_en;
  const impact = isZh ? notes.impact_zh : notes.impact_en;
  const takeaways = isZh ? notes.takeaways_zh : notes.takeaways_en;
  const glossary = notes.glossary ?? [];

  const minutes = estimateReadingMinutes(
    [background, technical ?? '', impact, ...keyPoints, ...takeaways],
    isZh,
  );

  const sections = [
    { id: 'background', label: t('background') },
    { id: 'key-points', label: t('keyPoints') },
    ...(technical ? [{ id: 'technical', label: t('technical') }] : []),
    { id: 'impact', label: t('impact') },
    { id: 'takeaways', label: t('takeaways') },
    ...(glossary.length > 0 ? [{ id: 'glossary', label: t('glossary') }] : []),
  ];

  return (
    <section className="mb-12" aria-label={t('title')}>
      {/* 笔记头部 */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('title')}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('subtitle')}</p>
        </div>
        <span className="ms-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t('readingTime', { minutes })}
        </span>
      </div>

      {/* 小节跳转 */}
      <nav className="flex flex-wrap gap-2 mb-8" aria-label={t('jumpNav')}>
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#note-${section.id}`}
            className="px-3 py-1.5 bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-full text-sm text-gray-600 dark:text-gray-300 hover:border-primary-500/50 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {section.label}
          </a>
        ))}
      </nav>

      <div className="space-y-8">
        {/* 背景与脉络 */}
        <div id="note-background" className="scroll-mt-24">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            {t('background')}
          </h3>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{background}</p>
        </div>

        {/* 核心要点 */}
        <div id="note-key-points" className="scroll-mt-24">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            {t('keyPoints')}
          </h3>
          <ul className="space-y-3">
            {keyPoints.map((point, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 mt-0.5 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 原理与技术细节 */}
        {technical && (
          <div id="note-technical" className="scroll-mt-24">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
              {t('technical')}
            </h3>
            <div className="p-6 bg-primary-50/60 dark:bg-primary-950/20 rounded-2xl border border-primary-100 dark:border-primary-900/30">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">{technical}</p>
            </div>
          </div>
        )}

        {/* 影响与后续 */}
        <div id="note-impact" className="scroll-mt-24">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            {t('impact')}
          </h3>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{impact}</p>
        </div>

        {/* 学习要点 */}
        <div id="note-takeaways" className="scroll-mt-24">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            {t('takeaways')}
          </h3>
          <ul className="space-y-3">
            {takeaways.map((item, index) => (
              <li key={index} className="flex gap-3">
                <svg className="flex-shrink-0 w-5 h-5 mt-1 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 术语表 */}
        {glossary.length > 0 && (
          <div id="note-glossary" className="scroll-mt-24">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
              {t('glossary')}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {glossary.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-dark-800">
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">
                    {isZh ? item.term_zh : item.term_en}
                    <span className="ms-2 text-sm font-normal text-gray-400 dark:text-gray-500">
                      {isZh ? item.term_en : item.term_zh}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {isZh ? item.definition_zh : item.definition_en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
