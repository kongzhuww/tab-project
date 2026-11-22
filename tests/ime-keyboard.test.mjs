import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';

const {
  createImeGuard,
  ensureImeDocumentTracker,
  isImeComposing,
  shouldSubmitOnEnter,
  onImeEnter
} = await loadTsModule('src/core/ime-keyboard.ts');
const { shouldSendComposer } = await loadTsModule('src/multica/composer-keyboard.ts');

test('createImeGuard blocks Enter during composition and post-composition English commit cooldown', () => {
  let now = 1000;
  const guard = createImeGuard({ cooldownMs: 100, now: () => now });
  const enter = { key: 'Enter', isComposing: false, keyCode: 13, shiftKey: false, ctrlKey: false, metaKey: false, altKey: false, repeat: false };

  assert.equal(guard.shouldSubmitOnEnter(enter), true);

  guard.onCompositionStart();
  guard.onKeyDown({ code: 'KeyO' });
  assert.equal(guard.shouldSubmitOnEnter(enter), false);

  // macOS/WebKit order: compositionend fires right before keydown(Enter)
  guard.onCompositionEnd();
  now += 8;
  assert.equal(guard.shouldSubmitOnEnter(enter), false);

  // Second intentional Enter after cooldown succeeds
  now += 150;
  assert.equal(guard.shouldSubmitOnEnter(enter), true);
});

test('createImeGuard allows immediate Enter after selecting a Chinese candidate with Space or Digit', () => {
  let now = 2000;
  const guard = createImeGuard({ cooldownMs: 100, now: () => now });
  const enter = { key: 'Enter', isComposing: false, keyCode: 13, shiftKey: false, ctrlKey: false, metaKey: false, altKey: false, repeat: false };

  guard.onCompositionStart();
  guard.onKeyDown({ code: 'Space' });
  guard.onCompositionEnd();
  now += 20;
  assert.equal(guard.shouldSubmitOnEnter(enter), true);

  guard.onCompositionStart();
  guard.onKeyDown({ code: 'Digit1' });
  guard.onCompositionEnd();
  now += 20;
  assert.equal(guard.shouldSubmitOnEnter(enter), true);
});

test('onImeEnter never calls preventDefault while IME is composing', () => {
  let prevented = false;
  let called = false;
  const event = {
    key: 'Enter',
    isComposing: true,
    keyCode: 229,
    shiftKey: false,
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    repeat: false,
    preventDefault() { prevented = true; }
  };

  onImeEnter(event, () => { called = true; });
  assert.equal(prevented, false);
  assert.equal(called, false);
});

test('ensureImeDocumentTracker swallows trailing Enter right after English IME compositionend', () => {
  let now = 5000;
  const listeners = new Map();
  const fakeDoc = {
    addEventListener(type, fn, capture) {
      assert.equal(capture, true);
      listeners.set(type, fn);
    }
  };
  const target = {};
  ensureImeDocumentTracker(fakeDoc, () => now);

  listeners.get('compositionstart')({ target });
  listeners.get('keydown')({ target, key: 'Process', code: 'KeyH', keyCode: 229, isComposing: true, preventDefault() {}, stopImmediatePropagation() {} });
  listeners.get('compositionend')({ target });

  now += 5;
  let prevented = false;
  let stopped = false;
  const trailingEnter = {
    target,
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    isComposing: false,
    preventDefault() { prevented = true; },
    stopImmediatePropagation() { stopped = true; }
  };
  listeners.get('keydown')(trailingEnter);
  assert.equal(prevented, true);
  assert.equal(stopped, true);
  assert.equal(isImeComposing(trailingEnter), true);
  assert.equal(shouldSendComposer(trailingEnter), false);
});

test('shouldSubmitOnEnter supports plain Enter, Shift+Enter newline, and Ctrl/Meta+Enter modes', () => {
  const base = { key: 'Enter', isComposing: false, keyCode: 13, shiftKey: false, ctrlKey: false, metaKey: false, altKey: false, repeat: false };
  assert.equal(shouldSubmitOnEnter(base), true);
  assert.equal(shouldSubmitOnEnter({ ...base, shiftKey: true }), false);
  assert.equal(shouldSubmitOnEnter({ ...base, ctrlKey: true }), false);
  assert.equal(shouldSubmitOnEnter({ ...base, ctrlKey: true }, { requireCtrlOrMeta: true }), true);
  assert.equal(shouldSubmitOnEnter(base, { requireCtrlOrMeta: true }), false);
  assert.equal(shouldSubmitOnEnter({ ...base, metaKey: true, isComposing: true }, { requireCtrlOrMeta: true }), false);
});
