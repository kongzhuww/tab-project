import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const bundle = await build({
  entryPoints: [fileURLToPath(new URL('../src/bilibili/bili-favorites-store.ts', import.meta.url))],
  bundle: true, format: 'esm', write: false, platform: 'node', target: 'node20', external: ['node:*'],
});
const { biliFavoritesController: controller, biliFavoritesState: state, favoriteGridColumns } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);

test('favorite grid recalculates columns from its content width', () => {
  assert.equal(favoriteGridColumns(1077, 168), 5);
  assert.equal(favoriteGridColumns(1078, 168), 6);
  assert.equal(favoriteGridColumns(1260, 168), 7);
  assert.equal(favoriteGridColumns(2000, 168), 7);
  assert.equal(favoriteGridColumns(320, 145), 2);
  assert.equal(favoriteGridColumns(150, 145), 1);
});

test('resize requests three rows at the previous position; HTTP 412 keeps the loaded page', async t => {
  const previousFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = previousFetch; });
  const calls = [];
  let status = 200;
  globalThis.fetch = async url => {
    const params = new URL(url).searchParams;
    const page = Number(params.get('pn'));
    const size = Number(params.get('ps'));
    calls.push([page, size]);
    if (status !== 200) return new Response(null, { status });
    const medias = Array.from({ length: size }, (_, i) => ({ id: (page - 1) * size + i + 1, title: `Video ${i}` }));
    return Response.json({ code: 0, data: { info: { title: '收藏夹', media_count: 100 }, medias, has_more: true } });
  };
  state.activeFolderId = '123';
  controller.setOrganizerColumns(7);
  await controller.loadFolderVideos('123', 3);
  assert.equal(state.organizer.videos.length, 21);
  assert.equal(state.organizer.totalPages, 5);
  controller.setOrganizerColumns(5);
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(calls, [[3, 21], [3, 15]]);
  assert.equal(state.organizer.videos.length, 15);
  assert.equal(state.organizer.pageSize, 15);
  assert.equal(state.organizer.totalPages, 7);
  const videos = state.organizer.videos.map(v => v.id);
  status = 412;
  await controller.loadFolderVideos('123', 4);
  assert.equal(state.organizer.error, 'B 站暂时加载失败，请稍后再试。');
  assert.equal(state.organizer.page, 3);
  assert.deepEqual(state.organizer.videos.map(v => v.id), videos);
});
