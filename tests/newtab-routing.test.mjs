import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/background/tab-manager.ts', import.meta.url))], bundle: true, format: 'esm', platform: 'node', write: false, plugins: [{ name: 'notifications-mock', setup(build) {
  build.onResolve({ filter: /^\.\/notifications$/ }, () => ({ path: 'mock', namespace: 'test' }));
  build.onLoad({ filter: /.*/, namespace: 'test' }, () => ({ contents: 'export function flashBadge() {}', loader: 'js' }));
}}] });
const { routeNewTab, cleanupOrReplaceBrowserDefaultNewTabs, openOrFocusNewTab } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const base = 'chrome-extension://test/';

test('new tabs route by quick-search setting and ignore retired one-tab setting', async t => {
  const previous = globalThis.chrome;
  t.after(() => { globalThis.chrome = previous; });
  let settings = {};
  globalThis.chrome = { runtime: { getURL: path => base + path }, storage: { local: { get: async () => settings } } };
  const route = () => new Promise(resolve => routeNewTab(resolve));
  assert.equal((await route()).action, 'open-home');
  settings = { singleNewTab: true, oneNewTab: true };
  assert.equal((await route()).action, 'open-search');
  settings = { enableQuickSearch: false, oneNewTab: true };
  assert.equal((await route()).action, 'open-home');
  settings = { enableQuickSearch: true, oneNewTab: true };
  assert.deepEqual((await Promise.all([route(), route()])).map(x => x.action), ['open-search', 'open-search']);
});

test('home shortcut returns from quick search and prefers an existing main page', async t => {
  const previous = globalThis.chrome;
  t.after(() => { globalThis.chrome = previous; });
  let tabs = [{ id: 1, windowId: 1, url: base + 'newtab-search.html', active: true }];
  const actions = [];
  globalThis.chrome = {
    runtime: { getURL: path => base + path },
    windows: { update: async (id, change) => actions.push(['window', id, change]) },
    tabs: { query: async () => tabs, update: async (id, change) => actions.push(['update', id, change]) }
  };
  await openOrFocusNewTab();
  assert.deepEqual(actions[0], ['update', 1, { url: base + 'newtab.html' }]);
  tabs = [...tabs, { id: 2, windowId: 1, url: base + 'newtab.html' }];
  actions.length = 0;
  await openOrFocusNewTab();
  assert.deepEqual(actions.at(-1), ['update', 2, { active: true }]);
});

test('cleanup redirects browser new tabs without closing tabs, even with retired setting', async t => {
  const previous = globalThis.chrome;
  t.after(() => { globalThis.chrome = previous; });
  const actions = [];
  globalThis.chrome = {
    runtime: { getURL: path => base + path },
    storage: { local: { get: async () => ({ oneNewTab: true, enableQuickSearch: true }) } },
    tabs: { query: async () => [
      { id: 1, windowId: 1, url: base + 'newtab.html' },
      { id: 2, windowId: 1, url: 'about:blank', title: '' },
      { id: 3, windowId: 1, url: 'chrome://newtab/' }
    ], update: async (id, change) => actions.push(['update', id, change]), remove: async id => actions.push(['remove', id]) }
  };
  await cleanupOrReplaceBrowserDefaultNewTabs();
  assert.deepEqual(actions, [['update', 3, { url: base + 'newtab-search.html' }]]);
});
