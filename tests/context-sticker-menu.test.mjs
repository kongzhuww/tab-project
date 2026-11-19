import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

const mocks = {
  '../stickers/library-repository': `export class StickerLibraryRepository { constructor() {} async readRoot(){ return globalThis.__stickerTest.root } async find(){ return globalThis.__stickerTest.index } async save(index){ globalThis.__stickerTest.savedIndex = index } }`,
  '../stickers/sticker-db': `export async function saveSticker(...args){ globalThis.__stickerTest.builtin = args }`,
  '../stickers/library-index': `export const LIBRARY_CHANGE_KEY='stickerLibraryIndexRevision'; export function cloneLibraryIndex(index){ return { ...index, images:[...index.images] } }`,
  '../stickers/settings-keys': `export const STICKER_ROOT_NAME_KEY='stickerRootFolderName';`,
  '../stickers/original-files': `export async function writeStickerOriginal(...args){ globalThis.__stickerTest.write=args; return {fileName:'a.png', handle:{}} } export async function readStickerOriginal(){ return {size:3,lastModified:123} }`
};
const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/background/context-sticker.ts', import.meta.url))], bundle: true, format: 'esm', platform: 'node', write: false, plugins: [{ name: 'mock-sticker-io', setup(build) {
  build.onResolve({ filter: /^\.\.\/stickers\/(library-repository|sticker-db|library-index|settings-keys|original-files)$/ }, args => ({ path: args.path, namespace: 'test' }));
  build.onLoad({ filter: /.*/, namespace: 'test' }, args => ({ contents: mocks[args.path], loader: 'js' }));
}}] });
const { saveContextSticker } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);

test('context image saves to Agent built-in library or configured directory', async t => {
  const old = globalThis.chrome;
  t.after(() => { globalThis.chrome = old; delete globalThis.__stickerTest; });
  let settings = {};
  globalThis.chrome = { storage: { local: { get: async () => settings, set: async patch => Object.assign(settings, patch) } } };
  const blob = new Blob(['abc'], { type: 'image/png' });
  globalThis.__stickerTest = { root: null };
  await saveContextSticker(blob, 'png');
  assert.deepEqual(globalThis.__stickerTest.builtin.slice(1), ['图片.png', '默认', 'context-menu']);
  settings = { stickerRootFolderName: '图库' };
  await assert.rejects(saveContextSticker(blob, 'png'), /重新授权/);
  const root = { queryPermission: async () => 'granted' };
  const index = { images: [], groups: [] };
  globalThis.__stickerTest = { root, index };
  await saveContextSticker(blob, 'png');
  assert.equal(globalThis.__stickerTest.savedIndex.images[0].path, 'a.png');
  assert.equal(globalThis.__stickerTest.savedIndex.images[0].groupId, '');
  assert.equal(index.images.length, 0);
  globalThis.__stickerTest = { root: { queryPermission: async () => 'prompt' }, index };
  await assert.rejects(saveContextSticker(blob, 'png'), /写入权限/);
  assert.equal(globalThis.__stickerTest.write, undefined);
});

test('browser menu adds sticker action without replacing the existing download action', async () => {
  const [background, todoist, music] = await Promise.all(['src/background/index.ts','src/todoist/TodoistWorkspace.vue','src/music/NeteaseWorkspaceDialog.vue'].map(path => readFile(new URL(`../${path}`, import.meta.url),'utf8')));
  assert.match(background, /lw-save-image-to-fav/);
  assert.match(background, /lw-save-image-to-stickers/);
  assert.match(background, /saveContextSticker\(blob/);
  assert.doesNotMatch(todoist, /id="todoist-workspace-refresh"/);
  assert.doesNotMatch(music, /@click="refreshNetease"/);
});
