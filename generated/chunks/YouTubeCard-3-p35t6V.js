import { f as rt, w as B, o as ut, c as w, a as dt, g as l, h as r, i as t, x as o, s as d, t as a, I as j, u as f, j as ct, F as M, z as R, k, q as J, D as K, l as W, K as vt, L as yt, B as bt, T as pt, J as ft, b as C } from "./vendor-vue-BUkfvXUI.js";
import { u as mt } from "./useCardActivity-XJG-xZNj.js";
import { u as gt, L as ht, M as _t } from "./search.service-BNKrftAD.js";
import "./store-DthZKedN.js";
import { C as wt } from "./ChatShareMenu-F5bvpd_H.js";
import { y as kt, a as F } from "./youtube-store-D4IhgNyB.js";
import { y as v } from "./youtube.service-BKBHOwXI.js";
import { _ as Ct } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const xt = ["inert"], Tt = { class: "card-head" }, Ft = {
  id: "youtube-view-tabs",
  class: "youtube-view-tabs",
  role: "tablist",
  "aria-label": "YouTube 视图"
}, Vt = ["aria-selected"], Lt = ["aria-selected"], Pt = {
  id: "youtube-user",
  class: "muted small"
}, St = ["title"], $t = { class: "yt-settings-anchor" }, Gt = ["aria-expanded"], Bt = {
  key: 0,
  class: "muted small",
  role: "status"
}, Mt = ["disabled"], Rt = { class: "yt-layout-body" }, Yt = { class: "yt-sidebar" }, Nt = { class: "yt-sidebar-nav-group" }, zt = { class: "yt-nav-btn-main" }, At = { class: "yt-nav-btn-text" }, Et = {
  class: "yt-sidebar-group-list",
  "aria-label": "收藏分组"
}, Dt = { class: "yt-group-count" }, It = { class: "yt-group-count" }, Ot = ["onClick"], Ut = { class: "yt-group-name" }, qt = { class: "yt-group-count" }, jt = ["onClick"], Jt = { class: "yt-sidebar-footer" }, Kt = ["disabled"], Wt = { class: "yt-main-content" }, Xt = { id: "youtube-recommend-pane" }, Ht = {
  key: 0,
  class: "muted small yt-loading-box"
}, Qt = {
  key: 1,
  class: "yt-error-box"
}, Zt = {
  key: 2,
  class: "muted small yt-empty"
}, te = { key: 3 }, ee = { class: "yt-video-grid" }, se = ["onClick", "onContextmenu"], oe = { class: "yt-thumb-wrap" }, ne = ["src", "alt"], ie = ["disabled", "title", "onClick"], ae = { class: "yt-fav-icon" }, le = { class: "yt-fav-text" }, re = {
  key: 0,
  class: "yt-badge"
}, ue = { class: "yt-info" }, de = ["title"], ce = { class: "yt-meta-row" }, ve = ["title"], ye = { class: "yt-time" }, be = { class: "yt-next-batch-container" }, pe = ["disabled"], fe = { class: "yt-next-batch-text" }, me = { id: "youtube-favorites-pane" }, ge = { class: "yt-fav-toolbar" }, he = { class: "yt-fav-hint" }, _e = { class: "yt-fav-cur-group" }, we = { class: "muted small" }, ke = { class: "yt-sync-actions" }, Ce = ["disabled"], xe = {
  key: 0,
  class: "muted small yt-loading-box"
}, Te = {
  key: 1,
  class: "muted small yt-empty yt-empty-fav"
}, Fe = ["disabled"], Ve = {
  key: 2,
  class: "yt-video-grid"
}, Le = ["onClick", "onContextmenu"], Pe = { class: "yt-thumb-wrap" }, Se = ["src", "alt"], $e = ["disabled", "onClick"], Ge = {
  key: 0,
  class: "yt-badge"
}, Be = { class: "yt-info" }, Me = ["title"], Re = { class: "yt-meta-row" }, Ye = ["title"], Ne = { class: "yt-right-meta" }, ze = { class: "yt-time" }, Ae = ["disabled", "onClick"], Ee = {
  key: 3,
  class: "yt-pagination"
}, De = ["disabled"], Ie = ["disabled"], Oe = {
  key: 0,
  class: "yt-toast"
}, Ue = { class: "menu-head" }, qe = /* @__PURE__ */ rt({
  __name: "YouTubeCard",
  setup(je) {
    const X = ft(() => import("./YouTubeSettingsPanel-67-nXDU8.js")), m = C(!1), Y = C(!1);
    B(m, (n) => {
      n && (Y.value = !0);
    });
    const N = C(null), u = C({
      visible: !1,
      x: 0,
      y: 0,
      video: null
    });
    function z(n, s) {
      n.preventDefault(), n.stopPropagation(), u.value = {
        visible: !0,
        x: n.clientX,
        y: n.clientY,
        video: s
      };
    }
    function H(n) {
      u.value.video && ht.sendYouTubeShare({
        id: u.value.video.id,
        title: u.value.video.title,
        cover: u.value.video.thumbnail,
        author: u.value.video.channelTitle,
        views: u.value.video.views,
        url: u.value.video.videoUrl
      }, n), u.value.visible = !1;
    }
    function A() {
      u.value.visible = !1;
    }
    ut(() => {
      window.addEventListener("click", A);
    });
    const e = kt, { active: Q, standalone: Z } = mt("daily-youtube", "/youtube.html"), y = w(() => Q.value && (Z || _t.showYouTube));
    let V = !1, L = !1, b;
    B([y, () => e.currentView], ([n, s], i) => {
      b && !b.signal.aborted && e.isLoading && (L = !0), b?.abort(), b = new AbortController(), (!n || s !== "recommend") && b.abort(), v.setRecommendationViewSignal(b.signal), n && (V || v.init(), s === "favorites" && (e.currentPage = Math.min(e.currentPage, Math.max(1, Math.ceil(p.value.length / e.pageSize))), v.loadFavorites()), s === "recommend" && (!V || L || i?.[1] !== s && !e.exploreVideos.length) && (L = !1, v.loadRecommend()), V = !0);
    }, { immediate: !0, flush: "sync" });
    const p = w(() => e.activeFavGroup === "全部" ? e.favorites : e.favorites.filter((n) => (n.group || "稍后观看") === e.activeFavGroup)), tt = w(() => e.favGroups.filter((n) => n !== "全部" && n !== "稍后观看"));
    function E(n) {
      return n === "全部" ? e.favorites.length : e.favorites.filter((s) => (s.group || "稍后观看") === n).length;
    }
    function P(n) {
      e.activeFavGroup = n, e.currentPage = 1, e.currentView !== "favorites" && _("favorites");
    }
    async function et() {
      const n = window.prompt("请输入新收藏分组名称：");
      !n || !n.trim() || (await v.addFavGroup(n.trim()), e.activeFavGroup = n.trim(), e.currentPage = 1);
    }
    async function st(n) {
      window.confirm(`确定要删除分组「${n}」吗？分组内的视频会保留在「稍后观看」中。`) && (await v.deleteFavGroup(n), e.activeFavGroup === n && (e.activeFavGroup = "全部"));
    }
    const g = w(
      () => Math.max(1, Math.ceil(p.value.length / e.pageSize))
    );
    B(() => p.value.length, () => {
      y.value && e.currentView === "favorites" && (e.currentPage = Math.min(e.currentPage, g.value));
    });
    const ot = w(() => {
      const n = (e.currentPage - 1) * e.pageSize;
      return p.value.slice(n, n + e.pageSize);
    });
    function h(n) {
      return e.favorites.some((s) => s.id === n);
    }
    function _(n) {
      y.value && (e.currentPage = 1, F.switchView(n));
    }
    function x() {
      y.value && (e.currentPage = 1, F.dispatch("refresh"), G());
    }
    const T = C("");
    let D = null;
    function I(n) {
      T.value = n, clearTimeout(D), D = setTimeout(() => {
        T.value = "";
      }, 2200);
    }
    async function S(n) {
      if (!(!y.value || e.favoritesBusy || e.favoritesLoading || e.favoritesNeedsReview))
        try {
          await n();
        } catch {
        }
    }
    async function nt(n) {
      const s = !h(n.id);
      await S(() => v.toggleFavorite(n)), I(s ? `已收藏：${n.title.slice(0, 18)}…` : "已移出收藏夹");
    }
    async function O(n) {
      await S(() => v.removeFavorite(n)), I("已移出收藏夹");
    }
    async function $() {
      await S(() => v.syncYouTubeLikedVideos());
    }
    async function it() {
      if (!(!y.value || e.favoritesBusy || e.favoritesLoading))
        try {
          await v.loadFavorites(!0);
        } catch {
        }
    }
    function U(n) {
      const s = n.videoUrl || `https://www.youtube.com/watch?v=${n.id}`;
      window.open(s, "_blank", "noopener,noreferrer");
    }
    function G() {
      const n = document.querySelector(".daily-youtube");
      n && n.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    function at() {
      e.currentPage > 1 && (e.currentPage--, F.dispatch("page-prev", e.currentPage), G());
    }
    function lt(n) {
      !y.value || e.isLoadingMore || e.isLoading || e.currentPage < n && (e.currentPage++, F.dispatch("page-next", e.currentPage), G());
    }
    function q(n) {
      const s = n.target;
      s.src = "assets/nav-youtube.svg";
    }
    return dt(() => {
      window.removeEventListener("click", A), b?.abort();
    }), (n, s) => (l(), r("div", {
      class: "vue-youtube-wrapper",
      inert: !y.value
    }, [
      t("section", {
        id: "daily-youtube",
        class: d(["card wide daily-youtube", { "card-fullscreen": o(gt).activeId === "daily-youtube" }])
      }, [
        t("header", Tt, [
          s[11] || (s[11] = t("span", { class: "bar youtube-red" }, null, -1)),
          s[12] || (s[12] = t("h2", null, "YouTube", -1)),
          t("div", Ft, [
            t("button", {
              type: "button",
              role: "tab",
              class: d({ on: o(e).currentView === "favorites" }),
              "aria-selected": o(e).currentView === "favorites",
              onClick: s[0] || (s[0] = (i) => _("favorites"))
            }, " ❤️ 我的收藏 (" + a(o(e).favorites.length) + ") ", 11, Vt),
            t("button", {
              type: "button",
              role: "tab",
              class: d({ on: o(e).currentView === "recommend" }),
              "aria-selected": o(e).currentView === "recommend",
              onClick: s[1] || (s[1] = (i) => _("recommend"))
            }, " ✨ 个性推荐 ", 10, Lt)
          ]),
          t("span", Pt, a(o(e).userName), 1),
          t("button", {
            id: "youtube-refresh",
            class: d(["youtube-refresh icon-btn", { spinning: o(e).isLoading }]),
            type: "button",
            title: o(e).currentView === "recommend" ? "换一批推荐 (18个)" : "刷新收藏",
            onClick: x
          }, [...s[10] || (s[10] = [
            t("span", { class: "yt-refresh-icon" }, "↻", -1)
          ])], 10, St),
          t("div", $t, [
            t("button", {
              ref_key: "settingsButton",
              ref: N,
              type: "button",
              class: "icon-btn",
              title: "YouTube 设置",
              "aria-label": "YouTube 设置",
              "aria-expanded": m.value,
              onClick: s[2] || (s[2] = (i) => m.value = !m.value)
            }, "⚙", 8, Gt),
            Y.value ? (l(), j(o(X), {
              key: 0,
              visible: y.value && m.value,
              anchor: N.value,
              onClose: s[3] || (s[3] = (i) => m.value = !1)
            }, null, 8, ["visible", "anchor"])) : f("", !0)
          ])
        ]),
        o(e).favoriteMessage || o(e).favoritesNeedsReview ? (l(), r("div", Bt, [
          ct(a(o(e).favoriteMessage) + " ", 1),
          t("button", {
            type: "button",
            disabled: o(e).favoritesBusy || o(e).favoritesLoading,
            onClick: it
          }, "重读收藏", 8, Mt)
        ])) : f("", !0),
        t("div", Rt, [
          t("aside", Yt, [
            t("div", Nt, [
              t("button", {
                type: "button",
                class: d(["yt-sidebar-nav-btn yt-nav-fav", { on: o(e).currentView === "favorites" }]),
                onClick: s[4] || (s[4] = (i) => _("favorites"))
              }, [
                t("div", zt, [
                  s[14] || (s[14] = t("span", { class: "yt-nav-btn-icon" }, "❤️", -1)),
                  t("div", At, [
                    s[13] || (s[13] = t("strong", null, "我的收藏", -1)),
                    t("small", null, a(o(e).favorites.length) + " 个收藏视频", 1)
                  ])
                ]),
                s[15] || (s[15] = t("span", { class: "yt-nav-btn-badge" }, "FAV", -1))
              ], 2),
              t("button", {
                type: "button",
                class: d(["yt-sidebar-nav-btn yt-nav-rec", { on: o(e).currentView === "recommend" }]),
                onClick: s[5] || (s[5] = (i) => _("recommend"))
              }, [...s[16] || (s[16] = [
                t("div", { class: "yt-nav-btn-main" }, [
                  t("span", { class: "yt-nav-btn-icon" }, "✨"),
                  t("div", { class: "yt-nav-btn-text" }, [
                    t("strong", null, "个性推荐"),
                    t("small", null, "算法流 · 18个换一批")
                  ])
                ], -1),
                t("span", { class: "yt-nav-btn-badge" }, "FOR YOU", -1)
              ])], 2)
            ]),
            t("div", { class: "yt-sidebar-hub-head" }, [
              s[17] || (s[17] = t("div", { class: "yt-hub-title" }, [
                t("span", { class: "yt-hub-icon" }, "📁"),
                t("div", { class: "yt-hub-text" }, [
                  t("strong", null, "收藏分组"),
                  t("small", null, "按本地分类展示")
                ])
              ], -1)),
              t("button", {
                class: "yt-hub-add-btn",
                type: "button",
                title: "新建收藏分组",
                onClick: et
              }, " ＋ ")
            ]),
            t("nav", Et, [
              t("button", {
                type: "button",
                class: d(["yt-group-item", { on: o(e).currentView === "favorites" && o(e).activeFavGroup === "全部" }]),
                onClick: s[6] || (s[6] = (i) => P("全部"))
              }, [
                s[18] || (s[18] = t("i", { class: "yt-group-icon" }, "📌", -1)),
                s[19] || (s[19] = t("span", { class: "yt-group-name" }, "全部视频", -1)),
                t("small", Dt, a(o(e).favorites.length), 1)
              ], 2),
              t("button", {
                type: "button",
                class: d(["yt-group-item", { on: o(e).currentView === "favorites" && o(e).activeFavGroup === "稍后观看" }]),
                onClick: s[7] || (s[7] = (i) => P("稍后观看"))
              }, [
                s[20] || (s[20] = t("i", { class: "yt-group-icon" }, "⏳", -1)),
                s[21] || (s[21] = t("span", { class: "yt-group-name" }, "稍后观看", -1)),
                t("small", It, a(E("稍后观看")), 1)
              ], 2),
              (l(!0), r(M, null, R(tt.value, (i) => (l(), r("div", {
                key: i,
                class: d(["yt-group-item yt-group-custom", { on: o(e).currentView === "favorites" && o(e).activeFavGroup === i }]),
                onClick: (c) => P(i)
              }, [
                s[22] || (s[22] = t("i", { class: "yt-group-icon" }, "📂", -1)),
                t("span", Ut, a(i), 1),
                t("small", qt, a(E(i)), 1),
                t("button", {
                  class: "yt-group-del-btn",
                  type: "button",
                  title: "删除分组",
                  onClick: k((c) => st(i), ["stop"])
                }, " ✕ ", 8, jt)
              ], 10, Ot))), 128))
            ]),
            t("div", Jt, [
              t("button", {
                class: "yt-sidebar-sync-btn",
                type: "button",
                title: "自动读取 Edge 浏览器中已登录的 YouTube 账号，同步 Liked 视频",
                disabled: o(e).favoritesBusy || o(e).favoritesLoading || o(e).favoritesNeedsReview,
                onClick: $
              }, [...s[23] || (s[23] = [
                t("span", { class: "yt-sync-icon" }, "🔄", -1),
                t("span", null, "同步账号 Liked 视频", -1)
              ])], 8, Kt)
            ])
          ]),
          t("main", Wt, [
            J(t("div", Xt, [
              o(e).isLoading && o(e).exploreVideos.length === 0 ? (l(), r("div", Ht, [...s[24] || (s[24] = [
                t("i", { class: "yt-spinner" }, null, -1),
                t("span", null, "正在生成专属个性推荐流…", -1)
              ])])) : o(e).error && o(e).exploreVideos.length === 0 ? (l(), r("div", Qt, [
                t("p", null, "⚠️ " + a(o(e).error), 1),
                t("button", {
                  type: "button",
                  class: "yt-retry-btn",
                  onClick: x
                }, "↻ 重新拉取")
              ])) : o(e).exploreVideos.length === 0 ? (l(), r("div", Zt, [
                s[25] || (s[25] = t("p", null, "推荐流正在同步，点击换一批即可获取推荐", -1)),
                t("button", {
                  type: "button",
                  class: "yt-retry-btn",
                  style: { "margin-top": "8px" },
                  onClick: x
                }, "↻ 换一批推荐")
              ])) : (l(), r("div", te, [
                s[27] || (s[27] = t("div", { class: "yt-rec-header-hint" }, [
                  t("span", { class: "yt-rec-counter" }, "✨ 当前为您精选 18 个推荐视频"),
                  t("span", { class: "yt-rec-fav-tip" }, "💡 悬浮封面点击 🤍 即可一键收藏")
                ], -1)),
                t("div", ee, [
                  (l(!0), r(M, null, R(o(e).exploreVideos, (i) => (l(), r("article", {
                    key: "rec-" + i.id,
                    class: "yt-card",
                    onClick: (c) => U(i),
                    onContextmenu: (c) => z(c, i)
                  }, [
                    t("div", oe, [
                      t("img", {
                        src: i.thumbnail,
                        alt: i.title,
                        loading: "lazy",
                        onError: q
                      }, null, 40, ne),
                      t("button", {
                        class: d(["yt-fav-badge", { "is-fav": h(i.id) }]),
                        type: "button",
                        disabled: o(e).favoritesBusy || o(e).favoritesLoading || o(e).favoritesNeedsReview,
                        title: h(i.id) ? "已收藏到本地（点击移出）" : "收藏到本地 YouTube 收藏夹",
                        onClick: k((c) => nt(i), ["stop"])
                      }, [
                        t("span", ae, a(h(i.id) ? "❤️" : "🤍"), 1),
                        t("span", le, a(h(i.id) ? "已收藏" : "收藏"), 1)
                      ], 10, ie),
                      i.views ? (l(), r("span", re, a(i.views), 1)) : f("", !0)
                    ]),
                    t("div", ue, [
                      t("h4", {
                        class: "yt-title",
                        title: i.title
                      }, a(i.title), 9, de),
                      t("div", ce, [
                        t("span", {
                          class: "yt-channel",
                          title: i.channelTitle
                        }, a(i.channelTitle), 9, ve),
                        t("span", ye, a(i.publishedAt) + " ↗", 1)
                      ])
                    ])
                  ], 40, se))), 128))
                ]),
                t("div", be, [
                  t("button", {
                    type: "button",
                    class: d(["yt-next-batch-btn", { spinning: o(e).isLoading }]),
                    disabled: o(e).isLoading,
                    onClick: x
                  }, [
                    s[26] || (s[26] = t("span", { class: "yt-next-batch-icon" }, "↻", -1)),
                    t("span", fe, a(o(e).isLoading ? "正在探索下一批推荐…" : "换一批推荐（再来 18 个）"), 1)
                  ], 10, pe)
                ])
              ]))
            ], 512), [
              [K, o(e).currentView === "recommend"]
            ]),
            J(t("div", me, [
              t("div", ge, [
                t("div", he, [
                  t("strong", _e, "📁 " + a(o(e).activeFavGroup), 1),
                  t("span", we, "（共 " + a(p.value.length) + " 个收藏视频 · 每页 18 个）", 1)
                ]),
                t("div", ke, [
                  t("button", {
                    class: "yt-sync-btn",
                    type: "button",
                    title: "自动读取 Edge 浏览器中登录的 YouTube 账号，同步 Liked 视频",
                    disabled: o(e).favoritesBusy || o(e).favoritesLoading || o(e).favoritesNeedsReview,
                    onClick: $
                  }, " 🔄 同步账号 Liked 视频 ", 8, Ce)
                ])
              ]),
              o(e).favoritesLoading ? (l(), r("div", xe, [...s[28] || (s[28] = [
                t("i", { class: "yt-spinner" }, null, -1),
                t("span", null, "正在更新收藏列表…", -1)
              ])])) : p.value.length === 0 ? (l(), r("div", Te, [
                s[29] || (s[29] = t("span", { class: "yt-empty-icon" }, "📺", -1)),
                t("p", null, "当前分组「" + a(o(e).activeFavGroup) + "」暂无视频。", 1),
                s[30] || (s[30] = t("p", { class: "yt-empty-sub" }, "若您在 YouTube 账号中有点赞或喜欢的视频，可直接一键同步到本地展示。", -1)),
                t("button", {
                  type: "button",
                  class: "yt-sync-btn yt-empty-sync-btn",
                  disabled: o(e).favoritesBusy || o(e).favoritesLoading || o(e).favoritesNeedsReview,
                  onClick: $
                }, " 🔄 立即同步 YouTube 账号喜欢的视频 ", 8, Fe)
              ])) : (l(), r("div", Ve, [
                (l(!0), r(M, null, R(ot.value, (i) => (l(), r("article", {
                  key: "fav-" + i.id,
                  class: "yt-card",
                  onClick: (c) => U(i),
                  onContextmenu: (c) => z(c, i)
                }, [
                  t("div", Pe, [
                    t("img", {
                      src: i.thumbnail,
                      alt: i.title,
                      loading: "lazy",
                      onError: q
                    }, null, 40, Se),
                    t("button", {
                      class: "yt-fav-badge is-fav",
                      type: "button",
                      disabled: o(e).favoritesBusy || o(e).favoritesLoading || o(e).favoritesNeedsReview,
                      title: "从收藏中移出",
                      onClick: k((c) => O(i.id), ["stop"])
                    }, [...s[31] || (s[31] = [
                      t("span", { class: "yt-fav-icon" }, "❤️", -1),
                      t("span", { class: "yt-fav-text" }, "移出", -1)
                    ])], 8, $e),
                    i.views ? (l(), r("span", Ge, a(i.views), 1)) : f("", !0)
                  ]),
                  t("div", Be, [
                    t("h4", {
                      class: "yt-title",
                      title: i.title
                    }, a(i.title), 9, Me),
                    t("div", Re, [
                      t("span", {
                        class: "yt-channel",
                        title: i.channelTitle
                      }, a(i.channelTitle), 9, Ye),
                      t("div", Ne, [
                        t("span", ze, a(i.publishedAt || "已收藏"), 1),
                        t("button", {
                          class: "yt-del-fav-btn",
                          type: "button",
                          disabled: o(e).favoritesBusy || o(e).favoritesLoading || o(e).favoritesNeedsReview,
                          title: "从收藏中删除",
                          onClick: k((c) => O(i.id), ["stop"])
                        }, " 🗑️ ", 8, Ae)
                      ])
                    ])
                  ])
                ], 40, Le))), 128))
              ])),
              g.value > 1 ? (l(), r("nav", Ee, [
                t("button", {
                  type: "button",
                  disabled: o(e).currentPage <= 1,
                  onClick: at
                }, "‹ 上一页", 8, De),
                t("span", null, "第 " + a(o(e).currentPage) + " / " + a(g.value) + " 页 (共 " + a(p.value.length) + " 条)", 1),
                t("button", {
                  type: "button",
                  disabled: o(e).currentPage >= g.value,
                  onClick: s[8] || (s[8] = (i) => lt(g.value))
                }, "下一页 ›", 8, Ie)
              ])) : f("", !0)
            ], 512), [
              [K, o(e).currentView === "favorites"]
            ])
          ])
        ])
      ], 2),
      W(yt, { name: "yt-toast-fade" }, {
        default: vt(() => [
          T.value ? (l(), r("div", Oe, a(T.value), 1)) : f("", !0)
        ]),
        _: 1
      }),
      (l(), j(pt, { to: "body" }, [
        u.value.visible ? (l(), r("div", {
          key: 0,
          class: "yt-context-menu",
          style: bt({ left: `${Math.min(u.value.x, 600)}px`, top: `${Math.min(u.value.y, 400)}px` }),
          onClick: s[9] || (s[9] = k(() => {
          }, ["stop"]))
        }, [
          t("div", Ue, a(u.value.video?.title), 1),
          W(wt, {
            label: "💬 发送到聊天室",
            visible: u.value.visible,
            onSelect: H
          }, null, 8, ["visible"])
        ], 4)) : f("", !0)
      ]))
    ], 8, xt));
  }
}), es = /* @__PURE__ */ Ct(qe, [["__scopeId", "data-v-f11de297"]]);
export {
  es as default
};
