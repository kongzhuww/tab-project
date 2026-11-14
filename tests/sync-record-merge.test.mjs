import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const { mergeSyncRecords } = await loadTsModule('src/services/sync-record-merge.ts');
const item = (id, value, time = 100, deviceId = 'mac') => ({id, value, modifiedAt:time, deviceId});
const deleted = (id, time = 200, deviceId = 'mac') => ({id, modifiedAt:time, deletedAt:time, deviceId});

test('merges independent additions without discarding either device', () => {
  const result = mergeSyncRecords([], [item('a','mac')], [item('b','win',100,'win')]);
  assert.deepEqual(result.records.map(record => record.id).sort(), ['a','b']);
  assert.deepEqual(result.conflicts, []);
});
test('propagates an explicit deletion when the other side is unchanged', () => {
  const original = item('a','website');
  const tombstone = deleted('a');
  const result = mergeSyncRecords([original], [tombstone], [original]);
  assert.deepEqual(result.records, [tombstone]);
  assert.deepEqual(result.conflicts, []);
});
test('deletion versus concurrent edit requires confirmation and emits no partial merge', () => {
  const original = item('a','website');
  const result = mergeSyncRecords([original], [deleted('a')], [item('a','edited',300,'win')]);
  assert.equal(result.conflicts[0].reason, 'concurrent-change');
  assert.deepEqual(result.records, []);
});
test('missing legacy record is not inferred to be a deletion', () => {
  const original = item('a','website');
  const result = mergeSyncRecords([original], [], [original]);
  assert.equal(result.conflicts[0].reason, 'missing-record');
  assert.deepEqual(result.records, []);
});
test('different concurrent edits are not silently decided by potentially wrong clocks', () => {
  const original = item('a','before');
  const result = mergeSyncRecords([original], [item('a','mac',200)], [item('a','win',999999,'win')]);
  assert.equal(result.conflicts[0].reason, 'concurrent-change');
});
test('independent prompt and article changes are preserved with a common ancestor', () => {
  const prompt = item('prompt-1', {title:'Prompt', content:'Original'});
  const article = item('article-1', {title:'Article', content:'Original'});
  const local = [item('prompt-1', {title:'Prompt', content:'Edited on Mac'}, 200), article];
  const remote = [prompt, article, item('article-2', {title:'New', content:'Windows'}, 300, 'win')];
  const result = mergeSyncRecords([prompt, article], local, remote);
  assert.deepEqual(result.conflicts, []);
  assert.deepEqual(result.records.map(record => record.id), ['prompt-1', 'article-1', 'article-2']);
  assert.equal(result.records[0].value.content, 'Edited on Mac');
});
test('an article deletion racing with a remote edit is not silently merged', () => {
  const article = item('article-1', {title:'Original', content:'Text'});
  const result = mergeSyncRecords([article], [deleted('article-1')], [item('article-1', {title:'Edited', content:'Text'}, 300, 'win')]);
  assert.deepEqual(result.records, []);
  assert.equal(result.conflicts[0].reason, 'concurrent-change');
});
test('rejects duplicate IDs and malformed tombstones', () => {
  const a = item('a','one');
  assert.equal(mergeSyncRecords([], [a,a], []).conflicts[0].reason, 'duplicate-id');
  assert.equal(mergeSyncRecords([], [{...a, deletedAt:200}], []).conflicts[0].reason, 'invalid-record');
});
