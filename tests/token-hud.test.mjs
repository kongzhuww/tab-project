import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';

const hud = await loadTsModule('src/multica/token-hud.ts');

test('parseContextWindowSize and formatCompactK handle K and M suffixes accurately', () => {
  assert.equal(hud.parseContextWindowSize('1M'), 1_000_000);
  assert.equal(hud.parseContextWindowSize('500K'), 500_000);
  assert.equal(hud.parseContextWindowSize('131.1K'), 131_100);
  assert.equal(hud.parseContextWindowSize('unknown'), 0);

  assert.equal(hud.formatCompactK(713), '713');
  assert.equal(hud.formatCompactK(2700), '2.7K');
  assert.equal(hud.formatCompactK(439800), '439.8K');
  assert.equal(hud.formatCompactK(1430000), '1.43M');
});

test('buildSessionTelemetry aggregates turns, cache hit rate, speed, and tool leaderboard', () => {
  const telemetry = hud.buildSessionTelemetry({
    modelName: 'openai-codex/gpt-6.1-sol',
    maxContext: 500_000,
    draftText: '123456',
    turns: [
      {
        turn: 1,
        model: 'gpt-6.1-sol',
        userPreview: 'Check repo status',
        durationMs: 2000,
        toolCalls: 2,
        toolNames: ['bash', 'read'],
        usage: { input: 2000, cacheRead: 8000, output: 400, reasoning: 100, totalTokens: 10500 },
      },
      {
        turn: 2,
        model: 'gpt-6.1-sol',
        userPreview: 'Summarize changes',
        durationMs: 2500,
        toolCalls: 1,
        toolNames: ['bash'],
        usage: { input: 3000, cacheRead: 17000, output: 500, reasoning: 200, totalTokens: 20700 },
      },
    ],
  });

  assert.equal(telemetry.hasTelemetry, true);
  assert.equal(telemetry.turnCount, 2);
  assert.equal(telemetry.totalTokens, 31200);
  assert.equal(telemetry.totalOutput, 900);
  assert.equal(telemetry.totalToolCalls, 3);
  assert.equal(telemetry.lastSpeed, 200);
  assert.equal(telemetry.avgSpeed, 200);
  assert.equal(telemetry.cacheHitPct, 85);
  assert.equal(telemetry.draftTokens, 2);
  assert.equal(telemetry.usedTokens, 20702);
  assert.equal(telemetry.remainingTokens, 500_000 - 20702);
  assert.equal(telemetry.turns[1].ctxDelta, 20700 - 10500);
  assert.deepEqual(telemetry.toolLeaderboard[0], { name: 'bash', count: 2 });
  assert.match(hud.formatTelemetryReport(telemetry), /上下文窗口与 Token 监控报告/);
});

test('extractChangedFiles summarizes edited and written files with line counts', () => {
  const summary = hud.extractChangedFiles([
    { name: 'read', args: { path: 'src/a.ts' } },
    { name: 'edit', args: { path: 'src/MulticaDialog.vue', oldText: 'a\nb', newText: 'a\nb\nc\nd' } },
    { name: 'Edit', args: { file_path: 'src/MulticaDialog.vue', old_string: 'x', new_string: 'y\nz' } },
    { name: 'write', args: { path: 'src/NewHelper.ts', content: 'line1\nline2\nline3' } },
  ]);
  assert.equal(summary.files.length, 2);
  assert.deepEqual(summary.files[0], { path: 'src/MulticaDialog.vue', name: 'MulticaDialog.vue', added: 6, removed: 3 });
  assert.deepEqual(summary.files[1], { path: 'src/NewHelper.ts', name: 'NewHelper.ts', added: 3, removed: 0 });
  assert.equal(summary.totalAdded, 9);
  assert.equal(summary.totalRemoved, 3);
});
