import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const { shouldCreateTask, isImeKey } = await loadTsModule('src/todoist/task-keyboard.ts');

test('task creation requires an explicit shortcut and ignores IME confirmation', () => {
  const base = { key:'Enter', isComposing:false, keyCode:13, ctrlKey:false, metaKey:false, altKey:false, shiftKey:false, repeat:false };
  assert.equal(shouldCreateTask(base), false);
  assert.equal(shouldCreateTask({...base, shiftKey:true}), false);
  assert.equal(shouldCreateTask({...base, ctrlKey:true}), true);
  assert.equal(shouldCreateTask({...base, metaKey:true}), true);
  assert.equal(shouldCreateTask({...base, metaKey:true, isComposing:true}), false);
  assert.equal(shouldCreateTask({...base, ctrlKey:true, keyCode:229}), false);
  assert.equal(shouldCreateTask({...base, ctrlKey:true, repeat:true}), false);
  assert.equal(isImeKey({...base, keyCode:229}), true);
});
