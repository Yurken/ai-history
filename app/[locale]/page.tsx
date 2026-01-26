'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { TransformerSection } from '@/components/sections/TransformerSection';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { EventCard } from '@/components/timeline/EventCard';
import { events } from '@/lib/data/events';
import { useLocale } from 'next-intl';
import { gsap, shouldAnimate } from '@/lib/utils/animation';
import { useLayoutEffect, useRef } from 'react';

export default function HomePage() {
  const locale = useLocale();
  const originsRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!shouldAnimate()) return;

    const ctx = gsap.context(() => {
      // Origins section - 交替卡片动画
      const cards = originsRef.current?.querySelectorAll('.event-card');
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          x: (i) => (i % 2 === 0 ? -100 : 100),
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: originsRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, originsRef);

    return () => ctx.revert();
  }, []);

  const originsEvents = events.filter(e => e.year >= 1940 && e.year <= 1959);

  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection />

      {/* Origins Section - 1940s-1950s */}
      <SectionWrapper id="origins" theme="light" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-wider uppercase">
              1940s-1950s
            </span>
            <h2 className="text-section font-display font-bold text-gray-900 dark:text-white mt-4 mb-6">
              {locale === 'zh' ? '起源：从图灵到达特茅斯' : 'Origins: Turing to Dartmouth'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {locale === 'zh'
                ? '人工智能的概念诞生，图灵测试与达特茅斯会议奠定了学科基础'
                : 'The concept of AI is born. Turing Test and Dartmouth Conference laid the foundation'}
            </p>
          </div>

          <div ref={originsRef} className="grid md:grid-cols-2 gap-8">
            {originsEvents.map((event, index) => (
              <div key={event.id} className="event-card">
                <EventCard event={event} index={index} />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Early AI Section - 1960s-1970s */}
      <SectionWrapper id="early-ai" theme="gradient" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary-300 text-sm font-semibold tracking-wider uppercase">
              1960s-1970s
            </span>
            <h2 className="text-section font-display font-bold text-white mt-4 mb-6">
              {locale === 'zh' ? '早期AI的探索与挫折' : 'Early AI: Exploration & Setbacks'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {locale === 'zh'
                ? '早期程序的辉煌与第一次AI寒冬的到来'
                : 'Early program successes and the arrival of the first AI Winter'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl font-bold text-white mb-4">196{i}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {locale === 'zh' ? '早期程序' : 'Early Programs'}
                </h3>
                <p className="text-gray-300 text-sm">
                  {locale === 'zh' ? 'ELIZA、General Problem Solver等早期AI程序展示了机器智能的可能性' : 'Early AI programs like ELIZA and General Problem Solver demonstrated the possibilities of machine intelligence'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Deep Learning Section - 2012 */}
      <SectionWrapper id="deep-learning" theme="dark" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">
              2012
            </span>
            <h2 className="text-section font-display font-bold text-white mt-4 mb-6">
              {locale === 'zh' ? '深度学习拐点：AlexNet' : 'Deep Learning Turning Point: AlexNet'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {locale === 'zh'
                ? '深度卷积神经网络在ImageNet竞赛中夺冠，开启深度学习时代'
                : 'Deep CNN wins ImageNet, kicking off the deep learning era'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-2xl border border-primary-500/30">
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400 mb-4">
                15.3%
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {locale === 'zh' ? 'Top-5 错误率' : 'Top-5 Error Rate'}
              </h3>
              <p className="text-gray-300">
                {locale === 'zh' ? '相比前一年的26%，大幅提升' : 'Significant improvement from 26% the previous year'}
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30">
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
                60M
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {locale === 'zh' ? '参数数量' : 'Parameters'}
              </h3>
              <p className="text-gray-300">
                {locale === 'zh' ? '使用GPU训练的大规模神经网络' : 'Large-scale neural network trained with GPUs'}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Transformer Section */}
      <TransformerSection />

      {/* LLM Era Section - 2020s */}
      <SectionWrapper id="llm-era" theme="dark" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">
              2020s
            </span>
            <h2 className="text-section font-display font-bold text-white mt-4 mb-6">
              {locale === 'zh' ? '大模型与生成式AI' : 'Large Language Models & Generative AI'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {locale === 'zh'
                ? 'GPT系列、Claude、Gemini等大语言模型展现惊人能力'
                : 'GPT, Claude, Gemini, and other LLMs demonstrate remarkable capabilities'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {events.filter(e => e.year >= 2020).map((event, index) => (
              <div key={event.id} className="event-card">
                <EventCard event={event} index={index} />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Future Section */}
      <SectionWrapper id="future" theme="light" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-wider uppercase">
              Future
            </span>
            <h2 className="text-section font-display font-bold text-gray-900 dark:text-white mt-4 mb-6">
              {locale === 'zh' ? '未来展望与争议' : 'Future: Promises & Controversies'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {locale === 'zh'
                ? 'AGI的可能性、安全挑战与社会影响的多维思考'
                : 'AGI possibilities, safety challenges, and social implications'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800">
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">
                {locale === 'zh' ? '🚀 机遇' : '🚀 Opportunities'}
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{locale === 'zh' ? '科学研究加速' : 'Accelerated scientific research'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{locale === 'zh' ? '个性化教育与医疗' : 'Personalized education and healthcare'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{locale === 'zh' ? '创造力增强' : 'Creativity augmentation'}</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl border-2 border-red-200 dark:border-red-800">
              <h3 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-4">
                {locale === 'zh' ? '⚠️ 挑战' : '⚠️ Challenges'}
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">!</span>
                  <span>{locale === 'zh' ? '工作替代与不平等' : 'Job displacement and inequality'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">!</span>
                  <span>{locale === 'zh' ? '偏见与公平性' : 'Bias and fairness'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">!</span>
                  <span>{locale === 'zh' ? '安全与控制问题' : 'Safety and control concerns'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
