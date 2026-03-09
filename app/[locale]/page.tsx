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
  const originsRef = useRef<HTMLDivElement>(null);
  const earlyAiRef = useRef<HTMLDivElement>(null);
  const expertRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const deepRef = useRef<HTMLDivElement>(null);
  const llmRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!shouldAnimate()) return;

    const ctx = gsap.context(() => {
      // Helper for staggering animations
      const animateCards = (ref: React.RefObject<HTMLDivElement>) => {
        const cards = ref.current?.querySelectorAll('.event-card');
        if (cards && cards.length > 0) {
          gsap.from(cards, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 70%',
              end: 'bottom 30%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      };

      animateCards(originsRef);
      animateCards(earlyAiRef);
      animateCards(expertRef);
      animateCards(statRef);
      animateCards(deepRef);
      animateCards(llmRef);

    });

    return () => ctx.revert();
  }, []);

  const originsEvents = events.filter(e => e.year >= 1940 && e.year <= 1959);
  const earlyAiEvents = events.filter(e => e.year >= 1960 && e.year <= 1979);
  const expertSystemEvents = events.filter(e => e.year >= 1980 && e.year <= 1989);
  const statisticalEvents = events.filter(e => e.year >= 1990 && e.year <= 2009);
  const deepLearningEvents = events.filter(e => e.year >= 2010 && e.year <= 2016);
  const llmEvents = events.filter(e => e.year >= 2020);

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
                ? '从ELIZA的对话尝试到《感知机》带来的第一次寒冬'
                : 'From ELIZA\'s conversation attempts to the first AI Winter caused by "Perceptrons"'}
            </p>
          </div>

          <div ref={earlyAiRef} className="grid md:grid-cols-2 gap-6">
             {earlyAiEvents.map((event, index) => (
              <div key={event.id} className="event-card">
                <EventCard event={event} index={index} />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Expert Systems Section - 1980s */}
      <SectionWrapper id="expert-systems" theme="light" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-wider uppercase">
              1980s
            </span>
            <h2 className="text-section font-display font-bold text-gray-900 dark:text-white mt-4 mb-6">
              {locale === 'zh' ? '专家系统的兴起' : 'The Rise of Expert Systems'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {locale === 'zh'
                ? '知识库与推理引擎的结合，AI首次在商业领域取得成功'
                : 'Combining knowledge bases and inference engines, AI finds its first commercial success'}
            </p>
          </div>

          <div ref={expertRef} className="grid md:grid-cols-2 gap-8">
            {expertSystemEvents.map((event, index) => (
              <div key={event.id} className="event-card">
                <EventCard event={event} index={index} />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Statistical Learning Section - 1990s-2000s */}
      <SectionWrapper id="statistical-learning" theme="dark" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16">
            <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">
              1990s-2000s
            </span>
            <h2 className="text-section font-display font-bold text-white mt-4 mb-6">
              {locale === 'zh' ? '统计学习与深蓝' : 'Statistical Learning & Deep Blue'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {locale === 'zh'
                ? '概率模型成为主流，计算机击败人类国际象棋冠军'
                : 'Probabilistic models become mainstream; computer defeats human chess champion'}
            </p>
          </div>

          <div ref={statRef} className="grid md:grid-cols-2 gap-8">
            {statisticalEvents.map((event, index) => (
              <div key={event.id} className="event-card">
                <EventCard event={event} index={index} />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>


      {/* Deep Learning Section - 2010s */}
      <SectionWrapper id="deep-learning" theme="gradient" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary-300 text-sm font-semibold tracking-wider uppercase">
              2010s
            </span>
            <h2 className="text-section font-display font-bold text-white mt-4 mb-6">
              {locale === 'zh' ? '深度学习的爆发' : 'The Explosion of Deep Learning'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {locale === 'zh'
                ? '从AlexNet到AlphaGo，大数据与算力开启了AI新纪元'
                : 'From AlexNet to AlphaGo, big data and computing power usher in a new era of AI'}
            </p>
          </div>

           {/* Special Stats for AlexNet */}
           <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-6xl font-bold text-white mb-4">
                15.3%
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {locale === 'zh' ? 'Top-5 错误率' : 'Top-5 Error Rate'}
              </h3>
              <p className="text-gray-300">
                {locale === 'zh' ? 'AlexNet将错误率从26%降至15.3%' : 'AlexNet reduced error rate from 26% to 15.3%'}
              </p>
            </div>

            <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-6xl font-bold text-white mb-4">
                4:1
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {locale === 'zh' ? 'AlphaGo vs 李世石' : 'AlphaGo vs Lee Sedol'}
              </h3>
              <p className="text-gray-300">
                {locale === 'zh' ? 'AI首次战胜人类围棋世界冠军' : 'AI defeats human Go world champion for the first time'}
              </p>
            </div>
          </div>

          <div ref={deepRef} className="grid md:grid-cols-2 gap-8">
             {deepLearningEvents.map((event, index) => (
              <div key={event.id} className="event-card">
                <EventCard event={event} index={index} />
              </div>
            ))}
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

          <div ref={llmRef} className="grid md:grid-cols-2 gap-6">
            {llmEvents.map((event, index) => (
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
