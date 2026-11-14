import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const source = await readFile(new URL('../src/multica/MulticaDialog.vue',import.meta.url),'utf8');
const template = source.slice(source.indexOf('<template>\n  <section v-if="workspaceVisible"'), source.indexOf('<style scoped>'));
test('one shared composer, welcome view, and sidebar handle both services', () => {
  assert.equal((template.match(/<div class="composer">/g) || []).length, 1);
  assert.equal((template.match(/<ConversationSidebar /g) || []).length, 1);
  assert.equal((template.match(/<ProviderPicker /g) || []).length, 1);
  assert.match(template, /需要我为你做些什么/);
  assert.doesNotMatch(template, /ByokWorkspace|使用你自己的 DeepSeek API/);
});
