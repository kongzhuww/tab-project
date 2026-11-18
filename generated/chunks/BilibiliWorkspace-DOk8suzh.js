import { d as Me, o as s, e as o, i as e, t as l, u as n, A, m as ye, F as N, g as X, f as y, p as $e, h as S, s as te, w as ce, B as We, x as Tt, l as be, n as Te, k as Be, b as $, E as pt, Q as kt, C as Pt, z as Pe, v as Bt, y as bt, G as rt, j as Qe, T as At } from "./vendor-vue-BrDsOMg2.js";
import { a as I, b as Ue, c as ut, s as Nt } from "./bili-favorites-store-Cec4x95f.js";
import { b as wt, i as pe, n as Je, c as Ze } from "./mini-player-store-HSHTqfkQ.js";
import "./fullscreen-cards.store-CBVQa-Eg.js";
import { u as Vt } from "./useCardActivity-CxxoOp6_.js";
import { _ as Ee, t as V } from "./_plugin-vue_export-helper-Do3lP4W5.js";
import { B as et } from "./BiliRichText-BycAhbYR.js";
import { d as Ut, a as Gt } from "./playback-sync-DuZXIX9X.js";
import { a as he, d as dt, e as h, c as we } from "./up-group-manager-store-C3BKfSqY.js";
import { g as Ft, s as Ot } from "./cache-directory-CBBZXa5n.js";
import { u as qt } from "./useMachine-C_cIyqZx.js";
import { j, r as Ve, k as $t } from "./view-styles-agM3PzgD.js";
import { biliMessagePanelController as Ht, biliMessagePanelState as Yt } from "./message-panel-store-CMItbp-0.js";
import { bilibiliChannelService as ze } from "./bilibili-channel.service-DlgHbkfQ.js";
import { u as Wt } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-BE0lk86U.js";
import { C as Ct } from "./ChatShareMenu-vIAWRq3C.js";
import { k as jt, w as Xt } from "./search.service-Cpqvf4pp.js";
import { f as ct } from "./fullscreen-presentation-Byb88Aul.js";
const Kt = { class: "bili-sub-header bili-sub-vue-header" }, Qt = { class: "bili-sub-channel-info" }, Jt = { class: "bili-sub-vue-title-row" }, Zt = { class: "bili-sub-title" }, ei = { class: "bili-sub-desc" }, ti = { class: "bili-sub-actions" }, ii = { class: "bili-sub-mode-icon" }, si = { class: "bili-sub-mode-text" }, oi = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, ni = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, li = { class: "bili-sub-dropdown-panel" }, ai = { class: "bili-sub-dropdown-list" }, ri = ["onClick"], ui = { class: "bili-sub-item-text" }, di = {
  key: 0,
  class: "bili-sub-item-check"
}, ci = { class: "bili-sub-dropdown-foot" }, pi = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, bi = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, vi = { class: "bili-sub-dropdown-panel bili-sub-video-dropdown-panel" }, fi = { class: "bili-sub-dropdown-title" }, gi = { class: "bili-sub-dropdown-list" }, mi = ["title", "onClick"], hi = { class: "bili-sub-video-num" }, yi = { class: "bili-sub-item-text" }, _i = {
  key: 0,
  class: "bili-sub-video-duration"
}, ki = { class: "bili-sub-dropdown-foot" }, wi = ["disabled"], $i = /* @__PURE__ */ Me({
  __name: "BiliSubscriptionHeader",
  props: {
    showBack: { type: Boolean }
  },
  setup(me) {
    function c(w, f) {
      Ue.dispatch(w, f);
    }
    return (w, f) => (s(), o("header", Kt, [
      e("div", Qt, [
        f[6] || (f[6] = e("img", {
          class: "bili-sub-avatar",
          src: "assets/bilibili.svg",
          alt: ""
        }, null, -1)),
        e("div", null, [
          e("div", Jt, [
            e("h3", Zt, l(n(I).organizer.subscriptionTitle), 1)
          ]),
          e("p", ei, l(n(I).organizer.subscriptionSubtitle), 1)
        ])
      ]),
      e("div", ti, [
        e("button", {
          type: "button",
          class: A(["bili-sub-head-btn bili-sub-script-mode-btn", { "is-newspaper": n(I).organizer.subscriptionScriptMode === "newspaper" }]),
          onClick: f[0] || (f[0] = (P) => c("subscription-script-mode"))
        }, [
          e("span", ii, l(n(I).organizer.subscriptionScriptMode === "newspaper" ? "📰" : "📜"), 1),
          e("span", si, l(n(I).organizer.subscriptionScriptMode === "newspaper" ? "报纸模式" : "滚动台词"), 1)
        ], 2),
        e("details", oi, [
          e("summary", ni, [
            e("span", null, [
              f[7] || (f[7] = ye("关注 UP 主：", -1)),
              e("b", null, l(n(I).organizer.subscriptionTitle), 1)
            ]),
            f[8] || (f[8] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", li, [
            f[10] || (f[10] = e("div", { class: "bili-sub-dropdown-title" }, "已关注的 UP 主", -1)),
            e("div", ai, [
              (s(!0), o(N, null, X(n(I).organizer.subscriptionChannels, (P) => (s(), o("button", {
                key: P.id,
                type: "button",
                class: A(["bili-sub-dropdown-item", { active: P.active }]),
                onClick: (D) => c("subscription-channel", P.id)
              }, [
                f[9] || (f[9] = e("span", { class: "bili-sub-dot" }, null, -1)),
                e("span", ui, l(P.name), 1),
                P.active ? (s(), o("span", di, "✓")) : y("", !0)
              ], 10, ri))), 128))
            ]),
            e("div", ci, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                onClick: f[1] || (f[1] = (P) => c("subscription-add-channel"))
              }, "＋ UP 主")
            ])
          ])
        ]),
        e("details", pi, [
          e("summary", bi, [
            e("span", null, [
              f[11] || (f[11] = ye("视频 ", -1)),
              e("b", null, "(" + l(n(I).organizer.subscriptionVideos.length) + ")", 1)
            ]),
            f[12] || (f[12] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", vi, [
            e("div", fi, "最近投稿视频 (" + l(n(I).organizer.subscriptionVideos.length) + ")", 1),
            e("div", gi, [
              (s(!0), o(N, null, X(n(I).organizer.subscriptionVideos, (P, D) => (s(), o("button", {
                key: P.bvid,
                type: "button",
                class: A(["bili-sub-dropdown-item bili-sub-video-item", { active: P.active }]),
                title: P.title,
                onClick: (M) => c("subscription-video", P.bvid)
              }, [
                e("span", hi, l(D + 1) + ".", 1),
                e("span", yi, l(P.title), 1),
                P.duration ? (s(), o("small", _i, l(P.duration), 1)) : y("", !0)
              ], 10, mi))), 128))
            ]),
            e("div", ki, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                disabled: n(I).organizer.subscriptionLoading,
                onClick: f[2] || (f[2] = (P) => c("subscription-load-more"))
              }, "继续获取", 8, wi)
            ])
          ])
        ]),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: f[3] || (f[3] = (P) => c(n(I).organizer.showFullDescInRightPanel ? "subscription-copy-description" : "subscription-copy-script"))
        }, l(n(I).organizer.showFullDescInRightPanel ? "复制简介" : "复制稿子"), 1),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: f[4] || (f[4] = (P) => c("subscription-refresh"))
        }, "↻ 刷新"),
        me.showBack ? (s(), o("button", {
          key: 0,
          type: "button",
          class: "bili-sub-head-btn",
          onClick: f[5] || (f[5] = (P) => c("organizer-open"))
        }, "← 返回收藏夹")) : y("", !0)
      ])
    ]));
  }
}), Ci = /* @__PURE__ */ Ee($i, [["__scopeId", "data-v-3f587b61"]]), xi = { class: "bili-sub-transcript-column bili-sub-vue-transcript-column" }, Si = { class: "bili-sub-article-wrap" }, Ti = { class: "bili-sub-transcript-body" }, Pi = {
  key: 0,
  class: "bili-sub-description-copy",
  title: "当前为放大简介视图"
}, Mi = {
  key: 0,
  class: "muted"
}, Di = {
  key: 0,
  class: "bili-sub-newspaper-list"
}, Ei = ["data-idx", "data-from", "data-to", "title", "onClick"], Ii = { class: "bili-sub-newspaper-header" }, Ri = { class: "bili-sub-newspaper-num" }, Li = { class: "bili-sub-newspaper-heading" }, zi = { class: "bili-sub-newspaper-title" }, Bi = { class: "bili-sub-newspaper-time" }, Ai = ["onClick"], Ni = { class: "bili-sub-newspaper-content" }, Vi = ["data-from", "data-to", "title", "onClick"], Ui = {
  key: 1,
  class: "bili-sub-srt-list"
}, Gi = ["data-idx", "data-from", "data-to", "title", "onClick"], Fi = { class: "bili-sub-srt-time" }, Oi = { class: "bili-sub-srt-text" }, qi = {
  key: 2,
  class: "bili-sub-no-transcript-box"
}, Hi = {
  key: 2,
  class: "bili-sub-vue-empty-hint"
}, Yi = /* @__PURE__ */ Me({
  __name: "BiliSubscriptionTranscript",
  setup(me) {
    const c = te(() => I.organizer), w = te(() => c.value.subscriptionChapters.length > 0 || c.value.subscriptionCues.length > 0);
    function f(P, D) {
      Ue.dispatch(P, D);
    }
    return (P, D) => (s(), o("section", xi, [
      e("article", Si, [
        e("div", Ti, [
          c.value.showFullDescInRightPanel ? (s(), o("section", Pi, [
            e("header", null, [
              D[1] || (D[1] = e("h5", null, "视频简介", -1)),
              e("button", {
                type: "button",
                class: "bili-copy-desc-btn",
                title: "切回台词展示",
                onClick: D[0] || (D[0] = (M) => f("subscription-toggle-desc-panel"))
              }, "缩小简介")
            ]),
            (s(!0), o(N, null, X(c.value.subscriptionDescription, (M, r) => (s(), o("p", { key: r }, [
              $e(et, { text: M }, null, 8, ["text"])
            ]))), 128)),
            c.value.subscriptionDescription.length ? y("", !0) : (s(), o("p", Mi, "该视频暂无可用的文字简介。"))
          ])) : (s(), o(N, { key: 1 }, [
            c.value.subscriptionScriptMode === "newspaper" && c.value.subscriptionChapters.length ? (s(), o("div", Di, [
              (s(!0), o(N, null, X(c.value.subscriptionChapters, (M, r) => (s(), o("article", {
                key: `${M.from}:${r}`,
                class: "bili-sub-newspaper-section",
                "data-idx": r,
                "data-from": M.from,
                "data-to": M.to,
                title: `点击跳转至 ${M.fromText} 播放`,
                onClick: (_) => f("subscription-seek", { from: M.from, index: r, mode: "newspaper" })
              }, [
                e("header", Ii, [
                  e("span", Ri, l(String(r + 1).padStart(2, "0")), 1),
                  e("div", Li, [
                    e("h4", zi, l(M.title), 1),
                    e("span", Bi, "⏱ " + l(M.fromText) + " - " + l(M.toText), 1)
                  ]),
                  e("button", {
                    type: "button",
                    class: "bili-sub-newspaper-play-btn",
                    "aria-label": "从头播放此分段",
                    onClick: S((_) => f("subscription-seek", { from: M.from, index: r, mode: "newspaper" }), ["stop"])
                  }, "▶", 8, Ai)
                ]),
                e("div", Ni, [
                  M.paragraphCues && M.paragraphCues.length ? (s(!0), o(N, { key: 0 }, X(M.paragraphCues, (_, C) => (s(), o("p", {
                    key: C,
                    class: "bili-sub-newspaper-p"
                  }, [
                    (s(!0), o(N, null, X(_, (U, J) => (s(), o("span", {
                      key: `${U.from}:${J}`,
                      class: "bili-sub-newspaper-cue",
                      "data-from": U.from,
                      "data-to": U.to,
                      title: `点击跳转播放此句 (⏱ ${U.timeText || U.from + "s"})`,
                      onClick: S((H) => f("subscription-seek", { from: U.from, mode: "newspaper" }), ["stop"])
                    }, l(U.content), 9, Vi))), 128))
                  ]))), 128)) : (s(!0), o(N, { key: 1 }, X(M.paragraphs, (_, C) => (s(), o("p", {
                    key: C,
                    class: "bili-sub-newspaper-p"
                  }, l(_), 1))), 128))
                ])
              ], 8, Ei))), 128))
            ])) : c.value.subscriptionCues.length ? (s(), o("div", Ui, [
              (s(!0), o(N, null, X(c.value.subscriptionCues, (M) => (s(), o("button", {
                key: `${M.from}:${M.index}`,
                type: "button",
                class: "bili-sub-srt-row",
                "data-idx": M.index,
                "data-from": M.from,
                "data-to": M.to,
                title: `点击跳转至 ${M.timeText}`,
                onClick: (r) => f("subscription-seek", { from: M.from, index: M.index, mode: "lyrics" })
              }, [
                e("span", Fi, l(M.timeText), 1),
                e("span", Oi, l(M.content), 1)
              ], 8, Gi))), 128))
            ])) : (s(), o("div", qi, [...D[2] || (D[2] = [
              e("div", { class: "bili-sub-no-transcript-icon" }, "🎙️", -1),
              e("h5", null, "暂无实时台词字幕", -1),
              e("p", { class: "muted" }, "当前视频暂无可用字幕稿。如需阅读完整文案，请点击左侧视频标题旁的“放大简介”。", -1)
            ])]))
          ], 64)),
          !c.value.showFullDescInRightPanel && !w.value && !c.value.subscriptionDescription.length ? (s(), o("p", Hi, "字幕不可用时仍可在左侧播放和查看评论。")) : y("", !0)
        ])
      ])
    ]));
  }
}), Wi = /* @__PURE__ */ Ee(Yi, [["__scopeId", "data-v-d4a520da"]]), ji = { class: "bili-sub-player-column" }, Xi = {
  key: 0,
  class: "bili-sub-sticky-player"
}, Ki = { class: "bili-sub-player-card" }, Qi = { class: "bili-sub-video-box" }, Ji = ["poster", "hidden"], Zi = ["src"], es = {
  key: 1,
  class: "bili-sub-video-loading"
}, ts = { class: "bili-sub-video-meta" }, is = { class: "bili-sub-video-meta-actions" }, ss = ["title"], os = { class: "bili-sub-meta-stats" }, ns = { class: "bili-sub-meta-desc" }, ls = {
  class: "bili-sub-comments-section",
  id: "bili-sub-comments-section"
}, as = { class: "bili-mini-comments-head" }, rs = { class: "bili-mini-comments-meta" }, us = { class: "bili-mini-comments-count bili-sub-comments-count" }, ds = { class: "bili-mini-comments-sort" }, cs = { class: "bili-sub-comment-composer" }, ps = ["onKeydown"], bs = ["disabled"], vs = {
  key: 0,
  class: "bili-sub-emote-picker"
}, fs = {
  key: 0,
  class: "fo-bili-loading"
}, gs = { key: 1 }, ms = ["title", "onClick"], hs = ["src", "alt"], ys = { key: 1 }, _s = { class: "bili-mini-comments-body bili-sub-comments-body" }, ks = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, ws = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, $s = ["src"], Cs = { class: "bili-comment-main" }, xs = { class: "bili-comment-user-row" }, Ss = { class: "bili-comment-uname" }, Ts = {
  key: 0,
  class: "bili-comment-level"
}, Ps = { class: "bili-comment-time" }, Ms = { class: "bili-comment-text" }, Ds = {
  key: 0,
  class: "bili-comment-pictures"
}, Es = ["href", "onClick"], Is = ["src"], Rs = { class: "bili-comment-actions" }, Ls = { key: 0 }, zs = { key: 1 }, Bs = {
  key: 1,
  class: "bili-comment-sub-list"
}, As = { class: "bili-comment-sub-uname" }, Ns = { class: "bili-comment-sub-more" }, Vs = ["disabled", "onClick"], Us = ["disabled", "onClick"], Gs = ["onClick"], Fs = { class: "bili-sub-comments-infinite-trigger" }, Os = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0" }
}, qs = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0", opacity: "0.6" }
}, Hs = {
  key: 1,
  class: "fo-bili-empty"
}, Ys = /* @__PURE__ */ Me({
  __name: "BiliSubscriptionPlayer",
  setup(me) {
    const c = te(() => I.organizer.subscriptionCurrent), w = $(null), f = $(!1), P = $(!1), D = $(""), M = $(""), r = $(1), _ = $(1), C = $([]), U = $("0 条"), J = $(!1), H = $(!1), z = $(""), W = $(!1), Q = $(""), Y = $(null), E = $(!1), q = $(""), oe = $(!1), se = $(!1), ve = $(!1), b = $([]);
    let ne = null, ae = null;
    function ee(x, g = !1) {
      q.value = x, oe.value = g, ne && clearTimeout(ne), ne = setTimeout(() => {
        q.value = "";
      }, 3500);
    }
    function re() {
      Ue.dispatch("subscription-open-player");
    }
    function fe() {
      Ue.dispatch("subscription-toggle-desc-panel");
    }
    function Ce(x) {
      const g = x.currentTarget;
      g && g.scrollHeight - g.scrollTop - g.clientHeight < 180 && !H.value && W.value && ue();
    }
    function R(x, g) {
      const p = x[g];
      p && window.open(p, "_blank", "noopener,noreferrer");
    }
    function m(x, g) {
      if (!x) return [];
      if (!g || g.size === 0)
        return [{ type: "text", text: x }];
      const p = /\[([^\]]+)\]/g, T = [];
      let F = 0, G;
      for (; (G = p.exec(x)) !== null; ) {
        G.index > F && T.push({ type: "text", text: x.slice(F, G.index) });
        const K = G[0], le = g.get(K);
        le ? T.push({ type: "emote", text: K, url: le }) : T.push({ type: "text", text: K }), F = p.lastIndex;
      }
      return F < x.length && T.push({ type: "text", text: x.slice(F) }), T;
    }
    function O(x) {
      if (!x) return "";
      const g = new Date(x * 1e3), p = /* @__PURE__ */ new Date(), T = Math.floor((p.getTime() - g.getTime()) / 1e3);
      if (T < 60) return "刚刚";
      if (T < 3600) return `${Math.floor(T / 60)} 分钟前`;
      if (T < 86400) return `${Math.floor(T / 3600)} 小时前`;
      const F = g.getFullYear(), G = String(g.getMonth() + 1).padStart(2, "0"), K = String(g.getDate()).padStart(2, "0");
      return F === p.getFullYear() ? `${G}-${K}` : `${F}-${G}-${K}`;
    }
    function Z(x) {
      return x ? x >= 1e4 ? (x / 1e4).toFixed(1).replace(/\.0$/, "") + "万" : String(x) : "0";
    }
    async function k(x = !1) {
      if (M.value) {
        x ? H.value = !0 : (J.value = !0, z.value = "");
        try {
          const g = `https://api.bilibili.com/x/v2/reply?type=1&oid=${M.value}&pn=${_.value}&ps=20&sort=${r.value}`, T = await (await fetch(g, { credentials: "include" })).json();
          if (T?.code !== 0 || !T?.data) {
            x || (z.value = T?.message || "评论加载失败或该视频已关闭评论", C.value = []), W.value = !1;
            return;
          }
          const F = T.data, G = F.page?.count || 0;
          U.value = `${Z(G)} 条`;
          const le = (Array.isArray(F.replies) ? F.replies : []).map((ie) => {
            const Oe = /* @__PURE__ */ new Map();
            ie.content?.emote && Object.entries(ie.content.emote).forEach(([xe, je]) => {
              je?.url && Oe.set(xe, String(je.url).replace(/^http:/, "https:"));
            });
            const qe = String(ie.content?.message || ""), He = Array.isArray(ie.content?.pictures) ? ie.content.pictures.map((xe) => String(xe?.img_src || xe).replace(/^http:/, "https:")).filter(Boolean) : [], Ye = Array.isArray(ie.replies) ? ie.replies.map((xe) => ({
              id: xe.rpid || Math.random(),
              userName: xe.member?.uname || "B站用户",
              message: String(xe.content?.message || "")
            })) : [];
            return {
              id: ie.rpid || Math.random(),
              userName: ie.member?.uname || "B站用户",
              avatar: String(ie.member?.avatar || "").replace(/^http:/, "https:"),
              level: Number(ie.member?.level_info?.current_level || 0),
              message: qe,
              tokens: m(qe, Oe),
              timeStr: O(ie.ctime),
              likeCount: Number(ie.like || 0),
              replyCount: Number(ie.rcount || 0),
              pictures: He,
              replies: Ye
            };
          });
          x ? C.value = [...C.value, ...le] : C.value = le, W.value = C.value.length < G;
        } catch (g) {
          x || (z.value = g?.message || "网络异常，未能加载评论");
        } finally {
          J.value = !1, H.value = !1;
        }
      }
    }
    async function u(x) {
      const g = C.value.find((p) => String(p.id) === String(x));
      if (!(!g || g.subRepliesLoading || !M.value)) {
        g.subRepliesPage ? g.subRepliesPage++ : g.subRepliesPage = 1, g.subRepliesLoading = !0, g.subRepliesExpanded = !0;
        try {
          const p = await wt.getSubReplies(M.value, x, g.subRepliesPage, 10), T = (p.replies || []).map((K) => ({
            id: String(K.rpid),
            userName: K.uname,
            message: K.message
          })), F = new Set((g.replies || []).map((K) => String(K.id))), G = T.filter((K) => !F.has(String(K.id)));
          g.replies = [...g.replies || [], ...G], g.subRepliesHasMore = p.hasMore;
        } catch {
          ee("子回复加载失败", !0);
        } finally {
          g.subRepliesLoading = !1;
        }
      }
    }
    function v(x) {
      const g = C.value.find((p) => String(p.id) === String(x));
      g && (g.subRepliesExpanded = !1);
    }
    function B(x) {
      r.value !== x && (r.value = x, _.value = 1, k(!1));
    }
    function ue() {
      H.value || !W.value || (_.value += 1, k(!0));
    }
    async function ge() {
      if (se.value = !se.value, se.value && !b.value.length && !ve.value) {
        ve.value = !0;
        try {
          const g = await (await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", { credentials: "include" })).json();
          g?.code === 0 && Array.isArray(g?.data?.packages) && (b.value = g.data.packages.filter((p) => Array.isArray(p.emote) && p.emote.length).map((p) => ({
            text: p.text || "B站表情",
            emote: p.emote.map((T) => ({
              text: T.text || "",
              url: String(T.url || "").replace(/^http:/, "https:")
            }))
          })));
        } catch {
        } finally {
          ve.value = !1;
        }
      }
    }
    function Se(x) {
      const g = Y.value;
      if (!g)
        Q.value += x;
      else {
        const p = g.selectionStart ?? g.value.length, T = g.selectionEnd ?? p;
        Q.value = Q.value.slice(0, p) + x + Q.value.slice(T), pt(() => {
          g.focus();
          const F = p + x.length;
          g.setSelectionRange(F, F);
        });
      }
      se.value = !1;
    }
    async function _e() {
      const x = Q.value.trim();
      if (!x) {
        ee("请输入评论内容", !0);
        return;
      }
      if (!M.value) {
        ee("未能识别视频 ID，无法发表评论", !0);
        return;
      }
      const g = window.getBiliJct;
      let p = "";
      if (typeof g == "function")
        p = await g();
      else
        try {
          p = (await window.chrome?.cookies?.get?.({ url: "https://api.bilibili.com", name: "bili_jct" }))?.value || "";
        } catch {
          p = "";
        }
      if (!p) {
        ee("未检测到 B站 登录态，请先登录 bilibili.com", !0);
        return;
      }
      E.value = !0;
      try {
        const T = new URLSearchParams({
          oid: String(M.value),
          type: "1",
          message: x,
          plat: "1",
          csrf: p,
          csrf_token: p
        }), G = await (await fetch("https://api.bilibili.com/x/v2/reply/add", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: T.toString()
        })).json();
        G?.code === 0 ? (Q.value = "", ee("✓ 评论发表成功！", !1), _.value = 1, k(!1)) : ee(`❌ 发送失败：${G?.message || G?.code}`, !0);
      } catch (T) {
        ee(`❌ 发送出错：${T?.message || "网络异常"}`, !0);
      } finally {
        E.value = !1;
      }
    }
    async function De(x) {
      if (!x?.bvid) return;
      if (typeof document < "u" && (document.querySelectorAll("video, audio").forEach((p) => {
        if (p !== w.value && !p.paused)
          try {
            p.pause();
          } catch {
          }
      }), document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((p) => {
        try {
          p.pause();
        } catch {
        }
      })), w.value && !w.value.paused)
        try {
          w.value.pause();
        } catch {
        }
      f.value = !0, P.value = !1, D.value = "";
      let g = x.aid;
      if (!g)
        try {
          const T = await (await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${x.bvid}`, { credentials: "include" })).json();
          T?.data?.aid && (g = T.data.aid);
        } catch {
        }
      M.value = g || "", _.value = 1, k(!1);
      try {
        const p = await wt.resolvePlayStream(x);
        if (p?.sources?.length) {
          w.value && (typeof document < "u" && document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((T) => {
            try {
              T.pause();
            } catch {
            }
          }), w.value.src = p.sources[0], w.value.play().catch(() => {
          }), Gt({ bvid: x.bvid, title: x.title, cover: x.cover }, w.value)), f.value = !1;
          return;
        }
      } catch (p) {
        console.warn("[BiliSubscriptionPlayer] 本地视频流解析失败，使用 iframe 备用:", p);
      }
      P.value = !0, D.value = `https://player.bilibili.com/player.html?bvid=${x.bvid}&autoplay=1&danmaku=0`, f.value = !1;
    }
    let Ie = null, Ge = null;
    function Fe(x) {
      const g = x.closest(".bili-sub-transcript-body") || x.closest(".bili-sub-article-wrap") || x.parentElement;
      if (!g) return;
      const p = g.getBoundingClientRect(), G = x.getBoundingClientRect().top - p.top + g.scrollTop - p.height * 0.36;
      g.scrollTo({
        top: Math.max(0, G),
        behavior: "smooth"
      });
    }
    function ke() {
      if (!w.value) return;
      const x = w.value.currentTime;
      if (document.querySelectorAll(".bili-sub-newspaper-section").forEach((T) => {
        const F = Number(T.getAttribute("data-from") || 0), G = Number(T.getAttribute("data-to") || 0), K = x >= F && (G <= 0 || x < G);
        T.classList.toggle("active", K);
      }), I.organizer.subscriptionScriptMode === "newspaper") {
        const T = document.querySelectorAll(".bili-sub-newspaper-cue");
        if (T.length > 0) {
          let F = null;
          if (T.forEach((G) => {
            const K = Number(G.getAttribute("data-from") || 0), le = Number(G.getAttribute("data-to") || 0);
            x >= K && (le <= 0 || x < le) ? (F || (F = G), G.classList.add("cue-reading-active")) : G.classList.remove("cue-reading-active");
          }), !F && x > 0)
            for (let G = T.length - 1; G >= 0; G--) {
              const K = T[G], le = Number(K.getAttribute("data-from") || 0);
              if (x >= le) {
                F = K, K.classList.add("cue-reading-active");
                break;
              }
            }
          F && F !== Ie && (Ie = F, Fe(F));
        }
      } else {
        const T = document.querySelectorAll(".bili-sub-srt-row");
        let F = !1, G = null;
        for (let K = T.length - 1; K >= 0; K--) {
          const le = T[K], ie = Number(le.getAttribute("data-from") || 0);
          !F && x >= ie ? (le.classList.add("active"), F = !0, G = le) : le.classList.remove("active");
        }
        G && G !== Ge && (Ge = G, Fe(G));
      }
    }
    function Ae() {
      ke();
    }
    function Re() {
      ke();
    }
    return ce(
      () => c.value?.bvid,
      () => {
        c.value && De(c.value);
      },
      { immediate: !0 }
    ), We(() => {
      ae = Ue.onAction((x, g) => {
        if (x === "subscription-seek") {
          const p = Number(g?.from);
          w.value && Number.isFinite(p) && (w.value.currentTime = Math.max(0, p - 0.1), w.value.play().catch(() => {
          }));
        }
      });
    }), Tt(() => {
      if (w.value) {
        Ut(w.value);
        try {
          w.value.pause(), w.value.src = "", w.value.load();
        } catch {
        }
      }
      ae && ae(), ne && clearTimeout(ne);
    }), (x, g) => (s(), o("aside", ji, [
      c.value ? (s(), o("div", Xi, [
        e("div", Ki, [
          e("div", {
            class: "bili-sub-vue-comment-handoff",
            hidden: "",
            style: { display: "none !important" }
          }, [
            g[3] || (g[3] = e("strong", null, "播放器与评论区已统一到 Vue 本地影院", -1)),
            e("button", {
              type: "button",
              onClick: re
            }, "打开播放器与评论区")
          ]),
          e("div", Qi, [
            e("video", {
              ref_key: "videoRef",
              ref: w,
              class: "bili-sub-native-video",
              controls: "",
              playsinline: "",
              poster: c.value.cover,
              hidden: P.value,
              onTimeupdate: ke,
              onSeeked: Ae,
              onPlay: Re
            }, null, 40, Ji),
            P.value ? (s(), o("iframe", {
              key: 0,
              class: "bili-sub-native-iframe",
              allowfullscreen: "true",
              allow: "autoplay; fullscreen",
              src: D.value
            }, null, 8, Zi)) : y("", !0),
            f.value ? (s(), o("div", es, [...g[4] || (g[4] = [
              e("i", null, null, -1),
              e("span", null, "正在解析登录高清视频流…", -1)
            ])])) : y("", !0)
          ]),
          e("div", {
            class: "bili-sub-scroll-stage",
            onScrollPassive: Ce
          }, [
            e("div", ts, [
              e("div", is, [
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: n(I).organizer.showFullDescInRightPanel ? "切回台词展示" : "在右侧大屏展开完整视频简介",
                  onClick: fe
                }, l(n(I).organizer.showFullDescInRightPanel ? "缩小简介" : "放大简介"), 9, ss)
              ]),
              e("h4", null, l(c.value.title), 1),
              e("div", os, [
                e("span", null, "▣ 播放: " + l(c.value.playCount), 1),
                e("span", null, "💬 弹幕: " + l(c.value.danmakuCount), 1),
                e("span", null, "⏱ " + l(c.value.duration), 1)
              ]),
              e("p", ns, [
                $e(et, {
                  text: c.value.description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ]),
            e("div", ls, [
              e("div", as, [
                e("div", rs, [
                  g[5] || (g[5] = e("span", null, "💬 评论", -1)),
                  e("span", us, l(U.value), 1)
                ]),
                e("div", ds, [
                  e("button", {
                    type: "button",
                    class: A(["bili-mini-sort-btn", { active: r.value === 1 }]),
                    onClick: g[0] || (g[0] = (p) => B(1))
                  }, "按热度", 2),
                  e("button", {
                    type: "button",
                    class: A(["bili-mini-sort-btn", { active: r.value === 0 }]),
                    onClick: g[1] || (g[1] = (p) => B(0))
                  }, "按时间", 2)
                ])
              ]),
              e("div", cs, [
                e("button", {
                  type: "button",
                  class: A(["bili-sub-emote-button", { on: se.value }]),
                  title: "选择 B站 表情",
                  onClick: ge
                }, "☺", 2),
                be(e("input", {
                  ref_key: "commentInputRef",
                  ref: Y,
                  "onUpdate:modelValue": g[2] || (g[2] = (p) => Q.value = p),
                  type: "text",
                  class: "bili-sub-comment-input",
                  placeholder: "发一条友善的评论吧…（Enter 发送）",
                  maxlength: "500",
                  onKeydown: Be(S(_e, ["prevent"]), ["enter"])
                }, null, 40, ps), [
                  [Te, Q.value]
                ]),
                e("button", {
                  type: "button",
                  class: "bili-sub-comment-send-btn",
                  disabled: E.value || !Q.value.trim(),
                  onClick: _e
                }, l(E.value ? "发送中…" : "发送"), 9, bs)
              ]),
              se.value ? (s(), o("div", vs, [
                ve.value ? (s(), o("div", fs, [...g[6] || (g[6] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取 B站 表情包…", -1)
                ])])) : (s(), o("div", gs, [
                  (s(!0), o(N, null, X(b.value, (p) => (s(), o("section", {
                    key: p.text,
                    class: "bili-sub-emote-group"
                  }, [
                    e("h5", null, l(p.text || "B站表情"), 1),
                    e("div", null, [
                      (s(!0), o(N, null, X(p.emote, (T) => (s(), o("button", {
                        key: T.text,
                        type: "button",
                        class: "bili-sub-emote-item",
                        title: T.text,
                        onClick: (F) => Se(T.text)
                      }, [
                        T.url ? (s(), o("img", {
                          key: 0,
                          src: T.url,
                          alt: T.text,
                          referrerpolicy: "no-referrer"
                        }, null, 8, hs)) : (s(), o("span", ys, l(T.text), 1))
                      ], 8, ms))), 128))
                    ])
                  ]))), 128))
                ]))
              ])) : y("", !0),
              q.value ? (s(), o("div", {
                key: 1,
                class: A(["bili-sub-comment-tip", { error: oe.value }])
              }, l(q.value), 3)) : y("", !0),
              e("div", _s, [
                J.value && !C.value.length ? (s(), o("p", ks, "正在加载评论…")) : z.value && !C.value.length ? (s(), o("p", ws, l(z.value), 1)) : y("", !0),
                (s(!0), o(N, null, X(C.value, (p) => (s(), o("div", {
                  key: p.id,
                  class: "bili-comment-item"
                }, [
                  e("img", {
                    class: "bili-comment-avatar",
                    src: p.avatar,
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer"
                  }, null, 8, $s),
                  e("div", Cs, [
                    e("div", xs, [
                      e("span", Ss, l(p.userName), 1),
                      p.level ? (s(), o("span", Ts, "LV" + l(p.level), 1)) : y("", !0),
                      e("span", Ps, l(p.timeStr), 1)
                    ]),
                    e("div", Ms, [
                      $e(et, {
                        text: p.message
                      }, null, 8, ["text"])
                    ]),
                    p.pictures?.length ? (s(), o("div", Ds, [
                      (s(!0), o(N, null, X(p.pictures, (T, F) => (s(), o("a", {
                        key: F,
                        class: "bili-comment-pic-link",
                        href: T,
                        onClick: S((G) => R(p.pictures, F), ["stop", "prevent"])
                      }, [
                        e("img", {
                          class: "bili-comment-pic",
                          src: T,
                          alt: "评论图片",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, Is)
                      ], 8, Es))), 128))
                    ])) : y("", !0),
                    e("div", Rs, [
                      p.likeCount ? (s(), o("span", Ls, "👍 " + l(p.likeCount), 1)) : y("", !0),
                      p.replyCount ? (s(), o("span", zs, "💬 " + l(p.replyCount), 1)) : y("", !0)
                    ]),
                    p.replies?.length ? (s(), o("div", Bs, [
                      (s(!0), o(N, null, X(p.replies, (T) => (s(), o("div", {
                        key: T.id,
                        class: "bili-comment-sub-item"
                      }, [
                        e("span", As, l(T.userName) + ":", 1),
                        $e(et, {
                          text: T.message
                        }, null, 8, ["text"])
                      ]))), 128)),
                      e("div", Ns, [
                        !p.subRepliesExpanded && (p.replyCount || 0) > p.replies.length ? (s(), o(N, { key: 0 }, [
                          e("span", null, "共 " + l(p.replyCount) + " 条回复，", 1),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: p.subRepliesLoading,
                            onClick: S((T) => u(p.id), ["stop"])
                          }, l(p.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, Vs)
                        ], 64)) : p.subRepliesExpanded ? (s(), o(N, { key: 1 }, [
                          p.subRepliesHasMore ? (s(), o("button", {
                            key: 0,
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: p.subRepliesLoading,
                            onClick: S((T) => u(p.id), ["stop"])
                          }, l(p.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, Us)) : y("", !0),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-collapse-btn",
                            onClick: S((T) => v(p.id), ["stop"])
                          }, " 收起 ▴ ", 8, Gs)
                        ], 64)) : y("", !0)
                      ])
                    ])) : y("", !0)
                  ])
                ]))), 128))
              ]),
              e("div", Fs, [
                H.value ? (s(), o("p", Os, "正在加载更多评论…")) : !W.value && C.value.length ? (s(), o("p", qs, "已显示全部评论")) : y("", !0)
              ])
            ])
          ], 32)
        ])
      ])) : (s(), o("p", Hs, "暂无可播放的订阅视频。"))
    ]));
  }
}), Ws = /* @__PURE__ */ Ee(Ys, [["__scopeId", "data-v-ee6b4dc4"]]), js = ["disabled"], Xs = ["disabled"], Ks = { key: 0 }, Qs = ["disabled"], Js = ["disabled"], Zs = ["disabled"], eo = ["disabled"], to = { class: "bili-sub-add-shell" }, io = ["disabled"], so = { class: "bili-sub-add-toolbar" }, oo = { class: "bili-sub-add-groups" }, no = ["onClick"], lo = { class: "bili-sub-add-list" }, ao = {
  key: 0,
  class: "fo-bili-loading"
}, ro = {
  key: 1,
  class: "fo-bili-empty"
}, uo = {
  key: 2,
  class: "fo-bili-empty"
}, co = ["disabled", "onClick"], po = ["src"], bo = {
  key: 1,
  class: "bili-sub-add-avatar"
}, vo = {
  class: "fo-custom-confirm-modal",
  role: "dialog",
  "aria-modal": "true"
}, fo = { class: "fo-custom-confirm-head" }, go = { class: "fo-custom-confirm-body" }, mo = { class: "fo-custom-confirm-actions" }, ho = ["disabled"], yo = ["disabled"], _o = /* @__PURE__ */ Me({
  __name: "BiliOrganizerDialogs",
  setup(me) {
    const c = te(() => dt.create), w = te(() => dt.confirm), f = te(() => dt.channelPicker), P = te(() => c.value.kind === "bili"), D = te(() => {
      const r = f.value, _ = r.query.trim().toLowerCase(), C = r.groups.find((J) => J.id === r.activeGroupId), U = C ? new Set(C.mids) : null;
      return r.items.filter((J) => (!U || U.has(J.mid)) && (!_ || J.name.toLowerCase().includes(_) || J.mid.includes(_)));
    });
    function M() {
      const r = c.value.name.trim();
      if (!r) {
        he.updateCreate({ status: "请输入名称", error: !0 });
        return;
      }
      he.submitCreate({ name: r, privacy: c.value.privacy });
    }
    return (r, _) => (s(), o(N, null, [
      c.value.open ? (s(), o("dialog", {
        key: 0,
        class: "fo-create-dialog",
        open: "",
        onClick: _[5] || (_[5] = S((C) => n(he).closeCreate(), ["self"])),
        onCancel: _[6] || (_[6] = S((C) => n(he).closeCreate(), ["prevent"]))
      }, [
        e("form", {
          onSubmit: S(M, ["prevent"])
        }, [
          e("header", null, [
            e("div", null, [
              _[14] || (_[14] = e("i", { class: "fo-folder-icon" }, null, -1)),
              e("span", null, [
                e("b", null, l(P.value ? "新建 B站收藏夹" : "新建插件分组"), 1),
                e("small", null, l(P.value ? "会同步创建到你的 B站账号" : "只整理左侧收藏夹，不修改 B站数据"), 1)
              ])
            ]),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: c.value.submitting,
              onClick: _[0] || (_[0] = (C) => n(he).closeCreate())
            }, "×", 8, js)
          ]),
          e("label", null, [
            e("span", null, l(P.value ? "收藏夹名称" : "分组名称"), 1),
            be(e("input", {
              "onUpdate:modelValue": _[1] || (_[1] = (C) => c.value.name = C),
              maxlength: "48",
              autocomplete: "off",
              placeholder: "输入名称",
              required: "",
              disabled: c.value.submitting,
              autofocus: ""
            }, null, 8, Xs), [
              [Te, c.value.name]
            ])
          ]),
          P.value ? (s(), o("fieldset", Ks, [
            _[17] || (_[17] = e("legend", null, "可见范围", -1)),
            e("label", null, [
              be(e("input", {
                "onUpdate:modelValue": _[2] || (_[2] = (C) => c.value.privacy = C),
                type: "radio",
                value: 0,
                disabled: c.value.submitting
              }, null, 8, Qs), [
                [
                  kt,
                  c.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              _[15] || (_[15] = e("span", null, [
                e("b", null, "公开"),
                e("small", null, "其他人可以看到")
              ], -1))
            ]),
            e("label", null, [
              be(e("input", {
                "onUpdate:modelValue": _[3] || (_[3] = (C) => c.value.privacy = C),
                type: "radio",
                value: 1,
                disabled: c.value.submitting
              }, null, 8, Js), [
                [
                  kt,
                  c.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              _[16] || (_[16] = e("span", null, [
                e("b", null, "私密"),
                e("small", null, "仅自己可见")
              ], -1))
            ])
          ])) : y("", !0),
          e("p", {
            class: A(["fo-create-status", { error: c.value.error }]),
            role: "status"
          }, l(c.value.status), 3),
          e("footer", null, [
            e("button", {
              type: "button",
              disabled: c.value.submitting,
              onClick: _[4] || (_[4] = (C) => n(he).closeCreate())
            }, "取消", 8, Zs),
            e("button", {
              class: "primary",
              type: "submit",
              disabled: c.value.submitting
            }, l(c.value.submitting ? "创建中…" : P.value ? "创建收藏夹" : "创建分组"), 9, eo)
          ])
        ], 32)
      ], 32)) : y("", !0),
      f.value.open ? (s(), o("dialog", {
        key: 1,
        class: "bili-sub-add-dialog",
        open: "",
        onCancel: _[10] || (_[10] = S((C) => n(he).closeChannelPicker(), ["prevent"]))
      }, [
        e("div", to, [
          e("header", null, [
            _[18] || (_[18] = e("div", null, [
              e("b", null, "从我的关注中添加 UP 主"),
              e("small", null, "沿用“正在关注”的本地分组，只能添加已关注的 UP 主")
            ], -1)),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: !!f.value.submittingMid,
              onClick: _[7] || (_[7] = (C) => n(he).closeChannelPicker())
            }, "×", 8, io)
          ]),
          e("div", so, [
            e("div", oo, [
              e("button", {
                type: "button",
                class: A(["bili-sub-add-group", { on: f.value.activeGroupId === "__all__" }]),
                onClick: _[8] || (_[8] = (C) => n(he).updateChannelPicker({ activeGroupId: "__all__" }))
              }, "全部关注", 2),
              (s(!0), o(N, null, X(f.value.groups, (C) => (s(), o("button", {
                key: C.id,
                type: "button",
                class: A(["bili-sub-add-group", { on: f.value.activeGroupId === C.id }]),
                onClick: (U) => n(he).updateChannelPicker({ activeGroupId: C.id })
              }, l(C.name), 11, no))), 128))
            ]),
            be(e("input", {
              "onUpdate:modelValue": _[9] || (_[9] = (C) => f.value.query = C),
              type: "search",
              placeholder: "搜索关注的 UP 主"
            }, null, 512), [
              [Te, f.value.query]
            ])
          ]),
          e("div", lo, [
            f.value.loading ? (s(), o("div", ao, [..._[19] || (_[19] = [
              e("i", null, null, -1),
              e("span", null, "正在读取关注分组…", -1)
            ])])) : f.value.error ? (s(), o("p", ro, l(f.value.error), 1)) : D.value.length ? (s(!0), o(N, { key: 3 }, X(D.value, (C) => (s(), o("button", {
              key: C.mid,
              type: "button",
              class: "bili-sub-add-up",
              disabled: C.added || !!f.value.submittingMid,
              onClick: (U) => n(he).selectChannel(C.mid)
            }, [
              C.face ? (s(), o("img", {
                key: 0,
                src: C.face,
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, po)) : (s(), o("span", bo, "UP")),
              e("span", null, [
                e("b", null, l(C.name), 1),
                e("small", null, "UID " + l(C.mid), 1)
              ]),
              e("i", null, l(C.added ? "已添加" : f.value.submittingMid === C.mid ? "添加中…" : "＋ 添加"), 1)
            ], 8, co))), 128)) : (s(), o("p", uo, "该分组中没有匹配的已关注 UP 主。"))
          ])
        ])
      ], 32)) : y("", !0),
      w.value.open ? (s(), o("div", {
        key: 2,
        class: "fo-custom-confirm-overlay",
        onClick: _[13] || (_[13] = S((C) => n(he).closeConfirm(), ["self"]))
      }, [
        e("div", vo, [
          e("div", fo, [
            e("h4", null, l(w.value.title), 1)
          ]),
          e("div", go, [
            e("p", null, l(w.value.message), 1)
          ]),
          e("div", mo, [
            e("button", {
              type: "button",
              class: "fo-confirm-btn cancel",
              disabled: w.value.submitting,
              onClick: _[11] || (_[11] = (C) => n(he).closeConfirm())
            }, l(w.value.cancelText), 9, ho),
            e("button", {
              type: "button",
              class: A(["fo-confirm-btn confirm", { danger: w.value.danger }]),
              disabled: w.value.submitting,
              onClick: _[12] || (_[12] = (C) => n(he).submitConfirm())
            }, l(w.value.submitting ? "处理中…" : w.value.confirmText), 11, yo)
          ])
        ])
      ])) : y("", !0)
    ], 64));
  }
}), ko = ["aria-busy"], wo = { class: "field full-width" }, $o = { class: "cache-directory-name" }, Co = { class: "cache-directory-actions" }, xo = ["disabled"], So = ["disabled"], To = /* @__PURE__ */ Me({
  __name: "BiliSettingsPanel",
  props: {
    active: { type: Boolean }
  },
  setup(me) {
    const c = me, w = $(!1), f = $(!1), P = $(""), D = $(!1), M = $(null), r = $("尚未选择缓存目录");
    let _ = !0, C = 0;
    async function U() {
      if (!c.active || w.value) return;
      const H = ++C;
      f.value = !0;
      try {
        const z = await Ft();
        if (!_ || H !== C) return;
        M.value = z, r.value = z?.name || "尚未选择缓存目录";
      } catch {
        _ && H === C && (M.value = null, r.value = "缓存目录读取失败，请重试");
      } finally {
        _ && H === C && (f.value = !1);
      }
    }
    async function J() {
      if (w.value || !c.active) return;
      const H = window.showDirectoryPicker;
      if (typeof H != "function") {
        P.value = "当前浏览器不支持目录选择，请使用支持此功能的 Edge 或 Chrome。", D.value = !0;
        return;
      }
      ++C, f.value = !1, w.value = !0, P.value = "";
      try {
        const z = await H.call(window, {
          id: "logicweaver-bili-cache",
          mode: "readwrite",
          startIn: M.value || "videos"
        });
        if (await Ot(z), !_) return;
        M.value = z, r.value = z.name, D.value = !1, P.value = "目录已保存，新缓存将存入这里；已有视频不会移动或删除。";
      } catch (z) {
        _ && z?.name !== "AbortError" && (D.value = !0, P.value = "目录选择或保存未确认，请重读目录核对后再试。");
      } finally {
        _ && (w.value = !1);
      }
    }
    return ce(() => c.active, (H) => {
      H ? U() : ++C;
    }, { immediate: !0 }), We(() => window.addEventListener("focus", U)), Pt(() => {
      _ = !1, ++C, window.removeEventListener("focus", U);
    }), (H, z) => (s(), o("div", {
      class: "settings-subgroup bili-cache-settings",
      "aria-busy": w.value || f.value
    }, [
      e("div", wo, [
        e("p", $o, l(f.value ? "正在读取缓存目录…" : r.value), 1),
        e("div", Co, [
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !c.active || w.value || f.value,
            onClick: J
          }, l(w.value ? "正在保存…" : "选择或重新授权目录"), 9, xo),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !c.active || w.value || f.value,
            onClick: U
          }, "重读目录", 8, So)
        ]),
        z[0] || (z[0] = e("p", { class: "hint" }, "仅更改之后的缓存位置；新缓存保留原目录关联，旧版记录需选择其实际所在目录后播放。不会自动扫描或搬移已有文件。", -1)),
        P.value ? (s(), o("p", {
          key: 0,
          class: A(["hint cache-directory-message", { "is-error": D.value }]),
          role: "status"
        }, l(P.value), 3)) : y("", !0)
      ])
    ], 8, ko));
  }
}), Po = /* @__PURE__ */ Ee(To, [["__scopeId", "data-v-ccf6929a"]]), Mo = {
  class: "bili-cache-settings-view",
  "aria-labelledby": "bili-cache-settings-title"
}, Do = { class: "cache-settings-header" }, Eo = { class: "cache-settings-card" }, Io = /* @__PURE__ */ Me({
  __name: "BiliCacheSettingsView",
  props: {
    active: { type: Boolean }
  },
  emits: ["back"],
  setup(me, { emit: c }) {
    const w = c;
    return (f, P) => (s(), o("section", Mo, [
      e("header", Do, [
        P[1] || (P[1] = e("div", null, [
          e("h3", { id: "bili-cache-settings-title" }, "缓存设置"),
          e("p", null, "管理 B站视频的本地缓存目录")
        ], -1)),
        e("button", {
          type: "button",
          class: "cache-settings-back",
          onClick: P[0] || (P[0] = (D) => w("back"))
        }, "返回缓存视频")
      ]),
      e("div", Eo, [
        P[2] || (P[2] = e("h4", null, "视频缓存目录", -1)),
        P[3] || (P[3] = e("p", { class: "cache-settings-note" }, "选择后立即保存，无需到全局设置中操作。浏览器只提供文件夹名称，不显示完整磁盘路径。", -1)),
        $e(Po, { active: me.active }, null, 8, ["active"])
      ])
    ]));
  }
}), Ro = /* @__PURE__ */ Ee(Io, [["__scopeId", "data-v-43d869dd"]]), Lo = { class: "fo-upg-shell" }, zo = { class: "fo-upg-body" }, Bo = { class: "fo-upg-sidebar" }, Ao = { class: "fo-upg-sidebar-head" }, No = { class: "fo-upg-group-items" }, Vo = ["onDragstart", "onDrop", "onClick"], Uo = ["onKeydown"], Go = {
  key: 0,
  class: "fo-upg-tree-branch"
}, Fo = {
  key: 1,
  class: "fo-folder-icon"
}, Oo = { class: "fo-upg-group-name" }, qo = { class: "fo-upg-vue-group-actions" }, Ho = ["onClick"], Yo = ["onClick"], Wo = ["onClick"], jo = ["placeholder"], Xo = {
  key: 1,
  class: "muted small"
}, Ko = { class: "fo-upg-main" }, Qo = { class: "fo-upg-main-head" }, Jo = { class: "fo-upg-main-title" }, Zo = { key: 0 }, en = { class: "fo-upg-head-actions" }, tn = { class: "fo-upg-filter-tabs" }, sn = { class: "fo-upg-batch-wrap" }, on = { class: "fo-upg-batch-count" }, nn = ["disabled"], ln = ["disabled"], an = { class: "fo-upg-toolbar" }, rn = { class: "fo-upg-search" }, un = ["disabled"], dn = {
  key: 0,
  class: "fo-bili-loading"
}, cn = {
  key: 1,
  class: "fo-bili-empty"
}, pn = {
  key: 2,
  class: "fo-bili-empty"
}, bn = {
  key: 3,
  class: "fo-bili-empty"
}, vn = ["title", "onContextmenu", "onClick"], fn = ["src"], gn = { class: "fo-upg-info" }, mn = { class: "fo-upg-name" }, hn = { class: "fo-upg-sign" }, yn = ["disabled", "onClick"], _n = {
  key: 1,
  class: "fo-upg-move-wrap"
}, kn = ["disabled"], wn = { class: "fo-upg-move-dropdown" }, $n = ["disabled", "onClick"], Cn = { key: 0 }, xn = {
  key: 0,
  class: "muted small",
  style: { padding: "6px 10px" }
}, Sn = ["disabled", "onClick"], Tn = { class: "fo-upg-pagination" }, Pn = { class: "fo-upg-page-info" }, Mn = {
  key: 0,
  class: "fo-upg-page-btns"
}, Dn = ["disabled"], En = ["disabled"], In = { class: "fo-upg-page-cur" }, Rn = ["disabled"], Ln = ["disabled"], zn = /* @__PURE__ */ Me({
  __name: "BiliUpGroupManager",
  setup(me) {
    const c = $(void 0), w = $(""), f = $(""), P = $(""), D = $(""), M = $(!1), r = $(/* @__PURE__ */ new Set()), _ = $(null);
    function C(k) {
      if (k.button !== 0 || k.target.closest("button,input")) return;
      const u = _.value;
      if (!u) return;
      const v = u.getBoundingClientRect(), B = v.left, ue = v.top, ge = k.clientX, Se = k.clientY;
      u.style.position = "fixed", u.style.left = `${B}px`, u.style.top = `${ue}px`, u.style.right = "auto", u.style.bottom = "auto", u.style.margin = "0", u.style.transform = "none";
      const _e = (Ie) => {
        const Ge = Ie.clientX - ge, Fe = Ie.clientY - Se, ke = Math.max(8, Math.min(window.innerWidth - 120, B + Ge)), Ae = Math.max(8, Math.min(window.innerHeight - 80, ue + Fe));
        u.style.left = `${ke}px`, u.style.top = `${Ae}px`;
      }, De = () => {
        window.removeEventListener("pointermove", _e), window.removeEventListener("pointerup", De);
      };
      window.addEventListener("pointermove", _e), window.addEventListener("pointerup", De);
    }
    const U = te(() => h.groups.find((k) => k.id === h.activeGroupId) || null), J = te(() => {
      const k = h.query.trim().toLowerCase(), u = h.activeGroupId;
      return h.followings.filter((v) => {
        if (k && !v.name.toLowerCase().includes(k) && !v.sign.toLowerCase().includes(k) && !v.mid.includes(k)) return !1;
        const B = v.groupIds.includes(u);
        return h.filter === "ingroup" ? B : h.onlyUngrouped ? !v.groupIds || v.groupIds.length === 0 : !0;
      });
    }), H = te(() => Math.max(1, Math.ceil(J.value.length / h.pageSize))), z = te(() => {
      const u = (Math.min(h.page, H.value) - 1) * h.pageSize;
      return J.value.slice(u, u + h.pageSize);
    }), W = te(() => h.followings.filter((k) => k.groupIds.length === 0).length), Q = $(null), Y = /* @__PURE__ */ new Map();
    function E(k) {
      const u = Math.max(1, Math.min(H.value, k));
      h.page = u, Q.value && (Q.value.scrollTop = 0);
    }
    ce(() => [h.query, h.filter, h.onlyUngrouped], () => {
      h.page = 1, Q.value && (Q.value.scrollTop = 0);
    }), ce(() => h.activeGroupId, (k, u) => {
      if (u && Q.value) {
        const ue = `${u}_${h.filter}_${h.onlyUngrouped}`;
        Y.set(ue, {
          page: h.page,
          scrollTop: Q.value.scrollTop
        });
      }
      if (h.filter === "all")
        return;
      const v = `${k}_${h.filter}_${h.onlyUngrouped}`, B = Y.get(v);
      B ? (h.page = Math.min(B.page, H.value), pt(() => {
        Q.value && (Q.value.scrollTop = B.scrollTop);
      })) : (h.page = 1, pt(() => {
        Q.value && (Q.value.scrollTop = 0);
      }));
    }), ce(H, (k) => {
      h.page > k && (h.page = k);
    }), ce(M, (k) => {
      k || r.value.clear();
    });
    function q(k) {
      c.value = k, w.value = "";
    }
    function oe() {
      c.value = void 0, w.value = "";
    }
    function se() {
      const k = w.value.trim();
      k && (we.dispatch("create-group", { name: k, parentId: c.value || "" }), oe());
    }
    function ve(k) {
      f.value = k.id, P.value = k.name;
    }
    function b() {
      const k = P.value.trim();
      f.value && k && we.dispatch("rename-group", { id: f.value, name: k }), f.value = "", P.value = "";
    }
    function ne(k, u) {
      D.value = u, k.dataTransfer?.setData("application/x-logicweaver-up-group", u), k.dataTransfer && (k.dataTransfer.effectAllowed = "move");
    }
    function ae(k, u) {
      const v = k.dataTransfer?.getData("application/x-logicweaver-up-group") || D.value;
      if (D.value = "", !v || v === u) return;
      const B = k.currentTarget?.getBoundingClientRect(), ue = B ? k.clientY - B.top : 0, ge = B ? ue < B.height * 0.25 ? "before" : ue > B.height * 0.75 ? "after" : "into" : "into";
      we.dispatch("move-group", { sourceId: v, targetId: u, mode: ge });
    }
    function ee(k) {
      const u = k.dataTransfer?.getData("application/x-logicweaver-up-group") || D.value;
      D.value = "", u && we.dispatch("move-group", { sourceId: u, targetId: "", mode: "root" });
    }
    function re(k, u) {
      !u || h.busyMid || we.dispatch("toggle-member", { groupId: u, mid: k });
    }
    function fe(k) {
      !h.activeGroupId || h.busyMid || we.dispatch("toggle-member", { groupId: h.activeGroupId, mid: k });
    }
    function Ce(k, u) {
      we.dispatch("preview-up", { mid: u, clientX: k.clientX, clientY: k.clientY });
    }
    function R(k) {
      const u = r.value;
      u.has(k) ? u.delete(k) : u.add(k);
    }
    function m() {
      if (!h.activeGroupId || h.busyMid) return;
      const k = Array.from(r.value);
      if (!k.length) return;
      const u = k.filter((v) => {
        const B = h.followings.find((ue) => ue.mid === v);
        return B && !B.groupIds.includes(h.activeGroupId);
      });
      if (u.length) {
        for (const v of u)
          we.dispatch("toggle-member", { groupId: h.activeGroupId, mid: v });
        r.value.clear();
      }
    }
    function O() {
      if (!h.activeGroupId || h.busyMid) return;
      const k = Array.from(r.value);
      if (!k.length) return;
      const u = k.filter((v) => {
        const B = h.followings.find((ue) => ue.mid === v);
        return B && B.groupIds.includes(h.activeGroupId);
      });
      if (u.length) {
        for (const v of u)
          we.dispatch("toggle-member", { groupId: h.activeGroupId, mid: v });
        r.value.clear();
      }
    }
    function Z() {
      for (const k of z.value) r.value.add(k.mid);
    }
    return (k, u) => n(h).open ? (s(), o("dialog", {
      key: 0,
      ref_key: "dialogEl",
      ref: _,
      class: "fo-up-group-dialog",
      open: "",
      onCancel: u[20] || (u[20] = S((v) => n(we).close(), ["prevent"]))
    }, [
      e("div", Lo, [
        e("header", {
          class: "fo-upg-head",
          onPointerdown: C
        }, [
          u[21] || (u[21] = e("h3", null, [
            e("span", null, "👥"),
            ye(" 关注分组与 UP 主管理")
          ], -1)),
          e("button", {
            type: "button",
            class: "fo-upg-close-btn",
            "aria-label": "关闭",
            title: "关闭管理面板",
            onClick: u[0] || (u[0] = (v) => n(we).close())
          }, "✕")
        ], 32),
        e("div", zo, [
          e("aside", Bo, [
            e("div", Ao, [
              u[22] || (u[22] = e("span", null, "我的分组", -1)),
              e("button", {
                type: "button",
                onClick: u[1] || (u[1] = (v) => q(null))
              }, "＋ 新建")
            ]),
            e("div", No, [
              e("div", {
                class: "fo-upg-root-dropzone",
                onDragover: u[2] || (u[2] = S(() => {
                }, ["prevent"])),
                onDrop: S(ee, ["prevent"])
              }, "⇣ 拖至此处变为顶级分组", 32),
              c.value === null ? (s(), o("form", {
                key: 0,
                class: "fo-upg-create-box",
                onSubmit: S(se, ["prevent"])
              }, [
                be(e("input", {
                  "onUpdate:modelValue": u[3] || (u[3] = (v) => w.value = v),
                  maxlength: "20",
                  placeholder: "输入分组名称…",
                  autofocus: ""
                }, null, 512), [
                  [Te, w.value]
                ]),
                e("div", { class: "fo-upg-create-btns" }, [
                  e("button", {
                    type: "button",
                    class: "cancel",
                    onClick: oe
                  }, "取消"),
                  u[23] || (u[23] = e("button", {
                    class: "confirm",
                    type: "submit"
                  }, "确定", -1))
                ])
              ], 32)) : y("", !0),
              (s(!0), o(N, null, X(n(h).groups, (v) => (s(), o(N, {
                key: v.id
              }, [
                e("div", {
                  class: A(["fo-upg-group-item", { on: v.id === n(h).activeGroupId, "is-subgroup": v.depth > 0 }]),
                  style: Pe({ paddingLeft: `${8 + v.depth * 18}px` }),
                  draggable: "true",
                  onDragstart: (B) => ne(B, v.id),
                  onDragover: u[7] || (u[7] = S(() => {
                  }, ["prevent"])),
                  onDrop: S((B) => ae(B, v.id), ["prevent"]),
                  onClick: (B) => n(h).activeGroupId = v.id
                }, [
                  f.value === v.id ? (s(), o(N, { key: 0 }, [
                    be(e("input", {
                      "onUpdate:modelValue": u[4] || (u[4] = (B) => P.value = B),
                      class: "fo-upg-rename-input",
                      maxlength: "20",
                      onClick: u[5] || (u[5] = S(() => {
                      }, ["stop"])),
                      onKeydown: Be(S(b, ["prevent"]), ["enter"])
                    }, null, 40, Uo), [
                      [Te, P.value]
                    ]),
                    e("button", {
                      type: "button",
                      onClick: S(b, ["stop"])
                    }, "✓"),
                    e("button", {
                      type: "button",
                      onClick: u[6] || (u[6] = S((B) => f.value = "", ["stop"]))
                    }, "✕")
                  ], 64)) : (s(), o(N, { key: 1 }, [
                    v.depth ? (s(), o("span", Go, "↳")) : (s(), o("i", Fo)),
                    e("span", Oo, l(v.name), 1),
                    e("small", null, l(v.upMids.length), 1),
                    e("span", qo, [
                      e("button", {
                        type: "button",
                        title: "添加子分组",
                        onClick: S((B) => q(v.id), ["stop"])
                      }, "＋", 8, Ho),
                      e("button", {
                        type: "button",
                        title: "重命名",
                        onClick: S((B) => ve(v), ["stop"])
                      }, "✎", 8, Yo),
                      e("button", {
                        type: "button",
                        class: "danger",
                        title: "删除",
                        onClick: S((B) => n(we).dispatch("delete-group", v.id), ["stop"])
                      }, "×", 8, Wo)
                    ])
                  ], 64))
                ], 46, Vo),
                c.value === v.id ? (s(), o("form", {
                  key: 0,
                  class: "fo-upg-create-box",
                  style: Pe({ marginLeft: `${18 + v.depth * 18}px` }),
                  onSubmit: S(se, ["prevent"])
                }, [
                  be(e("input", {
                    "onUpdate:modelValue": u[8] || (u[8] = (B) => w.value = B),
                    maxlength: "20",
                    placeholder: `输入「${v.name}」的子分组名称…`,
                    autofocus: ""
                  }, null, 8, jo), [
                    [Te, w.value]
                  ]),
                  e("div", { class: "fo-upg-create-btns" }, [
                    e("button", {
                      type: "button",
                      class: "cancel",
                      onClick: oe
                    }, "取消"),
                    u[24] || (u[24] = e("button", {
                      class: "confirm",
                      type: "submit"
                    }, "确定", -1))
                  ])
                ], 36)) : y("", !0)
              ], 64))), 128)),
              !n(h).groups.length && !n(h).loading ? (s(), o("p", Xo, '暂无分组，请点击"＋ 新建"。')) : y("", !0)
            ])
          ]),
          e("section", Ko, [
            e("div", Qo, [
              e("div", Jo, [
                e("h4", null, l(U.value ? `分组：「${U.value.name}」` : "请先选择或新建分组"), 1),
                U.value ? (s(), o("span", Zo, "（本组 " + l(U.value.upMids.length) + " 位 · 共 " + l(n(h).followings.length) + " 位关注 · 未分组 " + l(W.value) + " 位）", 1)) : y("", !0)
              ]),
              e("div", en, [
                e("div", tn, [
                  e("button", {
                    type: "button",
                    class: A(["fo-upg-filter-tab", { on: n(h).filter === "all" }]),
                    onClick: u[9] || (u[9] = (v) => n(h).filter = "all")
                  }, "全部关注", 2),
                  e("button", {
                    type: "button",
                    class: A(["fo-upg-filter-tab", { on: n(h).filter === "ingroup" }]),
                    onClick: u[10] || (u[10] = (v) => n(h).filter = "ingroup")
                  }, "本组已加", 2)
                ]),
                e("div", sn, [
                  e("button", {
                    type: "button",
                    class: A(["fo-upg-batch-toggle", { on: M.value }]),
                    onClick: u[11] || (u[11] = (v) => M.value = !M.value)
                  }, l(M.value ? "退出批量" : "批量操作"), 3),
                  M.value && r.value.size > 0 ? (s(), o(N, { key: 0 }, [
                    e("span", on, "已选 " + l(r.value.size), 1),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action add",
                      disabled: !U.value,
                      onClick: m
                    }, "＋ 加入本组", 8, nn),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action remove",
                      disabled: !U.value,
                      onClick: O
                    }, "− 移出本组", 8, ln),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: Z
                    }, "全选当页"),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: u[12] || (u[12] = (v) => r.value.clear())
                    }, "清除")
                  ], 64)) : y("", !0)
                ]),
                n(h).filter === "all" ? (s(), o("label", {
                  key: 0,
                  class: A(["fo-upg-switch", { on: n(h).onlyUngrouped }])
                }, [
                  be(e("input", {
                    "onUpdate:modelValue": u[13] || (u[13] = (v) => n(h).onlyUngrouped = v),
                    type: "checkbox"
                  }, null, 512), [
                    [Bt, n(h).onlyUngrouped]
                  ]),
                  u[25] || (u[25] = e("span", { class: "fo-upg-switch-track" }, [
                    e("span", { class: "fo-upg-switch-thumb" })
                  ], -1)),
                  u[26] || (u[26] = e("span", { class: "fo-upg-switch-text" }, "仅未分组 UP", -1))
                ], 2)) : y("", !0)
              ])
            ]),
            e("div", an, [
              e("div", rn, [
                u[27] || (u[27] = e("span", null, "🔍", -1)),
                be(e("input", {
                  "onUpdate:modelValue": u[14] || (u[14] = (v) => n(h).query = v),
                  type: "search",
                  placeholder: "搜索关注的 UP 主…"
                }, null, 512), [
                  [Te, n(h).query]
                ])
              ]),
              e("button", {
                type: "button",
                class: "fo-upg-refresh-btn",
                disabled: n(h).refreshing,
                onClick: u[15] || (u[15] = (v) => n(we).dispatch("refresh"))
              }, l(n(h).refreshing ? "刷新中…" : "↻ 刷新关注"), 9, un)
            ]),
            e("div", {
              ref_key: "listRef",
              ref: Q,
              class: "fo-upg-list"
            }, [
              n(h).loading ? (s(), o("div", dn, [...u[28] || (u[28] = [
                e("i", null, null, -1),
                e("span", null, "正在加载关注的 UP 主列表…", -1)
              ])])) : n(h).error ? (s(), o("p", cn, l(n(h).error), 1)) : U.value ? z.value.length ? (s(!0), o(N, { key: 4 }, X(z.value, (v) => (s(), o("article", {
                key: v.mid,
                class: A(["fo-upg-card", { selected: M.value && r.value.has(v.mid) }]),
                title: `右键查看「${v.name}」近期投稿`,
                onContextmenu: S((B) => Ce(B, v.mid), ["prevent"]),
                onClick: (B) => M.value ? R(v.mid) : void 0
              }, [
                e("img", {
                  src: v.face,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, fn),
                e("div", gn, [
                  e("div", mn, l(v.name), 1),
                  e("div", hn, l(v.sign || "暂无签名"), 1)
                ]),
                M.value ? (s(), o("div", {
                  key: 1,
                  class: A(["fo-upg-batch-check", { checked: r.value.has(v.mid) }])
                }, l(r.value.has(v.mid) ? "✓" : ""), 3)) : (s(), o(N, { key: 0 }, [
                  v.groupIds.includes(n(h).activeGroupId) ? (s(), o("button", {
                    key: 0,
                    type: "button",
                    class: "fo-upg-toggle-btn in-group",
                    disabled: n(h).busyMid === v.mid,
                    onClick: S((B) => fe(v.mid), ["stop"])
                  }, l(n(h).busyMid === v.mid ? "处理中…" : `移出 ${U.value?.name || ""}`), 9, yn)) : v.groupIds.length > 0 ? (s(), o("div", _n, [
                    e("button", {
                      type: "button",
                      class: "fo-upg-toggle-btn belongs-other fo-upg-move-trigger",
                      disabled: n(h).busyMid === v.mid
                    }, l(n(h).busyMid === v.mid ? "处理中…" : `📁 ${v.groupName || "已分组"}`), 9, kn),
                    e("div", wn, [
                      u[30] || (u[30] = e("div", { class: "fo-upg-move-title" }, "移动到分组", -1)),
                      (s(!0), o(N, null, X(n(h).groups, (B) => (s(), o("button", {
                        key: B.id,
                        type: "button",
                        class: A(["fo-upg-move-item", { active: v.groupIds.includes(B.id) }]),
                        disabled: n(h).busyMid === v.mid,
                        onClick: S((ue) => re(v.mid, B.id), ["stop"])
                      }, [
                        u[29] || (u[29] = e("i", { class: "fo-folder-icon small" }, null, -1)),
                        e("span", null, l(B.name), 1),
                        v.groupIds.includes(B.id) ? (s(), o("small", Cn, "✓ 已加入")) : y("", !0)
                      ], 10, $n))), 128)),
                      n(h).groups.length ? y("", !0) : (s(), o("p", xn, "暂无分组"))
                    ])
                  ])) : n(h).activeGroupId ? (s(), o("button", {
                    key: 2,
                    type: "button",
                    class: "fo-upg-toggle-btn",
                    disabled: n(h).busyMid === v.mid,
                    onClick: S((B) => fe(v.mid), ["stop"])
                  }, l(n(h).busyMid === v.mid ? "处理中…" : "＋ 加入"), 9, Sn)) : y("", !0)
                ], 64))
              ], 42, vn))), 128)) : (s(), o("p", bn, "没有符合条件的 UP 主。")) : (s(), o("p", pn, "请先新建或选择一个分组。"))
            ], 512),
            e("div", Tn, [
              e("div", Pn, "共 " + l(J.value.length) + " 位 UP 主 · 每页 " + l(n(h).pageSize) + " 位", 1),
              H.value > 1 ? (s(), o("div", Mn, [
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(h).page <= 1,
                  onClick: u[16] || (u[16] = (v) => E(1))
                }, "« 首页", 8, Dn),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(h).page <= 1,
                  onClick: u[17] || (u[17] = (v) => E(n(h).page - 1))
                }, "‹ 上一页", 8, En),
                e("span", In, l(n(h).page) + " / " + l(H.value), 1),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(h).page >= H.value,
                  onClick: u[18] || (u[18] = (v) => E(n(h).page + 1))
                }, "下一页 ›", 8, Rn),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(h).page >= H.value,
                  onClick: u[19] || (u[19] = (v) => E(H.value))
                }, "末页 »", 8, Ln)
              ])) : y("", !0)
            ])
          ])
        ])
      ])
    ], 544)) : y("", !0);
  }
}), Bn = /* @__PURE__ */ Ee(zn, [["__scopeId", "data-v-f738263e"]]), xt = {
  phase: "idle",
  isSeriesPickerOpen: !1,
  insertedTitle: ""
};
class An {
  constructor() {
    this._state = { ...xt }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.biliRadioTape = this);
  }
  get state() {
    return this._state;
  }
  get phase() {
    return this._state.phase;
  }
  get isDragOver() {
    return this._state.phase === "drag_over";
  }
  get isInserting() {
    return this._state.phase === "inserting";
  }
  get isCollapsed() {
    return this._state.phase === "collapsed";
  }
  get isSeriesPickerOpen() {
    return this._state.isSeriesPickerOpen;
  }
  get insertedTitle() {
    return this._state.insertedTitle;
  }
  subscribe(c) {
    return this._listeners.add(c), () => {
      this._listeners.delete(c);
    };
  }
  _setState(c) {
    this._state = c;
    for (const w of this._listeners)
      w(c);
  }
  send(c) {
    const w = this._state;
    switch (c.type) {
      case "DRAG_ENTER":
        return w.phase === "idle" ? (this._setState({
          ...w,
          phase: "drag_over"
        }), !0) : !1;
      case "DRAG_LEAVE":
        return w.phase === "drag_over" ? (this._setState({
          ...w,
          phase: "idle"
        }), !0) : !1;
      case "START_INSERT":
        return this._setState({
          phase: "inserting",
          isSeriesPickerOpen: !1,
          insertedTitle: c.title
        }), !0;
      case "FINISH_INSERT":
        return w.phase === "inserting" ? (this._setState({
          phase: "idle",
          isSeriesPickerOpen: !1,
          insertedTitle: ""
        }), !0) : !1;
      case "TOGGLE_SERIES_PICKER": {
        if (w.phase === "collapsed" || w.phase === "inserting") return !1;
        const f = c.open !== void 0 ? c.open : !w.isSeriesPickerOpen;
        return this._setState({
          ...w,
          isSeriesPickerOpen: f
        }), !0;
      }
      case "TOGGLE_COLLAPSE": {
        const f = c.collapsed !== void 0 ? c.collapsed : w.phase !== "collapsed";
        return this._setState({
          phase: f ? "collapsed" : "idle",
          isSeriesPickerOpen: !1,
          insertedTitle: ""
        }), !0;
      }
      case "RESET_IDLE":
        return this._setState({ ...xt }), !0;
      default:
        return !1;
    }
  }
}
const Nn = ["title"], Vn = { class: "tape-capsule-text" }, Un = { class: "capsule-title" }, Gn = { class: "capsule-sub" }, Fn = ["title"], On = { class: "tape-deck-drop-slot" }, qn = {
  key: 1,
  class: "tape-insert-feedback-chip"
}, Hn = { class: "tape-loaded-title" }, Yn = { class: "tape-body-content" }, Wn = ["title", "onKeydown"], jn = { class: "tape-cassette" }, Xn = { class: "tape-center-label" }, Kn = { class: "tape-sticker-head" }, Qn = ["title"], Jn = ["src"], Zn = { class: "tape-badge-row" }, el = { class: "tape-brand-text" }, tl = { class: "tape-series-header" }, il = { class: "tape-series-title-group" }, sl = { class: "tape-series-count-pill" }, ol = { class: "tape-series-list-scroll" }, nl = ["onClick"], ll = { class: "tape-series-item-left" }, al = { class: "tape-series-item-info" }, rl = ["title"], ul = { class: "tape-series-item-count" }, dl = {
  key: 0,
  class: "tape-series-playing-tag"
}, cl = {
  key: 1,
  class: "tape-series-play-action"
}, pl = {
  key: 0,
  class: "tape-series-empty"
}, bl = {
  class: "tape-transport-controls",
  role: "group",
  "aria-label": "电台播放控制"
}, vl = ["title", "aria-label"], fl = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, gl = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, ml = { class: "tape-playback-section" }, hl = { class: "tape-time-lyric-row" }, yl = { class: "tape-timestamp" }, _l = { class: "tape-lyric-container" }, kl = ["title"], wl = ["title", "aria-label"], $l = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Cl = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, xl = {
  key: 2,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Sl = ["aria-valuenow"], Tl = {
  class: "tape-waveform-row",
  "aria-hidden": "true"
}, Pl = {
  class: "tape-waveform-svg",
  viewBox: "0 0 160 16",
  preserveAspectRatio: "none"
}, Ml = ["x", "y", "height"], Dl = /* @__PURE__ */ Me({
  __name: "BiliRadioTapePlayer",
  props: {
    dockSide: { type: Boolean, default: !1 }
  },
  setup(me) {
    const c = me, w = [
      3,
      4,
      3,
      5,
      4,
      6,
      8,
      12,
      16,
      20,
      22,
      18,
      14,
      10,
      8,
      9,
      13,
      17,
      21,
      23,
      19,
      15,
      11,
      9,
      8,
      12,
      16,
      20,
      22,
      17,
      13,
      9,
      7,
      6,
      8,
      11,
      9,
      6,
      5,
      4
    ], f = $(!1), P = $(null), D = new An(), M = qt(D), r = te(() => M.value.phase === "drag_over"), _ = te(() => M.value.phase === "inserting"), C = te(() => M.value.insertedTitle), U = te(() => M.value.phase === "collapsed"), J = te(() => M.value.isSeriesPickerOpen);
    function H(R) {
      R.stopPropagation(), D.send({ type: "TOGGLE_SERIES_PICKER" }), D.isSeriesPickerOpen && ut.init();
    }
    async function z(R) {
      D.send({ type: "TOGGLE_SERIES_PICKER", open: !1 }), await ut.playSeries(R, 0);
    }
    function W(R) {
      if (!J.value) return;
      const m = R.target;
      !m?.closest(".tape-series-popover") && !m?.closest(".tape-cassette-wrap") && D.send({ type: "TOGGLE_SERIES_PICKER", open: !1 });
    }
    function Q(R) {
      R.key === "Escape" && J.value && D.send({ type: "TOGGLE_SERIES_PICKER", open: !1 });
    }
    const Y = te(() => j.mode === "one" ? "单曲循环" : j.mode === "shuffle" ? "乱序播放" : "顺序播放"), E = $(380);
    function q() {
      if (typeof document > "u" || !c.dockSide) return;
      const R = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock"), m = 20, O = 16;
      if (R) {
        const k = R.getBoundingClientRect();
        if (k.left > 80) {
          const u = Math.floor(k.left - m - O);
          if (u > 220) {
            E.value = u;
            return;
          }
        }
      }
      const Z = typeof window < "u" ? window.innerWidth : 1280;
      E.value = Math.max(220, Math.floor(Z / 2 - 230));
    }
    let oe = null;
    function se() {
      clearTimeout(oe), oe = setTimeout(q, 60);
    }
    We(() => {
      if (ut.init(), typeof window < "u" && (window.addEventListener("pointerdown", W), window.addEventListener("keydown", Q)), c.dockSide) {
        q(), window.addEventListener("resize", se);
        const R = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
        if (R && typeof ResizeObserver < "u") {
          const m = new ResizeObserver(() => q());
          m.observe(R), R.__bili_dock_ro = m;
        }
      }
    }), Tt(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", W), window.removeEventListener("keydown", Q), window.removeEventListener("resize", se));
      const R = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
      R && R.__bili_dock_ro && (R.__bili_dock_ro.disconnect(), delete R.__bili_dock_ro);
    });
    function ve(R) {
      R.preventDefault(), D.send({ type: "DRAG_ENTER" });
    }
    function b(R) {
      R.preventDefault(), R.dataTransfer && (R.dataTransfer.dropEffect = "copy"), D.send({ type: "DRAG_ENTER" });
    }
    function ne(R) {
      const m = R.currentTarget, O = R.relatedTarget;
      (!O || !m.contains(O)) && D.send({ type: "DRAG_LEAVE" });
    }
    function ae(R) {
      R.preventDefault(), D.send({ type: "DRAG_LEAVE" });
      const m = R.dataTransfer;
      if (!m) return;
      let O = m.getData("application/x-bili-cassette") || m.getData("application/json"), Z = null;
      if (O)
        try {
          Z = JSON.parse(O);
        } catch {
        }
      if (!Z?.bvid) {
        const u = (m.getData("text/plain") || m.getData("text/uri-list") || m.getData("application/x-logicweaver-video-url"))?.match(/BV[0-9a-zA-Z]+/);
        u && (Z = {
          bvid: u[0],
          title: "放入的单曲卡带",
          cover: "",
          author: "Bilibili",
          duration: 0
        });
      }
      Z?.bvid && (D.send({ type: "START_INSERT", title: Z.title || Z.bvid }), setTimeout(() => {
        Ve.insertAndPlay(Z);
      }, 280), setTimeout(() => {
        D.send({ type: "FINISH_INSERT" });
      }, 1500));
    }
    function ee(R) {
      if (P.value) {
        f.value = !0;
        try {
          R.currentTarget?.setPointerCapture?.(R.pointerId);
        } catch {
        }
        Ce(R);
      }
    }
    function re(R) {
      f.value && Ce(R);
    }
    function fe(R) {
      if (f.value) {
        Ce(R), f.value = !1;
        try {
          R.currentTarget?.releasePointerCapture?.(R.pointerId);
        } catch {
        }
      }
    }
    function Ce(R) {
      if (!P.value) return;
      const m = P.value.getBoundingClientRect();
      if (m.width <= 0) return;
      const O = R.clientX - m.left, Z = Math.max(0, Math.min(100, O / m.width * 100));
      Ve.seek(Z);
    }
    return (R, m) => (s(), o("div", {
      class: A(["bili-tape-deck", {
        "is-playing": n(j).playing,
        "is-drag-over": r.value,
        "is-inserting": _.value,
        "dock-side-mode": c.dockSide,
        "dock-side-collapsed": c.dockSide && U.value
      }]),
      style: Pe(c.dockSide && !U.value ? { maxWidth: `${E.value}px` } : void 0),
      onDragenter: ve,
      onDragover: b,
      onDragleave: ne,
      onDrop: ae
    }, [
      c.dockSide && U.value ? (s(), o("div", {
        key: 0,
        class: "tape-collapsed-capsule",
        title: `电台：${n(j).title || "哔哩哔哩电台"}`
      }, [
        e("div", {
          class: A(["tape-capsule-spool", { spinning: n(j).playing }])
        }, [...m[9] || (m[9] = [
          e("div", { class: "spool-center-dot" }, null, -1)
        ])], 2),
        e("div", Vn, [
          e("strong", Un, l(n(j).title || "B站电台"), 1),
          e("small", Gn, l(n(j).playing ? "♪ 播放中" : "已暂停"), 1)
        ]),
        e("button", {
          type: "button",
          class: "tape-capsule-play-btn",
          title: n(j).playing ? "暂停" : "播放",
          onClick: m[0] || (m[0] = S((O) => n(Ve).togglePlay(), ["stop"]))
        }, l(n(j).playing ? "⏸" : "▶"), 9, Fn),
        e("button", {
          type: "button",
          class: "tape-capsule-expand-btn",
          title: "展开完整磁带播放条",
          onClick: m[1] || (m[1] = S((O) => n(D).send({ type: "TOGGLE_COLLAPSE", collapsed: !1 }), ["stop"]))
        }, " ↗ ")
      ], 8, Nn)) : y("", !0),
      be(e("div", On, [...m[10] || (m[10] = [
        rt('<div class="slot-visual-frame" data-v-1834c419><span class="slot-icon-tape" data-v-1834c419>📼</span><div class="slot-text-col" data-v-1834c419><strong class="slot-headline" data-v-1834c419>释放鼠标装填卡带</strong><small class="slot-subline" data-v-1834c419>拖入视频封面 · 立即播放音乐</small></div></div>', 1)
      ])], 512), [
        [bt, r.value]
      ]),
      _.value ? (s(), o("div", qn, [
        m[11] || (m[11] = e("span", { class: "tape-click-sound" }, "✓ 已装填", -1)),
        e("span", Hn, "《" + l(C.value) + "》", 1)
      ])) : y("", !0),
      be(e("div", Yn, [
        e("div", {
          class: "tape-cassette-wrap",
          role: "button",
          tabindex: "0",
          title: `点击选择电台系列 (已建 ${n(I).radioSeries.length} 个系列 · 也可直接拖拽视频封面至此装填)`,
          onClick: H,
          onKeydown: Be(S(H, ["prevent"]), ["enter", "space"])
        }, [
          e("div", jn, [
            m[14] || (m[14] = e("div", { class: "tape-spool tape-spool-left" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1)),
            e("div", Xn, [
              e("div", Kn, [
                n(j).coverUrl ? (s(), o("div", {
                  key: 0,
                  class: "tape-cover-sticker",
                  title: n(j).title
                }, [
                  e("img", {
                    src: n(j).coverUrl,
                    alt: "Cover",
                    referrerpolicy: "no-referrer"
                  }, null, 8, Jn)
                ], 8, Qn)) : y("", !0),
                e("div", Zn, [
                  m[12] || (m[12] = e("span", { class: "side-letter" }, "A", -1)),
                  e("span", el, l(n(j).seriesName || "CASSETTE"), 1)
                ])
              ]),
              m[13] || (m[13] = e("div", { class: "tape-acrylic-window" }, [
                e("div", { class: "tape-ribbon-bar" }),
                e("div", { class: "tape-scale-marks" }, [
                  e("span", null, "100"),
                  e("span", null, "50"),
                  e("span", null, "0")
                ])
              ], -1))
            ]),
            m[15] || (m[15] = e("div", { class: "tape-spool tape-spool-right" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1))
          ]),
          J.value ? (s(), o("div", {
            key: 0,
            class: "tape-series-popover",
            onClick: m[3] || (m[3] = S(() => {
            }, ["stop"]))
          }, [
            e("div", tl, [
              e("div", il, [
                m[16] || (m[16] = e("span", { class: "tape-series-icon" }, "📻", -1)),
                m[17] || (m[17] = e("span", { class: "tape-series-title" }, "自建电台系列", -1)),
                e("span", sl, l(n(I).radioSeries.length), 1)
              ]),
              e("button", {
                type: "button",
                class: "tape-series-close-btn",
                title: "关闭",
                "aria-label": "关闭",
                onClick: m[2] || (m[2] = S((O) => J.value = !1, ["stop"]))
              }, " ✕ ")
            ]),
            e("div", ol, [
              (s(!0), o(N, null, X(n(I).radioSeries, (O) => (s(), o("div", {
                key: O.id,
                class: A(["tape-series-item", { "is-active": n(j).seriesName === O.name }]),
                onClick: S((Z) => z(O.id), ["stop"])
              }, [
                e("div", ll, [
                  m[18] || (m[18] = e("span", { class: "tape-series-item-bullet" }, "📼", -1)),
                  e("div", al, [
                    e("span", {
                      class: "tape-series-item-name",
                      title: O.name
                    }, l(O.name), 9, rl),
                    e("span", ul, l(O.count) + " 首曲目 · 顺序连播", 1)
                  ])
                ]),
                n(j).seriesName === O.name && n(j).playing ? (s(), o("span", dl, " 播放中 ")) : (s(), o("span", cl, " ▶ "))
              ], 10, nl))), 128)),
              n(I).radioSeries.length ? y("", !0) : (s(), o("div", pl, [...m[19] || (m[19] = [
                e("span", { class: "empty-icon" }, "📂", -1),
                e("span", { class: "empty-text" }, "暂无保存的电台系列", -1),
                e("span", { class: "empty-tip" }, "可在 B站工作区 → 电台 中添加曲目并保存为系列", -1)
              ])]))
            ])
          ])) : y("", !0)
        ], 40, Wn),
        e("div", bl, [
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "上一首",
            "aria-label": "上一首",
            onClick: m[4] || (m[4] = (O) => n(Ve).prev())
          }, [...m[20] || (m[20] = [
            e("svg", {
              viewBox: "0 0 24 24",
              width: "13",
              height: "13",
              fill: "currentColor"
            }, [
              e("path", { d: "M6 6h2v12H6zm3.5 6 8.5 6V6z" })
            ], -1)
          ])]),
          e("button", {
            type: "button",
            class: A(["tape-ctrl-btn tape-ctrl-play", { playing: n(j).playing }]),
            title: n(j).playing ? "暂停播放" : "开始播放",
            "aria-label": n(j).playing ? "暂停" : "播放",
            onClick: m[5] || (m[5] = (O) => n(Ve).togglePlay())
          }, [
            n(j).playing ? (s(), o("svg", fl, [...m[21] || (m[21] = [
              e("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" }, null, -1)
            ])])) : (s(), o("svg", gl, [...m[22] || (m[22] = [
              e("path", { d: "M8 5v14l11-7z" }, null, -1)
            ])]))
          ], 10, vl),
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "下一首",
            "aria-label": "下一首",
            onClick: m[6] || (m[6] = (O) => n(Ve).next())
          }, [...m[23] || (m[23] = [
            e("svg", {
              viewBox: "0 0 24 24",
              width: "13",
              height: "13",
              fill: "currentColor"
            }, [
              e("path", { d: "M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" })
            ], -1)
          ])])
        ]),
        e("div", ml, [
          e("div", hl, [
            e("span", yl, l(n(j).formattedCurrent) + " / " + l(n(j).formattedDuration), 1),
            e("div", _l, [
              e("span", {
                class: "tape-lyric-text",
                title: n(j).lyric
              }, l(n(j).lyric || "♪ 纯音乐 / 伴奏"), 9, kl)
            ]),
            e("button", {
              type: "button",
              class: "tape-mode-btn",
              title: Y.value,
              "aria-label": Y.value,
              onClick: m[7] || (m[7] = (O) => n(Ve).toggleMode())
            }, [
              n(j).mode === "order" ? (s(), o("svg", $l, [...m[24] || (m[24] = [
                e("polyline", { points: "17 1 21 5 17 9" }, null, -1),
                e("path", { d: "M3 11V9a4 4 0 0 1 4-4h14" }, null, -1),
                e("polyline", { points: "7 23 3 19 7 15" }, null, -1),
                e("path", { d: "M21 13v2a4 4 0 0 1-4 4H3" }, null, -1)
              ])])) : n(j).mode === "one" ? (s(), o("svg", Cl, [...m[25] || (m[25] = [
                rt('<polyline points="17 1 21 5 17 9" data-v-1834c419></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14" data-v-1834c419></path><polyline points="7 23 3 19 7 15" data-v-1834c419></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3" data-v-1834c419></path><text x="12" y="14.5" font-size="7.5" font-weight="900" font-family="system-ui, -apple-system, sans-serif" fill="currentColor" stroke="none" text-anchor="middle" data-v-1834c419>1</text>', 5)
              ])])) : n(j).mode === "shuffle" ? (s(), o("svg", xl, [...m[26] || (m[26] = [
                rt('<polyline points="16 3 21 3 21 8" data-v-1834c419></polyline><line x1="4" y1="20" x2="21" y2="3" data-v-1834c419></line><polyline points="21 16 21 21 16 21" data-v-1834c419></polyline><line x1="15" y1="15" x2="21" y2="21" data-v-1834c419></line><line x1="4" y1="4" x2="9" y2="9" data-v-1834c419></line>', 5)
              ])])) : y("", !0)
            ], 8, wl)
          ]),
          e("div", {
            ref_key: "progressLineRef",
            ref: P,
            class: "tape-progress-rail",
            role: "slider",
            "aria-valuenow": n(j).progressPercent,
            "aria-valuemin": "0",
            "aria-valuemax": "100",
            "aria-label": "电台播放进度",
            onPointerdown: ee,
            onPointermove: re,
            onPointerup: fe,
            onPointercancel: fe
          }, [
            e("div", {
              class: "tape-progress-fill",
              style: Pe({ width: `${n(j).progressPercent}%` })
            }, null, 4),
            e("div", {
              class: "tape-progress-handle",
              style: Pe({ left: `${n(j).progressPercent}%` })
            }, null, 4)
          ], 40, Sl),
          e("div", Tl, [
            (s(), o("svg", Pl, [
              (s(), o(N, null, X(w, (O, Z) => e("rect", {
                key: Z,
                class: "wave-bar",
                x: Z * 4,
                y: 16 - O * 0.7,
                width: "1.8",
                height: O * 0.7,
                rx: "0.9",
                style: Pe({ animationDelay: `${Z % 8 * 0.12}s` })
              }, null, 12, Ml)), 64))
            ]))
          ])
        ]),
        c.dockSide ? (s(), o("button", {
          key: 0,
          type: "button",
          class: "tape-dock-collapse-btn",
          title: "收起至左下角小胶囊",
          "aria-label": "收起磁带机",
          onClick: m[8] || (m[8] = S((O) => n(D).send({ type: "TOGGLE_COLLAPSE", collapsed: !0 }), ["stop"]))
        }, [...m[27] || (m[27] = [
          e("svg", {
            viewBox: "0 0 24 24",
            width: "11",
            height: "11",
            fill: "currentColor"
          }, [
            e("path", { d: "M19 13H5v-2h14v2z" })
          ], -1)
        ])])) : y("", !0)
      ], 512), [
        [bt, !c.dockSide || !U.value]
      ])
    ], 38));
  }
}), St = /* @__PURE__ */ Ee(Dl, [["__scopeId", "data-v-1834c419"]]), El = ["title"], Il = ["title"], Rl = {
  key: 2,
  class: "hero-lyric-body"
}, Ll = ["title"], zl = /* @__PURE__ */ Me({
  __name: "BiliVideoLyricDockBar",
  props: {
    inlineHero: { type: Boolean, default: !1 }
  },
  setup(me) {
    const c = $(340), w = $(!1), f = $(!1), P = $(!1), D = $(null), M = $(null), r = te(() => !(!pe.isOpen || !pe.bvid && !pe.videoSrc));
    ce(() => pe.isOpen, (Y) => {
      Y || (I.organizer.heroLyricText = "");
    });
    function _(Y) {
      const E = document.querySelector(".bili-mini-screen video, .bili-sub-screen video");
      E && (E.currentTime = Math.max(0, E.currentTime + Y));
    }
    function C(Y) {
      if (Y.target?.closest("button, .lyric-resize-handle, input, a") || !M.value) return;
      P.value = !0;
      const q = M.value.getBoundingClientRect(), oe = D.value ? D.value.x : q.left, se = D.value ? D.value.y : q.top, ve = Y.clientX, b = Y.clientY;
      let ne = oe, ae = se;
      const ee = (fe) => {
        if (!P.value) return;
        const Ce = fe.clientX - ve, R = fe.clientY - b, m = M.value?.offsetWidth || c.value, O = M.value?.offsetHeight || 32, Z = 8, k = Math.max(Z, window.innerWidth - m - 8), u = 8, v = Math.max(u, window.innerHeight - O - 8);
        ne = Math.min(k, Math.max(Z, oe + Ce)), ae = Math.min(v, Math.max(u, se + R)), D.value = { x: ne, y: ae };
      }, re = () => {
        P.value = !1, window.removeEventListener("pointermove", ee), window.removeEventListener("pointerup", re), window.removeEventListener("pointercancel", re);
        try {
          D.value && localStorage.setItem("bili_hero_lyric_pos", JSON.stringify(D.value));
        } catch {
        }
      };
      window.addEventListener("pointermove", ee), window.addEventListener("pointerup", re), window.addEventListener("pointercancel", re);
    }
    function U() {
      D.value = null;
      try {
        localStorage.removeItem("bili_hero_lyric_pos");
      } catch {
      }
    }
    const J = te(() => {
      const Y = {};
      return f.value || (Y.width = `${c.value}px`), Y.position = "fixed", Y.zIndex = "1000", D.value ? (Y.left = `${D.value.x}px`, Y.top = `${D.value.y}px`, Y.margin = "0", Y.transform = "none") : (Y.left = "50%", Y.bottom = "24px", Y.transform = "translateX(-50%)"), Y;
    });
    let H = 0, z = 0, W = "right";
    function Q(Y, E) {
      E.preventDefault(), E.stopPropagation(), w.value = !0, W = Y, H = E.clientX, z = c.value;
      const q = (se) => {
        if (!w.value) return;
        const ve = se.clientX - H, b = W === "right" ? z + ve : z - ve, ne = Math.max(180, Math.min(720, b));
        c.value = ne;
      }, oe = () => {
        w.value = !1, window.removeEventListener("pointermove", q), window.removeEventListener("pointerup", oe), window.removeEventListener("pointercancel", oe);
        try {
          localStorage.setItem("bili_hero_lyric_width", String(c.value));
        } catch {
        }
      };
      window.addEventListener("pointermove", q), window.addEventListener("pointerup", oe), window.addEventListener("pointercancel", oe);
    }
    return We(() => {
      try {
        const Y = localStorage.getItem("bili_hero_lyric_width");
        if (Y) {
          const q = parseInt(Y, 10);
          Number.isFinite(q) && q >= 180 && q <= 720 && (c.value = q);
        }
        const E = localStorage.getItem("bili_hero_lyric_pos");
        if (E) {
          const q = JSON.parse(E);
          if (typeof q?.x == "number" && typeof q?.y == "number") {
            const oe = Math.min(window.innerWidth - 100, Math.max(8, q.x)), se = Math.min(window.innerHeight - 40, Math.max(8, q.y));
            D.value = { x: oe, y: se };
          }
        }
      } catch {
      }
    }), (Y, E) => r.value ? (s(), o("aside", {
      key: 0,
      ref_key: "barRef",
      ref: M,
      class: A(["bili-hero-lyric-bar", { "is-collapsed": f.value, "is-resizing": w.value, "is-dragging": P.value, "is-floating": !!D.value }]),
      style: Pe(J.value),
      title: D.value ? "按住可拖动位置；双击还原到默认位置" : "按住可自由拖动位置",
      "aria-label": "视频实时字幕与控制",
      onPointerdown: C,
      onDblclick: U
    }, [
      f.value ? y("", !0) : (s(), o("div", {
        key: 0,
        class: "lyric-resize-handle handle-left",
        title: "按住向左拉伸宽度",
        onPointerdown: E[0] || (E[0] = (q) => Q("left", q))
      }, null, 32)),
      f.value ? (s(), o("div", {
        key: 1,
        class: "hero-lyric-capsule",
        title: `视频台词：${n(I).organizer.heroLyricText || "暂无字幕"} (点击展开)`,
        onClick: E[2] || (E[2] = (q) => f.value = !1)
      }, [
        E[7] || (E[7] = e("span", { class: "capsule-icon" }, "💬", -1)),
        E[8] || (E[8] = e("span", { class: "capsule-text" }, "台词", -1)),
        e("button", {
          type: "button",
          class: "capsule-expand-btn",
          title: "展开台词栏",
          onClick: E[1] || (E[1] = S((q) => f.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, Il)) : (s(), o("div", Rl, [
        e("button", {
          type: "button",
          class: "hero-lyric-seek-btn",
          title: "当前视频后退 5 秒",
          "aria-label": "后退 5 秒",
          onClick: E[3] || (E[3] = (q) => _(-5))
        }, " ‹ "),
        e("strong", {
          class: "hero-lyric-current-text",
          title: n(I).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"
        }, l(n(I).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"), 9, Ll),
        e("button", {
          type: "button",
          class: "hero-lyric-seek-btn",
          title: "当前视频前进 5 秒",
          "aria-label": "前进 5 秒",
          onClick: E[4] || (E[4] = (q) => _(5))
        }, " › "),
        E[10] || (E[10] = e("span", { class: "hero-lyric-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "hero-lyric-collapse-btn",
          title: "收起台词栏",
          "aria-label": "收起台词栏",
          onClick: E[5] || (E[5] = S((q) => f.value = !0, ["stop"]))
        }, [...E[9] || (E[9] = [
          e("svg", {
            viewBox: "0 0 24 24",
            width: "10",
            height: "10",
            fill: "currentColor"
          }, [
            e("path", { d: "M19 13H5v-2h14v2z" })
          ], -1)
        ])])
      ])),
      f.value ? y("", !0) : (s(), o("div", {
        key: 3,
        class: "lyric-resize-handle handle-right",
        title: "按住向右拉伸宽度",
        onPointerdown: E[6] || (E[6] = (q) => Q("right", q))
      }, null, 32))
    ], 46, El)) : y("", !0);
  }
}), Bl = /* @__PURE__ */ Ee(zl, [["__scopeId", "data-v-8f47943e"]]), Al = {
  class: "fm-pane",
  id: "pane-organizer"
}, Nl = { id: "fo-body" }, Vl = { class: "fo-bili-sidebar" }, Ul = ["title"], Gl = { class: "fo-sidebar-toggle-title" }, Fl = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Ol = ["aria-expanded", "title"], ql = { class: "fo-sidebar-toggle-chevron" }, Hl = { class: "fo-sidebar-features-wrap" }, Yl = { class: "fo-sidebar-sub-wrap" }, Wl = ["title"], jl = { class: "fo-sidebar-sub-main" }, Xl = { class: "fo-sidebar-sub-text" }, Kl = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Ql = ["title"], Jl = { class: "fo-sidebar-sub-main" }, Zl = { class: "fo-sidebar-sub-text" }, ea = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, ta = ["title"], ia = { class: "fo-sidebar-sub-main" }, sa = { class: "fo-sidebar-sub-text" }, oa = { class: "fo-sidebar-sub-wrap fo-sidebar-recommend-wrap" }, na = ["title"], la = { class: "fo-sidebar-sub-main" }, aa = { class: "fo-sidebar-sub-text" }, ra = { class: "fo-sidebar-sub-wrap fo-sidebar-radio-wrap" }, ua = ["title"], da = { class: "fo-sidebar-sub-main" }, ca = { class: "fo-sidebar-sub-text" }, pa = { class: "fo-sidebar-favorite-hub" }, ba = { class: "fo-sidebar-sub-main" }, va = { class: "fo-sidebar-sub-text" }, fa = ["title", "aria-label"], ga = {
  key: 0,
  class: "fo-move-target-banner"
}, ma = {
  class: "fo-bili-folder-list",
  "aria-label": "B站收藏夹"
}, ha = {
  key: 0,
  class: "fo-bili-section-divider"
}, ya = ["onDragover", "onDragleave", "onDrop"], _a = { class: "fo-bili-section-title" }, ka = ["data-folder-id", "data-folder-kind", "draggable", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], wa = ["aria-expanded", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], $a = {
  class: "fo-group-caret",
  "aria-hidden": "true"
}, Ca = {
  key: 0,
  class: "muted small"
}, xa = {
  key: 0,
  id: "fo-vue-main",
  class: "fo-bili-main"
}, Sa = {
  key: 0,
  class: "fo-bili-loading"
}, Ta = {
  key: 1,
  class: "fo-bili-empty fo-bili-login-guide"
}, Pa = { class: "fo-bili-login-card" }, Ma = { class: "fo-bili-login-actions" }, Da = {
  key: 2,
  class: "fo-bili-empty"
}, Ea = { class: "fo-bili-hero fo-hero-persistent" }, Ia = { class: "fo-hero-left" }, Ra = ["src"], La = {
  key: 1,
  class: "fo-folder-icon"
}, za = { class: "fo-hero-folder-info" }, Ba = ["placeholder", "aria-label"], Aa = ["title"], Na = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, Va = { class: "card-fullscreen-bili-suggest-head" }, Ua = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, Ga = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, Fa = ["onClick", "onContextmenu"], Oa = { class: "card-fullscreen-bili-thumb" }, qa = ["src"], Ha = { key: 0 }, Ya = { class: "card-fullscreen-bili-video-copy" }, Wa = { class: "fo-bili-actions" }, ja = ["title"], Xa = { class: "bili-header-msg-label" }, Ka = ["title"], Qa = ["disabled"], Ja = ["title"], Za = { class: "fo-bili-toolbar" }, er = { class: "fo-bili-sort" }, tr = { class: "fo-vue-feed-label" }, ir = {
  key: 0,
  class: "fo-bili-loading",
  role: "status"
}, sr = {
  key: 1,
  class: "fo-bili-empty",
  role: "alert"
}, or = { class: "fo-bili-grid" }, nr = {
  key: 0,
  class: "fo-bili-empty"
}, lr = ["onContextmenu"], ar = { class: "fo-bili-thumb" }, rr = ["href", "onClick"], ur = ["src"], dr = { class: "fo-bili-count" }, cr = { class: "fo-bili-duration" }, pr = { class: "fo-bili-title-row" }, br = ["href", "onClick"], vr = { class: "fo-bili-meta" }, fr = {
  key: 0,
  class: "fo-pager"
}, gr = ["disabled"], mr = { class: "fo-page-num" }, hr = ["disabled"], yr = { class: "fo-bili-toolbar" }, _r = {
  key: 0,
  class: "fo-bili-sort"
}, kr = ["onClick"], wr = {
  class: "fo-mini-dock-anchor",
  "aria-label": "视频标签页"
}, $r = ["title"], Cr = { class: "fo-video-tab-title" }, xr = { class: "fo-video-tab-actions" }, Sr = ["title"], Tr = {
  key: 2,
  class: "fo-bili-batch-actions"
}, Pr = { class: "fo-batch-count" }, Mr = { class: "fo-bili-grid" }, Dr = {
  key: 0,
  class: "fo-bili-empty"
}, Er = ["data-batch-id", "onDragstart", "onContextmenu"], Ir = { class: "fo-bili-thumb" }, Rr = {
  key: 0,
  class: "fo-batch-check",
  title: "选择此视频"
}, Lr = ["checked", "onChange"], zr = ["href", "onClick"], Br = ["src"], Ar = { class: "fo-bili-count" }, Nr = { class: "fo-bili-duration" }, Vr = { class: "fo-bili-title-row" }, Ur = ["href", "onClick"], Gr = ["aria-expanded", "onClick"], Fr = {
  key: 0,
  class: "fo-card-menu"
}, Or = ["onClick"], qr = ["onClick"], Hr = ["onClick"], Yr = { class: "fo-bili-meta" }, Wr = ["onClick"], jr = {
  key: 0,
  class: "fo-pager"
}, Xr = ["disabled"], Kr = { class: "fo-page-num" }, Qr = ["disabled"], Jr = {
  key: 1,
  id: "fo-vue-cache-main",
  class: "fo-bili-main"
}, Zr = { class: "fo-bili-hero fo-hero-persistent fo-cached-hero" }, eu = { class: "fo-hero-left" }, tu = { class: "fo-hero-folder-info" }, iu = { class: "fo-bili-actions" }, su = {
  key: 0,
  class: "fo-bili-loading"
}, ou = {
  key: 1,
  class: "fo-bili-grid fo-cached-video-grid"
}, nu = {
  key: 0,
  class: "fo-bili-empty"
}, lu = { class: "fo-bili-thumb" }, au = ["onClick"], ru = ["src"], uu = { class: "fo-bili-title-row" }, du = ["onClick"], cu = ["onClick"], pu = { class: "fo-bili-meta" }, bu = {
  key: 2,
  id: "fo-vue-recommend-main",
  class: "fo-bili-main"
}, vu = { class: "fo-bili-hero" }, fu = { class: "fo-bili-heading" }, gu = { class: "fo-feed-hero-title" }, mu = { class: "fo-feed-badge" }, hu = { class: "fo-bili-actions" }, yu = ["disabled"], _u = { class: "fo-bili-toolbar" }, ku = { class: "fo-feed-count-tag" }, wu = {
  key: 0,
  class: "fo-bili-loading"
}, $u = {
  key: 1,
  class: "fo-bili-empty"
}, Cu = {
  key: 2,
  class: "fo-bili-grid"
}, xu = {
  key: 0,
  class: "fo-bili-empty"
}, Su = ["onDragstart"], Tu = { class: "fo-bili-thumb" }, Pu = ["href", "onClick"], Mu = ["src"], Du = { class: "fo-bili-count" }, Eu = { class: "fo-bili-duration" }, Iu = { class: "fo-bili-title-row" }, Ru = ["href", "onClick"], Lu = ["aria-expanded", "onClick"], zu = {
  key: 0,
  class: "fo-card-menu"
}, Bu = ["onClick"], Au = ["onClick"], Nu = ["onClick"], Vu = ["onClick"], Uu = ["onClick"], Gu = { class: "fo-bili-meta" }, Fu = ["onClick"], Ou = {
  key: 3,
  id: "fo-vue-following-main",
  class: "fo-bili-main"
}, qu = { class: "fo-bili-hero" }, Hu = { class: "fo-bili-heading" }, Yu = { class: "fo-feed-hero-title" }, Wu = { class: "fo-feed-badge" }, ju = { class: "fo-bili-actions" }, Xu = ["disabled"], Ku = { class: "fo-up-groups-bar" }, Qu = { class: "fo-up-groups-list" }, Ju = ["onClick"], Zu = { class: "count" }, ed = { class: "fo-up-groups-actions" }, td = {
  key: 0,
  class: "fo-up-members-strip"
}, id = { class: "fo-up-members-label" }, sd = { class: "fo-up-members-list" }, od = ["title", "onClick", "onContextmenu"], nd = ["src"], ld = { class: "fo-bili-toolbar" }, ad = { class: "fo-feed-count-tag" }, rd = {
  key: 1,
  class: "fo-bili-loading"
}, ud = {
  key: 2,
  class: "fo-bili-empty"
}, dd = {
  key: 3,
  class: "fo-bili-grid"
}, cd = {
  key: 0,
  class: "fo-bili-empty"
}, pd = ["onDragstart"], bd = { class: "fo-bili-thumb" }, vd = ["href", "onClick"], fd = ["src"], gd = { class: "fo-bili-count" }, md = { class: "fo-bili-duration" }, hd = { class: "fo-bili-title-row" }, yd = ["href", "onClick"], _d = ["aria-expanded", "onClick"], kd = {
  key: 0,
  class: "fo-card-menu"
}, wd = ["onClick"], $d = ["onClick"], Cd = ["onClick"], xd = ["onClick"], Sd = { class: "fo-bili-meta" }, Td = ["onClick"], Pd = { class: "fo-pager" }, Md = ["disabled"], Dd = { class: "fo-page-num" }, Ed = ["disabled"], Id = {
  key: 4,
  id: "fo-vue-subscription-main",
  class: "fo-bili-main fo-vue-subscription-main"
}, Rd = { class: "bili-sub-vue-shell" }, Ld = {
  key: 0,
  class: "fo-bili-loading"
}, zd = {
  key: 1,
  class: "fo-bili-empty"
}, Bd = {
  key: 2,
  class: "bili-sub-layout bili-sub-vue-layout"
}, Ad = {
  key: 5,
  id: "fo-vue-radio-main",
  class: "fo-bili-main fo-vue-radio-main"
}, Nd = { class: "fo-bili-hero fo-radio-hero" }, Vd = { class: "fo-bili-actions" }, Ud = { class: "bili-radio-layout fo-vue-radio-layout" }, Gd = { class: "bili-radio-folders" }, Fd = { id: "bili-radio-folders" }, Od = ["onClick"], qd = {
  key: 0,
  class: "muted small"
}, Hd = { class: "bili-radio-library" }, Yd = {
  key: 0,
  role: "alert",
  class: "muted small"
}, Wd = {
  id: "bili-radio-videos",
  class: "bili-radio-videos"
}, jd = ["title", "onDragstart", "onClick"], Xd = ["src"], Kd = { key: 1 }, Qd = {
  key: 0,
  class: "muted small"
}, Jd = { class: "bili-radio-editor" }, Zd = { class: "bili-radio-name-row" }, ec = ["placeholder", "onKeydown"], tc = { class: "bili-radio-btn-group" }, ic = { class: "bili-radio-series-dropdown-wrap" }, sc = {
  value: "",
  disabled: "",
  selected: ""
}, oc = ["value"], nc = {
  id: "bili-radio-queue",
  class: "bili-radio-queue",
  "aria-label": "电台播放队列"
}, lc = ["onClick"], ac = { class: "bili-radio-queue-no" }, rc = ["src"], uc = { key: 1 }, dc = ["aria-label", "onClick"], cc = {
  key: 0,
  class: "muted small"
}, pc = { class: "bili-radio-actions" }, bc = ["disabled"], vc = ["disabled"], fc = ["title"], gc = {
  key: 2,
  class: "fo-context-divider"
}, mc = /* @__PURE__ */ Me({
  __name: "BilibiliWorkspace",
  setup(me) {
    const c = $(!1);
    function w() {
      const a = I.radioSeriesName?.trim();
      if (!a) {
        c.value = !0;
        const t = document.getElementById("bili-radio-name");
        t && t.focus(), Je.fetch(V("bili.radioAppName"), V("bili.radioNameEmpty"));
        return;
      }
      c.value = !1, b("radio-save", { name: a });
    }
    async function f() {
      const a = document.getElementById("bili-radio-name");
      a && (a.focus(), a.select(), Je.fetch(V("bili.radioAppName"), V("bili.radioInputFocused")));
    }
    function P(a) {
      const t = a.target, i = t.value;
      if (i) {
        if (i === "__create_new__") {
          b("radio-clear"), I.radioSeriesName = "", Je.fetch("哔哩哔哩电台", "已开启新系列创作，请从左侧添加视频"), t.value = "";
          return;
        }
        b("radio-load-series", i);
      }
    }
    function D(a, t) {
      !t.mid && !t.name || ze.showUpRecentVideosPreview(
        {
          preventDefault: () => a.preventDefault(),
          stopPropagation: () => a.stopPropagation(),
          clientX: a.clientX,
          clientY: a.clientY
        },
        {
          mid: t.mid || "",
          name: t.name || "UP主",
          face: t.face || "",
          sign: t.sign || ""
        }
      );
    }
    function M() {
      Ht.togglePanel();
    }
    const r = te(() => I.organizer), _ = $(!1), { active: C } = Vt("daily-bilibili", "/bilibili.html");
    ce(() => C.value && r.value.mode === "recommendations", (a) => {
      ze.setRecommendationsActive(a);
    }, { immediate: !0, flush: "sync" }), ce(() => C.value && r.value.mode === "following", (a) => {
      ze.setFollowingActive(a);
    }, { immediate: !0, flush: "sync" }), ce(() => C.value && r.value.mode === "subscription", (a) => {
      ze.setSubscriptionActive(a);
    }, { immediate: !0, flush: "sync" }), ce(() => C.value && r.value.mode === "cache", (a) => {
      a || (_.value = !1);
    });
    const U = $(r.value.query), J = $(!1), H = $(!1), z = $(""), W = $({ visible: !1, x: 0, y: 0, video: null, folder: null }), { menuRef: Q, style: Y } = Wt({
      visible: () => W.value.visible,
      anchor: () => W.value,
      dismiss: () => {
        W.value.visible = !1;
      }
    }), E = $(
      typeof localStorage < "u" && localStorage.getItem("bili_sidebar_features_collapsed") === "true"
    );
    function q() {
      E.value = !E.value;
      try {
        localStorage.setItem("bili_sidebar_features_collapsed", String(E.value));
      } catch {
      }
    }
    function oe() {
      pe.bvid && Nt.open({
        bvid: pe.bvid,
        cid: pe.cid,
        title: pe.title
      });
    }
    function se() {
      pe.collapsed && Ze.toggleCollapse(), Ze.bringToFront();
    }
    function ve() {
      Ze.close();
    }
    ce(() => r.value.query, (a) => {
      U.value = a;
    }), ce(U, (a) => {
      (!a || !a.trim()) && r.value.query && b("organizer-search", "");
    });
    function b(a, t) {
      Ue.dispatch(a, t);
    }
    function ne(a) {
      a.group || it(), b(a.group ? "toggle-folder-group" : "select-folder", { id: a.id, kind: a.kind });
    }
    const ae = $(""), ee = $(""), re = $("before"), fe = $(!1);
    function Ce(a, t) {
      t.kind === "created" && (ae.value = t.id, a.dataTransfer?.setData("application/x-logicweaver-favorite-node", t.id), a.dataTransfer?.setData("text/plain", t.id), a.dataTransfer && (a.dataTransfer.effectAllowed = "move"));
    }
    function R(a, t) {
      if (t.kind !== "created" || !ae.value || ae.value === t.id) return;
      a.preventDefault(), a.dataTransfer && (a.dataTransfer.dropEffect = "move");
      const i = a.currentTarget;
      if (!i) return;
      const d = i.getBoundingClientRect(), L = (a.clientY - d.top) / Math.max(1, d.height), de = t.group && L > 0.25 && L < 0.75 ? "into" : L >= 0.5 ? "after" : "before";
      ee.value = t.id, re.value = de;
    }
    function m(a, t) {
      const i = a.relatedTarget, d = a.currentTarget;
      d && i && d.contains(i) || ee.value === t.id && (ee.value = "");
    }
    function O() {
      ae.value = "", ee.value = "", fe.value = !1;
    }
    function Z(a, t) {
      a.preventDefault();
      const i = ae.value || a.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "", d = re.value || (t.group ? "into" : "after");
      O(), !(!i || i === t.id || t.kind !== "created") && b("move-folder-node", { sourceId: i, targetId: t.id, mode: d });
    }
    function k(a) {
      ae.value && (a.preventDefault(), a.dataTransfer && (a.dataTransfer.dropEffect = "move"), fe.value = !0);
    }
    function u(a) {
      const t = a.relatedTarget, i = a.currentTarget;
      i && t && i.contains(t) || (fe.value = !1);
    }
    function v(a) {
      a.preventDefault();
      const t = ae.value || a.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
      O(), t && b("move-folder-node", { sourceId: t, targetId: "root", mode: "into" });
    }
    function B() {
      const a = U.value.trim();
      b("organizer-search", a);
    }
    function ue() {
      !U.value.trim() && r.value.query && b("organizer-search", "");
    }
    const ge = $(""), Se = $(!1), _e = $(!1), De = $("hot"), Ie = $(""), Ge = te(() => De.value === "live" ? V("bili.searchLiveTitle", { keyword: Ie.value }) : V("bili.searchSuggestTitle")), Fe = te(() => De.value === "live" ? V("bili.searchLiveSubtitle") : V("bili.searchSuggestSubtitle")), ke = $([]), Ae = $(null), Re = $(!1), x = $(""), g = $(1), p = $(0), T = $(!1), F = $(!1), G = $(""), K = $([]);
    let le = 0, ie = 0;
    ce(() => r.value.mode, (a) => {
      a !== "organizer" && it();
    });
    const Oe = $([]);
    let qe = 0, He = null;
    function Ye(a) {
      if (!a) return null;
      const t = a.bvid || (String(a.param || "").startsWith("BV") ? a.param : "");
      if (!t && !a.aid && !a.id) return null;
      const i = String(a.pic || a.cover || "").replace(/^http:/, "https:"), d = i.startsWith("//") ? `https:${i}` : i, L = String(a.title || "").replace(/<[^>]+>/g, ""), de = Number(a.duration || 0), at = de > 0 ? `${Math.floor(de / 60)}:${String(de % 60).padStart(2, "0")}` : String(a.duration || ""), Ne = a.stat?.view || a.play || 0, Lt = Number(Ne) >= 1e4 ? `${(Number(Ne) / 1e4).toFixed(1)}万` : String(Number(Ne || 0)), zt = a.owner?.name || a.name || a.author || V("bili.upDefault");
      return {
        bvid: t,
        aid: String(a.aid || a.id || ""),
        title: L,
        cover: d,
        durationText: at,
        playText: Lt,
        upper: zt
      };
    }
    async function xe() {
      if (De.value = "hot", Se.value = !0, Oe.value.length && Date.now() - qe < 9e4) {
        ke.value = Oe.value;
        return;
      }
      _e.value = !0;
      try {
        const t = await (await fetch("https://api.bilibili.com/x/web-interface/index/top/feed/rcmd?ps=8&fresh_idx=1", { credentials: "include" })).json();
        let i = Array.isArray(t.data?.item) ? t.data.item : [];
        if (!i.length) {
          const de = await (await fetch("https://api.bilibili.com/x/web-interface/popular?ps=8&pn=1", { credentials: "include" })).json();
          i = Array.isArray(de.data?.list) ? de.data.list : [];
        }
        const d = i.map(Ye).filter(Boolean);
        Oe.value = d, qe = Date.now(), ge.value.trim() || (ke.value = d);
      } catch {
        ke.value = [];
      } finally {
        _e.value = !1;
      }
    }
    function je() {
      ge.value.trim() ? vt(ge.value.trim()) : xe();
    }
    function Mt() {
      const a = ge.value.trim();
      if (clearTimeout(He), !a) {
        xe();
        return;
      }
      He = setTimeout(() => {
        vt(a);
      }, 320);
    }
    async function vt(a) {
      const t = ++ie;
      Se.value = !0, De.value = "live", Ie.value = a, _e.value = !0;
      try {
        let i = null;
        if (window.LogicWeaverBiliSearchActions?.search)
          try {
            i = await window.LogicWeaverBiliSearchActions.search(a);
          } catch {
          }
        if (!i || i.code !== 0) {
          const L = `search_type=video&keyword=${encodeURIComponent(a)}&page=1&page_size=12`;
          i = await (await fetch(`https://api.bilibili.com/x/web-interface/search/type?${L}`, { credentials: "include" })).json();
        }
        if (t !== ie || ge.value.trim() !== a) return;
        const d = Array.isArray(i?.data?.result) ? i.data.result : [];
        ke.value = d.slice(0, 10).map(Ye).filter(Boolean);
      } catch {
        t === ie && (ke.value = []);
      } finally {
        t === ie && (_e.value = !1);
      }
    }
    function tt(a) {
      Se.value = !1;
      const t = a.bvid || (String(a.param || a.id || "").startsWith("BV") ? a.param || a.id : "");
      t || a.aid ? Ze.openVideo({
        bvid: t,
        aid: a.aid,
        title: a.title,
        cover: a.cover,
        author: a.upper
      }) : window.LogicWeaverBiliSearchActions?.local ? window.LogicWeaverBiliSearchActions.local(a) : window.open(`https://www.bilibili.com/video/${t || a.bvid || a.id}`, "_blank");
    }
    function ft(a, t) {
      ht(a, {
        id: t.bvid || t.aid,
        aid: t.aid,
        bvid: t.bvid,
        title: t.title,
        cover: t.cover,
        url: t.bvid ? `https://www.bilibili.com/video/${t.bvid}` : "#",
        duration: t.durationText,
        playCount: t.playText,
        author: t.upper,
        authorMid: "",
        authorFace: "",
        favoriteDate: "搜索结果",
        selected: !1,
        writable: !1
      }, !1);
    }
    function it() {
      Re.value = !1, le++, F.value = !1;
    }
    async function Xe(a, t) {
      const i = ++le;
      Re.value = !0, x.value = a, g.value = t, F.value = !0, G.value = "", K.value = [], p.value = 0, T.value = !1;
      try {
        let d;
        try {
          d = await ze.searchActions.search(a, t, 20);
        } catch {
        }
        if (!d || d.code !== 0) {
          const at = new URLSearchParams({ search_type: "video", keyword: a, page: String(t), page_size: "20" }), Ne = await fetch(`https://api.bilibili.com/x/web-interface/search/type?${at}`, { credentials: "include" });
          if (!Ne.ok) throw new Error(`HTTP ${Ne.status}`);
          d = await Ne.json();
        }
        if (d?.code !== 0 || !Array.isArray(d?.data?.result))
          throw new Error(d?.message || "B站没有返回有效的搜索结果");
        if (i !== le) return;
        const L = d.data.result;
        K.value = L.map(Ye).filter(Boolean);
        const de = Number(d.data.numPages || d.data.num_pages || 0);
        p.value = Number.isFinite(de) && de > 0 ? Math.floor(de) : 0, T.value = p.value ? t < p.value : L.length >= 20;
      } catch (d) {
        i === le && (G.value = `搜索失败：${d instanceof Error ? d.message : "请稍后重试"}`);
      } finally {
        i === le && (F.value = !1);
      }
    }
    function gt() {
      const a = ge.value.trim();
      if (clearTimeout(He), ie++, _e.value = !1, Se.value = !1, !a) {
        xe();
        return;
      }
      Xe(a, 1);
    }
    ce(() => [C.value, Xt.bilibili?.id], ([a, t]) => {
      if (!a || !t) return;
      const i = jt("bilibili");
      i && (b("organizer-open"), ge.value = i.keyword, gt());
    }, { immediate: !0 });
    function mt(a) {
      Ae.value && !Ae.value.contains(a.target) && (Se.value = !1);
    }
    function st(a) {
      W.value.visible = !1, z.value = z.value === a ? "" : a;
    }
    function ht(a, t, i = !0) {
      z.value = "", W.value = {
        visible: !0,
        x: a.clientX,
        y: a.clientY,
        video: t,
        folder: i && I.activeFolderId ? { id: String(I.activeFolderId), title: r.value.folderTitle } : null
      };
    }
    function Ke(a) {
      if (a instanceof KeyboardEvent) {
        a.key === "Escape" && (z.value = "", W.value.visible = !1, r.value.isTargetPickMode && b("organizer-cancel-move-target"));
        return;
      }
      const t = a.target;
      t?.closest(".fo-card-menu, .fo-card-more") || (z.value = ""), t?.closest(".fo-context-menu") || (W.value.visible = !1);
    }
    const ot = typeof document < "u" && document.body.classList.contains("bili-standalone-body");
    function yt() {
      !H.value || J.value || r.value.loading || (J.value = !0, b("organizer-open"));
    }
    ce(() => r.value.loading, (a) => {
      !a && !r.value.folders.length && yt();
    }), We(() => {
      import("./bilibili-channel.service-DlgHbkfQ.js").catch((a) => console.error("[Bilibili] 频道动作服务加载失败", a)), H.value = !0, Ue.loadOrganizer(), yt(), document.addEventListener("pointerdown", Ke, !0), document.addEventListener("pointerdown", mt), window.addEventListener("keydown", Ke), window.setBiliMiniDockVisible?.(!0), requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }), ce(() => [r.value.videos, r.value.mode], () => {
      requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }, { flush: "post" }), Pt(() => {
      ze.setRecommendationsActive(!1), ze.setFollowingActive(!1), ze.setSubscriptionActive(!1), H.value = !1, document.removeEventListener("pointerdown", Ke, !0), document.removeEventListener("pointerdown", mt), window.removeEventListener("keydown", Ke);
    });
    function nt(a, t) {
      z.value = "", W.value.visible = !1;
      const i = String(typeof a == "object" ? a.id || a.bvid || a.aid || "" : a), d = typeof a == "object" ? a : r.value.videos.find((L) => String(L.id) === i);
      b("organizer-video-action", { id: i, video: d, action: t });
    }
    async function Le(a) {
      const { video: t, folder: i } = W.value;
      if (W.value.visible = !1, a === "share-chat") {
        if (!t) return;
        try {
          const { chatService: d } = await import("./view-styles-agM3PzgD.js").then((de) => de.aB), { windowManagerController: L } = await import("./window-manager.store-DE8sG7Nf.js").then((de) => de.n);
          d.sendBiliShare({
            bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
            aid: t.aid,
            title: t.title,
            cover: t.cover,
            upName: t.author,
            upMid: t.authorMid,
            upFace: t.authorFace,
            play: t.playCount
          }), L.open("chat");
        } catch (d) {
          console.warn("分享到聊天室失败", d);
        }
        return;
      }
      t && b("organizer-video-action", { id: t.id || "", video: t, action: a });
    }
    function Dt(a) {
      const t = I.radioSeriesName?.trim();
      let i = I.radioSeries.find((d) => d.name === t);
      if (!i && I.radioQueue.length && (i = {
        id: `series_${Date.now()}`,
        name: t || "未命名电台系列",
        count: I.radioQueue.length,
        items: I.radioQueue
      }), !i || !i.items?.length) {
        Je.fetch("哔哩哔哩电台", "当前没有可分享的系列曲目，请先添加曲目");
        return;
      }
      $t.sendBiliSeriesShare(i, a);
    }
    function Et(a) {
      const { video: t } = W.value;
      W.value.visible = !1, t && $t.sendBiliShare({
        bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
        aid: t.aid,
        title: t.title,
        cover: t.cover,
        upName: t.author,
        upMid: t.authorMid,
        upFace: t.authorFace,
        play: t.playCount
      }, a);
    }
    function It(a) {
      if (!r.value.isTargetPickMode) return;
      if (!a.target?.closest(".fo-bili-folder-list")) {
        const i = document.querySelector(".fo-bili-folder-list");
        i && (a.preventDefault(), i.scrollTop += a.deltaY);
      }
    }
    function _t(a) {
      const t = document.createElement("div");
      return t.style.position = "fixed", t.style.top = "-9999px", t.style.left = "-9999px", t.style.width = "144px", t.style.height = "50px", t.style.borderRadius = "6px", t.style.backgroundColor = "#1e1e24", t.style.border = "2px solid #eab308", t.style.boxShadow = "0 8px 24px rgba(0,0,0,0.6), inset 0 0 12px rgba(234,179,8,0.25)", t.style.display = "flex", t.style.alignItems = "center", t.style.padding = "4px 8px", t.style.gap = "8px", t.style.color = "#fff", t.style.fontFamily = "sans-serif", t.style.zIndex = "999999", t.style.pointerEvents = "none", t.innerHTML = `
    <div style="width:26px;height:26px;border-radius:50%;border:1.5px solid #d4d4d8;display:flex;align-items:center;justify-content:center;background:#09090b;box-shadow:inset 0 1px 3px rgba(0,0,0,0.5);">
      <span style="display:block;width:7px;height:7px;background:#eab308;border-radius:50%;"></span>
    </div>
    <div style="flex:1;min-width:0;overflow:hidden;line-height:1.2;">
      <div style="font-size:7.5px;font-weight:900;color:#eab308;letter-spacing:1px;">CASSETTE TAPE</div>
      <div style="font-size:10px;font-weight:700;color:#f4f4f5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${a || "B站音乐卡带"}</div>
    </div>
    <div style="width:26px;height:26px;border-radius:50%;border:1.5px solid #d4d4d8;display:flex;align-items:center;justify-content:center;background:#09090b;box-shadow:inset 0 1px 3px rgba(0,0,0,0.5);">
      <span style="display:block;width:7px;height:7px;background:#eab308;border-radius:50%;"></span>
    </div>
  `, document.body.appendChild(t), t;
    }
    function lt(a, t) {
      if (!a.dataTransfer) return;
      a.dataTransfer.effectAllowed = "copyMove", a.dataTransfer.setData("text/uri-list", t.url), a.dataTransfer.setData("text/plain", t.url), a.dataTransfer.setData("application/x-logicweaver-video-url", t.url), a.dataTransfer.setData("application/x-logicweaver-task", JSON.stringify({ type: "material", title: t.title, url: t.url, source: "B站收藏" }));
      const i = t.bvid || t.url?.match(/video\/(BV[0-9a-zA-Z]+)/)?.[1] || t.id, d = JSON.stringify({
        type: "bili-cassette-tape",
        bvid: i,
        title: t.title,
        cover: t.cover,
        author: t.author,
        duration: t.duration
      });
      a.dataTransfer.setData("application/x-bili-cassette", d), a.dataTransfer.setData("application/json", d);
      const L = _t(t.title);
      a.dataTransfer.setDragImage(L, 72, 25), setTimeout(() => {
        L.parentNode && L.parentNode.removeChild(L);
      }, 0);
    }
    function Rt(a, t) {
      if (!a.dataTransfer) return;
      a.dataTransfer.effectAllowed = "copyMove";
      const i = JSON.stringify({
        type: "bili-cassette-tape",
        bvid: t.bvid,
        title: t.title,
        cover: t.cover,
        author: t.author,
        duration: t.duration
      });
      a.dataTransfer.setData("application/x-bili-cassette", i), a.dataTransfer.setData("application/json", i), a.dataTransfer.setData("text/plain", `https://www.bilibili.com/video/${t.bvid}`);
      const d = _t(t.title);
      a.dataTransfer.setDragImage(d, 72, 25), setTimeout(() => {
        d.parentNode && d.parentNode.removeChild(d);
      }, 0);
    }
    return (a, t) => (s(), o("section", {
      id: "daily-bilibili",
      class: A(["card wide", { "card-fullscreen": n(ot) || n(ct).activeId === "daily-bilibili" }])
    }, [
      e("div", Al, [
        e("div", Nl, [
          e("div", {
            class: A(["fo-bili-layout", { "fo-picking-move-target": r.value.isTargetPickMode }]),
            "data-vue-organizer-shell": "true",
            onWheel: It
          }, [
            e("aside", Vl, [
              e("div", {
                class: A(["fo-sidebar-toggle-bar", { "is-collapsed": E.value }]),
                title: E.value ? n(V)("bili.channel.expandTip") : n(V)("bili.channel.collapseTip"),
                onClick: q
              }, [
                e("div", Gl, [
                  t[54] || (t[54] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                  e("span", null, l(n(V)("bili.channel.title")), 1),
                  E.value ? (s(), o("span", Fl, "5")) : y("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "fo-sidebar-toggle-action",
                  "aria-expanded": !E.value,
                  title: E.value ? n(V)("bili.channel.expand") : n(V)("bili.channel.collapse")
                }, [
                  e("span", null, l(E.value ? n(V)("bili.channel.expand") : n(V)("bili.channel.collapse")), 1),
                  e("span", ql, l(E.value ? "▾" : "▴"), 1)
                ], 8, Ol)
              ], 10, Ul),
              be(e("div", Hl, [
                e("div", Yl, [
                  e("button", {
                    id: "fo-sidebar-sub-btn",
                    type: "button",
                    class: A(["fo-sidebar-sub-btn", { on: r.value.mode === "subscription" }]),
                    title: n(V)("bili.channel.subVideoTip"),
                    onClick: t[0] || (t[0] = (i) => b("open-sub-video"))
                  }, [
                    e("div", jl, [
                      t[55] || (t[55] = e("span", { class: "fo-sidebar-sub-icon" }, "🎬", -1)),
                      e("div", Xl, [
                        e("strong", null, l(n(V)("bili.channel.subVideo")), 1),
                        e("small", null, l(n(V)("bili.channel.subVideoSub")), 1)
                      ])
                    ]),
                    t[56] || (t[56] = e("span", { class: "fo-sidebar-sub-badge" }, "NEW", -1))
                  ], 10, Wl)
                ]),
                e("div", Kl, [
                  e("button", {
                    id: "fo-sidebar-cache-btn",
                    type: "button",
                    class: A(["fo-sidebar-sub-btn", { on: r.value.mode === "cache" }]),
                    title: n(V)("bili.channel.cacheVideoTip"),
                    onClick: t[1] || (t[1] = (i) => b("open-cache"))
                  }, [
                    e("div", Jl, [
                      t[57] || (t[57] = e("span", { class: "fo-sidebar-sub-icon" }, "💾", -1)),
                      e("div", Zl, [
                        e("strong", null, l(n(V)("bili.channel.cacheVideo")), 1),
                        e("small", null, l(n(V)("bili.channel.cacheVideoSub")), 1)
                      ])
                    ]),
                    t[58] || (t[58] = e("span", { class: "fo-sidebar-sub-badge" }, "LOCAL", -1))
                  ], 10, Ql)
                ]),
                e("div", ea, [
                  e("button", {
                    id: "fo-sidebar-following-btn",
                    type: "button",
                    class: A(["fo-sidebar-sub-btn", { on: r.value.mode === "following" }]),
                    title: n(V)("bili.channel.followingTip"),
                    onClick: t[2] || (t[2] = (i) => b("open-following"))
                  }, [
                    e("div", ia, [
                      t[59] || (t[59] = e("span", { class: "fo-sidebar-sub-icon" }, "📺", -1)),
                      e("div", sa, [
                        e("strong", null, l(n(V)("bili.channel.following")), 1),
                        e("small", null, l(n(V)("bili.channel.followingSub")), 1)
                      ])
                    ]),
                    t[60] || (t[60] = e("span", { class: "fo-sidebar-sub-badge" }, "FEED", -1))
                  ], 10, ta)
                ]),
                e("div", oa, [
                  e("button", {
                    id: "fo-sidebar-recommend-btn",
                    type: "button",
                    class: A(["fo-sidebar-sub-btn", { on: r.value.mode === "recommendations" }]),
                    title: n(V)("bili.channel.forYouTip"),
                    onClick: t[3] || (t[3] = (i) => b("open-recommendations"))
                  }, [
                    e("div", la, [
                      t[61] || (t[61] = e("span", { class: "fo-sidebar-sub-icon" }, "✨", -1)),
                      e("div", aa, [
                        e("strong", null, l(n(V)("bili.channel.forYou")), 1),
                        e("small", null, l(n(V)("bili.channel.forYouSub")), 1)
                      ])
                    ]),
                    t[62] || (t[62] = e("span", { class: "fo-sidebar-sub-badge" }, "FOR YOU", -1))
                  ], 10, na)
                ]),
                e("div", ra, [
                  e("button", {
                    id: "fo-sidebar-radio-btn",
                    type: "button",
                    class: A(["fo-sidebar-sub-btn", { on: r.value.mode === "radio" }]),
                    title: n(V)("bili.channel.radioTip"),
                    onClick: t[4] || (t[4] = (i) => b("open-radio"))
                  }, [
                    e("div", da, [
                      t[63] || (t[63] = e("span", { class: "fo-sidebar-sub-icon" }, "📻", -1)),
                      e("div", ca, [
                        e("strong", null, l(n(V)("bili.channel.radio")), 1),
                        e("small", null, l(n(V)("bili.channel.radioSub")), 1)
                      ])
                    ]),
                    t[64] || (t[64] = e("span", { class: "fo-sidebar-sub-badge" }, "RADIO", -1))
                  ], 10, ua)
                ])
              ], 512), [
                [bt, !E.value]
              ]),
              e("div", pa, [
                e("div", ba, [
                  t[65] || (t[65] = e("span", { class: "fo-sidebar-sub-icon" }, "📁", -1)),
                  e("div", va, [
                    e("strong", null, l(n(V)("bili.channel.foldersHub")), 1),
                    e("small", null, l(n(V)("bili.channel.foldersHubSub")), 1)
                  ])
                ]),
                e("button", {
                  class: "fo-sidebar-hub-add",
                  type: "button",
                  title: n(V)("bili.channel.createFolderTip"),
                  "aria-label": n(V)("bili.channel.createFolderTip"),
                  onClick: t[5] || (t[5] = (i) => b("create-bili-folder"))
                }, "＋", 8, fa)
              ]),
              r.value.isTargetPickMode ? (s(), o("div", ga, [
                t[66] || (t[66] = e("div", { class: "fo-move-target-tip" }, [
                  e("span", { class: "fo-move-target-dot" }),
                  e("span", null, [
                    ye("请点击"),
                    e("strong", null, "自建收藏夹"),
                    ye("移入")
                  ])
                ], -1)),
                e("button", {
                  type: "button",
                  class: "fo-move-target-cancel",
                  title: "取消移动 (按 Esc 也可取消)",
                  onClick: t[6] || (t[6] = (i) => b("organizer-cancel-move-target"))
                }, " ✕ 取消 ")
              ])) : y("", !0),
              e("nav", ma, [
                (s(!0), o(N, null, X(r.value.folders, (i, d) => (s(), o(N, {
                  key: `${i.group ? "group" : "folder"}:${i.id}`
                }, [
                  d > 0 && r.value.folders[d - 1]?.kind !== i.kind ? (s(), o("div", ha)) : y("", !0),
                  d === 0 || r.value.folders[d - 1]?.kind !== i.kind ? (s(), o("div", {
                    key: 1,
                    class: A(["fo-bili-section-head fo-vue-section-head", { "drag-into": i.kind === "created" && fe.value }]),
                    onDragover: (L) => i.kind === "created" ? k(L) : void 0,
                    onDragleave: (L) => i.kind === "created" ? u(L) : void 0,
                    onDrop: (L) => i.kind === "created" ? v(L) : void 0
                  }, [
                    e("span", _a, [
                      e("b", null, l(i.kind === "collected" ? "我追的合集/收藏夹" : i.kind === "other" ? "其他收藏" : "我创建的收藏夹"), 1)
                    ]),
                    i.kind === "created" ? (s(), o("button", {
                      key: 0,
                      class: "fo-bili-section-add-btn",
                      type: "button",
                      title: "新建插件分组",
                      "aria-label": "新建插件分组",
                      onClick: t[7] || (t[7] = S((L) => b("create-local-group"), ["stop"]))
                    }, "＋")) : y("", !0)
                  ], 42, ya)) : y("", !0),
                  i.group ? (s(), o("div", {
                    key: 3,
                    class: A(["fo-bili-group-label", {
                      collapsed: i.collapsed,
                      dragging: ae.value === i.id,
                      "drag-before": ee.value === i.id && re.value === "before",
                      "drag-after": ee.value === i.id && re.value === "after",
                      "drag-into": ee.value === i.id && re.value === "into"
                    }]),
                    style: Pe({ "--fo-depth": i.depth }),
                    role: "button",
                    tabindex: "0",
                    "aria-expanded": !i.collapsed,
                    draggable: !0,
                    onClick: (L) => ne(i),
                    onKeydown: [
                      Be(S((L) => ne(i), ["prevent"]), ["enter"]),
                      Be(S((L) => ne(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (L) => Ce(L, i),
                    onDragover: (L) => R(L, i),
                    onDragleave: (L) => m(L, i),
                    onDrop: (L) => Z(L, i),
                    onDragend: O
                  }, [
                    e("i", $a, l(i.collapsed ? "›" : "⌄"), 1),
                    t[68] || (t[68] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, wa)) : (s(), o("div", {
                    key: 2,
                    role: "button",
                    tabindex: "0",
                    class: A(["fo-bili-folder", {
                      on: i.selected,
                      dragging: ae.value === i.id,
                      "drag-before": ee.value === i.id && re.value === "before",
                      "drag-after": ee.value === i.id && re.value === "after",
                      "drag-into": ee.value === i.id && re.value === "into",
                      "target-candidate": r.value.isTargetPickMode && i.kind === "created" && !i.selected
                    }]),
                    "data-folder-id": i.id,
                    "data-folder-kind": i.kind,
                    style: Pe({ "--fo-depth": i.depth }),
                    draggable: i.kind === "created",
                    onClick: (L) => ne(i),
                    onKeydown: [
                      Be(S((L) => ne(i), ["prevent"]), ["enter"]),
                      Be(S((L) => ne(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (L) => Ce(L, i),
                    onDragover: (L) => R(L, i),
                    onDragleave: (L) => m(L, i),
                    onDrop: (L) => Z(L, i),
                    onDragend: O
                  }, [
                    t[67] || (t[67] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, ka))
                ], 64))), 128)),
                !r.value.loading && !r.value.error && !r.value.folders.length ? (s(), o("p", Ca, "暂无可用收藏夹。")) : y("", !0)
              ])
            ]),
            r.value.mode === "organizer" ? (s(), o("section", xa, [
              r.value.loading && !Re.value ? (s(), o("div", Sa, [...t[69] || (t[69] = [
                e("i", null, null, -1),
                e("span", null, "正在读取 B站收藏内容…", -1)
              ])])) : !Re.value && r.value.error && r.value.error.includes("未登录") ? (s(), o("div", Ta, [
                e("div", Pa, [
                  t[71] || (t[71] = e("span", { class: "fo-bili-login-icon" }, "📺", -1)),
                  t[72] || (t[72] = e("h3", null, "未检测到哔哩哔哩登录状态", -1)),
                  t[73] || (t[73] = e("p", null, "tab-Project 直接复用当前浏览器的 B站 网页会话，无需输入账号密码或扫码授权。", -1)),
                  e("div", Ma, [
                    t[70] || (t[70] = e("a", {
                      class: "fo-bili-btn-login",
                      href: "https://passport.bilibili.com/login",
                      target: "_blank",
                      rel: "noreferrer"
                    }, "前往 bilibili.com 登录 ↗", -1)),
                    e("button", {
                      type: "button",
                      class: "fo-bili-btn-refresh",
                      onClick: t[8] || (t[8] = (i) => b("organizer-refresh"))
                    }, "已登录，点击刷新 ↻")
                  ])
                ])
              ])) : !Re.value && r.value.error ? (s(), o("p", Da, l(r.value.error), 1)) : (s(), o(N, { key: 3 }, [
                e("header", Ea, [
                  e("div", Ia, [
                    e("div", {
                      class: A(["fo-bili-cover", { "fo-vue-cover-image": r.value.folderCover }])
                    }, [
                      r.value.folderCover ? (s(), o("img", {
                        key: 0,
                        src: r.value.folderCover,
                        alt: "",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Ra)) : (s(), o("i", La))
                    ], 2),
                    e("div", za, [
                      e("h3", null, l(r.value.folderTitle), 1),
                      e("p", null, l(r.value.folderSubtitle), 1)
                    ])
                  ]),
                  e("div", {
                    class: "card-fullscreen-bili-search fo-hero-bili-search",
                    ref_key: "searchHostRef",
                    ref: Ae
                  }, [
                    e("form", {
                      class: "card-fullscreen-bili-searchbar",
                      role: "search",
                      onSubmit: S(gt, ["prevent"])
                    }, [
                      be(e("input", {
                        "onUpdate:modelValue": t[9] || (t[9] = (i) => ge.value = i),
                        type: "search",
                        autocomplete: "off",
                        placeholder: n(V)("bili.workspace.searchPlaceholder"),
                        "aria-label": n(V)("bili.workspace.searchAria"),
                        onFocus: je,
                        onInput: Mt
                      }, null, 40, Ba), [
                        [Te, ge.value]
                      ]),
                      e("button", {
                        type: "submit",
                        title: n(V)("bili.workspace.searchBtnTip")
                      }, "⌕", 8, Aa)
                    ], 32),
                    Se.value ? (s(), o("div", Na, [
                      e("div", Va, [
                        e("span", null, l(Ge.value), 1),
                        e("small", null, l(Fe.value), 1)
                      ]),
                      _e.value ? (s(), o("p", Ua, "正在获取推荐 / 搜索中…")) : !ke.value.length && !_e.value ? (s(), o("p", Ga, "暂无联想结果，按回车在插件内搜索")) : (s(!0), o(N, { key: 2 }, X(ke.value, (i) => (s(), o("button", {
                        key: i.bvid || i.aid,
                        type: "button",
                        class: "card-fullscreen-bili-video-row",
                        role: "option",
                        onClick: (d) => tt(i),
                        onContextmenu: S((d) => ft(d, i), ["prevent"])
                      }, [
                        e("span", Oa, [
                          e("img", {
                            src: i.cover,
                            alt: "",
                            referrerpolicy: "no-referrer",
                            loading: "lazy"
                          }, null, 8, qa),
                          i.durationText ? (s(), o("i", Ha, l(i.durationText), 1)) : y("", !0)
                        ]),
                        e("span", Ya, [
                          e("strong", null, l(i.title), 1),
                          e("small", null, l(i.upper) + " · " + l(i.playText) + "播放", 1)
                        ])
                      ], 40, Fa))), 128))
                    ])) : y("", !0)
                  ], 512),
                  e("div", Wa, [
                    e("button", {
                      id: "bili-header-msg-center-btn",
                      class: A(["fm-tab bili-header-msg-btn hero-action-btn", { "is-active": n(Yt).isOpen }]),
                      type: "button",
                      title: n(V)("bili.workspace.msgCenterTip"),
                      onClick: M
                    }, [
                      t[74] || (t[74] = e("span", { class: "bili-header-msg-icon" }, "🔔", -1)),
                      e("span", Xa, l(n(V)("bili.workspace.msgBtn")), 1)
                    ], 10, ja),
                    e("button", {
                      id: "bili-up-group-manager-top",
                      class: "fm-tab bili-header-up-group-btn hero-action-btn",
                      type: "button",
                      title: n(V)("bili.workspace.upGroupManagerTip"),
                      onClick: t[10] || (t[10] = (i) => b("manage-up-groups"))
                    }, l(n(V)("bili.workspace.upGroupManager")), 9, Ka),
                    e("button", {
                      type: "button",
                      class: "primary hero-action-btn",
                      disabled: !r.value.videos.length,
                      onClick: t[11] || (t[11] = (i) => b("organizer-batch-toggle"))
                    }, l(r.value.batchMode ? n(V)("bili.workspace.batchBack") : n(V)("bili.workspace.batch")), 9, Qa),
                    e("button", {
                      type: "button",
                      class: "hero-action-btn btn-refresh",
                      title: n(V)("bili.workspace.refreshFolderTip"),
                      onClick: t[12] || (t[12] = (i) => b("organizer-refresh"))
                    }, "↻", 8, Ja)
                  ])
                ]),
                Re.value ? (s(), o(N, { key: 0 }, [
                  e("div", Za, [
                    e("div", er, [
                      e("span", tr, "搜索结果：" + l(x.value), 1)
                    ]),
                    e("div", { class: "fo-bili-actions" }, [
                      e("button", {
                        type: "button",
                        onClick: it
                      }, "返回收藏夹")
                    ])
                  ]),
                  F.value ? (s(), o("div", ir, [...t[75] || (t[75] = [
                    e("i", null, null, -1),
                    e("span", null, "正在搜索 B站视频…", -1)
                  ])])) : G.value ? (s(), o("div", sr, [
                    e("p", null, l(G.value), 1),
                    e("button", {
                      type: "button",
                      class: "fo-btn",
                      onClick: t[13] || (t[13] = (i) => Xe(x.value, g.value))
                    }, "重试")
                  ])) : (s(), o(N, { key: 2 }, [
                    e("div", or, [
                      K.value.length ? y("", !0) : (s(), o("p", nr, "没有找到相关视频，换个关键词试试。")),
                      (s(!0), o(N, null, X(K.value, (i) => (s(), o("article", {
                        key: i.bvid || i.aid,
                        class: "fo-bili-card",
                        onContextmenu: S((d) => ft(d, i), ["prevent", "stop"])
                      }, [
                        e("div", ar, [
                          e("a", {
                            class: "fo-cover-link",
                            href: `https://www.bilibili.com/video/${i.bvid || `av${i.aid}`}`,
                            onClick: S((d) => tt(i), ["prevent"])
                          }, [
                            e("img", {
                              loading: "lazy",
                              decoding: "async",
                              referrerpolicy: "no-referrer",
                              src: i.cover,
                              alt: ""
                            }, null, 8, ur)
                          ], 8, rr),
                          e("span", dr, "▣ " + l(i.playText), 1),
                          e("span", cr, l(i.durationText), 1)
                        ]),
                        e("div", pr, [
                          e("a", {
                            class: "fo-title-link fo-bili-title",
                            href: `https://www.bilibili.com/video/${i.bvid || `av${i.aid}`}`,
                            onClick: S((d) => tt(i), ["prevent"])
                          }, l(i.title), 9, br)
                        ]),
                        e("div", vr, [
                          e("span", null, l(i.upper), 1)
                        ])
                      ], 40, lr))), 128))
                    ]),
                    g.value > 1 || T.value ? (s(), o("div", fr, [
                      e("button", {
                        type: "button",
                        class: "fo-btn",
                        disabled: g.value <= 1,
                        onClick: t[14] || (t[14] = (i) => Xe(x.value, g.value - 1))
                      }, "‹ 上一页", 8, gr),
                      e("span", mr, l(g.value) + l(p.value ? ` / ${p.value}` : ""), 1),
                      e("button", {
                        type: "button",
                        class: "fo-btn",
                        disabled: !T.value,
                        onClick: t[15] || (t[15] = (i) => Xe(x.value, g.value + 1))
                      }, "下一页 ›", 8, hr)
                    ])) : y("", !0)
                  ], 64))
                ], 64)) : (s(), o(N, { key: 1 }, [
                  e("div", yr, [
                    r.value.batchMode ? y("", !0) : (s(), o("div", _r, [
                      (s(!0), o(N, null, X([{ id: "fav_time", text: n(V)("bili.sort.favTime") }, { id: "view", text: n(V)("bili.sort.view") }, { id: "pubtime", text: n(V)("bili.sort.pubTime") }], (i) => (s(), o("button", {
                        key: i.id,
                        type: "button",
                        class: A({ on: r.value.sort === i.id }),
                        onClick: (d) => b("organizer-sort", i.id)
                      }, l(i.text), 11, kr))), 128))
                    ])),
                    e("div", wr, [
                      n(pe).isOpen && n(pe).bvid ? (s(), o("div", {
                        key: 0,
                        class: A(["fo-video-tab-item", { "is-collapsed": n(pe).collapsed }]),
                        title: n(pe).title
                      }, [
                        e("div", {
                          class: "fo-video-tab-meta",
                          onClick: se
                        }, [
                          e("span", {
                            class: A(["fo-video-tab-pulse", { playing: n(pe).isPlaying }])
                          }, null, 2),
                          e("span", Cr, l(n(pe).title), 1)
                        ]),
                        e("div", xr, [
                          e("button", {
                            type: "button",
                            class: "fo-vtab-btn fo-vtab-close",
                            title: "关闭视频",
                            onClick: S(ve, ["stop"])
                          }, " ✕ "),
                          e("button", {
                            type: "button",
                            class: "fo-vtab-btn fo-vtab-sub",
                            title: "查看该视频完整纯文本字幕",
                            onClick: S(oe, ["stop"])
                          }, " 字幕 "),
                          e("button", {
                            type: "button",
                            class: "fo-vtab-btn fo-vtab-expand",
                            title: n(pe).collapsed ? "放大恢复视频小窗" : "聚焦视频小窗",
                            onClick: S(se, ["stop"])
                          }, " 放大 ", 8, Sr)
                        ])
                      ], 10, $r)) : y("", !0)
                    ]),
                    r.value.batchMode ? (s(), o("div", Tr, [
                      e("span", Pr, "已选择 " + l(r.value.selectedCount) + " 项", 1),
                      e("button", {
                        type: "button",
                        onClick: t[17] || (t[17] = (i) => b("organizer-batch-all"))
                      }, "全选/取消全选"),
                      e("button", {
                        type: "button",
                        class: A({ "picking-target": r.value.isTargetPickMode }),
                        onClick: t[18] || (t[18] = (i) => r.value.isTargetPickMode ? b("organizer-cancel-move-target") : b("organizer-batch-move"))
                      }, l(r.value.isTargetPickMode ? "✕ 取消移动" : "移动到"), 3),
                      e("button", {
                        type: "button",
                        onClick: t[19] || (t[19] = (i) => b("organizer-batch-cache"))
                      }, "缓存所选"),
                      e("button", {
                        type: "button",
                        onClick: t[20] || (t[20] = (i) => b("organizer-batch-unfavorite"))
                      }, "取消收藏")
                    ])) : (s(), o("form", {
                      key: 1,
                      class: "fo-bili-search",
                      onSubmit: S(B, ["prevent"])
                    }, [
                      be(e("input", {
                        "onUpdate:modelValue": t[16] || (t[16] = (i) => U.value = i),
                        type: "search",
                        placeholder: "请输入关键词",
                        "aria-label": "搜索当前收藏夹",
                        onInput: ue,
                        onSearch: ue
                      }, null, 544), [
                        [Te, U.value]
                      ]),
                      t[76] || (t[76] = e("button", {
                        type: "submit",
                        title: "搜索"
                      }, "⌕", -1))
                    ], 32))
                  ]),
                  e("div", Mr, [
                    r.value.videos.length ? y("", !0) : (s(), o("p", Dr, l(r.value.query ? "没有找到匹配的视频。" : "这个收藏夹是空的。"), 1)),
                    (s(!0), o(N, null, X(r.value.videos, (i) => (s(), o("article", {
                      key: i.id,
                      class: A(["fo-bili-card", { "batch-selected": i.selected, "fo-single-moving": r.value.movingVideoId === i.id }]),
                      "data-batch-id": i.id,
                      draggable: "true",
                      onDragstart: (d) => lt(d, i),
                      onContextmenu: S((d) => ht(d, i), ["prevent", "stop"])
                    }, [
                      e("div", Ir, [
                        r.value.batchMode ? (s(), o("label", Rr, [
                          e("input", {
                            type: "checkbox",
                            checked: i.selected,
                            onChange: (d) => b("organizer-batch-select", i.id)
                          }, null, 40, Lr),
                          t[77] || (t[77] = e("span", null, "✓", -1))
                        ])) : y("", !0),
                        e("a", {
                          class: "fo-cover-link",
                          href: i.url,
                          target: "_blank",
                          rel: "noreferrer",
                          onClick: S((d) => b("organizer-play-video", i), ["prevent"])
                        }, [
                          e("img", {
                            loading: "lazy",
                            decoding: "async",
                            referrerpolicy: "no-referrer",
                            src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                            alt: ""
                          }, null, 8, Br)
                        ], 8, zr),
                        e("span", Ar, "▣ " + l(i.playCount), 1),
                        e("span", Nr, l(i.duration), 1)
                      ]),
                      e("div", Vr, [
                        e("a", {
                          class: "fo-title-link fo-bili-title",
                          href: i.url,
                          target: "_blank",
                          rel: "noreferrer",
                          onClick: S((d) => b("organizer-play-video", i), ["prevent"])
                        }, l(i.title), 9, Ur),
                        e("button", {
                          class: "fo-card-more",
                          type: "button",
                          "aria-label": "更多操作",
                          "aria-expanded": z.value === i.id,
                          onClick: S((d) => st(i.id), ["stop"])
                        }, "⋮", 8, Gr),
                        z.value === i.id ? (s(), o("div", Fr, [
                          i.writable ? (s(), o("button", {
                            key: 0,
                            type: "button",
                            class: "danger",
                            onClick: (d) => nt(i.id, "delete")
                          }, "取消收藏", 8, Or)) : y("", !0),
                          i.writable ? (s(), o("button", {
                            key: 1,
                            type: "button",
                            onClick: (d) => nt(i.id, "move")
                          }, "移动到", 8, qr)) : y("", !0),
                          e("button", {
                            type: "button",
                            onClick: (d) => nt(i.id, "subtitle")
                          }, "字幕", 8, Hr)
                        ])) : y("", !0)
                      ]),
                      e("div", Yr, [
                        e("span", {
                          class: "fo-bili-author clickable",
                          title: "点击查看 UP 主详情与近期投稿",
                          onClick: S((d) => D(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                        }, l(i.author), 9, Wr),
                        e("span", null, "收藏于 " + l(i.favoriteDate), 1)
                      ])
                    ], 42, Er))), 128))
                  ]),
                  r.value.totalPages > 1 ? (s(), o("div", jr, [
                    e("button", {
                      type: "button",
                      class: "fo-btn",
                      disabled: r.value.page <= 1,
                      onClick: t[21] || (t[21] = (i) => b("organizer-page", r.value.page - 1))
                    }, "‹ 上一页", 8, Xr),
                    e("span", Kr, l(r.value.page) + " / " + l(r.value.totalPages), 1),
                    e("button", {
                      type: "button",
                      class: "fo-btn",
                      disabled: r.value.page >= r.value.totalPages,
                      onClick: t[22] || (t[22] = (i) => b("organizer-page", r.value.page + 1))
                    }, "下一页 ›", 8, Qr)
                  ])) : y("", !0)
                ], 64))
              ], 64))
            ])) : r.value.mode === "cache" ? (s(), o("section", Jr, [
              _.value ? (s(), Qe(Ro, {
                key: 0,
                active: n(C),
                onBack: t[23] || (t[23] = (i) => _.value = !1)
              }, null, 8, ["active"])) : (s(), o(N, { key: 1 }, [
                e("header", Zr, [
                  e("div", eu, [
                    t[79] || (t[79] = e("div", { class: "fo-bili-cover" }, "💾", -1)),
                    e("div", tu, [
                      t[78] || (t[78] = e("h3", null, "缓存视频", -1)),
                      e("p", null, l(r.value.cachedVideos.length) + " 个缓存记录 · 点击缓存设置管理存放目录", 1)
                    ])
                  ]),
                  e("div", iu, [
                    e("button", {
                      type: "button",
                      class: "primary",
                      onClick: t[24] || (t[24] = (i) => b("organizer-open"))
                    }, "返回收藏夹"),
                    e("button", {
                      type: "button",
                      onClick: t[25] || (t[25] = (i) => _.value = !0)
                    }, "缓存设置")
                  ])
                ]),
                r.value.cacheLoading ? (s(), o("div", su, [...t[80] || (t[80] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取本地缓存…", -1)
                ])])) : (s(), o("div", ou, [
                  r.value.cachedVideos.length ? y("", !0) : (s(), o("p", nu, "还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。")),
                  (s(!0), o(N, null, X(r.value.cachedVideos, (i) => (s(), o("article", {
                    key: i.id,
                    class: "fo-bili-card fo-cached-video-card"
                  }, [
                    e("div", lu, [
                      e("button", {
                        class: "fo-cached-play",
                        type: "button",
                        onClick: (d) => b("cache-play", i.id)
                      }, [
                        e("img", {
                          loading: "lazy",
                          referrerpolicy: "no-referrer",
                          src: i.cover,
                          alt: ""
                        }, null, 8, ru),
                        t[81] || (t[81] = e("span", { class: "fo-cached-local-badge" }, "LOCAL", -1))
                      ], 8, au)
                    ]),
                    e("div", uu, [
                      e("button", {
                        class: "fo-title-link fo-bili-title fo-cached-title",
                        type: "button",
                        onClick: (d) => b("cache-play", i.id)
                      }, l(i.title), 9, du),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "删除缓存",
                        onClick: (d) => b("cache-delete", i.id)
                      }, "×", 8, cu)
                    ]),
                    e("div", pu, [
                      e("span", null, l(i.sizeText), 1),
                      e("span", null, "缓存于 " + l(i.cachedDate), 1)
                    ])
                  ]))), 128))
                ]))
              ], 64))
            ])) : r.value.mode === "recommendations" ? (s(), o("section", bu, [
              e("header", vu, [
                t[82] || (t[82] = e("div", { class: "fo-bili-cover fo-vue-recommend-cover" }, [
                  e("span", null, "✨")
                ], -1)),
                e("div", fu, [
                  e("div", gu, [
                    e("h3", null, l(r.value.specialTitle), 1),
                    e("span", mu, l(r.value.specialBadge), 1)
                  ]),
                  e("p", null, l(r.value.specialSubtitle), 1)
                ]),
                e("div", hu, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !r.value.specialVideos.length,
                    onClick: t[26] || (t[26] = (i) => b("special-play-page"))
                  }, "▶ 播放本页", 8, yu),
                  e("button", {
                    type: "button",
                    onClick: t[27] || (t[27] = (i) => b("recommendations-refresh"))
                  }, "↻ 换一批"),
                  e("button", {
                    type: "button",
                    onClick: t[28] || (t[28] = (i) => b("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", _u, [
                t[83] || (t[83] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "🔥 猜你喜欢与热门精选")
                ], -1)),
                e("div", ku, "本页共 " + l(r.value.specialVideos.length) + " 个视频", 1)
              ]),
              r.value.specialLoading ? (s(), o("div", wu, [...t[84] || (t[84] = [
                e("i", null, null, -1),
                e("span", null, "正在加载个性化推荐视频…", -1)
              ])])) : r.value.specialError ? (s(), o("p", $u, l(r.value.specialError), 1)) : (s(), o("div", Cu, [
                r.value.specialVideos.length ? y("", !0) : (s(), o("p", xu, "暂无推荐视频。")),
                (s(!0), o(N, null, X(r.value.specialVideos, (i) => (s(), o("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (d) => lt(d, i)
                }, [
                  e("div", Tu, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: S((d) => b("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                        alt: ""
                      }, null, 8, Mu)
                    ], 8, Pu),
                    e("span", Du, "▣ " + l(i.playCount), 1),
                    e("span", Eu, l(i.duration), 1)
                  ]),
                  e("div", Iu, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: S((d) => b("special-play-video", i), ["prevent"])
                    }, l(i.title), 9, Ru),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": z.value === i.id,
                      onClick: S((d) => st(i.id), ["stop"])
                    }, "⋮", 8, Lu),
                    z.value === i.id ? (s(), o("div", zu, [
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { video: i, id: i.id, action: "collect-inbox" }), z.value = "";
                        }
                      }, "📥 添加到收集箱", 8, Bu),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { id: i.id, action: "play" }), z.value = "";
                        }
                      }, "本地播放与评论", 8, Au),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { id: i.id, action: "subtitle" }), z.value = "";
                        }
                      }, "字幕提取", 8, Nu),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { id: i.id, action: "cache" }), z.value = "";
                        }
                      }, "缓存视频", 8, Vu),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { id: i.id, action: "open" }), z.value = "";
                        }
                      }, "打开网页", 8, Uu)
                    ])) : y("", !0)
                  ]),
                  e("div", Gu, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: S((d) => D(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, l(i.author), 9, Fu),
                    e("span", null, l(i.favoriteDate), 1)
                  ])
                ], 40, Su))), 128))
              ]))
            ])) : r.value.mode === "following" ? (s(), o("section", Ou, [
              e("header", qu, [
                t[85] || (t[85] = e("div", { class: "fo-bili-cover fo-vue-following-cover" }, [
                  e("span", null, "📺")
                ], -1)),
                e("div", Hu, [
                  e("div", Yu, [
                    e("h3", null, l(r.value.specialTitle), 1),
                    e("span", Wu, l(r.value.specialBadge), 1)
                  ]),
                  e("p", null, l(r.value.specialSubtitle), 1)
                ]),
                e("div", ju, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !r.value.specialVideos.length,
                    onClick: t[29] || (t[29] = (i) => b("special-play-page"))
                  }, "▶ 播放本页", 8, Xu),
                  e("button", {
                    type: "button",
                    onClick: t[30] || (t[30] = (i) => b("following-refresh"))
                  }, "↻"),
                  e("button", {
                    type: "button",
                    onClick: t[31] || (t[31] = (i) => b("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", Ku, [
                e("div", Qu, [
                  (s(!0), o(N, null, X(r.value.followingGroups, (i) => (s(), o("button", {
                    key: i.id,
                    type: "button",
                    class: A(["fo-up-group-chip", { active: i.active }]),
                    onClick: (d) => b("following-group", i.id)
                  }, [
                    ye(l(i.child ? "↳ " : "") + l(i.name) + " ", 1),
                    e("small", Zu, l(i.count), 1)
                  ], 10, Ju))), 128))
                ]),
                e("div", ed, [
                  e("button", {
                    type: "button",
                    onClick: t[32] || (t[32] = (i) => b("following-manage-groups", "create"))
                  }, "＋ 新建分组"),
                  e("button", {
                    type: "button",
                    onClick: t[33] || (t[33] = (i) => b("following-manage-groups", "manage"))
                  }, "⚙️ 管理分组")
                ])
              ]),
              r.value.followingMembers.length ? (s(), o("div", td, [
                e("div", id, [
                  e("b", null, l(r.value.specialBadge), 1),
                  e("small", null, "共 " + l(r.value.followingMembers.length) + " 位 UP 主", 1)
                ]),
                e("div", sd, [
                  e("button", {
                    type: "button",
                    class: A(["fo-up-member-chip", { active: !r.value.followingMembers.some((i) => i.active) }]),
                    onClick: t[34] || (t[34] = (i) => b("following-member", ""))
                  }, "全部UP", 2),
                  (s(!0), o(N, null, X(r.value.followingMembers, (i) => (s(), o("button", {
                    key: i.id,
                    type: "button",
                    class: A(["fo-up-member-chip", { active: i.active }]),
                    title: `左键筛选「${i.name}」，右键预览近期投稿`,
                    onClick: (d) => b("following-member", i.id),
                    onContextmenu: S((d) => b("following-preview-member", { id: i.id, clientX: d.clientX, clientY: d.clientY }), ["prevent"])
                  }, [
                    i.face ? (s(), o("img", {
                      key: 0,
                      loading: "lazy",
                      referrerpolicy: "no-referrer",
                      src: i.face,
                      alt: ""
                    }, null, 8, nd)) : y("", !0),
                    e("span", null, l(i.name), 1)
                  ], 42, od))), 128))
                ]),
                e("button", {
                  type: "button",
                  class: "fo-btn-manage-members",
                  onClick: t[35] || (t[35] = (i) => b("following-manage-groups", "members"))
                }, "＋ 管理成员")
              ])) : y("", !0),
              e("div", ld, [
                t[86] || (t[86] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "⚡ UP 主最新投稿动态")
                ], -1)),
                e("div", ad, "本页共 " + l(r.value.specialVideos.length) + " 个视频", 1)
              ]),
              r.value.specialLoading ? (s(), o("div", rd, [...t[87] || (t[87] = [
                e("i", null, null, -1),
                e("span", null, "正在读取关注 UP 主更新…", -1)
              ])])) : r.value.specialError ? (s(), o("p", ud, l(r.value.specialError), 1)) : (s(), o("div", dd, [
                r.value.specialVideos.length ? y("", !0) : (s(), o("p", cd, "暂无最新关注视频动态。")),
                (s(!0), o(N, null, X(r.value.specialVideos, (i) => (s(), o("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (d) => lt(d, i)
                }, [
                  e("div", bd, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: S((d) => b("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, fd)
                    ], 8, vd),
                    e("span", gd, "▣ " + l(i.playCount), 1),
                    e("span", md, l(i.duration), 1)
                  ]),
                  e("div", hd, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: S((d) => b("special-play-video", i), ["prevent"])
                    }, l(i.title), 9, yd),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": z.value === i.id,
                      onClick: S((d) => st(i.id), ["stop"])
                    }, "⋮", 8, _d),
                    z.value === i.id ? (s(), o("div", kd, [
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { video: i, id: i.id, action: "play" }), z.value = "";
                        }
                      }, "本地播放与评论", 8, wd),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { video: i, id: i.id, action: "subtitle" }), z.value = "";
                        }
                      }, "字幕提取", 8, $d),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { video: i, id: i.id, action: "cache" }), z.value = "";
                        }
                      }, "缓存视频", 8, Cd),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { video: i, id: i.id, action: "open" }), z.value = "";
                        }
                      }, "打开网页", 8, xd)
                    ])) : y("", !0)
                  ]),
                  e("div", Sd, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: S((d) => D(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, l(i.author), 9, Td),
                    e("span", null, l(i.favoriteDate), 1)
                  ])
                ], 40, pd))), 128))
              ])),
              e("div", Pd, [
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: r.value.specialLoading || r.value.specialPage <= 1,
                  onClick: t[36] || (t[36] = (i) => b("following-page", r.value.specialPage - 1))
                }, "‹ 上一页", 8, Md),
                e("span", Dd, "第 " + l(r.value.specialPage) + " 页", 1),
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: r.value.specialLoading || !r.value.followingHasMore,
                  onClick: t[37] || (t[37] = (i) => b("following-page", r.value.specialPage + 1))
                }, "下一页 ›", 8, Ed)
              ])
            ])) : r.value.mode === "subscription" ? (s(), o("section", Id, [
              e("div", Rd, [
                $e(Ci, { "show-back": "" }),
                r.value.subscriptionLoading ? (s(), o("div", Ld, [...t[88] || (t[88] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取订阅视频与 AI 字幕稿…", -1)
                ])])) : r.value.subscriptionError ? (s(), o("p", zd, "读取失败：" + l(r.value.subscriptionError), 1)) : (s(), o("div", Bd, [
                  $e(Ws),
                  $e(Wi)
                ]))
              ])
            ])) : r.value.mode === "radio" ? (s(), o("section", Ad, [
              e("header", Nd, [
                t[89] || (t[89] = e("div", { class: "fo-hero-left" }, [
                  e("div", { class: "fo-bili-cover fo-vue-radio-cover" }, [
                    e("span", null, "📻")
                  ]),
                  e("div", { class: "fo-hero-folder-info" }, [
                    e("h3", null, "B站电台"),
                    e("p", null, "从左侧选择收藏夹，将视频拖拽或添加到连播队列，自由编排系列随心听")
                  ])
                ], -1)),
                e("div", Vd, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    onClick: t[38] || (t[38] = (i) => b("radio-refresh"))
                  }, "↻ 刷新电台"),
                  e("button", {
                    type: "button",
                    onClick: t[39] || (t[39] = (i) => b("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", Ud, [
                e("aside", Gd, [
                  t[90] || (t[90] = e("p", { class: "sw-title" }, "收藏夹", -1)),
                  e("div", Fd, [
                    (s(!0), o(N, null, X(n(I).radioFolders, (i) => (s(), o("button", {
                      key: i.id,
                      type: "button",
                      class: A(["bili-radio-folder", { on: i.id === n(I).radioActiveFolderId }]),
                      onClick: (d) => b("radio-select-folder", i.id)
                    }, [
                      e("span", null, l(i.title), 1),
                      e("span", null, l(i.count), 1)
                    ], 10, Od))), 128)),
                    n(I).radioFolders.length ? y("", !0) : (s(), o("p", qd, l(n(I).radioLoading ? "加载中…" : "暂无收藏夹"), 1))
                  ])
                ]),
                e("section", Hd, [
                  t[92] || (t[92] = e("p", {
                    id: "bili-radio-library-title",
                    class: "sw-title"
                  }, "收藏夹视频", -1)),
                  n(I).radioError ? (s(), o("p", Yd, l(n(I).radioError), 1)) : y("", !0),
                  e("div", Wd, [
                    (s(!0), o(N, null, X(n(I).radioVideos, (i) => (s(), o("button", {
                      key: i.bvid,
                      type: "button",
                      class: "bili-radio-video",
                      title: `${i.title} (点击加入连播队列，或按住拖拽封面到下方卡带机直接播放)`,
                      draggable: "true",
                      onDragstart: (d) => Rt(d, i),
                      onClick: (d) => b("radio-add", { bvid: i.bvid, title: i.title, cover: i.cover, author: i.author, duration: i.duration })
                    }, [
                      i.cover ? (s(), o("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Xd)) : (s(), o("span", Kd)),
                      e("p", null, l(i.title), 1),
                      t[91] || (t[91] = e("span", null, "＋", -1))
                    ], 40, jd))), 128)),
                    n(I).radioVideos.length ? y("", !0) : (s(), o("p", Qd, l(n(I).radioLoading ? "读取视频中…" : "此收藏夹暂无可播放视频"), 1))
                  ])
                ]),
                e("section", Jd, [
                  e("div", Zd, [
                    be(e("input", {
                      id: "bili-radio-name",
                      "onUpdate:modelValue": t[40] || (t[40] = (i) => n(I).radioSeriesName = i),
                      maxlength: "48",
                      class: A({ "has-error": c.value }),
                      placeholder: c.value ? "⚠️ 请在此输入系列名称后再保存！" : "请输入系列名称（必填）",
                      autocomplete: "off",
                      onInput: t[41] || (t[41] = (i) => c.value = !1),
                      onKeydown: Be(S(w, ["prevent"]), ["enter"])
                    }, null, 42, ec), [
                      [Te, n(I).radioSeriesName]
                    ]),
                    e("div", tc, [
                      e("button", {
                        id: "bili-radio-save",
                        type: "button",
                        title: "保存当前队列为系列",
                        onClick: w
                      }, " 💾 保存系列 "),
                      e("button", {
                        id: "bili-radio-rename",
                        type: "button",
                        title: "重命名当前系列",
                        onClick: f
                      }, " ✏️ 重命名 "),
                      $e(Ct, {
                        id: "bili-radio-share",
                        compact: "",
                        label: "🚀 分享",
                        visible: !0,
                        onSelect: Dt
                      })
                    ]),
                    e("div", ic, [
                      e("select", {
                        class: "bili-radio-series-select",
                        title: "快速切换已保存的系列",
                        onChange: P
                      }, [
                        e("option", sc, l(n(I).radioSeries.length ? `📚 已保存系列 (${n(I).radioSeries.length})` : "📚 暂无保存系列"), 1),
                        (s(!0), o(N, null, X(n(I).radioSeries, (i) => (s(), o("option", {
                          key: i.id,
                          value: i.id
                        }, l(i.name) + " (" + l(i.count) + "首) ", 9, oc))), 128)),
                        t[93] || (t[93] = e("option", {
                          value: "__create_new__",
                          class: "bili-radio-create-opt"
                        }, " ＋ 创建系列 ", -1))
                      ], 32)
                    ])
                  ]),
                  e("div", nc, [
                    (s(!0), o(N, null, X(n(I).radioQueue, (i, d) => (s(), o("div", {
                      key: `${i.bvid}-${d}`,
                      class: A(["bili-radio-queue-item", { "is-playing": n(j).active && n(j).trackIndex === d + 1 }]),
                      title: "点击立即从该曲目开始播放",
                      onClick: (L) => b("radio-play-index", d)
                    }, [
                      e("span", ac, l(n(j).active && n(j).trackIndex === d + 1 ? "♪" : d + 1), 1),
                      i.cover ? (s(), o("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, rc)) : (s(), o("span", uc)),
                      e("p", null, l(i.title), 1),
                      e("button", {
                        type: "button",
                        class: "bili-radio-remove",
                        "aria-label": `移除 ${i.title}`,
                        onClick: S((L) => b("radio-remove", { index: d }), ["stop"])
                      }, "×", 8, dc)
                    ], 10, lc))), 128)),
                    n(I).radioQueue.length ? y("", !0) : (s(), o("p", cc, "点击左侧视频加入连播队列。"))
                  ]),
                  e("div", pc, [
                    e("button", {
                      id: "bili-radio-play",
                      type: "button",
                      disabled: !n(I).radioQueue.length,
                      onClick: t[42] || (t[42] = (i) => b("radio-play"))
                    }, "▶ 按顺序播放", 8, bc),
                    e("button", {
                      id: "bili-radio-shuffle",
                      type: "button",
                      disabled: !n(I).radioQueue.length,
                      onClick: t[43] || (t[43] = (i) => b("radio-shuffle"))
                    }, "🔀 随机播放", 8, vc),
                    e("button", {
                      id: "bili-radio-clear",
                      type: "button",
                      onClick: t[44] || (t[44] = (i) => b("radio-clear"))
                    }, "清空编辑区")
                  ])
                ])
              ]),
              n(ot) || n(ct).activeId === "daily-bilibili" ? y("", !0) : (s(), Qe(St, { key: 0 }))
            ])) : y("", !0)
          ], 34)
        ])
      ]),
      n(ot) || n(ct).activeId === "daily-bilibili" ? (s(), Qe(St, {
        key: 0,
        "dock-side": ""
      })) : y("", !0),
      t[105] || (t[105] = e("div", {
        class: "fm-pane",
        id: "pane-sub-video",
        hidden: "",
        style: { display: "none !important" }
      }, null, -1)),
      $e(_o),
      $e(Bn),
      W.value.visible && W.value.video ? (s(), o("div", {
        key: 1,
        ref_key: "videoMenuRef",
        ref: Q,
        class: "fo-context-menu",
        role: "menu",
        style: Pe(n(Y)),
        onClick: t[53] || (t[53] = S(() => {
        }, ["stop"]))
      }, [
        e("div", {
          class: "fo-context-header",
          title: W.value.video.title
        }, l(W.value.video.title), 9, fc),
        $e(Ct, {
          label: "💬 发送到聊天室",
          "match-menu-item": "",
          visible: W.value.visible,
          onSelect: Et
        }, null, 8, ["visible"]),
        t[102] || (t[102] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[45] || (t[45] = (i) => Le("play"))
        }, [...t[94] || (t[94] = [
          e("span", { class: "fo-context-icon" }, "▶", -1),
          ye(" 小窗播放视频 ", -1)
        ])]),
        t[103] || (t[103] = e("div", { class: "fo-context-divider" }, null, -1)),
        W.value.video.writable ? (s(), o("button", {
          key: 0,
          type: "button",
          class: "fo-context-item danger",
          onClick: t[46] || (t[46] = (i) => Le("delete"))
        }, [...t[95] || (t[95] = [
          e("span", { class: "fo-context-icon" }, "🗑", -1),
          ye(" 取消收藏 ", -1)
        ])])) : y("", !0),
        W.value.video.writable ? (s(), o("button", {
          key: 1,
          type: "button",
          class: "fo-context-item",
          onClick: t[47] || (t[47] = (i) => Le("move"))
        }, [...t[96] || (t[96] = [
          e("span", { class: "fo-context-icon" }, "📁", -1),
          ye(" 移动到… ", -1)
        ])])) : y("", !0),
        W.value.video.writable ? (s(), o("div", gc)) : y("", !0),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[48] || (t[48] = (i) => Le("open"))
        }, [...t[97] || (t[97] = [
          e("span", { class: "fo-context-icon" }, "↗", -1),
          ye(" 跳转到 B站 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[49] || (t[49] = (i) => Le("copy-link"))
        }, [...t[98] || (t[98] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ye(" 复制链接 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[50] || (t[50] = (i) => Le("cache"))
        }, [...t[99] || (t[99] = [
          e("span", { class: "fo-context-icon" }, "💾", -1),
          ye(" 缓存视频 ", -1)
        ])]),
        t[104] || (t[104] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[51] || (t[51] = (i) => Le("create-task"))
        }, [...t[100] || (t[100] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ye(" 创建任务 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[52] || (t[52] = (i) => Le("subtitle"))
        }, [...t[101] || (t[101] = [
          e("span", { class: "fo-context-icon" }, "▤", -1),
          ye(" 字幕转文本 ", -1)
        ])])
      ], 4)) : y("", !0),
      (s(), Qe(At, { to: "body" }, [
        $e(Bl)
      ]))
    ], 2));
  }
}), Bc = /* @__PURE__ */ Ee(mc, [["__scopeId", "data-v-55fd0f04"]]);
export {
  Bc as default
};
