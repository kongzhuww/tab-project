import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';

const { commentPollBackoff, MulticaRequestError } = await loadTsModule('src/multica/poll-backoff.ts');

test('background polling backs off and caps transient failures', () => {
  assert.deepEqual([1, 2, 3, 4, 10].map(n => commentPollBackoff(n, new Error()).delay), [40000, 80000, 160000, 300000, 300000]);
});
test('polling stops for authentication errors and respects rate limit wait', () => {
  assert.equal(commentPollBackoff(1, new MulticaRequestError('auth', 401)).blocked, true);
  assert.equal(commentPollBackoff(1, new MulticaRequestError('forbidden', 403)).blocked, true);
  assert.deepEqual(commentPollBackoff(1, new MulticaRequestError('rate', 429, 600000)), { delay: 600000, blocked: false });
  assert.equal(commentPollBackoff(1, new MulticaRequestError('rate', 429)).delay, 300000);
});
