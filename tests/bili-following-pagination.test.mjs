import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

const bundle = await build({
  entryPoints: [fileURLToPath(new URL('../src/bilibili/following-reader.ts', import.meta.url))],
  bundle: true, format: 'esm', write: false, platform: 'node',
  plugins: [{ name: 'mock-api', setup(build) {
    build.onResolve({ filter: /services\/bilibili\.service$/ }, () => ({ path: 'mock', namespace: 'test' }));
    build.onLoad({ filter: /.*/, namespace: 'test' }, () => ({ contents: 'export const bilibiliService = { api: (...args) => globalThis.__followingTestApi(...args) };', loader: 'js' }));
  }}]
});
const { readFollowingFeed } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);

test('following pages retain unused videos from the same API response', async t => {
  t.after(() => { delete globalThis.__followingTestApi; });
  const videos = Array.from({ length: 30 }, (_, i) => ({ modules: { module_dynamic: { major: { archive: { bvid: `BV${i}`, title: `video ${i}` } } }, module_author: {} } }));
  globalThis.__followingTestApi = async url => url.includes('/nav') ? { isLogin: true, mid: 1 } : { items: videos, offset: '', has_more: false };
  const input = { feed: { page: 1, pageSize: 18, offsetHistory: [''], currentGroupId: '__all__', selectedUpMid: '', updateBaseline: '' }, followings: [], reset: false, signal: new AbortController().signal, check() {}, readStorage: async () => ({}), getAggregateCache() {}, readUpVideos: async () => [] };
  const first = await readFollowingFeed(input);
  assert.equal(first.feed.videos.length, 18);
  assert.equal(first.feed.hasMore, true);
  const second = await readFollowingFeed({ ...input, feed: { ...first.feed, page: 2, offsetHistory: ['', first.feed.nextOffset] } });
  assert.deepEqual(second.feed.videos.map(v => v.title), Array.from({ length: 12 }, (_, i) => `video ${i + 18}`));
  assert.equal(second.feed.hasMore, false);
});
