import { d as De, o, e as s, i as e, t as l, u as n, A as z, m as he, F as V, g as j, f as k, p as $e, h as M, s as te, w as ve, B as He, x as ft, l as ce, n as Te, k as Le, b as D, D as nt, Q as ut, K as gt, z as Me, v as Ct, y as lt, E as tt, j as Xe, T as xt } from "./vendor-vue-BkY5-p5y.js";
import { a as I, b as Ne, c as it, s as St } from "./bili-favorites-store-BnU986j_.js";
import { c as dt, A as X, r as ze, y as de, n as je, d as Ke, o as ot, B as ct } from "./view-styles-yuz8wQEV.js";
import { C as pt } from "./ChatShareMenu-DWLI-XHx.js";
import { u as Tt } from "./useCardActivity-Czd5WK9V.js";
import { _ as Ee, t as A } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
import { B as Qe } from "./BiliRichText-B8-hi_sH.js";
import { d as Mt, a as Dt } from "./playback-sync-D7JqyNZ5.js";
import { a as me, d as st, e as m, c as ke } from "./up-group-manager-store-CTqVgunz.js";
import { g as Pt, s as Et } from "./cache-directory-CBBZXa5n.js";
import { u as It } from "./useMachine-DdzsCIFB.js";
import { biliMessagePanelController as Rt, biliMessagePanelState as Lt } from "./message-panel-store-BejcpuEQ.js";
import { bilibiliChannelService as Ae } from "./bilibili-channel.service-CbUEcMBV.js";
import { u as Bt } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DEjO_zkf.js";
const zt = { class: "bili-sub-header bili-sub-vue-header" }, At = { class: "bili-sub-channel-info" }, Nt = { class: "bili-sub-vue-title-row" }, Vt = { class: "bili-sub-title" }, Ut = { class: "bili-sub-desc" }, Gt = { class: "bili-sub-actions" }, Ft = { class: "bili-sub-mode-icon" }, Ot = { class: "bili-sub-mode-text" }, qt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, Ht = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, Yt = { class: "bili-sub-dropdown-panel" }, Wt = { class: "bili-sub-dropdown-list" }, Xt = ["onClick"], jt = { class: "bili-sub-item-text" }, Kt = {
  key: 0,
  class: "bili-sub-item-check"
}, Qt = { class: "bili-sub-dropdown-foot" }, Jt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, Zt = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, ei = { class: "bili-sub-dropdown-panel bili-sub-video-dropdown-panel" }, ti = { class: "bili-sub-dropdown-title" }, ii = { class: "bili-sub-dropdown-list" }, oi = ["title", "onClick"], si = { class: "bili-sub-video-num" }, ni = { class: "bili-sub-item-text" }, li = {
  key: 0,
  class: "bili-sub-video-duration"
}, ai = { class: "bili-sub-dropdown-foot" }, ri = ["disabled"], ui = /* @__PURE__ */ De({
  __name: "BiliSubscriptionHeader",
  props: {
    showBack: { type: Boolean }
  },
  setup(fe) {
    function d($, f) {
      Ne.dispatch($, f);
    }
    return ($, f) => (o(), s("header", zt, [
      e("div", At, [
        f[6] || (f[6] = e("img", {
          class: "bili-sub-avatar",
          src: "assets/bilibili.svg",
          alt: ""
        }, null, -1)),
        e("div", null, [
          e("div", Nt, [
            e("h3", Vt, l(n(I).organizer.subscriptionTitle), 1)
          ]),
          e("p", Ut, l(n(I).organizer.subscriptionSubtitle), 1)
        ])
      ]),
      e("div", Gt, [
        e("button", {
          type: "button",
          class: z(["bili-sub-head-btn bili-sub-script-mode-btn", { "is-newspaper": n(I).organizer.subscriptionScriptMode === "newspaper" }]),
          onClick: f[0] || (f[0] = (S) => d("subscription-script-mode"))
        }, [
          e("span", Ft, l(n(I).organizer.subscriptionScriptMode === "newspaper" ? "📰" : "📜"), 1),
          e("span", Ot, l(n(I).organizer.subscriptionScriptMode === "newspaper" ? "报纸模式" : "滚动台词"), 1)
        ], 2),
        e("details", qt, [
          e("summary", Ht, [
            e("span", null, [
              f[7] || (f[7] = he("关注 UP 主：", -1)),
              e("b", null, l(n(I).organizer.subscriptionTitle), 1)
            ]),
            f[8] || (f[8] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", Yt, [
            f[10] || (f[10] = e("div", { class: "bili-sub-dropdown-title" }, "已关注的 UP 主", -1)),
            e("div", Wt, [
              (o(!0), s(V, null, j(n(I).organizer.subscriptionChannels, (S) => (o(), s("button", {
                key: S.id,
                type: "button",
                class: z(["bili-sub-dropdown-item", { active: S.active }]),
                onClick: (P) => d("subscription-channel", S.id)
              }, [
                f[9] || (f[9] = e("span", { class: "bili-sub-dot" }, null, -1)),
                e("span", jt, l(S.name), 1),
                S.active ? (o(), s("span", Kt, "✓")) : k("", !0)
              ], 10, Xt))), 128))
            ]),
            e("div", Qt, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                onClick: f[1] || (f[1] = (S) => d("subscription-add-channel"))
              }, "＋ UP 主")
            ])
          ])
        ]),
        e("details", Jt, [
          e("summary", Zt, [
            e("span", null, [
              f[11] || (f[11] = he("视频 ", -1)),
              e("b", null, "(" + l(n(I).organizer.subscriptionVideos.length) + ")", 1)
            ]),
            f[12] || (f[12] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", ei, [
            e("div", ti, "最近投稿视频 (" + l(n(I).organizer.subscriptionVideos.length) + ")", 1),
            e("div", ii, [
              (o(!0), s(V, null, j(n(I).organizer.subscriptionVideos, (S, P) => (o(), s("button", {
                key: S.bvid,
                type: "button",
                class: z(["bili-sub-dropdown-item bili-sub-video-item", { active: S.active }]),
                title: S.title,
                onClick: (T) => d("subscription-video", S.bvid)
              }, [
                e("span", si, l(P + 1) + ".", 1),
                e("span", ni, l(S.title), 1),
                S.duration ? (o(), s("small", li, l(S.duration), 1)) : k("", !0)
              ], 10, oi))), 128))
            ]),
            e("div", ai, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                disabled: n(I).organizer.subscriptionLoading,
                onClick: f[2] || (f[2] = (S) => d("subscription-load-more"))
              }, "继续获取", 8, ri)
            ])
          ])
        ]),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: f[3] || (f[3] = (S) => d(n(I).organizer.showFullDescInRightPanel ? "subscription-copy-description" : "subscription-copy-script"))
        }, l(n(I).organizer.showFullDescInRightPanel ? "复制简介" : "复制稿子"), 1),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: f[4] || (f[4] = (S) => d("subscription-refresh"))
        }, "↻ 刷新"),
        fe.showBack ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "bili-sub-head-btn",
          onClick: f[5] || (f[5] = (S) => d("organizer-open"))
        }, "← 返回收藏夹")) : k("", !0)
      ])
    ]));
  }
}), di = /* @__PURE__ */ Ee(ui, [["__scopeId", "data-v-3f587b61"]]), ci = { class: "bili-sub-transcript-column bili-sub-vue-transcript-column" }, pi = { class: "bili-sub-article-wrap" }, bi = { class: "bili-sub-transcript-body" }, vi = {
  key: 0,
  class: "bili-sub-description-copy",
  title: "当前为放大简介视图"
}, fi = {
  key: 0,
  class: "muted"
}, gi = {
  key: 0,
  class: "bili-sub-newspaper-list"
}, mi = ["data-idx", "data-from", "data-to", "title", "onClick"], hi = { class: "bili-sub-newspaper-header" }, yi = { class: "bili-sub-newspaper-num" }, _i = { class: "bili-sub-newspaper-heading" }, ki = { class: "bili-sub-newspaper-title" }, $i = { class: "bili-sub-newspaper-time" }, wi = ["onClick"], Ci = { class: "bili-sub-newspaper-content" }, xi = ["data-from", "data-to", "title", "onClick"], Si = {
  key: 1,
  class: "bili-sub-srt-list"
}, Ti = ["data-idx", "data-from", "data-to", "title", "onClick"], Mi = { class: "bili-sub-srt-time" }, Di = { class: "bili-sub-srt-text" }, Pi = {
  key: 2,
  class: "bili-sub-no-transcript-box"
}, Ei = {
  key: 2,
  class: "bili-sub-vue-empty-hint"
}, Ii = /* @__PURE__ */ De({
  __name: "BiliSubscriptionTranscript",
  setup(fe) {
    const d = te(() => I.organizer), $ = te(() => d.value.subscriptionChapters.length > 0 || d.value.subscriptionCues.length > 0);
    function f(S, P) {
      Ne.dispatch(S, P);
    }
    return (S, P) => (o(), s("section", ci, [
      e("article", pi, [
        e("div", bi, [
          d.value.showFullDescInRightPanel ? (o(), s("section", vi, [
            e("header", null, [
              P[1] || (P[1] = e("h5", null, "视频简介", -1)),
              e("button", {
                type: "button",
                class: "bili-copy-desc-btn",
                title: "切回台词展示",
                onClick: P[0] || (P[0] = (T) => f("subscription-toggle-desc-panel"))
              }, "缩小简介")
            ]),
            (o(!0), s(V, null, j(d.value.subscriptionDescription, (T, r) => (o(), s("p", { key: r }, [
              $e(Qe, { text: T }, null, 8, ["text"])
            ]))), 128)),
            d.value.subscriptionDescription.length ? k("", !0) : (o(), s("p", fi, "该视频暂无可用的文字简介。"))
          ])) : (o(), s(V, { key: 1 }, [
            d.value.subscriptionScriptMode === "newspaper" && d.value.subscriptionChapters.length ? (o(), s("div", gi, [
              (o(!0), s(V, null, j(d.value.subscriptionChapters, (T, r) => (o(), s("article", {
                key: `${T.from}:${r}`,
                class: "bili-sub-newspaper-section",
                "data-idx": r,
                "data-from": T.from,
                "data-to": T.to,
                title: `点击跳转至 ${T.fromText} 播放`,
                onClick: (y) => f("subscription-seek", { from: T.from, index: r, mode: "newspaper" })
              }, [
                e("header", hi, [
                  e("span", yi, l(String(r + 1).padStart(2, "0")), 1),
                  e("div", _i, [
                    e("h4", ki, l(T.title), 1),
                    e("span", $i, "⏱ " + l(T.fromText) + " - " + l(T.toText), 1)
                  ]),
                  e("button", {
                    type: "button",
                    class: "bili-sub-newspaper-play-btn",
                    "aria-label": "从头播放此分段",
                    onClick: M((y) => f("subscription-seek", { from: T.from, index: r, mode: "newspaper" }), ["stop"])
                  }, "▶", 8, wi)
                ]),
                e("div", Ci, [
                  T.paragraphCues && T.paragraphCues.length ? (o(!0), s(V, { key: 0 }, j(T.paragraphCues, (y, w) => (o(), s("p", {
                    key: w,
                    class: "bili-sub-newspaper-p"
                  }, [
                    (o(!0), s(V, null, j(y, (U, J) => (o(), s("span", {
                      key: `${U.from}:${J}`,
                      class: "bili-sub-newspaper-cue",
                      "data-from": U.from,
                      "data-to": U.to,
                      title: `点击跳转播放此句 (⏱ ${U.timeText || U.from + "s"})`,
                      onClick: M((H) => f("subscription-seek", { from: U.from, mode: "newspaper" }), ["stop"])
                    }, l(U.content), 9, xi))), 128))
                  ]))), 128)) : (o(!0), s(V, { key: 1 }, j(T.paragraphs, (y, w) => (o(), s("p", {
                    key: w,
                    class: "bili-sub-newspaper-p"
                  }, l(y), 1))), 128))
                ])
              ], 8, mi))), 128))
            ])) : d.value.subscriptionCues.length ? (o(), s("div", Si, [
              (o(!0), s(V, null, j(d.value.subscriptionCues, (T) => (o(), s("button", {
                key: `${T.from}:${T.index}`,
                type: "button",
                class: "bili-sub-srt-row",
                "data-idx": T.index,
                "data-from": T.from,
                "data-to": T.to,
                title: `点击跳转至 ${T.timeText}`,
                onClick: (r) => f("subscription-seek", { from: T.from, index: T.index, mode: "lyrics" })
              }, [
                e("span", Mi, l(T.timeText), 1),
                e("span", Di, l(T.content), 1)
              ], 8, Ti))), 128))
            ])) : (o(), s("div", Pi, [...P[2] || (P[2] = [
              e("div", { class: "bili-sub-no-transcript-icon" }, "🎙️", -1),
              e("h5", null, "暂无实时台词字幕", -1),
              e("p", { class: "muted" }, "当前视频暂无可用字幕稿。如需阅读完整文案，请点击左侧视频标题旁的“放大简介”。", -1)
            ])]))
          ], 64)),
          !d.value.showFullDescInRightPanel && !$.value && !d.value.subscriptionDescription.length ? (o(), s("p", Ei, "字幕不可用时仍可在左侧播放和查看评论。")) : k("", !0)
        ])
      ])
    ]));
  }
}), Ri = /* @__PURE__ */ Ee(Ii, [["__scopeId", "data-v-d4a520da"]]), Li = { class: "bili-sub-player-column" }, Bi = {
  key: 0,
  class: "bili-sub-sticky-player"
}, zi = { class: "bili-sub-player-card" }, Ai = { class: "bili-sub-video-box" }, Ni = ["poster", "hidden"], Vi = ["src"], Ui = {
  key: 1,
  class: "bili-sub-video-loading"
}, Gi = { class: "bili-sub-video-meta" }, Fi = { class: "bili-sub-video-meta-actions" }, Oi = ["title"], qi = { class: "bili-sub-meta-stats" }, Hi = { class: "bili-sub-meta-desc" }, Yi = {
  class: "bili-sub-comments-section",
  id: "bili-sub-comments-section"
}, Wi = { class: "bili-mini-comments-head" }, Xi = { class: "bili-mini-comments-meta" }, ji = { class: "bili-mini-comments-count bili-sub-comments-count" }, Ki = { class: "bili-mini-comments-sort" }, Qi = { class: "bili-sub-comment-composer" }, Ji = ["onKeydown"], Zi = ["disabled"], eo = {
  key: 0,
  class: "bili-sub-emote-picker"
}, to = {
  key: 0,
  class: "fo-bili-loading"
}, io = { key: 1 }, oo = ["title", "onClick"], so = ["src", "alt"], no = { key: 1 }, lo = { class: "bili-mini-comments-body bili-sub-comments-body" }, ao = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, ro = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, uo = ["src"], co = { class: "bili-comment-main" }, po = { class: "bili-comment-user-row" }, bo = { class: "bili-comment-uname" }, vo = {
  key: 0,
  class: "bili-comment-level"
}, fo = { class: "bili-comment-time" }, go = { class: "bili-comment-text" }, mo = {
  key: 0,
  class: "bili-comment-pictures"
}, ho = ["href", "onClick"], yo = ["src"], _o = { class: "bili-comment-actions" }, ko = { key: 0 }, $o = { key: 1 }, wo = {
  key: 1,
  class: "bili-comment-sub-list"
}, Co = { class: "bili-comment-sub-uname" }, xo = { class: "bili-comment-sub-more" }, So = ["disabled", "onClick"], To = ["disabled", "onClick"], Mo = ["onClick"], Do = { class: "bili-sub-comments-infinite-trigger" }, Po = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0" }
}, Eo = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0", opacity: "0.6" }
}, Io = {
  key: 1,
  class: "fo-bili-empty"
}, Ro = /* @__PURE__ */ De({
  __name: "BiliSubscriptionPlayer",
  setup(fe) {
    const d = te(() => I.organizer.subscriptionCurrent), $ = D(null), f = D(!1), S = D(!1), P = D(""), T = D(""), r = D(1), y = D(1), w = D([]), U = D("0 条"), J = D(!1), H = D(!1), L = D(""), W = D(!1), Q = D(""), Y = D(null), E = D(!1), q = D(""), oe = D(!1), ie = D(!1), pe = D(!1), v = D([]);
    let se = null, ne = null;
    function ee(C, h = !1) {
      q.value = C, oe.value = h, se && clearTimeout(se), se = setTimeout(() => {
        q.value = "";
      }, 3500);
    }
    function le() {
      Ne.dispatch("subscription-open-player");
    }
    function be() {
      Ne.dispatch("subscription-toggle-desc-panel");
    }
    function we(C) {
      const h = C.currentTarget;
      h && h.scrollHeight - h.scrollTop - h.clientHeight < 180 && !H.value && W.value && re();
    }
    function R(C, h) {
      const p = C[h];
      p && window.open(p, "_blank", "noopener,noreferrer");
    }
    function g(C, h) {
      if (!C) return [];
      if (!h || h.size === 0)
        return [{ type: "text", text: C }];
      const p = /\[([^\]]+)\]/g, x = [];
      let O = 0, G;
      for (; (G = p.exec(C)) !== null; ) {
        G.index > O && x.push({ type: "text", text: C.slice(O, G.index) });
        const K = G[0], ue = h.get(K);
        ue ? x.push({ type: "emote", text: K, url: ue }) : x.push({ type: "text", text: K }), O = p.lastIndex;
      }
      return O < C.length && x.push({ type: "text", text: C.slice(O) }), x;
    }
    function F(C) {
      if (!C) return "";
      const h = new Date(C * 1e3), p = /* @__PURE__ */ new Date(), x = Math.floor((p.getTime() - h.getTime()) / 1e3);
      if (x < 60) return "刚刚";
      if (x < 3600) return `${Math.floor(x / 60)} 分钟前`;
      if (x < 86400) return `${Math.floor(x / 3600)} 小时前`;
      const O = h.getFullYear(), G = String(h.getMonth() + 1).padStart(2, "0"), K = String(h.getDate()).padStart(2, "0");
      return O === p.getFullYear() ? `${G}-${K}` : `${O}-${G}-${K}`;
    }
    function Z(C) {
      return C ? C >= 1e4 ? (C / 1e4).toFixed(1).replace(/\.0$/, "") + "万" : String(C) : "0";
    }
    async function _(C = !1) {
      if (T.value) {
        C ? H.value = !0 : (J.value = !0, L.value = "");
        try {
          const h = `https://api.bilibili.com/x/v2/reply?type=1&oid=${T.value}&pn=${y.value}&ps=20&sort=${r.value}`, x = await (await fetch(h, { credentials: "include" })).json();
          if (x?.code !== 0 || !x?.data) {
            C || (L.value = x?.message || "评论加载失败或该视频已关闭评论", w.value = []), W.value = !1;
            return;
          }
          const O = x.data, G = O.page?.count || 0;
          U.value = `${Z(G)} 条`;
          const ue = (Array.isArray(O.replies) ? O.replies : []).map((ae) => {
            const Ye = /* @__PURE__ */ new Map();
            ae.content?.emote && Object.entries(ae.content.emote).forEach(([_e, Ge]) => {
              Ge?.url && Ye.set(_e, String(Ge.url).replace(/^http:/, "https:"));
            });
            const Oe = String(ae.content?.message || ""), qe = Array.isArray(ae.content?.pictures) ? ae.content.pictures.map((_e) => String(_e?.img_src || _e).replace(/^http:/, "https:")).filter(Boolean) : [], We = Array.isArray(ae.replies) ? ae.replies.map((_e) => ({
              id: _e.rpid || Math.random(),
              userName: _e.member?.uname || "B站用户",
              message: String(_e.content?.message || "")
            })) : [];
            return {
              id: ae.rpid || Math.random(),
              userName: ae.member?.uname || "B站用户",
              avatar: String(ae.member?.avatar || "").replace(/^http:/, "https:"),
              level: Number(ae.member?.level_info?.current_level || 0),
              message: Oe,
              tokens: g(Oe, Ye),
              timeStr: F(ae.ctime),
              likeCount: Number(ae.like || 0),
              replyCount: Number(ae.rcount || 0),
              pictures: qe,
              replies: We
            };
          });
          C ? w.value = [...w.value, ...ue] : w.value = ue, W.value = w.value.length < G;
        } catch (h) {
          C || (L.value = h?.message || "网络异常，未能加载评论");
        } finally {
          J.value = !1, H.value = !1;
        }
      }
    }
    async function u(C) {
      const h = w.value.find((p) => String(p.id) === String(C));
      if (!(!h || h.subRepliesLoading || !T.value)) {
        h.subRepliesPage ? h.subRepliesPage++ : h.subRepliesPage = 1, h.subRepliesLoading = !0, h.subRepliesExpanded = !0;
        try {
          const p = await dt.getSubReplies(T.value, C, h.subRepliesPage, 10), x = (p.replies || []).map((K) => ({
            id: String(K.rpid),
            userName: K.uname,
            message: K.message
          })), O = new Set((h.replies || []).map((K) => String(K.id))), G = x.filter((K) => !O.has(String(K.id)));
          h.replies = [...h.replies || [], ...G], h.subRepliesHasMore = p.hasMore;
        } catch {
          ee("子回复加载失败", !0);
        } finally {
          h.subRepliesLoading = !1;
        }
      }
    }
    function b(C) {
      const h = w.value.find((p) => String(p.id) === String(C));
      h && (h.subRepliesExpanded = !1);
    }
    function B(C) {
      r.value !== C && (r.value = C, y.value = 1, _(!1));
    }
    function re() {
      H.value || !W.value || (y.value += 1, _(!0));
    }
    async function ge() {
      if (ie.value = !ie.value, ie.value && !v.value.length && !pe.value) {
        pe.value = !0;
        try {
          const h = await (await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", { credentials: "include" })).json();
          h?.code === 0 && Array.isArray(h?.data?.packages) && (v.value = h.data.packages.filter((p) => Array.isArray(p.emote) && p.emote.length).map((p) => ({
            text: p.text || "B站表情",
            emote: p.emote.map((x) => ({
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
      const h = Y.value;
      if (!h)
        Q.value += C;
      else {
        const p = h.selectionStart ?? h.value.length, x = h.selectionEnd ?? p;
        Q.value = Q.value.slice(0, p) + C + Q.value.slice(x), nt(() => {
          h.focus();
          const O = p + C.length;
          h.setSelectionRange(O, O);
        });
      }
      ie.value = !1;
    }
    async function Ce() {
      const C = Q.value.trim();
      if (!C) {
        ee("请输入评论内容", !0);
        return;
      }
      if (!T.value) {
        ee("未能识别视频 ID，无法发表评论", !0);
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
        ee("未检测到 B站 登录态，请先登录 bilibili.com", !0);
        return;
      }
      E.value = !0;
      try {
        const x = new URLSearchParams({
          oid: String(T.value),
          type: "1",
          message: C,
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
          body: x.toString()
        })).json();
        G?.code === 0 ? (Q.value = "", ee("✓ 评论发表成功！", !1), y.value = 1, _(!1)) : ee(`❌ 发送失败：${G?.message || G?.code}`, !0);
      } catch (x) {
        ee(`❌ 发送出错：${x?.message || "网络异常"}`, !0);
      } finally {
        E.value = !1;
      }
    }
    async function Pe(C) {
      if (!C?.bvid) return;
      if (typeof document < "u" && (document.querySelectorAll("video, audio").forEach((p) => {
        if (p !== $.value && !p.paused)
          try {
            p.pause();
          } catch {
          }
      }), document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((p) => {
        try {
          p.pause();
        } catch {
        }
      })), $.value && !$.value.paused)
        try {
          $.value.pause();
        } catch {
        }
      f.value = !0, S.value = !1, P.value = "";
      let h = C.aid;
      if (!h)
        try {
          const x = await (await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${C.bvid}`, { credentials: "include" })).json();
          x?.data?.aid && (h = x.data.aid);
        } catch {
        }
      T.value = h || "", y.value = 1, _(!1);
      try {
        const p = await dt.resolvePlayStream(C);
        if (p?.sources?.length) {
          $.value && (typeof document < "u" && document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((x) => {
            try {
              x.pause();
            } catch {
            }
          }), $.value.src = p.sources[0], $.value.play().catch(() => {
          }), Dt({ bvid: C.bvid, title: C.title, cover: C.cover }, $.value)), f.value = !1;
          return;
        }
      } catch (p) {
        console.warn("[BiliSubscriptionPlayer] 本地视频流解析失败，使用 iframe 备用:", p);
      }
      S.value = !0, P.value = `https://player.bilibili.com/player.html?bvid=${C.bvid}&autoplay=1&danmaku=0`, f.value = !1;
    }
    let Ie = null, Ve = null;
    function Ue(C) {
      const h = C.closest(".bili-sub-transcript-body") || C.closest(".bili-sub-article-wrap") || C.parentElement;
      if (!h) return;
      const p = h.getBoundingClientRect(), G = C.getBoundingClientRect().top - p.top + h.scrollTop - p.height * 0.36;
      h.scrollTo({
        top: Math.max(0, G),
        behavior: "smooth"
      });
    }
    function ye() {
      if (!$.value) return;
      const C = $.value.currentTime;
      if (document.querySelectorAll(".bili-sub-newspaper-section").forEach((x) => {
        const O = Number(x.getAttribute("data-from") || 0), G = Number(x.getAttribute("data-to") || 0), K = C >= O && (G <= 0 || C < G);
        x.classList.toggle("active", K);
      }), I.organizer.subscriptionScriptMode === "newspaper") {
        const x = document.querySelectorAll(".bili-sub-newspaper-cue");
        if (x.length > 0) {
          let O = null;
          if (x.forEach((G) => {
            const K = Number(G.getAttribute("data-from") || 0), ue = Number(G.getAttribute("data-to") || 0);
            C >= K && (ue <= 0 || C < ue) ? (O || (O = G), G.classList.add("cue-reading-active")) : G.classList.remove("cue-reading-active");
          }), !O && C > 0)
            for (let G = x.length - 1; G >= 0; G--) {
              const K = x[G], ue = Number(K.getAttribute("data-from") || 0);
              if (C >= ue) {
                O = K, K.classList.add("cue-reading-active");
                break;
              }
            }
          O && O !== Ie && (Ie = O, Ue(O));
        }
      } else {
        const x = document.querySelectorAll(".bili-sub-srt-row");
        let O = !1, G = null;
        for (let K = x.length - 1; K >= 0; K--) {
          const ue = x[K], ae = Number(ue.getAttribute("data-from") || 0);
          !O && C >= ae ? (ue.classList.add("active"), O = !0, G = ue) : ue.classList.remove("active");
        }
        G && G !== Ve && (Ve = G, Ue(G));
      }
    }
    function Be() {
      ye();
    }
    function Fe() {
      ye();
    }
    return ve(
      () => d.value?.bvid,
      () => {
        d.value && Pe(d.value);
      },
      { immediate: !0 }
    ), He(() => {
      ne = Ne.onAction((C, h) => {
        if (C === "subscription-seek") {
          const p = Number(h?.from);
          $.value && Number.isFinite(p) && ($.value.currentTime = Math.max(0, p - 0.1), $.value.play().catch(() => {
          }));
        }
      });
    }), ft(() => {
      if ($.value) {
        Mt($.value);
        try {
          $.value.pause(), $.value.src = "", $.value.load();
        } catch {
        }
      }
      ne && ne(), se && clearTimeout(se);
    }), (C, h) => (o(), s("aside", Li, [
      d.value ? (o(), s("div", Bi, [
        e("div", zi, [
          e("div", {
            class: "bili-sub-vue-comment-handoff",
            hidden: "",
            style: { display: "none !important" }
          }, [
            h[3] || (h[3] = e("strong", null, "播放器与评论区已统一到 Vue 本地影院", -1)),
            e("button", {
              type: "button",
              onClick: le
            }, "打开播放器与评论区")
          ]),
          e("div", Ai, [
            e("video", {
              ref_key: "videoRef",
              ref: $,
              class: "bili-sub-native-video",
              controls: "",
              playsinline: "",
              poster: d.value.cover,
              hidden: S.value,
              onTimeupdate: ye,
              onSeeked: Be,
              onPlay: Fe
            }, null, 40, Ni),
            S.value ? (o(), s("iframe", {
              key: 0,
              class: "bili-sub-native-iframe",
              allowfullscreen: "true",
              allow: "autoplay; fullscreen",
              src: P.value
            }, null, 8, Vi)) : k("", !0),
            f.value ? (o(), s("div", Ui, [...h[4] || (h[4] = [
              e("i", null, null, -1),
              e("span", null, "正在解析登录高清视频流…", -1)
            ])])) : k("", !0)
          ]),
          e("div", {
            class: "bili-sub-scroll-stage",
            onScrollPassive: we
          }, [
            e("div", Gi, [
              e("div", Fi, [
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: n(I).organizer.showFullDescInRightPanel ? "切回台词展示" : "在右侧大屏展开完整视频简介",
                  onClick: be
                }, l(n(I).organizer.showFullDescInRightPanel ? "缩小简介" : "放大简介"), 9, Oi)
              ]),
              e("h4", null, l(d.value.title), 1),
              e("div", qi, [
                e("span", null, "▣ 播放: " + l(d.value.playCount), 1),
                e("span", null, "💬 弹幕: " + l(d.value.danmakuCount), 1),
                e("span", null, "⏱ " + l(d.value.duration), 1)
              ]),
              e("p", Hi, [
                $e(Qe, {
                  text: d.value.description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ]),
            e("div", Yi, [
              e("div", Wi, [
                e("div", Xi, [
                  h[5] || (h[5] = e("span", null, "💬 评论", -1)),
                  e("span", ji, l(U.value), 1)
                ]),
                e("div", Ki, [
                  e("button", {
                    type: "button",
                    class: z(["bili-mini-sort-btn", { active: r.value === 1 }]),
                    onClick: h[0] || (h[0] = (p) => B(1))
                  }, "按热度", 2),
                  e("button", {
                    type: "button",
                    class: z(["bili-mini-sort-btn", { active: r.value === 0 }]),
                    onClick: h[1] || (h[1] = (p) => B(0))
                  }, "按时间", 2)
                ])
              ]),
              e("div", Qi, [
                e("button", {
                  type: "button",
                  class: z(["bili-sub-emote-button", { on: ie.value }]),
                  title: "选择 B站 表情",
                  onClick: ge
                }, "☺", 2),
                ce(e("input", {
                  ref_key: "commentInputRef",
                  ref: Y,
                  "onUpdate:modelValue": h[2] || (h[2] = (p) => Q.value = p),
                  type: "text",
                  class: "bili-sub-comment-input",
                  placeholder: "发一条友善的评论吧…（Enter 发送）",
                  maxlength: "500",
                  onKeydown: Le(M(Ce, ["prevent"]), ["enter"])
                }, null, 40, Ji), [
                  [Te, Q.value]
                ]),
                e("button", {
                  type: "button",
                  class: "bili-sub-comment-send-btn",
                  disabled: E.value || !Q.value.trim(),
                  onClick: Ce
                }, l(E.value ? "发送中…" : "发送"), 9, Zi)
              ]),
              ie.value ? (o(), s("div", eo, [
                pe.value ? (o(), s("div", to, [...h[6] || (h[6] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取 B站 表情包…", -1)
                ])])) : (o(), s("div", io, [
                  (o(!0), s(V, null, j(v.value, (p) => (o(), s("section", {
                    key: p.text,
                    class: "bili-sub-emote-group"
                  }, [
                    e("h5", null, l(p.text || "B站表情"), 1),
                    e("div", null, [
                      (o(!0), s(V, null, j(p.emote, (x) => (o(), s("button", {
                        key: x.text,
                        type: "button",
                        class: "bili-sub-emote-item",
                        title: x.text,
                        onClick: (O) => Se(x.text)
                      }, [
                        x.url ? (o(), s("img", {
                          key: 0,
                          src: x.url,
                          alt: x.text,
                          referrerpolicy: "no-referrer"
                        }, null, 8, so)) : (o(), s("span", no, l(x.text), 1))
                      ], 8, oo))), 128))
                    ])
                  ]))), 128))
                ]))
              ])) : k("", !0),
              q.value ? (o(), s("div", {
                key: 1,
                class: z(["bili-sub-comment-tip", { error: oe.value }])
              }, l(q.value), 3)) : k("", !0),
              e("div", lo, [
                J.value && !w.value.length ? (o(), s("p", ao, "正在加载评论…")) : L.value && !w.value.length ? (o(), s("p", ro, l(L.value), 1)) : k("", !0),
                (o(!0), s(V, null, j(w.value, (p) => (o(), s("div", {
                  key: p.id,
                  class: "bili-comment-item"
                }, [
                  e("img", {
                    class: "bili-comment-avatar",
                    src: p.avatar,
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer"
                  }, null, 8, uo),
                  e("div", co, [
                    e("div", po, [
                      e("span", bo, l(p.userName), 1),
                      p.level ? (o(), s("span", vo, "LV" + l(p.level), 1)) : k("", !0),
                      e("span", fo, l(p.timeStr), 1)
                    ]),
                    e("div", go, [
                      $e(Qe, {
                        text: p.message
                      }, null, 8, ["text"])
                    ]),
                    p.pictures?.length ? (o(), s("div", mo, [
                      (o(!0), s(V, null, j(p.pictures, (x, O) => (o(), s("a", {
                        key: O,
                        class: "bili-comment-pic-link",
                        href: x,
                        onClick: M((G) => R(p.pictures, O), ["stop", "prevent"])
                      }, [
                        e("img", {
                          class: "bili-comment-pic",
                          src: x,
                          alt: "评论图片",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, yo)
                      ], 8, ho))), 128))
                    ])) : k("", !0),
                    e("div", _o, [
                      p.likeCount ? (o(), s("span", ko, "👍 " + l(p.likeCount), 1)) : k("", !0),
                      p.replyCount ? (o(), s("span", $o, "💬 " + l(p.replyCount), 1)) : k("", !0)
                    ]),
                    p.replies?.length ? (o(), s("div", wo, [
                      (o(!0), s(V, null, j(p.replies, (x) => (o(), s("div", {
                        key: x.id,
                        class: "bili-comment-sub-item"
                      }, [
                        e("span", Co, l(x.userName) + ":", 1),
                        $e(Qe, {
                          text: x.message
                        }, null, 8, ["text"])
                      ]))), 128)),
                      e("div", xo, [
                        !p.subRepliesExpanded && (p.replyCount || 0) > p.replies.length ? (o(), s(V, { key: 0 }, [
                          e("span", null, "共 " + l(p.replyCount) + " 条回复，", 1),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: p.subRepliesLoading,
                            onClick: M((x) => u(p.id), ["stop"])
                          }, l(p.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, So)
                        ], 64)) : p.subRepliesExpanded ? (o(), s(V, { key: 1 }, [
                          p.subRepliesHasMore ? (o(), s("button", {
                            key: 0,
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: p.subRepliesLoading,
                            onClick: M((x) => u(p.id), ["stop"])
                          }, l(p.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, To)) : k("", !0),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-collapse-btn",
                            onClick: M((x) => b(p.id), ["stop"])
                          }, " 收起 ▴ ", 8, Mo)
                        ], 64)) : k("", !0)
                      ])
                    ])) : k("", !0)
                  ])
                ]))), 128))
              ]),
              e("div", Do, [
                H.value ? (o(), s("p", Po, "正在加载更多评论…")) : !W.value && w.value.length ? (o(), s("p", Eo, "已显示全部评论")) : k("", !0)
              ])
            ])
          ], 32)
        ])
      ])) : (o(), s("p", Io, "暂无可播放的订阅视频。"))
    ]));
  }
}), Lo = /* @__PURE__ */ Ee(Ro, [["__scopeId", "data-v-ee6b4dc4"]]), Bo = ["disabled"], zo = ["disabled"], Ao = { key: 0 }, No = ["disabled"], Vo = ["disabled"], Uo = ["disabled"], Go = ["disabled"], Fo = { class: "bili-sub-add-shell" }, Oo = ["disabled"], qo = { class: "bili-sub-add-toolbar" }, Ho = { class: "bili-sub-add-groups" }, Yo = ["onClick"], Wo = { class: "bili-sub-add-list" }, Xo = {
  key: 0,
  class: "fo-bili-loading"
}, jo = {
  key: 1,
  class: "fo-bili-empty"
}, Ko = {
  key: 2,
  class: "fo-bili-empty"
}, Qo = ["disabled", "onClick"], Jo = ["src"], Zo = {
  key: 1,
  class: "bili-sub-add-avatar"
}, es = {
  class: "fo-custom-confirm-modal",
  role: "dialog",
  "aria-modal": "true"
}, ts = { class: "fo-custom-confirm-head" }, is = { class: "fo-custom-confirm-body" }, os = { class: "fo-custom-confirm-actions" }, ss = ["disabled"], ns = ["disabled"], ls = /* @__PURE__ */ De({
  __name: "BiliOrganizerDialogs",
  setup(fe) {
    const d = te(() => st.create), $ = te(() => st.confirm), f = te(() => st.channelPicker), S = te(() => d.value.kind === "bili"), P = te(() => {
      const r = f.value, y = r.query.trim().toLowerCase(), w = r.groups.find((J) => J.id === r.activeGroupId), U = w ? new Set(w.mids) : null;
      return r.items.filter((J) => (!U || U.has(J.mid)) && (!y || J.name.toLowerCase().includes(y) || J.mid.includes(y)));
    });
    function T() {
      const r = d.value.name.trim();
      if (!r) {
        me.updateCreate({ status: "请输入名称", error: !0 });
        return;
      }
      me.submitCreate({ name: r, privacy: d.value.privacy });
    }
    return (r, y) => (o(), s(V, null, [
      d.value.open ? (o(), s("dialog", {
        key: 0,
        class: "fo-create-dialog",
        open: "",
        onClick: y[5] || (y[5] = M((w) => n(me).closeCreate(), ["self"])),
        onCancel: y[6] || (y[6] = M((w) => n(me).closeCreate(), ["prevent"]))
      }, [
        e("form", {
          onSubmit: M(T, ["prevent"])
        }, [
          e("header", null, [
            e("div", null, [
              y[14] || (y[14] = e("i", { class: "fo-folder-icon" }, null, -1)),
              e("span", null, [
                e("b", null, l(S.value ? "新建 B站收藏夹" : "新建插件分组"), 1),
                e("small", null, l(S.value ? "会同步创建到你的 B站账号" : "只整理左侧收藏夹，不修改 B站数据"), 1)
              ])
            ]),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: d.value.submitting,
              onClick: y[0] || (y[0] = (w) => n(me).closeCreate())
            }, "×", 8, Bo)
          ]),
          e("label", null, [
            e("span", null, l(S.value ? "收藏夹名称" : "分组名称"), 1),
            ce(e("input", {
              "onUpdate:modelValue": y[1] || (y[1] = (w) => d.value.name = w),
              maxlength: "48",
              autocomplete: "off",
              placeholder: "输入名称",
              required: "",
              disabled: d.value.submitting,
              autofocus: ""
            }, null, 8, zo), [
              [Te, d.value.name]
            ])
          ]),
          S.value ? (o(), s("fieldset", Ao, [
            y[17] || (y[17] = e("legend", null, "可见范围", -1)),
            e("label", null, [
              ce(e("input", {
                "onUpdate:modelValue": y[2] || (y[2] = (w) => d.value.privacy = w),
                type: "radio",
                value: 0,
                disabled: d.value.submitting
              }, null, 8, No), [
                [
                  ut,
                  d.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              y[15] || (y[15] = e("span", null, [
                e("b", null, "公开"),
                e("small", null, "其他人可以看到")
              ], -1))
            ]),
            e("label", null, [
              ce(e("input", {
                "onUpdate:modelValue": y[3] || (y[3] = (w) => d.value.privacy = w),
                type: "radio",
                value: 1,
                disabled: d.value.submitting
              }, null, 8, Vo), [
                [
                  ut,
                  d.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              y[16] || (y[16] = e("span", null, [
                e("b", null, "私密"),
                e("small", null, "仅自己可见")
              ], -1))
            ])
          ])) : k("", !0),
          e("p", {
            class: z(["fo-create-status", { error: d.value.error }]),
            role: "status"
          }, l(d.value.status), 3),
          e("footer", null, [
            e("button", {
              type: "button",
              disabled: d.value.submitting,
              onClick: y[4] || (y[4] = (w) => n(me).closeCreate())
            }, "取消", 8, Uo),
            e("button", {
              class: "primary",
              type: "submit",
              disabled: d.value.submitting
            }, l(d.value.submitting ? "创建中…" : S.value ? "创建收藏夹" : "创建分组"), 9, Go)
          ])
        ], 32)
      ], 32)) : k("", !0),
      f.value.open ? (o(), s("dialog", {
        key: 1,
        class: "bili-sub-add-dialog",
        open: "",
        onCancel: y[10] || (y[10] = M((w) => n(me).closeChannelPicker(), ["prevent"]))
      }, [
        e("div", Fo, [
          e("header", null, [
            y[18] || (y[18] = e("div", null, [
              e("b", null, "从我的关注中添加 UP 主"),
              e("small", null, "沿用“正在关注”的本地分组，只能添加已关注的 UP 主")
            ], -1)),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: !!f.value.submittingMid,
              onClick: y[7] || (y[7] = (w) => n(me).closeChannelPicker())
            }, "×", 8, Oo)
          ]),
          e("div", qo, [
            e("div", Ho, [
              e("button", {
                type: "button",
                class: z(["bili-sub-add-group", { on: f.value.activeGroupId === "__all__" }]),
                onClick: y[8] || (y[8] = (w) => n(me).updateChannelPicker({ activeGroupId: "__all__" }))
              }, "全部关注", 2),
              (o(!0), s(V, null, j(f.value.groups, (w) => (o(), s("button", {
                key: w.id,
                type: "button",
                class: z(["bili-sub-add-group", { on: f.value.activeGroupId === w.id }]),
                onClick: (U) => n(me).updateChannelPicker({ activeGroupId: w.id })
              }, l(w.name), 11, Yo))), 128))
            ]),
            ce(e("input", {
              "onUpdate:modelValue": y[9] || (y[9] = (w) => f.value.query = w),
              type: "search",
              placeholder: "搜索关注的 UP 主"
            }, null, 512), [
              [Te, f.value.query]
            ])
          ]),
          e("div", Wo, [
            f.value.loading ? (o(), s("div", Xo, [...y[19] || (y[19] = [
              e("i", null, null, -1),
              e("span", null, "正在读取关注分组…", -1)
            ])])) : f.value.error ? (o(), s("p", jo, l(f.value.error), 1)) : P.value.length ? (o(!0), s(V, { key: 3 }, j(P.value, (w) => (o(), s("button", {
              key: w.mid,
              type: "button",
              class: "bili-sub-add-up",
              disabled: w.added || !!f.value.submittingMid,
              onClick: (U) => n(me).selectChannel(w.mid)
            }, [
              w.face ? (o(), s("img", {
                key: 0,
                src: w.face,
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, Jo)) : (o(), s("span", Zo, "UP")),
              e("span", null, [
                e("b", null, l(w.name), 1),
                e("small", null, "UID " + l(w.mid), 1)
              ]),
              e("i", null, l(w.added ? "已添加" : f.value.submittingMid === w.mid ? "添加中…" : "＋ 添加"), 1)
            ], 8, Qo))), 128)) : (o(), s("p", Ko, "该分组中没有匹配的已关注 UP 主。"))
          ])
        ])
      ], 32)) : k("", !0),
      $.value.open ? (o(), s("div", {
        key: 2,
        class: "fo-custom-confirm-overlay",
        onClick: y[13] || (y[13] = M((w) => n(me).closeConfirm(), ["self"]))
      }, [
        e("div", es, [
          e("div", ts, [
            e("h4", null, l($.value.title), 1)
          ]),
          e("div", is, [
            e("p", null, l($.value.message), 1)
          ]),
          e("div", os, [
            e("button", {
              type: "button",
              class: "fo-confirm-btn cancel",
              disabled: $.value.submitting,
              onClick: y[11] || (y[11] = (w) => n(me).closeConfirm())
            }, l($.value.cancelText), 9, ss),
            e("button", {
              type: "button",
              class: z(["fo-confirm-btn confirm", { danger: $.value.danger }]),
              disabled: $.value.submitting,
              onClick: y[12] || (y[12] = (w) => n(me).submitConfirm())
            }, l($.value.submitting ? "处理中…" : $.value.confirmText), 11, ns)
          ])
        ])
      ])) : k("", !0)
    ], 64));
  }
}), as = ["aria-busy"], rs = { class: "field full-width" }, us = { class: "cache-directory-name" }, ds = { class: "cache-directory-actions" }, cs = ["disabled"], ps = ["disabled"], bs = /* @__PURE__ */ De({
  __name: "BiliSettingsPanel",
  props: {
    active: { type: Boolean }
  },
  setup(fe) {
    const d = fe, $ = D(!1), f = D(!1), S = D(""), P = D(!1), T = D(null), r = D("尚未选择缓存目录");
    let y = !0, w = 0;
    async function U() {
      if (!d.active || $.value) return;
      const H = ++w;
      f.value = !0;
      try {
        const L = await Pt();
        if (!y || H !== w) return;
        T.value = L, r.value = L?.name || "尚未选择缓存目录";
      } catch {
        y && H === w && (T.value = null, r.value = "缓存目录读取失败，请重试");
      } finally {
        y && H === w && (f.value = !1);
      }
    }
    async function J() {
      if ($.value || !d.active) return;
      const H = window.showDirectoryPicker;
      if (typeof H != "function") {
        S.value = "当前浏览器不支持目录选择，请使用支持此功能的 Edge 或 Chrome。", P.value = !0;
        return;
      }
      ++w, f.value = !1, $.value = !0, S.value = "";
      try {
        const L = await H.call(window, {
          id: "logicweaver-bili-cache",
          mode: "readwrite",
          startIn: T.value || "videos"
        });
        if (await Et(L), !y) return;
        T.value = L, r.value = L.name, P.value = !1, S.value = "目录已保存，新缓存将存入这里；已有视频不会移动或删除。";
      } catch (L) {
        y && L?.name !== "AbortError" && (P.value = !0, S.value = "目录选择或保存未确认，请重读目录核对后再试。");
      } finally {
        y && ($.value = !1);
      }
    }
    return ve(() => d.active, (H) => {
      H ? U() : ++w;
    }, { immediate: !0 }), He(() => window.addEventListener("focus", U)), gt(() => {
      y = !1, ++w, window.removeEventListener("focus", U);
    }), (H, L) => (o(), s("div", {
      class: "settings-subgroup bili-cache-settings",
      "aria-busy": $.value || f.value
    }, [
      e("div", rs, [
        e("p", us, l(f.value ? "正在读取缓存目录…" : r.value), 1),
        e("div", ds, [
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !d.active || $.value || f.value,
            onClick: J
          }, l($.value ? "正在保存…" : "选择或重新授权目录"), 9, cs),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !d.active || $.value || f.value,
            onClick: U
          }, "重读目录", 8, ps)
        ]),
        L[0] || (L[0] = e("p", { class: "hint" }, "仅更改之后的缓存位置；新缓存保留原目录关联，旧版记录需选择其实际所在目录后播放。不会自动扫描或搬移已有文件。", -1)),
        S.value ? (o(), s("p", {
          key: 0,
          class: z(["hint cache-directory-message", { "is-error": P.value }]),
          role: "status"
        }, l(S.value), 3)) : k("", !0)
      ])
    ], 8, as));
  }
}), vs = /* @__PURE__ */ Ee(bs, [["__scopeId", "data-v-ccf6929a"]]), fs = {
  class: "bili-cache-settings-view",
  "aria-labelledby": "bili-cache-settings-title"
}, gs = { class: "cache-settings-header" }, ms = { class: "cache-settings-card" }, hs = /* @__PURE__ */ De({
  __name: "BiliCacheSettingsView",
  props: {
    active: { type: Boolean }
  },
  emits: ["back"],
  setup(fe, { emit: d }) {
    const $ = d;
    return (f, S) => (o(), s("section", fs, [
      e("header", gs, [
        S[1] || (S[1] = e("div", null, [
          e("h3", { id: "bili-cache-settings-title" }, "缓存设置"),
          e("p", null, "管理 B站视频的本地缓存目录")
        ], -1)),
        e("button", {
          type: "button",
          class: "cache-settings-back",
          onClick: S[0] || (S[0] = (P) => $("back"))
        }, "返回缓存视频")
      ]),
      e("div", ms, [
        S[2] || (S[2] = e("h4", null, "视频缓存目录", -1)),
        S[3] || (S[3] = e("p", { class: "cache-settings-note" }, "选择后立即保存，无需到全局设置中操作。浏览器只提供文件夹名称，不显示完整磁盘路径。", -1)),
        $e(vs, { active: fe.active }, null, 8, ["active"])
      ])
    ]));
  }
}), ys = /* @__PURE__ */ Ee(hs, [["__scopeId", "data-v-43d869dd"]]), _s = { class: "fo-upg-shell" }, ks = { class: "fo-upg-body" }, $s = { class: "fo-upg-sidebar" }, ws = { class: "fo-upg-sidebar-head" }, Cs = { class: "fo-upg-group-items" }, xs = ["onDragstart", "onDrop", "onClick"], Ss = ["onKeydown"], Ts = {
  key: 0,
  class: "fo-upg-tree-branch"
}, Ms = {
  key: 1,
  class: "fo-folder-icon"
}, Ds = { class: "fo-upg-group-name" }, Ps = { class: "fo-upg-vue-group-actions" }, Es = ["onClick"], Is = ["onClick"], Rs = ["onClick"], Ls = ["placeholder"], Bs = {
  key: 1,
  class: "muted small"
}, zs = { class: "fo-upg-main" }, As = { class: "fo-upg-main-head" }, Ns = { class: "fo-upg-main-title" }, Vs = { key: 0 }, Us = { class: "fo-upg-head-actions" }, Gs = { class: "fo-upg-filter-tabs" }, Fs = { class: "fo-upg-batch-wrap" }, Os = { class: "fo-upg-batch-count" }, qs = ["disabled"], Hs = ["disabled"], Ys = { class: "fo-upg-toolbar" }, Ws = { class: "fo-upg-search" }, Xs = ["disabled"], js = {
  key: 0,
  class: "fo-bili-loading"
}, Ks = {
  key: 1,
  class: "fo-bili-empty"
}, Qs = {
  key: 2,
  class: "fo-bili-empty"
}, Js = {
  key: 3,
  class: "fo-bili-empty"
}, Zs = ["title", "onContextmenu", "onClick"], en = ["src"], tn = { class: "fo-upg-info" }, on = { class: "fo-upg-name" }, sn = { class: "fo-upg-sign" }, nn = ["disabled", "onClick"], ln = {
  key: 1,
  class: "fo-upg-move-wrap"
}, an = ["disabled"], rn = { class: "fo-upg-move-dropdown" }, un = ["disabled", "onClick"], dn = { key: 0 }, cn = {
  key: 0,
  class: "muted small",
  style: { padding: "6px 10px" }
}, pn = ["disabled", "onClick"], bn = { class: "fo-upg-pagination" }, vn = { class: "fo-upg-page-info" }, fn = {
  key: 0,
  class: "fo-upg-page-btns"
}, gn = ["disabled"], mn = ["disabled"], hn = { class: "fo-upg-page-cur" }, yn = ["disabled"], _n = ["disabled"], kn = /* @__PURE__ */ De({
  __name: "BiliUpGroupManager",
  setup(fe) {
    const d = D(void 0), $ = D(""), f = D(""), S = D(""), P = D(""), T = D(!1), r = D(/* @__PURE__ */ new Set()), y = D(null);
    function w(_) {
      if (_.button !== 0 || _.target.closest("button,input")) return;
      const u = y.value;
      if (!u) return;
      const b = u.getBoundingClientRect(), B = b.left, re = b.top, ge = _.clientX, Se = _.clientY;
      u.style.position = "fixed", u.style.left = `${B}px`, u.style.top = `${re}px`, u.style.right = "auto", u.style.bottom = "auto", u.style.margin = "0", u.style.transform = "none";
      const Ce = (Ie) => {
        const Ve = Ie.clientX - ge, Ue = Ie.clientY - Se, ye = Math.max(8, Math.min(window.innerWidth - 120, B + Ve)), Be = Math.max(8, Math.min(window.innerHeight - 80, re + Ue));
        u.style.left = `${ye}px`, u.style.top = `${Be}px`;
      }, Pe = () => {
        window.removeEventListener("pointermove", Ce), window.removeEventListener("pointerup", Pe);
      };
      window.addEventListener("pointermove", Ce), window.addEventListener("pointerup", Pe);
    }
    const U = te(() => m.groups.find((_) => _.id === m.activeGroupId) || null), J = te(() => {
      const _ = m.query.trim().toLowerCase(), u = m.activeGroupId;
      return m.followings.filter((b) => {
        if (_ && !b.name.toLowerCase().includes(_) && !b.sign.toLowerCase().includes(_) && !b.mid.includes(_)) return !1;
        const B = b.groupIds.includes(u);
        return m.filter === "ingroup" ? B : m.onlyUngrouped ? !b.groupIds || b.groupIds.length === 0 : !0;
      });
    }), H = te(() => Math.max(1, Math.ceil(J.value.length / m.pageSize))), L = te(() => {
      const u = (Math.min(m.page, H.value) - 1) * m.pageSize;
      return J.value.slice(u, u + m.pageSize);
    }), W = te(() => m.followings.filter((_) => _.groupIds.length === 0).length), Q = D(null), Y = /* @__PURE__ */ new Map();
    function E(_) {
      const u = Math.max(1, Math.min(H.value, _));
      m.page = u, Q.value && (Q.value.scrollTop = 0);
    }
    ve(() => [m.query, m.filter, m.onlyUngrouped], () => {
      m.page = 1, Q.value && (Q.value.scrollTop = 0);
    }), ve(() => m.activeGroupId, (_, u) => {
      if (u && Q.value) {
        const re = `${u}_${m.filter}_${m.onlyUngrouped}`;
        Y.set(re, {
          page: m.page,
          scrollTop: Q.value.scrollTop
        });
      }
      if (m.filter === "all")
        return;
      const b = `${_}_${m.filter}_${m.onlyUngrouped}`, B = Y.get(b);
      B ? (m.page = Math.min(B.page, H.value), nt(() => {
        Q.value && (Q.value.scrollTop = B.scrollTop);
      })) : (m.page = 1, nt(() => {
        Q.value && (Q.value.scrollTop = 0);
      }));
    }), ve(H, (_) => {
      m.page > _ && (m.page = _);
    }), ve(T, (_) => {
      _ || r.value.clear();
    });
    function q(_) {
      d.value = _, $.value = "";
    }
    function oe() {
      d.value = void 0, $.value = "";
    }
    function ie() {
      const _ = $.value.trim();
      _ && (ke.dispatch("create-group", { name: _, parentId: d.value || "" }), oe());
    }
    function pe(_) {
      f.value = _.id, S.value = _.name;
    }
    function v() {
      const _ = S.value.trim();
      f.value && _ && ke.dispatch("rename-group", { id: f.value, name: _ }), f.value = "", S.value = "";
    }
    function se(_, u) {
      P.value = u, _.dataTransfer?.setData("application/x-logicweaver-up-group", u), _.dataTransfer && (_.dataTransfer.effectAllowed = "move");
    }
    function ne(_, u) {
      const b = _.dataTransfer?.getData("application/x-logicweaver-up-group") || P.value;
      if (P.value = "", !b || b === u) return;
      const B = _.currentTarget?.getBoundingClientRect(), re = B ? _.clientY - B.top : 0, ge = B ? re < B.height * 0.25 ? "before" : re > B.height * 0.75 ? "after" : "into" : "into";
      ke.dispatch("move-group", { sourceId: b, targetId: u, mode: ge });
    }
    function ee(_) {
      const u = _.dataTransfer?.getData("application/x-logicweaver-up-group") || P.value;
      P.value = "", u && ke.dispatch("move-group", { sourceId: u, targetId: "", mode: "root" });
    }
    function le(_, u) {
      !u || m.busyMid || ke.dispatch("toggle-member", { groupId: u, mid: _ });
    }
    function be(_) {
      !m.activeGroupId || m.busyMid || ke.dispatch("toggle-member", { groupId: m.activeGroupId, mid: _ });
    }
    function we(_, u) {
      ke.dispatch("preview-up", { mid: u, clientX: _.clientX, clientY: _.clientY });
    }
    function R(_) {
      const u = r.value;
      u.has(_) ? u.delete(_) : u.add(_);
    }
    function g() {
      if (!m.activeGroupId || m.busyMid) return;
      const _ = Array.from(r.value);
      if (!_.length) return;
      const u = _.filter((b) => {
        const B = m.followings.find((re) => re.mid === b);
        return B && !B.groupIds.includes(m.activeGroupId);
      });
      if (u.length) {
        for (const b of u)
          ke.dispatch("toggle-member", { groupId: m.activeGroupId, mid: b });
        r.value.clear();
      }
    }
    function F() {
      if (!m.activeGroupId || m.busyMid) return;
      const _ = Array.from(r.value);
      if (!_.length) return;
      const u = _.filter((b) => {
        const B = m.followings.find((re) => re.mid === b);
        return B && B.groupIds.includes(m.activeGroupId);
      });
      if (u.length) {
        for (const b of u)
          ke.dispatch("toggle-member", { groupId: m.activeGroupId, mid: b });
        r.value.clear();
      }
    }
    function Z() {
      for (const _ of L.value) r.value.add(_.mid);
    }
    return (_, u) => n(m).open ? (o(), s("dialog", {
      key: 0,
      ref_key: "dialogEl",
      ref: y,
      class: "fo-up-group-dialog",
      open: "",
      onCancel: u[20] || (u[20] = M((b) => n(ke).close(), ["prevent"]))
    }, [
      e("div", _s, [
        e("header", {
          class: "fo-upg-head",
          onPointerdown: w
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
            onClick: u[0] || (u[0] = (b) => n(ke).close())
          }, "✕")
        ], 32),
        e("div", ks, [
          e("aside", $s, [
            e("div", ws, [
              u[22] || (u[22] = e("span", null, "我的分组", -1)),
              e("button", {
                type: "button",
                onClick: u[1] || (u[1] = (b) => q(null))
              }, "＋ 新建")
            ]),
            e("div", Cs, [
              e("div", {
                class: "fo-upg-root-dropzone",
                onDragover: u[2] || (u[2] = M(() => {
                }, ["prevent"])),
                onDrop: M(ee, ["prevent"])
              }, "⇣ 拖至此处变为顶级分组", 32),
              d.value === null ? (o(), s("form", {
                key: 0,
                class: "fo-upg-create-box",
                onSubmit: M(ie, ["prevent"])
              }, [
                ce(e("input", {
                  "onUpdate:modelValue": u[3] || (u[3] = (b) => $.value = b),
                  maxlength: "20",
                  placeholder: "输入分组名称…",
                  autofocus: ""
                }, null, 512), [
                  [Te, $.value]
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
              ], 32)) : k("", !0),
              (o(!0), s(V, null, j(n(m).groups, (b) => (o(), s(V, {
                key: b.id
              }, [
                e("div", {
                  class: z(["fo-upg-group-item", { on: b.id === n(m).activeGroupId, "is-subgroup": b.depth > 0 }]),
                  style: Me({ paddingLeft: `${8 + b.depth * 18}px` }),
                  draggable: "true",
                  onDragstart: (B) => se(B, b.id),
                  onDragover: u[7] || (u[7] = M(() => {
                  }, ["prevent"])),
                  onDrop: M((B) => ne(B, b.id), ["prevent"]),
                  onClick: (B) => n(m).activeGroupId = b.id
                }, [
                  f.value === b.id ? (o(), s(V, { key: 0 }, [
                    ce(e("input", {
                      "onUpdate:modelValue": u[4] || (u[4] = (B) => S.value = B),
                      class: "fo-upg-rename-input",
                      maxlength: "20",
                      onClick: u[5] || (u[5] = M(() => {
                      }, ["stop"])),
                      onKeydown: Le(M(v, ["prevent"]), ["enter"])
                    }, null, 40, Ss), [
                      [Te, S.value]
                    ]),
                    e("button", {
                      type: "button",
                      onClick: M(v, ["stop"])
                    }, "✓"),
                    e("button", {
                      type: "button",
                      onClick: u[6] || (u[6] = M((B) => f.value = "", ["stop"]))
                    }, "✕")
                  ], 64)) : (o(), s(V, { key: 1 }, [
                    b.depth ? (o(), s("span", Ts, "↳")) : (o(), s("i", Ms)),
                    e("span", Ds, l(b.name), 1),
                    e("small", null, l(b.upMids.length), 1),
                    e("span", Ps, [
                      e("button", {
                        type: "button",
                        title: "添加子分组",
                        onClick: M((B) => q(b.id), ["stop"])
                      }, "＋", 8, Es),
                      e("button", {
                        type: "button",
                        title: "重命名",
                        onClick: M((B) => pe(b), ["stop"])
                      }, "✎", 8, Is),
                      e("button", {
                        type: "button",
                        class: "danger",
                        title: "删除",
                        onClick: M((B) => n(ke).dispatch("delete-group", b.id), ["stop"])
                      }, "×", 8, Rs)
                    ])
                  ], 64))
                ], 46, xs),
                d.value === b.id ? (o(), s("form", {
                  key: 0,
                  class: "fo-upg-create-box",
                  style: Me({ marginLeft: `${18 + b.depth * 18}px` }),
                  onSubmit: M(ie, ["prevent"])
                }, [
                  ce(e("input", {
                    "onUpdate:modelValue": u[8] || (u[8] = (B) => $.value = B),
                    maxlength: "20",
                    placeholder: `输入「${b.name}」的子分组名称…`,
                    autofocus: ""
                  }, null, 8, Ls), [
                    [Te, $.value]
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
                ], 36)) : k("", !0)
              ], 64))), 128)),
              !n(m).groups.length && !n(m).loading ? (o(), s("p", Bs, '暂无分组，请点击"＋ 新建"。')) : k("", !0)
            ])
          ]),
          e("section", zs, [
            e("div", As, [
              e("div", Ns, [
                e("h4", null, l(U.value ? `分组：「${U.value.name}」` : "请先选择或新建分组"), 1),
                U.value ? (o(), s("span", Vs, "（本组 " + l(U.value.upMids.length) + " 位 · 共 " + l(n(m).followings.length) + " 位关注 · 未分组 " + l(W.value) + " 位）", 1)) : k("", !0)
              ]),
              e("div", Us, [
                e("div", Gs, [
                  e("button", {
                    type: "button",
                    class: z(["fo-upg-filter-tab", { on: n(m).filter === "all" }]),
                    onClick: u[9] || (u[9] = (b) => n(m).filter = "all")
                  }, "全部关注", 2),
                  e("button", {
                    type: "button",
                    class: z(["fo-upg-filter-tab", { on: n(m).filter === "ingroup" }]),
                    onClick: u[10] || (u[10] = (b) => n(m).filter = "ingroup")
                  }, "本组已加", 2)
                ]),
                e("div", Fs, [
                  e("button", {
                    type: "button",
                    class: z(["fo-upg-batch-toggle", { on: T.value }]),
                    onClick: u[11] || (u[11] = (b) => T.value = !T.value)
                  }, l(T.value ? "退出批量" : "批量操作"), 3),
                  T.value && r.value.size > 0 ? (o(), s(V, { key: 0 }, [
                    e("span", Os, "已选 " + l(r.value.size), 1),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action add",
                      disabled: !U.value,
                      onClick: g
                    }, "＋ 加入本组", 8, qs),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action remove",
                      disabled: !U.value,
                      onClick: F
                    }, "− 移出本组", 8, Hs),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: Z
                    }, "全选当页"),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: u[12] || (u[12] = (b) => r.value.clear())
                    }, "清除")
                  ], 64)) : k("", !0)
                ]),
                n(m).filter === "all" ? (o(), s("label", {
                  key: 0,
                  class: z(["fo-upg-switch", { on: n(m).onlyUngrouped }])
                }, [
                  ce(e("input", {
                    "onUpdate:modelValue": u[13] || (u[13] = (b) => n(m).onlyUngrouped = b),
                    type: "checkbox"
                  }, null, 512), [
                    [Ct, n(m).onlyUngrouped]
                  ]),
                  u[25] || (u[25] = e("span", { class: "fo-upg-switch-track" }, [
                    e("span", { class: "fo-upg-switch-thumb" })
                  ], -1)),
                  u[26] || (u[26] = e("span", { class: "fo-upg-switch-text" }, "仅未分组 UP", -1))
                ], 2)) : k("", !0)
              ])
            ]),
            e("div", Ys, [
              e("div", Ws, [
                u[27] || (u[27] = e("span", null, "🔍", -1)),
                ce(e("input", {
                  "onUpdate:modelValue": u[14] || (u[14] = (b) => n(m).query = b),
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
                onClick: u[15] || (u[15] = (b) => n(ke).dispatch("refresh"))
              }, l(n(m).refreshing ? "刷新中…" : "↻ 刷新关注"), 9, Xs)
            ]),
            e("div", {
              ref_key: "listRef",
              ref: Q,
              class: "fo-upg-list"
            }, [
              n(m).loading ? (o(), s("div", js, [...u[28] || (u[28] = [
                e("i", null, null, -1),
                e("span", null, "正在加载关注的 UP 主列表…", -1)
              ])])) : n(m).error ? (o(), s("p", Ks, l(n(m).error), 1)) : U.value ? L.value.length ? (o(!0), s(V, { key: 4 }, j(L.value, (b) => (o(), s("article", {
                key: b.mid,
                class: z(["fo-upg-card", { selected: T.value && r.value.has(b.mid) }]),
                title: `右键查看「${b.name}」近期投稿`,
                onContextmenu: M((B) => we(B, b.mid), ["prevent"]),
                onClick: (B) => T.value ? R(b.mid) : void 0
              }, [
                e("img", {
                  src: b.face,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, en),
                e("div", tn, [
                  e("div", on, l(b.name), 1),
                  e("div", sn, l(b.sign || "暂无签名"), 1)
                ]),
                T.value ? (o(), s("div", {
                  key: 1,
                  class: z(["fo-upg-batch-check", { checked: r.value.has(b.mid) }])
                }, l(r.value.has(b.mid) ? "✓" : ""), 3)) : (o(), s(V, { key: 0 }, [
                  b.groupIds.includes(n(m).activeGroupId) ? (o(), s("button", {
                    key: 0,
                    type: "button",
                    class: "fo-upg-toggle-btn in-group",
                    disabled: n(m).busyMid === b.mid,
                    onClick: M((B) => be(b.mid), ["stop"])
                  }, l(n(m).busyMid === b.mid ? "处理中…" : `移出 ${U.value?.name || ""}`), 9, nn)) : b.groupIds.length > 0 ? (o(), s("div", ln, [
                    e("button", {
                      type: "button",
                      class: "fo-upg-toggle-btn belongs-other fo-upg-move-trigger",
                      disabled: n(m).busyMid === b.mid
                    }, l(n(m).busyMid === b.mid ? "处理中…" : `📁 ${b.groupName || "已分组"}`), 9, an),
                    e("div", rn, [
                      u[30] || (u[30] = e("div", { class: "fo-upg-move-title" }, "移动到分组", -1)),
                      (o(!0), s(V, null, j(n(m).groups, (B) => (o(), s("button", {
                        key: B.id,
                        type: "button",
                        class: z(["fo-upg-move-item", { active: b.groupIds.includes(B.id) }]),
                        disabled: n(m).busyMid === b.mid,
                        onClick: M((re) => le(b.mid, B.id), ["stop"])
                      }, [
                        u[29] || (u[29] = e("i", { class: "fo-folder-icon small" }, null, -1)),
                        e("span", null, l(B.name), 1),
                        b.groupIds.includes(B.id) ? (o(), s("small", dn, "✓ 已加入")) : k("", !0)
                      ], 10, un))), 128)),
                      n(m).groups.length ? k("", !0) : (o(), s("p", cn, "暂无分组"))
                    ])
                  ])) : n(m).activeGroupId ? (o(), s("button", {
                    key: 2,
                    type: "button",
                    class: "fo-upg-toggle-btn",
                    disabled: n(m).busyMid === b.mid,
                    onClick: M((B) => be(b.mid), ["stop"])
                  }, l(n(m).busyMid === b.mid ? "处理中…" : "＋ 加入"), 9, pn)) : k("", !0)
                ], 64))
              ], 42, Zs))), 128)) : (o(), s("p", Js, "没有符合条件的 UP 主。")) : (o(), s("p", Qs, "请先新建或选择一个分组。"))
            ], 512),
            e("div", bn, [
              e("div", vn, "共 " + l(J.value.length) + " 位 UP 主 · 每页 " + l(n(m).pageSize) + " 位", 1),
              H.value > 1 ? (o(), s("div", fn, [
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page <= 1,
                  onClick: u[16] || (u[16] = (b) => E(1))
                }, "« 首页", 8, gn),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page <= 1,
                  onClick: u[17] || (u[17] = (b) => E(n(m).page - 1))
                }, "‹ 上一页", 8, mn),
                e("span", hn, l(n(m).page) + " / " + l(H.value), 1),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page >= H.value,
                  onClick: u[18] || (u[18] = (b) => E(n(m).page + 1))
                }, "下一页 ›", 8, yn),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page >= H.value,
                  onClick: u[19] || (u[19] = (b) => E(H.value))
                }, "末页 »", 8, _n)
              ])) : k("", !0)
            ])
          ])
        ])
      ])
    ], 544)) : k("", !0);
  }
}), $n = /* @__PURE__ */ Ee(kn, [["__scopeId", "data-v-f738263e"]]), bt = {
  phase: "idle",
  isSeriesPickerOpen: !1,
  insertedTitle: ""
};
class wn {
  constructor() {
    this._state = { ...bt }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.biliRadioTape = this);
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
  subscribe(d) {
    return this._listeners.add(d), () => {
      this._listeners.delete(d);
    };
  }
  _setState(d) {
    this._state = d;
    for (const $ of this._listeners)
      $(d);
  }
  send(d) {
    const $ = this._state;
    switch (d.type) {
      case "DRAG_ENTER":
        return $.phase === "idle" ? (this._setState({
          ...$,
          phase: "drag_over"
        }), !0) : !1;
      case "DRAG_LEAVE":
        return $.phase === "drag_over" ? (this._setState({
          ...$,
          phase: "idle"
        }), !0) : !1;
      case "START_INSERT":
        return this._setState({
          phase: "inserting",
          isSeriesPickerOpen: !1,
          insertedTitle: d.title
        }), !0;
      case "FINISH_INSERT":
        return $.phase === "inserting" ? (this._setState({
          phase: "idle",
          isSeriesPickerOpen: !1,
          insertedTitle: ""
        }), !0) : !1;
      case "TOGGLE_SERIES_PICKER": {
        if ($.phase === "collapsed" || $.phase === "inserting") return !1;
        const f = d.open !== void 0 ? d.open : !$.isSeriesPickerOpen;
        return this._setState({
          ...$,
          isSeriesPickerOpen: f
        }), !0;
      }
      case "TOGGLE_COLLAPSE": {
        const f = d.collapsed !== void 0 ? d.collapsed : $.phase !== "collapsed";
        return this._setState({
          phase: f ? "collapsed" : "idle",
          isSeriesPickerOpen: !1,
          insertedTitle: ""
        }), !0;
      }
      case "RESET_IDLE":
        return this._setState({ ...bt }), !0;
      default:
        return !1;
    }
  }
}
const Cn = ["title"], xn = { class: "tape-capsule-text" }, Sn = { class: "capsule-title" }, Tn = { class: "capsule-sub" }, Mn = ["title"], Dn = { class: "tape-deck-drop-slot" }, Pn = {
  key: 1,
  class: "tape-insert-feedback-chip"
}, En = { class: "tape-loaded-title" }, In = { class: "tape-body-content" }, Rn = ["title", "onKeydown"], Ln = { class: "tape-cassette" }, Bn = { class: "tape-center-label" }, zn = { class: "tape-sticker-head" }, An = ["title"], Nn = ["src"], Vn = { class: "tape-badge-row" }, Un = { class: "tape-brand-text" }, Gn = { class: "tape-series-header" }, Fn = { class: "tape-series-title-group" }, On = { class: "tape-series-count-pill" }, qn = { class: "tape-series-list-scroll" }, Hn = ["onClick"], Yn = { class: "tape-series-item-left" }, Wn = { class: "tape-series-item-info" }, Xn = ["title"], jn = { class: "tape-series-item-count" }, Kn = {
  key: 0,
  class: "tape-series-playing-tag"
}, Qn = {
  key: 1,
  class: "tape-series-play-action"
}, Jn = {
  key: 0,
  class: "tape-series-empty"
}, Zn = {
  class: "tape-transport-controls",
  role: "group",
  "aria-label": "电台播放控制"
}, el = ["title", "aria-label"], tl = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, il = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, ol = { class: "tape-playback-section" }, sl = { class: "tape-time-lyric-row" }, nl = { class: "tape-timestamp" }, ll = { class: "tape-lyric-container" }, al = ["title"], rl = ["title", "aria-label"], ul = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, dl = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, cl = {
  key: 2,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, pl = ["aria-valuenow"], bl = {
  class: "tape-waveform-row",
  "aria-hidden": "true"
}, vl = {
  class: "tape-waveform-svg",
  viewBox: "0 0 160 16",
  preserveAspectRatio: "none"
}, fl = ["x", "y", "height"], gl = /* @__PURE__ */ De({
  __name: "BiliRadioTapePlayer",
  props: {
    dockSide: { type: Boolean, default: !1 }
  },
  setup(fe) {
    const d = fe, $ = [
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
    ], f = D(!1), S = D(null), P = new wn(), T = It(P), r = te(() => T.value.phase === "drag_over"), y = te(() => T.value.phase === "inserting"), w = te(() => T.value.insertedTitle), U = te(() => T.value.phase === "collapsed"), J = te(() => T.value.isSeriesPickerOpen);
    function H(R) {
      R.stopPropagation(), P.send({ type: "TOGGLE_SERIES_PICKER" }), P.isSeriesPickerOpen && it.init();
    }
    async function L(R) {
      P.send({ type: "TOGGLE_SERIES_PICKER", open: !1 }), await it.playSeries(R, 0);
    }
    function W(R) {
      if (!J.value) return;
      const g = R.target;
      !g?.closest(".tape-series-popover") && !g?.closest(".tape-cassette-wrap") && P.send({ type: "TOGGLE_SERIES_PICKER", open: !1 });
    }
    function Q(R) {
      R.key === "Escape" && J.value && P.send({ type: "TOGGLE_SERIES_PICKER", open: !1 });
    }
    const Y = te(() => X.mode === "one" ? "单曲循环" : X.mode === "shuffle" ? "乱序播放" : "顺序播放"), E = D(380);
    function q() {
      if (typeof document > "u" || !d.dockSide) return;
      const R = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock"), g = 20, F = 16;
      if (R) {
        const _ = R.getBoundingClientRect();
        if (_.left > 80) {
          const u = Math.floor(_.left - g - F);
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
    function ie() {
      clearTimeout(oe), oe = setTimeout(q, 60);
    }
    He(() => {
      if (it.init(), typeof window < "u" && (window.addEventListener("pointerdown", W), window.addEventListener("keydown", Q)), d.dockSide) {
        q(), window.addEventListener("resize", ie);
        const R = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
        if (R && typeof ResizeObserver < "u") {
          const g = new ResizeObserver(() => q());
          g.observe(R), R.__bili_dock_ro = g;
        }
      }
    }), ft(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", W), window.removeEventListener("keydown", Q), window.removeEventListener("resize", ie));
      const R = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
      R && R.__bili_dock_ro && (R.__bili_dock_ro.disconnect(), delete R.__bili_dock_ro);
    });
    function pe(R) {
      R.preventDefault(), P.send({ type: "DRAG_ENTER" });
    }
    function v(R) {
      R.preventDefault(), R.dataTransfer && (R.dataTransfer.dropEffect = "copy"), P.send({ type: "DRAG_ENTER" });
    }
    function se(R) {
      const g = R.currentTarget, F = R.relatedTarget;
      (!F || !g.contains(F)) && P.send({ type: "DRAG_LEAVE" });
    }
    function ne(R) {
      R.preventDefault(), P.send({ type: "DRAG_LEAVE" });
      const g = R.dataTransfer;
      if (!g) return;
      let F = g.getData("application/x-bili-cassette") || g.getData("application/json"), Z = null;
      if (F)
        try {
          Z = JSON.parse(F);
        } catch {
        }
      if (!Z?.bvid) {
        const u = (g.getData("text/plain") || g.getData("text/uri-list") || g.getData("application/x-logicweaver-video-url"))?.match(/BV[0-9a-zA-Z]+/);
        u && (Z = {
          bvid: u[0],
          title: "放入的单曲卡带",
          cover: "",
          author: "Bilibili",
          duration: 0
        });
      }
      Z?.bvid && (P.send({ type: "START_INSERT", title: Z.title || Z.bvid }), setTimeout(() => {
        ze.insertAndPlay(Z);
      }, 280), setTimeout(() => {
        P.send({ type: "FINISH_INSERT" });
      }, 1500));
    }
    function ee(R) {
      if (S.value) {
        f.value = !0;
        try {
          R.currentTarget?.setPointerCapture?.(R.pointerId);
        } catch {
        }
        we(R);
      }
    }
    function le(R) {
      f.value && we(R);
    }
    function be(R) {
      if (f.value) {
        we(R), f.value = !1;
        try {
          R.currentTarget?.releasePointerCapture?.(R.pointerId);
        } catch {
        }
      }
    }
    function we(R) {
      if (!S.value) return;
      const g = S.value.getBoundingClientRect();
      if (g.width <= 0) return;
      const F = R.clientX - g.left, Z = Math.max(0, Math.min(100, F / g.width * 100));
      ze.seek(Z);
    }
    return (R, g) => (o(), s("div", {
      class: z(["bili-tape-deck", {
        "is-playing": n(X).playing,
        "is-drag-over": r.value,
        "is-inserting": y.value,
        "dock-side-mode": d.dockSide,
        "dock-side-collapsed": d.dockSide && U.value
      }]),
      style: Me(d.dockSide && !U.value ? { maxWidth: `${E.value}px` } : void 0),
      onDragenter: pe,
      onDragover: v,
      onDragleave: se,
      onDrop: ne
    }, [
      d.dockSide && U.value ? (o(), s("div", {
        key: 0,
        class: "tape-collapsed-capsule",
        title: `电台：${n(X).title || "哔哩哔哩电台"}`
      }, [
        e("div", {
          class: z(["tape-capsule-spool", { spinning: n(X).playing }])
        }, [...g[9] || (g[9] = [
          e("div", { class: "spool-center-dot" }, null, -1)
        ])], 2),
        e("div", xn, [
          e("strong", Sn, l(n(X).title || "B站电台"), 1),
          e("small", Tn, l(n(X).playing ? "♪ 播放中" : "已暂停"), 1)
        ]),
        e("button", {
          type: "button",
          class: "tape-capsule-play-btn",
          title: n(X).playing ? "暂停" : "播放",
          onClick: g[0] || (g[0] = M((F) => n(ze).togglePlay(), ["stop"]))
        }, l(n(X).playing ? "⏸" : "▶"), 9, Mn),
        e("button", {
          type: "button",
          class: "tape-capsule-expand-btn",
          title: "展开完整磁带播放条",
          onClick: g[1] || (g[1] = M((F) => n(P).send({ type: "TOGGLE_COLLAPSE", collapsed: !1 }), ["stop"]))
        }, " ↗ ")
      ], 8, Cn)) : k("", !0),
      ce(e("div", Dn, [...g[10] || (g[10] = [
        tt('<div class="slot-visual-frame" data-v-1834c419><span class="slot-icon-tape" data-v-1834c419>📼</span><div class="slot-text-col" data-v-1834c419><strong class="slot-headline" data-v-1834c419>释放鼠标装填卡带</strong><small class="slot-subline" data-v-1834c419>拖入视频封面 · 立即播放音乐</small></div></div>', 1)
      ])], 512), [
        [lt, r.value]
      ]),
      y.value ? (o(), s("div", Pn, [
        g[11] || (g[11] = e("span", { class: "tape-click-sound" }, "✓ 已装填", -1)),
        e("span", En, "《" + l(w.value) + "》", 1)
      ])) : k("", !0),
      ce(e("div", In, [
        e("div", {
          class: "tape-cassette-wrap",
          role: "button",
          tabindex: "0",
          title: `点击选择电台系列 (已建 ${n(I).radioSeries.length} 个系列 · 也可直接拖拽视频封面至此装填)`,
          onClick: H,
          onKeydown: Le(M(H, ["prevent"]), ["enter", "space"])
        }, [
          e("div", Ln, [
            g[14] || (g[14] = e("div", { class: "tape-spool tape-spool-left" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1)),
            e("div", Bn, [
              e("div", zn, [
                n(X).coverUrl ? (o(), s("div", {
                  key: 0,
                  class: "tape-cover-sticker",
                  title: n(X).title
                }, [
                  e("img", {
                    src: n(X).coverUrl,
                    alt: "Cover",
                    referrerpolicy: "no-referrer"
                  }, null, 8, Nn)
                ], 8, An)) : k("", !0),
                e("div", Vn, [
                  g[12] || (g[12] = e("span", { class: "side-letter" }, "A", -1)),
                  e("span", Un, l(n(X).seriesName || "CASSETTE"), 1)
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
          J.value ? (o(), s("div", {
            key: 0,
            class: "tape-series-popover",
            onClick: g[3] || (g[3] = M(() => {
            }, ["stop"]))
          }, [
            e("div", Gn, [
              e("div", Fn, [
                g[16] || (g[16] = e("span", { class: "tape-series-icon" }, "📻", -1)),
                g[17] || (g[17] = e("span", { class: "tape-series-title" }, "自建电台系列", -1)),
                e("span", On, l(n(I).radioSeries.length), 1)
              ]),
              e("button", {
                type: "button",
                class: "tape-series-close-btn",
                title: "关闭",
                "aria-label": "关闭",
                onClick: g[2] || (g[2] = M((F) => J.value = !1, ["stop"]))
              }, " ✕ ")
            ]),
            e("div", qn, [
              (o(!0), s(V, null, j(n(I).radioSeries, (F) => (o(), s("div", {
                key: F.id,
                class: z(["tape-series-item", { "is-active": n(X).seriesName === F.name }]),
                onClick: M((Z) => L(F.id), ["stop"])
              }, [
                e("div", Yn, [
                  g[18] || (g[18] = e("span", { class: "tape-series-item-bullet" }, "📼", -1)),
                  e("div", Wn, [
                    e("span", {
                      class: "tape-series-item-name",
                      title: F.name
                    }, l(F.name), 9, Xn),
                    e("span", jn, l(F.count) + " 首曲目 · 顺序连播", 1)
                  ])
                ]),
                n(X).seriesName === F.name && n(X).playing ? (o(), s("span", Kn, " 播放中 ")) : (o(), s("span", Qn, " ▶ "))
              ], 10, Hn))), 128)),
              n(I).radioSeries.length ? k("", !0) : (o(), s("div", Jn, [...g[19] || (g[19] = [
                e("span", { class: "empty-icon" }, "📂", -1),
                e("span", { class: "empty-text" }, "暂无保存的电台系列", -1),
                e("span", { class: "empty-tip" }, "可在 B站工作区 → 电台 中添加曲目并保存为系列", -1)
              ])]))
            ])
          ])) : k("", !0)
        ], 40, Rn),
        e("div", Zn, [
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "上一首",
            "aria-label": "上一首",
            onClick: g[4] || (g[4] = (F) => n(ze).prev())
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
            class: z(["tape-ctrl-btn tape-ctrl-play", { playing: n(X).playing }]),
            title: n(X).playing ? "暂停播放" : "开始播放",
            "aria-label": n(X).playing ? "暂停" : "播放",
            onClick: g[5] || (g[5] = (F) => n(ze).togglePlay())
          }, [
            n(X).playing ? (o(), s("svg", tl, [...g[21] || (g[21] = [
              e("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" }, null, -1)
            ])])) : (o(), s("svg", il, [...g[22] || (g[22] = [
              e("path", { d: "M8 5v14l11-7z" }, null, -1)
            ])]))
          ], 10, el),
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "下一首",
            "aria-label": "下一首",
            onClick: g[6] || (g[6] = (F) => n(ze).next())
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
        e("div", ol, [
          e("div", sl, [
            e("span", nl, l(n(X).formattedCurrent) + " / " + l(n(X).formattedDuration), 1),
            e("div", ll, [
              e("span", {
                class: "tape-lyric-text",
                title: n(X).lyric
              }, l(n(X).lyric || "♪ 纯音乐 / 伴奏"), 9, al)
            ]),
            e("button", {
              type: "button",
              class: "tape-mode-btn",
              title: Y.value,
              "aria-label": Y.value,
              onClick: g[7] || (g[7] = (F) => n(ze).toggleMode())
            }, [
              n(X).mode === "order" ? (o(), s("svg", ul, [...g[24] || (g[24] = [
                e("polyline", { points: "17 1 21 5 17 9" }, null, -1),
                e("path", { d: "M3 11V9a4 4 0 0 1 4-4h14" }, null, -1),
                e("polyline", { points: "7 23 3 19 7 15" }, null, -1),
                e("path", { d: "M21 13v2a4 4 0 0 1-4 4H3" }, null, -1)
              ])])) : n(X).mode === "one" ? (o(), s("svg", dl, [...g[25] || (g[25] = [
                tt('<polyline points="17 1 21 5 17 9" data-v-1834c419></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14" data-v-1834c419></path><polyline points="7 23 3 19 7 15" data-v-1834c419></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3" data-v-1834c419></path><text x="12" y="14.5" font-size="7.5" font-weight="900" font-family="system-ui, -apple-system, sans-serif" fill="currentColor" stroke="none" text-anchor="middle" data-v-1834c419>1</text>', 5)
              ])])) : n(X).mode === "shuffle" ? (o(), s("svg", cl, [...g[26] || (g[26] = [
                tt('<polyline points="16 3 21 3 21 8" data-v-1834c419></polyline><line x1="4" y1="20" x2="21" y2="3" data-v-1834c419></line><polyline points="21 16 21 21 16 21" data-v-1834c419></polyline><line x1="15" y1="15" x2="21" y2="21" data-v-1834c419></line><line x1="4" y1="4" x2="9" y2="9" data-v-1834c419></line>', 5)
              ])])) : k("", !0)
            ], 8, rl)
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
            onPointerdown: ee,
            onPointermove: le,
            onPointerup: be,
            onPointercancel: be
          }, [
            e("div", {
              class: "tape-progress-fill",
              style: Me({ width: `${n(X).progressPercent}%` })
            }, null, 4),
            e("div", {
              class: "tape-progress-handle",
              style: Me({ left: `${n(X).progressPercent}%` })
            }, null, 4)
          ], 40, pl),
          e("div", bl, [
            (o(), s("svg", vl, [
              (o(), s(V, null, j($, (F, Z) => e("rect", {
                key: Z,
                class: "wave-bar",
                x: Z * 4,
                y: 16 - F * 0.7,
                width: "1.8",
                height: F * 0.7,
                rx: "0.9",
                style: Me({ animationDelay: `${Z % 8 * 0.12}s` })
              }, null, 12, fl)), 64))
            ]))
          ])
        ]),
        d.dockSide ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "tape-dock-collapse-btn",
          title: "收起至左下角小胶囊",
          "aria-label": "收起磁带机",
          onClick: g[8] || (g[8] = M((F) => n(P).send({ type: "TOGGLE_COLLAPSE", collapsed: !0 }), ["stop"]))
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
        [lt, !d.dockSide || !U.value]
      ])
    ], 38));
  }
}), vt = /* @__PURE__ */ Ee(gl, [["__scopeId", "data-v-1834c419"]]), ml = ["title"], hl = ["title"], yl = {
  key: 2,
  class: "hero-lyric-body"
}, _l = ["title"], kl = /* @__PURE__ */ De({
  __name: "BiliVideoLyricDockBar",
  props: {
    inlineHero: { type: Boolean, default: !1 }
  },
  setup(fe) {
    const d = D(340), $ = D(!1), f = D(!1), S = D(!1), P = D(null), T = D(null), r = te(() => !(!de.isOpen || !de.bvid && !de.videoSrc));
    ve(() => de.isOpen, (Y) => {
      Y || (I.organizer.heroLyricText = "");
    });
    function y(Y) {
      const E = document.querySelector(".bili-mini-screen video, .bili-sub-screen video");
      E && (E.currentTime = Math.max(0, E.currentTime + Y));
    }
    function w(Y) {
      if (Y.target?.closest("button, .lyric-resize-handle, input, a") || !T.value) return;
      S.value = !0;
      const q = T.value.getBoundingClientRect(), oe = P.value ? P.value.x : q.left, ie = P.value ? P.value.y : q.top, pe = Y.clientX, v = Y.clientY;
      let se = oe, ne = ie;
      const ee = (be) => {
        if (!S.value) return;
        const we = be.clientX - pe, R = be.clientY - v, g = T.value?.offsetWidth || d.value, F = T.value?.offsetHeight || 32, Z = 8, _ = Math.max(Z, window.innerWidth - g - 8), u = 8, b = Math.max(u, window.innerHeight - F - 8);
        se = Math.min(_, Math.max(Z, oe + we)), ne = Math.min(b, Math.max(u, ie + R)), P.value = { x: se, y: ne };
      }, le = () => {
        S.value = !1, window.removeEventListener("pointermove", ee), window.removeEventListener("pointerup", le), window.removeEventListener("pointercancel", le);
        try {
          P.value && localStorage.setItem("bili_hero_lyric_pos", JSON.stringify(P.value));
        } catch {
        }
      };
      window.addEventListener("pointermove", ee), window.addEventListener("pointerup", le), window.addEventListener("pointercancel", le);
    }
    function U() {
      P.value = null;
      try {
        localStorage.removeItem("bili_hero_lyric_pos");
      } catch {
      }
    }
    const J = te(() => {
      const Y = {};
      return f.value || (Y.width = `${d.value}px`), Y.position = "fixed", Y.zIndex = "1000", P.value ? (Y.left = `${P.value.x}px`, Y.top = `${P.value.y}px`, Y.margin = "0", Y.transform = "none") : (Y.left = "50%", Y.bottom = "24px", Y.transform = "translateX(-50%)"), Y;
    });
    let H = 0, L = 0, W = "right";
    function Q(Y, E) {
      E.preventDefault(), E.stopPropagation(), $.value = !0, W = Y, H = E.clientX, L = d.value;
      const q = (ie) => {
        if (!$.value) return;
        const pe = ie.clientX - H, v = W === "right" ? L + pe : L - pe, se = Math.max(180, Math.min(720, v));
        d.value = se;
      }, oe = () => {
        $.value = !1, window.removeEventListener("pointermove", q), window.removeEventListener("pointerup", oe), window.removeEventListener("pointercancel", oe);
        try {
          localStorage.setItem("bili_hero_lyric_width", String(d.value));
        } catch {
        }
      };
      window.addEventListener("pointermove", q), window.addEventListener("pointerup", oe), window.addEventListener("pointercancel", oe);
    }
    return He(() => {
      try {
        const Y = localStorage.getItem("bili_hero_lyric_width");
        if (Y) {
          const q = parseInt(Y, 10);
          Number.isFinite(q) && q >= 180 && q <= 720 && (d.value = q);
        }
        const E = localStorage.getItem("bili_hero_lyric_pos");
        if (E) {
          const q = JSON.parse(E);
          if (typeof q?.x == "number" && typeof q?.y == "number") {
            const oe = Math.min(window.innerWidth - 100, Math.max(8, q.x)), ie = Math.min(window.innerHeight - 40, Math.max(8, q.y));
            P.value = { x: oe, y: ie };
          }
        }
      } catch {
      }
    }), (Y, E) => r.value ? (o(), s("aside", {
      key: 0,
      ref_key: "barRef",
      ref: T,
      class: z(["bili-hero-lyric-bar", { "is-collapsed": f.value, "is-resizing": $.value, "is-dragging": S.value, "is-floating": !!P.value }]),
      style: Me(J.value),
      title: P.value ? "按住可拖动位置；双击还原到默认位置" : "按住可自由拖动位置",
      "aria-label": "视频实时字幕与控制",
      onPointerdown: w,
      onDblclick: U
    }, [
      f.value ? k("", !0) : (o(), s("div", {
        key: 0,
        class: "lyric-resize-handle handle-left",
        title: "按住向左拉伸宽度",
        onPointerdown: E[0] || (E[0] = (q) => Q("left", q))
      }, null, 32)),
      f.value ? (o(), s("div", {
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
          onClick: E[1] || (E[1] = M((q) => f.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, hl)) : (o(), s("div", yl, [
        e("button", {
          type: "button",
          class: "hero-lyric-seek-btn",
          title: "当前视频后退 5 秒",
          "aria-label": "后退 5 秒",
          onClick: E[3] || (E[3] = (q) => y(-5))
        }, " ‹ "),
        e("strong", {
          class: "hero-lyric-current-text",
          title: n(I).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"
        }, l(n(I).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"), 9, _l),
        e("button", {
          type: "button",
          class: "hero-lyric-seek-btn",
          title: "当前视频前进 5 秒",
          "aria-label": "前进 5 秒",
          onClick: E[4] || (E[4] = (q) => y(5))
        }, " › "),
        E[10] || (E[10] = e("span", { class: "hero-lyric-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "hero-lyric-collapse-btn",
          title: "收起台词栏",
          "aria-label": "收起台词栏",
          onClick: E[5] || (E[5] = M((q) => f.value = !0, ["stop"]))
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
      f.value ? k("", !0) : (o(), s("div", {
        key: 3,
        class: "lyric-resize-handle handle-right",
        title: "按住向右拉伸宽度",
        onPointerdown: E[6] || (E[6] = (q) => Q("right", q))
      }, null, 32))
    ], 46, ml)) : k("", !0);
  }
}), $l = /* @__PURE__ */ Ee(kl, [["__scopeId", "data-v-8f47943e"]]), wl = {
  class: "fm-pane",
  id: "pane-organizer"
}, Cl = { id: "fo-body" }, xl = { class: "fo-bili-sidebar" }, Sl = ["title"], Tl = { class: "fo-sidebar-toggle-title" }, Ml = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Dl = ["aria-expanded", "title"], Pl = { class: "fo-sidebar-toggle-chevron" }, El = { class: "fo-sidebar-features-wrap" }, Il = { class: "fo-sidebar-sub-wrap" }, Rl = ["title"], Ll = { class: "fo-sidebar-sub-main" }, Bl = { class: "fo-sidebar-sub-text" }, zl = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Al = ["title"], Nl = { class: "fo-sidebar-sub-main" }, Vl = { class: "fo-sidebar-sub-text" }, Ul = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Gl = ["title"], Fl = { class: "fo-sidebar-sub-main" }, Ol = { class: "fo-sidebar-sub-text" }, ql = { class: "fo-sidebar-sub-wrap fo-sidebar-recommend-wrap" }, Hl = ["title"], Yl = { class: "fo-sidebar-sub-main" }, Wl = { class: "fo-sidebar-sub-text" }, Xl = { class: "fo-sidebar-sub-wrap fo-sidebar-radio-wrap" }, jl = ["title"], Kl = { class: "fo-sidebar-sub-main" }, Ql = { class: "fo-sidebar-sub-text" }, Jl = { class: "fo-sidebar-favorite-hub" }, Zl = { class: "fo-sidebar-sub-main" }, ea = { class: "fo-sidebar-sub-text" }, ta = ["title", "aria-label"], ia = {
  key: 0,
  class: "fo-move-target-banner"
}, oa = {
  class: "fo-bili-folder-list",
  "aria-label": "B站收藏夹"
}, sa = {
  key: 0,
  class: "fo-bili-section-divider"
}, na = ["onDragover", "onDragleave", "onDrop"], la = { class: "fo-bili-section-title" }, aa = ["data-folder-id", "data-folder-kind", "draggable", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], ra = ["aria-expanded", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], ua = {
  class: "fo-group-caret",
  "aria-hidden": "true"
}, da = {
  key: 0,
  class: "muted small"
}, ca = {
  key: 0,
  id: "fo-vue-main",
  class: "fo-bili-main"
}, pa = {
  key: 0,
  class: "fo-bili-loading"
}, ba = {
  key: 1,
  class: "fo-bili-empty fo-bili-login-guide"
}, va = { class: "fo-bili-login-card" }, fa = { class: "fo-bili-login-actions" }, ga = {
  key: 2,
  class: "fo-bili-empty"
}, ma = { class: "fo-bili-hero fo-hero-persistent" }, ha = { class: "fo-hero-left" }, ya = ["src"], _a = {
  key: 1,
  class: "fo-folder-icon"
}, ka = { class: "fo-hero-folder-info" }, $a = ["placeholder", "aria-label"], wa = ["title"], Ca = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, xa = { class: "card-fullscreen-bili-suggest-head" }, Sa = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, Ta = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, Ma = ["onClick", "onContextmenu"], Da = { class: "card-fullscreen-bili-thumb" }, Pa = ["src"], Ea = { key: 0 }, Ia = { class: "card-fullscreen-bili-video-copy" }, Ra = { class: "fo-bili-actions" }, La = ["title"], Ba = { class: "bili-header-msg-label" }, za = ["title"], Aa = ["disabled"], Na = ["title"], Va = { class: "fo-bili-toolbar" }, Ua = {
  key: 0,
  class: "fo-bili-sort"
}, Ga = ["onClick"], Fa = {
  class: "fo-mini-dock-anchor",
  "aria-label": "视频标签页"
}, Oa = ["title"], qa = { class: "fo-video-tab-title" }, Ha = { class: "fo-video-tab-actions" }, Ya = ["title"], Wa = {
  key: 2,
  class: "fo-bili-batch-actions"
}, Xa = { class: "fo-batch-count" }, ja = { class: "fo-bili-grid" }, Ka = {
  key: 0,
  class: "fo-bili-empty"
}, Qa = ["data-batch-id", "onDragstart", "onContextmenu"], Ja = { class: "fo-bili-thumb" }, Za = {
  key: 0,
  class: "fo-batch-check",
  title: "选择此视频"
}, er = ["checked", "onChange"], tr = ["href", "onClick"], ir = ["src"], or = { class: "fo-bili-count" }, sr = { class: "fo-bili-duration" }, nr = { class: "fo-bili-title-row" }, lr = ["href", "onClick"], ar = ["aria-expanded", "onClick"], rr = {
  key: 0,
  class: "fo-card-menu"
}, ur = ["onClick"], dr = ["onClick"], cr = ["onClick"], pr = { class: "fo-bili-meta" }, br = ["onClick"], vr = {
  key: 0,
  class: "fo-pager"
}, fr = ["disabled"], gr = { class: "fo-page-num" }, mr = ["disabled"], hr = {
  key: 1,
  id: "fo-vue-cache-main",
  class: "fo-bili-main"
}, yr = { class: "fo-bili-hero fo-hero-persistent fo-cached-hero" }, _r = { class: "fo-hero-left" }, kr = { class: "fo-hero-folder-info" }, $r = { class: "fo-bili-actions" }, wr = {
  key: 0,
  class: "fo-bili-loading"
}, Cr = {
  key: 1,
  class: "fo-bili-grid fo-cached-video-grid"
}, xr = {
  key: 0,
  class: "fo-bili-empty"
}, Sr = { class: "fo-bili-thumb" }, Tr = ["onClick"], Mr = ["src"], Dr = { class: "fo-bili-title-row" }, Pr = ["onClick"], Er = ["onClick"], Ir = { class: "fo-bili-meta" }, Rr = {
  key: 2,
  id: "fo-vue-recommend-main",
  class: "fo-bili-main"
}, Lr = { class: "fo-bili-hero" }, Br = { class: "fo-bili-heading" }, zr = { class: "fo-feed-hero-title" }, Ar = { class: "fo-feed-badge" }, Nr = { class: "fo-bili-actions" }, Vr = ["disabled"], Ur = { class: "fo-bili-toolbar" }, Gr = { class: "fo-feed-count-tag" }, Fr = {
  key: 0,
  class: "fo-bili-loading"
}, Or = {
  key: 1,
  class: "fo-bili-empty"
}, qr = {
  key: 2,
  class: "fo-bili-grid"
}, Hr = {
  key: 0,
  class: "fo-bili-empty"
}, Yr = ["onDragstart"], Wr = { class: "fo-bili-thumb" }, Xr = ["href", "onClick"], jr = ["src"], Kr = { class: "fo-bili-count" }, Qr = { class: "fo-bili-duration" }, Jr = { class: "fo-bili-title-row" }, Zr = ["href", "onClick"], eu = ["aria-expanded", "onClick"], tu = {
  key: 0,
  class: "fo-card-menu"
}, iu = ["onClick"], ou = ["onClick"], su = ["onClick"], nu = ["onClick"], lu = ["onClick"], au = { class: "fo-bili-meta" }, ru = ["onClick"], uu = {
  key: 3,
  id: "fo-vue-following-main",
  class: "fo-bili-main"
}, du = { class: "fo-bili-hero" }, cu = { class: "fo-bili-heading" }, pu = { class: "fo-feed-hero-title" }, bu = { class: "fo-feed-badge" }, vu = { class: "fo-bili-actions" }, fu = ["disabled"], gu = { class: "fo-up-groups-bar" }, mu = { class: "fo-up-groups-list" }, hu = ["onClick"], yu = { class: "count" }, _u = { class: "fo-up-groups-actions" }, ku = {
  key: 0,
  class: "fo-up-members-strip"
}, $u = { class: "fo-up-members-label" }, wu = { class: "fo-up-members-list" }, Cu = ["title", "onClick", "onContextmenu"], xu = ["src"], Su = { class: "fo-bili-toolbar" }, Tu = { class: "fo-feed-count-tag" }, Mu = {
  key: 1,
  class: "fo-bili-loading"
}, Du = {
  key: 2,
  class: "fo-bili-empty"
}, Pu = {
  key: 3,
  class: "fo-bili-grid"
}, Eu = {
  key: 0,
  class: "fo-bili-empty"
}, Iu = ["onDragstart"], Ru = { class: "fo-bili-thumb" }, Lu = ["href", "onClick"], Bu = ["src"], zu = { class: "fo-bili-count" }, Au = { class: "fo-bili-duration" }, Nu = { class: "fo-bili-title-row" }, Vu = ["href", "onClick"], Uu = ["aria-expanded", "onClick"], Gu = {
  key: 0,
  class: "fo-card-menu"
}, Fu = ["onClick"], Ou = ["onClick"], qu = ["onClick"], Hu = ["onClick"], Yu = { class: "fo-bili-meta" }, Wu = ["onClick"], Xu = { class: "fo-pager" }, ju = ["disabled"], Ku = { class: "fo-page-num" }, Qu = ["disabled"], Ju = {
  key: 4,
  id: "fo-vue-subscription-main",
  class: "fo-bili-main fo-vue-subscription-main"
}, Zu = { class: "bili-sub-vue-shell" }, ed = {
  key: 0,
  class: "fo-bili-loading"
}, td = {
  key: 1,
  class: "fo-bili-empty"
}, id = {
  key: 2,
  class: "bili-sub-layout bili-sub-vue-layout"
}, od = {
  key: 5,
  id: "fo-vue-radio-main",
  class: "fo-bili-main fo-vue-radio-main"
}, sd = { class: "fo-bili-hero fo-radio-hero" }, nd = { class: "fo-bili-actions" }, ld = { class: "bili-radio-layout fo-vue-radio-layout" }, ad = { class: "bili-radio-folders" }, rd = { id: "bili-radio-folders" }, ud = ["onClick"], dd = {
  key: 0,
  class: "muted small"
}, cd = { class: "bili-radio-library" }, pd = {
  key: 0,
  role: "alert",
  class: "muted small"
}, bd = {
  id: "bili-radio-videos",
  class: "bili-radio-videos"
}, vd = ["title", "onDragstart", "onClick"], fd = ["src"], gd = { key: 1 }, md = {
  key: 0,
  class: "muted small"
}, hd = { class: "bili-radio-editor" }, yd = { class: "bili-radio-name-row" }, _d = ["placeholder", "onKeydown"], kd = { class: "bili-radio-btn-group" }, $d = { class: "bili-radio-series-dropdown-wrap" }, wd = {
  value: "",
  disabled: "",
  selected: ""
}, Cd = ["value"], xd = {
  id: "bili-radio-queue",
  class: "bili-radio-queue",
  "aria-label": "电台播放队列"
}, Sd = ["onClick"], Td = { class: "bili-radio-queue-no" }, Md = ["src"], Dd = { key: 1 }, Pd = ["aria-label", "onClick"], Ed = {
  key: 0,
  class: "muted small"
}, Id = { class: "bili-radio-actions" }, Rd = ["disabled"], Ld = ["disabled"], Bd = ["title"], zd = {
  key: 2,
  class: "fo-context-divider"
}, Ad = /* @__PURE__ */ De({
  __name: "BilibiliWorkspace",
  setup(fe) {
    const d = D(!1);
    function $() {
      const a = I.radioSeriesName?.trim();
      if (!a) {
        d.value = !0;
        const t = document.getElementById("bili-radio-name");
        t && t.focus(), je.fetch(A("bili.radioAppName"), A("bili.radioNameEmpty"));
        return;
      }
      d.value = !1, v("radio-save", { name: a });
    }
    async function f() {
      const a = document.getElementById("bili-radio-name");
      a && (a.focus(), a.select(), je.fetch(A("bili.radioAppName"), A("bili.radioInputFocused")));
    }
    function S(a) {
      const t = a.target, i = t.value;
      if (i) {
        if (i === "__create_new__") {
          v("radio-clear"), I.radioSeriesName = "", je.fetch("哔哩哔哩电台", "已开启新系列创作，请从左侧添加视频"), t.value = "";
          return;
        }
        v("radio-load-series", i);
      }
    }
    function P(a, t) {
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
    function T() {
      Rt.togglePanel();
    }
    const r = te(() => I.organizer), y = D(!1), { active: w } = Tt("daily-bilibili", "/bilibili.html");
    ve(() => w.value && r.value.mode === "recommendations", (a) => {
      Ae.setRecommendationsActive(a);
    }, { immediate: !0, flush: "sync" }), ve(() => w.value && r.value.mode === "following", (a) => {
      Ae.setFollowingActive(a);
    }, { immediate: !0, flush: "sync" }), ve(() => w.value && r.value.mode === "subscription", (a) => {
      Ae.setSubscriptionActive(a);
    }, { immediate: !0, flush: "sync" }), ve(() => w.value && r.value.mode === "cache", (a) => {
      a || (y.value = !1);
    });
    const U = D(r.value.query), J = D(!1), H = D(!1), L = D(""), W = D({ visible: !1, x: 0, y: 0, video: null, folder: null }), { menuRef: Q, style: Y } = Bt({
      visible: () => W.value.visible,
      anchor: () => W.value,
      dismiss: () => {
        W.value.visible = !1;
      }
    }), E = D(
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
      de.bvid && St.open({
        bvid: de.bvid,
        cid: de.cid,
        title: de.title
      });
    }
    function ie() {
      de.collapsed && Ke.toggleCollapse(), Ke.bringToFront();
    }
    function pe() {
      Ke.close();
    }
    ve(() => r.value.query, (a) => {
      U.value = a;
    }), ve(U, (a) => {
      (!a || !a.trim()) && r.value.query && v("organizer-search", "");
    });
    function v(a, t) {
      Ne.dispatch(a, t);
    }
    function se(a) {
      v(a.group ? "toggle-folder-group" : "select-folder", { id: a.id, kind: a.kind });
    }
    const ne = D(""), ee = D(""), le = D("before"), be = D(!1);
    function we(a, t) {
      t.kind === "created" && (ne.value = t.id, a.dataTransfer?.setData("application/x-logicweaver-favorite-node", t.id), a.dataTransfer?.setData("text/plain", t.id), a.dataTransfer && (a.dataTransfer.effectAllowed = "move"));
    }
    function R(a, t) {
      if (t.kind !== "created" || !ne.value || ne.value === t.id) return;
      a.preventDefault(), a.dataTransfer && (a.dataTransfer.dropEffect = "move");
      const i = a.currentTarget;
      if (!i) return;
      const c = i.getBoundingClientRect(), N = (a.clientY - c.top) / Math.max(1, c.height), xe = t.group && N > 0.25 && N < 0.75 ? "into" : N >= 0.5 ? "after" : "before";
      ee.value = t.id, le.value = xe;
    }
    function g(a, t) {
      const i = a.relatedTarget, c = a.currentTarget;
      c && i && c.contains(i) || ee.value === t.id && (ee.value = "");
    }
    function F() {
      ne.value = "", ee.value = "", be.value = !1;
    }
    function Z(a, t) {
      a.preventDefault();
      const i = ne.value || a.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "", c = le.value || (t.group ? "into" : "after");
      F(), !(!i || i === t.id || t.kind !== "created") && v("move-folder-node", { sourceId: i, targetId: t.id, mode: c });
    }
    function _(a) {
      ne.value && (a.preventDefault(), a.dataTransfer && (a.dataTransfer.dropEffect = "move"), be.value = !0);
    }
    function u(a) {
      const t = a.relatedTarget, i = a.currentTarget;
      i && t && i.contains(t) || (be.value = !1);
    }
    function b(a) {
      a.preventDefault();
      const t = ne.value || a.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
      F(), t && v("move-folder-node", { sourceId: t, targetId: "root", mode: "into" });
    }
    function B() {
      const a = U.value.trim();
      v("organizer-search", a);
    }
    function re() {
      !U.value.trim() && r.value.query && v("organizer-search", "");
    }
    const ge = D(""), Se = D(!1), Ce = D(!1), Pe = D("hot"), Ie = D(""), Ve = te(() => Pe.value === "live" ? A("bili.searchLiveTitle", { keyword: Ie.value }) : A("bili.searchSuggestTitle")), Ue = te(() => Pe.value === "live" ? A("bili.searchLiveSubtitle") : A("bili.searchSuggestSubtitle")), ye = D([]), Be = D(null), Fe = D([]);
    let C = 0, h = null;
    function p(a) {
      if (!a) return null;
      const t = a.bvid || (String(a.param || "").startsWith("BV") ? a.param : "");
      if (!t && !a.aid && !a.id) return null;
      const i = String(a.pic || a.cover || "").replace(/^http:/, "https:"), c = i.startsWith("//") ? `https:${i}` : i, N = String(a.title || "").replace(/<[^>]+>/g, ""), xe = Number(a.duration || 0), kt = xe > 0 ? `${Math.floor(xe / 60)}:${String(xe % 60).padStart(2, "0")}` : String(a.duration || ""), et = a.stat?.view || a.play || 0, $t = Number(et) >= 1e4 ? `${(Number(et) / 1e4).toFixed(1)}万` : String(Number(et || 0)), wt = a.owner?.name || a.name || a.author || A("bili.upDefault");
      return {
        bvid: t,
        aid: String(a.aid || a.id || ""),
        title: N,
        cover: c,
        durationText: kt,
        playText: $t,
        upper: wt
      };
    }
    async function x() {
      if (Pe.value = "hot", Se.value = !0, Fe.value.length && Date.now() - C < 9e4) {
        ye.value = Fe.value;
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
        const c = i.map(p).filter(Boolean);
        Fe.value = c, C = Date.now(), ge.value.trim() || (ye.value = c);
      } catch {
        ye.value = [];
      } finally {
        Ce.value = !1;
      }
    }
    function O() {
      ge.value.trim() ? K(ge.value.trim()) : x();
    }
    function G() {
      const a = ge.value.trim();
      if (clearTimeout(h), !a) {
        x();
        return;
      }
      h = setTimeout(() => {
        K(a);
      }, 320);
    }
    async function K(a) {
      Se.value = !0, Pe.value = "live", Ie.value = a, Ce.value = !0;
      try {
        let t = null;
        if (window.LogicWeaverBiliSearchActions?.search)
          try {
            t = await window.LogicWeaverBiliSearchActions.search(a);
          } catch {
          }
        if (!t || t.code !== 0) {
          const c = `search_type=video&keyword=${encodeURIComponent(a)}&page=1&page_size=12`;
          t = await (await fetch(`https://api.bilibili.com/x/web-interface/search/type?${c}`, { credentials: "include" })).json();
        }
        if (ge.value.trim() !== a) return;
        const i = Array.isArray(t?.data?.result) ? t.data.result : [];
        ye.value = i.slice(0, 10).map(p).filter(Boolean);
      } catch {
        ye.value = [];
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
    function ae(a, t) {
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
    function Oe(a) {
      Be.value && !Be.value.contains(a.target) && (Se.value = !1);
    }
    function qe(a) {
      W.value.visible = !1, L.value = L.value === a ? "" : a;
    }
    function We(a, t, i = !0) {
      L.value = "", W.value = {
        visible: !0,
        x: a.clientX,
        y: a.clientY,
        video: t,
        folder: i && I.activeFolderId ? { id: String(I.activeFolderId), title: r.value.folderTitle } : null
      };
    }
    function _e(a) {
      if (a instanceof KeyboardEvent) {
        a.key === "Escape" && (L.value = "", W.value.visible = !1, r.value.isTargetPickMode && v("organizer-cancel-move-target"));
        return;
      }
      const t = a.target;
      t?.closest(".fo-card-menu, .fo-card-more") || (L.value = ""), t?.closest(".fo-context-menu") || (W.value.visible = !1);
    }
    const Ge = typeof document < "u" && document.body.classList.contains("bili-standalone-body");
    function at() {
      !H.value || J.value || r.value.loading || (J.value = !0, v("organizer-open"));
    }
    ve(() => r.value.loading, (a) => {
      !a && !r.value.folders.length && at();
    }), He(() => {
      import("./bilibili-channel.service-CbUEcMBV.js").catch((a) => console.error("[Bilibili] 频道动作服务加载失败", a)), H.value = !0, Ne.loadOrganizer(), at(), document.addEventListener("pointerdown", _e, !0), document.addEventListener("pointerdown", Oe), window.addEventListener("keydown", _e), window.setBiliMiniDockVisible?.(!0), requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }), ve(() => [r.value.videos, r.value.mode], () => {
      requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }, { flush: "post" }), gt(() => {
      Ae.setRecommendationsActive(!1), Ae.setFollowingActive(!1), Ae.setSubscriptionActive(!1), H.value = !1, document.removeEventListener("pointerdown", _e, !0), document.removeEventListener("pointerdown", Oe), window.removeEventListener("keydown", _e);
    });
    function Je(a, t) {
      L.value = "", W.value.visible = !1;
      const i = String(typeof a == "object" ? a.id || a.bvid || a.aid || "" : a), c = typeof a == "object" ? a : r.value.videos.find((N) => String(N.id) === i);
      v("organizer-video-action", { id: i, video: c, action: t });
    }
    async function Re(a) {
      const { video: t, folder: i } = W.value;
      if (W.value.visible = !1, a === "share-chat") {
        if (!t) return;
        try {
          const { chatService: c } = await import("./view-styles-yuz8wQEV.js").then((xe) => xe.aT), { windowManagerController: N } = await import("./window-manager.store-fHSi_Uh8.js").then((xe) => xe.n);
          c.sendBiliShare({
            bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
            aid: t.aid,
            title: t.title,
            cover: t.cover,
            upName: t.author,
            upMid: t.authorMid,
            upFace: t.authorFace,
            play: t.playCount
          }), N.open("chat");
        } catch (c) {
          console.warn("分享到聊天室失败", c);
        }
        return;
      }
      t && v("organizer-video-action", { id: t.id || "", video: t, action: a });
    }
    function mt(a) {
      const t = I.radioSeriesName?.trim();
      let i = I.radioSeries.find((c) => c.name === t);
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
    function ht(a) {
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
    function yt(a) {
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
      const i = t.bvid || t.url?.match(/video\/(BV[0-9a-zA-Z]+)/)?.[1] || t.id, c = JSON.stringify({
        type: "bili-cassette-tape",
        bvid: i,
        title: t.title,
        cover: t.cover,
        author: t.author,
        duration: t.duration
      });
      a.dataTransfer.setData("application/x-bili-cassette", c), a.dataTransfer.setData("application/json", c);
      const N = rt(t.title);
      a.dataTransfer.setDragImage(N, 72, 25), setTimeout(() => {
        N.parentNode && N.parentNode.removeChild(N);
      }, 0);
    }
    function _t(a, t) {
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
      const c = rt(t.title);
      a.dataTransfer.setDragImage(c, 72, 25), setTimeout(() => {
        c.parentNode && c.parentNode.removeChild(c);
      }, 0);
    }
    return (a, t) => (o(), s("section", {
      id: "daily-bilibili",
      class: z(["card wide", { "card-fullscreen": n(Ge) || n(ot).activeId === "daily-bilibili" }])
    }, [
      e("div", wl, [
        e("div", Cl, [
          e("div", {
            class: z(["fo-bili-layout", { "fo-picking-move-target": r.value.isTargetPickMode }]),
            "data-vue-organizer-shell": "true",
            onWheel: yt
          }, [
            e("aside", xl, [
              e("div", {
                class: z(["fo-sidebar-toggle-bar", { "is-collapsed": E.value }]),
                title: E.value ? n(A)("bili.channel.expandTip") : n(A)("bili.channel.collapseTip"),
                onClick: q
              }, [
                e("div", Tl, [
                  t[51] || (t[51] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                  e("span", null, l(n(A)("bili.channel.title")), 1),
                  E.value ? (o(), s("span", Ml, "5")) : k("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "fo-sidebar-toggle-action",
                  "aria-expanded": !E.value,
                  title: E.value ? n(A)("bili.channel.expand") : n(A)("bili.channel.collapse")
                }, [
                  e("span", null, l(E.value ? n(A)("bili.channel.expand") : n(A)("bili.channel.collapse")), 1),
                  e("span", Pl, l(E.value ? "▾" : "▴"), 1)
                ], 8, Dl)
              ], 10, Sl),
              ce(e("div", El, [
                e("div", Il, [
                  e("button", {
                    id: "fo-sidebar-sub-btn",
                    type: "button",
                    class: z(["fo-sidebar-sub-btn", { on: r.value.mode === "subscription" }]),
                    title: n(A)("bili.channel.subVideoTip"),
                    onClick: t[0] || (t[0] = (i) => v("open-sub-video"))
                  }, [
                    e("div", Ll, [
                      t[52] || (t[52] = e("span", { class: "fo-sidebar-sub-icon" }, "🎬", -1)),
                      e("div", Bl, [
                        e("strong", null, l(n(A)("bili.channel.subVideo")), 1),
                        e("small", null, l(n(A)("bili.channel.subVideoSub")), 1)
                      ])
                    ]),
                    t[53] || (t[53] = e("span", { class: "fo-sidebar-sub-badge" }, "NEW", -1))
                  ], 10, Rl)
                ]),
                e("div", zl, [
                  e("button", {
                    id: "fo-sidebar-cache-btn",
                    type: "button",
                    class: z(["fo-sidebar-sub-btn", { on: r.value.mode === "cache" }]),
                    title: n(A)("bili.channel.cacheVideoTip"),
                    onClick: t[1] || (t[1] = (i) => v("open-cache"))
                  }, [
                    e("div", Nl, [
                      t[54] || (t[54] = e("span", { class: "fo-sidebar-sub-icon" }, "💾", -1)),
                      e("div", Vl, [
                        e("strong", null, l(n(A)("bili.channel.cacheVideo")), 1),
                        e("small", null, l(n(A)("bili.channel.cacheVideoSub")), 1)
                      ])
                    ]),
                    t[55] || (t[55] = e("span", { class: "fo-sidebar-sub-badge" }, "LOCAL", -1))
                  ], 10, Al)
                ]),
                e("div", Ul, [
                  e("button", {
                    id: "fo-sidebar-following-btn",
                    type: "button",
                    class: z(["fo-sidebar-sub-btn", { on: r.value.mode === "following" }]),
                    title: n(A)("bili.channel.followingTip"),
                    onClick: t[2] || (t[2] = (i) => v("open-following"))
                  }, [
                    e("div", Fl, [
                      t[56] || (t[56] = e("span", { class: "fo-sidebar-sub-icon" }, "📺", -1)),
                      e("div", Ol, [
                        e("strong", null, l(n(A)("bili.channel.following")), 1),
                        e("small", null, l(n(A)("bili.channel.followingSub")), 1)
                      ])
                    ]),
                    t[57] || (t[57] = e("span", { class: "fo-sidebar-sub-badge" }, "FEED", -1))
                  ], 10, Gl)
                ]),
                e("div", ql, [
                  e("button", {
                    id: "fo-sidebar-recommend-btn",
                    type: "button",
                    class: z(["fo-sidebar-sub-btn", { on: r.value.mode === "recommendations" }]),
                    title: n(A)("bili.channel.forYouTip"),
                    onClick: t[3] || (t[3] = (i) => v("open-recommendations"))
                  }, [
                    e("div", Yl, [
                      t[58] || (t[58] = e("span", { class: "fo-sidebar-sub-icon" }, "✨", -1)),
                      e("div", Wl, [
                        e("strong", null, l(n(A)("bili.channel.forYou")), 1),
                        e("small", null, l(n(A)("bili.channel.forYouSub")), 1)
                      ])
                    ]),
                    t[59] || (t[59] = e("span", { class: "fo-sidebar-sub-badge" }, "FOR YOU", -1))
                  ], 10, Hl)
                ]),
                e("div", Xl, [
                  e("button", {
                    id: "fo-sidebar-radio-btn",
                    type: "button",
                    class: z(["fo-sidebar-sub-btn", { on: r.value.mode === "radio" }]),
                    title: n(A)("bili.channel.radioTip"),
                    onClick: t[4] || (t[4] = (i) => v("open-radio"))
                  }, [
                    e("div", Kl, [
                      t[60] || (t[60] = e("span", { class: "fo-sidebar-sub-icon" }, "📻", -1)),
                      e("div", Ql, [
                        e("strong", null, l(n(A)("bili.channel.radio")), 1),
                        e("small", null, l(n(A)("bili.channel.radioSub")), 1)
                      ])
                    ]),
                    t[61] || (t[61] = e("span", { class: "fo-sidebar-sub-badge" }, "RADIO", -1))
                  ], 10, jl)
                ])
              ], 512), [
                [lt, !E.value]
              ]),
              e("div", Jl, [
                e("div", Zl, [
                  t[62] || (t[62] = e("span", { class: "fo-sidebar-sub-icon" }, "📁", -1)),
                  e("div", ea, [
                    e("strong", null, l(n(A)("bili.channel.foldersHub")), 1),
                    e("small", null, l(n(A)("bili.channel.foldersHubSub")), 1)
                  ])
                ]),
                e("button", {
                  class: "fo-sidebar-hub-add",
                  type: "button",
                  title: n(A)("bili.channel.createFolderTip"),
                  "aria-label": n(A)("bili.channel.createFolderTip"),
                  onClick: t[5] || (t[5] = (i) => v("create-bili-folder"))
                }, "＋", 8, ta)
              ]),
              r.value.isTargetPickMode ? (o(), s("div", ia, [
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
                  onClick: t[6] || (t[6] = (i) => v("organizer-cancel-move-target"))
                }, " ✕ 取消 ")
              ])) : k("", !0),
              e("nav", oa, [
                (o(!0), s(V, null, j(r.value.folders, (i, c) => (o(), s(V, {
                  key: `${i.group ? "group" : "folder"}:${i.id}`
                }, [
                  c > 0 && r.value.folders[c - 1]?.kind !== i.kind ? (o(), s("div", sa)) : k("", !0),
                  c === 0 || r.value.folders[c - 1]?.kind !== i.kind ? (o(), s("div", {
                    key: 1,
                    class: z(["fo-bili-section-head fo-vue-section-head", { "drag-into": i.kind === "created" && be.value }]),
                    onDragover: (N) => i.kind === "created" ? _(N) : void 0,
                    onDragleave: (N) => i.kind === "created" ? u(N) : void 0,
                    onDrop: (N) => i.kind === "created" ? b(N) : void 0
                  }, [
                    e("span", la, [
                      e("b", null, l(i.kind === "collected" ? "我追的合集/收藏夹" : i.kind === "other" ? "其他收藏" : "我创建的收藏夹"), 1)
                    ]),
                    i.kind === "created" ? (o(), s("button", {
                      key: 0,
                      class: "fo-bili-section-add-btn",
                      type: "button",
                      title: "新建插件分组",
                      "aria-label": "新建插件分组",
                      onClick: t[7] || (t[7] = M((N) => v("create-local-group"), ["stop"]))
                    }, "＋")) : k("", !0)
                  ], 42, na)) : k("", !0),
                  i.group ? (o(), s("div", {
                    key: 3,
                    class: z(["fo-bili-group-label", {
                      collapsed: i.collapsed,
                      dragging: ne.value === i.id,
                      "drag-before": ee.value === i.id && le.value === "before",
                      "drag-after": ee.value === i.id && le.value === "after",
                      "drag-into": ee.value === i.id && le.value === "into"
                    }]),
                    style: Me({ "--fo-depth": i.depth }),
                    role: "button",
                    tabindex: "0",
                    "aria-expanded": !i.collapsed,
                    draggable: !0,
                    onClick: (N) => se(i),
                    onKeydown: [
                      Le(M((N) => se(i), ["prevent"]), ["enter"]),
                      Le(M((N) => se(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (N) => we(N, i),
                    onDragover: (N) => R(N, i),
                    onDragleave: (N) => g(N, i),
                    onDrop: (N) => Z(N, i),
                    onDragend: F
                  }, [
                    e("i", ua, l(i.collapsed ? "›" : "⌄"), 1),
                    t[65] || (t[65] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, ra)) : (o(), s("div", {
                    key: 2,
                    role: "button",
                    tabindex: "0",
                    class: z(["fo-bili-folder", {
                      on: i.selected,
                      dragging: ne.value === i.id,
                      "drag-before": ee.value === i.id && le.value === "before",
                      "drag-after": ee.value === i.id && le.value === "after",
                      "drag-into": ee.value === i.id && le.value === "into",
                      "target-candidate": r.value.isTargetPickMode && i.kind === "created" && !i.selected
                    }]),
                    "data-folder-id": i.id,
                    "data-folder-kind": i.kind,
                    style: Me({ "--fo-depth": i.depth }),
                    draggable: i.kind === "created",
                    onClick: (N) => se(i),
                    onKeydown: [
                      Le(M((N) => se(i), ["prevent"]), ["enter"]),
                      Le(M((N) => se(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (N) => we(N, i),
                    onDragover: (N) => R(N, i),
                    onDragleave: (N) => g(N, i),
                    onDrop: (N) => Z(N, i),
                    onDragend: F
                  }, [
                    t[64] || (t[64] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, aa))
                ], 64))), 128)),
                !r.value.loading && !r.value.error && !r.value.folders.length ? (o(), s("p", da, "暂无可用收藏夹。")) : k("", !0)
              ])
            ]),
            r.value.mode === "organizer" ? (o(), s("section", ca, [
              r.value.loading ? (o(), s("div", pa, [...t[66] || (t[66] = [
                e("i", null, null, -1),
                e("span", null, "正在读取 B站收藏内容…", -1)
              ])])) : r.value.error && r.value.error.includes("未登录") ? (o(), s("div", ba, [
                e("div", va, [
                  t[68] || (t[68] = e("span", { class: "fo-bili-login-icon" }, "📺", -1)),
                  t[69] || (t[69] = e("h3", null, "未检测到哔哩哔哩登录状态", -1)),
                  t[70] || (t[70] = e("p", null, "tab-Project 直接复用当前浏览器的 B站 网页会话，无需输入账号密码或扫码授权。", -1)),
                  e("div", fa, [
                    t[67] || (t[67] = e("a", {
                      class: "fo-bili-btn-login",
                      href: "https://passport.bilibili.com/login",
                      target: "_blank",
                      rel: "noreferrer"
                    }, "前往 bilibili.com 登录 ↗", -1)),
                    e("button", {
                      type: "button",
                      class: "fo-bili-btn-refresh",
                      onClick: t[8] || (t[8] = (i) => v("organizer-refresh"))
                    }, "已登录，点击刷新 ↻")
                  ])
                ])
              ])) : r.value.error ? (o(), s("p", ga, l(r.value.error), 1)) : (o(), s(V, { key: 3 }, [
                e("header", ma, [
                  e("div", ha, [
                    e("div", {
                      class: z(["fo-bili-cover", { "fo-vue-cover-image": r.value.folderCover }])
                    }, [
                      r.value.folderCover ? (o(), s("img", {
                        key: 0,
                        src: r.value.folderCover,
                        alt: "",
                        referrerpolicy: "no-referrer"
                      }, null, 8, ya)) : (o(), s("i", _a))
                    ], 2),
                    e("div", ka, [
                      e("h3", null, l(r.value.folderTitle), 1),
                      e("p", null, l(r.value.folderSubtitle), 1)
                    ])
                  ]),
                  e("div", {
                    class: "card-fullscreen-bili-search fo-hero-bili-search",
                    ref_key: "searchHostRef",
                    ref: Be
                  }, [
                    e("form", {
                      class: "card-fullscreen-bili-searchbar",
                      role: "search",
                      onSubmit: M(Ye, ["prevent"])
                    }, [
                      ce(e("input", {
                        "onUpdate:modelValue": t[9] || (t[9] = (i) => ge.value = i),
                        type: "search",
                        autocomplete: "off",
                        placeholder: n(A)("bili.workspace.searchPlaceholder"),
                        "aria-label": n(A)("bili.workspace.searchAria"),
                        onFocus: O,
                        onInput: G
                      }, null, 40, $a), [
                        [Te, ge.value]
                      ]),
                      e("button", {
                        type: "submit",
                        title: n(A)("bili.workspace.searchBtnTip")
                      }, "⌕", 8, wa)
                    ], 32),
                    Se.value ? (o(), s("div", Ca, [
                      e("div", xa, [
                        e("span", null, l(Ve.value), 1),
                        e("small", null, l(Ue.value), 1)
                      ]),
                      Ce.value ? (o(), s("p", Sa, "正在获取推荐 / 搜索中…")) : !ye.value.length && !Ce.value ? (o(), s("p", Ta, "没有找到相关视频，回车可在 B站 全网搜索")) : (o(!0), s(V, { key: 2 }, j(ye.value, (i) => (o(), s("button", {
                        key: i.bvid || i.aid,
                        type: "button",
                        class: "card-fullscreen-bili-video-row",
                        role: "option",
                        onClick: (c) => ue(i),
                        onContextmenu: M((c) => ae(c, i), ["prevent"])
                      }, [
                        e("span", Da, [
                          e("img", {
                            src: i.cover,
                            alt: "",
                            referrerpolicy: "no-referrer",
                            loading: "lazy"
                          }, null, 8, Pa),
                          i.durationText ? (o(), s("i", Ea, l(i.durationText), 1)) : k("", !0)
                        ]),
                        e("span", Ia, [
                          e("strong", null, l(i.title), 1),
                          e("small", null, l(i.upper) + " · " + l(i.playText) + "播放", 1)
                        ])
                      ], 40, Ma))), 128))
                    ])) : k("", !0)
                  ], 512),
                  e("div", Ra, [
                    e("button", {
                      id: "bili-header-msg-center-btn",
                      class: z(["fm-tab bili-header-msg-btn hero-action-btn", { "is-active": n(Lt).isOpen }]),
                      type: "button",
                      title: n(A)("bili.workspace.msgCenterTip"),
                      onClick: T
                    }, [
                      t[71] || (t[71] = e("span", { class: "bili-header-msg-icon" }, "🔔", -1)),
                      e("span", Ba, l(n(A)("bili.workspace.msgBtn")), 1)
                    ], 10, La),
                    e("button", {
                      id: "bili-up-group-manager-top",
                      class: "fm-tab bili-header-up-group-btn hero-action-btn",
                      type: "button",
                      title: n(A)("bili.workspace.upGroupManagerTip"),
                      onClick: t[10] || (t[10] = (i) => v("manage-up-groups"))
                    }, l(n(A)("bili.workspace.upGroupManager")), 9, za),
                    e("button", {
                      type: "button",
                      class: "primary hero-action-btn",
                      disabled: !r.value.videos.length,
                      onClick: t[11] || (t[11] = (i) => v("organizer-batch-toggle"))
                    }, l(r.value.batchMode ? n(A)("bili.workspace.batchBack") : n(A)("bili.workspace.batch")), 9, Aa),
                    e("button", {
                      type: "button",
                      class: "hero-action-btn btn-refresh",
                      title: n(A)("bili.workspace.refreshFolderTip"),
                      onClick: t[12] || (t[12] = (i) => v("organizer-refresh"))
                    }, "↻", 8, Na)
                  ])
                ]),
                e("div", Va, [
                  r.value.batchMode ? k("", !0) : (o(), s("div", Ua, [
                    (o(!0), s(V, null, j([{ id: "fav_time", text: n(A)("bili.sort.favTime") }, { id: "view", text: n(A)("bili.sort.view") }, { id: "pubtime", text: n(A)("bili.sort.pubTime") }], (i) => (o(), s("button", {
                      key: i.id,
                      type: "button",
                      class: z({ on: r.value.sort === i.id }),
                      onClick: (c) => v("organizer-sort", i.id)
                    }, l(i.text), 11, Ga))), 128))
                  ])),
                  e("div", Fa, [
                    n(de).isOpen && n(de).bvid ? (o(), s("div", {
                      key: 0,
                      class: z(["fo-video-tab-item", { "is-collapsed": n(de).collapsed }]),
                      title: n(de).title
                    }, [
                      e("div", {
                        class: "fo-video-tab-meta",
                        onClick: ie
                      }, [
                        e("span", {
                          class: z(["fo-video-tab-pulse", { playing: n(de).isPlaying }])
                        }, null, 2),
                        e("span", qa, l(n(de).title), 1)
                      ]),
                      e("div", Ha, [
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-close",
                          title: "关闭视频",
                          onClick: M(pe, ["stop"])
                        }, " ✕ "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-sub",
                          title: "查看该视频完整纯文本字幕",
                          onClick: M(oe, ["stop"])
                        }, " 字幕 "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-expand",
                          title: n(de).collapsed ? "放大恢复视频小窗" : "聚焦视频小窗",
                          onClick: M(ie, ["stop"])
                        }, " 放大 ", 8, Ya)
                      ])
                    ], 10, Oa)) : k("", !0)
                  ]),
                  r.value.batchMode ? (o(), s("div", Wa, [
                    e("span", Xa, "已选择 " + l(r.value.selectedCount) + " 项", 1),
                    e("button", {
                      type: "button",
                      onClick: t[14] || (t[14] = (i) => v("organizer-batch-all"))
                    }, "全选/取消全选"),
                    e("button", {
                      type: "button",
                      class: z({ "picking-target": r.value.isTargetPickMode }),
                      onClick: t[15] || (t[15] = (i) => r.value.isTargetPickMode ? v("organizer-cancel-move-target") : v("organizer-batch-move"))
                    }, l(r.value.isTargetPickMode ? "✕ 取消移动" : "移动到"), 3),
                    e("button", {
                      type: "button",
                      onClick: t[16] || (t[16] = (i) => v("organizer-batch-cache"))
                    }, "缓存所选"),
                    e("button", {
                      type: "button",
                      onClick: t[17] || (t[17] = (i) => v("organizer-batch-unfavorite"))
                    }, "取消收藏")
                  ])) : (o(), s("form", {
                    key: 1,
                    class: "fo-bili-search",
                    onSubmit: M(B, ["prevent"])
                  }, [
                    ce(e("input", {
                      "onUpdate:modelValue": t[13] || (t[13] = (i) => U.value = i),
                      type: "search",
                      placeholder: "请输入关键词",
                      "aria-label": "搜索当前收藏夹",
                      onInput: re,
                      onSearch: re
                    }, null, 544), [
                      [Te, U.value]
                    ]),
                    t[72] || (t[72] = e("button", {
                      type: "submit",
                      title: "搜索"
                    }, "⌕", -1))
                  ], 32))
                ]),
                e("div", ja, [
                  r.value.videos.length ? k("", !0) : (o(), s("p", Ka, l(r.value.query ? "没有找到匹配的视频。" : "这个收藏夹是空的。"), 1)),
                  (o(!0), s(V, null, j(r.value.videos, (i) => (o(), s("article", {
                    key: i.id,
                    class: z(["fo-bili-card", { "batch-selected": i.selected, "fo-single-moving": r.value.movingVideoId === i.id }]),
                    "data-batch-id": i.id,
                    draggable: "true",
                    onDragstart: (c) => Ze(c, i),
                    onContextmenu: M((c) => We(c, i), ["prevent", "stop"])
                  }, [
                    e("div", Ja, [
                      r.value.batchMode ? (o(), s("label", Za, [
                        e("input", {
                          type: "checkbox",
                          checked: i.selected,
                          onChange: (c) => v("organizer-batch-select", i.id)
                        }, null, 40, er),
                        t[73] || (t[73] = e("span", null, "✓", -1))
                      ])) : k("", !0),
                      e("a", {
                        class: "fo-cover-link",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: M((c) => v("organizer-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, ir)
                      ], 8, tr),
                      e("span", or, "▣ " + l(i.playCount), 1),
                      e("span", sr, l(i.duration), 1)
                    ]),
                    e("div", nr, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: M((c) => v("organizer-play-video", i), ["prevent"])
                      }, l(i.title), 9, lr),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": L.value === i.id,
                        onClick: M((c) => qe(i.id), ["stop"])
                      }, "⋮", 8, ar),
                      L.value === i.id ? (o(), s("div", rr, [
                        i.writable ? (o(), s("button", {
                          key: 0,
                          type: "button",
                          class: "danger",
                          onClick: (c) => Je(i.id, "delete")
                        }, "取消收藏", 8, ur)) : k("", !0),
                        i.writable ? (o(), s("button", {
                          key: 1,
                          type: "button",
                          onClick: (c) => Je(i.id, "move")
                        }, "移动到", 8, dr)) : k("", !0),
                        e("button", {
                          type: "button",
                          onClick: (c) => Je(i.id, "subtitle")
                        }, "字幕", 8, cr)
                      ])) : k("", !0)
                    ]),
                    e("div", pr, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: M((c) => P(c, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, l(i.author), 9, br),
                      e("span", null, "收藏于 " + l(i.favoriteDate), 1)
                    ])
                  ], 42, Qa))), 128))
                ]),
                r.value.totalPages > 1 ? (o(), s("div", vr, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: r.value.page <= 1,
                    onClick: t[18] || (t[18] = (i) => v("organizer-page", r.value.page - 1))
                  }, "‹ 上一页", 8, fr),
                  e("span", gr, l(r.value.page) + " / " + l(r.value.totalPages), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: r.value.page >= r.value.totalPages,
                    onClick: t[19] || (t[19] = (i) => v("organizer-page", r.value.page + 1))
                  }, "下一页 ›", 8, mr)
                ])) : k("", !0)
              ], 64))
            ])) : r.value.mode === "cache" ? (o(), s("section", hr, [
              y.value ? (o(), Xe(ys, {
                key: 0,
                active: n(w),
                onBack: t[20] || (t[20] = (i) => y.value = !1)
              }, null, 8, ["active"])) : (o(), s(V, { key: 1 }, [
                e("header", yr, [
                  e("div", _r, [
                    t[75] || (t[75] = e("div", { class: "fo-bili-cover" }, "💾", -1)),
                    e("div", kr, [
                      t[74] || (t[74] = e("h3", null, "缓存视频", -1)),
                      e("p", null, l(r.value.cachedVideos.length) + " 个缓存记录 · 点击缓存设置管理存放目录", 1)
                    ])
                  ]),
                  e("div", $r, [
                    e("button", {
                      type: "button",
                      class: "primary",
                      onClick: t[21] || (t[21] = (i) => v("organizer-open"))
                    }, "返回收藏夹"),
                    e("button", {
                      type: "button",
                      onClick: t[22] || (t[22] = (i) => y.value = !0)
                    }, "缓存设置")
                  ])
                ]),
                r.value.cacheLoading ? (o(), s("div", wr, [...t[76] || (t[76] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取本地缓存…", -1)
                ])])) : (o(), s("div", Cr, [
                  r.value.cachedVideos.length ? k("", !0) : (o(), s("p", xr, "还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。")),
                  (o(!0), s(V, null, j(r.value.cachedVideos, (i) => (o(), s("article", {
                    key: i.id,
                    class: "fo-bili-card fo-cached-video-card"
                  }, [
                    e("div", Sr, [
                      e("button", {
                        class: "fo-cached-play",
                        type: "button",
                        onClick: (c) => v("cache-play", i.id)
                      }, [
                        e("img", {
                          loading: "lazy",
                          referrerpolicy: "no-referrer",
                          src: i.cover,
                          alt: ""
                        }, null, 8, Mr),
                        t[77] || (t[77] = e("span", { class: "fo-cached-local-badge" }, "LOCAL", -1))
                      ], 8, Tr)
                    ]),
                    e("div", Dr, [
                      e("button", {
                        class: "fo-title-link fo-bili-title fo-cached-title",
                        type: "button",
                        onClick: (c) => v("cache-play", i.id)
                      }, l(i.title), 9, Pr),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "删除缓存",
                        onClick: (c) => v("cache-delete", i.id)
                      }, "×", 8, Er)
                    ]),
                    e("div", Ir, [
                      e("span", null, l(i.sizeText), 1),
                      e("span", null, "缓存于 " + l(i.cachedDate), 1)
                    ])
                  ]))), 128))
                ]))
              ], 64))
            ])) : r.value.mode === "recommendations" ? (o(), s("section", Rr, [
              e("header", Lr, [
                t[78] || (t[78] = e("div", { class: "fo-bili-cover fo-vue-recommend-cover" }, [
                  e("span", null, "✨")
                ], -1)),
                e("div", Br, [
                  e("div", zr, [
                    e("h3", null, l(r.value.specialTitle), 1),
                    e("span", Ar, l(r.value.specialBadge), 1)
                  ]),
                  e("p", null, l(r.value.specialSubtitle), 1)
                ]),
                e("div", Nr, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !r.value.specialVideos.length,
                    onClick: t[23] || (t[23] = (i) => v("special-play-page"))
                  }, "▶ 播放本页", 8, Vr),
                  e("button", {
                    type: "button",
                    onClick: t[24] || (t[24] = (i) => v("recommendations-refresh"))
                  }, "↻ 换一批"),
                  e("button", {
                    type: "button",
                    onClick: t[25] || (t[25] = (i) => v("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", Ur, [
                t[79] || (t[79] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "🔥 猜你喜欢与热门精选")
                ], -1)),
                e("div", Gr, "本页共 " + l(r.value.specialVideos.length) + " 个视频", 1)
              ]),
              r.value.specialLoading ? (o(), s("div", Fr, [...t[80] || (t[80] = [
                e("i", null, null, -1),
                e("span", null, "正在加载个性化推荐视频…", -1)
              ])])) : r.value.specialError ? (o(), s("p", Or, l(r.value.specialError), 1)) : (o(), s("div", qr, [
                r.value.specialVideos.length ? k("", !0) : (o(), s("p", Hr, "暂无推荐视频。")),
                (o(!0), s(V, null, j(r.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (c) => Ze(c, i)
                }, [
                  e("div", Wr, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: M((c) => v("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                        alt: ""
                      }, null, 8, jr)
                    ], 8, Xr),
                    e("span", Kr, "▣ " + l(i.playCount), 1),
                    e("span", Qr, l(i.duration), 1)
                  ]),
                  e("div", Jr, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: M((c) => v("special-play-video", i), ["prevent"])
                    }, l(i.title), 9, Zr),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": L.value === i.id,
                      onClick: M((c) => qe(i.id), ["stop"])
                    }, "⋮", 8, eu),
                    L.value === i.id ? (o(), s("div", tu, [
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { video: i, id: i.id, action: "collect-inbox" }), L.value = "";
                        }
                      }, "📥 添加到收集箱", 8, iu),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { id: i.id, action: "play" }), L.value = "";
                        }
                      }, "本地播放与评论", 8, ou),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { id: i.id, action: "subtitle" }), L.value = "";
                        }
                      }, "字幕提取", 8, su),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { id: i.id, action: "cache" }), L.value = "";
                        }
                      }, "缓存视频", 8, nu),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { id: i.id, action: "open" }), L.value = "";
                        }
                      }, "打开网页", 8, lu)
                    ])) : k("", !0)
                  ]),
                  e("div", au, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: M((c) => P(c, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, l(i.author), 9, ru),
                    e("span", null, l(i.favoriteDate), 1)
                  ])
                ], 40, Yr))), 128))
              ]))
            ])) : r.value.mode === "following" ? (o(), s("section", uu, [
              e("header", du, [
                t[81] || (t[81] = e("div", { class: "fo-bili-cover fo-vue-following-cover" }, [
                  e("span", null, "📺")
                ], -1)),
                e("div", cu, [
                  e("div", pu, [
                    e("h3", null, l(r.value.specialTitle), 1),
                    e("span", bu, l(r.value.specialBadge), 1)
                  ]),
                  e("p", null, l(r.value.specialSubtitle), 1)
                ]),
                e("div", vu, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !r.value.specialVideos.length,
                    onClick: t[26] || (t[26] = (i) => v("special-play-page"))
                  }, "▶ 播放本页", 8, fu),
                  e("button", {
                    type: "button",
                    onClick: t[27] || (t[27] = (i) => v("following-refresh"))
                  }, "↻"),
                  e("button", {
                    type: "button",
                    onClick: t[28] || (t[28] = (i) => v("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", gu, [
                e("div", mu, [
                  (o(!0), s(V, null, j(r.value.followingGroups, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: z(["fo-up-group-chip", { active: i.active }]),
                    onClick: (c) => v("following-group", i.id)
                  }, [
                    he(l(i.child ? "↳ " : "") + l(i.name) + " ", 1),
                    e("small", yu, l(i.count), 1)
                  ], 10, hu))), 128))
                ]),
                e("div", _u, [
                  e("button", {
                    type: "button",
                    onClick: t[29] || (t[29] = (i) => v("following-manage-groups", "create"))
                  }, "＋ 新建分组"),
                  e("button", {
                    type: "button",
                    onClick: t[30] || (t[30] = (i) => v("following-manage-groups", "manage"))
                  }, "⚙️ 管理分组")
                ])
              ]),
              r.value.followingMembers.length ? (o(), s("div", ku, [
                e("div", $u, [
                  e("b", null, l(r.value.specialBadge), 1),
                  e("small", null, "共 " + l(r.value.followingMembers.length) + " 位 UP 主", 1)
                ]),
                e("div", wu, [
                  e("button", {
                    type: "button",
                    class: z(["fo-up-member-chip", { active: !r.value.followingMembers.some((i) => i.active) }]),
                    onClick: t[31] || (t[31] = (i) => v("following-member", ""))
                  }, "全部UP", 2),
                  (o(!0), s(V, null, j(r.value.followingMembers, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: z(["fo-up-member-chip", { active: i.active }]),
                    title: `左键筛选「${i.name}」，右键预览近期投稿`,
                    onClick: (c) => v("following-member", i.id),
                    onContextmenu: M((c) => v("following-preview-member", { id: i.id, clientX: c.clientX, clientY: c.clientY }), ["prevent"])
                  }, [
                    i.face ? (o(), s("img", {
                      key: 0,
                      loading: "lazy",
                      referrerpolicy: "no-referrer",
                      src: i.face,
                      alt: ""
                    }, null, 8, xu)) : k("", !0),
                    e("span", null, l(i.name), 1)
                  ], 42, Cu))), 128))
                ]),
                e("button", {
                  type: "button",
                  class: "fo-btn-manage-members",
                  onClick: t[32] || (t[32] = (i) => v("following-manage-groups", "members"))
                }, "＋ 管理成员")
              ])) : k("", !0),
              e("div", Su, [
                t[82] || (t[82] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "⚡ UP 主最新投稿动态")
                ], -1)),
                e("div", Tu, "本页共 " + l(r.value.specialVideos.length) + " 个视频", 1)
              ]),
              r.value.specialLoading ? (o(), s("div", Mu, [...t[83] || (t[83] = [
                e("i", null, null, -1),
                e("span", null, "正在读取关注 UP 主更新…", -1)
              ])])) : r.value.specialError ? (o(), s("p", Du, l(r.value.specialError), 1)) : (o(), s("div", Pu, [
                r.value.specialVideos.length ? k("", !0) : (o(), s("p", Eu, "暂无最新关注视频动态。")),
                (o(!0), s(V, null, j(r.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (c) => Ze(c, i)
                }, [
                  e("div", Ru, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: M((c) => v("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, Bu)
                    ], 8, Lu),
                    e("span", zu, "▣ " + l(i.playCount), 1),
                    e("span", Au, l(i.duration), 1)
                  ]),
                  e("div", Nu, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: M((c) => v("special-play-video", i), ["prevent"])
                    }, l(i.title), 9, Vu),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": L.value === i.id,
                      onClick: M((c) => qe(i.id), ["stop"])
                    }, "⋮", 8, Uu),
                    L.value === i.id ? (o(), s("div", Gu, [
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { video: i, id: i.id, action: "play" }), L.value = "";
                        }
                      }, "本地播放与评论", 8, Fu),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { video: i, id: i.id, action: "subtitle" }), L.value = "";
                        }
                      }, "字幕提取", 8, Ou),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { video: i, id: i.id, action: "cache" }), L.value = "";
                        }
                      }, "缓存视频", 8, qu),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { video: i, id: i.id, action: "open" }), L.value = "";
                        }
                      }, "打开网页", 8, Hu)
                    ])) : k("", !0)
                  ]),
                  e("div", Yu, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: M((c) => P(c, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, l(i.author), 9, Wu),
                    e("span", null, l(i.favoriteDate), 1)
                  ])
                ], 40, Iu))), 128))
              ])),
              e("div", Xu, [
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: r.value.specialLoading || r.value.specialPage <= 1,
                  onClick: t[33] || (t[33] = (i) => v("following-page", r.value.specialPage - 1))
                }, "‹ 上一页", 8, ju),
                e("span", Ku, "第 " + l(r.value.specialPage) + " 页", 1),
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: r.value.specialLoading || !r.value.followingHasMore,
                  onClick: t[34] || (t[34] = (i) => v("following-page", r.value.specialPage + 1))
                }, "下一页 ›", 8, Qu)
              ])
            ])) : r.value.mode === "subscription" ? (o(), s("section", Ju, [
              e("div", Zu, [
                $e(di, { "show-back": "" }),
                r.value.subscriptionLoading ? (o(), s("div", ed, [...t[84] || (t[84] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取订阅视频与 AI 字幕稿…", -1)
                ])])) : r.value.subscriptionError ? (o(), s("p", td, "读取失败：" + l(r.value.subscriptionError), 1)) : (o(), s("div", id, [
                  $e(Lo),
                  $e(Ri)
                ]))
              ])
            ])) : r.value.mode === "radio" ? (o(), s("section", od, [
              e("header", sd, [
                t[85] || (t[85] = e("div", { class: "fo-hero-left" }, [
                  e("div", { class: "fo-bili-cover fo-vue-radio-cover" }, [
                    e("span", null, "📻")
                  ]),
                  e("div", { class: "fo-hero-folder-info" }, [
                    e("h3", null, "B站电台"),
                    e("p", null, "从左侧选择收藏夹，将视频拖拽或添加到连播队列，自由编排系列随心听")
                  ])
                ], -1)),
                e("div", nd, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    onClick: t[35] || (t[35] = (i) => v("radio-refresh"))
                  }, "↻ 刷新电台"),
                  e("button", {
                    type: "button",
                    onClick: t[36] || (t[36] = (i) => v("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", ld, [
                e("aside", ad, [
                  t[86] || (t[86] = e("p", { class: "sw-title" }, "收藏夹", -1)),
                  e("div", rd, [
                    (o(!0), s(V, null, j(n(I).radioFolders, (i) => (o(), s("button", {
                      key: i.id,
                      type: "button",
                      class: z(["bili-radio-folder", { on: i.id === n(I).radioActiveFolderId }]),
                      onClick: (c) => v("radio-select-folder", i.id)
                    }, [
                      e("span", null, l(i.title), 1),
                      e("span", null, l(i.count), 1)
                    ], 10, ud))), 128)),
                    n(I).radioFolders.length ? k("", !0) : (o(), s("p", dd, l(n(I).radioLoading ? "加载中…" : "暂无收藏夹"), 1))
                  ])
                ]),
                e("section", cd, [
                  t[88] || (t[88] = e("p", {
                    id: "bili-radio-library-title",
                    class: "sw-title"
                  }, "收藏夹视频", -1)),
                  n(I).radioError ? (o(), s("p", pd, l(n(I).radioError), 1)) : k("", !0),
                  e("div", bd, [
                    (o(!0), s(V, null, j(n(I).radioVideos, (i) => (o(), s("button", {
                      key: i.bvid,
                      type: "button",
                      class: "bili-radio-video",
                      title: `${i.title} (点击加入连播队列，或按住拖拽封面到下方卡带机直接播放)`,
                      draggable: "true",
                      onDragstart: (c) => _t(c, i),
                      onClick: (c) => v("radio-add", { bvid: i.bvid, title: i.title, cover: i.cover, author: i.author, duration: i.duration })
                    }, [
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, fd)) : (o(), s("span", gd)),
                      e("p", null, l(i.title), 1),
                      t[87] || (t[87] = e("span", null, "＋", -1))
                    ], 40, vd))), 128)),
                    n(I).radioVideos.length ? k("", !0) : (o(), s("p", md, l(n(I).radioLoading ? "读取视频中…" : "此收藏夹暂无可播放视频"), 1))
                  ])
                ]),
                e("section", hd, [
                  e("div", yd, [
                    ce(e("input", {
                      id: "bili-radio-name",
                      "onUpdate:modelValue": t[37] || (t[37] = (i) => n(I).radioSeriesName = i),
                      maxlength: "48",
                      class: z({ "has-error": d.value }),
                      placeholder: d.value ? "⚠️ 请在此输入系列名称后再保存！" : "请输入系列名称（必填）",
                      autocomplete: "off",
                      onInput: t[38] || (t[38] = (i) => d.value = !1),
                      onKeydown: Le(M($, ["prevent"]), ["enter"])
                    }, null, 42, _d), [
                      [Te, n(I).radioSeriesName]
                    ]),
                    e("div", kd, [
                      e("button", {
                        id: "bili-radio-save",
                        type: "button",
                        title: "保存当前队列为系列",
                        onClick: $
                      }, " 💾 保存系列 "),
                      e("button", {
                        id: "bili-radio-rename",
                        type: "button",
                        title: "重命名当前系列",
                        onClick: f
                      }, " ✏️ 重命名 "),
                      $e(pt, {
                        id: "bili-radio-share",
                        compact: "",
                        label: "🚀 分享",
                        visible: !0,
                        onSelect: mt
                      })
                    ]),
                    e("div", $d, [
                      e("select", {
                        class: "bili-radio-series-select",
                        title: "快速切换已保存的系列",
                        onChange: S
                      }, [
                        e("option", wd, l(n(I).radioSeries.length ? `📚 已保存系列 (${n(I).radioSeries.length})` : "📚 暂无保存系列"), 1),
                        (o(!0), s(V, null, j(n(I).radioSeries, (i) => (o(), s("option", {
                          key: i.id,
                          value: i.id
                        }, l(i.name) + " (" + l(i.count) + "首) ", 9, Cd))), 128)),
                        t[89] || (t[89] = e("option", {
                          value: "__create_new__",
                          class: "bili-radio-create-opt"
                        }, " ＋ 创建系列 ", -1))
                      ], 32)
                    ])
                  ]),
                  e("div", xd, [
                    (o(!0), s(V, null, j(n(I).radioQueue, (i, c) => (o(), s("div", {
                      key: `${i.bvid}-${c}`,
                      class: z(["bili-radio-queue-item", { "is-playing": n(X).active && n(X).trackIndex === c + 1 }]),
                      title: "点击立即从该曲目开始播放",
                      onClick: (N) => v("radio-play-index", c)
                    }, [
                      e("span", Td, l(n(X).active && n(X).trackIndex === c + 1 ? "♪" : c + 1), 1),
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Md)) : (o(), s("span", Dd)),
                      e("p", null, l(i.title), 1),
                      e("button", {
                        type: "button",
                        class: "bili-radio-remove",
                        "aria-label": `移除 ${i.title}`,
                        onClick: M((N) => v("radio-remove", { index: c }), ["stop"])
                      }, "×", 8, Pd)
                    ], 10, Sd))), 128)),
                    n(I).radioQueue.length ? k("", !0) : (o(), s("p", Ed, "点击左侧视频加入连播队列。"))
                  ]),
                  e("div", Id, [
                    e("button", {
                      id: "bili-radio-play",
                      type: "button",
                      disabled: !n(I).radioQueue.length,
                      onClick: t[39] || (t[39] = (i) => v("radio-play"))
                    }, "▶ 按顺序播放", 8, Rd),
                    e("button", {
                      id: "bili-radio-shuffle",
                      type: "button",
                      disabled: !n(I).radioQueue.length,
                      onClick: t[40] || (t[40] = (i) => v("radio-shuffle"))
                    }, "🔀 随机播放", 8, Ld),
                    e("button", {
                      id: "bili-radio-clear",
                      type: "button",
                      onClick: t[41] || (t[41] = (i) => v("radio-clear"))
                    }, "清空编辑区")
                  ])
                ])
              ]),
              n(Ge) || n(ot).activeId === "daily-bilibili" ? k("", !0) : (o(), Xe(vt, { key: 0 }))
            ])) : k("", !0)
          ], 34)
        ])
      ]),
      n(Ge) || n(ot).activeId === "daily-bilibili" ? (o(), Xe(vt, {
        key: 0,
        "dock-side": ""
      })) : k("", !0),
      t[101] || (t[101] = e("div", {
        class: "fm-pane",
        id: "pane-sub-video",
        hidden: "",
        style: { display: "none !important" }
      }, null, -1)),
      $e(ls),
      $e($n),
      W.value.visible && W.value.video ? (o(), s("div", {
        key: 1,
        ref_key: "videoMenuRef",
        ref: Q,
        class: "fo-context-menu",
        role: "menu",
        style: Me(n(Y)),
        onClick: t[50] || (t[50] = M(() => {
        }, ["stop"]))
      }, [
        e("div", {
          class: "fo-context-header",
          title: W.value.video.title
        }, l(W.value.video.title), 9, Bd),
        $e(pt, {
          label: "💬 发送到聊天室",
          "match-menu-item": "",
          visible: W.value.visible,
          onSelect: ht
        }, null, 8, ["visible"]),
        t[98] || (t[98] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[42] || (t[42] = (i) => Re("play"))
        }, [...t[90] || (t[90] = [
          e("span", { class: "fo-context-icon" }, "▶", -1),
          he(" 小窗播放视频 ", -1)
        ])]),
        t[99] || (t[99] = e("div", { class: "fo-context-divider" }, null, -1)),
        W.value.video.writable ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "fo-context-item danger",
          onClick: t[43] || (t[43] = (i) => Re("delete"))
        }, [...t[91] || (t[91] = [
          e("span", { class: "fo-context-icon" }, "🗑", -1),
          he(" 取消收藏 ", -1)
        ])])) : k("", !0),
        W.value.video.writable ? (o(), s("button", {
          key: 1,
          type: "button",
          class: "fo-context-item",
          onClick: t[44] || (t[44] = (i) => Re("move"))
        }, [...t[92] || (t[92] = [
          e("span", { class: "fo-context-icon" }, "📁", -1),
          he(" 移动到… ", -1)
        ])])) : k("", !0),
        W.value.video.writable ? (o(), s("div", zd)) : k("", !0),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[45] || (t[45] = (i) => Re("open"))
        }, [...t[93] || (t[93] = [
          e("span", { class: "fo-context-icon" }, "↗", -1),
          he(" 跳转到 B站 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[46] || (t[46] = (i) => Re("copy-link"))
        }, [...t[94] || (t[94] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          he(" 复制链接 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[47] || (t[47] = (i) => Re("cache"))
        }, [...t[95] || (t[95] = [
          e("span", { class: "fo-context-icon" }, "💾", -1),
          he(" 缓存视频 ", -1)
        ])]),
        t[100] || (t[100] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[48] || (t[48] = (i) => Re("create-task"))
        }, [...t[96] || (t[96] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          he(" 创建任务 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[49] || (t[49] = (i) => Re("subtitle"))
        }, [...t[97] || (t[97] = [
          e("span", { class: "fo-context-icon" }, "▤", -1),
          he(" 字幕转文本 ", -1)
        ])])
      ], 4)) : k("", !0),
      (o(), Xe(xt, { to: "body" }, [
        $e($l)
      ]))
    ], 2));
  }
}), Jd = /* @__PURE__ */ Ee(Ad, [["__scopeId", "data-v-54329878"]]);
export {
  Jd as default
};
