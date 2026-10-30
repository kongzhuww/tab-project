import { d as De, x as V, G as Ue, C as We, y as Be, o as a, c as Xe, u as n, l as be, z as ve, e as r, f as s, t as c, i as d, F as w, h as R, B as _, g as p, m as A, D as Z, A as fe, j as Ye, b as y, s as U } from "./vendor-vue-DokqDua_.js";
import { z as e, d as u, c as ge } from "./view-styles-BD_YXi9v.js";
import { s as He } from "./bili-favorites-store-Cklcca4P.js";
import { a as he, d as Ne } from "./playback-sync-FFVqFonG.js";
import { bilibiliChannelService as L } from "./bilibili-channel.service-BIK4GYQ6.js";
import { T as qe } from "./search.service-DGqXHLyU.js";
import { B as ee } from "./BiliRichText-BE-gFgV_.js";
import { i as ye } from "./images-BfJFnNY0.js";
import { u as Ve } from "./use-video-failover-nNqois9K.js";
import { _ as Ae } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const Ge = { class: "bili-mini-main-body" }, je = {
  key: 0,
  class: "bili-mini-episodes-drawer"
}, Je = { class: "bili-mini-episodes-meta" }, Ke = { class: "bili-mini-episodes-count" }, Qe = { class: "bili-mini-episodes-body" }, Ze = ["onClick"], et = { class: "bili-mini-ep-badge" }, tt = ["title"], it = {
  key: 1,
  class: "bili-mini-desc-drawer"
}, nt = { style: { display: "flex", "align-items": "center", gap: "4px" } }, st = { class: "bili-mini-desc-body" }, lt = { class: "bili-mini-desc-up" }, ot = ["src"], at = { class: "bili-mini-desc-up-info" }, rt = { class: "bili-mini-desc-up-top" }, dt = { class: "bili-mini-desc-up-sub" }, ut = {
  key: 0,
  class: "bili-mini-desc-fans"
}, ct = {
  key: 1,
  class: "bili-mini-desc-fans loading"
}, pt = {
  key: 2,
  class: "bili-mini-desc-pubdate"
}, mt = {
  key: 1,
  class: "bili-mini-desc-follow-wrap"
}, bt = ["disabled", "title"], vt = { class: "bili-mini-desc-title" }, ft = { class: "bili-mini-desc-text" }, gt = { class: "bili-mini-player-pane" }, ht = ["title"], yt = {
  key: 0,
  class: "bili-mini-episodes-wrap"
}, kt = ["disabled"], wt = ["disabled"], _t = { class: "bili-mini-speed-wrap" }, xt = {
  key: 0,
  class: "bili-mini-speed-menu"
}, Ct = ["onClick"], Pt = { class: "bili-mini-screen" }, Mt = ["src"], $t = ["src", "poster"], St = ["title"], Et = { class: "bili-dm-btn-icon" }, Lt = { class: "bili-dm-btn-state" }, Rt = {
  key: 4,
  class: "bili-mini-status"
}, Ot = {
  key: 5,
  class: "bili-mini-status error",
  style: { display: "flex", "flex-direction": "column", "align-items": "center", "justify-content": "center", gap: "8px", padding: "12px", "text-align": "center" }
}, Ft = {
  key: 2,
  class: "bili-mini-comments-drawer"
}, It = { class: "bili-mini-comments-meta" }, zt = { class: "bili-mini-comments-count" }, Tt = { class: "bili-mini-comments-right" }, Dt = { class: "bili-mini-comments-sort" }, Ut = { class: "bili-mini-comments-body" }, Wt = ["src", "onClick"], Bt = { class: "bili-comment-main" }, Xt = { class: "bili-comment-user-row" }, Yt = ["onClick"], Ht = {
  key: 0,
  class: "bili-comment-up-badge",
  title: "视频作者"
}, Nt = { class: "bili-comment-time" }, qt = { class: "bili-comment-text" }, Vt = {
  key: 0,
  class: "bili-mini-comment-pictures"
}, At = ["aria-label", "onClick"], Gt = ["src"], jt = { class: "bili-comment-actions" }, Jt = { key: 0 }, Kt = {
  key: 1,
  class: "bili-comment-sub-list"
}, Qt = { class: "bili-comment-sub-uname" }, Zt = {
  key: 0,
  class: "bili-mini-comment-pictures"
}, ei = ["aria-label", "onClick"], ti = ["src"], ii = { class: "bili-comment-sub-more" }, ni = ["disabled", "onClick"], si = ["disabled", "onClick"], li = ["onClick"], oi = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "20px 0" }
}, ai = {
  key: 2,
  class: "muted small",
  style: { "text-align": "center", padding: "20px 0" }
}, ri = {
  key: 0,
  class: "bili-mini-comments-foot"
}, di = ["disabled"], ui = /* @__PURE__ */ De({
  __name: "BiliMiniPlayer",
  setup(ci) {
    const f = y(null);
    Ve(e, f, () => {
      e.errorMsg = "视频源加载失败，备用地址已用尽，请重新获取视频流", e.isPlaying = !1;
    });
    const b = y(null), m = y(null), G = y(!1), P = y(!1), E = y(!1), k = y(!1);
    async function ke(l) {
      const i = String(l || "");
      if (!i) {
        k.value = !1;
        return;
      }
      (L.upGroupsState.followingsCache || []).some((o) => String(o.mid) === i) && (k.value = !0);
      try {
        const o = await ge.api(
          `https://api.bilibili.com/x/relation?fid=${i}`
        );
        o && typeof o.attribute == "number" && (k.value = o.attribute === 2 || o.attribute === 6 || o.attribute === 1);
      } catch {
      }
    }
    async function we(l) {
      const i = String(l || "");
      if (!i) {
        m.value = null;
        return;
      }
      G.value = !0;
      try {
        const t = await ge.api(
          `https://api.bilibili.com/x/relation/stat?vmid=${i}`
        );
        t && typeof t.follower == "number" ? m.value = t.follower : m.value = null;
      } catch {
        m.value = null;
      } finally {
        G.value = !1;
      }
    }
    V(
      () => [e.descOpen, e.authorMid],
      ([l, i]) => {
        P.value = !1, l && i ? (we(i), ke(i)) : l || (m.value = null);
      },
      { immediate: !0 }
    );
    async function _e() {
      const l = String(e.authorMid || "");
      if (!(!l || E.value))
        if (k.value) {
          if (!P.value) {
            P.value = !0;
            return;
          }
          P.value = !1, k.value = !1, m.value != null && m.value > 0 && (m.value -= 1), E.value = !0;
          try {
            if ((await L.unfollowBiliUp(l)).ok) {
              const t = L.upGroupsState.followingsCache || [];
              L.upGroupsState.followingsCache = t.filter(
                (o) => String(o.mid) !== l
              );
            } else
              k.value = !0, m.value != null && (m.value += 1);
          } catch {
            k.value = !0, m.value != null && (m.value += 1);
          } finally {
            E.value = !1;
          }
        } else {
          k.value = !0, P.value = !1, m.value != null && (m.value += 1), E.value = !0;
          try {
            if ((await L.followBiliUp(l)).ok) {
              const t = L.upGroupsState.followingsCache || [];
              t.some((o) => String(o.mid) === l) || (t.unshift({
                mid: l,
                name: e.author || "UP主",
                face: e.authorFace || "",
                sign: ""
              }), L.upGroupsState.followingsCache = [...t]);
            } else
              k.value = !1, m.value != null && m.value > 0 && (m.value -= 1);
          } catch {
            k.value = !1, m.value != null && m.value > 0 && (m.value -= 1);
          } finally {
            E.value = !1;
          }
        }
    }
    function W(l, i) {
      !i.mid && !i.name || L.showUpRecentVideosPreview(
        {
          preventDefault: () => l.preventDefault(),
          stopPropagation: () => l.stopPropagation(),
          clientX: l.clientX,
          clientY: l.clientY
        },
        {
          mid: i.mid || "",
          name: i.name || "UP主",
          face: i.face || "",
          sign: i.sign || ""
        }
      );
    }
    function xe() {
      e.bvid && He.open({
        bvid: e.bvid,
        cid: e.cid,
        title: e.title
      });
    }
    const j = y(!1), te = y(0), ie = y(0), ne = y(0), se = y(0), J = y(!1);
    let le = 0, oe = 0, B = 0, K = 0, Q = 0;
    const ae = U(() => e.episodesOpen || e.descOpen || e.commentsOpen), O = y([]);
    let z = 0, X = 0;
    const re = [0, 0, 0, 0, 0, 0, 0, 0];
    function Ce(l, i) {
      let t = 0, o = l.length - 1;
      for (; t <= o; ) {
        const v = Math.floor((t + o) / 2);
        l[v].time < i ? t = v + 1 : o = v - 1;
      }
      return t;
    }
    function Pe() {
      if (!e.danmakuEnabled || !e.danmakuList?.length || !f.value) return;
      const l = f.value.currentTime;
      if (Math.abs(l - X) > 1.5) {
        O.value = [], z = Ce(e.danmakuList, l), X = l;
        return;
      }
      const i = performance.now(), o = b.value?.querySelector(".bili-mini-screen")?.clientHeight || 240, v = Math.max(3, Math.min(8, Math.floor((o - 45) / 26)));
      for (; z < e.danmakuList.length; ) {
        const g = e.danmakuList[z];
        if (g.time > l) break;
        if (l - g.time <= 1.2) {
          let x = 0, M = 1 / 0;
          for (let h = 0; h < v; h++) {
            const C = re[h] || 0;
            if (C <= i) {
              x = h;
              break;
            }
            C < M && (M = C, x = h);
          }
          const $ = g.text.length;
          re[x] = i + Math.max(1e3, $ * 110);
          const S = {
            id: `${g.id}_${i}_${Math.random()}`,
            text: g.text,
            color: g.color,
            top: x * 26 + 8,
            duration: 5.5,
            mode: g.mode
          };
          O.value.push(S), setTimeout(() => {
            const h = O.value.findIndex((C) => C.id === S.id);
            h !== -1 && O.value.splice(h, 1);
          }, S.duration * 1e3);
        }
        z++;
      }
      X = l;
    }
    V(
      () => [e.videoSrc, e.cid],
      () => {
        O.value = [], z = 0, X = 0;
      }
    );
    const Y = U(() => {
      if (e.collapsed) return 0;
      const l = typeof window < "u" && window.innerWidth <= 900;
      let i = 0;
      return e.episodesOpen && (i += l ? 200 : 240), e.descOpen && (i += l ? 220 : 280), i;
    }), H = U(() => {
      if (e.collapsed) return 250;
      const l = typeof window < "u" && window.innerWidth <= 900;
      let i = e.baseWidth || (l ? 340 : 380);
      return e.episodesOpen && (i += l ? 200 : 240), e.descOpen && (i += l ? 220 : 280), e.commentsOpen && (i += l ? 260 : 330), i;
    }), N = U(() => e.collapsed ? 34 : Math.max(ae.value ? 380 : 254, e.height)), Me = U(() => {
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
      (l) => {
        f.value && (f.value.playbackRate = l);
      }
    ), V(
      () => [e.videoSrc, e.bvid],
      async ([l, i]) => {
        if (l && i) {
          if (await Ue(), !f.value || e.videoSrc !== l || e.bvid !== i) return;
          f.value.playbackRate = e.playbackRate, f.value.play().catch(() => {
          }), he({ bvid: e.bvid, title: e.title, cover: e.cover }, f.value);
        }
      }
    );
    let F = 0, de = 0, ue = 0, I = 0, ce = 0, pe = 0, T = null, D = null;
    function q(l) {
      if (l.target?.closest(
        "button, a, input, textarea, select, .bili-mini-quality-menu, .bili-mini-speed-menu, .bili-mini-tab-btn, .no-drag"
      ) || !b.value) return;
      T?.(), D?.(), j.value = !0, te.value = l.clientX, ie.value = l.clientY, ne.value = e.x, se.value = e.y, u.bringToFront(), b.value.style.willChange = "left, top", b.value.classList.add("is-dragging");
      const t = l.currentTarget;
      try {
        t?.setPointerCapture(l.pointerId);
      } catch {
      }
      const o = Y.value + 8, v = Math.max(o, window.innerWidth - (H.value - Y.value) - 8), g = Math.max(0, window.innerHeight - N.value - 8);
      let x = e.x, M = e.y;
      const $ = () => {
        F = 0, e.x = x, e.y = M, b.value && (b.value.style.left = `${de}px`, b.value.style.top = `${ue}px`);
      }, S = (C) => {
        if (!j.value) return;
        const ze = C.clientX - te.value, Te = C.clientY - ie.value;
        x = Math.min(v, Math.max(o, ne.value + ze)), M = Math.min(g, Math.max(8, se.value + Te)), de = Math.max(8, x - Y.value), ue = M, F || (F = requestAnimationFrame($));
      }, h = () => {
        if (T = null, window.removeEventListener("pointermove", S), window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", h), F && (cancelAnimationFrame(F), F = 0), t)
          try {
            t.releasePointerCapture(l.pointerId);
          } catch {
          }
        b.value && (b.value.style.willChange = "auto", b.value.classList.remove("is-dragging")), j.value = !1, e.x = x, e.y = M;
      };
      T = h, window.addEventListener("pointermove", S, { passive: !0 }), window.addEventListener("pointerup", h, { once: !0 }), window.addEventListener("pointercancel", h, { once: !0 });
    }
    function $e(l) {
      if (!b.value) return;
      T?.(), D?.(), l.preventDefault(), l.stopPropagation(), J.value = !0, le = l.clientX, oe = l.clientY, B = H.value, K = N.value, Q = B - (e.baseWidth || (window.innerWidth <= 900 ? 340 : 380)), u.bringToFront(), b.value.style.willChange = "width, height", b.value.classList.add("is-dragging");
      const i = l.currentTarget;
      try {
        i?.setPointerCapture(l.pointerId);
      } catch {
      }
      const t = Math.max(B, window.innerWidth - e.x - 10), o = Math.max(K, window.innerHeight - e.y - 10);
      let v = e.baseWidth || 380, g = e.height || 254;
      const x = () => {
        I = 0, e.baseWidth = v, e.height = g, b.value && (b.value.style.width = `${ce}px`, b.value.style.height = `${pe}px`);
      }, M = (S) => {
        if (!J.value) return;
        const h = Math.min(
          t,
          Math.max(Q + 280, B + S.clientX - le)
        );
        ce = h, v = Math.round(h - Q);
        const C = Math.round(
          Math.min(o, Math.max(254, K + S.clientY - oe))
        );
        pe = C, g = C, I || (I = requestAnimationFrame(x));
      }, $ = () => {
        if (D = null, window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", $), window.removeEventListener("pointercancel", $), I && (cancelAnimationFrame(I), I = 0), i)
          try {
            i.releasePointerCapture(l.pointerId);
          } catch {
          }
        b.value && (b.value.style.willChange = "auto", b.value.classList.remove("is-dragging")), J.value = !1, e.baseWidth = v, e.height = g;
      };
      D = $, window.addEventListener("pointermove", M, { passive: !0 }), window.addEventListener("pointerup", $, { once: !0 }), window.addEventListener("pointercancel", $, { once: !0 });
    }
    function Se() {
      f.value && (e.currentTime = f.value.currentTime, e.duration = f.value.duration || 0, Pe());
    }
    function Ee() {
      e.isPlaying = !0, f.value && e.bvid && he({ bvid: e.bvid, title: e.title, cover: e.cover }, f.value);
    }
    function Le() {
      e.isPlaying = !1;
    }
    function Re() {
      e.currentPageIndex < e.pages.length - 1 && u.switchEpisode(e.currentPageIndex + 1);
    }
    function Oe() {
      e.currentPageIndex > 0 && u.switchEpisode(e.currentPageIndex - 1);
    }
    function Fe() {
      e.currentPageIndex < e.pages.length - 1 && u.switchEpisode(e.currentPageIndex + 1);
    }
    function Ie() {
      e.speedMenuOpen = !e.speedMenuOpen, e.speedMenuOpen && (e.qualityMenuOpen = !1);
    }
    function me(l) {
      const i = l.target;
      i?.closest(".bili-mini-quality-wrap") || (e.qualityMenuOpen = !1), i?.closest(".bili-mini-speed-wrap") || (e.speedMenuOpen = !1);
    }
    return We(() => {
      window.addEventListener("click", me);
    }), Be(() => {
      f.value && Ne(f.value), window.removeEventListener("click", me), T?.(), D?.();
    }), (l, i) => (a(), Xe(Ye, { to: "body" }, [
      n(e).isOpen ? be((a(), r("section", {
        key: 0,
        ref_key: "playerRef",
        ref: b,
        class: _(["bili-mini-player", {
          collapsed: n(e).collapsed,
          "subscription-comments-view": ae.value,
          "episodes-expanded": n(e).episodesOpen,
          "desc-expanded": n(e).descOpen,
          "comments-expanded": n(e).commentsOpen
        }]),
        style: fe(Me.value),
        onMousedown: i[18] || (i[18] = //@ts-ignore
        (...t) => n(u).bringToFront && n(u).bringToFront(...t))
      }, [
        s("div", Ge, [
          n(e).episodesOpen ? (a(), r("div", je, [
            s("div", {
              class: "bili-mini-episodes-head",
              onPointerdown: q
            }, [
              s("div", Je, [
                i[19] || (i[19] = s("span", null, "📑 视频选集", -1)),
                s("span", Ke, "(" + c(n(e).pages.length) + "P)", 1)
              ]),
              s("button", {
                type: "button",
                class: "bili-mini-tab-btn",
                title: "收起选集",
                onClick: i[0] || (i[0] = d((t) => n(u).toggleEpisodes(!1), ["stop"]))
              }, " ✕ ")
            ], 32),
            s("div", Qe, [
              (a(!0), r(w, null, R(n(e).pages, (t, o) => (a(), r("button", {
                key: t.cid,
                type: "button",
                class: _(["bili-mini-ep-item", { active: o === n(e).currentPageIndex }]),
                onClick: d((v) => n(u).switchEpisode(o), ["stop"])
              }, [
                s("span", et, "P" + c(t.page || o + 1), 1),
                s("span", {
                  class: "bili-mini-ep-part",
                  title: t.part
                }, c(t.part || `第 ${o + 1} 集`), 9, tt)
              ], 10, Ze))), 128))
            ])
          ])) : p("", !0),
          n(e).descOpen ? (a(), r("div", it, [
            s("div", {
              class: "bili-mini-desc-head",
              onPointerdown: q
            }, [
              i[20] || (i[20] = s("div", { class: "bili-mini-desc-meta" }, [
                s("span", null, "📋 视频简介")
              ], -1)),
              s("div", nt, [
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
            s("div", st, [
              s("div", lt, [
                n(e).authorFace ? (a(), r("img", {
                  key: 0,
                  src: n(e).authorFace,
                  class: "bili-mini-desc-avatar clickable",
                  alt: "",
                  loading: "lazy",
                  title: "点击查看 UP 主详情与近期投稿",
                  onClick: i[3] || (i[3] = d((t) => W(t, { mid: n(e).authorMid, name: n(e).author, face: n(e).authorFace }), ["stop"]))
                }, null, 8, ot)) : p("", !0),
                s("div", at, [
                  s("div", rt, [
                    s("span", {
                      class: "bili-mini-desc-up-name clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: i[4] || (i[4] = d((t) => W(t, { mid: n(e).authorMid, name: n(e).author, face: n(e).authorFace }), ["stop"]))
                    }, c(n(e).author || "UP主"), 1)
                  ]),
                  s("div", dt, [
                    m.value != null ? (a(), r("span", ut, c(n(qe)(m.value)) + "粉丝 ", 1)) : G.value ? (a(), r("span", ct, "粉丝加载中…")) : p("", !0),
                    n(e).pubdate ? (a(), r("span", pt, c(n(e).pubdate), 1)) : p("", !0)
                  ])
                ]),
                n(e).authorMid ? (a(), r("div", mt, [
                  s("button", {
                    type: "button",
                    class: _(["bili-mini-desc-follow-btn", {
                      followed: k.value && !P.value,
                      confirming: P.value,
                      busy: E.value
                    }]),
                    disabled: E.value,
                    title: k.value ? P.value ? "点击确认取消关注" : "已关注，点击取关" : "关注该 UP 主",
                    onClick: d(_e, ["stop"]),
                    onMouseleave: i[5] || (i[5] = (t) => P.value = !1)
                  }, [
                    E.value ? (a(), r(w, { key: 0 }, [
                      A("...")
                    ], 64)) : k.value ? P.value ? (a(), r(w, { key: 2 }, [
                      A("确定取消？")
                    ], 64)) : (a(), r(w, { key: 3 }, [
                      A("已关注")
                    ], 64)) : (a(), r(w, { key: 1 }, [
                      A("+ 关注")
                    ], 64))
                  ], 42, bt)
                ])) : p("", !0)
              ]),
              s("div", vt, c(n(e).title), 1),
              i[21] || (i[21] = s("div", { class: "bili-mini-desc-divider" }, null, -1)),
              s("div", ft, [
                Z(ee, {
                  text: n(e).description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ])
          ])) : p("", !0),
          s("div", gt, [
            s("header", {
              class: "bili-mini-head",
              onPointerdown: q
            }, [
              s("span", {
                class: "bili-mini-title",
                title: n(e).title
              }, c(n(e).title || "正在加载…"), 9, ht),
              n(e).pages.length > 1 ? (a(), r("div", yt, [
                s("button", {
                  class: "bili-mini-ep-btn prev",
                  type: "button",
                  title: "上一集",
                  disabled: n(e).currentPageIndex <= 0,
                  onClick: d(Oe, ["stop"])
                }, "‹", 8, kt),
                s("button", {
                  class: _(["bili-mini-ep-label", { active: n(e).episodesOpen }]),
                  type: "button",
                  title: "展开/收起选集列表",
                  onClick: i[6] || (i[6] = d((t) => n(u).toggleEpisodes(), ["stop"]))
                }, " P" + c(n(e).currentPageIndex + 1), 3),
                s("button", {
                  class: "bili-mini-ep-btn next",
                  type: "button",
                  title: "下一集",
                  disabled: n(e).currentPageIndex >= n(e).pages.length - 1,
                  onClick: d(Fe, ["stop"])
                }, "›", 8, wt)
              ])) : p("", !0),
              s("button", {
                class: "bili-mini-speed-btn bili-mini-sub-btn",
                type: "button",
                title: "提取当前视频全部字幕 TXT",
                onClick: d(xe, ["stop"])
              }, " 字幕 "),
              s("div", _t, [
                s("button", {
                  class: _(["bili-mini-speed-btn", { active: n(e).speedMenuOpen }]),
                  type: "button",
                  title: "点击切换播放倍速",
                  onClick: d(Ie, ["stop"])
                }, c(n(e).playbackRate) + "x ", 3),
                n(e).speedMenuOpen ? (a(), r("div", xt, [
                  (a(), r(w, null, R([0.5, 0.75, 1, 1.25, 1.5, 2], (t) => s("button", {
                    key: t,
                    type: "button",
                    class: _(["bili-mini-speed-item", { active: t === n(e).playbackRate }]),
                    onClick: d((o) => n(u).setPlaybackRate(t), ["stop"])
                  }, [
                    s("span", null, c(t) + "x", 1)
                  ], 10, Ct)), 64))
                ])) : p("", !0)
              ]),
              s("button", {
                class: _(["bili-mini-desc-toggle", { active: n(e).descOpen }]),
                type: "button",
                title: "展开/收起视频简介",
                onClick: i[7] || (i[7] = d((t) => n(u).toggleDesc(), ["stop"]))
              }, " 📋 简介 ", 2),
              s("button", {
                class: _(["bili-mini-comments-toggle", { active: n(e).commentsOpen }]),
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
            s("div", Pt, [
              n(e).useIframe && n(e).iframeSrc ? (a(), r("iframe", {
                key: 0,
                src: n(e).iframeSrc,
                class: "bili-mini-iframe",
                frameborder: "0",
                allow: "autoplay; fullscreen",
                allowfullscreen: "",
                referrerpolicy: "no-referrer",
                style: { width: "100%", height: "100%", border: "0", display: "block" }
              }, null, 8, Mt)) : n(e).videoSrc ? (a(), r("video", {
                key: 1,
                ref_key: "videoRef",
                ref: f,
                src: n(e).videoSrc,
                poster: n(e).cover || void 0,
                controls: "",
                autoplay: "",
                playsinline: "",
                preload: "metadata",
                referrerpolicy: "no-referrer",
                style: { width: "100%", height: "100%", "object-fit": "contain", background: "#000", display: "block" },
                onTimeupdate: Se,
                onPlay: Ee,
                onPause: Le,
                onEnded: Re
              }, null, 40, $t)) : p("", !0),
              n(e).videoSrc ? be((a(), r("div", {
                key: 2,
                class: _(["bili-danmaku-stage", { "is-paused": !n(e).isPlaying }])
              }, [
                (a(!0), r(w, null, R(O.value, (t) => (a(), r("div", {
                  key: t.id,
                  class: _(["bili-danmaku-bullet", { "is-top": t.mode === 5, "is-bottom": t.mode === 4 }]),
                  style: fe({
                    top: `${t.top}px`,
                    color: t.color,
                    animationDuration: `${t.duration}s`
                  })
                }, c(t.text), 7))), 128))
              ], 2)), [
                [ve, n(e).danmakuEnabled]
              ]) : p("", !0),
              n(e).videoSrc ? (a(), r("div", {
                key: 3,
                class: "bili-danmaku-bar-bottom",
                onClick: i[12] || (i[12] = d(() => {
                }, ["stop"]))
              }, [
                s("button", {
                  type: "button",
                  class: _(["bili-danmaku-toggle-btn", { active: n(e).danmakuEnabled }]),
                  title: n(e).danmakuEnabled ? "点击关闭弹幕" : "点击开启弹幕",
                  onClick: i[11] || (i[11] = d((t) => n(u).toggleDanmakuEnabled(), ["stop"]))
                }, [
                  s("span", Et, c(n(e).danmakuEnabled ? "💬" : "🔲"), 1),
                  i[22] || (i[22] = s("span", { class: "bili-dm-btn-label" }, "弹幕", -1)),
                  s("span", Lt, c(n(e).danmakuEnabled ? "开" : "关"), 1)
                ], 10, St)
              ])) : p("", !0),
              n(e).isLoading ? (a(), r("div", Rt, [...i[23] || (i[23] = [
                s("span", null, "正在取得原生视频流…", -1)
              ])])) : n(e).errorMsg ? (a(), r("div", Ot, [
                s("span", null, c(n(e).errorMsg), 1),
                s("button", {
                  type: "button",
                  style: { padding: "5px 14px", background: "#00aeec", color: "#fff", border: "0", "border-radius": "5px", cursor: "pointer", "font-size": "12px", "font-weight": "600" },
                  onClick: i[13] || (i[13] = d((t) => n(u).retryCurrentVideo(), ["stop"]))
                }, "重新获取视频流")
              ])) : p("", !0)
            ])
          ]),
          n(e).commentsOpen ? (a(), r("div", Ft, [
            s("div", {
              class: "bili-mini-comments-head",
              onPointerdown: q
            }, [
              s("div", It, [
                i[24] || (i[24] = s("span", null, "💬 视频评论", -1)),
                s("span", zt, "(" + c(n(e).totalComments || 0) + ")", 1)
              ]),
              s("div", Tt, [
                s("div", Dt, [
                  s("button", {
                    type: "button",
                    class: _(["bili-mini-sort-btn", { active: n(e).commentsSort === 2 }]),
                    onClick: i[14] || (i[14] = d((t) => n(u).setCommentsSort(2), ["stop"]))
                  }, " 按热度 ", 2),
                  s("button", {
                    type: "button",
                    class: _(["bili-mini-sort-btn", { active: n(e).commentsSort === 0 }]),
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
            s("div", Ut, [
              n(e).comments.length ? (a(!0), r(w, { key: 0 }, R(n(e).comments, (t) => (a(), r("div", {
                key: t.id,
                class: "bili-comment-item"
              }, [
                s("img", {
                  src: t.avatar || "assets/default-avatar.svg",
                  class: "bili-comment-avatar clickable",
                  alt: "",
                  loading: "lazy",
                  title: "点击查看 UP 主/作者详情与近期投稿",
                  onClick: d((o) => W(o, { mid: t.mid, name: t.uname, face: t.avatar }), ["stop"])
                }, null, 8, Wt),
                s("div", Bt, [
                  s("div", Xt, [
                    s("span", {
                      class: "bili-comment-uname clickable",
                      title: "点击查看 UP 主/作者详情与近期投稿",
                      onClick: d((o) => W(o, { mid: t.mid, name: t.uname, face: t.avatar }), ["stop"])
                    }, c(t.uname), 9, Yt),
                    t.isUp || t.uname === n(e).author || n(e).authorMid && String(t.mid) === String(n(e).authorMid) ? (a(), r("span", Ht, "UP主")) : p("", !0),
                    s("span", Nt, c(t.timeStr), 1)
                  ]),
                  s("div", qt, [
                    Z(ee, {
                      text: t.message,
                      emotes: t.emotes
                    }, null, 8, ["text", "emotes"])
                  ]),
                  t.pictures.length ? (a(), r("div", Vt, [
                    (a(!0), r(w, null, R(t.pictures, (o, v) => (a(), r("button", {
                      key: `${o}-${v}`,
                      type: "button",
                      class: "bili-mini-comment-picture",
                      "aria-label": `查看 ${t.uname} 的评论图片 ${v + 1}`,
                      onClick: d((g) => n(ye).open({ source: o, title: `${t.uname} 的评论图片` }), ["stop"])
                    }, [
                      s("img", {
                        src: o,
                        alt: "评论图片",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, Gt)
                    ], 8, At))), 128))
                  ])) : p("", !0),
                  s("div", jt, [
                    s("span", null, "👍 " + c(t.likeCount), 1),
                    t.replyCount ? (a(), r("span", Jt, "💬 " + c(t.replyCount), 1)) : p("", !0)
                  ]),
                  t.replies?.length ? (a(), r("div", Kt, [
                    (a(!0), r(w, null, R(t.replies, (o) => (a(), r("div", {
                      key: o.id,
                      class: "bili-comment-sub-item"
                    }, [
                      s("strong", Qt, c(o.userName) + ":", 1),
                      Z(ee, {
                        text: o.message,
                        emotes: o.emotes
                      }, null, 8, ["text", "emotes"]),
                      o.pictures.length ? (a(), r("div", Zt, [
                        (a(!0), r(w, null, R(o.pictures, (v, g) => (a(), r("button", {
                          key: `${v}-${g}`,
                          type: "button",
                          class: "bili-mini-comment-picture",
                          "aria-label": `查看 ${o.userName} 的回复图片 ${g + 1}`,
                          onClick: d((x) => n(ye).open({ source: v, title: `${o.userName} 的回复图片` }), ["stop"])
                        }, [
                          s("img", {
                            src: v,
                            alt: "回复图片",
                            loading: "lazy",
                            referrerpolicy: "no-referrer"
                          }, null, 8, ti)
                        ], 8, ei))), 128))
                      ])) : p("", !0)
                    ]))), 128)),
                    s("div", ii, [
                      !t.subRepliesExpanded && (t.replyCount || 0) > t.replies.length ? (a(), r(w, { key: 0 }, [
                        s("span", null, "共 " + c(t.replyCount) + " 条回复，", 1),
                        s("button", {
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: t.subRepliesLoading,
                          onClick: d((o) => n(u).expandSubReplies(t.id), ["stop"])
                        }, c(t.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, ni)
                      ], 64)) : t.subRepliesExpanded ? (a(), r(w, { key: 1 }, [
                        t.subRepliesHasMore ? (a(), r("button", {
                          key: 0,
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: t.subRepliesLoading,
                          onClick: d((o) => n(u).expandSubReplies(t.id), ["stop"])
                        }, c(t.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, si)) : p("", !0),
                        s("button", {
                          type: "button",
                          class: "bili-comment-sub-collapse-btn",
                          onClick: d((o) => n(u).collapseSubReplies(t.id), ["stop"])
                        }, " 收起 ▴ ", 8, li)
                      ], 64)) : p("", !0)
                    ])
                  ])) : p("", !0)
                ])
              ]))), 128)) : n(e).commentsLoading ? (a(), r("p", oi, " 正在加载评论… ")) : (a(), r("p", ai, " 暂无评论 "))
            ]),
            n(e).hasMoreComments ? (a(), r("div", ri, [
              s("button", {
                type: "button",
                class: "bili-mini-comments-more-btn",
                disabled: n(e).commentsLoading,
                onClick: i[17] || (i[17] = d((t) => n(u).loadMoreComments(), ["stop"]))
              }, c(n(e).commentsLoading ? "加载中…" : "加载更多评论"), 9, di)
            ])) : p("", !0)
          ])) : p("", !0)
        ]),
        n(e).collapsed ? p("", !0) : (a(), r("div", {
          key: 0,
          class: "bili-mini-resize-handle",
          role: "separator",
          "aria-label": "调整播放器大小",
          onPointerdown: $e
        }, null, 32))
      ], 38)), [
        [ve, !n(e).collapsed]
      ]) : p("", !0)
    ]));
  }
}), _i = /* @__PURE__ */ Ae(ui, [["__scopeId", "data-v-7e945e60"]]);
export {
  _i as default
};
