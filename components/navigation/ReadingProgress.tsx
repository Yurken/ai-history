'use client';

import { useScrollProgress } from '@/lib/hooks/useScrollProgress';

export function ReadingProgress({ locale }: { locale: string }) {
  const progress = useScrollProgress();

  return (
    <div
      role="progressbar"
      aria-label={locale === 'zh' ? '阅读进度' : 'Reading progress'}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 lg:left-60"
    >
      <div className="h-full origin-left bg-primary-500" style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}
