function g(e) {
  return !!e?.id && /^https?:\/\//i.test(e.url || "");
}
function u(e) {
  try {
    const r = e?.url || "";
    if (!r) return "";
    const t = new URL(r);
    return t.protocol.includes("extension") ? "tab-project" : t.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}
async function k() {
  for (const e of [{ active: !0, lastFocusedWindow: !0 }, { active: !0, currentWindow: !0 }])
    try {
      const r = await chrome.tabs.query(e);
      if (r?.[0]?.url) return r[0];
    } catch {
    }
  return null;
}
function i(e) {
  try {
    return new URL(e).href;
  } catch {
    return e;
  }
}
async function p() {
  try {
    const e = await chrome.storage.local.get(["launcherPages", "pages", "launcherPageLabels", "quickLinks"]), r = Array.isArray(e.launcherPages) && e.launcherPages.length ? e.launcherPages : Array.isArray(e.pages) && e.pages.length ? e.pages : [], t = e.launcherPageLabels && typeof e.launcherPageLabels == "object" ? { ...e.launcherPageLabels } : {}, a = Array.isArray(e.quickLinks) ? e.quickLinks.map((s) => typeof s?.page == "string" ? s.page.trim() : "").filter(Boolean) : [], c = /* @__PURE__ */ new Set(["常用网站", ...r, ...a]), n = Array.from(c).map((s) => String(s).trim()).filter(Boolean);
    return { pages: n.length ? n : ["常用网站"], labels: t };
  } catch {
  }
  return { pages: ["常用网站"], labels: {} };
}
async function l(e, r = "常用网站") {
  const t = i(e.url || "");
  if (!/^https?:\/\//i.test(t)) return { ok: !1, error: "仅支持 http/https 网址" };
  const a = await chrome.storage.local.get(["quickLinks", "quickLinkGroupSizes", "quickLinksReady"]), c = Array.isArray(a.quickLinks) ? [...a.quickLinks] : [], n = c.find((o) => i(o?.url || "") === t), s = r || "常用网站";
  return n ? (n.group = "常用网站", n.page = s, !n.title && e.title && (n.title = e.title), !n.customIcon && e.favIconUrl && (n.customIcon = e.favIconUrl)) : c.push({
    id: crypto.randomUUID(),
    title: e.title || u(e) || t,
    url: t,
    group: "常用网站",
    page: s,
    customIcon: e.favIconUrl || ""
  }), await chrome.storage.local.set({ quickLinks: c, quickLinkGroupSizes: a.quickLinkGroupSizes || {}, quickLinksReady: !0 }), { ok: !0, existed: !!n };
}
async function h(e, r = "常用网站") {
  try {
    const t = await chrome.runtime.sendMessage({ type: "bookmarkCurrentPage", tab: e, targetPage: r });
    if (t?.ok) return t;
  } catch {
  }
  return l(e, r);
}
export {
  k as g,
  g as i,
  p as l,
  h as s,
  u as t
};
