import { a as y, r as m, P as v } from "./vendor-vue-wIH4jcna.js";
const C = () => ({
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
}), t = m(C());
let n = {};
const c = {
  getSnapshot() {
    return y(t);
  },
  update(e) {
    Object.assign(t, e);
  },
  openArticle(e, o = "") {
    const r = e.title || e.headline || e.name || "无标题", a = e.summary || e.description || e.excerpt || e.digest || e.abstract || "", u = e.source?.name || e.sourceName || "AI HOT", g = e.published || e.publishedAt || e.time || e.date || "", A = e.score ? String(e.score) : "", p = e.sourceUrl || e.source_url || e.originalUrl || e.url || e.link || "#", l = !!(o && o.trim()), h = e.isAiHot !== !1 && !l, b = e.platformBadge || (h ? "AI HOT" : "资讯");
    if (Object.assign(t, {
      open: !0,
      item: e,
      title: r,
      sourceName: u,
      published: g,
      score: A,
      summary: a,
      reason: e.reason || "",
      url: p,
      content: o || "",
      loading: !l,
      copied: !1,
      importing: !1,
      imported: !1,
      isAiHot: h,
      platformBadge: b
    }), !l) {
      const i = e.id;
      import("./aihot.service-l4gGelhr.js").then(({ aiHotService: d }) => d.fetchArticleContent({ id: i, url: p, summary: a, title: r })).then((d) => {
        t.open && t.item?.id === i && c.setContent(d);
      }).catch(() => {
        t.open && t.item?.id === i && c.setContent(
          '<div class="aihot-article-fallback"><p class="muted">正文加载超时，请查阅上方 AI 导读或点击右上角「原文 ↗」访问源网页。</p></div>'
        );
      }), setTimeout(() => {
        t.loading && t.item?.id === i && c.setContent(
          '<div class="aihot-article-fallback"><p class="muted">正文加载超时，您可以点击右上角「原文 ↗」直接访问原文站点。</p></div>'
        );
      }, 4500);
    }
  },
  close() {
    t.open = !1, n.onClose && n.onClose();
  },
  setContent(e) {
    t.content = e, t.loading = !1;
  },
  setImportState(e, o) {
    t.importing = e, t.imported = o;
  },
  setActions(e) {
    n = { ...n, ...e };
  }
}, s = v({
  currentView: "feed",
  leaderboard: [],
  leaderboardSearch: "",
  leaderboardProvider: "",
  feedArticles: [],
  feedCategory: "",
  feedWindow: "24h",
  dailyReport: null,
  dailyArchives: [],
  activeDailyDate: "",
  isLoading: !1,
  errorMessage: "",
  statusMessage: ""
}), f = /* @__PURE__ */ new Set(), S = {
  get state() {
    return s;
  },
  updateState(e) {
    (e.leaderboard || e.feedArticles || e.dailyReport) && e.errorMessage === void 0 && (e.errorMessage = ""), Object.assign(s, e);
  },
  switchView(e) {
    s.currentView = e, this.dispatch("switch-view", e);
  },
  refresh() {
    this.dispatch("refresh");
  },
  setLeaderboard(e) {
    s.leaderboard = e;
  },
  setFeedArticles(e) {
    s.feedArticles = e;
  },
  setDailyReport(e, o = []) {
    s.dailyReport = e, o.length && (s.dailyArchives = o);
  },
  onAction(e) {
    return f.add(e), () => {
      f.delete(e);
    };
  },
  dispatch(e, o) {
    for (const r of f)
      try {
        r(e, o);
      } catch (a) {
        console.error("[AihotFeed] Action error:", a);
      }
  }
};
export {
  c as a,
  S as b,
  t as c,
  s as d
};
