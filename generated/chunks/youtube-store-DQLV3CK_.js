import { r as i } from "./vendor-vue-CjOHdfe5.js";
const s = i({
  currentView: "favorites",
  userName: "LogicWeaver 用户",
  currentPage: 1,
  pageSize: 18,
  isLoading: !1,
  isLoadingMore: !1,
  favoritesBusy: !1,
  favoritesLoading: !1,
  favoritesNeedsReview: !1,
  favoriteMessage: "",
  error: "",
  exploreVideos: [],
  favorites: [],
  groups: [],
  channels: [],
  videos: [],
  playlists: [],
  activePlaylistId: "",
  playlistVideos: [],
  searchResults: [],
  favGroups: ["全部", "稍后观看"],
  activeFavGroup: "全部"
}), t = /* @__PURE__ */ new Set(), n = {
  get state() {
    return s;
  },
  updateState(e) {
    Object.assign(s, e);
  },
  switchView(e) {
    s.currentView = e, this.dispatch("switch-view", e);
  },
  onAction(e) {
    return t.add(e), () => {
      t.delete(e);
    };
  },
  dispatch(e, r) {
    for (const a of t)
      try {
        a(e, r);
      } catch (o) {
        console.error("[YouTube] Action error:", o);
      }
  }
};
export {
  s as a,
  n as y
};
