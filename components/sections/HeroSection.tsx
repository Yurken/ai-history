'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, ScrollTrigger, shouldAnimate } from '@/lib/utils/animation';
import { SectionWrapper } from './SectionWrapper';
import { cn } from '@/lib/utils/cn';
import { Link } from '@/i18n/routing';

export function HeroSection() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !shouldAnimate()) return;

    const ctx = gsap.context(() => {
      // 标题动画 - 逐行淡入
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 100,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
        });
      }

      // 副标题动画
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          delay: 0.6,
        });
      }

      // 滚动提示动画
      if (scrollHintRef.current) {
        gsap.to(scrollHintRef.current, {
          y: -20,
          opacity: 0.5,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });

        // 滚动时淡出
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '20% top',
          scrub: true,
          onUpdate: (self) => {
            if (scrollHintRef.current) {
              gsap.to(scrollHintRef.current, {
                opacity: 1 - self.progress,
                duration: 0.1,
              });
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef}
      id="hero"
      theme="dark"
      fullHeight
      className="flex items-center justify-center overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* 主标题 */}
        <h1
          ref={titleRef}
          className={cn(
            'text-hero font-display font-bold',
            'text-transparent bg-clip-text',
            'bg-gradient-to-r from-white via-primary-100 to-purple-200',
            'mb-8'
          )}
        >
          {t('title')}
        </h1>

        {/* 副标题 */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {t('subtitle')}
        </p>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <Link href="/knowledge" className="rounded-xl bg-primary-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-300">
            {t('knowledgeLink')}
          </Link>
          <Link href="/timeline" className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-300">
            {t('timelineLink')}
          </Link>
        </div>

        {/* 滚动提示 */}
        <div
          ref={scrollHintRef}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-sm">{t('scrollHint')}</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* 底部渐变 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
    </SectionWrapper>
  );
}
