import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('WebDAV sync payload whitelist includes and preserves ghLocalStarGroupsV1', async () => {
  const syncServiceRaw = await readFile(new URL('../src/services/sync.service.ts', import.meta.url), 'utf8');
  const syncPayloadRaw = await readFile(new URL('../src/services/sync-payload.ts', import.meta.url), 'utf8');

  // 1. 静态契约：白名单与对象属性集必须明确包含本地 Star 分组
  assert.match(syncServiceRaw, /"ghLocalStarGroupsV1"/);
  assert.match(syncPayloadRaw, /"ghLocalStarGroupsV1"/);

  // 2. 静态契约：readSyncSettings 必须聚合按账号前缀划分的本地 Star 分组
  assert.match(syncServiceRaw, /startsWith\("ghLocalStarGroupsV1:"\)/);

  // 3. 静态契约：restoreSyncBackup 必须包含还原 ghLocalStarGroupsV1 的写入逻辑
  assert.match(syncServiceRaw, /settings\["ghLocalStarGroupsV1"\]/);

  // 4. 静态契约：GitHub 服务层必须监听 logicweaver:sync-restored 并在收到分组时重新加载
  const gitHubServiceRaw = await readFile(new URL('../src/services/github.service.ts', import.meta.url), 'utf8');
  assert.match(gitHubServiceRaw, /logicweaver:sync-restored/);
  assert.match(gitHubServiceRaw, /detail\.ghLocalStarGroupsV1/);
});
