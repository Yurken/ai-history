import { AnimationType } from './animation';

export interface Section {
  id: string;
  title_zh: string;
  title_en: string;
  period: string;
  period_zh: string;
  description_zh?: string;
  description_en?: string;
  eventIds: string[];
  animationType: AnimationType;
  theme: 'light' | 'dark' | 'gradient';
}

export interface SectionNav {
  id: string;
  title_zh: string;
  title_en: string;
  href: string;
}
