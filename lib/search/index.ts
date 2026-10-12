import { events } from '@/lib/data/events';
import fs from 'node:fs';
import path from 'node:path';
import type { SearchIndex } from './types';

export function buildSearchIndex(): SearchIndex[] {
  return events.map(event => ({
    id: event.id,
    title_zh: event.title_zh,
    title_en: event.title_en,
    description_zh: event.description_zh,
    description_en: event.description_en,
    tags: event.tags,
    category: event.category,
    year: event.year,
    slug: event.slug,
  }));
}

export function generateIndexFiles() {
  const index = buildSearchIndex();
  const dir = path.join(process.cwd(), 'public', 'search');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.json'), `${JSON.stringify(index, null, 2)}\n`);
  console.log(`Search index generated with ${index.length} events`);
}

if (require.main === module) {
  generateIndexFiles();
}
