import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('repository instructions agree on testing, native AI and current UI defaults', async () => {
  const [agents, cursor, manifest] = await Promise.all([read('AGENTS.md'), read('.cursorrules'), read('manifest.json')]);
  assert.ok(JSON.parse(manifest).permissions.includes('nativeMessaging'));
  assert.doesNotMatch(cursor, /不写、不跑断言/);
  assert.match(cursor, /允许编写并运行单元/);
  assert.match(agents, /现行 `manifest\.json` 包含 `nativeMessaging`/);
  assert.doesNotMatch(agents, /仓库现行版本为 \*\*v1\.0\.21/);
  assert.match(agents, /B站订阅不预置 UP 主/);
  assert.match(agents, /AI 工作区 \/ Multica.*MulticaDialog/);
});
