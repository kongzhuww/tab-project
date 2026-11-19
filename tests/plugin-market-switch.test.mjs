import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

test('default modules can be disabled and restored without changing other preferences', async t => {
  const old = { window: globalThis.window, localStorage: globalThis.localStorage, navigator: globalThis.navigator, CustomEvent: globalThis.CustomEvent };
  t.after(() => { for (const [key, value] of Object.entries(old)) Object.defineProperty(globalThis, key, { value, configurable: true, writable: true }); });
  const data = new Map([['logicweaver_installed_dock_modules', JSON.stringify(['music'])]]);
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) } });
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { addEventListener() {}, dispatchEvent() {} } });
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { locks: { request: async (_name, _options, fn) => fn() } } });
  Object.defineProperty(globalThis, 'CustomEvent', { configurable: true, value: class CustomEvent {} });
  const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/modules/market-store.ts', import.meta.url))], bundle: true, format: 'esm', write: false, platform: 'node', target: 'node20' });
  const { pluginMarketController: market } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
  assert.equal(market.isInstalled('daily-bilibili'), true);
  assert.equal(await market.uninstall('daily-bilibili'), true);
  assert.equal(market.isInstalled('daily-bilibili'), false);
  assert.equal(market.isInstalled('music'), true);
  market.open();
  assert.equal(market.isInstalled('daily-bilibili'), false);
  assert.equal(await market.install('daily-bilibili'), true);
  assert.equal(market.isInstalled('daily-bilibili'), true);
  await market.uninstall('music');
  assert.equal(market.isInstalled('music'), false);
  assert.equal(market.isInstalled('daily-bilibili'), true);
});
