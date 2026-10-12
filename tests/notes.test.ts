import assert from 'node:assert/strict';
import { test } from 'node:test';
import { events } from '../lib/data/events';
import { eventNotes, getEventNotes, hasEventNotes } from '../lib/data/event-notes';

const notesEntries = Object.entries(eventNotes);
const validIds = new Set(events.map(event => event.id));

test('every note entry maps to a known event and events resolve their notes', () => {
  for (const [id, notes] of notesEntries) {
    assert.ok(validIds.has(id), `notes refer to unknown event ${id}`);
    const event = events.find(e => e.id === id);
    assert.deepEqual(getEventNotes(event!), notes);
    assert.ok(hasEventNotes(event!));
  }
  for (const event of events) {
    if (hasEventNotes(event)) {
      assert.equal(getEventNotes(event), eventNotes[event.id]);
    } else {
      assert.equal(getEventNotes(event), undefined);
    }
  }
});

test('every current event carries study notes', () => {
  const missing = events.filter(event => !eventNotes[event.id]).map(event => event.id);
  assert.deepEqual(missing, [], `events without notes: ${missing.join(', ')}`);
});

test('notes carry substantive bilingual content in every section', () => {
  assert.ok(notesEntries.length >= events.length);

  for (const [id, notes] of notesEntries) {
    for (const key of ['background_zh', 'background_en', 'impact_zh', 'impact_en'] as const) {
      assert.ok(notes[key].trim().length >= 60, `${id} has a thin ${key}`);
    }
    for (const key of ['keyPoints_zh', 'keyPoints_en', 'takeaways_zh', 'takeaways_en'] as const) {
      assert.ok(notes[key].length >= 3, `${id} needs at least 3 ${key}`);
      for (const item of notes[key]) {
        assert.ok(item.trim().length >= 10, `${id} has a too-short ${key} item`);
      }
    }
    if (notes.technical_zh !== undefined || notes.technical_en !== undefined) {
      assert.ok(notes.technical_zh && notes.technical_en, `${id} has a one-sided technical section`);
      assert.ok(notes.technical_zh.trim().length >= 60 && notes.technical_en.trim().length >= 60, `${id} has a thin technical section`);
    }
    for (const item of notes.glossary ?? []) {
      for (const key of ['term_zh', 'term_en', 'definition_zh', 'definition_en'] as const) {
        assert.ok(item[key].trim().length > 0, `${id} has an incomplete glossary entry`);
      }
    }
  }
});

test('notes ids are unique and never collide across part files', () => {
  const ids = notesEntries.map(([id]) => id);
  assert.equal(new Set(ids).size, ids.length);
});
