import type { SearchIndex } from './types';

function normalize(value: string) {
  return value.normalize('NFKC').toLowerCase().trim();
}

function isSearchIndex(value: unknown): value is SearchIndex {
  if (!value || typeof value !== 'object') return false;

  const item = value as Record<string, unknown>;
  const textFields = ['id', 'title_zh', 'title_en', 'description_zh', 'description_en', 'category', 'slug'];

  return textFields.every(field => typeof item[field] === 'string') &&
    typeof item.year === 'number' && Number.isInteger(item.year) &&
    Array.isArray(item.tags) && item.tags.every(tag => typeof tag === 'string');
}

export class SearchClient {
  private data: SearchIndex[] = [];
  private documents: { item: SearchIndex; titles: string[]; text: string }[] = [];
  private initialized = false;
  private initialization: Promise<void> | null = null;

  constructor(private readonly fetchIndex: typeof fetch = (...args) => fetch(...args)) {}

  init(): Promise<void> {
    if (this.initialized) return Promise.resolve();
    if (this.initialization) return this.initialization;

    this.initialization = this.loadIndex().finally(() => {
      this.initialization = null;
    });
    return this.initialization;
  }

  private async loadIndex() {
    const response = await this.fetchIndex('/search/index.json', { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Unable to load search index (${response.status})`);
    }

    const data: unknown = await response.json();
    if (!Array.isArray(data) || !data.every(isSearchIndex) ||
      new Set(data.map(item => item.id)).size !== data.length) {
      throw new Error('Invalid search index');
    }

    this.data = data;
    this.documents = data.map(item => ({
      item,
      titles: [normalize(item.title_zh), normalize(item.title_en)],
      text: normalize([
        item.title_zh, item.title_en, item.description_zh, item.description_en,
        ...item.tags, item.category, String(item.year),
      ].join(' ')),
    }));
    this.initialized = true;
  }

  search(query: string, limit = 10): SearchIndex[] {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery || !Number.isFinite(limit) || limit <= 0) return [];

    const terms = normalizedQuery.split(/\s+/u);

    // Chinese keywords need substring matching rather than whitespace tokenization.
    // Requiring every term also makes bilingual, multi-word queries useful.
    return this.documents
      .filter(document => terms.every(term => document.text.includes(term)))
      .map(document => ({
        item: document.item,
        score: document.titles.reduce((score, title) => score +
          (title === normalizedQuery ? 100 : title.includes(normalizedQuery) ? 20 : 0) +
          terms.filter(term => title.includes(term)).length * 5, 0),
      }))
      .sort((a, b) => b.score - a.score || a.item.year - b.item.year || a.item.id.localeCompare(b.item.id))
      .slice(0, Math.floor(limit))
      .map(result => result.item);
  }

  getAll(): SearchIndex[] {
    return [...this.data];
  }

  searchByTag(tag: string): SearchIndex[] {
    const normalizedTag = normalize(tag);
    return this.data.filter(item => item.tags.some(value => normalize(value) === normalizedTag));
  }

  searchByYear(year: number): SearchIndex[] {
    return this.data.filter(item => item.year === year);
  }

  searchByCategory(category: string): SearchIndex[] {
    return this.data.filter(item => normalize(item.category) === normalize(category));
  }
}

export const searchClient = new SearchClient();
