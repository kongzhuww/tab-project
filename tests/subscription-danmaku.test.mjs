import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadTsModule } from './helpers/load-ts.mjs';
const { findDanmakuIndex, takeDanmakuAtTime } = await loadTsModule('src/bilibili/danmaku-timeline.ts');

test('danmaku timeline advances once, skips stale lines and supports seeking', () => {
  const list = [{ time: 0, text: 'a' }, { time: 2, text: 'b' }, { time: 2, text: 'c' }, { time: 8, text: 'd' }];
  assert.equal(findDanmakuIndex(list, 2), 1);
  const batch = takeDanmakuAtTime(list, 0, 2.5);
  assert.deepEqual(batch.items.map(item => item.text), ['b', 'c']);
  assert.equal(batch.index, 3);
  assert.deepEqual(takeDanmakuAtTime(list, batch.index, 2.6).items, []);
});

test('subscription player mounts native overlay and enables iframe danmaku', async () => {
  const player = await readFile('src/bilibili/BiliSubscriptionPlayer.vue', 'utf8');
  const overlay = await readFile('src/bilibili/BiliSubscriptionDanmaku.vue', 'utf8');
  assert.match(player, /<BiliSubscriptionDanmaku/);
  assert.match(player, /danmaku=1/);
  assert.match(overlay, /getVideoDanmaku\(resolvedCid\)/);
  assert.match(overlay, /run !== generation/);
  assert.match(overlay, /removeEventListener\('timeupdate'/);
});
