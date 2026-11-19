import { O as d } from "./vendor-vue-BbmU9NUg.js";
const r = d({
  currentView: "feed",
  leaderboard: [],
  leaderboardSearch: "",
  leaderboardProvider: "",
  feedArticles: [],
  feedCategory: "",
  feedWindow: "24h",
  dailyReport: null,
  dailyArchives: [],
  dailyArchiveWarning: "",
  activeDailyDate: "",
  isLoading: !1,
  errorMessage: "",
  statusMessage: ""
}), s = /* @__PURE__ */ new Set(), c = {
  get state() {
    return r;
  },
  updateState(e) {
    (e.leaderboard || e.feedArticles || e.dailyReport) && e.errorMessage === void 0 && (e.errorMessage = ""), Object.assign(r, e);
  },
  switchView(e) {
    r.currentView = e, this.dispatch("switch-view", e);
  },
  refresh() {
    this.dispatch("refresh");
  },
  setLeaderboard(e) {
    r.leaderboard = e;
  },
  setFeedArticles(e) {
    r.feedArticles = e;
  },
  setDailyReport(e, t = []) {
    r.dailyReport = e, t.length && (r.dailyArchives = t);
  },
  onAction(e) {
    return s.add(e), () => {
      s.delete(e);
    };
  },
  dispatch(e, t) {
    for (const a of s)
      try {
        a(e, t);
      } catch (o) {
        console.error("[AihotFeed] Action error:", o);
      }
  }
};
export {
  c as a,
  r as b
};
