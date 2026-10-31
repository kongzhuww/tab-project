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

// node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map2 = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map2[key] = 1;
  return (val) => val in map2;
}
var EMPTY_OBJ = true ? Object.freeze({}) : {};
var EMPTY_ARR = true ? Object.freeze([]) : [];
var NOOP = () => {
};
var NO = () => false;
var extend = Object.assign;
var remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isSet = (val) => toTypeString(val) === "[object Set]";
var isFunction = (val) => typeof val === "function";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
var isPlainObject = (val) => toTypeString(val) === "[object Object]";
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return ((str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  });
};
var camelizeRE = /-\w/g;
var camelize = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
  }
);
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
var capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
var toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
var def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
var _globalThis;
var getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isBooleanAttr = /* @__PURE__ */ makeMap(
  specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
);

// node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
function warn(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
var activeEffectScope;
function getCurrentScope() {
  return activeEffectScope;
}
var activeSub;
var pausedQueueEffects = /* @__PURE__ */ new WeakSet();
var ReactiveEffect = class {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope) {
      if (activeEffectScope.active) {
        activeEffectScope.effects.push(this);
      } else {
        this.flags &= -2;
      }
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      if (activeSub !== this) {
        warn(
          "Active effect was not restored correctly - this is likely a Vue internal bug."
        );
      }
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
};
var batchDepth = 0;
var batchedSub;
var batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed2) {
  if (computed2.flags & 4 && !(computed2.flags & 16)) {
    return;
  }
  computed2.flags &= -17;
  if (computed2.globalVersion === globalVersion) {
    return;
  }
  computed2.globalVersion = globalVersion;
  if (!computed2.isSSR && computed2.flags & 128 && (!computed2.deps && !computed2._dirty || !isDirty(computed2))) {
    return;
  }
  computed2.flags |= 2;
  const dep = computed2.dep;
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed2;
  shouldTrack = true;
  try {
    prepareDeps(computed2);
    const value = computed2.fn(computed2._value);
    if (dep.version === 0 || hasChanged(value, computed2._value)) {
      computed2.flags |= 128;
      computed2._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed2);
    computed2.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (dep.subsHead === link) {
    dep.subsHead = nextSub;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
var globalVersion = 0;
var Link = class {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
};
var Dep = class {
  // TODO isolatedDeclarations "__v_skip"
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
    this.__v_skip = true;
    if (true) {
      this.subsHead = void 0;
    }
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    if (activeSub.onTrack) {
      activeSub.onTrack(
        extend(
          {
            effect: activeSub
          },
          debugInfo
        )
      );
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (true) {
        for (let head = this.subsHead; head; head = head.nextSub) {
          if (head.sub.onTrigger && !(head.sub.flags & 8)) {
            head.sub.onTrigger(
              extend(
                {
                  effect: head.sub
                },
                debugInfo
              )
            );
          }
        }
      }
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
};
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed2 = link.dep.computed;
    if (computed2 && !link.dep.subs) {
      computed2.flags |= 4 | 16;
      for (let l = computed2.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    if (link.dep.subsHead === void 0) {
      link.dep.subsHead = link;
    }
    link.dep.subs = link;
  }
}
var targetMap = /* @__PURE__ */ new WeakMap();
var ITERATE_KEY = /* @__PURE__ */ Symbol(
  true ? "Object iterate" : ""
);
var MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  true ? "Map keys iterate" : ""
);
var ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  true ? "Array iterate" : ""
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    if (true) {
      dep.track({
        target,
        type,
        key
      });
    } else {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      if (true) {
        dep.trigger({
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        });
      } else {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function reactiveReadArray(array) {
  const raw = /* @__PURE__ */ toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return /* @__PURE__ */ isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
function toWrapped(target, item) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
  }
  return toReactive(item);
}
var arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toWrapped(this, value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(
      this,
      "filter",
      fn,
      thisArg,
      (v) => v.map((item) => toWrapped(this, item)),
      arguments
    );
  },
  find(fn, thisArg) {
    return apply(
      this,
      "find",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(
      this,
      "findLast",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", (item) => toWrapped(this, item));
  }
};
function iterator(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !/* @__PURE__ */ isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (!result.done) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
var arrayProto = Array.prototype;
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
  let wrappedFn = fn;
  let wrapInitialAccumulator = false;
  if (arr !== self2) {
    if (needsWrap) {
      wrapInitialAccumulator = args.length === 0;
      wrappedFn = function(acc, item, index) {
        if (wrapInitialAccumulator) {
          wrapInitialAccumulator = false;
          acc = toWrapped(self2, acc);
        }
        return fn.call(this, acc, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  const result = arr[method](wrappedFn, ...args);
  return wrapInitialAccumulator ? toWrapped(self2, result) : result;
}
function searchProxy(self2, method, args) {
  const arr = /* @__PURE__ */ toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
    args[0] = /* @__PURE__ */ toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = (/* @__PURE__ */ toRaw(self2))[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty2(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = /* @__PURE__ */ toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
var BaseReactiveHandler = class {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty2;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ isRef(target) ? target : receiver
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (/* @__PURE__ */ isRef(res)) {
      const value = targetIsArray && isIntegerKey(key) ? res : res.value;
      return isReadonly2 && isObject(value) ? /* @__PURE__ */ readonly(value) : value;
    }
    if (isObject(res)) {
      return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
    }
    return res;
  }
};
var MutableReactiveHandler = class extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    const isArrayWithIntegerKey = isArray(target) && isIntegerKey(key);
    if (!this._isShallow) {
      const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
      if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
        oldValue = /* @__PURE__ */ toRaw(oldValue);
        value = /* @__PURE__ */ toRaw(value);
      }
      if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
        if (isOldValueReadonly) {
          if (true) {
            warn(
              `Set operation on key "${String(key)}" failed: target is readonly.`,
              target[key]
            );
          }
          return true;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      /* @__PURE__ */ isRef(target) ? target : receiver
    );
    if (target === /* @__PURE__ */ toRaw(receiver) && result) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
};
var ReadonlyReactiveHandler = class extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    if (true) {
      warn(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    if (true) {
      warn(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
};
var mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
var readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
var shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = /* @__PURE__ */ toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return extend(
      // inheriting all iterator properties
      Object.create(innerIterator),
      {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        }
      }
    );
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    if (true) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        /* @__PURE__ */ toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
      return target.size;
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend(
    instrumentations,
    readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        const target = /* @__PURE__ */ toRaw(this);
        const proto = getProto(target);
        const rawValue = /* @__PURE__ */ toRaw(value);
        const valueToAdd = !shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value) ? rawValue : value;
        const hadKey = proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue);
        if (!hadKey) {
          target.add(valueToAdd);
          trigger(target, "add", valueToAdd, valueToAdd);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
          value = /* @__PURE__ */ toRaw(value);
        }
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        } else if (true) {
          checkIdentityKeys(target, has, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
        return this;
      },
      delete(key) {
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        } else if (true) {
          checkIdentityKeys(target, has, key);
        }
        const oldValue = get ? get.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0, oldValue);
        }
        return result;
      },
      clear() {
        const target = /* @__PURE__ */ toRaw(this);
        const hadItems = target.size !== 0;
        const oldTarget = true ? isMap(target) ? new Map(target) : new Set(target) : void 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0,
            oldTarget
          );
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
var mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
var readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
var shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has, key) {
  const rawKey = /* @__PURE__ */ toRaw(key);
  if (rawKey !== key && has.call(target, rawKey)) {
    const type = toRawType(target);
    warn(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
var reactiveMap = /* @__PURE__ */ new WeakMap();
var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
var readonlyMap = /* @__PURE__ */ new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function reactive(target) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
// @__NO_SIDE_EFFECTS__
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
// @__NO_SIDE_EFFECTS__
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (true) {
      warn(
        `value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(
          target
        )}`
      );
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  if (target["__v_skip"] || !Object.isExtensible(target)) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = targetTypeMap(toRawType(target));
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
// @__NO_SIDE_EFFECTS__
function isReactive(value) {
  if (/* @__PURE__ */ isReadonly(value)) {
    return /* @__PURE__ */ isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
// @__NO_SIDE_EFFECTS__
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
// @__NO_SIDE_EFFECTS__
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
// @__NO_SIDE_EFFECTS__
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
// @__NO_SIDE_EFFECTS__
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? /* @__PURE__ */ toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
var toReactive = (value) => isObject(value) ? /* @__PURE__ */ reactive(value) : value;
var toReadonly = (value) => isObject(value) ? /* @__PURE__ */ readonly(value) : value;
// @__NO_SIDE_EFFECTS__
function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
}
function unref(ref2) {
  return /* @__PURE__ */ isRef(ref2) ? ref2.value : ref2;
}
var shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (/* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return /* @__PURE__ */ isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var INITIAL_WATCHER_VALUE = {};
var cleanupMap = /* @__PURE__ */ new WeakMap();
var activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  } else if (!failSilently) {
    warn(
      `onWatcherCleanup() was called when there was no active watcher to associate with.`
    );
  }
}
function watch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const warnInvalidSource = (s) => {
    (options.onWarn || warn)(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (/* @__PURE__ */ isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect2;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (/* @__PURE__ */ isRef(source)) {
    getter = () => source.value;
    forceTrigger = /* @__PURE__ */ isShallow(source);
  } else if (/* @__PURE__ */ isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => /* @__PURE__ */ isReactive(s) || /* @__PURE__ */ isShallow(s));
    getter = () => source.map((s) => {
      if (/* @__PURE__ */ isRef(s)) {
        return s.value;
      } else if (/* @__PURE__ */ isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return call ? call(s, 2) : s();
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect2.stop();
    if (scope && scope.active) {
      remove(scope.effects, effect2);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      const res = _cb(...args);
      watchHandle();
      return res;
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (immediateFirstRun || deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect2;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          oldValue = newValue;
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect2.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect2 = new ReactiveEffect(getter);
  effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
  cleanup = effect2.onStop = () => {
    const cleanups = cleanupMap.get(effect2);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect2);
    }
  };
  if (true) {
    effect2.onTrack = options.onTrack;
    effect2.onTrigger = options.onTrigger;
  }
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect2.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect2.run();
  }
  watchHandle.pause = effect2.pause.bind(effect2);
  watchHandle.resume = effect2.resume.bind(effect2);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Map();
  if ((seen.get(value) || 0) >= depth) {
    return value;
  }
  seen.set(value, depth);
  depth--;
  if (/* @__PURE__ */ isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}

// node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
var isWarning = false;
function warn$1(msg, ...args) {
  if (isWarning) return;
  isWarning = true;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
var ErrorTypeStrings$1 = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush",
  [15]: "component update",
  [16]: "app unmount cleanup function"
};
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  } else if (true) {
    warn$1(
      `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof fn}`
    );
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = true ? ErrorTypeStrings$1[type] : `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (true) {
    const info = ErrorTypeStrings$1[type];
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  } else if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}
var queue2 = [];
var flushIndex = -1;
var pendingPostFlushCbs = [];
var activePostFlushCbs = null;
var postFlushIndex = 0;
var resolvedPromise = /* @__PURE__ */ Promise.resolve();
var currentFlushPromise = null;
var RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue2.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue2[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue2[queue2.length - 1];
    if (!lastJob || // fast path when the job id is larger than the tail
    !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue2.push(job);
    } else {
      queue2.splice(findInsertionIndex(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    for (let i = 0; i < cb.length; i++) {
      pendingPostFlushCbs.push(cb[i]);
    }
  }
  queueFlush();
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      for (let i = 0; i < deduped.length; i++) {
        activePostFlushCbs.push(deduped[i]);
      }
      return;
    }
    activePostFlushCbs = deduped;
    if (true) {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= -2;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
var getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
  if (true) {
    seen = seen || /* @__PURE__ */ new Map();
  }
  const check = true ? (job) => checkRecursiveUpdates(seen, job) : NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue2.length; flushIndex++) {
      const job = queue2[flushIndex];
      if (job && !(job.flags & 8)) {
        if (check(job)) {
          continue;
        }
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(
          job,
          job.i,
          job.i ? 15 : 14
        );
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue2.length; flushIndex++) {
      const job = queue2[flushIndex];
      if (job) {
        job.flags &= -2;
      }
    }
    flushIndex = -1;
    queue2.length = 0;
    flushPostFlushCbs(seen);
    currentFlushPromise = null;
    if (queue2.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  const count = seen.get(fn) || 0;
  if (count > RECURSION_LIMIT) {
    const instance = fn.i;
    const componentName = instance && getComponentName(instance.type);
    handleError(
      `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    );
    return true;
  }
  seen.set(fn, count + 1);
  return false;
}
var isHmrUpdating = false;
var hmrDirtyComponents = /* @__PURE__ */ new Map();
if (true) {
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
var map = /* @__PURE__ */ new Map();
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    if (!(instance.job.flags & 8)) {
      instance.update();
    }
    isHmrUpdating = false;
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record) return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (let i = 0; i < instances.length; i++) {
    const instance = instances[i];
    const oldComp = normalizeClassComponent(instance.type);
    let dirtyInstances = hmrDirtyComponents.get(oldComp);
    if (!dirtyInstances) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.set(oldComp, dirtyInstances = /* @__PURE__ */ new Set());
    }
    dirtyInstances.add(instance);
    instance.appContext.propsCache.delete(instance.type);
    instance.appContext.emitsCache.delete(instance.type);
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      dirtyInstances.add(instance);
      instance.ceReload(newComp.styles);
      dirtyInstances.delete(instance);
    } else if (instance.parent) {
      queueJob(() => {
        if (!(instance.job.flags & 8)) {
          isHmrUpdating = true;
          instance.parent.update();
          isHmrUpdating = false;
          dirtyInstances.delete(instance);
        }
      });
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn(
        "[HMR] Root or manually mounted instance modified. Full reload required."
      );
    }
    if (instance.root.ce && instance !== instance.root) {
      instance.root.ce._removeChildStyle(oldComp);
    }
  }
  queuePostFlushCb(() => {
    hmrDirtyComponents.clear();
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn(
        `[HMR] Something went wrong during Vue component hot-reload. Full reload required.`
      );
    }
  };
}
var currentRenderingInstance = null;
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = getCurrentInstance();
  if (instance || currentApp) {
    let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else if (true) {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else if (true) {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
var ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
var useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    if (!ctx) {
      warn$1(
        `Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`
      );
    }
    return ctx;
  }
};
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once } = options;
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const baseWatchOptions = extend({}, options);
  if (true) baseWatchOptions.onWarn = warn$1;
  const runsImmediately = cb && immediate || !cb && flush !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {
      };
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush === "post") {
    baseWatchOptions.scheduler = (job) => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(watchHandle);
    } else if (runsImmediately) {
      watchHandle();
    }
  }
  return watchHandle;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
var requestIdleCallback = getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
var cancelIdleCallback = getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else if (true) {
    const apiName = toHandlerKey(ErrorTypeStrings$1[type].replace(/ hook$/, ""));
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
var createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
var onBeforeMount = createHook("bm");
var onMounted = createHook("m");
var onBeforeUpdate = createHook(
  "bu"
);
var onUpdated = createHook("u");
var onBeforeUnmount = createHook(
  "bum"
);
var onUnmounted = createHook("um");
var onServerPrefetch = createHook(
  "sp"
);
var onRenderTriggered = createHook("rtg");
var onRenderTracked = createHook("rtc");
var getPublicInstance = (i) => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
var resolveDevRootEl = (vnode) => {
  let found = false;
  while (true) {
    if (vnode.patchFlag > 0 && vnode.patchFlag & 2048) {
      const root = filterSingleRoot(vnode.children);
      if (!root) {
        return;
      }
      vnode = root;
      found = true;
      continue;
    }
    const component = vnode.component;
    if (component && component.subTree) {
      vnode = component.subTree;
      continue;
    }
    const suspense = vnode.suspense;
    if (suspense && suspense.activeBranch) {
      vnode = suspense.activeBranch;
      continue;
    }
    return found ? vnode.el : void 0;
  }
};
var getDevRootFragmentEl = (i) => {
  const el = i.subTree && resolveDevRootEl(i.subTree);
  return el === void 0 ? i.vnode.el : el;
};
var publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => true ? getDevRootFragmentEl(i) : i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => true ? shallowReadonly(i.props) : i.props,
    $attrs: (i) => true ? shallowReadonly(i.attrs) : i.attrs,
    $slots: (i) => true ? shallowReadonly(i.slots) : i.slots,
    $refs: (i) => true ? shallowReadonly(i.refs) : i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => __VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type,
    $forceUpdate: (i) => i.f || (i.f = () => {
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => __VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP
  })
);
var isReservedPrefix = (key) => key === "_" || key === "$";
var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
var PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (__VUE_OPTIONS_API__ && data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (hasOwn(props, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
        markAttrsAccessed();
      } else if (key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (__VUE_OPTIONS_API__ && data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, props, type }
  }, key) {
    let cssModules;
    return !!(accessCache[key] || __VUE_OPTIONS_API__ && data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
if (true) {
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p) => (normalized[p] = null, normalized),
    {}
  ) : props;
}
var shouldCacheAccess = true;
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
var internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
var currentApp = null;
var accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function filterSingleRoot(children, recurse = true) {
  let singleRoot;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
          if (recurse && singleRoot.patchFlag > 0 && singleRoot.patchFlag & 2048) {
            return filterSingleRoot(singleRoot.children);
          }
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
var queuePostRenderEffect = queueEffectWithSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
var Comment = /* @__PURE__ */ Symbol.for("v-cmt");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
var emptyAppContext = createAppContext();
var currentInstance = null;
var getCurrentInstance = () => currentInstance || currentRenderingInstance;
var internalSetCurrentInstance;
var setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set) => set(v));
      else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
var setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
var isInSSRComponentSetup = false;
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
var classifyRE = /(?:^|[-_])\w/g;
var classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components) || instance.parent && inferFromRegistry(
      instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
function initCustomFormatter() {
  if (typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#1677ff" };
  const stringStyle = { style: "color:#f5222d" };
  const keywordStyle = { style: "color:#eb2f96" };
  const formatter = {
    __vue_custom_formatter: true,
    header(obj) {
      if (!isObject(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        pauseTracking();
        const value = obj.value;
        resetTracking();
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(value),
          `>`
        ];
      } else if (isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance.data)));
    }
    const computed2 = extractKeys(instance, "computed");
    if (computed2) {
      blocks.push(createInstanceBlock("computed", computed2));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v, asRaw = true) {
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if (isObject(v)) {
      return ["object", { object: asRaw ? toRaw(v) : v }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (isShallow(v)) {
      return `ShallowRef`;
    }
    if (v.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}

// node_modules/vue/dist/vue.runtime.esm-bundler.js
function initDev() {
  {
    initCustomFormatter();
  }
}
if (true) {
  initDev();
}

// src/todoist/module-state.ts
var todoistModuleState = reactive({ visible: false, active: false, pendingWrites: 0, session: 0, dataRevision: 0 });
async function withTodoistWrite(operation) {
  todoistModuleState.pendingWrites++;
  try {
    return await operation();
  } finally {
    todoistModuleState.pendingWrites--;
  }
}
function trackTodoistWrites(target, methods, apiMethod = false) {
  const names = new Set(methods);
  const wrappers = /* @__PURE__ */ new Map();
  return new Proxy(target, {
    get(object, key, receiver) {
      const value = Reflect.get(object, key, receiver);
      if (typeof key !== "string" || typeof value !== "function" || !names.has(key) && !(apiMethod && key === "api")) return value;
      if (!wrappers.has(key)) wrappers.set(key, (...args) => {
        const method = String(args[1]?.method || "GET").toUpperCase();
        if (key === "api" && (method === "GET" || method === "HEAD"))
          return Reflect.apply(value, receiver, args);
        return withTodoistWrite(() => Reflect.apply(value, receiver, args));
      });
      return wrappers.get(key);
    }
  });
}

// src/todoist/change-channel.ts
var KEY = "todoist_change_revision_v1";
async function scopeFor(token) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("todoist-invalidation-v1:" + token));
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
}
function createTodoistChangeChannel(getToken, invalidate) {
  let seen = "";
  async function receive(raw) {
    try {
      if (!raw || raw.length > 512) return;
      const marker = JSON.parse(raw);
      if (marker.version !== 1 || !/^[a-f0-9]{64}$/.test(marker.scope) || typeof marker.revision !== "string" || !/^[a-f0-9-]{36}$/.test(marker.revision)) return;
      const token = await getToken();
      if (!token || marker.scope !== await scopeFor(token) || token !== await getToken()) return;
      if (seen === marker.revision) return;
      seen = marker.revision;
      invalidate();
    } catch {
    }
  }
  function reconcile() {
    if (!document.hidden) {
      try {
        void receive(localStorage.getItem(KEY));
      } catch {
      }
    }
  }
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    window.addEventListener("storage", (event) => {
      if (event.key === KEY) void receive(event.newValue);
    });
    document.addEventListener("visibilitychange", reconcile);
    window.addEventListener("pageshow", reconcile);
  }
  return {
    async publish(token) {
      try {
        if (!token) return;
        const marker = { version: 1, scope: await scopeFor(token), revision: crypto.randomUUID() };
        localStorage.setItem(KEY, JSON.stringify(marker));
        if (token === await getToken()) seen = marker.revision;
      } catch {
        console.warn("[Todoist] Cross-page invalidation unavailable; refresh other pages manually.");
      }
    }
  };
}

// src/todoist/api-error.ts
var TodoistApiError = class extends Error {
  constructor(kind, status, retryAfterMs2, submitted = false) {
    super(todoistErrorText({ kind, status, retryAfterMs: retryAfterMs2 }));
    this.kind = kind;
    this.status = status;
    this.retryAfterMs = retryAfterMs2;
    this.submitted = submitted;
    this.name = kind === "cancelled" ? "AbortError" : "TodoistApiError";
  }
  kind;
  status;
  retryAfterMs;
  submitted;
};
function retryAfterMs(value, now = Date.now()) {
  if (!value) return 6e4;
  const numeric = Number(value);
  const delay = Number.isFinite(numeric) ? numeric * 1e3 : Date.parse(value) - now;
  return Number.isFinite(delay) ? Math.max(1e3, delay) : 6e4;
}
function todoistHttpError(response, submitted = false) {
  const status = response.status;
  return new TodoistApiError(
    status === 401 || status === 403 ? "auth" : status === 429 ? "rate-limit" : status === 404 || status === 410 ? "not-found" : "http",
    status,
    status === 429 ? retryAfterMs(response.headers.get("retry-after")) : void 0,
    submitted
  );
}
function todoistErrorText(error) {
  const item = error;
  switch (item?.kind) {
    case "configuration":
      return "Todoist \u914D\u7F6E\u4E0D\u53EF\u7528\uFF0C\u8BF7\u68C0\u67E5\u8D26\u53F7\u8BBE\u7F6E\u3002";
    case "auth":
      return "Todoist \u8D26\u53F7\u6216\u6743\u9650\u4E0D\u53EF\u7528\uFF0C\u8BF7\u68C0\u67E5\u8D26\u53F7\u8BBE\u7F6E\u3002";
    case "rate-limit":
      return `Todoist \u8BF7\u6C42\u53D7\u9650\uFF0C\u8BF7\u7EA6 ${Math.ceil((item.retryAfterMs || 6e4) / 1e3)} \u79D2\u540E\u624B\u52A8\u5237\u65B0\uFF1B\u672A\u81EA\u52A8\u91CD\u8BD5\u3002`;
    case "not-found":
      return "Todoist \u8D44\u6E90\u4E0D\u5B58\u5728\u6216\u63A5\u53E3\u4E0D\u53EF\u7528\uFF0C\u8BF7\u5728 Todoist \u4E2D\u6838\u5BF9\uFF1B\u672A\u5220\u9664\u672C\u673A\u5173\u8054\u3002";
    case "timeout":
      return "Todoist \u8BF7\u6C42\u8D85\u65F6\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u624B\u52A8\u6838\u5BF9\u3002";
    case "cancelled":
      return "Todoist \u8BFB\u53D6\u5DF2\u53D6\u6D88\u3002";
    case "invalid-response":
      return "Todoist \u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u5237\u65B0\u3002";
    case "network":
      return "Todoist \u7F51\u7EDC\u8FDE\u63A5\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5\u8BFB\u53D6\u3002";
    case "http":
      return `Todoist \u8BF7\u6C42\u5931\u8D25${item.status ? `\uFF08HTTP ${item.status}\uFF09` : ""}\uFF0C\u8BF7\u7A0D\u540E\u6838\u5BF9\u3002`;
    default:
      return "Todoist \u8BFB\u53D6\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u5237\u65B0\u6838\u5BF9\u3002";
  }
}

// src/services/storage-cache.service.ts
var STORAGE_PREFIX = "lw_cache_";
var StorageCacheService = class _StorageCacheService {
  static instance;
  memoryCache = /* @__PURE__ */ new Map();
  pendingFetches = /* @__PURE__ */ new Map();
  initialized = false;
  constructor() {
    this.preloadCommonKeys();
  }
  static getInstance() {
    if (!_StorageCacheService.instance) {
      _StorageCacheService.instance = new _StorageCacheService();
    }
    return _StorageCacheService.instance;
  }
  /**
   * 预读常用键至内存缓存，保证首屏渲染 0ms 同步读取
   */
  preloadCommonKeys() {
    if (typeof window === "undefined") return;
    try {
      if (typeof localStorage !== "undefined") {
        let loadedCount = 0;
        for (let i = 0; i < localStorage.length && loadedCount < 40; i++) {
          const rawKey = localStorage.key(i);
          if (rawKey && rawKey.startsWith(STORAGE_PREFIX)) {
            const cleanKey = rawKey.slice(STORAGE_PREFIX.length);
            try {
              const rawStr = localStorage.getItem(rawKey) || "";
              if (rawStr.length > 65536) continue;
              const parsed = JSON.parse(rawStr);
              if (parsed && typeof parsed.savedAt === "number") {
                if (!parsed.expireAt || parsed.expireAt > Date.now()) {
                  this.memoryCache.set(cleanKey, parsed);
                  loadedCount++;
                }
              }
            } catch (_) {
            }
          }
        }
      }
    } catch (_) {
    }
  }
  /**
   * 同步直接获取内存中的缓存（0ms 秒开）
   */
  getSync(key, defaultValue) {
    const entry = this.memoryCache.get(key);
    if (!entry) return defaultValue ?? null;
    if (entry.expireAt && entry.expireAt < Date.now()) {
      this.memoryCache.delete(key);
      return defaultValue ?? null;
    }
    return entry.data;
  }
  /**
   * 异步获取缓存（从 L1 Memory -> L2 Chrome Storage -> L3 LocalStorage 级联查找）
   */
  async get(key, defaultValue) {
    const mem = this.getSync(key);
    if (mem !== null) return mem;
    const fullKey = `${STORAGE_PREFIX}${key}`;
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const res = await chrome.storage.local.get([fullKey]);
        const entry = res?.[fullKey];
        if (entry && typeof entry.savedAt === "number") {
          if (!entry.expireAt || entry.expireAt > Date.now()) {
            this.memoryCache.set(key, entry);
            return entry.data;
          }
        }
      } catch (_) {
      }
    }
    if (typeof localStorage !== "undefined") {
      try {
        const raw = localStorage.getItem(fullKey);
        if (raw) {
          const entry = JSON.parse(raw);
          if (entry && typeof entry.savedAt === "number") {
            if (!entry.expireAt || entry.expireAt > Date.now()) {
              this.memoryCache.set(key, entry);
              return entry.data;
            }
          }
        }
      } catch (_) {
      }
    }
    return defaultValue ?? null;
  }
  /**
   * 写入缓存（写入内存并异步持久化至双轨存储）
   */
  async set(key, data, options) {
    const now = Date.now();
    const expireAt = options?.ttlMs ? now + options.ttlMs : void 0;
    const entry = {
      data,
      savedAt: now,
      expireAt
    };
    this.memoryCache.set(key, entry);
    if (options?.persist === false) return;
    const fullKey = `${STORAGE_PREFIX}${key}`;
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        await chrome.storage.local.set({ [fullKey]: entry });
      } catch (_) {
      }
    }
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem(fullKey, JSON.stringify(entry));
      } catch (err) {
        if (err?.name === "QuotaExceededError") {
          this.pruneOldEntries();
          try {
            localStorage.setItem(fullKey, JSON.stringify(entry));
          } catch (_) {
          }
        }
      }
    }
  }
  /**
   * 核心：Stale-While-Revalidate (SWR) 缓存模式
   * - 存在本地缓存时：立即返回旧数据实现瞬时响应；
   * - 后台并行请求 fetcher，获取成功后静默写入新缓存并通过 onBackgroundUpdate 通知界面。
   */
  async swr(key, fetcher, options) {
    const cached = await this.get(key);
    if (cached !== null) {
      void this.triggerBackgroundFetch(key, fetcher, options);
      return cached;
    }
    return this.triggerBackgroundFetch(key, fetcher, options);
  }
  async triggerBackgroundFetch(key, fetcher, options) {
    if (this.pendingFetches.has(key)) {
      return this.pendingFetches.get(key);
    }
    const task = (async () => {
      try {
        const fresh = await fetcher();
        if (fresh !== void 0 && fresh !== null) {
          await this.set(key, fresh, { ttlMs: options?.ttlMs });
          if (options?.onBackgroundUpdate) {
            try {
              options.onBackgroundUpdate(fresh);
            } catch (err) {
              console.warn(`[StorageCache] onBackgroundUpdate error for ${key}:`, err);
            }
          }
        }
        return fresh;
      } catch (err) {
        if (options?.onErrorFallback) {
          options.onErrorFallback(err);
        }
        throw err;
      } finally {
        this.pendingFetches.delete(key);
      }
    })();
    this.pendingFetches.set(key, task);
    return task;
  }
  /**
   * 删除指定缓存
   */
  async remove(key) {
    this.memoryCache.delete(key);
    const fullKey = `${STORAGE_PREFIX}${key}`;
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        await chrome.storage.local.remove([fullKey]);
      } catch (_) {
      }
    }
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.removeItem(fullKey);
      } catch (_) {
      }
    }
  }
  /**
   * 清理过期或老旧缓存条目以释放空间
   */
  pruneOldEntries() {
    if (typeof localStorage === "undefined") return;
    try {
      const candidates = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(STORAGE_PREFIX)) {
          try {
            const item = JSON.parse(localStorage.getItem(k) || "{}");
            candidates.push({ key: k, savedAt: item.savedAt || 0 });
          } catch (_) {
          }
        }
      }
      candidates.sort((a, b) => a.savedAt - b.savedAt);
      const toRemove = Math.ceil(candidates.length * 0.2);
      const removedKeys = [];
      for (let i = 0; i < toRemove; i++) {
        const k = candidates[i].key;
        localStorage.removeItem(k);
        removedKeys.push(k);
      }
      if (typeof chrome !== "undefined" && chrome.storage?.local && removedKeys.length > 0) {
        chrome.storage.local.remove(removedKeys).catch(() => {
        });
      }
    } catch (_) {
    }
  }
};
var storageCache = StorageCacheService.getInstance();

// src/todoist/task-date-helper.ts
var START_DATE_STORAGE_KEY = "todoist_task_start_dates";
function getStorageMap() {
  if (typeof window === "undefined" || !window.localStorage) return {};
  try {
    const raw = localStorage.getItem(START_DATE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function createTaskStartDateReader() {
  const snapshot = getStorageMap();
  return (taskId, description) => getTaskStartDate(taskId, description, snapshot);
}
function getTaskStartDate(taskId, description, map2 = getStorageMap()) {
  if (!taskId) return "";
  if (map2[taskId]) return map2[taskId];
  if (description) {
    const match = description.match(/(?:<!--start:|\[start::)(\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2})?)(?:-->|\])/);
    if (match && match[1]) {
      return match[1].replace("T", " ");
    }
  }
  return "";
}

// src/services/todoist.service.ts
var DEFAULT_SECTION_NAME_KEY = "todoistDefaultSectionName";
function getDefaultSectionName() {
  try {
    return localStorage.getItem(DEFAULT_SECTION_NAME_KEY) || "\u9ED8\u8BA4\u677F\u5757";
  } catch {
    return "\u9ED8\u8BA4\u677F\u5757";
  }
}
function setDefaultSectionName(name) {
  const clean = String(name || "").trim() || "\u9ED8\u8BA4\u677F\u5757";
  try {
    localStorage.setItem(DEFAULT_SECTION_NAME_KEY, clean);
  } catch {
  }
}
function isTodoistTaskCompleted(task) {
  return typeof task.checked === "boolean" ? task.checked : task.is_completed === true;
}
var TODOIST_TOKEN_KEY = "todoistToken";
var TODOIST_WORKSPACE_CACHE_KEY = "todoistWorkspaceCacheV3";
var TODOIST_TIMED_TASKS_KEY = "todoistTimedTasksV1";
var TODOIST_TIMER_DURATION_KEY = "todoistTimerDurationV1";
var TODOIST_ACTIVE_PROJECT_ID_KEY = "todoistActiveProjectIdV1";
var TODOIST_PROJECT_COLORS = {
  berry_red: "#b8256f",
  red: "#db4035",
  orange: "#ff9933",
  yellow: "#fad000",
  olive_green: "#afb83b",
  lime_green: "#7ecc49",
  green: "#299438",
  mint_green: "#6accbc",
  teal: "#158fad",
  sky_blue: "#14aaf5",
  light_blue: "#96c3eb",
  blue: "#4073ff",
  grape: "#884dff",
  violet: "#af38eb",
  lavender: "#eb96eb",
  magenta: "#e05194",
  salmon: "#ff8d85",
  charcoal: "#808080",
  grey: "#b8b8b8",
  taupe: "#ccac93"
};
function formatDueText(due) {
  if (!due?.date) return due?.string || "";
  const dateStr = String(due.date).slice(0, 10);
  const now = /* @__PURE__ */ new Date();
  const todayStr = now.toLocaleDateString("en-CA");
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toLocaleDateString("en-CA");
  if (dateStr === todayStr) return "\u4ECA\u5929";
  if (dateStr === tomorrowStr) return "\u660E\u5929";
  return dateStr;
}
function todoistResults(payload) {
  return Array.isArray(payload) ? payload : Array.isArray(payload?.results) ? payload.results : [];
}
var TodoistService = class _TodoistService {
  static instance;
  token = "";
  // 定时器番茄钟状态
  timerDuration = 30;
  timedTasks = [];
  timerLoaded = false;
  timerListeners = /* @__PURE__ */ new Set();
  // 任务变更监听器 (日历等协同)
  taskListeners = /* @__PURE__ */ new Set();
  // 项目与活动上下文缓存
  cachedProjects = [];
  activeProjectId = typeof localStorage !== "undefined" && localStorage.getItem("todoist_active_project_id") || "";
  inboxProjectId = typeof localStorage !== "undefined" && localStorage.getItem("todoist_inbox_project_id") || "";
  activeProjectName = "";
  changeChannel = createTodoistChangeChannel(() => this.initToken(), () => {
    this.invalidateWorkspaceSnapshots();
    todoistModuleState.dataRevision++;
  });
  constructor() {
    this.initToken();
    this.initTimers();
  }
  static getInstance() {
    if (!_TodoistService.instance) {
      _TodoistService.instance = new _TodoistService();
    }
    return _TodoistService.instance;
  }
  async initToken() {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.remove([
        "todoistWorkspaceCacheV1",
        "todoistWorkspaceCacheV2",
        "lw_cache_inbox",
        "lw_cache_today",
        "lw_cache_projects:default"
      ]).catch?.(() => {
      });
      const res = await chrome.storage.local.get([TODOIST_TOKEN_KEY, TODOIST_ACTIVE_PROJECT_ID_KEY]);
      this.token = res[TODOIST_TOKEN_KEY] || "";
      if (res[TODOIST_ACTIVE_PROJECT_ID_KEY]) {
        this.activeProjectId = String(res[TODOIST_ACTIVE_PROJECT_ID_KEY]);
      }
    }
    return this.token;
  }
  setActiveProjectId(projectId) {
    this.activeProjectId = String(projectId || "");
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("todoist_active_project_id", this.activeProjectId);
      } catch {
      }
    }
    if (typeof chrome !== "undefined" && chrome.storage?.local && this.activeProjectId) {
      const value = this.activeProjectId;
      void withTodoistWrite(async () => {
        await chrome.storage.local.set({ [TODOIST_ACTIVE_PROJECT_ID_KEY]: value });
      }).catch(() => console.warn("[Todoist] Project preference persistence failed."));
    }
  }
  getActiveProjectId() {
    return this.activeProjectId;
  }
  getActiveProjectName() {
    return this.activeProjectName;
  }
  setToken(token) {
    this.token = token.trim();
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      const value = this.token;
      void withTodoistWrite(async () => {
        await chrome.storage.local.set({ [TODOIST_TOKEN_KEY]: value });
      }).catch(() => console.warn("[Todoist] Account configuration persistence failed."));
    }
  }
  /** Module settings await persistence before switching the active credential. */
  async saveAccountToken(token) {
    const value = token.trim();
    if (!value) throw new Error("\u8BF7\u586B\u5199 Todoist Token");
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      const previous = await chrome.storage.local.get(TODOIST_TOKEN_KEY);
      await chrome.storage.local.set({ [TODOIST_TOKEN_KEY]: value });
      if (previous[TODOIST_TOKEN_KEY] !== value) {
        const keys = Object.keys(await chrome.storage.local.get(null)).filter((key) => key.startsWith("todoistSnapshot:"));
        await chrome.storage.local.remove([TODOIST_WORKSPACE_CACHE_KEY, ...keys]);
        this.invalidateWorkspaceSnapshots();
      }
    } else {
      localStorage.setItem(TODOIST_TOKEN_KEY, value);
      if (value !== this.token) this.workspaceMemoryCache.clear();
    }
    this.token = value;
  }
  getToken() {
    return this.token;
  }
  /**
   * API v1 请求器（仅只读 404 可回退 rest/v2，写操作不重发）
   */
  rateLimit;
  async api(endpoint, options = {}) {
    const controller = new AbortController();
    const abort = () => controller.abort(options.signal?.reason);
    if (options.signal?.aborted) abort();
    else options.signal?.addEventListener("abort", abort, { once: true });
    let timedOut = false, submitted = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 15e3);
    try {
      controller.signal.throwIfAborted();
      if (!this.token) {
        try {
          await this.initToken();
        } catch {
          throw new TodoistApiError("configuration");
        }
        controller.signal.throwIfAborted();
        if (!this.token) throw new TodoistApiError("configuration");
      }
      const requestToken = this.token;
      if (this.rateLimit?.token === requestToken && this.rateLimit.until > Date.now())
        throw new TodoistApiError("rate-limit", 429, this.rateLimit.until - Date.now());
      const headers = new Headers(options.headers || {});
      headers.set("Authorization", `Bearer ${requestToken}`);
      if (options.body && typeof options.body === "string" && !headers.has("Content-Type"))
        headers.set("Content-Type", "application/json");
      const base = "https://api.todoist.com/api/v1";
      const url = endpoint.startsWith("http") ? endpoint : `${base}${endpoint}`;
      const target = new URL(url);
      if (target.origin !== "https://api.todoist.com" || target.username || target.password)
        throw new TodoistApiError("configuration");
      const method = String(options.method || "GET").toUpperCase();
      const writing = !["GET", "HEAD"].includes(method);
      const init = { ...options, headers, signal: controller.signal, credentials: "omit", redirect: "error" };
      submitted = true;
      let resp = await fetch(url, init);
      if (resp.status === 404 && !endpoint.startsWith("http") && !writing) {
        await resp.body?.cancel();
        resp = await fetch(`https://api.todoist.com/rest/v2${endpoint}`, init);
      }
      if (!resp.ok) {
        const error = todoistHttpError(resp, submitted);
        if (error.kind === "rate-limit")
          this.rateLimit = { token: requestToken, until: Date.now() + (error.retryAfterMs || 6e4) };
        await resp.body?.cancel();
        throw error;
      }
      if (writing) {
        if (requestToken === this.token) {
          this.invalidateWorkspaceSnapshots();
          todoistModuleState.dataRevision++;
        }
        void this.changeChannel.publish(requestToken);
      }
      if (resp.status === 204) return null;
      try {
        return await resp.json();
      } catch (error) {
        if (controller.signal.aborted) throw error;
        throw new TodoistApiError("invalid-response", resp.status, void 0, submitted);
      }
    } catch (error) {
      if (error instanceof TodoistApiError) throw error;
      if (controller.signal.aborted) throw new TodoistApiError(
        options.signal?.aborted ? "cancelled" : timedOut ? "timeout" : "cancelled",
        void 0,
        void 0,
        submitted
      );
      throw new TodoistApiError("network", void 0, void 0, submitted);
    } finally {
      clearTimeout(timeout);
      options.signal?.removeEventListener("abort", abort);
    }
  }
  // ==========================================================================
  // 工作区加载与数据驱动 (取代 3600 行老 JS 的 loadTodoistWorkspace)
  // SWR 内存+持久化离线双层极速缓存架构，0ms 瞬开开箱即用
  // ==========================================================================
  workspaceMemoryCache = /* @__PURE__ */ new Map();
  workspaceMutationVersion = 0;
  workspaceCacheInvalidated = false;
  invalidateWorkspaceSnapshots() {
    ++this.workspaceMutationVersion;
    this.workspaceCacheInvalidated = true;
    this.workspaceMemoryCache.clear();
  }
  updateLocalCacheOnTaskCreated(task, view, projectId, targetSectionId) {
    const key = this.getWorkspaceCacheKey(view, projectId);
    const mem = this.workspaceMemoryCache.get(key);
    if (mem && mem.data && Array.isArray(mem.data.columns) && mem.data.columns.length > 0) {
      let col = mem.data.columns.find((c) => {
        if (targetSectionId !== void 0) return c.sectionId === targetSectionId;
        if (task.section_id) return c.sectionId === task.section_id;
        return false;
      });
      if (!col) {
        col = mem.data.columns.find((c) => !c.sectionId) || mem.data.columns[0];
      }
      if (col) {
        const mapped = this.mapTasks([task], (/* @__PURE__ */ new Date()).toISOString().slice(0, 10))[0];
        if (mapped && !col.tasks.some((t) => t.id === String(task.id))) {
          col.tasks.push(mapped);
        }
      }
    }
  }
  getFastSnapshot(view = "inbox", targetProjectId) {
    const key = this.getWorkspaceCacheKey(view, targetProjectId);
    const mem = this.workspaceMemoryCache.get(key);
    if (mem?.data?.columns && Array.isArray(mem.data.columns) && mem.data.columns.length > 0) {
      return mem.data;
    }
    if (typeof localStorage !== "undefined") {
      try {
        const raw = localStorage.getItem(`todoist_fast_snapshot:${key}`);
        if (raw) {
          const entry = JSON.parse(raw);
          if (entry?.data?.columns && Array.isArray(entry.data.columns) && entry.data.columns.length > 0) {
            this.workspaceMemoryCache.set(key, entry);
            return entry.data;
          }
        }
      } catch {
      }
    }
    return null;
  }
  getWorkspaceCacheKey(view, projectId) {
    if (view === "projects") {
      return `v3:projects:${projectId || this.activeProjectId || "default"}`;
    }
    return `v3:${view}`;
  }
  async getCachedWorkspaceData(view = "inbox", targetProjectId) {
    const key = this.getWorkspaceCacheKey(view, targetProjectId);
    const mem = this.workspaceMemoryCache.get(key);
    if (mem && mem.data) {
      return mem.data;
    }
    if (this.workspaceCacheInvalidated) return null;
    const version = this.workspaceMutationVersion;
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const storageKey = `todoistSnapshot:${key}`;
        const stored = await chrome.storage.local.get(storageKey);
        if (this.workspaceCacheInvalidated || version !== this.workspaceMutationVersion) return null;
        const entry = stored[storageKey];
        if (entry?.data?.columns && Array.isArray(entry.data.columns) && Date.now() - entry.timestamp < 30 * 864e5) {
          this.workspaceMemoryCache.set(key, entry);
          if (typeof localStorage !== "undefined") {
            try {
              localStorage.setItem(`todoist_fast_snapshot:${key}`, JSON.stringify(entry));
            } catch {
            }
          }
          return entry.data;
        }
      } catch {
      }
    }
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const stored = await chrome.storage.local.get([TODOIST_WORKSPACE_CACHE_KEY]);
        if (this.workspaceCacheInvalidated || version !== this.workspaceMutationVersion) return null;
        const cache = stored[TODOIST_WORKSPACE_CACHE_KEY] || {};
        const entry = cache[key] || (view !== "projects" ? cache[view] : null);
        if (entry?.columns && Array.isArray(entry.columns)) {
          const result = {
            columns: entry.columns,
            projects: (cache.projectsMeta?.projects || []).map((p) => ({
              id: String(p.id),
              name: p.name,
              color: p.color,
              colorHex: TODOIST_PROJECT_COLORS[p.color || ""] || "#0ea5e9"
            })),
            activeProjectId: cache.projectsMeta?.activeProjectId || targetProjectId || this.activeProjectId || "",
            activeProjectName: cache.projectsMeta?.activeProjectName || this.activeProjectName || "",
            availableLabels: Array.from(
              new Set(entry.columns.flatMap((c) => c.tasks.flatMap((t) => t.labels || [])))
            ).filter(Boolean)
          };
          this.workspaceMemoryCache.set(key, { data: result, timestamp: entry.savedAt || Date.now() });
          return result;
        }
      } catch {
      }
    }
    return null;
  }
  async loadWorkspaceData(view = "inbox", targetProjectId, _force = false, signal) {
    await this.initToken();
    signal?.throwIfAborted();
    if (!this.token) {
      const cached = await this.getCachedWorkspaceData(view, targetProjectId);
      signal?.throwIfAborted();
      return cached || { columns: [], projects: [], activeProjectId: "", activeProjectName: "", availableLabels: [] };
    }
    return this.fetchWorkspaceDataOnline(view, targetProjectId, signal);
  }
  async fetchWorkspaceDataOnline(view = "inbox", targetProjectId, signal) {
    const version = this.workspaceMutationVersion;
    const ensureCurrent = () => {
      signal?.throwIfAborted();
      if (version !== this.workspaceMutationVersion) throw new Error("\u4EFB\u52A1\u4F4D\u7F6E\u5DF2\u53D8\u5316\uFF0C\u65E7\u770B\u677F\u8BFB\u53D6\u5931\u6548");
    };
    ensureCurrent();
    const cacheKey = this.getWorkspaceCacheKey(view, targetProjectId);
    try {
      const effectiveProjId = targetProjectId || this.activeProjectId;
      const nowStr = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA");
      const projectsPromise = this.getProjects(signal);
      let sectionsPromise;
      let tasksPromise;
      if (view === "projects" && effectiveProjId) {
        sectionsPromise = this.getSections(effectiveProjId, signal);
        tasksPromise = this.getTasksByProject(effectiveProjId, signal);
      } else if (view === "today") {
        sectionsPromise = Promise.resolve([]);
        tasksPromise = this.getTasks("today | overdue", signal);
      } else {
        const inboxId = this.inboxProjectId;
        if (inboxId) {
          sectionsPromise = this.getSections(inboxId, signal);
          tasksPromise = this.getTasksByProject(inboxId, signal);
        } else {
          sectionsPromise = Promise.resolve([]);
          tasksPromise = Promise.resolve([]);
        }
      }
      const [rawProjects, initialSections, initialTasks] = await Promise.all([
        projectsPromise,
        sectionsPromise,
        tasksPromise
      ]);
      ensureCurrent();
      const userProjects = rawProjects.filter(
        (p) => !p.inbox_project && !p.is_inbox_project && !/^(Inbox|收件箱)$/i.test(p.name) && !p.is_archived && !p.is_deleted
      );
      this.cachedProjects = userProjects;
      const projectOptions = userProjects.map((p) => ({
        id: String(p.id),
        name: p.name,
        color: p.color,
        colorHex: TODOIST_PROJECT_COLORS[p.color || ""] || "#0ea5e9"
      }));
      if (targetProjectId) {
        this.setActiveProjectId(String(targetProjectId));
        const found = userProjects.find((p) => String(p.id) === String(targetProjectId));
        this.activeProjectName = found?.name || "";
      } else if (this.activeProjectId && userProjects.some((p) => String(p.id) === String(this.activeProjectId))) {
        const found = userProjects.find((p) => String(p.id) === String(this.activeProjectId));
        this.activeProjectName = found?.name || this.activeProjectName || "";
      } else if (userProjects.length > 0) {
        this.setActiveProjectId(String(userProjects[0].id));
        this.activeProjectName = userProjects[0].name;
      } else {
        this.setActiveProjectId("");
        this.activeProjectName = "";
      }
      let columns = [];
      if (view === "projects" && this.activeProjectId) {
        let sections = initialSections;
        let tasks = initialTasks;
        if (effectiveProjId !== this.activeProjectId || initialSections.length === 0 && initialTasks.length === 0) {
          const [sec, tsk] = await Promise.all([
            this.getSections(this.activeProjectId, signal),
            this.getTasksByProject(this.activeProjectId, signal)
          ]);
          sections = sec;
          tasks = tsk;
        }
        const defaultCol = {
          projectId: this.activeProjectId,
          sectionId: "",
          title: this.getDefaultSectionName(),
          tasks: this.mapTasks(tasks.filter((t) => !t.section_id), nowStr)
        };
        columns.push(defaultCol);
        for (const sec of sections) {
          columns.push({
            projectId: this.activeProjectId,
            sectionId: String(sec.id),
            title: sec.name,
            tasks: this.mapTasks(tasks.filter((t) => String(t.section_id) === String(sec.id)), nowStr)
          });
        }
      } else if (view === "today") {
        const tasks = initialTasks;
        const overdueTasks = tasks.filter((t) => {
          const d = t.due?.date ? String(t.due.date).slice(0, 10) : "";
          return d && d < nowStr;
        });
        const todayTasks = tasks.filter((t) => {
          const d = t.due?.date ? String(t.due.date).slice(0, 10) : "";
          return d === nowStr || !d && t.due?.string;
        });
        columns = [
          { sectionId: "overdue", title: "\u5DF2\u903E\u671F", tasks: this.mapTasks(overdueTasks, nowStr, "day_order") },
          { sectionId: "today", title: "\u4ECA\u5929", tasks: this.mapTasks(todayTasks, nowStr, "day_order") }
        ];
      } else {
        const inbox = rawProjects.find((p) => p.inbox_project || p.is_inbox_project) || rawProjects.find((p) => /^(Inbox|收件箱)$/i.test(p.name));
        if (inbox) {
          const actualInboxId = String(inbox.id);
          this.inboxProjectId = actualInboxId;
          if (typeof localStorage !== "undefined") {
            try {
              localStorage.setItem("todoist_inbox_project_id", actualInboxId);
            } catch {
            }
          }
          let sections = initialSections;
          let tasks = initialTasks;
          if (!this.inboxProjectId || initialSections.length === 0 && initialTasks.length === 0) {
            const [sec, tsk] = await Promise.all([
              this.getSections(actualInboxId, signal),
              this.getTasksByProject(actualInboxId, signal)
            ]);
            sections = sec;
            tasks = tsk;
          }
          const defaultCol = {
            projectId: actualInboxId,
            sectionId: "",
            title: this.getDefaultSectionName(),
            tasks: this.mapTasks(tasks.filter((t) => !t.section_id), nowStr)
          };
          columns.push(defaultCol);
          for (const sec of sections) {
            columns.push({
              projectId: actualInboxId,
              sectionId: String(sec.id),
              title: sec.name,
              tasks: this.mapTasks(tasks.filter((t) => String(t.section_id) === String(sec.id)), nowStr)
            });
          }
        } else {
          const tasks = await this.getTasks(void 0, signal);
          const inboxTasks = tasks.filter((t) => !t.section_id);
          columns = [
            { sectionId: "", title: "\u6536\u4EF6\u7BB1", tasks: this.mapTasks(inboxTasks, nowStr) }
          ];
        }
      }
      ensureCurrent();
      const availableLabels = Array.from(
        new Set(columns.flatMap((c) => c.tasks.flatMap((t) => t.labels || [])))
      ).filter(Boolean);
      const result = {
        columns,
        projects: projectOptions,
        activeProjectId: this.activeProjectId,
        activeProjectName: this.activeProjectName,
        availableLabels
      };
      const specificCacheKey = this.getWorkspaceCacheKey(view, this.activeProjectId);
      const entry = { data: result, timestamp: Date.now() };
      this.workspaceMemoryCache.set(specificCacheKey, entry);
      if (cacheKey !== specificCacheKey) this.workspaceMemoryCache.set(cacheKey, entry);
      this.workspaceCacheInvalidated = false;
      if (typeof localStorage !== "undefined") {
        try {
          const entryJson = JSON.stringify(entry);
          localStorage.setItem(`todoist_fast_snapshot:${specificCacheKey}`, entryJson);
          if (cacheKey !== specificCacheKey) {
            localStorage.setItem(`todoist_fast_snapshot:${cacheKey}`, entryJson);
          }
        } catch {
        }
      }
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        try {
          await chrome.storage.local.set({
            [`todoistSnapshot:${specificCacheKey}`]: entry,
            [`todoistSnapshot:${cacheKey}`]: entry
          });
        } catch (error) {
          console.warn("[Todoist] Snapshot persistence failed", error);
        }
        ensureCurrent();
      }
      return result;
    } catch (netErr) {
      ensureCurrent();
      console.warn("[TodoistService] Online fetch failed, fallback to local cache:", netErr);
      if (this.workspaceCacheInvalidated) throw netErr;
      const cached = await this.getCachedWorkspaceData(view, targetProjectId);
      if (cached) return { ...cached, readWarning: todoistErrorText(netErr) };
      throw netErr;
    }
  }
  mapTasks(rawTasks, nowStr, orderField = "child_order") {
    const readStartDate = createTaskStartDateReader();
    return [...rawTasks].sort((a, b) => {
      const left = Number(a[orderField]), right = Number(b[orderField]);
      return Number.isFinite(left) && Number.isFinite(right) ? left - right : 0;
    }).map((task) => {
      const dueDateStr = task.due?.date ? String(task.due.date).slice(0, 10) : "";
      const isDueToday = dueDateStr === nowStr;
      const isOverdue = !!(dueDateStr && dueDateStr < nowStr);
      const isRecurring = !!task.due?.recurring;
      const timed = this.timedTasks.find((item) => String(item.taskId) === String(task.id));
      return {
        id: String(task.id),
        content: task.content || "\u672A\u547D\u540D\u4EFB\u52A1",
        description: task.description || "",
        completed: isTodoistTaskCompleted(task),
        dueDate: task.due?.date || "",
        startDate: readStartDate(String(task.id), task.description || ""),
        dueText: formatDueText(task.due),
        dueString: task.due?.string || formatDueText(task.due),
        isOverdue,
        isDueToday,
        isRecurring,
        priority: task.priority ? Number(task.priority) : 1,
        labels: Array.isArray(task.labels) ? task.labels : [],
        timedDeadlineText: timed ? this.formatTimerDeadline(timed) : "",
        timedDurationMinutes: timed?.durationMinutes,
        url: task.url || `https://app.todoist.com/app/task/${task.id}`,
        _taskRaw: task
      };
    });
  }
  // ==========================================================================
  // 日历模块协同与事件广播 (`window.LogicWeaverTodoistTasks`)
  // ==========================================================================
  async listCalendarTasks(signal) {
    signal?.throwIfAborted();
    await this.initToken();
    signal?.throwIfAborted();
    if (!this.token) throw new Error("Todoist \u5C1A\u672A\u914D\u7F6E\uFF0C\u672A\u8BFB\u53D6\u65E5\u5386\u4EFB\u52A1");
    const tasks = /* @__PURE__ */ new Map();
    const cursors = /* @__PURE__ */ new Set();
    let cursor = "";
    for (let page = 0; page < 100; page++) {
      signal?.throwIfAborted();
      const query = new URLSearchParams({ limit: "200" });
      if (cursor) query.set("cursor", cursor);
      const response = await this.api(`/tasks?${query}`, { signal });
      const results = todoistResults(response);
      for (const task of results) if (task?.id && !isTodoistTaskCompleted(task)) tasks.set(String(task.id), task);
      const next = String(response?.next_cursor || "");
      if (!next) return [...tasks.values()];
      if (cursors.has(next)) throw new Error("\u65E5\u5386\u4EFB\u52A1\u5206\u9875\u6E38\u6807\u91CD\u590D");
      cursors.add(next);
      cursor = next;
    }
    throw new Error("\u65E5\u5386\u4EFB\u52A1\u5206\u9875\u8D85\u51FA\u4E0A\u9650\uFF0C\u672A\u5E94\u7528\u4E0D\u5B8C\u6574\u5217\u8868");
  }
  async setTaskDueDate(taskId, date) {
    const dueDate = String(date || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) throw new Error("\u622A\u6B62\u65E5\u671F\u683C\u5F0F\u65E0\u6548");
    const updated = await this.updateTask(taskId, { due_string: dueDate });
    this.broadcastTaskChange({ type: "due", task: updated, date: dueDate });
    return updated;
  }
  subscribeTasks(listener) {
    this.taskListeners.add(listener);
    return () => this.taskListeners.delete(listener);
  }
  broadcastTaskChange(change) {
    this.taskListeners.forEach((l) => {
      try {
        l(change);
      } catch {
      }
    });
  }
  // ==========================================================================
  // 番茄钟与限时任务管理 (`window.LogicWeaverTodoistTimer`)
  // ==========================================================================
  async initTimers() {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const stored = await chrome.storage.local.get([TODOIST_TIMED_TASKS_KEY, TODOIST_TIMER_DURATION_KEY]);
        if (Array.isArray(stored[TODOIST_TIMED_TASKS_KEY])) {
          this.timedTasks = stored[TODOIST_TIMED_TASKS_KEY];
        }
        if (stored[TODOIST_TIMER_DURATION_KEY]) {
          this.timerDuration = Number(stored[TODOIST_TIMER_DURATION_KEY]) || 30;
        }
        this.timerLoaded = true;
        this.emitTimerState();
      } catch {
      }
    }
  }
  getTimerSnapshot() {
    return {
      items: [...this.timedTasks].sort((a, b) => a.deadlineAt - b.deadlineAt),
      duration: this.timerDuration,
      loaded: this.timerLoaded
    };
  }
  async setTimerDuration(minutes) {
    this.timerDuration = Math.max(5, Math.min(480, Math.round(minutes / 5) * 5));
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      await chrome.storage.local.set({ [TODOIST_TIMER_DURATION_KEY]: this.timerDuration });
    }
    this.emitTimerState();
    return this.timerDuration;
  }
  async createTimer(title, duration = this.timerDuration) {
    const content = title.trim();
    if (!content) throw new Error("\u8BF7\u8F93\u5165\u4EFB\u52A1\u540D\u79F0");
    const rawTask = await this.createTask({ content });
    const now = Date.now();
    const item = {
      id: `timer-${rawTask.id}`,
      taskId: String(rawTask.id),
      title: content,
      durationMinutes: duration,
      createdAt: now,
      deadlineAt: now + duration * 6e4,
      alertedAt: 0,
      url: rawTask.url
    };
    this.timedTasks.push(item);
    await this.persistTimers();
    return item;
  }
  async completeTimer(timerId) {
    const item = this.timedTasks.find((t) => t.id === timerId);
    if (!item) return;
    await this.toggleTaskCompletion(item.taskId, true);
    this.timedTasks = this.timedTasks.filter((t) => t.id !== timerId);
    await this.persistTimers();
    this.broadcastTaskChange({ type: "removed", task: { id: item.taskId } });
  }
  async snoozeTimer(timerId, minutes = 5) {
    const item = this.timedTasks.find((t) => t.id === timerId);
    if (!item) throw new Error("\u9650\u65F6\u4EFB\u52A1\u4E0D\u5B58\u5728");
    item.deadlineAt = Date.now() + Math.max(1, minutes) * 6e4;
    item.alertedAt = 0;
    await this.persistTimers();
    return item;
  }
  async claimExpiredTimer(timerId) {
    const item = this.timedTasks.find((t) => t.id === timerId);
    if (!item || item.deadlineAt > Date.now() || item.alertedAt > 0) return null;
    item.alertedAt = Date.now();
    await this.persistTimers();
    return { ...item };
  }
  subscribeTimer(listener) {
    this.timerListeners.add(listener);
    listener(this.getTimerSnapshot());
    return () => this.timerListeners.delete(listener);
  }
  async persistTimers() {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      await chrome.storage.local.set({ [TODOIST_TIMED_TASKS_KEY]: this.timedTasks });
    }
    this.emitTimerState();
  }
  emitTimerState() {
    const snap = this.getTimerSnapshot();
    this.timerListeners.forEach((l) => {
      try {
        l(snap);
      } catch {
      }
    });
  }
  formatTimerDeadline(item) {
    const date = new Date(item.deadlineAt);
    if (!Number.isFinite(date.getTime())) return "";
    const now = /* @__PURE__ */ new Date();
    const clock = date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
    if (date.toDateString() === now.toDateString()) return `\u622A\u6B62 ${clock}`;
    return `\u622A\u6B62 ${date.toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })} ${clock}`;
  }
  // ==========================================================================
  // 标准 REST API 原生 CRUD
  // ==========================================================================
  getDefaultSectionName() {
    return getDefaultSectionName();
  }
  setDefaultSectionName(name) {
    setDefaultSectionName(name);
  }
  async getProjects(signal) {
    const res = await this.api("/projects?limit=200", { signal });
    return todoistResults(res);
  }
  async getSections(projectId, signal) {
    const res = await this.api(`/sections?project_id=${encodeURIComponent(projectId)}&limit=200`, { signal });
    return todoistResults(res);
  }
  async getTasks(filter, signal) {
    if (filter) {
      try {
        const res2 = await this.api(`/tasks/filter?query=${encodeURIComponent(filter)}`, { signal });
        return todoistResults(res2);
      } catch (error) {
        signal?.throwIfAborted();
        if (!(error instanceof TodoistApiError) || error.kind !== "not-found") throw error;
        try {
          const res2 = await this.api(`/tasks?filter=${encodeURIComponent(filter)}`, { signal });
          return todoistResults(res2);
        } catch (error2) {
          signal?.throwIfAborted();
          if (!(error2 instanceof TodoistApiError) || error2.kind !== "not-found") throw error2;
          const fallback = await this.api("/tasks?limit=200", { signal });
          return todoistResults(fallback);
        }
      }
    }
    const res = await this.api("/tasks?limit=200", { signal });
    return todoistResults(res);
  }
  async getTasksByProject(projectId, signal) {
    const res = await this.api(`/tasks?project_id=${encodeURIComponent(projectId)}&limit=200`, { signal });
    return todoistResults(res);
  }
  async toggleTaskCompletion(taskId, completed) {
    const endpoint = completed ? `/tasks/${encodeURIComponent(taskId)}/close` : `/tasks/${encodeURIComponent(taskId)}/reopen`;
    await this.api(endpoint, { method: "POST" });
  }
  async reopenTask(taskId) {
    await this.api(`/tasks/${encodeURIComponent(taskId)}/reopen`, { method: "POST" });
    this.broadcastTaskChange({ type: "updated", task: { id: taskId, checked: false, is_completed: false } });
  }
  async updateTask(taskId, updates) {
    return this.api(`/tasks/${encodeURIComponent(taskId)}`, {
      method: "POST",
      body: JSON.stringify(updates)
    });
  }
  async createTask(payload, requestId) {
    return this.api("/tasks", {
      method: "POST",
      headers: requestId ? { "X-Request-Id": requestId } : void 0,
      body: JSON.stringify(payload)
    });
  }
  /**
   * 上传二进制文件/图片至 Todoist 官方云端存储 (Sync API v9 uploads)
   */
  async uploadFile(file, fileName = "image.png") {
    if (!this.token) {
      await this.initToken();
      if (!this.token) throw new Error("\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u914D\u7F6E Todoist Token");
    }
    const extMatch = fileName.match(/\.[a-zA-Z0-9]+$/);
    const ext = extMatch ? extMatch[0] : ".png";
    const safeName = `upload_${Date.now()}_${Math.random().toString(36).slice(2, 6)}${ext}`;
    const formData = new FormData();
    formData.append("file", file, safeName);
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${this.token}`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15e3);
    try {
      let resp = await fetch("https://api.todoist.com/api/v1/uploads", {
        method: "POST",
        headers,
        body: formData,
        signal: controller.signal
      });
      if (resp.status === 404) {
        resp = await fetch("https://api.todoist.com/sync/v9/uploads/add", {
          method: "POST",
          headers,
          body: formData,
          signal: controller.signal
        });
      }
      if (resp.ok) {
        return await resp.json();
      }
      const dataUrl = await this.fileToOptimizedDataUrl(file);
      return {
        file_name: fileName,
        file_size: file.size,
        file_type: file.type || "image/png",
        file_url: dataUrl,
        upload_state: "completed"
      };
    } catch {
      const dataUrl = await this.fileToOptimizedDataUrl(file);
      return {
        file_name: fileName,
        file_size: file.size,
        file_type: file.type || "image/png",
        file_url: dataUrl,
        upload_state: "completed"
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }
  async fileToOptimizedDataUrl(file) {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || typeof document === "undefined" || !(file instanceof Blob)) {
        resolve("");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const rawData = String(reader.result || "");
        if (file.size <= 64 * 1024) {
          resolve(rawData);
          return;
        }
        const img = new Image();
        img.onload = () => {
          try {
            const MAX_DIM = 800;
            let w = img.width, h = img.height;
            if (w > MAX_DIM || h > MAX_DIM) {
              if (w > h) {
                h = Math.round(h * MAX_DIM / w);
                w = MAX_DIM;
              } else {
                w = Math.round(w * MAX_DIM / h);
                h = MAX_DIM;
              }
            }
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0, w, h);
              const compressed = canvas.toDataURL("image/webp", 0.72);
              resolve(compressed.length < rawData.length ? compressed : rawData);
              return;
            }
          } catch {
          }
          resolve(rawData);
        };
        img.onerror = () => resolve(rawData);
        img.src = rawData;
      };
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  }
  /**
   * 为任务添加评论与附件
   */
  async addComment(payload) {
    return this.api("/comments", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }
  /**
   * 创建任务并附带上传好的图片附件（同时在 description 注入 Markdown 预览并在评论区关联附件）
   */
  async createTaskWithAttachments(payload) {
    let description = payload.description || "";
    const attachments = payload.attachments || [];
    if (attachments.length > 0) {
      for (const att of attachments) {
        description += `

![${att.file_name}](${att.file_url})`;
      }
    }
    const createdTask = await this.createTask({
      content: payload.content,
      description: description.trim() || void 0,
      project_id: payload.project_id,
      section_id: payload.section_id,
      due_string: payload.due_string,
      due_date: payload.due_date,
      due_datetime: payload.due_datetime,
      priority: payload.priority,
      labels: payload.labels
    });
    if (createdTask && createdTask.id && attachments.length > 0) {
      for (const att of attachments) {
        try {
          await this.addComment({
            task_id: String(createdTask.id),
            content: `\u{1F4CE} \u9644\u4EF6\u56FE\u7247: ${att.file_name}`,
            attachment: {
              resource_type: "file",
              file_url: att.file_url,
              file_name: att.file_name,
              file_type: att.file_type
            }
          });
        } catch (err) {
          console.warn("[Todoist] Add comment attachment failed:", err);
        }
      }
    }
    return createdTask;
  }
  async deleteTask(taskId) {
    await this.api(`/tasks/${encodeURIComponent(taskId)}`, { method: "DELETE" });
  }
  async moveTask(taskId, target) {
    if (!taskId || taskId.startsWith("optimistic-") || !target.projectId) throw new Error("\u4EFB\u52A1\u6216\u76EE\u6807\u9879\u76EE\u5C1A\u672A\u5C31\u7EEA");
    const destination = target.sectionId ? { section_id: target.sectionId } : { project_id: target.projectId };
    try {
      const task = await this.api(`/tasks/${encodeURIComponent(taskId)}/move`, {
        method: "POST",
        body: JSON.stringify(destination)
      });
      if (!task || String(task.id) !== taskId || String(task.project_id) !== target.projectId || String(task.section_id || "") !== target.sectionId) throw new Error("\u4EFB\u52A1\u79FB\u52A8\u56DE\u590D\u672A\u786E\u8BA4\u76EE\u6807\uFF0C\u8BF7\u5237\u65B0\u6838\u5BF9");
      return task;
    } finally {
      this.invalidateWorkspaceSnapshots();
    }
  }
  async moveTaskToProject(taskId, projectId) {
    return this.moveTask(taskId, { projectId, sectionId: "" });
  }
  async reorderTask(taskId, order, today = false) {
    if (!taskId || taskId.startsWith("optimistic-") || !Number.isInteger(order) || order < 1) {
      throw new Error("\u4EFB\u52A1\u6392\u5E8F\u53C2\u6570\u65E0\u6548");
    }
    try {
      const task = await this.updateTask(taskId, today ? { day_order: order } : { child_order: order });
      if (!task || String(task.id) !== taskId || Number(task[today ? "day_order" : "child_order"]) !== order) {
        throw new Error("\u4EFB\u52A1\u6392\u5E8F\u56DE\u590D\u672A\u786E\u8BA4\uFF0C\u8BF7\u5237\u65B0\u6838\u5BF9");
      }
      return task;
    } finally {
      this.invalidateWorkspaceSnapshots();
    }
  }
  async createSection(name, projectId) {
    return this.api("/sections", {
      method: "POST",
      body: JSON.stringify({ name: name.trim(), project_id: projectId })
    });
  }
  async renameSection(sectionId, newName) {
    return this.api(`/sections/${encodeURIComponent(sectionId)}`, {
      method: "POST",
      body: JSON.stringify({ name: newName.trim() })
    });
  }
  async deleteSection(sectionId) {
    const cleanId = String(sectionId || "").trim();
    if (!cleanId) return;
    this.invalidateWorkspaceSnapshots();
    await this.api(`/sections/${encodeURIComponent(cleanId)}`, { method: "DELETE" });
    try {
      await storageCache.remove(this.getWorkspaceCacheKey("inbox"));
      await storageCache.remove(this.getWorkspaceCacheKey("today"));
      await storageCache.remove(this.getWorkspaceCacheKey("projects", this.activeProjectId));
      await storageCache.remove("v3:projects:default");
    } catch (_) {
    }
  }
  async createProject(name) {
    return this.api("/projects", {
      method: "POST",
      body: JSON.stringify({ name: name.trim() })
    });
  }
  async renameProject(projectId, newName) {
    return this.api(`/projects/${encodeURIComponent(projectId)}`, {
      method: "POST",
      body: JSON.stringify({ name: newName.trim() })
    });
  }
  async deleteProject(projectId) {
    await this.api(`/projects/${encodeURIComponent(projectId)}`, { method: "DELETE" });
  }
  /**
   * 获取指定任务的全部评论与文件附件列表
   */
  async getComments(taskId, signal) {
    const res = await this.api(`/comments?task_id=${encodeURIComponent(taskId)}`, { signal });
    return todoistResults(res);
  }
  /**
   * 查询历史已完成任务列表 (Sync API v9 /completed/get_all)
   */
  async getCompletedTasks(params = {}, signal) {
    signal?.throwIfAborted();
    await this.initToken();
    signal?.throwIfAborted();
    if (!this.token) throw new Error("\u8BF7\u5148\u914D\u7F6E Todoist \u8D26\u6237");
    const until = params.until || (/* @__PURE__ */ new Date()).toISOString();
    const since = params.since || new Date(Date.parse(until) - 30 * 864e5).toISOString();
    if (!Number.isFinite(Date.parse(since)) || !Number.isFinite(Date.parse(until)) || Date.parse(since) >= Date.parse(until))
      throw new Error("\u5B8C\u6210\u5386\u53F2\u65E5\u671F\u8303\u56F4\u65E0\u6548");
    const items = [];
    const cursors = /* @__PURE__ */ new Set();
    let cursor = "";
    for (let page = 0; page < 100; page++) {
      const query = new URLSearchParams({
        since,
        until,
        limit: String(Math.max(1, Math.min(200, params.limit || 200)))
      });
      if (params.project_id) query.set("project_id", params.project_id);
      if (cursor) query.set("cursor", cursor);
      const response = await this.api(`https://api.todoist.com/api/v1/tasks/completed/by_completion_date?${query}`, { signal });
      signal?.throwIfAborted();
      if (!Array.isArray(response?.items)) throw new Error("\u5B8C\u6210\u5386\u53F2\u8FD4\u56DE\u683C\u5F0F\u65E0\u6548");
      for (const task of response.items) {
        if (!task || typeof task.id !== "string" || typeof task.content !== "string" || typeof task.completed_at !== "string" || !Number.isFinite(Date.parse(task.completed_at)))
          throw new Error("\u5B8C\u6210\u5386\u53F2\u4EFB\u52A1\u683C\u5F0F\u65E0\u6548");
        items.push({ ...task, task_id: task.id, completed_at: task.completed_at });
      }
      const next = response.next_cursor;
      if (next == null || next === "") return { items };
      if (typeof next !== "string" || cursors.has(next)) throw new Error("\u5B8C\u6210\u5386\u53F2\u5206\u9875\u65E0\u6548");
      cursors.add(next);
      cursor = next;
    }
    throw new Error("\u5B8C\u6210\u5386\u53F2\u5206\u9875\u8D85\u51FA\u4E0A\u9650\uFF0C\u672A\u5E94\u7528\u4E0D\u5B8C\u6574\u5217\u8868");
  }
  /**
   * 获取 Todoist 云端个人标签库 (REST API v2 /labels)
   */
  async getLabels(signal) {
    const res = await this.api("/labels", { signal });
    return todoistResults(res);
  }
  /**
   * 在云端创建新标签
   */
  async createLabel(name, color) {
    return this.api("/labels", {
      method: "POST",
      body: JSON.stringify({ name: name.trim(), color })
    });
  }
  /**
   * 在云端删除标签
   */
  async deleteLabel(labelId) {
    await this.api(`/labels/${encodeURIComponent(labelId)}`, { method: "DELETE" });
  }
};
var todoistService = trackTodoistWrites(TodoistService.getInstance(), [
  "saveAccountToken",
  "setTaskDueDate",
  "setTimerDuration",
  "createTimer",
  "completeTimer",
  "snoozeTimer",
  "claimExpiredTimer",
  "uploadFile",
  "createTaskWithAttachments"
], true);

// src/background/todoist-sync.ts
var ALARM_NAME = "todoist-background-sync";
async function syncTodoistInBackground() {
  try {
    const token = await todoistService.initToken();
    if (!token) return;
    let targetView = "inbox";
    let targetProjectId = todoistService.getActiveProjectId();
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      const stored = await chrome.storage.local.get(["todoist_last_active_view", "todoistActiveProjectIdV1"]);
      if (stored.todoist_last_active_view === "projects" || stored.todoist_last_active_view === "today") {
        targetView = stored.todoist_last_active_view;
      }
      if (stored.todoistActiveProjectIdV1) {
        targetProjectId = String(stored.todoistActiveProjectIdV1);
      }
    }
    await todoistService.fetchWorkspaceDataOnline(targetView, targetProjectId);
  } catch (err) {
    console.debug("[TodoistBgSync] Background sync skipped:", err);
  }
}
function initTodoistBackgroundSync() {
  if (typeof chrome === "undefined" || !chrome.alarms) return;
  chrome.alarms.get(ALARM_NAME, (alarm) => {
    if (!alarm) {
      chrome.alarms.create(ALARM_NAME, { periodInMinutes: 15, delayInMinutes: 2 });
    }
  });
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_NAME) {
      void syncTodoistInBackground();
    }
  });
}

// src/background/web-side-drawer.ts
var EMBED_KEY = "webSideDrawer:";
function toggleWebDrawer(frameUrl, token) {
  const scope = globalThis;
  const key = "__tabProjectWebDrawer";
  if (scope[key]) {
    scope[key].close();
    return { open: false };
  }
  const host = document.createElement("div");
  host.setAttribute("popover", "manual");
  host.setAttribute("aria-label", "tab-project \u4FA7\u680F");
  const styles = {
    all: "initial",
    position: "fixed",
    inset: "0 0 0 auto",
    margin: "0",
    padding: "0",
    width: "min(380px, 90vw)",
    height: "100dvh",
    border: "0",
    display: "block",
    overflow: "hidden",
    background: "transparent",
    "z-index": "2147483647",
    "box-shadow": "-8px 0 28px color-mix(in srgb, CanvasText 15%, transparent)"
  };
  for (const [name, value] of Object.entries(styles)) host.style.setProperty(name, value, "important");
  const shadow = host.attachShadow({ mode: "closed" });
  const frame = document.createElement("iframe");
  frame.title = "\u7F51\u9875\u5DE5\u5177\u4E0E\u6536\u96C6\u7BB1";
  frame.src = frameUrl;
  frame.style.cssText = "display:block;width:100%;height:100%;border:0;background:transparent;color-scheme:normal";
  shadow.append(frame);
  function close() {
    window.removeEventListener("message", onMessage);
    window.removeEventListener("keydown", onKeyDown);
    host.remove();
    delete scope[key];
  }
  function onMessage(event) {
    if (event.source !== frame.contentWindow || event.origin !== frameUrl.split("/").slice(0, 3).join("/") || event.data?.token !== token) return;
    if (event.data.type === "TAB_PROJECT_CLOSE_DRAWER") close();
  }
  function onKeyDown(event) {
    if (event.key === "Escape" && !event.defaultPrevented) close();
  }
  scope[key] = { close };
  window.addEventListener("message", onMessage);
  window.addEventListener("keydown", onKeyDown);
  document.documentElement.append(host);
  try {
    host.showPopover();
  } catch (error) {
    close();
    throw error;
  }
  return { open: true };
}
async function toggleWebSideDrawer(tabId) {
  const token = crypto.randomUUID();
  const key = EMBED_KEY + tabId;
  await chrome.storage.session.set({ [key]: { token, issuedAt: Date.now() } });
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId, frameIds: [0] },
      world: "ISOLATED",
      func: toggleWebDrawer,
      args: [chrome.runtime.getURL("sidepanel.html") + "#embed=" + token, token]
    });
    if (!results?.[0]?.result?.open) await chrome.storage.session.remove(key);
  } catch (error) {
    await chrome.storage.session.remove(key);
    throw error;
  }
}
function initWebSideDrawer() {
  chrome.runtime.onMessage.addListener((message, sender, respond) => {
    if (message?.type !== "AUTHORIZE_SIDE_DRAWER_EMBED") return;
    if (sender.id !== chrome.runtime.id || !Number.isInteger(sender.tab?.id) || sender.frameId <= 0 || sender.url?.split("#")[0] !== chrome.runtime.getURL("sidepanel.html")) {
      respond({ ok: false });
      return;
    }
    const key = EMBED_KEY + sender.tab.id;
    void chrome.storage.session.get(key).then(async (stored) => {
      const grant = stored[key];
      if (!grant || grant.token !== message.token || Date.now() - grant.issuedAt > 3e4 || !/^https?:\/\//i.test(sender.tab.url || "")) {
        respond({ ok: false });
        return;
      }
      await chrome.storage.session.remove(key);
      respond({ ok: true, parentOrigin: new URL(sender.tab.url).origin });
    }).catch(() => respond({ ok: false }));
    return true;
  });
  chrome.tabs.onRemoved.addListener((tabId) => {
    void chrome.storage.session.remove(EMBED_KEY + tabId);
  });
}

// src/background/index.ts
initBilibiliNetRules();
initNotificationListeners();
initTodoistBackgroundSync();
for (const name of ["gmail-inbox-poll", "x-account-poll"]) {
  chrome.alarms.clear(name).catch(() => console.warn("[Migration] Could not clear retired feed alarm"));
}
initTabWatcher();
initContextMenu();
initWebSideDrawer();
function toggleSidePanelForTab(tab) {
  const failed = () => {
    void flashBadge("ERR", "#ef4444");
    console.warn("[SidePanel] Could not toggle the requested panel.");
  };
  const url = tab.pendingUrl || tab.url || "";
  const isHome = ["newtab.html", "newtab-bootstrap.html"].some(
    (path) => url.split(/[?#]/, 1)[0] === chrome.runtime.getURL(path)
  ) || url === "edge://newtab/" || url === "chrome://newtab/";
  if (isHome) {
    if (!Number.isInteger(tab.id)) {
      failed();
      return;
    }
    chrome.runtime.sendMessage({ type: "TOGGLE_SIDE_DRAWER", targetTabId: tab.id }).then((reply) => {
      if (!reply?.ok) failed();
    }).catch(failed);
    return;
  }
  if (/^https?:\/\//i.test(url) && Number.isInteger(tab.id)) {
    void toggleWebSideDrawer(tab.id).catch(() => {
      failed();
      void chrome.notifications.create({
        type: "basic",
        iconUrl: "assets/icon-128.png",
        title: "\u65E0\u6CD5\u6253\u5F00\u4FA7\u680F",
        message: "\u6D4F\u89C8\u5668\u7981\u6B62\u5728\u6B64\u9875\u9762\u6CE8\u5165\u4FA7\u680F\uFF0C\u6216\u5C1A\u672A\u6388\u4E88\u7F51\u7AD9\u8BBF\u95EE\u6743\u9650\u3002\u8BF7\u5728\u666E\u901A\u7F51\u9875\u4E0A\u91CD\u8BD5\u3002"
      }).catch(() => {
      });
    });
  } else {
    failed();
    void chrome.notifications.create({
      type: "basic",
      iconUrl: "assets/icon-128.png",
      title: "\u6B64\u9875\u9762\u4E0D\u652F\u6301\u8986\u76D6\u5F0F\u4FA7\u680F",
      message: "\u6D4F\u89C8\u5668\u5185\u7F6E\u9875\u3001\u5176\u4ED6\u6269\u5C55\u9875\u9762\u548C\u53D7\u4FDD\u62A4\u9875\u9762\u65E0\u6CD5\u6CE8\u5165\u3002\u8BF7\u5207\u6362\u5230\u666E\u901A\u7F51\u9875\u6216\u65B0\u6807\u7B7E\u9875\u3002"
    }).catch(() => {
    });
  }
}
function handleSidePanelRequest(tab) {
  if (tab && (tab.url || tab.pendingUrl)) {
    toggleSidePanelForTab(tab);
    return;
  }
  chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([activeTab]) => {
    if (activeTab) toggleSidePanelForTab(activeTab);
  }).catch(() => console.warn("[SidePanel] Could not find the active tab."));
}
if (typeof chrome !== "undefined" && chrome.commands?.onCommand) {
  chrome.commands.onCommand.addListener((command, tab) => {
    if (command === "focus-newtab") void openOrFocusNewTab();
    if (command === "open-side-panel" || command === "_execute_side_panel") {
      handleSidePanelRequest(tab);
    }
  });
}
chrome.action?.onClicked?.addListener(handleSidePanelRequest);
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
  initBilibiliNetRules();
  syncYouTubeNetRules();
  setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 200);
  setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 1e3);
  setTimeout(() => void syncTodoistInBackground(), 3e3);
});
chrome.runtime.onStartup?.addListener?.(() => {
  initBilibiliNetRules();
  syncYouTubeNetRules();
  setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 200);
  setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 1e3);
  setTimeout(() => void syncTodoistInBackground(), 3e3);
});
/*! Bundled license information:

@vue/shared/dist/shared.esm-bundler.js:
  (**
  * @vue/shared v3.5.42
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/reactivity/dist/reactivity.esm-bundler.js:
  (**
  * @vue/reactivity v3.5.42
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/runtime-core/dist/runtime-core.esm-bundler.js:
  (**
  * @vue/runtime-core v3.5.42
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

vue/dist/vue.runtime.esm-bundler.js:
  (**
  * vue v3.5.42
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
