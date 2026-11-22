import { d as Fe, w as J, e as Lt, f as o, g as l, F as B, p as ue, z as Kt, h as e, q as P, i as G, n as we, t as n, k as $, b as h, u as r, B as _e, j as g, s as Y, o as Rt, l as Pt, v as xe, x as It, P as Gt, G as Qt, m as ge, L as vi, I as pt } from "./vendor-vue-C-_ocEUS.js";
import { _ as Qe, o as Et, t as R } from "./_plugin-vue_export-helper-CUD1GoS1.js";
import { a as E, b as Le, c as Ce, s as pi, L as bi, d as fi, f as gi } from "./bili-favorites-store-DclRPAm4.js";
import { b as ft, k as ye, n as it, a as bt } from "./github.service-BkChs4sP.js";
import "./fullscreen-cards.store-BDo2TeNB.js";
import { u as mi } from "./useCardActivity-B6_3u7ei.js";
import { d as hi, a as yi } from "./playback-sync-DD7Md8Dw.js";
import { B as ot } from "./BiliRichText-B459QASL.js";
import { s as Ae } from "./subtitle-follow-CMrW8CCD.js";
import { i as _i } from "./image-viewer-store-BpWiozJ-.js";
import { a as ve, d as Dt, e as b, c as fe, C as Ot } from "./ChatShareMenu-mUBr85SQ.js";
import { g as ki, s as $i } from "./cache-directory-CBBZXa5n.js";
import { a as Ie } from "./radio-player-CCUSmV1E.js";
import { A as Ci, B as wi, g as xi, O as Si, x as Wt } from "./search.service-gzbpg5BD.js";
import { biliMessagePanelState as Ti, biliMessagePanelController as Mi } from "./message-panel-store-B13S8f2C.js";
import { bilibiliChannelService as pe } from "./bilibili-channel.service-DjZBb2vd.js";
import { u as Di } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-Bk2ztKZ7.js";
import { u as Pi } from "./workspace-wallpaper-CzwIpP3d.js";
import { W as Ii } from "./WorkspaceWallpaperLayer-Qc_1VSdO.js";
function Li(V, p) {
  let m = 0, C = V.length;
  for (; m < C; ) {
    const M = Math.floor((m + C) / 2);
    V[M].time < p ? m = M + 1 : C = M;
  }
  return m;
}
function Ri(V, p, m) {
  const C = [];
  let M = p;
  for (; M < V.length && V[M].time <= m; )
    m - V[M].time <= 1.2 && C.push(V[M]), M++;
  return { items: C, index: M };
}
const Ei = ["onAnimationend"], Bi = ["aria-pressed"], zi = /* @__PURE__ */ Fe({
  __name: "BiliSubscriptionDanmaku",
  props: {
    bvid: {},
    cid: {},
    video: {}
  },
  setup(V) {
    const p = V, m = h(!0), C = h(!0), M = h([]);
    let I = [], L = 0, D = 0, y = 0, w = 0;
    const A = Array(8).fill(0);
    function Z(z = 0) {
      M.value = [], A.fill(0), L = Li(I, Math.max(0, z)), D = z;
    }
    function q() {
      const z = p.video;
      if (!z || !m.value || !I.length) return;
      const j = z.currentTime;
      if (Math.abs(j - D) > 1.5) {
        Z(j);
        return;
      }
      const K = Ri(I, L, j);
      L = K.index;
      const Q = performance.now(), le = Math.max(3, Math.min(8, Math.floor(((z.parentElement?.clientHeight || 240) - 45) / 26)));
      for (const ee of K.items) {
        let se = 0;
        for (let de = 0; de < le; de++) {
          if (A[de] <= Q) {
            se = de;
            break;
          }
          A[de] < A[se] && (se = de);
        }
        A[se] = Q + Math.max(1e3, ee.text.length * 110), M.value.push({ id: `${++w}`, text: ee.text, color: ee.color, top: se * 26 + 8, mode: ee.mode });
      }
      D = j;
    }
    function O() {
      Z(p.video?.currentTime || 0);
    }
    function me() {
      C.value = !1;
    }
    function u() {
      C.value = !0;
    }
    function ie(z) {
      M.value = M.value.filter((j) => j.id !== z);
    }
    function oe() {
      m.value = !m.value, Z(p.video?.currentTime || 0);
    }
    return J(() => [p.bvid, p.cid], async ([z, j], K, Q) => {
      const le = ++y;
      if (Q(() => {
        y++;
      }), I = [], Z(), !!z)
        try {
          const ee = j || (await ft.getVideoView(z))?.cid;
          if (!ee || le !== y) return;
          const se = await ft.getVideoDanmaku(ee);
          if (le !== y) return;
          I = se, Z(p.video?.currentTime || 0);
        } catch (ee) {
          console.warn("[BiliSubscriptionDanmaku] 弹幕读取失败", ee);
        }
    }, { immediate: !0 }), J(() => p.video, (z, j, K) => {
      z && (C.value = z.paused, z.addEventListener("timeupdate", q), z.addEventListener("seeked", O), z.addEventListener("play", me), z.addEventListener("pause", u), z.addEventListener("ended", u), K(() => {
        z.removeEventListener("timeupdate", q), z.removeEventListener("seeked", O), z.removeEventListener("play", me), z.removeEventListener("pause", u), z.removeEventListener("ended", u);
      }));
    }, { immediate: !0 }), Lt(() => {
      y++;
    }), (z, j) => (o(), l(B, null, [
      ue(e("div", {
        class: P(["bili-danmaku-stage", { "is-paused": C.value }]),
        "aria-hidden": "true"
      }, [
        (o(!0), l(B, null, G(M.value, (K) => (o(), l("div", {
          key: K.id,
          class: P(["bili-danmaku-bullet", { "is-top": K.mode === 5, "is-bottom": K.mode === 4 }]),
          style: we({ top: `${K.top}px`, color: K.color, animationDuration: "5.5s" }),
          onAnimationend: (Q) => ie(K.id)
        }, n(K.text), 47, Ei))), 128))
      ], 2), [
        [Kt, m.value]
      ]),
      e("button", {
        class: "bili-sub-danmaku-toggle",
        type: "button",
        "aria-pressed": m.value,
        onClick: $(oe, ["stop"])
      }, " 弹幕 " + n(m.value ? "开" : "关"), 9, Bi)
    ], 64));
  }
});
function Ai(V) {
  return V.filter((p) => Array.isArray(p?.emote) && p.emote.length).map((p) => {
    const m = String(p.text || "B站表情");
    return {
      text: m,
      emote: p.emote.map((C) => ({
        text: String(C?.text || ""),
        url: String(C?.url || "").replace(/^http:/, "https:"),
        textOnly: m.includes("颜文字"),
        failed: !1
      })).filter((C) => C.text)
    };
  }).filter((p) => p.emote.length);
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
}, Gi = ["data-idx", "data-from", "data-to", "title", "onClick"], Oi = { class: "bili-sub-srt-time" }, Wi = { class: "bili-sub-srt-text" }, Yi = {
  key: 1,
  class: "bili-sub-no-transcript-wrap"
}, ji = {
  key: 0,
  class: "bili-sub-description-copy"
}, Ki = {
  key: 2,
  class: "bili-sub-vue-empty-hint"
}, Qi = /* @__PURE__ */ Fe({
  __name: "BiliSubscriptionTranscript",
  setup(V) {
    Lt(() => Ae.reset());
    const p = Y(() => E.organizer), m = Y(() => p.value.subscriptionChapters.length > 0 || p.value.subscriptionCues.length > 0);
    function C(M, I) {
      Le.dispatch(M, I);
    }
    return (M, I) => (o(), l("section", Fi, [
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
          p.value.showFullDescInRightPanel ? (o(), l("section", Ui, [
            e("header", null, [
              I[4] || (I[4] = e("h5", null, "视频简介", -1)),
              e("button", {
                type: "button",
                class: "bili-copy-desc-btn",
                title: "切回台词展示",
                onClick: I[0] || (I[0] = (L) => C("subscription-toggle-desc-panel"))
              }, "缩小简介")
            ]),
            (o(!0), l(B, null, G(p.value.subscriptionDescription, (L, D) => (o(), l("p", { key: D }, [
              _e(ot, { text: L }, null, 8, ["text"])
            ]))), 128)),
            p.value.subscriptionDescription.length ? g("", !0) : (o(), l("p", Ni, "该视频暂无可用的文字简介。"))
          ])) : (o(), l(B, { key: 1 }, [
            p.value.subscriptionCues.length ? (o(), l("div", qi, [
              (o(!0), l(B, null, G(p.value.subscriptionCues, (L) => (o(), l("button", {
                key: `${L.from}:${L.index}`,
                type: "button",
                class: "bili-sub-srt-row",
                "data-idx": L.index,
                "data-from": L.from,
                "data-to": L.to,
                title: `点击跳转至 ${L.timeText}`,
                onClick: (D) => C("subscription-seek", { from: L.from, index: L.index, mode: "lyrics" })
              }, [
                e("span", Oi, n(L.timeText), 1),
                e("span", Wi, n(L.content), 1)
              ], 8, Gi))), 128))
            ])) : (o(), l("div", Yi, [
              e("div", {
                class: P(["bili-sub-no-transcript-box", { compact: p.value.subscriptionDescription.length > 0 }])
              }, [...I[5] || (I[5] = [
                e("div", { class: "bili-sub-no-transcript-icon" }, "🎙️", -1),
                e("h5", null, "暂无实时台词字幕", -1),
                e("p", { class: "muted" }, "当前视频未提供 CC / AI 字幕，可在下方查看简介或直接观看视频与评论。", -1)
              ])], 2),
              p.value.subscriptionDescription.length ? (o(), l("section", ji, [
                I[6] || (I[6] = e("header", null, [
                  e("h5", null, "视频简介")
                ], -1)),
                (o(!0), l(B, null, G(p.value.subscriptionDescription, (L, D) => (o(), l("p", { key: D }, [
                  _e(ot, { text: L }, null, 8, ["text"])
                ]))), 128))
              ])) : g("", !0)
            ]))
          ], 64)),
          !p.value.showFullDescInRightPanel && !m.value && !p.value.subscriptionDescription.length ? (o(), l("p", Ki, "字幕不可用时仍可在左侧播放和查看评论。")) : g("", !0)
        ], 32)
      ])
    ]));
  }
}), Hi = /* @__PURE__ */ Qe(Qi, [["__scopeId", "data-v-7f189afb"]]), Xi = {
  key: 0,
  class: "bili-sub-layout bili-sub-vue-layout"
}, Ji = { class: "bili-sub-player-column" }, Zi = { class: "bili-sub-sticky-player" }, eo = { class: "bili-sub-player-card" }, to = { class: "bili-sub-video-box" }, io = ["poster", "hidden"], oo = ["src"], lo = {
  key: 2,
  class: "bili-sub-video-loading"
}, so = { class: "bili-sub-video-meta" }, no = { class: "bili-sub-video-meta-actions" }, ao = ["title"], ro = { class: "bili-sub-meta-stats" }, uo = { class: "bili-sub-meta-desc" }, co = { class: "bili-sub-comments-column" }, vo = {
  class: "bili-sub-comments-section bili-sub-comments-panel",
  id: "bili-sub-comments-section"
}, po = { class: "bili-mini-comments-head" }, bo = { class: "bili-mini-comments-meta" }, fo = { class: "bili-mini-comments-count bili-sub-comments-count" }, go = { class: "bili-sub-comments-head-right" }, mo = { class: "bili-mini-comments-sort" }, ho = { class: "bili-sub-comment-composer" }, yo = ["disabled"], _o = {
  key: 0,
  class: "bili-sub-emote-picker"
}, ko = {
  key: 0,
  class: "fo-bili-loading"
}, $o = { key: 1 }, Co = ["title", "onClick"], wo = ["src", "alt", "onError"], xo = { key: 1 }, So = { class: "bili-mini-comments-body bili-sub-comments-body" }, To = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, Mo = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, Do = ["src"], Po = { class: "bili-comment-main" }, Io = { class: "bili-comment-user-row" }, Lo = { class: "bili-comment-uname" }, Ro = {
  key: 0,
  class: "bili-comment-level"
}, Eo = { class: "bili-comment-time" }, Bo = { class: "bili-comment-text" }, zo = {
  key: 0,
  class: "bili-comment-pictures"
}, Ao = ["href", "onClick"], Fo = ["src"], Vo = { class: "bili-comment-actions" }, Uo = { key: 0 }, No = { key: 1 }, qo = {
  key: 1,
  class: "bili-comment-sub-list"
}, Go = { class: "bili-comment-sub-uname" }, Oo = { class: "bili-comment-sub-more" }, Wo = ["disabled", "onClick"], Yo = ["disabled", "onClick"], jo = ["onClick"], Ko = { class: "bili-sub-comments-infinite-trigger" }, Qo = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0" }
}, Ho = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0", opacity: "0.6" }
}, Xo = {
  key: 1,
  class: "fo-bili-empty"
}, Jo = /* @__PURE__ */ Fe({
  __name: "BiliSubscriptionPlayer",
  setup(V) {
    const p = Y(() => E.organizer.subscriptionCurrent), m = h(null), C = h(!1), M = h(!1), I = h(""), L = h(null), D = h(""), y = h(1), w = h(1), A = h([]), Z = h("0 条"), q = h(!1), O = h(!1), me = h(""), u = h(!1), ie = h(""), oe = h(null), z = h(!1), j = h(""), K = h(!1), Q = h(!1), le = h(!1), ee = h([]);
    let se = null, de = null;
    function U(x, f = !1) {
      j.value = x, K.value = f, se && clearTimeout(se), se = setTimeout(() => {
        j.value = "";
      }, 3500);
    }
    function H() {
      Le.dispatch("subscription-open-player");
    }
    function He() {
      Le.dispatch("subscription-toggle-desc-panel");
    }
    function Xe() {
      Le.dispatch(
        E.organizer.showFullDescInRightPanel ? "subscription-copy-description" : "subscription-copy-script"
      );
    }
    function ce() {
      Le.dispatch("organizer-open");
    }
    function Je(x) {
      const f = x.currentTarget;
      f && f.scrollHeight - f.scrollTop - f.clientHeight < 180 && !O.value && u.value && Se();
    }
    function Ze(x, f) {
      const v = x[f];
      v && _i.open(v, p.value?.title ? `${p.value.title} · 评论图片` : "评论图片");
    }
    function _(x, f) {
      if (!x) return [];
      if (!f || f.size === 0)
        return [{ type: "text", text: x }];
      const v = /\[([^\]]+)\]/g, k = [];
      let F = 0, W;
      for (; (W = v.exec(x)) !== null; ) {
        W.index > F && k.push({ type: "text", text: x.slice(F, W.index) });
        const te = W[0], Be = f.get(te);
        Be ? k.push({ type: "emote", text: te, url: Be }) : k.push({ type: "text", text: te }), F = v.lastIndex;
      }
      return F < x.length && k.push({ type: "text", text: x.slice(F) }), k;
    }
    function c(x) {
      if (!x) return "";
      const f = new Date(x * 1e3), v = /* @__PURE__ */ new Date(), k = Math.floor((v.getTime() - f.getTime()) / 1e3);
      if (k < 60) return "刚刚";
      if (k < 3600) return `${Math.floor(k / 60)} 分钟前`;
      if (k < 86400) return `${Math.floor(k / 3600)} 小时前`;
      const F = f.getFullYear(), W = String(f.getMonth() + 1).padStart(2, "0"), te = String(f.getDate()).padStart(2, "0");
      return F === v.getFullYear() ? `${W}-${te}` : `${F}-${W}-${te}`;
    }
    function a(x) {
      return x ? x >= 1e4 ? (x / 1e4).toFixed(1).replace(/\.0$/, "") + "万" : String(x) : "0";
    }
    async function T(x = !1) {
      if (D.value) {
        x ? O.value = !0 : (q.value = !0, me.value = "");
        try {
          const f = `https://api.bilibili.com/x/v2/reply?type=1&oid=${D.value}&pn=${w.value}&ps=20&sort=${y.value}`, k = await (await fetch(f, { credentials: "include" })).json();
          if (k?.code !== 0 || !k?.data) {
            x || (me.value = k?.message || "评论加载失败或该视频已关闭评论", A.value = []), u.value = !1;
            return;
          }
          const F = k.data, W = F.page?.count || 0;
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
          x ? A.value = [...A.value, ...Be] : A.value = Be, u.value = A.value.length < W;
        } catch (f) {
          x || (me.value = f?.message || "网络异常，未能加载评论");
        } finally {
          q.value = !1, O.value = !1;
        }
      }
    }
    async function X(x) {
      const f = A.value.find((v) => String(v.id) === String(x));
      if (!(!f || f.subRepliesLoading || !D.value)) {
        f.subRepliesPage ? f.subRepliesPage++ : f.subRepliesPage = 1, f.subRepliesLoading = !0, f.subRepliesExpanded = !0;
        try {
          const v = await ft.getSubReplies(D.value, x, f.subRepliesPage, 10), k = (v.replies || []).map((te) => ({
            id: String(te.rpid),
            userName: te.uname,
            message: te.message
          })), F = new Set((f.replies || []).map((te) => String(te.id))), W = k.filter((te) => !F.has(String(te.id)));
          f.replies = [...f.replies || [], ...W], f.subRepliesHasMore = v.hasMore;
        } catch {
          U("子回复加载失败", !0);
        } finally {
          f.subRepliesLoading = !1;
        }
      }
    }
    function ae(x) {
      const f = A.value.find((v) => String(v.id) === String(x));
      f && (f.subRepliesExpanded = !1);
    }
    function be(x) {
      y.value !== x && (y.value = x, w.value = 1, T(!1));
    }
    function Se() {
      O.value || !u.value || (w.value += 1, T(!0));
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
    function Ue(x) {
      const f = oe.value;
      if (!f)
        ie.value += x;
      else {
        const v = f.selectionStart ?? f.value.length, k = f.selectionEnd ?? v;
        ie.value = ie.value.slice(0, v) + x + ie.value.slice(k), It(() => {
          f.focus();
          const F = v + x.length;
          f.setSelectionRange(F, F);
        });
      }
      Q.value = !1;
    }
    async function Ne() {
      const x = ie.value.trim();
      if (!x) {
        U("请输入评论内容", !0);
        return;
      }
      if (!D.value) {
        U("未能识别视频 ID，无法发表评论", !0);
        return;
      }
      const f = window.getBiliJct;
      let v = "";
      if (typeof f == "function")
        v = await f();
      else
        try {
          v = (await window.chrome?.cookies?.get?.({ url: "https://api.bilibili.com", name: "bili_jct" }))?.value || "";
        } catch {
          v = "";
        }
      if (!v) {
        U("未检测到 B站 登录态，请先登录 bilibili.com", !0);
        return;
      }
      z.value = !0;
      try {
        const k = new URLSearchParams({
          oid: String(D.value),
          type: "1",
          message: x,
          plat: "1",
          csrf: v,
          csrf_token: v
        }), W = await (await fetch("https://api.bilibili.com/x/v2/reply/add", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: k.toString()
        })).json();
        W?.code === 0 ? (ie.value = "", U("✓ 评论发表成功！", !1), w.value = 1, T(!1)) : U(`❌ 发送失败：${W?.message || W?.code}`, !0);
      } catch (k) {
        U(`❌ 发送出错：${k?.message || "网络异常"}`, !0);
      } finally {
        z.value = !1;
      }
    }
    async function Re(x) {
      if (!x?.bvid) return;
      if (typeof document < "u" && (document.querySelectorAll("video, audio").forEach((v) => {
        if (v !== m.value && !v.paused)
          try {
            v.pause();
          } catch {
          }
      }), document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((v) => {
        try {
          v.pause();
        } catch {
        }
      })), m.value && !m.value.paused)
        try {
          m.value.pause();
        } catch {
        }
      C.value = !0, M.value = !1, I.value = "", L.value = null, Ee = null;
      let f = x.aid;
      if (!f)
        try {
          const k = await (await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${x.bvid}`, { credentials: "include" })).json();
          k?.data?.aid && (f = k.data.aid);
        } catch {
        }
      if (p.value?.bvid === x.bvid) {
        D.value = f || "", w.value = 1, T(!1);
        try {
          const v = await ft.resolvePlayStream(x);
          if (p.value?.bvid !== x.bvid) return;
          if (v?.sources?.length) {
            L.value = v.cid, m.value && (typeof document < "u" && document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((k) => {
              try {
                k.pause();
              } catch {
              }
            }), m.value.src = v.sources[0], m.value.play().catch(() => {
            }), yi({ bvid: x.bvid, title: x.title, cover: x.cover }, m.value)), C.value = !1;
            return;
          }
        } catch (v) {
          console.warn("[BiliSubscriptionPlayer] 本地视频流解析失败，使用 iframe 备用:", v);
        }
        p.value?.bvid === x.bvid && (M.value = !0, I.value = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(x.bvid)}&autoplay=1&danmaku=1`, C.value = !1);
      }
    }
    let Ee = null;
    function qe() {
      if (!m.value) return;
      const x = m.value.currentTime, f = document.querySelectorAll(".bili-sub-srt-row");
      let v = !1, k = null;
      for (let F = f.length - 1; F >= 0; F--) {
        const W = f[F], te = Number(W.getAttribute("data-from") || 0);
        !v && x >= te ? (W.classList.add("active"), v = !0, k = W) : W.classList.remove("active");
      }
      k && k !== Ee && (Ee = k, Ae.follow());
    }
    function gt() {
      qe();
    }
    function mt() {
      qe();
    }
    return J(
      () => p.value?.bvid,
      () => {
        p.value && Re(p.value);
      },
      { immediate: !0 }
    ), Rt(() => {
      de = Le.onAction((x, f) => {
        if (x === "subscription-seek") {
          const v = Number(f?.from);
          m.value && Number.isFinite(v) && (m.value.currentTime = Math.max(0, v - 0.1), m.value.play().catch(() => {
          }));
        }
      });
    }), Lt(() => {
      if (m.value) {
        hi(m.value);
        try {
          m.value.pause(), m.value.src = "", m.value.load();
        } catch {
        }
      }
      de && de(), se && clearTimeout(se);
    }), (x, f) => p.value ? (o(), l("div", Xi, [
      e("aside", Ji, [
        e("div", Zi, [
          e("div", eo, [
            e("div", {
              class: "bili-sub-vue-comment-handoff",
              hidden: "",
              style: { display: "none !important" }
            }, [
              f[4] || (f[4] = e("strong", null, "播放器与评论区已统一到 Vue 本地影院", -1)),
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
                poster: p.value.cover,
                hidden: M.value,
                onTimeupdate: qe,
                onSeeked: gt,
                onPlay: mt
              }, null, 40, io),
              !M.value && !C.value ? (o(), Pt(zi, {
                key: 0,
                bvid: p.value.bvid,
                cid: L.value,
                video: m.value
              }, null, 8, ["bvid", "cid", "video"])) : g("", !0),
              M.value ? (o(), l("iframe", {
                key: 1,
                class: "bili-sub-native-iframe",
                allowfullscreen: "true",
                allow: "autoplay; fullscreen",
                src: I.value
              }, null, 8, oo)) : g("", !0),
              C.value ? (o(), l("div", lo, [...f[5] || (f[5] = [
                e("i", null, null, -1),
                e("span", null, "正在解析登录高清视频流…", -1)
              ])])) : g("", !0)
            ]),
            e("div", so, [
              e("div", no, [
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  onClick: Xe
                }, n(r(E).organizer.showFullDescInRightPanel ? "复制简介" : "复制稿子"), 1),
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: r(E).organizer.showFullDescInRightPanel ? "切回台词展示" : "展开完整视频简介",
                  onClick: He
                }, n(r(E).organizer.showFullDescInRightPanel ? "缩小简介" : "放大简介"), 9, ao)
              ]),
              e("h4", null, n(p.value.title), 1),
              e("div", ro, [
                e("span", null, "▣ 播放: " + n(p.value.playCount), 1),
                e("span", null, "💬 弹幕: " + n(p.value.danmakuCount), 1),
                e("span", null, "⏱ " + n(p.value.duration), 1)
              ]),
              e("p", uo, [
                _e(ot, {
                  text: p.value.description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ]),
            _e(Hi, { class: "bili-sub-inline-transcript" })
          ])
        ])
      ]),
      e("section", co, [
        e("div", vo, [
          e("div", po, [
            e("div", bo, [
              f[6] || (f[6] = e("span", null, "💬 评论", -1)),
              e("span", fo, n(Z.value), 1)
            ]),
            e("div", go, [
              e("div", mo, [
                e("button", {
                  type: "button",
                  class: P(["bili-mini-sort-btn", { active: y.value === 1 }]),
                  onClick: f[0] || (f[0] = (v) => be(1))
                }, "按热度", 2),
                e("button", {
                  type: "button",
                  class: P(["bili-mini-sort-btn", { active: y.value === 0 }]),
                  onClick: f[1] || (f[1] = (v) => be(0))
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
              "onUpdate:modelValue": f[2] || (f[2] = (v) => ie.value = v),
              type: "text",
              class: "bili-sub-comment-input",
              placeholder: "发一条友善的评论吧…（Enter 发送）",
              maxlength: "500",
              onKeydown: f[3] || (f[3] = (v) => r(Et)(v, Ne))
            }, null, 544), [
              [xe, ie.value]
            ]),
            e("button", {
              type: "button",
              class: "bili-sub-comment-send-btn",
              disabled: z.value || !ie.value.trim(),
              onClick: Ne
            }, n(z.value ? "发送中…" : "发送"), 9, yo)
          ]),
          Q.value ? (o(), l("div", _o, [
            le.value ? (o(), l("div", ko, [...f[7] || (f[7] = [
              e("i", null, null, -1),
              e("span", null, "正在读取 B站 表情包…", -1)
            ])])) : (o(), l("div", $o, [
              (o(!0), l(B, null, G(ee.value, (v) => (o(), l("section", {
                key: v.text,
                class: "bili-sub-emote-group"
              }, [
                e("h5", null, n(v.text || "B站表情"), 1),
                e("div", {
                  class: P({ "bili-sub-text-emotes": v.text.includes("颜文字") })
                }, [
                  (o(!0), l(B, null, G(v.emote, (k) => (o(), l("button", {
                    key: k.text,
                    type: "button",
                    class: "bili-sub-emote-item",
                    title: k.text,
                    onClick: (F) => Ue(k.text)
                  }, [
                    k.url && !k.textOnly && !k.failed ? (o(), l("img", {
                      key: 0,
                      src: k.url,
                      alt: k.text,
                      referrerpolicy: "no-referrer",
                      onError: (F) => k.failed = !0
                    }, null, 40, wo)) : (o(), l("span", xo, n(k.text), 1))
                  ], 8, Co))), 128))
                ], 2)
              ]))), 128))
            ]))
          ])) : g("", !0),
          j.value ? (o(), l("div", {
            key: 1,
            class: P(["bili-sub-comment-tip", { error: K.value }])
          }, n(j.value), 3)) : g("", !0),
          e("div", {
            class: "bili-sub-scroll-stage bili-sub-comments-scroll",
            onScrollPassive: Je
          }, [
            e("div", So, [
              q.value && !A.value.length ? (o(), l("p", To, "正在加载评论…")) : me.value && !A.value.length ? (o(), l("p", Mo, n(me.value), 1)) : g("", !0),
              (o(!0), l(B, null, G(A.value, (v) => (o(), l("div", {
                key: v.id,
                class: "bili-comment-item"
              }, [
                e("img", {
                  class: "bili-comment-avatar",
                  src: v.avatar,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, Do),
                e("div", Po, [
                  e("div", Io, [
                    e("span", Lo, n(v.userName), 1),
                    v.level ? (o(), l("span", Ro, "LV" + n(v.level), 1)) : g("", !0),
                    e("span", Eo, n(v.timeStr), 1)
                  ]),
                  e("div", Bo, [
                    _e(ot, {
                      text: v.message
                    }, null, 8, ["text"])
                  ]),
                  v.pictures?.length ? (o(), l("div", zo, [
                    (o(!0), l(B, null, G(v.pictures, (k, F) => (o(), l("a", {
                      key: F,
                      class: "bili-comment-pic-link",
                      href: k,
                      onClick: $((W) => Ze(v.pictures, F), ["stop", "prevent"])
                    }, [
                      e("img", {
                        class: "bili-comment-pic",
                        src: k,
                        alt: "评论图片",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Fo)
                    ], 8, Ao))), 128))
                  ])) : g("", !0),
                  e("div", Vo, [
                    v.likeCount ? (o(), l("span", Uo, "👍 " + n(v.likeCount), 1)) : g("", !0),
                    v.replyCount ? (o(), l("span", No, "💬 " + n(v.replyCount), 1)) : g("", !0)
                  ]),
                  v.replies?.length ? (o(), l("div", qo, [
                    (o(!0), l(B, null, G(v.replies, (k) => (o(), l("div", {
                      key: k.id,
                      class: "bili-comment-sub-item"
                    }, [
                      e("span", Go, n(k.userName) + ":", 1),
                      _e(ot, {
                        text: k.message
                      }, null, 8, ["text"])
                    ]))), 128)),
                    e("div", Oo, [
                      !v.subRepliesExpanded && (v.replyCount || 0) > v.replies.length ? (o(), l(B, { key: 0 }, [
                        e("span", null, "共 " + n(v.replyCount) + " 条回复，", 1),
                        e("button", {
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: v.subRepliesLoading,
                          onClick: $((k) => X(v.id), ["stop"])
                        }, n(v.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, Wo)
                      ], 64)) : v.subRepliesExpanded ? (o(), l(B, { key: 1 }, [
                        v.subRepliesHasMore ? (o(), l("button", {
                          key: 0,
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: v.subRepliesLoading,
                          onClick: $((k) => X(v.id), ["stop"])
                        }, n(v.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, Yo)) : g("", !0),
                        e("button", {
                          type: "button",
                          class: "bili-comment-sub-collapse-btn",
                          onClick: $((k) => ae(v.id), ["stop"])
                        }, " 收起 ▴ ", 8, jo)
                      ], 64)) : g("", !0)
                    ])
                  ])) : g("", !0)
                ])
              ]))), 128))
            ]),
            e("div", Ko, [
              O.value ? (o(), l("p", Qo, "正在加载更多评论…")) : !u.value && A.value.length ? (o(), l("p", Ho, "已显示全部评论")) : g("", !0)
            ])
          ], 32)
        ])
      ])
    ])) : (o(), l("p", Xo, "暂无可播放的视频。"));
  }
}), Zo = /* @__PURE__ */ Qe(Jo, [["__scopeId", "data-v-a5af7ad1"]]), el = ["disabled"], tl = ["disabled"], il = { key: 0 }, ol = ["disabled"], ll = ["disabled"], sl = ["disabled"], nl = ["disabled"], al = { class: "bili-sub-add-shell" }, rl = ["disabled"], ul = { class: "bili-sub-add-toolbar" }, dl = { class: "bili-sub-add-groups" }, cl = ["onClick"], vl = { class: "bili-sub-add-list" }, pl = {
  key: 0,
  class: "fo-bili-loading"
}, bl = {
  key: 1,
  class: "fo-bili-empty"
}, fl = {
  key: 2,
  class: "fo-bili-empty"
}, gl = ["disabled", "onClick"], ml = ["src"], hl = {
  key: 1,
  class: "bili-sub-add-avatar"
}, yl = {
  class: "fo-custom-confirm-modal",
  role: "dialog",
  "aria-modal": "true"
}, _l = { class: "fo-custom-confirm-head" }, kl = { class: "fo-custom-confirm-body" }, $l = { class: "fo-custom-confirm-actions" }, Cl = ["disabled"], wl = ["disabled"], xl = /* @__PURE__ */ Fe({
  __name: "BiliOrganizerDialogs",
  setup(V) {
    const p = Y(() => Dt.create), m = Y(() => Dt.confirm), C = Y(() => Dt.channelPicker), M = Y(() => p.value.kind === "bili"), I = Y(() => {
      const D = C.value, y = D.query.trim().toLowerCase(), w = D.groups.find((Z) => Z.id === D.activeGroupId), A = w ? new Set(w.mids) : null;
      return D.items.filter((Z) => (!A || A.has(Z.mid)) && (!y || Z.name.toLowerCase().includes(y) || Z.mid.includes(y)));
    });
    function L() {
      const D = p.value.name.trim();
      if (!D) {
        ve.updateCreate({ status: "请输入名称", error: !0 });
        return;
      }
      ve.submitCreate({ name: D, privacy: p.value.privacy });
    }
    return (D, y) => (o(), l(B, null, [
      p.value.open ? (o(), l("dialog", {
        key: 0,
        class: "fo-create-dialog",
        open: "",
        onClick: y[5] || (y[5] = $((w) => r(ve).closeCreate(), ["self"])),
        onCancel: y[6] || (y[6] = $((w) => r(ve).closeCreate(), ["prevent"]))
      }, [
        e("form", {
          onSubmit: $(L, ["prevent"])
        }, [
          e("header", null, [
            e("div", null, [
              y[14] || (y[14] = e("i", { class: "fo-folder-icon" }, null, -1)),
              e("span", null, [
                e("b", null, n(M.value ? "新建 B站收藏夹" : "新建插件分组"), 1),
                e("small", null, n(M.value ? "会同步创建到你的 B站账号" : "只整理左侧收藏夹，不修改 B站数据"), 1)
              ])
            ]),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: p.value.submitting,
              onClick: y[0] || (y[0] = (w) => r(ve).closeCreate())
            }, "×", 8, el)
          ]),
          e("label", null, [
            e("span", null, n(M.value ? "收藏夹名称" : "分组名称"), 1),
            ue(e("input", {
              "onUpdate:modelValue": y[1] || (y[1] = (w) => p.value.name = w),
              maxlength: "48",
              autocomplete: "off",
              placeholder: "输入名称",
              required: "",
              disabled: p.value.submitting,
              autofocus: ""
            }, null, 8, tl), [
              [xe, p.value.name]
            ])
          ]),
          M.value ? (o(), l("fieldset", il, [
            y[17] || (y[17] = e("legend", null, "可见范围", -1)),
            e("label", null, [
              ue(e("input", {
                "onUpdate:modelValue": y[2] || (y[2] = (w) => p.value.privacy = w),
                type: "radio",
                value: 0,
                disabled: p.value.submitting
              }, null, 8, ol), [
                [
                  Gt,
                  p.value.privacy,
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
                "onUpdate:modelValue": y[3] || (y[3] = (w) => p.value.privacy = w),
                type: "radio",
                value: 1,
                disabled: p.value.submitting
              }, null, 8, ll), [
                [
                  Gt,
                  p.value.privacy,
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
            class: P(["fo-create-status", { error: p.value.error }]),
            role: "status"
          }, n(p.value.status), 3),
          e("footer", null, [
            e("button", {
              type: "button",
              disabled: p.value.submitting,
              onClick: y[4] || (y[4] = (w) => r(ve).closeCreate())
            }, "取消", 8, sl),
            e("button", {
              class: "primary",
              type: "submit",
              disabled: p.value.submitting
            }, n(p.value.submitting ? "创建中…" : M.value ? "创建收藏夹" : "创建分组"), 9, nl)
          ])
        ], 32)
      ], 32)) : g("", !0),
      C.value.open ? (o(), l("dialog", {
        key: 1,
        class: "bili-sub-add-dialog",
        open: "",
        onCancel: y[10] || (y[10] = $((w) => r(ve).closeChannelPicker(), ["prevent"]))
      }, [
        e("div", al, [
          e("header", null, [
            y[18] || (y[18] = e("div", null, [
              e("b", null, "从我的关注中添加 UP 主"),
              e("small", null, "沿用“正在关注”的本地分组，只能添加已关注的 UP 主")
            ], -1)),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: !!C.value.submittingMid,
              onClick: y[7] || (y[7] = (w) => r(ve).closeChannelPicker())
            }, "×", 8, rl)
          ]),
          e("div", ul, [
            e("div", dl, [
              e("button", {
                type: "button",
                class: P(["bili-sub-add-group", { on: C.value.activeGroupId === "__all__" }]),
                onClick: y[8] || (y[8] = (w) => r(ve).updateChannelPicker({ activeGroupId: "__all__" }))
              }, "全部关注", 2),
              (o(!0), l(B, null, G(C.value.groups, (w) => (o(), l("button", {
                key: w.id,
                type: "button",
                class: P(["bili-sub-add-group", { on: C.value.activeGroupId === w.id }]),
                onClick: (A) => r(ve).updateChannelPicker({ activeGroupId: w.id })
              }, n(w.name), 11, cl))), 128))
            ]),
            ue(e("input", {
              "onUpdate:modelValue": y[9] || (y[9] = (w) => C.value.query = w),
              type: "search",
              placeholder: "搜索关注的 UP 主"
            }, null, 512), [
              [xe, C.value.query]
            ])
          ]),
          e("div", vl, [
            C.value.loading ? (o(), l("div", pl, [...y[19] || (y[19] = [
              e("i", null, null, -1),
              e("span", null, "正在读取关注分组…", -1)
            ])])) : C.value.error ? (o(), l("p", bl, n(C.value.error), 1)) : I.value.length ? (o(!0), l(B, { key: 3 }, G(I.value, (w) => (o(), l("button", {
              key: w.mid,
              type: "button",
              class: "bili-sub-add-up",
              disabled: w.added || !!C.value.submittingMid,
              onClick: (A) => r(ve).selectChannel(w.mid)
            }, [
              w.face ? (o(), l("img", {
                key: 0,
                src: w.face,
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, ml)) : (o(), l("span", hl, "UP")),
              e("span", null, [
                e("b", null, n(w.name), 1),
                e("small", null, "UID " + n(w.mid), 1)
              ]),
              e("i", null, n(w.added ? "已添加" : C.value.submittingMid === w.mid ? "添加中…" : "＋ 添加"), 1)
            ], 8, gl))), 128)) : (o(), l("p", fl, "该分组中没有匹配的已关注 UP 主。"))
          ])
        ])
      ], 32)) : g("", !0),
      m.value.open ? (o(), l("div", {
        key: 2,
        class: "fo-custom-confirm-overlay",
        onClick: y[13] || (y[13] = $((w) => r(ve).closeConfirm(), ["self"]))
      }, [
        e("div", yl, [
          e("div", _l, [
            e("h4", null, n(m.value.title), 1)
          ]),
          e("div", kl, [
            e("p", null, n(m.value.message), 1)
          ]),
          e("div", $l, [
            e("button", {
              type: "button",
              class: "fo-confirm-btn cancel",
              disabled: m.value.submitting,
              onClick: y[11] || (y[11] = (w) => r(ve).closeConfirm())
            }, n(m.value.cancelText), 9, Cl),
            e("button", {
              type: "button",
              class: P(["fo-confirm-btn confirm", { danger: m.value.danger }]),
              disabled: m.value.submitting,
              onClick: y[12] || (y[12] = (w) => r(ve).submitConfirm())
            }, n(m.value.submitting ? "处理中…" : m.value.confirmText), 11, wl)
          ])
        ])
      ])) : g("", !0)
    ], 64));
  }
}), Sl = ["aria-busy"], Tl = { class: "field full-width" }, Ml = { class: "cache-directory-name" }, Dl = { class: "cache-directory-actions" }, Pl = ["disabled"], Il = ["disabled"], Ll = /* @__PURE__ */ Fe({
  __name: "BiliSettingsPanel",
  props: {
    active: { type: Boolean }
  },
  setup(V) {
    const p = V, m = h(!1), C = h(!1), M = h(""), I = h(!1), L = h(null), D = h("尚未选择缓存目录");
    let y = !0, w = 0;
    async function A() {
      if (!p.active || m.value) return;
      const q = ++w;
      C.value = !0;
      try {
        const O = await ki();
        if (!y || q !== w) return;
        L.value = O, D.value = O?.name || "尚未选择缓存目录";
      } catch {
        y && q === w && (L.value = null, D.value = "缓存目录读取失败，请重试");
      } finally {
        y && q === w && (C.value = !1);
      }
    }
    async function Z() {
      if (m.value || !p.active) return;
      const q = window.showDirectoryPicker;
      if (typeof q != "function") {
        M.value = "当前浏览器不支持目录选择，请使用支持此功能的 Edge 或 Chrome。", I.value = !0;
        return;
      }
      ++w, C.value = !1, m.value = !0, M.value = "";
      try {
        const O = await q.call(window, {
          id: "logicweaver-bili-cache",
          mode: "readwrite",
          startIn: L.value || "videos"
        });
        if (await $i(O), !y) return;
        L.value = O, D.value = O.name, I.value = !1, M.value = "目录已保存，新缓存将存入这里；已有视频不会移动或删除。";
      } catch (O) {
        y && O?.name !== "AbortError" && (I.value = !0, M.value = "目录选择或保存未确认，请重读目录核对后再试。");
      } finally {
        y && (m.value = !1);
      }
    }
    return J(() => p.active, (q) => {
      q ? A() : ++w;
    }, { immediate: !0 }), Rt(() => window.addEventListener("focus", A)), Qt(() => {
      y = !1, ++w, window.removeEventListener("focus", A);
    }), (q, O) => (o(), l("div", {
      class: "settings-subgroup bili-cache-settings",
      "aria-busy": m.value || C.value
    }, [
      e("div", Tl, [
        e("p", Ml, n(C.value ? "正在读取缓存目录…" : D.value), 1),
        e("div", Dl, [
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !p.active || m.value || C.value,
            onClick: Z
          }, n(m.value ? "正在保存…" : "选择或重新授权目录"), 9, Pl),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !p.active || m.value || C.value,
            onClick: A
          }, "重读目录", 8, Il)
        ]),
        O[0] || (O[0] = e("p", { class: "hint" }, "仅更改之后的缓存位置；新缓存保留原目录关联，旧版记录需选择其实际所在目录后播放。不会自动扫描或搬移已有文件。", -1)),
        M.value ? (o(), l("p", {
          key: 0,
          class: P(["hint cache-directory-message", { "is-error": I.value }]),
          role: "status"
        }, n(M.value), 3)) : g("", !0)
      ])
    ], 8, Sl));
  }
}), Rl = /* @__PURE__ */ Qe(Ll, [["__scopeId", "data-v-ccf6929a"]]), El = {
  class: "bili-cache-settings-view",
  "aria-labelledby": "bili-cache-settings-title"
}, Bl = { class: "cache-settings-header" }, zl = { class: "cache-settings-card" }, Al = /* @__PURE__ */ Fe({
  __name: "BiliCacheSettingsView",
  props: {
    active: { type: Boolean }
  },
  emits: ["back"],
  setup(V, { emit: p }) {
    const m = p;
    return (C, M) => (o(), l("section", El, [
      e("header", Bl, [
        M[1] || (M[1] = e("div", null, [
          e("h3", { id: "bili-cache-settings-title" }, "缓存设置"),
          e("p", null, "管理 B站视频的本地缓存目录")
        ], -1)),
        e("button", {
          type: "button",
          class: "cache-settings-back",
          onClick: M[0] || (M[0] = (I) => m("back"))
        }, "返回缓存视频")
      ]),
      e("div", zl, [
        M[2] || (M[2] = e("h4", null, "视频缓存目录", -1)),
        M[3] || (M[3] = e("p", { class: "cache-settings-note" }, "选择后立即保存，无需到全局设置中操作。浏览器只提供文件夹名称，不显示完整磁盘路径。", -1)),
        _e(Rl, { active: V.active }, null, 8, ["active"])
      ])
    ]));
  }
}), Fl = /* @__PURE__ */ Qe(Al, [["__scopeId", "data-v-43d869dd"]]), Vl = { class: "fo-upg-shell" }, Ul = { class: "fo-upg-body" }, Nl = { class: "fo-upg-sidebar" }, ql = { class: "fo-upg-sidebar-head" }, Gl = { class: "fo-upg-group-items" }, Ol = ["onDragstart", "onDrop", "onClick"], Wl = {
  key: 0,
  class: "fo-upg-tree-branch"
}, Yl = {
  key: 1,
  class: "fo-folder-icon"
}, jl = { class: "fo-upg-group-name" }, Kl = { class: "fo-upg-vue-group-actions" }, Ql = ["onClick"], Hl = ["onClick"], Xl = ["onClick"], Jl = ["placeholder"], Zl = {
  key: 1,
  class: "muted small"
}, es = { class: "fo-upg-main" }, ts = { class: "fo-upg-main-head" }, is = { class: "fo-upg-main-title" }, os = { key: 0 }, ls = { class: "fo-upg-head-actions" }, ss = { class: "fo-upg-filter-tabs" }, ns = { class: "fo-upg-batch-wrap" }, as = { class: "fo-upg-batch-count" }, rs = ["disabled"], us = ["disabled"], ds = { class: "fo-upg-toolbar" }, cs = { class: "fo-upg-search" }, vs = ["disabled"], ps = {
  key: 0,
  class: "fo-bili-loading"
}, bs = {
  key: 1,
  class: "fo-bili-empty"
}, fs = {
  key: 2,
  class: "fo-bili-empty"
}, gs = {
  key: 3,
  class: "fo-bili-empty"
}, ms = ["title", "onContextmenu", "onClick"], hs = ["src"], ys = { class: "fo-upg-info" }, _s = { class: "fo-upg-name" }, ks = { class: "fo-upg-sign" }, $s = ["disabled", "onClick"], Cs = {
  key: 1,
  class: "fo-upg-move-wrap"
}, ws = ["disabled"], xs = { class: "fo-upg-move-dropdown" }, Ss = ["disabled", "onClick"], Ts = { key: 0 }, Ms = {
  key: 0,
  class: "muted small",
  style: { padding: "6px 10px" }
}, Ds = ["disabled", "onClick"], Ps = { class: "fo-upg-pagination" }, Is = { class: "fo-upg-page-info" }, Ls = {
  key: 0,
  class: "fo-upg-page-btns"
}, Rs = ["disabled"], Es = ["disabled"], Bs = { class: "fo-upg-page-cur" }, zs = ["disabled"], As = ["disabled"], Fs = /* @__PURE__ */ Fe({
  __name: "BiliUpGroupManager",
  setup(V) {
    const p = h(void 0), m = h(""), C = h(""), M = h(""), I = h(""), L = h(!1), D = h(/* @__PURE__ */ new Set()), y = h(null);
    function w(_) {
      if (_.button !== 0 || _.target.closest("button,input")) return;
      const c = y.value;
      if (!c) return;
      const a = c.getBoundingClientRect(), T = a.left, X = a.top, ae = _.clientX, be = _.clientY;
      c.style.position = "fixed", c.style.left = `${T}px`, c.style.top = `${X}px`, c.style.right = "auto", c.style.bottom = "auto", c.style.margin = "0", c.style.transform = "none";
      const Se = (Ue) => {
        const Ne = Ue.clientX - ae, Re = Ue.clientY - be, Ee = Math.max(8, Math.min(window.innerWidth - 120, T + Ne)), qe = Math.max(8, Math.min(window.innerHeight - 80, X + Re));
        c.style.left = `${Ee}px`, c.style.top = `${qe}px`;
      }, Ve = () => {
        window.removeEventListener("pointermove", Se), window.removeEventListener("pointerup", Ve);
      };
      window.addEventListener("pointermove", Se), window.addEventListener("pointerup", Ve);
    }
    const A = Y(() => b.groups.find((_) => _.id === b.activeGroupId) || null), Z = Y(() => {
      const _ = b.query.trim().toLowerCase(), c = b.activeGroupId;
      return b.followings.filter((a) => {
        if (_ && !a.name.toLowerCase().includes(_) && !a.sign.toLowerCase().includes(_) && !a.mid.includes(_)) return !1;
        const T = a.groupIds.includes(c);
        return b.filter === "ingroup" ? T : b.onlyUngrouped ? !a.groupIds || a.groupIds.length === 0 : !0;
      });
    }), q = Y(() => Math.max(1, Math.ceil(Z.value.length / b.pageSize))), O = Y(() => {
      const c = (Math.min(b.page, q.value) - 1) * b.pageSize;
      return Z.value.slice(c, c + b.pageSize);
    }), me = Y(() => b.followings.filter((_) => _.groupIds.length === 0).length), u = h(null), ie = /* @__PURE__ */ new Map();
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
      const a = `${_}_${b.filter}_${b.onlyUngrouped}`, T = ie.get(a);
      T ? (b.page = Math.min(T.page, q.value), It(() => {
        u.value && (u.value.scrollTop = T.scrollTop);
      })) : (b.page = 1, It(() => {
        u.value && (u.value.scrollTop = 0);
      }));
    }), J(q, (_) => {
      b.page > _ && (b.page = _);
    }), J(L, (_) => {
      _ || D.value.clear();
    });
    function z(_) {
      p.value = _, m.value = "";
    }
    function j() {
      p.value = void 0, m.value = "";
    }
    function K() {
      const _ = m.value.trim();
      _ && (fe.dispatch("create-group", { name: _, parentId: p.value || "" }), j());
    }
    function Q(_) {
      C.value = _.id, M.value = _.name;
    }
    function le() {
      const _ = M.value.trim();
      C.value && _ && fe.dispatch("rename-group", { id: C.value, name: _ }), C.value = "", M.value = "";
    }
    function ee(_, c) {
      I.value = c, _.dataTransfer?.setData("application/x-logicweaver-up-group", c), _.dataTransfer && (_.dataTransfer.effectAllowed = "move");
    }
    function se(_, c) {
      const a = _.dataTransfer?.getData("application/x-logicweaver-up-group") || I.value;
      if (I.value = "", !a || a === c) return;
      const T = _.currentTarget?.getBoundingClientRect(), X = T ? _.clientY - T.top : 0, ae = T ? X < T.height * 0.25 ? "before" : X > T.height * 0.75 ? "after" : "into" : "into";
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
    function He(_, c) {
      fe.dispatch("preview-up", { mid: c, clientX: _.clientX, clientY: _.clientY });
    }
    function Xe(_) {
      const c = D.value;
      c.has(_) ? c.delete(_) : c.add(_);
    }
    function ce() {
      if (!b.activeGroupId || b.busyMid) return;
      const _ = Array.from(D.value);
      if (!_.length) return;
      const c = _.filter((a) => {
        const T = b.followings.find((X) => X.mid === a);
        return T && !T.groupIds.includes(b.activeGroupId);
      });
      if (c.length) {
        for (const a of c)
          fe.dispatch("toggle-member", { groupId: b.activeGroupId, mid: a });
        D.value.clear();
      }
    }
    function Je() {
      if (!b.activeGroupId || b.busyMid) return;
      const _ = Array.from(D.value);
      if (!_.length) return;
      const c = _.filter((a) => {
        const T = b.followings.find((X) => X.mid === a);
        return T && T.groupIds.includes(b.activeGroupId);
      });
      if (c.length) {
        for (const a of c)
          fe.dispatch("toggle-member", { groupId: b.activeGroupId, mid: a });
        D.value.clear();
      }
    }
    function Ze() {
      for (const _ of O.value) D.value.add(_.mid);
    }
    return (_, c) => r(b).open ? (o(), l("dialog", {
      key: 0,
      ref_key: "dialogEl",
      ref: y,
      class: "fo-up-group-dialog",
      open: "",
      onCancel: c[21] || (c[21] = $((a) => r(fe).close(), ["prevent"]))
    }, [
      e("div", Vl, [
        e("header", {
          class: "fo-upg-head",
          onPointerdown: w
        }, [
          c[22] || (c[22] = e("h3", null, [
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
        e("div", Ul, [
          e("aside", Nl, [
            e("div", ql, [
              c[23] || (c[23] = e("span", null, "我的分组", -1)),
              e("button", {
                type: "button",
                onClick: c[1] || (c[1] = (a) => z(null))
              }, "＋ 新建")
            ]),
            e("div", Gl, [
              e("div", {
                class: "fo-upg-root-dropzone",
                onDragover: c[2] || (c[2] = $(() => {
                }, ["prevent"])),
                onDrop: $(de, ["prevent"])
              }, "⇣ 拖至此处变为顶级分组", 32),
              p.value === null ? (o(), l("form", {
                key: 0,
                class: "fo-upg-create-box",
                onSubmit: $(K, ["prevent"])
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
                    onClick: j
                  }, "取消"),
                  c[24] || (c[24] = e("button", {
                    class: "confirm",
                    type: "submit"
                  }, "确定", -1))
                ])
              ], 32)) : g("", !0),
              (o(!0), l(B, null, G(r(b).groups, (a) => (o(), l(B, {
                key: a.id
              }, [
                e("div", {
                  class: P(["fo-upg-group-item", { on: a.id === r(b).activeGroupId, "is-subgroup": a.depth > 0 }]),
                  style: we({ paddingLeft: `${8 + a.depth * 18}px` }),
                  draggable: "true",
                  onDragstart: (T) => ee(T, a.id),
                  onDragover: c[8] || (c[8] = $(() => {
                  }, ["prevent"])),
                  onDrop: $((T) => se(T, a.id), ["prevent"]),
                  onClick: (T) => r(b).activeGroupId = a.id
                }, [
                  C.value === a.id ? (o(), l(B, { key: 0 }, [
                    ue(e("input", {
                      "onUpdate:modelValue": c[4] || (c[4] = (T) => M.value = T),
                      class: "fo-upg-rename-input",
                      maxlength: "20",
                      onClick: c[5] || (c[5] = $(() => {
                      }, ["stop"])),
                      onKeydown: c[6] || (c[6] = (T) => r(Et)(T, le))
                    }, null, 544), [
                      [xe, M.value]
                    ]),
                    e("button", {
                      type: "button",
                      onClick: $(le, ["stop"])
                    }, "✓"),
                    e("button", {
                      type: "button",
                      onClick: c[7] || (c[7] = $((T) => C.value = "", ["stop"]))
                    }, "✕")
                  ], 64)) : (o(), l(B, { key: 1 }, [
                    a.depth ? (o(), l("span", Wl, "↳")) : (o(), l("i", Yl)),
                    e("span", jl, n(a.name), 1),
                    e("small", null, n(a.upMids.length), 1),
                    e("span", Kl, [
                      e("button", {
                        type: "button",
                        title: "添加子分组",
                        onClick: $((T) => z(a.id), ["stop"])
                      }, "＋", 8, Ql),
                      e("button", {
                        type: "button",
                        title: "重命名",
                        onClick: $((T) => Q(a), ["stop"])
                      }, "✎", 8, Hl),
                      e("button", {
                        type: "button",
                        class: "danger",
                        title: "删除",
                        onClick: $((T) => r(fe).dispatch("delete-group", a.id), ["stop"])
                      }, "×", 8, Xl)
                    ])
                  ], 64))
                ], 46, Ol),
                p.value === a.id ? (o(), l("form", {
                  key: 0,
                  class: "fo-upg-create-box",
                  style: we({ marginLeft: `${18 + a.depth * 18}px` }),
                  onSubmit: $(K, ["prevent"])
                }, [
                  ue(e("input", {
                    "onUpdate:modelValue": c[9] || (c[9] = (T) => m.value = T),
                    maxlength: "20",
                    placeholder: `输入「${a.name}」的子分组名称…`,
                    autofocus: ""
                  }, null, 8, Jl), [
                    [xe, m.value]
                  ]),
                  e("div", { class: "fo-upg-create-btns" }, [
                    e("button", {
                      type: "button",
                      class: "cancel",
                      onClick: j
                    }, "取消"),
                    c[25] || (c[25] = e("button", {
                      class: "confirm",
                      type: "submit"
                    }, "确定", -1))
                  ])
                ], 36)) : g("", !0)
              ], 64))), 128)),
              !r(b).groups.length && !r(b).loading ? (o(), l("p", Zl, '暂无分组，请点击"＋ 新建"。')) : g("", !0)
            ])
          ]),
          e("section", es, [
            e("div", ts, [
              e("div", is, [
                e("h4", null, n(A.value ? `分组：「${A.value.name}」` : "请先选择或新建分组"), 1),
                A.value ? (o(), l("span", os, "（本组 " + n(A.value.upMids.length) + " 位 · 共 " + n(r(b).followings.length) + " 位关注 · 未分组 " + n(me.value) + " 位）", 1)) : g("", !0)
              ]),
              e("div", ls, [
                e("div", ss, [
                  e("button", {
                    type: "button",
                    class: P(["fo-upg-filter-tab", { on: r(b).filter === "all" }]),
                    onClick: c[10] || (c[10] = (a) => r(b).filter = "all")
                  }, "全部关注", 2),
                  e("button", {
                    type: "button",
                    class: P(["fo-upg-filter-tab", { on: r(b).filter === "ingroup" }]),
                    onClick: c[11] || (c[11] = (a) => r(b).filter = "ingroup")
                  }, "本组已加", 2)
                ]),
                e("div", ns, [
                  e("button", {
                    type: "button",
                    class: P(["fo-upg-batch-toggle", { on: L.value }]),
                    onClick: c[12] || (c[12] = (a) => L.value = !L.value)
                  }, n(L.value ? "退出批量" : "批量操作"), 3),
                  L.value && D.value.size > 0 ? (o(), l(B, { key: 0 }, [
                    e("span", as, "已选 " + n(D.value.size), 1),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action add",
                      disabled: !A.value,
                      onClick: ce
                    }, "＋ 加入本组", 8, rs),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action remove",
                      disabled: !A.value,
                      onClick: Je
                    }, "− 移出本组", 8, us),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: Ze
                    }, "全选当页"),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: c[13] || (c[13] = (a) => D.value.clear())
                    }, "清除")
                  ], 64)) : g("", !0)
                ]),
                r(b).filter === "all" ? (o(), l("label", {
                  key: 0,
                  class: P(["fo-upg-switch", { on: r(b).onlyUngrouped }])
                }, [
                  ue(e("input", {
                    "onUpdate:modelValue": c[14] || (c[14] = (a) => r(b).onlyUngrouped = a),
                    type: "checkbox"
                  }, null, 512), [
                    [vi, r(b).onlyUngrouped]
                  ]),
                  c[26] || (c[26] = e("span", { class: "fo-upg-switch-track" }, [
                    e("span", { class: "fo-upg-switch-thumb" })
                  ], -1)),
                  c[27] || (c[27] = e("span", { class: "fo-upg-switch-text" }, "仅未分组 UP", -1))
                ], 2)) : g("", !0)
              ])
            ]),
            e("div", ds, [
              e("div", cs, [
                c[28] || (c[28] = e("span", null, "🔍", -1)),
                ue(e("input", {
                  "onUpdate:modelValue": c[15] || (c[15] = (a) => r(b).query = a),
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
                onClick: c[16] || (c[16] = (a) => r(fe).dispatch("refresh"))
              }, n(r(b).refreshing ? "刷新中…" : "↻ 刷新关注"), 9, vs)
            ]),
            e("div", {
              ref_key: "listRef",
              ref: u,
              class: "fo-upg-list"
            }, [
              r(b).loading ? (o(), l("div", ps, [...c[29] || (c[29] = [
                e("i", null, null, -1),
                e("span", null, "正在加载关注的 UP 主列表…", -1)
              ])])) : r(b).error ? (o(), l("p", bs, n(r(b).error), 1)) : A.value ? O.value.length ? (o(!0), l(B, { key: 4 }, G(O.value, (a) => (o(), l("article", {
                key: a.mid,
                class: P(["fo-upg-card", { selected: L.value && D.value.has(a.mid) }]),
                title: `右键查看「${a.name}」近期投稿`,
                onContextmenu: $((T) => He(T, a.mid), ["prevent"]),
                onClick: (T) => L.value ? Xe(a.mid) : void 0
              }, [
                e("img", {
                  src: a.face,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, hs),
                e("div", ys, [
                  e("div", _s, n(a.name), 1),
                  e("div", ks, n(a.sign || "暂无签名"), 1)
                ]),
                L.value ? (o(), l("div", {
                  key: 1,
                  class: P(["fo-upg-batch-check", { checked: D.value.has(a.mid) }])
                }, n(D.value.has(a.mid) ? "✓" : ""), 3)) : (o(), l(B, { key: 0 }, [
                  a.groupIds.includes(r(b).activeGroupId) ? (o(), l("button", {
                    key: 0,
                    type: "button",
                    class: "fo-upg-toggle-btn in-group",
                    disabled: r(b).busyMid === a.mid,
                    onClick: $((T) => H(a.mid), ["stop"])
                  }, n(r(b).busyMid === a.mid ? "处理中…" : `移出 ${A.value?.name || ""}`), 9, $s)) : a.groupIds.length > 0 ? (o(), l("div", Cs, [
                    e("button", {
                      type: "button",
                      class: "fo-upg-toggle-btn belongs-other fo-upg-move-trigger",
                      disabled: r(b).busyMid === a.mid
                    }, n(r(b).busyMid === a.mid ? "处理中…" : `📁 ${a.groupName || "已分组"}`), 9, ws),
                    e("div", xs, [
                      c[31] || (c[31] = e("div", { class: "fo-upg-move-title" }, "移动到分组", -1)),
                      (o(!0), l(B, null, G(r(b).groups, (T) => (o(), l("button", {
                        key: T.id,
                        type: "button",
                        class: P(["fo-upg-move-item", { active: a.groupIds.includes(T.id) }]),
                        disabled: r(b).busyMid === a.mid,
                        onClick: $((X) => U(a.mid, T.id), ["stop"])
                      }, [
                        c[30] || (c[30] = e("i", { class: "fo-folder-icon small" }, null, -1)),
                        e("span", null, n(T.name), 1),
                        a.groupIds.includes(T.id) ? (o(), l("small", Ts, "✓ 已加入")) : g("", !0)
                      ], 10, Ss))), 128)),
                      r(b).groups.length ? g("", !0) : (o(), l("p", Ms, "暂无分组"))
                    ])
                  ])) : r(b).activeGroupId ? (o(), l("button", {
                    key: 2,
                    type: "button",
                    class: "fo-upg-toggle-btn",
                    disabled: r(b).busyMid === a.mid,
                    onClick: $((T) => H(a.mid), ["stop"])
                  }, n(r(b).busyMid === a.mid ? "处理中…" : "＋ 加入"), 9, Ds)) : g("", !0)
                ], 64))
              ], 42, ms))), 128)) : (o(), l("p", gs, "没有符合条件的 UP 主。")) : (o(), l("p", fs, "请先新建或选择一个分组。"))
            ], 512),
            e("div", Ps, [
              e("div", Is, "共 " + n(Z.value.length) + " 位 UP 主 · 每页 " + n(r(b).pageSize) + " 位", 1),
              q.value > 1 ? (o(), l("div", Ls, [
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(b).page <= 1,
                  onClick: c[17] || (c[17] = (a) => oe(1))
                }, "« 首页", 8, Rs),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(b).page <= 1,
                  onClick: c[18] || (c[18] = (a) => oe(r(b).page - 1))
                }, "‹ 上一页", 8, Es),
                e("span", Bs, n(r(b).page) + " / " + n(q.value), 1),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(b).page >= q.value,
                  onClick: c[19] || (c[19] = (a) => oe(r(b).page + 1))
                }, "下一页 ›", 8, zs),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(b).page >= q.value,
                  onClick: c[20] || (c[20] = (a) => oe(q.value))
                }, "末页 »", 8, As)
              ])) : g("", !0)
            ])
          ])
        ])
      ])
    ], 544)) : g("", !0);
  }
}), Vs = /* @__PURE__ */ Qe(Fs, [["__scopeId", "data-v-967faee9"]]);
function Yt(V) {
  if (V.ctrlKey || V.metaKey || V.shiftKey || Math.abs(V.deltaX) >= Math.abs(V.deltaY)) return;
  const p = V.currentTarget, m = V.deltaY * (V.deltaMode === 1 ? 16 : V.deltaMode === 2 ? p.clientWidth : 1), C = p.scrollWidth - p.clientWidth;
  (m > 0 && p.scrollLeft < C || m < 0 && p.scrollLeft > 0) && (V.preventDefault(), V.stopPropagation(), p.scrollLeft += m);
}
const Us = {
  class: "fm-pane",
  id: "pane-organizer"
}, Ns = { id: "fo-body" }, qs = { class: "fo-bili-sidebar" }, Gs = ["title"], Os = { class: "fo-sidebar-toggle-title" }, Ws = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Ys = ["aria-expanded", "title"], js = { class: "fo-sidebar-toggle-chevron" }, Ks = { class: "fo-sidebar-features-wrap" }, Qs = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Hs = ["title"], Xs = { class: "fo-sidebar-sub-main" }, Js = { class: "fo-sidebar-sub-text" }, Zs = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, en = ["title"], tn = { class: "fo-sidebar-sub-main" }, on = { class: "fo-sidebar-sub-text" }, ln = { class: "fo-sidebar-sub-wrap fo-sidebar-recommend-wrap" }, sn = ["title"], nn = { class: "fo-sidebar-sub-main" }, an = { class: "fo-sidebar-sub-text" }, rn = { class: "fo-sidebar-sub-wrap fo-sidebar-radio-wrap" }, un = ["title"], dn = { class: "fo-sidebar-sub-main" }, cn = { class: "fo-sidebar-sub-text" }, vn = { class: "fo-sidebar-favorite-hub" }, pn = { class: "fo-sidebar-sub-main" }, bn = { class: "fo-sidebar-sub-text" }, fn = ["title", "aria-label"], gn = {
  key: 0,
  class: "fo-move-target-banner"
}, mn = {
  class: "fo-bili-folder-list",
  "aria-label": "B站收藏夹"
}, hn = {
  key: 0,
  class: "fo-bili-section-divider"
}, yn = ["onDragover", "onDragleave", "onDrop"], _n = { class: "fo-bili-section-title" }, kn = ["data-folder-id", "data-folder-kind", "draggable", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], $n = ["aria-expanded", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], Cn = {
  class: "fo-group-caret",
  "aria-hidden": "true"
}, wn = {
  key: 0,
  class: "muted small"
}, xn = {
  key: 0,
  class: "fo-bili-loading"
}, Sn = {
  key: 1,
  class: "fo-bili-empty fo-bili-login-guide"
}, Tn = { class: "fo-bili-login-card" }, Mn = { class: "fo-bili-login-actions" }, Dn = {
  key: 2,
  class: "fo-bili-empty"
}, Pn = { class: "fo-bili-hero fo-hero-persistent" }, In = { class: "fo-hero-left" }, Ln = ["src"], Rn = {
  key: 1,
  class: "fo-folder-icon"
}, En = { class: "fo-hero-folder-info" }, Bn = ["placeholder", "aria-label"], zn = ["title"], An = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, Fn = { class: "card-fullscreen-bili-suggest-head" }, Vn = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, Un = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, Nn = ["onClick", "onContextmenu"], qn = { class: "card-fullscreen-bili-thumb" }, Gn = ["src"], On = { key: 0 }, Wn = { class: "card-fullscreen-bili-video-copy" }, Yn = { class: "fo-bili-actions" }, jn = ["title"], Kn = { class: "bili-header-msg-label" }, Qn = ["disabled"], Hn = { class: "fo-bili-toolbar" }, Xn = {
  key: 0,
  class: "fo-bili-sort"
}, Jn = ["onClick"], Zn = {
  class: "fo-mini-dock-anchor",
  "aria-label": "视频标签页"
}, ea = ["title"], ta = { class: "fo-video-tab-title" }, ia = { class: "fo-video-tab-actions" }, oa = ["title"], la = {
  key: 2,
  class: "fo-bili-batch-actions"
}, sa = { class: "fo-batch-count" }, na = {
  key: 0,
  class: "muted small",
  role: "status"
}, aa = ["aria-busy"], ra = {
  key: 0,
  class: "fo-bili-empty"
}, ua = ["data-batch-id", "onContextmenu"], da = { class: "fo-bili-thumb" }, ca = {
  key: 0,
  class: "fo-batch-check",
  title: "选择此视频"
}, va = ["checked", "onChange"], pa = ["href", "onClick"], ba = ["src"], fa = { class: "fo-bili-count" }, ga = { class: "fo-bili-duration" }, ma = { class: "fo-bili-title-row" }, ha = ["href", "onClick"], ya = ["aria-expanded", "onClick"], _a = {
  key: 0,
  class: "fo-card-menu"
}, ka = ["onClick"], $a = ["onClick"], Ca = ["onClick"], wa = { class: "fo-bili-meta" }, xa = ["onClick"], Sa = {
  key: 1,
  class: "fo-pager"
}, Ta = ["disabled"], Ma = { class: "fo-page-num" }, Da = ["disabled"], Pa = { class: "fo-bili-hero fo-hero-persistent fo-cached-hero" }, Ia = { class: "fo-hero-left" }, La = { class: "fo-hero-folder-info" }, Ra = { class: "fo-bili-actions" }, Ea = {
  key: 0,
  class: "fo-bili-loading"
}, Ba = {
  key: 0,
  class: "fo-bili-empty"
}, za = { class: "fo-bili-thumb" }, Aa = ["onClick"], Fa = ["src"], Va = { class: "fo-bili-title-row" }, Ua = ["onClick"], Na = ["onClick"], qa = { class: "fo-bili-meta" }, Ga = {
  key: 2,
  class: "fo-pager"
}, Oa = ["disabled"], Wa = { class: "fo-page-num" }, Ya = ["disabled"], ja = { class: "fo-bili-hero" }, Ka = { class: "fo-bili-heading" }, Qa = { class: "fo-feed-hero-title" }, Ha = ["placeholder", "aria-label"], Xa = ["title"], Ja = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, Za = { class: "card-fullscreen-bili-suggest-head" }, er = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, tr = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, ir = ["onClick", "onContextmenu"], or = { class: "card-fullscreen-bili-thumb" }, lr = ["src"], sr = { key: 0 }, nr = { class: "card-fullscreen-bili-video-copy" }, ar = { class: "fo-bili-actions" }, rr = { class: "fo-bili-toolbar" }, ur = { class: "fo-bili-sort" }, dr = { class: "fo-vue-feed-label" }, cr = {
  key: 0,
  class: "fo-bili-loading",
  role: "status"
}, vr = {
  key: 1,
  class: "fo-bili-empty",
  role: "alert"
}, pr = { class: "fo-bili-grid" }, br = {
  key: 0,
  class: "fo-bili-empty"
}, fr = ["onContextmenu"], gr = { class: "fo-bili-thumb" }, mr = ["href", "onClick"], hr = ["src"], yr = { class: "fo-bili-count" }, _r = { class: "fo-bili-duration" }, kr = { class: "fo-bili-title-row" }, $r = ["href", "onClick"], Cr = { class: "fo-bili-meta" }, wr = {
  key: 0,
  class: "fo-pager"
}, xr = ["disabled"], Sr = { class: "fo-page-num" }, Tr = ["disabled"], Mr = { class: "fo-bili-toolbar" }, Dr = { class: "fo-feed-count-tag" }, Pr = {
  key: 0,
  class: "fo-bili-loading"
}, Ir = {
  key: 1,
  class: "fo-bili-empty"
}, Lr = {
  key: 0,
  class: "fo-bili-empty"
}, Rr = { class: "fo-bili-thumb" }, Er = ["href", "onClick"], Br = ["src"], zr = { class: "fo-bili-count" }, Ar = { class: "fo-bili-duration" }, Fr = { class: "fo-bili-title-row" }, Vr = ["href", "onClick"], Ur = ["aria-expanded", "onClick"], Nr = {
  key: 0,
  class: "fo-card-menu"
}, qr = ["onClick"], Gr = ["onClick"], Or = ["onClick"], Wr = ["onClick"], Yr = ["onClick"], jr = { class: "fo-bili-meta" }, Kr = ["onClick"], Qr = { class: "fo-pager" }, Hr = ["disabled"], Xr = { class: "fo-page-num" }, Jr = ["disabled"], Zr = { class: "fo-bili-hero fo-following-hero" }, eu = { class: "fo-bili-heading" }, tu = { class: "fo-feed-hero-title" }, iu = {
  key: 0,
  class: "fo-feed-badge"
}, ou = { class: "fo-up-groups-bar" }, lu = ["onClick"], su = { class: "count" }, nu = { class: "fo-up-groups-actions" }, au = ["title"], ru = { class: "fo-bili-actions" }, uu = {
  key: 0,
  class: "fo-up-members-strip"
}, du = { class: "fo-up-members-label" }, cu = { class: "fo-up-members-list" }, vu = ["title", "onClick", "onContextmenu"], pu = ["src"], bu = { class: "fo-bili-toolbar" }, fu = { class: "fo-feed-count-tag" }, gu = {
  key: 1,
  class: "fo-bili-loading"
}, mu = {
  key: 2,
  class: "fo-bili-empty"
}, hu = {
  key: 0,
  class: "fo-bili-empty"
}, yu = { class: "fo-bili-thumb" }, _u = ["href", "onClick"], ku = ["src"], $u = { class: "fo-bili-count" }, Cu = { class: "fo-bili-duration" }, wu = { class: "fo-bili-title-row" }, xu = ["href", "onClick"], Su = ["aria-expanded", "onClick"], Tu = {
  key: 0,
  class: "fo-card-menu"
}, Mu = ["onClick"], Du = ["onClick"], Pu = ["onClick"], Iu = ["onClick"], Lu = { class: "fo-bili-meta" }, Ru = ["onClick"], Eu = { class: "fo-pager" }, Bu = ["disabled"], zu = { class: "fo-page-num" }, Au = ["disabled"], Fu = {
  key: 4,
  id: "fo-vue-subscription-main",
  class: "fo-bili-main fo-vue-subscription-main"
}, Vu = { class: "bili-sub-vue-shell" }, Uu = {
  key: 0,
  class: "fo-bili-loading"
}, Nu = {
  key: 1,
  class: "fo-bili-empty"
}, qu = {
  key: 2,
  class: "fo-bili-empty"
}, Gu = {
  key: 5,
  id: "fo-vue-radio-main",
  class: "fo-bili-main fo-vue-radio-main"
}, Ou = { class: "fo-bili-hero fo-radio-hero" }, Wu = { class: "fo-hero-left" }, Yu = { class: "fo-hero-folder-info" }, ju = { class: "fo-radio-title-line" }, Ku = { class: "fo-bili-actions" }, Qu = { class: "bili-radio-layout fo-vue-radio-layout" }, Hu = { class: "bili-radio-folders" }, Xu = { id: "bili-radio-folders" }, Ju = ["onClick"], Zu = {
  key: 0,
  class: "muted small"
}, ed = { class: "bili-radio-library" }, td = { class: "bili-radio-library-head" }, id = {
  key: 0,
  class: "bili-radio-lib-pager"
}, od = ["disabled"], ld = ["disabled"], sd = {
  key: 0,
  role: "alert",
  class: "muted small"
}, nd = {
  id: "bili-radio-videos",
  class: "bili-radio-videos two-col bili-radio-card-grid"
}, ad = ["title", "onDragstart", "onClick"], rd = { class: "fo-bili-thumb" }, ud = ["src"], dd = {
  key: 1,
  class: "bili-radio-cover-ph"
}, cd = {
  key: 2,
  class: "fo-bili-duration"
}, vd = { class: "bili-radio-card-body" }, pd = { class: "fo-bili-title-row" }, bd = { class: "fo-title-link fo-bili-title" }, fd = ["title", "aria-label", "onClick"], gd = { class: "fo-bili-meta" }, md = {
  key: 0,
  class: "bili-radio-in-queue-tag"
}, hd = {
  key: 1,
  class: "bili-radio-hint-add"
}, yd = {
  key: 0,
  class: "muted small"
}, _d = { class: "bili-radio-editor" }, kd = { class: "bili-radio-name-row" }, $d = ["placeholder"], Cd = { class: "bili-radio-btn-group" }, wd = ["title"], xd = ["aria-expanded"], Sd = {
  key: 0,
  class: "bili-radio-series-popover",
  role: "menu"
}, Td = {
  key: 0,
  class: "bili-radio-series-list"
}, Md = ["onClick"], Dd = { class: "name" }, Pd = ["title", "onClick"], Id = {
  key: 1,
  class: "muted small bili-radio-series-empty"
}, Ld = {
  key: 0,
  class: "bili-radio-lib-pager"
}, Rd = ["disabled"], Ed = ["disabled"], Bd = ["onClick"], zd = { class: "fo-bili-thumb" }, Ad = ["src"], Fd = {
  key: 1,
  class: "bili-radio-cover-ph"
}, Vd = { class: "bili-radio-queue-badge" }, Ud = ["aria-label", "onClick"], Nd = {
  key: 2,
  class: "fo-bili-duration"
}, qd = { class: "bili-radio-card-body" }, Gd = { class: "fo-bili-title-row" }, Od = { class: "fo-title-link fo-bili-title" }, Wd = ["title", "onClick"], Yd = { class: "fo-bili-meta" }, jd = {
  key: 0,
  class: "muted small bili-radio-queue-empty"
}, Kd = { class: "bili-radio-actions" }, Qd = ["disabled"], Hd = ["disabled"], Xd = ["title"], Jd = {
  key: 2,
  class: "fo-context-divider"
}, jt = "lw-bili-active-mode", Ke = 14, Zd = /* @__PURE__ */ Fe({
  __name: "BilibiliWorkspace",
  setup(V) {
    const { style: p, media: m } = Pi("bilibili"), C = h(!1);
    function M() {
      const s = E.radioSeriesName?.trim();
      if (!s) {
        C.value = !0;
        const t = document.getElementById("bili-radio-name");
        t && t.focus(), it.fetch(R("bili.radioAppName"), R("bili.radioNameEmpty"));
        return;
      }
      C.value = !1, a("radio-save", { name: s });
    }
    const I = h(!1), L = h(null), D = h(null);
    let y = null;
    function w() {
      D.value = null, y && (clearTimeout(y), y = null);
    }
    function A() {
      a("radio-clear"), E.radioSeriesName = "", ke.value = 1, I.value = !1, w(), it.fetch("哔哩哔哩电台", "已开启新歌单创作，请从左侧添加视频"), document.getElementById("bili-radio-name")?.focus();
    }
    function Z(s) {
      a("radio-load-series", s), ke.value = 1, I.value = !1, w();
    }
    function q(s) {
      if (D.value !== s) {
        w(), D.value = s, y = setTimeout(() => {
          D.value = null, y = null;
        }, 3500);
        return;
      }
      w(), a("radio-delete-series", s);
    }
    J(I, (s, t, i) => {
      if (!s || typeof document > "u") return;
      const d = (N) => {
        const $e = N.target;
        L.value && $e && !L.value.contains($e) && (I.value = !1, w());
      }, S = (N) => {
        N.key === "Escape" && (I.value = !1, w());
      };
      document.addEventListener("pointerdown", d), document.addEventListener("keydown", S), i(() => {
        document.removeEventListener("pointerdown", d), document.removeEventListener("keydown", S);
      });
    });
    function O(s, t) {
      !t.mid && !t.name || pe.showUpRecentVideosPreview(
        {
          preventDefault: () => s.preventDefault(),
          stopPropagation: () => s.stopPropagation(),
          clientX: s.clientX,
          clientY: s.clientY
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
      Mi.togglePanel();
    }
    const u = Y(() => E.organizer), ie = h(!1), { active: oe } = mi("daily-bilibili", "/bilibili.html");
    J(() => oe.value && u.value.mode === "recommendations", (s) => {
      pe.setRecommendationsActive(s);
    }, { immediate: !0, flush: "sync" }), J(() => oe.value && u.value.mode === "following", (s) => {
      pe.setFollowingActive(s);
    }, { immediate: !0, flush: "sync" }), J(() => oe.value && u.value.mode === "subscription", (s) => {
      pe.setSubscriptionActive(s);
    }, { immediate: !0, flush: "sync" }), J(() => oe.value && u.value.mode === "cache", (s) => {
      s || (ie.value = !1);
    });
    const z = h(u.value.query), j = h(null), K = h(7), Q = h(1), le = Y(() => K.value * 3), ee = Y(() => Math.max(1, Math.ceil(u.value.cachedVideos.length / le.value))), se = Y(() => u.value.cachedVideos.slice((Q.value - 1) * le.value, Q.value * le.value));
    J(ee, (s) => {
      Q.value = Math.min(Q.value, s);
    });
    const de = Y(() => !!u.value.loadedFolderId && u.value.loadedFolderId === E.activeFolderId), U = h(""), H = h({ visible: !1, x: 0, y: 0, video: null, folder: null }), { menuRef: He, style: Xe } = Di({
      visible: () => H.value.visible,
      anchor: () => H.value,
      dismiss: () => {
        H.value.visible = !1;
      }
    }), ce = h(
      typeof localStorage < "u" && localStorage.getItem("bili_sidebar_features_collapsed") === "true"
    );
    function Je() {
      ce.value = !ce.value;
      try {
        localStorage.setItem("bili_sidebar_features_collapsed", String(ce.value));
      } catch {
      }
    }
    function Ze() {
      ye.bvid && pi.open({
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
    J(() => u.value.query, (s) => {
      z.value = s;
    }), J(z, (s) => {
      (!s || !s.trim()) && u.value.query && a("organizer-search", "");
    });
    function a(s, t) {
      Le.dispatch(s, t);
    }
    function T(s) {
      s.group || Ct(), a(s.group ? "toggle-folder-group" : "select-folder", { id: s.id, kind: s.kind });
    }
    const X = h(""), ae = h(""), be = h("before"), Se = h(!1);
    function Ve(s, t) {
      t.kind === "created" && (X.value = t.id, s.dataTransfer?.setData("application/x-logicweaver-favorite-node", t.id), s.dataTransfer?.setData("text/plain", t.id), s.dataTransfer && (s.dataTransfer.effectAllowed = "move"));
    }
    function Ue(s, t) {
      if (t.kind !== "created" || !X.value || X.value === t.id) return;
      s.preventDefault(), s.dataTransfer && (s.dataTransfer.dropEffect = "move");
      const i = s.currentTarget;
      if (!i) return;
      const d = i.getBoundingClientRect(), S = (s.clientY - d.top) / Math.max(1, d.height), N = t.group && S > 0.25 && S < 0.75 ? "into" : S >= 0.5 ? "after" : "before";
      ae.value = t.id, be.value = N;
    }
    function Ne(s, t) {
      const i = s.relatedTarget, d = s.currentTarget;
      d && i && d.contains(i) || ae.value === t.id && (ae.value = "");
    }
    function Re() {
      X.value = "", ae.value = "", Se.value = !1;
    }
    function Ee(s, t) {
      s.preventDefault();
      const i = X.value || s.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "", d = be.value || (t.group ? "into" : "after");
      Re(), !(!i || i === t.id || t.kind !== "created") && a("move-folder-node", { sourceId: i, targetId: t.id, mode: d });
    }
    function qe(s) {
      X.value && (s.preventDefault(), s.dataTransfer && (s.dataTransfer.dropEffect = "move"), Se.value = !0);
    }
    function gt(s) {
      const t = s.relatedTarget, i = s.currentTarget;
      i && t && i.contains(t) || (Se.value = !1);
    }
    function mt(s) {
      s.preventDefault();
      const t = X.value || s.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
      Re(), t && a("move-folder-node", { sourceId: t, targetId: "root", mode: "into" });
    }
    function x() {
      const s = z.value.trim();
      a("organizer-search", s);
    }
    function f() {
      !z.value.trim() && u.value.query && a("organizer-search", "");
    }
    const v = h(""), k = h(!1), F = h(!1), W = h("hot"), te = h(""), Be = Y(() => W.value === "live" ? R("bili.searchLiveTitle", { keyword: te.value }) : R("bili.searchSuggestTitle")), ne = Y(() => W.value === "live" ? R("bili.searchLiveSubtitle") : R("bili.searchSuggestSubtitle")), he = h([]), Ge = h(null), ze = h(!1), Oe = h(""), re = h(1), Te = h(0), lt = h(!1), st = h(!1), nt = h(""), at = h([]);
    let et = 0, tt = 0;
    J(() => u.value.mode, (s) => {
      s !== "recommendations" && Ct();
    });
    const ht = h([]);
    let Bt = 0, yt = null;
    function _t(s) {
      if (!s) return null;
      const t = s.bvid || (String(s.param || "").startsWith("BV") ? s.param : "");
      if (!t && !s.aid && !s.id) return null;
      const i = String(s.pic || s.cover || "").replace(/^http:/, "https:"), d = i.startsWith("//") ? `https:${i}` : i, S = String(s.title || "").replace(/<[^>]+>/g, ""), N = Number(s.duration || 0), $e = N > 0 ? `${Math.floor(N / 60)}:${String(N % 60).padStart(2, "0")}` : String(s.duration || ""), Pe = s.stat?.view || s.play || 0, di = Number(Pe) >= 1e4 ? `${(Number(Pe) / 1e4).toFixed(1)}万` : String(Number(Pe || 0)), ci = s.owner?.name || s.name || s.author || R("bili.upDefault");
      return {
        bvid: t,
        aid: String(s.aid || s.id || ""),
        title: S,
        cover: d,
        durationText: $e,
        playText: di,
        upper: ci
      };
    }
    async function kt() {
      if (W.value = "hot", k.value = !0, ht.value.length && Date.now() - Bt < 9e4) {
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
        ht.value = d, Bt = Date.now(), v.value.trim() || (he.value = d);
      } catch {
        he.value = [];
      } finally {
        F.value = !1;
      }
    }
    function zt() {
      v.value.trim() ? Ft(v.value.trim()) : kt();
    }
    function At() {
      const s = v.value.trim();
      if (clearTimeout(yt), !s) {
        kt();
        return;
      }
      yt = setTimeout(() => {
        Ft(s);
      }, 320);
    }
    async function Ft(s) {
      const t = ++tt;
      k.value = !0, W.value = "live", te.value = s, F.value = !0;
      try {
        let i = null;
        if (window.LogicWeaverBiliSearchActions?.search)
          try {
            i = await window.LogicWeaverBiliSearchActions.search(s);
          } catch {
          }
        if (!i || i.code !== 0) {
          const S = `search_type=video&keyword=${encodeURIComponent(s)}&page=1&page_size=12`;
          i = await (await fetch(`https://api.bilibili.com/x/web-interface/search/type?${S}`, { credentials: "include" })).json();
        }
        if (t !== tt || v.value.trim() !== s) return;
        const d = Array.isArray(i?.data?.result) ? i.data.result : [];
        he.value = d.slice(0, 10).map(_t).filter(Boolean);
      } catch {
        t === tt && (he.value = []);
      } finally {
        t === tt && (F.value = !1);
      }
    }
    function rt(s) {
      k.value = !1;
      const t = s.bvid || (String(s.param || s.id || "").startsWith("BV") ? s.param || s.id : "");
      t || s.aid ? bt.openVideo({
        bvid: t,
        aid: s.aid,
        title: s.title,
        cover: s.cover,
        author: s.upper
      }) : window.LogicWeaverBiliSearchActions?.local ? window.LogicWeaverBiliSearchActions.local(s) : window.open(`https://www.bilibili.com/video/${t || s.bvid || s.id}`, "_blank");
    }
    function $t(s, t) {
      Ut(s, {
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
      ze.value = !1, et++, st.value = !1;
    }
    async function ut(s, t) {
      const i = ++et;
      ze.value = !0, Oe.value = s, re.value = t, st.value = !0, nt.value = "", at.value = [], Te.value = 0, lt.value = !1;
      try {
        let d;
        try {
          d = await pe.searchActions.search(s, t, 20);
        } catch {
        }
        if (!d || d.code !== 0) {
          const $e = new URLSearchParams({ search_type: "video", keyword: s, page: String(t), page_size: "20" }), Pe = await fetch(`https://api.bilibili.com/x/web-interface/search/type?${$e}`, { credentials: "include" });
          if (!Pe.ok) throw new Error(`HTTP ${Pe.status}`);
          d = await Pe.json();
        }
        if (d?.code !== 0 || !Array.isArray(d?.data?.result))
          throw new Error(d?.message || "B站没有返回有效的搜索结果");
        if (i !== et) return;
        const S = d.data.result;
        at.value = S.map(_t).filter(Boolean);
        const N = Number(d.data.numPages || d.data.num_pages || 0);
        Te.value = Number.isFinite(N) && N > 0 ? Math.floor(N) : 0, lt.value = Te.value ? t < Te.value : S.length >= 20;
      } catch (d) {
        i === et && (nt.value = `搜索失败：${d instanceof Error ? d.message : "请稍后重试"}`);
      } finally {
        i === et && (st.value = !1);
      }
    }
    function wt() {
      const s = v.value.trim();
      if (clearTimeout(yt), tt++, F.value = !1, k.value = !1, !s) {
        kt();
        return;
      }
      ut(s, 1);
    }
    J(() => [oe.value, wi.bilibili?.id], ([s, t]) => {
      if (!s || !t) return;
      const i = Ci("bilibili");
      i && (a("open-recommendations"), v.value = i.keyword, wt());
    }, { immediate: !0 });
    function Vt(s) {
      Ge.value && !Ge.value.contains(s.target) && (k.value = !1);
    }
    function xt(s) {
      H.value.visible = !1, U.value = U.value === s ? "" : s;
    }
    function Ut(s, t, i = !0) {
      U.value = "", H.value = {
        visible: !0,
        x: s.clientX,
        y: s.clientY,
        video: t,
        folder: i && E.activeFolderId ? { id: String(E.activeFolderId), title: u.value.folderTitle } : null
      };
    }
    function dt(s) {
      if (s instanceof KeyboardEvent) {
        s.key === "Escape" && (U.value = "", H.value.visible = !1, u.value.isTargetPickMode && a("organizer-cancel-move-target"));
        return;
      }
      const t = s.target;
      t?.closest(".fo-card-menu, .fo-card-more") || (U.value = ""), t?.closest(".fo-context-menu") || (H.value.visible = !1);
    }
    const Ht = typeof document < "u" && document.body.classList.contains("bili-standalone-body");
    function St() {
      const s = j.value;
      if (!s || !s.clientWidth) return;
      const t = getComputedStyle(s), i = s.clientWidth - parseFloat(t.paddingLeft) - parseFloat(t.paddingRight), d = parseFloat(t.getPropertyValue("--favorite-card-min")) || 168, S = gi(i, d);
      if (S !== K.value) {
        const $e = (Q.value - 1) * le.value;
        K.value = S, Q.value = Math.floor($e / le.value) + 1;
      }
      u.value.mode === "organizer" && Le.setOrganizerColumns(S);
      const N = S * 3;
      u.value.mode === "recommendations" && pe.rcmdState.pageSize !== N && (pe.rcmdState.pageSize = N, pe.loadRecommendations(!0)), u.value.mode === "following" && pe.feedState.pageSize !== N && (pe.feedState.pageSize = N, pe.loadFollowing(!0));
    }
    J(j, (s, t, i) => {
      if (!s) return;
      let d;
      const S = new ResizeObserver(() => {
        clearTimeout(d), d = setTimeout(St, 180);
      });
      S.observe(s), i(() => {
        clearTimeout(d), S.disconnect();
      });
    }, { flush: "post" }), J(() => u.value.loading, (s) => {
      s || St();
    });
    const Xt = ["organizer", "cache", "recommendations", "following", "radio"];
    let Tt = !1;
    function Jt() {
      try {
        const s = sessionStorage.getItem(jt);
        return s && Xt.includes(s) ? s : "organizer";
      } catch {
        return "organizer";
      }
    }
    function Nt() {
      if (Tt || !oe.value) return;
      Tt = !0;
      const s = Jt();
      s === "recommendations" ? a("open-recommendations") : s === "following" ? a("open-following") : s === "subscription" ? a("open-sub-video") : s === "cache" ? a("open-cache") : s === "radio" && a("open-radio");
    }
    J(() => u.value.mode, (s) => {
      if (!(!Tt && !oe.value))
        try {
          sessionStorage.setItem(jt, s);
        } catch {
        }
    }), J(oe, (s) => {
      s && Nt();
    }), Rt(() => {
      import("./bilibili-channel.service-DjZBb2vd.js").catch((s) => console.error("[Bilibili] 频道动作服务加载失败", s)), St(), Le.loadOrganizer(), Nt(), document.addEventListener("pointerdown", dt, !0), document.addEventListener("pointerdown", Vt), window.addEventListener("keydown", dt), window.setBiliMiniDockVisible?.(!0), requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }), J(() => [u.value.videos, u.value.mode], () => {
      requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }, { flush: "post" }), Qt(() => {
      pe.setRecommendationsActive(!1), pe.setFollowingActive(!1), pe.setSubscriptionActive(!1), document.removeEventListener("pointerdown", dt, !0), document.removeEventListener("pointerdown", Vt), window.removeEventListener("keydown", dt);
    });
    function Mt(s, t) {
      U.value = "", H.value.visible = !1;
      const i = String(typeof s == "object" ? s.id || s.bvid || s.aid || "" : s), d = typeof s == "object" ? s : u.value.videos.find((S) => String(S.id) === i);
      a("organizer-video-action", { id: i, video: d, action: t });
    }
    async function Me(s) {
      const { video: t, folder: i } = H.value;
      if (H.value.visible = !1, s === "add-radio" && t) {
        try {
          const d = await Ce.addToDefaultSeries({
            bvid: t.bvid || (t.id.startsWith("BV") ? t.id : ""),
            title: t.title,
            author: t.author,
            cover: t.cover,
            duration: Si(t.duration)
          });
          it.fetch("B站电台", d ? "已添加到默认系列" : "已在默认系列中");
        } catch {
          it.fetch("B站电台", "添加失败，请重试");
        }
        return;
      }
      if (s === "share-chat") {
        if (!t) return;
        try {
          const { chatService: d } = await import("./search.service-gzbpg5BD.js").then((N) => N.a_), { windowManagerController: S } = await import("./window-manager.store-BoJtJrk7.js").then((N) => N.n);
          d.sendBiliShare({
            bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
            aid: t.aid,
            title: t.title,
            cover: t.cover,
            upName: t.author,
            upMid: t.authorMid,
            upFace: t.authorFace,
            play: t.playCount
          }), S.open("chat");
        } catch (d) {
          console.warn("分享到聊天室失败", d);
        }
        return;
      }
      t && a("organizer-video-action", { id: t.id || "", video: t, action: s });
    }
    function Zt(s) {
      const t = E.radioSeriesName?.trim();
      let i = E.radioSeries.find((d) => d.name === t);
      if (!i && E.radioQueue.length && (i = {
        id: `series_${Date.now()}`,
        name: t || "未命名电台系列",
        count: E.radioQueue.length,
        items: E.radioQueue
      }), !i || !i.items?.length) {
        it.fetch("哔哩哔哩电台", "当前没有可分享的系列曲目，请先添加曲目");
        return;
      }
      Wt.sendBiliSeriesShare(i, s);
    }
    function ei(s) {
      const { video: t } = H.value;
      H.value.visible = !1, t && Wt.sendBiliShare({
        bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
        aid: t.aid,
        title: t.title,
        cover: t.cover,
        upName: t.author,
        upMid: t.authorMid,
        upFace: t.authorFace,
        play: t.playCount
      }, s);
    }
    function ti(s) {
      if (!u.value.isTargetPickMode) return;
      const t = s.target;
      if (!t?.closest(".bili-sub-transcript-body, .bili-sub-scroll-stage") && !t?.closest(".fo-bili-folder-list")) {
        const i = document.querySelector(".fo-bili-folder-list");
        i && (s.preventDefault(), i.scrollTop += s.deltaY);
      }
    }
    function ii(s) {
      const t = document.createElement("div");
      return t.style.position = "fixed", t.style.top = "-9999px", t.style.left = "-9999px", t.style.width = "76px", t.style.height = "26px", t.style.display = "flex", t.style.alignItems = "center", t.style.justifyContent = "center", t.style.background = "transparent", t.style.zIndex = "999999", t.style.pointerEvents = "none", t.innerHTML = `
    <svg width="76" height="26" viewBox="0 0 76 26" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,0.45));">
      <line x1="6" y1="13" x2="64" y2="13" stroke="#00aeec" stroke-width="2.5" stroke-dasharray="5 3" stroke-linecap="round" />
      <polyline points="56,6 66,13 56,20" stroke="#00aeec" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    </svg>
  `, document.body.appendChild(t), t;
    }
    function oi(s, t) {
      if (!s.dataTransfer) return;
      s.dataTransfer.effectAllowed = "copyMove";
      const i = JSON.stringify({
        type: "bili-cassette-tape",
        bvid: t.bvid,
        title: t.title,
        cover: t.cover,
        author: t.author,
        duration: t.duration
      });
      s.dataTransfer.setData("application/x-bili-cassette", i), s.dataTransfer.setData("application/json", i), s.dataTransfer.setData("text/plain", `https://www.bilibili.com/video/${t.bvid}`);
      const d = ii(t.title);
      s.dataTransfer.setDragImage(d, 66, 13), setTimeout(() => {
        d.parentNode && d.parentNode.removeChild(d);
      }, 0);
    }
    const De = h(1), ke = h(1), ct = h(!1), Ye = Y(
      () => Math.max(1, Math.ceil(E.radioVideos.length / Ke))
    ), li = Y(() => {
      const t = (Math.min(De.value, Ye.value) - 1) * Ke;
      return E.radioVideos.slice(t, t + Ke);
    }), je = Y(
      () => Math.max(1, Math.ceil(E.radioQueue.length / Ke))
    ), si = Y(() => {
      const t = (Math.min(ke.value, je.value) - 1) * Ke;
      return E.radioQueue.map((i, d) => ({ item: i, index: d })).slice(t, t + Ke);
    }), ni = Y(() => E.radioSeries.find(
      (t) => t.id === bi || t.name === fi
    )?.items?.length || 0), qt = Y(
      () => new Set(E.radioQueue.map((s) => s.bvid))
    ), We = Y(() => {
      const s = E.radioSeriesName?.trim();
      return s && E.radioSeries.find((t) => t.name === s) || null;
    });
    function vt(s) {
      const t = Math.max(0, Math.floor(Number(s) || 0));
      if (!t) return "";
      const i = Math.floor(t / 60), d = t % 60;
      return `${String(i).padStart(2, "0")}:${String(d).padStart(2, "0")}`;
    }
    J(
      () => E.radioActiveFolderId,
      (s, t) => {
        s !== t ? De.value = 1 : De.value > Ye.value && (De.value = Ye.value);
      }
    ), J(
      () => E.radioQueue.length,
      () => {
        ke.value > je.value && (ke.value = je.value);
      }
    );
    function ai(s) {
      ct.value = !0, s.dataTransfer && (s.dataTransfer.dropEffect = "copy");
    }
    function ri(s) {
      const t = s.currentTarget, i = s.relatedTarget;
      (!t || !i || !t.contains(i)) && (ct.value = !1);
    }
    function ui(s) {
      ct.value = !1;
      const t = s.dataTransfer;
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
    return (s, t) => (o(), l("section", {
      id: "daily-bilibili",
      class: P(["card wide", { "card-fullscreen": r(Ht) || r(xi).activeId === "daily-bilibili" }])
    }, [
      e("div", Us, [
        e("div", Ns, [
          e("div", {
            class: P(["fo-bili-layout", { "fo-picking-move-target": u.value.isTargetPickMode, "has-workspace-wallpaper": !!r(p) }]),
            style: we(r(p)),
            "data-vue-organizer-shell": "true",
            onWheel: ti
          }, [
            _e(Ii, { media: r(m) }, null, 8, ["media"]),
            e("aside", qs, [
              e("div", {
                class: P(["fo-sidebar-toggle-bar", { "is-collapsed": ce.value }]),
                title: ce.value ? r(R)("bili.channel.expandTip") : r(R)("bili.channel.collapseTip"),
                onClick: Je
              }, [
                e("div", Os, [
                  t[60] || (t[60] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                  e("span", null, n(r(R)("bili.channel.title")), 1),
                  ce.value ? (o(), l("span", Ws, "5")) : g("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "fo-sidebar-toggle-action",
                  "aria-expanded": !ce.value,
                  title: ce.value ? r(R)("bili.channel.expand") : r(R)("bili.channel.collapse")
                }, [
                  e("span", null, n(ce.value ? r(R)("bili.channel.expand") : r(R)("bili.channel.collapse")), 1),
                  e("span", js, n(ce.value ? "▾" : "▴"), 1)
                ], 8, Ys)
              ], 10, Gs),
              ue(e("div", Ks, [
                e("div", Qs, [
                  e("button", {
                    id: "fo-sidebar-cache-btn",
                    type: "button",
                    class: P(["fo-sidebar-sub-btn", { on: u.value.mode === "cache" }]),
                    title: r(R)("bili.channel.cacheVideoTip"),
                    onClick: t[0] || (t[0] = (i) => a("open-cache"))
                  }, [
                    e("div", Xs, [
                      t[61] || (t[61] = e("span", { class: "fo-sidebar-sub-icon" }, "💾", -1)),
                      e("div", Js, [
                        e("strong", null, n(r(R)("bili.channel.cacheVideo")), 1),
                        e("small", null, n(r(R)("bili.channel.cacheVideoSub")), 1)
                      ])
                    ]),
                    t[62] || (t[62] = e("span", { class: "fo-sidebar-sub-badge" }, "LOCAL", -1))
                  ], 10, Hs)
                ]),
                e("div", Zs, [
                  e("button", {
                    id: "fo-sidebar-following-btn",
                    type: "button",
                    class: P(["fo-sidebar-sub-btn", { on: u.value.mode === "following" }]),
                    title: r(R)("bili.channel.followingTip"),
                    onClick: t[1] || (t[1] = (i) => a("open-following"))
                  }, [
                    e("div", tn, [
                      t[63] || (t[63] = e("span", { class: "fo-sidebar-sub-icon" }, "📺", -1)),
                      e("div", on, [
                        e("strong", null, n(r(R)("bili.channel.following")), 1),
                        e("small", null, n(r(R)("bili.channel.followingSub")), 1)
                      ])
                    ]),
                    t[64] || (t[64] = e("span", { class: "fo-sidebar-sub-badge" }, "FEED", -1))
                  ], 10, en)
                ]),
                e("div", ln, [
                  e("button", {
                    id: "fo-sidebar-recommend-btn",
                    type: "button",
                    class: P(["fo-sidebar-sub-btn", { on: u.value.mode === "recommendations" }]),
                    title: r(R)("bili.channel.forYouTip"),
                    onClick: t[2] || (t[2] = (i) => a("open-recommendations"))
                  }, [
                    e("div", nn, [
                      t[65] || (t[65] = e("span", { class: "fo-sidebar-sub-icon" }, "✨", -1)),
                      e("div", an, [
                        e("strong", null, n(r(R)("bili.channel.forYou")), 1),
                        e("small", null, n(r(R)("bili.channel.forYouSub")), 1)
                      ])
                    ]),
                    t[66] || (t[66] = e("span", { class: "fo-sidebar-sub-badge" }, "FOR YOU", -1))
                  ], 10, sn)
                ]),
                e("div", rn, [
                  e("button", {
                    id: "fo-sidebar-radio-btn",
                    type: "button",
                    class: P(["fo-sidebar-sub-btn", { on: u.value.mode === "radio" }]),
                    title: r(R)("bili.channel.radioTip"),
                    onClick: t[3] || (t[3] = (i) => a("open-radio"))
                  }, [
                    e("div", dn, [
                      t[67] || (t[67] = e("span", { class: "fo-sidebar-sub-icon" }, "📻", -1)),
                      e("div", cn, [
                        e("strong", null, n(r(R)("bili.channel.radio")), 1),
                        e("small", null, n(r(R)("bili.channel.radioSub")), 1)
                      ])
                    ]),
                    t[68] || (t[68] = e("span", { class: "fo-sidebar-sub-badge" }, "RADIO", -1))
                  ], 10, un)
                ])
              ], 512), [
                [Kt, !ce.value]
              ]),
              e("div", vn, [
                e("div", pn, [
                  t[69] || (t[69] = e("span", { class: "fo-sidebar-sub-icon" }, "📁", -1)),
                  e("div", bn, [
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
                }, "＋", 8, fn)
              ]),
              u.value.isTargetPickMode ? (o(), l("div", gn, [
                t[70] || (t[70] = e("div", { class: "fo-move-target-tip" }, [
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
              e("nav", mn, [
                (o(!0), l(B, null, G(u.value.folders, (i, d) => (o(), l(B, {
                  key: `${i.group ? "group" : "folder"}:${i.id}`
                }, [
                  d > 0 && u.value.folders[d - 1]?.kind !== i.kind ? (o(), l("div", hn)) : g("", !0),
                  d === 0 || u.value.folders[d - 1]?.kind !== i.kind ? (o(), l("div", {
                    key: 1,
                    class: P(["fo-bili-section-head fo-vue-section-head", { "drag-into": i.kind === "created" && Se.value }]),
                    onDragover: (S) => i.kind === "created" ? qe(S) : void 0,
                    onDragleave: (S) => i.kind === "created" ? gt(S) : void 0,
                    onDrop: (S) => i.kind === "created" ? mt(S) : void 0
                  }, [
                    e("span", _n, [
                      e("b", null, n(i.kind === "collected" ? "我追的合集/收藏夹" : i.kind === "other" ? "其他收藏" : "我创建的收藏夹"), 1)
                    ]),
                    i.kind === "created" ? (o(), l("button", {
                      key: 0,
                      class: "fo-bili-section-add-btn",
                      type: "button",
                      title: "新建插件分组",
                      "aria-label": "新建插件分组",
                      onClick: t[6] || (t[6] = $((S) => a("create-local-group"), ["stop"]))
                    }, "＋")) : g("", !0)
                  ], 42, yn)) : g("", !0),
                  i.group ? (o(), l("div", {
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
                    onClick: (S) => T(i),
                    onKeydown: [
                      pt($((S) => T(i), ["prevent"]), ["enter"]),
                      pt($((S) => T(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (S) => Ve(S, i),
                    onDragover: (S) => Ue(S, i),
                    onDragleave: (S) => Ne(S, i),
                    onDrop: (S) => Ee(S, i),
                    onDragend: Re
                  }, [
                    e("i", Cn, n(i.collapsed ? "›" : "⌄"), 1),
                    t[72] || (t[72] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, n(i.title), 1),
                    e("small", null, n(i.count), 1)
                  ], 46, $n)) : (o(), l("div", {
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
                    onClick: (S) => T(i),
                    onKeydown: [
                      pt($((S) => T(i), ["prevent"]), ["enter"]),
                      pt($((S) => T(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (S) => Ve(S, i),
                    onDragover: (S) => Ue(S, i),
                    onDragleave: (S) => Ne(S, i),
                    onDrop: (S) => Ee(S, i),
                    onDragend: Re
                  }, [
                    t[71] || (t[71] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, n(i.title), 1),
                    e("small", null, n(i.count), 1)
                  ], 46, kn))
                ], 64))), 128)),
                !u.value.loading && !u.value.error && !u.value.folders.length ? (o(), l("p", wn, "暂无可用收藏夹。")) : g("", !0)
              ])
            ]),
            u.value.mode === "organizer" ? (o(), l("section", {
              key: 0,
              id: "fo-vue-main",
              ref_key: "organizerMain",
              ref: j,
              class: "fo-bili-main"
            }, [
              u.value.loading && !ze.value && !de.value ? (o(), l("div", xn, [...t[73] || (t[73] = [
                e("i", null, null, -1),
                e("span", null, "正在读取 B站收藏内容…", -1)
              ])])) : !ze.value && u.value.error && u.value.error.includes("未登录") ? (o(), l("div", Sn, [
                e("div", Tn, [
                  t[75] || (t[75] = e("span", { class: "fo-bili-login-icon" }, "📺", -1)),
                  t[76] || (t[76] = e("h3", null, "未检测到哔哩哔哩登录状态", -1)),
                  t[77] || (t[77] = e("p", null, "tab-Project 直接复用当前浏览器的 B站 网页会话，无需输入账号密码或扫码授权。", -1)),
                  e("div", Mn, [
                    t[74] || (t[74] = e("a", {
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
              ])) : !ze.value && u.value.error && !de.value ? (o(), l("p", Dn, n(u.value.error), 1)) : (o(), l(B, { key: 3 }, [
                e("header", Pn, [
                  e("div", In, [
                    e("div", {
                      class: P(["fo-bili-cover", { "fo-vue-cover-image": u.value.folderCover }])
                    }, [
                      u.value.folderCover ? (o(), l("img", {
                        key: 0,
                        src: u.value.folderCover,
                        alt: "",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Ln)) : (o(), l("i", Rn))
                    ], 2),
                    e("div", En, [
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
                      onSubmit: $(wt, ["prevent"])
                    }, [
                      ue(e("input", {
                        "onUpdate:modelValue": t[8] || (t[8] = (i) => v.value = i),
                        type: "search",
                        autocomplete: "off",
                        placeholder: r(R)("bili.workspace.searchPlaceholder"),
                        "aria-label": r(R)("bili.workspace.searchAria"),
                        onFocus: zt,
                        onInput: At
                      }, null, 40, Bn), [
                        [xe, v.value]
                      ]),
                      e("button", {
                        type: "submit",
                        title: r(R)("bili.workspace.searchBtnTip")
                      }, "⌕", 8, zn)
                    ], 32),
                    k.value ? (o(), l("div", An, [
                      e("div", Fn, [
                        e("span", null, n(Be.value), 1),
                        e("small", null, n(ne.value), 1)
                      ]),
                      F.value ? (o(), l("p", Vn, "正在获取推荐 / 搜索中…")) : !he.value.length && !F.value ? (o(), l("p", Un, "暂无联想结果，按回车在插件内搜索")) : (o(!0), l(B, { key: 2 }, G(he.value, (i) => (o(), l("button", {
                        key: i.bvid || i.aid,
                        type: "button",
                        class: "card-fullscreen-bili-video-row",
                        role: "option",
                        onClick: (d) => rt(i),
                        onContextmenu: $((d) => $t(d, i), ["prevent"])
                      }, [
                        e("span", qn, [
                          e("img", {
                            src: i.cover,
                            alt: "",
                            referrerpolicy: "no-referrer",
                            loading: "lazy"
                          }, null, 8, Gn),
                          i.durationText ? (o(), l("i", On, n(i.durationText), 1)) : g("", !0)
                        ]),
                        e("span", Wn, [
                          e("strong", null, n(i.title), 1),
                          e("small", null, n(i.upper) + " · " + n(i.playText) + "播放", 1)
                        ])
                      ], 40, Nn))), 128))
                    ])) : g("", !0)
                  ], 512),
                  e("div", Yn, [
                    e("button", {
                      id: "bili-header-msg-center-btn",
                      class: P(["fm-tab bili-header-msg-btn hero-action-btn", { "is-active": r(Ti).isOpen }]),
                      type: "button",
                      title: r(R)("bili.workspace.msgCenterTip"),
                      onClick: me
                    }, [
                      t[78] || (t[78] = e("span", { class: "bili-header-msg-icon" }, "🔔", -1)),
                      e("span", Kn, n(r(R)("bili.workspace.msgBtn")), 1)
                    ], 10, jn),
                    e("button", {
                      type: "button",
                      class: "primary hero-action-btn",
                      disabled: !u.value.videos.length,
                      onClick: t[9] || (t[9] = (i) => a("organizer-batch-toggle"))
                    }, n(u.value.batchMode ? r(R)("bili.workspace.batchBack") : r(R)("bili.workspace.batch")), 9, Qn)
                  ])
                ]),
                e("div", Hn, [
                  u.value.batchMode ? g("", !0) : (o(), l("div", Xn, [
                    (o(!0), l(B, null, G([{ id: "fav_time", text: r(R)("bili.sort.favTime") }, { id: "view", text: r(R)("bili.sort.view") }, { id: "pubtime", text: r(R)("bili.sort.pubTime") }], (i) => (o(), l("button", {
                      key: i.id,
                      type: "button",
                      class: P({ on: u.value.sort === i.id }),
                      onClick: (d) => a("organizer-sort", i.id)
                    }, n(i.text), 11, Jn))), 128))
                  ])),
                  e("div", Zn, [
                    r(ye).isOpen && r(ye).bvid ? (o(), l("div", {
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
                        e("span", ta, n(r(ye).title), 1)
                      ]),
                      e("div", ia, [
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-close",
                          title: "关闭视频",
                          onClick: $(c, ["stop"])
                        }, " ✕ "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-sub",
                          title: "查看该视频完整纯文本字幕",
                          onClick: $(Ze, ["stop"])
                        }, " 字幕 "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-expand",
                          title: r(ye).collapsed ? "放大恢复视频小窗" : "聚焦视频小窗",
                          onClick: $(_, ["stop"])
                        }, " 放大 ", 8, oa)
                      ])
                    ], 10, ea)) : g("", !0)
                  ]),
                  u.value.batchMode ? (o(), l("div", la, [
                    e("span", sa, "已选择 " + n(u.value.selectedCount) + " 项", 1),
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
                  ])) : (o(), l("form", {
                    key: 1,
                    class: "fo-bili-search",
                    onSubmit: $(x, ["prevent"])
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
                    t[79] || (t[79] = e("button", {
                      type: "submit",
                      title: "搜索"
                    }, "⌕", -1))
                  ], 32))
                ]),
                u.value.error ? (o(), l("p", na, n(u.value.error), 1)) : g("", !0),
                e("div", {
                  class: "fo-bili-grid fo-favorites-grid",
                  style: we({ "--favorite-columns": u.value.pageSize / 3 }),
                  "aria-busy": u.value.loading
                }, [
                  u.value.videos.length ? g("", !0) : (o(), l("p", ra, n(u.value.query ? "没有找到匹配的视频。" : "这个收藏夹是空的。"), 1)),
                  (o(!0), l(B, null, G(u.value.videos, (i) => (o(), l("article", {
                    key: i.id,
                    class: P(["fo-bili-card", { "batch-selected": i.selected, "fo-single-moving": u.value.movingVideoId === i.id }]),
                    "data-batch-id": i.id,
                    onContextmenu: $((d) => Ut(d, i), ["prevent", "stop"])
                  }, [
                    e("div", da, [
                      u.value.batchMode ? (o(), l("label", ca, [
                        e("input", {
                          type: "checkbox",
                          checked: i.selected,
                          onChange: (d) => a("organizer-batch-select", i.id)
                        }, null, 40, va),
                        t[80] || (t[80] = e("span", null, "✓", -1))
                      ])) : g("", !0),
                      e("a", {
                        class: "fo-cover-link",
                        draggable: "false",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: $((d) => a("organizer-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          draggable: "false",
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, ba)
                      ], 8, pa),
                      e("span", fa, "▣ " + n(i.playCount), 1),
                      e("span", ga, n(i.duration), 1)
                    ]),
                    e("div", ma, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: $((d) => a("organizer-play-video", i), ["prevent"])
                      }, n(i.title), 9, ha),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": U.value === i.id,
                        onClick: $((d) => xt(i.id), ["stop"])
                      }, "⋮", 8, ya),
                      U.value === i.id ? (o(), l("div", _a, [
                        i.writable ? (o(), l("button", {
                          key: 0,
                          type: "button",
                          class: "danger",
                          onClick: (d) => Mt(i.id, "delete")
                        }, "取消收藏", 8, ka)) : g("", !0),
                        i.writable ? (o(), l("button", {
                          key: 1,
                          type: "button",
                          onClick: (d) => Mt(i.id, "move")
                        }, "移动到", 8, $a)) : g("", !0),
                        e("button", {
                          type: "button",
                          onClick: (d) => Mt(i.id, "subtitle")
                        }, "字幕", 8, Ca)
                      ])) : g("", !0)
                    ]),
                    e("div", wa, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: $((d) => O(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, n(i.author), 9, xa),
                      e("span", null, "收藏于 " + n(i.favoriteDate), 1)
                    ])
                  ], 42, ua))), 128))
                ], 12, aa),
                u.value.totalPages > 1 ? (o(), l("div", Sa, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: u.value.loading || u.value.page <= 1,
                    onClick: t[15] || (t[15] = (i) => a("organizer-page", u.value.page - 1))
                  }, "‹ 上一页", 8, Ta),
                  e("span", Ma, n(u.value.page) + " / " + n(u.value.totalPages), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: u.value.loading || u.value.page >= u.value.totalPages,
                    onClick: t[16] || (t[16] = (i) => a("organizer-page", u.value.page + 1))
                  }, "下一页 ›", 8, Da)
                ])) : g("", !0)
              ], 64))
            ], 512)) : u.value.mode === "cache" ? (o(), l("section", {
              key: 1,
              id: "fo-vue-cache-main",
              ref_key: "organizerMain",
              ref: j,
              class: "fo-bili-main"
            }, [
              ie.value ? (o(), Pt(Fl, {
                key: 0,
                active: r(oe),
                onBack: t[17] || (t[17] = (i) => ie.value = !1)
              }, null, 8, ["active"])) : (o(), l(B, { key: 1 }, [
                e("header", Pa, [
                  e("div", Ia, [
                    t[82] || (t[82] = e("div", { class: "fo-bili-cover" }, "💾", -1)),
                    e("div", La, [
                      t[81] || (t[81] = e("h3", null, "缓存视频", -1)),
                      e("p", null, n(u.value.cachedVideos.length) + " 个缓存记录 · 点击缓存设置管理存放目录", 1)
                    ])
                  ]),
                  e("div", Ra, [
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
                u.value.cacheLoading ? (o(), l("div", Ea, [...t[83] || (t[83] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取本地缓存…", -1)
                ])])) : (o(), l("div", {
                  key: 1,
                  class: "fo-bili-grid fo-favorites-grid fo-cached-video-grid",
                  style: we({ "--favorite-columns": K.value })
                }, [
                  u.value.cachedVideos.length ? g("", !0) : (o(), l("p", Ba, "还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。")),
                  (o(!0), l(B, null, G(se.value, (i) => (o(), l("article", {
                    key: i.id,
                    class: "fo-bili-card fo-cached-video-card"
                  }, [
                    e("div", za, [
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
                        }, null, 8, Fa),
                        t[84] || (t[84] = e("span", { class: "fo-cached-local-badge" }, "LOCAL", -1))
                      ], 8, Aa)
                    ]),
                    e("div", Va, [
                      e("button", {
                        class: "fo-title-link fo-bili-title fo-cached-title",
                        type: "button",
                        onClick: (d) => a("cache-play", i.id)
                      }, n(i.title), 9, Ua),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "删除缓存",
                        onClick: (d) => a("cache-delete", i.id)
                      }, "×", 8, Na)
                    ]),
                    e("div", qa, [
                      e("span", null, n(i.sizeText), 1),
                      e("span", null, "缓存于 " + n(i.cachedDate), 1)
                    ])
                  ]))), 128))
                ], 4)),
                ee.value > 1 ? (o(), l("div", Ga, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: Q.value <= 1,
                    onClick: t[20] || (t[20] = (i) => Q.value--)
                  }, "‹ 上一页", 8, Oa),
                  e("span", Wa, n(Q.value) + " / " + n(ee.value), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: Q.value >= ee.value,
                    onClick: t[21] || (t[21] = (i) => Q.value++)
                  }, "下一页 ›", 8, Ya)
                ])) : g("", !0)
              ], 64))
            ], 512)) : u.value.mode === "recommendations" ? (o(), l("section", {
              key: 2,
              id: "fo-vue-recommend-main",
              ref_key: "organizerMain",
              ref: j,
              class: "fo-bili-main"
            }, [
              e("header", ja, [
                t[85] || (t[85] = e("div", { class: "fo-bili-cover fo-vue-recommend-cover" }, [
                  e("span", null, "✨")
                ], -1)),
                e("div", Ka, [
                  e("div", Qa, [
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
                    onSubmit: $(wt, ["prevent"])
                  }, [
                    ue(e("input", {
                      "onUpdate:modelValue": t[22] || (t[22] = (i) => v.value = i),
                      type: "search",
                      autocomplete: "off",
                      placeholder: r(R)("bili.workspace.searchPlaceholder"),
                      "aria-label": r(R)("bili.workspace.searchAria"),
                      onFocus: zt,
                      onInput: At
                    }, null, 40, Ha), [
                      [xe, v.value]
                    ]),
                    e("button", {
                      type: "submit",
                      title: r(R)("bili.workspace.searchBtnTip")
                    }, "⌕", 8, Xa)
                  ], 32),
                  k.value ? (o(), l("div", Ja, [
                    e("div", Za, [
                      e("span", null, n(Be.value), 1),
                      e("small", null, n(ne.value), 1)
                    ]),
                    F.value ? (o(), l("p", er, "正在获取推荐 / 搜索中…")) : !he.value.length && !F.value ? (o(), l("p", tr, "暂无联想结果，按回车在插件内搜索")) : (o(!0), l(B, { key: 2 }, G(he.value, (i) => (o(), l("button", {
                      key: i.bvid || i.aid,
                      type: "button",
                      class: "card-fullscreen-bili-video-row",
                      role: "option",
                      onClick: (d) => rt(i),
                      onContextmenu: $((d) => $t(d, i), ["prevent"])
                    }, [
                      e("span", or, [
                        e("img", {
                          src: i.cover,
                          alt: "",
                          referrerpolicy: "no-referrer",
                          loading: "lazy"
                        }, null, 8, lr),
                        i.durationText ? (o(), l("i", sr, n(i.durationText), 1)) : g("", !0)
                      ]),
                      e("span", nr, [
                        e("strong", null, n(i.title), 1),
                        e("small", null, n(i.upper) + " · " + n(i.playText) + "播放", 1)
                      ])
                    ], 40, ir))), 128))
                  ])) : g("", !0)
                ], 512),
                e("div", ar, [
                  e("button", {
                    type: "button",
                    onClick: t[23] || (t[23] = (i) => a("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              ze.value ? (o(), l(B, { key: 0 }, [
                e("div", rr, [
                  e("div", ur, [
                    e("span", dr, "搜索结果：" + n(Oe.value), 1)
                  ]),
                  e("div", { class: "fo-bili-actions" }, [
                    e("button", {
                      type: "button",
                      onClick: Ct
                    }, "返回个性推荐")
                  ])
                ]),
                st.value ? (o(), l("div", cr, [...t[86] || (t[86] = [
                  e("i", null, null, -1),
                  e("span", null, "正在搜索 B站视频…", -1)
                ])])) : nt.value ? (o(), l("div", vr, [
                  e("p", null, n(nt.value), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    onClick: t[24] || (t[24] = (i) => ut(Oe.value, re.value))
                  }, "重试")
                ])) : (o(), l(B, { key: 2 }, [
                  e("div", pr, [
                    at.value.length ? g("", !0) : (o(), l("p", br, "没有找到相关视频，换个关键词试试。")),
                    (o(!0), l(B, null, G(at.value, (i) => (o(), l("article", {
                      key: i.bvid || i.aid,
                      class: "fo-bili-card",
                      onContextmenu: $((d) => $t(d, i), ["prevent", "stop"])
                    }, [
                      e("div", gr, [
                        e("a", {
                          class: "fo-cover-link",
                          href: `https://www.bilibili.com/video/${i.bvid || `av${i.aid}`}`,
                          onClick: $((d) => rt(i), ["prevent"])
                        }, [
                          e("img", {
                            loading: "lazy",
                            decoding: "async",
                            referrerpolicy: "no-referrer",
                            src: i.cover,
                            alt: ""
                          }, null, 8, hr)
                        ], 8, mr),
                        e("span", yr, "▣ " + n(i.playText), 1),
                        e("span", _r, n(i.durationText), 1)
                      ]),
                      e("div", kr, [
                        e("a", {
                          class: "fo-title-link fo-bili-title",
                          href: `https://www.bilibili.com/video/${i.bvid || `av${i.aid}`}`,
                          onClick: $((d) => rt(i), ["prevent"])
                        }, n(i.title), 9, $r)
                      ]),
                      e("div", Cr, [
                        e("span", null, n(i.upper), 1)
                      ])
                    ], 40, fr))), 128))
                  ]),
                  re.value > 1 || lt.value ? (o(), l("div", wr, [
                    e("button", {
                      type: "button",
                      class: "fo-btn",
                      disabled: re.value <= 1,
                      onClick: t[25] || (t[25] = (i) => ut(Oe.value, re.value - 1))
                    }, "‹ 上一页", 8, xr),
                    e("span", Sr, n(re.value) + n(Te.value ? ` / ${Te.value}` : ""), 1),
                    e("button", {
                      type: "button",
                      class: "fo-btn",
                      disabled: !lt.value,
                      onClick: t[26] || (t[26] = (i) => ut(Oe.value, re.value + 1))
                    }, "下一页 ›", 8, Tr)
                  ])) : g("", !0)
                ], 64))
              ], 64)) : (o(), l(B, { key: 1 }, [
                e("div", Mr, [
                  t[87] || (t[87] = e("div", { class: "fo-bili-sort" }, [
                    e("span", { class: "fo-vue-feed-label" }, "🔥 猜你喜欢与热门精选")
                  ], -1)),
                  e("div", Dr, "本页共 " + n(u.value.specialVideos.length) + " 个视频", 1)
                ]),
                u.value.specialLoading ? (o(), l("div", Pr, [...t[88] || (t[88] = [
                  e("i", null, null, -1),
                  e("span", null, "正在加载个性化推荐视频…", -1)
                ])])) : u.value.specialError ? (o(), l("p", Ir, n(u.value.specialError), 1)) : (o(), l("div", {
                  key: 2,
                  class: "fo-bili-grid fo-favorites-grid",
                  style: we({ "--favorite-columns": K.value })
                }, [
                  u.value.specialVideos.length ? g("", !0) : (o(), l("p", Lr, "暂无推荐视频。")),
                  (o(!0), l(B, null, G(u.value.specialVideos, (i) => (o(), l("article", {
                    key: i.id,
                    class: "fo-bili-card"
                  }, [
                    e("div", Rr, [
                      e("a", {
                        class: "fo-cover-link",
                        draggable: "false",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: $((d) => a("special-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          draggable: "false",
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, Br)
                      ], 8, Er),
                      e("span", zr, "▣ " + n(i.playCount), 1),
                      e("span", Ar, n(i.duration), 1)
                    ]),
                    e("div", Fr, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: $((d) => a("special-play-video", i), ["prevent"])
                      }, n(i.title), 9, Vr),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": U.value === i.id,
                        onClick: $((d) => xt(i.id), ["stop"])
                      }, "⋮", 8, Ur),
                      U.value === i.id ? (o(), l("div", Nr, [
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            a("special-video-action", { video: i, id: i.id, action: "collect-inbox" }), U.value = "";
                          }
                        }, "📥 添加到收集箱", 8, qr),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            a("special-video-action", { id: i.id, action: "play" }), U.value = "";
                          }
                        }, "本地播放与评论", 8, Gr),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            a("special-video-action", { id: i.id, action: "subtitle" }), U.value = "";
                          }
                        }, "字幕提取", 8, Or),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            a("special-video-action", { id: i.id, action: "cache" }), U.value = "";
                          }
                        }, "缓存视频", 8, Wr),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            a("special-video-action", { id: i.id, action: "open" }), U.value = "";
                          }
                        }, "打开网页", 8, Yr)
                      ])) : g("", !0)
                    ]),
                    e("div", jr, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: $((d) => O(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, n(i.author), 9, Kr),
                      e("span", null, n(i.favoriteDate), 1)
                    ])
                  ]))), 128))
                ], 4)),
                e("div", Qr, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: u.value.specialLoading || u.value.specialPage <= 1,
                    onClick: t[27] || (t[27] = (i) => a("recommendations-page", u.value.specialPage - 1))
                  }, "‹ 上一页", 8, Hr),
                  e("span", Xr, "第 " + n(u.value.specialPage) + " 页", 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: u.value.specialLoading,
                    onClick: t[28] || (t[28] = (i) => a("recommendations-page", u.value.specialPage + 1))
                  }, "下一页 ›", 8, Jr)
                ])
              ], 64))
            ], 512)) : u.value.mode === "following" ? (o(), l("section", {
              key: 3,
              id: "fo-vue-following-main",
              ref_key: "organizerMain",
              ref: j,
              class: "fo-bili-main"
            }, [
              e("header", Zr, [
                t[89] || (t[89] = e("div", { class: "fo-bili-cover fo-vue-following-cover" }, [
                  e("span", null, "📺")
                ], -1)),
                e("div", eu, [
                  e("div", tu, [
                    e("h3", null, n(u.value.specialTitle), 1),
                    u.value.specialBadge !== `第 ${u.value.specialPage} 页` ? (o(), l("span", iu, n(u.value.specialBadge), 1)) : g("", !0)
                  ]),
                  e("p", null, n(u.value.specialSubtitle), 1)
                ]),
                e("div", ou, [
                  e("div", {
                    class: "fo-up-groups-list",
                    onWheel: t[29] || (t[29] = //@ts-ignore
                    (...i) => r(Yt) && r(Yt)(...i))
                  }, [
                    (o(!0), l(B, null, G(u.value.followingGroups, (i) => (o(), l("button", {
                      key: i.id,
                      type: "button",
                      class: P(["fo-up-group-chip", { active: i.active }]),
                      onClick: (d) => a("following-group", i.id)
                    }, [
                      ge(n(i.child ? "↳ " : "") + n(i.name) + " ", 1),
                      e("small", su, n(i.count), 1)
                    ], 10, lu))), 128))
                  ], 32),
                  e("div", nu, [
                    e("button", {
                      id: "bili-following-up-group-manager",
                      type: "button",
                      title: r(R)("bili.workspace.upGroupManagerTip"),
                      onClick: t[30] || (t[30] = (i) => a("manage-up-groups"))
                    }, n(r(R)("bili.workspace.upGroupManager")), 9, au)
                  ])
                ]),
                e("div", ru, [
                  e("button", {
                    type: "button",
                    onClick: t[31] || (t[31] = (i) => a("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              u.value.followingMembers.length ? (o(), l("div", uu, [
                e("div", du, [
                  e("b", null, n(u.value.specialBadge), 1),
                  e("small", null, "共 " + n(u.value.followingMembers.length) + " 位 UP 主", 1)
                ]),
                e("div", cu, [
                  e("button", {
                    type: "button",
                    class: P(["fo-up-member-chip", { active: !u.value.followingMembers.some((i) => i.active) }]),
                    onClick: t[32] || (t[32] = (i) => a("following-member", ""))
                  }, "全部UP", 2),
                  (o(!0), l(B, null, G(u.value.followingMembers, (i) => (o(), l("button", {
                    key: i.id,
                    type: "button",
                    class: P(["fo-up-member-chip", { active: i.active }]),
                    title: `左键筛选「${i.name}」，右键预览近期投稿`,
                    onClick: (d) => a("following-member", i.id),
                    onContextmenu: $((d) => a("following-preview-member", { id: i.id, clientX: d.clientX, clientY: d.clientY }), ["prevent"])
                  }, [
                    i.face ? (o(), l("img", {
                      key: 0,
                      loading: "lazy",
                      referrerpolicy: "no-referrer",
                      src: i.face,
                      alt: ""
                    }, null, 8, pu)) : g("", !0),
                    e("span", null, n(i.name), 1)
                  ], 42, vu))), 128))
                ]),
                e("button", {
                  type: "button",
                  class: "fo-btn-manage-members",
                  onClick: t[33] || (t[33] = (i) => a("following-manage-groups", "members"))
                }, "＋ 管理成员")
              ])) : g("", !0),
              e("div", bu, [
                t[90] || (t[90] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "⚡ UP 主最新投稿动态")
                ], -1)),
                e("div", fu, "本页共 " + n(u.value.specialVideos.length) + " 个视频", 1)
              ]),
              u.value.specialLoading ? (o(), l("div", gu, [...t[91] || (t[91] = [
                e("i", null, null, -1),
                e("span", null, "正在读取关注 UP 主更新…", -1)
              ])])) : u.value.specialError ? (o(), l("p", mu, n(u.value.specialError), 1)) : (o(), l("div", {
                key: 3,
                class: "fo-bili-grid fo-favorites-grid",
                style: we({ "--favorite-columns": K.value })
              }, [
                u.value.specialVideos.length ? g("", !0) : (o(), l("p", hu, "暂无最新关注视频动态。")),
                (o(!0), l(B, null, G(u.value.specialVideos, (i) => (o(), l("article", {
                  key: i.id,
                  class: "fo-bili-card"
                }, [
                  e("div", yu, [
                    e("a", {
                      class: "fo-cover-link",
                      draggable: "false",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: $((d) => a("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        draggable: "false",
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, ku)
                    ], 8, _u),
                    e("span", $u, "▣ " + n(i.playCount), 1),
                    e("span", Cu, n(i.duration), 1)
                  ]),
                  e("div", wu, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: $((d) => a("special-play-video", i), ["prevent"])
                    }, n(i.title), 9, xu),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": U.value === i.id,
                      onClick: $((d) => xt(i.id), ["stop"])
                    }, "⋮", 8, Su),
                    U.value === i.id ? (o(), l("div", Tu, [
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          a("special-video-action", { video: i, id: i.id, action: "play" }), U.value = "";
                        }
                      }, "本地播放与评论", 8, Mu),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          a("special-video-action", { video: i, id: i.id, action: "subtitle" }), U.value = "";
                        }
                      }, "字幕提取", 8, Du),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          a("special-video-action", { video: i, id: i.id, action: "cache" }), U.value = "";
                        }
                      }, "缓存视频", 8, Pu),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          a("special-video-action", { video: i, id: i.id, action: "open" }), U.value = "";
                        }
                      }, "打开网页", 8, Iu)
                    ])) : g("", !0)
                  ]),
                  e("div", Lu, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: $((d) => O(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, n(i.author), 9, Ru),
                    e("span", null, n(i.favoriteDate), 1)
                  ])
                ]))), 128))
              ], 4)),
              e("div", Eu, [
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: u.value.specialLoading || u.value.specialPage <= 1,
                  onClick: t[34] || (t[34] = (i) => a("following-page", u.value.specialPage - 1))
                }, "‹ 上一页", 8, Bu),
                e("span", zu, "第 " + n(u.value.specialPage) + " 页", 1),
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: u.value.specialLoading || !u.value.followingHasMore,
                  onClick: t[35] || (t[35] = (i) => a("following-page", u.value.specialPage + 1))
                }, "下一页 ›", 8, Au)
              ])
            ], 512)) : u.value.mode === "subscription" ? (o(), l("section", Fu, [
              e("div", Vu, [
                u.value.subscriptionLoading ? (o(), l("div", Uu, [...t[92] || (t[92] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取视频与 AI 字幕稿…", -1)
                ])])) : u.value.subscriptionError ? (o(), l("p", Nu, "读取失败：" + n(u.value.subscriptionError), 1)) : !u.value.subscriptionCurrent && !u.value.subscriptionChannels.length ? (o(), l("div", qu, "暂无正在播放的视频。")) : (o(), Pt(Zo, { key: 3 }))
              ])
            ])) : u.value.mode === "radio" ? (o(), l("section", Gu, [
              e("header", Ou, [
                e("div", Wu, [
                  e("div", {
                    class: P(["fo-bili-cover fo-vue-radio-cover", { spinning: r(Ie).playing }])
                  }, [...t[93] || (t[93] = [
                    e("span", null, "📻", -1)
                  ])], 2),
                  e("div", Yu, [
                    e("div", ju, [
                      t[95] || (t[95] = e("h3", null, "B站电台", -1)),
                      r(Ie).active ? (o(), l("span", {
                        key: 0,
                        class: P(["fo-radio-live-pill", { playing: r(Ie).playing }])
                      }, [
                        t[94] || (t[94] = e("i", {
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
                    t[96] || (t[96] = e("p", null, "从左侧挑选收藏夹曲目，点击或拖拽装填进随身听连播队列，支持系列编排与跨刷新不断声", -1))
                  ])
                ]),
                e("div", Ku, [
                  e("button", {
                    type: "button",
                    onClick: t[36] || (t[36] = (i) => a("organizer-open"))
                  }, "← 返回收藏夹")
                ])
              ]),
              e("div", Qu, [
                e("aside", Hu, [
                  t[97] || (t[97] = e("p", { class: "sw-title" }, "收藏夹", -1)),
                  e("div", Xu, [
                    (o(!0), l(B, null, G(r(E).radioFolders, (i) => (o(), l("button", {
                      key: i.id,
                      type: "button",
                      class: P(["bili-radio-folder", { on: i.id === r(E).radioActiveFolderId }]),
                      onClick: (d) => a("radio-select-folder", i.id)
                    }, [
                      e("span", null, n(i.title), 1),
                      e("span", null, n(i.count), 1)
                    ], 10, Ju))), 128)),
                    r(E).radioFolders.length ? g("", !0) : (o(), l("p", Zu, n(r(E).radioLoading ? "加载中…" : "暂无收藏夹"), 1))
                  ])
                ]),
                e("section", ed, [
                  e("div", td, [
                    t[98] || (t[98] = e("p", {
                      id: "bili-radio-library-title",
                      class: "sw-title"
                    }, "收藏夹视频", -1)),
                    Ye.value > 1 ? (o(), l("div", id, [
                      e("button", {
                        type: "button",
                        disabled: De.value <= 1,
                        "aria-label": "上一页",
                        onClick: t[37] || (t[37] = (i) => De.value--)
                      }, "‹", 8, od),
                      e("span", null, n(De.value) + " / " + n(Ye.value), 1),
                      e("button", {
                        type: "button",
                        disabled: De.value >= Ye.value,
                        "aria-label": "下一页",
                        onClick: t[38] || (t[38] = (i) => De.value++)
                      }, "›", 8, ld)
                    ])) : g("", !0)
                  ]),
                  r(E).radioError ? (o(), l("p", sd, n(r(E).radioError), 1)) : g("", !0),
                  e("div", nd, [
                    (o(!0), l(B, null, G(li.value, (i) => (o(), l("article", {
                      key: i.bvid,
                      class: P(["fo-bili-card bili-radio-card", { "in-queue": qt.value.has(i.bvid) }]),
                      title: `${i.title} (点击或拖入右侧队列，点击 ♥ 喜欢)`,
                      draggable: "true",
                      onDragstart: (d) => oi(d, i),
                      onClick: (d) => a("radio-add", { bvid: i.bvid, title: i.title, cover: i.cover, author: i.author, duration: i.duration })
                    }, [
                      e("div", rd, [
                        i.cover ? (o(), l("img", {
                          key: 0,
                          src: i.cover,
                          alt: "",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, ud)) : (o(), l("span", dd)),
                        vt(i.duration) ? (o(), l("span", cd, n(vt(i.duration)), 1)) : g("", !0)
                      ]),
                      e("div", vd, [
                        e("div", pd, [
                          e("span", bd, n(i.title), 1),
                          e("button", {
                            type: "button",
                            class: P(["fo-card-more bili-radio-like-btn", { liked: r(Ce).isLiked(i.bvid) }]),
                            title: r(Ce).isLiked(i.bvid) ? "取消喜欢" : "添加到我喜欢的电台",
                            "aria-label": r(Ce).isLiked(i.bvid) ? "取消喜欢" : "喜欢",
                            onClick: $((d) => {
                              r(Ce).toggleLike(i);
                            }, ["stop"])
                          }, n(r(Ce).isLiked(i.bvid) ? "♥" : "♡"), 11, fd)
                        ]),
                        e("div", gd, [
                          e("span", null, n(i.author || "Bilibili"), 1),
                          qt.value.has(i.bvid) ? (o(), l("span", md, "✓ 已入队")) : (o(), l("span", hd, "+ 入队"))
                        ])
                      ])
                    ], 42, ad))), 128)),
                    r(E).radioVideos.length ? g("", !0) : (o(), l("p", yd, n(r(E).radioLoading ? "读取视频中…" : "此收藏夹暂无可播放视频"), 1))
                  ])
                ]),
                e("section", _d, [
                  e("div", kd, [
                    e("button", {
                      type: "button",
                      class: "bili-radio-liked-pill",
                      title: "一键载入「我喜欢的电台」到当前连播队列",
                      onClick: t[39] || (t[39] = (i) => r(Ce).openLikedSeries())
                    }, [
                      t[99] || (t[99] = e("span", { class: "heart" }, "♥", -1)),
                      t[100] || (t[100] = e("span", null, "我喜欢的电台", -1)),
                      e("small", null, n(ni.value), 1)
                    ]),
                    ue(e("input", {
                      id: "bili-radio-name",
                      "onUpdate:modelValue": t[40] || (t[40] = (i) => r(E).radioSeriesName = i),
                      maxlength: "48",
                      class: P({ "has-error": C.value }),
                      placeholder: C.value ? "⚠️ 请输入歌单名称" : "歌单名称（可选）",
                      autocomplete: "off",
                      onInput: t[41] || (t[41] = (i) => C.value = !1),
                      onKeydown: t[42] || (t[42] = (i) => r(Et)(i, M))
                    }, null, 42, $d), [
                      [xe, r(E).radioSeriesName]
                    ]),
                    e("div", Cd, [
                      e("button", {
                        id: "bili-radio-save",
                        type: "button",
                        title: "保存当前队列",
                        onClick: M
                      }, " 💾 保存 "),
                      We.value ? (o(), l("button", {
                        key: 0,
                        type: "button",
                        class: P(["bili-radio-del-btn", { confirming: D.value === We.value.id }]),
                        title: D.value === We.value.id ? "再次点击确认删除当前歌单" : `删除歌单「${We.value.name}」`,
                        onClick: t[43] || (t[43] = (i) => q(We.value.id))
                      }, n(D.value === We.value.id ? "确认删除?" : "🗑️"), 11, wd)) : g("", !0),
                      _e(Ot, {
                        id: "bili-radio-share",
                        compact: "",
                        label: "🚀 分享",
                        visible: !0,
                        onSelect: Zt
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
                        onClick: t[44] || (t[44] = (i) => I.value = !I.value)
                      }, [
                        e("span", null, n(r(E).radioSeries.length ? `📚 歌单 (${r(E).radioSeries.length})` : "📚 暂无歌单"), 1),
                        t[101] || (t[101] = e("span", { class: "caret" }, "▾", -1))
                      ], 8, xd),
                      I.value ? (o(), l("div", Sd, [
                        e("button", {
                          type: "button",
                          class: "bili-radio-series-new",
                          onClick: A
                        }, " ＋ 新建空白歌单 "),
                        r(E).radioSeries.length ? (o(), l("div", Td, [
                          (o(!0), l(B, null, G(r(E).radioSeries, (i) => (o(), l("div", {
                            key: i.id,
                            class: P(["bili-radio-series-item", { active: We.value?.id === i.id }])
                          }, [
                            e("button", {
                              type: "button",
                              class: "bili-radio-series-pick",
                              onClick: (d) => Z(i.id)
                            }, [
                              e("span", Dd, n(i.name), 1),
                              e("small", null, n(i.count) + "首", 1)
                            ], 8, Md),
                            e("button", {
                              type: "button",
                              class: P(["bili-radio-series-del", { confirming: D.value === i.id }]),
                              title: D.value === i.id ? "再次点击确认删除" : `删除歌单「${i.name}」`,
                              onClick: $((d) => q(i.id), ["stop"])
                            }, n(D.value === i.id ? "确认?" : "🗑️"), 11, Pd)
                          ], 2))), 128))
                        ])) : (o(), l("p", Id, "还没有保存过歌单"))
                      ])) : g("", !0)
                    ], 512),
                    je.value > 1 ? (o(), l("div", Ld, [
                      e("button", {
                        type: "button",
                        disabled: ke.value <= 1,
                        "aria-label": "队列上一页",
                        onClick: t[45] || (t[45] = (i) => ke.value--)
                      }, "‹", 8, Rd),
                      e("span", null, n(ke.value) + " / " + n(je.value), 1),
                      e("button", {
                        type: "button",
                        disabled: ke.value >= je.value,
                        "aria-label": "队列下一页",
                        onClick: t[46] || (t[46] = (i) => ke.value++)
                      }, "›", 8, Ed)
                    ])) : g("", !0)
                  ]),
                  e("div", {
                    id: "bili-radio-queue",
                    class: P(["bili-radio-queue two-col bili-radio-card-grid", { over: ct.value }]),
                    "aria-label": "电台播放队列",
                    onDragover: $(ai, ["prevent"]),
                    onDragleave: ri,
                    onDrop: $(ui, ["prevent"])
                  }, [
                    (o(!0), l(B, null, G(si.value, ({ item: i, index: d }) => (o(), l("article", {
                      key: `${i.bvid}-${d}`,
                      class: P(["fo-bili-card bili-radio-card bili-radio-queue-card", { "is-playing": r(Ie).active && r(Ie).trackIndex === d + 1 }]),
                      title: "点击立即从该曲目开始播放",
                      onClick: (S) => a("radio-play-index", d)
                    }, [
                      e("div", zd, [
                        i.cover ? (o(), l("img", {
                          key: 0,
                          src: i.cover,
                          alt: "",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, Ad)) : (o(), l("span", Fd)),
                        e("span", Vd, n(r(Ie).active && r(Ie).trackIndex === d + 1 ? "♪ 播放中" : `#${d + 1}`), 1),
                        e("button", {
                          type: "button",
                          class: "bili-radio-card-remove",
                          "aria-label": `移除 ${i.title}`,
                          title: "从队列移除",
                          onClick: $((S) => a("radio-remove", { index: d }), ["stop"])
                        }, "×", 8, Ud),
                        vt(i.duration) ? (o(), l("span", Nd, n(vt(i.duration)), 1)) : g("", !0)
                      ]),
                      e("div", qd, [
                        e("div", Gd, [
                          e("span", Od, n(i.title), 1),
                          e("button", {
                            type: "button",
                            class: P(["fo-card-more bili-radio-like-btn", { liked: r(Ce).isLiked(i.bvid) }]),
                            title: r(Ce).isLiked(i.bvid) ? "取消喜欢" : "添加到我喜欢的电台",
                            onClick: $((S) => {
                              r(Ce).toggleLike(i);
                            }, ["stop"])
                          }, n(r(Ce).isLiked(i.bvid) ? "♥" : "♡"), 11, Wd)
                        ]),
                        e("div", Yd, [
                          e("span", null, n(i.author || "Bilibili"), 1)
                        ])
                      ])
                    ], 10, Bd))), 128)),
                    r(E).radioQueue.length ? g("", !0) : (o(), l("p", jd, "点击或直接从左侧拖入视频到此处，即可连播。"))
                  ], 34),
                  e("div", Kd, [
                    e("button", {
                      id: "bili-radio-play",
                      type: "button",
                      disabled: !r(E).radioQueue.length,
                      onClick: t[47] || (t[47] = (i) => a("radio-play"))
                    }, "▶ 按顺序播放", 8, Qd),
                    e("button", {
                      id: "bili-radio-shuffle",
                      type: "button",
                      disabled: !r(E).radioQueue.length,
                      onClick: t[48] || (t[48] = (i) => a("radio-shuffle"))
                    }, "🔀 随机播放", 8, Hd),
                    e("button", {
                      id: "bili-radio-clear",
                      type: "button",
                      onClick: t[49] || (t[49] = (i) => {
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
      t[114] || (t[114] = e("div", {
        class: "fm-pane",
        id: "pane-sub-video",
        hidden: "",
        style: { display: "none !important" }
      }, null, -1)),
      _e(xl),
      _e(Vs),
      H.value.visible && H.value.video ? (o(), l("div", {
        key: 0,
        ref_key: "videoMenuRef",
        ref: He,
        class: "fo-context-menu",
        role: "menu",
        style: we(r(Xe)),
        onClick: t[59] || (t[59] = $(() => {
        }, ["stop"]))
      }, [
        e("div", {
          class: "fo-context-header",
          title: H.value.video.title
        }, n(H.value.video.title), 9, Xd),
        _e(Ot, {
          label: "💬 发送到聊天室",
          "match-menu-item": "",
          visible: H.value.visible,
          onSelect: ei
        }, null, 8, ["visible"]),
        t[111] || (t[111] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[50] || (t[50] = (i) => Me("play"))
        }, [...t[102] || (t[102] = [
          e("span", { class: "fo-context-icon" }, "▶", -1),
          ge(" 小窗播放视频 ", -1)
        ])]),
        t[112] || (t[112] = e("div", { class: "fo-context-divider" }, null, -1)),
        H.value.video.writable ? (o(), l("button", {
          key: 0,
          type: "button",
          class: "fo-context-item danger",
          onClick: t[51] || (t[51] = (i) => Me("delete"))
        }, [...t[103] || (t[103] = [
          e("span", { class: "fo-context-icon" }, "🗑", -1),
          ge(" 取消收藏 ", -1)
        ])])) : g("", !0),
        H.value.video.writable ? (o(), l("button", {
          key: 1,
          type: "button",
          class: "fo-context-item",
          onClick: t[52] || (t[52] = (i) => Me("move"))
        }, [...t[104] || (t[104] = [
          e("span", { class: "fo-context-icon" }, "📁", -1),
          ge(" 移动到… ", -1)
        ])])) : g("", !0),
        H.value.video.writable ? (o(), l("div", Jd)) : g("", !0),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[53] || (t[53] = (i) => Me("open"))
        }, [...t[105] || (t[105] = [
          e("span", { class: "fo-context-icon" }, "↗", -1),
          ge(" 跳转到 B站 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[54] || (t[54] = (i) => Me("copy-link"))
        }, [...t[106] || (t[106] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ge(" 复制链接 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[55] || (t[55] = (i) => Me("cache"))
        }, [...t[107] || (t[107] = [
          e("span", { class: "fo-context-icon" }, "💾", -1),
          ge(" 缓存视频 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[56] || (t[56] = (i) => Me("add-radio"))
        }, [...t[108] || (t[108] = [
          e("span", { class: "fo-context-icon" }, "📻", -1),
          ge(" 添加到电台 ", -1)
        ])]),
        t[113] || (t[113] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[57] || (t[57] = (i) => Me("create-task"))
        }, [...t[109] || (t[109] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ge(" 创建任务 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[58] || (t[58] = (i) => Me("subtitle"))
        }, [...t[110] || (t[110] = [
          e("span", { class: "fo-context-icon" }, "▤", -1),
          ge(" 字幕转文本 ", -1)
        ])])
      ], 4)) : g("", !0)
    ], 2));
  }
}), yc = /* @__PURE__ */ Qe(Zd, [["__scopeId", "data-v-7f6dd0ec"]]);
export {
  yc as default
};
