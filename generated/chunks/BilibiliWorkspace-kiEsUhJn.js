import { d as ze, o, e as s, f as e, t as n, u as r, B as L, m as ce, F as A, h as H, g as h, D as ye, i as C, s as le, x as $e, C as Ke, y as ut, l as se, n as we, k as Pe, b as S, G as tt, S as st, A as Ce, v as mt, z as it, H as Qe, L as yt, c as nt } from "./vendor-vue-DokqDua_.js";
import { c as z, b as Ae, d as Je, a as O, r as Le, s as ht } from "./bili-favorites-store-DGAVeyb6.js";
import { c as lt, n as He, z as me, d as je, r as Ze, B as at } from "./view-styles-BzNhElrV.js";
import "./fullscreen-cards.store-DiVoM7Xa.js";
import { u as kt } from "./useCardActivity-BFT9oxyd.js";
import { _ as Ue } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { B as We } from "./BiliRichText-BE-gFgV_.js";
import { d as _t, a as $t } from "./playback-sync-BdCsYGbw.js";
import { a as re, d as et, e as f, c as ue } from "./up-group-manager-store-CggT7rhL.js";
import { biliMessagePanelController as wt, biliMessagePanelState as Ct } from "./message-panel-store-DHyMeJ3M.js";
import { bilibiliChannelService as Ee } from "./bilibili-channel.service-U3w58QrM.js";
import { u as xt } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-ChQUbu-A.js";
import { C as rt } from "./ChatShareMenu-otE9ei4n.js";
const St = { class: "bili-sub-header bili-sub-vue-header" }, Tt = { class: "bili-sub-channel-info" }, Mt = { class: "bili-sub-vue-title-row" }, Dt = { class: "bili-sub-title" }, Pt = { class: "bili-sub-desc" }, zt = { class: "bili-sub-actions" }, Bt = { class: "bili-sub-mode-icon" }, It = { class: "bili-sub-mode-text" }, Rt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, Lt = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, Et = { class: "bili-sub-dropdown-panel" }, At = { class: "bili-sub-dropdown-list" }, Ut = ["onClick"], Vt = { class: "bili-sub-item-text" }, Ft = {
  key: 0,
  class: "bili-sub-item-check"
}, Nt = { class: "bili-sub-dropdown-foot" }, qt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, Gt = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, Ot = { class: "bili-sub-dropdown-panel bili-sub-video-dropdown-panel" }, Ht = { class: "bili-sub-dropdown-title" }, jt = { class: "bili-sub-dropdown-list" }, Wt = ["title", "onClick"], Kt = { class: "bili-sub-video-num" }, Yt = { class: "bili-sub-item-text" }, Xt = {
  key: 0,
  class: "bili-sub-video-duration"
}, Qt = { class: "bili-sub-dropdown-foot" }, Jt = ["disabled"], Zt = /* @__PURE__ */ ze({
  __name: "BiliSubscriptionHeader",
  props: {
    showBack: { type: Boolean }
  },
  setup(xe) {
    function m(B, y) {
      Ae.dispatch(B, y);
    }
    return (B, y) => (o(), s("header", St, [
      e("div", Tt, [
        y[6] || (y[6] = e("img", {
          class: "bili-sub-avatar",
          src: "assets/bilibili.svg",
          alt: ""
        }, null, -1)),
        e("div", null, [
          e("div", Mt, [
            e("h3", Dt, n(r(z).organizer.subscriptionTitle), 1)
          ]),
          e("p", Pt, n(r(z).organizer.subscriptionSubtitle), 1)
        ])
      ]),
      e("div", zt, [
        e("button", {
          type: "button",
          class: L(["bili-sub-head-btn bili-sub-script-mode-btn", { "is-newspaper": r(z).organizer.subscriptionScriptMode === "newspaper" }]),
          onClick: y[0] || (y[0] = (R) => m("subscription-script-mode"))
        }, [
          e("span", Bt, n(r(z).organizer.subscriptionScriptMode === "newspaper" ? "📰" : "📜"), 1),
          e("span", It, n(r(z).organizer.subscriptionScriptMode === "newspaper" ? "报纸模式" : "滚动台词"), 1)
        ], 2),
        e("details", Rt, [
          e("summary", Lt, [
            e("span", null, [
              y[7] || (y[7] = ce("关注 UP 主：", -1)),
              e("b", null, n(r(z).organizer.subscriptionTitle), 1)
            ]),
            y[8] || (y[8] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", Et, [
            y[10] || (y[10] = e("div", { class: "bili-sub-dropdown-title" }, "已关注的 UP 主", -1)),
            e("div", At, [
              (o(!0), s(A, null, H(r(z).organizer.subscriptionChannels, (R) => (o(), s("button", {
                key: R.id,
                type: "button",
                class: L(["bili-sub-dropdown-item", { active: R.active }]),
                onClick: (F) => m("subscription-channel", R.id)
              }, [
                y[9] || (y[9] = e("span", { class: "bili-sub-dot" }, null, -1)),
                e("span", Vt, n(R.name), 1),
                R.active ? (o(), s("span", Ft, "✓")) : h("", !0)
              ], 10, Ut))), 128))
            ]),
            e("div", Nt, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                onClick: y[1] || (y[1] = (R) => m("subscription-add-channel"))
              }, "＋ UP 主")
            ])
          ])
        ]),
        e("details", qt, [
          e("summary", Gt, [
            e("span", null, [
              y[11] || (y[11] = ce("视频 ", -1)),
              e("b", null, "(" + n(r(z).organizer.subscriptionVideos.length) + ")", 1)
            ]),
            y[12] || (y[12] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", Ot, [
            e("div", Ht, "最近投稿视频 (" + n(r(z).organizer.subscriptionVideos.length) + ")", 1),
            e("div", jt, [
              (o(!0), s(A, null, H(r(z).organizer.subscriptionVideos, (R, F) => (o(), s("button", {
                key: R.bvid,
                type: "button",
                class: L(["bili-sub-dropdown-item bili-sub-video-item", { active: R.active }]),
                title: R.title,
                onClick: (M) => m("subscription-video", R.bvid)
              }, [
                e("span", Kt, n(F + 1) + ".", 1),
                e("span", Yt, n(R.title), 1),
                R.duration ? (o(), s("small", Xt, n(R.duration), 1)) : h("", !0)
              ], 10, Wt))), 128))
            ]),
            e("div", Qt, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                disabled: r(z).organizer.subscriptionLoading,
                onClick: y[2] || (y[2] = (R) => m("subscription-load-more"))
              }, "继续获取", 8, Jt)
            ])
          ])
        ]),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: y[3] || (y[3] = (R) => m(r(z).organizer.showFullDescInRightPanel ? "subscription-copy-description" : "subscription-copy-script"))
        }, n(r(z).organizer.showFullDescInRightPanel ? "复制简介" : "复制稿子"), 1),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: y[4] || (y[4] = (R) => m("subscription-refresh"))
        }, "↻ 刷新"),
        xe.showBack ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "bili-sub-head-btn",
          onClick: y[5] || (y[5] = (R) => m("organizer-open"))
        }, "← 返回收藏夹")) : h("", !0)
      ])
    ]));
  }
}), ei = /* @__PURE__ */ Ue(Zt, [["__scopeId", "data-v-0dfef976"]]), ti = { class: "bili-sub-transcript-column bili-sub-vue-transcript-column" }, ii = { class: "bili-sub-article-wrap" }, oi = { class: "bili-sub-transcript-body" }, si = {
  key: 0,
  class: "bili-sub-description-copy",
  title: "当前为放大简介视图"
}, ni = {
  key: 0,
  class: "muted"
}, li = {
  key: 0,
  class: "bili-sub-newspaper-list"
}, ai = ["data-idx", "data-from", "data-to", "title", "onClick"], ri = { class: "bili-sub-newspaper-header" }, di = { class: "bili-sub-newspaper-num" }, ui = { class: "bili-sub-newspaper-heading" }, ci = { class: "bili-sub-newspaper-title" }, pi = { class: "bili-sub-newspaper-time" }, bi = ["onClick"], vi = { class: "bili-sub-newspaper-content" }, fi = ["data-from", "data-to", "title", "onClick"], gi = {
  key: 1,
  class: "bili-sub-srt-list"
}, mi = ["data-idx", "data-from", "data-to", "title", "onClick"], yi = { class: "bili-sub-srt-time" }, hi = { class: "bili-sub-srt-text" }, ki = {
  key: 2,
  class: "bili-sub-no-transcript-box"
}, _i = {
  key: 2,
  class: "bili-sub-vue-empty-hint"
}, $i = /* @__PURE__ */ ze({
  __name: "BiliSubscriptionTranscript",
  setup(xe) {
    const m = le(() => z.organizer), B = le(() => m.value.subscriptionChapters.length > 0 || m.value.subscriptionCues.length > 0);
    function y(R, F) {
      Ae.dispatch(R, F);
    }
    return (R, F) => (o(), s("section", ti, [
      e("article", ii, [
        e("div", oi, [
          m.value.showFullDescInRightPanel ? (o(), s("section", si, [
            e("header", null, [
              F[1] || (F[1] = e("h5", null, "视频简介", -1)),
              e("button", {
                type: "button",
                class: "bili-copy-desc-btn",
                title: "切回台词展示",
                onClick: F[0] || (F[0] = (M) => y("subscription-toggle-desc-panel"))
              }, "缩小简介")
            ]),
            (o(!0), s(A, null, H(m.value.subscriptionDescription, (M, a) => (o(), s("p", { key: a }, [
              ye(We, { text: M }, null, 8, ["text"])
            ]))), 128)),
            m.value.subscriptionDescription.length ? h("", !0) : (o(), s("p", ni, "该视频暂无可用的文字简介。"))
          ])) : (o(), s(A, { key: 1 }, [
            m.value.subscriptionScriptMode === "newspaper" && m.value.subscriptionChapters.length ? (o(), s("div", li, [
              (o(!0), s(A, null, H(m.value.subscriptionChapters, (M, a) => (o(), s("article", {
                key: `${M.from}:${a}`,
                class: "bili-sub-newspaper-section",
                "data-idx": a,
                "data-from": M.from,
                "data-to": M.to,
                title: `点击跳转至 ${M.fromText} 播放`,
                onClick: (k) => y("subscription-seek", { from: M.from, index: a, mode: "newspaper" })
              }, [
                e("header", ri, [
                  e("span", di, n(String(a + 1).padStart(2, "0")), 1),
                  e("div", ui, [
                    e("h4", ci, n(M.title), 1),
                    e("span", pi, "⏱ " + n(M.fromText) + " - " + n(M.toText), 1)
                  ]),
                  e("button", {
                    type: "button",
                    class: "bili-sub-newspaper-play-btn",
                    "aria-label": "从头播放此分段",
                    onClick: C((k) => y("subscription-seek", { from: M.from, index: a, mode: "newspaper" }), ["stop"])
                  }, "▶", 8, bi)
                ]),
                e("div", vi, [
                  M.paragraphCues && M.paragraphCues.length ? (o(!0), s(A, { key: 0 }, H(M.paragraphCues, (k, _) => (o(), s("p", {
                    key: _,
                    class: "bili-sub-newspaper-p"
                  }, [
                    (o(!0), s(A, null, H(k, (N, T) => (o(), s("span", {
                      key: `${N.from}:${T}`,
                      class: "bili-sub-newspaper-cue",
                      "data-from": N.from,
                      "data-to": N.to,
                      title: `点击跳转播放此句 (⏱ ${N.timeText || N.from + "s"})`,
                      onClick: C((P) => y("subscription-seek", { from: N.from, mode: "newspaper" }), ["stop"])
                    }, n(N.content), 9, fi))), 128))
                  ]))), 128)) : (o(!0), s(A, { key: 1 }, H(M.paragraphs, (k, _) => (o(), s("p", {
                    key: _,
                    class: "bili-sub-newspaper-p"
                  }, n(k), 1))), 128))
                ])
              ], 8, ai))), 128))
            ])) : m.value.subscriptionCues.length ? (o(), s("div", gi, [
              (o(!0), s(A, null, H(m.value.subscriptionCues, (M) => (o(), s("button", {
                key: `${M.from}:${M.index}`,
                type: "button",
                class: "bili-sub-srt-row",
                "data-idx": M.index,
                "data-from": M.from,
                "data-to": M.to,
                title: `点击跳转至 ${M.timeText}`,
                onClick: (a) => y("subscription-seek", { from: M.from, index: M.index, mode: "lyrics" })
              }, [
                e("span", yi, n(M.timeText), 1),
                e("span", hi, n(M.content), 1)
              ], 8, mi))), 128))
            ])) : (o(), s("div", ki, [...F[2] || (F[2] = [
              e("div", { class: "bili-sub-no-transcript-icon" }, "🎙️", -1),
              e("h5", null, "暂无实时台词字幕", -1),
              e("p", { class: "muted" }, "当前视频暂无可用字幕稿。如需阅读完整文案，请点击左侧视频标题旁的“放大简介”。", -1)
            ])]))
          ], 64)),
          !m.value.showFullDescInRightPanel && !B.value && !m.value.subscriptionDescription.length ? (o(), s("p", _i, "字幕不可用时仍可在左侧播放和查看评论。")) : h("", !0)
        ])
      ])
    ]));
  }
}), wi = /* @__PURE__ */ Ue($i, [["__scopeId", "data-v-2f4df941"]]), Ci = { class: "bili-sub-player-column" }, xi = {
  key: 0,
  class: "bili-sub-sticky-player"
}, Si = { class: "bili-sub-player-card" }, Ti = { class: "bili-sub-video-box" }, Mi = ["poster", "hidden"], Di = ["src"], Pi = {
  key: 1,
  class: "bili-sub-video-loading"
}, zi = { class: "bili-sub-video-meta" }, Bi = { class: "bili-sub-video-meta-actions" }, Ii = ["title"], Ri = { class: "bili-sub-meta-stats" }, Li = { class: "bili-sub-meta-desc" }, Ei = {
  class: "bili-sub-comments-section",
  id: "bili-sub-comments-section"
}, Ai = { class: "bili-mini-comments-head" }, Ui = { class: "bili-mini-comments-meta" }, Vi = { class: "bili-mini-comments-count bili-sub-comments-count" }, Fi = { class: "bili-mini-comments-sort" }, Ni = { class: "bili-sub-comment-composer" }, qi = ["onKeydown"], Gi = ["disabled"], Oi = {
  key: 0,
  class: "bili-sub-emote-picker"
}, Hi = {
  key: 0,
  class: "fo-bili-loading"
}, ji = { key: 1 }, Wi = ["title", "onClick"], Ki = ["src", "alt"], Yi = { key: 1 }, Xi = { class: "bili-mini-comments-body bili-sub-comments-body" }, Qi = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, Ji = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, Zi = ["src"], eo = { class: "bili-comment-main" }, to = { class: "bili-comment-user-row" }, io = { class: "bili-comment-uname" }, oo = {
  key: 0,
  class: "bili-comment-level"
}, so = { class: "bili-comment-time" }, no = { class: "bili-comment-text" }, lo = {
  key: 0,
  class: "bili-comment-pictures"
}, ao = ["href", "onClick"], ro = ["src"], uo = { class: "bili-comment-actions" }, co = { key: 0 }, po = { key: 1 }, bo = {
  key: 1,
  class: "bili-comment-sub-list"
}, vo = { class: "bili-comment-sub-uname" }, fo = { class: "bili-comment-sub-more" }, go = ["disabled", "onClick"], mo = ["disabled", "onClick"], yo = ["onClick"], ho = { class: "bili-sub-comments-infinite-trigger" }, ko = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0" }
}, _o = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0", opacity: "0.6" }
}, $o = {
  key: 1,
  class: "fo-bili-empty"
}, wo = /* @__PURE__ */ ze({
  __name: "BiliSubscriptionPlayer",
  setup(xe) {
    const m = le(() => z.organizer.subscriptionCurrent), B = S(null), y = S(!1), R = S(!1), F = S(""), M = S(""), a = S(1), k = S(1), _ = S([]), N = S("0 条"), T = S(!1), P = S(!1), q = S(""), ae = S(!1), j = S(""), Y = S(null), ie = S(!1), pe = S(""), he = S(!1), de = S(!1), b = S(!1), ne = S([]);
    let Z = null, te = null;
    function X(w, g = !1) {
      pe.value = w, he.value = g, Z && clearTimeout(Z), Z = setTimeout(() => {
        pe.value = "";
      }, 3500);
    }
    function be() {
      Ae.dispatch("subscription-open-player");
    }
    function I() {
      Ae.dispatch("subscription-toggle-desc-panel");
    }
    function v(w) {
      const g = w.currentTarget;
      g && g.scrollHeight - g.scrollTop - g.clientHeight < 180 && !P.value && ae.value && Q();
    }
    function G(w, g) {
      const c = w[g];
      c && window.open(c, "_blank", "noopener,noreferrer");
    }
    function K(w, g) {
      if (!w) return [];
      if (!g || g.size === 0)
        return [{ type: "text", text: w }];
      const c = /\[([^\]]+)\]/g, x = [];
      let V = 0, U;
      for (; (U = c.exec(w)) !== null; ) {
        U.index > V && x.push({ type: "text", text: w.slice(V, U.index) });
        const W = U[0], ee = g.get(W);
        ee ? x.push({ type: "emote", text: W, url: ee }) : x.push({ type: "text", text: W }), V = c.lastIndex;
      }
      return V < w.length && x.push({ type: "text", text: w.slice(V) }), x;
    }
    function ke(w) {
      if (!w) return "";
      const g = new Date(w * 1e3), c = /* @__PURE__ */ new Date(), x = Math.floor((c.getTime() - g.getTime()) / 1e3);
      if (x < 60) return "刚刚";
      if (x < 3600) return `${Math.floor(x / 60)} 分钟前`;
      if (x < 86400) return `${Math.floor(x / 3600)} 小时前`;
      const V = g.getFullYear(), U = String(g.getMonth() + 1).padStart(2, "0"), W = String(g.getDate()).padStart(2, "0");
      return V === c.getFullYear() ? `${U}-${W}` : `${V}-${U}-${W}`;
    }
    function _e(w) {
      return w ? w >= 1e4 ? (w / 1e4).toFixed(1).replace(/\.0$/, "") + "万" : String(w) : "0";
    }
    async function $(w = !1) {
      if (M.value) {
        w ? P.value = !0 : (T.value = !0, q.value = "");
        try {
          const g = `https://api.bilibili.com/x/v2/reply?type=1&oid=${M.value}&pn=${k.value}&ps=20&sort=${a.value}`, x = await (await fetch(g, { credentials: "include" })).json();
          if (x?.code !== 0 || !x?.data) {
            w || (q.value = x?.message || "评论加载失败或该视频已关闭评论", _.value = []), ae.value = !1;
            return;
          }
          const V = x.data, U = V.page?.count || 0;
          N.value = `${_e(U)} 条`;
          const ee = (Array.isArray(V.replies) ? V.replies : []).map((J) => {
            const Re = /* @__PURE__ */ new Map();
            J.content?.emote && Object.entries(J.content.emote).forEach(([oe, Oe]) => {
              Oe?.url && Re.set(oe, String(Oe.url).replace(/^http:/, "https:"));
            });
            const Fe = String(J.content?.message || ""), Ge = Array.isArray(J.content?.pictures) ? J.content.pictures.map((oe) => String(oe?.img_src || oe).replace(/^http:/, "https:")).filter(Boolean) : [], qe = Array.isArray(J.replies) ? J.replies.map((oe) => ({
              id: oe.rpid || Math.random(),
              userName: oe.member?.uname || "B站用户",
              message: String(oe.content?.message || "")
            })) : [];
            return {
              id: J.rpid || Math.random(),
              userName: J.member?.uname || "B站用户",
              avatar: String(J.member?.avatar || "").replace(/^http:/, "https:"),
              level: Number(J.member?.level_info?.current_level || 0),
              message: Fe,
              tokens: K(Fe, Re),
              timeStr: ke(J.ctime),
              likeCount: Number(J.like || 0),
              replyCount: Number(J.rcount || 0),
              pictures: Ge,
              replies: qe
            };
          });
          w ? _.value = [..._.value, ...ee] : _.value = ee, ae.value = _.value.length < U;
        } catch (g) {
          w || (q.value = g?.message || "网络异常，未能加载评论");
        } finally {
          T.value = !1, P.value = !1;
        }
      }
    }
    async function d(w) {
      const g = _.value.find((c) => String(c.id) === String(w));
      if (!(!g || g.subRepliesLoading || !M.value)) {
        g.subRepliesPage ? g.subRepliesPage++ : g.subRepliesPage = 1, g.subRepliesLoading = !0, g.subRepliesExpanded = !0;
        try {
          const c = await lt.getSubReplies(M.value, w, g.subRepliesPage, 10), x = (c.replies || []).map((W) => ({
            id: String(W.rpid),
            userName: W.uname,
            message: W.message
          })), V = new Set((g.replies || []).map((W) => String(W.id))), U = x.filter((W) => !V.has(String(W.id)));
          g.replies = [...g.replies || [], ...U], g.subRepliesHasMore = c.hasMore;
        } catch {
          X("子回复加载失败", !0);
        } finally {
          g.subRepliesLoading = !1;
        }
      }
    }
    function p(w) {
      const g = _.value.find((c) => String(c.id) === String(w));
      g && (g.subRepliesExpanded = !1);
    }
    function D(w) {
      a.value !== w && (a.value = w, k.value = 1, $(!1));
    }
    function Q() {
      P.value || !ae.value || (k.value += 1, $(!0));
    }
    async function ve() {
      if (de.value = !de.value, de.value && !ne.value.length && !b.value) {
        b.value = !0;
        try {
          const g = await (await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", { credentials: "include" })).json();
          g?.code === 0 && Array.isArray(g?.data?.packages) && (ne.value = g.data.packages.filter((c) => Array.isArray(c.emote) && c.emote.length).map((c) => ({
            text: c.text || "B站表情",
            emote: c.emote.map((x) => ({
              text: x.text || "",
              url: String(x.url || "").replace(/^http:/, "https:")
            }))
          })));
        } catch {
        } finally {
          b.value = !1;
        }
      }
    }
    function Be(w) {
      const g = Y.value;
      if (!g)
        j.value += w;
      else {
        const c = g.selectionStart ?? g.value.length, x = g.selectionEnd ?? c;
        j.value = j.value.slice(0, c) + w + j.value.slice(x), tt(() => {
          g.focus();
          const V = c + w.length;
          g.setSelectionRange(V, V);
        });
      }
      de.value = !1;
    }
    async function Se() {
      const w = j.value.trim();
      if (!w) {
        X("请输入评论内容", !0);
        return;
      }
      if (!M.value) {
        X("未能识别视频 ID，无法发表评论", !0);
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
        X("未检测到 B站 登录态，请先登录 bilibili.com", !0);
        return;
      }
      ie.value = !0;
      try {
        const x = new URLSearchParams({
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
          body: x.toString()
        })).json();
        U?.code === 0 ? (j.value = "", X("✓ 评论发表成功！", !1), k.value = 1, $(!1)) : X(`❌ 发送失败：${U?.message || U?.code}`, !0);
      } catch (x) {
        X(`❌ 发送出错：${x?.message || "网络异常"}`, !0);
      } finally {
        ie.value = !1;
      }
    }
    async function fe(w) {
      if (!w?.bvid) return;
      if (typeof document < "u" && (document.querySelectorAll("video, audio").forEach((c) => {
        if (c !== B.value && !c.paused)
          try {
            c.pause();
          } catch {
          }
      }), document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((c) => {
        try {
          c.pause();
        } catch {
        }
      })), B.value && !B.value.paused)
        try {
          B.value.pause();
        } catch {
        }
      y.value = !0, R.value = !1, F.value = "";
      let g = w.aid;
      if (!g)
        try {
          const x = await (await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${w.bvid}`, { credentials: "include" })).json();
          x?.data?.aid && (g = x.data.aid);
        } catch {
        }
      M.value = g || "", k.value = 1, $(!1);
      try {
        const c = await lt.resolvePlayStream(w);
        if (c?.sources?.length) {
          B.value && (typeof document < "u" && document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((x) => {
            try {
              x.pause();
            } catch {
            }
          }), B.value.src = c.sources[0], B.value.play().catch(() => {
          }), $t({ bvid: w.bvid, title: w.title, cover: w.cover }, B.value)), y.value = !1;
          return;
        }
      } catch (c) {
        console.warn("[BiliSubscriptionPlayer] 本地视频流解析失败，使用 iframe 备用:", c);
      }
      R.value = !0, F.value = `https://player.bilibili.com/player.html?bvid=${w.bvid}&autoplay=1&danmaku=0`, y.value = !1;
    }
    let Te = null, Me = null;
    function Ie(w) {
      const g = w.closest(".bili-sub-transcript-body") || w.closest(".bili-sub-article-wrap") || w.parentElement;
      if (!g) return;
      const c = g.getBoundingClientRect(), U = w.getBoundingClientRect().top - c.top + g.scrollTop - c.height * 0.36;
      g.scrollTo({
        top: Math.max(0, U),
        behavior: "smooth"
      });
    }
    function De() {
      if (!B.value) return;
      const w = B.value.currentTime;
      if (document.querySelectorAll(".bili-sub-newspaper-section").forEach((x) => {
        const V = Number(x.getAttribute("data-from") || 0), U = Number(x.getAttribute("data-to") || 0), W = w >= V && (U <= 0 || w < U);
        x.classList.toggle("active", W);
      }), z.organizer.subscriptionScriptMode === "newspaper") {
        const x = document.querySelectorAll(".bili-sub-newspaper-cue");
        if (x.length > 0) {
          let V = null;
          if (x.forEach((U) => {
            const W = Number(U.getAttribute("data-from") || 0), ee = Number(U.getAttribute("data-to") || 0);
            w >= W && (ee <= 0 || w < ee) ? (V || (V = U), U.classList.add("cue-reading-active")) : U.classList.remove("cue-reading-active");
          }), !V && w > 0)
            for (let U = x.length - 1; U >= 0; U--) {
              const W = x[U], ee = Number(W.getAttribute("data-from") || 0);
              if (w >= ee) {
                V = W, W.classList.add("cue-reading-active");
                break;
              }
            }
          V && V !== Te && (Te = V, Ie(V));
        }
      } else {
        const x = document.querySelectorAll(".bili-sub-srt-row");
        let V = !1, U = null;
        for (let W = x.length - 1; W >= 0; W--) {
          const ee = x[W], J = Number(ee.getAttribute("data-from") || 0);
          !V && w >= J ? (ee.classList.add("active"), V = !0, U = ee) : ee.classList.remove("active");
        }
        U && U !== Me && (Me = U, Ie(U));
      }
    }
    function Ve() {
      De();
    }
    function Ne() {
      De();
    }
    return $e(
      () => m.value?.bvid,
      () => {
        m.value && fe(m.value);
      },
      { immediate: !0 }
    ), Ke(() => {
      te = Ae.onAction((w, g) => {
        if (w === "subscription-seek") {
          const c = Number(g?.from);
          B.value && Number.isFinite(c) && (B.value.currentTime = Math.max(0, c - 0.1), B.value.play().catch(() => {
          }));
        }
      });
    }), ut(() => {
      if (B.value) {
        _t(B.value);
        try {
          B.value.pause(), B.value.src = "", B.value.load();
        } catch {
        }
      }
      te && te(), Z && clearTimeout(Z);
    }), (w, g) => (o(), s("aside", Ci, [
      m.value ? (o(), s("div", xi, [
        e("div", Si, [
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
          e("div", Ti, [
            e("video", {
              ref_key: "videoRef",
              ref: B,
              class: "bili-sub-native-video",
              controls: "",
              playsinline: "",
              poster: m.value.cover,
              hidden: R.value,
              onTimeupdate: De,
              onSeeked: Ve,
              onPlay: Ne
            }, null, 40, Mi),
            R.value ? (o(), s("iframe", {
              key: 0,
              class: "bili-sub-native-iframe",
              allowfullscreen: "true",
              allow: "autoplay; fullscreen",
              src: F.value
            }, null, 8, Di)) : h("", !0),
            y.value ? (o(), s("div", Pi, [...g[4] || (g[4] = [
              e("i", null, null, -1),
              e("span", null, "正在解析登录高清视频流…", -1)
            ])])) : h("", !0)
          ]),
          e("div", {
            class: "bili-sub-scroll-stage",
            onScrollPassive: v
          }, [
            e("div", zi, [
              e("div", Bi, [
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: r(z).organizer.showFullDescInRightPanel ? "切回台词展示" : "在右侧大屏展开完整视频简介",
                  onClick: I
                }, n(r(z).organizer.showFullDescInRightPanel ? "缩小简介" : "放大简介"), 9, Ii)
              ]),
              e("h4", null, n(m.value.title), 1),
              e("div", Ri, [
                e("span", null, "▣ 播放: " + n(m.value.playCount), 1),
                e("span", null, "💬 弹幕: " + n(m.value.danmakuCount), 1),
                e("span", null, "⏱ " + n(m.value.duration), 1)
              ]),
              e("p", Li, [
                ye(We, {
                  text: m.value.description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ]),
            e("div", Ei, [
              e("div", Ai, [
                e("div", Ui, [
                  g[5] || (g[5] = e("span", null, "💬 评论", -1)),
                  e("span", Vi, n(N.value), 1)
                ]),
                e("div", Fi, [
                  e("button", {
                    type: "button",
                    class: L(["bili-mini-sort-btn", { active: a.value === 1 }]),
                    onClick: g[0] || (g[0] = (c) => D(1))
                  }, "按热度", 2),
                  e("button", {
                    type: "button",
                    class: L(["bili-mini-sort-btn", { active: a.value === 0 }]),
                    onClick: g[1] || (g[1] = (c) => D(0))
                  }, "按时间", 2)
                ])
              ]),
              e("div", Ni, [
                e("button", {
                  type: "button",
                  class: L(["bili-sub-emote-button", { on: de.value }]),
                  title: "选择 B站 表情",
                  onClick: ve
                }, "☺", 2),
                se(e("input", {
                  ref_key: "commentInputRef",
                  ref: Y,
                  "onUpdate:modelValue": g[2] || (g[2] = (c) => j.value = c),
                  type: "text",
                  class: "bili-sub-comment-input",
                  placeholder: "发一条友善的评论吧…（Enter 发送）",
                  maxlength: "500",
                  onKeydown: Pe(C(Se, ["prevent"]), ["enter"])
                }, null, 40, qi), [
                  [we, j.value]
                ]),
                e("button", {
                  type: "button",
                  class: "bili-sub-comment-send-btn",
                  disabled: ie.value || !j.value.trim(),
                  onClick: Se
                }, n(ie.value ? "发送中…" : "发送"), 9, Gi)
              ]),
              de.value ? (o(), s("div", Oi, [
                b.value ? (o(), s("div", Hi, [...g[6] || (g[6] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取 B站 表情包…", -1)
                ])])) : (o(), s("div", ji, [
                  (o(!0), s(A, null, H(ne.value, (c) => (o(), s("section", {
                    key: c.text,
                    class: "bili-sub-emote-group"
                  }, [
                    e("h5", null, n(c.text || "B站表情"), 1),
                    e("div", null, [
                      (o(!0), s(A, null, H(c.emote, (x) => (o(), s("button", {
                        key: x.text,
                        type: "button",
                        class: "bili-sub-emote-item",
                        title: x.text,
                        onClick: (V) => Be(x.text)
                      }, [
                        x.url ? (o(), s("img", {
                          key: 0,
                          src: x.url,
                          alt: x.text,
                          referrerpolicy: "no-referrer"
                        }, null, 8, Ki)) : (o(), s("span", Yi, n(x.text), 1))
                      ], 8, Wi))), 128))
                    ])
                  ]))), 128))
                ]))
              ])) : h("", !0),
              pe.value ? (o(), s("div", {
                key: 1,
                class: L(["bili-sub-comment-tip", { error: he.value }])
              }, n(pe.value), 3)) : h("", !0),
              e("div", Xi, [
                T.value && !_.value.length ? (o(), s("p", Qi, "正在加载评论…")) : q.value && !_.value.length ? (o(), s("p", Ji, n(q.value), 1)) : h("", !0),
                (o(!0), s(A, null, H(_.value, (c) => (o(), s("div", {
                  key: c.id,
                  class: "bili-comment-item"
                }, [
                  e("img", {
                    class: "bili-comment-avatar",
                    src: c.avatar,
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer"
                  }, null, 8, Zi),
                  e("div", eo, [
                    e("div", to, [
                      e("span", io, n(c.userName), 1),
                      c.level ? (o(), s("span", oo, "LV" + n(c.level), 1)) : h("", !0),
                      e("span", so, n(c.timeStr), 1)
                    ]),
                    e("div", no, [
                      ye(We, {
                        text: c.message
                      }, null, 8, ["text"])
                    ]),
                    c.pictures?.length ? (o(), s("div", lo, [
                      (o(!0), s(A, null, H(c.pictures, (x, V) => (o(), s("a", {
                        key: V,
                        class: "bili-comment-pic-link",
                        href: x,
                        onClick: C((U) => G(c.pictures, V), ["stop", "prevent"])
                      }, [
                        e("img", {
                          class: "bili-comment-pic",
                          src: x,
                          alt: "评论图片",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, ro)
                      ], 8, ao))), 128))
                    ])) : h("", !0),
                    e("div", uo, [
                      c.likeCount ? (o(), s("span", co, "👍 " + n(c.likeCount), 1)) : h("", !0),
                      c.replyCount ? (o(), s("span", po, "💬 " + n(c.replyCount), 1)) : h("", !0)
                    ]),
                    c.replies?.length ? (o(), s("div", bo, [
                      (o(!0), s(A, null, H(c.replies, (x) => (o(), s("div", {
                        key: x.id,
                        class: "bili-comment-sub-item"
                      }, [
                        e("span", vo, n(x.userName) + ":", 1),
                        ye(We, {
                          text: x.message
                        }, null, 8, ["text"])
                      ]))), 128)),
                      e("div", fo, [
                        !c.subRepliesExpanded && (c.replyCount || 0) > c.replies.length ? (o(), s(A, { key: 0 }, [
                          e("span", null, "共 " + n(c.replyCount) + " 条回复，", 1),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: c.subRepliesLoading,
                            onClick: C((x) => d(c.id), ["stop"])
                          }, n(c.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, go)
                        ], 64)) : c.subRepliesExpanded ? (o(), s(A, { key: 1 }, [
                          c.subRepliesHasMore ? (o(), s("button", {
                            key: 0,
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: c.subRepliesLoading,
                            onClick: C((x) => d(c.id), ["stop"])
                          }, n(c.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, mo)) : h("", !0),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-collapse-btn",
                            onClick: C((x) => p(c.id), ["stop"])
                          }, " 收起 ▴ ", 8, yo)
                        ], 64)) : h("", !0)
                      ])
                    ])) : h("", !0)
                  ])
                ]))), 128))
              ]),
              e("div", ho, [
                P.value ? (o(), s("p", ko, "正在加载更多评论…")) : !ae.value && _.value.length ? (o(), s("p", _o, "已显示全部评论")) : h("", !0)
              ])
            ])
          ], 32)
        ])
      ])) : (o(), s("p", $o, "暂无可播放的订阅视频。"))
    ]));
  }
}), Co = /* @__PURE__ */ Ue(wo, [["__scopeId", "data-v-d420748e"]]), xo = ["disabled"], So = ["disabled"], To = { key: 0 }, Mo = ["disabled"], Do = ["disabled"], Po = ["disabled"], zo = ["disabled"], Bo = { class: "bili-sub-add-shell" }, Io = ["disabled"], Ro = { class: "bili-sub-add-toolbar" }, Lo = { class: "bili-sub-add-groups" }, Eo = ["onClick"], Ao = { class: "bili-sub-add-list" }, Uo = {
  key: 0,
  class: "fo-bili-loading"
}, Vo = {
  key: 1,
  class: "fo-bili-empty"
}, Fo = {
  key: 2,
  class: "fo-bili-empty"
}, No = ["disabled", "onClick"], qo = ["src"], Go = {
  key: 1,
  class: "bili-sub-add-avatar"
}, Oo = {
  class: "fo-custom-confirm-modal",
  role: "dialog",
  "aria-modal": "true"
}, Ho = { class: "fo-custom-confirm-head" }, jo = { class: "fo-custom-confirm-body" }, Wo = { class: "fo-custom-confirm-actions" }, Ko = ["disabled"], Yo = ["disabled"], Xo = /* @__PURE__ */ ze({
  __name: "BiliOrganizerDialogs",
  setup(xe) {
    const m = le(() => et.create), B = le(() => et.confirm), y = le(() => et.channelPicker), R = le(() => m.value.kind === "bili"), F = le(() => {
      const a = y.value, k = a.query.trim().toLowerCase(), _ = a.groups.find((T) => T.id === a.activeGroupId), N = _ ? new Set(_.mids) : null;
      return a.items.filter((T) => (!N || N.has(T.mid)) && (!k || T.name.toLowerCase().includes(k) || T.mid.includes(k)));
    });
    function M() {
      const a = m.value.name.trim();
      if (!a) {
        re.updateCreate({ status: "请输入名称", error: !0 });
        return;
      }
      re.submitCreate({ name: a, privacy: m.value.privacy });
    }
    return (a, k) => (o(), s(A, null, [
      m.value.open ? (o(), s("dialog", {
        key: 0,
        class: "fo-create-dialog",
        open: "",
        onClick: k[5] || (k[5] = C((_) => r(re).closeCreate(), ["self"])),
        onCancel: k[6] || (k[6] = C((_) => r(re).closeCreate(), ["prevent"]))
      }, [
        e("form", {
          onSubmit: C(M, ["prevent"])
        }, [
          e("header", null, [
            e("div", null, [
              k[14] || (k[14] = e("i", { class: "fo-folder-icon" }, null, -1)),
              e("span", null, [
                e("b", null, n(R.value ? "新建 B站收藏夹" : "新建插件分组"), 1),
                e("small", null, n(R.value ? "会同步创建到你的 B站账号" : "只整理左侧收藏夹，不修改 B站数据"), 1)
              ])
            ]),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: m.value.submitting,
              onClick: k[0] || (k[0] = (_) => r(re).closeCreate())
            }, "×", 8, xo)
          ]),
          e("label", null, [
            e("span", null, n(R.value ? "收藏夹名称" : "分组名称"), 1),
            se(e("input", {
              "onUpdate:modelValue": k[1] || (k[1] = (_) => m.value.name = _),
              maxlength: "48",
              autocomplete: "off",
              placeholder: "输入名称",
              required: "",
              disabled: m.value.submitting,
              autofocus: ""
            }, null, 8, So), [
              [we, m.value.name]
            ])
          ]),
          R.value ? (o(), s("fieldset", To, [
            k[17] || (k[17] = e("legend", null, "可见范围", -1)),
            e("label", null, [
              se(e("input", {
                "onUpdate:modelValue": k[2] || (k[2] = (_) => m.value.privacy = _),
                type: "radio",
                value: 0,
                disabled: m.value.submitting
              }, null, 8, Mo), [
                [
                  st,
                  m.value.privacy,
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
              se(e("input", {
                "onUpdate:modelValue": k[3] || (k[3] = (_) => m.value.privacy = _),
                type: "radio",
                value: 1,
                disabled: m.value.submitting
              }, null, 8, Do), [
                [
                  st,
                  m.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              k[16] || (k[16] = e("span", null, [
                e("b", null, "私密"),
                e("small", null, "仅自己可见")
              ], -1))
            ])
          ])) : h("", !0),
          e("p", {
            class: L(["fo-create-status", { error: m.value.error }]),
            role: "status"
          }, n(m.value.status), 3),
          e("footer", null, [
            e("button", {
              type: "button",
              disabled: m.value.submitting,
              onClick: k[4] || (k[4] = (_) => r(re).closeCreate())
            }, "取消", 8, Po),
            e("button", {
              class: "primary",
              type: "submit",
              disabled: m.value.submitting
            }, n(m.value.submitting ? "创建中…" : R.value ? "创建收藏夹" : "创建分组"), 9, zo)
          ])
        ], 32)
      ], 32)) : h("", !0),
      y.value.open ? (o(), s("dialog", {
        key: 1,
        class: "bili-sub-add-dialog",
        open: "",
        onCancel: k[10] || (k[10] = C((_) => r(re).closeChannelPicker(), ["prevent"]))
      }, [
        e("div", Bo, [
          e("header", null, [
            k[18] || (k[18] = e("div", null, [
              e("b", null, "从我的关注中添加 UP 主"),
              e("small", null, "沿用“正在关注”的本地分组，只能添加已关注的 UP 主")
            ], -1)),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: !!y.value.submittingMid,
              onClick: k[7] || (k[7] = (_) => r(re).closeChannelPicker())
            }, "×", 8, Io)
          ]),
          e("div", Ro, [
            e("div", Lo, [
              e("button", {
                type: "button",
                class: L(["bili-sub-add-group", { on: y.value.activeGroupId === "__all__" }]),
                onClick: k[8] || (k[8] = (_) => r(re).updateChannelPicker({ activeGroupId: "__all__" }))
              }, "全部关注", 2),
              (o(!0), s(A, null, H(y.value.groups, (_) => (o(), s("button", {
                key: _.id,
                type: "button",
                class: L(["bili-sub-add-group", { on: y.value.activeGroupId === _.id }]),
                onClick: (N) => r(re).updateChannelPicker({ activeGroupId: _.id })
              }, n(_.name), 11, Eo))), 128))
            ]),
            se(e("input", {
              "onUpdate:modelValue": k[9] || (k[9] = (_) => y.value.query = _),
              type: "search",
              placeholder: "搜索关注的 UP 主"
            }, null, 512), [
              [we, y.value.query]
            ])
          ]),
          e("div", Ao, [
            y.value.loading ? (o(), s("div", Uo, [...k[19] || (k[19] = [
              e("i", null, null, -1),
              e("span", null, "正在读取关注分组…", -1)
            ])])) : y.value.error ? (o(), s("p", Vo, n(y.value.error), 1)) : F.value.length ? (o(!0), s(A, { key: 3 }, H(F.value, (_) => (o(), s("button", {
              key: _.mid,
              type: "button",
              class: "bili-sub-add-up",
              disabled: _.added || !!y.value.submittingMid,
              onClick: (N) => r(re).selectChannel(_.mid)
            }, [
              _.face ? (o(), s("img", {
                key: 0,
                src: _.face,
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, qo)) : (o(), s("span", Go, "UP")),
              e("span", null, [
                e("b", null, n(_.name), 1),
                e("small", null, "UID " + n(_.mid), 1)
              ]),
              e("i", null, n(_.added ? "已添加" : y.value.submittingMid === _.mid ? "添加中…" : "＋ 添加"), 1)
            ], 8, No))), 128)) : (o(), s("p", Fo, "该分组中没有匹配的已关注 UP 主。"))
          ])
        ])
      ], 32)) : h("", !0),
      B.value.open ? (o(), s("div", {
        key: 2,
        class: "fo-custom-confirm-overlay",
        onClick: k[13] || (k[13] = C((_) => r(re).closeConfirm(), ["self"]))
      }, [
        e("div", Oo, [
          e("div", Ho, [
            e("h4", null, n(B.value.title), 1)
          ]),
          e("div", jo, [
            e("p", null, n(B.value.message), 1)
          ]),
          e("div", Wo, [
            e("button", {
              type: "button",
              class: "fo-confirm-btn cancel",
              disabled: B.value.submitting,
              onClick: k[11] || (k[11] = (_) => r(re).closeConfirm())
            }, n(B.value.cancelText), 9, Ko),
            e("button", {
              type: "button",
              class: L(["fo-confirm-btn confirm", { danger: B.value.danger }]),
              disabled: B.value.submitting,
              onClick: k[12] || (k[12] = (_) => r(re).submitConfirm())
            }, n(B.value.submitting ? "处理中…" : B.value.confirmText), 11, Yo)
          ])
        ])
      ])) : h("", !0)
    ], 64));
  }
}), Qo = { class: "fo-upg-shell" }, Jo = { class: "fo-upg-body" }, Zo = { class: "fo-upg-sidebar" }, es = { class: "fo-upg-sidebar-head" }, ts = { class: "fo-upg-group-items" }, is = ["onDragstart", "onDrop", "onClick"], os = ["onKeydown"], ss = {
  key: 0,
  class: "fo-upg-tree-branch"
}, ns = {
  key: 1,
  class: "fo-folder-icon"
}, ls = { class: "fo-upg-group-name" }, as = { class: "fo-upg-vue-group-actions" }, rs = ["onClick"], ds = ["onClick"], us = ["onClick"], cs = ["placeholder"], ps = {
  key: 1,
  class: "muted small"
}, bs = { class: "fo-upg-main" }, vs = { class: "fo-upg-main-head" }, fs = { class: "fo-upg-main-title" }, gs = { key: 0 }, ms = { class: "fo-upg-head-actions" }, ys = { class: "fo-upg-filter-tabs" }, hs = { class: "fo-upg-batch-wrap" }, ks = { class: "fo-upg-batch-count" }, _s = ["disabled"], $s = ["disabled"], ws = { class: "fo-upg-toolbar" }, Cs = { class: "fo-upg-search" }, xs = ["disabled"], Ss = {
  key: 0,
  class: "fo-bili-loading"
}, Ts = {
  key: 1,
  class: "fo-bili-empty"
}, Ms = {
  key: 2,
  class: "fo-bili-empty"
}, Ds = {
  key: 3,
  class: "fo-bili-empty"
}, Ps = ["title", "onContextmenu", "onClick"], zs = ["src"], Bs = { class: "fo-upg-info" }, Is = { class: "fo-upg-name" }, Rs = { class: "fo-upg-sign" }, Ls = ["disabled", "onClick"], Es = {
  key: 1,
  class: "fo-upg-move-wrap"
}, As = ["disabled"], Us = { class: "fo-upg-move-dropdown" }, Vs = ["disabled", "onClick"], Fs = { key: 0 }, Ns = {
  key: 0,
  class: "muted small",
  style: { padding: "6px 10px" }
}, qs = ["disabled", "onClick"], Gs = { class: "fo-upg-pagination" }, Os = { class: "fo-upg-page-info" }, Hs = {
  key: 0,
  class: "fo-upg-page-btns"
}, js = ["disabled"], Ws = ["disabled"], Ks = { class: "fo-upg-page-cur" }, Ys = ["disabled"], Xs = ["disabled"], Qs = /* @__PURE__ */ ze({
  __name: "BiliUpGroupManager",
  setup(xe) {
    const m = S(void 0), B = S(""), y = S(""), R = S(""), F = S(""), M = S(!1), a = S(/* @__PURE__ */ new Set()), k = S(null);
    function _($) {
      if ($.button !== 0 || $.target.closest("button,input")) return;
      const d = k.value;
      if (!d) return;
      const p = d.getBoundingClientRect(), D = p.left, Q = p.top, ve = $.clientX, Be = $.clientY;
      d.style.position = "fixed", d.style.left = `${D}px`, d.style.top = `${Q}px`, d.style.right = "auto", d.style.bottom = "auto", d.style.margin = "0", d.style.transform = "none";
      const Se = (Te) => {
        const Me = Te.clientX - ve, Ie = Te.clientY - Be, De = Math.max(8, Math.min(window.innerWidth - 120, D + Me)), Ve = Math.max(8, Math.min(window.innerHeight - 80, Q + Ie));
        d.style.left = `${De}px`, d.style.top = `${Ve}px`;
      }, fe = () => {
        window.removeEventListener("pointermove", Se), window.removeEventListener("pointerup", fe);
      };
      window.addEventListener("pointermove", Se), window.addEventListener("pointerup", fe);
    }
    const N = le(() => f.groups.find(($) => $.id === f.activeGroupId) || null), T = le(() => {
      const $ = f.query.trim().toLowerCase(), d = f.activeGroupId;
      return f.followings.filter((p) => {
        if ($ && !p.name.toLowerCase().includes($) && !p.sign.toLowerCase().includes($) && !p.mid.includes($)) return !1;
        const D = p.groupIds.includes(d);
        return f.filter === "ingroup" ? D : f.onlyUngrouped ? !p.groupIds || p.groupIds.length === 0 : !0;
      });
    }), P = le(() => Math.max(1, Math.ceil(T.value.length / f.pageSize))), q = le(() => {
      const d = (Math.min(f.page, P.value) - 1) * f.pageSize;
      return T.value.slice(d, d + f.pageSize);
    }), ae = le(() => f.followings.filter(($) => $.groupIds.length === 0).length), j = S(null), Y = /* @__PURE__ */ new Map();
    function ie($) {
      const d = Math.max(1, Math.min(P.value, $));
      f.page = d, j.value && (j.value.scrollTop = 0);
    }
    $e(() => [f.query, f.filter, f.onlyUngrouped], () => {
      f.page = 1, j.value && (j.value.scrollTop = 0);
    }), $e(() => f.activeGroupId, ($, d) => {
      if (d && j.value) {
        const Q = `${d}_${f.filter}_${f.onlyUngrouped}`;
        Y.set(Q, {
          page: f.page,
          scrollTop: j.value.scrollTop
        });
      }
      if (f.filter === "all")
        return;
      const p = `${$}_${f.filter}_${f.onlyUngrouped}`, D = Y.get(p);
      D ? (f.page = Math.min(D.page, P.value), tt(() => {
        j.value && (j.value.scrollTop = D.scrollTop);
      })) : (f.page = 1, tt(() => {
        j.value && (j.value.scrollTop = 0);
      }));
    }), $e(P, ($) => {
      f.page > $ && (f.page = $);
    }), $e(M, ($) => {
      $ || a.value.clear();
    });
    function pe($) {
      m.value = $, B.value = "";
    }
    function he() {
      m.value = void 0, B.value = "";
    }
    function de() {
      const $ = B.value.trim();
      $ && (ue.dispatch("create-group", { name: $, parentId: m.value || "" }), he());
    }
    function b($) {
      y.value = $.id, R.value = $.name;
    }
    function ne() {
      const $ = R.value.trim();
      y.value && $ && ue.dispatch("rename-group", { id: y.value, name: $ }), y.value = "", R.value = "";
    }
    function Z($, d) {
      F.value = d, $.dataTransfer?.setData("application/x-logicweaver-up-group", d), $.dataTransfer && ($.dataTransfer.effectAllowed = "move");
    }
    function te($, d) {
      const p = $.dataTransfer?.getData("application/x-logicweaver-up-group") || F.value;
      if (F.value = "", !p || p === d) return;
      const D = $.currentTarget?.getBoundingClientRect(), Q = D ? $.clientY - D.top : 0, ve = D ? Q < D.height * 0.25 ? "before" : Q > D.height * 0.75 ? "after" : "into" : "into";
      ue.dispatch("move-group", { sourceId: p, targetId: d, mode: ve });
    }
    function X($) {
      const d = $.dataTransfer?.getData("application/x-logicweaver-up-group") || F.value;
      F.value = "", d && ue.dispatch("move-group", { sourceId: d, targetId: "", mode: "root" });
    }
    function be($, d) {
      !d || f.busyMid || ue.dispatch("toggle-member", { groupId: d, mid: $ });
    }
    function I($) {
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
        const D = f.followings.find((Q) => Q.mid === p);
        return D && !D.groupIds.includes(f.activeGroupId);
      });
      if (d.length) {
        for (const p of d)
          ue.dispatch("toggle-member", { groupId: f.activeGroupId, mid: p });
        a.value.clear();
      }
    }
    function ke() {
      if (!f.activeGroupId || f.busyMid) return;
      const $ = Array.from(a.value);
      if (!$.length) return;
      const d = $.filter((p) => {
        const D = f.followings.find((Q) => Q.mid === p);
        return D && D.groupIds.includes(f.activeGroupId);
      });
      if (d.length) {
        for (const p of d)
          ue.dispatch("toggle-member", { groupId: f.activeGroupId, mid: p });
        a.value.clear();
      }
    }
    function _e() {
      for (const $ of q.value) a.value.add($.mid);
    }
    return ($, d) => r(f).open ? (o(), s("dialog", {
      key: 0,
      ref_key: "dialogEl",
      ref: k,
      class: "fo-up-group-dialog",
      open: "",
      onCancel: d[20] || (d[20] = C((p) => r(ue).close(), ["prevent"]))
    }, [
      e("div", Qo, [
        e("header", {
          class: "fo-upg-head",
          onPointerdown: _
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
        e("div", Jo, [
          e("aside", Zo, [
            e("div", es, [
              d[22] || (d[22] = e("span", null, "我的分组", -1)),
              e("button", {
                type: "button",
                onClick: d[1] || (d[1] = (p) => pe(null))
              }, "＋ 新建")
            ]),
            e("div", ts, [
              e("div", {
                class: "fo-upg-root-dropzone",
                onDragover: d[2] || (d[2] = C(() => {
                }, ["prevent"])),
                onDrop: C(X, ["prevent"])
              }, "⇣ 拖至此处变为顶级分组", 32),
              m.value === null ? (o(), s("form", {
                key: 0,
                class: "fo-upg-create-box",
                onSubmit: C(de, ["prevent"])
              }, [
                se(e("input", {
                  "onUpdate:modelValue": d[3] || (d[3] = (p) => B.value = p),
                  maxlength: "20",
                  placeholder: "输入分组名称…",
                  autofocus: ""
                }, null, 512), [
                  [we, B.value]
                ]),
                e("div", { class: "fo-upg-create-btns" }, [
                  e("button", {
                    type: "button",
                    class: "cancel",
                    onClick: he
                  }, "取消"),
                  d[23] || (d[23] = e("button", {
                    class: "confirm",
                    type: "submit"
                  }, "确定", -1))
                ])
              ], 32)) : h("", !0),
              (o(!0), s(A, null, H(r(f).groups, (p) => (o(), s(A, {
                key: p.id
              }, [
                e("div", {
                  class: L(["fo-upg-group-item", { on: p.id === r(f).activeGroupId, "is-subgroup": p.depth > 0 }]),
                  style: Ce({ paddingLeft: `${8 + p.depth * 18}px` }),
                  draggable: "true",
                  onDragstart: (D) => Z(D, p.id),
                  onDragover: d[7] || (d[7] = C(() => {
                  }, ["prevent"])),
                  onDrop: C((D) => te(D, p.id), ["prevent"]),
                  onClick: (D) => r(f).activeGroupId = p.id
                }, [
                  y.value === p.id ? (o(), s(A, { key: 0 }, [
                    se(e("input", {
                      "onUpdate:modelValue": d[4] || (d[4] = (D) => R.value = D),
                      class: "fo-upg-rename-input",
                      maxlength: "20",
                      onClick: d[5] || (d[5] = C(() => {
                      }, ["stop"])),
                      onKeydown: Pe(C(ne, ["prevent"]), ["enter"])
                    }, null, 40, os), [
                      [we, R.value]
                    ]),
                    e("button", {
                      type: "button",
                      onClick: C(ne, ["stop"])
                    }, "✓"),
                    e("button", {
                      type: "button",
                      onClick: d[6] || (d[6] = C((D) => y.value = "", ["stop"]))
                    }, "✕")
                  ], 64)) : (o(), s(A, { key: 1 }, [
                    p.depth ? (o(), s("span", ss, "↳")) : (o(), s("i", ns)),
                    e("span", ls, n(p.name), 1),
                    e("small", null, n(p.upMids.length), 1),
                    e("span", as, [
                      e("button", {
                        type: "button",
                        title: "添加子分组",
                        onClick: C((D) => pe(p.id), ["stop"])
                      }, "＋", 8, rs),
                      e("button", {
                        type: "button",
                        title: "重命名",
                        onClick: C((D) => b(p), ["stop"])
                      }, "✎", 8, ds),
                      e("button", {
                        type: "button",
                        class: "danger",
                        title: "删除",
                        onClick: C((D) => r(ue).dispatch("delete-group", p.id), ["stop"])
                      }, "×", 8, us)
                    ])
                  ], 64))
                ], 46, is),
                m.value === p.id ? (o(), s("form", {
                  key: 0,
                  class: "fo-upg-create-box",
                  style: Ce({ marginLeft: `${18 + p.depth * 18}px` }),
                  onSubmit: C(de, ["prevent"])
                }, [
                  se(e("input", {
                    "onUpdate:modelValue": d[8] || (d[8] = (D) => B.value = D),
                    maxlength: "20",
                    placeholder: `输入「${p.name}」的子分组名称…`,
                    autofocus: ""
                  }, null, 8, cs), [
                    [we, B.value]
                  ]),
                  e("div", { class: "fo-upg-create-btns" }, [
                    e("button", {
                      type: "button",
                      class: "cancel",
                      onClick: he
                    }, "取消"),
                    d[24] || (d[24] = e("button", {
                      class: "confirm",
                      type: "submit"
                    }, "确定", -1))
                  ])
                ], 36)) : h("", !0)
              ], 64))), 128)),
              !r(f).groups.length && !r(f).loading ? (o(), s("p", ps, '暂无分组，请点击"＋ 新建"。')) : h("", !0)
            ])
          ]),
          e("section", bs, [
            e("div", vs, [
              e("div", fs, [
                e("h4", null, n(N.value ? `分组：「${N.value.name}」` : "请先选择或新建分组"), 1),
                N.value ? (o(), s("span", gs, "（本组 " + n(N.value.upMids.length) + " 位 · 共 " + n(r(f).followings.length) + " 位关注 · 未分组 " + n(ae.value) + " 位）", 1)) : h("", !0)
              ]),
              e("div", ms, [
                e("div", ys, [
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
                e("div", hs, [
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-batch-toggle", { on: M.value }]),
                    onClick: d[11] || (d[11] = (p) => M.value = !M.value)
                  }, n(M.value ? "退出批量" : "批量操作"), 3),
                  M.value && a.value.size > 0 ? (o(), s(A, { key: 0 }, [
                    e("span", ks, "已选 " + n(a.value.size), 1),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action add",
                      disabled: !N.value,
                      onClick: K
                    }, "＋ 加入本组", 8, _s),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action remove",
                      disabled: !N.value,
                      onClick: ke
                    }, "− 移出本组", 8, $s),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: _e
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
                  se(e("input", {
                    "onUpdate:modelValue": d[13] || (d[13] = (p) => r(f).onlyUngrouped = p),
                    type: "checkbox"
                  }, null, 512), [
                    [mt, r(f).onlyUngrouped]
                  ]),
                  d[25] || (d[25] = e("span", { class: "fo-upg-switch-track" }, [
                    e("span", { class: "fo-upg-switch-thumb" })
                  ], -1)),
                  d[26] || (d[26] = e("span", { class: "fo-upg-switch-text" }, "仅未分组 UP", -1))
                ], 2)) : h("", !0)
              ])
            ]),
            e("div", ws, [
              e("div", Cs, [
                d[27] || (d[27] = e("span", null, "🔍", -1)),
                se(e("input", {
                  "onUpdate:modelValue": d[14] || (d[14] = (p) => r(f).query = p),
                  type: "search",
                  placeholder: "搜索关注的 UP 主…"
                }, null, 512), [
                  [we, r(f).query]
                ])
              ]),
              e("button", {
                type: "button",
                class: "fo-upg-refresh-btn",
                disabled: r(f).refreshing,
                onClick: d[15] || (d[15] = (p) => r(ue).dispatch("refresh"))
              }, n(r(f).refreshing ? "刷新中…" : "↻ 刷新关注"), 9, xs)
            ]),
            e("div", {
              ref_key: "listRef",
              ref: j,
              class: "fo-upg-list"
            }, [
              r(f).loading ? (o(), s("div", Ss, [...d[28] || (d[28] = [
                e("i", null, null, -1),
                e("span", null, "正在加载关注的 UP 主列表…", -1)
              ])])) : r(f).error ? (o(), s("p", Ts, n(r(f).error), 1)) : N.value ? q.value.length ? (o(!0), s(A, { key: 4 }, H(q.value, (p) => (o(), s("article", {
                key: p.mid,
                class: L(["fo-upg-card", { selected: M.value && a.value.has(p.mid) }]),
                title: `右键查看「${p.name}」近期投稿`,
                onContextmenu: C((D) => v(D, p.mid), ["prevent"]),
                onClick: (D) => M.value ? G(p.mid) : void 0
              }, [
                e("img", {
                  src: p.face,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, zs),
                e("div", Bs, [
                  e("div", Is, n(p.name), 1),
                  e("div", Rs, n(p.sign || "暂无签名"), 1)
                ]),
                M.value ? (o(), s("div", {
                  key: 1,
                  class: L(["fo-upg-batch-check", { checked: a.value.has(p.mid) }])
                }, n(a.value.has(p.mid) ? "✓" : ""), 3)) : (o(), s(A, { key: 0 }, [
                  p.groupIds.includes(r(f).activeGroupId) ? (o(), s("button", {
                    key: 0,
                    type: "button",
                    class: "fo-upg-toggle-btn in-group",
                    disabled: r(f).busyMid === p.mid,
                    onClick: C((D) => I(p.mid), ["stop"])
                  }, n(r(f).busyMid === p.mid ? "处理中…" : `移出 ${N.value?.name || ""}`), 9, Ls)) : p.groupIds.length > 0 ? (o(), s("div", Es, [
                    e("button", {
                      type: "button",
                      class: "fo-upg-toggle-btn belongs-other fo-upg-move-trigger",
                      disabled: r(f).busyMid === p.mid
                    }, n(r(f).busyMid === p.mid ? "处理中…" : `📁 ${p.groupName || "已分组"}`), 9, As),
                    e("div", Us, [
                      d[30] || (d[30] = e("div", { class: "fo-upg-move-title" }, "移动到分组", -1)),
                      (o(!0), s(A, null, H(r(f).groups, (D) => (o(), s("button", {
                        key: D.id,
                        type: "button",
                        class: L(["fo-upg-move-item", { active: p.groupIds.includes(D.id) }]),
                        disabled: r(f).busyMid === p.mid,
                        onClick: C((Q) => be(p.mid, D.id), ["stop"])
                      }, [
                        d[29] || (d[29] = e("i", { class: "fo-folder-icon small" }, null, -1)),
                        e("span", null, n(D.name), 1),
                        p.groupIds.includes(D.id) ? (o(), s("small", Fs, "✓ 已加入")) : h("", !0)
                      ], 10, Vs))), 128)),
                      r(f).groups.length ? h("", !0) : (o(), s("p", Ns, "暂无分组"))
                    ])
                  ])) : r(f).activeGroupId ? (o(), s("button", {
                    key: 2,
                    type: "button",
                    class: "fo-upg-toggle-btn",
                    disabled: r(f).busyMid === p.mid,
                    onClick: C((D) => I(p.mid), ["stop"])
                  }, n(r(f).busyMid === p.mid ? "处理中…" : "＋ 加入"), 9, qs)) : h("", !0)
                ], 64))
              ], 42, Ps))), 128)) : (o(), s("p", Ds, "没有符合条件的 UP 主。")) : (o(), s("p", Ms, "请先新建或选择一个分组。"))
            ], 512),
            e("div", Gs, [
              e("div", Os, "共 " + n(T.value.length) + " 位 UP 主 · 每页 " + n(r(f).pageSize) + " 位", 1),
              P.value > 1 ? (o(), s("div", Hs, [
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(f).page <= 1,
                  onClick: d[16] || (d[16] = (p) => ie(1))
                }, "« 首页", 8, js),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(f).page <= 1,
                  onClick: d[17] || (d[17] = (p) => ie(r(f).page - 1))
                }, "‹ 上一页", 8, Ws),
                e("span", Ks, n(r(f).page) + " / " + n(P.value), 1),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(f).page >= P.value,
                  onClick: d[18] || (d[18] = (p) => ie(r(f).page + 1))
                }, "下一页 ›", 8, Ys),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(f).page >= P.value,
                  onClick: d[19] || (d[19] = (p) => ie(P.value))
                }, "末页 »", 8, Xs)
              ])) : h("", !0)
            ])
          ])
        ])
      ])
    ], 544)) : h("", !0);
  }
}), Js = /* @__PURE__ */ Ue(Qs, [["__scopeId", "data-v-9e5aa70a"]]), Zs = ["title"], en = { class: "tape-capsule-text" }, tn = { class: "capsule-title" }, on = { class: "capsule-sub" }, sn = ["title"], nn = { class: "tape-deck-drop-slot" }, ln = {
  key: 1,
  class: "tape-insert-feedback-chip"
}, an = { class: "tape-loaded-title" }, rn = { class: "tape-body-content" }, dn = ["title", "onKeydown"], un = { class: "tape-cassette" }, cn = { class: "tape-center-label" }, pn = { class: "tape-sticker-head" }, bn = ["title"], vn = ["src"], fn = { class: "tape-badge-row" }, gn = { class: "tape-brand-text" }, mn = { class: "tape-series-header" }, yn = { class: "tape-series-title-group" }, hn = { class: "tape-series-count-pill" }, kn = { class: "tape-series-list-scroll" }, _n = ["onClick"], $n = { class: "tape-series-item-left" }, wn = { class: "tape-series-item-info" }, Cn = ["title"], xn = { class: "tape-series-item-count" }, Sn = {
  key: 0,
  class: "tape-series-playing-tag"
}, Tn = {
  key: 1,
  class: "tape-series-play-action"
}, Mn = {
  key: 0,
  class: "tape-series-empty"
}, Dn = {
  class: "tape-transport-controls",
  role: "group",
  "aria-label": "电台播放控制"
}, Pn = ["title", "aria-label"], zn = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, Bn = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, In = { class: "tape-playback-section" }, Rn = { class: "tape-time-lyric-row" }, Ln = { class: "tape-timestamp" }, En = { class: "tape-lyric-container" }, An = ["title"], Un = ["title", "aria-label"], Vn = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Fn = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Nn = {
  key: 2,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, qn = ["aria-valuenow"], Gn = {
  class: "tape-waveform-row",
  "aria-hidden": "true"
}, On = {
  class: "tape-waveform-svg",
  viewBox: "0 0 160 16",
  preserveAspectRatio: "none"
}, Hn = ["x", "y", "height"], jn = /* @__PURE__ */ ze({
  __name: "BiliRadioTapePlayer",
  props: {
    dockSide: { type: Boolean, default: !1 }
  },
  setup(xe) {
    const m = xe, B = [
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
    ], y = S(!1), R = S(null), F = S(!1), M = S(!1), a = S(""), k = S(!1), _ = S(!1);
    function N(I) {
      I.stopPropagation(), _.value = !_.value, _.value && Je.init();
    }
    async function T(I) {
      _.value = !1, await Je.playSeries(I, 0);
    }
    function P(I) {
      if (!_.value) return;
      const v = I.target;
      !v?.closest(".tape-series-popover") && !v?.closest(".tape-cassette-wrap") && (_.value = !1);
    }
    function q(I) {
      I.key === "Escape" && _.value && (_.value = !1);
    }
    const ae = le(() => O.mode === "one" ? "单曲循环" : O.mode === "shuffle" ? "乱序播放" : "顺序播放"), j = S(380);
    function Y() {
      if (typeof document > "u" || !m.dockSide) return;
      const I = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock"), v = 20, G = 16;
      if (I) {
        const ke = I.getBoundingClientRect();
        if (ke.left > 80) {
          const _e = Math.floor(ke.left - v - G);
          if (_e > 220) {
            j.value = _e;
            return;
          }
        }
      }
      const K = typeof window < "u" ? window.innerWidth : 1280;
      j.value = Math.max(220, Math.floor(K / 2 - 230));
    }
    let ie = null;
    function pe() {
      clearTimeout(ie), ie = setTimeout(Y, 60);
    }
    Ke(() => {
      if (Je.init(), typeof window < "u" && (window.addEventListener("pointerdown", P), window.addEventListener("keydown", q)), m.dockSide) {
        Y(), window.addEventListener("resize", pe);
        const I = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
        if (I && typeof ResizeObserver < "u") {
          const v = new ResizeObserver(() => Y());
          v.observe(I), I.__bili_dock_ro = v;
        }
      }
    }), ut(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", P), window.removeEventListener("keydown", q), window.removeEventListener("resize", pe));
      const I = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
      I && I.__bili_dock_ro && (I.__bili_dock_ro.disconnect(), delete I.__bili_dock_ro);
    });
    function he(I) {
      I.preventDefault(), F.value = !0;
    }
    function de(I) {
      I.preventDefault(), I.dataTransfer && (I.dataTransfer.dropEffect = "copy"), F.value = !0;
    }
    function b(I) {
      const v = I.currentTarget, G = I.relatedTarget;
      (!G || !v.contains(G)) && (F.value = !1);
    }
    function ne(I) {
      I.preventDefault(), F.value = !1;
      const v = I.dataTransfer;
      if (!v) return;
      let G = v.getData("application/x-bili-cassette") || v.getData("application/json"), K = null;
      if (G)
        try {
          K = JSON.parse(G);
        } catch {
        }
      if (!K?.bvid) {
        const _e = (v.getData("text/plain") || v.getData("text/uri-list") || v.getData("application/x-logicweaver-video-url"))?.match(/BV[0-9a-zA-Z]+/);
        _e && (K = {
          bvid: _e[0],
          title: "放入的单曲卡带",
          cover: "",
          author: "Bilibili",
          duration: 0
        });
      }
      K?.bvid && (M.value = !0, a.value = K.title || K.bvid, setTimeout(() => {
        Le.insertAndPlay(K);
      }, 280), setTimeout(() => {
        M.value = !1;
      }, 1500));
    }
    function Z(I) {
      if (R.value) {
        y.value = !0;
        try {
          I.currentTarget?.setPointerCapture?.(I.pointerId);
        } catch {
        }
        be(I);
      }
    }
    function te(I) {
      y.value && be(I);
    }
    function X(I) {
      if (y.value) {
        be(I), y.value = !1;
        try {
          I.currentTarget?.releasePointerCapture?.(I.pointerId);
        } catch {
        }
      }
    }
    function be(I) {
      if (!R.value) return;
      const v = R.value.getBoundingClientRect();
      if (v.width <= 0) return;
      const G = I.clientX - v.left, K = Math.max(0, Math.min(100, G / v.width * 100));
      Le.seek(K);
    }
    return (I, v) => (o(), s("div", {
      class: L(["bili-tape-deck", {
        "is-playing": r(O).playing,
        "is-drag-over": F.value,
        "is-inserting": M.value,
        "dock-side-mode": m.dockSide,
        "dock-side-collapsed": m.dockSide && k.value
      }]),
      style: Ce(m.dockSide && !k.value ? { maxWidth: `${j.value}px` } : void 0),
      onDragenter: he,
      onDragover: de,
      onDragleave: b,
      onDrop: ne
    }, [
      m.dockSide && k.value ? (o(), s("div", {
        key: 0,
        class: "tape-collapsed-capsule",
        title: `电台：${r(O).title || "哔哩哔哩电台"}`
      }, [
        e("div", {
          class: L(["tape-capsule-spool", { spinning: r(O).playing }])
        }, [...v[9] || (v[9] = [
          e("div", { class: "spool-center-dot" }, null, -1)
        ])], 2),
        e("div", en, [
          e("strong", tn, n(r(O).title || "B站电台"), 1),
          e("small", on, n(r(O).playing ? "♪ 播放中" : "已暂停"), 1)
        ]),
        e("button", {
          type: "button",
          class: "tape-capsule-play-btn",
          title: r(O).playing ? "暂停" : "播放",
          onClick: v[0] || (v[0] = C((G) => r(Le).togglePlay(), ["stop"]))
        }, n(r(O).playing ? "⏸" : "▶"), 9, sn),
        e("button", {
          type: "button",
          class: "tape-capsule-expand-btn",
          title: "展开完整磁带播放条",
          onClick: v[1] || (v[1] = C((G) => k.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, Zs)) : h("", !0),
      se(e("div", nn, [...v[10] || (v[10] = [
        Qe('<div class="slot-visual-frame" data-v-b16560a2><span class="slot-icon-tape" data-v-b16560a2>📼</span><div class="slot-text-col" data-v-b16560a2><strong class="slot-headline" data-v-b16560a2>释放鼠标装填卡带</strong><small class="slot-subline" data-v-b16560a2>拖入视频封面 · 立即播放音乐</small></div></div>', 1)
      ])], 512), [
        [it, F.value]
      ]),
      M.value ? (o(), s("div", ln, [
        v[11] || (v[11] = e("span", { class: "tape-click-sound" }, "✓ 已装填", -1)),
        e("span", an, "《" + n(a.value) + "》", 1)
      ])) : h("", !0),
      se(e("div", rn, [
        e("div", {
          class: "tape-cassette-wrap",
          role: "button",
          tabindex: "0",
          title: `点击选择电台系列 (已建 ${r(z).radioSeries.length} 个系列 · 也可直接拖拽视频封面至此装填)`,
          onClick: N,
          onKeydown: Pe(C(N, ["prevent"]), ["enter", "space"])
        }, [
          e("div", un, [
            v[14] || (v[14] = e("div", { class: "tape-spool tape-spool-left" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1)),
            e("div", cn, [
              e("div", pn, [
                r(O).coverUrl ? (o(), s("div", {
                  key: 0,
                  class: "tape-cover-sticker",
                  title: r(O).title
                }, [
                  e("img", {
                    src: r(O).coverUrl,
                    alt: "Cover",
                    referrerpolicy: "no-referrer"
                  }, null, 8, vn)
                ], 8, bn)) : h("", !0),
                e("div", fn, [
                  v[12] || (v[12] = e("span", { class: "side-letter" }, "A", -1)),
                  e("span", gn, n(r(O).seriesName || "CASSETTE"), 1)
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
          _.value ? (o(), s("div", {
            key: 0,
            class: "tape-series-popover",
            onClick: v[3] || (v[3] = C(() => {
            }, ["stop"]))
          }, [
            e("div", mn, [
              e("div", yn, [
                v[16] || (v[16] = e("span", { class: "tape-series-icon" }, "📻", -1)),
                v[17] || (v[17] = e("span", { class: "tape-series-title" }, "自建电台系列", -1)),
                e("span", hn, n(r(z).radioSeries.length), 1)
              ]),
              e("button", {
                type: "button",
                class: "tape-series-close-btn",
                title: "关闭",
                "aria-label": "关闭",
                onClick: v[2] || (v[2] = C((G) => _.value = !1, ["stop"]))
              }, " ✕ ")
            ]),
            e("div", kn, [
              (o(!0), s(A, null, H(r(z).radioSeries, (G) => (o(), s("div", {
                key: G.id,
                class: L(["tape-series-item", { "is-active": r(O).seriesName === G.name }]),
                onClick: C((K) => T(G.id), ["stop"])
              }, [
                e("div", $n, [
                  v[18] || (v[18] = e("span", { class: "tape-series-item-bullet" }, "📼", -1)),
                  e("div", wn, [
                    e("span", {
                      class: "tape-series-item-name",
                      title: G.name
                    }, n(G.name), 9, Cn),
                    e("span", xn, n(G.count) + " 首曲目 · 顺序连播", 1)
                  ])
                ]),
                r(O).seriesName === G.name && r(O).playing ? (o(), s("span", Sn, " 播放中 ")) : (o(), s("span", Tn, " ▶ "))
              ], 10, _n))), 128)),
              r(z).radioSeries.length ? h("", !0) : (o(), s("div", Mn, [...v[19] || (v[19] = [
                e("span", { class: "empty-icon" }, "📂", -1),
                e("span", { class: "empty-text" }, "暂无保存的电台系列", -1),
                e("span", { class: "empty-tip" }, "可在 B站工作区 → 电台 中添加曲目并保存为系列", -1)
              ])]))
            ])
          ])) : h("", !0)
        ], 40, dn),
        e("div", Dn, [
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "上一首",
            "aria-label": "上一首",
            onClick: v[4] || (v[4] = (G) => r(Le).prev())
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
            onClick: v[5] || (v[5] = (G) => r(Le).togglePlay())
          }, [
            r(O).playing ? (o(), s("svg", zn, [...v[21] || (v[21] = [
              e("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" }, null, -1)
            ])])) : (o(), s("svg", Bn, [...v[22] || (v[22] = [
              e("path", { d: "M8 5v14l11-7z" }, null, -1)
            ])]))
          ], 10, Pn),
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "下一首",
            "aria-label": "下一首",
            onClick: v[6] || (v[6] = (G) => r(Le).next())
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
        e("div", In, [
          e("div", Rn, [
            e("span", Ln, n(r(O).formattedCurrent) + " / " + n(r(O).formattedDuration), 1),
            e("div", En, [
              e("span", {
                class: "tape-lyric-text",
                title: r(O).lyric
              }, n(r(O).lyric || "♪ 纯音乐 / 伴奏"), 9, An)
            ]),
            e("button", {
              type: "button",
              class: "tape-mode-btn",
              title: ae.value,
              "aria-label": ae.value,
              onClick: v[7] || (v[7] = (G) => r(Le).toggleMode())
            }, [
              r(O).mode === "order" ? (o(), s("svg", Vn, [...v[24] || (v[24] = [
                e("polyline", { points: "17 1 21 5 17 9" }, null, -1),
                e("path", { d: "M3 11V9a4 4 0 0 1 4-4h14" }, null, -1),
                e("polyline", { points: "7 23 3 19 7 15" }, null, -1),
                e("path", { d: "M21 13v2a4 4 0 0 1-4 4H3" }, null, -1)
              ])])) : r(O).mode === "one" ? (o(), s("svg", Fn, [...v[25] || (v[25] = [
                Qe('<polyline points="17 1 21 5 17 9" data-v-b16560a2></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14" data-v-b16560a2></path><polyline points="7 23 3 19 7 15" data-v-b16560a2></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3" data-v-b16560a2></path><text x="12" y="14.5" font-size="7.5" font-weight="900" font-family="system-ui, -apple-system, sans-serif" fill="currentColor" stroke="none" text-anchor="middle" data-v-b16560a2>1</text>', 5)
              ])])) : r(O).mode === "shuffle" ? (o(), s("svg", Nn, [...v[26] || (v[26] = [
                Qe('<polyline points="16 3 21 3 21 8" data-v-b16560a2></polyline><line x1="4" y1="20" x2="21" y2="3" data-v-b16560a2></line><polyline points="21 16 21 21 16 21" data-v-b16560a2></polyline><line x1="15" y1="15" x2="21" y2="21" data-v-b16560a2></line><line x1="4" y1="4" x2="9" y2="9" data-v-b16560a2></line>', 5)
              ])])) : h("", !0)
            ], 8, Un)
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
            onPointermove: te,
            onPointerup: X,
            onPointercancel: X
          }, [
            e("div", {
              class: "tape-progress-fill",
              style: Ce({ width: `${r(O).progressPercent}%` })
            }, null, 4),
            e("div", {
              class: "tape-progress-handle",
              style: Ce({ left: `${r(O).progressPercent}%` })
            }, null, 4)
          ], 40, qn),
          e("div", Gn, [
            (o(), s("svg", On, [
              (o(), s(A, null, H(B, (G, K) => e("rect", {
                key: K,
                class: "wave-bar",
                x: K * 4,
                y: 16 - G * 0.7,
                width: "1.8",
                height: G * 0.7,
                rx: "0.9",
                style: Ce({ animationDelay: `${K % 8 * 0.12}s` })
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
          onClick: v[8] || (v[8] = C((G) => k.value = !0, ["stop"]))
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
        [it, !m.dockSide || !k.value]
      ])
    ], 38));
  }
}), dt = /* @__PURE__ */ Ue(jn, [["__scopeId", "data-v-b16560a2"]]), Wn = ["title"], Kn = {
  key: 2,
  class: "hero-lyric-body"
}, Yn = { class: "hero-lyric-stage" }, Xn = ["title"], Qn = /* @__PURE__ */ ze({
  __name: "BiliVideoLyricDockBar",
  props: {
    inlineHero: { type: Boolean, default: !1 }
  },
  setup(xe) {
    const m = S(340), B = S(!1), y = S(!1), R = S(null);
    function F(N) {
      const T = document.querySelector(".bili-mini-screen video, .bili-sub-screen video");
      T && (T.currentTime = Math.max(0, T.currentTime + N));
    }
    let M = 0, a = 0, k = "right";
    function _(N, T) {
      T.preventDefault(), T.stopPropagation(), B.value = !0, k = N, M = T.clientX, a = m.value;
      const P = (ae) => {
        if (!B.value) return;
        const j = ae.clientX - M, Y = k === "right" ? a + j : a - j, ie = Math.max(180, Math.min(720, Y));
        m.value = ie;
      }, q = () => {
        B.value = !1, window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", q), window.removeEventListener("pointercancel", q);
        try {
          localStorage.setItem("bili_hero_lyric_width", String(m.value));
        } catch {
        }
      };
      window.addEventListener("pointermove", P), window.addEventListener("pointerup", q), window.addEventListener("pointercancel", q);
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
      class: L(["bili-hero-lyric-bar", { "is-collapsed": y.value, "is-resizing": B.value }]),
      style: Ce(y.value ? void 0 : { width: `${m.value}px` }),
      "aria-label": "视频实时字幕与控制"
    }, [
      y.value ? h("", !0) : (o(), s("div", {
        key: 0,
        class: "lyric-resize-handle handle-left",
        title: "按住向左拉伸宽度",
        onPointerdown: T[0] || (T[0] = (P) => _("left", P))
      }, [...T[7] || (T[7] = [
        e("span", { class: "resize-line" }, null, -1)
      ])], 32)),
      y.value ? (o(), s("div", {
        key: 1,
        class: "hero-lyric-capsule",
        title: `视频台词：${r(z).organizer.heroLyricText || "暂无字幕"} (点击展开)`,
        onClick: T[2] || (T[2] = (P) => y.value = !1)
      }, [
        T[8] || (T[8] = e("span", { class: "capsule-icon" }, "💬", -1)),
        T[9] || (T[9] = e("span", { class: "capsule-text" }, "台词", -1)),
        e("button", {
          type: "button",
          class: "capsule-expand-btn",
          title: "展开台词栏",
          onClick: T[1] || (T[1] = C((P) => y.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, Wn)) : (o(), s("div", Kn, [
        e("div", Yn, [
          e("button", {
            type: "button",
            class: "hero-lyric-seek-btn",
            title: "当前视频后退 5 秒",
            "aria-label": "后退 5 秒",
            onClick: T[3] || (T[3] = (P) => F(-5))
          }, " ‹ "),
          e("strong", {
            class: "hero-lyric-current-text",
            title: r(z).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"
          }, n(r(z).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"), 9, Xn),
          e("button", {
            type: "button",
            class: "hero-lyric-seek-btn",
            title: "当前视频前进 5 秒",
            "aria-label": "前进 5 秒",
            onClick: T[4] || (T[4] = (P) => F(5))
          }, " › ")
        ]),
        e("button", {
          type: "button",
          class: "hero-lyric-collapse-btn",
          title: "收起台词栏",
          "aria-label": "收起台词栏",
          onClick: T[5] || (T[5] = C((P) => y.value = !0, ["stop"]))
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
        onPointerdown: T[6] || (T[6] = (P) => _("right", P))
      }, [...T[11] || (T[11] = [
        e("span", { class: "resize-line" }, null, -1)
      ])], 32))
    ], 6));
  }
}), Jn = /* @__PURE__ */ Ue(Qn, [["__scopeId", "data-v-d0857a88"]]), Zn = { class: "card-head bili-header-unified-row" }, el = { class: "bili-header-right" }, tl = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, il = { class: "card-fullscreen-bili-suggest-head" }, ol = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, sl = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, nl = ["onClick", "onContextmenu"], ll = { class: "card-fullscreen-bili-thumb" }, al = ["src"], rl = { key: 0 }, dl = { class: "card-fullscreen-bili-video-copy" }, ul = {
  class: "fm-pane",
  id: "pane-organizer"
}, cl = { id: "fo-body" }, pl = { class: "fo-bili-sidebar" }, bl = ["title"], vl = { class: "fo-sidebar-toggle-title" }, fl = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, gl = ["aria-expanded", "title"], ml = { class: "fo-sidebar-toggle-chevron" }, yl = { class: "fo-sidebar-features-wrap" }, hl = { class: "fo-sidebar-sub-wrap" }, kl = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, _l = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, $l = { class: "fo-sidebar-sub-wrap fo-sidebar-recommend-wrap" }, wl = { class: "fo-sidebar-sub-wrap fo-sidebar-radio-wrap" }, Cl = { class: "fo-sidebar-favorite-hub" }, xl = {
  key: 0,
  class: "fo-move-target-banner"
}, Sl = {
  class: "fo-bili-folder-list",
  "aria-label": "B站收藏夹"
}, Tl = {
  key: 0,
  class: "fo-bili-section-divider"
}, Ml = ["onDragover", "onDragleave", "onDrop"], Dl = { class: "fo-bili-section-title" }, Pl = ["data-folder-id", "data-folder-kind", "draggable", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], zl = ["aria-expanded", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], Bl = {
  class: "fo-group-caret",
  "aria-hidden": "true"
}, Il = {
  key: 0,
  class: "muted small"
}, Rl = {
  key: 0,
  id: "fo-vue-main",
  class: "fo-bili-main"
}, Ll = {
  key: 0,
  class: "fo-bili-loading"
}, El = {
  key: 1,
  class: "fo-bili-empty fo-bili-login-guide"
}, Al = { class: "fo-bili-login-card" }, Ul = { class: "fo-bili-login-actions" }, Vl = {
  key: 2,
  class: "fo-bili-empty"
}, Fl = { class: "fo-bili-hero fo-hero-persistent" }, Nl = { class: "fo-hero-left" }, ql = ["src"], Gl = {
  key: 1,
  class: "fo-folder-icon"
}, Ol = { class: "fo-hero-folder-info" }, Hl = { class: "fo-bili-actions" }, jl = ["disabled"], Wl = { class: "fo-bili-toolbar" }, Kl = {
  key: 0,
  class: "fo-bili-sort"
}, Yl = ["onClick"], Xl = {
  class: "fo-mini-dock-anchor",
  "aria-label": "视频标签页"
}, Ql = ["title"], Jl = { class: "fo-video-tab-title" }, Zl = { class: "fo-video-tab-actions" }, ea = ["title"], ta = {
  key: 2,
  class: "fo-bili-batch-actions"
}, ia = { class: "fo-batch-count" }, oa = { class: "fo-bili-grid" }, sa = {
  key: 0,
  class: "fo-bili-empty"
}, na = ["data-batch-id", "onDragstart", "onContextmenu"], la = { class: "fo-bili-thumb" }, aa = {
  key: 0,
  class: "fo-batch-check",
  title: "选择此视频"
}, ra = ["checked", "onChange"], da = ["href", "onClick"], ua = ["src"], ca = { class: "fo-bili-count" }, pa = { class: "fo-bili-duration" }, ba = { class: "fo-bili-title-row" }, va = ["href", "onClick"], fa = ["aria-expanded", "onClick"], ga = {
  key: 0,
  class: "fo-card-menu"
}, ma = ["onClick"], ya = ["onClick"], ha = ["onClick"], ka = { class: "fo-bili-meta" }, _a = ["onClick"], $a = {
  key: 0,
  class: "fo-pager"
}, wa = ["disabled"], Ca = { class: "fo-page-num" }, xa = ["disabled"], Sa = {
  key: 1,
  id: "fo-vue-cache-main",
  class: "fo-bili-main"
}, Ta = { class: "fo-bili-hero fo-hero-persistent fo-cached-hero" }, Ma = { class: "fo-hero-left" }, Da = { class: "fo-hero-folder-info" }, Pa = { class: "fo-bili-actions" }, za = {
  key: 0,
  class: "fo-bili-loading"
}, Ba = {
  key: 1,
  class: "fo-bili-grid fo-cached-video-grid"
}, Ia = {
  key: 0,
  class: "fo-bili-empty"
}, Ra = { class: "fo-bili-thumb" }, La = ["onClick"], Ea = ["src"], Aa = { class: "fo-bili-title-row" }, Ua = ["onClick"], Va = ["onClick"], Fa = { class: "fo-bili-meta" }, Na = {
  key: 2,
  id: "fo-vue-recommend-main",
  class: "fo-bili-main"
}, qa = { class: "fo-bili-hero" }, Ga = { class: "fo-bili-heading" }, Oa = { class: "fo-feed-hero-title" }, Ha = { class: "fo-feed-badge" }, ja = { class: "fo-bili-actions" }, Wa = ["disabled"], Ka = { class: "fo-bili-toolbar" }, Ya = { class: "fo-feed-count-tag" }, Xa = {
  key: 0,
  class: "fo-bili-loading"
}, Qa = {
  key: 1,
  class: "fo-bili-empty"
}, Ja = {
  key: 2,
  class: "fo-bili-grid"
}, Za = {
  key: 0,
  class: "fo-bili-empty"
}, er = ["onDragstart"], tr = { class: "fo-bili-thumb" }, ir = ["href", "onClick"], or = ["src"], sr = { class: "fo-bili-count" }, nr = { class: "fo-bili-duration" }, lr = { class: "fo-bili-title-row" }, ar = ["href", "onClick"], rr = ["aria-expanded", "onClick"], dr = {
  key: 0,
  class: "fo-card-menu"
}, ur = ["onClick"], cr = ["onClick"], pr = ["onClick"], br = ["onClick"], vr = ["onClick"], fr = { class: "fo-bili-meta" }, gr = ["onClick"], mr = {
  key: 3,
  id: "fo-vue-following-main",
  class: "fo-bili-main"
}, yr = { class: "fo-bili-hero" }, hr = { class: "fo-bili-heading" }, kr = { class: "fo-feed-hero-title" }, _r = { class: "fo-feed-badge" }, $r = { class: "fo-bili-actions" }, wr = ["disabled"], Cr = { class: "fo-up-groups-bar" }, xr = { class: "fo-up-groups-list" }, Sr = ["onClick"], Tr = { class: "count" }, Mr = { class: "fo-up-groups-actions" }, Dr = {
  key: 0,
  class: "fo-up-members-strip"
}, Pr = { class: "fo-up-members-label" }, zr = { class: "fo-up-members-list" }, Br = ["title", "onClick", "onContextmenu"], Ir = ["src"], Rr = { class: "fo-bili-toolbar" }, Lr = { class: "fo-feed-count-tag" }, Er = {
  key: 1,
  class: "fo-bili-loading"
}, Ar = {
  key: 2,
  class: "fo-bili-empty"
}, Ur = {
  key: 3,
  class: "fo-bili-grid"
}, Vr = {
  key: 0,
  class: "fo-bili-empty"
}, Fr = ["onDragstart"], Nr = { class: "fo-bili-thumb" }, qr = ["href", "onClick"], Gr = ["src"], Or = { class: "fo-bili-count" }, Hr = { class: "fo-bili-duration" }, jr = { class: "fo-bili-title-row" }, Wr = ["href", "onClick"], Kr = ["aria-expanded", "onClick"], Yr = {
  key: 0,
  class: "fo-card-menu"
}, Xr = ["onClick"], Qr = ["onClick"], Jr = ["onClick"], Zr = ["onClick"], ed = { class: "fo-bili-meta" }, td = ["onClick"], id = { class: "fo-pager" }, od = ["disabled"], sd = { class: "fo-page-num" }, nd = ["disabled"], ld = {
  key: 4,
  id: "fo-vue-subscription-main",
  class: "fo-bili-main fo-vue-subscription-main"
}, ad = { class: "bili-sub-vue-shell" }, rd = {
  key: 0,
  class: "fo-bili-loading"
}, dd = {
  key: 1,
  class: "fo-bili-empty"
}, ud = {
  key: 2,
  class: "bili-sub-layout bili-sub-vue-layout"
}, cd = {
  key: 5,
  id: "fo-vue-radio-main",
  class: "fo-bili-main fo-vue-radio-main"
}, pd = { class: "fo-bili-hero fo-radio-hero" }, bd = { class: "fo-bili-actions" }, vd = { class: "bili-radio-layout fo-vue-radio-layout" }, fd = { class: "bili-radio-folders" }, gd = { id: "bili-radio-folders" }, md = ["onClick"], yd = {
  key: 0,
  class: "muted small"
}, hd = { class: "bili-radio-library" }, kd = {
  key: 0,
  role: "alert",
  class: "muted small"
}, _d = {
  id: "bili-radio-videos",
  class: "bili-radio-videos"
}, $d = ["title", "onDragstart", "onClick"], wd = ["src"], Cd = { key: 1 }, xd = {
  key: 0,
  class: "muted small"
}, Sd = { class: "bili-radio-editor" }, Td = { class: "bili-radio-name-row" }, Md = ["placeholder", "onKeydown"], Dd = { class: "bili-radio-btn-group" }, Pd = { class: "bili-radio-series-dropdown-wrap" }, zd = {
  value: "",
  disabled: "",
  selected: ""
}, Bd = ["value"], Id = {
  id: "bili-radio-queue",
  class: "bili-radio-queue",
  "aria-label": "电台播放队列"
}, Rd = ["onClick"], Ld = { class: "bili-radio-queue-no" }, Ed = ["src"], Ad = { key: 1 }, Ud = ["aria-label", "onClick"], Vd = {
  key: 0,
  class: "muted small"
}, Fd = { class: "bili-radio-actions" }, Nd = ["disabled"], qd = ["disabled"], Gd = ["title"], Od = {
  key: 2,
  class: "fo-context-divider"
}, Hd = /* @__PURE__ */ ze({
  __name: "BilibiliWorkspace",
  setup(xe) {
    const m = S(!1);
    function B() {
      const l = z.radioSeriesName?.trim();
      if (!l) {
        m.value = !0;
        const t = document.getElementById("bili-radio-name");
        t && t.focus(), He.fetch("哔哩哔哩电台", "请先在输入框中填写系列名称后再保存");
        return;
      }
      m.value = !1, b("radio-save", { name: l });
    }
    async function y() {
      const l = document.getElementById("bili-radio-name");
      l && (l.focus(), l.select(), He.fetch("哔哩哔哩电台", "已聚焦系列名称输入框，直接修改后点击“💾 保存系列”即可"));
    }
    function R(l) {
      const t = l.target, i = t.value;
      if (i) {
        if (i === "__create_new__") {
          b("radio-clear"), z.radioSeriesName = "", He.fetch("哔哩哔哩电台", "已开启新系列创作，请从左侧添加视频"), t.value = "";
          return;
        }
        b("radio-load-series", i);
      }
    }
    function F(l, t) {
      !t.mid && !t.name || Ee.showUpRecentVideosPreview(
        {
          preventDefault: () => l.preventDefault(),
          stopPropagation: () => l.stopPropagation(),
          clientX: l.clientX,
          clientY: l.clientY
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
      wt.togglePanel();
    }
    const a = le(() => z.organizer), { active: k } = kt("daily-bilibili", "/bilibili.html");
    $e(() => k.value && a.value.mode === "recommendations", (l) => {
      Ee.setRecommendationsActive(l);
    }, { immediate: !0, flush: "sync" }), $e(() => k.value && a.value.mode === "following", (l) => {
      Ee.setFollowingActive(l);
    }, { immediate: !0, flush: "sync" }), $e(() => k.value && a.value.mode === "subscription", (l) => {
      Ee.setSubscriptionActive(l);
    }, { immediate: !0, flush: "sync" });
    const _ = S(a.value.query), N = S(!1), T = S(!1), P = S(""), q = S({ visible: !1, x: 0, y: 0, video: null, folder: null }), { menuRef: ae, style: j } = xt({
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
      me.bvid && ht.open({
        bvid: me.bvid,
        cid: me.cid,
        title: me.title
      });
    }
    function he() {
      me.collapsed && je.toggleCollapse(), je.bringToFront();
    }
    function de() {
      je.close();
    }
    $e(() => a.value.query, (l) => {
      _.value = l;
    });
    function b(l, t) {
      Ae.dispatch(l, t);
    }
    function ne(l) {
      b(l.group ? "toggle-folder-group" : "select-folder", { id: l.id, kind: l.kind });
    }
    const Z = S(""), te = S(""), X = S("before"), be = S(!1);
    function I(l, t) {
      t.kind === "created" && (Z.value = t.id, l.dataTransfer?.setData("application/x-logicweaver-favorite-node", t.id), l.dataTransfer?.setData("text/plain", t.id), l.dataTransfer && (l.dataTransfer.effectAllowed = "move"));
    }
    function v(l, t) {
      if (t.kind !== "created" || !Z.value || Z.value === t.id) return;
      l.preventDefault(), l.dataTransfer && (l.dataTransfer.dropEffect = "move");
      const i = l.currentTarget;
      if (!i) return;
      const u = i.getBoundingClientRect(), E = (l.clientY - u.top) / Math.max(1, u.height), ge = t.group && E > 0.25 && E < 0.75 ? "into" : E >= 0.5 ? "after" : "before";
      te.value = t.id, X.value = ge;
    }
    function G(l, t) {
      const i = l.relatedTarget, u = l.currentTarget;
      u && i && u.contains(i) || te.value === t.id && (te.value = "");
    }
    function K() {
      Z.value = "", te.value = "", be.value = !1;
    }
    function ke(l, t) {
      l.preventDefault();
      const i = Z.value || l.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "", u = X.value || (t.group ? "into" : "after");
      K(), !(!i || i === t.id || t.kind !== "created") && b("move-folder-node", { sourceId: i, targetId: t.id, mode: u });
    }
    function _e(l) {
      Z.value && (l.preventDefault(), l.dataTransfer && (l.dataTransfer.dropEffect = "move"), be.value = !0);
    }
    function $(l) {
      const t = l.relatedTarget, i = l.currentTarget;
      i && t && i.contains(t) || (be.value = !1);
    }
    function d(l) {
      l.preventDefault();
      const t = Z.value || l.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
      K(), t && b("move-folder-node", { sourceId: t, targetId: "root", mode: "into" });
    }
    function p() {
      const l = _.value.trim();
      b("organizer-search", l);
    }
    const D = S(""), Q = S(!1), ve = S(!1), Be = S("📺 B站 热门视频推荐"), Se = S("回车可在 B站 全网搜索"), fe = S([]), Te = S(null), Me = S([]);
    let Ie = 0, De = null;
    function Ve(l) {
      if (!l) return null;
      const t = l.bvid || (String(l.param || "").startsWith("BV") ? l.param : "");
      if (!t && !l.aid && !l.id) return null;
      const i = String(l.pic || l.cover || "").replace(/^http:/, "https:"), u = i.startsWith("//") ? `https:${i}` : i, E = String(l.title || "").replace(/<[^>]+>/g, ""), ge = Number(l.duration || 0), vt = ge > 0 ? `${Math.floor(ge / 60)}:${String(ge % 60).padStart(2, "0")}` : String(l.duration || ""), Xe = l.stat?.view || l.play || 0, ft = Number(Xe) >= 1e4 ? `${(Number(Xe) / 1e4).toFixed(1)}万` : String(Number(Xe || 0)), gt = l.owner?.name || l.name || l.author || "UP主";
      return {
        bvid: t,
        aid: String(l.aid || l.id || ""),
        title: E,
        cover: u,
        durationText: vt,
        playText: ft,
        upper: gt
      };
    }
    async function Ne() {
      if (Be.value = "📺 B站 热门视频推荐", Se.value = "回车可在 B站 全网搜索", Q.value = !0, Me.value.length && Date.now() - Ie < 9e4) {
        fe.value = Me.value;
        return;
      }
      ve.value = !0;
      try {
        const t = await (await fetch("https://api.bilibili.com/x/web-interface/index/top/feed/rcmd?ps=8&fresh_idx=1", { credentials: "include" })).json();
        let i = Array.isArray(t.data?.item) ? t.data.item : [];
        if (!i.length) {
          const ge = await (await fetch("https://api.bilibili.com/x/web-interface/popular?ps=8&pn=1", { credentials: "include" })).json();
          i = Array.isArray(ge.data?.list) ? ge.data.list : [];
        }
        const u = i.map(Ve).filter(Boolean);
        Me.value = u, Ie = Date.now(), D.value.trim() || (fe.value = u);
      } catch {
        fe.value = [];
      } finally {
        ve.value = !1;
      }
    }
    function w() {
      D.value.trim() ? c(D.value.trim()) : Ne();
    }
    function g() {
      const l = D.value.trim();
      if (clearTimeout(De), !l) {
        Ne();
        return;
      }
      De = setTimeout(() => {
        c(l);
      }, 320);
    }
    async function c(l) {
      Q.value = !0, Be.value = `🔍 “${l}” 的视频`, Se.value = "右键可收藏、缓存或本地播放", ve.value = !0;
      try {
        let t = null;
        if (window.LogicWeaverBiliSearchActions?.search)
          try {
            t = await window.LogicWeaverBiliSearchActions.search(l);
          } catch {
          }
        if (!t || t.code !== 0) {
          const u = `search_type=video&keyword=${encodeURIComponent(l)}&page=1&page_size=12`;
          t = await (await fetch(`https://api.bilibili.com/x/web-interface/search/type?${u}`, { credentials: "include" })).json();
        }
        if (D.value.trim() !== l) return;
        const i = Array.isArray(t?.data?.result) ? t.data.result : [];
        fe.value = i.slice(0, 10).map(Ve).filter(Boolean);
      } catch {
        fe.value = [];
      } finally {
        ve.value = !1;
      }
    }
    function x(l) {
      Q.value = !1;
      const t = l.bvid || (String(l.param || l.id || "").startsWith("BV") ? l.param || l.id : "");
      t || l.aid ? je.openVideo({
        bvid: t,
        aid: l.aid,
        title: l.title,
        cover: l.cover,
        author: l.upper
      }) : window.LogicWeaverBiliSearchActions?.local ? window.LogicWeaverBiliSearchActions.local(l) : window.open(`https://www.bilibili.com/video/${t || l.bvid || l.id}`, "_blank");
    }
    function V(l, t) {
      J(l, {
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
    function U() {
      const l = D.value.trim();
      if (Q.value = !1, !l) {
        Ne();
        return;
      }
      window.open(`https://search.bilibili.com/video?keyword=${encodeURIComponent(l)}`, "_blank");
    }
    function W(l) {
      Te.value && !Te.value.contains(l.target) && (Q.value = !1);
    }
    function ee(l) {
      q.value.visible = !1, P.value = P.value === l ? "" : l;
    }
    function J(l, t, i = !0) {
      P.value = "", q.value = {
        visible: !0,
        x: l.clientX,
        y: l.clientY,
        video: t,
        folder: i && z.activeFolderId ? { id: String(z.activeFolderId), title: a.value.folderTitle } : null
      };
    }
    function Re(l) {
      if (l instanceof KeyboardEvent) {
        l.key === "Escape" && (P.value = "", q.value.visible = !1, a.value.isTargetPickMode && b("organizer-cancel-move-target"));
        return;
      }
      const t = l.target;
      t?.closest(".fo-card-menu, .fo-card-more") || (P.value = ""), t?.closest(".fo-context-menu") || (q.value.visible = !1);
    }
    const Fe = typeof document < "u" && document.body.classList.contains("bili-standalone-body");
    function Ge() {
      !T.value || N.value || a.value.loading || (N.value = !0, b("organizer-open"));
    }
    $e(() => a.value.loading, (l) => {
      !l && !a.value.folders.length && Ge();
    }), Ke(() => {
      import("./bilibili-channel.service-U3w58QrM.js").catch((l) => console.error("[Bilibili] 频道动作服务加载失败", l)), T.value = !0, Ae.loadOrganizer(), Ge(), document.addEventListener("pointerdown", Re, !0), document.addEventListener("pointerdown", W), window.addEventListener("keydown", Re), window.setBiliMiniDockVisible?.(!0), requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }), $e(() => [a.value.videos, a.value.mode], () => {
      requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }, { flush: "post" }), yt(() => {
      Ee.setRecommendationsActive(!1), Ee.setFollowingActive(!1), Ee.setSubscriptionActive(!1), T.value = !1, document.removeEventListener("pointerdown", Re, !0), document.removeEventListener("pointerdown", W), window.removeEventListener("keydown", Re);
    });
    function qe(l, t) {
      P.value = "", q.value.visible = !1;
      const i = String(typeof l == "object" ? l.id || l.bvid || l.aid || "" : l), u = typeof l == "object" ? l : a.value.videos.find((E) => String(E.id) === i);
      b("organizer-video-action", { id: i, video: u, action: t });
    }
    async function oe(l) {
      const { video: t, folder: i } = q.value;
      if (q.value.visible = !1, l === "share-chat") {
        if (!t) return;
        try {
          const { chatService: u } = await import("./view-styles-BzNhElrV.js").then((ge) => ge.aK), { windowManagerController: E } = await import("./window-manager.store-D_Nuf9-p.js").then((ge) => ge.n);
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
      t && b("organizer-video-action", { id: t.id || "", video: t, action: l });
    }
    function Oe(l) {
      const t = z.radioSeriesName?.trim();
      let i = z.radioSeries.find((u) => u.name === t);
      if (!i && z.radioQueue.length && (i = {
        id: `series_${Date.now()}`,
        name: t || "未命名电台系列",
        count: z.radioQueue.length,
        items: z.radioQueue
      }), !i || !i.items?.length) {
        He.fetch("哔哩哔哩电台", "当前没有可分享的系列曲目，请先添加曲目");
        return;
      }
      at.sendBiliSeriesShare(i, l);
    }
    function ct(l) {
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
      }, l);
    }
    function pt(l) {
      if (!a.value.isTargetPickMode) return;
      if (!l.target?.closest(".fo-bili-folder-list")) {
        const i = document.querySelector(".fo-bili-folder-list");
        i && (l.preventDefault(), i.scrollTop += l.deltaY);
      }
    }
    function ot(l) {
      const t = document.createElement("div");
      return t.style.position = "fixed", t.style.top = "-9999px", t.style.left = "-9999px", t.style.width = "144px", t.style.height = "50px", t.style.borderRadius = "6px", t.style.backgroundColor = "#1e1e24", t.style.border = "2px solid #eab308", t.style.boxShadow = "0 8px 24px rgba(0,0,0,0.6), inset 0 0 12px rgba(234,179,8,0.25)", t.style.display = "flex", t.style.alignItems = "center", t.style.padding = "4px 8px", t.style.gap = "8px", t.style.color = "#fff", t.style.fontFamily = "sans-serif", t.style.zIndex = "999999", t.style.pointerEvents = "none", t.innerHTML = `
    <div style="width:26px;height:26px;border-radius:50%;border:1.5px solid #d4d4d8;display:flex;align-items:center;justify-content:center;background:#09090b;box-shadow:inset 0 1px 3px rgba(0,0,0,0.5);">
      <span style="display:block;width:7px;height:7px;background:#eab308;border-radius:50%;"></span>
    </div>
    <div style="flex:1;min-width:0;overflow:hidden;line-height:1.2;">
      <div style="font-size:7.5px;font-weight:900;color:#eab308;letter-spacing:1px;">CASSETTE TAPE</div>
      <div style="font-size:10px;font-weight:700;color:#f4f4f5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${l || "B站音乐卡带"}</div>
    </div>
    <div style="width:26px;height:26px;border-radius:50%;border:1.5px solid #d4d4d8;display:flex;align-items:center;justify-content:center;background:#09090b;box-shadow:inset 0 1px 3px rgba(0,0,0,0.5);">
      <span style="display:block;width:7px;height:7px;background:#eab308;border-radius:50%;"></span>
    </div>
  `, document.body.appendChild(t), t;
    }
    function Ye(l, t) {
      if (!l.dataTransfer) return;
      l.dataTransfer.effectAllowed = "copyMove", l.dataTransfer.setData("text/uri-list", t.url), l.dataTransfer.setData("text/plain", t.url), l.dataTransfer.setData("application/x-logicweaver-video-url", t.url), l.dataTransfer.setData("application/x-logicweaver-task", JSON.stringify({ type: "material", title: t.title, url: t.url, source: "B站收藏" }));
      const i = t.bvid || t.url?.match(/video\/(BV[0-9a-zA-Z]+)/)?.[1] || t.id, u = JSON.stringify({
        type: "bili-cassette-tape",
        bvid: i,
        title: t.title,
        cover: t.cover,
        author: t.author,
        duration: t.duration
      });
      l.dataTransfer.setData("application/x-bili-cassette", u), l.dataTransfer.setData("application/json", u);
      const E = ot(t.title);
      l.dataTransfer.setDragImage(E, 72, 25), setTimeout(() => {
        E.parentNode && E.parentNode.removeChild(E);
      }, 0);
    }
    function bt(l, t) {
      if (!l.dataTransfer) return;
      l.dataTransfer.effectAllowed = "copyMove";
      const i = JSON.stringify({
        type: "bili-cassette-tape",
        bvid: t.bvid,
        title: t.title,
        cover: t.cover,
        author: t.author,
        duration: t.duration
      });
      l.dataTransfer.setData("application/x-bili-cassette", i), l.dataTransfer.setData("application/json", i), l.dataTransfer.setData("text/plain", `https://www.bilibili.com/video/${t.bvid}`);
      const u = ot(t.title);
      l.dataTransfer.setDragImage(u, 72, 25), setTimeout(() => {
        u.parentNode && u.parentNode.removeChild(u);
      }, 0);
    }
    return (l, t) => (o(), s("section", {
      id: "daily-bilibili",
      class: L(["card wide", { "card-fullscreen": r(Fe) || r(Ze).activeId === "daily-bilibili" }])
    }, [
      e("header", Zn, [
        t[51] || (t[51] = e("div", { class: "bili-header-left" }, [
          e("span", {
            class: "bar",
            style: { background: "linear-gradient(180deg,#818cf8,#f472b6)" }
          }),
          e("h2", null, "B站收藏夹")
        ], -1)),
        e("div", el, [
          e("button", {
            id: "bili-header-msg-center-btn",
            class: L(["fm-tab bili-header-msg-btn", { "is-active": r(Ct).isOpen }]),
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
            ref: Te
          }, [
            e("form", {
              class: "card-fullscreen-bili-searchbar",
              role: "search",
              onSubmit: C(U, ["prevent"])
            }, [
              se(e("input", {
                "onUpdate:modelValue": t[0] || (t[0] = (i) => D.value = i),
                type: "search",
                autocomplete: "off",
                placeholder: "搜索 B站 视频…",
                "aria-label": "搜索 B站 视频",
                onFocus: w,
                onInput: g
              }, null, 544), [
                [we, D.value]
              ]),
              t[50] || (t[50] = e("button", {
                type: "submit",
                title: "搜索视频"
              }, "⌕", -1))
            ], 32),
            Q.value ? (o(), s("div", tl, [
              e("div", il, [
                e("span", null, n(Be.value), 1),
                e("small", null, n(Se.value), 1)
              ]),
              ve.value ? (o(), s("p", ol, "正在获取推荐 / 搜索中…")) : !fe.value.length && !ve.value ? (o(), s("p", sl, "没有找到相关视频，回车可在 B站 全网搜索")) : (o(!0), s(A, { key: 2 }, H(fe.value, (i) => (o(), s("button", {
                key: i.bvid || i.aid,
                type: "button",
                class: "card-fullscreen-bili-video-row",
                role: "option",
                onClick: (u) => x(i),
                onContextmenu: C((u) => V(u, i), ["prevent"])
              }, [
                e("span", ll, [
                  e("img", {
                    src: i.cover,
                    alt: "",
                    referrerpolicy: "no-referrer",
                    loading: "lazy"
                  }, null, 8, al),
                  i.durationText ? (o(), s("i", rl, n(i.durationText), 1)) : h("", !0)
                ]),
                e("span", dl, [
                  e("strong", null, n(i.title), 1),
                  e("small", null, n(i.upper) + " · " + n(i.playText) + "播放", 1)
                ])
              ], 40, nl))), 128))
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
      e("div", ul, [
        e("div", cl, [
          e("div", {
            class: L(["fo-bili-layout", { "fo-picking-move-target": a.value.isTargetPickMode }]),
            "data-vue-organizer-shell": "true",
            onWheel: pt
          }, [
            e("aside", pl, [
              e("div", {
                class: L(["fo-sidebar-toggle-bar", { "is-collapsed": Y.value }]),
                title: Y.value ? "点击展开快捷功能" : "点击收起快捷功能",
                onClick: ie
              }, [
                e("div", vl, [
                  t[52] || (t[52] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                  t[53] || (t[53] = e("span", null, "快捷频道", -1)),
                  Y.value ? (o(), s("span", fl, "5")) : h("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "fo-sidebar-toggle-action",
                  "aria-expanded": !Y.value,
                  title: Y.value ? "展开" : "收起"
                }, [
                  e("span", null, n(Y.value ? "展开" : "收起"), 1),
                  e("span", ml, n(Y.value ? "▾" : "▴"), 1)
                ], 8, gl)
              ], 10, bl),
              se(e("div", yl, [
                e("div", hl, [
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
                e("div", kl, [
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
                e("div", _l, [
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
                e("div", $l, [
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
                e("div", wl, [
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
              e("div", Cl, [
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
              a.value.isTargetPickMode ? (o(), s("div", xl, [
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
              e("nav", Sl, [
                (o(!0), s(A, null, H(a.value.folders, (i, u) => (o(), s(A, {
                  key: `${i.group ? "group" : "folder"}:${i.id}`
                }, [
                  u > 0 && a.value.folders[u - 1]?.kind !== i.kind ? (o(), s("div", Tl)) : h("", !0),
                  u === 0 || a.value.folders[u - 1]?.kind !== i.kind ? (o(), s("div", {
                    key: 1,
                    class: L(["fo-bili-section-head fo-vue-section-head", { "drag-into": i.kind === "created" && be.value }]),
                    onDragover: (E) => i.kind === "created" ? _e(E) : void 0,
                    onDragleave: (E) => i.kind === "created" ? $(E) : void 0,
                    onDrop: (E) => i.kind === "created" ? d(E) : void 0
                  }, [
                    e("span", Dl, [
                      e("b", null, n(i.kind === "collected" ? "我追的合集/收藏夹" : i.kind === "other" ? "其他收藏" : "我创建的收藏夹"), 1)
                    ]),
                    i.kind === "created" ? (o(), s("button", {
                      key: 0,
                      class: "fo-bili-section-add-btn",
                      type: "button",
                      title: "新建插件分组",
                      "aria-label": "新建插件分组",
                      onClick: t[9] || (t[9] = C((E) => b("create-local-group"), ["stop"]))
                    }, "＋")) : h("", !0)
                  ], 42, Ml)) : h("", !0),
                  i.group ? (o(), s("div", {
                    key: 3,
                    class: L(["fo-bili-group-label", {
                      collapsed: i.collapsed,
                      dragging: Z.value === i.id,
                      "drag-before": te.value === i.id && X.value === "before",
                      "drag-after": te.value === i.id && X.value === "after",
                      "drag-into": te.value === i.id && X.value === "into"
                    }]),
                    style: Ce({ "--fo-depth": i.depth }),
                    role: "button",
                    tabindex: "0",
                    "aria-expanded": !i.collapsed,
                    draggable: !0,
                    onClick: (E) => ne(i),
                    onKeydown: [
                      Pe(C((E) => ne(i), ["prevent"]), ["enter"]),
                      Pe(C((E) => ne(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (E) => I(E, i),
                    onDragover: (E) => v(E, i),
                    onDragleave: (E) => G(E, i),
                    onDrop: (E) => ke(E, i),
                    onDragend: K
                  }, [
                    e("i", Bl, n(i.collapsed ? "›" : "⌄"), 1),
                    t[62] || (t[62] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, n(i.title), 1),
                    e("small", null, n(i.count), 1)
                  ], 46, zl)) : (o(), s("div", {
                    key: 2,
                    role: "button",
                    tabindex: "0",
                    class: L(["fo-bili-folder", {
                      on: i.selected,
                      dragging: Z.value === i.id,
                      "drag-before": te.value === i.id && X.value === "before",
                      "drag-after": te.value === i.id && X.value === "after",
                      "drag-into": te.value === i.id && X.value === "into",
                      "target-candidate": a.value.isTargetPickMode && i.kind === "created" && !i.selected
                    }]),
                    "data-folder-id": i.id,
                    "data-folder-kind": i.kind,
                    style: Ce({ "--fo-depth": i.depth }),
                    draggable: i.kind === "created",
                    onClick: (E) => ne(i),
                    onKeydown: [
                      Pe(C((E) => ne(i), ["prevent"]), ["enter"]),
                      Pe(C((E) => ne(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (E) => I(E, i),
                    onDragover: (E) => v(E, i),
                    onDragleave: (E) => G(E, i),
                    onDrop: (E) => ke(E, i),
                    onDragend: K
                  }, [
                    t[61] || (t[61] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, n(i.title), 1),
                    e("small", null, n(i.count), 1)
                  ], 46, Pl))
                ], 64))), 128)),
                !a.value.loading && !a.value.error && !a.value.folders.length ? (o(), s("p", Il, "暂无可用收藏夹。")) : h("", !0)
              ])
            ]),
            a.value.mode === "organizer" ? (o(), s("section", Rl, [
              a.value.loading ? (o(), s("div", Ll, [...t[63] || (t[63] = [
                e("i", null, null, -1),
                e("span", null, "正在读取 B站收藏内容…", -1)
              ])])) : a.value.error && a.value.error.includes("未登录") ? (o(), s("div", El, [
                e("div", Al, [
                  t[65] || (t[65] = e("span", { class: "fo-bili-login-icon" }, "📺", -1)),
                  t[66] || (t[66] = e("h3", null, "未检测到哔哩哔哩登录状态", -1)),
                  t[67] || (t[67] = e("p", null, "tab-Project 直接复用当前浏览器的 B站 网页会话，无需输入账号密码或扫码授权。", -1)),
                  e("div", Ul, [
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
              ])) : a.value.error ? (o(), s("p", Vl, n(a.value.error), 1)) : (o(), s(A, { key: 3 }, [
                e("header", Fl, [
                  e("div", Nl, [
                    e("div", {
                      class: L(["fo-bili-cover", { "fo-vue-cover-image": a.value.folderCover }])
                    }, [
                      a.value.folderCover ? (o(), s("img", {
                        key: 0,
                        src: a.value.folderCover,
                        alt: "",
                        referrerpolicy: "no-referrer"
                      }, null, 8, ql)) : (o(), s("i", Gl))
                    ], 2),
                    e("div", Ol, [
                      e("h3", null, n(a.value.folderTitle), 1),
                      e("p", null, n(a.value.folderSubtitle), 1)
                    ])
                  ]),
                  ye(Jn, { "inline-hero": "" }),
                  e("div", Hl, [
                    e("button", {
                      type: "button",
                      class: "primary",
                      disabled: !a.value.videos.length,
                      onClick: t[11] || (t[11] = (i) => b("organizer-batch-toggle"))
                    }, n(a.value.batchMode ? "返回" : "批量操作"), 9, jl),
                    e("button", {
                      type: "button",
                      title: "刷新收藏夹",
                      onClick: t[12] || (t[12] = (i) => b("organizer-refresh"))
                    }, "↻")
                  ])
                ]),
                e("div", Wl, [
                  a.value.batchMode ? h("", !0) : (o(), s("div", Kl, [
                    (o(), s(A, null, H([{ id: "fav_time", text: "最近收藏" }, { id: "view", text: "最多播放" }, { id: "pubtime", text: "最近投稿" }], (i) => e("button", {
                      key: i.id,
                      type: "button",
                      class: L({ on: a.value.sort === i.id }),
                      onClick: (u) => b("organizer-sort", i.id)
                    }, n(i.text), 11, Yl)), 64))
                  ])),
                  e("div", Xl, [
                    r(me).isOpen && r(me).bvid ? (o(), s("div", {
                      key: 0,
                      class: L(["fo-video-tab-item", { "is-collapsed": r(me).collapsed }]),
                      title: r(me).title
                    }, [
                      e("div", {
                        class: "fo-video-tab-meta",
                        onClick: he
                      }, [
                        e("span", {
                          class: L(["fo-video-tab-pulse", { playing: r(me).isPlaying }])
                        }, null, 2),
                        e("span", Jl, n(r(me).title), 1)
                      ]),
                      e("div", Zl, [
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-close",
                          title: "关闭视频",
                          onClick: C(de, ["stop"])
                        }, " ✕ "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-sub",
                          title: "查看该视频完整纯文本字幕",
                          onClick: C(pe, ["stop"])
                        }, " 字幕 "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-expand",
                          title: r(me).collapsed ? "放大恢复视频小窗" : "聚焦视频小窗",
                          onClick: C(he, ["stop"])
                        }, " 放大 ", 8, ea)
                      ])
                    ], 10, Ql)) : h("", !0)
                  ]),
                  a.value.batchMode ? (o(), s("div", ta, [
                    e("span", ia, "已选择 " + n(a.value.selectedCount) + " 项", 1),
                    e("button", {
                      type: "button",
                      onClick: t[14] || (t[14] = (i) => b("organizer-batch-all"))
                    }, "全选/取消全选"),
                    e("button", {
                      type: "button",
                      class: L({ "picking-target": a.value.isTargetPickMode }),
                      onClick: t[15] || (t[15] = (i) => a.value.isTargetPickMode ? b("organizer-cancel-move-target") : b("organizer-batch-move"))
                    }, n(a.value.isTargetPickMode ? "✕ 取消移动" : "移动到"), 3),
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
                    onSubmit: C(p, ["prevent"])
                  }, [
                    se(e("input", {
                      "onUpdate:modelValue": t[13] || (t[13] = (i) => _.value = i),
                      type: "search",
                      placeholder: "请输入关键词",
                      "aria-label": "搜索当前收藏夹"
                    }, null, 512), [
                      [we, _.value]
                    ]),
                    t[68] || (t[68] = e("button", {
                      type: "submit",
                      title: "搜索"
                    }, "⌕", -1))
                  ], 32))
                ]),
                e("div", oa, [
                  a.value.videos.length ? h("", !0) : (o(), s("p", sa, n(a.value.query ? "没有找到匹配的视频。" : "这个收藏夹是空的。"), 1)),
                  (o(!0), s(A, null, H(a.value.videos, (i) => (o(), s("article", {
                    key: i.id,
                    class: L(["fo-bili-card", { "batch-selected": i.selected, "fo-single-moving": a.value.movingVideoId === i.id }]),
                    "data-batch-id": i.id,
                    draggable: "true",
                    onDragstart: (u) => Ye(u, i),
                    onContextmenu: C((u) => J(u, i), ["prevent", "stop"])
                  }, [
                    e("div", la, [
                      a.value.batchMode ? (o(), s("label", aa, [
                        e("input", {
                          type: "checkbox",
                          checked: i.selected,
                          onChange: (u) => b("organizer-batch-select", i.id)
                        }, null, 40, ra),
                        t[69] || (t[69] = e("span", null, "✓", -1))
                      ])) : h("", !0),
                      e("a", {
                        class: "fo-cover-link",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: C((u) => b("organizer-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, ua)
                      ], 8, da),
                      e("span", ca, "▣ " + n(i.playCount), 1),
                      e("span", pa, n(i.duration), 1)
                    ]),
                    e("div", ba, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: C((u) => b("organizer-play-video", i), ["prevent"])
                      }, n(i.title), 9, va),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": P.value === i.id,
                        onClick: C((u) => ee(i.id), ["stop"])
                      }, "⋮", 8, fa),
                      P.value === i.id ? (o(), s("div", ga, [
                        i.writable ? (o(), s("button", {
                          key: 0,
                          type: "button",
                          class: "danger",
                          onClick: (u) => qe(i.id, "delete")
                        }, "取消收藏", 8, ma)) : h("", !0),
                        i.writable ? (o(), s("button", {
                          key: 1,
                          type: "button",
                          onClick: (u) => qe(i.id, "move")
                        }, "移动到", 8, ya)) : h("", !0),
                        e("button", {
                          type: "button",
                          onClick: (u) => qe(i.id, "subtitle")
                        }, "字幕", 8, ha)
                      ])) : h("", !0)
                    ]),
                    e("div", ka, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: C((u) => F(u, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, n(i.author), 9, _a),
                      e("span", null, "收藏于 " + n(i.favoriteDate), 1)
                    ])
                  ], 42, na))), 128))
                ]),
                a.value.totalPages > 1 ? (o(), s("div", $a, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: a.value.page <= 1,
                    onClick: t[18] || (t[18] = (i) => b("organizer-page", a.value.page - 1))
                  }, "‹ 上一页", 8, wa),
                  e("span", Ca, n(a.value.page) + " / " + n(a.value.totalPages), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: a.value.page >= a.value.totalPages,
                    onClick: t[19] || (t[19] = (i) => b("organizer-page", a.value.page + 1))
                  }, "下一页 ›", 8, xa)
                ])) : h("", !0)
              ], 64))
            ])) : a.value.mode === "cache" ? (o(), s("section", Sa, [
              e("header", Ta, [
                e("div", Ma, [
                  t[71] || (t[71] = e("div", { class: "fo-bili-cover" }, "💾", -1)),
                  e("div", Da, [
                    t[70] || (t[70] = e("h3", null, "缓存视频", -1)),
                    e("p", null, n(a.value.cachedVideos.length) + " 个缓存记录 · 存放目录可在设置中选择", 1)
                  ])
                ]),
                e("div", Pa, [
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
              a.value.cacheLoading ? (o(), s("div", za, [...t[72] || (t[72] = [
                e("i", null, null, -1),
                e("span", null, "正在读取本地缓存…", -1)
              ])])) : (o(), s("div", Ba, [
                a.value.cachedVideos.length ? h("", !0) : (o(), s("p", Ia, "还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。")),
                (o(!0), s(A, null, H(a.value.cachedVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card fo-cached-video-card"
                }, [
                  e("div", Ra, [
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
                      }, null, 8, Ea),
                      t[73] || (t[73] = e("span", { class: "fo-cached-local-badge" }, "LOCAL", -1))
                    ], 8, La)
                  ]),
                  e("div", Aa, [
                    e("button", {
                      class: "fo-title-link fo-bili-title fo-cached-title",
                      type: "button",
                      onClick: (u) => b("cache-play", i.id)
                    }, n(i.title), 9, Ua),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "删除缓存",
                      onClick: (u) => b("cache-delete", i.id)
                    }, "×", 8, Va)
                  ]),
                  e("div", Fa, [
                    e("span", null, n(i.sizeText), 1),
                    e("span", null, "缓存于 " + n(i.cachedDate), 1)
                  ])
                ]))), 128))
              ]))
            ])) : a.value.mode === "recommendations" ? (o(), s("section", Na, [
              e("header", qa, [
                t[74] || (t[74] = e("div", { class: "fo-bili-cover fo-vue-recommend-cover" }, [
                  e("span", null, "✨")
                ], -1)),
                e("div", Ga, [
                  e("div", Oa, [
                    e("h3", null, n(a.value.specialTitle), 1),
                    e("span", Ha, n(a.value.specialBadge), 1)
                  ]),
                  e("p", null, n(a.value.specialSubtitle), 1)
                ]),
                e("div", ja, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !a.value.specialVideos.length,
                    onClick: t[22] || (t[22] = (i) => b("special-play-page"))
                  }, "▶ 播放本页", 8, Wa),
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
              e("div", Ka, [
                t[75] || (t[75] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "🔥 猜你喜欢与热门精选")
                ], -1)),
                e("div", Ya, "本页共 " + n(a.value.specialVideos.length) + " 个视频", 1)
              ]),
              a.value.specialLoading ? (o(), s("div", Xa, [...t[76] || (t[76] = [
                e("i", null, null, -1),
                e("span", null, "正在加载个性化推荐视频…", -1)
              ])])) : a.value.specialError ? (o(), s("p", Qa, n(a.value.specialError), 1)) : (o(), s("div", Ja, [
                a.value.specialVideos.length ? h("", !0) : (o(), s("p", Za, "暂无推荐视频。")),
                (o(!0), s(A, null, H(a.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (u) => Ye(u, i)
                }, [
                  e("div", tr, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: C((u) => b("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                        alt: ""
                      }, null, 8, or)
                    ], 8, ir),
                    e("span", sr, "▣ " + n(i.playCount), 1),
                    e("span", nr, n(i.duration), 1)
                  ]),
                  e("div", lr, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: C((u) => b("special-play-video", i), ["prevent"])
                    }, n(i.title), 9, ar),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": P.value === i.id,
                      onClick: C((u) => ee(i.id), ["stop"])
                    }, "⋮", 8, rr),
                    P.value === i.id ? (o(), s("div", dr, [
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { video: i, id: i.id, action: "collect-inbox" }), P.value = "";
                        }
                      }, "📥 添加到收集箱", 8, ur),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { id: i.id, action: "play" }), P.value = "";
                        }
                      }, "本地播放与评论", 8, cr),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { id: i.id, action: "subtitle" }), P.value = "";
                        }
                      }, "字幕提取", 8, pr),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { id: i.id, action: "cache" }), P.value = "";
                        }
                      }, "缓存视频", 8, br),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { id: i.id, action: "open" }), P.value = "";
                        }
                      }, "打开网页", 8, vr)
                    ])) : h("", !0)
                  ]),
                  e("div", fr, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: C((u) => F(u, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, n(i.author), 9, gr),
                    e("span", null, n(i.favoriteDate), 1)
                  ])
                ], 40, er))), 128))
              ]))
            ])) : a.value.mode === "following" ? (o(), s("section", mr, [
              e("header", yr, [
                t[77] || (t[77] = e("div", { class: "fo-bili-cover fo-vue-following-cover" }, [
                  e("span", null, "📺")
                ], -1)),
                e("div", hr, [
                  e("div", kr, [
                    e("h3", null, n(a.value.specialTitle), 1),
                    e("span", _r, n(a.value.specialBadge), 1)
                  ]),
                  e("p", null, n(a.value.specialSubtitle), 1)
                ]),
                e("div", $r, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !a.value.specialVideos.length,
                    onClick: t[25] || (t[25] = (i) => b("special-play-page"))
                  }, "▶ 播放本页", 8, wr),
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
              e("div", Cr, [
                e("div", xr, [
                  (o(!0), s(A, null, H(a.value.followingGroups, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: L(["fo-up-group-chip", { active: i.active }]),
                    onClick: (u) => b("following-group", i.id)
                  }, [
                    ce(n(i.child ? "↳ " : "") + n(i.name) + " ", 1),
                    e("small", Tr, n(i.count), 1)
                  ], 10, Sr))), 128))
                ]),
                e("div", Mr, [
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
              a.value.followingMembers.length ? (o(), s("div", Dr, [
                e("div", Pr, [
                  e("b", null, n(a.value.specialBadge), 1),
                  e("small", null, "共 " + n(a.value.followingMembers.length) + " 位 UP 主", 1)
                ]),
                e("div", zr, [
                  e("button", {
                    type: "button",
                    class: L(["fo-up-member-chip", { active: !a.value.followingMembers.some((i) => i.active) }]),
                    onClick: t[30] || (t[30] = (i) => b("following-member", ""))
                  }, "全部UP", 2),
                  (o(!0), s(A, null, H(a.value.followingMembers, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: L(["fo-up-member-chip", { active: i.active }]),
                    title: `左键筛选「${i.name}」，右键预览近期投稿`,
                    onClick: (u) => b("following-member", i.id),
                    onContextmenu: C((u) => b("following-preview-member", { id: i.id, clientX: u.clientX, clientY: u.clientY }), ["prevent"])
                  }, [
                    i.face ? (o(), s("img", {
                      key: 0,
                      loading: "lazy",
                      referrerpolicy: "no-referrer",
                      src: i.face,
                      alt: ""
                    }, null, 8, Ir)) : h("", !0),
                    e("span", null, n(i.name), 1)
                  ], 42, Br))), 128))
                ]),
                e("button", {
                  type: "button",
                  class: "fo-btn-manage-members",
                  onClick: t[31] || (t[31] = (i) => b("following-manage-groups", "members"))
                }, "＋ 管理成员")
              ])) : h("", !0),
              e("div", Rr, [
                t[78] || (t[78] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "⚡ UP 主最新投稿动态")
                ], -1)),
                e("div", Lr, "本页共 " + n(a.value.specialVideos.length) + " 个视频", 1)
              ]),
              a.value.specialLoading ? (o(), s("div", Er, [...t[79] || (t[79] = [
                e("i", null, null, -1),
                e("span", null, "正在读取关注 UP 主更新…", -1)
              ])])) : a.value.specialError ? (o(), s("p", Ar, n(a.value.specialError), 1)) : (o(), s("div", Ur, [
                a.value.specialVideos.length ? h("", !0) : (o(), s("p", Vr, "暂无最新关注视频动态。")),
                (o(!0), s(A, null, H(a.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (u) => Ye(u, i)
                }, [
                  e("div", Nr, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: C((u) => b("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, Gr)
                    ], 8, qr),
                    e("span", Or, "▣ " + n(i.playCount), 1),
                    e("span", Hr, n(i.duration), 1)
                  ]),
                  e("div", jr, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: C((u) => b("special-play-video", i), ["prevent"])
                    }, n(i.title), 9, Wr),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": P.value === i.id,
                      onClick: C((u) => ee(i.id), ["stop"])
                    }, "⋮", 8, Kr),
                    P.value === i.id ? (o(), s("div", Yr, [
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { video: i, id: i.id, action: "play" }), P.value = "";
                        }
                      }, "本地播放与评论", 8, Xr),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { video: i, id: i.id, action: "subtitle" }), P.value = "";
                        }
                      }, "字幕提取", 8, Qr),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { video: i, id: i.id, action: "cache" }), P.value = "";
                        }
                      }, "缓存视频", 8, Jr),
                      e("button", {
                        type: "button",
                        onClick: (u) => {
                          b("special-video-action", { video: i, id: i.id, action: "open" }), P.value = "";
                        }
                      }, "打开网页", 8, Zr)
                    ])) : h("", !0)
                  ]),
                  e("div", ed, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: C((u) => F(u, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, n(i.author), 9, td),
                    e("span", null, n(i.favoriteDate), 1)
                  ])
                ], 40, Fr))), 128))
              ])),
              e("div", id, [
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: a.value.specialLoading || a.value.specialPage <= 1,
                  onClick: t[32] || (t[32] = (i) => b("following-page", a.value.specialPage - 1))
                }, "‹ 上一页", 8, od),
                e("span", sd, "第 " + n(a.value.specialPage) + " 页", 1),
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: a.value.specialLoading || !a.value.followingHasMore,
                  onClick: t[33] || (t[33] = (i) => b("following-page", a.value.specialPage + 1))
                }, "下一页 ›", 8, nd)
              ])
            ])) : a.value.mode === "subscription" ? (o(), s("section", ld, [
              e("div", ad, [
                ye(ei, { "show-back": "" }),
                a.value.subscriptionLoading ? (o(), s("div", rd, [...t[80] || (t[80] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取订阅视频与 AI 字幕稿…", -1)
                ])])) : a.value.subscriptionError ? (o(), s("p", dd, "读取失败：" + n(a.value.subscriptionError), 1)) : (o(), s("div", ud, [
                  ye(Co),
                  ye(wi)
                ]))
              ])
            ])) : a.value.mode === "radio" ? (o(), s("section", cd, [
              e("header", pd, [
                t[81] || (t[81] = e("div", { class: "fo-hero-left" }, [
                  e("div", { class: "fo-bili-cover fo-vue-radio-cover" }, [
                    e("span", null, "📻")
                  ]),
                  e("div", { class: "fo-hero-folder-info" }, [
                    e("h3", null, "B站电台"),
                    e("p", null, "从左侧选择收藏夹，将视频拖拽或添加到连播队列，自由编排系列随心听")
                  ])
                ], -1)),
                e("div", bd, [
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
              e("div", vd, [
                e("aside", fd, [
                  t[82] || (t[82] = e("p", { class: "sw-title" }, "收藏夹", -1)),
                  e("div", gd, [
                    (o(!0), s(A, null, H(r(z).radioFolders, (i) => (o(), s("button", {
                      key: i.id,
                      type: "button",
                      class: L(["bili-radio-folder", { on: i.id === r(z).radioActiveFolderId }]),
                      onClick: (u) => b("radio-select-folder", i.id)
                    }, [
                      e("span", null, n(i.title), 1),
                      e("span", null, n(i.count), 1)
                    ], 10, md))), 128)),
                    r(z).radioFolders.length ? h("", !0) : (o(), s("p", yd, n(r(z).radioLoading ? "加载中…" : "暂无收藏夹"), 1))
                  ])
                ]),
                e("section", hd, [
                  t[84] || (t[84] = e("p", {
                    id: "bili-radio-library-title",
                    class: "sw-title"
                  }, "收藏夹视频", -1)),
                  r(z).radioError ? (o(), s("p", kd, n(r(z).radioError), 1)) : h("", !0),
                  e("div", _d, [
                    (o(!0), s(A, null, H(r(z).radioVideos, (i) => (o(), s("button", {
                      key: i.bvid,
                      type: "button",
                      class: "bili-radio-video",
                      title: `${i.title} (点击加入连播队列，或按住拖拽封面到下方卡带机直接播放)`,
                      draggable: "true",
                      onDragstart: (u) => bt(u, i),
                      onClick: (u) => b("radio-add", { bvid: i.bvid, title: i.title, cover: i.cover, author: i.author, duration: i.duration })
                    }, [
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, wd)) : (o(), s("span", Cd)),
                      e("p", null, n(i.title), 1),
                      t[83] || (t[83] = e("span", null, "＋", -1))
                    ], 40, $d))), 128)),
                    r(z).radioVideos.length ? h("", !0) : (o(), s("p", xd, n(r(z).radioLoading ? "读取视频中…" : "此收藏夹暂无可播放视频"), 1))
                  ])
                ]),
                e("section", Sd, [
                  e("div", Td, [
                    se(e("input", {
                      id: "bili-radio-name",
                      "onUpdate:modelValue": t[36] || (t[36] = (i) => r(z).radioSeriesName = i),
                      maxlength: "48",
                      class: L({ "has-error": m.value }),
                      placeholder: m.value ? "⚠️ 请在此输入系列名称后再保存！" : "请输入系列名称（必填）",
                      autocomplete: "off",
                      onInput: t[37] || (t[37] = (i) => m.value = !1),
                      onKeydown: Pe(C(B, ["prevent"]), ["enter"])
                    }, null, 42, Md), [
                      [we, r(z).radioSeriesName]
                    ]),
                    e("div", Dd, [
                      e("button", {
                        id: "bili-radio-save",
                        type: "button",
                        title: "保存当前队列为系列",
                        onClick: B
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
                        onSelect: Oe
                      })
                    ]),
                    e("div", Pd, [
                      e("select", {
                        class: "bili-radio-series-select",
                        title: "快速切换已保存的系列",
                        onChange: R
                      }, [
                        e("option", zd, n(r(z).radioSeries.length ? `📚 已保存系列 (${r(z).radioSeries.length})` : "📚 暂无保存系列"), 1),
                        (o(!0), s(A, null, H(r(z).radioSeries, (i) => (o(), s("option", {
                          key: i.id,
                          value: i.id
                        }, n(i.name) + " (" + n(i.count) + "首) ", 9, Bd))), 128)),
                        t[85] || (t[85] = e("option", {
                          value: "__create_new__",
                          class: "bili-radio-create-opt"
                        }, " ＋ 创建系列 ", -1))
                      ], 32)
                    ])
                  ]),
                  e("div", Id, [
                    (o(!0), s(A, null, H(r(z).radioQueue, (i, u) => (o(), s("div", {
                      key: `${i.bvid}-${u}`,
                      class: L(["bili-radio-queue-item", { "is-playing": r(O).active && r(O).trackIndex === u + 1 }]),
                      title: "点击立即从该曲目开始播放",
                      onClick: (E) => b("radio-play-index", u)
                    }, [
                      e("span", Ld, n(r(O).active && r(O).trackIndex === u + 1 ? "♪" : u + 1), 1),
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Ed)) : (o(), s("span", Ad)),
                      e("p", null, n(i.title), 1),
                      e("button", {
                        type: "button",
                        class: "bili-radio-remove",
                        "aria-label": `移除 ${i.title}`,
                        onClick: C((E) => b("radio-remove", { index: u }), ["stop"])
                      }, "×", 8, Ud)
                    ], 10, Rd))), 128)),
                    r(z).radioQueue.length ? h("", !0) : (o(), s("p", Vd, "点击左侧视频加入连播队列。"))
                  ]),
                  e("div", Fd, [
                    e("button", {
                      id: "bili-radio-play",
                      type: "button",
                      disabled: !r(z).radioQueue.length,
                      onClick: t[38] || (t[38] = (i) => b("radio-play"))
                    }, "▶ 按顺序播放", 8, Nd),
                    e("button", {
                      id: "bili-radio-shuffle",
                      type: "button",
                      disabled: !r(z).radioQueue.length,
                      onClick: t[39] || (t[39] = (i) => b("radio-shuffle"))
                    }, "🔀 随机播放", 8, qd),
                    e("button", {
                      id: "bili-radio-clear",
                      type: "button",
                      onClick: t[40] || (t[40] = (i) => b("radio-clear"))
                    }, "清空编辑区")
                  ])
                ])
              ]),
              r(Fe) || r(Ze).activeId === "daily-bilibili" ? h("", !0) : (o(), nt(dt, { key: 0 }))
            ])) : h("", !0)
          ], 34)
        ])
      ]),
      r(Fe) || r(Ze).activeId === "daily-bilibili" ? (o(), nt(dt, {
        key: 0,
        "dock-side": ""
      })) : h("", !0),
      t[96] || (t[96] = e("div", {
        class: "fm-pane",
        id: "pane-sub-video",
        hidden: "",
        style: { display: "none !important" }
      }, null, -1)),
      ye(Xo),
      ye(Js),
      q.value.visible && q.value.video ? (o(), s("div", {
        key: 1,
        ref_key: "videoMenuRef",
        ref: ae,
        class: "fo-context-menu",
        role: "menu",
        style: Ce(r(j)),
        onClick: t[48] || (t[48] = C(() => {
        }, ["stop"]))
      }, [
        e("div", {
          class: "fo-context-header",
          title: q.value.video.title
        }, n(q.value.video.title), 9, Gd),
        ye(rt, {
          label: "💬 发送到聊天室",
          "match-menu-item": "",
          visible: q.value.visible,
          onSelect: ct
        }, null, 8, ["visible"]),
        t[93] || (t[93] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[41] || (t[41] = (i) => oe("play"))
        }, [...t[86] || (t[86] = [
          e("span", { class: "fo-context-icon" }, "▶", -1),
          ce(" 小窗播放视频 ", -1)
        ])]),
        t[94] || (t[94] = e("div", { class: "fo-context-divider" }, null, -1)),
        q.value.video.writable ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "fo-context-item danger",
          onClick: t[42] || (t[42] = (i) => oe("delete"))
        }, [...t[87] || (t[87] = [
          e("span", { class: "fo-context-icon" }, "🗑", -1),
          ce(" 取消收藏 ", -1)
        ])])) : h("", !0),
        q.value.video.writable ? (o(), s("button", {
          key: 1,
          type: "button",
          class: "fo-context-item",
          onClick: t[43] || (t[43] = (i) => oe("move"))
        }, [...t[88] || (t[88] = [
          e("span", { class: "fo-context-icon" }, "📁", -1),
          ce(" 移动到… ", -1)
        ])])) : h("", !0),
        q.value.video.writable ? (o(), s("div", Od)) : h("", !0),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[44] || (t[44] = (i) => oe("open"))
        }, [...t[89] || (t[89] = [
          e("span", { class: "fo-context-icon" }, "↗", -1),
          ce(" 跳转到 B站 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[45] || (t[45] = (i) => oe("copy-link"))
        }, [...t[90] || (t[90] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ce(" 复制链接 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[46] || (t[46] = (i) => oe("cache"))
        }, [...t[91] || (t[91] = [
          e("span", { class: "fo-context-icon" }, "💾", -1),
          ce(" 缓存视频 ", -1)
        ])]),
        t[95] || (t[95] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[47] || (t[47] = (i) => oe("subtitle"))
        }, [...t[92] || (t[92] = [
          e("span", { class: "fo-context-icon" }, "▤", -1),
          ce(" 字幕转文本 ", -1)
        ])])
      ], 4)) : h("", !0)
    ], 2));
  }
}), nu = /* @__PURE__ */ Ue(Hd, [["__scopeId", "data-v-9ec5fc98"]]);
export {
  nu as default
};
