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
  notes?: EventNotes;
}

export interface Link {
  title: string;
  url: string;
  type: 'paper' | 'code' | 'website' | 'video';
}

export interface NoteGlossaryItem {
  term_zh: string;
  term_en: string;
  definition_zh: string;
  definition_en: string;
}

export interface EventNotes {
  background_zh: string;
  background_en: string;
  keyPoints_zh: string[];
  keyPoints_en: string[];
  technical_zh?: string;
  technical_en?: string;
  impact_zh: string;
  impact_en: string;
  takeaways_zh: string[];
  takeaways_en: string[];
  glossary?: NoteGlossaryItem[];
}

export interface Tag {
  id: string;
  name_zh: string;
  name_en: string;
  count: number;
}
