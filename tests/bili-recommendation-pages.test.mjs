import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/bilibili/recommendations.ts', import.meta.url))], bundle: true, format: 'esm', platform: 'node', write: false });
const { BiliRecommendations } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);

test('recommendation pagination restores visited pages without another request', async () => {
  const calls = [], snapshots = [];
  let scrolled = 0;
  const recommendations = new BiliRecommendations({ api: async url => {
    const params = new URL(url).searchParams;
    const fresh = Number(params.get('fresh_idx'));
    calls.push(fresh);
    return { item: Array.from({ length: Number(params.get('ps')) }, (_, i) => ({ bvid: `BV${fresh}-${i}`, title: `${fresh}-${i}` })) };
  }, publish: snapshot => snapshots.push(snapshot), scrollToStart: () => scrolled++ });
  recommendations.setActive(true);
  recommendations.state.pageSize = 18;
  await recommendations.loadRecommendations(true);
  const first = recommendations.state.videos.map(v => v.bvid);
  assert.equal(first.length, 18);
  await recommendations.goToPage(2);
  const second = recommendations.state.videos.map(v => v.bvid);
  assert.notDeepEqual(second, first);
  await recommendations.goToPage(1);
  assert.deepEqual(recommendations.state.videos.map(v => v.bvid), first);
  await recommendations.goToPage(2);
  assert.deepEqual(recommendations.state.videos.map(v => v.bvid), second);
  assert.deepEqual(calls, [1, 2]);
  assert.equal(scrolled, 3);
  recommendations.state.pageSize = 21;
  await recommendations.loadRecommendations(true);
  assert.equal(recommendations.state.videos.length, 21);
  assert.equal(recommendations.state.page, 1);
  assert.equal(snapshots.at(-2).specialPage, 1);
});

test('following groups are in the header and recommendations have bottom pagination', async () => {
  const source = await readFile(new URL('../src/bilibili/BilibiliWorkspace.vue', import.meta.url), 'utf8');
  const following = source.split('id="fo-vue-following-main"')[1].split('</header>')[0];
  assert.match(following, /fo-up-groups-bar/);
  const recommendations = source.split('id="fo-vue-recommend-main"')[1].split('id="fo-vue-following-main"')[0];
  assert.doesNotMatch(recommendations, /recommendations-refresh|special-play-page|fo-feed-badge/);
  assert.match(recommendations, /recommendations-page/);
});
