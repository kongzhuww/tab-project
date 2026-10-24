function k(t) {
  return !!t?.id && /^https?:\/\//i.test(t.url || "");
}
function a(t) {
  try {
    const r = t?.url || "";
    if (!r) return "";
    const e = new URL(r);
    return e.protocol.includes("extension") ? "tab-project" : e.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}
async function f() {
  for (const t of [{ active: !0, lastFocusedWindow: !0 }, { active: !0, currentWindow: !0 }])
    try {
      const r = await chrome.tabs.query(t);
      if (r?.[0]?.url) return r[0];
    } catch {
    }
  return null;
}
function o(t) {
  try {
    return new URL(t).href;
  } catch {
    return t;
  }
}
async function h() {
  try {
    const t = await chrome.storage.local.get(["launcherPages", "pages"]), r = t.launcherPages || t.pages;
    if (Array.isArray(r) && r.length)
      return r.filter((e) => typeof e == "string" && e.trim().length > 0);
  } catch {
  }
  return ["常用网站", "游戏区", "办公区", "实验组", "就业区", "工具箱", "办公桌"];
}
async function l(t, r = "常用网站") {
  const e = o(t.url || "");
  if (!/^https?:\/\//i.test(e)) return { ok: !1, error: "仅支持 http/https 网址" };
  const i = await chrome.storage.local.get(["quickLinks", "quickLinkGroupSizes", "quickLinksReady"]), c = Array.isArray(i.quickLinks) ? [...i.quickLinks] : [], n = c.find((u) => o(u?.url || "") === e), s = r || "常用网站";
  return n ? (n.group = "常用网站", n.page = s, !n.title && t.title && (n.title = t.title), !n.customIcon && t.favIconUrl && (n.customIcon = t.favIconUrl)) : c.push({
    id: crypto.randomUUID(),
    title: t.title || a(t) || e,
    url: e,
    group: "常用网站",
    page: s,
    customIcon: t.favIconUrl || ""
  }), await chrome.storage.local.set({ quickLinks: c, quickLinkGroupSizes: i.quickLinkGroupSizes || {}, quickLinksReady: !0 }), { ok: !0, existed: !!n };
}
async function g(t, r = "常用网站") {
  try {
    const e = await chrome.runtime.sendMessage({ type: "bookmarkCurrentPage", tab: t, targetPage: r });
    if (e?.ok) return e;
  } catch {
  }
  return l(t, r);
}
export {
  f as g,
  k as i,
  h as l,
  g as s,
  a as t
};
