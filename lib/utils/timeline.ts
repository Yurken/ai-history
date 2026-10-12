import type { Event } from '@/types/event';

export const eventCategories: Event['category'][] = [
  'paper', 'model', 'person', 'conference', 'milestone', 'software', 'book', 'product',
];

export interface TimelineFilters {
  decade: string;
  category: string;
  query: string;
  order: string;
}

export function filterTimeline(events: Event[], filters: TimelineFilters): Event[] {
  const terms = filters.query.normalize('NFKC').toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);

  return events.filter((event) => {
    if (filters.decade && Math.floor(event.year / 10) * 10 !== Number(filters.decade)) return false;
    if (filters.category && event.category !== filters.category) return false;

    const text = [event.title_zh, event.title_en, event.description_zh,
      event.description_en, event.year, ...event.tags].join(' ').normalize('NFKC').toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  }).sort((a, b) => {
    const chronological = a.date.localeCompare(b.date) || a.id.localeCompare(b.id);
    return filters.order === 'desc' ? -chronological : chronological;
  });
}

export function groupTimelineByYear(events: Event[]): { year: number; events: Event[] }[] {
  const groups: { year: number; events: Event[] }[] = [];
  for (const event of events) {
    const last = groups[groups.length - 1];
    if (last?.year === event.year) last.events.push(event);
    else groups.push({ year: event.year, events: [event] });
  }
  return groups;
}
