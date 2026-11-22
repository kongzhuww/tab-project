import { s as u } from "./runtime-protocol-C_r09aKr.js";
function p(e) {
  return !!e?.id && /^https?:\/\//i.test(e.url || "");
}
function l(e) {
  try {
    const t = e?.url || "";
    if (!t) return "";
    const r = new URL(t);
    return r.protocol.includes("extension") ? "tab-project" : r.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}
async function f() {
  for (const e of [{ active: !0, lastFocusedWindow: !0 }, { active: !0, currentWindow: !0 }])
    try {
      const t = await chrome.tabs.query(e);
      if (t?.[0]?.url) return t[0];
    } catch {
    }
  return null;
}
function c(e) {
  try {
    return new URL(e).href;
  } catch {
    return e;
  }
}
async function h() {
  try {
    const e = await chrome.storage.local.get(["launcherPages", "pages", "launcherPageLabels", "quickLinks"]), t = Array.isArray(e.launcherPages) && e.launcherPages.length ? e.launcherPages : Array.isArray(e.pages) && e.pages.length ? e.pages : [], r = e.launcherPageLabels && typeof e.launcherPageLabels == "object" ? { ...e.launcherPageLabels } : {}, a = Array.isArray(e.quickLinks) ? e.quickLinks.map((s) => typeof s?.page == "string" ? s.page.trim() : "").filter(Boolean) : [], i = /* @__PURE__ */ new Set(["常用网站", ...t, ...a]), n = Array.from(i).map((s) => String(s).trim()).filter(Boolean);
    return { pages: n.length ? n : ["常用网站"], labels: r };
  } catch {
  }
  return { pages: ["常用网站"], labels: {} };
}
async function g(e, t = "常用网站") {
  const r = c(e.url || "");
  if (!/^https?:\/\//i.test(r)) return { ok: !1, error: "仅支持 http/https 网址" };
  const a = await chrome.storage.local.get(["quickLinks", "quickLinkGroupSizes", "quickLinksReady"]), i = Array.isArray(a.quickLinks) ? [...a.quickLinks] : [], n = i.find((o) => c(o?.url || "") === r), s = t || "常用网站";
  return n ? (n.group = "常用网站", n.page = s, !n.title && e.title && (n.title = e.title), !n.customIcon && e.favIconUrl && (n.customIcon = e.favIconUrl)) : i.push({
    id: crypto.randomUUID(),
    title: e.title || l(e) || r,
    url: r,
    group: "常用网站",
    page: s,
    customIcon: e.favIconUrl || ""
  }), await chrome.storage.local.set({ quickLinks: i, quickLinkGroupSizes: a.quickLinkGroupSizes || {}, quickLinksReady: !0 }), { ok: !0, existed: !!n };
}
async function y(e, t = "常用网站") {
  try {
    const r = await u({ type: "bookmarkCurrentPage", tab: e, targetPage: t });
    if (r?.ok) return { ok: !0, existed: r.existed, error: r.error };
  } catch {
  }
  return g(e, t);
}
export {
  f as g,
  p as i,
  h as l,
  y as s,
  l as t
};
