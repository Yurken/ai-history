import { events } from '@/data/events';
import FlexSearch from 'flexsearch';
import fs from 'fs';
import path from 'path';

export interface SearchIndex {
  id: string;
  title_zh: string;
  title_en: string;
  description_zh: string;
  description_en: string;
  tags: string[];
  category: string;
  year: number;
  slug: string;
}

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

  // 创建搜索索引目录
  const dir = path.join(process.cwd(), 'public', 'search');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // 保存原始数据
  fs.writeFileSync(
    path.join(dir, 'index.json'),
    JSON.stringify(index, null, 2)
  );

  // 创建FlexSearch索引
  const documentIndex = new FlexSearch.Document({
    document: {
      id: 'id',
      index: ['content'],
      store: true,
    },
  });

  // 添加中文索引
  index.forEach(item => {
    documentIndex.add({
      id: item.id,
      content: `${item.title_zh} ${item.description_zh} ${item.tags.join(' ')}`,
      lang: 'zh',
      data: item,
    });
  });

  // 添加英文索引
  index.forEach(item => {
    documentIndex.add({
      id: `${item.id}-en`,
      content: `${item.title_en} ${item.description_en} ${item.tags.join(' ')}`,
      lang: 'en',
      data: item,
    });
  });

  console.log('Search index generated successfully');
}

// 如果直接运行此脚本，生成索引
if (require.main === module) {
  generateIndexFiles();
}
