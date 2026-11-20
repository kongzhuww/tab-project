import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';

const { createSubtitleFollow } = await loadTsModule('src/bilibili/subtitle-follow.ts');

test('subtitle follows the latest line after five seconds of user inactivity', t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let targetTop = 300;
  const calls = [];
  const target = { getBoundingClientRect: () => ({ top: targetTop, height: 20 }) };
  const container = { scrollTop: 0, clientHeight: 200, contains: v => v === target,
    getBoundingClientRect: () => ({ top: 100 }), scrollTo: opts => calls.push(opts) };
  const follow = createSubtitleFollow(() => container, () => target);
  follow.follow();
  assert.equal(calls.at(-1).top, 110);
  const beforeWheel = calls.length;
  follow.interact();
  assert.equal(calls.length, beforeWheel, 'wheel interaction must not issue a competing scroll');
  targetTop = 600;
  const count = calls.length;
  follow.follow();
  t.mock.timers.tick(4999);
  assert.equal(calls.length, count);
  t.mock.timers.tick(1);
  assert.equal(calls.at(-1).top, 410);
  follow.reset();
});

test('dragging a scrollbar or selecting text keeps follow paused until five seconds after release', t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const handlers = new Map();
  const originalWindow = globalThis.window;
  globalThis.window = { addEventListener: (name, fn) => handlers.set(name, fn), removeEventListener: name => handlers.delete(name) };
  t.after(() => { if (originalWindow === undefined) delete globalThis.window; else globalThis.window = originalWindow; });
  const calls = [];
  const target = { getBoundingClientRect: () => ({ top: 120, height: 20 }) };
  const container = { scrollTop: 0, clientHeight: 100, contains: () => true,
    getBoundingClientRect: () => ({ top: 0 }), scrollTo: opts => calls.push(opts) };
  const follow = createSubtitleFollow(() => container, () => target);
  follow.pointerDown();
  const count = calls.length;
  t.mock.timers.tick(10000); follow.follow(); assert.equal(calls.length, count);
  handlers.get('pointerup')();
  t.mock.timers.tick(4999); assert.equal(calls.length, count);
  t.mock.timers.tick(1); assert.equal(calls.length, count + 1);
  follow.reset();
});

test('continuous interaction resets the idle timer and reset prevents late scrolling', t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const calls = [];
  const target = { getBoundingClientRect: () => ({ top: 120, height: 20 }) };
  const container = { scrollTop: 0, clientHeight: 100, contains: () => true,
    getBoundingClientRect: () => ({ top: 0 }), scrollTo: opts => calls.push(opts) };
  const follow = createSubtitleFollow(() => container, () => target);
  follow.interact(); t.mock.timers.tick(4000); follow.interact();
  const count = calls.length;
  t.mock.timers.tick(4999); assert.equal(calls.length, count);
  follow.reset(); t.mock.timers.tick(10000); assert.equal(calls.length, count);
});
