import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('homepage switches save independently and retain fixed layout slots', async () => {
  const [settings, launcher, sites, css, options, sync] = await Promise.all([
    'src/settings/SettingsView.vue', 'src/layout/AppLauncher.vue', 'src/launchers/FavoriteSites.vue',
    'src/styles/newtab.css', 'src/services/options.service.ts', 'src/services/sync.service.ts'
  ].map(read));
  for (const key of ['showWeather', 'showSites', 'showHomeNews', 'showHomePlayer']) {
    assert.match(settings, new RegExp(`key: '${key}'`));
    assert.match(options, new RegExp(`"${key}"`));
    assert.match(sync, new RegExp(`"${key}"`));
  }
  assert.match(launcher, /launcher-groups has-sites has-media/);
  assert.match(launcher, /home-module-hidden[^\n]*showWeather/);
  assert.match(launcher, /home-module-hidden[^\n]*showHomePlayer/);
  assert.match(sites, /home-module-hidden[^\n]*showSites/);
  assert.match(sites, /<div class="launcher-media-stack">\s*<LauncherAiHotCard v-if="homePrefsState\.showHomeNews"/);
  assert.match(css, /\.home-module-hidden\s*\{\s*visibility:\s*hidden/);
  assert.doesNotMatch(css, /body\.hide-weather[^\n]*launcher-(?:overview|center)/);
});

test('saved home visibility and subsequent changes do not affect other switches', async t => {
  const saved = { showWeather: false, showSites: true, showHomeNews: false, showHomePlayer: true };
  let listener;
  const old = { chrome: globalThis.chrome, document: globalThis.document };
  t.after(() => { globalThis.chrome = old.chrome; globalThis.document = old.document; });
  globalThis.chrome = { storage: { local: { get: async () => saved }, onChanged: { addListener(fn) { listener = fn; }, removeListener() {} } } };
  const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/launcher/home-prefs.store.ts', import.meta.url))], bundle: true, format: 'esm', write: false, platform: 'node', plugins: [{ name: 'mock-controllers', setup(build) {
    build.onResolve({ filter: /\.\.\/(launchers\/store|bookmarks\/panel-store)$/ }, args => ({ path: args.path, namespace: 'test' }));
    build.onLoad({ filter: /.*/, namespace: 'test' }, args => ({ contents: args.path.includes('launchers') ? 'export const launcherGroupsController = { setPrefs() {} };' : 'export const bookmarkPanelController = { close() {} };', loader: 'js' }));
  }}] });
  const { homePrefsRuntime, homePrefsState } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
  globalThis.document = { body: { classList: { toggle() {} } } };
  homePrefsRuntime.start();
  await new Promise(resolve => setImmediate(resolve));
  for (const [key, value] of Object.entries(saved)) assert.equal(homePrefsState[key], value);
  listener({ showHomePlayer: { newValue: false } }, 'local');
  assert.equal(homePrefsState.showHomePlayer, false);
  assert.equal(homePrefsState.showSites, true);
  assert.equal(homePrefsState.showHomeNews, false);
  homePrefsRuntime.stop();
});
