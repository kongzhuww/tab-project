import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadTsModule } from './helpers/load-ts.mjs';

const {
  readExtensionStorage,
  writeExtensionStorage,
  removeExtensionStorage,
  readLocalMirrorJson,
  writeLocalMirrorJson
} = await loadTsModule('src/core/storage-repo.ts');

const {
  SYNC_CONNECTION_GROUPS,
  SENSITIVE_SYNC_KEYS,
  SYNC_DIFF_SETTING_LABELS,
  canonicalJson
} = await loadTsModule('src/services/sync-schema.ts');

test('storage-repo supports callback and promise chrome.storage.local plus lastError rejection', async t => {
  const prevChrome = globalThis.chrome;
  const prevLocalStorage = globalThis.localStorage;
  t.after(() => {
    if (prevChrome === undefined) delete globalThis.chrome; else globalThis.chrome = prevChrome;
    if (prevLocalStorage === undefined) delete globalThis.localStorage; else globalThis.localStorage = prevLocalStorage;
  });

  const store = { alpha: 1 };
  let runtimeError = null;
  globalThis.chrome = {
    runtime: { get lastError() { return runtimeError; } },
    storage: {
      local: {
        get(keys, cb) {
          const list = Array.isArray(keys) ? keys : keys === null ? Object.keys(store) : [keys];
          const res = Object.fromEntries(list.filter(k => k in store).map(k => [k, store[k]]));
          if (cb) { cb(res); return; }
          return Promise.resolve(res);
        },
        set(values, cb) {
          Object.assign(store, values);
          if (cb) { cb(); return; }
          return Promise.resolve();
        },
        remove(keys, cb) {
          for (const k of Array.isArray(keys) ? keys : [keys]) delete store[k];
          if (cb) { cb(); return; }
          return Promise.resolve();
        }
      }
    }
  };

  assert.deepEqual(await readExtensionStorage(['alpha']), { alpha: 1 });
  await writeExtensionStorage({ beta: { ok: true } });
  assert.deepEqual(await readExtensionStorage(null), { alpha: 1, beta: { ok: true } });
  await removeExtensionStorage('alpha');
  assert.equal((await readExtensionStorage(['alpha'])).alpha, undefined);

  runtimeError = { message: 'storage failure' };
  await assert.rejects(() => readExtensionStorage(['beta']), /storage failure/);
  runtimeError = null;

  const map = new Map();
  globalThis.localStorage = {
    getItem: key => map.get(key) ?? null,
    setItem: (key, val) => map.set(key, String(val))
  };
  writeLocalMirrorJson('demo_key', { count: 2 });
  assert.deepEqual(readLocalMirrorJson('demo_key'), { count: 2 });
});

test('sync-schema canonicalJson is deterministic and schema excludes retired keys', () => {
  assert.equal(canonicalJson({ b: 2, a: 1, u: undefined }), canonicalJson({ a: 1, b: 2 }));
  assert.equal(SYNC_DIFF_SETTING_LABELS.showYouTube, undefined);
  assert.ok(SENSITIVE_SYNC_KEYS.has('ghToken'));
  assert.ok(SYNC_CONNECTION_GROUPS.some(group => group.includes('todoistToken')));
});

test('SettingsView delegates WebDAV and Release sections cleanly to dedicated components', async () => {
  const [settings, webdavCard, releaseSection] = await Promise.all([
    readFile('src/settings/SettingsView.vue', 'utf8'),
    readFile('src/sync/WebDavSyncCard.vue', 'utf8'),
    readFile('src/settings/SettingsReleaseSection.vue', 'utf8')
  ]);
  assert.match(settings, /<WebDavSyncCard\s+@notify="notify"\s*\/>/);
  assert.match(settings, /<SettingsReleaseSection\s+:active="props\.active"\s+@notify="notify"\s*\/>/);
  assert.match(webdavCard, /formatBackpackOverwritePrompt/);
  assert.match(releaseSection, /useExtensionUpdates/);
});
