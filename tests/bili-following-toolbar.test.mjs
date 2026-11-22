import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('follow group manager is in following header rather than collection header', async () => {
  const source = await readFile('src/bilibili/BilibiliWorkspace.vue', 'utf8');
  const start = source.indexOf('id="fo-vue-following-main"');
  const end = source.indexOf('id="fo-vue-subscription-main"', start);
  const following = source.slice(start, end);
  assert.match(following, /id="bili-following-up-group-manager"/);
  assert.match(following, /dispatch\('manage-up-groups'\)/);
  assert.doesNotMatch(following, /following-manage-groups', '(create|manage)'/);
  assert.equal(source.indexOf('id="bili-following-up-group-manager"'), start + following.indexOf('id="bili-following-up-group-manager"'));
  assert.doesNotMatch(source, /id="bili-up-group-manager-top"/);
});

test('subscription transcript and comments keep wheel scrolling during folder targeting', async () => {
  const source = await readFile('src/bilibili/BilibiliWorkspace.vue', 'utf8');
  const handler = source.split('function onLayoutWheel')[1].split('function createCassetteDragGhost')[0];
  assert.match(handler, /\.bili-sub-transcript-body, \.bili-sub-scroll-stage/);
  assert.ok(handler.indexOf('.bili-sub-transcript-body') < handler.indexOf('event.preventDefault()'));
});

test('mini-player keeps its close and collapse actions anchored at narrow widths', async () => {
  const css = await readFile('src/bilibili/BiliFavorites.css', 'utf8');
  const player = await readFile('src/bilibili/BiliMiniPlayer.vue', 'utf8');
  assert.match(css, /\.bili-mini-head\s*\{[^}]*flex-wrap:wrap/);
  assert.match(css, /\.bili-mini-head \.bili-mini-collapse, \.bili-mini-head \.bili-mini-close\s*\{[^}]*position:absolute/);
  assert.match(player, /class="bili-mini-collapse"/);
  assert.match(player, /class="bili-mini-close"/);
});

test('bilibili favorites and feed video covers do not enable drag ghost arrows', async () => {
  const source = await readFile('src/bilibili/BilibiliWorkspace.vue', 'utf8');
  assert.doesNotMatch(source, /beginVideoDrag/);
  assert.match(source, /class="fo-cover-link" draggable="false"/);
});
