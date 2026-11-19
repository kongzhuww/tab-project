import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

const result = await build({ entryPoints: [fileURLToPath(new URL('../src/bilibili/horizontal-wheel.ts', import.meta.url))], bundle: true, format: 'esm', platform: 'node', write: false });
const { onFollowingGroupsWheel } = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
function wheel(list, overrides = {}) {
  const event = { currentTarget: list, deltaX: 0, deltaY: 40, deltaMode: 0, ctrlKey: false, metaKey: false, shiftKey: false, prevented: false, stopped: false,
    preventDefault() { this.prevented = true; }, stopPropagation() { this.stopped = true; }, ...overrides };
  onFollowingGroupsWheel(event);
  return event;
}
test('following groups convert vertical wheel movement to horizontal scroll', () => {
  const list = { scrollLeft: 50, scrollWidth: 500, clientWidth: 200 };
  let event = wheel(list);
  assert.equal(list.scrollLeft, 90);
  assert.equal(event.prevented, true);
  assert.equal(event.stopped, true);
  wheel(list, { deltaY: -2, deltaMode: 1 });
  assert.equal(list.scrollLeft, 58);
  event = wheel(list, { deltaX: 50, deltaY: 2 });
  assert.equal(event.prevented, false);
  event = wheel(list, { ctrlKey: true });
  assert.equal(event.prevented, false);
  list.scrollLeft = 300;
  event = wheel(list);
  assert.equal(event.prevented, false);
  assert.equal(event.stopped, false);
});
test('quick search receives the same targeted side drawer messages as the home page', async () => {
  const [background, search, drawer, following, html] = await Promise.all(['src/background/index.ts', 'src/search/SearchLauncher.vue', 'src/sidepanel/drawer-store.ts', 'src/bilibili/BilibiliWorkspace.vue', 'newtab-search.html'].map(path => readFile(new URL(`../${path}`, import.meta.url), 'utf8')));
  assert.match(background, /\["newtab\.html", "newtab-bootstrap\.html", "newtab-search\.html"\]/);
  assert.match(search, /bindSideDrawerMessages\(\)/);
  assert.match(search, /<InPageSideDrawer v-if="mountSideDrawer"/);
  assert.match(drawer, /message\.targetTabId !== currentTabId/);
  assert.match(following, /class="fo-up-groups-list" @wheel="onFollowingGroupsWheel"/);
  assert.match(html, /--panel:/);
});
