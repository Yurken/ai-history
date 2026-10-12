import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const ANIMATION_CONFIG = {
  fadeIn: {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
  },
  slideInLeft: {
    x: -100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  },
  slideInRight: {
    x: 100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  },
  scaleIn: {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)',
  },
};

export const SCROLL_TRIGGER_CONFIG = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
};

export function createScrollTrigger(
  element: HTMLElement | string,
  animation: gsap.TweenVars,
  config?: Partial<ScrollTrigger.Vars>
) {
  return ScrollTrigger.create({
    trigger: element,
    start: config?.start || SCROLL_TRIGGER_CONFIG.start,
    end: config?.end || SCROLL_TRIGGER_CONFIG.end,
    toggleActions: config?.toggleActions || SCROLL_TRIGGER_CONFIG.toggleActions,
    animation: gsap.to(element, animation),
    ...config,
  });
}

export function createParallaxEffect(
  element: HTMLElement | string,
  speed = 0.5
) {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const shouldAnimate = () => !prefersReducedMotion();
