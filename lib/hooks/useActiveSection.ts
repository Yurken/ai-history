'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: readonly string[], enabled = true) {
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  // The identifier list, rather than the array identity, controls subscriptions.
  const sectionKey = sectionIds.join('|');

  useEffect(() => {
    if (!enabled) return;

    const ids = sectionKey.split('|').filter(Boolean);
    let frame = 0;
    const updateSection = () => {
      frame = 0;
      const elements = ids.map(id => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element));
      let current = '';
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= window.innerHeight * 0.3) current = element.id;
        else break;
      }
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateSection);
    };

    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(document.body);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [sectionKey, enabled, pathname]);

  return enabled ? activeSection : '';
}
