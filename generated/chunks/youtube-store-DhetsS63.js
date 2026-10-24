import { w as i } from "./search.service-CJV_B19X.js";
import { r as n } from "./vendor-vue-BUkfvXUI.js";
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  notifications: i
}, Symbol.toStringTag, { value: "Module" })), t = n({
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
}), o = /* @__PURE__ */ new Set(), u = {
  get state() {
    return t;
  },
  updateState(e) {
    Object.assign(t, e);
  },
  switchView(e) {
    t.currentView = e, this.dispatch("switch-view", e);
  },
  onAction(e) {
    return o.add(e), () => {
      o.delete(e);
    };
  },
  dispatch(e, r) {
    for (const s of o)
      try {
        s(e, r);
      } catch (a) {
        console.error("[YouTube] Action error:", a);
      }
  }
};
export {
  u as a,
  f as n,
  t as y
};
