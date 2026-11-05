import { d as We, w as A, G as Ue, D as Be, z as Xe, o as a, e as Ye, u as t, n as ve, A as fe, g as r, h as l, t as d, k as u, F as _, j as O, C as x, i as p, p as G, s as ee, B as ye, l as He, b as k, y as U } from "./vendor-vue-FFI3kJnP.js";
import { z as e, d as c, c as he } from "./view-styles-QftMsWZ4.js";
import { s as Ne } from "./bili-favorites-store-jeneup0l.js";
import { a as ge, d as qe } from "./playback-sync-CRpCy6sd.js";
import { bilibiliChannelService as R } from "./bilibili-channel.service-B_adB7m5.js";
import { T as Ve } from "./search.service-CBAC1LxQ.js";
import { B as te } from "./BiliRichText-Dqn04MQW.js";
import { i as ke } from "./images-BHmpzfmu.js";
import { u as Ae } from "./use-video-failover-DyCcddna.js";
import { t as b, _ as Ge } from "./_plugin-vue_export-helper-CVWGtx1v.js";
const je = { class: "bili-mini-main-body" }, Je = {
  key: 0,
  class: "bili-mini-episodes-drawer"
}, Ke = { class: "bili-mini-episodes-meta" }, Qe = { class: "bili-mini-episodes-count" }, Ze = ["title"], et = { class: "bili-mini-episodes-body" }, tt = ["onClick"], it = { class: "bili-mini-ep-badge" }, nt = ["title"], lt = {
  key: 1,
  class: "bili-mini-desc-drawer"
}, st = { class: "bili-mini-desc-meta" }, ot = { style: { display: "flex", "align-items": "center", gap: "4px" } }, at = ["title"], rt = ["title"], dt = { class: "bili-mini-desc-body" }, ut = { class: "bili-mini-desc-up" }, ct = ["src"], pt = { class: "bili-mini-desc-up-info" }, mt = { class: "bili-mini-desc-up-top" }, bt = { class: "bili-mini-desc-up-sub" }, vt = {
  key: 0,
  class: "bili-mini-desc-fans"
}, ft = {
  key: 1,
  class: "bili-mini-desc-fans loading"
}, yt = {
  key: 2,
  class: "bili-mini-desc-pubdate"
}, ht = {
  key: 1,
  class: "bili-mini-desc-follow-wrap"
}, gt = ["disabled", "title"], kt = { class: "bili-mini-desc-title" }, wt = { class: "bili-mini-desc-text" }, _t = { class: "bili-mini-player-pane" }, xt = ["title"], Ct = {
  key: 0,
  class: "bili-mini-episodes-wrap"
}, Mt = ["title", "disabled"], Pt = ["title"], St = ["title", "disabled"], $t = { class: "bili-mini-speed-wrap" }, Et = {
  key: 0,
  class: "bili-mini-speed-menu"
}, Lt = ["onClick"], Rt = { class: "bili-mini-screen" }, Ot = ["src"], Tt = ["src", "poster"], Ft = ["title"], It = { class: "bili-dm-btn-icon" }, zt = { class: "bili-dm-btn-state" }, Dt = {
  key: 4,
  class: "bili-mini-status"
}, Wt = {
  key: 5,
  class: "bili-mini-status error",
  style: { display: "flex", "flex-direction": "column", "align-items": "center", "justify-content": "center", gap: "8px", padding: "12px", "text-align": "center" }
}, Ut = {
  key: 2,
  class: "bili-mini-comments-drawer"
}, Bt = { class: "bili-mini-comments-meta" }, Xt = { class: "bili-mini-comments-count" }, Yt = { class: "bili-mini-comments-right" }, Ht = { class: "bili-mini-comments-sort" }, Nt = { class: "bili-mini-comments-body" }, qt = ["src", "onClick"], Vt = { class: "bili-comment-main" }, At = { class: "bili-comment-user-row" }, Gt = ["onClick"], jt = {
  key: 0,
  class: "bili-comment-up-badge",
  title: "视频作者"
}, Jt = { class: "bili-comment-time" }, Kt = { class: "bili-comment-text" }, Qt = {
  key: 0,
  class: "bili-mini-comment-pictures"
}, Zt = ["aria-label", "onClick"], ei = ["src"], ti = { class: "bili-comment-actions" }, ii = { key: 0 }, ni = {
  key: 1,
  class: "bili-comment-sub-list"
}, li = { class: "bili-comment-sub-uname" }, si = {
  key: 0,
  class: "bili-mini-comment-pictures"
}, oi = ["aria-label", "onClick"], ai = ["src"], ri = { class: "bili-comment-sub-more" }, di = ["disabled", "onClick"], ui = ["disabled", "onClick"], ci = ["onClick"], pi = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "20px 0" }
}, mi = {
  key: 2,
  class: "muted small",
  style: { "text-align": "center", padding: "20px 0" }
}, bi = {
  key: 0,
  class: "bili-mini-comments-foot"
}, vi = ["disabled"], fi = /* @__PURE__ */ We({
  __name: "BiliMiniPlayer",
  setup(yi) {
    const y = k(null);
    Ae(e, y, () => {
      e.errorMsg = b("bili.player.loadError"), e.isPlaying = !1;
    });
    const v = k(null), m = k(null), j = k(!1), P = k(!1), L = k(!1), w = k(!1);
    async function we(s) {
      const n = String(s || "");
      if (!n) {
        w.value = !1;
        return;
      }
      (R.upGroupsState.followingsCache || []).some((o) => String(o.mid) === n) && (w.value = !0);
      try {
        const o = await he.api(
          `https://api.bilibili.com/x/relation?fid=${n}`
        );
        o && typeof o.attribute == "number" && (w.value = o.attribute === 2 || o.attribute === 6 || o.attribute === 1);
      } catch {
      }
    }
    async function _e(s) {
      const n = String(s || "");
      if (!n) {
        m.value = null;
        return;
      }
      j.value = !0;
      try {
        const i = await he.api(
          `https://api.bilibili.com/x/relation/stat?vmid=${n}`
        );
        i && typeof i.follower == "number" ? m.value = i.follower : m.value = null;
      } catch {
        m.value = null;
      } finally {
        j.value = !1;
      }
    }
    A(
      () => [e.descOpen, e.authorMid],
      ([s, n]) => {
        P.value = !1, s && n ? (_e(n), we(n)) : s || (m.value = null);
      },
      { immediate: !0 }
    );
    async function xe() {
      const s = String(e.authorMid || "");
      if (!(!s || L.value))
        if (w.value) {
          if (!P.value) {
            P.value = !0;
            return;
          }
          P.value = !1, w.value = !1, m.value != null && m.value > 0 && (m.value -= 1), L.value = !0;
          try {
            if ((await R.unfollowBiliUp(s)).ok) {
              const i = R.upGroupsState.followingsCache || [];
              R.upGroupsState.followingsCache = i.filter(
                (o) => String(o.mid) !== s
              );
            } else
              w.value = !0, m.value != null && (m.value += 1);
          } catch {
            w.value = !0, m.value != null && (m.value += 1);
          } finally {
            L.value = !1;
          }
        } else {
          w.value = !0, P.value = !1, m.value != null && (m.value += 1), L.value = !0;
          try {
            if ((await R.followBiliUp(s)).ok) {
              const i = R.upGroupsState.followingsCache || [];
              i.some((o) => String(o.mid) === s) || (i.unshift({
                mid: s,
                name: e.author || "UP主",
                face: e.authorFace || "",
                sign: ""
              }), R.upGroupsState.followingsCache = [...i]);
            } else
              w.value = !1, m.value != null && m.value > 0 && (m.value -= 1);
          } catch {
            w.value = !1, m.value != null && m.value > 0 && (m.value -= 1);
          } finally {
            L.value = !1;
          }
        }
    }
    function B(s, n) {
      !n.mid && !n.name || R.showUpRecentVideosPreview(
        {
          preventDefault: () => s.preventDefault(),
          stopPropagation: () => s.stopPropagation(),
          clientX: s.clientX,
          clientY: s.clientY
        },
        {
          mid: n.mid || "",
          name: n.name || "UP主",
          face: n.face || "",
          sign: n.sign || ""
        }
      );
    }
    function Ce() {
      e.bvid && Ne.open({
        bvid: e.bvid,
        cid: e.cid,
        title: e.title
      });
    }
    const J = k(!1), ie = k(0), ne = k(0), le = k(0), se = k(0), K = k(!1);
    let oe = 0, ae = 0, X = 0, Q = 0, Z = 0;
    const re = U(() => e.episodesOpen || e.descOpen || e.commentsOpen), T = k([]);
    let z = 0, Y = 0;
    const de = [0, 0, 0, 0, 0, 0, 0, 0];
    function Me(s, n) {
      let i = 0, o = s.length - 1;
      for (; i <= o; ) {
        const f = Math.floor((i + o) / 2);
        s[f].time < n ? i = f + 1 : o = f - 1;
      }
      return i;
    }
    function Pe() {
      if (!e.danmakuEnabled || !e.danmakuList?.length || !y.value) return;
      const s = y.value.currentTime;
      if (Math.abs(s - Y) > 1.5) {
        T.value = [], z = Me(e.danmakuList, s), Y = s;
        return;
      }
      const n = performance.now(), o = v.value?.querySelector(".bili-mini-screen")?.clientHeight || 240, f = Math.max(3, Math.min(8, Math.floor((o - 45) / 26)));
      for (; z < e.danmakuList.length; ) {
        const h = e.danmakuList[z];
        if (h.time > s) break;
        if (s - h.time <= 1.2) {
          let C = 0, S = 1 / 0;
          for (let g = 0; g < f; g++) {
            const M = de[g] || 0;
            if (M <= n) {
              C = g;
              break;
            }
            M < S && (S = M, C = g);
          }
          const $ = h.text.length;
          de[C] = n + Math.max(1e3, $ * 110);
          const E = {
            id: `${h.id}_${n}_${Math.random()}`,
            text: h.text,
            color: h.color,
            top: C * 26 + 8,
            duration: 5.5,
            mode: h.mode
          };
          T.value.push(E), setTimeout(() => {
            const g = T.value.findIndex((M) => M.id === E.id);
            g !== -1 && T.value.splice(g, 1);
          }, E.duration * 1e3);
        }
        z++;
      }
      Y = s;
    }
    A(
      () => [e.videoSrc, e.cid],
      () => {
        T.value = [], z = 0, Y = 0;
      }
    );
    const H = U(() => {
      if (e.collapsed) return 0;
      const s = typeof window < "u" && window.innerWidth <= 900;
      let n = 0;
      return e.episodesOpen && (n += s ? 200 : 240), e.descOpen && (n += s ? 220 : 280), n;
    }), N = U(() => {
      if (e.collapsed) return 250;
      const s = typeof window < "u" && window.innerWidth <= 900;
      let n = e.baseWidth || (s ? 340 : 380);
      return e.episodesOpen && (n += s ? 200 : 240), e.descOpen && (n += s ? 220 : 280), e.commentsOpen && (n += s ? 260 : 330), n;
    }), q = U(() => e.collapsed ? 34 : Math.max(re.value ? 380 : 254, e.height)), Se = U(() => {
      if (e.collapsed && typeof document < "u") {
        const n = document.querySelector(".fo-mini-dock-anchor");
        if (n && n.getBoundingClientRect) {
          const i = n.getBoundingClientRect();
          if (i.width > 0 && i.height > 0 && i.top > 0)
            return {
              left: `${i.left}px`,
              top: `${i.top}px`,
              width: `${N.value}px`,
              height: `${q.value}px`,
              zIndex: e.zIndex
            };
        }
      }
      return {
        left: `${Math.max(8, e.x - H.value)}px`,
        top: `${e.y}px`,
        width: `${N.value}px`,
        height: `${q.value}px`,
        zIndex: e.zIndex
      };
    });
    A(
      () => e.playbackRate,
      (s) => {
        y.value && (y.value.playbackRate = s);
      }
    ), A(
      () => [e.videoSrc, e.bvid],
      async ([s, n]) => {
        if (s && n) {
          if (await Ue(), !y.value || e.videoSrc !== s || e.bvid !== n) return;
          y.value.playbackRate = e.playbackRate, y.value.play().catch(() => {
          }), ge({ bvid: e.bvid, title: e.title, cover: e.cover }, y.value);
        }
      }
    );
    let F = 0, ue = 0, ce = 0, I = 0, pe = 0, me = 0, D = null, W = null;
    function V(s) {
      if (s.target?.closest(
        "button, a, input, textarea, select, .bili-mini-quality-menu, .bili-mini-speed-menu, .bili-mini-tab-btn, .no-drag"
      ) || !v.value) return;
      D?.(), W?.(), J.value = !0, ie.value = s.clientX, ne.value = s.clientY, le.value = e.x, se.value = e.y, c.bringToFront(), v.value.style.willChange = "left, top", v.value.classList.add("is-dragging");
      const i = s.currentTarget;
      try {
        i?.setPointerCapture(s.pointerId);
      } catch {
      }
      const o = H.value + 8, f = Math.max(o, window.innerWidth - (N.value - H.value) - 8), h = Math.max(0, window.innerHeight - q.value - 8);
      let C = e.x, S = e.y;
      const $ = () => {
        F = 0, e.x = C, e.y = S, v.value && (v.value.style.left = `${ue}px`, v.value.style.top = `${ce}px`);
      }, E = (M) => {
        if (!J.value) return;
        const ze = M.clientX - ie.value, De = M.clientY - ne.value;
        C = Math.min(f, Math.max(o, le.value + ze)), S = Math.min(h, Math.max(8, se.value + De)), ue = Math.max(8, C - H.value), ce = S, F || (F = requestAnimationFrame($));
      }, g = () => {
        if (D = null, window.removeEventListener("pointermove", E), window.removeEventListener("pointerup", g), window.removeEventListener("pointercancel", g), F && (cancelAnimationFrame(F), F = 0), i)
          try {
            i.releasePointerCapture(s.pointerId);
          } catch {
          }
        v.value && (v.value.style.willChange = "auto", v.value.classList.remove("is-dragging")), J.value = !1, e.x = C, e.y = S;
      };
      D = g, window.addEventListener("pointermove", E, { passive: !0 }), window.addEventListener("pointerup", g, { once: !0 }), window.addEventListener("pointercancel", g, { once: !0 });
    }
    function $e(s) {
      if (!v.value) return;
      D?.(), W?.(), s.preventDefault(), s.stopPropagation(), K.value = !0, oe = s.clientX, ae = s.clientY, X = N.value, Q = q.value, Z = X - (e.baseWidth || (window.innerWidth <= 900 ? 340 : 380)), c.bringToFront(), v.value.style.willChange = "width, height", v.value.classList.add("is-dragging");
      const n = s.currentTarget;
      try {
        n?.setPointerCapture(s.pointerId);
      } catch {
      }
      const i = Math.max(X, window.innerWidth - e.x - 10), o = Math.max(Q, window.innerHeight - e.y - 10);
      let f = e.baseWidth || 380, h = e.height || 254;
      const C = () => {
        I = 0, e.baseWidth = f, e.height = h, v.value && (v.value.style.width = `${pe}px`, v.value.style.height = `${me}px`);
      }, S = (E) => {
        if (!K.value) return;
        const g = Math.min(
          i,
          Math.max(Z + 280, X + E.clientX - oe)
        );
        pe = g, f = Math.round(g - Z);
        const M = Math.round(
          Math.min(o, Math.max(254, Q + E.clientY - ae))
        );
        me = M, h = M, I || (I = requestAnimationFrame(C));
      }, $ = () => {
        if (W = null, window.removeEventListener("pointermove", S), window.removeEventListener("pointerup", $), window.removeEventListener("pointercancel", $), I && (cancelAnimationFrame(I), I = 0), n)
          try {
            n.releasePointerCapture(s.pointerId);
          } catch {
          }
        v.value && (v.value.style.willChange = "auto", v.value.classList.remove("is-dragging")), K.value = !1, e.baseWidth = f, e.height = h;
      };
      W = $, window.addEventListener("pointermove", S, { passive: !0 }), window.addEventListener("pointerup", $, { once: !0 }), window.addEventListener("pointercancel", $, { once: !0 });
    }
    function Ee() {
      y.value && (e.currentTime = y.value.currentTime, e.duration = y.value.duration || 0, Pe());
    }
    function Le() {
      e.isPlaying = !0, y.value && e.bvid && ge({ bvid: e.bvid, title: e.title, cover: e.cover }, y.value);
    }
    function Re() {
      e.isPlaying = !1;
    }
    function Oe() {
      e.currentPageIndex < e.pages.length - 1 && c.switchEpisode(e.currentPageIndex + 1);
    }
    function Te() {
      e.currentPageIndex > 0 && c.switchEpisode(e.currentPageIndex - 1);
    }
    function Fe() {
      e.currentPageIndex < e.pages.length - 1 && c.switchEpisode(e.currentPageIndex + 1);
    }
    function Ie() {
      e.speedMenuOpen = !e.speedMenuOpen, e.speedMenuOpen && (e.qualityMenuOpen = !1);
    }
    function be(s) {
      const n = s.target;
      n?.closest(".bili-mini-quality-wrap") || (e.qualityMenuOpen = !1), n?.closest(".bili-mini-speed-wrap") || (e.speedMenuOpen = !1);
    }
    return Be(() => {
      window.addEventListener("click", be);
    }), Xe(() => {
      y.value && qe(y.value), window.removeEventListener("click", be), D?.(), W?.();
    }), (s, n) => (a(), Ye(He, { to: "body" }, [
      t(e).isOpen ? ve((a(), r("section", {
        key: 0,
        ref_key: "playerRef",
        ref: v,
        class: x(["bili-mini-player", {
          collapsed: t(e).collapsed,
          "subscription-comments-view": re.value,
          "episodes-expanded": t(e).episodesOpen,
          "desc-expanded": t(e).descOpen,
          "comments-expanded": t(e).commentsOpen
        }]),
        style: ye(Se.value),
        onMousedown: n[18] || (n[18] = //@ts-ignore
        (...i) => t(c).bringToFront && t(c).bringToFront(...i))
      }, [
        l("div", je, [
          t(e).episodesOpen ? (a(), r("div", Je, [
            l("div", {
              class: "bili-mini-episodes-head",
              onPointerdown: V
            }, [
              l("div", Ke, [
                l("span", null, d(t(b)("bili.player.episodes")), 1),
                l("span", Qe, "(" + d(t(e).pages.length) + "P)", 1)
              ]),
              l("button", {
                type: "button",
                class: "bili-mini-tab-btn",
                title: t(b)("bili.player.collapseEpisodes"),
                onClick: n[0] || (n[0] = u((i) => t(c).toggleEpisodes(!1), ["stop"]))
              }, " ✕ ", 8, Ze)
            ], 32),
            l("div", et, [
              (a(!0), r(_, null, O(t(e).pages, (i, o) => (a(), r("button", {
                key: i.cid,
                type: "button",
                class: x(["bili-mini-ep-item", { active: o === t(e).currentPageIndex }]),
                onClick: u((f) => t(c).switchEpisode(o), ["stop"])
              }, [
                l("span", it, "P" + d(i.page || o + 1), 1),
                l("span", {
                  class: "bili-mini-ep-part",
                  title: i.part
                }, d(i.part || t(b)("bili.player.episodeNum", { num: o + 1 })), 9, nt)
              ], 10, tt))), 128))
            ])
          ])) : p("", !0),
          t(e).descOpen ? (a(), r("div", lt, [
            l("div", {
              class: "bili-mini-desc-head",
              onPointerdown: V
            }, [
              l("div", st, [
                l("span", null, d(t(b)("bili.player.desc")), 1)
              ]),
              l("div", ot, [
                l("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: t(b)("bili.player.copyDescTitle"),
                  onClick: n[1] || (n[1] = u((i) => t(c).copyDescription(), ["stop"]))
                }, d(t(b)("bili.player.copyDesc")), 9, at),
                l("button", {
                  type: "button",
                  class: "bili-mini-tab-btn",
                  title: t(b)("bili.player.collapseDesc"),
                  onClick: n[2] || (n[2] = u((i) => t(c).toggleDesc(!1), ["stop"]))
                }, " ✕ ", 8, rt)
              ])
            ], 32),
            l("div", dt, [
              l("div", ut, [
                t(e).authorFace ? (a(), r("img", {
                  key: 0,
                  src: t(e).authorFace,
                  class: "bili-mini-desc-avatar clickable",
                  alt: "",
                  loading: "lazy",
                  title: "点击查看 UP 主详情与近期投稿",
                  onClick: n[3] || (n[3] = u((i) => B(i, { mid: t(e).authorMid, name: t(e).author, face: t(e).authorFace }), ["stop"]))
                }, null, 8, ct)) : p("", !0),
                l("div", pt, [
                  l("div", mt, [
                    l("span", {
                      class: "bili-mini-desc-up-name clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: n[4] || (n[4] = u((i) => B(i, { mid: t(e).authorMid, name: t(e).author, face: t(e).authorFace }), ["stop"]))
                    }, d(t(e).author || t(b)("bili.upDefault")), 1)
                  ]),
                  l("div", bt, [
                    m.value != null ? (a(), r("span", vt, d(t(b)("bili.player.fansCount", { count: t(Ve)(m.value) })), 1)) : j.value ? (a(), r("span", ft, d(t(b)("bili.player.fansLoading")), 1)) : p("", !0),
                    t(e).pubdate ? (a(), r("span", yt, d(t(e).pubdate), 1)) : p("", !0)
                  ])
                ]),
                t(e).authorMid ? (a(), r("div", ht, [
                  l("button", {
                    type: "button",
                    class: x(["bili-mini-desc-follow-btn", {
                      followed: w.value && !P.value,
                      confirming: P.value,
                      busy: L.value
                    }]),
                    disabled: L.value,
                    title: w.value ? P.value ? t(b)("bili.player.unfollowConfirmTitle") : t(b)("bili.player.unfollowTitle") : t(b)("bili.player.followTitle"),
                    onClick: u(xe, ["stop"]),
                    onMouseleave: n[5] || (n[5] = (i) => P.value = !1)
                  }, [
                    L.value ? (a(), r(_, { key: 0 }, [
                      G("...")
                    ], 64)) : w.value ? P.value ? (a(), r(_, { key: 2 }, [
                      G(d(t(b)("bili.player.unfollowConfirm")), 1)
                    ], 64)) : (a(), r(_, { key: 3 }, [
                      G(d(t(b)("bili.player.followed")), 1)
                    ], 64)) : (a(), r(_, { key: 1 }, [
                      G(d(t(b)("bili.player.follow")), 1)
                    ], 64))
                  ], 42, gt)
                ])) : p("", !0)
              ]),
              l("div", kt, d(t(e).title), 1),
              n[19] || (n[19] = l("div", { class: "bili-mini-desc-divider" }, null, -1)),
              l("div", wt, [
                ee(te, {
                  text: t(e).description || t(b)("bili.player.noDesc")
                }, null, 8, ["text"])
              ])
            ])
          ])) : p("", !0),
          l("div", _t, [
            l("header", {
              class: "bili-mini-head",
              onPointerdown: V
            }, [
              l("span", {
                class: "bili-mini-title",
                title: t(e).title
              }, d(t(e).title || "正在加载…"), 9, xt),
              t(e).pages.length > 1 ? (a(), r("div", Ct, [
                l("button", {
                  class: "bili-mini-ep-btn prev",
                  type: "button",
                  title: t(b)("bili.player.prevEp"),
                  disabled: t(e).currentPageIndex <= 0,
                  onClick: u(Te, ["stop"])
                }, "‹", 8, Mt),
                l("button", {
                  class: x(["bili-mini-ep-label", { active: t(e).episodesOpen }]),
                  type: "button",
                  title: t(b)("bili.player.toggleEpisodes"),
                  onClick: n[6] || (n[6] = u((i) => t(c).toggleEpisodes(), ["stop"]))
                }, " P" + d(t(e).currentPageIndex + 1), 11, Pt),
                l("button", {
                  class: "bili-mini-ep-btn next",
                  type: "button",
                  title: t(b)("bili.player.nextEp"),
                  disabled: t(e).currentPageIndex >= t(e).pages.length - 1,
                  onClick: u(Fe, ["stop"])
                }, "›", 8, St)
              ])) : p("", !0),
              l("button", {
                class: "bili-mini-speed-btn bili-mini-sub-btn",
                type: "button",
                title: "提取当前视频全部字幕 TXT",
                onClick: u(Ce, ["stop"])
              }, " 字幕 "),
              l("div", $t, [
                l("button", {
                  class: x(["bili-mini-speed-btn", { active: t(e).speedMenuOpen }]),
                  type: "button",
                  title: "点击切换播放倍速",
                  onClick: u(Ie, ["stop"])
                }, d(t(e).playbackRate) + "x ", 3),
                t(e).speedMenuOpen ? (a(), r("div", Et, [
                  (a(), r(_, null, O([0.5, 0.75, 1, 1.25, 1.5, 2], (i) => l("button", {
                    key: i,
                    type: "button",
                    class: x(["bili-mini-speed-item", { active: i === t(e).playbackRate }]),
                    onClick: u((o) => t(c).setPlaybackRate(i), ["stop"])
                  }, [
                    l("span", null, d(i) + "x", 1)
                  ], 10, Lt)), 64))
                ])) : p("", !0)
              ]),
              l("button", {
                class: x(["bili-mini-desc-toggle", { active: t(e).descOpen }]),
                type: "button",
                title: "展开/收起视频简介",
                onClick: n[7] || (n[7] = u((i) => t(c).toggleDesc(), ["stop"]))
              }, " 📋 简介 ", 2),
              l("button", {
                class: x(["bili-mini-comments-toggle", { active: t(e).commentsOpen }]),
                type: "button",
                title: "展开/收起评论区",
                onClick: n[8] || (n[8] = u((i) => t(c).toggleComments(), ["stop"]))
              }, " 💬 评论 ", 2),
              l("button", {
                class: "bili-mini-collapse",
                type: "button",
                title: "收起",
                onClick: n[9] || (n[9] = u((i) => t(c).toggleCollapse(), ["stop"]))
              }, " — "),
              l("button", {
                class: "bili-mini-close",
                type: "button",
                title: "关闭并释放播放器",
                onClick: n[10] || (n[10] = u((i) => t(c).close(), ["stop"]))
              }, " ✕ ")
            ], 32),
            l("div", Rt, [
              t(e).useIframe && t(e).iframeSrc ? (a(), r("iframe", {
                key: 0,
                src: t(e).iframeSrc,
                class: "bili-mini-iframe",
                frameborder: "0",
                allow: "autoplay; fullscreen",
                allowfullscreen: "",
                referrerpolicy: "no-referrer",
                style: { width: "100%", height: "100%", border: "0", display: "block" }
              }, null, 8, Ot)) : t(e).videoSrc ? (a(), r("video", {
                key: 1,
                ref_key: "videoRef",
                ref: y,
                src: t(e).videoSrc,
                poster: t(e).cover || void 0,
                controls: "",
                autoplay: "",
                playsinline: "",
                preload: "metadata",
                referrerpolicy: "no-referrer",
                style: { width: "100%", height: "100%", "object-fit": "contain", background: "#000", display: "block" },
                onTimeupdate: Ee,
                onPlay: Le,
                onPause: Re,
                onEnded: Oe
              }, null, 40, Tt)) : p("", !0),
              t(e).videoSrc ? ve((a(), r("div", {
                key: 2,
                class: x(["bili-danmaku-stage", { "is-paused": !t(e).isPlaying }])
              }, [
                (a(!0), r(_, null, O(T.value, (i) => (a(), r("div", {
                  key: i.id,
                  class: x(["bili-danmaku-bullet", { "is-top": i.mode === 5, "is-bottom": i.mode === 4 }]),
                  style: ye({
                    top: `${i.top}px`,
                    color: i.color,
                    animationDuration: `${i.duration}s`
                  })
                }, d(i.text), 7))), 128))
              ], 2)), [
                [fe, t(e).danmakuEnabled]
              ]) : p("", !0),
              t(e).videoSrc ? (a(), r("div", {
                key: 3,
                class: "bili-danmaku-bar-bottom",
                onClick: n[12] || (n[12] = u(() => {
                }, ["stop"]))
              }, [
                l("button", {
                  type: "button",
                  class: x(["bili-danmaku-toggle-btn", { active: t(e).danmakuEnabled }]),
                  title: t(e).danmakuEnabled ? "点击关闭弹幕" : "点击开启弹幕",
                  onClick: n[11] || (n[11] = u((i) => t(c).toggleDanmakuEnabled(), ["stop"]))
                }, [
                  l("span", It, d(t(e).danmakuEnabled ? "💬" : "🔲"), 1),
                  n[20] || (n[20] = l("span", { class: "bili-dm-btn-label" }, "弹幕", -1)),
                  l("span", zt, d(t(e).danmakuEnabled ? "开" : "关"), 1)
                ], 10, Ft)
              ])) : p("", !0),
              t(e).isLoading ? (a(), r("div", Dt, [...n[21] || (n[21] = [
                l("span", null, "正在取得原生视频流…", -1)
              ])])) : t(e).errorMsg ? (a(), r("div", Wt, [
                l("span", null, d(t(e).errorMsg), 1),
                l("button", {
                  type: "button",
                  style: { padding: "5px 14px", background: "#00aeec", color: "#fff", border: "0", "border-radius": "5px", cursor: "pointer", "font-size": "12px", "font-weight": "600" },
                  onClick: n[13] || (n[13] = u((i) => t(c).retryCurrentVideo(), ["stop"]))
                }, "重新获取视频流")
              ])) : p("", !0)
            ])
          ]),
          t(e).commentsOpen ? (a(), r("div", Ut, [
            l("div", {
              class: "bili-mini-comments-head",
              onPointerdown: V
            }, [
              l("div", Bt, [
                n[22] || (n[22] = l("span", null, "💬 视频评论", -1)),
                l("span", Xt, "(" + d(t(e).totalComments || 0) + ")", 1)
              ]),
              l("div", Yt, [
                l("div", Ht, [
                  l("button", {
                    type: "button",
                    class: x(["bili-mini-sort-btn", { active: t(e).commentsSort === 2 }]),
                    onClick: n[14] || (n[14] = u((i) => t(c).setCommentsSort(2), ["stop"]))
                  }, " 按热度 ", 2),
                  l("button", {
                    type: "button",
                    class: x(["bili-mini-sort-btn", { active: t(e).commentsSort === 0 }]),
                    onClick: n[15] || (n[15] = u((i) => t(c).setCommentsSort(0), ["stop"]))
                  }, " 按时间 ", 2)
                ]),
                l("button", {
                  type: "button",
                  class: "bili-mini-tab-btn",
                  title: "收起评论",
                  onClick: n[16] || (n[16] = u((i) => t(c).toggleComments(!1), ["stop"]))
                }, " ✕ ")
              ])
            ], 32),
            l("div", Nt, [
              t(e).comments.length ? (a(!0), r(_, { key: 0 }, O(t(e).comments, (i) => (a(), r("div", {
                key: i.id,
                class: "bili-comment-item"
              }, [
                l("img", {
                  src: i.avatar || "assets/default-avatar.svg",
                  class: "bili-comment-avatar clickable",
                  alt: "",
                  loading: "lazy",
                  title: "点击查看 UP 主/作者详情与近期投稿",
                  onClick: u((o) => B(o, { mid: i.mid, name: i.uname, face: i.avatar }), ["stop"])
                }, null, 8, qt),
                l("div", Vt, [
                  l("div", At, [
                    l("span", {
                      class: "bili-comment-uname clickable",
                      title: "点击查看 UP 主/作者详情与近期投稿",
                      onClick: u((o) => B(o, { mid: i.mid, name: i.uname, face: i.avatar }), ["stop"])
                    }, d(i.uname), 9, Gt),
                    i.isUp || i.uname === t(e).author || t(e).authorMid && String(i.mid) === String(t(e).authorMid) ? (a(), r("span", jt, "UP主")) : p("", !0),
                    l("span", Jt, d(i.timeStr), 1)
                  ]),
                  l("div", Kt, [
                    ee(te, {
                      text: i.message,
                      emotes: i.emotes
                    }, null, 8, ["text", "emotes"])
                  ]),
                  i.pictures.length ? (a(), r("div", Qt, [
                    (a(!0), r(_, null, O(i.pictures, (o, f) => (a(), r("button", {
                      key: `${o}-${f}`,
                      type: "button",
                      class: "bili-mini-comment-picture",
                      "aria-label": `查看 ${i.uname} 的评论图片 ${f + 1}`,
                      onClick: u((h) => t(ke).open({ source: o, title: `${i.uname} 的评论图片` }), ["stop"])
                    }, [
                      l("img", {
                        src: o,
                        alt: "评论图片",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, ei)
                    ], 8, Zt))), 128))
                  ])) : p("", !0),
                  l("div", ti, [
                    l("span", null, "👍 " + d(i.likeCount), 1),
                    i.replyCount ? (a(), r("span", ii, "💬 " + d(i.replyCount), 1)) : p("", !0)
                  ]),
                  i.replies?.length ? (a(), r("div", ni, [
                    (a(!0), r(_, null, O(i.replies, (o) => (a(), r("div", {
                      key: o.id,
                      class: "bili-comment-sub-item"
                    }, [
                      l("strong", li, d(o.userName) + ":", 1),
                      ee(te, {
                        text: o.message,
                        emotes: o.emotes
                      }, null, 8, ["text", "emotes"]),
                      o.pictures.length ? (a(), r("div", si, [
                        (a(!0), r(_, null, O(o.pictures, (f, h) => (a(), r("button", {
                          key: `${f}-${h}`,
                          type: "button",
                          class: "bili-mini-comment-picture",
                          "aria-label": `查看 ${o.userName} 的回复图片 ${h + 1}`,
                          onClick: u((C) => t(ke).open({ source: f, title: `${o.userName} 的回复图片` }), ["stop"])
                        }, [
                          l("img", {
                            src: f,
                            alt: "回复图片",
                            loading: "lazy",
                            referrerpolicy: "no-referrer"
                          }, null, 8, ai)
                        ], 8, oi))), 128))
                      ])) : p("", !0)
                    ]))), 128)),
                    l("div", ri, [
                      !i.subRepliesExpanded && (i.replyCount || 0) > i.replies.length ? (a(), r(_, { key: 0 }, [
                        l("span", null, "共 " + d(i.replyCount) + " 条回复，", 1),
                        l("button", {
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: i.subRepliesLoading,
                          onClick: u((o) => t(c).expandSubReplies(i.id), ["stop"])
                        }, d(i.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, di)
                      ], 64)) : i.subRepliesExpanded ? (a(), r(_, { key: 1 }, [
                        i.subRepliesHasMore ? (a(), r("button", {
                          key: 0,
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: i.subRepliesLoading,
                          onClick: u((o) => t(c).expandSubReplies(i.id), ["stop"])
                        }, d(i.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, ui)) : p("", !0),
                        l("button", {
                          type: "button",
                          class: "bili-comment-sub-collapse-btn",
                          onClick: u((o) => t(c).collapseSubReplies(i.id), ["stop"])
                        }, " 收起 ▴ ", 8, ci)
                      ], 64)) : p("", !0)
                    ])
                  ])) : p("", !0)
                ])
              ]))), 128)) : t(e).commentsLoading ? (a(), r("p", pi, " 正在加载评论… ")) : (a(), r("p", mi, " 暂无评论 "))
            ]),
            t(e).hasMoreComments ? (a(), r("div", bi, [
              l("button", {
                type: "button",
                class: "bili-mini-comments-more-btn",
                disabled: t(e).commentsLoading,
                onClick: n[17] || (n[17] = u((i) => t(c).loadMoreComments(), ["stop"]))
              }, d(t(e).commentsLoading ? "加载中…" : "加载更多评论"), 9, vi)
            ])) : p("", !0)
          ])) : p("", !0)
        ]),
        t(e).collapsed ? p("", !0) : (a(), r("div", {
          key: 0,
          class: "bili-mini-resize-handle",
          role: "separator",
          "aria-label": "调整播放器大小",
          onPointerdown: $e
        }, null, 32))
      ], 38)), [
        [fe, !t(e).collapsed]
      ]) : p("", !0)
    ]));
  }
}), $i = /* @__PURE__ */ Ge(fi, [["__scopeId", "data-v-7023730e"]]);
export {
  $i as default
};
