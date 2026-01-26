'use client';

import { useEffect, useState } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      const scrollableHeight = documentHeight - windowHeight;
      const scrollProgress = (scrollTop / scrollableHeight) * 100;
      setProgress(Math.min(Math.max(scrollProgress, 0), 100));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
}
