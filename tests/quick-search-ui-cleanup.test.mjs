import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('quick search provides a direct home link and settings explains its actual trigger', async () => {
  const [search, settings, zh, bootstrap, html] = await Promise.all(['src/search/SearchLauncher.vue', 'src/settings/SettingsView.vue', 'src/i18n/locales/zh.ts', 'src/bootstrap/main.ts', 'newtab-search.html'].map(read));
  assert.doesNotMatch(search, /id="theme-toggle"|id="enter-home-btn"/);
  assert.match(search, /event\.altKey/);
  assert.match(html, /<a id="enter-home-btn"[^>]*href="newtab\.html"/);
  assert.ok(html.indexOf('id="enter-home-btn"') < html.indexOf('id="vue-search-launcher-root"'));
  assert.match(settings, /cfg\.singleNewTab === true\) form\.enableQuickSearch = true/);
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
