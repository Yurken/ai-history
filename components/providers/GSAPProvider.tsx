'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/utils/animation';

interface GSAPContextValue {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
}

const GSAPContext = createContext<GSAPContextValue | null>(null);

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      gsap.registerPlugin(ScrollTrigger);
      isInitialized.current = true;
    }

    // 清理函数
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const value: GSAPContextValue = {
    gsap,
    ScrollTrigger,
  };

  return (
    <GSAPContext.Provider value={value}>
      {children}
    </GSAPContext.Provider>
  );
}

export function useGSAP() {
  const context = useContext(GSAPContext);
  if (!context) {
    throw new Error('useGSAP must be used within a GSAPProvider');
  }
  return context;
}
