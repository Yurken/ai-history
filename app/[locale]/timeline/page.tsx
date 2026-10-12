import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { TimelineBrowser } from '@/components/timeline/TimelineBrowser';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'timeline' });
  return { title: `${t('title')} | AI History`, description: t('description') };
}

export default function TimelinePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-6 py-16" aria-busy="true">…</div>}>
      <TimelineBrowser />
    </Suspense>
  );
}
