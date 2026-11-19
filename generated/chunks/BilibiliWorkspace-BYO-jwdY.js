import { d as Me, f as s, g as o, h as e, t as l, u as n, s as L, m as re, F as B, i as W, j as y, C as ke, k as S, x as Q, w as oe, o as tt, e as Et, p as ue, v as Se, q as Ee, b as T, y as gt, P as xt, H as Rt, n as ye, L as Ut, A as mt, z as pt, l as bt } from "./vendor-vue-BbmU9NUg.js";
import { a as R, b as Re, c as Ze, s as Ot, f as qt } from "./bili-favorites-store-DfqXmCQp.js";
import { b as St, k as _e, n as We, a as Je } from "./github.service-DdJVB3Fj.js";
import "./fullscreen-cards.store-DUhgMhfT.js";
import { u as Ht } from "./useCardActivity-CM0pgPQ4.js";
import { _ as ze, t as A } from "./_plugin-vue_export-helper-CP_tFnee.js";
import { B as et } from "./BiliRichText-BFeuZRx0.js";
import { d as Wt, a as Kt } from "./playback-sync-DX-fm1d8.js";
import { a as fe, d as vt, e as f, c as he, C as Tt } from "./ChatShareMenu-DFX5np4l.js";
import { g as jt, s as Yt } from "./cache-directory-CBBZXa5n.js";
import { u as Xt } from "./useMachine-DhSfBarp.js";
import { a as H, r as Ue } from "./radio-player-C73LVkPX.js";
import { A as Qt, B as Jt, g as ft, O as Zt, x as Pt } from "./search.service-B3Axreqn.js";
import { biliMessagePanelState as ei, biliMessagePanelController as ti } from "./message-panel-store-XVs-rbT6.js";
import { bilibiliChannelService as ge } from "./bilibili-channel.service-YdWu3jmZ.js";
import { u as ii } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DwclBqWw.js";
const si = { class: "bili-sub-header bili-sub-vue-header" }, oi = { class: "bili-sub-channel-info" }, li = { class: "bili-sub-vue-title-row" }, ni = { class: "bili-sub-title" }, ai = { class: "bili-sub-desc" }, ri = { class: "bili-sub-actions" }, ui = { class: "bili-sub-mode-icon" }, di = { class: "bili-sub-mode-text" }, ci = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, pi = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, bi = { class: "bili-sub-dropdown-panel" }, vi = { class: "bili-sub-dropdown-list" }, fi = ["onClick"], gi = { class: "bili-sub-item-text" }, mi = {
  key: 0,
  class: "bili-sub-item-check"
}, hi = { class: "bili-sub-dropdown-foot" }, yi = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, _i = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, ki = { class: "bili-sub-dropdown-panel bili-sub-video-dropdown-panel" }, $i = { class: "bili-sub-dropdown-title" }, wi = { class: "bili-sub-dropdown-list" }, Ci = ["title", "onClick"], xi = { class: "bili-sub-video-num" }, Si = { class: "bili-sub-item-text" }, Ti = {
  key: 0,
  class: "bili-sub-video-duration"
}, Pi = { class: "bili-sub-dropdown-foot" }, Mi = ["disabled"], Di = /* @__PURE__ */ Me({
  __name: "BiliSubscriptionHeader",
  props: {
    showBack: { type: Boolean }
  },
  setup(J) {
    function c(k, g) {
      Re.dispatch(k, g);
    }
    return (k, g) => (s(), o("header", si, [
      e("div", oi, [
        g[6] || (g[6] = e("img", {
          class: "bili-sub-avatar",
          src: "assets/bilibili.svg",
          alt: ""
        }, null, -1)),
        e("div", null, [
          e("div", li, [
            e("h3", ni, l(n(R).organizer.subscriptionTitle), 1)
          ]),
          e("p", ai, l(n(R).organizer.subscriptionSubtitle), 1)
        ])
      ]),
      e("div", ri, [
        e("button", {
          type: "button",
          class: L(["bili-sub-head-btn bili-sub-script-mode-btn", { "is-newspaper": n(R).organizer.subscriptionScriptMode === "newspaper" }]),
          onClick: g[0] || (g[0] = (P) => c("subscription-script-mode"))
        }, [
          e("span", ui, l(n(R).organizer.subscriptionScriptMode === "newspaper" ? "📰" : "📜"), 1),
          e("span", di, l(n(R).organizer.subscriptionScriptMode === "newspaper" ? "报纸模式" : "滚动台词"), 1)
        ], 2),
        e("details", ci, [
          e("summary", pi, [
            e("span", null, [
              g[7] || (g[7] = re("关注 UP 主：", -1)),
              e("b", null, l(n(R).organizer.subscriptionTitle), 1)
            ]),
            g[8] || (g[8] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", bi, [
            g[10] || (g[10] = e("div", { class: "bili-sub-dropdown-title" }, "已关注的 UP 主", -1)),
            e("div", vi, [
              (s(!0), o(B, null, W(n(R).organizer.subscriptionChannels, (P) => (s(), o("button", {
                key: P.id,
                type: "button",
                class: L(["bili-sub-dropdown-item", { active: P.active }]),
                onClick: (z) => c("subscription-channel", P.id)
              }, [
                g[9] || (g[9] = e("span", { class: "bili-sub-dot" }, null, -1)),
                e("span", gi, l(P.name), 1),
                P.active ? (s(), o("span", mi, "✓")) : y("", !0)
              ], 10, fi))), 128))
            ]),
            e("div", hi, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                onClick: g[1] || (g[1] = (P) => c("subscription-add-channel"))
              }, "＋ UP 主")
            ])
          ])
        ]),
        e("details", yi, [
          e("summary", _i, [
            e("span", null, [
              g[11] || (g[11] = re("视频 ", -1)),
              e("b", null, "(" + l(n(R).organizer.subscriptionVideos.length) + ")", 1)
            ]),
            g[12] || (g[12] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", ki, [
            e("div", $i, "最近投稿视频 (" + l(n(R).organizer.subscriptionVideos.length) + ")", 1),
            e("div", wi, [
              (s(!0), o(B, null, W(n(R).organizer.subscriptionVideos, (P, z) => (s(), o("button", {
                key: P.bvid,
                type: "button",
                class: L(["bili-sub-dropdown-item bili-sub-video-item", { active: P.active }]),
                title: P.title,
                onClick: (M) => c("subscription-video", P.bvid)
              }, [
                e("span", xi, l(z + 1) + ".", 1),
                e("span", Si, l(P.title), 1),
                P.duration ? (s(), o("small", Ti, l(P.duration), 1)) : y("", !0)
              ], 10, Ci))), 128))
            ]),
            e("div", Pi, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                disabled: n(R).organizer.subscriptionLoading,
                onClick: g[2] || (g[2] = (P) => c("subscription-load-more"))
              }, "继续获取", 8, Mi)
            ])
          ])
        ]),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: g[3] || (g[3] = (P) => c(n(R).organizer.showFullDescInRightPanel ? "subscription-copy-description" : "subscription-copy-script"))
        }, l(n(R).organizer.showFullDescInRightPanel ? "复制简介" : "复制稿子"), 1),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: g[4] || (g[4] = (P) => c("subscription-refresh"))
        }, "↻ 刷新"),
        J.showBack ? (s(), o("button", {
          key: 0,
          type: "button",
          class: "bili-sub-head-btn",
          onClick: g[5] || (g[5] = (P) => c("organizer-open"))
        }, "← 返回收藏夹")) : y("", !0)
      ])
    ]));
  }
}), Ii = /* @__PURE__ */ ze(Di, [["__scopeId", "data-v-3f587b61"]]), Ei = { class: "bili-sub-transcript-column bili-sub-vue-transcript-column" }, Ri = { class: "bili-sub-article-wrap" }, zi = { class: "bili-sub-transcript-body" }, Bi = {
  key: 0,
  class: "bili-sub-description-copy",
  title: "当前为放大简介视图"
}, Li = {
  key: 0,
  class: "muted"
}, Ai = {
  key: 0,
  class: "bili-sub-newspaper-list"
}, Ni = ["data-idx", "data-from", "data-to", "title", "onClick"], Vi = { class: "bili-sub-newspaper-header" }, Fi = { class: "bili-sub-newspaper-num" }, Gi = { class: "bili-sub-newspaper-heading" }, Ui = { class: "bili-sub-newspaper-title" }, Oi = { class: "bili-sub-newspaper-time" }, qi = ["onClick"], Hi = { class: "bili-sub-newspaper-content" }, Wi = ["data-from", "data-to", "title", "onClick"], Ki = {
  key: 1,
  class: "bili-sub-srt-list"
}, ji = ["data-idx", "data-from", "data-to", "title", "onClick"], Yi = { class: "bili-sub-srt-time" }, Xi = { class: "bili-sub-srt-text" }, Qi = {
  key: 2,
  class: "bili-sub-no-transcript-box"
}, Ji = {
  key: 2,
  class: "bili-sub-vue-empty-hint"
}, Zi = /* @__PURE__ */ Me({
  __name: "BiliSubscriptionTranscript",
  setup(J) {
    const c = Q(() => R.organizer), k = Q(() => c.value.subscriptionChapters.length > 0 || c.value.subscriptionCues.length > 0);
    function g(P, z) {
      Re.dispatch(P, z);
    }
    return (P, z) => (s(), o("section", Ei, [
      e("article", Ri, [
        e("div", zi, [
          c.value.showFullDescInRightPanel ? (s(), o("section", Bi, [
            e("header", null, [
              z[1] || (z[1] = e("h5", null, "视频简介", -1)),
              e("button", {
                type: "button",
                class: "bili-copy-desc-btn",
                title: "切回台词展示",
                onClick: z[0] || (z[0] = (M) => g("subscription-toggle-desc-panel"))
              }, "缩小简介")
            ]),
            (s(!0), o(B, null, W(c.value.subscriptionDescription, (M, r) => (s(), o("p", { key: r }, [
              ke(et, { text: M }, null, 8, ["text"])
            ]))), 128)),
            c.value.subscriptionDescription.length ? y("", !0) : (s(), o("p", Li, "该视频暂无可用的文字简介。"))
          ])) : (s(), o(B, { key: 1 }, [
            c.value.subscriptionScriptMode === "newspaper" && c.value.subscriptionChapters.length ? (s(), o("div", Ai, [
              (s(!0), o(B, null, W(c.value.subscriptionChapters, (M, r) => (s(), o("article", {
                key: `${M.from}:${r}`,
                class: "bili-sub-newspaper-section",
                "data-idx": r,
                "data-from": M.from,
                "data-to": M.to,
                title: `点击跳转至 ${M.fromText} 播放`,
                onClick: ($) => g("subscription-seek", { from: M.from, index: r, mode: "newspaper" })
              }, [
                e("header", Vi, [
                  e("span", Fi, l(String(r + 1).padStart(2, "0")), 1),
                  e("div", Gi, [
                    e("h4", Ui, l(M.title), 1),
                    e("span", Oi, "⏱ " + l(M.fromText) + " - " + l(M.toText), 1)
                  ]),
                  e("button", {
                    type: "button",
                    class: "bili-sub-newspaper-play-btn",
                    "aria-label": "从头播放此分段",
                    onClick: S(($) => g("subscription-seek", { from: M.from, index: r, mode: "newspaper" }), ["stop"])
                  }, "▶", 8, qi)
                ]),
                e("div", Hi, [
                  M.paragraphCues && M.paragraphCues.length ? (s(!0), o(B, { key: 0 }, W(M.paragraphCues, ($, w) => (s(), o("p", {
                    key: w,
                    class: "bili-sub-newspaper-p"
                  }, [
                    (s(!0), o(B, null, W($, (F, Y) => (s(), o("span", {
                      key: `${F.from}:${Y}`,
                      class: "bili-sub-newspaper-cue",
                      "data-from": F.from,
                      "data-to": F.to,
                      title: `点击跳转播放此句 (⏱ ${F.timeText || F.from + "s"})`,
                      onClick: S((U) => g("subscription-seek", { from: F.from, mode: "newspaper" }), ["stop"])
                    }, l(F.content), 9, Wi))), 128))
                  ]))), 128)) : (s(!0), o(B, { key: 1 }, W(M.paragraphs, ($, w) => (s(), o("p", {
                    key: w,
                    class: "bili-sub-newspaper-p"
                  }, l($), 1))), 128))
                ])
              ], 8, Ni))), 128))
            ])) : c.value.subscriptionCues.length ? (s(), o("div", Ki, [
              (s(!0), o(B, null, W(c.value.subscriptionCues, (M) => (s(), o("button", {
                key: `${M.from}:${M.index}`,
                type: "button",
                class: "bili-sub-srt-row",
                "data-idx": M.index,
                "data-from": M.from,
                "data-to": M.to,
                title: `点击跳转至 ${M.timeText}`,
                onClick: (r) => g("subscription-seek", { from: M.from, index: M.index, mode: "lyrics" })
              }, [
                e("span", Yi, l(M.timeText), 1),
                e("span", Xi, l(M.content), 1)
              ], 8, ji))), 128))
            ])) : (s(), o("div", Qi, [...z[2] || (z[2] = [
              e("div", { class: "bili-sub-no-transcript-icon" }, "🎙️", -1),
              e("h5", null, "暂无实时台词字幕", -1),
              e("p", { class: "muted" }, "当前视频暂无可用字幕稿。如需阅读完整文案，请点击左侧视频标题旁的“放大简介”。", -1)
            ])]))
          ], 64)),
          !c.value.showFullDescInRightPanel && !k.value && !c.value.subscriptionDescription.length ? (s(), o("p", Ji, "字幕不可用时仍可在左侧播放和查看评论。")) : y("", !0)
        ])
      ])
    ]));
  }
}), es = /* @__PURE__ */ ze(Zi, [["__scopeId", "data-v-d4a520da"]]), ts = { class: "bili-sub-player-column" }, is = {
  key: 0,
  class: "bili-sub-sticky-player"
}, ss = { class: "bili-sub-player-card" }, os = { class: "bili-sub-video-box" }, ls = ["poster", "hidden"], ns = ["src"], as = {
  key: 1,
  class: "bili-sub-video-loading"
}, rs = { class: "bili-sub-video-meta" }, us = { class: "bili-sub-video-meta-actions" }, ds = ["title"], cs = { class: "bili-sub-meta-stats" }, ps = { class: "bili-sub-meta-desc" }, bs = {
  class: "bili-sub-comments-section",
  id: "bili-sub-comments-section"
}, vs = { class: "bili-mini-comments-head" }, fs = { class: "bili-mini-comments-meta" }, gs = { class: "bili-mini-comments-count bili-sub-comments-count" }, ms = { class: "bili-mini-comments-sort" }, hs = { class: "bili-sub-comment-composer" }, ys = ["onKeydown"], _s = ["disabled"], ks = {
  key: 0,
  class: "bili-sub-emote-picker"
}, $s = {
  key: 0,
  class: "fo-bili-loading"
}, ws = { key: 1 }, Cs = ["title", "onClick"], xs = ["src", "alt"], Ss = { key: 1 }, Ts = { class: "bili-mini-comments-body bili-sub-comments-body" }, Ps = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, Ms = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, Ds = ["src"], Is = { class: "bili-comment-main" }, Es = { class: "bili-comment-user-row" }, Rs = { class: "bili-comment-uname" }, zs = {
  key: 0,
  class: "bili-comment-level"
}, Bs = { class: "bili-comment-time" }, Ls = { class: "bili-comment-text" }, As = {
  key: 0,
  class: "bili-comment-pictures"
}, Ns = ["href", "onClick"], Vs = ["src"], Fs = { class: "bili-comment-actions" }, Gs = { key: 0 }, Us = { key: 1 }, Os = {
  key: 1,
  class: "bili-comment-sub-list"
}, qs = { class: "bili-comment-sub-uname" }, Hs = { class: "bili-comment-sub-more" }, Ws = ["disabled", "onClick"], Ks = ["disabled", "onClick"], js = ["onClick"], Ys = { class: "bili-sub-comments-infinite-trigger" }, Xs = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0" }
}, Qs = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0", opacity: "0.6" }
}, Js = {
  key: 1,
  class: "fo-bili-empty"
}, Zs = /* @__PURE__ */ Me({
  __name: "BiliSubscriptionPlayer",
  setup(J) {
    const c = Q(() => R.organizer.subscriptionCurrent), k = T(null), g = T(!1), P = T(!1), z = T(""), M = T(""), r = T(1), $ = T(1), w = T([]), F = T("0 条"), Y = T(!1), U = T(!1), O = T(""), ne = T(!1), X = T(""), Ce = T(null), ae = T(!1), K = T(""), j = T(!1), de = T(!1), xe = T(!1), se = T([]);
    let $e = null, Te = null;
    function ce(C, h = !1) {
      K.value = C, j.value = h, $e && clearTimeout($e), $e = setTimeout(() => {
        K.value = "";
      }, 3500);
    }
    function Be() {
      Re.dispatch("subscription-open-player");
    }
    function m() {
      Re.dispatch("subscription-toggle-desc-panel");
    }
    function pe(C) {
      const h = C.currentTarget;
      h && h.scrollHeight - h.scrollTop - h.clientHeight < 180 && !U.value && ne.value && le();
    }
    function I(C, h) {
      const p = C[h];
      p && window.open(p, "_blank", "noopener,noreferrer");
    }
    function b(C, h) {
      if (!C) return [];
      if (!h || h.size === 0)
        return [{ type: "text", text: C }];
      const p = /\[([^\]]+)\]/g, x = [];
      let N = 0, V;
      for (; (V = p.exec(C)) !== null; ) {
        V.index > N && x.push({ type: "text", text: C.slice(N, V.index) });
        const q = V[0], ee = h.get(q);
        ee ? x.push({ type: "emote", text: q, url: ee }) : x.push({ type: "text", text: q }), N = p.lastIndex;
      }
      return N < C.length && x.push({ type: "text", text: C.slice(N) }), x;
    }
    function G(C) {
      if (!C) return "";
      const h = new Date(C * 1e3), p = /* @__PURE__ */ new Date(), x = Math.floor((p.getTime() - h.getTime()) / 1e3);
      if (x < 60) return "刚刚";
      if (x < 3600) return `${Math.floor(x / 60)} 分钟前`;
      if (x < 86400) return `${Math.floor(x / 3600)} 小时前`;
      const N = h.getFullYear(), V = String(h.getMonth() + 1).padStart(2, "0"), q = String(h.getDate()).padStart(2, "0");
      return N === p.getFullYear() ? `${V}-${q}` : `${N}-${V}-${q}`;
    }
    function Z(C) {
      return C ? C >= 1e4 ? (C / 1e4).toFixed(1).replace(/\.0$/, "") + "万" : String(C) : "0";
    }
    async function _(C = !1) {
      if (M.value) {
        C ? U.value = !0 : (Y.value = !0, O.value = "");
        try {
          const h = `https://api.bilibili.com/x/v2/reply?type=1&oid=${M.value}&pn=${$.value}&ps=20&sort=${r.value}`, x = await (await fetch(h, { credentials: "include" })).json();
          if (x?.code !== 0 || !x?.data) {
            C || (O.value = x?.message || "评论加载失败或该视频已关闭评论", w.value = []), ne.value = !1;
            return;
          }
          const N = x.data, V = N.page?.count || 0;
          F.value = `${Z(V)} 条`;
          const ee = (Array.isArray(N.replies) ? N.replies : []).map((te) => {
            const Ne = /* @__PURE__ */ new Map();
            te.content?.emote && Object.entries(te.content.emote).forEach(([ve, He]) => {
              He?.url && Ne.set(ve, String(He.url).replace(/^http:/, "https:"));
            });
            const Ve = String(te.content?.message || ""), qe = Array.isArray(te.content?.pictures) ? te.content.pictures.map((ve) => String(ve?.img_src || ve).replace(/^http:/, "https:")).filter(Boolean) : [], Fe = Array.isArray(te.replies) ? te.replies.map((ve) => ({
              id: ve.rpid || Math.random(),
              userName: ve.member?.uname || "B站用户",
              message: String(ve.content?.message || "")
            })) : [];
            return {
              id: te.rpid || Math.random(),
              userName: te.member?.uname || "B站用户",
              avatar: String(te.member?.avatar || "").replace(/^http:/, "https:"),
              level: Number(te.member?.level_info?.current_level || 0),
              message: Ve,
              tokens: b(Ve, Ne),
              timeStr: G(te.ctime),
              likeCount: Number(te.like || 0),
              replyCount: Number(te.rcount || 0),
              pictures: qe,
              replies: Fe
            };
          });
          C ? w.value = [...w.value, ...ee] : w.value = ee, ne.value = w.value.length < V;
        } catch (h) {
          C || (O.value = h?.message || "网络异常，未能加载评论");
        } finally {
          Y.value = !1, U.value = !1;
        }
      }
    }
    async function u(C) {
      const h = w.value.find((p) => String(p.id) === String(C));
      if (!(!h || h.subRepliesLoading || !M.value)) {
        h.subRepliesPage ? h.subRepliesPage++ : h.subRepliesPage = 1, h.subRepliesLoading = !0, h.subRepliesExpanded = !0;
        try {
          const p = await St.getSubReplies(M.value, C, h.subRepliesPage, 10), x = (p.replies || []).map((q) => ({
            id: String(q.rpid),
            userName: q.uname,
            message: q.message
          })), N = new Set((h.replies || []).map((q) => String(q.id))), V = x.filter((q) => !N.has(String(q.id)));
          h.replies = [...h.replies || [], ...V], h.subRepliesHasMore = p.hasMore;
        } catch {
          ce("子回复加载失败", !0);
        } finally {
          h.subRepliesLoading = !1;
        }
      }
    }
    function v(C) {
      const h = w.value.find((p) => String(p.id) === String(C));
      h && (h.subRepliesExpanded = !1);
    }
    function E(C) {
      r.value !== C && (r.value = C, $.value = 1, _(!1));
    }
    function le() {
      U.value || !ne.value || ($.value += 1, _(!0));
    }
    async function Le() {
      if (de.value = !de.value, de.value && !se.value.length && !xe.value) {
        xe.value = !0;
        try {
          const h = await (await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", { credentials: "include" })).json();
          h?.code === 0 && Array.isArray(h?.data?.packages) && (se.value = h.data.packages.filter((p) => Array.isArray(p.emote) && p.emote.length).map((p) => ({
            text: p.text || "B站表情",
            emote: p.emote.map((x) => ({
              text: x.text || "",
              url: String(x.url || "").replace(/^http:/, "https:")
            }))
          })));
        } catch {
        } finally {
          xe.value = !1;
        }
      }
    }
    function Ke(C) {
      const h = Ce.value;
      if (!h)
        X.value += C;
      else {
        const p = h.selectionStart ?? h.value.length, x = h.selectionEnd ?? p;
        X.value = X.value.slice(0, p) + C + X.value.slice(x), gt(() => {
          h.focus();
          const N = p + C.length;
          h.setSelectionRange(N, N);
        });
      }
      de.value = !1;
    }
    async function Ae() {
      const C = X.value.trim();
      if (!C) {
        ce("请输入评论内容", !0);
        return;
      }
      if (!M.value) {
        ce("未能识别视频 ID，无法发表评论", !0);
        return;
      }
      const h = window.getBiliJct;
      let p = "";
      if (typeof h == "function")
        p = await h();
      else
        try {
          p = (await window.chrome?.cookies?.get?.({ url: "https://api.bilibili.com", name: "bili_jct" }))?.value || "";
        } catch {
          p = "";
        }
      if (!p) {
        ce("未检测到 B站 登录态，请先登录 bilibili.com", !0);
        return;
      }
      ae.value = !0;
      try {
        const x = new URLSearchParams({
          oid: String(M.value),
          type: "1",
          message: C,
          plat: "1",
          csrf: p,
          csrf_token: p
        }), V = await (await fetch("https://api.bilibili.com/x/v2/reply/add", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: x.toString()
        })).json();
        V?.code === 0 ? (X.value = "", ce("✓ 评论发表成功！", !1), $.value = 1, _(!1)) : ce(`❌ 发送失败：${V?.message || V?.code}`, !0);
      } catch (x) {
        ce(`❌ 发送出错：${x?.message || "网络异常"}`, !0);
      } finally {
        ae.value = !1;
      }
    }
    async function Oe(C) {
      if (!C?.bvid) return;
      if (typeof document < "u" && (document.querySelectorAll("video, audio").forEach((p) => {
        if (p !== k.value && !p.paused)
          try {
            p.pause();
          } catch {
          }
      }), document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((p) => {
        try {
          p.pause();
        } catch {
        }
      })), k.value && !k.value.paused)
        try {
          k.value.pause();
        } catch {
        }
      g.value = !0, P.value = !1, z.value = "";
      let h = C.aid;
      if (!h)
        try {
          const x = await (await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${C.bvid}`, { credentials: "include" })).json();
          x?.data?.aid && (h = x.data.aid);
        } catch {
        }
      M.value = h || "", $.value = 1, _(!1);
      try {
        const p = await St.resolvePlayStream(C);
        if (p?.sources?.length) {
          k.value && (typeof document < "u" && document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((x) => {
            try {
              x.pause();
            } catch {
            }
          }), k.value.src = p.sources[0], k.value.play().catch(() => {
          }), Kt({ bvid: C.bvid, title: C.title, cover: C.cover }, k.value)), g.value = !1;
          return;
        }
      } catch (p) {
        console.warn("[BiliSubscriptionPlayer] 本地视频流解析失败，使用 iframe 备用:", p);
      }
      P.value = !0, z.value = `https://player.bilibili.com/player.html?bvid=${C.bvid}&autoplay=1&danmaku=0`, g.value = !1;
    }
    let De = null, be = null;
    function we(C) {
      const h = C.closest(".bili-sub-transcript-body") || C.closest(".bili-sub-article-wrap") || C.parentElement;
      if (!h) return;
      const p = h.getBoundingClientRect(), V = C.getBoundingClientRect().top - p.top + h.scrollTop - p.height * 0.36;
      h.scrollTo({
        top: Math.max(0, V),
        behavior: "smooth"
      });
    }
    function me() {
      if (!k.value) return;
      const C = k.value.currentTime;
      if (document.querySelectorAll(".bili-sub-newspaper-section").forEach((x) => {
        const N = Number(x.getAttribute("data-from") || 0), V = Number(x.getAttribute("data-to") || 0), q = C >= N && (V <= 0 || C < V);
        x.classList.toggle("active", q);
      }), R.organizer.subscriptionScriptMode === "newspaper") {
        const x = document.querySelectorAll(".bili-sub-newspaper-cue");
        if (x.length > 0) {
          let N = null;
          if (x.forEach((V) => {
            const q = Number(V.getAttribute("data-from") || 0), ee = Number(V.getAttribute("data-to") || 0);
            C >= q && (ee <= 0 || C < ee) ? (N || (N = V), V.classList.add("cue-reading-active")) : V.classList.remove("cue-reading-active");
          }), !N && C > 0)
            for (let V = x.length - 1; V >= 0; V--) {
              const q = x[V], ee = Number(q.getAttribute("data-from") || 0);
              if (C >= ee) {
                N = q, q.classList.add("cue-reading-active");
                break;
              }
            }
          N && N !== De && (De = N, we(N));
        }
      } else {
        const x = document.querySelectorAll(".bili-sub-srt-row");
        let N = !1, V = null;
        for (let q = x.length - 1; q >= 0; q--) {
          const ee = x[q], te = Number(ee.getAttribute("data-from") || 0);
          !N && C >= te ? (ee.classList.add("active"), N = !0, V = ee) : ee.classList.remove("active");
        }
        V && V !== be && (be = V, we(V));
      }
    }
    function Ie() {
      me();
    }
    function Ye() {
      me();
    }
    return oe(
      () => c.value?.bvid,
      () => {
        c.value && Oe(c.value);
      },
      { immediate: !0 }
    ), tt(() => {
      Te = Re.onAction((C, h) => {
        if (C === "subscription-seek") {
          const p = Number(h?.from);
          k.value && Number.isFinite(p) && (k.value.currentTime = Math.max(0, p - 0.1), k.value.play().catch(() => {
          }));
        }
      });
    }), Et(() => {
      if (k.value) {
        Wt(k.value);
        try {
          k.value.pause(), k.value.src = "", k.value.load();
        } catch {
        }
      }
      Te && Te(), $e && clearTimeout($e);
    }), (C, h) => (s(), o("aside", ts, [
      c.value ? (s(), o("div", is, [
        e("div", ss, [
          e("div", {
            class: "bili-sub-vue-comment-handoff",
            hidden: "",
            style: { display: "none !important" }
          }, [
            h[3] || (h[3] = e("strong", null, "播放器与评论区已统一到 Vue 本地影院", -1)),
            e("button", {
              type: "button",
              onClick: Be
            }, "打开播放器与评论区")
          ]),
          e("div", os, [
            e("video", {
              ref_key: "videoRef",
              ref: k,
              class: "bili-sub-native-video",
              controls: "",
              playsinline: "",
              poster: c.value.cover,
              hidden: P.value,
              onTimeupdate: me,
              onSeeked: Ie,
              onPlay: Ye
            }, null, 40, ls),
            P.value ? (s(), o("iframe", {
              key: 0,
              class: "bili-sub-native-iframe",
              allowfullscreen: "true",
              allow: "autoplay; fullscreen",
              src: z.value
            }, null, 8, ns)) : y("", !0),
            g.value ? (s(), o("div", as, [...h[4] || (h[4] = [
              e("i", null, null, -1),
              e("span", null, "正在解析登录高清视频流…", -1)
            ])])) : y("", !0)
          ]),
          e("div", {
            class: "bili-sub-scroll-stage",
            onScrollPassive: pe
          }, [
            e("div", rs, [
              e("div", us, [
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: n(R).organizer.showFullDescInRightPanel ? "切回台词展示" : "在右侧大屏展开完整视频简介",
                  onClick: m
                }, l(n(R).organizer.showFullDescInRightPanel ? "缩小简介" : "放大简介"), 9, ds)
              ]),
              e("h4", null, l(c.value.title), 1),
              e("div", cs, [
                e("span", null, "▣ 播放: " + l(c.value.playCount), 1),
                e("span", null, "💬 弹幕: " + l(c.value.danmakuCount), 1),
                e("span", null, "⏱ " + l(c.value.duration), 1)
              ]),
              e("p", ps, [
                ke(et, {
                  text: c.value.description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ]),
            e("div", bs, [
              e("div", vs, [
                e("div", fs, [
                  h[5] || (h[5] = e("span", null, "💬 评论", -1)),
                  e("span", gs, l(F.value), 1)
                ]),
                e("div", ms, [
                  e("button", {
                    type: "button",
                    class: L(["bili-mini-sort-btn", { active: r.value === 1 }]),
                    onClick: h[0] || (h[0] = (p) => E(1))
                  }, "按热度", 2),
                  e("button", {
                    type: "button",
                    class: L(["bili-mini-sort-btn", { active: r.value === 0 }]),
                    onClick: h[1] || (h[1] = (p) => E(0))
                  }, "按时间", 2)
                ])
              ]),
              e("div", hs, [
                e("button", {
                  type: "button",
                  class: L(["bili-sub-emote-button", { on: de.value }]),
                  title: "选择 B站 表情",
                  onClick: Le
                }, "☺", 2),
                ue(e("input", {
                  ref_key: "commentInputRef",
                  ref: Ce,
                  "onUpdate:modelValue": h[2] || (h[2] = (p) => X.value = p),
                  type: "text",
                  class: "bili-sub-comment-input",
                  placeholder: "发一条友善的评论吧…（Enter 发送）",
                  maxlength: "500",
                  onKeydown: Ee(S(Ae, ["prevent"]), ["enter"])
                }, null, 40, ys), [
                  [Se, X.value]
                ]),
                e("button", {
                  type: "button",
                  class: "bili-sub-comment-send-btn",
                  disabled: ae.value || !X.value.trim(),
                  onClick: Ae
                }, l(ae.value ? "发送中…" : "发送"), 9, _s)
              ]),
              de.value ? (s(), o("div", ks, [
                xe.value ? (s(), o("div", $s, [...h[6] || (h[6] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取 B站 表情包…", -1)
                ])])) : (s(), o("div", ws, [
                  (s(!0), o(B, null, W(se.value, (p) => (s(), o("section", {
                    key: p.text,
                    class: "bili-sub-emote-group"
                  }, [
                    e("h5", null, l(p.text || "B站表情"), 1),
                    e("div", null, [
                      (s(!0), o(B, null, W(p.emote, (x) => (s(), o("button", {
                        key: x.text,
                        type: "button",
                        class: "bili-sub-emote-item",
                        title: x.text,
                        onClick: (N) => Ke(x.text)
                      }, [
                        x.url ? (s(), o("img", {
                          key: 0,
                          src: x.url,
                          alt: x.text,
                          referrerpolicy: "no-referrer"
                        }, null, 8, xs)) : (s(), o("span", Ss, l(x.text), 1))
                      ], 8, Cs))), 128))
                    ])
                  ]))), 128))
                ]))
              ])) : y("", !0),
              K.value ? (s(), o("div", {
                key: 1,
                class: L(["bili-sub-comment-tip", { error: j.value }])
              }, l(K.value), 3)) : y("", !0),
              e("div", Ts, [
                Y.value && !w.value.length ? (s(), o("p", Ps, "正在加载评论…")) : O.value && !w.value.length ? (s(), o("p", Ms, l(O.value), 1)) : y("", !0),
                (s(!0), o(B, null, W(w.value, (p) => (s(), o("div", {
                  key: p.id,
                  class: "bili-comment-item"
                }, [
                  e("img", {
                    class: "bili-comment-avatar",
                    src: p.avatar,
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer"
                  }, null, 8, Ds),
                  e("div", Is, [
                    e("div", Es, [
                      e("span", Rs, l(p.userName), 1),
                      p.level ? (s(), o("span", zs, "LV" + l(p.level), 1)) : y("", !0),
                      e("span", Bs, l(p.timeStr), 1)
                    ]),
                    e("div", Ls, [
                      ke(et, {
                        text: p.message
                      }, null, 8, ["text"])
                    ]),
                    p.pictures?.length ? (s(), o("div", As, [
                      (s(!0), o(B, null, W(p.pictures, (x, N) => (s(), o("a", {
                        key: N,
                        class: "bili-comment-pic-link",
                        href: x,
                        onClick: S((V) => I(p.pictures, N), ["stop", "prevent"])
                      }, [
                        e("img", {
                          class: "bili-comment-pic",
                          src: x,
                          alt: "评论图片",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, Vs)
                      ], 8, Ns))), 128))
                    ])) : y("", !0),
                    e("div", Fs, [
                      p.likeCount ? (s(), o("span", Gs, "👍 " + l(p.likeCount), 1)) : y("", !0),
                      p.replyCount ? (s(), o("span", Us, "💬 " + l(p.replyCount), 1)) : y("", !0)
                    ]),
                    p.replies?.length ? (s(), o("div", Os, [
                      (s(!0), o(B, null, W(p.replies, (x) => (s(), o("div", {
                        key: x.id,
                        class: "bili-comment-sub-item"
                      }, [
                        e("span", qs, l(x.userName) + ":", 1),
                        ke(et, {
                          text: x.message
                        }, null, 8, ["text"])
                      ]))), 128)),
                      e("div", Hs, [
                        !p.subRepliesExpanded && (p.replyCount || 0) > p.replies.length ? (s(), o(B, { key: 0 }, [
                          e("span", null, "共 " + l(p.replyCount) + " 条回复，", 1),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: p.subRepliesLoading,
                            onClick: S((x) => u(p.id), ["stop"])
                          }, l(p.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, Ws)
                        ], 64)) : p.subRepliesExpanded ? (s(), o(B, { key: 1 }, [
                          p.subRepliesHasMore ? (s(), o("button", {
                            key: 0,
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: p.subRepliesLoading,
                            onClick: S((x) => u(p.id), ["stop"])
                          }, l(p.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, Ks)) : y("", !0),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-collapse-btn",
                            onClick: S((x) => v(p.id), ["stop"])
                          }, " 收起 ▴ ", 8, js)
                        ], 64)) : y("", !0)
                      ])
                    ])) : y("", !0)
                  ])
                ]))), 128))
              ]),
              e("div", Ys, [
                U.value ? (s(), o("p", Xs, "正在加载更多评论…")) : !ne.value && w.value.length ? (s(), o("p", Qs, "已显示全部评论")) : y("", !0)
              ])
            ])
          ], 32)
        ])
      ])) : (s(), o("p", Js, "暂无可播放的订阅视频。"))
    ]));
  }
}), eo = /* @__PURE__ */ ze(Zs, [["__scopeId", "data-v-ee6b4dc4"]]), to = ["disabled"], io = ["disabled"], so = { key: 0 }, oo = ["disabled"], lo = ["disabled"], no = ["disabled"], ao = ["disabled"], ro = { class: "bili-sub-add-shell" }, uo = ["disabled"], co = { class: "bili-sub-add-toolbar" }, po = { class: "bili-sub-add-groups" }, bo = ["onClick"], vo = { class: "bili-sub-add-list" }, fo = {
  key: 0,
  class: "fo-bili-loading"
}, go = {
  key: 1,
  class: "fo-bili-empty"
}, mo = {
  key: 2,
  class: "fo-bili-empty"
}, ho = ["disabled", "onClick"], yo = ["src"], _o = {
  key: 1,
  class: "bili-sub-add-avatar"
}, ko = {
  class: "fo-custom-confirm-modal",
  role: "dialog",
  "aria-modal": "true"
}, $o = { class: "fo-custom-confirm-head" }, wo = { class: "fo-custom-confirm-body" }, Co = { class: "fo-custom-confirm-actions" }, xo = ["disabled"], So = ["disabled"], To = /* @__PURE__ */ Me({
  __name: "BiliOrganizerDialogs",
  setup(J) {
    const c = Q(() => vt.create), k = Q(() => vt.confirm), g = Q(() => vt.channelPicker), P = Q(() => c.value.kind === "bili"), z = Q(() => {
      const r = g.value, $ = r.query.trim().toLowerCase(), w = r.groups.find((Y) => Y.id === r.activeGroupId), F = w ? new Set(w.mids) : null;
      return r.items.filter((Y) => (!F || F.has(Y.mid)) && (!$ || Y.name.toLowerCase().includes($) || Y.mid.includes($)));
    });
    function M() {
      const r = c.value.name.trim();
      if (!r) {
        fe.updateCreate({ status: "请输入名称", error: !0 });
        return;
      }
      fe.submitCreate({ name: r, privacy: c.value.privacy });
    }
    return (r, $) => (s(), o(B, null, [
      c.value.open ? (s(), o("dialog", {
        key: 0,
        class: "fo-create-dialog",
        open: "",
        onClick: $[5] || ($[5] = S((w) => n(fe).closeCreate(), ["self"])),
        onCancel: $[6] || ($[6] = S((w) => n(fe).closeCreate(), ["prevent"]))
      }, [
        e("form", {
          onSubmit: S(M, ["prevent"])
        }, [
          e("header", null, [
            e("div", null, [
              $[14] || ($[14] = e("i", { class: "fo-folder-icon" }, null, -1)),
              e("span", null, [
                e("b", null, l(P.value ? "新建 B站收藏夹" : "新建插件分组"), 1),
                e("small", null, l(P.value ? "会同步创建到你的 B站账号" : "只整理左侧收藏夹，不修改 B站数据"), 1)
              ])
            ]),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: c.value.submitting,
              onClick: $[0] || ($[0] = (w) => n(fe).closeCreate())
            }, "×", 8, to)
          ]),
          e("label", null, [
            e("span", null, l(P.value ? "收藏夹名称" : "分组名称"), 1),
            ue(e("input", {
              "onUpdate:modelValue": $[1] || ($[1] = (w) => c.value.name = w),
              maxlength: "48",
              autocomplete: "off",
              placeholder: "输入名称",
              required: "",
              disabled: c.value.submitting,
              autofocus: ""
            }, null, 8, io), [
              [Se, c.value.name]
            ])
          ]),
          P.value ? (s(), o("fieldset", so, [
            $[17] || ($[17] = e("legend", null, "可见范围", -1)),
            e("label", null, [
              ue(e("input", {
                "onUpdate:modelValue": $[2] || ($[2] = (w) => c.value.privacy = w),
                type: "radio",
                value: 0,
                disabled: c.value.submitting
              }, null, 8, oo), [
                [
                  xt,
                  c.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              $[15] || ($[15] = e("span", null, [
                e("b", null, "公开"),
                e("small", null, "其他人可以看到")
              ], -1))
            ]),
            e("label", null, [
              ue(e("input", {
                "onUpdate:modelValue": $[3] || ($[3] = (w) => c.value.privacy = w),
                type: "radio",
                value: 1,
                disabled: c.value.submitting
              }, null, 8, lo), [
                [
                  xt,
                  c.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              $[16] || ($[16] = e("span", null, [
                e("b", null, "私密"),
                e("small", null, "仅自己可见")
              ], -1))
            ])
          ])) : y("", !0),
          e("p", {
            class: L(["fo-create-status", { error: c.value.error }]),
            role: "status"
          }, l(c.value.status), 3),
          e("footer", null, [
            e("button", {
              type: "button",
              disabled: c.value.submitting,
              onClick: $[4] || ($[4] = (w) => n(fe).closeCreate())
            }, "取消", 8, no),
            e("button", {
              class: "primary",
              type: "submit",
              disabled: c.value.submitting
            }, l(c.value.submitting ? "创建中…" : P.value ? "创建收藏夹" : "创建分组"), 9, ao)
          ])
        ], 32)
      ], 32)) : y("", !0),
      g.value.open ? (s(), o("dialog", {
        key: 1,
        class: "bili-sub-add-dialog",
        open: "",
        onCancel: $[10] || ($[10] = S((w) => n(fe).closeChannelPicker(), ["prevent"]))
      }, [
        e("div", ro, [
          e("header", null, [
            $[18] || ($[18] = e("div", null, [
              e("b", null, "从我的关注中添加 UP 主"),
              e("small", null, "沿用“正在关注”的本地分组，只能添加已关注的 UP 主")
            ], -1)),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: !!g.value.submittingMid,
              onClick: $[7] || ($[7] = (w) => n(fe).closeChannelPicker())
            }, "×", 8, uo)
          ]),
          e("div", co, [
            e("div", po, [
              e("button", {
                type: "button",
                class: L(["bili-sub-add-group", { on: g.value.activeGroupId === "__all__" }]),
                onClick: $[8] || ($[8] = (w) => n(fe).updateChannelPicker({ activeGroupId: "__all__" }))
              }, "全部关注", 2),
              (s(!0), o(B, null, W(g.value.groups, (w) => (s(), o("button", {
                key: w.id,
                type: "button",
                class: L(["bili-sub-add-group", { on: g.value.activeGroupId === w.id }]),
                onClick: (F) => n(fe).updateChannelPicker({ activeGroupId: w.id })
              }, l(w.name), 11, bo))), 128))
            ]),
            ue(e("input", {
              "onUpdate:modelValue": $[9] || ($[9] = (w) => g.value.query = w),
              type: "search",
              placeholder: "搜索关注的 UP 主"
            }, null, 512), [
              [Se, g.value.query]
            ])
          ]),
          e("div", vo, [
            g.value.loading ? (s(), o("div", fo, [...$[19] || ($[19] = [
              e("i", null, null, -1),
              e("span", null, "正在读取关注分组…", -1)
            ])])) : g.value.error ? (s(), o("p", go, l(g.value.error), 1)) : z.value.length ? (s(!0), o(B, { key: 3 }, W(z.value, (w) => (s(), o("button", {
              key: w.mid,
              type: "button",
              class: "bili-sub-add-up",
              disabled: w.added || !!g.value.submittingMid,
              onClick: (F) => n(fe).selectChannel(w.mid)
            }, [
              w.face ? (s(), o("img", {
                key: 0,
                src: w.face,
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, yo)) : (s(), o("span", _o, "UP")),
              e("span", null, [
                e("b", null, l(w.name), 1),
                e("small", null, "UID " + l(w.mid), 1)
              ]),
              e("i", null, l(w.added ? "已添加" : g.value.submittingMid === w.mid ? "添加中…" : "＋ 添加"), 1)
            ], 8, ho))), 128)) : (s(), o("p", mo, "该分组中没有匹配的已关注 UP 主。"))
          ])
        ])
      ], 32)) : y("", !0),
      k.value.open ? (s(), o("div", {
        key: 2,
        class: "fo-custom-confirm-overlay",
        onClick: $[13] || ($[13] = S((w) => n(fe).closeConfirm(), ["self"]))
      }, [
        e("div", ko, [
          e("div", $o, [
            e("h4", null, l(k.value.title), 1)
          ]),
          e("div", wo, [
            e("p", null, l(k.value.message), 1)
          ]),
          e("div", Co, [
            e("button", {
              type: "button",
              class: "fo-confirm-btn cancel",
              disabled: k.value.submitting,
              onClick: $[11] || ($[11] = (w) => n(fe).closeConfirm())
            }, l(k.value.cancelText), 9, xo),
            e("button", {
              type: "button",
              class: L(["fo-confirm-btn confirm", { danger: k.value.danger }]),
              disabled: k.value.submitting,
              onClick: $[12] || ($[12] = (w) => n(fe).submitConfirm())
            }, l(k.value.submitting ? "处理中…" : k.value.confirmText), 11, So)
          ])
        ])
      ])) : y("", !0)
    ], 64));
  }
}), Po = ["aria-busy"], Mo = { class: "field full-width" }, Do = { class: "cache-directory-name" }, Io = { class: "cache-directory-actions" }, Eo = ["disabled"], Ro = ["disabled"], zo = /* @__PURE__ */ Me({
  __name: "BiliSettingsPanel",
  props: {
    active: { type: Boolean }
  },
  setup(J) {
    const c = J, k = T(!1), g = T(!1), P = T(""), z = T(!1), M = T(null), r = T("尚未选择缓存目录");
    let $ = !0, w = 0;
    async function F() {
      if (!c.active || k.value) return;
      const U = ++w;
      g.value = !0;
      try {
        const O = await jt();
        if (!$ || U !== w) return;
        M.value = O, r.value = O?.name || "尚未选择缓存目录";
      } catch {
        $ && U === w && (M.value = null, r.value = "缓存目录读取失败，请重试");
      } finally {
        $ && U === w && (g.value = !1);
      }
    }
    async function Y() {
      if (k.value || !c.active) return;
      const U = window.showDirectoryPicker;
      if (typeof U != "function") {
        P.value = "当前浏览器不支持目录选择，请使用支持此功能的 Edge 或 Chrome。", z.value = !0;
        return;
      }
      ++w, g.value = !1, k.value = !0, P.value = "";
      try {
        const O = await U.call(window, {
          id: "logicweaver-bili-cache",
          mode: "readwrite",
          startIn: M.value || "videos"
        });
        if (await Yt(O), !$) return;
        M.value = O, r.value = O.name, z.value = !1, P.value = "目录已保存，新缓存将存入这里；已有视频不会移动或删除。";
      } catch (O) {
        $ && O?.name !== "AbortError" && (z.value = !0, P.value = "目录选择或保存未确认，请重读目录核对后再试。");
      } finally {
        $ && (k.value = !1);
      }
    }
    return oe(() => c.active, (U) => {
      U ? F() : ++w;
    }, { immediate: !0 }), tt(() => window.addEventListener("focus", F)), Rt(() => {
      $ = !1, ++w, window.removeEventListener("focus", F);
    }), (U, O) => (s(), o("div", {
      class: "settings-subgroup bili-cache-settings",
      "aria-busy": k.value || g.value
    }, [
      e("div", Mo, [
        e("p", Do, l(g.value ? "正在读取缓存目录…" : r.value), 1),
        e("div", Io, [
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !c.active || k.value || g.value,
            onClick: Y
          }, l(k.value ? "正在保存…" : "选择或重新授权目录"), 9, Eo),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !c.active || k.value || g.value,
            onClick: F
          }, "重读目录", 8, Ro)
        ]),
        O[0] || (O[0] = e("p", { class: "hint" }, "仅更改之后的缓存位置；新缓存保留原目录关联，旧版记录需选择其实际所在目录后播放。不会自动扫描或搬移已有文件。", -1)),
        P.value ? (s(), o("p", {
          key: 0,
          class: L(["hint cache-directory-message", { "is-error": z.value }]),
          role: "status"
        }, l(P.value), 3)) : y("", !0)
      ])
    ], 8, Po));
  }
}), Bo = /* @__PURE__ */ ze(zo, [["__scopeId", "data-v-ccf6929a"]]), Lo = {
  class: "bili-cache-settings-view",
  "aria-labelledby": "bili-cache-settings-title"
}, Ao = { class: "cache-settings-header" }, No = { class: "cache-settings-card" }, Vo = /* @__PURE__ */ Me({
  __name: "BiliCacheSettingsView",
  props: {
    active: { type: Boolean }
  },
  emits: ["back"],
  setup(J, { emit: c }) {
    const k = c;
    return (g, P) => (s(), o("section", Lo, [
      e("header", Ao, [
        P[1] || (P[1] = e("div", null, [
          e("h3", { id: "bili-cache-settings-title" }, "缓存设置"),
          e("p", null, "管理 B站视频的本地缓存目录")
        ], -1)),
        e("button", {
          type: "button",
          class: "cache-settings-back",
          onClick: P[0] || (P[0] = (z) => k("back"))
        }, "返回缓存视频")
      ]),
      e("div", No, [
        P[2] || (P[2] = e("h4", null, "视频缓存目录", -1)),
        P[3] || (P[3] = e("p", { class: "cache-settings-note" }, "选择后立即保存，无需到全局设置中操作。浏览器只提供文件夹名称，不显示完整磁盘路径。", -1)),
        ke(Bo, { active: J.active }, null, 8, ["active"])
      ])
    ]));
  }
}), Fo = /* @__PURE__ */ ze(Vo, [["__scopeId", "data-v-43d869dd"]]), Go = { class: "fo-upg-shell" }, Uo = { class: "fo-upg-body" }, Oo = { class: "fo-upg-sidebar" }, qo = { class: "fo-upg-sidebar-head" }, Ho = { class: "fo-upg-group-items" }, Wo = ["onDragstart", "onDrop", "onClick"], Ko = ["onKeydown"], jo = {
  key: 0,
  class: "fo-upg-tree-branch"
}, Yo = {
  key: 1,
  class: "fo-folder-icon"
}, Xo = { class: "fo-upg-group-name" }, Qo = { class: "fo-upg-vue-group-actions" }, Jo = ["onClick"], Zo = ["onClick"], el = ["onClick"], tl = ["placeholder"], il = {
  key: 1,
  class: "muted small"
}, sl = { class: "fo-upg-main" }, ol = { class: "fo-upg-main-head" }, ll = { class: "fo-upg-main-title" }, nl = { key: 0 }, al = { class: "fo-upg-head-actions" }, rl = { class: "fo-upg-filter-tabs" }, ul = { class: "fo-upg-batch-wrap" }, dl = { class: "fo-upg-batch-count" }, cl = ["disabled"], pl = ["disabled"], bl = { class: "fo-upg-toolbar" }, vl = { class: "fo-upg-search" }, fl = ["disabled"], gl = {
  key: 0,
  class: "fo-bili-loading"
}, ml = {
  key: 1,
  class: "fo-bili-empty"
}, hl = {
  key: 2,
  class: "fo-bili-empty"
}, yl = {
  key: 3,
  class: "fo-bili-empty"
}, _l = ["title", "onContextmenu", "onClick"], kl = ["src"], $l = { class: "fo-upg-info" }, wl = { class: "fo-upg-name" }, Cl = { class: "fo-upg-sign" }, xl = ["disabled", "onClick"], Sl = {
  key: 1,
  class: "fo-upg-move-wrap"
}, Tl = ["disabled"], Pl = { class: "fo-upg-move-dropdown" }, Ml = ["disabled", "onClick"], Dl = { key: 0 }, Il = {
  key: 0,
  class: "muted small",
  style: { padding: "6px 10px" }
}, El = ["disabled", "onClick"], Rl = { class: "fo-upg-pagination" }, zl = { class: "fo-upg-page-info" }, Bl = {
  key: 0,
  class: "fo-upg-page-btns"
}, Ll = ["disabled"], Al = ["disabled"], Nl = { class: "fo-upg-page-cur" }, Vl = ["disabled"], Fl = ["disabled"], Gl = /* @__PURE__ */ Me({
  __name: "BiliUpGroupManager",
  setup(J) {
    const c = T(void 0), k = T(""), g = T(""), P = T(""), z = T(""), M = T(!1), r = T(/* @__PURE__ */ new Set()), $ = T(null);
    function w(_) {
      if (_.button !== 0 || _.target.closest("button,input")) return;
      const u = $.value;
      if (!u) return;
      const v = u.getBoundingClientRect(), E = v.left, le = v.top, Le = _.clientX, Ke = _.clientY;
      u.style.position = "fixed", u.style.left = `${E}px`, u.style.top = `${le}px`, u.style.right = "auto", u.style.bottom = "auto", u.style.margin = "0", u.style.transform = "none";
      const Ae = (De) => {
        const be = De.clientX - Le, we = De.clientY - Ke, me = Math.max(8, Math.min(window.innerWidth - 120, E + be)), Ie = Math.max(8, Math.min(window.innerHeight - 80, le + we));
        u.style.left = `${me}px`, u.style.top = `${Ie}px`;
      }, Oe = () => {
        window.removeEventListener("pointermove", Ae), window.removeEventListener("pointerup", Oe);
      };
      window.addEventListener("pointermove", Ae), window.addEventListener("pointerup", Oe);
    }
    const F = Q(() => f.groups.find((_) => _.id === f.activeGroupId) || null), Y = Q(() => {
      const _ = f.query.trim().toLowerCase(), u = f.activeGroupId;
      return f.followings.filter((v) => {
        if (_ && !v.name.toLowerCase().includes(_) && !v.sign.toLowerCase().includes(_) && !v.mid.includes(_)) return !1;
        const E = v.groupIds.includes(u);
        return f.filter === "ingroup" ? E : f.onlyUngrouped ? !v.groupIds || v.groupIds.length === 0 : !0;
      });
    }), U = Q(() => Math.max(1, Math.ceil(Y.value.length / f.pageSize))), O = Q(() => {
      const u = (Math.min(f.page, U.value) - 1) * f.pageSize;
      return Y.value.slice(u, u + f.pageSize);
    }), ne = Q(() => f.followings.filter((_) => _.groupIds.length === 0).length), X = T(null), Ce = /* @__PURE__ */ new Map();
    function ae(_) {
      const u = Math.max(1, Math.min(U.value, _));
      f.page = u, X.value && (X.value.scrollTop = 0);
    }
    oe(() => [f.query, f.filter, f.onlyUngrouped], () => {
      f.page = 1, X.value && (X.value.scrollTop = 0);
    }), oe(() => f.activeGroupId, (_, u) => {
      if (u && X.value) {
        const le = `${u}_${f.filter}_${f.onlyUngrouped}`;
        Ce.set(le, {
          page: f.page,
          scrollTop: X.value.scrollTop
        });
      }
      if (f.filter === "all")
        return;
      const v = `${_}_${f.filter}_${f.onlyUngrouped}`, E = Ce.get(v);
      E ? (f.page = Math.min(E.page, U.value), gt(() => {
        X.value && (X.value.scrollTop = E.scrollTop);
      })) : (f.page = 1, gt(() => {
        X.value && (X.value.scrollTop = 0);
      }));
    }), oe(U, (_) => {
      f.page > _ && (f.page = _);
    }), oe(M, (_) => {
      _ || r.value.clear();
    });
    function K(_) {
      c.value = _, k.value = "";
    }
    function j() {
      c.value = void 0, k.value = "";
    }
    function de() {
      const _ = k.value.trim();
      _ && (he.dispatch("create-group", { name: _, parentId: c.value || "" }), j());
    }
    function xe(_) {
      g.value = _.id, P.value = _.name;
    }
    function se() {
      const _ = P.value.trim();
      g.value && _ && he.dispatch("rename-group", { id: g.value, name: _ }), g.value = "", P.value = "";
    }
    function $e(_, u) {
      z.value = u, _.dataTransfer?.setData("application/x-logicweaver-up-group", u), _.dataTransfer && (_.dataTransfer.effectAllowed = "move");
    }
    function Te(_, u) {
      const v = _.dataTransfer?.getData("application/x-logicweaver-up-group") || z.value;
      if (z.value = "", !v || v === u) return;
      const E = _.currentTarget?.getBoundingClientRect(), le = E ? _.clientY - E.top : 0, Le = E ? le < E.height * 0.25 ? "before" : le > E.height * 0.75 ? "after" : "into" : "into";
      he.dispatch("move-group", { sourceId: v, targetId: u, mode: Le });
    }
    function ce(_) {
      const u = _.dataTransfer?.getData("application/x-logicweaver-up-group") || z.value;
      z.value = "", u && he.dispatch("move-group", { sourceId: u, targetId: "", mode: "root" });
    }
    function Be(_, u) {
      !u || f.busyMid || he.dispatch("toggle-member", { groupId: u, mid: _ });
    }
    function m(_) {
      !f.activeGroupId || f.busyMid || he.dispatch("toggle-member", { groupId: f.activeGroupId, mid: _ });
    }
    function pe(_, u) {
      he.dispatch("preview-up", { mid: u, clientX: _.clientX, clientY: _.clientY });
    }
    function I(_) {
      const u = r.value;
      u.has(_) ? u.delete(_) : u.add(_);
    }
    function b() {
      if (!f.activeGroupId || f.busyMid) return;
      const _ = Array.from(r.value);
      if (!_.length) return;
      const u = _.filter((v) => {
        const E = f.followings.find((le) => le.mid === v);
        return E && !E.groupIds.includes(f.activeGroupId);
      });
      if (u.length) {
        for (const v of u)
          he.dispatch("toggle-member", { groupId: f.activeGroupId, mid: v });
        r.value.clear();
      }
    }
    function G() {
      if (!f.activeGroupId || f.busyMid) return;
      const _ = Array.from(r.value);
      if (!_.length) return;
      const u = _.filter((v) => {
        const E = f.followings.find((le) => le.mid === v);
        return E && E.groupIds.includes(f.activeGroupId);
      });
      if (u.length) {
        for (const v of u)
          he.dispatch("toggle-member", { groupId: f.activeGroupId, mid: v });
        r.value.clear();
      }
    }
    function Z() {
      for (const _ of O.value) r.value.add(_.mid);
    }
    return (_, u) => n(f).open ? (s(), o("dialog", {
      key: 0,
      ref_key: "dialogEl",
      ref: $,
      class: "fo-up-group-dialog",
      open: "",
      onCancel: u[20] || (u[20] = S((v) => n(he).close(), ["prevent"]))
    }, [
      e("div", Go, [
        e("header", {
          class: "fo-upg-head",
          onPointerdown: w
        }, [
          u[21] || (u[21] = e("h3", null, [
            e("span", null, "👥"),
            re(" 关注分组与 UP 主管理")
          ], -1)),
          e("button", {
            type: "button",
            class: "fo-upg-close-btn",
            "aria-label": "关闭",
            title: "关闭管理面板",
            onClick: u[0] || (u[0] = (v) => n(he).close())
          }, "✕")
        ], 32),
        e("div", Uo, [
          e("aside", Oo, [
            e("div", qo, [
              u[22] || (u[22] = e("span", null, "我的分组", -1)),
              e("button", {
                type: "button",
                onClick: u[1] || (u[1] = (v) => K(null))
              }, "＋ 新建")
            ]),
            e("div", Ho, [
              e("div", {
                class: "fo-upg-root-dropzone",
                onDragover: u[2] || (u[2] = S(() => {
                }, ["prevent"])),
                onDrop: S(ce, ["prevent"])
              }, "⇣ 拖至此处变为顶级分组", 32),
              c.value === null ? (s(), o("form", {
                key: 0,
                class: "fo-upg-create-box",
                onSubmit: S(de, ["prevent"])
              }, [
                ue(e("input", {
                  "onUpdate:modelValue": u[3] || (u[3] = (v) => k.value = v),
                  maxlength: "20",
                  placeholder: "输入分组名称…",
                  autofocus: ""
                }, null, 512), [
                  [Se, k.value]
                ]),
                e("div", { class: "fo-upg-create-btns" }, [
                  e("button", {
                    type: "button",
                    class: "cancel",
                    onClick: j
                  }, "取消"),
                  u[23] || (u[23] = e("button", {
                    class: "confirm",
                    type: "submit"
                  }, "确定", -1))
                ])
              ], 32)) : y("", !0),
              (s(!0), o(B, null, W(n(f).groups, (v) => (s(), o(B, {
                key: v.id
              }, [
                e("div", {
                  class: L(["fo-upg-group-item", { on: v.id === n(f).activeGroupId, "is-subgroup": v.depth > 0 }]),
                  style: ye({ paddingLeft: `${8 + v.depth * 18}px` }),
                  draggable: "true",
                  onDragstart: (E) => $e(E, v.id),
                  onDragover: u[7] || (u[7] = S(() => {
                  }, ["prevent"])),
                  onDrop: S((E) => Te(E, v.id), ["prevent"]),
                  onClick: (E) => n(f).activeGroupId = v.id
                }, [
                  g.value === v.id ? (s(), o(B, { key: 0 }, [
                    ue(e("input", {
                      "onUpdate:modelValue": u[4] || (u[4] = (E) => P.value = E),
                      class: "fo-upg-rename-input",
                      maxlength: "20",
                      onClick: u[5] || (u[5] = S(() => {
                      }, ["stop"])),
                      onKeydown: Ee(S(se, ["prevent"]), ["enter"])
                    }, null, 40, Ko), [
                      [Se, P.value]
                    ]),
                    e("button", {
                      type: "button",
                      onClick: S(se, ["stop"])
                    }, "✓"),
                    e("button", {
                      type: "button",
                      onClick: u[6] || (u[6] = S((E) => g.value = "", ["stop"]))
                    }, "✕")
                  ], 64)) : (s(), o(B, { key: 1 }, [
                    v.depth ? (s(), o("span", jo, "↳")) : (s(), o("i", Yo)),
                    e("span", Xo, l(v.name), 1),
                    e("small", null, l(v.upMids.length), 1),
                    e("span", Qo, [
                      e("button", {
                        type: "button",
                        title: "添加子分组",
                        onClick: S((E) => K(v.id), ["stop"])
                      }, "＋", 8, Jo),
                      e("button", {
                        type: "button",
                        title: "重命名",
                        onClick: S((E) => xe(v), ["stop"])
                      }, "✎", 8, Zo),
                      e("button", {
                        type: "button",
                        class: "danger",
                        title: "删除",
                        onClick: S((E) => n(he).dispatch("delete-group", v.id), ["stop"])
                      }, "×", 8, el)
                    ])
                  ], 64))
                ], 46, Wo),
                c.value === v.id ? (s(), o("form", {
                  key: 0,
                  class: "fo-upg-create-box",
                  style: ye({ marginLeft: `${18 + v.depth * 18}px` }),
                  onSubmit: S(de, ["prevent"])
                }, [
                  ue(e("input", {
                    "onUpdate:modelValue": u[8] || (u[8] = (E) => k.value = E),
                    maxlength: "20",
                    placeholder: `输入「${v.name}」的子分组名称…`,
                    autofocus: ""
                  }, null, 8, tl), [
                    [Se, k.value]
                  ]),
                  e("div", { class: "fo-upg-create-btns" }, [
                    e("button", {
                      type: "button",
                      class: "cancel",
                      onClick: j
                    }, "取消"),
                    u[24] || (u[24] = e("button", {
                      class: "confirm",
                      type: "submit"
                    }, "确定", -1))
                  ])
                ], 36)) : y("", !0)
              ], 64))), 128)),
              !n(f).groups.length && !n(f).loading ? (s(), o("p", il, '暂无分组，请点击"＋ 新建"。')) : y("", !0)
            ])
          ]),
          e("section", sl, [
            e("div", ol, [
              e("div", ll, [
                e("h4", null, l(F.value ? `分组：「${F.value.name}」` : "请先选择或新建分组"), 1),
                F.value ? (s(), o("span", nl, "（本组 " + l(F.value.upMids.length) + " 位 · 共 " + l(n(f).followings.length) + " 位关注 · 未分组 " + l(ne.value) + " 位）", 1)) : y("", !0)
              ]),
              e("div", al, [
                e("div", rl, [
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-filter-tab", { on: n(f).filter === "all" }]),
                    onClick: u[9] || (u[9] = (v) => n(f).filter = "all")
                  }, "全部关注", 2),
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-filter-tab", { on: n(f).filter === "ingroup" }]),
                    onClick: u[10] || (u[10] = (v) => n(f).filter = "ingroup")
                  }, "本组已加", 2)
                ]),
                e("div", ul, [
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-batch-toggle", { on: M.value }]),
                    onClick: u[11] || (u[11] = (v) => M.value = !M.value)
                  }, l(M.value ? "退出批量" : "批量操作"), 3),
                  M.value && r.value.size > 0 ? (s(), o(B, { key: 0 }, [
                    e("span", dl, "已选 " + l(r.value.size), 1),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action add",
                      disabled: !F.value,
                      onClick: b
                    }, "＋ 加入本组", 8, cl),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action remove",
                      disabled: !F.value,
                      onClick: G
                    }, "− 移出本组", 8, pl),
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
                n(f).filter === "all" ? (s(), o("label", {
                  key: 0,
                  class: L(["fo-upg-switch", { on: n(f).onlyUngrouped }])
                }, [
                  ue(e("input", {
                    "onUpdate:modelValue": u[13] || (u[13] = (v) => n(f).onlyUngrouped = v),
                    type: "checkbox"
                  }, null, 512), [
                    [Ut, n(f).onlyUngrouped]
                  ]),
                  u[25] || (u[25] = e("span", { class: "fo-upg-switch-track" }, [
                    e("span", { class: "fo-upg-switch-thumb" })
                  ], -1)),
                  u[26] || (u[26] = e("span", { class: "fo-upg-switch-text" }, "仅未分组 UP", -1))
                ], 2)) : y("", !0)
              ])
            ]),
            e("div", bl, [
              e("div", vl, [
                u[27] || (u[27] = e("span", null, "🔍", -1)),
                ue(e("input", {
                  "onUpdate:modelValue": u[14] || (u[14] = (v) => n(f).query = v),
                  type: "search",
                  placeholder: "搜索关注的 UP 主…"
                }, null, 512), [
                  [Se, n(f).query]
                ])
              ]),
              e("button", {
                type: "button",
                class: "fo-upg-refresh-btn",
                disabled: n(f).refreshing,
                onClick: u[15] || (u[15] = (v) => n(he).dispatch("refresh"))
              }, l(n(f).refreshing ? "刷新中…" : "↻ 刷新关注"), 9, fl)
            ]),
            e("div", {
              ref_key: "listRef",
              ref: X,
              class: "fo-upg-list"
            }, [
              n(f).loading ? (s(), o("div", gl, [...u[28] || (u[28] = [
                e("i", null, null, -1),
                e("span", null, "正在加载关注的 UP 主列表…", -1)
              ])])) : n(f).error ? (s(), o("p", ml, l(n(f).error), 1)) : F.value ? O.value.length ? (s(!0), o(B, { key: 4 }, W(O.value, (v) => (s(), o("article", {
                key: v.mid,
                class: L(["fo-upg-card", { selected: M.value && r.value.has(v.mid) }]),
                title: `右键查看「${v.name}」近期投稿`,
                onContextmenu: S((E) => pe(E, v.mid), ["prevent"]),
                onClick: (E) => M.value ? I(v.mid) : void 0
              }, [
                e("img", {
                  src: v.face,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, kl),
                e("div", $l, [
                  e("div", wl, l(v.name), 1),
                  e("div", Cl, l(v.sign || "暂无签名"), 1)
                ]),
                M.value ? (s(), o("div", {
                  key: 1,
                  class: L(["fo-upg-batch-check", { checked: r.value.has(v.mid) }])
                }, l(r.value.has(v.mid) ? "✓" : ""), 3)) : (s(), o(B, { key: 0 }, [
                  v.groupIds.includes(n(f).activeGroupId) ? (s(), o("button", {
                    key: 0,
                    type: "button",
                    class: "fo-upg-toggle-btn in-group",
                    disabled: n(f).busyMid === v.mid,
                    onClick: S((E) => m(v.mid), ["stop"])
                  }, l(n(f).busyMid === v.mid ? "处理中…" : `移出 ${F.value?.name || ""}`), 9, xl)) : v.groupIds.length > 0 ? (s(), o("div", Sl, [
                    e("button", {
                      type: "button",
                      class: "fo-upg-toggle-btn belongs-other fo-upg-move-trigger",
                      disabled: n(f).busyMid === v.mid
                    }, l(n(f).busyMid === v.mid ? "处理中…" : `📁 ${v.groupName || "已分组"}`), 9, Tl),
                    e("div", Pl, [
                      u[30] || (u[30] = e("div", { class: "fo-upg-move-title" }, "移动到分组", -1)),
                      (s(!0), o(B, null, W(n(f).groups, (E) => (s(), o("button", {
                        key: E.id,
                        type: "button",
                        class: L(["fo-upg-move-item", { active: v.groupIds.includes(E.id) }]),
                        disabled: n(f).busyMid === v.mid,
                        onClick: S((le) => Be(v.mid, E.id), ["stop"])
                      }, [
                        u[29] || (u[29] = e("i", { class: "fo-folder-icon small" }, null, -1)),
                        e("span", null, l(E.name), 1),
                        v.groupIds.includes(E.id) ? (s(), o("small", Dl, "✓ 已加入")) : y("", !0)
                      ], 10, Ml))), 128)),
                      n(f).groups.length ? y("", !0) : (s(), o("p", Il, "暂无分组"))
                    ])
                  ])) : n(f).activeGroupId ? (s(), o("button", {
                    key: 2,
                    type: "button",
                    class: "fo-upg-toggle-btn",
                    disabled: n(f).busyMid === v.mid,
                    onClick: S((E) => m(v.mid), ["stop"])
                  }, l(n(f).busyMid === v.mid ? "处理中…" : "＋ 加入"), 9, El)) : y("", !0)
                ], 64))
              ], 42, _l))), 128)) : (s(), o("p", yl, "没有符合条件的 UP 主。")) : (s(), o("p", hl, "请先新建或选择一个分组。"))
            ], 512),
            e("div", Rl, [
              e("div", zl, "共 " + l(Y.value.length) + " 位 UP 主 · 每页 " + l(n(f).pageSize) + " 位", 1),
              U.value > 1 ? (s(), o("div", Bl, [
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(f).page <= 1,
                  onClick: u[16] || (u[16] = (v) => ae(1))
                }, "« 首页", 8, Ll),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(f).page <= 1,
                  onClick: u[17] || (u[17] = (v) => ae(n(f).page - 1))
                }, "‹ 上一页", 8, Al),
                e("span", Nl, l(n(f).page) + " / " + l(U.value), 1),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(f).page >= U.value,
                  onClick: u[18] || (u[18] = (v) => ae(n(f).page + 1))
                }, "下一页 ›", 8, Vl),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(f).page >= U.value,
                  onClick: u[19] || (u[19] = (v) => ae(U.value))
                }, "末页 »", 8, Fl)
              ])) : y("", !0)
            ])
          ])
        ])
      ])
    ], 544)) : y("", !0);
  }
}), Ul = /* @__PURE__ */ ze(Gl, [["__scopeId", "data-v-f738263e"]]), Mt = {
  phase: "idle",
  isSeriesPickerOpen: !1,
  insertedTitle: ""
};
class Ol {
  constructor() {
    this._state = { ...Mt }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.biliRadioTape = this);
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
    for (const k of this._listeners)
      k(c);
  }
  send(c) {
    const k = this._state;
    switch (c.type) {
      case "DRAG_ENTER":
        return k.phase === "idle" ? (this._setState({
          ...k,
          phase: "drag_over"
        }), !0) : !1;
      case "DRAG_LEAVE":
        return k.phase === "drag_over" ? (this._setState({
          ...k,
          phase: "idle"
        }), !0) : !1;
      case "START_INSERT":
        return this._setState({
          phase: "inserting",
          isSeriesPickerOpen: !1,
          insertedTitle: c.title
        }), !0;
      case "FINISH_INSERT":
        return k.phase === "inserting" ? (this._setState({
          phase: "idle",
          isSeriesPickerOpen: !1,
          insertedTitle: ""
        }), !0) : !1;
      case "TOGGLE_SERIES_PICKER": {
        if (k.phase === "collapsed" || k.phase === "inserting") return !1;
        const g = c.open !== void 0 ? c.open : !k.isSeriesPickerOpen;
        return this._setState({
          ...k,
          isSeriesPickerOpen: g
        }), !0;
      }
      case "TOGGLE_COLLAPSE": {
        const g = c.collapsed !== void 0 ? c.collapsed : k.phase !== "collapsed";
        return this._setState({
          phase: g ? "collapsed" : "idle",
          isSeriesPickerOpen: !1,
          insertedTitle: ""
        }), !0;
      }
      case "RESET_IDLE":
        return this._setState({ ...Mt }), !0;
      default:
        return !1;
    }
  }
}
const ql = ["title"], Hl = { class: "tape-capsule-text" }, Wl = { class: "capsule-title" }, Kl = { class: "capsule-sub" }, jl = ["title"], Yl = { class: "tape-deck-drop-slot" }, Xl = {
  key: 1,
  class: "tape-insert-feedback-chip"
}, Ql = { class: "tape-loaded-title" }, Jl = { class: "tape-body-content" }, Zl = ["title", "onKeydown"], en = { class: "tape-cassette" }, tn = { class: "tape-center-label" }, sn = { class: "tape-sticker-head" }, on = ["title"], ln = ["src"], nn = { class: "tape-badge-row" }, an = { class: "tape-brand-text" }, rn = { class: "tape-series-header" }, un = { class: "tape-series-title-group" }, dn = { class: "tape-series-count-pill" }, cn = { class: "tape-series-list-scroll" }, pn = ["onClick"], bn = { class: "tape-series-item-left" }, vn = { class: "tape-series-item-info" }, fn = ["title"], gn = { class: "tape-series-item-count" }, mn = {
  key: 0,
  class: "tape-series-playing-tag"
}, hn = {
  key: 1,
  class: "tape-series-play-action"
}, yn = {
  key: 0,
  class: "tape-series-empty"
}, _n = {
  class: "tape-transport-controls",
  role: "group",
  "aria-label": "电台播放控制"
}, kn = ["title", "aria-label"], $n = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, wn = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, Cn = { class: "tape-playback-section" }, xn = { class: "tape-time-lyric-row" }, Sn = { class: "tape-timestamp" }, Tn = { class: "tape-lyric-container" }, Pn = ["title"], Mn = ["title", "aria-label"], Dn = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, In = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, En = {
  key: 2,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Rn = ["aria-valuenow"], zn = {
  class: "tape-waveform-row",
  "aria-hidden": "true"
}, Bn = {
  class: "tape-waveform-svg",
  viewBox: "0 0 160 16",
  preserveAspectRatio: "none"
}, Ln = ["x", "y", "height"], An = /* @__PURE__ */ Me({
  __name: "BiliRadioTapePlayer",
  props: {
    dockSide: { type: Boolean, default: !1 }
  },
  setup(J) {
    const c = J, k = [
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
    ], g = T(!1), P = T(null), z = new Ol(), M = Xt(z), r = Q(() => M.value.phase === "drag_over"), $ = Q(() => M.value.phase === "inserting"), w = Q(() => M.value.insertedTitle), F = Q(() => M.value.phase === "collapsed"), Y = Q(() => M.value.isSeriesPickerOpen);
    function U(I) {
      I.stopPropagation(), z.send({ type: "TOGGLE_SERIES_PICKER" }), z.isSeriesPickerOpen && Ze.init();
    }
    async function O(I) {
      z.send({ type: "TOGGLE_SERIES_PICKER", open: !1 }), await Ze.playSeries(I, 0);
    }
    function ne(I) {
      if (!Y.value) return;
      const b = I.target;
      !b?.closest(".tape-series-popover") && !b?.closest(".tape-cassette-wrap") && z.send({ type: "TOGGLE_SERIES_PICKER", open: !1 });
    }
    function X(I) {
      I.key === "Escape" && Y.value && z.send({ type: "TOGGLE_SERIES_PICKER", open: !1 });
    }
    const Ce = Q(() => H.mode === "one" ? "单曲循环" : H.mode === "shuffle" ? "乱序播放" : "顺序播放"), ae = T(380);
    function K() {
      if (typeof document > "u" || !c.dockSide) return;
      const I = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock"), b = 20, G = 16;
      if (I) {
        const _ = I.getBoundingClientRect();
        if (_.left > 80) {
          const u = Math.floor(_.left - b - G);
          if (u > 220) {
            ae.value = u;
            return;
          }
        }
      }
      const Z = typeof window < "u" ? window.innerWidth : 1280;
      ae.value = Math.max(220, Math.floor(Z / 2 - 230));
    }
    let j = null;
    function de() {
      clearTimeout(j), j = setTimeout(K, 60);
    }
    tt(() => {
      if (Ze.init(), typeof window < "u" && (window.addEventListener("pointerdown", ne), window.addEventListener("keydown", X)), c.dockSide) {
        K(), window.addEventListener("resize", de);
        const I = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
        if (I && typeof ResizeObserver < "u") {
          const b = new ResizeObserver(() => K());
          b.observe(I), I.__bili_dock_ro = b;
        }
      }
    }), Et(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", ne), window.removeEventListener("keydown", X), window.removeEventListener("resize", de));
      const I = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
      I && I.__bili_dock_ro && (I.__bili_dock_ro.disconnect(), delete I.__bili_dock_ro);
    });
    function xe(I) {
      I.preventDefault(), z.send({ type: "DRAG_ENTER" });
    }
    function se(I) {
      I.preventDefault(), I.dataTransfer && (I.dataTransfer.dropEffect = "copy"), z.send({ type: "DRAG_ENTER" });
    }
    function $e(I) {
      const b = I.currentTarget, G = I.relatedTarget;
      (!G || !b.contains(G)) && z.send({ type: "DRAG_LEAVE" });
    }
    function Te(I) {
      I.preventDefault(), z.send({ type: "DRAG_LEAVE" });
      const b = I.dataTransfer;
      if (!b) return;
      let G = b.getData("application/x-bili-cassette") || b.getData("application/json"), Z = null;
      if (G)
        try {
          Z = JSON.parse(G);
        } catch {
        }
      if (!Z?.bvid) {
        const u = (b.getData("text/plain") || b.getData("text/uri-list") || b.getData("application/x-logicweaver-video-url"))?.match(/BV[0-9a-zA-Z]+/);
        u && (Z = {
          bvid: u[0],
          title: "放入的单曲卡带",
          cover: "",
          author: "Bilibili",
          duration: 0
        });
      }
      Z?.bvid && (z.send({ type: "START_INSERT", title: Z.title || Z.bvid }), setTimeout(() => {
        Ue.insertAndPlay(Z);
      }, 280), setTimeout(() => {
        z.send({ type: "FINISH_INSERT" });
      }, 1500));
    }
    function ce(I) {
      if (P.value) {
        g.value = !0;
        try {
          I.currentTarget?.setPointerCapture?.(I.pointerId);
        } catch {
        }
        pe(I);
      }
    }
    function Be(I) {
      g.value && pe(I);
    }
    function m(I) {
      if (g.value) {
        pe(I), g.value = !1;
        try {
          I.currentTarget?.releasePointerCapture?.(I.pointerId);
        } catch {
        }
      }
    }
    function pe(I) {
      if (!P.value) return;
      const b = P.value.getBoundingClientRect();
      if (b.width <= 0) return;
      const G = I.clientX - b.left, Z = Math.max(0, Math.min(100, G / b.width * 100));
      Ue.seek(Z);
    }
    return (I, b) => (s(), o("div", {
      class: L(["bili-tape-deck", {
        "is-playing": n(H).playing,
        "is-drag-over": r.value,
        "is-inserting": $.value,
        "dock-side-mode": c.dockSide,
        "dock-side-collapsed": c.dockSide && F.value
      }]),
      style: ye(c.dockSide && !F.value ? { maxWidth: `${ae.value}px` } : void 0),
      onDragenter: xe,
      onDragover: se,
      onDragleave: $e,
      onDrop: Te
    }, [
      c.dockSide && F.value ? (s(), o("div", {
        key: 0,
        class: "tape-collapsed-capsule",
        title: `电台：${n(H).title || "哔哩哔哩电台"}`
      }, [
        e("div", {
          class: L(["tape-capsule-spool", { spinning: n(H).playing }])
        }, [...b[9] || (b[9] = [
          e("div", { class: "spool-center-dot" }, null, -1)
        ])], 2),
        e("div", Hl, [
          e("strong", Wl, l(n(H).title || "B站电台"), 1),
          e("small", Kl, l(n(H).playing ? "♪ 播放中" : "已暂停"), 1)
        ]),
        e("button", {
          type: "button",
          class: "tape-capsule-play-btn",
          title: n(H).playing ? "暂停" : "播放",
          onClick: b[0] || (b[0] = S((G) => n(Ue).togglePlay(), ["stop"]))
        }, l(n(H).playing ? "⏸" : "▶"), 9, jl),
        e("button", {
          type: "button",
          class: "tape-capsule-expand-btn",
          title: "展开完整磁带播放条",
          onClick: b[1] || (b[1] = S((G) => n(z).send({ type: "TOGGLE_COLLAPSE", collapsed: !1 }), ["stop"]))
        }, " ↗ ")
      ], 8, ql)) : y("", !0),
      ue(e("div", Yl, [...b[10] || (b[10] = [
        pt('<div class="slot-visual-frame" data-v-1834c419><span class="slot-icon-tape" data-v-1834c419>📼</span><div class="slot-text-col" data-v-1834c419><strong class="slot-headline" data-v-1834c419>释放鼠标装填卡带</strong><small class="slot-subline" data-v-1834c419>拖入视频封面 · 立即播放音乐</small></div></div>', 1)
      ])], 512), [
        [mt, r.value]
      ]),
      $.value ? (s(), o("div", Xl, [
        b[11] || (b[11] = e("span", { class: "tape-click-sound" }, "✓ 已装填", -1)),
        e("span", Ql, "《" + l(w.value) + "》", 1)
      ])) : y("", !0),
      ue(e("div", Jl, [
        e("div", {
          class: "tape-cassette-wrap",
          role: "button",
          tabindex: "0",
          title: `点击选择电台系列 (已建 ${n(R).radioSeries.length} 个系列 · 也可直接拖拽视频封面至此装填)`,
          onClick: U,
          onKeydown: Ee(S(U, ["prevent"]), ["enter", "space"])
        }, [
          e("div", en, [
            b[14] || (b[14] = e("div", { class: "tape-spool tape-spool-left" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1)),
            e("div", tn, [
              e("div", sn, [
                n(H).coverUrl ? (s(), o("div", {
                  key: 0,
                  class: "tape-cover-sticker",
                  title: n(H).title
                }, [
                  e("img", {
                    src: n(H).coverUrl,
                    alt: "Cover",
                    referrerpolicy: "no-referrer"
                  }, null, 8, ln)
                ], 8, on)) : y("", !0),
                e("div", nn, [
                  b[12] || (b[12] = e("span", { class: "side-letter" }, "A", -1)),
                  e("span", an, l(n(H).seriesName || "CASSETTE"), 1)
                ])
              ]),
              b[13] || (b[13] = e("div", { class: "tape-acrylic-window" }, [
                e("div", { class: "tape-ribbon-bar" }),
                e("div", { class: "tape-scale-marks" }, [
                  e("span", null, "100"),
                  e("span", null, "50"),
                  e("span", null, "0")
                ])
              ], -1))
            ]),
            b[15] || (b[15] = e("div", { class: "tape-spool tape-spool-right" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1))
          ]),
          Y.value ? (s(), o("div", {
            key: 0,
            class: "tape-series-popover",
            onClick: b[3] || (b[3] = S(() => {
            }, ["stop"]))
          }, [
            e("div", rn, [
              e("div", un, [
                b[16] || (b[16] = e("span", { class: "tape-series-icon" }, "📻", -1)),
                b[17] || (b[17] = e("span", { class: "tape-series-title" }, "自建电台系列", -1)),
                e("span", dn, l(n(R).radioSeries.length), 1)
              ]),
              e("button", {
                type: "button",
                class: "tape-series-close-btn",
                title: "关闭",
                "aria-label": "关闭",
                onClick: b[2] || (b[2] = S((G) => Y.value = !1, ["stop"]))
              }, " ✕ ")
            ]),
            e("div", cn, [
              (s(!0), o(B, null, W(n(R).radioSeries, (G) => (s(), o("div", {
                key: G.id,
                class: L(["tape-series-item", { "is-active": n(H).seriesName === G.name }]),
                onClick: S((Z) => O(G.id), ["stop"])
              }, [
                e("div", bn, [
                  b[18] || (b[18] = e("span", { class: "tape-series-item-bullet" }, "📼", -1)),
                  e("div", vn, [
                    e("span", {
                      class: "tape-series-item-name",
                      title: G.name
                    }, l(G.name), 9, fn),
                    e("span", gn, l(G.count) + " 首曲目 · 顺序连播", 1)
                  ])
                ]),
                n(H).seriesName === G.name && n(H).playing ? (s(), o("span", mn, " 播放中 ")) : (s(), o("span", hn, " ▶ "))
              ], 10, pn))), 128)),
              n(R).radioSeries.length ? y("", !0) : (s(), o("div", yn, [...b[19] || (b[19] = [
                e("span", { class: "empty-icon" }, "📂", -1),
                e("span", { class: "empty-text" }, "暂无保存的电台系列", -1),
                e("span", { class: "empty-tip" }, "可在 B站工作区 → 电台 中添加曲目并保存为系列", -1)
              ])]))
            ])
          ])) : y("", !0)
        ], 40, Zl),
        e("div", _n, [
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "上一首",
            "aria-label": "上一首",
            onClick: b[4] || (b[4] = (G) => n(Ue).prev())
          }, [...b[20] || (b[20] = [
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
            class: L(["tape-ctrl-btn tape-ctrl-play", { playing: n(H).playing }]),
            title: n(H).playing ? "暂停播放" : "开始播放",
            "aria-label": n(H).playing ? "暂停" : "播放",
            onClick: b[5] || (b[5] = (G) => n(Ue).togglePlay())
          }, [
            n(H).playing ? (s(), o("svg", $n, [...b[21] || (b[21] = [
              e("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" }, null, -1)
            ])])) : (s(), o("svg", wn, [...b[22] || (b[22] = [
              e("path", { d: "M8 5v14l11-7z" }, null, -1)
            ])]))
          ], 10, kn),
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "下一首",
            "aria-label": "下一首",
            onClick: b[6] || (b[6] = (G) => n(Ue).next())
          }, [...b[23] || (b[23] = [
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
        e("div", Cn, [
          e("div", xn, [
            e("span", Sn, l(n(H).formattedCurrent) + " / " + l(n(H).formattedDuration), 1),
            e("div", Tn, [
              e("span", {
                class: "tape-lyric-text",
                title: n(H).lyric
              }, l(n(H).lyric || "♪ 纯音乐 / 伴奏"), 9, Pn)
            ]),
            e("button", {
              type: "button",
              class: "tape-mode-btn",
              title: Ce.value,
              "aria-label": Ce.value,
              onClick: b[7] || (b[7] = (G) => n(Ue).toggleMode())
            }, [
              n(H).mode === "order" ? (s(), o("svg", Dn, [...b[24] || (b[24] = [
                e("polyline", { points: "17 1 21 5 17 9" }, null, -1),
                e("path", { d: "M3 11V9a4 4 0 0 1 4-4h14" }, null, -1),
                e("polyline", { points: "7 23 3 19 7 15" }, null, -1),
                e("path", { d: "M21 13v2a4 4 0 0 1-4 4H3" }, null, -1)
              ])])) : n(H).mode === "one" ? (s(), o("svg", In, [...b[25] || (b[25] = [
                pt('<polyline points="17 1 21 5 17 9" data-v-1834c419></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14" data-v-1834c419></path><polyline points="7 23 3 19 7 15" data-v-1834c419></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3" data-v-1834c419></path><text x="12" y="14.5" font-size="7.5" font-weight="900" font-family="system-ui, -apple-system, sans-serif" fill="currentColor" stroke="none" text-anchor="middle" data-v-1834c419>1</text>', 5)
              ])])) : n(H).mode === "shuffle" ? (s(), o("svg", En, [...b[26] || (b[26] = [
                pt('<polyline points="16 3 21 3 21 8" data-v-1834c419></polyline><line x1="4" y1="20" x2="21" y2="3" data-v-1834c419></line><polyline points="21 16 21 21 16 21" data-v-1834c419></polyline><line x1="15" y1="15" x2="21" y2="21" data-v-1834c419></line><line x1="4" y1="4" x2="9" y2="9" data-v-1834c419></line>', 5)
              ])])) : y("", !0)
            ], 8, Mn)
          ]),
          e("div", {
            ref_key: "progressLineRef",
            ref: P,
            class: "tape-progress-rail",
            role: "slider",
            "aria-valuenow": n(H).progressPercent,
            "aria-valuemin": "0",
            "aria-valuemax": "100",
            "aria-label": "电台播放进度",
            onPointerdown: ce,
            onPointermove: Be,
            onPointerup: m,
            onPointercancel: m
          }, [
            e("div", {
              class: "tape-progress-fill",
              style: ye({ width: `${n(H).progressPercent}%` })
            }, null, 4),
            e("div", {
              class: "tape-progress-handle",
              style: ye({ left: `${n(H).progressPercent}%` })
            }, null, 4)
          ], 40, Rn),
          e("div", zn, [
            (s(), o("svg", Bn, [
              (s(), o(B, null, W(k, (G, Z) => e("rect", {
                key: Z,
                class: "wave-bar",
                x: Z * 4,
                y: 16 - G * 0.7,
                width: "1.8",
                height: G * 0.7,
                rx: "0.9",
                style: ye({ animationDelay: `${Z % 8 * 0.12}s` })
              }, null, 12, Ln)), 64))
            ]))
          ])
        ]),
        c.dockSide ? (s(), o("button", {
          key: 0,
          type: "button",
          class: "tape-dock-collapse-btn",
          title: "收起至左下角小胶囊",
          "aria-label": "收起磁带机",
          onClick: b[8] || (b[8] = S((G) => n(z).send({ type: "TOGGLE_COLLAPSE", collapsed: !0 }), ["stop"]))
        }, [...b[27] || (b[27] = [
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
        [mt, !c.dockSide || !F.value]
      ])
    ], 38));
  }
}), Dt = /* @__PURE__ */ ze(An, [["__scopeId", "data-v-1834c419"]]);
function It(J) {
  if (J.ctrlKey || J.metaKey || J.shiftKey || Math.abs(J.deltaX) >= Math.abs(J.deltaY)) return;
  const c = J.currentTarget, k = J.deltaY * (J.deltaMode === 1 ? 16 : J.deltaMode === 2 ? c.clientWidth : 1), g = c.scrollWidth - c.clientWidth;
  (k > 0 && c.scrollLeft < g || k < 0 && c.scrollLeft > 0) && (J.preventDefault(), J.stopPropagation(), c.scrollLeft += k);
}
const Nn = {
  class: "fm-pane",
  id: "pane-organizer"
}, Vn = { id: "fo-body" }, Fn = { class: "fo-bili-sidebar" }, Gn = ["title"], Un = { class: "fo-sidebar-toggle-title" }, On = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, qn = ["aria-expanded", "title"], Hn = { class: "fo-sidebar-toggle-chevron" }, Wn = { class: "fo-sidebar-features-wrap" }, Kn = { class: "fo-sidebar-sub-wrap" }, jn = ["title"], Yn = { class: "fo-sidebar-sub-main" }, Xn = { class: "fo-sidebar-sub-text" }, Qn = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Jn = ["title"], Zn = { class: "fo-sidebar-sub-main" }, ea = { class: "fo-sidebar-sub-text" }, ta = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, ia = ["title"], sa = { class: "fo-sidebar-sub-main" }, oa = { class: "fo-sidebar-sub-text" }, la = { class: "fo-sidebar-sub-wrap fo-sidebar-recommend-wrap" }, na = ["title"], aa = { class: "fo-sidebar-sub-main" }, ra = { class: "fo-sidebar-sub-text" }, ua = { class: "fo-sidebar-sub-wrap fo-sidebar-radio-wrap" }, da = ["title"], ca = { class: "fo-sidebar-sub-main" }, pa = { class: "fo-sidebar-sub-text" }, ba = { class: "fo-sidebar-favorite-hub" }, va = { class: "fo-sidebar-sub-main" }, fa = { class: "fo-sidebar-sub-text" }, ga = ["title", "aria-label"], ma = {
  key: 0,
  class: "fo-move-target-banner"
}, ha = {
  class: "fo-bili-folder-list",
  "aria-label": "B站收藏夹"
}, ya = {
  key: 0,
  class: "fo-bili-section-divider"
}, _a = ["onDragover", "onDragleave", "onDrop"], ka = { class: "fo-bili-section-title" }, $a = ["data-folder-id", "data-folder-kind", "draggable", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], wa = ["aria-expanded", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], Ca = {
  class: "fo-group-caret",
  "aria-hidden": "true"
}, xa = {
  key: 0,
  class: "muted small"
}, Sa = {
  key: 0,
  class: "fo-bili-loading"
}, Ta = {
  key: 1,
  class: "fo-bili-empty fo-bili-login-guide"
}, Pa = { class: "fo-bili-login-card" }, Ma = { class: "fo-bili-login-actions" }, Da = {
  key: 2,
  class: "fo-bili-empty"
}, Ia = { class: "fo-bili-hero fo-hero-persistent" }, Ea = { class: "fo-hero-left" }, Ra = ["src"], za = {
  key: 1,
  class: "fo-folder-icon"
}, Ba = { class: "fo-hero-folder-info" }, La = { class: "fo-bili-actions" }, Aa = ["title"], Na = { class: "bili-header-msg-label" }, Va = ["title"], Fa = ["disabled"], Ga = { class: "fo-bili-toolbar" }, Ua = {
  key: 0,
  class: "fo-bili-sort"
}, Oa = ["onClick"], qa = {
  class: "fo-mini-dock-anchor",
  "aria-label": "视频标签页"
}, Ha = ["title"], Wa = { class: "fo-video-tab-title" }, Ka = { class: "fo-video-tab-actions" }, ja = ["title"], Ya = {
  key: 2,
  class: "fo-bili-batch-actions"
}, Xa = { class: "fo-batch-count" }, Qa = {
  key: 0,
  class: "muted small",
  role: "status"
}, Ja = ["aria-busy"], Za = {
  key: 0,
  class: "fo-bili-empty"
}, er = ["data-batch-id", "onDragstart", "onContextmenu"], tr = { class: "fo-bili-thumb" }, ir = {
  key: 0,
  class: "fo-batch-check",
  title: "选择此视频"
}, sr = ["checked", "onChange"], or = ["href", "onClick"], lr = ["src"], nr = { class: "fo-bili-count" }, ar = { class: "fo-bili-duration" }, rr = { class: "fo-bili-title-row" }, ur = ["href", "onClick"], dr = ["aria-expanded", "onClick"], cr = {
  key: 0,
  class: "fo-card-menu"
}, pr = ["onClick"], br = ["onClick"], vr = ["onClick"], fr = { class: "fo-bili-meta" }, gr = ["onClick"], mr = {
  key: 1,
  class: "fo-pager"
}, hr = ["disabled"], yr = { class: "fo-page-num" }, _r = ["disabled"], kr = { class: "fo-bili-hero fo-hero-persistent fo-cached-hero" }, $r = { class: "fo-hero-left" }, wr = { class: "fo-hero-folder-info" }, Cr = { class: "fo-bili-actions" }, xr = {
  key: 0,
  class: "fo-bili-loading"
}, Sr = {
  key: 0,
  class: "fo-bili-empty"
}, Tr = { class: "fo-bili-thumb" }, Pr = ["onClick"], Mr = ["src"], Dr = { class: "fo-bili-title-row" }, Ir = ["onClick"], Er = ["onClick"], Rr = { class: "fo-bili-meta" }, zr = {
  key: 2,
  class: "fo-pager"
}, Br = ["disabled"], Lr = { class: "fo-page-num" }, Ar = ["disabled"], Nr = { class: "fo-bili-hero" }, Vr = { class: "fo-bili-heading" }, Fr = { class: "fo-feed-hero-title" }, Gr = ["placeholder", "aria-label"], Ur = ["title"], Or = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, qr = { class: "card-fullscreen-bili-suggest-head" }, Hr = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, Wr = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, Kr = ["onClick", "onContextmenu"], jr = { class: "card-fullscreen-bili-thumb" }, Yr = ["src"], Xr = { key: 0 }, Qr = { class: "card-fullscreen-bili-video-copy" }, Jr = { class: "fo-bili-actions" }, Zr = { class: "fo-bili-toolbar" }, eu = { class: "fo-bili-sort" }, tu = { class: "fo-vue-feed-label" }, iu = {
  key: 0,
  class: "fo-bili-loading",
  role: "status"
}, su = {
  key: 1,
  class: "fo-bili-empty",
  role: "alert"
}, ou = { class: "fo-bili-grid" }, lu = {
  key: 0,
  class: "fo-bili-empty"
}, nu = ["onContextmenu"], au = { class: "fo-bili-thumb" }, ru = ["href", "onClick"], uu = ["src"], du = { class: "fo-bili-count" }, cu = { class: "fo-bili-duration" }, pu = { class: "fo-bili-title-row" }, bu = ["href", "onClick"], vu = { class: "fo-bili-meta" }, fu = {
  key: 0,
  class: "fo-pager"
}, gu = ["disabled"], mu = { class: "fo-page-num" }, hu = ["disabled"], yu = { class: "fo-bili-toolbar" }, _u = { class: "fo-feed-count-tag" }, ku = {
  key: 0,
  class: "fo-bili-loading"
}, $u = {
  key: 1,
  class: "fo-bili-empty"
}, wu = {
  key: 0,
  class: "fo-bili-empty"
}, Cu = ["onDragstart"], xu = { class: "fo-bili-thumb" }, Su = ["href", "onClick"], Tu = ["src"], Pu = { class: "fo-bili-count" }, Mu = { class: "fo-bili-duration" }, Du = { class: "fo-bili-title-row" }, Iu = ["href", "onClick"], Eu = ["aria-expanded", "onClick"], Ru = {
  key: 0,
  class: "fo-card-menu"
}, zu = ["onClick"], Bu = ["onClick"], Lu = ["onClick"], Au = ["onClick"], Nu = ["onClick"], Vu = { class: "fo-bili-meta" }, Fu = ["onClick"], Gu = { class: "fo-pager" }, Uu = ["disabled"], Ou = { class: "fo-page-num" }, qu = ["disabled"], Hu = { class: "fo-bili-hero fo-following-hero" }, Wu = { class: "fo-bili-heading" }, Ku = { class: "fo-feed-hero-title" }, ju = {
  key: 0,
  class: "fo-feed-badge"
}, Yu = { class: "fo-up-groups-bar" }, Xu = ["onClick"], Qu = { class: "count" }, Ju = { class: "fo-up-groups-actions" }, Zu = { class: "fo-bili-actions" }, ed = {
  key: 0,
  class: "fo-up-members-strip"
}, td = { class: "fo-up-members-label" }, id = { class: "fo-up-members-list" }, sd = ["title", "onClick", "onContextmenu"], od = ["src"], ld = { class: "fo-bili-toolbar" }, nd = { class: "fo-feed-count-tag" }, ad = {
  key: 1,
  class: "fo-bili-loading"
}, rd = {
  key: 2,
  class: "fo-bili-empty"
}, ud = {
  key: 0,
  class: "fo-bili-empty"
}, dd = ["onDragstart"], cd = { class: "fo-bili-thumb" }, pd = ["href", "onClick"], bd = ["src"], vd = { class: "fo-bili-count" }, fd = { class: "fo-bili-duration" }, gd = { class: "fo-bili-title-row" }, md = ["href", "onClick"], hd = ["aria-expanded", "onClick"], yd = {
  key: 0,
  class: "fo-card-menu"
}, _d = ["onClick"], kd = ["onClick"], $d = ["onClick"], wd = ["onClick"], Cd = { class: "fo-bili-meta" }, xd = ["onClick"], Sd = { class: "fo-pager" }, Td = ["disabled"], Pd = { class: "fo-page-num" }, Md = ["disabled"], Dd = {
  key: 4,
  id: "fo-vue-subscription-main",
  class: "fo-bili-main fo-vue-subscription-main"
}, Id = { class: "bili-sub-vue-shell" }, Ed = {
  key: 0,
  class: "fo-bili-loading"
}, Rd = {
  key: 1,
  class: "fo-bili-empty"
}, zd = {
  key: 2,
  class: "fo-bili-empty"
}, Bd = {
  key: 3,
  class: "bili-sub-layout bili-sub-vue-layout"
}, Ld = {
  key: 5,
  id: "fo-vue-radio-main",
  class: "fo-bili-main fo-vue-radio-main"
}, Ad = { class: "fo-bili-hero fo-radio-hero" }, Nd = { class: "fo-bili-actions" }, Vd = { class: "bili-radio-layout fo-vue-radio-layout" }, Fd = { class: "bili-radio-folders" }, Gd = { id: "bili-radio-folders" }, Ud = ["onClick"], Od = {
  key: 0,
  class: "muted small"
}, qd = { class: "bili-radio-library" }, Hd = {
  key: 0,
  role: "alert",
  class: "muted small"
}, Wd = {
  id: "bili-radio-videos",
  class: "bili-radio-videos"
}, Kd = ["title", "onDragstart", "onClick"], jd = ["src"], Yd = { key: 1 }, Xd = {
  key: 0,
  class: "muted small"
}, Qd = { class: "bili-radio-editor" }, Jd = { class: "bili-radio-name-row" }, Zd = ["placeholder", "onKeydown"], ec = { class: "bili-radio-btn-group" }, tc = { class: "bili-radio-series-dropdown-wrap" }, ic = {
  value: "",
  disabled: "",
  selected: ""
}, sc = ["value"], oc = {
  id: "bili-radio-queue",
  class: "bili-radio-queue",
  "aria-label": "电台播放队列"
}, lc = ["onClick"], nc = { class: "bili-radio-queue-no" }, ac = ["src"], rc = { key: 1 }, uc = ["aria-label", "onClick"], dc = {
  key: 0,
  class: "muted small"
}, cc = { class: "bili-radio-actions" }, pc = ["disabled"], bc = ["disabled"], vc = ["title"], fc = {
  key: 2,
  class: "fo-context-divider"
}, gc = /* @__PURE__ */ Me({
  __name: "BilibiliWorkspace",
  setup(J) {
    const c = T(!1);
    function k() {
      const a = R.radioSeriesName?.trim();
      if (!a) {
        c.value = !0;
        const t = document.getElementById("bili-radio-name");
        t && t.focus(), We.fetch(A("bili.radioAppName"), A("bili.radioNameEmpty"));
        return;
      }
      c.value = !1, m("radio-save", { name: a });
    }
    async function g() {
      const a = document.getElementById("bili-radio-name");
      a && (a.focus(), a.select(), We.fetch(A("bili.radioAppName"), A("bili.radioInputFocused")));
    }
    function P(a) {
      const t = a.target, i = t.value;
      if (i) {
        if (i === "__create_new__") {
          m("radio-clear"), R.radioSeriesName = "", We.fetch("哔哩哔哩电台", "已开启新系列创作，请从左侧添加视频"), t.value = "";
          return;
        }
        m("radio-load-series", i);
      }
    }
    function z(a, t) {
      !t.mid && !t.name || ge.showUpRecentVideosPreview(
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
      ti.togglePanel();
    }
    const r = Q(() => R.organizer), $ = T(!1), { active: w } = Ht("daily-bilibili", "/bilibili.html");
    oe(() => w.value && r.value.mode === "recommendations", (a) => {
      ge.setRecommendationsActive(a);
    }, { immediate: !0, flush: "sync" }), oe(() => w.value && r.value.mode === "following", (a) => {
      ge.setFollowingActive(a);
    }, { immediate: !0, flush: "sync" }), oe(() => w.value && r.value.mode === "subscription", (a) => {
      ge.setSubscriptionActive(a);
    }, { immediate: !0, flush: "sync" }), oe(() => w.value && r.value.mode === "cache", (a) => {
      a || ($.value = !1);
    });
    const F = T(r.value.query), Y = T(null), U = T(7), O = T(1), ne = Q(() => U.value * 3), X = Q(() => Math.max(1, Math.ceil(r.value.cachedVideos.length / ne.value))), Ce = Q(() => r.value.cachedVideos.slice((O.value - 1) * ne.value, O.value * ne.value));
    oe(X, (a) => {
      O.value = Math.min(O.value, a);
    });
    const ae = Q(() => !!r.value.loadedFolderId && r.value.loadedFolderId === R.activeFolderId), K = T(""), j = T({ visible: !1, x: 0, y: 0, video: null, folder: null }), { menuRef: de, style: xe } = ii({
      visible: () => j.value.visible,
      anchor: () => j.value,
      dismiss: () => {
        j.value.visible = !1;
      }
    }), se = T(
      typeof localStorage < "u" && localStorage.getItem("bili_sidebar_features_collapsed") === "true"
    );
    function $e() {
      se.value = !se.value;
      try {
        localStorage.setItem("bili_sidebar_features_collapsed", String(se.value));
      } catch {
      }
    }
    function Te() {
      _e.bvid && Ot.open({
        bvid: _e.bvid,
        cid: _e.cid,
        title: _e.title
      });
    }
    function ce() {
      _e.collapsed && Je.toggleCollapse(), Je.bringToFront();
    }
    function Be() {
      Je.close();
    }
    oe(() => r.value.query, (a) => {
      F.value = a;
    }), oe(F, (a) => {
      (!a || !a.trim()) && r.value.query && m("organizer-search", "");
    });
    function m(a, t) {
      Re.dispatch(a, t);
    }
    function pe(a) {
      a.group || nt(), m(a.group ? "toggle-folder-group" : "select-folder", { id: a.id, kind: a.kind });
    }
    const I = T(""), b = T(""), G = T("before"), Z = T(!1);
    function _(a, t) {
      t.kind === "created" && (I.value = t.id, a.dataTransfer?.setData("application/x-logicweaver-favorite-node", t.id), a.dataTransfer?.setData("text/plain", t.id), a.dataTransfer && (a.dataTransfer.effectAllowed = "move"));
    }
    function u(a, t) {
      if (t.kind !== "created" || !I.value || I.value === t.id) return;
      a.preventDefault(), a.dataTransfer && (a.dataTransfer.dropEffect = "move");
      const i = a.currentTarget;
      if (!i) return;
      const d = i.getBoundingClientRect(), D = (a.clientY - d.top) / Math.max(1, d.height), ie = t.group && D > 0.25 && D < 0.75 ? "into" : D >= 0.5 ? "after" : "before";
      b.value = t.id, G.value = ie;
    }
    function v(a, t) {
      const i = a.relatedTarget, d = a.currentTarget;
      d && i && d.contains(i) || b.value === t.id && (b.value = "");
    }
    function E() {
      I.value = "", b.value = "", Z.value = !1;
    }
    function le(a, t) {
      a.preventDefault();
      const i = I.value || a.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "", d = G.value || (t.group ? "into" : "after");
      E(), !(!i || i === t.id || t.kind !== "created") && m("move-folder-node", { sourceId: i, targetId: t.id, mode: d });
    }
    function Le(a) {
      I.value && (a.preventDefault(), a.dataTransfer && (a.dataTransfer.dropEffect = "move"), Z.value = !0);
    }
    function Ke(a) {
      const t = a.relatedTarget, i = a.currentTarget;
      i && t && i.contains(t) || (Z.value = !1);
    }
    function Ae(a) {
      a.preventDefault();
      const t = I.value || a.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
      E(), t && m("move-folder-node", { sourceId: t, targetId: "root", mode: "into" });
    }
    function Oe() {
      const a = F.value.trim();
      m("organizer-search", a);
    }
    function De() {
      !F.value.trim() && r.value.query && m("organizer-search", "");
    }
    const be = T(""), we = T(!1), me = T(!1), Ie = T("hot"), Ye = T(""), C = Q(() => Ie.value === "live" ? A("bili.searchLiveTitle", { keyword: Ye.value }) : A("bili.searchSuggestTitle")), h = Q(() => Ie.value === "live" ? A("bili.searchLiveSubtitle") : A("bili.searchSuggestSubtitle")), p = T([]), x = T(null), N = T(!1), V = T(""), q = T(1), ee = T(0), te = T(!1), Ne = T(!1), Ve = T(""), qe = T([]);
    let Fe = 0, ve = 0;
    oe(() => r.value.mode, (a) => {
      a !== "recommendations" && nt();
    });
    const He = T([]);
    let ht = 0, it = null;
    function st(a) {
      if (!a) return null;
      const t = a.bvid || (String(a.param || "").startsWith("BV") ? a.param : "");
      if (!t && !a.aid && !a.id) return null;
      const i = String(a.pic || a.cover || "").replace(/^http:/, "https:"), d = i.startsWith("//") ? `https:${i}` : i, D = String(a.title || "").replace(/<[^>]+>/g, ""), ie = Number(a.duration || 0), je = ie > 0 ? `${Math.floor(ie / 60)}:${String(ie % 60).padStart(2, "0")}` : String(a.duration || ""), Ge = a.stat?.view || a.play || 0, Ft = Number(Ge) >= 1e4 ? `${(Number(Ge) / 1e4).toFixed(1)}万` : String(Number(Ge || 0)), Gt = a.owner?.name || a.name || a.author || A("bili.upDefault");
      return {
        bvid: t,
        aid: String(a.aid || a.id || ""),
        title: D,
        cover: d,
        durationText: je,
        playText: Ft,
        upper: Gt
      };
    }
    async function ot() {
      if (Ie.value = "hot", we.value = !0, He.value.length && Date.now() - ht < 9e4) {
        p.value = He.value;
        return;
      }
      me.value = !0;
      try {
        const t = await (await fetch("https://api.bilibili.com/x/web-interface/index/top/feed/rcmd?ps=8&fresh_idx=1", { credentials: "include" })).json();
        let i = Array.isArray(t.data?.item) ? t.data.item : [];
        if (!i.length) {
          const ie = await (await fetch("https://api.bilibili.com/x/web-interface/popular?ps=8&pn=1", { credentials: "include" })).json();
          i = Array.isArray(ie.data?.list) ? ie.data.list : [];
        }
        const d = i.map(st).filter(Boolean);
        He.value = d, ht = Date.now(), be.value.trim() || (p.value = d);
      } catch {
        p.value = [];
      } finally {
        me.value = !1;
      }
    }
    function zt() {
      be.value.trim() ? yt(be.value.trim()) : ot();
    }
    function Bt() {
      const a = be.value.trim();
      if (clearTimeout(it), !a) {
        ot();
        return;
      }
      it = setTimeout(() => {
        yt(a);
      }, 320);
    }
    async function yt(a) {
      const t = ++ve;
      we.value = !0, Ie.value = "live", Ye.value = a, me.value = !0;
      try {
        let i = null;
        if (window.LogicWeaverBiliSearchActions?.search)
          try {
            i = await window.LogicWeaverBiliSearchActions.search(a);
          } catch {
          }
        if (!i || i.code !== 0) {
          const D = `search_type=video&keyword=${encodeURIComponent(a)}&page=1&page_size=12`;
          i = await (await fetch(`https://api.bilibili.com/x/web-interface/search/type?${D}`, { credentials: "include" })).json();
        }
        if (t !== ve || be.value.trim() !== a) return;
        const d = Array.isArray(i?.data?.result) ? i.data.result : [];
        p.value = d.slice(0, 10).map(st).filter(Boolean);
      } catch {
        t === ve && (p.value = []);
      } finally {
        t === ve && (me.value = !1);
      }
    }
    function lt(a) {
      we.value = !1;
      const t = a.bvid || (String(a.param || a.id || "").startsWith("BV") ? a.param || a.id : "");
      t || a.aid ? Je.openVideo({
        bvid: t,
        aid: a.aid,
        title: a.title,
        cover: a.cover,
        author: a.upper
      }) : window.LogicWeaverBiliSearchActions?.local ? window.LogicWeaverBiliSearchActions.local(a) : window.open(`https://www.bilibili.com/video/${t || a.bvid || a.id}`, "_blank");
    }
    function _t(a, t) {
      wt(a, {
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
    function nt() {
      N.value = !1, Fe++, Ne.value = !1;
    }
    async function Xe(a, t) {
      const i = ++Fe;
      N.value = !0, V.value = a, q.value = t, Ne.value = !0, Ve.value = "", qe.value = [], ee.value = 0, te.value = !1;
      try {
        let d;
        try {
          d = await ge.searchActions.search(a, t, 20);
        } catch {
        }
        if (!d || d.code !== 0) {
          const je = new URLSearchParams({ search_type: "video", keyword: a, page: String(t), page_size: "20" }), Ge = await fetch(`https://api.bilibili.com/x/web-interface/search/type?${je}`, { credentials: "include" });
          if (!Ge.ok) throw new Error(`HTTP ${Ge.status}`);
          d = await Ge.json();
        }
        if (d?.code !== 0 || !Array.isArray(d?.data?.result))
          throw new Error(d?.message || "B站没有返回有效的搜索结果");
        if (i !== Fe) return;
        const D = d.data.result;
        qe.value = D.map(st).filter(Boolean);
        const ie = Number(d.data.numPages || d.data.num_pages || 0);
        ee.value = Number.isFinite(ie) && ie > 0 ? Math.floor(ie) : 0, te.value = ee.value ? t < ee.value : D.length >= 20;
      } catch (d) {
        i === Fe && (Ve.value = `搜索失败：${d instanceof Error ? d.message : "请稍后重试"}`);
      } finally {
        i === Fe && (Ne.value = !1);
      }
    }
    function kt() {
      const a = be.value.trim();
      if (clearTimeout(it), ve++, me.value = !1, we.value = !1, !a) {
        ot();
        return;
      }
      Xe(a, 1);
    }
    oe(() => [w.value, Jt.bilibili?.id], ([a, t]) => {
      if (!a || !t) return;
      const i = Qt("bilibili");
      i && (m("open-recommendations"), be.value = i.keyword, kt());
    }, { immediate: !0 });
    function $t(a) {
      x.value && !x.value.contains(a.target) && (we.value = !1);
    }
    function at(a) {
      j.value.visible = !1, K.value = K.value === a ? "" : a;
    }
    function wt(a, t, i = !0) {
      K.value = "", j.value = {
        visible: !0,
        x: a.clientX,
        y: a.clientY,
        video: t,
        folder: i && R.activeFolderId ? { id: String(R.activeFolderId), title: r.value.folderTitle } : null
      };
    }
    function Qe(a) {
      if (a instanceof KeyboardEvent) {
        a.key === "Escape" && (K.value = "", j.value.visible = !1, r.value.isTargetPickMode && m("organizer-cancel-move-target"));
        return;
      }
      const t = a.target;
      t?.closest(".fo-card-menu, .fo-card-more") || (K.value = ""), t?.closest(".fo-context-menu") || (j.value.visible = !1);
    }
    const rt = typeof document < "u" && document.body.classList.contains("bili-standalone-body");
    function ut() {
      const a = Y.value;
      if (!a || !a.clientWidth) return;
      const t = getComputedStyle(a), i = a.clientWidth - parseFloat(t.paddingLeft) - parseFloat(t.paddingRight), d = parseFloat(t.getPropertyValue("--favorite-card-min")) || 168, D = qt(i, d);
      if (D !== U.value) {
        const je = (O.value - 1) * ne.value;
        U.value = D, O.value = Math.floor(je / ne.value) + 1;
      }
      r.value.mode === "organizer" && Re.setOrganizerColumns(D);
      const ie = D * 3;
      r.value.mode === "recommendations" && ge.rcmdState.pageSize !== ie && (ge.rcmdState.pageSize = ie, ge.loadRecommendations(!0)), r.value.mode === "following" && ge.feedState.pageSize !== ie && (ge.feedState.pageSize = ie, ge.loadFollowing(!0));
    }
    oe(Y, (a, t, i) => {
      if (!a) return;
      let d;
      const D = new ResizeObserver(() => {
        clearTimeout(d), d = setTimeout(ut, 180);
      });
      D.observe(a), i(() => {
        clearTimeout(d), D.disconnect();
      });
    }, { flush: "post" }), oe(() => r.value.loading, (a) => {
      a || ut();
    }), tt(() => {
      import("./bilibili-channel.service-YdWu3jmZ.js").catch((a) => console.error("[Bilibili] 频道动作服务加载失败", a)), ut(), Re.loadOrganizer(), document.addEventListener("pointerdown", Qe, !0), document.addEventListener("pointerdown", $t), window.addEventListener("keydown", Qe), window.setBiliMiniDockVisible?.(!0), requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }), oe(() => [r.value.videos, r.value.mode], () => {
      requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }, { flush: "post" }), Rt(() => {
      ge.setRecommendationsActive(!1), ge.setFollowingActive(!1), ge.setSubscriptionActive(!1), document.removeEventListener("pointerdown", Qe, !0), document.removeEventListener("pointerdown", $t), window.removeEventListener("keydown", Qe);
    });
    function dt(a, t) {
      K.value = "", j.value.visible = !1;
      const i = String(typeof a == "object" ? a.id || a.bvid || a.aid || "" : a), d = typeof a == "object" ? a : r.value.videos.find((D) => String(D.id) === i);
      m("organizer-video-action", { id: i, video: d, action: t });
    }
    async function Pe(a) {
      const { video: t, folder: i } = j.value;
      if (j.value.visible = !1, a === "add-radio" && t) {
        try {
          const d = await Ze.addToDefaultSeries({
            bvid: t.bvid || (t.id.startsWith("BV") ? t.id : ""),
            title: t.title,
            author: t.author,
            cover: t.cover,
            duration: Zt(t.duration)
          });
          We.fetch("B站电台", d ? "已添加到默认系列" : "已在默认系列中");
        } catch {
          We.fetch("B站电台", "添加失败，请重试");
        }
        return;
      }
      if (a === "share-chat") {
        if (!t) return;
        try {
          const { chatService: d } = await import("./search.service-B3Axreqn.js").then((ie) => ie.aW), { windowManagerController: D } = await import("./window-manager.store-D9RSYghK.js").then((ie) => ie.n);
          d.sendBiliShare({
            bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
            aid: t.aid,
            title: t.title,
            cover: t.cover,
            upName: t.author,
            upMid: t.authorMid,
            upFace: t.authorFace,
            play: t.playCount
          }), D.open("chat");
        } catch (d) {
          console.warn("分享到聊天室失败", d);
        }
        return;
      }
      t && m("organizer-video-action", { id: t.id || "", video: t, action: a });
    }
    function Lt(a) {
      const t = R.radioSeriesName?.trim();
      let i = R.radioSeries.find((d) => d.name === t);
      if (!i && R.radioQueue.length && (i = {
        id: `series_${Date.now()}`,
        name: t || "未命名电台系列",
        count: R.radioQueue.length,
        items: R.radioQueue
      }), !i || !i.items?.length) {
        We.fetch("哔哩哔哩电台", "当前没有可分享的系列曲目，请先添加曲目");
        return;
      }
      Pt.sendBiliSeriesShare(i, a);
    }
    function At(a) {
      const { video: t } = j.value;
      j.value.visible = !1, t && Pt.sendBiliShare({
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
    function Nt(a) {
      if (!r.value.isTargetPickMode) return;
      if (!a.target?.closest(".fo-bili-folder-list")) {
        const i = document.querySelector(".fo-bili-folder-list");
        i && (a.preventDefault(), i.scrollTop += a.deltaY);
      }
    }
    function Ct(a) {
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
    function ct(a, t) {
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
      const D = Ct(t.title);
      a.dataTransfer.setDragImage(D, 72, 25), setTimeout(() => {
        D.parentNode && D.parentNode.removeChild(D);
      }, 0);
    }
    function Vt(a, t) {
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
      const d = Ct(t.title);
      a.dataTransfer.setDragImage(d, 72, 25), setTimeout(() => {
        d.parentNode && d.parentNode.removeChild(d);
      }, 0);
    }
    return (a, t) => (s(), o("section", {
      id: "daily-bilibili",
      class: L(["card wide", { "card-fullscreen": n(rt) || n(ft).activeId === "daily-bilibili" }])
    }, [
      e("div", Nn, [
        e("div", Vn, [
          e("div", {
            class: L(["fo-bili-layout", { "fo-picking-move-target": r.value.isTargetPickMode }]),
            "data-vue-organizer-shell": "true",
            onWheel: Nt
          }, [
            e("aside", Fn, [
              e("div", {
                class: L(["fo-sidebar-toggle-bar", { "is-collapsed": se.value }]),
                title: se.value ? n(A)("bili.channel.expandTip") : n(A)("bili.channel.collapseTip"),
                onClick: $e
              }, [
                e("div", Un, [
                  t[55] || (t[55] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                  e("span", null, l(n(A)("bili.channel.title")), 1),
                  se.value ? (s(), o("span", On, "5")) : y("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "fo-sidebar-toggle-action",
                  "aria-expanded": !se.value,
                  title: se.value ? n(A)("bili.channel.expand") : n(A)("bili.channel.collapse")
                }, [
                  e("span", null, l(se.value ? n(A)("bili.channel.expand") : n(A)("bili.channel.collapse")), 1),
                  e("span", Hn, l(se.value ? "▾" : "▴"), 1)
                ], 8, qn)
              ], 10, Gn),
              ue(e("div", Wn, [
                e("div", Kn, [
                  e("button", {
                    id: "fo-sidebar-sub-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "subscription" }]),
                    title: n(A)("bili.channel.subVideoTip"),
                    onClick: t[0] || (t[0] = (i) => m("open-sub-video"))
                  }, [
                    e("div", Yn, [
                      t[56] || (t[56] = e("span", { class: "fo-sidebar-sub-icon" }, "🎬", -1)),
                      e("div", Xn, [
                        e("strong", null, l(n(A)("bili.channel.subVideo")), 1),
                        e("small", null, l(n(A)("bili.channel.subVideoSub")), 1)
                      ])
                    ]),
                    t[57] || (t[57] = e("span", { class: "fo-sidebar-sub-badge" }, "NEW", -1))
                  ], 10, jn)
                ]),
                e("div", Qn, [
                  e("button", {
                    id: "fo-sidebar-cache-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "cache" }]),
                    title: n(A)("bili.channel.cacheVideoTip"),
                    onClick: t[1] || (t[1] = (i) => m("open-cache"))
                  }, [
                    e("div", Zn, [
                      t[58] || (t[58] = e("span", { class: "fo-sidebar-sub-icon" }, "💾", -1)),
                      e("div", ea, [
                        e("strong", null, l(n(A)("bili.channel.cacheVideo")), 1),
                        e("small", null, l(n(A)("bili.channel.cacheVideoSub")), 1)
                      ])
                    ]),
                    t[59] || (t[59] = e("span", { class: "fo-sidebar-sub-badge" }, "LOCAL", -1))
                  ], 10, Jn)
                ]),
                e("div", ta, [
                  e("button", {
                    id: "fo-sidebar-following-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "following" }]),
                    title: n(A)("bili.channel.followingTip"),
                    onClick: t[2] || (t[2] = (i) => m("open-following"))
                  }, [
                    e("div", sa, [
                      t[60] || (t[60] = e("span", { class: "fo-sidebar-sub-icon" }, "📺", -1)),
                      e("div", oa, [
                        e("strong", null, l(n(A)("bili.channel.following")), 1),
                        e("small", null, l(n(A)("bili.channel.followingSub")), 1)
                      ])
                    ]),
                    t[61] || (t[61] = e("span", { class: "fo-sidebar-sub-badge" }, "FEED", -1))
                  ], 10, ia)
                ]),
                e("div", la, [
                  e("button", {
                    id: "fo-sidebar-recommend-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "recommendations" }]),
                    title: n(A)("bili.channel.forYouTip"),
                    onClick: t[3] || (t[3] = (i) => m("open-recommendations"))
                  }, [
                    e("div", aa, [
                      t[62] || (t[62] = e("span", { class: "fo-sidebar-sub-icon" }, "✨", -1)),
                      e("div", ra, [
                        e("strong", null, l(n(A)("bili.channel.forYou")), 1),
                        e("small", null, l(n(A)("bili.channel.forYouSub")), 1)
                      ])
                    ]),
                    t[63] || (t[63] = e("span", { class: "fo-sidebar-sub-badge" }, "FOR YOU", -1))
                  ], 10, na)
                ]),
                e("div", ua, [
                  e("button", {
                    id: "fo-sidebar-radio-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "radio" }]),
                    title: n(A)("bili.channel.radioTip"),
                    onClick: t[4] || (t[4] = (i) => m("open-radio"))
                  }, [
                    e("div", ca, [
                      t[64] || (t[64] = e("span", { class: "fo-sidebar-sub-icon" }, "📻", -1)),
                      e("div", pa, [
                        e("strong", null, l(n(A)("bili.channel.radio")), 1),
                        e("small", null, l(n(A)("bili.channel.radioSub")), 1)
                      ])
                    ]),
                    t[65] || (t[65] = e("span", { class: "fo-sidebar-sub-badge" }, "RADIO", -1))
                  ], 10, da)
                ])
              ], 512), [
                [mt, !se.value]
              ]),
              e("div", ba, [
                e("div", va, [
                  t[66] || (t[66] = e("span", { class: "fo-sidebar-sub-icon" }, "📁", -1)),
                  e("div", fa, [
                    e("strong", null, l(n(A)("bili.channel.foldersHub")), 1),
                    e("small", null, l(n(A)("bili.channel.foldersHubSub")), 1)
                  ])
                ]),
                e("button", {
                  class: "fo-sidebar-hub-add",
                  type: "button",
                  title: n(A)("bili.channel.createFolderTip"),
                  "aria-label": n(A)("bili.channel.createFolderTip"),
                  onClick: t[5] || (t[5] = (i) => m("create-bili-folder"))
                }, "＋", 8, ga)
              ]),
              r.value.isTargetPickMode ? (s(), o("div", ma, [
                t[67] || (t[67] = e("div", { class: "fo-move-target-tip" }, [
                  e("span", { class: "fo-move-target-dot" }),
                  e("span", null, [
                    re("请点击"),
                    e("strong", null, "自建收藏夹"),
                    re("移入")
                  ])
                ], -1)),
                e("button", {
                  type: "button",
                  class: "fo-move-target-cancel",
                  title: "取消移动 (按 Esc 也可取消)",
                  onClick: t[6] || (t[6] = (i) => m("organizer-cancel-move-target"))
                }, " ✕ 取消 ")
              ])) : y("", !0),
              e("nav", ha, [
                (s(!0), o(B, null, W(r.value.folders, (i, d) => (s(), o(B, {
                  key: `${i.group ? "group" : "folder"}:${i.id}`
                }, [
                  d > 0 && r.value.folders[d - 1]?.kind !== i.kind ? (s(), o("div", ya)) : y("", !0),
                  d === 0 || r.value.folders[d - 1]?.kind !== i.kind ? (s(), o("div", {
                    key: 1,
                    class: L(["fo-bili-section-head fo-vue-section-head", { "drag-into": i.kind === "created" && Z.value }]),
                    onDragover: (D) => i.kind === "created" ? Le(D) : void 0,
                    onDragleave: (D) => i.kind === "created" ? Ke(D) : void 0,
                    onDrop: (D) => i.kind === "created" ? Ae(D) : void 0
                  }, [
                    e("span", ka, [
                      e("b", null, l(i.kind === "collected" ? "我追的合集/收藏夹" : i.kind === "other" ? "其他收藏" : "我创建的收藏夹"), 1)
                    ]),
                    i.kind === "created" ? (s(), o("button", {
                      key: 0,
                      class: "fo-bili-section-add-btn",
                      type: "button",
                      title: "新建插件分组",
                      "aria-label": "新建插件分组",
                      onClick: t[7] || (t[7] = S((D) => m("create-local-group"), ["stop"]))
                    }, "＋")) : y("", !0)
                  ], 42, _a)) : y("", !0),
                  i.group ? (s(), o("div", {
                    key: 3,
                    class: L(["fo-bili-group-label", {
                      collapsed: i.collapsed,
                      dragging: I.value === i.id,
                      "drag-before": b.value === i.id && G.value === "before",
                      "drag-after": b.value === i.id && G.value === "after",
                      "drag-into": b.value === i.id && G.value === "into"
                    }]),
                    style: ye({ "--fo-depth": i.depth }),
                    role: "button",
                    tabindex: "0",
                    "aria-expanded": !i.collapsed,
                    draggable: !0,
                    onClick: (D) => pe(i),
                    onKeydown: [
                      Ee(S((D) => pe(i), ["prevent"]), ["enter"]),
                      Ee(S((D) => pe(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (D) => _(D, i),
                    onDragover: (D) => u(D, i),
                    onDragleave: (D) => v(D, i),
                    onDrop: (D) => le(D, i),
                    onDragend: E
                  }, [
                    e("i", Ca, l(i.collapsed ? "›" : "⌄"), 1),
                    t[69] || (t[69] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, wa)) : (s(), o("div", {
                    key: 2,
                    role: "button",
                    tabindex: "0",
                    class: L(["fo-bili-folder", {
                      on: i.selected,
                      dragging: I.value === i.id,
                      "drag-before": b.value === i.id && G.value === "before",
                      "drag-after": b.value === i.id && G.value === "after",
                      "drag-into": b.value === i.id && G.value === "into",
                      "target-candidate": r.value.isTargetPickMode && i.kind === "created" && !i.selected
                    }]),
                    "data-folder-id": i.id,
                    "data-folder-kind": i.kind,
                    style: ye({ "--fo-depth": i.depth }),
                    draggable: i.kind === "created",
                    onClick: (D) => pe(i),
                    onKeydown: [
                      Ee(S((D) => pe(i), ["prevent"]), ["enter"]),
                      Ee(S((D) => pe(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (D) => _(D, i),
                    onDragover: (D) => u(D, i),
                    onDragleave: (D) => v(D, i),
                    onDrop: (D) => le(D, i),
                    onDragend: E
                  }, [
                    t[68] || (t[68] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, $a))
                ], 64))), 128)),
                !r.value.loading && !r.value.error && !r.value.folders.length ? (s(), o("p", xa, "暂无可用收藏夹。")) : y("", !0)
              ])
            ]),
            r.value.mode === "organizer" ? (s(), o("section", {
              key: 0,
              id: "fo-vue-main",
              ref_key: "organizerMain",
              ref: Y,
              class: "fo-bili-main"
            }, [
              r.value.loading && !N.value && !ae.value ? (s(), o("div", Sa, [...t[70] || (t[70] = [
                e("i", null, null, -1),
                e("span", null, "正在读取 B站收藏内容…", -1)
              ])])) : !N.value && r.value.error && r.value.error.includes("未登录") ? (s(), o("div", Ta, [
                e("div", Pa, [
                  t[72] || (t[72] = e("span", { class: "fo-bili-login-icon" }, "📺", -1)),
                  t[73] || (t[73] = e("h3", null, "未检测到哔哩哔哩登录状态", -1)),
                  t[74] || (t[74] = e("p", null, "tab-Project 直接复用当前浏览器的 B站 网页会话，无需输入账号密码或扫码授权。", -1)),
                  e("div", Ma, [
                    t[71] || (t[71] = e("a", {
                      class: "fo-bili-btn-login",
                      href: "https://passport.bilibili.com/login",
                      target: "_blank",
                      rel: "noreferrer"
                    }, "前往 bilibili.com 登录 ↗", -1)),
                    e("button", {
                      type: "button",
                      class: "fo-bili-btn-refresh",
                      onClick: t[8] || (t[8] = (i) => m("organizer-refresh"))
                    }, "已登录，点击刷新 ↻")
                  ])
                ])
              ])) : !N.value && r.value.error && !ae.value ? (s(), o("p", Da, l(r.value.error), 1)) : (s(), o(B, { key: 3 }, [
                e("header", Ia, [
                  e("div", Ea, [
                    e("div", {
                      class: L(["fo-bili-cover", { "fo-vue-cover-image": r.value.folderCover }])
                    }, [
                      r.value.folderCover ? (s(), o("img", {
                        key: 0,
                        src: r.value.folderCover,
                        alt: "",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Ra)) : (s(), o("i", za))
                    ], 2),
                    e("div", Ba, [
                      e("h3", null, l(r.value.folderTitle), 1),
                      e("p", null, l(r.value.folderSubtitle), 1)
                    ])
                  ]),
                  e("div", La, [
                    e("button", {
                      id: "bili-header-msg-center-btn",
                      class: L(["fm-tab bili-header-msg-btn hero-action-btn", { "is-active": n(ei).isOpen }]),
                      type: "button",
                      title: n(A)("bili.workspace.msgCenterTip"),
                      onClick: M
                    }, [
                      t[75] || (t[75] = e("span", { class: "bili-header-msg-icon" }, "🔔", -1)),
                      e("span", Na, l(n(A)("bili.workspace.msgBtn")), 1)
                    ], 10, Aa),
                    e("button", {
                      id: "bili-up-group-manager-top",
                      class: "fm-tab bili-header-up-group-btn hero-action-btn",
                      type: "button",
                      title: n(A)("bili.workspace.upGroupManagerTip"),
                      onClick: t[9] || (t[9] = (i) => m("manage-up-groups"))
                    }, l(n(A)("bili.workspace.upGroupManager")), 9, Va),
                    e("button", {
                      type: "button",
                      class: "primary hero-action-btn",
                      disabled: !r.value.videos.length,
                      onClick: t[10] || (t[10] = (i) => m("organizer-batch-toggle"))
                    }, l(r.value.batchMode ? n(A)("bili.workspace.batchBack") : n(A)("bili.workspace.batch")), 9, Fa)
                  ])
                ]),
                e("div", Ga, [
                  r.value.batchMode ? y("", !0) : (s(), o("div", Ua, [
                    (s(!0), o(B, null, W([{ id: "fav_time", text: n(A)("bili.sort.favTime") }, { id: "view", text: n(A)("bili.sort.view") }, { id: "pubtime", text: n(A)("bili.sort.pubTime") }], (i) => (s(), o("button", {
                      key: i.id,
                      type: "button",
                      class: L({ on: r.value.sort === i.id }),
                      onClick: (d) => m("organizer-sort", i.id)
                    }, l(i.text), 11, Oa))), 128))
                  ])),
                  e("div", qa, [
                    n(_e).isOpen && n(_e).bvid ? (s(), o("div", {
                      key: 0,
                      class: L(["fo-video-tab-item", { "is-collapsed": n(_e).collapsed }]),
                      title: n(_e).title
                    }, [
                      e("div", {
                        class: "fo-video-tab-meta",
                        onClick: ce
                      }, [
                        e("span", {
                          class: L(["fo-video-tab-pulse", { playing: n(_e).isPlaying }])
                        }, null, 2),
                        e("span", Wa, l(n(_e).title), 1)
                      ]),
                      e("div", Ka, [
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-close",
                          title: "关闭视频",
                          onClick: S(Be, ["stop"])
                        }, " ✕ "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-sub",
                          title: "查看该视频完整纯文本字幕",
                          onClick: S(Te, ["stop"])
                        }, " 字幕 "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-expand",
                          title: n(_e).collapsed ? "放大恢复视频小窗" : "聚焦视频小窗",
                          onClick: S(ce, ["stop"])
                        }, " 放大 ", 8, ja)
                      ])
                    ], 10, Ha)) : y("", !0)
                  ]),
                  r.value.batchMode ? (s(), o("div", Ya, [
                    e("span", Xa, "已选择 " + l(r.value.selectedCount) + " 项", 1),
                    e("button", {
                      type: "button",
                      onClick: t[12] || (t[12] = (i) => m("organizer-batch-all"))
                    }, "全选/取消全选"),
                    e("button", {
                      type: "button",
                      class: L({ "picking-target": r.value.isTargetPickMode }),
                      onClick: t[13] || (t[13] = (i) => r.value.isTargetPickMode ? m("organizer-cancel-move-target") : m("organizer-batch-move"))
                    }, l(r.value.isTargetPickMode ? "✕ 取消移动" : "移动到"), 3),
                    e("button", {
                      type: "button",
                      onClick: t[14] || (t[14] = (i) => m("organizer-batch-cache"))
                    }, "缓存所选"),
                    e("button", {
                      type: "button",
                      onClick: t[15] || (t[15] = (i) => m("organizer-batch-unfavorite"))
                    }, "取消收藏")
                  ])) : (s(), o("form", {
                    key: 1,
                    class: "fo-bili-search",
                    onSubmit: S(Oe, ["prevent"])
                  }, [
                    ue(e("input", {
                      "onUpdate:modelValue": t[11] || (t[11] = (i) => F.value = i),
                      type: "search",
                      placeholder: "请输入关键词",
                      "aria-label": "搜索当前收藏夹",
                      onInput: De,
                      onSearch: De
                    }, null, 544), [
                      [Se, F.value]
                    ]),
                    t[76] || (t[76] = e("button", {
                      type: "submit",
                      title: "搜索"
                    }, "⌕", -1))
                  ], 32))
                ]),
                r.value.error ? (s(), o("p", Qa, l(r.value.error), 1)) : y("", !0),
                e("div", {
                  class: "fo-bili-grid fo-favorites-grid",
                  style: ye({ "--favorite-columns": r.value.pageSize / 3 }),
                  "aria-busy": r.value.loading
                }, [
                  r.value.videos.length ? y("", !0) : (s(), o("p", Za, l(r.value.query ? "没有找到匹配的视频。" : "这个收藏夹是空的。"), 1)),
                  (s(!0), o(B, null, W(r.value.videos, (i) => (s(), o("article", {
                    key: i.id,
                    class: L(["fo-bili-card", { "batch-selected": i.selected, "fo-single-moving": r.value.movingVideoId === i.id }]),
                    "data-batch-id": i.id,
                    draggable: "true",
                    onDragstart: (d) => ct(d, i),
                    onContextmenu: S((d) => wt(d, i), ["prevent", "stop"])
                  }, [
                    e("div", tr, [
                      r.value.batchMode ? (s(), o("label", ir, [
                        e("input", {
                          type: "checkbox",
                          checked: i.selected,
                          onChange: (d) => m("organizer-batch-select", i.id)
                        }, null, 40, sr),
                        t[77] || (t[77] = e("span", null, "✓", -1))
                      ])) : y("", !0),
                      e("a", {
                        class: "fo-cover-link",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: S((d) => m("organizer-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, lr)
                      ], 8, or),
                      e("span", nr, "▣ " + l(i.playCount), 1),
                      e("span", ar, l(i.duration), 1)
                    ]),
                    e("div", rr, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: S((d) => m("organizer-play-video", i), ["prevent"])
                      }, l(i.title), 9, ur),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": K.value === i.id,
                        onClick: S((d) => at(i.id), ["stop"])
                      }, "⋮", 8, dr),
                      K.value === i.id ? (s(), o("div", cr, [
                        i.writable ? (s(), o("button", {
                          key: 0,
                          type: "button",
                          class: "danger",
                          onClick: (d) => dt(i.id, "delete")
                        }, "取消收藏", 8, pr)) : y("", !0),
                        i.writable ? (s(), o("button", {
                          key: 1,
                          type: "button",
                          onClick: (d) => dt(i.id, "move")
                        }, "移动到", 8, br)) : y("", !0),
                        e("button", {
                          type: "button",
                          onClick: (d) => dt(i.id, "subtitle")
                        }, "字幕", 8, vr)
                      ])) : y("", !0)
                    ]),
                    e("div", fr, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: S((d) => z(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, l(i.author), 9, gr),
                      e("span", null, "收藏于 " + l(i.favoriteDate), 1)
                    ])
                  ], 42, er))), 128))
                ], 12, Ja),
                r.value.totalPages > 1 ? (s(), o("div", mr, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: r.value.loading || r.value.page <= 1,
                    onClick: t[16] || (t[16] = (i) => m("organizer-page", r.value.page - 1))
                  }, "‹ 上一页", 8, hr),
                  e("span", yr, l(r.value.page) + " / " + l(r.value.totalPages), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: r.value.loading || r.value.page >= r.value.totalPages,
                    onClick: t[17] || (t[17] = (i) => m("organizer-page", r.value.page + 1))
                  }, "下一页 ›", 8, _r)
                ])) : y("", !0)
              ], 64))
            ], 512)) : r.value.mode === "cache" ? (s(), o("section", {
              key: 1,
              id: "fo-vue-cache-main",
              ref_key: "organizerMain",
              ref: Y,
              class: "fo-bili-main"
            }, [
              $.value ? (s(), bt(Fo, {
                key: 0,
                active: n(w),
                onBack: t[18] || (t[18] = (i) => $.value = !1)
              }, null, 8, ["active"])) : (s(), o(B, { key: 1 }, [
                e("header", kr, [
                  e("div", $r, [
                    t[79] || (t[79] = e("div", { class: "fo-bili-cover" }, "💾", -1)),
                    e("div", wr, [
                      t[78] || (t[78] = e("h3", null, "缓存视频", -1)),
                      e("p", null, l(r.value.cachedVideos.length) + " 个缓存记录 · 点击缓存设置管理存放目录", 1)
                    ])
                  ]),
                  e("div", Cr, [
                    e("button", {
                      type: "button",
                      class: "primary",
                      onClick: t[19] || (t[19] = (i) => m("organizer-open"))
                    }, "返回收藏夹"),
                    e("button", {
                      type: "button",
                      onClick: t[20] || (t[20] = (i) => $.value = !0)
                    }, "缓存设置")
                  ])
                ]),
                r.value.cacheLoading ? (s(), o("div", xr, [...t[80] || (t[80] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取本地缓存…", -1)
                ])])) : (s(), o("div", {
                  key: 1,
                  class: "fo-bili-grid fo-favorites-grid fo-cached-video-grid",
                  style: ye({ "--favorite-columns": U.value })
                }, [
                  r.value.cachedVideos.length ? y("", !0) : (s(), o("p", Sr, "还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。")),
                  (s(!0), o(B, null, W(Ce.value, (i) => (s(), o("article", {
                    key: i.id,
                    class: "fo-bili-card fo-cached-video-card"
                  }, [
                    e("div", Tr, [
                      e("button", {
                        class: "fo-cached-play",
                        type: "button",
                        onClick: (d) => m("cache-play", i.id)
                      }, [
                        e("img", {
                          loading: "lazy",
                          referrerpolicy: "no-referrer",
                          src: i.cover,
                          alt: ""
                        }, null, 8, Mr),
                        t[81] || (t[81] = e("span", { class: "fo-cached-local-badge" }, "LOCAL", -1))
                      ], 8, Pr)
                    ]),
                    e("div", Dr, [
                      e("button", {
                        class: "fo-title-link fo-bili-title fo-cached-title",
                        type: "button",
                        onClick: (d) => m("cache-play", i.id)
                      }, l(i.title), 9, Ir),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "删除缓存",
                        onClick: (d) => m("cache-delete", i.id)
                      }, "×", 8, Er)
                    ]),
                    e("div", Rr, [
                      e("span", null, l(i.sizeText), 1),
                      e("span", null, "缓存于 " + l(i.cachedDate), 1)
                    ])
                  ]))), 128))
                ], 4)),
                X.value > 1 ? (s(), o("div", zr, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: O.value <= 1,
                    onClick: t[21] || (t[21] = (i) => O.value--)
                  }, "‹ 上一页", 8, Br),
                  e("span", Lr, l(O.value) + " / " + l(X.value), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: O.value >= X.value,
                    onClick: t[22] || (t[22] = (i) => O.value++)
                  }, "下一页 ›", 8, Ar)
                ])) : y("", !0)
              ], 64))
            ], 512)) : r.value.mode === "recommendations" ? (s(), o("section", {
              key: 2,
              id: "fo-vue-recommend-main",
              ref_key: "organizerMain",
              ref: Y,
              class: "fo-bili-main"
            }, [
              e("header", Nr, [
                t[82] || (t[82] = e("div", { class: "fo-bili-cover fo-vue-recommend-cover" }, [
                  e("span", null, "✨")
                ], -1)),
                e("div", Vr, [
                  e("div", Fr, [
                    e("h3", null, l(r.value.specialTitle), 1)
                  ]),
                  e("p", null, l(r.value.specialSubtitle), 1)
                ]),
                e("div", {
                  class: "card-fullscreen-bili-search fo-hero-bili-search",
                  ref_key: "searchHostRef",
                  ref: x
                }, [
                  e("form", {
                    class: "card-fullscreen-bili-searchbar",
                    role: "search",
                    onSubmit: S(kt, ["prevent"])
                  }, [
                    ue(e("input", {
                      "onUpdate:modelValue": t[23] || (t[23] = (i) => be.value = i),
                      type: "search",
                      autocomplete: "off",
                      placeholder: n(A)("bili.workspace.searchPlaceholder"),
                      "aria-label": n(A)("bili.workspace.searchAria"),
                      onFocus: zt,
                      onInput: Bt
                    }, null, 40, Gr), [
                      [Se, be.value]
                    ]),
                    e("button", {
                      type: "submit",
                      title: n(A)("bili.workspace.searchBtnTip")
                    }, "⌕", 8, Ur)
                  ], 32),
                  we.value ? (s(), o("div", Or, [
                    e("div", qr, [
                      e("span", null, l(C.value), 1),
                      e("small", null, l(h.value), 1)
                    ]),
                    me.value ? (s(), o("p", Hr, "正在获取推荐 / 搜索中…")) : !p.value.length && !me.value ? (s(), o("p", Wr, "暂无联想结果，按回车在插件内搜索")) : (s(!0), o(B, { key: 2 }, W(p.value, (i) => (s(), o("button", {
                      key: i.bvid || i.aid,
                      type: "button",
                      class: "card-fullscreen-bili-video-row",
                      role: "option",
                      onClick: (d) => lt(i),
                      onContextmenu: S((d) => _t(d, i), ["prevent"])
                    }, [
                      e("span", jr, [
                        e("img", {
                          src: i.cover,
                          alt: "",
                          referrerpolicy: "no-referrer",
                          loading: "lazy"
                        }, null, 8, Yr),
                        i.durationText ? (s(), o("i", Xr, l(i.durationText), 1)) : y("", !0)
                      ]),
                      e("span", Qr, [
                        e("strong", null, l(i.title), 1),
                        e("small", null, l(i.upper) + " · " + l(i.playText) + "播放", 1)
                      ])
                    ], 40, Kr))), 128))
                  ])) : y("", !0)
                ], 512),
                e("div", Jr, [
                  e("button", {
                    type: "button",
                    onClick: t[24] || (t[24] = (i) => m("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              N.value ? (s(), o(B, { key: 0 }, [
                e("div", Zr, [
                  e("div", eu, [
                    e("span", tu, "搜索结果：" + l(V.value), 1)
                  ]),
                  e("div", { class: "fo-bili-actions" }, [
                    e("button", {
                      type: "button",
                      onClick: nt
                    }, "返回个性推荐")
                  ])
                ]),
                Ne.value ? (s(), o("div", iu, [...t[83] || (t[83] = [
                  e("i", null, null, -1),
                  e("span", null, "正在搜索 B站视频…", -1)
                ])])) : Ve.value ? (s(), o("div", su, [
                  e("p", null, l(Ve.value), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    onClick: t[25] || (t[25] = (i) => Xe(V.value, q.value))
                  }, "重试")
                ])) : (s(), o(B, { key: 2 }, [
                  e("div", ou, [
                    qe.value.length ? y("", !0) : (s(), o("p", lu, "没有找到相关视频，换个关键词试试。")),
                    (s(!0), o(B, null, W(qe.value, (i) => (s(), o("article", {
                      key: i.bvid || i.aid,
                      class: "fo-bili-card",
                      onContextmenu: S((d) => _t(d, i), ["prevent", "stop"])
                    }, [
                      e("div", au, [
                        e("a", {
                          class: "fo-cover-link",
                          href: `https://www.bilibili.com/video/${i.bvid || `av${i.aid}`}`,
                          onClick: S((d) => lt(i), ["prevent"])
                        }, [
                          e("img", {
                            loading: "lazy",
                            decoding: "async",
                            referrerpolicy: "no-referrer",
                            src: i.cover,
                            alt: ""
                          }, null, 8, uu)
                        ], 8, ru),
                        e("span", du, "▣ " + l(i.playText), 1),
                        e("span", cu, l(i.durationText), 1)
                      ]),
                      e("div", pu, [
                        e("a", {
                          class: "fo-title-link fo-bili-title",
                          href: `https://www.bilibili.com/video/${i.bvid || `av${i.aid}`}`,
                          onClick: S((d) => lt(i), ["prevent"])
                        }, l(i.title), 9, bu)
                      ]),
                      e("div", vu, [
                        e("span", null, l(i.upper), 1)
                      ])
                    ], 40, nu))), 128))
                  ]),
                  q.value > 1 || te.value ? (s(), o("div", fu, [
                    e("button", {
                      type: "button",
                      class: "fo-btn",
                      disabled: q.value <= 1,
                      onClick: t[26] || (t[26] = (i) => Xe(V.value, q.value - 1))
                    }, "‹ 上一页", 8, gu),
                    e("span", mu, l(q.value) + l(ee.value ? ` / ${ee.value}` : ""), 1),
                    e("button", {
                      type: "button",
                      class: "fo-btn",
                      disabled: !te.value,
                      onClick: t[27] || (t[27] = (i) => Xe(V.value, q.value + 1))
                    }, "下一页 ›", 8, hu)
                  ])) : y("", !0)
                ], 64))
              ], 64)) : (s(), o(B, { key: 1 }, [
                e("div", yu, [
                  t[84] || (t[84] = e("div", { class: "fo-bili-sort" }, [
                    e("span", { class: "fo-vue-feed-label" }, "🔥 猜你喜欢与热门精选")
                  ], -1)),
                  e("div", _u, "本页共 " + l(r.value.specialVideos.length) + " 个视频", 1)
                ]),
                r.value.specialLoading ? (s(), o("div", ku, [...t[85] || (t[85] = [
                  e("i", null, null, -1),
                  e("span", null, "正在加载个性化推荐视频…", -1)
                ])])) : r.value.specialError ? (s(), o("p", $u, l(r.value.specialError), 1)) : (s(), o("div", {
                  key: 2,
                  class: "fo-bili-grid fo-favorites-grid",
                  style: ye({ "--favorite-columns": U.value })
                }, [
                  r.value.specialVideos.length ? y("", !0) : (s(), o("p", wu, "暂无推荐视频。")),
                  (s(!0), o(B, null, W(r.value.specialVideos, (i) => (s(), o("article", {
                    key: i.id,
                    class: "fo-bili-card",
                    draggable: "true",
                    onDragstart: (d) => ct(d, i)
                  }, [
                    e("div", xu, [
                      e("a", {
                        class: "fo-cover-link",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: S((d) => m("special-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, Tu)
                      ], 8, Su),
                      e("span", Pu, "▣ " + l(i.playCount), 1),
                      e("span", Mu, l(i.duration), 1)
                    ]),
                    e("div", Du, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: S((d) => m("special-play-video", i), ["prevent"])
                      }, l(i.title), 9, Iu),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": K.value === i.id,
                        onClick: S((d) => at(i.id), ["stop"])
                      }, "⋮", 8, Eu),
                      K.value === i.id ? (s(), o("div", Ru, [
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            m("special-video-action", { video: i, id: i.id, action: "collect-inbox" }), K.value = "";
                          }
                        }, "📥 添加到收集箱", 8, zu),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            m("special-video-action", { id: i.id, action: "play" }), K.value = "";
                          }
                        }, "本地播放与评论", 8, Bu),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            m("special-video-action", { id: i.id, action: "subtitle" }), K.value = "";
                          }
                        }, "字幕提取", 8, Lu),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            m("special-video-action", { id: i.id, action: "cache" }), K.value = "";
                          }
                        }, "缓存视频", 8, Au),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            m("special-video-action", { id: i.id, action: "open" }), K.value = "";
                          }
                        }, "打开网页", 8, Nu)
                      ])) : y("", !0)
                    ]),
                    e("div", Vu, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: S((d) => z(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, l(i.author), 9, Fu),
                      e("span", null, l(i.favoriteDate), 1)
                    ])
                  ], 40, Cu))), 128))
                ], 4)),
                e("div", Gu, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: r.value.specialLoading || r.value.specialPage <= 1,
                    onClick: t[28] || (t[28] = (i) => m("recommendations-page", r.value.specialPage - 1))
                  }, "‹ 上一页", 8, Uu),
                  e("span", Ou, "第 " + l(r.value.specialPage) + " 页", 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: r.value.specialLoading,
                    onClick: t[29] || (t[29] = (i) => m("recommendations-page", r.value.specialPage + 1))
                  }, "下一页 ›", 8, qu)
                ])
              ], 64))
            ], 512)) : r.value.mode === "following" ? (s(), o("section", {
              key: 3,
              id: "fo-vue-following-main",
              ref_key: "organizerMain",
              ref: Y,
              class: "fo-bili-main"
            }, [
              e("header", Hu, [
                t[86] || (t[86] = e("div", { class: "fo-bili-cover fo-vue-following-cover" }, [
                  e("span", null, "📺")
                ], -1)),
                e("div", Wu, [
                  e("div", Ku, [
                    e("h3", null, l(r.value.specialTitle), 1),
                    r.value.specialBadge !== `第 ${r.value.specialPage} 页` ? (s(), o("span", ju, l(r.value.specialBadge), 1)) : y("", !0)
                  ]),
                  e("p", null, l(r.value.specialSubtitle), 1)
                ]),
                e("div", Yu, [
                  e("div", {
                    class: "fo-up-groups-list",
                    onWheel: t[30] || (t[30] = //@ts-ignore
                    (...i) => n(It) && n(It)(...i))
                  }, [
                    (s(!0), o(B, null, W(r.value.followingGroups, (i) => (s(), o("button", {
                      key: i.id,
                      type: "button",
                      class: L(["fo-up-group-chip", { active: i.active }]),
                      onClick: (d) => m("following-group", i.id)
                    }, [
                      re(l(i.child ? "↳ " : "") + l(i.name) + " ", 1),
                      e("small", Qu, l(i.count), 1)
                    ], 10, Xu))), 128))
                  ], 32),
                  e("div", Ju, [
                    e("button", {
                      type: "button",
                      onClick: t[31] || (t[31] = (i) => m("following-manage-groups", "create"))
                    }, "＋ 新建分组"),
                    e("button", {
                      type: "button",
                      onClick: t[32] || (t[32] = (i) => m("following-manage-groups", "manage"))
                    }, "⚙️ 管理分组")
                  ])
                ]),
                e("div", Zu, [
                  e("button", {
                    type: "button",
                    onClick: t[33] || (t[33] = (i) => m("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              r.value.followingMembers.length ? (s(), o("div", ed, [
                e("div", td, [
                  e("b", null, l(r.value.specialBadge), 1),
                  e("small", null, "共 " + l(r.value.followingMembers.length) + " 位 UP 主", 1)
                ]),
                e("div", id, [
                  e("button", {
                    type: "button",
                    class: L(["fo-up-member-chip", { active: !r.value.followingMembers.some((i) => i.active) }]),
                    onClick: t[34] || (t[34] = (i) => m("following-member", ""))
                  }, "全部UP", 2),
                  (s(!0), o(B, null, W(r.value.followingMembers, (i) => (s(), o("button", {
                    key: i.id,
                    type: "button",
                    class: L(["fo-up-member-chip", { active: i.active }]),
                    title: `左键筛选「${i.name}」，右键预览近期投稿`,
                    onClick: (d) => m("following-member", i.id),
                    onContextmenu: S((d) => m("following-preview-member", { id: i.id, clientX: d.clientX, clientY: d.clientY }), ["prevent"])
                  }, [
                    i.face ? (s(), o("img", {
                      key: 0,
                      loading: "lazy",
                      referrerpolicy: "no-referrer",
                      src: i.face,
                      alt: ""
                    }, null, 8, od)) : y("", !0),
                    e("span", null, l(i.name), 1)
                  ], 42, sd))), 128))
                ]),
                e("button", {
                  type: "button",
                  class: "fo-btn-manage-members",
                  onClick: t[35] || (t[35] = (i) => m("following-manage-groups", "members"))
                }, "＋ 管理成员")
              ])) : y("", !0),
              e("div", ld, [
                t[87] || (t[87] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "⚡ UP 主最新投稿动态")
                ], -1)),
                e("div", nd, "本页共 " + l(r.value.specialVideos.length) + " 个视频", 1)
              ]),
              r.value.specialLoading ? (s(), o("div", ad, [...t[88] || (t[88] = [
                e("i", null, null, -1),
                e("span", null, "正在读取关注 UP 主更新…", -1)
              ])])) : r.value.specialError ? (s(), o("p", rd, l(r.value.specialError), 1)) : (s(), o("div", {
                key: 3,
                class: "fo-bili-grid fo-favorites-grid",
                style: ye({ "--favorite-columns": U.value })
              }, [
                r.value.specialVideos.length ? y("", !0) : (s(), o("p", ud, "暂无最新关注视频动态。")),
                (s(!0), o(B, null, W(r.value.specialVideos, (i) => (s(), o("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (d) => ct(d, i)
                }, [
                  e("div", cd, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: S((d) => m("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, bd)
                    ], 8, pd),
                    e("span", vd, "▣ " + l(i.playCount), 1),
                    e("span", fd, l(i.duration), 1)
                  ]),
                  e("div", gd, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: S((d) => m("special-play-video", i), ["prevent"])
                    }, l(i.title), 9, md),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": K.value === i.id,
                      onClick: S((d) => at(i.id), ["stop"])
                    }, "⋮", 8, hd),
                    K.value === i.id ? (s(), o("div", yd, [
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          m("special-video-action", { video: i, id: i.id, action: "play" }), K.value = "";
                        }
                      }, "本地播放与评论", 8, _d),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          m("special-video-action", { video: i, id: i.id, action: "subtitle" }), K.value = "";
                        }
                      }, "字幕提取", 8, kd),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          m("special-video-action", { video: i, id: i.id, action: "cache" }), K.value = "";
                        }
                      }, "缓存视频", 8, $d),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          m("special-video-action", { video: i, id: i.id, action: "open" }), K.value = "";
                        }
                      }, "打开网页", 8, wd)
                    ])) : y("", !0)
                  ]),
                  e("div", Cd, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: S((d) => z(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, l(i.author), 9, xd),
                    e("span", null, l(i.favoriteDate), 1)
                  ])
                ], 40, dd))), 128))
              ], 4)),
              e("div", Sd, [
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: r.value.specialLoading || r.value.specialPage <= 1,
                  onClick: t[36] || (t[36] = (i) => m("following-page", r.value.specialPage - 1))
                }, "‹ 上一页", 8, Td),
                e("span", Pd, "第 " + l(r.value.specialPage) + " 页", 1),
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: r.value.specialLoading || !r.value.followingHasMore,
                  onClick: t[37] || (t[37] = (i) => m("following-page", r.value.specialPage + 1))
                }, "下一页 ›", 8, Md)
              ])
            ], 512)) : r.value.mode === "subscription" ? (s(), o("section", Dd, [
              e("div", Id, [
                ke(Ii, { "show-back": "" }),
                r.value.subscriptionLoading ? (s(), o("div", Ed, [...t[89] || (t[89] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取订阅视频与 AI 字幕稿…", -1)
                ])])) : r.value.subscriptionError ? (s(), o("p", Rd, "读取失败：" + l(r.value.subscriptionError), 1)) : r.value.subscriptionChannels.length ? (s(), o("div", Bd, [
                  ke(eo),
                  ke(es)
                ])) : (s(), o("div", zd, [
                  t[90] || (t[90] = re("还没有订阅的 UP 主。 ", -1)),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    onClick: t[38] || (t[38] = (i) => m("subscription-add-channel"))
                  }, "添加 UP 主")
                ]))
              ])
            ])) : r.value.mode === "radio" ? (s(), o("section", Ld, [
              e("header", Ad, [
                t[91] || (t[91] = e("div", { class: "fo-hero-left" }, [
                  e("div", { class: "fo-bili-cover fo-vue-radio-cover" }, [
                    e("span", null, "📻")
                  ]),
                  e("div", { class: "fo-hero-folder-info" }, [
                    e("h3", null, "B站电台"),
                    e("p", null, "从左侧选择收藏夹，将视频拖拽或添加到连播队列，自由编排系列随心听")
                  ])
                ], -1)),
                e("div", Nd, [
                  e("button", {
                    type: "button",
                    onClick: t[39] || (t[39] = (i) => m("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", Vd, [
                e("aside", Fd, [
                  t[92] || (t[92] = e("p", { class: "sw-title" }, "收藏夹", -1)),
                  e("div", Gd, [
                    (s(!0), o(B, null, W(n(R).radioFolders, (i) => (s(), o("button", {
                      key: i.id,
                      type: "button",
                      class: L(["bili-radio-folder", { on: i.id === n(R).radioActiveFolderId }]),
                      onClick: (d) => m("radio-select-folder", i.id)
                    }, [
                      e("span", null, l(i.title), 1),
                      e("span", null, l(i.count), 1)
                    ], 10, Ud))), 128)),
                    n(R).radioFolders.length ? y("", !0) : (s(), o("p", Od, l(n(R).radioLoading ? "加载中…" : "暂无收藏夹"), 1))
                  ])
                ]),
                e("section", qd, [
                  t[94] || (t[94] = e("p", {
                    id: "bili-radio-library-title",
                    class: "sw-title"
                  }, "收藏夹视频", -1)),
                  n(R).radioError ? (s(), o("p", Hd, l(n(R).radioError), 1)) : y("", !0),
                  e("div", Wd, [
                    (s(!0), o(B, null, W(n(R).radioVideos, (i) => (s(), o("button", {
                      key: i.bvid,
                      type: "button",
                      class: "bili-radio-video",
                      title: `${i.title} (点击加入连播队列，或按住拖拽封面到下方卡带机直接播放)`,
                      draggable: "true",
                      onDragstart: (d) => Vt(d, i),
                      onClick: (d) => m("radio-add", { bvid: i.bvid, title: i.title, cover: i.cover, author: i.author, duration: i.duration })
                    }, [
                      i.cover ? (s(), o("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, jd)) : (s(), o("span", Yd)),
                      e("p", null, l(i.title), 1),
                      t[93] || (t[93] = e("span", null, "＋", -1))
                    ], 40, Kd))), 128)),
                    n(R).radioVideos.length ? y("", !0) : (s(), o("p", Xd, l(n(R).radioLoading ? "读取视频中…" : "此收藏夹暂无可播放视频"), 1))
                  ])
                ]),
                e("section", Qd, [
                  e("div", Jd, [
                    ue(e("input", {
                      id: "bili-radio-name",
                      "onUpdate:modelValue": t[40] || (t[40] = (i) => n(R).radioSeriesName = i),
                      maxlength: "48",
                      class: L({ "has-error": c.value }),
                      placeholder: c.value ? "⚠️ 请在此输入系列名称后再保存！" : "请输入系列名称（必填）",
                      autocomplete: "off",
                      onInput: t[41] || (t[41] = (i) => c.value = !1),
                      onKeydown: Ee(S(k, ["prevent"]), ["enter"])
                    }, null, 42, Zd), [
                      [Se, n(R).radioSeriesName]
                    ]),
                    e("div", ec, [
                      e("button", {
                        id: "bili-radio-save",
                        type: "button",
                        title: "保存当前队列为系列",
                        onClick: k
                      }, " 💾 保存系列 "),
                      e("button", {
                        id: "bili-radio-rename",
                        type: "button",
                        title: "重命名当前系列",
                        onClick: g
                      }, " ✏️ 重命名 "),
                      ke(Tt, {
                        id: "bili-radio-share",
                        compact: "",
                        label: "🚀 分享",
                        visible: !0,
                        onSelect: Lt
                      })
                    ]),
                    e("div", tc, [
                      e("select", {
                        class: "bili-radio-series-select",
                        title: "快速切换已保存的系列",
                        onChange: P
                      }, [
                        e("option", ic, l(n(R).radioSeries.length ? `📚 已保存系列 (${n(R).radioSeries.length})` : "📚 暂无保存系列"), 1),
                        (s(!0), o(B, null, W(n(R).radioSeries, (i) => (s(), o("option", {
                          key: i.id,
                          value: i.id
                        }, l(i.name) + " (" + l(i.count) + "首) ", 9, sc))), 128)),
                        t[95] || (t[95] = e("option", {
                          value: "__create_new__",
                          class: "bili-radio-create-opt"
                        }, " ＋ 创建系列 ", -1))
                      ], 32)
                    ])
                  ]),
                  e("div", oc, [
                    (s(!0), o(B, null, W(n(R).radioQueue, (i, d) => (s(), o("div", {
                      key: `${i.bvid}-${d}`,
                      class: L(["bili-radio-queue-item", { "is-playing": n(H).active && n(H).trackIndex === d + 1 }]),
                      title: "点击立即从该曲目开始播放",
                      onClick: (D) => m("radio-play-index", d)
                    }, [
                      e("span", nc, l(n(H).active && n(H).trackIndex === d + 1 ? "♪" : d + 1), 1),
                      i.cover ? (s(), o("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, ac)) : (s(), o("span", rc)),
                      e("p", null, l(i.title), 1),
                      e("button", {
                        type: "button",
                        class: "bili-radio-remove",
                        "aria-label": `移除 ${i.title}`,
                        onClick: S((D) => m("radio-remove", { index: d }), ["stop"])
                      }, "×", 8, uc)
                    ], 10, lc))), 128)),
                    n(R).radioQueue.length ? y("", !0) : (s(), o("p", dc, "点击左侧视频加入连播队列。"))
                  ]),
                  e("div", cc, [
                    e("button", {
                      id: "bili-radio-play",
                      type: "button",
                      disabled: !n(R).radioQueue.length,
                      onClick: t[42] || (t[42] = (i) => m("radio-play"))
                    }, "▶ 按顺序播放", 8, pc),
                    e("button", {
                      id: "bili-radio-shuffle",
                      type: "button",
                      disabled: !n(R).radioQueue.length,
                      onClick: t[43] || (t[43] = (i) => m("radio-shuffle"))
                    }, "🔀 随机播放", 8, bc),
                    e("button", {
                      id: "bili-radio-clear",
                      type: "button",
                      onClick: t[44] || (t[44] = (i) => m("radio-clear"))
                    }, "清空编辑区")
                  ])
                ])
              ]),
              n(rt) || n(ft).activeId === "daily-bilibili" ? y("", !0) : (s(), bt(Dt, { key: 0 }))
            ])) : y("", !0)
          ], 34)
        ])
      ]),
      n(rt) || n(ft).activeId === "daily-bilibili" ? (s(), bt(Dt, {
        key: 0,
        "dock-side": ""
      })) : y("", !0),
      t[108] || (t[108] = e("div", {
        class: "fm-pane",
        id: "pane-sub-video",
        hidden: "",
        style: { display: "none !important" }
      }, null, -1)),
      ke(To),
      ke(Ul),
      j.value.visible && j.value.video ? (s(), o("div", {
        key: 1,
        ref_key: "videoMenuRef",
        ref: de,
        class: "fo-context-menu",
        role: "menu",
        style: ye(n(xe)),
        onClick: t[54] || (t[54] = S(() => {
        }, ["stop"]))
      }, [
        e("div", {
          class: "fo-context-header",
          title: j.value.video.title
        }, l(j.value.video.title), 9, vc),
        ke(Tt, {
          label: "💬 发送到聊天室",
          "match-menu-item": "",
          visible: j.value.visible,
          onSelect: At
        }, null, 8, ["visible"]),
        t[105] || (t[105] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[45] || (t[45] = (i) => Pe("play"))
        }, [...t[96] || (t[96] = [
          e("span", { class: "fo-context-icon" }, "▶", -1),
          re(" 小窗播放视频 ", -1)
        ])]),
        t[106] || (t[106] = e("div", { class: "fo-context-divider" }, null, -1)),
        j.value.video.writable ? (s(), o("button", {
          key: 0,
          type: "button",
          class: "fo-context-item danger",
          onClick: t[46] || (t[46] = (i) => Pe("delete"))
        }, [...t[97] || (t[97] = [
          e("span", { class: "fo-context-icon" }, "🗑", -1),
          re(" 取消收藏 ", -1)
        ])])) : y("", !0),
        j.value.video.writable ? (s(), o("button", {
          key: 1,
          type: "button",
          class: "fo-context-item",
          onClick: t[47] || (t[47] = (i) => Pe("move"))
        }, [...t[98] || (t[98] = [
          e("span", { class: "fo-context-icon" }, "📁", -1),
          re(" 移动到… ", -1)
        ])])) : y("", !0),
        j.value.video.writable ? (s(), o("div", fc)) : y("", !0),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[48] || (t[48] = (i) => Pe("open"))
        }, [...t[99] || (t[99] = [
          e("span", { class: "fo-context-icon" }, "↗", -1),
          re(" 跳转到 B站 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[49] || (t[49] = (i) => Pe("copy-link"))
        }, [...t[100] || (t[100] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          re(" 复制链接 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[50] || (t[50] = (i) => Pe("cache"))
        }, [...t[101] || (t[101] = [
          e("span", { class: "fo-context-icon" }, "💾", -1),
          re(" 缓存视频 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[51] || (t[51] = (i) => Pe("add-radio"))
        }, [...t[102] || (t[102] = [
          e("span", { class: "fo-context-icon" }, "📻", -1),
          re(" 添加到电台 ", -1)
        ])]),
        t[107] || (t[107] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[52] || (t[52] = (i) => Pe("create-task"))
        }, [...t[103] || (t[103] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          re(" 创建任务 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[53] || (t[53] = (i) => Pe("subtitle"))
        }, [...t[104] || (t[104] = [
          e("span", { class: "fo-context-icon" }, "▤", -1),
          re(" 字幕转文本 ", -1)
        ])])
      ], 4)) : y("", !0)
    ], 2));
  }
}), Rc = /* @__PURE__ */ ze(gc, [["__scopeId", "data-v-fe210728"]]);
export {
  Rc as default
};
