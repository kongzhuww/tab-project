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

export async function openOrFocusNewTab(): Promise<void> {
  const existing = chooseExistingHomeTab(await chrome.tabs.query({}));
  if (existing) {
    await focusHomeTab(existing);
    return;
  }
  await chrome.tabs.create({ url: chrome.runtime.getURL("newtab.html"), active: true });
}

export function dedupeLogicWeaverNewTab(sender: any, sendResponse: (res: any) => void): void {
  const senderTab = sender?.tab;
  if (senderTab?.id == null || senderTab.windowId == null) {
    sendResponse({ action: "open-home" });
    return;
  }
  chrome.storage.local.get(["singleNewTab"], (stored: any) => {
    const enabled = stored.singleNewTab === true;
    if (!enabled) {
      sendResponse({ action: "open-home" });
      return;
    }
    chrome.tabs.query({ windowId: senderTab.windowId }, (tabs: any[]) => {
      if (chrome.runtime.lastError) {
        sendResponse({ action: "open-home" });
        return;
      }
      const homeTabs = (tabs || []).filter((tab) => {
        if (!tab || tab.id === senderTab.id) return false;
        const u = tab.url || tab.pendingUrl || "";
        if (u.includes("newtab-bootstrap.html") || u.includes("newtab-search.html")) return false;
        return (
          u.includes("newtab.html") ||
          u.startsWith("chrome://newtab") ||
          u.startsWith("edge://newtab") ||
          u.startsWith("chrome://new-tab-page")
        );
      });

      if (homeTabs.length === 0) {
        sendResponse({ action: "open-home" });
      } else {
        sendResponse({ action: "open-search", existingTabId: homeTabs[0].id });
      }
    });
  });
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

export function isNativeNewTab(tab: any): boolean {
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

export async function cleanupOrReplaceNativeNewTabs(): Promise<void> {
  if (typeof chrome === "undefined" || !chrome.tabs?.query) return;
  try {
    const tabs = await chrome.tabs.query({});
    const myId = chrome.runtime.id;
    const ownTabs = tabs.filter((t: any) => {
      const u = t.url || t.pendingUrl || "";
      return u.includes(myId) && u.includes("newtab.html");
    });

    const strayTabs = tabs.filter(isNativeNewTab);
    if (!strayTabs.length) return;

    // 检查用户是否开启了“仅保留一个主界面（后续标签打开大号搜索）”
    let singleNewTab = false;
    try {
      const stored = await chrome.storage?.local?.get(["singleNewTab"]);
      singleNewTab = stored?.singleNewTab === true;
    } catch {}

    const homeUrl = chrome.runtime.getURL("newtab.html");
    const searchUrl = chrome.runtime.getURL("newtab-search.html");

    if (ownTabs.length > 0) {
      // 已经存在主界面
      const targetUrl = singleNewTab ? searchUrl : homeUrl;
      for (const st of strayTabs) {
        if (st.id != null) {
          try {
            await chrome.tabs.update(st.id, { url: targetUrl });
          } catch {}
        }
      }
    } else {
      // 尚无主界面
      const [first, ...rest] = strayTabs;
      if (first?.id != null) {
        try {
          await chrome.tabs.update(first.id, { url: homeUrl });
        } catch {}
      }
      for (const r of rest) {
        if (r.id != null) {
          try {
            await chrome.tabs.update(r.id, { url: singleNewTab ? searchUrl : homeUrl });
          } catch {}
        }
      }
    }
  } catch {}
}

export function initTabWatcher(): void {
  if (typeof chrome === "undefined" || !chrome.tabs?.onCreated) return;
  chrome.tabs.onCreated.addListener(() => {
    setTimeout(cleanupOrReplaceNativeNewTabs, 300);
  });
  chrome.tabs.onUpdated.addListener((_tabId: number, changeInfo: any) => {
    if (changeInfo.status === "complete" || changeInfo.title) {
      setTimeout(cleanupOrReplaceNativeNewTabs, 300);
    }
  });
}
