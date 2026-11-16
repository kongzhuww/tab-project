import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';

const { parseBuildInfo, buildRequiresReload } = await loadTsModule('src/settings/build-info.ts');
const running = { id:'82bfb83b-bcbd-45f6-a3a7-efbba2026fdd', builtAt:'2026-11-15T01:00:00.000Z' };
const newer = { id:'ba15623e-d974-49d6-8a0f-6876b46d26ad', builtAt:'2026-11-15T01:02:00.000Z' };

test('same-version rebuild is distinguished by build ID', () => {
  assert.deepEqual(parseBuildInfo(running), running);
  assert.equal(buildRequiresReload(running, running), false);
  assert.equal(buildRequiresReload(running, newer), true);
});
test('missing or malformed metadata does not claim the loaded build matches or differs', () => {
  assert.equal(parseBuildInfo(null), null);
  assert.equal(parseBuildInfo({id:'arbitrary',builtAt:running.builtAt}), null);
  assert.equal(parseBuildInfo({...running,builtAt:'invalid'}), null);
  assert.equal(buildRequiresReload(running, null), false);
  assert.equal(buildRequiresReload(null, newer), false);
});
