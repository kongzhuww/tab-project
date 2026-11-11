import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('WebDAV sync payload whitelist includes and preserves ghLocalStarGroupsV1', async () => {
  const syncServiceRaw = await readFile(new URL('../src/services/sync.service.ts', import.meta.url), 'utf8');
  const syncPayloadRaw = await readFile(new URL('../src/services/sync-payload.ts', import.meta.url), 'utf8');

  // 1. 静态契约：白名单必须包含 heroBackground 和 heroBackgroundHistory
  assert.match(syncServiceRaw, /"heroBackground"/);
  assert.match(syncServiceRaw, /"heroBackgroundHistory"/);
  assert.match(syncPayloadRaw, /"heroBackgroundHistory"/);

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

  // 5. 静态契约：个人仓库分组 (gh_my_repo_groups_v2) 与映射 (gh_my_repo_groups_map_v2) 必须在白名单与结构集内
  assert.match(syncServiceRaw, /"gh_my_repo_groups_v2"/);
  assert.match(syncServiceRaw, /"gh_my_repo_groups_map_v2"/);
  assert.match(syncPayloadRaw, /"gh_my_repo_groups_v2"/);
  assert.match(syncPayloadRaw, /"gh_my_repo_groups_map_v2"/);
});

test('selectSyncSettings validates and accepts gh_my_repo_groups_v2 array and gh_my_repo_groups_map_v2 object', async () => {
  const { selectSyncSettings } = await import('../src/services/sync-payload.ts');
  const payload = {
    gh_my_repo_groups_v2: ['前端工具', 'AI与模型', '自建脚本'],
    gh_my_repo_groups_map_v2: {
      'kongzhu/tab-project': ['前端工具'],
      'kongzhu/agent': ['AI与模型']
    }
  };
  const result = selectSyncSettings(payload, ['gh_my_repo_groups_v2', 'gh_my_repo_groups_map_v2']);
  assert.equal(result.count, 2);
  assert.deepEqual(result.sanitized.gh_my_repo_groups_v2, ['前端工具', 'AI与模型', '自建脚本']);
  assert.deepEqual(result.sanitized.gh_my_repo_groups_map_v2, {
    'kongzhu/tab-project': ['前端工具'],
    'kongzhu/agent': ['AI与模型']
  });
});

test('selectSyncSettings validates and accepts heroBackground and heroBackgroundHistory', async () => {
  const { selectSyncSettings } = await import('../src/services/sync-payload.ts');
  const payload = {
    heroBackground: {
      type: 'video',
      name: '阿米娅-相变临界4k',
      workshopId: '3720340946',
      isWorkshop: true
    },
    heroBackgroundHistory: [
      {
        id: 'bg-1',
        title: '阿米娅-相变临界4k',
        kind: '视频',
        previewUrl: 'data:image/jpeg;base64,mock',
        value: { type: 'video', workshopId: '3720340946' }
      }
    ]
  };
  const result = selectSyncSettings(payload, ['heroBackground', 'heroBackgroundHistory']);
  assert.equal(result.count, 2);
  assert.equal(result.sanitized.heroBackground.name, '阿米娅-相变临界4k');
  assert.equal(result.sanitized.heroBackgroundHistory.length, 1);
});

