import test from "node:test";
import assert from "node:assert/strict";
import { computeConfigDiff } from "../src/services/sync-diff.ts";
import { getLocalDeviceInfo, saveLocalDeviceInfo } from "../src/services/device-identity.ts";

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
