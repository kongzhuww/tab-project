import { f as Fe, w as V, n as Te, o as ze, d as De, g as l, I as Ue, x as n, q as be, D as ve, h as a, i as s, t as c, k as d, F as _, z as D, s as g, u as p, j as A, l as Z, B as fe, T as We, b as h, c as I } from "./vendor-vue-BUkfvXUI.js";
import { I as e, x as u, J as Be, j as Xe } from "./search.service-BNKrftAD.js";
import { s as Ye } from "./bili-favorites-store-BihsliKr.js";
import { a as ge, d as He } from "./playback-sync-0zGVaEaT.js";
import { bilibiliChannelService as E } from "./bilibili-channel.service-CaSwYjlA.js";
import { B as ee } from "./BiliRichText-sNjt2n6q.js";
import { _ as qe } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const Ne = { class: "bili-mini-main-body" }, Ve = {
  key: 0,
  class: "bili-mini-episodes-drawer"
}, Ae = { class: "bili-mini-episodes-meta" }, Ge = { class: "bili-mini-episodes-count" }, je = { class: "bili-mini-episodes-body" }, Je = ["onClick"], Ke = { class: "bili-mini-ep-badge" }, Qe = ["title"], Ze = {
  key: 1,
  class: "bili-mini-desc-drawer"
}, et = { style: { display: "flex", "align-items": "center", gap: "4px" } }, tt = { class: "bili-mini-desc-body" }, it = { class: "bili-mini-desc-up" }, nt = ["src"], st = { class: "bili-mini-desc-up-info" }, ot = { class: "bili-mini-desc-up-top" }, lt = { class: "bili-mini-desc-up-sub" }, at = {
  key: 0,
  class: "bili-mini-desc-fans"
}, rt = {
  key: 1,
  class: "bili-mini-desc-fans loading"
}, dt = {
  key: 2,
  class: "bili-mini-desc-pubdate"
}, ut = {
  key: 1,
  class: "bili-mini-desc-follow-wrap"
}, ct = ["disabled", "title"], pt = { class: "bili-mini-desc-title" }, mt = { class: "bili-mini-desc-text" }, bt = { class: "bili-mini-player-pane" }, vt = ["title"], ft = {
  key: 0,
  class: "bili-mini-episodes-wrap"
}, gt = ["disabled"], ht = ["disabled"], yt = { class: "bili-mini-speed-wrap" }, kt = {
  key: 0,
  class: "bili-mini-speed-menu"
}, wt = ["onClick"], xt = { class: "bili-mini-screen" }, _t = ["src"], Ct = ["src", "poster"], Mt = ["title"], Pt = { class: "bili-dm-btn-icon" }, St = { class: "bili-dm-btn-state" }, $t = {
  key: 4,
  class: "bili-mini-status"
}, Et = {
  key: 5,
  class: "bili-mini-status error",
  style: { display: "flex", "flex-direction": "column", "align-items": "center", "justify-content": "center", gap: "8px", padding: "12px", "text-align": "center" }
}, Lt = {
  key: 2,
  class: "bili-mini-comments-drawer"
}, Rt = { class: "bili-mini-comments-meta" }, Ot = { class: "bili-mini-comments-count" }, It = { class: "bili-mini-comments-right" }, Ft = { class: "bili-mini-comments-sort" }, Tt = { class: "bili-mini-comments-body" }, zt = ["src", "onClick"], Dt = { class: "bili-comment-main" }, Ut = { class: "bili-comment-user-row" }, Wt = ["onClick"], Bt = {
  key: 0,
  class: "bili-comment-up-badge",
  title: "视频作者"
}, Xt = { class: "bili-comment-time" }, Yt = { class: "bili-comment-text" }, Ht = { class: "bili-comment-actions" }, qt = { key: 0 }, Nt = {
  key: 0,
  class: "bili-comment-sub-list"
}, Vt = { class: "bili-comment-sub-uname" }, At = { class: "bili-comment-sub-more" }, Gt = ["disabled", "onClick"], jt = ["disabled", "onClick"], Jt = ["onClick"], Kt = {
  key: 1,
  class: "muted small",
  style: { "text-align": "center", padding: "20px 0" }
}, Qt = {
  key: 2,
  class: "muted small",
  style: { "text-align": "center", padding: "20px 0" }
}, Zt = {
  key: 0,
  class: "bili-mini-comments-foot"
}, ei = ["disabled"], ti = /* @__PURE__ */ Fe({
  __name: "BiliMiniPlayer",
  setup(ii) {
    const v = h(null), m = h(null), y = h(null), G = h(!1), C = h(!1), $ = h(!1), U = I(() => {
      const o = String(e.authorMid || "");
      return o ? (E.upGroupsState.followingsCache || []).some((t) => String(t.mid) === o) : !1;
    });
    async function he(o) {
      const i = String(o || "");
      if (!i) {
        y.value = null;
        return;
      }
      G.value = !0;
      try {
        const t = await Xe.api(
          `https://api.bilibili.com/x/relation/stat?vmid=${i}`
        );
        t && typeof t.follower == "number" ? y.value = t.follower : y.value = null;
      } catch {
        y.value = null;
      } finally {
        G.value = !1;
      }
    }
    V(
      () => [e.descOpen, e.authorMid],
      ([o, i]) => {
        C.value = !1, o && i ? he(i) : o || (y.value = null);
      },
      { immediate: !0 }
    );
    async function ye() {
      const o = String(e.authorMid || "");
      if (!(!o || $.value))
        if (U.value) {
          if (!C.value) {
            C.value = !0;
            return;
          }
          $.value = !0;
          try {
            if ((await E.unfollowBiliUp(o)).ok) {
              C.value = !1;
              const t = E.upGroupsState.followingsCache || [];
              E.upGroupsState.followingsCache = t.filter(
                (r) => String(r.mid) !== o
              ), y.value != null && y.value > 0 && (y.value -= 1);
            }
          } finally {
            $.value = !1;
          }
        } else {
          $.value = !0;
          try {
            if ((await E.followBiliUp(o)).ok) {
              C.value = !1;
              const t = E.upGroupsState.followingsCache || [];
              t.some((r) => String(r.mid) === o) || (t.unshift({
                mid: o,
                name: e.author || "UP主",
                face: e.authorFace || "",
                sign: ""
              }), E.upGroupsState.followingsCache = [...t]), y.value != null && (y.value += 1);
            }
          } finally {
            $.value = !1;
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
    function ke() {
      e.bvid && Ye.open({
        bvid: e.bvid,
        cid: e.cid,
        title: e.title
      });
    }
    const j = h(!1), te = h(0), ie = h(0), ne = h(0), se = h(0), J = h(!1);
    let oe = 0, le = 0, B = 0, K = 0, Q = 0;
    const ae = I(() => e.episodesOpen || e.descOpen || e.commentsOpen), L = h([]);
    let F = 0, X = 0;
    const re = [0, 0, 0, 0, 0, 0, 0, 0];
    function we(o, i) {
      let t = 0, r = o.length - 1;
      for (; t <= r; ) {
        const k = Math.floor((t + r) / 2);
        o[k].time < i ? t = k + 1 : r = k - 1;
      }
      return t;
    }
    function xe() {
      if (!e.danmakuEnabled || !e.danmakuList?.length || !v.value) return;
      const o = v.value.currentTime;
      if (Math.abs(o - X) > 1.5) {
        L.value = [], F = we(e.danmakuList, o), X = o;
        return;
      }
      const i = performance.now(), r = m.value?.querySelector(".bili-mini-screen")?.clientHeight || 240, k = Math.max(3, Math.min(8, Math.floor((r - 45) / 26)));
      for (; F < e.danmakuList.length; ) {
        const f = e.danmakuList[F];
        if (f.time > o) break;
        if (o - f.time <= 1.2) {
          let w = 0, M = 1 / 0;
          for (let b = 0; b < k; b++) {
            const x = re[b] || 0;
            if (x <= i) {
              w = b;
              break;
            }
            x < M && (M = x, w = b);
          }
          const P = f.text.length;
          re[w] = i + Math.max(1e3, P * 110);
          const S = {
            id: `${f.id}_${i}_${Math.random()}`,
            text: f.text,
            color: f.color,
            top: w * 26 + 8,
            duration: 5.5,
            mode: f.mode
          };
          L.value.push(S), setTimeout(() => {
            const b = L.value.findIndex((x) => x.id === S.id);
            b !== -1 && L.value.splice(b, 1);
          }, S.duration * 1e3);
        }
        F++;
      }
      X = o;
    }
    V(
      () => [e.videoSrc, e.cid],
      () => {
        L.value = [], F = 0, X = 0;
      }
    );
    const Y = I(() => {
      if (e.collapsed) return 0;
      const o = typeof window < "u" && window.innerWidth <= 900;
      let i = 0;
      return e.episodesOpen && (i += o ? 200 : 240), e.descOpen && (i += o ? 220 : 280), i;
    }), H = I(() => {
      if (e.collapsed) return 250;
      const o = typeof window < "u" && window.innerWidth <= 900;
      let i = e.baseWidth || (o ? 340 : 380);
      return e.episodesOpen && (i += o ? 200 : 240), e.descOpen && (i += o ? 220 : 280), e.commentsOpen && (i += o ? 260 : 330), i;
    }), q = I(() => e.collapsed ? 34 : Math.max(ae.value ? 380 : 254, e.height)), _e = I(() => {
      if (e.collapsed && typeof document < "u") {
        const i = document.querySelector(".fo-mini-dock-anchor");
        if (i && i.getBoundingClientRect) {
          const t = i.getBoundingClientRect();
          if (t.width > 0 && t.height > 0 && t.top > 0)
            return {
              left: `${t.left}px`,
              top: `${t.top}px`,
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
    V(
      () => e.playbackRate,
      (o) => {
        v.value && (v.value.playbackRate = o);
      }
    ), V(
      () => [e.videoSrc, e.bvid],
      async ([o, i]) => {
        o && v.value && i && (await Te(), v.value.playbackRate = e.playbackRate, v.value.play().catch(() => {
        }), ge({ bvid: e.bvid, title: e.title, cover: e.cover }, v.value));
      }
    );
    let R = 0, de = 0, ue = 0, O = 0, ce = 0, pe = 0, T = null, z = null;
    function N(o) {
      if (o.target?.closest(
        "button, a, input, textarea, select, .bili-mini-quality-menu, .bili-mini-speed-menu, .bili-mini-tab-btn, .no-drag"
      ) || !m.value) return;
      T?.(), z?.(), j.value = !0, te.value = o.clientX, ie.value = o.clientY, ne.value = e.x, se.value = e.y, u.bringToFront(), m.value.style.willChange = "left, top", m.value.classList.add("is-dragging");
      const t = o.currentTarget;
      try {
        t?.setPointerCapture(o.pointerId);
      } catch {
      }
      const r = Y.value + 8, k = Math.max(r, window.innerWidth - (H.value - Y.value) - 8), f = Math.max(0, window.innerHeight - q.value - 8);
      let w = e.x, M = e.y;
      const P = () => {
        R = 0, e.x = w, e.y = M, m.value && (m.value.style.left = `${de}px`, m.value.style.top = `${ue}px`);
      }, S = (x) => {
        if (!j.value) return;
        const Oe = x.clientX - te.value, Ie = x.clientY - ie.value;
        w = Math.min(k, Math.max(r, ne.value + Oe)), M = Math.min(f, Math.max(8, se.value + Ie)), de = Math.max(8, w - Y.value), ue = M, R || (R = requestAnimationFrame(P));
      }, b = () => {
        if (T = null, window.removeEventListener("pointermove", S), window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", b), R && (cancelAnimationFrame(R), R = 0), t)
          try {
            t.releasePointerCapture(o.pointerId);
          } catch {
          }
        m.value && (m.value.style.willChange = "auto", m.value.classList.remove("is-dragging")), j.value = !1, e.x = w, e.y = M;
      };
      T = b, window.addEventListener("pointermove", S, { passive: !0 }), window.addEventListener("pointerup", b, { once: !0 }), window.addEventListener("pointercancel", b, { once: !0 });
    }
    function Ce(o) {
      if (!m.value) return;
      T?.(), z?.(), o.preventDefault(), o.stopPropagation(), J.value = !0, oe = o.clientX, le = o.clientY, B = H.value, K = q.value, Q = B - (e.baseWidth || (window.innerWidth <= 900 ? 340 : 380)), u.bringToFront(), m.value.style.willChange = "width, height", m.value.classList.add("is-dragging");
      const i = o.currentTarget;
      try {
        i?.setPointerCapture(o.pointerId);
      } catch {
      }
      const t = Math.max(B, window.innerWidth - e.x - 10), r = Math.max(K, window.innerHeight - e.y - 10);
      let k = e.baseWidth || 380, f = e.height || 254;
      const w = () => {
        O = 0, e.baseWidth = k, e.height = f, m.value && (m.value.style.width = `${ce}px`, m.value.style.height = `${pe}px`);
      }, M = (S) => {
        if (!J.value) return;
        const b = Math.min(
          t,
          Math.max(Q + 280, B + S.clientX - oe)
        );
        ce = b, k = Math.round(b - Q);
        const x = Math.round(
          Math.min(r, Math.max(254, K + S.clientY - le))
        );
        pe = x, f = x, O || (O = requestAnimationFrame(w));
      }, P = () => {
        if (z = null, window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", P), window.removeEventListener("pointercancel", P), O && (cancelAnimationFrame(O), O = 0), i)
          try {
            i.releasePointerCapture(o.pointerId);
          } catch {
          }
        m.value && (m.value.style.willChange = "auto", m.value.classList.remove("is-dragging")), J.value = !1, e.baseWidth = k, e.height = f;
      };
      z = P, window.addEventListener("pointermove", M, { passive: !0 }), window.addEventListener("pointerup", P, { once: !0 }), window.addEventListener("pointercancel", P, { once: !0 });
    }
    function Me() {
      v.value && (e.currentTime = v.value.currentTime, e.duration = v.value.duration || 0, xe());
    }
    function Pe() {
      e.isPlaying = !0, v.value && e.bvid && ge({ bvid: e.bvid, title: e.title, cover: e.cover }, v.value);
    }
    function Se() {
      e.isPlaying = !1;
    }
    function $e() {
      e.currentPageIndex < e.pages.length - 1 && u.switchEpisode(e.currentPageIndex + 1);
    }
    function Ee() {
      e.currentPageIndex > 0 && u.switchEpisode(e.currentPageIndex - 1);
    }
    function Le() {
      e.currentPageIndex < e.pages.length - 1 && u.switchEpisode(e.currentPageIndex + 1);
    }
    function Re() {
      e.speedMenuOpen = !e.speedMenuOpen, e.speedMenuOpen && (e.qualityMenuOpen = !1);
    }
    function me(o) {
      const i = o.target;
      i?.closest(".bili-mini-quality-wrap") || (e.qualityMenuOpen = !1), i?.closest(".bili-mini-speed-wrap") || (e.speedMenuOpen = !1);
    }
    return ze(() => {
      window.addEventListener("click", me);
    }), De(() => {
      v.value && He(v.value), window.removeEventListener("click", me), T?.(), z?.();
    }), (o, i) => (l(), Ue(We, { to: "body" }, [
      n(e).isOpen ? be((l(), a("section", {
        key: 0,
        ref_key: "playerRef",
        ref: m,
        class: g(["bili-mini-player", {
          collapsed: n(e).collapsed,
          "subscription-comments-view": ae.value,
          "episodes-expanded": n(e).episodesOpen,
          "desc-expanded": n(e).descOpen,
          "comments-expanded": n(e).commentsOpen
        }]),
        style: fe(_e.value),
        onMousedown: i[18] || (i[18] = //@ts-ignore
        (...t) => n(u).bringToFront && n(u).bringToFront(...t))
      }, [
        s("div", Ne, [
          n(e).episodesOpen ? (l(), a("div", Ve, [
            s("div", {
              class: "bili-mini-episodes-head",
              onPointerdown: N
            }, [
              s("div", Ae, [
                i[19] || (i[19] = s("span", null, "📑 视频选集", -1)),
                s("span", Ge, "(" + c(n(e).pages.length) + "P)", 1)
              ]),
              s("button", {
                type: "button",
                class: "bili-mini-tab-btn",
                title: "收起选集",
                onClick: i[0] || (i[0] = d((t) => n(u).toggleEpisodes(!1), ["stop"]))
              }, " ✕ ")
            ], 32),
            s("div", je, [
              (l(!0), a(_, null, D(n(e).pages, (t, r) => (l(), a("button", {
                key: t.cid,
                type: "button",
                class: g(["bili-mini-ep-item", { active: r === n(e).currentPageIndex }]),
                onClick: d((k) => n(u).switchEpisode(r), ["stop"])
              }, [
                s("span", Ke, "P" + c(t.page || r + 1), 1),
                s("span", {
                  class: "bili-mini-ep-part",
                  title: t.part
                }, c(t.part || `第 ${r + 1} 集`), 9, Qe)
              ], 10, Je))), 128))
            ])
          ])) : p("", !0),
          n(e).descOpen ? (l(), a("div", Ze, [
            s("div", {
              class: "bili-mini-desc-head",
              onPointerdown: N
            }, [
              i[20] || (i[20] = s("div", { class: "bili-mini-desc-meta" }, [
                s("span", null, "📋 视频简介")
              ], -1)),
              s("div", et, [
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
            s("div", tt, [
              s("div", it, [
                n(e).authorFace ? (l(), a("img", {
                  key: 0,
                  src: n(e).authorFace,
                  class: "bili-mini-desc-avatar clickable",
                  alt: "",
                  loading: "lazy",
                  title: "点击查看 UP 主详情与近期投稿",
                  onClick: i[3] || (i[3] = d((t) => W(t, { mid: n(e).authorMid, name: n(e).author, face: n(e).authorFace }), ["stop"]))
                }, null, 8, nt)) : p("", !0),
                s("div", st, [
                  s("div", ot, [
                    s("span", {
                      class: "bili-mini-desc-up-name clickable",
                      title: "点击查看 UP 主详情与近期投稿",
                      onClick: i[4] || (i[4] = d((t) => W(t, { mid: n(e).authorMid, name: n(e).author, face: n(e).authorFace }), ["stop"]))
                    }, c(n(e).author || "UP主"), 1)
                  ]),
                  s("div", lt, [
                    y.value != null ? (l(), a("span", at, c(n(Be)(y.value)) + "粉丝 ", 1)) : G.value ? (l(), a("span", rt, "粉丝加载中…")) : p("", !0),
                    n(e).pubdate ? (l(), a("span", dt, c(n(e).pubdate), 1)) : p("", !0)
                  ])
                ]),
                n(e).authorMid ? (l(), a("div", ut, [
                  s("button", {
                    type: "button",
                    class: g(["bili-mini-desc-follow-btn", {
                      followed: U.value && !C.value,
                      confirming: C.value,
                      busy: $.value
                    }]),
                    disabled: $.value,
                    title: U.value ? C.value ? "点击确认取消关注" : "已关注，点击取关" : "关注该 UP 主",
                    onClick: d(ye, ["stop"]),
                    onMouseleave: i[5] || (i[5] = (t) => C.value = !1)
                  }, [
                    $.value ? (l(), a(_, { key: 0 }, [
                      A("...")
                    ], 64)) : U.value ? C.value ? (l(), a(_, { key: 2 }, [
                      A("确定取消？")
                    ], 64)) : (l(), a(_, { key: 3 }, [
                      A("已关注")
                    ], 64)) : (l(), a(_, { key: 1 }, [
                      A("+ 关注")
                    ], 64))
                  ], 42, ct)
                ])) : p("", !0)
              ]),
              s("div", pt, c(n(e).title), 1),
              i[21] || (i[21] = s("div", { class: "bili-mini-desc-divider" }, null, -1)),
              s("div", mt, [
                Z(ee, {
                  text: n(e).description || "暂无简介"
                }, null, 8, ["text"])
              ])
            ])
          ])) : p("", !0),
          s("div", bt, [
            s("header", {
              class: "bili-mini-head",
              onPointerdown: N
            }, [
              s("span", {
                class: "bili-mini-title",
                title: n(e).title
              }, c(n(e).title || "正在加载…"), 9, vt),
              n(e).pages.length > 1 ? (l(), a("div", ft, [
                s("button", {
                  class: "bili-mini-ep-btn prev",
                  type: "button",
                  title: "上一集",
                  disabled: n(e).currentPageIndex <= 0,
                  onClick: d(Ee, ["stop"])
                }, "‹", 8, gt),
                s("button", {
                  class: g(["bili-mini-ep-label", { active: n(e).episodesOpen }]),
                  type: "button",
                  title: "展开/收起选集列表",
                  onClick: i[6] || (i[6] = d((t) => n(u).toggleEpisodes(), ["stop"]))
                }, " P" + c(n(e).currentPageIndex + 1), 3),
                s("button", {
                  class: "bili-mini-ep-btn next",
                  type: "button",
                  title: "下一集",
                  disabled: n(e).currentPageIndex >= n(e).pages.length - 1,
                  onClick: d(Le, ["stop"])
                }, "›", 8, ht)
              ])) : p("", !0),
              s("button", {
                class: "bili-mini-speed-btn bili-mini-sub-btn",
                type: "button",
                title: "提取当前视频全部字幕 TXT",
                onClick: d(ke, ["stop"])
              }, " 字幕 "),
              s("div", yt, [
                s("button", {
                  class: g(["bili-mini-speed-btn", { active: n(e).speedMenuOpen }]),
                  type: "button",
                  title: "点击切换播放倍速",
                  onClick: d(Re, ["stop"])
                }, c(n(e).playbackRate) + "x ", 3),
                n(e).speedMenuOpen ? (l(), a("div", kt, [
                  (l(), a(_, null, D([0.5, 0.75, 1, 1.25, 1.5, 2], (t) => s("button", {
                    key: t,
                    type: "button",
                    class: g(["bili-mini-speed-item", { active: t === n(e).playbackRate }]),
                    onClick: d((r) => n(u).setPlaybackRate(t), ["stop"])
                  }, [
                    s("span", null, c(t) + "x", 1)
                  ], 10, wt)), 64))
                ])) : p("", !0)
              ]),
              s("button", {
                class: g(["bili-mini-desc-toggle", { active: n(e).descOpen }]),
                type: "button",
                title: "展开/收起视频简介",
                onClick: i[7] || (i[7] = d((t) => n(u).toggleDesc(), ["stop"]))
              }, " 📋 简介 ", 2),
              s("button", {
                class: g(["bili-mini-comments-toggle", { active: n(e).commentsOpen }]),
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
              }, null, 8, _t)) : n(e).videoSrc ? (l(), a("video", {
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
                onTimeupdate: Me,
                onPlay: Pe,
                onPause: Se,
                onEnded: $e
              }, null, 40, Ct)) : p("", !0),
              n(e).videoSrc ? be((l(), a("div", {
                key: 2,
                class: g(["bili-danmaku-stage", { "is-paused": !n(e).isPlaying }])
              }, [
                (l(!0), a(_, null, D(L.value, (t) => (l(), a("div", {
                  key: t.id,
                  class: g(["bili-danmaku-bullet", { "is-top": t.mode === 5, "is-bottom": t.mode === 4 }]),
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
                  class: g(["bili-danmaku-toggle-btn", { active: n(e).danmakuEnabled }]),
                  title: n(e).danmakuEnabled ? "点击关闭弹幕" : "点击开启弹幕",
                  onClick: i[11] || (i[11] = d((t) => n(u).toggleDanmakuEnabled(), ["stop"]))
                }, [
                  s("span", Pt, c(n(e).danmakuEnabled ? "💬" : "🔲"), 1),
                  i[22] || (i[22] = s("span", { class: "bili-dm-btn-label" }, "弹幕", -1)),
                  s("span", St, c(n(e).danmakuEnabled ? "开" : "关"), 1)
                ], 10, Mt)
              ])) : p("", !0),
              n(e).isLoading ? (l(), a("div", $t, [...i[23] || (i[23] = [
                s("span", null, "正在取得原生视频流…", -1)
              ])])) : n(e).errorMsg ? (l(), a("div", Et, [
                s("span", null, c(n(e).errorMsg), 1),
                s("button", {
                  type: "button",
                  style: { padding: "5px 14px", background: "#00aeec", color: "#fff", border: "0", "border-radius": "5px", cursor: "pointer", "font-size": "12px", "font-weight": "600" },
                  onClick: i[13] || (i[13] = d((t) => n(u).retryCurrentVideo(), ["stop"]))
                }, "重新获取视频流")
              ])) : p("", !0)
            ])
          ]),
          n(e).commentsOpen ? (l(), a("div", Lt, [
            s("div", {
              class: "bili-mini-comments-head",
              onPointerdown: N
            }, [
              s("div", Rt, [
                i[24] || (i[24] = s("span", null, "💬 视频评论", -1)),
                s("span", Ot, "(" + c(n(e).totalComments || 0) + ")", 1)
              ]),
              s("div", It, [
                s("div", Ft, [
                  s("button", {
                    type: "button",
                    class: g(["bili-mini-sort-btn", { active: n(e).commentsSort === 2 }]),
                    onClick: i[14] || (i[14] = d((t) => n(u).setCommentsSort(2), ["stop"]))
                  }, " 按热度 ", 2),
                  s("button", {
                    type: "button",
                    class: g(["bili-mini-sort-btn", { active: n(e).commentsSort === 0 }]),
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
              n(e).comments.length ? (l(!0), a(_, { key: 0 }, D(n(e).comments, (t) => (l(), a("div", {
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
                }, null, 8, zt),
                s("div", Dt, [
                  s("div", Ut, [
                    s("span", {
                      class: "bili-comment-uname clickable",
                      title: "点击查看 UP 主/作者详情与近期投稿",
                      onClick: d((r) => W(r, { mid: t.mid, name: t.uname, face: t.avatar }), ["stop"])
                    }, c(t.uname), 9, Wt),
                    t.isUp || t.uname === n(e).author || n(e).authorMid && String(t.mid) === String(n(e).authorMid) ? (l(), a("span", Bt, "UP主")) : p("", !0),
                    s("span", Xt, c(t.timeStr), 1)
                  ]),
                  s("div", Yt, [
                    Z(ee, {
                      text: t.message,
                      emotes: t.emotes
                    }, null, 8, ["text", "emotes"])
                  ]),
                  s("div", Ht, [
                    s("span", null, "👍 " + c(t.likeCount), 1),
                    t.replyCount ? (l(), a("span", qt, "💬 " + c(t.replyCount), 1)) : p("", !0)
                  ]),
                  t.replies?.length ? (l(), a("div", Nt, [
                    (l(!0), a(_, null, D(t.replies, (r) => (l(), a("div", {
                      key: r.id,
                      class: "bili-comment-sub-item"
                    }, [
                      s("strong", Vt, c(r.userName) + ":", 1),
                      Z(ee, {
                        text: r.message
                      }, null, 8, ["text"])
                    ]))), 128)),
                    s("div", At, [
                      !t.subRepliesExpanded && (t.replyCount || 0) > t.replies.length ? (l(), a(_, { key: 0 }, [
                        s("span", null, "共 " + c(t.replyCount) + " 条回复，", 1),
                        s("button", {
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: t.subRepliesLoading,
                          onClick: d((r) => n(u).expandSubReplies(t.id), ["stop"])
                        }, c(t.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, Gt)
                      ], 64)) : t.subRepliesExpanded ? (l(), a(_, { key: 1 }, [
                        t.subRepliesHasMore ? (l(), a("button", {
                          key: 0,
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: t.subRepliesLoading,
                          onClick: d((r) => n(u).expandSubReplies(t.id), ["stop"])
                        }, c(t.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, jt)) : p("", !0),
                        s("button", {
                          type: "button",
                          class: "bili-comment-sub-collapse-btn",
                          onClick: d((r) => n(u).collapseSubReplies(t.id), ["stop"])
                        }, " 收起 ▴ ", 8, Jt)
                      ], 64)) : p("", !0)
                    ])
                  ])) : p("", !0)
                ])
              ]))), 128)) : n(e).commentsLoading ? (l(), a("p", Kt, " 正在加载评论… ")) : (l(), a("p", Qt, " 暂无评论 "))
            ]),
            n(e).hasMoreComments ? (l(), a("div", Zt, [
              s("button", {
                type: "button",
                class: "bili-mini-comments-more-btn",
                disabled: n(e).commentsLoading,
                onClick: i[17] || (i[17] = d((t) => n(u).loadMoreComments(), ["stop"]))
              }, c(n(e).commentsLoading ? "加载中…" : "加载更多评论"), 9, ei)
            ])) : p("", !0)
          ])) : p("", !0)
        ]),
        n(e).collapsed ? p("", !0) : (l(), a("div", {
          key: 0,
          class: "bili-mini-resize-handle",
          role: "separator",
          "aria-label": "调整播放器大小",
          onPointerdown: Ce
        }, null, 32))
      ], 38)), [
        [ve, !n(e).collapsed]
      ]) : p("", !0)
    ]));
  }
}), ui = /* @__PURE__ */ qe(ti, [["__scopeId", "data-v-bfdf9e8b"]]);
export {
  ui as default
};
