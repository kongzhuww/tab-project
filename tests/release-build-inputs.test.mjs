import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('isolated release includes the native host bundled by the installer', async () => {
  const [script, installer] = await Promise.all([
    readFile(new URL('../scripts/build-release.mjs', import.meta.url), 'utf8'),
    readFile(new URL('../src/native-bridge/download.ts', import.meta.url), 'utf8')
  ]);
  assert.match(installer, /native-host\/tab-project-native-host\.mjs\?raw/);
  assert.match(script, /"native-host\/tab-project-native-host\.mjs"/);
});
