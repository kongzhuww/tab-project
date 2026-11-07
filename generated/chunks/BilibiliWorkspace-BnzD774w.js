import { d as Me, o, e as s, i as e, t as l, u as n, A as L, m as ue, F, g as W, f as k, p as he, h as S, s as oe, w as ce, B as He, x as vt, l as le, n as Te, k as Re, b as x, D as nt, Q as dt, K as ft, z as De, v as wt, y as lt, E as et, j as tt } from "./vendor-vue-9b0eS4bW.js";
import { c as B, b as Ve, d as it, a as H, r as Ee, s as Ct } from "./bili-favorites-store-C6Qz6-TY.js";
import { c as ut, n as Ye, y as we, d as Ke, o as ot, A as ct } from "./view-styles-R9fBeR9a.js";
import { C as pt } from "./ChatShareMenu-C8575Fns.js";
import { u as xt } from "./useCardActivity-CqBsuc1o.js";
import { _ as ze, t as I } from "./_plugin-vue_export-helper-BZmK54HO.js";
import { B as Xe } from "./BiliRichText-CxtwP8Y-.js";
import { d as St, a as Tt } from "./playback-sync-DmsdLHTu.js";
import { a as de, d as st, e as m, c as me } from "./up-group-manager-store-DJ6fRv9j.js";
import { g as Dt, s as Mt } from "./cache-directory-CBBZXa5n.js";
import { biliMessagePanelController as Pt, biliMessagePanelState as zt } from "./message-panel-store-_pQ97uic.js";
import { bilibiliChannelService as Ae } from "./bilibili-channel.service-BvjUXrQF.js";
import { u as Bt } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-9z3_WNrf.js";
const It = { class: "bili-sub-header bili-sub-vue-header" }, Rt = { class: "bili-sub-channel-info" }, Lt = { class: "bili-sub-vue-title-row" }, Et = { class: "bili-sub-title" }, At = { class: "bili-sub-desc" }, Vt = { class: "bili-sub-actions" }, Ut = { class: "bili-sub-mode-icon" }, Ft = { class: "bili-sub-mode-text" }, Nt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, qt = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, Gt = { class: "bili-sub-dropdown-panel" }, Ot = { class: "bili-sub-dropdown-list" }, Ht = ["onClick"], jt = { class: "bili-sub-item-text" }, Wt = {
  key: 0,
  class: "bili-sub-item-check"
}, Yt = { class: "bili-sub-dropdown-foot" }, Kt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, Xt = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, Qt = { class: "bili-sub-dropdown-panel bili-sub-video-dropdown-panel" }, Jt = { class: "bili-sub-dropdown-title" }, Zt = { class: "bili-sub-dropdown-list" }, ei = ["title", "onClick"], ti = { class: "bili-sub-video-num" }, ii = { class: "bili-sub-item-text" }, oi = {
  key: 0,
  class: "bili-sub-video-duration"
}, si = { class: "bili-sub-dropdown-foot" }, ni = ["disabled"], li = /* @__PURE__ */ Me({
  __name: "BiliSubscriptionHeader",
  props: {
    showBack: { type: Boolean }
  },
  setup(pe) {
    function b(D, f) {
      Ve.dispatch(D, f);
    }
    return (D, f) => (o(), s("header", It, [
      e("div", Rt, [
        f[6] || (f[6] = e("img", {
          class: "bili-sub-avatar",
          src: "assets/bilibili.svg",
          alt: ""
        }, null, -1)),
        e("div", null, [
          e("div", Lt, [
            e("h3", Et, l(n(B).organizer.subscriptionTitle), 1)
          ]),
          e("p", At, l(n(B).organizer.subscriptionSubtitle), 1)
        ])
      ]),
      e("div", Vt, [
        e("button", {
          type: "button",
          class: L(["bili-sub-head-btn bili-sub-script-mode-btn", { "is-newspaper": n(B).organizer.subscriptionScriptMode === "newspaper" }]),
          onClick: f[0] || (f[0] = (T) => b("subscription-script-mode"))
        }, [
          e("span", Ut, l(n(B).organizer.subscriptionScriptMode === "newspaper" ? "📰" : "📜"), 1),
          e("span", Ft, l(n(B).organizer.subscriptionScriptMode === "newspaper" ? "报纸模式" : "滚动台词"), 1)
        ], 2),
        e("details", Nt, [
          e("summary", qt, [
            e("span", null, [
              f[7] || (f[7] = ue("关注 UP 主：", -1)),
              e("b", null, l(n(B).organizer.subscriptionTitle), 1)
            ]),
            f[8] || (f[8] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", Gt, [
            f[10] || (f[10] = e("div", { class: "bili-sub-dropdown-title" }, "已关注的 UP 主", -1)),
            e("div", Ot, [
              (o(!0), s(F, null, W(n(B).organizer.subscriptionChannels, (T) => (o(), s("button", {
                key: T.id,
                type: "button",
                class: L(["bili-sub-dropdown-item", { active: T.active }]),
                onClick: (N) => b("subscription-channel", T.id)
              }, [
                f[9] || (f[9] = e("span", { class: "bili-sub-dot" }, null, -1)),
                e("span", jt, l(T.name), 1),
                T.active ? (o(), s("span", Wt, "✓")) : k("", !0)
              ], 10, Ht))), 128))
            ]),
            e("div", Yt, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                onClick: f[1] || (f[1] = (T) => b("subscription-add-channel"))
              }, "＋ UP 主")
            ])
          ])
        ]),
        e("details", Kt, [
          e("summary", Xt, [
            e("span", null, [
              f[11] || (f[11] = ue("视频 ", -1)),
              e("b", null, "(" + l(n(B).organizer.subscriptionVideos.length) + ")", 1)
            ]),
            f[12] || (f[12] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", Qt, [
            e("div", Jt, "最近投稿视频 (" + l(n(B).organizer.subscriptionVideos.length) + ")", 1),
            e("div", Zt, [
              (o(!0), s(F, null, W(n(B).organizer.subscriptionVideos, (T, N) => (o(), s("button", {
                key: T.bvid,
                type: "button",
                class: L(["bili-sub-dropdown-item bili-sub-video-item", { active: T.active }]),
                title: T.title,
                onClick: (M) => b("subscription-video", T.bvid)
              }, [
                e("span", ti, l(N + 1) + ".", 1),
                e("span", ii, l(T.title), 1),
                T.duration ? (o(), s("small", oi, l(T.duration), 1)) : k("", !0)
              ], 10, ei))), 128))
            ]),
            e("div", si, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                disabled: n(B).organizer.subscriptionLoading,
                onClick: f[2] || (f[2] = (T) => b("subscription-load-more"))
              }, "继续获取", 8, ni)
            ])
          ])
        ]),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: f[3] || (f[3] = (T) => b(n(B).organizer.showFullDescInRightPanel ? "subscription-copy-description" : "subscription-copy-script"))
        }, l(n(B).organizer.showFullDescInRightPanel ? "复制简介" : "复制稿子"), 1),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: f[4] || (f[4] = (T) => b("subscription-refresh"))
        }, "↻ 刷新"),
        pe.showBack ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "bili-sub-head-btn",
          onClick: f[5] || (f[5] = (T) => b("organizer-open"))
        }, "← 返回收藏夹")) : k("", !0)
      ])
    ]));
  }
}), ai = /* @__PURE__ */ ze(li, [["__scopeId", "data-v-0dfef976"]]), ri = { class: "bili-sub-transcript-column bili-sub-vue-transcript-column" }, di = { class: "bili-sub-article-wrap" }, ui = { class: "bili-sub-transcript-body" }, ci = {
  key: 0,
  class: "bili-sub-description-copy",
  title: "当前为放大简介视图"
}, pi = {
  key: 0,
  class: "muted"
}, bi = {
  key: 0,
  class: "bili-sub-newspaper-list"
}, vi = ["data-idx", "data-from", "data-to", "title", "onClick"], fi = { class: "bili-sub-newspaper-header" }, gi = { class: "bili-sub-newspaper-num" }, mi = { class: "bili-sub-newspaper-heading" }, hi = { class: "bili-sub-newspaper-title" }, yi = { class: "bili-sub-newspaper-time" }, _i = ["onClick"], ki = { class: "bili-sub-newspaper-content" }, $i = ["data-from", "data-to", "title", "onClick"], wi = {
  key: 1,
  class: "bili-sub-srt-list"
}, Ci = ["data-idx", "data-from", "data-to", "title", "onClick"], xi = { class: "bili-sub-srt-time" }, Si = { class: "bili-sub-srt-text" }, Ti = {
  key: 2,
  class: "bili-sub-no-transcript-box"
}, Di = {
  key: 2,
  class: "bili-sub-vue-empty-hint"
}, Mi = /* @__PURE__ */ Me({
  __name: "BiliSubscriptionTranscript",
  setup(pe) {
    const b = oe(() => B.organizer), D = oe(() => b.value.subscriptionChapters.length > 0 || b.value.subscriptionCues.length > 0);
    function f(T, N) {
      Ve.dispatch(T, N);
    }
    return (T, N) => (o(), s("section", ri, [
      e("article", di, [
        e("div", ui, [
          b.value.showFullDescInRightPanel ? (o(), s("section", ci, [
            e("header", null, [
              N[1] || (N[1] = e("h5", null, "视频简介", -1)),
              e("button", {
                type: "button",
                class: "bili-copy-desc-btn",
                title: "切回台词展示",
                onClick: N[0] || (N[0] = (M) => f("subscription-toggle-desc-panel"))
              }, "缩小简介")
            ]),
            (o(!0), s(F, null, W(b.value.subscriptionDescription, (M, r) => (o(), s("p", { key: r }, [
              he(Xe, { text: M }, null, 8, ["text"])
            ]))), 128)),
            b.value.subscriptionDescription.length ? k("", !0) : (o(), s("p", pi, "该视频暂无可用的文字简介。"))
          ])) : (o(), s(F, { key: 1 }, [
            b.value.subscriptionScriptMode === "newspaper" && b.value.subscriptionChapters.length ? (o(), s("div", bi, [
              (o(!0), s(F, null, W(b.value.subscriptionChapters, (M, r) => (o(), s("article", {
                key: `${M.from}:${r}`,
                class: "bili-sub-newspaper-section",
                "data-idx": r,
                "data-from": M.from,
                "data-to": M.to,
                title: `点击跳转至 ${M.fromText} 播放`,
                onClick: (h) => f("subscription-seek", { from: M.from, index: r, mode: "newspaper" })
              }, [
                e("header", fi, [
                  e("span", gi, l(String(r + 1).padStart(2, "0")), 1),
                  e("div", mi, [
                    e("h4", hi, l(M.title), 1),
                    e("span", yi, "⏱ " + l(M.fromText) + " - " + l(M.toText), 1)
                  ]),
                  e("button", {
                    type: "button",
                    class: "bili-sub-newspaper-play-btn",
                    "aria-label": "从头播放此分段",
                    onClick: S((h) => f("subscription-seek", { from: M.from, index: r, mode: "newspaper" }), ["stop"])
                  }, "▶", 8, _i)
                ]),
                e("div", ki, [
                  M.paragraphCues && M.paragraphCues.length ? (o(!0), s(F, { key: 0 }, W(M.paragraphCues, (h, _) => (o(), s("p", {
                    key: _,
                    class: "bili-sub-newspaper-p"
                  }, [
                    (o(!0), s(F, null, W(h, (A, P) => (o(), s("span", {
                      key: `${A.from}:${P}`,
                      class: "bili-sub-newspaper-cue",
                      "data-from": A.from,
                      "data-to": A.to,
                      title: `点击跳转播放此句 (⏱ ${A.timeText || A.from + "s"})`,
                      onClick: S((U) => f("subscription-seek", { from: A.from, mode: "newspaper" }), ["stop"])
                    }, l(A.content), 9, $i))), 128))
                  ]))), 128)) : (o(!0), s(F, { key: 1 }, W(M.paragraphs, (h, _) => (o(), s("p", {
                    key: _,
                    class: "bili-sub-newspaper-p"
                  }, l(h), 1))), 128))
                ])
              ], 8, vi))), 128))
            ])) : b.value.subscriptionCues.length ? (o(), s("div", wi, [
              (o(!0), s(F, null, W(b.value.subscriptionCues, (M) => (o(), s("button", {
                key: `${M.from}:${M.index}`,
                type: "button",
                class: "bili-sub-srt-row",
                "data-idx": M.index,
                "data-from": M.from,
                "data-to": M.to,
                title: `点击跳转至 ${M.timeText}`,
                onClick: (r) => f("subscription-seek", { from: M.from, index: M.index, mode: "lyrics" })
              }, [
                e("span", xi, l(M.timeText), 1),
                e("span", Si, l(M.content), 1)
              ], 8, Ci))), 128))
            ])) : (o(), s("div", Ti, [...N[2] || (N[2] = [
              e("div", { class: "bili-sub-no-transcript-icon" }, "🎙️", -1),
              e("h5", null, "暂无实时台词字幕", -1),
              e("p", { class: "muted" }, "当前视频暂无可用字幕稿。如需阅读完整文案，请点击左侧视频标题旁的“放大简介”。", -1)
            ])]))
          ], 64)),
          !b.value.showFullDescInRightPanel && !D.value && !b.value.subscriptionDescription.length ? (o(), s("p", Di, "字幕不可用时仍可在左侧播放和查看评论。")) : k("", !0)
        ])
      ])
    ]));
  }
}), Pi = /* @__PURE__ */ ze(Mi, [["__scopeId", "data-v-2f4df941"]]), zi = { class: "bili-sub-player-column" }, Bi = {
  key: 0,
  class: "bili-sub-sticky-player"
}, Ii = { class: "bili-sub-player-card" }, Ri = { class: "bili-sub-video-box" }, Li = ["poster", "hidden"], Ei = ["src"], Ai = {
  key: 1,
  class: "bili-sub-video-loading"
}, Vi = { class: "bili-sub-video-meta" }, Ui = { class: "bili-sub-video-meta-actions" }, Fi = ["title"], Ni = { class: "bili-sub-meta-stats" }, qi = { class: "bili-sub-meta-desc" }, Gi = {
  class: "bili-sub-comments-section",
  id: "bili-sub-comments-section"
}, Oi = { class: "bili-mini-comments-head" }, Hi = { class: "bili-mini-comments-meta" }, ji = { class: "bili-mini-comments-count bili-sub-comments-count" }, Wi = { class: "bili-mini-comments-sort" }, Yi = { class: "bili-sub-comment-composer" }, Ki = ["onKeydown"], Xi = ["disabled"], Qi = {
  key: 0,
  class: "bili-sub-emote-picker"
}, Ji = {
  key: 0,
  class: "fo-bili-loading"
}, Zi = { key: 1 }, eo = ["title", "onClick"], to = ["src", "alt"], io = { key: 1 }, oo = { class: "bili-mini-comments-body bili-sub-comments-body" }, so = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, no = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, lo = ["src"], ao = { class: "bili-comment-main" }, ro = { class: "bili-comment-user-row" }, uo = { class: "bili-comment-uname" }, co = {
  key: 0,
  class: "bili-comment-level"
}, po = { class: "bili-comment-time" }, bo = { class: "bili-comment-text" }, vo = {
  key: 0,
  class: "bili-comment-pictures"
}, fo = ["href", "onClick"], go = ["src"], mo = { class: "bili-comment-actions" }, ho = { key: 0 }, yo = { key: 1 }, _o = {
  key: 1,
  class: "bili-comment-sub-list"
}, ko = { class: "bili-comment-sub-uname" }, $o = { class: "bili-comment-sub-more" }, wo = ["disabled", "onClick"], Co = ["disabled", "onClick"], xo = ["onClick"], So = { class: "bili-sub-comments-infinite-trigger" }, To = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0" }
}, Do = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0", opacity: "0.6" }
}, Mo = {
  key: 1,
  class: "fo-bili-empty"
}, Po = /* @__PURE__ */ Me({
  __name: "BiliSubscriptionPlayer",
  setup(pe) {
    const b = oe(() => B.organizer.subscriptionCurrent), D = x(null), f = x(!1), T = x(!1), N = x(""), M = x(""), r = x(1), h = x(1), _ = x([]), A = x("0 条"), P = x(!1), U = x(!1), R = x(""), j = x(!1), Y = x(""), be = x(null), X = x(!1), ye = x(""), Ce = x(!1), ae = x(!1), xe = x(!1), v = x([]);
    let se = null, ee = null;
    function Q(w, y = !1) {
      ye.value = w, Ce.value = y, se && clearTimeout(se), se = setTimeout(() => {
        ye.value = "";
      }, 3500);
    }
    function ne() {
      Ve.dispatch("subscription-open-player");
    }
    function z() {
      Ve.dispatch("subscription-toggle-desc-panel");
    }
    function g(w) {
      const y = w.currentTarget;
      y && y.scrollHeight - y.scrollTop - y.clientHeight < 180 && !U.value && j.value && te();
    }
    function O(w, y) {
      const c = w[y];
      c && window.open(c, "_blank", "noopener,noreferrer");
    }
    function J(w, y) {
      if (!w) return [];
      if (!y || y.size === 0)
        return [{ type: "text", text: w }];
      const c = /\[([^\]]+)\]/g, C = [];
      let G = 0, q;
      for (; (q = c.exec(w)) !== null; ) {
        q.index > G && C.push({ type: "text", text: w.slice(G, q.index) });
        const K = q[0], ie = y.get(K);
        ie ? C.push({ type: "emote", text: K, url: ie }) : C.push({ type: "text", text: K }), G = c.lastIndex;
      }
      return G < w.length && C.push({ type: "text", text: w.slice(G) }), C;
    }
    function ve(w) {
      if (!w) return "";
      const y = new Date(w * 1e3), c = /* @__PURE__ */ new Date(), C = Math.floor((c.getTime() - y.getTime()) / 1e3);
      if (C < 60) return "刚刚";
      if (C < 3600) return `${Math.floor(C / 60)} 分钟前`;
      if (C < 86400) return `${Math.floor(C / 3600)} 小时前`;
      const G = y.getFullYear(), q = String(y.getMonth() + 1).padStart(2, "0"), K = String(y.getDate()).padStart(2, "0");
      return G === c.getFullYear() ? `${q}-${K}` : `${G}-${q}-${K}`;
    }
    function _e(w) {
      return w ? w >= 1e4 ? (w / 1e4).toFixed(1).replace(/\.0$/, "") + "万" : String(w) : "0";
    }
    async function $(w = !1) {
      if (M.value) {
        w ? U.value = !0 : (P.value = !0, R.value = "");
        try {
          const y = `https://api.bilibili.com/x/v2/reply?type=1&oid=${M.value}&pn=${h.value}&ps=20&sort=${r.value}`, C = await (await fetch(y, { credentials: "include" })).json();
          if (C?.code !== 0 || !C?.data) {
            w || (R.value = C?.message || "评论加载失败或该视频已关闭评论", _.value = []), j.value = !1;
            return;
          }
          const G = C.data, q = G.page?.count || 0;
          A.value = `${_e(q)} 条`;
          const ie = (Array.isArray(G.replies) ? G.replies : []).map((Z) => {
            const je = /* @__PURE__ */ new Map();
            Z.content?.emote && Object.entries(Z.content.emote).forEach(([ge, Ne]) => {
              Ne?.url && je.set(ge, String(Ne.url).replace(/^http:/, "https:"));
            });
            const Ge = String(Z.content?.message || ""), Oe = Array.isArray(Z.content?.pictures) ? Z.content.pictures.map((ge) => String(ge?.img_src || ge).replace(/^http:/, "https:")).filter(Boolean) : [], We = Array.isArray(Z.replies) ? Z.replies.map((ge) => ({
              id: ge.rpid || Math.random(),
              userName: ge.member?.uname || "B站用户",
              message: String(ge.content?.message || "")
            })) : [];
            return {
              id: Z.rpid || Math.random(),
              userName: Z.member?.uname || "B站用户",
              avatar: String(Z.member?.avatar || "").replace(/^http:/, "https:"),
              level: Number(Z.member?.level_info?.current_level || 0),
              message: Ge,
              tokens: J(Ge, je),
              timeStr: ve(Z.ctime),
              likeCount: Number(Z.like || 0),
              replyCount: Number(Z.rcount || 0),
              pictures: Oe,
              replies: We
            };
          });
          w ? _.value = [..._.value, ...ie] : _.value = ie, j.value = _.value.length < q;
        } catch (y) {
          w || (R.value = y?.message || "网络异常，未能加载评论");
        } finally {
          P.value = !1, U.value = !1;
        }
      }
    }
    async function d(w) {
      const y = _.value.find((c) => String(c.id) === String(w));
      if (!(!y || y.subRepliesLoading || !M.value)) {
        y.subRepliesPage ? y.subRepliesPage++ : y.subRepliesPage = 1, y.subRepliesLoading = !0, y.subRepliesExpanded = !0;
        try {
          const c = await ut.getSubReplies(M.value, w, y.subRepliesPage, 10), C = (c.replies || []).map((K) => ({
            id: String(K.rpid),
            userName: K.uname,
            message: K.message
          })), G = new Set((y.replies || []).map((K) => String(K.id))), q = C.filter((K) => !G.has(String(K.id)));
          y.replies = [...y.replies || [], ...q], y.subRepliesHasMore = c.hasMore;
        } catch {
          Q("子回复加载失败", !0);
        } finally {
          y.subRepliesLoading = !1;
        }
      }
    }
    function p(w) {
      const y = _.value.find((c) => String(c.id) === String(w));
      y && (y.subRepliesExpanded = !1);
    }
    function E(w) {
      r.value !== w && (r.value = w, h.value = 1, $(!1));
    }
    function te() {
      U.value || !j.value || (h.value += 1, $(!0));
    }
    async function re() {
      if (ae.value = !ae.value, ae.value && !v.value.length && !xe.value) {
        xe.value = !0;
        try {
          const y = await (await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", { credentials: "include" })).json();
          y?.code === 0 && Array.isArray(y?.data?.packages) && (v.value = y.data.packages.filter((c) => Array.isArray(c.emote) && c.emote.length).map((c) => ({
            text: c.text || "B站表情",
            emote: c.emote.map((C) => ({
              text: C.text || "",
              url: String(C.url || "").replace(/^http:/, "https:")
            }))
          })));
        } catch {
        } finally {
          xe.value = !1;
        }
      }
    }
    function Se(w) {
      const y = be.value;
      if (!y)
        Y.value += w;
      else {
        const c = y.selectionStart ?? y.value.length, C = y.selectionEnd ?? c;
        Y.value = Y.value.slice(0, c) + w + Y.value.slice(C), nt(() => {
          y.focus();
          const G = c + w.length;
          y.setSelectionRange(G, G);
        });
      }
      ae.value = !1;
    }
    async function ke() {
      const w = Y.value.trim();
      if (!w) {
        Q("请输入评论内容", !0);
        return;
      }
      if (!M.value) {
        Q("未能识别视频 ID，无法发表评论", !0);
        return;
      }
      const y = window.getBiliJct;
      let c = "";
      if (typeof y == "function")
        c = await y();
      else
        try {
          c = (await window.chrome?.cookies?.get?.({ url: "https://api.bilibili.com", name: "bili_jct" }))?.value || "";
        } catch {
          c = "";
        }
      if (!c) {
        Q("未检测到 B站 登录态，请先登录 bilibili.com", !0);
        return;
      }
      X.value = !0;
      try {
        const C = new URLSearchParams({
          oid: String(M.value),
          type: "1",
          message: w,
          plat: "1",
          csrf: c,
          csrf_token: c
        }), q = await (await fetch("https://api.bilibili.com/x/v2/reply/add", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: C.toString()
        })).json();
        q?.code === 0 ? (Y.value = "", Q("✓ 评论发表成功！", !1), h.value = 1, $(!1)) : Q(`❌ 发送失败：${q?.message || q?.code}`, !0);
      } catch (C) {
        Q(`❌ 发送出错：${C?.message || "网络异常"}`, !0);
      } finally {
        X.value = !1;
      }
    }
    async function Pe(w) {
      if (!w?.bvid) return;
      if (typeof document < "u" && (document.querySelectorAll("video, audio").forEach((c) => {
        if (c !== D.value && !c.paused)
          try {
            c.pause();
          } catch {
          }
      }), document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((c) => {
        try {
          c.pause();
        } catch {
        }
      })), D.value && !D.value.paused)
        try {
          D.value.pause();
        } catch {
        }
      f.value = !0, T.value = !1, N.value = "";
      let y = w.aid;
      if (!y)
        try {
          const C = await (await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${w.bvid}`, { credentials: "include" })).json();
          C?.data?.aid && (y = C.data.aid);
        } catch {
        }
      M.value = y || "", h.value = 1, $(!1);
      try {
        const c = await ut.resolvePlayStream(w);
        if (c?.sources?.length) {
          D.value && (typeof document < "u" && document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((C) => {
            try {
              C.pause();
            } catch {
            }
          }), D.value.src = c.sources[0], D.value.play().catch(() => {
          }), Tt({ bvid: w.bvid, title: w.title, cover: w.cover }, D.value)), f.value = !1;
          return;
        }
      } catch (c) {
        console.warn("[BiliSubscriptionPlayer] 本地视频流解析失败，使用 iframe 备用:", c);
      }
      T.value = !0, N.value = `https://player.bilibili.com/player.html?bvid=${w.bvid}&autoplay=1&danmaku=0`, f.value = !1;
    }
    let Be = null, Ue = null;
    function Fe(w) {
      const y = w.closest(".bili-sub-transcript-body") || w.closest(".bili-sub-article-wrap") || w.parentElement;
      if (!y) return;
      const c = y.getBoundingClientRect(), q = w.getBoundingClientRect().top - c.top + y.scrollTop - c.height * 0.36;
      y.scrollTo({
        top: Math.max(0, q),
        behavior: "smooth"
      });
    }
    function fe() {
      if (!D.value) return;
      const w = D.value.currentTime;
      if (document.querySelectorAll(".bili-sub-newspaper-section").forEach((C) => {
        const G = Number(C.getAttribute("data-from") || 0), q = Number(C.getAttribute("data-to") || 0), K = w >= G && (q <= 0 || w < q);
        C.classList.toggle("active", K);
      }), B.organizer.subscriptionScriptMode === "newspaper") {
        const C = document.querySelectorAll(".bili-sub-newspaper-cue");
        if (C.length > 0) {
          let G = null;
          if (C.forEach((q) => {
            const K = Number(q.getAttribute("data-from") || 0), ie = Number(q.getAttribute("data-to") || 0);
            w >= K && (ie <= 0 || w < ie) ? (G || (G = q), q.classList.add("cue-reading-active")) : q.classList.remove("cue-reading-active");
          }), !G && w > 0)
            for (let q = C.length - 1; q >= 0; q--) {
              const K = C[q], ie = Number(K.getAttribute("data-from") || 0);
              if (w >= ie) {
                G = K, K.classList.add("cue-reading-active");
                break;
              }
            }
          G && G !== Be && (Be = G, Fe(G));
        }
      } else {
        const C = document.querySelectorAll(".bili-sub-srt-row");
        let G = !1, q = null;
        for (let K = C.length - 1; K >= 0; K--) {
          const ie = C[K], Z = Number(ie.getAttribute("data-from") || 0);
          !G && w >= Z ? (ie.classList.add("active"), G = !0, q = ie) : ie.classList.remove("active");
        }
        q && q !== Ue && (Ue = q, Fe(q));
      }
    }
    function Le() {
      fe();
    }
    function qe() {
      fe();
    }
    return ce(
      () => b.value?.bvid,
      () => {
        b.value && Pe(b.value);
      },
      { immediate: !0 }
    ), He(() => {
      ee = Ve.onAction((w, y) => {
        if (w === "subscription-seek") {
          const c = Number(y?.from);
          D.value && Number.isFinite(c) && (D.value.currentTime = Math.max(0, c - 0.1), D.value.play().catch(() => {
          }));
        }
      });
    }), vt(() => {
      if (D.value) {
        St(D.value);
        try {
          D.value.pause(), D.value.src = "", D.value.load();
        } catch {
        }
      }
      ee && ee(), se && clearTimeout(se);
    }), (w, y) => (o(), s("aside", zi, [
      b.value ? (o(), s("div", Bi, [
        e("div", Ii, [
          e("div", {
            class: "bili-sub-vue-comment-handoff",
            hidden: "",
            style: { display: "none !important" }
          }, [
            y[3] || (y[3] = e("strong", null, "播放器与评论区已统一到 Vue 本地影院", -1)),
            e("button", {
              type: "button",
              onClick: ne
            }, "打开播放器与评论区")
          ]),
          e("div", Ri, [
            e("video", {
              ref_key: "videoRef",
              ref: D,
              class: "bili-sub-native-video",
              controls: "",
              playsinline: "",
              poster: b.value.cover,
              hidden: T.value,
              onTimeupdate: fe,
              onSeeked: Le,
              onPlay: qe
            }, null, 40, Li),
            T.value ? (o(), s("iframe", {
              key: 0,
              class: "bili-sub-native-iframe",
              allowfullscreen: "true",
              allow: "autoplay; fullscreen",
              src: N.value
            }, null, 8, Ei)) : k("", !0),
            f.value ? (o(), s("div", Ai, [...y[4] || (y[4] = [
              e("i", null, null, -1),
              e("span", null, "正在解析登录高清视频流…", -1)
            ])])) : k("", !0)
          ]),
          e("div", {
            class: "bili-sub-scroll-stage",
            onScrollPassive: g
          }, [
            e("div", Vi, [
              e("div", Ui, [
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: n(B).organizer.showFullDescInRightPanel ? "切回台词展示" : "在右侧大屏展开完整视频简介",
                  onClick: z
                }, l(n(B).organizer.showFullDescInRightPanel ? "缩小简介" : "放大简介"), 9, Fi)
              ]),
              e("h4", null, l(b.value.title), 1),
              e("div", Ni, [
                e("span", null, "▣ 播放: " + l(b.value.playCount), 1),
                e("span", null, "💬 弹幕: " + l(b.value.danmakuCount), 1),
                e("span", null, "⏱ " + l(b.value.duration), 1)
              ]),
              e("p", qi, [
                he(Xe, {
                  text: b.value.description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ]),
            e("div", Gi, [
              e("div", Oi, [
                e("div", Hi, [
                  y[5] || (y[5] = e("span", null, "💬 评论", -1)),
                  e("span", ji, l(A.value), 1)
                ]),
                e("div", Wi, [
                  e("button", {
                    type: "button",
                    class: L(["bili-mini-sort-btn", { active: r.value === 1 }]),
                    onClick: y[0] || (y[0] = (c) => E(1))
                  }, "按热度", 2),
                  e("button", {
                    type: "button",
                    class: L(["bili-mini-sort-btn", { active: r.value === 0 }]),
                    onClick: y[1] || (y[1] = (c) => E(0))
                  }, "按时间", 2)
                ])
              ]),
              e("div", Yi, [
                e("button", {
                  type: "button",
                  class: L(["bili-sub-emote-button", { on: ae.value }]),
                  title: "选择 B站 表情",
                  onClick: re
                }, "☺", 2),
                le(e("input", {
                  ref_key: "commentInputRef",
                  ref: be,
                  "onUpdate:modelValue": y[2] || (y[2] = (c) => Y.value = c),
                  type: "text",
                  class: "bili-sub-comment-input",
                  placeholder: "发一条友善的评论吧…（Enter 发送）",
                  maxlength: "500",
                  onKeydown: Re(S(ke, ["prevent"]), ["enter"])
                }, null, 40, Ki), [
                  [Te, Y.value]
                ]),
                e("button", {
                  type: "button",
                  class: "bili-sub-comment-send-btn",
                  disabled: X.value || !Y.value.trim(),
                  onClick: ke
                }, l(X.value ? "发送中…" : "发送"), 9, Xi)
              ]),
              ae.value ? (o(), s("div", Qi, [
                xe.value ? (o(), s("div", Ji, [...y[6] || (y[6] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取 B站 表情包…", -1)
                ])])) : (o(), s("div", Zi, [
                  (o(!0), s(F, null, W(v.value, (c) => (o(), s("section", {
                    key: c.text,
                    class: "bili-sub-emote-group"
                  }, [
                    e("h5", null, l(c.text || "B站表情"), 1),
                    e("div", null, [
                      (o(!0), s(F, null, W(c.emote, (C) => (o(), s("button", {
                        key: C.text,
                        type: "button",
                        class: "bili-sub-emote-item",
                        title: C.text,
                        onClick: (G) => Se(C.text)
                      }, [
                        C.url ? (o(), s("img", {
                          key: 0,
                          src: C.url,
                          alt: C.text,
                          referrerpolicy: "no-referrer"
                        }, null, 8, to)) : (o(), s("span", io, l(C.text), 1))
                      ], 8, eo))), 128))
                    ])
                  ]))), 128))
                ]))
              ])) : k("", !0),
              ye.value ? (o(), s("div", {
                key: 1,
                class: L(["bili-sub-comment-tip", { error: Ce.value }])
              }, l(ye.value), 3)) : k("", !0),
              e("div", oo, [
                P.value && !_.value.length ? (o(), s("p", so, "正在加载评论…")) : R.value && !_.value.length ? (o(), s("p", no, l(R.value), 1)) : k("", !0),
                (o(!0), s(F, null, W(_.value, (c) => (o(), s("div", {
                  key: c.id,
                  class: "bili-comment-item"
                }, [
                  e("img", {
                    class: "bili-comment-avatar",
                    src: c.avatar,
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer"
                  }, null, 8, lo),
                  e("div", ao, [
                    e("div", ro, [
                      e("span", uo, l(c.userName), 1),
                      c.level ? (o(), s("span", co, "LV" + l(c.level), 1)) : k("", !0),
                      e("span", po, l(c.timeStr), 1)
                    ]),
                    e("div", bo, [
                      he(Xe, {
                        text: c.message
                      }, null, 8, ["text"])
                    ]),
                    c.pictures?.length ? (o(), s("div", vo, [
                      (o(!0), s(F, null, W(c.pictures, (C, G) => (o(), s("a", {
                        key: G,
                        class: "bili-comment-pic-link",
                        href: C,
                        onClick: S((q) => O(c.pictures, G), ["stop", "prevent"])
                      }, [
                        e("img", {
                          class: "bili-comment-pic",
                          src: C,
                          alt: "评论图片",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, go)
                      ], 8, fo))), 128))
                    ])) : k("", !0),
                    e("div", mo, [
                      c.likeCount ? (o(), s("span", ho, "👍 " + l(c.likeCount), 1)) : k("", !0),
                      c.replyCount ? (o(), s("span", yo, "💬 " + l(c.replyCount), 1)) : k("", !0)
                    ]),
                    c.replies?.length ? (o(), s("div", _o, [
                      (o(!0), s(F, null, W(c.replies, (C) => (o(), s("div", {
                        key: C.id,
                        class: "bili-comment-sub-item"
                      }, [
                        e("span", ko, l(C.userName) + ":", 1),
                        he(Xe, {
                          text: C.message
                        }, null, 8, ["text"])
                      ]))), 128)),
                      e("div", $o, [
                        !c.subRepliesExpanded && (c.replyCount || 0) > c.replies.length ? (o(), s(F, { key: 0 }, [
                          e("span", null, "共 " + l(c.replyCount) + " 条回复，", 1),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: c.subRepliesLoading,
                            onClick: S((C) => d(c.id), ["stop"])
                          }, l(c.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, wo)
                        ], 64)) : c.subRepliesExpanded ? (o(), s(F, { key: 1 }, [
                          c.subRepliesHasMore ? (o(), s("button", {
                            key: 0,
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: c.subRepliesLoading,
                            onClick: S((C) => d(c.id), ["stop"])
                          }, l(c.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, Co)) : k("", !0),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-collapse-btn",
                            onClick: S((C) => p(c.id), ["stop"])
                          }, " 收起 ▴ ", 8, xo)
                        ], 64)) : k("", !0)
                      ])
                    ])) : k("", !0)
                  ])
                ]))), 128))
              ]),
              e("div", So, [
                U.value ? (o(), s("p", To, "正在加载更多评论…")) : !j.value && _.value.length ? (o(), s("p", Do, "已显示全部评论")) : k("", !0)
              ])
            ])
          ], 32)
        ])
      ])) : (o(), s("p", Mo, "暂无可播放的订阅视频。"))
    ]));
  }
}), zo = /* @__PURE__ */ ze(Po, [["__scopeId", "data-v-d420748e"]]), Bo = ["disabled"], Io = ["disabled"], Ro = { key: 0 }, Lo = ["disabled"], Eo = ["disabled"], Ao = ["disabled"], Vo = ["disabled"], Uo = { class: "bili-sub-add-shell" }, Fo = ["disabled"], No = { class: "bili-sub-add-toolbar" }, qo = { class: "bili-sub-add-groups" }, Go = ["onClick"], Oo = { class: "bili-sub-add-list" }, Ho = {
  key: 0,
  class: "fo-bili-loading"
}, jo = {
  key: 1,
  class: "fo-bili-empty"
}, Wo = {
  key: 2,
  class: "fo-bili-empty"
}, Yo = ["disabled", "onClick"], Ko = ["src"], Xo = {
  key: 1,
  class: "bili-sub-add-avatar"
}, Qo = {
  class: "fo-custom-confirm-modal",
  role: "dialog",
  "aria-modal": "true"
}, Jo = { class: "fo-custom-confirm-head" }, Zo = { class: "fo-custom-confirm-body" }, es = { class: "fo-custom-confirm-actions" }, ts = ["disabled"], is = ["disabled"], os = /* @__PURE__ */ Me({
  __name: "BiliOrganizerDialogs",
  setup(pe) {
    const b = oe(() => st.create), D = oe(() => st.confirm), f = oe(() => st.channelPicker), T = oe(() => b.value.kind === "bili"), N = oe(() => {
      const r = f.value, h = r.query.trim().toLowerCase(), _ = r.groups.find((P) => P.id === r.activeGroupId), A = _ ? new Set(_.mids) : null;
      return r.items.filter((P) => (!A || A.has(P.mid)) && (!h || P.name.toLowerCase().includes(h) || P.mid.includes(h)));
    });
    function M() {
      const r = b.value.name.trim();
      if (!r) {
        de.updateCreate({ status: "请输入名称", error: !0 });
        return;
      }
      de.submitCreate({ name: r, privacy: b.value.privacy });
    }
    return (r, h) => (o(), s(F, null, [
      b.value.open ? (o(), s("dialog", {
        key: 0,
        class: "fo-create-dialog",
        open: "",
        onClick: h[5] || (h[5] = S((_) => n(de).closeCreate(), ["self"])),
        onCancel: h[6] || (h[6] = S((_) => n(de).closeCreate(), ["prevent"]))
      }, [
        e("form", {
          onSubmit: S(M, ["prevent"])
        }, [
          e("header", null, [
            e("div", null, [
              h[14] || (h[14] = e("i", { class: "fo-folder-icon" }, null, -1)),
              e("span", null, [
                e("b", null, l(T.value ? "新建 B站收藏夹" : "新建插件分组"), 1),
                e("small", null, l(T.value ? "会同步创建到你的 B站账号" : "只整理左侧收藏夹，不修改 B站数据"), 1)
              ])
            ]),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: b.value.submitting,
              onClick: h[0] || (h[0] = (_) => n(de).closeCreate())
            }, "×", 8, Bo)
          ]),
          e("label", null, [
            e("span", null, l(T.value ? "收藏夹名称" : "分组名称"), 1),
            le(e("input", {
              "onUpdate:modelValue": h[1] || (h[1] = (_) => b.value.name = _),
              maxlength: "48",
              autocomplete: "off",
              placeholder: "输入名称",
              required: "",
              disabled: b.value.submitting,
              autofocus: ""
            }, null, 8, Io), [
              [Te, b.value.name]
            ])
          ]),
          T.value ? (o(), s("fieldset", Ro, [
            h[17] || (h[17] = e("legend", null, "可见范围", -1)),
            e("label", null, [
              le(e("input", {
                "onUpdate:modelValue": h[2] || (h[2] = (_) => b.value.privacy = _),
                type: "radio",
                value: 0,
                disabled: b.value.submitting
              }, null, 8, Lo), [
                [
                  dt,
                  b.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              h[15] || (h[15] = e("span", null, [
                e("b", null, "公开"),
                e("small", null, "其他人可以看到")
              ], -1))
            ]),
            e("label", null, [
              le(e("input", {
                "onUpdate:modelValue": h[3] || (h[3] = (_) => b.value.privacy = _),
                type: "radio",
                value: 1,
                disabled: b.value.submitting
              }, null, 8, Eo), [
                [
                  dt,
                  b.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              h[16] || (h[16] = e("span", null, [
                e("b", null, "私密"),
                e("small", null, "仅自己可见")
              ], -1))
            ])
          ])) : k("", !0),
          e("p", {
            class: L(["fo-create-status", { error: b.value.error }]),
            role: "status"
          }, l(b.value.status), 3),
          e("footer", null, [
            e("button", {
              type: "button",
              disabled: b.value.submitting,
              onClick: h[4] || (h[4] = (_) => n(de).closeCreate())
            }, "取消", 8, Ao),
            e("button", {
              class: "primary",
              type: "submit",
              disabled: b.value.submitting
            }, l(b.value.submitting ? "创建中…" : T.value ? "创建收藏夹" : "创建分组"), 9, Vo)
          ])
        ], 32)
      ], 32)) : k("", !0),
      f.value.open ? (o(), s("dialog", {
        key: 1,
        class: "bili-sub-add-dialog",
        open: "",
        onCancel: h[10] || (h[10] = S((_) => n(de).closeChannelPicker(), ["prevent"]))
      }, [
        e("div", Uo, [
          e("header", null, [
            h[18] || (h[18] = e("div", null, [
              e("b", null, "从我的关注中添加 UP 主"),
              e("small", null, "沿用“正在关注”的本地分组，只能添加已关注的 UP 主")
            ], -1)),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: !!f.value.submittingMid,
              onClick: h[7] || (h[7] = (_) => n(de).closeChannelPicker())
            }, "×", 8, Fo)
          ]),
          e("div", No, [
            e("div", qo, [
              e("button", {
                type: "button",
                class: L(["bili-sub-add-group", { on: f.value.activeGroupId === "__all__" }]),
                onClick: h[8] || (h[8] = (_) => n(de).updateChannelPicker({ activeGroupId: "__all__" }))
              }, "全部关注", 2),
              (o(!0), s(F, null, W(f.value.groups, (_) => (o(), s("button", {
                key: _.id,
                type: "button",
                class: L(["bili-sub-add-group", { on: f.value.activeGroupId === _.id }]),
                onClick: (A) => n(de).updateChannelPicker({ activeGroupId: _.id })
              }, l(_.name), 11, Go))), 128))
            ]),
            le(e("input", {
              "onUpdate:modelValue": h[9] || (h[9] = (_) => f.value.query = _),
              type: "search",
              placeholder: "搜索关注的 UP 主"
            }, null, 512), [
              [Te, f.value.query]
            ])
          ]),
          e("div", Oo, [
            f.value.loading ? (o(), s("div", Ho, [...h[19] || (h[19] = [
              e("i", null, null, -1),
              e("span", null, "正在读取关注分组…", -1)
            ])])) : f.value.error ? (o(), s("p", jo, l(f.value.error), 1)) : N.value.length ? (o(!0), s(F, { key: 3 }, W(N.value, (_) => (o(), s("button", {
              key: _.mid,
              type: "button",
              class: "bili-sub-add-up",
              disabled: _.added || !!f.value.submittingMid,
              onClick: (A) => n(de).selectChannel(_.mid)
            }, [
              _.face ? (o(), s("img", {
                key: 0,
                src: _.face,
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, Ko)) : (o(), s("span", Xo, "UP")),
              e("span", null, [
                e("b", null, l(_.name), 1),
                e("small", null, "UID " + l(_.mid), 1)
              ]),
              e("i", null, l(_.added ? "已添加" : f.value.submittingMid === _.mid ? "添加中…" : "＋ 添加"), 1)
            ], 8, Yo))), 128)) : (o(), s("p", Wo, "该分组中没有匹配的已关注 UP 主。"))
          ])
        ])
      ], 32)) : k("", !0),
      D.value.open ? (o(), s("div", {
        key: 2,
        class: "fo-custom-confirm-overlay",
        onClick: h[13] || (h[13] = S((_) => n(de).closeConfirm(), ["self"]))
      }, [
        e("div", Qo, [
          e("div", Jo, [
            e("h4", null, l(D.value.title), 1)
          ]),
          e("div", Zo, [
            e("p", null, l(D.value.message), 1)
          ]),
          e("div", es, [
            e("button", {
              type: "button",
              class: "fo-confirm-btn cancel",
              disabled: D.value.submitting,
              onClick: h[11] || (h[11] = (_) => n(de).closeConfirm())
            }, l(D.value.cancelText), 9, ts),
            e("button", {
              type: "button",
              class: L(["fo-confirm-btn confirm", { danger: D.value.danger }]),
              disabled: D.value.submitting,
              onClick: h[12] || (h[12] = (_) => n(de).submitConfirm())
            }, l(D.value.submitting ? "处理中…" : D.value.confirmText), 11, is)
          ])
        ])
      ])) : k("", !0)
    ], 64));
  }
}), ss = ["aria-busy"], ns = { class: "field full-width" }, ls = { class: "cache-directory-name" }, as = { class: "cache-directory-actions" }, rs = ["disabled"], ds = ["disabled"], us = /* @__PURE__ */ Me({
  __name: "BiliSettingsPanel",
  props: {
    active: { type: Boolean }
  },
  setup(pe) {
    const b = pe, D = x(!1), f = x(!1), T = x(""), N = x(!1), M = x(null), r = x("尚未选择缓存目录");
    let h = !0, _ = 0;
    async function A() {
      if (!b.active || D.value) return;
      const U = ++_;
      f.value = !0;
      try {
        const R = await Dt();
        if (!h || U !== _) return;
        M.value = R, r.value = R?.name || "尚未选择缓存目录";
      } catch {
        h && U === _ && (M.value = null, r.value = "缓存目录读取失败，请重试");
      } finally {
        h && U === _ && (f.value = !1);
      }
    }
    async function P() {
      if (D.value || !b.active) return;
      const U = window.showDirectoryPicker;
      if (typeof U != "function") {
        T.value = "当前浏览器不支持目录选择，请使用支持此功能的 Edge 或 Chrome。", N.value = !0;
        return;
      }
      ++_, f.value = !1, D.value = !0, T.value = "";
      try {
        const R = await U.call(window, {
          id: "logicweaver-bili-cache",
          mode: "readwrite",
          startIn: M.value || "videos"
        });
        if (await Mt(R), !h) return;
        M.value = R, r.value = R.name, N.value = !1, T.value = "目录已保存，新缓存将存入这里；已有视频不会移动或删除。";
      } catch (R) {
        h && R?.name !== "AbortError" && (N.value = !0, T.value = "目录选择或保存未确认，请重读目录核对后再试。");
      } finally {
        h && (D.value = !1);
      }
    }
    return ce(() => b.active, (U) => {
      U ? A() : ++_;
    }, { immediate: !0 }), He(() => window.addEventListener("focus", A)), ft(() => {
      h = !1, ++_, window.removeEventListener("focus", A);
    }), (U, R) => (o(), s("div", {
      class: "settings-subgroup bili-cache-settings",
      "aria-busy": D.value || f.value
    }, [
      e("div", ns, [
        e("p", ls, l(f.value ? "正在读取缓存目录…" : r.value), 1),
        e("div", as, [
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !b.active || D.value || f.value,
            onClick: P
          }, l(D.value ? "正在保存…" : "选择或重新授权目录"), 9, rs),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !b.active || D.value || f.value,
            onClick: A
          }, "重读目录", 8, ds)
        ]),
        R[0] || (R[0] = e("p", { class: "hint" }, "仅更改之后的缓存位置；新缓存保留原目录关联，旧版记录需选择其实际所在目录后播放。不会自动扫描或搬移已有文件。", -1)),
        T.value ? (o(), s("p", {
          key: 0,
          class: L(["hint cache-directory-message", { "is-error": N.value }]),
          role: "status"
        }, l(T.value), 3)) : k("", !0)
      ])
    ], 8, ss));
  }
}), cs = /* @__PURE__ */ ze(us, [["__scopeId", "data-v-e408b4ea"]]), ps = {
  class: "bili-cache-settings-view",
  "aria-labelledby": "bili-cache-settings-title"
}, bs = { class: "cache-settings-header" }, vs = { class: "cache-settings-card" }, fs = /* @__PURE__ */ Me({
  __name: "BiliCacheSettingsView",
  props: {
    active: { type: Boolean }
  },
  emits: ["back"],
  setup(pe, { emit: b }) {
    const D = b;
    return (f, T) => (o(), s("section", ps, [
      e("header", bs, [
        T[1] || (T[1] = e("div", null, [
          e("h3", { id: "bili-cache-settings-title" }, "缓存设置"),
          e("p", null, "管理 B站视频的本地缓存目录")
        ], -1)),
        e("button", {
          type: "button",
          class: "cache-settings-back",
          onClick: T[0] || (T[0] = (N) => D("back"))
        }, "返回缓存视频")
      ]),
      e("div", vs, [
        T[2] || (T[2] = e("h4", null, "视频缓存目录", -1)),
        T[3] || (T[3] = e("p", { class: "cache-settings-note" }, "选择后立即保存，无需到全局设置中操作。浏览器只提供文件夹名称，不显示完整磁盘路径。", -1)),
        he(cs, { active: pe.active }, null, 8, ["active"])
      ])
    ]));
  }
}), gs = /* @__PURE__ */ ze(fs, [["__scopeId", "data-v-43d869dd"]]), ms = { class: "fo-upg-shell" }, hs = { class: "fo-upg-body" }, ys = { class: "fo-upg-sidebar" }, _s = { class: "fo-upg-sidebar-head" }, ks = { class: "fo-upg-group-items" }, $s = ["onDragstart", "onDrop", "onClick"], ws = ["onKeydown"], Cs = {
  key: 0,
  class: "fo-upg-tree-branch"
}, xs = {
  key: 1,
  class: "fo-folder-icon"
}, Ss = { class: "fo-upg-group-name" }, Ts = { class: "fo-upg-vue-group-actions" }, Ds = ["onClick"], Ms = ["onClick"], Ps = ["onClick"], zs = ["placeholder"], Bs = {
  key: 1,
  class: "muted small"
}, Is = { class: "fo-upg-main" }, Rs = { class: "fo-upg-main-head" }, Ls = { class: "fo-upg-main-title" }, Es = { key: 0 }, As = { class: "fo-upg-head-actions" }, Vs = { class: "fo-upg-filter-tabs" }, Us = { class: "fo-upg-batch-wrap" }, Fs = { class: "fo-upg-batch-count" }, Ns = ["disabled"], qs = ["disabled"], Gs = { class: "fo-upg-toolbar" }, Os = { class: "fo-upg-search" }, Hs = ["disabled"], js = {
  key: 0,
  class: "fo-bili-loading"
}, Ws = {
  key: 1,
  class: "fo-bili-empty"
}, Ys = {
  key: 2,
  class: "fo-bili-empty"
}, Ks = {
  key: 3,
  class: "fo-bili-empty"
}, Xs = ["title", "onContextmenu", "onClick"], Qs = ["src"], Js = { class: "fo-upg-info" }, Zs = { class: "fo-upg-name" }, en = { class: "fo-upg-sign" }, tn = ["disabled", "onClick"], on = {
  key: 1,
  class: "fo-upg-move-wrap"
}, sn = ["disabled"], nn = { class: "fo-upg-move-dropdown" }, ln = ["disabled", "onClick"], an = { key: 0 }, rn = {
  key: 0,
  class: "muted small",
  style: { padding: "6px 10px" }
}, dn = ["disabled", "onClick"], un = { class: "fo-upg-pagination" }, cn = { class: "fo-upg-page-info" }, pn = {
  key: 0,
  class: "fo-upg-page-btns"
}, bn = ["disabled"], vn = ["disabled"], fn = { class: "fo-upg-page-cur" }, gn = ["disabled"], mn = ["disabled"], hn = /* @__PURE__ */ Me({
  __name: "BiliUpGroupManager",
  setup(pe) {
    const b = x(void 0), D = x(""), f = x(""), T = x(""), N = x(""), M = x(!1), r = x(/* @__PURE__ */ new Set()), h = x(null);
    function _($) {
      if ($.button !== 0 || $.target.closest("button,input")) return;
      const d = h.value;
      if (!d) return;
      const p = d.getBoundingClientRect(), E = p.left, te = p.top, re = $.clientX, Se = $.clientY;
      d.style.position = "fixed", d.style.left = `${E}px`, d.style.top = `${te}px`, d.style.right = "auto", d.style.bottom = "auto", d.style.margin = "0", d.style.transform = "none";
      const ke = (Be) => {
        const Ue = Be.clientX - re, Fe = Be.clientY - Se, fe = Math.max(8, Math.min(window.innerWidth - 120, E + Ue)), Le = Math.max(8, Math.min(window.innerHeight - 80, te + Fe));
        d.style.left = `${fe}px`, d.style.top = `${Le}px`;
      }, Pe = () => {
        window.removeEventListener("pointermove", ke), window.removeEventListener("pointerup", Pe);
      };
      window.addEventListener("pointermove", ke), window.addEventListener("pointerup", Pe);
    }
    const A = oe(() => m.groups.find(($) => $.id === m.activeGroupId) || null), P = oe(() => {
      const $ = m.query.trim().toLowerCase(), d = m.activeGroupId;
      return m.followings.filter((p) => {
        if ($ && !p.name.toLowerCase().includes($) && !p.sign.toLowerCase().includes($) && !p.mid.includes($)) return !1;
        const E = p.groupIds.includes(d);
        return m.filter === "ingroup" ? E : m.onlyUngrouped ? !p.groupIds || p.groupIds.length === 0 : !0;
      });
    }), U = oe(() => Math.max(1, Math.ceil(P.value.length / m.pageSize))), R = oe(() => {
      const d = (Math.min(m.page, U.value) - 1) * m.pageSize;
      return P.value.slice(d, d + m.pageSize);
    }), j = oe(() => m.followings.filter(($) => $.groupIds.length === 0).length), Y = x(null), be = /* @__PURE__ */ new Map();
    function X($) {
      const d = Math.max(1, Math.min(U.value, $));
      m.page = d, Y.value && (Y.value.scrollTop = 0);
    }
    ce(() => [m.query, m.filter, m.onlyUngrouped], () => {
      m.page = 1, Y.value && (Y.value.scrollTop = 0);
    }), ce(() => m.activeGroupId, ($, d) => {
      if (d && Y.value) {
        const te = `${d}_${m.filter}_${m.onlyUngrouped}`;
        be.set(te, {
          page: m.page,
          scrollTop: Y.value.scrollTop
        });
      }
      if (m.filter === "all")
        return;
      const p = `${$}_${m.filter}_${m.onlyUngrouped}`, E = be.get(p);
      E ? (m.page = Math.min(E.page, U.value), nt(() => {
        Y.value && (Y.value.scrollTop = E.scrollTop);
      })) : (m.page = 1, nt(() => {
        Y.value && (Y.value.scrollTop = 0);
      }));
    }), ce(U, ($) => {
      m.page > $ && (m.page = $);
    }), ce(M, ($) => {
      $ || r.value.clear();
    });
    function ye($) {
      b.value = $, D.value = "";
    }
    function Ce() {
      b.value = void 0, D.value = "";
    }
    function ae() {
      const $ = D.value.trim();
      $ && (me.dispatch("create-group", { name: $, parentId: b.value || "" }), Ce());
    }
    function xe($) {
      f.value = $.id, T.value = $.name;
    }
    function v() {
      const $ = T.value.trim();
      f.value && $ && me.dispatch("rename-group", { id: f.value, name: $ }), f.value = "", T.value = "";
    }
    function se($, d) {
      N.value = d, $.dataTransfer?.setData("application/x-logicweaver-up-group", d), $.dataTransfer && ($.dataTransfer.effectAllowed = "move");
    }
    function ee($, d) {
      const p = $.dataTransfer?.getData("application/x-logicweaver-up-group") || N.value;
      if (N.value = "", !p || p === d) return;
      const E = $.currentTarget?.getBoundingClientRect(), te = E ? $.clientY - E.top : 0, re = E ? te < E.height * 0.25 ? "before" : te > E.height * 0.75 ? "after" : "into" : "into";
      me.dispatch("move-group", { sourceId: p, targetId: d, mode: re });
    }
    function Q($) {
      const d = $.dataTransfer?.getData("application/x-logicweaver-up-group") || N.value;
      N.value = "", d && me.dispatch("move-group", { sourceId: d, targetId: "", mode: "root" });
    }
    function ne($, d) {
      !d || m.busyMid || me.dispatch("toggle-member", { groupId: d, mid: $ });
    }
    function z($) {
      !m.activeGroupId || m.busyMid || me.dispatch("toggle-member", { groupId: m.activeGroupId, mid: $ });
    }
    function g($, d) {
      me.dispatch("preview-up", { mid: d, clientX: $.clientX, clientY: $.clientY });
    }
    function O($) {
      const d = r.value;
      d.has($) ? d.delete($) : d.add($);
    }
    function J() {
      if (!m.activeGroupId || m.busyMid) return;
      const $ = Array.from(r.value);
      if (!$.length) return;
      const d = $.filter((p) => {
        const E = m.followings.find((te) => te.mid === p);
        return E && !E.groupIds.includes(m.activeGroupId);
      });
      if (d.length) {
        for (const p of d)
          me.dispatch("toggle-member", { groupId: m.activeGroupId, mid: p });
        r.value.clear();
      }
    }
    function ve() {
      if (!m.activeGroupId || m.busyMid) return;
      const $ = Array.from(r.value);
      if (!$.length) return;
      const d = $.filter((p) => {
        const E = m.followings.find((te) => te.mid === p);
        return E && E.groupIds.includes(m.activeGroupId);
      });
      if (d.length) {
        for (const p of d)
          me.dispatch("toggle-member", { groupId: m.activeGroupId, mid: p });
        r.value.clear();
      }
    }
    function _e() {
      for (const $ of R.value) r.value.add($.mid);
    }
    return ($, d) => n(m).open ? (o(), s("dialog", {
      key: 0,
      ref_key: "dialogEl",
      ref: h,
      class: "fo-up-group-dialog",
      open: "",
      onCancel: d[20] || (d[20] = S((p) => n(me).close(), ["prevent"]))
    }, [
      e("div", ms, [
        e("header", {
          class: "fo-upg-head",
          onPointerdown: _
        }, [
          d[21] || (d[21] = e("h3", null, [
            e("span", null, "👥"),
            ue(" 关注分组与 UP 主管理")
          ], -1)),
          e("button", {
            type: "button",
            class: "fo-upg-close-btn",
            "aria-label": "关闭",
            title: "关闭管理面板",
            onClick: d[0] || (d[0] = (p) => n(me).close())
          }, "✕")
        ], 32),
        e("div", hs, [
          e("aside", ys, [
            e("div", _s, [
              d[22] || (d[22] = e("span", null, "我的分组", -1)),
              e("button", {
                type: "button",
                onClick: d[1] || (d[1] = (p) => ye(null))
              }, "＋ 新建")
            ]),
            e("div", ks, [
              e("div", {
                class: "fo-upg-root-dropzone",
                onDragover: d[2] || (d[2] = S(() => {
                }, ["prevent"])),
                onDrop: S(Q, ["prevent"])
              }, "⇣ 拖至此处变为顶级分组", 32),
              b.value === null ? (o(), s("form", {
                key: 0,
                class: "fo-upg-create-box",
                onSubmit: S(ae, ["prevent"])
              }, [
                le(e("input", {
                  "onUpdate:modelValue": d[3] || (d[3] = (p) => D.value = p),
                  maxlength: "20",
                  placeholder: "输入分组名称…",
                  autofocus: ""
                }, null, 512), [
                  [Te, D.value]
                ]),
                e("div", { class: "fo-upg-create-btns" }, [
                  e("button", {
                    type: "button",
                    class: "cancel",
                    onClick: Ce
                  }, "取消"),
                  d[23] || (d[23] = e("button", {
                    class: "confirm",
                    type: "submit"
                  }, "确定", -1))
                ])
              ], 32)) : k("", !0),
              (o(!0), s(F, null, W(n(m).groups, (p) => (o(), s(F, {
                key: p.id
              }, [
                e("div", {
                  class: L(["fo-upg-group-item", { on: p.id === n(m).activeGroupId, "is-subgroup": p.depth > 0 }]),
                  style: De({ paddingLeft: `${8 + p.depth * 18}px` }),
                  draggable: "true",
                  onDragstart: (E) => se(E, p.id),
                  onDragover: d[7] || (d[7] = S(() => {
                  }, ["prevent"])),
                  onDrop: S((E) => ee(E, p.id), ["prevent"]),
                  onClick: (E) => n(m).activeGroupId = p.id
                }, [
                  f.value === p.id ? (o(), s(F, { key: 0 }, [
                    le(e("input", {
                      "onUpdate:modelValue": d[4] || (d[4] = (E) => T.value = E),
                      class: "fo-upg-rename-input",
                      maxlength: "20",
                      onClick: d[5] || (d[5] = S(() => {
                      }, ["stop"])),
                      onKeydown: Re(S(v, ["prevent"]), ["enter"])
                    }, null, 40, ws), [
                      [Te, T.value]
                    ]),
                    e("button", {
                      type: "button",
                      onClick: S(v, ["stop"])
                    }, "✓"),
                    e("button", {
                      type: "button",
                      onClick: d[6] || (d[6] = S((E) => f.value = "", ["stop"]))
                    }, "✕")
                  ], 64)) : (o(), s(F, { key: 1 }, [
                    p.depth ? (o(), s("span", Cs, "↳")) : (o(), s("i", xs)),
                    e("span", Ss, l(p.name), 1),
                    e("small", null, l(p.upMids.length), 1),
                    e("span", Ts, [
                      e("button", {
                        type: "button",
                        title: "添加子分组",
                        onClick: S((E) => ye(p.id), ["stop"])
                      }, "＋", 8, Ds),
                      e("button", {
                        type: "button",
                        title: "重命名",
                        onClick: S((E) => xe(p), ["stop"])
                      }, "✎", 8, Ms),
                      e("button", {
                        type: "button",
                        class: "danger",
                        title: "删除",
                        onClick: S((E) => n(me).dispatch("delete-group", p.id), ["stop"])
                      }, "×", 8, Ps)
                    ])
                  ], 64))
                ], 46, $s),
                b.value === p.id ? (o(), s("form", {
                  key: 0,
                  class: "fo-upg-create-box",
                  style: De({ marginLeft: `${18 + p.depth * 18}px` }),
                  onSubmit: S(ae, ["prevent"])
                }, [
                  le(e("input", {
                    "onUpdate:modelValue": d[8] || (d[8] = (E) => D.value = E),
                    maxlength: "20",
                    placeholder: `输入「${p.name}」的子分组名称…`,
                    autofocus: ""
                  }, null, 8, zs), [
                    [Te, D.value]
                  ]),
                  e("div", { class: "fo-upg-create-btns" }, [
                    e("button", {
                      type: "button",
                      class: "cancel",
                      onClick: Ce
                    }, "取消"),
                    d[24] || (d[24] = e("button", {
                      class: "confirm",
                      type: "submit"
                    }, "确定", -1))
                  ])
                ], 36)) : k("", !0)
              ], 64))), 128)),
              !n(m).groups.length && !n(m).loading ? (o(), s("p", Bs, '暂无分组，请点击"＋ 新建"。')) : k("", !0)
            ])
          ]),
          e("section", Is, [
            e("div", Rs, [
              e("div", Ls, [
                e("h4", null, l(A.value ? `分组：「${A.value.name}」` : "请先选择或新建分组"), 1),
                A.value ? (o(), s("span", Es, "（本组 " + l(A.value.upMids.length) + " 位 · 共 " + l(n(m).followings.length) + " 位关注 · 未分组 " + l(j.value) + " 位）", 1)) : k("", !0)
              ]),
              e("div", As, [
                e("div", Vs, [
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-filter-tab", { on: n(m).filter === "all" }]),
                    onClick: d[9] || (d[9] = (p) => n(m).filter = "all")
                  }, "全部关注", 2),
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-filter-tab", { on: n(m).filter === "ingroup" }]),
                    onClick: d[10] || (d[10] = (p) => n(m).filter = "ingroup")
                  }, "本组已加", 2)
                ]),
                e("div", Us, [
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-batch-toggle", { on: M.value }]),
                    onClick: d[11] || (d[11] = (p) => M.value = !M.value)
                  }, l(M.value ? "退出批量" : "批量操作"), 3),
                  M.value && r.value.size > 0 ? (o(), s(F, { key: 0 }, [
                    e("span", Fs, "已选 " + l(r.value.size), 1),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action add",
                      disabled: !A.value,
                      onClick: J
                    }, "＋ 加入本组", 8, Ns),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action remove",
                      disabled: !A.value,
                      onClick: ve
                    }, "− 移出本组", 8, qs),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: _e
                    }, "全选当页"),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: d[12] || (d[12] = (p) => r.value.clear())
                    }, "清除")
                  ], 64)) : k("", !0)
                ]),
                n(m).filter === "all" ? (o(), s("label", {
                  key: 0,
                  class: L(["fo-upg-switch", { on: n(m).onlyUngrouped }])
                }, [
                  le(e("input", {
                    "onUpdate:modelValue": d[13] || (d[13] = (p) => n(m).onlyUngrouped = p),
                    type: "checkbox"
                  }, null, 512), [
                    [wt, n(m).onlyUngrouped]
                  ]),
                  d[25] || (d[25] = e("span", { class: "fo-upg-switch-track" }, [
                    e("span", { class: "fo-upg-switch-thumb" })
                  ], -1)),
                  d[26] || (d[26] = e("span", { class: "fo-upg-switch-text" }, "仅未分组 UP", -1))
                ], 2)) : k("", !0)
              ])
            ]),
            e("div", Gs, [
              e("div", Os, [
                d[27] || (d[27] = e("span", null, "🔍", -1)),
                le(e("input", {
                  "onUpdate:modelValue": d[14] || (d[14] = (p) => n(m).query = p),
                  type: "search",
                  placeholder: "搜索关注的 UP 主…"
                }, null, 512), [
                  [Te, n(m).query]
                ])
              ]),
              e("button", {
                type: "button",
                class: "fo-upg-refresh-btn",
                disabled: n(m).refreshing,
                onClick: d[15] || (d[15] = (p) => n(me).dispatch("refresh"))
              }, l(n(m).refreshing ? "刷新中…" : "↻ 刷新关注"), 9, Hs)
            ]),
            e("div", {
              ref_key: "listRef",
              ref: Y,
              class: "fo-upg-list"
            }, [
              n(m).loading ? (o(), s("div", js, [...d[28] || (d[28] = [
                e("i", null, null, -1),
                e("span", null, "正在加载关注的 UP 主列表…", -1)
              ])])) : n(m).error ? (o(), s("p", Ws, l(n(m).error), 1)) : A.value ? R.value.length ? (o(!0), s(F, { key: 4 }, W(R.value, (p) => (o(), s("article", {
                key: p.mid,
                class: L(["fo-upg-card", { selected: M.value && r.value.has(p.mid) }]),
                title: `右键查看「${p.name}」近期投稿`,
                onContextmenu: S((E) => g(E, p.mid), ["prevent"]),
                onClick: (E) => M.value ? O(p.mid) : void 0
              }, [
                e("img", {
                  src: p.face,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, Qs),
                e("div", Js, [
                  e("div", Zs, l(p.name), 1),
                  e("div", en, l(p.sign || "暂无签名"), 1)
                ]),
                M.value ? (o(), s("div", {
                  key: 1,
                  class: L(["fo-upg-batch-check", { checked: r.value.has(p.mid) }])
                }, l(r.value.has(p.mid) ? "✓" : ""), 3)) : (o(), s(F, { key: 0 }, [
                  p.groupIds.includes(n(m).activeGroupId) ? (o(), s("button", {
                    key: 0,
                    type: "button",
                    class: "fo-upg-toggle-btn in-group",
                    disabled: n(m).busyMid === p.mid,
                    onClick: S((E) => z(p.mid), ["stop"])
                  }, l(n(m).busyMid === p.mid ? "处理中…" : `移出 ${A.value?.name || ""}`), 9, tn)) : p.groupIds.length > 0 ? (o(), s("div", on, [
                    e("button", {
                      type: "button",
                      class: "fo-upg-toggle-btn belongs-other fo-upg-move-trigger",
                      disabled: n(m).busyMid === p.mid
                    }, l(n(m).busyMid === p.mid ? "处理中…" : `📁 ${p.groupName || "已分组"}`), 9, sn),
                    e("div", nn, [
                      d[30] || (d[30] = e("div", { class: "fo-upg-move-title" }, "移动到分组", -1)),
                      (o(!0), s(F, null, W(n(m).groups, (E) => (o(), s("button", {
                        key: E.id,
                        type: "button",
                        class: L(["fo-upg-move-item", { active: p.groupIds.includes(E.id) }]),
                        disabled: n(m).busyMid === p.mid,
                        onClick: S((te) => ne(p.mid, E.id), ["stop"])
                      }, [
                        d[29] || (d[29] = e("i", { class: "fo-folder-icon small" }, null, -1)),
                        e("span", null, l(E.name), 1),
                        p.groupIds.includes(E.id) ? (o(), s("small", an, "✓ 已加入")) : k("", !0)
                      ], 10, ln))), 128)),
                      n(m).groups.length ? k("", !0) : (o(), s("p", rn, "暂无分组"))
                    ])
                  ])) : n(m).activeGroupId ? (o(), s("button", {
                    key: 2,
                    type: "button",
                    class: "fo-upg-toggle-btn",
                    disabled: n(m).busyMid === p.mid,
                    onClick: S((E) => z(p.mid), ["stop"])
                  }, l(n(m).busyMid === p.mid ? "处理中…" : "＋ 加入"), 9, dn)) : k("", !0)
                ], 64))
              ], 42, Xs))), 128)) : (o(), s("p", Ks, "没有符合条件的 UP 主。")) : (o(), s("p", Ys, "请先新建或选择一个分组。"))
            ], 512),
            e("div", un, [
              e("div", cn, "共 " + l(P.value.length) + " 位 UP 主 · 每页 " + l(n(m).pageSize) + " 位", 1),
              U.value > 1 ? (o(), s("div", pn, [
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page <= 1,
                  onClick: d[16] || (d[16] = (p) => X(1))
                }, "« 首页", 8, bn),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page <= 1,
                  onClick: d[17] || (d[17] = (p) => X(n(m).page - 1))
                }, "‹ 上一页", 8, vn),
                e("span", fn, l(n(m).page) + " / " + l(U.value), 1),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page >= U.value,
                  onClick: d[18] || (d[18] = (p) => X(n(m).page + 1))
                }, "下一页 ›", 8, gn),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page >= U.value,
                  onClick: d[19] || (d[19] = (p) => X(U.value))
                }, "末页 »", 8, mn)
              ])) : k("", !0)
            ])
          ])
        ])
      ])
    ], 544)) : k("", !0);
  }
}), yn = /* @__PURE__ */ ze(hn, [["__scopeId", "data-v-9e5aa70a"]]), _n = ["title"], kn = { class: "tape-capsule-text" }, $n = { class: "capsule-title" }, wn = { class: "capsule-sub" }, Cn = ["title"], xn = { class: "tape-deck-drop-slot" }, Sn = {
  key: 1,
  class: "tape-insert-feedback-chip"
}, Tn = { class: "tape-loaded-title" }, Dn = { class: "tape-body-content" }, Mn = ["title", "onKeydown"], Pn = { class: "tape-cassette" }, zn = { class: "tape-center-label" }, Bn = { class: "tape-sticker-head" }, In = ["title"], Rn = ["src"], Ln = { class: "tape-badge-row" }, En = { class: "tape-brand-text" }, An = { class: "tape-series-header" }, Vn = { class: "tape-series-title-group" }, Un = { class: "tape-series-count-pill" }, Fn = { class: "tape-series-list-scroll" }, Nn = ["onClick"], qn = { class: "tape-series-item-left" }, Gn = { class: "tape-series-item-info" }, On = ["title"], Hn = { class: "tape-series-item-count" }, jn = {
  key: 0,
  class: "tape-series-playing-tag"
}, Wn = {
  key: 1,
  class: "tape-series-play-action"
}, Yn = {
  key: 0,
  class: "tape-series-empty"
}, Kn = {
  class: "tape-transport-controls",
  role: "group",
  "aria-label": "电台播放控制"
}, Xn = ["title", "aria-label"], Qn = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, Jn = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, Zn = { class: "tape-playback-section" }, el = { class: "tape-time-lyric-row" }, tl = { class: "tape-timestamp" }, il = { class: "tape-lyric-container" }, ol = ["title"], sl = ["title", "aria-label"], nl = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, ll = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, al = {
  key: 2,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, rl = ["aria-valuenow"], dl = {
  class: "tape-waveform-row",
  "aria-hidden": "true"
}, ul = {
  class: "tape-waveform-svg",
  viewBox: "0 0 160 16",
  preserveAspectRatio: "none"
}, cl = ["x", "y", "height"], pl = /* @__PURE__ */ Me({
  __name: "BiliRadioTapePlayer",
  props: {
    dockSide: { type: Boolean, default: !1 }
  },
  setup(pe) {
    const b = pe, D = [
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
    ], f = x(!1), T = x(null), N = x(!1), M = x(!1), r = x(""), h = x(!1), _ = x(!1);
    function A(z) {
      z.stopPropagation(), _.value = !_.value, _.value && it.init();
    }
    async function P(z) {
      _.value = !1, await it.playSeries(z, 0);
    }
    function U(z) {
      if (!_.value) return;
      const g = z.target;
      !g?.closest(".tape-series-popover") && !g?.closest(".tape-cassette-wrap") && (_.value = !1);
    }
    function R(z) {
      z.key === "Escape" && _.value && (_.value = !1);
    }
    const j = oe(() => H.mode === "one" ? "单曲循环" : H.mode === "shuffle" ? "乱序播放" : "顺序播放"), Y = x(380);
    function be() {
      if (typeof document > "u" || !b.dockSide) return;
      const z = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock"), g = 20, O = 16;
      if (z) {
        const ve = z.getBoundingClientRect();
        if (ve.left > 80) {
          const _e = Math.floor(ve.left - g - O);
          if (_e > 220) {
            Y.value = _e;
            return;
          }
        }
      }
      const J = typeof window < "u" ? window.innerWidth : 1280;
      Y.value = Math.max(220, Math.floor(J / 2 - 230));
    }
    let X = null;
    function ye() {
      clearTimeout(X), X = setTimeout(be, 60);
    }
    He(() => {
      if (it.init(), typeof window < "u" && (window.addEventListener("pointerdown", U), window.addEventListener("keydown", R)), b.dockSide) {
        be(), window.addEventListener("resize", ye);
        const z = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
        if (z && typeof ResizeObserver < "u") {
          const g = new ResizeObserver(() => be());
          g.observe(z), z.__bili_dock_ro = g;
        }
      }
    }), vt(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", U), window.removeEventListener("keydown", R), window.removeEventListener("resize", ye));
      const z = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
      z && z.__bili_dock_ro && (z.__bili_dock_ro.disconnect(), delete z.__bili_dock_ro);
    });
    function Ce(z) {
      z.preventDefault(), N.value = !0;
    }
    function ae(z) {
      z.preventDefault(), z.dataTransfer && (z.dataTransfer.dropEffect = "copy"), N.value = !0;
    }
    function xe(z) {
      const g = z.currentTarget, O = z.relatedTarget;
      (!O || !g.contains(O)) && (N.value = !1);
    }
    function v(z) {
      z.preventDefault(), N.value = !1;
      const g = z.dataTransfer;
      if (!g) return;
      let O = g.getData("application/x-bili-cassette") || g.getData("application/json"), J = null;
      if (O)
        try {
          J = JSON.parse(O);
        } catch {
        }
      if (!J?.bvid) {
        const _e = (g.getData("text/plain") || g.getData("text/uri-list") || g.getData("application/x-logicweaver-video-url"))?.match(/BV[0-9a-zA-Z]+/);
        _e && (J = {
          bvid: _e[0],
          title: "放入的单曲卡带",
          cover: "",
          author: "Bilibili",
          duration: 0
        });
      }
      J?.bvid && (M.value = !0, r.value = J.title || J.bvid, setTimeout(() => {
        Ee.insertAndPlay(J);
      }, 280), setTimeout(() => {
        M.value = !1;
      }, 1500));
    }
    function se(z) {
      if (T.value) {
        f.value = !0;
        try {
          z.currentTarget?.setPointerCapture?.(z.pointerId);
        } catch {
        }
        ne(z);
      }
    }
    function ee(z) {
      f.value && ne(z);
    }
    function Q(z) {
      if (f.value) {
        ne(z), f.value = !1;
        try {
          z.currentTarget?.releasePointerCapture?.(z.pointerId);
        } catch {
        }
      }
    }
    function ne(z) {
      if (!T.value) return;
      const g = T.value.getBoundingClientRect();
      if (g.width <= 0) return;
      const O = z.clientX - g.left, J = Math.max(0, Math.min(100, O / g.width * 100));
      Ee.seek(J);
    }
    return (z, g) => (o(), s("div", {
      class: L(["bili-tape-deck", {
        "is-playing": n(H).playing,
        "is-drag-over": N.value,
        "is-inserting": M.value,
        "dock-side-mode": b.dockSide,
        "dock-side-collapsed": b.dockSide && h.value
      }]),
      style: De(b.dockSide && !h.value ? { maxWidth: `${Y.value}px` } : void 0),
      onDragenter: Ce,
      onDragover: ae,
      onDragleave: xe,
      onDrop: v
    }, [
      b.dockSide && h.value ? (o(), s("div", {
        key: 0,
        class: "tape-collapsed-capsule",
        title: `电台：${n(H).title || "哔哩哔哩电台"}`
      }, [
        e("div", {
          class: L(["tape-capsule-spool", { spinning: n(H).playing }])
        }, [...g[9] || (g[9] = [
          e("div", { class: "spool-center-dot" }, null, -1)
        ])], 2),
        e("div", kn, [
          e("strong", $n, l(n(H).title || "B站电台"), 1),
          e("small", wn, l(n(H).playing ? "♪ 播放中" : "已暂停"), 1)
        ]),
        e("button", {
          type: "button",
          class: "tape-capsule-play-btn",
          title: n(H).playing ? "暂停" : "播放",
          onClick: g[0] || (g[0] = S((O) => n(Ee).togglePlay(), ["stop"]))
        }, l(n(H).playing ? "⏸" : "▶"), 9, Cn),
        e("button", {
          type: "button",
          class: "tape-capsule-expand-btn",
          title: "展开完整磁带播放条",
          onClick: g[1] || (g[1] = S((O) => h.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, _n)) : k("", !0),
      le(e("div", xn, [...g[10] || (g[10] = [
        et('<div class="slot-visual-frame" data-v-b16560a2><span class="slot-icon-tape" data-v-b16560a2>📼</span><div class="slot-text-col" data-v-b16560a2><strong class="slot-headline" data-v-b16560a2>释放鼠标装填卡带</strong><small class="slot-subline" data-v-b16560a2>拖入视频封面 · 立即播放音乐</small></div></div>', 1)
      ])], 512), [
        [lt, N.value]
      ]),
      M.value ? (o(), s("div", Sn, [
        g[11] || (g[11] = e("span", { class: "tape-click-sound" }, "✓ 已装填", -1)),
        e("span", Tn, "《" + l(r.value) + "》", 1)
      ])) : k("", !0),
      le(e("div", Dn, [
        e("div", {
          class: "tape-cassette-wrap",
          role: "button",
          tabindex: "0",
          title: `点击选择电台系列 (已建 ${n(B).radioSeries.length} 个系列 · 也可直接拖拽视频封面至此装填)`,
          onClick: A,
          onKeydown: Re(S(A, ["prevent"]), ["enter", "space"])
        }, [
          e("div", Pn, [
            g[14] || (g[14] = e("div", { class: "tape-spool tape-spool-left" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1)),
            e("div", zn, [
              e("div", Bn, [
                n(H).coverUrl ? (o(), s("div", {
                  key: 0,
                  class: "tape-cover-sticker",
                  title: n(H).title
                }, [
                  e("img", {
                    src: n(H).coverUrl,
                    alt: "Cover",
                    referrerpolicy: "no-referrer"
                  }, null, 8, Rn)
                ], 8, In)) : k("", !0),
                e("div", Ln, [
                  g[12] || (g[12] = e("span", { class: "side-letter" }, "A", -1)),
                  e("span", En, l(n(H).seriesName || "CASSETTE"), 1)
                ])
              ]),
              g[13] || (g[13] = e("div", { class: "tape-acrylic-window" }, [
                e("div", { class: "tape-ribbon-bar" }),
                e("div", { class: "tape-scale-marks" }, [
                  e("span", null, "100"),
                  e("span", null, "50"),
                  e("span", null, "0")
                ])
              ], -1))
            ]),
            g[15] || (g[15] = e("div", { class: "tape-spool tape-spool-right" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1))
          ]),
          _.value ? (o(), s("div", {
            key: 0,
            class: "tape-series-popover",
            onClick: g[3] || (g[3] = S(() => {
            }, ["stop"]))
          }, [
            e("div", An, [
              e("div", Vn, [
                g[16] || (g[16] = e("span", { class: "tape-series-icon" }, "📻", -1)),
                g[17] || (g[17] = e("span", { class: "tape-series-title" }, "自建电台系列", -1)),
                e("span", Un, l(n(B).radioSeries.length), 1)
              ]),
              e("button", {
                type: "button",
                class: "tape-series-close-btn",
                title: "关闭",
                "aria-label": "关闭",
                onClick: g[2] || (g[2] = S((O) => _.value = !1, ["stop"]))
              }, " ✕ ")
            ]),
            e("div", Fn, [
              (o(!0), s(F, null, W(n(B).radioSeries, (O) => (o(), s("div", {
                key: O.id,
                class: L(["tape-series-item", { "is-active": n(H).seriesName === O.name }]),
                onClick: S((J) => P(O.id), ["stop"])
              }, [
                e("div", qn, [
                  g[18] || (g[18] = e("span", { class: "tape-series-item-bullet" }, "📼", -1)),
                  e("div", Gn, [
                    e("span", {
                      class: "tape-series-item-name",
                      title: O.name
                    }, l(O.name), 9, On),
                    e("span", Hn, l(O.count) + " 首曲目 · 顺序连播", 1)
                  ])
                ]),
                n(H).seriesName === O.name && n(H).playing ? (o(), s("span", jn, " 播放中 ")) : (o(), s("span", Wn, " ▶ "))
              ], 10, Nn))), 128)),
              n(B).radioSeries.length ? k("", !0) : (o(), s("div", Yn, [...g[19] || (g[19] = [
                e("span", { class: "empty-icon" }, "📂", -1),
                e("span", { class: "empty-text" }, "暂无保存的电台系列", -1),
                e("span", { class: "empty-tip" }, "可在 B站工作区 → 电台 中添加曲目并保存为系列", -1)
              ])]))
            ])
          ])) : k("", !0)
        ], 40, Mn),
        e("div", Kn, [
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "上一首",
            "aria-label": "上一首",
            onClick: g[4] || (g[4] = (O) => n(Ee).prev())
          }, [...g[20] || (g[20] = [
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
            onClick: g[5] || (g[5] = (O) => n(Ee).togglePlay())
          }, [
            n(H).playing ? (o(), s("svg", Qn, [...g[21] || (g[21] = [
              e("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" }, null, -1)
            ])])) : (o(), s("svg", Jn, [...g[22] || (g[22] = [
              e("path", { d: "M8 5v14l11-7z" }, null, -1)
            ])]))
          ], 10, Xn),
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "下一首",
            "aria-label": "下一首",
            onClick: g[6] || (g[6] = (O) => n(Ee).next())
          }, [...g[23] || (g[23] = [
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
        e("div", Zn, [
          e("div", el, [
            e("span", tl, l(n(H).formattedCurrent) + " / " + l(n(H).formattedDuration), 1),
            e("div", il, [
              e("span", {
                class: "tape-lyric-text",
                title: n(H).lyric
              }, l(n(H).lyric || "♪ 纯音乐 / 伴奏"), 9, ol)
            ]),
            e("button", {
              type: "button",
              class: "tape-mode-btn",
              title: j.value,
              "aria-label": j.value,
              onClick: g[7] || (g[7] = (O) => n(Ee).toggleMode())
            }, [
              n(H).mode === "order" ? (o(), s("svg", nl, [...g[24] || (g[24] = [
                e("polyline", { points: "17 1 21 5 17 9" }, null, -1),
                e("path", { d: "M3 11V9a4 4 0 0 1 4-4h14" }, null, -1),
                e("polyline", { points: "7 23 3 19 7 15" }, null, -1),
                e("path", { d: "M21 13v2a4 4 0 0 1-4 4H3" }, null, -1)
              ])])) : n(H).mode === "one" ? (o(), s("svg", ll, [...g[25] || (g[25] = [
                et('<polyline points="17 1 21 5 17 9" data-v-b16560a2></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14" data-v-b16560a2></path><polyline points="7 23 3 19 7 15" data-v-b16560a2></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3" data-v-b16560a2></path><text x="12" y="14.5" font-size="7.5" font-weight="900" font-family="system-ui, -apple-system, sans-serif" fill="currentColor" stroke="none" text-anchor="middle" data-v-b16560a2>1</text>', 5)
              ])])) : n(H).mode === "shuffle" ? (o(), s("svg", al, [...g[26] || (g[26] = [
                et('<polyline points="16 3 21 3 21 8" data-v-b16560a2></polyline><line x1="4" y1="20" x2="21" y2="3" data-v-b16560a2></line><polyline points="21 16 21 21 16 21" data-v-b16560a2></polyline><line x1="15" y1="15" x2="21" y2="21" data-v-b16560a2></line><line x1="4" y1="4" x2="9" y2="9" data-v-b16560a2></line>', 5)
              ])])) : k("", !0)
            ], 8, sl)
          ]),
          e("div", {
            ref_key: "progressLineRef",
            ref: T,
            class: "tape-progress-rail",
            role: "slider",
            "aria-valuenow": n(H).progressPercent,
            "aria-valuemin": "0",
            "aria-valuemax": "100",
            "aria-label": "电台播放进度",
            onPointerdown: se,
            onPointermove: ee,
            onPointerup: Q,
            onPointercancel: Q
          }, [
            e("div", {
              class: "tape-progress-fill",
              style: De({ width: `${n(H).progressPercent}%` })
            }, null, 4),
            e("div", {
              class: "tape-progress-handle",
              style: De({ left: `${n(H).progressPercent}%` })
            }, null, 4)
          ], 40, rl),
          e("div", dl, [
            (o(), s("svg", ul, [
              (o(), s(F, null, W(D, (O, J) => e("rect", {
                key: J,
                class: "wave-bar",
                x: J * 4,
                y: 16 - O * 0.7,
                width: "1.8",
                height: O * 0.7,
                rx: "0.9",
                style: De({ animationDelay: `${J % 8 * 0.12}s` })
              }, null, 12, cl)), 64))
            ]))
          ])
        ]),
        b.dockSide ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "tape-dock-collapse-btn",
          title: "收起至左下角小胶囊",
          "aria-label": "收起磁带机",
          onClick: g[8] || (g[8] = S((O) => h.value = !0, ["stop"]))
        }, [...g[27] || (g[27] = [
          e("svg", {
            viewBox: "0 0 24 24",
            width: "11",
            height: "11",
            fill: "currentColor"
          }, [
            e("path", { d: "M19 13H5v-2h14v2z" })
          ], -1)
        ])])) : k("", !0)
      ], 512), [
        [lt, !b.dockSide || !h.value]
      ])
    ], 38));
  }
}), bt = /* @__PURE__ */ ze(pl, [["__scopeId", "data-v-b16560a2"]]), bl = ["title"], vl = {
  key: 2,
  class: "hero-lyric-body"
}, fl = { class: "hero-lyric-stage" }, gl = ["title"], ml = /* @__PURE__ */ Me({
  __name: "BiliVideoLyricDockBar",
  props: {
    inlineHero: { type: Boolean, default: !1 }
  },
  setup(pe) {
    const b = x(340), D = x(!1), f = x(!1), T = x(null);
    function N(A) {
      const P = document.querySelector(".bili-mini-screen video, .bili-sub-screen video");
      P && (P.currentTime = Math.max(0, P.currentTime + A));
    }
    let M = 0, r = 0, h = "right";
    function _(A, P) {
      P.preventDefault(), P.stopPropagation(), D.value = !0, h = A, M = P.clientX, r = b.value;
      const U = (j) => {
        if (!D.value) return;
        const Y = j.clientX - M, be = h === "right" ? r + Y : r - Y, X = Math.max(180, Math.min(720, be));
        b.value = X;
      }, R = () => {
        D.value = !1, window.removeEventListener("pointermove", U), window.removeEventListener("pointerup", R), window.removeEventListener("pointercancel", R);
        try {
          localStorage.setItem("bili_hero_lyric_width", String(b.value));
        } catch {
        }
      };
      window.addEventListener("pointermove", U), window.addEventListener("pointerup", R), window.addEventListener("pointercancel", R);
    }
    return He(() => {
      try {
        const A = localStorage.getItem("bili_hero_lyric_width");
        if (A) {
          const P = parseInt(A, 10);
          Number.isFinite(P) && P >= 180 && P <= 720 && (b.value = P);
        }
      } catch {
      }
    }), (A, P) => (o(), s("aside", {
      ref_key: "barRef",
      ref: T,
      class: L(["bili-hero-lyric-bar", { "is-collapsed": f.value, "is-resizing": D.value }]),
      style: De(f.value ? void 0 : { width: `${b.value}px` }),
      "aria-label": "视频实时字幕与控制"
    }, [
      f.value ? k("", !0) : (o(), s("div", {
        key: 0,
        class: "lyric-resize-handle handle-left",
        title: "按住向左拉伸宽度",
        onPointerdown: P[0] || (P[0] = (U) => _("left", U))
      }, [...P[7] || (P[7] = [
        e("span", { class: "resize-line" }, null, -1)
      ])], 32)),
      f.value ? (o(), s("div", {
        key: 1,
        class: "hero-lyric-capsule",
        title: `视频台词：${n(B).organizer.heroLyricText || "暂无字幕"} (点击展开)`,
        onClick: P[2] || (P[2] = (U) => f.value = !1)
      }, [
        P[8] || (P[8] = e("span", { class: "capsule-icon" }, "💬", -1)),
        P[9] || (P[9] = e("span", { class: "capsule-text" }, "台词", -1)),
        e("button", {
          type: "button",
          class: "capsule-expand-btn",
          title: "展开台词栏",
          onClick: P[1] || (P[1] = S((U) => f.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, bl)) : (o(), s("div", vl, [
        e("div", fl, [
          e("button", {
            type: "button",
            class: "hero-lyric-seek-btn",
            title: "当前视频后退 5 秒",
            "aria-label": "后退 5 秒",
            onClick: P[3] || (P[3] = (U) => N(-5))
          }, " ‹ "),
          e("strong", {
            class: "hero-lyric-current-text",
            title: n(B).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"
          }, l(n(B).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"), 9, gl),
          e("button", {
            type: "button",
            class: "hero-lyric-seek-btn",
            title: "当前视频前进 5 秒",
            "aria-label": "前进 5 秒",
            onClick: P[4] || (P[4] = (U) => N(5))
          }, " › ")
        ]),
        e("button", {
          type: "button",
          class: "hero-lyric-collapse-btn",
          title: "收起台词栏",
          "aria-label": "收起台词栏",
          onClick: P[5] || (P[5] = S((U) => f.value = !0, ["stop"]))
        }, [...P[10] || (P[10] = [
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
      f.value ? k("", !0) : (o(), s("div", {
        key: 3,
        class: "lyric-resize-handle handle-right",
        title: "按住向右拉伸宽度",
        onPointerdown: P[6] || (P[6] = (U) => _("right", U))
      }, [...P[11] || (P[11] = [
        e("span", { class: "resize-line" }, null, -1)
      ])], 32))
    ], 6));
  }
}), hl = /* @__PURE__ */ ze(ml, [["__scopeId", "data-v-d0857a88"]]), yl = { class: "card-head bili-header-unified-row" }, _l = { class: "bili-header-left" }, kl = { class: "bili-header-right" }, $l = ["title"], wl = { class: "bili-header-msg-label" }, Cl = ["placeholder", "aria-label"], xl = ["title"], Sl = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, Tl = { class: "card-fullscreen-bili-suggest-head" }, Dl = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, Ml = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, Pl = ["onClick", "onContextmenu"], zl = { class: "card-fullscreen-bili-thumb" }, Bl = ["src"], Il = { key: 0 }, Rl = { class: "card-fullscreen-bili-video-copy" }, Ll = ["title"], El = {
  class: "fm-pane",
  id: "pane-organizer"
}, Al = { id: "fo-body" }, Vl = { class: "fo-bili-sidebar" }, Ul = ["title"], Fl = { class: "fo-sidebar-toggle-title" }, Nl = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, ql = ["aria-expanded", "title"], Gl = { class: "fo-sidebar-toggle-chevron" }, Ol = { class: "fo-sidebar-features-wrap" }, Hl = { class: "fo-sidebar-sub-wrap" }, jl = ["title"], Wl = { class: "fo-sidebar-sub-main" }, Yl = { class: "fo-sidebar-sub-text" }, Kl = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Xl = ["title"], Ql = { class: "fo-sidebar-sub-main" }, Jl = { class: "fo-sidebar-sub-text" }, Zl = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, ea = ["title"], ta = { class: "fo-sidebar-sub-main" }, ia = { class: "fo-sidebar-sub-text" }, oa = { class: "fo-sidebar-sub-wrap fo-sidebar-recommend-wrap" }, sa = ["title"], na = { class: "fo-sidebar-sub-main" }, la = { class: "fo-sidebar-sub-text" }, aa = { class: "fo-sidebar-sub-wrap fo-sidebar-radio-wrap" }, ra = ["title"], da = { class: "fo-sidebar-sub-main" }, ua = { class: "fo-sidebar-sub-text" }, ca = { class: "fo-sidebar-sub-wrap fo-sidebar-history-wrap" }, pa = ["title"], ba = { class: "fo-sidebar-sub-main" }, va = { class: "fo-sidebar-sub-text" }, fa = { class: "fo-sidebar-favorite-hub" }, ga = { class: "fo-sidebar-sub-main" }, ma = { class: "fo-sidebar-sub-text" }, ha = ["title", "aria-label"], ya = {
  key: 0,
  class: "fo-move-target-banner"
}, _a = {
  class: "fo-bili-folder-list",
  "aria-label": "B站收藏夹"
}, ka = {
  key: 0,
  class: "fo-bili-section-divider"
}, $a = ["onDragover", "onDragleave", "onDrop"], wa = { class: "fo-bili-section-title" }, Ca = ["data-folder-id", "data-folder-kind", "draggable", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], xa = ["aria-expanded", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], Sa = {
  class: "fo-group-caret",
  "aria-hidden": "true"
}, Ta = {
  key: 0,
  class: "muted small"
}, Da = {
  key: 0,
  id: "fo-vue-main",
  class: "fo-bili-main"
}, Ma = {
  key: 0,
  class: "fo-bili-loading"
}, Pa = {
  key: 1,
  class: "fo-bili-empty fo-bili-login-guide"
}, za = { class: "fo-bili-login-card" }, Ba = { class: "fo-bili-login-actions" }, Ia = {
  key: 2,
  class: "fo-bili-empty"
}, Ra = { class: "fo-bili-hero fo-hero-persistent" }, La = { class: "fo-hero-left" }, Ea = ["src"], Aa = {
  key: 1,
  class: "fo-folder-icon"
}, Va = { class: "fo-hero-folder-info" }, Ua = { class: "fo-bili-actions" }, Fa = ["disabled"], Na = ["title"], qa = { class: "fo-bili-toolbar" }, Ga = {
  key: 0,
  class: "fo-bili-sort"
}, Oa = ["onClick"], Ha = {
  class: "fo-mini-dock-anchor",
  "aria-label": "视频标签页"
}, ja = ["title"], Wa = { class: "fo-video-tab-title" }, Ya = { class: "fo-video-tab-actions" }, Ka = ["title"], Xa = {
  key: 2,
  class: "fo-bili-batch-actions"
}, Qa = { class: "fo-batch-count" }, Ja = { class: "fo-bili-grid" }, Za = {
  key: 0,
  class: "fo-bili-empty"
}, er = ["data-batch-id", "onDragstart", "onContextmenu"], tr = { class: "fo-bili-thumb" }, ir = {
  key: 0,
  class: "fo-batch-check",
  title: "选择此视频"
}, or = ["checked", "onChange"], sr = ["href", "onClick"], nr = ["src"], lr = { class: "fo-bili-count" }, ar = { class: "fo-bili-duration" }, rr = { class: "fo-bili-title-row" }, dr = ["href", "onClick"], ur = ["aria-expanded", "onClick"], cr = {
  key: 0,
  class: "fo-card-menu"
}, pr = ["onClick"], br = ["onClick"], vr = ["onClick"], fr = { class: "fo-bili-meta" }, gr = ["onClick"], mr = {
  key: 0,
  class: "fo-pager"
}, hr = ["disabled"], yr = { class: "fo-page-num" }, _r = ["disabled"], kr = {
  key: 1,
  id: "fo-vue-cache-main",
  class: "fo-bili-main"
}, $r = { class: "fo-bili-hero fo-hero-persistent fo-cached-hero" }, wr = { class: "fo-hero-left" }, Cr = { class: "fo-hero-folder-info" }, xr = { class: "fo-bili-actions" }, Sr = {
  key: 0,
  class: "fo-bili-loading"
}, Tr = {
  key: 1,
  class: "fo-bili-grid fo-cached-video-grid"
}, Dr = {
  key: 0,
  class: "fo-bili-empty"
}, Mr = { class: "fo-bili-thumb" }, Pr = ["onClick"], zr = ["src"], Br = { class: "fo-bili-title-row" }, Ir = ["onClick"], Rr = ["onClick"], Lr = { class: "fo-bili-meta" }, Er = {
  key: 2,
  id: "fo-vue-recommend-main",
  class: "fo-bili-main"
}, Ar = { class: "fo-bili-hero" }, Vr = { class: "fo-bili-heading" }, Ur = { class: "fo-feed-hero-title" }, Fr = { class: "fo-feed-badge" }, Nr = { class: "fo-bili-actions" }, qr = ["disabled"], Gr = { class: "fo-bili-toolbar" }, Or = { class: "fo-feed-count-tag" }, Hr = {
  key: 0,
  class: "fo-bili-loading"
}, jr = {
  key: 1,
  class: "fo-bili-empty"
}, Wr = {
  key: 2,
  class: "fo-bili-grid"
}, Yr = {
  key: 0,
  class: "fo-bili-empty"
}, Kr = ["onDragstart"], Xr = { class: "fo-bili-thumb" }, Qr = ["href", "onClick"], Jr = ["src"], Zr = { class: "fo-bili-count" }, ed = { class: "fo-bili-duration" }, td = { class: "fo-bili-title-row" }, id = ["href", "onClick"], od = ["aria-expanded", "onClick"], sd = {
  key: 0,
  class: "fo-card-menu"
}, nd = ["onClick"], ld = ["onClick"], ad = ["onClick"], rd = ["onClick"], dd = ["onClick"], ud = { class: "fo-bili-meta" }, cd = ["onClick"], pd = {
  key: 3,
  id: "fo-vue-following-main",
  class: "fo-bili-main"
}, bd = { class: "fo-bili-hero" }, vd = { class: "fo-bili-heading" }, fd = { class: "fo-feed-hero-title" }, gd = { class: "fo-feed-badge" }, md = { class: "fo-bili-actions" }, hd = ["disabled"], yd = { class: "fo-up-groups-bar" }, _d = { class: "fo-up-groups-list" }, kd = ["onClick"], $d = { class: "count" }, wd = { class: "fo-up-groups-actions" }, Cd = {
  key: 0,
  class: "fo-up-members-strip"
}, xd = { class: "fo-up-members-label" }, Sd = { class: "fo-up-members-list" }, Td = ["title", "onClick", "onContextmenu"], Dd = ["src"], Md = { class: "fo-bili-toolbar" }, Pd = { class: "fo-feed-count-tag" }, zd = {
  key: 1,
  class: "fo-bili-loading"
}, Bd = {
  key: 2,
  class: "fo-bili-empty"
}, Id = {
  key: 3,
  class: "fo-bili-grid"
}, Rd = {
  key: 0,
  class: "fo-bili-empty"
}, Ld = ["onDragstart"], Ed = { class: "fo-bili-thumb" }, Ad = ["href", "onClick"], Vd = ["src"], Ud = { class: "fo-bili-count" }, Fd = { class: "fo-bili-duration" }, Nd = { class: "fo-bili-title-row" }, qd = ["href", "onClick"], Gd = ["aria-expanded", "onClick"], Od = {
  key: 0,
  class: "fo-card-menu"
}, Hd = ["onClick"], jd = ["onClick"], Wd = ["onClick"], Yd = ["onClick"], Kd = { class: "fo-bili-meta" }, Xd = ["onClick"], Qd = { class: "fo-pager" }, Jd = ["disabled"], Zd = { class: "fo-page-num" }, eu = ["disabled"], tu = {
  key: 4,
  id: "fo-vue-subscription-main",
  class: "fo-bili-main fo-vue-subscription-main"
}, iu = { class: "bili-sub-vue-shell" }, ou = {
  key: 0,
  class: "fo-bili-loading"
}, su = {
  key: 1,
  class: "fo-bili-empty"
}, nu = {
  key: 2,
  class: "bili-sub-layout bili-sub-vue-layout"
}, lu = {
  key: 5,
  id: "fo-vue-radio-main",
  class: "fo-bili-main fo-vue-radio-main"
}, au = { class: "fo-bili-hero fo-radio-hero" }, ru = { class: "fo-bili-actions" }, du = { class: "bili-radio-layout fo-vue-radio-layout" }, uu = { class: "bili-radio-folders" }, cu = { id: "bili-radio-folders" }, pu = ["onClick"], bu = {
  key: 0,
  class: "muted small"
}, vu = { class: "bili-radio-library" }, fu = {
  key: 0,
  role: "alert",
  class: "muted small"
}, gu = {
  id: "bili-radio-videos",
  class: "bili-radio-videos"
}, mu = ["title", "onDragstart", "onClick"], hu = ["src"], yu = { key: 1 }, _u = {
  key: 0,
  class: "muted small"
}, ku = { class: "bili-radio-editor" }, $u = { class: "bili-radio-name-row" }, wu = ["placeholder", "onKeydown"], Cu = { class: "bili-radio-btn-group" }, xu = { class: "bili-radio-series-dropdown-wrap" }, Su = {
  value: "",
  disabled: "",
  selected: ""
}, Tu = ["value"], Du = {
  id: "bili-radio-queue",
  class: "bili-radio-queue",
  "aria-label": "电台播放队列"
}, Mu = ["onClick"], Pu = { class: "bili-radio-queue-no" }, zu = ["src"], Bu = { key: 1 }, Iu = ["aria-label", "onClick"], Ru = {
  key: 0,
  class: "muted small"
}, Lu = { class: "bili-radio-actions" }, Eu = ["disabled"], Au = ["disabled"], Vu = ["title"], Uu = {
  key: 2,
  class: "fo-context-divider"
}, Fu = /* @__PURE__ */ Me({
  __name: "BilibiliWorkspace",
  setup(pe) {
    const b = x(!1);
    function D() {
      const a = B.radioSeriesName?.trim();
      if (!a) {
        b.value = !0;
        const t = document.getElementById("bili-radio-name");
        t && t.focus(), Ye.fetch(I("bili.radioAppName"), I("bili.radioNameEmpty"));
        return;
      }
      b.value = !1, v("radio-save", { name: a });
    }
    async function f() {
      const a = document.getElementById("bili-radio-name");
      a && (a.focus(), a.select(), Ye.fetch(I("bili.radioAppName"), I("bili.radioInputFocused")));
    }
    function T(a) {
      const t = a.target, i = t.value;
      if (i) {
        if (i === "__create_new__") {
          v("radio-clear"), B.radioSeriesName = "", Ye.fetch("哔哩哔哩电台", "已开启新系列创作，请从左侧添加视频"), t.value = "";
          return;
        }
        v("radio-load-series", i);
      }
    }
    function N(a, t) {
      !t.mid && !t.name || Ae.showUpRecentVideosPreview(
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
      Pt.togglePanel();
    }
    const r = oe(() => B.organizer), h = x(!1), { active: _ } = xt("daily-bilibili", "/bilibili.html");
    ce(() => _.value && r.value.mode === "recommendations", (a) => {
      Ae.setRecommendationsActive(a);
    }, { immediate: !0, flush: "sync" }), ce(() => _.value && r.value.mode === "following", (a) => {
      Ae.setFollowingActive(a);
    }, { immediate: !0, flush: "sync" }), ce(() => _.value && r.value.mode === "subscription", (a) => {
      Ae.setSubscriptionActive(a);
    }, { immediate: !0, flush: "sync" }), ce(() => _.value && r.value.mode === "cache", (a) => {
      a || (h.value = !1);
    });
    const A = x(r.value.query), P = x(!1), U = x(!1), R = x(""), j = x({ visible: !1, x: 0, y: 0, video: null, folder: null }), { menuRef: Y, style: be } = Bt({
      visible: () => j.value.visible,
      anchor: () => j.value,
      dismiss: () => {
        j.value.visible = !1;
      }
    }), X = x(
      typeof localStorage < "u" && localStorage.getItem("bili_sidebar_features_collapsed") === "true"
    );
    function ye() {
      X.value = !X.value;
      try {
        localStorage.setItem("bili_sidebar_features_collapsed", String(X.value));
      } catch {
      }
    }
    function Ce() {
      we.bvid && Ct.open({
        bvid: we.bvid,
        cid: we.cid,
        title: we.title
      });
    }
    function ae() {
      we.collapsed && Ke.toggleCollapse(), Ke.bringToFront();
    }
    function xe() {
      Ke.close();
    }
    ce(() => r.value.query, (a) => {
      A.value = a;
    }), ce(A, (a) => {
      (!a || !a.trim()) && r.value.query && v("organizer-search", "");
    });
    function v(a, t) {
      Ve.dispatch(a, t);
    }
    function se(a) {
      v(a.group ? "toggle-folder-group" : "select-folder", { id: a.id, kind: a.kind });
    }
    const ee = x(""), Q = x(""), ne = x("before"), z = x(!1);
    function g(a, t) {
      t.kind === "created" && (ee.value = t.id, a.dataTransfer?.setData("application/x-logicweaver-favorite-node", t.id), a.dataTransfer?.setData("text/plain", t.id), a.dataTransfer && (a.dataTransfer.effectAllowed = "move"));
    }
    function O(a, t) {
      if (t.kind !== "created" || !ee.value || ee.value === t.id) return;
      a.preventDefault(), a.dataTransfer && (a.dataTransfer.dropEffect = "move");
      const i = a.currentTarget;
      if (!i) return;
      const u = i.getBoundingClientRect(), V = (a.clientY - u.top) / Math.max(1, u.height), $e = t.group && V > 0.25 && V < 0.75 ? "into" : V >= 0.5 ? "after" : "before";
      Q.value = t.id, ne.value = $e;
    }
    function J(a, t) {
      const i = a.relatedTarget, u = a.currentTarget;
      u && i && u.contains(i) || Q.value === t.id && (Q.value = "");
    }
    function ve() {
      ee.value = "", Q.value = "", z.value = !1;
    }
    function _e(a, t) {
      a.preventDefault();
      const i = ee.value || a.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "", u = ne.value || (t.group ? "into" : "after");
      ve(), !(!i || i === t.id || t.kind !== "created") && v("move-folder-node", { sourceId: i, targetId: t.id, mode: u });
    }
    function $(a) {
      ee.value && (a.preventDefault(), a.dataTransfer && (a.dataTransfer.dropEffect = "move"), z.value = !0);
    }
    function d(a) {
      const t = a.relatedTarget, i = a.currentTarget;
      i && t && i.contains(t) || (z.value = !1);
    }
    function p(a) {
      a.preventDefault();
      const t = ee.value || a.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
      ve(), t && v("move-folder-node", { sourceId: t, targetId: "root", mode: "into" });
    }
    function E() {
      const a = A.value.trim();
      v("organizer-search", a);
    }
    function te() {
      !A.value.trim() && r.value.query && v("organizer-search", "");
    }
    const re = x(""), Se = x(!1), ke = x(!1), Pe = x("hot"), Be = x(""), Ue = oe(() => Pe.value === "live" ? I("bili.searchLiveTitle", { keyword: Be.value }) : I("bili.searchSuggestTitle")), Fe = oe(() => Pe.value === "live" ? I("bili.searchLiveSubtitle") : I("bili.searchSuggestSubtitle")), fe = x([]), Le = x(null), qe = x([]);
    let w = 0, y = null;
    function c(a) {
      if (!a) return null;
      const t = a.bvid || (String(a.param || "").startsWith("BV") ? a.param : "");
      if (!t && !a.aid && !a.id) return null;
      const i = String(a.pic || a.cover || "").replace(/^http:/, "https:"), u = i.startsWith("//") ? `https:${i}` : i, V = String(a.title || "").replace(/<[^>]+>/g, ""), $e = Number(a.duration || 0), _t = $e > 0 ? `${Math.floor($e / 60)}:${String($e % 60).padStart(2, "0")}` : String(a.duration || ""), Ze = a.stat?.view || a.play || 0, kt = Number(Ze) >= 1e4 ? `${(Number(Ze) / 1e4).toFixed(1)}万` : String(Number(Ze || 0)), $t = a.owner?.name || a.name || a.author || I("bili.upDefault");
      return {
        bvid: t,
        aid: String(a.aid || a.id || ""),
        title: V,
        cover: u,
        durationText: _t,
        playText: kt,
        upper: $t
      };
    }
    async function C() {
      if (Pe.value = "hot", Se.value = !0, qe.value.length && Date.now() - w < 9e4) {
        fe.value = qe.value;
        return;
      }
      ke.value = !0;
      try {
        const t = await (await fetch("https://api.bilibili.com/x/web-interface/index/top/feed/rcmd?ps=8&fresh_idx=1", { credentials: "include" })).json();
        let i = Array.isArray(t.data?.item) ? t.data.item : [];
        if (!i.length) {
          const $e = await (await fetch("https://api.bilibili.com/x/web-interface/popular?ps=8&pn=1", { credentials: "include" })).json();
          i = Array.isArray($e.data?.list) ? $e.data.list : [];
        }
        const u = i.map(c).filter(Boolean);
        qe.value = u, w = Date.now(), re.value.trim() || (fe.value = u);
      } catch {
        fe.value = [];
      } finally {
        ke.value = !1;
      }
    }
    function G() {
      re.value.trim() ? K(re.value.trim()) : C();
    }
    function q() {
      const a = re.value.trim();
      if (clearTimeout(y), !a) {
        C();
        return;
      }
      y = setTimeout(() => {
        K(a);
      }, 320);
    }
    async function K(a) {
      Se.value = !0, Pe.value = "live", Be.value = a, ke.value = !0;
      try {
        let t = null;
        if (window.LogicWeaverBiliSearchActions?.search)
          try {
            t = await window.LogicWeaverBiliSearchActions.search(a);
          } catch {
          }
        if (!t || t.code !== 0) {
          const u = `search_type=video&keyword=${encodeURIComponent(a)}&page=1&page_size=12`;
          t = await (await fetch(`https://api.bilibili.com/x/web-interface/search/type?${u}`, { credentials: "include" })).json();
        }
        if (re.value.trim() !== a) return;
        const i = Array.isArray(t?.data?.result) ? t.data.result : [];
        fe.value = i.slice(0, 10).map(c).filter(Boolean);
      } catch {
        fe.value = [];
      } finally {
        ke.value = !1;
      }
    }
    function ie(a) {
      Se.value = !1;
      const t = a.bvid || (String(a.param || a.id || "").startsWith("BV") ? a.param || a.id : "");
      t || a.aid ? Ke.openVideo({
        bvid: t,
        aid: a.aid,
        title: a.title,
        cover: a.cover,
        author: a.upper
      }) : window.LogicWeaverBiliSearchActions?.local ? window.LogicWeaverBiliSearchActions.local(a) : window.open(`https://www.bilibili.com/video/${t || a.bvid || a.id}`, "_blank");
    }
    function Z(a, t) {
      We(a, {
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
    function je() {
      const a = re.value.trim();
      if (Se.value = !1, !a) {
        C();
        return;
      }
      window.open(`https://search.bilibili.com/video?keyword=${encodeURIComponent(a)}`, "_blank");
    }
    function Ge(a) {
      Le.value && !Le.value.contains(a.target) && (Se.value = !1);
    }
    function Oe(a) {
      j.value.visible = !1, R.value = R.value === a ? "" : a;
    }
    function We(a, t, i = !0) {
      R.value = "", j.value = {
        visible: !0,
        x: a.clientX,
        y: a.clientY,
        video: t,
        folder: i && B.activeFolderId ? { id: String(B.activeFolderId), title: r.value.folderTitle } : null
      };
    }
    function ge(a) {
      if (a instanceof KeyboardEvent) {
        a.key === "Escape" && (R.value = "", j.value.visible = !1, r.value.isTargetPickMode && v("organizer-cancel-move-target"));
        return;
      }
      const t = a.target;
      t?.closest(".fo-card-menu, .fo-card-more") || (R.value = ""), t?.closest(".fo-context-menu") || (j.value.visible = !1);
    }
    const Ne = typeof document < "u" && document.body.classList.contains("bili-standalone-body");
    function at() {
      !U.value || P.value || r.value.loading || (P.value = !0, v("organizer-open"));
    }
    ce(() => r.value.loading, (a) => {
      !a && !r.value.folders.length && at();
    }), He(() => {
      import("./bilibili-channel.service-BvjUXrQF.js").catch((a) => console.error("[Bilibili] 频道动作服务加载失败", a)), U.value = !0, Ve.loadOrganizer(), at(), document.addEventListener("pointerdown", ge, !0), document.addEventListener("pointerdown", Ge), window.addEventListener("keydown", ge), window.setBiliMiniDockVisible?.(!0), requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }), ce(() => [r.value.videos, r.value.mode], () => {
      requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }, { flush: "post" }), ft(() => {
      Ae.setRecommendationsActive(!1), Ae.setFollowingActive(!1), Ae.setSubscriptionActive(!1), U.value = !1, document.removeEventListener("pointerdown", ge, !0), document.removeEventListener("pointerdown", Ge), window.removeEventListener("keydown", ge);
    });
    function Qe(a, t) {
      R.value = "", j.value.visible = !1;
      const i = String(typeof a == "object" ? a.id || a.bvid || a.aid || "" : a), u = typeof a == "object" ? a : r.value.videos.find((V) => String(V.id) === i);
      v("organizer-video-action", { id: i, video: u, action: t });
    }
    async function Ie(a) {
      const { video: t, folder: i } = j.value;
      if (j.value.visible = !1, a === "share-chat") {
        if (!t) return;
        try {
          const { chatService: u } = await import("./view-styles-R9fBeR9a.js").then(($e) => $e.aG), { windowManagerController: V } = await import("./window-manager.store-BdI_8a-H.js").then(($e) => $e.n);
          u.sendBiliShare({
            bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
            aid: t.aid,
            title: t.title,
            cover: t.cover,
            upName: t.author,
            upMid: t.authorMid,
            upFace: t.authorFace,
            play: t.playCount
          }), V.open("chat");
        } catch (u) {
          console.warn("分享到聊天室失败", u);
        }
        return;
      }
      t && v("organizer-video-action", { id: t.id || "", video: t, action: a });
    }
    function gt(a) {
      const t = B.radioSeriesName?.trim();
      let i = B.radioSeries.find((u) => u.name === t);
      if (!i && B.radioQueue.length && (i = {
        id: `series_${Date.now()}`,
        name: t || "未命名电台系列",
        count: B.radioQueue.length,
        items: B.radioQueue
      }), !i || !i.items?.length) {
        Ye.fetch("哔哩哔哩电台", "当前没有可分享的系列曲目，请先添加曲目");
        return;
      }
      ct.sendBiliSeriesShare(i, a);
    }
    function mt(a) {
      const { video: t } = j.value;
      j.value.visible = !1, t && ct.sendBiliShare({
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
    function ht(a) {
      if (!r.value.isTargetPickMode) return;
      if (!a.target?.closest(".fo-bili-folder-list")) {
        const i = document.querySelector(".fo-bili-folder-list");
        i && (a.preventDefault(), i.scrollTop += a.deltaY);
      }
    }
    function rt(a) {
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
    function Je(a, t) {
      if (!a.dataTransfer) return;
      a.dataTransfer.effectAllowed = "copyMove", a.dataTransfer.setData("text/uri-list", t.url), a.dataTransfer.setData("text/plain", t.url), a.dataTransfer.setData("application/x-logicweaver-video-url", t.url), a.dataTransfer.setData("application/x-logicweaver-task", JSON.stringify({ type: "material", title: t.title, url: t.url, source: "B站收藏" }));
      const i = t.bvid || t.url?.match(/video\/(BV[0-9a-zA-Z]+)/)?.[1] || t.id, u = JSON.stringify({
        type: "bili-cassette-tape",
        bvid: i,
        title: t.title,
        cover: t.cover,
        author: t.author,
        duration: t.duration
      });
      a.dataTransfer.setData("application/x-bili-cassette", u), a.dataTransfer.setData("application/json", u);
      const V = rt(t.title);
      a.dataTransfer.setDragImage(V, 72, 25), setTimeout(() => {
        V.parentNode && V.parentNode.removeChild(V);
      }, 0);
    }
    function yt(a, t) {
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
      const u = rt(t.title);
      a.dataTransfer.setDragImage(u, 72, 25), setTimeout(() => {
        u.parentNode && u.parentNode.removeChild(u);
      }, 0);
    }
    return (a, t) => (o(), s("section", {
      id: "daily-bilibili",
      class: L(["card wide", { "card-fullscreen": n(Ne) || n(ot).activeId === "daily-bilibili" }])
    }, [
      e("header", yl, [
        e("div", _l, [
          t[52] || (t[52] = e("span", {
            class: "bar",
            style: { background: "linear-gradient(180deg,#818cf8,#f472b6)" }
          }, null, -1)),
          e("h2", null, l(n(I)("bili.workspace.title")), 1)
        ]),
        e("div", kl, [
          e("button", {
            id: "bili-header-msg-center-btn",
            class: L(["fm-tab bili-header-msg-btn", { "is-active": n(zt).isOpen }]),
            type: "button",
            title: n(I)("bili.workspace.msgCenterTip"),
            onClick: M
          }, [
            t[53] || (t[53] = e("span", { class: "bili-header-msg-icon" }, "🔔", -1)),
            e("span", wl, l(n(I)("bili.workspace.msgBtn")), 1)
          ], 10, $l),
          e("div", {
            class: "card-fullscreen-bili-search",
            ref_key: "searchHostRef",
            ref: Le
          }, [
            e("form", {
              class: "card-fullscreen-bili-searchbar",
              role: "search",
              onSubmit: S(je, ["prevent"])
            }, [
              le(e("input", {
                "onUpdate:modelValue": t[0] || (t[0] = (i) => re.value = i),
                type: "search",
                autocomplete: "off",
                placeholder: n(I)("bili.workspace.searchPlaceholder"),
                "aria-label": n(I)("bili.workspace.searchAria"),
                onFocus: G,
                onInput: q
              }, null, 40, Cl), [
                [Te, re.value]
              ]),
              e("button", {
                type: "submit",
                title: n(I)("bili.workspace.searchBtnTip")
              }, "⌕", 8, xl)
            ], 32),
            Se.value ? (o(), s("div", Sl, [
              e("div", Tl, [
                e("span", null, l(Ue.value), 1),
                e("small", null, l(Fe.value), 1)
              ]),
              ke.value ? (o(), s("p", Dl, "正在获取推荐 / 搜索中…")) : !fe.value.length && !ke.value ? (o(), s("p", Ml, "没有找到相关视频，回车可在 B站 全网搜索")) : (o(!0), s(F, { key: 2 }, W(fe.value, (i) => (o(), s("button", {
                key: i.bvid || i.aid,
                type: "button",
                class: "card-fullscreen-bili-video-row",
                role: "option",
                onClick: (u) => ie(i),
                onContextmenu: S((u) => Z(u, i), ["prevent"])
              }, [
                e("span", zl, [
                  e("img", {
                    src: i.cover,
                    alt: "",
                    referrerpolicy: "no-referrer",
                    loading: "lazy"
                  }, null, 8, Bl),
                  i.durationText ? (o(), s("i", Il, l(i.durationText), 1)) : k("", !0)
                ]),
                e("span", Rl, [
                  e("strong", null, l(i.title), 1),
                  e("small", null, l(i.upper) + " · " + l(i.playText) + "播放", 1)
                ])
              ], 40, Pl))), 128))
            ])) : k("", !0)
          ], 512),
          e("button", {
            id: "bili-up-group-manager-top",
            class: "fm-tab bili-header-up-group-btn",
            type: "button",
            title: n(I)("bili.workspace.upGroupManagerTip"),
            onClick: t[1] || (t[1] = (i) => v("manage-up-groups"))
          }, l(n(I)("bili.workspace.upGroupManager")), 9, Ll)
        ])
      ]),
      e("div", El, [
        e("div", Al, [
          e("div", {
            class: L(["fo-bili-layout", { "fo-picking-move-target": r.value.isTargetPickMode }]),
            "data-vue-organizer-shell": "true",
            onWheel: ht
          }, [
            e("aside", Vl, [
              e("div", {
                class: L(["fo-sidebar-toggle-bar", { "is-collapsed": X.value }]),
                title: X.value ? n(I)("bili.channel.expandTip") : n(I)("bili.channel.collapseTip"),
                onClick: ye
              }, [
                e("div", Fl, [
                  t[54] || (t[54] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                  e("span", null, l(n(I)("bili.channel.title")), 1),
                  X.value ? (o(), s("span", Nl, "6")) : k("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "fo-sidebar-toggle-action",
                  "aria-expanded": !X.value,
                  title: X.value ? n(I)("bili.channel.expand") : n(I)("bili.channel.collapse")
                }, [
                  e("span", null, l(X.value ? n(I)("bili.channel.expand") : n(I)("bili.channel.collapse")), 1),
                  e("span", Gl, l(X.value ? "▾" : "▴"), 1)
                ], 8, ql)
              ], 10, Ul),
              le(e("div", Ol, [
                e("div", Hl, [
                  e("button", {
                    id: "fo-sidebar-sub-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "subscription" }]),
                    title: n(I)("bili.channel.subVideoTip"),
                    onClick: t[2] || (t[2] = (i) => v("open-sub-video"))
                  }, [
                    e("div", Wl, [
                      t[55] || (t[55] = e("span", { class: "fo-sidebar-sub-icon" }, "🎬", -1)),
                      e("div", Yl, [
                        e("strong", null, l(n(I)("bili.channel.subVideo")), 1),
                        e("small", null, l(n(I)("bili.channel.subVideoSub")), 1)
                      ])
                    ]),
                    t[56] || (t[56] = e("span", { class: "fo-sidebar-sub-badge" }, "NEW", -1))
                  ], 10, jl)
                ]),
                e("div", Kl, [
                  e("button", {
                    id: "fo-sidebar-cache-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "cache" }]),
                    title: n(I)("bili.channel.cacheVideoTip"),
                    onClick: t[3] || (t[3] = (i) => v("open-cache"))
                  }, [
                    e("div", Ql, [
                      t[57] || (t[57] = e("span", { class: "fo-sidebar-sub-icon" }, "💾", -1)),
                      e("div", Jl, [
                        e("strong", null, l(n(I)("bili.channel.cacheVideo")), 1),
                        e("small", null, l(n(I)("bili.channel.cacheVideoSub")), 1)
                      ])
                    ]),
                    t[58] || (t[58] = e("span", { class: "fo-sidebar-sub-badge" }, "LOCAL", -1))
                  ], 10, Xl)
                ]),
                e("div", Zl, [
                  e("button", {
                    id: "fo-sidebar-following-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "following" }]),
                    title: n(I)("bili.channel.followingTip"),
                    onClick: t[4] || (t[4] = (i) => v("open-following"))
                  }, [
                    e("div", ta, [
                      t[59] || (t[59] = e("span", { class: "fo-sidebar-sub-icon" }, "📺", -1)),
                      e("div", ia, [
                        e("strong", null, l(n(I)("bili.channel.following")), 1),
                        e("small", null, l(n(I)("bili.channel.followingSub")), 1)
                      ])
                    ]),
                    t[60] || (t[60] = e("span", { class: "fo-sidebar-sub-badge" }, "FEED", -1))
                  ], 10, ea)
                ]),
                e("div", oa, [
                  e("button", {
                    id: "fo-sidebar-recommend-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "recommendations" }]),
                    title: n(I)("bili.channel.forYouTip"),
                    onClick: t[5] || (t[5] = (i) => v("open-recommendations"))
                  }, [
                    e("div", na, [
                      t[61] || (t[61] = e("span", { class: "fo-sidebar-sub-icon" }, "✨", -1)),
                      e("div", la, [
                        e("strong", null, l(n(I)("bili.channel.forYou")), 1),
                        e("small", null, l(n(I)("bili.channel.forYouSub")), 1)
                      ])
                    ]),
                    t[62] || (t[62] = e("span", { class: "fo-sidebar-sub-badge" }, "FOR YOU", -1))
                  ], 10, sa)
                ]),
                e("div", aa, [
                  e("button", {
                    id: "fo-sidebar-radio-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "radio" }]),
                    title: n(I)("bili.channel.radioTip"),
                    onClick: t[6] || (t[6] = (i) => v("open-radio"))
                  }, [
                    e("div", da, [
                      t[63] || (t[63] = e("span", { class: "fo-sidebar-sub-icon" }, "📻", -1)),
                      e("div", ua, [
                        e("strong", null, l(n(I)("bili.channel.radio")), 1),
                        e("small", null, l(n(I)("bili.channel.radioSub")), 1)
                      ])
                    ]),
                    t[64] || (t[64] = e("span", { class: "fo-sidebar-sub-badge" }, "RADIO", -1))
                  ], 10, ra)
                ]),
                e("div", ca, [
                  e("button", {
                    id: "fo-sidebar-history-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "organizer" && n(B).activeFolderId === "__history__" }]),
                    title: n(I)("bili.channel.historyTip"),
                    onClick: t[7] || (t[7] = (i) => v("select-folder", { id: "__history__", kind: "other" }))
                  }, [
                    e("div", ba, [
                      t[65] || (t[65] = e("span", { class: "fo-sidebar-sub-icon" }, "📜", -1)),
                      e("div", va, [
                        e("strong", null, l(n(I)("bili.channel.history")), 1),
                        e("small", null, l(n(I)("bili.channel.historySub")), 1)
                      ])
                    ]),
                    t[66] || (t[66] = e("span", { class: "fo-sidebar-sub-badge" }, "HISTORY", -1))
                  ], 10, pa)
                ])
              ], 512), [
                [lt, !X.value]
              ]),
              e("div", fa, [
                e("div", ga, [
                  t[67] || (t[67] = e("span", { class: "fo-sidebar-sub-icon" }, "📁", -1)),
                  e("div", ma, [
                    e("strong", null, l(n(I)("bili.channel.foldersHub")), 1),
                    e("small", null, l(n(I)("bili.channel.foldersHubSub")), 1)
                  ])
                ]),
                e("button", {
                  class: "fo-sidebar-hub-add",
                  type: "button",
                  title: n(I)("bili.channel.createFolderTip"),
                  "aria-label": n(I)("bili.channel.createFolderTip"),
                  onClick: t[8] || (t[8] = (i) => v("create-bili-folder"))
                }, "＋", 8, ha)
              ]),
              r.value.isTargetPickMode ? (o(), s("div", ya, [
                t[68] || (t[68] = e("div", { class: "fo-move-target-tip" }, [
                  e("span", { class: "fo-move-target-dot" }),
                  e("span", null, [
                    ue("请点击"),
                    e("strong", null, "自建收藏夹"),
                    ue("移入")
                  ])
                ], -1)),
                e("button", {
                  type: "button",
                  class: "fo-move-target-cancel",
                  title: "取消移动 (按 Esc 也可取消)",
                  onClick: t[9] || (t[9] = (i) => v("organizer-cancel-move-target"))
                }, " ✕ 取消 ")
              ])) : k("", !0),
              e("nav", _a, [
                (o(!0), s(F, null, W(r.value.folders, (i, u) => (o(), s(F, {
                  key: `${i.group ? "group" : "folder"}:${i.id}`
                }, [
                  u > 0 && r.value.folders[u - 1]?.kind !== i.kind ? (o(), s("div", ka)) : k("", !0),
                  u === 0 || r.value.folders[u - 1]?.kind !== i.kind ? (o(), s("div", {
                    key: 1,
                    class: L(["fo-bili-section-head fo-vue-section-head", { "drag-into": i.kind === "created" && z.value }]),
                    onDragover: (V) => i.kind === "created" ? $(V) : void 0,
                    onDragleave: (V) => i.kind === "created" ? d(V) : void 0,
                    onDrop: (V) => i.kind === "created" ? p(V) : void 0
                  }, [
                    e("span", wa, [
                      e("b", null, l(i.kind === "collected" ? "我追的合集/收藏夹" : i.kind === "other" ? "其他收藏" : "我创建的收藏夹"), 1)
                    ]),
                    i.kind === "created" ? (o(), s("button", {
                      key: 0,
                      class: "fo-bili-section-add-btn",
                      type: "button",
                      title: "新建插件分组",
                      "aria-label": "新建插件分组",
                      onClick: t[10] || (t[10] = S((V) => v("create-local-group"), ["stop"]))
                    }, "＋")) : k("", !0)
                  ], 42, $a)) : k("", !0),
                  i.group ? (o(), s("div", {
                    key: 3,
                    class: L(["fo-bili-group-label", {
                      collapsed: i.collapsed,
                      dragging: ee.value === i.id,
                      "drag-before": Q.value === i.id && ne.value === "before",
                      "drag-after": Q.value === i.id && ne.value === "after",
                      "drag-into": Q.value === i.id && ne.value === "into"
                    }]),
                    style: De({ "--fo-depth": i.depth }),
                    role: "button",
                    tabindex: "0",
                    "aria-expanded": !i.collapsed,
                    draggable: !0,
                    onClick: (V) => se(i),
                    onKeydown: [
                      Re(S((V) => se(i), ["prevent"]), ["enter"]),
                      Re(S((V) => se(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (V) => g(V, i),
                    onDragover: (V) => O(V, i),
                    onDragleave: (V) => J(V, i),
                    onDrop: (V) => _e(V, i),
                    onDragend: ve
                  }, [
                    e("i", Sa, l(i.collapsed ? "›" : "⌄"), 1),
                    t[70] || (t[70] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, xa)) : (o(), s("div", {
                    key: 2,
                    role: "button",
                    tabindex: "0",
                    class: L(["fo-bili-folder", {
                      on: i.selected,
                      dragging: ee.value === i.id,
                      "drag-before": Q.value === i.id && ne.value === "before",
                      "drag-after": Q.value === i.id && ne.value === "after",
                      "drag-into": Q.value === i.id && ne.value === "into",
                      "target-candidate": r.value.isTargetPickMode && i.kind === "created" && !i.selected
                    }]),
                    "data-folder-id": i.id,
                    "data-folder-kind": i.kind,
                    style: De({ "--fo-depth": i.depth }),
                    draggable: i.kind === "created",
                    onClick: (V) => se(i),
                    onKeydown: [
                      Re(S((V) => se(i), ["prevent"]), ["enter"]),
                      Re(S((V) => se(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (V) => g(V, i),
                    onDragover: (V) => O(V, i),
                    onDragleave: (V) => J(V, i),
                    onDrop: (V) => _e(V, i),
                    onDragend: ve
                  }, [
                    t[69] || (t[69] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, Ca))
                ], 64))), 128)),
                !r.value.loading && !r.value.error && !r.value.folders.length ? (o(), s("p", Ta, "暂无可用收藏夹。")) : k("", !0)
              ])
            ]),
            r.value.mode === "organizer" ? (o(), s("section", Da, [
              r.value.loading ? (o(), s("div", Ma, [...t[71] || (t[71] = [
                e("i", null, null, -1),
                e("span", null, "正在读取 B站收藏内容…", -1)
              ])])) : r.value.error && r.value.error.includes("未登录") ? (o(), s("div", Pa, [
                e("div", za, [
                  t[73] || (t[73] = e("span", { class: "fo-bili-login-icon" }, "📺", -1)),
                  t[74] || (t[74] = e("h3", null, "未检测到哔哩哔哩登录状态", -1)),
                  t[75] || (t[75] = e("p", null, "tab-Project 直接复用当前浏览器的 B站 网页会话，无需输入账号密码或扫码授权。", -1)),
                  e("div", Ba, [
                    t[72] || (t[72] = e("a", {
                      class: "fo-bili-btn-login",
                      href: "https://passport.bilibili.com/login",
                      target: "_blank",
                      rel: "noreferrer"
                    }, "前往 bilibili.com 登录 ↗", -1)),
                    e("button", {
                      type: "button",
                      class: "fo-bili-btn-refresh",
                      onClick: t[11] || (t[11] = (i) => v("organizer-refresh"))
                    }, "已登录，点击刷新 ↻")
                  ])
                ])
              ])) : r.value.error ? (o(), s("p", Ia, l(r.value.error), 1)) : (o(), s(F, { key: 3 }, [
                e("header", Ra, [
                  e("div", La, [
                    e("div", {
                      class: L(["fo-bili-cover", { "fo-vue-cover-image": r.value.folderCover }])
                    }, [
                      r.value.folderCover ? (o(), s("img", {
                        key: 0,
                        src: r.value.folderCover,
                        alt: "",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Ea)) : (o(), s("i", Aa))
                    ], 2),
                    e("div", Va, [
                      e("h3", null, l(r.value.folderTitle), 1),
                      e("p", null, l(r.value.folderSubtitle), 1)
                    ])
                  ]),
                  he(hl, { "inline-hero": "" }),
                  e("div", Ua, [
                    e("button", {
                      type: "button",
                      class: "primary",
                      disabled: !r.value.videos.length,
                      onClick: t[12] || (t[12] = (i) => v("organizer-batch-toggle"))
                    }, l(r.value.batchMode ? n(I)("bili.workspace.batchBack") : n(I)("bili.workspace.batch")), 9, Fa),
                    e("button", {
                      type: "button",
                      title: n(I)("bili.workspace.refreshFolderTip"),
                      onClick: t[13] || (t[13] = (i) => v("organizer-refresh"))
                    }, "↻", 8, Na)
                  ])
                ]),
                e("div", qa, [
                  r.value.batchMode ? k("", !0) : (o(), s("div", Ga, [
                    (o(!0), s(F, null, W([{ id: "fav_time", text: n(I)("bili.sort.favTime") }, { id: "view", text: n(I)("bili.sort.view") }, { id: "pubtime", text: n(I)("bili.sort.pubTime") }], (i) => (o(), s("button", {
                      key: i.id,
                      type: "button",
                      class: L({ on: r.value.sort === i.id }),
                      onClick: (u) => v("organizer-sort", i.id)
                    }, l(i.text), 11, Oa))), 128))
                  ])),
                  e("div", Ha, [
                    n(we).isOpen && n(we).bvid ? (o(), s("div", {
                      key: 0,
                      class: L(["fo-video-tab-item", { "is-collapsed": n(we).collapsed }]),
                      title: n(we).title
                    }, [
                      e("div", {
                        class: "fo-video-tab-meta",
                        onClick: ae
                      }, [
                        e("span", {
                          class: L(["fo-video-tab-pulse", { playing: n(we).isPlaying }])
                        }, null, 2),
                        e("span", Wa, l(n(we).title), 1)
                      ]),
                      e("div", Ya, [
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-close",
                          title: "关闭视频",
                          onClick: S(xe, ["stop"])
                        }, " ✕ "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-sub",
                          title: "查看该视频完整纯文本字幕",
                          onClick: S(Ce, ["stop"])
                        }, " 字幕 "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-expand",
                          title: n(we).collapsed ? "放大恢复视频小窗" : "聚焦视频小窗",
                          onClick: S(ae, ["stop"])
                        }, " 放大 ", 8, Ka)
                      ])
                    ], 10, ja)) : k("", !0)
                  ]),
                  r.value.batchMode ? (o(), s("div", Xa, [
                    e("span", Qa, "已选择 " + l(r.value.selectedCount) + " 项", 1),
                    e("button", {
                      type: "button",
                      onClick: t[15] || (t[15] = (i) => v("organizer-batch-all"))
                    }, "全选/取消全选"),
                    e("button", {
                      type: "button",
                      class: L({ "picking-target": r.value.isTargetPickMode }),
                      onClick: t[16] || (t[16] = (i) => r.value.isTargetPickMode ? v("organizer-cancel-move-target") : v("organizer-batch-move"))
                    }, l(r.value.isTargetPickMode ? "✕ 取消移动" : "移动到"), 3),
                    e("button", {
                      type: "button",
                      onClick: t[17] || (t[17] = (i) => v("organizer-batch-cache"))
                    }, "缓存所选"),
                    e("button", {
                      type: "button",
                      onClick: t[18] || (t[18] = (i) => v("organizer-batch-unfavorite"))
                    }, "取消收藏")
                  ])) : (o(), s("form", {
                    key: 1,
                    class: "fo-bili-search",
                    onSubmit: S(E, ["prevent"])
                  }, [
                    le(e("input", {
                      "onUpdate:modelValue": t[14] || (t[14] = (i) => A.value = i),
                      type: "search",
                      placeholder: "请输入关键词",
                      "aria-label": "搜索当前收藏夹",
                      onInput: te,
                      onSearch: te
                    }, null, 544), [
                      [Te, A.value]
                    ]),
                    t[76] || (t[76] = e("button", {
                      type: "submit",
                      title: "搜索"
                    }, "⌕", -1))
                  ], 32))
                ]),
                e("div", Ja, [
                  r.value.videos.length ? k("", !0) : (o(), s("p", Za, l(r.value.query ? "没有找到匹配的视频。" : "这个收藏夹是空的。"), 1)),
                  (o(!0), s(F, null, W(r.value.videos, (i) => (o(), s("article", {
                    key: i.id,
                    class: L(["fo-bili-card", { "batch-selected": i.selected, "fo-single-moving": r.value.movingVideoId === i.id }]),
                    "data-batch-id": i.id,
                    draggable: "true",
                    onDragstart: (u) => Je(u, i),
                    onContextmenu: S((u) => We(u, i), ["prevent", "stop"])
                  }, [
                    e("div", tr, [
                      r.value.batchMode ? (o(), s("label", ir, [
                        e("input", {
                          type: "checkbox",
                          checked: i.selected,
                          onChange: (u) => v("organizer-batch-select", i.id)
                        }, null, 40, or),
                        t[77] || (t[77] = e("span", null, "✓", -1))
                      ])) : k("", !0),
                      e("a", {
                        class: "fo-cover-link",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: S((u) => v("organizer-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, nr)
                      ], 8, sr),
                      e("span", lr, "▣ " + l(i.playCount), 1),
                      e("span", ar, l(i.duration), 1)
                    ]),
                    e("div", rr, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: S((u) => v("organizer-play-video", i), ["prevent"])
                      }, l(i.title), 9, dr),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": R.value === i.id,
                        onClick: S((u) => Oe(i.id), ["stop"])
                      }, "⋮", 8, ur),
                      R.value === i.id ? (o(), s("div", cr, [
                        i.writable ? (o(), s("button", {
                          key: 0,
                          type: "button",
                          class: "danger",
                          onClick: (u) => Qe(i.id, "delete")
                        }, "取消收藏", 8, pr)) : k("", !0),
                        i.writable ? (o(), s("button", {
                          key: 1,
                          type: "button",
                          onClick: (u) => Qe(i.id, "move")
                        }, "移动到", 8, br)) : k("", !0),
                        e("button", {
                          type: "button",
                          onClick: (u) => Qe(i.id, "subtitle")
                        }, "字幕", 8, vr)
                      ])) : k("", !0)
                    ]),
                    e("div", fr, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: S((u) => N(u, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, l(i.author), 9, gr),
                      e("span", null, "收藏于 " + l(i.favoriteDate), 1)
                    ])
                  ], 42, er))), 128))
                ]),
                r.value.totalPages > 1 ? (o(), s("div", mr, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: r.value.page <= 1,
                    onClick: t[19] || (t[19] = (i) => v("organizer-page", r.value.page - 1))
                  }, "‹ 上一页", 8, hr),
                  e("span", yr, l(r.value.page) + " / " + l(r.value.totalPages), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: r.value.page >= r.value.totalPages,
                    onClick: t[20] || (t[20] = (i) => v("organizer-page", r.value.page + 1))
                  }, "下一页 ›", 8, _r)
                ])) : k("", !0)
              ], 64))
            ])) : r.value.mode === "cache" ? (o(), s("section", kr, [
              h.value ? (o(), tt(gs, {
                key: 0,
                active: n(_),
                onBack: t[21] || (t[21] = (i) => h.value = !1)
              }, null, 8, ["active"])) : (o(), s(F, { key: 1 }, [
                e("header", $r, [
                  e("div", wr, [
                    t[79] || (t[79] = e("div", { class: "fo-bili-cover" }, "💾", -1)),
                    e("div", Cr, [
                      t[78] || (t[78] = e("h3", null, "缓存视频", -1)),
                      e("p", null, l(r.value.cachedVideos.length) + " 个缓存记录 · 点击缓存设置管理存放目录", 1)
                    ])
                  ]),
                  e("div", xr, [
                    e("button", {
                      type: "button",
                      class: "primary",
                      onClick: t[22] || (t[22] = (i) => v("organizer-open"))
                    }, "返回收藏夹"),
                    e("button", {
                      type: "button",
                      onClick: t[23] || (t[23] = (i) => h.value = !0)
                    }, "缓存设置")
                  ])
                ]),
                r.value.cacheLoading ? (o(), s("div", Sr, [...t[80] || (t[80] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取本地缓存…", -1)
                ])])) : (o(), s("div", Tr, [
                  r.value.cachedVideos.length ? k("", !0) : (o(), s("p", Dr, "还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。")),
                  (o(!0), s(F, null, W(r.value.cachedVideos, (i) => (o(), s("article", {
                    key: i.id,
                    class: "fo-bili-card fo-cached-video-card"
                  }, [
                    e("div", Mr, [
                      e("button", {
                        class: "fo-cached-play",
                        type: "button",
                        onClick: (u) => v("cache-play", i.id)
                      }, [
                        e("img", {
                          loading: "lazy",
                          referrerpolicy: "no-referrer",
                          src: i.cover,
                          alt: ""
                        }, null, 8, zr),
                        t[81] || (t[81] = e("span", { class: "fo-cached-local-badge" }, "LOCAL", -1))
                      ], 8, Pr)
                    ]),
                    e("div", Br, [
                      e("button", {
                        class: "fo-title-link fo-bili-title fo-cached-title",
                        type: "button",
                        onClick: (u) => v("cache-play", i.id)
                      }, l(i.title), 9, Ir),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "删除缓存",
                        onClick: (u) => v("cache-delete", i.id)
                      }, "×", 8, Rr)
                    ]),
                    e("div", Lr, [
                      e("span", null, l(i.sizeText), 1),
                      e("span", null, "缓存于 " + l(i.cachedDate), 1)
                    ])
                  ]))), 128))
                ]))
              ], 64))
            ])) : r.value.mode === "recommendations" ? (o(), s("section", Er, [
              e("header", Ar, [
                t[82] || (t[82] = e("div", { class: "fo-bili-cover fo-vue-recommend-cover" }, [
                  e("span", null, "✨")
                ], -1)),
                e("div", Vr, [
                  e("div", Ur, [
                    e("h3", null, l(r.value.specialTitle), 1),
                    e("span", Fr, l(r.value.specialBadge), 1)
                  ]),
                  e("p", null, l(r.value.specialSubtitle), 1)
                ]),
                e("div", Nr, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !r.value.specialVideos.length,
                    onClick: t[24] || (t[24] = (i) => v("special-play-page"))
                  }, "▶ 播放本页", 8, qr),
                  e("button", {
                    type: "button",
                    onClick: t[25] || (t[25] = (i) => v("recommendations-refresh"))
                  }, "↻ 换一批"),
                  e("button", {
                    type: "button",
                    onClick: t[26] || (t[26] = (i) => v("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", Gr, [
                t[83] || (t[83] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "🔥 猜你喜欢与热门精选")
                ], -1)),
                e("div", Or, "本页共 " + l(r.value.specialVideos.length) + " 个视频", 1)
              ]),
              r.value.specialLoading ? (o(), s("div", Hr, [...t[84] || (t[84] = [
                e("i", null, null, -1),
                e("span", null, "正在加载个性化推荐视频…", -1)
              ])])) : r.value.specialError ? (o(), s("p", jr, l(r.value.specialError), 1)) : (o(), s("div", Wr, [
                r.value.specialVideos.length ? k("", !0) : (o(), s("p", Yr, "暂无推荐视频。")),
                (o(!0), s(F, null, W(r.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (u) => Je(u, i)
                }, [
                  e("div", Xr, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: S((u) => v("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                        alt: ""
                      }, null, 8, Jr)
                    ], 8, Qr),
                    e("span", Zr, "▣ " + l(i.playCount), 1),
                    e("span", ed, l(i.duration), 1)
                  ]),
                  e("div", td, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: S((u) => v("special-play-video", i), ["prevent"])
                    }, l(i.title), 9, id),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": R.value === i.id,
                      onClick: S((u) => Oe(i.id), ["stop"])
                    }, "⋮", 8, od),
                    R.value === i.id ? (o(), s("div", sd, [
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          v("special-video-action", { video: i, id: i.id, action: "collect-inbox" }), R.value = "";
                        }
                      }, "📥 添加到收集箱", 8, nd),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          v("special-video-action", { id: i.id, action: "play" }), R.value = "";
                        }
                      }, "本地播放与评论", 8, ld),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          v("special-video-action", { id: i.id, action: "subtitle" }), R.value = "";
                        }
                      }, "字幕提取", 8, ad),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          v("special-video-action", { id: i.id, action: "cache" }), R.value = "";
                        }
                      }, "缓存视频", 8, rd),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          v("special-video-action", { id: i.id, action: "open" }), R.value = "";
                        }
                      }, "打开网页", 8, dd)
                    ])) : k("", !0)
                  ]),
                  e("div", ud, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: S((u) => N(u, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, l(i.author), 9, cd),
                    e("span", null, l(i.favoriteDate), 1)
                  ])
                ], 40, Kr))), 128))
              ]))
            ])) : r.value.mode === "following" ? (o(), s("section", pd, [
              e("header", bd, [
                t[85] || (t[85] = e("div", { class: "fo-bili-cover fo-vue-following-cover" }, [
                  e("span", null, "📺")
                ], -1)),
                e("div", vd, [
                  e("div", fd, [
                    e("h3", null, l(r.value.specialTitle), 1),
                    e("span", gd, l(r.value.specialBadge), 1)
                  ]),
                  e("p", null, l(r.value.specialSubtitle), 1)
                ]),
                e("div", md, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !r.value.specialVideos.length,
                    onClick: t[27] || (t[27] = (i) => v("special-play-page"))
                  }, "▶ 播放本页", 8, hd),
                  e("button", {
                    type: "button",
                    onClick: t[28] || (t[28] = (i) => v("following-refresh"))
                  }, "↻"),
                  e("button", {
                    type: "button",
                    onClick: t[29] || (t[29] = (i) => v("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", yd, [
                e("div", _d, [
                  (o(!0), s(F, null, W(r.value.followingGroups, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: L(["fo-up-group-chip", { active: i.active }]),
                    onClick: (u) => v("following-group", i.id)
                  }, [
                    ue(l(i.child ? "↳ " : "") + l(i.name) + " ", 1),
                    e("small", $d, l(i.count), 1)
                  ], 10, kd))), 128))
                ]),
                e("div", wd, [
                  e("button", {
                    type: "button",
                    onClick: t[30] || (t[30] = (i) => v("following-manage-groups", "create"))
                  }, "＋ 新建分组"),
                  e("button", {
                    type: "button",
                    onClick: t[31] || (t[31] = (i) => v("following-manage-groups", "manage"))
                  }, "⚙️ 管理分组")
                ])
              ]),
              r.value.followingMembers.length ? (o(), s("div", Cd, [
                e("div", xd, [
                  e("b", null, l(r.value.specialBadge), 1),
                  e("small", null, "共 " + l(r.value.followingMembers.length) + " 位 UP 主", 1)
                ]),
                e("div", Sd, [
                  e("button", {
                    type: "button",
                    class: L(["fo-up-member-chip", { active: !r.value.followingMembers.some((i) => i.active) }]),
                    onClick: t[32] || (t[32] = (i) => v("following-member", ""))
                  }, "全部UP", 2),
                  (o(!0), s(F, null, W(r.value.followingMembers, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: L(["fo-up-member-chip", { active: i.active }]),
                    title: `左键筛选「${i.name}」，右键预览近期投稿`,
                    onClick: (u) => v("following-member", i.id),
                    onContextmenu: S((u) => v("following-preview-member", { id: i.id, clientX: u.clientX, clientY: u.clientY }), ["prevent"])
                  }, [
                    i.face ? (o(), s("img", {
                      key: 0,
                      loading: "lazy",
                      referrerpolicy: "no-referrer",
                      src: i.face,
                      alt: ""
                    }, null, 8, Dd)) : k("", !0),
                    e("span", null, l(i.name), 1)
                  ], 42, Td))), 128))
                ]),
                e("button", {
                  type: "button",
                  class: "fo-btn-manage-members",
                  onClick: t[33] || (t[33] = (i) => v("following-manage-groups", "members"))
                }, "＋ 管理成员")
              ])) : k("", !0),
              e("div", Md, [
                t[86] || (t[86] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "⚡ UP 主最新投稿动态")
                ], -1)),
                e("div", Pd, "本页共 " + l(r.value.specialVideos.length) + " 个视频", 1)
              ]),
              r.value.specialLoading ? (o(), s("div", zd, [...t[87] || (t[87] = [
                e("i", null, null, -1),
                e("span", null, "正在读取关注 UP 主更新…", -1)
              ])])) : r.value.specialError ? (o(), s("p", Bd, l(r.value.specialError), 1)) : (o(), s("div", Id, [
                r.value.specialVideos.length ? k("", !0) : (o(), s("p", Rd, "暂无最新关注视频动态。")),
                (o(!0), s(F, null, W(r.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (u) => Je(u, i)
                }, [
                  e("div", Ed, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: S((u) => v("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, Vd)
                    ], 8, Ad),
                    e("span", Ud, "▣ " + l(i.playCount), 1),
                    e("span", Fd, l(i.duration), 1)
                  ]),
                  e("div", Nd, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: S((u) => v("special-play-video", i), ["prevent"])
                    }, l(i.title), 9, qd),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": R.value === i.id,
                      onClick: S((u) => Oe(i.id), ["stop"])
                    }, "⋮", 8, Gd),
                    R.value === i.id ? (o(), s("div", Od, [
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          v("special-video-action", { video: i, id: i.id, action: "play" }), R.value = "";
                        }
                      }, "本地播放与评论", 8, Hd),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          v("special-video-action", { video: i, id: i.id, action: "subtitle" }), R.value = "";
                        }
                      }, "字幕提取", 8, jd),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          v("special-video-action", { video: i, id: i.id, action: "cache" }), R.value = "";
                        }
                      }, "缓存视频", 8, Wd),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          v("special-video-action", { video: i, id: i.id, action: "open" }), R.value = "";
                        }
                      }, "打开网页", 8, Yd)
                    ])) : k("", !0)
                  ]),
                  e("div", Kd, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: S((u) => N(u, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, l(i.author), 9, Xd),
                    e("span", null, l(i.favoriteDate), 1)
                  ])
                ], 40, Ld))), 128))
              ])),
              e("div", Qd, [
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: r.value.specialLoading || r.value.specialPage <= 1,
                  onClick: t[34] || (t[34] = (i) => v("following-page", r.value.specialPage - 1))
                }, "‹ 上一页", 8, Jd),
                e("span", Zd, "第 " + l(r.value.specialPage) + " 页", 1),
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: r.value.specialLoading || !r.value.followingHasMore,
                  onClick: t[35] || (t[35] = (i) => v("following-page", r.value.specialPage + 1))
                }, "下一页 ›", 8, eu)
              ])
            ])) : r.value.mode === "subscription" ? (o(), s("section", tu, [
              e("div", iu, [
                he(ai, { "show-back": "" }),
                r.value.subscriptionLoading ? (o(), s("div", ou, [...t[88] || (t[88] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取订阅视频与 AI 字幕稿…", -1)
                ])])) : r.value.subscriptionError ? (o(), s("p", su, "读取失败：" + l(r.value.subscriptionError), 1)) : (o(), s("div", nu, [
                  he(zo),
                  he(Pi)
                ]))
              ])
            ])) : r.value.mode === "radio" ? (o(), s("section", lu, [
              e("header", au, [
                t[89] || (t[89] = e("div", { class: "fo-hero-left" }, [
                  e("div", { class: "fo-bili-cover fo-vue-radio-cover" }, [
                    e("span", null, "📻")
                  ]),
                  e("div", { class: "fo-hero-folder-info" }, [
                    e("h3", null, "B站电台"),
                    e("p", null, "从左侧选择收藏夹，将视频拖拽或添加到连播队列，自由编排系列随心听")
                  ])
                ], -1)),
                e("div", ru, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    onClick: t[36] || (t[36] = (i) => v("radio-refresh"))
                  }, "↻ 刷新电台"),
                  e("button", {
                    type: "button",
                    onClick: t[37] || (t[37] = (i) => v("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", du, [
                e("aside", uu, [
                  t[90] || (t[90] = e("p", { class: "sw-title" }, "收藏夹", -1)),
                  e("div", cu, [
                    (o(!0), s(F, null, W(n(B).radioFolders, (i) => (o(), s("button", {
                      key: i.id,
                      type: "button",
                      class: L(["bili-radio-folder", { on: i.id === n(B).radioActiveFolderId }]),
                      onClick: (u) => v("radio-select-folder", i.id)
                    }, [
                      e("span", null, l(i.title), 1),
                      e("span", null, l(i.count), 1)
                    ], 10, pu))), 128)),
                    n(B).radioFolders.length ? k("", !0) : (o(), s("p", bu, l(n(B).radioLoading ? "加载中…" : "暂无收藏夹"), 1))
                  ])
                ]),
                e("section", vu, [
                  t[92] || (t[92] = e("p", {
                    id: "bili-radio-library-title",
                    class: "sw-title"
                  }, "收藏夹视频", -1)),
                  n(B).radioError ? (o(), s("p", fu, l(n(B).radioError), 1)) : k("", !0),
                  e("div", gu, [
                    (o(!0), s(F, null, W(n(B).radioVideos, (i) => (o(), s("button", {
                      key: i.bvid,
                      type: "button",
                      class: "bili-radio-video",
                      title: `${i.title} (点击加入连播队列，或按住拖拽封面到下方卡带机直接播放)`,
                      draggable: "true",
                      onDragstart: (u) => yt(u, i),
                      onClick: (u) => v("radio-add", { bvid: i.bvid, title: i.title, cover: i.cover, author: i.author, duration: i.duration })
                    }, [
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, hu)) : (o(), s("span", yu)),
                      e("p", null, l(i.title), 1),
                      t[91] || (t[91] = e("span", null, "＋", -1))
                    ], 40, mu))), 128)),
                    n(B).radioVideos.length ? k("", !0) : (o(), s("p", _u, l(n(B).radioLoading ? "读取视频中…" : "此收藏夹暂无可播放视频"), 1))
                  ])
                ]),
                e("section", ku, [
                  e("div", $u, [
                    le(e("input", {
                      id: "bili-radio-name",
                      "onUpdate:modelValue": t[38] || (t[38] = (i) => n(B).radioSeriesName = i),
                      maxlength: "48",
                      class: L({ "has-error": b.value }),
                      placeholder: b.value ? "⚠️ 请在此输入系列名称后再保存！" : "请输入系列名称（必填）",
                      autocomplete: "off",
                      onInput: t[39] || (t[39] = (i) => b.value = !1),
                      onKeydown: Re(S(D, ["prevent"]), ["enter"])
                    }, null, 42, wu), [
                      [Te, n(B).radioSeriesName]
                    ]),
                    e("div", Cu, [
                      e("button", {
                        id: "bili-radio-save",
                        type: "button",
                        title: "保存当前队列为系列",
                        onClick: D
                      }, " 💾 保存系列 "),
                      e("button", {
                        id: "bili-radio-rename",
                        type: "button",
                        title: "重命名当前系列",
                        onClick: f
                      }, " ✏️ 重命名 "),
                      he(pt, {
                        id: "bili-radio-share",
                        compact: "",
                        label: "🚀 分享",
                        visible: !0,
                        onSelect: gt
                      })
                    ]),
                    e("div", xu, [
                      e("select", {
                        class: "bili-radio-series-select",
                        title: "快速切换已保存的系列",
                        onChange: T
                      }, [
                        e("option", Su, l(n(B).radioSeries.length ? `📚 已保存系列 (${n(B).radioSeries.length})` : "📚 暂无保存系列"), 1),
                        (o(!0), s(F, null, W(n(B).radioSeries, (i) => (o(), s("option", {
                          key: i.id,
                          value: i.id
                        }, l(i.name) + " (" + l(i.count) + "首) ", 9, Tu))), 128)),
                        t[93] || (t[93] = e("option", {
                          value: "__create_new__",
                          class: "bili-radio-create-opt"
                        }, " ＋ 创建系列 ", -1))
                      ], 32)
                    ])
                  ]),
                  e("div", Du, [
                    (o(!0), s(F, null, W(n(B).radioQueue, (i, u) => (o(), s("div", {
                      key: `${i.bvid}-${u}`,
                      class: L(["bili-radio-queue-item", { "is-playing": n(H).active && n(H).trackIndex === u + 1 }]),
                      title: "点击立即从该曲目开始播放",
                      onClick: (V) => v("radio-play-index", u)
                    }, [
                      e("span", Pu, l(n(H).active && n(H).trackIndex === u + 1 ? "♪" : u + 1), 1),
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, zu)) : (o(), s("span", Bu)),
                      e("p", null, l(i.title), 1),
                      e("button", {
                        type: "button",
                        class: "bili-radio-remove",
                        "aria-label": `移除 ${i.title}`,
                        onClick: S((V) => v("radio-remove", { index: u }), ["stop"])
                      }, "×", 8, Iu)
                    ], 10, Mu))), 128)),
                    n(B).radioQueue.length ? k("", !0) : (o(), s("p", Ru, "点击左侧视频加入连播队列。"))
                  ]),
                  e("div", Lu, [
                    e("button", {
                      id: "bili-radio-play",
                      type: "button",
                      disabled: !n(B).radioQueue.length,
                      onClick: t[40] || (t[40] = (i) => v("radio-play"))
                    }, "▶ 按顺序播放", 8, Eu),
                    e("button", {
                      id: "bili-radio-shuffle",
                      type: "button",
                      disabled: !n(B).radioQueue.length,
                      onClick: t[41] || (t[41] = (i) => v("radio-shuffle"))
                    }, "🔀 随机播放", 8, Au),
                    e("button", {
                      id: "bili-radio-clear",
                      type: "button",
                      onClick: t[42] || (t[42] = (i) => v("radio-clear"))
                    }, "清空编辑区")
                  ])
                ])
              ]),
              n(Ne) || n(ot).activeId === "daily-bilibili" ? k("", !0) : (o(), tt(bt, { key: 0 }))
            ])) : k("", !0)
          ], 34)
        ])
      ]),
      n(Ne) || n(ot).activeId === "daily-bilibili" ? (o(), tt(bt, {
        key: 0,
        "dock-side": ""
      })) : k("", !0),
      t[105] || (t[105] = e("div", {
        class: "fm-pane",
        id: "pane-sub-video",
        hidden: "",
        style: { display: "none !important" }
      }, null, -1)),
      he(os),
      he(yn),
      j.value.visible && j.value.video ? (o(), s("div", {
        key: 1,
        ref_key: "videoMenuRef",
        ref: Y,
        class: "fo-context-menu",
        role: "menu",
        style: De(n(be)),
        onClick: t[51] || (t[51] = S(() => {
        }, ["stop"]))
      }, [
        e("div", {
          class: "fo-context-header",
          title: j.value.video.title
        }, l(j.value.video.title), 9, Vu),
        he(pt, {
          label: "💬 发送到聊天室",
          "match-menu-item": "",
          visible: j.value.visible,
          onSelect: mt
        }, null, 8, ["visible"]),
        t[102] || (t[102] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[43] || (t[43] = (i) => Ie("play"))
        }, [...t[94] || (t[94] = [
          e("span", { class: "fo-context-icon" }, "▶", -1),
          ue(" 小窗播放视频 ", -1)
        ])]),
        t[103] || (t[103] = e("div", { class: "fo-context-divider" }, null, -1)),
        j.value.video.writable ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "fo-context-item danger",
          onClick: t[44] || (t[44] = (i) => Ie("delete"))
        }, [...t[95] || (t[95] = [
          e("span", { class: "fo-context-icon" }, "🗑", -1),
          ue(" 取消收藏 ", -1)
        ])])) : k("", !0),
        j.value.video.writable ? (o(), s("button", {
          key: 1,
          type: "button",
          class: "fo-context-item",
          onClick: t[45] || (t[45] = (i) => Ie("move"))
        }, [...t[96] || (t[96] = [
          e("span", { class: "fo-context-icon" }, "📁", -1),
          ue(" 移动到… ", -1)
        ])])) : k("", !0),
        j.value.video.writable ? (o(), s("div", Uu)) : k("", !0),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[46] || (t[46] = (i) => Ie("open"))
        }, [...t[97] || (t[97] = [
          e("span", { class: "fo-context-icon" }, "↗", -1),
          ue(" 跳转到 B站 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[47] || (t[47] = (i) => Ie("copy-link"))
        }, [...t[98] || (t[98] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ue(" 复制链接 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[48] || (t[48] = (i) => Ie("cache"))
        }, [...t[99] || (t[99] = [
          e("span", { class: "fo-context-icon" }, "💾", -1),
          ue(" 缓存视频 ", -1)
        ])]),
        t[104] || (t[104] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[49] || (t[49] = (i) => Ie("create-task"))
        }, [...t[100] || (t[100] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ue(" 创建任务 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[50] || (t[50] = (i) => Ie("subtitle"))
        }, [...t[101] || (t[101] = [
          e("span", { class: "fo-context-icon" }, "▤", -1),
          ue(" 字幕转文本 ", -1)
        ])])
      ], 4)) : k("", !0)
    ], 2));
  }
}), ec = /* @__PURE__ */ ze(Fu, [["__scopeId", "data-v-f192535b"]]);
export {
  ec as default
};
