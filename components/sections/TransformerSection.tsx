'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { gsap, ScrollTrigger, shouldAnimate } from '@/lib/utils/animation';
import { SectionWrapper } from './SectionWrapper';
import { Link } from '@/lib/i18n/routing';
import { events } from '@/lib/data/events';

export function TransformerSection() {
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const transformerEvent = events.find(e => e.id === 'transformer-2017');

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !shouldAnimate()) return;

    const ctx = gsap.context(() => {
      // 章节标题粘滞效果
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: '.transformer-title',
        anticipatePin: 1,
      });

      // 内容渐入动画
      const contentElements = containerRef.current?.querySelectorAll('.animate-content');
      if (contentElements) {
        gsap.from(contentElements, {
          opacity: 0,
          y: 80,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 架构图解构动画（简化版）
      const architectureRef = containerRef.current?.querySelector('.architecture-diagram');
      if (architectureRef) {
        const layers = architectureRef.querySelectorAll('.layer');
        gsap.from(layers, {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: architectureRef,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 关键词高亮动画
      const keywords = containerRef.current?.querySelectorAll('.keyword');
      if (keywords) {
        keywords.forEach((keyword) => {
          gsap.from(keyword, {
            backgroundColor: '#fbbf24',
            color: '#000',
            duration: 0.5,
            scrollTrigger: {
              trigger: keyword,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!transformerEvent) return null;

  const title = locale === 'zh' ? transformerEvent.title_zh : transformerEvent.title_en;
  const description = locale === 'zh' ? transformerEvent.description_zh : transformerEvent.description_en;
  const content = locale === 'zh' ? transformerEvent.content_zh : transformerEvent.content_en;

  return (
    <SectionWrapper
      ref={sectionRef}
      id="transformer"
      theme="gradient"
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* 粘滞标题 */}
        <div className="transformer-title sticky top-0 z-10 py-8 backdrop-blur-md bg-dark-950/50 rounded-2xl mb-16">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">
              2017
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary-500 to-transparent" />
          </div>
          <h2 className="text-section font-display font-bold text-white mb-4">
            {locale === 'zh' ? 'Transformer：注意力机制革命' : 'Transformer: The Attention Revolution'}
          </h2>
        </div>

        <div ref={containerRef} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧：内容 */}
          <div className="space-y-8">
            <div className="animate-content">
              <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
              <p className="text-xl text-gray-300 mb-6">{description}</p>
            </div>

            <div className="animate-content prose prose-invert prose-lg max-w-none">
              <p className="text-gray-300 leading-relaxed">
                {content}
              </p>
            </div>

            <div className="animate-content flex flex-wrap gap-2">
              {transformerEvent.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium border border-primary-500/30"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="animate-content">
              <Link
                href={`/${locale}/event/${transformerEvent.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors"
              >
                {locale === 'zh' ? '了解更多' : 'Learn More'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* 右侧：架构图 */}
          <div className="architecture-diagram animate-content">
            <div className="relative bg-dark-900/50 backdrop-blur-sm rounded-2xl p-8 border border-primary-500/20">
              <h4 className="text-xl font-bold text-white mb-6 text-center">
                Transformer Architecture
              </h4>

              <div className="space-y-3">
                {/* Encoder */}
                <div className="layer p-4 bg-blue-500/20 rounded-xl border-2 border-blue-500/40">
                  <div className="text-sm font-semibold text-blue-300 mb-2">Encoder</div>
                  <div className="text-xs text-gray-400">Self-Attention → Feed Forward</div>
                </div>

                {/* Decoder */}
                <div className="layer p-4 bg-purple-500/20 rounded-xl border-2 border-purple-500/40">
                  <div className="text-sm font-semibold text-purple-300 mb-2">Decoder</div>
                  <div className="text-xs text-gray-400">Masked Attention → Cross-Attention → FFN</div>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="layer p-3 bg-primary-500/20 rounded-xl border border-primary-500/30 text-center">
                    <div className="text-xs font-semibold text-primary-300">Parallel Processing</div>
                  </div>
                  <div className="layer p-3 bg-primary-500/20 rounded-xl border border-primary-500/30 text-center">
                    <div className="text-xs font-semibold text-primary-300">Self-Attention</div>
                  </div>
                  <div className="layer p-3 bg-primary-500/20 rounded-xl border border-primary-500/30 text-center">
                    <div className="text-xs font-semibold text-primary-300">Position Encoding</div>
                  </div>
                  <div className="layer p-3 bg-primary-500/20 rounded-xl border border-primary-500/30 text-center">
                    <div className="text-xs font-semibold text-primary-300">Scalability</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
