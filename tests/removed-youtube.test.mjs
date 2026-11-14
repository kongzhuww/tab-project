import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';

const { REMOVED_YOUTUBE_KEYS, removeRetiredYouTubeStorage, removeRetiredYouTubePageStorage } = await loadTsModule('src/core/removed-youtube.ts');

test('retired workspace cleanup removes only its extension data', async () => {
  const data = Object.fromEntries(REMOVED_YOUTUBE_KEYS.map(key => [key, 'old']));
  data.otherModule = 'keep';
  const local = new Map([...Object.entries(data), ['logicweaver:youtubeFavoritesV1', 'old']]);
  globalThis.chrome = { storage: { local: { async remove(keys) { for (const key of keys) delete data[key]; } } } };
  globalThis.localStorage = { removeItem: key => local.delete(key) };
  try {
    await removeRetiredYouTubeStorage();
    removeRetiredYouTubePageStorage();
    for (const key of REMOVED_YOUTUBE_KEYS) { assert.equal(data[key], undefined); assert.equal(local.has(key), false); }
    assert.equal(local.has('logicweaver:youtubeFavoritesV1'), false);
    assert.equal(data.otherModule, 'keep'); assert.equal(local.get('otherModule'), 'keep');
  } finally { delete globalThis.chrome; delete globalThis.localStorage; }
});

test('cleanup reports storage failure so a later start can retry', async () => {
  globalThis.chrome = { storage: { local: { async remove() { throw Error('failed'); } } } };
  try { await assert.rejects(removeRetiredYouTubeStorage(), /failed/); }
  finally { delete globalThis.chrome; }
});
