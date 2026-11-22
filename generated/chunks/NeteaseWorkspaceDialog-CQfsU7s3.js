import { r as et, d as tt, w as X, o as st, G as nt, f as o, l as at, A as it, h as e, u as i, g as c, F as M, m as xe, t as l, j as P, p as Pe, v as Re, k as he, i as O, q as N, s as A, b as R } from "./vendor-vue-_upDT3S_.js";
import { t as $, o as lt, _ as ot } from "./_plugin-vue_export-helper-DtNgUcga.js";
import { u as ct } from "./useMachine-DVONSfP9.js";
import { N as y, g as le, Q as rt, R as ut, t as dt, w as vt } from "./search.service-I5ZPPxGy.js";
import { r as Le, C as se, d as ne, e as ae, w as Ue, n as Z, a as f, D as fe, h as z, m as I, g as mt } from "./store-DnPgWHLm.js";
import { A as pt } from "./AppWindowFrame-urtsUO2e.js";
import { w as Ee } from "./window-manager.store-D2fEf4ic.js";
function ht(V) {
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
  let _ = !1, m = 0, r, H;
  function T() {
    if (!_) {
      if (a.neteaseUser = y.getUser(), a.neteaseRecentSongs = y.getRecentSongs(), !a.neteasePlaylists.length)
        try {
          const u = Le(se);
          if (u.length && Array.isArray(u) && u.length) {
            a.neteasePlaylists = u;
            const v = u.find((p) => p.name?.includes("喜欢的音乐") || p.specialType === 5) || u[0];
            v && !a.neteaseActivePlaylist && (a.neteaseActivePlaylist = v);
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
  function L() {
    m++, r?.abort(), r = void 0, a.neteaseLoading = !1, H !== void 0 && clearTimeout(H), H = void 0;
  }
  async function B(u) {
    if (_ || !V()) return;
    if (le.pendingWrites) {
      a.message = "音乐操作正在处理，请稍候；未自动排队。";
      return;
    }
    L();
    const v = new AbortController(), p = m;
    r = v, a.neteaseLoading = !0, a.message = "";
    const d = () => !_ && V() && m === p && !v.signal.aborted;
    try {
      await y.whenReady(), d() && await u(v.signal, d);
    } catch (h) {
      d() && (a.message = h?.message || "读取失败，请检查节点设置或网络后手动重试。");
    } finally {
      r === v && (r = void 0, a.neteaseLoading = !1);
    }
  }
  async function q(u, v, p = 500, d = 0) {
    try {
      const h = await y.request("/playlist/track/all", { id: u, limit: p, offset: d }, v);
      if (h.songs?.length) return h.songs;
    } catch {
      v.throwIfAborted();
    }
    return d === 0 ? (await y.request("/playlist/detail", { id: u }, v)).playlist?.tracks || [] : [];
  }
  async function j() {
    await B(async (u, v) => {
      T();
      const d = a.neteaseUser?.uid;
      let h = [];
      if (d)
        try {
          h = (await y.request("/user/playlist", { uid: d, limit: 100 }, u)).playlist || [];
        } catch (C) {
          v() && (a.message = C?.message || "官网歌单读取失败，请重新连接账户。");
          return;
        }
      if (!h.length)
        try {
          h = (await y.request("/toplist", {}, u)).list || [];
        } catch {
        }
      if (!v()) return;
      if (h.length) {
        a.neteasePlaylists = h;
        try {
          Ue(se, h);
        } catch {
        }
      }
      const k = h.find((C) => C.id === a.neteaseActivePlaylist?.id) || h.find((C) => C.name?.includes("喜欢的音乐") || C.specialType === 5) || h[0];
      if (!k) return;
      if (!a.neteaseSongs.length)
        try {
          const C = await q(k.id, u, 10, 0);
          v() && !a.neteaseSongs.length && (a.neteaseActivePlaylist = k, a.neteaseSongs = C, a.neteaseLoading = !1);
        } catch {
        }
      const g = await q(k.id, u, 500, 0);
      if (v() && (a.neteaseActivePlaylist = k, a.neteaseSongs = g, k.name?.includes("喜欢的音乐") || k.specialType === 5))
        try {
          Ue(ne, g);
        } catch {
        }
    });
  }
  async function oe(u) {
    await B(async (v, p) => {
      const d = y.getUser()?.uid;
      if (a.neteaseActivePlaylist = u, !a.neteaseSongs.length || a.neteaseActivePlaylist?.id !== u.id)
        try {
          const k = await q(u.id, v, 10, 0);
          p() && d === y.getUser()?.uid && (!a.neteaseSongs.length || a.neteaseActivePlaylist?.id !== u.id) && (a.neteaseSongs = k, a.neteaseLoading = !1);
        } catch {
        }
      const h = await q(u.id, v, 500, 0);
      p() && d === y.getUser()?.uid && (a.neteaseActivePlaylist = u, a.neteaseSongs = h);
    });
  }
  async function w(u) {
    if (!u.trim()) {
      L(), a.neteaseSearchResults = [];
      return;
    }
    await B(async (v, p) => {
      a.neteaseSearchResults = [];
      const d = y.getUser()?.uid, h = await y.request("/cloudsearch", { keywords: u.trim(), type: 1, limit: 60 }, v);
      if (!Array.isArray(h?.result?.songs) && h?.result?.songs != null) throw new Error("网易云搜索结果格式异常，请稍后重试。");
      const k = h?.result?.songs || [];
      p() && d === y.getUser()?.uid && (a.neteaseSearchResults = k);
    });
  }
  async function U(u) {
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
    L(), await y.connectWebsiteAccount(), ae(se), ae(ne), !(_ || !V()) && (T(), await j());
  }
  async function x() {
    if (L(), typeof localStorage < "u")
      try {
        localStorage.setItem("netease_explicit_logout", "true"), ae(ne), ae(se);
      } catch {
      }
    await U(async () => {
      await y.logout(), a.neteaseUser = null, a.neteasePlaylists = [], a.neteaseActivePlaylist = null, a.neteaseSongs = [], a.neteaseSearchResults = [], a.message = "已断开插件账户；可点击「连接官网账户」重新连接，不影响官网登录。";
    });
  }
  async function Q() {
    await U(async () => {
      await y.connectWebsiteAccount(), await y.fetchAccountRecentSongs(60), T(), j(), a.message = "✓ 账号历史与歌单已同步刷新！";
    });
  }
  async function ce() {
    await U(async () => {
      await y.clearRecentSongs(), T();
    });
  }
  function re() {
    _ || (L(), T(), a.neteasePlaylists = [], a.neteaseSongs = [], a.neteaseSearchResults = [], a.neteaseActivePlaylist = null, a.message = "账号资料发生变化，请核对；需要时手动刷新歌单。");
  }
  function ue() {
    _ = !0, L();
  }
  return { state: a, refresh: j, selectPlaylist: oe, search: w, connectWebsite: b, logout: x, clearRecent: ce, syncLocal: T, pause: L, dispose: ue, accountChanged: re, syncHistory: Q };
}
const ft = { class: "ms-source-pane ms-netease-source" }, gt = { class: "ms-netease-user-bar" }, yt = { class: "ms-netease-user-info" }, _t = ["src"], bt = { class: "ms-netease-meta" }, kt = { class: "ms-netease-name" }, St = {
  key: 0,
  class: "ms-netease-vip-badge"
}, wt = { class: "ms-netease-status-text" }, Ct = {
  key: 1,
  class: "ms-netease-meta"
}, At = { class: "ms-netease-name" }, xt = { class: "ms-netease-status-text" }, Pt = { class: "ms-netease-search-box" }, Rt = {
  key: 0,
  class: "ms-dropdown-section"
}, Lt = { class: "ms-search-history-tags" }, Ut = ["onClick"], Et = ["onClick"], Mt = {
  key: 1,
  class: "ms-dropdown-section"
}, Tt = { class: "ms-dropdown-head" }, $t = { class: "ms-recent-dropdown-list" }, It = ["onClick"], Nt = { class: "ms-drop-play" }, Wt = { class: "ms-drop-title" }, Dt = { class: "ms-drop-artist" }, Ft = { class: "ms-drop-dur" }, Ot = {
  key: 2,
  class: "ms-dropdown-empty"
}, Vt = {
  class: "ms-netease-user-actions",
  style: { display: "flex", gap: "8px", "align-items": "center" }
}, qt = ["disabled"], zt = { class: "ms-netease-body" }, Ht = { class: "ms-netease-playlists" }, Bt = { class: "ms-netease-section-title" }, jt = { class: "ms-netease-pl-info" }, Qt = { class: "ms-netease-pl-name" }, Jt = { class: "ms-netease-pl-count" }, Kt = { class: "ms-netease-pl-info" }, Yt = { class: "ms-netease-pl-count" }, Gt = { class: "ms-netease-pl-info" }, Xt = { class: "ms-netease-pl-count" }, Zt = ["onClick"], es = ["src"], ts = { class: "ms-netease-pl-info" }, ss = { class: "ms-netease-pl-name" }, ns = { class: "ms-netease-pl-count" }, as = { class: "ms-netease-tracks" }, is = { class: "ms-netease-tracks-head" }, ls = { class: "ms-netease-tracks-sub" }, os = {
  key: 0,
  class: "ms-rhine-search-wrap"
}, cs = {
  key: 0,
  class: "ms-rhine-album-detail"
}, rs = { class: "ms-rhine-detail-banner" }, us = ["src"], ds = { class: "ms-rhine-detail-info" }, vs = { class: "ms-rhine-detail-title" }, ms = { class: "ms-rhine-detail-sub" }, ps = {
  key: 0,
  class: "ms-netease-loading-box"
}, hs = {
  key: 1,
  class: "ms-rhine-track-list"
}, fs = ["onClick"], gs = { class: "ms-netease-track-idx" }, ys = {
  key: 0,
  style: { color: "#f59e0b" }
}, _s = { key: 1 }, bs = { class: "ms-netease-track-info" }, ks = ["title"], Ss = { class: "ms-netease-track-artist" }, ws = {
  class: "ms-netease-track-dur",
  style: { display: "flex", "align-items": "center", gap: "8px" }
}, Cs = ["title", "onClick"], As = {
  key: 1,
  class: "ms-rhine-grid-wrap"
}, xs = {
  key: 0,
  class: "ms-dropdown-empty",
  style: { padding: "40px 0" }
}, Ps = { class: "ms-rhine-album-grid" }, Rs = ["onClick"], Ls = { class: "ms-rhine-cover-wrap" }, Us = ["src"], Es = { class: "ms-rhine-meta" }, Ms = ["title"], Ts = {
  key: 0,
  class: "ms-netease-pagination-bar ms-rhine-pagination-bar"
}, $s = { class: "ms-pagination-info" }, Is = { class: "ms-pagination-btns" }, Ns = ["disabled"], Ws = ["disabled"], Ds = ["onClick"], Fs = ["disabled"], Os = ["disabled"], Vs = {
  key: 0,
  class: "ms-netease-msg-banner"
}, qs = { class: "ms-netease-tracks-head" }, zs = { class: "ms-netease-tracks-title" }, Hs = { class: "ms-netease-tracks-sub" }, Bs = {
  key: 1,
  class: "ms-netease-loading-box"
}, js = ["onClick"], Qs = { class: "ms-netease-track-idx" }, Js = ["src"], Ks = { class: "ms-netease-track-info" }, Ys = { class: "ms-netease-track-name" }, Gs = { class: "ms-netease-track-artist" }, Xs = { class: "ms-netease-track-dur" }, Zs = {
  key: 0,
  style: { padding: "30px", "text-align": "center", color: "var(--muted)", "font-size": "13px" }
}, en = {
  key: 1,
  class: "ms-netease-pagination-bar"
}, tn = { class: "ms-pagination-info" }, sn = { class: "ms-pagination-btns" }, nn = ["disabled"], an = ["disabled"], ln = { style: { display: "flex", "align-items": "center", gap: "12px", padding: "10px 16px", "border-top": "1px solid var(--border)", background: "var(--panel)" } }, on = ["src"], cn = { style: { flex: "1", "min-width": "0", display: "flex", "flex-direction": "column", gap: "4px" } }, rn = { style: { display: "flex", "justify-content": "space-between", "font-size": "12px" } }, un = { style: { "font-weight": "600", "white-space": "nowrap", overflow: "hidden", "text-overflow": "ellipsis", color: "var(--heading)" } }, dn = { style: { color: "var(--muted)", "font-size": "11px" } }, vn = ["value"], mn = { style: { display: "flex", "align-items": "center", gap: "6px" } }, pn = ["title"], hn = ["title"], fn = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23334155'/%3E%3Ccircle cx='32' cy='24' r='10' fill='%2364748b'/%3E%3Cpath d='M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16' fill='%2364748b'/%3E%3C/svg%3E", ge = 8, ie = 10, gn = /* @__PURE__ */ tt({
  __name: "NeteaseWorkspaceDialog",
  setup(V) {
    const a = R(!document.hidden), _ = A(() => le.visible && a.value), m = ht(() => _.value), r = m.state, H = ct(Z), T = A(() => H.value.phase === "connecting"), L = R("先在同一浏览器的网易云官网登录，再点击「连接官网账户」。无需音乐节点；插件断开不会退出官网。");
    function B() {
      typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: "https://music.163.com/" }) : window.open("https://music.163.com/", "_blank", "noopener,noreferrer");
    }
    async function q() {
      if (!T.value && Z.send({ type: "START_CONNECT" })) {
        L.value = "正在使用浏览器官网会话读取账户…";
        try {
          await m.connectWebsite();
          const s = y.getUser();
          Z.send({ type: "CONNECT_SUCCESS", user: s }), L.value = "官网账户已连接。若歌单读取失败，请查看列表提示。";
        } catch (s) {
          const t = s?.message || "官网账户连接失败，请确认已登录。";
          Z.send({ type: "CONNECT_FAILURE", message: t }), L.value = t;
        }
      }
    }
    async function j() {
      await m.logout(), Z.send({ type: "LOGOUT" }), f.neteaseUser = null, f.neteaseSongs = [], f.neteasePlaylists = [], L.value = "已断开插件账户，官网仍保持登录。";
    }
    const oe = R(null), w = R(""), U = R(!1);
    let b = null;
    const x = R([]);
    try {
      const s = localStorage.getItem("netease_search_history");
      if (s) {
        const t = JSON.parse(s);
        Array.isArray(t) && (x.value = t.slice(0, 15));
      }
    } catch {
    }
    function Q(s) {
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
      w.value = s, U.value = !1, p.value = !1, d.value = null, m.search(s);
    }
    function u(s) {
      s.target?.closest(".ms-netease-search-wrap") || (U.value = !1);
    }
    const v = R(!1), p = R(!1), d = R(null), h = R(!1), k = R(""), g = R(1), C = A(() => {
      const s = f.albums || [], t = k.value.trim().toLowerCase();
      return t ? s.filter((n) => (n.name || "").toLowerCase().includes(t)) : s;
    }), W = A(() => Math.max(1, Math.ceil(C.value.length / ge))), Me = A(() => {
      const s = (g.value - 1) * ge;
      return C.value.slice(s, s + ge);
    }), Te = A(() => {
      const s = W.value, t = g.value, n = [], S = Math.max(1, t - 2), F = Math.min(s, t + 2);
      for (let pe = S; pe <= F; pe++)
        n.push(pe);
      return n;
    });
    X(k, () => {
      g.value = 1;
    });
    function $e() {
      m.pause(), p.value = !0, v.value = !1, d.value = null, (!f.albums || f.albums.length === 0) && I.getSirenAlbums().then((s) => {
        s?.length && (f.albums = s);
      });
    }
    async function Ie(s) {
      if (d.value = s, !s._songs || !s._songs.length) {
        h.value = !0;
        try {
          const t = await I.getSirenAlbumDetail(s.cid);
          s._songs = t, d.value = { ...s, _songs: t };
        } catch (t) {
          console.warn("加载专辑曲目失败", t);
        } finally {
          h.value = !1;
        }
      }
    }
    function Ne(s) {
      if (d.value?._songs?.length) {
        const t = d.value._songs, n = t.findIndex((S) => String(S.cid) === String(s.cid));
        I.setQueue(t, n >= 0 ? n : 0, !0), f.activeAlbum = d.value;
      } else
        I.playSong(s);
    }
    function We(s) {
      const t = s._songs || [];
      t.length > 0 && (I.setQueue(t, 0, !0), f.activeAlbum = s);
    }
    function de(s) {
      if (!f.playing) return !1;
      const t = I.getState().currentSong;
      return !!(t && String(t.cid) === String(s.cid));
    }
    function ve(s) {
      return I.isLiked(s.cid);
    }
    function De(s, t) {
      t?.stopPropagation();
      const n = I.toggleLike(s);
      de(s) && (f.liked = n);
    }
    const J = A(() => r.neteasePlaylists.find((s) => s.name?.includes("喜欢的音乐") || s.specialType === 5)), Fe = A(() => {
      const s = J.value;
      return s ? r.neteasePlaylists.filter((t) => t.id !== s.id) : r.neteasePlaylists;
    }), ee = A(() => p.value || v.value || D.value ? !1 : J.value && r.neteaseActivePlaylist?.id === J.value.id);
    function Oe() {
      G(), p.value = !1, d.value = null, v.value = !1;
      const s = J.value;
      s ? m.selectPlaylist(s) : r.neteasePlaylists[0] && m.selectPlaylist(r.neteasePlaylists[0]);
    }
    const D = A(() => w.value.trim().length > 0), K = A(() => D.value ? r.neteaseSearchResults : v.value ? r.neteaseRecentSongs : r.neteaseSongs), E = R(1), Y = A(() => Math.max(1, Math.ceil(K.value.length / ie))), Ve = A(() => {
      const s = (E.value - 1) * ie;
      return K.value.slice(s, s + ie);
    });
    X(
      () => [r.neteaseActivePlaylist?.id, D.value, v.value],
      () => {
        E.value = 1;
      }
    ), X(Y, (s) => {
      E.value > s && (E.value = Math.max(1, s));
    });
    function qe() {
      E.value > 1 && E.value--;
    }
    function ze() {
      E.value < Y.value && E.value++;
    }
    const He = A(() => f.mode === "shuffle" ? "🔀" : f.mode === "one" ? "🔂" : "🔁");
    function Be() {
      Ee.minimize("music");
    }
    function je() {
      Ee.close("music");
    }
    function Qe() {
      G(), p.value = !1, d.value = null, v.value = !0, r.neteaseActivePlaylist = null;
    }
    function Je(s) {
      G(), p.value = !1, d.value = null, v.value = !1, m.selectPlaylist(s);
    }
    function Ke() {
      m.pause(), r.neteaseSearchResults = [], b && clearTimeout(b), b = setTimeout(() => {
        if (!_.value) return;
        const s = w.value.trim();
        s && (Q(s), p.value = !1, d.value = null), m.search(w.value);
      }, 400);
    }
    function Ye() {
      b && clearTimeout(b);
      const s = w.value.trim();
      s && (Q(s), p.value = !1, d.value = null), U.value = !1, m.search(w.value);
    }
    function G() {
      b && (clearTimeout(b), b = null), m.pause(), w.value = "", r.neteaseSearchResults = [];
    }
    function ye(s) {
      z.playNeteaseTrack(s, K.value);
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
      m.pause(), b && clearTimeout(b), b = null, U.value = !1, document.removeEventListener("click", u);
    }
    const Ze = ut(me);
    let ke = !1;
    function Se() {
      ke || !_.value || (ke = !0, w.value.trim() || m.refresh());
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
    return X(() => [_.value, vt.netease?.id], ([s, t]) => {
      if (!s || !t) return;
      const n = dt("netease");
      n && (b && (clearTimeout(b), b = null), p.value = !1, d.value = null, v.value = !1, U.value = !1, w.value = n.keyword, Q(n.keyword), m.search(n.keyword));
    }, { immediate: !0, flush: "post" }), X(_, (s) => {
      s ? (m.syncLocal(), document.addEventListener("click", u), Se()) : me();
    }, { flush: "sync" }), st(() => {
      document.addEventListener("visibilitychange", we), window.addEventListener("netease:recent-updated", Ce), window.addEventListener("netease:account-updated", Ae), m.syncLocal(), _.value && (document.addEventListener("click", u), Se());
    }), nt(() => {
      me(), Ze(), m.dispose(), document.removeEventListener("visibilitychange", we), window.removeEventListener("netease:recent-updated", Ce), window.removeEventListener("netease:account-updated", Ae);
    }), (s, t) => (o(), at(pt, {
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
      onMinimize: Be,
      onClose: je
    }, {
      default: it(() => [
        e("div", ft, [
          e("div", gt, [
            e("div", yt, [
              i(r).neteaseUser?.nickname ? (o(), c(M, { key: 0 }, [
                e("img", {
                  class: "ms-netease-avatar",
                  src: i(r).neteaseUser.avatarUrl || fn,
                  alt: "avatar"
                }, null, 8, _t),
                e("div", bt, [
                  e("span", kt, [
                    xe(l(i(r).neteaseUser.nickname) + " ", 1),
                    i(r).neteaseUser.isVip ? (o(), c("span", St, "VIP")) : P("", !0)
                  ]),
                  e("span", wt, l(i($)("netease.connected")), 1)
                ])
              ], 64)) : (o(), c("div", Ct, [
                e("span", At, l(i($)("netease.guestMode")), 1),
                e("span", xt, l(i($)("netease.guestSub")), 1)
              ]))
            ]),
            e("div", {
              class: "ms-netease-search-wrap ms-netease-top-search",
              ref_key: "searchWrapRef",
              ref: oe
            }, [
              e("div", Pt, [
                Pe(e("input", {
                  type: "text",
                  class: "ms-netease-search-input",
                  placeholder: "搜索网易云歌曲或歌手…",
                  "onUpdate:modelValue": t[0] || (t[0] = (n) => w.value = n),
                  onKeydown: t[1] || (t[1] = (n) => i(lt)(n, Ye)),
                  onInput: Ke,
                  onFocus: t[2] || (t[2] = (n) => U.value = !0)
                }, null, 544), [
                  [Re, w.value]
                ]),
                w.value ? (o(), c("button", {
                  key: 0,
                  type: "button",
                  class: "ms-netease-search-clear",
                  title: "清除搜索",
                  "aria-label": "清除搜索",
                  onClick: G
                }, "✕")) : P("", !0)
              ]),
              U.value && !w.value.trim() ? (o(), c("div", {
                key: 0,
                class: "ms-netease-search-dropdown",
                onMousedown: t[4] || (t[4] = he(() => {
                }, ["prevent"]))
              }, [
                x.value.length > 0 ? (o(), c("div", Rt, [
                  e("div", { class: "ms-dropdown-head" }, [
                    t[17] || (t[17] = e("span", { class: "ms-dropdown-title" }, "🔍 搜索历史", -1)),
                    e("button", {
                      type: "button",
                      class: "ms-dropdown-clear",
                      onClick: re
                    }, "清空")
                  ]),
                  e("div", Lt, [
                    (o(!0), c(M, null, O(x.value, (n) => (o(), c("span", {
                      key: "hist-" + n,
                      class: "ms-search-tag",
                      onClick: (S) => ue(n)
                    }, [
                      xe(l(n) + " ", 1),
                      e("b", {
                        class: "ms-tag-del",
                        onClick: he((S) => ce(n), ["stop"])
                      }, "×", 8, Et)
                    ], 8, Ut))), 128))
                  ])
                ])) : P("", !0),
                i(r).neteaseRecentSongs.length > 0 ? (o(), c("div", Mt, [
                  e("div", Tt, [
                    t[18] || (t[18] = e("span", { class: "ms-dropdown-title" }, "🕒 历史听歌记录", -1)),
                    e("button", {
                      type: "button",
                      class: "ms-dropdown-clear",
                      onClick: t[3] || (t[3] = (n) => i(m).clearRecent())
                    }, "清空")
                  ]),
                  e("div", $t, [
                    (o(!0), c(M, null, O(i(r).neteaseRecentSongs.slice(0, 8), (n) => (o(), c("div", {
                      key: "drop-rec-" + n.id,
                      class: N(["ms-recent-dropdown-item", { playing: te(n) }]),
                      onClick: (S) => {
                        ye(n), U.value = !1;
                      }
                    }, [
                      e("span", Nt, l(te(n) ? "▶" : "♫"), 1),
                      e("span", Wt, l(n.name), 1),
                      e("span", Dt, l(_e(n)), 1),
                      e("span", Ft, l(be(n)), 1)
                    ], 10, It))), 128))
                  ])
                ])) : P("", !0),
                !x.value.length && !i(r).neteaseRecentSongs.length ? (o(), c("div", Ot, " 暂无搜索与播放历史，输入歌名或歌手即可开始畅听 ")) : P("", !0)
              ], 32)) : P("", !0)
            ], 512),
            e("div", Vt, [
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                style: { color: "#f43f5e", "border-color": "rgba(244, 63, 94, 0.4)", "font-weight": "600" },
                onClick: B
              }, l(i($)("netease.webLogin")), 1),
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                disabled: T.value,
                onClick: q
              }, l(T.value ? i($)("netease.connecting") : i($)("netease.connectWebsite")), 9, qt),
              i(r).neteaseUser?.nickname ? (o(), c("button", {
                key: 0,
                type: "button",
                class: "ms-netease-logout-btn",
                onClick: j
              }, l(i($)("netease.logout")), 1)) : P("", !0)
            ])
          ]),
          e("div", zt, [
            e("div", Ht, [
              e("div", Bt, l(i($)("netease.officialSoundtrack")), 1),
              e("button", {
                type: "button",
                class: N(["ms-netease-pl-item ms-netease-pl-rhine", { active: p.value }]),
                onClick: $e
              }, [
                t[19] || (t[19] = e("div", {
                  class: "ms-netease-pl-icon-box",
                  style: { background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(234, 88, 12, 0.2))", color: "#f59e0b" }
                }, "💿", -1)),
                e("div", jt, [
                  e("div", Qt, l(i($)("netease.rhineMusic")), 1),
                  e("div", Jt, l(i(f).albums?.length || 0) + " 张官方专辑", 1)
                ])
              ], 2),
              t[24] || (t[24] = e("div", { class: "ms-netease-section-title" }, "我的歌单 & 精选推荐", -1)),
              e("button", {
                type: "button",
                class: N(["ms-netease-pl-item ms-netease-pl-favorites", { active: ee.value }]),
                onClick: Oe
              }, [
                t[21] || (t[21] = e("div", {
                  class: "ms-netease-pl-icon-box",
                  style: { background: "rgba(244, 63, 94, 0.15)", color: "#f43f5e" }
                }, "❤️", -1)),
                e("div", Kt, [
                  t[20] || (t[20] = e("div", { class: "ms-netease-pl-name" }, "我喜欢的音乐", -1)),
                  e("div", Yt, l((J.value?.trackCount ?? i(r).neteaseSongs.length) || 0) + " 首曲目", 1)
                ])
              ], 2),
              e("button", {
                type: "button",
                class: N(["ms-netease-pl-item ms-netease-pl-recent", { active: v.value }]),
                onClick: Qe
              }, [
                t[23] || (t[23] = e("div", { class: "ms-netease-pl-icon-box" }, "🕒", -1)),
                e("div", Gt, [
                  t[22] || (t[22] = e("div", { class: "ms-netease-pl-name" }, "最近播放记录", -1)),
                  e("div", Xt, l(i(r).neteaseRecentSongs.length) + " 首曲目", 1)
                ])
              ], 2),
              (o(!0), c(M, null, O(Fe.value, (n) => (o(), c("button", {
                key: n.id,
                type: "button",
                class: N(["ms-netease-pl-item", { active: !p.value && !v.value && !ee.value && i(r).neteaseActivePlaylist?.id === n.id }]),
                onClick: (S) => Je(n)
              }, [
                e("img", {
                  class: "ms-netease-pl-cover",
                  src: n.coverImgUrl,
                  alt: "",
                  loading: "lazy"
                }, null, 8, es),
                e("div", ts, [
                  e("div", ss, l(n.name), 1),
                  e("div", ns, l(n.trackCount || 0) + " 首曲目", 1)
                ])
              ], 10, Zt))), 128))
            ]),
            e("div", as, [
              p.value ? (o(), c(M, { key: 0 }, [
                e("div", is, [
                  e("div", null, [
                    t[25] || (t[25] = e("div", { class: "ms-netease-tracks-title" }, "莱茵唱片 · 官方原声曲库", -1)),
                    e("div", ls, " 塞壬唱片 MSR 出品 · 共 " + l(i(f).albums?.length || 0) + " 张官方专辑 ", 1)
                  ]),
                  d.value ? P("", !0) : (o(), c("div", os, [
                    Pe(e("input", {
                      "onUpdate:modelValue": t[5] || (t[5] = (n) => k.value = n),
                      type: "text",
                      class: "ms-rhine-search-input",
                      placeholder: "搜索专辑或艺术家…"
                    }, null, 512), [
                      [Re, k.value]
                    ])
                  ]))
                ]),
                d.value ? (o(), c("div", cs, [
                  e("header", rs, [
                    e("button", {
                      type: "button",
                      class: "ms-rhine-back-btn",
                      onClick: t[6] || (t[6] = (n) => d.value = null)
                    }, " ‹ 返回专辑列表 "),
                    e("img", {
                      src: d.value.coverUrl || i(fe),
                      class: "ms-rhine-detail-cover",
                      alt: ""
                    }, null, 8, us),
                    e("div", ds, [
                      t[26] || (t[26] = e("span", { class: "siren-badge" }, "OFFICIAL ALBUM", -1)),
                      e("h2", vs, l(d.value.name), 1),
                      e("p", ms, "塞壬唱片-MSR 出品 · 共 " + l(d.value._songs?.length || 0) + " 首曲目", 1),
                      e("button", {
                        type: "button",
                        class: "ms-rhine-play-album-btn",
                        onClick: t[7] || (t[7] = (n) => We(d.value))
                      }, " ▶ 播放整张专辑 ")
                    ])
                  ]),
                  h.value ? (o(), c("div", ps, [...t[27] || (t[27] = [
                    e("div", { class: "ms-netease-spinner" }, null, -1),
                    e("div", { class: "ms-netease-loading-tip" }, "正在调取专辑曲目列表…", -1)
                  ])])) : (o(), c("div", hs, [
                    (o(!0), c(M, null, O(d.value._songs || [], (n, S) => (o(), c("button", {
                      key: n.cid,
                      type: "button",
                      class: N(["ms-netease-track-row", { playing: de(n) }]),
                      onClick: (F) => Ne(n)
                    }, [
                      e("span", gs, [
                        de(n) ? (o(), c("span", ys, "▶")) : (o(), c("span", _s, l(S + 1), 1))
                      ]),
                      e("div", bs, [
                        e("span", {
                          class: "ms-netease-track-name",
                          title: n.name
                        }, l(n.name), 9, ks),
                        e("span", Ss, l((n.artists || []).join(", ") || "塞壬唱片"), 1)
                      ]),
                      e("div", ws, [
                        e("button", {
                          type: "button",
                          class: N(["siren-btn-icon", { liked: ve(n) }]),
                          title: ve(n) ? "取消收藏" : "收藏曲目",
                          onClick: he((F) => De(n, F), ["stop"])
                        }, l(ve(n) ? "♥" : "♡"), 11, Cs)
                      ])
                    ], 10, fs))), 128))
                  ]))
                ])) : (o(), c("div", As, [
                  C.value.length ? (o(), c(M, { key: 1 }, [
                    e("div", Ps, [
                      (o(!0), c(M, null, O(Me.value, (n) => (o(), c("div", {
                        key: n.cid,
                        class: "ms-rhine-album-card",
                        onClick: (S) => Ie(n)
                      }, [
                        e("div", Ls, [
                          e("img", {
                            src: n.coverUrl || i(fe),
                            class: "ms-rhine-cover",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, Us),
                          t[28] || (t[28] = e("div", { class: "ms-rhine-hover-play" }, "▶", -1))
                        ]),
                        e("div", Es, [
                          e("span", {
                            class: "ms-rhine-album-name",
                            title: n.name
                          }, l(n.name), 9, Ms),
                          t[29] || (t[29] = e("span", { class: "ms-rhine-corp" }, "塞壬唱片 MSR", -1))
                        ])
                      ], 8, Rs))), 128))
                    ]),
                    W.value > 1 ? (o(), c("div", Ts, [
                      e("span", $s, " 第 " + l(g.value) + " / " + l(W.value) + " 页 · 共 " + l(C.value.length) + " 张专辑 ", 1),
                      e("div", Is, [
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: g.value <= 1,
                          title: "首页",
                          onClick: t[8] || (t[8] = (n) => g.value = 1)
                        }, " « ", 8, Ns),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: g.value <= 1,
                          title: "上一页",
                          onClick: t[9] || (t[9] = (n) => g.value = Math.max(1, g.value - 1))
                        }, " ◀ ", 8, Ws),
                        (o(!0), c(M, null, O(Te.value, (n) => (o(), c("button", {
                          key: "rpage-" + n,
                          type: "button",
                          class: N(["ms-page-btn", { active: n === g.value }]),
                          onClick: (S) => g.value = n
                        }, l(n), 11, Ds))), 128)),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: g.value >= W.value,
                          title: "下一页",
                          onClick: t[10] || (t[10] = (n) => g.value = Math.min(W.value, g.value + 1))
                        }, " ▶ ", 8, Fs),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: g.value >= W.value,
                          title: "尾页",
                          onClick: t[11] || (t[11] = (n) => g.value = W.value)
                        }, " » ", 8, Os)
                      ])
                    ])) : P("", !0)
                  ], 64)) : (o(), c("div", xs, " 正在加载专辑或未找到匹配项… "))
                ]))
              ], 64)) : (o(), c(M, { key: 1 }, [
                i(r).message ? (o(), c("div", Vs, [
                  e("span", null, l(i(r).message), 1)
                ])) : P("", !0),
                e("div", qs, [
                  e("div", null, [
                    e("div", zs, l(D.value ? `搜索结果 (${i(r).neteaseSearchResults.length})` : v.value ? `最近播放记录 (${i(r).neteaseRecentSongs.length})` : ee.value ? `我喜欢的音乐 (${i(r).neteaseSongs.length})` : i(r).neteaseActivePlaylist?.name || "我喜欢的音乐"), 1),
                    e("div", Hs, l(D.value ? "网易云曲库实时检索" : v.value ? "近期点播收听的历史歌曲" : ee.value ? "个人云端红心曲库，点击即可一键开始高保真串流播放" : "点击歌曲即可一键开始高保真串流播放"), 1)
                  ]),
                  D.value ? (o(), c("button", {
                    key: 0,
                    type: "button",
                    class: "ms-netease-logout-btn",
                    onClick: G
                  }, "清除搜索")) : v.value && i(r).neteaseRecentSongs.length > 0 ? (o(), c("button", {
                    key: 1,
                    type: "button",
                    class: "ms-netease-logout-btn",
                    onClick: t[12] || (t[12] = (n) => i(m).clearRecent())
                  }, "清空记录")) : P("", !0)
                ]),
                i(r).neteaseLoading ? (o(), c("div", Bs, [...t[30] || (t[30] = [
                  e("div", { class: "ms-netease-spinner" }, null, -1),
                  e("div", { class: "ms-netease-loading-tip" }, "正在同步网易云音源与歌单…", -1)
                ])])) : (o(), c(M, { key: 2 }, [
                  (o(!0), c(M, null, O(Ve.value, (n, S) => (o(), c("div", {
                    key: n.id || S,
                    class: N(["ms-netease-track-row", { playing: te(n) }]),
                    onClick: (F) => ye(n)
                  }, [
                    e("span", Qs, l(te(n) ? "▶" : (E.value - 1) * ie + S + 1), 1),
                    e("img", {
                      class: "ms-netease-track-cover",
                      src: Ge(n),
                      alt: "",
                      loading: "lazy"
                    }, null, 8, Js),
                    e("div", Ks, [
                      e("div", Ys, l(n.name), 1),
                      e("div", Gs, l(_e(n)), 1)
                    ]),
                    e("span", Xs, l(be(n)), 1)
                  ], 10, js))), 128)),
                  K.value.length ? P("", !0) : (o(), c("div", Zs, l(i(r).message ? "搜索未完成，请查看上方提示。" : D.value ? "未找到匹配的歌曲，请尝试其他关键词。" : "暂无曲目，可尝试在上方搜索框输入关键词。"), 1)),
                  Y.value > 1 ? (o(), c("div", en, [
                    e("span", tn, " 第 " + l(E.value) + " / " + l(Y.value) + " 页 · 共 " + l(K.value.length) + " 首 ", 1),
                    e("div", sn, [
                      e("button", {
                        type: "button",
                        class: "ms-page-btn",
                        disabled: E.value <= 1,
                        title: "上一页",
                        onClick: qe
                      }, " ◀ 上一页 ", 8, nn),
                      e("button", {
                        type: "button",
                        class: "ms-page-btn",
                        disabled: E.value >= Y.value,
                        title: "下一页",
                        onClick: ze
                      }, " 下一页 ▶ ", 8, an)
                    ])
                  ])) : P("", !0)
                ], 64))
              ], 64))
            ])
          ])
        ]),
        e("footer", ln, [
          e("img", {
            src: i(f).coverUrl || i(fe),
            alt: "",
            style: { width: "42px", height: "42px", "border-radius": "8px", "object-fit": "cover", "flex-shrink": "0" }
          }, null, 8, on),
          e("div", cn, [
            e("div", rn, [
              e("span", un, l(i(f).title || "暂无播放曲目"), 1),
              e("span", dn, l(i(f).formattedCurrent) + " / " + l(i(f).formattedDuration), 1)
            ]),
            e("input", {
              type: "range",
              min: "0",
              max: "100",
              step: "0.1",
              value: i(f).progressPercent,
              onInput: Xe,
              style: { width: "100%", height: "4px", "accent-color": "#f43f5e", cursor: "pointer" }
            }, null, 40, vn)
          ]),
          e("div", mn, [
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[13] || (t[13] = (n) => i(z).prev()),
              title: "上一首"
            }, "⏮"),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              style: { background: "#f43f5e", color: "#fff", "border-color": "#f43f5e" },
              onClick: t[14] || (t[14] = (n) => i(z).togglePlay()),
              title: i(f).playing ? "暂停" : "播放"
            }, l(i(f).playing ? "⏸" : "▶"), 9, pn),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[15] || (t[15] = (n) => i(z).next()),
              title: "下一首"
            }, "⏭"),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[16] || (t[16] = (n) => i(z).cycleMode()),
              title: i(f).mode
            }, l(He.value), 9, hn)
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "visible"]));
  }
}), An = /* @__PURE__ */ ot(gn, [["__scopeId", "data-v-acc1c32e"]]);
export {
  An as default
};
