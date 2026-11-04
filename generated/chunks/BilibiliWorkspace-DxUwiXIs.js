import { d as Ie, o, g as s, h as e, t as l, u as n, C as L, p as de, F as V, j, i as y, s as ye, k as C, y as oe, w as _e, D as Xe, z as bt, n as ne, q as Se, m as ze, b as S, G as st, R as at, B as Te, v as kt, A as nt, H as et, L as $t, e as rt } from "./vendor-vue-FFI3kJnP.js";
import { c as D, b as Ve, d as tt, a as H, r as Ee, s as wt } from "./bili-favorites-store-NdhHQkl1.js";
import { c as dt, n as We, z as he, d as Ye, r as it, B as ut } from "./view-styles-Dl5Su5-d.js";
import "./fullscreen-cards.store-DjWHl_SW.js";
import { u as Ct } from "./useCardActivity-BvQLxzJq.js";
import { _ as Ue, t as B } from "./_plugin-vue_export-helper-CVWGtx1v.js";
import { B as Ke } from "./BiliRichText-Dqn04MQW.js";
import { d as xt, a as St } from "./playback-sync-DzO2Ykfs.js";
import { a as re, d as ot, e as f, c as ce } from "./up-group-manager-store-COGru9Xk.js";
import { biliMessagePanelController as Tt, biliMessagePanelState as Mt } from "./message-panel-store-BEBgwbSu.js";
import { bilibiliChannelService as Ae } from "./bilibili-channel.service-B0Lbm3GJ.js";
import { u as Dt } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-DRvNM_7u.js";
import { C as ct } from "./ChatShareMenu-D9z3OUFK.js";
const Pt = { class: "bili-sub-header bili-sub-vue-header" }, zt = { class: "bili-sub-channel-info" }, It = { class: "bili-sub-vue-title-row" }, Bt = { class: "bili-sub-title" }, Rt = { class: "bili-sub-desc" }, Lt = { class: "bili-sub-actions" }, Et = { class: "bili-sub-mode-icon" }, At = { class: "bili-sub-mode-text" }, Vt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, Ut = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, Ft = { class: "bili-sub-dropdown-panel" }, Nt = { class: "bili-sub-dropdown-list" }, qt = ["onClick"], Gt = { class: "bili-sub-item-text" }, Ot = {
  key: 0,
  class: "bili-sub-item-check"
}, Ht = { class: "bili-sub-dropdown-foot" }, jt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, Wt = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, Yt = { class: "bili-sub-dropdown-panel bili-sub-video-dropdown-panel" }, Kt = { class: "bili-sub-dropdown-title" }, Xt = { class: "bili-sub-dropdown-list" }, Qt = ["title", "onClick"], Jt = { class: "bili-sub-video-num" }, Zt = { class: "bili-sub-item-text" }, ei = {
  key: 0,
  class: "bili-sub-video-duration"
}, ti = { class: "bili-sub-dropdown-foot" }, ii = ["disabled"], oi = /* @__PURE__ */ Ie({
  __name: "BiliSubscriptionHeader",
  props: {
    showBack: { type: Boolean }
  },
  setup(Me) {
    function m(z, h) {
      Ve.dispatch(z, h);
    }
    return (z, h) => (o(), s("header", Pt, [
      e("div", zt, [
        h[6] || (h[6] = e("img", {
          class: "bili-sub-avatar",
          src: "assets/bilibili.svg",
          alt: ""
        }, null, -1)),
        e("div", null, [
          e("div", It, [
            e("h3", Bt, l(n(D).organizer.subscriptionTitle), 1)
          ]),
          e("p", Rt, l(n(D).organizer.subscriptionSubtitle), 1)
        ])
      ]),
      e("div", Lt, [
        e("button", {
          type: "button",
          class: L(["bili-sub-head-btn bili-sub-script-mode-btn", { "is-newspaper": n(D).organizer.subscriptionScriptMode === "newspaper" }]),
          onClick: h[0] || (h[0] = (E) => m("subscription-script-mode"))
        }, [
          e("span", Et, l(n(D).organizer.subscriptionScriptMode === "newspaper" ? "📰" : "📜"), 1),
          e("span", At, l(n(D).organizer.subscriptionScriptMode === "newspaper" ? "报纸模式" : "滚动台词"), 1)
        ], 2),
        e("details", Vt, [
          e("summary", Ut, [
            e("span", null, [
              h[7] || (h[7] = de("关注 UP 主：", -1)),
              e("b", null, l(n(D).organizer.subscriptionTitle), 1)
            ]),
            h[8] || (h[8] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", Ft, [
            h[10] || (h[10] = e("div", { class: "bili-sub-dropdown-title" }, "已关注的 UP 主", -1)),
            e("div", Nt, [
              (o(!0), s(V, null, j(n(D).organizer.subscriptionChannels, (E) => (o(), s("button", {
                key: E.id,
                type: "button",
                class: L(["bili-sub-dropdown-item", { active: E.active }]),
                onClick: (N) => m("subscription-channel", E.id)
              }, [
                h[9] || (h[9] = e("span", { class: "bili-sub-dot" }, null, -1)),
                e("span", Gt, l(E.name), 1),
                E.active ? (o(), s("span", Ot, "✓")) : y("", !0)
              ], 10, qt))), 128))
            ]),
            e("div", Ht, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                onClick: h[1] || (h[1] = (E) => m("subscription-add-channel"))
              }, "＋ UP 主")
            ])
          ])
        ]),
        e("details", jt, [
          e("summary", Wt, [
            e("span", null, [
              h[11] || (h[11] = de("视频 ", -1)),
              e("b", null, "(" + l(n(D).organizer.subscriptionVideos.length) + ")", 1)
            ]),
            h[12] || (h[12] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", Yt, [
            e("div", Kt, "最近投稿视频 (" + l(n(D).organizer.subscriptionVideos.length) + ")", 1),
            e("div", Xt, [
              (o(!0), s(V, null, j(n(D).organizer.subscriptionVideos, (E, N) => (o(), s("button", {
                key: E.bvid,
                type: "button",
                class: L(["bili-sub-dropdown-item bili-sub-video-item", { active: E.active }]),
                title: E.title,
                onClick: (M) => m("subscription-video", E.bvid)
              }, [
                e("span", Jt, l(N + 1) + ".", 1),
                e("span", Zt, l(E.title), 1),
                E.duration ? (o(), s("small", ei, l(E.duration), 1)) : y("", !0)
              ], 10, Qt))), 128))
            ]),
            e("div", ti, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                disabled: n(D).organizer.subscriptionLoading,
                onClick: h[2] || (h[2] = (E) => m("subscription-load-more"))
              }, "继续获取", 8, ii)
            ])
          ])
        ]),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: h[3] || (h[3] = (E) => m(n(D).organizer.showFullDescInRightPanel ? "subscription-copy-description" : "subscription-copy-script"))
        }, l(n(D).organizer.showFullDescInRightPanel ? "复制简介" : "复制稿子"), 1),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: h[4] || (h[4] = (E) => m("subscription-refresh"))
        }, "↻ 刷新"),
        Me.showBack ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "bili-sub-head-btn",
          onClick: h[5] || (h[5] = (E) => m("organizer-open"))
        }, "← 返回收藏夹")) : y("", !0)
      ])
    ]));
  }
}), si = /* @__PURE__ */ Ue(oi, [["__scopeId", "data-v-0dfef976"]]), ni = { class: "bili-sub-transcript-column bili-sub-vue-transcript-column" }, li = { class: "bili-sub-article-wrap" }, ai = { class: "bili-sub-transcript-body" }, ri = {
  key: 0,
  class: "bili-sub-description-copy",
  title: "当前为放大简介视图"
}, di = {
  key: 0,
  class: "muted"
}, ui = {
  key: 0,
  class: "bili-sub-newspaper-list"
}, ci = ["data-idx", "data-from", "data-to", "title", "onClick"], pi = { class: "bili-sub-newspaper-header" }, bi = { class: "bili-sub-newspaper-num" }, vi = { class: "bili-sub-newspaper-heading" }, fi = { class: "bili-sub-newspaper-title" }, gi = { class: "bili-sub-newspaper-time" }, mi = ["onClick"], hi = { class: "bili-sub-newspaper-content" }, yi = ["data-from", "data-to", "title", "onClick"], _i = {
  key: 1,
  class: "bili-sub-srt-list"
}, ki = ["data-idx", "data-from", "data-to", "title", "onClick"], $i = { class: "bili-sub-srt-time" }, wi = { class: "bili-sub-srt-text" }, Ci = {
  key: 2,
  class: "bili-sub-no-transcript-box"
}, xi = {
  key: 2,
  class: "bili-sub-vue-empty-hint"
}, Si = /* @__PURE__ */ Ie({
  __name: "BiliSubscriptionTranscript",
  setup(Me) {
    const m = oe(() => D.organizer), z = oe(() => m.value.subscriptionChapters.length > 0 || m.value.subscriptionCues.length > 0);
    function h(E, N) {
      Ve.dispatch(E, N);
    }
    return (E, N) => (o(), s("section", ni, [
      e("article", li, [
        e("div", ai, [
          m.value.showFullDescInRightPanel ? (o(), s("section", ri, [
            e("header", null, [
              N[1] || (N[1] = e("h5", null, "视频简介", -1)),
              e("button", {
                type: "button",
                class: "bili-copy-desc-btn",
                title: "切回台词展示",
                onClick: N[0] || (N[0] = (M) => h("subscription-toggle-desc-panel"))
              }, "缩小简介")
            ]),
            (o(!0), s(V, null, j(m.value.subscriptionDescription, (M, r) => (o(), s("p", { key: r }, [
              ye(Ke, { text: M }, null, 8, ["text"])
            ]))), 128)),
            m.value.subscriptionDescription.length ? y("", !0) : (o(), s("p", di, "该视频暂无可用的文字简介。"))
          ])) : (o(), s(V, { key: 1 }, [
            m.value.subscriptionScriptMode === "newspaper" && m.value.subscriptionChapters.length ? (o(), s("div", ui, [
              (o(!0), s(V, null, j(m.value.subscriptionChapters, (M, r) => (o(), s("article", {
                key: `${M.from}:${r}`,
                class: "bili-sub-newspaper-section",
                "data-idx": r,
                "data-from": M.from,
                "data-to": M.to,
                title: `点击跳转至 ${M.fromText} 播放`,
                onClick: (k) => h("subscription-seek", { from: M.from, index: r, mode: "newspaper" })
              }, [
                e("header", pi, [
                  e("span", bi, l(String(r + 1).padStart(2, "0")), 1),
                  e("div", vi, [
                    e("h4", fi, l(M.title), 1),
                    e("span", gi, "⏱ " + l(M.fromText) + " - " + l(M.toText), 1)
                  ]),
                  e("button", {
                    type: "button",
                    class: "bili-sub-newspaper-play-btn",
                    "aria-label": "从头播放此分段",
                    onClick: C((k) => h("subscription-seek", { from: M.from, index: r, mode: "newspaper" }), ["stop"])
                  }, "▶", 8, mi)
                ]),
                e("div", hi, [
                  M.paragraphCues && M.paragraphCues.length ? (o(!0), s(V, { key: 0 }, j(M.paragraphCues, (k, _) => (o(), s("p", {
                    key: _,
                    class: "bili-sub-newspaper-p"
                  }, [
                    (o(!0), s(V, null, j(k, (q, T) => (o(), s("span", {
                      key: `${q.from}:${T}`,
                      class: "bili-sub-newspaper-cue",
                      "data-from": q.from,
                      "data-to": q.to,
                      title: `点击跳转播放此句 (⏱ ${q.timeText || q.from + "s"})`,
                      onClick: C((P) => h("subscription-seek", { from: q.from, mode: "newspaper" }), ["stop"])
                    }, l(q.content), 9, yi))), 128))
                  ]))), 128)) : (o(!0), s(V, { key: 1 }, j(M.paragraphs, (k, _) => (o(), s("p", {
                    key: _,
                    class: "bili-sub-newspaper-p"
                  }, l(k), 1))), 128))
                ])
              ], 8, ci))), 128))
            ])) : m.value.subscriptionCues.length ? (o(), s("div", _i, [
              (o(!0), s(V, null, j(m.value.subscriptionCues, (M) => (o(), s("button", {
                key: `${M.from}:${M.index}`,
                type: "button",
                class: "bili-sub-srt-row",
                "data-idx": M.index,
                "data-from": M.from,
                "data-to": M.to,
                title: `点击跳转至 ${M.timeText}`,
                onClick: (r) => h("subscription-seek", { from: M.from, index: M.index, mode: "lyrics" })
              }, [
                e("span", $i, l(M.timeText), 1),
                e("span", wi, l(M.content), 1)
              ], 8, ki))), 128))
            ])) : (o(), s("div", Ci, [...N[2] || (N[2] = [
              e("div", { class: "bili-sub-no-transcript-icon" }, "🎙️", -1),
              e("h5", null, "暂无实时台词字幕", -1),
              e("p", { class: "muted" }, "当前视频暂无可用字幕稿。如需阅读完整文案，请点击左侧视频标题旁的“放大简介”。", -1)
            ])]))
          ], 64)),
          !m.value.showFullDescInRightPanel && !z.value && !m.value.subscriptionDescription.length ? (o(), s("p", xi, "字幕不可用时仍可在左侧播放和查看评论。")) : y("", !0)
        ])
      ])
    ]));
  }
}), Ti = /* @__PURE__ */ Ue(Si, [["__scopeId", "data-v-2f4df941"]]), Mi = { class: "bili-sub-player-column" }, Di = {
  key: 0,
  class: "bili-sub-sticky-player"
}, Pi = { class: "bili-sub-player-card" }, zi = { class: "bili-sub-video-box" }, Ii = ["poster", "hidden"], Bi = ["src"], Ri = {
  key: 1,
  class: "bili-sub-video-loading"
}, Li = { class: "bili-sub-video-meta" }, Ei = { class: "bili-sub-video-meta-actions" }, Ai = ["title"], Vi = { class: "bili-sub-meta-stats" }, Ui = { class: "bili-sub-meta-desc" }, Fi = {
  class: "bili-sub-comments-section",
  id: "bili-sub-comments-section"
}, Ni = { class: "bili-mini-comments-head" }, qi = { class: "bili-mini-comments-meta" }, Gi = { class: "bili-mini-comments-count bili-sub-comments-count" }, Oi = { class: "bili-mini-comments-sort" }, Hi = { class: "bili-sub-comment-composer" }, ji = ["onKeydown"], Wi = ["disabled"], Yi = {
  key: 0,
  class: "bili-sub-emote-picker"
}, Ki = {
  key: 0,
  class: "fo-bili-loading"
}, Xi = { key: 1 }, Qi = ["title", "onClick"], Ji = ["src", "alt"], Zi = { key: 1 }, eo = { class: "bili-mini-comments-body bili-sub-comments-body" }, to = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, io = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, oo = ["src"], so = { class: "bili-comment-main" }, no = { class: "bili-comment-user-row" }, lo = { class: "bili-comment-uname" }, ao = {
  key: 0,
  class: "bili-comment-level"
}, ro = { class: "bili-comment-time" }, uo = { class: "bili-comment-text" }, co = {
  key: 0,
  class: "bili-comment-pictures"
}, po = ["href", "onClick"], bo = ["src"], vo = { class: "bili-comment-actions" }, fo = { key: 0 }, go = { key: 1 }, mo = {
  key: 1,
  class: "bili-comment-sub-list"
}, ho = { class: "bili-comment-sub-uname" }, yo = { class: "bili-comment-sub-more" }, _o = ["disabled", "onClick"], ko = ["disabled", "onClick"], $o = ["onClick"], wo = { class: "bili-sub-comments-infinite-trigger" }, Co = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0" }
}, xo = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0", opacity: "0.6" }
}, So = {
  key: 1,
  class: "fo-bili-empty"
}, To = /* @__PURE__ */ Ie({
  __name: "BiliSubscriptionPlayer",
  setup(Me) {
    const m = oe(() => D.organizer.subscriptionCurrent), z = S(null), h = S(!1), E = S(!1), N = S(""), M = S(""), r = S(1), k = S(1), _ = S([]), q = S("0 条"), T = S(!1), P = S(!1), G = S(""), ae = S(!1), W = S(""), X = S(null), se = S(!1), pe = S(""), ke = S(!1), ue = S(!1), b = S(!1), le = S([]);
    let Z = null, te = null;
    function J(w, g = !1) {
      pe.value = w, ke.value = g, Z && clearTimeout(Z), Z = setTimeout(() => {
        pe.value = "";
      }, 3500);
    }
    function be() {
      Ve.dispatch("subscription-open-player");
    }
    function I() {
      Ve.dispatch("subscription-toggle-desc-panel");
    }
    function v(w) {
      const g = w.currentTarget;
      g && g.scrollHeight - g.scrollTop - g.clientHeight < 180 && !P.value && ae.value && Q();
    }
    function O(w, g) {
      const u = w[g];
      u && window.open(u, "_blank", "noopener,noreferrer");
    }
    function K(w, g) {
      if (!w) return [];
      if (!g || g.size === 0)
        return [{ type: "text", text: w }];
      const u = /\[([^\]]+)\]/g, x = [];
      let F = 0, U;
      for (; (U = u.exec(w)) !== null; ) {
        U.index > F && x.push({ type: "text", text: w.slice(F, U.index) });
        const Y = U[0], ie = g.get(Y);
        ie ? x.push({ type: "emote", text: Y, url: ie }) : x.push({ type: "text", text: Y }), F = u.lastIndex;
      }
      return F < w.length && x.push({ type: "text", text: w.slice(F) }), x;
    }
    function $e(w) {
      if (!w) return "";
      const g = new Date(w * 1e3), u = /* @__PURE__ */ new Date(), x = Math.floor((u.getTime() - g.getTime()) / 1e3);
      if (x < 60) return "刚刚";
      if (x < 3600) return `${Math.floor(x / 60)} 分钟前`;
      if (x < 86400) return `${Math.floor(x / 3600)} 小时前`;
      const F = g.getFullYear(), U = String(g.getMonth() + 1).padStart(2, "0"), Y = String(g.getDate()).padStart(2, "0");
      return F === u.getFullYear() ? `${U}-${Y}` : `${F}-${U}-${Y}`;
    }
    function we(w) {
      return w ? w >= 1e4 ? (w / 1e4).toFixed(1).replace(/\.0$/, "") + "万" : String(w) : "0";
    }
    async function $(w = !1) {
      if (M.value) {
        w ? P.value = !0 : (T.value = !0, G.value = "");
        try {
          const g = `https://api.bilibili.com/x/v2/reply?type=1&oid=${M.value}&pn=${k.value}&ps=20&sort=${r.value}`, x = await (await fetch(g, { credentials: "include" })).json();
          if (x?.code !== 0 || !x?.data) {
            w || (G.value = x?.message || "评论加载失败或该视频已关闭评论", _.value = []), ae.value = !1;
            return;
          }
          const F = x.data, U = F.page?.count || 0;
          q.value = `${we(U)} 条`;
          const ie = (Array.isArray(F.replies) ? F.replies : []).map((ee) => {
            const Ge = /* @__PURE__ */ new Map();
            ee.content?.emote && Object.entries(ee.content.emote).forEach(([ge, Oe]) => {
              Oe?.url && Ge.set(ge, String(Oe.url).replace(/^http:/, "https:"));
            });
            const Ne = String(ee.content?.message || ""), je = Array.isArray(ee.content?.pictures) ? ee.content.pictures.map((ge) => String(ge?.img_src || ge).replace(/^http:/, "https:")).filter(Boolean) : [], qe = Array.isArray(ee.replies) ? ee.replies.map((ge) => ({
              id: ge.rpid || Math.random(),
              userName: ge.member?.uname || "B站用户",
              message: String(ge.content?.message || "")
            })) : [];
            return {
              id: ee.rpid || Math.random(),
              userName: ee.member?.uname || "B站用户",
              avatar: String(ee.member?.avatar || "").replace(/^http:/, "https:"),
              level: Number(ee.member?.level_info?.current_level || 0),
              message: Ne,
              tokens: K(Ne, Ge),
              timeStr: $e(ee.ctime),
              likeCount: Number(ee.like || 0),
              replyCount: Number(ee.rcount || 0),
              pictures: je,
              replies: qe
            };
          });
          w ? _.value = [..._.value, ...ie] : _.value = ie, ae.value = _.value.length < U;
        } catch (g) {
          w || (G.value = g?.message || "网络异常，未能加载评论");
        } finally {
          T.value = !1, P.value = !1;
        }
      }
    }
    async function d(w) {
      const g = _.value.find((u) => String(u.id) === String(w));
      if (!(!g || g.subRepliesLoading || !M.value)) {
        g.subRepliesPage ? g.subRepliesPage++ : g.subRepliesPage = 1, g.subRepliesLoading = !0, g.subRepliesExpanded = !0;
        try {
          const u = await dt.getSubReplies(M.value, w, g.subRepliesPage, 10), x = (u.replies || []).map((Y) => ({
            id: String(Y.rpid),
            userName: Y.uname,
            message: Y.message
          })), F = new Set((g.replies || []).map((Y) => String(Y.id))), U = x.filter((Y) => !F.has(String(Y.id)));
          g.replies = [...g.replies || [], ...U], g.subRepliesHasMore = u.hasMore;
        } catch {
          J("子回复加载失败", !0);
        } finally {
          g.subRepliesLoading = !1;
        }
      }
    }
    function p(w) {
      const g = _.value.find((u) => String(u.id) === String(w));
      g && (g.subRepliesExpanded = !1);
    }
    function R(w) {
      r.value !== w && (r.value = w, k.value = 1, $(!1));
    }
    function Q() {
      P.value || !ae.value || (k.value += 1, $(!0));
    }
    async function ve() {
      if (ue.value = !ue.value, ue.value && !le.value.length && !b.value) {
        b.value = !0;
        try {
          const g = await (await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", { credentials: "include" })).json();
          g?.code === 0 && Array.isArray(g?.data?.packages) && (le.value = g.data.packages.filter((u) => Array.isArray(u.emote) && u.emote.length).map((u) => ({
            text: u.text || "B站表情",
            emote: u.emote.map((x) => ({
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
    function Ce(w) {
      const g = X.value;
      if (!g)
        W.value += w;
      else {
        const u = g.selectionStart ?? g.value.length, x = g.selectionEnd ?? u;
        W.value = W.value.slice(0, u) + w + W.value.slice(x), st(() => {
          g.focus();
          const F = u + w.length;
          g.setSelectionRange(F, F);
        });
      }
      ue.value = !1;
    }
    async function xe() {
      const w = W.value.trim();
      if (!w) {
        J("请输入评论内容", !0);
        return;
      }
      if (!M.value) {
        J("未能识别视频 ID，无法发表评论", !0);
        return;
      }
      const g = window.getBiliJct;
      let u = "";
      if (typeof g == "function")
        u = await g();
      else
        try {
          u = (await window.chrome?.cookies?.get?.({ url: "https://api.bilibili.com", name: "bili_jct" }))?.value || "";
        } catch {
          u = "";
        }
      if (!u) {
        J("未检测到 B站 登录态，请先登录 bilibili.com", !0);
        return;
      }
      se.value = !0;
      try {
        const x = new URLSearchParams({
          oid: String(M.value),
          type: "1",
          message: w,
          plat: "1",
          csrf: u,
          csrf_token: u
        }), U = await (await fetch("https://api.bilibili.com/x/v2/reply/add", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: x.toString()
        })).json();
        U?.code === 0 ? (W.value = "", J("✓ 评论发表成功！", !1), k.value = 1, $(!1)) : J(`❌ 发送失败：${U?.message || U?.code}`, !0);
      } catch (x) {
        J(`❌ 发送出错：${x?.message || "网络异常"}`, !0);
      } finally {
        se.value = !1;
      }
    }
    async function Be(w) {
      if (!w?.bvid) return;
      if (typeof document < "u" && (document.querySelectorAll("video, audio").forEach((u) => {
        if (u !== z.value && !u.paused)
          try {
            u.pause();
          } catch {
          }
      }), document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((u) => {
        try {
          u.pause();
        } catch {
        }
      })), z.value && !z.value.paused)
        try {
          z.value.pause();
        } catch {
        }
      h.value = !0, E.value = !1, N.value = "";
      let g = w.aid;
      if (!g)
        try {
          const x = await (await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${w.bvid}`, { credentials: "include" })).json();
          x?.data?.aid && (g = x.data.aid);
        } catch {
        }
      M.value = g || "", k.value = 1, $(!1);
      try {
        const u = await dt.resolvePlayStream(w);
        if (u?.sources?.length) {
          z.value && (typeof document < "u" && document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((x) => {
            try {
              x.pause();
            } catch {
            }
          }), z.value.src = u.sources[0], z.value.play().catch(() => {
          }), St({ bvid: w.bvid, title: w.title, cover: w.cover }, z.value)), h.value = !1;
          return;
        }
      } catch (u) {
        console.warn("[BiliSubscriptionPlayer] 本地视频流解析失败，使用 iframe 备用:", u);
      }
      E.value = !0, N.value = `https://player.bilibili.com/player.html?bvid=${w.bvid}&autoplay=1&danmaku=0`, h.value = !1;
    }
    let Re = null, Fe = null;
    function fe(w) {
      const g = w.closest(".bili-sub-transcript-body") || w.closest(".bili-sub-article-wrap") || w.parentElement;
      if (!g) return;
      const u = g.getBoundingClientRect(), U = w.getBoundingClientRect().top - u.top + g.scrollTop - u.height * 0.36;
      g.scrollTo({
        top: Math.max(0, U),
        behavior: "smooth"
      });
    }
    function De() {
      if (!z.value) return;
      const w = z.value.currentTime;
      if (document.querySelectorAll(".bili-sub-newspaper-section").forEach((x) => {
        const F = Number(x.getAttribute("data-from") || 0), U = Number(x.getAttribute("data-to") || 0), Y = w >= F && (U <= 0 || w < U);
        x.classList.toggle("active", Y);
      }), D.organizer.subscriptionScriptMode === "newspaper") {
        const x = document.querySelectorAll(".bili-sub-newspaper-cue");
        if (x.length > 0) {
          let F = null;
          if (x.forEach((U) => {
            const Y = Number(U.getAttribute("data-from") || 0), ie = Number(U.getAttribute("data-to") || 0);
            w >= Y && (ie <= 0 || w < ie) ? (F || (F = U), U.classList.add("cue-reading-active")) : U.classList.remove("cue-reading-active");
          }), !F && w > 0)
            for (let U = x.length - 1; U >= 0; U--) {
              const Y = x[U], ie = Number(Y.getAttribute("data-from") || 0);
              if (w >= ie) {
                F = Y, Y.classList.add("cue-reading-active");
                break;
              }
            }
          F && F !== Re && (Re = F, fe(F));
        }
      } else {
        const x = document.querySelectorAll(".bili-sub-srt-row");
        let F = !1, U = null;
        for (let Y = x.length - 1; Y >= 0; Y--) {
          const ie = x[Y], ee = Number(ie.getAttribute("data-from") || 0);
          !F && w >= ee ? (ie.classList.add("active"), F = !0, U = ie) : ie.classList.remove("active");
        }
        U && U !== Fe && (Fe = U, fe(U));
      }
    }
    function Le() {
      De();
    }
    function He() {
      De();
    }
    return _e(
      () => m.value?.bvid,
      () => {
        m.value && Be(m.value);
      },
      { immediate: !0 }
    ), Xe(() => {
      te = Ve.onAction((w, g) => {
        if (w === "subscription-seek") {
          const u = Number(g?.from);
          z.value && Number.isFinite(u) && (z.value.currentTime = Math.max(0, u - 0.1), z.value.play().catch(() => {
          }));
        }
      });
    }), bt(() => {
      if (z.value) {
        xt(z.value);
        try {
          z.value.pause(), z.value.src = "", z.value.load();
        } catch {
        }
      }
      te && te(), Z && clearTimeout(Z);
    }), (w, g) => (o(), s("aside", Mi, [
      m.value ? (o(), s("div", Di, [
        e("div", Pi, [
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
          e("div", zi, [
            e("video", {
              ref_key: "videoRef",
              ref: z,
              class: "bili-sub-native-video",
              controls: "",
              playsinline: "",
              poster: m.value.cover,
              hidden: E.value,
              onTimeupdate: De,
              onSeeked: Le,
              onPlay: He
            }, null, 40, Ii),
            E.value ? (o(), s("iframe", {
              key: 0,
              class: "bili-sub-native-iframe",
              allowfullscreen: "true",
              allow: "autoplay; fullscreen",
              src: N.value
            }, null, 8, Bi)) : y("", !0),
            h.value ? (o(), s("div", Ri, [...g[4] || (g[4] = [
              e("i", null, null, -1),
              e("span", null, "正在解析登录高清视频流…", -1)
            ])])) : y("", !0)
          ]),
          e("div", {
            class: "bili-sub-scroll-stage",
            onScrollPassive: v
          }, [
            e("div", Li, [
              e("div", Ei, [
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: n(D).organizer.showFullDescInRightPanel ? "切回台词展示" : "在右侧大屏展开完整视频简介",
                  onClick: I
                }, l(n(D).organizer.showFullDescInRightPanel ? "缩小简介" : "放大简介"), 9, Ai)
              ]),
              e("h4", null, l(m.value.title), 1),
              e("div", Vi, [
                e("span", null, "▣ 播放: " + l(m.value.playCount), 1),
                e("span", null, "💬 弹幕: " + l(m.value.danmakuCount), 1),
                e("span", null, "⏱ " + l(m.value.duration), 1)
              ]),
              e("p", Ui, [
                ye(Ke, {
                  text: m.value.description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ]),
            e("div", Fi, [
              e("div", Ni, [
                e("div", qi, [
                  g[5] || (g[5] = e("span", null, "💬 评论", -1)),
                  e("span", Gi, l(q.value), 1)
                ]),
                e("div", Oi, [
                  e("button", {
                    type: "button",
                    class: L(["bili-mini-sort-btn", { active: r.value === 1 }]),
                    onClick: g[0] || (g[0] = (u) => R(1))
                  }, "按热度", 2),
                  e("button", {
                    type: "button",
                    class: L(["bili-mini-sort-btn", { active: r.value === 0 }]),
                    onClick: g[1] || (g[1] = (u) => R(0))
                  }, "按时间", 2)
                ])
              ]),
              e("div", Hi, [
                e("button", {
                  type: "button",
                  class: L(["bili-sub-emote-button", { on: ue.value }]),
                  title: "选择 B站 表情",
                  onClick: ve
                }, "☺", 2),
                ne(e("input", {
                  ref_key: "commentInputRef",
                  ref: X,
                  "onUpdate:modelValue": g[2] || (g[2] = (u) => W.value = u),
                  type: "text",
                  class: "bili-sub-comment-input",
                  placeholder: "发一条友善的评论吧…（Enter 发送）",
                  maxlength: "500",
                  onKeydown: ze(C(xe, ["prevent"]), ["enter"])
                }, null, 40, ji), [
                  [Se, W.value]
                ]),
                e("button", {
                  type: "button",
                  class: "bili-sub-comment-send-btn",
                  disabled: se.value || !W.value.trim(),
                  onClick: xe
                }, l(se.value ? "发送中…" : "发送"), 9, Wi)
              ]),
              ue.value ? (o(), s("div", Yi, [
                b.value ? (o(), s("div", Ki, [...g[6] || (g[6] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取 B站 表情包…", -1)
                ])])) : (o(), s("div", Xi, [
                  (o(!0), s(V, null, j(le.value, (u) => (o(), s("section", {
                    key: u.text,
                    class: "bili-sub-emote-group"
                  }, [
                    e("h5", null, l(u.text || "B站表情"), 1),
                    e("div", null, [
                      (o(!0), s(V, null, j(u.emote, (x) => (o(), s("button", {
                        key: x.text,
                        type: "button",
                        class: "bili-sub-emote-item",
                        title: x.text,
                        onClick: (F) => Ce(x.text)
                      }, [
                        x.url ? (o(), s("img", {
                          key: 0,
                          src: x.url,
                          alt: x.text,
                          referrerpolicy: "no-referrer"
                        }, null, 8, Ji)) : (o(), s("span", Zi, l(x.text), 1))
                      ], 8, Qi))), 128))
                    ])
                  ]))), 128))
                ]))
              ])) : y("", !0),
              pe.value ? (o(), s("div", {
                key: 1,
                class: L(["bili-sub-comment-tip", { error: ke.value }])
              }, l(pe.value), 3)) : y("", !0),
              e("div", eo, [
                T.value && !_.value.length ? (o(), s("p", to, "正在加载评论…")) : G.value && !_.value.length ? (o(), s("p", io, l(G.value), 1)) : y("", !0),
                (o(!0), s(V, null, j(_.value, (u) => (o(), s("div", {
                  key: u.id,
                  class: "bili-comment-item"
                }, [
                  e("img", {
                    class: "bili-comment-avatar",
                    src: u.avatar,
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer"
                  }, null, 8, oo),
                  e("div", so, [
                    e("div", no, [
                      e("span", lo, l(u.userName), 1),
                      u.level ? (o(), s("span", ao, "LV" + l(u.level), 1)) : y("", !0),
                      e("span", ro, l(u.timeStr), 1)
                    ]),
                    e("div", uo, [
                      ye(Ke, {
                        text: u.message
                      }, null, 8, ["text"])
                    ]),
                    u.pictures?.length ? (o(), s("div", co, [
                      (o(!0), s(V, null, j(u.pictures, (x, F) => (o(), s("a", {
                        key: F,
                        class: "bili-comment-pic-link",
                        href: x,
                        onClick: C((U) => O(u.pictures, F), ["stop", "prevent"])
                      }, [
                        e("img", {
                          class: "bili-comment-pic",
                          src: x,
                          alt: "评论图片",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, bo)
                      ], 8, po))), 128))
                    ])) : y("", !0),
                    e("div", vo, [
                      u.likeCount ? (o(), s("span", fo, "👍 " + l(u.likeCount), 1)) : y("", !0),
                      u.replyCount ? (o(), s("span", go, "💬 " + l(u.replyCount), 1)) : y("", !0)
                    ]),
                    u.replies?.length ? (o(), s("div", mo, [
                      (o(!0), s(V, null, j(u.replies, (x) => (o(), s("div", {
                        key: x.id,
                        class: "bili-comment-sub-item"
                      }, [
                        e("span", ho, l(x.userName) + ":", 1),
                        ye(Ke, {
                          text: x.message
                        }, null, 8, ["text"])
                      ]))), 128)),
                      e("div", yo, [
                        !u.subRepliesExpanded && (u.replyCount || 0) > u.replies.length ? (o(), s(V, { key: 0 }, [
                          e("span", null, "共 " + l(u.replyCount) + " 条回复，", 1),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: u.subRepliesLoading,
                            onClick: C((x) => d(u.id), ["stop"])
                          }, l(u.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, _o)
                        ], 64)) : u.subRepliesExpanded ? (o(), s(V, { key: 1 }, [
                          u.subRepliesHasMore ? (o(), s("button", {
                            key: 0,
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: u.subRepliesLoading,
                            onClick: C((x) => d(u.id), ["stop"])
                          }, l(u.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, ko)) : y("", !0),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-collapse-btn",
                            onClick: C((x) => p(u.id), ["stop"])
                          }, " 收起 ▴ ", 8, $o)
                        ], 64)) : y("", !0)
                      ])
                    ])) : y("", !0)
                  ])
                ]))), 128))
              ]),
              e("div", wo, [
                P.value ? (o(), s("p", Co, "正在加载更多评论…")) : !ae.value && _.value.length ? (o(), s("p", xo, "已显示全部评论")) : y("", !0)
              ])
            ])
          ], 32)
        ])
      ])) : (o(), s("p", So, "暂无可播放的订阅视频。"))
    ]));
  }
}), Mo = /* @__PURE__ */ Ue(To, [["__scopeId", "data-v-d420748e"]]), Do = ["disabled"], Po = ["disabled"], zo = { key: 0 }, Io = ["disabled"], Bo = ["disabled"], Ro = ["disabled"], Lo = ["disabled"], Eo = { class: "bili-sub-add-shell" }, Ao = ["disabled"], Vo = { class: "bili-sub-add-toolbar" }, Uo = { class: "bili-sub-add-groups" }, Fo = ["onClick"], No = { class: "bili-sub-add-list" }, qo = {
  key: 0,
  class: "fo-bili-loading"
}, Go = {
  key: 1,
  class: "fo-bili-empty"
}, Oo = {
  key: 2,
  class: "fo-bili-empty"
}, Ho = ["disabled", "onClick"], jo = ["src"], Wo = {
  key: 1,
  class: "bili-sub-add-avatar"
}, Yo = {
  class: "fo-custom-confirm-modal",
  role: "dialog",
  "aria-modal": "true"
}, Ko = { class: "fo-custom-confirm-head" }, Xo = { class: "fo-custom-confirm-body" }, Qo = { class: "fo-custom-confirm-actions" }, Jo = ["disabled"], Zo = ["disabled"], es = /* @__PURE__ */ Ie({
  __name: "BiliOrganizerDialogs",
  setup(Me) {
    const m = oe(() => ot.create), z = oe(() => ot.confirm), h = oe(() => ot.channelPicker), E = oe(() => m.value.kind === "bili"), N = oe(() => {
      const r = h.value, k = r.query.trim().toLowerCase(), _ = r.groups.find((T) => T.id === r.activeGroupId), q = _ ? new Set(_.mids) : null;
      return r.items.filter((T) => (!q || q.has(T.mid)) && (!k || T.name.toLowerCase().includes(k) || T.mid.includes(k)));
    });
    function M() {
      const r = m.value.name.trim();
      if (!r) {
        re.updateCreate({ status: "请输入名称", error: !0 });
        return;
      }
      re.submitCreate({ name: r, privacy: m.value.privacy });
    }
    return (r, k) => (o(), s(V, null, [
      m.value.open ? (o(), s("dialog", {
        key: 0,
        class: "fo-create-dialog",
        open: "",
        onClick: k[5] || (k[5] = C((_) => n(re).closeCreate(), ["self"])),
        onCancel: k[6] || (k[6] = C((_) => n(re).closeCreate(), ["prevent"]))
      }, [
        e("form", {
          onSubmit: C(M, ["prevent"])
        }, [
          e("header", null, [
            e("div", null, [
              k[14] || (k[14] = e("i", { class: "fo-folder-icon" }, null, -1)),
              e("span", null, [
                e("b", null, l(E.value ? "新建 B站收藏夹" : "新建插件分组"), 1),
                e("small", null, l(E.value ? "会同步创建到你的 B站账号" : "只整理左侧收藏夹，不修改 B站数据"), 1)
              ])
            ]),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: m.value.submitting,
              onClick: k[0] || (k[0] = (_) => n(re).closeCreate())
            }, "×", 8, Do)
          ]),
          e("label", null, [
            e("span", null, l(E.value ? "收藏夹名称" : "分组名称"), 1),
            ne(e("input", {
              "onUpdate:modelValue": k[1] || (k[1] = (_) => m.value.name = _),
              maxlength: "48",
              autocomplete: "off",
              placeholder: "输入名称",
              required: "",
              disabled: m.value.submitting,
              autofocus: ""
            }, null, 8, Po), [
              [Se, m.value.name]
            ])
          ]),
          E.value ? (o(), s("fieldset", zo, [
            k[17] || (k[17] = e("legend", null, "可见范围", -1)),
            e("label", null, [
              ne(e("input", {
                "onUpdate:modelValue": k[2] || (k[2] = (_) => m.value.privacy = _),
                type: "radio",
                value: 0,
                disabled: m.value.submitting
              }, null, 8, Io), [
                [
                  at,
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
              ne(e("input", {
                "onUpdate:modelValue": k[3] || (k[3] = (_) => m.value.privacy = _),
                type: "radio",
                value: 1,
                disabled: m.value.submitting
              }, null, 8, Bo), [
                [
                  at,
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
          ])) : y("", !0),
          e("p", {
            class: L(["fo-create-status", { error: m.value.error }]),
            role: "status"
          }, l(m.value.status), 3),
          e("footer", null, [
            e("button", {
              type: "button",
              disabled: m.value.submitting,
              onClick: k[4] || (k[4] = (_) => n(re).closeCreate())
            }, "取消", 8, Ro),
            e("button", {
              class: "primary",
              type: "submit",
              disabled: m.value.submitting
            }, l(m.value.submitting ? "创建中…" : E.value ? "创建收藏夹" : "创建分组"), 9, Lo)
          ])
        ], 32)
      ], 32)) : y("", !0),
      h.value.open ? (o(), s("dialog", {
        key: 1,
        class: "bili-sub-add-dialog",
        open: "",
        onCancel: k[10] || (k[10] = C((_) => n(re).closeChannelPicker(), ["prevent"]))
      }, [
        e("div", Eo, [
          e("header", null, [
            k[18] || (k[18] = e("div", null, [
              e("b", null, "从我的关注中添加 UP 主"),
              e("small", null, "沿用“正在关注”的本地分组，只能添加已关注的 UP 主")
            ], -1)),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: !!h.value.submittingMid,
              onClick: k[7] || (k[7] = (_) => n(re).closeChannelPicker())
            }, "×", 8, Ao)
          ]),
          e("div", Vo, [
            e("div", Uo, [
              e("button", {
                type: "button",
                class: L(["bili-sub-add-group", { on: h.value.activeGroupId === "__all__" }]),
                onClick: k[8] || (k[8] = (_) => n(re).updateChannelPicker({ activeGroupId: "__all__" }))
              }, "全部关注", 2),
              (o(!0), s(V, null, j(h.value.groups, (_) => (o(), s("button", {
                key: _.id,
                type: "button",
                class: L(["bili-sub-add-group", { on: h.value.activeGroupId === _.id }]),
                onClick: (q) => n(re).updateChannelPicker({ activeGroupId: _.id })
              }, l(_.name), 11, Fo))), 128))
            ]),
            ne(e("input", {
              "onUpdate:modelValue": k[9] || (k[9] = (_) => h.value.query = _),
              type: "search",
              placeholder: "搜索关注的 UP 主"
            }, null, 512), [
              [Se, h.value.query]
            ])
          ]),
          e("div", No, [
            h.value.loading ? (o(), s("div", qo, [...k[19] || (k[19] = [
              e("i", null, null, -1),
              e("span", null, "正在读取关注分组…", -1)
            ])])) : h.value.error ? (o(), s("p", Go, l(h.value.error), 1)) : N.value.length ? (o(!0), s(V, { key: 3 }, j(N.value, (_) => (o(), s("button", {
              key: _.mid,
              type: "button",
              class: "bili-sub-add-up",
              disabled: _.added || !!h.value.submittingMid,
              onClick: (q) => n(re).selectChannel(_.mid)
            }, [
              _.face ? (o(), s("img", {
                key: 0,
                src: _.face,
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, jo)) : (o(), s("span", Wo, "UP")),
              e("span", null, [
                e("b", null, l(_.name), 1),
                e("small", null, "UID " + l(_.mid), 1)
              ]),
              e("i", null, l(_.added ? "已添加" : h.value.submittingMid === _.mid ? "添加中…" : "＋ 添加"), 1)
            ], 8, Ho))), 128)) : (o(), s("p", Oo, "该分组中没有匹配的已关注 UP 主。"))
          ])
        ])
      ], 32)) : y("", !0),
      z.value.open ? (o(), s("div", {
        key: 2,
        class: "fo-custom-confirm-overlay",
        onClick: k[13] || (k[13] = C((_) => n(re).closeConfirm(), ["self"]))
      }, [
        e("div", Yo, [
          e("div", Ko, [
            e("h4", null, l(z.value.title), 1)
          ]),
          e("div", Xo, [
            e("p", null, l(z.value.message), 1)
          ]),
          e("div", Qo, [
            e("button", {
              type: "button",
              class: "fo-confirm-btn cancel",
              disabled: z.value.submitting,
              onClick: k[11] || (k[11] = (_) => n(re).closeConfirm())
            }, l(z.value.cancelText), 9, Jo),
            e("button", {
              type: "button",
              class: L(["fo-confirm-btn confirm", { danger: z.value.danger }]),
              disabled: z.value.submitting,
              onClick: k[12] || (k[12] = (_) => n(re).submitConfirm())
            }, l(z.value.submitting ? "处理中…" : z.value.confirmText), 11, Zo)
          ])
        ])
      ])) : y("", !0)
    ], 64));
  }
}), ts = { class: "fo-upg-shell" }, is = { class: "fo-upg-body" }, os = { class: "fo-upg-sidebar" }, ss = { class: "fo-upg-sidebar-head" }, ns = { class: "fo-upg-group-items" }, ls = ["onDragstart", "onDrop", "onClick"], as = ["onKeydown"], rs = {
  key: 0,
  class: "fo-upg-tree-branch"
}, ds = {
  key: 1,
  class: "fo-folder-icon"
}, us = { class: "fo-upg-group-name" }, cs = { class: "fo-upg-vue-group-actions" }, ps = ["onClick"], bs = ["onClick"], vs = ["onClick"], fs = ["placeholder"], gs = {
  key: 1,
  class: "muted small"
}, ms = { class: "fo-upg-main" }, hs = { class: "fo-upg-main-head" }, ys = { class: "fo-upg-main-title" }, _s = { key: 0 }, ks = { class: "fo-upg-head-actions" }, $s = { class: "fo-upg-filter-tabs" }, ws = { class: "fo-upg-batch-wrap" }, Cs = { class: "fo-upg-batch-count" }, xs = ["disabled"], Ss = ["disabled"], Ts = { class: "fo-upg-toolbar" }, Ms = { class: "fo-upg-search" }, Ds = ["disabled"], Ps = {
  key: 0,
  class: "fo-bili-loading"
}, zs = {
  key: 1,
  class: "fo-bili-empty"
}, Is = {
  key: 2,
  class: "fo-bili-empty"
}, Bs = {
  key: 3,
  class: "fo-bili-empty"
}, Rs = ["title", "onContextmenu", "onClick"], Ls = ["src"], Es = { class: "fo-upg-info" }, As = { class: "fo-upg-name" }, Vs = { class: "fo-upg-sign" }, Us = ["disabled", "onClick"], Fs = {
  key: 1,
  class: "fo-upg-move-wrap"
}, Ns = ["disabled"], qs = { class: "fo-upg-move-dropdown" }, Gs = ["disabled", "onClick"], Os = { key: 0 }, Hs = {
  key: 0,
  class: "muted small",
  style: { padding: "6px 10px" }
}, js = ["disabled", "onClick"], Ws = { class: "fo-upg-pagination" }, Ys = { class: "fo-upg-page-info" }, Ks = {
  key: 0,
  class: "fo-upg-page-btns"
}, Xs = ["disabled"], Qs = ["disabled"], Js = { class: "fo-upg-page-cur" }, Zs = ["disabled"], en = ["disabled"], tn = /* @__PURE__ */ Ie({
  __name: "BiliUpGroupManager",
  setup(Me) {
    const m = S(void 0), z = S(""), h = S(""), E = S(""), N = S(""), M = S(!1), r = S(/* @__PURE__ */ new Set()), k = S(null);
    function _($) {
      if ($.button !== 0 || $.target.closest("button,input")) return;
      const d = k.value;
      if (!d) return;
      const p = d.getBoundingClientRect(), R = p.left, Q = p.top, ve = $.clientX, Ce = $.clientY;
      d.style.position = "fixed", d.style.left = `${R}px`, d.style.top = `${Q}px`, d.style.right = "auto", d.style.bottom = "auto", d.style.margin = "0", d.style.transform = "none";
      const xe = (Re) => {
        const Fe = Re.clientX - ve, fe = Re.clientY - Ce, De = Math.max(8, Math.min(window.innerWidth - 120, R + Fe)), Le = Math.max(8, Math.min(window.innerHeight - 80, Q + fe));
        d.style.left = `${De}px`, d.style.top = `${Le}px`;
      }, Be = () => {
        window.removeEventListener("pointermove", xe), window.removeEventListener("pointerup", Be);
      };
      window.addEventListener("pointermove", xe), window.addEventListener("pointerup", Be);
    }
    const q = oe(() => f.groups.find(($) => $.id === f.activeGroupId) || null), T = oe(() => {
      const $ = f.query.trim().toLowerCase(), d = f.activeGroupId;
      return f.followings.filter((p) => {
        if ($ && !p.name.toLowerCase().includes($) && !p.sign.toLowerCase().includes($) && !p.mid.includes($)) return !1;
        const R = p.groupIds.includes(d);
        return f.filter === "ingroup" ? R : f.onlyUngrouped ? !p.groupIds || p.groupIds.length === 0 : !0;
      });
    }), P = oe(() => Math.max(1, Math.ceil(T.value.length / f.pageSize))), G = oe(() => {
      const d = (Math.min(f.page, P.value) - 1) * f.pageSize;
      return T.value.slice(d, d + f.pageSize);
    }), ae = oe(() => f.followings.filter(($) => $.groupIds.length === 0).length), W = S(null), X = /* @__PURE__ */ new Map();
    function se($) {
      const d = Math.max(1, Math.min(P.value, $));
      f.page = d, W.value && (W.value.scrollTop = 0);
    }
    _e(() => [f.query, f.filter, f.onlyUngrouped], () => {
      f.page = 1, W.value && (W.value.scrollTop = 0);
    }), _e(() => f.activeGroupId, ($, d) => {
      if (d && W.value) {
        const Q = `${d}_${f.filter}_${f.onlyUngrouped}`;
        X.set(Q, {
          page: f.page,
          scrollTop: W.value.scrollTop
        });
      }
      if (f.filter === "all")
        return;
      const p = `${$}_${f.filter}_${f.onlyUngrouped}`, R = X.get(p);
      R ? (f.page = Math.min(R.page, P.value), st(() => {
        W.value && (W.value.scrollTop = R.scrollTop);
      })) : (f.page = 1, st(() => {
        W.value && (W.value.scrollTop = 0);
      }));
    }), _e(P, ($) => {
      f.page > $ && (f.page = $);
    }), _e(M, ($) => {
      $ || r.value.clear();
    });
    function pe($) {
      m.value = $, z.value = "";
    }
    function ke() {
      m.value = void 0, z.value = "";
    }
    function ue() {
      const $ = z.value.trim();
      $ && (ce.dispatch("create-group", { name: $, parentId: m.value || "" }), ke());
    }
    function b($) {
      h.value = $.id, E.value = $.name;
    }
    function le() {
      const $ = E.value.trim();
      h.value && $ && ce.dispatch("rename-group", { id: h.value, name: $ }), h.value = "", E.value = "";
    }
    function Z($, d) {
      N.value = d, $.dataTransfer?.setData("application/x-logicweaver-up-group", d), $.dataTransfer && ($.dataTransfer.effectAllowed = "move");
    }
    function te($, d) {
      const p = $.dataTransfer?.getData("application/x-logicweaver-up-group") || N.value;
      if (N.value = "", !p || p === d) return;
      const R = $.currentTarget?.getBoundingClientRect(), Q = R ? $.clientY - R.top : 0, ve = R ? Q < R.height * 0.25 ? "before" : Q > R.height * 0.75 ? "after" : "into" : "into";
      ce.dispatch("move-group", { sourceId: p, targetId: d, mode: ve });
    }
    function J($) {
      const d = $.dataTransfer?.getData("application/x-logicweaver-up-group") || N.value;
      N.value = "", d && ce.dispatch("move-group", { sourceId: d, targetId: "", mode: "root" });
    }
    function be($, d) {
      !d || f.busyMid || ce.dispatch("toggle-member", { groupId: d, mid: $ });
    }
    function I($) {
      !f.activeGroupId || f.busyMid || ce.dispatch("toggle-member", { groupId: f.activeGroupId, mid: $ });
    }
    function v($, d) {
      ce.dispatch("preview-up", { mid: d, clientX: $.clientX, clientY: $.clientY });
    }
    function O($) {
      const d = r.value;
      d.has($) ? d.delete($) : d.add($);
    }
    function K() {
      if (!f.activeGroupId || f.busyMid) return;
      const $ = Array.from(r.value);
      if (!$.length) return;
      const d = $.filter((p) => {
        const R = f.followings.find((Q) => Q.mid === p);
        return R && !R.groupIds.includes(f.activeGroupId);
      });
      if (d.length) {
        for (const p of d)
          ce.dispatch("toggle-member", { groupId: f.activeGroupId, mid: p });
        r.value.clear();
      }
    }
    function $e() {
      if (!f.activeGroupId || f.busyMid) return;
      const $ = Array.from(r.value);
      if (!$.length) return;
      const d = $.filter((p) => {
        const R = f.followings.find((Q) => Q.mid === p);
        return R && R.groupIds.includes(f.activeGroupId);
      });
      if (d.length) {
        for (const p of d)
          ce.dispatch("toggle-member", { groupId: f.activeGroupId, mid: p });
        r.value.clear();
      }
    }
    function we() {
      for (const $ of G.value) r.value.add($.mid);
    }
    return ($, d) => n(f).open ? (o(), s("dialog", {
      key: 0,
      ref_key: "dialogEl",
      ref: k,
      class: "fo-up-group-dialog",
      open: "",
      onCancel: d[20] || (d[20] = C((p) => n(ce).close(), ["prevent"]))
    }, [
      e("div", ts, [
        e("header", {
          class: "fo-upg-head",
          onPointerdown: _
        }, [
          d[21] || (d[21] = e("h3", null, [
            e("span", null, "👥"),
            de(" 关注分组与 UP 主管理")
          ], -1)),
          e("button", {
            type: "button",
            class: "fo-upg-close-btn",
            "aria-label": "关闭",
            title: "关闭管理面板",
            onClick: d[0] || (d[0] = (p) => n(ce).close())
          }, "✕")
        ], 32),
        e("div", is, [
          e("aside", os, [
            e("div", ss, [
              d[22] || (d[22] = e("span", null, "我的分组", -1)),
              e("button", {
                type: "button",
                onClick: d[1] || (d[1] = (p) => pe(null))
              }, "＋ 新建")
            ]),
            e("div", ns, [
              e("div", {
                class: "fo-upg-root-dropzone",
                onDragover: d[2] || (d[2] = C(() => {
                }, ["prevent"])),
                onDrop: C(J, ["prevent"])
              }, "⇣ 拖至此处变为顶级分组", 32),
              m.value === null ? (o(), s("form", {
                key: 0,
                class: "fo-upg-create-box",
                onSubmit: C(ue, ["prevent"])
              }, [
                ne(e("input", {
                  "onUpdate:modelValue": d[3] || (d[3] = (p) => z.value = p),
                  maxlength: "20",
                  placeholder: "输入分组名称…",
                  autofocus: ""
                }, null, 512), [
                  [Se, z.value]
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
              ], 32)) : y("", !0),
              (o(!0), s(V, null, j(n(f).groups, (p) => (o(), s(V, {
                key: p.id
              }, [
                e("div", {
                  class: L(["fo-upg-group-item", { on: p.id === n(f).activeGroupId, "is-subgroup": p.depth > 0 }]),
                  style: Te({ paddingLeft: `${8 + p.depth * 18}px` }),
                  draggable: "true",
                  onDragstart: (R) => Z(R, p.id),
                  onDragover: d[7] || (d[7] = C(() => {
                  }, ["prevent"])),
                  onDrop: C((R) => te(R, p.id), ["prevent"]),
                  onClick: (R) => n(f).activeGroupId = p.id
                }, [
                  h.value === p.id ? (o(), s(V, { key: 0 }, [
                    ne(e("input", {
                      "onUpdate:modelValue": d[4] || (d[4] = (R) => E.value = R),
                      class: "fo-upg-rename-input",
                      maxlength: "20",
                      onClick: d[5] || (d[5] = C(() => {
                      }, ["stop"])),
                      onKeydown: ze(C(le, ["prevent"]), ["enter"])
                    }, null, 40, as), [
                      [Se, E.value]
                    ]),
                    e("button", {
                      type: "button",
                      onClick: C(le, ["stop"])
                    }, "✓"),
                    e("button", {
                      type: "button",
                      onClick: d[6] || (d[6] = C((R) => h.value = "", ["stop"]))
                    }, "✕")
                  ], 64)) : (o(), s(V, { key: 1 }, [
                    p.depth ? (o(), s("span", rs, "↳")) : (o(), s("i", ds)),
                    e("span", us, l(p.name), 1),
                    e("small", null, l(p.upMids.length), 1),
                    e("span", cs, [
                      e("button", {
                        type: "button",
                        title: "添加子分组",
                        onClick: C((R) => pe(p.id), ["stop"])
                      }, "＋", 8, ps),
                      e("button", {
                        type: "button",
                        title: "重命名",
                        onClick: C((R) => b(p), ["stop"])
                      }, "✎", 8, bs),
                      e("button", {
                        type: "button",
                        class: "danger",
                        title: "删除",
                        onClick: C((R) => n(ce).dispatch("delete-group", p.id), ["stop"])
                      }, "×", 8, vs)
                    ])
                  ], 64))
                ], 46, ls),
                m.value === p.id ? (o(), s("form", {
                  key: 0,
                  class: "fo-upg-create-box",
                  style: Te({ marginLeft: `${18 + p.depth * 18}px` }),
                  onSubmit: C(ue, ["prevent"])
                }, [
                  ne(e("input", {
                    "onUpdate:modelValue": d[8] || (d[8] = (R) => z.value = R),
                    maxlength: "20",
                    placeholder: `输入「${p.name}」的子分组名称…`,
                    autofocus: ""
                  }, null, 8, fs), [
                    [Se, z.value]
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
                ], 36)) : y("", !0)
              ], 64))), 128)),
              !n(f).groups.length && !n(f).loading ? (o(), s("p", gs, '暂无分组，请点击"＋ 新建"。')) : y("", !0)
            ])
          ]),
          e("section", ms, [
            e("div", hs, [
              e("div", ys, [
                e("h4", null, l(q.value ? `分组：「${q.value.name}」` : "请先选择或新建分组"), 1),
                q.value ? (o(), s("span", _s, "（本组 " + l(q.value.upMids.length) + " 位 · 共 " + l(n(f).followings.length) + " 位关注 · 未分组 " + l(ae.value) + " 位）", 1)) : y("", !0)
              ]),
              e("div", ks, [
                e("div", $s, [
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-filter-tab", { on: n(f).filter === "all" }]),
                    onClick: d[9] || (d[9] = (p) => n(f).filter = "all")
                  }, "全部关注", 2),
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-filter-tab", { on: n(f).filter === "ingroup" }]),
                    onClick: d[10] || (d[10] = (p) => n(f).filter = "ingroup")
                  }, "本组已加", 2)
                ]),
                e("div", ws, [
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-batch-toggle", { on: M.value }]),
                    onClick: d[11] || (d[11] = (p) => M.value = !M.value)
                  }, l(M.value ? "退出批量" : "批量操作"), 3),
                  M.value && r.value.size > 0 ? (o(), s(V, { key: 0 }, [
                    e("span", Cs, "已选 " + l(r.value.size), 1),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action add",
                      disabled: !q.value,
                      onClick: K
                    }, "＋ 加入本组", 8, xs),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action remove",
                      disabled: !q.value,
                      onClick: $e
                    }, "− 移出本组", 8, Ss),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: we
                    }, "全选当页"),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: d[12] || (d[12] = (p) => r.value.clear())
                    }, "清除")
                  ], 64)) : y("", !0)
                ]),
                n(f).filter === "all" ? (o(), s("label", {
                  key: 0,
                  class: L(["fo-upg-switch", { on: n(f).onlyUngrouped }])
                }, [
                  ne(e("input", {
                    "onUpdate:modelValue": d[13] || (d[13] = (p) => n(f).onlyUngrouped = p),
                    type: "checkbox"
                  }, null, 512), [
                    [kt, n(f).onlyUngrouped]
                  ]),
                  d[25] || (d[25] = e("span", { class: "fo-upg-switch-track" }, [
                    e("span", { class: "fo-upg-switch-thumb" })
                  ], -1)),
                  d[26] || (d[26] = e("span", { class: "fo-upg-switch-text" }, "仅未分组 UP", -1))
                ], 2)) : y("", !0)
              ])
            ]),
            e("div", Ts, [
              e("div", Ms, [
                d[27] || (d[27] = e("span", null, "🔍", -1)),
                ne(e("input", {
                  "onUpdate:modelValue": d[14] || (d[14] = (p) => n(f).query = p),
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
                onClick: d[15] || (d[15] = (p) => n(ce).dispatch("refresh"))
              }, l(n(f).refreshing ? "刷新中…" : "↻ 刷新关注"), 9, Ds)
            ]),
            e("div", {
              ref_key: "listRef",
              ref: W,
              class: "fo-upg-list"
            }, [
              n(f).loading ? (o(), s("div", Ps, [...d[28] || (d[28] = [
                e("i", null, null, -1),
                e("span", null, "正在加载关注的 UP 主列表…", -1)
              ])])) : n(f).error ? (o(), s("p", zs, l(n(f).error), 1)) : q.value ? G.value.length ? (o(!0), s(V, { key: 4 }, j(G.value, (p) => (o(), s("article", {
                key: p.mid,
                class: L(["fo-upg-card", { selected: M.value && r.value.has(p.mid) }]),
                title: `右键查看「${p.name}」近期投稿`,
                onContextmenu: C((R) => v(R, p.mid), ["prevent"]),
                onClick: (R) => M.value ? O(p.mid) : void 0
              }, [
                e("img", {
                  src: p.face,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, Ls),
                e("div", Es, [
                  e("div", As, l(p.name), 1),
                  e("div", Vs, l(p.sign || "暂无签名"), 1)
                ]),
                M.value ? (o(), s("div", {
                  key: 1,
                  class: L(["fo-upg-batch-check", { checked: r.value.has(p.mid) }])
                }, l(r.value.has(p.mid) ? "✓" : ""), 3)) : (o(), s(V, { key: 0 }, [
                  p.groupIds.includes(n(f).activeGroupId) ? (o(), s("button", {
                    key: 0,
                    type: "button",
                    class: "fo-upg-toggle-btn in-group",
                    disabled: n(f).busyMid === p.mid,
                    onClick: C((R) => I(p.mid), ["stop"])
                  }, l(n(f).busyMid === p.mid ? "处理中…" : `移出 ${q.value?.name || ""}`), 9, Us)) : p.groupIds.length > 0 ? (o(), s("div", Fs, [
                    e("button", {
                      type: "button",
                      class: "fo-upg-toggle-btn belongs-other fo-upg-move-trigger",
                      disabled: n(f).busyMid === p.mid
                    }, l(n(f).busyMid === p.mid ? "处理中…" : `📁 ${p.groupName || "已分组"}`), 9, Ns),
                    e("div", qs, [
                      d[30] || (d[30] = e("div", { class: "fo-upg-move-title" }, "移动到分组", -1)),
                      (o(!0), s(V, null, j(n(f).groups, (R) => (o(), s("button", {
                        key: R.id,
                        type: "button",
                        class: L(["fo-upg-move-item", { active: p.groupIds.includes(R.id) }]),
                        disabled: n(f).busyMid === p.mid,
                        onClick: C((Q) => be(p.mid, R.id), ["stop"])
                      }, [
                        d[29] || (d[29] = e("i", { class: "fo-folder-icon small" }, null, -1)),
                        e("span", null, l(R.name), 1),
                        p.groupIds.includes(R.id) ? (o(), s("small", Os, "✓ 已加入")) : y("", !0)
                      ], 10, Gs))), 128)),
                      n(f).groups.length ? y("", !0) : (o(), s("p", Hs, "暂无分组"))
                    ])
                  ])) : n(f).activeGroupId ? (o(), s("button", {
                    key: 2,
                    type: "button",
                    class: "fo-upg-toggle-btn",
                    disabled: n(f).busyMid === p.mid,
                    onClick: C((R) => I(p.mid), ["stop"])
                  }, l(n(f).busyMid === p.mid ? "处理中…" : "＋ 加入"), 9, js)) : y("", !0)
                ], 64))
              ], 42, Rs))), 128)) : (o(), s("p", Bs, "没有符合条件的 UP 主。")) : (o(), s("p", Is, "请先新建或选择一个分组。"))
            ], 512),
            e("div", Ws, [
              e("div", Ys, "共 " + l(T.value.length) + " 位 UP 主 · 每页 " + l(n(f).pageSize) + " 位", 1),
              P.value > 1 ? (o(), s("div", Ks, [
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(f).page <= 1,
                  onClick: d[16] || (d[16] = (p) => se(1))
                }, "« 首页", 8, Xs),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(f).page <= 1,
                  onClick: d[17] || (d[17] = (p) => se(n(f).page - 1))
                }, "‹ 上一页", 8, Qs),
                e("span", Js, l(n(f).page) + " / " + l(P.value), 1),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(f).page >= P.value,
                  onClick: d[18] || (d[18] = (p) => se(n(f).page + 1))
                }, "下一页 ›", 8, Zs),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: n(f).page >= P.value,
                  onClick: d[19] || (d[19] = (p) => se(P.value))
                }, "末页 »", 8, en)
              ])) : y("", !0)
            ])
          ])
        ])
      ])
    ], 544)) : y("", !0);
  }
}), on = /* @__PURE__ */ Ue(tn, [["__scopeId", "data-v-9e5aa70a"]]), sn = ["title"], nn = { class: "tape-capsule-text" }, ln = { class: "capsule-title" }, an = { class: "capsule-sub" }, rn = ["title"], dn = { class: "tape-deck-drop-slot" }, un = {
  key: 1,
  class: "tape-insert-feedback-chip"
}, cn = { class: "tape-loaded-title" }, pn = { class: "tape-body-content" }, bn = ["title", "onKeydown"], vn = { class: "tape-cassette" }, fn = { class: "tape-center-label" }, gn = { class: "tape-sticker-head" }, mn = ["title"], hn = ["src"], yn = { class: "tape-badge-row" }, _n = { class: "tape-brand-text" }, kn = { class: "tape-series-header" }, $n = { class: "tape-series-title-group" }, wn = { class: "tape-series-count-pill" }, Cn = { class: "tape-series-list-scroll" }, xn = ["onClick"], Sn = { class: "tape-series-item-left" }, Tn = { class: "tape-series-item-info" }, Mn = ["title"], Dn = { class: "tape-series-item-count" }, Pn = {
  key: 0,
  class: "tape-series-playing-tag"
}, zn = {
  key: 1,
  class: "tape-series-play-action"
}, In = {
  key: 0,
  class: "tape-series-empty"
}, Bn = {
  class: "tape-transport-controls",
  role: "group",
  "aria-label": "电台播放控制"
}, Rn = ["title", "aria-label"], Ln = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, En = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, An = { class: "tape-playback-section" }, Vn = { class: "tape-time-lyric-row" }, Un = { class: "tape-timestamp" }, Fn = { class: "tape-lyric-container" }, Nn = ["title"], qn = ["title", "aria-label"], Gn = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, On = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Hn = {
  key: 2,
  viewBox: "0 0 24 24",
  width: "13",
  height: "13",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, jn = ["aria-valuenow"], Wn = {
  class: "tape-waveform-row",
  "aria-hidden": "true"
}, Yn = {
  class: "tape-waveform-svg",
  viewBox: "0 0 160 16",
  preserveAspectRatio: "none"
}, Kn = ["x", "y", "height"], Xn = /* @__PURE__ */ Ie({
  __name: "BiliRadioTapePlayer",
  props: {
    dockSide: { type: Boolean, default: !1 }
  },
  setup(Me) {
    const m = Me, z = [
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
    ], h = S(!1), E = S(null), N = S(!1), M = S(!1), r = S(""), k = S(!1), _ = S(!1);
    function q(I) {
      I.stopPropagation(), _.value = !_.value, _.value && tt.init();
    }
    async function T(I) {
      _.value = !1, await tt.playSeries(I, 0);
    }
    function P(I) {
      if (!_.value) return;
      const v = I.target;
      !v?.closest(".tape-series-popover") && !v?.closest(".tape-cassette-wrap") && (_.value = !1);
    }
    function G(I) {
      I.key === "Escape" && _.value && (_.value = !1);
    }
    const ae = oe(() => H.mode === "one" ? "单曲循环" : H.mode === "shuffle" ? "乱序播放" : "顺序播放"), W = S(380);
    function X() {
      if (typeof document > "u" || !m.dockSide) return;
      const I = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock"), v = 20, O = 16;
      if (I) {
        const $e = I.getBoundingClientRect();
        if ($e.left > 80) {
          const we = Math.floor($e.left - v - O);
          if (we > 220) {
            W.value = we;
            return;
          }
        }
      }
      const K = typeof window < "u" ? window.innerWidth : 1280;
      W.value = Math.max(220, Math.floor(K / 2 - 230));
    }
    let se = null;
    function pe() {
      clearTimeout(se), se = setTimeout(X, 60);
    }
    Xe(() => {
      if (tt.init(), typeof window < "u" && (window.addEventListener("pointerdown", P), window.addEventListener("keydown", G)), m.dockSide) {
        X(), window.addEventListener("resize", pe);
        const I = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
        if (I && typeof ResizeObserver < "u") {
          const v = new ResizeObserver(() => X());
          v.observe(I), I.__bili_dock_ro = v;
        }
      }
    }), bt(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", P), window.removeEventListener("keydown", G), window.removeEventListener("resize", pe));
      const I = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
      I && I.__bili_dock_ro && (I.__bili_dock_ro.disconnect(), delete I.__bili_dock_ro);
    });
    function ke(I) {
      I.preventDefault(), N.value = !0;
    }
    function ue(I) {
      I.preventDefault(), I.dataTransfer && (I.dataTransfer.dropEffect = "copy"), N.value = !0;
    }
    function b(I) {
      const v = I.currentTarget, O = I.relatedTarget;
      (!O || !v.contains(O)) && (N.value = !1);
    }
    function le(I) {
      I.preventDefault(), N.value = !1;
      const v = I.dataTransfer;
      if (!v) return;
      let O = v.getData("application/x-bili-cassette") || v.getData("application/json"), K = null;
      if (O)
        try {
          K = JSON.parse(O);
        } catch {
        }
      if (!K?.bvid) {
        const we = (v.getData("text/plain") || v.getData("text/uri-list") || v.getData("application/x-logicweaver-video-url"))?.match(/BV[0-9a-zA-Z]+/);
        we && (K = {
          bvid: we[0],
          title: "放入的单曲卡带",
          cover: "",
          author: "Bilibili",
          duration: 0
        });
      }
      K?.bvid && (M.value = !0, r.value = K.title || K.bvid, setTimeout(() => {
        Ee.insertAndPlay(K);
      }, 280), setTimeout(() => {
        M.value = !1;
      }, 1500));
    }
    function Z(I) {
      if (E.value) {
        h.value = !0;
        try {
          I.currentTarget?.setPointerCapture?.(I.pointerId);
        } catch {
        }
        be(I);
      }
    }
    function te(I) {
      h.value && be(I);
    }
    function J(I) {
      if (h.value) {
        be(I), h.value = !1;
        try {
          I.currentTarget?.releasePointerCapture?.(I.pointerId);
        } catch {
        }
      }
    }
    function be(I) {
      if (!E.value) return;
      const v = E.value.getBoundingClientRect();
      if (v.width <= 0) return;
      const O = I.clientX - v.left, K = Math.max(0, Math.min(100, O / v.width * 100));
      Ee.seek(K);
    }
    return (I, v) => (o(), s("div", {
      class: L(["bili-tape-deck", {
        "is-playing": n(H).playing,
        "is-drag-over": N.value,
        "is-inserting": M.value,
        "dock-side-mode": m.dockSide,
        "dock-side-collapsed": m.dockSide && k.value
      }]),
      style: Te(m.dockSide && !k.value ? { maxWidth: `${W.value}px` } : void 0),
      onDragenter: ke,
      onDragover: ue,
      onDragleave: b,
      onDrop: le
    }, [
      m.dockSide && k.value ? (o(), s("div", {
        key: 0,
        class: "tape-collapsed-capsule",
        title: `电台：${n(H).title || "哔哩哔哩电台"}`
      }, [
        e("div", {
          class: L(["tape-capsule-spool", { spinning: n(H).playing }])
        }, [...v[9] || (v[9] = [
          e("div", { class: "spool-center-dot" }, null, -1)
        ])], 2),
        e("div", nn, [
          e("strong", ln, l(n(H).title || "B站电台"), 1),
          e("small", an, l(n(H).playing ? "♪ 播放中" : "已暂停"), 1)
        ]),
        e("button", {
          type: "button",
          class: "tape-capsule-play-btn",
          title: n(H).playing ? "暂停" : "播放",
          onClick: v[0] || (v[0] = C((O) => n(Ee).togglePlay(), ["stop"]))
        }, l(n(H).playing ? "⏸" : "▶"), 9, rn),
        e("button", {
          type: "button",
          class: "tape-capsule-expand-btn",
          title: "展开完整磁带播放条",
          onClick: v[1] || (v[1] = C((O) => k.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, sn)) : y("", !0),
      ne(e("div", dn, [...v[10] || (v[10] = [
        et('<div class="slot-visual-frame" data-v-b16560a2><span class="slot-icon-tape" data-v-b16560a2>📼</span><div class="slot-text-col" data-v-b16560a2><strong class="slot-headline" data-v-b16560a2>释放鼠标装填卡带</strong><small class="slot-subline" data-v-b16560a2>拖入视频封面 · 立即播放音乐</small></div></div>', 1)
      ])], 512), [
        [nt, N.value]
      ]),
      M.value ? (o(), s("div", un, [
        v[11] || (v[11] = e("span", { class: "tape-click-sound" }, "✓ 已装填", -1)),
        e("span", cn, "《" + l(r.value) + "》", 1)
      ])) : y("", !0),
      ne(e("div", pn, [
        e("div", {
          class: "tape-cassette-wrap",
          role: "button",
          tabindex: "0",
          title: `点击选择电台系列 (已建 ${n(D).radioSeries.length} 个系列 · 也可直接拖拽视频封面至此装填)`,
          onClick: q,
          onKeydown: ze(C(q, ["prevent"]), ["enter", "space"])
        }, [
          e("div", vn, [
            v[14] || (v[14] = e("div", { class: "tape-spool tape-spool-left" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1)),
            e("div", fn, [
              e("div", gn, [
                n(H).coverUrl ? (o(), s("div", {
                  key: 0,
                  class: "tape-cover-sticker",
                  title: n(H).title
                }, [
                  e("img", {
                    src: n(H).coverUrl,
                    alt: "Cover",
                    referrerpolicy: "no-referrer"
                  }, null, 8, hn)
                ], 8, mn)) : y("", !0),
                e("div", yn, [
                  v[12] || (v[12] = e("span", { class: "side-letter" }, "A", -1)),
                  e("span", _n, l(n(H).seriesName || "CASSETTE"), 1)
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
            e("div", kn, [
              e("div", $n, [
                v[16] || (v[16] = e("span", { class: "tape-series-icon" }, "📻", -1)),
                v[17] || (v[17] = e("span", { class: "tape-series-title" }, "自建电台系列", -1)),
                e("span", wn, l(n(D).radioSeries.length), 1)
              ]),
              e("button", {
                type: "button",
                class: "tape-series-close-btn",
                title: "关闭",
                "aria-label": "关闭",
                onClick: v[2] || (v[2] = C((O) => _.value = !1, ["stop"]))
              }, " ✕ ")
            ]),
            e("div", Cn, [
              (o(!0), s(V, null, j(n(D).radioSeries, (O) => (o(), s("div", {
                key: O.id,
                class: L(["tape-series-item", { "is-active": n(H).seriesName === O.name }]),
                onClick: C((K) => T(O.id), ["stop"])
              }, [
                e("div", Sn, [
                  v[18] || (v[18] = e("span", { class: "tape-series-item-bullet" }, "📼", -1)),
                  e("div", Tn, [
                    e("span", {
                      class: "tape-series-item-name",
                      title: O.name
                    }, l(O.name), 9, Mn),
                    e("span", Dn, l(O.count) + " 首曲目 · 顺序连播", 1)
                  ])
                ]),
                n(H).seriesName === O.name && n(H).playing ? (o(), s("span", Pn, " 播放中 ")) : (o(), s("span", zn, " ▶ "))
              ], 10, xn))), 128)),
              n(D).radioSeries.length ? y("", !0) : (o(), s("div", In, [...v[19] || (v[19] = [
                e("span", { class: "empty-icon" }, "📂", -1),
                e("span", { class: "empty-text" }, "暂无保存的电台系列", -1),
                e("span", { class: "empty-tip" }, "可在 B站工作区 → 电台 中添加曲目并保存为系列", -1)
              ])]))
            ])
          ])) : y("", !0)
        ], 40, bn),
        e("div", Bn, [
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "上一首",
            "aria-label": "上一首",
            onClick: v[4] || (v[4] = (O) => n(Ee).prev())
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
            class: L(["tape-ctrl-btn tape-ctrl-play", { playing: n(H).playing }]),
            title: n(H).playing ? "暂停播放" : "开始播放",
            "aria-label": n(H).playing ? "暂停" : "播放",
            onClick: v[5] || (v[5] = (O) => n(Ee).togglePlay())
          }, [
            n(H).playing ? (o(), s("svg", Ln, [...v[21] || (v[21] = [
              e("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" }, null, -1)
            ])])) : (o(), s("svg", En, [...v[22] || (v[22] = [
              e("path", { d: "M8 5v14l11-7z" }, null, -1)
            ])]))
          ], 10, Rn),
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "下一首",
            "aria-label": "下一首",
            onClick: v[6] || (v[6] = (O) => n(Ee).next())
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
        e("div", An, [
          e("div", Vn, [
            e("span", Un, l(n(H).formattedCurrent) + " / " + l(n(H).formattedDuration), 1),
            e("div", Fn, [
              e("span", {
                class: "tape-lyric-text",
                title: n(H).lyric
              }, l(n(H).lyric || "♪ 纯音乐 / 伴奏"), 9, Nn)
            ]),
            e("button", {
              type: "button",
              class: "tape-mode-btn",
              title: ae.value,
              "aria-label": ae.value,
              onClick: v[7] || (v[7] = (O) => n(Ee).toggleMode())
            }, [
              n(H).mode === "order" ? (o(), s("svg", Gn, [...v[24] || (v[24] = [
                e("polyline", { points: "17 1 21 5 17 9" }, null, -1),
                e("path", { d: "M3 11V9a4 4 0 0 1 4-4h14" }, null, -1),
                e("polyline", { points: "7 23 3 19 7 15" }, null, -1),
                e("path", { d: "M21 13v2a4 4 0 0 1-4 4H3" }, null, -1)
              ])])) : n(H).mode === "one" ? (o(), s("svg", On, [...v[25] || (v[25] = [
                et('<polyline points="17 1 21 5 17 9" data-v-b16560a2></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14" data-v-b16560a2></path><polyline points="7 23 3 19 7 15" data-v-b16560a2></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3" data-v-b16560a2></path><text x="12" y="14.5" font-size="7.5" font-weight="900" font-family="system-ui, -apple-system, sans-serif" fill="currentColor" stroke="none" text-anchor="middle" data-v-b16560a2>1</text>', 5)
              ])])) : n(H).mode === "shuffle" ? (o(), s("svg", Hn, [...v[26] || (v[26] = [
                et('<polyline points="16 3 21 3 21 8" data-v-b16560a2></polyline><line x1="4" y1="20" x2="21" y2="3" data-v-b16560a2></line><polyline points="21 16 21 21 16 21" data-v-b16560a2></polyline><line x1="15" y1="15" x2="21" y2="21" data-v-b16560a2></line><line x1="4" y1="4" x2="9" y2="9" data-v-b16560a2></line>', 5)
              ])])) : y("", !0)
            ], 8, qn)
          ]),
          e("div", {
            ref_key: "progressLineRef",
            ref: E,
            class: "tape-progress-rail",
            role: "slider",
            "aria-valuenow": n(H).progressPercent,
            "aria-valuemin": "0",
            "aria-valuemax": "100",
            "aria-label": "电台播放进度",
            onPointerdown: Z,
            onPointermove: te,
            onPointerup: J,
            onPointercancel: J
          }, [
            e("div", {
              class: "tape-progress-fill",
              style: Te({ width: `${n(H).progressPercent}%` })
            }, null, 4),
            e("div", {
              class: "tape-progress-handle",
              style: Te({ left: `${n(H).progressPercent}%` })
            }, null, 4)
          ], 40, jn),
          e("div", Wn, [
            (o(), s("svg", Yn, [
              (o(), s(V, null, j(z, (O, K) => e("rect", {
                key: K,
                class: "wave-bar",
                x: K * 4,
                y: 16 - O * 0.7,
                width: "1.8",
                height: O * 0.7,
                rx: "0.9",
                style: Te({ animationDelay: `${K % 8 * 0.12}s` })
              }, null, 12, Kn)), 64))
            ]))
          ])
        ]),
        m.dockSide ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "tape-dock-collapse-btn",
          title: "收起至左下角小胶囊",
          "aria-label": "收起磁带机",
          onClick: v[8] || (v[8] = C((O) => k.value = !0, ["stop"]))
        }, [...v[27] || (v[27] = [
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
        [nt, !m.dockSide || !k.value]
      ])
    ], 38));
  }
}), pt = /* @__PURE__ */ Ue(Xn, [["__scopeId", "data-v-b16560a2"]]), Qn = ["title"], Jn = {
  key: 2,
  class: "hero-lyric-body"
}, Zn = { class: "hero-lyric-stage" }, el = ["title"], tl = /* @__PURE__ */ Ie({
  __name: "BiliVideoLyricDockBar",
  props: {
    inlineHero: { type: Boolean, default: !1 }
  },
  setup(Me) {
    const m = S(340), z = S(!1), h = S(!1), E = S(null);
    function N(q) {
      const T = document.querySelector(".bili-mini-screen video, .bili-sub-screen video");
      T && (T.currentTime = Math.max(0, T.currentTime + q));
    }
    let M = 0, r = 0, k = "right";
    function _(q, T) {
      T.preventDefault(), T.stopPropagation(), z.value = !0, k = q, M = T.clientX, r = m.value;
      const P = (ae) => {
        if (!z.value) return;
        const W = ae.clientX - M, X = k === "right" ? r + W : r - W, se = Math.max(180, Math.min(720, X));
        m.value = se;
      }, G = () => {
        z.value = !1, window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", G), window.removeEventListener("pointercancel", G);
        try {
          localStorage.setItem("bili_hero_lyric_width", String(m.value));
        } catch {
        }
      };
      window.addEventListener("pointermove", P), window.addEventListener("pointerup", G), window.addEventListener("pointercancel", G);
    }
    return Xe(() => {
      try {
        const q = localStorage.getItem("bili_hero_lyric_width");
        if (q) {
          const T = parseInt(q, 10);
          Number.isFinite(T) && T >= 180 && T <= 720 && (m.value = T);
        }
      } catch {
      }
    }), (q, T) => (o(), s("aside", {
      ref_key: "barRef",
      ref: E,
      class: L(["bili-hero-lyric-bar", { "is-collapsed": h.value, "is-resizing": z.value }]),
      style: Te(h.value ? void 0 : { width: `${m.value}px` }),
      "aria-label": "视频实时字幕与控制"
    }, [
      h.value ? y("", !0) : (o(), s("div", {
        key: 0,
        class: "lyric-resize-handle handle-left",
        title: "按住向左拉伸宽度",
        onPointerdown: T[0] || (T[0] = (P) => _("left", P))
      }, [...T[7] || (T[7] = [
        e("span", { class: "resize-line" }, null, -1)
      ])], 32)),
      h.value ? (o(), s("div", {
        key: 1,
        class: "hero-lyric-capsule",
        title: `视频台词：${n(D).organizer.heroLyricText || "暂无字幕"} (点击展开)`,
        onClick: T[2] || (T[2] = (P) => h.value = !1)
      }, [
        T[8] || (T[8] = e("span", { class: "capsule-icon" }, "💬", -1)),
        T[9] || (T[9] = e("span", { class: "capsule-text" }, "台词", -1)),
        e("button", {
          type: "button",
          class: "capsule-expand-btn",
          title: "展开台词栏",
          onClick: T[1] || (T[1] = C((P) => h.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, Qn)) : (o(), s("div", Jn, [
        e("div", Zn, [
          e("button", {
            type: "button",
            class: "hero-lyric-seek-btn",
            title: "当前视频后退 5 秒",
            "aria-label": "后退 5 秒",
            onClick: T[3] || (T[3] = (P) => N(-5))
          }, " ‹ "),
          e("strong", {
            class: "hero-lyric-current-text",
            title: n(D).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"
          }, l(n(D).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"), 9, el),
          e("button", {
            type: "button",
            class: "hero-lyric-seek-btn",
            title: "当前视频前进 5 秒",
            "aria-label": "前进 5 秒",
            onClick: T[4] || (T[4] = (P) => N(5))
          }, " › ")
        ]),
        e("button", {
          type: "button",
          class: "hero-lyric-collapse-btn",
          title: "收起台词栏",
          "aria-label": "收起台词栏",
          onClick: T[5] || (T[5] = C((P) => h.value = !0, ["stop"]))
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
      h.value ? y("", !0) : (o(), s("div", {
        key: 3,
        class: "lyric-resize-handle handle-right",
        title: "按住向右拉伸宽度",
        onPointerdown: T[6] || (T[6] = (P) => _("right", P))
      }, [...T[11] || (T[11] = [
        e("span", { class: "resize-line" }, null, -1)
      ])], 32))
    ], 6));
  }
}), il = /* @__PURE__ */ Ue(tl, [["__scopeId", "data-v-d0857a88"]]), ol = { class: "card-head bili-header-unified-row" }, sl = { class: "bili-header-left" }, nl = { class: "bili-header-right" }, ll = ["title"], al = { class: "bili-header-msg-label" }, rl = ["placeholder", "aria-label"], dl = ["title"], ul = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, cl = { class: "card-fullscreen-bili-suggest-head" }, pl = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, bl = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, vl = ["onClick", "onContextmenu"], fl = { class: "card-fullscreen-bili-thumb" }, gl = ["src"], ml = { key: 0 }, hl = { class: "card-fullscreen-bili-video-copy" }, yl = ["title"], _l = {
  class: "fm-pane",
  id: "pane-organizer"
}, kl = { id: "fo-body" }, $l = { class: "fo-bili-sidebar" }, wl = ["title"], Cl = { class: "fo-sidebar-toggle-title" }, xl = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Sl = ["aria-expanded", "title"], Tl = { class: "fo-sidebar-toggle-chevron" }, Ml = { class: "fo-sidebar-features-wrap" }, Dl = { class: "fo-sidebar-sub-wrap" }, Pl = ["title"], zl = { class: "fo-sidebar-sub-main" }, Il = { class: "fo-sidebar-sub-text" }, Bl = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Rl = ["title"], Ll = { class: "fo-sidebar-sub-main" }, El = { class: "fo-sidebar-sub-text" }, Al = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Vl = ["title"], Ul = { class: "fo-sidebar-sub-main" }, Fl = { class: "fo-sidebar-sub-text" }, Nl = { class: "fo-sidebar-sub-wrap fo-sidebar-recommend-wrap" }, ql = ["title"], Gl = { class: "fo-sidebar-sub-main" }, Ol = { class: "fo-sidebar-sub-text" }, Hl = { class: "fo-sidebar-sub-wrap fo-sidebar-radio-wrap" }, jl = ["title"], Wl = { class: "fo-sidebar-sub-main" }, Yl = { class: "fo-sidebar-sub-text" }, Kl = { class: "fo-sidebar-sub-wrap fo-sidebar-history-wrap" }, Xl = ["title"], Ql = { class: "fo-sidebar-sub-main" }, Jl = { class: "fo-sidebar-sub-text" }, Zl = { class: "fo-sidebar-favorite-hub" }, ea = { class: "fo-sidebar-sub-main" }, ta = { class: "fo-sidebar-sub-text" }, ia = ["title", "aria-label"], oa = {
  key: 0,
  class: "fo-move-target-banner"
}, sa = {
  class: "fo-bili-folder-list",
  "aria-label": "B站收藏夹"
}, na = {
  key: 0,
  class: "fo-bili-section-divider"
}, la = ["onDragover", "onDragleave", "onDrop"], aa = { class: "fo-bili-section-title" }, ra = ["data-folder-id", "data-folder-kind", "draggable", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], da = ["aria-expanded", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], ua = {
  class: "fo-group-caret",
  "aria-hidden": "true"
}, ca = {
  key: 0,
  class: "muted small"
}, pa = {
  key: 0,
  id: "fo-vue-main",
  class: "fo-bili-main"
}, ba = {
  key: 0,
  class: "fo-bili-loading"
}, va = {
  key: 1,
  class: "fo-bili-empty fo-bili-login-guide"
}, fa = { class: "fo-bili-login-card" }, ga = { class: "fo-bili-login-actions" }, ma = {
  key: 2,
  class: "fo-bili-empty"
}, ha = { class: "fo-bili-hero fo-hero-persistent" }, ya = { class: "fo-hero-left" }, _a = ["src"], ka = {
  key: 1,
  class: "fo-folder-icon"
}, $a = { class: "fo-hero-folder-info" }, wa = { class: "fo-bili-actions" }, Ca = ["disabled"], xa = ["title"], Sa = { class: "fo-bili-toolbar" }, Ta = {
  key: 0,
  class: "fo-bili-sort"
}, Ma = ["onClick"], Da = {
  class: "fo-mini-dock-anchor",
  "aria-label": "视频标签页"
}, Pa = ["title"], za = { class: "fo-video-tab-title" }, Ia = { class: "fo-video-tab-actions" }, Ba = ["title"], Ra = {
  key: 2,
  class: "fo-bili-batch-actions"
}, La = { class: "fo-batch-count" }, Ea = { class: "fo-bili-grid" }, Aa = {
  key: 0,
  class: "fo-bili-empty"
}, Va = ["data-batch-id", "onDragstart", "onContextmenu"], Ua = { class: "fo-bili-thumb" }, Fa = {
  key: 0,
  class: "fo-batch-check",
  title: "选择此视频"
}, Na = ["checked", "onChange"], qa = ["href", "onClick"], Ga = ["src"], Oa = { class: "fo-bili-count" }, Ha = { class: "fo-bili-duration" }, ja = { class: "fo-bili-title-row" }, Wa = ["href", "onClick"], Ya = ["aria-expanded", "onClick"], Ka = {
  key: 0,
  class: "fo-card-menu"
}, Xa = ["onClick"], Qa = ["onClick"], Ja = ["onClick"], Za = { class: "fo-bili-meta" }, er = ["onClick"], tr = {
  key: 0,
  class: "fo-pager"
}, ir = ["disabled"], or = { class: "fo-page-num" }, sr = ["disabled"], nr = {
  key: 1,
  id: "fo-vue-cache-main",
  class: "fo-bili-main"
}, lr = { class: "fo-bili-hero fo-hero-persistent fo-cached-hero" }, ar = { class: "fo-hero-left" }, rr = { class: "fo-hero-folder-info" }, dr = { class: "fo-bili-actions" }, ur = {
  key: 0,
  class: "fo-bili-loading"
}, cr = {
  key: 1,
  class: "fo-bili-grid fo-cached-video-grid"
}, pr = {
  key: 0,
  class: "fo-bili-empty"
}, br = { class: "fo-bili-thumb" }, vr = ["onClick"], fr = ["src"], gr = { class: "fo-bili-title-row" }, mr = ["onClick"], hr = ["onClick"], yr = { class: "fo-bili-meta" }, _r = {
  key: 2,
  id: "fo-vue-recommend-main",
  class: "fo-bili-main"
}, kr = { class: "fo-bili-hero" }, $r = { class: "fo-bili-heading" }, wr = { class: "fo-feed-hero-title" }, Cr = { class: "fo-feed-badge" }, xr = { class: "fo-bili-actions" }, Sr = ["disabled"], Tr = { class: "fo-bili-toolbar" }, Mr = { class: "fo-feed-count-tag" }, Dr = {
  key: 0,
  class: "fo-bili-loading"
}, Pr = {
  key: 1,
  class: "fo-bili-empty"
}, zr = {
  key: 2,
  class: "fo-bili-grid"
}, Ir = {
  key: 0,
  class: "fo-bili-empty"
}, Br = ["onDragstart"], Rr = { class: "fo-bili-thumb" }, Lr = ["href", "onClick"], Er = ["src"], Ar = { class: "fo-bili-count" }, Vr = { class: "fo-bili-duration" }, Ur = { class: "fo-bili-title-row" }, Fr = ["href", "onClick"], Nr = ["aria-expanded", "onClick"], qr = {
  key: 0,
  class: "fo-card-menu"
}, Gr = ["onClick"], Or = ["onClick"], Hr = ["onClick"], jr = ["onClick"], Wr = ["onClick"], Yr = { class: "fo-bili-meta" }, Kr = ["onClick"], Xr = {
  key: 3,
  id: "fo-vue-following-main",
  class: "fo-bili-main"
}, Qr = { class: "fo-bili-hero" }, Jr = { class: "fo-bili-heading" }, Zr = { class: "fo-feed-hero-title" }, ed = { class: "fo-feed-badge" }, td = { class: "fo-bili-actions" }, id = ["disabled"], od = { class: "fo-up-groups-bar" }, sd = { class: "fo-up-groups-list" }, nd = ["onClick"], ld = { class: "count" }, ad = { class: "fo-up-groups-actions" }, rd = {
  key: 0,
  class: "fo-up-members-strip"
}, dd = { class: "fo-up-members-label" }, ud = { class: "fo-up-members-list" }, cd = ["title", "onClick", "onContextmenu"], pd = ["src"], bd = { class: "fo-bili-toolbar" }, vd = { class: "fo-feed-count-tag" }, fd = {
  key: 1,
  class: "fo-bili-loading"
}, gd = {
  key: 2,
  class: "fo-bili-empty"
}, md = {
  key: 3,
  class: "fo-bili-grid"
}, hd = {
  key: 0,
  class: "fo-bili-empty"
}, yd = ["onDragstart"], _d = { class: "fo-bili-thumb" }, kd = ["href", "onClick"], $d = ["src"], wd = { class: "fo-bili-count" }, Cd = { class: "fo-bili-duration" }, xd = { class: "fo-bili-title-row" }, Sd = ["href", "onClick"], Td = ["aria-expanded", "onClick"], Md = {
  key: 0,
  class: "fo-card-menu"
}, Dd = ["onClick"], Pd = ["onClick"], zd = ["onClick"], Id = ["onClick"], Bd = { class: "fo-bili-meta" }, Rd = ["onClick"], Ld = { class: "fo-pager" }, Ed = ["disabled"], Ad = { class: "fo-page-num" }, Vd = ["disabled"], Ud = {
  key: 4,
  id: "fo-vue-subscription-main",
  class: "fo-bili-main fo-vue-subscription-main"
}, Fd = { class: "bili-sub-vue-shell" }, Nd = {
  key: 0,
  class: "fo-bili-loading"
}, qd = {
  key: 1,
  class: "fo-bili-empty"
}, Gd = {
  key: 2,
  class: "bili-sub-layout bili-sub-vue-layout"
}, Od = {
  key: 5,
  id: "fo-vue-radio-main",
  class: "fo-bili-main fo-vue-radio-main"
}, Hd = { class: "fo-bili-hero fo-radio-hero" }, jd = { class: "fo-bili-actions" }, Wd = { class: "bili-radio-layout fo-vue-radio-layout" }, Yd = { class: "bili-radio-folders" }, Kd = { id: "bili-radio-folders" }, Xd = ["onClick"], Qd = {
  key: 0,
  class: "muted small"
}, Jd = { class: "bili-radio-library" }, Zd = {
  key: 0,
  role: "alert",
  class: "muted small"
}, eu = {
  id: "bili-radio-videos",
  class: "bili-radio-videos"
}, tu = ["title", "onDragstart", "onClick"], iu = ["src"], ou = { key: 1 }, su = {
  key: 0,
  class: "muted small"
}, nu = { class: "bili-radio-editor" }, lu = { class: "bili-radio-name-row" }, au = ["placeholder", "onKeydown"], ru = { class: "bili-radio-btn-group" }, du = { class: "bili-radio-series-dropdown-wrap" }, uu = {
  value: "",
  disabled: "",
  selected: ""
}, cu = ["value"], pu = {
  id: "bili-radio-queue",
  class: "bili-radio-queue",
  "aria-label": "电台播放队列"
}, bu = ["onClick"], vu = { class: "bili-radio-queue-no" }, fu = ["src"], gu = { key: 1 }, mu = ["aria-label", "onClick"], hu = {
  key: 0,
  class: "muted small"
}, yu = { class: "bili-radio-actions" }, _u = ["disabled"], ku = ["disabled"], $u = ["title"], wu = {
  key: 2,
  class: "fo-context-divider"
}, Cu = /* @__PURE__ */ Ie({
  __name: "BilibiliWorkspace",
  setup(Me) {
    const m = S(!1);
    function z() {
      const a = D.radioSeriesName?.trim();
      if (!a) {
        m.value = !0;
        const t = document.getElementById("bili-radio-name");
        t && t.focus(), We.fetch(B("bili.radioAppName"), B("bili.radioNameEmpty"));
        return;
      }
      m.value = !1, b("radio-save", { name: a });
    }
    async function h() {
      const a = document.getElementById("bili-radio-name");
      a && (a.focus(), a.select(), We.fetch(B("bili.radioAppName"), B("bili.radioInputFocused")));
    }
    function E(a) {
      const t = a.target, i = t.value;
      if (i) {
        if (i === "__create_new__") {
          b("radio-clear"), D.radioSeriesName = "", We.fetch("哔哩哔哩电台", "已开启新系列创作，请从左侧添加视频"), t.value = "";
          return;
        }
        b("radio-load-series", i);
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
      Tt.togglePanel();
    }
    const r = oe(() => D.organizer), { active: k } = Ct("daily-bilibili", "/bilibili.html");
    _e(() => k.value && r.value.mode === "recommendations", (a) => {
      Ae.setRecommendationsActive(a);
    }, { immediate: !0, flush: "sync" }), _e(() => k.value && r.value.mode === "following", (a) => {
      Ae.setFollowingActive(a);
    }, { immediate: !0, flush: "sync" }), _e(() => k.value && r.value.mode === "subscription", (a) => {
      Ae.setSubscriptionActive(a);
    }, { immediate: !0, flush: "sync" });
    const _ = S(r.value.query), q = S(!1), T = S(!1), P = S(""), G = S({ visible: !1, x: 0, y: 0, video: null, folder: null }), { menuRef: ae, style: W } = Dt({
      visible: () => G.value.visible,
      anchor: () => G.value,
      dismiss: () => {
        G.value.visible = !1;
      }
    }), X = S(
      typeof localStorage < "u" && localStorage.getItem("bili_sidebar_features_collapsed") === "true"
    );
    function se() {
      X.value = !X.value;
      try {
        localStorage.setItem("bili_sidebar_features_collapsed", String(X.value));
      } catch {
      }
    }
    function pe() {
      he.bvid && wt.open({
        bvid: he.bvid,
        cid: he.cid,
        title: he.title
      });
    }
    function ke() {
      he.collapsed && Ye.toggleCollapse(), Ye.bringToFront();
    }
    function ue() {
      Ye.close();
    }
    _e(() => r.value.query, (a) => {
      _.value = a;
    }), _e(_, (a) => {
      (!a || !a.trim()) && r.value.query && b("organizer-search", "");
    });
    function b(a, t) {
      Ve.dispatch(a, t);
    }
    function le(a) {
      b(a.group ? "toggle-folder-group" : "select-folder", { id: a.id, kind: a.kind });
    }
    const Z = S(""), te = S(""), J = S("before"), be = S(!1);
    function I(a, t) {
      t.kind === "created" && (Z.value = t.id, a.dataTransfer?.setData("application/x-logicweaver-favorite-node", t.id), a.dataTransfer?.setData("text/plain", t.id), a.dataTransfer && (a.dataTransfer.effectAllowed = "move"));
    }
    function v(a, t) {
      if (t.kind !== "created" || !Z.value || Z.value === t.id) return;
      a.preventDefault(), a.dataTransfer && (a.dataTransfer.dropEffect = "move");
      const i = a.currentTarget;
      if (!i) return;
      const c = i.getBoundingClientRect(), A = (a.clientY - c.top) / Math.max(1, c.height), me = t.group && A > 0.25 && A < 0.75 ? "into" : A >= 0.5 ? "after" : "before";
      te.value = t.id, J.value = me;
    }
    function O(a, t) {
      const i = a.relatedTarget, c = a.currentTarget;
      c && i && c.contains(i) || te.value === t.id && (te.value = "");
    }
    function K() {
      Z.value = "", te.value = "", be.value = !1;
    }
    function $e(a, t) {
      a.preventDefault();
      const i = Z.value || a.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "", c = J.value || (t.group ? "into" : "after");
      K(), !(!i || i === t.id || t.kind !== "created") && b("move-folder-node", { sourceId: i, targetId: t.id, mode: c });
    }
    function we(a) {
      Z.value && (a.preventDefault(), a.dataTransfer && (a.dataTransfer.dropEffect = "move"), be.value = !0);
    }
    function $(a) {
      const t = a.relatedTarget, i = a.currentTarget;
      i && t && i.contains(t) || (be.value = !1);
    }
    function d(a) {
      a.preventDefault();
      const t = Z.value || a.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
      K(), t && b("move-folder-node", { sourceId: t, targetId: "root", mode: "into" });
    }
    function p() {
      const a = _.value.trim();
      b("organizer-search", a);
    }
    function R() {
      !_.value.trim() && r.value.query && b("organizer-search", "");
    }
    const Q = S(""), ve = S(!1), Ce = S(!1), xe = S("hot"), Be = S(""), Re = oe(() => xe.value === "live" ? B("bili.searchLiveTitle", { keyword: Be.value }) : B("bili.searchSuggestTitle")), Fe = oe(() => xe.value === "live" ? B("bili.searchLiveSubtitle") : B("bili.searchSuggestSubtitle")), fe = S([]), De = S(null), Le = S([]);
    let He = 0, w = null;
    function g(a) {
      if (!a) return null;
      const t = a.bvid || (String(a.param || "").startsWith("BV") ? a.param : "");
      if (!t && !a.aid && !a.id) return null;
      const i = String(a.pic || a.cover || "").replace(/^http:/, "https:"), c = i.startsWith("//") ? `https:${i}` : i, A = String(a.title || "").replace(/<[^>]+>/g, ""), me = Number(a.duration || 0), ht = me > 0 ? `${Math.floor(me / 60)}:${String(me % 60).padStart(2, "0")}` : String(a.duration || ""), Ze = a.stat?.view || a.play || 0, yt = Number(Ze) >= 1e4 ? `${(Number(Ze) / 1e4).toFixed(1)}万` : String(Number(Ze || 0)), _t = a.owner?.name || a.name || a.author || B("bili.upDefault");
      return {
        bvid: t,
        aid: String(a.aid || a.id || ""),
        title: A,
        cover: c,
        durationText: ht,
        playText: yt,
        upper: _t
      };
    }
    async function u() {
      if (xe.value = "hot", ve.value = !0, Le.value.length && Date.now() - He < 9e4) {
        fe.value = Le.value;
        return;
      }
      Ce.value = !0;
      try {
        const t = await (await fetch("https://api.bilibili.com/x/web-interface/index/top/feed/rcmd?ps=8&fresh_idx=1", { credentials: "include" })).json();
        let i = Array.isArray(t.data?.item) ? t.data.item : [];
        if (!i.length) {
          const me = await (await fetch("https://api.bilibili.com/x/web-interface/popular?ps=8&pn=1", { credentials: "include" })).json();
          i = Array.isArray(me.data?.list) ? me.data.list : [];
        }
        const c = i.map(g).filter(Boolean);
        Le.value = c, He = Date.now(), Q.value.trim() || (fe.value = c);
      } catch {
        fe.value = [];
      } finally {
        Ce.value = !1;
      }
    }
    function x() {
      Q.value.trim() ? U(Q.value.trim()) : u();
    }
    function F() {
      const a = Q.value.trim();
      if (clearTimeout(w), !a) {
        u();
        return;
      }
      w = setTimeout(() => {
        U(a);
      }, 320);
    }
    async function U(a) {
      ve.value = !0, xe.value = "live", Be.value = a, Ce.value = !0;
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
        if (Q.value.trim() !== a) return;
        const i = Array.isArray(t?.data?.result) ? t.data.result : [];
        fe.value = i.slice(0, 10).map(g).filter(Boolean);
      } catch {
        fe.value = [];
      } finally {
        Ce.value = !1;
      }
    }
    function Y(a) {
      ve.value = !1;
      const t = a.bvid || (String(a.param || a.id || "").startsWith("BV") ? a.param || a.id : "");
      t || a.aid ? Ye.openVideo({
        bvid: t,
        aid: a.aid,
        title: a.title,
        cover: a.cover,
        author: a.upper
      }) : window.LogicWeaverBiliSearchActions?.local ? window.LogicWeaverBiliSearchActions.local(a) : window.open(`https://www.bilibili.com/video/${t || a.bvid || a.id}`, "_blank");
    }
    function ie(a, t) {
      je(a, {
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
    function ee() {
      const a = Q.value.trim();
      if (ve.value = !1, !a) {
        u();
        return;
      }
      window.open(`https://search.bilibili.com/video?keyword=${encodeURIComponent(a)}`, "_blank");
    }
    function Ge(a) {
      De.value && !De.value.contains(a.target) && (ve.value = !1);
    }
    function Ne(a) {
      G.value.visible = !1, P.value = P.value === a ? "" : a;
    }
    function je(a, t, i = !0) {
      P.value = "", G.value = {
        visible: !0,
        x: a.clientX,
        y: a.clientY,
        video: t,
        folder: i && D.activeFolderId ? { id: String(D.activeFolderId), title: r.value.folderTitle } : null
      };
    }
    function qe(a) {
      if (a instanceof KeyboardEvent) {
        a.key === "Escape" && (P.value = "", G.value.visible = !1, r.value.isTargetPickMode && b("organizer-cancel-move-target"));
        return;
      }
      const t = a.target;
      t?.closest(".fo-card-menu, .fo-card-more") || (P.value = ""), t?.closest(".fo-context-menu") || (G.value.visible = !1);
    }
    const ge = typeof document < "u" && document.body.classList.contains("bili-standalone-body");
    function Oe() {
      !T.value || q.value || r.value.loading || (q.value = !0, b("organizer-open"));
    }
    _e(() => r.value.loading, (a) => {
      !a && !r.value.folders.length && Oe();
    }), Xe(() => {
      import("./bilibili-channel.service-B0Lbm3GJ.js").catch((a) => console.error("[Bilibili] 频道动作服务加载失败", a)), T.value = !0, Ve.loadOrganizer(), Oe(), document.addEventListener("pointerdown", qe, !0), document.addEventListener("pointerdown", Ge), window.addEventListener("keydown", qe), window.setBiliMiniDockVisible?.(!0), requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }), _e(() => [r.value.videos, r.value.mode], () => {
      requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }, { flush: "post" }), $t(() => {
      Ae.setRecommendationsActive(!1), Ae.setFollowingActive(!1), Ae.setSubscriptionActive(!1), T.value = !1, document.removeEventListener("pointerdown", qe, !0), document.removeEventListener("pointerdown", Ge), window.removeEventListener("keydown", qe);
    });
    function Qe(a, t) {
      P.value = "", G.value.visible = !1;
      const i = String(typeof a == "object" ? a.id || a.bvid || a.aid || "" : a), c = typeof a == "object" ? a : r.value.videos.find((A) => String(A.id) === i);
      b("organizer-video-action", { id: i, video: c, action: t });
    }
    async function Pe(a) {
      const { video: t, folder: i } = G.value;
      if (G.value.visible = !1, a === "share-chat") {
        if (!t) return;
        try {
          const { chatService: c } = await import("./view-styles-Dl5Su5-d.js").then((me) => me.aL), { windowManagerController: A } = await import("./window-manager.store-BD4IokhA.js").then((me) => me.n);
          c.sendBiliShare({
            bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
            aid: t.aid,
            title: t.title,
            cover: t.cover,
            upName: t.author,
            upMid: t.authorMid,
            upFace: t.authorFace,
            play: t.playCount
          }), A.open("chat");
        } catch (c) {
          console.warn("分享到聊天室失败", c);
        }
        return;
      }
      t && b("organizer-video-action", { id: t.id || "", video: t, action: a });
    }
    function vt(a) {
      const t = D.radioSeriesName?.trim();
      let i = D.radioSeries.find((c) => c.name === t);
      if (!i && D.radioQueue.length && (i = {
        id: `series_${Date.now()}`,
        name: t || "未命名电台系列",
        count: D.radioQueue.length,
        items: D.radioQueue
      }), !i || !i.items?.length) {
        We.fetch("哔哩哔哩电台", "当前没有可分享的系列曲目，请先添加曲目");
        return;
      }
      ut.sendBiliSeriesShare(i, a);
    }
    function ft(a) {
      const { video: t } = G.value;
      G.value.visible = !1, t && ut.sendBiliShare({
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
    function gt(a) {
      if (!r.value.isTargetPickMode) return;
      if (!a.target?.closest(".fo-bili-folder-list")) {
        const i = document.querySelector(".fo-bili-folder-list");
        i && (a.preventDefault(), i.scrollTop += a.deltaY);
      }
    }
    function lt(a) {
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
      const i = t.bvid || t.url?.match(/video\/(BV[0-9a-zA-Z]+)/)?.[1] || t.id, c = JSON.stringify({
        type: "bili-cassette-tape",
        bvid: i,
        title: t.title,
        cover: t.cover,
        author: t.author,
        duration: t.duration
      });
      a.dataTransfer.setData("application/x-bili-cassette", c), a.dataTransfer.setData("application/json", c);
      const A = lt(t.title);
      a.dataTransfer.setDragImage(A, 72, 25), setTimeout(() => {
        A.parentNode && A.parentNode.removeChild(A);
      }, 0);
    }
    function mt(a, t) {
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
      const c = lt(t.title);
      a.dataTransfer.setDragImage(c, 72, 25), setTimeout(() => {
        c.parentNode && c.parentNode.removeChild(c);
      }, 0);
    }
    return (a, t) => (o(), s("section", {
      id: "daily-bilibili",
      class: L(["card wide", { "card-fullscreen": n(ge) || n(it).activeId === "daily-bilibili" }])
    }, [
      e("header", ol, [
        e("div", sl, [
          t[51] || (t[51] = e("span", {
            class: "bar",
            style: { background: "linear-gradient(180deg,#818cf8,#f472b6)" }
          }, null, -1)),
          e("h2", null, l(n(B)("bili.workspace.title")), 1)
        ]),
        e("div", nl, [
          e("button", {
            id: "bili-header-msg-center-btn",
            class: L(["fm-tab bili-header-msg-btn", { "is-active": n(Mt).isOpen }]),
            type: "button",
            title: n(B)("bili.workspace.msgCenterTip"),
            onClick: M
          }, [
            t[52] || (t[52] = e("span", { class: "bili-header-msg-icon" }, "🔔", -1)),
            e("span", al, l(n(B)("bili.workspace.msgBtn")), 1)
          ], 10, ll),
          e("div", {
            class: "card-fullscreen-bili-search",
            ref_key: "searchHostRef",
            ref: De
          }, [
            e("form", {
              class: "card-fullscreen-bili-searchbar",
              role: "search",
              onSubmit: C(ee, ["prevent"])
            }, [
              ne(e("input", {
                "onUpdate:modelValue": t[0] || (t[0] = (i) => Q.value = i),
                type: "search",
                autocomplete: "off",
                placeholder: n(B)("bili.workspace.searchPlaceholder"),
                "aria-label": n(B)("bili.workspace.searchAria"),
                onFocus: x,
                onInput: F
              }, null, 40, rl), [
                [Se, Q.value]
              ]),
              e("button", {
                type: "submit",
                title: n(B)("bili.workspace.searchBtnTip")
              }, "⌕", 8, dl)
            ], 32),
            ve.value ? (o(), s("div", ul, [
              e("div", cl, [
                e("span", null, l(Re.value), 1),
                e("small", null, l(Fe.value), 1)
              ]),
              Ce.value ? (o(), s("p", pl, "正在获取推荐 / 搜索中…")) : !fe.value.length && !Ce.value ? (o(), s("p", bl, "没有找到相关视频，回车可在 B站 全网搜索")) : (o(!0), s(V, { key: 2 }, j(fe.value, (i) => (o(), s("button", {
                key: i.bvid || i.aid,
                type: "button",
                class: "card-fullscreen-bili-video-row",
                role: "option",
                onClick: (c) => Y(i),
                onContextmenu: C((c) => ie(c, i), ["prevent"])
              }, [
                e("span", fl, [
                  e("img", {
                    src: i.cover,
                    alt: "",
                    referrerpolicy: "no-referrer",
                    loading: "lazy"
                  }, null, 8, gl),
                  i.durationText ? (o(), s("i", ml, l(i.durationText), 1)) : y("", !0)
                ]),
                e("span", hl, [
                  e("strong", null, l(i.title), 1),
                  e("small", null, l(i.upper) + " · " + l(i.playText) + "播放", 1)
                ])
              ], 40, vl))), 128))
            ])) : y("", !0)
          ], 512),
          e("button", {
            id: "bili-up-group-manager-top",
            class: "fm-tab bili-header-up-group-btn",
            type: "button",
            title: n(B)("bili.workspace.upGroupManagerTip"),
            onClick: t[1] || (t[1] = (i) => b("manage-up-groups"))
          }, l(n(B)("bili.workspace.upGroupManager")), 9, yl)
        ])
      ]),
      e("div", _l, [
        e("div", kl, [
          e("div", {
            class: L(["fo-bili-layout", { "fo-picking-move-target": r.value.isTargetPickMode }]),
            "data-vue-organizer-shell": "true",
            onWheel: gt
          }, [
            e("aside", $l, [
              e("div", {
                class: L(["fo-sidebar-toggle-bar", { "is-collapsed": X.value }]),
                title: X.value ? n(B)("bili.channel.expandTip") : n(B)("bili.channel.collapseTip"),
                onClick: se
              }, [
                e("div", Cl, [
                  t[53] || (t[53] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                  e("span", null, l(n(B)("bili.channel.title")), 1),
                  X.value ? (o(), s("span", xl, "6")) : y("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "fo-sidebar-toggle-action",
                  "aria-expanded": !X.value,
                  title: X.value ? n(B)("bili.channel.expand") : n(B)("bili.channel.collapse")
                }, [
                  e("span", null, l(X.value ? n(B)("bili.channel.expand") : n(B)("bili.channel.collapse")), 1),
                  e("span", Tl, l(X.value ? "▾" : "▴"), 1)
                ], 8, Sl)
              ], 10, wl),
              ne(e("div", Ml, [
                e("div", Dl, [
                  e("button", {
                    id: "fo-sidebar-sub-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "subscription" }]),
                    title: n(B)("bili.channel.subVideoTip"),
                    onClick: t[2] || (t[2] = (i) => b("open-sub-video"))
                  }, [
                    e("div", zl, [
                      t[54] || (t[54] = e("span", { class: "fo-sidebar-sub-icon" }, "🎬", -1)),
                      e("div", Il, [
                        e("strong", null, l(n(B)("bili.channel.subVideo")), 1),
                        e("small", null, l(n(B)("bili.channel.subVideoSub")), 1)
                      ])
                    ]),
                    t[55] || (t[55] = e("span", { class: "fo-sidebar-sub-badge" }, "NEW", -1))
                  ], 10, Pl)
                ]),
                e("div", Bl, [
                  e("button", {
                    id: "fo-sidebar-cache-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "cache" }]),
                    title: n(B)("bili.channel.cacheVideoTip"),
                    onClick: t[3] || (t[3] = (i) => b("open-cache"))
                  }, [
                    e("div", Ll, [
                      t[56] || (t[56] = e("span", { class: "fo-sidebar-sub-icon" }, "💾", -1)),
                      e("div", El, [
                        e("strong", null, l(n(B)("bili.channel.cacheVideo")), 1),
                        e("small", null, l(n(B)("bili.channel.cacheVideoSub")), 1)
                      ])
                    ]),
                    t[57] || (t[57] = e("span", { class: "fo-sidebar-sub-badge" }, "LOCAL", -1))
                  ], 10, Rl)
                ]),
                e("div", Al, [
                  e("button", {
                    id: "fo-sidebar-following-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "following" }]),
                    title: n(B)("bili.channel.followingTip"),
                    onClick: t[4] || (t[4] = (i) => b("open-following"))
                  }, [
                    e("div", Ul, [
                      t[58] || (t[58] = e("span", { class: "fo-sidebar-sub-icon" }, "📺", -1)),
                      e("div", Fl, [
                        e("strong", null, l(n(B)("bili.channel.following")), 1),
                        e("small", null, l(n(B)("bili.channel.followingSub")), 1)
                      ])
                    ]),
                    t[59] || (t[59] = e("span", { class: "fo-sidebar-sub-badge" }, "FEED", -1))
                  ], 10, Vl)
                ]),
                e("div", Nl, [
                  e("button", {
                    id: "fo-sidebar-recommend-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "recommendations" }]),
                    title: n(B)("bili.channel.forYouTip"),
                    onClick: t[5] || (t[5] = (i) => b("open-recommendations"))
                  }, [
                    e("div", Gl, [
                      t[60] || (t[60] = e("span", { class: "fo-sidebar-sub-icon" }, "✨", -1)),
                      e("div", Ol, [
                        e("strong", null, l(n(B)("bili.channel.forYou")), 1),
                        e("small", null, l(n(B)("bili.channel.forYouSub")), 1)
                      ])
                    ]),
                    t[61] || (t[61] = e("span", { class: "fo-sidebar-sub-badge" }, "FOR YOU", -1))
                  ], 10, ql)
                ]),
                e("div", Hl, [
                  e("button", {
                    id: "fo-sidebar-radio-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "radio" }]),
                    title: n(B)("bili.channel.radioTip"),
                    onClick: t[6] || (t[6] = (i) => b("open-radio"))
                  }, [
                    e("div", Wl, [
                      t[62] || (t[62] = e("span", { class: "fo-sidebar-sub-icon" }, "📻", -1)),
                      e("div", Yl, [
                        e("strong", null, l(n(B)("bili.channel.radio")), 1),
                        e("small", null, l(n(B)("bili.channel.radioSub")), 1)
                      ])
                    ]),
                    t[63] || (t[63] = e("span", { class: "fo-sidebar-sub-badge" }, "RADIO", -1))
                  ], 10, jl)
                ]),
                e("div", Kl, [
                  e("button", {
                    id: "fo-sidebar-history-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: r.value.mode === "organizer" && n(D).activeFolderId === "__history__" }]),
                    title: n(B)("bili.channel.historyTip"),
                    onClick: t[7] || (t[7] = (i) => b("select-folder", { id: "__history__", kind: "other" }))
                  }, [
                    e("div", Ql, [
                      t[64] || (t[64] = e("span", { class: "fo-sidebar-sub-icon" }, "📜", -1)),
                      e("div", Jl, [
                        e("strong", null, l(n(B)("bili.channel.history")), 1),
                        e("small", null, l(n(B)("bili.channel.historySub")), 1)
                      ])
                    ]),
                    t[65] || (t[65] = e("span", { class: "fo-sidebar-sub-badge" }, "HISTORY", -1))
                  ], 10, Xl)
                ])
              ], 512), [
                [nt, !X.value]
              ]),
              e("div", Zl, [
                e("div", ea, [
                  t[66] || (t[66] = e("span", { class: "fo-sidebar-sub-icon" }, "📁", -1)),
                  e("div", ta, [
                    e("strong", null, l(n(B)("bili.channel.foldersHub")), 1),
                    e("small", null, l(n(B)("bili.channel.foldersHubSub")), 1)
                  ])
                ]),
                e("button", {
                  class: "fo-sidebar-hub-add",
                  type: "button",
                  title: n(B)("bili.channel.createFolderTip"),
                  "aria-label": n(B)("bili.channel.createFolderTip"),
                  onClick: t[8] || (t[8] = (i) => b("create-bili-folder"))
                }, "＋", 8, ia)
              ]),
              r.value.isTargetPickMode ? (o(), s("div", oa, [
                t[67] || (t[67] = e("div", { class: "fo-move-target-tip" }, [
                  e("span", { class: "fo-move-target-dot" }),
                  e("span", null, [
                    de("请点击"),
                    e("strong", null, "自建收藏夹"),
                    de("移入")
                  ])
                ], -1)),
                e("button", {
                  type: "button",
                  class: "fo-move-target-cancel",
                  title: "取消移动 (按 Esc 也可取消)",
                  onClick: t[9] || (t[9] = (i) => b("organizer-cancel-move-target"))
                }, " ✕ 取消 ")
              ])) : y("", !0),
              e("nav", sa, [
                (o(!0), s(V, null, j(r.value.folders, (i, c) => (o(), s(V, {
                  key: `${i.group ? "group" : "folder"}:${i.id}`
                }, [
                  c > 0 && r.value.folders[c - 1]?.kind !== i.kind ? (o(), s("div", na)) : y("", !0),
                  c === 0 || r.value.folders[c - 1]?.kind !== i.kind ? (o(), s("div", {
                    key: 1,
                    class: L(["fo-bili-section-head fo-vue-section-head", { "drag-into": i.kind === "created" && be.value }]),
                    onDragover: (A) => i.kind === "created" ? we(A) : void 0,
                    onDragleave: (A) => i.kind === "created" ? $(A) : void 0,
                    onDrop: (A) => i.kind === "created" ? d(A) : void 0
                  }, [
                    e("span", aa, [
                      e("b", null, l(i.kind === "collected" ? "我追的合集/收藏夹" : i.kind === "other" ? "其他收藏" : "我创建的收藏夹"), 1)
                    ]),
                    i.kind === "created" ? (o(), s("button", {
                      key: 0,
                      class: "fo-bili-section-add-btn",
                      type: "button",
                      title: "新建插件分组",
                      "aria-label": "新建插件分组",
                      onClick: t[10] || (t[10] = C((A) => b("create-local-group"), ["stop"]))
                    }, "＋")) : y("", !0)
                  ], 42, la)) : y("", !0),
                  i.group ? (o(), s("div", {
                    key: 3,
                    class: L(["fo-bili-group-label", {
                      collapsed: i.collapsed,
                      dragging: Z.value === i.id,
                      "drag-before": te.value === i.id && J.value === "before",
                      "drag-after": te.value === i.id && J.value === "after",
                      "drag-into": te.value === i.id && J.value === "into"
                    }]),
                    style: Te({ "--fo-depth": i.depth }),
                    role: "button",
                    tabindex: "0",
                    "aria-expanded": !i.collapsed,
                    draggable: !0,
                    onClick: (A) => le(i),
                    onKeydown: [
                      ze(C((A) => le(i), ["prevent"]), ["enter"]),
                      ze(C((A) => le(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (A) => I(A, i),
                    onDragover: (A) => v(A, i),
                    onDragleave: (A) => O(A, i),
                    onDrop: (A) => $e(A, i),
                    onDragend: K
                  }, [
                    e("i", ua, l(i.collapsed ? "›" : "⌄"), 1),
                    t[69] || (t[69] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, da)) : (o(), s("div", {
                    key: 2,
                    role: "button",
                    tabindex: "0",
                    class: L(["fo-bili-folder", {
                      on: i.selected,
                      dragging: Z.value === i.id,
                      "drag-before": te.value === i.id && J.value === "before",
                      "drag-after": te.value === i.id && J.value === "after",
                      "drag-into": te.value === i.id && J.value === "into",
                      "target-candidate": r.value.isTargetPickMode && i.kind === "created" && !i.selected
                    }]),
                    "data-folder-id": i.id,
                    "data-folder-kind": i.kind,
                    style: Te({ "--fo-depth": i.depth }),
                    draggable: i.kind === "created",
                    onClick: (A) => le(i),
                    onKeydown: [
                      ze(C((A) => le(i), ["prevent"]), ["enter"]),
                      ze(C((A) => le(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (A) => I(A, i),
                    onDragover: (A) => v(A, i),
                    onDragleave: (A) => O(A, i),
                    onDrop: (A) => $e(A, i),
                    onDragend: K
                  }, [
                    t[68] || (t[68] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, l(i.title), 1),
                    e("small", null, l(i.count), 1)
                  ], 46, ra))
                ], 64))), 128)),
                !r.value.loading && !r.value.error && !r.value.folders.length ? (o(), s("p", ca, "暂无可用收藏夹。")) : y("", !0)
              ])
            ]),
            r.value.mode === "organizer" ? (o(), s("section", pa, [
              r.value.loading ? (o(), s("div", ba, [...t[70] || (t[70] = [
                e("i", null, null, -1),
                e("span", null, "正在读取 B站收藏内容…", -1)
              ])])) : r.value.error && r.value.error.includes("未登录") ? (o(), s("div", va, [
                e("div", fa, [
                  t[72] || (t[72] = e("span", { class: "fo-bili-login-icon" }, "📺", -1)),
                  t[73] || (t[73] = e("h3", null, "未检测到哔哩哔哩登录状态", -1)),
                  t[74] || (t[74] = e("p", null, "tab-Project 直接复用当前浏览器的 B站 网页会话，无需输入账号密码或扫码授权。", -1)),
                  e("div", ga, [
                    t[71] || (t[71] = e("a", {
                      class: "fo-bili-btn-login",
                      href: "https://passport.bilibili.com/login",
                      target: "_blank",
                      rel: "noreferrer"
                    }, "前往 bilibili.com 登录 ↗", -1)),
                    e("button", {
                      type: "button",
                      class: "fo-bili-btn-refresh",
                      onClick: t[11] || (t[11] = (i) => b("organizer-refresh"))
                    }, "已登录，点击刷新 ↻")
                  ])
                ])
              ])) : r.value.error ? (o(), s("p", ma, l(r.value.error), 1)) : (o(), s(V, { key: 3 }, [
                e("header", ha, [
                  e("div", ya, [
                    e("div", {
                      class: L(["fo-bili-cover", { "fo-vue-cover-image": r.value.folderCover }])
                    }, [
                      r.value.folderCover ? (o(), s("img", {
                        key: 0,
                        src: r.value.folderCover,
                        alt: "",
                        referrerpolicy: "no-referrer"
                      }, null, 8, _a)) : (o(), s("i", ka))
                    ], 2),
                    e("div", $a, [
                      e("h3", null, l(r.value.folderTitle), 1),
                      e("p", null, l(r.value.folderSubtitle), 1)
                    ])
                  ]),
                  ye(il, { "inline-hero": "" }),
                  e("div", wa, [
                    e("button", {
                      type: "button",
                      class: "primary",
                      disabled: !r.value.videos.length,
                      onClick: t[12] || (t[12] = (i) => b("organizer-batch-toggle"))
                    }, l(r.value.batchMode ? n(B)("bili.workspace.batchBack") : n(B)("bili.workspace.batch")), 9, Ca),
                    e("button", {
                      type: "button",
                      title: n(B)("bili.workspace.refreshFolderTip"),
                      onClick: t[13] || (t[13] = (i) => b("organizer-refresh"))
                    }, "↻", 8, xa)
                  ])
                ]),
                e("div", Sa, [
                  r.value.batchMode ? y("", !0) : (o(), s("div", Ta, [
                    (o(!0), s(V, null, j([{ id: "fav_time", text: n(B)("bili.sort.favTime") }, { id: "view", text: n(B)("bili.sort.view") }, { id: "pubtime", text: n(B)("bili.sort.pubTime") }], (i) => (o(), s("button", {
                      key: i.id,
                      type: "button",
                      class: L({ on: r.value.sort === i.id }),
                      onClick: (c) => b("organizer-sort", i.id)
                    }, l(i.text), 11, Ma))), 128))
                  ])),
                  e("div", Da, [
                    n(he).isOpen && n(he).bvid ? (o(), s("div", {
                      key: 0,
                      class: L(["fo-video-tab-item", { "is-collapsed": n(he).collapsed }]),
                      title: n(he).title
                    }, [
                      e("div", {
                        class: "fo-video-tab-meta",
                        onClick: ke
                      }, [
                        e("span", {
                          class: L(["fo-video-tab-pulse", { playing: n(he).isPlaying }])
                        }, null, 2),
                        e("span", za, l(n(he).title), 1)
                      ]),
                      e("div", Ia, [
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-close",
                          title: "关闭视频",
                          onClick: C(ue, ["stop"])
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
                          title: n(he).collapsed ? "放大恢复视频小窗" : "聚焦视频小窗",
                          onClick: C(ke, ["stop"])
                        }, " 放大 ", 8, Ba)
                      ])
                    ], 10, Pa)) : y("", !0)
                  ]),
                  r.value.batchMode ? (o(), s("div", Ra, [
                    e("span", La, "已选择 " + l(r.value.selectedCount) + " 项", 1),
                    e("button", {
                      type: "button",
                      onClick: t[15] || (t[15] = (i) => b("organizer-batch-all"))
                    }, "全选/取消全选"),
                    e("button", {
                      type: "button",
                      class: L({ "picking-target": r.value.isTargetPickMode }),
                      onClick: t[16] || (t[16] = (i) => r.value.isTargetPickMode ? b("organizer-cancel-move-target") : b("organizer-batch-move"))
                    }, l(r.value.isTargetPickMode ? "✕ 取消移动" : "移动到"), 3),
                    e("button", {
                      type: "button",
                      onClick: t[17] || (t[17] = (i) => b("organizer-batch-cache"))
                    }, "缓存所选"),
                    e("button", {
                      type: "button",
                      onClick: t[18] || (t[18] = (i) => b("organizer-batch-unfavorite"))
                    }, "取消收藏")
                  ])) : (o(), s("form", {
                    key: 1,
                    class: "fo-bili-search",
                    onSubmit: C(p, ["prevent"])
                  }, [
                    ne(e("input", {
                      "onUpdate:modelValue": t[14] || (t[14] = (i) => _.value = i),
                      type: "search",
                      placeholder: "请输入关键词",
                      "aria-label": "搜索当前收藏夹",
                      onInput: R,
                      onSearch: R
                    }, null, 544), [
                      [Se, _.value]
                    ]),
                    t[75] || (t[75] = e("button", {
                      type: "submit",
                      title: "搜索"
                    }, "⌕", -1))
                  ], 32))
                ]),
                e("div", Ea, [
                  r.value.videos.length ? y("", !0) : (o(), s("p", Aa, l(r.value.query ? "没有找到匹配的视频。" : "这个收藏夹是空的。"), 1)),
                  (o(!0), s(V, null, j(r.value.videos, (i) => (o(), s("article", {
                    key: i.id,
                    class: L(["fo-bili-card", { "batch-selected": i.selected, "fo-single-moving": r.value.movingVideoId === i.id }]),
                    "data-batch-id": i.id,
                    draggable: "true",
                    onDragstart: (c) => Je(c, i),
                    onContextmenu: C((c) => je(c, i), ["prevent", "stop"])
                  }, [
                    e("div", Ua, [
                      r.value.batchMode ? (o(), s("label", Fa, [
                        e("input", {
                          type: "checkbox",
                          checked: i.selected,
                          onChange: (c) => b("organizer-batch-select", i.id)
                        }, null, 40, Na),
                        t[76] || (t[76] = e("span", null, "✓", -1))
                      ])) : y("", !0),
                      e("a", {
                        class: "fo-cover-link",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: C((c) => b("organizer-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, Ga)
                      ], 8, qa),
                      e("span", Oa, "▣ " + l(i.playCount), 1),
                      e("span", Ha, l(i.duration), 1)
                    ]),
                    e("div", ja, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: C((c) => b("organizer-play-video", i), ["prevent"])
                      }, l(i.title), 9, Wa),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": P.value === i.id,
                        onClick: C((c) => Ne(i.id), ["stop"])
                      }, "⋮", 8, Ya),
                      P.value === i.id ? (o(), s("div", Ka, [
                        i.writable ? (o(), s("button", {
                          key: 0,
                          type: "button",
                          class: "danger",
                          onClick: (c) => Qe(i.id, "delete")
                        }, "取消收藏", 8, Xa)) : y("", !0),
                        i.writable ? (o(), s("button", {
                          key: 1,
                          type: "button",
                          onClick: (c) => Qe(i.id, "move")
                        }, "移动到", 8, Qa)) : y("", !0),
                        e("button", {
                          type: "button",
                          onClick: (c) => Qe(i.id, "subtitle")
                        }, "字幕", 8, Ja)
                      ])) : y("", !0)
                    ]),
                    e("div", Za, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: C((c) => N(c, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, l(i.author), 9, er),
                      e("span", null, "收藏于 " + l(i.favoriteDate), 1)
                    ])
                  ], 42, Va))), 128))
                ]),
                r.value.totalPages > 1 ? (o(), s("div", tr, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: r.value.page <= 1,
                    onClick: t[19] || (t[19] = (i) => b("organizer-page", r.value.page - 1))
                  }, "‹ 上一页", 8, ir),
                  e("span", or, l(r.value.page) + " / " + l(r.value.totalPages), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: r.value.page >= r.value.totalPages,
                    onClick: t[20] || (t[20] = (i) => b("organizer-page", r.value.page + 1))
                  }, "下一页 ›", 8, sr)
                ])) : y("", !0)
              ], 64))
            ])) : r.value.mode === "cache" ? (o(), s("section", nr, [
              e("header", lr, [
                e("div", ar, [
                  t[78] || (t[78] = e("div", { class: "fo-bili-cover" }, "💾", -1)),
                  e("div", rr, [
                    t[77] || (t[77] = e("h3", null, "缓存视频", -1)),
                    e("p", null, l(r.value.cachedVideos.length) + " 个缓存记录 · 存放目录可在设置中选择", 1)
                  ])
                ]),
                e("div", dr, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    onClick: t[21] || (t[21] = (i) => b("organizer-open"))
                  }, "返回收藏夹"),
                  e("button", {
                    type: "button",
                    onClick: t[22] || (t[22] = (i) => b("cache-open-settings"))
                  }, "缓存设置")
                ])
              ]),
              r.value.cacheLoading ? (o(), s("div", ur, [...t[79] || (t[79] = [
                e("i", null, null, -1),
                e("span", null, "正在读取本地缓存…", -1)
              ])])) : (o(), s("div", cr, [
                r.value.cachedVideos.length ? y("", !0) : (o(), s("p", pr, "还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。")),
                (o(!0), s(V, null, j(r.value.cachedVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card fo-cached-video-card"
                }, [
                  e("div", br, [
                    e("button", {
                      class: "fo-cached-play",
                      type: "button",
                      onClick: (c) => b("cache-play", i.id)
                    }, [
                      e("img", {
                        loading: "lazy",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, fr),
                      t[80] || (t[80] = e("span", { class: "fo-cached-local-badge" }, "LOCAL", -1))
                    ], 8, vr)
                  ]),
                  e("div", gr, [
                    e("button", {
                      class: "fo-title-link fo-bili-title fo-cached-title",
                      type: "button",
                      onClick: (c) => b("cache-play", i.id)
                    }, l(i.title), 9, mr),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "删除缓存",
                      onClick: (c) => b("cache-delete", i.id)
                    }, "×", 8, hr)
                  ]),
                  e("div", yr, [
                    e("span", null, l(i.sizeText), 1),
                    e("span", null, "缓存于 " + l(i.cachedDate), 1)
                  ])
                ]))), 128))
              ]))
            ])) : r.value.mode === "recommendations" ? (o(), s("section", _r, [
              e("header", kr, [
                t[81] || (t[81] = e("div", { class: "fo-bili-cover fo-vue-recommend-cover" }, [
                  e("span", null, "✨")
                ], -1)),
                e("div", $r, [
                  e("div", wr, [
                    e("h3", null, l(r.value.specialTitle), 1),
                    e("span", Cr, l(r.value.specialBadge), 1)
                  ]),
                  e("p", null, l(r.value.specialSubtitle), 1)
                ]),
                e("div", xr, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !r.value.specialVideos.length,
                    onClick: t[23] || (t[23] = (i) => b("special-play-page"))
                  }, "▶ 播放本页", 8, Sr),
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
              e("div", Tr, [
                t[82] || (t[82] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "🔥 猜你喜欢与热门精选")
                ], -1)),
                e("div", Mr, "本页共 " + l(r.value.specialVideos.length) + " 个视频", 1)
              ]),
              r.value.specialLoading ? (o(), s("div", Dr, [...t[83] || (t[83] = [
                e("i", null, null, -1),
                e("span", null, "正在加载个性化推荐视频…", -1)
              ])])) : r.value.specialError ? (o(), s("p", Pr, l(r.value.specialError), 1)) : (o(), s("div", zr, [
                r.value.specialVideos.length ? y("", !0) : (o(), s("p", Ir, "暂无推荐视频。")),
                (o(!0), s(V, null, j(r.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (c) => Je(c, i)
                }, [
                  e("div", Rr, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: C((c) => b("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                        alt: ""
                      }, null, 8, Er)
                    ], 8, Lr),
                    e("span", Ar, "▣ " + l(i.playCount), 1),
                    e("span", Vr, l(i.duration), 1)
                  ]),
                  e("div", Ur, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: C((c) => b("special-play-video", i), ["prevent"])
                    }, l(i.title), 9, Fr),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": P.value === i.id,
                      onClick: C((c) => Ne(i.id), ["stop"])
                    }, "⋮", 8, Nr),
                    P.value === i.id ? (o(), s("div", qr, [
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { video: i, id: i.id, action: "collect-inbox" }), P.value = "";
                        }
                      }, "📥 添加到收集箱", 8, Gr),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { id: i.id, action: "play" }), P.value = "";
                        }
                      }, "本地播放与评论", 8, Or),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { id: i.id, action: "subtitle" }), P.value = "";
                        }
                      }, "字幕提取", 8, Hr),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { id: i.id, action: "cache" }), P.value = "";
                        }
                      }, "缓存视频", 8, jr),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { id: i.id, action: "open" }), P.value = "";
                        }
                      }, "打开网页", 8, Wr)
                    ])) : y("", !0)
                  ]),
                  e("div", Yr, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: C((c) => N(c, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, l(i.author), 9, Kr),
                    e("span", null, l(i.favoriteDate), 1)
                  ])
                ], 40, Br))), 128))
              ]))
            ])) : r.value.mode === "following" ? (o(), s("section", Xr, [
              e("header", Qr, [
                t[84] || (t[84] = e("div", { class: "fo-bili-cover fo-vue-following-cover" }, [
                  e("span", null, "📺")
                ], -1)),
                e("div", Jr, [
                  e("div", Zr, [
                    e("h3", null, l(r.value.specialTitle), 1),
                    e("span", ed, l(r.value.specialBadge), 1)
                  ]),
                  e("p", null, l(r.value.specialSubtitle), 1)
                ]),
                e("div", td, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !r.value.specialVideos.length,
                    onClick: t[26] || (t[26] = (i) => b("special-play-page"))
                  }, "▶ 播放本页", 8, id),
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
              e("div", od, [
                e("div", sd, [
                  (o(!0), s(V, null, j(r.value.followingGroups, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: L(["fo-up-group-chip", { active: i.active }]),
                    onClick: (c) => b("following-group", i.id)
                  }, [
                    de(l(i.child ? "↳ " : "") + l(i.name) + " ", 1),
                    e("small", ld, l(i.count), 1)
                  ], 10, nd))), 128))
                ]),
                e("div", ad, [
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
              r.value.followingMembers.length ? (o(), s("div", rd, [
                e("div", dd, [
                  e("b", null, l(r.value.specialBadge), 1),
                  e("small", null, "共 " + l(r.value.followingMembers.length) + " 位 UP 主", 1)
                ]),
                e("div", ud, [
                  e("button", {
                    type: "button",
                    class: L(["fo-up-member-chip", { active: !r.value.followingMembers.some((i) => i.active) }]),
                    onClick: t[31] || (t[31] = (i) => b("following-member", ""))
                  }, "全部UP", 2),
                  (o(!0), s(V, null, j(r.value.followingMembers, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: L(["fo-up-member-chip", { active: i.active }]),
                    title: `左键筛选「${i.name}」，右键预览近期投稿`,
                    onClick: (c) => b("following-member", i.id),
                    onContextmenu: C((c) => b("following-preview-member", { id: i.id, clientX: c.clientX, clientY: c.clientY }), ["prevent"])
                  }, [
                    i.face ? (o(), s("img", {
                      key: 0,
                      loading: "lazy",
                      referrerpolicy: "no-referrer",
                      src: i.face,
                      alt: ""
                    }, null, 8, pd)) : y("", !0),
                    e("span", null, l(i.name), 1)
                  ], 42, cd))), 128))
                ]),
                e("button", {
                  type: "button",
                  class: "fo-btn-manage-members",
                  onClick: t[32] || (t[32] = (i) => b("following-manage-groups", "members"))
                }, "＋ 管理成员")
              ])) : y("", !0),
              e("div", bd, [
                t[85] || (t[85] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "⚡ UP 主最新投稿动态")
                ], -1)),
                e("div", vd, "本页共 " + l(r.value.specialVideos.length) + " 个视频", 1)
              ]),
              r.value.specialLoading ? (o(), s("div", fd, [...t[86] || (t[86] = [
                e("i", null, null, -1),
                e("span", null, "正在读取关注 UP 主更新…", -1)
              ])])) : r.value.specialError ? (o(), s("p", gd, l(r.value.specialError), 1)) : (o(), s("div", md, [
                r.value.specialVideos.length ? y("", !0) : (o(), s("p", hd, "暂无最新关注视频动态。")),
                (o(!0), s(V, null, j(r.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (c) => Je(c, i)
                }, [
                  e("div", _d, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: C((c) => b("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, $d)
                    ], 8, kd),
                    e("span", wd, "▣ " + l(i.playCount), 1),
                    e("span", Cd, l(i.duration), 1)
                  ]),
                  e("div", xd, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: C((c) => b("special-play-video", i), ["prevent"])
                    }, l(i.title), 9, Sd),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": P.value === i.id,
                      onClick: C((c) => Ne(i.id), ["stop"])
                    }, "⋮", 8, Td),
                    P.value === i.id ? (o(), s("div", Md, [
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { video: i, id: i.id, action: "play" }), P.value = "";
                        }
                      }, "本地播放与评论", 8, Dd),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { video: i, id: i.id, action: "subtitle" }), P.value = "";
                        }
                      }, "字幕提取", 8, Pd),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { video: i, id: i.id, action: "cache" }), P.value = "";
                        }
                      }, "缓存视频", 8, zd),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { video: i, id: i.id, action: "open" }), P.value = "";
                        }
                      }, "打开网页", 8, Id)
                    ])) : y("", !0)
                  ]),
                  e("div", Bd, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: C((c) => N(c, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, l(i.author), 9, Rd),
                    e("span", null, l(i.favoriteDate), 1)
                  ])
                ], 40, yd))), 128))
              ])),
              e("div", Ld, [
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: r.value.specialLoading || r.value.specialPage <= 1,
                  onClick: t[33] || (t[33] = (i) => b("following-page", r.value.specialPage - 1))
                }, "‹ 上一页", 8, Ed),
                e("span", Ad, "第 " + l(r.value.specialPage) + " 页", 1),
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: r.value.specialLoading || !r.value.followingHasMore,
                  onClick: t[34] || (t[34] = (i) => b("following-page", r.value.specialPage + 1))
                }, "下一页 ›", 8, Vd)
              ])
            ])) : r.value.mode === "subscription" ? (o(), s("section", Ud, [
              e("div", Fd, [
                ye(si, { "show-back": "" }),
                r.value.subscriptionLoading ? (o(), s("div", Nd, [...t[87] || (t[87] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取订阅视频与 AI 字幕稿…", -1)
                ])])) : r.value.subscriptionError ? (o(), s("p", qd, "读取失败：" + l(r.value.subscriptionError), 1)) : (o(), s("div", Gd, [
                  ye(Mo),
                  ye(Ti)
                ]))
              ])
            ])) : r.value.mode === "radio" ? (o(), s("section", Od, [
              e("header", Hd, [
                t[88] || (t[88] = e("div", { class: "fo-hero-left" }, [
                  e("div", { class: "fo-bili-cover fo-vue-radio-cover" }, [
                    e("span", null, "📻")
                  ]),
                  e("div", { class: "fo-hero-folder-info" }, [
                    e("h3", null, "B站电台"),
                    e("p", null, "从左侧选择收藏夹，将视频拖拽或添加到连播队列，自由编排系列随心听")
                  ])
                ], -1)),
                e("div", jd, [
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
              e("div", Wd, [
                e("aside", Yd, [
                  t[89] || (t[89] = e("p", { class: "sw-title" }, "收藏夹", -1)),
                  e("div", Kd, [
                    (o(!0), s(V, null, j(n(D).radioFolders, (i) => (o(), s("button", {
                      key: i.id,
                      type: "button",
                      class: L(["bili-radio-folder", { on: i.id === n(D).radioActiveFolderId }]),
                      onClick: (c) => b("radio-select-folder", i.id)
                    }, [
                      e("span", null, l(i.title), 1),
                      e("span", null, l(i.count), 1)
                    ], 10, Xd))), 128)),
                    n(D).radioFolders.length ? y("", !0) : (o(), s("p", Qd, l(n(D).radioLoading ? "加载中…" : "暂无收藏夹"), 1))
                  ])
                ]),
                e("section", Jd, [
                  t[91] || (t[91] = e("p", {
                    id: "bili-radio-library-title",
                    class: "sw-title"
                  }, "收藏夹视频", -1)),
                  n(D).radioError ? (o(), s("p", Zd, l(n(D).radioError), 1)) : y("", !0),
                  e("div", eu, [
                    (o(!0), s(V, null, j(n(D).radioVideos, (i) => (o(), s("button", {
                      key: i.bvid,
                      type: "button",
                      class: "bili-radio-video",
                      title: `${i.title} (点击加入连播队列，或按住拖拽封面到下方卡带机直接播放)`,
                      draggable: "true",
                      onDragstart: (c) => mt(c, i),
                      onClick: (c) => b("radio-add", { bvid: i.bvid, title: i.title, cover: i.cover, author: i.author, duration: i.duration })
                    }, [
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, iu)) : (o(), s("span", ou)),
                      e("p", null, l(i.title), 1),
                      t[90] || (t[90] = e("span", null, "＋", -1))
                    ], 40, tu))), 128)),
                    n(D).radioVideos.length ? y("", !0) : (o(), s("p", su, l(n(D).radioLoading ? "读取视频中…" : "此收藏夹暂无可播放视频"), 1))
                  ])
                ]),
                e("section", nu, [
                  e("div", lu, [
                    ne(e("input", {
                      id: "bili-radio-name",
                      "onUpdate:modelValue": t[37] || (t[37] = (i) => n(D).radioSeriesName = i),
                      maxlength: "48",
                      class: L({ "has-error": m.value }),
                      placeholder: m.value ? "⚠️ 请在此输入系列名称后再保存！" : "请输入系列名称（必填）",
                      autocomplete: "off",
                      onInput: t[38] || (t[38] = (i) => m.value = !1),
                      onKeydown: ze(C(z, ["prevent"]), ["enter"])
                    }, null, 42, au), [
                      [Se, n(D).radioSeriesName]
                    ]),
                    e("div", ru, [
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
                        onClick: h
                      }, " ✏️ 重命名 "),
                      ye(ct, {
                        id: "bili-radio-share",
                        compact: "",
                        label: "🚀 分享",
                        visible: !0,
                        onSelect: vt
                      })
                    ]),
                    e("div", du, [
                      e("select", {
                        class: "bili-radio-series-select",
                        title: "快速切换已保存的系列",
                        onChange: E
                      }, [
                        e("option", uu, l(n(D).radioSeries.length ? `📚 已保存系列 (${n(D).radioSeries.length})` : "📚 暂无保存系列"), 1),
                        (o(!0), s(V, null, j(n(D).radioSeries, (i) => (o(), s("option", {
                          key: i.id,
                          value: i.id
                        }, l(i.name) + " (" + l(i.count) + "首) ", 9, cu))), 128)),
                        t[92] || (t[92] = e("option", {
                          value: "__create_new__",
                          class: "bili-radio-create-opt"
                        }, " ＋ 创建系列 ", -1))
                      ], 32)
                    ])
                  ]),
                  e("div", pu, [
                    (o(!0), s(V, null, j(n(D).radioQueue, (i, c) => (o(), s("div", {
                      key: `${i.bvid}-${c}`,
                      class: L(["bili-radio-queue-item", { "is-playing": n(H).active && n(H).trackIndex === c + 1 }]),
                      title: "点击立即从该曲目开始播放",
                      onClick: (A) => b("radio-play-index", c)
                    }, [
                      e("span", vu, l(n(H).active && n(H).trackIndex === c + 1 ? "♪" : c + 1), 1),
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, fu)) : (o(), s("span", gu)),
                      e("p", null, l(i.title), 1),
                      e("button", {
                        type: "button",
                        class: "bili-radio-remove",
                        "aria-label": `移除 ${i.title}`,
                        onClick: C((A) => b("radio-remove", { index: c }), ["stop"])
                      }, "×", 8, mu)
                    ], 10, bu))), 128)),
                    n(D).radioQueue.length ? y("", !0) : (o(), s("p", hu, "点击左侧视频加入连播队列。"))
                  ]),
                  e("div", yu, [
                    e("button", {
                      id: "bili-radio-play",
                      type: "button",
                      disabled: !n(D).radioQueue.length,
                      onClick: t[39] || (t[39] = (i) => b("radio-play"))
                    }, "▶ 按顺序播放", 8, _u),
                    e("button", {
                      id: "bili-radio-shuffle",
                      type: "button",
                      disabled: !n(D).radioQueue.length,
                      onClick: t[40] || (t[40] = (i) => b("radio-shuffle"))
                    }, "🔀 随机播放", 8, ku),
                    e("button", {
                      id: "bili-radio-clear",
                      type: "button",
                      onClick: t[41] || (t[41] = (i) => b("radio-clear"))
                    }, "清空编辑区")
                  ])
                ])
              ]),
              n(ge) || n(it).activeId === "daily-bilibili" ? y("", !0) : (o(), rt(pt, { key: 0 }))
            ])) : y("", !0)
          ], 34)
        ])
      ]),
      n(ge) || n(it).activeId === "daily-bilibili" ? (o(), rt(pt, {
        key: 0,
        "dock-side": ""
      })) : y("", !0),
      t[104] || (t[104] = e("div", {
        class: "fm-pane",
        id: "pane-sub-video",
        hidden: "",
        style: { display: "none !important" }
      }, null, -1)),
      ye(es),
      ye(on),
      G.value.visible && G.value.video ? (o(), s("div", {
        key: 1,
        ref_key: "videoMenuRef",
        ref: ae,
        class: "fo-context-menu",
        role: "menu",
        style: Te(n(W)),
        onClick: t[50] || (t[50] = C(() => {
        }, ["stop"]))
      }, [
        e("div", {
          class: "fo-context-header",
          title: G.value.video.title
        }, l(G.value.video.title), 9, $u),
        ye(ct, {
          label: "💬 发送到聊天室",
          "match-menu-item": "",
          visible: G.value.visible,
          onSelect: ft
        }, null, 8, ["visible"]),
        t[101] || (t[101] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[42] || (t[42] = (i) => Pe("play"))
        }, [...t[93] || (t[93] = [
          e("span", { class: "fo-context-icon" }, "▶", -1),
          de(" 小窗播放视频 ", -1)
        ])]),
        t[102] || (t[102] = e("div", { class: "fo-context-divider" }, null, -1)),
        G.value.video.writable ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "fo-context-item danger",
          onClick: t[43] || (t[43] = (i) => Pe("delete"))
        }, [...t[94] || (t[94] = [
          e("span", { class: "fo-context-icon" }, "🗑", -1),
          de(" 取消收藏 ", -1)
        ])])) : y("", !0),
        G.value.video.writable ? (o(), s("button", {
          key: 1,
          type: "button",
          class: "fo-context-item",
          onClick: t[44] || (t[44] = (i) => Pe("move"))
        }, [...t[95] || (t[95] = [
          e("span", { class: "fo-context-icon" }, "📁", -1),
          de(" 移动到… ", -1)
        ])])) : y("", !0),
        G.value.video.writable ? (o(), s("div", wu)) : y("", !0),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[45] || (t[45] = (i) => Pe("open"))
        }, [...t[96] || (t[96] = [
          e("span", { class: "fo-context-icon" }, "↗", -1),
          de(" 跳转到 B站 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[46] || (t[46] = (i) => Pe("copy-link"))
        }, [...t[97] || (t[97] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          de(" 复制链接 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[47] || (t[47] = (i) => Pe("cache"))
        }, [...t[98] || (t[98] = [
          e("span", { class: "fo-context-icon" }, "💾", -1),
          de(" 缓存视频 ", -1)
        ])]),
        t[103] || (t[103] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[48] || (t[48] = (i) => Pe("create-task"))
        }, [...t[99] || (t[99] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          de(" 创建任务 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[49] || (t[49] = (i) => Pe("subtitle"))
        }, [...t[100] || (t[100] = [
          e("span", { class: "fo-context-icon" }, "▤", -1),
          de(" 字幕转文本 ", -1)
        ])])
      ], 4)) : y("", !0)
    ], 2));
  }
}), Vu = /* @__PURE__ */ Ue(Cu, [["__scopeId", "data-v-c8582daa"]]);
export {
  Vu as default
};
