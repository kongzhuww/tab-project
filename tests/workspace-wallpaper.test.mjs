import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadTsModule } from './helpers/load-ts.mjs';

const { readWorkspaceWallpaper, saveWorkspaceWallpaper } = await loadTsModule('src/wallpaper/workspace-wallpaper-store.ts');

test('each workspace stores its own image and toggle without replacing the others', async t => {
  const previous = { indexedDB: globalThis.indexedDB, window: globalThis.window, chrome: globalThis.chrome };
  t.after(() => { for (const [key, value] of Object.entries(previous)) {
    if (value === undefined) delete globalThis[key]; else globalThis[key] = value;
  } });
  const records = new Map();
  const db = {
    close() {},
    transaction(_name, mode) {
      const tx = { error: null };
      tx.objectStore = () => ({
        get(key) {
          const request = {};
          queueMicrotask(() => { request.result = records.get(key); request.onsuccess?.(); });
          return request;
        },
        put(value, key) { records.set(key, value); queueMicrotask(() => tx.oncomplete?.()); },
      });
      return tx;
    },
  };
  globalThis.indexedDB = { open() { const req = { result: db }; queueMicrotask(() => req.onsuccess?.()); return req; } };
  globalThis.window = { dispatchEvent() {} };
  globalThis.chrome = { storage: { local: { set: async () => {} } } };
  assert.deepEqual(await readWorkspaceWallpaper('github'), { enabled: false, image: null, name: '' });
  const image = new Blob(['image'], { type: 'image/png' });
  await saveWorkspaceWallpaper('github', { image, name: 'github.png', enabled: true });
  await saveWorkspaceWallpaper('todoist', { image, name: 'todoist.png', enabled: true });
  await saveWorkspaceWallpaper('github', { enabled: false });
  assert.equal((await readWorkspaceWallpaper('github')).name, 'github.png');
  assert.equal((await readWorkspaceWallpaper('github')).enabled, false);
  assert.equal((await readWorkspaceWallpaper('todoist')).enabled, true);
  assert.equal((await readWorkspaceWallpaper('bilibili')).image, null);
  const selection = { kind: 'video', sourceId: 'workshop:42', blob: new Blob(['video'], { type: 'video/mp4' }) };
  await saveWorkspaceWallpaper('bilibili', { selection, name: '动态壁纸', enabled: true });
  assert.equal((await readWorkspaceWallpaper('bilibili')).selection.sourceId, 'workshop:42');
  await saveWorkspaceWallpaper('bilibili', { enabled: false });
  assert.equal((await readWorkspaceWallpaper('bilibili')).selection.blob.type, 'video/mp4');
  await assert.rejects(saveWorkspaceWallpaper('bilibili', { image: new Blob(['bad'], { type: 'text/plain' }) }), /图片/);
});

test('settings and the three workspaces use independent wallpaper slots', async () => {
  const settings = await readFile('src/settings/WorkspaceWallpaperSettings.vue', 'utf8');
  for (const id of ['bilibili', 'todoist', 'github']) assert.ok(settings.includes(`useWorkspaceWallpaper('${id}')`));
  const [bili, todo, github, css] = await Promise.all([
    readFile('src/bilibili/BilibiliWorkspace.vue', 'utf8'), readFile('src/todoist/TodoistWorkspace.vue', 'utf8'),
    readFile('src/github/GitHubWorkspaceCard.vue', 'utf8'), readFile('src/styles/newtab-windows.css', 'utf8'),
  ]);
  assert.match(bili, /biliWallpaperStyle/); assert.match(todo, /todoistWallpaperStyle/); assert.match(github, /githubWallpaperStyle/);
  assert.match(css, /\.todoist-workspace-body\.has-workspace-wallpaper/);
});
