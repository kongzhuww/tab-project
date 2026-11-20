/**
 * LogicWeaver 新标签页 - 标签页智能生命周期与快捷收藏 (TypeScript 模块)
 */

import { flashBadge } from "./notifications";

declare const chrome: any;

const GROUP_COMMON = "常用网站";

export function isLogicWeaverHomeUrl(value?: string): boolean {
  if (typeof value !== "string") return false;
  if (["chrome://newtab/", "chrome://new-tab-page/", "edge://newtab/"].includes(value)) return true;
  const prefixes = [
    chrome.runtime.getURL("newtab.html"),
    chrome.runtime.getURL("newtab-bootstrap.html"),
    chrome.runtime.getURL("newtab-search.html")
  ];
  return prefixes.some((prefix) => value.startsWith(prefix));
}

export function chooseExistingHomeTab(tabs: any[], excludedId = -1): any {
  return (
    (tabs || [])
      .filter(
        (tab) =>
          tab.id != null &&
          tab.id !== excludedId &&
          (isLogicWeaverHomeUrl(tab.url) || isLogicWeaverHomeUrl(tab.pendingUrl))
      )
      .sort((left, right) => {
        if (!!left.active !== !!right.active) return right.active ? 1 : -1;
        return (right.lastAccessed || 0) - (left.lastAccessed || 0) || (left.id || 0) - (right.id || 0);
      })[0] || null
  );
}

export async function focusHomeTab(tab: any): Promise<boolean> {
  if (!tab?.id) return false;
  if (tab.windowId != null) await chrome.windows.update(tab.windowId, { focused: true });
  await chrome.tabs.update(tab.id, { active: true });
  return true;
}

function tabHasPage(tab: any, page: string): boolean {
  const expected = chrome.runtime.getURL(page);
  return [tab.url, tab.pendingUrl].some(url => typeof url === 'string' && url.split(/[?#]/, 1)[0] === expected);
}

async function focusMainPage(tab: any): Promise<void> {
  if (tabHasPage(tab, 'newtab-search.html') && !tabHasPage(tab, 'newtab.html')) {
    await chrome.tabs.update(tab.id, { url: chrome.runtime.getURL('newtab.html') });
  }
  await focusHomeTab(tab);
}

export async function openOrFocusNewTab(): Promise<void> {
  const tabs = await chrome.tabs.query({});
  const existing = chooseExistingHomeTab(tabs.filter((tab: any) => tabHasPage(tab, 'newtab.html'))) || chooseExistingHomeTab(tabs);
  if (existing) {
    await focusMainPage(existing);
    return;
  }
  await chrome.tabs.create({ url: chrome.runtime.getURL("newtab.html"), active: true });
}

// Serialize simultaneous bootstrap requests so exactly one can reserve the first home page.
let routingQueue: Promise<void> = Promise.resolve();
let pendingHomeTabId: number | null = null;

export function routeNewTab(sendResponse: (res: any) => void, senderTabId?: number): void {
  const run = async () => {
    try {
      const stored = await chrome.storage.local.get(['enableQuickSearch', 'singleNewTab']);
      if ((stored.enableQuickSearch ?? stored.singleNewTab) !== true || senderTabId == null) {
        sendResponse({ action: 'open-home' });
        return;
      }
      const tabs = await chrome.tabs.query({});
      const hasHome = tabs.some((tab: any) => tab.id !== senderTabId && tabHasPage(tab, 'newtab.html'));
      const reserved = tabs.some((tab: any) => tab.id === pendingHomeTabId && tab.id !== senderTabId &&
        (tabHasPage(tab, 'newtab-bootstrap.html') || tabHasPage(tab, 'newtab.html')));
      if (hasHome || reserved) {
        sendResponse({ action: 'open-search' });
      } else {
        pendingHomeTabId = senderTabId;
        sendResponse({ action: 'open-home' });
      }
    } catch {
      sendResponse({ action: 'open-home' });
    }
  };
  routingQueue = routingQueue.then(run, run);
}

function normalizeUrl(value: string): string {
  try {
    return new URL(value).href;
  } catch {
    return value;
  }
}

function hostOf(value: string): string {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
}

export async function bookmarkCurrentTab(
  tab: any,
  targetPage: string = "常用网站"
): Promise<{ ok: boolean; existed?: boolean; error?: string }> {
  try {
    const url = normalizeUrl(tab?.url || "");
    if (!/^https?:\/\//i.test(url)) {
      await flashBadge("✕", "#f87171");
      return { ok: false, error: "当前页面不是普通网页（仅支持 http/https 网址）" };
    }

    const stored = await chrome.storage.local.get(["quickLinks", "quickLinkGroupSizes", "quickLinksReady"]);
    const links = Array.isArray(stored.quickLinks) ? stored.quickLinks : [];

    const existing = links.find((link: any) => {
      try {
        return normalizeUrl(link.url) === url;
      } catch {
        return false;
      }
    });

    const pageName = targetPage || "常用网站";

    if (existing) {
      existing.group = "常用网站";
      existing.page = pageName;
      if (!existing.title && tab?.title) existing.title = tab.title;
      if (!existing.customIcon && tab?.favIconUrl) existing.customIcon = tab.favIconUrl;
    } else {
      links.push({
        id: crypto.randomUUID(),
        title: tab?.title || hostOf(url),
        url,
        group: "常用网站",
        page: pageName,
        customIcon: tab?.favIconUrl || ""
      });
    }

    await chrome.storage.local.set({
      quickLinks: links,
      quickLinkGroupSizes: stored.quickLinkGroupSizes || {},
      quickLinksReady: true
    });

    await flashBadge("✓", "#34d399");
    return { ok: true, existed: !!existing };
  } catch (error: any) {
    await flashBadge("!", "#f87171");
    return { ok: false, error: error?.message || "收藏失败" };
  }
}

/**
 * 检查目标标签页是否为浏览器系统自带的默认空白页（如 edge://newtab, chrome://newtab, about:blank）
 * 架构说明：此处的“Native”历史上指代浏览器厂商自带的原厂新标签页，现已规范命名为 BrowserDefault。
 * 本逻辑不依赖也不代表 Native Host / Native Messaging 功能仍存在。
 */
export function isBrowserDefaultNewTab(tab: any): boolean {
  if (!tab) return false;
  const u = tab.url || tab.pendingUrl || "";
  const title = (tab.title || "").trim();
  const myId = chrome.runtime.id;

  if (u.includes(myId) || u.includes("newtab.html") || u.includes("bilibili.html")) return false;
  if (/^https?:\/\//i.test(u)) return false;

  if (
    u === "edge://newtab/" ||
    u === "edge://newtab" ||
    u === "chrome://newtab/" ||
    u === "chrome://newtab" ||
    u === "chrome://new-tab-page/" ||
    u === "chrome://new-tab-page" ||
    u.startsWith("chrome-search://") ||
    u === "about:blank" ||
    u === ""
  ) {
    if (
      title === "新建标签页" ||
      title === "新标签页" ||
      title === "New Tab" ||
      title === "New tab" ||
      title === "" ||
      u.includes("newtab")
    ) {
      return true;
    }
  }
  return false;
}

/** 历史兼容别名（不代表 Native Host 功能仍存在） */
export const isNativeNewTab = isBrowserDefaultNewTab;

/**
 * 清理或重定向浏览器系统自带的默认空白标签页（edge://newtab / chrome://newtab）
 */
export async function cleanupOrReplaceBrowserDefaultNewTabs(): Promise<void> {
  if (typeof chrome === "undefined" || !chrome.tabs?.query) return;
  try {
    const tabs = await chrome.tabs.query({});
    const ownTabs = tabs.filter((tab: any) => {
      const url = String(tab.url || tab.pendingUrl || '').split(/[?#]/, 1)[0];
      return ['newtab.html', 'newtab-search.html', 'newtab-bootstrap.html'].some(path => url === chrome.runtime.getURL(path));
    });

    const ownIds = new Set(ownTabs.map((tab: any) => tab.id));
    const strayTabs = tabs.filter((tab: any) => {
      if (ownIds.has(tab.id)) return false;
      const url = String(tab.pendingUrl || tab.url || '');
      return /^(?:chrome|edge):\/\/(?:newtab|new-tab-page)\/?(?:[?#].*)?$/.test(url);
    });
    if (!strayTabs.length) return;

    // Route these through the same bootstrap as ordinary new tabs, including first-home selection.
    const targetUrl = chrome.runtime.getURL('newtab-bootstrap.html');
    for (const tab of strayTabs) if (tab.id != null) await chrome.tabs.update(tab.id, { url: targetUrl });
  } catch {}
}

/** 历史兼容别名（不代表 Native Host 功能仍存在） */
export const cleanupOrReplaceNativeNewTabs = cleanupOrReplaceBrowserDefaultNewTabs;

export function initTabWatcher(): void {
  if (typeof chrome === "undefined" || !chrome.tabs?.onCreated) return;
  chrome.tabs.onCreated.addListener(() => {
    setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 300);
  });
  chrome.tabs.onUpdated.addListener((_tabId: number, changeInfo: any) => {
    if (changeInfo.status === "complete" || changeInfo.title) {
      setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 300);
    }
  });
}
