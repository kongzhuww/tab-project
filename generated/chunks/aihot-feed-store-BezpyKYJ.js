import { N as d } from "./vendor-vue-BkY5-p5y.js";
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
    for (const o of s)
      try {
        o(e, t);
      } catch (a) {
        console.error("[AihotFeed] Action error:", a);
      }
  }
};
export {
  c as a,
  r as b
};
