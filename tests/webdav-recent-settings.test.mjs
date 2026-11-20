import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadTsModule } from './helpers/load-ts.mjs';

const { selectSyncSettings } = await loadTsModule('src/services/sync-payload.ts');
const { mergeSyncSettings } = await loadTsModule('src/services/sync-merger.ts');
const { employeeBackup, employeesForRestore } = await loadTsModule('src/services/employee-sync.ts');
const { readSyncSettings, restoreSyncBackup } = await loadTsModule('src/services/sync.service.ts');

test('recent home settings, RSS and Rhine favorites survive payload validation', () => {
  const data = {
    sitesTransparency: 20, weatherTransparency: 5, newsTransparency: 10, playerTransparency: 15,
    defaultSitesView: 'bookmarks', searchEngine: 'google', dockPosition: 'left', theme: 'light',
    'lw-rss-channels-v1': [{ name: 'News', url: 'https://example.com/feed' }],
    'lw-rss-selected-v1': 'https://example.com/feed', msFavoriteSongs: { 1: { cid: '1', name: 'song' } },
  };
  assert.deepEqual(selectSyncSettings(data, Object.keys(data)).sanitized, data);
  assert.throws(() => selectSyncSettings({ msFavoriteSongs: [] }, ['msFavoriteSongs']));
});

test('conflicting RSS and music collections are not silently overwritten by merge', () => {
  assert.throws(() => mergeSyncSettings({ 'lw-rss-channels-v1': [{ url: 'https://a.com' }] }, { 'lw-rss-channels-v1': [] }));
  assert.throws(() => mergeSyncSettings({ msFavoriteSongs: { x: {} } }, { msFavoriteSongs: {} }));
});

test('employees sync without schedules: new devices start paused and existing devices retain their own state', () => {
  const cloud = employeeBackup([{ id: 'a', name: 'analyst', enabled: true, lastRunAt: 123, nextEligibleAt: 456 }]);
  assert.deepEqual(cloud, [{ id: 'a', name: 'analyst', enabled: false }]);
  assert.equal(employeesForRestore(cloud, [])[0].enabled, false);
  assert.deepEqual(employeesForRestore(cloud, [{ id: 'a', enabled: true, lastRunAt: 789 }])[0], { id: 'a', name: 'analyst', enabled: true, lastRunAt: 789 });
  assert.throws(() => employeeBackup([{ name: 'missing id' }]));
});

test('snapshot and restore use live RSS data and keep new employees paused', async t => {
  const oldChrome = globalThis.chrome, oldLocal = globalThis.localStorage;
  t.after(() => { if (oldChrome === undefined) delete globalThis.chrome; else globalThis.chrome = oldChrome; if (oldLocal === undefined) delete globalThis.localStorage; else globalThis.localStorage = oldLocal; });
  const data = { digitalEmployeesV1: [{ id: 'existing', enabled: true, lastRunAt: 42 }], 'lw-rss-channels-v1': [{ name: 'stale', url: 'https://old.test' }] };
  const local = new Map([['lw-rss-channels-v1', JSON.stringify([{ name: 'live', url: 'https://example.test/feed' }])], ['lw-rss-selected-v1', 'https://example.test/feed']]);
  globalThis.localStorage = { getItem: key => local.get(key) ?? null, setItem: (key, value) => local.set(key, String(value)), removeItem: key => local.delete(key) };
  globalThis.chrome = { runtime: {}, storage: { local: {
    get(keys, callback) { const result = keys === null ? { ...data } : Object.fromEntries((Array.isArray(keys) ? keys : [keys]).map(key => [key, data[key]])); if (callback) { callback(result); return; } return Promise.resolve(result); },
    set(values, callback) { Object.assign(data, values); if (callback) callback(); return Promise.resolve(); },
  } } };
  const snapshot = await readSyncSettings();
  assert.equal(snapshot['lw-rss-channels-v1'][0].name, 'live');
  assert.equal(snapshot.digitalEmployeesV1[0].enabled, false);
  await restoreSyncBackup({ settings: { digitalEmployeesV1: [{ id: 'existing', enabled: true }, { id: 'new', enabled: true }], 'lw-rss-channels-v1': [{ name: 'remote', url: 'https://remote.test/feed' }], 'lw-rss-selected-v1': 'https://remote.test/feed' } });
  assert.equal(data.digitalEmployeesV1[0].enabled, true);
  assert.equal(data.digitalEmployeesV1[0].lastRunAt, 42);
  assert.equal(data.digitalEmployeesV1[1].enabled, false);
  assert.equal(data.digitalEmployeeOrganizerSeededV1, true);
  assert.equal(local.get('lw-rss-selected-v1'), 'https://remote.test/feed');
  assert.equal((await readSyncSettings())['lw-rss-channels-v1'][0].name, 'remote');
});

test('RSS restoration retains raw selected URL and watches local changes', async () => {
  const [sync, rss] = await Promise.all([readFile('src/services/sync.service.ts', 'utf8'), readFile('src/aihot/RssChannels.vue', 'utf8')]);
  assert.match(sync, /key === 'lw-rss-selected-v1'/);
  assert.match(sync, /localStorage\.getItem\(key\)/);
  assert.match(rss, /logicweaver:sync-restored/);
});
