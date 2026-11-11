import { d as De, o, e as s, i as e, t as l, u as n, A as B, m as ye, F as V, g as j, f as _, p as we, h as M, s as te, w as ve, B as He, x as ft, l as pe, n as Te, k as Le, b as D, D as nt, Q as dt, K as gt, z as Me, v as Ct, y as lt, E as tt, j as Xe, T as xt } from "./vendor-vue-9b0eS4bW.js";
import { a as I, b as Ne, c as it, s as St } from "./bili-favorites-store-CHgKxS36.js";
import { c as ut, B as X, r as Be, z as ce, n as je, d as Ke, o as ot, D as ct } from "./view-styles-NfYkuEdl.js";
import { C as pt } from "./ChatShareMenu-DpzKRJep.js";
import { u as Tt } from "./useCardActivity-BIAJJGwr.js";
import { _ as Ee, t as A } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { B as Qe } from "./BiliRichText-DiMdMZkQ.js";
import { d as Mt, a as Dt } from "./playback-sync-Yy023Tr3.js";
import { a as he, d as st, e as m, c as $e } from "./up-group-manager-store-CpyVJse3.js";
import { g as Pt, s as Et } from "./cache-directory-CBBZXa5n.js";
import { biliMessagePanelController as It, biliMessagePanelState as Rt } from "./message-panel-store-DSzBLxHU.js";
import { bilibiliChannelService as Ae } from "./bilibili-channel.service-lbhcjchy.js";
import { u as Lt } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-9z3_WNrf.js";
const zt = { class: "bili-sub-header bili-sub-vue-header" }, Bt = { class: "bili-sub-channel-info" }, At = { class: "bili-sub-vue-title-row" }, Nt = { class: "bili-sub-title" }, Vt = { class: "bili-sub-desc" }, Ut = { class: "bili-sub-actions" }, Gt = { class: "bili-sub-mode-icon" }, Ft = { class: "bili-sub-mode-text" }, Ot = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, qt = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, Ht = { class: "bili-sub-dropdown-panel" }, Yt = { class: "bili-sub-dropdown-list" }, Wt = ["onClick"], Xt = { class: "bili-sub-item-text" }, jt = {
  key: 0,
  class: "bili-sub-item-check"
}, Kt = { class: "bili-sub-dropdown-foot" }, Qt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, Jt = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, Zt = { class: "bili-sub-dropdown-panel bili-sub-video-dropdown-panel" }, ei = { class: "bili-sub-dropdown-title" }, ti = { class: "bili-sub-dropdown-list" }, ii = ["title", "onClick"], oi = { class: "bili-sub-video-num" }, si = { class: "bili-sub-item-text" }, ni = {
  key: 0,
  class: "bili-sub-video-duration"
}, li = { class: "bili-sub-dropdown-foot" }, ai = ["disabled"], ri = /* @__PURE__ */ De({
  __name: "BiliSubscriptionHeader",
  props: {
    showBack: { type: Boolean }
  },
  setup(fe) {
    function u($, f) {
      Ne.dispatch($, f);
    }
    return ($, f) => (o(), s("header", zt, [
      e("div", Bt, [
        f[6] || (f[6] = e("img", {
          class: "bili-sub-avatar",
          src: "assets/bilibili.svg",
          alt: ""
        }, null, -1)),
        e("div", null, [
          e("div", At, [
            e("h3", Nt, l(n(I).organizer.subscriptionTitle), 1)
          ]),
          e("p", Vt, l(n(I).organizer.subscriptionSubtitle), 1)
        ])
      ]),
      e("div", Ut, [
        e("button", {
          type: "button",
          class: B(["bili-sub-head-btn bili-sub-script-mode-btn", { "is-newspaper": n(I).organizer.subscriptionScriptMode === "newspaper" }]),
          onClick: f[0] || (f[0] = (T) => u("subscription-script-mode"))
        }, [
          e("span", Gt, l(n(I).organizer.subscriptionScriptMode === "newspaper" ? "📰" : "📜"), 1),
          e("span", Ft, l(n(I).organizer.subscriptionScriptMode === "newspaper" ? "报纸模式" : "滚动台词"), 1)
        ], 2),
        e("details", Ot, [
          e("summary", qt, [
            e("span", null, [
              f[7] || (f[7] = ye("关注 UP 主：", -1)),
              e("b", null, l(n(I).organizer.subscriptionTitle), 1)
            ]),
            f[8] || (f[8] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", Ht, [
            f[10] || (f[10] = e("div", { class: "bili-sub-dropdown-title" }, "已关注的 UP 主", -1)),
            e("div", Yt, [
              (o(!0), s(V, null, j(n(I).organizer.subscriptionChannels, (T) => (o(), s("button", {
                key: T.id,
                type: "button",
                class: B(["bili-sub-dropdown-item", { active: T.active }]),
                onClick: (x) => u("subscription-channel", T.id)
              }, [
                f[9] || (f[9] = e("span", { class: "bili-sub-dot" }, null, -1)),
                e("span", Xt, l(T.name), 1),
                T.active ? (o(), s("span", jt, "✓")) : _("", !0)
              ], 10, Wt))), 128))
            ]),
            e("div", Kt, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                onClick: f[1] || (f[1] = (T) => u("subscription-add-channel"))
              }, "＋ UP 主")
            ])
          ])
        ]),
        e("details", Qt, [
          e("summary", Jt, [
            e("span", null, [
              f[11] || (f[11] = ye("视频 ", -1)),
              e("b", null, "(" + l(n(I).organizer.subscriptionVideos.length) + ")", 1)
            ]),
            f[12] || (f[12] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", Zt, [
            e("div", ei, "最近投稿视频 (" + l(n(I).organizer.subscriptionVideos.length) + ")", 1),
            e("div", ti, [
              (o(!0), s(V, null, j(n(I).organizer.subscriptionVideos, (T, x) => (o(), s("button", {
                key: T.bvid,
                type: "button",
                class: B(["bili-sub-dropdown-item bili-sub-video-item", { active: T.active }]),
                title: T.title,
                onClick: (P) => u("subscription-video", T.bvid)
              }, [
                e("span", oi, l(x + 1) + ".", 1),
                e("span", si, l(T.title), 1),
                T.duration ? (o(), s("small", ni, l(T.duration), 1)) : _("", !0)
              ], 10, ii))), 128))
            ]),
            e("div", li, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                disabled: n(I).organizer.subscriptionLoading,
                onClick: f[2] || (f[2] = (T) => u("subscription-load-more"))
              }, "继续获取", 8, ai)
            ])
          ])
        ]),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: f[3] || (f[3] = (T) => u(n(I).organizer.showFullDescInRightPanel ? "subscription-copy-description" : "subscription-copy-script"))
        }, l(n(I).organizer.showFullDescInRightPanel ? "复制简介" : "复制稿子"), 1),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: f[4] || (f[4] = (T) => u("subscription-refresh"))
        }, "↻ 刷新"),
        fe.showBack ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "bili-sub-head-btn",
          onClick: f[5] || (f[5] = (T) => u("organizer-open"))
        }, "← 返回收藏夹")) : _("", !0)
      ])
    ]));
  }
}), di = /* @__PURE__ */ Ee(ri, [["__scopeId", "data-v-3f587b61"]]), ui = { class: "bili-sub-transcript-column bili-sub-vue-transcript-column" }, ci = { class: "bili-sub-article-wrap" }, pi = { class: "bili-sub-transcript-body" }, bi = {
  key: 0,
  class: "bili-sub-description-copy",
  title: "当前为放大简介视图"
}, vi = {
  key: 0,
  class: "muted"
}, fi = {
  key: 0,
  class: "bili-sub-newspaper-list"
}, gi = ["data-idx", "data-from", "data-to", "title", "onClick"], mi = { class: "bili-sub-newspaper-header" }, hi = { class: "bili-sub-newspaper-num" }, yi = { class: "bili-sub-newspaper-heading" }, _i = { class: "bili-sub-newspaper-title" }, ki = { class: "bili-sub-newspaper-time" }, $i = ["onClick"], wi = { class: "bili-sub-newspaper-content" }, Ci = ["data-from", "data-to", "title", "onClick"], xi = {
  key: 1,
  class: "bili-sub-srt-list"
}, Si = ["data-idx", "data-from", "data-to", "title", "onClick"], Ti = { class: "bili-sub-srt-time" }, Mi = { class: "bili-sub-srt-text" }, Di = {
  key: 2,
  class: "bili-sub-no-transcript-box"
}, Pi = {
  key: 2,
  class: "bili-sub-vue-empty-hint"
}, Ei = /* @__PURE__ */ De({
  __name: "BiliSubscriptionTranscript",
  setup(fe) {
    const u = te(() => I.organizer), $ = te(() => u.value.subscriptionChapters.length > 0 || u.value.subscriptionCues.length > 0);
    function f(T, x) {
      Ne.dispatch(T, x);
    }
    return (T, x) => (o(), s("section", ui, [
      e("article", ci, [
        e("div", pi, [
          u.value.showFullDescInRightPanel ? (o(), s("section", bi, [
            e("header", null, [
              x[1] || (x[1] = e("h5", null, "视频简介", -1)),
              e("button", {
                type: "button",
                class: "bili-copy-desc-btn",
                title: "切回台词展示",
                onClick: x[0] || (x[0] = (P) => f("subscription-toggle-desc-panel"))
              }, "缩小简介")
            ]),
            (o(!0), s(V, null, j(u.value.subscriptionDescription, (P, r) => (o(), s("p", { key: r }, [
              we(Qe, { text: P }, null, 8, ["text"])
            ]))), 128)),
            u.value.subscriptionDescription.length ? _("", !0) : (o(), s("p", vi, "该视频暂无可用的文字简介。"))
          ])) : (o(), s(V, { key: 1 }, [
            u.value.subscriptionScriptMode === "newspaper" && u.value.subscriptionChapters.length ? (o(), s("div", fi, [
              (o(!0), s(V, null, j(u.value.subscriptionChapters, (P, r) => (o(), s("article", {
                key: `${P.from}:${r}`,
                class: "bili-sub-newspaper-section",
                "data-idx": r,
                "data-from": P.from,
                "data-to": P.to,
                title: `点击跳转至 ${P.fromText} 播放`,
                onClick: (k) => f("subscription-seek", { from: P.from, index: r, mode: "newspaper" })
              }, [
                e("header", mi, [
                  e("span", hi, l(String(r + 1).padStart(2, "0")), 1),
                  e("div", yi, [
                    e("h4", _i, l(P.title), 1),
                    e("span", ki, "⏱ " + l(P.fromText) + " - " + l(P.toText), 1)
                  ]),
                  e("button", {
                    type: "button",
                    class: "bili-sub-newspaper-play-btn",
                    "aria-label": "从头播放此分段",
                    onClick: M((k) => f("subscription-seek", { from: P.from, index: r, mode: "newspaper" }), ["stop"])
                  }, "▶", 8, $i)
                ]),
                e("div", wi, [
                  P.paragraphCues && P.paragraphCues.length ? (o(!0), s(V, { key: 0 }, j(P.paragraphCues, (k, w) => (o(), s("p", {
                    key: w,
                    class: "bili-sub-newspaper-p"
                  }, [
                    (o(!0), s(V, null, j(k, (U, Z) => (o(), s("span", {
                      key: `${U.from}:${Z}`,
                      class: "bili-sub-newspaper-cue",
                      "data-from": U.from,
                      "data-to": U.to,
                      title: `点击跳转播放此句 (⏱ ${U.timeText || U.from + "s"})`,
                      onClick: M((Y) => f("subscription-seek", { from: U.from, mode: "newspaper" }), ["stop"])
                    }, l(U.content), 9, Ci))), 128))
                  ]))), 128)) : (o(!0), s(V, { key: 1 }, j(P.paragraphs, (k, w) => (o(), s("p", {
                    key: w,
                    class: "bili-sub-newspaper-p"
                  }, l(k), 1))), 128))
                ])
              ], 8, gi))), 128))
            ])) : u.value.subscriptionCues.length ? (o(), s("div", xi, [
              (o(!0), s(V, null, j(u.value.subscriptionCues, (P) => (o(), s("button", {
                key: `${P.from}:${P.index}`,
                type: "button",
                class: "bili-sub-srt-row",
                "data-idx": P.index,
                "data-from": P.from,
                "data-to": P.to,
                title: `点击跳转至 ${P.timeText}`,
                onClick: (r) => f("subscription-seek", { from: P.from, index: P.index, mode: "lyrics" })
              }, [
                e("span", Ti, l(P.timeText), 1),
                e("span", Mi, l(P.content), 1)
              ], 8, Si))), 128))
            ])) : (o(), s("div", Di, [...x[2] || (x[2] = [
              e("div", { class: "bili-sub-no-transcript-icon" }, "🎙️", -1),
              e("h5", null, "暂无实时台词字幕", -1),
              e("p", { class: "muted" }, "当前视频暂无可用字幕稿。如需阅读完整文案，请点击左侧视频标题旁的“放大简介”。", -1)
            ])]))
          ], 64)),
          !u.value.showFullDescInRightPanel && !$.value && !u.value.subscriptionDescription.length ? (o(), s("p", Pi, "字幕不可用时仍可在左侧播放和查看评论。")) : _("", !0)
        ])
      ])
    ]));
  }
}), Ii = /* @__PURE__ */ Ee(Ei, [["__scopeId", "data-v-d4a520da"]]), Ri = { class: "bili-sub-player-column" }, Li = {
  key: 0,
  class: "bili-sub-sticky-player"
}, zi = { class: "bili-sub-player-card" }, Bi = { class: "bili-sub-video-box" }, Ai = ["poster", "hidden"], Ni = ["src"], Vi = {
  key: 1,
  class: "bili-sub-video-loading"
}, Ui = { class: "bili-sub-video-meta" }, Gi = { class: "bili-sub-video-meta-actions" }, Fi = ["title"], Oi = { class: "bili-sub-meta-stats" }, qi = { class: "bili-sub-meta-desc" }, Hi = {
  class: "bili-sub-comments-section",
  id: "bili-sub-comments-section"
}, Yi = { class: "bili-mini-comments-head" }, Wi = { class: "bili-mini-comments-meta" }, Xi = { class: "bili-mini-comments-count bili-sub-comments-count" }, ji = { class: "bili-mini-comments-sort" }, Ki = { class: "bili-sub-comment-composer" }, Qi = ["onKeydown"], Ji = ["disabled"], Zi = {
  key: 0,
  class: "bili-sub-emote-picker"
}, eo = {
  key: 0,
  class: "fo-bili-loading"
}, to = { key: 1 }, io = ["title", "onClick"], oo = ["src", "alt"], so = { key: 1 }, no = { class: "bili-mini-comments-body bili-sub-comments-body" }, lo = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, ao = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, ro = ["src"], uo = { class: "bili-comment-main" }, co = { class: "bili-comment-user-row" }, po = { class: "bili-comment-uname" }, bo = {
  key: 0,
  class: "bili-comment-level"
}, vo = { class: "bili-comment-time" }, fo = { class: "bili-comment-text" }, go = {
  key: 0,
  class: "bili-comment-pictures"
}, mo = ["href", "onClick"], ho = ["src"], yo = { class: "bili-comment-actions" }, _o = { key: 0 }, ko = { key: 1 }, $o = {
  key: 1,
  class: "bili-comment-sub-list"
}, wo = { class: "bili-comment-sub-uname" }, Co = { class: "bili-comment-sub-more" }, xo = ["disabled", "onClick"], So = ["disabled", "onClick"], To = ["onClick"], Mo = { class: "bili-sub-comments-infinite-trigger" }, Do = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0" }
}, Po = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0", opacity: "0.6" }
}, Eo = {
  key: 1,
  class: "fo-bili-empty"
}, Io = /* @__PURE__ */ De({
  __name: "BiliSubscriptionPlayer",
  setup(fe) {
    const u = te(() => I.organizer.subscriptionCurrent), $ = D(null), f = D(!1), T = D(!1), x = D(""), P = D(""), r = D(1), k = D(1), w = D([]), U = D("0 条"), Z = D(!1), Y = D(!1), L = D(""), W = D(!1), Q = D(""), O = D(null), E = D(!1), q = D(""), ie = D(!1), oe = D(!1), be = D(!1), v = D([]);
    let se = null, ne = null;
    function ee(C, h = !1) {
      q.value = C, ie.value = h, se && clearTimeout(se), se = setTimeout(() => {
        q.value = "";
      }, 3500);
    }
    function le() {
      Ne.dispatch("subscription-open-player");
    }
    function ue() {
      Ne.dispatch("subscription-toggle-desc-panel");
    }
    function R(C) {
      const h = C.currentTarget;
      h && h.scrollHeight - h.scrollTop - h.clientHeight < 180 && !Y.value && W.value && re();
    }
    function g(C, h) {
      const p = C[h];
      p && window.open(p, "_blank", "noopener,noreferrer");
    }
    function H(C, h) {
      if (!C) return [];
      if (!h || h.size === 0)
        return [{ type: "text", text: C }];
      const p = /\[([^\]]+)\]/g, S = [];
      let F = 0, G;
      for (; (G = p.exec(C)) !== null; ) {
        G.index > F && S.push({ type: "text", text: C.slice(F, G.index) });
        const K = G[0], de = h.get(K);
        de ? S.push({ type: "emote", text: K, url: de }) : S.push({ type: "text", text: K }), F = p.lastIndex;
      }
      return F < C.length && S.push({ type: "text", text: C.slice(F) }), S;
    }
    function J(C) {
      if (!C) return "";
      const h = new Date(C * 1e3), p = /* @__PURE__ */ new Date(), S = Math.floor((p.getTime() - h.getTime()) / 1e3);
      if (S < 60) return "刚刚";
      if (S < 3600) return `${Math.floor(S / 60)} 分钟前`;
      if (S < 86400) return `${Math.floor(S / 3600)} 小时前`;
      const F = h.getFullYear(), G = String(h.getMonth() + 1).padStart(2, "0"), K = String(h.getDate()).padStart(2, "0");
      return F === p.getFullYear() ? `${G}-${K}` : `${F}-${G}-${K}`;
    }
    function ge(C) {
      return C ? C >= 1e4 ? (C / 1e4).toFixed(1).replace(/\.0$/, "") + "万" : String(C) : "0";
    }
    async function y(C = !1) {
      if (P.value) {
        C ? Y.value = !0 : (Z.value = !0, L.value = "");
        try {
          const h = `https://api.bilibili.com/x/v2/reply?type=1&oid=${P.value}&pn=${k.value}&ps=20&sort=${r.value}`, S = await (await fetch(h, { credentials: "include" })).json();
          if (S?.code !== 0 || !S?.data) {
            C || (L.value = S?.message || "评论加载失败或该视频已关闭评论", w.value = []), W.value = !1;
            return;
          }
          const F = S.data, G = F.page?.count || 0;
          U.value = `${ge(G)} 条`;
          const de = (Array.isArray(F.replies) ? F.replies : []).map((ae) => {
            const Ye = /* @__PURE__ */ new Map();
            ae.content?.emote && Object.entries(ae.content.emote).forEach(([ke, Ge]) => {
              Ge?.url && Ye.set(ke, String(Ge.url).replace(/^http:/, "https:"));
            });
            const Oe = String(ae.content?.message || ""), qe = Array.isArray(ae.content?.pictures) ? ae.content.pictures.map((ke) => String(ke?.img_src || ke).replace(/^http:/, "https:")).filter(Boolean) : [], We = Array.isArray(ae.replies) ? ae.replies.map((ke) => ({
              id: ke.rpid || Math.random(),
              userName: ke.member?.uname || "B站用户",
              message: String(ke.content?.message || "")
            })) : [];
            return {
              id: ae.rpid || Math.random(),
              userName: ae.member?.uname || "B站用户",
              avatar: String(ae.member?.avatar || "").replace(/^http:/, "https:"),
              level: Number(ae.member?.level_info?.current_level || 0),
              message: Oe,
              tokens: H(Oe, Ye),
              timeStr: J(ae.ctime),
              likeCount: Number(ae.like || 0),
              replyCount: Number(ae.rcount || 0),
              pictures: qe,
              replies: We
            };
          });
          C ? w.value = [...w.value, ...de] : w.value = de, W.value = w.value.length < G;
        } catch (h) {
          C || (L.value = h?.message || "网络异常，未能加载评论");
        } finally {
          Z.value = !1, Y.value = !1;
        }
      }
    }
    async function d(C) {
      const h = w.value.find((p) => String(p.id) === String(C));
      if (!(!h || h.subRepliesLoading || !P.value)) {
        h.subRepliesPage ? h.subRepliesPage++ : h.subRepliesPage = 1, h.subRepliesLoading = !0, h.subRepliesExpanded = !0;
        try {
          const p = await ut.getSubReplies(P.value, C, h.subRepliesPage, 10), S = (p.replies || []).map((K) => ({
            id: String(K.rpid),
            userName: K.uname,
            message: K.message
          })), F = new Set((h.replies || []).map((K) => String(K.id))), G = S.filter((K) => !F.has(String(K.id)));
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
    function z(C) {
      r.value !== C && (r.value = C, k.value = 1, y(!1));
    }
    function re() {
      Y.value || !W.value || (k.value += 1, y(!0));
    }
    async function me() {
      if (oe.value = !oe.value, oe.value && !v.value.length && !be.value) {
        be.value = !0;
        try {
          const h = await (await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", { credentials: "include" })).json();
          h?.code === 0 && Array.isArray(h?.data?.packages) && (v.value = h.data.packages.filter((p) => Array.isArray(p.emote) && p.emote.length).map((p) => ({
            text: p.text || "B站表情",
            emote: p.emote.map((S) => ({
              text: S.text || "",
              url: String(S.url || "").replace(/^http:/, "https:")
            }))
          })));
        } catch {
        } finally {
          be.value = !1;
        }
      }
    }
    function Se(C) {
      const h = O.value;
      if (!h)
        Q.value += C;
      else {
        const p = h.selectionStart ?? h.value.length, S = h.selectionEnd ?? p;
        Q.value = Q.value.slice(0, p) + C + Q.value.slice(S), nt(() => {
          h.focus();
          const F = p + C.length;
          h.setSelectionRange(F, F);
        });
      }
      oe.value = !1;
    }
    async function Ce() {
      const C = Q.value.trim();
      if (!C) {
        ee("请输入评论内容", !0);
        return;
      }
      if (!P.value) {
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
        const S = new URLSearchParams({
          oid: String(P.value),
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
          body: S.toString()
        })).json();
        G?.code === 0 ? (Q.value = "", ee("✓ 评论发表成功！", !1), k.value = 1, y(!1)) : ee(`❌ 发送失败：${G?.message || G?.code}`, !0);
      } catch (S) {
        ee(`❌ 发送出错：${S?.message || "网络异常"}`, !0);
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
      f.value = !0, T.value = !1, x.value = "";
      let h = C.aid;
      if (!h)
        try {
          const S = await (await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${C.bvid}`, { credentials: "include" })).json();
          S?.data?.aid && (h = S.data.aid);
        } catch {
        }
      P.value = h || "", k.value = 1, y(!1);
      try {
        const p = await ut.resolvePlayStream(C);
        if (p?.sources?.length) {
          $.value && (typeof document < "u" && document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((S) => {
            try {
              S.pause();
            } catch {
            }
          }), $.value.src = p.sources[0], $.value.play().catch(() => {
          }), Dt({ bvid: C.bvid, title: C.title, cover: C.cover }, $.value)), f.value = !1;
          return;
        }
      } catch (p) {
        console.warn("[BiliSubscriptionPlayer] 本地视频流解析失败，使用 iframe 备用:", p);
      }
      T.value = !0, x.value = `https://player.bilibili.com/player.html?bvid=${C.bvid}&autoplay=1&danmaku=0`, f.value = !1;
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
    function _e() {
      if (!$.value) return;
      const C = $.value.currentTime;
      if (document.querySelectorAll(".bili-sub-newspaper-section").forEach((S) => {
        const F = Number(S.getAttribute("data-from") || 0), G = Number(S.getAttribute("data-to") || 0), K = C >= F && (G <= 0 || C < G);
        S.classList.toggle("active", K);
      }), I.organizer.subscriptionScriptMode === "newspaper") {
        const S = document.querySelectorAll(".bili-sub-newspaper-cue");
        if (S.length > 0) {
          let F = null;
          if (S.forEach((G) => {
            const K = Number(G.getAttribute("data-from") || 0), de = Number(G.getAttribute("data-to") || 0);
            C >= K && (de <= 0 || C < de) ? (F || (F = G), G.classList.add("cue-reading-active")) : G.classList.remove("cue-reading-active");
          }), !F && C > 0)
            for (let G = S.length - 1; G >= 0; G--) {
              const K = S[G], de = Number(K.getAttribute("data-from") || 0);
              if (C >= de) {
                F = K, K.classList.add("cue-reading-active");
                break;
              }
            }
          F && F !== Ie && (Ie = F, Ue(F));
        }
      } else {
        const S = document.querySelectorAll(".bili-sub-srt-row");
        let F = !1, G = null;
        for (let K = S.length - 1; K >= 0; K--) {
          const de = S[K], ae = Number(de.getAttribute("data-from") || 0);
          !F && C >= ae ? (de.classList.add("active"), F = !0, G = de) : de.classList.remove("active");
        }
        G && G !== Ve && (Ve = G, Ue(G));
      }
    }
    function ze() {
      _e();
    }
    function Fe() {
      _e();
    }
    return ve(
      () => u.value?.bvid,
      () => {
        u.value && Pe(u.value);
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
    }), (C, h) => (o(), s("aside", Ri, [
      u.value ? (o(), s("div", Li, [
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
          e("div", Bi, [
            e("video", {
              ref_key: "videoRef",
              ref: $,
              class: "bili-sub-native-video",
              controls: "",
              playsinline: "",
              poster: u.value.cover,
              hidden: T.value,
              onTimeupdate: _e,
              onSeeked: ze,
              onPlay: Fe
            }, null, 40, Ai),
            T.value ? (o(), s("iframe", {
              key: 0,
              class: "bili-sub-native-iframe",
              allowfullscreen: "true",
              allow: "autoplay; fullscreen",
              src: x.value
            }, null, 8, Ni)) : _("", !0),
            f.value ? (o(), s("div", Vi, [...h[4] || (h[4] = [
              e("i", null, null, -1),
              e("span", null, "正在解析登录高清视频流…", -1)
            ])])) : _("", !0)
          ]),
          e("div", {
            class: "bili-sub-scroll-stage",
            onScrollPassive: R
          }, [
            e("div", Ui, [
              e("div", Gi, [
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: n(I).organizer.showFullDescInRightPanel ? "切回台词展示" : "在右侧大屏展开完整视频简介",
                  onClick: ue
                }, l(n(I).organizer.showFullDescInRightPanel ? "缩小简介" : "放大简介"), 9, Fi)
              ]),
              e("h4", null, l(u.value.title), 1),
              e("div", Oi, [
                e("span", null, "▣ 播放: " + l(u.value.playCount), 1),
                e("span", null, "💬 弹幕: " + l(u.value.danmakuCount), 1),
                e("span", null, "⏱ " + l(u.value.duration), 1)
              ]),
              e("p", qi, [
                we(Qe, {
                  text: u.value.description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ]),
            e("div", Hi, [
              e("div", Yi, [
                e("div", Wi, [
                  h[5] || (h[5] = e("span", null, "💬 评论", -1)),
                  e("span", Xi, l(U.value), 1)
                ]),
                e("div", ji, [
                  e("button", {
                    type: "button",
                    class: B(["bili-mini-sort-btn", { active: r.value === 1 }]),
                    onClick: h[0] || (h[0] = (p) => z(1))
                  }, "按热度", 2),
                  e("button", {
                    type: "button",
                    class: B(["bili-mini-sort-btn", { active: r.value === 0 }]),
                    onClick: h[1] || (h[1] = (p) => z(0))
                  }, "按时间", 2)
                ])
              ]),
              e("div", Ki, [
                e("button", {
                  type: "button",
                  class: B(["bili-sub-emote-button", { on: oe.value }]),
                  title: "选择 B站 表情",
                  onClick: me
                }, "☺", 2),
                pe(e("input", {
                  ref_key: "commentInputRef",
                  ref: O,
                  "onUpdate:modelValue": h[2] || (h[2] = (p) => Q.value = p),
                  type: "text",
                  class: "bili-sub-comment-input",
                  placeholder: "发一条友善的评论吧…（Enter 发送）",
                  maxlength: "500",
                  onKeydown: Le(M(Ce, ["prevent"]), ["enter"])
                }, null, 40, Qi), [
                  [Te, Q.value]
                ]),
                e("button", {
                  type: "button",
                  class: "bili-sub-comment-send-btn",
                  disabled: E.value || !Q.value.trim(),
                  onClick: Ce
                }, l(E.value ? "发送中…" : "发送"), 9, Ji)
              ]),
              oe.value ? (o(), s("div", Zi, [
                be.value ? (o(), s("div", eo, [...h[6] || (h[6] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取 B站 表情包…", -1)
                ])])) : (o(), s("div", to, [
                  (o(!0), s(V, null, j(v.value, (p) => (o(), s("section", {
                    key: p.text,
                    class: "bili-sub-emote-group"
                  }, [
                    e("h5", null, l(p.text || "B站表情"), 1),
                    e("div", null, [
                      (o(!0), s(V, null, j(p.emote, (S) => (o(), s("button", {
                        key: S.text,
                        type: "button",
                        class: "bili-sub-emote-item",
                        title: S.text,
                        onClick: (F) => Se(S.text)
                      }, [
                        S.url ? (o(), s("img", {
                          key: 0,
                          src: S.url,
                          alt: S.text,
                          referrerpolicy: "no-referrer"
                        }, null, 8, oo)) : (o(), s("span", so, l(S.text), 1))
                      ], 8, io))), 128))
                    ])
                  ]))), 128))
                ]))
              ])) : _("", !0),
              q.value ? (o(), s("div", {
                key: 1,
                class: B(["bili-sub-comment-tip", { error: ie.value }])
              }, l(q.value), 3)) : _("", !0),
              e("div", no, [
                Z.value && !w.value.length ? (o(), s("p", lo, "正在加载评论…")) : L.value && !w.value.length ? (o(), s("p", ao, l(L.value), 1)) : _("", !0),
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
                  }, null, 8, ro),
                  e("div", uo, [
                    e("div", co, [
                      e("span", po, l(p.userName), 1),
                      p.level ? (o(), s("span", bo, "LV" + l(p.level), 1)) : _("", !0),
                      e("span", vo, l(p.timeStr), 1)
                    ]),
                    e("div", fo, [
                      we(Qe, {
                        text: p.message
                      }, null, 8, ["text"])
                    ]),
                    p.pictures?.length ? (o(), s("div", go, [
                      (o(!0), s(V, null, j(p.pictures, (S, F) => (o(), s("a", {
                        key: F,
                        class: "bili-comment-pic-link",
                        href: S,
                        onClick: M((G) => g(p.pictures, F), ["stop", "prevent"])
                      }, [
                        e("img", {
                          class: "bili-comment-pic",
                          src: S,
                          alt: "评论图片",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, ho)
                      ], 8, mo))), 128))
                    ])) : _("", !0),
                    e("div", yo, [
                      p.likeCount ? (o(), s("span", _o, "👍 " + l(p.likeCount), 1)) : _("", !0),
                      p.replyCount ? (o(), s("span", ko, "💬 " + l(p.replyCount), 1)) : _("", !0)
                    ]),
                    p.replies?.length ? (o(), s("div", $o, [
                      (o(!0), s(V, null, j(p.replies, (S) => (o(), s("div", {
                        key: S.id,
                        class: "bili-comment-sub-item"
                      }, [
                        e("span", wo, l(S.userName) + ":", 1),
                        we(Qe, {
                          text: S.message
                        }, null, 8, ["text"])
                      ]))), 128)),
                      e("div", Co, [
                        !p.subRepliesExpanded && (p.replyCount || 0) > p.replies.length ? (o(), s(V, { key: 0 }, [
                          e("span", null, "共 " + l(p.replyCount) + " 条回复，", 1),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: p.subRepliesLoading,
                            onClick: M((S) => d(p.id), ["stop"])
                          }, l(p.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, xo)
                        ], 64)) : p.subRepliesExpanded ? (o(), s(V, { key: 1 }, [
                          p.subRepliesHasMore ? (o(), s("button", {
                            key: 0,
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: p.subRepliesLoading,
                            onClick: M((S) => d(p.id), ["stop"])
                          }, l(p.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, So)) : _("", !0),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-collapse-btn",
                            onClick: M((S) => b(p.id), ["stop"])
                          }, " 收起 ▴ ", 8, To)
                        ], 64)) : _("", !0)
                      ])
                    ])) : _("", !0)
                  ])
                ]))), 128))
              ]),
              e("div", Mo, [
                Y.value ? (o(), s("p", Do, "正在加载更多评论…")) : !W.value && w.value.length ? (o(), s("p", Po, "已显示全部评论")) : _("", !0)
              ])
            ])
          ], 32)
        ])
      ])) : (o(), s("p", Eo, "暂无可播放的订阅视频。"))
    ]));
  }
}), Ro = /* @__PURE__ */ Ee(Io, [["__scopeId", "data-v-ee6b4dc4"]]), Lo = ["disabled"], zo = ["disabled"], Bo = { key: 0 }, Ao = ["disabled"], No = ["disabled"], Vo = ["disabled"], Uo = ["disabled"], Go = { class: "bili-sub-add-shell" }, Fo = ["disabled"], Oo = { class: "bili-sub-add-toolbar" }, qo = { class: "bili-sub-add-groups" }, Ho = ["onClick"], Yo = { class: "bili-sub-add-list" }, Wo = {
  key: 0,
  class: "fo-bili-loading"
}, Xo = {
  key: 1,
  class: "fo-bili-empty"
}, jo = {
  key: 2,
  class: "fo-bili-empty"
}, Ko = ["disabled", "onClick"], Qo = ["src"], Jo = {
  key: 1,
  class: "bili-sub-add-avatar"
}, Zo = {
  class: "fo-custom-confirm-modal",
  role: "dialog",
  "aria-modal": "true"
}, es = { class: "fo-custom-confirm-head" }, ts = { class: "fo-custom-confirm-body" }, is = { class: "fo-custom-confirm-actions" }, os = ["disabled"], ss = ["disabled"], ns = /* @__PURE__ */ De({
  __name: "BiliOrganizerDialogs",
  setup(fe) {
    const u = te(() => st.create), $ = te(() => st.confirm), f = te(() => st.channelPicker), T = te(() => u.value.kind === "bili"), x = te(() => {
      const r = f.value, k = r.query.trim().toLowerCase(), w = r.groups.find((Z) => Z.id === r.activeGroupId), U = w ? new Set(w.mids) : null;
      return r.items.filter((Z) => (!U || U.has(Z.mid)) && (!k || Z.name.toLowerCase().includes(k) || Z.mid.includes(k)));
    });
    function P() {
      const r = u.value.name.trim();
      if (!r) {
        he.updateCreate({ status: "请输入名称", error: !0 });
        return;
      }
      he.submitCreate({ name: r, privacy: u.value.privacy });
    }
    return (r, k) => (o(), s(V, null, [
      u.value.open ? (o(), s("dialog", {
        key: 0,
        class: "fo-create-dialog",
        open: "",
        onClick: k[5] || (k[5] = M((w) => n(he).closeCreate(), ["self"])),
        onCancel: k[6] || (k[6] = M((w) => n(he).closeCreate(), ["prevent"]))
      }, [
        e("form", {
          onSubmit: M(P, ["prevent"])
        }, [
          e("header", null, [
            e("div", null, [
              k[14] || (k[14] = e("i", { class: "fo-folder-icon" }, null, -1)),
              e("span", null, [
                e("b", null, l(T.value ? "新建 B站收藏夹" : "新建插件分组"), 1),
                e("small", null, l(T.value ? "会同步创建到你的 B站账号" : "只整理左侧收藏夹，不修改 B站数据"), 1)
              ])
            ]),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: u.value.submitting,
              onClick: k[0] || (k[0] = (w) => n(he).closeCreate())
            }, "×", 8, Lo)
          ]),
          e("label", null, [
            e("span", null, l(T.value ? "收藏夹名称" : "分组名称"), 1),
            pe(e("input", {
              "onUpdate:modelValue": k[1] || (k[1] = (w) => u.value.name = w),
              maxlength: "48",
              autocomplete: "off",
              placeholder: "输入名称",
              required: "",
              disabled: u.value.submitting,
              autofocus: ""
            }, null, 8, zo), [
              [Te, u.value.name]
            ])
          ]),
          T.value ? (o(), s("fieldset", Bo, [
            k[17] || (k[17] = e("legend", null, "可见范围", -1)),
            e("label", null, [
              pe(e("input", {
                "onUpdate:modelValue": k[2] || (k[2] = (w) => u.value.privacy = w),
                type: "radio",
                value: 0,
                disabled: u.value.submitting
              }, null, 8, Ao), [
                [
                  dt,
                  u.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              k[15] || (k[15] = e("span", null, [
                e("b", null, "公开"),
                e("small", null, "其他人可以看到")
              ], -1))
            ]),
            e("label", null, [
              pe(e("input", {
                "onUpdate:modelValue": k[3] || (k[3] = (w) => u.value.privacy = w),
                type: "radio",
                value: 1,
                disabled: u.value.submitting
              }, null, 8, No), [
                [
                  dt,
                  u.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              k[16] || (k[16] = e("span", null, [
                e("b", null, "私密"),
                e("small", null, "仅自己可见")
              ], -1))
            ])
          ])) : _("", !0),
          e("p", {
            class: B(["fo-create-status", { error: u.value.error }]),
            role: "status"
          }, l(u.value.status), 3),
          e("footer", null, [
            e("button", {
              type: "button",
              disabled: u.value.submitting,
              onClick: k[4] || (k[4] = (w) => n(he).closeCreate())
            }, "取消", 8, Vo),
            e("button", {
              class: "primary",
              type: "submit",
              disabled: u.value.submitting
            }, l(u.value.submitting ? "创建中…" : T.value ? "创建收藏夹" : "创建分组"), 9, Uo)
          ])
        ], 32)
      ], 32)) : _("", !0),
      f.value.open ? (o(), s("dialog", {
        key: 1,
        class: "bili-sub-add-dialog",
        open: "",
        onCancel: k[10] || (k[10] = M((w) => n(he).closeChannelPicker(), ["prevent"]))
      }, [
        e("div", Go, [
          e("header", null, [
            k[18] || (k[18] = e("div", null, [
              e("b", null, "从我的关注中添加 UP 主"),
              e("small", null, "沿用“正在关注”的本地分组，只能添加已关注的 UP 主")
            ], -1)),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: !!f.value.submittingMid,
              onClick: k[7] || (k[7] = (w) => n(he).closeChannelPicker())
            }, "×", 8, Fo)
          ]),
          e("div", Oo, [
            e("div", qo, [
              e("button", {
                type: "button",
                class: B(["bili-sub-add-group", { on: f.value.activeGroupId === "__all__" }]),
                onClick: k[8] || (k[8] = (w) => n(he).updateChannelPicker({ activeGroupId: "__all__" }))
              }, "全部关注", 2),
              (o(!0), s(V, null, j(f.value.groups, (w) => (o(), s("button", {
                key: w.id,
                type: "button",
                class: B(["bili-sub-add-group", { on: f.value.activeGroupId === w.id }]),
                onClick: (U) => n(he).updateChannelPicker({ activeGroupId: w.id })
              }, l(w.name), 11, Ho))), 128))
            ]),
            pe(e("input", {
              "onUpdate:modelValue": k[9] || (k[9] = (w) => f.value.query = w),
              type: "search",
              placeholder: "搜索关注的 UP 主"
            }, null, 512), [
              [Te, f.value.query]
            ])
          ]),
          e("div", Yo, [
            f.value.loading ? (o(), s("div", Wo, [...k[19] || (k[19] = [
              e("i", null, null, -1),
              e("span", null, "正在读取关注分组…", -1)
            ])])) : f.value.error ? (o(), s("p", Xo, l(f.value.error), 1)) : x.value.length ? (o(!0), s(V, { key: 3 }, j(x.value, (w) => (o(), s("button", {
              key: w.mid,
              type: "button",
              class: "bili-sub-add-up",
              disabled: w.added || !!f.value.submittingMid,
              onClick: (U) => n(he).selectChannel(w.mid)
            }, [
              w.face ? (o(), s("img", {
                key: 0,
                src: w.face,
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, Qo)) : (o(), s("span", Jo, "UP")),
              e("span", null, [
                e("b", null, l(w.name), 1),
                e("small", null, "UID " + l(w.mid), 1)
              ]),
              e("i", null, l(w.added ? "已添加" : f.value.submittingMid === w.mid ? "添加中…" : "＋ 添加"), 1)
            ], 8, Ko))), 128)) : (o(), s("p", jo, "该分组中没有匹配的已关注 UP 主。"))
          ])
        ])
      ], 32)) : _("", !0),
      $.value.open ? (o(), s("div", {
        key: 2,
        class: "fo-custom-confirm-overlay",
        onClick: k[13] || (k[13] = M((w) => n(he).closeConfirm(), ["self"]))
      }, [
        e("div", Zo, [
          e("div", es, [
            e("h4", null, l($.value.title), 1)
          ]),
          e("div", ts, [
            e("p", null, l($.value.message), 1)
          ]),
          e("div", is, [
            e("button", {
              type: "button",
              class: "fo-confirm-btn cancel",
              disabled: $.value.submitting,
              onClick: k[11] || (k[11] = (w) => n(he).closeConfirm())
            }, l($.value.cancelText), 9, os),
            e("button", {
              type: "button",
              class: B(["fo-confirm-btn confirm", { danger: $.value.danger }]),
              disabled: $.value.submitting,
              onClick: k[12] || (k[12] = (w) => n(he).submitConfirm())
            }, l($.value.submitting ? "处理中…" : $.value.confirmText), 11, ss)
          ])
        ])
      ])) : _("", !0)
    ], 64));
  }
}), ls = ["aria-busy"], as = { class: "field full-width" }, rs = { class: "cache-directory-name" }, ds = { class: "cache-directory-actions" }, us = ["disabled"], cs = ["disabled"], ps = /* @__PURE__ */ De({
  __name: "BiliSettingsPanel",
  props: {
    active: { type: Boolean }
  },
  setup(fe) {
    const u = fe, $ = D(!1), f = D(!1), T = D(""), x = D(!1), P = D(null), r = D("尚未选择缓存目录");
    let k = !0, w = 0;
    async function U() {
      if (!u.active || $.value) return;
      const Y = ++w;
      f.value = !0;
      try {
        const L = await Pt();
        if (!k || Y !== w) return;
        P.value = L, r.value = L?.name || "尚未选择缓存目录";
      } catch {
        k && Y === w && (P.value = null, r.value = "缓存目录读取失败，请重试");
      } finally {
        k && Y === w && (f.value = !1);
      }
    }
    async function Z() {
      if ($.value || !u.active) return;
      const Y = window.showDirectoryPicker;
      if (typeof Y != "function") {
        T.value = "当前浏览器不支持目录选择，请使用支持此功能的 Edge 或 Chrome。", x.value = !0;
        return;
      }
      ++w, f.value = !1, $.value = !0, T.value = "";
      try {
        const L = await Y.call(window, {
          id: "logicweaver-bili-cache",
          mode: "readwrite",
          startIn: P.value || "videos"
        });
        if (await Et(L), !k) return;
        P.value = L, r.value = L.name, x.value = !1, T.value = "目录已保存，新缓存将存入这里；已有视频不会移动或删除。";
      } catch (L) {
        k && L?.name !== "AbortError" && (x.value = !0, T.value = "目录选择或保存未确认，请重读目录核对后再试。");
      } finally {
        k && ($.value = !1);
      }
    }
    return ve(() => u.active, (Y) => {
      Y ? U() : ++w;
    }, { immediate: !0 }), He(() => window.addEventListener("focus", U)), gt(() => {
      k = !1, ++w, window.removeEventListener("focus", U);
    }), (Y, L) => (o(), s("div", {
      class: "settings-subgroup bili-cache-settings",
      "aria-busy": $.value || f.value
    }, [
      e("div", as, [
        e("p", rs, l(f.value ? "正在读取缓存目录…" : r.value), 1),
        e("div", ds, [
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !u.active || $.value || f.value,
            onClick: Z
          }, l($.value ? "正在保存…" : "选择或重新授权目录"), 9, us),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !u.active || $.value || f.value,
            onClick: U
          }, "重读目录", 8, cs)
        ]),
        L[0] || (L[0] = e("p", { class: "hint" }, "仅更改之后的缓存位置；新缓存保留原目录关联，旧版记录需选择其实际所在目录后播放。不会自动扫描或搬移已有文件。", -1)),
        T.value ? (o(), s("p", {
          key: 0,
          class: B(["hint cache-directory-message", { "is-error": x.value }]),
          role: "status"
        }, l(T.value), 3)) : _("", !0)
      ])
    ], 8, ls));
  }
}), bs = /* @__PURE__ */ Ee(ps, [["__scopeId", "data-v-ccf6929a"]]), vs = {
  class: "bili-cache-settings-view",
  "aria-labelledby": "bili-cache-settings-title"
}, fs = { class: "cache-settings-header" }, gs = { class: "cache-settings-card" }, ms = /* @__PURE__ */ De({
  __name: "BiliCacheSettingsView",
  props: {
    active: { type: Boolean }
  },
  emits: ["back"],
  setup(fe, { emit: u }) {
    const $ = u;
    return (f, T) => (o(), s("section", vs, [
      e("header", fs, [
        T[1] || (T[1] = e("div", null, [
          e("h3", { id: "bili-cache-settings-title" }, "缓存设置"),
          e("p", null, "管理 B站视频的本地缓存目录")
        ], -1)),
        e("button", {
          type: "button",
          class: "cache-settings-back",
          onClick: T[0] || (T[0] = (x) => $("back"))
        }, "返回缓存视频")
      ]),
      e("div", gs, [
        T[2] || (T[2] = e("h4", null, "视频缓存目录", -1)),
        T[3] || (T[3] = e("p", { class: "cache-settings-note" }, "选择后立即保存，无需到全局设置中操作。浏览器只提供文件夹名称，不显示完整磁盘路径。", -1)),
        we(bs, { active: fe.active }, null, 8, ["active"])
      ])
    ]));
  }
}), hs = /* @__PURE__ */ Ee(ms, [["__scopeId", "data-v-43d869dd"]]), ys = { class: "fo-upg-shell" }, _s = { class: "fo-upg-body" }, ks = { class: "fo-upg-sidebar" }, $s = { class: "fo-upg-sidebar-head" }, ws = { class: "fo-upg-group-items" }, Cs = ["onDragstart", "onDrop", "onClick"], xs = ["onKeydown"], Ss = {
  key: 0,
  class: "fo-upg-tree-branch"
}, Ts = {
  key: 1,
  class: "fo-folder-icon"
}, Ms = { class: "fo-upg-group-name" }, Ds = { class: "fo-upg-vue-group-actions" }, Ps = ["onClick"], Es = ["onClick"], Is = ["onClick"], Rs = ["placeholder"], Ls = {
  key: 1,
  class: "muted small"
}, zs = { class: "fo-upg-main" }, Bs = { class: "fo-upg-main-head" }, As = { class: "fo-upg-main-title" }, Ns = { key: 0 }, Vs = { class: "fo-upg-head-actions" }, Us = { class: "fo-upg-filter-tabs" }, Gs = { class: "fo-upg-batch-wrap" }, Fs = { class: "fo-upg-batch-count" }, Os = ["disabled"], qs = ["disabled"], Hs = { class: "fo-upg-toolbar" }, Ys = { class: "fo-upg-search" }, Ws = ["disabled"], Xs = {
  key: 0,
  class: "fo-bili-loading"
}, js = {
  key: 1,
  class: "fo-bili-empty"
}, Ks = {
  key: 2,
  class: "fo-bili-empty"
}, Qs = {
  key: 3,
  class: "fo-bili-empty"
}, Js = ["title", "onContextmenu", "onClick"], Zs = ["src"], en = { class: "fo-upg-info" }, tn = { class: "fo-upg-name" }, on = { class: "fo-upg-sign" }, sn = ["disabled", "onClick"], nn = {
  key: 1,
  class: "fo-upg-move-wrap"
}, ln = ["disabled"], an = { class: "fo-upg-move-dropdown" }, rn = ["disabled", "onClick"], dn = { key: 0 }, un = {
  key: 0,
  class: "muted small",
  style: { padding: "6px 10px" }
}, cn = ["disabled", "onClick"], pn = { class: "fo-upg-pagination" }, bn = { class: "fo-upg-page-info" }, vn = {
  key: 0,
  class: "fo-upg-page-btns"
}, fn = ["disabled"], gn = ["disabled"], mn = { class: "fo-upg-page-cur" }, hn = ["disabled"], yn = ["disabled"], _n = /* @__PURE__ */ De({
  __name: "BiliUpGroupManager",
  setup(fe) {
    const u = D(void 0), $ = D(""), f = D(""), T = D(""), x = D(""), P = D(!1), r = D(/* @__PURE__ */ new Set()), k = D(null);
    function w(y) {
      if (y.button !== 0 || y.target.closest("button,input")) return;
      const d = k.value;
      if (!d) return;
      const b = d.getBoundingClientRect(), z = b.left, re = b.top, me = y.clientX, Se = y.clientY;
      d.style.position = "fixed", d.style.left = `${z}px`, d.style.top = `${re}px`, d.style.right = "auto", d.style.bottom = "auto", d.style.margin = "0", d.style.transform = "none";
      const Ce = (Ie) => {
        const Ve = Ie.clientX - me, Ue = Ie.clientY - Se, _e = Math.max(8, Math.min(window.innerWidth - 120, z + Ve)), ze = Math.max(8, Math.min(window.innerHeight - 80, re + Ue));
        d.style.left = `${_e}px`, d.style.top = `${ze}px`;
      }, Pe = () => {
        window.removeEventListener("pointermove", Ce), window.removeEventListener("pointerup", Pe);
      };
      window.addEventListener("pointermove", Ce), window.addEventListener("pointerup", Pe);
    }
    const U = te(() => m.groups.find((y) => y.id === m.activeGroupId) || null), Z = te(() => {
      const y = m.query.trim().toLowerCase(), d = m.activeGroupId;
      return m.followings.filter((b) => {
        if (y && !b.name.toLowerCase().includes(y) && !b.sign.toLowerCase().includes(y) && !b.mid.includes(y)) return !1;
        const z = b.groupIds.includes(d);
        return m.filter === "ingroup" ? z : m.onlyUngrouped ? !b.groupIds || b.groupIds.length === 0 : !0;
      });
    }), Y = te(() => Math.max(1, Math.ceil(Z.value.length / m.pageSize))), L = te(() => {
      const d = (Math.min(m.page, Y.value) - 1) * m.pageSize;
      return Z.value.slice(d, d + m.pageSize);
    }), W = te(() => m.followings.filter((y) => y.groupIds.length === 0).length), Q = D(null), O = /* @__PURE__ */ new Map();
    function E(y) {
      const d = Math.max(1, Math.min(Y.value, y));
      m.page = d, Q.value && (Q.value.scrollTop = 0);
    }
    ve(() => [m.query, m.filter, m.onlyUngrouped], () => {
      m.page = 1, Q.value && (Q.value.scrollTop = 0);
    }), ve(() => m.activeGroupId, (y, d) => {
      if (d && Q.value) {
        const re = `${d}_${m.filter}_${m.onlyUngrouped}`;
        O.set(re, {
          page: m.page,
          scrollTop: Q.value.scrollTop
        });
      }
      if (m.filter === "all")
        return;
      const b = `${y}_${m.filter}_${m.onlyUngrouped}`, z = O.get(b);
      z ? (m.page = Math.min(z.page, Y.value), nt(() => {
        Q.value && (Q.value.scrollTop = z.scrollTop);
      })) : (m.page = 1, nt(() => {
        Q.value && (Q.value.scrollTop = 0);
      }));
    }), ve(Y, (y) => {
      m.page > y && (m.page = y);
    }), ve(P, (y) => {
      y || r.value.clear();
    });
    function q(y) {
      u.value = y, $.value = "";
    }
    function ie() {
      u.value = void 0, $.value = "";
    }
    function oe() {
      const y = $.value.trim();
      y && ($e.dispatch("create-group", { name: y, parentId: u.value || "" }), ie());
    }
    function be(y) {
      f.value = y.id, T.value = y.name;
    }
    function v() {
      const y = T.value.trim();
      f.value && y && $e.dispatch("rename-group", { id: f.value, name: y }), f.value = "", T.value = "";
    }
    function se(y, d) {
      x.value = d, y.dataTransfer?.setData("application/x-logicweaver-up-group", d), y.dataTransfer && (y.dataTransfer.effectAllowed = "move");
    }
    function ne(y, d) {
      const b = y.dataTransfer?.getData("application/x-logicweaver-up-group") || x.value;
      if (x.value = "", !b || b === d) return;
      const z = y.currentTarget?.getBoundingClientRect(), re = z ? y.clientY - z.top : 0, me = z ? re < z.height * 0.25 ? "before" : re > z.height * 0.75 ? "after" : "into" : "into";
      $e.dispatch("move-group", { sourceId: b, targetId: d, mode: me });
    }
    function ee(y) {
      const d = y.dataTransfer?.getData("application/x-logicweaver-up-group") || x.value;
      x.value = "", d && $e.dispatch("move-group", { sourceId: d, targetId: "", mode: "root" });
    }
    function le(y, d) {
      !d || m.busyMid || $e.dispatch("toggle-member", { groupId: d, mid: y });
    }
    function ue(y) {
      !m.activeGroupId || m.busyMid || $e.dispatch("toggle-member", { groupId: m.activeGroupId, mid: y });
    }
    function R(y, d) {
      $e.dispatch("preview-up", { mid: d, clientX: y.clientX, clientY: y.clientY });
    }
    function g(y) {
      const d = r.value;
      d.has(y) ? d.delete(y) : d.add(y);
    }
    function H() {
      if (!m.activeGroupId || m.busyMid) return;
      const y = Array.from(r.value);
      if (!y.length) return;
      const d = y.filter((b) => {
        const z = m.followings.find((re) => re.mid === b);
        return z && !z.groupIds.includes(m.activeGroupId);
      });
      if (d.length) {
        for (const b of d)
          $e.dispatch("toggle-member", { groupId: m.activeGroupId, mid: b });
        r.value.clear();
      }
    }
    function J() {
      if (!m.activeGroupId || m.busyMid) return;
      const y = Array.from(r.value);
      if (!y.length) return;
      const d = y.filter((b) => {
        const z = m.followings.find((re) => re.mid === b);
        return z && z.groupIds.includes(m.activeGroupId);
      });
      if (d.length) {
        for (const b of d)
          $e.dispatch("toggle-member", { groupId: m.activeGroupId, mid: b });
        r.value.clear();
      }
    }
    function ge() {
      for (const y of L.value) r.value.add(y.mid);
    }
    return (y, d) => n(m).open ? (o(), s("dialog", {
      key: 0,
      ref_key: "dialogEl",
      ref: k,
      class: "fo-up-group-dialog",
      open: "",
      onCancel: d[20] || (d[20] = M((b) => n($e).close(), ["prevent"]))
    }, [
      e("div", ys, [
        e("header", {
          class: "fo-upg-head",
          onPointerdown: w
        }, [
          d[21] || (d[21] = e("h3", null, [
            e("span", null, "👥"),
            ye(" 关注分组与 UP 主管理")
          ], -1)),
          e("button", {
            type: "button",
            class: "fo-upg-close-btn",
            "aria-label": "关闭",
            title: "关闭管理面板",
            onClick: d[0] || (d[0] = (b) => n($e).close())
          }, "✕")
        ], 32),
        e("div", _s, [
          e("aside", ks, [
            e("div", $s, [
              d[22] || (d[22] = e("span", null, "我的分组", -1)),
              e("button", {
                type: "button",
                onClick: d[1] || (d[1] = (b) => q(null))
              }, "＋ 新建")
            ]),
            e("div", ws, [
              e("div", {
                class: "fo-upg-root-dropzone",
                onDragover: d[2] || (d[2] = M(() => {
                }, ["prevent"])),
                onDrop: M(ee, ["prevent"])
              }, "⇣ 拖至此处变为顶级分组", 32),
              u.value === null ? (o(), s("form", {
                key: 0,
                class: "fo-upg-create-box",
                onSubmit: M(oe, ["prevent"])
              }, [
                pe(e("input", {
                  "onUpdate:modelValue": d[3] || (d[3] = (b) => $.value = b),
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
                    onClick: ie
                  }, "取消"),
                  d[23] || (d[23] = e("button", {
                    class: "confirm",
                    type: "submit"
                  }, "确定", -1))
                ])
              ], 32)) : _("", !0),
              (o(!0), s(V, null, j(n(m).groups, (b) => (o(), s(V, {
                key: b.id
              }, [
                e("div", {
                  class: B(["fo-upg-group-item", { on: b.id === n(m).activeGroupId, "is-subgroup": b.depth > 0 }]),
                  style: Me({ paddingLeft: `${8 + b.depth * 18}px` }),
                  draggable: "true",
                  onDragstart: (z) => se(z, b.id),
                  onDragover: d[7] || (d[7] = M(() => {
                  }, ["prevent"])),
                  onDrop: M((z) => ne(z, b.id), ["prevent"]),
                  onClick: (z) => n(m).activeGroupId = b.id
                }, [
                  f.value === b.id ? (o(), s(V, { key: 0 }, [
                    pe(e("input", {
                      "onUpdate:modelValue": d[4] || (d[4] = (z) => T.value = z),
                      class: "fo-upg-rename-input",
                      maxlength: "20",
                      onClick: d[5] || (d[5] = M(() => {
                      }, ["stop"])),
                      onKeydown: Le(M(v, ["prevent"]), ["enter"])
                    }, null, 40, xs), [
                      [Te, T.value]
                    ]),
                    e("button", {
                      type: "button",
                      onClick: M(v, ["stop"])
                    }, "✓"),
                    e("button", {
                      type: "button",
                      onClick: d[6] || (d[6] = M((z) => f.value = "", ["stop"]))
                    }, "✕")
                  ], 64)) : (o(), s(V, { key: 1 }, [
                    b.depth ? (o(), s("span", Ss, "↳")) : (o(), s("i", Ts)),
                    e("span", Ms, l(b.name), 1),
                    e("small", null, l(b.upMids.length), 1),
                    e("span", Ds, [
                      e("button", {
                        type: "button",
                        title: "添加子分组",
                        onClick: M((z) => q(b.id), ["stop"])
                      }, "＋", 8, Ps),
                      e("button", {
                        type: "button",
                        title: "重命名",
                        onClick: M((z) => be(b), ["stop"])
                      }, "✎", 8, Es),
                      e("button", {
                        type: "button",
                        class: "danger",
                        title: "删除",
                        onClick: M((z) => n($e).dispatch("delete-group", b.id), ["stop"])
                      }, "×", 8, Is)
                    ])
                  ], 64))
                ], 46, Cs),
                u.value === b.id ? (o(), s("form", {
                  key: 0,
                  class: "fo-upg-create-box",
                  style: Me({ marginLeft: `${18 + b.depth * 18}px` }),
                  onSubmit: M(oe, ["prevent"])
                }, [
                  pe(e("input", {
                    "onUpdate:modelValue": d[8] || (d[8] = (z) => $.value = z),
                    maxlength: "20",
                    placeholder: `输入「${b.name}」的子分组名称…`,
                    autofocus: ""
                  }, null, 8, Rs), [
                    [Te, $.value]
                  ]),
                  e("div", { class: "fo-upg-create-btns" }, [
                    e("button", {
                      type: "button",
                      class: "cancel",
                      onClick: ie
                    }, "取消"),
                    d[24] || (d[24] = e("button", {
                      class: "confirm",
                      type: "submit"
                    }, "确定", -1))
                  ])
                ], 36)) : _("", !0)
              ], 64))), 128)),
              !n(m).groups.length && !n(m).loading ? (o(), s("p", Ls, '暂无分组，请点击"＋ 新建"。')) : _("", !0)
            ])
          ]),
          e("section", zs, [
            e("div", Bs, [
              e("div", As, [
                e("h4", null, l(U.value ? `分组：「${U.value.name}」` : "请先选择或新建分组"), 1),
                U.value ? (o(), s("span", Ns, "（本组 " + l(U.value.upMids.length) + " 位 · 共 " + l(n(m).followings.length) + " 位关注 · 未分组 " + l(W.value) + " 位）", 1)) : _("", !0)
              ]),
              e("div", Vs, [
                e("div", Us, [
                  e("button", {
                    type: "button",
                    class: B(["fo-upg-filter-tab", { on: n(m).filter === "all" }]),
                    onClick: d[9] || (d[9] = (b) => n(m).filter = "all")
                  }, "全部关注", 2),
                  e("button", {
                    type: "button",
                    class: B(["fo-upg-filter-tab", { on: n(m).filter === "ingroup" }]),
                    onClick: d[10] || (d[10] = (b) => n(m).filter = "ingroup")
                  }, "本组已加", 2)
                ]),
                e("div", Gs, [
                  e("button", {
                    type: "button",
                    class: B(["fo-upg-batch-toggle", { on: P.value }]),
                    onClick: d[11] || (d[11] = (b) => P.value = !P.value)
                  }, l(P.value ? "退出批量" : "批量操作"), 3),
                  P.value && r.value.size > 0 ? (o(), s(V, { key: 0 }, [
                    e("span", Fs, "已选 " + l(r.value.size), 1),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action add",
                      disabled: !U.value,
                      onClick: H
                    }, "＋ 加入本组", 8, Os),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action remove",
                      disabled: !U.value,
                      onClick: J
                    }, "− 移出本组", 8, qs),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: ge
                    }, "全选当页"),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: d[12] || (d[12] = (b) => r.value.clear())
                    }, "清除")
                  ], 64)) : _("", !0)
                ]),
                n(m).filter === "all" ? (o(), s("label", {
                  key: 0,
                  class: B(["fo-upg-switch", { on: n(m).onlyUngrouped }])
                }, [
                  pe(e("input", {
                    "onUpdate:modelValue": d[13] || (d[13] = (b) => n(m).onlyUngrouped = b),
                    type: "checkbox"
                  }, null, 512), [
                    [Ct, n(m).onlyUngrouped]
                  ]),
                  d[25] || (d[25] = e("span", { class: "fo-upg-switch-track" }, [
                    e("span", { class: "fo-upg-switch-thumb" })
                  ], -1)),
                  d[26] || (d[26] = e("span", { class: "fo-upg-switch-text" }, "仅未分组 UP", -1))
                ], 2)) : _("", !0)
              ])
            ]),
            e("div", Hs, [
              e("div", Ys, [
                d[27] || (d[27] = e("span", null, "🔍", -1)),
                pe(e("input", {
                  "onUpdate:modelValue": d[14] || (d[14] = (b) => n(m).query = b),
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
                onClick: d[15] || (d[15] = (b) => n($e).dispatch("refresh"))
              }, l(n(m).refreshing ? "刷新中…" : "↻ 刷新关注"), 9, Ws)
            ]),
            e("div", {
              ref_key: "listRef",
              ref: Q,
              class: "fo-upg-list"
            }, [
              n(m).loading ? (o(), s("div", Xs, [...d[28] || (d[28] = [
                e("i", null, null, -1),
                e("span", null, "正在加载关注的 UP 主列表…", -1)
              ])])) : n(m).error ? (o(), s("p", js, l(n(m).error), 1)) : U.value ? L.value.length ? (o(!0), s(V, { key: 4 }, j(L.value, (b) => (o(), s("article", {
                key: b.mid,
                class: B(["fo-upg-card", { selected: P.value && r.value.has(b.mid) }]),
                title: `右键查看「${b.name}」近期投稿`,
                onContextmenu: M((z) => R(z, b.mid), ["prevent"]),
                onClick: (z) => P.value ? g(b.mid) : void 0
              }, [
                e("img", {
                  src: b.face,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, Zs),
                e("div", en, [
                  e("div", tn, l(b.name), 1),
                  e("div", on, l(b.sign || "暂无签名"), 1)
                ]),
                P.value ? (o(), s("div", {
                  key: 1,
                  class: B(["fo-upg-batch-check", { checked: r.value.has(b.mid) }])
                }, l(r.value.has(b.mid) ? "✓" : ""), 3)) : (o(), s(V, { key: 0 }, [
                  b.groupIds.includes(n(m).activeGroupId) ? (o(), s("button", {
                    key: 0,
                    type: "button",
                    class: "fo-upg-toggle-btn in-group",
                    disabled: n(m).busyMid === b.mid,
                    onClick: M((z) => ue(b.mid), ["stop"])
                  }, l(n(m).busyMid === b.mid ? "处理中…" : `移出 ${U.value?.name || ""}`), 9, sn)) : b.groupIds.length > 0 ? (o(), s("div", nn, [
                    e("button", {
                      type: "button",
                      class: "fo-upg-toggle-btn belongs-other fo-upg-move-trigger",
                      disabled: n(m).busyMid === b.mid
                    }, l(n(m).busyMid === b.mid ? "处理中…" : `📁 ${b.groupName || "已分组"}`), 9, ln),
                    e("div", an, [
                      d[30] || (d[30] = e("div", { class: "fo-upg-move-title" }, "移动到分组", -1)),
                      (o(!0), s(V, null, j(n(m).groups, (z) => (o(), s("button", {
                        key: z.id,
                        type: "button",
                        class: B(["fo-upg-move-item", { active: b.groupIds.includes(z.id) }]),
                        disabled: n(m).busyMid === b.mid,
                        onClick: M((re) => le(b.mid, z.id), ["stop"])
                      }, [
                        d[29] || (d[29] = e("i", { class: "fo-folder-icon small" }, null, -1)),
                        e("span", null, l(z.name), 1),
                        b.groupIds.includes(z.id) ? (o(), s("small", dn, "✓ 已加入")) : _("", !0)
                      ], 10, rn))), 128)),
                      n(m).groups.length ? _("", !0) : (o(), s("p", un, "暂无分组"))
                    ])
                  ])) : n(m).activeGroupId ? (o(), s("button", {
                    key: 2,
                    type: "button",
                    class: "fo-upg-toggle-btn",
                    disabled: n(m).busyMid === b.mid,
                    onClick: M((z) => ue(b.mid), ["stop"])
                  }, l(n(m).busyMid === b.mid ? "处理中…" : "＋ 加入"), 9, cn)) : _("", !0)
                ], 64))
              ], 42, Js))), 128)) : (o(), s("p", Qs, "没有符合条件的 UP 主。")) : (o(), s("p", Ks, "请先新建或选择一个分组。"))
            ], 512),
            e("div", pn, [
              e("div", bn, "共 " + l(Z.value.length) + " 位 UP 主 · 每页 " + l(n(m).pageSize) + " 位", 1),
              Y.value > 1 ? (o(), s("div", vn, [
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page <= 1,
                  onClick: d[16] || (d[16] = (b) => E(1))
                }, "« 首页", 8, fn),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page <= 1,
                  onClick: d[17] || (d[17] = (b) => E(n(m).page - 1))
                }, "‹ 上一页", 8, gn),
                e("span", mn, l(n(m).page) + " / " + l(Y.value), 1),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page >= Y.value,
                  onClick: d[18] || (d[18] = (b) => E(n(m).page + 1))
                }, "下一页 ›", 8, hn),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(m).page >= Y.value,
                  onClick: d[19] || (d[19] = (b) => E(Y.value))
                }, "末页 »", 8, yn)
              ])) : _("", !0)
            ])
          ])
        ])
      ])
    ], 544)) : _("", !0);
  }
}), kn = /* @__PURE__ */ Ee(_n, [["__scopeId", "data-v-f738263e"]]), bt = {
  phase: "idle",
  isSeriesPickerOpen: !1,
  insertedTitle: ""
};
class $n {
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
  subscribe(u) {
    return this._listeners.add(u), () => {
      this._listeners.delete(u);
    };
  }
  _setState(u) {
    this._state = u;
    for (const $ of this._listeners)
      $(u);
  }
  send(u) {
    const $ = this._state;
    switch (u.type) {
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
          insertedTitle: u.title
        }), !0;
      case "FINISH_INSERT":
        return $.phase === "inserting" ? (this._setState({
          phase: "idle",
          isSeriesPickerOpen: !1,
          insertedTitle: ""
        }), !0) : !1;
      case "TOGGLE_SERIES_PICKER": {
        if ($.phase === "collapsed" || $.phase === "inserting") return !1;
        const f = u.open !== void 0 ? u.open : !$.isSeriesPickerOpen;
        return this._setState({
          ...$,
          isSeriesPickerOpen: f
        }), !0;
      }
      case "TOGGLE_COLLAPSE": {
        const f = u.collapsed !== void 0 ? u.collapsed : $.phase !== "collapsed";
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
const wn = ["title"], Cn = { class: "tape-capsule-text" }, xn = { class: "capsule-title" }, Sn = { class: "capsule-sub" }, Tn = ["title"], Mn = { class: "tape-deck-drop-slot" }, Dn = {
  key: 1,
  class: "tape-insert-feedback-chip"
}, Pn = { class: "tape-loaded-title" }, En = { class: "tape-body-content" }, In = ["title", "onKeydown"], Rn = { class: "tape-cassette" }, Ln = { class: "tape-center-label" }, zn = { class: "tape-sticker-head" }, Bn = ["title"], An = ["src"], Nn = { class: "tape-badge-row" }, Vn = { class: "tape-brand-text" }, Un = { class: "tape-series-header" }, Gn = { class: "tape-series-title-group" }, Fn = { class: "tape-series-count-pill" }, On = { class: "tape-series-list-scroll" }, qn = ["onClick"], Hn = { class: "tape-series-item-left" }, Yn = { class: "tape-series-item-info" }, Wn = ["title"], Xn = { class: "tape-series-item-count" }, jn = {
  key: 0,
  class: "tape-series-playing-tag"
}, Kn = {
  key: 1,
  class: "tape-series-play-action"
}, Qn = {
  key: 0,
  class: "tape-series-empty"
}, Jn = {
  class: "tape-transport-controls",
  role: "group",
  "aria-label": "电台播放控制"
}, Zn = ["title", "aria-label"], el = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, tl = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, il = { class: "tape-playback-section" }, ol = { class: "tape-time-lyric-row" }, sl = { class: "tape-timestamp" }, nl = { class: "tape-lyric-container" }, ll = ["title"], al = ["title", "aria-label"], rl = {
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
}, ul = {
  key: 2,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, cl = ["aria-valuenow"], pl = {
  class: "tape-waveform-row",
  "aria-hidden": "true"
}, bl = {
  class: "tape-waveform-svg",
  viewBox: "0 0 160 16",
  preserveAspectRatio: "none"
}, vl = ["x", "y", "height"], fl = /* @__PURE__ */ De({
  __name: "BiliRadioTapePlayer",
  props: {
    dockSide: { type: Boolean, default: !1 }
  },
  setup(fe) {
    const u = fe, $ = [
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
    ], f = D(!1), T = D(null), x = new $n(), P = te(() => x.isDragOver), r = te(() => x.isInserting), k = te(() => x.insertedTitle), w = te(() => x.isCollapsed), U = te(() => x.isSeriesPickerOpen);
    function Z(R) {
      R.stopPropagation(), x.send({ type: "TOGGLE_SERIES_PICKER" }), x.isSeriesPickerOpen && it.init();
    }
    async function Y(R) {
      x.send({ type: "TOGGLE_SERIES_PICKER", open: !1 }), await it.playSeries(R, 0);
    }
    function L(R) {
      if (!U.value) return;
      const g = R.target;
      !g?.closest(".tape-series-popover") && !g?.closest(".tape-cassette-wrap") && x.send({ type: "TOGGLE_SERIES_PICKER", open: !1 });
    }
    function W(R) {
      R.key === "Escape" && U.value && x.send({ type: "TOGGLE_SERIES_PICKER", open: !1 });
    }
    const Q = te(() => X.mode === "one" ? "单曲循环" : X.mode === "shuffle" ? "乱序播放" : "顺序播放"), O = D(380);
    function E() {
      if (typeof document > "u" || !u.dockSide) return;
      const R = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock"), g = 20, H = 16;
      if (R) {
        const ge = R.getBoundingClientRect();
        if (ge.left > 80) {
          const y = Math.floor(ge.left - g - H);
          if (y > 220) {
            O.value = y;
            return;
          }
        }
      }
      const J = typeof window < "u" ? window.innerWidth : 1280;
      O.value = Math.max(220, Math.floor(J / 2 - 230));
    }
    let q = null;
    function ie() {
      clearTimeout(q), q = setTimeout(E, 60);
    }
    He(() => {
      if (it.init(), typeof window < "u" && (window.addEventListener("pointerdown", L), window.addEventListener("keydown", W)), u.dockSide) {
        E(), window.addEventListener("resize", ie);
        const R = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
        if (R && typeof ResizeObserver < "u") {
          const g = new ResizeObserver(() => E());
          g.observe(R), R.__bili_dock_ro = g;
        }
      }
    }), ft(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", L), window.removeEventListener("keydown", W), window.removeEventListener("resize", ie));
      const R = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
      R && R.__bili_dock_ro && (R.__bili_dock_ro.disconnect(), delete R.__bili_dock_ro);
    });
    function oe(R) {
      R.preventDefault(), x.send({ type: "DRAG_ENTER" });
    }
    function be(R) {
      R.preventDefault(), R.dataTransfer && (R.dataTransfer.dropEffect = "copy"), x.send({ type: "DRAG_ENTER" });
    }
    function v(R) {
      const g = R.currentTarget, H = R.relatedTarget;
      (!H || !g.contains(H)) && x.send({ type: "DRAG_LEAVE" });
    }
    function se(R) {
      R.preventDefault(), x.send({ type: "DRAG_LEAVE" });
      const g = R.dataTransfer;
      if (!g) return;
      let H = g.getData("application/x-bili-cassette") || g.getData("application/json"), J = null;
      if (H)
        try {
          J = JSON.parse(H);
        } catch {
        }
      if (!J?.bvid) {
        const y = (g.getData("text/plain") || g.getData("text/uri-list") || g.getData("application/x-logicweaver-video-url"))?.match(/BV[0-9a-zA-Z]+/);
        y && (J = {
          bvid: y[0],
          title: "放入的单曲卡带",
          cover: "",
          author: "Bilibili",
          duration: 0
        });
      }
      J?.bvid && (x.send({ type: "START_INSERT", title: J.title || J.bvid }), setTimeout(() => {
        Be.insertAndPlay(J);
      }, 280), setTimeout(() => {
        x.send({ type: "FINISH_INSERT" });
      }, 1500));
    }
    function ne(R) {
      if (T.value) {
        f.value = !0;
        try {
          R.currentTarget?.setPointerCapture?.(R.pointerId);
        } catch {
        }
        ue(R);
      }
    }
    function ee(R) {
      f.value && ue(R);
    }
    function le(R) {
      if (f.value) {
        ue(R), f.value = !1;
        try {
          R.currentTarget?.releasePointerCapture?.(R.pointerId);
        } catch {
        }
      }
    }
    function ue(R) {
      if (!T.value) return;
      const g = T.value.getBoundingClientRect();
      if (g.width <= 0) return;
      const H = R.clientX - g.left, J = Math.max(0, Math.min(100, H / g.width * 100));
      Be.seek(J);
    }
    return (R, g) => (o(), s("div", {
      class: B(["bili-tape-deck", {
        "is-playing": n(X).playing,
        "is-drag-over": P.value,
        "is-inserting": r.value,
        "dock-side-mode": u.dockSide,
        "dock-side-collapsed": u.dockSide && w.value
      }]),
      style: Me(u.dockSide && !w.value ? { maxWidth: `${O.value}px` } : void 0),
      onDragenter: oe,
      onDragover: be,
      onDragleave: v,
      onDrop: se
    }, [
      u.dockSide && w.value ? (o(), s("div", {
        key: 0,
        class: "tape-collapsed-capsule",
        title: `电台：${n(X).title || "哔哩哔哩电台"}`
      }, [
        e("div", {
          class: B(["tape-capsule-spool", { spinning: n(X).playing }])
        }, [...g[9] || (g[9] = [
          e("div", { class: "spool-center-dot" }, null, -1)
        ])], 2),
        e("div", Cn, [
          e("strong", xn, l(n(X).title || "B站电台"), 1),
          e("small", Sn, l(n(X).playing ? "♪ 播放中" : "已暂停"), 1)
        ]),
        e("button", {
          type: "button",
          class: "tape-capsule-play-btn",
          title: n(X).playing ? "暂停" : "播放",
          onClick: g[0] || (g[0] = M((H) => n(Be).togglePlay(), ["stop"]))
        }, l(n(X).playing ? "⏸" : "▶"), 9, Tn),
        e("button", {
          type: "button",
          class: "tape-capsule-expand-btn",
          title: "展开完整磁带播放条",
          onClick: g[1] || (g[1] = M((H) => n(x).send({ type: "TOGGLE_COLLAPSE", collapsed: !1 }), ["stop"]))
        }, " ↗ ")
      ], 8, wn)) : _("", !0),
      pe(e("div", Mn, [...g[10] || (g[10] = [
        tt('<div class="slot-visual-frame" data-v-682b6ee8><span class="slot-icon-tape" data-v-682b6ee8>📼</span><div class="slot-text-col" data-v-682b6ee8><strong class="slot-headline" data-v-682b6ee8>释放鼠标装填卡带</strong><small class="slot-subline" data-v-682b6ee8>拖入视频封面 · 立即播放音乐</small></div></div>', 1)
      ])], 512), [
        [lt, P.value]
      ]),
      r.value ? (o(), s("div", Dn, [
        g[11] || (g[11] = e("span", { class: "tape-click-sound" }, "✓ 已装填", -1)),
        e("span", Pn, "《" + l(k.value) + "》", 1)
      ])) : _("", !0),
      pe(e("div", En, [
        e("div", {
          class: "tape-cassette-wrap",
          role: "button",
          tabindex: "0",
          title: `点击选择电台系列 (已建 ${n(I).radioSeries.length} 个系列 · 也可直接拖拽视频封面至此装填)`,
          onClick: Z,
          onKeydown: Le(M(Z, ["prevent"]), ["enter", "space"])
        }, [
          e("div", Rn, [
            g[14] || (g[14] = e("div", { class: "tape-spool tape-spool-left" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1)),
            e("div", Ln, [
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
                  }, null, 8, An)
                ], 8, Bn)) : _("", !0),
                e("div", Nn, [
                  g[12] || (g[12] = e("span", { class: "side-letter" }, "A", -1)),
                  e("span", Vn, l(n(X).seriesName || "CASSETTE"), 1)
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
          U.value ? (o(), s("div", {
            key: 0,
            class: "tape-series-popover",
            onClick: g[3] || (g[3] = M(() => {
            }, ["stop"]))
          }, [
            e("div", Un, [
              e("div", Gn, [
                g[16] || (g[16] = e("span", { class: "tape-series-icon" }, "📻", -1)),
                g[17] || (g[17] = e("span", { class: "tape-series-title" }, "自建电台系列", -1)),
                e("span", Fn, l(n(I).radioSeries.length), 1)
              ]),
              e("button", {
                type: "button",
                class: "tape-series-close-btn",
                title: "关闭",
                "aria-label": "关闭",
                onClick: g[2] || (g[2] = M((H) => U.value = !1, ["stop"]))
              }, " ✕ ")
            ]),
            e("div", On, [
              (o(!0), s(V, null, j(n(I).radioSeries, (H) => (o(), s("div", {
                key: H.id,
                class: B(["tape-series-item", { "is-active": n(X).seriesName === H.name }]),
                onClick: M((J) => Y(H.id), ["stop"])
              }, [
                e("div", Hn, [
                  g[18] || (g[18] = e("span", { class: "tape-series-item-bullet" }, "📼", -1)),
                  e("div", Yn, [
                    e("span", {
                      class: "tape-series-item-name",
                      title: H.name
                    }, l(H.name), 9, Wn),
                    e("span", Xn, l(H.count) + " 首曲目 · 顺序连播", 1)
                  ])
                ]),
                n(X).seriesName === H.name && n(X).playing ? (o(), s("span", jn, " 播放中 ")) : (o(), s("span", Kn, " ▶ "))
              ], 10, qn))), 128)),
              n(I).radioSeries.length ? _("", !0) : (o(), s("div", Qn, [...g[19] || (g[19] = [
                e("span", { class: "empty-icon" }, "📂", -1),
                e("span", { class: "empty-text" }, "暂无保存的电台系列", -1),
                e("span", { class: "empty-tip" }, "可在 B站工作区 → 电台 中添加曲目并保存为系列", -1)
              ])]))
            ])
          ])) : _("", !0)
        ], 40, In),
        e("div", Jn, [
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "上一首",
            "aria-label": "上一首",
            onClick: g[4] || (g[4] = (H) => n(Be).prev())
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
            class: B(["tape-ctrl-btn tape-ctrl-play", { playing: n(X).playing }]),
            title: n(X).playing ? "暂停播放" : "开始播放",
            "aria-label": n(X).playing ? "暂停" : "播放",
            onClick: g[5] || (g[5] = (H) => n(Be).togglePlay())
          }, [
            n(X).playing ? (o(), s("svg", el, [...g[21] || (g[21] = [
              e("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" }, null, -1)
            ])])) : (o(), s("svg", tl, [...g[22] || (g[22] = [
              e("path", { d: "M8 5v14l11-7z" }, null, -1)
            ])]))
          ], 10, Zn),
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "下一首",
            "aria-label": "下一首",
            onClick: g[6] || (g[6] = (H) => n(Be).next())
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
        e("div", il, [
          e("div", ol, [
            e("span", sl, l(n(X).formattedCurrent) + " / " + l(n(X).formattedDuration), 1),
            e("div", nl, [
              e("span", {
                class: "tape-lyric-text",
                title: n(X).lyric
              }, l(n(X).lyric || "♪ 纯音乐 / 伴奏"), 9, ll)
            ]),
            e("button", {
              type: "button",
              class: "tape-mode-btn",
              title: Q.value,
              "aria-label": Q.value,
              onClick: g[7] || (g[7] = (H) => n(Be).toggleMode())
            }, [
              n(X).mode === "order" ? (o(), s("svg", rl, [...g[24] || (g[24] = [
                e("polyline", { points: "17 1 21 5 17 9" }, null, -1),
                e("path", { d: "M3 11V9a4 4 0 0 1 4-4h14" }, null, -1),
                e("polyline", { points: "7 23 3 19 7 15" }, null, -1),
                e("path", { d: "M21 13v2a4 4 0 0 1-4 4H3" }, null, -1)
              ])])) : n(X).mode === "one" ? (o(), s("svg", dl, [...g[25] || (g[25] = [
                tt('<polyline points="17 1 21 5 17 9" data-v-682b6ee8></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14" data-v-682b6ee8></path><polyline points="7 23 3 19 7 15" data-v-682b6ee8></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3" data-v-682b6ee8></path><text x="12" y="14.5" font-size="7.5" font-weight="900" font-family="system-ui, -apple-system, sans-serif" fill="currentColor" stroke="none" text-anchor="middle" data-v-682b6ee8>1</text>', 5)
              ])])) : n(X).mode === "shuffle" ? (o(), s("svg", ul, [...g[26] || (g[26] = [
                tt('<polyline points="16 3 21 3 21 8" data-v-682b6ee8></polyline><line x1="4" y1="20" x2="21" y2="3" data-v-682b6ee8></line><polyline points="21 16 21 21 16 21" data-v-682b6ee8></polyline><line x1="15" y1="15" x2="21" y2="21" data-v-682b6ee8></line><line x1="4" y1="4" x2="9" y2="9" data-v-682b6ee8></line>', 5)
              ])])) : _("", !0)
            ], 8, al)
          ]),
          e("div", {
            ref_key: "progressLineRef",
            ref: T,
            class: "tape-progress-rail",
            role: "slider",
            "aria-valuenow": n(X).progressPercent,
            "aria-valuemin": "0",
            "aria-valuemax": "100",
            "aria-label": "电台播放进度",
            onPointerdown: ne,
            onPointermove: ee,
            onPointerup: le,
            onPointercancel: le
          }, [
            e("div", {
              class: "tape-progress-fill",
              style: Me({ width: `${n(X).progressPercent}%` })
            }, null, 4),
            e("div", {
              class: "tape-progress-handle",
              style: Me({ left: `${n(X).progressPercent}%` })
            }, null, 4)
          ], 40, cl),
          e("div", pl, [
            (o(), s("svg", bl, [
              (o(), s(V, null, j($, (H, J) => e("rect", {
                key: J,
                class: "wave-bar",
                x: J * 4,
                y: 16 - H * 0.7,
                width: "1.8",
                height: H * 0.7,
                rx: "0.9",
                style: Me({ animationDelay: `${J % 8 * 0.12}s` })
              }, null, 12, vl)), 64))
            ]))
          ])
        ]),
        u.dockSide ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "tape-dock-collapse-btn",
          title: "收起至左下角小胶囊",
          "aria-label": "收起磁带机",
          onClick: g[8] || (g[8] = M((H) => n(x).send({ type: "TOGGLE_COLLAPSE", collapsed: !0 }), ["stop"]))
        }, [...g[27] || (g[27] = [
          e("svg", {
            viewBox: "0 0 24 24",
            width: "11",
            height: "11",
            fill: "currentColor"
          }, [
            e("path", { d: "M19 13H5v-2h14v2z" })
          ], -1)
        ])])) : _("", !0)
      ], 512), [
        [lt, !u.dockSide || !w.value]
      ])
    ], 38));
  }
}), vt = /* @__PURE__ */ Ee(fl, [["__scopeId", "data-v-682b6ee8"]]), gl = ["title"], ml = ["title"], hl = {
  key: 2,
  class: "hero-lyric-body"
}, yl = ["title"], _l = /* @__PURE__ */ De({
  __name: "BiliVideoLyricDockBar",
  props: {
    inlineHero: { type: Boolean, default: !1 }
  },
  setup(fe) {
    const u = D(340), $ = D(!1), f = D(!1), T = D(!1), x = D(null), P = D(null), r = te(() => !(!ce.isOpen || !ce.bvid && !ce.videoSrc));
    ve(() => ce.isOpen, (O) => {
      O || (I.organizer.heroLyricText = "");
    });
    function k(O) {
      const E = document.querySelector(".bili-mini-screen video, .bili-sub-screen video");
      E && (E.currentTime = Math.max(0, E.currentTime + O));
    }
    function w(O) {
      if (O.target?.closest("button, .lyric-resize-handle, input, a") || !P.value) return;
      T.value = !0;
      const q = P.value.getBoundingClientRect(), ie = x.value ? x.value.x : q.left, oe = x.value ? x.value.y : q.top, be = O.clientX, v = O.clientY;
      let se = ie, ne = oe;
      const ee = (ue) => {
        if (!T.value) return;
        const R = ue.clientX - be, g = ue.clientY - v, H = P.value?.offsetWidth || u.value, J = P.value?.offsetHeight || 32, ge = 8, y = Math.max(ge, window.innerWidth - H - 8), d = 8, b = Math.max(d, window.innerHeight - J - 8);
        se = Math.min(y, Math.max(ge, ie + R)), ne = Math.min(b, Math.max(d, oe + g)), x.value = { x: se, y: ne };
      }, le = () => {
        T.value = !1, window.removeEventListener("pointermove", ee), window.removeEventListener("pointerup", le), window.removeEventListener("pointercancel", le);
        try {
          x.value && localStorage.setItem("bili_hero_lyric_pos", JSON.stringify(x.value));
        } catch {
        }
      };
      window.addEventListener("pointermove", ee), window.addEventListener("pointerup", le), window.addEventListener("pointercancel", le);
    }
    function U() {
      x.value = null;
      try {
        localStorage.removeItem("bili_hero_lyric_pos");
      } catch {
      }
    }
    const Z = te(() => {
      const O = {};
      return f.value || (O.width = `${u.value}px`), O.position = "fixed", O.zIndex = "1000", x.value ? (O.left = `${x.value.x}px`, O.top = `${x.value.y}px`, O.margin = "0", O.transform = "none") : (O.left = "50%", O.bottom = "24px", O.transform = "translateX(-50%)"), O;
    });
    let Y = 0, L = 0, W = "right";
    function Q(O, E) {
      E.preventDefault(), E.stopPropagation(), $.value = !0, W = O, Y = E.clientX, L = u.value;
      const q = (oe) => {
        if (!$.value) return;
        const be = oe.clientX - Y, v = W === "right" ? L + be : L - be, se = Math.max(180, Math.min(720, v));
        u.value = se;
      }, ie = () => {
        $.value = !1, window.removeEventListener("pointermove", q), window.removeEventListener("pointerup", ie), window.removeEventListener("pointercancel", ie);
        try {
          localStorage.setItem("bili_hero_lyric_width", String(u.value));
        } catch {
        }
      };
      window.addEventListener("pointermove", q), window.addEventListener("pointerup", ie), window.addEventListener("pointercancel", ie);
    }
    return He(() => {
      try {
        const O = localStorage.getItem("bili_hero_lyric_width");
        if (O) {
          const q = parseInt(O, 10);
          Number.isFinite(q) && q >= 180 && q <= 720 && (u.value = q);
        }
        const E = localStorage.getItem("bili_hero_lyric_pos");
        if (E) {
          const q = JSON.parse(E);
          if (typeof q?.x == "number" && typeof q?.y == "number") {
            const ie = Math.min(window.innerWidth - 100, Math.max(8, q.x)), oe = Math.min(window.innerHeight - 40, Math.max(8, q.y));
            x.value = { x: ie, y: oe };
          }
        }
      } catch {
      }
    }), (O, E) => r.value ? (o(), s("aside", {
      key: 0,
      ref_key: "barRef",
      ref: P,
      class: B(["bili-hero-lyric-bar", { "is-collapsed": f.value, "is-resizing": $.value, "is-dragging": T.value, "is-floating": !!x.value }]),
      style: Me(Z.value),
      title: x.value ? "按住可拖动位置；双击还原到默认位置" : "按住可自由拖动位置",
      "aria-label": "视频实时字幕与控制",
      onPointerdown: w,
      onDblclick: U
    }, [
      f.value ? _("", !0) : (o(), s("div", {
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
      ], 8, ml)) : (o(), s("div", hl, [
        e("button", {
          type: "button",
          class: "hero-lyric-seek-btn",
          title: "当前视频后退 5 秒",
          "aria-label": "后退 5 秒",
          onClick: E[3] || (E[3] = (q) => k(-5))
        }, " ‹ "),
        e("strong", {
          class: "hero-lyric-current-text",
          title: n(I).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"
        }, l(n(I).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"), 9, yl),
        e("button", {
          type: "button",
          class: "hero-lyric-seek-btn",
          title: "当前视频前进 5 秒",
          "aria-label": "前进 5 秒",
          onClick: E[4] || (E[4] = (q) => k(5))
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
      f.value ? _("", !0) : (o(), s("div", {
        key: 3,
        class: "lyric-resize-handle handle-right",
        title: "按住向右拉伸宽度",
        onPointerdown: E[6] || (E[6] = (q) => Q("right", q))
      }, null, 32))
    ], 46, gl)) : _("", !0);
  }
}), kl = /* @__PURE__ */ Ee(_l, [["__scopeId", "data-v-8f47943e"]]), $l = {
  class: "fm-pane",
  id: "pane-organizer"
}, wl = { id: "fo-body" }, Cl = { class: "fo-bili-sidebar" }, xl = ["title"], Sl = { class: "fo-sidebar-toggle-title" }, Tl = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Ml = ["aria-expanded", "title"], Dl = { class: "fo-sidebar-toggle-chevron" }, Pl = { class: "fo-sidebar-features-wrap" }, El = { class: "fo-sidebar-sub-wrap" }, Il = ["title"], Rl = { class: "fo-sidebar-sub-main" }, Ll = { class: "fo-sidebar-sub-text" }, zl = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Bl = ["title"], Al = { class: "fo-sidebar-sub-main" }, Nl = { class: "fo-sidebar-sub-text" }, Vl = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Ul = ["title"], Gl = { class: "fo-sidebar-sub-main" }, Fl = { class: "fo-sidebar-sub-text" }, Ol = { class: "fo-sidebar-sub-wrap fo-sidebar-recommend-wrap" }, ql = ["title"], Hl = { class: "fo-sidebar-sub-main" }, Yl = { class: "fo-sidebar-sub-text" }, Wl = { class: "fo-sidebar-sub-wrap fo-sidebar-radio-wrap" }, Xl = ["title"], jl = { class: "fo-sidebar-sub-main" }, Kl = { class: "fo-sidebar-sub-text" }, Ql = { class: "fo-sidebar-favorite-hub" }, Jl = { class: "fo-sidebar-sub-main" }, Zl = { class: "fo-sidebar-sub-text" }, ea = ["title", "aria-label"], ta = {
  key: 0,
  class: "fo-move-target-banner"
}, ia = {
  class: "fo-bili-folder-list",
  "aria-label": "B站收藏夹"
}, oa = {
  key: 0,
  class: "fo-bili-section-divider"
}, sa = ["onDragover", "onDragleave", "onDrop"], na = { class: "fo-bili-section-title" }, la = ["data-folder-id", "data-folder-kind", "draggable", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], aa = ["aria-expanded", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], ra = {
  class: "fo-group-caret",
  "aria-hidden": "true"
}, da = {
  key: 0,
  class: "muted small"
}, ua = {
  key: 0,
  id: "fo-vue-main",
  class: "fo-bili-main"
}, ca = {
  key: 0,
  class: "fo-bili-loading"
}, pa = {
  key: 1,
  class: "fo-bili-empty fo-bili-login-guide"
}, ba = { class: "fo-bili-login-card" }, va = { class: "fo-bili-login-actions" }, fa = {
  key: 2,
  class: "fo-bili-empty"
}, ga = { class: "fo-bili-hero fo-hero-persistent" }, ma = { class: "fo-hero-left" }, ha = ["src"], ya = {
  key: 1,
  class: "fo-folder-icon"
}, _a = { class: "fo-hero-folder-info" }, ka = ["placeholder", "aria-label"], $a = ["title"], wa = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, Ca = { class: "card-fullscreen-bili-suggest-head" }, xa = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, Sa = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, Ta = ["onClick", "onContextmenu"], Ma = { class: "card-fullscreen-bili-thumb" }, Da = ["src"], Pa = { key: 0 }, Ea = { class: "card-fullscreen-bili-video-copy" }, Ia = { class: "fo-bili-actions" }, Ra = ["title"], La = { class: "bili-header-msg-label" }, za = ["title"], Ba = ["disabled"], Aa = ["title"], Na = { class: "fo-bili-toolbar" }, Va = {
  key: 0,
  class: "fo-bili-sort"
}, Ua = ["onClick"], Ga = {
  class: "fo-mini-dock-anchor",
  "aria-label": "视频标签页"
}, Fa = ["title"], Oa = { class: "fo-video-tab-title" }, qa = { class: "fo-video-tab-actions" }, Ha = ["title"], Ya = {
  key: 2,
  class: "fo-bili-batch-actions"
}, Wa = { class: "fo-batch-count" }, Xa = { class: "fo-bili-grid" }, ja = {
  key: 0,
  class: "fo-bili-empty"
}, Ka = ["data-batch-id", "onDragstart", "onContextmenu"], Qa = { class: "fo-bili-thumb" }, Ja = {
  key: 0,
  class: "fo-batch-check",
  title: "选择此视频"
}, Za = ["checked", "onChange"], er = ["href", "onClick"], tr = ["src"], ir = { class: "fo-bili-count" }, or = { class: "fo-bili-duration" }, sr = { class: "fo-bili-title-row" }, nr = ["href", "onClick"], lr = ["aria-expanded", "onClick"], ar = {
  key: 0,
  class: "fo-card-menu"
}, rr = ["onClick"], dr = ["onClick"], ur = ["onClick"], cr = { class: "fo-bili-meta" }, pr = ["onClick"], br = {
  key: 0,
  class: "fo-pager"
}, vr = ["disabled"], fr = { class: "fo-page-num" }, gr = ["disabled"], mr = {
  key: 1,
  id: "fo-vue-cache-main",
  class: "fo-bili-main"
}, hr = { class: "fo-bili-hero fo-hero-persistent fo-cached-hero" }, yr = { class: "fo-hero-left" }, _r = { class: "fo-hero-folder-info" }, kr = { class: "fo-bili-actions" }, $r = {
  key: 0,
  class: "fo-bili-loading"
}, wr = {
  key: 1,
  class: "fo-bili-grid fo-cached-video-grid"
}, Cr = {
  key: 0,
  class: "fo-bili-empty"
}, xr = { class: "fo-bili-thumb" }, Sr = ["onClick"], Tr = ["src"], Mr = { class: "fo-bili-title-row" }, Dr = ["onClick"], Pr = ["onClick"], Er = { class: "fo-bili-meta" }, Ir = {
  key: 2,
  id: "fo-vue-recommend-main",
  class: "fo-bili-main"
}, Rr = { class: "fo-bili-hero" }, Lr = { class: "fo-bili-heading" }, zr = { class: "fo-feed-hero-title" }, Br = { class: "fo-feed-badge" }, Ar = { class: "fo-bili-actions" }, Nr = ["disabled"], Vr = { class: "fo-bili-toolbar" }, Ur = { class: "fo-feed-count-tag" }, Gr = {
  key: 0,
  class: "fo-bili-loading"
}, Fr = {
  key: 1,
  class: "fo-bili-empty"
}, Or = {
  key: 2,
  class: "fo-bili-grid"
}, qr = {
  key: 0,
  class: "fo-bili-empty"
}, Hr = ["onDragstart"], Yr = { class: "fo-bili-thumb" }, Wr = ["href", "onClick"], Xr = ["src"], jr = { class: "fo-bili-count" }, Kr = { class: "fo-bili-duration" }, Qr = { class: "fo-bili-title-row" }, Jr = ["href", "onClick"], Zr = ["aria-expanded", "onClick"], ed = {
  key: 0,
  class: "fo-card-menu"
}, td = ["onClick"], id = ["onClick"], od = ["onClick"], sd = ["onClick"], nd = ["onClick"], ld = { class: "fo-bili-meta" }, ad = ["onClick"], rd = {
  key: 3,
  id: "fo-vue-following-main",
  class: "fo-bili-main"
}, dd = { class: "fo-bili-hero" }, ud = { class: "fo-bili-heading" }, cd = { class: "fo-feed-hero-title" }, pd = { class: "fo-feed-badge" }, bd = { class: "fo-bili-actions" }, vd = ["disabled"], fd = { class: "fo-up-groups-bar" }, gd = { class: "fo-up-groups-list" }, md = ["onClick"], hd = { class: "count" }, yd = { class: "fo-up-groups-actions" }, _d = {
  key: 0,
  class: "fo-up-members-strip"
}, kd = { class: "fo-up-members-label" }, $d = { class: "fo-up-members-list" }, wd = ["title", "onClick", "onContextmenu"], Cd = ["src"], xd = { class: "fo-bili-toolbar" }, Sd = { class: "fo-feed-count-tag" }, Td = {
  key: 1,
  class: "fo-bili-loading"
}, Md = {
  key: 2,
  class: "fo-bili-empty"
}, Dd = {
  key: 3,
  class: "fo-bili-grid"
}, Pd = {
  key: 0,
  class: "fo-bili-empty"
}, Ed = ["onDragstart"], Id = { class: "fo-bili-thumb" }, Rd = ["href", "onClick"], Ld = ["src"], zd = { class: "fo-bili-count" }, Bd = { class: "fo-bili-duration" }, Ad = { class: "fo-bili-title-row" }, Nd = ["href", "onClick"], Vd = ["aria-expanded", "onClick"], Ud = {
  key: 0,
  class: "fo-card-menu"
}, Gd = ["onClick"], Fd = ["onClick"], Od = ["onClick"], qd = ["onClick"], Hd = { class: "fo-bili-meta" }, Yd = ["onClick"], Wd = { class: "fo-pager" }, Xd = ["disabled"], jd = { class: "fo-page-num" }, Kd = ["disabled"], Qd = {
  key: 4,
  id: "fo-vue-subscription-main",
  class: "fo-bili-main fo-vue-subscription-main"
}, Jd = { class: "bili-sub-vue-shell" }, Zd = {
  key: 0,
  class: "fo-bili-loading"
}, eu = {
  key: 1,
  class: "fo-bili-empty"
}, tu = {
  key: 2,
  class: "bili-sub-layout bili-sub-vue-layout"
}, iu = {
  key: 5,
  id: "fo-vue-radio-main",
  class: "fo-bili-main fo-vue-radio-main"
}, ou = { class: "fo-bili-hero fo-radio-hero" }, su = { class: "fo-bili-actions" }, nu = { class: "bili-radio-layout fo-vue-radio-layout" }, lu = { class: "bili-radio-folders" }, au = { id: "bili-radio-folders" }, ru = ["onClick"], du = {
  key: 0,
  class: "muted small"
}, uu = { class: "bili-radio-library" }, cu = {
  key: 0,
  role: "alert",
  class: "muted small"
}, pu = {
  id: "bili-radio-videos",
  class: "bili-radio-videos"
}, bu = ["title", "onDragstart", "onClick"], vu = ["src"], fu = { key: 1 }, gu = {
  key: 0,
  class: "muted small"
}, mu = { class: "bili-radio-editor" }, hu = { class: "bili-radio-name-row" }, yu = ["placeholder", "onKeydown"], _u = { class: "bili-radio-btn-group" }, ku = { class: "bili-radio-series-dropdown-wrap" }, $u = {
  value: "",
  disabled: "",
  selected: ""
}, wu = ["value"], Cu = {
  id: "bili-radio-queue",
  class: "bili-radio-queue",
  "aria-label": "电台播放队列"
}, xu = ["onClick"], Su = { class: "bili-radio-queue-no" }, Tu = ["src"], Mu = { key: 1 }, Du = ["aria-label", "onClick"], Pu = {
  key: 0,
  class: "muted small"
}, Eu = { class: "bili-radio-actions" }, Iu = ["disabled"], Ru = ["disabled"], Lu = ["title"], zu = {
  key: 2,
  class: "fo-context-divider"
}, Bu = /* @__PURE__ */ De({
  __name: "BilibiliWorkspace",
  setup(fe) {
    const u = D(!1);
    function $() {
      const a = I.radioSeriesName?.trim();
      if (!a) {
        u.value = !0;
        const t = document.getElementById("bili-radio-name");
        t && t.focus(), je.fetch(A("bili.radioAppName"), A("bili.radioNameEmpty"));
        return;
      }
      u.value = !1, v("radio-save", { name: a });
    }
    async function f() {
      const a = document.getElementById("bili-radio-name");
      a && (a.focus(), a.select(), je.fetch(A("bili.radioAppName"), A("bili.radioInputFocused")));
    }
    function T(a) {
      const t = a.target, i = t.value;
      if (i) {
        if (i === "__create_new__") {
          v("radio-clear"), I.radioSeriesName = "", je.fetch("哔哩哔哩电台", "已开启新系列创作，请从左侧添加视频"), t.value = "";
          return;
        }
        v("radio-load-series", i);
      }
    }
    function x(a, t) {
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
    function P() {
      It.togglePanel();
    }
    const r = te(() => I.organizer), k = D(!1), { active: w } = Tt("daily-bilibili", "/bilibili.html");
    ve(() => w.value && r.value.mode === "recommendations", (a) => {
      Ae.setRecommendationsActive(a);
    }, { immediate: !0, flush: "sync" }), ve(() => w.value && r.value.mode === "following", (a) => {
      Ae.setFollowingActive(a);
    }, { immediate: !0, flush: "sync" }), ve(() => w.value && r.value.mode === "subscription", (a) => {
      Ae.setSubscriptionActive(a);
    }, { immediate: !0, flush: "sync" }), ve(() => w.value && r.value.mode === "cache", (a) => {
      a || (k.value = !1);
    });
    const U = D(r.value.query), Z = D(!1), Y = D(!1), L = D(""), W = D({ visible: !1, x: 0, y: 0, video: null, folder: null }), { menuRef: Q, style: O } = Lt({
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
    function ie() {
      ce.bvid && St.open({
        bvid: ce.bvid,
        cid: ce.cid,
        title: ce.title
      });
    }
    function oe() {
      ce.collapsed && Ke.toggleCollapse(), Ke.bringToFront();
    }
    function be() {
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
    const ne = D(""), ee = D(""), le = D("before"), ue = D(!1);
    function R(a, t) {
      t.kind === "created" && (ne.value = t.id, a.dataTransfer?.setData("application/x-logicweaver-favorite-node", t.id), a.dataTransfer?.setData("text/plain", t.id), a.dataTransfer && (a.dataTransfer.effectAllowed = "move"));
    }
    function g(a, t) {
      if (t.kind !== "created" || !ne.value || ne.value === t.id) return;
      a.preventDefault(), a.dataTransfer && (a.dataTransfer.dropEffect = "move");
      const i = a.currentTarget;
      if (!i) return;
      const c = i.getBoundingClientRect(), N = (a.clientY - c.top) / Math.max(1, c.height), xe = t.group && N > 0.25 && N < 0.75 ? "into" : N >= 0.5 ? "after" : "before";
      ee.value = t.id, le.value = xe;
    }
    function H(a, t) {
      const i = a.relatedTarget, c = a.currentTarget;
      c && i && c.contains(i) || ee.value === t.id && (ee.value = "");
    }
    function J() {
      ne.value = "", ee.value = "", ue.value = !1;
    }
    function ge(a, t) {
      a.preventDefault();
      const i = ne.value || a.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "", c = le.value || (t.group ? "into" : "after");
      J(), !(!i || i === t.id || t.kind !== "created") && v("move-folder-node", { sourceId: i, targetId: t.id, mode: c });
    }
    function y(a) {
      ne.value && (a.preventDefault(), a.dataTransfer && (a.dataTransfer.dropEffect = "move"), ue.value = !0);
    }
    function d(a) {
      const t = a.relatedTarget, i = a.currentTarget;
      i && t && i.contains(t) || (ue.value = !1);
    }
    function b(a) {
      a.preventDefault();
      const t = ne.value || a.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
      J(), t && v("move-folder-node", { sourceId: t, targetId: "root", mode: "into" });
    }
    function z() {
      const a = U.value.trim();
      v("organizer-search", a);
    }
    function re() {
      !U.value.trim() && r.value.query && v("organizer-search", "");
    }
    const me = D(""), Se = D(!1), Ce = D(!1), Pe = D("hot"), Ie = D(""), Ve = te(() => Pe.value === "live" ? A("bili.searchLiveTitle", { keyword: Ie.value }) : A("bili.searchSuggestTitle")), Ue = te(() => Pe.value === "live" ? A("bili.searchLiveSubtitle") : A("bili.searchSuggestSubtitle")), _e = D([]), ze = D(null), Fe = D([]);
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
    async function S() {
      if (Pe.value = "hot", Se.value = !0, Fe.value.length && Date.now() - C < 9e4) {
        _e.value = Fe.value;
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
        Fe.value = c, C = Date.now(), me.value.trim() || (_e.value = c);
      } catch {
        _e.value = [];
      } finally {
        Ce.value = !1;
      }
    }
    function F() {
      me.value.trim() ? K(me.value.trim()) : S();
    }
    function G() {
      const a = me.value.trim();
      if (clearTimeout(h), !a) {
        S();
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
        if (me.value.trim() !== a) return;
        const i = Array.isArray(t?.data?.result) ? t.data.result : [];
        _e.value = i.slice(0, 10).map(p).filter(Boolean);
      } catch {
        _e.value = [];
      } finally {
        Ce.value = !1;
      }
    }
    function de(a) {
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
      const a = me.value.trim();
      if (Se.value = !1, !a) {
        S();
        return;
      }
      window.open(`https://search.bilibili.com/video?keyword=${encodeURIComponent(a)}`, "_blank");
    }
    function Oe(a) {
      ze.value && !ze.value.contains(a.target) && (Se.value = !1);
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
    function ke(a) {
      if (a instanceof KeyboardEvent) {
        a.key === "Escape" && (L.value = "", W.value.visible = !1, r.value.isTargetPickMode && v("organizer-cancel-move-target"));
        return;
      }
      const t = a.target;
      t?.closest(".fo-card-menu, .fo-card-more") || (L.value = ""), t?.closest(".fo-context-menu") || (W.value.visible = !1);
    }
    const Ge = typeof document < "u" && document.body.classList.contains("bili-standalone-body");
    function at() {
      !Y.value || Z.value || r.value.loading || (Z.value = !0, v("organizer-open"));
    }
    ve(() => r.value.loading, (a) => {
      !a && !r.value.folders.length && at();
    }), He(() => {
      import("./bilibili-channel.service-lbhcjchy.js").catch((a) => console.error("[Bilibili] 频道动作服务加载失败", a)), Y.value = !0, Ne.loadOrganizer(), at(), document.addEventListener("pointerdown", ke, !0), document.addEventListener("pointerdown", Oe), window.addEventListener("keydown", ke), window.setBiliMiniDockVisible?.(!0), requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }), ve(() => [r.value.videos, r.value.mode], () => {
      requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }, { flush: "post" }), gt(() => {
      Ae.setRecommendationsActive(!1), Ae.setFollowingActive(!1), Ae.setSubscriptionActive(!1), Y.value = !1, document.removeEventListener("pointerdown", ke, !0), document.removeEventListener("pointerdown", Oe), window.removeEventListener("keydown", ke);
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
          const { chatService: c } = await import("./view-styles-NfYkuEdl.js").then((xe) => xe.aM), { windowManagerController: N } = await import("./window-manager.store-BdI_8a-H.js").then((xe) => xe.n);
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
      class: B(["card wide", { "card-fullscreen": n(Ge) || n(ot).activeId === "daily-bilibili" }])
    }, [
      e("div", $l, [
        e("div", wl, [
          e("div", {
            class: B(["fo-bili-layout", { "fo-picking-move-target": r.value.isTargetPickMode }]),
            "data-vue-organizer-shell": "true",
            onWheel: yt
          }, [
            e("aside", Cl, [
              e("div", {
                class: B(["fo-sidebar-toggle-bar", { "is-collapsed": E.value }]),
                title: E.value ? n(A)("bili.channel.expandTip") : n(A)("bili.channel.collapseTip"),
                onClick: q
              }, [
                e("div", Sl, [
                  t[51] || (t[51] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                  e("span", null, l(n(A)("bili.channel.title")), 1),
                  E.value ? (o(), s("span", Tl, "5")) : _("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "fo-sidebar-toggle-action",
                  "aria-expanded": !E.value,
                  title: E.value ? n(A)("bili.channel.expand") : n(A)("bili.channel.collapse")
                }, [
                  e("span", null, l(E.value ? n(A)("bili.channel.expand") : n(A)("bili.channel.collapse")), 1),
                  e("span", Dl, l(E.value ? "▾" : "▴"), 1)
                ], 8, Ml)
              ], 10, xl),
              pe(e("div", Pl, [
                e("div", El, [
                  e("button", {
                    id: "fo-sidebar-sub-btn",
                    type: "button",
                    class: B(["fo-sidebar-sub-btn", { on: r.value.mode === "subscription" }]),
                    title: n(A)("bili.channel.subVideoTip"),
                    onClick: t[0] || (t[0] = (i) => v("open-sub-video"))
                  }, [
                    e("div", Rl, [
                      t[52] || (t[52] = e("span", { class: "fo-sidebar-sub-icon" }, "🎬", -1)),
                      e("div", Ll, [
                        e("strong", null, l(n(A)("bili.channel.subVideo")), 1),
                        e("small", null, l(n(A)("bili.channel.subVideoSub")), 1)
                      ])
                    ]),
                    t[53] || (t[53] = e("span", { class: "fo-sidebar-sub-badge" }, "NEW", -1))
                  ], 10, Il)
                ]),
                e("div", zl, [
                  e("button", {
                    id: "fo-sidebar-cache-btn",
                    type: "button",
                    class: B(["fo-sidebar-sub-btn", { on: r.value.mode === "cache" }]),
                    title: n(A)("bili.channel.cacheVideoTip"),
                    onClick: t[1] || (t[1] = (i) => v("open-cache"))
                  }, [
                    e("div", Al, [
                      t[54] || (t[54] = e("span", { class: "fo-sidebar-sub-icon" }, "💾", -1)),
                      e("div", Nl, [
                        e("strong", null, l(n(A)("bili.channel.cacheVideo")), 1),
                        e("small", null, l(n(A)("bili.channel.cacheVideoSub")), 1)
                      ])
                    ]),
                    t[55] || (t[55] = e("span", { class: "fo-sidebar-sub-badge" }, "LOCAL", -1))
                  ], 10, Bl)
                ]),
                e("div", Vl, [
                  e("button", {
                    id: "fo-sidebar-following-btn",
                    type: "button",
                    class: B(["fo-sidebar-sub-btn", { on: r.value.mode === "following" }]),
                    title: n(A)("bili.channel.followingTip"),
                    onClick: t[2] || (t[2] = (i) => v("open-following"))
                  }, [
                    e("div", Gl, [
                      t[56] || (t[56] = e("span", { class: "fo-sidebar-sub-icon" }, "📺", -1)),
                      e("div", Fl, [
                        e("strong", null, l(n(A)("bili.channel.following")), 1),
                        e("small", null, l(n(A)("bili.channel.followingSub")), 1)
                      ])
                    ]),
                    t[57] || (t[57] = e("span", { class: "fo-sidebar-sub-badge" }, "FEED", -1))
                  ], 10, Ul)
                ]),
                e("div", Ol, [
                  e("button", {
                    id: "fo-sidebar-recommend-btn",
                    type: "button",
                    class: B(["fo-sidebar-sub-btn", { on: r.value.mode === "recommendations" }]),
                    title: n(A)("bili.channel.forYouTip"),
                    onClick: t[3] || (t[3] = (i) => v("open-recommendations"))
                  }, [
                    e("div", Hl, [
                      t[58] || (t[58] = e("span", { class: "fo-sidebar-sub-icon" }, "✨", -1)),
                      e("div", Yl, [
                        e("strong", null, l(n(A)("bili.channel.forYou")), 1),
                        e("small", null, l(n(A)("bili.channel.forYouSub")), 1)
                      ])
                    ]),
                    t[59] || (t[59] = e("span", { class: "fo-sidebar-sub-badge" }, "FOR YOU", -1))
                  ], 10, ql)
                ]),
                e("div", Wl, [
                  e("button", {
                    id: "fo-sidebar-radio-btn",
                    type: "button",
                    class: B(["fo-sidebar-sub-btn", { on: r.value.mode === "radio" }]),
                    title: n(A)("bili.channel.radioTip"),
                    onClick: t[4] || (t[4] = (i) => v("open-radio"))
                  }, [
                    e("div", jl, [
                      t[60] || (t[60] = e("span", { class: "fo-sidebar-sub-icon" }, "📻", -1)),
                      e("div", Kl, [
                        e("strong", null, l(n(A)("bili.channel.radio")), 1),
                        e("small", null, l(n(A)("bili.channel.radioSub")), 1)
                      ])
                    ]),
                    t[61] || (t[61] = e("span", { class: "fo-sidebar-sub-badge" }, "RADIO", -1))
                  ], 10, Xl)
                ])
              ], 512), [
                [lt, !E.value]
              ]),
              e("div", Ql, [
                e("div", Jl, [
                  t[62] || (t[62] = e("span", { class: "fo-sidebar-sub-icon" }, "📁", -1)),
                  e("div", Zl, [
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
                }, "＋", 8, ea)
              ]),
              r.value.isTargetPickMode ? (o(), s("div", ta, [
                t[63] || (t[63] = e("div", { class: "fo-move-target-tip" }, [
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
                  onClick: t[6] || (t[6] = (i) => v("organizer-cancel-move-target"))
                }, " ✕ 取消 ")
              ])) : _("", !0),
              e("nav", ia, [
                (o(!0), s(V, null, j(r.value.folders, (i, c) => (o(), s(V, {
                  key: `${i.group ? "group" : "folder"}:${i.id}`
                }, [
                  c > 0 && r.value.folders[c - 1]?.kind !== i.kind ? (o(), s("div", oa)) : _("", !0),
                  c === 0 || r.value.folders[c - 1]?.kind !== i.kind ? (o(), s("div", {
                    key: 1,
                    class: B(["fo-bili-section-head fo-vue-section-head", { "drag-into": i.kind === "created" && ue.value }]),
                    onDragover: (N) => i.kind === "created" ? y(N) : void 0,
                    onDragleave: (N) => i.kind === "created" ? d(N) : void 0,
                    onDrop: (N) => i.kind === "created" ? b(N) : void 0
                  }, [
                    e("span", na, [
                      e("b", null, l(i.kind === "collected" ? "我追的合集/收藏夹" : i.kind === "other" ? "其他收藏" : "我创建的收藏夹"), 1)
                    ]),
                    i.kind === "created" ? (o(), s("button", {
                      key: 0,
                      class: "fo-bili-section-add-btn",
                      type: "button",
                      title: "新建插件分组",
                      "aria-label": "新建插件分组",
                      onClick: t[7] || (t[7] = M((N) => v("create-local-group"), ["stop"]))
                    }, "＋")) : _("", !0)
                  ], 42, sa)) : _("", !0),
                  i.group ? (o(), s("div", {
                    key: 3,
                    class: B(["fo-bili-group-label", {
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
                    onDragstart: (N) => R(N, i),
                    onDragover: (N) => g(N, i),
                    onDragleave: (N) => H(N, i),
                    onDrop: (N) => ge(N, i),
                    onDragend: J
                  }, [
                    e("i", ra, l(i.collapsed ? "›" : "⌄"), 1),
                    t[65] || (t[65] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, aa)) : (o(), s("div", {
                    key: 2,
                    role: "button",
                    tabindex: "0",
                    class: B(["fo-bili-folder", {
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
                    onDragstart: (N) => R(N, i),
                    onDragover: (N) => g(N, i),
                    onDragleave: (N) => H(N, i),
                    onDrop: (N) => ge(N, i),
                    onDragend: J
                  }, [
                    t[64] || (t[64] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, la))
                ], 64))), 128)),
                !r.value.loading && !r.value.error && !r.value.folders.length ? (o(), s("p", da, "暂无可用收藏夹。")) : _("", !0)
              ])
            ]),
            r.value.mode === "organizer" ? (o(), s("section", ua, [
              r.value.loading ? (o(), s("div", ca, [...t[66] || (t[66] = [
                e("i", null, null, -1),
                e("span", null, "正在读取 B站收藏内容…", -1)
              ])])) : r.value.error && r.value.error.includes("未登录") ? (o(), s("div", pa, [
                e("div", ba, [
                  t[68] || (t[68] = e("span", { class: "fo-bili-login-icon" }, "📺", -1)),
                  t[69] || (t[69] = e("h3", null, "未检测到哔哩哔哩登录状态", -1)),
                  t[70] || (t[70] = e("p", null, "tab-Project 直接复用当前浏览器的 B站 网页会话，无需输入账号密码或扫码授权。", -1)),
                  e("div", va, [
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
              ])) : r.value.error ? (o(), s("p", fa, l(r.value.error), 1)) : (o(), s(V, { key: 3 }, [
                e("header", ga, [
                  e("div", ma, [
                    e("div", {
                      class: B(["fo-bili-cover", { "fo-vue-cover-image": r.value.folderCover }])
                    }, [
                      r.value.folderCover ? (o(), s("img", {
                        key: 0,
                        src: r.value.folderCover,
                        alt: "",
                        referrerpolicy: "no-referrer"
                      }, null, 8, ha)) : (o(), s("i", ya))
                    ], 2),
                    e("div", _a, [
                      e("h3", null, l(r.value.folderTitle), 1),
                      e("p", null, l(r.value.folderSubtitle), 1)
                    ])
                  ]),
                  e("div", {
                    class: "card-fullscreen-bili-search fo-hero-bili-search",
                    ref_key: "searchHostRef",
                    ref: ze
                  }, [
                    e("form", {
                      class: "card-fullscreen-bili-searchbar",
                      role: "search",
                      onSubmit: M(Ye, ["prevent"])
                    }, [
                      pe(e("input", {
                        "onUpdate:modelValue": t[9] || (t[9] = (i) => me.value = i),
                        type: "search",
                        autocomplete: "off",
                        placeholder: n(A)("bili.workspace.searchPlaceholder"),
                        "aria-label": n(A)("bili.workspace.searchAria"),
                        onFocus: F,
                        onInput: G
                      }, null, 40, ka), [
                        [Te, me.value]
                      ]),
                      e("button", {
                        type: "submit",
                        title: n(A)("bili.workspace.searchBtnTip")
                      }, "⌕", 8, $a)
                    ], 32),
                    Se.value ? (o(), s("div", wa, [
                      e("div", Ca, [
                        e("span", null, l(Ve.value), 1),
                        e("small", null, l(Ue.value), 1)
                      ]),
                      Ce.value ? (o(), s("p", xa, "正在获取推荐 / 搜索中…")) : !_e.value.length && !Ce.value ? (o(), s("p", Sa, "没有找到相关视频，回车可在 B站 全网搜索")) : (o(!0), s(V, { key: 2 }, j(_e.value, (i) => (o(), s("button", {
                        key: i.bvid || i.aid,
                        type: "button",
                        class: "card-fullscreen-bili-video-row",
                        role: "option",
                        onClick: (c) => de(i),
                        onContextmenu: M((c) => ae(c, i), ["prevent"])
                      }, [
                        e("span", Ma, [
                          e("img", {
                            src: i.cover,
                            alt: "",
                            referrerpolicy: "no-referrer",
                            loading: "lazy"
                          }, null, 8, Da),
                          i.durationText ? (o(), s("i", Pa, l(i.durationText), 1)) : _("", !0)
                        ]),
                        e("span", Ea, [
                          e("strong", null, l(i.title), 1),
                          e("small", null, l(i.upper) + " · " + l(i.playText) + "播放", 1)
                        ])
                      ], 40, Ta))), 128))
                    ])) : _("", !0)
                  ], 512),
                  e("div", Ia, [
                    e("button", {
                      id: "bili-header-msg-center-btn",
                      class: B(["fm-tab bili-header-msg-btn hero-action-btn", { "is-active": n(Rt).isOpen }]),
                      type: "button",
                      title: n(A)("bili.workspace.msgCenterTip"),
                      onClick: P
                    }, [
                      t[71] || (t[71] = e("span", { class: "bili-header-msg-icon" }, "🔔", -1)),
                      e("span", La, l(n(A)("bili.workspace.msgBtn")), 1)
                    ], 10, Ra),
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
                    }, l(r.value.batchMode ? n(A)("bili.workspace.batchBack") : n(A)("bili.workspace.batch")), 9, Ba),
                    e("button", {
                      type: "button",
                      class: "hero-action-btn btn-refresh",
                      title: n(A)("bili.workspace.refreshFolderTip"),
                      onClick: t[12] || (t[12] = (i) => v("organizer-refresh"))
                    }, "↻", 8, Aa)
                  ])
                ]),
                e("div", Na, [
                  r.value.batchMode ? _("", !0) : (o(), s("div", Va, [
                    (o(!0), s(V, null, j([{ id: "fav_time", text: n(A)("bili.sort.favTime") }, { id: "view", text: n(A)("bili.sort.view") }, { id: "pubtime", text: n(A)("bili.sort.pubTime") }], (i) => (o(), s("button", {
                      key: i.id,
                      type: "button",
                      class: B({ on: r.value.sort === i.id }),
                      onClick: (c) => v("organizer-sort", i.id)
                    }, l(i.text), 11, Ua))), 128))
                  ])),
                  e("div", Ga, [
                    n(ce).isOpen && n(ce).bvid ? (o(), s("div", {
                      key: 0,
                      class: B(["fo-video-tab-item", { "is-collapsed": n(ce).collapsed }]),
                      title: n(ce).title
                    }, [
                      e("div", {
                        class: "fo-video-tab-meta",
                        onClick: oe
                      }, [
                        e("span", {
                          class: B(["fo-video-tab-pulse", { playing: n(ce).isPlaying }])
                        }, null, 2),
                        e("span", Oa, l(n(ce).title), 1)
                      ]),
                      e("div", qa, [
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-close",
                          title: "关闭视频",
                          onClick: M(be, ["stop"])
                        }, " ✕ "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-sub",
                          title: "查看该视频完整纯文本字幕",
                          onClick: M(ie, ["stop"])
                        }, " 字幕 "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-expand",
                          title: n(ce).collapsed ? "放大恢复视频小窗" : "聚焦视频小窗",
                          onClick: M(oe, ["stop"])
                        }, " 放大 ", 8, Ha)
                      ])
                    ], 10, Fa)) : _("", !0)
                  ]),
                  r.value.batchMode ? (o(), s("div", Ya, [
                    e("span", Wa, "已选择 " + l(r.value.selectedCount) + " 项", 1),
                    e("button", {
                      type: "button",
                      onClick: t[14] || (t[14] = (i) => v("organizer-batch-all"))
                    }, "全选/取消全选"),
                    e("button", {
                      type: "button",
                      class: B({ "picking-target": r.value.isTargetPickMode }),
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
                    onSubmit: M(z, ["prevent"])
                  }, [
                    pe(e("input", {
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
                e("div", Xa, [
                  r.value.videos.length ? _("", !0) : (o(), s("p", ja, l(r.value.query ? "没有找到匹配的视频。" : "这个收藏夹是空的。"), 1)),
                  (o(!0), s(V, null, j(r.value.videos, (i) => (o(), s("article", {
                    key: i.id,
                    class: B(["fo-bili-card", { "batch-selected": i.selected, "fo-single-moving": r.value.movingVideoId === i.id }]),
                    "data-batch-id": i.id,
                    draggable: "true",
                    onDragstart: (c) => Ze(c, i),
                    onContextmenu: M((c) => We(c, i), ["prevent", "stop"])
                  }, [
                    e("div", Qa, [
                      r.value.batchMode ? (o(), s("label", Ja, [
                        e("input", {
                          type: "checkbox",
                          checked: i.selected,
                          onChange: (c) => v("organizer-batch-select", i.id)
                        }, null, 40, Za),
                        t[73] || (t[73] = e("span", null, "✓", -1))
                      ])) : _("", !0),
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
                        }, null, 8, tr)
                      ], 8, er),
                      e("span", ir, "▣ " + l(i.playCount), 1),
                      e("span", or, l(i.duration), 1)
                    ]),
                    e("div", sr, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: M((c) => v("organizer-play-video", i), ["prevent"])
                      }, l(i.title), 9, nr),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": L.value === i.id,
                        onClick: M((c) => qe(i.id), ["stop"])
                      }, "⋮", 8, lr),
                      L.value === i.id ? (o(), s("div", ar, [
                        i.writable ? (o(), s("button", {
                          key: 0,
                          type: "button",
                          class: "danger",
                          onClick: (c) => Je(i.id, "delete")
                        }, "取消收藏", 8, rr)) : _("", !0),
                        i.writable ? (o(), s("button", {
                          key: 1,
                          type: "button",
                          onClick: (c) => Je(i.id, "move")
                        }, "移动到", 8, dr)) : _("", !0),
                        e("button", {
                          type: "button",
                          onClick: (c) => Je(i.id, "subtitle")
                        }, "字幕", 8, ur)
                      ])) : _("", !0)
                    ]),
                    e("div", cr, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: M((c) => x(c, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, l(i.author), 9, pr),
                      e("span", null, "收藏于 " + l(i.favoriteDate), 1)
                    ])
                  ], 42, Ka))), 128))
                ]),
                r.value.totalPages > 1 ? (o(), s("div", br, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: r.value.page <= 1,
                    onClick: t[18] || (t[18] = (i) => v("organizer-page", r.value.page - 1))
                  }, "‹ 上一页", 8, vr),
                  e("span", fr, l(r.value.page) + " / " + l(r.value.totalPages), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: r.value.page >= r.value.totalPages,
                    onClick: t[19] || (t[19] = (i) => v("organizer-page", r.value.page + 1))
                  }, "下一页 ›", 8, gr)
                ])) : _("", !0)
              ], 64))
            ])) : r.value.mode === "cache" ? (o(), s("section", mr, [
              k.value ? (o(), Xe(hs, {
                key: 0,
                active: n(w),
                onBack: t[20] || (t[20] = (i) => k.value = !1)
              }, null, 8, ["active"])) : (o(), s(V, { key: 1 }, [
                e("header", hr, [
                  e("div", yr, [
                    t[75] || (t[75] = e("div", { class: "fo-bili-cover" }, "💾", -1)),
                    e("div", _r, [
                      t[74] || (t[74] = e("h3", null, "缓存视频", -1)),
                      e("p", null, l(r.value.cachedVideos.length) + " 个缓存记录 · 点击缓存设置管理存放目录", 1)
                    ])
                  ]),
                  e("div", kr, [
                    e("button", {
                      type: "button",
                      class: "primary",
                      onClick: t[21] || (t[21] = (i) => v("organizer-open"))
                    }, "返回收藏夹"),
                    e("button", {
                      type: "button",
                      onClick: t[22] || (t[22] = (i) => k.value = !0)
                    }, "缓存设置")
                  ])
                ]),
                r.value.cacheLoading ? (o(), s("div", $r, [...t[76] || (t[76] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取本地缓存…", -1)
                ])])) : (o(), s("div", wr, [
                  r.value.cachedVideos.length ? _("", !0) : (o(), s("p", Cr, "还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。")),
                  (o(!0), s(V, null, j(r.value.cachedVideos, (i) => (o(), s("article", {
                    key: i.id,
                    class: "fo-bili-card fo-cached-video-card"
                  }, [
                    e("div", xr, [
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
                        }, null, 8, Tr),
                        t[77] || (t[77] = e("span", { class: "fo-cached-local-badge" }, "LOCAL", -1))
                      ], 8, Sr)
                    ]),
                    e("div", Mr, [
                      e("button", {
                        class: "fo-title-link fo-bili-title fo-cached-title",
                        type: "button",
                        onClick: (c) => v("cache-play", i.id)
                      }, l(i.title), 9, Dr),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "删除缓存",
                        onClick: (c) => v("cache-delete", i.id)
                      }, "×", 8, Pr)
                    ]),
                    e("div", Er, [
                      e("span", null, l(i.sizeText), 1),
                      e("span", null, "缓存于 " + l(i.cachedDate), 1)
                    ])
                  ]))), 128))
                ]))
              ], 64))
            ])) : r.value.mode === "recommendations" ? (o(), s("section", Ir, [
              e("header", Rr, [
                t[78] || (t[78] = e("div", { class: "fo-bili-cover fo-vue-recommend-cover" }, [
                  e("span", null, "✨")
                ], -1)),
                e("div", Lr, [
                  e("div", zr, [
                    e("h3", null, l(r.value.specialTitle), 1),
                    e("span", Br, l(r.value.specialBadge), 1)
                  ]),
                  e("p", null, l(r.value.specialSubtitle), 1)
                ]),
                e("div", Ar, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !r.value.specialVideos.length,
                    onClick: t[23] || (t[23] = (i) => v("special-play-page"))
                  }, "▶ 播放本页", 8, Nr),
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
              e("div", Vr, [
                t[79] || (t[79] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "🔥 猜你喜欢与热门精选")
                ], -1)),
                e("div", Ur, "本页共 " + l(r.value.specialVideos.length) + " 个视频", 1)
              ]),
              r.value.specialLoading ? (o(), s("div", Gr, [...t[80] || (t[80] = [
                e("i", null, null, -1),
                e("span", null, "正在加载个性化推荐视频…", -1)
              ])])) : r.value.specialError ? (o(), s("p", Fr, l(r.value.specialError), 1)) : (o(), s("div", Or, [
                r.value.specialVideos.length ? _("", !0) : (o(), s("p", qr, "暂无推荐视频。")),
                (o(!0), s(V, null, j(r.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (c) => Ze(c, i)
                }, [
                  e("div", Yr, [
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
                      }, null, 8, Xr)
                    ], 8, Wr),
                    e("span", jr, "▣ " + l(i.playCount), 1),
                    e("span", Kr, l(i.duration), 1)
                  ]),
                  e("div", Qr, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: M((c) => v("special-play-video", i), ["prevent"])
                    }, l(i.title), 9, Jr),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": L.value === i.id,
                      onClick: M((c) => qe(i.id), ["stop"])
                    }, "⋮", 8, Zr),
                    L.value === i.id ? (o(), s("div", ed, [
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { video: i, id: i.id, action: "collect-inbox" }), L.value = "";
                        }
                      }, "📥 添加到收集箱", 8, td),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { id: i.id, action: "play" }), L.value = "";
                        }
                      }, "本地播放与评论", 8, id),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { id: i.id, action: "subtitle" }), L.value = "";
                        }
                      }, "字幕提取", 8, od),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { id: i.id, action: "cache" }), L.value = "";
                        }
                      }, "缓存视频", 8, sd),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { id: i.id, action: "open" }), L.value = "";
                        }
                      }, "打开网页", 8, nd)
                    ])) : _("", !0)
                  ]),
                  e("div", ld, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: M((c) => x(c, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, l(i.author), 9, ad),
                    e("span", null, l(i.favoriteDate), 1)
                  ])
                ], 40, Hr))), 128))
              ]))
            ])) : r.value.mode === "following" ? (o(), s("section", rd, [
              e("header", dd, [
                t[81] || (t[81] = e("div", { class: "fo-bili-cover fo-vue-following-cover" }, [
                  e("span", null, "📺")
                ], -1)),
                e("div", ud, [
                  e("div", cd, [
                    e("h3", null, l(r.value.specialTitle), 1),
                    e("span", pd, l(r.value.specialBadge), 1)
                  ]),
                  e("p", null, l(r.value.specialSubtitle), 1)
                ]),
                e("div", bd, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !r.value.specialVideos.length,
                    onClick: t[26] || (t[26] = (i) => v("special-play-page"))
                  }, "▶ 播放本页", 8, vd),
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
              e("div", fd, [
                e("div", gd, [
                  (o(!0), s(V, null, j(r.value.followingGroups, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: B(["fo-up-group-chip", { active: i.active }]),
                    onClick: (c) => v("following-group", i.id)
                  }, [
                    ye(l(i.child ? "↳ " : "") + l(i.name) + " ", 1),
                    e("small", hd, l(i.count), 1)
                  ], 10, md))), 128))
                ]),
                e("div", yd, [
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
              r.value.followingMembers.length ? (o(), s("div", _d, [
                e("div", kd, [
                  e("b", null, l(r.value.specialBadge), 1),
                  e("small", null, "共 " + l(r.value.followingMembers.length) + " 位 UP 主", 1)
                ]),
                e("div", $d, [
                  e("button", {
                    type: "button",
                    class: B(["fo-up-member-chip", { active: !r.value.followingMembers.some((i) => i.active) }]),
                    onClick: t[31] || (t[31] = (i) => v("following-member", ""))
                  }, "全部UP", 2),
                  (o(!0), s(V, null, j(r.value.followingMembers, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: B(["fo-up-member-chip", { active: i.active }]),
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
                    }, null, 8, Cd)) : _("", !0),
                    e("span", null, l(i.name), 1)
                  ], 42, wd))), 128))
                ]),
                e("button", {
                  type: "button",
                  class: "fo-btn-manage-members",
                  onClick: t[32] || (t[32] = (i) => v("following-manage-groups", "members"))
                }, "＋ 管理成员")
              ])) : _("", !0),
              e("div", xd, [
                t[82] || (t[82] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "⚡ UP 主最新投稿动态")
                ], -1)),
                e("div", Sd, "本页共 " + l(r.value.specialVideos.length) + " 个视频", 1)
              ]),
              r.value.specialLoading ? (o(), s("div", Td, [...t[83] || (t[83] = [
                e("i", null, null, -1),
                e("span", null, "正在读取关注 UP 主更新…", -1)
              ])])) : r.value.specialError ? (o(), s("p", Md, l(r.value.specialError), 1)) : (o(), s("div", Dd, [
                r.value.specialVideos.length ? _("", !0) : (o(), s("p", Pd, "暂无最新关注视频动态。")),
                (o(!0), s(V, null, j(r.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (c) => Ze(c, i)
                }, [
                  e("div", Id, [
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
                      }, null, 8, Ld)
                    ], 8, Rd),
                    e("span", zd, "▣ " + l(i.playCount), 1),
                    e("span", Bd, l(i.duration), 1)
                  ]),
                  e("div", Ad, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: M((c) => v("special-play-video", i), ["prevent"])
                    }, l(i.title), 9, Nd),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": L.value === i.id,
                      onClick: M((c) => qe(i.id), ["stop"])
                    }, "⋮", 8, Vd),
                    L.value === i.id ? (o(), s("div", Ud, [
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { video: i, id: i.id, action: "play" }), L.value = "";
                        }
                      }, "本地播放与评论", 8, Gd),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { video: i, id: i.id, action: "subtitle" }), L.value = "";
                        }
                      }, "字幕提取", 8, Fd),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { video: i, id: i.id, action: "cache" }), L.value = "";
                        }
                      }, "缓存视频", 8, Od),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          v("special-video-action", { video: i, id: i.id, action: "open" }), L.value = "";
                        }
                      }, "打开网页", 8, qd)
                    ])) : _("", !0)
                  ]),
                  e("div", Hd, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: M((c) => x(c, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, l(i.author), 9, Yd),
                    e("span", null, l(i.favoriteDate), 1)
                  ])
                ], 40, Ed))), 128))
              ])),
              e("div", Wd, [
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: r.value.specialLoading || r.value.specialPage <= 1,
                  onClick: t[33] || (t[33] = (i) => v("following-page", r.value.specialPage - 1))
                }, "‹ 上一页", 8, Xd),
                e("span", jd, "第 " + l(r.value.specialPage) + " 页", 1),
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: r.value.specialLoading || !r.value.followingHasMore,
                  onClick: t[34] || (t[34] = (i) => v("following-page", r.value.specialPage + 1))
                }, "下一页 ›", 8, Kd)
              ])
            ])) : r.value.mode === "subscription" ? (o(), s("section", Qd, [
              e("div", Jd, [
                we(di, { "show-back": "" }),
                r.value.subscriptionLoading ? (o(), s("div", Zd, [...t[84] || (t[84] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取订阅视频与 AI 字幕稿…", -1)
                ])])) : r.value.subscriptionError ? (o(), s("p", eu, "读取失败：" + l(r.value.subscriptionError), 1)) : (o(), s("div", tu, [
                  we(Ro),
                  we(Ii)
                ]))
              ])
            ])) : r.value.mode === "radio" ? (o(), s("section", iu, [
              e("header", ou, [
                t[85] || (t[85] = e("div", { class: "fo-hero-left" }, [
                  e("div", { class: "fo-bili-cover fo-vue-radio-cover" }, [
                    e("span", null, "📻")
                  ]),
                  e("div", { class: "fo-hero-folder-info" }, [
                    e("h3", null, "B站电台"),
                    e("p", null, "从左侧选择收藏夹，将视频拖拽或添加到连播队列，自由编排系列随心听")
                  ])
                ], -1)),
                e("div", su, [
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
              e("div", nu, [
                e("aside", lu, [
                  t[86] || (t[86] = e("p", { class: "sw-title" }, "收藏夹", -1)),
                  e("div", au, [
                    (o(!0), s(V, null, j(n(I).radioFolders, (i) => (o(), s("button", {
                      key: i.id,
                      type: "button",
                      class: B(["bili-radio-folder", { on: i.id === n(I).radioActiveFolderId }]),
                      onClick: (c) => v("radio-select-folder", i.id)
                    }, [
                      e("span", null, l(i.title), 1),
                      e("span", null, l(i.count), 1)
                    ], 10, ru))), 128)),
                    n(I).radioFolders.length ? _("", !0) : (o(), s("p", du, l(n(I).radioLoading ? "加载中…" : "暂无收藏夹"), 1))
                  ])
                ]),
                e("section", uu, [
                  t[88] || (t[88] = e("p", {
                    id: "bili-radio-library-title",
                    class: "sw-title"
                  }, "收藏夹视频", -1)),
                  n(I).radioError ? (o(), s("p", cu, l(n(I).radioError), 1)) : _("", !0),
                  e("div", pu, [
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
                      }, null, 8, vu)) : (o(), s("span", fu)),
                      e("p", null, l(i.title), 1),
                      t[87] || (t[87] = e("span", null, "＋", -1))
                    ], 40, bu))), 128)),
                    n(I).radioVideos.length ? _("", !0) : (o(), s("p", gu, l(n(I).radioLoading ? "读取视频中…" : "此收藏夹暂无可播放视频"), 1))
                  ])
                ]),
                e("section", mu, [
                  e("div", hu, [
                    pe(e("input", {
                      id: "bili-radio-name",
                      "onUpdate:modelValue": t[37] || (t[37] = (i) => n(I).radioSeriesName = i),
                      maxlength: "48",
                      class: B({ "has-error": u.value }),
                      placeholder: u.value ? "⚠️ 请在此输入系列名称后再保存！" : "请输入系列名称（必填）",
                      autocomplete: "off",
                      onInput: t[38] || (t[38] = (i) => u.value = !1),
                      onKeydown: Le(M($, ["prevent"]), ["enter"])
                    }, null, 42, yu), [
                      [Te, n(I).radioSeriesName]
                    ]),
                    e("div", _u, [
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
                      we(pt, {
                        id: "bili-radio-share",
                        compact: "",
                        label: "🚀 分享",
                        visible: !0,
                        onSelect: mt
                      })
                    ]),
                    e("div", ku, [
                      e("select", {
                        class: "bili-radio-series-select",
                        title: "快速切换已保存的系列",
                        onChange: T
                      }, [
                        e("option", $u, l(n(I).radioSeries.length ? `📚 已保存系列 (${n(I).radioSeries.length})` : "📚 暂无保存系列"), 1),
                        (o(!0), s(V, null, j(n(I).radioSeries, (i) => (o(), s("option", {
                          key: i.id,
                          value: i.id
                        }, l(i.name) + " (" + l(i.count) + "首) ", 9, wu))), 128)),
                        t[89] || (t[89] = e("option", {
                          value: "__create_new__",
                          class: "bili-radio-create-opt"
                        }, " ＋ 创建系列 ", -1))
                      ], 32)
                    ])
                  ]),
                  e("div", Cu, [
                    (o(!0), s(V, null, j(n(I).radioQueue, (i, c) => (o(), s("div", {
                      key: `${i.bvid}-${c}`,
                      class: B(["bili-radio-queue-item", { "is-playing": n(X).active && n(X).trackIndex === c + 1 }]),
                      title: "点击立即从该曲目开始播放",
                      onClick: (N) => v("radio-play-index", c)
                    }, [
                      e("span", Su, l(n(X).active && n(X).trackIndex === c + 1 ? "♪" : c + 1), 1),
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Tu)) : (o(), s("span", Mu)),
                      e("p", null, l(i.title), 1),
                      e("button", {
                        type: "button",
                        class: "bili-radio-remove",
                        "aria-label": `移除 ${i.title}`,
                        onClick: M((N) => v("radio-remove", { index: c }), ["stop"])
                      }, "×", 8, Du)
                    ], 10, xu))), 128)),
                    n(I).radioQueue.length ? _("", !0) : (o(), s("p", Pu, "点击左侧视频加入连播队列。"))
                  ]),
                  e("div", Eu, [
                    e("button", {
                      id: "bili-radio-play",
                      type: "button",
                      disabled: !n(I).radioQueue.length,
                      onClick: t[39] || (t[39] = (i) => v("radio-play"))
                    }, "▶ 按顺序播放", 8, Iu),
                    e("button", {
                      id: "bili-radio-shuffle",
                      type: "button",
                      disabled: !n(I).radioQueue.length,
                      onClick: t[40] || (t[40] = (i) => v("radio-shuffle"))
                    }, "🔀 随机播放", 8, Ru),
                    e("button", {
                      id: "bili-radio-clear",
                      type: "button",
                      onClick: t[41] || (t[41] = (i) => v("radio-clear"))
                    }, "清空编辑区")
                  ])
                ])
              ]),
              n(Ge) || n(ot).activeId === "daily-bilibili" ? _("", !0) : (o(), Xe(vt, { key: 0 }))
            ])) : _("", !0)
          ], 34)
        ])
      ]),
      n(Ge) || n(ot).activeId === "daily-bilibili" ? (o(), Xe(vt, {
        key: 0,
        "dock-side": ""
      })) : _("", !0),
      t[101] || (t[101] = e("div", {
        class: "fm-pane",
        id: "pane-sub-video",
        hidden: "",
        style: { display: "none !important" }
      }, null, -1)),
      we(ns),
      we(kn),
      W.value.visible && W.value.video ? (o(), s("div", {
        key: 1,
        ref_key: "videoMenuRef",
        ref: Q,
        class: "fo-context-menu",
        role: "menu",
        style: Me(n(O)),
        onClick: t[50] || (t[50] = M(() => {
        }, ["stop"]))
      }, [
        e("div", {
          class: "fo-context-header",
          title: W.value.video.title
        }, l(W.value.video.title), 9, Lu),
        we(pt, {
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
          ye(" 小窗播放视频 ", -1)
        ])]),
        t[99] || (t[99] = e("div", { class: "fo-context-divider" }, null, -1)),
        W.value.video.writable ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "fo-context-item danger",
          onClick: t[43] || (t[43] = (i) => Re("delete"))
        }, [...t[91] || (t[91] = [
          e("span", { class: "fo-context-icon" }, "🗑", -1),
          ye(" 取消收藏 ", -1)
        ])])) : _("", !0),
        W.value.video.writable ? (o(), s("button", {
          key: 1,
          type: "button",
          class: "fo-context-item",
          onClick: t[44] || (t[44] = (i) => Re("move"))
        }, [...t[92] || (t[92] = [
          e("span", { class: "fo-context-icon" }, "📁", -1),
          ye(" 移动到… ", -1)
        ])])) : _("", !0),
        W.value.video.writable ? (o(), s("div", zu)) : _("", !0),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[45] || (t[45] = (i) => Re("open"))
        }, [...t[93] || (t[93] = [
          e("span", { class: "fo-context-icon" }, "↗", -1),
          ye(" 跳转到 B站 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[46] || (t[46] = (i) => Re("copy-link"))
        }, [...t[94] || (t[94] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ye(" 复制链接 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[47] || (t[47] = (i) => Re("cache"))
        }, [...t[95] || (t[95] = [
          e("span", { class: "fo-context-icon" }, "💾", -1),
          ye(" 缓存视频 ", -1)
        ])]),
        t[100] || (t[100] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[48] || (t[48] = (i) => Re("create-task"))
        }, [...t[96] || (t[96] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ye(" 创建任务 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[49] || (t[49] = (i) => Re("subtitle"))
        }, [...t[97] || (t[97] = [
          e("span", { class: "fo-context-icon" }, "▤", -1),
          ye(" 字幕转文本 ", -1)
        ])])
      ], 4)) : _("", !0),
      (o(), Xe(xt, { to: "body" }, [
        we(kl)
      ]))
    ], 2));
  }
}), Ku = /* @__PURE__ */ Ee(Bu, [["__scopeId", "data-v-54329878"]]);
export {
  Ku as default
};
