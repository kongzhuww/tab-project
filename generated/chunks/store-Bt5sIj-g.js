import { a as A, r as m } from "./vendor-vue-BkY5-p5y.js";
const b = () => ({
  open: !1,
  item: null,
  title: "",
  sourceName: "AI HOT",
  published: "",
  score: "",
  summary: "",
  reason: "",
  url: "#",
  content: "",
  loading: !1,
  copied: !1,
  importing: !1,
  imported: !1,
  isAiHot: !0,
  platformBadge: "AI HOT"
}), o = m(b());
let a = {};
const l = {
  getSnapshot() {
    return A(o);
  },
  update(e) {
    Object.assign(o, e);
  },
  openArticle(e, t = "") {
    const i = e.title || e.headline || e.name || "无标题", c = e.summary || e.description || e.excerpt || e.digest || e.abstract || "", u = e.source?.name || e.sourceName || "AI HOT", f = e.published || e.publishedAt || e.time || e.date || "", g = e.score ? String(e.score) : "", d = e.sourceUrl || e.source_url || e.originalUrl || e.url || e.link || "#", n = !!(t && t.trim()), p = e.isAiHot !== !1 && !n, h = e.platformBadge || (p ? "AI HOT" : "资讯");
    if (Object.assign(o, {
      open: !0,
      item: e,
      title: i,
      sourceName: u,
      published: f,
      score: g,
      summary: c,
      reason: e.reason || "",
      url: d,
      content: t || "",
      loading: !n,
      copied: !1,
      importing: !1,
      imported: !1,
      isAiHot: p,
      platformBadge: h
    }), !n) {
      const s = e.id;
      import("./aihot.service-2r4DeX5F.js").then(({ aiHotService: r }) => r.fetchArticleContent({ id: s, url: d, summary: c, title: i })).then((r) => {
        o.open && o.item?.id === s && l.setContent(r);
      }).catch(() => {
        o.open && o.item?.id === s && l.setContent(
          '<div class="aihot-article-fallback"><p class="muted">正文加载超时，请查阅上方 AI 导读或点击右上角「原文 ↗」访问源网页。</p></div>'
        );
      }), setTimeout(() => {
        o.loading && o.item?.id === s && l.setContent(
          '<div class="aihot-article-fallback"><p class="muted">正文加载超时，您可以点击右上角「原文 ↗」直接访问原文站点。</p></div>'
        );
      }, 4500);
    }
  },
  close() {
    o.open = !1, a.onClose && a.onClose();
  },
  setContent(e) {
    o.content = e, o.loading = !1;
  },
  setImportState(e, t) {
    o.importing = e, o.imported = t;
  },
  setActions(e) {
    a = { ...a, ...e };
  }
};
export {
  l as a,
  o as b
};
