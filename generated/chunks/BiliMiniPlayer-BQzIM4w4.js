import { d as Fe, x as V, G as Te, C as De, y as Ue, o as l, c as We, u as n, l as be, z as ve, e as a, f as s, t as c, i as d, F as h, h as L, B as y, g as p, m as A, D as Z, A as fe, j as Be, b as k, s as z } from "./vendor-vue-DokqDua_.js";
import { z as e, d as u, c as Xe } from "./view-styles-BS2802be.js";
import { s as Ye } from "./bili-favorites-store-DZJain6V.js";
import { a as ge, d as He } from "./playback-sync-DtSrzPwc.js";
import { bilibiliChannelService as E } from "./bilibili-channel.service-DjD4pJTZ.js";
import { T as Ne } from "./search.service-D8BPpHmG.js";
import { B as ee } from "./BiliRichText-BE-gFgV_.js";
import { i as he } from "./images-Btmm0s-2.js";
import { u as qe } from "./use-video-failover-nNqois9K.js";
import { _ as Ve } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const Ae = { class: "bili-mini-main-body" }, Ge = {
  key: 0,
  class: "bili-mini-episodes-drawer"
}, je = { class: "bili-mini-episodes-meta" }, Je = { class: "bili-mini-episodes-count" }, Ke = { class: "bili-mini-episodes-body" }, Qe = ["onClick"], Ze = { class: "bili-mini-ep-badge" }, et = ["title"], tt = {
  key: 1,
  class: "bili-mini-desc-drawer"
}, it = { style: { display: "flex", "align-items": "center", gap: "4px" } }, nt = { class: "bili-mini-desc-body" }, st = { class: "bili-mini-desc-up" }, ot = ["src"], lt = { class: "bili-mini-desc-up-info" }, at = { class: "bili-mini-desc-up-top" }, rt = { class: "bili-mini-desc-up-sub" }, dt = {
  key: 0,
  class: "bili-mini-desc-fans"
}, ut = {
  key: 1,
  class: "bili-mini-desc-fans loading"
}, ct = {
  key: 2,
  class: "bili-mini-desc-pubdate"
}, pt = {
  key: 1,
  class: "bili-mini-desc-follow-wrap"
}, mt = ["disabled", "title"], bt = { class: "bili-mini-desc-title" }, vt = { class: "bili-mini-desc-text" }, ft = { class: "bili-mini-player-pane" }, gt = ["title"], ht = {
  key: 0,
  class: "bili-mini-episodes-wrap"
}, yt = ["disabled"], kt = ["disabled"], wt = { class: "bili-mini-speed-wrap" }, _t = {
  key: 0,
  class: "bili-mini-speed-menu"
}, xt = ["onClick"], Ct = { class: "bili-mini-screen" }, Mt = ["src"], Pt = ["src", "poster"], $t = ["title"], St = { class: "bili-dm-btn-icon" }, Et = { class: "bili-dm-btn-state" }, Lt = {
  key: 4,
  class: "bili-mini-status"
}, Rt = {
  key: 5,
  class: "bili-mini-status error",
  style: { display: "flex", "flex-direction": "column", "align-items": "center", "justify-content": "center", gap: "8px", padding: "12px", "text-align": "center" }
}, Ot = {
  key: 2,
  class: "bili-mini-comments-drawer"
}, It = { class: "bili-mini-comments-meta" }, zt = { class: "bili-mini-comments-count" }, Ft = { class: "bili-mini-comments-right" }, Tt = { class: "bili-mini-comments-sort" }, Dt = { class: "bili-mini-comments-body" }, Ut = ["src", "onClick"], Wt = { class: "bili-comment-main" }, Bt = { class: "bili-comment-user-row" }, Xt = ["onClick"], Yt = {
  key: 0,
  class: "bili-comment-up-badge",
  title: "视频作者"
}, Ht = { class: "bili-comment-time" }, Nt = { class: "bili-comment-text" }, qt = {
  key: 0,
  class: "bili-mini-comment-pictures"
}, Vt = ["aria-label", "onClick"], At = ["src"], Gt = { class: "bili-comment-actions" }, jt = { key: 0 }, Jt = {
  key: 1,
  class: "bili-comment-sub-list"
}, Kt = { class: "bili-comment-sub-uname" }, Qt = {
  key: 0,
  class: "bili-mini-comment-pictures"
}, Zt = ["aria-label", "onClick"], ei = ["src"], ti = { class: "bili-comment-sub-more" }, ii = ["disabled", "onClick"], ni = ["disabled", "onClick"], si = ["onClick"], oi = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "20px 0" }
}, li = {
  key: 2,
  class: "muted small",
  style: { "text-align": "center", padding: "20px 0" }
}, ai = {
  key: 0,
  class: "bili-mini-comments-foot"
}, ri = ["disabled"], di = /* @__PURE__ */ Fe({
  __name: "BiliMiniPlayer",
  setup(ui) {
    const v = k(null);
    qe(e, v, () => {
      e.errorMsg = "视频源加载失败，备用地址已用尽，请重新获取视频流", e.isPlaying = !1;
    });
    const m = k(null), w = k(null), G = k(!1), C = k(!1), S = k(!1), U = z(() => {
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
    const j = k(!1), te = k(0), ie = k(0), ne = k(0), se = k(0), J = k(!1);
    let oe = 0, le = 0, B = 0, K = 0, Q = 0;
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
      if (!e.danmakuEnabled || !e.danmakuList?.length || !v.value) return;
      const o = v.value.currentTime;
      if (Math.abs(o - X) > 1.5) {
        R.value = [], F = _e(e.danmakuList, o), X = o;
        return;
      }
      const i = performance.now(), r = m.value?.querySelector(".bili-mini-screen")?.clientHeight || 240, b = Math.max(3, Math.min(8, Math.floor((r - 45) / 26)));
      for (; F < e.danmakuList.length; ) {
        const f = e.danmakuList[F];
        if (f.time > o) break;
        if (o - f.time <= 1.2) {
          let _ = 0, M = 1 / 0;
          for (let g = 0; g < b; g++) {
            const x = re[g] || 0;
            if (x <= i) {
              _ = g;
              break;
            }
            x < M && (M = x, _ = g);
          }
          const P = f.text.length;
          re[_] = i + Math.max(1e3, P * 110);
          const $ = {
            id: `${f.id}_${i}_${Math.random()}`,
            text: f.text,
            color: f.color,
            top: _ * 26 + 8,
            duration: 5.5,
            mode: f.mode
          };
          R.value.push($), setTimeout(() => {
            const g = R.value.findIndex((x) => x.id === $.id);
            g !== -1 && R.value.splice(g, 1);
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
        v.value && (v.value.playbackRate = o);
      }
    ), V(
      () => [e.videoSrc, e.bvid],
      async ([o, i]) => {
        if (o && i) {
          if (await Te(), !v.value || e.videoSrc !== o || e.bvid !== i) return;
          v.value.playbackRate = e.playbackRate, v.value.play().catch(() => {
          }), ge({ bvid: e.bvid, title: e.title, cover: e.cover }, v.value);
        }
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
      const r = Y.value + 8, b = Math.max(r, window.innerWidth - (H.value - Y.value) - 8), f = Math.max(0, window.innerHeight - N.value - 8);
      let _ = e.x, M = e.y;
      const P = () => {
        O = 0, e.x = _, e.y = M, m.value && (m.value.style.left = `${de}px`, m.value.style.top = `${ue}px`);
      }, $ = (x) => {
        if (!j.value) return;
        const Ie = x.clientX - te.value, ze = x.clientY - ie.value;
        _ = Math.min(b, Math.max(r, ne.value + Ie)), M = Math.min(f, Math.max(8, se.value + ze)), de = Math.max(8, _ - Y.value), ue = M, O || (O = requestAnimationFrame(P));
      }, g = () => {
        if (T = null, window.removeEventListener("pointermove", $), window.removeEventListener("pointerup", g), window.removeEventListener("pointercancel", g), O && (cancelAnimationFrame(O), O = 0), t)
          try {
            t.releasePointerCapture(o.pointerId);
          } catch {
          }
        m.value && (m.value.style.willChange = "auto", m.value.classList.remove("is-dragging")), j.value = !1, e.x = _, e.y = M;
      };
      T = g, window.addEventListener("pointermove", $, { passive: !0 }), window.addEventListener("pointerup", g, { once: !0 }), window.addEventListener("pointercancel", g, { once: !0 });
    }
    function Me(o) {
      if (!m.value) return;
      T?.(), D?.(), o.preventDefault(), o.stopPropagation(), J.value = !0, oe = o.clientX, le = o.clientY, B = H.value, K = N.value, Q = B - (e.baseWidth || (window.innerWidth <= 900 ? 340 : 380)), u.bringToFront(), m.value.style.willChange = "width, height", m.value.classList.add("is-dragging");
      const i = o.currentTarget;
      try {
        i?.setPointerCapture(o.pointerId);
      } catch {
      }
      const t = Math.max(B, window.innerWidth - e.x - 10), r = Math.max(K, window.innerHeight - e.y - 10);
      let b = e.baseWidth || 380, f = e.height || 254;
      const _ = () => {
        I = 0, e.baseWidth = b, e.height = f, m.value && (m.value.style.width = `${ce}px`, m.value.style.height = `${pe}px`);
      }, M = ($) => {
        if (!J.value) return;
        const g = Math.min(
          t,
          Math.max(Q + 280, B + $.clientX - oe)
        );
        ce = g, b = Math.round(g - Q);
        const x = Math.round(
          Math.min(r, Math.max(254, K + $.clientY - le))
        );
        pe = x, f = x, I || (I = requestAnimationFrame(_));
      }, P = () => {
        if (D = null, window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", P), window.removeEventListener("pointercancel", P), I && (cancelAnimationFrame(I), I = 0), i)
          try {
            i.releasePointerCapture(o.pointerId);
          } catch {
          }
        m.value && (m.value.style.willChange = "auto", m.value.classList.remove("is-dragging")), J.value = !1, e.baseWidth = b, e.height = f;
      };
      D = P, window.addEventListener("pointermove", M, { passive: !0 }), window.addEventListener("pointerup", P, { once: !0 }), window.addEventListener("pointercancel", P, { once: !0 });
    }
    function Pe() {
      v.value && (e.currentTime = v.value.currentTime, e.duration = v.value.duration || 0, xe());
    }
    function $e() {
      e.isPlaying = !0, v.value && e.bvid && ge({ bvid: e.bvid, title: e.title, cover: e.cover }, v.value);
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
      v.value && He(v.value), window.removeEventListener("click", me), T?.(), D?.();
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
        s("div", Ae, [
          n(e).episodesOpen ? (l(), a("div", Ge, [
            s("div", {
              class: "bili-mini-episodes-head",
              onPointerdown: q
            }, [
              s("div", je, [
                i[19] || (i[19] = s("span", null, "📑 视频选集", -1)),
                s("span", Je, "(" + c(n(e).pages.length) + "P)", 1)
              ]),
              s("button", {
                type: "button",
                class: "bili-mini-tab-btn",
                title: "收起选集",
                onClick: i[0] || (i[0] = d((t) => n(u).toggleEpisodes(!1), ["stop"]))
              }, " ✕ ")
            ], 32),
            s("div", Ke, [
              (l(!0), a(h, null, L(n(e).pages, (t, r) => (l(), a("button", {
                key: t.cid,
                type: "button",
                class: y(["bili-mini-ep-item", { active: r === n(e).currentPageIndex }]),
                onClick: d((b) => n(u).switchEpisode(r), ["stop"])
              }, [
                s("span", Ze, "P" + c(t.page || r + 1), 1),
                s("span", {
                  class: "bili-mini-ep-part",
                  title: t.part
                }, c(t.part || `第 ${r + 1} 集`), 9, et)
              ], 10, Qe))), 128))
            ])
          ])) : p("", !0),
          n(e).descOpen ? (l(), a("div", tt, [
            s("div", {
              class: "bili-mini-desc-head",
              onPointerdown: q
            }, [
              i[20] || (i[20] = s("div", { class: "bili-mini-desc-meta" }, [
                s("span", null, "📋 视频简介")
              ], -1)),
              s("div", it, [
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
            s("div", nt, [
              s("div", st, [
                n(e).authorFace ? (l(), a("img", {
                  key: 0,
                  src: n(e).authorFace,
                  class: "bili-mini-desc-avatar clickable",
                  alt: "",
                  loading: "lazy",
                  title: "点击查看 UP 主详情与近期投稿",
                  onClick: i[3] || (i[3] = d((t) => W(t, { mid: n(e).authorMid, name: n(e).author, face: n(e).authorFace }), ["stop"]))
                }, null, 8, ot)) : p("", !0),
                s("div", lt, [
                  s("div", at, [
                    s("span", {
                      class: "bili-mini-desc-up-name clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: i[4] || (i[4] = d((t) => W(t, { mid: n(e).authorMid, name: n(e).author, face: n(e).authorFace }), ["stop"]))
                    }, c(n(e).author || "UP主"), 1)
                  ]),
                  s("div", rt, [
                    w.value != null ? (l(), a("span", dt, c(n(Ne)(w.value)) + "粉丝 ", 1)) : G.value ? (l(), a("span", ut, "粉丝加载中…")) : p("", !0),
                    n(e).pubdate ? (l(), a("span", ct, c(n(e).pubdate), 1)) : p("", !0)
                  ])
                ]),
                n(e).authorMid ? (l(), a("div", pt, [
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
                  ], 42, mt)
                ])) : p("", !0)
              ]),
              s("div", bt, c(n(e).title), 1),
              i[21] || (i[21] = s("div", { class: "bili-mini-desc-divider" }, null, -1)),
              s("div", vt, [
                Z(ee, {
                  text: n(e).description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ])
          ])) : p("", !0),
          s("div", ft, [
            s("header", {
              class: "bili-mini-head",
              onPointerdown: q
            }, [
              s("span", {
                class: "bili-mini-title",
                title: n(e).title
              }, c(n(e).title || "正在加载…"), 9, gt),
              n(e).pages.length > 1 ? (l(), a("div", ht, [
                s("button", {
                  class: "bili-mini-ep-btn prev",
                  type: "button",
                  title: "上一集",
                  disabled: n(e).currentPageIndex <= 0,
                  onClick: d(Le, ["stop"])
                }, "‹", 8, yt),
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
                }, "›", 8, kt)
              ])) : p("", !0),
              s("button", {
                class: "bili-mini-speed-btn bili-mini-sub-btn",
                type: "button",
                title: "提取当前视频全部字幕 TXT",
                onClick: d(we, ["stop"])
              }, " 字幕 "),
              s("div", wt, [
                s("button", {
                  class: y(["bili-mini-speed-btn", { active: n(e).speedMenuOpen }]),
                  type: "button",
                  title: "点击切换播放倍速",
                  onClick: d(Oe, ["stop"])
                }, c(n(e).playbackRate) + "x ", 3),
                n(e).speedMenuOpen ? (l(), a("div", _t, [
                  (l(), a(h, null, L([0.5, 0.75, 1, 1.25, 1.5, 2], (t) => s("button", {
                    key: t,
                    type: "button",
                    class: y(["bili-mini-speed-item", { active: t === n(e).playbackRate }]),
                    onClick: d((r) => n(u).setPlaybackRate(t), ["stop"])
                  }, [
                    s("span", null, c(t) + "x", 1)
                  ], 10, xt)), 64))
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
            s("div", Ct, [
              n(e).useIframe && n(e).iframeSrc ? (l(), a("iframe", {
                key: 0,
                src: n(e).iframeSrc,
                class: "bili-mini-iframe",
                frameborder: "0",
                allow: "autoplay; fullscreen",
                allowfullscreen: "",
                referrerpolicy: "no-referrer",
                style: { width: "100%", height: "100%", border: "0", display: "block" }
              }, null, 8, Mt)) : n(e).videoSrc ? (l(), a("video", {
                key: 1,
                ref_key: "videoRef",
                ref: v,
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
              }, null, 40, Pt)) : p("", !0),
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
                  s("span", St, c(n(e).danmakuEnabled ? "💬" : "🔲"), 1),
                  i[22] || (i[22] = s("span", { class: "bili-dm-btn-label" }, "弹幕", -1)),
                  s("span", Et, c(n(e).danmakuEnabled ? "开" : "关"), 1)
                ], 10, $t)
              ])) : p("", !0),
              n(e).isLoading ? (l(), a("div", Lt, [...i[23] || (i[23] = [
                s("span", null, "正在取得原生视频流…", -1)
              ])])) : n(e).errorMsg ? (l(), a("div", Rt, [
                s("span", null, c(n(e).errorMsg), 1),
                s("button", {
                  type: "button",
                  style: { padding: "5px 14px", background: "#00aeec", color: "#fff", border: "0", "border-radius": "5px", cursor: "pointer", "font-size": "12px", "font-weight": "600" },
                  onClick: i[13] || (i[13] = d((t) => n(u).retryCurrentVideo(), ["stop"]))
                }, "重新获取视频流")
              ])) : p("", !0)
            ])
          ]),
          n(e).commentsOpen ? (l(), a("div", Ot, [
            s("div", {
              class: "bili-mini-comments-head",
              onPointerdown: q
            }, [
              s("div", It, [
                i[24] || (i[24] = s("span", null, "💬 视频评论", -1)),
                s("span", zt, "(" + c(n(e).totalComments || 0) + ")", 1)
              ]),
              s("div", Ft, [
                s("div", Tt, [
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
            s("div", Dt, [
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
                }, null, 8, Ut),
                s("div", Wt, [
                  s("div", Bt, [
                    s("span", {
                      class: "bili-comment-uname clickable",
                      title: "点击查看 UP 主/作者详情与近期投稿",
                      onClick: d((r) => W(r, { mid: t.mid, name: t.uname, face: t.avatar }), ["stop"])
                    }, c(t.uname), 9, Xt),
                    t.isUp || t.uname === n(e).author || n(e).authorMid && String(t.mid) === String(n(e).authorMid) ? (l(), a("span", Yt, "UP主")) : p("", !0),
                    s("span", Ht, c(t.timeStr), 1)
                  ]),
                  s("div", Nt, [
                    Z(ee, {
                      text: t.message,
                      emotes: t.emotes
                    }, null, 8, ["text", "emotes"])
                  ]),
                  t.pictures.length ? (l(), a("div", qt, [
                    (l(!0), a(h, null, L(t.pictures, (r, b) => (l(), a("button", {
                      key: `${r}-${b}`,
                      type: "button",
                      class: "bili-mini-comment-picture",
                      "aria-label": `查看 ${t.uname} 的评论图片 ${b + 1}`,
                      onClick: d((f) => n(he).open({ source: r, title: `${t.uname} 的评论图片` }), ["stop"])
                    }, [
                      s("img", {
                        src: r,
                        alt: "评论图片",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, At)
                    ], 8, Vt))), 128))
                  ])) : p("", !0),
                  s("div", Gt, [
                    s("span", null, "👍 " + c(t.likeCount), 1),
                    t.replyCount ? (l(), a("span", jt, "💬 " + c(t.replyCount), 1)) : p("", !0)
                  ]),
                  t.replies?.length ? (l(), a("div", Jt, [
                    (l(!0), a(h, null, L(t.replies, (r) => (l(), a("div", {
                      key: r.id,
                      class: "bili-comment-sub-item"
                    }, [
                      s("strong", Kt, c(r.userName) + ":", 1),
                      Z(ee, {
                        text: r.message,
                        emotes: r.emotes
                      }, null, 8, ["text", "emotes"]),
                      r.pictures.length ? (l(), a("div", Qt, [
                        (l(!0), a(h, null, L(r.pictures, (b, f) => (l(), a("button", {
                          key: `${b}-${f}`,
                          type: "button",
                          class: "bili-mini-comment-picture",
                          "aria-label": `查看 ${r.userName} 的回复图片 ${f + 1}`,
                          onClick: d((_) => n(he).open({ source: b, title: `${r.userName} 的回复图片` }), ["stop"])
                        }, [
                          s("img", {
                            src: b,
                            alt: "回复图片",
                            loading: "lazy",
                            referrerpolicy: "no-referrer"
                          }, null, 8, ei)
                        ], 8, Zt))), 128))
                      ])) : p("", !0)
                    ]))), 128)),
                    s("div", ti, [
                      !t.subRepliesExpanded && (t.replyCount || 0) > t.replies.length ? (l(), a(h, { key: 0 }, [
                        s("span", null, "共 " + c(t.replyCount) + " 条回复，", 1),
                        s("button", {
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: t.subRepliesLoading,
                          onClick: d((r) => n(u).expandSubReplies(t.id), ["stop"])
                        }, c(t.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, ii)
                      ], 64)) : t.subRepliesExpanded ? (l(), a(h, { key: 1 }, [
                        t.subRepliesHasMore ? (l(), a("button", {
                          key: 0,
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: t.subRepliesLoading,
                          onClick: d((r) => n(u).expandSubReplies(t.id), ["stop"])
                        }, c(t.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, ni)) : p("", !0),
                        s("button", {
                          type: "button",
                          class: "bili-comment-sub-collapse-btn",
                          onClick: d((r) => n(u).collapseSubReplies(t.id), ["stop"])
                        }, " 收起 ▴ ", 8, si)
                      ], 64)) : p("", !0)
                    ])
                  ])) : p("", !0)
                ])
              ]))), 128)) : n(e).commentsLoading ? (l(), a("p", oi, " 正在加载评论… ")) : (l(), a("p", li, " 暂无评论 "))
            ]),
            n(e).hasMoreComments ? (l(), a("div", ai, [
              s("button", {
                type: "button",
                class: "bili-mini-comments-more-btn",
                disabled: n(e).commentsLoading,
                onClick: i[17] || (i[17] = d((t) => n(u).loadMoreComments(), ["stop"]))
              }, c(n(e).commentsLoading ? "加载中…" : "加载更多评论"), 9, ri)
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
}), wi = /* @__PURE__ */ Ve(di, [["__scopeId", "data-v-87329bcf"]]);
export {
  wi as default
};
