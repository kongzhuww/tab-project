// src/background/dnr.ts
async function removeLegacyGlobalNetRule() {
  if (!chrome.declarativeNetRequest) throw new Error("\u7F51\u7EDC\u89C4\u5219\u63A5\u53E3\u4E0D\u53EF\u7528\uFF0C\u65E7\u89C4\u5219\u6E05\u7406\u672A\u786E\u8BA4");
  await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [88991] });
}
async function initBilibiliNetRules() {
  if (!chrome.declarativeNetRequest || !chrome.runtime?.id) return;
  try {
    await removeLegacyGlobalNetRule();
  } catch {
    console.error("[LogicWeaver] \u65E7\u5168\u7AD9\u8BF7\u6C42\u5934\u89C4\u5219\u6E05\u7406\u5931\u8D25\uFF1B\u8BF7\u68C0\u67E5\u6269\u5C55\u72B6\u6001\u3002");
    return;
  }
  const extId = chrome.runtime.id;
  const RULE_ID_BILI_API = 2001;
  const RULE_ID_BILI_VIDEO = 2002;
  const RULE_ID_BILI_VIDEO_CN = 2003;
  const RULE_ID_BILI_HDSLB = 2004;
  try {
    if (chrome.declarativeNetRequest.getDynamicRules) {
      const existing = await chrome.declarativeNetRequest.getDynamicRules();
      const existingIds = new Set((existing || []).map((r) => r.id));
      if (existingIds.has(RULE_ID_BILI_API) && existingIds.has(RULE_ID_BILI_VIDEO) && existingIds.has(RULE_ID_BILI_VIDEO_CN) && existingIds.has(RULE_ID_BILI_HDSLB)) {
        return;
      }
    }
  } catch {
  }
  const rules = [
    {
      id: RULE_ID_BILI_API,
      priority: 1,
      action: {
        type: "modifyHeaders",
        requestHeaders: [
          { header: "Referer", operation: "set", value: "https://www.bilibili.com/" },
          { header: "Origin", operation: "set", value: "https://www.bilibili.com" }
        ]
      },
      condition: {
        urlFilter: "||bilibili.com/",
        initiatorDomains: [extId],
        excludedInitiatorDomains: ["bilibili.com"],
        resourceTypes: ["xmlhttprequest", "media", "other"]
      }
    },
    {
      id: RULE_ID_BILI_VIDEO,
      priority: 1,
      action: {
        type: "modifyHeaders",
        requestHeaders: [
          { header: "Referer", operation: "set", value: "https://www.bilibili.com/" },
          { header: "Origin", operation: "set", value: "https://www.bilibili.com" }
        ]
      },
      condition: {
        urlFilter: "||bilivideo.com/",
        initiatorDomains: [extId],
        excludedInitiatorDomains: ["bilibili.com"],
        resourceTypes: ["xmlhttprequest", "media", "other"]
      }
    },
    {
      id: RULE_ID_BILI_VIDEO_CN,
      priority: 1,
      action: {
        type: "modifyHeaders",
        requestHeaders: [
          { header: "Referer", operation: "set", value: "https://www.bilibili.com/" },
          { header: "Origin", operation: "set", value: "https://www.bilibili.com" }
        ]
      },
      condition: {
        urlFilter: "||bilivideo.cn/",
        initiatorDomains: [extId],
        excludedInitiatorDomains: ["bilibili.com"],
        resourceTypes: ["xmlhttprequest", "media", "other"]
      }
    },
    {
      id: RULE_ID_BILI_HDSLB,
      priority: 1,
      action: {
        type: "modifyHeaders",
        requestHeaders: [
          { header: "Referer", operation: "set", value: "https://www.bilibili.com/" },
          { header: "Origin", operation: "set", value: "https://www.bilibili.com" }
        ]
      },
      condition: {
        urlFilter: "||hdslb.com/",
        initiatorDomains: [extId],
        resourceTypes: ["xmlhttprequest", "image", "other"]
      }
    }
  ];
  try {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID_BILI_API, RULE_ID_BILI_VIDEO, RULE_ID_BILI_VIDEO_CN, RULE_ID_BILI_HDSLB],
      addRules: rules
    });
  } catch (err) {
    console.warn("Bilibili DNR rules update failed:", err);
  }
}
var RULE_ID_YOUTUBE_COOKIE = 3001;
async function syncYouTubeNetRules() {
  if (!chrome.declarativeNetRequest) return false;
  try {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID_YOUTUBE_COOKIE]
    });
    return true;
  } catch {
    return false;
  }
}

// src/notifications/history-contract.ts
var NOTIFICATION_HISTORY_KEY = "notificationHistoryV1";
var HISTORY_LIMIT = 200;
var HISTORY_AGE_MS = 30 * 864e5;
function safeTarget(raw) {
  if (raw?.type === "todoist-task" && typeof raw.taskId === "string" && /^[A-Za-z0-9_-]{1,100}$/.test(raw.taskId)) return { type: raw.type, taskId: raw.taskId };
  if (raw?.type === "module" && typeof raw.moduleId === "string" && /^[a-z][a-z0-9-]{0,60}$/.test(raw.moduleId)) return { type: raw.type, moduleId: raw.moduleId };
  if (raw?.type === "bili-messages") return { type: raw.type };
  if (raw?.type === "bili-video") {
    if (typeof raw.bvid === "string" && /^BV[A-Za-z0-9]{10}$/.test(raw.bvid)) return { type: raw.type, bvid: raw.bvid };
    if (typeof raw.aid === "string" && /^[1-9][0-9]{0,19}$/.test(raw.aid)) return { type: raw.type, aid: raw.aid };
  }
  if (raw?.type === "github-repository" && typeof raw.fullName === "string" && raw.fullName.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(raw.fullName) && !raw.fullName.split("/").some((part) => part === "." || part === "..")) return { type: raw.type, fullName: raw.fullName };
  return void 0;
}
function biliVideoTargetFromUrl(value) {
  if (typeof value !== "string") return void 0;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port || !["bilibili.com", "www.bilibili.com", "m.bilibili.com"].includes(url.hostname)) return void 0;
    const match = /^\/video\/(BV[A-Za-z0-9]{10}|av[1-9][0-9]{0,19})\/?$/.exec(url.pathname);
    if (match) return match[1].startsWith("BV") ? { type: "bili-video", bvid: match[1] } : { type: "bili-video", aid: match[1].slice(2) };
  } catch {
  }
  return void 0;
}
function biliVideoTargetFromText(text) {
  const targets = /* @__PURE__ */ new Map();
  for (const match of text.matchAll(/https:\/\/[^\s<>"']+/g)) {
    const target = biliVideoTargetFromUrl(match[0].replace(/[)）。，,;；]+$/, ""));
    if (target) targets.set(JSON.stringify(target), target);
  }
  return targets.size === 1 ? targets.values().next().value : void 0;
}
function historyText(value, length) {
  if (typeof value !== "string") return "";
  return value.slice(0, 6e3).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").replace(/\bBearer\s+[A-Za-z0-9._~+\/-]+=*/gi, "Bearer [\u5DF2\u9690\u85CF]").replace(/\b(?:ghp_|github_pat_|sk-)[A-Za-z0-9_-]{8,}/g, "[\u5DF2\u9690\u85CF]").replace(/((?:token|password|passwd|secret|api[_-]?key|authorization|cookie)\s*[:=]\s*)[^\s,;]+/gi, "$1[\u5DF2\u9690\u85CF]").replace(/https?:\/\/[^\s<>"']+/gi, (value2) => {
    try {
      const url = new URL(value2);
      url.username = "";
      url.password = "";
      url.search = "";
      url.hash = "";
      return url.href;
    } catch {
      return "[\u94FE\u63A5]";
    }
  }).slice(0, length);
}
function safeArchive(raw) {
  if (!raw || typeof raw.id !== "string" || !/^[A-Za-z0-9_:-]{1,200}$/.test(raw.id) || typeof raw.title !== "string" || !Number.isFinite(raw.createdAt) || !["info", "success", "warning", "error"].includes(raw.level)) throw new Error("Invalid notification record");
  let target = safeTarget(raw.target);
  if (raw.appType === "bili" && (!target || target.type === "bili-messages")) {
    target = biliVideoTargetFromText([raw.title, raw.subtitle, raw.message].filter((value) => typeof value === "string").join(" ")) || target;
  }
  return { id: raw.id, appType: historyText(raw.appType, 40), appName: historyText(raw.appName, 60), title: historyText(raw.title, 160), subtitle: historyText(raw.subtitle, 240), message: historyText(raw.message, 2e3), level: raw.level, createdAt: raw.createdAt, read: raw.read === true, target };
}
function safeSnapshot(raw) {
  if (raw == null) return { version: 0, items: [] };
  if (!raw || !Number.isSafeInteger(raw.version) || raw.version < 0 || !Array.isArray(raw.items) || raw.items.length > HISTORY_LIMIT) throw new Error("Invalid notification history");
  const now = Date.now();
  return { version: raw.version, items: raw.items.map(safeArchive).filter((item) => item.createdAt >= now - HISTORY_AGE_MS && item.createdAt <= now + 6e4).sort((a, b) => b.createdAt - a.createdAt) };
}

// src/notifications/history-repository.ts
var queue = Promise.resolve();
function notificationHistoryOperation(action, payload) {
  const operation = queue.then(async () => {
    if (typeof chrome === "undefined" || !chrome.storage?.local) {
      throw new Error("Chrome storage API unavailable");
    }
    const stored = await chrome.storage.local.get(NOTIFICATION_HISTORY_KEY);
    const snapshot = safeSnapshot(stored[NOTIFICATION_HISTORY_KEY]);
    if (action === "list") {
      return snapshot;
    }
    if (action === "append") {
      const item = safeArchive(payload);
      item.createdAt = Date.now();
      item.read = false;
      if (!snapshot.items.some((entry) => entry.id === item.id)) {
        snapshot.items.unshift(item);
      }
      snapshot.items = snapshot.items.slice(0, HISTORY_LIMIT);
    } else if (action === "read-all") {
      snapshot.items = snapshot.items.map((item) => ({ ...item, read: true }));
    } else if (action === "clear") {
      snapshot.items = [];
    } else if (action === "read" || action === "remove") {
      if (typeof payload !== "string" || payload.length > 200) {
        throw new Error("Invalid notification id");
      }
      if (action === "remove") {
        snapshot.items = snapshot.items.filter((item) => item.id !== payload);
      } else {
        snapshot.items = snapshot.items.map((item) => item.id === payload ? { ...item, read: true } : item);
      }
    } else {
      throw new Error("Invalid history operation");
    }
    snapshot.version++;
    await chrome.storage.local.set({ [NOTIFICATION_HISTORY_KEY]: snapshot });
    return snapshot;
  });
  queue = operation.catch(() => {
  });
  return operation;
}

// src/todoist/local-reminders.ts
var PREFIX = "todoist_reminder_v2:";
var REMINDER_ALARM = "todoist_remind_";
async function readReminder(taskId) {
  if (typeof chrome === "undefined" || !chrome.storage?.local) return void 0;
  const key = PREFIX + taskId;
  const stored = await chrome.storage.local.get([key, "todoist_reminders_map_v1"]);
  if (Object.prototype.hasOwnProperty.call(stored, key)) return stored[key] || void 0;
  return stored.todoist_reminders_map_v1?.[taskId];
}
async function deliverReminder(taskId) {
  const reminder = await readReminder(taskId);
  if (!reminder) return;
  const when = new Date(reminder.time).getTime();
  if (!Number.isFinite(when)) return;
  if (when > Date.now() + 1e3) {
    await chrome.alarms.create(REMINDER_ALARM + taskId, { when });
    return;
  }
  try {
    await notificationHistoryOperation("append", {
      id: "reminder_" + taskId + "_" + when,
      appType: "todoist",
      appName: "Todoist",
      title: "\u4EFB\u52A1\u63D0\u9192",
      subtitle: "",
      message: reminder.title || "\u4EFB\u52A1\u65F6\u95F4\u5DF2\u5230",
      level: "info",
      createdAt: Date.now(),
      read: false,
      target: { type: "todoist-task", taskId }
    });
  } catch {
    console.warn("[Todoist Alarm] Notification history was not confirmed.");
  }
  await chrome.notifications.create(REMINDER_ALARM + taskId, { type: "basic", iconUrl: chrome.runtime.getURL("assets/icon-128.png"), title: "\u5F85\u529E\u63D0\u9192", message: reminder.title || "\u4EFB\u52A1\u65F6\u95F4\u5DF2\u5230", priority: 2 });
  await chrome.storage.local.set({ [PREFIX + taskId]: null });
}
async function restoreReminderAlarms() {
  const stored = await chrome.storage.local.get(null);
  const tasks = /* @__PURE__ */ new Map();
  for (const [id, value] of Object.entries(stored.todoist_reminders_map_v1 || {})) tasks.set(id, value);
  for (const [key, value] of Object.entries(stored)) if (key.startsWith(PREFIX)) tasks.set(key.slice(PREFIX.length), value);
  for (const [id, value] of tasks) {
    if (!value) continue;
    const time = new Date(value.time).getTime();
    if (Number.isFinite(time)) await chrome.alarms.create(REMINDER_ALARM + id, { when: Math.max(Date.now() + 1e3, time) });
  }
}

// src/background/notifications.ts
function enableStickerSidePanel() {
  if (!chrome.sidePanel?.setPanelBehavior) return;
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {
  });
}
function flashBadge(text, color) {
  return new Promise((resolve) => {
    chrome.action.setBadgeText({ text });
    chrome.action.setBadgeBackgroundColor({ color });
    setTimeout(() => {
      chrome.action.setBadgeText({ text: "" });
    }, 2e3);
    resolve();
  });
}
function initNotificationListeners() {
  if (typeof chrome === "undefined") return;
  void restoreReminderAlarms().catch(() => console.warn("[Todoist Alarm] Restore failed."));
  chrome.alarms?.onAlarm?.addListener?.(async (alarm) => {
    if (alarm.name === "clear-badge") {
      chrome.action.setBadgeText({ text: "" });
    } else if (alarm.name?.startsWith("todoist_remind_")) {
      try {
        await deliverReminder(alarm.name.slice("todoist_remind_".length));
      } catch {
        console.warn("[Todoist Alarm] Notification not confirmed; reminder retained.");
      }
    }
  });
}

// src/background/tab-manager.ts
function isLogicWeaverHomeUrl(value) {
  if (typeof value !== "string") return false;
  if (["chrome://newtab/", "chrome://new-tab-page/", "edge://newtab/"].includes(value)) return true;
  const prefixes = [
    chrome.runtime.getURL("newtab.html"),
    chrome.runtime.getURL("newtab-bootstrap.html"),
    chrome.runtime.getURL("newtab-search.html")
  ];
  return prefixes.some((prefix) => value.startsWith(prefix));
}
function chooseExistingHomeTab(tabs, excludedId = -1) {
  return (tabs || []).filter(
    (tab) => tab.id != null && tab.id !== excludedId && (isLogicWeaverHomeUrl(tab.url) || isLogicWeaverHomeUrl(tab.pendingUrl))
  ).sort((left, right) => {
    if (!!left.active !== !!right.active) return right.active ? 1 : -1;
    return (right.lastAccessed || 0) - (left.lastAccessed || 0) || (left.id || 0) - (right.id || 0);
  })[0] || null;
}
async function focusHomeTab(tab) {
  if (!tab?.id) return false;
  if (tab.windowId != null) await chrome.windows.update(tab.windowId, { focused: true });
  await chrome.tabs.update(tab.id, { active: true });
  return true;
}
async function openOrFocusNewTab() {
  const existing = chooseExistingHomeTab(await chrome.tabs.query({}));
  if (existing) {
    await focusHomeTab(existing);
    return;
  }
  await chrome.tabs.create({ url: chrome.runtime.getURL("newtab.html"), active: true });
}
function dedupeLogicWeaverNewTab(sender, sendResponse) {
  const senderTab = sender?.tab;
  if (senderTab?.id == null || senderTab.windowId == null) {
    sendResponse({ action: "open-home" });
    return;
  }
  chrome.storage.local.get(["singleNewTab"], (stored) => {
    const enabled = stored.singleNewTab === true;
    if (!enabled) {
      sendResponse({ action: "open-home" });
      return;
    }
    chrome.tabs.query({ windowId: senderTab.windowId }, (tabs) => {
      if (chrome.runtime.lastError) {
        sendResponse({ action: "open-home" });
        return;
      }
      const homeTabs = (tabs || []).filter((tab) => {
        if (!tab || tab.id === senderTab.id) return false;
        const u = tab.url || tab.pendingUrl || "";
        if (u.includes("newtab-bootstrap.html") || u.includes("newtab-search.html")) return false;
        return u.includes("newtab.html") || u.startsWith("chrome://newtab") || u.startsWith("edge://newtab") || u.startsWith("chrome://new-tab-page");
      });
      if (homeTabs.length === 0) {
        sendResponse({ action: "open-home" });
      } else {
        sendResponse({ action: "open-search", existingTabId: homeTabs[0].id });
      }
    });
  });
}
function normalizeUrl(value) {
  try {
    return new URL(value).href;
  } catch {
    return value;
  }
}
function hostOf(value) {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
}
async function bookmarkCurrentTab(tab, targetPage = "\u5E38\u7528\u7F51\u7AD9") {
  try {
    const url = normalizeUrl(tab?.url || "");
    if (!/^https?:\/\//i.test(url)) {
      await flashBadge("\u2715", "#f87171");
      return { ok: false, error: "\u5F53\u524D\u9875\u9762\u4E0D\u662F\u666E\u901A\u7F51\u9875\uFF08\u4EC5\u652F\u6301 http/https \u7F51\u5740\uFF09" };
    }
    const stored = await chrome.storage.local.get(["quickLinks", "quickLinkGroupSizes", "quickLinksReady"]);
    const links = Array.isArray(stored.quickLinks) ? stored.quickLinks : [];
    const existing = links.find((link) => {
      try {
        return normalizeUrl(link.url) === url;
      } catch {
        return false;
      }
    });
    const pageName = targetPage || "\u5E38\u7528\u7F51\u7AD9";
    if (existing) {
      existing.group = "\u5E38\u7528\u7F51\u7AD9";
      existing.page = pageName;
      if (!existing.title && tab?.title) existing.title = tab.title;
      if (!existing.customIcon && tab?.favIconUrl) existing.customIcon = tab.favIconUrl;
    } else {
      links.push({
        id: crypto.randomUUID(),
        title: tab?.title || hostOf(url),
        url,
        group: "\u5E38\u7528\u7F51\u7AD9",
        page: pageName,
        customIcon: tab?.favIconUrl || ""
      });
    }
    await chrome.storage.local.set({
      quickLinks: links,
      quickLinkGroupSizes: stored.quickLinkGroupSizes || {},
      quickLinksReady: true
    });
    await flashBadge("\u2713", "#34d399");
    return { ok: true, existed: !!existing };
  } catch (error) {
    await flashBadge("!", "#f87171");
    return { ok: false, error: error?.message || "\u6536\u85CF\u5931\u8D25" };
  }
}
function isBrowserDefaultNewTab(tab) {
  if (!tab) return false;
  const u = tab.url || tab.pendingUrl || "";
  const title = (tab.title || "").trim();
  const myId = chrome.runtime.id;
  if (u.includes(myId) || u.includes("newtab.html") || u.includes("bilibili.html")) return false;
  if (/^https?:\/\//i.test(u)) return false;
  if (u === "edge://newtab/" || u === "edge://newtab" || u === "chrome://newtab/" || u === "chrome://newtab" || u === "chrome://new-tab-page/" || u === "chrome://new-tab-page" || u.startsWith("chrome-search://") || u === "about:blank" || u === "") {
    if (title === "\u65B0\u5EFA\u6807\u7B7E\u9875" || title === "\u65B0\u6807\u7B7E\u9875" || title === "New Tab" || title === "New tab" || title === "" || u.includes("newtab")) {
      return true;
    }
  }
  return false;
}
async function cleanupOrReplaceBrowserDefaultNewTabs() {
  if (typeof chrome === "undefined" || !chrome.tabs?.query) return;
  try {
    const tabs = await chrome.tabs.query({});
    const myId = chrome.runtime.id;
    const ownTabs = tabs.filter((t) => {
      const u = t.url || t.pendingUrl || "";
      return u.includes(myId) && u.includes("newtab.html");
    });
    const strayTabs = tabs.filter(isBrowserDefaultNewTab);
    if (!strayTabs.length) return;
    let singleNewTab = false;
    try {
      const stored = await chrome.storage?.local?.get(["singleNewTab"]);
      singleNewTab = stored?.singleNewTab === true;
    } catch {
    }
    const homeUrl = chrome.runtime.getURL("newtab.html");
    const searchUrl = chrome.runtime.getURL("newtab-search.html");
    if (ownTabs.length > 0) {
      const targetUrl = singleNewTab ? searchUrl : homeUrl;
      for (const st of strayTabs) {
        if (st.id != null) {
          try {
            await chrome.tabs.update(st.id, { url: targetUrl });
          } catch {
          }
        }
      }
    } else {
      const [first, ...rest] = strayTabs;
      if (first?.id != null) {
        try {
          await chrome.tabs.update(first.id, { url: homeUrl });
        } catch {
        }
      }
      for (const r of rest) {
        if (r.id != null) {
          try {
            await chrome.tabs.update(r.id, { url: singleNewTab ? searchUrl : homeUrl });
          } catch {
          }
        }
      }
    }
  } catch {
  }
}
function initTabWatcher() {
  if (typeof chrome === "undefined" || !chrome.tabs?.onCreated) return;
  chrome.tabs.onCreated.addListener(() => {
    setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 300);
  });
  chrome.tabs.onUpdated.addListener((_tabId, changeInfo) => {
    if (changeInfo.status === "complete" || changeInfo.title) {
      setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 300);
    }
  });
}

// src/background/image-proxy.ts
function handleSearchWebImages(message, sendResponse) {
  const query = String(message?.query || "").trim();
  if (!query) {
    sendResponse({ ok: true, items: [] });
    return false;
  }
  const bingPromise = (async () => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3500);
      const bingUrl = `https://cn.bing.com/images/async?q=${encodeURIComponent(query + " \u56FE\u6807")}&first=1&count=20&mmasync=1`;
      const res = await fetch(bingUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"
        }
      });
      clearTimeout(timer);
      const html = await res.text();
      const cards = [...html.matchAll(/class=["']iusc["'][^>]*m=["']([^"']+)["']/g)].map((m) => {
        try {
          return JSON.parse(m[1].replace(/&quot;/g, '"'));
        } catch {
          return null;
        }
      }).filter(Boolean);
      const list = [];
      cards.slice(0, 16).forEach((card) => {
        const rawTitle = (card.t || card.desc || `${query} \u56FE\u6807`).replace(/[\uE000-\uE001]|<[^>]+>/g, "").slice(0, 20);
        const cdnThumb = card.turl ? card.turl.replace(/&amp;/g, "&") : "";
        const original = card.murl;
        const primaryUrl = cdnThumb || original;
        if (primaryUrl) {
          list.push({
            title: rawTitle,
            url: primaryUrl,
            fallbackUrl: original !== primaryUrl ? original : "",
            source: "webimg",
            sourceLabel: "\u9AD8\u6E05\u56FE\u6807"
          });
        }
      });
      return list;
    } catch {
      return [];
    }
  })();
  const baiduPromise = (async () => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3e3);
      const url = `https://image.baidu.com/search/acjson?tn=resultjson_com&logid=1&ipn=rj&ct=201326592&is=&fp=result&fr=&word=${encodeURIComponent(
        query + " \u56FE\u6807"
      )}&queryWord=${encodeURIComponent(
        query + " \u56FE\u6807"
      )}&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&hd=&latest=&copyright=&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&expermode=&nojc=&isAsync=&pn=0&rn=12`;
      const r = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);
      const data = await r.json();
      return (data?.data || []).filter((x) => x?.thumbURL).slice(0, 12).map((x) => ({
        title: (x.fromPageTitleEnc || query).replace(/<[^>]+>/g, "").slice(0, 20),
        url: x.thumbURL,
        source: "webimg",
        sourceLabel: "\u7CBE\u9009\u56FE\u6807"
      }));
    } catch {
      return [];
    }
  })();
  Promise.allSettled([bingPromise, baiduPromise]).then((resultsArray) => {
    const merged = [];
    const seen = /* @__PURE__ */ new Set();
    resultsArray.forEach((res) => {
      if (res.status === "fulfilled" && Array.isArray(res.value)) {
        res.value.forEach((item) => {
          if (!seen.has(item.url)) {
            seen.add(item.url);
            merged.push(item);
          }
        });
      }
    });
    sendResponse({ ok: true, items: merged.slice(0, 24) });
  }).catch((err) => {
    sendResponse({ ok: false, error: err?.message, items: [] });
  });
  return true;
}
function handleFetchSiteImages(message, sendResponse) {
  const siteUrl = String(message?.url || "").trim();
  if (!siteUrl) {
    sendResponse({ ok: true, items: [] });
    return false;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  fetch(siteUrl, { signal: controller.signal }).then((r) => r.text()).then((html) => {
    clearTimeout(timer);
    const origin = new URL(siteUrl).origin;
    const items = [];
    const seen = /* @__PURE__ */ new Set();
    const matches = [...html.matchAll(/(?:src|href)=["']([^"']+\.(?:png|jpg|jpeg|svg|ico|webp)(?:\?[^"']*)?)["']/gi)];
    matches.forEach((m) => {
      try {
        const raw = m[1];
        const fullUrl = new URL(raw, origin).href;
        const lower = fullUrl.toLowerCase();
        if (seen.has(fullUrl)) return;
        if (/logo|icon|favicon|touch|brand|avatar|mark/i.test(lower)) {
          seen.add(fullUrl);
          items.unshift({
            title: "\u7F51\u7AD9\u56FE\u6807",
            url: fullUrl,
            source: "siteextract",
            sourceLabel: "\u7AD9\u70B9\u539F\u751F"
          });
        } else if (items.length < 8) {
          seen.add(fullUrl);
          items.push({
            title: "\u7F51\u9875\u56FE\u7247",
            url: fullUrl,
            source: "siteextract",
            sourceLabel: "\u7F51\u9875\u56FE\u7247"
          });
        }
      } catch {
      }
    });
    sendResponse({ ok: true, items: items.slice(0, 10) });
  }).catch((err) => {
    clearTimeout(timer);
    sendResponse({ ok: false, error: err?.message, items: [] });
  });
  return true;
}

// src/background/media-fetch.ts
var MAX_IMAGE_BYTES = 12 * 1024 * 1024;
var MAX_IMAGE_PIXELS = 24 * 1024 * 1024;
var imageJobs = 0;
function acquireImageSlot() {
  if (imageJobs >= 2) throw new Error("\u56FE\u7247\u5904\u7406\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5");
  imageJobs++;
  return () => {
    imageJobs--;
  };
}
function mediaUrl(value) {
  if (typeof value !== "string" || value.length > 8192) throw new Error("\u8D44\u6E90\u5730\u5740\u65E0\u6548");
  const url = new URL(value);
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) throw new Error("\u8D44\u6E90\u5730\u5740\u65E0\u6548");
  return url.href;
}
async function fetchImageBytes(value, headers) {
  const url = mediaUrl(value);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15e3);
  let reader;
  try {
    const response = await fetch(url, { headers, signal: controller.signal, credentials: "omit", redirect: "error", referrerPolicy: "no-referrer" });
    if (!response.ok) throw new Error(`\u56FE\u7247\u8BFB\u53D6\u5931\u8D25\uFF08HTTP ${response.status}\uFF09`);
    if (Number(response.headers.get("content-length")) > MAX_IMAGE_BYTES) throw new Error("\u56FE\u7247\u8D85\u8FC7 12 MiB \u9650\u5236");
    if (!response.body) throw new Error("\u56FE\u7247\u54CD\u5E94\u4E3A\u7A7A");
    reader = response.body.getReader();
    const chunks = [];
    let size = 0;
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > MAX_IMAGE_BYTES) throw new Error("\u56FE\u7247\u8D85\u8FC7 12 MiB \u9650\u5236");
      chunks.push(part.value);
    }
    if (!size) throw new Error("\u56FE\u7247\u54CD\u5E94\u4E3A\u7A7A");
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return bytes.buffer;
  } catch (error) {
    if (controller.signal.aborted) throw new Error("\u56FE\u7247\u8BFB\u53D6\u8D85\u65F6\uFF0C\u8BF7\u624B\u52A8\u91CD\u8BD5");
    if (error instanceof TypeError) throw new Error("\u56FE\u7247\u7F51\u7EDC\u8BF7\u6C42\u5931\u8D25\u6216\u53D1\u751F\u91CD\u5B9A\u5411\uFF0C\u672A\u964D\u7EA7\u4E3A HTTP");
    throw error;
  } finally {
    controller.abort();
    if (reader) {
      try {
        await reader.cancel();
      } catch {
      }
      reader.releaseLock();
    }
    clearTimeout(timer);
  }
}
async function validateImagePixels(buffer, mime) {
  const view = new DataView(buffer);
  let width = 0, height = 0;
  if (mime === "image/png" && buffer.byteLength >= 24) {
    width = view.getUint32(16);
    height = view.getUint32(20);
  }
  if (mime === "image/gif" && buffer.byteLength >= 10) {
    width = view.getUint16(6, true);
    height = view.getUint16(8, true);
  }
  if (width * height > MAX_IMAGE_PIXELS || width > 16384 || height > 16384) throw new Error("\u56FE\u7247\u5C3A\u5BF8\u8FC7\u5927");
  const bitmap = await createImageBitmap(new Blob([buffer], { type: mime }));
  try {
    if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > MAX_IMAGE_PIXELS || bitmap.width > 16384 || bitmap.height > 16384)
      throw new Error("\u56FE\u7247\u5C3A\u5BF8\u8FC7\u5927\uFF08\u6700\u591A 24M \u50CF\u7D20\uFF0C\u5355\u8FB9\u4E0D\u8D85\u8FC7 16384\uFF09");
  } finally {
    bitmap.close();
  }
}

// src/background/index.ts
initBilibiliNetRules();
initNotificationListeners();
for (const name of ["gmail-inbox-poll", "x-account-poll"]) {
  chrome.alarms.clear(name).catch(() => console.warn("[Migration] Could not clear retired feed alarm"));
}
initTabWatcher();
initContextMenu();
if (typeof chrome !== "undefined" && chrome.commands?.onCommand) {
  chrome.commands.onCommand.addListener((command, tab) => {
    if (command === "focus-newtab") void openOrFocusNewTab();
    if (command === "open-side-panel") {
      const failed = () => {
        void flashBadge("ERR", "#ef4444");
        console.warn("[SidePanel] Could not open panel from keyboard command.");
      };
      if (Number.isInteger(tab?.windowId) && tab.windowId >= 0) {
        chrome.sidePanel.open({ windowId: tab.windowId }).catch(failed);
      } else {
        chrome.windows.getLastFocused().then((win) => {
          if (!Number.isInteger(win.id)) throw new Error("No active browser window");
          return chrome.sidePanel.open({ windowId: win.id });
        }).catch(failed);
      }
    }
  });
}
function bufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 32768;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk);
  }
  return btoa(binary);
}
function cleanBiliImageUrl(rawUrl) {
  let u = rawUrl.trim();
  if (u.startsWith("//")) u = "https:" + u;
  const gifMatch = u.match(/(https?:\/\/[^?#]+?\.gif)(?:@[^?#]*)?(?:\?[^#]*)?$/i);
  if (gifMatch) {
    return gifMatch[1];
  }
  if (u.includes("hdslb.com/bfs/")) {
    u = u.replace(/@[^/?#]+$/i, "");
    const embeddedExtMatch = u.match(/^(https?:\/\/.+?\.(?:png|jpe?g|gif))\.avif$/i);
    if (embeddedExtMatch) {
      return embeddedExtMatch[1];
    }
  }
  return u;
}
function detectImageFormatByMagic(bytes) {
  if (bytes[0] === 71 && bytes[1] === 73 && bytes[2] === 70) {
    return { ext: "gif", isAvif: false };
  }
  if (bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71) {
    return { ext: "png", isAvif: false };
  }
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) {
    return { ext: "jpg", isAvif: false };
  }
  if (bytes[0] === 82 && bytes[1] === 73 && bytes[2] === 70 && bytes[3] === 70 && bytes[8] === 87 && bytes[9] === 69 && bytes[10] === 66 && bytes[11] === 80) {
    return { ext: "webp", isAvif: false };
  }
  const headerStr = String.fromCharCode.apply(null, Array.from(bytes.slice(0, 16)));
  if (headerStr.includes("ftypavif") || headerStr.includes("ftypavis")) {
    return { ext: "avif", isAvif: true };
  }
  throw new Error("\u4E0D\u652F\u6301\u7684\u56FE\u7247\u683C\u5F0F");
}
async function convertAvifToPngDataUrl(buffer) {
  const bitmap = await createImageBitmap(new Blob([buffer], { type: "image/avif" }));
  try {
    if (bitmap.width * bitmap.height > MAX_IMAGE_PIXELS || bitmap.width > 16384 || bitmap.height > 16384)
      throw new Error("\u56FE\u7247\u5C3A\u5BF8\u8FC7\u5927");
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("\u56FE\u7247\u8F6C\u6362\u4E0D\u53EF\u7528");
    ctx.drawImage(bitmap, 0, 0);
    const pngBlob = await canvas.convertToBlob({ type: "image/png" });
    if (pngBlob.size > MAX_IMAGE_BYTES) throw new Error("\u8F6C\u6362\u540E\u7684\u56FE\u7247\u8D85\u8FC7 12 MiB \u9650\u5236");
    return `data:image/png;base64,${bufferToBase64(await pngBlob.arrayBuffer())}`;
  } finally {
    bitmap.close();
  }
}
async function saveImageToFavoritesFolder(param) {
  let release;
  try {
    release = acquireImageSlot();
    let buffer;
    if (param.dataUrl) {
      if (param.dataUrl.length > Math.ceil(MAX_IMAGE_BYTES / 3) * 4 + 128 || !/^data:image\/(?:png|jpeg|gif|webp|avif);base64,/i.test(param.dataUrl)) throw new Error("\u56FE\u7247\u683C\u5F0F\u65E0\u6548\u6216\u8D85\u8FC7 12 MiB \u9650\u5236");
      const raw = atob(param.dataUrl.slice(param.dataUrl.indexOf(",") + 1));
      if (raw.length > MAX_IMAGE_BYTES) throw new Error("\u56FE\u7247\u8D85\u8FC7 12 MiB \u9650\u5236");
      buffer = Uint8Array.from(raw, (char) => char.charCodeAt(0)).buffer;
    } else if (param.url) {
      buffer = await fetchImageBytes(cleanBiliImageUrl(param.url));
    } else throw new Error("\u56FE\u7247\u5730\u5740\u4E3A\u7A7A");
    const magic = detectImageFormatByMagic(new Uint8Array(buffer));
    const mime = magic.ext === "jpg" ? "image/jpeg" : "image/" + magic.ext;
    await validateImagePixels(buffer, mime);
    const dataUrl = magic.isAvif ? await convertAvifToPngDataUrl(buffer) : `data:${mime};base64,${bufferToBase64(buffer)}`;
    const ext = magic.isAvif ? "png" : magic.ext;
    const fileName = `${(/* @__PURE__ */ new Date()).toISOString().replace(/[-:TZ.]/g, "").slice(0, 14)}-${crypto.randomUUID().slice(0, 6)}.${ext}`;
    await chrome.downloads.download({ url: dataUrl, filename: `\u65B0\u6807\u7B7E\u9875/\u6536\u85CF\u5939/${fileName}`, saveAs: false, conflictAction: "uniquify" });
    flashBadge("DL", "#10b981");
    return { ok: true, fileName };
  } catch (error) {
    flashBadge("ERR", "#ef4444");
    return { ok: false, error: error instanceof Error ? error.message : "\u56FE\u7247\u4E0B\u8F7D\u672A\u521B\u5EFA" };
  } finally {
    release?.();
  }
}
globalThis.saveImageToFavoritesFolder = saveImageToFavoritesFolder;
function initContextMenu() {
  if (!chrome.contextMenus) return;
  try {
    chrome.contextMenus.removeAll(() => {
      chrome.contextMenus.create({
        id: "lw-save-image-to-fav",
        title: "\u{1F4E5} \u4FDD\u5B58\u56FE\u7247\u5230\u300C\u6536\u85CF\u5939\u300D",
        contexts: ["image"]
      });
    });
  } catch {
  }
}
chrome.contextMenus?.onClicked?.addListener?.(async (info) => {
  if (info.menuItemId === "lw-save-image-to-fav") {
    await saveImageToFavoritesFolder({ url: info.srcUrl });
  }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "dedupeLogicWeaverNewTab") {
    dedupeLogicWeaverNewTab(sender, sendResponse);
    return true;
  }
  if (message?.type === "saveToFavorites") {
    saveImageToFavoritesFolder(message).then(sendResponse);
    return true;
  }
  if (message?.type === "downloadBiliVideo") {
    (async () => {
      try {
        const { url, fileName } = message;
        if (!url || !fileName) throw new Error("\u7F3A\u5C11\u4E0B\u8F7D\u53C2\u6570");
        await removeLegacyGlobalNetRule();
        const downloadUrl = mediaUrl(url);
        const downloadId = await chrome.downloads.download({
          url: downloadUrl,
          filename: fileName,
          saveAs: false,
          conflictAction: "uniquify"
        });
        flashBadge("DL", "#10b981");
        return { ok: true, downloadId };
      } catch (err) {
        flashBadge("ERR", "#ef4444");
        return { ok: false, error: err?.message || "\u89C6\u9891\u4E0B\u8F7D\u5931\u8D25" };
      }
    })().then(sendResponse);
    return true;
  }
  if (message?.type === "bookmarkCurrentPage") {
    (async () => {
      let targetTab = message?.tab;
      const targetPage = message?.targetPage || "\u5E38\u7528\u7F51\u7AD9";
      if (!targetTab || !targetTab.url) {
        try {
          const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
          if (tabs && tabs.length && tabs[0]?.url) targetTab = tabs[0];
        } catch {
        }
      }
      if (!targetTab || !targetTab.url) {
        try {
          const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
          if (tabs && tabs.length && tabs[0]?.url) targetTab = tabs[0];
        } catch {
        }
      }
      return bookmarkCurrentTab(targetTab, targetPage);
    })().then(sendResponse).catch((err) => {
      sendResponse({ ok: false, error: err?.message || "\u4FDD\u5B58\u5931\u8D25" });
    });
    return true;
  }
  if (message?.type === "searchWebImages") {
    return handleSearchWebImages(message, sendResponse);
  }
  if (message?.type === "fetchSiteImages") {
    return handleFetchSiteImages(message, sendResponse);
  }
  if (message?.type === "cleanupNativeTabs" || message?.type === "cleanupBrowserDefaultTabs") {
    cleanupOrReplaceBrowserDefaultNewTabs().then(() => sendResponse({ ok: true }));
    return true;
  }
  if (message?.type === "fetchImageForClipboard") {
    const rawUrl = String(message?.url || "").trim();
    if (!rawUrl) {
      sendResponse({ ok: false, error: "\u56FE\u7247\u94FE\u63A5\u4E3A\u7A7A" });
      return false;
    }
    (async () => {
      let release;
      try {
        release = acquireImageSlot();
        const buffer = await fetchImageBytes(cleanBiliImageUrl(rawUrl));
        const magic = detectImageFormatByMagic(new Uint8Array(buffer));
        const mime = magic.ext === "jpg" ? "image/jpeg" : "image/" + magic.ext;
        await validateImagePixels(buffer, mime);
        const dataUrl = magic.isAvif ? await convertAvifToPngDataUrl(buffer) : `data:${mime};base64,${bufferToBase64(buffer)}`;
        sendResponse({ ok: true, dataUrl, isPng: magic.isAvif || magic.ext === "png" });
      } catch (error) {
        sendResponse({ ok: false, error: error instanceof Error ? error.message : "\u56FE\u7247\u8BFB\u53D6\u5931\u8D25" });
      } finally {
        release?.();
      }
    })();
    return true;
  }
  if (message?.type === "syncYouTubeNetRules") {
    syncYouTubeNetRules().then((ok) => sendResponse({ ok }));
    return true;
  }
  if (message?.type === "fetchYouTubeHtml") {
    (async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 25e3);
      try {
        const url = message.url || "https://www.youtube.com/";
        const resp = await fetch(url, {
          credentials: "include",
          signal: controller.signal,
          headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache"
          }
        });
        clearTimeout(timer);
        const html = await resp.text();
        sendResponse({
          ok: resp.ok,
          status: resp.status,
          finalUrl: resp.url,
          html
        });
      } catch (err) {
        clearTimeout(timer);
        sendResponse({ ok: false, error: err?.message || String(err) });
      }
    })();
    return true;
  }
  if (message?.type === "fetchYouTubeInnerTube") {
    (async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2e4);
      try {
        const endpoint = message.endpoint || "browse";
        const customPayload = message.payload || {};
        let authHeader = "";
        try {
          const ytCookies = await chrome.cookies?.getAll?.({ domain: ".youtube.com" }) || [];
          const sapisidCookie = ytCookies.find((c) => c.name === "SAPISID" || c.name === "__Secure-3PAPISID" || c.name === "__Secure-1PAPISID");
          if (sapisidCookie?.value) {
            const time = Math.floor(Date.now() / 1e3);
            const encoder = new TextEncoder();
            const data = encoder.encode(`${time} ${sapisidCookie.value} https://www.youtube.com`);
            const hashBuffer = await crypto.subtle.digest("SHA-1", data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
            authHeader = `SAPISIDHASH ${time}_${hashHex}`;
          }
        } catch {
        }
        const headers = {
          "Content-Type": "application/json",
          "X-YouTube-Client-Name": "1",
          "X-YouTube-Client-Version": "2.20240301.00.00",
          "Origin": "https://www.youtube.com",
          "Referer": "https://www.youtube.com/",
          "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7"
        };
        if (authHeader) {
          headers["Authorization"] = authHeader;
          headers["X-Origin"] = "https://www.youtube.com";
        }
        const body = {
          context: {
            client: {
              clientName: "WEB",
              clientVersion: "2.20240301.00.00",
              hl: "zh-CN",
              gl: "JP",
              utcOffsetMinutes: 480
            }
          },
          ...customPayload
        };
        const resp = await fetch(`https://www.youtube.com/youtubei/v1/${endpoint}?prettyPrint=false`, {
          method: "POST",
          headers,
          credentials: "include",
          signal: controller.signal,
          body: JSON.stringify(body)
        });
        clearTimeout(timer);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const json = await resp.json();
        sendResponse({ ok: true, data: json });
      } catch (err) {
        clearTimeout(timer);
        sendResponse({ ok: false, error: err?.message || String(err) });
      }
    })();
    return true;
  }
  if (message?.type === "debugYouTubeCookies") {
    (async () => {
      try {
        const ytCookies = await chrome.cookies?.getAll?.({ domain: ".youtube.com" }) || [];
        const gCookies = await chrome.cookies?.getAll?.({ domain: ".google.com" }) || [];
        const ytNames = ytCookies.map((c) => c.name);
        const gNames = gCookies.map((c) => c.name);
        const hasLogin = ytNames.includes("LOGIN_INFO") || ytNames.includes("SAPISID") || ytNames.includes("SID");
        sendResponse({
          ok: true,
          ytCount: ytCookies.length,
          ytNames,
          gCount: gCookies.length,
          gNames,
          hasLogin
        });
      } catch (err) {
        sendResponse({ ok: false, error: err?.message || String(err) });
      }
    })();
    return true;
  }
});
chrome.runtime.onInstalled?.addListener?.(() => {
  enableStickerSidePanel();
  initBilibiliNetRules();
  syncYouTubeNetRules();
  setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 200);
  setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 1e3);
});
chrome.runtime.onStartup?.addListener?.(() => {
  enableStickerSidePanel();
  initBilibiliNetRules();
  syncYouTubeNetRules();
  setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 200);
  setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 1e3);
});
