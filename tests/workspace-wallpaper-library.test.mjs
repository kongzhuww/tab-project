import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

const mocks = {
  '../services/wallpaper.service': `export const DEFAULT_MOUNTAIN_VALUE = 'assets/newtab-mountains.png'; export async function backgroundDbGet(key) { return globalThis.__workspaceLibrary.files[key] || null; } export const WallpaperService = { loadHistory: async () => ({ history:globalThis.__workspaceLibrary.history }) };`,
  './workshop-scanner': `export async function loadCachedWorkshopItems() { return globalThis.__workspaceLibrary.workshop; } export async function getSavedWorkshopDirectoryHandle() { return null; } export async function scanWorkshopDirectory() { return []; } export async function verifyDirectoryPermission() { return false; }`,
  './workshop-applier': `export async function loadWorkshopWallpaperPack(item) { return globalThis.__workspaceLibrary.packs[item.id]; }`,
};
const bundle = await build({ entryPoints:[fileURLToPath(new URL('../src/wallpaper/workspace-wallpaper-library.ts', import.meta.url))], bundle:true, format:'esm', write:false, platform:'node', plugins:[{ name:'wallpaper-library-mocks', setup(build) {
  build.onResolve({ filter:/^(\.\.\/services\/wallpaper\.service|\.\/workshop-scanner|\.\/workshop-applier)$/ }, args => ({ path:args.path, namespace:'mock' }));
  build.onLoad({ filter:/.*/, namespace:'mock' }, args => ({ contents:mocks[args.path], loader:'js' }));
}}] });
const { loadWorkspaceWallpaperOptions, resolveWorkspaceWallpaper } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);

test('workspaces choose existing builtins, library files and linked workshop videos/web independently of home', async t => {
  const image = new Blob(['image'], { type:'image/png' }), video = new Blob(['video'], { type:'video/mp4' });
  globalThis.__workspaceLibrary = { history:[{ id:'local', title:'Saved', value:{ type:'db', storageKey:'one' } }], files:{ one:image }, workshop:[{ id:'1', title:'Video', type:'video' }, { id:'2', title:'Web', type:'web' }, { id:'3', title:'Scene', type:'scene' }], packs:{ '1':{ type:'video', entry:'main.mp4', files:[{ path:'main.mp4', file:video }] }, '2':{ type:'web', entry:'index.html', files:[{ path:'index.html', file:new Blob(['html']) }] } } };
  t.after(() => { delete globalThis.__workspaceLibrary; });
  const options = await loadWorkspaceWallpaperOptions();
  const get = id => options.find(option => option.id === id);
  assert.deepEqual(options.filter(option => option.builtin).map(option => option.id), ['builtin-mountain']);
  assert.equal((await resolveWorkspaceWallpaper(get('builtin-mountain'))).src, 'assets/newtab-mountains.png');
  assert.equal((await resolveWorkspaceWallpaper(get('history:local'))).blob, image);
  const selectedVideo = await resolveWorkspaceWallpaper(get('workshop:1'));
  assert.equal(selectedVideo.kind, 'video'); assert.equal(selectedVideo.blob, video);
  assert.equal((await resolveWorkspaceWallpaper(get('workshop:2'))).pack.entry, 'index.html');
  assert.equal(get('workshop:3').unavailable, true);
});

test('settings select existing wallpapers and do not require another file upload', async () => {
  const settings = await readFile('src/settings/WorkspaceWallpaperSettings.vue', 'utf8');
  assert.match(settings, /loadWorkspaceWallpaperOptions/);
  assert.match(settings, /resolveWorkspaceWallpaper/);
  assert.doesNotMatch(settings, /type="file"/);
  const layer = await readFile('src/wallpaper/WorkspaceWallpaperLayer.vue', 'utf8');
  assert.match(layer, /media.kind === 'video'/); assert.match(layer, /media.kind === 'web'/);
});
