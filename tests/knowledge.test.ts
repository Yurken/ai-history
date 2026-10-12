import assert from 'node:assert/strict';
import test from 'node:test';
import {
  flattenKnowledgeNodes,
  getKnowledgeNode,
  getNodeEventIds,
  getNodeEvents,
  getNodePath,
  knowledgeNodeMap,
  knowledgeNodes,
  knowledgeTree,
} from '../lib/data/knowledge-tree';
import { events } from '../lib/data/events';
import type { KnowledgeNode } from '../types/knowledge';

test('the knowledge tree has unique IDs and usable bilingual definitions', () => {
  assert.equal(new Set(knowledgeNodes.map(node => node.id)).size, knowledgeNodes.length);
  assert.equal(knowledgeNodeMap.size, knowledgeNodes.length);
  assert.deepEqual(knowledgeTree.map(node => node.id), ['symbolic', 'statistical', 'neural', 'reinforcement', 'foundations-ecosystem']);

  for (const node of knowledgeNodes) {
    assert.match(node.id, /^[a-z][a-z0-9-]*$/);
    for (const key of ['title_zh', 'title_en', 'description_zh', 'description_en'] as const) {
      assert.ok(node[key].trim().length > 0, `${node.id} is missing ${key}`);
    }
    assert.equal(getKnowledgeNode(node.id), node);
    assert.equal(new Set(node.eventIds).size, node.eventIds.length, `${node.id} repeats a direct event`);
    for (const source of node.sources ?? []) {
      assert.ok(source.title.trim());
      assert.equal(new URL(source.url).protocol, 'https:');
    }
  }
});

test('all event associations resolve and the catalog is fully reachable', () => {
  const validIds = new Set(events.map(event => event.id));
  for (const node of knowledgeNodes) {
    for (const id of node.eventIds) {
      assert.ok(validIds.has(id), `${node.id} refers to unknown event ${id}`);
    }
  }

  const reachableIds = new Set(knowledgeTree.flatMap(getNodeEventIds));
  assert.deepEqual([...reachableIds].sort(), [...validIds].sort());
});

test('cross-links resolve, avoid self-links, and preserve the important method overlaps', () => {
  for (const node of knowledgeNodes) {
    assert.equal(new Set(node.relatedNodeIds ?? []).size, node.relatedNodeIds?.length ?? 0);
    for (const id of node.relatedNodeIds ?? []) {
      assert.notEqual(id, node.id);
      assert.ok(getKnowledgeNode(id), `${node.id} refers to unknown node ${id}`);
    }
  }

  assert.ok(getKnowledgeNode('neural')!.relatedNodeIds!.includes('reinforcement'));
  assert.ok(getKnowledgeNode('reinforcement')!.relatedNodeIds!.includes('neural'));
  assert.ok(getKnowledgeNode('attention')!.relatedNodeIds!.includes('sequence-modeling'));
  assert.ok(getKnowledgeNode('sequence-modeling')!.relatedNodeIds!.includes('attention'));
  assert.ok(getNodeEventIds('neural').includes('alphago-2016'));
  assert.ok(getNodeEventIds('reinforcement').includes('alphago-2016'));
  assert.ok(getNodeEventIds('search-planning').includes('alphago-2016'));
});

test('descendant aggregation deduplicates events without inheriting related-node links', () => {
  const fixture: KnowledgeNode = {
    id: 'fixture', title_zh: '示例', title_en: 'Example', description_zh: '测试', description_en: 'Test',
    eventIds: ['turing-1950'],
    relatedNodeIds: ['neural'],
    children: [{
      id: 'fixture-child', title_zh: '子节点', title_en: 'Child', description_zh: '测试', description_en: 'Test',
      eventIds: ['turing-1950', 'svm-1995'],
      children: [{
        id: 'fixture-grandchild', title_zh: '孙节点', title_en: 'Grandchild', description_zh: '测试', description_en: 'Test',
        eventIds: ['svm-1995', 'random-forest-2001'],
      }],
    }],
  };

  assert.deepEqual(getNodeEventIds(fixture), ['turing-1950', 'svm-1995', 'random-forest-2001']);
  assert.deepEqual(flattenKnowledgeNodes([fixture]).map(node => node.id), ['fixture', 'fixture-child', 'fixture-grandchild']);
  assert.deepEqual(getNodeEvents(fixture).map(event => event.id), ['turing-1950', 'svm-1995', 'random-forest-2001']);
});

test('event lists are chronological, deduplicated, and do not mutate the catalog', () => {
  const originalOrder = events.map(event => event.id);
  for (const node of knowledgeNodes) {
    const selected = getNodeEvents(node);
    assert.equal(new Set(selected.map(event => event.id)).size, selected.length);
    assert.equal(selected.length, getNodeEventIds(node).length);
    for (let i = 1; i < selected.length; i += 1) {
      assert.ok(selected[i - 1].date <= selected[i].date, `${node.id} is out of chronological order`);
    }
  }
  assert.deepEqual(events.map(event => event.id), originalOrder);
});

test('hierarchy paths include ancestors and unknown selections stay empty', () => {
  assert.deepEqual(getNodePath('diffusion-generation').map(node => node.id), ['neural', 'generative-models', 'diffusion-generation']);
  assert.deepEqual(getNodePath('attention').map(node => node.id), ['neural', 'attention-transformers', 'attention']);
  assert.equal(getKnowledgeNode('missing'), undefined);
  assert.deepEqual(getNodePath('missing'), []);
  assert.deepEqual(getNodeEventIds('missing'), []);
  assert.deepEqual(getNodeEvents('missing'), []);
});

test('application context does not force undisclosed products into an architecture branch', () => {
  assert.ok(getNodeEventIds('visual-scientific-applications').includes('midjourney-2022'));
  assert.ok(!getNodeEventIds('diffusion-generation').includes('midjourney-2022'));
  assert.ok(getNodeEventIds('language-applications').includes('claude-35-2025'));
  assert.ok(!getNodeEventIds('transformer-language-models').includes('claude-35-2025'));
  assert.ok(!getNodeEventIds('deep-reinforcement-learning').includes('deep-blue-1997'));
});
