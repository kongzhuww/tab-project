import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const source = await readFile(new URL('../src/multica/MulticaDialog.vue',import.meta.url),'utf8');
const template = source.slice(source.indexOf('<template>\n  <section v-show="workspaceVisible"'), source.indexOf('<style scoped>'));
test('one shared composer, welcome view, and sidebar handle both services', () => {
  assert.equal((template.match(/<div class="composer">/g) || []).length, 1);
  assert.equal((template.match(/<ConversationSidebar /g) || []).length, 1);
  assert.equal((template.match(/<ProviderPicker /g) || []).length, 1);
  assert.match(template, /需要我为你做些什么/);
  assert.match(template, /<BackpackLibrary v-if="libraryOpened" v-show="workspaceSection === 'library'" embedded/);
  assert.match(template, /<AiSchedulePanel v-if="scheduleOpened" v-show="workspaceSection === 'schedule'" embedded/);
  assert.doesNotMatch(template, /ByokWorkspace|使用你自己的 DeepSeek API/);
});

test('conversation statuses retain distinct review, done and pending colors', async () => {
  const sidebar = await readFile(new URL('../src/multica/ConversationSidebar.vue', import.meta.url), 'utf8');
  assert.match(sidebar, /name === '待审核' \? 'review'/);
  assert.match(sidebar, /name === '已完成'.*\? 'done'/);
  assert.match(sidebar, /name === '待处理' \? 'pending'/);
  for (const label of ['review', 'done', 'pending']) assert.match(sidebar, new RegExp(`\\.session-status\\.${label}\\{color:`));
});
