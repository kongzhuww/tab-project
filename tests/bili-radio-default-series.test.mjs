import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

const mocks = {
  '../services/bilibili.service': `export const bilibiliService = { getUserNav: async () => ({isLogin:false}) };`,
  './bili-favorites-store': `export const biliFavoritesState = globalThis.__radioTestState = {radioSeries:[],radioQueue:[],radioSeriesName:'',radioFolders:[],radioVideos:[],radioError:'',radioLoading:false};`,
  './radio-player': `export const biliRadioPlayer = {playQueue(){}};`,
  '../notifications/store': `export const notificationController = {fetch(){}};`
};
const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/bilibili/radio-store.ts', import.meta.url))], bundle: true, format: 'esm', write: false, platform: 'node', plugins: [{ name: 'radio-mocks', setup(build) {
  build.onResolve({ filter: /^(\.\.\/services\/bilibili\.service|\.\/bili-favorites-store|\.\/radio-player|\.\.\/notifications\/store)$/ }, args => ({ path: args.path, namespace: 'test' }));
  build.onLoad({ filter: /.*/, namespace: 'test' }, args => ({ contents: mocks[args.path], loader: 'js' }));
}}] });
const code = Buffer.from(bundle.outputFiles[0].text).toString('base64');

test('new users get an empty default series without overwriting saved series', async t => {
  const old = { chrome: globalThis.chrome, localStorage: globalThis.localStorage, window: globalThis.window };
  t.after(() => { for (const [key, value] of Object.entries(old)) Object.defineProperty(globalThis, key, { value, configurable: true, writable: true }); delete globalThis.__radioTestState; });
  let stored = {};
  const local = new Map();
  globalThis.chrome = { storage: { local: { get: async () => structuredClone(stored), set: async value => Object.assign(stored, structuredClone(value)) } } };
  globalThis.localStorage = { getItem: key => local.get(key) ?? null, setItem: (key, value) => local.set(key, value) };
  globalThis.window = { addEventListener() {} };
  const load = async id => import(`data:text/javascript;base64,${code}#${id}`);
  let { biliRadioController: radio } = await load('new');
  await radio.init();
  assert.deepEqual(globalThis.__radioTestState.radioSeries.map(s => [s.name, s.count]), [['默认系列', 0]]);
  assert.equal(globalThis.__radioTestState.radioSeriesName, '默认系列');
  const fresh = await radio.repairStoredSeries();
  assert.equal(fresh.repairedCount, 0); // The untouched default has not written storage.
  // Reload a fresh instance and save a user-selected track into the default series.
  ({ biliRadioController: radio } = await load('save'));
  await radio.init();
  radio.add({ bvid: 'BV123', title: 'Track', author: 'UP', duration: 1, cover: '' });
  await radio.save('默认系列');
  assert.deepEqual(stored.biliRadioSeriesV1.map(s => [s.name, s.items.length]), [['默认系列', 1]]);
  stored = { biliRadioSeriesV1: [{ id: 'mine', name: '我的系列', items: [{ bvid: 'BV1', title: 'Old' }] }] };
  local.clear();
  ({ biliRadioController: radio } = await load('existing'));
  await radio.init();
  const existing = await radio.repairStoredSeries();
  assert.deepEqual(existing.series.map(s => s.name), ['我的系列']);
  stored = { biliRadioSeriesV1: [] };
  ({ biliRadioController: radio } = await load('empty'));
  await radio.init();
  assert.equal((await radio.repairStoredSeries()).repairedCount, 0);
  stored = { biliRadioSeriesV1: [{ id: 'mine', name: '我的系列', items: [{ bvid: 'BV1', title: 'Old' }] }] };
  local.clear();
  ({ biliRadioController: radio } = await load('context-add'));
  const track = { bvid: 'BV2', title: 'New', author: 'UP', cover: '', duration: 91 };
  assert.equal(await radio.addToDefaultSeries(track), true);
  assert.equal(await radio.addToDefaultSeries(track), false);
  assert.deepEqual(stored.biliRadioSeriesV1.map(s => [s.name, s.items.length]), [['我的系列', 1], ['默认系列', 1]]);
  assert.equal(stored.biliRadioSeriesV1[1].items[0].duration, 91);
  await Promise.all([radio.addToDefaultSeries({ ...track, bvid: 'BV3' }), radio.addToDefaultSeries({ ...track, bvid: 'BV4' })]);
  assert.deepEqual(stored.biliRadioSeriesV1[1].items.map(item => item.bvid), ['BV2', 'BV3', 'BV4']);
});
