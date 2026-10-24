declare const chrome: any;

// Historical type name reused by the current sidepanel/sticker tools; no Popup page is required.
export interface PopupTab { id?: number; url?: string; title?: string; favIconUrl?: string }

export function isWebTab(tab: PopupTab | null): boolean {
  return !!tab?.id && /^https?:\/\//i.test(tab.url || "");
}

export function tabHost(tab: PopupTab | null): string {
  try {
    const raw = tab?.url || "";
    if (!raw) return "";
    const u = new URL(raw);
    if (u.protocol.includes("extension")) return "tab-project";
    return u.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export async function getActiveWebTab(): Promise<PopupTab | null> {
  for (const query of [{ active: true, lastFocusedWindow: true }, { active: true, currentWindow: true }]) {
    try {
      const tabs = await chrome.tabs.query(query);
      if (tabs?.[0]?.url) return tabs[0];
    } catch { /* Fall through to the next tab lookup. */ }
  }
  return null;
}

type SaveResult = { ok: boolean; existed?: boolean; error?: string };
function normalizeUrl(value: string): string {
  try { return new URL(value).href; } catch { return value; }
}

export async function loadLauncherPages(): Promise<string[]> {
  try {
    const stored = await chrome.storage.local.get(["launcherPages", "pages"]);
    const list = stored.launcherPages || stored.pages;
    if (Array.isArray(list) && list.length) {
      return list.filter((p: any) => typeof p === "string" && p.trim().length > 0);
    }
  } catch {}
  return ["常用网站", "游戏区", "办公区", "实验组", "就业区", "工具箱", "办公桌"];
}

async function directSaveBookmark(tab: PopupTab, targetPage: string = "常用网站"): Promise<SaveResult> {
  const url = normalizeUrl(tab.url || "");
  if (!/^https?:\/\//i.test(url)) return { ok: false, error: "仅支持 http/https 网址" };
  const stored = await chrome.storage.local.get(["quickLinks", "quickLinkGroupSizes", "quickLinksReady"]);
  const links = Array.isArray(stored.quickLinks) ? [...stored.quickLinks] : [];
  const existing = links.find((link: any) => normalizeUrl(link?.url || "") === url);
  const pageName = targetPage || "常用网站";
  if (existing) {
    existing.group = "常用网站";
    existing.page = pageName;
    if (!existing.title && tab.title) existing.title = tab.title;
    if (!existing.customIcon && tab.favIconUrl) existing.customIcon = tab.favIconUrl;
  } else {
    links.push({ id: crypto.randomUUID(), title: tab.title || tabHost(tab) || url, url,
      group: "常用网站", page: pageName, customIcon: tab.favIconUrl || "" });
  }
  await chrome.storage.local.set({ quickLinks: links, quickLinkGroupSizes: stored.quickLinkGroupSizes || {}, quickLinksReady: true });
  return { ok: true, existed: !!existing };
}

export async function saveQuickLink(tab: PopupTab, targetPage: string = "常用网站"): Promise<SaveResult> {
  try {
    const result = await chrome.runtime.sendMessage({ type: "bookmarkCurrentPage", tab, targetPage });
    if (result?.ok) return result;
  } catch { /* Service worker may be unavailable; fallback to direct save. */ }
  return directSaveBookmark(tab, targetPage);
}
