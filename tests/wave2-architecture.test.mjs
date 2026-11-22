import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadTsModule } from './helpers/load-ts.mjs';

const { sendRuntimeMessage, createRuntimeMessageRouter } = await loadTsModule('src/core/runtime-protocol.ts');
const { toSyncRecordsWithTombstones, mergeIdentifiableWithTombstones } = await loadTsModule('src/services/sync-record-merge.ts');
const { fetchAiHotQuickSelectedItems } = await loadTsModule('src/services/aihot-quick.ts');
const { probeNeteaseEndpoint } = await loadTsModule('src/music/settings.ts');
const {
  formatBackpackShortDate,
  formatBackpackFullDate,
  parseBackpackTagsInput,
  excerptArticleContent,
  resolveCategoryName,
} = await loadTsModule('src/backpack/backpack-helpers.ts');

test('runtime-protocol supports callback and promise transports, consumes lastError, and table-dispatches handlers', async () => {
  let lastError = null;
  const callbackRuntime = {
    get lastError() { return lastError; },
    sendMessage(msg, cb) {
      if (msg.type === 'routeNewTab') cb({ ok: true, action: 'open-search' });
      else cb({ ok: true });
    }
  };
  assert.deepEqual(await sendRuntimeMessage({ type: 'routeNewTab' }, { runtime: callbackRuntime }), {
    ok: true,
    action: 'open-search',
  });

  lastError = { message: 'Could not establish connection' };
  assert.equal(await sendRuntimeMessage({ type: 'cleanupNativeTabs' }, { runtime: callbackRuntime }), undefined);
  await assert.rejects(
    () => sendRuntimeMessage({ type: 'native-bridge:send', hostName: 'h', payload: {} }, { runtime: callbackRuntime, throwOnError: true }),
    /Could not establish connection/
  );
  lastError = null;

  const promiseRuntime = {
    sendMessage: async (msg) => ({ ok: true, echo: msg.type }),
  };
  assert.deepEqual(await sendRuntimeMessage({ type: 'bookmarkCurrentPage', tab: {} }, { runtime: promiseRuntime }), {
    ok: true,
    echo: 'bookmarkCurrentPage',
  });

  const router = createRuntimeMessageRouter({
    routeNewTab: () => Promise.resolve({ ok: true, action: 'open-home' }),
    fetchImageForClipboard: () => false,
    boom: () => Promise.reject(new Error('handler failed')),
  });

  const replies = [];
  assert.equal(router({ type: 'unknown' }, {}, r => replies.push(r)), false);
  assert.equal(router({ type: 'fetchImageForClipboard', url: '' }, {}, r => replies.push(r)), false);

  await new Promise(resolve => {
    const keepAlive = router({ type: 'routeNewTab' }, {}, r => {
      replies.push(r);
      resolve();
    });
    assert.equal(keepAlive, true);
  });
  await new Promise(resolve => {
    const keepAlive = router({ type: 'boom' }, {}, r => {
      replies.push(r);
      resolve();
    });
    assert.equal(keepAlive, true);
  });
  assert.deepEqual(replies, [
    { ok: true, action: 'open-home' },
    { ok: false, error: 'handler failed' },
  ]);
});

test('tombstone merge preserves deletions across devices and expires old tombstones when configured', () => {
  const base = toSyncRecordsWithTombstones([
    { id: 'p1', title: 'Prompt 1', updatedAt: 100 },
    { id: 'p2', title: 'Prompt 2', updatedAt: 100 },
  ]);
  const local = toSyncRecordsWithTombstones(
    [{ id: 'p2', title: 'Prompt 2', updatedAt: 100 }],
    [{ id: 'p1', deletedAt: 200, updatedAt: 200 }]
  );
  const remote = toSyncRecordsWithTombstones([
    { id: 'p1', title: 'Prompt 1', updatedAt: 100 },
    { id: 'p2', title: 'Prompt 2', updatedAt: 100 },
    { id: 'p3', title: 'Prompt 3', updatedAt: 300 },
  ]);

  const merged = mergeIdentifiableWithTombstones(base, local, remote);
  assert.equal(merged.ok, true);
  assert.deepEqual(merged.items.map(item => item.id).sort(), ['p2', 'p3']);
  assert.equal(merged.tombstones.length, 1);
  assert.equal(merged.tombstones[0].id, 'p1');

  const pruned = mergeIdentifiableWithTombstones(base, local, remote, { purgeDeletedBefore: 250 });
  assert.equal(pruned.ok, true);
  assert.equal(pruned.tombstones.length, 0);
});

test('service fetch adapters normalize AiHot quick items and probe Netease endpoints', async (t) => {
  const prevFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = prevFetch; });

  globalThis.fetch = async (url) => {
    assert.match(String(url), /\/api\/v1\/items\?mode=selected&window=24h&limit=12/);
    return new Response(JSON.stringify({ items: [{ id: 'a1', title: 'Hello' }] }), { status: 200 });
  };
  const items = await fetchAiHotQuickSelectedItems(12);
  assert.deepEqual(items, [{ id: 'a1', title: 'Hello' }]);

  const okProbe = await probeNeteaseEndpoint('http://localhost:3000/', async (url) => {
    assert.equal(url, 'http://localhost:3000/toplist');
    return new Response(JSON.stringify({ list: [1, 2, 3] }), { status: 200 });
  });
  assert.deepEqual(okProbe, { ok: true, status: 200, count: 3 });

  const failProbe = await probeNeteaseEndpoint('not a valid url');
  assert.equal(failProbe.ok, false);
  assert.ok(failProbe.error);
});

test('backpack helpers format dates, parse tags, truncate excerpts, and resolve categories', () => {
  const ts = new Date(2026, 3, 5).getTime();
  assert.equal(formatBackpackShortDate(ts), '4/5');
  assert.equal(formatBackpackFullDate(ts), '2026-04-05');
  assert.deepEqual(parseBackpackTagsInput('AI, 架构设计， Prompt '), ['AI', '架构设计', 'Prompt']);
  assert.equal(excerptArticleContent('abc', 5), 'abc');
  assert.equal(excerptArticleContent('abcdef', 3), 'abc\n…');
  assert.equal(resolveCategoryName([{ id: 'cat1', name: '工程' }], 'cat1'), '工程');
  assert.equal(resolveCategoryName([], 'missing'), '默认分组');
});

test('CSS cascade layers, Backpack decomposition, and Settings lazy components remain wired cleanly', async () => {
  const [stylesCss, backpackVue, readerDrawerVue, settingsVue] = await Promise.all([
    readFile('src/assets/styles.css', 'utf8'),
    readFile('src/backpack/BackpackDialog.vue', 'utf8'),
    readFile('src/backpack/BackpackArticleReaderDrawer.vue', 'utf8'),
    readFile('src/settings/SettingsView.vue', 'utf8'),
  ]);
  assert.match(stylesCss, /@layer base, themes, components, layout, utilities;/);
  assert.match(stylesCss, /newtab\.css"\s+layer\(base\)/);
  assert.match(stylesCss, /newtab-themes\.css"\s+layer\(themes\)/);
  assert.match(backpackVue, /BackpackArticleReaderDrawer/);
  assert.match(backpackVue, /<style scoped src="\.\/backpack-dialog\.css"><\/style>/);
  assert.doesNotMatch(readerDrawerVue, /:global\(\.bp-container/);
  assert.match(settingsVue, /defineAsyncComponent\(\(\) => import\("\.\.\/sync\/WebDavSyncCard\.vue"\)\)/);
  assert.match(settingsVue, /defineAsyncComponent\(\(\) => import\("\.\/SettingsReleaseSection\.vue"\)\)/);
});
