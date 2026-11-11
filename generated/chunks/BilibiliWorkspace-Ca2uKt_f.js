import { d as De, o, e as s, i as e, t as l, u as n, A as E, m as he, F as U, g as j, f as k, p as we, h as T, s as ae, w as fe, B as He, x as vt, l as ce, n as Te, k as Re, b as w, D as nt, Q as ut, K as ft, z as Me, v as wt, y as lt, E as tt, j as Xe, T as Ct } from "./vendor-vue-9b0eS4bW.js";
import { c as I, b as Ve, d as it, a as X, r as Ee, s as xt } from "./bili-favorites-store-CU2tRHU_.js";
import { c as dt, y as de, n as je, d as Ke, o as ot, A as ct } from "./view-styles-Dt1HAuh9.js";
import { C as pt } from "./ChatShareMenu-CQ2mnp4-.js";
import { u as St } from "./useCardActivity-PcZ0iQbk.js";
import { _ as ze, t as A } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { B as Qe } from "./BiliRichText-DiMdMZkQ.js";
import { d as Tt, a as Mt } from "./playback-sync-D3BlI-wP.js";
import { a as me, d as st, e as m, c as $e } from "./up-group-manager-store-BO1OUzZy.js";
import { g as Dt, s as Pt } from "./cache-directory-CBBZXa5n.js";
import { biliMessagePanelController as zt, biliMessagePanelState as Bt } from "./message-panel-store-DmAN-37X.js";
import { bilibiliChannelService as Ae } from "./bilibili-channel.service-DP0D98i8.js";
import { u as It } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-9z3_WNrf.js";
const Rt = { class: "bili-sub-header bili-sub-vue-header" }, Lt = { class: "bili-sub-channel-info" }, Et = { class: "bili-sub-vue-title-row" }, At = { class: "bili-sub-title" }, Vt = { class: "bili-sub-desc" }, Ut = { class: "bili-sub-actions" }, Nt = { class: "bili-sub-mode-icon" }, Ft = { class: "bili-sub-mode-text" }, qt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, Gt = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, Ot = { class: "bili-sub-dropdown-panel" }, Ht = { class: "bili-sub-dropdown-list" }, Yt = ["onClick"], Wt = { class: "bili-sub-item-text" }, Xt = {
  key: 0,
  class: "bili-sub-item-check"
}, jt = { class: "bili-sub-dropdown-foot" }, Kt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, Qt = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, Jt = { class: "bili-sub-dropdown-panel bili-sub-video-dropdown-panel" }, Zt = { class: "bili-sub-dropdown-title" }, ei = { class: "bili-sub-dropdown-list" }, ti = ["title", "onClick"], ii = { class: "bili-sub-video-num" }, oi = { class: "bili-sub-item-text" }, si = {
  key: 0,
  class: "bili-sub-video-duration"
}, ni = { class: "bili-sub-dropdown-foot" }, li = ["disabled"], ai = /* @__PURE__ */ De({
  __name: "BiliSubscriptionHeader",
  props: {
    showBack: { type: Boolean }
  },
  setup(ye) {
    function v(D, g) {
      Ve.dispatch(D, g);
    }
    return (D, g) => (o(), s("header", Rt, [
      e("div", Lt, [
        g[6] || (g[6] = e("img", {
          class: "bili-sub-avatar",
          src: "assets/bilibili.svg",
          alt: ""
        }, null, -1)),
        e("div", null, [
          e("div", Et, [
            e("h3", At, l(n(I).organizer.subscriptionTitle), 1)
          ]),
          e("p", Vt, l(n(I).organizer.subscriptionSubtitle), 1)
        ])
      ]),
      e("div", Ut, [
        e("button", {
          type: "button",
          class: E(["bili-sub-head-btn bili-sub-script-mode-btn", { "is-newspaper": n(I).organizer.subscriptionScriptMode === "newspaper" }]),
          onClick: g[0] || (g[0] = (S) => v("subscription-script-mode"))
        }, [
          e("span", Nt, l(n(I).organizer.subscriptionScriptMode === "newspaper" ? "📰" : "📜"), 1),
          e("span", Ft, l(n(I).organizer.subscriptionScriptMode === "newspaper" ? "报纸模式" : "滚动台词"), 1)
        ], 2),
        e("details", qt, [
          e("summary", Gt, [
            e("span", null, [
              g[7] || (g[7] = he("关注 UP 主：", -1)),
              e("b", null, l(n(I).organizer.subscriptionTitle), 1)
            ]),
            g[8] || (g[8] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", Ot, [
            g[10] || (g[10] = e("div", { class: "bili-sub-dropdown-title" }, "已关注的 UP 主", -1)),
            e("div", Ht, [
              (o(!0), s(U, null, j(n(I).organizer.subscriptionChannels, (S) => (o(), s("button", {
                key: S.id,
                type: "button",
                class: E(["bili-sub-dropdown-item", { active: S.active }]),
                onClick: (B) => v("subscription-channel", S.id)
              }, [
                g[9] || (g[9] = e("span", { class: "bili-sub-dot" }, null, -1)),
                e("span", Wt, l(S.name), 1),
                S.active ? (o(), s("span", Xt, "✓")) : k("", !0)
              ], 10, Yt))), 128))
            ]),
            e("div", jt, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                onClick: g[1] || (g[1] = (S) => v("subscription-add-channel"))
              }, "＋ UP 主")
            ])
          ])
        ]),
        e("details", Kt, [
          e("summary", Qt, [
            e("span", null, [
              g[11] || (g[11] = he("视频 ", -1)),
              e("b", null, "(" + l(n(I).organizer.subscriptionVideos.length) + ")", 1)
            ]),
            g[12] || (g[12] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", Jt, [
            e("div", Zt, "最近投稿视频 (" + l(n(I).organizer.subscriptionVideos.length) + ")", 1),
            e("div", ei, [
              (o(!0), s(U, null, j(n(I).organizer.subscriptionVideos, (S, B) => (o(), s("button", {
                key: S.bvid,
                type: "button",
                class: E(["bili-sub-dropdown-item bili-sub-video-item", { active: S.active }]),
                title: S.title,
                onClick: (M) => v("subscription-video", S.bvid)
              }, [
                e("span", ii, l(B + 1) + ".", 1),
                e("span", oi, l(S.title), 1),
                S.duration ? (o(), s("small", si, l(S.duration), 1)) : k("", !0)
              ], 10, ti))), 128))
            ]),
            e("div", ni, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                disabled: n(I).organizer.subscriptionLoading,
                onClick: g[2] || (g[2] = (S) => v("subscription-load-more"))
              }, "继续获取", 8, li)
            ])
          ])
        ]),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: g[3] || (g[3] = (S) => v(n(I).organizer.showFullDescInRightPanel ? "subscription-copy-description" : "subscription-copy-script"))
        }, l(n(I).organizer.showFullDescInRightPanel ? "复制简介" : "复制稿子"), 1),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: g[4] || (g[4] = (S) => v("subscription-refresh"))
        }, "↻ 刷新"),
        ye.showBack ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "bili-sub-head-btn",
          onClick: g[5] || (g[5] = (S) => v("organizer-open"))
        }, "← 返回收藏夹")) : k("", !0)
      ])
    ]));
  }
}), ri = /* @__PURE__ */ ze(ai, [["__scopeId", "data-v-3f587b61"]]), ui = { class: "bili-sub-transcript-column bili-sub-vue-transcript-column" }, di = { class: "bili-sub-article-wrap" }, ci = { class: "bili-sub-transcript-body" }, pi = {
  key: 0,
  class: "bili-sub-description-copy",
  title: "当前为放大简介视图"
}, bi = {
  key: 0,
  class: "muted"
}, vi = {
  key: 0,
  class: "bili-sub-newspaper-list"
}, fi = ["data-idx", "data-from", "data-to", "title", "onClick"], gi = { class: "bili-sub-newspaper-header" }, mi = { class: "bili-sub-newspaper-num" }, hi = { class: "bili-sub-newspaper-heading" }, yi = { class: "bili-sub-newspaper-title" }, _i = { class: "bili-sub-newspaper-time" }, ki = ["onClick"], $i = { class: "bili-sub-newspaper-content" }, wi = ["data-from", "data-to", "title", "onClick"], Ci = {
  key: 1,
  class: "bili-sub-srt-list"
}, xi = ["data-idx", "data-from", "data-to", "title", "onClick"], Si = { class: "bili-sub-srt-time" }, Ti = { class: "bili-sub-srt-text" }, Mi = {
  key: 2,
  class: "bili-sub-no-transcript-box"
}, Di = {
  key: 2,
  class: "bili-sub-vue-empty-hint"
}, Pi = /* @__PURE__ */ De({
  __name: "BiliSubscriptionTranscript",
  setup(ye) {
    const v = ae(() => I.organizer), D = ae(() => v.value.subscriptionChapters.length > 0 || v.value.subscriptionCues.length > 0);
    function g(S, B) {
      Ve.dispatch(S, B);
    }
    return (S, B) => (o(), s("section", ui, [
      e("article", di, [
        e("div", ci, [
          v.value.showFullDescInRightPanel ? (o(), s("section", pi, [
            e("header", null, [
              B[1] || (B[1] = e("h5", null, "视频简介", -1)),
              e("button", {
                type: "button",
                class: "bili-copy-desc-btn",
                title: "切回台词展示",
                onClick: B[0] || (B[0] = (M) => g("subscription-toggle-desc-panel"))
              }, "缩小简介")
            ]),
            (o(!0), s(U, null, j(v.value.subscriptionDescription, (M, r) => (o(), s("p", { key: r }, [
              we(Qe, { text: M }, null, 8, ["text"])
            ]))), 128)),
            v.value.subscriptionDescription.length ? k("", !0) : (o(), s("p", bi, "该视频暂无可用的文字简介。"))
          ])) : (o(), s(U, { key: 1 }, [
            v.value.subscriptionScriptMode === "newspaper" && v.value.subscriptionChapters.length ? (o(), s("div", vi, [
              (o(!0), s(U, null, j(v.value.subscriptionChapters, (M, r) => (o(), s("article", {
                key: `${M.from}:${r}`,
                class: "bili-sub-newspaper-section",
                "data-idx": r,
                "data-from": M.from,
                "data-to": M.to,
                title: `点击跳转至 ${M.fromText} 播放`,
                onClick: (h) => g("subscription-seek", { from: M.from, index: r, mode: "newspaper" })
              }, [
                e("header", gi, [
                  e("span", mi, l(String(r + 1).padStart(2, "0")), 1),
                  e("div", hi, [
                    e("h4", yi, l(M.title), 1),
                    e("span", _i, "⏱ " + l(M.fromText) + " - " + l(M.toText), 1)
                  ]),
                  e("button", {
                    type: "button",
                    class: "bili-sub-newspaper-play-btn",
                    "aria-label": "从头播放此分段",
                    onClick: T((h) => g("subscription-seek", { from: M.from, index: r, mode: "newspaper" }), ["stop"])
                  }, "▶", 8, ki)
                ]),
                e("div", $i, [
                  M.paragraphCues && M.paragraphCues.length ? (o(!0), s(U, { key: 0 }, j(M.paragraphCues, (h, _) => (o(), s("p", {
                    key: _,
                    class: "bili-sub-newspaper-p"
                  }, [
                    (o(!0), s(U, null, j(h, (N, ee) => (o(), s("span", {
                      key: `${N.from}:${ee}`,
                      class: "bili-sub-newspaper-cue",
                      "data-from": N.from,
                      "data-to": N.to,
                      title: `点击跳转播放此句 (⏱ ${N.timeText || N.from + "s"})`,
                      onClick: T((Y) => g("subscription-seek", { from: N.from, mode: "newspaper" }), ["stop"])
                    }, l(N.content), 9, wi))), 128))
                  ]))), 128)) : (o(!0), s(U, { key: 1 }, j(M.paragraphs, (h, _) => (o(), s("p", {
                    key: _,
                    class: "bili-sub-newspaper-p"
                  }, l(h), 1))), 128))
                ])
              ], 8, fi))), 128))
            ])) : v.value.subscriptionCues.length ? (o(), s("div", Ci, [
              (o(!0), s(U, null, j(v.value.subscriptionCues, (M) => (o(), s("button", {
                key: `${M.from}:${M.index}`,
                type: "button",
                class: "bili-sub-srt-row",
                "data-idx": M.index,
                "data-from": M.from,
                "data-to": M.to,
                title: `点击跳转至 ${M.timeText}`,
                onClick: (r) => g("subscription-seek", { from: M.from, index: M.index, mode: "lyrics" })
              }, [
                e("span", Si, l(M.timeText), 1),
                e("span", Ti, l(M.content), 1)
              ], 8, xi))), 128))
            ])) : (o(), s("div", Mi, [...B[2] || (B[2] = [
              e("div", { class: "bili-sub-no-transcript-icon" }, "🎙️", -1),
              e("h5", null, "暂无实时台词字幕", -1),
              e("p", { class: "muted" }, "当前视频暂无可用字幕稿。如需阅读完整文案，请点击左侧视频标题旁的“放大简介”。", -1)
            ])]))
          ], 64)),
          !v.value.showFullDescInRightPanel && !D.value && !v.value.subscriptionDescription.length ? (o(), s("p", Di, "字幕不可用时仍可在左侧播放和查看评论。")) : k("", !0)
        ])
      ])
    ]));
  }
}), zi = /* @__PURE__ */ ze(Pi, [["__scopeId", "data-v-d4a520da"]]), Bi = { class: "bili-sub-player-column" }, Ii = {
  key: 0,
  class: "bili-sub-sticky-player"
}, Ri = { class: "bili-sub-player-card" }, Li = { class: "bili-sub-video-box" }, Ei = ["poster", "hidden"], Ai = ["src"], Vi = {
  key: 1,
  class: "bili-sub-video-loading"
}, Ui = { class: "bili-sub-video-meta" }, Ni = { class: "bili-sub-video-meta-actions" }, Fi = ["title"], qi = { class: "bili-sub-meta-stats" }, Gi = { class: "bili-sub-meta-desc" }, Oi = {
  class: "bili-sub-comments-section",
  id: "bili-sub-comments-section"
}, Hi = { class: "bili-mini-comments-head" }, Yi = { class: "bili-mini-comments-meta" }, Wi = { class: "bili-mini-comments-count bili-sub-comments-count" }, Xi = { class: "bili-mini-comments-sort" }, ji = { class: "bili-sub-comment-composer" }, Ki = ["onKeydown"], Qi = ["disabled"], Ji = {
  key: 0,
  class: "bili-sub-emote-picker"
}, Zi = {
  key: 0,
  class: "fo-bili-loading"
}, eo = { key: 1 }, to = ["title", "onClick"], io = ["src", "alt"], oo = { key: 1 }, so = { class: "bili-mini-comments-body bili-sub-comments-body" }, no = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, lo = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, ao = ["src"], ro = { class: "bili-comment-main" }, uo = { class: "bili-comment-user-row" }, co = { class: "bili-comment-uname" }, po = {
  key: 0,
  class: "bili-comment-level"
}, bo = { class: "bili-comment-time" }, vo = { class: "bili-comment-text" }, fo = {
  key: 0,
  class: "bili-comment-pictures"
}, go = ["href", "onClick"], mo = ["src"], ho = { class: "bili-comment-actions" }, yo = { key: 0 }, _o = { key: 1 }, ko = {
  key: 1,
  class: "bili-comment-sub-list"
}, $o = { class: "bili-comment-sub-uname" }, wo = { class: "bili-comment-sub-more" }, Co = ["disabled", "onClick"], xo = ["disabled", "onClick"], So = ["onClick"], To = { class: "bili-sub-comments-infinite-trigger" }, Mo = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0" }
}, Do = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0", opacity: "0.6" }
}, Po = {
  key: 1,
  class: "fo-bili-empty"
}, zo = /* @__PURE__ */ De({
  __name: "BiliSubscriptionPlayer",
  setup(ye) {
    const v = ae(() => I.organizer.subscriptionCurrent), D = w(null), g = w(!1), S = w(!1), B = w(""), M = w(""), r = w(1), h = w(1), _ = w([]), N = w("0 条"), ee = w(!1), Y = w(!1), R = w(""), W = w(!1), K = w(""), G = w(null), P = w(!1), O = w(""), se = w(!1), te = w(!1), pe = w(!1), b = w([]);
    let ie = null, ne = null;
    function J(C, y = !1) {
      O.value = C, se.value = y, ie && clearTimeout(ie), ie = setTimeout(() => {
        O.value = "";
      }, 3500);
    }
    function oe() {
      Ve.dispatch("subscription-open-player");
    }
    function z() {
      Ve.dispatch("subscription-toggle-desc-panel");
    }
    function f(C) {
      const y = C.currentTarget;
      y && y.scrollHeight - y.scrollTop - y.clientHeight < 180 && !Y.value && W.value && re();
    }
    function H(C, y) {
      const c = C[y];
      c && window.open(c, "_blank", "noopener,noreferrer");
    }
    function Z(C, y) {
      if (!C) return [];
      if (!y || y.size === 0)
        return [{ type: "text", text: C }];
      const c = /\[([^\]]+)\]/g, x = [];
      let q = 0, F;
      for (; (F = c.exec(C)) !== null; ) {
        F.index > q && x.push({ type: "text", text: C.slice(q, F.index) });
        const Q = F[0], ue = y.get(Q);
        ue ? x.push({ type: "emote", text: Q, url: ue }) : x.push({ type: "text", text: Q }), q = c.lastIndex;
      }
      return q < C.length && x.push({ type: "text", text: C.slice(q) }), x;
    }
    function be(C) {
      if (!C) return "";
      const y = new Date(C * 1e3), c = /* @__PURE__ */ new Date(), x = Math.floor((c.getTime() - y.getTime()) / 1e3);
      if (x < 60) return "刚刚";
      if (x < 3600) return `${Math.floor(x / 60)} 分钟前`;
      if (x < 86400) return `${Math.floor(x / 3600)} 小时前`;
      const q = y.getFullYear(), F = String(y.getMonth() + 1).padStart(2, "0"), Q = String(y.getDate()).padStart(2, "0");
      return q === c.getFullYear() ? `${F}-${Q}` : `${q}-${F}-${Q}`;
    }
    function ve(C) {
      return C ? C >= 1e4 ? (C / 1e4).toFixed(1).replace(/\.0$/, "") + "万" : String(C) : "0";
    }
    async function $(C = !1) {
      if (M.value) {
        C ? Y.value = !0 : (ee.value = !0, R.value = "");
        try {
          const y = `https://api.bilibili.com/x/v2/reply?type=1&oid=${M.value}&pn=${h.value}&ps=20&sort=${r.value}`, x = await (await fetch(y, { credentials: "include" })).json();
          if (x?.code !== 0 || !x?.data) {
            C || (R.value = x?.message || "评论加载失败或该视频已关闭评论", _.value = []), W.value = !1;
            return;
          }
          const q = x.data, F = q.page?.count || 0;
          N.value = `${ve(F)} 条`;
          const ue = (Array.isArray(q.replies) ? q.replies : []).map((le) => {
            const Ye = /* @__PURE__ */ new Map();
            le.content?.emote && Object.entries(le.content.emote).forEach(([ke, Fe]) => {
              Fe?.url && Ye.set(ke, String(Fe.url).replace(/^http:/, "https:"));
            });
            const Ge = String(le.content?.message || ""), Oe = Array.isArray(le.content?.pictures) ? le.content.pictures.map((ke) => String(ke?.img_src || ke).replace(/^http:/, "https:")).filter(Boolean) : [], We = Array.isArray(le.replies) ? le.replies.map((ke) => ({
              id: ke.rpid || Math.random(),
              userName: ke.member?.uname || "B站用户",
              message: String(ke.content?.message || "")
            })) : [];
            return {
              id: le.rpid || Math.random(),
              userName: le.member?.uname || "B站用户",
              avatar: String(le.member?.avatar || "").replace(/^http:/, "https:"),
              level: Number(le.member?.level_info?.current_level || 0),
              message: Ge,
              tokens: Z(Ge, Ye),
              timeStr: be(le.ctime),
              likeCount: Number(le.like || 0),
              replyCount: Number(le.rcount || 0),
              pictures: Oe,
              replies: We
            };
          });
          C ? _.value = [..._.value, ...ue] : _.value = ue, W.value = _.value.length < F;
        } catch (y) {
          C || (R.value = y?.message || "网络异常，未能加载评论");
        } finally {
          ee.value = !1, Y.value = !1;
        }
      }
    }
    async function u(C) {
      const y = _.value.find((c) => String(c.id) === String(C));
      if (!(!y || y.subRepliesLoading || !M.value)) {
        y.subRepliesPage ? y.subRepliesPage++ : y.subRepliesPage = 1, y.subRepliesLoading = !0, y.subRepliesExpanded = !0;
        try {
          const c = await dt.getSubReplies(M.value, C, y.subRepliesPage, 10), x = (c.replies || []).map((Q) => ({
            id: String(Q.rpid),
            userName: Q.uname,
            message: Q.message
          })), q = new Set((y.replies || []).map((Q) => String(Q.id))), F = x.filter((Q) => !q.has(String(Q.id)));
          y.replies = [...y.replies || [], ...F], y.subRepliesHasMore = c.hasMore;
        } catch {
          J("子回复加载失败", !0);
        } finally {
          y.subRepliesLoading = !1;
        }
      }
    }
    function p(C) {
      const y = _.value.find((c) => String(c.id) === String(C));
      y && (y.subRepliesExpanded = !1);
    }
    function L(C) {
      r.value !== C && (r.value = C, h.value = 1, $(!1));
    }
    function re() {
      Y.value || !W.value || (h.value += 1, $(!0));
    }
    async function ge() {
      if (te.value = !te.value, te.value && !b.value.length && !pe.value) {
        pe.value = !0;
        try {
          const y = await (await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", { credentials: "include" })).json();
          y?.code === 0 && Array.isArray(y?.data?.packages) && (b.value = y.data.packages.filter((c) => Array.isArray(c.emote) && c.emote.length).map((c) => ({
            text: c.text || "B站表情",
            emote: c.emote.map((x) => ({
              text: x.text || "",
              url: String(x.url || "").replace(/^http:/, "https:")
            }))
          })));
        } catch {
        } finally {
          pe.value = !1;
        }
      }
    }
    function Se(C) {
      const y = G.value;
      if (!y)
        K.value += C;
      else {
        const c = y.selectionStart ?? y.value.length, x = y.selectionEnd ?? c;
        K.value = K.value.slice(0, c) + C + K.value.slice(x), nt(() => {
          y.focus();
          const q = c + C.length;
          y.setSelectionRange(q, q);
        });
      }
      te.value = !1;
    }
    async function Ce() {
      const C = K.value.trim();
      if (!C) {
        J("请输入评论内容", !0);
        return;
      }
      if (!M.value) {
        J("未能识别视频 ID，无法发表评论", !0);
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
        J("未检测到 B站 登录态，请先登录 bilibili.com", !0);
        return;
      }
      P.value = !0;
      try {
        const x = new URLSearchParams({
          oid: String(M.value),
          type: "1",
          message: C,
          plat: "1",
          csrf: c,
          csrf_token: c
        }), F = await (await fetch("https://api.bilibili.com/x/v2/reply/add", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: x.toString()
        })).json();
        F?.code === 0 ? (K.value = "", J("✓ 评论发表成功！", !1), h.value = 1, $(!1)) : J(`❌ 发送失败：${F?.message || F?.code}`, !0);
      } catch (x) {
        J(`❌ 发送出错：${x?.message || "网络异常"}`, !0);
      } finally {
        P.value = !1;
      }
    }
    async function Pe(C) {
      if (!C?.bvid) return;
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
      g.value = !0, S.value = !1, B.value = "";
      let y = C.aid;
      if (!y)
        try {
          const x = await (await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${C.bvid}`, { credentials: "include" })).json();
          x?.data?.aid && (y = x.data.aid);
        } catch {
        }
      M.value = y || "", h.value = 1, $(!1);
      try {
        const c = await dt.resolvePlayStream(C);
        if (c?.sources?.length) {
          D.value && (typeof document < "u" && document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((x) => {
            try {
              x.pause();
            } catch {
            }
          }), D.value.src = c.sources[0], D.value.play().catch(() => {
          }), Mt({ bvid: C.bvid, title: C.title, cover: C.cover }, D.value)), g.value = !1;
          return;
        }
      } catch (c) {
        console.warn("[BiliSubscriptionPlayer] 本地视频流解析失败，使用 iframe 备用:", c);
      }
      S.value = !0, B.value = `https://player.bilibili.com/player.html?bvid=${C.bvid}&autoplay=1&danmaku=0`, g.value = !1;
    }
    let Be = null, Ue = null;
    function Ne(C) {
      const y = C.closest(".bili-sub-transcript-body") || C.closest(".bili-sub-article-wrap") || C.parentElement;
      if (!y) return;
      const c = y.getBoundingClientRect(), F = C.getBoundingClientRect().top - c.top + y.scrollTop - c.height * 0.36;
      y.scrollTo({
        top: Math.max(0, F),
        behavior: "smooth"
      });
    }
    function _e() {
      if (!D.value) return;
      const C = D.value.currentTime;
      if (document.querySelectorAll(".bili-sub-newspaper-section").forEach((x) => {
        const q = Number(x.getAttribute("data-from") || 0), F = Number(x.getAttribute("data-to") || 0), Q = C >= q && (F <= 0 || C < F);
        x.classList.toggle("active", Q);
      }), I.organizer.subscriptionScriptMode === "newspaper") {
        const x = document.querySelectorAll(".bili-sub-newspaper-cue");
        if (x.length > 0) {
          let q = null;
          if (x.forEach((F) => {
            const Q = Number(F.getAttribute("data-from") || 0), ue = Number(F.getAttribute("data-to") || 0);
            C >= Q && (ue <= 0 || C < ue) ? (q || (q = F), F.classList.add("cue-reading-active")) : F.classList.remove("cue-reading-active");
          }), !q && C > 0)
            for (let F = x.length - 1; F >= 0; F--) {
              const Q = x[F], ue = Number(Q.getAttribute("data-from") || 0);
              if (C >= ue) {
                q = Q, Q.classList.add("cue-reading-active");
                break;
              }
            }
          q && q !== Be && (Be = q, Ne(q));
        }
      } else {
        const x = document.querySelectorAll(".bili-sub-srt-row");
        let q = !1, F = null;
        for (let Q = x.length - 1; Q >= 0; Q--) {
          const ue = x[Q], le = Number(ue.getAttribute("data-from") || 0);
          !q && C >= le ? (ue.classList.add("active"), q = !0, F = ue) : ue.classList.remove("active");
        }
        F && F !== Ue && (Ue = F, Ne(F));
      }
    }
    function Le() {
      _e();
    }
    function qe() {
      _e();
    }
    return fe(
      () => v.value?.bvid,
      () => {
        v.value && Pe(v.value);
      },
      { immediate: !0 }
    ), He(() => {
      ne = Ve.onAction((C, y) => {
        if (C === "subscription-seek") {
          const c = Number(y?.from);
          D.value && Number.isFinite(c) && (D.value.currentTime = Math.max(0, c - 0.1), D.value.play().catch(() => {
          }));
        }
      });
    }), vt(() => {
      if (D.value) {
        Tt(D.value);
        try {
          D.value.pause(), D.value.src = "", D.value.load();
        } catch {
        }
      }
      ne && ne(), ie && clearTimeout(ie);
    }), (C, y) => (o(), s("aside", Bi, [
      v.value ? (o(), s("div", Ii, [
        e("div", Ri, [
          e("div", {
            class: "bili-sub-vue-comment-handoff",
            hidden: "",
            style: { display: "none !important" }
          }, [
            y[3] || (y[3] = e("strong", null, "播放器与评论区已统一到 Vue 本地影院", -1)),
            e("button", {
              type: "button",
              onClick: oe
            }, "打开播放器与评论区")
          ]),
          e("div", Li, [
            e("video", {
              ref_key: "videoRef",
              ref: D,
              class: "bili-sub-native-video",
              controls: "",
              playsinline: "",
              poster: v.value.cover,
              hidden: S.value,
              onTimeupdate: _e,
              onSeeked: Le,
              onPlay: qe
            }, null, 40, Ei),
            S.value ? (o(), s("iframe", {
              key: 0,
              class: "bili-sub-native-iframe",
              allowfullscreen: "true",
              allow: "autoplay; fullscreen",
              src: B.value
            }, null, 8, Ai)) : k("", !0),
            g.value ? (o(), s("div", Vi, [...y[4] || (y[4] = [
              e("i", null, null, -1),
              e("span", null, "正在解析登录高清视频流…", -1)
            ])])) : k("", !0)
          ]),
          e("div", {
            class: "bili-sub-scroll-stage",
            onScrollPassive: f
          }, [
            e("div", Ui, [
              e("div", Ni, [
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: n(I).organizer.showFullDescInRightPanel ? "切回台词展示" : "在右侧大屏展开完整视频简介",
                  onClick: z
                }, l(n(I).organizer.showFullDescInRightPanel ? "缩小简介" : "放大简介"), 9, Fi)
              ]),
              e("h4", null, l(v.value.title), 1),
              e("div", qi, [
                e("span", null, "▣ 播放: " + l(v.value.playCount), 1),
                e("span", null, "💬 弹幕: " + l(v.value.danmakuCount), 1),
                e("span", null, "⏱ " + l(v.value.duration), 1)
              ]),
              e("p", Gi, [
                we(Qe, {
                  text: v.value.description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ]),
            e("div", Oi, [
              e("div", Hi, [
                e("div", Yi, [
                  y[5] || (y[5] = e("span", null, "💬 评论", -1)),
                  e("span", Wi, l(N.value), 1)
                ]),
                e("div", Xi, [
                  e("button", {
                    type: "button",
                    class: E(["bili-mini-sort-btn", { active: r.value === 1 }]),
                    onClick: y[0] || (y[0] = (c) => L(1))
                  }, "按热度", 2),
                  e("button", {
                    type: "button",
                    class: E(["bili-mini-sort-btn", { active: r.value === 0 }]),
                    onClick: y[1] || (y[1] = (c) => L(0))
                  }, "按时间", 2)
                ])
              ]),
              e("div", ji, [
                e("button", {
                  type: "button",
                  class: E(["bili-sub-emote-button", { on: te.value }]),
                  title: "选择 B站 表情",
                  onClick: ge
                }, "☺", 2),
                ce(e("input", {
                  ref_key: "commentInputRef",
                  ref: G,
                  "onUpdate:modelValue": y[2] || (y[2] = (c) => K.value = c),
                  type: "text",
                  class: "bili-sub-comment-input",
                  placeholder: "发一条友善的评论吧…（Enter 发送）",
                  maxlength: "500",
                  onKeydown: Re(T(Ce, ["prevent"]), ["enter"])
                }, null, 40, Ki), [
                  [Te, K.value]
                ]),
                e("button", {
                  type: "button",
                  class: "bili-sub-comment-send-btn",
                  disabled: P.value || !K.value.trim(),
                  onClick: Ce
                }, l(P.value ? "发送中…" : "发送"), 9, Qi)
              ]),
              te.value ? (o(), s("div", Ji, [
                pe.value ? (o(), s("div", Zi, [...y[6] || (y[6] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取 B站 表情包…", -1)
                ])])) : (o(), s("div", eo, [
                  (o(!0), s(U, null, j(b.value, (c) => (o(), s("section", {
                    key: c.text,
                    class: "bili-sub-emote-group"
                  }, [
                    e("h5", null, l(c.text || "B站表情"), 1),
                    e("div", null, [
                      (o(!0), s(U, null, j(c.emote, (x) => (o(), s("button", {
                        key: x.text,
                        type: "button",
                        class: "bili-sub-emote-item",
                        title: x.text,
                        onClick: (q) => Se(x.text)
                      }, [
                        x.url ? (o(), s("img", {
                          key: 0,
                          src: x.url,
                          alt: x.text,
                          referrerpolicy: "no-referrer"
                        }, null, 8, io)) : (o(), s("span", oo, l(x.text), 1))
                      ], 8, to))), 128))
                    ])
                  ]))), 128))
                ]))
              ])) : k("", !0),
              O.value ? (o(), s("div", {
                key: 1,
                class: E(["bili-sub-comment-tip", { error: se.value }])
              }, l(O.value), 3)) : k("", !0),
              e("div", so, [
                ee.value && !_.value.length ? (o(), s("p", no, "正在加载评论…")) : R.value && !_.value.length ? (o(), s("p", lo, l(R.value), 1)) : k("", !0),
                (o(!0), s(U, null, j(_.value, (c) => (o(), s("div", {
                  key: c.id,
                  class: "bili-comment-item"
                }, [
                  e("img", {
                    class: "bili-comment-avatar",
                    src: c.avatar,
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer"
                  }, null, 8, ao),
                  e("div", ro, [
                    e("div", uo, [
                      e("span", co, l(c.userName), 1),
                      c.level ? (o(), s("span", po, "LV" + l(c.level), 1)) : k("", !0),
                      e("span", bo, l(c.timeStr), 1)
                    ]),
                    e("div", vo, [
                      we(Qe, {
                        text: c.message
                      }, null, 8, ["text"])
                    ]),
                    c.pictures?.length ? (o(), s("div", fo, [
                      (o(!0), s(U, null, j(c.pictures, (x, q) => (o(), s("a", {
                        key: q,
                        class: "bili-comment-pic-link",
                        href: x,
                        onClick: T((F) => H(c.pictures, q), ["stop", "prevent"])
                      }, [
                        e("img", {
                          class: "bili-comment-pic",
                          src: x,
                          alt: "评论图片",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, mo)
                      ], 8, go))), 128))
                    ])) : k("", !0),
                    e("div", ho, [
                      c.likeCount ? (o(), s("span", yo, "👍 " + l(c.likeCount), 1)) : k("", !0),
                      c.replyCount ? (o(), s("span", _o, "💬 " + l(c.replyCount), 1)) : k("", !0)
                    ]),
                    c.replies?.length ? (o(), s("div", ko, [
                      (o(!0), s(U, null, j(c.replies, (x) => (o(), s("div", {
                        key: x.id,
                        class: "bili-comment-sub-item"
                      }, [
                        e("span", $o, l(x.userName) + ":", 1),
                        we(Qe, {
                          text: x.message
                        }, null, 8, ["text"])
                      ]))), 128)),
                      e("div", wo, [
                        !c.subRepliesExpanded && (c.replyCount || 0) > c.replies.length ? (o(), s(U, { key: 0 }, [
                          e("span", null, "共 " + l(c.replyCount) + " 条回复，", 1),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: c.subRepliesLoading,
                            onClick: T((x) => u(c.id), ["stop"])
                          }, l(c.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, Co)
                        ], 64)) : c.subRepliesExpanded ? (o(), s(U, { key: 1 }, [
                          c.subRepliesHasMore ? (o(), s("button", {
                            key: 0,
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: c.subRepliesLoading,
                            onClick: T((x) => u(c.id), ["stop"])
                          }, l(c.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, xo)) : k("", !0),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-collapse-btn",
                            onClick: T((x) => p(c.id), ["stop"])
                          }, " 收起 ▴ ", 8, So)
                        ], 64)) : k("", !0)
                      ])
                    ])) : k("", !0)
                  ])
                ]))), 128))
              ]),
              e("div", To, [
                Y.value ? (o(), s("p", Mo, "正在加载更多评论…")) : !W.value && _.value.length ? (o(), s("p", Do, "已显示全部评论")) : k("", !0)
              ])
            ])
          ], 32)
        ])
      ])) : (o(), s("p", Po, "暂无可播放的订阅视频。"))
    ]));
  }
}), Bo = /* @__PURE__ */ ze(zo, [["__scopeId", "data-v-ee6b4dc4"]]), Io = ["disabled"], Ro = ["disabled"], Lo = { key: 0 }, Eo = ["disabled"], Ao = ["disabled"], Vo = ["disabled"], Uo = ["disabled"], No = { class: "bili-sub-add-shell" }, Fo = ["disabled"], qo = { class: "bili-sub-add-toolbar" }, Go = { class: "bili-sub-add-groups" }, Oo = ["onClick"], Ho = { class: "bili-sub-add-list" }, Yo = {
  key: 0,
  class: "fo-bili-loading"
}, Wo = {
  key: 1,
  class: "fo-bili-empty"
}, Xo = {
  key: 2,
  class: "fo-bili-empty"
}, jo = ["disabled", "onClick"], Ko = ["src"], Qo = {
  key: 1,
  class: "bili-sub-add-avatar"
}, Jo = {
  class: "fo-custom-confirm-modal",
  role: "dialog",
  "aria-modal": "true"
}, Zo = { class: "fo-custom-confirm-head" }, es = { class: "fo-custom-confirm-body" }, ts = { class: "fo-custom-confirm-actions" }, is = ["disabled"], os = ["disabled"], ss = /* @__PURE__ */ De({
  __name: "BiliOrganizerDialogs",
  setup(ye) {
    const v = ae(() => st.create), D = ae(() => st.confirm), g = ae(() => st.channelPicker), S = ae(() => v.value.kind === "bili"), B = ae(() => {
      const r = g.value, h = r.query.trim().toLowerCase(), _ = r.groups.find((ee) => ee.id === r.activeGroupId), N = _ ? new Set(_.mids) : null;
      return r.items.filter((ee) => (!N || N.has(ee.mid)) && (!h || ee.name.toLowerCase().includes(h) || ee.mid.includes(h)));
    });
    function M() {
      const r = v.value.name.trim();
      if (!r) {
        me.updateCreate({ status: "请输入名称", error: !0 });
        return;
      }
      me.submitCreate({ name: r, privacy: v.value.privacy });
    }
    return (r, h) => (o(), s(U, null, [
      v.value.open ? (o(), s("dialog", {
        key: 0,
        class: "fo-create-dialog",
        open: "",
        onClick: h[5] || (h[5] = T((_) => n(me).closeCreate(), ["self"])),
        onCancel: h[6] || (h[6] = T((_) => n(me).closeCreate(), ["prevent"]))
      }, [
        e("form", {
          onSubmit: T(M, ["prevent"])
        }, [
          e("header", null, [
            e("div", null, [
              h[14] || (h[14] = e("i", { class: "fo-folder-icon" }, null, -1)),
              e("span", null, [
                e("b", null, l(S.value ? "新建 B站收藏夹" : "新建插件分组"), 1),
                e("small", null, l(S.value ? "会同步创建到你的 B站账号" : "只整理左侧收藏夹，不修改 B站数据"), 1)
              ])
            ]),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: v.value.submitting,
              onClick: h[0] || (h[0] = (_) => n(me).closeCreate())
            }, "×", 8, Io)
          ]),
          e("label", null, [
            e("span", null, l(S.value ? "收藏夹名称" : "分组名称"), 1),
            ce(e("input", {
              "onUpdate:modelValue": h[1] || (h[1] = (_) => v.value.name = _),
              maxlength: "48",
              autocomplete: "off",
              placeholder: "输入名称",
              required: "",
              disabled: v.value.submitting,
              autofocus: ""
            }, null, 8, Ro), [
              [Te, v.value.name]
            ])
          ]),
          S.value ? (o(), s("fieldset", Lo, [
            h[17] || (h[17] = e("legend", null, "可见范围", -1)),
            e("label", null, [
              ce(e("input", {
                "onUpdate:modelValue": h[2] || (h[2] = (_) => v.value.privacy = _),
                type: "radio",
                value: 0,
                disabled: v.value.submitting
              }, null, 8, Eo), [
                [
                  ut,
                  v.value.privacy,
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
              ce(e("input", {
                "onUpdate:modelValue": h[3] || (h[3] = (_) => v.value.privacy = _),
                type: "radio",
                value: 1,
                disabled: v.value.submitting
              }, null, 8, Ao), [
                [
                  ut,
                  v.value.privacy,
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
            class: E(["fo-create-status", { error: v.value.error }]),
            role: "status"
          }, l(v.value.status), 3),
          e("footer", null, [
            e("button", {
              type: "button",
              disabled: v.value.submitting,
              onClick: h[4] || (h[4] = (_) => n(me).closeCreate())
            }, "取消", 8, Vo),
            e("button", {
              class: "primary",
              type: "submit",
              disabled: v.value.submitting
            }, l(v.value.submitting ? "创建中…" : S.value ? "创建收藏夹" : "创建分组"), 9, Uo)
          ])
        ], 32)
      ], 32)) : k("", !0),
      g.value.open ? (o(), s("dialog", {
        key: 1,
        class: "bili-sub-add-dialog",
        open: "",
        onCancel: h[10] || (h[10] = T((_) => n(me).closeChannelPicker(), ["prevent"]))
      }, [
        e("div", No, [
          e("header", null, [
            h[18] || (h[18] = e("div", null, [
              e("b", null, "从我的关注中添加 UP 主"),
              e("small", null, "沿用“正在关注”的本地分组，只能添加已关注的 UP 主")
            ], -1)),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: !!g.value.submittingMid,
              onClick: h[7] || (h[7] = (_) => n(me).closeChannelPicker())
            }, "×", 8, Fo)
          ]),
          e("div", qo, [
            e("div", Go, [
              e("button", {
                type: "button",
                class: E(["bili-sub-add-group", { on: g.value.activeGroupId === "__all__" }]),
                onClick: h[8] || (h[8] = (_) => n(me).updateChannelPicker({ activeGroupId: "__all__" }))
              }, "全部关注", 2),
              (o(!0), s(U, null, j(g.value.groups, (_) => (o(), s("button", {
                key: _.id,
                type: "button",
                class: E(["bili-sub-add-group", { on: g.value.activeGroupId === _.id }]),
                onClick: (N) => n(me).updateChannelPicker({ activeGroupId: _.id })
              }, l(_.name), 11, Oo))), 128))
            ]),
            ce(e("input", {
              "onUpdate:modelValue": h[9] || (h[9] = (_) => g.value.query = _),
              type: "search",
              placeholder: "搜索关注的 UP 主"
            }, null, 512), [
              [Te, g.value.query]
            ])
          ]),
          e("div", Ho, [
            g.value.loading ? (o(), s("div", Yo, [...h[19] || (h[19] = [
              e("i", null, null, -1),
              e("span", null, "正在读取关注分组…", -1)
            ])])) : g.value.error ? (o(), s("p", Wo, l(g.value.error), 1)) : B.value.length ? (o(!0), s(U, { key: 3 }, j(B.value, (_) => (o(), s("button", {
              key: _.mid,
              type: "button",
              class: "bili-sub-add-up",
              disabled: _.added || !!g.value.submittingMid,
              onClick: (N) => n(me).selectChannel(_.mid)
            }, [
              _.face ? (o(), s("img", {
                key: 0,
                src: _.face,
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, Ko)) : (o(), s("span", Qo, "UP")),
              e("span", null, [
                e("b", null, l(_.name), 1),
                e("small", null, "UID " + l(_.mid), 1)
              ]),
              e("i", null, l(_.added ? "已添加" : g.value.submittingMid === _.mid ? "添加中…" : "＋ 添加"), 1)
            ], 8, jo))), 128)) : (o(), s("p", Xo, "该分组中没有匹配的已关注 UP 主。"))
          ])
        ])
      ], 32)) : k("", !0),
      D.value.open ? (o(), s("div", {
        key: 2,
        class: "fo-custom-confirm-overlay",
        onClick: h[13] || (h[13] = T((_) => n(me).closeConfirm(), ["self"]))
      }, [
        e("div", Jo, [
          e("div", Zo, [
            e("h4", null, l(D.value.title), 1)
          ]),
          e("div", es, [
            e("p", null, l(D.value.message), 1)
          ]),
          e("div", ts, [
            e("button", {
              type: "button",
              class: "fo-confirm-btn cancel",
              disabled: D.value.submitting,
              onClick: h[11] || (h[11] = (_) => n(me).closeConfirm())
            }, l(D.value.cancelText), 9, is),
            e("button", {
              type: "button",
              class: E(["fo-confirm-btn confirm", { danger: D.value.danger }]),
              disabled: D.value.submitting,
              onClick: h[12] || (h[12] = (_) => n(me).submitConfirm())
            }, l(D.value.submitting ? "处理中…" : D.value.confirmText), 11, os)
          ])
        ])
      ])) : k("", !0)
    ], 64));
  }
}), ns = ["aria-busy"], ls = { class: "field full-width" }, as = { class: "cache-directory-name" }, rs = { class: "cache-directory-actions" }, us = ["disabled"], ds = ["disabled"], cs = /* @__PURE__ */ De({
  __name: "BiliSettingsPanel",
  props: {
    active: { type: Boolean }
  },
  setup(ye) {
    const v = ye, D = w(!1), g = w(!1), S = w(""), B = w(!1), M = w(null), r = w("尚未选择缓存目录");
    let h = !0, _ = 0;
    async function N() {
      if (!v.active || D.value) return;
      const Y = ++_;
      g.value = !0;
      try {
        const R = await Dt();
        if (!h || Y !== _) return;
        M.value = R, r.value = R?.name || "尚未选择缓存目录";
      } catch {
        h && Y === _ && (M.value = null, r.value = "缓存目录读取失败，请重试");
      } finally {
        h && Y === _ && (g.value = !1);
      }
    }
    async function ee() {
      if (D.value || !v.active) return;
      const Y = window.showDirectoryPicker;
      if (typeof Y != "function") {
        S.value = "当前浏览器不支持目录选择，请使用支持此功能的 Edge 或 Chrome。", B.value = !0;
        return;
      }
      ++_, g.value = !1, D.value = !0, S.value = "";
      try {
        const R = await Y.call(window, {
          id: "logicweaver-bili-cache",
          mode: "readwrite",
          startIn: M.value || "videos"
        });
        if (await Pt(R), !h) return;
        M.value = R, r.value = R.name, B.value = !1, S.value = "目录已保存，新缓存将存入这里；已有视频不会移动或删除。";
      } catch (R) {
        h && R?.name !== "AbortError" && (B.value = !0, S.value = "目录选择或保存未确认，请重读目录核对后再试。");
      } finally {
        h && (D.value = !1);
      }
    }
    return fe(() => v.active, (Y) => {
      Y ? N() : ++_;
    }, { immediate: !0 }), He(() => window.addEventListener("focus", N)), ft(() => {
      h = !1, ++_, window.removeEventListener("focus", N);
    }), (Y, R) => (o(), s("div", {
      class: "settings-subgroup bili-cache-settings",
      "aria-busy": D.value || g.value
    }, [
      e("div", ls, [
        e("p", as, l(g.value ? "正在读取缓存目录…" : r.value), 1),
        e("div", rs, [
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !v.active || D.value || g.value,
            onClick: ee
          }, l(D.value ? "正在保存…" : "选择或重新授权目录"), 9, us),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !v.active || D.value || g.value,
            onClick: N
          }, "重读目录", 8, ds)
        ]),
        R[0] || (R[0] = e("p", { class: "hint" }, "仅更改之后的缓存位置；新缓存保留原目录关联，旧版记录需选择其实际所在目录后播放。不会自动扫描或搬移已有文件。", -1)),
        S.value ? (o(), s("p", {
          key: 0,
          class: E(["hint cache-directory-message", { "is-error": B.value }]),
          role: "status"
        }, l(S.value), 3)) : k("", !0)
      ])
    ], 8, ns));
  }
}), ps = /* @__PURE__ */ ze(cs, [["__scopeId", "data-v-ccf6929a"]]), bs = {
  class: "bili-cache-settings-view",
  "aria-labelledby": "bili-cache-settings-title"
}, vs = { class: "cache-settings-header" }, fs = { class: "cache-settings-card" }, gs = /* @__PURE__ */ De({
  __name: "BiliCacheSettingsView",
  props: {
    active: { type: Boolean }
  },
  emits: ["back"],
  setup(ye, { emit: v }) {
    const D = v;
    return (g, S) => (o(), s("section", bs, [
      e("header", vs, [
        S[1] || (S[1] = e("div", null, [
          e("h3", { id: "bili-cache-settings-title" }, "缓存设置"),
          e("p", null, "管理 B站视频的本地缓存目录")
        ], -1)),
        e("button", {
          type: "button",
          class: "cache-settings-back",
          onClick: S[0] || (S[0] = (B) => D("back"))
        }, "返回缓存视频")
      ]),
      e("div", fs, [
        S[2] || (S[2] = e("h4", null, "视频缓存目录", -1)),
        S[3] || (S[3] = e("p", { class: "cache-settings-note" }, "选择后立即保存，无需到全局设置中操作。浏览器只提供文件夹名称，不显示完整磁盘路径。", -1)),
        we(ps, { active: ye.active }, null, 8, ["active"])
      ])
    ]));
  }
}), ms = /* @__PURE__ */ ze(gs, [["__scopeId", "data-v-43d869dd"]]), hs = { class: "fo-upg-shell" }, ys = { class: "fo-upg-body" }, _s = { class: "fo-upg-sidebar" }, ks = { class: "fo-upg-sidebar-head" }, $s = { class: "fo-upg-group-items" }, ws = ["onDragstart", "onDrop", "onClick"], Cs = ["onKeydown"], xs = {
  key: 0,
  class: "fo-upg-tree-branch"
}, Ss = {
  key: 1,
  class: "fo-folder-icon"
}, Ts = { class: "fo-upg-group-name" }, Ms = { class: "fo-upg-vue-group-actions" }, Ds = ["onClick"], Ps = ["onClick"], zs = ["onClick"], Bs = ["placeholder"], Is = {
  key: 1,
  class: "muted small"
}, Rs = { class: "fo-upg-main" }, Ls = { class: "fo-upg-main-head" }, Es = { class: "fo-upg-main-title" }, As = { key: 0 }, Vs = { class: "fo-upg-head-actions" }, Us = { class: "fo-upg-filter-tabs" }, Ns = { class: "fo-upg-batch-wrap" }, Fs = { class: "fo-upg-batch-count" }, qs = ["disabled"], Gs = ["disabled"], Os = { class: "fo-upg-toolbar" }, Hs = { class: "fo-upg-search" }, Ys = ["disabled"], Ws = {
  key: 0,
  class: "fo-bili-loading"
}, Xs = {
  key: 1,
  class: "fo-bili-empty"
}, js = {
  key: 2,
  class: "fo-bili-empty"
}, Ks = {
  key: 3,
  class: "fo-bili-empty"
}, Qs = ["title", "onContextmenu", "onClick"], Js = ["src"], Zs = { class: "fo-upg-info" }, en = { class: "fo-upg-name" }, tn = { class: "fo-upg-sign" }, on = ["disabled", "onClick"], sn = {
  key: 1,
  class: "fo-upg-move-wrap"
}, nn = ["disabled"], ln = { class: "fo-upg-move-dropdown" }, an = ["disabled", "onClick"], rn = { key: 0 }, un = {
  key: 0,
  class: "muted small",
  style: { padding: "6px 10px" }
}, dn = ["disabled", "onClick"], cn = { class: "fo-upg-pagination" }, pn = { class: "fo-upg-page-info" }, bn = {
  key: 0,
  class: "fo-upg-page-btns"
}, vn = ["disabled"], fn = ["disabled"], gn = { class: "fo-upg-page-cur" }, mn = ["disabled"], hn = ["disabled"], yn = /* @__PURE__ */ De({
  __name: "BiliUpGroupManager",
  setup(ye) {
    const v = w(void 0), D = w(""), g = w(""), S = w(""), B = w(""), M = w(!1), r = w(/* @__PURE__ */ new Set()), h = w(null);
    function _($) {
      if ($.button !== 0 || $.target.closest("button,input")) return;
      const u = h.value;
      if (!u) return;
      const p = u.getBoundingClientRect(), L = p.left, re = p.top, ge = $.clientX, Se = $.clientY;
      u.style.position = "fixed", u.style.left = `${L}px`, u.style.top = `${re}px`, u.style.right = "auto", u.style.bottom = "auto", u.style.margin = "0", u.style.transform = "none";
      const Ce = (Be) => {
        const Ue = Be.clientX - ge, Ne = Be.clientY - Se, _e = Math.max(8, Math.min(window.innerWidth - 120, L + Ue)), Le = Math.max(8, Math.min(window.innerHeight - 80, re + Ne));
        u.style.left = `${_e}px`, u.style.top = `${Le}px`;
      }, Pe = () => {
        window.removeEventListener("pointermove", Ce), window.removeEventListener("pointerup", Pe);
      };
      window.addEventListener("pointermove", Ce), window.addEventListener("pointerup", Pe);
    }
    const N = ae(() => m.groups.find(($) => $.id === m.activeGroupId) || null), ee = ae(() => {
      const $ = m.query.trim().toLowerCase(), u = m.activeGroupId;
      return m.followings.filter((p) => {
        if ($ && !p.name.toLowerCase().includes($) && !p.sign.toLowerCase().includes($) && !p.mid.includes($)) return !1;
        const L = p.groupIds.includes(u);
        return m.filter === "ingroup" ? L : m.onlyUngrouped ? !p.groupIds || p.groupIds.length === 0 : !0;
      });
    }), Y = ae(() => Math.max(1, Math.ceil(ee.value.length / m.pageSize))), R = ae(() => {
      const u = (Math.min(m.page, Y.value) - 1) * m.pageSize;
      return ee.value.slice(u, u + m.pageSize);
    }), W = ae(() => m.followings.filter(($) => $.groupIds.length === 0).length), K = w(null), G = /* @__PURE__ */ new Map();
    function P($) {
      const u = Math.max(1, Math.min(Y.value, $));
      m.page = u, K.value && (K.value.scrollTop = 0);
    }
    fe(() => [m.query, m.filter, m.onlyUngrouped], () => {
      m.page = 1, K.value && (K.value.scrollTop = 0);
    }), fe(() => m.activeGroupId, ($, u) => {
      if (u && K.value) {
        const re = `${u}_${m.filter}_${m.onlyUngrouped}`;
        G.set(re, {
          page: m.page,
          scrollTop: K.value.scrollTop
        });
      }
      if (m.filter === "all")
        return;
      const p = `${$}_${m.filter}_${m.onlyUngrouped}`, L = G.get(p);
      L ? (m.page = Math.min(L.page, Y.value), nt(() => {
        K.value && (K.value.scrollTop = L.scrollTop);
      })) : (m.page = 1, nt(() => {
        K.value && (K.value.scrollTop = 0);
      }));
    }), fe(Y, ($) => {
      m.page > $ && (m.page = $);
    }), fe(M, ($) => {
      $ || r.value.clear();
    });
    function O($) {
      v.value = $, D.value = "";
    }
    function se() {
      v.value = void 0, D.value = "";
    }
    function te() {
      const $ = D.value.trim();
      $ && ($e.dispatch("create-group", { name: $, parentId: v.value || "" }), se());
    }
    function pe($) {
      g.value = $.id, S.value = $.name;
    }
    function b() {
      const $ = S.value.trim();
      g.value && $ && $e.dispatch("rename-group", { id: g.value, name: $ }), g.value = "", S.value = "";
    }
    function ie($, u) {
      B.value = u, $.dataTransfer?.setData("application/x-logicweaver-up-group", u), $.dataTransfer && ($.dataTransfer.effectAllowed = "move");
    }
    function ne($, u) {
      const p = $.dataTransfer?.getData("application/x-logicweaver-up-group") || B.value;
      if (B.value = "", !p || p === u) return;
      const L = $.currentTarget?.getBoundingClientRect(), re = L ? $.clientY - L.top : 0, ge = L ? re < L.height * 0.25 ? "before" : re > L.height * 0.75 ? "after" : "into" : "into";
      $e.dispatch("move-group", { sourceId: p, targetId: u, mode: ge });
    }
    function J($) {
      const u = $.dataTransfer?.getData("application/x-logicweaver-up-group") || B.value;
      B.value = "", u && $e.dispatch("move-group", { sourceId: u, targetId: "", mode: "root" });
    }
    function oe($, u) {
      !u || m.busyMid || $e.dispatch("toggle-member", { groupId: u, mid: $ });
    }
    function z($) {
      !m.activeGroupId || m.busyMid || $e.dispatch("toggle-member", { groupId: m.activeGroupId, mid: $ });
    }
    function f($, u) {
      $e.dispatch("preview-up", { mid: u, clientX: $.clientX, clientY: $.clientY });
    }
    function H($) {
      const u = r.value;
      u.has($) ? u.delete($) : u.add($);
    }
    function Z() {
      if (!m.activeGroupId || m.busyMid) return;
      const $ = Array.from(r.value);
      if (!$.length) return;
      const u = $.filter((p) => {
        const L = m.followings.find((re) => re.mid === p);
        return L && !L.groupIds.includes(m.activeGroupId);
      });
      if (u.length) {
        for (const p of u)
          $e.dispatch("toggle-member", { groupId: m.activeGroupId, mid: p });
        r.value.clear();
      }
    }
    function be() {
      if (!m.activeGroupId || m.busyMid) return;
      const $ = Array.from(r.value);
      if (!$.length) return;
      const u = $.filter((p) => {
        const L = m.followings.find((re) => re.mid === p);
        return L && L.groupIds.includes(m.activeGroupId);
      });
      if (u.length) {
        for (const p of u)
          $e.dispatch("toggle-member", { groupId: m.activeGroupId, mid: p });
        r.value.clear();
      }
    }
    function ve() {
      for (const $ of R.value) r.value.add($.mid);
    }
    return ($, u) => n(m).open ? (o(), s("dialog", {
      key: 0,
      ref_key: "dialogEl",
      ref: h,
      class: "fo-up-group-dialog",
      open: "",
      onCancel: u[20] || (u[20] = T((p) => n($e).close(), ["prevent"]))
    }, [
      e("div", hs, [
        e("header", {
          class: "fo-upg-head",
          onPointerdown: _
        }, [
          u[21] || (u[21] = e("h3", null, [
            e("span", null, "👥"),
            he(" 关注分组与 UP 主管理")
          ], -1)),
          e("button", {
            type: "button",
            class: "fo-upg-close-btn",
            "aria-label": "关闭",
            title: "关闭管理面板",
            onClick: u[0] || (u[0] = (p) => n($e).close())
          }, "✕")
        ], 32),
        e("div", ys, [
          e("aside", _s, [
            e("div", ks, [
              u[22] || (u[22] = e("span", null, "我的分组", -1)),
              e("button", {
                type: "button",
                onClick: u[1] || (u[1] = (p) => O(null))
              }, "＋ 新建")
            ]),
            e("div", $s, [
              e("div", {
                class: "fo-upg-root-dropzone",
                onDragover: u[2] || (u[2] = T(() => {
                }, ["prevent"])),
                onDrop: T(J, ["prevent"])
              }, "⇣ 拖至此处变为顶级分组", 32),
              v.value === null ? (o(), s("form", {
                key: 0,
                class: "fo-upg-create-box",
                onSubmit: T(te, ["prevent"])
              }, [
                ce(e("input", {
                  "onUpdate:modelValue": u[3] || (u[3] = (p) => D.value = p),
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
                    onClick: se
                  }, "取消"),
                  u[23] || (u[23] = e("button", {
                    class: "confirm",
                    type: "submit"
                  }, "确定", -1))
                ])
              ], 32)) : k("", !0),
              (o(!0), s(U, null, j(n(m).groups, (p) => (o(), s(U, {
                key: p.id
              }, [
                e("div", {
                  class: E(["fo-upg-group-item", { on: p.id === n(m).activeGroupId, "is-subgroup": p.depth > 0 }]),
                  style: Me({ paddingLeft: `${8 + p.depth * 18}px` }),
                  draggable: "true",
                  onDragstart: (L) => ie(L, p.id),
                  onDragover: u[7] || (u[7] = T(() => {
                  }, ["prevent"])),
                  onDrop: T((L) => ne(L, p.id), ["prevent"]),
                  onClick: (L) => n(m).activeGroupId = p.id
                }, [
                  g.value === p.id ? (o(), s(U, { key: 0 }, [
                    ce(e("input", {
                      "onUpdate:modelValue": u[4] || (u[4] = (L) => S.value = L),
                      class: "fo-upg-rename-input",
                      maxlength: "20",
                      onClick: u[5] || (u[5] = T(() => {
                      }, ["stop"])),
                      onKeydown: Re(T(b, ["prevent"]), ["enter"])
                    }, null, 40, Cs), [
                      [Te, S.value]
                    ]),
                    e("button", {
                      type: "button",
                      onClick: T(b, ["stop"])
                    }, "✓"),
                    e("button", {
                      type: "button",
                      onClick: u[6] || (u[6] = T((L) => g.value = "", ["stop"]))
                    }, "✕")
                  ], 64)) : (o(), s(U, { key: 1 }, [
                    p.depth ? (o(), s("span", xs, "↳")) : (o(), s("i", Ss)),
                    e("span", Ts, l(p.name), 1),
                    e("small", null, l(p.upMids.length), 1),
                    e("span", Ms, [
                      e("button", {
                        type: "button",
                        title: "添加子分组",
                        onClick: T((L) => O(p.id), ["stop"])
                      }, "＋", 8, Ds),
                      e("button", {
                        type: "button",
                        title: "重命名",
                        onClick: T((L) => pe(p), ["stop"])
                      }, "✎", 8, Ps),
                      e("button", {
                        type: "button",
                        class: "danger",
                        title: "删除",
                        onClick: T((L) => n($e).dispatch("delete-group", p.id), ["stop"])
                      }, "×", 8, zs)
                    ])
                  ], 64))
                ], 46, ws),
                v.value === p.id ? (o(), s("form", {
                  key: 0,
                  class: "fo-upg-create-box",
                  style: Me({ marginLeft: `${18 + p.depth * 18}px` }),
                  onSubmit: T(te, ["prevent"])
                }, [
                  ce(e("input", {
                    "onUpdate:modelValue": u[8] || (u[8] = (L) => D.value = L),
                    maxlength: "20",
                    placeholder: `输入「${p.name}」的子分组名称…`,
                    autofocus: ""
                  }, null, 8, Bs), [
                    [Te, D.value]
                  ]),
                  e("div", { class: "fo-upg-create-btns" }, [
                    e("button", {
                      type: "button",
                      class: "cancel",
                      onClick: se
                    }, "取消"),
                    u[24] || (u[24] = e("button", {
                      class: "confirm",
                      type: "submit"
                    }, "确定", -1))
                  ])
                ], 36)) : k("", !0)
              ], 64))), 128)),
              !n(m).groups.length && !n(m).loading ? (o(), s("p", Is, '暂无分组，请点击"＋ 新建"。')) : k("", !0)
            ])
          ]),
          e("section", Rs, [
            e("div", Ls, [
              e("div", Es, [
                e("h4", null, l(N.value ? `分组：「${N.value.name}」` : "请先选择或新建分组"), 1),
                N.value ? (o(), s("span", As, "（本组 " + l(N.value.upMids.length) + " 位 · 共 " + l(n(m).followings.length) + " 位关注 · 未分组 " + l(W.value) + " 位）", 1)) : k("", !0)
              ]),
              e("div", Vs, [
                e("div", Us, [
                  e("button", {
                    type: "button",
                    class: E(["fo-upg-filter-tab", { on: n(m).filter === "all" }]),
                    onClick: u[9] || (u[9] = (p) => n(m).filter = "all")
                  }, "全部关注", 2),
                  e("button", {
                    type: "button",
                    class: E(["fo-upg-filter-tab", { on: n(m).filter === "ingroup" }]),
                    onClick: u[10] || (u[10] = (p) => n(m).filter = "ingroup")
                  }, "本组已加", 2)
                ]),
                e("div", Ns, [
                  e("button", {
                    type: "button",
                    class: E(["fo-upg-batch-toggle", { on: M.value }]),
                    onClick: u[11] || (u[11] = (p) => M.value = !M.value)
                  }, l(M.value ? "退出批量" : "批量操作"), 3),
                  M.value && r.value.size > 0 ? (o(), s(U, { key: 0 }, [
                    e("span", Fs, "已选 " + l(r.value.size), 1),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action add",
                      disabled: !N.value,
                      onClick: Z
                    }, "＋ 加入本组", 8, qs),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action remove",
                      disabled: !N.value,
                      onClick: be
                    }, "− 移出本组", 8, Gs),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: ve
                    }, "全选当页"),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: u[12] || (u[12] = (p) => r.value.clear())
                    }, "清除")
                  ], 64)) : k("", !0)
                ]),
                n(m).filter === "all" ? (o(), s("label", {
                  key: 0,
                  class: E(["fo-upg-switch", { on: n(m).onlyUngrouped }])
                }, [
                  ce(e("input", {
                    "onUpdate:modelValue": u[13] || (u[13] = (p) => n(m).onlyUngrouped = p),
                    type: "checkbox"
                  }, null, 512), [
                    [wt, n(m).onlyUngrouped]
                  ]),
                  u[25] || (u[25] = e("span", { class: "fo-upg-switch-track" }, [
                    e("span", { class: "fo-upg-switch-thumb" })
                  ], -1)),
                  u[26] || (u[26] = e("span", { class: "fo-upg-switch-text" }, "仅未分组 UP", -1))
                ], 2)) : k("", !0)
              ])
            ]),
            e("div", Os, [
              e("div", Hs, [
                u[27] || (u[27] = e("span", null, "🔍", -1)),
                ce(e("input", {
                  "onUpdate:modelValue": u[14] || (u[14] = (p) => n(m).query = p),
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
                onClick: u[15] || (u[15] = (p) => n($e).dispatch("refresh"))
              }, l(n(m).refreshing ? "刷新中…" : "↻ 刷新关注"), 9, Ys)
            ]),
            e("div", {
              ref_key: "listRef",
              ref: K,
              class: "fo-upg-list"
            }, [
              n(m).loading ? (o(), s("div", Ws, [...u[28] || (u[28] = [
                e("i", null, null, -1),
                e("span", null, "正在加载关注的 UP 主列表…", -1)
              ])])) : n(m).error ? (o(), s("p", Xs, l(n(m).error), 1)) : N.value ? R.value.length ? (o(!0), s(U, { key: 4 }, j(R.value, (p) => (o(), s("article", {
                key: p.mid,
                class: E(["fo-upg-card", { selected: M.value && r.value.has(p.mid) }]),
                title: `右键查看「${p.name}」近期投稿`,
                onContextmenu: T((L) => f(L, p.mid), ["prevent"]),
                onClick: (L) => M.value ? H(p.mid) : void 0
              }, [
                e("img", {
                  src: p.face,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, Js),
                e("div", Zs, [
                  e("div", en, l(p.name), 1),
                  e("div", tn, l(p.sign || "暂无签名"), 1)
                ]),
                M.value ? (o(), s("div", {
                  key: 1,
                  class: E(["fo-upg-batch-check", { checked: r.value.has(p.mid) }])
                }, l(r.value.has(p.mid) ? "✓" : ""), 3)) : (o(), s(U, { key: 0 }, [
                  p.groupIds.includes(n(m).activeGroupId) ? (o(), s("button", {
                    key: 0,
                    type: "button",
                    class: "fo-upg-toggle-btn in-group",
                    disabled: n(m).busyMid === p.mid,
                    onClick: T((L) => z(p.mid), ["stop"])
                  }, l(n(m).busyMid === p.mid ? "处理中…" : `移出 ${N.value?.name || ""}`), 9, on)) : p.groupIds.length > 0 ? (o(), s("div", sn, [
                    e("button", {
                      type: "button",
                      class: "fo-upg-toggle-btn belongs-other fo-upg-move-trigger",
                      disabled: n(m).busyMid === p.mid
                    }, l(n(m).busyMid === p.mid ? "处理中…" : `📁 ${p.groupName || "已分组"}`), 9, nn),
                    e("div", ln, [
                      u[30] || (u[30] = e("div", { class: "fo-upg-move-title" }, "移动到分组", -1)),
                      (o(!0), s(U, null, j(n(m).groups, (L) => (o(), s("button", {
                        key: L.id,
                        type: "button",
                        class: E(["fo-upg-move-item", { active: p.groupIds.includes(L.id) }]),
                        disabled: n(m).busyMid === p.mid,
                        onClick: T((re) => oe(p.mid, L.id), ["stop"])
                      }, [
                        u[29] || (u[29] = e("i", { class: "fo-folder-icon small" }, null, -1)),
                        e("span", null, l(L.name), 1),
                        p.groupIds.includes(L.id) ? (o(), s("small", rn, "✓ 已加入")) : k("", !0)
                      ], 10, an))), 128)),
                      n(m).groups.length ? k("", !0) : (o(), s("p", un, "暂无分组"))
                    ])
                  ])) : n(m).activeGroupId ? (o(), s("button", {
                    key: 2,
                    type: "button",
                    class: "fo-upg-toggle-btn",
                    disabled: n(m).busyMid === p.mid,
                    onClick: T((L) => z(p.mid), ["stop"])
                  }, l(n(m).busyMid === p.mid ? "处理中…" : "＋ 加入"), 9, dn)) : k("", !0)
                ], 64))
              ], 42, Qs))), 128)) : (o(), s("p", Ks, "没有符合条件的 UP 主。")) : (o(), s("p", js, "请先新建或选择一个分组。"))
            ], 512),
            e("div", cn, [
              e("div", pn, "共 " + l(ee.value.length) + " 位 UP 主 · 每页 " + l(n(m).pageSize) + " 位", 1),
              Y.value > 1 ? (o(), s("div", bn, [
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page <= 1,
                  onClick: u[16] || (u[16] = (p) => P(1))
                }, "« 首页", 8, vn),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page <= 1,
                  onClick: u[17] || (u[17] = (p) => P(n(m).page - 1))
                }, "‹ 上一页", 8, fn),
                e("span", gn, l(n(m).page) + " / " + l(Y.value), 1),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page >= Y.value,
                  onClick: u[18] || (u[18] = (p) => P(n(m).page + 1))
                }, "下一页 ›", 8, mn),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page >= Y.value,
                  onClick: u[19] || (u[19] = (p) => P(Y.value))
                }, "末页 »", 8, hn)
              ])) : k("", !0)
            ])
          ])
        ])
      ])
    ], 544)) : k("", !0);
  }
}), _n = /* @__PURE__ */ ze(yn, [["__scopeId", "data-v-f738263e"]]), kn = ["title"], $n = { class: "tape-capsule-text" }, wn = { class: "capsule-title" }, Cn = { class: "capsule-sub" }, xn = ["title"], Sn = { class: "tape-deck-drop-slot" }, Tn = {
  key: 1,
  class: "tape-insert-feedback-chip"
}, Mn = { class: "tape-loaded-title" }, Dn = { class: "tape-body-content" }, Pn = ["title", "onKeydown"], zn = { class: "tape-cassette" }, Bn = { class: "tape-center-label" }, In = { class: "tape-sticker-head" }, Rn = ["title"], Ln = ["src"], En = { class: "tape-badge-row" }, An = { class: "tape-brand-text" }, Vn = { class: "tape-series-header" }, Un = { class: "tape-series-title-group" }, Nn = { class: "tape-series-count-pill" }, Fn = { class: "tape-series-list-scroll" }, qn = ["onClick"], Gn = { class: "tape-series-item-left" }, On = { class: "tape-series-item-info" }, Hn = ["title"], Yn = { class: "tape-series-item-count" }, Wn = {
  key: 0,
  class: "tape-series-playing-tag"
}, Xn = {
  key: 1,
  class: "tape-series-play-action"
}, jn = {
  key: 0,
  class: "tape-series-empty"
}, Kn = {
  class: "tape-transport-controls",
  role: "group",
  "aria-label": "电台播放控制"
}, Qn = ["title", "aria-label"], Jn = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, Zn = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, el = { class: "tape-playback-section" }, tl = { class: "tape-time-lyric-row" }, il = { class: "tape-timestamp" }, ol = { class: "tape-lyric-container" }, sl = ["title"], nl = ["title", "aria-label"], ll = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, al = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, rl = {
  key: 2,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, ul = ["aria-valuenow"], dl = {
  class: "tape-waveform-row",
  "aria-hidden": "true"
}, cl = {
  class: "tape-waveform-svg",
  viewBox: "0 0 160 16",
  preserveAspectRatio: "none"
}, pl = ["x", "y", "height"], bl = /* @__PURE__ */ De({
  __name: "BiliRadioTapePlayer",
  props: {
    dockSide: { type: Boolean, default: !1 }
  },
  setup(ye) {
    const v = ye, D = [
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
    ], g = w(!1), S = w(null), B = w(!1), M = w(!1), r = w(""), h = w(!1), _ = w(!1);
    function N(z) {
      z.stopPropagation(), _.value = !_.value, _.value && it.init();
    }
    async function ee(z) {
      _.value = !1, await it.playSeries(z, 0);
    }
    function Y(z) {
      if (!_.value) return;
      const f = z.target;
      !f?.closest(".tape-series-popover") && !f?.closest(".tape-cassette-wrap") && (_.value = !1);
    }
    function R(z) {
      z.key === "Escape" && _.value && (_.value = !1);
    }
    const W = ae(() => X.mode === "one" ? "单曲循环" : X.mode === "shuffle" ? "乱序播放" : "顺序播放"), K = w(380);
    function G() {
      if (typeof document > "u" || !v.dockSide) return;
      const z = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock"), f = 20, H = 16;
      if (z) {
        const be = z.getBoundingClientRect();
        if (be.left > 80) {
          const ve = Math.floor(be.left - f - H);
          if (ve > 220) {
            K.value = ve;
            return;
          }
        }
      }
      const Z = typeof window < "u" ? window.innerWidth : 1280;
      K.value = Math.max(220, Math.floor(Z / 2 - 230));
    }
    let P = null;
    function O() {
      clearTimeout(P), P = setTimeout(G, 60);
    }
    He(() => {
      if (it.init(), typeof window < "u" && (window.addEventListener("pointerdown", Y), window.addEventListener("keydown", R)), v.dockSide) {
        G(), window.addEventListener("resize", O);
        const z = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
        if (z && typeof ResizeObserver < "u") {
          const f = new ResizeObserver(() => G());
          f.observe(z), z.__bili_dock_ro = f;
        }
      }
    }), vt(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", Y), window.removeEventListener("keydown", R), window.removeEventListener("resize", O));
      const z = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
      z && z.__bili_dock_ro && (z.__bili_dock_ro.disconnect(), delete z.__bili_dock_ro);
    });
    function se(z) {
      z.preventDefault(), B.value = !0;
    }
    function te(z) {
      z.preventDefault(), z.dataTransfer && (z.dataTransfer.dropEffect = "copy"), B.value = !0;
    }
    function pe(z) {
      const f = z.currentTarget, H = z.relatedTarget;
      (!H || !f.contains(H)) && (B.value = !1);
    }
    function b(z) {
      z.preventDefault(), B.value = !1;
      const f = z.dataTransfer;
      if (!f) return;
      let H = f.getData("application/x-bili-cassette") || f.getData("application/json"), Z = null;
      if (H)
        try {
          Z = JSON.parse(H);
        } catch {
        }
      if (!Z?.bvid) {
        const ve = (f.getData("text/plain") || f.getData("text/uri-list") || f.getData("application/x-logicweaver-video-url"))?.match(/BV[0-9a-zA-Z]+/);
        ve && (Z = {
          bvid: ve[0],
          title: "放入的单曲卡带",
          cover: "",
          author: "Bilibili",
          duration: 0
        });
      }
      Z?.bvid && (M.value = !0, r.value = Z.title || Z.bvid, setTimeout(() => {
        Ee.insertAndPlay(Z);
      }, 280), setTimeout(() => {
        M.value = !1;
      }, 1500));
    }
    function ie(z) {
      if (S.value) {
        g.value = !0;
        try {
          z.currentTarget?.setPointerCapture?.(z.pointerId);
        } catch {
        }
        oe(z);
      }
    }
    function ne(z) {
      g.value && oe(z);
    }
    function J(z) {
      if (g.value) {
        oe(z), g.value = !1;
        try {
          z.currentTarget?.releasePointerCapture?.(z.pointerId);
        } catch {
        }
      }
    }
    function oe(z) {
      if (!S.value) return;
      const f = S.value.getBoundingClientRect();
      if (f.width <= 0) return;
      const H = z.clientX - f.left, Z = Math.max(0, Math.min(100, H / f.width * 100));
      Ee.seek(Z);
    }
    return (z, f) => (o(), s("div", {
      class: E(["bili-tape-deck", {
        "is-playing": n(X).playing,
        "is-drag-over": B.value,
        "is-inserting": M.value,
        "dock-side-mode": v.dockSide,
        "dock-side-collapsed": v.dockSide && h.value
      }]),
      style: Me(v.dockSide && !h.value ? { maxWidth: `${K.value}px` } : void 0),
      onDragenter: se,
      onDragover: te,
      onDragleave: pe,
      onDrop: b
    }, [
      v.dockSide && h.value ? (o(), s("div", {
        key: 0,
        class: "tape-collapsed-capsule",
        title: `电台：${n(X).title || "哔哩哔哩电台"}`
      }, [
        e("div", {
          class: E(["tape-capsule-spool", { spinning: n(X).playing }])
        }, [...f[9] || (f[9] = [
          e("div", { class: "spool-center-dot" }, null, -1)
        ])], 2),
        e("div", $n, [
          e("strong", wn, l(n(X).title || "B站电台"), 1),
          e("small", Cn, l(n(X).playing ? "♪ 播放中" : "已暂停"), 1)
        ]),
        e("button", {
          type: "button",
          class: "tape-capsule-play-btn",
          title: n(X).playing ? "暂停" : "播放",
          onClick: f[0] || (f[0] = T((H) => n(Ee).togglePlay(), ["stop"]))
        }, l(n(X).playing ? "⏸" : "▶"), 9, xn),
        e("button", {
          type: "button",
          class: "tape-capsule-expand-btn",
          title: "展开完整磁带播放条",
          onClick: f[1] || (f[1] = T((H) => h.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, kn)) : k("", !0),
      ce(e("div", Sn, [...f[10] || (f[10] = [
        tt('<div class="slot-visual-frame" data-v-3f62391b><span class="slot-icon-tape" data-v-3f62391b>📼</span><div class="slot-text-col" data-v-3f62391b><strong class="slot-headline" data-v-3f62391b>释放鼠标装填卡带</strong><small class="slot-subline" data-v-3f62391b>拖入视频封面 · 立即播放音乐</small></div></div>', 1)
      ])], 512), [
        [lt, B.value]
      ]),
      M.value ? (o(), s("div", Tn, [
        f[11] || (f[11] = e("span", { class: "tape-click-sound" }, "✓ 已装填", -1)),
        e("span", Mn, "《" + l(r.value) + "》", 1)
      ])) : k("", !0),
      ce(e("div", Dn, [
        e("div", {
          class: "tape-cassette-wrap",
          role: "button",
          tabindex: "0",
          title: `点击选择电台系列 (已建 ${n(I).radioSeries.length} 个系列 · 也可直接拖拽视频封面至此装填)`,
          onClick: N,
          onKeydown: Re(T(N, ["prevent"]), ["enter", "space"])
        }, [
          e("div", zn, [
            f[14] || (f[14] = e("div", { class: "tape-spool tape-spool-left" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1)),
            e("div", Bn, [
              e("div", In, [
                n(X).coverUrl ? (o(), s("div", {
                  key: 0,
                  class: "tape-cover-sticker",
                  title: n(X).title
                }, [
                  e("img", {
                    src: n(X).coverUrl,
                    alt: "Cover",
                    referrerpolicy: "no-referrer"
                  }, null, 8, Ln)
                ], 8, Rn)) : k("", !0),
                e("div", En, [
                  f[12] || (f[12] = e("span", { class: "side-letter" }, "A", -1)),
                  e("span", An, l(n(X).seriesName || "CASSETTE"), 1)
                ])
              ]),
              f[13] || (f[13] = e("div", { class: "tape-acrylic-window" }, [
                e("div", { class: "tape-ribbon-bar" }),
                e("div", { class: "tape-scale-marks" }, [
                  e("span", null, "100"),
                  e("span", null, "50"),
                  e("span", null, "0")
                ])
              ], -1))
            ]),
            f[15] || (f[15] = e("div", { class: "tape-spool tape-spool-right" }, [
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
            onClick: f[3] || (f[3] = T(() => {
            }, ["stop"]))
          }, [
            e("div", Vn, [
              e("div", Un, [
                f[16] || (f[16] = e("span", { class: "tape-series-icon" }, "📻", -1)),
                f[17] || (f[17] = e("span", { class: "tape-series-title" }, "自建电台系列", -1)),
                e("span", Nn, l(n(I).radioSeries.length), 1)
              ]),
              e("button", {
                type: "button",
                class: "tape-series-close-btn",
                title: "关闭",
                "aria-label": "关闭",
                onClick: f[2] || (f[2] = T((H) => _.value = !1, ["stop"]))
              }, " ✕ ")
            ]),
            e("div", Fn, [
              (o(!0), s(U, null, j(n(I).radioSeries, (H) => (o(), s("div", {
                key: H.id,
                class: E(["tape-series-item", { "is-active": n(X).seriesName === H.name }]),
                onClick: T((Z) => ee(H.id), ["stop"])
              }, [
                e("div", Gn, [
                  f[18] || (f[18] = e("span", { class: "tape-series-item-bullet" }, "📼", -1)),
                  e("div", On, [
                    e("span", {
                      class: "tape-series-item-name",
                      title: H.name
                    }, l(H.name), 9, Hn),
                    e("span", Yn, l(H.count) + " 首曲目 · 顺序连播", 1)
                  ])
                ]),
                n(X).seriesName === H.name && n(X).playing ? (o(), s("span", Wn, " 播放中 ")) : (o(), s("span", Xn, " ▶ "))
              ], 10, qn))), 128)),
              n(I).radioSeries.length ? k("", !0) : (o(), s("div", jn, [...f[19] || (f[19] = [
                e("span", { class: "empty-icon" }, "📂", -1),
                e("span", { class: "empty-text" }, "暂无保存的电台系列", -1),
                e("span", { class: "empty-tip" }, "可在 B站工作区 → 电台 中添加曲目并保存为系列", -1)
              ])]))
            ])
          ])) : k("", !0)
        ], 40, Pn),
        e("div", Kn, [
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "上一首",
            "aria-label": "上一首",
            onClick: f[4] || (f[4] = (H) => n(Ee).prev())
          }, [...f[20] || (f[20] = [
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
            class: E(["tape-ctrl-btn tape-ctrl-play", { playing: n(X).playing }]),
            title: n(X).playing ? "暂停播放" : "开始播放",
            "aria-label": n(X).playing ? "暂停" : "播放",
            onClick: f[5] || (f[5] = (H) => n(Ee).togglePlay())
          }, [
            n(X).playing ? (o(), s("svg", Jn, [...f[21] || (f[21] = [
              e("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" }, null, -1)
            ])])) : (o(), s("svg", Zn, [...f[22] || (f[22] = [
              e("path", { d: "M8 5v14l11-7z" }, null, -1)
            ])]))
          ], 10, Qn),
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "下一首",
            "aria-label": "下一首",
            onClick: f[6] || (f[6] = (H) => n(Ee).next())
          }, [...f[23] || (f[23] = [
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
        e("div", el, [
          e("div", tl, [
            e("span", il, l(n(X).formattedCurrent) + " / " + l(n(X).formattedDuration), 1),
            e("div", ol, [
              e("span", {
                class: "tape-lyric-text",
                title: n(X).lyric
              }, l(n(X).lyric || "♪ 纯音乐 / 伴奏"), 9, sl)
            ]),
            e("button", {
              type: "button",
              class: "tape-mode-btn",
              title: W.value,
              "aria-label": W.value,
              onClick: f[7] || (f[7] = (H) => n(Ee).toggleMode())
            }, [
              n(X).mode === "order" ? (o(), s("svg", ll, [...f[24] || (f[24] = [
                e("polyline", { points: "17 1 21 5 17 9" }, null, -1),
                e("path", { d: "M3 11V9a4 4 0 0 1 4-4h14" }, null, -1),
                e("polyline", { points: "7 23 3 19 7 15" }, null, -1),
                e("path", { d: "M21 13v2a4 4 0 0 1-4 4H3" }, null, -1)
              ])])) : n(X).mode === "one" ? (o(), s("svg", al, [...f[25] || (f[25] = [
                tt('<polyline points="17 1 21 5 17 9" data-v-3f62391b></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14" data-v-3f62391b></path><polyline points="7 23 3 19 7 15" data-v-3f62391b></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3" data-v-3f62391b></path><text x="12" y="14.5" font-size="7.5" font-weight="900" font-family="system-ui, -apple-system, sans-serif" fill="currentColor" stroke="none" text-anchor="middle" data-v-3f62391b>1</text>', 5)
              ])])) : n(X).mode === "shuffle" ? (o(), s("svg", rl, [...f[26] || (f[26] = [
                tt('<polyline points="16 3 21 3 21 8" data-v-3f62391b></polyline><line x1="4" y1="20" x2="21" y2="3" data-v-3f62391b></line><polyline points="21 16 21 21 16 21" data-v-3f62391b></polyline><line x1="15" y1="15" x2="21" y2="21" data-v-3f62391b></line><line x1="4" y1="4" x2="9" y2="9" data-v-3f62391b></line>', 5)
              ])])) : k("", !0)
            ], 8, nl)
          ]),
          e("div", {
            ref_key: "progressLineRef",
            ref: S,
            class: "tape-progress-rail",
            role: "slider",
            "aria-valuenow": n(X).progressPercent,
            "aria-valuemin": "0",
            "aria-valuemax": "100",
            "aria-label": "电台播放进度",
            onPointerdown: ie,
            onPointermove: ne,
            onPointerup: J,
            onPointercancel: J
          }, [
            e("div", {
              class: "tape-progress-fill",
              style: Me({ width: `${n(X).progressPercent}%` })
            }, null, 4),
            e("div", {
              class: "tape-progress-handle",
              style: Me({ left: `${n(X).progressPercent}%` })
            }, null, 4)
          ], 40, ul),
          e("div", dl, [
            (o(), s("svg", cl, [
              (o(), s(U, null, j(D, (H, Z) => e("rect", {
                key: Z,
                class: "wave-bar",
                x: Z * 4,
                y: 16 - H * 0.7,
                width: "1.8",
                height: H * 0.7,
                rx: "0.9",
                style: Me({ animationDelay: `${Z % 8 * 0.12}s` })
              }, null, 12, pl)), 64))
            ]))
          ])
        ]),
        v.dockSide ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "tape-dock-collapse-btn",
          title: "收起至左下角小胶囊",
          "aria-label": "收起磁带机",
          onClick: f[8] || (f[8] = T((H) => h.value = !0, ["stop"]))
        }, [...f[27] || (f[27] = [
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
        [lt, !v.dockSide || !h.value]
      ])
    ], 38));
  }
}), bt = /* @__PURE__ */ ze(bl, [["__scopeId", "data-v-3f62391b"]]), vl = ["title"], fl = ["title"], gl = {
  key: 2,
  class: "hero-lyric-body"
}, ml = ["title"], hl = /* @__PURE__ */ De({
  __name: "BiliVideoLyricDockBar",
  props: {
    inlineHero: { type: Boolean, default: !1 }
  },
  setup(ye) {
    const v = w(340), D = w(!1), g = w(!1), S = w(!1), B = w(null), M = w(null), r = ae(() => !(!de.isOpen || !de.bvid && !de.videoSrc));
    fe(() => de.isOpen, (G) => {
      G || (I.organizer.heroLyricText = "");
    });
    function h(G) {
      const P = document.querySelector(".bili-mini-screen video, .bili-sub-screen video");
      P && (P.currentTime = Math.max(0, P.currentTime + G));
    }
    function _(G) {
      if (G.target?.closest("button, .lyric-resize-handle, input, a") || !M.value) return;
      S.value = !0;
      const O = M.value.getBoundingClientRect(), se = B.value ? B.value.x : O.left, te = B.value ? B.value.y : O.top, pe = G.clientX, b = G.clientY;
      let ie = se, ne = te;
      const J = (z) => {
        if (!S.value) return;
        const f = z.clientX - pe, H = z.clientY - b, Z = M.value?.offsetWidth || v.value, be = M.value?.offsetHeight || 32, ve = 8, $ = Math.max(ve, window.innerWidth - Z - 8), u = 8, p = Math.max(u, window.innerHeight - be - 8);
        ie = Math.min($, Math.max(ve, se + f)), ne = Math.min(p, Math.max(u, te + H)), B.value = { x: ie, y: ne };
      }, oe = () => {
        S.value = !1, window.removeEventListener("pointermove", J), window.removeEventListener("pointerup", oe), window.removeEventListener("pointercancel", oe);
        try {
          B.value && localStorage.setItem("bili_hero_lyric_pos", JSON.stringify(B.value));
        } catch {
        }
      };
      window.addEventListener("pointermove", J), window.addEventListener("pointerup", oe), window.addEventListener("pointercancel", oe);
    }
    function N() {
      B.value = null;
      try {
        localStorage.removeItem("bili_hero_lyric_pos");
      } catch {
      }
    }
    const ee = ae(() => {
      const G = {};
      return g.value || (G.width = `${v.value}px`), G.position = "fixed", G.zIndex = "1000", B.value ? (G.left = `${B.value.x}px`, G.top = `${B.value.y}px`, G.margin = "0", G.transform = "none") : (G.left = "50%", G.bottom = "24px", G.transform = "translateX(-50%)"), G;
    });
    let Y = 0, R = 0, W = "right";
    function K(G, P) {
      P.preventDefault(), P.stopPropagation(), D.value = !0, W = G, Y = P.clientX, R = v.value;
      const O = (te) => {
        if (!D.value) return;
        const pe = te.clientX - Y, b = W === "right" ? R + pe : R - pe, ie = Math.max(180, Math.min(720, b));
        v.value = ie;
      }, se = () => {
        D.value = !1, window.removeEventListener("pointermove", O), window.removeEventListener("pointerup", se), window.removeEventListener("pointercancel", se);
        try {
          localStorage.setItem("bili_hero_lyric_width", String(v.value));
        } catch {
        }
      };
      window.addEventListener("pointermove", O), window.addEventListener("pointerup", se), window.addEventListener("pointercancel", se);
    }
    return He(() => {
      try {
        const G = localStorage.getItem("bili_hero_lyric_width");
        if (G) {
          const O = parseInt(G, 10);
          Number.isFinite(O) && O >= 180 && O <= 720 && (v.value = O);
        }
        const P = localStorage.getItem("bili_hero_lyric_pos");
        if (P) {
          const O = JSON.parse(P);
          if (typeof O?.x == "number" && typeof O?.y == "number") {
            const se = Math.min(window.innerWidth - 100, Math.max(8, O.x)), te = Math.min(window.innerHeight - 40, Math.max(8, O.y));
            B.value = { x: se, y: te };
          }
        }
      } catch {
      }
    }), (G, P) => r.value ? (o(), s("aside", {
      key: 0,
      ref_key: "barRef",
      ref: M,
      class: E(["bili-hero-lyric-bar", { "is-collapsed": g.value, "is-resizing": D.value, "is-dragging": S.value, "is-floating": !!B.value }]),
      style: Me(ee.value),
      title: B.value ? "按住可拖动位置；双击还原到默认位置" : "按住可自由拖动位置",
      "aria-label": "视频实时字幕与控制",
      onPointerdown: _,
      onDblclick: N
    }, [
      g.value ? k("", !0) : (o(), s("div", {
        key: 0,
        class: "lyric-resize-handle handle-left",
        title: "按住向左拉伸宽度",
        onPointerdown: P[0] || (P[0] = (O) => K("left", O))
      }, null, 32)),
      g.value ? (o(), s("div", {
        key: 1,
        class: "hero-lyric-capsule",
        title: `视频台词：${n(I).organizer.heroLyricText || "暂无字幕"} (点击展开)`,
        onClick: P[2] || (P[2] = (O) => g.value = !1)
      }, [
        P[7] || (P[7] = e("span", { class: "capsule-icon" }, "💬", -1)),
        P[8] || (P[8] = e("span", { class: "capsule-text" }, "台词", -1)),
        e("button", {
          type: "button",
          class: "capsule-expand-btn",
          title: "展开台词栏",
          onClick: P[1] || (P[1] = T((O) => g.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, fl)) : (o(), s("div", gl, [
        e("button", {
          type: "button",
          class: "hero-lyric-seek-btn",
          title: "当前视频后退 5 秒",
          "aria-label": "后退 5 秒",
          onClick: P[3] || (P[3] = (O) => h(-5))
        }, " ‹ "),
        e("strong", {
          class: "hero-lyric-current-text",
          title: n(I).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"
        }, l(n(I).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"), 9, ml),
        e("button", {
          type: "button",
          class: "hero-lyric-seek-btn",
          title: "当前视频前进 5 秒",
          "aria-label": "前进 5 秒",
          onClick: P[4] || (P[4] = (O) => h(5))
        }, " › "),
        P[10] || (P[10] = e("span", { class: "hero-lyric-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "hero-lyric-collapse-btn",
          title: "收起台词栏",
          "aria-label": "收起台词栏",
          onClick: P[5] || (P[5] = T((O) => g.value = !0, ["stop"]))
        }, [...P[9] || (P[9] = [
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
      g.value ? k("", !0) : (o(), s("div", {
        key: 3,
        class: "lyric-resize-handle handle-right",
        title: "按住向右拉伸宽度",
        onPointerdown: P[6] || (P[6] = (O) => K("right", O))
      }, null, 32))
    ], 46, vl)) : k("", !0);
  }
}), yl = /* @__PURE__ */ ze(hl, [["__scopeId", "data-v-8f47943e"]]), _l = {
  class: "fm-pane",
  id: "pane-organizer"
}, kl = { id: "fo-body" }, $l = { class: "fo-bili-sidebar" }, wl = ["title"], Cl = { class: "fo-sidebar-toggle-title" }, xl = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Sl = ["aria-expanded", "title"], Tl = { class: "fo-sidebar-toggle-chevron" }, Ml = { class: "fo-sidebar-features-wrap" }, Dl = { class: "fo-sidebar-sub-wrap" }, Pl = ["title"], zl = { class: "fo-sidebar-sub-main" }, Bl = { class: "fo-sidebar-sub-text" }, Il = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Rl = ["title"], Ll = { class: "fo-sidebar-sub-main" }, El = { class: "fo-sidebar-sub-text" }, Al = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Vl = ["title"], Ul = { class: "fo-sidebar-sub-main" }, Nl = { class: "fo-sidebar-sub-text" }, Fl = { class: "fo-sidebar-sub-wrap fo-sidebar-recommend-wrap" }, ql = ["title"], Gl = { class: "fo-sidebar-sub-main" }, Ol = { class: "fo-sidebar-sub-text" }, Hl = { class: "fo-sidebar-sub-wrap fo-sidebar-radio-wrap" }, Yl = ["title"], Wl = { class: "fo-sidebar-sub-main" }, Xl = { class: "fo-sidebar-sub-text" }, jl = { class: "fo-sidebar-favorite-hub" }, Kl = { class: "fo-sidebar-sub-main" }, Ql = { class: "fo-sidebar-sub-text" }, Jl = ["title", "aria-label"], Zl = {
  key: 0,
  class: "fo-move-target-banner"
}, ea = {
  class: "fo-bili-folder-list",
  "aria-label": "B站收藏夹"
}, ta = {
  key: 0,
  class: "fo-bili-section-divider"
}, ia = ["onDragover", "onDragleave", "onDrop"], oa = { class: "fo-bili-section-title" }, sa = ["data-folder-id", "data-folder-kind", "draggable", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], na = ["aria-expanded", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], la = {
  class: "fo-group-caret",
  "aria-hidden": "true"
}, aa = {
  key: 0,
  class: "muted small"
}, ra = {
  key: 0,
  id: "fo-vue-main",
  class: "fo-bili-main"
}, ua = {
  key: 0,
  class: "fo-bili-loading"
}, da = {
  key: 1,
  class: "fo-bili-empty fo-bili-login-guide"
}, ca = { class: "fo-bili-login-card" }, pa = { class: "fo-bili-login-actions" }, ba = {
  key: 2,
  class: "fo-bili-empty"
}, va = { class: "fo-bili-hero fo-hero-persistent" }, fa = { class: "fo-hero-left" }, ga = ["src"], ma = {
  key: 1,
  class: "fo-folder-icon"
}, ha = { class: "fo-hero-folder-info" }, ya = ["placeholder", "aria-label"], _a = ["title"], ka = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, $a = { class: "card-fullscreen-bili-suggest-head" }, wa = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, Ca = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, xa = ["onClick", "onContextmenu"], Sa = { class: "card-fullscreen-bili-thumb" }, Ta = ["src"], Ma = { key: 0 }, Da = { class: "card-fullscreen-bili-video-copy" }, Pa = { class: "fo-bili-actions" }, za = ["title"], Ba = { class: "bili-header-msg-label" }, Ia = ["title"], Ra = ["disabled"], La = ["title"], Ea = { class: "fo-bili-toolbar" }, Aa = {
  key: 0,
  class: "fo-bili-sort"
}, Va = ["onClick"], Ua = {
  class: "fo-mini-dock-anchor",
  "aria-label": "视频标签页"
}, Na = ["title"], Fa = { class: "fo-video-tab-title" }, qa = { class: "fo-video-tab-actions" }, Ga = ["title"], Oa = {
  key: 2,
  class: "fo-bili-batch-actions"
}, Ha = { class: "fo-batch-count" }, Ya = { class: "fo-bili-grid" }, Wa = {
  key: 0,
  class: "fo-bili-empty"
}, Xa = ["data-batch-id", "onDragstart", "onContextmenu"], ja = { class: "fo-bili-thumb" }, Ka = {
  key: 0,
  class: "fo-batch-check",
  title: "选择此视频"
}, Qa = ["checked", "onChange"], Ja = ["href", "onClick"], Za = ["src"], er = { class: "fo-bili-count" }, tr = { class: "fo-bili-duration" }, ir = { class: "fo-bili-title-row" }, or = ["href", "onClick"], sr = ["aria-expanded", "onClick"], nr = {
  key: 0,
  class: "fo-card-menu"
}, lr = ["onClick"], ar = ["onClick"], rr = ["onClick"], ur = { class: "fo-bili-meta" }, dr = ["onClick"], cr = {
  key: 0,
  class: "fo-pager"
}, pr = ["disabled"], br = { class: "fo-page-num" }, vr = ["disabled"], fr = {
  key: 1,
  id: "fo-vue-cache-main",
  class: "fo-bili-main"
}, gr = { class: "fo-bili-hero fo-hero-persistent fo-cached-hero" }, mr = { class: "fo-hero-left" }, hr = { class: "fo-hero-folder-info" }, yr = { class: "fo-bili-actions" }, _r = {
  key: 0,
  class: "fo-bili-loading"
}, kr = {
  key: 1,
  class: "fo-bili-grid fo-cached-video-grid"
}, $r = {
  key: 0,
  class: "fo-bili-empty"
}, wr = { class: "fo-bili-thumb" }, Cr = ["onClick"], xr = ["src"], Sr = { class: "fo-bili-title-row" }, Tr = ["onClick"], Mr = ["onClick"], Dr = { class: "fo-bili-meta" }, Pr = {
  key: 2,
  id: "fo-vue-recommend-main",
  class: "fo-bili-main"
}, zr = { class: "fo-bili-hero" }, Br = { class: "fo-bili-heading" }, Ir = { class: "fo-feed-hero-title" }, Rr = { class: "fo-feed-badge" }, Lr = { class: "fo-bili-actions" }, Er = ["disabled"], Ar = { class: "fo-bili-toolbar" }, Vr = { class: "fo-feed-count-tag" }, Ur = {
  key: 0,
  class: "fo-bili-loading"
}, Nr = {
  key: 1,
  class: "fo-bili-empty"
}, Fr = {
  key: 2,
  class: "fo-bili-grid"
}, qr = {
  key: 0,
  class: "fo-bili-empty"
}, Gr = ["onDragstart"], Or = { class: "fo-bili-thumb" }, Hr = ["href", "onClick"], Yr = ["src"], Wr = { class: "fo-bili-count" }, Xr = { class: "fo-bili-duration" }, jr = { class: "fo-bili-title-row" }, Kr = ["href", "onClick"], Qr = ["aria-expanded", "onClick"], Jr = {
  key: 0,
  class: "fo-card-menu"
}, Zr = ["onClick"], eu = ["onClick"], tu = ["onClick"], iu = ["onClick"], ou = ["onClick"], su = { class: "fo-bili-meta" }, nu = ["onClick"], lu = {
  key: 3,
  id: "fo-vue-following-main",
  class: "fo-bili-main"
}, au = { class: "fo-bili-hero" }, ru = { class: "fo-bili-heading" }, uu = { class: "fo-feed-hero-title" }, du = { class: "fo-feed-badge" }, cu = { class: "fo-bili-actions" }, pu = ["disabled"], bu = { class: "fo-up-groups-bar" }, vu = { class: "fo-up-groups-list" }, fu = ["onClick"], gu = { class: "count" }, mu = { class: "fo-up-groups-actions" }, hu = {
  key: 0,
  class: "fo-up-members-strip"
}, yu = { class: "fo-up-members-label" }, _u = { class: "fo-up-members-list" }, ku = ["title", "onClick", "onContextmenu"], $u = ["src"], wu = { class: "fo-bili-toolbar" }, Cu = { class: "fo-feed-count-tag" }, xu = {
  key: 1,
  class: "fo-bili-loading"
}, Su = {
  key: 2,
  class: "fo-bili-empty"
}, Tu = {
  key: 3,
  class: "fo-bili-grid"
}, Mu = {
  key: 0,
  class: "fo-bili-empty"
}, Du = ["onDragstart"], Pu = { class: "fo-bili-thumb" }, zu = ["href", "onClick"], Bu = ["src"], Iu = { class: "fo-bili-count" }, Ru = { class: "fo-bili-duration" }, Lu = { class: "fo-bili-title-row" }, Eu = ["href", "onClick"], Au = ["aria-expanded", "onClick"], Vu = {
  key: 0,
  class: "fo-card-menu"
}, Uu = ["onClick"], Nu = ["onClick"], Fu = ["onClick"], qu = ["onClick"], Gu = { class: "fo-bili-meta" }, Ou = ["onClick"], Hu = { class: "fo-pager" }, Yu = ["disabled"], Wu = { class: "fo-page-num" }, Xu = ["disabled"], ju = {
  key: 4,
  id: "fo-vue-subscription-main",
  class: "fo-bili-main fo-vue-subscription-main"
}, Ku = { class: "bili-sub-vue-shell" }, Qu = {
  key: 0,
  class: "fo-bili-loading"
}, Ju = {
  key: 1,
  class: "fo-bili-empty"
}, Zu = {
  key: 2,
  class: "bili-sub-layout bili-sub-vue-layout"
}, ed = {
  key: 5,
  id: "fo-vue-radio-main",
  class: "fo-bili-main fo-vue-radio-main"
}, td = { class: "fo-bili-hero fo-radio-hero" }, id = { class: "fo-bili-actions" }, od = { class: "bili-radio-layout fo-vue-radio-layout" }, sd = { class: "bili-radio-folders" }, nd = { id: "bili-radio-folders" }, ld = ["onClick"], ad = {
  key: 0,
  class: "muted small"
}, rd = { class: "bili-radio-library" }, ud = {
  key: 0,
  role: "alert",
  class: "muted small"
}, dd = {
  id: "bili-radio-videos",
  class: "bili-radio-videos"
}, cd = ["title", "onDragstart", "onClick"], pd = ["src"], bd = { key: 1 }, vd = {
  key: 0,
  class: "muted small"
}, fd = { class: "bili-radio-editor" }, gd = { class: "bili-radio-name-row" }, md = ["placeholder", "onKeydown"], hd = { class: "bili-radio-btn-group" }, yd = { class: "bili-radio-series-dropdown-wrap" }, _d = {
  value: "",
  disabled: "",
  selected: ""
}, kd = ["value"], $d = {
  id: "bili-radio-queue",
  class: "bili-radio-queue",
  "aria-label": "电台播放队列"
}, wd = ["onClick"], Cd = { class: "bili-radio-queue-no" }, xd = ["src"], Sd = { key: 1 }, Td = ["aria-label", "onClick"], Md = {
  key: 0,
  class: "muted small"
}, Dd = { class: "bili-radio-actions" }, Pd = ["disabled"], zd = ["disabled"], Bd = ["title"], Id = {
  key: 2,
  class: "fo-context-divider"
}, Rd = /* @__PURE__ */ De({
  __name: "BilibiliWorkspace",
  setup(ye) {
    const v = w(!1);
    function D() {
      const a = I.radioSeriesName?.trim();
      if (!a) {
        v.value = !0;
        const t = document.getElementById("bili-radio-name");
        t && t.focus(), je.fetch(A("bili.radioAppName"), A("bili.radioNameEmpty"));
        return;
      }
      v.value = !1, b("radio-save", { name: a });
    }
    async function g() {
      const a = document.getElementById("bili-radio-name");
      a && (a.focus(), a.select(), je.fetch(A("bili.radioAppName"), A("bili.radioInputFocused")));
    }
    function S(a) {
      const t = a.target, i = t.value;
      if (i) {
        if (i === "__create_new__") {
          b("radio-clear"), I.radioSeriesName = "", je.fetch("哔哩哔哩电台", "已开启新系列创作，请从左侧添加视频"), t.value = "";
          return;
        }
        b("radio-load-series", i);
      }
    }
    function B(a, t) {
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
      zt.togglePanel();
    }
    const r = ae(() => I.organizer), h = w(!1), { active: _ } = St("daily-bilibili", "/bilibili.html");
    fe(() => _.value && r.value.mode === "recommendations", (a) => {
      Ae.setRecommendationsActive(a);
    }, { immediate: !0, flush: "sync" }), fe(() => _.value && r.value.mode === "following", (a) => {
      Ae.setFollowingActive(a);
    }, { immediate: !0, flush: "sync" }), fe(() => _.value && r.value.mode === "subscription", (a) => {
      Ae.setSubscriptionActive(a);
    }, { immediate: !0, flush: "sync" }), fe(() => _.value && r.value.mode === "cache", (a) => {
      a || (h.value = !1);
    });
    const N = w(r.value.query), ee = w(!1), Y = w(!1), R = w(""), W = w({ visible: !1, x: 0, y: 0, video: null, folder: null }), { menuRef: K, style: G } = It({
      visible: () => W.value.visible,
      anchor: () => W.value,
      dismiss: () => {
        W.value.visible = !1;
      }
    }), P = w(
      typeof localStorage < "u" && localStorage.getItem("bili_sidebar_features_collapsed") === "true"
    );
    function O() {
      P.value = !P.value;
      try {
        localStorage.setItem("bili_sidebar_features_collapsed", String(P.value));
      } catch {
      }
    }
    function se() {
      de.bvid && xt.open({
        bvid: de.bvid,
        cid: de.cid,
        title: de.title
      });
    }
    function te() {
      de.collapsed && Ke.toggleCollapse(), Ke.bringToFront();
    }
    function pe() {
      Ke.close();
    }
    fe(() => r.value.query, (a) => {
      N.value = a;
    }), fe(N, (a) => {
      (!a || !a.trim()) && r.value.query && b("organizer-search", "");
    });
    function b(a, t) {
      Ve.dispatch(a, t);
    }
    function ie(a) {
      b(a.group ? "toggle-folder-group" : "select-folder", { id: a.id, kind: a.kind });
    }
    const ne = w(""), J = w(""), oe = w("before"), z = w(!1);
    function f(a, t) {
      t.kind === "created" && (ne.value = t.id, a.dataTransfer?.setData("application/x-logicweaver-favorite-node", t.id), a.dataTransfer?.setData("text/plain", t.id), a.dataTransfer && (a.dataTransfer.effectAllowed = "move"));
    }
    function H(a, t) {
      if (t.kind !== "created" || !ne.value || ne.value === t.id) return;
      a.preventDefault(), a.dataTransfer && (a.dataTransfer.dropEffect = "move");
      const i = a.currentTarget;
      if (!i) return;
      const d = i.getBoundingClientRect(), V = (a.clientY - d.top) / Math.max(1, d.height), xe = t.group && V > 0.25 && V < 0.75 ? "into" : V >= 0.5 ? "after" : "before";
      J.value = t.id, oe.value = xe;
    }
    function Z(a, t) {
      const i = a.relatedTarget, d = a.currentTarget;
      d && i && d.contains(i) || J.value === t.id && (J.value = "");
    }
    function be() {
      ne.value = "", J.value = "", z.value = !1;
    }
    function ve(a, t) {
      a.preventDefault();
      const i = ne.value || a.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "", d = oe.value || (t.group ? "into" : "after");
      be(), !(!i || i === t.id || t.kind !== "created") && b("move-folder-node", { sourceId: i, targetId: t.id, mode: d });
    }
    function $(a) {
      ne.value && (a.preventDefault(), a.dataTransfer && (a.dataTransfer.dropEffect = "move"), z.value = !0);
    }
    function u(a) {
      const t = a.relatedTarget, i = a.currentTarget;
      i && t && i.contains(t) || (z.value = !1);
    }
    function p(a) {
      a.preventDefault();
      const t = ne.value || a.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
      be(), t && b("move-folder-node", { sourceId: t, targetId: "root", mode: "into" });
    }
    function L() {
      const a = N.value.trim();
      b("organizer-search", a);
    }
    function re() {
      !N.value.trim() && r.value.query && b("organizer-search", "");
    }
    const ge = w(""), Se = w(!1), Ce = w(!1), Pe = w("hot"), Be = w(""), Ue = ae(() => Pe.value === "live" ? A("bili.searchLiveTitle", { keyword: Be.value }) : A("bili.searchSuggestTitle")), Ne = ae(() => Pe.value === "live" ? A("bili.searchLiveSubtitle") : A("bili.searchSuggestSubtitle")), _e = w([]), Le = w(null), qe = w([]);
    let C = 0, y = null;
    function c(a) {
      if (!a) return null;
      const t = a.bvid || (String(a.param || "").startsWith("BV") ? a.param : "");
      if (!t && !a.aid && !a.id) return null;
      const i = String(a.pic || a.cover || "").replace(/^http:/, "https:"), d = i.startsWith("//") ? `https:${i}` : i, V = String(a.title || "").replace(/<[^>]+>/g, ""), xe = Number(a.duration || 0), _t = xe > 0 ? `${Math.floor(xe / 60)}:${String(xe % 60).padStart(2, "0")}` : String(a.duration || ""), et = a.stat?.view || a.play || 0, kt = Number(et) >= 1e4 ? `${(Number(et) / 1e4).toFixed(1)}万` : String(Number(et || 0)), $t = a.owner?.name || a.name || a.author || A("bili.upDefault");
      return {
        bvid: t,
        aid: String(a.aid || a.id || ""),
        title: V,
        cover: d,
        durationText: _t,
        playText: kt,
        upper: $t
      };
    }
    async function x() {
      if (Pe.value = "hot", Se.value = !0, qe.value.length && Date.now() - C < 9e4) {
        _e.value = qe.value;
        return;
      }
      Ce.value = !0;
      try {
        const t = await (await fetch("https://api.bilibili.com/x/web-interface/index/top/feed/rcmd?ps=8&fresh_idx=1", { credentials: "include" })).json();
        let i = Array.isArray(t.data?.item) ? t.data.item : [];
        if (!i.length) {
          const xe = await (await fetch("https://api.bilibili.com/x/web-interface/popular?ps=8&pn=1", { credentials: "include" })).json();
          i = Array.isArray(xe.data?.list) ? xe.data.list : [];
        }
        const d = i.map(c).filter(Boolean);
        qe.value = d, C = Date.now(), ge.value.trim() || (_e.value = d);
      } catch {
        _e.value = [];
      } finally {
        Ce.value = !1;
      }
    }
    function q() {
      ge.value.trim() ? Q(ge.value.trim()) : x();
    }
    function F() {
      const a = ge.value.trim();
      if (clearTimeout(y), !a) {
        x();
        return;
      }
      y = setTimeout(() => {
        Q(a);
      }, 320);
    }
    async function Q(a) {
      Se.value = !0, Pe.value = "live", Be.value = a, Ce.value = !0;
      try {
        let t = null;
        if (window.LogicWeaverBiliSearchActions?.search)
          try {
            t = await window.LogicWeaverBiliSearchActions.search(a);
          } catch {
          }
        if (!t || t.code !== 0) {
          const d = `search_type=video&keyword=${encodeURIComponent(a)}&page=1&page_size=12`;
          t = await (await fetch(`https://api.bilibili.com/x/web-interface/search/type?${d}`, { credentials: "include" })).json();
        }
        if (ge.value.trim() !== a) return;
        const i = Array.isArray(t?.data?.result) ? t.data.result : [];
        _e.value = i.slice(0, 10).map(c).filter(Boolean);
      } catch {
        _e.value = [];
      } finally {
        Ce.value = !1;
      }
    }
    function ue(a) {
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
    function le(a, t) {
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
    function Ye() {
      const a = ge.value.trim();
      if (Se.value = !1, !a) {
        x();
        return;
      }
      window.open(`https://search.bilibili.com/video?keyword=${encodeURIComponent(a)}`, "_blank");
    }
    function Ge(a) {
      Le.value && !Le.value.contains(a.target) && (Se.value = !1);
    }
    function Oe(a) {
      W.value.visible = !1, R.value = R.value === a ? "" : a;
    }
    function We(a, t, i = !0) {
      R.value = "", W.value = {
        visible: !0,
        x: a.clientX,
        y: a.clientY,
        video: t,
        folder: i && I.activeFolderId ? { id: String(I.activeFolderId), title: r.value.folderTitle } : null
      };
    }
    function ke(a) {
      if (a instanceof KeyboardEvent) {
        a.key === "Escape" && (R.value = "", W.value.visible = !1, r.value.isTargetPickMode && b("organizer-cancel-move-target"));
        return;
      }
      const t = a.target;
      t?.closest(".fo-card-menu, .fo-card-more") || (R.value = ""), t?.closest(".fo-context-menu") || (W.value.visible = !1);
    }
    const Fe = typeof document < "u" && document.body.classList.contains("bili-standalone-body");
    function at() {
      !Y.value || ee.value || r.value.loading || (ee.value = !0, b("organizer-open"));
    }
    fe(() => r.value.loading, (a) => {
      !a && !r.value.folders.length && at();
    }), He(() => {
      import("./bilibili-channel.service-DP0D98i8.js").catch((a) => console.error("[Bilibili] 频道动作服务加载失败", a)), Y.value = !0, Ve.loadOrganizer(), at(), document.addEventListener("pointerdown", ke, !0), document.addEventListener("pointerdown", Ge), window.addEventListener("keydown", ke), window.setBiliMiniDockVisible?.(!0), requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }), fe(() => [r.value.videos, r.value.mode], () => {
      requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }, { flush: "post" }), ft(() => {
      Ae.setRecommendationsActive(!1), Ae.setFollowingActive(!1), Ae.setSubscriptionActive(!1), Y.value = !1, document.removeEventListener("pointerdown", ke, !0), document.removeEventListener("pointerdown", Ge), window.removeEventListener("keydown", ke);
    });
    function Je(a, t) {
      R.value = "", W.value.visible = !1;
      const i = String(typeof a == "object" ? a.id || a.bvid || a.aid || "" : a), d = typeof a == "object" ? a : r.value.videos.find((V) => String(V.id) === i);
      b("organizer-video-action", { id: i, video: d, action: t });
    }
    async function Ie(a) {
      const { video: t, folder: i } = W.value;
      if (W.value.visible = !1, a === "share-chat") {
        if (!t) return;
        try {
          const { chatService: d } = await import("./view-styles-Dt1HAuh9.js").then((xe) => xe.aG), { windowManagerController: V } = await import("./window-manager.store-BdI_8a-H.js").then((xe) => xe.n);
          d.sendBiliShare({
            bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
            aid: t.aid,
            title: t.title,
            cover: t.cover,
            upName: t.author,
            upMid: t.authorMid,
            upFace: t.authorFace,
            play: t.playCount
          }), V.open("chat");
        } catch (d) {
          console.warn("分享到聊天室失败", d);
        }
        return;
      }
      t && b("organizer-video-action", { id: t.id || "", video: t, action: a });
    }
    function gt(a) {
      const t = I.radioSeriesName?.trim();
      let i = I.radioSeries.find((d) => d.name === t);
      if (!i && I.radioQueue.length && (i = {
        id: `series_${Date.now()}`,
        name: t || "未命名电台系列",
        count: I.radioQueue.length,
        items: I.radioQueue
      }), !i || !i.items?.length) {
        je.fetch("哔哩哔哩电台", "当前没有可分享的系列曲目，请先添加曲目");
        return;
      }
      ct.sendBiliSeriesShare(i, a);
    }
    function mt(a) {
      const { video: t } = W.value;
      W.value.visible = !1, t && ct.sendBiliShare({
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
    function Ze(a, t) {
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
      const d = rt(t.title);
      a.dataTransfer.setDragImage(d, 72, 25), setTimeout(() => {
        d.parentNode && d.parentNode.removeChild(d);
      }, 0);
    }
    return (a, t) => (o(), s("section", {
      id: "daily-bilibili",
      class: E(["card wide", { "card-fullscreen": n(Fe) || n(ot).activeId === "daily-bilibili" }])
    }, [
      e("div", _l, [
        e("div", kl, [
          e("div", {
            class: E(["fo-bili-layout", { "fo-picking-move-target": r.value.isTargetPickMode }]),
            "data-vue-organizer-shell": "true",
            onWheel: ht
          }, [
            e("aside", $l, [
              e("div", {
                class: E(["fo-sidebar-toggle-bar", { "is-collapsed": P.value }]),
                title: P.value ? n(A)("bili.channel.expandTip") : n(A)("bili.channel.collapseTip"),
                onClick: O
              }, [
                e("div", Cl, [
                  t[51] || (t[51] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                  e("span", null, l(n(A)("bili.channel.title")), 1),
                  P.value ? (o(), s("span", xl, "5")) : k("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "fo-sidebar-toggle-action",
                  "aria-expanded": !P.value,
                  title: P.value ? n(A)("bili.channel.expand") : n(A)("bili.channel.collapse")
                }, [
                  e("span", null, l(P.value ? n(A)("bili.channel.expand") : n(A)("bili.channel.collapse")), 1),
                  e("span", Tl, l(P.value ? "▾" : "▴"), 1)
                ], 8, Sl)
              ], 10, wl),
              ce(e("div", Ml, [
                e("div", Dl, [
                  e("button", {
                    id: "fo-sidebar-sub-btn",
                    type: "button",
                    class: E(["fo-sidebar-sub-btn", { on: r.value.mode === "subscription" }]),
                    title: n(A)("bili.channel.subVideoTip"),
                    onClick: t[0] || (t[0] = (i) => b("open-sub-video"))
                  }, [
                    e("div", zl, [
                      t[52] || (t[52] = e("span", { class: "fo-sidebar-sub-icon" }, "🎬", -1)),
                      e("div", Bl, [
                        e("strong", null, l(n(A)("bili.channel.subVideo")), 1),
                        e("small", null, l(n(A)("bili.channel.subVideoSub")), 1)
                      ])
                    ]),
                    t[53] || (t[53] = e("span", { class: "fo-sidebar-sub-badge" }, "NEW", -1))
                  ], 10, Pl)
                ]),
                e("div", Il, [
                  e("button", {
                    id: "fo-sidebar-cache-btn",
                    type: "button",
                    class: E(["fo-sidebar-sub-btn", { on: r.value.mode === "cache" }]),
                    title: n(A)("bili.channel.cacheVideoTip"),
                    onClick: t[1] || (t[1] = (i) => b("open-cache"))
                  }, [
                    e("div", Ll, [
                      t[54] || (t[54] = e("span", { class: "fo-sidebar-sub-icon" }, "💾", -1)),
                      e("div", El, [
                        e("strong", null, l(n(A)("bili.channel.cacheVideo")), 1),
                        e("small", null, l(n(A)("bili.channel.cacheVideoSub")), 1)
                      ])
                    ]),
                    t[55] || (t[55] = e("span", { class: "fo-sidebar-sub-badge" }, "LOCAL", -1))
                  ], 10, Rl)
                ]),
                e("div", Al, [
                  e("button", {
                    id: "fo-sidebar-following-btn",
                    type: "button",
                    class: E(["fo-sidebar-sub-btn", { on: r.value.mode === "following" }]),
                    title: n(A)("bili.channel.followingTip"),
                    onClick: t[2] || (t[2] = (i) => b("open-following"))
                  }, [
                    e("div", Ul, [
                      t[56] || (t[56] = e("span", { class: "fo-sidebar-sub-icon" }, "📺", -1)),
                      e("div", Nl, [
                        e("strong", null, l(n(A)("bili.channel.following")), 1),
                        e("small", null, l(n(A)("bili.channel.followingSub")), 1)
                      ])
                    ]),
                    t[57] || (t[57] = e("span", { class: "fo-sidebar-sub-badge" }, "FEED", -1))
                  ], 10, Vl)
                ]),
                e("div", Fl, [
                  e("button", {
                    id: "fo-sidebar-recommend-btn",
                    type: "button",
                    class: E(["fo-sidebar-sub-btn", { on: r.value.mode === "recommendations" }]),
                    title: n(A)("bili.channel.forYouTip"),
                    onClick: t[3] || (t[3] = (i) => b("open-recommendations"))
                  }, [
                    e("div", Gl, [
                      t[58] || (t[58] = e("span", { class: "fo-sidebar-sub-icon" }, "✨", -1)),
                      e("div", Ol, [
                        e("strong", null, l(n(A)("bili.channel.forYou")), 1),
                        e("small", null, l(n(A)("bili.channel.forYouSub")), 1)
                      ])
                    ]),
                    t[59] || (t[59] = e("span", { class: "fo-sidebar-sub-badge" }, "FOR YOU", -1))
                  ], 10, ql)
                ]),
                e("div", Hl, [
                  e("button", {
                    id: "fo-sidebar-radio-btn",
                    type: "button",
                    class: E(["fo-sidebar-sub-btn", { on: r.value.mode === "radio" }]),
                    title: n(A)("bili.channel.radioTip"),
                    onClick: t[4] || (t[4] = (i) => b("open-radio"))
                  }, [
                    e("div", Wl, [
                      t[60] || (t[60] = e("span", { class: "fo-sidebar-sub-icon" }, "📻", -1)),
                      e("div", Xl, [
                        e("strong", null, l(n(A)("bili.channel.radio")), 1),
                        e("small", null, l(n(A)("bili.channel.radioSub")), 1)
                      ])
                    ]),
                    t[61] || (t[61] = e("span", { class: "fo-sidebar-sub-badge" }, "RADIO", -1))
                  ], 10, Yl)
                ])
              ], 512), [
                [lt, !P.value]
              ]),
              e("div", jl, [
                e("div", Kl, [
                  t[62] || (t[62] = e("span", { class: "fo-sidebar-sub-icon" }, "📁", -1)),
                  e("div", Ql, [
                    e("strong", null, l(n(A)("bili.channel.foldersHub")), 1),
                    e("small", null, l(n(A)("bili.channel.foldersHubSub")), 1)
                  ])
                ]),
                e("button", {
                  class: "fo-sidebar-hub-add",
                  type: "button",
                  title: n(A)("bili.channel.createFolderTip"),
                  "aria-label": n(A)("bili.channel.createFolderTip"),
                  onClick: t[5] || (t[5] = (i) => b("create-bili-folder"))
                }, "＋", 8, Jl)
              ]),
              r.value.isTargetPickMode ? (o(), s("div", Zl, [
                t[63] || (t[63] = e("div", { class: "fo-move-target-tip" }, [
                  e("span", { class: "fo-move-target-dot" }),
                  e("span", null, [
                    he("请点击"),
                    e("strong", null, "自建收藏夹"),
                    he("移入")
                  ])
                ], -1)),
                e("button", {
                  type: "button",
                  class: "fo-move-target-cancel",
                  title: "取消移动 (按 Esc 也可取消)",
                  onClick: t[6] || (t[6] = (i) => b("organizer-cancel-move-target"))
                }, " ✕ 取消 ")
              ])) : k("", !0),
              e("nav", ea, [
                (o(!0), s(U, null, j(r.value.folders, (i, d) => (o(), s(U, {
                  key: `${i.group ? "group" : "folder"}:${i.id}`
                }, [
                  d > 0 && r.value.folders[d - 1]?.kind !== i.kind ? (o(), s("div", ta)) : k("", !0),
                  d === 0 || r.value.folders[d - 1]?.kind !== i.kind ? (o(), s("div", {
                    key: 1,
                    class: E(["fo-bili-section-head fo-vue-section-head", { "drag-into": i.kind === "created" && z.value }]),
                    onDragover: (V) => i.kind === "created" ? $(V) : void 0,
                    onDragleave: (V) => i.kind === "created" ? u(V) : void 0,
                    onDrop: (V) => i.kind === "created" ? p(V) : void 0
                  }, [
                    e("span", oa, [
                      e("b", null, l(i.kind === "collected" ? "我追的合集/收藏夹" : i.kind === "other" ? "其他收藏" : "我创建的收藏夹"), 1)
                    ]),
                    i.kind === "created" ? (o(), s("button", {
                      key: 0,
                      class: "fo-bili-section-add-btn",
                      type: "button",
                      title: "新建插件分组",
                      "aria-label": "新建插件分组",
                      onClick: t[7] || (t[7] = T((V) => b("create-local-group"), ["stop"]))
                    }, "＋")) : k("", !0)
                  ], 42, ia)) : k("", !0),
                  i.group ? (o(), s("div", {
                    key: 3,
                    class: E(["fo-bili-group-label", {
                      collapsed: i.collapsed,
                      dragging: ne.value === i.id,
                      "drag-before": J.value === i.id && oe.value === "before",
                      "drag-after": J.value === i.id && oe.value === "after",
                      "drag-into": J.value === i.id && oe.value === "into"
                    }]),
                    style: Me({ "--fo-depth": i.depth }),
                    role: "button",
                    tabindex: "0",
                    "aria-expanded": !i.collapsed,
                    draggable: !0,
                    onClick: (V) => ie(i),
                    onKeydown: [
                      Re(T((V) => ie(i), ["prevent"]), ["enter"]),
                      Re(T((V) => ie(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (V) => f(V, i),
                    onDragover: (V) => H(V, i),
                    onDragleave: (V) => Z(V, i),
                    onDrop: (V) => ve(V, i),
                    onDragend: be
                  }, [
                    e("i", la, l(i.collapsed ? "›" : "⌄"), 1),
                    t[65] || (t[65] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, na)) : (o(), s("div", {
                    key: 2,
                    role: "button",
                    tabindex: "0",
                    class: E(["fo-bili-folder", {
                      on: i.selected,
                      dragging: ne.value === i.id,
                      "drag-before": J.value === i.id && oe.value === "before",
                      "drag-after": J.value === i.id && oe.value === "after",
                      "drag-into": J.value === i.id && oe.value === "into",
                      "target-candidate": r.value.isTargetPickMode && i.kind === "created" && !i.selected
                    }]),
                    "data-folder-id": i.id,
                    "data-folder-kind": i.kind,
                    style: Me({ "--fo-depth": i.depth }),
                    draggable: i.kind === "created",
                    onClick: (V) => ie(i),
                    onKeydown: [
                      Re(T((V) => ie(i), ["prevent"]), ["enter"]),
                      Re(T((V) => ie(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (V) => f(V, i),
                    onDragover: (V) => H(V, i),
                    onDragleave: (V) => Z(V, i),
                    onDrop: (V) => ve(V, i),
                    onDragend: be
                  }, [
                    t[64] || (t[64] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, sa))
                ], 64))), 128)),
                !r.value.loading && !r.value.error && !r.value.folders.length ? (o(), s("p", aa, "暂无可用收藏夹。")) : k("", !0)
              ])
            ]),
            r.value.mode === "organizer" ? (o(), s("section", ra, [
              r.value.loading ? (o(), s("div", ua, [...t[66] || (t[66] = [
                e("i", null, null, -1),
                e("span", null, "正在读取 B站收藏内容…", -1)
              ])])) : r.value.error && r.value.error.includes("未登录") ? (o(), s("div", da, [
                e("div", ca, [
                  t[68] || (t[68] = e("span", { class: "fo-bili-login-icon" }, "📺", -1)),
                  t[69] || (t[69] = e("h3", null, "未检测到哔哩哔哩登录状态", -1)),
                  t[70] || (t[70] = e("p", null, "tab-Project 直接复用当前浏览器的 B站 网页会话，无需输入账号密码或扫码授权。", -1)),
                  e("div", pa, [
                    t[67] || (t[67] = e("a", {
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
              ])) : r.value.error ? (o(), s("p", ba, l(r.value.error), 1)) : (o(), s(U, { key: 3 }, [
                e("header", va, [
                  e("div", fa, [
                    e("div", {
                      class: E(["fo-bili-cover", { "fo-vue-cover-image": r.value.folderCover }])
                    }, [
                      r.value.folderCover ? (o(), s("img", {
                        key: 0,
                        src: r.value.folderCover,
                        alt: "",
                        referrerpolicy: "no-referrer"
                      }, null, 8, ga)) : (o(), s("i", ma))
                    ], 2),
                    e("div", ha, [
                      e("h3", null, l(r.value.folderTitle), 1),
                      e("p", null, l(r.value.folderSubtitle), 1)
                    ])
                  ]),
                  e("div", {
                    class: "card-fullscreen-bili-search fo-hero-bili-search",
                    ref_key: "searchHostRef",
                    ref: Le
                  }, [
                    e("form", {
                      class: "card-fullscreen-bili-searchbar",
                      role: "search",
                      onSubmit: T(Ye, ["prevent"])
                    }, [
                      ce(e("input", {
                        "onUpdate:modelValue": t[9] || (t[9] = (i) => ge.value = i),
                        type: "search",
                        autocomplete: "off",
                        placeholder: n(A)("bili.workspace.searchPlaceholder"),
                        "aria-label": n(A)("bili.workspace.searchAria"),
                        onFocus: q,
                        onInput: F
                      }, null, 40, ya), [
                        [Te, ge.value]
                      ]),
                      e("button", {
                        type: "submit",
                        title: n(A)("bili.workspace.searchBtnTip")
                      }, "⌕", 8, _a)
                    ], 32),
                    Se.value ? (o(), s("div", ka, [
                      e("div", $a, [
                        e("span", null, l(Ue.value), 1),
                        e("small", null, l(Ne.value), 1)
                      ]),
                      Ce.value ? (o(), s("p", wa, "正在获取推荐 / 搜索中…")) : !_e.value.length && !Ce.value ? (o(), s("p", Ca, "没有找到相关视频，回车可在 B站 全网搜索")) : (o(!0), s(U, { key: 2 }, j(_e.value, (i) => (o(), s("button", {
                        key: i.bvid || i.aid,
                        type: "button",
                        class: "card-fullscreen-bili-video-row",
                        role: "option",
                        onClick: (d) => ue(i),
                        onContextmenu: T((d) => le(d, i), ["prevent"])
                      }, [
                        e("span", Sa, [
                          e("img", {
                            src: i.cover,
                            alt: "",
                            referrerpolicy: "no-referrer",
                            loading: "lazy"
                          }, null, 8, Ta),
                          i.durationText ? (o(), s("i", Ma, l(i.durationText), 1)) : k("", !0)
                        ]),
                        e("span", Da, [
                          e("strong", null, l(i.title), 1),
                          e("small", null, l(i.upper) + " · " + l(i.playText) + "播放", 1)
                        ])
                      ], 40, xa))), 128))
                    ])) : k("", !0)
                  ], 512),
                  e("div", Pa, [
                    e("button", {
                      id: "bili-header-msg-center-btn",
                      class: E(["fm-tab bili-header-msg-btn hero-action-btn", { "is-active": n(Bt).isOpen }]),
                      type: "button",
                      title: n(A)("bili.workspace.msgCenterTip"),
                      onClick: M
                    }, [
                      t[71] || (t[71] = e("span", { class: "bili-header-msg-icon" }, "🔔", -1)),
                      e("span", Ba, l(n(A)("bili.workspace.msgBtn")), 1)
                    ], 10, za),
                    e("button", {
                      id: "bili-up-group-manager-top",
                      class: "fm-tab bili-header-up-group-btn hero-action-btn",
                      type: "button",
                      title: n(A)("bili.workspace.upGroupManagerTip"),
                      onClick: t[10] || (t[10] = (i) => b("manage-up-groups"))
                    }, l(n(A)("bili.workspace.upGroupManager")), 9, Ia),
                    e("button", {
                      type: "button",
                      class: "primary hero-action-btn",
                      disabled: !r.value.videos.length,
                      onClick: t[11] || (t[11] = (i) => b("organizer-batch-toggle"))
                    }, l(r.value.batchMode ? n(A)("bili.workspace.batchBack") : n(A)("bili.workspace.batch")), 9, Ra),
                    e("button", {
                      type: "button",
                      class: "hero-action-btn btn-refresh",
                      title: n(A)("bili.workspace.refreshFolderTip"),
                      onClick: t[12] || (t[12] = (i) => b("organizer-refresh"))
                    }, "↻", 8, La)
                  ])
                ]),
                e("div", Ea, [
                  r.value.batchMode ? k("", !0) : (o(), s("div", Aa, [
                    (o(!0), s(U, null, j([{ id: "fav_time", text: n(A)("bili.sort.favTime") }, { id: "view", text: n(A)("bili.sort.view") }, { id: "pubtime", text: n(A)("bili.sort.pubTime") }], (i) => (o(), s("button", {
                      key: i.id,
                      type: "button",
                      class: E({ on: r.value.sort === i.id }),
                      onClick: (d) => b("organizer-sort", i.id)
                    }, l(i.text), 11, Va))), 128))
                  ])),
                  e("div", Ua, [
                    n(de).isOpen && n(de).bvid ? (o(), s("div", {
                      key: 0,
                      class: E(["fo-video-tab-item", { "is-collapsed": n(de).collapsed }]),
                      title: n(de).title
                    }, [
                      e("div", {
                        class: "fo-video-tab-meta",
                        onClick: te
                      }, [
                        e("span", {
                          class: E(["fo-video-tab-pulse", { playing: n(de).isPlaying }])
                        }, null, 2),
                        e("span", Fa, l(n(de).title), 1)
                      ]),
                      e("div", qa, [
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-close",
                          title: "关闭视频",
                          onClick: T(pe, ["stop"])
                        }, " ✕ "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-sub",
                          title: "查看该视频完整纯文本字幕",
                          onClick: T(se, ["stop"])
                        }, " 字幕 "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-expand",
                          title: n(de).collapsed ? "放大恢复视频小窗" : "聚焦视频小窗",
                          onClick: T(te, ["stop"])
                        }, " 放大 ", 8, Ga)
                      ])
                    ], 10, Na)) : k("", !0)
                  ]),
                  r.value.batchMode ? (o(), s("div", Oa, [
                    e("span", Ha, "已选择 " + l(r.value.selectedCount) + " 项", 1),
                    e("button", {
                      type: "button",
                      onClick: t[14] || (t[14] = (i) => b("organizer-batch-all"))
                    }, "全选/取消全选"),
                    e("button", {
                      type: "button",
                      class: E({ "picking-target": r.value.isTargetPickMode }),
                      onClick: t[15] || (t[15] = (i) => r.value.isTargetPickMode ? b("organizer-cancel-move-target") : b("organizer-batch-move"))
                    }, l(r.value.isTargetPickMode ? "✕ 取消移动" : "移动到"), 3),
                    e("button", {
                      type: "button",
                      onClick: t[16] || (t[16] = (i) => b("organizer-batch-cache"))
                    }, "缓存所选"),
                    e("button", {
                      type: "button",
                      onClick: t[17] || (t[17] = (i) => b("organizer-batch-unfavorite"))
                    }, "取消收藏")
                  ])) : (o(), s("form", {
                    key: 1,
                    class: "fo-bili-search",
                    onSubmit: T(L, ["prevent"])
                  }, [
                    ce(e("input", {
                      "onUpdate:modelValue": t[13] || (t[13] = (i) => N.value = i),
                      type: "search",
                      placeholder: "请输入关键词",
                      "aria-label": "搜索当前收藏夹",
                      onInput: re,
                      onSearch: re
                    }, null, 544), [
                      [Te, N.value]
                    ]),
                    t[72] || (t[72] = e("button", {
                      type: "submit",
                      title: "搜索"
                    }, "⌕", -1))
                  ], 32))
                ]),
                e("div", Ya, [
                  r.value.videos.length ? k("", !0) : (o(), s("p", Wa, l(r.value.query ? "没有找到匹配的视频。" : "这个收藏夹是空的。"), 1)),
                  (o(!0), s(U, null, j(r.value.videos, (i) => (o(), s("article", {
                    key: i.id,
                    class: E(["fo-bili-card", { "batch-selected": i.selected, "fo-single-moving": r.value.movingVideoId === i.id }]),
                    "data-batch-id": i.id,
                    draggable: "true",
                    onDragstart: (d) => Ze(d, i),
                    onContextmenu: T((d) => We(d, i), ["prevent", "stop"])
                  }, [
                    e("div", ja, [
                      r.value.batchMode ? (o(), s("label", Ka, [
                        e("input", {
                          type: "checkbox",
                          checked: i.selected,
                          onChange: (d) => b("organizer-batch-select", i.id)
                        }, null, 40, Qa),
                        t[73] || (t[73] = e("span", null, "✓", -1))
                      ])) : k("", !0),
                      e("a", {
                        class: "fo-cover-link",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: T((d) => b("organizer-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, Za)
                      ], 8, Ja),
                      e("span", er, "▣ " + l(i.playCount), 1),
                      e("span", tr, l(i.duration), 1)
                    ]),
                    e("div", ir, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: T((d) => b("organizer-play-video", i), ["prevent"])
                      }, l(i.title), 9, or),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": R.value === i.id,
                        onClick: T((d) => Oe(i.id), ["stop"])
                      }, "⋮", 8, sr),
                      R.value === i.id ? (o(), s("div", nr, [
                        i.writable ? (o(), s("button", {
                          key: 0,
                          type: "button",
                          class: "danger",
                          onClick: (d) => Je(i.id, "delete")
                        }, "取消收藏", 8, lr)) : k("", !0),
                        i.writable ? (o(), s("button", {
                          key: 1,
                          type: "button",
                          onClick: (d) => Je(i.id, "move")
                        }, "移动到", 8, ar)) : k("", !0),
                        e("button", {
                          type: "button",
                          onClick: (d) => Je(i.id, "subtitle")
                        }, "字幕", 8, rr)
                      ])) : k("", !0)
                    ]),
                    e("div", ur, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: T((d) => B(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, l(i.author), 9, dr),
                      e("span", null, "收藏于 " + l(i.favoriteDate), 1)
                    ])
                  ], 42, Xa))), 128))
                ]),
                r.value.totalPages > 1 ? (o(), s("div", cr, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: r.value.page <= 1,
                    onClick: t[18] || (t[18] = (i) => b("organizer-page", r.value.page - 1))
                  }, "‹ 上一页", 8, pr),
                  e("span", br, l(r.value.page) + " / " + l(r.value.totalPages), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: r.value.page >= r.value.totalPages,
                    onClick: t[19] || (t[19] = (i) => b("organizer-page", r.value.page + 1))
                  }, "下一页 ›", 8, vr)
                ])) : k("", !0)
              ], 64))
            ])) : r.value.mode === "cache" ? (o(), s("section", fr, [
              h.value ? (o(), Xe(ms, {
                key: 0,
                active: n(_),
                onBack: t[20] || (t[20] = (i) => h.value = !1)
              }, null, 8, ["active"])) : (o(), s(U, { key: 1 }, [
                e("header", gr, [
                  e("div", mr, [
                    t[75] || (t[75] = e("div", { class: "fo-bili-cover" }, "💾", -1)),
                    e("div", hr, [
                      t[74] || (t[74] = e("h3", null, "缓存视频", -1)),
                      e("p", null, l(r.value.cachedVideos.length) + " 个缓存记录 · 点击缓存设置管理存放目录", 1)
                    ])
                  ]),
                  e("div", yr, [
                    e("button", {
                      type: "button",
                      class: "primary",
                      onClick: t[21] || (t[21] = (i) => b("organizer-open"))
                    }, "返回收藏夹"),
                    e("button", {
                      type: "button",
                      onClick: t[22] || (t[22] = (i) => h.value = !0)
                    }, "缓存设置")
                  ])
                ]),
                r.value.cacheLoading ? (o(), s("div", _r, [...t[76] || (t[76] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取本地缓存…", -1)
                ])])) : (o(), s("div", kr, [
                  r.value.cachedVideos.length ? k("", !0) : (o(), s("p", $r, "还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。")),
                  (o(!0), s(U, null, j(r.value.cachedVideos, (i) => (o(), s("article", {
                    key: i.id,
                    class: "fo-bili-card fo-cached-video-card"
                  }, [
                    e("div", wr, [
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
                        }, null, 8, xr),
                        t[77] || (t[77] = e("span", { class: "fo-cached-local-badge" }, "LOCAL", -1))
                      ], 8, Cr)
                    ]),
                    e("div", Sr, [
                      e("button", {
                        class: "fo-title-link fo-bili-title fo-cached-title",
                        type: "button",
                        onClick: (d) => b("cache-play", i.id)
                      }, l(i.title), 9, Tr),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "删除缓存",
                        onClick: (d) => b("cache-delete", i.id)
                      }, "×", 8, Mr)
                    ]),
                    e("div", Dr, [
                      e("span", null, l(i.sizeText), 1),
                      e("span", null, "缓存于 " + l(i.cachedDate), 1)
                    ])
                  ]))), 128))
                ]))
              ], 64))
            ])) : r.value.mode === "recommendations" ? (o(), s("section", Pr, [
              e("header", zr, [
                t[78] || (t[78] = e("div", { class: "fo-bili-cover fo-vue-recommend-cover" }, [
                  e("span", null, "✨")
                ], -1)),
                e("div", Br, [
                  e("div", Ir, [
                    e("h3", null, l(r.value.specialTitle), 1),
                    e("span", Rr, l(r.value.specialBadge), 1)
                  ]),
                  e("p", null, l(r.value.specialSubtitle), 1)
                ]),
                e("div", Lr, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !r.value.specialVideos.length,
                    onClick: t[23] || (t[23] = (i) => b("special-play-page"))
                  }, "▶ 播放本页", 8, Er),
                  e("button", {
                    type: "button",
                    onClick: t[24] || (t[24] = (i) => b("recommendations-refresh"))
                  }, "↻ 换一批"),
                  e("button", {
                    type: "button",
                    onClick: t[25] || (t[25] = (i) => b("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", Ar, [
                t[79] || (t[79] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "🔥 猜你喜欢与热门精选")
                ], -1)),
                e("div", Vr, "本页共 " + l(r.value.specialVideos.length) + " 个视频", 1)
              ]),
              r.value.specialLoading ? (o(), s("div", Ur, [...t[80] || (t[80] = [
                e("i", null, null, -1),
                e("span", null, "正在加载个性化推荐视频…", -1)
              ])])) : r.value.specialError ? (o(), s("p", Nr, l(r.value.specialError), 1)) : (o(), s("div", Fr, [
                r.value.specialVideos.length ? k("", !0) : (o(), s("p", qr, "暂无推荐视频。")),
                (o(!0), s(U, null, j(r.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (d) => Ze(d, i)
                }, [
                  e("div", Or, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: T((d) => b("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                        alt: ""
                      }, null, 8, Yr)
                    ], 8, Hr),
                    e("span", Wr, "▣ " + l(i.playCount), 1),
                    e("span", Xr, l(i.duration), 1)
                  ]),
                  e("div", jr, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: T((d) => b("special-play-video", i), ["prevent"])
                    }, l(i.title), 9, Kr),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": R.value === i.id,
                      onClick: T((d) => Oe(i.id), ["stop"])
                    }, "⋮", 8, Qr),
                    R.value === i.id ? (o(), s("div", Jr, [
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { video: i, id: i.id, action: "collect-inbox" }), R.value = "";
                        }
                      }, "📥 添加到收集箱", 8, Zr),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { id: i.id, action: "play" }), R.value = "";
                        }
                      }, "本地播放与评论", 8, eu),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { id: i.id, action: "subtitle" }), R.value = "";
                        }
                      }, "字幕提取", 8, tu),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { id: i.id, action: "cache" }), R.value = "";
                        }
                      }, "缓存视频", 8, iu),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { id: i.id, action: "open" }), R.value = "";
                        }
                      }, "打开网页", 8, ou)
                    ])) : k("", !0)
                  ]),
                  e("div", su, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: T((d) => B(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, l(i.author), 9, nu),
                    e("span", null, l(i.favoriteDate), 1)
                  ])
                ], 40, Gr))), 128))
              ]))
            ])) : r.value.mode === "following" ? (o(), s("section", lu, [
              e("header", au, [
                t[81] || (t[81] = e("div", { class: "fo-bili-cover fo-vue-following-cover" }, [
                  e("span", null, "📺")
                ], -1)),
                e("div", ru, [
                  e("div", uu, [
                    e("h3", null, l(r.value.specialTitle), 1),
                    e("span", du, l(r.value.specialBadge), 1)
                  ]),
                  e("p", null, l(r.value.specialSubtitle), 1)
                ]),
                e("div", cu, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !r.value.specialVideos.length,
                    onClick: t[26] || (t[26] = (i) => b("special-play-page"))
                  }, "▶ 播放本页", 8, pu),
                  e("button", {
                    type: "button",
                    onClick: t[27] || (t[27] = (i) => b("following-refresh"))
                  }, "↻"),
                  e("button", {
                    type: "button",
                    onClick: t[28] || (t[28] = (i) => b("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", bu, [
                e("div", vu, [
                  (o(!0), s(U, null, j(r.value.followingGroups, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: E(["fo-up-group-chip", { active: i.active }]),
                    onClick: (d) => b("following-group", i.id)
                  }, [
                    he(l(i.child ? "↳ " : "") + l(i.name) + " ", 1),
                    e("small", gu, l(i.count), 1)
                  ], 10, fu))), 128))
                ]),
                e("div", mu, [
                  e("button", {
                    type: "button",
                    onClick: t[29] || (t[29] = (i) => b("following-manage-groups", "create"))
                  }, "＋ 新建分组"),
                  e("button", {
                    type: "button",
                    onClick: t[30] || (t[30] = (i) => b("following-manage-groups", "manage"))
                  }, "⚙️ 管理分组")
                ])
              ]),
              r.value.followingMembers.length ? (o(), s("div", hu, [
                e("div", yu, [
                  e("b", null, l(r.value.specialBadge), 1),
                  e("small", null, "共 " + l(r.value.followingMembers.length) + " 位 UP 主", 1)
                ]),
                e("div", _u, [
                  e("button", {
                    type: "button",
                    class: E(["fo-up-member-chip", { active: !r.value.followingMembers.some((i) => i.active) }]),
                    onClick: t[31] || (t[31] = (i) => b("following-member", ""))
                  }, "全部UP", 2),
                  (o(!0), s(U, null, j(r.value.followingMembers, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: E(["fo-up-member-chip", { active: i.active }]),
                    title: `左键筛选「${i.name}」，右键预览近期投稿`,
                    onClick: (d) => b("following-member", i.id),
                    onContextmenu: T((d) => b("following-preview-member", { id: i.id, clientX: d.clientX, clientY: d.clientY }), ["prevent"])
                  }, [
                    i.face ? (o(), s("img", {
                      key: 0,
                      loading: "lazy",
                      referrerpolicy: "no-referrer",
                      src: i.face,
                      alt: ""
                    }, null, 8, $u)) : k("", !0),
                    e("span", null, l(i.name), 1)
                  ], 42, ku))), 128))
                ]),
                e("button", {
                  type: "button",
                  class: "fo-btn-manage-members",
                  onClick: t[32] || (t[32] = (i) => b("following-manage-groups", "members"))
                }, "＋ 管理成员")
              ])) : k("", !0),
              e("div", wu, [
                t[82] || (t[82] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "⚡ UP 主最新投稿动态")
                ], -1)),
                e("div", Cu, "本页共 " + l(r.value.specialVideos.length) + " 个视频", 1)
              ]),
              r.value.specialLoading ? (o(), s("div", xu, [...t[83] || (t[83] = [
                e("i", null, null, -1),
                e("span", null, "正在读取关注 UP 主更新…", -1)
              ])])) : r.value.specialError ? (o(), s("p", Su, l(r.value.specialError), 1)) : (o(), s("div", Tu, [
                r.value.specialVideos.length ? k("", !0) : (o(), s("p", Mu, "暂无最新关注视频动态。")),
                (o(!0), s(U, null, j(r.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (d) => Ze(d, i)
                }, [
                  e("div", Pu, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: T((d) => b("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, Bu)
                    ], 8, zu),
                    e("span", Iu, "▣ " + l(i.playCount), 1),
                    e("span", Ru, l(i.duration), 1)
                  ]),
                  e("div", Lu, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: T((d) => b("special-play-video", i), ["prevent"])
                    }, l(i.title), 9, Eu),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": R.value === i.id,
                      onClick: T((d) => Oe(i.id), ["stop"])
                    }, "⋮", 8, Au),
                    R.value === i.id ? (o(), s("div", Vu, [
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { video: i, id: i.id, action: "play" }), R.value = "";
                        }
                      }, "本地播放与评论", 8, Uu),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { video: i, id: i.id, action: "subtitle" }), R.value = "";
                        }
                      }, "字幕提取", 8, Nu),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { video: i, id: i.id, action: "cache" }), R.value = "";
                        }
                      }, "缓存视频", 8, Fu),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          b("special-video-action", { video: i, id: i.id, action: "open" }), R.value = "";
                        }
                      }, "打开网页", 8, qu)
                    ])) : k("", !0)
                  ]),
                  e("div", Gu, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: T((d) => B(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, l(i.author), 9, Ou),
                    e("span", null, l(i.favoriteDate), 1)
                  ])
                ], 40, Du))), 128))
              ])),
              e("div", Hu, [
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: r.value.specialLoading || r.value.specialPage <= 1,
                  onClick: t[33] || (t[33] = (i) => b("following-page", r.value.specialPage - 1))
                }, "‹ 上一页", 8, Yu),
                e("span", Wu, "第 " + l(r.value.specialPage) + " 页", 1),
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: r.value.specialLoading || !r.value.followingHasMore,
                  onClick: t[34] || (t[34] = (i) => b("following-page", r.value.specialPage + 1))
                }, "下一页 ›", 8, Xu)
              ])
            ])) : r.value.mode === "subscription" ? (o(), s("section", ju, [
              e("div", Ku, [
                we(ri, { "show-back": "" }),
                r.value.subscriptionLoading ? (o(), s("div", Qu, [...t[84] || (t[84] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取订阅视频与 AI 字幕稿…", -1)
                ])])) : r.value.subscriptionError ? (o(), s("p", Ju, "读取失败：" + l(r.value.subscriptionError), 1)) : (o(), s("div", Zu, [
                  we(Bo),
                  we(zi)
                ]))
              ])
            ])) : r.value.mode === "radio" ? (o(), s("section", ed, [
              e("header", td, [
                t[85] || (t[85] = e("div", { class: "fo-hero-left" }, [
                  e("div", { class: "fo-bili-cover fo-vue-radio-cover" }, [
                    e("span", null, "📻")
                  ]),
                  e("div", { class: "fo-hero-folder-info" }, [
                    e("h3", null, "B站电台"),
                    e("p", null, "从左侧选择收藏夹，将视频拖拽或添加到连播队列，自由编排系列随心听")
                  ])
                ], -1)),
                e("div", id, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    onClick: t[35] || (t[35] = (i) => b("radio-refresh"))
                  }, "↻ 刷新电台"),
                  e("button", {
                    type: "button",
                    onClick: t[36] || (t[36] = (i) => b("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", od, [
                e("aside", sd, [
                  t[86] || (t[86] = e("p", { class: "sw-title" }, "收藏夹", -1)),
                  e("div", nd, [
                    (o(!0), s(U, null, j(n(I).radioFolders, (i) => (o(), s("button", {
                      key: i.id,
                      type: "button",
                      class: E(["bili-radio-folder", { on: i.id === n(I).radioActiveFolderId }]),
                      onClick: (d) => b("radio-select-folder", i.id)
                    }, [
                      e("span", null, l(i.title), 1),
                      e("span", null, l(i.count), 1)
                    ], 10, ld))), 128)),
                    n(I).radioFolders.length ? k("", !0) : (o(), s("p", ad, l(n(I).radioLoading ? "加载中…" : "暂无收藏夹"), 1))
                  ])
                ]),
                e("section", rd, [
                  t[88] || (t[88] = e("p", {
                    id: "bili-radio-library-title",
                    class: "sw-title"
                  }, "收藏夹视频", -1)),
                  n(I).radioError ? (o(), s("p", ud, l(n(I).radioError), 1)) : k("", !0),
                  e("div", dd, [
                    (o(!0), s(U, null, j(n(I).radioVideos, (i) => (o(), s("button", {
                      key: i.bvid,
                      type: "button",
                      class: "bili-radio-video",
                      title: `${i.title} (点击加入连播队列，或按住拖拽封面到下方卡带机直接播放)`,
                      draggable: "true",
                      onDragstart: (d) => yt(d, i),
                      onClick: (d) => b("radio-add", { bvid: i.bvid, title: i.title, cover: i.cover, author: i.author, duration: i.duration })
                    }, [
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, pd)) : (o(), s("span", bd)),
                      e("p", null, l(i.title), 1),
                      t[87] || (t[87] = e("span", null, "＋", -1))
                    ], 40, cd))), 128)),
                    n(I).radioVideos.length ? k("", !0) : (o(), s("p", vd, l(n(I).radioLoading ? "读取视频中…" : "此收藏夹暂无可播放视频"), 1))
                  ])
                ]),
                e("section", fd, [
                  e("div", gd, [
                    ce(e("input", {
                      id: "bili-radio-name",
                      "onUpdate:modelValue": t[37] || (t[37] = (i) => n(I).radioSeriesName = i),
                      maxlength: "48",
                      class: E({ "has-error": v.value }),
                      placeholder: v.value ? "⚠️ 请在此输入系列名称后再保存！" : "请输入系列名称（必填）",
                      autocomplete: "off",
                      onInput: t[38] || (t[38] = (i) => v.value = !1),
                      onKeydown: Re(T(D, ["prevent"]), ["enter"])
                    }, null, 42, md), [
                      [Te, n(I).radioSeriesName]
                    ]),
                    e("div", hd, [
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
                        onClick: g
                      }, " ✏️ 重命名 "),
                      we(pt, {
                        id: "bili-radio-share",
                        compact: "",
                        label: "🚀 分享",
                        visible: !0,
                        onSelect: gt
                      })
                    ]),
                    e("div", yd, [
                      e("select", {
                        class: "bili-radio-series-select",
                        title: "快速切换已保存的系列",
                        onChange: S
                      }, [
                        e("option", _d, l(n(I).radioSeries.length ? `📚 已保存系列 (${n(I).radioSeries.length})` : "📚 暂无保存系列"), 1),
                        (o(!0), s(U, null, j(n(I).radioSeries, (i) => (o(), s("option", {
                          key: i.id,
                          value: i.id
                        }, l(i.name) + " (" + l(i.count) + "首) ", 9, kd))), 128)),
                        t[89] || (t[89] = e("option", {
                          value: "__create_new__",
                          class: "bili-radio-create-opt"
                        }, " ＋ 创建系列 ", -1))
                      ], 32)
                    ])
                  ]),
                  e("div", $d, [
                    (o(!0), s(U, null, j(n(I).radioQueue, (i, d) => (o(), s("div", {
                      key: `${i.bvid}-${d}`,
                      class: E(["bili-radio-queue-item", { "is-playing": n(X).active && n(X).trackIndex === d + 1 }]),
                      title: "点击立即从该曲目开始播放",
                      onClick: (V) => b("radio-play-index", d)
                    }, [
                      e("span", Cd, l(n(X).active && n(X).trackIndex === d + 1 ? "♪" : d + 1), 1),
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, xd)) : (o(), s("span", Sd)),
                      e("p", null, l(i.title), 1),
                      e("button", {
                        type: "button",
                        class: "bili-radio-remove",
                        "aria-label": `移除 ${i.title}`,
                        onClick: T((V) => b("radio-remove", { index: d }), ["stop"])
                      }, "×", 8, Td)
                    ], 10, wd))), 128)),
                    n(I).radioQueue.length ? k("", !0) : (o(), s("p", Md, "点击左侧视频加入连播队列。"))
                  ]),
                  e("div", Dd, [
                    e("button", {
                      id: "bili-radio-play",
                      type: "button",
                      disabled: !n(I).radioQueue.length,
                      onClick: t[39] || (t[39] = (i) => b("radio-play"))
                    }, "▶ 按顺序播放", 8, Pd),
                    e("button", {
                      id: "bili-radio-shuffle",
                      type: "button",
                      disabled: !n(I).radioQueue.length,
                      onClick: t[40] || (t[40] = (i) => b("radio-shuffle"))
                    }, "🔀 随机播放", 8, zd),
                    e("button", {
                      id: "bili-radio-clear",
                      type: "button",
                      onClick: t[41] || (t[41] = (i) => b("radio-clear"))
                    }, "清空编辑区")
                  ])
                ])
              ]),
              n(Fe) || n(ot).activeId === "daily-bilibili" ? k("", !0) : (o(), Xe(bt, { key: 0 }))
            ])) : k("", !0)
          ], 34)
        ])
      ]),
      n(Fe) || n(ot).activeId === "daily-bilibili" ? (o(), Xe(bt, {
        key: 0,
        "dock-side": ""
      })) : k("", !0),
      t[101] || (t[101] = e("div", {
        class: "fm-pane",
        id: "pane-sub-video",
        hidden: "",
        style: { display: "none !important" }
      }, null, -1)),
      we(ss),
      we(_n),
      W.value.visible && W.value.video ? (o(), s("div", {
        key: 1,
        ref_key: "videoMenuRef",
        ref: K,
        class: "fo-context-menu",
        role: "menu",
        style: Me(n(G)),
        onClick: t[50] || (t[50] = T(() => {
        }, ["stop"]))
      }, [
        e("div", {
          class: "fo-context-header",
          title: W.value.video.title
        }, l(W.value.video.title), 9, Bd),
        we(pt, {
          label: "💬 发送到聊天室",
          "match-menu-item": "",
          visible: W.value.visible,
          onSelect: mt
        }, null, 8, ["visible"]),
        t[98] || (t[98] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[42] || (t[42] = (i) => Ie("play"))
        }, [...t[90] || (t[90] = [
          e("span", { class: "fo-context-icon" }, "▶", -1),
          he(" 小窗播放视频 ", -1)
        ])]),
        t[99] || (t[99] = e("div", { class: "fo-context-divider" }, null, -1)),
        W.value.video.writable ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "fo-context-item danger",
          onClick: t[43] || (t[43] = (i) => Ie("delete"))
        }, [...t[91] || (t[91] = [
          e("span", { class: "fo-context-icon" }, "🗑", -1),
          he(" 取消收藏 ", -1)
        ])])) : k("", !0),
        W.value.video.writable ? (o(), s("button", {
          key: 1,
          type: "button",
          class: "fo-context-item",
          onClick: t[44] || (t[44] = (i) => Ie("move"))
        }, [...t[92] || (t[92] = [
          e("span", { class: "fo-context-icon" }, "📁", -1),
          he(" 移动到… ", -1)
        ])])) : k("", !0),
        W.value.video.writable ? (o(), s("div", Id)) : k("", !0),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[45] || (t[45] = (i) => Ie("open"))
        }, [...t[93] || (t[93] = [
          e("span", { class: "fo-context-icon" }, "↗", -1),
          he(" 跳转到 B站 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[46] || (t[46] = (i) => Ie("copy-link"))
        }, [...t[94] || (t[94] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          he(" 复制链接 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[47] || (t[47] = (i) => Ie("cache"))
        }, [...t[95] || (t[95] = [
          e("span", { class: "fo-context-icon" }, "💾", -1),
          he(" 缓存视频 ", -1)
        ])]),
        t[100] || (t[100] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[48] || (t[48] = (i) => Ie("create-task"))
        }, [...t[96] || (t[96] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          he(" 创建任务 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[49] || (t[49] = (i) => Ie("subtitle"))
        }, [...t[97] || (t[97] = [
          e("span", { class: "fo-context-icon" }, "▤", -1),
          he(" 字幕转文本 ", -1)
        ])])
      ], 4)) : k("", !0),
      (o(), Xe(Ct, { to: "body" }, [
        we(yl)
      ]))
    ], 2));
  }
}), Xd = /* @__PURE__ */ ze(Rd, [["__scopeId", "data-v-54329878"]]);
export {
  Xd as default
};
