import { r as tt, d as st, w as te, B as nt, K as at, j as it, H as ot, u as i, s as w, b as A, o as l, i as e, e as c, F as L, m as Ae, t as o, f as U, A as N, g as D, l as xe, n as Pe, h as he, k as lt } from "./vendor-vue-BkY5-p5y.js";
import { u as ct } from "./useMachine-DdzsCIFB.js";
import { t as M, _ as rt } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
import { V as f } from "./search.service-DF5Rt2Wp.js";
import { X as Re, Y as se, Z as ne, _ as ae, j as J, $ as ut, a0 as Le, a1 as dt, a2 as Y, i as p, a3 as pe, h as H, O as I, a4 as vt } from "./view-styles-yuz8wQEV.js";
import { A as mt } from "./AppWindowFrame-Djt1Bcfh.js";
import { w as Ue } from "./window-manager.store-fHSi_Uh8.js";
function ht(F) {
  const a = tt({
    neteaseUser: null,
    neteasePlaylists: [],
    neteaseActivePlaylist: null,
    neteaseSongs: [],
    neteaseSearchResults: [],
    neteaseRecentSongs: [],
    neteaseLoading: !1,
    message: ""
  });
  let b = !1, m = 0, r, q;
  function T() {
    if (!b) {
      if (a.neteaseUser = f.getUser(), a.neteaseRecentSongs = f.getRecentSongs(), !a.neteasePlaylists.length)
        try {
          const u = Re(se);
          if (u.length && Array.isArray(u) && u.length) {
            a.neteasePlaylists = u;
            const d = u.find((g) => g.name?.includes("喜欢的音乐") || g.specialType === 5) || u[0];
            d && !a.neteaseActivePlaylist && (a.neteaseActivePlaylist = d);
          }
        } catch {
        }
      if (!a.neteaseSongs.length)
        try {
          const u = Re(ne);
          u.length && Array.isArray(u) && u.length && (a.neteaseSongs = u);
        } catch {
        }
    }
  }
  function x() {
    m++, r?.abort(), r = void 0, a.neteaseLoading = !1, q !== void 0 && clearTimeout(q), q = void 0;
  }
  async function B(u) {
    if (b || !F()) return;
    if (J.pendingWrites) {
      a.message = "音乐操作正在处理，请稍候；未自动排队。";
      return;
    }
    x();
    const d = new AbortController(), g = m;
    r = d, a.neteaseLoading = !0, a.message = "";
    const v = () => !b && F() && m === g && !d.signal.aborted;
    try {
      await f.whenReady(), v() && await u(d.signal, v);
    } catch (h) {
      v() && (a.message = h?.message || "读取失败，请检查节点设置或网络后手动重试。");
    } finally {
      r === d && (r = void 0, a.neteaseLoading = !1);
    }
  }
  async function V(u, d, g = 500, v = 0) {
    try {
      const h = await f.request("/playlist/track/all", { id: u, limit: g, offset: v }, d);
      if (h.songs?.length) return h.songs;
    } catch {
      d.throwIfAborted();
    }
    return v === 0 ? (await f.request("/playlist/detail", { id: u }, d)).playlist?.tracks || [] : [];
  }
  async function j() {
    await B(async (u, d) => {
      T();
      const v = a.neteaseUser?.uid;
      let h = [];
      if (v)
        try {
          h = (await f.request("/user/playlist", { uid: v, limit: 100 }, u)).playlist || [];
        } catch (k) {
          d() && (a.message = k?.message || "官网歌单读取失败，请重新连接账户。");
          return;
        }
      if (!h.length)
        try {
          h = (await f.request("/toplist", {}, u)).list || [];
        } catch {
        }
      if (!d()) return;
      if (h.length) {
        a.neteasePlaylists = h;
        try {
          Le(se, h);
        } catch {
        }
      }
      const S = h.find((k) => k.id === a.neteaseActivePlaylist?.id) || h.find((k) => k.name?.includes("喜欢的音乐") || k.specialType === 5) || h[0];
      if (!S) return;
      if (!a.neteaseSongs.length)
        try {
          const k = await V(S.id, u, 10, 0);
          d() && !a.neteaseSongs.length && (a.neteaseActivePlaylist = S, a.neteaseSongs = k, a.neteaseLoading = !1);
        } catch {
        }
      const y = await V(S.id, u, 500, 0);
      if (d() && (a.neteaseActivePlaylist = S, a.neteaseSongs = y, S.name?.includes("喜欢的音乐") || S.specialType === 5))
        try {
          Le(ne, y);
        } catch {
        }
    });
  }
  async function oe(u) {
    await B(async (d, g) => {
      const v = f.getUser()?.uid;
      if (a.neteaseActivePlaylist = u, !a.neteaseSongs.length || a.neteaseActivePlaylist?.id !== u.id)
        try {
          const S = await V(u.id, d, 10, 0);
          g() && v === f.getUser()?.uid && (!a.neteaseSongs.length || a.neteaseActivePlaylist?.id !== u.id) && (a.neteaseSongs = S, a.neteaseLoading = !1);
        } catch {
        }
      const h = await V(u.id, d, 500, 0);
      g() && v === f.getUser()?.uid && (a.neteaseActivePlaylist = u, a.neteaseSongs = h);
    });
  }
  async function P(u) {
    if (!u.trim()) {
      x(), a.neteaseSearchResults = [];
      return;
    }
    await B(async (d, g) => {
      a.neteaseSearchResults = [];
      const v = f.getUser()?.uid;
      let h = [];
      try {
        h = (await f.request("/cloudsearch", { keywords: u.trim(), type: 1, limit: 60 }, d)).result?.songs || [];
      } catch {
        d.throwIfAborted();
      }
      h.length || (h = (await f.request("/search", { keywords: u.trim(), limit: 60 }, d)).result?.songs || []), g() && v === f.getUser()?.uid && (a.neteaseSearchResults = h);
    });
  }
  async function E(u) {
    if (!(b || !F())) {
      if (J.pendingWrites) {
        a.message = "音乐操作正在处理，请稍候；未自动排队。";
        return;
      }
      try {
        await ut(u);
      } catch {
        b || (a.message = "操作未完整完成，部分变更可能已保存，请重读核对；未自动重试。");
      }
    }
  }
  async function $() {
    if (b || !F()) throw new Error("请先打开网易云模块。");
    x(), await f.connectWebsiteAccount(), ae(se), ae(ne), !(b || !F()) && (T(), await j());
  }
  async function C() {
    if (x(), typeof localStorage < "u")
      try {
        localStorage.setItem("netease_explicit_logout", "true"), ae(ne), ae(se);
      } catch {
      }
    await E(async () => {
      await f.logout(), a.neteaseUser = null, a.neteasePlaylists = [], a.neteaseActivePlaylist = null, a.neteaseSongs = [], a.neteaseSearchResults = [], a.message = "已断开插件账户；可点击「连接官网账户」重新连接，不影响官网登录。";
    });
  }
  async function G() {
    await E(async () => {
      await f.connectWebsiteAccount(), await f.fetchAccountRecentSongs(60), T(), j(), a.message = "✓ 账号历史与歌单已同步刷新！";
    });
  }
  async function le() {
    await E(async () => {
      await f.clearRecentSongs(), T();
    });
  }
  function ce() {
    b || (x(), T(), a.neteasePlaylists = [], a.neteaseSongs = [], a.neteaseSearchResults = [], a.neteaseActivePlaylist = null, a.message = "账号资料发生变化，请核对；需要时手动刷新歌单。");
  }
  function re() {
    b = !0, x();
  }
  return { state: a, refresh: j, selectPlaylist: oe, search: P, connectWebsite: $, logout: C, clearRecent: le, syncLocal: T, pause: x, dispose: re, accountChanged: ce, syncHistory: G };
}
const pt = { class: "ms-source-pane ms-netease-source" }, gt = { class: "ms-netease-user-bar" }, ft = { class: "ms-netease-user-info" }, yt = ["src"], _t = { class: "ms-netease-meta" }, bt = { class: "ms-netease-name" }, kt = {
  key: 0,
  class: "ms-netease-vip-badge"
}, St = { class: "ms-netease-status-text" }, wt = {
  key: 1,
  class: "ms-netease-meta"
}, Ct = { class: "ms-netease-name" }, At = { class: "ms-netease-status-text" }, xt = { style: { display: "flex", gap: "8px", "align-items": "center" } }, Pt = ["disabled"], Rt = ["disabled"], Lt = { class: "ms-netease-body" }, Ut = { class: "ms-netease-playlists" }, Et = { class: "ms-netease-section-title" }, Mt = { class: "ms-netease-pl-info" }, Tt = { class: "ms-netease-pl-name" }, $t = { class: "ms-netease-pl-count" }, It = { class: "ms-netease-pl-info" }, Nt = { class: "ms-netease-pl-count" }, Wt = { class: "ms-netease-pl-info" }, Ot = { class: "ms-netease-pl-count" }, Dt = ["onClick"], Ft = ["src"], Vt = { class: "ms-netease-pl-info" }, zt = { class: "ms-netease-pl-name" }, Ht = { class: "ms-netease-pl-count" }, qt = { class: "ms-netease-tracks" }, Bt = { class: "ms-netease-tracks-head" }, jt = { class: "ms-netease-tracks-sub" }, Kt = {
  key: 0,
  class: "ms-rhine-search-wrap"
}, Qt = {
  key: 0,
  class: "ms-rhine-album-detail"
}, Yt = { class: "ms-rhine-detail-banner" }, Jt = ["src"], Gt = { class: "ms-rhine-detail-info" }, Xt = { class: "ms-rhine-detail-title" }, Zt = { class: "ms-rhine-detail-sub" }, es = {
  key: 0,
  class: "ms-netease-loading-box"
}, ts = {
  key: 1,
  class: "ms-rhine-track-list"
}, ss = ["onClick"], ns = { class: "ms-netease-track-idx" }, as = {
  key: 0,
  style: { color: "#f59e0b" }
}, is = { key: 1 }, os = { class: "ms-netease-track-info" }, ls = ["title"], cs = { class: "ms-netease-track-artist" }, rs = {
  class: "ms-netease-track-dur",
  style: { display: "flex", "align-items": "center", gap: "8px" }
}, us = ["title", "onClick"], ds = {
  key: 1,
  class: "ms-rhine-grid-wrap"
}, vs = {
  key: 0,
  class: "ms-dropdown-empty",
  style: { padding: "40px 0" }
}, ms = { class: "ms-rhine-album-grid" }, hs = ["onClick"], ps = { class: "ms-rhine-cover-wrap" }, gs = ["src"], fs = { class: "ms-rhine-meta" }, ys = ["title"], _s = {
  key: 0,
  class: "ms-netease-pagination-bar ms-rhine-pagination-bar"
}, bs = { class: "ms-pagination-info" }, ks = { class: "ms-pagination-btns" }, Ss = ["disabled"], ws = ["disabled"], Cs = ["onClick"], As = ["disabled"], xs = ["disabled"], Ps = {
  key: 0,
  class: "ms-dropdown-section"
}, Rs = { class: "ms-search-history-tags" }, Ls = ["onClick"], Us = ["onClick"], Es = {
  key: 1,
  class: "ms-dropdown-section"
}, Ms = { class: "ms-dropdown-head" }, Ts = { class: "ms-recent-dropdown-list" }, $s = ["onClick"], Is = { class: "ms-drop-play" }, Ns = { class: "ms-drop-title" }, Ws = { class: "ms-drop-artist" }, Os = { class: "ms-drop-dur" }, Ds = {
  key: 2,
  class: "ms-dropdown-empty"
}, Fs = {
  key: 0,
  class: "ms-netease-msg-banner"
}, Vs = { class: "ms-netease-tracks-head" }, zs = { class: "ms-netease-tracks-title" }, Hs = { class: "ms-netease-tracks-sub" }, qs = {
  key: 1,
  class: "ms-netease-loading-box"
}, Bs = ["onClick"], js = { class: "ms-netease-track-idx" }, Ks = ["src"], Qs = { class: "ms-netease-track-info" }, Ys = { class: "ms-netease-track-name" }, Js = { class: "ms-netease-track-artist" }, Gs = { class: "ms-netease-track-dur" }, Xs = {
  key: 0,
  style: { padding: "30px", "text-align": "center", color: "var(--muted)", "font-size": "13px" }
}, Zs = {
  key: 1,
  class: "ms-netease-pagination-bar"
}, en = { class: "ms-pagination-info" }, tn = { class: "ms-pagination-btns" }, sn = ["disabled"], nn = ["disabled"], an = { style: { display: "flex", "align-items": "center", gap: "12px", padding: "10px 16px", "border-top": "1px solid var(--border)", background: "var(--panel)" } }, on = ["src"], ln = { style: { flex: "1", "min-width": "0", display: "flex", "flex-direction": "column", gap: "4px" } }, cn = { style: { display: "flex", "justify-content": "space-between", "font-size": "12px" } }, rn = { style: { "font-weight": "600", "white-space": "nowrap", overflow: "hidden", "text-overflow": "ellipsis", color: "var(--heading)" } }, un = { style: { color: "var(--muted)", "font-size": "11px" } }, dn = ["value"], vn = { style: { display: "flex", "align-items": "center", gap: "6px" } }, mn = ["title"], hn = ["title"], pn = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23334155'/%3E%3Ccircle cx='32' cy='24' r='10' fill='%2364748b'/%3E%3Cpath d='M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16' fill='%2364748b'/%3E%3C/svg%3E", ge = 8, ie = 10, gn = /* @__PURE__ */ st({
  __name: "NeteaseWorkspaceDialog",
  setup(F) {
    const a = A(!document.hidden), b = w(() => J.visible && a.value), m = ht(() => b.value), r = m.state, q = ct(Y), T = w(() => q.value.phase === "connecting"), x = A("先在同一浏览器的网易云官网登录，再点击「连接官网账户」。无需音乐节点；插件断开不会退出官网。");
    function B() {
      typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: "https://music.163.com/" }) : window.open("https://music.163.com/", "_blank", "noopener,noreferrer");
    }
    async function V() {
      if (!T.value && Y.send({ type: "START_CONNECT" })) {
        x.value = "正在使用浏览器官网会话读取账户…";
        try {
          await m.connectWebsite();
          const s = f.getUser();
          Y.send({ type: "CONNECT_SUCCESS", user: s }), x.value = "官网账户已连接。若歌单读取失败，请查看列表提示。";
        } catch (s) {
          const t = s?.message || "官网账户连接失败，请确认已登录。";
          Y.send({ type: "CONNECT_FAILURE", message: t }), x.value = t;
        }
      }
    }
    async function j() {
      await m.logout(), Y.send({ type: "LOGOUT" }), p.neteaseUser = null, p.neteaseSongs = [], p.neteasePlaylists = [], x.value = "已断开插件账户，官网仍保持登录。";
    }
    const oe = A(null), P = A(""), E = A(!1);
    let $ = null;
    const C = A([]);
    try {
      const s = localStorage.getItem("netease_search_history");
      if (s) {
        const t = JSON.parse(s);
        Array.isArray(t) && (C.value = t.slice(0, 15));
      }
    } catch {
    }
    function G(s) {
      const t = s.trim();
      if (t) {
        C.value = [t, ...C.value.filter((n) => n !== t)].slice(0, 15);
        try {
          localStorage.setItem("netease_search_history", JSON.stringify(C.value));
        } catch {
        }
      }
    }
    function le(s) {
      C.value = C.value.filter((t) => t !== s);
      try {
        localStorage.setItem("netease_search_history", JSON.stringify(C.value));
      } catch {
      }
    }
    function ce() {
      C.value = [];
      try {
        localStorage.removeItem("netease_search_history");
      } catch {
      }
    }
    function re(s) {
      P.value = s, E.value = !1, m.search(s);
    }
    function u(s) {
      s.target?.closest(".ms-netease-search-wrap") || (E.value = !1);
    }
    const d = A(!1), g = A(!1), v = A(null), h = A(!1), S = A(""), y = A(1), k = w(() => {
      const s = p.albums || [], t = S.value.trim().toLowerCase();
      return t ? s.filter((n) => (n.name || "").toLowerCase().includes(t)) : s;
    }), W = w(() => Math.max(1, Math.ceil(k.value.length / ge))), Ee = w(() => {
      const s = (y.value - 1) * ge;
      return k.value.slice(s, s + ge);
    }), Me = w(() => {
      const s = W.value, t = y.value, n = [], _ = Math.max(1, t - 2), O = Math.min(s, t + 2);
      for (let me = _; me <= O; me++)
        n.push(me);
      return n;
    });
    te(S, () => {
      y.value = 1;
    });
    function Te() {
      m.pause(), g.value = !0, d.value = !1, v.value = null, (!p.albums || p.albums.length === 0) && I.getSirenAlbums().then((s) => {
        s?.length && (p.albums = s);
      });
    }
    async function $e(s) {
      if (v.value = s, !s._songs || !s._songs.length) {
        h.value = !0;
        try {
          const t = await I.getSirenAlbumDetail(s.cid);
          s._songs = t, v.value = { ...s, _songs: t };
        } catch (t) {
          console.warn("加载专辑曲目失败", t);
        } finally {
          h.value = !1;
        }
      }
    }
    function Ie(s) {
      if (v.value?._songs?.length) {
        const t = v.value._songs, n = t.findIndex((_) => String(_.cid) === String(s.cid));
        I.setQueue(t, n >= 0 ? n : 0, !0), p.activeAlbum = v.value;
      } else
        I.playSong(s);
    }
    function Ne(s) {
      const t = s._songs || [];
      t.length > 0 && (I.setQueue(t, 0, !0), p.activeAlbum = s);
    }
    function ue(s) {
      if (!p.playing) return !1;
      const t = I.getState().currentSong;
      return !!(t && String(t.cid) === String(s.cid));
    }
    function de(s) {
      return I.isLiked(s.cid);
    }
    function We(s, t) {
      t?.stopPropagation();
      const n = I.toggleLike(s);
      ue(s) && (p.liked = n);
    }
    const K = w(() => r.neteasePlaylists.find((s) => s.name?.includes("喜欢的音乐") || s.specialType === 5)), Oe = w(() => {
      const s = K.value;
      return s ? r.neteasePlaylists.filter((t) => t.id !== s.id) : r.neteasePlaylists;
    }), X = w(() => g.value || d.value || z.value ? !1 : K.value && r.neteaseActivePlaylist?.id === K.value.id);
    function De() {
      m.pause(), g.value = !1, v.value = null, d.value = !1;
      const s = K.value;
      s ? m.selectPlaylist(s) : r.neteasePlaylists[0] && m.selectPlaylist(r.neteasePlaylists[0]);
    }
    const z = w(() => P.value.trim().length > 0 && r.neteaseSearchResults.length > 0), Z = w(() => z.value ? r.neteaseSearchResults : d.value ? r.neteaseRecentSongs : r.neteaseSongs), R = A(1), Q = w(() => Math.max(1, Math.ceil(Z.value.length / ie))), Fe = w(() => {
      const s = (R.value - 1) * ie;
      return Z.value.slice(s, s + ie);
    });
    te(
      () => [r.neteaseActivePlaylist?.id, z.value, d.value],
      () => {
        R.value = 1;
      }
    ), te(Q, (s) => {
      R.value > s && (R.value = Math.max(1, s));
    });
    function Ve() {
      R.value > 1 && R.value--;
    }
    function ze() {
      R.value < Q.value && R.value++;
    }
    const He = w(() => p.mode === "shuffle" ? "🔀" : p.mode === "one" ? "🔂" : "🔁");
    function qe() {
      Ue.minimize("music");
    }
    function Be() {
      Ue.close("music");
    }
    function je() {
      m.pause(), g.value = !1, v.value = null, d.value = !0, r.neteaseActivePlaylist = null;
    }
    function Ke(s) {
      g.value = !1, v.value = null, d.value = !1, m.selectPlaylist(s);
    }
    function Qe() {
      m.pause(), $ && clearTimeout($), $ = setTimeout(() => {
        if (!b.value) return;
        const s = P.value.trim();
        s && G(s), m.search(P.value);
      }, 400);
    }
    function Ye() {
      $ && clearTimeout($);
      const s = P.value.trim();
      s && G(s), E.value = !1, m.search(P.value);
    }
    function Je() {
      m.pause(), P.value = "", r.neteaseSearchResults = [];
    }
    function fe(s) {
      H.playNeteaseTrack(s);
    }
    function ee(s) {
      return !!(s.id && String(s.id) === String(I.getState().currentSong?.neteaseId) || s.cid && String(s.cid) === String(I.getState().currentSong?.cid));
    }
    function Ge(s) {
      return s.picUrl || s.coverUrl || s.al?.picUrl || s.album?.picUrl || vt;
    }
    function ye(s) {
      const t = s.ar || s.artists;
      return Array.isArray(t) && t.length ? t.map((n) => n.name).join(", ") : "未知歌手";
    }
    function _e(s) {
      const t = s.dt || s.duration || 0, n = Math.floor(t > 1e3 ? t / 1e3 : t), _ = Math.floor(n / 60), O = n % 60;
      return `${_}:${String(O).padStart(2, "0")}`;
    }
    function Xe(s) {
      const t = Number(s.target.value);
      H.seek(t);
    }
    function Ze() {
      m.refresh();
    }
    function ve() {
      m.pause(), $ && clearTimeout($), $ = null, E.value = !1, document.removeEventListener("click", u);
    }
    const et = dt(ve);
    let be = !1;
    function ke() {
      !be && b.value && (be = !0, m.refresh());
    }
    function Se() {
      a.value = !document.hidden;
    }
    function we() {
      m.syncLocal();
    }
    function Ce() {
      m.accountChanged();
    }
    return te(b, (s) => {
      s ? (m.syncLocal(), document.addEventListener("click", u), ke()) : ve();
    }, { flush: "sync" }), nt(() => {
      document.addEventListener("visibilitychange", Se), window.addEventListener("netease:recent-updated", we), window.addEventListener("netease:account-updated", Ce), m.syncLocal(), b.value && (document.addEventListener("click", u), ke());
    }), at(() => {
      ve(), et(), m.dispose(), document.removeEventListener("visibilitychange", Se), window.removeEventListener("netease:recent-updated", we), window.removeEventListener("netease:account-updated", Ce);
    }), (s, t) => (l(), it(mt, {
      id: "music-workspace",
      "window-id": "music",
      title: i(M)("netease.title"),
      icon: "🎵",
      visible: i(J).visible,
      "default-width": 960,
      "default-height": 640,
      "min-width": 480,
      "min-height": 360,
      "custom-class": "ms-panel ms-source-netease",
      onMinimize: qe,
      onClose: Be
    }, {
      default: ot(() => [
        e("div", pt, [
          e("div", gt, [
            e("div", ft, [
              i(r).neteaseUser?.nickname ? (l(), c(L, { key: 0 }, [
                e("img", {
                  class: "ms-netease-avatar",
                  src: i(r).neteaseUser.avatarUrl || pn,
                  alt: "avatar"
                }, null, 8, yt),
                e("div", _t, [
                  e("span", bt, [
                    Ae(o(i(r).neteaseUser.nickname) + " ", 1),
                    i(r).neteaseUser.isVip ? (l(), c("span", kt, "VIP")) : U("", !0)
                  ]),
                  e("span", St, o(i(M)("netease.connected")), 1)
                ])
              ], 64)) : (l(), c("div", wt, [
                e("span", Ct, o(i(M)("netease.guestMode")), 1),
                e("span", At, o(i(M)("netease.guestSub")), 1)
              ]))
            ]),
            e("div", xt, [
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                disabled: i(J).pendingWrites > 0,
                onClick: Ze
              }, o(i(M)("netease.refreshList")), 9, Pt),
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                style: { color: "#f43f5e", "border-color": "rgba(244, 63, 94, 0.4)", "font-weight": "600" },
                onClick: B
              }, o(i(M)("netease.webLogin")), 1),
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                disabled: T.value,
                onClick: V
              }, o(T.value ? i(M)("netease.connecting") : i(M)("netease.connectWebsite")), 9, Rt),
              i(r).neteaseUser?.nickname ? (l(), c("button", {
                key: 0,
                type: "button",
                class: "ms-netease-logout-btn",
                onClick: j
              }, o(i(M)("netease.logout")), 1)) : U("", !0)
            ])
          ]),
          e("div", Lt, [
            e("div", Ut, [
              e("div", Et, o(i(M)("netease.officialSoundtrack")), 1),
              e("button", {
                type: "button",
                class: N(["ms-netease-pl-item ms-netease-pl-rhine", { active: g.value }]),
                onClick: Te
              }, [
                t[16] || (t[16] = e("div", {
                  class: "ms-netease-pl-icon-box",
                  style: { background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(234, 88, 12, 0.2))", color: "#f59e0b" }
                }, "💿", -1)),
                e("div", Mt, [
                  e("div", Tt, o(i(M)("netease.rhineMusic")), 1),
                  e("div", $t, o(i(p).albums?.length || 0) + " 张官方专辑", 1)
                ])
              ], 2),
              t[21] || (t[21] = e("div", { class: "ms-netease-section-title" }, "我的歌单 & 精选推荐", -1)),
              e("button", {
                type: "button",
                class: N(["ms-netease-pl-item ms-netease-pl-favorites", { active: X.value }]),
                onClick: De
              }, [
                t[18] || (t[18] = e("div", {
                  class: "ms-netease-pl-icon-box",
                  style: { background: "rgba(244, 63, 94, 0.15)", color: "#f43f5e" }
                }, "❤️", -1)),
                e("div", It, [
                  t[17] || (t[17] = e("div", { class: "ms-netease-pl-name" }, "我喜欢的音乐", -1)),
                  e("div", Nt, o((K.value?.trackCount ?? i(r).neteaseSongs.length) || 0) + " 首曲目", 1)
                ])
              ], 2),
              e("button", {
                type: "button",
                class: N(["ms-netease-pl-item ms-netease-pl-recent", { active: d.value }]),
                onClick: je
              }, [
                t[20] || (t[20] = e("div", { class: "ms-netease-pl-icon-box" }, "🕒", -1)),
                e("div", Wt, [
                  t[19] || (t[19] = e("div", { class: "ms-netease-pl-name" }, "最近播放记录", -1)),
                  e("div", Ot, o(i(r).neteaseRecentSongs.length) + " 首曲目", 1)
                ])
              ], 2),
              (l(!0), c(L, null, D(Oe.value, (n) => (l(), c("button", {
                key: n.id,
                type: "button",
                class: N(["ms-netease-pl-item", { active: !g.value && !d.value && !X.value && i(r).neteaseActivePlaylist?.id === n.id }]),
                onClick: (_) => Ke(n)
              }, [
                e("img", {
                  class: "ms-netease-pl-cover",
                  src: n.coverImgUrl,
                  alt: "",
                  loading: "lazy"
                }, null, 8, Ft),
                e("div", Vt, [
                  e("div", zt, o(n.name), 1),
                  e("div", Ht, o(n.trackCount || 0) + " 首曲目", 1)
                ])
              ], 10, Dt))), 128))
            ]),
            e("div", qt, [
              g.value ? (l(), c(L, { key: 0 }, [
                e("div", Bt, [
                  e("div", null, [
                    t[22] || (t[22] = e("div", { class: "ms-netease-tracks-title" }, "莱茵唱片 · 官方原声曲库", -1)),
                    e("div", jt, " 塞壬唱片 MSR 出品 · 共 " + o(i(p).albums?.length || 0) + " 张官方专辑 ", 1)
                  ]),
                  v.value ? U("", !0) : (l(), c("div", Kt, [
                    xe(e("input", {
                      "onUpdate:modelValue": t[0] || (t[0] = (n) => S.value = n),
                      type: "text",
                      class: "ms-rhine-search-input",
                      placeholder: "搜索专辑或艺术家…"
                    }, null, 512), [
                      [Pe, S.value]
                    ])
                  ]))
                ]),
                v.value ? (l(), c("div", Qt, [
                  e("header", Yt, [
                    e("button", {
                      type: "button",
                      class: "ms-rhine-back-btn",
                      onClick: t[1] || (t[1] = (n) => v.value = null)
                    }, " ‹ 返回专辑列表 "),
                    e("img", {
                      src: v.value.coverUrl || i(pe),
                      class: "ms-rhine-detail-cover",
                      alt: ""
                    }, null, 8, Jt),
                    e("div", Gt, [
                      t[23] || (t[23] = e("span", { class: "siren-badge" }, "OFFICIAL ALBUM", -1)),
                      e("h2", Xt, o(v.value.name), 1),
                      e("p", Zt, "塞壬唱片-MSR 出品 · 共 " + o(v.value._songs?.length || 0) + " 首曲目", 1),
                      e("button", {
                        type: "button",
                        class: "ms-rhine-play-album-btn",
                        onClick: t[2] || (t[2] = (n) => Ne(v.value))
                      }, " ▶ 播放整张专辑 ")
                    ])
                  ]),
                  h.value ? (l(), c("div", es, [...t[24] || (t[24] = [
                    e("div", { class: "ms-netease-spinner" }, null, -1),
                    e("div", { class: "ms-netease-loading-tip" }, "正在调取专辑曲目列表…", -1)
                  ])])) : (l(), c("div", ts, [
                    (l(!0), c(L, null, D(v.value._songs || [], (n, _) => (l(), c("button", {
                      key: n.cid,
                      type: "button",
                      class: N(["ms-netease-track-row", { playing: ue(n) }]),
                      onClick: (O) => Ie(n)
                    }, [
                      e("span", ns, [
                        ue(n) ? (l(), c("span", as, "▶")) : (l(), c("span", is, o(_ + 1), 1))
                      ]),
                      e("div", os, [
                        e("span", {
                          class: "ms-netease-track-name",
                          title: n.name
                        }, o(n.name), 9, ls),
                        e("span", cs, o((n.artists || []).join(", ") || "塞壬唱片"), 1)
                      ]),
                      e("div", rs, [
                        e("button", {
                          type: "button",
                          class: N(["siren-btn-icon", { liked: de(n) }]),
                          title: de(n) ? "取消收藏" : "收藏曲目",
                          onClick: he((O) => We(n, O), ["stop"])
                        }, o(de(n) ? "♥" : "♡"), 11, us)
                      ])
                    ], 10, ss))), 128))
                  ]))
                ])) : (l(), c("div", ds, [
                  k.value.length ? (l(), c(L, { key: 1 }, [
                    e("div", ms, [
                      (l(!0), c(L, null, D(Ee.value, (n) => (l(), c("div", {
                        key: n.cid,
                        class: "ms-rhine-album-card",
                        onClick: (_) => $e(n)
                      }, [
                        e("div", ps, [
                          e("img", {
                            src: n.coverUrl || i(pe),
                            class: "ms-rhine-cover",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, gs),
                          t[25] || (t[25] = e("div", { class: "ms-rhine-hover-play" }, "▶", -1))
                        ]),
                        e("div", fs, [
                          e("span", {
                            class: "ms-rhine-album-name",
                            title: n.name
                          }, o(n.name), 9, ys),
                          t[26] || (t[26] = e("span", { class: "ms-rhine-corp" }, "塞壬唱片 MSR", -1))
                        ])
                      ], 8, hs))), 128))
                    ]),
                    W.value > 1 ? (l(), c("div", _s, [
                      e("span", bs, " 第 " + o(y.value) + " / " + o(W.value) + " 页 · 共 " + o(k.value.length) + " 张专辑 ", 1),
                      e("div", ks, [
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: y.value <= 1,
                          title: "首页",
                          onClick: t[3] || (t[3] = (n) => y.value = 1)
                        }, " « ", 8, Ss),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: y.value <= 1,
                          title: "上一页",
                          onClick: t[4] || (t[4] = (n) => y.value = Math.max(1, y.value - 1))
                        }, " ◀ ", 8, ws),
                        (l(!0), c(L, null, D(Me.value, (n) => (l(), c("button", {
                          key: "rpage-" + n,
                          type: "button",
                          class: N(["ms-page-btn", { active: n === y.value }]),
                          onClick: (_) => y.value = n
                        }, o(n), 11, Cs))), 128)),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: y.value >= W.value,
                          title: "下一页",
                          onClick: t[5] || (t[5] = (n) => y.value = Math.min(W.value, y.value + 1))
                        }, " ▶ ", 8, As),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: y.value >= W.value,
                          title: "尾页",
                          onClick: t[6] || (t[6] = (n) => y.value = W.value)
                        }, " » ", 8, xs)
                      ])
                    ])) : U("", !0)
                  ], 64)) : (l(), c("div", vs, " 正在加载专辑或未找到匹配项… "))
                ]))
              ], 64)) : (l(), c(L, { key: 1 }, [
                e("div", {
                  class: "ms-netease-search-wrap",
                  ref_key: "searchWrapRef",
                  ref: oe
                }, [
                  xe(e("input", {
                    type: "text",
                    class: "ms-netease-search-input",
                    placeholder: "全网搜索网易云单曲、歌手名或专辑…",
                    "onUpdate:modelValue": t[7] || (t[7] = (n) => P.value = n),
                    onKeydown: lt(Ye, ["enter"]),
                    onInput: Qe,
                    onFocus: t[8] || (t[8] = (n) => E.value = !0)
                  }, null, 544), [
                    [Pe, P.value]
                  ]),
                  E.value && !P.value.trim() ? (l(), c("div", {
                    key: 0,
                    class: "ms-netease-search-dropdown",
                    onMousedown: t[10] || (t[10] = he(() => {
                    }, ["prevent"]))
                  }, [
                    C.value.length > 0 ? (l(), c("div", Ps, [
                      e("div", { class: "ms-dropdown-head" }, [
                        t[27] || (t[27] = e("span", { class: "ms-dropdown-title" }, "🔍 搜索历史", -1)),
                        e("button", {
                          type: "button",
                          class: "ms-dropdown-clear",
                          onClick: ce
                        }, "清空")
                      ]),
                      e("div", Rs, [
                        (l(!0), c(L, null, D(C.value, (n) => (l(), c("span", {
                          key: "hist-" + n,
                          class: "ms-search-tag",
                          onClick: (_) => re(n)
                        }, [
                          Ae(o(n) + " ", 1),
                          e("b", {
                            class: "ms-tag-del",
                            onClick: he((_) => le(n), ["stop"])
                          }, "×", 8, Us)
                        ], 8, Ls))), 128))
                      ])
                    ])) : U("", !0),
                    i(r).neteaseRecentSongs.length > 0 ? (l(), c("div", Es, [
                      e("div", Ms, [
                        t[28] || (t[28] = e("span", { class: "ms-dropdown-title" }, "🕒 历史听歌记录", -1)),
                        e("button", {
                          type: "button",
                          class: "ms-dropdown-clear",
                          onClick: t[9] || (t[9] = (n) => i(m).clearRecent())
                        }, "清空")
                      ]),
                      e("div", Ts, [
                        (l(!0), c(L, null, D(i(r).neteaseRecentSongs.slice(0, 8), (n) => (l(), c("div", {
                          key: "drop-rec-" + n.id,
                          class: N(["ms-recent-dropdown-item", { playing: ee(n) }]),
                          onClick: (_) => {
                            fe(n), E.value = !1;
                          }
                        }, [
                          e("span", Is, o(ee(n) ? "▶" : "♫"), 1),
                          e("span", Ns, o(n.name), 1),
                          e("span", Ws, o(ye(n)), 1),
                          e("span", Os, o(_e(n)), 1)
                        ], 10, $s))), 128))
                      ])
                    ])) : U("", !0),
                    !C.value.length && !i(r).neteaseRecentSongs.length ? (l(), c("div", Ds, " 暂无搜索与播放历史，输入歌名或歌手即可开始畅听 ")) : U("", !0)
                  ], 32)) : U("", !0)
                ], 512),
                i(r).message ? (l(), c("div", Fs, [
                  e("span", null, o(i(r).message), 1)
                ])) : U("", !0),
                e("div", Vs, [
                  e("div", null, [
                    e("div", zs, o(z.value ? `搜索结果 (${i(r).neteaseSearchResults.length})` : d.value ? `最近播放记录 (${i(r).neteaseRecentSongs.length})` : X.value ? `我喜欢的音乐 (${i(r).neteaseSongs.length})` : i(r).neteaseActivePlaylist?.name || "我喜欢的音乐"), 1),
                    e("div", Hs, o(z.value ? "网易云曲库实时检索" : d.value ? "近期点播收听的历史歌曲" : X.value ? "个人云端红心曲库，点击即可一键开始高保真串流播放" : "点击歌曲即可一键开始高保真串流播放"), 1)
                  ]),
                  z.value ? (l(), c("button", {
                    key: 0,
                    type: "button",
                    class: "ms-netease-logout-btn",
                    onClick: Je
                  }, "清除搜索")) : d.value && i(r).neteaseRecentSongs.length > 0 ? (l(), c("button", {
                    key: 1,
                    type: "button",
                    class: "ms-netease-logout-btn",
                    onClick: t[11] || (t[11] = (n) => i(m).clearRecent())
                  }, "清空记录")) : U("", !0)
                ]),
                i(r).neteaseLoading ? (l(), c("div", qs, [...t[29] || (t[29] = [
                  e("div", { class: "ms-netease-spinner" }, null, -1),
                  e("div", { class: "ms-netease-loading-tip" }, "正在同步网易云音源与歌单…", -1)
                ])])) : (l(), c(L, { key: 2 }, [
                  (l(!0), c(L, null, D(Fe.value, (n, _) => (l(), c("div", {
                    key: n.id || _,
                    class: N(["ms-netease-track-row", { playing: ee(n) }]),
                    onClick: (O) => fe(n)
                  }, [
                    e("span", js, o(ee(n) ? "▶" : (R.value - 1) * ie + _ + 1), 1),
                    e("img", {
                      class: "ms-netease-track-cover",
                      src: Ge(n),
                      alt: "",
                      loading: "lazy"
                    }, null, 8, Ks),
                    e("div", Qs, [
                      e("div", Ys, o(n.name), 1),
                      e("div", Js, o(ye(n)), 1)
                    ]),
                    e("span", Gs, o(_e(n)), 1)
                  ], 10, Bs))), 128)),
                  Z.value.length ? U("", !0) : (l(), c("div", Xs, " 未找到曲目，可尝试在上方搜索框输入关键词 ")),
                  Q.value > 1 ? (l(), c("div", Zs, [
                    e("span", en, " 第 " + o(R.value) + " / " + o(Q.value) + " 页 · 共 " + o(Z.value.length) + " 首 ", 1),
                    e("div", tn, [
                      e("button", {
                        type: "button",
                        class: "ms-page-btn",
                        disabled: R.value <= 1,
                        title: "上一页",
                        onClick: Ve
                      }, " ◀ 上一页 ", 8, sn),
                      e("button", {
                        type: "button",
                        class: "ms-page-btn",
                        disabled: R.value >= Q.value,
                        title: "下一页",
                        onClick: ze
                      }, " 下一页 ▶ ", 8, nn)
                    ])
                  ])) : U("", !0)
                ], 64))
              ], 64))
            ])
          ])
        ]),
        e("footer", an, [
          e("img", {
            src: i(p).coverUrl || i(pe),
            alt: "",
            style: { width: "42px", height: "42px", "border-radius": "8px", "object-fit": "cover", "flex-shrink": "0" }
          }, null, 8, on),
          e("div", ln, [
            e("div", cn, [
              e("span", rn, o(i(p).title || "暂无播放曲目"), 1),
              e("span", un, o(i(p).formattedCurrent) + " / " + o(i(p).formattedDuration), 1)
            ]),
            e("input", {
              type: "range",
              min: "0",
              max: "100",
              step: "0.1",
              value: i(p).progressPercent,
              onInput: Xe,
              style: { width: "100%", height: "4px", "accent-color": "#f43f5e", cursor: "pointer" }
            }, null, 40, dn)
          ]),
          e("div", vn, [
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[12] || (t[12] = (n) => i(H).prev()),
              title: "上一首"
            }, "⏮"),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              style: { background: "#f43f5e", color: "#fff", "border-color": "#f43f5e" },
              onClick: t[13] || (t[13] = (n) => i(H).togglePlay()),
              title: i(p).playing ? "暂停" : "播放"
            }, o(i(p).playing ? "⏸" : "▶"), 9, mn),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[14] || (t[14] = (n) => i(H).next()),
              title: "下一首"
            }, "⏭"),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[15] || (t[15] = (n) => i(H).cycleMode()),
              title: i(p).mode
            }, o(He.value), 9, hn)
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "visible"]));
  }
}), Cn = /* @__PURE__ */ rt(gn, [["__scopeId", "data-v-19b21609"]]);
export {
  Cn as default
};
