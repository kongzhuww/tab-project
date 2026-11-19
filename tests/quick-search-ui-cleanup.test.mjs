import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('quick search has no theme and home buttons, and settings explains its actual trigger', async () => {
  const [search, settings, zh, bootstrap] = await Promise.all(['src/search/SearchLauncher.vue', 'src/settings/SettingsView.vue', 'src/i18n/locales/zh.ts', 'src/bootstrap/main.ts'].map(read));
  assert.doesNotMatch(search, /id="theme-toggle"|id="enter-home-btn"/);
  assert.match(search, /event\.altKey/);
  assert.doesNotMatch(settings, /v-model="form\.oneNewTab"/);
  assert.match(settings, /v-model="form\.enableQuickSearch"/);
  assert.match(settings, /settings\.toggle\.quickSearchHelp/);
  assert.match(zh, /开启极速搜索/);
  assert.doesNotMatch(zh, /只保留一个新标签页/);
  assert.match(bootstrap, /routeNewTab/);
});

test('Bilibili folder and radio header refresh controls are removed', async () => {
  const source = await read('src/bilibili/BilibiliWorkspace.vue');
  assert.doesNotMatch(source, /class="hero-action-btn btn-refresh"/);
  assert.doesNotMatch(source, /dispatch\('radio-refresh'\)/);
  assert.match(source, /已登录，点击刷新/);
});
