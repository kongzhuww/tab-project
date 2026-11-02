import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';

const { extractSubscriptionChapters } = await loadTsModule('src/bilibili/subscription-chapters.ts');

test('Bilibili Chapters: extracts chapters from official viewpoints array', () => {
  const doc = {
    desc: 'Video description',
    viewPoints: [
      { from: 0, to: 120, content: 'Part 1: Introduction' },
      { from: 120, to: 300, content: 'Part 2: Deep Dive' }
    ],
    cues: [
      { from: 10, to: 15, content: 'Hello everyone' },
      { from: 150, to: 160, content: 'Here is the code' }
    ]
  };
  const chapters = extractSubscriptionChapters(doc);
  assert.strictEqual(chapters.length, 2);
  assert.strictEqual(chapters[0].title, 'Part 1: Introduction');
  assert.strictEqual(chapters[0].cues.length, 1);
  assert.strictEqual(chapters[1].title, 'Part 2: Deep Dive');
  assert.strictEqual(chapters[1].cues.length, 1);
});

test('Bilibili Chapters: falls back to description timestamp regex when viewpoints are empty', () => {
  const doc = {
    desc: `
      Timestamps:
      00:00 开场介绍
      02:30 方案架构剖析
      10:15 总结与演示
      交流群：12345678 (该推广行应被自动过滤)
    `,
    viewPoints: [],
    cues: []
  };
  const chapters = extractSubscriptionChapters(doc);
  assert.strictEqual(chapters.length, 3);
  assert.strictEqual(chapters[0].from, 0);
  assert.strictEqual(chapters[0].title, '开场介绍');
  assert.strictEqual(chapters[1].from, 150); // 2 min 30 sec = 150s
  assert.strictEqual(chapters[1].title, '方案架构剖析');
  assert.strictEqual(chapters[2].from, 615); // 10 min 15 sec = 615s
  assert.strictEqual(chapters[2].title, '总结与演示');
});
