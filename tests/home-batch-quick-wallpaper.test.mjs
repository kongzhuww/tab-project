import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('batch transparency defaults to four checked items and saves selected values together', async () => {
  const view = await read('src/settings/SettingsView.vue');
  assert.match(view, /transparencyBatchSelected\.value = homeCardTransparencyOptions\.map/);
  assert.match(view, /v-model="transparencyBatchSelected"/);
  assert.match(view, /for \(const key of keys\) form\[key\] = value/);
  assert.match(view, /handleSave\(false, true, keys\)/);
});

test('quick search wallpaper is enabled by default and uses the current wallpaper with mountain fallback', async () => {
  const [view, launcher, wallpaper, options, sync] = await Promise.all(['src/settings/SettingsView.vue', 'src/search/SearchLauncher.vue', 'src/services/wallpaper.service.ts', 'src/services/options.service.ts', 'src/services/sync.service.ts'].map(read));
  assert.match(view, /showQuickSearchWallpaper: true/);
  assert.match(launcher, /const showWallpaper = ref\(true\)/);
  assert.match(launcher, /WallpaperService\.initWallpaper\(\{ fallbackWhenNone: true \}\)/);
  assert.match(launcher, /changes\.showQuickSearchWallpaper/);
  assert.match(wallpaper, /DEFAULT_MOUNTAIN_VALUE = "assets\/newtab-mountains\.png"/);
  assert.match(options, /"showQuickSearchWallpaper"/);
  assert.match(sync, /"showQuickSearchWallpaper"/);
});

test('Bilibili video menu adds the selected video to the default radio series', async () => {
  const view = await read('src/bilibili/BilibiliWorkspace.vue');
  assert.match(view, /runContextMenuAction\('add-radio'\)/);
  assert.match(view, /biliRadioController\.addToDefaultSeries/);
  assert.match(view, /parseDurationToSeconds\(video\.duration\)/);
});
