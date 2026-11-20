import { d as Xe, w as A, y as Ne, o as Ye, e as He, f as a, l as qe, u as t, p as ve, A as fe, g as r, h as l, t as d, k as u, F as x, i as R, s as w, j as p, m as G, C as ee, n as ye, T as Ve, b as k, x as z } from "./vendor-vue-BbmU9NUg.js";
import { k as e, a as c, b as he } from "./github.service-mYu1TuZI.js";
import { a as ge, s as Ae } from "./bili-favorites-store-CdbdVJvS.js";
import { a as we, d as Ge } from "./playback-sync-KtiiCiOs.js";
import { bilibiliChannelService as I } from "./bilibili-channel.service-B4hNPH3G.js";
import { N as je } from "./search.service-DiFFcmm2.js";
import { B as te } from "./BiliRichText-DXO2d1BL.js";
import { i as ke } from "./images-Bmyp72NN.js";
import { u as Qe } from "./use-video-failover-B5k1aTkh.js";
import { t as m, _ as Je } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
const Ke = { class: "bili-mini-main-body" }, Ze = {
  key: 0,
  class: "bili-mini-episodes-drawer"
}, et = { class: "bili-mini-episodes-meta" }, tt = { class: "bili-mini-episodes-count" }, it = ["title"], nt = { class: "bili-mini-episodes-body" }, lt = ["onClick"], st = { class: "bili-mini-ep-badge" }, ot = ["title"], at = {
  key: 1,
  class: "bili-mini-desc-drawer"
}, rt = { class: "bili-mini-desc-meta" }, dt = { style: { display: "flex", "align-items": "center", gap: "4px" } }, ut = ["title"], ct = ["title"], pt = { class: "bili-mini-desc-body" }, mt = { class: "bili-mini-desc-up" }, bt = ["src"], vt = { class: "bili-mini-desc-up-info" }, ft = { class: "bili-mini-desc-up-top" }, yt = { class: "bili-mini-desc-up-sub" }, ht = {
  key: 0,
  class: "bili-mini-desc-fans"
}, gt = {
  key: 1,
  class: "bili-mini-desc-fans loading"
}, wt = {
  key: 2,
  class: "bili-mini-desc-pubdate"
}, kt = {
  key: 1,
  class: "bili-mini-desc-follow-wrap"
}, _t = ["disabled", "title"], xt = { class: "bili-mini-desc-title" }, Ct = { class: "bili-mini-desc-text" }, Pt = { class: "bili-mini-player-pane" }, Mt = ["title"], $t = {
  key: 0,
  class: "bili-mini-episodes-wrap"
}, St = ["title", "disabled"], Et = ["title"], Lt = ["title", "disabled"], It = ["title"], Rt = { class: "bili-mini-speed-wrap" }, Tt = {
  key: 0,
  class: "bili-mini-speed-menu"
}, Ot = ["onClick"], Ft = { class: "bili-mini-screen" }, zt = ["src"], Dt = ["src", "poster"], Ut = ["title"], Wt = { class: "bili-dm-btn-icon" }, Bt = { class: "bili-dm-btn-state" }, Xt = {
  key: 4,
  class: "bili-mini-status"
}, Nt = {
  key: 5,
  class: "bili-mini-status error",
  style: { display: "flex", "flex-direction": "column", "align-items": "center", "justify-content": "center", gap: "8px", padding: "12px", "text-align": "center" }
}, Yt = ["title"], Ht = {
  key: 2,
  class: "bili-mini-comments-drawer"
}, qt = { class: "bili-mini-comments-meta" }, Vt = { class: "bili-mini-comments-count" }, At = { class: "bili-mini-comments-right" }, Gt = { class: "bili-mini-comments-sort" }, jt = { class: "bili-mini-comments-body" }, Qt = ["src", "onClick"], Jt = { class: "bili-comment-main" }, Kt = { class: "bili-comment-user-row" }, Zt = ["onClick"], ei = {
  key: 0,
  class: "bili-comment-top-badge",
  title: "UP主置顶评论"
}, ti = {
  key: 1,
  class: "bili-comment-up-badge",
  title: "视频作者"
}, ii = { class: "bili-comment-time" }, ni = { class: "bili-comment-text" }, li = {
  key: 0,
  class: "bili-mini-comment-pictures"
}, si = ["aria-label", "onClick"], oi = ["src"], ai = { class: "bili-comment-actions" }, ri = { key: 0 }, di = {
  key: 1,
  class: "bili-comment-sub-list"
}, ui = { class: "bili-comment-sub-uname" }, ci = {
  key: 0,
  class: "bili-mini-comment-pictures"
}, pi = ["aria-label", "onClick"], mi = ["src"], bi = { class: "bili-comment-sub-more" }, vi = ["disabled", "onClick"], fi = ["disabled", "onClick"], yi = ["onClick"], hi = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "20px 0" }
}, gi = {
  key: 2,
  class: "muted small",
  style: { "text-align": "center", padding: "20px 0" }
}, wi = {
  key: 0,
  class: "bili-mini-comments-foot"
}, ki = ["disabled"], _i = /* @__PURE__ */ Xe({
  __name: "BiliMiniPlayer",
  setup(xi) {
    const y = k(null);
    Qe(e, y, () => {
      e.errorMsg = m("bili.player.loadError"), e.isPlaying = !1;
    });
    const v = k(null), b = k(null), j = k(!1), M = k(!1), L = k(!1), _ = k(!1);
    async function _e(s) {
      const n = String(s || "");
      if (!n) {
        _.value = !1;
        return;
      }
      (I.upGroupsState.followingsCache || []).some((o) => String(o.mid) === n) && (_.value = !0);
      try {
        const o = await he.api(
          `https://api.bilibili.com/x/relation?fid=${n}`
        );
        o && typeof o.attribute == "number" && (_.value = o.attribute === 2 || o.attribute === 6 || o.attribute === 1);
      } catch {
      }
    }
    async function xe(s) {
      const n = String(s || "");
      if (!n) {
        b.value = null;
        return;
      }
      j.value = !0;
      try {
        const i = await he.api(
          `https://api.bilibili.com/x/relation/stat?vmid=${n}`
        );
        i && typeof i.follower == "number" ? b.value = i.follower : b.value = null;
      } catch {
        b.value = null;
      } finally {
        j.value = !1;
      }
    }
    A(
      () => [e.descOpen, e.authorMid],
      ([s, n]) => {
        M.value = !1, s && n ? (xe(n), _e(n)) : s || (b.value = null);
      },
      { immediate: !0 }
    );
    async function Ce() {
      const s = String(e.authorMid || "");
      if (!(!s || L.value))
        if (_.value) {
          if (!M.value) {
            M.value = !0;
            return;
          }
          M.value = !1, _.value = !1, b.value != null && b.value > 0 && (b.value -= 1), L.value = !0;
          try {
            if ((await I.unfollowBiliUp(s)).ok) {
              const i = I.upGroupsState.followingsCache || [];
              I.upGroupsState.followingsCache = i.filter(
                (o) => String(o.mid) !== s
              );
            } else
              _.value = !0, b.value != null && (b.value += 1);
          } catch {
            _.value = !0, b.value != null && (b.value += 1);
          } finally {
            L.value = !1;
          }
        } else {
          _.value = !0, M.value = !1, b.value != null && (b.value += 1), L.value = !0;
          try {
            if ((await I.followBiliUp(s)).ok) {
              const i = I.upGroupsState.followingsCache || [];
              i.some((o) => String(o.mid) === s) || (i.unshift({
                mid: s,
                name: e.author || "UP主",
                face: e.authorFace || "",
                sign: ""
              }), I.upGroupsState.followingsCache = [...i]);
            } else
              _.value = !1, b.value != null && b.value > 0 && (b.value -= 1);
          } catch {
            _.value = !1, b.value != null && b.value > 0 && (b.value -= 1);
          } finally {
            L.value = !1;
          }
        }
    }
    function B(s, n) {
      !n.mid && !n.name || I.showUpRecentVideosPreview(
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
    const Pe = z(() => {
      const s = e.pages?.[e.currentPageIndex]?.page || (e.currentPageIndex > 0 ? e.currentPageIndex + 1 : void 0), n = s && s > 1 ? `?p=${s}` : "";
      return e.bvid ? `https://www.bilibili.com/video/${e.bvid}${n}` : e.aid ? `https://www.bilibili.com/video/av${e.aid}${n}` : "https://www.bilibili.com";
    });
    function Me() {
      const s = Pe.value;
      typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: s, active: !0 }) : window.open(s, "_blank", "noopener,noreferrer");
    }
    function $e() {
      e.bvid && Ae.open({
        bvid: e.bvid,
        cid: e.cid,
        title: e.title
      });
    }
    const Q = k(!1), ie = k(0), ne = k(0), le = k(0), se = k(0), J = k(!1);
    let oe = 0, ae = 0, X = 0, K = 0, Z = 0;
    const re = z(() => e.episodesOpen || e.descOpen || e.commentsOpen), T = k([]);
    let D = 0, N = 0;
    const de = [0, 0, 0, 0, 0, 0, 0, 0];
    function Se(s, n) {
      let i = 0, o = s.length - 1;
      for (; i <= o; ) {
        const f = Math.floor((i + o) / 2);
        s[f].time < n ? i = f + 1 : o = f - 1;
      }
      return i;
    }
    function Ee() {
      if (!e.danmakuEnabled || !e.danmakuList?.length || !y.value) return;
      const s = y.value.currentTime;
      if (Math.abs(s - N) > 1.5) {
        T.value = [], D = Se(e.danmakuList, s), N = s;
        return;
      }
      const n = performance.now(), o = v.value?.querySelector(".bili-mini-screen")?.clientHeight || 240, f = Math.max(3, Math.min(8, Math.floor((o - 45) / 26)));
      for (; D < e.danmakuList.length; ) {
        const h = e.danmakuList[D];
        if (h.time > s) break;
        if (s - h.time <= 1.2) {
          let C = 0, $ = 1 / 0;
          for (let g = 0; g < f; g++) {
            const P = de[g] || 0;
            if (P <= n) {
              C = g;
              break;
            }
            P < $ && ($ = P, C = g);
          }
          const S = h.text.length;
          de[C] = n + Math.max(1e3, S * 110);
          const E = {
            id: `${h.id}_${n}_${Math.random()}`,
            text: h.text,
            color: h.color,
            top: C * 26 + 8,
            duration: 5.5,
            mode: h.mode
          };
          T.value.push(E), setTimeout(() => {
            const g = T.value.findIndex((P) => P.id === E.id);
            g !== -1 && T.value.splice(g, 1);
          }, E.duration * 1e3);
        }
        D++;
      }
      N = s;
    }
    A(
      () => [e.videoSrc, e.cid],
      () => {
        T.value = [], D = 0, N = 0;
      }
    );
    const Y = z(() => {
      if (e.collapsed) return 0;
      const s = typeof window < "u" && window.innerWidth <= 900;
      let n = 0;
      return e.episodesOpen && (n += s ? 200 : 240), e.descOpen && (n += s ? 220 : 280), n;
    }), H = z(() => {
      if (e.collapsed) return 250;
      const s = typeof window < "u" && window.innerWidth <= 900;
      let n = e.baseWidth || (s ? 340 : 380);
      return e.episodesOpen && (n += s ? 200 : 240), e.descOpen && (n += s ? 220 : 280), e.commentsOpen && (n += s ? 260 : 330), n;
    }), q = z(() => e.collapsed ? 34 : Math.max(re.value ? 380 : 254, e.height)), Le = z(() => {
      if (e.collapsed && typeof document < "u") {
        const n = document.querySelector(".fo-mini-dock-anchor");
        if (n && n.getBoundingClientRect) {
          const i = n.getBoundingClientRect();
          if (i.width > 0 && i.height > 0 && i.top > 0)
            return {
              left: `${i.left}px`,
              top: `${i.top}px`,
              width: `${H.value}px`,
              height: `${q.value}px`,
              zIndex: e.zIndex
            };
        }
      }
      return {
        left: `${Math.max(8, e.x - Y.value)}px`,
        top: `${e.y}px`,
        width: `${H.value}px`,
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
          if (await Ne(), !y.value || e.videoSrc !== s || e.bvid !== n) return;
          y.value.playbackRate = e.playbackRate, y.value.play().catch(() => {
          }), we({ bvid: e.bvid, title: e.title, cover: e.cover }, y.value);
        }
      }
    );
    let O = 0, ue = 0, ce = 0, F = 0, pe = 0, me = 0, U = null, W = null;
    function V(s) {
      if (s.target?.closest(
        "button, a, input, textarea, select, .bili-mini-quality-menu, .bili-mini-speed-menu, .bili-mini-tab-btn, .no-drag"
      ) || !v.value) return;
      U?.(), W?.(), Q.value = !0, ie.value = s.clientX, ne.value = s.clientY, le.value = e.x, se.value = e.y, c.bringToFront(), v.value.style.willChange = "left, top", v.value.classList.add("is-dragging");
      const i = s.currentTarget;
      try {
        i?.setPointerCapture(s.pointerId);
      } catch {
      }
      const o = Y.value + 8, f = Math.max(o, window.innerWidth - (H.value - Y.value) - 8), h = Math.max(0, window.innerHeight - q.value - 8);
      let C = e.x, $ = e.y;
      const S = () => {
        O = 0, e.x = C, e.y = $, v.value && (v.value.style.left = `${ue}px`, v.value.style.top = `${ce}px`);
      }, E = (P) => {
        if (!Q.value) return;
        const We = P.clientX - ie.value, Be = P.clientY - ne.value;
        C = Math.min(f, Math.max(o, le.value + We)), $ = Math.min(h, Math.max(8, se.value + Be)), ue = Math.max(8, C - Y.value), ce = $, O || (O = requestAnimationFrame(S));
      }, g = () => {
        if (U = null, window.removeEventListener("pointermove", E), window.removeEventListener("pointerup", g), window.removeEventListener("pointercancel", g), O && (cancelAnimationFrame(O), O = 0), i)
          try {
            i.releasePointerCapture(s.pointerId);
          } catch {
          }
        v.value && (v.value.style.willChange = "auto", v.value.classList.remove("is-dragging")), Q.value = !1, e.x = C, e.y = $;
      };
      U = g, window.addEventListener("pointermove", E, { passive: !0 }), window.addEventListener("pointerup", g, { once: !0 }), window.addEventListener("pointercancel", g, { once: !0 });
    }
    function Ie(s) {
      if (!v.value) return;
      U?.(), W?.(), s.preventDefault(), s.stopPropagation(), J.value = !0, oe = s.clientX, ae = s.clientY, X = H.value, K = q.value, Z = X - (e.baseWidth || (window.innerWidth <= 900 ? 340 : 380)), c.bringToFront(), v.value.style.willChange = "width, height", v.value.classList.add("is-dragging");
      const n = s.currentTarget;
      try {
        n?.setPointerCapture(s.pointerId);
      } catch {
      }
      const i = Math.max(X, window.innerWidth - e.x - 10), o = Math.max(K, window.innerHeight - e.y - 10);
      let f = e.baseWidth || 380, h = e.height || 254;
      const C = () => {
        F = 0, e.baseWidth = f, e.height = h, v.value && (v.value.style.width = `${pe}px`, v.value.style.height = `${me}px`);
      }, $ = (E) => {
        if (!J.value) return;
        const g = Math.min(
          i,
          Math.max(Z + 280, X + E.clientX - oe)
        );
        pe = g, f = Math.round(g - Z);
        const P = Math.round(
          Math.min(o, Math.max(254, K + E.clientY - ae))
        );
        me = P, h = P, F || (F = requestAnimationFrame(C));
      }, S = () => {
        if (W = null, window.removeEventListener("pointermove", $), window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), F && (cancelAnimationFrame(F), F = 0), n)
          try {
            n.releasePointerCapture(s.pointerId);
          } catch {
          }
        v.value && (v.value.style.willChange = "auto", v.value.classList.remove("is-dragging")), J.value = !1, e.baseWidth = f, e.height = h;
      };
      W = S, window.addEventListener("pointermove", $, { passive: !0 }), window.addEventListener("pointerup", S, { once: !0 }), window.addEventListener("pointercancel", S, { once: !0 });
    }
    function Re() {
      y.value && (e.currentTime = y.value.currentTime, e.duration = y.value.duration || 0, Ee());
    }
    function Te() {
      c.play(), y.value && e.bvid && we({ bvid: e.bvid, title: e.title, cover: e.cover }, y.value);
    }
    function Oe() {
      c.pause();
    }
    function Fe() {
      e.currentPageIndex < e.pages.length - 1 && c.switchEpisode(e.currentPageIndex + 1);
    }
    function ze() {
      e.currentPageIndex > 0 && c.switchEpisode(e.currentPageIndex - 1);
    }
    function De() {
      e.currentPageIndex < e.pages.length - 1 && c.switchEpisode(e.currentPageIndex + 1);
    }
    function Ue() {
      e.speedMenuOpen = !e.speedMenuOpen, e.speedMenuOpen && (e.qualityMenuOpen = !1);
    }
    function be(s) {
      const n = s.target;
      n?.closest(".bili-mini-quality-wrap") || (e.qualityMenuOpen = !1), n?.closest(".bili-mini-speed-wrap") || (e.speedMenuOpen = !1);
    }
    return Ye(() => {
      window.addEventListener("click", be);
    }), He(() => {
      y.value && Ge(y.value), window.removeEventListener("click", be), U?.(), W?.();
    }), (s, n) => (a(), qe(Ve, { to: "body" }, [
      t(e).isOpen ? ve((a(), r("section", {
        key: 0,
        ref_key: "playerRef",
        ref: v,
        class: w(["bili-mini-player", {
          collapsed: t(e).collapsed,
          "subscription-comments-view": re.value,
          "episodes-expanded": t(e).episodesOpen,
          "desc-expanded": t(e).descOpen,
          "comments-expanded": t(e).commentsOpen
        }]),
        style: ye(Le.value),
        onMousedown: n[18] || (n[18] = //@ts-ignore
        (...i) => t(c).bringToFront && t(c).bringToFront(...i))
      }, [
        l("div", Ke, [
          t(e).episodesOpen ? (a(), r("div", Ze, [
            l("div", {
              class: "bili-mini-episodes-head",
              onPointerdown: V
            }, [
              l("div", et, [
                l("span", null, d(t(m)("bili.player.episodes")), 1),
                l("span", tt, "(" + d(t(e).pages.length) + "P)", 1)
              ]),
              l("button", {
                type: "button",
                class: "bili-mini-tab-btn",
                title: t(m)("bili.player.collapseEpisodes"),
                onClick: n[0] || (n[0] = u((i) => t(c).toggleEpisodes(!1), ["stop"]))
              }, " ✕ ", 8, it)
            ], 32),
            l("div", nt, [
              (a(!0), r(x, null, R(t(e).pages, (i, o) => (a(), r("button", {
                key: i.cid,
                type: "button",
                class: w(["bili-mini-ep-item", { active: o === t(e).currentPageIndex }]),
                onClick: u((f) => t(c).switchEpisode(o), ["stop"])
              }, [
                l("span", st, "P" + d(i.page || o + 1), 1),
                l("span", {
                  class: "bili-mini-ep-part",
                  title: i.part
                }, d(i.part || t(m)("bili.player.episodeNum", { num: o + 1 })), 9, ot)
              ], 10, lt))), 128))
            ])
          ])) : p("", !0),
          t(e).descOpen ? (a(), r("div", at, [
            l("div", {
              class: "bili-mini-desc-head",
              onPointerdown: V
            }, [
              l("div", rt, [
                l("span", null, d(t(m)("bili.player.desc")), 1)
              ]),
              l("div", dt, [
                l("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: t(m)("bili.player.copyDescTitle"),
                  onClick: n[1] || (n[1] = u((i) => t(c).copyDescription(), ["stop"]))
                }, d(t(m)("bili.player.copyDesc")), 9, ut),
                l("button", {
                  type: "button",
                  class: "bili-mini-tab-btn",
                  title: t(m)("bili.player.collapseDesc"),
                  onClick: n[2] || (n[2] = u((i) => t(c).toggleDesc(!1), ["stop"]))
                }, " ✕ ", 8, ct)
              ])
            ], 32),
            l("div", pt, [
              l("div", mt, [
                t(e).authorFace ? (a(), r("img", {
                  key: 0,
                  src: t(e).authorFace,
                  class: "bili-mini-desc-avatar clickable",
                  alt: "",
                  loading: "lazy",
                  title: "点击查看 UP 主详情与近期投稿",
                  onClick: n[3] || (n[3] = u((i) => B(i, { mid: t(e).authorMid, name: t(e).author, face: t(e).authorFace }), ["stop"]))
                }, null, 8, bt)) : p("", !0),
                l("div", vt, [
                  l("div", ft, [
                    l("span", {
                      class: "bili-mini-desc-up-name clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: n[4] || (n[4] = u((i) => B(i, { mid: t(e).authorMid, name: t(e).author, face: t(e).authorFace }), ["stop"]))
                    }, d(t(e).author || t(m)("bili.upDefault")), 1)
                  ]),
                  l("div", yt, [
                    b.value != null ? (a(), r("span", ht, d(t(m)("bili.player.fansCount", { count: t(je)(b.value) })), 1)) : j.value ? (a(), r("span", gt, d(t(m)("bili.player.fansLoading")), 1)) : p("", !0),
                    t(e).pubdate ? (a(), r("span", wt, d(t(e).pubdate), 1)) : p("", !0)
                  ])
                ]),
                t(e).authorMid ? (a(), r("div", kt, [
                  l("button", {
                    type: "button",
                    class: w(["bili-mini-desc-follow-btn", {
                      followed: _.value && !M.value,
                      confirming: M.value,
                      busy: L.value
                    }]),
                    disabled: L.value,
                    title: _.value ? M.value ? t(m)("bili.player.unfollowConfirmTitle") : t(m)("bili.player.unfollowTitle") : t(m)("bili.player.followTitle"),
                    onClick: u(Ce, ["stop"]),
                    onMouseleave: n[5] || (n[5] = (i) => M.value = !1)
                  }, [
                    L.value ? (a(), r(x, { key: 0 }, [
                      G("...")
                    ], 64)) : _.value ? M.value ? (a(), r(x, { key: 2 }, [
                      G(d(t(m)("bili.player.unfollowConfirm")), 1)
                    ], 64)) : (a(), r(x, { key: 3 }, [
                      G(d(t(m)("bili.player.followed")), 1)
                    ], 64)) : (a(), r(x, { key: 1 }, [
                      G(d(t(m)("bili.player.follow")), 1)
                    ], 64))
                  ], 42, _t)
                ])) : p("", !0)
              ]),
              l("div", xt, d(t(e).title), 1),
              n[19] || (n[19] = l("div", { class: "bili-mini-desc-divider" }, null, -1)),
              l("div", Ct, [
                ee(te, {
                  text: t(e).description || t(m)("bili.player.noDesc")
                }, null, 8, ["text"])
              ])
            ])
          ])) : p("", !0),
          l("div", Pt, [
            l("header", {
              class: "bili-mini-head",
              onPointerdown: V
            }, [
              l("span", {
                class: "bili-mini-title",
                title: t(e).title
              }, d(t(e).title || "正在加载…"), 9, Mt),
              t(e).pages.length > 1 ? (a(), r("div", $t, [
                l("button", {
                  class: "bili-mini-ep-btn prev",
                  type: "button",
                  title: t(m)("bili.player.prevEp"),
                  disabled: t(e).currentPageIndex <= 0,
                  onClick: u(ze, ["stop"])
                }, "‹", 8, St),
                l("button", {
                  class: w(["bili-mini-ep-label", { active: t(e).episodesOpen }]),
                  type: "button",
                  title: t(m)("bili.player.toggleEpisodes"),
                  onClick: n[6] || (n[6] = u((i) => t(c).toggleEpisodes(), ["stop"]))
                }, " P" + d(t(e).currentPageIndex + 1), 11, Et),
                l("button", {
                  class: "bili-mini-ep-btn next",
                  type: "button",
                  title: t(m)("bili.player.nextEp"),
                  disabled: t(e).currentPageIndex >= t(e).pages.length - 1,
                  onClick: u(De, ["stop"])
                }, "›", 8, Lt)
              ])) : p("", !0),
              l("button", {
                class: "bili-mini-speed-btn bili-mini-link-btn",
                type: "button",
                title: t(m)("bili.player.openInBiliTitle"),
                onClick: u(Me, ["stop"])
              }, d(t(m)("bili.player.openInBili")), 9, It),
              l("button", {
                class: "bili-mini-speed-btn bili-mini-sub-btn",
                type: "button",
                title: "提取当前视频全部字幕 TXT",
                onClick: u($e, ["stop"])
              }, " 字幕 "),
              l("div", Rt, [
                l("button", {
                  class: w(["bili-mini-speed-btn", { active: t(e).speedMenuOpen }]),
                  type: "button",
                  title: "点击切换播放倍速",
                  onClick: u(Ue, ["stop"])
                }, d(t(e).playbackRate) + "x ", 3),
                t(e).speedMenuOpen ? (a(), r("div", Tt, [
                  (a(), r(x, null, R([0.5, 0.75, 1, 1.25, 1.5, 2], (i) => l("button", {
                    key: i,
                    type: "button",
                    class: w(["bili-mini-speed-item", { active: i === t(e).playbackRate }]),
                    onClick: u((o) => t(c).setPlaybackRate(i), ["stop"])
                  }, [
                    l("span", null, d(i) + "x", 1)
                  ], 10, Ot)), 64))
                ])) : p("", !0)
              ]),
              l("button", {
                class: w(["bili-mini-desc-toggle", { active: t(e).descOpen }]),
                type: "button",
                title: "展开/收起视频简介",
                onClick: n[7] || (n[7] = u((i) => t(c).toggleDesc(), ["stop"]))
              }, " 📋 简介 ", 2),
              l("button", {
                class: w(["bili-mini-comments-toggle", { active: t(e).commentsOpen }]),
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
            l("div", Ft, [
              t(e).useIframe && t(e).iframeSrc ? (a(), r("iframe", {
                key: 0,
                src: t(e).iframeSrc,
                class: "bili-mini-iframe",
                frameborder: "0",
                allow: "autoplay; fullscreen",
                allowfullscreen: "",
                referrerpolicy: "no-referrer",
                style: { width: "100%", height: "100%", border: "0", display: "block" }
              }, null, 8, zt)) : t(e).videoSrc ? (a(), r("video", {
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
                onTimeupdate: Re,
                onPlay: Te,
                onPause: Oe,
                onEnded: Fe
              }, null, 40, Dt)) : p("", !0),
              t(e).videoSrc ? ve((a(), r("div", {
                key: 2,
                class: w(["bili-danmaku-stage", { "is-paused": !t(e).isPlaying }])
              }, [
                (a(!0), r(x, null, R(T.value, (i) => (a(), r("div", {
                  key: i.id,
                  class: w(["bili-danmaku-bullet", { "is-top": i.mode === 5, "is-bottom": i.mode === 4 }]),
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
                  class: w(["bili-danmaku-toggle-btn", { active: t(e).danmakuEnabled }]),
                  title: t(e).danmakuEnabled ? "点击关闭弹幕" : "点击开启弹幕",
                  onClick: n[11] || (n[11] = u((i) => t(c).toggleDanmakuEnabled(), ["stop"]))
                }, [
                  l("span", Wt, d(t(e).danmakuEnabled ? "💬" : "🔲"), 1),
                  n[20] || (n[20] = l("span", { class: "bili-dm-btn-label" }, "弹幕", -1)),
                  l("span", Bt, d(t(e).danmakuEnabled ? "开" : "关"), 1)
                ], 10, Ut)
              ])) : p("", !0),
              t(e).isLoading ? (a(), r("div", Xt, [...n[21] || (n[21] = [
                l("span", null, "正在取得原生视频流…", -1)
              ])])) : t(e).errorMsg ? (a(), r("div", Nt, [
                l("span", null, d(t(e).errorMsg), 1),
                l("button", {
                  type: "button",
                  style: { padding: "5px 14px", background: "#00aeec", color: "#fff", border: "0", "border-radius": "5px", cursor: "pointer", "font-size": "12px", "font-weight": "600" },
                  onClick: n[13] || (n[13] = u((i) => t(c).retryCurrentVideo(), ["stop"]))
                }, "重新获取视频流")
              ])) : p("", !0)
            ]),
            l("div", {
              class: "bili-mini-lyric",
              title: t(ge).organizer.heroLyricText
            }, d(t(ge).organizer.heroLyricText || "暂无台词"), 9, Yt)
          ]),
          t(e).commentsOpen ? (a(), r("div", Ht, [
            l("div", {
              class: "bili-mini-comments-head",
              onPointerdown: V
            }, [
              l("div", qt, [
                n[22] || (n[22] = l("span", null, "💬 视频评论", -1)),
                l("span", Vt, "(" + d(t(e).totalComments || 0) + ")", 1)
              ]),
              l("div", At, [
                l("div", Gt, [
                  l("button", {
                    type: "button",
                    class: w(["bili-mini-sort-btn", { active: t(e).commentsSort === 2 }]),
                    onClick: n[14] || (n[14] = u((i) => t(c).setCommentsSort(2), ["stop"]))
                  }, " 按热度 ", 2),
                  l("button", {
                    type: "button",
                    class: w(["bili-mini-sort-btn", { active: t(e).commentsSort === 0 }]),
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
            l("div", jt, [
              t(e).comments.length ? (a(!0), r(x, { key: 0 }, R(t(e).comments, (i) => (a(), r("div", {
                key: i.id,
                class: w(["bili-comment-item", { "is-top-comment": i.isTop }])
              }, [
                l("img", {
                  src: i.avatar || "assets/default-avatar.svg",
                  class: "bili-comment-avatar clickable",
                  alt: "",
                  loading: "lazy",
                  title: "点击查看 UP 主/作者详情与近期投稿",
                  onClick: u((o) => B(o, { mid: i.mid, name: i.uname, face: i.avatar }), ["stop"])
                }, null, 8, Qt),
                l("div", Jt, [
                  l("div", Kt, [
                    l("span", {
                      class: "bili-comment-uname clickable",
                      title: "点击查看 UP 主/作者详情与近期投稿",
                      onClick: u((o) => B(o, { mid: i.mid, name: i.uname, face: i.avatar }), ["stop"])
                    }, d(i.uname), 9, Zt),
                    i.isTop ? (a(), r("span", ei, "📌 置顶")) : p("", !0),
                    i.isUp || i.uname === t(e).author || t(e).authorMid && String(i.mid) === String(t(e).authorMid) ? (a(), r("span", ti, "UP主")) : p("", !0),
                    l("span", ii, d(i.timeStr), 1)
                  ]),
                  l("div", ni, [
                    ee(te, {
                      text: i.message,
                      emotes: i.emotes
                    }, null, 8, ["text", "emotes"])
                  ]),
                  i.pictures.length ? (a(), r("div", li, [
                    (a(!0), r(x, null, R(i.pictures, (o, f) => (a(), r("button", {
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
                      }, null, 8, oi)
                    ], 8, si))), 128))
                  ])) : p("", !0),
                  l("div", ai, [
                    l("span", null, "👍 " + d(i.likeCount), 1),
                    i.replyCount ? (a(), r("span", ri, "💬 " + d(i.replyCount), 1)) : p("", !0)
                  ]),
                  i.replies?.length ? (a(), r("div", di, [
                    (a(!0), r(x, null, R(i.replies, (o) => (a(), r("div", {
                      key: o.id,
                      class: "bili-comment-sub-item"
                    }, [
                      l("strong", ui, d(o.userName) + ":", 1),
                      ee(te, {
                        text: o.message,
                        emotes: o.emotes
                      }, null, 8, ["text", "emotes"]),
                      o.pictures.length ? (a(), r("div", ci, [
                        (a(!0), r(x, null, R(o.pictures, (f, h) => (a(), r("button", {
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
                          }, null, 8, mi)
                        ], 8, pi))), 128))
                      ])) : p("", !0)
                    ]))), 128)),
                    l("div", bi, [
                      !i.subRepliesExpanded && (i.replyCount || 0) > i.replies.length ? (a(), r(x, { key: 0 }, [
                        l("span", null, "共 " + d(i.replyCount) + " 条回复，", 1),
                        l("button", {
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: i.subRepliesLoading,
                          onClick: u((o) => t(c).expandSubReplies(i.id), ["stop"])
                        }, d(i.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, vi)
                      ], 64)) : i.subRepliesExpanded ? (a(), r(x, { key: 1 }, [
                        i.subRepliesHasMore ? (a(), r("button", {
                          key: 0,
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: i.subRepliesLoading,
                          onClick: u((o) => t(c).expandSubReplies(i.id), ["stop"])
                        }, d(i.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, fi)) : p("", !0),
                        l("button", {
                          type: "button",
                          class: "bili-comment-sub-collapse-btn",
                          onClick: u((o) => t(c).collapseSubReplies(i.id), ["stop"])
                        }, " 收起 ▴ ", 8, yi)
                      ], 64)) : p("", !0)
                    ])
                  ])) : p("", !0)
                ])
              ], 2))), 128)) : t(e).commentsLoading ? (a(), r("p", hi, " 正在加载评论… ")) : (a(), r("p", gi, " 暂无评论 "))
            ]),
            t(e).hasMoreComments ? (a(), r("div", wi, [
              l("button", {
                type: "button",
                class: "bili-mini-comments-more-btn",
                disabled: t(e).commentsLoading,
                onClick: n[17] || (n[17] = u((i) => t(c).loadMoreComments(), ["stop"]))
              }, d(t(e).commentsLoading ? "加载中…" : "加载更多评论"), 9, ki)
            ])) : p("", !0)
          ])) : p("", !0)
        ]),
        t(e).collapsed ? p("", !0) : (a(), r("div", {
          key: 0,
          class: "bili-mini-resize-handle",
          role: "separator",
          "aria-label": "调整播放器大小",
          onPointerdown: Ie
        }, null, 32))
      ], 38)), [
        [fe, !t(e).collapsed]
      ]) : p("", !0)
    ]));
  }
}), Oi = /* @__PURE__ */ Je(_i, [["__scopeId", "data-v-faf6a1e7"]]);
export {
  Oi as default
};
