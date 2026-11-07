import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const read = path => readFile(new URL('../src/' + path, import.meta.url), 'utf8');

test('global settings no longer exposes directory categories or sticker settings links', async () => {
  const settings = await read('settings/SettingsView.vue');
  const store = await read('settings/store.ts');
  assert.doesNotMatch(settings, /StorageSettings|requestedStorageTarget|id: "storage"/);
  assert.doesNotMatch(store, /StorageSettingsTarget|requestedStorageTarget|"bili-cache"|"stickers"/);
  for (const file of ['chat/ChatStickerPicker.vue', 'stickers/StickerBoard.vue']) {
    assert.doesNotMatch(await read(file), /settingsController|图库设置/);
  }
});

test('cache page opens its own inline settings and preserves the directory implementation', async () => {
  const workspace = await read('bilibili/BilibiliWorkspace.vue');
  assert.match(workspace, /<BiliCacheSettingsView v-if="cacheSettingsOpen"[^>]+@back="cacheSettingsOpen = false"/);
  assert.match(workspace, /@click="cacheSettingsOpen = true"/);
  assert.match(workspace, /if \(!active\) cacheSettingsOpen.value = false/);
  assert.doesNotMatch(await read('bilibili/channel-actions-router.ts'), /settingsController|cache-open-settings/);
  const view = await read('bilibili/BiliCacheSettingsView.vue');
  assert.match(view, /<BiliSettingsPanel :active="active"/);
  assert.match(view, /返回缓存视频/);
  assert.doesNotMatch(view, /<Teleport|backdrop|aria-modal/);
  const panel = await read('bilibili/BiliSettingsPanel.vue');
  assert.match(panel, /await saveConfiguredCacheDirectory\(handle\)/);
  assert.match(panel, /@click="readDirectory"/);
});
