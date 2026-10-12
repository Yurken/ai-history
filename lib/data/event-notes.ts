import type { Event, EventNotes } from '@/types/event';
import { notesPart1 } from './notes/part-1';
import { notesPart2 } from './notes/part-2';
import { notesPart3 } from './notes/part-3';
import { notesPart4 } from './notes/part-4';
import { notesPart5 } from './notes/part-5';
import { notesPart6 } from './notes/part-6';
import { notesPart7 } from './notes/part-7';
import { notesPart8 } from './notes/part-8';
import { notesPart9 } from './notes/part-9';
import { notesPart10 } from './notes/part-10';

/**
 * 事件详细学习笔记，按事件 id 索引。
 * 每个分组文件由研究流程生成，经联网核实后撰写双语结构化笔记。
 */
export const eventNotes: Record<string, EventNotes> = {
  ...notesPart1,
  ...notesPart2,
  ...notesPart3,
  ...notesPart4,
  ...notesPart5,
  ...notesPart6,
  ...notesPart7,
  ...notesPart8,
  ...notesPart9,
  ...notesPart10,
};

export function getEventNotes(event: Event): EventNotes | undefined {
  return eventNotes[event.id];
}

export function hasEventNotes(event: Event): boolean {
  return getEventNotes(event) !== undefined;
}
