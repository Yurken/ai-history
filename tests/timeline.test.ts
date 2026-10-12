import assert from 'node:assert/strict';
import { test } from 'node:test';
import { events } from '../lib/data/events';
import { filterTimeline, groupTimelineByYear } from '../lib/utils/timeline';

const defaults = { decade: '', category: '', query: '', order: 'asc' };

test('all events appear once in chronological year groups', () => {
  const sorted = filterTimeline(events, defaults);
  assert.equal(sorted.length, events.length);
  assert.equal(new Set(sorted.map(event => event.id)).size, events.length);
  for (let i = 1; i < sorted.length; i++) assert.ok(sorted[i - 1].date <= sorted[i].date);
  const groups = groupTimelineByYear(sorted);
  assert.deepEqual(groups.flatMap(group => group.events), sorted);
  assert.ok(groups.every(group => group.events.every(event => event.year === group.year)));
});

test('decade, category and bilingual keywords combine without mutating data', () => {
  const originalIds = events.map(event => event.id);
  const results = filterTimeline(events, { ...defaults, decade: '1950', category: 'paper', query: '图灵' });
  assert.deepEqual(results.map(event => event.id), ['turing-1950']);
  assert.deepEqual(filterTimeline(events, { ...defaults, query: 'ＴＵＲＩＮＧ 1950' }).map(event => event.id), ['turing-1950']);
  assert.deepEqual(events.map(event => event.id), originalIds);
});

test('descending order reverses chronology and unmatched filters have no results', () => {
  const ascending = filterTimeline(events, defaults);
  assert.deepEqual(filterTimeline(events, { ...defaults, order: 'desc' }), ascending.toReversed());
  assert.equal(filterTimeline(events, { ...defaults, query: 'not-an-ai-event-xyz' }).length, 0);
  assert.equal(filterTimeline(events, { ...defaults, decade: '1950', category: 'model' }).length, 0);
});
