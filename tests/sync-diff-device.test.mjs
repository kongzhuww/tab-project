import test from "node:test";
import assert from "node:assert/strict";
import { loadTsModule } from "./helpers/load-ts.mjs";

const { computeConfigDiff, compareLocalAndRemote } = await loadTsModule("src/services/sync-diff.ts");
const { getLocalDeviceInfo, saveLocalDeviceInfo } = await loadTsModule("src/services/device-identity.ts");

test("computeConfigDiff accurately catches quickLinks added and removed", () => {
  const prev = {
    quickLinks: [
      { url: "https://bilibili.com", title: "Bilibili" },
      { url: "https://github.com", title: "GitHub" }
    ]
  };
  const curr = {
    quickLinks: [
      { url: "https://bilibili.com", title: "Bilibili" },
      { url: "https://v2ex.com", title: "V2EX 社区" }
    ]
  };

  const diff = computeConfigDiff(prev, curr);
  assert.equal(diff.length, 2);

  const added = diff.find(d => d.action === "added" && d.category === "sites");
  assert.ok(added);
  assert.match(added.text, /V2EX 社区/);

  const removed = diff.find(d => d.action === "removed" && d.category === "sites");
  assert.ok(removed);
  assert.match(removed.text, /GitHub/);
});

test("computeConfigDiff extracts star groups and settings modifications", () => {
  const prev = {
    ghLocalStarGroupsV1: {
      "ghLocalStarGroupsV1:github-id:1": {
        groups: [{ id: "1", name: "前端框架" }]
      }
    },
    theme: "light",
    showWeather: true
  };
  const curr = {
    ghLocalStarGroupsV1: {
      "ghLocalStarGroupsV1:github-id:1": {
        groups: [
          { id: "1", name: "前端框架" },
          { id: "2", name: "AI大模型" }
        ]
      }
    },
    theme: "dark",
    showWeather: false
  };

  const diff = computeConfigDiff(prev, curr);
  const groupDiff = diff.find(d => d.category === "star-groups");
  assert.ok(groupDiff);
  assert.match(groupDiff.text, /AI大模型/);

  const settingsDiff = diff.find(d => d.category === "settings");
  assert.ok(settingsDiff);
  assert.match(settingsDiff.text, /界面主题/);
  assert.match(settingsDiff.text, /天气挂件/);
});

test("device-identity generates and stores device info in memory/localStorage", async () => {
  const dummyStorage = {};
  globalThis.localStorage = {
    getItem: (k) => dummyStorage[k] || null,
    setItem: (k, v) => { dummyStorage[k] = v; },
    removeItem: (k) => { delete dummyStorage[k]; }
  };

  const info = await getLocalDeviceInfo();
  assert.ok(info.deviceId.startsWith("dev_"));
  assert.ok(info.deviceName.length > 0);

  // Rename device
  await saveLocalDeviceInfo({ ...info, deviceName: "Kongzhu MacBook Pro" });
  const updated = await getLocalDeviceInfo();
  assert.equal(updated.deviceName, "Kongzhu MacBook Pro");
});

test("compareLocalAndRemote reports backpack prompt and article differences", () => {
  const local = {
    logicweaver_prompt_backpack_v1: [{ id: "p1", title: "Local edited" }],
    logicweaver_saved_articles_v1: []
  };
  const remote = {
    logicweaver_prompt_backpack_v1: [{ id: "p1", title: "Cloud original" }, { id: "p2", title: "Cloud only" }],
    logicweaver_saved_articles_v1: [{ id: "a1", title: "Saved article" }]
  };
  const summaries = compareLocalAndRemote(local, remote);
  const promptDiff = summaries.find(s => s.category === "backpack" && s.categoryLabel === "提示词背包");
  const articleDiff = summaries.find(s => s.category === "backpack" && s.categoryLabel === "收藏文章");
  assert.ok(promptDiff);
  assert.match(promptDiff.text, /仅云端 1 条/);
  assert.match(promptDiff.text, /内容差异 1 条/);
  assert.ok(articleDiff);
  assert.match(articleDiff.text, /仅云端 1 篇/);
});
