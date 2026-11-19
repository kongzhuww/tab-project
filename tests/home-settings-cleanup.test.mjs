import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('standalone backpack is removed while the Agent library stays available', async () => {
  const [builtins, market, agent, frame] = await Promise.all(['src/modules/builtins.ts', 'src/modules/market-store.ts', 'src/multica/MulticaDialog.vue', 'src/backpack/BackpackFrame.vue'].map(read));
  assert.doesNotMatch(builtins, /backpackDockModule/);
  assert.doesNotMatch(market, /id:\s*["']backpack["']/);
  assert.match(agent, /BackpackLibrary/);
  assert.doesNotMatch(frame, /AppWindowFrame/);
});

test('market dock button toggles the window and bulk footer is removed', async () => {
  const [dock, dialog] = await Promise.all(['src/dock/MacDock.vue', 'src/modules/PluginMarketDialog.vue'].map(read));
  assert.match(dock, /if \(pluginMarketController\.state\.isOpen\) pluginMarketController\.close\(\);\s*else pluginMarketController\.open\(\)/);
  assert.doesNotMatch(dialog, /<footer class="pm-footer">/);
});

test('transparency values can be entered and saved alongside sliders', async () => {
  const source = await read('src/settings/SettingsView.vue');
  assert.match(source, /type="number" min="0" max="80"/);
  assert.match(source, /setTransparency\(item\.key, \$event\)/);
  assert.match(source, /Math\.min\(80, Math\.round\(Number\(input\.value\)\)\)/);
});
