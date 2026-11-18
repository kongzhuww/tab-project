import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
import { GLYPHS, createWaveField, glyphIndex, parseCssColorToRgb } from '../src/multica/ripple-core.ts';

const analytics = await loadTsModule('src/multica/usage-analytics.ts');

test('ripple-core wave field activates on disturb and computes glyph/palette cleanly', () => {
  const waves = createWaveField(12, 8, () => 0.5);
  assert.equal(waves.active(), false);
  waves.disturb(6, 4);
  assert.equal(waves.active(), true);
  waves.advance(0.03);
  const peak = Math.max(...Array.from(waves.height, v => Math.abs(v)));
  assert.ok(peak > 0);
  const idx = glyphIndex(3, 5, 2);
  assert.ok(idx >= 0 && idx < GLYPHS.length);
  assert.deepEqual(parseCssColorToRgb('#3b6ef0'), [59, 110, 240]);
});

test('aggregateWorkspaceUsage computes stats, heatmap cells, and stacked model columns', () => {
  const now = new Date('2026-11-18T14:00:00Z').getTime();
  const res = analytics.aggregateWorkspaceUsage({
    range: 'all',
    nowMs: now,
    nativeConversations: [
      {
        id: 'n1',
        title: 'Repo search',
        agentId: 'pi',
        model: 'gemini-4-hydrogen',
        cwd: '/Users/demo',
        updatedAt: now,
        messages: [
          { role: 'user', content: 'hello', createdAt: now - 3600_000 },
          {
            role: 'assistant',
            content: 'done',
            createdAt: now - 3500_000,
            modelLabel: 'Gemini 4 Hydrogen',
            usage: { input: 2000, output: 1000, cacheRead: 254000, totalTokens: 257000 },
          },
        ],
      },
    ],
    localConversations: [],
  });

  assert.equal(res.sessions, 1);
  assert.equal(res.messages, 2);
  assert.ok(res.totalTokens >= 257000);
  assert.equal(res.activeDays, 1);
  assert.equal(res.topModel, 'Gemini 4 Hydrogen');
  assert.equal(res.heatmapCells.length, 26 * 7);
  assert.ok(res.chartColumns.length >= 4);
  assert.equal(res.models[0].sharePct, 100);
  assert.match(res.funBook, /简·爱/);
});
