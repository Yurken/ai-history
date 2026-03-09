export interface Event {
  id: string;
  slug: string;
  date: string;
  year: number;
  title_zh: string;
  title_en: string;
  description_zh: string;
  description_en: string;
  content_zh?: string;
  content_en?: string;
  category: 'paper' | 'model' | 'person' | 'conference' | 'milestone' | 'software' | 'book' | 'product';
  tags: string[];
  links?: Link[];
  images?: string[];
  related_events?: string[];
}

export interface Link {
  title: string;
  url: string;
  type: 'paper' | 'code' | 'website' | 'video';
}

export interface Tag {
  id: string;
  name_zh: string;
  name_en: string;
  count: number;
}
