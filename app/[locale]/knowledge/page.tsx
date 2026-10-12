import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { KnowledgeBrowser } from '@/components/knowledge/KnowledgeBrowser';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'knowledge' });
  return { title: `${t('title')} | AI History`, description: t('description') };
}

export default function KnowledgePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-6 py-16" aria-busy="true">…</div>}>
      <KnowledgeBrowser />
    </Suspense>
  );
}
