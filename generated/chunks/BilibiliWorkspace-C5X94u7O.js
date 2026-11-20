import { d as Fe, w as J, e as Rt, f as l, g as s, F as B, p as ue, A as Qt, h as e, s as P, i as G, n as we, t as n, k, b as h, u as r, C as _e, j as g, x as K, o as Et, l as It, v as xe, q as Ke, y as Lt, P as Ot, H as Ht, m as ge, L as pi } from "./vendor-vue-BbmU9NUg.js";
import { a as E, b as Le, c as Ce, s as vi, L as bi, d as fi, f as gi } from "./bili-favorites-store-CdbdVJvS.js";
import { b as ft, k as ye, n as ot, a as bt } from "./github.service-mYu1TuZI.js";
import "./fullscreen-cards.store-CoZ6dUIZ.js";
import { u as mi } from "./useCardActivity-CXFXWuCr.js";
import { d as hi, a as yi } from "./playback-sync-KtiiCiOs.js";
import { B as lt } from "./BiliRichText-DXO2d1BL.js";
import { s as Ae } from "./subtitle-follow-CMrW8CCD.js";
import { i as _i } from "./image-viewer-store-DXesQk_J.js";
import { _ as He, t as R } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
import { a as pe, d as Pt, e as b, c as fe, C as Wt } from "./ChatShareMenu-BJRg07tg.js";
import { g as ki, s as $i } from "./cache-directory-CBBZXa5n.js";
import { a as Ie } from "./radio-player-BcHY7tnw.js";
import { A as Ci, B as wi, g as xi, O as Si, x as Kt } from "./search.service-DiFFcmm2.js";
import { biliMessagePanelState as Ti, biliMessagePanelController as Di } from "./message-panel-store-BBZYrIRP.js";
import { bilibiliChannelService as ve } from "./bilibili-channel.service-B4hNPH3G.js";
import { u as Mi } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DwclBqWw.js";
import { u as Pi } from "./workspace-wallpaper-BZrhOgwG.js";
import { W as Ii } from "./WorkspaceWallpaperLayer-nCpfKdVa.js";
function Li(V, v) {
  let m = 0, w = V.length;
  for (; m < w; ) {
    const T = Math.floor((m + w) / 2);
    V[T].time < v ? m = T + 1 : w = T;
  }
  return m;
}
function Ri(V, v, m) {
  const w = [];
  let T = v;
  for (; T < V.length && V[T].time <= m; )
    m - V[T].time <= 1.2 && w.push(V[T]), T++;
  return { items: w, index: T };
}
const Ei = ["onAnimationend"], Bi = ["aria-pressed"], zi = /* @__PURE__ */ Fe({
  __name: "BiliSubscriptionDanmaku",
  props: {
    bvid: {},
    cid: {},
    video: {}
  },
  setup(V) {
    const v = V, m = h(!0), w = h(!0), T = h([]);
    let I = [], L = 0, M = 0, y = 0, x = 0;
    const A = Array(8).fill(0);
    function Z(z = 0) {
      T.value = [], A.fill(0), L = Li(I, Math.max(0, z)), M = z;
    }
    function q() {
      const z = v.video;
      if (!z || !m.value || !I.length) return;
      const Y = z.currentTime;
      if (Math.abs(Y - M) > 1.5) {
        Z(Y);
        return;
      }
      const j = Ri(I, L, Y);
      L = j.index;
      const Q = performance.now(), le = Math.max(3, Math.min(8, Math.floor(((z.parentElement?.clientHeight || 240) - 45) / 26)));
      for (const ee of j.items) {
        let se = 0;
        for (let de = 0; de < le; de++) {
          if (A[de] <= Q) {
            se = de;
            break;
          }
          A[de] < A[se] && (se = de);
        }
        A[se] = Q + Math.max(1e3, ee.text.length * 110), T.value.push({ id: `${++x}`, text: ee.text, color: ee.color, top: se * 26 + 8, mode: ee.mode });
      }
      M = Y;
    }
    function O() {
      Z(v.video?.currentTime || 0);
    }
    function me() {
      w.value = !1;
    }
    function u() {
      w.value = !0;
    }
    function ie(z) {
      T.value = T.value.filter((Y) => Y.id !== z);
    }
    function oe() {
      m.value = !m.value, Z(v.video?.currentTime || 0);
    }
    return J(() => [v.bvid, v.cid], async ([z, Y], j, Q) => {
      const le = ++y;
      if (Q(() => {
        y++;
      }), I = [], Z(), !!z)
        try {
          const ee = Y || (await ft.getVideoView(z))?.cid;
          if (!ee || le !== y) return;
          const se = await ft.getVideoDanmaku(ee);
          if (le !== y) return;
          I = se, Z(v.video?.currentTime || 0);
        } catch (ee) {
          console.warn("[BiliSubscriptionDanmaku] 弹幕读取失败", ee);
        }
    }, { immediate: !0 }), J(() => v.video, (z, Y, j) => {
      z && (w.value = z.paused, z.addEventListener("timeupdate", q), z.addEventListener("seeked", O), z.addEventListener("play", me), z.addEventListener("pause", u), z.addEventListener("ended", u), j(() => {
        z.removeEventListener("timeupdate", q), z.removeEventListener("seeked", O), z.removeEventListener("play", me), z.removeEventListener("pause", u), z.removeEventListener("ended", u);
      }));
    }, { immediate: !0 }), Rt(() => {
      y++;
    }), (z, Y) => (l(), s(B, null, [
      ue(e("div", {
        class: P(["bili-danmaku-stage", { "is-paused": w.value }]),
        "aria-hidden": "true"
      }, [
        (l(!0), s(B, null, G(T.value, (j) => (l(), s("div", {
          key: j.id,
          class: P(["bili-danmaku-bullet", { "is-top": j.mode === 5, "is-bottom": j.mode === 4 }]),
          style: we({ top: `${j.top}px`, color: j.color, animationDuration: "5.5s" }),
          onAnimationend: (Q) => ie(j.id)
        }, n(j.text), 47, Ei))), 128))
      ], 2), [
        [Qt, m.value]
      ]),
      e("button", {
        class: "bili-sub-danmaku-toggle",
        type: "button",
        "aria-pressed": m.value,
        onClick: k(oe, ["stop"])
      }, " 弹幕 " + n(m.value ? "开" : "关"), 9, Bi)
    ], 64));
  }
});
function Ai(V) {
  return V.filter((v) => Array.isArray(v?.emote) && v.emote.length).map((v) => {
    const m = String(v.text || "B站表情");
    return {
      text: m,
      emote: v.emote.map((w) => ({
        text: String(w?.text || ""),
        url: String(w?.url || "").replace(/^http:/, "https:"),
        textOnly: m.includes("颜文字"),
        failed: !1
      })).filter((w) => w.text)
    };
  }).filter((v) => v.emote.length);
}
const Fi = { class: "bili-sub-transcript-column bili-sub-vue-transcript-column" }, Vi = { class: "bili-sub-article-wrap" }, Ui = {
  key: 0,
  class: "bili-sub-description-copy",
  title: "当前为放大简介视图"
}, Ni = {
  key: 0,
  class: "muted"
}, qi = {
  key: 0,
  class: "bili-sub-srt-list"
}, Gi = ["data-idx", "data-from", "data-to", "title", "onClick"], Oi = { class: "bili-sub-srt-time" }, Wi = { class: "bili-sub-srt-text" }, Ki = {
  key: 1,
  class: "bili-sub-no-transcript-wrap"
}, Yi = {
  key: 0,
  class: "bili-sub-description-copy"
}, ji = {
  key: 2,
  class: "bili-sub-vue-empty-hint"
}, Qi = /* @__PURE__ */ Fe({
  __name: "BiliSubscriptionTranscript",
  setup(V) {
    Rt(() => Ae.reset());
    const v = K(() => E.organizer), m = K(() => v.value.subscriptionChapters.length > 0 || v.value.subscriptionCues.length > 0);
    function w(T, I) {
      Le.dispatch(T, I);
    }
    return (T, I) => (l(), s("section", Fi, [
      e("article", Vi, [
        e("div", {
          class: "bili-sub-transcript-body",
          tabindex: "0",
          onWheelPassive: I[1] || (I[1] = //@ts-ignore
          (...L) => r(Ae).interact && r(Ae).interact(...L)),
          onPointerdown: I[2] || (I[2] = //@ts-ignore
          (...L) => r(Ae).pointerDown && r(Ae).pointerDown(...L)),
          onKeydown: I[3] || (I[3] = //@ts-ignore
          (...L) => r(Ae).keyDown && r(Ae).keyDown(...L))
        }, [
          v.value.showFullDescInRightPanel ? (l(), s("section", Ui, [
            e("header", null, [
              I[4] || (I[4] = e("h5", null, "视频简介", -1)),
              e("button", {
                type: "button",
                class: "bili-copy-desc-btn",
                title: "切回台词展示",
                onClick: I[0] || (I[0] = (L) => w("subscription-toggle-desc-panel"))
              }, "缩小简介")
            ]),
            (l(!0), s(B, null, G(v.value.subscriptionDescription, (L, M) => (l(), s("p", { key: M }, [
              _e(lt, { text: L }, null, 8, ["text"])
            ]))), 128)),
            v.value.subscriptionDescription.length ? g("", !0) : (l(), s("p", Ni, "该视频暂无可用的文字简介。"))
          ])) : (l(), s(B, { key: 1 }, [
            v.value.subscriptionCues.length ? (l(), s("div", qi, [
              (l(!0), s(B, null, G(v.value.subscriptionCues, (L) => (l(), s("button", {
                key: `${L.from}:${L.index}`,
                type: "button",
                class: "bili-sub-srt-row",
                "data-idx": L.index,
                "data-from": L.from,
                "data-to": L.to,
                title: `点击跳转至 ${L.timeText}`,
                onClick: (M) => w("subscription-seek", { from: L.from, index: L.index, mode: "lyrics" })
              }, [
                e("span", Oi, n(L.timeText), 1),
                e("span", Wi, n(L.content), 1)
              ], 8, Gi))), 128))
            ])) : (l(), s("div", Ki, [
              e("div", {
                class: P(["bili-sub-no-transcript-box", { compact: v.value.subscriptionDescription.length > 0 }])
              }, [...I[5] || (I[5] = [
                e("div", { class: "bili-sub-no-transcript-icon" }, "🎙️", -1),
                e("h5", null, "暂无实时台词字幕", -1),
                e("p", { class: "muted" }, "当前视频未提供 CC / AI 字幕，可在下方查看简介或直接观看视频与评论。", -1)
              ])], 2),
              v.value.subscriptionDescription.length ? (l(), s("section", Yi, [
                I[6] || (I[6] = e("header", null, [
                  e("h5", null, "视频简介")
                ], -1)),
                (l(!0), s(B, null, G(v.value.subscriptionDescription, (L, M) => (l(), s("p", { key: M }, [
                  _e(lt, { text: L }, null, 8, ["text"])
                ]))), 128))
              ])) : g("", !0)
            ]))
          ], 64)),
          !v.value.showFullDescInRightPanel && !m.value && !v.value.subscriptionDescription.length ? (l(), s("p", ji, "字幕不可用时仍可在左侧播放和查看评论。")) : g("", !0)
        ], 32)
      ])
    ]));
  }
}), Hi = /* @__PURE__ */ He(Qi, [["__scopeId", "data-v-7f189afb"]]), Xi = {
  key: 0,
  class: "bili-sub-layout bili-sub-vue-layout"
}, Ji = { class: "bili-sub-player-column" }, Zi = { class: "bili-sub-sticky-player" }, eo = { class: "bili-sub-player-card" }, to = { class: "bili-sub-video-box" }, io = ["poster", "hidden"], oo = ["src"], lo = {
  key: 2,
  class: "bili-sub-video-loading"
}, so = { class: "bili-sub-video-meta" }, no = { class: "bili-sub-video-meta-actions" }, ao = ["title"], ro = { class: "bili-sub-meta-stats" }, uo = { class: "bili-sub-meta-desc" }, co = { class: "bili-sub-comments-column" }, po = {
  class: "bili-sub-comments-section bili-sub-comments-panel",
  id: "bili-sub-comments-section"
}, vo = { class: "bili-mini-comments-head" }, bo = { class: "bili-mini-comments-meta" }, fo = { class: "bili-mini-comments-count bili-sub-comments-count" }, go = { class: "bili-sub-comments-head-right" }, mo = { class: "bili-mini-comments-sort" }, ho = { class: "bili-sub-comment-composer" }, yo = ["onKeydown"], _o = ["disabled"], ko = {
  key: 0,
  class: "bili-sub-emote-picker"
}, $o = {
  key: 0,
  class: "fo-bili-loading"
}, Co = { key: 1 }, wo = ["title", "onClick"], xo = ["src", "alt", "onError"], So = { key: 1 }, To = { class: "bili-mini-comments-body bili-sub-comments-body" }, Do = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, Mo = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, Po = ["src"], Io = { class: "bili-comment-main" }, Lo = { class: "bili-comment-user-row" }, Ro = { class: "bili-comment-uname" }, Eo = {
  key: 0,
  class: "bili-comment-level"
}, Bo = { class: "bili-comment-time" }, zo = { class: "bili-comment-text" }, Ao = {
  key: 0,
  class: "bili-comment-pictures"
}, Fo = ["href", "onClick"], Vo = ["src"], Uo = { class: "bili-comment-actions" }, No = { key: 0 }, qo = { key: 1 }, Go = {
  key: 1,
  class: "bili-comment-sub-list"
}, Oo = { class: "bili-comment-sub-uname" }, Wo = { class: "bili-comment-sub-more" }, Ko = ["disabled", "onClick"], Yo = ["disabled", "onClick"], jo = ["onClick"], Qo = { class: "bili-sub-comments-infinite-trigger" }, Ho = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0" }
}, Xo = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0", opacity: "0.6" }
}, Jo = {
  key: 1,
  class: "fo-bili-empty"
}, Zo = /* @__PURE__ */ Fe({
  __name: "BiliSubscriptionPlayer",
  setup(V) {
    const v = K(() => E.organizer.subscriptionCurrent), m = h(null), w = h(!1), T = h(!1), I = h(""), L = h(null), M = h(""), y = h(1), x = h(1), A = h([]), Z = h("0 条"), q = h(!1), O = h(!1), me = h(""), u = h(!1), ie = h(""), oe = h(null), z = h(!1), Y = h(""), j = h(!1), Q = h(!1), le = h(!1), ee = h([]);
    let se = null, de = null;
    function U(S, f = !1) {
      Y.value = S, j.value = f, se && clearTimeout(se), se = setTimeout(() => {
        Y.value = "";
      }, 3500);
    }
    function H() {
      Le.dispatch("subscription-open-player");
    }
    function Xe() {
      Le.dispatch("subscription-toggle-desc-panel");
    }
    function Je() {
      Le.dispatch(
        E.organizer.showFullDescInRightPanel ? "subscription-copy-description" : "subscription-copy-script"
      );
    }
    function ce() {
      Le.dispatch("organizer-open");
    }
    function Ze(S) {
      const f = S.currentTarget;
      f && f.scrollHeight - f.scrollTop - f.clientHeight < 180 && !O.value && u.value && Se();
    }
    function et(S, f) {
      const p = S[f];
      p && _i.open(p, v.value?.title ? `${v.value.title} · 评论图片` : "评论图片");
    }
    function _(S, f) {
      if (!S) return [];
      if (!f || f.size === 0)
        return [{ type: "text", text: S }];
      const p = /\[([^\]]+)\]/g, $ = [];
      let F = 0, W;
      for (; (W = p.exec(S)) !== null; ) {
        W.index > F && $.push({ type: "text", text: S.slice(F, W.index) });
        const te = W[0], Be = f.get(te);
        Be ? $.push({ type: "emote", text: te, url: Be }) : $.push({ type: "text", text: te }), F = p.lastIndex;
      }
      return F < S.length && $.push({ type: "text", text: S.slice(F) }), $;
    }
    function c(S) {
      if (!S) return "";
      const f = new Date(S * 1e3), p = /* @__PURE__ */ new Date(), $ = Math.floor((p.getTime() - f.getTime()) / 1e3);
      if ($ < 60) return "刚刚";
      if ($ < 3600) return `${Math.floor($ / 60)} 分钟前`;
      if ($ < 86400) return `${Math.floor($ / 3600)} 小时前`;
      const F = f.getFullYear(), W = String(f.getMonth() + 1).padStart(2, "0"), te = String(f.getDate()).padStart(2, "0");
      return F === p.getFullYear() ? `${W}-${te}` : `${F}-${W}-${te}`;
    }
    function a(S) {
      return S ? S >= 1e4 ? (S / 1e4).toFixed(1).replace(/\.0$/, "") + "万" : String(S) : "0";
    }
    async function D(S = !1) {
      if (M.value) {
        S ? O.value = !0 : (q.value = !0, me.value = "");
        try {
          const f = `https://api.bilibili.com/x/v2/reply?type=1&oid=${M.value}&pn=${x.value}&ps=20&sort=${y.value}`, $ = await (await fetch(f, { credentials: "include" })).json();
          if ($?.code !== 0 || !$?.data) {
            S || (me.value = $?.message || "评论加载失败或该视频已关闭评论", A.value = []), u.value = !1;
            return;
          }
          const F = $.data, W = F.page?.count || 0;
          Z.value = `${a(W)} 条`;
          const Be = (Array.isArray(F.replies) ? F.replies : []).map((ne) => {
            const he = /* @__PURE__ */ new Map();
            ne.content?.emote && Object.entries(ne.content.emote).forEach(([re, Te]) => {
              Te?.url && he.set(re, String(Te.url).replace(/^http:/, "https:"));
            });
            const Ge = String(ne.content?.message || ""), ze = Array.isArray(ne.content?.pictures) ? ne.content.pictures.map((re) => String(re?.img_src || re).replace(/^http:/, "https:")).filter(Boolean) : [], Oe = Array.isArray(ne.replies) ? ne.replies.map((re) => ({
              id: re.rpid || Math.random(),
              userName: re.member?.uname || "B站用户",
              message: String(re.content?.message || "")
            })) : [];
            return {
              id: ne.rpid || Math.random(),
              userName: ne.member?.uname || "B站用户",
              avatar: String(ne.member?.avatar || "").replace(/^http:/, "https:"),
              level: Number(ne.member?.level_info?.current_level || 0),
              message: Ge,
              tokens: _(Ge, he),
              timeStr: c(ne.ctime),
              likeCount: Number(ne.like || 0),
              replyCount: Number(ne.rcount || 0),
              pictures: ze,
              replies: Oe
            };
          });
          S ? A.value = [...A.value, ...Be] : A.value = Be, u.value = A.value.length < W;
        } catch (f) {
          S || (me.value = f?.message || "网络异常，未能加载评论");
        } finally {
          q.value = !1, O.value = !1;
        }
      }
    }
    async function X(S) {
      const f = A.value.find((p) => String(p.id) === String(S));
      if (!(!f || f.subRepliesLoading || !M.value)) {
        f.subRepliesPage ? f.subRepliesPage++ : f.subRepliesPage = 1, f.subRepliesLoading = !0, f.subRepliesExpanded = !0;
        try {
          const p = await ft.getSubReplies(M.value, S, f.subRepliesPage, 10), $ = (p.replies || []).map((te) => ({
            id: String(te.rpid),
            userName: te.uname,
            message: te.message
          })), F = new Set((f.replies || []).map((te) => String(te.id))), W = $.filter((te) => !F.has(String(te.id)));
          f.replies = [...f.replies || [], ...W], f.subRepliesHasMore = p.hasMore;
        } catch {
          U("子回复加载失败", !0);
        } finally {
          f.subRepliesLoading = !1;
        }
      }
    }
    function ae(S) {
      const f = A.value.find((p) => String(p.id) === String(S));
      f && (f.subRepliesExpanded = !1);
    }
    function be(S) {
      y.value !== S && (y.value = S, x.value = 1, D(!1));
    }
    function Se() {
      O.value || !u.value || (x.value += 1, D(!0));
    }
    async function Ve() {
      if (Q.value = !Q.value, Q.value && !ee.value.length && !le.value) {
        le.value = !0;
        try {
          const f = await (await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", { credentials: "include" })).json();
          f?.code === 0 && Array.isArray(f?.data?.packages) && (ee.value = Ai(f.data.packages));
        } catch {
        } finally {
          le.value = !1;
        }
      }
    }
    function Ue(S) {
      const f = oe.value;
      if (!f)
        ie.value += S;
      else {
        const p = f.selectionStart ?? f.value.length, $ = f.selectionEnd ?? p;
        ie.value = ie.value.slice(0, p) + S + ie.value.slice($), Lt(() => {
          f.focus();
          const F = p + S.length;
          f.setSelectionRange(F, F);
        });
      }
      Q.value = !1;
    }
    async function Ne() {
      const S = ie.value.trim();
      if (!S) {
        U("请输入评论内容", !0);
        return;
      }
      if (!M.value) {
        U("未能识别视频 ID，无法发表评论", !0);
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
        U("未检测到 B站 登录态，请先登录 bilibili.com", !0);
        return;
      }
      z.value = !0;
      try {
        const $ = new URLSearchParams({
          oid: String(M.value),
          type: "1",
          message: S,
          plat: "1",
          csrf: p,
          csrf_token: p
        }), W = await (await fetch("https://api.bilibili.com/x/v2/reply/add", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: $.toString()
        })).json();
        W?.code === 0 ? (ie.value = "", U("✓ 评论发表成功！", !1), x.value = 1, D(!1)) : U(`❌ 发送失败：${W?.message || W?.code}`, !0);
      } catch ($) {
        U(`❌ 发送出错：${$?.message || "网络异常"}`, !0);
      } finally {
        z.value = !1;
      }
    }
    async function Re(S) {
      if (!S?.bvid) return;
      if (typeof document < "u" && (document.querySelectorAll("video, audio").forEach((p) => {
        if (p !== m.value && !p.paused)
          try {
            p.pause();
          } catch {
          }
      }), document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((p) => {
        try {
          p.pause();
        } catch {
        }
      })), m.value && !m.value.paused)
        try {
          m.value.pause();
        } catch {
        }
      w.value = !0, T.value = !1, I.value = "", L.value = null, Ee = null;
      let f = S.aid;
      if (!f)
        try {
          const $ = await (await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${S.bvid}`, { credentials: "include" })).json();
          $?.data?.aid && (f = $.data.aid);
        } catch {
        }
      if (v.value?.bvid === S.bvid) {
        M.value = f || "", x.value = 1, D(!1);
        try {
          const p = await ft.resolvePlayStream(S);
          if (v.value?.bvid !== S.bvid) return;
          if (p?.sources?.length) {
            L.value = p.cid, m.value && (typeof document < "u" && document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach(($) => {
              try {
                $.pause();
              } catch {
              }
            }), m.value.src = p.sources[0], m.value.play().catch(() => {
            }), yi({ bvid: S.bvid, title: S.title, cover: S.cover }, m.value)), w.value = !1;
            return;
          }
        } catch (p) {
          console.warn("[BiliSubscriptionPlayer] 本地视频流解析失败，使用 iframe 备用:", p);
        }
        v.value?.bvid === S.bvid && (T.value = !0, I.value = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(S.bvid)}&autoplay=1&danmaku=1`, w.value = !1);
      }
    }
    let Ee = null;
    function qe() {
      if (!m.value) return;
      const S = m.value.currentTime, f = document.querySelectorAll(".bili-sub-srt-row");
      let p = !1, $ = null;
      for (let F = f.length - 1; F >= 0; F--) {
        const W = f[F], te = Number(W.getAttribute("data-from") || 0);
        !p && S >= te ? (W.classList.add("active"), p = !0, $ = W) : W.classList.remove("active");
      }
      $ && $ !== Ee && (Ee = $, Ae.follow());
    }
    function gt() {
      qe();
    }
    function mt() {
      qe();
    }
    return J(
      () => v.value?.bvid,
      () => {
        v.value && Re(v.value);
      },
      { immediate: !0 }
    ), Et(() => {
      de = Le.onAction((S, f) => {
        if (S === "subscription-seek") {
          const p = Number(f?.from);
          m.value && Number.isFinite(p) && (m.value.currentTime = Math.max(0, p - 0.1), m.value.play().catch(() => {
          }));
        }
      });
    }), Rt(() => {
      if (m.value) {
        hi(m.value);
        try {
          m.value.pause(), m.value.src = "", m.value.load();
        } catch {
        }
      }
      de && de(), se && clearTimeout(se);
    }), (S, f) => v.value ? (l(), s("div", Xi, [
      e("aside", Ji, [
        e("div", Zi, [
          e("div", eo, [
            e("div", {
              class: "bili-sub-vue-comment-handoff",
              hidden: "",
              style: { display: "none !important" }
            }, [
              f[3] || (f[3] = e("strong", null, "播放器与评论区已统一到 Vue 本地影院", -1)),
              e("button", {
                type: "button",
                onClick: H
              }, "打开播放器与评论区")
            ]),
            e("div", to, [
              e("video", {
                ref_key: "videoRef",
                ref: m,
                class: "bili-sub-native-video",
                controls: "",
                playsinline: "",
                poster: v.value.cover,
                hidden: T.value,
                onTimeupdate: qe,
                onSeeked: gt,
                onPlay: mt
              }, null, 40, io),
              !T.value && !w.value ? (l(), It(zi, {
                key: 0,
                bvid: v.value.bvid,
                cid: L.value,
                video: m.value
              }, null, 8, ["bvid", "cid", "video"])) : g("", !0),
              T.value ? (l(), s("iframe", {
                key: 1,
                class: "bili-sub-native-iframe",
                allowfullscreen: "true",
                allow: "autoplay; fullscreen",
                src: I.value
              }, null, 8, oo)) : g("", !0),
              w.value ? (l(), s("div", lo, [...f[4] || (f[4] = [
                e("i", null, null, -1),
                e("span", null, "正在解析登录高清视频流…", -1)
              ])])) : g("", !0)
            ]),
            e("div", so, [
              e("div", no, [
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  onClick: Je
                }, n(r(E).organizer.showFullDescInRightPanel ? "复制简介" : "复制稿子"), 1),
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: r(E).organizer.showFullDescInRightPanel ? "切回台词展示" : "展开完整视频简介",
                  onClick: Xe
                }, n(r(E).organizer.showFullDescInRightPanel ? "缩小简介" : "放大简介"), 9, ao)
              ]),
              e("h4", null, n(v.value.title), 1),
              e("div", ro, [
                e("span", null, "▣ 播放: " + n(v.value.playCount), 1),
                e("span", null, "💬 弹幕: " + n(v.value.danmakuCount), 1),
                e("span", null, "⏱ " + n(v.value.duration), 1)
              ]),
              e("p", uo, [
                _e(lt, {
                  text: v.value.description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ]),
            _e(Hi, { class: "bili-sub-inline-transcript" })
          ])
        ])
      ]),
      e("section", co, [
        e("div", po, [
          e("div", vo, [
            e("div", bo, [
              f[5] || (f[5] = e("span", null, "💬 评论", -1)),
              e("span", fo, n(Z.value), 1)
            ]),
            e("div", go, [
              e("div", mo, [
                e("button", {
                  type: "button",
                  class: P(["bili-mini-sort-btn", { active: y.value === 1 }]),
                  onClick: f[0] || (f[0] = (p) => be(1))
                }, "按热度", 2),
                e("button", {
                  type: "button",
                  class: P(["bili-mini-sort-btn", { active: y.value === 0 }]),
                  onClick: f[1] || (f[1] = (p) => be(0))
                }, "按时间", 2)
              ]),
              e("button", {
                type: "button",
                class: "bili-sub-close-btn",
                title: "退出全屏返回",
                "aria-label": "关闭全屏播放",
                onClick: ce
              }, "✕")
            ])
          ]),
          e("div", ho, [
            e("button", {
              type: "button",
              class: P(["bili-sub-emote-button", { on: Q.value }]),
              title: "选择 B站 表情",
              onClick: Ve
            }, "☺", 2),
            ue(e("input", {
              ref_key: "commentInputRef",
              ref: oe,
              "onUpdate:modelValue": f[2] || (f[2] = (p) => ie.value = p),
              type: "text",
              class: "bili-sub-comment-input",
              placeholder: "发一条友善的评论吧…（Enter 发送）",
              maxlength: "500",
              onKeydown: Ke(k(Ne, ["prevent"]), ["enter"])
            }, null, 40, yo), [
              [xe, ie.value]
            ]),
            e("button", {
              type: "button",
              class: "bili-sub-comment-send-btn",
              disabled: z.value || !ie.value.trim(),
              onClick: Ne
            }, n(z.value ? "发送中…" : "发送"), 9, _o)
          ]),
          Q.value ? (l(), s("div", ko, [
            le.value ? (l(), s("div", $o, [...f[6] || (f[6] = [
              e("i", null, null, -1),
              e("span", null, "正在读取 B站 表情包…", -1)
            ])])) : (l(), s("div", Co, [
              (l(!0), s(B, null, G(ee.value, (p) => (l(), s("section", {
                key: p.text,
                class: "bili-sub-emote-group"
              }, [
                e("h5", null, n(p.text || "B站表情"), 1),
                e("div", {
                  class: P({ "bili-sub-text-emotes": p.text.includes("颜文字") })
                }, [
                  (l(!0), s(B, null, G(p.emote, ($) => (l(), s("button", {
                    key: $.text,
                    type: "button",
                    class: "bili-sub-emote-item",
                    title: $.text,
                    onClick: (F) => Ue($.text)
                  }, [
                    $.url && !$.textOnly && !$.failed ? (l(), s("img", {
                      key: 0,
                      src: $.url,
                      alt: $.text,
                      referrerpolicy: "no-referrer",
                      onError: (F) => $.failed = !0
                    }, null, 40, xo)) : (l(), s("span", So, n($.text), 1))
                  ], 8, wo))), 128))
                ], 2)
              ]))), 128))
            ]))
          ])) : g("", !0),
          Y.value ? (l(), s("div", {
            key: 1,
            class: P(["bili-sub-comment-tip", { error: j.value }])
          }, n(Y.value), 3)) : g("", !0),
          e("div", {
            class: "bili-sub-scroll-stage bili-sub-comments-scroll",
            onScrollPassive: Ze
          }, [
            e("div", To, [
              q.value && !A.value.length ? (l(), s("p", Do, "正在加载评论…")) : me.value && !A.value.length ? (l(), s("p", Mo, n(me.value), 1)) : g("", !0),
              (l(!0), s(B, null, G(A.value, (p) => (l(), s("div", {
                key: p.id,
                class: "bili-comment-item"
              }, [
                e("img", {
                  class: "bili-comment-avatar",
                  src: p.avatar,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, Po),
                e("div", Io, [
                  e("div", Lo, [
                    e("span", Ro, n(p.userName), 1),
                    p.level ? (l(), s("span", Eo, "LV" + n(p.level), 1)) : g("", !0),
                    e("span", Bo, n(p.timeStr), 1)
                  ]),
                  e("div", zo, [
                    _e(lt, {
                      text: p.message
                    }, null, 8, ["text"])
                  ]),
                  p.pictures?.length ? (l(), s("div", Ao, [
                    (l(!0), s(B, null, G(p.pictures, ($, F) => (l(), s("a", {
                      key: F,
                      class: "bili-comment-pic-link",
                      href: $,
                      onClick: k((W) => et(p.pictures, F), ["stop", "prevent"])
                    }, [
                      e("img", {
                        class: "bili-comment-pic",
                        src: $,
                        alt: "评论图片",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Vo)
                    ], 8, Fo))), 128))
                  ])) : g("", !0),
                  e("div", Uo, [
                    p.likeCount ? (l(), s("span", No, "👍 " + n(p.likeCount), 1)) : g("", !0),
                    p.replyCount ? (l(), s("span", qo, "💬 " + n(p.replyCount), 1)) : g("", !0)
                  ]),
                  p.replies?.length ? (l(), s("div", Go, [
                    (l(!0), s(B, null, G(p.replies, ($) => (l(), s("div", {
                      key: $.id,
                      class: "bili-comment-sub-item"
                    }, [
                      e("span", Oo, n($.userName) + ":", 1),
                      _e(lt, {
                        text: $.message
                      }, null, 8, ["text"])
                    ]))), 128)),
                    e("div", Wo, [
                      !p.subRepliesExpanded && (p.replyCount || 0) > p.replies.length ? (l(), s(B, { key: 0 }, [
                        e("span", null, "共 " + n(p.replyCount) + " 条回复，", 1),
                        e("button", {
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: p.subRepliesLoading,
                          onClick: k(($) => X(p.id), ["stop"])
                        }, n(p.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, Ko)
                      ], 64)) : p.subRepliesExpanded ? (l(), s(B, { key: 1 }, [
                        p.subRepliesHasMore ? (l(), s("button", {
                          key: 0,
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: p.subRepliesLoading,
                          onClick: k(($) => X(p.id), ["stop"])
                        }, n(p.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, Yo)) : g("", !0),
                        e("button", {
                          type: "button",
                          class: "bili-comment-sub-collapse-btn",
                          onClick: k(($) => ae(p.id), ["stop"])
                        }, " 收起 ▴ ", 8, jo)
                      ], 64)) : g("", !0)
                    ])
                  ])) : g("", !0)
                ])
              ]))), 128))
            ]),
            e("div", Qo, [
              O.value ? (l(), s("p", Ho, "正在加载更多评论…")) : !u.value && A.value.length ? (l(), s("p", Xo, "已显示全部评论")) : g("", !0)
            ])
          ], 32)
        ])
      ])
    ])) : (l(), s("p", Jo, "暂无可播放的视频。"));
  }
}), el = /* @__PURE__ */ He(Zo, [["__scopeId", "data-v-b6ac9e50"]]), tl = ["disabled"], il = ["disabled"], ol = { key: 0 }, ll = ["disabled"], sl = ["disabled"], nl = ["disabled"], al = ["disabled"], rl = { class: "bili-sub-add-shell" }, ul = ["disabled"], dl = { class: "bili-sub-add-toolbar" }, cl = { class: "bili-sub-add-groups" }, pl = ["onClick"], vl = { class: "bili-sub-add-list" }, bl = {
  key: 0,
  class: "fo-bili-loading"
}, fl = {
  key: 1,
  class: "fo-bili-empty"
}, gl = {
  key: 2,
  class: "fo-bili-empty"
}, ml = ["disabled", "onClick"], hl = ["src"], yl = {
  key: 1,
  class: "bili-sub-add-avatar"
}, _l = {
  class: "fo-custom-confirm-modal",
  role: "dialog",
  "aria-modal": "true"
}, kl = { class: "fo-custom-confirm-head" }, $l = { class: "fo-custom-confirm-body" }, Cl = { class: "fo-custom-confirm-actions" }, wl = ["disabled"], xl = ["disabled"], Sl = /* @__PURE__ */ Fe({
  __name: "BiliOrganizerDialogs",
  setup(V) {
    const v = K(() => Pt.create), m = K(() => Pt.confirm), w = K(() => Pt.channelPicker), T = K(() => v.value.kind === "bili"), I = K(() => {
      const M = w.value, y = M.query.trim().toLowerCase(), x = M.groups.find((Z) => Z.id === M.activeGroupId), A = x ? new Set(x.mids) : null;
      return M.items.filter((Z) => (!A || A.has(Z.mid)) && (!y || Z.name.toLowerCase().includes(y) || Z.mid.includes(y)));
    });
    function L() {
      const M = v.value.name.trim();
      if (!M) {
        pe.updateCreate({ status: "请输入名称", error: !0 });
        return;
      }
      pe.submitCreate({ name: M, privacy: v.value.privacy });
    }
    return (M, y) => (l(), s(B, null, [
      v.value.open ? (l(), s("dialog", {
        key: 0,
        class: "fo-create-dialog",
        open: "",
        onClick: y[5] || (y[5] = k((x) => r(pe).closeCreate(), ["self"])),
        onCancel: y[6] || (y[6] = k((x) => r(pe).closeCreate(), ["prevent"]))
      }, [
        e("form", {
          onSubmit: k(L, ["prevent"])
        }, [
          e("header", null, [
            e("div", null, [
              y[14] || (y[14] = e("i", { class: "fo-folder-icon" }, null, -1)),
              e("span", null, [
                e("b", null, n(T.value ? "新建 B站收藏夹" : "新建插件分组"), 1),
                e("small", null, n(T.value ? "会同步创建到你的 B站账号" : "只整理左侧收藏夹，不修改 B站数据"), 1)
              ])
            ]),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: v.value.submitting,
              onClick: y[0] || (y[0] = (x) => r(pe).closeCreate())
            }, "×", 8, tl)
          ]),
          e("label", null, [
            e("span", null, n(T.value ? "收藏夹名称" : "分组名称"), 1),
            ue(e("input", {
              "onUpdate:modelValue": y[1] || (y[1] = (x) => v.value.name = x),
              maxlength: "48",
              autocomplete: "off",
              placeholder: "输入名称",
              required: "",
              disabled: v.value.submitting,
              autofocus: ""
            }, null, 8, il), [
              [xe, v.value.name]
            ])
          ]),
          T.value ? (l(), s("fieldset", ol, [
            y[17] || (y[17] = e("legend", null, "可见范围", -1)),
            e("label", null, [
              ue(e("input", {
                "onUpdate:modelValue": y[2] || (y[2] = (x) => v.value.privacy = x),
                type: "radio",
                value: 0,
                disabled: v.value.submitting
              }, null, 8, ll), [
                [
                  Ot,
                  v.value.privacy,
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
              ue(e("input", {
                "onUpdate:modelValue": y[3] || (y[3] = (x) => v.value.privacy = x),
                type: "radio",
                value: 1,
                disabled: v.value.submitting
              }, null, 8, sl), [
                [
                  Ot,
                  v.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              y[16] || (y[16] = e("span", null, [
                e("b", null, "私密"),
                e("small", null, "仅自己可见")
              ], -1))
            ])
          ])) : g("", !0),
          e("p", {
            class: P(["fo-create-status", { error: v.value.error }]),
            role: "status"
          }, n(v.value.status), 3),
          e("footer", null, [
            e("button", {
              type: "button",
              disabled: v.value.submitting,
              onClick: y[4] || (y[4] = (x) => r(pe).closeCreate())
            }, "取消", 8, nl),
            e("button", {
              class: "primary",
              type: "submit",
              disabled: v.value.submitting
            }, n(v.value.submitting ? "创建中…" : T.value ? "创建收藏夹" : "创建分组"), 9, al)
          ])
        ], 32)
      ], 32)) : g("", !0),
      w.value.open ? (l(), s("dialog", {
        key: 1,
        class: "bili-sub-add-dialog",
        open: "",
        onCancel: y[10] || (y[10] = k((x) => r(pe).closeChannelPicker(), ["prevent"]))
      }, [
        e("div", rl, [
          e("header", null, [
            y[18] || (y[18] = e("div", null, [
              e("b", null, "从我的关注中添加 UP 主"),
              e("small", null, "沿用“正在关注”的本地分组，只能添加已关注的 UP 主")
            ], -1)),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: !!w.value.submittingMid,
              onClick: y[7] || (y[7] = (x) => r(pe).closeChannelPicker())
            }, "×", 8, ul)
          ]),
          e("div", dl, [
            e("div", cl, [
              e("button", {
                type: "button",
                class: P(["bili-sub-add-group", { on: w.value.activeGroupId === "__all__" }]),
                onClick: y[8] || (y[8] = (x) => r(pe).updateChannelPicker({ activeGroupId: "__all__" }))
              }, "全部关注", 2),
              (l(!0), s(B, null, G(w.value.groups, (x) => (l(), s("button", {
                key: x.id,
                type: "button",
                class: P(["bili-sub-add-group", { on: w.value.activeGroupId === x.id }]),
                onClick: (A) => r(pe).updateChannelPicker({ activeGroupId: x.id })
              }, n(x.name), 11, pl))), 128))
            ]),
            ue(e("input", {
              "onUpdate:modelValue": y[9] || (y[9] = (x) => w.value.query = x),
              type: "search",
              placeholder: "搜索关注的 UP 主"
            }, null, 512), [
              [xe, w.value.query]
            ])
          ]),
          e("div", vl, [
            w.value.loading ? (l(), s("div", bl, [...y[19] || (y[19] = [
              e("i", null, null, -1),
              e("span", null, "正在读取关注分组…", -1)
            ])])) : w.value.error ? (l(), s("p", fl, n(w.value.error), 1)) : I.value.length ? (l(!0), s(B, { key: 3 }, G(I.value, (x) => (l(), s("button", {
              key: x.mid,
              type: "button",
              class: "bili-sub-add-up",
              disabled: x.added || !!w.value.submittingMid,
              onClick: (A) => r(pe).selectChannel(x.mid)
            }, [
              x.face ? (l(), s("img", {
                key: 0,
                src: x.face,
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, hl)) : (l(), s("span", yl, "UP")),
              e("span", null, [
                e("b", null, n(x.name), 1),
                e("small", null, "UID " + n(x.mid), 1)
              ]),
              e("i", null, n(x.added ? "已添加" : w.value.submittingMid === x.mid ? "添加中…" : "＋ 添加"), 1)
            ], 8, ml))), 128)) : (l(), s("p", gl, "该分组中没有匹配的已关注 UP 主。"))
          ])
        ])
      ], 32)) : g("", !0),
      m.value.open ? (l(), s("div", {
        key: 2,
        class: "fo-custom-confirm-overlay",
        onClick: y[13] || (y[13] = k((x) => r(pe).closeConfirm(), ["self"]))
      }, [
        e("div", _l, [
          e("div", kl, [
            e("h4", null, n(m.value.title), 1)
          ]),
          e("div", $l, [
            e("p", null, n(m.value.message), 1)
          ]),
          e("div", Cl, [
            e("button", {
              type: "button",
              class: "fo-confirm-btn cancel",
              disabled: m.value.submitting,
              onClick: y[11] || (y[11] = (x) => r(pe).closeConfirm())
            }, n(m.value.cancelText), 9, wl),
            e("button", {
              type: "button",
              class: P(["fo-confirm-btn confirm", { danger: m.value.danger }]),
              disabled: m.value.submitting,
              onClick: y[12] || (y[12] = (x) => r(pe).submitConfirm())
            }, n(m.value.submitting ? "处理中…" : m.value.confirmText), 11, xl)
          ])
        ])
      ])) : g("", !0)
    ], 64));
  }
}), Tl = ["aria-busy"], Dl = { class: "field full-width" }, Ml = { class: "cache-directory-name" }, Pl = { class: "cache-directory-actions" }, Il = ["disabled"], Ll = ["disabled"], Rl = /* @__PURE__ */ Fe({
  __name: "BiliSettingsPanel",
  props: {
    active: { type: Boolean }
  },
  setup(V) {
    const v = V, m = h(!1), w = h(!1), T = h(""), I = h(!1), L = h(null), M = h("尚未选择缓存目录");
    let y = !0, x = 0;
    async function A() {
      if (!v.active || m.value) return;
      const q = ++x;
      w.value = !0;
      try {
        const O = await ki();
        if (!y || q !== x) return;
        L.value = O, M.value = O?.name || "尚未选择缓存目录";
      } catch {
        y && q === x && (L.value = null, M.value = "缓存目录读取失败，请重试");
      } finally {
        y && q === x && (w.value = !1);
      }
    }
    async function Z() {
      if (m.value || !v.active) return;
      const q = window.showDirectoryPicker;
      if (typeof q != "function") {
        T.value = "当前浏览器不支持目录选择，请使用支持此功能的 Edge 或 Chrome。", I.value = !0;
        return;
      }
      ++x, w.value = !1, m.value = !0, T.value = "";
      try {
        const O = await q.call(window, {
          id: "logicweaver-bili-cache",
          mode: "readwrite",
          startIn: L.value || "videos"
        });
        if (await $i(O), !y) return;
        L.value = O, M.value = O.name, I.value = !1, T.value = "目录已保存，新缓存将存入这里；已有视频不会移动或删除。";
      } catch (O) {
        y && O?.name !== "AbortError" && (I.value = !0, T.value = "目录选择或保存未确认，请重读目录核对后再试。");
      } finally {
        y && (m.value = !1);
      }
    }
    return J(() => v.active, (q) => {
      q ? A() : ++x;
    }, { immediate: !0 }), Et(() => window.addEventListener("focus", A)), Ht(() => {
      y = !1, ++x, window.removeEventListener("focus", A);
    }), (q, O) => (l(), s("div", {
      class: "settings-subgroup bili-cache-settings",
      "aria-busy": m.value || w.value
    }, [
      e("div", Dl, [
        e("p", Ml, n(w.value ? "正在读取缓存目录…" : M.value), 1),
        e("div", Pl, [
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !v.active || m.value || w.value,
            onClick: Z
          }, n(m.value ? "正在保存…" : "选择或重新授权目录"), 9, Il),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !v.active || m.value || w.value,
            onClick: A
          }, "重读目录", 8, Ll)
        ]),
        O[0] || (O[0] = e("p", { class: "hint" }, "仅更改之后的缓存位置；新缓存保留原目录关联，旧版记录需选择其实际所在目录后播放。不会自动扫描或搬移已有文件。", -1)),
        T.value ? (l(), s("p", {
          key: 0,
          class: P(["hint cache-directory-message", { "is-error": I.value }]),
          role: "status"
        }, n(T.value), 3)) : g("", !0)
      ])
    ], 8, Tl));
  }
}), El = /* @__PURE__ */ He(Rl, [["__scopeId", "data-v-ccf6929a"]]), Bl = {
  class: "bili-cache-settings-view",
  "aria-labelledby": "bili-cache-settings-title"
}, zl = { class: "cache-settings-header" }, Al = { class: "cache-settings-card" }, Fl = /* @__PURE__ */ Fe({
  __name: "BiliCacheSettingsView",
  props: {
    active: { type: Boolean }
  },
  emits: ["back"],
  setup(V, { emit: v }) {
    const m = v;
    return (w, T) => (l(), s("section", Bl, [
      e("header", zl, [
        T[1] || (T[1] = e("div", null, [
          e("h3", { id: "bili-cache-settings-title" }, "缓存设置"),
          e("p", null, "管理 B站视频的本地缓存目录")
        ], -1)),
        e("button", {
          type: "button",
          class: "cache-settings-back",
          onClick: T[0] || (T[0] = (I) => m("back"))
        }, "返回缓存视频")
      ]),
      e("div", Al, [
        T[2] || (T[2] = e("h4", null, "视频缓存目录", -1)),
        T[3] || (T[3] = e("p", { class: "cache-settings-note" }, "选择后立即保存，无需到全局设置中操作。浏览器只提供文件夹名称，不显示完整磁盘路径。", -1)),
        _e(El, { active: V.active }, null, 8, ["active"])
      ])
    ]));
  }
}), Vl = /* @__PURE__ */ He(Fl, [["__scopeId", "data-v-43d869dd"]]), Ul = { class: "fo-upg-shell" }, Nl = { class: "fo-upg-body" }, ql = { class: "fo-upg-sidebar" }, Gl = { class: "fo-upg-sidebar-head" }, Ol = { class: "fo-upg-group-items" }, Wl = ["onDragstart", "onDrop", "onClick"], Kl = ["onKeydown"], Yl = {
  key: 0,
  class: "fo-upg-tree-branch"
}, jl = {
  key: 1,
  class: "fo-folder-icon"
}, Ql = { class: "fo-upg-group-name" }, Hl = { class: "fo-upg-vue-group-actions" }, Xl = ["onClick"], Jl = ["onClick"], Zl = ["onClick"], es = ["placeholder"], ts = {
  key: 1,
  class: "muted small"
}, is = { class: "fo-upg-main" }, os = { class: "fo-upg-main-head" }, ls = { class: "fo-upg-main-title" }, ss = { key: 0 }, ns = { class: "fo-upg-head-actions" }, as = { class: "fo-upg-filter-tabs" }, rs = { class: "fo-upg-batch-wrap" }, us = { class: "fo-upg-batch-count" }, ds = ["disabled"], cs = ["disabled"], ps = { class: "fo-upg-toolbar" }, vs = { class: "fo-upg-search" }, bs = ["disabled"], fs = {
  key: 0,
  class: "fo-bili-loading"
}, gs = {
  key: 1,
  class: "fo-bili-empty"
}, ms = {
  key: 2,
  class: "fo-bili-empty"
}, hs = {
  key: 3,
  class: "fo-bili-empty"
}, ys = ["title", "onContextmenu", "onClick"], _s = ["src"], ks = { class: "fo-upg-info" }, $s = { class: "fo-upg-name" }, Cs = { class: "fo-upg-sign" }, ws = ["disabled", "onClick"], xs = {
  key: 1,
  class: "fo-upg-move-wrap"
}, Ss = ["disabled"], Ts = { class: "fo-upg-move-dropdown" }, Ds = ["disabled", "onClick"], Ms = { key: 0 }, Ps = {
  key: 0,
  class: "muted small",
  style: { padding: "6px 10px" }
}, Is = ["disabled", "onClick"], Ls = { class: "fo-upg-pagination" }, Rs = { class: "fo-upg-page-info" }, Es = {
  key: 0,
  class: "fo-upg-page-btns"
}, Bs = ["disabled"], zs = ["disabled"], As = { class: "fo-upg-page-cur" }, Fs = ["disabled"], Vs = ["disabled"], Us = /* @__PURE__ */ Fe({
  __name: "BiliUpGroupManager",
  setup(V) {
    const v = h(void 0), m = h(""), w = h(""), T = h(""), I = h(""), L = h(!1), M = h(/* @__PURE__ */ new Set()), y = h(null);
    function x(_) {
      if (_.button !== 0 || _.target.closest("button,input")) return;
      const c = y.value;
      if (!c) return;
      const a = c.getBoundingClientRect(), D = a.left, X = a.top, ae = _.clientX, be = _.clientY;
      c.style.position = "fixed", c.style.left = `${D}px`, c.style.top = `${X}px`, c.style.right = "auto", c.style.bottom = "auto", c.style.margin = "0", c.style.transform = "none";
      const Se = (Ue) => {
        const Ne = Ue.clientX - ae, Re = Ue.clientY - be, Ee = Math.max(8, Math.min(window.innerWidth - 120, D + Ne)), qe = Math.max(8, Math.min(window.innerHeight - 80, X + Re));
        c.style.left = `${Ee}px`, c.style.top = `${qe}px`;
      }, Ve = () => {
        window.removeEventListener("pointermove", Se), window.removeEventListener("pointerup", Ve);
      };
      window.addEventListener("pointermove", Se), window.addEventListener("pointerup", Ve);
    }
    const A = K(() => b.groups.find((_) => _.id === b.activeGroupId) || null), Z = K(() => {
      const _ = b.query.trim().toLowerCase(), c = b.activeGroupId;
      return b.followings.filter((a) => {
        if (_ && !a.name.toLowerCase().includes(_) && !a.sign.toLowerCase().includes(_) && !a.mid.includes(_)) return !1;
        const D = a.groupIds.includes(c);
        return b.filter === "ingroup" ? D : b.onlyUngrouped ? !a.groupIds || a.groupIds.length === 0 : !0;
      });
    }), q = K(() => Math.max(1, Math.ceil(Z.value.length / b.pageSize))), O = K(() => {
      const c = (Math.min(b.page, q.value) - 1) * b.pageSize;
      return Z.value.slice(c, c + b.pageSize);
    }), me = K(() => b.followings.filter((_) => _.groupIds.length === 0).length), u = h(null), ie = /* @__PURE__ */ new Map();
    function oe(_) {
      const c = Math.max(1, Math.min(q.value, _));
      b.page = c, u.value && (u.value.scrollTop = 0);
    }
    J(() => [b.query, b.filter, b.onlyUngrouped], () => {
      b.page = 1, u.value && (u.value.scrollTop = 0);
    }), J(() => b.activeGroupId, (_, c) => {
      if (c && u.value) {
        const X = `${c}_${b.filter}_${b.onlyUngrouped}`;
        ie.set(X, {
          page: b.page,
          scrollTop: u.value.scrollTop
        });
      }
      if (b.filter === "all")
        return;
      const a = `${_}_${b.filter}_${b.onlyUngrouped}`, D = ie.get(a);
      D ? (b.page = Math.min(D.page, q.value), Lt(() => {
        u.value && (u.value.scrollTop = D.scrollTop);
      })) : (b.page = 1, Lt(() => {
        u.value && (u.value.scrollTop = 0);
      }));
    }), J(q, (_) => {
      b.page > _ && (b.page = _);
    }), J(L, (_) => {
      _ || M.value.clear();
    });
    function z(_) {
      v.value = _, m.value = "";
    }
    function Y() {
      v.value = void 0, m.value = "";
    }
    function j() {
      const _ = m.value.trim();
      _ && (fe.dispatch("create-group", { name: _, parentId: v.value || "" }), Y());
    }
    function Q(_) {
      w.value = _.id, T.value = _.name;
    }
    function le() {
      const _ = T.value.trim();
      w.value && _ && fe.dispatch("rename-group", { id: w.value, name: _ }), w.value = "", T.value = "";
    }
    function ee(_, c) {
      I.value = c, _.dataTransfer?.setData("application/x-logicweaver-up-group", c), _.dataTransfer && (_.dataTransfer.effectAllowed = "move");
    }
    function se(_, c) {
      const a = _.dataTransfer?.getData("application/x-logicweaver-up-group") || I.value;
      if (I.value = "", !a || a === c) return;
      const D = _.currentTarget?.getBoundingClientRect(), X = D ? _.clientY - D.top : 0, ae = D ? X < D.height * 0.25 ? "before" : X > D.height * 0.75 ? "after" : "into" : "into";
      fe.dispatch("move-group", { sourceId: a, targetId: c, mode: ae });
    }
    function de(_) {
      const c = _.dataTransfer?.getData("application/x-logicweaver-up-group") || I.value;
      I.value = "", c && fe.dispatch("move-group", { sourceId: c, targetId: "", mode: "root" });
    }
    function U(_, c) {
      !c || b.busyMid || fe.dispatch("toggle-member", { groupId: c, mid: _ });
    }
    function H(_) {
      !b.activeGroupId || b.busyMid || fe.dispatch("toggle-member", { groupId: b.activeGroupId, mid: _ });
    }
    function Xe(_, c) {
      fe.dispatch("preview-up", { mid: c, clientX: _.clientX, clientY: _.clientY });
    }
    function Je(_) {
      const c = M.value;
      c.has(_) ? c.delete(_) : c.add(_);
    }
    function ce() {
      if (!b.activeGroupId || b.busyMid) return;
      const _ = Array.from(M.value);
      if (!_.length) return;
      const c = _.filter((a) => {
        const D = b.followings.find((X) => X.mid === a);
        return D && !D.groupIds.includes(b.activeGroupId);
      });
      if (c.length) {
        for (const a of c)
          fe.dispatch("toggle-member", { groupId: b.activeGroupId, mid: a });
        M.value.clear();
      }
    }
    function Ze() {
      if (!b.activeGroupId || b.busyMid) return;
      const _ = Array.from(M.value);
      if (!_.length) return;
      const c = _.filter((a) => {
        const D = b.followings.find((X) => X.mid === a);
        return D && D.groupIds.includes(b.activeGroupId);
      });
      if (c.length) {
        for (const a of c)
          fe.dispatch("toggle-member", { groupId: b.activeGroupId, mid: a });
        M.value.clear();
      }
    }
    function et() {
      for (const _ of O.value) M.value.add(_.mid);
    }
    return (_, c) => r(b).open ? (l(), s("dialog", {
      key: 0,
      ref_key: "dialogEl",
      ref: y,
      class: "fo-up-group-dialog",
      open: "",
      onCancel: c[20] || (c[20] = k((a) => r(fe).close(), ["prevent"]))
    }, [
      e("div", Ul, [
        e("header", {
          class: "fo-upg-head",
          onPointerdown: x
        }, [
          c[21] || (c[21] = e("h3", null, [
            e("span", null, "👥"),
            ge(" 关注分组与 UP 主管理")
          ], -1)),
          e("button", {
            type: "button",
            class: "fo-upg-close-btn",
            "aria-label": "关闭",
            title: "关闭管理面板",
            onClick: c[0] || (c[0] = (a) => r(fe).close())
          }, "✕")
        ], 32),
        e("div", Nl, [
          e("aside", ql, [
            e("div", Gl, [
              c[22] || (c[22] = e("span", null, "我的分组", -1)),
              e("button", {
                type: "button",
                onClick: c[1] || (c[1] = (a) => z(null))
              }, "＋ 新建")
            ]),
            e("div", Ol, [
              e("div", {
                class: "fo-upg-root-dropzone",
                onDragover: c[2] || (c[2] = k(() => {
                }, ["prevent"])),
                onDrop: k(de, ["prevent"])
              }, "⇣ 拖至此处变为顶级分组", 32),
              v.value === null ? (l(), s("form", {
                key: 0,
                class: "fo-upg-create-box",
                onSubmit: k(j, ["prevent"])
              }, [
                ue(e("input", {
                  "onUpdate:modelValue": c[3] || (c[3] = (a) => m.value = a),
                  maxlength: "20",
                  placeholder: "输入分组名称…",
                  autofocus: ""
                }, null, 512), [
                  [xe, m.value]
                ]),
                e("div", { class: "fo-upg-create-btns" }, [
                  e("button", {
                    type: "button",
                    class: "cancel",
                    onClick: Y
                  }, "取消"),
                  c[23] || (c[23] = e("button", {
                    class: "confirm",
                    type: "submit"
                  }, "确定", -1))
                ])
              ], 32)) : g("", !0),
              (l(!0), s(B, null, G(r(b).groups, (a) => (l(), s(B, {
                key: a.id
              }, [
                e("div", {
                  class: P(["fo-upg-group-item", { on: a.id === r(b).activeGroupId, "is-subgroup": a.depth > 0 }]),
                  style: we({ paddingLeft: `${8 + a.depth * 18}px` }),
                  draggable: "true",
                  onDragstart: (D) => ee(D, a.id),
                  onDragover: c[7] || (c[7] = k(() => {
                  }, ["prevent"])),
                  onDrop: k((D) => se(D, a.id), ["prevent"]),
                  onClick: (D) => r(b).activeGroupId = a.id
                }, [
                  w.value === a.id ? (l(), s(B, { key: 0 }, [
                    ue(e("input", {
                      "onUpdate:modelValue": c[4] || (c[4] = (D) => T.value = D),
                      class: "fo-upg-rename-input",
                      maxlength: "20",
                      onClick: c[5] || (c[5] = k(() => {
                      }, ["stop"])),
                      onKeydown: Ke(k(le, ["prevent"]), ["enter"])
                    }, null, 40, Kl), [
                      [xe, T.value]
                    ]),
                    e("button", {
                      type: "button",
                      onClick: k(le, ["stop"])
                    }, "✓"),
                    e("button", {
                      type: "button",
                      onClick: c[6] || (c[6] = k((D) => w.value = "", ["stop"]))
                    }, "✕")
                  ], 64)) : (l(), s(B, { key: 1 }, [
                    a.depth ? (l(), s("span", Yl, "↳")) : (l(), s("i", jl)),
                    e("span", Ql, n(a.name), 1),
                    e("small", null, n(a.upMids.length), 1),
                    e("span", Hl, [
                      e("button", {
                        type: "button",
                        title: "添加子分组",
                        onClick: k((D) => z(a.id), ["stop"])
                      }, "＋", 8, Xl),
                      e("button", {
                        type: "button",
                        title: "重命名",
                        onClick: k((D) => Q(a), ["stop"])
                      }, "✎", 8, Jl),
                      e("button", {
                        type: "button",
                        class: "danger",
                        title: "删除",
                        onClick: k((D) => r(fe).dispatch("delete-group", a.id), ["stop"])
                      }, "×", 8, Zl)
                    ])
                  ], 64))
                ], 46, Wl),
                v.value === a.id ? (l(), s("form", {
                  key: 0,
                  class: "fo-upg-create-box",
                  style: we({ marginLeft: `${18 + a.depth * 18}px` }),
                  onSubmit: k(j, ["prevent"])
                }, [
                  ue(e("input", {
                    "onUpdate:modelValue": c[8] || (c[8] = (D) => m.value = D),
                    maxlength: "20",
                    placeholder: `输入「${a.name}」的子分组名称…`,
                    autofocus: ""
                  }, null, 8, es), [
                    [xe, m.value]
                  ]),
                  e("div", { class: "fo-upg-create-btns" }, [
                    e("button", {
                      type: "button",
                      class: "cancel",
                      onClick: Y
                    }, "取消"),
                    c[24] || (c[24] = e("button", {
                      class: "confirm",
                      type: "submit"
                    }, "确定", -1))
                  ])
                ], 36)) : g("", !0)
              ], 64))), 128)),
              !r(b).groups.length && !r(b).loading ? (l(), s("p", ts, '暂无分组，请点击"＋ 新建"。')) : g("", !0)
            ])
          ]),
          e("section", is, [
            e("div", os, [
              e("div", ls, [
                e("h4", null, n(A.value ? `分组：「${A.value.name}」` : "请先选择或新建分组"), 1),
                A.value ? (l(), s("span", ss, "（本组 " + n(A.value.upMids.length) + " 位 · 共 " + n(r(b).followings.length) + " 位关注 · 未分组 " + n(me.value) + " 位）", 1)) : g("", !0)
              ]),
              e("div", ns, [
                e("div", as, [
                  e("button", {
                    type: "button",
                    class: P(["fo-upg-filter-tab", { on: r(b).filter === "all" }]),
                    onClick: c[9] || (c[9] = (a) => r(b).filter = "all")
                  }, "全部关注", 2),
                  e("button", {
                    type: "button",
                    class: P(["fo-upg-filter-tab", { on: r(b).filter === "ingroup" }]),
                    onClick: c[10] || (c[10] = (a) => r(b).filter = "ingroup")
                  }, "本组已加", 2)
                ]),
                e("div", rs, [
                  e("button", {
                    type: "button",
                    class: P(["fo-upg-batch-toggle", { on: L.value }]),
                    onClick: c[11] || (c[11] = (a) => L.value = !L.value)
                  }, n(L.value ? "退出批量" : "批量操作"), 3),
                  L.value && M.value.size > 0 ? (l(), s(B, { key: 0 }, [
                    e("span", us, "已选 " + n(M.value.size), 1),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action add",
                      disabled: !A.value,
                      onClick: ce
                    }, "＋ 加入本组", 8, ds),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action remove",
                      disabled: !A.value,
                      onClick: Ze
                    }, "− 移出本组", 8, cs),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: et
                    }, "全选当页"),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: c[12] || (c[12] = (a) => M.value.clear())
                    }, "清除")
                  ], 64)) : g("", !0)
                ]),
                r(b).filter === "all" ? (l(), s("label", {
                  key: 0,
                  class: P(["fo-upg-switch", { on: r(b).onlyUngrouped }])
                }, [
                  ue(e("input", {
                    "onUpdate:modelValue": c[13] || (c[13] = (a) => r(b).onlyUngrouped = a),
                    type: "checkbox"
                  }, null, 512), [
                    [pi, r(b).onlyUngrouped]
                  ]),
                  c[25] || (c[25] = e("span", { class: "fo-upg-switch-track" }, [
                    e("span", { class: "fo-upg-switch-thumb" })
                  ], -1)),
                  c[26] || (c[26] = e("span", { class: "fo-upg-switch-text" }, "仅未分组 UP", -1))
                ], 2)) : g("", !0)
              ])
            ]),
            e("div", ps, [
              e("div", vs, [
                c[27] || (c[27] = e("span", null, "🔍", -1)),
                ue(e("input", {
                  "onUpdate:modelValue": c[14] || (c[14] = (a) => r(b).query = a),
                  type: "search",
                  placeholder: "搜索关注的 UP 主…"
                }, null, 512), [
                  [xe, r(b).query]
                ])
              ]),
              e("button", {
                type: "button",
                class: "fo-upg-refresh-btn",
                disabled: r(b).refreshing,
                onClick: c[15] || (c[15] = (a) => r(fe).dispatch("refresh"))
              }, n(r(b).refreshing ? "刷新中…" : "↻ 刷新关注"), 9, bs)
            ]),
            e("div", {
              ref_key: "listRef",
              ref: u,
              class: "fo-upg-list"
            }, [
              r(b).loading ? (l(), s("div", fs, [...c[28] || (c[28] = [
                e("i", null, null, -1),
                e("span", null, "正在加载关注的 UP 主列表…", -1)
              ])])) : r(b).error ? (l(), s("p", gs, n(r(b).error), 1)) : A.value ? O.value.length ? (l(!0), s(B, { key: 4 }, G(O.value, (a) => (l(), s("article", {
                key: a.mid,
                class: P(["fo-upg-card", { selected: L.value && M.value.has(a.mid) }]),
                title: `右键查看「${a.name}」近期投稿`,
                onContextmenu: k((D) => Xe(D, a.mid), ["prevent"]),
                onClick: (D) => L.value ? Je(a.mid) : void 0
              }, [
                e("img", {
                  src: a.face,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, _s),
                e("div", ks, [
                  e("div", $s, n(a.name), 1),
                  e("div", Cs, n(a.sign || "暂无签名"), 1)
                ]),
                L.value ? (l(), s("div", {
                  key: 1,
                  class: P(["fo-upg-batch-check", { checked: M.value.has(a.mid) }])
                }, n(M.value.has(a.mid) ? "✓" : ""), 3)) : (l(), s(B, { key: 0 }, [
                  a.groupIds.includes(r(b).activeGroupId) ? (l(), s("button", {
                    key: 0,
                    type: "button",
                    class: "fo-upg-toggle-btn in-group",
                    disabled: r(b).busyMid === a.mid,
                    onClick: k((D) => H(a.mid), ["stop"])
                  }, n(r(b).busyMid === a.mid ? "处理中…" : `移出 ${A.value?.name || ""}`), 9, ws)) : a.groupIds.length > 0 ? (l(), s("div", xs, [
                    e("button", {
                      type: "button",
                      class: "fo-upg-toggle-btn belongs-other fo-upg-move-trigger",
                      disabled: r(b).busyMid === a.mid
                    }, n(r(b).busyMid === a.mid ? "处理中…" : `📁 ${a.groupName || "已分组"}`), 9, Ss),
                    e("div", Ts, [
                      c[30] || (c[30] = e("div", { class: "fo-upg-move-title" }, "移动到分组", -1)),
                      (l(!0), s(B, null, G(r(b).groups, (D) => (l(), s("button", {
                        key: D.id,
                        type: "button",
                        class: P(["fo-upg-move-item", { active: a.groupIds.includes(D.id) }]),
                        disabled: r(b).busyMid === a.mid,
                        onClick: k((X) => U(a.mid, D.id), ["stop"])
                      }, [
                        c[29] || (c[29] = e("i", { class: "fo-folder-icon small" }, null, -1)),
                        e("span", null, n(D.name), 1),
                        a.groupIds.includes(D.id) ? (l(), s("small", Ms, "✓ 已加入")) : g("", !0)
                      ], 10, Ds))), 128)),
                      r(b).groups.length ? g("", !0) : (l(), s("p", Ps, "暂无分组"))
                    ])
                  ])) : r(b).activeGroupId ? (l(), s("button", {
                    key: 2,
                    type: "button",
                    class: "fo-upg-toggle-btn",
                    disabled: r(b).busyMid === a.mid,
                    onClick: k((D) => H(a.mid), ["stop"])
                  }, n(r(b).busyMid === a.mid ? "处理中…" : "＋ 加入"), 9, Is)) : g("", !0)
                ], 64))
              ], 42, ys))), 128)) : (l(), s("p", hs, "没有符合条件的 UP 主。")) : (l(), s("p", ms, "请先新建或选择一个分组。"))
            ], 512),
            e("div", Ls, [
              e("div", Rs, "共 " + n(Z.value.length) + " 位 UP 主 · 每页 " + n(r(b).pageSize) + " 位", 1),
              q.value > 1 ? (l(), s("div", Es, [
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(b).page <= 1,
                  onClick: c[16] || (c[16] = (a) => oe(1))
                }, "« 首页", 8, Bs),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(b).page <= 1,
                  onClick: c[17] || (c[17] = (a) => oe(r(b).page - 1))
                }, "‹ 上一页", 8, zs),
                e("span", As, n(r(b).page) + " / " + n(q.value), 1),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(b).page >= q.value,
                  onClick: c[18] || (c[18] = (a) => oe(r(b).page + 1))
                }, "下一页 ›", 8, Fs),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(b).page >= q.value,
                  onClick: c[19] || (c[19] = (a) => oe(q.value))
                }, "末页 »", 8, Vs)
              ])) : g("", !0)
            ])
          ])
        ])
      ])
    ], 544)) : g("", !0);
  }
}), Ns = /* @__PURE__ */ He(Us, [["__scopeId", "data-v-f738263e"]]);
function Yt(V) {
  if (V.ctrlKey || V.metaKey || V.shiftKey || Math.abs(V.deltaX) >= Math.abs(V.deltaY)) return;
  const v = V.currentTarget, m = V.deltaY * (V.deltaMode === 1 ? 16 : V.deltaMode === 2 ? v.clientWidth : 1), w = v.scrollWidth - v.clientWidth;
  (m > 0 && v.scrollLeft < w || m < 0 && v.scrollLeft > 0) && (V.preventDefault(), V.stopPropagation(), v.scrollLeft += m);
}
const qs = {
  class: "fm-pane",
  id: "pane-organizer"
}, Gs = { id: "fo-body" }, Os = { class: "fo-bili-sidebar" }, Ws = ["title"], Ks = { class: "fo-sidebar-toggle-title" }, Ys = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, js = ["aria-expanded", "title"], Qs = { class: "fo-sidebar-toggle-chevron" }, Hs = { class: "fo-sidebar-features-wrap" }, Xs = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Js = ["title"], Zs = { class: "fo-sidebar-sub-main" }, en = { class: "fo-sidebar-sub-text" }, tn = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, on = ["title"], ln = { class: "fo-sidebar-sub-main" }, sn = { class: "fo-sidebar-sub-text" }, nn = { class: "fo-sidebar-sub-wrap fo-sidebar-recommend-wrap" }, an = ["title"], rn = { class: "fo-sidebar-sub-main" }, un = { class: "fo-sidebar-sub-text" }, dn = { class: "fo-sidebar-sub-wrap fo-sidebar-radio-wrap" }, cn = ["title"], pn = { class: "fo-sidebar-sub-main" }, vn = { class: "fo-sidebar-sub-text" }, bn = { class: "fo-sidebar-favorite-hub" }, fn = { class: "fo-sidebar-sub-main" }, gn = { class: "fo-sidebar-sub-text" }, mn = ["title", "aria-label"], hn = {
  key: 0,
  class: "fo-move-target-banner"
}, yn = {
  class: "fo-bili-folder-list",
  "aria-label": "B站收藏夹"
}, _n = {
  key: 0,
  class: "fo-bili-section-divider"
}, kn = ["onDragover", "onDragleave", "onDrop"], $n = { class: "fo-bili-section-title" }, Cn = ["data-folder-id", "data-folder-kind", "draggable", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], wn = ["aria-expanded", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], xn = {
  class: "fo-group-caret",
  "aria-hidden": "true"
}, Sn = {
  key: 0,
  class: "muted small"
}, Tn = {
  key: 0,
  class: "fo-bili-loading"
}, Dn = {
  key: 1,
  class: "fo-bili-empty fo-bili-login-guide"
}, Mn = { class: "fo-bili-login-card" }, Pn = { class: "fo-bili-login-actions" }, In = {
  key: 2,
  class: "fo-bili-empty"
}, Ln = { class: "fo-bili-hero fo-hero-persistent" }, Rn = { class: "fo-hero-left" }, En = ["src"], Bn = {
  key: 1,
  class: "fo-folder-icon"
}, zn = { class: "fo-hero-folder-info" }, An = ["placeholder", "aria-label"], Fn = ["title"], Vn = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, Un = { class: "card-fullscreen-bili-suggest-head" }, Nn = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, qn = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, Gn = ["onClick", "onContextmenu"], On = { class: "card-fullscreen-bili-thumb" }, Wn = ["src"], Kn = { key: 0 }, Yn = { class: "card-fullscreen-bili-video-copy" }, jn = { class: "fo-bili-actions" }, Qn = ["title"], Hn = { class: "bili-header-msg-label" }, Xn = ["disabled"], Jn = { class: "fo-bili-toolbar" }, Zn = {
  key: 0,
  class: "fo-bili-sort"
}, ea = ["onClick"], ta = {
  class: "fo-mini-dock-anchor",
  "aria-label": "视频标签页"
}, ia = ["title"], oa = { class: "fo-video-tab-title" }, la = { class: "fo-video-tab-actions" }, sa = ["title"], na = {
  key: 2,
  class: "fo-bili-batch-actions"
}, aa = { class: "fo-batch-count" }, ra = {
  key: 0,
  class: "muted small",
  role: "status"
}, ua = ["aria-busy"], da = {
  key: 0,
  class: "fo-bili-empty"
}, ca = ["data-batch-id", "onDragstart", "onContextmenu"], pa = { class: "fo-bili-thumb" }, va = {
  key: 0,
  class: "fo-batch-check",
  title: "选择此视频"
}, ba = ["checked", "onChange"], fa = ["href", "onClick"], ga = ["src"], ma = { class: "fo-bili-count" }, ha = { class: "fo-bili-duration" }, ya = { class: "fo-bili-title-row" }, _a = ["href", "onClick"], ka = ["aria-expanded", "onClick"], $a = {
  key: 0,
  class: "fo-card-menu"
}, Ca = ["onClick"], wa = ["onClick"], xa = ["onClick"], Sa = { class: "fo-bili-meta" }, Ta = ["onClick"], Da = {
  key: 1,
  class: "fo-pager"
}, Ma = ["disabled"], Pa = { class: "fo-page-num" }, Ia = ["disabled"], La = { class: "fo-bili-hero fo-hero-persistent fo-cached-hero" }, Ra = { class: "fo-hero-left" }, Ea = { class: "fo-hero-folder-info" }, Ba = { class: "fo-bili-actions" }, za = {
  key: 0,
  class: "fo-bili-loading"
}, Aa = {
  key: 0,
  class: "fo-bili-empty"
}, Fa = { class: "fo-bili-thumb" }, Va = ["onClick"], Ua = ["src"], Na = { class: "fo-bili-title-row" }, qa = ["onClick"], Ga = ["onClick"], Oa = { class: "fo-bili-meta" }, Wa = {
  key: 2,
  class: "fo-pager"
}, Ka = ["disabled"], Ya = { class: "fo-page-num" }, ja = ["disabled"], Qa = { class: "fo-bili-hero" }, Ha = { class: "fo-bili-heading" }, Xa = { class: "fo-feed-hero-title" }, Ja = ["placeholder", "aria-label"], Za = ["title"], er = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, tr = { class: "card-fullscreen-bili-suggest-head" }, ir = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, or = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, lr = ["onClick", "onContextmenu"], sr = { class: "card-fullscreen-bili-thumb" }, nr = ["src"], ar = { key: 0 }, rr = { class: "card-fullscreen-bili-video-copy" }, ur = { class: "fo-bili-actions" }, dr = { class: "fo-bili-toolbar" }, cr = { class: "fo-bili-sort" }, pr = { class: "fo-vue-feed-label" }, vr = {
  key: 0,
  class: "fo-bili-loading",
  role: "status"
}, br = {
  key: 1,
  class: "fo-bili-empty",
  role: "alert"
}, fr = { class: "fo-bili-grid" }, gr = {
  key: 0,
  class: "fo-bili-empty"
}, mr = ["onContextmenu"], hr = { class: "fo-bili-thumb" }, yr = ["href", "onClick"], _r = ["src"], kr = { class: "fo-bili-count" }, $r = { class: "fo-bili-duration" }, Cr = { class: "fo-bili-title-row" }, wr = ["href", "onClick"], xr = { class: "fo-bili-meta" }, Sr = {
  key: 0,
  class: "fo-pager"
}, Tr = ["disabled"], Dr = { class: "fo-page-num" }, Mr = ["disabled"], Pr = { class: "fo-bili-toolbar" }, Ir = { class: "fo-feed-count-tag" }, Lr = {
  key: 0,
  class: "fo-bili-loading"
}, Rr = {
  key: 1,
  class: "fo-bili-empty"
}, Er = {
  key: 0,
  class: "fo-bili-empty"
}, Br = ["onDragstart"], zr = { class: "fo-bili-thumb" }, Ar = ["href", "onClick"], Fr = ["src"], Vr = { class: "fo-bili-count" }, Ur = { class: "fo-bili-duration" }, Nr = { class: "fo-bili-title-row" }, qr = ["href", "onClick"], Gr = ["aria-expanded", "onClick"], Or = {
  key: 0,
  class: "fo-card-menu"
}, Wr = ["onClick"], Kr = ["onClick"], Yr = ["onClick"], jr = ["onClick"], Qr = ["onClick"], Hr = { class: "fo-bili-meta" }, Xr = ["onClick"], Jr = { class: "fo-pager" }, Zr = ["disabled"], eu = { class: "fo-page-num" }, tu = ["disabled"], iu = { class: "fo-bili-hero fo-following-hero" }, ou = { class: "fo-bili-heading" }, lu = { class: "fo-feed-hero-title" }, su = {
  key: 0,
  class: "fo-feed-badge"
}, nu = { class: "fo-up-groups-bar" }, au = ["onClick"], ru = { class: "count" }, uu = { class: "fo-up-groups-actions" }, du = ["title"], cu = { class: "fo-bili-actions" }, pu = {
  key: 0,
  class: "fo-up-members-strip"
}, vu = { class: "fo-up-members-label" }, bu = { class: "fo-up-members-list" }, fu = ["title", "onClick", "onContextmenu"], gu = ["src"], mu = { class: "fo-bili-toolbar" }, hu = { class: "fo-feed-count-tag" }, yu = {
  key: 1,
  class: "fo-bili-loading"
}, _u = {
  key: 2,
  class: "fo-bili-empty"
}, ku = {
  key: 0,
  class: "fo-bili-empty"
}, $u = ["onDragstart"], Cu = { class: "fo-bili-thumb" }, wu = ["href", "onClick"], xu = ["src"], Su = { class: "fo-bili-count" }, Tu = { class: "fo-bili-duration" }, Du = { class: "fo-bili-title-row" }, Mu = ["href", "onClick"], Pu = ["aria-expanded", "onClick"], Iu = {
  key: 0,
  class: "fo-card-menu"
}, Lu = ["onClick"], Ru = ["onClick"], Eu = ["onClick"], Bu = ["onClick"], zu = { class: "fo-bili-meta" }, Au = ["onClick"], Fu = { class: "fo-pager" }, Vu = ["disabled"], Uu = { class: "fo-page-num" }, Nu = ["disabled"], qu = {
  key: 4,
  id: "fo-vue-subscription-main",
  class: "fo-bili-main fo-vue-subscription-main"
}, Gu = { class: "bili-sub-vue-shell" }, Ou = {
  key: 0,
  class: "fo-bili-loading"
}, Wu = {
  key: 1,
  class: "fo-bili-empty"
}, Ku = {
  key: 2,
  class: "fo-bili-empty"
}, Yu = {
  key: 5,
  id: "fo-vue-radio-main",
  class: "fo-bili-main fo-vue-radio-main"
}, ju = { class: "fo-bili-hero fo-radio-hero" }, Qu = { class: "fo-hero-left" }, Hu = { class: "fo-hero-folder-info" }, Xu = { class: "fo-radio-title-line" }, Ju = { class: "fo-bili-actions" }, Zu = { class: "bili-radio-layout fo-vue-radio-layout" }, ed = { class: "bili-radio-folders" }, td = { id: "bili-radio-folders" }, id = ["onClick"], od = {
  key: 0,
  class: "muted small"
}, ld = { class: "bili-radio-library" }, sd = { class: "bili-radio-library-head" }, nd = {
  key: 0,
  class: "bili-radio-lib-pager"
}, ad = ["disabled"], rd = ["disabled"], ud = {
  key: 0,
  role: "alert",
  class: "muted small"
}, dd = {
  id: "bili-radio-videos",
  class: "bili-radio-videos two-col bili-radio-card-grid"
}, cd = ["title", "onDragstart", "onClick"], pd = { class: "fo-bili-thumb" }, vd = ["src"], bd = {
  key: 1,
  class: "bili-radio-cover-ph"
}, fd = {
  key: 2,
  class: "fo-bili-duration"
}, gd = { class: "bili-radio-card-body" }, md = { class: "fo-bili-title-row" }, hd = { class: "fo-title-link fo-bili-title" }, yd = ["title", "aria-label", "onClick"], _d = { class: "fo-bili-meta" }, kd = {
  key: 0,
  class: "bili-radio-in-queue-tag"
}, $d = {
  key: 1,
  class: "bili-radio-hint-add"
}, Cd = {
  key: 0,
  class: "muted small"
}, wd = { class: "bili-radio-editor" }, xd = { class: "bili-radio-name-row" }, Sd = ["placeholder", "onKeydown"], Td = { class: "bili-radio-btn-group" }, Dd = ["title"], Md = ["aria-expanded"], Pd = {
  key: 0,
  class: "bili-radio-series-popover",
  role: "menu"
}, Id = {
  key: 0,
  class: "bili-radio-series-list"
}, Ld = ["onClick"], Rd = { class: "name" }, Ed = ["title", "onClick"], Bd = {
  key: 1,
  class: "muted small bili-radio-series-empty"
}, zd = {
  key: 0,
  class: "bili-radio-lib-pager"
}, Ad = ["disabled"], Fd = ["disabled"], Vd = ["onClick"], Ud = { class: "fo-bili-thumb" }, Nd = ["src"], qd = {
  key: 1,
  class: "bili-radio-cover-ph"
}, Gd = { class: "bili-radio-queue-badge" }, Od = ["aria-label", "onClick"], Wd = {
  key: 2,
  class: "fo-bili-duration"
}, Kd = { class: "bili-radio-card-body" }, Yd = { class: "fo-bili-title-row" }, jd = { class: "fo-title-link fo-bili-title" }, Qd = ["title", "onClick"], Hd = { class: "fo-bili-meta" }, Xd = {
  key: 0,
  class: "muted small bili-radio-queue-empty"
}, Jd = { class: "bili-radio-actions" }, Zd = ["disabled"], ec = ["disabled"], tc = ["title"], ic = {
  key: 2,
  class: "fo-context-divider"
}, jt = "lw-bili-active-mode", Qe = 14, oc = /* @__PURE__ */ Fe({
  __name: "BilibiliWorkspace",
  setup(V) {
    const { style: v, media: m } = Pi("bilibili"), w = h(!1);
    function T() {
      const o = E.radioSeriesName?.trim();
      if (!o) {
        w.value = !0;
        const t = document.getElementById("bili-radio-name");
        t && t.focus(), ot.fetch(R("bili.radioAppName"), R("bili.radioNameEmpty"));
        return;
      }
      w.value = !1, a("radio-save", { name: o });
    }
    const I = h(!1), L = h(null), M = h(null);
    let y = null;
    function x() {
      M.value = null, y && (clearTimeout(y), y = null);
    }
    function A() {
      a("radio-clear"), E.radioSeriesName = "", ke.value = 1, I.value = !1, x(), ot.fetch("哔哩哔哩电台", "已开启新歌单创作，请从左侧添加视频"), document.getElementById("bili-radio-name")?.focus();
    }
    function Z(o) {
      a("radio-load-series", o), ke.value = 1, I.value = !1, x();
    }
    function q(o) {
      if (M.value !== o) {
        x(), M.value = o, y = setTimeout(() => {
          M.value = null, y = null;
        }, 3500);
        return;
      }
      x(), a("radio-delete-series", o);
    }
    J(I, (o, t, i) => {
      if (!o || typeof document > "u") return;
      const d = (N) => {
        const $e = N.target;
        L.value && $e && !L.value.contains($e) && (I.value = !1, x());
      }, C = (N) => {
        N.key === "Escape" && (I.value = !1, x());
      };
      document.addEventListener("pointerdown", d), document.addEventListener("keydown", C), i(() => {
        document.removeEventListener("pointerdown", d), document.removeEventListener("keydown", C);
      });
    });
    function O(o, t) {
      !t.mid && !t.name || ve.showUpRecentVideosPreview(
        {
          preventDefault: () => o.preventDefault(),
          stopPropagation: () => o.stopPropagation(),
          clientX: o.clientX,
          clientY: o.clientY
        },
        {
          mid: t.mid || "",
          name: t.name || "UP主",
          face: t.face || "",
          sign: t.sign || ""
        }
      );
    }
    function me() {
      Di.togglePanel();
    }
    const u = K(() => E.organizer), ie = h(!1), { active: oe } = mi("daily-bilibili", "/bilibili.html");
    J(() => oe.value && u.value.mode === "recommendations", (o) => {
      ve.setRecommendationsActive(o);
    }, { immediate: !0, flush: "sync" }), J(() => oe.value && u.value.mode === "following", (o) => {
      ve.setFollowingActive(o);
    }, { immediate: !0, flush: "sync" }), J(() => oe.value && u.value.mode === "subscription", (o) => {
      ve.setSubscriptionActive(o);
    }, { immediate: !0, flush: "sync" }), J(() => oe.value && u.value.mode === "cache", (o) => {
      o || (ie.value = !1);
    });
    const z = h(u.value.query), Y = h(null), j = h(7), Q = h(1), le = K(() => j.value * 3), ee = K(() => Math.max(1, Math.ceil(u.value.cachedVideos.length / le.value))), se = K(() => u.value.cachedVideos.slice((Q.value - 1) * le.value, Q.value * le.value));
    J(ee, (o) => {
      Q.value = Math.min(Q.value, o);
    });
    const de = K(() => !!u.value.loadedFolderId && u.value.loadedFolderId === E.activeFolderId), U = h(""), H = h({ visible: !1, x: 0, y: 0, video: null, folder: null }), { menuRef: Xe, style: Je } = Mi({
      visible: () => H.value.visible,
      anchor: () => H.value,
      dismiss: () => {
        H.value.visible = !1;
      }
    }), ce = h(
      typeof localStorage < "u" && localStorage.getItem("bili_sidebar_features_collapsed") === "true"
    );
    function Ze() {
      ce.value = !ce.value;
      try {
        localStorage.setItem("bili_sidebar_features_collapsed", String(ce.value));
      } catch {
      }
    }
    function et() {
      ye.bvid && vi.open({
        bvid: ye.bvid,
        cid: ye.cid,
        title: ye.title
      });
    }
    function _() {
      ye.collapsed && bt.toggleCollapse(), bt.bringToFront();
    }
    function c() {
      bt.close();
    }
    J(() => u.value.query, (o) => {
      z.value = o;
    }), J(z, (o) => {
      (!o || !o.trim()) && u.value.query && a("organizer-search", "");
    });
    function a(o, t) {
      Le.dispatch(o, t);
    }
    function D(o) {
      o.group || Ct(), a(o.group ? "toggle-folder-group" : "select-folder", { id: o.id, kind: o.kind });
    }
    const X = h(""), ae = h(""), be = h("before"), Se = h(!1);
    function Ve(o, t) {
      t.kind === "created" && (X.value = t.id, o.dataTransfer?.setData("application/x-logicweaver-favorite-node", t.id), o.dataTransfer?.setData("text/plain", t.id), o.dataTransfer && (o.dataTransfer.effectAllowed = "move"));
    }
    function Ue(o, t) {
      if (t.kind !== "created" || !X.value || X.value === t.id) return;
      o.preventDefault(), o.dataTransfer && (o.dataTransfer.dropEffect = "move");
      const i = o.currentTarget;
      if (!i) return;
      const d = i.getBoundingClientRect(), C = (o.clientY - d.top) / Math.max(1, d.height), N = t.group && C > 0.25 && C < 0.75 ? "into" : C >= 0.5 ? "after" : "before";
      ae.value = t.id, be.value = N;
    }
    function Ne(o, t) {
      const i = o.relatedTarget, d = o.currentTarget;
      d && i && d.contains(i) || ae.value === t.id && (ae.value = "");
    }
    function Re() {
      X.value = "", ae.value = "", Se.value = !1;
    }
    function Ee(o, t) {
      o.preventDefault();
      const i = X.value || o.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "", d = be.value || (t.group ? "into" : "after");
      Re(), !(!i || i === t.id || t.kind !== "created") && a("move-folder-node", { sourceId: i, targetId: t.id, mode: d });
    }
    function qe(o) {
      X.value && (o.preventDefault(), o.dataTransfer && (o.dataTransfer.dropEffect = "move"), Se.value = !0);
    }
    function gt(o) {
      const t = o.relatedTarget, i = o.currentTarget;
      i && t && i.contains(t) || (Se.value = !1);
    }
    function mt(o) {
      o.preventDefault();
      const t = X.value || o.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
      Re(), t && a("move-folder-node", { sourceId: t, targetId: "root", mode: "into" });
    }
    function S() {
      const o = z.value.trim();
      a("organizer-search", o);
    }
    function f() {
      !z.value.trim() && u.value.query && a("organizer-search", "");
    }
    const p = h(""), $ = h(!1), F = h(!1), W = h("hot"), te = h(""), Be = K(() => W.value === "live" ? R("bili.searchLiveTitle", { keyword: te.value }) : R("bili.searchSuggestTitle")), ne = K(() => W.value === "live" ? R("bili.searchLiveSubtitle") : R("bili.searchSuggestSubtitle")), he = h([]), Ge = h(null), ze = h(!1), Oe = h(""), re = h(1), Te = h(0), st = h(!1), nt = h(!1), at = h(""), rt = h([]);
    let tt = 0, it = 0;
    J(() => u.value.mode, (o) => {
      o !== "recommendations" && Ct();
    });
    const ht = h([]);
    let Bt = 0, yt = null;
    function _t(o) {
      if (!o) return null;
      const t = o.bvid || (String(o.param || "").startsWith("BV") ? o.param : "");
      if (!t && !o.aid && !o.id) return null;
      const i = String(o.pic || o.cover || "").replace(/^http:/, "https:"), d = i.startsWith("//") ? `https:${i}` : i, C = String(o.title || "").replace(/<[^>]+>/g, ""), N = Number(o.duration || 0), $e = N > 0 ? `${Math.floor(N / 60)}:${String(N % 60).padStart(2, "0")}` : String(o.duration || ""), Pe = o.stat?.view || o.play || 0, di = Number(Pe) >= 1e4 ? `${(Number(Pe) / 1e4).toFixed(1)}万` : String(Number(Pe || 0)), ci = o.owner?.name || o.name || o.author || R("bili.upDefault");
      return {
        bvid: t,
        aid: String(o.aid || o.id || ""),
        title: C,
        cover: d,
        durationText: $e,
        playText: di,
        upper: ci
      };
    }
    async function kt() {
      if (W.value = "hot", $.value = !0, ht.value.length && Date.now() - Bt < 9e4) {
        he.value = ht.value;
        return;
      }
      F.value = !0;
      try {
        const t = await (await fetch("https://api.bilibili.com/x/web-interface/index/top/feed/rcmd?ps=8&fresh_idx=1", { credentials: "include" })).json();
        let i = Array.isArray(t.data?.item) ? t.data.item : [];
        if (!i.length) {
          const N = await (await fetch("https://api.bilibili.com/x/web-interface/popular?ps=8&pn=1", { credentials: "include" })).json();
          i = Array.isArray(N.data?.list) ? N.data.list : [];
        }
        const d = i.map(_t).filter(Boolean);
        ht.value = d, Bt = Date.now(), p.value.trim() || (he.value = d);
      } catch {
        he.value = [];
      } finally {
        F.value = !1;
      }
    }
    function zt() {
      p.value.trim() ? Ft(p.value.trim()) : kt();
    }
    function At() {
      const o = p.value.trim();
      if (clearTimeout(yt), !o) {
        kt();
        return;
      }
      yt = setTimeout(() => {
        Ft(o);
      }, 320);
    }
    async function Ft(o) {
      const t = ++it;
      $.value = !0, W.value = "live", te.value = o, F.value = !0;
      try {
        let i = null;
        if (window.LogicWeaverBiliSearchActions?.search)
          try {
            i = await window.LogicWeaverBiliSearchActions.search(o);
          } catch {
          }
        if (!i || i.code !== 0) {
          const C = `search_type=video&keyword=${encodeURIComponent(o)}&page=1&page_size=12`;
          i = await (await fetch(`https://api.bilibili.com/x/web-interface/search/type?${C}`, { credentials: "include" })).json();
        }
        if (t !== it || p.value.trim() !== o) return;
        const d = Array.isArray(i?.data?.result) ? i.data.result : [];
        he.value = d.slice(0, 10).map(_t).filter(Boolean);
      } catch {
        t === it && (he.value = []);
      } finally {
        t === it && (F.value = !1);
      }
    }
    function ut(o) {
      $.value = !1;
      const t = o.bvid || (String(o.param || o.id || "").startsWith("BV") ? o.param || o.id : "");
      t || o.aid ? bt.openVideo({
        bvid: t,
        aid: o.aid,
        title: o.title,
        cover: o.cover,
        author: o.upper
      }) : window.LogicWeaverBiliSearchActions?.local ? window.LogicWeaverBiliSearchActions.local(o) : window.open(`https://www.bilibili.com/video/${t || o.bvid || o.id}`, "_blank");
    }
    function $t(o, t) {
      Ut(o, {
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
    function Ct() {
      ze.value = !1, tt++, nt.value = !1;
    }
    async function dt(o, t) {
      const i = ++tt;
      ze.value = !0, Oe.value = o, re.value = t, nt.value = !0, at.value = "", rt.value = [], Te.value = 0, st.value = !1;
      try {
        let d;
        try {
          d = await ve.searchActions.search(o, t, 20);
        } catch {
        }
        if (!d || d.code !== 0) {
          const $e = new URLSearchParams({ search_type: "video", keyword: o, page: String(t), page_size: "20" }), Pe = await fetch(`https://api.bilibili.com/x/web-interface/search/type?${$e}`, { credentials: "include" });
          if (!Pe.ok) throw new Error(`HTTP ${Pe.status}`);
          d = await Pe.json();
        }
        if (d?.code !== 0 || !Array.isArray(d?.data?.result))
          throw new Error(d?.message || "B站没有返回有效的搜索结果");
        if (i !== tt) return;
        const C = d.data.result;
        rt.value = C.map(_t).filter(Boolean);
        const N = Number(d.data.numPages || d.data.num_pages || 0);
        Te.value = Number.isFinite(N) && N > 0 ? Math.floor(N) : 0, st.value = Te.value ? t < Te.value : C.length >= 20;
      } catch (d) {
        i === tt && (at.value = `搜索失败：${d instanceof Error ? d.message : "请稍后重试"}`);
      } finally {
        i === tt && (nt.value = !1);
      }
    }
    function wt() {
      const o = p.value.trim();
      if (clearTimeout(yt), it++, F.value = !1, $.value = !1, !o) {
        kt();
        return;
      }
      dt(o, 1);
    }
    J(() => [oe.value, wi.bilibili?.id], ([o, t]) => {
      if (!o || !t) return;
      const i = Ci("bilibili");
      i && (a("open-recommendations"), p.value = i.keyword, wt());
    }, { immediate: !0 });
    function Vt(o) {
      Ge.value && !Ge.value.contains(o.target) && ($.value = !1);
    }
    function xt(o) {
      H.value.visible = !1, U.value = U.value === o ? "" : o;
    }
    function Ut(o, t, i = !0) {
      U.value = "", H.value = {
        visible: !0,
        x: o.clientX,
        y: o.clientY,
        video: t,
        folder: i && E.activeFolderId ? { id: String(E.activeFolderId), title: u.value.folderTitle } : null
      };
    }
    function ct(o) {
      if (o instanceof KeyboardEvent) {
        o.key === "Escape" && (U.value = "", H.value.visible = !1, u.value.isTargetPickMode && a("organizer-cancel-move-target"));
        return;
      }
      const t = o.target;
      t?.closest(".fo-card-menu, .fo-card-more") || (U.value = ""), t?.closest(".fo-context-menu") || (H.value.visible = !1);
    }
    const Xt = typeof document < "u" && document.body.classList.contains("bili-standalone-body");
    function St() {
      const o = Y.value;
      if (!o || !o.clientWidth) return;
      const t = getComputedStyle(o), i = o.clientWidth - parseFloat(t.paddingLeft) - parseFloat(t.paddingRight), d = parseFloat(t.getPropertyValue("--favorite-card-min")) || 168, C = gi(i, d);
      if (C !== j.value) {
        const $e = (Q.value - 1) * le.value;
        j.value = C, Q.value = Math.floor($e / le.value) + 1;
      }
      u.value.mode === "organizer" && Le.setOrganizerColumns(C);
      const N = C * 3;
      u.value.mode === "recommendations" && ve.rcmdState.pageSize !== N && (ve.rcmdState.pageSize = N, ve.loadRecommendations(!0)), u.value.mode === "following" && ve.feedState.pageSize !== N && (ve.feedState.pageSize = N, ve.loadFollowing(!0));
    }
    J(Y, (o, t, i) => {
      if (!o) return;
      let d;
      const C = new ResizeObserver(() => {
        clearTimeout(d), d = setTimeout(St, 180);
      });
      C.observe(o), i(() => {
        clearTimeout(d), C.disconnect();
      });
    }, { flush: "post" }), J(() => u.value.loading, (o) => {
      o || St();
    });
    const Jt = ["organizer", "cache", "recommendations", "following", "radio"];
    let Tt = !1;
    function Zt() {
      try {
        const o = sessionStorage.getItem(jt);
        return o && Jt.includes(o) ? o : "organizer";
      } catch {
        return "organizer";
      }
    }
    function Nt() {
      if (Tt || !oe.value) return;
      Tt = !0;
      const o = Zt();
      o === "recommendations" ? a("open-recommendations") : o === "following" ? a("open-following") : o === "subscription" ? a("open-sub-video") : o === "cache" ? a("open-cache") : o === "radio" && a("open-radio");
    }
    J(() => u.value.mode, (o) => {
      if (!(!Tt && !oe.value))
        try {
          sessionStorage.setItem(jt, o);
        } catch {
        }
    }), J(oe, (o) => {
      o && Nt();
    }), Et(() => {
      import("./bilibili-channel.service-B4hNPH3G.js").catch((o) => console.error("[Bilibili] 频道动作服务加载失败", o)), St(), Le.loadOrganizer(), Nt(), document.addEventListener("pointerdown", ct, !0), document.addEventListener("pointerdown", Vt), window.addEventListener("keydown", ct), window.setBiliMiniDockVisible?.(!0), requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }), J(() => [u.value.videos, u.value.mode], () => {
      requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }, { flush: "post" }), Ht(() => {
      ve.setRecommendationsActive(!1), ve.setFollowingActive(!1), ve.setSubscriptionActive(!1), document.removeEventListener("pointerdown", ct, !0), document.removeEventListener("pointerdown", Vt), window.removeEventListener("keydown", ct);
    });
    function Dt(o, t) {
      U.value = "", H.value.visible = !1;
      const i = String(typeof o == "object" ? o.id || o.bvid || o.aid || "" : o), d = typeof o == "object" ? o : u.value.videos.find((C) => String(C.id) === i);
      a("organizer-video-action", { id: i, video: d, action: t });
    }
    async function De(o) {
      const { video: t, folder: i } = H.value;
      if (H.value.visible = !1, o === "add-radio" && t) {
        try {
          const d = await Ce.addToDefaultSeries({
            bvid: t.bvid || (t.id.startsWith("BV") ? t.id : ""),
            title: t.title,
            author: t.author,
            cover: t.cover,
            duration: Si(t.duration)
          });
          ot.fetch("B站电台", d ? "已添加到默认系列" : "已在默认系列中");
        } catch {
          ot.fetch("B站电台", "添加失败，请重试");
        }
        return;
      }
      if (o === "share-chat") {
        if (!t) return;
        try {
          const { chatService: d } = await import("./search.service-DiFFcmm2.js").then((N) => N.a_), { windowManagerController: C } = await import("./window-manager.store-D9RSYghK.js").then((N) => N.n);
          d.sendBiliShare({
            bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
            aid: t.aid,
            title: t.title,
            cover: t.cover,
            upName: t.author,
            upMid: t.authorMid,
            upFace: t.authorFace,
            play: t.playCount
          }), C.open("chat");
        } catch (d) {
          console.warn("分享到聊天室失败", d);
        }
        return;
      }
      t && a("organizer-video-action", { id: t.id || "", video: t, action: o });
    }
    function ei(o) {
      const t = E.radioSeriesName?.trim();
      let i = E.radioSeries.find((d) => d.name === t);
      if (!i && E.radioQueue.length && (i = {
        id: `series_${Date.now()}`,
        name: t || "未命名电台系列",
        count: E.radioQueue.length,
        items: E.radioQueue
      }), !i || !i.items?.length) {
        ot.fetch("哔哩哔哩电台", "当前没有可分享的系列曲目，请先添加曲目");
        return;
      }
      Kt.sendBiliSeriesShare(i, o);
    }
    function ti(o) {
      const { video: t } = H.value;
      H.value.visible = !1, t && Kt.sendBiliShare({
        bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
        aid: t.aid,
        title: t.title,
        cover: t.cover,
        upName: t.author,
        upMid: t.authorMid,
        upFace: t.authorFace,
        play: t.playCount
      }, o);
    }
    function ii(o) {
      if (!u.value.isTargetPickMode) return;
      const t = o.target;
      if (!t?.closest(".bili-sub-transcript-body, .bili-sub-scroll-stage") && !t?.closest(".fo-bili-folder-list")) {
        const i = document.querySelector(".fo-bili-folder-list");
        i && (o.preventDefault(), i.scrollTop += o.deltaY);
      }
    }
    function qt(o) {
      const t = document.createElement("div");
      return t.style.position = "fixed", t.style.top = "-9999px", t.style.left = "-9999px", t.style.width = "76px", t.style.height = "26px", t.style.display = "flex", t.style.alignItems = "center", t.style.justifyContent = "center", t.style.background = "transparent", t.style.zIndex = "999999", t.style.pointerEvents = "none", t.innerHTML = `
    <svg width="76" height="26" viewBox="0 0 76 26" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,0.45));">
      <line x1="6" y1="13" x2="64" y2="13" stroke="#00aeec" stroke-width="2.5" stroke-dasharray="5 3" stroke-linecap="round" />
      <polyline points="56,6 66,13 56,20" stroke="#00aeec" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    </svg>
  `, document.body.appendChild(t), t;
    }
    function Mt(o, t) {
      if (!o.dataTransfer) return;
      o.dataTransfer.effectAllowed = "copyMove", o.dataTransfer.setData("text/uri-list", t.url), o.dataTransfer.setData("text/plain", t.url), o.dataTransfer.setData("application/x-logicweaver-video-url", t.url), o.dataTransfer.setData("application/x-logicweaver-task", JSON.stringify({ type: "material", title: t.title, url: t.url, source: "B站收藏" }));
      const i = t.bvid || t.url?.match(/video\/(BV[0-9a-zA-Z]+)/)?.[1] || t.id, d = JSON.stringify({
        type: "bili-cassette-tape",
        bvid: i,
        title: t.title,
        cover: t.cover,
        author: t.author,
        duration: t.duration
      });
      o.dataTransfer.setData("application/x-bili-cassette", d), o.dataTransfer.setData("application/json", d);
      const C = qt(t.title);
      o.dataTransfer.setDragImage(C, 66, 13), setTimeout(() => {
        C.parentNode && C.parentNode.removeChild(C);
      }, 0);
    }
    function oi(o, t) {
      if (!o.dataTransfer) return;
      o.dataTransfer.effectAllowed = "copyMove";
      const i = JSON.stringify({
        type: "bili-cassette-tape",
        bvid: t.bvid,
        title: t.title,
        cover: t.cover,
        author: t.author,
        duration: t.duration
      });
      o.dataTransfer.setData("application/x-bili-cassette", i), o.dataTransfer.setData("application/json", i), o.dataTransfer.setData("text/plain", `https://www.bilibili.com/video/${t.bvid}`);
      const d = qt(t.title);
      o.dataTransfer.setDragImage(d, 66, 13), setTimeout(() => {
        d.parentNode && d.parentNode.removeChild(d);
      }, 0);
    }
    const Me = h(1), ke = h(1), pt = h(!1), Ye = K(
      () => Math.max(1, Math.ceil(E.radioVideos.length / Qe))
    ), li = K(() => {
      const t = (Math.min(Me.value, Ye.value) - 1) * Qe;
      return E.radioVideos.slice(t, t + Qe);
    }), je = K(
      () => Math.max(1, Math.ceil(E.radioQueue.length / Qe))
    ), si = K(() => {
      const t = (Math.min(ke.value, je.value) - 1) * Qe;
      return E.radioQueue.map((i, d) => ({ item: i, index: d })).slice(t, t + Qe);
    }), ni = K(() => E.radioSeries.find(
      (t) => t.id === bi || t.name === fi
    )?.items?.length || 0), Gt = K(
      () => new Set(E.radioQueue.map((o) => o.bvid))
    ), We = K(() => {
      const o = E.radioSeriesName?.trim();
      return o && E.radioSeries.find((t) => t.name === o) || null;
    });
    function vt(o) {
      const t = Math.max(0, Math.floor(Number(o) || 0));
      if (!t) return "";
      const i = Math.floor(t / 60), d = t % 60;
      return `${String(i).padStart(2, "0")}:${String(d).padStart(2, "0")}`;
    }
    J(
      () => E.radioActiveFolderId,
      (o, t) => {
        o !== t ? Me.value = 1 : Me.value > Ye.value && (Me.value = Ye.value);
      }
    ), J(
      () => E.radioQueue.length,
      () => {
        ke.value > je.value && (ke.value = je.value);
      }
    );
    function ai(o) {
      pt.value = !0, o.dataTransfer && (o.dataTransfer.dropEffect = "copy");
    }
    function ri(o) {
      const t = o.currentTarget, i = o.relatedTarget;
      (!t || !i || !t.contains(i)) && (pt.value = !1);
    }
    function ui(o) {
      pt.value = !1;
      const t = o.dataTransfer;
      if (!t) return;
      const i = t.getData("application/x-bili-cassette") || t.getData("application/json");
      let d = null;
      if (i)
        try {
          d = JSON.parse(i);
        } catch {
        }
      if (!d?.bvid) {
        const N = (t.getData("text/plain") || t.getData("text/uri-list") || "").match(/BV[0-9a-zA-Z]+/);
        if (N) {
          const $e = E.radioVideos.find((Pe) => Pe.bvid === N[0]);
          d = $e ? { ...$e } : { bvid: N[0], title: N[0] };
        }
      }
      d?.bvid && a("radio-add", {
        bvid: d.bvid,
        title: d.title,
        cover: d.cover,
        author: d.author,
        duration: d.duration
      });
    }
    return (o, t) => (l(), s("section", {
      id: "daily-bilibili",
      class: P(["card wide", { "card-fullscreen": r(Xt) || r(xi).activeId === "daily-bilibili" }])
    }, [
      e("div", qs, [
        e("div", Gs, [
          e("div", {
            class: P(["fo-bili-layout", { "fo-picking-move-target": u.value.isTargetPickMode, "has-workspace-wallpaper": !!r(v) }]),
            style: we(r(v)),
            "data-vue-organizer-shell": "true",
            onWheel: ii
          }, [
            _e(Ii, { media: r(m) }, null, 8, ["media"]),
            e("aside", Os, [
              e("div", {
                class: P(["fo-sidebar-toggle-bar", { "is-collapsed": ce.value }]),
                title: ce.value ? r(R)("bili.channel.expandTip") : r(R)("bili.channel.collapseTip"),
                onClick: Ze
              }, [
                e("div", Ks, [
                  t[59] || (t[59] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                  e("span", null, n(r(R)("bili.channel.title")), 1),
                  ce.value ? (l(), s("span", Ys, "5")) : g("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "fo-sidebar-toggle-action",
                  "aria-expanded": !ce.value,
                  title: ce.value ? r(R)("bili.channel.expand") : r(R)("bili.channel.collapse")
                }, [
                  e("span", null, n(ce.value ? r(R)("bili.channel.expand") : r(R)("bili.channel.collapse")), 1),
                  e("span", Qs, n(ce.value ? "▾" : "▴"), 1)
                ], 8, js)
              ], 10, Ws),
              ue(e("div", Hs, [
                e("div", Xs, [
                  e("button", {
                    id: "fo-sidebar-cache-btn",
                    type: "button",
                    class: P(["fo-sidebar-sub-btn", { on: u.value.mode === "cache" }]),
                    title: r(R)("bili.channel.cacheVideoTip"),
                    onClick: t[0] || (t[0] = (i) => a("open-cache"))
                  }, [
                    e("div", Zs, [
                      t[60] || (t[60] = e("span", { class: "fo-sidebar-sub-icon" }, "💾", -1)),
                      e("div", en, [
                        e("strong", null, n(r(R)("bili.channel.cacheVideo")), 1),
                        e("small", null, n(r(R)("bili.channel.cacheVideoSub")), 1)
                      ])
                    ]),
                    t[61] || (t[61] = e("span", { class: "fo-sidebar-sub-badge" }, "LOCAL", -1))
                  ], 10, Js)
                ]),
                e("div", tn, [
                  e("button", {
                    id: "fo-sidebar-following-btn",
                    type: "button",
                    class: P(["fo-sidebar-sub-btn", { on: u.value.mode === "following" }]),
                    title: r(R)("bili.channel.followingTip"),
                    onClick: t[1] || (t[1] = (i) => a("open-following"))
                  }, [
                    e("div", ln, [
                      t[62] || (t[62] = e("span", { class: "fo-sidebar-sub-icon" }, "📺", -1)),
                      e("div", sn, [
                        e("strong", null, n(r(R)("bili.channel.following")), 1),
                        e("small", null, n(r(R)("bili.channel.followingSub")), 1)
                      ])
                    ]),
                    t[63] || (t[63] = e("span", { class: "fo-sidebar-sub-badge" }, "FEED", -1))
                  ], 10, on)
                ]),
                e("div", nn, [
                  e("button", {
                    id: "fo-sidebar-recommend-btn",
                    type: "button",
                    class: P(["fo-sidebar-sub-btn", { on: u.value.mode === "recommendations" }]),
                    title: r(R)("bili.channel.forYouTip"),
                    onClick: t[2] || (t[2] = (i) => a("open-recommendations"))
                  }, [
                    e("div", rn, [
                      t[64] || (t[64] = e("span", { class: "fo-sidebar-sub-icon" }, "✨", -1)),
                      e("div", un, [
                        e("strong", null, n(r(R)("bili.channel.forYou")), 1),
                        e("small", null, n(r(R)("bili.channel.forYouSub")), 1)
                      ])
                    ]),
                    t[65] || (t[65] = e("span", { class: "fo-sidebar-sub-badge" }, "FOR YOU", -1))
                  ], 10, an)
                ]),
                e("div", dn, [
                  e("button", {
                    id: "fo-sidebar-radio-btn",
                    type: "button",
                    class: P(["fo-sidebar-sub-btn", { on: u.value.mode === "radio" }]),
                    title: r(R)("bili.channel.radioTip"),
                    onClick: t[3] || (t[3] = (i) => a("open-radio"))
                  }, [
                    e("div", pn, [
                      t[66] || (t[66] = e("span", { class: "fo-sidebar-sub-icon" }, "📻", -1)),
                      e("div", vn, [
                        e("strong", null, n(r(R)("bili.channel.radio")), 1),
                        e("small", null, n(r(R)("bili.channel.radioSub")), 1)
                      ])
                    ]),
                    t[67] || (t[67] = e("span", { class: "fo-sidebar-sub-badge" }, "RADIO", -1))
                  ], 10, cn)
                ])
              ], 512), [
                [Qt, !ce.value]
              ]),
              e("div", bn, [
                e("div", fn, [
                  t[68] || (t[68] = e("span", { class: "fo-sidebar-sub-icon" }, "📁", -1)),
                  e("div", gn, [
                    e("strong", null, n(r(R)("bili.channel.foldersHub")), 1),
                    e("small", null, n(r(R)("bili.channel.foldersHubSub")), 1)
                  ])
                ]),
                e("button", {
                  class: "fo-sidebar-hub-add",
                  type: "button",
                  title: r(R)("bili.channel.createFolderTip"),
                  "aria-label": r(R)("bili.channel.createFolderTip"),
                  onClick: t[4] || (t[4] = (i) => a("create-bili-folder"))
                }, "＋", 8, mn)
              ]),
              u.value.isTargetPickMode ? (l(), s("div", hn, [
                t[69] || (t[69] = e("div", { class: "fo-move-target-tip" }, [
                  e("span", { class: "fo-move-target-dot" }),
                  e("span", null, [
                    ge("请点击"),
                    e("strong", null, "自建收藏夹"),
                    ge("移入")
                  ])
                ], -1)),
                e("button", {
                  type: "button",
                  class: "fo-move-target-cancel",
                  title: "取消移动 (按 Esc 也可取消)",
                  onClick: t[5] || (t[5] = (i) => a("organizer-cancel-move-target"))
                }, " ✕ 取消 ")
              ])) : g("", !0),
              e("nav", yn, [
                (l(!0), s(B, null, G(u.value.folders, (i, d) => (l(), s(B, {
                  key: `${i.group ? "group" : "folder"}:${i.id}`
                }, [
                  d > 0 && u.value.folders[d - 1]?.kind !== i.kind ? (l(), s("div", _n)) : g("", !0),
                  d === 0 || u.value.folders[d - 1]?.kind !== i.kind ? (l(), s("div", {
                    key: 1,
                    class: P(["fo-bili-section-head fo-vue-section-head", { "drag-into": i.kind === "created" && Se.value }]),
                    onDragover: (C) => i.kind === "created" ? qe(C) : void 0,
                    onDragleave: (C) => i.kind === "created" ? gt(C) : void 0,
                    onDrop: (C) => i.kind === "created" ? mt(C) : void 0
                  }, [
                    e("span", $n, [
                      e("b", null, n(i.kind === "collected" ? "我追的合集/收藏夹" : i.kind === "other" ? "其他收藏" : "我创建的收藏夹"), 1)
                    ]),
                    i.kind === "created" ? (l(), s("button", {
                      key: 0,
                      class: "fo-bili-section-add-btn",
                      type: "button",
                      title: "新建插件分组",
                      "aria-label": "新建插件分组",
                      onClick: t[6] || (t[6] = k((C) => a("create-local-group"), ["stop"]))
                    }, "＋")) : g("", !0)
                  ], 42, kn)) : g("", !0),
                  i.group ? (l(), s("div", {
                    key: 3,
                    class: P(["fo-bili-group-label", {
                      collapsed: i.collapsed,
                      dragging: X.value === i.id,
                      "drag-before": ae.value === i.id && be.value === "before",
                      "drag-after": ae.value === i.id && be.value === "after",
                      "drag-into": ae.value === i.id && be.value === "into"
                    }]),
                    style: we({ "--fo-depth": i.depth }),
                    role: "button",
                    tabindex: "0",
                    "aria-expanded": !i.collapsed,
                    draggable: !0,
                    onClick: (C) => D(i),
                    onKeydown: [
                      Ke(k((C) => D(i), ["prevent"]), ["enter"]),
                      Ke(k((C) => D(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (C) => Ve(C, i),
                    onDragover: (C) => Ue(C, i),
                    onDragleave: (C) => Ne(C, i),
                    onDrop: (C) => Ee(C, i),
                    onDragend: Re
                  }, [
                    e("i", xn, n(i.collapsed ? "›" : "⌄"), 1),
                    t[71] || (t[71] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, n(i.title), 1),
                    e("small", null, n(i.count), 1)
                  ], 46, wn)) : (l(), s("div", {
                    key: 2,
                    role: "button",
                    tabindex: "0",
                    class: P(["fo-bili-folder", {
                      on: i.selected,
                      dragging: X.value === i.id,
                      "drag-before": ae.value === i.id && be.value === "before",
                      "drag-after": ae.value === i.id && be.value === "after",
                      "drag-into": ae.value === i.id && be.value === "into",
                      "target-candidate": u.value.isTargetPickMode && i.kind === "created" && !i.selected
                    }]),
                    "data-folder-id": i.id,
                    "data-folder-kind": i.kind,
                    style: we({ "--fo-depth": i.depth }),
                    draggable: i.kind === "created",
                    onClick: (C) => D(i),
                    onKeydown: [
                      Ke(k((C) => D(i), ["prevent"]), ["enter"]),
                      Ke(k((C) => D(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (C) => Ve(C, i),
                    onDragover: (C) => Ue(C, i),
                    onDragleave: (C) => Ne(C, i),
                    onDrop: (C) => Ee(C, i),
                    onDragend: Re
                  }, [
                    t[70] || (t[70] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, n(i.title), 1),
                    e("small", null, n(i.count), 1)
                  ], 46, Cn))
                ], 64))), 128)),
                !u.value.loading && !u.value.error && !u.value.folders.length ? (l(), s("p", Sn, "暂无可用收藏夹。")) : g("", !0)
              ])
            ]),
            u.value.mode === "organizer" ? (l(), s("section", {
              key: 0,
              id: "fo-vue-main",
              ref_key: "organizerMain",
              ref: Y,
              class: "fo-bili-main"
            }, [
              u.value.loading && !ze.value && !de.value ? (l(), s("div", Tn, [...t[72] || (t[72] = [
                e("i", null, null, -1),
                e("span", null, "正在读取 B站收藏内容…", -1)
              ])])) : !ze.value && u.value.error && u.value.error.includes("未登录") ? (l(), s("div", Dn, [
                e("div", Mn, [
                  t[74] || (t[74] = e("span", { class: "fo-bili-login-icon" }, "📺", -1)),
                  t[75] || (t[75] = e("h3", null, "未检测到哔哩哔哩登录状态", -1)),
                  t[76] || (t[76] = e("p", null, "tab-Project 直接复用当前浏览器的 B站 网页会话，无需输入账号密码或扫码授权。", -1)),
                  e("div", Pn, [
                    t[73] || (t[73] = e("a", {
                      class: "fo-bili-btn-login",
                      href: "https://passport.bilibili.com/login",
                      target: "_blank",
                      rel: "noreferrer"
                    }, "前往 bilibili.com 登录 ↗", -1)),
                    e("button", {
                      type: "button",
                      class: "fo-bili-btn-refresh",
                      onClick: t[7] || (t[7] = (i) => a("organizer-refresh"))
                    }, "已登录，点击刷新 ↻")
                  ])
                ])
              ])) : !ze.value && u.value.error && !de.value ? (l(), s("p", In, n(u.value.error), 1)) : (l(), s(B, { key: 3 }, [
                e("header", Ln, [
                  e("div", Rn, [
                    e("div", {
                      class: P(["fo-bili-cover", { "fo-vue-cover-image": u.value.folderCover }])
                    }, [
                      u.value.folderCover ? (l(), s("img", {
                        key: 0,
                        src: u.value.folderCover,
                        alt: "",
                        referrerpolicy: "no-referrer"
                      }, null, 8, En)) : (l(), s("i", Bn))
                    ], 2),
                    e("div", zn, [
                      e("h3", null, n(u.value.folderTitle), 1),
                      e("p", null, n(u.value.folderSubtitle), 1)
                    ])
                  ]),
                  e("div", {
                    class: "card-fullscreen-bili-search fo-hero-bili-search",
                    ref_key: "searchHostRef",
                    ref: Ge
                  }, [
                    e("form", {
                      class: "card-fullscreen-bili-searchbar",
                      role: "search",
                      onSubmit: k(wt, ["prevent"])
                    }, [
                      ue(e("input", {
                        "onUpdate:modelValue": t[8] || (t[8] = (i) => p.value = i),
                        type: "search",
                        autocomplete: "off",
                        placeholder: r(R)("bili.workspace.searchPlaceholder"),
                        "aria-label": r(R)("bili.workspace.searchAria"),
                        onFocus: zt,
                        onInput: At
                      }, null, 40, An), [
                        [xe, p.value]
                      ]),
                      e("button", {
                        type: "submit",
                        title: r(R)("bili.workspace.searchBtnTip")
                      }, "⌕", 8, Fn)
                    ], 32),
                    $.value ? (l(), s("div", Vn, [
                      e("div", Un, [
                        e("span", null, n(Be.value), 1),
                        e("small", null, n(ne.value), 1)
                      ]),
                      F.value ? (l(), s("p", Nn, "正在获取推荐 / 搜索中…")) : !he.value.length && !F.value ? (l(), s("p", qn, "暂无联想结果，按回车在插件内搜索")) : (l(!0), s(B, { key: 2 }, G(he.value, (i) => (l(), s("button", {
                        key: i.bvid || i.aid,
                        type: "button",
                        class: "card-fullscreen-bili-video-row",
                        role: "option",
                        onClick: (d) => ut(i),
                        onContextmenu: k((d) => $t(d, i), ["prevent"])
                      }, [
                        e("span", On, [
                          e("img", {
                            src: i.cover,
                            alt: "",
                            referrerpolicy: "no-referrer",
                            loading: "lazy"
                          }, null, 8, Wn),
                          i.durationText ? (l(), s("i", Kn, n(i.durationText), 1)) : g("", !0)
                        ]),
                        e("span", Yn, [
                          e("strong", null, n(i.title), 1),
                          e("small", null, n(i.upper) + " · " + n(i.playText) + "播放", 1)
                        ])
                      ], 40, Gn))), 128))
                    ])) : g("", !0)
                  ], 512),
                  e("div", jn, [
                    e("button", {
                      id: "bili-header-msg-center-btn",
                      class: P(["fm-tab bili-header-msg-btn hero-action-btn", { "is-active": r(Ti).isOpen }]),
                      type: "button",
                      title: r(R)("bili.workspace.msgCenterTip"),
                      onClick: me
                    }, [
                      t[77] || (t[77] = e("span", { class: "bili-header-msg-icon" }, "🔔", -1)),
                      e("span", Hn, n(r(R)("bili.workspace.msgBtn")), 1)
                    ], 10, Qn),
                    e("button", {
                      type: "button",
                      class: "primary hero-action-btn",
                      disabled: !u.value.videos.length,
                      onClick: t[9] || (t[9] = (i) => a("organizer-batch-toggle"))
                    }, n(u.value.batchMode ? r(R)("bili.workspace.batchBack") : r(R)("bili.workspace.batch")), 9, Xn)
                  ])
                ]),
                e("div", Jn, [
                  u.value.batchMode ? g("", !0) : (l(), s("div", Zn, [
                    (l(!0), s(B, null, G([{ id: "fav_time", text: r(R)("bili.sort.favTime") }, { id: "view", text: r(R)("bili.sort.view") }, { id: "pubtime", text: r(R)("bili.sort.pubTime") }], (i) => (l(), s("button", {
                      key: i.id,
                      type: "button",
                      class: P({ on: u.value.sort === i.id }),
                      onClick: (d) => a("organizer-sort", i.id)
                    }, n(i.text), 11, ea))), 128))
                  ])),
                  e("div", ta, [
                    r(ye).isOpen && r(ye).bvid ? (l(), s("div", {
                      key: 0,
                      class: P(["fo-video-tab-item", { "is-collapsed": r(ye).collapsed }]),
                      title: r(ye).title
                    }, [
                      e("div", {
                        class: "fo-video-tab-meta",
                        onClick: _
                      }, [
                        e("span", {
                          class: P(["fo-video-tab-pulse", { playing: r(ye).isPlaying }])
                        }, null, 2),
                        e("span", oa, n(r(ye).title), 1)
                      ]),
                      e("div", la, [
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-close",
                          title: "关闭视频",
                          onClick: k(c, ["stop"])
                        }, " ✕ "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-sub",
                          title: "查看该视频完整纯文本字幕",
                          onClick: k(et, ["stop"])
                        }, " 字幕 "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-expand",
                          title: r(ye).collapsed ? "放大恢复视频小窗" : "聚焦视频小窗",
                          onClick: k(_, ["stop"])
                        }, " 放大 ", 8, sa)
                      ])
                    ], 10, ia)) : g("", !0)
                  ]),
                  u.value.batchMode ? (l(), s("div", na, [
                    e("span", aa, "已选择 " + n(u.value.selectedCount) + " 项", 1),
                    e("button", {
                      type: "button",
                      onClick: t[11] || (t[11] = (i) => a("organizer-batch-all"))
                    }, "全选/取消全选"),
                    e("button", {
                      type: "button",
                      class: P({ "picking-target": u.value.isTargetPickMode }),
                      onClick: t[12] || (t[12] = (i) => u.value.isTargetPickMode ? a("organizer-cancel-move-target") : a("organizer-batch-move"))
                    }, n(u.value.isTargetPickMode ? "✕ 取消移动" : "移动到"), 3),
                    e("button", {
                      type: "button",
                      onClick: t[13] || (t[13] = (i) => a("organizer-batch-cache"))
                    }, "缓存所选"),
                    e("button", {
                      type: "button",
                      onClick: t[14] || (t[14] = (i) => a("organizer-batch-unfavorite"))
                    }, "取消收藏")
                  ])) : (l(), s("form", {
                    key: 1,
                    class: "fo-bili-search",
                    onSubmit: k(S, ["prevent"])
                  }, [
                    ue(e("input", {
                      "onUpdate:modelValue": t[10] || (t[10] = (i) => z.value = i),
                      type: "search",
                      placeholder: "请输入关键词",
                      "aria-label": "搜索当前收藏夹",
                      onInput: f,
                      onSearch: f
                    }, null, 544), [
                      [xe, z.value]
                    ]),
                    t[78] || (t[78] = e("button", {
                      type: "submit",
                      title: "搜索"
                    }, "⌕", -1))
                  ], 32))
                ]),
                u.value.error ? (l(), s("p", ra, n(u.value.error), 1)) : g("", !0),
                e("div", {
                  class: "fo-bili-grid fo-favorites-grid",
                  style: we({ "--favorite-columns": u.value.pageSize / 3 }),
                  "aria-busy": u.value.loading
                }, [
                  u.value.videos.length ? g("", !0) : (l(), s("p", da, n(u.value.query ? "没有找到匹配的视频。" : "这个收藏夹是空的。"), 1)),
                  (l(!0), s(B, null, G(u.value.videos, (i) => (l(), s("article", {
                    key: i.id,
                    class: P(["fo-bili-card", { "batch-selected": i.selected, "fo-single-moving": u.value.movingVideoId === i.id }]),
                    "data-batch-id": i.id,
                    draggable: "true",
                    onDragstart: (d) => Mt(d, i),
                    onContextmenu: k((d) => Ut(d, i), ["prevent", "stop"])
                  }, [
                    e("div", pa, [
                      u.value.batchMode ? (l(), s("label", va, [
                        e("input", {
                          type: "checkbox",
                          checked: i.selected,
                          onChange: (d) => a("organizer-batch-select", i.id)
                        }, null, 40, ba),
                        t[79] || (t[79] = e("span", null, "✓", -1))
                      ])) : g("", !0),
                      e("a", {
                        class: "fo-cover-link",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: k((d) => a("organizer-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, ga)
                      ], 8, fa),
                      e("span", ma, "▣ " + n(i.playCount), 1),
                      e("span", ha, n(i.duration), 1)
                    ]),
                    e("div", ya, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: k((d) => a("organizer-play-video", i), ["prevent"])
                      }, n(i.title), 9, _a),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": U.value === i.id,
                        onClick: k((d) => xt(i.id), ["stop"])
                      }, "⋮", 8, ka),
                      U.value === i.id ? (l(), s("div", $a, [
                        i.writable ? (l(), s("button", {
                          key: 0,
                          type: "button",
                          class: "danger",
                          onClick: (d) => Dt(i.id, "delete")
                        }, "取消收藏", 8, Ca)) : g("", !0),
                        i.writable ? (l(), s("button", {
                          key: 1,
                          type: "button",
                          onClick: (d) => Dt(i.id, "move")
                        }, "移动到", 8, wa)) : g("", !0),
                        e("button", {
                          type: "button",
                          onClick: (d) => Dt(i.id, "subtitle")
                        }, "字幕", 8, xa)
                      ])) : g("", !0)
                    ]),
                    e("div", Sa, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: k((d) => O(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, n(i.author), 9, Ta),
                      e("span", null, "收藏于 " + n(i.favoriteDate), 1)
                    ])
                  ], 42, ca))), 128))
                ], 12, ua),
                u.value.totalPages > 1 ? (l(), s("div", Da, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: u.value.loading || u.value.page <= 1,
                    onClick: t[15] || (t[15] = (i) => a("organizer-page", u.value.page - 1))
                  }, "‹ 上一页", 8, Ma),
                  e("span", Pa, n(u.value.page) + " / " + n(u.value.totalPages), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: u.value.loading || u.value.page >= u.value.totalPages,
                    onClick: t[16] || (t[16] = (i) => a("organizer-page", u.value.page + 1))
                  }, "下一页 ›", 8, Ia)
                ])) : g("", !0)
              ], 64))
            ], 512)) : u.value.mode === "cache" ? (l(), s("section", {
              key: 1,
              id: "fo-vue-cache-main",
              ref_key: "organizerMain",
              ref: Y,
              class: "fo-bili-main"
            }, [
              ie.value ? (l(), It(Vl, {
                key: 0,
                active: r(oe),
                onBack: t[17] || (t[17] = (i) => ie.value = !1)
              }, null, 8, ["active"])) : (l(), s(B, { key: 1 }, [
                e("header", La, [
                  e("div", Ra, [
                    t[81] || (t[81] = e("div", { class: "fo-bili-cover" }, "💾", -1)),
                    e("div", Ea, [
                      t[80] || (t[80] = e("h3", null, "缓存视频", -1)),
                      e("p", null, n(u.value.cachedVideos.length) + " 个缓存记录 · 点击缓存设置管理存放目录", 1)
                    ])
                  ]),
                  e("div", Ba, [
                    e("button", {
                      type: "button",
                      class: "primary",
                      onClick: t[18] || (t[18] = (i) => a("organizer-open"))
                    }, "返回收藏夹"),
                    e("button", {
                      type: "button",
                      onClick: t[19] || (t[19] = (i) => ie.value = !0)
                    }, "缓存设置")
                  ])
                ]),
                u.value.cacheLoading ? (l(), s("div", za, [...t[82] || (t[82] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取本地缓存…", -1)
                ])])) : (l(), s("div", {
                  key: 1,
                  class: "fo-bili-grid fo-favorites-grid fo-cached-video-grid",
                  style: we({ "--favorite-columns": j.value })
                }, [
                  u.value.cachedVideos.length ? g("", !0) : (l(), s("p", Aa, "还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。")),
                  (l(!0), s(B, null, G(se.value, (i) => (l(), s("article", {
                    key: i.id,
                    class: "fo-bili-card fo-cached-video-card"
                  }, [
                    e("div", Fa, [
                      e("button", {
                        class: "fo-cached-play",
                        type: "button",
                        onClick: (d) => a("cache-play", i.id)
                      }, [
                        e("img", {
                          loading: "lazy",
                          referrerpolicy: "no-referrer",
                          src: i.cover,
                          alt: ""
                        }, null, 8, Ua),
                        t[83] || (t[83] = e("span", { class: "fo-cached-local-badge" }, "LOCAL", -1))
                      ], 8, Va)
                    ]),
                    e("div", Na, [
                      e("button", {
                        class: "fo-title-link fo-bili-title fo-cached-title",
                        type: "button",
                        onClick: (d) => a("cache-play", i.id)
                      }, n(i.title), 9, qa),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "删除缓存",
                        onClick: (d) => a("cache-delete", i.id)
                      }, "×", 8, Ga)
                    ]),
                    e("div", Oa, [
                      e("span", null, n(i.sizeText), 1),
                      e("span", null, "缓存于 " + n(i.cachedDate), 1)
                    ])
                  ]))), 128))
                ], 4)),
                ee.value > 1 ? (l(), s("div", Wa, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: Q.value <= 1,
                    onClick: t[20] || (t[20] = (i) => Q.value--)
                  }, "‹ 上一页", 8, Ka),
                  e("span", Ya, n(Q.value) + " / " + n(ee.value), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: Q.value >= ee.value,
                    onClick: t[21] || (t[21] = (i) => Q.value++)
                  }, "下一页 ›", 8, ja)
                ])) : g("", !0)
              ], 64))
            ], 512)) : u.value.mode === "recommendations" ? (l(), s("section", {
              key: 2,
              id: "fo-vue-recommend-main",
              ref_key: "organizerMain",
              ref: Y,
              class: "fo-bili-main"
            }, [
              e("header", Qa, [
                t[84] || (t[84] = e("div", { class: "fo-bili-cover fo-vue-recommend-cover" }, [
                  e("span", null, "✨")
                ], -1)),
                e("div", Ha, [
                  e("div", Xa, [
                    e("h3", null, n(u.value.specialTitle), 1)
                  ]),
                  e("p", null, n(u.value.specialSubtitle), 1)
                ]),
                e("div", {
                  class: "card-fullscreen-bili-search fo-hero-bili-search",
                  ref_key: "searchHostRef",
                  ref: Ge
                }, [
                  e("form", {
                    class: "card-fullscreen-bili-searchbar",
                    role: "search",
                    onSubmit: k(wt, ["prevent"])
                  }, [
                    ue(e("input", {
                      "onUpdate:modelValue": t[22] || (t[22] = (i) => p.value = i),
                      type: "search",
                      autocomplete: "off",
                      placeholder: r(R)("bili.workspace.searchPlaceholder"),
                      "aria-label": r(R)("bili.workspace.searchAria"),
                      onFocus: zt,
                      onInput: At
                    }, null, 40, Ja), [
                      [xe, p.value]
                    ]),
                    e("button", {
                      type: "submit",
                      title: r(R)("bili.workspace.searchBtnTip")
                    }, "⌕", 8, Za)
                  ], 32),
                  $.value ? (l(), s("div", er, [
                    e("div", tr, [
                      e("span", null, n(Be.value), 1),
                      e("small", null, n(ne.value), 1)
                    ]),
                    F.value ? (l(), s("p", ir, "正在获取推荐 / 搜索中…")) : !he.value.length && !F.value ? (l(), s("p", or, "暂无联想结果，按回车在插件内搜索")) : (l(!0), s(B, { key: 2 }, G(he.value, (i) => (l(), s("button", {
                      key: i.bvid || i.aid,
                      type: "button",
                      class: "card-fullscreen-bili-video-row",
                      role: "option",
                      onClick: (d) => ut(i),
                      onContextmenu: k((d) => $t(d, i), ["prevent"])
                    }, [
                      e("span", sr, [
                        e("img", {
                          src: i.cover,
                          alt: "",
                          referrerpolicy: "no-referrer",
                          loading: "lazy"
                        }, null, 8, nr),
                        i.durationText ? (l(), s("i", ar, n(i.durationText), 1)) : g("", !0)
                      ]),
                      e("span", rr, [
                        e("strong", null, n(i.title), 1),
                        e("small", null, n(i.upper) + " · " + n(i.playText) + "播放", 1)
                      ])
                    ], 40, lr))), 128))
                  ])) : g("", !0)
                ], 512),
                e("div", ur, [
                  e("button", {
                    type: "button",
                    onClick: t[23] || (t[23] = (i) => a("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              ze.value ? (l(), s(B, { key: 0 }, [
                e("div", dr, [
                  e("div", cr, [
                    e("span", pr, "搜索结果：" + n(Oe.value), 1)
                  ]),
                  e("div", { class: "fo-bili-actions" }, [
                    e("button", {
                      type: "button",
                      onClick: Ct
                    }, "返回个性推荐")
                  ])
                ]),
                nt.value ? (l(), s("div", vr, [...t[85] || (t[85] = [
                  e("i", null, null, -1),
                  e("span", null, "正在搜索 B站视频…", -1)
                ])])) : at.value ? (l(), s("div", br, [
                  e("p", null, n(at.value), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    onClick: t[24] || (t[24] = (i) => dt(Oe.value, re.value))
                  }, "重试")
                ])) : (l(), s(B, { key: 2 }, [
                  e("div", fr, [
                    rt.value.length ? g("", !0) : (l(), s("p", gr, "没有找到相关视频，换个关键词试试。")),
                    (l(!0), s(B, null, G(rt.value, (i) => (l(), s("article", {
                      key: i.bvid || i.aid,
                      class: "fo-bili-card",
                      onContextmenu: k((d) => $t(d, i), ["prevent", "stop"])
                    }, [
                      e("div", hr, [
                        e("a", {
                          class: "fo-cover-link",
                          href: `https://www.bilibili.com/video/${i.bvid || `av${i.aid}`}`,
                          onClick: k((d) => ut(i), ["prevent"])
                        }, [
                          e("img", {
                            loading: "lazy",
                            decoding: "async",
                            referrerpolicy: "no-referrer",
                            src: i.cover,
                            alt: ""
                          }, null, 8, _r)
                        ], 8, yr),
                        e("span", kr, "▣ " + n(i.playText), 1),
                        e("span", $r, n(i.durationText), 1)
                      ]),
                      e("div", Cr, [
                        e("a", {
                          class: "fo-title-link fo-bili-title",
                          href: `https://www.bilibili.com/video/${i.bvid || `av${i.aid}`}`,
                          onClick: k((d) => ut(i), ["prevent"])
                        }, n(i.title), 9, wr)
                      ]),
                      e("div", xr, [
                        e("span", null, n(i.upper), 1)
                      ])
                    ], 40, mr))), 128))
                  ]),
                  re.value > 1 || st.value ? (l(), s("div", Sr, [
                    e("button", {
                      type: "button",
                      class: "fo-btn",
                      disabled: re.value <= 1,
                      onClick: t[25] || (t[25] = (i) => dt(Oe.value, re.value - 1))
                    }, "‹ 上一页", 8, Tr),
                    e("span", Dr, n(re.value) + n(Te.value ? ` / ${Te.value}` : ""), 1),
                    e("button", {
                      type: "button",
                      class: "fo-btn",
                      disabled: !st.value,
                      onClick: t[26] || (t[26] = (i) => dt(Oe.value, re.value + 1))
                    }, "下一页 ›", 8, Mr)
                  ])) : g("", !0)
                ], 64))
              ], 64)) : (l(), s(B, { key: 1 }, [
                e("div", Pr, [
                  t[86] || (t[86] = e("div", { class: "fo-bili-sort" }, [
                    e("span", { class: "fo-vue-feed-label" }, "🔥 猜你喜欢与热门精选")
                  ], -1)),
                  e("div", Ir, "本页共 " + n(u.value.specialVideos.length) + " 个视频", 1)
                ]),
                u.value.specialLoading ? (l(), s("div", Lr, [...t[87] || (t[87] = [
                  e("i", null, null, -1),
                  e("span", null, "正在加载个性化推荐视频…", -1)
                ])])) : u.value.specialError ? (l(), s("p", Rr, n(u.value.specialError), 1)) : (l(), s("div", {
                  key: 2,
                  class: "fo-bili-grid fo-favorites-grid",
                  style: we({ "--favorite-columns": j.value })
                }, [
                  u.value.specialVideos.length ? g("", !0) : (l(), s("p", Er, "暂无推荐视频。")),
                  (l(!0), s(B, null, G(u.value.specialVideos, (i) => (l(), s("article", {
                    key: i.id,
                    class: "fo-bili-card",
                    draggable: "true",
                    onDragstart: (d) => Mt(d, i)
                  }, [
                    e("div", zr, [
                      e("a", {
                        class: "fo-cover-link",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: k((d) => a("special-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, Fr)
                      ], 8, Ar),
                      e("span", Vr, "▣ " + n(i.playCount), 1),
                      e("span", Ur, n(i.duration), 1)
                    ]),
                    e("div", Nr, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: k((d) => a("special-play-video", i), ["prevent"])
                      }, n(i.title), 9, qr),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": U.value === i.id,
                        onClick: k((d) => xt(i.id), ["stop"])
                      }, "⋮", 8, Gr),
                      U.value === i.id ? (l(), s("div", Or, [
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            a("special-video-action", { video: i, id: i.id, action: "collect-inbox" }), U.value = "";
                          }
                        }, "📥 添加到收集箱", 8, Wr),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            a("special-video-action", { id: i.id, action: "play" }), U.value = "";
                          }
                        }, "本地播放与评论", 8, Kr),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            a("special-video-action", { id: i.id, action: "subtitle" }), U.value = "";
                          }
                        }, "字幕提取", 8, Yr),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            a("special-video-action", { id: i.id, action: "cache" }), U.value = "";
                          }
                        }, "缓存视频", 8, jr),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            a("special-video-action", { id: i.id, action: "open" }), U.value = "";
                          }
                        }, "打开网页", 8, Qr)
                      ])) : g("", !0)
                    ]),
                    e("div", Hr, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: k((d) => O(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, n(i.author), 9, Xr),
                      e("span", null, n(i.favoriteDate), 1)
                    ])
                  ], 40, Br))), 128))
                ], 4)),
                e("div", Jr, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: u.value.specialLoading || u.value.specialPage <= 1,
                    onClick: t[27] || (t[27] = (i) => a("recommendations-page", u.value.specialPage - 1))
                  }, "‹ 上一页", 8, Zr),
                  e("span", eu, "第 " + n(u.value.specialPage) + " 页", 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: u.value.specialLoading,
                    onClick: t[28] || (t[28] = (i) => a("recommendations-page", u.value.specialPage + 1))
                  }, "下一页 ›", 8, tu)
                ])
              ], 64))
            ], 512)) : u.value.mode === "following" ? (l(), s("section", {
              key: 3,
              id: "fo-vue-following-main",
              ref_key: "organizerMain",
              ref: Y,
              class: "fo-bili-main"
            }, [
              e("header", iu, [
                t[88] || (t[88] = e("div", { class: "fo-bili-cover fo-vue-following-cover" }, [
                  e("span", null, "📺")
                ], -1)),
                e("div", ou, [
                  e("div", lu, [
                    e("h3", null, n(u.value.specialTitle), 1),
                    u.value.specialBadge !== `第 ${u.value.specialPage} 页` ? (l(), s("span", su, n(u.value.specialBadge), 1)) : g("", !0)
                  ]),
                  e("p", null, n(u.value.specialSubtitle), 1)
                ]),
                e("div", nu, [
                  e("div", {
                    class: "fo-up-groups-list",
                    onWheel: t[29] || (t[29] = //@ts-ignore
                    (...i) => r(Yt) && r(Yt)(...i))
                  }, [
                    (l(!0), s(B, null, G(u.value.followingGroups, (i) => (l(), s("button", {
                      key: i.id,
                      type: "button",
                      class: P(["fo-up-group-chip", { active: i.active }]),
                      onClick: (d) => a("following-group", i.id)
                    }, [
                      ge(n(i.child ? "↳ " : "") + n(i.name) + " ", 1),
                      e("small", ru, n(i.count), 1)
                    ], 10, au))), 128))
                  ], 32),
                  e("div", uu, [
                    e("button", {
                      id: "bili-following-up-group-manager",
                      type: "button",
                      title: r(R)("bili.workspace.upGroupManagerTip"),
                      onClick: t[30] || (t[30] = (i) => a("manage-up-groups"))
                    }, n(r(R)("bili.workspace.upGroupManager")), 9, du)
                  ])
                ]),
                e("div", cu, [
                  e("button", {
                    type: "button",
                    onClick: t[31] || (t[31] = (i) => a("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              u.value.followingMembers.length ? (l(), s("div", pu, [
                e("div", vu, [
                  e("b", null, n(u.value.specialBadge), 1),
                  e("small", null, "共 " + n(u.value.followingMembers.length) + " 位 UP 主", 1)
                ]),
                e("div", bu, [
                  e("button", {
                    type: "button",
                    class: P(["fo-up-member-chip", { active: !u.value.followingMembers.some((i) => i.active) }]),
                    onClick: t[32] || (t[32] = (i) => a("following-member", ""))
                  }, "全部UP", 2),
                  (l(!0), s(B, null, G(u.value.followingMembers, (i) => (l(), s("button", {
                    key: i.id,
                    type: "button",
                    class: P(["fo-up-member-chip", { active: i.active }]),
                    title: `左键筛选「${i.name}」，右键预览近期投稿`,
                    onClick: (d) => a("following-member", i.id),
                    onContextmenu: k((d) => a("following-preview-member", { id: i.id, clientX: d.clientX, clientY: d.clientY }), ["prevent"])
                  }, [
                    i.face ? (l(), s("img", {
                      key: 0,
                      loading: "lazy",
                      referrerpolicy: "no-referrer",
                      src: i.face,
                      alt: ""
                    }, null, 8, gu)) : g("", !0),
                    e("span", null, n(i.name), 1)
                  ], 42, fu))), 128))
                ]),
                e("button", {
                  type: "button",
                  class: "fo-btn-manage-members",
                  onClick: t[33] || (t[33] = (i) => a("following-manage-groups", "members"))
                }, "＋ 管理成员")
              ])) : g("", !0),
              e("div", mu, [
                t[89] || (t[89] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "⚡ UP 主最新投稿动态")
                ], -1)),
                e("div", hu, "本页共 " + n(u.value.specialVideos.length) + " 个视频", 1)
              ]),
              u.value.specialLoading ? (l(), s("div", yu, [...t[90] || (t[90] = [
                e("i", null, null, -1),
                e("span", null, "正在读取关注 UP 主更新…", -1)
              ])])) : u.value.specialError ? (l(), s("p", _u, n(u.value.specialError), 1)) : (l(), s("div", {
                key: 3,
                class: "fo-bili-grid fo-favorites-grid",
                style: we({ "--favorite-columns": j.value })
              }, [
                u.value.specialVideos.length ? g("", !0) : (l(), s("p", ku, "暂无最新关注视频动态。")),
                (l(!0), s(B, null, G(u.value.specialVideos, (i) => (l(), s("article", {
                  key: i.id,
                  class: "fo-bili-card",
                  draggable: "true",
                  onDragstart: (d) => Mt(d, i)
                }, [
                  e("div", Cu, [
                    e("a", {
                      class: "fo-cover-link",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: k((d) => a("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, xu)
                    ], 8, wu),
                    e("span", Su, "▣ " + n(i.playCount), 1),
                    e("span", Tu, n(i.duration), 1)
                  ]),
                  e("div", Du, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: k((d) => a("special-play-video", i), ["prevent"])
                    }, n(i.title), 9, Mu),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": U.value === i.id,
                      onClick: k((d) => xt(i.id), ["stop"])
                    }, "⋮", 8, Pu),
                    U.value === i.id ? (l(), s("div", Iu, [
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          a("special-video-action", { video: i, id: i.id, action: "play" }), U.value = "";
                        }
                      }, "本地播放与评论", 8, Lu),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          a("special-video-action", { video: i, id: i.id, action: "subtitle" }), U.value = "";
                        }
                      }, "字幕提取", 8, Ru),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          a("special-video-action", { video: i, id: i.id, action: "cache" }), U.value = "";
                        }
                      }, "缓存视频", 8, Eu),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          a("special-video-action", { video: i, id: i.id, action: "open" }), U.value = "";
                        }
                      }, "打开网页", 8, Bu)
                    ])) : g("", !0)
                  ]),
                  e("div", zu, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: k((d) => O(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, n(i.author), 9, Au),
                    e("span", null, n(i.favoriteDate), 1)
                  ])
                ], 40, $u))), 128))
              ], 4)),
              e("div", Fu, [
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: u.value.specialLoading || u.value.specialPage <= 1,
                  onClick: t[34] || (t[34] = (i) => a("following-page", u.value.specialPage - 1))
                }, "‹ 上一页", 8, Vu),
                e("span", Uu, "第 " + n(u.value.specialPage) + " 页", 1),
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: u.value.specialLoading || !u.value.followingHasMore,
                  onClick: t[35] || (t[35] = (i) => a("following-page", u.value.specialPage + 1))
                }, "下一页 ›", 8, Nu)
              ])
            ], 512)) : u.value.mode === "subscription" ? (l(), s("section", qu, [
              e("div", Gu, [
                u.value.subscriptionLoading ? (l(), s("div", Ou, [...t[91] || (t[91] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取视频与 AI 字幕稿…", -1)
                ])])) : u.value.subscriptionError ? (l(), s("p", Wu, "读取失败：" + n(u.value.subscriptionError), 1)) : !u.value.subscriptionCurrent && !u.value.subscriptionChannels.length ? (l(), s("div", Ku, "暂无正在播放的视频。")) : (l(), It(el, { key: 3 }))
              ])
            ])) : u.value.mode === "radio" ? (l(), s("section", Yu, [
              e("header", ju, [
                e("div", Qu, [
                  e("div", {
                    class: P(["fo-bili-cover fo-vue-radio-cover", { spinning: r(Ie).playing }])
                  }, [...t[92] || (t[92] = [
                    e("span", null, "📻", -1)
                  ])], 2),
                  e("div", Hu, [
                    e("div", Xu, [
                      t[94] || (t[94] = e("h3", null, "B站电台", -1)),
                      r(Ie).active ? (l(), s("span", {
                        key: 0,
                        class: P(["fo-radio-live-pill", { playing: r(Ie).playing }])
                      }, [
                        t[93] || (t[93] = e("i", {
                          class: "eq-bars",
                          "aria-hidden": "true"
                        }, [
                          e("b"),
                          e("b"),
                          e("b")
                        ], -1)),
                        e("span", null, n(r(Ie).playing ? "正在播" : "已暂停") + " · " + n(r(Ie).title), 1)
                      ], 2)) : g("", !0)
                    ]),
                    t[95] || (t[95] = e("p", null, "从左侧挑选收藏夹曲目，点击或拖拽装填进随身听连播队列，支持系列编排与跨刷新不断声", -1))
                  ])
                ]),
                e("div", Ju, [
                  e("button", {
                    type: "button",
                    onClick: t[36] || (t[36] = (i) => a("organizer-open"))
                  }, "← 返回收藏夹")
                ])
              ]),
              e("div", Zu, [
                e("aside", ed, [
                  t[96] || (t[96] = e("p", { class: "sw-title" }, "收藏夹", -1)),
                  e("div", td, [
                    (l(!0), s(B, null, G(r(E).radioFolders, (i) => (l(), s("button", {
                      key: i.id,
                      type: "button",
                      class: P(["bili-radio-folder", { on: i.id === r(E).radioActiveFolderId }]),
                      onClick: (d) => a("radio-select-folder", i.id)
                    }, [
                      e("span", null, n(i.title), 1),
                      e("span", null, n(i.count), 1)
                    ], 10, id))), 128)),
                    r(E).radioFolders.length ? g("", !0) : (l(), s("p", od, n(r(E).radioLoading ? "加载中…" : "暂无收藏夹"), 1))
                  ])
                ]),
                e("section", ld, [
                  e("div", sd, [
                    t[97] || (t[97] = e("p", {
                      id: "bili-radio-library-title",
                      class: "sw-title"
                    }, "收藏夹视频", -1)),
                    Ye.value > 1 ? (l(), s("div", nd, [
                      e("button", {
                        type: "button",
                        disabled: Me.value <= 1,
                        "aria-label": "上一页",
                        onClick: t[37] || (t[37] = (i) => Me.value--)
                      }, "‹", 8, ad),
                      e("span", null, n(Me.value) + " / " + n(Ye.value), 1),
                      e("button", {
                        type: "button",
                        disabled: Me.value >= Ye.value,
                        "aria-label": "下一页",
                        onClick: t[38] || (t[38] = (i) => Me.value++)
                      }, "›", 8, rd)
                    ])) : g("", !0)
                  ]),
                  r(E).radioError ? (l(), s("p", ud, n(r(E).radioError), 1)) : g("", !0),
                  e("div", dd, [
                    (l(!0), s(B, null, G(li.value, (i) => (l(), s("article", {
                      key: i.bvid,
                      class: P(["fo-bili-card bili-radio-card", { "in-queue": Gt.value.has(i.bvid) }]),
                      title: `${i.title} (点击或拖入右侧队列，点击 ♥ 喜欢)`,
                      draggable: "true",
                      onDragstart: (d) => oi(d, i),
                      onClick: (d) => a("radio-add", { bvid: i.bvid, title: i.title, cover: i.cover, author: i.author, duration: i.duration })
                    }, [
                      e("div", pd, [
                        i.cover ? (l(), s("img", {
                          key: 0,
                          src: i.cover,
                          alt: "",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, vd)) : (l(), s("span", bd)),
                        vt(i.duration) ? (l(), s("span", fd, n(vt(i.duration)), 1)) : g("", !0)
                      ]),
                      e("div", gd, [
                        e("div", md, [
                          e("span", hd, n(i.title), 1),
                          e("button", {
                            type: "button",
                            class: P(["fo-card-more bili-radio-like-btn", { liked: r(Ce).isLiked(i.bvid) }]),
                            title: r(Ce).isLiked(i.bvid) ? "取消喜欢" : "添加到我喜欢的电台",
                            "aria-label": r(Ce).isLiked(i.bvid) ? "取消喜欢" : "喜欢",
                            onClick: k((d) => {
                              r(Ce).toggleLike(i);
                            }, ["stop"])
                          }, n(r(Ce).isLiked(i.bvid) ? "♥" : "♡"), 11, yd)
                        ]),
                        e("div", _d, [
                          e("span", null, n(i.author || "Bilibili"), 1),
                          Gt.value.has(i.bvid) ? (l(), s("span", kd, "✓ 已入队")) : (l(), s("span", $d, "+ 入队"))
                        ])
                      ])
                    ], 42, cd))), 128)),
                    r(E).radioVideos.length ? g("", !0) : (l(), s("p", Cd, n(r(E).radioLoading ? "读取视频中…" : "此收藏夹暂无可播放视频"), 1))
                  ])
                ]),
                e("section", wd, [
                  e("div", xd, [
                    e("button", {
                      type: "button",
                      class: "bili-radio-liked-pill",
                      title: "一键载入「我喜欢的电台」到当前连播队列",
                      onClick: t[39] || (t[39] = (i) => r(Ce).openLikedSeries())
                    }, [
                      t[98] || (t[98] = e("span", { class: "heart" }, "♥", -1)),
                      t[99] || (t[99] = e("span", null, "我喜欢的电台", -1)),
                      e("small", null, n(ni.value), 1)
                    ]),
                    ue(e("input", {
                      id: "bili-radio-name",
                      "onUpdate:modelValue": t[40] || (t[40] = (i) => r(E).radioSeriesName = i),
                      maxlength: "48",
                      class: P({ "has-error": w.value }),
                      placeholder: w.value ? "⚠️ 请输入歌单名称" : "歌单名称（可选）",
                      autocomplete: "off",
                      onInput: t[41] || (t[41] = (i) => w.value = !1),
                      onKeydown: Ke(k(T, ["prevent"]), ["enter"])
                    }, null, 42, Sd), [
                      [xe, r(E).radioSeriesName]
                    ]),
                    e("div", Td, [
                      e("button", {
                        id: "bili-radio-save",
                        type: "button",
                        title: "保存当前队列",
                        onClick: T
                      }, " 💾 保存 "),
                      We.value ? (l(), s("button", {
                        key: 0,
                        type: "button",
                        class: P(["bili-radio-del-btn", { confirming: M.value === We.value.id }]),
                        title: M.value === We.value.id ? "再次点击确认删除当前歌单" : `删除歌单「${We.value.name}」`,
                        onClick: t[42] || (t[42] = (i) => q(We.value.id))
                      }, n(M.value === We.value.id ? "确认删除?" : "🗑️"), 11, Dd)) : g("", !0),
                      _e(Wt, {
                        id: "bili-radio-share",
                        compact: "",
                        label: "🚀 分享",
                        visible: !0,
                        onSelect: ei
                      })
                    ]),
                    e("div", {
                      ref_key: "seriesMenuWrapEl",
                      ref: L,
                      class: "bili-radio-series-dropdown-wrap"
                    }, [
                      e("button", {
                        type: "button",
                        class: "bili-radio-series-trigger",
                        "aria-expanded": I.value,
                        title: "切换或删除已保存的歌单",
                        onClick: t[43] || (t[43] = (i) => I.value = !I.value)
                      }, [
                        e("span", null, n(r(E).radioSeries.length ? `📚 歌单 (${r(E).radioSeries.length})` : "📚 暂无歌单"), 1),
                        t[100] || (t[100] = e("span", { class: "caret" }, "▾", -1))
                      ], 8, Md),
                      I.value ? (l(), s("div", Pd, [
                        e("button", {
                          type: "button",
                          class: "bili-radio-series-new",
                          onClick: A
                        }, " ＋ 新建空白歌单 "),
                        r(E).radioSeries.length ? (l(), s("div", Id, [
                          (l(!0), s(B, null, G(r(E).radioSeries, (i) => (l(), s("div", {
                            key: i.id,
                            class: P(["bili-radio-series-item", { active: We.value?.id === i.id }])
                          }, [
                            e("button", {
                              type: "button",
                              class: "bili-radio-series-pick",
                              onClick: (d) => Z(i.id)
                            }, [
                              e("span", Rd, n(i.name), 1),
                              e("small", null, n(i.count) + "首", 1)
                            ], 8, Ld),
                            e("button", {
                              type: "button",
                              class: P(["bili-radio-series-del", { confirming: M.value === i.id }]),
                              title: M.value === i.id ? "再次点击确认删除" : `删除歌单「${i.name}」`,
                              onClick: k((d) => q(i.id), ["stop"])
                            }, n(M.value === i.id ? "确认?" : "🗑️"), 11, Ed)
                          ], 2))), 128))
                        ])) : (l(), s("p", Bd, "还没有保存过歌单"))
                      ])) : g("", !0)
                    ], 512),
                    je.value > 1 ? (l(), s("div", zd, [
                      e("button", {
                        type: "button",
                        disabled: ke.value <= 1,
                        "aria-label": "队列上一页",
                        onClick: t[44] || (t[44] = (i) => ke.value--)
                      }, "‹", 8, Ad),
                      e("span", null, n(ke.value) + " / " + n(je.value), 1),
                      e("button", {
                        type: "button",
                        disabled: ke.value >= je.value,
                        "aria-label": "队列下一页",
                        onClick: t[45] || (t[45] = (i) => ke.value++)
                      }, "›", 8, Fd)
                    ])) : g("", !0)
                  ]),
                  e("div", {
                    id: "bili-radio-queue",
                    class: P(["bili-radio-queue two-col bili-radio-card-grid", { over: pt.value }]),
                    "aria-label": "电台播放队列",
                    onDragover: k(ai, ["prevent"]),
                    onDragleave: ri,
                    onDrop: k(ui, ["prevent"])
                  }, [
                    (l(!0), s(B, null, G(si.value, ({ item: i, index: d }) => (l(), s("article", {
                      key: `${i.bvid}-${d}`,
                      class: P(["fo-bili-card bili-radio-card bili-radio-queue-card", { "is-playing": r(Ie).active && r(Ie).trackIndex === d + 1 }]),
                      title: "点击立即从该曲目开始播放",
                      onClick: (C) => a("radio-play-index", d)
                    }, [
                      e("div", Ud, [
                        i.cover ? (l(), s("img", {
                          key: 0,
                          src: i.cover,
                          alt: "",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, Nd)) : (l(), s("span", qd)),
                        e("span", Gd, n(r(Ie).active && r(Ie).trackIndex === d + 1 ? "♪ 播放中" : `#${d + 1}`), 1),
                        e("button", {
                          type: "button",
                          class: "bili-radio-card-remove",
                          "aria-label": `移除 ${i.title}`,
                          title: "从队列移除",
                          onClick: k((C) => a("radio-remove", { index: d }), ["stop"])
                        }, "×", 8, Od),
                        vt(i.duration) ? (l(), s("span", Wd, n(vt(i.duration)), 1)) : g("", !0)
                      ]),
                      e("div", Kd, [
                        e("div", Yd, [
                          e("span", jd, n(i.title), 1),
                          e("button", {
                            type: "button",
                            class: P(["fo-card-more bili-radio-like-btn", { liked: r(Ce).isLiked(i.bvid) }]),
                            title: r(Ce).isLiked(i.bvid) ? "取消喜欢" : "添加到我喜欢的电台",
                            onClick: k((C) => {
                              r(Ce).toggleLike(i);
                            }, ["stop"])
                          }, n(r(Ce).isLiked(i.bvid) ? "♥" : "♡"), 11, Qd)
                        ]),
                        e("div", Hd, [
                          e("span", null, n(i.author || "Bilibili"), 1)
                        ])
                      ])
                    ], 10, Vd))), 128)),
                    r(E).radioQueue.length ? g("", !0) : (l(), s("p", Xd, "点击或直接从左侧拖入视频到此处，即可连播。"))
                  ], 34),
                  e("div", Jd, [
                    e("button", {
                      id: "bili-radio-play",
                      type: "button",
                      disabled: !r(E).radioQueue.length,
                      onClick: t[46] || (t[46] = (i) => a("radio-play"))
                    }, "▶ 按顺序播放", 8, Zd),
                    e("button", {
                      id: "bili-radio-shuffle",
                      type: "button",
                      disabled: !r(E).radioQueue.length,
                      onClick: t[47] || (t[47] = (i) => a("radio-shuffle"))
                    }, "🔀 随机播放", 8, ec),
                    e("button", {
                      id: "bili-radio-clear",
                      type: "button",
                      onClick: t[48] || (t[48] = (i) => {
                        ke.value = 1, a("radio-clear");
                      })
                    }, "清空编辑区")
                  ])
                ])
              ])
            ])) : g("", !0)
          ], 38)
        ])
      ]),
      t[113] || (t[113] = e("div", {
        class: "fm-pane",
        id: "pane-sub-video",
        hidden: "",
        style: { display: "none !important" }
      }, null, -1)),
      _e(Sl),
      _e(Ns),
      H.value.visible && H.value.video ? (l(), s("div", {
        key: 0,
        ref_key: "videoMenuRef",
        ref: Xe,
        class: "fo-context-menu",
        role: "menu",
        style: we(r(Je)),
        onClick: t[58] || (t[58] = k(() => {
        }, ["stop"]))
      }, [
        e("div", {
          class: "fo-context-header",
          title: H.value.video.title
        }, n(H.value.video.title), 9, tc),
        _e(Wt, {
          label: "💬 发送到聊天室",
          "match-menu-item": "",
          visible: H.value.visible,
          onSelect: ti
        }, null, 8, ["visible"]),
        t[110] || (t[110] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[49] || (t[49] = (i) => De("play"))
        }, [...t[101] || (t[101] = [
          e("span", { class: "fo-context-icon" }, "▶", -1),
          ge(" 小窗播放视频 ", -1)
        ])]),
        t[111] || (t[111] = e("div", { class: "fo-context-divider" }, null, -1)),
        H.value.video.writable ? (l(), s("button", {
          key: 0,
          type: "button",
          class: "fo-context-item danger",
          onClick: t[50] || (t[50] = (i) => De("delete"))
        }, [...t[102] || (t[102] = [
          e("span", { class: "fo-context-icon" }, "🗑", -1),
          ge(" 取消收藏 ", -1)
        ])])) : g("", !0),
        H.value.video.writable ? (l(), s("button", {
          key: 1,
          type: "button",
          class: "fo-context-item",
          onClick: t[51] || (t[51] = (i) => De("move"))
        }, [...t[103] || (t[103] = [
          e("span", { class: "fo-context-icon" }, "📁", -1),
          ge(" 移动到… ", -1)
        ])])) : g("", !0),
        H.value.video.writable ? (l(), s("div", ic)) : g("", !0),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[52] || (t[52] = (i) => De("open"))
        }, [...t[104] || (t[104] = [
          e("span", { class: "fo-context-icon" }, "↗", -1),
          ge(" 跳转到 B站 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[53] || (t[53] = (i) => De("copy-link"))
        }, [...t[105] || (t[105] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ge(" 复制链接 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[54] || (t[54] = (i) => De("cache"))
        }, [...t[106] || (t[106] = [
          e("span", { class: "fo-context-icon" }, "💾", -1),
          ge(" 缓存视频 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[55] || (t[55] = (i) => De("add-radio"))
        }, [...t[107] || (t[107] = [
          e("span", { class: "fo-context-icon" }, "📻", -1),
          ge(" 添加到电台 ", -1)
        ])]),
        t[112] || (t[112] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[56] || (t[56] = (i) => De("create-task"))
        }, [...t[108] || (t[108] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ge(" 创建任务 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[57] || (t[57] = (i) => De("subtitle"))
        }, [...t[109] || (t[109] = [
          e("span", { class: "fo-context-icon" }, "▤", -1),
          ge(" 字幕转文本 ", -1)
        ])])
      ], 4)) : g("", !0)
    ], 2));
  }
}), Cc = /* @__PURE__ */ He(oc, [["__scopeId", "data-v-b9d41061"]]);
export {
  Cc as default
};
