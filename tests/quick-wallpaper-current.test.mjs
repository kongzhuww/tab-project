import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

const mocks = {
  '../wallpaper/opfs-storage': 'export async function loadActiveWallpaperFromOpfs() { return null; } export async function saveActiveWallpaperToOpfs() {}',
  '../wallpaper/audio-visualizer': 'export function startAudioSpectrumStream() {} export function stopAudioSpectrumStream() {}'
};
const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/services/wallpaper.service.ts', import.meta.url))], bundle: true, format: 'esm', write: false, platform: 'node', plugins: [{ name: 'wallpaper-mocks', setup(build) {
  build.onResolve({ filter: /^\.\.\/wallpaper\/(opfs-storage|audio-visualizer)$/ }, args => ({ path: args.path, namespace: 'test' }));
  build.onLoad({ filter: /.*/, namespace: 'test' }, args => ({ contents: mocks[args.path], loader: 'js' }));
}}] });
const moduleUrl = `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`;
const { WallpaperService } = await import(moduleUrl);

test('quick search renders the saved wallpaper without a launcher element and ignores stale local cache', async t => {
  const previous = { chrome: globalThis.chrome, document: globalThis.document, localStorage: globalThis.localStorage };
  t.after(() => { for (const [key, value] of Object.entries(previous)) Object.defineProperty(globalThis, key, { value, configurable: true, writable: true }); });
  let stored = { heroBackground: 'https://example.com/custom.jpg' };
  const cache = new Map([['lw-current-wallpaper', JSON.stringify('assets/newtab-mountains.png')]]);
  const host = { children: [], replaceChildren() { this.children = []; }, appendChild(item) { this.children.push(item); } };
  globalThis.document = { getElementById: id => id === 'hero-background-media' ? host : null, createElement: tag => ({ tag }) };
  globalThis.chrome = { runtime: { getURL: path => `chrome-extension://test/${path}` }, storage: { local: { get(_keys, cb) { cb(stored); } } } };
  globalThis.localStorage = { getItem: key => cache.get(key) ?? null, setItem: (key, value) => cache.set(key, value) };
  await WallpaperService.initWallpaper();
  assert.equal(host.children[0].src, 'https://example.com/custom.jpg');
  assert.equal(JSON.parse(cache.get('lw-current-wallpaper')), 'https://example.com/custom.jpg');
  stored = {};
  cache.clear();
  await WallpaperService.initWallpaper();
  assert.equal(host.children[0].src, 'chrome-extension://test/assets/newtab-mountains.png');
  stored = { heroBackground: { type: 'none' } };
  await WallpaperService.initWallpaper({ fallbackWhenNone: true });
  assert.equal(host.children[0].src, 'chrome-extension://test/assets/newtab-mountains.png');
});

test('quick wallpaper follows repeated live changes between custom and image styles', async t => {
  const previous = { chrome: globalThis.chrome, document: globalThis.document };
  t.after(() => { for (const [key, value] of Object.entries(previous)) Object.defineProperty(globalThis, key, { value, configurable: true, writable: true }); });
  let listener;
  const host = { children: [], replaceChildren() { this.children = []; }, appendChild(item) { this.children.push(item); } };
  globalThis.document = { getElementById: id => id === 'hero-background-media' ? host : null, createElement: tag => ({ tag, style: {} }), addEventListener() {} };
  globalThis.chrome = { runtime: { getURL: path => `chrome-extension://test/${path}` }, storage: { onChanged: { addListener(fn) { listener = fn; } } } };
  await import(`${moduleUrl}#live`);
  const style = { type: 'style', style: 'background:red' };
  listener({ heroBackground: { newValue: style } }, 'local');
  assert.equal(host.children[0].tag, 'div');
  listener({ heroBackground: { newValue: 'https://example.com/photo.png' } }, 'local');
  assert.equal(host.children[0].tag, 'img');
  listener({ heroBackground: { newValue: style } }, 'local');
  assert.equal(host.children[0].tag, 'div');
});
