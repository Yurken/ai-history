import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { SearchClient } from '../lib/search/client';
import { buildSearchIndex } from '../lib/search/index';
import { events } from '../lib/data/events';

const index = buildSearchIndex();
const createResponse = () => Response.json(index);
const createClient = () => new SearchClient(async () => createResponse());

test('the published index contains every current event and its current metadata', () => {
  const published = JSON.parse(readFileSync(new URL('../public/search/index.json', import.meta.url), 'utf8'));
  assert.deepEqual(published, index);
  assert.equal(index.length, events.length);
  assert.equal(new Set(index.map(item => item.id)).size, events.length);
});

test('Chinese partial keywords and normalized English titles find the expected event', async () => {
  const client = createClient();
  await client.init();

  assert.equal(client.search('图灵')[0].id, 'turing-1950');
  assert.equal(client.search('  TURING TEST  ')[0].id, 'turing-1950');
  assert.equal(client.search('Ｔｕｒｉｎｇ Ｔｅｓｔ')[0].id, 'turing-1950');
  assert.ok(client.search('神经', events.length).some(item => item.id === 'mcculloch-pitts-1943'));
  assert.ok(client.search('AlphaGo', events.length).some(item => item.id === 'alphago-2016'));
});

test('all query terms must match, titles rank first, and limits remain bounded', async () => {
  const client = createClient();
  await client.init();

  assert.equal(client.search('图灵 1950')[0].id, 'turing-1950');
  assert.equal(client.search('GPT-4')[0].id, 'gpt-4-2023');
  assert.deepEqual(client.search('图灵 completely-unknown-query'), []);
  assert.deepEqual(client.search('   '), []);
  assert.deepEqual(client.search('AI', 0), []);
  assert.deepEqual(client.search('AI', -1), []);
  assert.deepEqual(client.search('AI', Number.POSITIVE_INFINITY), []);
  assert.ok(client.search('AI', 2).length <= 2);
  assert.equal(new Set(client.search('神经', events.length).map(item => item.id)).size, client.search('神经', events.length).length);
});

test('tag, year, category, and the full catalog use the loaded index', async () => {
  const client = createClient();
  assert.deepEqual(client.getAll(), []);
  await client.init();

  assert.deepEqual(client.searchByTag(' FOUNDATION '), index.filter(item => item.tags.includes('foundation')));
  assert.deepEqual(client.searchByYear(1950), index.filter(item => item.year === 1950));
  assert.deepEqual(client.searchByCategory(' PAPER '), index.filter(item => item.category === 'paper'));
  const all = client.getAll();
  assert.equal(all.length, events.length);
  all.pop();
  assert.equal(client.getAll().length, events.length);
});

test('concurrent callers share initialization and wait for the fetched index', async () => {
  let resolveResponse!: (response: Response) => void;
  const pendingResponse = new Promise<Response>(resolve => { resolveResponse = resolve; });
  let requests = 0;
  const client = new SearchClient(async () => {
    requests += 1;
    return pendingResponse;
  });

  const first = client.init();
  const second = client.init();
  assert.equal(first, second);
  assert.equal(requests, 1);
  assert.deepEqual(client.search('图灵'), []);
  resolveResponse(createResponse());
  await Promise.all([first, second]);
  assert.equal(client.search('图灵')[0].id, 'turing-1950');
  await client.init();
  assert.equal(requests, 1);
});

test('HTTP failures are reported and initialization can be retried', async () => {
  let requests = 0;
  const client = new SearchClient(async () => {
    requests += 1;
    return requests === 1 ? new Response('Unavailable', { status: 503 }) : createResponse();
  });

  await assert.rejects(client.init(), /503/);
  assert.deepEqual(client.getAll(), []);
  await client.init();
  assert.equal(requests, 2);
  assert.equal(client.getAll().length, events.length);
});

test('malformed and duplicate index records fail instead of appearing as empty results', async () => {
  for (const invalid of [{ events: index }, [{ ...index[0], tags: null }], [index[0], index[0]]]) {
    const client = new SearchClient(async () => Response.json(invalid));
    await assert.rejects(client.init(), /Invalid search index/);
    assert.deepEqual(client.getAll(), []);
  }
});
