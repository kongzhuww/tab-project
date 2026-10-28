import { d as ze, o, e as s, f as e, t as a, u, B, m as ae, F as L, h as O, g as y, D as pe, i as w, s as oe, x as ge, C as Ye, y as ut, l as ie, n as he, k as Pe, b as x, G as Ze, S as it, A as _e, v as mt, z as et, H as yt, L as ht, c as ot } from "./vendor-vue-DokqDua_.js";
import { c as D, b as Re, a as Y, r as De, s as _t } from "./bili-favorites-store-CkNb4gnf.js";
import { c as st, n as He, z as ce, d as We, r as Qe, B as lt } from "./view-styles-DcR4NtZM.js";
import "./fullscreen-cards.store-CXMJQ6Tw.js";
import { u as kt } from "./useCardActivity-9qYlsnOY.js";
import { _ as Le } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { B as je } from "./BiliRichText-BE-gFgV_.js";
import { d as $t, a as wt } from "./playback-sync-Bcl1ni5V.js";
import { a as se, d as Je, e as v, c as ne } from "./up-group-manager-store-rFzr_kwg.js";
import { biliMessagePanelController as Ct, biliMessagePanelState as nt } from "./message-panel-store-BqZMioyM.js";
import { bilibiliChannelService as Ie } from "./bilibili-channel.service-DIZXixUv.js";
import { u as xt } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-ChQUbu-A.js";
import { C as at } from "./ChatShareMenu-Cn5eg959.js";
const St = { class: "bili-sub-header bili-sub-vue-header" }, Tt = { class: "bili-sub-channel-info" }, Mt = { class: "bili-sub-vue-title-row" }, Dt = { class: "bili-sub-title" }, Pt = { class: "bili-sub-desc" }, zt = { class: "bili-sub-actions" }, Bt = { class: "bili-sub-mode-icon" }, It = { class: "bili-sub-mode-text" }, Rt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, Lt = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, At = { class: "bili-sub-dropdown-panel" }, Et = { class: "bili-sub-dropdown-list" }, Ut = ["onClick"], Vt = { class: "bili-sub-item-text" }, Ft = {
  key: 0,
  class: "bili-sub-item-check"
}, Nt = { class: "bili-sub-dropdown-foot" }, qt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, Gt = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, Ot = { class: "bili-sub-dropdown-panel bili-sub-video-dropdown-panel" }, Ht = { class: "bili-sub-dropdown-title" }, Wt = { class: "bili-sub-dropdown-list" }, jt = ["title", "onClick"], Yt = { class: "bili-sub-video-num" }, Xt = { class: "bili-sub-item-text" }, Kt = {
  key: 0,
  class: "bili-sub-video-duration"
}, Qt = { class: "bili-sub-dropdown-foot" }, Jt = ["disabled"], Zt = /* @__PURE__ */ ze({
  __name: "BiliSubscriptionHeader",
  props: {
    showBack: { type: Boolean }
  },
  setup(ke) {
    function g(T, m) {
      Re.dispatch(T, m);
    }
    return (T, m) => (o(), s("header", St, [
      e("div", Tt, [
        m[6] || (m[6] = e("img", {
          class: "bili-sub-avatar",
          src: "assets/bilibili.svg",
          alt: ""
        }, null, -1)),
        e("div", null, [
          e("div", Mt, [
            e("h3", Dt, a(u(D).organizer.subscriptionTitle), 1)
          ]),
          e("p", Pt, a(u(D).organizer.subscriptionSubtitle), 1)
        ])
      ]),
      e("div", zt, [
        e("button", {
          type: "button",
          class: B(["bili-sub-head-btn bili-sub-script-mode-btn", { "is-newspaper": u(D).organizer.subscriptionScriptMode === "newspaper" }]),
          onClick: m[0] || (m[0] = (P) => g("subscription-script-mode"))
        }, [
          e("span", Bt, a(u(D).organizer.subscriptionScriptMode === "newspaper" ? "📰" : "📜"), 1),
          e("span", It, a(u(D).organizer.subscriptionScriptMode === "newspaper" ? "报纸模式" : "滚动台词"), 1)
        ], 2),
        e("details", Rt, [
          e("summary", Lt, [
            e("span", null, [
              m[7] || (m[7] = ae("关注 UP 主：", -1)),
              e("b", null, a(u(D).organizer.subscriptionTitle), 1)
            ]),
            m[8] || (m[8] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", At, [
            m[10] || (m[10] = e("div", { class: "bili-sub-dropdown-title" }, "已关注的 UP 主", -1)),
            e("div", Et, [
              (o(!0), s(L, null, O(u(D).organizer.subscriptionChannels, (P) => (o(), s("button", {
                key: P.id,
                type: "button",
                class: B(["bili-sub-dropdown-item", { active: P.active }]),
                onClick: (V) => g("subscription-channel", P.id)
              }, [
                m[9] || (m[9] = e("span", { class: "bili-sub-dot" }, null, -1)),
                e("span", Vt, a(P.name), 1),
                P.active ? (o(), s("span", Ft, "✓")) : y("", !0)
              ], 10, Ut))), 128))
            ]),
            e("div", Nt, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                onClick: m[1] || (m[1] = (P) => g("subscription-add-channel"))
              }, "＋ UP 主")
            ])
          ])
        ]),
        e("details", qt, [
          e("summary", Gt, [
            e("span", null, [
              m[11] || (m[11] = ae("视频 ", -1)),
              e("b", null, "(" + a(u(D).organizer.subscriptionVideos.length) + ")", 1)
            ]),
            m[12] || (m[12] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", Ot, [
            e("div", Ht, "最近投稿视频 (" + a(u(D).organizer.subscriptionVideos.length) + ")", 1),
            e("div", Wt, [
              (o(!0), s(L, null, O(u(D).organizer.subscriptionVideos, (P, V) => (o(), s("button", {
                key: P.bvid,
                type: "button",
                class: B(["bili-sub-dropdown-item bili-sub-video-item", { active: P.active }]),
                title: P.title,
                onClick: (C) => g("subscription-video", P.bvid)
              }, [
                e("span", Yt, a(V + 1) + ".", 1),
                e("span", Xt, a(P.title), 1),
                P.duration ? (o(), s("small", Kt, a(P.duration), 1)) : y("", !0)
              ], 10, jt))), 128))
            ]),
            e("div", Qt, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                disabled: u(D).organizer.subscriptionLoading,
                onClick: m[2] || (m[2] = (P) => g("subscription-load-more"))
              }, "继续获取", 8, Jt)
            ])
          ])
        ]),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: m[3] || (m[3] = (P) => g(u(D).organizer.showFullDescInRightPanel ? "subscription-copy-description" : "subscription-copy-script"))
        }, a(u(D).organizer.showFullDescInRightPanel ? "复制简介" : "复制稿子"), 1),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: m[4] || (m[4] = (P) => g("subscription-refresh"))
        }, "↻ 刷新"),
        ke.showBack ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "bili-sub-head-btn",
          onClick: m[5] || (m[5] = (P) => g("organizer-open"))
        }, "← 返回收藏夹")) : y("", !0)
      ])
    ]));
  }
}), ei = /* @__PURE__ */ Le(Zt, [["__scopeId", "data-v-0dfef976"]]), ti = { class: "bili-sub-transcript-column bili-sub-vue-transcript-column" }, ii = { class: "bili-sub-article-wrap" }, oi = { class: "bili-sub-transcript-body" }, si = {
  key: 0,
  class: "bili-sub-description-copy",
  title: "当前为放大简介视图"
}, li = {
  key: 0,
  class: "muted"
}, ni = {
  key: 0,
  class: "bili-sub-newspaper-list"
}, ai = ["data-idx", "data-from", "data-to", "title", "onClick"], ri = { class: "bili-sub-newspaper-header" }, ui = { class: "bili-sub-newspaper-num" }, di = { class: "bili-sub-newspaper-heading" }, ci = { class: "bili-sub-newspaper-title" }, pi = { class: "bili-sub-newspaper-time" }, bi = ["onClick"], vi = { class: "bili-sub-newspaper-content" }, fi = ["data-from", "data-to", "title", "onClick"], gi = {
  key: 1,
  class: "bili-sub-srt-list"
}, mi = ["data-idx", "data-from", "data-to", "title", "onClick"], yi = { class: "bili-sub-srt-time" }, hi = { class: "bili-sub-srt-text" }, _i = {
  key: 2,
  class: "bili-sub-no-transcript-box"
}, ki = {
  key: 2,
  class: "bili-sub-vue-empty-hint"
}, $i = /* @__PURE__ */ ze({
  __name: "BiliSubscriptionTranscript",
  setup(ke) {
    const g = oe(() => D.organizer), T = oe(() => g.value.subscriptionChapters.length > 0 || g.value.subscriptionCues.length > 0);
    function m(P, V) {
      Re.dispatch(P, V);
    }
    return (P, V) => (o(), s("section", ti, [
      e("article", ii, [
        e("div", oi, [
          g.value.showFullDescInRightPanel ? (o(), s("section", si, [
            e("header", null, [
              V[1] || (V[1] = e("h5", null, "视频简介", -1)),
              e("button", {
                type: "button",
                class: "bili-copy-desc-btn",
                title: "切回台词展示",
                onClick: V[0] || (V[0] = (C) => m("subscription-toggle-desc-panel"))
              }, "缩小简介")
            ]),
            (o(!0), s(L, null, O(g.value.subscriptionDescription, (C, I) => (o(), s("p", { key: I }, [
              pe(je, { text: C }, null, 8, ["text"])
            ]))), 128)),
            g.value.subscriptionDescription.length ? y("", !0) : (o(), s("p", li, "该视频暂无可用的文字简介。"))
          ])) : (o(), s(L, { key: 1 }, [
            g.value.subscriptionScriptMode === "newspaper" && g.value.subscriptionChapters.length ? (o(), s("div", ni, [
              (o(!0), s(L, null, O(g.value.subscriptionChapters, (C, I) => (o(), s("article", {
                key: `${C.from}:${I}`,
                class: "bili-sub-newspaper-section",
                "data-idx": I,
                "data-from": C.from,
                "data-to": C.to,
                title: `点击跳转至 ${C.fromText} 播放`,
                onClick: (l) => m("subscription-seek", { from: C.from, index: I, mode: "newspaper" })
              }, [
                e("header", ri, [
                  e("span", ui, a(String(I + 1).padStart(2, "0")), 1),
                  e("div", di, [
                    e("h4", ci, a(C.title), 1),
                    e("span", pi, "⏱ " + a(C.fromText) + " - " + a(C.toText), 1)
                  ]),
                  e("button", {
                    type: "button",
                    class: "bili-sub-newspaper-play-btn",
                    "aria-label": "从头播放此分段",
                    onClick: w((l) => m("subscription-seek", { from: C.from, index: I, mode: "newspaper" }), ["stop"])
                  }, "▶", 8, bi)
                ]),
                e("div", vi, [
                  C.paragraphCues && C.paragraphCues.length ? (o(!0), s(L, { key: 0 }, O(C.paragraphCues, (l, $) => (o(), s("p", {
                    key: $,
                    class: "bili-sub-newspaper-p"
                  }, [
                    (o(!0), s(L, null, O(l, (A, S) => (o(), s("span", {
                      key: `${A.from}:${S}`,
                      class: "bili-sub-newspaper-cue",
                      "data-from": A.from,
                      "data-to": A.to,
                      title: `点击跳转播放此句 (⏱ ${A.timeText || A.from + "s"})`,
                      onClick: w((N) => m("subscription-seek", { from: A.from, mode: "newspaper" }), ["stop"])
                    }, a(A.content), 9, fi))), 128))
                  ]))), 128)) : (o(!0), s(L, { key: 1 }, O(C.paragraphs, (l, $) => (o(), s("p", {
                    key: $,
                    class: "bili-sub-newspaper-p"
                  }, a(l), 1))), 128))
                ])
              ], 8, ai))), 128))
            ])) : g.value.subscriptionCues.length ? (o(), s("div", gi, [
              (o(!0), s(L, null, O(g.value.subscriptionCues, (C) => (o(), s("button", {
                key: `${C.from}:${C.index}`,
                type: "button",
                class: "bili-sub-srt-row",
                "data-idx": C.index,
                "data-from": C.from,
                "data-to": C.to,
                title: `点击跳转至 ${C.timeText}`,
                onClick: (I) => m("subscription-seek", { from: C.from, index: C.index, mode: "lyrics" })
              }, [
                e("span", yi, a(C.timeText), 1),
                e("span", hi, a(C.content), 1)
              ], 8, mi))), 128))
            ])) : (o(), s("div", _i, [...V[2] || (V[2] = [
              e("div", { class: "bili-sub-no-transcript-icon" }, "🎙️", -1),
              e("h5", null, "暂无实时台词字幕", -1),
              e("p", { class: "muted" }, "当前视频暂无可用字幕稿。如需阅读完整文案，请点击左侧视频标题旁的“放大简介”。", -1)
            ])]))
          ], 64)),
          !g.value.showFullDescInRightPanel && !T.value && !g.value.subscriptionDescription.length ? (o(), s("p", ki, "字幕不可用时仍可在左侧播放和查看评论。")) : y("", !0)
        ])
      ])
    ]));
  }
}), wi = /* @__PURE__ */ Le($i, [["__scopeId", "data-v-2f4df941"]]), Ci = { class: "bili-sub-player-column" }, xi = {
  key: 0,
  class: "bili-sub-sticky-player"
}, Si = { class: "bili-sub-player-card" }, Ti = { class: "bili-sub-video-box" }, Mi = ["poster", "hidden"], Di = ["src"], Pi = {
  key: 1,
  class: "bili-sub-video-loading"
}, zi = { class: "bili-sub-video-meta" }, Bi = { class: "bili-sub-video-meta-actions" }, Ii = ["title"], Ri = { class: "bili-sub-meta-stats" }, Li = { class: "bili-sub-meta-desc" }, Ai = {
  class: "bili-sub-comments-section",
  id: "bili-sub-comments-section"
}, Ei = { class: "bili-mini-comments-head" }, Ui = { class: "bili-mini-comments-meta" }, Vi = { class: "bili-mini-comments-count bili-sub-comments-count" }, Fi = { class: "bili-mini-comments-sort" }, Ni = { class: "bili-sub-comment-composer" }, qi = ["onKeydown"], Gi = ["disabled"], Oi = {
  key: 0,
  class: "bili-sub-emote-picker"
}, Hi = {
  key: 0,
  class: "fo-bili-loading"
}, Wi = { key: 1 }, ji = ["title", "onClick"], Yi = ["src", "alt"], Xi = { key: 1 }, Ki = { class: "bili-mini-comments-body bili-sub-comments-body" }, Qi = {
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
}, so = { class: "bili-comment-time" }, lo = { class: "bili-comment-text" }, no = {
  key: 0,
  class: "bili-comment-pictures"
}, ao = ["href", "onClick"], ro = ["src"], uo = { class: "bili-comment-actions" }, co = { key: 0 }, po = { key: 1 }, bo = {
  key: 1,
  class: "bili-comment-sub-list"
}, vo = { class: "bili-comment-sub-uname" }, fo = { class: "bili-comment-sub-more" }, go = ["disabled", "onClick"], mo = ["disabled", "onClick"], yo = ["onClick"], ho = { class: "bili-sub-comments-infinite-trigger" }, _o = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0" }
}, ko = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0", opacity: "0.6" }
}, $o = {
  key: 1,
  class: "fo-bili-empty"
}, wo = /* @__PURE__ */ ze({
  __name: "BiliSubscriptionPlayer",
  setup(ke) {
    const g = oe(() => D.organizer.subscriptionCurrent), T = x(null), m = x(!1), P = x(!1), V = x(""), C = x(""), I = x(1), l = x(1), $ = x([]), A = x("0 条"), S = x(!1), N = x(!1), F = x(""), G = x(!1), j = x(""), be = x(null), X = x(!1), ve = x(""), fe = x(!1), te = x(!1), R = x(!1), r = x([]);
    let q = null, H = null;
    function K(_, f = !1) {
      ve.value = _, fe.value = f, q && clearTimeout(q), q = setTimeout(() => {
        ve.value = "";
      }, 3500);
    }
    function Z() {
      Re.dispatch("subscription-open-player");
    }
    function $e() {
      Re.dispatch("subscription-toggle-desc-panel");
    }
    function Ae(_) {
      const f = _.currentTarget;
      f && f.scrollHeight - f.scrollTop - f.clientHeight < 180 && !N.value && G.value && Q();
    }
    function Ee(_, f) {
      const p = _[f];
      p && window.open(p, "_blank", "noopener,noreferrer");
    }
    function Ue(_, f) {
      if (!_) return [];
      if (!f || f.size === 0)
        return [{ type: "text", text: _ }];
      const p = /\[([^\]]+)\]/g, k = [];
      let U = 0, E;
      for (; (E = p.exec(_)) !== null; ) {
        E.index > U && k.push({ type: "text", text: _.slice(U, E.index) });
        const W = E[0], ee = f.get(W);
        ee ? k.push({ type: "emote", text: W, url: ee }) : k.push({ type: "text", text: W }), U = p.lastIndex;
      }
      return U < _.length && k.push({ type: "text", text: _.slice(U) }), k;
    }
    function Ce(_) {
      if (!_) return "";
      const f = new Date(_ * 1e3), p = /* @__PURE__ */ new Date(), k = Math.floor((p.getTime() - f.getTime()) / 1e3);
      if (k < 60) return "刚刚";
      if (k < 3600) return `${Math.floor(k / 60)} 分钟前`;
      if (k < 86400) return `${Math.floor(k / 3600)} 小时前`;
      const U = f.getFullYear(), E = String(f.getMonth() + 1).padStart(2, "0"), W = String(f.getDate()).padStart(2, "0");
      return U === p.getFullYear() ? `${E}-${W}` : `${U}-${E}-${W}`;
    }
    function Ve(_) {
      return _ ? _ >= 1e4 ? (_ / 1e4).toFixed(1).replace(/\.0$/, "") + "万" : String(_) : "0";
    }
    async function h(_ = !1) {
      if (C.value) {
        _ ? N.value = !0 : (S.value = !0, F.value = "");
        try {
          const f = `https://api.bilibili.com/x/v2/reply?type=1&oid=${C.value}&pn=${l.value}&ps=20&sort=${I.value}`, k = await (await fetch(f, { credentials: "include" })).json();
          if (k?.code !== 0 || !k?.data) {
            _ || (F.value = k?.message || "评论加载失败或该视频已关闭评论", $.value = []), G.value = !1;
            return;
          }
          const U = k.data, E = U.page?.count || 0;
          A.value = `${Ve(E)} 条`;
          const ee = (Array.isArray(U.replies) ? U.replies : []).map((J) => {
            const Ne = /* @__PURE__ */ new Map();
            J.content?.emote && Object.entries(J.content.emote).forEach(([ue, ye]) => {
              ye?.url && Ne.set(ue, String(ye.url).replace(/^http:/, "https:"));
            });
            const Be = String(J.content?.message || ""), qe = Array.isArray(J.content?.pictures) ? J.content.pictures.map((ue) => String(ue?.img_src || ue).replace(/^http:/, "https:")).filter(Boolean) : [], Oe = Array.isArray(J.replies) ? J.replies.map((ue) => ({
              id: ue.rpid || Math.random(),
              userName: ue.member?.uname || "B站用户",
              message: String(ue.content?.message || "")
            })) : [];
            return {
              id: J.rpid || Math.random(),
              userName: J.member?.uname || "B站用户",
              avatar: String(J.member?.avatar || "").replace(/^http:/, "https:"),
              level: Number(J.member?.level_info?.current_level || 0),
              message: Be,
              tokens: Ue(Be, Ne),
              timeStr: Ce(J.ctime),
              likeCount: Number(J.like || 0),
              replyCount: Number(J.rcount || 0),
              pictures: qe,
              replies: Oe
            };
          });
          _ ? $.value = [...$.value, ...ee] : $.value = ee, G.value = $.value.length < E;
        } catch (f) {
          _ || (F.value = f?.message || "网络异常，未能加载评论");
        } finally {
          S.value = !1, N.value = !1;
        }
      }
    }
    async function d(_) {
      const f = $.value.find((p) => String(p.id) === String(_));
      if (!(!f || f.subRepliesLoading || !C.value)) {
        f.subRepliesPage ? f.subRepliesPage++ : f.subRepliesPage = 1, f.subRepliesLoading = !0, f.subRepliesExpanded = !0;
        try {
          const p = await st.getSubReplies(C.value, _, f.subRepliesPage, 10), k = (p.replies || []).map((W) => ({
            id: String(W.rpid),
            userName: W.uname,
            message: W.message
          })), U = new Set((f.replies || []).map((W) => String(W.id))), E = k.filter((W) => !U.has(String(W.id)));
          f.replies = [...f.replies || [], ...E], f.subRepliesHasMore = p.hasMore;
        } catch {
          K("子回复加载失败", !0);
        } finally {
          f.subRepliesLoading = !1;
        }
      }
    }
    function b(_) {
      const f = $.value.find((p) => String(p.id) === String(_));
      f && (f.subRepliesExpanded = !1);
    }
    function M(_) {
      I.value !== _ && (I.value = _, l.value = 1, h(!1));
    }
    function Q() {
      N.value || !G.value || (l.value += 1, h(!0));
    }
    async function re() {
      if (te.value = !te.value, te.value && !r.value.length && !R.value) {
        R.value = !0;
        try {
          const f = await (await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", { credentials: "include" })).json();
          f?.code === 0 && Array.isArray(f?.data?.packages) && (r.value = f.data.packages.filter((p) => Array.isArray(p.emote) && p.emote.length).map((p) => ({
            text: p.text || "B站表情",
            emote: p.emote.map((k) => ({
              text: k.text || "",
              url: String(k.url || "").replace(/^http:/, "https:")
            }))
          })));
        } catch {
        } finally {
          R.value = !1;
        }
      }
    }
    function me(_) {
      const f = be.value;
      if (!f)
        j.value += _;
      else {
        const p = f.selectionStart ?? f.value.length, k = f.selectionEnd ?? p;
        j.value = j.value.slice(0, p) + _ + j.value.slice(k), Ze(() => {
          f.focus();
          const U = p + _.length;
          f.setSelectionRange(U, U);
        });
      }
      te.value = !1;
    }
    async function we() {
      const _ = j.value.trim();
      if (!_) {
        K("请输入评论内容", !0);
        return;
      }
      if (!C.value) {
        K("未能识别视频 ID，无法发表评论", !0);
        return;
      }
      const f = window.getBiliJct;
      let p = "";
      if (typeof f == "function")
        p = await f();
      else
        try {
          p = (await window.chrome?.cookies?.get?.({ url: "https://api.bilibili.com", name: "bili_jct" }))?.value || "";
        } catch {
          p = "";
        }
      if (!p) {
        K("未检测到 B站 登录态，请先登录 bilibili.com", !0);
        return;
      }
      X.value = !0;
      try {
        const k = new URLSearchParams({
          oid: String(C.value),
          type: "1",
          message: _,
          plat: "1",
          csrf: p,
          csrf_token: p
        }), E = await (await fetch("https://api.bilibili.com/x/v2/reply/add", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: k.toString()
        })).json();
        E?.code === 0 ? (j.value = "", K("✓ 评论发表成功！", !1), l.value = 1, h(!1)) : K(`❌ 发送失败：${E?.message || E?.code}`, !0);
      } catch (k) {
        K(`❌ 发送出错：${k?.message || "网络异常"}`, !0);
      } finally {
        X.value = !1;
      }
    }
    async function xe(_) {
      if (!_?.bvid) return;
      if (typeof document < "u" && (document.querySelectorAll("video, audio").forEach((p) => {
        if (p !== T.value && !p.paused)
          try {
            p.pause();
          } catch {
          }
      }), document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((p) => {
        try {
          p.pause();
        } catch {
        }
      })), T.value && !T.value.paused)
        try {
          T.value.pause();
        } catch {
        }
      m.value = !0, P.value = !1, V.value = "";
      let f = _.aid;
      if (!f)
        try {
          const k = await (await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${_.bvid}`, { credentials: "include" })).json();
          k?.data?.aid && (f = k.data.aid);
        } catch {
        }
      C.value = f || "", l.value = 1, h(!1);
      try {
        const p = await st.resolvePlayStream(_);
        if (p?.sources?.length) {
          T.value && (typeof document < "u" && document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((k) => {
            try {
              k.pause();
            } catch {
            }
          }), T.value.src = p.sources[0], T.value.play().catch(() => {
          }), wt({ bvid: _.bvid, title: _.title, cover: _.cover }, T.value)), m.value = !1;
          return;
        }
      } catch (p) {
        console.warn("[BiliSubscriptionPlayer] 本地视频流解析失败，使用 iframe 备用:", p);
      }
      P.value = !0, V.value = `https://player.bilibili.com/player.html?bvid=${_.bvid}&autoplay=1&danmaku=0`, m.value = !1;
    }
    let le = null, Se = null;
    function Te(_) {
      const f = _.closest(".bili-sub-transcript-body") || _.closest(".bili-sub-article-wrap") || _.parentElement;
      if (!f) return;
      const p = f.getBoundingClientRect(), E = _.getBoundingClientRect().top - p.top + f.scrollTop - p.height * 0.36;
      f.scrollTo({
        top: Math.max(0, E),
        behavior: "smooth"
      });
    }
    function Me() {
      if (!T.value) return;
      const _ = T.value.currentTime;
      if (document.querySelectorAll(".bili-sub-newspaper-section").forEach((k) => {
        const U = Number(k.getAttribute("data-from") || 0), E = Number(k.getAttribute("data-to") || 0), W = _ >= U && (E <= 0 || _ < E);
        k.classList.toggle("active", W);
      }), D.organizer.subscriptionScriptMode === "newspaper") {
        const k = document.querySelectorAll(".bili-sub-newspaper-cue");
        if (k.length > 0) {
          let U = null;
          if (k.forEach((E) => {
            const W = Number(E.getAttribute("data-from") || 0), ee = Number(E.getAttribute("data-to") || 0);
            _ >= W && (ee <= 0 || _ < ee) ? (U || (U = E), E.classList.add("cue-reading-active")) : E.classList.remove("cue-reading-active");
          }), !U && _ > 0)
            for (let E = k.length - 1; E >= 0; E--) {
              const W = k[E], ee = Number(W.getAttribute("data-from") || 0);
              if (_ >= ee) {
                U = W, W.classList.add("cue-reading-active");
                break;
              }
            }
          U && U !== le && (le = U, Te(U));
        }
      } else {
        const k = document.querySelectorAll(".bili-sub-srt-row");
        let U = !1, E = null;
        for (let W = k.length - 1; W >= 0; W--) {
          const ee = k[W], J = Number(ee.getAttribute("data-from") || 0);
          !U && _ >= J ? (ee.classList.add("active"), U = !0, E = ee) : ee.classList.remove("active");
        }
        E && E !== Se && (Se = E, Te(E));
      }
    }
    function Fe() {
      Me();
    }
    function Ge() {
      Me();
    }
    return ge(
      () => g.value?.bvid,
      () => {
        g.value && xe(g.value);
      },
      { immediate: !0 }
    ), Ye(() => {
      H = Re.onAction((_, f) => {
        if (_ === "subscription-seek") {
          const p = Number(f?.from);
          T.value && Number.isFinite(p) && (T.value.currentTime = Math.max(0, p - 0.1), T.value.play().catch(() => {
          }));
        }
      });
    }), ut(() => {
      if (T.value) {
        $t(T.value);
        try {
          T.value.pause(), T.value.src = "", T.value.load();
        } catch {
        }
      }
      H && H(), q && clearTimeout(q);
    }), (_, f) => (o(), s("aside", Ci, [
      g.value ? (o(), s("div", xi, [
        e("div", Si, [
          e("div", {
            class: "bili-sub-vue-comment-handoff",
            hidden: "",
            style: { display: "none !important" }
          }, [
            f[3] || (f[3] = e("strong", null, "播放器与评论区已统一到 Vue 本地影院", -1)),
            e("button", {
              type: "button",
              onClick: Z
            }, "打开播放器与评论区")
          ]),
          e("div", Ti, [
            e("video", {
              ref_key: "videoRef",
              ref: T,
              class: "bili-sub-native-video",
              controls: "",
              playsinline: "",
              poster: g.value.cover,
              hidden: P.value,
              onTimeupdate: Me,
              onSeeked: Fe,
              onPlay: Ge
            }, null, 40, Mi),
            P.value ? (o(), s("iframe", {
              key: 0,
              class: "bili-sub-native-iframe",
              allowfullscreen: "true",
              allow: "autoplay; fullscreen",
              src: V.value
            }, null, 8, Di)) : y("", !0),
            m.value ? (o(), s("div", Pi, [...f[4] || (f[4] = [
              e("i", null, null, -1),
              e("span", null, "正在解析登录高清视频流…", -1)
            ])])) : y("", !0)
          ]),
          e("div", {
            class: "bili-sub-scroll-stage",
            onScrollPassive: Ae
          }, [
            e("div", zi, [
              e("div", Bi, [
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: u(D).organizer.showFullDescInRightPanel ? "切回台词展示" : "在右侧大屏展开完整视频简介",
                  onClick: $e
                }, a(u(D).organizer.showFullDescInRightPanel ? "缩小简介" : "放大简介"), 9, Ii)
              ]),
              e("h4", null, a(g.value.title), 1),
              e("div", Ri, [
                e("span", null, "▣ 播放: " + a(g.value.playCount), 1),
                e("span", null, "💬 弹幕: " + a(g.value.danmakuCount), 1),
                e("span", null, "⏱ " + a(g.value.duration), 1)
              ]),
              e("p", Li, [
                pe(je, {
                  text: g.value.description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ]),
            e("div", Ai, [
              e("div", Ei, [
                e("div", Ui, [
                  f[5] || (f[5] = e("span", null, "💬 评论", -1)),
                  e("span", Vi, a(A.value), 1)
                ]),
                e("div", Fi, [
                  e("button", {
                    type: "button",
                    class: B(["bili-mini-sort-btn", { active: I.value === 1 }]),
                    onClick: f[0] || (f[0] = (p) => M(1))
                  }, "按热度", 2),
                  e("button", {
                    type: "button",
                    class: B(["bili-mini-sort-btn", { active: I.value === 0 }]),
                    onClick: f[1] || (f[1] = (p) => M(0))
                  }, "按时间", 2)
                ])
              ]),
              e("div", Ni, [
                e("button", {
                  type: "button",
                  class: B(["bili-sub-emote-button", { on: te.value }]),
                  title: "选择 B站 表情",
                  onClick: re
                }, "☺", 2),
                ie(e("input", {
                  ref_key: "commentInputRef",
                  ref: be,
                  "onUpdate:modelValue": f[2] || (f[2] = (p) => j.value = p),
                  type: "text",
                  class: "bili-sub-comment-input",
                  placeholder: "发一条友善的评论吧…（Enter 发送）",
                  maxlength: "500",
                  onKeydown: Pe(w(we, ["prevent"]), ["enter"])
                }, null, 40, qi), [
                  [he, j.value]
                ]),
                e("button", {
                  type: "button",
                  class: "bili-sub-comment-send-btn",
                  disabled: X.value || !j.value.trim(),
                  onClick: we
                }, a(X.value ? "发送中…" : "发送"), 9, Gi)
              ]),
              te.value ? (o(), s("div", Oi, [
                R.value ? (o(), s("div", Hi, [...f[6] || (f[6] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取 B站 表情包…", -1)
                ])])) : (o(), s("div", Wi, [
                  (o(!0), s(L, null, O(r.value, (p) => (o(), s("section", {
                    key: p.text,
                    class: "bili-sub-emote-group"
                  }, [
                    e("h5", null, a(p.text || "B站表情"), 1),
                    e("div", null, [
                      (o(!0), s(L, null, O(p.emote, (k) => (o(), s("button", {
                        key: k.text,
                        type: "button",
                        class: "bili-sub-emote-item",
                        title: k.text,
                        onClick: (U) => me(k.text)
                      }, [
                        k.url ? (o(), s("img", {
                          key: 0,
                          src: k.url,
                          alt: k.text,
                          referrerpolicy: "no-referrer"
                        }, null, 8, Yi)) : (o(), s("span", Xi, a(k.text), 1))
                      ], 8, ji))), 128))
                    ])
                  ]))), 128))
                ]))
              ])) : y("", !0),
              ve.value ? (o(), s("div", {
                key: 1,
                class: B(["bili-sub-comment-tip", { error: fe.value }])
              }, a(ve.value), 3)) : y("", !0),
              e("div", Ki, [
                S.value && !$.value.length ? (o(), s("p", Qi, "正在加载评论…")) : F.value && !$.value.length ? (o(), s("p", Ji, a(F.value), 1)) : y("", !0),
                (o(!0), s(L, null, O($.value, (p) => (o(), s("div", {
                  key: p.id,
                  class: "bili-comment-item"
                }, [
                  e("img", {
                    class: "bili-comment-avatar",
                    src: p.avatar,
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer"
                  }, null, 8, Zi),
                  e("div", eo, [
                    e("div", to, [
                      e("span", io, a(p.userName), 1),
                      p.level ? (o(), s("span", oo, "LV" + a(p.level), 1)) : y("", !0),
                      e("span", so, a(p.timeStr), 1)
                    ]),
                    e("div", lo, [
                      pe(je, {
                        text: p.message
                      }, null, 8, ["text"])
                    ]),
                    p.pictures?.length ? (o(), s("div", no, [
                      (o(!0), s(L, null, O(p.pictures, (k, U) => (o(), s("a", {
                        key: U,
                        class: "bili-comment-pic-link",
                        href: k,
                        onClick: w((E) => Ee(p.pictures, U), ["stop", "prevent"])
                      }, [
                        e("img", {
                          class: "bili-comment-pic",
                          src: k,
                          alt: "评论图片",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, ro)
                      ], 8, ao))), 128))
                    ])) : y("", !0),
                    e("div", uo, [
                      p.likeCount ? (o(), s("span", co, "👍 " + a(p.likeCount), 1)) : y("", !0),
                      p.replyCount ? (o(), s("span", po, "💬 " + a(p.replyCount), 1)) : y("", !0)
                    ]),
                    p.replies?.length ? (o(), s("div", bo, [
                      (o(!0), s(L, null, O(p.replies, (k) => (o(), s("div", {
                        key: k.id,
                        class: "bili-comment-sub-item"
                      }, [
                        e("span", vo, a(k.userName) + ":", 1),
                        pe(je, {
                          text: k.message
                        }, null, 8, ["text"])
                      ]))), 128)),
                      e("div", fo, [
                        !p.subRepliesExpanded && (p.replyCount || 0) > p.replies.length ? (o(), s(L, { key: 0 }, [
                          e("span", null, "共 " + a(p.replyCount) + " 条回复，", 1),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: p.subRepliesLoading,
                            onClick: w((k) => d(p.id), ["stop"])
                          }, a(p.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, go)
                        ], 64)) : p.subRepliesExpanded ? (o(), s(L, { key: 1 }, [
                          p.subRepliesHasMore ? (o(), s("button", {
                            key: 0,
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: p.subRepliesLoading,
                            onClick: w((k) => d(p.id), ["stop"])
                          }, a(p.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, mo)) : y("", !0),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-collapse-btn",
                            onClick: w((k) => b(p.id), ["stop"])
                          }, " 收起 ▴ ", 8, yo)
                        ], 64)) : y("", !0)
                      ])
                    ])) : y("", !0)
                  ])
                ]))), 128))
              ]),
              e("div", ho, [
                N.value ? (o(), s("p", _o, "正在加载更多评论…")) : !G.value && $.value.length ? (o(), s("p", ko, "已显示全部评论")) : y("", !0)
              ])
            ])
          ], 32)
        ])
      ])) : (o(), s("p", $o, "暂无可播放的订阅视频。"))
    ]));
  }
}), Co = /* @__PURE__ */ Le(wo, [["__scopeId", "data-v-d420748e"]]), xo = ["disabled"], So = ["disabled"], To = { key: 0 }, Mo = ["disabled"], Do = ["disabled"], Po = ["disabled"], zo = ["disabled"], Bo = { class: "bili-sub-add-shell" }, Io = ["disabled"], Ro = { class: "bili-sub-add-toolbar" }, Lo = { class: "bili-sub-add-groups" }, Ao = ["onClick"], Eo = { class: "bili-sub-add-list" }, Uo = {
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
}, Ho = { class: "fo-custom-confirm-head" }, Wo = { class: "fo-custom-confirm-body" }, jo = { class: "fo-custom-confirm-actions" }, Yo = ["disabled"], Xo = ["disabled"], Ko = /* @__PURE__ */ ze({
  __name: "BiliOrganizerDialogs",
  setup(ke) {
    const g = oe(() => Je.create), T = oe(() => Je.confirm), m = oe(() => Je.channelPicker), P = oe(() => g.value.kind === "bili"), V = oe(() => {
      const I = m.value, l = I.query.trim().toLowerCase(), $ = I.groups.find((S) => S.id === I.activeGroupId), A = $ ? new Set($.mids) : null;
      return I.items.filter((S) => (!A || A.has(S.mid)) && (!l || S.name.toLowerCase().includes(l) || S.mid.includes(l)));
    });
    function C() {
      const I = g.value.name.trim();
      if (!I) {
        se.updateCreate({ status: "请输入名称", error: !0 });
        return;
      }
      se.submitCreate({ name: I, privacy: g.value.privacy });
    }
    return (I, l) => (o(), s(L, null, [
      g.value.open ? (o(), s("dialog", {
        key: 0,
        class: "fo-create-dialog",
        open: "",
        onClick: l[5] || (l[5] = w(($) => u(se).closeCreate(), ["self"])),
        onCancel: l[6] || (l[6] = w(($) => u(se).closeCreate(), ["prevent"]))
      }, [
        e("form", {
          onSubmit: w(C, ["prevent"])
        }, [
          e("header", null, [
            e("div", null, [
              l[14] || (l[14] = e("i", { class: "fo-folder-icon" }, null, -1)),
              e("span", null, [
                e("b", null, a(P.value ? "新建 B站收藏夹" : "新建插件分组"), 1),
                e("small", null, a(P.value ? "会同步创建到你的 B站账号" : "只整理左侧收藏夹，不修改 B站数据"), 1)
              ])
            ]),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: g.value.submitting,
              onClick: l[0] || (l[0] = ($) => u(se).closeCreate())
            }, "×", 8, xo)
          ]),
          e("label", null, [
            e("span", null, a(P.value ? "收藏夹名称" : "分组名称"), 1),
            ie(e("input", {
              "onUpdate:modelValue": l[1] || (l[1] = ($) => g.value.name = $),
              maxlength: "48",
              autocomplete: "off",
              placeholder: "输入名称",
              required: "",
              disabled: g.value.submitting,
              autofocus: ""
            }, null, 8, So), [
              [he, g.value.name]
            ])
          ]),
          P.value ? (o(), s("fieldset", To, [
            l[17] || (l[17] = e("legend", null, "可见范围", -1)),
            e("label", null, [
              ie(e("input", {
                "onUpdate:modelValue": l[2] || (l[2] = ($) => g.value.privacy = $),
                type: "radio",
                value: 0,
                disabled: g.value.submitting
              }, null, 8, Mo), [
                [
                  it,
                  g.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              l[15] || (l[15] = e("span", null, [
                e("b", null, "公开"),
                e("small", null, "其他人可以看到")
              ], -1))
            ]),
            e("label", null, [
              ie(e("input", {
                "onUpdate:modelValue": l[3] || (l[3] = ($) => g.value.privacy = $),
                type: "radio",
                value: 1,
                disabled: g.value.submitting
              }, null, 8, Do), [
                [
                  it,
                  g.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              l[16] || (l[16] = e("span", null, [
                e("b", null, "私密"),
                e("small", null, "仅自己可见")
              ], -1))
            ])
          ])) : y("", !0),
          e("p", {
            class: B(["fo-create-status", { error: g.value.error }]),
            role: "status"
          }, a(g.value.status), 3),
          e("footer", null, [
            e("button", {
              type: "button",
              disabled: g.value.submitting,
              onClick: l[4] || (l[4] = ($) => u(se).closeCreate())
            }, "取消", 8, Po),
            e("button", {
              class: "primary",
              type: "submit",
              disabled: g.value.submitting
            }, a(g.value.submitting ? "创建中…" : P.value ? "创建收藏夹" : "创建分组"), 9, zo)
          ])
        ], 32)
      ], 32)) : y("", !0),
      m.value.open ? (o(), s("dialog", {
        key: 1,
        class: "bili-sub-add-dialog",
        open: "",
        onCancel: l[10] || (l[10] = w(($) => u(se).closeChannelPicker(), ["prevent"]))
      }, [
        e("div", Bo, [
          e("header", null, [
            l[18] || (l[18] = e("div", null, [
              e("b", null, "从我的关注中添加 UP 主"),
              e("small", null, "沿用“正在关注”的本地分组，只能添加已关注的 UP 主")
            ], -1)),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: !!m.value.submittingMid,
              onClick: l[7] || (l[7] = ($) => u(se).closeChannelPicker())
            }, "×", 8, Io)
          ]),
          e("div", Ro, [
            e("div", Lo, [
              e("button", {
                type: "button",
                class: B(["bili-sub-add-group", { on: m.value.activeGroupId === "__all__" }]),
                onClick: l[8] || (l[8] = ($) => u(se).updateChannelPicker({ activeGroupId: "__all__" }))
              }, "全部关注", 2),
              (o(!0), s(L, null, O(m.value.groups, ($) => (o(), s("button", {
                key: $.id,
                type: "button",
                class: B(["bili-sub-add-group", { on: m.value.activeGroupId === $.id }]),
                onClick: (A) => u(se).updateChannelPicker({ activeGroupId: $.id })
              }, a($.name), 11, Ao))), 128))
            ]),
            ie(e("input", {
              "onUpdate:modelValue": l[9] || (l[9] = ($) => m.value.query = $),
              type: "search",
              placeholder: "搜索关注的 UP 主"
            }, null, 512), [
              [he, m.value.query]
            ])
          ]),
          e("div", Eo, [
            m.value.loading ? (o(), s("div", Uo, [...l[19] || (l[19] = [
              e("i", null, null, -1),
              e("span", null, "正在读取关注分组…", -1)
            ])])) : m.value.error ? (o(), s("p", Vo, a(m.value.error), 1)) : V.value.length ? (o(!0), s(L, { key: 3 }, O(V.value, ($) => (o(), s("button", {
              key: $.mid,
              type: "button",
              class: "bili-sub-add-up",
              disabled: $.added || !!m.value.submittingMid,
              onClick: (A) => u(se).selectChannel($.mid)
            }, [
              $.face ? (o(), s("img", {
                key: 0,
                src: $.face,
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, qo)) : (o(), s("span", Go, "UP")),
              e("span", null, [
                e("b", null, a($.name), 1),
                e("small", null, "UID " + a($.mid), 1)
              ]),
              e("i", null, a($.added ? "已添加" : m.value.submittingMid === $.mid ? "添加中…" : "＋ 添加"), 1)
            ], 8, No))), 128)) : (o(), s("p", Fo, "该分组中没有匹配的已关注 UP 主。"))
          ])
        ])
      ], 32)) : y("", !0),
      T.value.open ? (o(), s("div", {
        key: 2,
        class: "fo-custom-confirm-overlay",
        onClick: l[13] || (l[13] = w(($) => u(se).closeConfirm(), ["self"]))
      }, [
        e("div", Oo, [
          e("div", Ho, [
            e("h4", null, a(T.value.title), 1)
          ]),
          e("div", Wo, [
            e("p", null, a(T.value.message), 1)
          ]),
          e("div", jo, [
            e("button", {
              type: "button",
              class: "fo-confirm-btn cancel",
              disabled: T.value.submitting,
              onClick: l[11] || (l[11] = ($) => u(se).closeConfirm())
            }, a(T.value.cancelText), 9, Yo),
            e("button", {
              type: "button",
              class: B(["fo-confirm-btn confirm", { danger: T.value.danger }]),
              disabled: T.value.submitting,
              onClick: l[12] || (l[12] = ($) => u(se).submitConfirm())
            }, a(T.value.submitting ? "处理中…" : T.value.confirmText), 11, Xo)
          ])
        ])
      ])) : y("", !0)
    ], 64));
  }
}), Qo = { class: "fo-upg-shell" }, Jo = { class: "fo-upg-body" }, Zo = { class: "fo-upg-sidebar" }, es = { class: "fo-upg-sidebar-head" }, ts = { class: "fo-upg-group-items" }, is = ["onDragstart", "onDrop", "onClick"], os = ["onKeydown"], ss = {
  key: 0,
  class: "fo-upg-tree-branch"
}, ls = {
  key: 1,
  class: "fo-folder-icon"
}, ns = { class: "fo-upg-group-name" }, as = { class: "fo-upg-vue-group-actions" }, rs = ["onClick"], us = ["onClick"], ds = ["onClick"], cs = ["placeholder"], ps = {
  key: 1,
  class: "muted small"
}, bs = { class: "fo-upg-main" }, vs = { class: "fo-upg-main-head" }, fs = { class: "fo-upg-main-title" }, gs = { key: 0 }, ms = { class: "fo-upg-head-actions" }, ys = { class: "fo-upg-filter-tabs" }, hs = { class: "fo-upg-batch-wrap" }, _s = { class: "fo-upg-batch-count" }, ks = ["disabled"], $s = ["disabled"], ws = { class: "fo-upg-toolbar" }, Cs = { class: "fo-upg-search" }, xs = ["disabled"], Ss = {
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
}, Ps = ["title", "onContextmenu", "onClick"], zs = ["src"], Bs = { class: "fo-upg-info" }, Is = { class: "fo-upg-name" }, Rs = { class: "fo-upg-sign" }, Ls = ["disabled", "onClick"], As = {
  key: 1,
  class: "fo-upg-move-wrap"
}, Es = ["disabled"], Us = { class: "fo-upg-move-dropdown" }, Vs = ["disabled", "onClick"], Fs = { key: 0 }, Ns = {
  key: 0,
  class: "muted small",
  style: { padding: "6px 10px" }
}, qs = ["disabled", "onClick"], Gs = { class: "fo-upg-pagination" }, Os = { class: "fo-upg-page-info" }, Hs = {
  key: 0,
  class: "fo-upg-page-btns"
}, Ws = ["disabled"], js = ["disabled"], Ys = { class: "fo-upg-page-cur" }, Xs = ["disabled"], Ks = ["disabled"], Qs = /* @__PURE__ */ ze({
  __name: "BiliUpGroupManager",
  setup(ke) {
    const g = x(void 0), T = x(""), m = x(""), P = x(""), V = x(""), C = x(!1), I = x(/* @__PURE__ */ new Set()), l = x(null);
    function $(h) {
      if (h.button !== 0 || h.target.closest("button,input")) return;
      const d = l.value;
      if (!d) return;
      const b = d.getBoundingClientRect(), M = b.left, Q = b.top, re = h.clientX, me = h.clientY;
      d.style.position = "fixed", d.style.left = `${M}px`, d.style.top = `${Q}px`, d.style.right = "auto", d.style.bottom = "auto", d.style.margin = "0", d.style.transform = "none";
      const we = (le) => {
        const Se = le.clientX - re, Te = le.clientY - me, Me = Math.max(8, Math.min(window.innerWidth - 120, M + Se)), Fe = Math.max(8, Math.min(window.innerHeight - 80, Q + Te));
        d.style.left = `${Me}px`, d.style.top = `${Fe}px`;
      }, xe = () => {
        window.removeEventListener("pointermove", we), window.removeEventListener("pointerup", xe);
      };
      window.addEventListener("pointermove", we), window.addEventListener("pointerup", xe);
    }
    const A = oe(() => v.groups.find((h) => h.id === v.activeGroupId) || null), S = oe(() => {
      const h = v.query.trim().toLowerCase(), d = v.activeGroupId;
      return v.followings.filter((b) => {
        if (h && !b.name.toLowerCase().includes(h) && !b.sign.toLowerCase().includes(h) && !b.mid.includes(h)) return !1;
        const M = b.groupIds.includes(d);
        return v.filter === "ingroup" ? M : v.onlyUngrouped ? !b.groupIds || b.groupIds.length === 0 : !0;
      });
    }), N = oe(() => Math.max(1, Math.ceil(S.value.length / v.pageSize))), F = oe(() => {
      const d = (Math.min(v.page, N.value) - 1) * v.pageSize;
      return S.value.slice(d, d + v.pageSize);
    }), G = oe(() => v.followings.filter((h) => h.groupIds.length === 0).length), j = x(null), be = /* @__PURE__ */ new Map();
    function X(h) {
      const d = Math.max(1, Math.min(N.value, h));
      v.page = d, j.value && (j.value.scrollTop = 0);
    }
    ge(() => [v.query, v.filter, v.onlyUngrouped], () => {
      v.page = 1, j.value && (j.value.scrollTop = 0);
    }), ge(() => v.activeGroupId, (h, d) => {
      if (d && j.value) {
        const Q = `${d}_${v.filter}_${v.onlyUngrouped}`;
        be.set(Q, {
          page: v.page,
          scrollTop: j.value.scrollTop
        });
      }
      if (v.filter === "all")
        return;
      const b = `${h}_${v.filter}_${v.onlyUngrouped}`, M = be.get(b);
      M ? (v.page = Math.min(M.page, N.value), Ze(() => {
        j.value && (j.value.scrollTop = M.scrollTop);
      })) : (v.page = 1, Ze(() => {
        j.value && (j.value.scrollTop = 0);
      }));
    }), ge(N, (h) => {
      v.page > h && (v.page = h);
    }), ge(C, (h) => {
      h || I.value.clear();
    });
    function ve(h) {
      g.value = h, T.value = "";
    }
    function fe() {
      g.value = void 0, T.value = "";
    }
    function te() {
      const h = T.value.trim();
      h && (ne.dispatch("create-group", { name: h, parentId: g.value || "" }), fe());
    }
    function R(h) {
      m.value = h.id, P.value = h.name;
    }
    function r() {
      const h = P.value.trim();
      m.value && h && ne.dispatch("rename-group", { id: m.value, name: h }), m.value = "", P.value = "";
    }
    function q(h, d) {
      V.value = d, h.dataTransfer?.setData("application/x-logicweaver-up-group", d), h.dataTransfer && (h.dataTransfer.effectAllowed = "move");
    }
    function H(h, d) {
      const b = h.dataTransfer?.getData("application/x-logicweaver-up-group") || V.value;
      if (V.value = "", !b || b === d) return;
      const M = h.currentTarget?.getBoundingClientRect(), Q = M ? h.clientY - M.top : 0, re = M ? Q < M.height * 0.25 ? "before" : Q > M.height * 0.75 ? "after" : "into" : "into";
      ne.dispatch("move-group", { sourceId: b, targetId: d, mode: re });
    }
    function K(h) {
      const d = h.dataTransfer?.getData("application/x-logicweaver-up-group") || V.value;
      V.value = "", d && ne.dispatch("move-group", { sourceId: d, targetId: "", mode: "root" });
    }
    function Z(h, d) {
      !d || v.busyMid || ne.dispatch("toggle-member", { groupId: d, mid: h });
    }
    function $e(h) {
      !v.activeGroupId || v.busyMid || ne.dispatch("toggle-member", { groupId: v.activeGroupId, mid: h });
    }
    function Ae(h, d) {
      ne.dispatch("preview-up", { mid: d, clientX: h.clientX, clientY: h.clientY });
    }
    function Ee(h) {
      const d = I.value;
      d.has(h) ? d.delete(h) : d.add(h);
    }
    function Ue() {
      if (!v.activeGroupId || v.busyMid) return;
      const h = Array.from(I.value);
      if (!h.length) return;
      const d = h.filter((b) => {
        const M = v.followings.find((Q) => Q.mid === b);
        return M && !M.groupIds.includes(v.activeGroupId);
      });
      if (d.length) {
        for (const b of d)
          ne.dispatch("toggle-member", { groupId: v.activeGroupId, mid: b });
        I.value.clear();
      }
    }
    function Ce() {
      if (!v.activeGroupId || v.busyMid) return;
      const h = Array.from(I.value);
      if (!h.length) return;
      const d = h.filter((b) => {
        const M = v.followings.find((Q) => Q.mid === b);
        return M && M.groupIds.includes(v.activeGroupId);
      });
      if (d.length) {
        for (const b of d)
          ne.dispatch("toggle-member", { groupId: v.activeGroupId, mid: b });
        I.value.clear();
      }
    }
    function Ve() {
      for (const h of F.value) I.value.add(h.mid);
    }
    return (h, d) => u(v).open ? (o(), s("dialog", {
      key: 0,
      ref_key: "dialogEl",
      ref: l,
      class: "fo-up-group-dialog",
      open: "",
      onCancel: d[20] || (d[20] = w((b) => u(ne).close(), ["prevent"]))
    }, [
      e("div", Qo, [
        e("header", {
          class: "fo-upg-head",
          onPointerdown: $
        }, [
          d[21] || (d[21] = e("h3", null, [
            e("span", null, "👥"),
            ae(" 关注分组与 UP 主管理")
          ], -1)),
          e("button", {
            type: "button",
            class: "fo-upg-close-btn",
            "aria-label": "关闭",
            title: "关闭管理面板",
            onClick: d[0] || (d[0] = (b) => u(ne).close())
          }, "✕")
        ], 32),
        e("div", Jo, [
          e("aside", Zo, [
            e("div", es, [
              d[22] || (d[22] = e("span", null, "我的分组", -1)),
              e("button", {
                type: "button",
                onClick: d[1] || (d[1] = (b) => ve(null))
              }, "＋ 新建")
            ]),
            e("div", ts, [
              e("div", {
                class: "fo-upg-root-dropzone",
                onDragover: d[2] || (d[2] = w(() => {
                }, ["prevent"])),
                onDrop: w(K, ["prevent"])
              }, "⇣ 拖至此处变为顶级分组", 32),
              g.value === null ? (o(), s("form", {
                key: 0,
                class: "fo-upg-create-box",
                onSubmit: w(te, ["prevent"])
              }, [
                ie(e("input", {
                  "onUpdate:modelValue": d[3] || (d[3] = (b) => T.value = b),
                  maxlength: "20",
                  placeholder: "输入分组名称…",
                  autofocus: ""
                }, null, 512), [
                  [he, T.value]
                ]),
                e("div", { class: "fo-upg-create-btns" }, [
                  e("button", {
                    type: "button",
                    class: "cancel",
                    onClick: fe
                  }, "取消"),
                  d[23] || (d[23] = e("button", {
                    class: "confirm",
                    type: "submit"
                  }, "确定", -1))
                ])
              ], 32)) : y("", !0),
              (o(!0), s(L, null, O(u(v).groups, (b) => (o(), s(L, {
                key: b.id
              }, [
                e("div", {
                  class: B(["fo-upg-group-item", { on: b.id === u(v).activeGroupId, "is-subgroup": b.depth > 0 }]),
                  style: _e({ paddingLeft: `${8 + b.depth * 18}px` }),
                  draggable: "true",
                  onDragstart: (M) => q(M, b.id),
                  onDragover: d[7] || (d[7] = w(() => {
                  }, ["prevent"])),
                  onDrop: w((M) => H(M, b.id), ["prevent"]),
                  onClick: (M) => u(v).activeGroupId = b.id
                }, [
                  m.value === b.id ? (o(), s(L, { key: 0 }, [
                    ie(e("input", {
                      "onUpdate:modelValue": d[4] || (d[4] = (M) => P.value = M),
                      class: "fo-upg-rename-input",
                      maxlength: "20",
                      onClick: d[5] || (d[5] = w(() => {
                      }, ["stop"])),
                      onKeydown: Pe(w(r, ["prevent"]), ["enter"])
                    }, null, 40, os), [
                      [he, P.value]
                    ]),
                    e("button", {
                      type: "button",
                      onClick: w(r, ["stop"])
                    }, "✓"),
                    e("button", {
                      type: "button",
                      onClick: d[6] || (d[6] = w((M) => m.value = "", ["stop"]))
                    }, "✕")
                  ], 64)) : (o(), s(L, { key: 1 }, [
                    b.depth ? (o(), s("span", ss, "↳")) : (o(), s("i", ls)),
                    e("span", ns, a(b.name), 1),
                    e("small", null, a(b.upMids.length), 1),
                    e("span", as, [
                      e("button", {
                        type: "button",
                        title: "添加子分组",
                        onClick: w((M) => ve(b.id), ["stop"])
                      }, "＋", 8, rs),
                      e("button", {
                        type: "button",
                        title: "重命名",
                        onClick: w((M) => R(b), ["stop"])
                      }, "✎", 8, us),
                      e("button", {
                        type: "button",
                        class: "danger",
                        title: "删除",
                        onClick: w((M) => u(ne).dispatch("delete-group", b.id), ["stop"])
                      }, "×", 8, ds)
                    ])
                  ], 64))
                ], 46, is),
                g.value === b.id ? (o(), s("form", {
                  key: 0,
                  class: "fo-upg-create-box",
                  style: _e({ marginLeft: `${18 + b.depth * 18}px` }),
                  onSubmit: w(te, ["prevent"])
                }, [
                  ie(e("input", {
                    "onUpdate:modelValue": d[8] || (d[8] = (M) => T.value = M),
                    maxlength: "20",
                    placeholder: `输入「${b.name}」的子分组名称…`,
                    autofocus: ""
                  }, null, 8, cs), [
                    [he, T.value]
                  ]),
                  e("div", { class: "fo-upg-create-btns" }, [
                    e("button", {
                      type: "button",
                      class: "cancel",
                      onClick: fe
                    }, "取消"),
                    d[24] || (d[24] = e("button", {
                      class: "confirm",
                      type: "submit"
                    }, "确定", -1))
                  ])
                ], 36)) : y("", !0)
              ], 64))), 128)),
              !u(v).groups.length && !u(v).loading ? (o(), s("p", ps, '暂无分组，请点击"＋ 新建"。')) : y("", !0)
            ])
          ]),
          e("section", bs, [
            e("div", vs, [
              e("div", fs, [
                e("h4", null, a(A.value ? `分组：「${A.value.name}」` : "请先选择或新建分组"), 1),
                A.value ? (o(), s("span", gs, "（本组 " + a(A.value.upMids.length) + " 位 · 共 " + a(u(v).followings.length) + " 位关注 · 未分组 " + a(G.value) + " 位）", 1)) : y("", !0)
              ]),
              e("div", ms, [
                e("div", ys, [
                  e("button", {
                    type: "button",
                    class: B(["fo-upg-filter-tab", { on: u(v).filter === "all" }]),
                    onClick: d[9] || (d[9] = (b) => u(v).filter = "all")
                  }, "全部关注", 2),
                  e("button", {
                    type: "button",
                    class: B(["fo-upg-filter-tab", { on: u(v).filter === "ingroup" }]),
                    onClick: d[10] || (d[10] = (b) => u(v).filter = "ingroup")
                  }, "本组已加", 2)
                ]),
                e("div", hs, [
                  e("button", {
                    type: "button",
                    class: B(["fo-upg-batch-toggle", { on: C.value }]),
                    onClick: d[11] || (d[11] = (b) => C.value = !C.value)
                  }, a(C.value ? "退出批量" : "批量操作"), 3),
                  C.value && I.value.size > 0 ? (o(), s(L, { key: 0 }, [
                    e("span", _s, "已选 " + a(I.value.size), 1),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action add",
                      disabled: !A.value,
                      onClick: Ue
                    }, "＋ 加入本组", 8, ks),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action remove",
                      disabled: !A.value,
                      onClick: Ce
                    }, "− 移出本组", 8, $s),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: Ve
                    }, "全选当页"),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: d[12] || (d[12] = (b) => I.value.clear())
                    }, "清除")
                  ], 64)) : y("", !0)
                ]),
                u(v).filter === "all" ? (o(), s("label", {
                  key: 0,
                  class: B(["fo-upg-switch", { on: u(v).onlyUngrouped }])
                }, [
                  ie(e("input", {
                    "onUpdate:modelValue": d[13] || (d[13] = (b) => u(v).onlyUngrouped = b),
                    type: "checkbox"
                  }, null, 512), [
                    [mt, u(v).onlyUngrouped]
                  ]),
                  d[25] || (d[25] = e("span", { class: "fo-upg-switch-track" }, [
                    e("span", { class: "fo-upg-switch-thumb" })
                  ], -1)),
                  d[26] || (d[26] = e("span", { class: "fo-upg-switch-text" }, "仅未分组 UP", -1))
                ], 2)) : y("", !0)
              ])
            ]),
            e("div", ws, [
              e("div", Cs, [
                d[27] || (d[27] = e("span", null, "🔍", -1)),
                ie(e("input", {
                  "onUpdate:modelValue": d[14] || (d[14] = (b) => u(v).query = b),
                  type: "search",
                  placeholder: "搜索关注的 UP 主…"
                }, null, 512), [
                  [he, u(v).query]
                ])
              ]),
              e("button", {
                type: "button",
                class: "fo-upg-refresh-btn",
                disabled: u(v).refreshing,
                onClick: d[15] || (d[15] = (b) => u(ne).dispatch("refresh"))
              }, a(u(v).refreshing ? "刷新中…" : "↻ 刷新关注"), 9, xs)
            ]),
            e("div", {
              ref_key: "listRef",
              ref: j,
              class: "fo-upg-list"
            }, [
              u(v).loading ? (o(), s("div", Ss, [...d[28] || (d[28] = [
                e("i", null, null, -1),
                e("span", null, "正在加载关注的 UP 主列表…", -1)
              ])])) : u(v).error ? (o(), s("p", Ts, a(u(v).error), 1)) : A.value ? F.value.length ? (o(!0), s(L, { key: 4 }, O(F.value, (b) => (o(), s("article", {
                key: b.mid,
                class: B(["fo-upg-card", { selected: C.value && I.value.has(b.mid) }]),
                title: `右键查看「${b.name}」近期投稿`,
                onContextmenu: w((M) => Ae(M, b.mid), ["prevent"]),
                onClick: (M) => C.value ? Ee(b.mid) : void 0
              }, [
                e("img", {
                  src: b.face,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, zs),
                e("div", Bs, [
                  e("div", Is, a(b.name), 1),
                  e("div", Rs, a(b.sign || "暂无签名"), 1)
                ]),
                C.value ? (o(), s("div", {
                  key: 1,
                  class: B(["fo-upg-batch-check", { checked: I.value.has(b.mid) }])
                }, a(I.value.has(b.mid) ? "✓" : ""), 3)) : (o(), s(L, { key: 0 }, [
                  b.groupIds.includes(u(v).activeGroupId) ? (o(), s("button", {
                    key: 0,
                    type: "button",
                    class: "fo-upg-toggle-btn in-group",
                    disabled: u(v).busyMid === b.mid,
                    onClick: w((M) => $e(b.mid), ["stop"])
                  }, a(u(v).busyMid === b.mid ? "处理中…" : `移出 ${A.value?.name || ""}`), 9, Ls)) : b.groupIds.length > 0 ? (o(), s("div", As, [
                    e("button", {
                      type: "button",
                      class: "fo-upg-toggle-btn belongs-other fo-upg-move-trigger",
                      disabled: u(v).busyMid === b.mid
                    }, a(u(v).busyMid === b.mid ? "处理中…" : `📁 ${b.groupName || "已分组"}`), 9, Es),
                    e("div", Us, [
                      d[30] || (d[30] = e("div", { class: "fo-upg-move-title" }, "移动到分组", -1)),
                      (o(!0), s(L, null, O(u(v).groups, (M) => (o(), s("button", {
                        key: M.id,
                        type: "button",
                        class: B(["fo-upg-move-item", { active: b.groupIds.includes(M.id) }]),
                        disabled: u(v).busyMid === b.mid,
                        onClick: w((Q) => Z(b.mid, M.id), ["stop"])
                      }, [
                        d[29] || (d[29] = e("i", { class: "fo-folder-icon small" }, null, -1)),
                        e("span", null, a(M.name), 1),
                        b.groupIds.includes(M.id) ? (o(), s("small", Fs, "✓ 已加入")) : y("", !0)
                      ], 10, Vs))), 128)),
                      u(v).groups.length ? y("", !0) : (o(), s("p", Ns, "暂无分组"))
                    ])
                  ])) : u(v).activeGroupId ? (o(), s("button", {
                    key: 2,
                    type: "button",
                    class: "fo-upg-toggle-btn",
                    disabled: u(v).busyMid === b.mid,
                    onClick: w((M) => $e(b.mid), ["stop"])
                  }, a(u(v).busyMid === b.mid ? "处理中…" : "＋ 加入"), 9, qs)) : y("", !0)
                ], 64))
              ], 42, Ps))), 128)) : (o(), s("p", Ds, "没有符合条件的 UP 主。")) : (o(), s("p", Ms, "请先新建或选择一个分组。"))
            ], 512),
            e("div", Gs, [
              e("div", Os, "共 " + a(S.value.length) + " 位 UP 主 · 每页 " + a(u(v).pageSize) + " 位", 1),
              N.value > 1 ? (o(), s("div", Hs, [
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: u(v).page <= 1,
                  onClick: d[16] || (d[16] = (b) => X(1))
                }, "« 首页", 8, Ws),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: u(v).page <= 1,
                  onClick: d[17] || (d[17] = (b) => X(u(v).page - 1))
                }, "‹ 上一页", 8, js),
                e("span", Ys, a(u(v).page) + " / " + a(N.value), 1),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: u(v).page >= N.value,
                  onClick: d[18] || (d[18] = (b) => X(u(v).page + 1))
                }, "下一页 ›", 8, Xs),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: u(v).page >= N.value,
                  onClick: d[19] || (d[19] = (b) => X(N.value))
                }, "末页 »", 8, Ks)
              ])) : y("", !0)
            ])
          ])
        ])
      ])
    ], 544)) : y("", !0);
  }
}), Js = /* @__PURE__ */ Le(Qs, [["__scopeId", "data-v-9e5aa70a"]]), Zs = ["title"], el = { class: "tape-capsule-text" }, tl = { class: "capsule-title" }, il = { class: "capsule-sub" }, ol = ["title"], sl = { class: "tape-deck-drop-slot" }, ll = {
  key: 1,
  class: "tape-insert-feedback-chip"
}, nl = { class: "tape-loaded-title" }, al = { class: "tape-body-content" }, rl = ["title"], ul = { class: "tape-cassette" }, dl = { class: "tape-center-label" }, cl = { class: "tape-sticker-head" }, pl = ["title"], bl = ["src"], vl = { class: "tape-badge-row" }, fl = { class: "tape-brand-text" }, gl = {
  class: "tape-transport-controls",
  role: "group",
  "aria-label": "电台播放控制"
}, ml = ["title", "aria-label"], yl = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, hl = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, _l = { class: "tape-playback-section" }, kl = { class: "tape-time-lyric-row" }, $l = { class: "tape-timestamp" }, wl = { class: "tape-lyric-container" }, Cl = ["title"], xl = ["aria-valuenow"], Sl = {
  class: "tape-waveform-row",
  "aria-hidden": "true"
}, Tl = {
  class: "tape-waveform-svg",
  viewBox: "0 0 160 16",
  preserveAspectRatio: "none"
}, Ml = ["x", "y", "height"], Dl = /* @__PURE__ */ ze({
  __name: "BiliRadioTapePlayer",
  props: {
    dockSide: { type: Boolean, default: !1 }
  },
  setup(ke) {
    const g = ke, T = [
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
    ], m = x(!1), P = x(null), V = x(!1), C = x(!1), I = x(""), l = x(!1), $ = x(380);
    function A() {
      if (typeof document > "u" || !g.dockSide) return;
      const R = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock"), r = 20, q = 16;
      if (R) {
        const K = R.getBoundingClientRect();
        if (K.left > 80) {
          const Z = Math.floor(K.left - r - q);
          if (Z > 220) {
            $.value = Z;
            return;
          }
        }
      }
      const H = typeof window < "u" ? window.innerWidth : 1280;
      $.value = Math.max(220, Math.floor(H / 2 - 230));
    }
    let S = null;
    function N() {
      clearTimeout(S), S = setTimeout(A, 60);
    }
    Ye(() => {
      if (g.dockSide) {
        A(), window.addEventListener("resize", N);
        const R = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
        if (R && typeof ResizeObserver < "u") {
          const r = new ResizeObserver(() => A());
          r.observe(R), R.__bili_dock_ro = r;
        }
      }
    }), ut(() => {
      typeof window < "u" && window.removeEventListener("resize", N);
      const R = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
      R && R.__bili_dock_ro && (R.__bili_dock_ro.disconnect(), delete R.__bili_dock_ro);
    });
    function F(R) {
      R.preventDefault(), V.value = !0;
    }
    function G(R) {
      R.preventDefault(), R.dataTransfer && (R.dataTransfer.dropEffect = "copy"), V.value = !0;
    }
    function j(R) {
      const r = R.currentTarget, q = R.relatedTarget;
      (!q || !r.contains(q)) && (V.value = !1);
    }
    function be(R) {
      R.preventDefault(), V.value = !1;
      const r = R.dataTransfer;
      if (!r) return;
      let q = r.getData("application/x-bili-cassette") || r.getData("application/json"), H = null;
      if (q)
        try {
          H = JSON.parse(q);
        } catch {
        }
      if (!H?.bvid) {
        const Z = (r.getData("text/plain") || r.getData("text/uri-list") || r.getData("application/x-logicweaver-video-url"))?.match(/BV[0-9a-zA-Z]+/);
        Z && (H = {
          bvid: Z[0],
          title: "放入的单曲卡带",
          cover: "",
          author: "Bilibili",
          duration: 0
        });
      }
      H?.bvid && (C.value = !0, I.value = H.title || H.bvid, setTimeout(() => {
        De.insertAndPlay(H);
      }, 280), setTimeout(() => {
        C.value = !1;
      }, 1500));
    }
    function X(R) {
      if (P.value) {
        m.value = !0;
        try {
          R.currentTarget?.setPointerCapture?.(R.pointerId);
        } catch {
        }
        te(R);
      }
    }
    function ve(R) {
      m.value && te(R);
    }
    function fe(R) {
      if (m.value) {
        te(R), m.value = !1;
        try {
          R.currentTarget?.releasePointerCapture?.(R.pointerId);
        } catch {
        }
      }
    }
    function te(R) {
      if (!P.value) return;
      const r = P.value.getBoundingClientRect();
      if (r.width <= 0) return;
      const q = R.clientX - r.left, H = Math.max(0, Math.min(100, q / r.width * 100));
      De.seek(H);
    }
    return (R, r) => (o(), s("div", {
      class: B(["bili-tape-deck", {
        "is-playing": u(Y).playing,
        "is-drag-over": V.value,
        "is-inserting": C.value,
        "dock-side-mode": g.dockSide,
        "dock-side-collapsed": g.dockSide && l.value
      }]),
      style: _e(g.dockSide && !l.value ? { maxWidth: `${$.value}px` } : void 0),
      onDragenter: F,
      onDragover: G,
      onDragleave: j,
      onDrop: be
    }, [
      g.dockSide && l.value ? (o(), s("div", {
        key: 0,
        class: "tape-collapsed-capsule",
        title: `电台：${u(Y).title || "哔哩哔哩电台"}`
      }, [
        e("div", {
          class: B(["tape-capsule-spool", { spinning: u(Y).playing }])
        }, [...r[8] || (r[8] = [
          e("div", { class: "spool-center-dot" }, null, -1)
        ])], 2),
        e("div", el, [
          e("strong", tl, a(u(Y).title || "B站电台"), 1),
          e("small", il, a(u(Y).playing ? "♪ 播放中" : "已暂停"), 1)
        ]),
        e("button", {
          type: "button",
          class: "tape-capsule-play-btn",
          title: u(Y).playing ? "暂停" : "播放",
          onClick: r[0] || (r[0] = w((q) => u(De).togglePlay(), ["stop"]))
        }, a(u(Y).playing ? "⏸" : "▶"), 9, ol),
        e("button", {
          type: "button",
          class: "tape-capsule-expand-btn",
          title: "展开完整磁带播放条",
          onClick: r[1] || (r[1] = w((q) => l.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, Zs)) : y("", !0),
      ie(e("div", sl, [...r[9] || (r[9] = [
        yt('<div class="slot-visual-frame" data-v-1ecf33c6><span class="slot-icon-tape" data-v-1ecf33c6>📼</span><div class="slot-text-col" data-v-1ecf33c6><strong class="slot-headline" data-v-1ecf33c6>释放鼠标装填卡带</strong><small class="slot-subline" data-v-1ecf33c6>拖入视频封面 · 立即播放音乐</small></div></div>', 1)
      ])], 512), [
        [et, V.value]
      ]),
      C.value ? (o(), s("div", ll, [
        r[10] || (r[10] = e("span", { class: "tape-click-sound" }, "✓ 已装填", -1)),
        e("span", nl, "《" + a(I.value) + "》", 1)
      ])) : y("", !0),
      ie(e("div", al, [
        e("div", {
          class: "tape-cassette-wrap",
          role: "button",
          tabindex: "0",
          title: u(Y).playing ? "点击暂停电台 (也可直接拖拽视频封面至此装填)" : "点击播放电台 (也可直接拖拽视频封面至此装填)",
          onClick: r[2] || (r[2] = (q) => u(De).togglePlay()),
          onKeydown: r[3] || (r[3] = Pe(w((q) => u(De).togglePlay(), ["prevent"]), ["enter", "space"]))
        }, [
          e("div", ul, [
            r[13] || (r[13] = e("div", { class: "tape-spool tape-spool-left" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1)),
            e("div", dl, [
              e("div", cl, [
                u(Y).coverUrl ? (o(), s("div", {
                  key: 0,
                  class: "tape-cover-sticker",
                  title: u(Y).title
                }, [
                  e("img", {
                    src: u(Y).coverUrl,
                    alt: "Cover",
                    referrerpolicy: "no-referrer"
                  }, null, 8, bl)
                ], 8, pl)) : y("", !0),
                e("div", vl, [
                  r[11] || (r[11] = e("span", { class: "side-letter" }, "A", -1)),
                  e("span", fl, a(u(Y).seriesName || "CASSETTE"), 1)
                ])
              ]),
              r[12] || (r[12] = e("div", { class: "tape-acrylic-window" }, [
                e("div", { class: "tape-ribbon-bar" }),
                e("div", { class: "tape-scale-marks" }, [
                  e("span", null, "100"),
                  e("span", null, "50"),
                  e("span", null, "0")
                ])
              ], -1))
            ]),
            r[14] || (r[14] = e("div", { class: "tape-spool tape-spool-right" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1))
          ])
        ], 40, rl),
        e("div", gl, [
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "上一首",
            "aria-label": "上一首",
            onClick: r[4] || (r[4] = (q) => u(De).prev())
          }, [...r[15] || (r[15] = [
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
            class: B(["tape-ctrl-btn tape-ctrl-play", { playing: u(Y).playing }]),
            title: u(Y).playing ? "暂停播放" : "开始播放",
            "aria-label": u(Y).playing ? "暂停" : "播放",
            onClick: r[5] || (r[5] = (q) => u(De).togglePlay())
          }, [
            u(Y).playing ? (o(), s("svg", yl, [...r[16] || (r[16] = [
              e("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" }, null, -1)
            ])])) : (o(), s("svg", hl, [...r[17] || (r[17] = [
              e("path", { d: "M8 5v14l11-7z" }, null, -1)
            ])]))
          ], 10, ml),
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "下一首",
            "aria-label": "下一首",
            onClick: r[6] || (r[6] = (q) => u(De).next())
          }, [...r[18] || (r[18] = [
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
        e("div", _l, [
          e("div", kl, [
            e("span", $l, a(u(Y).formattedCurrent) + " / " + a(u(Y).formattedDuration), 1),
            e("div", wl, [
              e("span", {
                class: "tape-lyric-text",
                title: u(Y).lyric
              }, a(u(Y).lyric || "♪ 纯音乐 / 伴奏"), 9, Cl)
            ])
          ]),
          e("div", {
            ref_key: "progressLineRef",
            ref: P,
            class: "tape-progress-rail",
            role: "slider",
            "aria-valuenow": u(Y).progressPercent,
            "aria-valuemin": "0",
            "aria-valuemax": "100",
            "aria-label": "电台播放进度",
            onPointerdown: X,
            onPointermove: ve,
            onPointerup: fe,
            onPointercancel: fe
          }, [
            e("div", {
              class: "tape-progress-fill",
              style: _e({ width: `${u(Y).progressPercent}%` })
            }, null, 4),
            e("div", {
              class: "tape-progress-handle",
              style: _e({ left: `${u(Y).progressPercent}%` })
            }, null, 4)
          ], 40, xl),
          e("div", Sl, [
            (o(), s("svg", Tl, [
              (o(), s(L, null, O(T, (q, H) => e("rect", {
                key: H,
                class: "wave-bar",
                x: H * 4,
                y: 16 - q * 0.7,
                width: "1.8",
                height: q * 0.7,
                rx: "0.9",
                style: _e({ animationDelay: `${H % 8 * 0.12}s` })
              }, null, 12, Ml)), 64))
            ]))
          ])
        ]),
        g.dockSide ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "tape-dock-collapse-btn",
          title: "收起至左下角小胶囊",
          "aria-label": "收起磁带机",
          onClick: r[7] || (r[7] = w((q) => l.value = !0, ["stop"]))
        }, [...r[19] || (r[19] = [
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
        [et, !g.dockSide || !l.value]
      ])
    ], 38));
  }
}), rt = /* @__PURE__ */ Le(Dl, [["__scopeId", "data-v-1ecf33c6"]]), Pl = ["title"], zl = {
  key: 2,
  class: "hero-lyric-body"
}, Bl = { class: "hero-lyric-stage" }, Il = ["title"], Rl = /* @__PURE__ */ ze({
  __name: "BiliVideoLyricDockBar",
  props: {
    inlineHero: { type: Boolean, default: !1 }
  },
  setup(ke) {
    const g = x(340), T = x(!1), m = x(!1), P = x(null);
    function V(A) {
      const S = document.querySelector(".bili-mini-screen video, .bili-sub-screen video");
      S && (S.currentTime = Math.max(0, S.currentTime + A));
    }
    let C = 0, I = 0, l = "right";
    function $(A, S) {
      S.preventDefault(), S.stopPropagation(), T.value = !0, l = A, C = S.clientX, I = g.value;
      const N = (G) => {
        if (!T.value) return;
        const j = G.clientX - C, be = l === "right" ? I + j : I - j, X = Math.max(180, Math.min(720, be));
        g.value = X;
      }, F = () => {
        T.value = !1, window.removeEventListener("pointermove", N), window.removeEventListener("pointerup", F), window.removeEventListener("pointercancel", F);
        try {
          localStorage.setItem("bili_hero_lyric_width", String(g.value));
        } catch {
        }
      };
      window.addEventListener("pointermove", N), window.addEventListener("pointerup", F), window.addEventListener("pointercancel", F);
    }
    return Ye(() => {
      try {
        const A = localStorage.getItem("bili_hero_lyric_width");
        if (A) {
          const S = parseInt(A, 10);
          Number.isFinite(S) && S >= 180 && S <= 720 && (g.value = S);
        }
      } catch {
      }
    }), (A, S) => (o(), s("aside", {
      ref_key: "barRef",
      ref: P,
      class: B(["bili-hero-lyric-bar", { "is-collapsed": m.value, "is-resizing": T.value }]),
      style: _e(m.value ? void 0 : { width: `${g.value}px` }),
      "aria-label": "视频实时字幕与控制"
    }, [
      m.value ? y("", !0) : (o(), s("div", {
        key: 0,
        class: "lyric-resize-handle handle-left",
        title: "按住向左拉伸宽度",
        onPointerdown: S[0] || (S[0] = (N) => $("left", N))
      }, [...S[7] || (S[7] = [
        e("span", { class: "resize-line" }, null, -1)
      ])], 32)),
      m.value ? (o(), s("div", {
        key: 1,
        class: "hero-lyric-capsule",
        title: `视频台词：${u(D).organizer.heroLyricText || "暂无字幕"} (点击展开)`,
        onClick: S[2] || (S[2] = (N) => m.value = !1)
      }, [
        S[8] || (S[8] = e("span", { class: "capsule-icon" }, "💬", -1)),
        S[9] || (S[9] = e("span", { class: "capsule-text" }, "台词", -1)),
        e("button", {
          type: "button",
          class: "capsule-expand-btn",
          title: "展开台词栏",
          onClick: S[1] || (S[1] = w((N) => m.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, Pl)) : (o(), s("div", zl, [
        e("div", Bl, [
          e("button", {
            type: "button",
            class: "hero-lyric-seek-btn",
            title: "当前视频后退 5 秒",
            "aria-label": "后退 5 秒",
            onClick: S[3] || (S[3] = (N) => V(-5))
          }, " ‹ "),
          e("strong", {
            class: "hero-lyric-current-text",
            title: u(D).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"
          }, a(u(D).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"), 9, Il),
          e("button", {
            type: "button",
            class: "hero-lyric-seek-btn",
            title: "当前视频前进 5 秒",
            "aria-label": "前进 5 秒",
            onClick: S[4] || (S[4] = (N) => V(5))
          }, " › ")
        ]),
        e("button", {
          type: "button",
          class: "hero-lyric-collapse-btn",
          title: "收起台词栏",
          "aria-label": "收起台词栏",
          onClick: S[5] || (S[5] = w((N) => m.value = !0, ["stop"]))
        }, [...S[10] || (S[10] = [
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
      m.value ? y("", !0) : (o(), s("div", {
        key: 3,
        class: "lyric-resize-handle handle-right",
        title: "按住向右拉伸宽度",
        onPointerdown: S[6] || (S[6] = (N) => $("right", N))
      }, [...S[11] || (S[11] = [
        e("span", { class: "resize-line" }, null, -1)
      ])], 32))
    ], 6));
  }
}), Ll = /* @__PURE__ */ Le(Rl, [["__scopeId", "data-v-d0857a88"]]), Al = { class: "card-head bili-header-unified-row" }, El = { class: "bili-header-right" }, Ul = ["title"], Vl = {
  key: 0,
  class: "bili-header-msg-badge"
}, Fl = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, Nl = { class: "card-fullscreen-bili-suggest-head" }, ql = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, Gl = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, Ol = ["onClick", "onContextmenu"], Hl = { class: "card-fullscreen-bili-thumb" }, Wl = ["src"], jl = { key: 0 }, Yl = { class: "card-fullscreen-bili-video-copy" }, Xl = {
  class: "fm-pane",
  id: "pane-organizer"
}, Kl = { id: "fo-body" }, Ql = { class: "fo-bili-sidebar" }, Jl = ["title"], Zl = { class: "fo-sidebar-toggle-title" }, en = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, tn = ["aria-expanded", "title"], on = { class: "fo-sidebar-toggle-chevron" }, sn = { class: "fo-sidebar-features-wrap" }, ln = { class: "fo-sidebar-sub-wrap" }, nn = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, an = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, rn = { class: "fo-sidebar-sub-wrap fo-sidebar-recommend-wrap" }, un = { class: "fo-sidebar-sub-wrap fo-sidebar-radio-wrap" }, dn = { class: "fo-sidebar-favorite-hub" }, cn = {
  key: 0,
  class: "fo-move-target-banner"
}, pn = {
  class: "fo-bili-folder-list",
  "aria-label": "B站收藏夹"
}, bn = {
  key: 0,
  class: "fo-bili-section-divider"
}, vn = ["onDragover", "onDragleave", "onDrop"], fn = { class: "fo-bili-section-title" }, gn = ["data-folder-id", "data-folder-kind", "draggable", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], mn = ["aria-expanded", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], yn = {
  class: "fo-group-caret",
  "aria-hidden": "true"
}, hn = {
  key: 0,
  class: "muted small"
}, _n = {
  key: 0,
  id: "fo-vue-main",
  class: "fo-bili-main"
}, kn = {
  key: 0,
  class: "fo-bili-loading"
}, $n = {
  key: 1,
  class: "fo-bili-empty fo-bili-login-guide"
}, wn = { class: "fo-bili-login-card" }, Cn = { class: "fo-bili-login-actions" }, xn = {
  key: 2,
  class: "fo-bili-empty"
}, Sn = { class: "fo-bili-hero fo-hero-persistent" }, Tn = { class: "fo-hero-left" }, Mn = ["src"], Dn = {
  key: 1,
  class: "fo-folder-icon"
}, Pn = { class: "fo-hero-folder-info" }, zn = { class: "fo-bili-actions" }, Bn = ["disabled"], In = { class: "fo-bili-toolbar" }, Rn = {
  key: 0,
  class: "fo-bili-sort"
}, Ln = ["onClick"], An = {
  class: "fo-mini-dock-anchor",
  "aria-label": "视频标签页"
}, En = ["title"], Un = { class: "fo-video-tab-title" }, Vn = { class: "fo-video-tab-actions" }, Fn = ["title"], Nn = {
  key: 2,
  class: "fo-bili-batch-actions"
}, qn = { class: "fo-batch-count" }, Gn = { class: "fo-bili-grid" }, On = {
  key: 0,
  class: "fo-bili-empty"
}, Hn = ["data-batch-id", "onDragstart", "onContextmenu"], Wn = { class: "fo-bili-thumb" }, jn = {
  key: 0,
  class: "fo-batch-check",
  title: "选择此视频"
}, Yn = ["checked", "onChange"], Xn = ["href", "onClick"], Kn = ["src"], Qn = { class: "fo-bili-count" }, Jn = { class: "fo-bili-duration" }, Zn = { class: "fo-bili-title-row" }, ea = ["href", "onClick"], ta = ["aria-expanded", "onClick"], ia = {
  key: 0,
  class: "fo-card-menu"
}, oa = ["onClick"], sa = ["onClick"], la = ["onClick"], na = { class: "fo-bili-meta" }, aa = ["onClick"], ra = {
  key: 0,
  class: "fo-pager"
}, ua = ["disabled"], da = { class: "fo-page-num" }, ca = ["disabled"], pa = {
  key: 1,
  id: "fo-vue-cache-main",
  class: "fo-bili-main"
}, ba = { class: "fo-bili-hero fo-hero-persistent fo-cached-hero" }, va = { class: "fo-hero-left" }, fa = { class: "fo-hero-folder-info" }, ga = { class: "fo-bili-actions" }, ma = {
  key: 0,
  class: "fo-bili-loading"
}, ya = {
  key: 1,
  class: "fo-bili-grid fo-cached-video-grid"
}, ha = {
  key: 0,
  class: "fo-bili-empty"
}, _a = { class: "fo-bili-thumb" }, ka = ["onClick"], $a = ["src"], wa = { class: "fo-bili-title-row" }, Ca = ["onClick"], xa = ["onClick"], Sa = { class: "fo-bili-meta" }, Ta = {
  key: 2,
  id: "fo-vue-recommend-main",
  class: "fo-bili-main"
}, Ma = { class: "fo-bili-hero" }, Da = { class: "fo-bili-heading" }, Pa = { class: "fo-feed-hero-title" }, za = { class: "fo-feed-badge" }, Ba = { class: "fo-bili-actions" }, Ia = ["disabled"], Ra = { class: "fo-bili-toolbar" }, La = { class: "fo-feed-count-tag" }, Aa = {
  key: 0,
  class: "fo-bili-loading"
}, Ea = {
  key: 1,
  class: "fo-bili-empty"
}, Ua = {
  key: 2,
  class: "fo-bili-grid"
}, Va = {
  key: 0,
  class: "fo-bili-empty"
}, Fa = ["onDragstart"], Na = { class: "fo-bili-thumb" }, qa = ["href", "onClick"], Ga = ["src"], Oa = { class: "fo-bili-count" }, Ha = { class: "fo-bili-duration" }, Wa = { class: "fo-bili-title-row" }, ja = ["href", "onClick"], Ya = ["aria-expanded", "onClick"], Xa = {
  key: 0,
  class: "fo-card-menu"
}, Ka = ["onClick"], Qa = ["onClick"], Ja = ["onClick"], Za = ["onClick"], er = ["onClick"], tr = { class: "fo-bili-meta" }, ir = ["onClick"], or = {
  key: 3,
  id: "fo-vue-following-main",
  class: "fo-bili-main"
}, sr = { class: "fo-bili-hero" }, lr = { class: "fo-bili-heading" }, nr = { class: "fo-feed-hero-title" }, ar = { class: "fo-feed-badge" }, rr = { class: "fo-bili-actions" }, ur = ["disabled"], dr = { class: "fo-up-groups-bar" }, cr = { class: "fo-up-groups-list" }, pr = ["onClick"], br = { class: "count" }, vr = { class: "fo-up-groups-actions" }, fr = {
  key: 0,
  class: "fo-up-members-strip"
}, gr = { class: "fo-up-members-label" }, mr = { class: "fo-up-members-list" }, yr = ["title", "onClick", "onContextmenu"], hr = ["src"], _r = { class: "fo-bili-toolbar" }, kr = { class: "fo-feed-count-tag" }, $r = {
  key: 1,
  class: "fo-bili-loading"
}, wr = {
  key: 2,
  class: "fo-bili-empty"
}, Cr = {
  key: 3,
  class: "fo-bili-grid"
}, xr = {
  key: 0,
  class: "fo-bili-empty"
}, Sr = ["onDragstart"], Tr = { class: "fo-bili-thumb" }, Mr = ["href", "onClick"], Dr = ["src"], Pr = { class: "fo-bili-count" }, zr = { class: "fo-bili-duration" }, Br = { class: "fo-bili-title-row" }, Ir = ["href", "onClick"], Rr = ["aria-expanded", "onClick"], Lr = {
  key: 0,
  class: "fo-card-menu"
}, Ar = ["onClick"], Er = ["onClick"], Ur = ["onClick"], Vr = ["onClick"], Fr = { class: "fo-bili-meta" }, Nr = ["onClick"], qr = { class: "fo-pager" }, Gr = ["disabled"], Or = { class: "fo-page-num" }, Hr = ["disabled"], Wr = {
  key: 4,
  id: "fo-vue-subscription-main",
  class: "fo-bili-main fo-vue-subscription-main"
}, jr = { class: "bili-sub-vue-shell" }, Yr = {
  key: 0,
  class: "fo-bili-loading"
}, Xr = {
  key: 1,
  class: "fo-bili-empty"
}, Kr = {
  key: 2,
  class: "bili-sub-layout bili-sub-vue-layout"
}, Qr = {
  key: 5,
  id: "fo-vue-radio-main",
  class: "fo-bili-main fo-vue-radio-main"
}, Jr = { class: "fo-bili-hero fo-radio-hero" }, Zr = { class: "fo-bili-actions" }, eu = { class: "bili-radio-layout fo-vue-radio-layout" }, tu = { class: "bili-radio-folders" }, iu = { id: "bili-radio-folders" }, ou = ["onClick"], su = {
  key: 0,
  class: "muted small"
}, lu = { class: "bili-radio-library" }, nu = {
  key: 0,
  role: "alert",
  class: "muted small"
}, au = {
  id: "bili-radio-videos",
  class: "bili-radio-videos"
}, ru = ["title", "onDragstart", "onClick"], uu = ["src"], du = { key: 1 }, cu = {
  key: 0,
  class: "muted small"
}, pu = { class: "bili-radio-editor" }, bu = { class: "bili-radio-name-row" }, vu = ["placeholder", "onKeydown"], fu = { class: "bili-radio-btn-group" }, gu = { class: "bili-radio-series-dropdown-wrap" }, mu = {
  value: "",
  disabled: "",
  selected: ""
}, yu = ["value"], hu = {
  id: "bili-radio-queue",
  class: "bili-radio-queue",
  "aria-label": "电台播放队列"
}, _u = ["onClick"], ku = { class: "bili-radio-queue-no" }, $u = ["src"], wu = { key: 1 }, Cu = ["aria-label", "onClick"], xu = {
  key: 0,
  class: "muted small"
}, Su = { class: "bili-radio-actions" }, Tu = ["disabled"], Mu = ["disabled"], Du = ["title"], Pu = {
  key: 2,
  class: "fo-context-divider"
}, zu = /* @__PURE__ */ ze({
  __name: "BilibiliWorkspace",
  setup(ke) {
    const g = x(!1);
    function T() {
      const n = D.radioSeriesName?.trim();
      if (!n) {
        g.value = !0;
        const t = document.getElementById("bili-radio-name");
        t && t.focus(), He.fetch("哔哩哔哩电台", "请先在输入框中填写系列名称后再保存");
        return;
      }
      g.value = !1, r("radio-save", { name: n });
    }
    async function m() {
      const n = document.getElementById("bili-radio-name");
      n && (n.focus(), n.select(), He.fetch("哔哩哔哩电台", "已聚焦系列名称输入框，直接修改后点击“💾 保存系列”即可"));
    }
    function P(n) {
      const t = n.target, i = t.value;
      if (i) {
        if (i === "__create_new__") {
          r("radio-clear"), D.radioSeriesName = "", He.fetch("哔哩哔哩电台", "已开启新系列创作，请从左侧添加视频"), t.value = "";
          return;
        }
        r("radio-load-series", i);
      }
    }
    function V(n, t) {
      !t.mid && !t.name || Ie.showUpRecentVideosPreview(
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
    const C = oe(() => {
      const n = nt.unreadCounts;
      return (n.reply || 0) + (n.at || 0) + (n.like || 0) + (n.system || 0) + (n.private || 0);
    });
    function I() {
      Ct.togglePanel();
    }
    const l = oe(() => D.organizer), { active: $ } = kt("daily-bilibili", "/bilibili.html");
    ge(() => $.value && l.value.mode === "recommendations", (n) => {
      Ie.setRecommendationsActive(n);
    }, { immediate: !0, flush: "sync" }), ge(() => $.value && l.value.mode === "following", (n) => {
      Ie.setFollowingActive(n);
    }, { immediate: !0, flush: "sync" }), ge(() => $.value && l.value.mode === "subscription", (n) => {
      Ie.setSubscriptionActive(n);
    }, { immediate: !0, flush: "sync" });
    const A = x(l.value.query), S = x(!1), N = x(!1), F = x(""), G = x({ visible: !1, x: 0, y: 0, video: null, folder: null }), { menuRef: j, style: be } = xt({
      visible: () => G.value.visible,
      anchor: () => G.value,
      dismiss: () => {
        G.value.visible = !1;
      }
    }), X = x(
      typeof localStorage < "u" && localStorage.getItem("bili_sidebar_features_collapsed") === "true"
    );
    function ve() {
      X.value = !X.value;
      try {
        localStorage.setItem("bili_sidebar_features_collapsed", String(X.value));
      } catch {
      }
    }
    function fe() {
      ce.bvid && _t.open({
        bvid: ce.bvid,
        cid: ce.cid,
        title: ce.title
      });
    }
    function te() {
      ce.collapsed && We.toggleCollapse(), We.bringToFront();
    }
    function R() {
      We.close();
    }
    ge(() => l.value.query, (n) => {
      A.value = n;
    });
    function r(n, t) {
      Re.dispatch(n, t);
    }
    function q(n) {
      r(n.group ? "toggle-folder-group" : "select-folder", { id: n.id, kind: n.kind });
    }
    const H = x(""), K = x(""), Z = x("before"), $e = x(!1);
    function Ae(n, t) {
      t.kind === "created" && (H.value = t.id, n.dataTransfer?.setData("application/x-logicweaver-favorite-node", t.id), n.dataTransfer?.setData("text/plain", t.id), n.dataTransfer && (n.dataTransfer.effectAllowed = "move"));
    }
    function Ee(n, t) {
      if (t.kind !== "created" || !H.value || H.value === t.id) return;
      n.preventDefault(), n.dataTransfer && (n.dataTransfer.dropEffect = "move");
      const i = n.currentTarget;
      if (!i) return;
      const c = i.getBoundingClientRect(), z = (n.clientY - c.top) / Math.max(1, c.height), de = t.group && z > 0.25 && z < 0.75 ? "into" : z >= 0.5 ? "after" : "before";
      K.value = t.id, Z.value = de;
    }
    function Ue(n, t) {
      const i = n.relatedTarget, c = n.currentTarget;
      c && i && c.contains(i) || K.value === t.id && (K.value = "");
    }
    function Ce() {
      H.value = "", K.value = "", $e.value = !1;
    }
    function Ve(n, t) {
      n.preventDefault();
      const i = H.value || n.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "", c = Z.value || (t.group ? "into" : "after");
      Ce(), !(!i || i === t.id || t.kind !== "created") && r("move-folder-node", { sourceId: i, targetId: t.id, mode: c });
    }
    function h(n) {
      H.value && (n.preventDefault(), n.dataTransfer && (n.dataTransfer.dropEffect = "move"), $e.value = !0);
    }
    function d(n) {
      const t = n.relatedTarget, i = n.currentTarget;
      i && t && i.contains(t) || ($e.value = !1);
    }
    function b(n) {
      n.preventDefault();
      const t = H.value || n.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
      Ce(), t && r("move-folder-node", { sourceId: t, targetId: "root", mode: "into" });
    }
    function M() {
      const n = A.value.trim();
      r("organizer-search", n);
    }
    const Q = x(""), re = x(!1), me = x(!1), we = x("📺 B站 热门视频推荐"), xe = x("回车可在 B站 全网搜索"), le = x([]), Se = x(null), Te = x([]);
    let Me = 0, Fe = null;
    function Ge(n) {
      if (!n) return null;
      const t = n.bvid || (String(n.param || "").startsWith("BV") ? n.param : "");
      if (!t && !n.aid && !n.id) return null;
      const i = String(n.pic || n.cover || "").replace(/^http:/, "https:"), c = i.startsWith("//") ? `https:${i}` : i, z = String(n.title || "").replace(/<[^>]+>/g, ""), de = Number(n.duration || 0), vt = de > 0 ? `${Math.floor(de / 60)}:${String(de % 60).padStart(2, "0")}` : String(n.duration || ""), Ke = n.stat?.view || n.play || 0, ft = Number(Ke) >= 1e4 ? `${(Number(Ke) / 1e4).toFixed(1)}万` : String(Number(Ke || 0)), gt = n.owner?.name || n.name || n.author || "UP主";
      return {
        bvid: t,
        aid: String(n.aid || n.id || ""),
        title: z,
        cover: c,
        durationText: vt,
        playText: ft,
        upper: gt
      };
    }
    async function _() {
      if (we.value = "📺 B站 热门视频推荐", xe.value = "回车可在 B站 全网搜索", re.value = !0, Te.value.length && Date.now() - Me < 9e4) {
        le.value = Te.value;
        return;
      }
      me.value = !0;
      try {
        const t = await (await fetch("https://api.bilibili.com/x/web-interface/index/top/feed/rcmd?ps=8&fresh_idx=1", { credentials: "include" })).json();
        let i = Array.isArray(t.data?.item) ? t.data.item : [];
        if (!i.length) {
          const de = await (await fetch("https://api.bilibili.com/x/web-interface/popular?ps=8&pn=1", { credentials: "include" })).json();
          i = Array.isArray(de.data?.list) ? de.data.list : [];
        }
        const c = i.map(Ge).filter(Boolean);
        Te.value = c, Me = Date.now(), Q.value.trim() || (le.value = c);
      } catch {
        le.value = [];
      } finally {
        me.value = !1;
      }
    }
    function f() {
      Q.value.trim() ? k(Q.value.trim()) : _();
    }
    function p() {
      const n = Q.value.trim();
      if (clearTimeout(Fe), !n) {
        _();
        return;
      }
      Fe = setTimeout(() => {
        k(n);
      }, 320);
    }
    async function k(n) {
      re.value = !0, we.value = `🔍 “${n}” 的视频`, xe.value = "右键可收藏、缓存或本地播放", me.value = !0;
      try {
        let t = null;
        if (window.LogicWeaverBiliSearchActions?.search)
          try {
            t = await window.LogicWeaverBiliSearchActions.search(n);
          } catch {
          }
        if (!t || t.code !== 0) {
          const c = `search_type=video&keyword=${encodeURIComponent(n)}&page=1&page_size=12`;
          t = await (await fetch(`https://api.bilibili.com/x/web-interface/search/type?${c}`, { credentials: "include" })).json();
        }
        if (Q.value.trim() !== n) return;
        const i = Array.isArray(t?.data?.result) ? t.data.result : [];
        le.value = i.slice(0, 10).map(Ge).filter(Boolean);
      } catch {
        le.value = [];
      } finally {
        me.value = !1;
      }
    }
    function U(n) {
      re.value = !1;
      const t = n.bvid || (String(n.param || n.id || "").startsWith("BV") ? n.param || n.id : "");
      t || n.aid ? We.openVideo({
        bvid: t,
        aid: n.aid,
        title: n.title,
        cover: n.cover,
        author: n.upper
      }) : window.LogicWeaverBiliSearchActions?.local ? window.LogicWeaverBiliSearchActions.local(n) : window.open(`https://www.bilibili.com/video/${t || n.bvid || n.id}`, "_blank");
    }
    function E(n, t) {
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
      const n = Q.value.trim();
      if (re.value = !1, !n) {
        _();
        return;
      }
      window.open(`https://search.bilibili.com/video?keyword=${encodeURIComponent(n)}`, "_blank");
    }
    function ee(n) {
      Se.value && !Se.value.contains(n.target) && (re.value = !1);
    }
    function J(n) {
      G.value.visible = !1, F.value = F.value === n ? "" : n;
    }
    function Ne(n, t, i = !0) {
      F.value = "", G.value = {
        visible: !0,
        x: n.clientX,
        y: n.clientY,
        video: t,
        folder: i && D.activeFolderId ? { id: String(D.activeFolderId), title: l.value.folderTitle } : null
      };
    }
    function Be(n) {
      if (n instanceof KeyboardEvent) {
        n.key === "Escape" && (F.value = "", G.value.visible = !1, l.value.isTargetPickMode && r("organizer-cancel-move-target"));
        return;
      }
      const t = n.target;
      t?.closest(".fo-card-menu, .fo-card-more") || (F.value = ""), t?.closest(".fo-context-menu") || (G.value.visible = !1);
    }
    const qe = typeof document < "u" && document.body.classList.contains("bili-standalone-body");
    function Oe() {
      !N.value || S.value || l.value.loading || (S.value = !0, r("organizer-open"));
    }
    ge(() => l.value.loading, (n) => {
      !n && !l.value.folders.length && Oe();
    }), Ye(() => {
      import("./bilibili-channel.service-DIZXixUv.js").catch((n) => console.error("[Bilibili] 频道动作服务加载失败", n)), N.value = !0, Re.loadOrganizer(), Oe(), document.addEventListener("pointerdown", Be, !0), document.addEventListener("pointerdown", ee), window.addEventListener("keydown", Be), window.setBiliMiniDockVisible?.(!0), requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }), ge(() => [l.value.videos, l.value.mode], () => {
      requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }, { flush: "post" }), ht(() => {
      Ie.setRecommendationsActive(!1), Ie.setFollowingActive(!1), Ie.setSubscriptionActive(!1), N.value = !1, document.removeEventListener("pointerdown", Be, !0), document.removeEventListener("pointerdown", ee), window.removeEventListener("keydown", Be);
    });
    function ue(n, t) {
      F.value = "", G.value.visible = !1;
      const i = String(typeof n == "object" ? n.id || n.bvid || n.aid || "" : n), c = typeof n == "object" ? n : l.value.videos.find((z) => String(z.id) === i);
      r("organizer-video-action", { id: i, video: c, action: t });
    }
    async function ye(n) {
      const { video: t, folder: i } = G.value;
      if (G.value.visible = !1, n === "share-chat") {
        if (!t) return;
        try {
          const { chatService: c } = await import("./view-styles-DcR4NtZM.js").then((de) => de.aL), { windowManagerController: z } = await import("./window-manager.store-D_Nuf9-p.js").then((de) => de.n);
          c.sendBiliShare({
            bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
            aid: t.aid,
            title: t.title,
            cover: t.cover,
            upName: t.author,
            upMid: t.authorMid,
            upFace: t.authorFace,
            play: t.playCount
          }), z.open("chat");
        } catch (c) {
          console.warn("分享到聊天室失败", c);
        }
        return;
      }
      t && r("organizer-video-action", { id: t.id || "", video: t, action: n });
    }
    function dt(n) {
      const t = D.radioSeriesName?.trim();
      let i = D.radioSeries.find((c) => c.name === t);
      if (!i && D.radioQueue.length && (i = {
        id: `series_${Date.now()}`,
        name: t || "未命名电台系列",
        count: D.radioQueue.length,
        items: D.radioQueue
      }), !i || !i.items?.length) {
        He.fetch("哔哩哔哩电台", "当前没有可分享的系列曲目，请先添加曲目");
        return;
      }
      lt.sendBiliSeriesShare(i, n);
    }
    function ct(n) {
      const { video: t } = G.value;
      G.value.visible = !1, t && lt.sendBiliShare({
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
    function pt(n) {
      if (!l.value.isTargetPickMode) return;
      if (!n.target?.closest(".fo-bili-folder-list")) {
        const i = document.querySelector(".fo-bili-folder-list");
        i && (n.preventDefault(), i.scrollTop += n.deltaY);
      }
    }
    function tt(n) {
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
    function Xe(n, t) {
      if (!n.dataTransfer) return;
      n.dataTransfer.effectAllowed = "copyMove", n.dataTransfer.setData("text/uri-list", t.url), n.dataTransfer.setData("text/plain", t.url), n.dataTransfer.setData("application/x-logicweaver-video-url", t.url), n.dataTransfer.setData("application/x-logicweaver-task", JSON.stringify({ type: "material", title: t.title, url: t.url, source: "B站收藏" }));
      const i = t.bvid || t.url?.match(/video\/(BV[0-9a-zA-Z]+)/)?.[1] || t.id, c = JSON.stringify({
        type: "bili-cassette-tape",
        bvid: i,
        title: t.title,
        cover: t.cover,
        author: t.author,
        duration: t.duration
      });
      n.dataTransfer.setData("application/x-bili-cassette", c), n.dataTransfer.setData("application/json", c);
      const z = tt(t.title);
      n.dataTransfer.setDragImage(z, 72, 25), setTimeout(() => {
        z.parentNode && z.parentNode.removeChild(z);
      }, 0);
    }
    function bt(n, t) {
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
      const c = tt(t.title);
      n.dataTransfer.setDragImage(c, 72, 25), setTimeout(() => {
        c.parentNode && c.parentNode.removeChild(c);
      }, 0);
    }
    return (n, t) => (o(), s("section", {
      id: "daily-bilibili",
      class: B(["card wide", { "card-fullscreen": u(qe) || u(Qe).activeId === "daily-bilibili" }])
    }, [
      e("header", Al, [
        t[52] || (t[52] = e("div", { class: "bili-header-left" }, [
          e("span", {
            class: "bar",
            style: { background: "linear-gradient(180deg,#818cf8,#f472b6)" }
          }),
          e("h2", null, "B站收藏夹")
        ], -1)),
        e("div", El, [
          e("button", {
            id: "bili-header-msg-center-btn",
            class: B(["fm-tab bili-header-msg-btn", { "has-unread": C.value > 0, "is-active": u(nt).isOpen }]),
            type: "button",
            title: C.value > 0 ? `B站互动消息 (${C.value} 条未读)` : "B站互动消息中心",
            onClick: I
          }, [
            t[49] || (t[49] = e("span", { class: "bili-header-msg-icon" }, "🔔", -1)),
            t[50] || (t[50] = e("span", { class: "bili-header-msg-label" }, "消息", -1)),
            C.value > 0 ? (o(), s("span", Vl, a(C.value > 99 ? "99+" : C.value), 1)) : y("", !0)
          ], 10, Ul),
          e("div", {
            class: "card-fullscreen-bili-search",
            ref_key: "searchHostRef",
            ref: Se
          }, [
            e("form", {
              class: "card-fullscreen-bili-searchbar",
              role: "search",
              onSubmit: w(W, ["prevent"])
            }, [
              ie(e("input", {
                "onUpdate:modelValue": t[0] || (t[0] = (i) => Q.value = i),
                type: "search",
                autocomplete: "off",
                placeholder: "搜索 B站 视频…",
                "aria-label": "搜索 B站 视频",
                onFocus: f,
                onInput: p
              }, null, 544), [
                [he, Q.value]
              ]),
              t[51] || (t[51] = e("button", {
                type: "submit",
                title: "搜索视频"
              }, "⌕", -1))
            ], 32),
            re.value ? (o(), s("div", Fl, [
              e("div", Nl, [
                e("span", null, a(we.value), 1),
                e("small", null, a(xe.value), 1)
              ]),
              me.value ? (o(), s("p", ql, "正在获取推荐 / 搜索中…")) : !le.value.length && !me.value ? (o(), s("p", Gl, "没有找到相关视频，回车可在 B站 全网搜索")) : (o(!0), s(L, { key: 2 }, O(le.value, (i) => (o(), s("button", {
                key: i.bvid || i.aid,
                type: "button",
                class: "card-fullscreen-bili-video-row",
                role: "option",
                onClick: (c) => U(i),
                onContextmenu: w((c) => E(c, i), ["prevent"])
              }, [
                e("span", Hl, [
                  e("img", {
                    src: i.cover,
                    alt: "",
                    referrerpolicy: "no-referrer",
                    loading: "lazy"
                  }, null, 8, Wl),
                  i.durationText ? (o(), s("i", jl, a(i.durationText), 1)) : y("", !0)
                ]),
                e("span", Yl, [
                  e("strong", null, a(i.title), 1),
                  e("small", null, a(i.upper) + " · " + a(i.playText) + "播放", 1)
                ])
              ], 40, Ol))), 128))
            ])) : y("", !0)
          ], 512),
          e("button", {
            id: "bili-up-group-manager-top",
            class: "fm-tab bili-header-up-group-btn",
            type: "button",
            title: "管理正在关注的 UP 主分组",
            onClick: t[1] || (t[1] = (i) => r("manage-up-groups"))
          }, " ⚙ 关注分组管理 ")
        ])
      ]),
      e("div", Xl, [
        e("div", Kl, [
          e("div", {
            class: B(["fo-bili-layout", { "fo-picking-move-target": l.value.isTargetPickMode }]),
            "data-vue-organizer-shell": "true",
            onWheel: pt
          }, [
            e("aside", Ql, [
              e("div", {
                class: B(["fo-sidebar-toggle-bar", { "is-collapsed": X.value }]),
                title: X.value ? "点击展开快捷功能" : "点击收起快捷功能",
                onClick: ve
              }, [
                e("div", Zl, [
                  t[53] || (t[53] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                  t[54] || (t[54] = e("span", null, "快捷频道", -1)),
                  X.value ? (o(), s("span", en, "5")) : y("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "fo-sidebar-toggle-action",
                  "aria-expanded": !X.value,
                  title: X.value ? "展开" : "收起"
                }, [
                  e("span", null, a(X.value ? "展开" : "收起"), 1),
                  e("span", on, a(X.value ? "▾" : "▴"), 1)
                ], 8, tn)
              ], 10, Jl),
              ie(e("div", sn, [
                e("div", ln, [
                  e("button", {
                    id: "fo-sidebar-sub-btn",
                    type: "button",
                    class: B(["fo-sidebar-sub-btn", { on: l.value.mode === "subscription" }]),
                    title: "查看订阅视频（刹那观察室 · AI字幕与高清播放）",
                    onClick: t[2] || (t[2] = (i) => r("open-sub-video"))
                  }, [...t[55] || (t[55] = [
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
                e("div", nn, [
                  e("button", {
                    id: "fo-sidebar-cache-btn",
                    type: "button",
                    class: B(["fo-sidebar-sub-btn", { on: l.value.mode === "cache" }]),
                    title: "查看已经下载到本地文件夹的视频",
                    onClick: t[3] || (t[3] = (i) => r("open-cache"))
                  }, [...t[56] || (t[56] = [
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
                e("div", an, [
                  e("button", {
                    id: "fo-sidebar-following-btn",
                    type: "button",
                    class: B(["fo-sidebar-sub-btn", { on: l.value.mode === "following" }]),
                    title: "查看正在关注的 UP 主及分组视频",
                    onClick: t[4] || (t[4] = (i) => r("open-following"))
                  }, [...t[57] || (t[57] = [
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
                e("div", rn, [
                  e("button", {
                    id: "fo-sidebar-recommend-btn",
                    type: "button",
                    class: B(["fo-sidebar-sub-btn", { on: l.value.mode === "recommendations" }]),
                    title: "打开 B站个性推荐",
                    onClick: t[5] || (t[5] = (i) => r("open-recommendations"))
                  }, [...t[58] || (t[58] = [
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
                e("div", un, [
                  e("button", {
                    id: "fo-sidebar-radio-btn",
                    type: "button",
                    class: B(["fo-sidebar-sub-btn", { on: l.value.mode === "radio" }]),
                    title: "打开 B站电台（按收藏夹与系列自由编排连播）",
                    onClick: t[6] || (t[6] = (i) => r("open-radio"))
                  }, [...t[59] || (t[59] = [
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
                [et, !X.value]
              ]),
              e("div", dn, [
                t[60] || (t[60] = e("div", { class: "fo-sidebar-sub-main" }, [
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
                  onClick: t[7] || (t[7] = (i) => r("create-bili-folder"))
                }, "＋")
              ]),
              l.value.isTargetPickMode ? (o(), s("div", cn, [
                t[61] || (t[61] = e("div", { class: "fo-move-target-tip" }, [
                  e("span", { class: "fo-move-target-dot" }),
                  e("span", null, [
                    ae("请点击"),
                    e("strong", null, "自建收藏夹"),
                    ae("移入")
                  ])
                ], -1)),
                e("button", {
                  type: "button",
                  class: "fo-move-target-cancel",
                  title: "取消移动 (按 Esc 也可取消)",
                  onClick: t[8] || (t[8] = (i) => r("organizer-cancel-move-target"))
                }, " ✕ 取消 ")
              ])) : y("", !0),
              e("nav", pn, [
                (o(!0), s(L, null, O(l.value.folders, (i, c) => (o(), s(L, {
                  key: `${i.group ? "group" : "folder"}:${i.id}`
                }, [
                  c > 0 && l.value.folders[c - 1]?.kind !== i.kind ? (o(), s("div", bn)) : y("", !0),
                  c === 0 || l.value.folders[c - 1]?.kind !== i.kind ? (o(), s("div", {
                    key: 1,
                    class: B(["fo-bili-section-head fo-vue-section-head", { "drag-into": i.kind === "created" && $e.value }]),
                    onDragover: (z) => i.kind === "created" ? h(z) : void 0,
                    onDragleave: (z) => i.kind === "created" ? d(z) : void 0,
                    onDrop: (z) => i.kind === "created" ? b(z) : void 0
                  }, [
                    e("span", fn, [
                      e("b", null, a(i.kind === "collected" ? "我追的合集/收藏夹" : i.kind === "other" ? "其他收藏" : "我创建的收藏夹"), 1)
                    ]),
                    i.kind === "created" ? (o(), s("button", {
                      key: 0,
                      class: "fo-bili-section-add-btn",
                      type: "button",
                      title: "新建插件分组",
                      "aria-label": "新建插件分组",
                      onClick: t[9] || (t[9] = w((z) => r("create-local-group"), ["stop"]))
                    }, "＋")) : y("", !0)
                  ], 42, vn)) : y("", !0),
                  i.group ? (o(), s("div", {
                    key: 3,
                    class: B(["fo-bili-group-label", {
                      collapsed: i.collapsed,
                      dragging: H.value === i.id,
                      "drag-before": K.value === i.id && Z.value === "before",
                      "drag-after": K.value === i.id && Z.value === "after",
                      "drag-into": K.value === i.id && Z.value === "into"
                    }]),
                    style: _e({ "--fo-depth": i.depth }),
                    role: "button",
                    tabindex: "0",
                    "aria-expanded": !i.collapsed,
                    draggable: !0,
                    onClick: (z) => q(i),
                    onKeydown: [
                      Pe(w((z) => q(i), ["prevent"]), ["enter"]),
                      Pe(w((z) => q(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (z) => Ae(z, i),
                    onDragover: (z) => Ee(z, i),
                    onDragleave: (z) => Ue(z, i),
                    onDrop: (z) => Ve(z, i),
                    onDragend: Ce
                  }, [
                    e("i", yn, a(i.collapsed ? "›" : "⌄"), 1),
                    t[63] || (t[63] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, a(i.title), 1),
                    e("small", null, a(i.count), 1)
                  ], 46, mn)) : (o(), s("div", {
                    key: 2,
                    role: "button",
                    tabindex: "0",
                    class: B(["fo-bili-folder", {
                      on: i.selected,
                      dragging: H.value === i.id,
                      "drag-before": K.value === i.id && Z.value === "before",
                      "drag-after": K.value === i.id && Z.value === "after",
                      "drag-into": K.value === i.id && Z.value === "into",
                      "target-candidate": l.value.isTargetPickMode && i.kind === "created" && !i.selected
                    }]),
                    "data-folder-id": i.id,
                    "data-folder-kind": i.kind,
                    style: _e({ "--fo-depth": i.depth }),
                    draggable: i.kind === "created",
                    onClick: (z) => q(i),
                    onKeydown: [
                      Pe(w((z) => q(i), ["prevent"]), ["enter"]),
                      Pe(w((z) => q(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (z) => Ae(z, i),
                    onDragover: (z) => Ee(z, i),
                    onDragleave: (z) => Ue(z, i),
                    onDrop: (z) => Ve(z, i),
                    onDragend: Ce
                  }, [
                    t[62] || (t[62] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, a(i.title), 1),
                    e("small", null, a(i.count), 1)
                  ], 46, gn))
                ], 64))), 128)),
                !l.value.loading && !l.value.error && !l.value.folders.length ? (o(), s("p", hn, "暂无可用收藏夹。")) : y("", !0)
              ])
            ]),
            l.value.mode === "organizer" ? (o(), s("section", _n, [
              l.value.loading ? (o(), s("div", kn, [...t[64] || (t[64] = [
                e("i", null, null, -1),
                e("span", null, "正在读取 B站收藏内容…", -1)
              ])])) : l.value.error && l.value.error.includes("未登录") ? (o(), s("div", $n, [
                e("div", wn, [
                  t[66] || (t[66] = e("span", { class: "fo-bili-login-icon" }, "📺", -1)),
                  t[67] || (t[67] = e("h3", null, "未检测到哔哩哔哩登录状态", -1)),
                  t[68] || (t[68] = e("p", null, "tab-Project 直接复用当前浏览器的 B站 网页会话，无需输入账号密码或扫码授权。", -1)),
                  e("div", Cn, [
                    t[65] || (t[65] = e("a", {
                      class: "fo-bili-btn-login",
                      href: "https://passport.bilibili.com/login",
                      target: "_blank",
                      rel: "noreferrer"
                    }, "前往 bilibili.com 登录 ↗", -1)),
                    e("button", {
                      type: "button",
                      class: "fo-bili-btn-refresh",
                      onClick: t[10] || (t[10] = (i) => r("organizer-refresh"))
                    }, "已登录，点击刷新 ↻")
                  ])
                ])
              ])) : l.value.error ? (o(), s("p", xn, a(l.value.error), 1)) : (o(), s(L, { key: 3 }, [
                e("header", Sn, [
                  e("div", Tn, [
                    e("div", {
                      class: B(["fo-bili-cover", { "fo-vue-cover-image": l.value.folderCover }])
                    }, [
                      l.value.folderCover ? (o(), s("img", {
                        key: 0,
                        src: l.value.folderCover,
                        alt: "",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Mn)) : (o(), s("i", Dn))
                    ], 2),
                    e("div", Pn, [
                      e("h3", null, a(l.value.folderTitle), 1),
                      e("p", null, a(l.value.folderSubtitle), 1)
                    ])
                  ]),
                  pe(Ll, { "inline-hero": "" }),
                  e("div", zn, [
                    e("button", {
                      type: "button",
                      class: "primary",
                      disabled: !l.value.videos.length,
                      onClick: t[11] || (t[11] = (i) => r("organizer-batch-toggle"))
                    }, a(l.value.batchMode ? "返回" : "批量操作"), 9, Bn),
                    e("button", {
                      type: "button",
                      title: "刷新收藏夹",
                      onClick: t[12] || (t[12] = (i) => r("organizer-refresh"))
                    }, "↻")
                  ])
                ]),
                e("div", In, [
                  l.value.batchMode ? y("", !0) : (o(), s("div", Rn, [
                    (o(), s(L, null, O([{ id: "fav_time", text: "最近收藏" }, { id: "view", text: "最多播放" }, { id: "pubtime", text: "最近投稿" }], (i) => e("button", {
                      key: i.id,
                      type: "button",
                      class: B({ on: l.value.sort === i.id }),
                      onClick: (c) => r("organizer-sort", i.id)
                    }, a(i.text), 11, Ln)), 64))
                  ])),
                  e("div", An, [
                    u(ce).isOpen && u(ce).bvid ? (o(), s("div", {
                      key: 0,
                      class: B(["fo-video-tab-item", { "is-collapsed": u(ce).collapsed }]),
                      title: u(ce).title
                    }, [
                      e("div", {
                        class: "fo-video-tab-meta",
                        onClick: te
                      }, [
                        e("span", {
                          class: B(["fo-video-tab-pulse", { playing: u(ce).isPlaying }])
                        }, null, 2),
                        e("span", Un, a(u(ce).title), 1)
                      ]),
                      e("div", Vn, [
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-close",
                          title: "关闭视频",
                          onClick: w(R, ["stop"])
                        }, " ✕ "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-sub",
                          title: "查看该视频完整纯文本字幕",
                          onClick: w(fe, ["stop"])
                        }, " 字幕 "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-expand",
                          title: u(ce).collapsed ? "放大恢复视频小窗" : "聚焦视频小窗",
                          onClick: w(te, ["stop"])
                        }, " 放大 ", 8, Fn)
                      ])
                    ], 10, En)) : y("", !0)
                  ]),
                  l.value.batchMode ? (o(), s("div", Nn, [
                    e("span", qn, "已选择 " + a(l.value.selectedCount) + " 项", 1),
                    e("button", {
                      type: "button",
                      onClick: t[14] || (t[14] = (i) => r("organizer-batch-all"))
                    }, "全选/取消全选"),
                    e("button", {
                      type: "button",
                      class: B({ "picking-target": l.value.isTargetPickMode }),
                      onClick: t[15] || (t[15] = (i) => l.value.isTargetPickMode ? r("organizer-cancel-move-target") : r("organizer-batch-move"))
                    }, a(l.value.isTargetPickMode ? "✕ 取消移动" : "移动到"), 3),
                    e("button", {
                      type: "button",
                      onClick: t[16] || (t[16] = (i) => r("organizer-batch-cache"))
                    }, "缓存所选"),
                    e("button", {
                      type: "button",
                      onClick: t[17] || (t[17] = (i) => r("organizer-batch-unfavorite"))
                    }, "取消收藏")
                  ])) : (o(), s("form", {
                    key: 1,
                    class: "fo-bili-search",
                    onSubmit: w(M, ["prevent"])
                  }, [
                    ie(e("input", {
                      "onUpdate:modelValue": t[13] || (t[13] = (i) => A.value = i),
                      type: "search",
                      placeholder: "请输入关键词",
                      "aria-label": "搜索当前收藏夹"
                    }, null, 512), [
                      [he, A.value]
                    ]),
                    t[69] || (t[69] = e("button", {
                      type: "submit",
                      title: "搜索"
                    }, "⌕", -1))
                  ], 32))
                ]),
                e("div", Gn, [
                  l.value.videos.length ? y("", !0) : (o(), s("p", On, a(l.value.query ? "没有找到匹配的视频。" : "这个收藏夹是空的。"), 1)),
                  (o(!0), s(L, null, O(l.value.videos, (i) => (o(), s("article", {
                    key: i.id,
                    class: B(["fo-bili-card", { "batch-selected": i.selected, "fo-single-moving": l.value.movingVideoId === i.id }]),
                    "data-batch-id": i.id,
                    draggable: "true",
                    onDragstart: (c) => Xe(c, i),
                    onContextmenu: w((c) => Ne(c, i), ["prevent", "stop"])
                  }, [
                    e("div", Wn, [
                      l.value.batchMode ? (o(), s("label", jn, [
                        e("input", {
                          type: "checkbox",
                          checked: i.selected,
                          onChange: (c) => r("organizer-batch-select", i.id)
                        }, null, 40, Yn),
                        t[70] || (t[70] = e("span", null, "✓", -1))
                      ])) : y("", !0),
                      e("a", {
                        class: "fo-cover-link",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: w((c) => r("organizer-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, Kn)
                      ], 8, Xn),
                      e("span", Qn, "▣ " + a(i.playCount), 1),
                      e("span", Jn, a(i.duration), 1)
                    ]),
                    e("div", Zn, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: w((c) => r("organizer-play-video", i), ["prevent"])
                      }, a(i.title), 9, ea),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": F.value === i.id,
                        onClick: w((c) => J(i.id), ["stop"])
                      }, "⋮", 8, ta),
                      F.value === i.id ? (o(), s("div", ia, [
                        i.writable ? (o(), s("button", {
                          key: 0,
                          type: "button",
                          class: "danger",
                          onClick: (c) => ue(i.id, "delete")
                        }, "取消收藏", 8, oa)) : y("", !0),
                        i.writable ? (o(), s("button", {
                          key: 1,
                          type: "button",
                          onClick: (c) => ue(i.id, "move")
                        }, "移动到", 8, sa)) : y("", !0),
                        e("button", {
                          type: "button",
                          onClick: (c) => ue(i.id, "subtitle")
                        }, "字幕", 8, la)
                      ])) : y("", !0)
                    ]),
                    e("div", na, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: w((c) => V(c, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, a(i.author), 9, aa),
                      e("span", null, "收藏于 " + a(i.favoriteDate), 1)
                    ])
                  ], 42, Hn))), 128))
                ]),
                l.value.totalPages > 1 ? (o(), s("div", ra, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: l.value.page <= 1,
                    onClick: t[18] || (t[18] = (i) => r("organizer-page", l.value.page - 1))
                  }, "‹ 上一页", 8, ua),
                  e("span", da, a(l.value.page) + " / " + a(l.value.totalPages), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: l.value.page >= l.value.totalPages,
                    onClick: t[19] || (t[19] = (i) => r("organizer-page", l.value.page + 1))
                  }, "下一页 ›", 8, ca)
                ])) : y("", !0)
              ], 64))
            ])) : l.value.mode === "cache" ? (o(), s("section", pa, [
              e("header", ba, [
                e("div", va, [
                  t[72] || (t[72] = e("div", { class: "fo-bili-cover" }, "💾", -1)),
                  e("div", fa, [
                    t[71] || (t[71] = e("h3", null, "缓存视频", -1)),
                    e("p", null, a(l.value.cachedVideos.length) + " 个缓存记录 · 存放目录可在设置中选择", 1)
                  ])
                ]),
                e("div", ga, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    onClick: t[20] || (t[20] = (i) => r("organizer-open"))
                  }, "返回收藏夹"),
                  e("button", {
                    type: "button",
                    onClick: t[21] || (t[21] = (i) => r("cache-open-settings"))
                  }, "缓存设置")
                ])
              ]),
              l.value.cacheLoading ? (o(), s("div", ma, [...t[73] || (t[73] = [
                e("i", null, null, -1),
                e("span", null, "正在读取本地缓存…", -1)
              ])])) : (o(), s("div", ya, [
                l.value.cachedVideos.length ? y("", !0) : (o(), s("p", ha, "还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。")),
                (o(!0), s(L, null, O(l.value.cachedVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card fo-cached-video-card"
                }, [
                  e("div", _a, [
                    e("button", {
                      class: "fo-cached-play",
                      type: "button",
                      onClick: (c) => r("cache-play", i.id)
                    }, [
                      e("img", {
                        loading: "lazy",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, $a),
                      t[74] || (t[74] = e("span", { class: "fo-cached-local-badge" }, "LOCAL", -1))
                    ], 8, ka)
                  ]),
                  e("div", wa, [
                    e("button", {
                      class: "fo-title-link fo-bili-title fo-cached-title",
                      type: "button",
                      onClick: (c) => r("cache-play", i.id)
                    }, a(i.title), 9, Ca),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "删除缓存",
                      onClick: (c) => r("cache-delete", i.id)
                    }, "×", 8, xa)
                  ]),
                  e("div", Sa, [
                    e("span", null, a(i.sizeText), 1),
                    e("span", null, "缓存于 " + a(i.cachedDate), 1)
                  ])
                ]))), 128))
              ]))
            ])) : l.value.mode === "recommendations" ? (o(), s("section", Ta, [
              e("header", Ma, [
                t[75] || (t[75] = e("div", { class: "fo-bili-cover fo-vue-recommend-cover" }, [
                  e("span", null, "✨")
                ], -1)),
                e("div", Da, [
                  e("div", Pa, [
                    e("h3", null, a(l.value.specialTitle), 1),
                    e("span", za, a(l.value.specialBadge), 1)
                  ]),
                  e("p", null, a(l.value.specialSubtitle), 1)
                ]),
                e("div", Ba, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !l.value.specialVideos.length,
                    onClick: t[22] || (t[22] = (i) => r("special-play-page"))
                  }, "▶ 播放本页", 8, Ia),
                  e("button", {
                    type: "button",
                    onClick: t[23] || (t[23] = (i) => r("recommendations-refresh"))
                  }, "↻ 换一批"),
                  e("button", {
                    type: "button",
                    onClick: t[24] || (t[24] = (i) => r("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", Ra, [
                t[76] || (t[76] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "🔥 猜你喜欢与热门精选")
                ], -1)),
                e("div", La, "本页共 " + a(l.value.specialVideos.length) + " 个视频", 1)
              ]),
              l.value.specialLoading ? (o(), s("div", Aa, [...t[77] || (t[77] = [
                e("i", null, null, -1),
                e("span", null, "正在加载个性化推荐视频…", -1)
              ])])) : l.value.specialError ? (o(), s("p", Ea, a(l.value.specialError), 1)) : (o(), s("div", Ua, [
                l.value.specialVideos.length ? y("", !0) : (o(), s("p", Va, "暂无推荐视频。")),
                (o(!0), s(L, null, O(l.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (c) => Xe(c, i)
                }, [
                  e("div", Na, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: w((c) => r("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                        alt: ""
                      }, null, 8, Ga)
                    ], 8, qa),
                    e("span", Oa, "▣ " + a(i.playCount), 1),
                    e("span", Ha, a(i.duration), 1)
                  ]),
                  e("div", Wa, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: w((c) => r("special-play-video", i), ["prevent"])
                    }, a(i.title), 9, ja),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": F.value === i.id,
                      onClick: w((c) => J(i.id), ["stop"])
                    }, "⋮", 8, Ya),
                    F.value === i.id ? (o(), s("div", Xa, [
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          r("special-video-action", { video: i, id: i.id, action: "collect-inbox" }), F.value = "";
                        }
                      }, "📥 添加到收集箱", 8, Ka),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          r("special-video-action", { id: i.id, action: "play" }), F.value = "";
                        }
                      }, "本地播放与评论", 8, Qa),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          r("special-video-action", { id: i.id, action: "subtitle" }), F.value = "";
                        }
                      }, "字幕提取", 8, Ja),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          r("special-video-action", { id: i.id, action: "cache" }), F.value = "";
                        }
                      }, "缓存视频", 8, Za),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          r("special-video-action", { id: i.id, action: "open" }), F.value = "";
                        }
                      }, "打开网页", 8, er)
                    ])) : y("", !0)
                  ]),
                  e("div", tr, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: w((c) => V(c, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, a(i.author), 9, ir),
                    e("span", null, a(i.favoriteDate), 1)
                  ])
                ], 40, Fa))), 128))
              ]))
            ])) : l.value.mode === "following" ? (o(), s("section", or, [
              e("header", sr, [
                t[78] || (t[78] = e("div", { class: "fo-bili-cover fo-vue-following-cover" }, [
                  e("span", null, "📺")
                ], -1)),
                e("div", lr, [
                  e("div", nr, [
                    e("h3", null, a(l.value.specialTitle), 1),
                    e("span", ar, a(l.value.specialBadge), 1)
                  ]),
                  e("p", null, a(l.value.specialSubtitle), 1)
                ]),
                e("div", rr, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !l.value.specialVideos.length,
                    onClick: t[25] || (t[25] = (i) => r("special-play-page"))
                  }, "▶ 播放本页", 8, ur),
                  e("button", {
                    type: "button",
                    onClick: t[26] || (t[26] = (i) => r("following-refresh"))
                  }, "↻"),
                  e("button", {
                    type: "button",
                    onClick: t[27] || (t[27] = (i) => r("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", dr, [
                e("div", cr, [
                  (o(!0), s(L, null, O(l.value.followingGroups, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: B(["fo-up-group-chip", { active: i.active }]),
                    onClick: (c) => r("following-group", i.id)
                  }, [
                    ae(a(i.child ? "↳ " : "") + a(i.name) + " ", 1),
                    e("small", br, a(i.count), 1)
                  ], 10, pr))), 128))
                ]),
                e("div", vr, [
                  e("button", {
                    type: "button",
                    onClick: t[28] || (t[28] = (i) => r("following-manage-groups", "create"))
                  }, "＋ 新建分组"),
                  e("button", {
                    type: "button",
                    onClick: t[29] || (t[29] = (i) => r("following-manage-groups", "manage"))
                  }, "⚙️ 管理分组")
                ])
              ]),
              l.value.followingMembers.length ? (o(), s("div", fr, [
                e("div", gr, [
                  e("b", null, a(l.value.specialBadge), 1),
                  e("small", null, "共 " + a(l.value.followingMembers.length) + " 位 UP 主", 1)
                ]),
                e("div", mr, [
                  e("button", {
                    type: "button",
                    class: B(["fo-up-member-chip", { active: !l.value.followingMembers.some((i) => i.active) }]),
                    onClick: t[30] || (t[30] = (i) => r("following-member", ""))
                  }, "全部UP", 2),
                  (o(!0), s(L, null, O(l.value.followingMembers, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: B(["fo-up-member-chip", { active: i.active }]),
                    title: `左键筛选「${i.name}」，右键预览近期投稿`,
                    onClick: (c) => r("following-member", i.id),
                    onContextmenu: w((c) => r("following-preview-member", { id: i.id, clientX: c.clientX, clientY: c.clientY }), ["prevent"])
                  }, [
                    i.face ? (o(), s("img", {
                      key: 0,
                      loading: "lazy",
                      referrerpolicy: "no-referrer",
                      src: i.face,
                      alt: ""
                    }, null, 8, hr)) : y("", !0),
                    e("span", null, a(i.name), 1)
                  ], 42, yr))), 128))
                ]),
                e("button", {
                  type: "button",
                  class: "fo-btn-manage-members",
                  onClick: t[31] || (t[31] = (i) => r("following-manage-groups", "members"))
                }, "＋ 管理成员")
              ])) : y("", !0),
              e("div", _r, [
                t[79] || (t[79] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "⚡ UP 主最新投稿动态")
                ], -1)),
                e("div", kr, "本页共 " + a(l.value.specialVideos.length) + " 个视频", 1)
              ]),
              l.value.specialLoading ? (o(), s("div", $r, [...t[80] || (t[80] = [
                e("i", null, null, -1),
                e("span", null, "正在读取关注 UP 主更新…", -1)
              ])])) : l.value.specialError ? (o(), s("p", wr, a(l.value.specialError), 1)) : (o(), s("div", Cr, [
                l.value.specialVideos.length ? y("", !0) : (o(), s("p", xr, "暂无最新关注视频动态。")),
                (o(!0), s(L, null, O(l.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (c) => Xe(c, i)
                }, [
                  e("div", Tr, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: w((c) => r("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, Dr)
                    ], 8, Mr),
                    e("span", Pr, "▣ " + a(i.playCount), 1),
                    e("span", zr, a(i.duration), 1)
                  ]),
                  e("div", Br, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: w((c) => r("special-play-video", i), ["prevent"])
                    }, a(i.title), 9, Ir),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": F.value === i.id,
                      onClick: w((c) => J(i.id), ["stop"])
                    }, "⋮", 8, Rr),
                    F.value === i.id ? (o(), s("div", Lr, [
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          r("special-video-action", { video: i, id: i.id, action: "play" }), F.value = "";
                        }
                      }, "本地播放与评论", 8, Ar),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          r("special-video-action", { video: i, id: i.id, action: "subtitle" }), F.value = "";
                        }
                      }, "字幕提取", 8, Er),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          r("special-video-action", { video: i, id: i.id, action: "cache" }), F.value = "";
                        }
                      }, "缓存视频", 8, Ur),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          r("special-video-action", { video: i, id: i.id, action: "open" }), F.value = "";
                        }
                      }, "打开网页", 8, Vr)
                    ])) : y("", !0)
                  ]),
                  e("div", Fr, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: w((c) => V(c, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, a(i.author), 9, Nr),
                    e("span", null, a(i.favoriteDate), 1)
                  ])
                ], 40, Sr))), 128))
              ])),
              e("div", qr, [
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: l.value.specialLoading || l.value.specialPage <= 1,
                  onClick: t[32] || (t[32] = (i) => r("following-page", l.value.specialPage - 1))
                }, "‹ 上一页", 8, Gr),
                e("span", Or, "第 " + a(l.value.specialPage) + " 页", 1),
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: l.value.specialLoading || !l.value.followingHasMore,
                  onClick: t[33] || (t[33] = (i) => r("following-page", l.value.specialPage + 1))
                }, "下一页 ›", 8, Hr)
              ])
            ])) : l.value.mode === "subscription" ? (o(), s("section", Wr, [
              e("div", jr, [
                pe(ei, { "show-back": "" }),
                l.value.subscriptionLoading ? (o(), s("div", Yr, [...t[81] || (t[81] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取订阅视频与 AI 字幕稿…", -1)
                ])])) : l.value.subscriptionError ? (o(), s("p", Xr, "读取失败：" + a(l.value.subscriptionError), 1)) : (o(), s("div", Kr, [
                  pe(Co),
                  pe(wi)
                ]))
              ])
            ])) : l.value.mode === "radio" ? (o(), s("section", Qr, [
              e("header", Jr, [
                t[82] || (t[82] = e("div", { class: "fo-hero-left" }, [
                  e("div", { class: "fo-bili-cover fo-vue-radio-cover" }, [
                    e("span", null, "📻")
                  ]),
                  e("div", { class: "fo-hero-folder-info" }, [
                    e("h3", null, "B站电台"),
                    e("p", null, "从左侧选择收藏夹，将视频拖拽或添加到连播队列，自由编排系列随心听")
                  ])
                ], -1)),
                e("div", Zr, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    onClick: t[34] || (t[34] = (i) => r("radio-refresh"))
                  }, "↻ 刷新电台"),
                  e("button", {
                    type: "button",
                    onClick: t[35] || (t[35] = (i) => r("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              e("div", eu, [
                e("aside", tu, [
                  t[83] || (t[83] = e("p", { class: "sw-title" }, "收藏夹", -1)),
                  e("div", iu, [
                    (o(!0), s(L, null, O(u(D).radioFolders, (i) => (o(), s("button", {
                      key: i.id,
                      type: "button",
                      class: B(["bili-radio-folder", { on: i.id === u(D).radioActiveFolderId }]),
                      onClick: (c) => r("radio-select-folder", i.id)
                    }, [
                      e("span", null, a(i.title), 1),
                      e("span", null, a(i.count), 1)
                    ], 10, ou))), 128)),
                    u(D).radioFolders.length ? y("", !0) : (o(), s("p", su, a(u(D).radioLoading ? "加载中…" : "暂无收藏夹"), 1))
                  ])
                ]),
                e("section", lu, [
                  t[85] || (t[85] = e("p", {
                    id: "bili-radio-library-title",
                    class: "sw-title"
                  }, "收藏夹视频", -1)),
                  u(D).radioError ? (o(), s("p", nu, a(u(D).radioError), 1)) : y("", !0),
                  e("div", au, [
                    (o(!0), s(L, null, O(u(D).radioVideos, (i) => (o(), s("button", {
                      key: i.bvid,
                      type: "button",
                      class: "bili-radio-video",
                      title: `${i.title} (点击加入连播队列，或按住拖拽封面到下方卡带机直接播放)`,
                      draggable: "true",
                      onDragstart: (c) => bt(c, i),
                      onClick: (c) => r("radio-add", { bvid: i.bvid, title: i.title, cover: i.cover, author: i.author, duration: i.duration })
                    }, [
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, uu)) : (o(), s("span", du)),
                      e("p", null, a(i.title), 1),
                      t[84] || (t[84] = e("span", null, "＋", -1))
                    ], 40, ru))), 128)),
                    u(D).radioVideos.length ? y("", !0) : (o(), s("p", cu, a(u(D).radioLoading ? "读取视频中…" : "此收藏夹暂无可播放视频"), 1))
                  ])
                ]),
                e("section", pu, [
                  e("div", bu, [
                    ie(e("input", {
                      id: "bili-radio-name",
                      "onUpdate:modelValue": t[36] || (t[36] = (i) => u(D).radioSeriesName = i),
                      maxlength: "48",
                      class: B({ "has-error": g.value }),
                      placeholder: g.value ? "⚠️ 请在此输入系列名称后再保存！" : "请输入系列名称（必填）",
                      autocomplete: "off",
                      onInput: t[37] || (t[37] = (i) => g.value = !1),
                      onKeydown: Pe(w(T, ["prevent"]), ["enter"])
                    }, null, 42, vu), [
                      [he, u(D).radioSeriesName]
                    ]),
                    e("div", fu, [
                      e("button", {
                        id: "bili-radio-save",
                        type: "button",
                        title: "保存当前队列为系列",
                        onClick: T
                      }, " 💾 保存系列 "),
                      e("button", {
                        id: "bili-radio-rename",
                        type: "button",
                        title: "重命名当前系列",
                        onClick: m
                      }, " ✏️ 重命名 "),
                      pe(at, {
                        id: "bili-radio-share",
                        compact: "",
                        label: "🚀 分享",
                        visible: !0,
                        onSelect: dt
                      })
                    ]),
                    e("div", gu, [
                      e("select", {
                        class: "bili-radio-series-select",
                        title: "快速切换已保存的系列",
                        onChange: P
                      }, [
                        e("option", mu, a(u(D).radioSeries.length ? `📚 已保存系列 (${u(D).radioSeries.length})` : "📚 暂无保存系列"), 1),
                        (o(!0), s(L, null, O(u(D).radioSeries, (i) => (o(), s("option", {
                          key: i.id,
                          value: i.id
                        }, a(i.name) + " (" + a(i.count) + "首) ", 9, yu))), 128)),
                        t[86] || (t[86] = e("option", {
                          value: "__create_new__",
                          class: "bili-radio-create-opt"
                        }, " ＋ 创建系列 ", -1))
                      ], 32)
                    ])
                  ]),
                  e("div", hu, [
                    (o(!0), s(L, null, O(u(D).radioQueue, (i, c) => (o(), s("div", {
                      key: `${i.bvid}-${c}`,
                      class: B(["bili-radio-queue-item", { "is-playing": u(Y).active && u(Y).trackIndex === c + 1 }]),
                      title: "点击立即从该曲目开始播放",
                      onClick: (z) => r("radio-play-index", c)
                    }, [
                      e("span", ku, a(u(Y).active && u(Y).trackIndex === c + 1 ? "♪" : c + 1), 1),
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, $u)) : (o(), s("span", wu)),
                      e("p", null, a(i.title), 1),
                      e("button", {
                        type: "button",
                        class: "bili-radio-remove",
                        "aria-label": `移除 ${i.title}`,
                        onClick: w((z) => r("radio-remove", { index: c }), ["stop"])
                      }, "×", 8, Cu)
                    ], 10, _u))), 128)),
                    u(D).radioQueue.length ? y("", !0) : (o(), s("p", xu, "点击左侧视频加入连播队列。"))
                  ]),
                  e("div", Su, [
                    e("button", {
                      id: "bili-radio-play",
                      type: "button",
                      disabled: !u(D).radioQueue.length,
                      onClick: t[38] || (t[38] = (i) => r("radio-play"))
                    }, "▶ 按顺序播放", 8, Tu),
                    e("button", {
                      id: "bili-radio-shuffle",
                      type: "button",
                      disabled: !u(D).radioQueue.length,
                      onClick: t[39] || (t[39] = (i) => r("radio-shuffle"))
                    }, "🔀 随机播放", 8, Mu),
                    e("button", {
                      id: "bili-radio-clear",
                      type: "button",
                      onClick: t[40] || (t[40] = (i) => r("radio-clear"))
                    }, "清空编辑区")
                  ])
                ])
              ]),
              u(qe) || u(Qe).activeId === "daily-bilibili" ? y("", !0) : (o(), ot(rt, { key: 0 }))
            ])) : y("", !0)
          ], 34)
        ])
      ]),
      u(qe) || u(Qe).activeId === "daily-bilibili" ? (o(), ot(rt, {
        key: 0,
        "dock-side": ""
      })) : y("", !0),
      t[97] || (t[97] = e("div", {
        class: "fm-pane",
        id: "pane-sub-video",
        hidden: "",
        style: { display: "none !important" }
      }, null, -1)),
      pe(Ko),
      pe(Js),
      G.value.visible && G.value.video ? (o(), s("div", {
        key: 1,
        ref_key: "videoMenuRef",
        ref: j,
        class: "fo-context-menu",
        role: "menu",
        style: _e(u(be)),
        onClick: t[48] || (t[48] = w(() => {
        }, ["stop"]))
      }, [
        e("div", {
          class: "fo-context-header",
          title: G.value.video.title
        }, a(G.value.video.title), 9, Du),
        pe(at, {
          label: "💬 发送到聊天室",
          "match-menu-item": "",
          visible: G.value.visible,
          onSelect: ct
        }, null, 8, ["visible"]),
        t[94] || (t[94] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[41] || (t[41] = (i) => ye("play"))
        }, [...t[87] || (t[87] = [
          e("span", { class: "fo-context-icon" }, "▶", -1),
          ae(" 小窗播放视频 ", -1)
        ])]),
        t[95] || (t[95] = e("div", { class: "fo-context-divider" }, null, -1)),
        G.value.video.writable ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "fo-context-item danger",
          onClick: t[42] || (t[42] = (i) => ye("delete"))
        }, [...t[88] || (t[88] = [
          e("span", { class: "fo-context-icon" }, "🗑", -1),
          ae(" 取消收藏 ", -1)
        ])])) : y("", !0),
        G.value.video.writable ? (o(), s("button", {
          key: 1,
          type: "button",
          class: "fo-context-item",
          onClick: t[43] || (t[43] = (i) => ye("move"))
        }, [...t[89] || (t[89] = [
          e("span", { class: "fo-context-icon" }, "📁", -1),
          ae(" 移动到… ", -1)
        ])])) : y("", !0),
        G.value.video.writable ? (o(), s("div", Pu)) : y("", !0),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[44] || (t[44] = (i) => ye("open"))
        }, [...t[90] || (t[90] = [
          e("span", { class: "fo-context-icon" }, "↗", -1),
          ae(" 跳转到 B站 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[45] || (t[45] = (i) => ye("copy-link"))
        }, [...t[91] || (t[91] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ae(" 复制链接 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[46] || (t[46] = (i) => ye("cache"))
        }, [...t[92] || (t[92] = [
          e("span", { class: "fo-context-icon" }, "💾", -1),
          ae(" 缓存视频 ", -1)
        ])]),
        t[96] || (t[96] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[47] || (t[47] = (i) => ye("subtitle"))
        }, [...t[93] || (t[93] = [
          e("span", { class: "fo-context-icon" }, "▤", -1),
          ae(" 字幕转文本 ", -1)
        ])])
      ], 4)) : y("", !0)
    ], 2));
  }
}), Hu = /* @__PURE__ */ Le(zu, [["__scopeId", "data-v-17f950da"]]);
export {
  Hu as default
};
