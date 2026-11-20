import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadTsModule } from './helpers/load-ts.mjs';
const { parseCommentEmotePackages } = await loadTsModule('src/bilibili/comment-emotes.ts');

test('kaomoji stay text while ordinary emotes keep their images', () => {
  const [kaomoji, pictures] = parseCommentEmotePackages([
    { text: '颜文字', emote: [{ text: '(°∀°)ﾉ', url: 'http://example.com/missing.png' }] },
    { text: '常用', emote: [{ text: '[doge]', url: 'http://example.com/doge.png' }] }
  ]);
  assert.equal(kaomoji.emote[0].textOnly, true);
  assert.equal(kaomoji.emote[0].text, '(°∀°)ﾉ');
  assert.equal(pictures.emote[0].textOnly, false);
  assert.equal(pictures.emote[0].url, 'https://example.com/doge.png');
});

test('failed images fall back to selectable text', async () => {
  const component = await readFile('src/bilibili/BiliSubscriptionPlayer.vue', 'utf8');
  assert.match(component, /@error="emote\.failed = true"/);
  assert.match(component, /<span v-else>\{\{ emote\.text \}\}<\/span>/);
  assert.match(component, /@click="insertEmote\(emote\.text\)"/);
});
