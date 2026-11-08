import test from "node:test";
import assert from "node:assert/strict";
import { mergeSyncSettings } from "../src/services/sync-merger.ts";

test("launcher merge retains both devices' folders, pages and same-URL placements", () => {
  const local = {
    launcherPages: ['常用网站', 'win-work'],
    launcherPageLabels: { 'win-work': '工作' },
    launcherFolders: { '本地工具': { name: '本地工具', page: 'win-work' } },
    quickLinkGroupSizes: { '本地工具': 'large' },
    quickLinks: [{ id: '1', url: 'https://robot.example', title: 'Robot', group: '本地工具', page: 'win-work' }]
  };
  const remote = {
    launcherPages: ['常用网站', 'mac-study'],
    launcherPageLabels: { 'mac-study': '学习' },
    launcherFolders: { '机械臂': { name: '机械臂', page: 'mac-study' } },
    quickLinkGroupSizes: { '机械臂': 'large' },
    quickLinks: [{ id: '1', url: 'https://robot.example', title: 'Robot Mac', group: '机械臂', page: 'mac-study' }]
  };
  const original = JSON.stringify([local, remote]);
  const merged = mergeSyncSettings(local, remote);
  assert.equal(merged.quickLinks.length, 2);
  assert.ok(merged.quickLinks.some(link => link.group === '机械臂' && link.page === 'mac-study'));
  assert.ok(merged.launcherFolders['本地工具']);
  assert.ok(merged.launcherFolders['机械臂']);
  assert.ok(merged.launcherPages.includes('win-work'));
  assert.equal(merged.launcherPageLabels['win-work'], '工作');
  assert.equal(merged.quickLinkGroupSizes['本地工具'], 'large');
  assert.equal(new Set(merged.quickLinks.map(link => link.id)).size, 2);
  assert.deepEqual(mergeSyncSettings(merged, remote), merged);
  assert.equal(JSON.stringify([local, remote]), original);
});

test("mergeSyncSettings merges quickLinks by URL without duplicating", () => {
  const local = {
    quickLinks: [
      { url: "https://bilibili.com", title: "Bilibili (Local)" },
      { url: "https://v2ex.com", title: "V2EX" }
    ]
  };
  const remote = {
    quickLinks: [
      { url: "https://bilibili.com", title: "B站" },
      { url: "https://github.com", title: "GitHub" }
    ]
  };

  const merged = mergeSyncSettings(local, remote);
  assert.equal(merged.quickLinks.length, 3);
  const urls = merged.quickLinks.map(l => l.url);
  assert.ok(urls.includes("https://bilibili.com"));
  assert.ok(urls.includes("https://v2ex.com"));
  assert.ok(urls.includes("https://github.com"));
});

test("mergeSyncSettings merges ghLocalStarGroupsV1 groups and memberships union", () => {
  const local = {
    ghLocalStarGroupsV1: {
      "ghLocalStarGroupsV1:github-id:1": {
        version: 1,
        owner: "github-id:1",
        groups: [{ id: "g1", name: "前端" }],
        memberships: {
          "vuejs/core": ["g1"]
        },
        sections: ["默认", "工作"],
        activeSection: "默认"
      }
    }
  };
  const remote = {
    ghLocalStarGroupsV1: {
      "ghLocalStarGroupsV1:github-id:1": {
        version: 1,
        owner: "github-id:1",
        groups: [
          { id: "g1", name: "前端开发" },
          { id: "g2", name: "AI模型" }
        ],
        memberships: {
          "vuejs/core": ["g1"],
          "openai/gpt": ["g2"]
        },
        sections: ["默认", "科研"],
        activeSection: "科研"
      }
    }
  };

  const merged = mergeSyncSettings(local, remote);
  const acc = merged.ghLocalStarGroupsV1["ghLocalStarGroupsV1:github-id:1"];
  assert.ok(acc);
  assert.equal(acc.groups.length, 2);
  assert.deepEqual(acc.memberships["vuejs/core"], ["g1"]);
  assert.deepEqual(acc.memberships["openai/gpt"], ["g2"]);
  assert.ok(acc.sections.includes("工作"));
  assert.ok(acc.sections.includes("科研"));
});

test("mergeSyncSettings handles non-array and corrupted values gracefully without throwing", () => {
  const local = {
    quickLinks: "invalid_links",
    ghLocalStarGroupsV1: {
      "ghLocalStarGroupsV1:user1": {
        version: 1,
        owner: "user1",
        groups: null,
        memberships: {
          "repo/a": {} // corrupted non-array
        },
        sections: "corrupted_string" // non-array
      }
    },
    gh_my_repo_groups_v2: "not_an_array",
    gh_my_repo_groups_map_v2: {
      "user/repo": {} // corrupted non-array
    }
  };
  const remote = {
    quickLinks: [{ url: "https://github.com", title: "GitHub" }],
    ghLocalStarGroupsV1: {
      "ghLocalStarGroupsV1:user1": {
        version: 1,
        owner: "user1",
        groups: [{ id: "g1", name: "Dev" }],
        memberships: {
          "repo/a": ["g1"]
        },
        sections: ["默认"]
      }
    },
    gh_my_repo_groups_v2: ["Tools"],
    gh_my_repo_groups_map_v2: {
      "user/repo": ["Tools"]
    }
  };

  const merged = mergeSyncSettings(local, remote);
  assert.equal(merged.quickLinks.length, 1);
  const acc = merged.ghLocalStarGroupsV1["ghLocalStarGroupsV1:user1"];
  assert.ok(acc);
  assert.deepEqual(acc.memberships["repo/a"], ["g1"]);
  assert.deepEqual(merged.gh_my_repo_groups_map_v2["user/repo"], ["Tools"]);
});
