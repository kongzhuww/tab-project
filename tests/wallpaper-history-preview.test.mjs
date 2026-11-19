import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { selectHistoryPreview } from '../src/wallpaper/history-preview.ts';

test('history preview replaces expired object URLs with a live workshop cover or local preview', () => {
  assert.equal(selectHistoryPreview({ previewUrl: 'blob:new' }, ['blob:expired'], undefined), 'blob:new');
  assert.equal(selectHistoryPreview(undefined, ['blob:expired'], 'blob:local'), 'blob:local');
  assert.equal(selectHistoryPreview(undefined, ['blob:expired'], undefined), '');
  assert.equal(selectHistoryPreview({ previewUrl: 'blob:bad', previewBase64: 'data:image/png;base64,AA' }, [], undefined, ['blob:bad']), 'data:image/png;base64,AA');
});

test('workshop history saves a durable cover rather than the temporary blob URL', async t => {
  t.after(() => { delete globalThis.__wallpaperTest; });
  globalThis.__wallpaperTest = [];
  const mocks = {
    './workshop-scanner': `export async function getSavedWorkshopDirectoryHandle() {} export async function verifyDirectoryPermission() { return true; }`,
    './opfs-storage': `export async function saveActiveWallpaperToOpfs() {}`,
    '../services/wallpaper.service': `export const WallpaperService = { setWallpaper: async (...args) => globalThis.__wallpaperTest.push(args), addHistory: async (...args) => globalThis.__wallpaperTest.push(args) };`
  };
  const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/wallpaper/workshop-applier.ts', import.meta.url))], bundle: true, format: 'esm', write: false, platform: 'node', plugins: [{ name: 'mock-workshop', setup(build) {
    build.onResolve({ filter: /^(\.\/workshop-scanner|\.\/opfs-storage|\.\.\/services\/wallpaper\.service)$/ }, args => ({ path: args.path, namespace: 'test' }));
    build.onLoad({ filter: /.*/, namespace: 'test' }, args => ({ contents: mocks[args.path], loader: 'js' }));
  }}] });
  const { applyWorkshopWallpaper } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
  const folderHandle = { async *entries() { yield ['wall.mp4', { kind: 'file', getFile: async () => ({ type: 'video/mp4' }) }]; } };
  await applyWorkshopWallpaper({ id: '1', title: 'Wallpaper', type: 'video', folderHandle, previewUrl: 'blob:temporary', previewBase64: 'data:image/png;base64,AA' });
  assert.equal(globalThis.__wallpaperTest[1][2], 'data:image/png;base64,AA');
  globalThis.__wallpaperTest.length = 0;
  await applyWorkshopWallpaper({ id: '1', title: 'Wallpaper', type: 'video', folderHandle, previewUrl: 'blob:temporary', previewBase64: 'blob:expired' });
  assert.equal(globalThis.__wallpaperTest[1][2], undefined);
});

test('transparency reset saves all four defaults and preview loading follows pages', async () => {
  const settings = await readFile(new URL('../src/settings/SettingsView.vue', import.meta.url), 'utf8');
  assert.match(settings, /@click="resetHomeTransparency"/);
  assert.match(settings, /for \(const key of keys\) form\[key\] = defaultForm\[key\]/);
  assert.match(settings, /handleSave\(false, true, keys\)/);
  assert.match(settings, /watch\(paginatedUserWallpapers/);
});
