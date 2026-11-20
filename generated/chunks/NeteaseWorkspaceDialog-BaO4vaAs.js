import { r as et, d as tt, w as G, o as st, H as nt, f as o, l as at, B as it, h as e, u as i, g as c, F as E, m as xe, t as l, j as M, s as N, i as O, p as Pe, v as Re, k as pe, q as lt, x as A, b as P } from "./vendor-vue-BbmU9NUg.js";
import { u as ot } from "./useMachine-DhSfBarp.js";
import { t as $, _ as ct } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
import { a8 as y, a9 as Le, aa as se, ab as ne, ac as ae, k as le, ad as rt, ae as Ue, af as X, ag as ut, A as dt, B as vt, j as p, ah as fe, h as z, a1 as I, ai as mt } from "./search.service-DiFFcmm2.js";
import { A as ht } from "./AppWindowFrame-BGiK3atJ.js";
import { w as Ee } from "./window-manager.store-D9RSYghK.js";
function pt(V) {
  const a = et({
    neteaseUser: null,
    neteasePlaylists: [],
    neteaseActivePlaylist: null,
    neteaseSongs: [],
    neteaseSearchResults: [],
    neteaseRecentSongs: [],
    neteaseLoading: !1,
    message: ""
  });
  let _ = !1, m = 0, r, B;
  function T() {
    if (!_) {
      if (a.neteaseUser = y.getUser(), a.neteaseRecentSongs = y.getRecentSongs(), !a.neteasePlaylists.length)
        try {
          const u = Le(se);
          if (u.length && Array.isArray(u) && u.length) {
            a.neteasePlaylists = u;
            const d = u.find((f) => f.name?.includes("喜欢的音乐") || f.specialType === 5) || u[0];
            d && !a.neteaseActivePlaylist && (a.neteaseActivePlaylist = d);
          }
        } catch {
        }
      if (!a.neteaseSongs.length)
        try {
          const u = Le(ne);
          u.length && Array.isArray(u) && u.length && (a.neteaseSongs = u);
        } catch {
        }
    }
  }
  function R() {
    m++, r?.abort(), r = void 0, a.neteaseLoading = !1, B !== void 0 && clearTimeout(B), B = void 0;
  }
  async function H(u) {
    if (_ || !V()) return;
    if (le.pendingWrites) {
      a.message = "音乐操作正在处理，请稍候；未自动排队。";
      return;
    }
    R();
    const d = new AbortController(), f = m;
    r = d, a.neteaseLoading = !0, a.message = "";
    const v = () => !_ && V() && m === f && !d.signal.aborted;
    try {
      await y.whenReady(), v() && await u(d.signal, v);
    } catch (h) {
      v() && (a.message = h?.message || "读取失败，请检查节点设置或网络后手动重试。");
    } finally {
      r === d && (r = void 0, a.neteaseLoading = !1);
    }
  }
  async function q(u, d, f = 500, v = 0) {
    try {
      const h = await y.request("/playlist/track/all", { id: u, limit: f, offset: v }, d);
      if (h.songs?.length) return h.songs;
    } catch {
      d.throwIfAborted();
    }
    return v === 0 ? (await y.request("/playlist/detail", { id: u }, d)).playlist?.tracks || [] : [];
  }
  async function j() {
    await H(async (u, d) => {
      T();
      const v = a.neteaseUser?.uid;
      let h = [];
      if (v)
        try {
          h = (await y.request("/user/playlist", { uid: v, limit: 100 }, u)).playlist || [];
        } catch (w) {
          d() && (a.message = w?.message || "官网歌单读取失败，请重新连接账户。");
          return;
        }
      if (!h.length)
        try {
          h = (await y.request("/toplist", {}, u)).list || [];
        } catch {
        }
      if (!d()) return;
      if (h.length) {
        a.neteasePlaylists = h;
        try {
          Ue(se, h);
        } catch {
        }
      }
      const k = h.find((w) => w.id === a.neteaseActivePlaylist?.id) || h.find((w) => w.name?.includes("喜欢的音乐") || w.specialType === 5) || h[0];
      if (!k) return;
      if (!a.neteaseSongs.length)
        try {
          const w = await q(k.id, u, 10, 0);
          d() && !a.neteaseSongs.length && (a.neteaseActivePlaylist = k, a.neteaseSongs = w, a.neteaseLoading = !1);
        } catch {
        }
      const g = await q(k.id, u, 500, 0);
      if (d() && (a.neteaseActivePlaylist = k, a.neteaseSongs = g, k.name?.includes("喜欢的音乐") || k.specialType === 5))
        try {
          Ue(ne, g);
        } catch {
        }
    });
  }
  async function oe(u) {
    await H(async (d, f) => {
      const v = y.getUser()?.uid;
      if (a.neteaseActivePlaylist = u, !a.neteaseSongs.length || a.neteaseActivePlaylist?.id !== u.id)
        try {
          const k = await q(u.id, d, 10, 0);
          f() && v === y.getUser()?.uid && (!a.neteaseSongs.length || a.neteaseActivePlaylist?.id !== u.id) && (a.neteaseSongs = k, a.neteaseLoading = !1);
        } catch {
        }
      const h = await q(u.id, d, 500, 0);
      f() && v === y.getUser()?.uid && (a.neteaseActivePlaylist = u, a.neteaseSongs = h);
    });
  }
  async function C(u) {
    if (!u.trim()) {
      R(), a.neteaseSearchResults = [];
      return;
    }
    await H(async (d, f) => {
      a.neteaseSearchResults = [];
      const v = y.getUser()?.uid, h = await y.request("/cloudsearch", { keywords: u.trim(), type: 1, limit: 60 }, d);
      if (!Array.isArray(h?.result?.songs) && h?.result?.songs != null) throw new Error("网易云搜索结果格式异常，请稍后重试。");
      const k = h?.result?.songs || [];
      f() && v === y.getUser()?.uid && (a.neteaseSearchResults = k);
    });
  }
  async function L(u) {
    if (!(_ || !V())) {
      if (le.pendingWrites) {
        a.message = "音乐操作正在处理，请稍候；未自动排队。";
        return;
      }
      try {
        await rt(u);
      } catch {
        _ || (a.message = "操作未完整完成，部分变更可能已保存，请重读核对；未自动重试。");
      }
    }
  }
  async function b() {
    if (_ || !V()) throw new Error("请先打开网易云模块。");
    R(), await y.connectWebsiteAccount(), ae(se), ae(ne), !(_ || !V()) && (T(), await j());
  }
  async function x() {
    if (R(), typeof localStorage < "u")
      try {
        localStorage.setItem("netease_explicit_logout", "true"), ae(ne), ae(se);
      } catch {
      }
    await L(async () => {
      await y.logout(), a.neteaseUser = null, a.neteasePlaylists = [], a.neteaseActivePlaylist = null, a.neteaseSongs = [], a.neteaseSearchResults = [], a.message = "已断开插件账户；可点击「连接官网账户」重新连接，不影响官网登录。";
    });
  }
  async function K() {
    await L(async () => {
      await y.connectWebsiteAccount(), await y.fetchAccountRecentSongs(60), T(), j(), a.message = "✓ 账号历史与歌单已同步刷新！";
    });
  }
  async function ce() {
    await L(async () => {
      await y.clearRecentSongs(), T();
    });
  }
  function re() {
    _ || (R(), T(), a.neteasePlaylists = [], a.neteaseSongs = [], a.neteaseSearchResults = [], a.neteaseActivePlaylist = null, a.message = "账号资料发生变化，请核对；需要时手动刷新歌单。");
  }
  function ue() {
    _ = !0, R();
  }
  return { state: a, refresh: j, selectPlaylist: oe, search: C, connectWebsite: b, logout: x, clearRecent: ce, syncLocal: T, pause: R, dispose: ue, accountChanged: re, syncHistory: K };
}
const ft = { class: "ms-source-pane ms-netease-source" }, gt = { class: "ms-netease-user-bar" }, yt = { class: "ms-netease-user-info" }, _t = ["src"], bt = { class: "ms-netease-meta" }, kt = { class: "ms-netease-name" }, St = {
  key: 0,
  class: "ms-netease-vip-badge"
}, wt = { class: "ms-netease-status-text" }, Ct = {
  key: 1,
  class: "ms-netease-meta"
}, At = { class: "ms-netease-name" }, xt = { class: "ms-netease-status-text" }, Pt = { style: { display: "flex", gap: "8px", "align-items": "center" } }, Rt = ["disabled"], Lt = { class: "ms-netease-body" }, Ut = { class: "ms-netease-playlists" }, Et = { class: "ms-netease-section-title" }, Mt = { class: "ms-netease-pl-info" }, Tt = { class: "ms-netease-pl-name" }, $t = { class: "ms-netease-pl-count" }, It = { class: "ms-netease-pl-info" }, Nt = { class: "ms-netease-pl-count" }, Wt = { class: "ms-netease-pl-info" }, Dt = { class: "ms-netease-pl-count" }, Ft = ["onClick"], Ot = ["src"], Vt = { class: "ms-netease-pl-info" }, qt = { class: "ms-netease-pl-name" }, zt = { class: "ms-netease-pl-count" }, Bt = { class: "ms-netease-tracks" }, Ht = { class: "ms-netease-tracks-head" }, jt = { class: "ms-netease-tracks-sub" }, Kt = {
  key: 0,
  class: "ms-rhine-search-wrap"
}, Qt = {
  key: 0,
  class: "ms-rhine-album-detail"
}, Jt = { class: "ms-rhine-detail-banner" }, Yt = ["src"], Gt = { class: "ms-rhine-detail-info" }, Xt = { class: "ms-rhine-detail-title" }, Zt = { class: "ms-rhine-detail-sub" }, es = {
  key: 0,
  class: "ms-netease-loading-box"
}, ts = {
  key: 1,
  class: "ms-rhine-track-list"
}, ss = ["onClick"], ns = { class: "ms-netease-track-idx" }, as = {
  key: 0,
  style: { color: "#f59e0b" }
}, is = { key: 1 }, ls = { class: "ms-netease-track-info" }, os = ["title"], cs = { class: "ms-netease-track-artist" }, rs = {
  class: "ms-netease-track-dur",
  style: { display: "flex", "align-items": "center", gap: "8px" }
}, us = ["title", "onClick"], ds = {
  key: 1,
  class: "ms-rhine-grid-wrap"
}, vs = {
  key: 0,
  class: "ms-dropdown-empty",
  style: { padding: "40px 0" }
}, ms = { class: "ms-rhine-album-grid" }, hs = ["onClick"], ps = { class: "ms-rhine-cover-wrap" }, fs = ["src"], gs = { class: "ms-rhine-meta" }, ys = ["title"], _s = {
  key: 0,
  class: "ms-netease-pagination-bar ms-rhine-pagination-bar"
}, bs = { class: "ms-pagination-info" }, ks = { class: "ms-pagination-btns" }, Ss = ["disabled"], ws = ["disabled"], Cs = ["onClick"], As = ["disabled"], xs = ["disabled"], Ps = {
  key: 0,
  class: "ms-dropdown-section"
}, Rs = { class: "ms-search-history-tags" }, Ls = ["onClick"], Us = ["onClick"], Es = {
  key: 1,
  class: "ms-dropdown-section"
}, Ms = { class: "ms-dropdown-head" }, Ts = { class: "ms-recent-dropdown-list" }, $s = ["onClick"], Is = { class: "ms-drop-play" }, Ns = { class: "ms-drop-title" }, Ws = { class: "ms-drop-artist" }, Ds = { class: "ms-drop-dur" }, Fs = {
  key: 2,
  class: "ms-dropdown-empty"
}, Os = {
  key: 0,
  class: "ms-netease-msg-banner"
}, Vs = { class: "ms-netease-tracks-head" }, qs = { class: "ms-netease-tracks-title" }, zs = { class: "ms-netease-tracks-sub" }, Bs = {
  key: 1,
  class: "ms-netease-loading-box"
}, Hs = ["onClick"], js = { class: "ms-netease-track-idx" }, Ks = ["src"], Qs = { class: "ms-netease-track-info" }, Js = { class: "ms-netease-track-name" }, Ys = { class: "ms-netease-track-artist" }, Gs = { class: "ms-netease-track-dur" }, Xs = {
  key: 0,
  style: { padding: "30px", "text-align": "center", color: "var(--muted)", "font-size": "13px" }
}, Zs = {
  key: 1,
  class: "ms-netease-pagination-bar"
}, en = { class: "ms-pagination-info" }, tn = { class: "ms-pagination-btns" }, sn = ["disabled"], nn = ["disabled"], an = { style: { display: "flex", "align-items": "center", gap: "12px", padding: "10px 16px", "border-top": "1px solid var(--border)", background: "var(--panel)" } }, ln = ["src"], on = { style: { flex: "1", "min-width": "0", display: "flex", "flex-direction": "column", gap: "4px" } }, cn = { style: { display: "flex", "justify-content": "space-between", "font-size": "12px" } }, rn = { style: { "font-weight": "600", "white-space": "nowrap", overflow: "hidden", "text-overflow": "ellipsis", color: "var(--heading)" } }, un = { style: { color: "var(--muted)", "font-size": "11px" } }, dn = ["value"], vn = { style: { display: "flex", "align-items": "center", gap: "6px" } }, mn = ["title"], hn = ["title"], pn = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23334155'/%3E%3Ccircle cx='32' cy='24' r='10' fill='%2364748b'/%3E%3Cpath d='M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16' fill='%2364748b'/%3E%3C/svg%3E", ge = 8, ie = 10, fn = /* @__PURE__ */ tt({
  __name: "NeteaseWorkspaceDialog",
  setup(V) {
    const a = P(!document.hidden), _ = A(() => le.visible && a.value), m = pt(() => _.value), r = m.state, B = ot(X), T = A(() => B.value.phase === "connecting"), R = P("先在同一浏览器的网易云官网登录，再点击「连接官网账户」。无需音乐节点；插件断开不会退出官网。");
    function H() {
      typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: "https://music.163.com/" }) : window.open("https://music.163.com/", "_blank", "noopener,noreferrer");
    }
    async function q() {
      if (!T.value && X.send({ type: "START_CONNECT" })) {
        R.value = "正在使用浏览器官网会话读取账户…";
        try {
          await m.connectWebsite();
          const s = y.getUser();
          X.send({ type: "CONNECT_SUCCESS", user: s }), R.value = "官网账户已连接。若歌单读取失败，请查看列表提示。";
        } catch (s) {
          const t = s?.message || "官网账户连接失败，请确认已登录。";
          X.send({ type: "CONNECT_FAILURE", message: t }), R.value = t;
        }
      }
    }
    async function j() {
      await m.logout(), X.send({ type: "LOGOUT" }), p.neteaseUser = null, p.neteaseSongs = [], p.neteasePlaylists = [], R.value = "已断开插件账户，官网仍保持登录。";
    }
    const oe = P(null), C = P(""), L = P(!1);
    let b = null;
    const x = P([]);
    try {
      const s = localStorage.getItem("netease_search_history");
      if (s) {
        const t = JSON.parse(s);
        Array.isArray(t) && (x.value = t.slice(0, 15));
      }
    } catch {
    }
    function K(s) {
      const t = s.trim();
      if (t) {
        x.value = [t, ...x.value.filter((n) => n !== t)].slice(0, 15);
        try {
          localStorage.setItem("netease_search_history", JSON.stringify(x.value));
        } catch {
        }
      }
    }
    function ce(s) {
      x.value = x.value.filter((t) => t !== s);
      try {
        localStorage.setItem("netease_search_history", JSON.stringify(x.value));
      } catch {
      }
    }
    function re() {
      x.value = [];
      try {
        localStorage.removeItem("netease_search_history");
      } catch {
      }
    }
    function ue(s) {
      C.value = s, L.value = !1, m.search(s);
    }
    function u(s) {
      s.target?.closest(".ms-netease-search-wrap") || (L.value = !1);
    }
    const d = P(!1), f = P(!1), v = P(null), h = P(!1), k = P(""), g = P(1), w = A(() => {
      const s = p.albums || [], t = k.value.trim().toLowerCase();
      return t ? s.filter((n) => (n.name || "").toLowerCase().includes(t)) : s;
    }), W = A(() => Math.max(1, Math.ceil(w.value.length / ge))), Me = A(() => {
      const s = (g.value - 1) * ge;
      return w.value.slice(s, s + ge);
    }), Te = A(() => {
      const s = W.value, t = g.value, n = [], S = Math.max(1, t - 2), F = Math.min(s, t + 2);
      for (let he = S; he <= F; he++)
        n.push(he);
      return n;
    });
    G(k, () => {
      g.value = 1;
    });
    function $e() {
      m.pause(), f.value = !0, d.value = !1, v.value = null, (!p.albums || p.albums.length === 0) && I.getSirenAlbums().then((s) => {
        s?.length && (p.albums = s);
      });
    }
    async function Ie(s) {
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
    function Ne(s) {
      if (v.value?._songs?.length) {
        const t = v.value._songs, n = t.findIndex((S) => String(S.cid) === String(s.cid));
        I.setQueue(t, n >= 0 ? n : 0, !0), p.activeAlbum = v.value;
      } else
        I.playSong(s);
    }
    function We(s) {
      const t = s._songs || [];
      t.length > 0 && (I.setQueue(t, 0, !0), p.activeAlbum = s);
    }
    function de(s) {
      if (!p.playing) return !1;
      const t = I.getState().currentSong;
      return !!(t && String(t.cid) === String(s.cid));
    }
    function ve(s) {
      return I.isLiked(s.cid);
    }
    function De(s, t) {
      t?.stopPropagation();
      const n = I.toggleLike(s);
      de(s) && (p.liked = n);
    }
    const Q = A(() => r.neteasePlaylists.find((s) => s.name?.includes("喜欢的音乐") || s.specialType === 5)), Fe = A(() => {
      const s = Q.value;
      return s ? r.neteasePlaylists.filter((t) => t.id !== s.id) : r.neteasePlaylists;
    }), Z = A(() => f.value || d.value || D.value ? !1 : Q.value && r.neteaseActivePlaylist?.id === Q.value.id);
    function Oe() {
      ee(), f.value = !1, v.value = null, d.value = !1;
      const s = Q.value;
      s ? m.selectPlaylist(s) : r.neteasePlaylists[0] && m.selectPlaylist(r.neteasePlaylists[0]);
    }
    const D = A(() => C.value.trim().length > 0), J = A(() => D.value ? r.neteaseSearchResults : d.value ? r.neteaseRecentSongs : r.neteaseSongs), U = P(1), Y = A(() => Math.max(1, Math.ceil(J.value.length / ie))), Ve = A(() => {
      const s = (U.value - 1) * ie;
      return J.value.slice(s, s + ie);
    });
    G(
      () => [r.neteaseActivePlaylist?.id, D.value, d.value],
      () => {
        U.value = 1;
      }
    ), G(Y, (s) => {
      U.value > s && (U.value = Math.max(1, s));
    });
    function qe() {
      U.value > 1 && U.value--;
    }
    function ze() {
      U.value < Y.value && U.value++;
    }
    const Be = A(() => p.mode === "shuffle" ? "🔀" : p.mode === "one" ? "🔂" : "🔁");
    function He() {
      Ee.minimize("music");
    }
    function je() {
      Ee.close("music");
    }
    function Ke() {
      ee(), f.value = !1, v.value = null, d.value = !0, r.neteaseActivePlaylist = null;
    }
    function Qe(s) {
      ee(), f.value = !1, v.value = null, d.value = !1, m.selectPlaylist(s);
    }
    function Je() {
      m.pause(), r.neteaseSearchResults = [], b && clearTimeout(b), b = setTimeout(() => {
        if (!_.value) return;
        const s = C.value.trim();
        s && K(s), m.search(C.value);
      }, 400);
    }
    function Ye() {
      b && clearTimeout(b);
      const s = C.value.trim();
      s && K(s), L.value = !1, m.search(C.value);
    }
    function ee() {
      b && (clearTimeout(b), b = null), m.pause(), C.value = "", r.neteaseSearchResults = [];
    }
    function ye(s) {
      z.playNeteaseTrack(s, J.value);
    }
    function te(s) {
      return !!(s.id && String(s.id) === String(I.getState().currentSong?.neteaseId) || s.cid && String(s.cid) === String(I.getState().currentSong?.cid));
    }
    function Ge(s) {
      return s.picUrl || s.coverUrl || s.al?.picUrl || s.album?.picUrl || mt;
    }
    function _e(s) {
      const t = s.ar || s.artists;
      return Array.isArray(t) && t.length ? t.map((n) => n.name).join(", ") : "未知歌手";
    }
    function be(s) {
      const t = s.dt || s.duration || 0, n = Math.floor(t > 1e3 ? t / 1e3 : t), S = Math.floor(n / 60), F = n % 60;
      return `${S}:${String(F).padStart(2, "0")}`;
    }
    function Xe(s) {
      const t = Number(s.target.value);
      z.seek(t);
    }
    function me() {
      m.pause(), b && clearTimeout(b), b = null, L.value = !1, document.removeEventListener("click", u);
    }
    const Ze = ut(me);
    let ke = !1;
    function Se() {
      ke || !_.value || (ke = !0, C.value.trim() || m.refresh());
    }
    function we() {
      a.value = !document.hidden;
    }
    function Ce() {
      m.syncLocal();
    }
    function Ae() {
      m.accountChanged();
    }
    return G(() => [_.value, vt.netease?.id], ([s, t]) => {
      if (!s || !t) return;
      const n = dt("netease");
      n && (b && (clearTimeout(b), b = null), f.value = !1, v.value = null, d.value = !1, L.value = !1, C.value = n.keyword, K(n.keyword), m.search(n.keyword));
    }, { immediate: !0, flush: "post" }), G(_, (s) => {
      s ? (m.syncLocal(), document.addEventListener("click", u), Se()) : me();
    }, { flush: "sync" }), st(() => {
      document.addEventListener("visibilitychange", we), window.addEventListener("netease:recent-updated", Ce), window.addEventListener("netease:account-updated", Ae), m.syncLocal(), _.value && (document.addEventListener("click", u), Se());
    }), nt(() => {
      me(), Ze(), m.dispose(), document.removeEventListener("visibilitychange", we), window.removeEventListener("netease:recent-updated", Ce), window.removeEventListener("netease:account-updated", Ae);
    }), (s, t) => (o(), at(ht, {
      id: "music-workspace",
      "window-id": "music",
      title: i($)("netease.title"),
      icon: "🎵",
      visible: i(le).visible,
      "default-width": 960,
      "default-height": 640,
      "min-width": 480,
      "min-height": 360,
      "custom-class": "ms-panel ms-source-netease",
      onMinimize: He,
      onClose: je
    }, {
      default: it(() => [
        e("div", ft, [
          e("div", gt, [
            e("div", yt, [
              i(r).neteaseUser?.nickname ? (o(), c(E, { key: 0 }, [
                e("img", {
                  class: "ms-netease-avatar",
                  src: i(r).neteaseUser.avatarUrl || pn,
                  alt: "avatar"
                }, null, 8, _t),
                e("div", bt, [
                  e("span", kt, [
                    xe(l(i(r).neteaseUser.nickname) + " ", 1),
                    i(r).neteaseUser.isVip ? (o(), c("span", St, "VIP")) : M("", !0)
                  ]),
                  e("span", wt, l(i($)("netease.connected")), 1)
                ])
              ], 64)) : (o(), c("div", Ct, [
                e("span", At, l(i($)("netease.guestMode")), 1),
                e("span", xt, l(i($)("netease.guestSub")), 1)
              ]))
            ]),
            e("div", Pt, [
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                style: { color: "#f43f5e", "border-color": "rgba(244, 63, 94, 0.4)", "font-weight": "600" },
                onClick: H
              }, l(i($)("netease.webLogin")), 1),
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                disabled: T.value,
                onClick: q
              }, l(T.value ? i($)("netease.connecting") : i($)("netease.connectWebsite")), 9, Rt),
              i(r).neteaseUser?.nickname ? (o(), c("button", {
                key: 0,
                type: "button",
                class: "ms-netease-logout-btn",
                onClick: j
              }, l(i($)("netease.logout")), 1)) : M("", !0)
            ])
          ]),
          e("div", Lt, [
            e("div", Ut, [
              e("div", Et, l(i($)("netease.officialSoundtrack")), 1),
              e("button", {
                type: "button",
                class: N(["ms-netease-pl-item ms-netease-pl-rhine", { active: f.value }]),
                onClick: $e
              }, [
                t[16] || (t[16] = e("div", {
                  class: "ms-netease-pl-icon-box",
                  style: { background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(234, 88, 12, 0.2))", color: "#f59e0b" }
                }, "💿", -1)),
                e("div", Mt, [
                  e("div", Tt, l(i($)("netease.rhineMusic")), 1),
                  e("div", $t, l(i(p).albums?.length || 0) + " 张官方专辑", 1)
                ])
              ], 2),
              t[21] || (t[21] = e("div", { class: "ms-netease-section-title" }, "我的歌单 & 精选推荐", -1)),
              e("button", {
                type: "button",
                class: N(["ms-netease-pl-item ms-netease-pl-favorites", { active: Z.value }]),
                onClick: Oe
              }, [
                t[18] || (t[18] = e("div", {
                  class: "ms-netease-pl-icon-box",
                  style: { background: "rgba(244, 63, 94, 0.15)", color: "#f43f5e" }
                }, "❤️", -1)),
                e("div", It, [
                  t[17] || (t[17] = e("div", { class: "ms-netease-pl-name" }, "我喜欢的音乐", -1)),
                  e("div", Nt, l((Q.value?.trackCount ?? i(r).neteaseSongs.length) || 0) + " 首曲目", 1)
                ])
              ], 2),
              e("button", {
                type: "button",
                class: N(["ms-netease-pl-item ms-netease-pl-recent", { active: d.value }]),
                onClick: Ke
              }, [
                t[20] || (t[20] = e("div", { class: "ms-netease-pl-icon-box" }, "🕒", -1)),
                e("div", Wt, [
                  t[19] || (t[19] = e("div", { class: "ms-netease-pl-name" }, "最近播放记录", -1)),
                  e("div", Dt, l(i(r).neteaseRecentSongs.length) + " 首曲目", 1)
                ])
              ], 2),
              (o(!0), c(E, null, O(Fe.value, (n) => (o(), c("button", {
                key: n.id,
                type: "button",
                class: N(["ms-netease-pl-item", { active: !f.value && !d.value && !Z.value && i(r).neteaseActivePlaylist?.id === n.id }]),
                onClick: (S) => Qe(n)
              }, [
                e("img", {
                  class: "ms-netease-pl-cover",
                  src: n.coverImgUrl,
                  alt: "",
                  loading: "lazy"
                }, null, 8, Ot),
                e("div", Vt, [
                  e("div", qt, l(n.name), 1),
                  e("div", zt, l(n.trackCount || 0) + " 首曲目", 1)
                ])
              ], 10, Ft))), 128))
            ]),
            e("div", Bt, [
              f.value ? (o(), c(E, { key: 0 }, [
                e("div", Ht, [
                  e("div", null, [
                    t[22] || (t[22] = e("div", { class: "ms-netease-tracks-title" }, "莱茵唱片 · 官方原声曲库", -1)),
                    e("div", jt, " 塞壬唱片 MSR 出品 · 共 " + l(i(p).albums?.length || 0) + " 张官方专辑 ", 1)
                  ]),
                  v.value ? M("", !0) : (o(), c("div", Kt, [
                    Pe(e("input", {
                      "onUpdate:modelValue": t[0] || (t[0] = (n) => k.value = n),
                      type: "text",
                      class: "ms-rhine-search-input",
                      placeholder: "搜索专辑或艺术家…"
                    }, null, 512), [
                      [Re, k.value]
                    ])
                  ]))
                ]),
                v.value ? (o(), c("div", Qt, [
                  e("header", Jt, [
                    e("button", {
                      type: "button",
                      class: "ms-rhine-back-btn",
                      onClick: t[1] || (t[1] = (n) => v.value = null)
                    }, " ‹ 返回专辑列表 "),
                    e("img", {
                      src: v.value.coverUrl || i(fe),
                      class: "ms-rhine-detail-cover",
                      alt: ""
                    }, null, 8, Yt),
                    e("div", Gt, [
                      t[23] || (t[23] = e("span", { class: "siren-badge" }, "OFFICIAL ALBUM", -1)),
                      e("h2", Xt, l(v.value.name), 1),
                      e("p", Zt, "塞壬唱片-MSR 出品 · 共 " + l(v.value._songs?.length || 0) + " 首曲目", 1),
                      e("button", {
                        type: "button",
                        class: "ms-rhine-play-album-btn",
                        onClick: t[2] || (t[2] = (n) => We(v.value))
                      }, " ▶ 播放整张专辑 ")
                    ])
                  ]),
                  h.value ? (o(), c("div", es, [...t[24] || (t[24] = [
                    e("div", { class: "ms-netease-spinner" }, null, -1),
                    e("div", { class: "ms-netease-loading-tip" }, "正在调取专辑曲目列表…", -1)
                  ])])) : (o(), c("div", ts, [
                    (o(!0), c(E, null, O(v.value._songs || [], (n, S) => (o(), c("button", {
                      key: n.cid,
                      type: "button",
                      class: N(["ms-netease-track-row", { playing: de(n) }]),
                      onClick: (F) => Ne(n)
                    }, [
                      e("span", ns, [
                        de(n) ? (o(), c("span", as, "▶")) : (o(), c("span", is, l(S + 1), 1))
                      ]),
                      e("div", ls, [
                        e("span", {
                          class: "ms-netease-track-name",
                          title: n.name
                        }, l(n.name), 9, os),
                        e("span", cs, l((n.artists || []).join(", ") || "塞壬唱片"), 1)
                      ]),
                      e("div", rs, [
                        e("button", {
                          type: "button",
                          class: N(["siren-btn-icon", { liked: ve(n) }]),
                          title: ve(n) ? "取消收藏" : "收藏曲目",
                          onClick: pe((F) => De(n, F), ["stop"])
                        }, l(ve(n) ? "♥" : "♡"), 11, us)
                      ])
                    ], 10, ss))), 128))
                  ]))
                ])) : (o(), c("div", ds, [
                  w.value.length ? (o(), c(E, { key: 1 }, [
                    e("div", ms, [
                      (o(!0), c(E, null, O(Me.value, (n) => (o(), c("div", {
                        key: n.cid,
                        class: "ms-rhine-album-card",
                        onClick: (S) => Ie(n)
                      }, [
                        e("div", ps, [
                          e("img", {
                            src: n.coverUrl || i(fe),
                            class: "ms-rhine-cover",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, fs),
                          t[25] || (t[25] = e("div", { class: "ms-rhine-hover-play" }, "▶", -1))
                        ]),
                        e("div", gs, [
                          e("span", {
                            class: "ms-rhine-album-name",
                            title: n.name
                          }, l(n.name), 9, ys),
                          t[26] || (t[26] = e("span", { class: "ms-rhine-corp" }, "塞壬唱片 MSR", -1))
                        ])
                      ], 8, hs))), 128))
                    ]),
                    W.value > 1 ? (o(), c("div", _s, [
                      e("span", bs, " 第 " + l(g.value) + " / " + l(W.value) + " 页 · 共 " + l(w.value.length) + " 张专辑 ", 1),
                      e("div", ks, [
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: g.value <= 1,
                          title: "首页",
                          onClick: t[3] || (t[3] = (n) => g.value = 1)
                        }, " « ", 8, Ss),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: g.value <= 1,
                          title: "上一页",
                          onClick: t[4] || (t[4] = (n) => g.value = Math.max(1, g.value - 1))
                        }, " ◀ ", 8, ws),
                        (o(!0), c(E, null, O(Te.value, (n) => (o(), c("button", {
                          key: "rpage-" + n,
                          type: "button",
                          class: N(["ms-page-btn", { active: n === g.value }]),
                          onClick: (S) => g.value = n
                        }, l(n), 11, Cs))), 128)),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: g.value >= W.value,
                          title: "下一页",
                          onClick: t[5] || (t[5] = (n) => g.value = Math.min(W.value, g.value + 1))
                        }, " ▶ ", 8, As),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: g.value >= W.value,
                          title: "尾页",
                          onClick: t[6] || (t[6] = (n) => g.value = W.value)
                        }, " » ", 8, xs)
                      ])
                    ])) : M("", !0)
                  ], 64)) : (o(), c("div", vs, " 正在加载专辑或未找到匹配项… "))
                ]))
              ], 64)) : (o(), c(E, { key: 1 }, [
                e("div", {
                  class: "ms-netease-search-wrap",
                  ref_key: "searchWrapRef",
                  ref: oe
                }, [
                  Pe(e("input", {
                    type: "text",
                    class: "ms-netease-search-input",
                    placeholder: "搜索网易云歌曲或歌手…",
                    "onUpdate:modelValue": t[7] || (t[7] = (n) => C.value = n),
                    onKeydown: lt(Ye, ["enter"]),
                    onInput: Je,
                    onFocus: t[8] || (t[8] = (n) => L.value = !0)
                  }, null, 544), [
                    [Re, C.value]
                  ]),
                  L.value && !C.value.trim() ? (o(), c("div", {
                    key: 0,
                    class: "ms-netease-search-dropdown",
                    onMousedown: t[10] || (t[10] = pe(() => {
                    }, ["prevent"]))
                  }, [
                    x.value.length > 0 ? (o(), c("div", Ps, [
                      e("div", { class: "ms-dropdown-head" }, [
                        t[27] || (t[27] = e("span", { class: "ms-dropdown-title" }, "🔍 搜索历史", -1)),
                        e("button", {
                          type: "button",
                          class: "ms-dropdown-clear",
                          onClick: re
                        }, "清空")
                      ]),
                      e("div", Rs, [
                        (o(!0), c(E, null, O(x.value, (n) => (o(), c("span", {
                          key: "hist-" + n,
                          class: "ms-search-tag",
                          onClick: (S) => ue(n)
                        }, [
                          xe(l(n) + " ", 1),
                          e("b", {
                            class: "ms-tag-del",
                            onClick: pe((S) => ce(n), ["stop"])
                          }, "×", 8, Us)
                        ], 8, Ls))), 128))
                      ])
                    ])) : M("", !0),
                    i(r).neteaseRecentSongs.length > 0 ? (o(), c("div", Es, [
                      e("div", Ms, [
                        t[28] || (t[28] = e("span", { class: "ms-dropdown-title" }, "🕒 历史听歌记录", -1)),
                        e("button", {
                          type: "button",
                          class: "ms-dropdown-clear",
                          onClick: t[9] || (t[9] = (n) => i(m).clearRecent())
                        }, "清空")
                      ]),
                      e("div", Ts, [
                        (o(!0), c(E, null, O(i(r).neteaseRecentSongs.slice(0, 8), (n) => (o(), c("div", {
                          key: "drop-rec-" + n.id,
                          class: N(["ms-recent-dropdown-item", { playing: te(n) }]),
                          onClick: (S) => {
                            ye(n), L.value = !1;
                          }
                        }, [
                          e("span", Is, l(te(n) ? "▶" : "♫"), 1),
                          e("span", Ns, l(n.name), 1),
                          e("span", Ws, l(_e(n)), 1),
                          e("span", Ds, l(be(n)), 1)
                        ], 10, $s))), 128))
                      ])
                    ])) : M("", !0),
                    !x.value.length && !i(r).neteaseRecentSongs.length ? (o(), c("div", Fs, " 暂无搜索与播放历史，输入歌名或歌手即可开始畅听 ")) : M("", !0)
                  ], 32)) : M("", !0)
                ], 512),
                i(r).message ? (o(), c("div", Os, [
                  e("span", null, l(i(r).message), 1)
                ])) : M("", !0),
                e("div", Vs, [
                  e("div", null, [
                    e("div", qs, l(D.value ? `搜索结果 (${i(r).neteaseSearchResults.length})` : d.value ? `最近播放记录 (${i(r).neteaseRecentSongs.length})` : Z.value ? `我喜欢的音乐 (${i(r).neteaseSongs.length})` : i(r).neteaseActivePlaylist?.name || "我喜欢的音乐"), 1),
                    e("div", zs, l(D.value ? "网易云曲库实时检索" : d.value ? "近期点播收听的历史歌曲" : Z.value ? "个人云端红心曲库，点击即可一键开始高保真串流播放" : "点击歌曲即可一键开始高保真串流播放"), 1)
                  ]),
                  D.value ? (o(), c("button", {
                    key: 0,
                    type: "button",
                    class: "ms-netease-logout-btn",
                    onClick: ee
                  }, "清除搜索")) : d.value && i(r).neteaseRecentSongs.length > 0 ? (o(), c("button", {
                    key: 1,
                    type: "button",
                    class: "ms-netease-logout-btn",
                    onClick: t[11] || (t[11] = (n) => i(m).clearRecent())
                  }, "清空记录")) : M("", !0)
                ]),
                i(r).neteaseLoading ? (o(), c("div", Bs, [...t[29] || (t[29] = [
                  e("div", { class: "ms-netease-spinner" }, null, -1),
                  e("div", { class: "ms-netease-loading-tip" }, "正在同步网易云音源与歌单…", -1)
                ])])) : (o(), c(E, { key: 2 }, [
                  (o(!0), c(E, null, O(Ve.value, (n, S) => (o(), c("div", {
                    key: n.id || S,
                    class: N(["ms-netease-track-row", { playing: te(n) }]),
                    onClick: (F) => ye(n)
                  }, [
                    e("span", js, l(te(n) ? "▶" : (U.value - 1) * ie + S + 1), 1),
                    e("img", {
                      class: "ms-netease-track-cover",
                      src: Ge(n),
                      alt: "",
                      loading: "lazy"
                    }, null, 8, Ks),
                    e("div", Qs, [
                      e("div", Js, l(n.name), 1),
                      e("div", Ys, l(_e(n)), 1)
                    ]),
                    e("span", Gs, l(be(n)), 1)
                  ], 10, Hs))), 128)),
                  J.value.length ? M("", !0) : (o(), c("div", Xs, l(i(r).message ? "搜索未完成，请查看上方提示。" : D.value ? "未找到匹配的歌曲，请尝试其他关键词。" : "暂无曲目，可尝试在上方搜索框输入关键词。"), 1)),
                  Y.value > 1 ? (o(), c("div", Zs, [
                    e("span", en, " 第 " + l(U.value) + " / " + l(Y.value) + " 页 · 共 " + l(J.value.length) + " 首 ", 1),
                    e("div", tn, [
                      e("button", {
                        type: "button",
                        class: "ms-page-btn",
                        disabled: U.value <= 1,
                        title: "上一页",
                        onClick: qe
                      }, " ◀ 上一页 ", 8, sn),
                      e("button", {
                        type: "button",
                        class: "ms-page-btn",
                        disabled: U.value >= Y.value,
                        title: "下一页",
                        onClick: ze
                      }, " 下一页 ▶ ", 8, nn)
                    ])
                  ])) : M("", !0)
                ], 64))
              ], 64))
            ])
          ])
        ]),
        e("footer", an, [
          e("img", {
            src: i(p).coverUrl || i(fe),
            alt: "",
            style: { width: "42px", height: "42px", "border-radius": "8px", "object-fit": "cover", "flex-shrink": "0" }
          }, null, 8, ln),
          e("div", on, [
            e("div", cn, [
              e("span", rn, l(i(p).title || "暂无播放曲目"), 1),
              e("span", un, l(i(p).formattedCurrent) + " / " + l(i(p).formattedDuration), 1)
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
              onClick: t[12] || (t[12] = (n) => i(z).prev()),
              title: "上一首"
            }, "⏮"),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              style: { background: "#f43f5e", color: "#fff", "border-color": "#f43f5e" },
              onClick: t[13] || (t[13] = (n) => i(z).togglePlay()),
              title: i(p).playing ? "暂停" : "播放"
            }, l(i(p).playing ? "⏸" : "▶"), 9, mn),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[14] || (t[14] = (n) => i(z).next()),
              title: "下一首"
            }, "⏭"),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[15] || (t[15] = (n) => i(z).cycleMode()),
              title: i(p).mode
            }, l(Be.value), 9, hn)
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "visible"]));
  }
}), wn = /* @__PURE__ */ ct(fn, [["__scopeId", "data-v-09b14bd3"]]);
export {
  wn as default
};
