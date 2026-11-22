import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('radio workspace removes local playlist editor UI and plays Bilibili folders directly', async () => {
  const [workspace, tapeStore, radioPlayer, radioStore] = await Promise.all([
    readFile('src/bilibili/BilibiliWorkspace.vue', 'utf8'),
    readFile('src/bilibili/radio-tape-store.ts', 'utf8'),
    readFile('src/bilibili/radio-player.ts', 'utf8'),
    readFile('src/bilibili/radio-store.ts', 'utf8'),
  ]);

  assert.match(tapeStore, /bvid\?:\s*string;/);
  assert.match(tapeStore, /!s\?\.active && !s\?\.playing && !s\?\.track && !radioTapeState\.active/);
  assert.match(radioPlayer, /bvid:\s*track\?\.bvid\s*\|\|\s*""/);
  assert.match(radioStore, /bili_radio_active_folder_id/);
  assert.match(radioStore, /preferredId/);
  assert.match(workspace, /class="bili-radio-cover-stage"/);
  assert.match(workspace, /playFolderTrack\(video\)/);
  assert.match(workspace, /stepRadioFolderTrack\(-1\)/);
  assert.match(workspace, /stepRadioFolderTrack\(1\)/);
  assert.match(workspace, /togglePlayFeaturedRadioTrack/);
  assert.match(workspace, /biliRadioController\.toggleLike\(featuredRadioTrack\)/);
  assert.doesNotMatch(workspace, /id="bili-radio-name"/);
  assert.doesNotMatch(workspace, /id="bili-radio-save"/);
  assert.doesNotMatch(workspace, /id="bili-radio-clear"/);
  assert.doesNotMatch(workspace, /id="bili-radio-queue"/);
});
