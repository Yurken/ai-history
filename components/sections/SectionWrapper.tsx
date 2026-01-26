'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id: string;
  theme?: 'light' | 'dark' | 'gradient';
  fullHeight?: boolean;
  children: React.ReactNode;
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ id, theme = 'light', fullHeight = false, children, className, ...props }, ref) => {
    const themeClasses = {
      light: 'bg-white dark:bg-dark-950 text-gray-900 dark:text-gray-100',
      dark: 'bg-dark-950 text-white',
      gradient: 'bg-gradient-to-b from-dark-950 to-primary-950 text-white',
    };

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          'relative w-full',
          fullHeight && 'min-h-screen',
          themeClasses[theme],
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

SectionWrapper.displayName = 'SectionWrapper';
