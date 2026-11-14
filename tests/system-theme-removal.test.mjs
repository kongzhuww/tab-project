import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { build } from 'esbuild';
import vm from 'node:vm';
import { loadTsModule } from './helpers/load-ts.mjs';

const { normalizeSystemTheme } = await loadTsModule('src/theme/system-theme.ts');

test('legacy and unknown themes normalize safely', () => {
  assert.equal(normalizeSystemTheme('endfield'), 'dark');
  assert.equal(normalizeSystemTheme('lonetrail'), 'lonetrail');
  assert.equal(normalizeSystemTheme('dark'), 'dark');
  assert.equal(normalizeSystemTheme('light'), 'light');
  assert.equal(normalizeSystemTheme(null), 'light');
  assert.equal(normalizeSystemTheme('unexpected'), 'light');
});

test('first-paint initialization migrates old UI themes without touching startup animation', async () => {
  const result = await build({ entryPoints:['src/theme/theme-init.ts'], bundle:true, format:'iife', write:false, platform:'browser' });
  for (const [oldTheme, expected] of [['endfield', 'dark'], ['lonetrail', 'lonetrail']]) {
    const values = new Map([['theme',oldTheme], ['showStartupAnimation','1'], ['startupAnimationStyle','endfield']]);
    const document = { documentElement: { dataset:{}, classList:{ add(){} } } };
    const localStorage = { getItem:key=>values.get(key) ?? null, setItem:(key,value)=>values.set(key,value) };
    vm.runInNewContext(result.outputFiles[0].text, {document,localStorage});
    assert.equal(document.documentElement.dataset.theme, expected);
    assert.equal(values.get('theme'), expected);
    assert.equal(document.documentElement.dataset.startupStyle, 'endfield');
    assert.equal(values.get('startupAnimationStyle'), 'endfield');
  }
});

test('removed Endfield UI selectors remain absent while Warm Paper styles are restored', async () => {
  async function files(dir) {
    const entries = await readdir(dir, { withFileTypes:true });
    return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]))).flat();
  }
  for (const path of [...await files('src'), 'newtab-search.html'].filter(path => /\.(?:css|vue|html)$/.test(path))) {
    const text = await readFile(path, 'utf8');
    assert.doesNotMatch(text, /data-theme\s*=\s*["']endfield["']/, path);
  }
  assert.match(await readFile('src/styles/newtab-themes.css', 'utf8'), /data-theme="lonetrail"/);
});

test('settings and side panel only expose or render supported system themes', async () => {
  const settings = await readFile('src/settings/SettingsView.vue','utf8');
  const sidepanel = await readFile('src/sidepanel/SidePanelApp.vue','utf8');
  const systemThemes = settings.split('const SYSTEM_THEMES =')[1].split('const activeThemeId')[0];
  assert.match(systemThemes, /id: "light"/); assert.match(systemThemes, /id: "dark"/);
  assert.match(systemThemes, /id: "lonetrail"/);
  assert.doesNotMatch(systemThemes, /id: "endfield"/);
  assert.match(await readFile('src/i18n/locales/zh.ts','utf8'), /"theme\.lonetrail": "暖纸色"/);
  assert.match(sidepanel, /normalizeSystemTheme\(data\.theme\)/);
  assert.match(sidepanel, /normalizeSystemTheme\(changes\.theme\.newValue\)/);
});
