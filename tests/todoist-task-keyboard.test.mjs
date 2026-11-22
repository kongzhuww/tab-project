import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const { shouldCreateTask, isImeKey } = await loadTsModule('src/todoist/task-keyboard.ts');

test('task creation accepts Enter or Ctrl/Meta+Enter while ignoring Shift+Enter and IME confirmation', () => {
  const base = { key:'Enter', isComposing:false, keyCode:13, ctrlKey:false, metaKey:false, altKey:false, shiftKey:false, repeat:false };
  assert.equal(shouldCreateTask(base), true);
  assert.equal(shouldCreateTask({...base, shiftKey:true}), false);
  assert.equal(shouldCreateTask({...base, altKey:true}), false);
  assert.equal(shouldCreateTask({...base, ctrlKey:true}), true);
  assert.equal(shouldCreateTask({...base, metaKey:true}), true);
  assert.equal(shouldCreateTask({...base, isComposing:true}), false);
  assert.equal(shouldCreateTask({...base, keyCode:229}), false);
  assert.equal(shouldCreateTask({...base, metaKey:true, isComposing:true}), false);
  assert.equal(shouldCreateTask({...base, ctrlKey:true, keyCode:229}), false);
  assert.equal(shouldCreateTask({...base, repeat:true}), false);
  assert.equal(shouldCreateTask({...base, ctrlKey:true, repeat:true}), false);
  assert.equal(isImeKey({...base, keyCode:229}), true);
});
