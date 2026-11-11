import { d as We, w as A, D as Xe, B as Ye, x as He, o as a, j as Ne, u as t, l as ve, y as fe, e as r, i as l, t as d, h as u, F as x, g as R, A as w, f as p, m as G, p as ee, z as ye, T as Ve, b as k, s as D } from "./vendor-vue-9b0eS4bW.js";
import { y as e, d as c, c as he } from "./view-styles-CRCe8Fq8.js";
import { s as qe } from "./bili-favorites-store-wdVoPkB5.js";
import { a as ge, d as Ae } from "./playback-sync-DouTcx9Y.js";
import { bilibiliChannelService as I } from "./bilibili-channel.service-Bw1bHppM.js";
import { V as Ge } from "./search.service-C3oJEoxa.js";
import { B as te } from "./BiliRichText-DiMdMZkQ.js";
import { i as we } from "./images-BUVUtnRB.js";
import { u as je } from "./use-video-failover-DlY0N2Dn.js";
import { t as m, _ as Qe } from "./_plugin-vue_export-helper-BxikU0LD.js";
const Je = { class: "bili-mini-main-body" }, Ke = {
  key: 0,
  class: "bili-mini-episodes-drawer"
}, Ze = { class: "bili-mini-episodes-meta" }, et = { class: "bili-mini-episodes-count" }, tt = ["title"], it = { class: "bili-mini-episodes-body" }, nt = ["onClick"], lt = { class: "bili-mini-ep-badge" }, st = ["title"], ot = {
  key: 1,
  class: "bili-mini-desc-drawer"
}, at = { class: "bili-mini-desc-meta" }, rt = { style: { display: "flex", "align-items": "center", gap: "4px" } }, dt = ["title"], ut = ["title"], ct = { class: "bili-mini-desc-body" }, pt = { class: "bili-mini-desc-up" }, mt = ["src"], bt = { class: "bili-mini-desc-up-info" }, vt = { class: "bili-mini-desc-up-top" }, ft = { class: "bili-mini-desc-up-sub" }, yt = {
  key: 0,
  class: "bili-mini-desc-fans"
}, ht = {
  key: 1,
  class: "bili-mini-desc-fans loading"
}, gt = {
  key: 2,
  class: "bili-mini-desc-pubdate"
}, wt = {
  key: 1,
  class: "bili-mini-desc-follow-wrap"
}, kt = ["disabled", "title"], _t = { class: "bili-mini-desc-title" }, xt = { class: "bili-mini-desc-text" }, Ct = { class: "bili-mini-player-pane" }, Pt = ["title"], Mt = {
  key: 0,
  class: "bili-mini-episodes-wrap"
}, $t = ["title", "disabled"], St = ["title"], Et = ["title", "disabled"], Lt = ["title"], It = { class: "bili-mini-speed-wrap" }, Rt = {
  key: 0,
  class: "bili-mini-speed-menu"
}, Tt = ["onClick"], Ot = { class: "bili-mini-screen" }, Ft = ["src"], Dt = ["src", "poster"], zt = ["title"], Bt = { class: "bili-dm-btn-icon" }, Ut = { class: "bili-dm-btn-state" }, Wt = {
  key: 4,
  class: "bili-mini-status"
}, Xt = {
  key: 5,
  class: "bili-mini-status error",
  style: { display: "flex", "flex-direction": "column", "align-items": "center", "justify-content": "center", gap: "8px", padding: "12px", "text-align": "center" }
}, Yt = {
  key: 2,
  class: "bili-mini-comments-drawer"
}, Ht = { class: "bili-mini-comments-meta" }, Nt = { class: "bili-mini-comments-count" }, Vt = { class: "bili-mini-comments-right" }, qt = { class: "bili-mini-comments-sort" }, At = { class: "bili-mini-comments-body" }, Gt = ["src", "onClick"], jt = { class: "bili-comment-main" }, Qt = { class: "bili-comment-user-row" }, Jt = ["onClick"], Kt = {
  key: 0,
  class: "bili-comment-top-badge",
  title: "UP主置顶评论"
}, Zt = {
  key: 1,
  class: "bili-comment-up-badge",
  title: "视频作者"
}, ei = { class: "bili-comment-time" }, ti = { class: "bili-comment-text" }, ii = {
  key: 0,
  class: "bili-mini-comment-pictures"
}, ni = ["aria-label", "onClick"], li = ["src"], si = { class: "bili-comment-actions" }, oi = { key: 0 }, ai = {
  key: 1,
  class: "bili-comment-sub-list"
}, ri = { class: "bili-comment-sub-uname" }, di = {
  key: 0,
  class: "bili-mini-comment-pictures"
}, ui = ["aria-label", "onClick"], ci = ["src"], pi = { class: "bili-comment-sub-more" }, mi = ["disabled", "onClick"], bi = ["disabled", "onClick"], vi = ["onClick"], fi = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "20px 0" }
}, yi = {
  key: 2,
  class: "muted small",
  style: { "text-align": "center", padding: "20px 0" }
}, hi = {
  key: 0,
  class: "bili-mini-comments-foot"
}, gi = ["disabled"], wi = /* @__PURE__ */ We({
  __name: "BiliMiniPlayer",
  setup(ki) {
    const y = k(null);
    je(e, y, () => {
      e.errorMsg = m("bili.player.loadError"), e.isPlaying = !1;
    });
    const v = k(null), b = k(null), j = k(!1), M = k(!1), L = k(!1), _ = k(!1);
    async function ke(s) {
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
    async function _e(s) {
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
        M.value = !1, s && n ? (_e(n), ke(n)) : s || (b.value = null);
      },
      { immediate: !0 }
    );
    async function xe() {
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
    function W(s, n) {
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
    const Ce = D(() => {
      const s = e.pages?.[e.currentPageIndex]?.page || (e.currentPageIndex > 0 ? e.currentPageIndex + 1 : void 0), n = s && s > 1 ? `?p=${s}` : "";
      return e.bvid ? `https://www.bilibili.com/video/${e.bvid}${n}` : e.aid ? `https://www.bilibili.com/video/av${e.aid}${n}` : "https://www.bilibili.com";
    });
    function Pe() {
      const s = Ce.value;
      typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: s, active: !0 }) : window.open(s, "_blank", "noopener,noreferrer");
    }
    function Me() {
      e.bvid && qe.open({
        bvid: e.bvid,
        cid: e.cid,
        title: e.title
      });
    }
    const Q = k(!1), ie = k(0), ne = k(0), le = k(0), se = k(0), J = k(!1);
    let oe = 0, ae = 0, X = 0, K = 0, Z = 0;
    const re = D(() => e.episodesOpen || e.descOpen || e.commentsOpen), T = k([]);
    let z = 0, Y = 0;
    const de = [0, 0, 0, 0, 0, 0, 0, 0];
    function $e(s, n) {
      let i = 0, o = s.length - 1;
      for (; i <= o; ) {
        const f = Math.floor((i + o) / 2);
        s[f].time < n ? i = f + 1 : o = f - 1;
      }
      return i;
    }
    function Se() {
      if (!e.danmakuEnabled || !e.danmakuList?.length || !y.value) return;
      const s = y.value.currentTime;
      if (Math.abs(s - Y) > 1.5) {
        T.value = [], z = $e(e.danmakuList, s), Y = s;
        return;
      }
      const n = performance.now(), o = v.value?.querySelector(".bili-mini-screen")?.clientHeight || 240, f = Math.max(3, Math.min(8, Math.floor((o - 45) / 26)));
      for (; z < e.danmakuList.length; ) {
        const h = e.danmakuList[z];
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
    const H = D(() => {
      if (e.collapsed) return 0;
      const s = typeof window < "u" && window.innerWidth <= 900;
      let n = 0;
      return e.episodesOpen && (n += s ? 200 : 240), e.descOpen && (n += s ? 220 : 280), n;
    }), N = D(() => {
      if (e.collapsed) return 250;
      const s = typeof window < "u" && window.innerWidth <= 900;
      let n = e.baseWidth || (s ? 340 : 380);
      return e.episodesOpen && (n += s ? 200 : 240), e.descOpen && (n += s ? 220 : 280), e.commentsOpen && (n += s ? 260 : 330), n;
    }), V = D(() => e.collapsed ? 34 : Math.max(re.value ? 380 : 254, e.height)), Ee = D(() => {
      if (e.collapsed && typeof document < "u") {
        const n = document.querySelector(".fo-mini-dock-anchor");
        if (n && n.getBoundingClientRect) {
          const i = n.getBoundingClientRect();
          if (i.width > 0 && i.height > 0 && i.top > 0)
            return {
              left: `${i.left}px`,
              top: `${i.top}px`,
              width: `${N.value}px`,
              height: `${V.value}px`,
              zIndex: e.zIndex
            };
        }
      }
      return {
        left: `${Math.max(8, e.x - H.value)}px`,
        top: `${e.y}px`,
        width: `${N.value}px`,
        height: `${V.value}px`,
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
          if (await Xe(), !y.value || e.videoSrc !== s || e.bvid !== n) return;
          y.value.playbackRate = e.playbackRate, y.value.play().catch(() => {
          }), ge({ bvid: e.bvid, title: e.title, cover: e.cover }, y.value);
        }
      }
    );
    let O = 0, ue = 0, ce = 0, F = 0, pe = 0, me = 0, B = null, U = null;
    function q(s) {
      if (s.target?.closest(
        "button, a, input, textarea, select, .bili-mini-quality-menu, .bili-mini-speed-menu, .bili-mini-tab-btn, .no-drag"
      ) || !v.value) return;
      B?.(), U?.(), Q.value = !0, ie.value = s.clientX, ne.value = s.clientY, le.value = e.x, se.value = e.y, c.bringToFront(), v.value.style.willChange = "left, top", v.value.classList.add("is-dragging");
      const i = s.currentTarget;
      try {
        i?.setPointerCapture(s.pointerId);
      } catch {
      }
      const o = H.value + 8, f = Math.max(o, window.innerWidth - (N.value - H.value) - 8), h = Math.max(0, window.innerHeight - V.value - 8);
      let C = e.x, $ = e.y;
      const S = () => {
        O = 0, e.x = C, e.y = $, v.value && (v.value.style.left = `${ue}px`, v.value.style.top = `${ce}px`);
      }, E = (P) => {
        if (!Q.value) return;
        const Be = P.clientX - ie.value, Ue = P.clientY - ne.value;
        C = Math.min(f, Math.max(o, le.value + Be)), $ = Math.min(h, Math.max(8, se.value + Ue)), ue = Math.max(8, C - H.value), ce = $, O || (O = requestAnimationFrame(S));
      }, g = () => {
        if (B = null, window.removeEventListener("pointermove", E), window.removeEventListener("pointerup", g), window.removeEventListener("pointercancel", g), O && (cancelAnimationFrame(O), O = 0), i)
          try {
            i.releasePointerCapture(s.pointerId);
          } catch {
          }
        v.value && (v.value.style.willChange = "auto", v.value.classList.remove("is-dragging")), Q.value = !1, e.x = C, e.y = $;
      };
      B = g, window.addEventListener("pointermove", E, { passive: !0 }), window.addEventListener("pointerup", g, { once: !0 }), window.addEventListener("pointercancel", g, { once: !0 });
    }
    function Le(s) {
      if (!v.value) return;
      B?.(), U?.(), s.preventDefault(), s.stopPropagation(), J.value = !0, oe = s.clientX, ae = s.clientY, X = N.value, K = V.value, Z = X - (e.baseWidth || (window.innerWidth <= 900 ? 340 : 380)), c.bringToFront(), v.value.style.willChange = "width, height", v.value.classList.add("is-dragging");
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
        if (U = null, window.removeEventListener("pointermove", $), window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), F && (cancelAnimationFrame(F), F = 0), n)
          try {
            n.releasePointerCapture(s.pointerId);
          } catch {
          }
        v.value && (v.value.style.willChange = "auto", v.value.classList.remove("is-dragging")), J.value = !1, e.baseWidth = f, e.height = h;
      };
      U = S, window.addEventListener("pointermove", $, { passive: !0 }), window.addEventListener("pointerup", S, { once: !0 }), window.addEventListener("pointercancel", S, { once: !0 });
    }
    function Ie() {
      y.value && (e.currentTime = y.value.currentTime, e.duration = y.value.duration || 0, Se());
    }
    function Re() {
      e.isPlaying = !0, y.value && e.bvid && ge({ bvid: e.bvid, title: e.title, cover: e.cover }, y.value);
    }
    function Te() {
      e.isPlaying = !1;
    }
    function Oe() {
      e.currentPageIndex < e.pages.length - 1 && c.switchEpisode(e.currentPageIndex + 1);
    }
    function Fe() {
      e.currentPageIndex > 0 && c.switchEpisode(e.currentPageIndex - 1);
    }
    function De() {
      e.currentPageIndex < e.pages.length - 1 && c.switchEpisode(e.currentPageIndex + 1);
    }
    function ze() {
      e.speedMenuOpen = !e.speedMenuOpen, e.speedMenuOpen && (e.qualityMenuOpen = !1);
    }
    function be(s) {
      const n = s.target;
      n?.closest(".bili-mini-quality-wrap") || (e.qualityMenuOpen = !1), n?.closest(".bili-mini-speed-wrap") || (e.speedMenuOpen = !1);
    }
    return Ye(() => {
      window.addEventListener("click", be);
    }), He(() => {
      y.value && Ae(y.value), window.removeEventListener("click", be), B?.(), U?.();
    }), (s, n) => (a(), Ne(Ve, { to: "body" }, [
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
        style: ye(Ee.value),
        onMousedown: n[18] || (n[18] = //@ts-ignore
        (...i) => t(c).bringToFront && t(c).bringToFront(...i))
      }, [
        l("div", Je, [
          t(e).episodesOpen ? (a(), r("div", Ke, [
            l("div", {
              class: "bili-mini-episodes-head",
              onPointerdown: q
            }, [
              l("div", Ze, [
                l("span", null, d(t(m)("bili.player.episodes")), 1),
                l("span", et, "(" + d(t(e).pages.length) + "P)", 1)
              ]),
              l("button", {
                type: "button",
                class: "bili-mini-tab-btn",
                title: t(m)("bili.player.collapseEpisodes"),
                onClick: n[0] || (n[0] = u((i) => t(c).toggleEpisodes(!1), ["stop"]))
              }, " ✕ ", 8, tt)
            ], 32),
            l("div", it, [
              (a(!0), r(x, null, R(t(e).pages, (i, o) => (a(), r("button", {
                key: i.cid,
                type: "button",
                class: w(["bili-mini-ep-item", { active: o === t(e).currentPageIndex }]),
                onClick: u((f) => t(c).switchEpisode(o), ["stop"])
              }, [
                l("span", lt, "P" + d(i.page || o + 1), 1),
                l("span", {
                  class: "bili-mini-ep-part",
                  title: i.part
                }, d(i.part || t(m)("bili.player.episodeNum", { num: o + 1 })), 9, st)
              ], 10, nt))), 128))
            ])
          ])) : p("", !0),
          t(e).descOpen ? (a(), r("div", ot, [
            l("div", {
              class: "bili-mini-desc-head",
              onPointerdown: q
            }, [
              l("div", at, [
                l("span", null, d(t(m)("bili.player.desc")), 1)
              ]),
              l("div", rt, [
                l("button", {
                  type: "button",
                  class: "bili-copy-desc-btn",
                  title: t(m)("bili.player.copyDescTitle"),
                  onClick: n[1] || (n[1] = u((i) => t(c).copyDescription(), ["stop"]))
                }, d(t(m)("bili.player.copyDesc")), 9, dt),
                l("button", {
                  type: "button",
                  class: "bili-mini-tab-btn",
                  title: t(m)("bili.player.collapseDesc"),
                  onClick: n[2] || (n[2] = u((i) => t(c).toggleDesc(!1), ["stop"]))
                }, " ✕ ", 8, ut)
              ])
            ], 32),
            l("div", ct, [
              l("div", pt, [
                t(e).authorFace ? (a(), r("img", {
                  key: 0,
                  src: t(e).authorFace,
                  class: "bili-mini-desc-avatar clickable",
                  alt: "",
                  loading: "lazy",
                  title: "点击查看 UP 主详情与近期投稿",
                  onClick: n[3] || (n[3] = u((i) => W(i, { mid: t(e).authorMid, name: t(e).author, face: t(e).authorFace }), ["stop"]))
                }, null, 8, mt)) : p("", !0),
                l("div", bt, [
                  l("div", vt, [
                    l("span", {
                      class: "bili-mini-desc-up-name clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: n[4] || (n[4] = u((i) => W(i, { mid: t(e).authorMid, name: t(e).author, face: t(e).authorFace }), ["stop"]))
                    }, d(t(e).author || t(m)("bili.upDefault")), 1)
                  ]),
                  l("div", ft, [
                    b.value != null ? (a(), r("span", yt, d(t(m)("bili.player.fansCount", { count: t(Ge)(b.value) })), 1)) : j.value ? (a(), r("span", ht, d(t(m)("bili.player.fansLoading")), 1)) : p("", !0),
                    t(e).pubdate ? (a(), r("span", gt, d(t(e).pubdate), 1)) : p("", !0)
                  ])
                ]),
                t(e).authorMid ? (a(), r("div", wt, [
                  l("button", {
                    type: "button",
                    class: w(["bili-mini-desc-follow-btn", {
                      followed: _.value && !M.value,
                      confirming: M.value,
                      busy: L.value
                    }]),
                    disabled: L.value,
                    title: _.value ? M.value ? t(m)("bili.player.unfollowConfirmTitle") : t(m)("bili.player.unfollowTitle") : t(m)("bili.player.followTitle"),
                    onClick: u(xe, ["stop"]),
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
                  ], 42, kt)
                ])) : p("", !0)
              ]),
              l("div", _t, d(t(e).title), 1),
              n[19] || (n[19] = l("div", { class: "bili-mini-desc-divider" }, null, -1)),
              l("div", xt, [
                ee(te, {
                  text: t(e).description || t(m)("bili.player.noDesc")
                }, null, 8, ["text"])
              ])
            ])
          ])) : p("", !0),
          l("div", Ct, [
            l("header", {
              class: "bili-mini-head",
              onPointerdown: q
            }, [
              l("span", {
                class: "bili-mini-title",
                title: t(e).title
              }, d(t(e).title || "正在加载…"), 9, Pt),
              t(e).pages.length > 1 ? (a(), r("div", Mt, [
                l("button", {
                  class: "bili-mini-ep-btn prev",
                  type: "button",
                  title: t(m)("bili.player.prevEp"),
                  disabled: t(e).currentPageIndex <= 0,
                  onClick: u(Fe, ["stop"])
                }, "‹", 8, $t),
                l("button", {
                  class: w(["bili-mini-ep-label", { active: t(e).episodesOpen }]),
                  type: "button",
                  title: t(m)("bili.player.toggleEpisodes"),
                  onClick: n[6] || (n[6] = u((i) => t(c).toggleEpisodes(), ["stop"]))
                }, " P" + d(t(e).currentPageIndex + 1), 11, St),
                l("button", {
                  class: "bili-mini-ep-btn next",
                  type: "button",
                  title: t(m)("bili.player.nextEp"),
                  disabled: t(e).currentPageIndex >= t(e).pages.length - 1,
                  onClick: u(De, ["stop"])
                }, "›", 8, Et)
              ])) : p("", !0),
              l("button", {
                class: "bili-mini-speed-btn bili-mini-link-btn",
                type: "button",
                title: t(m)("bili.player.openInBiliTitle"),
                onClick: u(Pe, ["stop"])
              }, d(t(m)("bili.player.openInBili")), 9, Lt),
              l("button", {
                class: "bili-mini-speed-btn bili-mini-sub-btn",
                type: "button",
                title: "提取当前视频全部字幕 TXT",
                onClick: u(Me, ["stop"])
              }, " 字幕 "),
              l("div", It, [
                l("button", {
                  class: w(["bili-mini-speed-btn", { active: t(e).speedMenuOpen }]),
                  type: "button",
                  title: "点击切换播放倍速",
                  onClick: u(ze, ["stop"])
                }, d(t(e).playbackRate) + "x ", 3),
                t(e).speedMenuOpen ? (a(), r("div", Rt, [
                  (a(), r(x, null, R([0.5, 0.75, 1, 1.25, 1.5, 2], (i) => l("button", {
                    key: i,
                    type: "button",
                    class: w(["bili-mini-speed-item", { active: i === t(e).playbackRate }]),
                    onClick: u((o) => t(c).setPlaybackRate(i), ["stop"])
                  }, [
                    l("span", null, d(i) + "x", 1)
                  ], 10, Tt)), 64))
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
            l("div", Ot, [
              t(e).useIframe && t(e).iframeSrc ? (a(), r("iframe", {
                key: 0,
                src: t(e).iframeSrc,
                class: "bili-mini-iframe",
                frameborder: "0",
                allow: "autoplay; fullscreen",
                allowfullscreen: "",
                referrerpolicy: "no-referrer",
                style: { width: "100%", height: "100%", border: "0", display: "block" }
              }, null, 8, Ft)) : t(e).videoSrc ? (a(), r("video", {
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
                onTimeupdate: Ie,
                onPlay: Re,
                onPause: Te,
                onEnded: Oe
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
                  l("span", Bt, d(t(e).danmakuEnabled ? "💬" : "🔲"), 1),
                  n[20] || (n[20] = l("span", { class: "bili-dm-btn-label" }, "弹幕", -1)),
                  l("span", Ut, d(t(e).danmakuEnabled ? "开" : "关"), 1)
                ], 10, zt)
              ])) : p("", !0),
              t(e).isLoading ? (a(), r("div", Wt, [...n[21] || (n[21] = [
                l("span", null, "正在取得原生视频流…", -1)
              ])])) : t(e).errorMsg ? (a(), r("div", Xt, [
                l("span", null, d(t(e).errorMsg), 1),
                l("button", {
                  type: "button",
                  style: { padding: "5px 14px", background: "#00aeec", color: "#fff", border: "0", "border-radius": "5px", cursor: "pointer", "font-size": "12px", "font-weight": "600" },
                  onClick: n[13] || (n[13] = u((i) => t(c).retryCurrentVideo(), ["stop"]))
                }, "重新获取视频流")
              ])) : p("", !0)
            ])
          ]),
          t(e).commentsOpen ? (a(), r("div", Yt, [
            l("div", {
              class: "bili-mini-comments-head",
              onPointerdown: q
            }, [
              l("div", Ht, [
                n[22] || (n[22] = l("span", null, "💬 视频评论", -1)),
                l("span", Nt, "(" + d(t(e).totalComments || 0) + ")", 1)
              ]),
              l("div", Vt, [
                l("div", qt, [
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
            l("div", At, [
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
                  onClick: u((o) => W(o, { mid: i.mid, name: i.uname, face: i.avatar }), ["stop"])
                }, null, 8, Gt),
                l("div", jt, [
                  l("div", Qt, [
                    l("span", {
                      class: "bili-comment-uname clickable",
                      title: "点击查看 UP 主/作者详情与近期投稿",
                      onClick: u((o) => W(o, { mid: i.mid, name: i.uname, face: i.avatar }), ["stop"])
                    }, d(i.uname), 9, Jt),
                    i.isTop ? (a(), r("span", Kt, "📌 置顶")) : p("", !0),
                    i.isUp || i.uname === t(e).author || t(e).authorMid && String(i.mid) === String(t(e).authorMid) ? (a(), r("span", Zt, "UP主")) : p("", !0),
                    l("span", ei, d(i.timeStr), 1)
                  ]),
                  l("div", ti, [
                    ee(te, {
                      text: i.message,
                      emotes: i.emotes
                    }, null, 8, ["text", "emotes"])
                  ]),
                  i.pictures.length ? (a(), r("div", ii, [
                    (a(!0), r(x, null, R(i.pictures, (o, f) => (a(), r("button", {
                      key: `${o}-${f}`,
                      type: "button",
                      class: "bili-mini-comment-picture",
                      "aria-label": `查看 ${i.uname} 的评论图片 ${f + 1}`,
                      onClick: u((h) => t(we).open({ source: o, title: `${i.uname} 的评论图片` }), ["stop"])
                    }, [
                      l("img", {
                        src: o,
                        alt: "评论图片",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, li)
                    ], 8, ni))), 128))
                  ])) : p("", !0),
                  l("div", si, [
                    l("span", null, "👍 " + d(i.likeCount), 1),
                    i.replyCount ? (a(), r("span", oi, "💬 " + d(i.replyCount), 1)) : p("", !0)
                  ]),
                  i.replies?.length ? (a(), r("div", ai, [
                    (a(!0), r(x, null, R(i.replies, (o) => (a(), r("div", {
                      key: o.id,
                      class: "bili-comment-sub-item"
                    }, [
                      l("strong", ri, d(o.userName) + ":", 1),
                      ee(te, {
                        text: o.message,
                        emotes: o.emotes
                      }, null, 8, ["text", "emotes"]),
                      o.pictures.length ? (a(), r("div", di, [
                        (a(!0), r(x, null, R(o.pictures, (f, h) => (a(), r("button", {
                          key: `${f}-${h}`,
                          type: "button",
                          class: "bili-mini-comment-picture",
                          "aria-label": `查看 ${o.userName} 的回复图片 ${h + 1}`,
                          onClick: u((C) => t(we).open({ source: f, title: `${o.userName} 的回复图片` }), ["stop"])
                        }, [
                          l("img", {
                            src: f,
                            alt: "回复图片",
                            loading: "lazy",
                            referrerpolicy: "no-referrer"
                          }, null, 8, ci)
                        ], 8, ui))), 128))
                      ])) : p("", !0)
                    ]))), 128)),
                    l("div", pi, [
                      !i.subRepliesExpanded && (i.replyCount || 0) > i.replies.length ? (a(), r(x, { key: 0 }, [
                        l("span", null, "共 " + d(i.replyCount) + " 条回复，", 1),
                        l("button", {
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: i.subRepliesLoading,
                          onClick: u((o) => t(c).expandSubReplies(i.id), ["stop"])
                        }, d(i.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, mi)
                      ], 64)) : i.subRepliesExpanded ? (a(), r(x, { key: 1 }, [
                        i.subRepliesHasMore ? (a(), r("button", {
                          key: 0,
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: i.subRepliesLoading,
                          onClick: u((o) => t(c).expandSubReplies(i.id), ["stop"])
                        }, d(i.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, bi)) : p("", !0),
                        l("button", {
                          type: "button",
                          class: "bili-comment-sub-collapse-btn",
                          onClick: u((o) => t(c).collapseSubReplies(i.id), ["stop"])
                        }, " 收起 ▴ ", 8, vi)
                      ], 64)) : p("", !0)
                    ])
                  ])) : p("", !0)
                ])
              ], 2))), 128)) : t(e).commentsLoading ? (a(), r("p", fi, " 正在加载评论… ")) : (a(), r("p", yi, " 暂无评论 "))
            ]),
            t(e).hasMoreComments ? (a(), r("div", hi, [
              l("button", {
                type: "button",
                class: "bili-mini-comments-more-btn",
                disabled: t(e).commentsLoading,
                onClick: n[17] || (n[17] = u((i) => t(c).loadMoreComments(), ["stop"]))
              }, d(t(e).commentsLoading ? "加载中…" : "加载更多评论"), 9, gi)
            ])) : p("", !0)
          ])) : p("", !0)
        ]),
        t(e).collapsed ? p("", !0) : (a(), r("div", {
          key: 0,
          class: "bili-mini-resize-handle",
          role: "separator",
          "aria-label": "调整播放器大小",
          onPointerdown: Le
        }, null, 32))
      ], 38)), [
        [fe, !t(e).collapsed]
      ]) : p("", !0)
    ]));
  }
}), Ri = /* @__PURE__ */ Qe(wi, [["__scopeId", "data-v-e607fc32"]]);
export {
  Ri as default
};
