import { d as Fe, x as V, G as Te, C as De, y as Ue, o as l, c as We, u as n, l as be, z as ve, e as a, f as s, t as c, i as d, F as h, h as L, B as y, g as p, m as A, D as Z, A as fe, j as Be, b as k, s as z } from "./vendor-vue-DokqDua_.js";
import { z as e, d as u, c as Xe } from "./view-styles-CoGPhW6D.js";
import { s as Ye } from "./bili-favorites-store-CzrFxlFz.js";
import { a as ge, d as He } from "./playback-sync-C1TcYlEi.js";
import { bilibiliChannelService as E } from "./bilibili-channel.service-yR34QLrV.js";
import { Q as Ne } from "./search.service-N0DgqU3Q.js";
import { B as ee } from "./BiliRichText-BE-gFgV_.js";
import { i as he } from "./images-DOigKs1W.js";
import { _ as qe } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const Ve = { class: "bili-mini-main-body" }, Ae = {
  key: 0,
  class: "bili-mini-episodes-drawer"
}, Ge = { class: "bili-mini-episodes-meta" }, je = { class: "bili-mini-episodes-count" }, Qe = { class: "bili-mini-episodes-body" }, Je = ["onClick"], Ke = { class: "bili-mini-ep-badge" }, Ze = ["title"], et = {
  key: 1,
  class: "bili-mini-desc-drawer"
}, tt = { style: { display: "flex", "align-items": "center", gap: "4px" } }, it = { class: "bili-mini-desc-body" }, nt = { class: "bili-mini-desc-up" }, st = ["src"], ot = { class: "bili-mini-desc-up-info" }, lt = { class: "bili-mini-desc-up-top" }, at = { class: "bili-mini-desc-up-sub" }, rt = {
  key: 0,
  class: "bili-mini-desc-fans"
}, dt = {
  key: 1,
  class: "bili-mini-desc-fans loading"
}, ut = {
  key: 2,
  class: "bili-mini-desc-pubdate"
}, ct = {
  key: 1,
  class: "bili-mini-desc-follow-wrap"
}, pt = ["disabled", "title"], mt = { class: "bili-mini-desc-title" }, bt = { class: "bili-mini-desc-text" }, vt = { class: "bili-mini-player-pane" }, ft = ["title"], gt = {
  key: 0,
  class: "bili-mini-episodes-wrap"
}, ht = ["disabled"], yt = ["disabled"], kt = { class: "bili-mini-speed-wrap" }, wt = {
  key: 0,
  class: "bili-mini-speed-menu"
}, _t = ["onClick"], xt = { class: "bili-mini-screen" }, Ct = ["src"], Mt = ["src", "poster"], Pt = ["title"], $t = { class: "bili-dm-btn-icon" }, St = { class: "bili-dm-btn-state" }, Et = {
  key: 4,
  class: "bili-mini-status"
}, Lt = {
  key: 5,
  class: "bili-mini-status error",
  style: { display: "flex", "flex-direction": "column", "align-items": "center", "justify-content": "center", gap: "8px", padding: "12px", "text-align": "center" }
}, Rt = {
  key: 2,
  class: "bili-mini-comments-drawer"
}, Ot = { class: "bili-mini-comments-meta" }, It = { class: "bili-mini-comments-count" }, zt = { class: "bili-mini-comments-right" }, Ft = { class: "bili-mini-comments-sort" }, Tt = { class: "bili-mini-comments-body" }, Dt = ["src", "onClick"], Ut = { class: "bili-comment-main" }, Wt = { class: "bili-comment-user-row" }, Bt = ["onClick"], Xt = {
  key: 0,
  class: "bili-comment-up-badge",
  title: "视频作者"
}, Yt = { class: "bili-comment-time" }, Ht = { class: "bili-comment-text" }, Nt = {
  key: 0,
  class: "bili-mini-comment-pictures"
}, qt = ["aria-label", "onClick"], Vt = ["src"], At = { class: "bili-comment-actions" }, Gt = { key: 0 }, jt = {
  key: 1,
  class: "bili-comment-sub-list"
}, Qt = { class: "bili-comment-sub-uname" }, Jt = {
  key: 0,
  class: "bili-mini-comment-pictures"
}, Kt = ["aria-label", "onClick"], Zt = ["src"], ei = { class: "bili-comment-sub-more" }, ti = ["disabled", "onClick"], ii = ["disabled", "onClick"], ni = ["onClick"], si = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "20px 0" }
}, oi = {
  key: 2,
  class: "muted small",
  style: { "text-align": "center", padding: "20px 0" }
}, li = {
  key: 0,
  class: "bili-mini-comments-foot"
}, ai = ["disabled"], ri = /* @__PURE__ */ Fe({
  __name: "BiliMiniPlayer",
  setup(di) {
    const g = k(null), m = k(null), w = k(null), G = k(!1), C = k(!1), S = k(!1), U = z(() => {
      const o = String(e.authorMid || "");
      return o ? (E.upGroupsState.followingsCache || []).some((t) => String(t.mid) === o) : !1;
    });
    async function ye(o) {
      const i = String(o || "");
      if (!i) {
        w.value = null;
        return;
      }
      G.value = !0;
      try {
        const t = await Xe.api(
          `https://api.bilibili.com/x/relation/stat?vmid=${i}`
        );
        t && typeof t.follower == "number" ? w.value = t.follower : w.value = null;
      } catch {
        w.value = null;
      } finally {
        G.value = !1;
      }
    }
    V(
      () => [e.descOpen, e.authorMid],
      ([o, i]) => {
        C.value = !1, o && i ? ye(i) : o || (w.value = null);
      },
      { immediate: !0 }
    );
    async function ke() {
      const o = String(e.authorMid || "");
      if (!(!o || S.value))
        if (U.value) {
          if (!C.value) {
            C.value = !0;
            return;
          }
          S.value = !0;
          try {
            if ((await E.unfollowBiliUp(o)).ok) {
              C.value = !1;
              const t = E.upGroupsState.followingsCache || [];
              E.upGroupsState.followingsCache = t.filter(
                (r) => String(r.mid) !== o
              ), w.value != null && w.value > 0 && (w.value -= 1);
            }
          } finally {
            S.value = !1;
          }
        } else {
          S.value = !0;
          try {
            if ((await E.followBiliUp(o)).ok) {
              C.value = !1;
              const t = E.upGroupsState.followingsCache || [];
              t.some((r) => String(r.mid) === o) || (t.unshift({
                mid: o,
                name: e.author || "UP主",
                face: e.authorFace || "",
                sign: ""
              }), E.upGroupsState.followingsCache = [...t]), w.value != null && (w.value += 1);
            }
          } finally {
            S.value = !1;
          }
        }
    }
    function W(o, i) {
      !i.mid && !i.name || E.showUpRecentVideosPreview(
        {
          preventDefault: () => o.preventDefault(),
          stopPropagation: () => o.stopPropagation(),
          clientX: o.clientX,
          clientY: o.clientY
        },
        {
          mid: i.mid || "",
          name: i.name || "UP主",
          face: i.face || "",
          sign: i.sign || ""
        }
      );
    }
    function we() {
      e.bvid && Ye.open({
        bvid: e.bvid,
        cid: e.cid,
        title: e.title
      });
    }
    const j = k(!1), te = k(0), ie = k(0), ne = k(0), se = k(0), Q = k(!1);
    let oe = 0, le = 0, B = 0, J = 0, K = 0;
    const ae = z(() => e.episodesOpen || e.descOpen || e.commentsOpen), R = k([]);
    let F = 0, X = 0;
    const re = [0, 0, 0, 0, 0, 0, 0, 0];
    function _e(o, i) {
      let t = 0, r = o.length - 1;
      for (; t <= r; ) {
        const b = Math.floor((t + r) / 2);
        o[b].time < i ? t = b + 1 : r = b - 1;
      }
      return t;
    }
    function xe() {
      if (!e.danmakuEnabled || !e.danmakuList?.length || !g.value) return;
      const o = g.value.currentTime;
      if (Math.abs(o - X) > 1.5) {
        R.value = [], F = _e(e.danmakuList, o), X = o;
        return;
      }
      const i = performance.now(), r = m.value?.querySelector(".bili-mini-screen")?.clientHeight || 240, b = Math.max(3, Math.min(8, Math.floor((r - 45) / 26)));
      for (; F < e.danmakuList.length; ) {
        const v = e.danmakuList[F];
        if (v.time > o) break;
        if (o - v.time <= 1.2) {
          let _ = 0, M = 1 / 0;
          for (let f = 0; f < b; f++) {
            const x = re[f] || 0;
            if (x <= i) {
              _ = f;
              break;
            }
            x < M && (M = x, _ = f);
          }
          const P = v.text.length;
          re[_] = i + Math.max(1e3, P * 110);
          const $ = {
            id: `${v.id}_${i}_${Math.random()}`,
            text: v.text,
            color: v.color,
            top: _ * 26 + 8,
            duration: 5.5,
            mode: v.mode
          };
          R.value.push($), setTimeout(() => {
            const f = R.value.findIndex((x) => x.id === $.id);
            f !== -1 && R.value.splice(f, 1);
          }, $.duration * 1e3);
        }
        F++;
      }
      X = o;
    }
    V(
      () => [e.videoSrc, e.cid],
      () => {
        R.value = [], F = 0, X = 0;
      }
    );
    const Y = z(() => {
      if (e.collapsed) return 0;
      const o = typeof window < "u" && window.innerWidth <= 900;
      let i = 0;
      return e.episodesOpen && (i += o ? 200 : 240), e.descOpen && (i += o ? 220 : 280), i;
    }), H = z(() => {
      if (e.collapsed) return 250;
      const o = typeof window < "u" && window.innerWidth <= 900;
      let i = e.baseWidth || (o ? 340 : 380);
      return e.episodesOpen && (i += o ? 200 : 240), e.descOpen && (i += o ? 220 : 280), e.commentsOpen && (i += o ? 260 : 330), i;
    }), N = z(() => e.collapsed ? 34 : Math.max(ae.value ? 380 : 254, e.height)), Ce = z(() => {
      if (e.collapsed && typeof document < "u") {
        const i = document.querySelector(".fo-mini-dock-anchor");
        if (i && i.getBoundingClientRect) {
          const t = i.getBoundingClientRect();
          if (t.width > 0 && t.height > 0 && t.top > 0)
            return {
              left: `${t.left}px`,
              top: `${t.top}px`,
              width: `${H.value}px`,
              height: `${N.value}px`,
              zIndex: e.zIndex
            };
        }
      }
      return {
        left: `${Math.max(8, e.x - Y.value)}px`,
        top: `${e.y}px`,
        width: `${H.value}px`,
        height: `${N.value}px`,
        zIndex: e.zIndex
      };
    });
    V(
      () => e.playbackRate,
      (o) => {
        g.value && (g.value.playbackRate = o);
      }
    ), V(
      () => [e.videoSrc, e.bvid],
      async ([o, i]) => {
        o && g.value && i && (await Te(), g.value.playbackRate = e.playbackRate, g.value.play().catch(() => {
        }), ge({ bvid: e.bvid, title: e.title, cover: e.cover }, g.value));
      }
    );
    let O = 0, de = 0, ue = 0, I = 0, ce = 0, pe = 0, T = null, D = null;
    function q(o) {
      if (o.target?.closest(
        "button, a, input, textarea, select, .bili-mini-quality-menu, .bili-mini-speed-menu, .bili-mini-tab-btn, .no-drag"
      ) || !m.value) return;
      T?.(), D?.(), j.value = !0, te.value = o.clientX, ie.value = o.clientY, ne.value = e.x, se.value = e.y, u.bringToFront(), m.value.style.willChange = "left, top", m.value.classList.add("is-dragging");
      const t = o.currentTarget;
      try {
        t?.setPointerCapture(o.pointerId);
      } catch {
      }
      const r = Y.value + 8, b = Math.max(r, window.innerWidth - (H.value - Y.value) - 8), v = Math.max(0, window.innerHeight - N.value - 8);
      let _ = e.x, M = e.y;
      const P = () => {
        O = 0, e.x = _, e.y = M, m.value && (m.value.style.left = `${de}px`, m.value.style.top = `${ue}px`);
      }, $ = (x) => {
        if (!j.value) return;
        const Ie = x.clientX - te.value, ze = x.clientY - ie.value;
        _ = Math.min(b, Math.max(r, ne.value + Ie)), M = Math.min(v, Math.max(8, se.value + ze)), de = Math.max(8, _ - Y.value), ue = M, O || (O = requestAnimationFrame(P));
      }, f = () => {
        if (T = null, window.removeEventListener("pointermove", $), window.removeEventListener("pointerup", f), window.removeEventListener("pointercancel", f), O && (cancelAnimationFrame(O), O = 0), t)
          try {
            t.releasePointerCapture(o.pointerId);
          } catch {
          }
        m.value && (m.value.style.willChange = "auto", m.value.classList.remove("is-dragging")), j.value = !1, e.x = _, e.y = M;
      };
      T = f, window.addEventListener("pointermove", $, { passive: !0 }), window.addEventListener("pointerup", f, { once: !0 }), window.addEventListener("pointercancel", f, { once: !0 });
    }
    function Me(o) {
      if (!m.value) return;
      T?.(), D?.(), o.preventDefault(), o.stopPropagation(), Q.value = !0, oe = o.clientX, le = o.clientY, B = H.value, J = N.value, K = B - (e.baseWidth || (window.innerWidth <= 900 ? 340 : 380)), u.bringToFront(), m.value.style.willChange = "width, height", m.value.classList.add("is-dragging");
      const i = o.currentTarget;
      try {
        i?.setPointerCapture(o.pointerId);
      } catch {
      }
      const t = Math.max(B, window.innerWidth - e.x - 10), r = Math.max(J, window.innerHeight - e.y - 10);
      let b = e.baseWidth || 380, v = e.height || 254;
      const _ = () => {
        I = 0, e.baseWidth = b, e.height = v, m.value && (m.value.style.width = `${ce}px`, m.value.style.height = `${pe}px`);
      }, M = ($) => {
        if (!Q.value) return;
        const f = Math.min(
          t,
          Math.max(K + 280, B + $.clientX - oe)
        );
        ce = f, b = Math.round(f - K);
        const x = Math.round(
          Math.min(r, Math.max(254, J + $.clientY - le))
        );
        pe = x, v = x, I || (I = requestAnimationFrame(_));
      }, P = () => {
        if (D = null, window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", P), window.removeEventListener("pointercancel", P), I && (cancelAnimationFrame(I), I = 0), i)
          try {
            i.releasePointerCapture(o.pointerId);
          } catch {
          }
        m.value && (m.value.style.willChange = "auto", m.value.classList.remove("is-dragging")), Q.value = !1, e.baseWidth = b, e.height = v;
      };
      D = P, window.addEventListener("pointermove", M, { passive: !0 }), window.addEventListener("pointerup", P, { once: !0 }), window.addEventListener("pointercancel", P, { once: !0 });
    }
    function Pe() {
      g.value && (e.currentTime = g.value.currentTime, e.duration = g.value.duration || 0, xe());
    }
    function $e() {
      e.isPlaying = !0, g.value && e.bvid && ge({ bvid: e.bvid, title: e.title, cover: e.cover }, g.value);
    }
    function Se() {
      e.isPlaying = !1;
    }
    function Ee() {
      e.currentPageIndex < e.pages.length - 1 && u.switchEpisode(e.currentPageIndex + 1);
    }
    function Le() {
      e.currentPageIndex > 0 && u.switchEpisode(e.currentPageIndex - 1);
    }
    function Re() {
      e.currentPageIndex < e.pages.length - 1 && u.switchEpisode(e.currentPageIndex + 1);
    }
    function Oe() {
      e.speedMenuOpen = !e.speedMenuOpen, e.speedMenuOpen && (e.qualityMenuOpen = !1);
    }
    function me(o) {
      const i = o.target;
      i?.closest(".bili-mini-quality-wrap") || (e.qualityMenuOpen = !1), i?.closest(".bili-mini-speed-wrap") || (e.speedMenuOpen = !1);
    }
    return De(() => {
      window.addEventListener("click", me);
    }), Ue(() => {
      g.value && He(g.value), window.removeEventListener("click", me), T?.(), D?.();
    }), (o, i) => (l(), We(Be, { to: "body" }, [
      n(e).isOpen ? be((l(), a("section", {
        key: 0,
        ref_key: "playerRef",
        ref: m,
        class: y(["bili-mini-player", {
          collapsed: n(e).collapsed,
          "subscription-comments-view": ae.value,
          "episodes-expanded": n(e).episodesOpen,
          "desc-expanded": n(e).descOpen,
          "comments-expanded": n(e).commentsOpen
        }]),
        style: fe(Ce.value),
        onMousedown: i[18] || (i[18] = //@ts-ignore
        (...t) => n(u).bringToFront && n(u).bringToFront(...t))
      }, [
        s("div", Ve, [
          n(e).episodesOpen ? (l(), a("div", Ae, [
            s("div", {
              class: "bili-mini-episodes-head",
              onPointerdown: q
            }, [
              s("div", Ge, [
                i[19] || (i[19] = s("span", null, "📑 视频选集", -1)),
                s("span", je, "(" + c(n(e).pages.length) + "P)", 1)
              ]),
              s("button", {
                type: "button",
                class: "bili-mini-tab-btn",
                title: "收起选集",
                onClick: i[0] || (i[0] = d((t) => n(u).toggleEpisodes(!1), ["stop"]))
              }, " ✕ ")
            ], 32),
            s("div", Qe, [
              (l(!0), a(h, null, L(n(e).pages, (t, r) => (l(), a("button", {
                key: t.cid,
                type: "button",
                class: y(["bili-mini-ep-item", { active: r === n(e).currentPageIndex }]),
                onClick: d((b) => n(u).switchEpisode(r), ["stop"])
              }, [
                s("span", Ke, "P" + c(t.page || r + 1), 1),
                s("span", {
                  class: "bili-mini-ep-part",
                  title: t.part
                }, c(t.part || `第 ${r + 1} 集`), 9, Ze)
              ], 10, Je))), 128))
            ])
          ])) : p("", !0),
          n(e).descOpen ? (l(), a("div", et, [
            s("div", {
              class: "bili-mini-desc-head",
              onPointerdown: q
            }, [
              i[20] || (i[20] = s("div", { class: "bili-mini-desc-meta" }, [
                s("span", null, "📋 视频简介")
              ], -1)),
              s("div", tt, [
                s("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: "复制完整视频简介",
                  onClick: i[1] || (i[1] = d((t) => n(u).copyDescription(), ["stop"]))
                }, " 复制简介 "),
                s("button", {
                  type: "button",
                  class: "bili-mini-tab-btn",
                  title: "收起简介",
                  onClick: i[2] || (i[2] = d((t) => n(u).toggleDesc(!1), ["stop"]))
                }, " ✕ ")
              ])
            ], 32),
            s("div", it, [
              s("div", nt, [
                n(e).authorFace ? (l(), a("img", {
                  key: 0,
                  src: n(e).authorFace,
                  class: "bili-mini-desc-avatar clickable",
                  alt: "",
                  loading: "lazy",
                  title: "点击查看 UP 主详情与近期投稿",
                  onClick: i[3] || (i[3] = d((t) => W(t, { mid: n(e).authorMid, name: n(e).author, face: n(e).authorFace }), ["stop"]))
                }, null, 8, st)) : p("", !0),
                s("div", ot, [
                  s("div", lt, [
                    s("span", {
                      class: "bili-mini-desc-up-name clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: i[4] || (i[4] = d((t) => W(t, { mid: n(e).authorMid, name: n(e).author, face: n(e).authorFace }), ["stop"]))
                    }, c(n(e).author || "UP主"), 1)
                  ]),
                  s("div", at, [
                    w.value != null ? (l(), a("span", rt, c(n(Ne)(w.value)) + "粉丝 ", 1)) : G.value ? (l(), a("span", dt, "粉丝加载中…")) : p("", !0),
                    n(e).pubdate ? (l(), a("span", ut, c(n(e).pubdate), 1)) : p("", !0)
                  ])
                ]),
                n(e).authorMid ? (l(), a("div", ct, [
                  s("button", {
                    type: "button",
                    class: y(["bili-mini-desc-follow-btn", {
                      followed: U.value && !C.value,
                      confirming: C.value,
                      busy: S.value
                    }]),
                    disabled: S.value,
                    title: U.value ? C.value ? "点击确认取消关注" : "已关注，点击取关" : "关注该 UP 主",
                    onClick: d(ke, ["stop"]),
                    onMouseleave: i[5] || (i[5] = (t) => C.value = !1)
                  }, [
                    S.value ? (l(), a(h, { key: 0 }, [
                      A("...")
                    ], 64)) : U.value ? C.value ? (l(), a(h, { key: 2 }, [
                      A("确定取消？")
                    ], 64)) : (l(), a(h, { key: 3 }, [
                      A("已关注")
                    ], 64)) : (l(), a(h, { key: 1 }, [
                      A("+ 关注")
                    ], 64))
                  ], 42, pt)
                ])) : p("", !0)
              ]),
              s("div", mt, c(n(e).title), 1),
              i[21] || (i[21] = s("div", { class: "bili-mini-desc-divider" }, null, -1)),
              s("div", bt, [
                Z(ee, {
                  text: n(e).description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ])
          ])) : p("", !0),
          s("div", vt, [
            s("header", {
              class: "bili-mini-head",
              onPointerdown: q
            }, [
              s("span", {
                class: "bili-mini-title",
                title: n(e).title
              }, c(n(e).title || "正在加载…"), 9, ft),
              n(e).pages.length > 1 ? (l(), a("div", gt, [
                s("button", {
                  class: "bili-mini-ep-btn prev",
                  type: "button",
                  title: "上一集",
                  disabled: n(e).currentPageIndex <= 0,
                  onClick: d(Le, ["stop"])
                }, "‹", 8, ht),
                s("button", {
                  class: y(["bili-mini-ep-label", { active: n(e).episodesOpen }]),
                  type: "button",
                  title: "展开/收起选集列表",
                  onClick: i[6] || (i[6] = d((t) => n(u).toggleEpisodes(), ["stop"]))
                }, " P" + c(n(e).currentPageIndex + 1), 3),
                s("button", {
                  class: "bili-mini-ep-btn next",
                  type: "button",
                  title: "下一集",
                  disabled: n(e).currentPageIndex >= n(e).pages.length - 1,
                  onClick: d(Re, ["stop"])
                }, "›", 8, yt)
              ])) : p("", !0),
              s("button", {
                class: "bili-mini-speed-btn bili-mini-sub-btn",
                type: "button",
                title: "提取当前视频全部字幕 TXT",
                onClick: d(we, ["stop"])
              }, " 字幕 "),
              s("div", kt, [
                s("button", {
                  class: y(["bili-mini-speed-btn", { active: n(e).speedMenuOpen }]),
                  type: "button",
                  title: "点击切换播放倍速",
                  onClick: d(Oe, ["stop"])
                }, c(n(e).playbackRate) + "x ", 3),
                n(e).speedMenuOpen ? (l(), a("div", wt, [
                  (l(), a(h, null, L([0.5, 0.75, 1, 1.25, 1.5, 2], (t) => s("button", {
                    key: t,
                    type: "button",
                    class: y(["bili-mini-speed-item", { active: t === n(e).playbackRate }]),
                    onClick: d((r) => n(u).setPlaybackRate(t), ["stop"])
                  }, [
                    s("span", null, c(t) + "x", 1)
                  ], 10, _t)), 64))
                ])) : p("", !0)
              ]),
              s("button", {
                class: y(["bili-mini-desc-toggle", { active: n(e).descOpen }]),
                type: "button",
                title: "展开/收起视频简介",
                onClick: i[7] || (i[7] = d((t) => n(u).toggleDesc(), ["stop"]))
              }, " 📋 简介 ", 2),
              s("button", {
                class: y(["bili-mini-comments-toggle", { active: n(e).commentsOpen }]),
                type: "button",
                title: "展开/收起评论区",
                onClick: i[8] || (i[8] = d((t) => n(u).toggleComments(), ["stop"]))
              }, " 💬 评论 ", 2),
              s("button", {
                class: "bili-mini-collapse",
                type: "button",
                title: "收起",
                onClick: i[9] || (i[9] = d((t) => n(u).toggleCollapse(), ["stop"]))
              }, " — "),
              s("button", {
                class: "bili-mini-close",
                type: "button",
                title: "关闭并释放播放器",
                onClick: i[10] || (i[10] = d((t) => n(u).close(), ["stop"]))
              }, " ✕ ")
            ], 32),
            s("div", xt, [
              n(e).useIframe && n(e).iframeSrc ? (l(), a("iframe", {
                key: 0,
                src: n(e).iframeSrc,
                class: "bili-mini-iframe",
                frameborder: "0",
                allow: "autoplay; fullscreen",
                allowfullscreen: "",
                referrerpolicy: "no-referrer",
                style: { width: "100%", height: "100%", border: "0", display: "block" }
              }, null, 8, Ct)) : n(e).videoSrc ? (l(), a("video", {
                key: 1,
                ref_key: "videoRef",
                ref: g,
                src: n(e).videoSrc,
                poster: n(e).cover || void 0,
                controls: "",
                autoplay: "",
                playsinline: "",
                preload: "metadata",
                referrerpolicy: "no-referrer",
                style: { width: "100%", height: "100%", "object-fit": "contain", background: "#000", display: "block" },
                onTimeupdate: Pe,
                onPlay: $e,
                onPause: Se,
                onEnded: Ee
              }, null, 40, Mt)) : p("", !0),
              n(e).videoSrc ? be((l(), a("div", {
                key: 2,
                class: y(["bili-danmaku-stage", { "is-paused": !n(e).isPlaying }])
              }, [
                (l(!0), a(h, null, L(R.value, (t) => (l(), a("div", {
                  key: t.id,
                  class: y(["bili-danmaku-bullet", { "is-top": t.mode === 5, "is-bottom": t.mode === 4 }]),
                  style: fe({
                    top: `${t.top}px`,
                    color: t.color,
                    animationDuration: `${t.duration}s`
                  })
                }, c(t.text), 7))), 128))
              ], 2)), [
                [ve, n(e).danmakuEnabled]
              ]) : p("", !0),
              n(e).videoSrc ? (l(), a("div", {
                key: 3,
                class: "bili-danmaku-bar-bottom",
                onClick: i[12] || (i[12] = d(() => {
                }, ["stop"]))
              }, [
                s("button", {
                  type: "button",
                  class: y(["bili-danmaku-toggle-btn", { active: n(e).danmakuEnabled }]),
                  title: n(e).danmakuEnabled ? "点击关闭弹幕" : "点击开启弹幕",
                  onClick: i[11] || (i[11] = d((t) => n(u).toggleDanmakuEnabled(), ["stop"]))
                }, [
                  s("span", $t, c(n(e).danmakuEnabled ? "💬" : "🔲"), 1),
                  i[22] || (i[22] = s("span", { class: "bili-dm-btn-label" }, "弹幕", -1)),
                  s("span", St, c(n(e).danmakuEnabled ? "开" : "关"), 1)
                ], 10, Pt)
              ])) : p("", !0),
              n(e).isLoading ? (l(), a("div", Et, [...i[23] || (i[23] = [
                s("span", null, "正在取得原生视频流…", -1)
              ])])) : n(e).errorMsg ? (l(), a("div", Lt, [
                s("span", null, c(n(e).errorMsg), 1),
                s("button", {
                  type: "button",
                  style: { padding: "5px 14px", background: "#00aeec", color: "#fff", border: "0", "border-radius": "5px", cursor: "pointer", "font-size": "12px", "font-weight": "600" },
                  onClick: i[13] || (i[13] = d((t) => n(u).retryCurrentVideo(), ["stop"]))
                }, "重新获取视频流")
              ])) : p("", !0)
            ])
          ]),
          n(e).commentsOpen ? (l(), a("div", Rt, [
            s("div", {
              class: "bili-mini-comments-head",
              onPointerdown: q
            }, [
              s("div", Ot, [
                i[24] || (i[24] = s("span", null, "💬 视频评论", -1)),
                s("span", It, "(" + c(n(e).totalComments || 0) + ")", 1)
              ]),
              s("div", zt, [
                s("div", Ft, [
                  s("button", {
                    type: "button",
                    class: y(["bili-mini-sort-btn", { active: n(e).commentsSort === 2 }]),
                    onClick: i[14] || (i[14] = d((t) => n(u).setCommentsSort(2), ["stop"]))
                  }, " 按热度 ", 2),
                  s("button", {
                    type: "button",
                    class: y(["bili-mini-sort-btn", { active: n(e).commentsSort === 0 }]),
                    onClick: i[15] || (i[15] = d((t) => n(u).setCommentsSort(0), ["stop"]))
                  }, " 按时间 ", 2)
                ]),
                s("button", {
                  type: "button",
                  class: "bili-mini-tab-btn",
                  title: "收起评论",
                  onClick: i[16] || (i[16] = d((t) => n(u).toggleComments(!1), ["stop"]))
                }, " ✕ ")
              ])
            ], 32),
            s("div", Tt, [
              n(e).comments.length ? (l(!0), a(h, { key: 0 }, L(n(e).comments, (t) => (l(), a("div", {
                key: t.id,
                class: "bili-comment-item"
              }, [
                s("img", {
                  src: t.avatar || "assets/default-avatar.svg",
                  class: "bili-comment-avatar clickable",
                  alt: "",
                  loading: "lazy",
                  title: "点击查看 UP 主/作者详情与近期投稿",
                  onClick: d((r) => W(r, { mid: t.mid, name: t.uname, face: t.avatar }), ["stop"])
                }, null, 8, Dt),
                s("div", Ut, [
                  s("div", Wt, [
                    s("span", {
                      class: "bili-comment-uname clickable",
                      title: "点击查看 UP 主/作者详情与近期投稿",
                      onClick: d((r) => W(r, { mid: t.mid, name: t.uname, face: t.avatar }), ["stop"])
                    }, c(t.uname), 9, Bt),
                    t.isUp || t.uname === n(e).author || n(e).authorMid && String(t.mid) === String(n(e).authorMid) ? (l(), a("span", Xt, "UP主")) : p("", !0),
                    s("span", Yt, c(t.timeStr), 1)
                  ]),
                  s("div", Ht, [
                    Z(ee, {
                      text: t.message,
                      emotes: t.emotes
                    }, null, 8, ["text", "emotes"])
                  ]),
                  t.pictures.length ? (l(), a("div", Nt, [
                    (l(!0), a(h, null, L(t.pictures, (r, b) => (l(), a("button", {
                      key: `${r}-${b}`,
                      type: "button",
                      class: "bili-mini-comment-picture",
                      "aria-label": `查看 ${t.uname} 的评论图片 ${b + 1}`,
                      onClick: d((v) => n(he).open({ source: r, title: `${t.uname} 的评论图片` }), ["stop"])
                    }, [
                      s("img", {
                        src: r,
                        alt: "评论图片",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Vt)
                    ], 8, qt))), 128))
                  ])) : p("", !0),
                  s("div", At, [
                    s("span", null, "👍 " + c(t.likeCount), 1),
                    t.replyCount ? (l(), a("span", Gt, "💬 " + c(t.replyCount), 1)) : p("", !0)
                  ]),
                  t.replies?.length ? (l(), a("div", jt, [
                    (l(!0), a(h, null, L(t.replies, (r) => (l(), a("div", {
                      key: r.id,
                      class: "bili-comment-sub-item"
                    }, [
                      s("strong", Qt, c(r.userName) + ":", 1),
                      Z(ee, {
                        text: r.message,
                        emotes: r.emotes
                      }, null, 8, ["text", "emotes"]),
                      r.pictures.length ? (l(), a("div", Jt, [
                        (l(!0), a(h, null, L(r.pictures, (b, v) => (l(), a("button", {
                          key: `${b}-${v}`,
                          type: "button",
                          class: "bili-mini-comment-picture",
                          "aria-label": `查看 ${r.userName} 的回复图片 ${v + 1}`,
                          onClick: d((_) => n(he).open({ source: b, title: `${r.userName} 的回复图片` }), ["stop"])
                        }, [
                          s("img", {
                            src: b,
                            alt: "回复图片",
                            loading: "lazy",
                            referrerpolicy: "no-referrer"
                          }, null, 8, Zt)
                        ], 8, Kt))), 128))
                      ])) : p("", !0)
                    ]))), 128)),
                    s("div", ei, [
                      !t.subRepliesExpanded && (t.replyCount || 0) > t.replies.length ? (l(), a(h, { key: 0 }, [
                        s("span", null, "共 " + c(t.replyCount) + " 条回复，", 1),
                        s("button", {
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: t.subRepliesLoading,
                          onClick: d((r) => n(u).expandSubReplies(t.id), ["stop"])
                        }, c(t.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, ti)
                      ], 64)) : t.subRepliesExpanded ? (l(), a(h, { key: 1 }, [
                        t.subRepliesHasMore ? (l(), a("button", {
                          key: 0,
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: t.subRepliesLoading,
                          onClick: d((r) => n(u).expandSubReplies(t.id), ["stop"])
                        }, c(t.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, ii)) : p("", !0),
                        s("button", {
                          type: "button",
                          class: "bili-comment-sub-collapse-btn",
                          onClick: d((r) => n(u).collapseSubReplies(t.id), ["stop"])
                        }, " 收起 ▴ ", 8, ni)
                      ], 64)) : p("", !0)
                    ])
                  ])) : p("", !0)
                ])
              ]))), 128)) : n(e).commentsLoading ? (l(), a("p", si, " 正在加载评论… ")) : (l(), a("p", oi, " 暂无评论 "))
            ]),
            n(e).hasMoreComments ? (l(), a("div", li, [
              s("button", {
                type: "button",
                class: "bili-mini-comments-more-btn",
                disabled: n(e).commentsLoading,
                onClick: i[17] || (i[17] = d((t) => n(u).loadMoreComments(), ["stop"]))
              }, c(n(e).commentsLoading ? "加载中…" : "加载更多评论"), 9, ai)
            ])) : p("", !0)
          ])) : p("", !0)
        ]),
        n(e).collapsed ? p("", !0) : (l(), a("div", {
          key: 0,
          class: "bili-mini-resize-handle",
          role: "separator",
          "aria-label": "调整播放器大小",
          onPointerdown: Me
        }, null, 32))
      ], 38)), [
        [ve, !n(e).collapsed]
      ]) : p("", !0)
    ]));
  }
}), yi = /* @__PURE__ */ qe(ri, [["__scopeId", "data-v-40cdca80"]]);
export {
  yi as default
};
