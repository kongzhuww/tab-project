import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SLEEP_AFTER_MS,
  CRAB_EXTRAS,
  freshStage,
  levelFromActiveInfo,
  decideStage,
  finishStage,
  takeMoment,
  frameOffset,
  cellSize,
} from '../src/multica/mascot-core.ts';

test('mascot level prioritizes error > thinking > typing > idle', () => {
  assert.equal(levelFromActiveInfo({ hasError: true, isThinking: true, isRunning: true }).state, 'error');
  assert.equal(levelFromActiveInfo({ isThinking: true, isRunning: true }).state, 'thinking');
  assert.equal(levelFromActiveInfo({ isRunning: true }).state, 'typing');
  assert.equal(levelFromActiveInfo({}).state, 'idle');
});

test('mascot sleeps after idle timeout and wakes on running/attention', () => {
  const stage = freshStage(0);
  const first = decideStage(stage, 1000, stage.level, {
    extras: CRAB_EXTRAS,
    extrasAllowed: false,
    random: () => 0.5,
  });
  assert.equal(first.key, 'idle');

  const sleeping = decideStage(stage, SLEEP_AFTER_MS + 10, stage.level, {
    extras: CRAB_EXTRAS,
    extrasAllowed: false,
    random: () => 0.5,
  });
  assert.equal(sleeping.key, 'sleeping');

  takeMoment(stage, 'attention', SLEEP_AFTER_MS + 20);
  const happy = decideStage(stage, SLEEP_AFTER_MS + 20, stage.level, {
    extras: CRAB_EXTRAS,
    extrasAllowed: false,
    random: () => 0.5,
  });
  assert.equal(happy.key, 'happy');
});

test('mascot reaction finishes cleanly after one-shot poke', () => {
  const stage = freshStage(0);
  stage.reaction = { key: 'poke-left', mode: 'once', fresh: false };
  assert.equal(
    decideStage(stage, 100, stage.level, { extras: [], extrasAllowed: false, random: () => 0 }).key,
    'poke-left'
  );
  finishStage(stage, 'poke-left', 900, () => 0.5);
  assert.equal(stage.reaction, null);
});

test('frameOffset computes 2x scaled pixel coordinates with gutter', () => {
  const sheet = { frames: 24, box: [24, 20, 24, 16], still: 0 };
  assert.deepEqual(cellSize(sheet, 1), [26, 18]);
  assert.equal(frameOffset(sheet, 0, 1), 'translate(-2px, -2px)');
  assert.equal(frameOffset(sheet, 9, 1), 'translate(-54px, -38px)');
});
