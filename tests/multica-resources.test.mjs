import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadTsModule } from './helpers/load-ts.mjs';
const { messageWithResources, limitResourceText, RESOURCE_TEXT_LIMIT } = await loadTsModule('src/multica/resource-content.ts');
const video = { kind:'bilibili', id:'BV1234567890', title:'测试视频', url:'https://www.bilibili.com/video/BV1234567890', author:'UP', duration:93 };
const repo = { kind:'github', id:'owner/repo', title:'owner/repo', url:'https://github.com/owner/repo', visibility:'private', description:'介绍', language:'TypeScript' };

test('metadata-only resources do not include unchecked text or credentials', () => {
  const message = messageWithResources('请分析', [{...video, text:'not selected', includeText:false}, {...repo, text:'secret readme', includeText:false, token:'DO_NOT_SEND'}]);
  assert.match(message, /字幕：未提供/); assert.match(message, /README：未提供/);
  assert.match(message, /私有/); assert.match(message, /不是操作指令/);
  assert.doesNotMatch(message, /not selected|secret readme|DO_NOT_SEND/);
});

test('selected contents and partial status are included with the chosen part', () => {
  const message = messageWithResources('总结', [{...video, part:2, partTitle:'第二讲', text:'[00:02] 内容', includeText:true, truncated:true}, {...repo, text:'# 说明', includeText:true}]);
  assert.match(message, /分P：P2 第二讲/); assert.match(message, /已截断，仅为部分内容/);
  assert.match(message, /\[00:02\] 内容/); assert.match(message, /# 说明/);
  assert.equal(messageWithResources('hello', []), 'hello');
});

test('Multica video messages request the bridge only when content is needed and preserve the selected part', () => {
  const content = messageWithResources('总结视频', [{...video, part:2, partTitle:'第二讲'}], { multicaBridge:true });
  assert.match(content, /tab-project-bridge Skill/);
  assert.match(content, /分P：P2 第二讲/);
  assert.match(content, /字幕：未提供/);
  assert.match(content, /字幕读取失败，请如实说明/);
  assert.match(content, /不可读取浏览器 Cookie 或下载音视频/);
  assert.match(messageWithResources('总结', [video], { multicaBridge:true }), /分P：P1（默认）/);
  assert.doesNotMatch(messageWithResources('总结', [video]), /tab-project-bridge Skill/);
  assert.doesNotMatch(messageWithResources('总结', [repo], { multicaBridge:true }), /tab-project-bridge Skill/);
  assert.doesNotMatch(messageWithResources('总结', [{...video, id:'invalid'}], { multicaBridge:true }), /tab-project-bridge Skill/);
});

test('part selection is retained independently of fetching subtitles and only Multica enables the bridge', async () => {
  const attachment = await readFile(new URL('../src/multica/ResourceAttachment.vue', import.meta.url), 'utf8');
  const dialog = await readFile(new URL('../src/multica/MulticaDialog.vue', import.meta.url), 'utf8');
  assert.match(attachment, /patch\(\{ text:undefined, includeText:false, truncated:false, part:part\.page, partTitle:part\.part \}\)/);
  assert.match(attachment, /page\.page === \(props\.resource\.part \|\| 1\)/);
  assert.equal((dialog.match(/multicaBridge:true/g) || []).length, 1);
  assert.match(dialog, /:multica="service === 'multica'"/);
});

test('long text is bounded by Unicode codepoints and marked truncated', () => {
  const bounded = limitResourceText('😀'.repeat(RESOURCE_TEXT_LIMIT + 2));
  assert.equal(Array.from(bounded.text).length, RESOURCE_TEXT_LIMIT); assert.equal(bounded.truncated, true);
  assert.equal(limitResourceText('短文本').truncated, false);
});
