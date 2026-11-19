import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

test('music sources keep separate queues and idle playback does nothing', async t => {
  const previous = { window: globalThis.window, Audio: globalThis.Audio, fetch: globalThis.fetch };
  t.after(() => { for (const [key, value] of Object.entries(previous)) Object.defineProperty(globalThis, key, { value, configurable: true, writable: true }); });
  class AudioMock {
    src = ''; paused = true; currentTime = 0; duration = 0; calls = 0;
    addEventListener() {}
    play() { this.paused = false; this.calls++; return Promise.resolve(); }
    pause() { this.paused = true; }
  }
  globalThis.window = {};
  globalThis.Audio = AudioMock;
  globalThis.fetch = async () => Response.json({ data: { sourceUrl: 'https://example.com/siren.mp3' } });
  const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/services/music.service.ts', import.meta.url))], bundle: true, format: 'esm', write: false, platform: 'node', plugins: [{ name: 'netease-mock', setup(build) {
    build.onResolve({ filter: /\.\/netease\.service$/ }, () => ({ path: 'mock', namespace: 'test' }));
    build.onLoad({ filter: /.*/, namespace: 'test' }, () => ({ contents: `export const neteaseService = { addRecentSong() {}, getSongAudioUrl: async id => 'https://example.com/' + id, getSongLyric: async () => '' };`, loader: 'js' }));
  }}] });
  const { musicService: music, toNeteaseMusicSong } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
  const siren = { cid: 'siren-1', name: 'Siren', artists: ['Siren'] };
  music.setQueue([siren]);
  music.togglePlay();
  assert.equal(music.getAudioElement().calls, 0);
  assert.equal(music.getState().currentSong, null);
  await music.playSong(siren);
  await music.playNeteaseSong({ id: 1, name: 'NetEase one' });
  assert.deepEqual(music.getState().queue.map(s => s.cid), ['ne_1']);
  const favorites = [{ id: 1, name: 'one' }, { id: 2, name: 'two' }];
  music.setQueue(favorites.map(toNeteaseMusicSong));
  await music.playNeteaseSong(favorites[0]);
  assert.deepEqual(music.getState().queue.map(s => s.cid), ['ne_1', 'ne_2']);
  await music.playSong(siren);
  assert.deepEqual(music.getState().queue.map(s => s.cid), ['siren-1']);
  const store = await readFile(new URL('../src/music/store.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(store, /setQueue\(songs, -1, false\)/);
});
