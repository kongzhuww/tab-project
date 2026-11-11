import { r as et, d as tt, w as te, B as st, K as nt, j as at, H as it, u as i, s as S, b as C, o as c, i as e, e as r, F as R, m as Ce, t as o, f as L, A as I, g as F, l as xe, n as Ae, h as me, k as lt } from "./vendor-vue-9b0eS4bW.js";
import { t as E, _ as ot } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { V as f } from "./search.service-wriY3nvN.js";
import { Y as Pe, Z as se, _ as ne, $ as ae, j as J, a0 as ct, a1 as Re, a2 as rt, i as g, a3 as he, h as H, a4 as Y, Q as M, a5 as ut } from "./view-styles-NfYkuEdl.js";
import { A as dt } from "./AppWindowFrame-BH4F7oPG.js";
import { w as Le } from "./window-manager.store-BdI_8a-H.js";
function vt(O) {
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
  let k = !1, m = 0, u, N;
  function U() {
    if (!k) {
      if (a.neteaseUser = f.getUser(), a.neteaseRecentSongs = f.getRecentSongs(), !a.neteasePlaylists.length)
        try {
          const l = Pe(se);
          if (l.length && Array.isArray(l) && l.length) {
            a.neteasePlaylists = l;
            const d = l.find((v) => v.name?.includes("喜欢的音乐") || v.specialType === 5) || l[0];
            d && !a.neteaseActivePlaylist && (a.neteaseActivePlaylist = d);
          }
        } catch {
        }
      if (!a.neteaseSongs.length)
        try {
          const l = Pe(ne);
          l.length && Array.isArray(l) && l.length && (a.neteaseSongs = l);
        } catch {
        }
    }
  }
  function T() {
    m++, u?.abort(), u = void 0, a.neteaseLoading = !1, N !== void 0 && clearTimeout(N), N = void 0;
  }
  async function q(l) {
    if (k || !O()) return;
    if (J.pendingWrites) {
      a.message = "音乐操作正在处理，请稍候；未自动排队。";
      return;
    }
    T();
    const d = new AbortController(), v = m;
    u = d, a.neteaseLoading = !0, a.message = "";
    const y = () => !k && O() && m === v && !d.signal.aborted;
    try {
      await f.whenReady(), y() && await l(d.signal, y);
    } catch (h) {
      y() && (a.message = h?.message || "读取失败，请检查节点设置或网络后手动重试。");
    } finally {
      u === d && (u = void 0, a.neteaseLoading = !1);
    }
  }
  async function V(l, d, v = 500, y = 0) {
    try {
      const h = await f.request("/playlist/track/all", { id: l, limit: v, offset: y }, d);
      if (h.songs?.length) return h.songs;
    } catch {
      d.throwIfAborted();
    }
    return y === 0 ? (await f.request("/playlist/detail", { id: l }, d)).playlist?.tracks || [] : [];
  }
  async function B() {
    await q(async (l, d) => {
      U();
      const y = a.neteaseUser?.uid;
      let h = [];
      if (y)
        try {
          h = (await f.request("/user/playlist", { uid: y, limit: 100 }, l)).playlist || [];
        } catch (_) {
          d() && (a.message = _?.message || "官网歌单读取失败，请重新连接账户。");
          return;
        }
      if (!h.length)
        try {
          h = (await f.request("/toplist", {}, l)).list || [];
        } catch {
        }
      if (!d()) return;
      if (h.length) {
        a.neteasePlaylists = h;
        try {
          Re(se, h);
        } catch {
        }
      }
      const p = h.find((_) => _.id === a.neteaseActivePlaylist?.id) || h.find((_) => _.name?.includes("喜欢的音乐") || _.specialType === 5) || h[0];
      if (!p) return;
      if (!a.neteaseSongs.length)
        try {
          const _ = await V(p.id, l, 10, 0);
          d() && !a.neteaseSongs.length && (a.neteaseActivePlaylist = p, a.neteaseSongs = _, a.neteaseLoading = !1);
        } catch {
        }
      const W = await V(p.id, l, 500, 0);
      if (d() && (a.neteaseActivePlaylist = p, a.neteaseSongs = W, p.name?.includes("喜欢的音乐") || p.specialType === 5))
        try {
          Re(ne, W);
        } catch {
        }
    });
  }
  async function x(l) {
    await q(async (d, v) => {
      const y = f.getUser()?.uid;
      if (a.neteaseActivePlaylist = l, !a.neteaseSongs.length || a.neteaseActivePlaylist?.id !== l.id)
        try {
          const p = await V(l.id, d, 10, 0);
          v() && y === f.getUser()?.uid && (!a.neteaseSongs.length || a.neteaseActivePlaylist?.id !== l.id) && (a.neteaseSongs = p, a.neteaseLoading = !1);
        } catch {
        }
      const h = await V(l.id, d, 500, 0);
      v() && y === f.getUser()?.uid && (a.neteaseActivePlaylist = l, a.neteaseSongs = h);
    });
  }
  async function $(l) {
    if (!l.trim()) {
      T(), a.neteaseSearchResults = [];
      return;
    }
    await q(async (d, v) => {
      a.neteaseSearchResults = [];
      const y = f.getUser()?.uid;
      let h = [];
      try {
        h = (await f.request("/cloudsearch", { keywords: l.trim(), type: 1, limit: 60 }, d)).result?.songs || [];
      } catch {
        d.throwIfAborted();
      }
      h.length || (h = (await f.request("/search", { keywords: l.trim(), limit: 60 }, d)).result?.songs || []), v() && y === f.getUser()?.uid && (a.neteaseSearchResults = h);
    });
  }
  async function A(l) {
    if (!(k || !O())) {
      if (J.pendingWrites) {
        a.message = "音乐操作正在处理，请稍候；未自动排队。";
        return;
      }
      try {
        await ct(l);
      } catch {
        k || (a.message = "操作未完整完成，部分变更可能已保存，请重读核对；未自动重试。");
      }
    }
  }
  async function w() {
    if (k || !O()) throw new Error("请先打开网易云模块。");
    T(), await f.connectWebsiteAccount(), ae(se), ae(ne), !(k || !O()) && (U(), await B());
  }
  async function G() {
    if (T(), typeof localStorage < "u")
      try {
        localStorage.setItem("netease_explicit_logout", "true"), ae(ne), ae(se);
      } catch {
      }
    await A(async () => {
      await f.logout(), a.neteaseUser = null, a.neteasePlaylists = [], a.neteaseActivePlaylist = null, a.neteaseSongs = [], a.neteaseSearchResults = [], a.message = "已断开插件账户；可点击「连接官网账户」重新连接，不影响官网登录。";
    });
  }
  async function le() {
    await A(async () => {
      await f.connectWebsiteAccount(), await f.fetchAccountRecentSongs(60), U(), B(), a.message = "✓ 账号历史与歌单已同步刷新！";
    });
  }
  async function oe() {
    await A(async () => {
      await f.clearRecentSongs(), U();
    });
  }
  function ce() {
    k || (T(), U(), a.neteasePlaylists = [], a.neteaseSongs = [], a.neteaseSearchResults = [], a.neteaseActivePlaylist = null, a.message = "账号资料发生变化，请核对；需要时手动刷新歌单。");
  }
  function j() {
    k = !0, T();
  }
  return { state: a, refresh: B, selectPlaylist: x, search: $, connectWebsite: w, logout: G, clearRecent: oe, syncLocal: U, pause: T, dispose: j, accountChanged: ce, syncHistory: le };
}
const mt = { class: "ms-source-pane ms-netease-source" }, ht = { class: "ms-netease-user-bar" }, pt = { class: "ms-netease-user-info" }, gt = ["src"], ft = { class: "ms-netease-meta" }, yt = { class: "ms-netease-name" }, _t = {
  key: 0,
  class: "ms-netease-vip-badge"
}, bt = { class: "ms-netease-status-text" }, kt = {
  key: 1,
  class: "ms-netease-meta"
}, St = { class: "ms-netease-name" }, wt = { class: "ms-netease-status-text" }, Ct = { style: { display: "flex", gap: "8px", "align-items": "center" } }, xt = ["disabled"], At = ["disabled"], Pt = { class: "ms-netease-body" }, Rt = { class: "ms-netease-playlists" }, Lt = { class: "ms-netease-section-title" }, Ut = { class: "ms-netease-pl-info" }, Et = { class: "ms-netease-pl-name" }, Mt = { class: "ms-netease-pl-count" }, Tt = { class: "ms-netease-pl-info" }, $t = { class: "ms-netease-pl-count" }, It = { class: "ms-netease-pl-info" }, Nt = { class: "ms-netease-pl-count" }, Wt = ["onClick"], Dt = ["src"], Ft = { class: "ms-netease-pl-info" }, Ot = { class: "ms-netease-pl-name" }, Vt = { class: "ms-netease-pl-count" }, zt = { class: "ms-netease-tracks" }, Ht = { class: "ms-netease-tracks-head" }, qt = { class: "ms-netease-tracks-sub" }, Bt = {
  key: 0,
  class: "ms-rhine-search-wrap"
}, jt = {
  key: 0,
  class: "ms-rhine-album-detail"
}, Kt = { class: "ms-rhine-detail-banner" }, Qt = ["src"], Yt = { class: "ms-rhine-detail-info" }, Jt = { class: "ms-rhine-detail-title" }, Gt = { class: "ms-rhine-detail-sub" }, Zt = {
  key: 0,
  class: "ms-netease-loading-box"
}, Xt = {
  key: 1,
  class: "ms-rhine-track-list"
}, es = ["onClick"], ts = { class: "ms-netease-track-idx" }, ss = {
  key: 0,
  style: { color: "#f59e0b" }
}, ns = { key: 1 }, as = { class: "ms-netease-track-info" }, is = ["title"], ls = { class: "ms-netease-track-artist" }, os = {
  class: "ms-netease-track-dur",
  style: { display: "flex", "align-items": "center", gap: "8px" }
}, cs = ["title", "onClick"], rs = {
  key: 1,
  class: "ms-rhine-grid-wrap"
}, us = {
  key: 0,
  class: "ms-dropdown-empty",
  style: { padding: "40px 0" }
}, ds = { class: "ms-rhine-album-grid" }, vs = ["onClick"], ms = { class: "ms-rhine-cover-wrap" }, hs = ["src"], ps = { class: "ms-rhine-meta" }, gs = ["title"], fs = {
  key: 0,
  class: "ms-netease-pagination-bar ms-rhine-pagination-bar"
}, ys = { class: "ms-pagination-info" }, _s = { class: "ms-pagination-btns" }, bs = ["disabled"], ks = ["disabled"], Ss = ["onClick"], ws = ["disabled"], Cs = ["disabled"], xs = {
  key: 0,
  class: "ms-dropdown-section"
}, As = { class: "ms-search-history-tags" }, Ps = ["onClick"], Rs = ["onClick"], Ls = {
  key: 1,
  class: "ms-dropdown-section"
}, Us = { class: "ms-dropdown-head" }, Es = { class: "ms-recent-dropdown-list" }, Ms = ["onClick"], Ts = { class: "ms-drop-play" }, $s = { class: "ms-drop-title" }, Is = { class: "ms-drop-artist" }, Ns = { class: "ms-drop-dur" }, Ws = {
  key: 2,
  class: "ms-dropdown-empty"
}, Ds = {
  key: 0,
  class: "ms-netease-msg-banner"
}, Fs = { class: "ms-netease-tracks-head" }, Os = { class: "ms-netease-tracks-title" }, Vs = { class: "ms-netease-tracks-sub" }, zs = {
  key: 1,
  class: "ms-netease-loading-box"
}, Hs = ["onClick"], qs = { class: "ms-netease-track-idx" }, Bs = ["src"], js = { class: "ms-netease-track-info" }, Ks = { class: "ms-netease-track-name" }, Qs = { class: "ms-netease-track-artist" }, Ys = { class: "ms-netease-track-dur" }, Js = {
  key: 0,
  style: { padding: "30px", "text-align": "center", color: "var(--muted)", "font-size": "13px" }
}, Gs = {
  key: 1,
  class: "ms-netease-pagination-bar"
}, Zs = { class: "ms-pagination-info" }, Xs = { class: "ms-pagination-btns" }, en = ["disabled"], tn = ["disabled"], sn = { style: { display: "flex", "align-items": "center", gap: "12px", padding: "10px 16px", "border-top": "1px solid var(--border)", background: "var(--panel)" } }, nn = ["src"], an = { style: { flex: "1", "min-width": "0", display: "flex", "flex-direction": "column", gap: "4px" } }, ln = { style: { display: "flex", "justify-content": "space-between", "font-size": "12px" } }, on = { style: { "font-weight": "600", "white-space": "nowrap", overflow: "hidden", "text-overflow": "ellipsis", color: "var(--heading)" } }, cn = { style: { color: "var(--muted)", "font-size": "11px" } }, rn = ["value"], un = { style: { display: "flex", "align-items": "center", gap: "6px" } }, dn = ["title"], vn = ["title"], mn = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23334155'/%3E%3Ccircle cx='32' cy='24' r='10' fill='%2364748b'/%3E%3Cpath d='M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16' fill='%2364748b'/%3E%3C/svg%3E", pe = 8, ie = 10, hn = /* @__PURE__ */ tt({
  __name: "NeteaseWorkspaceDialog",
  setup(O) {
    const a = C(!document.hidden), k = S(() => J.visible && a.value), m = vt(() => k.value), u = m.state, N = S(() => Y.isConnecting), U = C("先在同一浏览器的网易云官网登录，再点击「连接官网账户」。无需音乐节点；插件断开不会退出官网。");
    function T() {
      typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: "https://music.163.com/" }) : window.open("https://music.163.com/", "_blank", "noopener,noreferrer");
    }
    async function q() {
      if (!N.value && Y.send({ type: "START_CONNECT" })) {
        U.value = "正在使用浏览器官网会话读取账户…";
        try {
          await m.connectWebsite();
          const s = f.getUser();
          Y.send({ type: "CONNECT_SUCCESS", user: s }), U.value = "官网账户已连接。若歌单读取失败，请查看列表提示。";
        } catch (s) {
          const t = s?.message || "官网账户连接失败，请确认已登录。";
          Y.send({ type: "CONNECT_FAILURE", message: t }), U.value = t;
        }
      }
    }
    async function V() {
      await m.logout(), Y.send({ type: "LOGOUT" }), g.neteaseUser = null, g.neteaseSongs = [], g.neteasePlaylists = [], U.value = "已断开插件账户，官网仍保持登录。";
    }
    const B = C(null), x = C(""), $ = C(!1);
    let A = null;
    const w = C([]);
    try {
      const s = localStorage.getItem("netease_search_history");
      if (s) {
        const t = JSON.parse(s);
        Array.isArray(t) && (w.value = t.slice(0, 15));
      }
    } catch {
    }
    function G(s) {
      const t = s.trim();
      if (t) {
        w.value = [t, ...w.value.filter((n) => n !== t)].slice(0, 15);
        try {
          localStorage.setItem("netease_search_history", JSON.stringify(w.value));
        } catch {
        }
      }
    }
    function le(s) {
      w.value = w.value.filter((t) => t !== s);
      try {
        localStorage.setItem("netease_search_history", JSON.stringify(w.value));
      } catch {
      }
    }
    function oe() {
      w.value = [];
      try {
        localStorage.removeItem("netease_search_history");
      } catch {
      }
    }
    function ce(s) {
      x.value = s, $.value = !1, m.search(s);
    }
    function j(s) {
      s.target?.closest(".ms-netease-search-wrap") || ($.value = !1);
    }
    const l = C(!1), d = C(!1), v = C(null), y = C(!1), h = C(""), p = C(1), W = S(() => {
      const s = g.albums || [], t = h.value.trim().toLowerCase();
      return t ? s.filter((n) => (n.name || "").toLowerCase().includes(t)) : s;
    }), _ = S(() => Math.max(1, Math.ceil(W.value.length / pe))), Ue = S(() => {
      const s = (p.value - 1) * pe;
      return W.value.slice(s, s + pe);
    }), Ee = S(() => {
      const s = _.value, t = p.value, n = [], b = Math.max(1, t - 2), D = Math.min(s, t + 2);
      for (let ve = b; ve <= D; ve++)
        n.push(ve);
      return n;
    });
    te(h, () => {
      p.value = 1;
    });
    function Me() {
      m.pause(), d.value = !0, l.value = !1, v.value = null, (!g.albums || g.albums.length === 0) && M.getSirenAlbums().then((s) => {
        s?.length && (g.albums = s);
      });
    }
    async function Te(s) {
      if (v.value = s, !s._songs || !s._songs.length) {
        y.value = !0;
        try {
          const t = await M.getSirenAlbumDetail(s.cid);
          s._songs = t, v.value = { ...s, _songs: t };
        } catch (t) {
          console.warn("加载专辑曲目失败", t);
        } finally {
          y.value = !1;
        }
      }
    }
    function $e(s) {
      if (v.value?._songs?.length) {
        const t = v.value._songs, n = t.findIndex((b) => String(b.cid) === String(s.cid));
        M.setQueue(t, n >= 0 ? n : 0, !0), g.activeAlbum = v.value;
      } else
        M.playSong(s);
    }
    function Ie(s) {
      const t = s._songs || [];
      t.length > 0 && (M.setQueue(t, 0, !0), g.activeAlbum = s);
    }
    function re(s) {
      if (!g.playing) return !1;
      const t = M.getState().currentSong;
      return !!(t && String(t.cid) === String(s.cid));
    }
    function ue(s) {
      return M.isLiked(s.cid);
    }
    function Ne(s, t) {
      t?.stopPropagation();
      const n = M.toggleLike(s);
      re(s) && (g.liked = n);
    }
    const K = S(() => u.neteasePlaylists.find((s) => s.name?.includes("喜欢的音乐") || s.specialType === 5)), We = S(() => {
      const s = K.value;
      return s ? u.neteasePlaylists.filter((t) => t.id !== s.id) : u.neteasePlaylists;
    }), Z = S(() => d.value || l.value || z.value ? !1 : K.value && u.neteaseActivePlaylist?.id === K.value.id);
    function De() {
      m.pause(), d.value = !1, v.value = null, l.value = !1;
      const s = K.value;
      s ? m.selectPlaylist(s) : u.neteasePlaylists[0] && m.selectPlaylist(u.neteasePlaylists[0]);
    }
    const z = S(() => x.value.trim().length > 0 && u.neteaseSearchResults.length > 0), X = S(() => z.value ? u.neteaseSearchResults : l.value ? u.neteaseRecentSongs : u.neteaseSongs), P = C(1), Q = S(() => Math.max(1, Math.ceil(X.value.length / ie))), Fe = S(() => {
      const s = (P.value - 1) * ie;
      return X.value.slice(s, s + ie);
    });
    te(
      () => [u.neteaseActivePlaylist?.id, z.value, l.value],
      () => {
        P.value = 1;
      }
    ), te(Q, (s) => {
      P.value > s && (P.value = Math.max(1, s));
    });
    function Oe() {
      P.value > 1 && P.value--;
    }
    function Ve() {
      P.value < Q.value && P.value++;
    }
    const ze = S(() => g.mode === "shuffle" ? "🔀" : g.mode === "one" ? "🔂" : "🔁");
    function He() {
      Le.minimize("music");
    }
    function qe() {
      Le.close("music");
    }
    function Be() {
      m.pause(), d.value = !1, v.value = null, l.value = !0, u.neteaseActivePlaylist = null;
    }
    function je(s) {
      d.value = !1, v.value = null, l.value = !1, m.selectPlaylist(s);
    }
    function Ke() {
      m.pause(), A && clearTimeout(A), A = setTimeout(() => {
        if (!k.value) return;
        const s = x.value.trim();
        s && G(s), m.search(x.value);
      }, 400);
    }
    function Qe() {
      A && clearTimeout(A);
      const s = x.value.trim();
      s && G(s), $.value = !1, m.search(x.value);
    }
    function Ye() {
      m.pause(), x.value = "", u.neteaseSearchResults = [];
    }
    function ge(s) {
      H.playNeteaseTrack(s);
    }
    function ee(s) {
      return !!(s.id && String(s.id) === String(M.getState().currentSong?.neteaseId) || s.cid && String(s.cid) === String(M.getState().currentSong?.cid));
    }
    function Je(s) {
      return s.picUrl || s.coverUrl || s.al?.picUrl || s.album?.picUrl || ut;
    }
    function fe(s) {
      const t = s.ar || s.artists;
      return Array.isArray(t) && t.length ? t.map((n) => n.name).join(", ") : "未知歌手";
    }
    function ye(s) {
      const t = s.dt || s.duration || 0, n = Math.floor(t > 1e3 ? t / 1e3 : t), b = Math.floor(n / 60), D = n % 60;
      return `${b}:${String(D).padStart(2, "0")}`;
    }
    function Ge(s) {
      const t = Number(s.target.value);
      H.seek(t);
    }
    function Ze() {
      m.refresh();
    }
    function de() {
      m.pause(), A && clearTimeout(A), A = null, $.value = !1, document.removeEventListener("click", j);
    }
    const Xe = rt(de);
    let _e = !1;
    function be() {
      !_e && k.value && (_e = !0, m.refresh());
    }
    function ke() {
      a.value = !document.hidden;
    }
    function Se() {
      m.syncLocal();
    }
    function we() {
      m.accountChanged();
    }
    return te(k, (s) => {
      s ? (m.syncLocal(), document.addEventListener("click", j), be()) : de();
    }, { flush: "sync" }), st(() => {
      document.addEventListener("visibilitychange", ke), window.addEventListener("netease:recent-updated", Se), window.addEventListener("netease:account-updated", we), m.syncLocal(), k.value && (document.addEventListener("click", j), be());
    }), nt(() => {
      de(), Xe(), m.dispose(), document.removeEventListener("visibilitychange", ke), window.removeEventListener("netease:recent-updated", Se), window.removeEventListener("netease:account-updated", we);
    }), (s, t) => (c(), at(dt, {
      id: "music-workspace",
      "window-id": "music",
      title: i(E)("netease.title"),
      icon: "🎵",
      visible: i(J).visible,
      "default-width": 960,
      "default-height": 640,
      "min-width": 480,
      "min-height": 360,
      "custom-class": "ms-panel ms-source-netease",
      onMinimize: He,
      onClose: qe
    }, {
      default: it(() => [
        e("div", mt, [
          e("div", ht, [
            e("div", pt, [
              i(u).neteaseUser?.nickname ? (c(), r(R, { key: 0 }, [
                e("img", {
                  class: "ms-netease-avatar",
                  src: i(u).neteaseUser.avatarUrl || mn,
                  alt: "avatar"
                }, null, 8, gt),
                e("div", ft, [
                  e("span", yt, [
                    Ce(o(i(u).neteaseUser.nickname) + " ", 1),
                    i(u).neteaseUser.isVip ? (c(), r("span", _t, "VIP")) : L("", !0)
                  ]),
                  e("span", bt, o(i(E)("netease.connected")), 1)
                ])
              ], 64)) : (c(), r("div", kt, [
                e("span", St, o(i(E)("netease.guestMode")), 1),
                e("span", wt, o(i(E)("netease.guestSub")), 1)
              ]))
            ]),
            e("div", Ct, [
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                disabled: i(J).pendingWrites > 0,
                onClick: Ze
              }, o(i(E)("netease.refreshList")), 9, xt),
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                style: { color: "#f43f5e", "border-color": "rgba(244, 63, 94, 0.4)", "font-weight": "600" },
                onClick: T
              }, o(i(E)("netease.webLogin")), 1),
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                disabled: N.value,
                onClick: q
              }, o(N.value ? i(E)("netease.connecting") : i(E)("netease.connectWebsite")), 9, At),
              i(u).neteaseUser?.nickname ? (c(), r("button", {
                key: 0,
                type: "button",
                class: "ms-netease-logout-btn",
                onClick: V
              }, o(i(E)("netease.logout")), 1)) : L("", !0)
            ])
          ]),
          e("div", Pt, [
            e("div", Rt, [
              e("div", Lt, o(i(E)("netease.officialSoundtrack")), 1),
              e("button", {
                type: "button",
                class: I(["ms-netease-pl-item ms-netease-pl-rhine", { active: d.value }]),
                onClick: Me
              }, [
                t[16] || (t[16] = e("div", {
                  class: "ms-netease-pl-icon-box",
                  style: { background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(234, 88, 12, 0.2))", color: "#f59e0b" }
                }, "💿", -1)),
                e("div", Ut, [
                  e("div", Et, o(i(E)("netease.rhineMusic")), 1),
                  e("div", Mt, o(i(g).albums?.length || 0) + " 张官方专辑", 1)
                ])
              ], 2),
              t[21] || (t[21] = e("div", { class: "ms-netease-section-title" }, "我的歌单 & 精选推荐", -1)),
              e("button", {
                type: "button",
                class: I(["ms-netease-pl-item ms-netease-pl-favorites", { active: Z.value }]),
                onClick: De
              }, [
                t[18] || (t[18] = e("div", {
                  class: "ms-netease-pl-icon-box",
                  style: { background: "rgba(244, 63, 94, 0.15)", color: "#f43f5e" }
                }, "❤️", -1)),
                e("div", Tt, [
                  t[17] || (t[17] = e("div", { class: "ms-netease-pl-name" }, "我喜欢的音乐", -1)),
                  e("div", $t, o((K.value?.trackCount ?? i(u).neteaseSongs.length) || 0) + " 首曲目", 1)
                ])
              ], 2),
              e("button", {
                type: "button",
                class: I(["ms-netease-pl-item ms-netease-pl-recent", { active: l.value }]),
                onClick: Be
              }, [
                t[20] || (t[20] = e("div", { class: "ms-netease-pl-icon-box" }, "🕒", -1)),
                e("div", It, [
                  t[19] || (t[19] = e("div", { class: "ms-netease-pl-name" }, "最近播放记录", -1)),
                  e("div", Nt, o(i(u).neteaseRecentSongs.length) + " 首曲目", 1)
                ])
              ], 2),
              (c(!0), r(R, null, F(We.value, (n) => (c(), r("button", {
                key: n.id,
                type: "button",
                class: I(["ms-netease-pl-item", { active: !d.value && !l.value && !Z.value && i(u).neteaseActivePlaylist?.id === n.id }]),
                onClick: (b) => je(n)
              }, [
                e("img", {
                  class: "ms-netease-pl-cover",
                  src: n.coverImgUrl,
                  alt: "",
                  loading: "lazy"
                }, null, 8, Dt),
                e("div", Ft, [
                  e("div", Ot, o(n.name), 1),
                  e("div", Vt, o(n.trackCount || 0) + " 首曲目", 1)
                ])
              ], 10, Wt))), 128))
            ]),
            e("div", zt, [
              d.value ? (c(), r(R, { key: 0 }, [
                e("div", Ht, [
                  e("div", null, [
                    t[22] || (t[22] = e("div", { class: "ms-netease-tracks-title" }, "莱茵唱片 · 官方原声曲库", -1)),
                    e("div", qt, " 塞壬唱片 MSR 出品 · 共 " + o(i(g).albums?.length || 0) + " 张官方专辑 ", 1)
                  ]),
                  v.value ? L("", !0) : (c(), r("div", Bt, [
                    xe(e("input", {
                      "onUpdate:modelValue": t[0] || (t[0] = (n) => h.value = n),
                      type: "text",
                      class: "ms-rhine-search-input",
                      placeholder: "搜索专辑或艺术家…"
                    }, null, 512), [
                      [Ae, h.value]
                    ])
                  ]))
                ]),
                v.value ? (c(), r("div", jt, [
                  e("header", Kt, [
                    e("button", {
                      type: "button",
                      class: "ms-rhine-back-btn",
                      onClick: t[1] || (t[1] = (n) => v.value = null)
                    }, " ‹ 返回专辑列表 "),
                    e("img", {
                      src: v.value.coverUrl || i(he),
                      class: "ms-rhine-detail-cover",
                      alt: ""
                    }, null, 8, Qt),
                    e("div", Yt, [
                      t[23] || (t[23] = e("span", { class: "siren-badge" }, "OFFICIAL ALBUM", -1)),
                      e("h2", Jt, o(v.value.name), 1),
                      e("p", Gt, "塞壬唱片-MSR 出品 · 共 " + o(v.value._songs?.length || 0) + " 首曲目", 1),
                      e("button", {
                        type: "button",
                        class: "ms-rhine-play-album-btn",
                        onClick: t[2] || (t[2] = (n) => Ie(v.value))
                      }, " ▶ 播放整张专辑 ")
                    ])
                  ]),
                  y.value ? (c(), r("div", Zt, [...t[24] || (t[24] = [
                    e("div", { class: "ms-netease-spinner" }, null, -1),
                    e("div", { class: "ms-netease-loading-tip" }, "正在调取专辑曲目列表…", -1)
                  ])])) : (c(), r("div", Xt, [
                    (c(!0), r(R, null, F(v.value._songs || [], (n, b) => (c(), r("button", {
                      key: n.cid,
                      type: "button",
                      class: I(["ms-netease-track-row", { playing: re(n) }]),
                      onClick: (D) => $e(n)
                    }, [
                      e("span", ts, [
                        re(n) ? (c(), r("span", ss, "▶")) : (c(), r("span", ns, o(b + 1), 1))
                      ]),
                      e("div", as, [
                        e("span", {
                          class: "ms-netease-track-name",
                          title: n.name
                        }, o(n.name), 9, is),
                        e("span", ls, o((n.artists || []).join(", ") || "塞壬唱片"), 1)
                      ]),
                      e("div", os, [
                        e("button", {
                          type: "button",
                          class: I(["siren-btn-icon", { liked: ue(n) }]),
                          title: ue(n) ? "取消收藏" : "收藏曲目",
                          onClick: me((D) => Ne(n, D), ["stop"])
                        }, o(ue(n) ? "♥" : "♡"), 11, cs)
                      ])
                    ], 10, es))), 128))
                  ]))
                ])) : (c(), r("div", rs, [
                  W.value.length ? (c(), r(R, { key: 1 }, [
                    e("div", ds, [
                      (c(!0), r(R, null, F(Ue.value, (n) => (c(), r("div", {
                        key: n.cid,
                        class: "ms-rhine-album-card",
                        onClick: (b) => Te(n)
                      }, [
                        e("div", ms, [
                          e("img", {
                            src: n.coverUrl || i(he),
                            class: "ms-rhine-cover",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, hs),
                          t[25] || (t[25] = e("div", { class: "ms-rhine-hover-play" }, "▶", -1))
                        ]),
                        e("div", ps, [
                          e("span", {
                            class: "ms-rhine-album-name",
                            title: n.name
                          }, o(n.name), 9, gs),
                          t[26] || (t[26] = e("span", { class: "ms-rhine-corp" }, "塞壬唱片 MSR", -1))
                        ])
                      ], 8, vs))), 128))
                    ]),
                    _.value > 1 ? (c(), r("div", fs, [
                      e("span", ys, " 第 " + o(p.value) + " / " + o(_.value) + " 页 · 共 " + o(W.value.length) + " 张专辑 ", 1),
                      e("div", _s, [
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: p.value <= 1,
                          title: "首页",
                          onClick: t[3] || (t[3] = (n) => p.value = 1)
                        }, " « ", 8, bs),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: p.value <= 1,
                          title: "上一页",
                          onClick: t[4] || (t[4] = (n) => p.value = Math.max(1, p.value - 1))
                        }, " ◀ ", 8, ks),
                        (c(!0), r(R, null, F(Ee.value, (n) => (c(), r("button", {
                          key: "rpage-" + n,
                          type: "button",
                          class: I(["ms-page-btn", { active: n === p.value }]),
                          onClick: (b) => p.value = n
                        }, o(n), 11, Ss))), 128)),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: p.value >= _.value,
                          title: "下一页",
                          onClick: t[5] || (t[5] = (n) => p.value = Math.min(_.value, p.value + 1))
                        }, " ▶ ", 8, ws),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: p.value >= _.value,
                          title: "尾页",
                          onClick: t[6] || (t[6] = (n) => p.value = _.value)
                        }, " » ", 8, Cs)
                      ])
                    ])) : L("", !0)
                  ], 64)) : (c(), r("div", us, " 正在加载专辑或未找到匹配项… "))
                ]))
              ], 64)) : (c(), r(R, { key: 1 }, [
                e("div", {
                  class: "ms-netease-search-wrap",
                  ref_key: "searchWrapRef",
                  ref: B
                }, [
                  xe(e("input", {
                    type: "text",
                    class: "ms-netease-search-input",
                    placeholder: "全网搜索网易云单曲、歌手名或专辑…",
                    "onUpdate:modelValue": t[7] || (t[7] = (n) => x.value = n),
                    onKeydown: lt(Qe, ["enter"]),
                    onInput: Ke,
                    onFocus: t[8] || (t[8] = (n) => $.value = !0)
                  }, null, 544), [
                    [Ae, x.value]
                  ]),
                  $.value && !x.value.trim() ? (c(), r("div", {
                    key: 0,
                    class: "ms-netease-search-dropdown",
                    onMousedown: t[10] || (t[10] = me(() => {
                    }, ["prevent"]))
                  }, [
                    w.value.length > 0 ? (c(), r("div", xs, [
                      e("div", { class: "ms-dropdown-head" }, [
                        t[27] || (t[27] = e("span", { class: "ms-dropdown-title" }, "🔍 搜索历史", -1)),
                        e("button", {
                          type: "button",
                          class: "ms-dropdown-clear",
                          onClick: oe
                        }, "清空")
                      ]),
                      e("div", As, [
                        (c(!0), r(R, null, F(w.value, (n) => (c(), r("span", {
                          key: "hist-" + n,
                          class: "ms-search-tag",
                          onClick: (b) => ce(n)
                        }, [
                          Ce(o(n) + " ", 1),
                          e("b", {
                            class: "ms-tag-del",
                            onClick: me((b) => le(n), ["stop"])
                          }, "×", 8, Rs)
                        ], 8, Ps))), 128))
                      ])
                    ])) : L("", !0),
                    i(u).neteaseRecentSongs.length > 0 ? (c(), r("div", Ls, [
                      e("div", Us, [
                        t[28] || (t[28] = e("span", { class: "ms-dropdown-title" }, "🕒 历史听歌记录", -1)),
                        e("button", {
                          type: "button",
                          class: "ms-dropdown-clear",
                          onClick: t[9] || (t[9] = (n) => i(m).clearRecent())
                        }, "清空")
                      ]),
                      e("div", Es, [
                        (c(!0), r(R, null, F(i(u).neteaseRecentSongs.slice(0, 8), (n) => (c(), r("div", {
                          key: "drop-rec-" + n.id,
                          class: I(["ms-recent-dropdown-item", { playing: ee(n) }]),
                          onClick: (b) => {
                            ge(n), $.value = !1;
                          }
                        }, [
                          e("span", Ts, o(ee(n) ? "▶" : "♫"), 1),
                          e("span", $s, o(n.name), 1),
                          e("span", Is, o(fe(n)), 1),
                          e("span", Ns, o(ye(n)), 1)
                        ], 10, Ms))), 128))
                      ])
                    ])) : L("", !0),
                    !w.value.length && !i(u).neteaseRecentSongs.length ? (c(), r("div", Ws, " 暂无搜索与播放历史，输入歌名或歌手即可开始畅听 ")) : L("", !0)
                  ], 32)) : L("", !0)
                ], 512),
                i(u).message ? (c(), r("div", Ds, [
                  e("span", null, o(i(u).message), 1)
                ])) : L("", !0),
                e("div", Fs, [
                  e("div", null, [
                    e("div", Os, o(z.value ? `搜索结果 (${i(u).neteaseSearchResults.length})` : l.value ? `最近播放记录 (${i(u).neteaseRecentSongs.length})` : Z.value ? `我喜欢的音乐 (${i(u).neteaseSongs.length})` : i(u).neteaseActivePlaylist?.name || "我喜欢的音乐"), 1),
                    e("div", Vs, o(z.value ? "网易云曲库实时检索" : l.value ? "近期点播收听的历史歌曲" : Z.value ? "个人云端红心曲库，点击即可一键开始高保真串流播放" : "点击歌曲即可一键开始高保真串流播放"), 1)
                  ]),
                  z.value ? (c(), r("button", {
                    key: 0,
                    type: "button",
                    class: "ms-netease-logout-btn",
                    onClick: Ye
                  }, "清除搜索")) : l.value && i(u).neteaseRecentSongs.length > 0 ? (c(), r("button", {
                    key: 1,
                    type: "button",
                    class: "ms-netease-logout-btn",
                    onClick: t[11] || (t[11] = (n) => i(m).clearRecent())
                  }, "清空记录")) : L("", !0)
                ]),
                i(u).neteaseLoading ? (c(), r("div", zs, [...t[29] || (t[29] = [
                  e("div", { class: "ms-netease-spinner" }, null, -1),
                  e("div", { class: "ms-netease-loading-tip" }, "正在同步网易云音源与歌单…", -1)
                ])])) : (c(), r(R, { key: 2 }, [
                  (c(!0), r(R, null, F(Fe.value, (n, b) => (c(), r("div", {
                    key: n.id || b,
                    class: I(["ms-netease-track-row", { playing: ee(n) }]),
                    onClick: (D) => ge(n)
                  }, [
                    e("span", qs, o(ee(n) ? "▶" : (P.value - 1) * ie + b + 1), 1),
                    e("img", {
                      class: "ms-netease-track-cover",
                      src: Je(n),
                      alt: "",
                      loading: "lazy"
                    }, null, 8, Bs),
                    e("div", js, [
                      e("div", Ks, o(n.name), 1),
                      e("div", Qs, o(fe(n)), 1)
                    ]),
                    e("span", Ys, o(ye(n)), 1)
                  ], 10, Hs))), 128)),
                  X.value.length ? L("", !0) : (c(), r("div", Js, " 未找到曲目，可尝试在上方搜索框输入关键词 ")),
                  Q.value > 1 ? (c(), r("div", Gs, [
                    e("span", Zs, " 第 " + o(P.value) + " / " + o(Q.value) + " 页 · 共 " + o(X.value.length) + " 首 ", 1),
                    e("div", Xs, [
                      e("button", {
                        type: "button",
                        class: "ms-page-btn",
                        disabled: P.value <= 1,
                        title: "上一页",
                        onClick: Oe
                      }, " ◀ 上一页 ", 8, en),
                      e("button", {
                        type: "button",
                        class: "ms-page-btn",
                        disabled: P.value >= Q.value,
                        title: "下一页",
                        onClick: Ve
                      }, " 下一页 ▶ ", 8, tn)
                    ])
                  ])) : L("", !0)
                ], 64))
              ], 64))
            ])
          ])
        ]),
        e("footer", sn, [
          e("img", {
            src: i(g).coverUrl || i(he),
            alt: "",
            style: { width: "42px", height: "42px", "border-radius": "8px", "object-fit": "cover", "flex-shrink": "0" }
          }, null, 8, nn),
          e("div", an, [
            e("div", ln, [
              e("span", on, o(i(g).title || "暂无播放曲目"), 1),
              e("span", cn, o(i(g).formattedCurrent) + " / " + o(i(g).formattedDuration), 1)
            ]),
            e("input", {
              type: "range",
              min: "0",
              max: "100",
              step: "0.1",
              value: i(g).progressPercent,
              onInput: Ge,
              style: { width: "100%", height: "4px", "accent-color": "#f43f5e", cursor: "pointer" }
            }, null, 40, rn)
          ]),
          e("div", un, [
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
              title: i(g).playing ? "暂停" : "播放"
            }, o(i(g).playing ? "⏸" : "▶"), 9, dn),
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
              title: i(g).mode
            }, o(ze.value), 9, vn)
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "visible"]));
  }
}), kn = /* @__PURE__ */ ot(hn, [["__scopeId", "data-v-5702bd7b"]]);
export {
  kn as default
};
