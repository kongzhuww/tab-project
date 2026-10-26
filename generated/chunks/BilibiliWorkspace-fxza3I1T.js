import { d as Te, o, e as s, f as e, t as a, u as r, B as A, m as ne, F as E, h as O, g as k, D as ce, i as x, s as te, x as pe, C as We, y as ut, l as Z, n as ge, k as Se, b as T, G as Ze, S as it, A as me, v as ft, z as et, H as gt, L as mt, c as ot } from "./vendor-vue-CjOHdfe5.js";
import { c as I, b as Re, a as j, r as xe, s as yt } from "./bili-favorites-store-HdGl6CK0.js";
import { j as st, n as Ke, H as de, k as Oe, C as Qe, a0 as lt } from "./search.service-lHw6yJW3.js";
import "./fullscreen-cards.store-80kHiEfO.js";
import { u as ht } from "./useCardActivity-DSRp-zX8.js";
import { _ as Le } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { B as He } from "./BiliRichText-b5dRdSY9.js";
import { d as _t, a as kt } from "./playback-sync-Bwe-oA9C.js";
import { a as ie, d as Je, e as v, c as le } from "./up-group-manager-store-Dxkqftrq.js";
import { biliMessagePanelController as $t, biliMessagePanelState as nt } from "./message-panel-store-CrjrfF3o.js";
import { bilibiliChannelService as Ie } from "./bilibili-channel.service-Dnfr7APj.js";
import { u as wt } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-BVjj5KH4.js";
import { C as at } from "./ChatShareMenu-B2NG0qwl.js";
const Ct = { class: "bili-sub-header bili-sub-vue-header" }, xt = { class: "bili-sub-channel-info" }, St = { class: "bili-sub-vue-title-row" }, Tt = { class: "bili-sub-title" }, Mt = { class: "bili-sub-desc" }, Dt = { class: "bili-sub-actions" }, Pt = { class: "bili-sub-mode-icon" }, zt = { class: "bili-sub-mode-text" }, Bt = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, It = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, Rt = { class: "bili-sub-dropdown-panel" }, Lt = { class: "bili-sub-dropdown-list" }, At = ["onClick"], Et = { class: "bili-sub-item-text" }, Ut = {
  key: 0,
  class: "bili-sub-item-check"
}, Vt = { class: "bili-sub-dropdown-foot" }, Ft = { class: "bili-sub-dropdown-wrap bili-sub-vue-dropdown" }, Nt = { class: "bili-sub-head-btn bili-sub-dropdown-btn" }, qt = { class: "bili-sub-dropdown-panel bili-sub-video-dropdown-panel" }, Gt = { class: "bili-sub-dropdown-title" }, Ot = { class: "bili-sub-dropdown-list" }, Ht = ["title", "onClick"], Wt = { class: "bili-sub-video-num" }, jt = { class: "bili-sub-item-text" }, Yt = {
  key: 0,
  class: "bili-sub-video-duration"
}, Xt = { class: "bili-sub-dropdown-foot" }, Kt = ["disabled"], Qt = /* @__PURE__ */ Te({
  __name: "BiliSubscriptionHeader",
  props: {
    showBack: { type: Boolean }
  },
  setup(ye) {
    function _(B, g) {
      Re.dispatch(B, g);
    }
    return (B, g) => (o(), s("header", Ct, [
      e("div", xt, [
        g[6] || (g[6] = e("img", {
          class: "bili-sub-avatar",
          src: "assets/bilibili.svg",
          alt: ""
        }, null, -1)),
        e("div", null, [
          e("div", St, [
            e("h3", Tt, a(r(I).organizer.subscriptionTitle), 1)
          ]),
          e("p", Mt, a(r(I).organizer.subscriptionSubtitle), 1)
        ])
      ]),
      e("div", Dt, [
        e("button", {
          type: "button",
          class: A(["bili-sub-head-btn bili-sub-script-mode-btn", { "is-newspaper": r(I).organizer.subscriptionScriptMode === "newspaper" }]),
          onClick: g[0] || (g[0] = (D) => _("subscription-script-mode"))
        }, [
          e("span", Pt, a(r(I).organizer.subscriptionScriptMode === "newspaper" ? "📰" : "📜"), 1),
          e("span", zt, a(r(I).organizer.subscriptionScriptMode === "newspaper" ? "报纸模式" : "滚动台词"), 1)
        ], 2),
        e("details", Bt, [
          e("summary", It, [
            e("span", null, [
              g[7] || (g[7] = ne("关注 UP 主：", -1)),
              e("b", null, a(r(I).organizer.subscriptionTitle), 1)
            ]),
            g[8] || (g[8] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", Rt, [
            g[10] || (g[10] = e("div", { class: "bili-sub-dropdown-title" }, "已关注的 UP 主", -1)),
            e("div", Lt, [
              (o(!0), s(E, null, O(r(I).organizer.subscriptionChannels, (D) => (o(), s("button", {
                key: D.id,
                type: "button",
                class: A(["bili-sub-dropdown-item", { active: D.active }]),
                onClick: (G) => _("subscription-channel", D.id)
              }, [
                g[9] || (g[9] = e("span", { class: "bili-sub-dot" }, null, -1)),
                e("span", Et, a(D.name), 1),
                D.active ? (o(), s("span", Ut, "✓")) : k("", !0)
              ], 10, At))), 128))
            ]),
            e("div", Vt, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                onClick: g[1] || (g[1] = (D) => _("subscription-add-channel"))
              }, "＋ UP 主")
            ])
          ])
        ]),
        e("details", Ft, [
          e("summary", Nt, [
            e("span", null, [
              g[11] || (g[11] = ne("视频 ", -1)),
              e("b", null, "(" + a(r(I).organizer.subscriptionVideos.length) + ")", 1)
            ]),
            g[12] || (g[12] = e("i", { class: "bili-sub-dropdown-arrow" }, "▾", -1))
          ]),
          e("div", qt, [
            e("div", Gt, "最近投稿视频 (" + a(r(I).organizer.subscriptionVideos.length) + ")", 1),
            e("div", Ot, [
              (o(!0), s(E, null, O(r(I).organizer.subscriptionVideos, (D, G) => (o(), s("button", {
                key: D.bvid,
                type: "button",
                class: A(["bili-sub-dropdown-item bili-sub-video-item", { active: D.active }]),
                title: D.title,
                onClick: (l) => _("subscription-video", D.bvid)
              }, [
                e("span", Wt, a(G + 1) + ".", 1),
                e("span", jt, a(D.title), 1),
                D.duration ? (o(), s("small", Yt, a(D.duration), 1)) : k("", !0)
              ], 10, Ht))), 128))
            ]),
            e("div", Xt, [
              e("button", {
                type: "button",
                class: "bili-sub-dropdown-foot-btn",
                disabled: r(I).organizer.subscriptionLoading,
                onClick: g[2] || (g[2] = (D) => _("subscription-load-more"))
              }, "继续获取", 8, Kt)
            ])
          ])
        ]),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: g[3] || (g[3] = (D) => _(r(I).organizer.showFullDescInRightPanel ? "subscription-copy-description" : "subscription-copy-script"))
        }, a(r(I).organizer.showFullDescInRightPanel ? "复制简介" : "复制稿子"), 1),
        e("button", {
          type: "button",
          class: "bili-sub-head-btn",
          onClick: g[4] || (g[4] = (D) => _("subscription-refresh"))
        }, "↻ 刷新"),
        ye.showBack ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "bili-sub-head-btn",
          onClick: g[5] || (g[5] = (D) => _("organizer-open"))
        }, "← 返回收藏夹")) : k("", !0)
      ])
    ]));
  }
}), Jt = /* @__PURE__ */ Le(Qt, [["__scopeId", "data-v-0dfef976"]]), Zt = { class: "bili-sub-transcript-column bili-sub-vue-transcript-column" }, ei = { class: "bili-sub-article-wrap" }, ti = { class: "bili-sub-transcript-body" }, ii = {
  key: 0,
  class: "bili-sub-description-copy",
  title: "当前为放大简介视图"
}, oi = {
  key: 0,
  class: "muted"
}, si = {
  key: 0,
  class: "bili-sub-newspaper-list"
}, li = ["data-idx", "data-from", "data-to", "title", "onClick"], ni = { class: "bili-sub-newspaper-header" }, ai = { class: "bili-sub-newspaper-num" }, ri = { class: "bili-sub-newspaper-heading" }, ui = { class: "bili-sub-newspaper-title" }, di = { class: "bili-sub-newspaper-time" }, ci = ["onClick"], pi = { class: "bili-sub-newspaper-content" }, bi = ["data-from", "data-to", "title", "onClick"], vi = {
  key: 1,
  class: "bili-sub-srt-list"
}, fi = ["data-idx", "data-from", "data-to", "title", "onClick"], gi = { class: "bili-sub-srt-time" }, mi = { class: "bili-sub-srt-text" }, yi = {
  key: 2,
  class: "bili-sub-no-transcript-box"
}, hi = {
  key: 2,
  class: "bili-sub-vue-empty-hint"
}, _i = /* @__PURE__ */ Te({
  __name: "BiliSubscriptionTranscript",
  setup(ye) {
    const _ = te(() => I.organizer), B = te(() => _.value.subscriptionChapters.length > 0 || _.value.subscriptionCues.length > 0);
    function g(D, G) {
      Re.dispatch(D, G);
    }
    return (D, G) => (o(), s("section", Zt, [
      e("article", ei, [
        e("div", ti, [
          _.value.showFullDescInRightPanel ? (o(), s("section", ii, [
            e("header", null, [
              G[1] || (G[1] = e("h5", null, "视频简介", -1)),
              e("button", {
                type: "button",
                class: "bili-copy-desc-btn",
                title: "切回台词展示",
                onClick: G[0] || (G[0] = (l) => g("subscription-toggle-desc-panel"))
              }, "缩小简介")
            ]),
            (o(!0), s(E, null, O(_.value.subscriptionDescription, (l, R) => (o(), s("p", { key: R }, [
              ce(He, { text: l }, null, 8, ["text"])
            ]))), 128)),
            _.value.subscriptionDescription.length ? k("", !0) : (o(), s("p", oi, "该视频暂无可用的文字简介。"))
          ])) : (o(), s(E, { key: 1 }, [
            _.value.subscriptionScriptMode === "newspaper" && _.value.subscriptionChapters.length ? (o(), s("div", si, [
              (o(!0), s(E, null, O(_.value.subscriptionChapters, (l, R) => (o(), s("article", {
                key: `${l.from}:${R}`,
                class: "bili-sub-newspaper-section",
                "data-idx": R,
                "data-from": l.from,
                "data-to": l.to,
                title: `点击跳转至 ${l.fromText} 播放`,
                onClick: (y) => g("subscription-seek", { from: l.from, index: R, mode: "newspaper" })
              }, [
                e("header", ni, [
                  e("span", ai, a(String(R + 1).padStart(2, "0")), 1),
                  e("div", ri, [
                    e("h4", ui, a(l.title), 1),
                    e("span", di, "⏱ " + a(l.fromText) + " - " + a(l.toText), 1)
                  ]),
                  e("button", {
                    type: "button",
                    class: "bili-sub-newspaper-play-btn",
                    "aria-label": "从头播放此分段",
                    onClick: x((y) => g("subscription-seek", { from: l.from, index: R, mode: "newspaper" }), ["stop"])
                  }, "▶", 8, ci)
                ]),
                e("div", pi, [
                  l.paragraphCues && l.paragraphCues.length ? (o(!0), s(E, { key: 0 }, O(l.paragraphCues, (y, S) => (o(), s("p", {
                    key: S,
                    class: "bili-sub-newspaper-p"
                  }, [
                    (o(!0), s(E, null, O(y, (V, m) => (o(), s("span", {
                      key: `${V.from}:${m}`,
                      class: "bili-sub-newspaper-cue",
                      "data-from": V.from,
                      "data-to": V.to,
                      title: `点击跳转播放此句 (⏱ ${V.timeText || V.from + "s"})`,
                      onClick: x((P) => g("subscription-seek", { from: V.from, mode: "newspaper" }), ["stop"])
                    }, a(V.content), 9, bi))), 128))
                  ]))), 128)) : (o(!0), s(E, { key: 1 }, O(l.paragraphs, (y, S) => (o(), s("p", {
                    key: S,
                    class: "bili-sub-newspaper-p"
                  }, a(y), 1))), 128))
                ])
              ], 8, li))), 128))
            ])) : _.value.subscriptionCues.length ? (o(), s("div", vi, [
              (o(!0), s(E, null, O(_.value.subscriptionCues, (l) => (o(), s("button", {
                key: `${l.from}:${l.index}`,
                type: "button",
                class: "bili-sub-srt-row",
                "data-idx": l.index,
                "data-from": l.from,
                "data-to": l.to,
                title: `点击跳转至 ${l.timeText}`,
                onClick: (R) => g("subscription-seek", { from: l.from, index: l.index, mode: "lyrics" })
              }, [
                e("span", gi, a(l.timeText), 1),
                e("span", mi, a(l.content), 1)
              ], 8, fi))), 128))
            ])) : (o(), s("div", yi, [...G[2] || (G[2] = [
              e("div", { class: "bili-sub-no-transcript-icon" }, "🎙️", -1),
              e("h5", null, "暂无实时台词字幕", -1),
              e("p", { class: "muted" }, "当前视频暂无可用字幕稿。如需阅读完整文案，请点击左侧视频标题旁的“放大简介”。", -1)
            ])]))
          ], 64)),
          !_.value.showFullDescInRightPanel && !B.value && !_.value.subscriptionDescription.length ? (o(), s("p", hi, "字幕不可用时仍可在左侧播放和查看评论。")) : k("", !0)
        ])
      ])
    ]));
  }
}), ki = /* @__PURE__ */ Le(_i, [["__scopeId", "data-v-2f4df941"]]), $i = { class: "bili-sub-player-column" }, wi = {
  key: 0,
  class: "bili-sub-sticky-player"
}, Ci = { class: "bili-sub-player-card" }, xi = { class: "bili-sub-video-box" }, Si = ["poster", "hidden"], Ti = ["src"], Mi = {
  key: 1,
  class: "bili-sub-video-loading"
}, Di = { class: "bili-sub-video-meta" }, Pi = { class: "bili-sub-video-meta-actions" }, zi = ["title"], Bi = { class: "bili-sub-meta-stats" }, Ii = { class: "bili-sub-meta-desc" }, Ri = {
  class: "bili-sub-comments-section",
  id: "bili-sub-comments-section"
}, Li = { class: "bili-mini-comments-head" }, Ai = { class: "bili-mini-comments-meta" }, Ei = { class: "bili-mini-comments-count bili-sub-comments-count" }, Ui = { class: "bili-mini-comments-sort" }, Vi = { class: "bili-sub-comment-composer" }, Fi = ["onKeydown"], Ni = ["disabled"], qi = {
  key: 0,
  class: "bili-sub-emote-picker"
}, Gi = {
  key: 0,
  class: "fo-bili-loading"
}, Oi = { key: 1 }, Hi = ["title", "onClick"], Wi = ["src", "alt"], ji = { key: 1 }, Yi = { class: "bili-mini-comments-body bili-sub-comments-body" }, Xi = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, Ki = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, Qi = ["src"], Ji = { class: "bili-comment-main" }, Zi = { class: "bili-comment-user-row" }, eo = { class: "bili-comment-uname" }, to = {
  key: 0,
  class: "bili-comment-level"
}, io = { class: "bili-comment-time" }, oo = { class: "bili-comment-text" }, so = {
  key: 0,
  class: "bili-comment-pictures"
}, lo = ["href", "onClick"], no = ["src"], ao = { class: "bili-comment-actions" }, ro = { key: 0 }, uo = { key: 1 }, co = {
  key: 1,
  class: "bili-comment-sub-list"
}, po = { class: "bili-comment-sub-uname" }, bo = { class: "bili-comment-sub-more" }, vo = ["disabled", "onClick"], fo = ["disabled", "onClick"], go = ["onClick"], mo = { class: "bili-sub-comments-infinite-trigger" }, yo = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0" }
}, ho = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0", opacity: "0.6" }
}, _o = {
  key: 1,
  class: "fo-bili-empty"
}, ko = /* @__PURE__ */ Te({
  __name: "BiliSubscriptionPlayer",
  setup(ye) {
    const _ = te(() => I.organizer.subscriptionCurrent), B = T(null), g = T(!1), D = T(!1), G = T(""), l = T(""), R = T(1), y = T(1), S = T([]), V = T("0 条"), m = T(!1), P = T(!1), Q = T(""), oe = T(!1), q = T(""), be = T(null), ee = T(!1), ae = T(""), ve = T(!1), b = T(!1), z = T(!1), h = T([]);
    let F = null, W = null;
    function K(w, f = !1) {
      ae.value = w, ve.value = f, F && clearTimeout(F), F = setTimeout(() => {
        ae.value = "";
      }, 3500);
    }
    function re() {
      Re.dispatch("subscription-open-player");
    }
    function Me() {
      Re.dispatch("subscription-toggle-desc-panel");
    }
    function Ae(w) {
      const f = w.currentTarget;
      f && f.scrollHeight - f.scrollTop - f.clientHeight < 180 && !P.value && oe.value && X();
    }
    function $e(w, f) {
      const p = w[f];
      p && window.open(p, "_blank", "noopener,noreferrer");
    }
    function Ee(w, f) {
      if (!w) return [];
      if (!f || f.size === 0)
        return [{ type: "text", text: w }];
      const p = /\[([^\]]+)\]/g, C = [];
      let N = 0, U;
      for (; (U = p.exec(w)) !== null; ) {
        U.index > N && C.push({ type: "text", text: w.slice(N, U.index) });
        const H = U[0], J = f.get(H);
        J ? C.push({ type: "emote", text: H, url: J }) : C.push({ type: "text", text: H }), N = p.lastIndex;
      }
      return N < w.length && C.push({ type: "text", text: w.slice(N) }), C;
    }
    function Ve(w) {
      if (!w) return "";
      const f = new Date(w * 1e3), p = /* @__PURE__ */ new Date(), C = Math.floor((p.getTime() - f.getTime()) / 1e3);
      if (C < 60) return "刚刚";
      if (C < 3600) return `${Math.floor(C / 60)} 分钟前`;
      if (C < 86400) return `${Math.floor(C / 3600)} 小时前`;
      const N = f.getFullYear(), U = String(f.getMonth() + 1).padStart(2, "0"), H = String(f.getDate()).padStart(2, "0");
      return N === p.getFullYear() ? `${U}-${H}` : `${N}-${U}-${H}`;
    }
    function Fe(w) {
      return w ? w >= 1e4 ? (w / 1e4).toFixed(1).replace(/\.0$/, "") + "万" : String(w) : "0";
    }
    async function $(w = !1) {
      if (l.value) {
        w ? P.value = !0 : (m.value = !0, Q.value = "");
        try {
          const f = `https://api.bilibili.com/x/v2/reply?type=1&oid=${l.value}&pn=${y.value}&ps=20&sort=${R.value}`, C = await (await fetch(f, { credentials: "include" })).json();
          if (C?.code !== 0 || !C?.data) {
            w || (Q.value = C?.message || "评论加载失败或该视频已关闭评论", S.value = []), oe.value = !1;
            return;
          }
          const N = C.data, U = N.page?.count || 0;
          V.value = `${Fe(U)} 条`;
          const J = (Array.isArray(N.replies) ? N.replies : []).map((Y) => {
            const Ue = /* @__PURE__ */ new Map();
            Y.content?.emote && Object.entries(Y.content.emote).forEach(([fe, Ge]) => {
              Ge?.url && Ue.set(fe, String(Ge.url).replace(/^http:/, "https:"));
            });
            const Ne = String(Y.content?.message || ""), qe = Array.isArray(Y.content?.pictures) ? Y.content.pictures.map((fe) => String(fe?.img_src || fe).replace(/^http:/, "https:")).filter(Boolean) : [], ke = Array.isArray(Y.replies) ? Y.replies.map((fe) => ({
              id: fe.rpid || Math.random(),
              userName: fe.member?.uname || "B站用户",
              message: String(fe.content?.message || "")
            })) : [];
            return {
              id: Y.rpid || Math.random(),
              userName: Y.member?.uname || "B站用户",
              avatar: String(Y.member?.avatar || "").replace(/^http:/, "https:"),
              level: Number(Y.member?.level_info?.current_level || 0),
              message: Ne,
              tokens: Ee(Ne, Ue),
              timeStr: Ve(Y.ctime),
              likeCount: Number(Y.like || 0),
              replyCount: Number(Y.rcount || 0),
              pictures: qe,
              replies: ke
            };
          });
          w ? S.value = [...S.value, ...J] : S.value = J, oe.value = S.value.length < U;
        } catch (f) {
          w || (Q.value = f?.message || "网络异常，未能加载评论");
        } finally {
          m.value = !1, P.value = !1;
        }
      }
    }
    async function u(w) {
      const f = S.value.find((p) => String(p.id) === String(w));
      if (!(!f || f.subRepliesLoading || !l.value)) {
        f.subRepliesPage ? f.subRepliesPage++ : f.subRepliesPage = 1, f.subRepliesLoading = !0, f.subRepliesExpanded = !0;
        try {
          const p = await st.getSubReplies(l.value, w, f.subRepliesPage, 10), C = (p.replies || []).map((H) => ({
            id: String(H.rpid),
            userName: H.uname,
            message: H.message
          })), N = new Set((f.replies || []).map((H) => String(H.id))), U = C.filter((H) => !N.has(String(H.id)));
          f.replies = [...f.replies || [], ...U], f.subRepliesHasMore = p.hasMore;
        } catch {
          K("子回复加载失败", !0);
        } finally {
          f.subRepliesLoading = !1;
        }
      }
    }
    function d(w) {
      const f = S.value.find((p) => String(p.id) === String(w));
      f && (f.subRepliesExpanded = !1);
    }
    function M(w) {
      R.value !== w && (R.value = w, y.value = 1, $(!1));
    }
    function X() {
      P.value || !oe.value || (y.value += 1, $(!0));
    }
    async function he() {
      if (b.value = !b.value, b.value && !h.value.length && !z.value) {
        z.value = !0;
        try {
          const f = await (await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", { credentials: "include" })).json();
          f?.code === 0 && Array.isArray(f?.data?.packages) && (h.value = f.data.packages.filter((p) => Array.isArray(p.emote) && p.emote.length).map((p) => ({
            text: p.text || "B站表情",
            emote: p.emote.map((C) => ({
              text: C.text || "",
              url: String(C.url || "").replace(/^http:/, "https:")
            }))
          })));
        } catch {
        } finally {
          z.value = !1;
        }
      }
    }
    function De(w) {
      const f = be.value;
      if (!f)
        q.value += w;
      else {
        const p = f.selectionStart ?? f.value.length, C = f.selectionEnd ?? p;
        q.value = q.value.slice(0, p) + w + q.value.slice(C), Ze(() => {
          f.focus();
          const N = p + w.length;
          f.setSelectionRange(N, N);
        });
      }
      b.value = !1;
    }
    async function se() {
      const w = q.value.trim();
      if (!w) {
        K("请输入评论内容", !0);
        return;
      }
      if (!l.value) {
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
      ee.value = !0;
      try {
        const C = new URLSearchParams({
          oid: String(l.value),
          type: "1",
          message: w,
          plat: "1",
          csrf: p,
          csrf_token: p
        }), U = await (await fetch("https://api.bilibili.com/x/v2/reply/add", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: C.toString()
        })).json();
        U?.code === 0 ? (q.value = "", K("✓ 评论发表成功！", !1), y.value = 1, $(!1)) : K(`❌ 发送失败：${U?.message || U?.code}`, !0);
      } catch (C) {
        K(`❌ 发送出错：${C?.message || "网络异常"}`, !0);
      } finally {
        ee.value = !1;
      }
    }
    async function we(w) {
      if (!w?.bvid) return;
      if (typeof document < "u" && (document.querySelectorAll("video, audio").forEach((p) => {
        if (p !== B.value && !p.paused)
          try {
            p.pause();
          } catch {
          }
      }), document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((p) => {
        try {
          p.pause();
        } catch {
        }
      })), B.value && !B.value.paused)
        try {
          B.value.pause();
        } catch {
        }
      g.value = !0, D.value = !1, G.value = "";
      let f = w.aid;
      if (!f)
        try {
          const C = await (await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${w.bvid}`, { credentials: "include" })).json();
          C?.data?.aid && (f = C.data.aid);
        } catch {
        }
      l.value = f || "", y.value = 1, $(!1);
      try {
        const p = await st.resolvePlayStream(w);
        if (p?.sources?.length) {
          B.value && (typeof document < "u" && document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((C) => {
            try {
              C.pause();
            } catch {
            }
          }), B.value.src = p.sources[0], B.value.play().catch(() => {
          }), kt({ bvid: w.bvid, title: w.title, cover: w.cover }, B.value)), g.value = !1;
          return;
        }
      } catch (p) {
        console.warn("[BiliSubscriptionPlayer] 本地视频流解析失败，使用 iframe 备用:", p);
      }
      D.value = !0, G.value = `https://player.bilibili.com/player.html?bvid=${w.bvid}&autoplay=1&danmaku=0`, g.value = !1;
    }
    let _e = null, Pe = null;
    function ze(w) {
      const f = w.closest(".bili-sub-transcript-body") || w.closest(".bili-sub-article-wrap") || w.parentElement;
      if (!f) return;
      const p = f.getBoundingClientRect(), U = w.getBoundingClientRect().top - p.top + f.scrollTop - p.height * 0.36;
      f.scrollTo({
        top: Math.max(0, U),
        behavior: "smooth"
      });
    }
    function Ce() {
      if (!B.value) return;
      const w = B.value.currentTime;
      if (document.querySelectorAll(".bili-sub-newspaper-section").forEach((C) => {
        const N = Number(C.getAttribute("data-from") || 0), U = Number(C.getAttribute("data-to") || 0), H = w >= N && (U <= 0 || w < U);
        C.classList.toggle("active", H);
      }), I.organizer.subscriptionScriptMode === "newspaper") {
        const C = document.querySelectorAll(".bili-sub-newspaper-cue");
        if (C.length > 0) {
          let N = null;
          if (C.forEach((U) => {
            const H = Number(U.getAttribute("data-from") || 0), J = Number(U.getAttribute("data-to") || 0);
            w >= H && (J <= 0 || w < J) ? (N || (N = U), U.classList.add("cue-reading-active")) : U.classList.remove("cue-reading-active");
          }), !N && w > 0)
            for (let U = C.length - 1; U >= 0; U--) {
              const H = C[U], J = Number(H.getAttribute("data-from") || 0);
              if (w >= J) {
                N = H, H.classList.add("cue-reading-active");
                break;
              }
            }
          N && N !== _e && (_e = N, ze(N));
        }
      } else {
        const C = document.querySelectorAll(".bili-sub-srt-row");
        let N = !1, U = null;
        for (let H = C.length - 1; H >= 0; H--) {
          const J = C[H], Y = Number(J.getAttribute("data-from") || 0);
          !N && w >= Y ? (J.classList.add("active"), N = !0, U = J) : J.classList.remove("active");
        }
        U && U !== Pe && (Pe = U, ze(U));
      }
    }
    function Be() {
      Ce();
    }
    function je() {
      Ce();
    }
    return pe(
      () => _.value?.bvid,
      () => {
        _.value && we(_.value);
      },
      { immediate: !0 }
    ), We(() => {
      W = Re.onAction((w, f) => {
        if (w === "subscription-seek") {
          const p = Number(f?.from);
          B.value && Number.isFinite(p) && (B.value.currentTime = Math.max(0, p - 0.1), B.value.play().catch(() => {
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
      W && W(), F && clearTimeout(F);
    }), (w, f) => (o(), s("aside", $i, [
      _.value ? (o(), s("div", wi, [
        e("div", Ci, [
          e("div", {
            class: "bili-sub-vue-comment-handoff",
            hidden: "",
            style: { display: "none !important" }
          }, [
            f[3] || (f[3] = e("strong", null, "播放器与评论区已统一到 Vue 本地影院", -1)),
            e("button", {
              type: "button",
              onClick: re
            }, "打开播放器与评论区")
          ]),
          e("div", xi, [
            e("video", {
              ref_key: "videoRef",
              ref: B,
              class: "bili-sub-native-video",
              controls: "",
              playsinline: "",
              poster: _.value.cover,
              hidden: D.value,
              onTimeupdate: Ce,
              onSeeked: Be,
              onPlay: je
            }, null, 40, Si),
            D.value ? (o(), s("iframe", {
              key: 0,
              class: "bili-sub-native-iframe",
              allowfullscreen: "true",
              allow: "autoplay; fullscreen",
              src: G.value
            }, null, 8, Ti)) : k("", !0),
            g.value ? (o(), s("div", Mi, [...f[4] || (f[4] = [
              e("i", null, null, -1),
              e("span", null, "正在解析登录高清视频流…", -1)
            ])])) : k("", !0)
          ]),
          e("div", {
            class: "bili-sub-scroll-stage",
            onScrollPassive: Ae
          }, [
            e("div", Di, [
              e("div", Pi, [
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: r(I).organizer.showFullDescInRightPanel ? "切回台词展示" : "在右侧大屏展开完整视频简介",
                  onClick: Me
                }, a(r(I).organizer.showFullDescInRightPanel ? "缩小简介" : "放大简介"), 9, zi)
              ]),
              e("h4", null, a(_.value.title), 1),
              e("div", Bi, [
                e("span", null, "▣ 播放: " + a(_.value.playCount), 1),
                e("span", null, "💬 弹幕: " + a(_.value.danmakuCount), 1),
                e("span", null, "⏱ " + a(_.value.duration), 1)
              ]),
              e("p", Ii, [
                ce(He, {
                  text: _.value.description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ]),
            e("div", Ri, [
              e("div", Li, [
                e("div", Ai, [
                  f[5] || (f[5] = e("span", null, "💬 评论", -1)),
                  e("span", Ei, a(V.value), 1)
                ]),
                e("div", Ui, [
                  e("button", {
                    type: "button",
                    class: A(["bili-mini-sort-btn", { active: R.value === 1 }]),
                    onClick: f[0] || (f[0] = (p) => M(1))
                  }, "按热度", 2),
                  e("button", {
                    type: "button",
                    class: A(["bili-mini-sort-btn", { active: R.value === 0 }]),
                    onClick: f[1] || (f[1] = (p) => M(0))
                  }, "按时间", 2)
                ])
              ]),
              e("div", Vi, [
                e("button", {
                  type: "button",
                  class: A(["bili-sub-emote-button", { on: b.value }]),
                  title: "选择 B站 表情",
                  onClick: he
                }, "☺", 2),
                Z(e("input", {
                  ref_key: "commentInputRef",
                  ref: be,
                  "onUpdate:modelValue": f[2] || (f[2] = (p) => q.value = p),
                  type: "text",
                  class: "bili-sub-comment-input",
                  placeholder: "发一条友善的评论吧…（Enter 发送）",
                  maxlength: "500",
                  onKeydown: Se(x(se, ["prevent"]), ["enter"])
                }, null, 40, Fi), [
                  [ge, q.value]
                ]),
                e("button", {
                  type: "button",
                  class: "bili-sub-comment-send-btn",
                  disabled: ee.value || !q.value.trim(),
                  onClick: se
                }, a(ee.value ? "发送中…" : "发送"), 9, Ni)
              ]),
              b.value ? (o(), s("div", qi, [
                z.value ? (o(), s("div", Gi, [...f[6] || (f[6] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取 B站 表情包…", -1)
                ])])) : (o(), s("div", Oi, [
                  (o(!0), s(E, null, O(h.value, (p) => (o(), s("section", {
                    key: p.text,
                    class: "bili-sub-emote-group"
                  }, [
                    e("h5", null, a(p.text || "B站表情"), 1),
                    e("div", null, [
                      (o(!0), s(E, null, O(p.emote, (C) => (o(), s("button", {
                        key: C.text,
                        type: "button",
                        class: "bili-sub-emote-item",
                        title: C.text,
                        onClick: (N) => De(C.text)
                      }, [
                        C.url ? (o(), s("img", {
                          key: 0,
                          src: C.url,
                          alt: C.text,
                          referrerpolicy: "no-referrer"
                        }, null, 8, Wi)) : (o(), s("span", ji, a(C.text), 1))
                      ], 8, Hi))), 128))
                    ])
                  ]))), 128))
                ]))
              ])) : k("", !0),
              ae.value ? (o(), s("div", {
                key: 1,
                class: A(["bili-sub-comment-tip", { error: ve.value }])
              }, a(ae.value), 3)) : k("", !0),
              e("div", Yi, [
                m.value && !S.value.length ? (o(), s("p", Xi, "正在加载评论…")) : Q.value && !S.value.length ? (o(), s("p", Ki, a(Q.value), 1)) : k("", !0),
                (o(!0), s(E, null, O(S.value, (p) => (o(), s("div", {
                  key: p.id,
                  class: "bili-comment-item"
                }, [
                  e("img", {
                    class: "bili-comment-avatar",
                    src: p.avatar,
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer"
                  }, null, 8, Qi),
                  e("div", Ji, [
                    e("div", Zi, [
                      e("span", eo, a(p.userName), 1),
                      p.level ? (o(), s("span", to, "LV" + a(p.level), 1)) : k("", !0),
                      e("span", io, a(p.timeStr), 1)
                    ]),
                    e("div", oo, [
                      ce(He, {
                        text: p.message
                      }, null, 8, ["text"])
                    ]),
                    p.pictures?.length ? (o(), s("div", so, [
                      (o(!0), s(E, null, O(p.pictures, (C, N) => (o(), s("a", {
                        key: N,
                        class: "bili-comment-pic-link",
                        href: C,
                        onClick: x((U) => $e(p.pictures, N), ["stop", "prevent"])
                      }, [
                        e("img", {
                          class: "bili-comment-pic",
                          src: C,
                          alt: "评论图片",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, no)
                      ], 8, lo))), 128))
                    ])) : k("", !0),
                    e("div", ao, [
                      p.likeCount ? (o(), s("span", ro, "👍 " + a(p.likeCount), 1)) : k("", !0),
                      p.replyCount ? (o(), s("span", uo, "💬 " + a(p.replyCount), 1)) : k("", !0)
                    ]),
                    p.replies?.length ? (o(), s("div", co, [
                      (o(!0), s(E, null, O(p.replies, (C) => (o(), s("div", {
                        key: C.id,
                        class: "bili-comment-sub-item"
                      }, [
                        e("span", po, a(C.userName) + ":", 1),
                        ce(He, {
                          text: C.message
                        }, null, 8, ["text"])
                      ]))), 128)),
                      e("div", bo, [
                        !p.subRepliesExpanded && (p.replyCount || 0) > p.replies.length ? (o(), s(E, { key: 0 }, [
                          e("span", null, "共 " + a(p.replyCount) + " 条回复，", 1),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: p.subRepliesLoading,
                            onClick: x((C) => u(p.id), ["stop"])
                          }, a(p.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, vo)
                        ], 64)) : p.subRepliesExpanded ? (o(), s(E, { key: 1 }, [
                          p.subRepliesHasMore ? (o(), s("button", {
                            key: 0,
                            type: "button",
                            class: "bili-comment-sub-expand-btn",
                            disabled: p.subRepliesLoading,
                            onClick: x((C) => u(p.id), ["stop"])
                          }, a(p.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, fo)) : k("", !0),
                          e("button", {
                            type: "button",
                            class: "bili-comment-sub-collapse-btn",
                            onClick: x((C) => d(p.id), ["stop"])
                          }, " 收起 ▴ ", 8, go)
                        ], 64)) : k("", !0)
                      ])
                    ])) : k("", !0)
                  ])
                ]))), 128))
              ]),
              e("div", mo, [
                P.value ? (o(), s("p", yo, "正在加载更多评论…")) : !oe.value && S.value.length ? (o(), s("p", ho, "已显示全部评论")) : k("", !0)
              ])
            ])
          ], 32)
        ])
      ])) : (o(), s("p", _o, "暂无可播放的订阅视频。"))
    ]));
  }
}), $o = /* @__PURE__ */ Le(ko, [["__scopeId", "data-v-d420748e"]]), wo = ["disabled"], Co = ["disabled"], xo = { key: 0 }, So = ["disabled"], To = ["disabled"], Mo = ["disabled"], Do = ["disabled"], Po = { class: "bili-sub-add-shell" }, zo = ["disabled"], Bo = { class: "bili-sub-add-toolbar" }, Io = { class: "bili-sub-add-groups" }, Ro = ["onClick"], Lo = { class: "bili-sub-add-list" }, Ao = {
  key: 0,
  class: "fo-bili-loading"
}, Eo = {
  key: 1,
  class: "fo-bili-empty"
}, Uo = {
  key: 2,
  class: "fo-bili-empty"
}, Vo = ["disabled", "onClick"], Fo = ["src"], No = {
  key: 1,
  class: "bili-sub-add-avatar"
}, qo = {
  class: "fo-custom-confirm-modal",
  role: "dialog",
  "aria-modal": "true"
}, Go = { class: "fo-custom-confirm-head" }, Oo = { class: "fo-custom-confirm-body" }, Ho = { class: "fo-custom-confirm-actions" }, Wo = ["disabled"], jo = ["disabled"], Yo = /* @__PURE__ */ Te({
  __name: "BiliOrganizerDialogs",
  setup(ye) {
    const _ = te(() => Je.create), B = te(() => Je.confirm), g = te(() => Je.channelPicker), D = te(() => _.value.kind === "bili"), G = te(() => {
      const R = g.value, y = R.query.trim().toLowerCase(), S = R.groups.find((m) => m.id === R.activeGroupId), V = S ? new Set(S.mids) : null;
      return R.items.filter((m) => (!V || V.has(m.mid)) && (!y || m.name.toLowerCase().includes(y) || m.mid.includes(y)));
    });
    function l() {
      const R = _.value.name.trim();
      if (!R) {
        ie.updateCreate({ status: "请输入名称", error: !0 });
        return;
      }
      ie.submitCreate({ name: R, privacy: _.value.privacy });
    }
    return (R, y) => (o(), s(E, null, [
      _.value.open ? (o(), s("dialog", {
        key: 0,
        class: "fo-create-dialog",
        open: "",
        onClick: y[5] || (y[5] = x((S) => r(ie).closeCreate(), ["self"])),
        onCancel: y[6] || (y[6] = x((S) => r(ie).closeCreate(), ["prevent"]))
      }, [
        e("form", {
          onSubmit: x(l, ["prevent"])
        }, [
          e("header", null, [
            e("div", null, [
              y[14] || (y[14] = e("i", { class: "fo-folder-icon" }, null, -1)),
              e("span", null, [
                e("b", null, a(D.value ? "新建 B站收藏夹" : "新建插件分组"), 1),
                e("small", null, a(D.value ? "会同步创建到你的 B站账号" : "只整理左侧收藏夹，不修改 B站数据"), 1)
              ])
            ]),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: _.value.submitting,
              onClick: y[0] || (y[0] = (S) => r(ie).closeCreate())
            }, "×", 8, wo)
          ]),
          e("label", null, [
            e("span", null, a(D.value ? "收藏夹名称" : "分组名称"), 1),
            Z(e("input", {
              "onUpdate:modelValue": y[1] || (y[1] = (S) => _.value.name = S),
              maxlength: "48",
              autocomplete: "off",
              placeholder: "输入名称",
              required: "",
              disabled: _.value.submitting,
              autofocus: ""
            }, null, 8, Co), [
              [ge, _.value.name]
            ])
          ]),
          D.value ? (o(), s("fieldset", xo, [
            y[17] || (y[17] = e("legend", null, "可见范围", -1)),
            e("label", null, [
              Z(e("input", {
                "onUpdate:modelValue": y[2] || (y[2] = (S) => _.value.privacy = S),
                type: "radio",
                value: 0,
                disabled: _.value.submitting
              }, null, 8, So), [
                [
                  it,
                  _.value.privacy,
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
              Z(e("input", {
                "onUpdate:modelValue": y[3] || (y[3] = (S) => _.value.privacy = S),
                type: "radio",
                value: 1,
                disabled: _.value.submitting
              }, null, 8, To), [
                [
                  it,
                  _.value.privacy,
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
            class: A(["fo-create-status", { error: _.value.error }]),
            role: "status"
          }, a(_.value.status), 3),
          e("footer", null, [
            e("button", {
              type: "button",
              disabled: _.value.submitting,
              onClick: y[4] || (y[4] = (S) => r(ie).closeCreate())
            }, "取消", 8, Mo),
            e("button", {
              class: "primary",
              type: "submit",
              disabled: _.value.submitting
            }, a(_.value.submitting ? "创建中…" : D.value ? "创建收藏夹" : "创建分组"), 9, Do)
          ])
        ], 32)
      ], 32)) : k("", !0),
      g.value.open ? (o(), s("dialog", {
        key: 1,
        class: "bili-sub-add-dialog",
        open: "",
        onCancel: y[10] || (y[10] = x((S) => r(ie).closeChannelPicker(), ["prevent"]))
      }, [
        e("div", Po, [
          e("header", null, [
            y[18] || (y[18] = e("div", null, [
              e("b", null, "从我的关注中添加 UP 主"),
              e("small", null, "沿用“正在关注”的本地分组，只能添加已关注的 UP 主")
            ], -1)),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: !!g.value.submittingMid,
              onClick: y[7] || (y[7] = (S) => r(ie).closeChannelPicker())
            }, "×", 8, zo)
          ]),
          e("div", Bo, [
            e("div", Io, [
              e("button", {
                type: "button",
                class: A(["bili-sub-add-group", { on: g.value.activeGroupId === "__all__" }]),
                onClick: y[8] || (y[8] = (S) => r(ie).updateChannelPicker({ activeGroupId: "__all__" }))
              }, "全部关注", 2),
              (o(!0), s(E, null, O(g.value.groups, (S) => (o(), s("button", {
                key: S.id,
                type: "button",
                class: A(["bili-sub-add-group", { on: g.value.activeGroupId === S.id }]),
                onClick: (V) => r(ie).updateChannelPicker({ activeGroupId: S.id })
              }, a(S.name), 11, Ro))), 128))
            ]),
            Z(e("input", {
              "onUpdate:modelValue": y[9] || (y[9] = (S) => g.value.query = S),
              type: "search",
              placeholder: "搜索关注的 UP 主"
            }, null, 512), [
              [ge, g.value.query]
            ])
          ]),
          e("div", Lo, [
            g.value.loading ? (o(), s("div", Ao, [...y[19] || (y[19] = [
              e("i", null, null, -1),
              e("span", null, "正在读取关注分组…", -1)
            ])])) : g.value.error ? (o(), s("p", Eo, a(g.value.error), 1)) : G.value.length ? (o(!0), s(E, { key: 3 }, O(G.value, (S) => (o(), s("button", {
              key: S.mid,
              type: "button",
              class: "bili-sub-add-up",
              disabled: S.added || !!g.value.submittingMid,
              onClick: (V) => r(ie).selectChannel(S.mid)
            }, [
              S.face ? (o(), s("img", {
                key: 0,
                src: S.face,
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, Fo)) : (o(), s("span", No, "UP")),
              e("span", null, [
                e("b", null, a(S.name), 1),
                e("small", null, "UID " + a(S.mid), 1)
              ]),
              e("i", null, a(S.added ? "已添加" : g.value.submittingMid === S.mid ? "添加中…" : "＋ 添加"), 1)
            ], 8, Vo))), 128)) : (o(), s("p", Uo, "该分组中没有匹配的已关注 UP 主。"))
          ])
        ])
      ], 32)) : k("", !0),
      B.value.open ? (o(), s("div", {
        key: 2,
        class: "fo-custom-confirm-overlay",
        onClick: y[13] || (y[13] = x((S) => r(ie).closeConfirm(), ["self"]))
      }, [
        e("div", qo, [
          e("div", Go, [
            e("h4", null, a(B.value.title), 1)
          ]),
          e("div", Oo, [
            e("p", null, a(B.value.message), 1)
          ]),
          e("div", Ho, [
            e("button", {
              type: "button",
              class: "fo-confirm-btn cancel",
              disabled: B.value.submitting,
              onClick: y[11] || (y[11] = (S) => r(ie).closeConfirm())
            }, a(B.value.cancelText), 9, Wo),
            e("button", {
              type: "button",
              class: A(["fo-confirm-btn confirm", { danger: B.value.danger }]),
              disabled: B.value.submitting,
              onClick: y[12] || (y[12] = (S) => r(ie).submitConfirm())
            }, a(B.value.submitting ? "处理中…" : B.value.confirmText), 11, jo)
          ])
        ])
      ])) : k("", !0)
    ], 64));
  }
}), Xo = { class: "fo-upg-shell" }, Ko = { class: "fo-upg-body" }, Qo = { class: "fo-upg-sidebar" }, Jo = { class: "fo-upg-sidebar-head" }, Zo = { class: "fo-upg-group-items" }, es = ["onDragstart", "onDrop", "onClick"], ts = ["onKeydown"], is = {
  key: 0,
  class: "fo-upg-tree-branch"
}, os = {
  key: 1,
  class: "fo-folder-icon"
}, ss = { class: "fo-upg-group-name" }, ls = { class: "fo-upg-vue-group-actions" }, ns = ["onClick"], as = ["onClick"], rs = ["onClick"], us = ["placeholder"], ds = {
  key: 1,
  class: "muted small"
}, cs = { class: "fo-upg-main" }, ps = { class: "fo-upg-main-head" }, bs = { class: "fo-upg-main-title" }, vs = { key: 0 }, fs = { class: "fo-upg-head-actions" }, gs = { class: "fo-upg-filter-tabs" }, ms = { class: "fo-upg-batch-wrap" }, ys = { class: "fo-upg-batch-count" }, hs = ["disabled"], _s = ["disabled"], ks = { class: "fo-upg-toolbar" }, $s = { class: "fo-upg-search" }, ws = ["disabled"], Cs = {
  key: 0,
  class: "fo-bili-loading"
}, xs = {
  key: 1,
  class: "fo-bili-empty"
}, Ss = {
  key: 2,
  class: "fo-bili-empty"
}, Ts = {
  key: 3,
  class: "fo-bili-empty"
}, Ms = ["title", "onContextmenu", "onClick"], Ds = ["src"], Ps = { class: "fo-upg-info" }, zs = { class: "fo-upg-name" }, Bs = { class: "fo-upg-sign" }, Is = ["disabled", "onClick"], Rs = {
  key: 1,
  class: "fo-upg-move-wrap"
}, Ls = ["disabled"], As = { class: "fo-upg-move-dropdown" }, Es = ["disabled", "onClick"], Us = { key: 0 }, Vs = {
  key: 0,
  class: "muted small",
  style: { padding: "6px 10px" }
}, Fs = ["disabled", "onClick"], Ns = { class: "fo-upg-pagination" }, qs = { class: "fo-upg-page-info" }, Gs = {
  key: 0,
  class: "fo-upg-page-btns"
}, Os = ["disabled"], Hs = ["disabled"], Ws = { class: "fo-upg-page-cur" }, js = ["disabled"], Ys = ["disabled"], Xs = /* @__PURE__ */ Te({
  __name: "BiliUpGroupManager",
  setup(ye) {
    const _ = T(void 0), B = T(""), g = T(""), D = T(""), G = T(""), l = T(!1), R = T(/* @__PURE__ */ new Set()), y = T(null);
    function S($) {
      if ($.button !== 0 || $.target.closest("button,input")) return;
      const u = y.value;
      if (!u) return;
      const d = u.getBoundingClientRect(), M = d.left, X = d.top, he = $.clientX, De = $.clientY;
      u.style.position = "fixed", u.style.left = `${M}px`, u.style.top = `${X}px`, u.style.right = "auto", u.style.bottom = "auto", u.style.margin = "0", u.style.transform = "none";
      const se = (_e) => {
        const Pe = _e.clientX - he, ze = _e.clientY - De, Ce = Math.max(8, Math.min(window.innerWidth - 120, M + Pe)), Be = Math.max(8, Math.min(window.innerHeight - 80, X + ze));
        u.style.left = `${Ce}px`, u.style.top = `${Be}px`;
      }, we = () => {
        window.removeEventListener("pointermove", se), window.removeEventListener("pointerup", we);
      };
      window.addEventListener("pointermove", se), window.addEventListener("pointerup", we);
    }
    const V = te(() => v.groups.find(($) => $.id === v.activeGroupId) || null), m = te(() => {
      const $ = v.query.trim().toLowerCase(), u = v.activeGroupId;
      return v.followings.filter((d) => {
        if ($ && !d.name.toLowerCase().includes($) && !d.sign.toLowerCase().includes($) && !d.mid.includes($)) return !1;
        const M = d.groupIds.includes(u);
        return v.filter === "ingroup" ? M : v.onlyUngrouped ? !d.groupIds || d.groupIds.length === 0 : !0;
      });
    }), P = te(() => Math.max(1, Math.ceil(m.value.length / v.pageSize))), Q = te(() => {
      const u = (Math.min(v.page, P.value) - 1) * v.pageSize;
      return m.value.slice(u, u + v.pageSize);
    }), oe = te(() => v.followings.filter(($) => $.groupIds.length === 0).length), q = T(null), be = /* @__PURE__ */ new Map();
    function ee($) {
      const u = Math.max(1, Math.min(P.value, $));
      v.page = u, q.value && (q.value.scrollTop = 0);
    }
    pe(() => [v.query, v.filter, v.onlyUngrouped], () => {
      v.page = 1, q.value && (q.value.scrollTop = 0);
    }), pe(() => v.activeGroupId, ($, u) => {
      if (u && q.value) {
        const X = `${u}_${v.filter}_${v.onlyUngrouped}`;
        be.set(X, {
          page: v.page,
          scrollTop: q.value.scrollTop
        });
      }
      if (v.filter === "all")
        return;
      const d = `${$}_${v.filter}_${v.onlyUngrouped}`, M = be.get(d);
      M ? (v.page = Math.min(M.page, P.value), Ze(() => {
        q.value && (q.value.scrollTop = M.scrollTop);
      })) : (v.page = 1, Ze(() => {
        q.value && (q.value.scrollTop = 0);
      }));
    }), pe(P, ($) => {
      v.page > $ && (v.page = $);
    }), pe(l, ($) => {
      $ || R.value.clear();
    });
    function ae($) {
      _.value = $, B.value = "";
    }
    function ve() {
      _.value = void 0, B.value = "";
    }
    function b() {
      const $ = B.value.trim();
      $ && (le.dispatch("create-group", { name: $, parentId: _.value || "" }), ve());
    }
    function z($) {
      g.value = $.id, D.value = $.name;
    }
    function h() {
      const $ = D.value.trim();
      g.value && $ && le.dispatch("rename-group", { id: g.value, name: $ }), g.value = "", D.value = "";
    }
    function F($, u) {
      G.value = u, $.dataTransfer?.setData("application/x-logicweaver-up-group", u), $.dataTransfer && ($.dataTransfer.effectAllowed = "move");
    }
    function W($, u) {
      const d = $.dataTransfer?.getData("application/x-logicweaver-up-group") || G.value;
      if (G.value = "", !d || d === u) return;
      const M = $.currentTarget?.getBoundingClientRect(), X = M ? $.clientY - M.top : 0, he = M ? X < M.height * 0.25 ? "before" : X > M.height * 0.75 ? "after" : "into" : "into";
      le.dispatch("move-group", { sourceId: d, targetId: u, mode: he });
    }
    function K($) {
      const u = $.dataTransfer?.getData("application/x-logicweaver-up-group") || G.value;
      G.value = "", u && le.dispatch("move-group", { sourceId: u, targetId: "", mode: "root" });
    }
    function re($, u) {
      !u || v.busyMid || le.dispatch("toggle-member", { groupId: u, mid: $ });
    }
    function Me($) {
      !v.activeGroupId || v.busyMid || le.dispatch("toggle-member", { groupId: v.activeGroupId, mid: $ });
    }
    function Ae($, u) {
      le.dispatch("preview-up", { mid: u, clientX: $.clientX, clientY: $.clientY });
    }
    function $e($) {
      const u = R.value;
      u.has($) ? u.delete($) : u.add($);
    }
    function Ee() {
      if (!v.activeGroupId || v.busyMid) return;
      const $ = Array.from(R.value);
      if (!$.length) return;
      const u = $.filter((d) => {
        const M = v.followings.find((X) => X.mid === d);
        return M && !M.groupIds.includes(v.activeGroupId);
      });
      if (u.length) {
        for (const d of u)
          le.dispatch("toggle-member", { groupId: v.activeGroupId, mid: d });
        R.value.clear();
      }
    }
    function Ve() {
      if (!v.activeGroupId || v.busyMid) return;
      const $ = Array.from(R.value);
      if (!$.length) return;
      const u = $.filter((d) => {
        const M = v.followings.find((X) => X.mid === d);
        return M && M.groupIds.includes(v.activeGroupId);
      });
      if (u.length) {
        for (const d of u)
          le.dispatch("toggle-member", { groupId: v.activeGroupId, mid: d });
        R.value.clear();
      }
    }
    function Fe() {
      for (const $ of Q.value) R.value.add($.mid);
    }
    return ($, u) => r(v).open ? (o(), s("dialog", {
      key: 0,
      ref_key: "dialogEl",
      ref: y,
      class: "fo-up-group-dialog",
      open: "",
      onCancel: u[20] || (u[20] = x((d) => r(le).close(), ["prevent"]))
    }, [
      e("div", Xo, [
        e("header", {
          class: "fo-upg-head",
          onPointerdown: S
        }, [
          u[21] || (u[21] = e("h3", null, [
            e("span", null, "👥"),
            ne(" 关注分组与 UP 主管理")
          ], -1)),
          e("button", {
            type: "button",
            class: "fo-upg-close-btn",
            "aria-label": "关闭",
            title: "关闭管理面板",
            onClick: u[0] || (u[0] = (d) => r(le).close())
          }, "✕")
        ], 32),
        e("div", Ko, [
          e("aside", Qo, [
            e("div", Jo, [
              u[22] || (u[22] = e("span", null, "我的分组", -1)),
              e("button", {
                type: "button",
                onClick: u[1] || (u[1] = (d) => ae(null))
              }, "＋ 新建")
            ]),
            e("div", Zo, [
              e("div", {
                class: "fo-upg-root-dropzone",
                onDragover: u[2] || (u[2] = x(() => {
                }, ["prevent"])),
                onDrop: x(K, ["prevent"])
              }, "⇣ 拖至此处变为顶级分组", 32),
              _.value === null ? (o(), s("form", {
                key: 0,
                class: "fo-upg-create-box",
                onSubmit: x(b, ["prevent"])
              }, [
                Z(e("input", {
                  "onUpdate:modelValue": u[3] || (u[3] = (d) => B.value = d),
                  maxlength: "20",
                  placeholder: "输入分组名称…",
                  autofocus: ""
                }, null, 512), [
                  [ge, B.value]
                ]),
                e("div", { class: "fo-upg-create-btns" }, [
                  e("button", {
                    type: "button",
                    class: "cancel",
                    onClick: ve
                  }, "取消"),
                  u[23] || (u[23] = e("button", {
                    class: "confirm",
                    type: "submit"
                  }, "确定", -1))
                ])
              ], 32)) : k("", !0),
              (o(!0), s(E, null, O(r(v).groups, (d) => (o(), s(E, {
                key: d.id
              }, [
                e("div", {
                  class: A(["fo-upg-group-item", { on: d.id === r(v).activeGroupId, "is-subgroup": d.depth > 0 }]),
                  style: me({ paddingLeft: `${8 + d.depth * 18}px` }),
                  draggable: "true",
                  onDragstart: (M) => F(M, d.id),
                  onDragover: u[7] || (u[7] = x(() => {
                  }, ["prevent"])),
                  onDrop: x((M) => W(M, d.id), ["prevent"]),
                  onClick: (M) => r(v).activeGroupId = d.id
                }, [
                  g.value === d.id ? (o(), s(E, { key: 0 }, [
                    Z(e("input", {
                      "onUpdate:modelValue": u[4] || (u[4] = (M) => D.value = M),
                      class: "fo-upg-rename-input",
                      maxlength: "20",
                      onClick: u[5] || (u[5] = x(() => {
                      }, ["stop"])),
                      onKeydown: Se(x(h, ["prevent"]), ["enter"])
                    }, null, 40, ts), [
                      [ge, D.value]
                    ]),
                    e("button", {
                      type: "button",
                      onClick: x(h, ["stop"])
                    }, "✓"),
                    e("button", {
                      type: "button",
                      onClick: u[6] || (u[6] = x((M) => g.value = "", ["stop"]))
                    }, "✕")
                  ], 64)) : (o(), s(E, { key: 1 }, [
                    d.depth ? (o(), s("span", is, "↳")) : (o(), s("i", os)),
                    e("span", ss, a(d.name), 1),
                    e("small", null, a(d.upMids.length), 1),
                    e("span", ls, [
                      e("button", {
                        type: "button",
                        title: "添加子分组",
                        onClick: x((M) => ae(d.id), ["stop"])
                      }, "＋", 8, ns),
                      e("button", {
                        type: "button",
                        title: "重命名",
                        onClick: x((M) => z(d), ["stop"])
                      }, "✎", 8, as),
                      e("button", {
                        type: "button",
                        class: "danger",
                        title: "删除",
                        onClick: x((M) => r(le).dispatch("delete-group", d.id), ["stop"])
                      }, "×", 8, rs)
                    ])
                  ], 64))
                ], 46, es),
                _.value === d.id ? (o(), s("form", {
                  key: 0,
                  class: "fo-upg-create-box",
                  style: me({ marginLeft: `${18 + d.depth * 18}px` }),
                  onSubmit: x(b, ["prevent"])
                }, [
                  Z(e("input", {
                    "onUpdate:modelValue": u[8] || (u[8] = (M) => B.value = M),
                    maxlength: "20",
                    placeholder: `输入「${d.name}」的子分组名称…`,
                    autofocus: ""
                  }, null, 8, us), [
                    [ge, B.value]
                  ]),
                  e("div", { class: "fo-upg-create-btns" }, [
                    e("button", {
                      type: "button",
                      class: "cancel",
                      onClick: ve
                    }, "取消"),
                    u[24] || (u[24] = e("button", {
                      class: "confirm",
                      type: "submit"
                    }, "确定", -1))
                  ])
                ], 36)) : k("", !0)
              ], 64))), 128)),
              !r(v).groups.length && !r(v).loading ? (o(), s("p", ds, '暂无分组，请点击"＋ 新建"。')) : k("", !0)
            ])
          ]),
          e("section", cs, [
            e("div", ps, [
              e("div", bs, [
                e("h4", null, a(V.value ? `分组：「${V.value.name}」` : "请先选择或新建分组"), 1),
                V.value ? (o(), s("span", vs, "（本组 " + a(V.value.upMids.length) + " 位 · 共 " + a(r(v).followings.length) + " 位关注 · 未分组 " + a(oe.value) + " 位）", 1)) : k("", !0)
              ]),
              e("div", fs, [
                e("div", gs, [
                  e("button", {
                    type: "button",
                    class: A(["fo-upg-filter-tab", { on: r(v).filter === "all" }]),
                    onClick: u[9] || (u[9] = (d) => r(v).filter = "all")
                  }, "全部关注", 2),
                  e("button", {
                    type: "button",
                    class: A(["fo-upg-filter-tab", { on: r(v).filter === "ingroup" }]),
                    onClick: u[10] || (u[10] = (d) => r(v).filter = "ingroup")
                  }, "本组已加", 2)
                ]),
                e("div", ms, [
                  e("button", {
                    type: "button",
                    class: A(["fo-upg-batch-toggle", { on: l.value }]),
                    onClick: u[11] || (u[11] = (d) => l.value = !l.value)
                  }, a(l.value ? "退出批量" : "批量操作"), 3),
                  l.value && R.value.size > 0 ? (o(), s(E, { key: 0 }, [
                    e("span", ys, "已选 " + a(R.value.size), 1),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action add",
                      disabled: !V.value,
                      onClick: Ee
                    }, "＋ 加入本组", 8, hs),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action remove",
                      disabled: !V.value,
                      onClick: Ve
                    }, "− 移出本组", 8, _s),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: Fe
                    }, "全选当页"),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: u[12] || (u[12] = (d) => R.value.clear())
                    }, "清除")
                  ], 64)) : k("", !0)
                ]),
                r(v).filter === "all" ? (o(), s("label", {
                  key: 0,
                  class: A(["fo-upg-switch", { on: r(v).onlyUngrouped }])
                }, [
                  Z(e("input", {
                    "onUpdate:modelValue": u[13] || (u[13] = (d) => r(v).onlyUngrouped = d),
                    type: "checkbox"
                  }, null, 512), [
                    [ft, r(v).onlyUngrouped]
                  ]),
                  u[25] || (u[25] = e("span", { class: "fo-upg-switch-track" }, [
                    e("span", { class: "fo-upg-switch-thumb" })
                  ], -1)),
                  u[26] || (u[26] = e("span", { class: "fo-upg-switch-text" }, "仅未分组 UP", -1))
                ], 2)) : k("", !0)
              ])
            ]),
            e("div", ks, [
              e("div", $s, [
                u[27] || (u[27] = e("span", null, "🔍", -1)),
                Z(e("input", {
                  "onUpdate:modelValue": u[14] || (u[14] = (d) => r(v).query = d),
                  type: "search",
                  placeholder: "搜索关注的 UP 主…"
                }, null, 512), [
                  [ge, r(v).query]
                ])
              ]),
              e("button", {
                type: "button",
                class: "fo-upg-refresh-btn",
                disabled: r(v).refreshing,
                onClick: u[15] || (u[15] = (d) => r(le).dispatch("refresh"))
              }, a(r(v).refreshing ? "刷新中…" : "↻ 刷新关注"), 9, ws)
            ]),
            e("div", {
              ref_key: "listRef",
              ref: q,
              class: "fo-upg-list"
            }, [
              r(v).loading ? (o(), s("div", Cs, [...u[28] || (u[28] = [
                e("i", null, null, -1),
                e("span", null, "正在加载关注的 UP 主列表…", -1)
              ])])) : r(v).error ? (o(), s("p", xs, a(r(v).error), 1)) : V.value ? Q.value.length ? (o(!0), s(E, { key: 4 }, O(Q.value, (d) => (o(), s("article", {
                key: d.mid,
                class: A(["fo-upg-card", { selected: l.value && R.value.has(d.mid) }]),
                title: `右键查看「${d.name}」近期投稿`,
                onContextmenu: x((M) => Ae(M, d.mid), ["prevent"]),
                onClick: (M) => l.value ? $e(d.mid) : void 0
              }, [
                e("img", {
                  src: d.face,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, Ds),
                e("div", Ps, [
                  e("div", zs, a(d.name), 1),
                  e("div", Bs, a(d.sign || "暂无签名"), 1)
                ]),
                l.value ? (o(), s("div", {
                  key: 1,
                  class: A(["fo-upg-batch-check", { checked: R.value.has(d.mid) }])
                }, a(R.value.has(d.mid) ? "✓" : ""), 3)) : (o(), s(E, { key: 0 }, [
                  d.groupIds.includes(r(v).activeGroupId) ? (o(), s("button", {
                    key: 0,
                    type: "button",
                    class: "fo-upg-toggle-btn in-group",
                    disabled: r(v).busyMid === d.mid,
                    onClick: x((M) => Me(d.mid), ["stop"])
                  }, a(r(v).busyMid === d.mid ? "处理中…" : `移出 ${V.value?.name || ""}`), 9, Is)) : d.groupIds.length > 0 ? (o(), s("div", Rs, [
                    e("button", {
                      type: "button",
                      class: "fo-upg-toggle-btn belongs-other fo-upg-move-trigger",
                      disabled: r(v).busyMid === d.mid
                    }, a(r(v).busyMid === d.mid ? "处理中…" : `📁 ${d.groupName || "已分组"}`), 9, Ls),
                    e("div", As, [
                      u[30] || (u[30] = e("div", { class: "fo-upg-move-title" }, "移动到分组", -1)),
                      (o(!0), s(E, null, O(r(v).groups, (M) => (o(), s("button", {
                        key: M.id,
                        type: "button",
                        class: A(["fo-upg-move-item", { active: d.groupIds.includes(M.id) }]),
                        disabled: r(v).busyMid === d.mid,
                        onClick: x((X) => re(d.mid, M.id), ["stop"])
                      }, [
                        u[29] || (u[29] = e("i", { class: "fo-folder-icon small" }, null, -1)),
                        e("span", null, a(M.name), 1),
                        d.groupIds.includes(M.id) ? (o(), s("small", Us, "✓ 已加入")) : k("", !0)
                      ], 10, Es))), 128)),
                      r(v).groups.length ? k("", !0) : (o(), s("p", Vs, "暂无分组"))
                    ])
                  ])) : r(v).activeGroupId ? (o(), s("button", {
                    key: 2,
                    type: "button",
                    class: "fo-upg-toggle-btn",
                    disabled: r(v).busyMid === d.mid,
                    onClick: x((M) => Me(d.mid), ["stop"])
                  }, a(r(v).busyMid === d.mid ? "处理中…" : "＋ 加入"), 9, Fs)) : k("", !0)
                ], 64))
              ], 42, Ms))), 128)) : (o(), s("p", Ts, "没有符合条件的 UP 主。")) : (o(), s("p", Ss, "请先新建或选择一个分组。"))
            ], 512),
            e("div", Ns, [
              e("div", qs, "共 " + a(m.value.length) + " 位 UP 主 · 每页 " + a(r(v).pageSize) + " 位", 1),
              P.value > 1 ? (o(), s("div", Gs, [
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(v).page <= 1,
                  onClick: u[16] || (u[16] = (d) => ee(1))
                }, "« 首页", 8, Os),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(v).page <= 1,
                  onClick: u[17] || (u[17] = (d) => ee(r(v).page - 1))
                }, "‹ 上一页", 8, Hs),
                e("span", Ws, a(r(v).page) + " / " + a(P.value), 1),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(v).page >= P.value,
                  onClick: u[18] || (u[18] = (d) => ee(r(v).page + 1))
                }, "下一页 ›", 8, js),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(v).page >= P.value,
                  onClick: u[19] || (u[19] = (d) => ee(P.value))
                }, "末页 »", 8, Ys)
              ])) : k("", !0)
            ])
          ])
        ])
      ])
    ], 544)) : k("", !0);
  }
}), Ks = /* @__PURE__ */ Le(Xs, [["__scopeId", "data-v-9e5aa70a"]]), Qs = ["title"], Js = { class: "tape-capsule-text" }, Zs = { class: "capsule-title" }, el = { class: "capsule-sub" }, tl = ["title"], il = { class: "tape-deck-drop-slot" }, ol = {
  key: 1,
  class: "tape-insert-feedback-chip"
}, sl = { class: "tape-loaded-title" }, ll = { class: "tape-body-content" }, nl = ["title"], al = { class: "tape-cassette" }, rl = { class: "tape-center-label" }, ul = { class: "tape-sticker-head" }, dl = ["title"], cl = ["src"], pl = { class: "tape-badge-row" }, bl = { class: "tape-brand-text" }, vl = {
  class: "tape-transport-controls",
  role: "group",
  "aria-label": "电台播放控制"
}, fl = ["title", "aria-label"], gl = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, ml = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "currentColor"
}, yl = { class: "tape-playback-section" }, hl = { class: "tape-time-lyric-row" }, _l = { class: "tape-timestamp" }, kl = { class: "tape-lyric-container" }, $l = ["title"], wl = ["aria-valuenow"], Cl = {
  class: "tape-waveform-row",
  "aria-hidden": "true"
}, xl = {
  class: "tape-waveform-svg",
  viewBox: "0 0 160 16",
  preserveAspectRatio: "none"
}, Sl = ["x", "y", "height"], Tl = /* @__PURE__ */ Te({
  __name: "BiliRadioTapePlayer",
  props: {
    dockSide: { type: Boolean, default: !1 }
  },
  setup(ye) {
    const _ = ye, B = [
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
    ], g = T(!1), D = T(null), G = T(!1), l = T(!1), R = T(""), y = T(!1), S = T(380);
    function V() {
      if (typeof document > "u" || !_.dockSide) return;
      const z = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock"), h = 20, F = 16;
      if (z) {
        const K = z.getBoundingClientRect();
        if (K.left > 80) {
          const re = Math.floor(K.left - h - F);
          if (re > 220) {
            S.value = re;
            return;
          }
        }
      }
      const W = typeof window < "u" ? window.innerWidth : 1280;
      S.value = Math.max(220, Math.floor(W / 2 - 230));
    }
    let m = null;
    function P() {
      clearTimeout(m), m = setTimeout(V, 60);
    }
    We(() => {
      if (_.dockSide) {
        V(), window.addEventListener("resize", P);
        const z = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
        if (z && typeof ResizeObserver < "u") {
          const h = new ResizeObserver(() => V());
          h.observe(z), z.__bili_dock_ro = h;
        }
      }
    }), ut(() => {
      typeof window < "u" && window.removeEventListener("resize", P);
      const z = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
      z && z.__bili_dock_ro && (z.__bili_dock_ro.disconnect(), delete z.__bili_dock_ro);
    }), pe(() => j.playing, (z) => {
      z && y.value && (y.value = !1);
    });
    function Q(z) {
      z.preventDefault(), G.value = !0;
    }
    function oe(z) {
      z.preventDefault(), z.dataTransfer && (z.dataTransfer.dropEffect = "copy"), G.value = !0;
    }
    function q(z) {
      const h = z.currentTarget, F = z.relatedTarget;
      (!F || !h.contains(F)) && (G.value = !1);
    }
    function be(z) {
      z.preventDefault(), G.value = !1;
      const h = z.dataTransfer;
      if (!h) return;
      let F = h.getData("application/x-bili-cassette") || h.getData("application/json"), W = null;
      if (F)
        try {
          W = JSON.parse(F);
        } catch {
        }
      if (!W?.bvid) {
        const re = (h.getData("text/plain") || h.getData("text/uri-list") || h.getData("application/x-logicweaver-video-url"))?.match(/BV[0-9a-zA-Z]+/);
        re && (W = {
          bvid: re[0],
          title: "放入的单曲卡带",
          cover: "",
          author: "Bilibili",
          duration: 0
        });
      }
      W?.bvid && (l.value = !0, R.value = W.title || W.bvid, setTimeout(() => {
        xe.insertAndPlay(W);
      }, 280), setTimeout(() => {
        l.value = !1;
      }, 1500));
    }
    function ee(z) {
      if (D.value) {
        g.value = !0;
        try {
          z.currentTarget?.setPointerCapture?.(z.pointerId);
        } catch {
        }
        b(z);
      }
    }
    function ae(z) {
      g.value && b(z);
    }
    function ve(z) {
      if (g.value) {
        b(z), g.value = !1;
        try {
          z.currentTarget?.releasePointerCapture?.(z.pointerId);
        } catch {
        }
      }
    }
    function b(z) {
      if (!D.value) return;
      const h = D.value.getBoundingClientRect();
      if (h.width <= 0) return;
      const F = z.clientX - h.left, W = Math.max(0, Math.min(100, F / h.width * 100));
      xe.seek(W);
    }
    return (z, h) => (o(), s("div", {
      class: A(["bili-tape-deck", {
        "is-playing": r(j).playing,
        "is-drag-over": G.value,
        "is-inserting": l.value,
        "dock-side-mode": _.dockSide,
        "dock-side-collapsed": _.dockSide && y.value
      }]),
      style: me(_.dockSide && !y.value ? { maxWidth: `${S.value}px` } : void 0),
      onDragenter: Q,
      onDragover: oe,
      onDragleave: q,
      onDrop: be
    }, [
      _.dockSide && y.value ? (o(), s("div", {
        key: 0,
        class: "tape-collapsed-capsule",
        title: `电台：${r(j).title || "哔哩哔哩电台"} (点击展开)`,
        onClick: h[2] || (h[2] = (F) => y.value = !1)
      }, [
        e("div", {
          class: A(["tape-capsule-spool", { spinning: r(j).playing }])
        }, [...h[9] || (h[9] = [
          e("div", { class: "spool-center-dot" }, null, -1)
        ])], 2),
        e("div", Js, [
          e("strong", Zs, a(r(j).title || "B站电台"), 1),
          e("small", el, a(r(j).playing ? "♪ 播放中" : "已暂停"), 1)
        ]),
        e("button", {
          type: "button",
          class: "tape-capsule-play-btn",
          title: r(j).playing ? "暂停" : "播放",
          onClick: h[0] || (h[0] = x((F) => r(xe).togglePlay(), ["stop"]))
        }, a(r(j).playing ? "⏸" : "▶"), 9, tl),
        e("button", {
          type: "button",
          class: "tape-capsule-expand-btn",
          title: "展开完整磁带播放条",
          onClick: h[1] || (h[1] = x((F) => y.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, Qs)) : k("", !0),
      Z(e("div", il, [...h[10] || (h[10] = [
        gt('<div class="slot-visual-frame" data-v-a3cb8100><span class="slot-icon-tape" data-v-a3cb8100>📼</span><div class="slot-text-col" data-v-a3cb8100><strong class="slot-headline" data-v-a3cb8100>释放鼠标装填卡带</strong><small class="slot-subline" data-v-a3cb8100>拖入视频封面 · 立即播放音乐</small></div></div>', 1)
      ])], 512), [
        [et, G.value]
      ]),
      l.value ? (o(), s("div", ol, [
        h[11] || (h[11] = e("span", { class: "tape-click-sound" }, "✓ 已装填", -1)),
        e("span", sl, "《" + a(R.value) + "》", 1)
      ])) : k("", !0),
      Z(e("div", ll, [
        e("div", {
          class: "tape-cassette-wrap",
          role: "button",
          tabindex: "0",
          title: r(j).playing ? "点击暂停电台 (也可直接拖拽视频封面至此装填)" : "点击播放电台 (也可直接拖拽视频封面至此装填)",
          onClick: h[3] || (h[3] = (F) => r(xe).togglePlay()),
          onKeydown: h[4] || (h[4] = Se(x((F) => r(xe).togglePlay(), ["prevent"]), ["enter", "space"]))
        }, [
          e("div", al, [
            h[14] || (h[14] = e("div", { class: "tape-spool tape-spool-left" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1)),
            e("div", rl, [
              e("div", ul, [
                r(j).coverUrl ? (o(), s("div", {
                  key: 0,
                  class: "tape-cover-sticker",
                  title: r(j).title
                }, [
                  e("img", {
                    src: r(j).coverUrl,
                    alt: "Cover",
                    referrerpolicy: "no-referrer"
                  }, null, 8, cl)
                ], 8, dl)) : k("", !0),
                e("div", pl, [
                  h[12] || (h[12] = e("span", { class: "side-letter" }, "A", -1)),
                  e("span", bl, a(r(j).seriesName || "CASSETTE"), 1)
                ])
              ]),
              h[13] || (h[13] = e("div", { class: "tape-acrylic-window" }, [
                e("div", { class: "tape-ribbon-bar" }),
                e("div", { class: "tape-scale-marks" }, [
                  e("span", null, "100"),
                  e("span", null, "50"),
                  e("span", null, "0")
                ])
              ], -1))
            ]),
            h[15] || (h[15] = e("div", { class: "tape-spool tape-spool-right" }, [
              e("div", { class: "tape-spool-teeth" }, [
                e("span"),
                e("span"),
                e("span")
              ]),
              e("div", { class: "tape-spool-center" })
            ], -1))
          ])
        ], 40, nl),
        e("div", vl, [
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "上一首",
            "aria-label": "上一首",
            onClick: h[5] || (h[5] = (F) => r(xe).prev())
          }, [...h[16] || (h[16] = [
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
            class: A(["tape-ctrl-btn tape-ctrl-play", { playing: r(j).playing }]),
            title: r(j).playing ? "暂停播放" : "开始播放",
            "aria-label": r(j).playing ? "暂停" : "播放",
            onClick: h[6] || (h[6] = (F) => r(xe).togglePlay())
          }, [
            r(j).playing ? (o(), s("svg", gl, [...h[17] || (h[17] = [
              e("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" }, null, -1)
            ])])) : (o(), s("svg", ml, [...h[18] || (h[18] = [
              e("path", { d: "M8 5v14l11-7z" }, null, -1)
            ])]))
          ], 10, fl),
          e("button", {
            type: "button",
            class: "tape-ctrl-btn",
            title: "下一首",
            "aria-label": "下一首",
            onClick: h[7] || (h[7] = (F) => r(xe).next())
          }, [...h[19] || (h[19] = [
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
        e("div", yl, [
          e("div", hl, [
            e("span", _l, a(r(j).formattedCurrent) + " / " + a(r(j).formattedDuration), 1),
            e("div", kl, [
              e("span", {
                class: "tape-lyric-text",
                title: r(j).lyric
              }, a(r(j).lyric || "♪ 纯音乐 / 伴奏"), 9, $l)
            ])
          ]),
          e("div", {
            ref_key: "progressLineRef",
            ref: D,
            class: "tape-progress-rail",
            role: "slider",
            "aria-valuenow": r(j).progressPercent,
            "aria-valuemin": "0",
            "aria-valuemax": "100",
            "aria-label": "电台播放进度",
            onPointerdown: ee,
            onPointermove: ae,
            onPointerup: ve,
            onPointercancel: ve
          }, [
            e("div", {
              class: "tape-progress-fill",
              style: me({ width: `${r(j).progressPercent}%` })
            }, null, 4),
            e("div", {
              class: "tape-progress-handle",
              style: me({ left: `${r(j).progressPercent}%` })
            }, null, 4)
          ], 40, wl),
          e("div", Cl, [
            (o(), s("svg", xl, [
              (o(), s(E, null, O(B, (F, W) => e("rect", {
                key: W,
                class: "wave-bar",
                x: W * 4,
                y: 16 - F * 0.7,
                width: "1.8",
                height: F * 0.7,
                rx: "0.9",
                style: me({ animationDelay: `${W % 8 * 0.12}s` })
              }, null, 12, Sl)), 64))
            ]))
          ])
        ]),
        _.dockSide ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "tape-dock-collapse-btn",
          title: "收起至左下角小胶囊",
          "aria-label": "收起磁带机",
          onClick: h[8] || (h[8] = x((F) => y.value = !0, ["stop"]))
        }, [...h[20] || (h[20] = [
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
        [et, !_.dockSide || !y.value]
      ])
    ], 38));
  }
}), rt = /* @__PURE__ */ Le(Tl, [["__scopeId", "data-v-a3cb8100"]]), Ml = ["title"], Dl = {
  key: 2,
  class: "hero-lyric-body"
}, Pl = { class: "hero-lyric-stage" }, zl = ["title"], Bl = /* @__PURE__ */ Te({
  __name: "BiliVideoLyricDockBar",
  props: {
    inlineHero: { type: Boolean, default: !1 }
  },
  setup(ye) {
    const _ = T(340), B = T(!1), g = T(!1), D = T(null);
    function G(V) {
      const m = document.querySelector(".bili-mini-screen video, .bili-sub-screen video");
      m && (m.currentTime = Math.max(0, m.currentTime + V));
    }
    let l = 0, R = 0, y = "right";
    function S(V, m) {
      m.preventDefault(), m.stopPropagation(), B.value = !0, y = V, l = m.clientX, R = _.value;
      const P = (oe) => {
        if (!B.value) return;
        const q = oe.clientX - l, be = y === "right" ? R + q : R - q, ee = Math.max(180, Math.min(720, be));
        _.value = ee;
      }, Q = () => {
        B.value = !1, window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", Q), window.removeEventListener("pointercancel", Q);
        try {
          localStorage.setItem("bili_hero_lyric_width", String(_.value));
        } catch {
        }
      };
      window.addEventListener("pointermove", P), window.addEventListener("pointerup", Q), window.addEventListener("pointercancel", Q);
    }
    return We(() => {
      try {
        const V = localStorage.getItem("bili_hero_lyric_width");
        if (V) {
          const m = parseInt(V, 10);
          Number.isFinite(m) && m >= 180 && m <= 720 && (_.value = m);
        }
      } catch {
      }
    }), (V, m) => (o(), s("aside", {
      ref_key: "barRef",
      ref: D,
      class: A(["bili-hero-lyric-bar", { "is-collapsed": g.value, "is-resizing": B.value }]),
      style: me(g.value ? void 0 : { width: `${_.value}px` }),
      "aria-label": "视频实时字幕与控制"
    }, [
      g.value ? k("", !0) : (o(), s("div", {
        key: 0,
        class: "lyric-resize-handle handle-left",
        title: "按住向左拉伸宽度",
        onPointerdown: m[0] || (m[0] = (P) => S("left", P))
      }, [...m[7] || (m[7] = [
        e("span", { class: "resize-line" }, null, -1)
      ])], 32)),
      g.value ? (o(), s("div", {
        key: 1,
        class: "hero-lyric-capsule",
        title: `视频台词：${r(I).organizer.heroLyricText || "暂无字幕"} (点击展开)`,
        onClick: m[2] || (m[2] = (P) => g.value = !1)
      }, [
        m[8] || (m[8] = e("span", { class: "capsule-icon" }, "💬", -1)),
        m[9] || (m[9] = e("span", { class: "capsule-text" }, "台词", -1)),
        e("button", {
          type: "button",
          class: "capsule-expand-btn",
          title: "展开台词栏",
          onClick: m[1] || (m[1] = x((P) => g.value = !1, ["stop"]))
        }, " ↗ ")
      ], 8, Ml)) : (o(), s("div", Dl, [
        e("div", Pl, [
          e("button", {
            type: "button",
            class: "hero-lyric-seek-btn",
            title: "当前视频后退 5 秒",
            "aria-label": "后退 5 秒",
            onClick: m[3] || (m[3] = (P) => G(-5))
          }, " ‹ "),
          e("strong", {
            class: "hero-lyric-current-text",
            title: r(I).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"
          }, a(r(I).organizer.heroLyricText || "点击视频播放，实时台词在此呈现"), 9, zl),
          e("button", {
            type: "button",
            class: "hero-lyric-seek-btn",
            title: "当前视频前进 5 秒",
            "aria-label": "前进 5 秒",
            onClick: m[4] || (m[4] = (P) => G(5))
          }, " › ")
        ]),
        e("button", {
          type: "button",
          class: "hero-lyric-collapse-btn",
          title: "收起台词栏",
          "aria-label": "收起台词栏",
          onClick: m[5] || (m[5] = x((P) => g.value = !0, ["stop"]))
        }, [...m[10] || (m[10] = [
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
        onPointerdown: m[6] || (m[6] = (P) => S("right", P))
      }, [...m[11] || (m[11] = [
        e("span", { class: "resize-line" }, null, -1)
      ])], 32))
    ], 6));
  }
}), Il = /* @__PURE__ */ Le(Bl, [["__scopeId", "data-v-d0857a88"]]), Rl = { class: "card-head bili-header-unified-row" }, Ll = { class: "bili-header-right" }, Al = ["title"], El = {
  key: 0,
  class: "bili-header-msg-badge"
}, Ul = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, Vl = { class: "card-fullscreen-bili-suggest-head" }, Fl = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, Nl = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, ql = ["onClick", "onContextmenu"], Gl = { class: "card-fullscreen-bili-thumb" }, Ol = ["src"], Hl = { key: 0 }, Wl = { class: "card-fullscreen-bili-video-copy" }, jl = {
  class: "fm-pane",
  id: "pane-organizer"
}, Yl = { id: "fo-body" }, Xl = { class: "fo-bili-sidebar" }, Kl = ["title"], Ql = { class: "fo-sidebar-toggle-title" }, Jl = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Zl = ["aria-expanded", "title"], en = { class: "fo-sidebar-toggle-chevron" }, tn = { class: "fo-sidebar-features-wrap" }, on = { class: "fo-sidebar-sub-wrap" }, sn = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, ln = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, nn = { class: "fo-sidebar-sub-wrap fo-sidebar-recommend-wrap" }, an = { class: "fo-sidebar-sub-wrap fo-sidebar-radio-wrap" }, rn = { class: "fo-sidebar-favorite-hub" }, un = {
  key: 0,
  class: "fo-move-target-banner"
}, dn = {
  class: "fo-bili-folder-list",
  "aria-label": "B站收藏夹"
}, cn = {
  key: 0,
  class: "fo-bili-section-divider"
}, pn = ["onDragover", "onDragleave", "onDrop"], bn = { class: "fo-bili-section-title" }, vn = ["data-folder-id", "data-folder-kind", "draggable", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], fn = ["aria-expanded", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], gn = {
  class: "fo-group-caret",
  "aria-hidden": "true"
}, mn = {
  key: 0,
  class: "muted small"
}, yn = {
  key: 0,
  id: "fo-vue-main",
  class: "fo-bili-main"
}, hn = {
  key: 0,
  class: "fo-bili-loading"
}, _n = {
  key: 1,
  class: "fo-bili-empty fo-bili-login-guide"
}, kn = { class: "fo-bili-login-card" }, $n = { class: "fo-bili-login-actions" }, wn = {
  key: 2,
  class: "fo-bili-empty"
}, Cn = { class: "fo-bili-hero fo-hero-persistent" }, xn = { class: "fo-hero-left" }, Sn = ["src"], Tn = {
  key: 1,
  class: "fo-folder-icon"
}, Mn = { class: "fo-hero-folder-info" }, Dn = { class: "fo-bili-actions" }, Pn = ["disabled"], zn = { class: "fo-bili-toolbar" }, Bn = {
  key: 0,
  class: "fo-bili-sort"
}, In = ["onClick"], Rn = {
  class: "fo-mini-dock-anchor",
  "aria-label": "视频标签页"
}, Ln = ["title"], An = { class: "fo-video-tab-title" }, En = { class: "fo-video-tab-actions" }, Un = ["title"], Vn = {
  key: 2,
  class: "fo-bili-batch-actions"
}, Fn = { class: "fo-batch-count" }, Nn = { class: "fo-bili-grid" }, qn = {
  key: 0,
  class: "fo-bili-empty"
}, Gn = ["data-batch-id", "onDragstart", "onContextmenu"], On = { class: "fo-bili-thumb" }, Hn = {
  key: 0,
  class: "fo-batch-check",
  title: "选择此视频"
}, Wn = ["checked", "onChange"], jn = ["href", "onClick"], Yn = ["src"], Xn = { class: "fo-bili-count" }, Kn = { class: "fo-bili-duration" }, Qn = { class: "fo-bili-title-row" }, Jn = ["href", "onClick"], Zn = ["aria-expanded", "onClick"], ea = {
  key: 0,
  class: "fo-card-menu"
}, ta = ["onClick"], ia = ["onClick"], oa = ["onClick"], sa = { class: "fo-bili-meta" }, la = ["onClick"], na = {
  key: 0,
  class: "fo-pager"
}, aa = ["disabled"], ra = { class: "fo-page-num" }, ua = ["disabled"], da = {
  key: 1,
  id: "fo-vue-cache-main",
  class: "fo-bili-main"
}, ca = { class: "fo-bili-hero fo-hero-persistent fo-cached-hero" }, pa = { class: "fo-hero-left" }, ba = { class: "fo-hero-folder-info" }, va = { class: "fo-bili-actions" }, fa = {
  key: 0,
  class: "fo-bili-loading"
}, ga = {
  key: 1,
  class: "fo-bili-grid fo-cached-video-grid"
}, ma = {
  key: 0,
  class: "fo-bili-empty"
}, ya = { class: "fo-bili-thumb" }, ha = ["onClick"], _a = ["src"], ka = { class: "fo-bili-title-row" }, $a = ["onClick"], wa = ["onClick"], Ca = { class: "fo-bili-meta" }, xa = {
  key: 2,
  id: "fo-vue-recommend-main",
  class: "fo-bili-main"
}, Sa = { class: "fo-bili-hero" }, Ta = { class: "fo-bili-heading" }, Ma = { class: "fo-feed-hero-title" }, Da = { class: "fo-feed-badge" }, Pa = { class: "fo-bili-actions" }, za = ["disabled"], Ba = { class: "fo-bili-toolbar" }, Ia = { class: "fo-feed-count-tag" }, Ra = {
  key: 0,
  class: "fo-bili-loading"
}, La = {
  key: 1,
  class: "fo-bili-empty"
}, Aa = {
  key: 2,
  class: "fo-bili-grid"
}, Ea = {
  key: 0,
  class: "fo-bili-empty"
}, Ua = ["onDragstart"], Va = { class: "fo-bili-thumb" }, Fa = ["href", "onClick"], Na = ["src"], qa = { class: "fo-bili-count" }, Ga = { class: "fo-bili-duration" }, Oa = { class: "fo-bili-title-row" }, Ha = ["href", "onClick"], Wa = ["aria-expanded", "onClick"], ja = {
  key: 0,
  class: "fo-card-menu"
}, Ya = ["onClick"], Xa = ["onClick"], Ka = ["onClick"], Qa = ["onClick"], Ja = ["onClick"], Za = { class: "fo-bili-meta" }, er = ["onClick"], tr = {
  key: 3,
  id: "fo-vue-following-main",
  class: "fo-bili-main"
}, ir = { class: "fo-bili-hero" }, or = { class: "fo-bili-heading" }, sr = { class: "fo-feed-hero-title" }, lr = { class: "fo-feed-badge" }, nr = { class: "fo-bili-actions" }, ar = ["disabled"], rr = { class: "fo-up-groups-bar" }, ur = { class: "fo-up-groups-list" }, dr = ["onClick"], cr = { class: "count" }, pr = { class: "fo-up-groups-actions" }, br = {
  key: 0,
  class: "fo-up-members-strip"
}, vr = { class: "fo-up-members-label" }, fr = { class: "fo-up-members-list" }, gr = ["title", "onClick", "onContextmenu"], mr = ["src"], yr = { class: "fo-bili-toolbar" }, hr = { class: "fo-feed-count-tag" }, _r = {
  key: 1,
  class: "fo-bili-loading"
}, kr = {
  key: 2,
  class: "fo-bili-empty"
}, $r = {
  key: 3,
  class: "fo-bili-grid"
}, wr = {
  key: 0,
  class: "fo-bili-empty"
}, Cr = ["onDragstart"], xr = { class: "fo-bili-thumb" }, Sr = ["href", "onClick"], Tr = ["src"], Mr = { class: "fo-bili-count" }, Dr = { class: "fo-bili-duration" }, Pr = { class: "fo-bili-title-row" }, zr = ["href", "onClick"], Br = ["aria-expanded", "onClick"], Ir = {
  key: 0,
  class: "fo-card-menu"
}, Rr = ["onClick"], Lr = ["onClick"], Ar = ["onClick"], Er = ["onClick"], Ur = { class: "fo-bili-meta" }, Vr = ["onClick"], Fr = { class: "fo-pager" }, Nr = ["disabled"], qr = { class: "fo-page-num" }, Gr = ["disabled"], Or = {
  key: 4,
  id: "fo-vue-subscription-main",
  class: "fo-bili-main fo-vue-subscription-main"
}, Hr = { class: "bili-sub-vue-shell" }, Wr = {
  key: 0,
  class: "fo-bili-loading"
}, jr = {
  key: 1,
  class: "fo-bili-empty"
}, Yr = {
  key: 2,
  class: "bili-sub-layout bili-sub-vue-layout"
}, Xr = {
  key: 5,
  id: "fo-vue-radio-main",
  class: "fo-bili-main fo-vue-radio-main"
}, Kr = { class: "fo-bili-hero fo-radio-hero" }, Qr = { class: "fo-bili-actions" }, Jr = { class: "bili-radio-layout fo-vue-radio-layout" }, Zr = { class: "bili-radio-folders" }, eu = { id: "bili-radio-folders" }, tu = ["onClick"], iu = {
  key: 0,
  class: "muted small"
}, ou = { class: "bili-radio-library" }, su = {
  key: 0,
  role: "alert",
  class: "muted small"
}, lu = {
  id: "bili-radio-videos",
  class: "bili-radio-videos"
}, nu = ["title", "onDragstart", "onClick"], au = ["src"], ru = { key: 1 }, uu = {
  key: 0,
  class: "muted small"
}, du = { class: "bili-radio-editor" }, cu = { class: "bili-radio-name-row" }, pu = { class: "bili-radio-btn-group" }, bu = { class: "bili-radio-series-dropdown-wrap" }, vu = {
  value: "",
  disabled: "",
  selected: ""
}, fu = ["value"], gu = {
  id: "bili-radio-queue",
  class: "bili-radio-queue",
  "aria-label": "电台播放队列"
}, mu = ["onClick"], yu = { class: "bili-radio-queue-no" }, hu = ["src"], _u = { key: 1 }, ku = ["aria-label", "onClick"], $u = {
  key: 0,
  class: "muted small"
}, wu = { class: "bili-radio-actions" }, Cu = ["disabled"], xu = ["disabled"], Su = ["title"], Tu = {
  key: 2,
  class: "fo-context-divider"
}, Mu = /* @__PURE__ */ Te({
  __name: "BilibiliWorkspace",
  setup(ye) {
    async function _() {
      const n = document.getElementById("bili-radio-name");
      n && (n.focus(), n.select(), Ke.fetch("哔哩哔哩电台", "已聚焦系列名称输入框，直接修改后点击“💾 保存系列”即可"));
    }
    function B(n) {
      const t = n.target, i = t.value;
      if (i) {
        if (i === "__create_new__") {
          b("radio-clear"), I.radioSeriesName = "", Ke.fetch("哔哩哔哩电台", "已开启新系列创作，请从左侧添加视频"), t.value = "";
          return;
        }
        b("radio-load-series", i);
      }
    }
    function g(n, t) {
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
    const D = te(() => {
      const n = nt.unreadCounts;
      return (n.reply || 0) + (n.at || 0) + (n.like || 0) + (n.system || 0) + (n.private || 0);
    });
    function G() {
      $t.togglePanel();
    }
    const l = te(() => I.organizer), { active: R } = ht("daily-bilibili", "/bilibili.html");
    pe(() => R.value && l.value.mode === "recommendations", (n) => {
      Ie.setRecommendationsActive(n);
    }, { immediate: !0, flush: "sync" }), pe(() => R.value && l.value.mode === "following", (n) => {
      Ie.setFollowingActive(n);
    }, { immediate: !0, flush: "sync" }), pe(() => R.value && l.value.mode === "subscription", (n) => {
      Ie.setSubscriptionActive(n);
    }, { immediate: !0, flush: "sync" });
    const y = T(l.value.query), S = T(!1), V = T(!1), m = T(""), P = T({ visible: !1, x: 0, y: 0, video: null, folder: null }), { menuRef: Q, style: oe } = wt({
      visible: () => P.value.visible,
      anchor: () => P.value,
      dismiss: () => {
        P.value.visible = !1;
      }
    }), q = T(
      typeof localStorage < "u" && localStorage.getItem("bili_sidebar_features_collapsed") === "true"
    );
    function be() {
      q.value = !q.value;
      try {
        localStorage.setItem("bili_sidebar_features_collapsed", String(q.value));
      } catch {
      }
    }
    function ee() {
      de.bvid && yt.open({
        bvid: de.bvid,
        cid: de.cid,
        title: de.title
      });
    }
    function ae() {
      de.collapsed && Oe.toggleCollapse(), Oe.bringToFront();
    }
    function ve() {
      Oe.close();
    }
    pe(() => l.value.query, (n) => {
      y.value = n;
    });
    function b(n, t) {
      Re.dispatch(n, t);
    }
    function z(n) {
      b(n.group ? "toggle-folder-group" : "select-folder", { id: n.id, kind: n.kind });
    }
    const h = T(""), F = T(""), W = T("before"), K = T(!1);
    function re(n, t) {
      t.kind === "created" && (h.value = t.id, n.dataTransfer?.setData("application/x-logicweaver-favorite-node", t.id), n.dataTransfer?.setData("text/plain", t.id), n.dataTransfer && (n.dataTransfer.effectAllowed = "move"));
    }
    function Me(n, t) {
      if (t.kind !== "created" || !h.value || h.value === t.id) return;
      n.preventDefault(), n.dataTransfer && (n.dataTransfer.dropEffect = "move");
      const i = n.currentTarget;
      if (!i) return;
      const c = i.getBoundingClientRect(), L = (n.clientY - c.top) / Math.max(1, c.height), ue = t.group && L > 0.25 && L < 0.75 ? "into" : L >= 0.5 ? "after" : "before";
      F.value = t.id, W.value = ue;
    }
    function Ae(n, t) {
      const i = n.relatedTarget, c = n.currentTarget;
      c && i && c.contains(i) || F.value === t.id && (F.value = "");
    }
    function $e() {
      h.value = "", F.value = "", K.value = !1;
    }
    function Ee(n, t) {
      n.preventDefault();
      const i = h.value || n.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "", c = W.value || (t.group ? "into" : "after");
      $e(), !(!i || i === t.id || t.kind !== "created") && b("move-folder-node", { sourceId: i, targetId: t.id, mode: c });
    }
    function Ve(n) {
      h.value && (n.preventDefault(), n.dataTransfer && (n.dataTransfer.dropEffect = "move"), K.value = !0);
    }
    function Fe(n) {
      const t = n.relatedTarget, i = n.currentTarget;
      i && t && i.contains(t) || (K.value = !1);
    }
    function $(n) {
      n.preventDefault();
      const t = h.value || n.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
      $e(), t && b("move-folder-node", { sourceId: t, targetId: "root", mode: "into" });
    }
    function u() {
      const n = y.value.trim();
      b("organizer-search", n);
    }
    const d = T(""), M = T(!1), X = T(!1), he = T("📺 B站 热门视频推荐"), De = T("回车可在 B站 全网搜索"), se = T([]), we = T(null), _e = T([]);
    let Pe = 0, ze = null;
    function Ce(n) {
      if (!n) return null;
      const t = n.bvid || (String(n.param || "").startsWith("BV") ? n.param : "");
      if (!t && !n.aid && !n.id) return null;
      const i = String(n.pic || n.cover || "").replace(/^http:/, "https:"), c = i.startsWith("//") ? `https:${i}` : i, L = String(n.title || "").replace(/<[^>]+>/g, ""), ue = Number(n.duration || 0), pt = ue > 0 ? `${Math.floor(ue / 60)}:${String(ue % 60).padStart(2, "0")}` : String(n.duration || ""), Xe = n.stat?.view || n.play || 0, bt = Number(Xe) >= 1e4 ? `${(Number(Xe) / 1e4).toFixed(1)}万` : String(Number(Xe || 0)), vt = n.owner?.name || n.name || n.author || "UP主";
      return {
        bvid: t,
        aid: String(n.aid || n.id || ""),
        title: L,
        cover: c,
        durationText: pt,
        playText: bt,
        upper: vt
      };
    }
    async function Be() {
      if (he.value = "📺 B站 热门视频推荐", De.value = "回车可在 B站 全网搜索", M.value = !0, _e.value.length && Date.now() - Pe < 9e4) {
        se.value = _e.value;
        return;
      }
      X.value = !0;
      try {
        const t = await (await fetch("https://api.bilibili.com/x/web-interface/index/top/feed/rcmd?ps=8&fresh_idx=1", { credentials: "include" })).json();
        let i = Array.isArray(t.data?.item) ? t.data.item : [];
        if (!i.length) {
          const ue = await (await fetch("https://api.bilibili.com/x/web-interface/popular?ps=8&pn=1", { credentials: "include" })).json();
          i = Array.isArray(ue.data?.list) ? ue.data.list : [];
        }
        const c = i.map(Ce).filter(Boolean);
        _e.value = c, Pe = Date.now(), d.value.trim() || (se.value = c);
      } catch {
        se.value = [];
      } finally {
        X.value = !1;
      }
    }
    function je() {
      d.value.trim() ? f(d.value.trim()) : Be();
    }
    function w() {
      const n = d.value.trim();
      if (clearTimeout(ze), !n) {
        Be();
        return;
      }
      ze = setTimeout(() => {
        f(n);
      }, 320);
    }
    async function f(n) {
      M.value = !0, he.value = `🔍 “${n}” 的视频`, De.value = "右键可收藏、缓存或本地播放", X.value = !0;
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
        if (d.value.trim() !== n) return;
        const i = Array.isArray(t?.data?.result) ? t.data.result : [];
        se.value = i.slice(0, 10).map(Ce).filter(Boolean);
      } catch {
        se.value = [];
      } finally {
        X.value = !1;
      }
    }
    function p(n) {
      M.value = !1;
      const t = n.bvid || (String(n.param || n.id || "").startsWith("BV") ? n.param || n.id : "");
      t || n.aid ? Oe.openVideo({
        bvid: t,
        aid: n.aid,
        title: n.title,
        cover: n.cover,
        author: n.upper
      }) : window.LogicWeaverBiliSearchActions?.local ? window.LogicWeaverBiliSearchActions.local(n) : window.open(`https://www.bilibili.com/video/${t || n.bvid || n.id}`, "_blank");
    }
    function C(n, t) {
      J(n, {
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
    function N() {
      const n = d.value.trim();
      if (M.value = !1, !n) {
        Be();
        return;
      }
      window.open(`https://search.bilibili.com/video?keyword=${encodeURIComponent(n)}`, "_blank");
    }
    function U(n) {
      we.value && !we.value.contains(n.target) && (M.value = !1);
    }
    function H(n) {
      P.value.visible = !1, m.value = m.value === n ? "" : n;
    }
    function J(n, t, i = !0) {
      m.value = "", P.value = {
        visible: !0,
        x: n.clientX,
        y: n.clientY,
        video: t,
        folder: i && I.activeFolderId ? { id: String(I.activeFolderId), title: l.value.folderTitle } : null
      };
    }
    function Y(n) {
      if (n instanceof KeyboardEvent) {
        n.key === "Escape" && (m.value = "", P.value.visible = !1, l.value.isTargetPickMode && b("organizer-cancel-move-target"));
        return;
      }
      const t = n.target;
      t?.closest(".fo-card-menu, .fo-card-more") || (m.value = ""), t?.closest(".fo-context-menu") || (P.value.visible = !1);
    }
    const Ue = typeof document < "u" && document.body.classList.contains("bili-standalone-body");
    function Ne() {
      !V.value || S.value || l.value.loading || (S.value = !0, b("organizer-open"));
    }
    pe(() => l.value.loading, (n) => {
      !n && !l.value.folders.length && Ne();
    }), We(() => {
      import("./bilibili-channel.service-Dnfr7APj.js").catch((n) => console.error("[Bilibili] 频道动作服务加载失败", n)), V.value = !0, Re.loadOrganizer(), Ne(), document.addEventListener("pointerdown", Y, !0), document.addEventListener("pointerdown", U), window.addEventListener("keydown", Y), window.setBiliMiniDockVisible?.(!0), requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }), pe(() => [l.value.videos, l.value.mode], () => {
      requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }, { flush: "post" }), mt(() => {
      Ie.setRecommendationsActive(!1), Ie.setFollowingActive(!1), Ie.setSubscriptionActive(!1), V.value = !1, document.removeEventListener("pointerdown", Y, !0), document.removeEventListener("pointerdown", U), window.removeEventListener("keydown", Y);
    });
    function qe(n, t) {
      m.value = "", P.value.visible = !1;
      const i = String(typeof n == "object" ? n.id || n.bvid || n.aid || "" : n), c = typeof n == "object" ? n : l.value.videos.find((L) => String(L.id) === i);
      b("organizer-video-action", { id: i, video: c, action: t });
    }
    async function ke(n) {
      const { video: t, folder: i } = P.value;
      if (P.value.visible = !1, n === "share-chat") {
        if (!t) return;
        try {
          const { chatService: c } = await import("./search.service-lHw6yJW3.js").then((ue) => ue.bz), { windowManagerController: L } = await import("./read-session-C1M3QoXl.js").then((ue) => ue.H);
          c.sendBiliShare({
            bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
            aid: t.aid,
            title: t.title,
            cover: t.cover,
            upName: t.author,
            upMid: t.authorMid,
            upFace: t.authorFace,
            play: t.playCount
          }), L.open("chat");
        } catch (c) {
          console.warn("分享到聊天室失败", c);
        }
        return;
      }
      t && b("organizer-video-action", { id: t.id || "", video: t, action: n });
    }
    function fe(n) {
      const t = I.radioSeriesName?.trim();
      let i = I.radioSeries.find((c) => c.name === t);
      if (!i && I.radioQueue.length && (i = {
        id: `series_${Date.now()}`,
        name: t || "未命名电台系列",
        count: I.radioQueue.length,
        items: I.radioQueue
      }), !i || !i.items?.length) {
        Ke.fetch("哔哩哔哩电台", "当前没有可分享的系列曲目，请先添加曲目");
        return;
      }
      lt.sendBiliSeriesShare(i, n);
    }
    function Ge(n) {
      const { video: t } = P.value;
      P.value.visible = !1, t && lt.sendBiliShare({
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
    function dt(n) {
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
    function Ye(n, t) {
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
      const L = tt(t.title);
      n.dataTransfer.setDragImage(L, 72, 25), setTimeout(() => {
        L.parentNode && L.parentNode.removeChild(L);
      }, 0);
    }
    function ct(n, t) {
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
      class: A(["card wide", { "card-fullscreen": r(Ue) || r(Qe).activeId === "daily-bilibili" }])
    }, [
      e("header", Rl, [
        t[53] || (t[53] = e("div", { class: "bili-header-left" }, [
          e("span", {
            class: "bar",
            style: { background: "linear-gradient(180deg,#818cf8,#f472b6)" }
          }),
          e("h2", null, "B站收藏夹")
        ], -1)),
        e("div", Ll, [
          e("button", {
            id: "bili-header-msg-center-btn",
            class: A(["fm-tab bili-header-msg-btn", { "has-unread": D.value > 0, "is-active": r(nt).isOpen }]),
            type: "button",
            title: D.value > 0 ? `B站互动消息 (${D.value} 条未读)` : "B站互动消息中心",
            onClick: G
          }, [
            t[50] || (t[50] = e("span", { class: "bili-header-msg-icon" }, "🔔", -1)),
            t[51] || (t[51] = e("span", { class: "bili-header-msg-label" }, "消息", -1)),
            D.value > 0 ? (o(), s("span", El, a(D.value > 99 ? "99+" : D.value), 1)) : k("", !0)
          ], 10, Al),
          e("div", {
            class: "card-fullscreen-bili-search",
            ref_key: "searchHostRef",
            ref: we
          }, [
            e("form", {
              class: "card-fullscreen-bili-searchbar",
              role: "search",
              onSubmit: x(N, ["prevent"])
            }, [
              Z(e("input", {
                "onUpdate:modelValue": t[0] || (t[0] = (i) => d.value = i),
                type: "search",
                autocomplete: "off",
                placeholder: "搜索 B站 视频…",
                "aria-label": "搜索 B站 视频",
                onFocus: je,
                onInput: w
              }, null, 544), [
                [ge, d.value]
              ]),
              t[52] || (t[52] = e("button", {
                type: "submit",
                title: "搜索视频"
              }, "⌕", -1))
            ], 32),
            M.value ? (o(), s("div", Ul, [
              e("div", Vl, [
                e("span", null, a(he.value), 1),
                e("small", null, a(De.value), 1)
              ]),
              X.value ? (o(), s("p", Fl, "正在获取推荐 / 搜索中…")) : !se.value.length && !X.value ? (o(), s("p", Nl, "没有找到相关视频，回车可在 B站 全网搜索")) : (o(!0), s(E, { key: 2 }, O(se.value, (i) => (o(), s("button", {
                key: i.bvid || i.aid,
                type: "button",
                class: "card-fullscreen-bili-video-row",
                role: "option",
                onClick: (c) => p(i),
                onContextmenu: x((c) => C(c, i), ["prevent"])
              }, [
                e("span", Gl, [
                  e("img", {
                    src: i.cover,
                    alt: "",
                    referrerpolicy: "no-referrer",
                    loading: "lazy"
                  }, null, 8, Ol),
                  i.durationText ? (o(), s("i", Hl, a(i.durationText), 1)) : k("", !0)
                ]),
                e("span", Wl, [
                  e("strong", null, a(i.title), 1),
                  e("small", null, a(i.upper) + " · " + a(i.playText) + "播放", 1)
                ])
              ], 40, ql))), 128))
            ])) : k("", !0)
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
      e("div", jl, [
        e("div", Yl, [
          e("div", {
            class: A(["fo-bili-layout", { "fo-picking-move-target": l.value.isTargetPickMode }]),
            "data-vue-organizer-shell": "true",
            onWheel: dt
          }, [
            e("aside", Xl, [
              e("div", {
                class: A(["fo-sidebar-toggle-bar", { "is-collapsed": q.value }]),
                title: q.value ? "点击展开快捷功能" : "点击收起快捷功能",
                onClick: be
              }, [
                e("div", Ql, [
                  t[54] || (t[54] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                  t[55] || (t[55] = e("span", null, "快捷频道", -1)),
                  q.value ? (o(), s("span", Jl, "5")) : k("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "fo-sidebar-toggle-action",
                  "aria-expanded": !q.value,
                  title: q.value ? "展开" : "收起"
                }, [
                  e("span", null, a(q.value ? "展开" : "收起"), 1),
                  e("span", en, a(q.value ? "▾" : "▴"), 1)
                ], 8, Zl)
              ], 10, Kl),
              Z(e("div", tn, [
                e("div", on, [
                  e("button", {
                    id: "fo-sidebar-sub-btn",
                    type: "button",
                    class: A(["fo-sidebar-sub-btn", { on: l.value.mode === "subscription" }]),
                    title: "查看订阅视频（刹那观察室 · AI字幕与高清播放）",
                    onClick: t[2] || (t[2] = (i) => b("open-sub-video"))
                  }, [...t[56] || (t[56] = [
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
                e("div", sn, [
                  e("button", {
                    id: "fo-sidebar-cache-btn",
                    type: "button",
                    class: A(["fo-sidebar-sub-btn", { on: l.value.mode === "cache" }]),
                    title: "查看已经下载到本地文件夹的视频",
                    onClick: t[3] || (t[3] = (i) => b("open-cache"))
                  }, [...t[57] || (t[57] = [
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
                e("div", ln, [
                  e("button", {
                    id: "fo-sidebar-following-btn",
                    type: "button",
                    class: A(["fo-sidebar-sub-btn", { on: l.value.mode === "following" }]),
                    title: "查看正在关注的 UP 主及分组视频",
                    onClick: t[4] || (t[4] = (i) => b("open-following"))
                  }, [...t[58] || (t[58] = [
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
                e("div", nn, [
                  e("button", {
                    id: "fo-sidebar-recommend-btn",
                    type: "button",
                    class: A(["fo-sidebar-sub-btn", { on: l.value.mode === "recommendations" }]),
                    title: "打开 B站个性推荐",
                    onClick: t[5] || (t[5] = (i) => b("open-recommendations"))
                  }, [...t[59] || (t[59] = [
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
                e("div", an, [
                  e("button", {
                    id: "fo-sidebar-radio-btn",
                    type: "button",
                    class: A(["fo-sidebar-sub-btn", { on: l.value.mode === "radio" }]),
                    title: "打开 B站电台（按收藏夹与系列自由编排连播）",
                    onClick: t[6] || (t[6] = (i) => b("open-radio"))
                  }, [...t[60] || (t[60] = [
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
                [et, !q.value]
              ]),
              e("div", rn, [
                t[61] || (t[61] = e("div", { class: "fo-sidebar-sub-main" }, [
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
              l.value.isTargetPickMode ? (o(), s("div", un, [
                t[62] || (t[62] = e("div", { class: "fo-move-target-tip" }, [
                  e("span", { class: "fo-move-target-dot" }),
                  e("span", null, [
                    ne("请点击"),
                    e("strong", null, "自建收藏夹"),
                    ne("移入")
                  ])
                ], -1)),
                e("button", {
                  type: "button",
                  class: "fo-move-target-cancel",
                  title: "取消移动 (按 Esc 也可取消)",
                  onClick: t[8] || (t[8] = (i) => b("organizer-cancel-move-target"))
                }, " ✕ 取消 ")
              ])) : k("", !0),
              e("nav", dn, [
                (o(!0), s(E, null, O(l.value.folders, (i, c) => (o(), s(E, {
                  key: `${i.group ? "group" : "folder"}:${i.id}`
                }, [
                  c > 0 && l.value.folders[c - 1]?.kind !== i.kind ? (o(), s("div", cn)) : k("", !0),
                  c === 0 || l.value.folders[c - 1]?.kind !== i.kind ? (o(), s("div", {
                    key: 1,
                    class: A(["fo-bili-section-head fo-vue-section-head", { "drag-into": i.kind === "created" && K.value }]),
                    onDragover: (L) => i.kind === "created" ? Ve(L) : void 0,
                    onDragleave: (L) => i.kind === "created" ? Fe(L) : void 0,
                    onDrop: (L) => i.kind === "created" ? $(L) : void 0
                  }, [
                    e("span", bn, [
                      e("b", null, a(i.kind === "collected" ? "我追的合集/收藏夹" : i.kind === "other" ? "其他收藏" : "我创建的收藏夹"), 1)
                    ]),
                    i.kind === "created" ? (o(), s("button", {
                      key: 0,
                      class: "fo-bili-section-add-btn",
                      type: "button",
                      title: "新建插件分组",
                      "aria-label": "新建插件分组",
                      onClick: t[9] || (t[9] = x((L) => b("create-local-group"), ["stop"]))
                    }, "＋")) : k("", !0)
                  ], 42, pn)) : k("", !0),
                  i.group ? (o(), s("div", {
                    key: 3,
                    class: A(["fo-bili-group-label", {
                      collapsed: i.collapsed,
                      dragging: h.value === i.id,
                      "drag-before": F.value === i.id && W.value === "before",
                      "drag-after": F.value === i.id && W.value === "after",
                      "drag-into": F.value === i.id && W.value === "into"
                    }]),
                    style: me({ "--fo-depth": i.depth }),
                    role: "button",
                    tabindex: "0",
                    "aria-expanded": !i.collapsed,
                    draggable: !0,
                    onClick: (L) => z(i),
                    onKeydown: [
                      Se(x((L) => z(i), ["prevent"]), ["enter"]),
                      Se(x((L) => z(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (L) => re(L, i),
                    onDragover: (L) => Me(L, i),
                    onDragleave: (L) => Ae(L, i),
                    onDrop: (L) => Ee(L, i),
                    onDragend: $e
                  }, [
                    e("i", gn, a(i.collapsed ? "›" : "⌄"), 1),
                    t[64] || (t[64] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, a(i.title), 1),
                    e("small", null, a(i.count), 1)
                  ], 46, fn)) : (o(), s("div", {
                    key: 2,
                    role: "button",
                    tabindex: "0",
                    class: A(["fo-bili-folder", {
                      on: i.selected,
                      dragging: h.value === i.id,
                      "drag-before": F.value === i.id && W.value === "before",
                      "drag-after": F.value === i.id && W.value === "after",
                      "drag-into": F.value === i.id && W.value === "into",
                      "target-candidate": l.value.isTargetPickMode && i.kind === "created" && !i.selected
                    }]),
                    "data-folder-id": i.id,
                    "data-folder-kind": i.kind,
                    style: me({ "--fo-depth": i.depth }),
                    draggable: i.kind === "created",
                    onClick: (L) => z(i),
                    onKeydown: [
                      Se(x((L) => z(i), ["prevent"]), ["enter"]),
                      Se(x((L) => z(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (L) => re(L, i),
                    onDragover: (L) => Me(L, i),
                    onDragleave: (L) => Ae(L, i),
                    onDrop: (L) => Ee(L, i),
                    onDragend: $e
                  }, [
                    t[63] || (t[63] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, a(i.title), 1),
                    e("small", null, a(i.count), 1)
                  ], 46, vn))
                ], 64))), 128)),
                !l.value.loading && !l.value.error && !l.value.folders.length ? (o(), s("p", mn, "暂无可用收藏夹。")) : k("", !0)
              ])
            ]),
            l.value.mode === "organizer" ? (o(), s("section", yn, [
              l.value.loading ? (o(), s("div", hn, [...t[65] || (t[65] = [
                e("i", null, null, -1),
                e("span", null, "正在读取 B站收藏内容…", -1)
              ])])) : l.value.error && l.value.error.includes("未登录") ? (o(), s("div", _n, [
                e("div", kn, [
                  t[67] || (t[67] = e("span", { class: "fo-bili-login-icon" }, "📺", -1)),
                  t[68] || (t[68] = e("h3", null, "未检测到哔哩哔哩登录状态", -1)),
                  t[69] || (t[69] = e("p", null, "tab-Project 直接复用当前浏览器的 B站 网页会话，无需输入账号密码或扫码授权。", -1)),
                  e("div", $n, [
                    t[66] || (t[66] = e("a", {
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
              ])) : l.value.error ? (o(), s("p", wn, a(l.value.error), 1)) : (o(), s(E, { key: 3 }, [
                e("header", Cn, [
                  e("div", xn, [
                    e("div", {
                      class: A(["fo-bili-cover", { "fo-vue-cover-image": l.value.folderCover }])
                    }, [
                      l.value.folderCover ? (o(), s("img", {
                        key: 0,
                        src: l.value.folderCover,
                        alt: "",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Sn)) : (o(), s("i", Tn))
                    ], 2),
                    e("div", Mn, [
                      e("h3", null, a(l.value.folderTitle), 1),
                      e("p", null, a(l.value.folderSubtitle), 1)
                    ])
                  ]),
                  ce(Il, { "inline-hero": "" }),
                  e("div", Dn, [
                    e("button", {
                      type: "button",
                      class: "primary",
                      disabled: !l.value.videos.length,
                      onClick: t[11] || (t[11] = (i) => b("organizer-batch-toggle"))
                    }, a(l.value.batchMode ? "返回" : "批量操作"), 9, Pn),
                    e("button", {
                      type: "button",
                      title: "刷新收藏夹",
                      onClick: t[12] || (t[12] = (i) => b("organizer-refresh"))
                    }, "↻")
                  ])
                ]),
                e("div", zn, [
                  l.value.batchMode ? k("", !0) : (o(), s("div", Bn, [
                    (o(), s(E, null, O([{ id: "fav_time", text: "最近收藏" }, { id: "view", text: "最多播放" }, { id: "pubtime", text: "最近投稿" }], (i) => e("button", {
                      key: i.id,
                      type: "button",
                      class: A({ on: l.value.sort === i.id }),
                      onClick: (c) => b("organizer-sort", i.id)
                    }, a(i.text), 11, In)), 64))
                  ])),
                  e("div", Rn, [
                    r(de).isOpen && r(de).bvid ? (o(), s("div", {
                      key: 0,
                      class: A(["fo-video-tab-item", { "is-collapsed": r(de).collapsed }]),
                      title: r(de).title
                    }, [
                      e("div", {
                        class: "fo-video-tab-meta",
                        onClick: ae
                      }, [
                        e("span", {
                          class: A(["fo-video-tab-pulse", { playing: r(de).isPlaying }])
                        }, null, 2),
                        e("span", An, a(r(de).title), 1)
                      ]),
                      e("div", En, [
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-close",
                          title: "关闭视频",
                          onClick: x(ve, ["stop"])
                        }, " ✕ "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-sub",
                          title: "查看该视频完整纯文本字幕",
                          onClick: x(ee, ["stop"])
                        }, " 字幕 "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-expand",
                          title: r(de).collapsed ? "放大恢复视频小窗" : "聚焦视频小窗",
                          onClick: x(ae, ["stop"])
                        }, " 放大 ", 8, Un)
                      ])
                    ], 10, Ln)) : k("", !0)
                  ]),
                  l.value.batchMode ? (o(), s("div", Vn, [
                    e("span", Fn, "已选择 " + a(l.value.selectedCount) + " 项", 1),
                    e("button", {
                      type: "button",
                      onClick: t[14] || (t[14] = (i) => b("organizer-batch-all"))
                    }, "全选/取消全选"),
                    e("button", {
                      type: "button",
                      class: A({ "picking-target": l.value.isTargetPickMode }),
                      onClick: t[15] || (t[15] = (i) => l.value.isTargetPickMode ? b("organizer-cancel-move-target") : b("organizer-batch-move"))
                    }, a(l.value.isTargetPickMode ? "✕ 取消移动" : "移动到"), 3),
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
                    onSubmit: x(u, ["prevent"])
                  }, [
                    Z(e("input", {
                      "onUpdate:modelValue": t[13] || (t[13] = (i) => y.value = i),
                      type: "search",
                      placeholder: "请输入关键词",
                      "aria-label": "搜索当前收藏夹"
                    }, null, 512), [
                      [ge, y.value]
                    ]),
                    t[70] || (t[70] = e("button", {
                      type: "submit",
                      title: "搜索"
                    }, "⌕", -1))
                  ], 32))
                ]),
                e("div", Nn, [
                  l.value.videos.length ? k("", !0) : (o(), s("p", qn, a(l.value.query ? "没有找到匹配的视频。" : "这个收藏夹是空的。"), 1)),
                  (o(!0), s(E, null, O(l.value.videos, (i) => (o(), s("article", {
                    key: i.id,
                    class: A(["fo-bili-card", { "batch-selected": i.selected, "fo-single-moving": l.value.movingVideoId === i.id }]),
                    "data-batch-id": i.id,
                    draggable: "true",
                    onDragstart: (c) => Ye(c, i),
                    onContextmenu: x((c) => J(c, i), ["prevent", "stop"])
                  }, [
                    e("div", On, [
                      l.value.batchMode ? (o(), s("label", Hn, [
                        e("input", {
                          type: "checkbox",
                          checked: i.selected,
                          onChange: (c) => b("organizer-batch-select", i.id)
                        }, null, 40, Wn),
                        t[71] || (t[71] = e("span", null, "✓", -1))
                      ])) : k("", !0),
                      e("a", {
                        class: "fo-cover-link",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: x((c) => b("organizer-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, Yn)
                      ], 8, jn),
                      e("span", Xn, "▣ " + a(i.playCount), 1),
                      e("span", Kn, a(i.duration), 1)
                    ]),
                    e("div", Qn, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: x((c) => b("organizer-play-video", i), ["prevent"])
                      }, a(i.title), 9, Jn),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": m.value === i.id,
                        onClick: x((c) => H(i.id), ["stop"])
                      }, "⋮", 8, Zn),
                      m.value === i.id ? (o(), s("div", ea, [
                        i.writable ? (o(), s("button", {
                          key: 0,
                          type: "button",
                          class: "danger",
                          onClick: (c) => qe(i.id, "delete")
                        }, "取消收藏", 8, ta)) : k("", !0),
                        i.writable ? (o(), s("button", {
                          key: 1,
                          type: "button",
                          onClick: (c) => qe(i.id, "move")
                        }, "移动到", 8, ia)) : k("", !0),
                        e("button", {
                          type: "button",
                          onClick: (c) => qe(i.id, "subtitle")
                        }, "字幕", 8, oa)
                      ])) : k("", !0)
                    ]),
                    e("div", sa, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: x((c) => g(c, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, a(i.author), 9, la),
                      e("span", null, "收藏于 " + a(i.favoriteDate), 1)
                    ])
                  ], 42, Gn))), 128))
                ]),
                l.value.totalPages > 1 ? (o(), s("div", na, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: l.value.page <= 1,
                    onClick: t[18] || (t[18] = (i) => b("organizer-page", l.value.page - 1))
                  }, "‹ 上一页", 8, aa),
                  e("span", ra, a(l.value.page) + " / " + a(l.value.totalPages), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: l.value.page >= l.value.totalPages,
                    onClick: t[19] || (t[19] = (i) => b("organizer-page", l.value.page + 1))
                  }, "下一页 ›", 8, ua)
                ])) : k("", !0)
              ], 64))
            ])) : l.value.mode === "cache" ? (o(), s("section", da, [
              e("header", ca, [
                e("div", pa, [
                  t[73] || (t[73] = e("div", { class: "fo-bili-cover" }, "💾", -1)),
                  e("div", ba, [
                    t[72] || (t[72] = e("h3", null, "缓存视频", -1)),
                    e("p", null, a(l.value.cachedVideos.length) + " 个缓存记录 · 存放目录可在设置中选择", 1)
                  ])
                ]),
                e("div", va, [
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
              l.value.cacheLoading ? (o(), s("div", fa, [...t[74] || (t[74] = [
                e("i", null, null, -1),
                e("span", null, "正在读取本地缓存…", -1)
              ])])) : (o(), s("div", ga, [
                l.value.cachedVideos.length ? k("", !0) : (o(), s("p", ma, "还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。")),
                (o(!0), s(E, null, O(l.value.cachedVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card fo-cached-video-card"
                }, [
                  e("div", ya, [
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
                      }, null, 8, _a),
                      t[75] || (t[75] = e("span", { class: "fo-cached-local-badge" }, "LOCAL", -1))
                    ], 8, ha)
                  ]),
                  e("div", ka, [
                    e("button", {
                      class: "fo-title-link fo-bili-title fo-cached-title",
                      type: "button",
                      onClick: (c) => b("cache-play", i.id)
                    }, a(i.title), 9, $a),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "删除缓存",
                      onClick: (c) => b("cache-delete", i.id)
                    }, "×", 8, wa)
                  ]),
                  e("div", Ca, [
                    e("span", null, a(i.sizeText), 1),
                    e("span", null, "缓存于 " + a(i.cachedDate), 1)
                  ])
                ]))), 128))
              ]))
            ])) : l.value.mode === "recommendations" ? (o(), s("section", xa, [
              e("header", Sa, [
                t[76] || (t[76] = e("div", { class: "fo-bili-cover fo-vue-recommend-cover" }, [
                  e("span", null, "✨")
                ], -1)),
                e("div", Ta, [
                  e("div", Ma, [
                    e("h3", null, a(l.value.specialTitle), 1),
                    e("span", Da, a(l.value.specialBadge), 1)
                  ]),
                  e("p", null, a(l.value.specialSubtitle), 1)
                ]),
                e("div", Pa, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !l.value.specialVideos.length,
                    onClick: t[22] || (t[22] = (i) => b("special-play-page"))
                  }, "▶ 播放本页", 8, za),
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
              e("div", Ba, [
                t[77] || (t[77] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "🔥 猜你喜欢与热门精选")
                ], -1)),
                e("div", Ia, "本页共 " + a(l.value.specialVideos.length) + " 个视频", 1)
              ]),
              l.value.specialLoading ? (o(), s("div", Ra, [...t[78] || (t[78] = [
                e("i", null, null, -1),
                e("span", null, "正在加载个性化推荐视频…", -1)
              ])])) : l.value.specialError ? (o(), s("p", La, a(l.value.specialError), 1)) : (o(), s("div", Aa, [
                l.value.specialVideos.length ? k("", !0) : (o(), s("p", Ea, "暂无推荐视频。")),
                (o(!0), s(E, null, O(l.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (c) => Ye(c, i)
                }, [
                  e("div", Va, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: x((c) => b("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                        alt: ""
                      }, null, 8, Na)
                    ], 8, Fa),
                    e("span", qa, "▣ " + a(i.playCount), 1),
                    e("span", Ga, a(i.duration), 1)
                  ]),
                  e("div", Oa, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: x((c) => b("special-play-video", i), ["prevent"])
                    }, a(i.title), 9, Ha),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": m.value === i.id,
                      onClick: x((c) => H(i.id), ["stop"])
                    }, "⋮", 8, Wa),
                    m.value === i.id ? (o(), s("div", ja, [
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { video: i, id: i.id, action: "collect-inbox" }), m.value = "";
                        }
                      }, "📥 添加到收集箱", 8, Ya),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { id: i.id, action: "play" }), m.value = "";
                        }
                      }, "本地播放与评论", 8, Xa),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { id: i.id, action: "subtitle" }), m.value = "";
                        }
                      }, "字幕提取", 8, Ka),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { id: i.id, action: "cache" }), m.value = "";
                        }
                      }, "缓存视频", 8, Qa),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { id: i.id, action: "open" }), m.value = "";
                        }
                      }, "打开网页", 8, Ja)
                    ])) : k("", !0)
                  ]),
                  e("div", Za, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: x((c) => g(c, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, a(i.author), 9, er),
                    e("span", null, a(i.favoriteDate), 1)
                  ])
                ], 40, Ua))), 128))
              ]))
            ])) : l.value.mode === "following" ? (o(), s("section", tr, [
              e("header", ir, [
                t[79] || (t[79] = e("div", { class: "fo-bili-cover fo-vue-following-cover" }, [
                  e("span", null, "📺")
                ], -1)),
                e("div", or, [
                  e("div", sr, [
                    e("h3", null, a(l.value.specialTitle), 1),
                    e("span", lr, a(l.value.specialBadge), 1)
                  ]),
                  e("p", null, a(l.value.specialSubtitle), 1)
                ]),
                e("div", nr, [
                  e("button", {
                    type: "button",
                    class: "primary",
                    disabled: !l.value.specialVideos.length,
                    onClick: t[25] || (t[25] = (i) => b("special-play-page"))
                  }, "▶ 播放本页", 8, ar),
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
              e("div", rr, [
                e("div", ur, [
                  (o(!0), s(E, null, O(l.value.followingGroups, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: A(["fo-up-group-chip", { active: i.active }]),
                    onClick: (c) => b("following-group", i.id)
                  }, [
                    ne(a(i.child ? "↳ " : "") + a(i.name) + " ", 1),
                    e("small", cr, a(i.count), 1)
                  ], 10, dr))), 128))
                ]),
                e("div", pr, [
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
              l.value.followingMembers.length ? (o(), s("div", br, [
                e("div", vr, [
                  e("b", null, a(l.value.specialBadge), 1),
                  e("small", null, "共 " + a(l.value.followingMembers.length) + " 位 UP 主", 1)
                ]),
                e("div", fr, [
                  e("button", {
                    type: "button",
                    class: A(["fo-up-member-chip", { active: !l.value.followingMembers.some((i) => i.active) }]),
                    onClick: t[30] || (t[30] = (i) => b("following-member", ""))
                  }, "全部UP", 2),
                  (o(!0), s(E, null, O(l.value.followingMembers, (i) => (o(), s("button", {
                    key: i.id,
                    type: "button",
                    class: A(["fo-up-member-chip", { active: i.active }]),
                    title: `左键筛选「${i.name}」，右键预览近期投稿`,
                    onClick: (c) => b("following-member", i.id),
                    onContextmenu: x((c) => b("following-preview-member", { id: i.id, clientX: c.clientX, clientY: c.clientY }), ["prevent"])
                  }, [
                    i.face ? (o(), s("img", {
                      key: 0,
                      loading: "lazy",
                      referrerpolicy: "no-referrer",
                      src: i.face,
                      alt: ""
                    }, null, 8, mr)) : k("", !0),
                    e("span", null, a(i.name), 1)
                  ], 42, gr))), 128))
                ]),
                e("button", {
                  type: "button",
                  class: "fo-btn-manage-members",
                  onClick: t[31] || (t[31] = (i) => b("following-manage-groups", "members"))
                }, "＋ 管理成员")
              ])) : k("", !0),
              e("div", yr, [
                t[80] || (t[80] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "⚡ UP 主最新投稿动态")
                ], -1)),
                e("div", hr, "本页共 " + a(l.value.specialVideos.length) + " 个视频", 1)
              ]),
              l.value.specialLoading ? (o(), s("div", _r, [...t[81] || (t[81] = [
                e("i", null, null, -1),
                e("span", null, "正在读取关注 UP 主更新…", -1)
              ])])) : l.value.specialError ? (o(), s("p", kr, a(l.value.specialError), 1)) : (o(), s("div", $r, [
                l.value.specialVideos.length ? k("", !0) : (o(), s("p", wr, "暂无最新关注视频动态。")),
                (o(!0), s(E, null, O(l.value.specialVideos, (i) => (o(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (c) => Ye(c, i)
                }, [
                  e("div", xr, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: x((c) => b("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, Tr)
                    ], 8, Sr),
                    e("span", Mr, "▣ " + a(i.playCount), 1),
                    e("span", Dr, a(i.duration), 1)
                  ]),
                  e("div", Pr, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: x((c) => b("special-play-video", i), ["prevent"])
                    }, a(i.title), 9, zr),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": m.value === i.id,
                      onClick: x((c) => H(i.id), ["stop"])
                    }, "⋮", 8, Br),
                    m.value === i.id ? (o(), s("div", Ir, [
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { video: i, id: i.id, action: "play" }), m.value = "";
                        }
                      }, "本地播放与评论", 8, Rr),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { video: i, id: i.id, action: "subtitle" }), m.value = "";
                        }
                      }, "字幕提取", 8, Lr),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { video: i, id: i.id, action: "cache" }), m.value = "";
                        }
                      }, "缓存视频", 8, Ar),
                      e("button", {
                        type: "button",
                        onClick: (c) => {
                          b("special-video-action", { video: i, id: i.id, action: "open" }), m.value = "";
                        }
                      }, "打开网页", 8, Er)
                    ])) : k("", !0)
                  ]),
                  e("div", Ur, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: x((c) => g(c, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, a(i.author), 9, Vr),
                    e("span", null, a(i.favoriteDate), 1)
                  ])
                ], 40, Cr))), 128))
              ])),
              e("div", Fr, [
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: l.value.specialLoading || l.value.specialPage <= 1,
                  onClick: t[32] || (t[32] = (i) => b("following-page", l.value.specialPage - 1))
                }, "‹ 上一页", 8, Nr),
                e("span", qr, "第 " + a(l.value.specialPage) + " 页", 1),
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: l.value.specialLoading || !l.value.followingHasMore,
                  onClick: t[33] || (t[33] = (i) => b("following-page", l.value.specialPage + 1))
                }, "下一页 ›", 8, Gr)
              ])
            ])) : l.value.mode === "subscription" ? (o(), s("section", Or, [
              e("div", Hr, [
                ce(Jt, { "show-back": "" }),
                l.value.subscriptionLoading ? (o(), s("div", Wr, [...t[82] || (t[82] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取订阅视频与 AI 字幕稿…", -1)
                ])])) : l.value.subscriptionError ? (o(), s("p", jr, "读取失败：" + a(l.value.subscriptionError), 1)) : (o(), s("div", Yr, [
                  ce($o),
                  ce(ki)
                ]))
              ])
            ])) : l.value.mode === "radio" ? (o(), s("section", Xr, [
              e("header", Kr, [
                t[83] || (t[83] = e("div", { class: "fo-hero-left" }, [
                  e("div", { class: "fo-bili-cover fo-vue-radio-cover" }, [
                    e("span", null, "📻")
                  ]),
                  e("div", { class: "fo-hero-folder-info" }, [
                    e("h3", null, "B站电台"),
                    e("p", null, "从左侧选择收藏夹，将视频拖拽或添加到连播队列，自由编排系列随心听")
                  ])
                ], -1)),
                e("div", Qr, [
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
              e("div", Jr, [
                e("aside", Zr, [
                  t[84] || (t[84] = e("p", { class: "sw-title" }, "收藏夹", -1)),
                  e("div", eu, [
                    (o(!0), s(E, null, O(r(I).radioFolders, (i) => (o(), s("button", {
                      key: i.id,
                      type: "button",
                      class: A(["bili-radio-folder", { on: i.id === r(I).radioActiveFolderId }]),
                      onClick: (c) => b("radio-select-folder", i.id)
                    }, [
                      e("span", null, a(i.title), 1),
                      e("span", null, a(i.count), 1)
                    ], 10, tu))), 128)),
                    r(I).radioFolders.length ? k("", !0) : (o(), s("p", iu, a(r(I).radioLoading ? "加载中…" : "暂无收藏夹"), 1))
                  ])
                ]),
                e("section", ou, [
                  t[86] || (t[86] = e("p", {
                    id: "bili-radio-library-title",
                    class: "sw-title"
                  }, "收藏夹视频", -1)),
                  r(I).radioError ? (o(), s("p", su, a(r(I).radioError), 1)) : k("", !0),
                  e("div", lu, [
                    (o(!0), s(E, null, O(r(I).radioVideos, (i) => (o(), s("button", {
                      key: i.bvid,
                      type: "button",
                      class: "bili-radio-video",
                      title: `${i.title} (点击加入连播队列，或按住拖拽封面到下方卡带机直接播放)`,
                      draggable: "true",
                      onDragstart: (c) => ct(c, i),
                      onClick: (c) => b("radio-add", { bvid: i.bvid, title: i.title, cover: i.cover, author: i.author, duration: i.duration })
                    }, [
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, au)) : (o(), s("span", ru)),
                      e("p", null, a(i.title), 1),
                      t[85] || (t[85] = e("span", null, "＋", -1))
                    ], 40, nu))), 128)),
                    r(I).radioVideos.length ? k("", !0) : (o(), s("p", uu, a(r(I).radioLoading ? "读取视频中…" : "此收藏夹暂无可播放视频"), 1))
                  ])
                ]),
                e("section", du, [
                  e("div", cu, [
                    Z(e("input", {
                      id: "bili-radio-name",
                      "onUpdate:modelValue": t[36] || (t[36] = (i) => r(I).radioSeriesName = i),
                      maxlength: "48",
                      placeholder: "给系列取名（不填则按收藏夹命名）",
                      autocomplete: "off",
                      onKeydown: t[37] || (t[37] = Se(x((i) => b("radio-save", { name: r(I).radioSeriesName }), ["prevent"]), ["enter"]))
                    }, null, 544), [
                      [ge, r(I).radioSeriesName]
                    ]),
                    e("div", pu, [
                      e("button", {
                        id: "bili-radio-save",
                        type: "button",
                        title: "保存当前队列为系列",
                        onClick: t[38] || (t[38] = (i) => b("radio-save", { name: r(I).radioSeriesName }))
                      }, " 💾 保存系列 "),
                      e("button", {
                        id: "bili-radio-rename",
                        type: "button",
                        title: "重命名当前系列",
                        onClick: _
                      }, " ✏️ 重命名 "),
                      ce(at, {
                        id: "bili-radio-share",
                        compact: "",
                        label: "🚀 分享",
                        visible: !0,
                        onSelect: fe
                      })
                    ]),
                    e("div", bu, [
                      e("select", {
                        class: "bili-radio-series-select",
                        title: "快速切换已保存的系列",
                        onChange: B
                      }, [
                        e("option", vu, a(r(I).radioSeries.length ? `📚 已保存系列 (${r(I).radioSeries.length})` : "📚 暂无保存系列"), 1),
                        (o(!0), s(E, null, O(r(I).radioSeries, (i) => (o(), s("option", {
                          key: i.id,
                          value: i.id
                        }, a(i.name) + " (" + a(i.count) + "首) ", 9, fu))), 128)),
                        t[87] || (t[87] = e("option", {
                          value: "__create_new__",
                          class: "bili-radio-create-opt"
                        }, " ＋ 创建系列 ", -1))
                      ], 32)
                    ])
                  ]),
                  e("div", gu, [
                    (o(!0), s(E, null, O(r(I).radioQueue, (i, c) => (o(), s("div", {
                      key: `${i.bvid}-${c}`,
                      class: A(["bili-radio-queue-item", { "is-playing": r(j).active && r(j).trackIndex === c + 1 }]),
                      title: "点击立即从该曲目开始播放",
                      onClick: (L) => b("radio-play-index", c)
                    }, [
                      e("span", yu, a(r(j).active && r(j).trackIndex === c + 1 ? "♪" : c + 1), 1),
                      i.cover ? (o(), s("img", {
                        key: 0,
                        src: i.cover,
                        alt: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, hu)) : (o(), s("span", _u)),
                      e("p", null, a(i.title), 1),
                      e("button", {
                        type: "button",
                        class: "bili-radio-remove",
                        "aria-label": `移除 ${i.title}`,
                        onClick: x((L) => b("radio-remove", { index: c }), ["stop"])
                      }, "×", 8, ku)
                    ], 10, mu))), 128)),
                    r(I).radioQueue.length ? k("", !0) : (o(), s("p", $u, "点击左侧视频加入连播队列。"))
                  ]),
                  e("div", wu, [
                    e("button", {
                      id: "bili-radio-play",
                      type: "button",
                      disabled: !r(I).radioQueue.length,
                      onClick: t[39] || (t[39] = (i) => b("radio-play"))
                    }, "▶ 按顺序播放", 8, Cu),
                    e("button", {
                      id: "bili-radio-shuffle",
                      type: "button",
                      disabled: !r(I).radioQueue.length,
                      onClick: t[40] || (t[40] = (i) => b("radio-shuffle"))
                    }, "🔀 随机播放", 8, xu),
                    e("button", {
                      id: "bili-radio-clear",
                      type: "button",
                      onClick: t[41] || (t[41] = (i) => b("radio-clear"))
                    }, "清空编辑区")
                  ])
                ])
              ]),
              r(Ue) || r(Qe).activeId === "daily-bilibili" ? k("", !0) : (o(), ot(rt, { key: 0 }))
            ])) : k("", !0)
          ], 34)
        ])
      ]),
      r(Ue) || r(Qe).activeId === "daily-bilibili" ? (o(), ot(rt, {
        key: 0,
        "dock-side": ""
      })) : k("", !0),
      t[98] || (t[98] = e("div", {
        class: "fm-pane",
        id: "pane-sub-video",
        hidden: "",
        style: { display: "none !important" }
      }, null, -1)),
      ce(Yo),
      ce(Ks),
      P.value.visible && P.value.video ? (o(), s("div", {
        key: 1,
        ref_key: "videoMenuRef",
        ref: Q,
        class: "fo-context-menu",
        role: "menu",
        style: me(r(oe)),
        onClick: t[49] || (t[49] = x(() => {
        }, ["stop"]))
      }, [
        e("div", {
          class: "fo-context-header",
          title: P.value.video.title
        }, a(P.value.video.title), 9, Su),
        ce(at, {
          label: "💬 发送到聊天室",
          "match-menu-item": "",
          visible: P.value.visible,
          onSelect: Ge
        }, null, 8, ["visible"]),
        t[95] || (t[95] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[42] || (t[42] = (i) => ke("play"))
        }, [...t[88] || (t[88] = [
          e("span", { class: "fo-context-icon" }, "▶", -1),
          ne(" 小窗播放视频 ", -1)
        ])]),
        t[96] || (t[96] = e("div", { class: "fo-context-divider" }, null, -1)),
        P.value.video.writable ? (o(), s("button", {
          key: 0,
          type: "button",
          class: "fo-context-item danger",
          onClick: t[43] || (t[43] = (i) => ke("delete"))
        }, [...t[89] || (t[89] = [
          e("span", { class: "fo-context-icon" }, "🗑", -1),
          ne(" 取消收藏 ", -1)
        ])])) : k("", !0),
        P.value.video.writable ? (o(), s("button", {
          key: 1,
          type: "button",
          class: "fo-context-item",
          onClick: t[44] || (t[44] = (i) => ke("move"))
        }, [...t[90] || (t[90] = [
          e("span", { class: "fo-context-icon" }, "📁", -1),
          ne(" 移动到… ", -1)
        ])])) : k("", !0),
        P.value.video.writable ? (o(), s("div", Tu)) : k("", !0),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[45] || (t[45] = (i) => ke("open"))
        }, [...t[91] || (t[91] = [
          e("span", { class: "fo-context-icon" }, "↗", -1),
          ne(" 跳转到 B站 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[46] || (t[46] = (i) => ke("copy-link"))
        }, [...t[92] || (t[92] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ne(" 复制链接 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[47] || (t[47] = (i) => ke("cache"))
        }, [...t[93] || (t[93] = [
          e("span", { class: "fo-context-icon" }, "💾", -1),
          ne(" 缓存视频 ", -1)
        ])]),
        t[97] || (t[97] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[48] || (t[48] = (i) => ke("subtitle"))
        }, [...t[94] || (t[94] = [
          e("span", { class: "fo-context-icon" }, "▤", -1),
          ne(" 字幕转文本 ", -1)
        ])])
      ], 4)) : k("", !0)
    ], 2));
  }
}), qu = /* @__PURE__ */ Le(Mu, [["__scopeId", "data-v-f0f4c9d8"]]);
export {
  qu as default
};
