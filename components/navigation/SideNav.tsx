'use client';

import { Link } from '@/lib/i18n/routing';
import { useActiveSection } from '@/lib/hooks/useActiveSection';
import { sections } from '@/lib/data/sections';
import { cn } from '@/lib/utils/cn';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { useState } from 'react';

interface SideNavProps {
  locale: string;
}

export function SideNav({ locale }: SideNavProps) {
  const sectionIds = sections.map(s => s.id);
  const activeSection = useActiveSection(sectionIds);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    return (
      <nav className="fixed bottom-6 right-6 z-50 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed bottom-24 right-6 z-50 w-64 bg-white dark:bg-dark-900 rounded-2xl shadow-2xl p-4 max-h-[70vh] overflow-y-auto">
              <NavItems
                activeSection={activeSection}
                onItemClick={() => setIsOpen(false)}
                locale={locale}
              />
            </div>
          </>
        )}
      </nav>
    );
  }

  return (
    <nav className="fixed left-0 top-0 h-screen w-60 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-r border-gray-200 dark:border-dark-700 z-40 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-dark-700">
        <Link href="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
          AI History
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <NavItems
          activeSection={activeSection}
          locale={locale}
        />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-dark-700 text-xs text-gray-500 dark:text-gray-400">
        © 2024 AI History
      </div>
    </nav>
  );
}

interface NavItemsProps {
  activeSection: string;
  onItemClick?: () => void;
  locale: string;
}

function NavItems({ activeSection, onItemClick, locale }: NavItemsProps) {
  return (
    <ul className="space-y-1">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            onClick={onItemClick}
            className={cn(
              'block px-4 py-3 rounded-xl transition-all duration-200',
              'hover:bg-gray-100 dark:hover:bg-dark-800',
              activeSection === section.id
                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold'
                : 'text-gray-700 dark:text-gray-300'
            )}
          >
            <div className="text-sm">
              {locale === 'zh' ? section.title_zh : section.title_en}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {locale === 'zh' ? section.period_zh : section.period}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
