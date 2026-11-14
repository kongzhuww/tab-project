import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';

const { parseModernLeaderboard } = await loadTsModule('src/aihot/leaderboard-parser.ts');
const text = value => ({ textContent:value });
function row(slug, rank = '01') {
  const model = { ...text('Claude Fable 5.2'), querySelector: () => null };
  const modelCell = { querySelector: selector => selector === 'a strong' ? model : selector === 'small' ? text('Anthropic') : null };
  const cells = [text(rank), modelCell, text('2026-11-09'), text('40 项评测'), text('¥1.33'), text('¥53.38'), text('¥266.88'), { querySelector: () => text('80.0') }];
  return { getAttribute: () => slug, querySelectorAll: () => cells, querySelector: () => text('2026-11-09') };
}
function documentWith(rows, headers = ['名次','模型','上线日期','评测覆盖','缓存价格','输入价格','输出价格','AIHOT 评分']) {
  const table = { querySelectorAll: selector => selector === 'tbody tr[data-slug]' ? rows : headers.map(text) };
  return { querySelectorAll: () => [table] };
}
function withDocument(doc, fn) {
  const previous = globalThis.DOMParser;
  globalThis.DOMParser = class { parseFromString() { return doc; } };
  try { return fn(); } finally { if (previous === undefined) delete globalThis.DOMParser; else globalThis.DOMParser = previous; }
}

test('current model table maps source rank, prices, score and provider', () => {
  const items = withDocument(documentWith([row('claude-fable-5-2')]), () => parseModernLeaderboard('<html>'));
  assert.deepEqual(items, [{ href:'https://aihot.news/leaderboard/claude-fable-5-2', rank:'1', model:'Claude Fable 5.2', provider:'Anthropic', releaseDate:'2026-11-09', inputPrice:'¥53.38', outputPrice:'¥266.88', score:'80.0' }]);
});
test('invalid slugs and unrecognized score columns fail closed', () => {
  assert.deepEqual(withDocument(documentWith([row('../evil')]), () => parseModernLeaderboard('')), []);
  assert.deepEqual(withDocument(documentWith([row('safe')], ['名次','模型']), () => parseModernLeaderboard('')), []);
});
test('unknown price columns are not mislabelled', () => {
  const headers = ['名次','模型','上线日期','评测覆盖','缓存价格','其他','其他','AIHOT 评分'];
  const [item] = withDocument(documentWith([row('safe')], headers), () => parseModernLeaderboard(''));
  assert.equal(item.inputPrice, '-'); assert.equal(item.outputPrice, '-');
});
