import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

test('subscriptions start empty and restore only user-added channels', async t => {
  const oldStorage = globalThis.localStorage;
  t.after(() => { globalThis.localStorage = oldStorage; delete globalThis.__subSnapshots; delete globalThis.__subReads; });
  globalThis.localStorage = { getItem() { return null; }, setItem() {} };
  globalThis.__subSnapshots = [];
  globalThis.__subReads = [];
  const mocks = {
    './bili-favorites-store': `export const biliFavoritesController = { state: { organizer: { mode: 'subscription' } }, updateOrganizer: s => globalThis.__subSnapshots.push(s) };`,
    './theater-store': `export const biliTheaterController = { openVideo() {} };`,
    './subscription-reader': `export async function readSubscriptionEditions(input) { globalThis.__subReads.push(input.channel.mid); return { editions: [], cached: true }; }`
  };
  const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/bilibili/subscription-service.ts', import.meta.url))], bundle: true, format: 'esm', write: false, platform: 'node', plugins: [{ name: 'mock-subscription', setup(build) {
    build.onResolve({ filter: /^\.\/(bili-favorites-store|theater-store|subscription-reader)$/ }, args => ({ path: args.path, namespace: 'test' }));
    build.onLoad({ filter: /.*/, namespace: 'test' }, args => ({ contents: mocks[args.path], loader: 'js' }));
  }}] });
  const { BiliSubscriptionCoordinator: Coordinator } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
  const options = custom => ({ suspendEmbeddedPlayback() {}, getUpGroups: () => [], initUpGroups: async () => {}, loadFollowedUps: async () => [], readChannelStorage: async () => ({ biliSubCustomChannelsV1: custom }) });
  const empty = new Coordinator(options([]));
  empty.setSubscriptionActive(true);
  await empty.loadSubVideo();
  assert.deepEqual(Object.keys(empty.subChannels), []);
  assert.deepEqual(globalThis.__subReads, []);
  assert.deepEqual(globalThis.__subSnapshots.findLast(s => s.subscriptionChannels)?.subscriptionChannels, []);
  const restored = new Coordinator(options([{ mid: '123', name: 'My UP' }]));
  restored.setSubscriptionActive(true);
  await restored.loadSubVideo();
  assert.equal(restored.subState.channelKey, 'up-123');
  assert.deepEqual(globalThis.__subReads, ['123']);
  assert.equal(globalThis.__subSnapshots.findLast(s => s.subscriptionChannels).subscriptionTitle, 'My UP');
});
