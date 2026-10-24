import { r as Le, f as Ie, w as K, o as Ee, a as Qe, g as v, I as Te, K as qe, i as e, x as l, h as m, F as M, j, t as f, u as P, k as ne, s as W, z as J, q as Me, A as $e, v as Ne, c as R, b as E } from "./vendor-vue-BUkfvXUI.js";
import { $ as p, a0 as fe, a1 as G, a2 as X, a3 as Z, a4 as N, a5 as De, a6 as pe, a7 as Fe, b as w, a8 as Ve, h as $, B as ge, S as ze } from "./search.service-CipPV7Bz.js";
import { A as We } from "./AppWindowFrame-CdaabCwe.js";
import { w as ye } from "./read-session-BWENvNUM.js";
import { _ as He } from "./_plugin-vue_export-helper-CHgC5LLL.js";
function Be(D) {
  const s = Le({
    neteaseUser: null,
    neteasePlaylists: [],
    neteaseActivePlaylist: null,
    neteaseSongs: [],
    neteaseSearchResults: [],
    neteaseRecentSongs: [],
    neteaseQrImg: "",
    neteaseQrStatus: "",
    neteaseLoading: !1,
    message: ""
  });
  let g = !1, d = 0, o, C, U, Q = null;
  function F() {
    U !== void 0 && (clearTimeout(U), U = void 0), Q && (Q.abort(), Q = null);
  }
  function L() {
    if (!g) {
      if (s.neteaseUser = p.getUser(), s.neteaseRecentSongs = p.getRecentSongs(), !s.neteasePlaylists.length)
        try {
          const n = fe(G);
          if (n.length && Array.isArray(n) && n.length) {
            s.neteasePlaylists = n;
            const r = n.find((y) => y.name?.includes("喜欢的音乐") || y.specialType === 5) || n[0];
            r && !s.neteaseActivePlaylist && (s.neteaseActivePlaylist = r);
          }
        } catch {
        }
      if (!s.neteaseSongs.length)
        try {
          const n = fe(X);
          n.length && Array.isArray(n) && n.length && (s.neteaseSongs = n);
        } catch {
        }
    }
  }
  function h() {
    d++, o?.abort(), o = void 0, s.neteaseLoading = !1, C !== void 0 && clearTimeout(C), C = void 0, F(), s.neteaseQrImg && (s.neteaseQrStatus = "轮询已暂停，需要时重新扫码；已提交登录确认不会撤回。");
  }
  async function x(n) {
    if (g || !D()) return;
    if (N.pendingWrites) {
      s.message = "音乐操作正在处理，请稍候；未自动排队。";
      return;
    }
    h();
    const r = new AbortController(), y = d;
    o = r, s.neteaseLoading = !0, s.message = "";
    const u = () => !g && D() && d === y && !r.signal.aborted;
    try {
      await p.whenReady(), u() && await n(r.signal, u);
    } catch (c) {
      u() && (s.message = c?.message || "读取失败，请检查节点设置或网络后手动重试。");
    } finally {
      o === r && (o = void 0, s.neteaseLoading = !1);
    }
  }
  async function b(n, r, y = 500, u = 0) {
    try {
      const c = await p.request("/playlist/track/all", { id: n, limit: y, offset: u }, r);
      if (c.songs?.length) return c.songs;
    } catch {
      r.throwIfAborted();
    }
    return u === 0 ? (await p.request("/playlist/detail", { id: n }, r)).playlist?.tracks || [] : [];
  }
  async function _() {
    await x(async (n, r) => {
      L();
      const u = s.neteaseUser?.uid;
      let c = [];
      if (u)
        try {
          c = (await p.request("/user/playlist", { uid: u, limit: 100 }, n)).playlist || [];
        } catch (k) {
          console.warn("[Netease] Fetch user playlist failed:", k);
        }
      if (!c.length)
        try {
          c = (await p.request("/toplist", {}, n)).list || [];
        } catch {
        }
      if (!r()) return;
      if (c.length) {
        s.neteasePlaylists = c;
        try {
          pe(G, c);
        } catch {
        }
      }
      const A = c.find((k) => k.id === s.neteaseActivePlaylist?.id) || c.find((k) => k.name?.includes("喜欢的音乐") || k.specialType === 5) || c[0];
      if (!A) return;
      if (!s.neteaseSongs.length)
        try {
          const k = await b(A.id, n, 10, 0);
          r() && !s.neteaseSongs.length && (s.neteaseActivePlaylist = A, s.neteaseSongs = k, s.neteaseLoading = !1);
        } catch {
        }
      const B = await b(A.id, n, 500, 0);
      if (r() && (s.neteaseActivePlaylist = A, s.neteaseSongs = B, A.name?.includes("喜欢的音乐") || A.specialType === 5))
        try {
          pe(X, B);
        } catch {
        }
    });
  }
  async function H(n) {
    await x(async (r, y) => {
      const u = p.getUser()?.uid;
      if (s.neteaseActivePlaylist = n, !s.neteaseSongs.length || s.neteaseActivePlaylist?.id !== n.id)
        try {
          const A = await b(n.id, r, 10, 0);
          y() && u === p.getUser()?.uid && (!s.neteaseSongs.length || s.neteaseActivePlaylist?.id !== n.id) && (s.neteaseSongs = A, s.neteaseLoading = !1);
        } catch {
        }
      const c = await b(n.id, r, 500, 0);
      y() && u === p.getUser()?.uid && (s.neteaseActivePlaylist = n, s.neteaseSongs = c);
    });
  }
  async function ee(n) {
    if (!n.trim()) {
      h(), s.neteaseSearchResults = [];
      return;
    }
    await x(async (r, y) => {
      s.neteaseSearchResults = [];
      const u = p.getUser()?.uid;
      let c = [];
      try {
        c = (await p.request("/cloudsearch", { keywords: n.trim(), type: 1, limit: 60 }, r)).result?.songs || [];
      } catch {
        r.throwIfAborted();
      }
      c.length || (c = (await p.request("/search", { keywords: n.trim(), limit: 60 }, r)).result?.songs || []), y() && u === p.getUser()?.uid && (s.neteaseSearchResults = c);
    });
  }
  async function V(n) {
    if (!(g || !D())) {
      if (N.pendingWrites) {
        s.message = "音乐操作正在处理，请稍候；未自动排队。";
        return;
      }
      try {
        await De(n);
      } catch {
        g || (s.message = "操作未完整完成，部分变更可能已保存，请重读核对；未自动重试。");
      }
    }
  }
  async function te() {
    if (N.pendingWrites) return;
    F(), Q = new AbortController();
    const n = Q.signal;
    s.neteaseQrImg = "", s.neteaseQrStatus = "正在生成网易云官方二维码…";
    try {
      await p.whenReady();
      const r = await p.generateQrKey(n);
      if (n.aborted || g) return;
      const y = await p.createQrImage(r, n);
      if (n.aborted || g) return;
      s.neteaseQrImg = y, s.neteaseQrStatus = "请使用网易云音乐 App 扫码登录";
      const u = async () => {
        if (!(n.aborted || g || !D()))
          try {
            const c = await p.checkQrStatus(r);
            if (n.aborted || g) return;
            if (L(), c.code === 803) {
              if (s.neteaseQrImg = "", s.neteaseQrStatus = "扫码登录成功！正在读取个人歌单…", F(), typeof localStorage < "u")
                try {
                  localStorage.removeItem("netease_explicit_logout");
                } catch {
                }
              _();
              return;
            }
            s.neteaseQrStatus = c.message, c.code !== 800 && (U = setTimeout(u, 2500));
          } catch {
            !n.aborted && !g && (U = setTimeout(u, 3e3));
          }
      };
      U = setTimeout(u, 2500);
    } catch (r) {
      !n.aborted && !g && (s.neteaseQrStatus = r?.message || "二维码生成失败，请点击刷新重试");
    }
  }
  async function z() {
    if (h(), typeof localStorage < "u")
      try {
        localStorage.setItem("netease_explicit_logout", "true"), Z(X), Z(G);
      } catch {
      }
    await V(async () => {
      await p.logout(), s.neteaseUser = null, s.neteasePlaylists = [], s.neteaseActivePlaylist = null, s.neteaseSongs = [], s.neteaseSearchResults = [], s.neteaseQrImg = "", s.message = "已退出当前网易云账号，可随时点击上方「扫码登录」重新扫码绑定。";
    });
  }
  async function S() {
    await V(async () => {
      try {
        const n = await p.detectBrowserCookie();
        n && await p.applyCookieAndLogin(n);
      } catch {
      }
      await p.fetchAccountRecentSongs(60), L(), _(), s.message = "✓ 账号历史与歌单已同步刷新！";
    });
  }
  async function T() {
    await V(async () => {
      await p.clearRecentSongs(), L();
    });
  }
  function se() {
    g || (h(), L(), s.neteasePlaylists = [], s.neteaseSongs = [], s.neteaseSearchResults = [], s.neteaseActivePlaylist = null, s.neteaseQrImg = "", s.message = "账号资料发生变化，请核对；需要时手动刷新歌单。");
  }
  function q() {
    g = !0, h();
  }
  return { state: s, refresh: _, selectPlaylist: H, search: ee, startQr: te, logout: z, clearRecent: T, syncLocal: L, pause: h, dispose: q, accountChanged: se, syncHistory: S };
}
const Oe = { class: "ms-source-pane ms-netease-source" }, Ke = { class: "ms-netease-user-bar" }, je = { class: "ms-netease-user-info" }, Je = ["src"], Ye = { class: "ms-netease-meta" }, Ge = { class: "ms-netease-name" }, Xe = {
  key: 0,
  class: "ms-netease-vip-badge"
}, Ze = {
  key: 1,
  class: "ms-netease-meta"
}, et = { style: { display: "flex", gap: "8px", "align-items": "center" } }, tt = ["disabled"], st = { class: "ms-netease-qr-card" }, at = { class: "ms-qr-card-header" }, nt = { class: "ms-qr-card-body" }, it = { class: "ms-netease-qr-wrap" }, ot = ["src"], lt = {
  key: 1,
  class: "ms-qr-loading-placeholder"
}, rt = { class: "ms-qr-instruction" }, ct = { class: "ms-qr-status-pill" }, ut = { class: "ms-qr-actions" }, dt = { class: "ms-netease-body" }, vt = { class: "ms-netease-playlists" }, mt = { class: "ms-netease-pl-info" }, ft = { class: "ms-netease-pl-count" }, pt = { class: "ms-netease-pl-info" }, gt = { class: "ms-netease-pl-count" }, yt = ["onClick"], ht = ["src"], _t = { class: "ms-netease-pl-info" }, bt = { class: "ms-netease-pl-name" }, St = { class: "ms-netease-pl-count" }, wt = { class: "ms-netease-tracks" }, kt = {
  key: 0,
  class: "ms-dropdown-section"
}, Ct = { class: "ms-search-history-tags" }, xt = ["onClick"], At = ["onClick"], Pt = {
  key: 1,
  class: "ms-dropdown-section"
}, Rt = { class: "ms-dropdown-head" }, Ut = { class: "ms-recent-dropdown-list" }, Lt = ["onClick"], It = { class: "ms-drop-play" }, Et = { class: "ms-drop-title" }, Qt = { class: "ms-drop-artist" }, Tt = { class: "ms-drop-dur" }, qt = {
  key: 2,
  class: "ms-dropdown-empty"
}, Mt = {
  key: 0,
  class: "ms-netease-msg-banner"
}, $t = { class: "ms-netease-tracks-head" }, Nt = { class: "ms-netease-tracks-title" }, Dt = { class: "ms-netease-tracks-sub" }, Ft = {
  key: 1,
  class: "ms-netease-loading-box"
}, Vt = ["onClick"], zt = { class: "ms-netease-track-idx" }, Wt = ["src"], Ht = { class: "ms-netease-track-info" }, Bt = { class: "ms-netease-track-name" }, Ot = { class: "ms-netease-track-artist" }, Kt = { class: "ms-netease-track-dur" }, jt = {
  key: 0,
  style: { padding: "30px", "text-align": "center", color: "var(--muted)", "font-size": "13px" }
}, Jt = {
  key: 1,
  class: "ms-netease-pagination-bar"
}, Yt = { class: "ms-pagination-info" }, Gt = { class: "ms-pagination-btns" }, Xt = ["disabled"], Zt = ["disabled"], es = { style: { display: "flex", "align-items": "center", gap: "12px", padding: "10px 16px", "border-top": "1px solid var(--border)", background: "var(--panel)" } }, ts = ["src"], ss = { style: { flex: "1", "min-width": "0", display: "flex", "flex-direction": "column", gap: "4px" } }, as = { style: { display: "flex", "justify-content": "space-between", "font-size": "12px" } }, ns = { style: { "font-weight": "600", "white-space": "nowrap", overflow: "hidden", "text-overflow": "ellipsis", color: "var(--heading)" } }, is = { style: { color: "var(--muted)", "font-size": "11px" } }, os = ["value"], ls = { style: { display: "flex", "align-items": "center", gap: "6px" } }, rs = ["title"], cs = ["title"], us = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23334155'/%3E%3Ccircle cx='32' cy='24' r='10' fill='%2364748b'/%3E%3Cpath d='M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16' fill='%2364748b'/%3E%3C/svg%3E", Y = 10, ds = /* @__PURE__ */ Ie({
  __name: "NeteaseWorkspaceDialog",
  setup(D) {
    const s = E(!document.hidden), g = R(() => N.visible && s.value), d = Be(() => g.value), o = d.state, C = E(!1);
    function U() {
      C.value = !0, d.startQr();
    }
    function Q() {
      d.startQr();
    }
    async function F() {
      typeof localStorage < "u" && (localStorage.setItem("netease_explicit_logout", "true"), Z(X), Z(G)), await d.logout(), w.neteaseUser = null, w.neteaseSongs = [], w.neteasePlaylists = [], C.value = !0, d.startQr();
    }
    K(
      () => o.neteaseUser?.nickname,
      (a) => {
        a && (C.value = !1);
      }
    );
    const L = E(null), h = E(""), x = E(!1);
    let b = null;
    const _ = E([]);
    try {
      const a = localStorage.getItem("netease_search_history");
      if (a) {
        const t = JSON.parse(a);
        Array.isArray(t) && (_.value = t.slice(0, 15));
      }
    } catch {
    }
    function H(a) {
      const t = a.trim();
      if (t) {
        _.value = [t, ..._.value.filter((i) => i !== t)].slice(0, 15);
        try {
          localStorage.setItem("netease_search_history", JSON.stringify(_.value));
        } catch {
        }
      }
    }
    function ee(a) {
      _.value = _.value.filter((t) => t !== a);
      try {
        localStorage.setItem("netease_search_history", JSON.stringify(_.value));
      } catch {
      }
    }
    function V() {
      _.value = [];
      try {
        localStorage.removeItem("netease_search_history");
      } catch {
      }
    }
    function te(a) {
      h.value = a, x.value = !1, d.search(a);
    }
    function z(a) {
      a.target?.closest(".ms-netease-search-wrap") || (x.value = !1);
    }
    const S = E(!1), T = R(() => o.neteasePlaylists.find((a) => a.name?.includes("喜欢的音乐") || a.specialType === 5)), se = R(() => {
      const a = T.value;
      return a ? o.neteasePlaylists.filter((t) => t.id !== a.id) : o.neteasePlaylists;
    }), q = R(() => S.value || r.value ? !1 : T.value && o.neteaseActivePlaylist?.id === T.value.id);
    function n() {
      d.pause(), S.value = !1;
      const a = T.value;
      a ? d.selectPlaylist(a) : o.neteasePlaylists[0] && d.selectPlaylist(o.neteasePlaylists[0]);
    }
    const r = R(() => h.value.trim().length > 0 && o.neteaseSearchResults.length > 0), y = R(() => r.value ? o.neteaseSearchResults : S.value ? o.neteaseRecentSongs : o.neteaseSongs), u = E(1), c = R(() => Math.max(1, Math.ceil(y.value.length / Y))), A = R(() => {
      const a = (u.value - 1) * Y;
      return y.value.slice(a, a + Y);
    });
    K(
      () => [o.neteaseActivePlaylist?.id, r.value, S.value],
      () => {
        u.value = 1;
      }
    ), K(c, (a) => {
      u.value > a && (u.value = Math.max(1, a));
    });
    function B() {
      u.value > 1 && u.value--;
    }
    function k() {
      u.value < c.value && u.value++;
    }
    const he = R(() => w.mode === "shuffle" ? "🔀" : w.mode === "one" ? "🔂" : "🔁");
    function _e() {
      ye.minimize("music");
    }
    function be() {
      ye.close("music");
    }
    function Se() {
      d.pause(), S.value = !0, o.neteaseActivePlaylist = null;
    }
    function we(a) {
      S.value = !1, d.selectPlaylist(a);
    }
    function ke() {
      d.pause(), b && clearTimeout(b), b = setTimeout(() => {
        if (!g.value) return;
        const a = h.value.trim();
        a && H(a), d.search(h.value);
      }, 400);
    }
    function Ce() {
      b && clearTimeout(b);
      const a = h.value.trim();
      a && H(a), x.value = !1, d.search(h.value);
    }
    function xe() {
      d.pause(), h.value = "", o.neteaseSearchResults = [];
    }
    function ie(a) {
      $.playNeteaseTrack(a);
    }
    function O(a) {
      return !!(a.id && String(a.id) === String(ge.getState().currentSong?.neteaseId) || a.cid && String(a.cid) === String(ge.getState().currentSong?.cid));
    }
    function Ae(a) {
      return a.picUrl || a.coverUrl || a.al?.picUrl || a.album?.picUrl || ze;
    }
    function oe(a) {
      const t = a.ar || a.artists;
      return Array.isArray(t) && t.length ? t.map((i) => i.name).join(", ") : "未知歌手";
    }
    function le(a) {
      const t = a.dt || a.duration || 0, i = Math.floor(t > 1e3 ? t / 1e3 : t), I = Math.floor(i / 60), me = i % 60;
      return `${I}:${String(me).padStart(2, "0")}`;
    }
    function Pe(a) {
      const t = Number(a.target.value);
      $.seek(t);
    }
    function Re() {
      d.refresh();
    }
    function ae() {
      d.pause(), b && clearTimeout(b), b = null, x.value = !1, document.removeEventListener("click", z);
    }
    const Ue = Fe(ae);
    let re = !1;
    function ce() {
      !re && g.value && (re = !0, d.refresh());
    }
    function ue() {
      s.value = !document.hidden;
    }
    function de() {
      d.syncLocal();
    }
    function ve() {
      d.accountChanged();
    }
    return K(g, (a) => {
      a ? (d.syncLocal(), document.addEventListener("click", z), ce()) : ae();
    }, { flush: "sync" }), Ee(() => {
      document.addEventListener("visibilitychange", ue), window.addEventListener("netease:recent-updated", de), window.addEventListener("netease:account-updated", ve), d.syncLocal(), g.value && (document.addEventListener("click", z), ce());
    }), Qe(() => {
      ae(), Ue(), d.dispose(), document.removeEventListener("visibilitychange", ue), window.removeEventListener("netease:recent-updated", de), window.removeEventListener("netease:account-updated", ve);
    }), (a, t) => (v(), Te(We, {
      id: "music-workspace",
      "window-id": "music",
      title: "网易云模块",
      icon: "🎵",
      visible: l(N).visible,
      "default-width": 960,
      "default-height": 640,
      "min-width": 480,
      "min-height": 360,
      "custom-class": "ms-panel ms-source-netease",
      onMinimize: _e,
      onClose: be
    }, {
      default: qe(() => [
        e("div", Oe, [
          e("div", Ke, [
            e("div", je, [
              l(o).neteaseUser?.nickname ? (v(), m(M, { key: 0 }, [
                e("img", {
                  class: "ms-netease-avatar",
                  src: l(o).neteaseUser.avatarUrl || us,
                  alt: "avatar"
                }, null, 8, Je),
                e("div", Ye, [
                  e("span", Ge, [
                    j(f(l(o).neteaseUser.nickname) + " ", 1),
                    l(o).neteaseUser.isVip ? (v(), m("span", Xe, "VIP")) : P("", !0)
                  ]),
                  t[12] || (t[12] = e("span", { class: "ms-netease-status-text" }, "已连接网易云音乐账户", -1))
                ])
              ], 64)) : (v(), m("div", Ze, [...t[13] || (t[13] = [
                e("span", { class: "ms-netease-name" }, "免登录模式", -1),
                e("span", { class: "ms-netease-status-text" }, "畅听精选榜单与全网搜索", -1)
              ])]))
            ]),
            e("div", et, [
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                disabled: l(N).pendingWrites > 0,
                onClick: Re
              }, "⟳ 刷新列表", 8, tt),
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                style: { color: "#f43f5e", "border-color": "rgba(244, 63, 94, 0.4)", "font-weight": "600" },
                onClick: U
              }, " 📱 扫码登录 "),
              l(o).neteaseUser?.nickname ? (v(), m("button", {
                key: 0,
                type: "button",
                class: "ms-netease-logout-btn",
                onClick: F
              }, " 退出登录 ")) : P("", !0)
            ])
          ]),
          C.value ? (v(), m("div", {
            key: 0,
            class: "ms-netease-qr-modal-overlay",
            onClick: t[2] || (t[2] = ne((i) => C.value = !1, ["self"]))
          }, [
            e("div", st, [
              e("header", at, [
                t[14] || (t[14] = e("div", { class: "ms-qr-card-title" }, [
                  e("span", { class: "ms-qr-logo" }, "📱"),
                  e("strong", null, "网易云音乐 · 扫码登录")
                ], -1)),
                e("button", {
                  type: "button",
                  class: "ms-qr-close-btn",
                  title: "关闭扫码",
                  onClick: t[0] || (t[0] = (i) => C.value = !1)
                }, "✕")
              ]),
              e("div", nt, [
                e("div", it, [
                  l(o).neteaseQrImg ? (v(), m("img", {
                    key: 0,
                    class: "ms-netease-qr-img",
                    src: l(o).neteaseQrImg,
                    alt: "网易云扫码"
                  }, null, 8, ot)) : (v(), m("div", lt, [...t[15] || (t[15] = [
                    e("div", { class: "ms-netease-spinner" }, null, -1),
                    e("small", null, "正在获取官方二维码…", -1)
                  ])]))
                ]),
                e("div", rt, [
                  e("strong", ct, f(l(o).neteaseQrStatus || "请使用网易云音乐 App 扫码登录"), 1),
                  t[16] || (t[16] = e("small", null, [
                    j("打开手机网易云音乐 App 首页顶部 "),
                    e("strong", null, "[ 扫一扫 ]"),
                    j(" 授权")
                  ], -1))
                ]),
                e("div", ut, [
                  e("button", {
                    type: "button",
                    class: "ms-page-btn",
                    onClick: Q
                  }, " 🔄 刷新二维码 "),
                  e("button", {
                    type: "button",
                    class: "ms-page-btn",
                    style: { color: "var(--muted)" },
                    onClick: t[1] || (t[1] = (i) => C.value = !1)
                  }, " 关闭 ")
                ])
              ])
            ])
          ])) : P("", !0),
          e("div", dt, [
            e("div", vt, [
              t[21] || (t[21] = e("div", { class: "ms-netease-section-title" }, "我的歌单 & 精选推荐", -1)),
              e("button", {
                type: "button",
                class: W(["ms-netease-pl-item ms-netease-pl-favorites", { active: q.value }]),
                onClick: n
              }, [
                t[18] || (t[18] = e("div", {
                  class: "ms-netease-pl-icon-box",
                  style: { background: "rgba(244, 63, 94, 0.15)", color: "#f43f5e" }
                }, "❤️", -1)),
                e("div", mt, [
                  t[17] || (t[17] = e("div", { class: "ms-netease-pl-name" }, "我喜欢的音乐", -1)),
                  e("div", ft, f((T.value?.trackCount ?? l(o).neteaseSongs.length) || 0) + " 首曲目", 1)
                ])
              ], 2),
              e("button", {
                type: "button",
                class: W(["ms-netease-pl-item ms-netease-pl-recent", { active: S.value }]),
                onClick: Se
              }, [
                t[20] || (t[20] = e("div", { class: "ms-netease-pl-icon-box" }, "🕒", -1)),
                e("div", pt, [
                  t[19] || (t[19] = e("div", { class: "ms-netease-pl-name" }, "最近播放记录", -1)),
                  e("div", gt, f(l(o).neteaseRecentSongs.length) + " 首曲目", 1)
                ])
              ], 2),
              (v(!0), m(M, null, J(se.value, (i) => (v(), m("button", {
                key: i.id,
                type: "button",
                class: W(["ms-netease-pl-item", { active: !S.value && !q.value && l(o).neteaseActivePlaylist?.id === i.id }]),
                onClick: (I) => we(i)
              }, [
                e("img", {
                  class: "ms-netease-pl-cover",
                  src: i.coverImgUrl,
                  alt: "",
                  loading: "lazy"
                }, null, 8, ht),
                e("div", _t, [
                  e("div", bt, f(i.name), 1),
                  e("div", St, f(i.trackCount || 0) + " 首曲目", 1)
                ])
              ], 10, yt))), 128))
            ]),
            e("div", wt, [
              e("div", {
                class: "ms-netease-search-wrap",
                ref_key: "searchWrapRef",
                ref: L
              }, [
                Me(e("input", {
                  type: "text",
                  class: "ms-netease-search-input",
                  placeholder: "全网搜索网易云单曲、歌手名或专辑…",
                  "onUpdate:modelValue": t[3] || (t[3] = (i) => h.value = i),
                  onKeydown: $e(Ce, ["enter"]),
                  onInput: ke,
                  onFocus: t[4] || (t[4] = (i) => x.value = !0)
                }, null, 544), [
                  [Ne, h.value]
                ]),
                x.value && !h.value.trim() ? (v(), m("div", {
                  key: 0,
                  class: "ms-netease-search-dropdown",
                  onMousedown: t[6] || (t[6] = ne(() => {
                  }, ["prevent"]))
                }, [
                  _.value.length > 0 ? (v(), m("div", kt, [
                    e("div", { class: "ms-dropdown-head" }, [
                      t[22] || (t[22] = e("span", { class: "ms-dropdown-title" }, "🔍 搜索历史", -1)),
                      e("button", {
                        type: "button",
                        class: "ms-dropdown-clear",
                        onClick: V
                      }, "清空")
                    ]),
                    e("div", Ct, [
                      (v(!0), m(M, null, J(_.value, (i) => (v(), m("span", {
                        key: "hist-" + i,
                        class: "ms-search-tag",
                        onClick: (I) => te(i)
                      }, [
                        j(f(i) + " ", 1),
                        e("b", {
                          class: "ms-tag-del",
                          onClick: ne((I) => ee(i), ["stop"])
                        }, "×", 8, At)
                      ], 8, xt))), 128))
                    ])
                  ])) : P("", !0),
                  l(o).neteaseRecentSongs.length > 0 ? (v(), m("div", Pt, [
                    e("div", Rt, [
                      t[23] || (t[23] = e("span", { class: "ms-dropdown-title" }, "🕒 历史听歌记录", -1)),
                      e("button", {
                        type: "button",
                        class: "ms-dropdown-clear",
                        onClick: t[5] || (t[5] = (i) => l(d).clearRecent())
                      }, "清空")
                    ]),
                    e("div", Ut, [
                      (v(!0), m(M, null, J(l(o).neteaseRecentSongs.slice(0, 8), (i) => (v(), m("div", {
                        key: "drop-rec-" + i.id,
                        class: W(["ms-recent-dropdown-item", { playing: O(i) }]),
                        onClick: (I) => {
                          ie(i), x.value = !1;
                        }
                      }, [
                        e("span", It, f(O(i) ? "▶" : "♫"), 1),
                        e("span", Et, f(i.name), 1),
                        e("span", Qt, f(oe(i)), 1),
                        e("span", Tt, f(le(i)), 1)
                      ], 10, Lt))), 128))
                    ])
                  ])) : P("", !0),
                  !_.value.length && !l(o).neteaseRecentSongs.length ? (v(), m("div", qt, " 暂无搜索与播放历史，输入歌名或歌手即可开始畅听 ")) : P("", !0)
                ], 32)) : P("", !0)
              ], 512),
              l(o).message ? (v(), m("div", Mt, [
                e("span", null, f(l(o).message), 1)
              ])) : P("", !0),
              e("div", $t, [
                e("div", null, [
                  e("div", Nt, f(r.value ? `搜索结果 (${l(o).neteaseSearchResults.length})` : S.value ? `最近播放记录 (${l(o).neteaseRecentSongs.length})` : q.value ? `我喜欢的音乐 (${l(o).neteaseSongs.length})` : l(o).neteaseActivePlaylist?.name || "我喜欢的音乐"), 1),
                  e("div", Dt, f(r.value ? "网易云曲库实时检索" : S.value ? "近期点播收听的历史歌曲" : q.value ? "个人云端红心曲库，点击即可一键开始高保真串流播放" : "点击歌曲即可一键开始高保真串流播放"), 1)
                ]),
                r.value ? (v(), m("button", {
                  key: 0,
                  type: "button",
                  class: "ms-netease-logout-btn",
                  onClick: xe
                }, "清除搜索")) : S.value && l(o).neteaseRecentSongs.length > 0 ? (v(), m("button", {
                  key: 1,
                  type: "button",
                  class: "ms-netease-logout-btn",
                  onClick: t[7] || (t[7] = (i) => l(d).clearRecent())
                }, "清空记录")) : P("", !0)
              ]),
              l(o).neteaseLoading ? (v(), m("div", Ft, [...t[24] || (t[24] = [
                e("div", { class: "ms-netease-spinner" }, null, -1),
                e("div", { class: "ms-netease-loading-tip" }, "正在同步网易云音源与歌单…", -1)
              ])])) : (v(), m(M, { key: 2 }, [
                (v(!0), m(M, null, J(A.value, (i, I) => (v(), m("div", {
                  key: i.id || I,
                  class: W(["ms-netease-track-row", { playing: O(i) }]),
                  onClick: (me) => ie(i)
                }, [
                  e("span", zt, f(O(i) ? "▶" : (u.value - 1) * Y + I + 1), 1),
                  e("img", {
                    class: "ms-netease-track-cover",
                    src: Ae(i),
                    alt: "",
                    loading: "lazy"
                  }, null, 8, Wt),
                  e("div", Ht, [
                    e("div", Bt, f(i.name), 1),
                    e("div", Ot, f(oe(i)), 1)
                  ]),
                  e("span", Kt, f(le(i)), 1)
                ], 10, Vt))), 128)),
                y.value.length ? P("", !0) : (v(), m("div", jt, " 未找到曲目，可尝试在上方搜索框输入关键词 ")),
                c.value > 1 ? (v(), m("div", Jt, [
                  e("span", Yt, " 第 " + f(u.value) + " / " + f(c.value) + " 页 · 共 " + f(y.value.length) + " 首 ", 1),
                  e("div", Gt, [
                    e("button", {
                      type: "button",
                      class: "ms-page-btn",
                      disabled: u.value <= 1,
                      title: "上一页",
                      onClick: B
                    }, " ◀ 上一页 ", 8, Xt),
                    e("button", {
                      type: "button",
                      class: "ms-page-btn",
                      disabled: u.value >= c.value,
                      title: "下一页",
                      onClick: k
                    }, " 下一页 ▶ ", 8, Zt)
                  ])
                ])) : P("", !0)
              ], 64))
            ])
          ])
        ]),
        e("footer", es, [
          e("img", {
            src: l(w).coverUrl || l(Ve),
            alt: "",
            style: { width: "42px", height: "42px", "border-radius": "8px", "object-fit": "cover", "flex-shrink": "0" }
          }, null, 8, ts),
          e("div", ss, [
            e("div", as, [
              e("span", ns, f(l(w).title || "暂无播放曲目"), 1),
              e("span", is, f(l(w).formattedCurrent) + " / " + f(l(w).formattedDuration), 1)
            ]),
            e("input", {
              type: "range",
              min: "0",
              max: "100",
              step: "0.1",
              value: l(w).progressPercent,
              onInput: Pe,
              style: { width: "100%", height: "4px", "accent-color": "#f43f5e", cursor: "pointer" }
            }, null, 40, os)
          ]),
          e("div", ls, [
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[8] || (t[8] = (i) => l($).prev()),
              title: "上一首"
            }, "⏮"),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              style: { background: "#f43f5e", color: "#fff", "border-color": "#f43f5e" },
              onClick: t[9] || (t[9] = (i) => l($).togglePlay()),
              title: l(w).playing ? "暂停" : "播放"
            }, f(l(w).playing ? "⏸" : "▶"), 9, rs),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[10] || (t[10] = (i) => l($).next()),
              title: "下一首"
            }, "⏭"),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[11] || (t[11] = (i) => l($).cycleMode()),
              title: l(w).mode
            }, f(he.value), 9, cs)
          ])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
}), ys = /* @__PURE__ */ He(ds, [["__scopeId", "data-v-aa4ae3a0"]]);
export {
  ys as default
};
