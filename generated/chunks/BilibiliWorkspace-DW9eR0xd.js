import { d as Ve, w as X, e as It, f as o, g as l, F as R, p as ue, z as jt, h as e, q as L, i as K, n as _e, t as n, k as S, b as _, u as r, B as Pe, j as m, s as G, o as Dt, l as Mt, v as Ie, x as Pt, O as Nt, G as Ht, m as ye, L as ri, I as vt } from "./vendor-vue-_upDT3S_.js";
import { e as O, a as Be, c as pe, f as wt, g as p, d as he, h as Se, s as ui, L as xt, i as di, j as ci } from "./up-group-manager-store-sHkUiUZ4.js";
import { biliMiniPlayerState as we, biliMiniPlayerController as bt } from "./mini-player-store-mh4dZhnt.js";
import "./fullscreen-cards.store-CjKJLz-g.js";
import { u as vi } from "./useCardActivity-CIWQA7rX.js";
import { _ as Ze, o as Xt, t as z } from "./_plugin-vue_export-helper-DtNgUcga.js";
import { b as pt } from "./bilibili.service-Brip_1AT.js";
import { d as bi, a as pi } from "./playback-sync-BpM61HUz.js";
import { B as lt, e as Wt, a as Ot } from "./BiliRichText-CrZ4J2GN.js";
import { s as Ae } from "./subtitle-follow-CMrW8CCD.js";
import { i as fi } from "./image-viewer-store-PPUbSYaU.js";
import { g as gi, s as mi } from "./cache-directory-CBBZXa5n.js";
import { a as Z, r as hi, b as yi } from "./radio-player-DI0qcwfC.js";
import { t as _i, w as ki, f as $i, H as Ci } from "./search.service-I5ZPPxGy.js";
import { biliMessagePanelState as wi, biliMessagePanelController as xi } from "./message-panel-store-B5uQTbg4.js";
import { bilibiliChannelService as fe } from "./bilibili-channel.service-BBBASZOl.js";
import { u as Si } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-D41c1nko.js";
import { n as St } from "./store-BodPoZPS.js";
import { u as Ti } from "./workspace-wallpaper-VZA3CcfK.js";
import { W as Mi } from "./WorkspaceWallpaperLayer-BRKnRO7I.js";
function Pi(A, c) {
  let h = 0, $ = A.length;
  for (; h < $; ) {
    const M = Math.floor((h + $) / 2);
    A[M].time < c ? h = M + 1 : $ = M;
  }
  return h;
}
function Ii(A, c, h) {
  const $ = [];
  let M = c;
  for (; M < A.length && A[M].time <= h; )
    h - A[M].time <= 1.2 && $.push(A[M]), M++;
  return { items: $, index: M };
}
const Di = ["onAnimationend"], Li = ["aria-pressed"], Ri = /* @__PURE__ */ Ve({
  __name: "BiliSubscriptionDanmaku",
  props: {
    bvid: {},
    cid: {},
    video: {}
  },
  setup(A) {
    const c = A, h = _(!0), $ = _(!0), M = _([]);
    let a = [], I = 0, P = 0, y = 0, w = 0;
    const B = Array(8).fill(0);
    function V(F = 0) {
      M.value = [], B.fill(0), I = Pi(a, Math.max(0, F)), P = F;
    }
    function U() {
      const F = c.video;
      if (!F || !h.value || !a.length) return;
      const ee = F.currentTime;
      if (Math.abs(ee - P) > 1.5) {
        V(ee);
        return;
      }
      const q = Ii(a, I, ee);
      I = q.index;
      const se = performance.now(), de = Math.max(3, Math.min(8, Math.floor(((F.parentElement?.clientHeight || 240) - 45) / 26)));
      for (const oe of q.items) {
        let le = 0;
        for (let f = 0; f < de; f++) {
          if (B[f] <= se) {
            le = f;
            break;
          }
          B[f] < B[le] && (le = f);
        }
        B[le] = se + Math.max(1e3, oe.text.length * 110), M.value.push({ id: `${++w}`, text: oe.text, color: oe.color, top: le * 26 + 8, mode: oe.mode });
      }
      P = ee;
    }
    function N() {
      V(c.video?.currentTime || 0);
    }
    function ke() {
      $.value = !1;
    }
    function j() {
      $.value = !0;
    }
    function E(F) {
      M.value = M.value.filter((ee) => ee.id !== F);
    }
    function Y() {
      h.value = !h.value, V(c.video?.currentTime || 0);
    }
    return X(() => [c.bvid, c.cid], async ([F, ee], q, se) => {
      const de = ++y;
      if (se(() => {
        y++;
      }), a = [], V(), !!F)
        try {
          const oe = ee || (await pt.getVideoView(F))?.cid;
          if (!oe || de !== y) return;
          const le = await pt.getVideoDanmaku(oe);
          if (de !== y) return;
          a = le, V(c.video?.currentTime || 0);
        } catch (oe) {
          console.warn("[BiliSubscriptionDanmaku] 弹幕读取失败", oe);
        }
    }, { immediate: !0 }), X(() => c.video, (F, ee, q) => {
      F && ($.value = F.paused, F.addEventListener("timeupdate", U), F.addEventListener("seeked", N), F.addEventListener("play", ke), F.addEventListener("pause", j), F.addEventListener("ended", j), q(() => {
        F.removeEventListener("timeupdate", U), F.removeEventListener("seeked", N), F.removeEventListener("play", ke), F.removeEventListener("pause", j), F.removeEventListener("ended", j);
      }));
    }, { immediate: !0 }), It(() => {
      y++;
    }), (F, ee) => (o(), l(R, null, [
      ue(e("div", {
        class: L(["bili-danmaku-stage", { "is-paused": $.value }]),
        "aria-hidden": "true"
      }, [
        (o(!0), l(R, null, K(M.value, (q) => (o(), l("div", {
          key: q.id,
          class: L(["bili-danmaku-bullet", { "is-top": q.mode === 5, "is-bottom": q.mode === 4 }]),
          style: _e({ top: `${q.top}px`, color: q.color, animationDuration: "5.5s" }),
          onAnimationend: (se) => E(q.id)
        }, n(q.text), 47, Di))), 128))
      ], 2), [
        [jt, h.value]
      ]),
      e("button", {
        class: "bili-sub-danmaku-toggle",
        type: "button",
        "aria-pressed": h.value,
        onClick: S(Y, ["stop"])
      }, " 弹幕 " + n(h.value ? "开" : "关"), 9, Li)
    ], 64));
  }
});
function Bi(A) {
  return A.filter((c) => Array.isArray(c?.emote) && c.emote.length).map((c) => {
    const h = String(c.text || "B站表情");
    return {
      text: h,
      emote: c.emote.map(($) => ({
        text: String($?.text || ""),
        url: String($?.url || "").replace(/^http:/, "https:"),
        textOnly: h.includes("颜文字"),
        failed: !1
      })).filter(($) => $.text)
    };
  }).filter((c) => c.emote.length);
}
const zi = { class: "bili-sub-transcript-column bili-sub-vue-transcript-column" }, Ei = { class: "bili-sub-article-wrap" }, Fi = {
  key: 0,
  class: "bili-sub-description-copy",
  title: "当前为放大简介视图"
}, Ai = {
  key: 0,
  class: "muted"
}, Vi = {
  key: 0,
  class: "bili-sub-srt-list"
}, Ui = ["data-idx", "data-from", "data-to", "title", "onClick"], Gi = { class: "bili-sub-srt-time" }, qi = { class: "bili-sub-srt-text" }, Ni = {
  key: 1,
  class: "bili-sub-no-transcript-wrap"
}, Wi = {
  key: 0,
  class: "bili-sub-description-copy"
}, Oi = {
  key: 2,
  class: "bili-sub-vue-empty-hint"
}, Yi = /* @__PURE__ */ Ve({
  __name: "BiliSubscriptionTranscript",
  setup(A) {
    It(() => Ae.reset());
    const c = G(() => O.organizer), h = G(() => c.value.subscriptionChapters.length > 0 || c.value.subscriptionCues.length > 0);
    function $(M, a) {
      Be.dispatch(M, a);
    }
    return (M, a) => (o(), l("section", zi, [
      e("article", Ei, [
        e("div", {
          class: "bili-sub-transcript-body",
          tabindex: "0",
          onWheelPassive: a[1] || (a[1] = //@ts-ignore
          (...I) => r(Ae).interact && r(Ae).interact(...I)),
          onPointerdown: a[2] || (a[2] = //@ts-ignore
          (...I) => r(Ae).pointerDown && r(Ae).pointerDown(...I)),
          onKeydown: a[3] || (a[3] = //@ts-ignore
          (...I) => r(Ae).keyDown && r(Ae).keyDown(...I))
        }, [
          c.value.showFullDescInRightPanel ? (o(), l("section", Fi, [
            e("header", null, [
              a[4] || (a[4] = e("h5", null, "视频简介", -1)),
              e("button", {
                type: "button",
                class: "bili-copy-desc-btn",
                title: "切回台词展示",
                onClick: a[0] || (a[0] = (I) => $("subscription-toggle-desc-panel"))
              }, "缩小简介")
            ]),
            (o(!0), l(R, null, K(c.value.subscriptionDescription, (I, P) => (o(), l("p", { key: P }, [
              Pe(lt, { text: I }, null, 8, ["text"])
            ]))), 128)),
            c.value.subscriptionDescription.length ? m("", !0) : (o(), l("p", Ai, "该视频暂无可用的文字简介。"))
          ])) : (o(), l(R, { key: 1 }, [
            c.value.subscriptionCues.length ? (o(), l("div", Vi, [
              (o(!0), l(R, null, K(c.value.subscriptionCues, (I) => (o(), l("button", {
                key: `${I.from}:${I.index}`,
                type: "button",
                class: "bili-sub-srt-row",
                "data-idx": I.index,
                "data-from": I.from,
                "data-to": I.to,
                title: `点击跳转至 ${I.timeText}`,
                onClick: (P) => $("subscription-seek", { from: I.from, index: I.index, mode: "lyrics" })
              }, [
                e("span", Gi, n(I.timeText), 1),
                e("span", qi, n(I.content), 1)
              ], 8, Ui))), 128))
            ])) : (o(), l("div", Ni, [
              e("div", {
                class: L(["bili-sub-no-transcript-box", { compact: c.value.subscriptionDescription.length > 0 }])
              }, [...a[5] || (a[5] = [
                e("div", { class: "bili-sub-no-transcript-icon" }, "🎙️", -1),
                e("h5", null, "暂无实时台词字幕", -1),
                e("p", { class: "muted" }, "当前视频未提供 CC / AI 字幕，可在下方查看简介或直接观看视频与评论。", -1)
              ])], 2),
              c.value.subscriptionDescription.length ? (o(), l("section", Wi, [
                a[6] || (a[6] = e("header", null, [
                  e("h5", null, "视频简介")
                ], -1)),
                (o(!0), l(R, null, K(c.value.subscriptionDescription, (I, P) => (o(), l("p", { key: P }, [
                  Pe(lt, { text: I }, null, 8, ["text"])
                ]))), 128))
              ])) : m("", !0)
            ]))
          ], 64)),
          !c.value.showFullDescInRightPanel && !h.value && !c.value.subscriptionDescription.length ? (o(), l("p", Oi, "字幕不可用时仍可在左侧播放和查看评论。")) : m("", !0)
        ], 32)
      ])
    ]));
  }
}), Ki = /* @__PURE__ */ Ze(Yi, [["__scopeId", "data-v-7f189afb"]]), ji = {
  key: 0,
  class: "bili-sub-layout bili-sub-vue-layout"
}, Hi = { class: "bili-sub-player-column" }, Xi = { class: "bili-sub-sticky-player" }, Ji = { class: "bili-sub-player-card" }, Qi = { class: "bili-sub-video-box" }, Zi = ["poster", "hidden"], eo = ["src"], to = {
  key: 2,
  class: "bili-sub-video-loading"
}, io = { class: "bili-sub-video-meta" }, oo = { class: "bili-sub-video-meta-actions" }, lo = ["title"], so = { class: "bili-sub-meta-stats" }, no = { class: "bili-sub-meta-desc" }, ao = { class: "bili-sub-comments-column" }, ro = {
  class: "bili-sub-comments-section bili-sub-comments-panel",
  id: "bili-sub-comments-section"
}, uo = { class: "bili-mini-comments-head" }, co = { class: "bili-mini-comments-meta" }, vo = { class: "bili-mini-comments-count bili-sub-comments-count" }, bo = { class: "bili-sub-comments-head-right" }, po = { class: "bili-mini-comments-sort" }, fo = { class: "bili-sub-comment-composer" }, go = ["disabled"], mo = {
  key: 0,
  class: "bili-sub-emote-picker"
}, ho = {
  key: 0,
  class: "fo-bili-loading"
}, yo = { key: 1 }, _o = ["title", "onClick"], ko = ["src", "alt", "onError"], $o = { key: 1 }, Co = { class: "bili-mini-comments-body bili-sub-comments-body" }, wo = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, xo = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "16px 0" }
}, So = ["src"], To = { class: "bili-comment-main" }, Mo = { class: "bili-comment-user-row" }, Po = { class: "bili-comment-uname" }, Io = {
  key: 0,
  class: "bili-comment-level"
}, Do = { class: "bili-comment-time" }, Lo = { class: "bili-comment-text" }, Ro = {
  key: 0,
  class: "bili-comment-pictures"
}, Bo = ["href", "onClick"], zo = ["src"], Eo = { class: "bili-comment-actions" }, Fo = { key: 0 }, Ao = { key: 1 }, Vo = {
  key: 1,
  class: "bili-comment-sub-list"
}, Uo = { class: "bili-comment-sub-uname" }, Go = { class: "bili-comment-sub-more" }, qo = ["disabled", "onClick"], No = ["disabled", "onClick"], Wo = ["onClick"], Oo = { class: "bili-sub-comments-infinite-trigger" }, Yo = {
  key: 0,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0" }
}, Ko = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "12px 0", opacity: "0.6" }
}, jo = {
  key: 1,
  class: "fo-bili-empty"
}, Ho = /* @__PURE__ */ Ve({
  __name: "BiliSubscriptionPlayer",
  setup(A) {
    const c = G(() => O.organizer.subscriptionCurrent), h = _(null), $ = _(!1), M = _(!1), a = _(""), I = _(null), P = _(""), y = _(1), w = _(1), B = _([]), V = _("0 条"), U = _(!1), N = _(!1), ke = _(""), j = _(!1), E = _(""), Y = _(null), F = _(!1), ee = _(""), q = _(!1), se = _(!1), de = _(!1), oe = _([]);
    let le = null, f = null;
    function ne(C, g = !1) {
      ee.value = C, q.value = g, le && clearTimeout(le), le = setTimeout(() => {
        ee.value = "";
      }, 3500);
    }
    function ce() {
      Be.dispatch("subscription-open-player");
    }
    function ve() {
      Be.dispatch("subscription-toggle-desc-panel");
    }
    function $e() {
      Be.dispatch(
        O.organizer.showFullDescInRightPanel ? "subscription-copy-description" : "subscription-copy-script"
      );
    }
    function ze() {
      Be.dispatch("organizer-open");
    }
    function Ye(C) {
      const g = C.currentTarget;
      g && g.scrollHeight - g.scrollTop - g.clientHeight < 180 && !N.value && j.value && et();
    }
    function Ke(C, g) {
      const b = C[g];
      b && fi.open(b, c.value?.title ? `${c.value.title} · 评论图片` : "评论图片");
    }
    function k(C) {
      if (!C) return "";
      const g = new Date(C * 1e3), b = /* @__PURE__ */ new Date(), T = Math.floor((b.getTime() - g.getTime()) / 1e3);
      if (T < 60) return "刚刚";
      if (T < 3600) return `${Math.floor(T / 60)} 分钟前`;
      if (T < 86400) return `${Math.floor(T / 3600)} 小时前`;
      const W = g.getFullYear(), H = String(g.getMonth() + 1).padStart(2, "0"), te = String(g.getDate()).padStart(2, "0");
      return W === b.getFullYear() ? `${H}-${te}` : `${W}-${H}-${te}`;
    }
    function u(C) {
      return C ? C >= 1e4 ? (C / 1e4).toFixed(1).replace(/\.0$/, "") + "万" : String(C) : "0";
    }
    async function v(C = !1) {
      if (P.value) {
        C ? N.value = !0 : (U.value = !0, ke.value = "");
        try {
          const g = `https://api.bilibili.com/x/v2/reply?type=1&oid=${P.value}&pn=${w.value}&ps=20&sort=${y.value}`, T = await (await fetch(g, { credentials: "include" })).json();
          if (T?.code !== 0 || !T?.data) {
            C || (ke.value = T?.message || "评论加载失败或该视频已关闭评论", B.value = []), j.value = !1;
            return;
          }
          const W = T.data, H = W.page?.count || 0;
          V.value = `${u(H)} 条`;
          const Ge = (Array.isArray(W.replies) ? W.replies : []).map((ie) => {
            const He = Wt(ie.content), qe = Ot(ie.content), Ne = String(ie.content?.message || ""), tt = Array.isArray(ie.content?.pictures) ? ie.content.pictures.map((Ce) => String(Ce?.img_src || Ce).replace(/^http:/, "https:")).filter(Boolean) : [], nt = Array.isArray(ie.replies) ? ie.replies.map((Ce) => ({
              id: Ce.rpid || Math.random(),
              userName: Ce.member?.uname || "B站用户",
              message: String(Ce.content?.message || ""),
              emotes: Wt(Ce.content),
              mentions: Ot(Ce.content)
            })) : [];
            return {
              id: ie.rpid || Math.random(),
              userName: ie.member?.uname || "B站用户",
              avatar: String(ie.member?.avatar || "").replace(/^http:/, "https:"),
              level: Number(ie.member?.level_info?.current_level || 0),
              message: Ne,
              emotes: He,
              mentions: qe,
              timeStr: k(ie.ctime),
              likeCount: Number(ie.like || 0),
              replyCount: Number(ie.rcount || 0),
              pictures: tt,
              replies: nt
            };
          });
          C ? B.value = [...B.value, ...Ge] : B.value = Ge, j.value = B.value.length < H;
        } catch (g) {
          C || (ke.value = g?.message || "网络异常，未能加载评论");
        } finally {
          U.value = !1, N.value = !1;
        }
      }
    }
    async function D(C) {
      const g = B.value.find((b) => String(b.id) === String(C));
      if (!(!g || g.subRepliesLoading || !P.value)) {
        g.subRepliesPage ? g.subRepliesPage++ : g.subRepliesPage = 1, g.subRepliesLoading = !0, g.subRepliesExpanded = !0;
        try {
          const b = await pt.getSubReplies(P.value, C, g.subRepliesPage, 10), T = (b.replies || []).map((te) => ({
            id: String(te.rpid),
            userName: te.uname,
            message: te.message,
            emotes: te.emotes,
            mentions: te.mentions
          })), W = new Set((g.replies || []).map((te) => String(te.id))), H = T.filter((te) => !W.has(String(te.id)));
          g.replies = [...g.replies || [], ...H], g.subRepliesHasMore = b.hasMore;
        } catch {
          ne("子回复加载失败", !0);
        } finally {
          g.subRepliesLoading = !1;
        }
      }
    }
    function ae(C) {
      const g = B.value.find((b) => String(b.id) === String(C));
      g && (g.subRepliesExpanded = !1);
    }
    function Ee(C) {
      y.value !== C && (y.value = C, w.value = 1, v(!1));
    }
    function et() {
      N.value || !j.value || (w.value += 1, v(!0));
    }
    async function Ue() {
      if (se.value = !se.value, se.value && !oe.value.length && !de.value) {
        de.value = !0;
        try {
          const g = await (await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", { credentials: "include" })).json();
          g?.code === 0 && Array.isArray(g?.data?.packages) && (oe.value = Bi(g.data.packages));
        } catch {
        } finally {
          de.value = !1;
        }
      }
    }
    function re(C) {
      const g = Y.value;
      if (!g)
        E.value += C;
      else {
        const b = g.selectionStart ?? g.value.length, T = g.selectionEnd ?? b;
        E.value = E.value.slice(0, b) + C + E.value.slice(T), Pt(() => {
          g.focus();
          const W = b + C.length;
          g.setSelectionRange(W, W);
        });
      }
      se.value = !1;
    }
    async function ge() {
      const C = E.value.trim();
      if (!C) {
        ne("请输入评论内容", !0);
        return;
      }
      if (!P.value) {
        ne("未能识别视频 ID，无法发表评论", !0);
        return;
      }
      const g = window.getBiliJct;
      let b = "";
      if (typeof g == "function")
        b = await g();
      else
        try {
          b = (await window.chrome?.cookies?.get?.({ url: "https://api.bilibili.com", name: "bili_jct" }))?.value || "";
        } catch {
          b = "";
        }
      if (!b) {
        ne("未检测到 B站 登录态，请先登录 bilibili.com", !0);
        return;
      }
      F.value = !0;
      try {
        const T = new URLSearchParams({
          oid: String(P.value),
          type: "1",
          message: C,
          plat: "1",
          csrf: b,
          csrf_token: b
        }), H = await (await fetch("https://api.bilibili.com/x/v2/reply/add", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: T.toString()
        })).json();
        H?.code === 0 ? (E.value = "", ne("✓ 评论发表成功！", !1), w.value = 1, v(!1)) : ne(`❌ 发送失败：${H?.message || H?.code}`, !0);
      } catch (T) {
        ne(`❌ 发送出错：${T?.message || "网络异常"}`, !0);
      } finally {
        F.value = !1;
      }
    }
    async function me(C) {
      if (!C?.bvid) return;
      if (typeof document < "u" && (document.querySelectorAll("video, audio").forEach((b) => {
        if (b !== h.value && !b.paused)
          try {
            b.pause();
          } catch {
          }
      }), document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((b) => {
        try {
          b.pause();
        } catch {
        }
      })), h.value && !h.value.paused)
        try {
          h.value.pause();
        } catch {
        }
      $.value = !0, M.value = !1, a.value = "", I.value = null, Te = null;
      let g = C.aid;
      if (!g)
        try {
          const T = await (await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${C.bvid}`, { credentials: "include" })).json();
          T?.data?.aid && (g = T.data.aid);
        } catch {
        }
      if (c.value?.bvid === C.bvid) {
        P.value = g || "", w.value = 1, v(!1);
        try {
          const b = await pt.resolvePlayStream(C);
          if (c.value?.bvid !== C.bvid) return;
          if (b?.sources?.length) {
            I.value = b.cid, h.value && (typeof document < "u" && document.querySelectorAll(".bili-mini-player video, #bili-theater-video, #bili-radio-audio").forEach((T) => {
              try {
                T.pause();
              } catch {
              }
            }), h.value.src = b.sources[0], h.value.play().catch(() => {
            }), pi({ bvid: C.bvid, title: C.title, cover: C.cover }, h.value)), $.value = !1;
            return;
          }
        } catch (b) {
          console.warn("[BiliSubscriptionPlayer] 本地视频流解析失败，使用 iframe 备用:", b);
        }
        c.value?.bvid === C.bvid && (M.value = !0, a.value = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(C.bvid)}&autoplay=1&danmaku=1`, $.value = !1);
      }
    }
    let Te = null;
    function Fe() {
      if (!h.value) return;
      const C = h.value.currentTime, g = document.querySelectorAll(".bili-sub-srt-row");
      let b = !1, T = null;
      for (let W = g.length - 1; W >= 0; W--) {
        const H = g[W], te = Number(H.getAttribute("data-from") || 0);
        !b && C >= te ? (H.classList.add("active"), b = !0, T = H) : H.classList.remove("active");
      }
      T && T !== Te && (Te = T, Ae.follow());
    }
    function je() {
      Fe();
    }
    function st() {
      Fe();
    }
    return X(
      () => c.value?.bvid,
      () => {
        c.value && me(c.value);
      },
      { immediate: !0 }
    ), Dt(() => {
      f = Be.onAction((C, g) => {
        if (C === "subscription-seek") {
          const b = Number(g?.from);
          h.value && Number.isFinite(b) && (h.value.currentTime = Math.max(0, b - 0.1), h.value.play().catch(() => {
          }));
        }
      });
    }), It(() => {
      if (h.value) {
        bi(h.value);
        try {
          h.value.pause(), h.value.src = "", h.value.load();
        } catch {
        }
      }
      f && f(), le && clearTimeout(le);
    }), (C, g) => c.value ? (o(), l("div", ji, [
      e("aside", Hi, [
        e("div", Xi, [
          e("div", Ji, [
            e("div", {
              class: "bili-sub-vue-comment-handoff",
              hidden: "",
              style: { display: "none !important" }
            }, [
              g[4] || (g[4] = e("strong", null, "播放器与评论区已统一到 Vue 本地影院", -1)),
              e("button", {
                type: "button",
                onClick: ce
              }, "打开播放器与评论区")
            ]),
            e("div", Qi, [
              e("video", {
                ref_key: "videoRef",
                ref: h,
                class: "bili-sub-native-video",
                controls: "",
                playsinline: "",
                poster: c.value.cover,
                hidden: M.value,
                onTimeupdate: Fe,
                onSeeked: je,
                onPlay: st
              }, null, 40, Zi),
              !M.value && !$.value ? (o(), Mt(Ri, {
                key: 0,
                bvid: c.value.bvid,
                cid: I.value,
                video: h.value
              }, null, 8, ["bvid", "cid", "video"])) : m("", !0),
              M.value ? (o(), l("iframe", {
                key: 1,
                class: "bili-sub-native-iframe",
                allowfullscreen: "true",
                allow: "autoplay; fullscreen",
                src: a.value
              }, null, 8, eo)) : m("", !0),
              $.value ? (o(), l("div", to, [...g[5] || (g[5] = [
                e("i", null, null, -1),
                e("span", null, "正在解析登录高清视频流…", -1)
              ])])) : m("", !0)
            ]),
            e("div", io, [
              e("div", oo, [
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  onClick: $e
                }, n(r(O).organizer.showFullDescInRightPanel ? "复制简介" : "复制稿子"), 1),
                e("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: r(O).organizer.showFullDescInRightPanel ? "切回台词展示" : "展开完整视频简介",
                  onClick: ve
                }, n(r(O).organizer.showFullDescInRightPanel ? "缩小简介" : "放大简介"), 9, lo)
              ]),
              e("h4", null, n(c.value.title), 1),
              e("div", so, [
                e("span", null, "▣ 播放: " + n(c.value.playCount), 1),
                e("span", null, "💬 弹幕: " + n(c.value.danmakuCount), 1),
                e("span", null, "⏱ " + n(c.value.duration), 1)
              ]),
              e("p", no, [
                Pe(lt, {
                  text: c.value.description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ]),
            Pe(Ki, { class: "bili-sub-inline-transcript" })
          ])
        ])
      ]),
      e("section", ao, [
        e("div", ro, [
          e("div", uo, [
            e("div", co, [
              g[6] || (g[6] = e("span", null, "💬 评论", -1)),
              e("span", vo, n(V.value), 1)
            ]),
            e("div", bo, [
              e("div", po, [
                e("button", {
                  type: "button",
                  class: L(["bili-mini-sort-btn", { active: y.value === 1 }]),
                  onClick: g[0] || (g[0] = (b) => Ee(1))
                }, "按热度", 2),
                e("button", {
                  type: "button",
                  class: L(["bili-mini-sort-btn", { active: y.value === 0 }]),
                  onClick: g[1] || (g[1] = (b) => Ee(0))
                }, "按时间", 2)
              ]),
              e("button", {
                type: "button",
                class: "bili-sub-close-btn",
                title: "退出全屏返回",
                "aria-label": "关闭全屏播放",
                onClick: ze
              }, "✕")
            ])
          ]),
          e("div", fo, [
            e("button", {
              type: "button",
              class: L(["bili-sub-emote-button", { on: se.value }]),
              title: "选择 B站 表情",
              onClick: Ue
            }, "☺", 2),
            ue(e("input", {
              ref_key: "commentInputRef",
              ref: Y,
              "onUpdate:modelValue": g[2] || (g[2] = (b) => E.value = b),
              type: "text",
              class: "bili-sub-comment-input",
              placeholder: "发一条友善的评论吧…（Enter 发送）",
              maxlength: "500",
              onKeydown: g[3] || (g[3] = (b) => r(Xt)(b, ge))
            }, null, 544), [
              [Ie, E.value]
            ]),
            e("button", {
              type: "button",
              class: "bili-sub-comment-send-btn",
              disabled: F.value || !E.value.trim(),
              onClick: ge
            }, n(F.value ? "发送中…" : "发送"), 9, go)
          ]),
          se.value ? (o(), l("div", mo, [
            de.value ? (o(), l("div", ho, [...g[7] || (g[7] = [
              e("i", null, null, -1),
              e("span", null, "正在读取 B站 表情包…", -1)
            ])])) : (o(), l("div", yo, [
              (o(!0), l(R, null, K(oe.value, (b) => (o(), l("section", {
                key: b.text,
                class: "bili-sub-emote-group"
              }, [
                e("h5", null, n(b.text || "B站表情"), 1),
                e("div", {
                  class: L({ "bili-sub-text-emotes": b.text.includes("颜文字") })
                }, [
                  (o(!0), l(R, null, K(b.emote, (T) => (o(), l("button", {
                    key: T.text,
                    type: "button",
                    class: "bili-sub-emote-item",
                    title: T.text,
                    onClick: (W) => re(T.text)
                  }, [
                    T.url && !T.textOnly && !T.failed ? (o(), l("img", {
                      key: 0,
                      src: T.url,
                      alt: T.text,
                      referrerpolicy: "no-referrer",
                      onError: (W) => T.failed = !0
                    }, null, 40, ko)) : (o(), l("span", $o, n(T.text), 1))
                  ], 8, _o))), 128))
                ], 2)
              ]))), 128))
            ]))
          ])) : m("", !0),
          ee.value ? (o(), l("div", {
            key: 1,
            class: L(["bili-sub-comment-tip", { error: q.value }])
          }, n(ee.value), 3)) : m("", !0),
          e("div", {
            class: "bili-sub-scroll-stage bili-sub-comments-scroll",
            onScrollPassive: Ye
          }, [
            e("div", Co, [
              U.value && !B.value.length ? (o(), l("p", wo, "正在加载评论…")) : ke.value && !B.value.length ? (o(), l("p", xo, n(ke.value), 1)) : m("", !0),
              (o(!0), l(R, null, K(B.value, (b) => (o(), l("div", {
                key: b.id,
                class: "bili-comment-item"
              }, [
                e("img", {
                  class: "bili-comment-avatar",
                  src: b.avatar,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, So),
                e("div", To, [
                  e("div", Mo, [
                    e("span", Po, n(b.userName), 1),
                    b.level ? (o(), l("span", Io, "LV" + n(b.level), 1)) : m("", !0),
                    e("span", Do, n(b.timeStr), 1)
                  ]),
                  e("div", Lo, [
                    Pe(lt, {
                      text: b.message,
                      emotes: b.emotes,
                      mentions: b.mentions
                    }, null, 8, ["text", "emotes", "mentions"])
                  ]),
                  b.pictures?.length ? (o(), l("div", Ro, [
                    (o(!0), l(R, null, K(b.pictures, (T, W) => (o(), l("a", {
                      key: W,
                      class: "bili-comment-pic-link",
                      href: T,
                      onClick: S((H) => Ke(b.pictures, W), ["stop", "prevent"])
                    }, [
                      e("img", {
                        class: "bili-comment-pic",
                        src: T,
                        alt: "评论图片",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, zo)
                    ], 8, Bo))), 128))
                  ])) : m("", !0),
                  e("div", Eo, [
                    b.likeCount ? (o(), l("span", Fo, "👍 " + n(b.likeCount), 1)) : m("", !0),
                    b.replyCount ? (o(), l("span", Ao, "💬 " + n(b.replyCount), 1)) : m("", !0)
                  ]),
                  b.replies?.length ? (o(), l("div", Vo, [
                    (o(!0), l(R, null, K(b.replies, (T) => (o(), l("div", {
                      key: T.id,
                      class: "bili-comment-sub-item"
                    }, [
                      e("span", Uo, n(T.userName) + ":", 1),
                      Pe(lt, {
                        text: T.message,
                        emotes: T.emotes,
                        mentions: T.mentions
                      }, null, 8, ["text", "emotes", "mentions"])
                    ]))), 128)),
                    e("div", Go, [
                      !b.subRepliesExpanded && (b.replyCount || 0) > b.replies.length ? (o(), l(R, { key: 0 }, [
                        e("span", null, "共 " + n(b.replyCount) + " 条回复，", 1),
                        e("button", {
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: b.subRepliesLoading,
                          onClick: S((T) => D(b.id), ["stop"])
                        }, n(b.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, qo)
                      ], 64)) : b.subRepliesExpanded ? (o(), l(R, { key: 1 }, [
                        b.subRepliesHasMore ? (o(), l("button", {
                          key: 0,
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: b.subRepliesLoading,
                          onClick: S((T) => D(b.id), ["stop"])
                        }, n(b.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, No)) : m("", !0),
                        e("button", {
                          type: "button",
                          class: "bili-comment-sub-collapse-btn",
                          onClick: S((T) => ae(b.id), ["stop"])
                        }, " 收起 ▴ ", 8, Wo)
                      ], 64)) : m("", !0)
                    ])
                  ])) : m("", !0)
                ])
              ]))), 128))
            ]),
            e("div", Oo, [
              N.value ? (o(), l("p", Yo, "正在加载更多评论…")) : !j.value && B.value.length ? (o(), l("p", Ko, "已显示全部评论")) : m("", !0)
            ])
          ], 32)
        ])
      ])
    ])) : (o(), l("p", jo, "暂无可播放的视频。"));
  }
}), Xo = /* @__PURE__ */ Ze(Ho, [["__scopeId", "data-v-f211efe5"]]), Jo = ["disabled"], Qo = ["disabled"], Zo = { key: 0 }, el = ["disabled"], tl = ["disabled"], il = ["disabled"], ol = ["disabled"], ll = { class: "bili-sub-add-shell" }, sl = ["disabled"], nl = { class: "bili-sub-add-toolbar" }, al = { class: "bili-sub-add-groups" }, rl = ["onClick"], ul = { class: "bili-sub-add-list" }, dl = {
  key: 0,
  class: "fo-bili-loading"
}, cl = {
  key: 1,
  class: "fo-bili-empty"
}, vl = {
  key: 2,
  class: "fo-bili-empty"
}, bl = ["disabled", "onClick"], pl = ["src"], fl = {
  key: 1,
  class: "bili-sub-add-avatar"
}, gl = {
  class: "fo-custom-confirm-modal",
  role: "dialog",
  "aria-modal": "true"
}, ml = { class: "fo-custom-confirm-head" }, hl = { class: "fo-custom-confirm-body" }, yl = { class: "fo-custom-confirm-actions" }, _l = ["disabled"], kl = ["disabled"], $l = /* @__PURE__ */ Ve({
  __name: "BiliOrganizerDialogs",
  setup(A) {
    const c = G(() => wt.create), h = G(() => wt.confirm), $ = G(() => wt.channelPicker), M = G(() => c.value.kind === "bili"), a = G(() => {
      const P = $.value, y = P.query.trim().toLowerCase(), w = P.groups.find((V) => V.id === P.activeGroupId), B = w ? new Set(w.mids) : null;
      return P.items.filter((V) => (!B || B.has(V.mid)) && (!y || V.name.toLowerCase().includes(y) || V.mid.includes(y)));
    });
    function I() {
      const P = c.value.name.trim();
      if (!P) {
        pe.updateCreate({ status: "请输入名称", error: !0 });
        return;
      }
      pe.submitCreate({ name: P, privacy: c.value.privacy });
    }
    return (P, y) => (o(), l(R, null, [
      c.value.open ? (o(), l("dialog", {
        key: 0,
        class: "fo-create-dialog",
        open: "",
        onClick: y[5] || (y[5] = S((w) => r(pe).closeCreate(), ["self"])),
        onCancel: y[6] || (y[6] = S((w) => r(pe).closeCreate(), ["prevent"]))
      }, [
        e("form", {
          onSubmit: S(I, ["prevent"])
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
              disabled: c.value.submitting,
              onClick: y[0] || (y[0] = (w) => r(pe).closeCreate())
            }, "×", 8, Jo)
          ]),
          e("label", null, [
            e("span", null, n(M.value ? "收藏夹名称" : "分组名称"), 1),
            ue(e("input", {
              "onUpdate:modelValue": y[1] || (y[1] = (w) => c.value.name = w),
              maxlength: "48",
              autocomplete: "off",
              placeholder: "输入名称",
              required: "",
              disabled: c.value.submitting,
              autofocus: ""
            }, null, 8, Qo), [
              [Ie, c.value.name]
            ])
          ]),
          M.value ? (o(), l("fieldset", Zo, [
            y[17] || (y[17] = e("legend", null, "可见范围", -1)),
            e("label", null, [
              ue(e("input", {
                "onUpdate:modelValue": y[2] || (y[2] = (w) => c.value.privacy = w),
                type: "radio",
                value: 0,
                disabled: c.value.submitting
              }, null, 8, el), [
                [
                  Nt,
                  c.value.privacy,
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
                "onUpdate:modelValue": y[3] || (y[3] = (w) => c.value.privacy = w),
                type: "radio",
                value: 1,
                disabled: c.value.submitting
              }, null, 8, tl), [
                [
                  Nt,
                  c.value.privacy,
                  void 0,
                  { number: !0 }
                ]
              ]),
              y[16] || (y[16] = e("span", null, [
                e("b", null, "私密"),
                e("small", null, "仅自己可见")
              ], -1))
            ])
          ])) : m("", !0),
          e("p", {
            class: L(["fo-create-status", { error: c.value.error }]),
            role: "status"
          }, n(c.value.status), 3),
          e("footer", null, [
            e("button", {
              type: "button",
              disabled: c.value.submitting,
              onClick: y[4] || (y[4] = (w) => r(pe).closeCreate())
            }, "取消", 8, il),
            e("button", {
              class: "primary",
              type: "submit",
              disabled: c.value.submitting
            }, n(c.value.submitting ? "创建中…" : M.value ? "创建收藏夹" : "创建分组"), 9, ol)
          ])
        ], 32)
      ], 32)) : m("", !0),
      $.value.open ? (o(), l("dialog", {
        key: 1,
        class: "bili-sub-add-dialog",
        open: "",
        onCancel: y[10] || (y[10] = S((w) => r(pe).closeChannelPicker(), ["prevent"]))
      }, [
        e("div", ll, [
          e("header", null, [
            y[18] || (y[18] = e("div", null, [
              e("b", null, "从我的关注中添加 UP 主"),
              e("small", null, "沿用“正在关注”的本地分组，只能添加已关注的 UP 主")
            ], -1)),
            e("button", {
              type: "button",
              "aria-label": "关闭",
              disabled: !!$.value.submittingMid,
              onClick: y[7] || (y[7] = (w) => r(pe).closeChannelPicker())
            }, "×", 8, sl)
          ]),
          e("div", nl, [
            e("div", al, [
              e("button", {
                type: "button",
                class: L(["bili-sub-add-group", { on: $.value.activeGroupId === "__all__" }]),
                onClick: y[8] || (y[8] = (w) => r(pe).updateChannelPicker({ activeGroupId: "__all__" }))
              }, "全部关注", 2),
              (o(!0), l(R, null, K($.value.groups, (w) => (o(), l("button", {
                key: w.id,
                type: "button",
                class: L(["bili-sub-add-group", { on: $.value.activeGroupId === w.id }]),
                onClick: (B) => r(pe).updateChannelPicker({ activeGroupId: w.id })
              }, n(w.name), 11, rl))), 128))
            ]),
            ue(e("input", {
              "onUpdate:modelValue": y[9] || (y[9] = (w) => $.value.query = w),
              type: "search",
              placeholder: "搜索关注的 UP 主"
            }, null, 512), [
              [Ie, $.value.query]
            ])
          ]),
          e("div", ul, [
            $.value.loading ? (o(), l("div", dl, [...y[19] || (y[19] = [
              e("i", null, null, -1),
              e("span", null, "正在读取关注分组…", -1)
            ])])) : $.value.error ? (o(), l("p", cl, n($.value.error), 1)) : a.value.length ? (o(!0), l(R, { key: 3 }, K(a.value, (w) => (o(), l("button", {
              key: w.mid,
              type: "button",
              class: "bili-sub-add-up",
              disabled: w.added || !!$.value.submittingMid,
              onClick: (B) => r(pe).selectChannel(w.mid)
            }, [
              w.face ? (o(), l("img", {
                key: 0,
                src: w.face,
                alt: "",
                referrerpolicy: "no-referrer"
              }, null, 8, pl)) : (o(), l("span", fl, "UP")),
              e("span", null, [
                e("b", null, n(w.name), 1),
                e("small", null, "UID " + n(w.mid), 1)
              ]),
              e("i", null, n(w.added ? "已添加" : $.value.submittingMid === w.mid ? "添加中…" : "＋ 添加"), 1)
            ], 8, bl))), 128)) : (o(), l("p", vl, "该分组中没有匹配的已关注 UP 主。"))
          ])
        ])
      ], 32)) : m("", !0),
      h.value.open ? (o(), l("div", {
        key: 2,
        class: "fo-custom-confirm-overlay",
        onClick: y[13] || (y[13] = S((w) => r(pe).closeConfirm(), ["self"]))
      }, [
        e("div", gl, [
          e("div", ml, [
            e("h4", null, n(h.value.title), 1)
          ]),
          e("div", hl, [
            e("p", null, n(h.value.message), 1)
          ]),
          e("div", yl, [
            e("button", {
              type: "button",
              class: "fo-confirm-btn cancel",
              disabled: h.value.submitting,
              onClick: y[11] || (y[11] = (w) => r(pe).closeConfirm())
            }, n(h.value.cancelText), 9, _l),
            e("button", {
              type: "button",
              class: L(["fo-confirm-btn confirm", { danger: h.value.danger }]),
              disabled: h.value.submitting,
              onClick: y[12] || (y[12] = (w) => r(pe).submitConfirm())
            }, n(h.value.submitting ? "处理中…" : h.value.confirmText), 11, kl)
          ])
        ])
      ])) : m("", !0)
    ], 64));
  }
}), Cl = ["aria-busy"], wl = { class: "field full-width" }, xl = { class: "cache-directory-name" }, Sl = { class: "cache-directory-actions" }, Tl = ["disabled"], Ml = ["disabled"], Pl = /* @__PURE__ */ Ve({
  __name: "BiliSettingsPanel",
  props: {
    active: { type: Boolean }
  },
  setup(A) {
    const c = A, h = _(!1), $ = _(!1), M = _(""), a = _(!1), I = _(null), P = _("尚未选择缓存目录");
    let y = !0, w = 0;
    async function B() {
      if (!c.active || h.value) return;
      const U = ++w;
      $.value = !0;
      try {
        const N = await gi();
        if (!y || U !== w) return;
        I.value = N, P.value = N?.name || "尚未选择缓存目录";
      } catch {
        y && U === w && (I.value = null, P.value = "缓存目录读取失败，请重试");
      } finally {
        y && U === w && ($.value = !1);
      }
    }
    async function V() {
      if (h.value || !c.active) return;
      const U = window.showDirectoryPicker;
      if (typeof U != "function") {
        M.value = "当前浏览器不支持目录选择，请使用支持此功能的 Edge 或 Chrome。", a.value = !0;
        return;
      }
      ++w, $.value = !1, h.value = !0, M.value = "";
      try {
        const N = await U.call(window, {
          id: "logicweaver-bili-cache",
          mode: "readwrite",
          startIn: I.value || "videos"
        });
        if (await mi(N), !y) return;
        I.value = N, P.value = N.name, a.value = !1, M.value = "目录已保存，新缓存将存入这里；已有视频不会移动或删除。";
      } catch (N) {
        y && N?.name !== "AbortError" && (a.value = !0, M.value = "目录选择或保存未确认，请重读目录核对后再试。");
      } finally {
        y && (h.value = !1);
      }
    }
    return X(() => c.active, (U) => {
      U ? B() : ++w;
    }, { immediate: !0 }), Dt(() => window.addEventListener("focus", B)), Ht(() => {
      y = !1, ++w, window.removeEventListener("focus", B);
    }), (U, N) => (o(), l("div", {
      class: "settings-subgroup bili-cache-settings",
      "aria-busy": h.value || $.value
    }, [
      e("div", wl, [
        e("p", xl, n($.value ? "正在读取缓存目录…" : P.value), 1),
        e("div", Sl, [
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !c.active || h.value || $.value,
            onClick: V
          }, n(h.value ? "正在保存…" : "选择或重新授权目录"), 9, Tl),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !c.active || h.value || $.value,
            onClick: B
          }, "重读目录", 8, Ml)
        ]),
        N[0] || (N[0] = e("p", { class: "hint" }, "仅更改之后的缓存位置；新缓存保留原目录关联，旧版记录需选择其实际所在目录后播放。不会自动扫描或搬移已有文件。", -1)),
        M.value ? (o(), l("p", {
          key: 0,
          class: L(["hint cache-directory-message", { "is-error": a.value }]),
          role: "status"
        }, n(M.value), 3)) : m("", !0)
      ])
    ], 8, Cl));
  }
}), Il = /* @__PURE__ */ Ze(Pl, [["__scopeId", "data-v-ccf6929a"]]), Dl = {
  class: "bili-cache-settings-view",
  "aria-labelledby": "bili-cache-settings-title"
}, Ll = { class: "cache-settings-header" }, Rl = { class: "cache-settings-card" }, Bl = /* @__PURE__ */ Ve({
  __name: "BiliCacheSettingsView",
  props: {
    active: { type: Boolean }
  },
  emits: ["back"],
  setup(A, { emit: c }) {
    const h = c;
    return ($, M) => (o(), l("section", Dl, [
      e("header", Ll, [
        M[1] || (M[1] = e("div", null, [
          e("h3", { id: "bili-cache-settings-title" }, "缓存设置"),
          e("p", null, "管理 B站视频的本地缓存目录")
        ], -1)),
        e("button", {
          type: "button",
          class: "cache-settings-back",
          onClick: M[0] || (M[0] = (a) => h("back"))
        }, "返回缓存视频")
      ]),
      e("div", Rl, [
        M[2] || (M[2] = e("h4", null, "视频缓存目录", -1)),
        M[3] || (M[3] = e("p", { class: "cache-settings-note" }, "选择后立即保存，无需到全局设置中操作。浏览器只提供文件夹名称，不显示完整磁盘路径。", -1)),
        Pe(Il, { active: A.active }, null, 8, ["active"])
      ])
    ]));
  }
}), zl = /* @__PURE__ */ Ze(Bl, [["__scopeId", "data-v-43d869dd"]]), El = { class: "fo-upg-shell" }, Fl = { class: "fo-upg-body" }, Al = { class: "fo-upg-sidebar" }, Vl = { class: "fo-upg-sidebar-head" }, Ul = { class: "fo-upg-group-items" }, Gl = ["onDragstart", "onDrop", "onClick"], ql = {
  key: 0,
  class: "fo-upg-tree-branch"
}, Nl = {
  key: 1,
  class: "fo-folder-icon"
}, Wl = { class: "fo-upg-group-name" }, Ol = { class: "fo-upg-vue-group-actions" }, Yl = ["onClick"], Kl = ["onClick"], jl = ["onClick"], Hl = ["placeholder"], Xl = {
  key: 1,
  class: "muted small"
}, Jl = { class: "fo-upg-main" }, Ql = { class: "fo-upg-main-head" }, Zl = { class: "fo-upg-main-title" }, es = { key: 0 }, ts = { class: "fo-upg-head-actions" }, is = { class: "fo-upg-filter-tabs" }, os = { class: "fo-upg-batch-wrap" }, ls = { class: "fo-upg-batch-count" }, ss = ["disabled"], ns = ["disabled"], as = { class: "fo-upg-toolbar" }, rs = { class: "fo-upg-search" }, us = ["disabled"], ds = {
  key: 0,
  class: "fo-bili-loading"
}, cs = {
  key: 1,
  class: "fo-bili-empty"
}, vs = {
  key: 2,
  class: "fo-bili-empty"
}, bs = {
  key: 3,
  class: "fo-bili-empty"
}, ps = ["title", "onContextmenu", "onClick"], fs = ["src"], gs = { class: "fo-upg-info" }, ms = { class: "fo-upg-name" }, hs = { class: "fo-upg-sign" }, ys = ["disabled", "onClick"], _s = {
  key: 1,
  class: "fo-upg-move-wrap"
}, ks = ["disabled"], $s = { class: "fo-upg-move-dropdown" }, Cs = ["disabled", "onClick"], ws = { key: 0 }, xs = {
  key: 0,
  class: "muted small",
  style: { padding: "6px 10px" }
}, Ss = ["disabled", "onClick"], Ts = { class: "fo-upg-pagination" }, Ms = { class: "fo-upg-page-info" }, Ps = {
  key: 0,
  class: "fo-upg-page-btns"
}, Is = ["disabled"], Ds = ["disabled"], Ls = { class: "fo-upg-page-cur" }, Rs = ["disabled"], Bs = ["disabled"], zs = /* @__PURE__ */ Ve({
  __name: "BiliUpGroupManager",
  setup(A) {
    const c = _(void 0), h = _(""), $ = _(""), M = _(""), a = _(""), I = _(!1), P = _(/* @__PURE__ */ new Set()), y = _(null);
    function w(k) {
      if (k.button !== 0 || k.target.closest("button,input")) return;
      const u = y.value;
      if (!u) return;
      const v = u.getBoundingClientRect(), D = v.left, ae = v.top, Ee = k.clientX, et = k.clientY;
      u.style.position = "fixed", u.style.left = `${D}px`, u.style.top = `${ae}px`, u.style.right = "auto", u.style.bottom = "auto", u.style.margin = "0", u.style.transform = "none";
      const Ue = (ge) => {
        const me = ge.clientX - Ee, Te = ge.clientY - et, Fe = Math.max(8, Math.min(window.innerWidth - 120, D + me)), je = Math.max(8, Math.min(window.innerHeight - 80, ae + Te));
        u.style.left = `${Fe}px`, u.style.top = `${je}px`;
      }, re = () => {
        window.removeEventListener("pointermove", Ue), window.removeEventListener("pointerup", re);
      };
      window.addEventListener("pointermove", Ue), window.addEventListener("pointerup", re);
    }
    const B = G(() => p.groups.find((k) => k.id === p.activeGroupId) || null), V = G(() => {
      const k = p.query.trim().toLowerCase(), u = p.activeGroupId;
      return p.followings.filter((v) => {
        if (k && !v.name.toLowerCase().includes(k) && !v.sign.toLowerCase().includes(k) && !v.mid.includes(k)) return !1;
        const D = v.groupIds.includes(u);
        return p.filter === "ingroup" ? D : p.onlyUngrouped ? !v.groupIds || v.groupIds.length === 0 : !0;
      });
    }), U = G(() => Math.max(1, Math.ceil(V.value.length / p.pageSize))), N = G(() => {
      const u = (Math.min(p.page, U.value) - 1) * p.pageSize;
      return V.value.slice(u, u + p.pageSize);
    }), ke = G(() => p.followings.filter((k) => k.groupIds.length === 0).length), j = _(null), E = /* @__PURE__ */ new Map();
    function Y(k) {
      const u = Math.max(1, Math.min(U.value, k));
      p.page = u, j.value && (j.value.scrollTop = 0);
    }
    X(() => [p.query, p.filter, p.onlyUngrouped], () => {
      p.page = 1, j.value && (j.value.scrollTop = 0);
    }), X(() => p.activeGroupId, (k, u) => {
      if (u && j.value) {
        const ae = `${u}_${p.filter}_${p.onlyUngrouped}`;
        E.set(ae, {
          page: p.page,
          scrollTop: j.value.scrollTop
        });
      }
      if (p.filter === "all")
        return;
      const v = `${k}_${p.filter}_${p.onlyUngrouped}`, D = E.get(v);
      D ? (p.page = Math.min(D.page, U.value), Pt(() => {
        j.value && (j.value.scrollTop = D.scrollTop);
      })) : (p.page = 1, Pt(() => {
        j.value && (j.value.scrollTop = 0);
      }));
    }), X(U, (k) => {
      p.page > k && (p.page = k);
    }), X(I, (k) => {
      k || P.value.clear();
    });
    function F(k) {
      c.value = k, h.value = "";
    }
    function ee() {
      c.value = void 0, h.value = "";
    }
    function q() {
      const k = h.value.trim();
      k && (he.dispatch("create-group", { name: k, parentId: c.value || "" }), ee());
    }
    function se(k) {
      $.value = k.id, M.value = k.name;
    }
    function de() {
      const k = M.value.trim();
      $.value && k && he.dispatch("rename-group", { id: $.value, name: k }), $.value = "", M.value = "";
    }
    function oe(k, u) {
      a.value = u, k.dataTransfer?.setData("application/x-logicweaver-up-group", u), k.dataTransfer && (k.dataTransfer.effectAllowed = "move");
    }
    function le(k, u) {
      const v = k.dataTransfer?.getData("application/x-logicweaver-up-group") || a.value;
      if (a.value = "", !v || v === u) return;
      const D = k.currentTarget?.getBoundingClientRect(), ae = D ? k.clientY - D.top : 0, Ee = D ? ae < D.height * 0.25 ? "before" : ae > D.height * 0.75 ? "after" : "into" : "into";
      he.dispatch("move-group", { sourceId: v, targetId: u, mode: Ee });
    }
    function f(k) {
      const u = k.dataTransfer?.getData("application/x-logicweaver-up-group") || a.value;
      a.value = "", u && he.dispatch("move-group", { sourceId: u, targetId: "", mode: "root" });
    }
    function ne(k, u) {
      !u || p.busyMid || he.dispatch("toggle-member", { groupId: u, mid: k });
    }
    function ce(k) {
      !p.activeGroupId || p.busyMid || he.dispatch("toggle-member", { groupId: p.activeGroupId, mid: k });
    }
    function ve(k, u) {
      he.dispatch("preview-up", { mid: u, clientX: k.clientX, clientY: k.clientY });
    }
    function $e(k) {
      const u = P.value;
      u.has(k) ? u.delete(k) : u.add(k);
    }
    function ze() {
      if (!p.activeGroupId || p.busyMid) return;
      const k = Array.from(P.value);
      if (!k.length) return;
      const u = k.filter((v) => {
        const D = p.followings.find((ae) => ae.mid === v);
        return D && !D.groupIds.includes(p.activeGroupId);
      });
      if (u.length) {
        for (const v of u)
          he.dispatch("toggle-member", { groupId: p.activeGroupId, mid: v });
        P.value.clear();
      }
    }
    function Ye() {
      if (!p.activeGroupId || p.busyMid) return;
      const k = Array.from(P.value);
      if (!k.length) return;
      const u = k.filter((v) => {
        const D = p.followings.find((ae) => ae.mid === v);
        return D && D.groupIds.includes(p.activeGroupId);
      });
      if (u.length) {
        for (const v of u)
          he.dispatch("toggle-member", { groupId: p.activeGroupId, mid: v });
        P.value.clear();
      }
    }
    function Ke() {
      for (const k of N.value) P.value.add(k.mid);
    }
    return (k, u) => r(p).open ? (o(), l("dialog", {
      key: 0,
      ref_key: "dialogEl",
      ref: y,
      class: "fo-up-group-dialog",
      open: "",
      onCancel: u[21] || (u[21] = S((v) => r(he).close(), ["prevent"]))
    }, [
      e("div", El, [
        e("header", {
          class: "fo-upg-head",
          onPointerdown: w
        }, [
          u[22] || (u[22] = e("h3", null, [
            e("span", null, "👥"),
            ye(" 关注分组与 UP 主管理")
          ], -1)),
          e("button", {
            type: "button",
            class: "fo-upg-close-btn",
            "aria-label": "关闭",
            title: "关闭管理面板",
            onClick: u[0] || (u[0] = (v) => r(he).close())
          }, "✕")
        ], 32),
        e("div", Fl, [
          e("aside", Al, [
            e("div", Vl, [
              u[23] || (u[23] = e("span", null, "我的分组", -1)),
              e("button", {
                type: "button",
                onClick: u[1] || (u[1] = (v) => F(null))
              }, "＋ 新建")
            ]),
            e("div", Ul, [
              e("div", {
                class: "fo-upg-root-dropzone",
                onDragover: u[2] || (u[2] = S(() => {
                }, ["prevent"])),
                onDrop: S(f, ["prevent"])
              }, "⇣ 拖至此处变为顶级分组", 32),
              c.value === null ? (o(), l("form", {
                key: 0,
                class: "fo-upg-create-box",
                onSubmit: S(q, ["prevent"])
              }, [
                ue(e("input", {
                  "onUpdate:modelValue": u[3] || (u[3] = (v) => h.value = v),
                  maxlength: "20",
                  placeholder: "输入分组名称…",
                  autofocus: ""
                }, null, 512), [
                  [Ie, h.value]
                ]),
                e("div", { class: "fo-upg-create-btns" }, [
                  e("button", {
                    type: "button",
                    class: "cancel",
                    onClick: ee
                  }, "取消"),
                  u[24] || (u[24] = e("button", {
                    class: "confirm",
                    type: "submit"
                  }, "确定", -1))
                ])
              ], 32)) : m("", !0),
              (o(!0), l(R, null, K(r(p).groups, (v) => (o(), l(R, {
                key: v.id
              }, [
                e("div", {
                  class: L(["fo-upg-group-item", { on: v.id === r(p).activeGroupId, "is-subgroup": v.depth > 0 }]),
                  style: _e({ paddingLeft: `${8 + v.depth * 18}px` }),
                  draggable: "true",
                  onDragstart: (D) => oe(D, v.id),
                  onDragover: u[8] || (u[8] = S(() => {
                  }, ["prevent"])),
                  onDrop: S((D) => le(D, v.id), ["prevent"]),
                  onClick: (D) => r(p).activeGroupId = v.id
                }, [
                  $.value === v.id ? (o(), l(R, { key: 0 }, [
                    ue(e("input", {
                      "onUpdate:modelValue": u[4] || (u[4] = (D) => M.value = D),
                      class: "fo-upg-rename-input",
                      maxlength: "20",
                      onClick: u[5] || (u[5] = S(() => {
                      }, ["stop"])),
                      onKeydown: u[6] || (u[6] = (D) => r(Xt)(D, de))
                    }, null, 544), [
                      [Ie, M.value]
                    ]),
                    e("button", {
                      type: "button",
                      onClick: S(de, ["stop"])
                    }, "✓"),
                    e("button", {
                      type: "button",
                      onClick: u[7] || (u[7] = S((D) => $.value = "", ["stop"]))
                    }, "✕")
                  ], 64)) : (o(), l(R, { key: 1 }, [
                    v.depth ? (o(), l("span", ql, "↳")) : (o(), l("i", Nl)),
                    e("span", Wl, n(v.name), 1),
                    e("small", null, n(v.upMids.length), 1),
                    e("span", Ol, [
                      e("button", {
                        type: "button",
                        title: "添加子分组",
                        onClick: S((D) => F(v.id), ["stop"])
                      }, "＋", 8, Yl),
                      e("button", {
                        type: "button",
                        title: "重命名",
                        onClick: S((D) => se(v), ["stop"])
                      }, "✎", 8, Kl),
                      e("button", {
                        type: "button",
                        class: "danger",
                        title: "删除",
                        onClick: S((D) => r(he).dispatch("delete-group", v.id), ["stop"])
                      }, "×", 8, jl)
                    ])
                  ], 64))
                ], 46, Gl),
                c.value === v.id ? (o(), l("form", {
                  key: 0,
                  class: "fo-upg-create-box",
                  style: _e({ marginLeft: `${18 + v.depth * 18}px` }),
                  onSubmit: S(q, ["prevent"])
                }, [
                  ue(e("input", {
                    "onUpdate:modelValue": u[9] || (u[9] = (D) => h.value = D),
                    maxlength: "20",
                    placeholder: `输入「${v.name}」的子分组名称…`,
                    autofocus: ""
                  }, null, 8, Hl), [
                    [Ie, h.value]
                  ]),
                  e("div", { class: "fo-upg-create-btns" }, [
                    e("button", {
                      type: "button",
                      class: "cancel",
                      onClick: ee
                    }, "取消"),
                    u[25] || (u[25] = e("button", {
                      class: "confirm",
                      type: "submit"
                    }, "确定", -1))
                  ])
                ], 36)) : m("", !0)
              ], 64))), 128)),
              !r(p).groups.length && !r(p).loading ? (o(), l("p", Xl, '暂无分组，请点击"＋ 新建"。')) : m("", !0)
            ])
          ]),
          e("section", Jl, [
            e("div", Ql, [
              e("div", Zl, [
                e("h4", null, n(B.value ? `分组：「${B.value.name}」` : "请先选择或新建分组"), 1),
                B.value ? (o(), l("span", es, "（本组 " + n(B.value.upMids.length) + " 位 · 共 " + n(r(p).followings.length) + " 位关注 · 未分组 " + n(ke.value) + " 位）", 1)) : m("", !0)
              ]),
              e("div", ts, [
                e("div", is, [
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-filter-tab", { on: r(p).filter === "all" }]),
                    onClick: u[10] || (u[10] = (v) => r(p).filter = "all")
                  }, "全部关注", 2),
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-filter-tab", { on: r(p).filter === "ingroup" }]),
                    onClick: u[11] || (u[11] = (v) => r(p).filter = "ingroup")
                  }, "本组已加", 2)
                ]),
                e("div", os, [
                  e("button", {
                    type: "button",
                    class: L(["fo-upg-batch-toggle", { on: I.value }]),
                    onClick: u[12] || (u[12] = (v) => I.value = !I.value)
                  }, n(I.value ? "退出批量" : "批量操作"), 3),
                  I.value && P.value.size > 0 ? (o(), l(R, { key: 0 }, [
                    e("span", ls, "已选 " + n(P.value.size), 1),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action add",
                      disabled: !B.value,
                      onClick: ze
                    }, "＋ 加入本组", 8, ss),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action remove",
                      disabled: !B.value,
                      onClick: Ye
                    }, "− 移出本组", 8, ns),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: Ke
                    }, "全选当页"),
                    e("button", {
                      type: "button",
                      class: "fo-upg-batch-action",
                      onClick: u[13] || (u[13] = (v) => P.value.clear())
                    }, "清除")
                  ], 64)) : m("", !0)
                ]),
                r(p).filter === "all" ? (o(), l("label", {
                  key: 0,
                  class: L(["fo-upg-switch", { on: r(p).onlyUngrouped }])
                }, [
                  ue(e("input", {
                    "onUpdate:modelValue": u[14] || (u[14] = (v) => r(p).onlyUngrouped = v),
                    type: "checkbox"
                  }, null, 512), [
                    [ri, r(p).onlyUngrouped]
                  ]),
                  u[26] || (u[26] = e("span", { class: "fo-upg-switch-track" }, [
                    e("span", { class: "fo-upg-switch-thumb" })
                  ], -1)),
                  u[27] || (u[27] = e("span", { class: "fo-upg-switch-text" }, "仅未分组 UP", -1))
                ], 2)) : m("", !0)
              ])
            ]),
            e("div", as, [
              e("div", rs, [
                u[28] || (u[28] = e("span", null, "🔍", -1)),
                ue(e("input", {
                  "onUpdate:modelValue": u[15] || (u[15] = (v) => r(p).query = v),
                  type: "search",
                  placeholder: "搜索关注的 UP 主…"
                }, null, 512), [
                  [Ie, r(p).query]
                ])
              ]),
              e("button", {
                type: "button",
                class: "fo-upg-refresh-btn",
                disabled: r(p).refreshing,
                onClick: u[16] || (u[16] = (v) => r(he).dispatch("refresh"))
              }, n(r(p).refreshing ? "刷新中…" : "↻ 刷新关注"), 9, us)
            ]),
            e("div", {
              ref_key: "listRef",
              ref: j,
              class: "fo-upg-list"
            }, [
              r(p).loading ? (o(), l("div", ds, [...u[29] || (u[29] = [
                e("i", null, null, -1),
                e("span", null, "正在加载关注的 UP 主列表…", -1)
              ])])) : r(p).error ? (o(), l("p", cs, n(r(p).error), 1)) : B.value ? N.value.length ? (o(!0), l(R, { key: 4 }, K(N.value, (v) => (o(), l("article", {
                key: v.mid,
                class: L(["fo-upg-card", { selected: I.value && P.value.has(v.mid) }]),
                title: `右键查看「${v.name}」近期投稿`,
                onContextmenu: S((D) => ve(D, v.mid), ["prevent"]),
                onClick: (D) => I.value ? $e(v.mid) : void 0
              }, [
                e("img", {
                  src: v.face,
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer"
                }, null, 8, fs),
                e("div", gs, [
                  e("div", ms, n(v.name), 1),
                  e("div", hs, n(v.sign || "暂无签名"), 1)
                ]),
                I.value ? (o(), l("div", {
                  key: 1,
                  class: L(["fo-upg-batch-check", { checked: P.value.has(v.mid) }])
                }, n(P.value.has(v.mid) ? "✓" : ""), 3)) : (o(), l(R, { key: 0 }, [
                  v.groupIds.includes(r(p).activeGroupId) ? (o(), l("button", {
                    key: 0,
                    type: "button",
                    class: "fo-upg-toggle-btn in-group",
                    disabled: r(p).busyMid === v.mid,
                    onClick: S((D) => ce(v.mid), ["stop"])
                  }, n(r(p).busyMid === v.mid ? "处理中…" : `移出 ${B.value?.name || ""}`), 9, ys)) : v.groupIds.length > 0 ? (o(), l("div", _s, [
                    e("button", {
                      type: "button",
                      class: "fo-upg-toggle-btn belongs-other fo-upg-move-trigger",
                      disabled: r(p).busyMid === v.mid
                    }, n(r(p).busyMid === v.mid ? "处理中…" : `📁 ${v.groupName || "已分组"}`), 9, ks),
                    e("div", $s, [
                      u[31] || (u[31] = e("div", { class: "fo-upg-move-title" }, "移动到分组", -1)),
                      (o(!0), l(R, null, K(r(p).groups, (D) => (o(), l("button", {
                        key: D.id,
                        type: "button",
                        class: L(["fo-upg-move-item", { active: v.groupIds.includes(D.id) }]),
                        disabled: r(p).busyMid === v.mid,
                        onClick: S((ae) => ne(v.mid, D.id), ["stop"])
                      }, [
                        u[30] || (u[30] = e("i", { class: "fo-folder-icon small" }, null, -1)),
                        e("span", null, n(D.name), 1),
                        v.groupIds.includes(D.id) ? (o(), l("small", ws, "✓ 已加入")) : m("", !0)
                      ], 10, Cs))), 128)),
                      r(p).groups.length ? m("", !0) : (o(), l("p", xs, "暂无分组"))
                    ])
                  ])) : r(p).activeGroupId ? (o(), l("button", {
                    key: 2,
                    type: "button",
                    class: "fo-upg-toggle-btn",
                    disabled: r(p).busyMid === v.mid,
                    onClick: S((D) => ce(v.mid), ["stop"])
                  }, n(r(p).busyMid === v.mid ? "处理中…" : "＋ 加入"), 9, Ss)) : m("", !0)
                ], 64))
              ], 42, ps))), 128)) : (o(), l("p", bs, "没有符合条件的 UP 主。")) : (o(), l("p", vs, "请先新建或选择一个分组。"))
            ], 512),
            e("div", Ts, [
              e("div", Ms, "共 " + n(V.value.length) + " 位 UP 主 · 每页 " + n(r(p).pageSize) + " 位", 1),
              U.value > 1 ? (o(), l("div", Ps, [
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(p).page <= 1,
                  onClick: u[17] || (u[17] = (v) => Y(1))
                }, "« 首页", 8, Is),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(p).page <= 1,
                  onClick: u[18] || (u[18] = (v) => Y(r(p).page - 1))
                }, "‹ 上一页", 8, Ds),
                e("span", Ls, n(r(p).page) + " / " + n(U.value), 1),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(p).page >= U.value,
                  onClick: u[19] || (u[19] = (v) => Y(r(p).page + 1))
                }, "下一页 ›", 8, Rs),
                e("button", {
                  type: "button",
                  class: "fo-upg-page-btn",
                  disabled: r(p).page >= U.value,
                  onClick: u[20] || (u[20] = (v) => Y(U.value))
                }, "末页 »", 8, Bs)
              ])) : m("", !0)
            ])
          ])
        ])
      ])
    ], 544)) : m("", !0);
  }
}), Es = /* @__PURE__ */ Ze(zs, [["__scopeId", "data-v-967faee9"]]);
function Yt(A) {
  if (A.ctrlKey || A.metaKey || A.shiftKey || Math.abs(A.deltaX) >= Math.abs(A.deltaY)) return;
  const c = A.currentTarget, h = A.deltaY * (A.deltaMode === 1 ? 16 : A.deltaMode === 2 ? c.clientWidth : 1), $ = c.scrollWidth - c.clientWidth;
  (h > 0 && c.scrollLeft < $ || h < 0 && c.scrollLeft > 0) && (A.preventDefault(), A.stopPropagation(), c.scrollLeft += h);
}
const Fs = {
  class: "fm-pane",
  id: "pane-organizer"
}, As = { id: "fo-body" }, Vs = { class: "fo-bili-sidebar" }, Us = ["title"], Gs = { class: "fo-sidebar-toggle-title" }, qs = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Ns = ["aria-expanded", "title"], Ws = { class: "fo-sidebar-toggle-chevron" }, Os = { class: "fo-sidebar-features-wrap" }, Ys = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Ks = ["title"], js = { class: "fo-sidebar-sub-main" }, Hs = { class: "fo-sidebar-sub-text" }, Xs = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Js = ["title"], Qs = { class: "fo-sidebar-sub-main" }, Zs = { class: "fo-sidebar-sub-text" }, en = { class: "fo-sidebar-sub-wrap fo-sidebar-recommend-wrap" }, tn = ["title"], on = { class: "fo-sidebar-sub-main" }, ln = { class: "fo-sidebar-sub-text" }, sn = { class: "fo-sidebar-sub-wrap fo-sidebar-radio-wrap" }, nn = ["title"], an = { class: "fo-sidebar-sub-main" }, rn = { class: "fo-sidebar-sub-text" }, un = { class: "fo-sidebar-favorite-hub" }, dn = { class: "fo-sidebar-sub-main" }, cn = { class: "fo-sidebar-sub-text" }, vn = ["title", "aria-label"], bn = {
  key: 0,
  class: "fo-move-target-banner"
}, pn = {
  class: "fo-bili-folder-list",
  "aria-label": "B站收藏夹"
}, fn = {
  key: 0,
  class: "fo-bili-section-divider"
}, gn = ["onDragover", "onDragleave", "onDrop"], mn = { class: "fo-bili-section-title" }, hn = ["data-folder-id", "data-folder-kind", "draggable", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], yn = ["aria-expanded", "onClick", "onKeydown", "onDragstart", "onDragover", "onDragleave", "onDrop"], _n = {
  class: "fo-group-caret",
  "aria-hidden": "true"
}, kn = {
  key: 0,
  class: "muted small"
}, $n = {
  key: 0,
  class: "fo-bili-loading"
}, Cn = {
  key: 1,
  class: "fo-bili-empty fo-bili-login-guide"
}, wn = { class: "fo-bili-login-card" }, xn = { class: "fo-bili-login-actions" }, Sn = {
  key: 2,
  class: "fo-bili-empty"
}, Tn = { class: "fo-bili-hero fo-hero-persistent" }, Mn = { class: "fo-hero-left" }, Pn = ["src"], In = {
  key: 1,
  class: "fo-folder-icon"
}, Dn = { class: "fo-hero-folder-info" }, Ln = ["placeholder", "aria-label"], Rn = ["title"], Bn = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, zn = { class: "card-fullscreen-bili-suggest-head" }, En = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, Fn = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, An = ["onClick", "onContextmenu"], Vn = { class: "card-fullscreen-bili-thumb" }, Un = ["src"], Gn = { key: 0 }, qn = { class: "card-fullscreen-bili-video-copy" }, Nn = { class: "fo-bili-actions" }, Wn = ["title"], On = { class: "bili-header-msg-label" }, Yn = ["disabled"], Kn = { class: "fo-bili-toolbar" }, jn = {
  key: 0,
  class: "fo-bili-sort"
}, Hn = ["onClick"], Xn = {
  class: "fo-mini-dock-anchor",
  "aria-label": "视频标签页"
}, Jn = ["title"], Qn = { class: "fo-video-tab-title" }, Zn = { class: "fo-video-tab-actions" }, ea = ["title"], ta = {
  key: 2,
  class: "fo-bili-batch-actions"
}, ia = { class: "fo-batch-count" }, oa = {
  key: 0,
  class: "muted small",
  role: "status"
}, la = ["aria-busy"], sa = {
  key: 0,
  class: "fo-bili-empty"
}, na = ["data-batch-id", "onContextmenu"], aa = { class: "fo-bili-thumb" }, ra = {
  key: 0,
  class: "fo-batch-check",
  title: "选择此视频"
}, ua = ["checked", "onChange"], da = ["href", "onClick"], ca = ["src"], va = { class: "fo-bili-count" }, ba = { class: "fo-bili-duration" }, pa = { class: "fo-bili-title-row" }, fa = ["href", "onClick"], ga = ["aria-expanded", "onClick"], ma = {
  key: 0,
  class: "fo-card-menu"
}, ha = ["onClick"], ya = ["onClick"], _a = ["onClick"], ka = { class: "fo-bili-meta" }, $a = ["onClick"], Ca = {
  key: 1,
  class: "fo-pager"
}, wa = ["disabled"], xa = { class: "fo-page-num" }, Sa = ["disabled"], Ta = { class: "fo-bili-hero fo-hero-persistent fo-cached-hero" }, Ma = { class: "fo-hero-left" }, Pa = { class: "fo-hero-folder-info" }, Ia = { class: "fo-bili-actions" }, Da = {
  key: 0,
  class: "fo-bili-loading"
}, La = {
  key: 0,
  class: "fo-bili-empty"
}, Ra = { class: "fo-bili-thumb" }, Ba = ["onClick"], za = ["src"], Ea = { class: "fo-bili-title-row" }, Fa = ["onClick"], Aa = ["onClick"], Va = { class: "fo-bili-meta" }, Ua = {
  key: 2,
  class: "fo-pager"
}, Ga = ["disabled"], qa = { class: "fo-page-num" }, Na = ["disabled"], Wa = { class: "fo-bili-hero" }, Oa = { class: "fo-bili-heading" }, Ya = { class: "fo-feed-hero-title" }, Ka = ["placeholder", "aria-label"], ja = ["title"], Ha = {
  key: 0,
  class: "card-fullscreen-bili-suggestions",
  role: "listbox"
}, Xa = { class: "card-fullscreen-bili-suggest-head" }, Ja = {
  key: 0,
  class: "card-fullscreen-bili-suggest-status"
}, Qa = {
  key: 1,
  class: "card-fullscreen-bili-suggest-status"
}, Za = ["onClick", "onContextmenu"], er = { class: "card-fullscreen-bili-thumb" }, tr = ["src"], ir = { key: 0 }, or = { class: "card-fullscreen-bili-video-copy" }, lr = { class: "fo-bili-actions" }, sr = { class: "fo-bili-toolbar" }, nr = { class: "fo-bili-sort" }, ar = { class: "fo-vue-feed-label" }, rr = {
  key: 0,
  class: "fo-bili-loading",
  role: "status"
}, ur = {
  key: 1,
  class: "fo-bili-empty",
  role: "alert"
}, dr = { class: "fo-bili-grid" }, cr = {
  key: 0,
  class: "fo-bili-empty"
}, vr = ["onContextmenu"], br = { class: "fo-bili-thumb" }, pr = ["href", "onClick"], fr = ["src"], gr = { class: "fo-bili-count" }, mr = { class: "fo-bili-duration" }, hr = { class: "fo-bili-title-row" }, yr = ["href", "onClick"], _r = { class: "fo-bili-meta" }, kr = {
  key: 0,
  class: "fo-pager"
}, $r = ["disabled"], Cr = { class: "fo-page-num" }, wr = ["disabled"], xr = { class: "fo-bili-toolbar" }, Sr = { class: "fo-feed-count-tag" }, Tr = {
  key: 0,
  class: "fo-bili-loading"
}, Mr = {
  key: 1,
  class: "fo-bili-empty"
}, Pr = {
  key: 0,
  class: "fo-bili-empty"
}, Ir = { class: "fo-bili-thumb" }, Dr = ["href", "onClick"], Lr = ["src"], Rr = { class: "fo-bili-count" }, Br = { class: "fo-bili-duration" }, zr = { class: "fo-bili-title-row" }, Er = ["href", "onClick"], Fr = ["aria-expanded", "onClick"], Ar = {
  key: 0,
  class: "fo-card-menu"
}, Vr = ["onClick"], Ur = ["onClick"], Gr = ["onClick"], qr = ["onClick"], Nr = ["onClick"], Wr = { class: "fo-bili-meta" }, Or = ["onClick"], Yr = { class: "fo-pager" }, Kr = ["disabled"], jr = { class: "fo-page-num" }, Hr = ["disabled"], Xr = { class: "fo-bili-hero fo-following-hero" }, Jr = { class: "fo-bili-heading" }, Qr = { class: "fo-feed-hero-title" }, Zr = {
  key: 0,
  class: "fo-feed-badge"
}, eu = { class: "fo-up-groups-bar" }, tu = ["onClick"], iu = { class: "count" }, ou = { class: "fo-up-groups-actions" }, lu = ["title"], su = { class: "fo-bili-actions" }, nu = {
  key: 0,
  class: "fo-up-members-strip"
}, au = { class: "fo-up-members-label" }, ru = { class: "fo-up-members-list" }, uu = ["title", "onClick", "onContextmenu"], du = ["src"], cu = { class: "fo-bili-toolbar" }, vu = { class: "fo-feed-count-tag" }, bu = {
  key: 1,
  class: "fo-bili-loading"
}, pu = {
  key: 2,
  class: "fo-bili-empty"
}, fu = {
  key: 0,
  class: "fo-bili-empty"
}, gu = { class: "fo-bili-thumb" }, mu = ["href", "onClick"], hu = ["src"], yu = { class: "fo-bili-count" }, _u = { class: "fo-bili-duration" }, ku = { class: "fo-bili-title-row" }, $u = ["href", "onClick"], Cu = ["aria-expanded", "onClick"], wu = {
  key: 0,
  class: "fo-card-menu"
}, xu = ["onClick"], Su = ["onClick"], Tu = ["onClick"], Mu = ["onClick"], Pu = { class: "fo-bili-meta" }, Iu = ["onClick"], Du = { class: "fo-pager" }, Lu = ["disabled"], Ru = { class: "fo-page-num" }, Bu = ["disabled"], zu = {
  key: 4,
  id: "fo-vue-subscription-main",
  class: "fo-bili-main fo-vue-subscription-main"
}, Eu = { class: "bili-sub-vue-shell" }, Fu = {
  key: 0,
  class: "fo-bili-loading"
}, Au = {
  key: 1,
  class: "fo-bili-empty"
}, Vu = {
  key: 2,
  class: "fo-bili-empty"
}, Uu = {
  key: 5,
  id: "fo-vue-radio-main",
  class: "fo-bili-main fo-vue-radio-main"
}, Gu = { class: "fo-bili-hero fo-radio-hero" }, qu = { class: "fo-hero-left" }, Nu = { class: "fo-hero-folder-info" }, Wu = { class: "fo-radio-title-line" }, Ou = { class: "fo-bili-actions" }, Yu = { class: "bili-radio-layout fo-vue-radio-layout" }, Ku = { class: "bili-radio-folders" }, ju = { id: "bili-radio-folders" }, Hu = ["onClick"], Xu = {
  key: 0,
  class: "muted small"
}, Ju = { class: "bili-radio-library" }, Qu = { class: "bili-radio-library-head" }, Zu = {
  key: 0,
  class: "bili-radio-lib-pager"
}, ed = ["disabled"], td = ["disabled"], id = {
  key: 0,
  role: "alert",
  class: "muted small"
}, od = {
  id: "bili-radio-videos",
  class: "bili-radio-videos two-col bili-radio-card-grid"
}, ld = ["title", "onClick"], sd = { class: "fo-bili-thumb" }, nd = ["src"], ad = {
  key: 1,
  class: "bili-radio-cover-ph"
}, rd = {
  key: 2,
  class: "fo-bili-duration"
}, ud = { class: "bili-radio-card-body" }, dd = { class: "fo-bili-title-row" }, cd = { class: "fo-title-link fo-bili-title" }, vd = ["title", "aria-label", "onClick"], bd = { class: "fo-bili-meta" }, pd = {
  key: 0,
  class: "bili-radio-in-queue-tag"
}, fd = {
  key: 1,
  class: "bili-radio-hint-add"
}, gd = {
  key: 0,
  class: "muted small"
}, md = { class: "bili-radio-editor" }, hd = { class: "bili-radio-name-row" }, yd = ["title"], _d = {
  class: "bili-radio-cover-stage",
  "aria-label": "电台封面播放器"
}, kd = { class: "bili-radio-stage-body" }, $d = ["title"], Cd = ["src", "alt"], wd = {
  key: 1,
  class: "bili-radio-cover-ph bili-radio-stage-ph"
}, xd = { class: "bili-radio-stage-cover-overlay" }, Sd = { class: "bili-radio-stage-play-pill" }, Td = {
  key: 2,
  class: "bili-radio-stage-live-badge"
}, Md = {
  key: 3,
  class: "fo-bili-duration"
}, Pd = { class: "bili-radio-stage-meta" }, Id = ["title"], Dd = { class: "bili-radio-stage-sub" }, Ld = {
  key: 0,
  class: "count-pill"
}, Rd = {
  key: 0,
  class: "bili-radio-stage-progress"
}, Bd = { class: "bili-radio-stage-bar" }, zd = { class: "bili-radio-stage-time" }, Ed = {
  class: "bili-radio-stage-controls",
  role: "group",
  "aria-label": "封面播放器控制"
}, Fd = ["disabled"], Ad = ["title", "aria-label"], Vd = ["disabled"], Ud = ["title", "aria-label"], Gd = {
  key: 1,
  class: "muted small bili-radio-queue-empty"
}, qd = { class: "bili-radio-actions" }, Nd = ["disabled"], Wd = ["disabled"], Od = ["title"], Yd = {
  key: 2,
  class: "fo-context-divider"
}, Kt = "lw-bili-active-mode", Tt = 14, Kd = /* @__PURE__ */ Ve({
  __name: "BilibiliWorkspace",
  setup(A) {
    const { style: c, media: h } = Ti("bilibili");
    function $(s, t) {
      !t.mid && !t.name || fe.showUpRecentVideosPreview(
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
    function M() {
      xi.togglePanel();
    }
    const a = G(() => O.organizer), I = _(!1), { active: P } = vi("daily-bilibili", "/bilibili.html");
    X(() => P.value && a.value.mode === "recommendations", (s) => {
      fe.setRecommendationsActive(s);
    }, { immediate: !0, flush: "sync" }), X(() => P.value && a.value.mode === "following", (s) => {
      fe.setFollowingActive(s);
    }, { immediate: !0, flush: "sync" }), X(() => P.value && a.value.mode === "subscription", (s) => {
      fe.setSubscriptionActive(s);
    }, { immediate: !0, flush: "sync" }), X(() => P.value && a.value.mode === "cache", (s) => {
      s || (I.value = !1);
    });
    const y = _(a.value.query), w = _(null), B = _(7), V = _(1), U = G(() => B.value * 3), N = G(() => Math.max(1, Math.ceil(a.value.cachedVideos.length / U.value))), ke = G(() => a.value.cachedVideos.slice((V.value - 1) * U.value, V.value * U.value));
    X(N, (s) => {
      V.value = Math.min(V.value, s);
    });
    const j = G(() => !!a.value.loadedFolderId && a.value.loadedFolderId === O.activeFolderId), E = _(""), Y = _({ visible: !1, x: 0, y: 0, video: null, folder: null }), { menuRef: F, style: ee } = Si({
      visible: () => Y.value.visible,
      anchor: () => Y.value,
      dismiss: () => {
        Y.value.visible = !1;
      }
    }), q = _(
      typeof localStorage < "u" && localStorage.getItem("bili_sidebar_features_collapsed") === "true"
    );
    function se() {
      q.value = !q.value;
      try {
        localStorage.setItem("bili_sidebar_features_collapsed", String(q.value));
      } catch {
      }
    }
    function de() {
      we.bvid && ui.open({
        bvid: we.bvid,
        cid: we.cid,
        title: we.title
      });
    }
    function oe() {
      we.collapsed && bt.toggleCollapse(), bt.bringToFront();
    }
    function le() {
      bt.close();
    }
    X(() => a.value.query, (s) => {
      y.value = s;
    }), X(y, (s) => {
      (!s || !s.trim()) && a.value.query && f("organizer-search", "");
    });
    function f(s, t) {
      Be.dispatch(s, t);
    }
    function ne(s) {
      s.group || ht(), f(s.group ? "toggle-folder-group" : "select-folder", { id: s.id, kind: s.kind });
    }
    const ce = _(""), ve = _(""), $e = _("before"), ze = _(!1);
    function Ye(s, t) {
      t.kind === "created" && (ce.value = t.id, s.dataTransfer?.setData("application/x-logicweaver-favorite-node", t.id), s.dataTransfer?.setData("text/plain", t.id), s.dataTransfer && (s.dataTransfer.effectAllowed = "move"));
    }
    function Ke(s, t) {
      if (t.kind !== "created" || !ce.value || ce.value === t.id) return;
      s.preventDefault(), s.dataTransfer && (s.dataTransfer.dropEffect = "move");
      const i = s.currentTarget;
      if (!i) return;
      const d = i.getBoundingClientRect(), x = (s.clientY - d.top) / Math.max(1, d.height), Q = t.group && x > 0.25 && x < 0.75 ? "into" : x >= 0.5 ? "after" : "before";
      ve.value = t.id, $e.value = Q;
    }
    function k(s, t) {
      const i = s.relatedTarget, d = s.currentTarget;
      d && i && d.contains(i) || ve.value === t.id && (ve.value = "");
    }
    function u() {
      ce.value = "", ve.value = "", ze.value = !1;
    }
    function v(s, t) {
      s.preventDefault();
      const i = ce.value || s.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "", d = $e.value || (t.group ? "into" : "after");
      u(), !(!i || i === t.id || t.kind !== "created") && f("move-folder-node", { sourceId: i, targetId: t.id, mode: d });
    }
    function D(s) {
      ce.value && (s.preventDefault(), s.dataTransfer && (s.dataTransfer.dropEffect = "move"), ze.value = !0);
    }
    function ae(s) {
      const t = s.relatedTarget, i = s.currentTarget;
      i && t && i.contains(t) || (ze.value = !1);
    }
    function Ee(s) {
      s.preventDefault();
      const t = ce.value || s.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
      u(), t && f("move-folder-node", { sourceId: t, targetId: "root", mode: "into" });
    }
    function et() {
      const s = y.value.trim();
      f("organizer-search", s);
    }
    function Ue() {
      !y.value.trim() && a.value.query && f("organizer-search", "");
    }
    const re = _(""), ge = _(!1), me = _(!1), Te = _("hot"), Fe = _(""), je = G(() => Te.value === "live" ? z("bili.searchLiveTitle", { keyword: Fe.value }) : z("bili.searchSuggestTitle")), st = G(() => Te.value === "live" ? z("bili.searchLiveSubtitle") : z("bili.searchSuggestSubtitle")), C = _([]), g = _(null), b = _(!1), T = _(""), W = _(1), H = _(0), te = _(!1), Ge = _(!1), ie = _(""), He = _([]);
    let qe = 0, Ne = 0;
    X(() => a.value.mode, (s) => {
      s !== "recommendations" && ht();
    });
    const tt = _([]);
    let nt = 0, Ce = null;
    function ft(s) {
      if (!s) return null;
      const t = s.bvid || (String(s.param || "").startsWith("BV") ? s.param : "");
      if (!t && !s.aid && !s.id) return null;
      const i = String(s.pic || s.cover || "").replace(/^http:/, "https:"), d = i.startsWith("//") ? `https:${i}` : i, x = String(s.title || "").replace(/<[^>]+>/g, ""), Q = Number(s.duration || 0), be = Q > 0 ? `${Math.floor(Q / 60)}:${String(Q % 60).padStart(2, "0")}` : String(s.duration || ""), Me = s.stat?.view || s.play || 0, ni = Number(Me) >= 1e4 ? `${(Number(Me) / 1e4).toFixed(1)}万` : String(Number(Me || 0)), ai = s.owner?.name || s.name || s.author || z("bili.upDefault");
      return {
        bvid: t,
        aid: String(s.aid || s.id || ""),
        title: x,
        cover: d,
        durationText: be,
        playText: ni,
        upper: ai
      };
    }
    async function gt() {
      if (Te.value = "hot", ge.value = !0, tt.value.length && Date.now() - nt < 9e4) {
        C.value = tt.value;
        return;
      }
      me.value = !0;
      try {
        const t = await (await fetch("https://api.bilibili.com/x/web-interface/index/top/feed/rcmd?ps=8&fresh_idx=1", { credentials: "include" })).json();
        let i = Array.isArray(t.data?.item) ? t.data.item : [];
        if (!i.length) {
          const Q = await (await fetch("https://api.bilibili.com/x/web-interface/popular?ps=8&pn=1", { credentials: "include" })).json();
          i = Array.isArray(Q.data?.list) ? Q.data.list : [];
        }
        const d = i.map(ft).filter(Boolean);
        tt.value = d, nt = Date.now(), re.value.trim() || (C.value = d);
      } catch {
        C.value = [];
      } finally {
        me.value = !1;
      }
    }
    function Lt() {
      re.value.trim() ? Bt(re.value.trim()) : gt();
    }
    function Rt() {
      const s = re.value.trim();
      if (clearTimeout(Ce), !s) {
        gt();
        return;
      }
      Ce = setTimeout(() => {
        Bt(s);
      }, 320);
    }
    async function Bt(s) {
      const t = ++Ne;
      ge.value = !0, Te.value = "live", Fe.value = s, me.value = !0;
      try {
        let i = null;
        if (window.LogicWeaverBiliSearchActions?.search)
          try {
            i = await window.LogicWeaverBiliSearchActions.search(s);
          } catch {
          }
        if (!i || i.code !== 0) {
          const x = `search_type=video&keyword=${encodeURIComponent(s)}&page=1&page_size=12`;
          i = await (await fetch(`https://api.bilibili.com/x/web-interface/search/type?${x}`, { credentials: "include" })).json();
        }
        if (t !== Ne || re.value.trim() !== s) return;
        const d = Array.isArray(i?.data?.result) ? i.data.result : [];
        C.value = d.slice(0, 10).map(ft).filter(Boolean);
      } catch {
        t === Ne && (C.value = []);
      } finally {
        t === Ne && (me.value = !1);
      }
    }
    function at(s) {
      ge.value = !1;
      const t = s.bvid || (String(s.param || s.id || "").startsWith("BV") ? s.param || s.id : "");
      t || s.aid ? bt.openVideo({
        bvid: t,
        aid: s.aid,
        title: s.title,
        cover: s.cover,
        author: s.upper
      }) : window.LogicWeaverBiliSearchActions?.local ? window.LogicWeaverBiliSearchActions.local(s) : window.open(`https://www.bilibili.com/video/${t || s.bvid || s.id}`, "_blank");
    }
    function mt(s, t) {
      Et(s, {
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
    function ht() {
      b.value = !1, qe++, Ge.value = !1;
    }
    async function rt(s, t) {
      const i = ++qe;
      b.value = !0, T.value = s, W.value = t, Ge.value = !0, ie.value = "", He.value = [], H.value = 0, te.value = !1;
      try {
        let d;
        try {
          d = await fe.searchActions.search(s, t, 20);
        } catch {
        }
        if (!d || d.code !== 0) {
          const be = new URLSearchParams({ search_type: "video", keyword: s, page: String(t), page_size: "20" }), Me = await fetch(`https://api.bilibili.com/x/web-interface/search/type?${be}`, { credentials: "include" });
          if (!Me.ok) throw new Error(`HTTP ${Me.status}`);
          d = await Me.json();
        }
        if (d?.code !== 0 || !Array.isArray(d?.data?.result))
          throw new Error(d?.message || "B站没有返回有效的搜索结果");
        if (i !== qe) return;
        const x = d.data.result;
        He.value = x.map(ft).filter(Boolean);
        const Q = Number(d.data.numPages || d.data.num_pages || 0);
        H.value = Number.isFinite(Q) && Q > 0 ? Math.floor(Q) : 0, te.value = H.value ? t < H.value : x.length >= 20;
      } catch (d) {
        i === qe && (ie.value = `搜索失败：${d instanceof Error ? d.message : "请稍后重试"}`);
      } finally {
        i === qe && (Ge.value = !1);
      }
    }
    function yt() {
      const s = re.value.trim();
      if (clearTimeout(Ce), Ne++, me.value = !1, ge.value = !1, !s) {
        gt();
        return;
      }
      rt(s, 1);
    }
    X(() => [P.value, ki.bilibili?.id], ([s, t]) => {
      if (!s || !t) return;
      const i = _i("bilibili");
      i && (f("open-recommendations"), re.value = i.keyword, yt());
    }, { immediate: !0 });
    function zt(s) {
      g.value && !g.value.contains(s.target) && (ge.value = !1);
    }
    function _t(s) {
      Y.value.visible = !1, E.value = E.value === s ? "" : s;
    }
    function Et(s, t, i = !0) {
      E.value = "", Y.value = {
        visible: !0,
        x: s.clientX,
        y: s.clientY,
        video: t,
        folder: i && O.activeFolderId ? { id: String(O.activeFolderId), title: a.value.folderTitle } : null
      };
    }
    function ut(s) {
      if (s instanceof KeyboardEvent) {
        s.key === "Escape" && (E.value = "", Y.value.visible = !1, a.value.isTargetPickMode && f("organizer-cancel-move-target"));
        return;
      }
      const t = s.target;
      t?.closest(".fo-card-menu, .fo-card-more") || (E.value = ""), t?.closest(".fo-context-menu") || (Y.value.visible = !1);
    }
    const Jt = typeof document < "u" && document.body.classList.contains("bili-standalone-body");
    function kt() {
      const s = w.value;
      if (!s || !s.clientWidth) return;
      const t = getComputedStyle(s), i = s.clientWidth - parseFloat(t.paddingLeft) - parseFloat(t.paddingRight), d = parseFloat(t.getPropertyValue("--favorite-card-min")) || 168, x = di(i, d);
      if (x !== B.value) {
        const be = (V.value - 1) * U.value;
        B.value = x, V.value = Math.floor(be / U.value) + 1;
      }
      a.value.mode === "organizer" && Be.setOrganizerColumns(x);
      const Q = x * 3;
      a.value.mode === "recommendations" && fe.rcmdState.pageSize !== Q && (fe.rcmdState.pageSize = Q, fe.loadRecommendations(!0)), a.value.mode === "following" && fe.feedState.pageSize !== Q && (fe.feedState.pageSize = Q, fe.loadFollowing(!0));
    }
    X(w, (s, t, i) => {
      if (!s) return;
      let d;
      const x = new ResizeObserver(() => {
        clearTimeout(d), d = setTimeout(kt, 180);
      });
      x.observe(s), i(() => {
        clearTimeout(d), x.disconnect();
      });
    }, { flush: "post" }), X(() => a.value.loading, (s) => {
      s || kt();
    });
    const Qt = ["organizer", "cache", "recommendations", "following", "radio"];
    let $t = !1;
    function Zt() {
      try {
        const s = sessionStorage.getItem(Kt);
        return s && Qt.includes(s) ? s : "organizer";
      } catch {
        return "organizer";
      }
    }
    function Ft() {
      if ($t || !P.value) return;
      $t = !0;
      const s = Zt();
      s === "recommendations" ? f("open-recommendations") : s === "following" ? f("open-following") : s === "subscription" ? f("open-sub-video") : s === "cache" ? f("open-cache") : s === "radio" && f("open-radio");
    }
    X(() => a.value.mode, (s) => {
      if (!(!$t && !P.value))
        try {
          sessionStorage.setItem(Kt, s);
        } catch {
        }
    }), X(P, (s) => {
      s && Ft();
    }), Dt(() => {
      import("./bilibili-channel.service-BBBASZOl.js").catch((s) => console.error("[Bilibili] 频道动作服务加载失败", s)), kt(), Be.loadOrganizer(), Ft(), document.addEventListener("pointerdown", ut, !0), document.addEventListener("pointerdown", zt), window.addEventListener("keydown", ut), window.setBiliMiniDockVisible?.(!0), requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }), X(() => [a.value.videos, a.value.mode], () => {
      requestAnimationFrame(() => {
        window.positionBiliMiniDock?.();
      });
    }, { flush: "post" }), Ht(() => {
      fe.setRecommendationsActive(!1), fe.setFollowingActive(!1), fe.setSubscriptionActive(!1), document.removeEventListener("pointerdown", ut, !0), document.removeEventListener("pointerdown", zt), window.removeEventListener("keydown", ut);
    });
    function Ct(s, t) {
      E.value = "", Y.value.visible = !1;
      const i = String(typeof s == "object" ? s.id || s.bvid || s.aid || "" : s), d = typeof s == "object" ? s : a.value.videos.find((x) => String(x.id) === i);
      f("organizer-video-action", { id: i, video: d, action: t });
    }
    async function De(s) {
      const { video: t, folder: i } = Y.value;
      if (Y.value.visible = !1, s === "add-radio" && t) {
        try {
          const d = await Se.addToDefaultSeries({
            bvid: t.bvid || (t.id.startsWith("BV") ? t.id : ""),
            title: t.title,
            author: t.author,
            cover: t.cover,
            duration: Ci(t.duration)
          });
          St.fetch("B站电台", d ? "已添加到默认系列" : "已在默认系列中");
        } catch {
          St.fetch("B站电台", "添加失败，请重试");
        }
        return;
      }
      t && f("organizer-video-action", { id: t.id || "", video: t, action: s });
    }
    function ei(s) {
      if (!a.value.isTargetPickMode) return;
      const t = s.target;
      if (!t?.closest(".bili-sub-transcript-body, .bili-sub-scroll-stage") && !t?.closest(".fo-bili-folder-list")) {
        const i = document.querySelector(".fo-bili-folder-list");
        i && (s.preventDefault(), i.scrollTop += s.deltaY);
      }
    }
    const Le = _(1), it = _(""), We = _("folder"), Xe = G(
      () => Math.max(1, Math.ceil(O.radioVideos.length / Tt))
    ), ti = G(() => {
      const t = (Math.min(Le.value, Xe.value) - 1) * Tt;
      return O.radioVideos.slice(t, t + Tt);
    }), ot = G(() => O.radioSeries.find(
      (t) => t.id === ci || t.name === xt
    )?.items || []), ii = G(() => ot.value.length), At = G(() => O.radioFolders.find(
      (t) => Number(t.id) === Number(O.radioActiveFolderId)
    )?.title || "当前收藏夹"), Re = G(
      () => We.value === "liked" ? xt : At.value
    ), xe = G(() => We.value === "liked" && ot.value.length > 0 ? ot.value : O.radioVideos), J = G(() => {
      const s = xe.value;
      if (Z.active && Z.bvid) {
        const t = s.find((i) => i.bvid === Z.bvid) || O.radioVideos.find((i) => i.bvid === Z.bvid);
        return t || {
          bvid: Z.bvid,
          title: Z.title || "B站电台",
          cover: Z.coverUrl || "",
          author: Z.author || Z.seriesName || "Bilibili",
          duration: Number(Z.duration || 0)
        };
      }
      if (it.value) {
        const t = s.find((i) => i.bvid === it.value);
        if (t) return t;
      }
      return s[0] || null;
    }), Je = G(
      () => !!(Z.active && J.value?.bvid && Z.bvid === J.value.bvid)
    ), Oe = G(
      () => !!(Je.value && Z.playing)
    ), dt = G(() => {
      const s = J.value;
      return s ? xe.value.findIndex((t) => t.bvid === s.bvid) : -1;
    }), Vt = G(() => {
      const s = xe.value.length;
      if (!s) return "";
      const t = dt.value;
      return t >= 0 ? `${t + 1} / ${s}` : `${s} 首`;
    });
    function Qe(s, t, i = !1, d) {
      if (!s.length) return;
      const x = s.map((be) => ({ ...be, upper: be.author }));
      let Q = Math.max(0, Math.min(x.length - 1, t));
      if (i) {
        for (let be = x.length - 1; be > 0; be--) {
          const Me = Math.floor(Math.random() * (be + 1));
          [x[be], x[Me]] = [x[Me], x[be]];
        }
        Q = 0;
      }
      it.value = x[Q]?.bvid || "", yi.playQueue({
        name: d || Re.value || "B站电台",
        items: x,
        startIndex: Q
      });
    }
    function oi(s) {
      We.value = "folder", it.value = "", f("radio-select-folder", s);
    }
    function li(s) {
      We.value = "folder", it.value = s.bvid;
      const t = O.radioVideos.findIndex((i) => i.bvid === s.bvid);
      Qe(O.radioVideos, t >= 0 ? t : 0, !1, At.value);
    }
    function si() {
      if (!ot.value.length) {
        St.fetch("哔哩哔哩电台", "还没有喜欢的曲目，点击视频旁的 ♡ 即可收藏");
        return;
      }
      We.value = "liked", Qe(ot.value, 0, !1, xt);
    }
    function Ut(s) {
      const t = xe.value;
      if (!t.length) return;
      const i = dt.value, d = i >= 0 ? (i + s + t.length) % t.length : s > 0 ? 0 : t.length - 1;
      Qe(t, d, !1, Re.value);
    }
    function Gt() {
      const s = J.value;
      if (!s) return;
      if (Je.value) {
        hi.togglePlay();
        return;
      }
      const t = xe.value, i = t.findIndex((d) => d.bvid === s.bvid);
      if (i >= 0) {
        Qe(t, i, !1, Re.value);
        return;
      }
      Qe([s], 0, !1, Re.value);
    }
    function qt(s = !1) {
      const t = xe.value;
      if (!t.length) return;
      const i = dt.value >= 0 ? dt.value : 0;
      Qe(t, i, s, s ? `${Re.value} · 随机` : Re.value);
    }
    function ct(s) {
      const t = Math.max(0, Math.floor(Number(s) || 0));
      if (!t) return "";
      const i = Math.floor(t / 60), d = t % 60;
      return `${String(i).padStart(2, "0")}:${String(d).padStart(2, "0")}`;
    }
    return X(
      () => O.radioActiveFolderId,
      (s, t) => {
        s !== t ? Le.value = 1 : Le.value > Xe.value && (Le.value = Xe.value);
      }
    ), (s, t) => (o(), l("section", {
      id: "daily-bilibili",
      class: L(["card wide", { "card-fullscreen": r(Jt) || r($i).activeId === "daily-bilibili" }])
    }, [
      e("div", Fs, [
        e("div", As, [
          e("div", {
            class: L(["fo-bili-layout", { "fo-picking-move-target": a.value.isTargetPickMode, "has-workspace-wallpaper": !!r(c) }]),
            style: _e(r(c)),
            "data-vue-organizer-shell": "true",
            onWheel: ei
          }, [
            Pe(Mi, { media: r(h) }, null, 8, ["media"]),
            e("aside", Vs, [
              e("div", {
                class: L(["fo-sidebar-toggle-bar", { "is-collapsed": q.value }]),
                title: q.value ? r(z)("bili.channel.expandTip") : r(z)("bili.channel.collapseTip"),
                onClick: se
              }, [
                e("div", Gs, [
                  t[54] || (t[54] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                  e("span", null, n(r(z)("bili.channel.title")), 1),
                  q.value ? (o(), l("span", qs, "5")) : m("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "fo-sidebar-toggle-action",
                  "aria-expanded": !q.value,
                  title: q.value ? r(z)("bili.channel.expand") : r(z)("bili.channel.collapse")
                }, [
                  e("span", null, n(q.value ? r(z)("bili.channel.expand") : r(z)("bili.channel.collapse")), 1),
                  e("span", Ws, n(q.value ? "▾" : "▴"), 1)
                ], 8, Ns)
              ], 10, Us),
              ue(e("div", Os, [
                e("div", Ys, [
                  e("button", {
                    id: "fo-sidebar-cache-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: a.value.mode === "cache" }]),
                    title: r(z)("bili.channel.cacheVideoTip"),
                    onClick: t[0] || (t[0] = (i) => f("open-cache"))
                  }, [
                    e("div", js, [
                      t[55] || (t[55] = e("span", { class: "fo-sidebar-sub-icon" }, "💾", -1)),
                      e("div", Hs, [
                        e("strong", null, n(r(z)("bili.channel.cacheVideo")), 1),
                        e("small", null, n(r(z)("bili.channel.cacheVideoSub")), 1)
                      ])
                    ]),
                    t[56] || (t[56] = e("span", { class: "fo-sidebar-sub-badge" }, "LOCAL", -1))
                  ], 10, Ks)
                ]),
                e("div", Xs, [
                  e("button", {
                    id: "fo-sidebar-following-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: a.value.mode === "following" }]),
                    title: r(z)("bili.channel.followingTip"),
                    onClick: t[1] || (t[1] = (i) => f("open-following"))
                  }, [
                    e("div", Qs, [
                      t[57] || (t[57] = e("span", { class: "fo-sidebar-sub-icon" }, "📺", -1)),
                      e("div", Zs, [
                        e("strong", null, n(r(z)("bili.channel.following")), 1),
                        e("small", null, n(r(z)("bili.channel.followingSub")), 1)
                      ])
                    ]),
                    t[58] || (t[58] = e("span", { class: "fo-sidebar-sub-badge" }, "FEED", -1))
                  ], 10, Js)
                ]),
                e("div", en, [
                  e("button", {
                    id: "fo-sidebar-recommend-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: a.value.mode === "recommendations" }]),
                    title: r(z)("bili.channel.forYouTip"),
                    onClick: t[2] || (t[2] = (i) => f("open-recommendations"))
                  }, [
                    e("div", on, [
                      t[59] || (t[59] = e("span", { class: "fo-sidebar-sub-icon" }, "✨", -1)),
                      e("div", ln, [
                        e("strong", null, n(r(z)("bili.channel.forYou")), 1),
                        e("small", null, n(r(z)("bili.channel.forYouSub")), 1)
                      ])
                    ]),
                    t[60] || (t[60] = e("span", { class: "fo-sidebar-sub-badge" }, "FOR YOU", -1))
                  ], 10, tn)
                ]),
                e("div", sn, [
                  e("button", {
                    id: "fo-sidebar-radio-btn",
                    type: "button",
                    class: L(["fo-sidebar-sub-btn", { on: a.value.mode === "radio" }]),
                    title: r(z)("bili.channel.radioTip"),
                    onClick: t[3] || (t[3] = (i) => f("open-radio"))
                  }, [
                    e("div", an, [
                      t[61] || (t[61] = e("span", { class: "fo-sidebar-sub-icon" }, "📻", -1)),
                      e("div", rn, [
                        e("strong", null, n(r(z)("bili.channel.radio")), 1),
                        e("small", null, n(r(z)("bili.channel.radioSub")), 1)
                      ])
                    ]),
                    t[62] || (t[62] = e("span", { class: "fo-sidebar-sub-badge" }, "RADIO", -1))
                  ], 10, nn)
                ])
              ], 512), [
                [jt, !q.value]
              ]),
              e("div", un, [
                e("div", dn, [
                  t[63] || (t[63] = e("span", { class: "fo-sidebar-sub-icon" }, "📁", -1)),
                  e("div", cn, [
                    e("strong", null, n(r(z)("bili.channel.foldersHub")), 1),
                    e("small", null, n(r(z)("bili.channel.foldersHubSub")), 1)
                  ])
                ]),
                e("button", {
                  class: "fo-sidebar-hub-add",
                  type: "button",
                  title: r(z)("bili.channel.createFolderTip"),
                  "aria-label": r(z)("bili.channel.createFolderTip"),
                  onClick: t[4] || (t[4] = (i) => f("create-bili-folder"))
                }, "＋", 8, vn)
              ]),
              a.value.isTargetPickMode ? (o(), l("div", bn, [
                t[64] || (t[64] = e("div", { class: "fo-move-target-tip" }, [
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
                  onClick: t[5] || (t[5] = (i) => f("organizer-cancel-move-target"))
                }, " ✕ 取消 ")
              ])) : m("", !0),
              e("nav", pn, [
                (o(!0), l(R, null, K(a.value.folders, (i, d) => (o(), l(R, {
                  key: `${i.group ? "group" : "folder"}:${i.id}`
                }, [
                  d > 0 && a.value.folders[d - 1]?.kind !== i.kind ? (o(), l("div", fn)) : m("", !0),
                  d === 0 || a.value.folders[d - 1]?.kind !== i.kind ? (o(), l("div", {
                    key: 1,
                    class: L(["fo-bili-section-head fo-vue-section-head", { "drag-into": i.kind === "created" && ze.value }]),
                    onDragover: (x) => i.kind === "created" ? D(x) : void 0,
                    onDragleave: (x) => i.kind === "created" ? ae(x) : void 0,
                    onDrop: (x) => i.kind === "created" ? Ee(x) : void 0
                  }, [
                    e("span", mn, [
                      e("b", null, n(i.kind === "collected" ? "我追的合集/收藏夹" : i.kind === "other" ? "其他收藏" : "我创建的收藏夹"), 1)
                    ]),
                    i.kind === "created" ? (o(), l("button", {
                      key: 0,
                      class: "fo-bili-section-add-btn",
                      type: "button",
                      title: "新建插件分组",
                      "aria-label": "新建插件分组",
                      onClick: t[6] || (t[6] = S((x) => f("create-local-group"), ["stop"]))
                    }, "＋")) : m("", !0)
                  ], 42, gn)) : m("", !0),
                  i.group ? (o(), l("div", {
                    key: 3,
                    class: L(["fo-bili-group-label", {
                      collapsed: i.collapsed,
                      dragging: ce.value === i.id,
                      "drag-before": ve.value === i.id && $e.value === "before",
                      "drag-after": ve.value === i.id && $e.value === "after",
                      "drag-into": ve.value === i.id && $e.value === "into"
                    }]),
                    style: _e({ "--fo-depth": i.depth }),
                    role: "button",
                    tabindex: "0",
                    "aria-expanded": !i.collapsed,
                    draggable: !0,
                    onClick: (x) => ne(i),
                    onKeydown: [
                      vt(S((x) => ne(i), ["prevent"]), ["enter"]),
                      vt(S((x) => ne(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (x) => Ye(x, i),
                    onDragover: (x) => Ke(x, i),
                    onDragleave: (x) => k(x, i),
                    onDrop: (x) => v(x, i),
                    onDragend: u
                  }, [
                    e("i", _n, n(i.collapsed ? "›" : "⌄"), 1),
                    t[66] || (t[66] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, n(i.title), 1),
                    e("small", null, n(i.count), 1)
                  ], 46, yn)) : (o(), l("div", {
                    key: 2,
                    role: "button",
                    tabindex: "0",
                    class: L(["fo-bili-folder", {
                      on: i.selected,
                      dragging: ce.value === i.id,
                      "drag-before": ve.value === i.id && $e.value === "before",
                      "drag-after": ve.value === i.id && $e.value === "after",
                      "drag-into": ve.value === i.id && $e.value === "into",
                      "target-candidate": a.value.isTargetPickMode && i.kind === "created" && !i.selected
                    }]),
                    "data-folder-id": i.id,
                    "data-folder-kind": i.kind,
                    style: _e({ "--fo-depth": i.depth }),
                    draggable: i.kind === "created",
                    onClick: (x) => ne(i),
                    onKeydown: [
                      vt(S((x) => ne(i), ["prevent"]), ["enter"]),
                      vt(S((x) => ne(i), ["prevent"]), ["space"])
                    ],
                    onDragstart: (x) => Ye(x, i),
                    onDragover: (x) => Ke(x, i),
                    onDragleave: (x) => k(x, i),
                    onDrop: (x) => v(x, i),
                    onDragend: u
                  }, [
                    t[65] || (t[65] = e("i", {
                      class: "fo-folder-icon",
                      "aria-hidden": "true"
                    }, null, -1)),
                    e("span", null, n(i.title), 1),
                    e("small", null, n(i.count), 1)
                  ], 46, hn))
                ], 64))), 128)),
                !a.value.loading && !a.value.error && !a.value.folders.length ? (o(), l("p", kn, "暂无可用收藏夹。")) : m("", !0)
              ])
            ]),
            a.value.mode === "organizer" ? (o(), l("section", {
              key: 0,
              id: "fo-vue-main",
              ref_key: "organizerMain",
              ref: w,
              class: "fo-bili-main"
            }, [
              a.value.loading && !b.value && !j.value ? (o(), l("div", $n, [...t[67] || (t[67] = [
                e("i", null, null, -1),
                e("span", null, "正在读取 B站收藏内容…", -1)
              ])])) : !b.value && a.value.error && a.value.error.includes("未登录") ? (o(), l("div", Cn, [
                e("div", wn, [
                  t[69] || (t[69] = e("span", { class: "fo-bili-login-icon" }, "📺", -1)),
                  t[70] || (t[70] = e("h3", null, "未检测到哔哩哔哩登录状态", -1)),
                  t[71] || (t[71] = e("p", null, "tab-Project 直接复用当前浏览器的 B站 网页会话，无需输入账号密码或扫码授权。", -1)),
                  e("div", xn, [
                    t[68] || (t[68] = e("a", {
                      class: "fo-bili-btn-login",
                      href: "https://passport.bilibili.com/login",
                      target: "_blank",
                      rel: "noreferrer"
                    }, "前往 bilibili.com 登录 ↗", -1)),
                    e("button", {
                      type: "button",
                      class: "fo-bili-btn-refresh",
                      onClick: t[7] || (t[7] = (i) => f("organizer-refresh"))
                    }, "已登录，点击刷新 ↻")
                  ])
                ])
              ])) : !b.value && a.value.error && !j.value ? (o(), l("p", Sn, n(a.value.error), 1)) : (o(), l(R, { key: 3 }, [
                e("header", Tn, [
                  e("div", Mn, [
                    e("div", {
                      class: L(["fo-bili-cover", { "fo-vue-cover-image": a.value.folderCover }])
                    }, [
                      a.value.folderCover ? (o(), l("img", {
                        key: 0,
                        src: a.value.folderCover,
                        alt: "",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Pn)) : (o(), l("i", In))
                    ], 2),
                    e("div", Dn, [
                      e("h3", null, n(a.value.folderTitle), 1),
                      e("p", null, n(a.value.folderSubtitle), 1)
                    ])
                  ]),
                  e("div", {
                    class: "card-fullscreen-bili-search fo-hero-bili-search",
                    ref_key: "searchHostRef",
                    ref: g
                  }, [
                    e("form", {
                      class: "card-fullscreen-bili-searchbar",
                      role: "search",
                      onSubmit: S(yt, ["prevent"])
                    }, [
                      ue(e("input", {
                        "onUpdate:modelValue": t[8] || (t[8] = (i) => re.value = i),
                        type: "search",
                        autocomplete: "off",
                        placeholder: r(z)("bili.workspace.searchPlaceholder"),
                        "aria-label": r(z)("bili.workspace.searchAria"),
                        onFocus: Lt,
                        onInput: Rt
                      }, null, 40, Ln), [
                        [Ie, re.value]
                      ]),
                      e("button", {
                        type: "submit",
                        title: r(z)("bili.workspace.searchBtnTip")
                      }, "⌕", 8, Rn)
                    ], 32),
                    ge.value ? (o(), l("div", Bn, [
                      e("div", zn, [
                        e("span", null, n(je.value), 1),
                        e("small", null, n(st.value), 1)
                      ]),
                      me.value ? (o(), l("p", En, "正在获取推荐 / 搜索中…")) : !C.value.length && !me.value ? (o(), l("p", Fn, "暂无联想结果，按回车在插件内搜索")) : (o(!0), l(R, { key: 2 }, K(C.value, (i) => (o(), l("button", {
                        key: i.bvid || i.aid,
                        type: "button",
                        class: "card-fullscreen-bili-video-row",
                        role: "option",
                        onClick: (d) => at(i),
                        onContextmenu: S((d) => mt(d, i), ["prevent"])
                      }, [
                        e("span", Vn, [
                          e("img", {
                            src: i.cover,
                            alt: "",
                            referrerpolicy: "no-referrer",
                            loading: "lazy"
                          }, null, 8, Un),
                          i.durationText ? (o(), l("i", Gn, n(i.durationText), 1)) : m("", !0)
                        ]),
                        e("span", qn, [
                          e("strong", null, n(i.title), 1),
                          e("small", null, n(i.upper) + " · " + n(i.playText) + "播放", 1)
                        ])
                      ], 40, An))), 128))
                    ])) : m("", !0)
                  ], 512),
                  e("div", Nn, [
                    e("button", {
                      id: "bili-header-msg-center-btn",
                      class: L(["fm-tab bili-header-msg-btn hero-action-btn", { "is-active": r(wi).isOpen }]),
                      type: "button",
                      title: r(z)("bili.workspace.msgCenterTip"),
                      onClick: M
                    }, [
                      t[72] || (t[72] = e("span", { class: "bili-header-msg-icon" }, "🔔", -1)),
                      e("span", On, n(r(z)("bili.workspace.msgBtn")), 1)
                    ], 10, Wn),
                    e("button", {
                      type: "button",
                      class: "primary hero-action-btn",
                      disabled: !a.value.videos.length,
                      onClick: t[9] || (t[9] = (i) => f("organizer-batch-toggle"))
                    }, n(a.value.batchMode ? r(z)("bili.workspace.batchBack") : r(z)("bili.workspace.batch")), 9, Yn)
                  ])
                ]),
                e("div", Kn, [
                  a.value.batchMode ? m("", !0) : (o(), l("div", jn, [
                    (o(!0), l(R, null, K([{ id: "fav_time", text: r(z)("bili.sort.favTime") }, { id: "view", text: r(z)("bili.sort.view") }, { id: "pubtime", text: r(z)("bili.sort.pubTime") }], (i) => (o(), l("button", {
                      key: i.id,
                      type: "button",
                      class: L({ on: a.value.sort === i.id }),
                      onClick: (d) => f("organizer-sort", i.id)
                    }, n(i.text), 11, Hn))), 128))
                  ])),
                  e("div", Xn, [
                    r(we).isOpen && r(we).bvid ? (o(), l("div", {
                      key: 0,
                      class: L(["fo-video-tab-item", { "is-collapsed": r(we).collapsed }]),
                      title: r(we).title
                    }, [
                      e("div", {
                        class: "fo-video-tab-meta",
                        onClick: oe
                      }, [
                        e("span", {
                          class: L(["fo-video-tab-pulse", { playing: r(we).isPlaying }])
                        }, null, 2),
                        e("span", Qn, n(r(we).title), 1)
                      ]),
                      e("div", Zn, [
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-close",
                          title: "关闭视频",
                          onClick: S(le, ["stop"])
                        }, " ✕ "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-sub",
                          title: "查看该视频完整纯文本字幕",
                          onClick: S(de, ["stop"])
                        }, " 字幕 "),
                        e("button", {
                          type: "button",
                          class: "fo-vtab-btn fo-vtab-expand",
                          title: r(we).collapsed ? "放大恢复视频小窗" : "聚焦视频小窗",
                          onClick: S(oe, ["stop"])
                        }, " 放大 ", 8, ea)
                      ])
                    ], 10, Jn)) : m("", !0)
                  ]),
                  a.value.batchMode ? (o(), l("div", ta, [
                    e("span", ia, "已选择 " + n(a.value.selectedCount) + " 项", 1),
                    e("button", {
                      type: "button",
                      onClick: t[11] || (t[11] = (i) => f("organizer-batch-all"))
                    }, "全选/取消全选"),
                    e("button", {
                      type: "button",
                      class: L({ "picking-target": a.value.isTargetPickMode }),
                      onClick: t[12] || (t[12] = (i) => a.value.isTargetPickMode ? f("organizer-cancel-move-target") : f("organizer-batch-move"))
                    }, n(a.value.isTargetPickMode ? "✕ 取消移动" : "移动到"), 3),
                    e("button", {
                      type: "button",
                      onClick: t[13] || (t[13] = (i) => f("organizer-batch-cache"))
                    }, "缓存所选"),
                    e("button", {
                      type: "button",
                      onClick: t[14] || (t[14] = (i) => f("organizer-batch-unfavorite"))
                    }, "取消收藏")
                  ])) : (o(), l("form", {
                    key: 1,
                    class: "fo-bili-search",
                    onSubmit: S(et, ["prevent"])
                  }, [
                    ue(e("input", {
                      "onUpdate:modelValue": t[10] || (t[10] = (i) => y.value = i),
                      type: "search",
                      placeholder: "请输入关键词",
                      "aria-label": "搜索当前收藏夹",
                      onInput: Ue,
                      onSearch: Ue
                    }, null, 544), [
                      [Ie, y.value]
                    ]),
                    t[73] || (t[73] = e("button", {
                      type: "submit",
                      title: "搜索"
                    }, "⌕", -1))
                  ], 32))
                ]),
                a.value.error ? (o(), l("p", oa, n(a.value.error), 1)) : m("", !0),
                e("div", {
                  class: "fo-bili-grid fo-favorites-grid",
                  style: _e({ "--favorite-columns": a.value.pageSize / 3 }),
                  "aria-busy": a.value.loading
                }, [
                  a.value.videos.length ? m("", !0) : (o(), l("p", sa, n(a.value.query ? "没有找到匹配的视频。" : "这个收藏夹是空的。"), 1)),
                  (o(!0), l(R, null, K(a.value.videos, (i) => (o(), l("article", {
                    key: i.id,
                    class: L(["fo-bili-card", { "batch-selected": i.selected, "fo-single-moving": a.value.movingVideoId === i.id }]),
                    "data-batch-id": i.id,
                    onContextmenu: S((d) => Et(d, i), ["prevent", "stop"])
                  }, [
                    e("div", aa, [
                      a.value.batchMode ? (o(), l("label", ra, [
                        e("input", {
                          type: "checkbox",
                          checked: i.selected,
                          onChange: (d) => f("organizer-batch-select", i.id)
                        }, null, 40, ua),
                        t[74] || (t[74] = e("span", null, "✓", -1))
                      ])) : m("", !0),
                      e("a", {
                        class: "fo-cover-link",
                        draggable: "false",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: S((d) => f("organizer-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          draggable: "false",
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, ca)
                      ], 8, da),
                      e("span", va, "▣ " + n(i.playCount), 1),
                      e("span", ba, n(i.duration), 1)
                    ]),
                    e("div", pa, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: S((d) => f("organizer-play-video", i), ["prevent"])
                      }, n(i.title), 9, fa),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": E.value === i.id,
                        onClick: S((d) => _t(i.id), ["stop"])
                      }, "⋮", 8, ga),
                      E.value === i.id ? (o(), l("div", ma, [
                        i.writable ? (o(), l("button", {
                          key: 0,
                          type: "button",
                          class: "danger",
                          onClick: (d) => Ct(i.id, "delete")
                        }, "取消收藏", 8, ha)) : m("", !0),
                        i.writable ? (o(), l("button", {
                          key: 1,
                          type: "button",
                          onClick: (d) => Ct(i.id, "move")
                        }, "移动到", 8, ya)) : m("", !0),
                        e("button", {
                          type: "button",
                          onClick: (d) => Ct(i.id, "subtitle")
                        }, "字幕", 8, _a)
                      ])) : m("", !0)
                    ]),
                    e("div", ka, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: S((d) => $(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, n(i.author), 9, $a),
                      e("span", null, "收藏于 " + n(i.favoriteDate), 1)
                    ])
                  ], 42, na))), 128))
                ], 12, la),
                a.value.totalPages > 1 ? (o(), l("div", Ca, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: a.value.loading || a.value.page <= 1,
                    onClick: t[15] || (t[15] = (i) => f("organizer-page", a.value.page - 1))
                  }, "‹ 上一页", 8, wa),
                  e("span", xa, n(a.value.page) + " / " + n(a.value.totalPages), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: a.value.loading || a.value.page >= a.value.totalPages,
                    onClick: t[16] || (t[16] = (i) => f("organizer-page", a.value.page + 1))
                  }, "下一页 ›", 8, Sa)
                ])) : m("", !0)
              ], 64))
            ], 512)) : a.value.mode === "cache" ? (o(), l("section", {
              key: 1,
              id: "fo-vue-cache-main",
              ref_key: "organizerMain",
              ref: w,
              class: "fo-bili-main"
            }, [
              I.value ? (o(), Mt(zl, {
                key: 0,
                active: r(P),
                onBack: t[17] || (t[17] = (i) => I.value = !1)
              }, null, 8, ["active"])) : (o(), l(R, { key: 1 }, [
                e("header", Ta, [
                  e("div", Ma, [
                    t[76] || (t[76] = e("div", { class: "fo-bili-cover" }, "💾", -1)),
                    e("div", Pa, [
                      t[75] || (t[75] = e("h3", null, "缓存视频", -1)),
                      e("p", null, n(a.value.cachedVideos.length) + " 个缓存记录 · 点击缓存设置管理存放目录", 1)
                    ])
                  ]),
                  e("div", Ia, [
                    e("button", {
                      type: "button",
                      class: "primary",
                      onClick: t[18] || (t[18] = (i) => f("organizer-open"))
                    }, "返回收藏夹"),
                    e("button", {
                      type: "button",
                      onClick: t[19] || (t[19] = (i) => I.value = !0)
                    }, "缓存设置")
                  ])
                ]),
                a.value.cacheLoading ? (o(), l("div", Da, [...t[77] || (t[77] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取本地缓存…", -1)
                ])])) : (o(), l("div", {
                  key: 1,
                  class: "fo-bili-grid fo-favorites-grid fo-cached-video-grid",
                  style: _e({ "--favorite-columns": B.value })
                }, [
                  a.value.cachedVideos.length ? m("", !0) : (o(), l("p", La, "还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。")),
                  (o(!0), l(R, null, K(ke.value, (i) => (o(), l("article", {
                    key: i.id,
                    class: "fo-bili-card fo-cached-video-card"
                  }, [
                    e("div", Ra, [
                      e("button", {
                        class: "fo-cached-play",
                        type: "button",
                        onClick: (d) => f("cache-play", i.id)
                      }, [
                        e("img", {
                          loading: "lazy",
                          referrerpolicy: "no-referrer",
                          src: i.cover,
                          alt: ""
                        }, null, 8, za),
                        t[78] || (t[78] = e("span", { class: "fo-cached-local-badge" }, "LOCAL", -1))
                      ], 8, Ba)
                    ]),
                    e("div", Ea, [
                      e("button", {
                        class: "fo-title-link fo-bili-title fo-cached-title",
                        type: "button",
                        onClick: (d) => f("cache-play", i.id)
                      }, n(i.title), 9, Fa),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "删除缓存",
                        onClick: (d) => f("cache-delete", i.id)
                      }, "×", 8, Aa)
                    ]),
                    e("div", Va, [
                      e("span", null, n(i.sizeText), 1),
                      e("span", null, "缓存于 " + n(i.cachedDate), 1)
                    ])
                  ]))), 128))
                ], 4)),
                N.value > 1 ? (o(), l("div", Ua, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: V.value <= 1,
                    onClick: t[20] || (t[20] = (i) => V.value--)
                  }, "‹ 上一页", 8, Ga),
                  e("span", qa, n(V.value) + " / " + n(N.value), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: V.value >= N.value,
                    onClick: t[21] || (t[21] = (i) => V.value++)
                  }, "下一页 ›", 8, Na)
                ])) : m("", !0)
              ], 64))
            ], 512)) : a.value.mode === "recommendations" ? (o(), l("section", {
              key: 2,
              id: "fo-vue-recommend-main",
              ref_key: "organizerMain",
              ref: w,
              class: "fo-bili-main"
            }, [
              e("header", Wa, [
                t[79] || (t[79] = e("div", { class: "fo-bili-cover fo-vue-recommend-cover" }, [
                  e("span", null, "✨")
                ], -1)),
                e("div", Oa, [
                  e("div", Ya, [
                    e("h3", null, n(a.value.specialTitle), 1)
                  ]),
                  e("p", null, n(a.value.specialSubtitle), 1)
                ]),
                e("div", {
                  class: "card-fullscreen-bili-search fo-hero-bili-search",
                  ref_key: "searchHostRef",
                  ref: g
                }, [
                  e("form", {
                    class: "card-fullscreen-bili-searchbar",
                    role: "search",
                    onSubmit: S(yt, ["prevent"])
                  }, [
                    ue(e("input", {
                      "onUpdate:modelValue": t[22] || (t[22] = (i) => re.value = i),
                      type: "search",
                      autocomplete: "off",
                      placeholder: r(z)("bili.workspace.searchPlaceholder"),
                      "aria-label": r(z)("bili.workspace.searchAria"),
                      onFocus: Lt,
                      onInput: Rt
                    }, null, 40, Ka), [
                      [Ie, re.value]
                    ]),
                    e("button", {
                      type: "submit",
                      title: r(z)("bili.workspace.searchBtnTip")
                    }, "⌕", 8, ja)
                  ], 32),
                  ge.value ? (o(), l("div", Ha, [
                    e("div", Xa, [
                      e("span", null, n(je.value), 1),
                      e("small", null, n(st.value), 1)
                    ]),
                    me.value ? (o(), l("p", Ja, "正在获取推荐 / 搜索中…")) : !C.value.length && !me.value ? (o(), l("p", Qa, "暂无联想结果，按回车在插件内搜索")) : (o(!0), l(R, { key: 2 }, K(C.value, (i) => (o(), l("button", {
                      key: i.bvid || i.aid,
                      type: "button",
                      class: "card-fullscreen-bili-video-row",
                      role: "option",
                      onClick: (d) => at(i),
                      onContextmenu: S((d) => mt(d, i), ["prevent"])
                    }, [
                      e("span", er, [
                        e("img", {
                          src: i.cover,
                          alt: "",
                          referrerpolicy: "no-referrer",
                          loading: "lazy"
                        }, null, 8, tr),
                        i.durationText ? (o(), l("i", ir, n(i.durationText), 1)) : m("", !0)
                      ]),
                      e("span", or, [
                        e("strong", null, n(i.title), 1),
                        e("small", null, n(i.upper) + " · " + n(i.playText) + "播放", 1)
                      ])
                    ], 40, Za))), 128))
                  ])) : m("", !0)
                ], 512),
                e("div", lr, [
                  e("button", {
                    type: "button",
                    onClick: t[23] || (t[23] = (i) => f("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              b.value ? (o(), l(R, { key: 0 }, [
                e("div", sr, [
                  e("div", nr, [
                    e("span", ar, "搜索结果：" + n(T.value), 1)
                  ]),
                  e("div", { class: "fo-bili-actions" }, [
                    e("button", {
                      type: "button",
                      onClick: ht
                    }, "返回个性推荐")
                  ])
                ]),
                Ge.value ? (o(), l("div", rr, [...t[80] || (t[80] = [
                  e("i", null, null, -1),
                  e("span", null, "正在搜索 B站视频…", -1)
                ])])) : ie.value ? (o(), l("div", ur, [
                  e("p", null, n(ie.value), 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    onClick: t[24] || (t[24] = (i) => rt(T.value, W.value))
                  }, "重试")
                ])) : (o(), l(R, { key: 2 }, [
                  e("div", dr, [
                    He.value.length ? m("", !0) : (o(), l("p", cr, "没有找到相关视频，换个关键词试试。")),
                    (o(!0), l(R, null, K(He.value, (i) => (o(), l("article", {
                      key: i.bvid || i.aid,
                      class: "fo-bili-card",
                      onContextmenu: S((d) => mt(d, i), ["prevent", "stop"])
                    }, [
                      e("div", br, [
                        e("a", {
                          class: "fo-cover-link",
                          href: `https://www.bilibili.com/video/${i.bvid || `av${i.aid}`}`,
                          onClick: S((d) => at(i), ["prevent"])
                        }, [
                          e("img", {
                            loading: "lazy",
                            decoding: "async",
                            referrerpolicy: "no-referrer",
                            src: i.cover,
                            alt: ""
                          }, null, 8, fr)
                        ], 8, pr),
                        e("span", gr, "▣ " + n(i.playText), 1),
                        e("span", mr, n(i.durationText), 1)
                      ]),
                      e("div", hr, [
                        e("a", {
                          class: "fo-title-link fo-bili-title",
                          href: `https://www.bilibili.com/video/${i.bvid || `av${i.aid}`}`,
                          onClick: S((d) => at(i), ["prevent"])
                        }, n(i.title), 9, yr)
                      ]),
                      e("div", _r, [
                        e("span", null, n(i.upper), 1)
                      ])
                    ], 40, vr))), 128))
                  ]),
                  W.value > 1 || te.value ? (o(), l("div", kr, [
                    e("button", {
                      type: "button",
                      class: "fo-btn",
                      disabled: W.value <= 1,
                      onClick: t[25] || (t[25] = (i) => rt(T.value, W.value - 1))
                    }, "‹ 上一页", 8, $r),
                    e("span", Cr, n(W.value) + n(H.value ? ` / ${H.value}` : ""), 1),
                    e("button", {
                      type: "button",
                      class: "fo-btn",
                      disabled: !te.value,
                      onClick: t[26] || (t[26] = (i) => rt(T.value, W.value + 1))
                    }, "下一页 ›", 8, wr)
                  ])) : m("", !0)
                ], 64))
              ], 64)) : (o(), l(R, { key: 1 }, [
                e("div", xr, [
                  t[81] || (t[81] = e("div", { class: "fo-bili-sort" }, [
                    e("span", { class: "fo-vue-feed-label" }, "🔥 猜你喜欢与热门精选")
                  ], -1)),
                  e("div", Sr, "本页共 " + n(a.value.specialVideos.length) + " 个视频", 1)
                ]),
                a.value.specialLoading ? (o(), l("div", Tr, [...t[82] || (t[82] = [
                  e("i", null, null, -1),
                  e("span", null, "正在加载个性化推荐视频…", -1)
                ])])) : a.value.specialError ? (o(), l("p", Mr, n(a.value.specialError), 1)) : (o(), l("div", {
                  key: 2,
                  class: "fo-bili-grid fo-favorites-grid",
                  style: _e({ "--favorite-columns": B.value })
                }, [
                  a.value.specialVideos.length ? m("", !0) : (o(), l("p", Pr, "暂无推荐视频。")),
                  (o(!0), l(R, null, K(a.value.specialVideos, (i) => (o(), l("article", {
                    key: i.id,
                    class: "fo-bili-card"
                  }, [
                    e("div", Ir, [
                      e("a", {
                        class: "fo-cover-link",
                        draggable: "false",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: S((d) => f("special-play-video", i), ["prevent"])
                      }, [
                        e("img", {
                          draggable: "false",
                          loading: "lazy",
                          decoding: "async",
                          referrerpolicy: "no-referrer",
                          src: i.cover ? i.cover.replace(/^http:/, "https:") : "",
                          alt: ""
                        }, null, 8, Lr)
                      ], 8, Dr),
                      e("span", Rr, "▣ " + n(i.playCount), 1),
                      e("span", Br, n(i.duration), 1)
                    ]),
                    e("div", zr, [
                      e("a", {
                        class: "fo-title-link fo-bili-title",
                        href: i.url,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: S((d) => f("special-play-video", i), ["prevent"])
                      }, n(i.title), 9, Er),
                      e("button", {
                        class: "fo-card-more",
                        type: "button",
                        "aria-label": "更多操作",
                        "aria-expanded": E.value === i.id,
                        onClick: S((d) => _t(i.id), ["stop"])
                      }, "⋮", 8, Fr),
                      E.value === i.id ? (o(), l("div", Ar, [
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            f("special-video-action", { video: i, id: i.id, action: "collect-inbox" }), E.value = "";
                          }
                        }, "📥 添加到收集箱", 8, Vr),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            f("special-video-action", { id: i.id, action: "play" }), E.value = "";
                          }
                        }, "本地播放与评论", 8, Ur),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            f("special-video-action", { id: i.id, action: "subtitle" }), E.value = "";
                          }
                        }, "字幕提取", 8, Gr),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            f("special-video-action", { id: i.id, action: "cache" }), E.value = "";
                          }
                        }, "缓存视频", 8, qr),
                        e("button", {
                          type: "button",
                          onClick: (d) => {
                            f("special-video-action", { id: i.id, action: "open" }), E.value = "";
                          }
                        }, "打开网页", 8, Nr)
                      ])) : m("", !0)
                    ]),
                    e("div", Wr, [
                      e("span", {
                        class: "fo-bili-author clickable",
                        title: "点击查看 UP 主详情与近期投稿",
                        onClick: S((d) => $(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                      }, n(i.author), 9, Or),
                      e("span", null, n(i.favoriteDate), 1)
                    ])
                  ]))), 128))
                ], 4)),
                e("div", Yr, [
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: a.value.specialLoading || a.value.specialPage <= 1,
                    onClick: t[27] || (t[27] = (i) => f("recommendations-page", a.value.specialPage - 1))
                  }, "‹ 上一页", 8, Kr),
                  e("span", jr, "第 " + n(a.value.specialPage) + " 页", 1),
                  e("button", {
                    type: "button",
                    class: "fo-btn",
                    disabled: a.value.specialLoading,
                    onClick: t[28] || (t[28] = (i) => f("recommendations-page", a.value.specialPage + 1))
                  }, "下一页 ›", 8, Hr)
                ])
              ], 64))
            ], 512)) : a.value.mode === "following" ? (o(), l("section", {
              key: 3,
              id: "fo-vue-following-main",
              ref_key: "organizerMain",
              ref: w,
              class: "fo-bili-main"
            }, [
              e("header", Xr, [
                t[83] || (t[83] = e("div", { class: "fo-bili-cover fo-vue-following-cover" }, [
                  e("span", null, "📺")
                ], -1)),
                e("div", Jr, [
                  e("div", Qr, [
                    e("h3", null, n(a.value.specialTitle), 1),
                    a.value.specialBadge !== `第 ${a.value.specialPage} 页` ? (o(), l("span", Zr, n(a.value.specialBadge), 1)) : m("", !0)
                  ]),
                  e("p", null, n(a.value.specialSubtitle), 1)
                ]),
                e("div", eu, [
                  e("div", {
                    class: "fo-up-groups-list",
                    onWheel: t[29] || (t[29] = //@ts-ignore
                    (...i) => r(Yt) && r(Yt)(...i))
                  }, [
                    (o(!0), l(R, null, K(a.value.followingGroups, (i) => (o(), l("button", {
                      key: i.id,
                      type: "button",
                      class: L(["fo-up-group-chip", { active: i.active }]),
                      onClick: (d) => f("following-group", i.id)
                    }, [
                      ye(n(i.child ? "↳ " : "") + n(i.name) + " ", 1),
                      e("small", iu, n(i.count), 1)
                    ], 10, tu))), 128))
                  ], 32),
                  e("div", ou, [
                    e("button", {
                      id: "bili-following-up-group-manager",
                      type: "button",
                      title: r(z)("bili.workspace.upGroupManagerTip"),
                      onClick: t[30] || (t[30] = (i) => f("manage-up-groups"))
                    }, n(r(z)("bili.workspace.upGroupManager")), 9, lu)
                  ])
                ]),
                e("div", su, [
                  e("button", {
                    type: "button",
                    onClick: t[31] || (t[31] = (i) => f("organizer-open"))
                  }, "返回收藏夹")
                ])
              ]),
              a.value.followingMembers.length ? (o(), l("div", nu, [
                e("div", au, [
                  e("b", null, n(a.value.specialBadge), 1),
                  e("small", null, "共 " + n(a.value.followingMembers.length) + " 位 UP 主", 1)
                ]),
                e("div", ru, [
                  e("button", {
                    type: "button",
                    class: L(["fo-up-member-chip", { active: !a.value.followingMembers.some((i) => i.active) }]),
                    onClick: t[32] || (t[32] = (i) => f("following-member", ""))
                  }, "全部UP", 2),
                  (o(!0), l(R, null, K(a.value.followingMembers, (i) => (o(), l("button", {
                    key: i.id,
                    type: "button",
                    class: L(["fo-up-member-chip", { active: i.active }]),
                    title: `左键筛选「${i.name}」，右键预览近期投稿`,
                    onClick: (d) => f("following-member", i.id),
                    onContextmenu: S((d) => f("following-preview-member", { id: i.id, clientX: d.clientX, clientY: d.clientY }), ["prevent"])
                  }, [
                    i.face ? (o(), l("img", {
                      key: 0,
                      loading: "lazy",
                      referrerpolicy: "no-referrer",
                      src: i.face,
                      alt: ""
                    }, null, 8, du)) : m("", !0),
                    e("span", null, n(i.name), 1)
                  ], 42, uu))), 128))
                ]),
                e("button", {
                  type: "button",
                  class: "fo-btn-manage-members",
                  onClick: t[33] || (t[33] = (i) => f("following-manage-groups", "members"))
                }, "＋ 管理成员")
              ])) : m("", !0),
              e("div", cu, [
                t[84] || (t[84] = e("div", { class: "fo-bili-sort" }, [
                  e("span", { class: "fo-vue-feed-label" }, "⚡ UP 主最新投稿动态")
                ], -1)),
                e("div", vu, "本页共 " + n(a.value.specialVideos.length) + " 个视频", 1)
              ]),
              a.value.specialLoading ? (o(), l("div", bu, [...t[85] || (t[85] = [
                e("i", null, null, -1),
                e("span", null, "正在读取关注 UP 主更新…", -1)
              ])])) : a.value.specialError ? (o(), l("p", pu, n(a.value.specialError), 1)) : (o(), l("div", {
                key: 3,
                class: "fo-bili-grid fo-favorites-grid",
                style: _e({ "--favorite-columns": B.value })
              }, [
                a.value.specialVideos.length ? m("", !0) : (o(), l("p", fu, "暂无最新关注视频动态。")),
                (o(!0), l(R, null, K(a.value.specialVideos, (i) => (o(), l("article", {
                  key: i.id,
                  class: "fo-bili-card"
                }, [
                  e("div", gu, [
                    e("a", {
                      class: "fo-cover-link",
                      draggable: "false",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: S((d) => f("special-play-video", i), ["prevent"])
                    }, [
                      e("img", {
                        draggable: "false",
                        loading: "lazy",
                        decoding: "async",
                        referrerpolicy: "no-referrer",
                        src: i.cover,
                        alt: ""
                      }, null, 8, hu)
                    ], 8, mu),
                    e("span", yu, "▣ " + n(i.playCount), 1),
                    e("span", _u, n(i.duration), 1)
                  ]),
                  e("div", ku, [
                    e("a", {
                      class: "fo-title-link fo-bili-title",
                      href: i.url,
                      target: "_blank",
                      rel: "noreferrer",
                      onClick: S((d) => f("special-play-video", i), ["prevent"])
                    }, n(i.title), 9, $u),
                    e("button", {
                      class: "fo-card-more",
                      type: "button",
                      "aria-label": "更多操作",
                      "aria-expanded": E.value === i.id,
                      onClick: S((d) => _t(i.id), ["stop"])
                    }, "⋮", 8, Cu),
                    E.value === i.id ? (o(), l("div", wu, [
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          f("special-video-action", { video: i, id: i.id, action: "play" }), E.value = "";
                        }
                      }, "本地播放与评论", 8, xu),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          f("special-video-action", { video: i, id: i.id, action: "subtitle" }), E.value = "";
                        }
                      }, "字幕提取", 8, Su),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          f("special-video-action", { video: i, id: i.id, action: "cache" }), E.value = "";
                        }
                      }, "缓存视频", 8, Tu),
                      e("button", {
                        type: "button",
                        onClick: (d) => {
                          f("special-video-action", { video: i, id: i.id, action: "open" }), E.value = "";
                        }
                      }, "打开网页", 8, Mu)
                    ])) : m("", !0)
                  ]),
                  e("div", Pu, [
                    e("span", {
                      class: "fo-bili-author clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: S((d) => $(d, { mid: i.authorMid, name: i.author, face: i.authorFace }), ["stop", "prevent"])
                    }, n(i.author), 9, Iu),
                    e("span", null, n(i.favoriteDate), 1)
                  ])
                ]))), 128))
              ], 4)),
              e("div", Du, [
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: a.value.specialLoading || a.value.specialPage <= 1,
                  onClick: t[34] || (t[34] = (i) => f("following-page", a.value.specialPage - 1))
                }, "‹ 上一页", 8, Lu),
                e("span", Ru, "第 " + n(a.value.specialPage) + " 页", 1),
                e("button", {
                  type: "button",
                  class: "fo-btn",
                  disabled: a.value.specialLoading || !a.value.followingHasMore,
                  onClick: t[35] || (t[35] = (i) => f("following-page", a.value.specialPage + 1))
                }, "下一页 ›", 8, Bu)
              ])
            ], 512)) : a.value.mode === "subscription" ? (o(), l("section", zu, [
              e("div", Eu, [
                a.value.subscriptionLoading ? (o(), l("div", Fu, [...t[86] || (t[86] = [
                  e("i", null, null, -1),
                  e("span", null, "正在读取视频与 AI 字幕稿…", -1)
                ])])) : a.value.subscriptionError ? (o(), l("p", Au, "读取失败：" + n(a.value.subscriptionError), 1)) : !a.value.subscriptionCurrent && !a.value.subscriptionChannels.length ? (o(), l("div", Vu, "暂无正在播放的视频。")) : (o(), Mt(Xo, { key: 3 }))
              ])
            ])) : a.value.mode === "radio" ? (o(), l("section", Uu, [
              e("header", Gu, [
                e("div", qu, [
                  e("div", {
                    class: L(["fo-bili-cover fo-vue-radio-cover", { spinning: r(Z).playing }])
                  }, [...t[87] || (t[87] = [
                    e("span", null, "📻", -1)
                  ])], 2),
                  e("div", Nu, [
                    e("div", Wu, [
                      t[89] || (t[89] = e("h3", null, "B站电台", -1)),
                      r(Z).active ? (o(), l("span", {
                        key: 0,
                        class: L(["fo-radio-live-pill", { playing: r(Z).playing }])
                      }, [
                        t[88] || (t[88] = e("i", {
                          class: "eq-bars",
                          "aria-hidden": "true"
                        }, [
                          e("b"),
                          e("b"),
                          e("b")
                        ], -1)),
                        e("span", null, n(r(Z).playing ? "正在播" : "已暂停") + " · " + n(r(Z).title), 1)
                      ], 2)) : m("", !0)
                    ]),
                    t[90] || (t[90] = e("p", null, "直接选择左侧 B 站收藏夹与视频播放音频，支持封面舞台上下曲切换与跨刷新不断声", -1))
                  ])
                ]),
                e("div", Ou, [
                  e("button", {
                    type: "button",
                    onClick: t[36] || (t[36] = (i) => f("organizer-open"))
                  }, "← 返回收藏夹")
                ])
              ]),
              e("div", Yu, [
                e("aside", Ku, [
                  t[91] || (t[91] = e("p", { class: "sw-title" }, "收藏夹", -1)),
                  e("div", ju, [
                    (o(!0), l(R, null, K(r(O).radioFolders, (i) => (o(), l("button", {
                      key: i.id,
                      type: "button",
                      class: L(["bili-radio-folder", { on: We.value === "folder" && i.id === r(O).radioActiveFolderId }]),
                      onClick: (d) => oi(i.id)
                    }, [
                      e("span", null, n(i.title), 1),
                      e("span", null, n(i.count), 1)
                    ], 10, Hu))), 128)),
                    r(O).radioFolders.length ? m("", !0) : (o(), l("p", Xu, n(r(O).radioLoading ? "加载中…" : "暂无收藏夹"), 1))
                  ])
                ]),
                e("section", Ju, [
                  e("div", Qu, [
                    t[92] || (t[92] = e("p", {
                      id: "bili-radio-library-title",
                      class: "sw-title"
                    }, "收藏夹视频", -1)),
                    Xe.value > 1 ? (o(), l("div", Zu, [
                      e("button", {
                        type: "button",
                        disabled: Le.value <= 1,
                        "aria-label": "上一页",
                        onClick: t[37] || (t[37] = (i) => Le.value--)
                      }, "‹", 8, ed),
                      e("span", null, n(Le.value) + " / " + n(Xe.value), 1),
                      e("button", {
                        type: "button",
                        disabled: Le.value >= Xe.value,
                        "aria-label": "下一页",
                        onClick: t[38] || (t[38] = (i) => Le.value++)
                      }, "›", 8, td)
                    ])) : m("", !0)
                  ]),
                  r(O).radioError ? (o(), l("p", id, n(r(O).radioError), 1)) : m("", !0),
                  e("div", od, [
                    (o(!0), l(R, null, K(ti.value, (i) => (o(), l("article", {
                      key: i.bvid,
                      class: L(["fo-bili-card bili-radio-card", { "is-playing": J.value?.bvid === i.bvid && Je.value }]),
                      title: `${i.title} (点击直接播放，点击 ♥ 喜欢)`,
                      onClick: (d) => li(i)
                    }, [
                      e("div", sd, [
                        i.cover ? (o(), l("img", {
                          key: 0,
                          src: i.cover,
                          alt: "",
                          loading: "lazy",
                          referrerpolicy: "no-referrer"
                        }, null, 8, nd)) : (o(), l("span", ad)),
                        ct(i.duration) ? (o(), l("span", rd, n(ct(i.duration)), 1)) : m("", !0)
                      ]),
                      e("div", ud, [
                        e("div", dd, [
                          e("span", cd, n(i.title), 1),
                          e("button", {
                            type: "button",
                            class: L(["fo-card-more bili-radio-like-btn", { liked: r(Se).isLiked(i.bvid) }]),
                            title: r(Se).isLiked(i.bvid) ? "取消喜欢" : "添加到我喜欢的电台",
                            "aria-label": r(Se).isLiked(i.bvid) ? "取消喜欢" : "喜欢",
                            onClick: S((d) => {
                              r(Se).toggleLike(i);
                            }, ["stop"])
                          }, n(r(Se).isLiked(i.bvid) ? "♥" : "♡"), 11, vd)
                        ]),
                        e("div", bd, [
                          e("span", null, n(i.author || "Bilibili"), 1),
                          J.value?.bvid === i.bvid && Je.value ? (o(), l("span", pd, "♪ 播放中")) : (o(), l("span", fd, "▶ 播放"))
                        ])
                      ])
                    ], 10, ld))), 128)),
                    r(O).radioVideos.length ? m("", !0) : (o(), l("p", gd, n(r(O).radioLoading ? "读取视频中…" : "此收藏夹暂无可播放视频"), 1))
                  ])
                ]),
                e("section", md, [
                  e("div", hd, [
                    e("button", {
                      type: "button",
                      class: L(["bili-radio-liked-pill", { active: We.value === "liked" }]),
                      title: "播放「我喜欢的电台」中收藏的视频",
                      onClick: si
                    }, [
                      t[93] || (t[93] = e("span", { class: "heart" }, "♥", -1)),
                      t[94] || (t[94] = e("span", null, "我喜欢的电台", -1)),
                      e("small", null, n(ii.value), 1)
                    ], 2),
                    e("span", {
                      class: "bili-radio-folder-chip",
                      title: Re.value
                    }, " 📂 " + n(Re.value) + "（" + n(xe.value.length) + "） ", 9, yd)
                  ]),
                  e("div", _d, [
                    J.value ? (o(), l(R, { key: 0 }, [
                      J.value.cover ? (o(), l("div", {
                        key: 0,
                        class: "bili-radio-stage-backdrop",
                        style: _e({ backgroundImage: `url('${J.value.cover}')` })
                      }, null, 4)) : m("", !0),
                      e("div", kd, [
                        e("button", {
                          type: "button",
                          class: L(["bili-radio-stage-cover-btn", { playing: Oe.value }]),
                          title: Oe.value ? "暂停播放" : "点击播放当前封面曲目",
                          onClick: Gt
                        }, [
                          J.value.cover ? (o(), l("img", {
                            key: 0,
                            src: J.value.cover,
                            alt: J.value.title,
                            referrerpolicy: "no-referrer"
                          }, null, 8, Cd)) : (o(), l("span", wd, "📻")),
                          e("span", xd, [
                            e("span", Sd, n(Je.value && r(Z).loading ? "读取音轨…" : Oe.value ? "⏸ 暂停" : "▶ 播放"), 1)
                          ]),
                          Oe.value ? (o(), l("span", Td, "♪ 播放中")) : ct(J.value.duration) ? (o(), l("span", Md, n(ct(J.value.duration)), 1)) : m("", !0)
                        ], 10, $d),
                        e("div", Pd, [
                          e("h4", {
                            class: "bili-radio-stage-title",
                            title: J.value.title
                          }, n(J.value.title), 9, Id),
                          e("div", Dd, [
                            e("span", null, n(J.value.author || "Bilibili"), 1),
                            t[95] || (t[95] = e("span", { class: "dot" }, "·", -1)),
                            e("span", null, n(Re.value), 1),
                            Vt.value ? (o(), l("span", Ld, n(Vt.value), 1)) : m("", !0)
                          ]),
                          Je.value ? (o(), l("div", Rd, [
                            e("div", Bd, [
                              e("span", {
                                style: _e({ width: `${r(Z).progressPercent || 0}%` })
                              }, null, 4)
                            ]),
                            e("div", zd, [
                              e("span", null, n(r(Z).formattedCurrent), 1),
                              e("span", null, n(r(Z).formattedDuration), 1)
                            ])
                          ])) : m("", !0)
                        ]),
                        e("div", Ed, [
                          e("button", {
                            type: "button",
                            class: "bili-radio-ctrl-btn",
                            disabled: xe.value.length <= 1,
                            title: "文件夹上一首",
                            "aria-label": "文件夹上一首",
                            onClick: t[39] || (t[39] = (i) => Ut(-1))
                          }, " ⏮ ", 8, Fd),
                          e("button", {
                            type: "button",
                            class: "bili-radio-ctrl-btn primary",
                            title: Oe.value ? "暂停" : "播放",
                            "aria-label": Oe.value ? "暂停" : "播放",
                            onClick: Gt
                          }, n(Oe.value ? "⏸" : "▶"), 9, Ad),
                          e("button", {
                            type: "button",
                            class: "bili-radio-ctrl-btn",
                            disabled: xe.value.length <= 1,
                            title: "文件夹下一首",
                            "aria-label": "文件夹下一首",
                            onClick: t[40] || (t[40] = (i) => Ut(1))
                          }, " ⏭ ", 8, Vd),
                          e("button", {
                            type: "button",
                            class: L(["bili-radio-ctrl-btn like", { liked: r(Se).isLiked(J.value.bvid) }]),
                            title: r(Se).isLiked(J.value.bvid) ? "取消喜欢" : "添加到我喜欢的电台",
                            "aria-label": r(Se).isLiked(J.value.bvid) ? "取消喜欢" : "喜欢",
                            onClick: t[41] || (t[41] = (i) => {
                              r(Se).toggleLike(J.value);
                            })
                          }, n(r(Se).isLiked(J.value.bvid) ? "♥" : "♡"), 11, Ud)
                        ])
                      ])
                    ], 64)) : (o(), l("p", Gd, n(r(O).radioLoading ? "正在读取收藏夹封面…" : "选择左侧 B 站收藏夹，即可显示封面并直接连播。"), 1))
                  ]),
                  e("div", qd, [
                    e("button", {
                      id: "bili-radio-play",
                      type: "button",
                      disabled: !xe.value.length,
                      onClick: t[42] || (t[42] = (i) => qt(!1))
                    }, "▶ 顺序播放", 8, Nd),
                    e("button", {
                      id: "bili-radio-shuffle",
                      type: "button",
                      disabled: !xe.value.length,
                      onClick: t[43] || (t[43] = (i) => qt(!0))
                    }, "🔀 随机播放", 8, Wd)
                  ])
                ])
              ])
            ])) : m("", !0)
          ], 38)
        ])
      ]),
      t[108] || (t[108] = e("div", {
        class: "fm-pane",
        id: "pane-sub-video",
        hidden: "",
        style: { display: "none !important" }
      }, null, -1)),
      Pe($l),
      Pe(Es),
      Y.value.visible && Y.value.video ? (o(), l("div", {
        key: 0,
        ref_key: "videoMenuRef",
        ref: F,
        class: "fo-context-menu",
        role: "menu",
        style: _e(r(ee)),
        onClick: t[53] || (t[53] = S(() => {
        }, ["stop"]))
      }, [
        e("div", {
          class: "fo-context-header",
          title: Y.value.video.title
        }, n(Y.value.video.title), 9, Od),
        t[105] || (t[105] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[44] || (t[44] = (i) => De("play"))
        }, [...t[96] || (t[96] = [
          e("span", { class: "fo-context-icon" }, "▶", -1),
          ye(" 小窗播放视频 ", -1)
        ])]),
        t[106] || (t[106] = e("div", { class: "fo-context-divider" }, null, -1)),
        Y.value.video.writable ? (o(), l("button", {
          key: 0,
          type: "button",
          class: "fo-context-item danger",
          onClick: t[45] || (t[45] = (i) => De("delete"))
        }, [...t[97] || (t[97] = [
          e("span", { class: "fo-context-icon" }, "🗑", -1),
          ye(" 取消收藏 ", -1)
        ])])) : m("", !0),
        Y.value.video.writable ? (o(), l("button", {
          key: 1,
          type: "button",
          class: "fo-context-item",
          onClick: t[46] || (t[46] = (i) => De("move"))
        }, [...t[98] || (t[98] = [
          e("span", { class: "fo-context-icon" }, "📁", -1),
          ye(" 移动到… ", -1)
        ])])) : m("", !0),
        Y.value.video.writable ? (o(), l("div", Yd)) : m("", !0),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[47] || (t[47] = (i) => De("open"))
        }, [...t[99] || (t[99] = [
          e("span", { class: "fo-context-icon" }, "↗", -1),
          ye(" 跳转到 B站 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[48] || (t[48] = (i) => De("copy-link"))
        }, [...t[100] || (t[100] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ye(" 复制链接 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[49] || (t[49] = (i) => De("cache"))
        }, [...t[101] || (t[101] = [
          e("span", { class: "fo-context-icon" }, "💾", -1),
          ye(" 缓存视频 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[50] || (t[50] = (i) => De("add-radio"))
        }, [...t[102] || (t[102] = [
          e("span", { class: "fo-context-icon" }, "📻", -1),
          ye(" 添加到电台 ", -1)
        ])]),
        t[107] || (t[107] = e("div", { class: "fo-context-divider" }, null, -1)),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[51] || (t[51] = (i) => De("create-task"))
        }, [...t[103] || (t[103] = [
          e("span", { class: "fo-context-icon" }, "📋", -1),
          ye(" 创建任务 ", -1)
        ])]),
        e("button", {
          type: "button",
          class: "fo-context-item",
          onClick: t[52] || (t[52] = (i) => De("subtitle"))
        }, [...t[104] || (t[104] = [
          e("span", { class: "fo-context-icon" }, "▤", -1),
          ye(" 字幕转文本 ", -1)
        ])])
      ], 4)) : m("", !0)
    ], 2));
  }
}), pc = /* @__PURE__ */ Ze(Kd, [["__scopeId", "data-v-c6428f2a"]]);
export {
  pc as default
};
