import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadTsModule } from './helpers/load-ts.mjs';

const { parseRss, rssUrl } = await loadTsModule('src/aihot/rss.ts');
const node = (localName, textContent = '', attributes = {}, children = []) => ({
  localName, textContent, children, getAttribute: name => attributes[name] ?? null
});
function parse(root, error = false) {
  const previous = globalThis.DOMParser;
  globalThis.DOMParser = class { parseFromString() { return { documentElement: root, querySelector: () => error ? {} : null }; } };
  try { return parseRss('', 'https://example.com/feeds/news.xml'); }
  finally { if (previous === undefined) delete globalThis.DOMParser; else globalThis.DOMParser = previous; }
}

test('RSS items are plain text and only safe article links are returned', () => {
  const good = node('item', '', {}, [node('title', '新闻'), node('link', '/post'), node('description', '<b>摘要</b>')]);
  const unsafe = node('item', '', {}, [node('title', 'bad'), node('link', 'javascript:alert(1)')]);
  const result = parse(node('rss', '', {}, [node('channel', '', {}, [good, unsafe])]));
  assert.deepEqual(result, [{ title:'新闻', url:'https://example.com/post', summary:'摘要', published:'' }]);
  assert.equal(rssUrl('https://user:secret@example.com/feed'), '');
  assert.equal(rssUrl('file:///etc/passwd'), '');
});

test('Atom alternate links and relative URLs resolve against the feed', () => {
  const entry = node('entry', '', {}, [node('title', 'Atom'), node('link', '', { rel:'self', href:'/feed' }), node('link', '', { rel:'alternate', href:'../post' }), node('updated', '2026-01-01')]);
  assert.deepEqual(parse(node('feed', '', {}, [entry])), [{title:'Atom', url:'https://example.com/post', summary:'', published:'2026-01-01'}]);
  assert.throws(() => parse(node('rss'), true), /格式无效/);
});

test('AIHOT remains the default and custom feeds use local settings without credentials', async () => {
  const component = await readFile('src/aihot/RssChannels.vue', 'utf8');
  assert.match(component, /<option value="">AI HOT<\/option>/);
  assert.match(component, /credentials: 'omit'/);
  assert.match(component, /lw-rss-channels-v1/);
  assert.match(component, /request\?\.abort\(\)/);
  const service = await readFile('src/services/aihot.service.ts', 'utf8');
  assert.match(service, /https:\/\/aihot\.news\/api\/v1/);
  assert.doesNotMatch(service, /aihot\.virxact\.com/);
});
