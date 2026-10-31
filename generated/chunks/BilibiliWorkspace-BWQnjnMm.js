import { d as Re, o, f as s, g as e, t as l, u as r, C as L, n as ce, F as A, i as j, h, E as ye, j as x, x as ne, y as he, D as Ke, z as ut, m as oe, p as xe, l as Ie, b as S, H as tt, S as st, B as Se, v as yt, A as it, I as Qe, M as ht, e as nt } from "./vendor-vue-wIH4jcna.js";
import { c as P, b as Ue, d as Je, a as O, r as Ee, s as kt } from "./bili-favorites-store-CK6jLXB_.js";
import { c as lt, n as je, z as me, d as He, r as Ze, B as at } from "./view-styles-BcxK8WCo.js";
import "./fullscreen-cards.store-D6iRiFWV.js";
import { u as _t } from "./useCardActivity-B0ChDMBl.js";
import { _ as Ve } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { B as We } from "./BiliRichText-BjtpIubF.js";
import { d as $t, a as wt } from "./playback-sync-D2paRO7B.js";
import { a as ae, d as et, e as f, c as ue } from "./up-group-manager-store-CzJ1sArR.js";
import { biliMessagePanelController as Ct, biliMessagePanelState as xt } from "./message-panel-store-CatcuDOX.js";
import { bilibiliChannelService as Ae } from "./bilibili-channel.service-BERDRztz.js";
import { u as St } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-BiNio4cP.js";
import { C as rt } from "./ChatShareMenu-Bh1eBnJE.js";
const Tt = { class: "bili-sub-header bili-sub-vue-header" }, Mt = { class: "bili-sub-channel-info" }, Dt = { class: "bili-sub-vue-title-row" }, Pt = { class: "bili-sub-title" }, zt = { class: "bili-sub-desc" }, Bt = { class: "bili-sub-actions" }, It = { class: "bili-sub-mode-icon" }, Rt = { class: "bili-sub-mode-text" }, Lt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, Et = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, At = { class: "bili-sub-dropdown-panel" }, Ut = { class: "bili-sub-dropdown-list" }, Vt = ["onClick"], Ft = { class: "bili-sub-item-text" }, Nt = {
  key: 0,
  class: "bili-sub-item-check"
}, qt = { class: "bili-sub-dropdown-foot" }, Gt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, Ot = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, jt = { class: "bili-sub-dropdown-panel bili-sub-video-dropdown-panel" }, Ht = { class: "bili-sub-dropdown-title" }, Wt = { class: "bili-sub-dropdown-list" }, Kt = ["title", "onClick"], Yt = { class: "bili-sub-video-num" }, Xt = { class: "bili-sub-item-text" }, Qt = {
  key: 0,
  class: "bili-sub-video-duration"
}, Jt = { class: "bili-sub-dropdown-foot" }, Zt = ["disabled"], ei = /* @__PURE__ */ Re({
  __name: "BiliSubscriptionHeader",
  props: {
    showBack: { type: Boolean }
  },
  setup(Te) {
    function m(z, y) {
      Ue.dispatch(z, y);
    }
    return (z, y) => (o(), s("header", Tt, [
      e("div", Mt, [
        y[6] || (y[6] = e("img", {
          class: "bili-sub-avatar",
          src: "assets/bilibili.svg",
          alt: ""
        }, null, -1)),
        e("div", null, [
          e("div", Dt, [
            e("h3", Pt, l(r(P).organizer.subscriptionTitle), 1)
          ]),
          e("p", zt, l(r(P).organizer.subscriptionSubtitle), 1)
        ])
      ]),
      e("div", Bt, [
        e("button", {
          type: "button",
          class: L(["bili-sub-head-btn bili-sub-script-mode-btn", { "is-newspaper": r(P).organizer.subscriptionScriptMode === "newspaper" }]),
          onClick: y[0] || (y[0] = (R) => m("subscription-script-mode"))
        }, [
          e("span", It, l(r(P).organizer.subscriptionScriptMode === "newspaper" ? "📰" : "📜"), 1),
          e("span", Rt, l(r(P).organizer.subscriptionScriptMode === "newspaper" ? "报纸模式" : "滚动台词"), 1)
        ], 2),
        e("details", Lt, [
          e("summary", Et, [
            e("span", null, [
              y[7] || (y[7] = ce("关注 UP 主：", -1)),
              e("b", null, l(r(P).organizer.subscriptionTitle), 1)
            ]),
            y[8] || (y[8] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", At, [
            y[10] || (y[10] = e("div", { class: "bili-sub-dropdown-title" }, "已关注的 UP 主", -1)),
            e("div", Ut, [
              (o(!0), s(A, null, j(r(P).organizer.subscriptionChannels, (R) => (o(), s("button", {
                key: R.id,
                type: "button",
                class: L(["bili-sub-dropdown-item", { active: R.active }]),
                onClick: (F) => m("subscription-channel", R.id)
              }, [
                y[9] || (y[9] = e("span", { class: "bili-sub-dot" }, null, -1)),
                e("span", Ft, l(R.name), 1),
                R.active ? (o(), s("span", Nt, "✓")) : h("", !0)
              ], 10, Vt))), 128))
            ]),
            e("div", qt, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                onClick: y[1] || (y[1] = (R) => m("subscription-add-channel"))
              }, "＋ UP 主")
            ])
          ])
        ]),
        e("details", Gt, [
          e("summary", Ot, [
            e("span", null, [
              y[11] || (y[11] = ce("视频 ", -1)),
              e("b", null, "(" + l(r(P).organizer.subscriptionVideos.length) + ")", 1)
            ]),
            y[12] || (y[12] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", jt, [
            e("div", Ht, "最近投稿视频 (" + l(r(P).organizer.subscriptionVideos.length) + ")", 1),
            e("div", Wt, [
              (o(!0), s(A, null, j(r(P).organizer.subscriptionVideos, (R, F) => (o(), s("button", {
                key: R.bvid,
                type: "button",
                class: L(["bili-sub-dropdown-item bili-sub-video-item", { active: R.active }]),
                title: R.title,
                onClick: (M) => m("subscription-video", R.bvid)
              }, [
                e("span", Yt, l(F + 1) + ".", 1),
                e("span", Xt, l(R.title), 1),
                R.duration ? (o(), s("small", Qt, l(R.duration), 1)) : h("", !0)
              ], 10, Kt))), 128))
            ]),
            e("div", Jt, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                disabled: r(P).organizer.subscriptionLoading,
                onClick: y[2] || (y[2] = (R) => m("subscription-load-more"))
              }, "继续获取", 8, Zt)
            ])
          ])
        ]),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: y[3] || (y[3] = (R) => m(r(P).organizer.showFullDescInRightPanel ? "subscription-copy-description" : "subscription-copy-script"))
        }, l(r(P).organizer.showFullDescInRightPanel ? "复制简介" : "复制稿子"), 1),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: y[4] || (y[4] = (R) => m("subscription-refresh"))
        }, "↻ 刷新"),
        Te.showBack ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "bili-sub-head-btn",
          onClick: y[5] || (y[5] = (R) => m("organizer-open"))
        }, "← 返回收藏夹")) : h("", !0)
      ])
    ]));
  }
}), ti = /* @__PURE__ */ Ve(ei, [["__scopeId", "data-v-0dfef976"]]), ii = { class: "bili-sub-transcript-column bili-sub-vue-transcript-column" }, oi = { class: "bili-sub-article-wrap" }, si = { class: "bili-sub-transcript-body" }, ni = {
  key: 0,
  class: "bili-sub-description-copy",
  title: "当前为放大简介视图"
}, li = {
  key: 0,
  class: "muted"
}, ai = {
  key: 0,
  class: "bili-sub-newspaper-list"
}, ri = ["data-idx", "data-from", "data-to", "title", "onClick"], di = { class: "bili-sub-newspaper-header" }, ui = { class: "bili-sub-newspaper-num" }, ci = { class: "bili-sub-newspaper-heading" }, pi = { class: "bili-sub-newspaper-title" }, bi = { class: "bili-sub-newspaper-time" }, vi = ["onClick"], fi = { class: "bili-sub-newspaper-content" }, gi = ["data-from", "data-to", "title", "onClick"], mi = {
  key: 1,
  class: "bili-sub-srt-list"
}, yi = ["data-idx", "data-from", "data-to", "title", "onClick"], hi = { class: "bili-sub-srt-time" }, ki = { class: "bili-sub-srt-text" }, _i = {
  key: 2,
  class: "bili-sub-no-transcript-box"
}, $i = {
  key: 2,
  class: "bili-sub-vue-empty-hint"
}, wi = /* @__PURE__ */ Re({
  __name: "BiliSubscriptionTranscript",
  setup(Te) {
    const m = ne(() => P.organizer), z = ne(() => m.value.subscriptionChapters.length > 0 || m.value.subscriptionCues.length > 0);
    function y(R, F) {
      Ue.dispatch(R, F);
    }
    return (R, F) => (o(), s("section", ii, [
      e("article", oi, [
        e("div", si, [
          m.value.showFullDescInRightPanel ? (o(), s("section", ni, [
            e("header", null, [
              F[1] || (F[1] = e("h5", null, "视频简介", -1)),
              e("button", {
                type: "button",
                class: "bili-copy-desc-btn",
                title: "切回台词展示",
                onClick: F[0] || (F[0] = (M) => y("subscription-toggle-desc-panel"))
              }, "缩小简介")
            ]),
            (o(!0), s(A, null, j(m.value.subscriptionDescription, (M, a) => (o(), s("p", { key: a }, [
              ye(We, { text: M }, null, 8, ["text"])
            ]))), 128)),
            m.value.subscriptionDescription.length ? h("", !0) : (o(), s("p", li, "该视频暂无可用的文字简介。"))
          ])) : (o(), s(A, { key: 1 }, [
            m.value.subscriptionScriptMode === "newspaper" && m.value.subscriptionChapters.length ? (o(), s("div", ai, [
              (o(!0), s(A, null, j(m.value.subscriptionChapters, (M, a) => (o(), s("article", {
                key: `${M.from}:${a}`,
                class: "bili-sub-newspaper-section",
                "data-idx": a,
                "data-from": M.from,
                "data-to": M.to,
                title: `点击跳转至 ${M.fromText} 播放`,
                onClick: (_) => y("subscription-seek", { from: M.from, index: a, mode: "newspaper" })
              }, [
                e("header", di, [
                  e("span", ui, l(String(a + 1).padStart(2, "0")), 1),
                  e("div", ci, [
                    e("h4", pi, l(M.title), 1),
                    e("span", bi, "⏱ " + l(M.fromText) + " - " + l(M.toText), 1)
                  ]),
                  e("button", {
                    type: "button",
                    class: "bili-sub-newspaper-play-btn",
                    "aria-label": "从头播放此分段",
                    onClick: x((_) => y("subscription-seek", { from: M.from, index: a, mode: "newspaper" }), ["stop"])
                  }, "▶", 8, vi)
                ]),
                e("div", fi, [
                  M.paragraphCues && M.paragraphCues.length ? (o(!0), s(A, { key: 0 }, j(M.paragraphCues, (_, k) => (o(), s("p", {
                    key: k,
                    class: "bili-sub-newspaper-p"
                  }, [
                    (o(!0), s(A, null, j(_, (N, T) => (o(), s("span", {
                      key: `${N.from}:${T}`,
                      class: "bili-sub-newspaper-cue",
                      "data-from": N.from,
                      "data-to": N.to,
                      title: `点击跳转播放此句 (⏱ ${N.timeText || N.from + "s"})`,
                      onClick: x((D) => y("subscription-seek", { from: N.from, mode: "newspaper" }), ["stop"])
                    }, l(N.content), 9, gi))), 128))
                  ]))), 128)) : (o(!0), s(A, { key: 1 }, j(M.paragraphs, (_, k) => (o(), s("p", {
                    key: k,
                    class: "bili-sub-newspaper-p"
                  }, l(_), 1))), 128))
                ])
              ], 8, ri))), 128))
            ])) : m.value.subscriptionCues.length ? (o(), s("div", mi, [
              (o(!0), s(A, null, j(m.value.subscriptionCues, (M) => (o(), s("button", {
                key: `${M.from}:${M.index}`,
                type: "button",
                class: "bili-sub-srt-row",
                "data-idx": M.index,
                "data-from": M.from,
                "data-to": M.to,
                title: `点击跳转至 ${M.timeText}`,
                onClick: (a) => y("subscription-seek", { from: M.from, index: M.index, mode: "lyrics" })
              }, [
                e("span", hi, l(M.timeText), 1),
                e("span", ki, l(M.content), 1)
              ], 8, yi))), 128))
            ])) : (o(), s("div", _i, [...F[2] || (F[2] = [
              e("div", { class: "bili-sub-no-transcript-icon" }, "🎙️", -1),
              e("h5", null, "暂无实时台词字幕", -1),
              e("p", { class: "muted" }, "当前视频暂无可用字幕稿。如需阅读完整文案，请点击左侧视频标题旁的“放大简介”。", -1)
            ])]))
          ], 64)),
          !m.value.showFullDescInRightPanel && !z.value && !m.value.subscriptionDescription.length ? (o(), s("p", $i, "字幕不可用时仍可在左侧播放和查看评论。")) : h("", !0)
        ])
      ])
    ]));
  }
}), Ci = /* @__PURE__ */ Ve(wi, [["__scopeId", "data-v-2f4df941"]]), xi = { class: "bili-sub-player-column" }, Si = {
  key: 0,
  class: "bili-sub-sticky-player"
}, Ti = { class: "bili-sub-player-card" }, Mi = { class: "bili-sub-video-box" }, Di = ["poster", "hidden"], Pi = ["src"], zi = {
  key: 1,
  class: "bili-sub-video-loading"
}, Bi = { class: "bili-sub-video-meta" }, Ii = { class: "bili-sub-video-meta-actions" }, Ri = ["title"], Li = { class: "bili-sub-meta-stats" }, Ei = { class: "bili-sub-meta-desc" }, Ai = {
  class: "bili-sub-comments-section",
  id: "bili-sub-comments-section"
}, Ui = { class: "bili-mini-comments-head" }, Vi = { class: "bili-mini-comments-meta" }, Fi = { class: "bili-mini-comments-count bili-sub-comments-count" }, Ni = { class: "bili-mini-comments-sort" }, qi = { class: "bili-sub-comment-composer" }, Gi = ["onKeydown"], Oi = ["disabled"], ji = {
  key: 0,
  class: "bili-sub-emote-picker"
}, Hi = {
  key: 0,
  class: "fo-bili-loading"
}, Wi = { key: 1 }, Ki = ["title", "onClick"], Yi = ["src", "alt"], Xi = { key: 1 }, Qi = { class: "bili-mini-comments-body bili-sub-comments-body" }, Ji = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, Zi = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, eo = ["src"], to = { class: "bili-comment-main" }, io = { class: "bili-comment-user-row" }, oo = { class: "bili-comment-uname" }, so = {
  key: 0,
  class: "bili-comment-level"
}, no = { class: "bili-comment-time" }, lo = { class: "bili-comment-text" }, ao = {
  key: 0,
  class: "bili-comment-pictures"
}, ro = ["href", "onClick"], uo = ["src"], co = { class: "bili-comment-actions" }, po = { key: 0 }, bo = { key: 1 }, vo = {
  key: 1,
  class: "bili-comment-sub-list"
}, fo = { class: "bili-comment-sub-uname" }, go = { class: "bili-comment-sub-more" }, mo = ["disabled", "onClick"], yo = ["disabled", "onClick"], ho = ["onClick"], ko = { class: "bili-sub-comments-infinite-trigger" }, _o = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0" }
}, $o = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0", opacity: "0.6" }
}, wo = {
  key: 1,
  class: "fo-bili-empty"
}, Co = /* @__PURE__ */ Re({
  __name: "BiliSubscriptionPlayer",
  setup(Te) {
    const m = ne(() => P.organizer.subscriptionCurrent), z = S(null), y = S(!1), R = S(!1), F = S(""), M = S(""), a = S(1), _ = S(1), k = S([]), N = S("0 条"), T = S(!1), D = S(!1), q = S(""), le = S(!1), H = S(""), Y = S(null), ie = S(!1), pe = S(""), ke = S(!1), re = S(!1), b = S(!1), se = S([]);
    let Z = null, ee = null;
    function Q(w, g = !1) {
      pe.value = w, ke.value = g, Z && clearTimeout(Z), Z = setTimeout(() => {
        pe.value = "";
      }, 3500);
    }
    function be() {
      Ue.dispatch("subscription-open-player");
    }
    function B() {
      Ue.dispatch("subscription-toggle-desc-panel");
    }
    function v(w) {
      const g = w.currentTarget;
      g && g.scrollHeight - g.scrollTop - g.clientHeight < 180 && !D.value && le.value && X();
    }
    function G(w, g) {
      const c = w[g];
      c && window.open(c, "_blank", "noopener,noreferrer");
    }
    function K(w, g) {
      if (!w) return [];
      if (!g || g.size === 0)
        return [{ type: "text", text: w }];
      const c = /\[([^\]]+)\]/g, C = [];
      let V = 0, U;
      for (; (U = c.exec(w)) !== null; ) {
        U.index > V && C.push({ type: "text", text: w.slice(V, U.index) });
        const W = U[0], te = g.get(W);
        te ? C.push({ type: "emote", text: W, url: te }) : C.push({ type: "text", text: W }), V = c.lastIndex;
      }
      return V < w.length && C.push({ type: "text", text: w.slice(V) }), C;
    }
    function _e(w) {
      if (!w) return "";
      const g = new Date(w * 1e3), c = /* @__PURE__ */ new Date(), C = Math.floor((c.getTime() - g.getTime()) / 1e3);
      if (C < 60) return "刚刚";
      if (C < 3600) return `${Math.floor(C / 60)} 分钟前`;
      if (C < 86400) return `${Math.floor(C / 3600)} 小时前`;
      const V = g.getFullYear(), U = String(g.getMonth() + 1).padStart(2, "0"), W = String(g.getDate()).padStart(2, "0");
      return V === c.getFullYear() ? `${U}-${W}` : `${V}-${U}-${W}`;
    }
    function $e(w) {
      return w ? w >= 1e4 ? (w / 1e4).toFixed(1).replace(/\.0$/, "") + "万" : String(w) : "0";
    }
    async function $(w = !1) {
      if (M.value) {
        w ? D.value = !0 : (T.value = !0, q.value = "");
        try {
          const g = `https://api.bilibili.com/x/v2/reply?type=1&oid=${M.value}&pn=${_.value}&ps=20&sort=${a.value}`, C = await (await fetch(g, { credentials: "include" })).json();
          if (C?.code !== 0 || !C?.data) {
            w || (q.value = C?.message || "评论加载失败或该视频已关闭评论", k.value = []), le.value = !1;
            return;
          }
          const V = C.data, U = V.page?.count || 0;
          N.value = `${$e(U)} 条`;
          const te = (Array.isArray(V.replies) ? V.replies : []).map((J) => {
            const Ne = /* @__PURE__ */ new Map();
            J.content?.emote && Object.entries(J.content.emote).forEach(([fe, Ce]) => {
              Ce?.url && Ne.set(fe, String(Ce.url).replace(/^http:/, "https:"));
            });
            const Le = String(J.content?.message || ""), qe = Array.isArray(J.content?.pictures) ? J.content.pictures.map((fe) => String(fe?.img_src || fe).replace(/^http:/, "https:")).filter(Boolean) : [], Oe = Array.isArray(J.replies) ? J.replies.map((fe) => ({
              id: fe.rpid || Math.random(),
              userName: fe.member?.uname || "B站用户",
              message: String(fe.content?.message || "")
            })) : [];
            return {
              id: J.rpid || Math.random(),
              userName: J.member?.uname || "B站用户",
              avatar: String(J.member?.avatar || "").replace(/^http:/, "https:"),
              level: Number(J.member?.level_info?.current_level || 0),
              message: Le,
              tokens: K(Le, Ne),
              timeStr: _e(J.ctime),
              likeCount: Number(J.like || 0),
              replyCount: Number(J.rcount || 0),
              pictures: qe,
              replies: Oe
            };
          });
          w ? k.value = [...k.value, ...te] : k.value = te, le.value = k.value.length < U;
        } catch (g) {
          w || (q.value = g?.message || "网络异常，未能加载评论");
        } finally {
          T.value = !1, D.value = !1;
        }
      }
    }
    async function d(w) {
      const g = k.value.find((c) => String(c.id) === String(w));
      if (!(!g || g.subRepliesLoading || !M.value)) {
        g.subRepliesPage ? g.subRepliesPage++ : g.subRepliesPage = 1, g.subRepliesLoading = !0, g.subRepliesExpanded = !0;
        try {
          const c = await lt.getSubReplies(M.value, w, g.subRepliesPage, 10), C = (c.replies || []).map((W) => ({
            id: String(W.rpid),
            userName: W.uname,
            message: W.message
          })), V = new Set((g.replies || []).map((W) => String(W.id))), U = C.filter((W) => !V.has(String(W.id)));
          g.replies = [...g.replies || [], ...U], g.subRepliesHasMore = c.hasMore;
        } catch {
          Q("子回复加载失败", !0);
        } finally {
          g.subRepliesLoading = !1;
        }
      }
    }
    function p(w) {
      const g = k.value.find((c) => String(c.id) === String(w));
      g && (g.subRepliesExpanded = !1);
    }
    function I(w) {
      a.value !== w && (a.value = w, _.value = 1, $(!1));
    }
    function X() {
      D.value || !le.value || (_.value += 1, $(!0));
    }
    async function ve() {
      if (re.value = !re.value, re.value && !se.value.length && !b.value) {
        b.value = !0;
        try {
          const g = await (await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", { credentials: "include" })).json();
          g?.code === 0 && Array.isArray(g?.data?.packages) && (se.value = g.data.packages.filter((c) => Array.isArray(c.emote) && c.emote.length).map((c) => ({
            text: c.text || "B站表情",
            emote: c.emote.map((C) => ({
              text: C.text || "",
              url: String(C.url || "").replace(/^http:/, "https:")
            }))
          })));
        } catch {
        } finally {
          b.value = !1;
        }
      }
    }
    function we(w) {
      const g = Y.value;
      if (!g)
        H.value += w;
      else {
        const c = g.selectionStart ?? g.value.length, C = g.selectionEnd ?? c;
        H.value = H.value.slice(0, c) + w + H.value.slice(C), tt(() => {
          g.focus();
          const V = c + w.length;
          g.setSelectionRange(V, V);
        });
      }
      re.value = !1;
    }
    async function Me() {
      const w = H.value.trim();
      if (!w) {
        Q("请输入评论内容", !0);
        return;
      }
      if (!M.value) {
        Q("未能识别视频 ID，无法发表评论", !0);
        return;
      }
      const g = window.getBiliJct;
      let c = "";
      if (typeof g == "function")
        c = await g();
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
      ie.value = !0;
      try {
        const C = new URLSearchParams({
          oid: String(M.value),
          type: "1",
          message: w,
          plat: "1",
          csrf: c,
          csrf_token: c
        }), U = await (await fetch("https://api.bilibili.com/x/v2/reply/add", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: C.toString()
        })).json();
        U?.code === 0 ? (H.value = "", Q("✓ 评论发表成功！", !1), _.value = 1, $(!1)) : Q(`❌ 发送失败：${U?.message || U?.code}`, !0);
      } catch (C) {
        Q(`❌ 发送出错：${C?.message || "网络异常"}`, !0);
      } finally {
        ie.value = !1;
      }
    }
    async function De(w) {
      if (!w?.bvid) return;
      if (typeof document < "u" && (document.querySelectorAll("video, audio").forEach((c) => {
        if (c !== z.value && !c.paused)
          try {
            c.pause();
          } catch {
          }
      }), document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((c) => {
        try {
          c.pause();
        } catch {
        }
      })), z.value && !z.value.paused)
        try {
          z.value.pause();
        } catch {
        }
      y.value = !0, R.value = !1, F.value = "";
      let g = w.aid;
      if (!g)
        try {
          const C = await (await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${w.bvid}`, { credentials: "include" })).json();
          C?.data?.aid && (g = C.data.aid);
        } catch {
        }
      M.value = g || "", _.value = 1, $(!1);
      try {
        const c = await lt.resolvePlayStream(w);
        if (c?.sources?.length) {
          z.value && (typeof document < "u" && document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((C) => {
            try {
              C.pause();
            } catch {
            }
          }), z.value.src = c.sources[0], z.value.play().catch(() => {
          }), wt({ bvid: w.bvid, title: w.title, cover: w.cover }, z.value)), y.value = !1;
          return;
        }
      } catch (c) {
        console.warn("[BiliSubscriptionPlayer] 本地视频流解析失败，使用 iframe 备用:", c);
      }
      R.value = !0, F.value = `https://player.bilibili.com/player.html?bvid=${w.bvid}&autoplay=1&danmaku=0`, y.value = !1;
    }
    let de = null, Pe = null;
    function ze(w) {
      const g = w.closest(".bili-sub-transcript-body") || w.closest(".bili-sub-article-wrap") || w.parentElement;
      if (!g) return;
      const c = g.getBoundingClientRect(), U = w.getBoundingClientRect().top - c.top + g.scrollTop - c.height * 0.36;
      g.scrollTo({
        top: Math.max(0, U),
        behavior: "smooth"
      });
    }
    function Be() {
      if (!z.value) return;
      const w = z.value.currentTime;
      if (document.querySelectorAll(".bili-sub-newspaper-section").forEach((C) => {
        const V = Number(C.getAttribute("data-from") || 0), U = Number(C.getAttribute("data-to") || 0), W = w >= V && (U <= 0 || w < U);
        C.classList.toggle("active", W);
      }), P.organizer.subscriptionScriptMode === "newspaper") {
        const C = document.querySelectorAll(".bili-sub-newspaper-cue");
        if (C.length > 0) {
          let V = null;
          if (C.forEach((U) => {
            const W = Number(U.getAttribute("data-from") || 0), te = Number(U.getAttribute("data-to") || 0);
            w >= W && (te <= 0 || w < te) ? (V || (V = U), U.classList.add("cue-reading-active")) : U.classList.remove("cue-reading-active");
          }), !V && w > 0)
            for (let U = C.length - 1; U >= 0; U--) {
              const W = C[U], te = Number(W.getAttribute("data-from") || 0);
              if (w >= te) {
                V = W, W.classList.add("cue-reading-active");
                break;
              }
            }
          V && V !== de && (de = V, ze(V));
        }
      } else {
        const C = document.querySelectorAll(".bili-sub-srt-row");
        let V = !1, U = null;
        for (let W = C.length - 1; W >= 0; W--) {
          const te = C[W], J = Number(te.getAttribute("data-from") || 0);
          !V && w >= J ? (te.classList.add("active"), V = !0, U = te) : te.classList.remove("active");
        }
        U && U !== Pe && (Pe = U, ze(U));
      }
    }
    function Fe() {
      Be();
    }
    function Ge() {
      Be();
    }
    return he(
      () => m.value?.bvid,
      () => {
        m.value && De(m.value);
      },
      { immediate: !0 }
    ), Ke(() => {
      ee = Ue.onAction((w, g) => {
        if (w === "subscription-seek") {
          const c = Number(g?.from);
          z.value && Number.isFinite(c) && (z.value.currentTime = Math.max(0, c - 0.1), z.value.play().catch(() => {
          }));
        }
      });
    }), ut(() => {
      if (z.value) {
        $t(z.value);
        try {
          z.value.pause(), z.value.src = "", z.value.load();
        } catch {
        }
      }
      ee && ee(), Z && clearTimeout(Z);
    }), (w, g) => (o(), s("aside", xi, [
      m.value ? (o(), s("div", Si, [
        e("div", Ti, [
          e("div", {
            class: "bili-sub-vue-comment-handoff",
            hidden: "",
            style: { display: "none !important" }
          }, [
            g[3] || (g[3] = e("strong", null, "播放器与评论区已统一到 Vue 本地影院", -1)),
            e("button", {
              type: "button",
              onClick: be
            }, "打开播放器与评论区")
          ]),
          e("div", Mi, [
            e("video", {
              ref_key: "videoRef",
              ref: z,
              class: "bili-sub-native-video",
              controls: "",
              playsinline: "",
              poster: m.value.cover,
              hidden: R.value,
              onTimeupdate: Be,
              onSeeked: Fe,
              onPlay: Ge
            }, null, 40, Di),
            R.value ? (o(), s("iframe", {
              key: 0,
              class: "bili-sub-native-iframe",
              allowfullscreen: "true",
              allow: "autoplay; fullscreen",
              src: F.value
            }, null, 8, Pi)) : h("", !0),
            y.value ? (o(), s("div", zi, [...g[4] || (g[4] = [
              e("i", null, null, -1),
              e("span", null, "正在解析登录高清视频流…", -1)
            ])])) : h("", !0)
          ]),
          e("div", {
            class: "bili-sub-scroll-stage",
            onScrollPassive: v
          }, [
            e("div", Bi, [
              e("div", Ii, [
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: r(P).organizer.showFullDescInRightPanel ? "切回台词展示" : "在右侧大屏展开完整视频简介",
                  onClick: B
                }, l(r(P).organizer.showFullDescInRightPanel ? "缩小简介" : "放大简介"), 9, Ri)
              ]),
              e("h4", null, l(m.value.title), 1),
              e("div", Li, [
                e("span", null, "▣ 播放: " + l(m.value.playCount), 1),
                e("span", null, "💬 弹幕: " + l(m.value.danmakuCount), 1),
                e("span", null, "⏱ " + l(m.value.duration), 1)
              ]),
              e("p", Ei, [
                ye(We, {
                  text: m.value.description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ]),
            e("div", Ai, [
              e("div", Ui, [
                e("div", Vi, [
                  g[5] || (g[5] = e("span", null, "💬 评论", -1)),
                  e("span", Fi, l(N.value), 1)
                ]),
                e("div", Ni, [
                  e("button", {
                    type: "button",
                    class: L(["bili-mini-sort-btn", { active: a.value === 1 }]),
                    onClick: g[0] || (g[0] = (c) => I(1))
                  }, "按热度", 2),
                  e("button", {
                    type: "button",
                    class: L(["bili-mini-sort-btn", { active: a.value === 0 }]),
                    onClick: g[1] || (g[1] = (c) => I(0))
                  }, "按时间", 2)
                ])
              ]),
              e("div", qi, [
                e("button", {
                  type: "button",
                  class: L(["bili-sub-emote-button", { on: re.value }]),
                  title: "选择 B站 表情",
                  onClick: ve
                }, "☺", 2),
                oe(e("input", {
                  ref_key: "commentInputRef",
                  ref: Y,
                  "onUpdate:modelValue": g[2] || (g[2] = (c) => H.value = c),
                  type: "text",
                  class: "bili-sub-comment-input",
                  placeholder: "发一条友善的评论吧…（Enter 发送）",
                  maxlength: "500",
                  onKeydown: Ie(x(Me, ["prevent"]), ["enter"])
                }, null, 40, Gi), [
                  [xe, H.value]
                ]),
                e("button", {
                  type: "button",
                  class: "bili-sub-comment-send-btn",
                  disabled: ie.value || !H.value.trim(),
                  onClick: Me
                }, l(ie.value ? "发送中…" : "发送"), 9, Oi)
              ]),
              re.value ? (o(), s("div", ji, [
                b.value ? (o(), s("div", Hi, [...g[6] || (g[6] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取 B站 表情包…", -1)
                ])])) : (o(), s("div", Wi, [
                  (o(!0), s(A, null, j(se.value, (c) => (o(), s("section", {
                    key: c.text,
                    class: "bili-sub-emote-group"
                  }, [
                    e("h5", null, l(c.text || "B站表情"), 1),
                    e("div", null, [
                      (o(!0), s(A, null, j(c.emote, (C) => (o(), s("button", {
                        key: C.text,
                        type: "button",
                        class: "bili-sub-emote-item",
                        title: C.text,
                        onClick: (V) => we(C.text)
                      }, [
                        C.url ? (o(), s("img", {
                          key: 0,
                          src: C.url,
                          alt: C.text,
                          referrerpolicy: "no-referrer"
                        }, null, 8, Yi)) : (o(), s("span", Xi, l(C.text), 1))
                      ], 8, Ki))), 128))
                    ])
                  ]))), 128))
                ]))
              ])) : h("", !0),
              pe.value ? (o(), s("div", {
                key: 1,
                class: L(["bili-sub-comment-tip", { error: ke.value }])
              }, l(pe.value), 3)) : h("", !0),
              e("div", Qi, [
                T.value && !k.value.length ? (o(), s("p", Ji, "正在加载评论…")) : q.value && !k.value.length ? (o(), s("p", Zi, l(q.value), 1)) : h("", !0),
                (o(!0), s(A, null, j(k.value, (c) => (o(), s("div", {
                  key: c.id,
                  class: "bili-comment-item"
                }, [
                  e("img", {
                    class: "bili-comment-avatar",
                    src: c.avatar,
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer"
                  }, null, 8, eo),
                  e("div", to, [
                    e("div", io, [
                      e("span", oo, l(c.userName), 1),
                      c.level ? (o(), s("span", so, "LV" + l(c.level), 1)) : h("", !0),
                      e("span", no, l(c.timeStr), 1)
                    ]),
                    e("div", lo, [
                      ye(We, {
                        text: c.message
                      }, null, 8, ["text"])
                    ]),
                    c.pictures?.length ? (o(), s("div", ao, [
                      (o(!0), s(A, null, j(c.pictures, (C, V) => (o(), s("a", {
                        key: V,
                        class: "bili-comment-pic-link",
                        href: C,
                        onClick: x((U) => G(c.pictures, V), ["stop", "prevent"])
                      }, [
                        e("img", {
                          class: "bili-comment-pic",
                          src: C,
                          alt: "评论图片",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, uo)
                      ], 8, ro))), 128))
                    ])) : h("", !0),
                    e("div", co, [
                      c.likeCount ? (o(), s("span", po, "👍 " + l(c.likeCount), 1)) : h("", !0),
                      c.replyCount ? (o(), s("span", bo, "💬 " + l(c.replyCount), 1)) : h("", !0)
                    ]),
                    c.replies?.length ? (o(), s("div", vo, [
                      (o(!0), s(A, null, j(c.replies, (C) => (o(), s("div", {
                        key: C.id,
                        class: "bili-comment-sub-item"
                      }, [
                        e("span", fo, l(C.userName) + ":", 1),
                        ye(We, {
                          text: C.message
                        }, null, 8, ["text"])
                      ]))), 128)),
                      e("div", go, [
                        !c.subRepliesExpanded && (c.replyCount || 0) > c.replies.length ? (o(), s(A, { key: 0 }, [
                          e("span", null, "共 " + l(c.replyCount) + " 条回复，", 1),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: c.subRepliesLoading,
                            onClick: x((C) => d(c.id), ["stop"])
                          }, l(c.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, mo)
                        ], 64)) : c.subRepliesExpanded ? (o(), s(A, { key: 1 }, [
                          c.subRepliesHasMore ? (o(), s("button", {
                            key: 0,
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: c.subRepliesLoading,
                            onClick: x((C) => d(c.id), ["stop"])
                          }, l(c.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, yo)) : h("", !0),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-collapse-btn",
                            onClick: x((C) => p(c.id), ["stop"])
                          }, " 收起 ▴ ", 8, ho)
                        ], 64)) : h("", !0)
                      ])
                    ])) : h("", !0)
                  ])
                ]))), 128))
              ]),
              e("div", ko, [
                D.value ? (o(), s("p", _o, "正在加载更多评论…")) : !le.value && k.value.length ? (o(), s("p", $o, "已显示全部评论")) : h("", !0)
              ])
            ])
          ], 32)
        ])
      ])) : (o(), s("p", wo, "暂无可播放的订阅视频。"))
    ]));
  }
}), xo = /* @__PURE__ */ Ve(Co, [["__scopeId", "data-v-d420748e"]]), So = ["disabled"], To = ["disabled"], Mo = { key: 0 }, Do = ["disabled"], Po = ["disabled"], zo = ["disabled"], Bo = ["disabled"], Io = { class: "bili-sub-add-shell" }, Ro = ["disabled"], Lo = { class: "bili-sub-add-toolbar" }, Eo = { class: "bili-sub-add-groups" }, Ao = ["onClick"], Uo = { class: "bili-sub-add-list" }, Vo = {
  key: 0,
  class: "fo-bili-loading"
}, Fo = {
  key: 1,
  class: "fo-bili-empty"
}, No = {
  key: 2,
  class: "fo-bili-empty"
}, qo = ["disabled", "onClick"], Go = ["src"], Oo = {
  key: 1,
  class: "bili-sub-add-avatar"
}, jo = {
  class: "fo-custom-confirm-modal",
  role: "dialog",
  "aria-modal": "true"
}, Ho = { class: "fo-custom-confirm-head" }, Wo = { class: "fo-custom-confirm-body" }, Ko = { class: "fo-custom-confirm-actions" }, Yo = ["disabled"], Xo = ["disabled"], Qo = /* @__PURE__ */ Re({
  __name: "BiliOrganizerDialogs",
  setup(Te) {
    const m = ne(() => et.create), z = ne(() => et.confirm), y = ne(() => et.channelPicker), R = ne(() => m.value.kind === "bili"), F = ne(() => {
      const a = y.value, _ = a.query.trim().toLowerCase(), k = a.groups.find((T) => T.id === a.activeGroupId), N = k ? new Set(k.mids) : null;
      return a.items.filter((T) => (!N || N.has(T.mid)) && (!_ || T.name.toLowerCase().includes(_) || T.mid.includes(_)));
    });
    function M() {
      const a = m.value.name.trim();
      if (!a) {
        ae.updateCreate({ status: "请输入名称", error: !0 });
        return;
      }
      ae.submitCreate({ name: a, privacy: m.value.privacy });
    }
    return (a, _) => (o(), s(A, null, [
      m.value.open ? (o(), s("dialog", {
        key: 0,
        class: "fo-create-dialog",
        open: "",
        onClick: _[5] || (_[5] = x((k) => r(ae).closeCreate(), ["self"])),
        onCancel: _[6] || (_[6] = x((k) => r(ae).closeCreate(), ["prevent"]))
      }, [
        e("form", {
          onSubmit: x(M, ["prevent"])
        }, [
          e("header", null, [
            e("div", null, [
              _[14] || (_[14] = e("i", { class: "fo-folder-icon" }, null, -1)),
              e("span", null, [
                e("b", null, l(R.value ? "新建 B站收藏夹" : "新建插件分组"), 1),
                e("small", null, l(R.value ? "会同步创建到你的 B站账号" : "只整理左侧收藏夹，不修改 B站数据"), 1)
              ])
            ]),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: m.value.submitting,
              onClick: _[0] || (_[0] = (k) => r(ae).closeCreate())
            }, "×", 8, So)
          ]),
          e("label", null, [
            e("span", null, l(R.value ? "收藏夹名称" : "分组名称"), 1),
            oe(e("input", {
              "onUpdate:modelValue": _[1] || (_[1] = (k) => m.value.name = k),
              maxlength: "48",
              autocomplete: "off",
              placeholder: "输入名称",
              required: "",
              disabled: m.value.submitting,
              autofocus: ""
            }, null, 8, To), [
              [xe, m.value.name]
            ])
          ]),
          R.value ? (o(), s("fieldset", Mo, [
            _[17] || (_[17] = e("legend", null, "可见范围", -1)),
            e("label", null, [
              oe(e("input", {
                "onUpdate:modelValue": _[2] || (_[2] = (k) => m.value.privacy = k),
                type: "radio",
                value: 0,
                disabled: m.value.submitting
              }, null, 8, Do), [
                [
                  st,
                  m.value.privacy,
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
              oe(e("input", {
                "onUpdate:modelValue": _[3] || (_[3] = (k) => m.value.privacy = k),
                type: "radio",
                value: 1,
                disabled: m.value.submitting
              }, null, 8, Po), [
                [
                  st,
                  m.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              _[16] || (_[16] = e("span", null, [
                e("b", null, "私密"),
                e("small", null, "仅自己可见")
              ], -1))
            ])
          ])) : h("", !0),
          e("p", {
            class: L(["fo-create-status", { error: m.value.error }]),
            role: "status"
          }, l(m.value.status), 3),
          e("footer", null, [
            e("button", {
              type: "button",
              disabled: m.value.submitting,
              onClick: _[4] || (_[4] = (k) => r(ae).closeCreate())
            }, "取消", 8, zo),
            e("button", {
              class: "primary",
              type: "submit",
              disabled: m.value.submitting
            }, l(m.value.submitting ? "创建中…" : R.value ? "创建收藏夹" : "创建分组"), 9, Bo)
          ])
        ], 32)
      ], 32)) : h("", !0),
      y.value.open ? (o(), s("dialog", {
        key: 1,
        class: "bili-sub-add-dialog",
        open: "",
        onCancel: _[10] || (_[10] = x((k) => r(ae).closeChannelPicker(), ["prevent"]))
      }, [
        e("div", Io, [
          e("header", null, [
            _[18] || (_[18] = e("div", null, [
              e("b", null, "从我的关注中添加 UP 主"),
              e("small", null, "沿用“正在关注”的本地分组，只能添加已关注的 UP 主")
            ], -1)),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: !!y.value.submittingMid,
              onClick: _[7] || (_[7] = (k) => r(ae).closeChannelPicker())
            }, "×", 8, Ro)
          ]),
          e("div", Lo, [
            e("div", Eo, [
              e("button", {
                type: "button",
                class: L(["bili-sub-add-group", { on: y.value.activeGroupId === "__all__" }]),
                onClick: _[8] || (_[8] = (k) => r(ae).updateChannelPicker({ activeGroupId: "__all__" }))
              }, "全部关注", 2),
              (o(!0), s(A, null, j(y.value.groups, (k) => (o(), s("button", {
                key: k.id,
                type: "button",
                class: L(["bili-sub-add-group", { on: y.value.activeGroupId === k.id }]),
                onClick: (N) => r(ae).updateChannelPicker({ activeGroupId: k.id })
              }, l(k.name), 11, Ao))), 128))
            ]),
            oe(e("input", {
              "onUpdate:modelValue": _[9] || (_[9] = (k) => y.value.query = k),
              type: "search",
              placeholder: "搜索关注的 UP 主"
            }, null, 512), [
              [xe, y.value.query]
            ])
          ]),
          e("div", Uo, [
            y.value.loading ? (o(), s("div", Vo, [..._[19] || (_[19] = [
              e("i", null, null, -1),
              e("span", null, "正在读取关注分组…", -1)
            ])])) : y.value.error ? (o(), s("p", Fo, l(y.value.error), 1)) : F.value.length ? (o(!0), s(A, { key: 3 }, j(F.value, (k) => (o(), s("button", {
              key: k.mid,
              type: "button",
              class: "bili-sub-add-up",
              disabled: k.added || !!y.value.submittingMid,
              onClick: (N) => r(ae).selectChannel(k.mid)
            }, [
              k.face ? (o(), s("img", {
                key: 0,
                src: k.face,
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, Go)) : (o(), s("span", Oo, "UP")),
              e("span", null, [
                e("b", null, l(k.name), 1),
                e("small", null, "UID " + l(k.mid), 1)
              ]),
              e("i", null, l(k.added ? "已添加" : y.value.submittingMid === k.mid ? "添加中…" : "＋ 添加"), 1)
            ], 8, qo))), 128)) : (o(), s("p", No, "该分组中没有匹配的已关注 UP 主。"))
          ])
        ])
      ], 32)) : h("", !0),
      z.value.open ? (o(), s("div", {
        key: 2,
        class: "fo-custom-confirm-overlay",
        onClick: _[13] || (_[13] = x((k) => r(ae).closeConfirm(), ["self"]))
      }, [
        e("div", jo, [
          e("div", Ho, [
            e("h4", null, l(z.value.title), 1)
          ]),
          e("div", Wo, [
            e("p", null, l(z.value.message), 1)
          ]),
          e("div", Ko, [
            e("button", {
              type: "button",
              class: "fo-confirm-btn cancel",
              disabled: z.value.submitting,
              onClick: _[11] || (_[11] = (k) => r(ae).closeConfirm())
            }, l(z.value.cancelText), 9, Yo),
            e("button", {
              type: "button",
              class: L(["fo-confirm-btn confirm", { danger: z.value.danger }]),
              disabled: z.value.submitting,
              onClick: _[12] || (_[12] = (k) => r(ae).submitConfirm())
            }, l(z.value.submitting ? "处理中…" : z.value.confirmText), 11, Xo)
          ])
        ])
      ])) : h("", !0)
    ], 64));
  }
}), Jo = { class: "fo-upg-shell" }, Zo = { class: "fo-upg-body" }, es = { class: "fo-upg-sidebar" }, ts = { class: "fo-upg-sidebar-head" }, is = { class: "fo-upg-group-items" }, os = ["onDragstart", "onDrop", "onClick"], ss = ["onKeydown"], ns = {
  key: 0,
  class: "fo-upg-tree-branch"
}, ls = {
  key: 1,
  class: "fo-folder-icon"
}, as = { class: "fo-upg-group-name" }, rs = { class: "fo-upg-vue-group-actions" }, ds = ["onClick"], us = ["onClick"], cs = ["onClick"], ps = ["placeholder"], bs = {
  key: 1,
  class: "muted small"
}, vs = { class: "fo-upg-main" }, fs = { class: "fo-upg-main-head" }, gs = { class: "fo-upg-main-title" }, ms = { key: 0 }, ys = { class: "fo-upg-head-actions" }, hs = { class: "fo-upg-filter-tabs" }, ks = { class: "fo-upg-batch-wrap" }, _s = { class: "fo-upg-batch-count" }, $s = ["disabled"], ws = ["disabled"], Cs = { class: "fo-upg-toolbar" }, xs = { class: "fo-upg-search" }, Ss = ["disabled"], Ts = {
  key: 0,
  class: "fo-bili-loading"
}, Ms = {
  key: 1,
  class: "fo-bili-empty"
}, Ds = {
  key: 2,
  class: "fo-bili-empty"
}, Ps = {
  key: 3,
  class: "fo-bili-empty"
}, zs = ["title", "onContextmenu", "onClick"], Bs = ["src"], Is = { class: "fo-upg-info" }, Rs = { class: "fo-upg-name" }, Ls = { class: "fo-upg-sign" }, Es = ["disabled", "onClick"], As = {
  key: 1,
  class: "fo-upg-move-wrap"
}, Us = ["disabled"], Vs = { class: "fo-upg-move-dropdown" }, Fs = ["disabled", "onClick"], Ns = { key: 0 }, qs = {
  key: 0,
  class: "muted small",
  style: { padding: "6px 10px" }
}, Gs = ["disabled", "onClick"], Os = { class: "fo-upg-pagination" }, js = { class: "fo-upg-page-info" }, Hs = {
  key: 0,
  class: "fo-upg-page-btns"
}, Ws = ["disabled"], Ks = ["disabled"], Ys = { class: "fo-upg-page-cur" }, Xs = ["disabled"], Qs = ["disabled"], Js = /* @__PURE__ */ Re({
  __name: "BiliUpGroupManager",
  setup(Te) {
    const m = S(void 0), z = S(""), y = S(""), R = S(""), F = S(""), M = S(!1), a = S(/* @__PURE__ */ new Set()), _ = S(null);
    function k($) {
      if ($.button !== 0 || $.target.closest("button,input")) return;
      const d = _.value;
      if (!d) return;
      const p = d.getBoundingClientRect(), I = p.left, X = p.top, ve = $.clientX, we = $.clientY;
      d.style.position = "fixed", d.style.left = `${I}px`, d.style.top = `${X}px`, d.style.right = "auto", d.style.bottom = "auto", d.style.margin = "0", d.style.transform = "none";
      const Me = (de) => {
        const Pe = de.clientX - ve, ze = de.clientY - we, Be = Math.max(8, Math.min(window.innerWidth - 120, I + Pe)), Fe = Math.max(8, Math.min(window.innerHeight - 80, X + ze));
        d.style.left = `${Be}px`, d.style.top = `${Fe}px`;
      }, De = () => {
        window.removeEventListener("pointermove", Me), window.removeEventListener("pointerup", De);
      };
      window.addEventListener("pointermove", Me), window.addEventListener("pointerup", De);
    }
    const N = ne(() => f.groups.find(($) => $.id === f.activeGroupId) || null), T = ne(() => {
      const $ = f.query.trim().toLowerCase(), d = f.activeGroupId;
      return f.followings.filter((p) => {
        if ($ && !p.name.toLowerCase().includes($) && !p.sign.toLowerCase().includes($) && !p.mid.includes($)) return !1;
        const I = p.groupIds.includes(d);
        return f.filter === "ingroup" ? I : f.onlyUngrouped ? !p.groupIds || p.groupIds.length === 0 : !0;
      });
    }), D = ne(() => Math.max(1, Math.ceil(T.value.length / f.pageSize))), q = ne(() => {
      const d = (Math.min(f.page, D.value) - 1) * f.pageSize;
      return T.value.slice(d, d + f.pageSize);
    }), le = ne(() => f.followings.filter(($) => $.groupIds.length === 0).length), H = S(null), Y = /* @__PURE__ */ new Map();
    function ie($) {
      const d = Math.max(1, Math.min(D.value, $));
      f.page = d, H.value && (H.value.scrollTop = 0);
    }
    he(() => [f.query, f.filter, f.onlyUngrouped], () => {
      f.page = 1, H.value && (H.value.scrollTop = 0);
    }), he(() => f.activeGroupId, ($, d) => {
      if (d && H.value) {
        const X = `${d}_${f.filter}_${f.onlyUngrouped}`;
        Y.set(X, {
          page: f.page,
          scrollTop: H.value.scrollTop
        });
      }
      if (f.filter === "all")
        return;
      const p = `${$}_${f.filter}_${f.onlyUngrouped}`, I = Y.get(p);
      I ? (f.page = Math.min(I.page, D.value), tt(() => {
        H.value && (H.value.scrollTop = I.scrollTop);
      })) : (f.page = 1, tt(() => {
        H.value && (H.value.scrollTop = 0);
      }));
    }), he(D, ($) => {
      f.page > $ && (f.page = $);
    }), he(M, ($) => {
      $ || a.value.clear();
    });
    function pe($) {
      m.value = $, z.value = "";
    }
    function ke() {
      m.value = void 0, z.value = "";
    }
    function re() {
      const $ = z.value.trim();
      $ && (ue.dispatch("create-group", { name: $, parentId: m.value || "" }), ke());
    }
    function b($) {
      y.value = $.id, R.value = $.name;
    }
    function se() {
      const $ = R.value.trim();
      y.value && $ && ue.dispatch("rename-group", { id: y.value, name: $ }), y.value = "", R.value = "";
    }
    function Z($, d) {
      F.value = d, $.dataTransfer?.setData("application/x-logicweaver-up-group", d), $.dataTransfer && ($.dataTransfer.effectAllowed = "move");
    }
    function ee($, d) {
      const p = $.dataTransfer?.getData("application/x-logicweaver-up-group") || F.value;
      if (F.value = "", !p || p === d) return;
      const I = $.currentTarget?.getBoundingClientRect(), X = I ? $.clientY - I.top : 0, ve = I ? X < I.height * 0.25 ? "before" : X > I.height * 0.75 ? "after" : "into" : "into";
      ue.dispatch("move-group", { sourceId: p, targetId: d, mode: ve });
    }
    function Q($) {
      const d = $.dataTransfer?.getData("application/x-logicweaver-up-group") || F.value;
      F.value = "", d && ue.dispatch("move-group", { sourceId: d, targetId: "", mode: "root" });
    }
    function be($, d) {
      !d || f.busyMid || ue.dispatch("toggle-member", { groupId: d, mid: $ });
    }
    function B($) {
      !f.activeGroupId || f.busyMid || ue.dispatch("toggle-member", { groupId: f.activeGroupId, mid: $ });
    }
    function v($, d) {
      ue.dispatch("preview-up", { mid: d, clientX: $.clientX, clientY: $.clientY });
    }
    function G($) {
      const d = a.value;
      d.has($) ? d.delete($) : d.add($);
    }
    function K() {
      if (!f.activeGroupId || f.busyMid) return;
      const $ = Array.from(a.value);
      if (!$.length) return;
      const d = $.filter((p) => {
        const I = f.followings.find((X) => X.mid === p);
        return I && !I.groupIds.includes(f.activeGroupId);
      });
      if (d.length) {
        for (const p of d)
          ue.dispatch("toggle-member", { groupId: f.activeGroupId, mid: p });
        a.value.clear();
      }
    }
    function _e() {
      if (!f.activeGroupId || f.busyMid) return;
      const $ = Array.from(a.value);
      if (!$.length) return;
      const d = $.filter((p) => {
        const I = f.followings.find((X) => X.mid === p);
        return I && I.groupIds.includes(f.activeGroupId);
      });
      if (d.length) {
        for (const p of d)
          ue.dispatch("toggle-member", { groupId: f.activeGroupId, mid: p });
        a.value.clear();
      }
    }
    function $e() {
      for (const $ of q.value) a.value.add($.mid);
    }
    return ($, d) => r(f).open ? (o(), s("dialog", {
      key: 0,
      ref_key: "dialogEl",
      ref: _,
      class: "fo-up-group-dialog",
      open: "",
      onCancel: d[20] || (d[20] = x((p) => r(ue).close(), ["prevent"]))
    }, [
      e("div", Jo, [
        e("header", {
          class: "fo-upg-head",
          onPointerdown: k
        }, [
          d[21] || (d[21] = e("h3", null, [
            e("span", null, "👥"),
            ce(" 关注分组与 UP 主管理")
          ], -1)),
          e("button", {
            type: "button",
            class: "fo-upg-close-btn",
            "aria-label": "关闭",
            title: "关闭管理面板",
            onClick: d[0] || (d[0] = (p) => r(ue).close())
          }, "✕")
        ], 32),
        e("div", Zo, [
          e("aside", es, [
            e("div", ts, [
              d[22] || (d[22] = e("span", null, "我的分组", -1)),
              e("button", {
                type: "button",
                onClick: d[1] || (d[1] = (p) => pe(null))
              }, "＋ 新建")
            ]),
            e("div", is, [
              e("div", {
                class: "fo-upg-root-dropzone",
                onDragover: d[2] || (d[2] = x(() => {
                }, ["prevent"])),
                onDrop: x(Q, ["prevent"])
              }, "⇣ 拖至此处变为顶级分组", 32),
              m.value === null ? (o(), s("form", {
                key: 0,
                class: "fo-upg-create-box",
                onSubmit: x(re, ["prevent"])
              }, [
                oe(e("input", {
                  "onUpdate:modelValue": d[3] || (d[3] = (p) => z.value = p),
                  maxlength: "20",
                  placeholder: "输入分组名称…",
                  autofocus: ""
                }, null, 512), [
                  [xe, z.value]
                ]),
                e("div", { class: "fo-upg-create-btns" }, [
                  e("button", {
                    type: "button",
                    class: "cancel",
                    onClick: ke
                  }, "取消"),
                  d[23] || (d[23] = e("button", {
                    class: "confirm",
                    type: "submit"
                  }, "确定", -1))
                ])
              ], 32)) : h("", !0),
              (o(!0), s(A, null, j(r(f).groups, (p) => (o(), s(A, {
                key: p.id
              }, [
                e("div", {
                  class: L(["fo-upg-group-item", { on: p.id === r(f).activeGroupId, "is-subgroup": p.depth > 0 }]),
                  style: Se({ paddingLeft: `${8 + p.depth * 18}px` }),
                  draggable: "true",
                  onDragstart: (I) => Z(I, p.id),
                  onDragover: d[7] || (d[7] = x(() => {
                  }, ["prevent"])),
                  onDrop: x((I) => ee(I, p.id), ["prevent"]),
                  onClick: (I) => r(f).activeGroupId = p.id
                }, [
                  y.value === p.id ? (o(), s(A, { key: 0 }, [
                    oe(e("input", {
                      "onUpdate:modelValue": d[4] || (d[4] = (I) => R.value = I),
                      class: "fo-upg-rename-input",
                      maxlength: "20",
                      onClick: d[5] || (d[5] = x(() => {
                      }, ["stop"])),
                      onKeydown: Ie(x(se, ["prevent"]), ["enter"])
                    }, null, 40, ss), [
                      [xe, R.value]
                    ]),
                    e("button", {
                      type: "button",
                      onClick: x(se, ["stop"])
                    }, "✓"),
                    e("button", {
                      type: "button",
                      onClick: d[6] || (d[6] = x((I) => y.value = "", ["stop"]))
                    }, "✕")
                  ], 64)) : (o(), s(A, { key: 1 }, [
                    p.depth ? (o(), s("span", ns, "↳")) : (o(), s("i", ls)),
                    e("span", as, l(p.name), 1),
                    e("small", null, l(p.upMids.length), 1),
                    e("span", rs, [
                      e("button", {
                        type: "button",
                        title: "添加子分组",
                        onClick: x((I) => pe(p.id), ["stop"])
                      }, "＋", 8, ds),
                      e("button", {
                        type: "button",
                        title: "重命名",
                        onClick: x((I) => b(p), ["stop"])
                      }, "✎", 8, us),
                      e("button", {
                        type: "button",
                        class: "danger",
                        title: "删除",
                        onClick: x((I) => r(ue).dispatch("delete-group", p.id), ["stop"])
                      }, "×", 8, cs)
                    ])
                  ], 64))
                ], 46, os),
                m.value === p.id ? (o(), s("form", {
                  key: 0,
                  class: "fo-upg-create-box",
                  style: Se({ marginLeft: `${18 + p.depth * 18}px` }),
                  onSubmit: x(re, ["prevent"])
                }, [
                  oe(e("input", {
                    "onUpdate:modelValue": d[8] || (d[8] = (I) => z.value = I),
                    maxlength: "20",
                    placeholder: `输入「${p.name}」的子分组名称…`,
                    autofocus: ""
                  }, null, 8, ps), [
                    [xe, z.value]
                  ]),
                  e("div", { class: "fo-upg-create-btns" }, [
                    e("button", {
                      type: "button",
                      class: "cancel",
                      onClick: ke
                    }, "取消"),
                    d[24] || (d[24] = e("button", {
                      class: "confirm",
                      type: "submit"
                    }, "确定", -1))
                  ])
                ], 36)) : h("", !0)
              ], 64))), 128)),
              !r(f).groups.length && !r(f).loading ? (o(), s("p", bs, '暂无分组，请点击"＋ 新建"。')) : h("", !0)
            ])
          ]),
          e("section", vs, [
            e("div", fs, [
              e("div", gs, [
                e("h4", null, l(N.value ? `分组：「${N.value.name}」` : "请先选择或新建分组"), 1),
                N.value ? (o(), s("span", ms, "（本组 " + l(N.value.upMids.length) + " 位 · 共 " + l(r(f).followings.length) + " 位关注 · 未分组 " + l(le.value) + " 位）", 1)) : h("", !0)
              ]),
              e("div", ys, [
                e("div", hs, [
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-filter-tab", { on: r(f).filter === "all" }]),
                    onClick: d[9] || (d[9] = (p) => r(f).filter = "all")
                  }, "全部关注", 2),
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-filter-tab", { on: r(f).filter === "ingroup" }]),
                    onClick: d[10] || (d[10] = (p) => r(f).filter = "ingroup")
                  }, "本组已加", 2)
                ]),
                e("div", ks, [
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-batch-toggle", { on: M.value }]),
                    onClick: d[11] || (d[11] = (p) => M.value = !M.value)
                  }, l(M.value ? "退出批量" : "批量操作"), 3),
                  M.value && a.value.size > 0 ? (o(), s(A, { key: 0 }, [
                    e("span", _s, "已选 " + l(a.value.size), 1),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action add",
                      disabled: !N.value,
                      onClick: K
                    }, "＋ 加入本组", 8, $s),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action remove",
                      disabled: !N.value,
                      onClick: _e
                    }, "− 移出本组", 8, ws),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: $e
                    }, "全选当页"),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: d[12] || (d[12] = (p) => a.value.clear())
                    }, "清除")
                  ], 64)) : h("", !0)
                ]),
                r(f).filter === "all" ? (o(), s("label", {
                  key: 0,
                  class: L(["fo-upg-switch", { on: r(f).onlyUngrouped }])
                }, [
                  oe(e("input", {
                    "onUpdate:modelValue": d[13] || (d[13] = (p) => r(f).onlyUngrouped = p),
                    type: "checkbox"
                  }, null, 512), [
                    [yt, r(f).onlyUngrouped]
                  ]),
                  d[25] || (d[25] = e("span", { class: "fo-upg-switch-track" }, [
                    e("span", { class: "fo-upg-switch-thumb" })
                  ], -1)),
                  d[26] || (d[26] = e("span", { class: "fo-upg-switch-text" }, "仅未分组 UP", -1))
                ], 2)) : h("", !0)
              ])
            ]),
            e("div", Cs, [
              e("div", xs, [
                d[27] || (d[27] = e("span", null, "🔍", -1)),
                oe(e("input", {
                  "onUpdate:modelValue": d[14] || (d[14] = (p) => r(f).query = p),
                  type: "search",
                  placeholder: "搜索关注的 UP 主…"
                }, null, 512), [
                  [xe, r(f).query]
                ])
              ]),
              e("button", {
                type: "button",
                class: "fo-upg-refresh-btn",
                disabled: r(f).refreshing,
                onClick: d[15] || (d[15] = (p) => r(ue).dispatch("refresh"))
              }, l(r(f).refreshing ? "刷新中…" : "↻ 刷新关注"), 9, Ss)
            ]),
            e("div", {
              ref_key: "listRef",
              ref: H,
              class: "fo-upg-list"
            }, [
              r(f).loading ? (o(), s("div", Ts, [...d[28] || (d[28] = [
                e("i", null, null, -1),
                e("span", null, "正在加载关注的 UP 主列表…", -1)
              ])])) : r(f).error ? (o(), s("p", Ms, l(r(f).error), 1)) : N.value ? q.value.length ? (o(!0), s(A, { key: 4 }, j(q.value, (p) => (o(), s("article", {
                key: p.mid,
                class: L(["fo-upg-card", { selected: M.value && a.value.has(p.mid) }]),
                title: `右键查看「${p.name}」近期投稿`,
                onContextmenu: x((I) => v(I, p.mid), ["prevent"]),
                onClick: (I) => M.value ? G(p.mid) : void 0
              }, [
                e("img", {
                  src: p.face,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, Bs),
                e("div", Is, [
                  e("div", Rs, l(p.name), 1),
                  e("div", Ls, l(p.sign || "暂无签名"), 1)
                ]),
                M.value ? (o(), s("div", {
                  key: 1,
                  class: L(["fo-upg-batch-check", { checked: a.value.has(p.mid) }])
                }, l(a.value.has(p.mid) ? "✓" : ""), 3)) : (o(), s(A, { key: 0 }, [
                  p.groupIds.includes(r(f).activeGroupId) ? (o(), s("button", {
                    key: 0,
                    type: "button",
                    class: "fo-upg-toggle-btn in-group",
                    disabled: r(f).busyMid === p.mid,
                    onClick: x((I) => B(p.mid), ["stop"])
                  }, l(r(f).busyMid === p.mid ? "处理中…" : `移出 ${N.value?.name || ""}`), 9, Es)) : p.groupIds.length > 0 ? (o(), s("div", As, [
                    e("button", {
                      type: "button",
                      class: "fo-upg-toggle-btn belongs-other fo-upg-move-trigger",
                      disabled: r(f).busyMid === p.mid
                    }, l(r(f).busyMid === p.mid ? "处理中…" : `📁 ${p.groupName || "已分组"}`), 9, Us),
                    e("div", Vs, [
                      d[30] || (d[30] = e("div", { class: "fo-upg-move-title" }, "移动到分组", -1)),
                      (o(!0), s(A, null, j(r(f).groups, (I) => (o(), s("button", {
                        key: I.id,
                        type: "button",
                        class: L(["fo-upg-move-item", { active: p.groupIds.includes(I.id) }]),
                        disabled: r(f).busyMid === p.mid,
                        onClick: x((X) => be(p.mid, I.id), ["stop"])
                      }, [
                        d[29] || (d[29] = e("i", { class: "fo-folder-icon small" }, null, -1)),
                        e("span", null, l(I.name), 1),
                        p.groupIds.includes(I.id) ? (o(), s("small", Ns, "✓ 已加入")) : h("", !0)
                      ], 10, Fs))), 128)),
                      r(f).groups.length ? h("", !0) : (o(), s("p", qs, "暂无分组"))
                    ])
                  ])) : r(f).activeGroupId ? (o(), s("button", {
                    key: 2,
                    type: "button",
                    class: "fo-upg-toggle-btn",
                    disabled: r(f).busyMid === p.mid,
                    onClick: x((I) => B(p.mid), ["stop"])
                  }, l(r(f).busyMid === p.mid ? "处理中…" : "＋ 加入"), 9, Gs)) : h("", !0)
                ], 64))
              ], 42, zs))), 128)) : (o(), s("p", Ps, "没有符合条件的 UP 主。")) : (o(), s("p", Ds, "请先新建或选择一个分组。"))
            ], 512),
            e("div", Os, [
              e("div", js, "共 " + l(T.value.length) + " 位 UP 主 · 每页 " + l(r(f).pageSize) + " 位", 1),
              D.value > 1 ? (o(), s("div", Hs, [
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(f).page <= 1,
                  onClick: d[16] || (d[16] = (p) => ie(1))
                }, "« 首页", 8, Ws),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(f).page <= 1,
                  onClick: d[17] || (d[17] = (p) => ie(r(f).page - 1))
                }, "‹ 上一页", 8, Ks),
                e("span", Ys, l(r(f).page) + " / " + l(D.value), 1),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(f).page >= D.value,
                  onClick: d[18] || (d[18] = (p) => ie(r(f).page + 1))
                }, "下一页 ›", 8, Xs),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(f).page >= D.value,
                  onClick: d[19] || (d[19] = (p) => ie(D.value))
                }, "末页 »", 8, Qs)
              ])) : h("", !0)
            ])
          ])
        ])
      ])
    ], 544)) : h("", !0);
  }
}), Zs = /* @__PURE__ */ Ve(Js, [["__scopeId", "data-v-9e5aa70a"]]), en = ["title"], tn = { class: "tape-capsule-text" }, on = { class: "capsule-title" }, sn = { class: "capsule-sub" }, nn = ["title"], ln = { class: "tape-deck-drop-slot" }, an = {
  key: 1,
  class: "tape-insert-feedback-chip"
}, rn = { class: "tape-loaded-title" }, dn = { class: "tape-body-content" }, un = ["title", "onKeydown"], cn = { class: "tape-cassette" }, pn = { class: "tape-center-label" }, bn = { class: "tape-sticker-head" }, vn = ["title"], fn = ["src"], gn = { class: "tape-badge-row" }, mn = { class: "tape-brand-text" }, yn = { class: "tape-series-header" }, hn = { class: "tape-series-title-group" }, kn = { class: "tape-series-count-pill" }, _n = { class: "tape-series-list-scroll" }, $n = ["onClick"], wn = { class: "tape-series-item-left" }, Cn = { class: "tape-series-item-info" }, xn = ["title"], Sn = { class: "tape-series-item-count" }, Tn = {
  key: 0,
  class: "tape-series-playing-tag"
}, Mn = {
  key: 1,
  class: "tape-series-play-action"
}, Dn = {
  key: 0,
  class: "tape-series-empty"
}, Pn = {
  class: "tape-transport-controls",
  role: "group",
  "aria-label": "电台播放控制"
}, zn = ["title", "aria-label"], Bn = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, In = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, Rn = { class: "tape-playback-section" }, Ln = { class: "tape-time-lyric-row" }, En = { class: "tape-timestamp" }, An = { class: "tape-lyric-container" }, Un = ["title"], Vn = ["title", "aria-label"], Fn = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Nn = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, qn = {
  key: 2,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Gn = ["aria-valuenow"], On = {
  class: "tape-waveform-row",
  "aria-hidden": "true"
}, jn = {
  class: "tape-waveform-svg",
  viewBox: "0 0 160 16",
  preserveAspectRatio: "none"
}, Hn = ["x", "y", "height"], Wn = /* @__PURE__ */ Re({
  __name: "BiliRadioTapePlayer",
  props: {
    dockSide: { type: Boolean, default: !1 }
  },
  setup(Te) {
    const m = Te, z = [
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
    ], y = S(!1), R = S(null), F = S(!1), M = S(!1), a = S(""), _ = S(!1), k = S(!1);
    function N(B) {
      B.stopPropagation(), k.value = !k.value, k.value && Je.init();
    }
    async function T(B) {
      k.value = !1, await Je.playSeries(B, 0);
    }
    function D(B) {
      if (!k.value) return;
      const v = B.target;
      !v?.closest(".tape-series-popover") && !v?.closest(".tape-cassette-wrap") && (k.value = !1);
    }
    function q(B) {
      B.key === "Escape" && k.value && (k.value = !1);
    }
    const le = ne(() => O.mode === "one" ? "单曲循环" : O.mode === "shuffle" ? "乱序播放" : "顺序播放"), H = S(380);
    function Y() {
      if (typeof document > "u" || !m.dockSide) return;
      const B = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock"), v = 20, G = 16;
      if (B) {
        const _e = B.getBoundingClientRect();
        if (_e.left > 80) {
          const $e = Math.floor(_e.left - v - G);
          if ($e > 220) {
            H.value = $e;
            return;
          }
        }
      }
      const K = typeof window < "u" ? window.innerWidth : 1280;
      H.value = Math.max(220, Math.floor(K / 2 - 230));
    }
    let ie = null;
    function pe() {
      clearTimeout(ie), ie = setTimeout(Y, 60);
    }
    Ke(() => {
      if (Je.init(), typeof window < "u" && (window.addEventListener("pointerdown", D), window.addEventListener("keydown", q)), m.dockSide) {
        Y(), window.addEventListener("resize", pe);
        const B = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
        if (B && typeof ResizeObserver < "u") {
          const v = new ResizeObserver(() => Y());
          v.observe(B), B.__bili_dock_ro = v;
        }
      }
    }), ut(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", D), window.removeEventListener("keydown", q), window.removeEventListener("resize", pe));
      const B = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
      B && B.__bili_dock_ro && (B.__bili_dock_ro.disconnect(), delete B.__bili_dock_ro);
    });
    function ke(B) {
      B.preventDefault(), F.value = !0;
    }
    function re(B) {
      B.preventDefault(), B.dataTransfer && (B.dataTransfer.dropEffect = "copy"), F.value = !0;
    }
    function b(B) {
      const v = B.currentTarget, G = B.relatedTarget;
      (!G || !v.contains(G)) && (F.value = !1);
    }
    function se(B) {
      B.preventDefault(), F.value = !1;
      const v = B.dataTransfer;
      if (!v) return;
      let G = v.getData("application/x-bili-cassette") || v.getData("application/json"), K = null;
      if (G)
        try {
          K = JSON.parse(G);
        } catch {
        }
      if (!K?.bvid) {
        const $e = (v.getData("text/plain") || v.getData("text/uri-list") || v.getData("application/x-logicweaver-video-url"))?.match(/BV[0-9a-zA-Z]+/);
        $e && (K = {
          bvid: $e[0],
          title: "放入的单曲卡带",
          cover: "",
          author: "Bilibili",
          duration: 0
        });
      }
      K?.bvid && (M.value = !0, a.value = K.title || K.bvid, setTimeout(() => {
        Ee.insertAndPlay(K);
      }, 280), setTimeout(() => {
        M.value = !1;
      }, 1500));
    }
    function Z(B) {
      if (R.value) {
        y.value = !0;
        try {
          B.currentTarget?.setPointerCapture?.(B.pointerId);
        } catch {
        }
        be(B);
      }
    }
    function ee(B) {
      y.value && be(B);
    }
    function Q(B) {
      if (y.value) {
        be(B), y.value = !1;
        try {
          B.currentTarget?.releasePointerCapture?.(B.pointerId);
        } catch {
        }
      }
    }
    function be(B) {
      if (!R.value) return;
      const v = R.value.getBoundingClientRect();
      if (v.width <= 0) return;
      const G = B.clientX - v.left, K = Math.max(0, Math.min(100, G / v.width * 100));
      Ee.seek(K);
    }
    return (B, v) => (o(), s("div", {
      class: L(["bili-tape-deck", {
        "is-playing": r(O).playing,
        "is-drag-over": F.value,
        "is-inserting": M.value,
        "dock-side-mode": m.dockSide,
        "dock-side-collapsed": m.dockSide && _.value
      }]),
      style: Se(m.dockSide && !_.value ? { maxWidth: `${H.value}px` } : void 0),
      onDragenter: ke,
      onDragover: re,
      onDragleave: b,
      onDrop: se
    }, [
      m.dockSide && _.value ? (o(), s("div", {
        key: 0,
        class: "tape-collapsed-capsule",
        title: `电台：${r(O).title || "哔哩哔哩电台"}`
      }, [
        e("div", {
          class: L(["tape-capsule-spool", { spinning: r(O).playing }])
        }, [...v[9] || (v[9] = [
          e("div", { class: "spool-center-dot" }, null, -1)
        ])], 2),
        e("div", tn, [
          e("strong", on, l(r(O).title || "B站电台"), 1),
          e("small", sn, l(r(O).playing ? "♪ 播放中" : "已暂停"), 1)
        ]),
        e("button", {
          type: "button",
          class: "tape-capsule-play-btn",
          title: r(O).playing ? "暂停" : "播放",
          onClick: v[0] || (v[0] = x((G) => r(Ee).togglePlay(), ["stop"]))
        }, l(r(O).playing ? "⏸" : "▶"), 9, nn),
        e("button", {
          type: "button",
          class: "tape-capsule-expand-btn",
          title: "展开完整磁带播放条",
          onClick: v[1] || (v[1] = x((G) => _.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, en)) : h("", !0),
      oe(e("div", ln, [...v[10] || (v[10] = [
        Qe('<div class="slot-visual-frame" data-v-b16560a2><span class="slot-icon-tape" data-v-b16560a2>📼</span><div class="slot-text-col" data-v-b16560a2><strong class="slot-headline" data-v-b16560a2>释放鼠标装填卡带</strong><small class="slot-subline" data-v-b16560a2>拖入视频封面 · 立即播放音乐</small></div></div>', 1)
      ])], 512), [
        [it, F.value]
      ]),
      M.value ? (o(), s("div", an, [
        v[11] || (v[11] = e("span", { class: "tape-click-sound" }, "✓ 已装填", -1)),
        e("span", rn, "《" + l(a.value) + "》", 1)
      ])) : h("", !0),
      oe(e("div", dn, [
        e("div", {
          class: "tape-cassette-wrap",
          role: "button",
          tabindex: "0",
          title: `点击选择电台系列 (已建 ${r(P).radioSeries.length} 个系列 · 也可直接拖拽视频封面至此装填)`,
          onClick: N,
          onKeydown: Ie(x(N, ["prevent"]), ["enter", "space"])
        }, [
          e("div", cn, [
            v[14] || (v[14] = e("div", { class: "tape-spool tape-spool-left" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1)),
            e("div", pn, [
              e("div", bn, [
                r(O).coverUrl ? (o(), s("div", {
                  key: 0,
                  class: "tape-cover-sticker",
                  title: r(O).title
                }, [
                  e("img", {
                    src: r(O).coverUrl,
                    alt: "Cover",
                    referrerpolicy: "no-referrer"
                  }, null, 8, fn)
                ], 8, vn)) : h("", !0),
                e("div", gn, [
                  v[12] || (v[12] = e("span", { class: "side-letter" }, "A", -1)),
                  e("span", mn, l(r(O).seriesName || "CASSETTE"), 1)
                ])
              ]),
              v[13] || (v[13] = e("div", { class: "tape-acrylic-window" }, [
                e("div", { class: "tape-ribbon-bar" }),
                e("div", { class: "tape-scale-marks" }, [
                  e("span", null, "100"),
                  e("span", null, "50"),
                  e("span", null, "0")
                ])
              ], -1))
            ]),
            v[15] || (v[15] = e("div", { class: "tape-spool tape-spool-right" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1))
          ]),
          k.value ? (o(), s("div", {
            key: 0,
            class: "tape-series-popover",
            onClick: v[3] || (v[3] = x(() => {
            }, ["stop"]))
          }, [
            e("div", yn, [
              e("div", hn, [
                v[16] || (v[16] = e("span", { class: "tape-series-icon" }, "📻", -1)),
                v[17] || (v[17] = e("span", { class: "tape-series-title" }, "自建电台系列", -1)),
                e("span", kn, l(r(P).radioSeries.length), 1)
              ]),
              e("button", {
                type: "button",
                class: "tape-series-close-btn",
                title: "关闭",
                "aria-label": "关闭",
                onClick: v[2] || (v[2] = x((G) => k.value = !1, ["stop"]))
              }, " ✕ ")
            ]),
            e("div", _n, [
              (o(!0), s(A, null, j(r(P).radioSeries, (G) => (o(), s("div", {
                key: G.id,
                class: L(["tape-series-item", { "is-active": r(O).seriesName === G.name }]),
                onClick: x((K) => T(G.id), ["stop"])
              }, [
                e("div", wn, [
                  v[18] || (v[18] = e("span", { class: "tape-series-item-bullet" }, "📼", -1)),
                  e("div", Cn, [
                    e("span", {
                      class: "tape-series-item-name",
                      title: G.name
                    }, l(G.name), 9, xn),
                    e("span", Sn, l(G.count) + " 首曲目 · 顺序连播", 1)
                  ])
                ]),
                r(O).seriesName === G.name && r(O).playing ? (o(), s("span", Tn, " 播放中 ")) : (o(), s("span", Mn, " ▶ "))
              ], 10, $n))), 128)),
              r(P).radioSeries.length ? h("", !0) : (o(), s("div", Dn, [...v[19] || (v[19] = [
                e("span", { class: "empty-icon" }, "📂", -1),
                e("span", { class: "empty-text" }, "暂无保存的电台系列", -1),
                e("span", { class: "empty-tip" }, "可在 B站工作区 → 电台 中添加曲目并保存为系列", -1)
              ])]))
            ])
          ])) : h("", !0)
        ], 40, un),
        e("div", Pn, [
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "上一首",
            "aria-label": "上一首",
            onClick: v[4] || (v[4] = (G) => r(Ee).prev())
          }, [...v[20] || (v[20] = [
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
            class: L(["tape-ctrl-btn tape-ctrl-play", { playing: r(O).playing }]),
            title: r(O).playing ? "暂停播放" : "开始播放",
            "aria-label": r(O).playing ? "暂停" : "播放",
            onClick: v[5] || (v[5] = (G) => r(Ee).togglePlay())
          }, [
            r(O).playing ? (o(), s("svg", Bn, [...v[21] || (v[21] = [
              e("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" }, null, -1)
            ])])) : (o(), s("svg", In, [...v[22] || (v[22] = [
              e("path", { d: "M8 5v14l11-7z" }, null, -1)
            ])]))
          ], 10, zn),
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "下一首",
            "aria-label": "下一首",
            onClick: v[6] || (v[6] = (G) => r(Ee).next())
          }, [...v[23] || (v[23] = [
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
        e("div", Rn, [
          e("div", Ln, [
            e("span", En, l(r(O).formattedCurrent) + " / " + l(r(O).formattedDuration), 1),
            e("div", An, [
              e("span", {
                class: "tape-lyric-text",
                title: r(O).lyric
              }, l(r(O).lyric || "♪ 纯音乐 / 伴奏"), 9, Un)
            ]),
            e("button", {
              type: "button",
              class: "tape-mode-btn",
              title: le.value,
              "aria-label": le.value,
              onClick: v[7] || (v[7] = (G) => r(Ee).toggleMode())
            }, [
              r(O).mode === "order" ? (o(), s("svg", Fn, [...v[24] || (v[24] = [
                e("polyline", { points: "17 1 21 5 17 9" }, null, -1),
                e("path", { d: "M3 11V9a4 4 0 0 1 4-4h14" }, null, -1),
                e("polyline", { points: "7 23 3 19 7 15" }, null, -1),
                e("path", { d: "M21 13v2a4 4 0 0 1-4 4H3" }, null, -1)
              ])])) : r(O).mode === "one" ? (o(), s("svg", Nn, [...v[25] || (v[25] = [
                Qe('<polyline points="17 1 21 5 17 9" data-v-b16560a2></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14" data-v-b16560a2></path><polyline points="7 23 3 19 7 15" data-v-b16560a2></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3" data-v-b16560a2></path><text x="12" y="14.5" font-size="7.5" font-weight="900" font-family="system-ui, -apple-system, sans-serif" fill="currentColor" stroke="none" text-anchor="middle" data-v-b16560a2>1</text>', 5)
              ])])) : r(O).mode === "shuffle" ? (o(), s("svg", qn, [...v[26] || (v[26] = [
                Qe('<polyline points="16 3 21 3 21 8" data-v-b16560a2></polyline><line x1="4" y1="20" x2="21" y2="3" data-v-b16560a2></line><polyline points="21 16 21 21 16 21" data-v-b16560a2></polyline><line x1="15" y1="15" x2="21" y2="21" data-v-b16560a2></line><line x1="4" y1="4" x2="9" y2="9" data-v-b16560a2></line>', 5)
              ])])) : h("", !0)
            ], 8, Vn)
          ]),
          e("div", {
            ref_key: "progressLineRef",
            ref: R,
            class: "tape-progress-rail",
            role: "slider",
            "aria-valuenow": r(O).progressPercent,
            "aria-valuemin": "0",
            "aria-valuemax": "100",
            "aria-label": "电台播放进度",
            onPointerdown: Z,
            onPointermove: ee,
            onPointerup: Q,
            onPointercancel: Q
          }, [
            e("div", {
              class: "tape-progress-fill",
              style: Se({ width: `${r(O).progressPercent}%` })
            }, null, 4),
            e("div", {
              class: "tape-progress-handle",
              style: Se({ left: `${r(O).progressPercent}%` })
            }, null, 4)
          ], 40, Gn),
          e("div", On, [
            (o(), s("svg", jn, [
              (o(), s(A, null, j(z, (G, K) => e("rect", {
                key: K,
                class: "wave-bar",
                x: K * 4,
                y: 16 - G * 0.7,
                width: "1.8",
                height: G * 0.7,
                rx: "0.9",
                style: Se({ animationDelay: `${K % 8 * 0.12}s` })
              }, null, 12, Hn)), 64))
            ]))
          ])
        ]),
        m.dockSide ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "tape-dock-collapse-btn",
          title: "收起至左下角小胶囊",
          "aria-label": "收起磁带机",
          onClick: v[8] || (v[8] = x((G) => _.value = !0, ["stop"]))
        }, [...v[27] || (v[27] = [
          e("svg", {
            viewBox: "0 0 24 24",
            width: "11",
            height: "11",
            fill: "currentColor"
          }, [
            e("path", { d: "M19 13H5v-2h14v2z" })
          ], -1)
        ])])) : h("", !0)
      ], 512), [
        [it, !m.dockSide || !_.value]
      ])
    ], 38));
  }
}), dt = /* @__PURE__ */ Ve(Wn, [["__scopeId", "data-v-b16560a2"]]), Kn = ["title"], Yn = {
  key: 2,
  class: "hero-lyric-body"
}, Xn = { class: "hero-lyric-stage" }, Qn = ["title"], Jn = /* @__PURE__ */ Re({
  __name: "BiliVideoLyricDockBar",
  props: {
    inlineHero: { type: Boolean, default: !1 }
  },
  setup(Te) {
    const m = S(340), z = S(!1), y = S(!1), R = S(null);
    function F(N) {
      const T = document.querySelector(".bili-mini-screen video, .bili-sub-screen video");
      T && (T.currentTime = Math.max(0, T.currentTime + N));
    }
    let M = 0, a = 0, _ = "right";
    function k(N, T) {
      T.preventDefault(), T.stopPropagation(), z.value = !0, _ = N, M = T.clientX, a = m.value;
      const D = (le) => {
        if (!z.value) return;
        const H = le.clientX - M, Y = _ === "right" ? a + H : a - H, ie = Math.max(180, Math.min(720, Y));
        m.value = ie;
      }, q = () => {
        z.value = !1, window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", q), window.removeEventListener("pointercancel", q);
        try {
          localStorage.setItem("bili_hero_lyric_width", String(m.value));
        } catch {
        }
      };
      window.addEventListener("pointermove", D), window.addEventListener("pointerup", q), window.addEventListener("pointercancel", q);
    }
    return Ke(() => {
      try {
        const N = localStorage.getItem("bili_hero_lyric_width");
        if (N) {
          const T = parseInt(N, 10);
          Number.isFinite(T) && T >= 180 && T <= 720 && (m.value = T);
        }
      } catch {
      }
    }), (N, T) => (o(), s("aside", {
      ref_key: "barRef",
      ref: R,
      class: L(["bili-hero-lyric-bar", { "is-collapsed": y.value, "is-resizing": z.value }]),
      style: Se(y.value ? void 0 : { width: `${m.value}px` }),
      "aria-label": "视频实时字幕与控制"
    }, [
      y.value ? h("", !0) : (o(), s("div", {
        key: 0,
        class: "lyric-resize-handle handle-left",
        title: "按住向左拉伸宽度",
        onPointerdown: T[0] || (T[0] = (D) => k("left", D))
      }, [...T[7] || (T[7] = [
        e("span", { class: "resize-line" }, null, -1)
      ])], 32)),
      y.value ? (o(), s("div", {
        key: 1,
        class: "hero-lyric-capsule",
        title: `视频台词：${r(P).organizer.heroLyricText || "暂无字幕"} (点击展开)`,
        onClick: T[2] || (T[2] = (D) => y.value = !1)
      }, [
        T[8] || (T[8] = e("span", { class: "capsule-icon" }, "💬", -1)),
        T[9] || (T[9] = e("span", { class: "capsule-text" }, "台词", -1)),
        e("button", {
          type: "button",
          class: "capsule-expand-btn",
          title: "展开台词栏",
          onClick: T[1] || (T[1] = x((D) => y.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, Kn)) : (o(), s("div", Yn, [
        e("div", Xn, [
          e("button", {
            type: "button",
            class: "hero-lyric-seek-btn",
            title: "当前视频后退 5 秒",
            "aria-label": "后退 5 秒",
            onClick: T[3] || (T[3] = (D) => F(-5))
          }, " ‹ "),
          e("strong", {
            class: "hero-lyric-current-text",
            title: r(P).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"
          }, l(r(P).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"), 9, Qn),
          e("button", {
            type: "button",
            class: "hero-lyric-seek-btn",
            title: "当前视频前进 5 秒",
            "aria-label": "前进 5 秒",
            onClick: T[4] || (T[4] = (D) => F(5))
          }, " › ")
        ]),
        e("button", {
          type: "button",
          class: "hero-lyric-collapse-btn",
          title: "收起台词栏",
          "aria-label": "收起台词栏",
          onClick: T[5] || (T[5] = x((D) => y.value = !0, ["stop"]))
        }, [...T[10] || (T[10] = [
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
      y.value ? h("", !0) : (o(), s("div", {
        key: 3,
        class: "lyric-resize-handle handle-right",
        title: "按住向右拉伸宽度",
        onPointerdown: T[6] || (T[6] = (D) => k("right", D))
      }, [...T[11] || (T[11] = [
        e("span", { class: "resize-line" }, null, -1)
      ])], 32))
    ], 6));
  }
}), Zn = /* @__PURE__ */ Ve(Jn, [["__scopeId", "data-v-d0857a88"]]), el = { class: "card-head bili-header-unified-row" }, tl = { class: "bili-header-right" }, il = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, ol = { class: "card-fullscreen-bili-suggest-head" }, sl = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, nl = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, ll = ["onClick", "onContextmenu"], al = { class: "card-fullscreen-bili-thumb" }, rl = ["src"], dl = { key: 0 }, ul = { class: "card-fullscreen-bili-video-copy" }, cl = {
  class: "fm-pane",
  id: "pane-organizer"
}, pl = { id: "fo-body" }, bl = { class: "fo-bili-sidebar" }, vl = ["title"], fl = { class: "fo-sidebar-toggle-title" }, gl = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, ml = ["aria-expanded", "title"], yl = { class: "fo-sidebar-toggle-chevron" }, hl = { class: "fo-sidebar-features-wrap" }, kl = { class: "fo-sidebar-sub-wrap" }, _l = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, $l = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, wl = { class: "fo-sidebar-sub-wrap fo-sidebar-recommend-wrap" }, Cl = { class: "fo-sidebar-sub-wrap fo-sidebar-radio-wrap" }, xl = { class: "fo-sidebar-favorite-hub" }, Sl = {
  key: 0,
  class: "fo-move-target-banner"
}, Tl = {
  class: "fo-bili-folder-list",
  "aria-label": "B站收藏夹"
}, Ml = {
  key: 0,
  class: "fo-bili-section-divider"
}, Dl = ["onDragover", "onDragleave", "onDrop"], Pl = { class: "fo-bili-section-title" }, zl = ["data-folder-id", "data-folder-kind", "draggable", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], Bl = ["aria-expanded", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], Il = {
  class: "fo-group-caret",
  "aria-hidden": "true"
}, Rl = {
  key: 0,
  class: "muted small"
}, Ll = {
  key: 0,
  id: "fo-vue-main",
  class: "fo-bili-main"
}, El = {
  key: 0,
  class: "fo-bili-loading"
}, Al = {
  key: 1,
  class: "fo-bili-empty fo-bili-login-guide"
}, Ul = { class: "fo-bili-login-card" }, Vl = { class: "fo-bili-login-actions" }, Fl = {
  key: 2,
  class: "fo-bili-empty"
}, Nl = { class: "fo-bili-hero fo-hero-persistent" }, ql = { class: "fo-hero-left" }, Gl = ["src"], Ol = {
  key: 1,
  class: "fo-folder-icon"
}, jl = { class: "fo-hero-folder-info" }, Hl = { class: "fo-bili-actions" }, Wl = ["disabled"], Kl = { class: "fo-bili-toolbar" }, Yl = {
  key: 0,
  class: "fo-bili-sort"
}, Xl = ["onClick"], Ql = {
  class: "fo-mini-dock-anchor",
  "aria-label": "视频标签页"
}, Jl = ["title"], Zl = { class: "fo-video-tab-title" }, ea = { class: "fo-video-tab-actions" }, ta = ["title"], ia = {
  key: 2,
  class: "fo-bili-batch-actions"
}, oa = { class: "fo-batch-count" }, sa = { class: "fo-bili-grid" }, na = {
  key: 0,
  class: "fo-bili-empty"
}, la = ["data-batch-id", "onDragstart", "onContextmenu"], aa = { class: "fo-bili-thumb" }, ra = {
  key: 0,
  class: "fo-batch-check",
  title: "选择此视频"
}, da = ["checked", "onChange"], ua = ["href", "onClick"], ca = ["src"], pa = { class: "fo-bili-count" }, ba = { class: "fo-bili-duration" }, va = { class: "fo-bili-title-row" }, fa = ["href", "onClick"], ga = ["aria-expanded", "onClick"], ma = {
  key: 0,
  class: "fo-card-menu"
}, ya = ["onClick"], ha = ["onClick"], ka = ["onClick"], _a = { class: "fo-bili-meta" }, $a = ["onClick"], wa = {
  key: 0,
  class: "fo-pager"
}, Ca = ["disabled"], xa = { class: "fo-page-num" }, Sa = ["disabled"], Ta = {
  key: 1,
  id: "fo-vue-cache-main",
  class: "fo-bili-main"
}, Ma = { class: "fo-bili-hero fo-hero-persistent fo-cached-hero" }, Da = { class: "fo-hero-left" }, Pa = { class: "fo-hero-folder-info" }, za = { class: "fo-bili-actions" }, Ba = {
  key: 0,
  class: "fo-bili-loading"
}, Ia = {
  key: 1,
  class: "fo-bili-grid fo-cached-video-grid"
}, Ra = {
  key: 0,
  class: "fo-bili-empty"
}, La = { class: "fo-bili-thumb" }, Ea = ["onClick"], Aa = ["src"], Ua = { class: "fo-bili-title-row" }, Va = ["onClick"], Fa = ["onClick"], Na = { class: "fo-bili-meta" }, qa = {
  key: 2,
  id: "fo-vue-recommend-main",
  class: "fo-bili-main"
}, Ga = { class: "fo-bili-hero" }, Oa = { class: "fo-bili-heading" }, ja = { class: "fo-feed-hero-title" }, Ha = { class: "fo-feed-badge" }, Wa = { class: "fo-bili-actions" }, Ka = ["disabled"], Ya = { class: "fo-bili-toolbar" }, Xa = { class: "fo-feed-count-tag" }, Qa = {
  key: 0,
  class: "fo-bili-loading"
}, Ja = {
  key: 1,
  class: "fo-bili-empty"
}, Za = {
  key: 2,
  class: "fo-bili-grid"
}, er = {
  key: 0,
  class: "fo-bili-empty"
}, tr = ["onDragstart"], ir = { class: "fo-bili-thumb" }, or = ["href", "onClick"], sr = ["src"], nr = { class: "fo-bili-count" }, lr = { class: "fo-bili-duration" }, ar = { class: "fo-bili-title-row" }, rr = ["href", "onClick"], dr = ["aria-expanded", "onClick"], ur = {
  key: 0,
  class: "fo-card-menu"
}, cr = ["onClick"], pr = ["onClick"], br = ["onClick"], vr = ["onClick"], fr = ["onClick"], gr = { class: "fo-bili-meta" }, mr = ["onClick"], yr = {
  key: 3,
  id: "fo-vue-following-main",
  class: "fo-bili-main"
}, hr = { class: "fo-bili-hero" }, kr = { class: "fo-bili-heading" }, _r = { class: "fo-feed-hero-title" }, $r = { class: "fo-feed-badge" }, wr = { class: "fo-bili-actions" }, Cr = ["disabled"], xr = { class: "fo-up-groups-bar" }, Sr = { class: "fo-up-groups-list" }, Tr = ["onClick"], Mr = { class: "count" }, Dr = { class: "fo-up-groups-actions" }, Pr = {
  key: 0,
  class: "fo-up-members-strip"
}, zr = { class: "fo-up-members-label" }, Br = { class: "fo-up-members-list" }, Ir = ["title", "onClick", "onContextmenu"], Rr = ["src"], Lr = { class: "fo-bili-toolbar" }, Er = { class: "fo-feed-count-tag" }, Ar = {
  key: 1,
  class: "fo-bili-loading"
}, Ur = {
  key: 2,
  class: "fo-bili-empty"
}, Vr = {
  key: 3,
  class: "fo-bili-grid"
}, Fr = {
  key: 0,
  class: "fo-bili-empty"
}, Nr = ["onDragstart"], qr = { class: "fo-bili-thumb" }, Gr = ["href", "onClick"], Or = ["src"], jr = { class: "fo-bili-count" }, Hr = { class: "fo-bili-duration" }, Wr = { class: "fo-bili-title-row" }, Kr = ["href", "onClick"], Yr = ["aria-expanded", "onClick"], Xr = {
  key: 0,
  class: "fo-card-menu"
}, Qr = ["onClick"], Jr = ["onClick"], Zr = ["onClick"], ed = ["onClick"], td = { class: "fo-bili-meta" }, id = ["onClick"], od = { class: "fo-pager" }, sd = ["disabled"], nd = { class: "fo-page-num" }, ld = ["disabled"], ad = {
  key: 4,
  id: "fo-vue-subscription-main",
  class: "fo-bili-main fo-vue-subscription-main"
}, rd = { class: "bili-sub-vue-shell" }, dd = {
  key: 0,
  class: "fo-bili-loading"
}, ud = {
  key: 1,
  class: "fo-bili-empty"
}, cd = {
  key: 2,
  class: "bili-sub-layout bili-sub-vue-layout"
}, pd = {
  key: 5,
  id: "fo-vue-radio-main",
  class: "fo-bili-main fo-vue-radio-main"
}, bd = { class: "fo-bili-hero fo-radio-hero" }, vd = { class: "fo-bili-actions" }, fd = { class: "bili-radio-layout fo-vue-radio-layout" }, gd = { class: "bili-radio-folders" }, md = { id: "bili-radio-folders" }, yd = ["onClick"], hd = {
  key: 0,
  class: "muted small"
}, kd = { class: "bili-radio-library" }, _d = {
  key: 0,
  role: "alert",
  class: "muted small"
}, $d = {
  id: "bili-radio-videos",
  class: "bili-radio-videos"
}, wd = ["title", "onDragstart", "onClick"], Cd = ["src"], xd = { key: 1 }, Sd = {
  key: 0,
  class: "muted small"
}, Td = { class: "bili-radio-editor" }, Md = { class: "bili-radio-name-row" }, Dd = ["placeholder", "onKeydown"], Pd = { class: "bili-radio-btn-group" }, zd = { class: "bili-radio-series-dropdown-wrap" }, Bd = {
  value: "",
  disabled: "",
  selected: ""
}, Id = ["value"], Rd = {
  id: "bili-radio-queue",
  class: "bili-radio-queue",
  "aria-label": "电台播放队列"
}, Ld = ["onClick"], Ed = { class: "bili-radio-queue-no" }, Ad = ["src"], Ud = { key: 1 }, Vd = ["aria-label", "onClick"], Fd = {
  key: 0,
  class: "muted small"
}, Nd = { class: "bili-radio-actions" }, qd = ["disabled"], Gd = ["disabled"], Od = ["title"], jd = {
  key: 2,
  class: "fo-context-divider"
}, Hd = /* @__PURE__ */ Re({
  __name: "BilibiliWorkspace",
  setup(Te) {
    const m = S(!1);
    function z() {
      const n = P.radioSeriesName?.trim();
      if (!n) {
        m.value = !0;
        const t = document.getElementById("bili-radio-name");
        t && t.focus(), je.fetch("哔哩哔哩电台", "请先在输入框中填写系列名称后再保存");
        return;
      }
      m.value = !1, b("radio-save", { name: n });
    }
    async function y() {
      const n = document.getElementById("bili-radio-name");
      n && (n.focus(), n.select(), je.fetch("哔哩哔哩电台", "已聚焦系列名称输入框，直接修改后点击“💾 保存系列”即可"));
    }
    function R(n) {
      const t = n.target, i = t.value;
      if (i) {
        if (i === "__create_new__") {
          b("radio-clear"), P.radioSeriesName = "", je.fetch("哔哩哔哩电台", "已开启新系列创作，请从左侧添加视频"), t.value = "";
          return;
        }
        b("radio-load-series", i);
      }
    }
    function F(n, t) {
      !t.mid && !t.name || Ae.showUpRecentVideosPreview(
        {
          preventDefault: () => n.preventDefault(),
          stopPropagation: () => n.stopPropagation(),
          clientX: n.clientX,
          clientY: n.clientY
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
      Ct.togglePanel();
    }
    const a = ne(() => P.organizer), { active: _ } = _t("daily-bilibili", "/bilibili.html");
    he(() => _.value && a.value.mode === "recommendations", (n) => {
      Ae.setRecommendationsActive(n);
    }, { immediate: !0, flush: "sync" }), he(() => _.value && a.value.mode === "following", (n) => {
      Ae.setFollowingActive(n);
    }, { immediate: !0, flush: "sync" }), he(() => _.value && a.value.mode === "subscription", (n) => {
      Ae.setSubscriptionActive(n);
    }, { immediate: !0, flush: "sync" });
    const k = S(a.value.query), N = S(!1), T = S(!1), D = S(""), q = S({ visible: !1, x: 0, y: 0, video: null, folder: null }), { menuRef: le, style: H } = St({
      visible: () => q.value.visible,
      anchor: () => q.value,
      dismiss: () => {
        q.value.visible = !1;
      }
    }), Y = S(
      typeof localStorage < "u" && localStorage.getItem("bili_sidebar_features_collapsed") === "true"
    );
    function ie() {
      Y.value = !Y.value;
      try {
        localStorage.setItem("bili_sidebar_features_collapsed", String(Y.value));
      } catch {
      }
    }
    function pe() {
      me.bvid && kt.open({
        bvid: me.bvid,
        cid: me.cid,
        title: me.title
      });
    }
    function ke() {
      me.collapsed && He.toggleCollapse(), He.bringToFront();
    }
    function re() {
      He.close();
    }
    he(() => a.value.query, (n) => {
      k.value = n;
    }), he(k, (n) => {
      (!n || !n.trim()) && a.value.query && b("organizer-search", "");
    });
    function b(n, t) {
      Ue.dispatch(n, t);
    }
    function se(n) {
      b(n.group ? "toggle-folder-group" : "select-folder", { id: n.id, kind: n.kind });
    }
    const Z = S(""), ee = S(""), Q = S("before"), be = S(!1);
    function B(n, t) {
      t.kind === "created" && (Z.value = t.id, n.dataTransfer?.setData("application/x-logicweaver-favorite-node", t.id), n.dataTransfer?.setData("text/plain", t.id), n.dataTransfer && (n.dataTransfer.effectAllowed = "move"));
    }
    function v(n, t) {
      if (t.kind !== "created" || !Z.value || Z.value === t.id) return;
      n.preventDefault(), n.dataTransfer && (n.dataTransfer.dropEffect = "move");
      const i = n.currentTarget;
      if (!i) return;
      const u = i.getBoundingClientRect(), E = (n.clientY - u.top) / Math.max(1, u.height), ge = t.group && E > 0.25 && E < 0.75 ? "into" : E >= 0.5 ? "after" : "before";
      ee.value = t.id, Q.value = ge;
    }
    function G(n, t) {
      const i = n.relatedTarget, u = n.currentTarget;
      u && i && u.contains(i) || ee.value === t.id && (ee.value = "");
    }
    function K() {
      Z.value = "", ee.value = "", be.value = !1;
    }
    function _e(n, t) {
      n.preventDefault();
      const i = Z.value || n.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "", u = Q.value || (t.group ? "into" : "after");
      K(), !(!i || i === t.id || t.kind !== "created") && b("move-folder-node", { sourceId: i, targetId: t.id, mode: u });
    }
    function $e(n) {
      Z.value && (n.preventDefault(), n.dataTransfer && (n.dataTransfer.dropEffect = "move"), be.value = !0);
    }
    function $(n) {
      const t = n.relatedTarget, i = n.currentTarget;
      i && t && i.contains(t) || (be.value = !1);
    }
    function d(n) {
      n.preventDefault();
      const t = Z.value || n.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
      K(), t && b("move-folder-node", { sourceId: t, targetId: "root", mode: "into" });
    }
    function p() {
      const n = k.value.trim();
      b("organizer-search", n);
    }
    function I() {
      !k.value.trim() && a.value.query && b("organizer-search", "");
    }
    const X = S(""), ve = S(!1), we = S(!1), Me = S("📺 B站 热门视频推荐"), De = S("回车可在 B站 全网搜索"), de = S([]), Pe = S(null), ze = S([]);
    let Be = 0, Fe = null;
    function Ge(n) {
      if (!n) return null;
      const t = n.bvid || (String(n.param || "").startsWith("BV") ? n.param : "");
      if (!t && !n.aid && !n.id) return null;
      const i = String(n.pic || n.cover || "").replace(/^http:/, "https:"), u = i.startsWith("//") ? `https:${i}` : i, E = String(n.title || "").replace(/<[^>]+>/g, ""), ge = Number(n.duration || 0), ft = ge > 0 ? `${Math.floor(ge / 60)}:${String(ge % 60).padStart(2, "0")}` : String(n.duration || ""), Xe = n.stat?.view || n.play || 0, gt = Number(Xe) >= 1e4 ? `${(Number(Xe) / 1e4).toFixed(1)}万` : String(Number(Xe || 0)), mt = n.owner?.name || n.name || n.author || "UP主";
      return {
        bvid: t,
        aid: String(n.aid || n.id || ""),
        title: E,
        cover: u,
        durationText: ft,
        playText: gt,
        upper: mt
      };
    }
    async function w() {
      if (Me.value = "📺 B站 热门视频推荐", De.value = "回车可在 B站 全网搜索", ve.value = !0, ze.value.length && Date.now() - Be < 9e4) {
        de.value = ze.value;
        return;
      }
      we.value = !0;
      try {
        const t = await (await fetch("https://api.bilibili.com/x/web-interface/index/top/feed/rcmd?ps=8&fresh_idx=1", { credentials: "include" })).json();
        let i = Array.isArray(t.data?.item) ? t.data.item : [];
        if (!i.length) {
          const ge = await (await fetch("https://api.bilibili.com/x/web-interface/popular?ps=8&pn=1", { credentials: "include" })).json();
          i = Array.isArray(ge.data?.list) ? ge.data.list : [];
        }
        const u = i.map(Ge).filter(Boolean);
        ze.value = u, Be = Date.now(), X.value.trim() || (de.value = u);
      } catch {
        de.value = [];
      } finally {
        we.value = !1;
      }
    }
    function g() {
      X.value.trim() ? C(X.value.trim()) : w();
    }
    function c() {
      const n = X.value.trim();
      if (clearTimeout(Fe), !n) {
        w();
        return;
      }
      Fe = setTimeout(() => {
        C(n);
      }, 320);
    }
    async function C(n) {
      ve.value = !0, Me.value = `🔍 “${n}” 的视频`, De.value = "右键可收藏、缓存或本地播放", we.value = !0;
      try {
        let t = null;
        if (window.LogicWeaverBiliSearchActions?.search)
          try {
            t = await window.LogicWeaverBiliSearchActions.search(n);
          } catch {
          }
        if (!t || t.code !== 0) {
          const u = `search_type=video&keyword=${encodeURIComponent(n)}&page=1&page_size=12`;
          t = await (await fetch(`https://api.bilibili.com/x/web-interface/search/type?${u}`, { credentials: "include" })).json();
        }
        if (X.value.trim() !== n) return;
        const i = Array.isArray(t?.data?.result) ? t.data.result : [];
        de.value = i.slice(0, 10).map(Ge).filter(Boolean);
      } catch {
        de.value = [];
      } finally {
        we.value = !1;
      }
    }
    function V(n) {
      ve.value = !1;
      const t = n.bvid || (String(n.param || n.id || "").startsWith("BV") ? n.param || n.id : "");
      t || n.aid ? He.openVideo({
        bvid: t,
        aid: n.aid,
        title: n.title,
        cover: n.cover,
        author: n.upper
      }) : window.LogicWeaverBiliSearchActions?.local ? window.LogicWeaverBiliSearchActions.local(n) : window.open(`https://www.bilibili.com/video/${t || n.bvid || n.id}`, "_blank");
    }
    function U(n, t) {
      Ne(n, {
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
    function W() {
      const n = X.value.trim();
      if (ve.value = !1, !n) {
        w();
        return;
      }
      window.open(`https://search.bilibili.com/video?keyword=${encodeURIComponent(n)}`, "_blank");
    }
    function te(n) {
      Pe.value && !Pe.value.contains(n.target) && (ve.value = !1);
    }
    function J(n) {
      q.value.visible = !1, D.value = D.value === n ? "" : n;
    }
    function Ne(n, t, i = !0) {
      D.value = "", q.value = {
        visible: !0,
        x: n.clientX,
        y: n.clientY,
        video: t,
        folder: i && P.activeFolderId ? { id: String(P.activeFolderId), title: a.value.folderTitle } : null
      };
    }
    function Le(n) {
      if (n instanceof KeyboardEvent) {
        n.key === "Escape" && (D.value = "", q.value.visible = !1, a.value.isTargetPickMode && b("organizer-cancel-move-target"));
        return;
      }
      const t = n.target;
      t?.closest(".fo-card-menu, .fo-card-more") || (D.value = ""), t?.closest(".fo-context-menu") || (q.value.visible = !1);
    }
    const qe = typeof document < "u" && document.body.classList.contains("bili-standalone-body");
    function Oe() {
      !T.value || N.value || a.value.loading || (N.value = !0, b("organizer-open"));
    }
    he(() => a.value.loading, (n) => {
      !n && !a.value.folders.length && Oe();
    }), Ke(() => {
      import("./bilibili-channel.service-BERDRztz.js").catch((n) => console.error("[Bilibili] 频道动作服务加载失败", n)), T.value = !0, Ue.loadOrganizer(), Oe(), document.addEventListener("pointerdown", Le, !0), document.addEventListener("pointerdown", te), window.addEventListener("keydown", Le), window.setBiliMiniDockVisible?.(!0), requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }), he(() => [a.value.videos, a.value.mode], () => {
      requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }, { flush: "post" }), ht(() => {
      Ae.setRecommendationsActive(!1), Ae.setFollowingActive(!1), Ae.setSubscriptionActive(!1), T.value = !1, document.removeEventListener("pointerdown", Le, !0), document.removeEventListener("pointerdown", te), window.removeEventListener("keydown", Le);
    });
    function fe(n, t) {
      D.value = "", q.value.visible = !1;
      const i = String(typeof n == "object" ? n.id || n.bvid || n.aid || "" : n), u = typeof n == "object" ? n : a.value.videos.find((E) => String(E.id) === i);
      b("organizer-video-action", { id: i, video: u, action: t });
    }
    async function Ce(n) {
      const { video: t, folder: i } = q.value;
      if (q.value.visible = !1, n === "share-chat") {
        if (!t) return;
        try {
          const { chatService: u } = await import("./view-styles-BcxK8WCo.js").then((ge) => ge.aK), { windowManagerController: E } = await import("./window-manager.store-DgNn9Rtk.js").then((ge) => ge.n);
          u.sendBiliShare({
            bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
            aid: t.aid,
            title: t.title,
            cover: t.cover,
            upName: t.author,
            upMid: t.authorMid,
            upFace: t.authorFace,
            play: t.playCount
          }), E.open("chat");
        } catch (u) {
          console.warn("分享到聊天室失败", u);
        }
        return;
      }
      t && b("organizer-video-action", { id: t.id || "", video: t, action: n });
    }
    function ct(n) {
      const t = P.radioSeriesName?.trim();
      let i = P.radioSeries.find((u) => u.name === t);
      if (!i && P.radioQueue.length && (i = {
        id: `series_${Date.now()}`,
        name: t || "未命名电台系列",
        count: P.radioQueue.length,
        items: P.radioQueue
      }), !i || !i.items?.length) {
        je.fetch("哔哩哔哩电台", "当前没有可分享的系列曲目，请先添加曲目");
        return;
      }
      at.sendBiliSeriesShare(i, n);
    }
    function pt(n) {
      const { video: t } = q.value;
      q.value.visible = !1, t && at.sendBiliShare({
        bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
        aid: t.aid,
        title: t.title,
        cover: t.cover,
        upName: t.author,
        upMid: t.authorMid,
        upFace: t.authorFace,
        play: t.playCount
      }, n);
    }
    function bt(n) {
      if (!a.value.isTargetPickMode) return;
      if (!n.target?.closest(".fo-bili-folder-list")) {
        const i = document.querySelector(".fo-bili-folder-list");
        i && (n.preventDefault(), i.scrollTop += n.deltaY);
      }
    }
    function ot(n) {
      const t = document.createElement("div");
      return t.style.position = "fixed", t.style.top = "-9999px", t.style.left = "-9999px", t.style.width = "144px", t.style.height = "50px", t.style.borderRadius = "6px", t.style.backgroundColor = "#1e1e24", t.style.border = "2px solid #eab308", t.style.boxShadow = "0 8px 24px rgba(0,0,0,0.6), inset 0 0 12px rgba(234,179,8,0.25)", t.style.display = "flex", t.style.alignItems = "center", t.style.padding = "4px 8px", t.style.gap = "8px", t.style.color = "#fff", t.style.fontFamily = "sans-serif", t.style.zIndex = "999999", t.style.pointerEvents = "none", t.innerHTML = `
    <div style="width:26px;height:26px;border-radius:50%;border:1.5px solid #d4d4d8;display:flex;align-items:center;justify-content:center;background:#09090b;box-shadow:inset 0 1px 3px rgba(0,0,0,0.5);">
      <span style="display:block;width:7px;height:7px;background:#eab308;border-radius:50%;"></span>
    </div>
    <div style="flex:1;min-width:0;overflow:hidden;line-height:1.2;">
      <div style="font-size:7.5px;font-weight:900;color:#eab308;letter-spacing:1px;">CASSETTE TAPE</div>
      <div style="font-size:10px;font-weight:700;color:#f4f4f5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${n || "B站音乐卡带"}</div>
    </div>
    <div style="width:26px;height:26px;border-radius:50%;border:1.5px solid #d4d4d8;display:flex;align-items:center;justify-content:center;background:#09090b;box-shadow:inset 0 1px 3px rgba(0,0,0,0.5);">
      <span style="display:block;width:7px;height:7px;background:#eab308;border-radius:50%;"></span>
    </div>
  `, document.body.appendChild(t), t;
    }
    function Ye(n, t) {
      if (!n.dataTransfer) return;
      n.dataTransfer.effectAllowed = "copyMove", n.dataTransfer.setData("text/uri-list", t.url), n.dataTransfer.setData("text/plain", t.url), n.dataTransfer.setData("application/x-logicweaver-video-url", t.url), n.dataTransfer.setData("application/x-logicweaver-task", JSON.stringify({ type: "material", title: t.title, url: t.url, source: "B站收藏" }));
      const i = t.bvid || t.url?.match(/video\/(BV[0-9a-zA-Z]+)/)?.[1] || t.id, u = JSON.stringify({
        type: "bili-cassette-tape",
        bvid: i,
        title: t.title,
        cover: t.cover,
        author: t.author,
        duration: t.duration
      });
      n.dataTransfer.setData("application/x-bili-cassette", u), n.dataTransfer.setData("application/json", u);
      const E = ot(t.title);
      n.dataTransfer.setDragImage(E, 72, 25), setTimeout(() => {
        E.parentNode && E.parentNode.removeChild(E);
      }, 0);
    }
    function vt(n, t) {
      if (!n.dataTransfer) return;
      n.dataTransfer.effectAllowed = "copyMove";
      const i = JSON.stringify({
        type: "bili-cassette-tape",
        bvid: t.bvid,
        title: t.title,
        cover: t.cover,
        author: t.author,
        duration: t.duration
      });
      n.dataTransfer.setData("application/x-bili-cassette", i), n.dataTransfer.setData("application/json", i), n.dataTransfer.setData("text/plain", `https://www.bilibili.com/video/${t.bvid}`);
      const u = ot(t.title);
      n.dataTransfer.setDragImage(u, 72, 25), setTimeout(() => {
        u.parentNode && u.parentNode.removeChild(u);
      }, 0);
    }
    return (n, t) => (o(), s("section", {
      id: "daily-bilibili",
      class: L(["card wide", { "card-fullscreen": r(qe) || r(Ze).activeId === "daily-bilibili" }])
    }, [
      e("header", el, [
        t[51] || (t[51] = e("div", { class: "bili-header-left" }, [
          e("span", {
            class: "bar",
            style: { background: "linear-gradient(180deg,#818cf8,#f472b6)" }
          }),
          e("h2", null, "B站收藏夹")
        ], -1)),
        e("div", tl, [
          e("button", {
            id: "bili-header-msg-center-btn",
            class: L(["fm-tab bili-header-msg-btn", { "is-active": r(xt).isOpen }]),
            type: "button",
            title: "B站消息中心 (纯浏览模式)",
            onClick: M
          }, [...t[49] || (t[49] = [
            e("span", { class: "bili-header-msg-icon" }, "🔔", -1),
            e("span", { class: "bili-header-msg-label" }, "消息", -1)
          ])], 2),
          e("div", {
            class: "card-fullscreen-bili-search",
            ref_key: "searchHostRef",
            ref: Pe
          }, [
            e("form", {
              class: "card-fullscreen-bili-searchbar",
              role: "search",
              onSubmit: x(W, ["prevent"])
            }, [
              oe(e("input", {
                "onUpdate:modelValue": t[0] || (t[0] = (i) => X.value = i),
                type: "search",
                autocomplete: "off",
                placeholder: "搜索 B站 视频…",
                "aria-label": "搜索 B站 视频",
                onFocus: g,
                onInput: c
              }, null, 544), [
                [xe, X.value]
              ]),
              t[50] || (t[50] = e("button", {
                type: "submit",
                title: "搜索视频"
              }, "⌕", -1))
            ], 32),
            ve.value ? (o(), s("div", il, [
              e("div", ol, [
                e("span", null, l(Me.value), 1),
                e("small", null, l(De.value), 1)
              ]),
              we.value ? (o(), s("p", sl, "正在获取推荐 / 搜索中…")) : !de.value.length && !we.value ? (o(), s("p", nl, "没有找到相关视频，回车可在 B站 全网搜索")) : (o(!0), s(A, { key: 2 }, j(de.value, (i) => (o(), s("button", {
                key: i.bvid || i.aid,
                type: "button",
                class: "card-fullscreen-bili-video-row",
                role: "option",
                onClick: (u) => V(i),
                onContextmenu: x((u) => U(u, i), ["prevent"])
              }, [
                e("span", al, [
                  e("img", {
                    src: i.cover,
                    alt: "",
                    referrerpolicy: "no-referrer",
                    loading: "lazy"
                  }, null, 8, rl),
                  i.durationText ? (o(), s("i", dl, l(i.durationText), 1)) : h("", !0)
                ]),
                e("span", ul, [
                  e("strong", null, l(i.title), 1),
                  e("small", null, l(i.upper) + " · " + l(i.playText) + "播放", 1)
                ])
              ], 40, ll))), 128))
            ])) : h("", !0)
          ], 512),
          e("button", {
            id: "bili-up-group-manager-top",
            class: "fm-tab bili-header-up-group-btn",
            type: "button",
            title: "管理正在关注的 UP 主分组",
            onClick: t[1] || (t[1] = (i) => b("manage-up-groups"))
          }, " ⚙ 关注分组管理 ")
        ])
      ]),
      e("div", cl, [
        e("div", pl, [
          e("div", {
            class: L(["fo-bili-layout", { "fo-picking-move-target": a.value.isTargetPickMode }]),
            "data-vue-organizer-shell": "true",
            onWheel: bt
          }, [
            e("aside", bl, [
              e("div", {
                class: L(["fo-sidebar-toggle-bar", { "is-collapsed": Y.value }]),
                title: Y.value ? "点击展开快捷功能" : "点击收起快捷功能",
                onClick: ie
              }, [
                e("div", fl, [
                  t[52] || (t[52] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                  t[53] || (t[53] = e("span", null, "快捷频道", -1)),
                  Y.value ? (o(), s("span", gl, "5")) : h("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "fo-sidebar-toggle-action",
                  "aria-expanded": !Y.value,
                  title: Y.value ? "展开" : "收起"
                }, [
                  e("span", null, l(Y.value ? "展开" : "收起"), 1),
                  e("span", yl, l(Y.value ? "▾" : "▴"), 1)
                ], 8, ml)
              ], 10, vl),
              oe(e("div", hl, [
                e("div", kl, [
                  e("button", {
                    id: "fo-sidebar-sub-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: a.value.mode === "subscription" }]),
                    title: "查看订阅视频（刹那观察室 · AI字幕与高清播放）",
                    onClick: t[2] || (t[2] = (i) => b("open-sub-video"))
                  }, [...t[54] || (t[54] = [
                    e("div", { class: "fo-sidebar-sub-main" }, [
                      e("span", { class: "fo-sidebar-sub-icon" }, "🎬"),
                      e("div", { class: "fo-sidebar-sub-text" }, [
                        e("strong", null, "订阅视频"),
                        e("small", null, "刹那观察室 · AI字幕")
                      ])
                    ], -1),
                    e("span", { class: "fo-sidebar-sub-badge" }, "NEW", -1)
                  ])], 2)
                ]),
                e("div", _l, [
                  e("button", {
                    id: "fo-sidebar-cache-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: a.value.mode === "cache" }]),
                    title: "查看已经下载到本地文件夹的视频",
                    onClick: t[3] || (t[3] = (i) => b("open-cache"))
                  }, [...t[55] || (t[55] = [
                    e("div", { class: "fo-sidebar-sub-main" }, [
                      e("span", { class: "fo-sidebar-sub-icon" }, "💾"),
                      e("div", { class: "fo-sidebar-sub-text" }, [
                        e("strong", null, "缓存视频"),
                        e("small", null, "本地文件夹 · 离线观看")
                      ])
                    ], -1),
                    e("span", { class: "fo-sidebar-sub-badge" }, "LOCAL", -1)
                  ])], 2)
                ]),
                e("div", $l, [
                  e("button", {
                    id: "fo-sidebar-following-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: a.value.mode === "following" }]),
                    title: "查看正在关注的 UP 主及分组视频",
                    onClick: t[4] || (t[4] = (i) => b("open-following"))
                  }, [...t[56] || (t[56] = [
                    e("div", { class: "fo-sidebar-sub-main" }, [
                      e("span", { class: "fo-sidebar-sub-icon" }, "📺"),
                      e("div", { class: "fo-sidebar-sub-text" }, [
                        e("strong", null, "正在关注"),
                        e("small", null, "UP 主分组 · 最新投稿")
                      ])
                    ], -1),
                    e("span", { class: "fo-sidebar-sub-badge" }, "FEED", -1)
                  ])], 2)
                ]),
                e("div", wl, [
                  e("button", {
                    id: "fo-sidebar-recommend-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: a.value.mode === "recommendations" }]),
                    title: "打开 B站个性推荐",
                    onClick: t[5] || (t[5] = (i) => b("open-recommendations"))
                  }, [...t[57] || (t[57] = [
                    e("div", { class: "fo-sidebar-sub-main" }, [
                      e("span", { class: "fo-sidebar-sub-icon" }, "✨"),
                      e("div", { class: "fo-sidebar-sub-text" }, [
                        e("strong", null, "个性推荐"),
                        e("small", null, "猜你喜欢 · 每次刷新")
                      ])
                    ], -1),
                    e("span", { class: "fo-sidebar-sub-badge" }, "FOR YOU", -1)
                  ])], 2)
                ]),
                e("div", Cl, [
                  e("button", {
                    id: "fo-sidebar-radio-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: a.value.mode === "radio" }]),
                    title: "打开 B站电台（按收藏夹与系列自由编排连播）",
                    onClick: t[6] || (t[6] = (i) => b("open-radio"))
                  }, [...t[58] || (t[58] = [
                    e("div", { class: "fo-sidebar-sub-main" }, [
                      e("span", { class: "fo-sidebar-sub-icon" }, "📻"),
                      e("div", { class: "fo-sidebar-sub-text" }, [
                        e("strong", null, "B站电台"),
                        e("small", null, "连播系列 · 自由编排")
                      ])
                    ], -1),
                    e("span", { class: "fo-sidebar-sub-badge" }, "RADIO", -1)
                  ])], 2)
                ])
              ], 512), [
                [it, !Y.value]
              ]),
              e("div", xl, [
                t[59] || (t[59] = e("div", { class: "fo-sidebar-sub-main" }, [
                  e("span", { class: "fo-sidebar-sub-icon" }, "📁"),
                  e("div", { class: "fo-sidebar-sub-text" }, [
                    e("strong", null, "收藏夹"),
                    e("small", null, "按本地分组展示")
                  ])
                ], -1)),
                e("button", {
                  class: "fo-sidebar-hub-add",
                  type: "button",
                  title: "新建 B站真实收藏夹",
                  "aria-label": "新建 B站真实收藏夹",
                  onClick: t[7] || (t[7] = (i) => b("create-bili-folder"))
                }, "＋")
              ]),
              a.value.isTargetPickMode ? (o(), s("div", Sl, [
                t[60] || (t[60] = e("div", { class: "fo-move-target-tip" }, [
                  e("span", { class: "fo-move-target-dot" }),
                  e("span", null, [
                    ce("请点击"),
                    e("strong", null, "自建收藏夹"),
                    ce("移入")
                  ])
                ], -1)),
                e("button", {
                  type: "button",
                  class: "fo-move-target-cancel",
                  title: "取消移动 (按 Esc 也可取消)",
                  onClick: t[8] || (t[8] = (i) => b("organizer-cancel-move-target"))
                }, " ✕ 取消 ")
              ])) : h("", !0),
              e("nav", Tl, [
                (o(!0), s(A, null, j(a.value.folders, (i, u) => (o(), s(A, {
                  key: `${i.group ? "group" : "folder"}:${i.id}`
                }, [
                  u > 0 && a.value.folders[u - 1]?.kind !== i.kind ? (o(), s("div", Ml)) : h("", !0),
                  u === 0 || a.value.folders[u - 1]?.kind !== i.kind ? (o(), s("div", {
                    key: 1,
                    class: L(["fo-bili-section-head fo-vue-section-head", { "drag-into": i.kind === "created" && be.value }]),
                    onDragover: (E) => i.kind === "created" ? $e(E) : void 0,
                    onDragleave: (E) => i.kind === "created" ? $(E) : void 0,
                    onDrop: (E) => i.kind === "created" ? d(E) : void 0
                  }, [
                    e("span", Pl, [
                      e("b", null, l(i.kind === "collected" ? "我追的合集/收藏夹" : i.kind === "other" ? "其他收藏" : "我创建的收藏夹"), 1)
                    ]),
                    i.kind === "created" ? (o(), s("button", {
                      key: 0,
                      class: "fo-bili-section-add-btn",
                      type: "button",
                      title: "新建插件分组",
                      "aria-label": "新建插件分组",
                      onClick: t[9] || (t[9] = x((E) => b("create-local-group"), ["stop"]))
                    }, "＋")) : h("", !0)
                  ], 42, Dl)) : h("", !0),
                  i.group ? (o(), s("div", {
                    key: 3,
                    class: L(["fo-bili-group-label", {
                      collapsed: i.collapsed,
                      dragging: Z.value === i.id,
                      "drag-before": ee.value === i.id && Q.value === "before",
                      "drag-after": ee.value === i.id && Q.value === "after",
                      "drag-into": ee.value === i.id && Q.value === "into"
                    }]),
                    style: Se({ "--fo-depth": i.depth }),
                    role: "button",
                    tabindex: "0",
                    "aria-expanded": !i.collapsed,
                    draggable: !0,
                    onClick: (E) => se(i),
                    onKeydown: [
                      Ie(x((E) => se(i), ["prevent"]), ["enter"]),
                      Ie(x((E) => se(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (E) => B(E, i),
                    onDragover: (E) => v(E, i),
                    onDragleave: (E) => G(E, i),
                    onDrop: (E) => _e(E, i),
                    onDragend: K
                  }, [
                    e("i", Il, l(i.collapsed ? "›" : "⌄"), 1),
                    t[62] || (t[62] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, Bl)) : (o(), s("div", {
                    key: 2,
                    role: "button",
                    tabindex: "0",
                    class: L(["fo-bili-folder", {
                      on: i.selected,
                      dragging: Z.value === i.id,
                      "drag-before": ee.value === i.id && Q.value === "before",
                      "drag-after": ee.value === i.id && Q.value === "after",
                      "drag-into": ee.value === i.id && Q.value === "into",
                      "target-candidate": a.value.isTargetPickMode && i.kind === "created" && !i.selected
                    }]),
                    "data-folder-id": i.id,
                    "data-folder-kind": i.kind,
                    style: Se({ "--fo-depth": i.depth }),
                    draggable: i.kind === "created",
                    onClick: (E) => se(i),
                    onKeydown: [
                      Ie(x((E) => se(i), ["prevent"]), ["enter"]),
                      Ie(x((E) => se(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (E) => B(E, i),
                    onDragover: (E) => v(E, i),
                    onDragleave: (E) => G(E, i),
                    onDrop: (E) => _e(E, i),
                    onDragend: K
                  }, [
                    t[61] || (t[61] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, zl))
                ], 64))), 128)),
                !a.value.loading && !a.value.error && !a.value.folders.length ? (o(), s("p", Rl, "暂无可用收藏夹。")) : h("", !0)
              ])
            ]),
            a.value.mode === "organizer" ? (o(), s("section", Ll, [
              a.value.loading ? (o(), s("div", El, [...t[63] || (t[63] = [
                e("i", null, null, -1),
                e("span", null, "正在读取 B站收藏内容…", -1)
              ])])) : a.value.error && a.value.error.includes("未登录") ? (o(), s("div", Al, [
                e("div", Ul, [
                  t[65] || (t[65] = e("span", { class: "fo-bili-login-icon" }, "📺", -1)),
                  t[66] || (t[66] = e("h3", null, "未检测到哔哩哔哩登录状态", -1)),
                  t[67] || (t[67] = e("p", null, "tab-Project 直接复用当前浏览器的 B站 网页会话，无需输入账号密码或扫码授权。", -1)),
                  e("div", Vl, [
                    t[64] || (t[64] = e("a", {
                      class: "fo-bili-btn-login",
                      href: "https://passport.bilibili.com/login",
                      target: "_blank",
                      rel: "noreferrer"
                    }, "前往 bilibili.com 登录 ↗", -1)),
                    e("button", {
                      type: "button",
                      class: "fo-bili-btn-refresh",
                      onClick: t[10] || (t[10] = (i) => b("organizer-refresh"))
                    }, "已登录，点击刷新 ↻")
                  ])
                ])
              ])) : a.value.error ? (o(), s("p", Fl, l(a.value.error), 1)) : (o(), s(A, { key: 3 }, [
                e("header", Nl, [
                  e("div", ql, [
                    e("div", {
                      class: L(["fo-bili-cover", { "fo-vue-cover-image": a.value.folderCover }])
                    }, [
                      a.value.folderCover ? (o(), s("img", {
                        key: 0,
                        src: a.value.folderCover,
                        alt: "",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Gl)) : (o(), s("i", Ol))
                    ], 2),
                    e("div", jl, [
                      e("h3", null, l(a.value.folderTitle), 1),
                      e("p", null, l(a.value.folderSubtitle), 1)
                    ])
                  ]),
                  ye(Zn, { "inline-hero": "" }),
                  e("div", Hl, [
                    e("button", {
                      type: "button",
                      class: "primary",
                      disabled: !a.value.videos.length,
                      onClick: t[11] || (t[11] = (i) => b("organizer-batch-toggle"))
                    }, l(a.value.batchMode ? "返回" : "批量操作"), 9, Wl),
                    e("button", {
                      type: "button",
                      title: "刷新收藏夹",
                      onClick: t[12] || (t[12] = (i) => b("organizer-refresh"))
                    }, "↻")
                  ])
                ]),
                e("div", Kl, [
                  a.value.batchMode ? h("", !0) : (o(), s("div", Yl, [
                    (o(), s(A, null, j([{ id: "fav_time", text: "最近收藏" }, { id: "view", text: "最多播放" }, { id: "pubtime", text: "最近投稿" }], (i) => e("button", {
                      key: i.id,
                      type: "button",
                      class: L({ on: a.value.sort === i.id }),
                      onClick: (u) => b("organizer-sort", i.id)
                    }, l(i.text), 11, Xl)), 64))
                  ])),
                  e("div", Ql, [
                    r(me).isOpen && r(me).bvid ? (o(), s("div", {
                      key: 0,
                      class: L(["fo-video-tab-item", { "is-collapsed": r(me).collapsed }]),
                      title: r(me).title
                    }, [
                      e("div", {
                        class: "fo-video-tab-meta",
                        onClick: ke
                      }, [
                        e("span", {
                          class: L(["fo-video-tab-pulse", { playing: r(me).isPlaying }])
                        }, null, 2),
                        e("span", Zl, l(r(me).title), 1)
                      ]),
                      e("div", ea, [
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-close",
                          title: "关闭视频",
                          onClick: x(re, ["stop"])
                        }, " ✕ "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-sub",
                          title: "查看该视频完整纯文本字幕",
                          onClick: x(pe, ["stop"])
                        }, " 字幕 "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-expand",
                          title: r(me).collapsed ? "放大恢复视频小窗" : "聚焦视频小窗",
                          onClick: x(ke, ["stop"])
                        }, " 放大 ", 8, ta)
                      ])
                    ], 10, Jl)) : h("", !0)
                  ]),
                  a.value.batchMode ? (o(), s("div", ia, [
                    e("span", oa, "已选择 " + l(a.value.selectedCount) + " 项", 1),
                    e("button", {
                      type: "button",
                      onClick: t[14] || (t[14] = (i) => b("organizer-batch-all"))
                    }, "全选/取消全选"),
                    e("button", {
                      type: "button",
                      class: L({ "picking-target": a.value.isTargetPickMode }),
                      onClick: t[15] || (t[15] = (i) => a.value.isTargetPickMode ? b("organizer-cancel-move-target") : b("organizer-batch-move"))
                    }, l(a.value.isTargetPickMode ? "✕ 取消移动" : "移动到"), 3),
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
                    onSubmit: x(p, ["prevent"])
                  }, [
                    oe(e("input", {
                      "onUpdate:modelValue": t[13] || (t[13] = (i) => k.value = i),
                      type: "search",
                      placeholder: "请输入关键词",
                      "aria-label": "搜索当前收藏夹",
                      onInput: I,
                      onSearch: I
                    }, null, 544), [
                      [xe, k.value]
                    ]),
                    t[68] || (t[68] = e("button", {
                      type: "submit",
                      title: "搜索"
                    }, "⌕", -1))
                  ], 32))
                ]),
                e("div", sa, [
                  a.value.videos.length ? h("", !0) : (o(), s("p", na, l(a.value.query ? "没有找到匹配的视频。" : "这个收藏夹是空的。"), 1)),
                  (o(!0), s(A, null, j(a.value.videos, (i) => (o(), s("article", {
                    key: i.id,
                    class: L(["fo-bili-card", { "batch-selected": i.selected, "fo-single-moving": a.value.movingVideoId === i.id }]),
                    "data-batch-id": i.id,
                    draggable: "true",
                    onDragstart: (u) => Ye(u, i),
                    onContextmenu: x((u) => Ne(u, i), ["prevent", "stop"])
                  }, [
                    e("div", aa, [
                      a.value.batchMode ? (o(), s("label", ra, [
                        e("input", {
                          type: "checkbox",
                          checked: i.selected,
                          onChange: (u) => b("organizer-batch-select", i.id)
                        }, null, 40, da),
                        t[69] || (t[69] = e("span", null, "✓", -1))
                      ])) : h("", !0),
                      e("a", {
                        class: "fo-cover-link",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: x((u) => b("organizer-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, ca)
                      ], 8, ua),
                      e("span", pa, "▣ " + l(i.playCount), 1),
                      e("span", ba, l(i.duration), 1)
                    ]),
                    e("div", va, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: x((u) => b("organizer-play-video", i), ["prevent"])
                      }, l(i.title), 9, fa),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": D.value === i.id,
                        onClick: x((u) => J(i.id), ["stop"])
                      }, "⋮", 8, ga),
                      D.value === i.id ? (o(), s("div", ma, [
                        i.writable ? (o(), s("button", {
                          key: 0,
                          type: "button",
                          class: "danger",
                          onClick: (u) => fe(i.id, "delete")
                        }, "取消收藏", 8, ya)) : h("", !0),
                        i.writable ? (o(), s("button", {
                          key: 1,
                          type: "button",
                          onClick: (u) => fe(i.id, "move")
                        }, "移动到", 8, ha)) : h("", !0),
                        e("button", {
                          type: "button",
                          onClick: (u) => fe(i.id, "subtitle")
                        }, "字幕", 8, ka)
                      ])) : h("", !0)
                    ]),
                    e("div", _a, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: x((u) => F(u, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, l(i.author), 9, $a),
                      e("span", null, "收藏于 " + l(i.favoriteDate), 1)
                    ])
                  ], 42, la))), 128))
                ]),
                a.value.totalPages > 1 ? (o(), s("div", wa, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: a.value.page <= 1,
                    onClick: t[18] || (t[18] = (i) => b("organizer-page", a.value.page - 1))
                  }, "‹ 上一页", 8, Ca),
                  e("span", xa, l(a.value.page) + " / " + l(a.value.totalPages), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: a.value.page >= a.value.totalPages,
                    onClick: t[19] || (t[19] = (i) => b("organizer-page", a.value.page + 1))
                  }, "下一页 ›", 8, Sa)
                ])) : h("", !0)
              ], 64))
            ])) : a.value.mode === "cache" ? (o(), s("section", Ta, [
              e("header", Ma, [
                e("div", Da, [
                  t[71] || (t[71] = e("div", { class: "fo-bili-cover" }, "💾", -1)),
                  e("div", Pa, [
                    t[70] || (t[70] = e("h3", null, "缓存视频", -1)),
                    e("p", null, l(a.value.cachedVideos.length) + " 个缓存记录 · 存放目录可在设置中选择", 1)
                  ])
                ]),
                e("div", za, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    onClick: t[20] || (t[20] = (i) => b("organizer-open"))
                  }, "返回收藏夹"),
                  e("button", {
                    type: "button",
                    onClick: t[21] || (t[21] = (i) => b("cache-open-settings"))
                  }, "缓存设置")
                ])
              ]),
              a.value.cacheLoading ? (o(), s("div", Ba, [...t[72] || (t[72] = [
                e("i", null, null, -1),
                e("span", null, "正在读取本地缓存…", -1)
              ])])) : (o(), s("div", Ia, [
                a.value.cachedVideos.length ? h("", !0) : (o(), s("p", Ra, "还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。")),
                (o(!0), s(A, null, j(a.value.cachedVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card fo-cached-video-card"
                }, [
                  e("div", La, [
                    e("button", {
                      class: "fo-cached-play",
                      type: "button",
                      onClick: (u) => b("cache-play", i.id)
                    }, [
                      e("img", {
                        loading: "lazy",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, Aa),
                      t[73] || (t[73] = e("span", { class: "fo-cached-local-badge" }, "LOCAL", -1))
                    ], 8, Ea)
                  ]),
                  e("div", Ua, [
                    e("button", {
                      class: "fo-title-link fo-bili-title fo-cached-title",
                      type: "button",
                      onClick: (u) => b("cache-play", i.id)
                    }, l(i.title), 9, Va),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "删除缓存",
                      onClick: (u) => b("cache-delete", i.id)
                    }, "×", 8, Fa)
                  ]),
                  e("div", Na, [
                    e("span", null, l(i.sizeText), 1),
                    e("span", null, "缓存于 " + l(i.cachedDate), 1)
                  ])
                ]))), 128))
              ]))
            ])) : a.value.mode === "recommendations" ? (o(), s("section", qa, [
              e("header", Ga, [
                t[74] || (t[74] = e("div", { class: "fo-bili-cover fo-vue-recommend-cover" }, [
                  e("span", null, "✨")
                ], -1)),
                e("div", Oa, [
                  e("div", ja, [
                    e("h3", null, l(a.value.specialTitle), 1),
                    e("span", Ha, l(a.value.specialBadge), 1)
                  ]),
                  e("p", null, l(a.value.specialSubtitle), 1)
                ]),
                e("div", Wa, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !a.value.specialVideos.length,
                    onClick: t[22] || (t[22] = (i) => b("special-play-page"))
                  }, "▶ 播放本页", 8, Ka),
                  e("button", {
                    type: "button",
                    onClick: t[23] || (t[23] = (i) => b("recommendations-refresh"))
                  }, "↻ 换一批"),
                  e("button", {
                    type: "button",
                    onClick: t[24] || (t[24] = (i) => b("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", Ya, [
                t[75] || (t[75] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "🔥 猜你喜欢与热门精选")
                ], -1)),
                e("div", Xa, "本页共 " + l(a.value.specialVideos.length) + " 个视频", 1)
              ]),
              a.value.specialLoading ? (o(), s("div", Qa, [...t[76] || (t[76] = [
                e("i", null, null, -1),
                e("span", null, "正在加载个性化推荐视频…", -1)
              ])])) : a.value.specialError ? (o(), s("p", Ja, l(a.value.specialError), 1)) : (o(), s("div", Za, [
                a.value.specialVideos.length ? h("", !0) : (o(), s("p", er, "暂无推荐视频。")),
                (o(!0), s(A, null, j(a.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (u) => Ye(u, i)
                }, [
                  e("div", ir, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: x((u) => b("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                        alt: ""
                      }, null, 8, sr)
                    ], 8, or),
                    e("span", nr, "▣ " + l(i.playCount), 1),
                    e("span", lr, l(i.duration), 1)
                  ]),
                  e("div", ar, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: x((u) => b("special-play-video", i), ["prevent"])
                    }, l(i.title), 9, rr),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": D.value === i.id,
                      onClick: x((u) => J(i.id), ["stop"])
                    }, "⋮", 8, dr),
                    D.value === i.id ? (o(), s("div", ur, [
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { video: i, id: i.id, action: "collect-inbox" }), D.value = "";
                        }
                      }, "📥 添加到收集箱", 8, cr),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { id: i.id, action: "play" }), D.value = "";
                        }
                      }, "本地播放与评论", 8, pr),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { id: i.id, action: "subtitle" }), D.value = "";
                        }
                      }, "字幕提取", 8, br),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { id: i.id, action: "cache" }), D.value = "";
                        }
                      }, "缓存视频", 8, vr),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { id: i.id, action: "open" }), D.value = "";
                        }
                      }, "打开网页", 8, fr)
                    ])) : h("", !0)
                  ]),
                  e("div", gr, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: x((u) => F(u, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, l(i.author), 9, mr),
                    e("span", null, l(i.favoriteDate), 1)
                  ])
                ], 40, tr))), 128))
              ]))
            ])) : a.value.mode === "following" ? (o(), s("section", yr, [
              e("header", hr, [
                t[77] || (t[77] = e("div", { class: "fo-bili-cover fo-vue-following-cover" }, [
                  e("span", null, "📺")
                ], -1)),
                e("div", kr, [
                  e("div", _r, [
                    e("h3", null, l(a.value.specialTitle), 1),
                    e("span", $r, l(a.value.specialBadge), 1)
                  ]),
                  e("p", null, l(a.value.specialSubtitle), 1)
                ]),
                e("div", wr, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !a.value.specialVideos.length,
                    onClick: t[25] || (t[25] = (i) => b("special-play-page"))
                  }, "▶ 播放本页", 8, Cr),
                  e("button", {
                    type: "button",
                    onClick: t[26] || (t[26] = (i) => b("following-refresh"))
                  }, "↻"),
                  e("button", {
                    type: "button",
                    onClick: t[27] || (t[27] = (i) => b("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", xr, [
                e("div", Sr, [
                  (o(!0), s(A, null, j(a.value.followingGroups, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: L(["fo-up-group-chip", { active: i.active }]),
                    onClick: (u) => b("following-group", i.id)
                  }, [
                    ce(l(i.child ? "↳ " : "") + l(i.name) + " ", 1),
                    e("small", Mr, l(i.count), 1)
                  ], 10, Tr))), 128))
                ]),
                e("div", Dr, [
                  e("button", {
                    type: "button",
                    onClick: t[28] || (t[28] = (i) => b("following-manage-groups", "create"))
                  }, "＋ 新建分组"),
                  e("button", {
                    type: "button",
                    onClick: t[29] || (t[29] = (i) => b("following-manage-groups", "manage"))
                  }, "⚙️ 管理分组")
                ])
              ]),
              a.value.followingMembers.length ? (o(), s("div", Pr, [
                e("div", zr, [
                  e("b", null, l(a.value.specialBadge), 1),
                  e("small", null, "共 " + l(a.value.followingMembers.length) + " 位 UP 主", 1)
                ]),
                e("div", Br, [
                  e("button", {
                    type: "button",
                    class: L(["fo-up-member-chip", { active: !a.value.followingMembers.some((i) => i.active) }]),
                    onClick: t[30] || (t[30] = (i) => b("following-member", ""))
                  }, "全部UP", 2),
                  (o(!0), s(A, null, j(a.value.followingMembers, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: L(["fo-up-member-chip", { active: i.active }]),
                    title: `左键筛选「${i.name}」，右键预览近期投稿`,
                    onClick: (u) => b("following-member", i.id),
                    onContextmenu: x((u) => b("following-preview-member", { id: i.id, clientX: u.clientX, clientY: u.clientY }), ["prevent"])
                  }, [
                    i.face ? (o(), s("img", {
                      key: 0,
                      loading: "lazy",
                      referrerpolicy: "no-referrer",
                      src: i.face,
                      alt: ""
                    }, null, 8, Rr)) : h("", !0),
                    e("span", null, l(i.name), 1)
                  ], 42, Ir))), 128))
                ]),
                e("button", {
                  type: "button",
                  class: "fo-btn-manage-members",
                  onClick: t[31] || (t[31] = (i) => b("following-manage-groups", "members"))
                }, "＋ 管理成员")
              ])) : h("", !0),
              e("div", Lr, [
                t[78] || (t[78] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "⚡ UP 主最新投稿动态")
                ], -1)),
                e("div", Er, "本页共 " + l(a.value.specialVideos.length) + " 个视频", 1)
              ]),
              a.value.specialLoading ? (o(), s("div", Ar, [...t[79] || (t[79] = [
                e("i", null, null, -1),
                e("span", null, "正在读取关注 UP 主更新…", -1)
              ])])) : a.value.specialError ? (o(), s("p", Ur, l(a.value.specialError), 1)) : (o(), s("div", Vr, [
                a.value.specialVideos.length ? h("", !0) : (o(), s("p", Fr, "暂无最新关注视频动态。")),
                (o(!0), s(A, null, j(a.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (u) => Ye(u, i)
                }, [
                  e("div", qr, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: x((u) => b("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, Or)
                    ], 8, Gr),
                    e("span", jr, "▣ " + l(i.playCount), 1),
                    e("span", Hr, l(i.duration), 1)
                  ]),
                  e("div", Wr, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: x((u) => b("special-play-video", i), ["prevent"])
                    }, l(i.title), 9, Kr),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": D.value === i.id,
                      onClick: x((u) => J(i.id), ["stop"])
                    }, "⋮", 8, Yr),
                    D.value === i.id ? (o(), s("div", Xr, [
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { video: i, id: i.id, action: "play" }), D.value = "";
                        }
                      }, "本地播放与评论", 8, Qr),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { video: i, id: i.id, action: "subtitle" }), D.value = "";
                        }
                      }, "字幕提取", 8, Jr),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { video: i, id: i.id, action: "cache" }), D.value = "";
                        }
                      }, "缓存视频", 8, Zr),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { video: i, id: i.id, action: "open" }), D.value = "";
                        }
                      }, "打开网页", 8, ed)
                    ])) : h("", !0)
                  ]),
                  e("div", td, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: x((u) => F(u, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, l(i.author), 9, id),
                    e("span", null, l(i.favoriteDate), 1)
                  ])
                ], 40, Nr))), 128))
              ])),
              e("div", od, [
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: a.value.specialLoading || a.value.specialPage <= 1,
                  onClick: t[32] || (t[32] = (i) => b("following-page", a.value.specialPage - 1))
                }, "‹ 上一页", 8, sd),
                e("span", nd, "第 " + l(a.value.specialPage) + " 页", 1),
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: a.value.specialLoading || !a.value.followingHasMore,
                  onClick: t[33] || (t[33] = (i) => b("following-page", a.value.specialPage + 1))
                }, "下一页 ›", 8, ld)
              ])
            ])) : a.value.mode === "subscription" ? (o(), s("section", ad, [
              e("div", rd, [
                ye(ti, { "show-back": "" }),
                a.value.subscriptionLoading ? (o(), s("div", dd, [...t[80] || (t[80] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取订阅视频与 AI 字幕稿…", -1)
                ])])) : a.value.subscriptionError ? (o(), s("p", ud, "读取失败：" + l(a.value.subscriptionError), 1)) : (o(), s("div", cd, [
                  ye(xo),
                  ye(Ci)
                ]))
              ])
            ])) : a.value.mode === "radio" ? (o(), s("section", pd, [
              e("header", bd, [
                t[81] || (t[81] = e("div", { class: "fo-hero-left" }, [
                  e("div", { class: "fo-bili-cover fo-vue-radio-cover" }, [
                    e("span", null, "📻")
                  ]),
                  e("div", { class: "fo-hero-folder-info" }, [
                    e("h3", null, "B站电台"),
                    e("p", null, "从左侧选择收藏夹，将视频拖拽或添加到连播队列，自由编排系列随心听")
                  ])
                ], -1)),
                e("div", vd, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    onClick: t[34] || (t[34] = (i) => b("radio-refresh"))
                  }, "↻ 刷新电台"),
                  e("button", {
                    type: "button",
                    onClick: t[35] || (t[35] = (i) => b("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", fd, [
                e("aside", gd, [
                  t[82] || (t[82] = e("p", { class: "sw-title" }, "收藏夹", -1)),
                  e("div", md, [
                    (o(!0), s(A, null, j(r(P).radioFolders, (i) => (o(), s("button", {
                      key: i.id,
                      type: "button",
                      class: L(["bili-radio-folder", { on: i.id === r(P).radioActiveFolderId }]),
                      onClick: (u) => b("radio-select-folder", i.id)
                    }, [
                      e("span", null, l(i.title), 1),
                      e("span", null, l(i.count), 1)
                    ], 10, yd))), 128)),
                    r(P).radioFolders.length ? h("", !0) : (o(), s("p", hd, l(r(P).radioLoading ? "加载中…" : "暂无收藏夹"), 1))
                  ])
                ]),
                e("section", kd, [
                  t[84] || (t[84] = e("p", {
                    id: "bili-radio-library-title",
                    class: "sw-title"
                  }, "收藏夹视频", -1)),
                  r(P).radioError ? (o(), s("p", _d, l(r(P).radioError), 1)) : h("", !0),
                  e("div", $d, [
                    (o(!0), s(A, null, j(r(P).radioVideos, (i) => (o(), s("button", {
                      key: i.bvid,
                      type: "button",
                      class: "bili-radio-video",
                      title: `${i.title} (点击加入连播队列，或按住拖拽封面到下方卡带机直接播放)`,
                      draggable: "true",
                      onDragstart: (u) => vt(u, i),
                      onClick: (u) => b("radio-add", { bvid: i.bvid, title: i.title, cover: i.cover, author: i.author, duration: i.duration })
                    }, [
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Cd)) : (o(), s("span", xd)),
                      e("p", null, l(i.title), 1),
                      t[83] || (t[83] = e("span", null, "＋", -1))
                    ], 40, wd))), 128)),
                    r(P).radioVideos.length ? h("", !0) : (o(), s("p", Sd, l(r(P).radioLoading ? "读取视频中…" : "此收藏夹暂无可播放视频"), 1))
                  ])
                ]),
                e("section", Td, [
                  e("div", Md, [
                    oe(e("input", {
                      id: "bili-radio-name",
                      "onUpdate:modelValue": t[36] || (t[36] = (i) => r(P).radioSeriesName = i),
                      maxlength: "48",
                      class: L({ "has-error": m.value }),
                      placeholder: m.value ? "⚠️ 请在此输入系列名称后再保存！" : "请输入系列名称（必填）",
                      autocomplete: "off",
                      onInput: t[37] || (t[37] = (i) => m.value = !1),
                      onKeydown: Ie(x(z, ["prevent"]), ["enter"])
                    }, null, 42, Dd), [
                      [xe, r(P).radioSeriesName]
                    ]),
                    e("div", Pd, [
                      e("button", {
                        id: "bili-radio-save",
                        type: "button",
                        title: "保存当前队列为系列",
                        onClick: z
                      }, " 💾 保存系列 "),
                      e("button", {
                        id: "bili-radio-rename",
                        type: "button",
                        title: "重命名当前系列",
                        onClick: y
                      }, " ✏️ 重命名 "),
                      ye(rt, {
                        id: "bili-radio-share",
                        compact: "",
                        label: "🚀 分享",
                        visible: !0,
                        onSelect: ct
                      })
                    ]),
                    e("div", zd, [
                      e("select", {
                        class: "bili-radio-series-select",
                        title: "快速切换已保存的系列",
                        onChange: R
                      }, [
                        e("option", Bd, l(r(P).radioSeries.length ? `📚 已保存系列 (${r(P).radioSeries.length})` : "📚 暂无保存系列"), 1),
                        (o(!0), s(A, null, j(r(P).radioSeries, (i) => (o(), s("option", {
                          key: i.id,
                          value: i.id
                        }, l(i.name) + " (" + l(i.count) + "首) ", 9, Id))), 128)),
                        t[85] || (t[85] = e("option", {
                          value: "__create_new__",
                          class: "bili-radio-create-opt"
                        }, " ＋ 创建系列 ", -1))
                      ], 32)
                    ])
                  ]),
                  e("div", Rd, [
                    (o(!0), s(A, null, j(r(P).radioQueue, (i, u) => (o(), s("div", {
                      key: `${i.bvid}-${u}`,
                      class: L(["bili-radio-queue-item", { "is-playing": r(O).active && r(O).trackIndex === u + 1 }]),
                      title: "点击立即从该曲目开始播放",
                      onClick: (E) => b("radio-play-index", u)
                    }, [
                      e("span", Ed, l(r(O).active && r(O).trackIndex === u + 1 ? "♪" : u + 1), 1),
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Ad)) : (o(), s("span", Ud)),
                      e("p", null, l(i.title), 1),
                      e("button", {
                        type: "button",
                        class: "bili-radio-remove",
                        "aria-label": `移除 ${i.title}`,
                        onClick: x((E) => b("radio-remove", { index: u }), ["stop"])
                      }, "×", 8, Vd)
                    ], 10, Ld))), 128)),
                    r(P).radioQueue.length ? h("", !0) : (o(), s("p", Fd, "点击左侧视频加入连播队列。"))
                  ]),
                  e("div", Nd, [
                    e("button", {
                      id: "bili-radio-play",
                      type: "button",
                      disabled: !r(P).radioQueue.length,
                      onClick: t[38] || (t[38] = (i) => b("radio-play"))
                    }, "▶ 按顺序播放", 8, qd),
                    e("button", {
                      id: "bili-radio-shuffle",
                      type: "button",
                      disabled: !r(P).radioQueue.length,
                      onClick: t[39] || (t[39] = (i) => b("radio-shuffle"))
                    }, "🔀 随机播放", 8, Gd),
                    e("button", {
                      id: "bili-radio-clear",
                      type: "button",
                      onClick: t[40] || (t[40] = (i) => b("radio-clear"))
                    }, "清空编辑区")
                  ])
                ])
              ]),
              r(qe) || r(Ze).activeId === "daily-bilibili" ? h("", !0) : (o(), nt(dt, { key: 0 }))
            ])) : h("", !0)
          ], 34)
        ])
      ]),
      r(qe) || r(Ze).activeId === "daily-bilibili" ? (o(), nt(dt, {
        key: 0,
        "dock-side": ""
      })) : h("", !0),
      t[96] || (t[96] = e("div", {
        class: "fm-pane",
        id: "pane-sub-video",
        hidden: "",
        style: { display: "none !important" }
      }, null, -1)),
      ye(Qo),
      ye(Zs),
      q.value.visible && q.value.video ? (o(), s("div", {
        key: 1,
        ref_key: "videoMenuRef",
        ref: le,
        class: "fo-context-menu",
        role: "menu",
        style: Se(r(H)),
        onClick: t[48] || (t[48] = x(() => {
        }, ["stop"]))
      }, [
        e("div", {
          class: "fo-context-header",
          title: q.value.video.title
        }, l(q.value.video.title), 9, Od),
        ye(rt, {
          label: "💬 发送到聊天室",
          "match-menu-item": "",
          visible: q.value.visible,
          onSelect: pt
        }, null, 8, ["visible"]),
        t[93] || (t[93] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[41] || (t[41] = (i) => Ce("play"))
        }, [...t[86] || (t[86] = [
          e("span", { class: "fo-context-icon" }, "▶", -1),
          ce(" 小窗播放视频 ", -1)
        ])]),
        t[94] || (t[94] = e("div", { class: "fo-context-divider" }, null, -1)),
        q.value.video.writable ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "fo-context-item danger",
          onClick: t[42] || (t[42] = (i) => Ce("delete"))
        }, [...t[87] || (t[87] = [
          e("span", { class: "fo-context-icon" }, "🗑", -1),
          ce(" 取消收藏 ", -1)
        ])])) : h("", !0),
        q.value.video.writable ? (o(), s("button", {
          key: 1,
          type: "button",
          class: "fo-context-item",
          onClick: t[43] || (t[43] = (i) => Ce("move"))
        }, [...t[88] || (t[88] = [
          e("span", { class: "fo-context-icon" }, "📁", -1),
          ce(" 移动到… ", -1)
        ])])) : h("", !0),
        q.value.video.writable ? (o(), s("div", jd)) : h("", !0),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[44] || (t[44] = (i) => Ce("open"))
        }, [...t[89] || (t[89] = [
          e("span", { class: "fo-context-icon" }, "↗", -1),
          ce(" 跳转到 B站 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[45] || (t[45] = (i) => Ce("copy-link"))
        }, [...t[90] || (t[90] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ce(" 复制链接 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[46] || (t[46] = (i) => Ce("cache"))
        }, [...t[91] || (t[91] = [
          e("span", { class: "fo-context-icon" }, "💾", -1),
          ce(" 缓存视频 ", -1)
        ])]),
        t[95] || (t[95] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[47] || (t[47] = (i) => Ce("subtitle"))
        }, [...t[92] || (t[92] = [
          e("span", { class: "fo-context-icon" }, "▤", -1),
          ce(" 字幕转文本 ", -1)
        ])])
      ], 4)) : h("", !0)
    ], 2));
  }
}), lu = /* @__PURE__ */ Ve(Hd, [["__scopeId", "data-v-43a0bd5e"]]);
export {
  lu as default
};
