import FlexSearch from 'flexsearch';
import { SearchIndex } from './index';

export class SearchClient {
  private index: FlexSearch.Document | null = null;
  private data: SearchIndex[] = [];
  private initialized = false;

  async init() {
    if (this.initialized) return;

    try {
      const response = await fetch('/search/index.json');
      this.data = await response.json();

      // 创建FlexSearch索引
      this.index = new FlexSearch.Document({
        document: {
          id: 'id',
          index: ['content'],
          store: true,
        },
      });

      // 添加所有条目到索引
      this.data.forEach(item => {
        this.index!.add({
          id: item.id,
          content: `${item.title_zh} ${item.title_en} ${item.description_zh} ${item.description_en} ${item.tags.join(' ')}`,
          data: item,
        });
      });

      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize search:', error);
    }
  }

  search(query: string, limit = 10): SearchIndex[] {
    if (!this.index || !query.trim()) {
      return [];
    }

    const results: SearchIndex[] = [];
    const searchResults = this.index!.search(query, limit);

    if (Array.isArray(searchResults)) {
      searchResults.forEach((result: any) => {
        if (result.result) {
          result.result.forEach((id: string) => {
            const item = this.data.find(d => d.id === id);
            if (item && !results.find(r => r.id === item.id)) {
              results.push(item);
            }
          });
        }
      });
    }

    return results.slice(0, limit);
  }

  searchByTag(tag: string): SearchIndex[] {
    return this.data.filter(item =>
      item.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  searchByYear(year: number): SearchIndex[] {
    return this.data.filter(item => item.year === year);
  }

  searchByCategory(category: string): SearchIndex[] {
    return this.data.filter(item => item.category === category);
  }
}

// 单例实例
export const searchClient = new SearchClient();
