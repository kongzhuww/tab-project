import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const view=await readFile(new URL('../src/backpack/BackpackDialog.vue',import.meta.url),'utf8');

test('integrated library hides the sidebar tag cloud but keeps tag filtering and legacy access',()=>{
  assert.match(view,/v-if="!embedded && allBackpackTags\.length > 0"/);
  assert.match(view,/@click\.stop="selectPromptTag\(tag\)"/);
  assert.match(view,/backpackState\.selectedTag = null/);
  assert.match(view,/:class="\{ 'bp-integrated': embedded \}"/);
});
