import { r as Ze, d as Ge, y as G, D as et, M as tt, e as st, w as nt, u as c, x as C, b as w, o as l, g as e, f as o, F as R, n as we, t as r, h as L, C as I, i as N, m as Se, p as Ce, j as de, l as at } from "./vendor-vue-wIH4jcna.js";
import { Q as g } from "./search.service-B8FaDQLd.js";
import { U as xe, V as ee, X as te, Y as se, l as K, Z as it, _ as Ae, $ as lt, k as h, a0 as ve, h as q, M, a1 as ot } from "./view-styles-BcxK8WCo.js";
import { A as ct } from "./AppWindowFrame-DDg3rHjA.js";
import { w as Pe } from "./window-manager.store-DgNn9Rtk.js";
import { _ as rt } from "./_plugin-vue_export-helper-CHgC5LLL.js";
function ut(V) {
  const a = Ze({
    neteaseUser: null,
    neteasePlaylists: [],
    neteaseActivePlaylist: null,
    neteaseSongs: [],
    neteaseSearchResults: [],
    neteaseRecentSongs: [],
    neteaseLoading: !1,
    message: ""
  });
  let k = !1, m = 0, u, E;
  function U() {
    if (!k) {
      if (a.neteaseUser = g.getUser(), a.neteaseRecentSongs = g.getRecentSongs(), !a.neteasePlaylists.length)
        try {
          const i = xe(ee);
          if (i.length && Array.isArray(i) && i.length) {
            a.neteasePlaylists = i;
            const d = i.find((v) => v.name?.includes("喜欢的音乐") || v.specialType === 5) || i[0];
            d && !a.neteaseActivePlaylist && (a.neteaseActivePlaylist = d);
          }
        } catch {
        }
      if (!a.neteaseSongs.length)
        try {
          const i = xe(te);
          i.length && Array.isArray(i) && i.length && (a.neteaseSongs = i);
        } catch {
        }
    }
  }
  function $() {
    m++, u?.abort(), u = void 0, a.neteaseLoading = !1, E !== void 0 && clearTimeout(E), E = void 0;
  }
  async function H(i) {
    if (k || !V()) return;
    if (K.pendingWrites) {
      a.message = "音乐操作正在处理，请稍候；未自动排队。";
      return;
    }
    $();
    const d = new AbortController(), v = m;
    u = d, a.neteaseLoading = !0, a.message = "";
    const y = () => !k && V() && m === v && !d.signal.aborted;
    try {
      await g.whenReady(), y() && await i(d.signal, y);
    } catch (p) {
      y() && (a.message = p?.message || "读取失败，请检查节点设置或网络后手动重试。");
    } finally {
      u === d && (u = void 0, a.neteaseLoading = !1);
    }
  }
  async function F(i, d, v = 500, y = 0) {
    try {
      const p = await g.request("/playlist/track/all", { id: i, limit: v, offset: y }, d);
      if (p.songs?.length) return p.songs;
    } catch {
      d.throwIfAborted();
    }
    return y === 0 ? (await g.request("/playlist/detail", { id: i }, d)).playlist?.tracks || [] : [];
  }
  async function O() {
    await H(async (i, d) => {
      U();
      const y = a.neteaseUser?.uid;
      let p = [];
      if (y)
        try {
          p = (await g.request("/user/playlist", { uid: y, limit: 100 }, i)).playlist || [];
        } catch (_) {
          d() && (a.message = _?.message || "官网歌单读取失败，请重新连接账户。");
          return;
        }
      if (!p.length)
        try {
          p = (await g.request("/toplist", {}, i)).list || [];
        } catch {
        }
      if (!d()) return;
      if (p.length) {
        a.neteasePlaylists = p;
        try {
          Ae(ee, p);
        } catch {
        }
      }
      const f = p.find((_) => _.id === a.neteaseActivePlaylist?.id) || p.find((_) => _.name?.includes("喜欢的音乐") || _.specialType === 5) || p[0];
      if (!f) return;
      if (!a.neteaseSongs.length)
        try {
          const _ = await F(f.id, i, 10, 0);
          d() && !a.neteaseSongs.length && (a.neteaseActivePlaylist = f, a.neteaseSongs = _, a.neteaseLoading = !1);
        } catch {
        }
      const W = await F(f.id, i, 500, 0);
      if (d() && (a.neteaseActivePlaylist = f, a.neteaseSongs = W, f.name?.includes("喜欢的音乐") || f.specialType === 5))
        try {
          Ae(te, W);
        } catch {
        }
    });
  }
  async function x(i) {
    await H(async (d, v) => {
      const y = g.getUser()?.uid;
      if (a.neteaseActivePlaylist = i, !a.neteaseSongs.length || a.neteaseActivePlaylist?.id !== i.id)
        try {
          const f = await F(i.id, d, 10, 0);
          v() && y === g.getUser()?.uid && (!a.neteaseSongs.length || a.neteaseActivePlaylist?.id !== i.id) && (a.neteaseSongs = f, a.neteaseLoading = !1);
        } catch {
        }
      const p = await F(i.id, d, 500, 0);
      v() && y === g.getUser()?.uid && (a.neteaseActivePlaylist = i, a.neteaseSongs = p);
    });
  }
  async function T(i) {
    if (!i.trim()) {
      $(), a.neteaseSearchResults = [];
      return;
    }
    await H(async (d, v) => {
      a.neteaseSearchResults = [];
      const y = g.getUser()?.uid;
      let p = [];
      try {
        p = (await g.request("/cloudsearch", { keywords: i.trim(), type: 1, limit: 60 }, d)).result?.songs || [];
      } catch {
        d.throwIfAborted();
      }
      p.length || (p = (await g.request("/search", { keywords: i.trim(), limit: 60 }, d)).result?.songs || []), v() && y === g.getUser()?.uid && (a.neteaseSearchResults = p);
    });
  }
  async function A(i) {
    if (!(k || !V())) {
      if (K.pendingWrites) {
        a.message = "音乐操作正在处理，请稍候；未自动排队。";
        return;
      }
      try {
        await it(i);
      } catch {
        k || (a.message = "操作未完整完成，部分变更可能已保存，请重读核对；未自动重试。");
      }
    }
  }
  async function S() {
    if (k || !V()) throw new Error("请先打开网易云模块。");
    $(), await g.connectWebsiteAccount(), se(ee), se(te), !(k || !V()) && (U(), await O());
  }
  async function Y() {
    if ($(), typeof localStorage < "u")
      try {
        localStorage.setItem("netease_explicit_logout", "true"), se(te), se(ee);
      } catch {
      }
    await A(async () => {
      await g.logout(), a.neteaseUser = null, a.neteasePlaylists = [], a.neteaseActivePlaylist = null, a.neteaseSongs = [], a.neteaseSearchResults = [], a.message = "已断开插件账户；可点击「连接官网账户」重新连接，不影响官网登录。";
    });
  }
  async function ae() {
    await A(async () => {
      await g.connectWebsiteAccount(), await g.fetchAccountRecentSongs(60), U(), O(), a.message = "✓ 账号历史与歌单已同步刷新！";
    });
  }
  async function ie() {
    await A(async () => {
      await g.clearRecentSongs(), U();
    });
  }
  function le() {
    k || ($(), U(), a.neteasePlaylists = [], a.neteaseSongs = [], a.neteaseSearchResults = [], a.neteaseActivePlaylist = null, a.message = "账号资料发生变化，请核对；需要时手动刷新歌单。");
  }
  function B() {
    k = !0, $();
  }
  return { state: a, refresh: O, selectPlaylist: x, search: T, connectWebsite: S, logout: Y, clearRecent: ie, syncLocal: U, pause: $, dispose: B, accountChanged: le, syncHistory: ae };
}
const dt = { class: "ms-source-pane ms-netease-source" }, vt = { class: "ms-netease-user-bar" }, mt = { class: "ms-netease-user-info" }, pt = ["src"], ft = { class: "ms-netease-meta" }, ht = { class: "ms-netease-name" }, gt = {
  key: 0,
  class: "ms-netease-vip-badge"
}, yt = {
  key: 1,
  class: "ms-netease-meta"
}, _t = { style: { display: "flex", gap: "8px", "align-items": "center" } }, bt = ["disabled"], kt = ["disabled"], wt = { class: "ms-netease-body" }, St = { class: "ms-netease-playlists" }, Ct = { class: "ms-netease-pl-info" }, xt = { class: "ms-netease-pl-count" }, At = { class: "ms-netease-pl-info" }, Pt = { class: "ms-netease-pl-count" }, Rt = { class: "ms-netease-pl-info" }, Lt = { class: "ms-netease-pl-count" }, Ut = ["onClick"], Mt = ["src"], Et = { class: "ms-netease-pl-info" }, $t = { class: "ms-netease-pl-name" }, Tt = { class: "ms-netease-pl-count" }, It = { class: "ms-netease-tracks" }, Wt = { class: "ms-netease-tracks-head" }, Dt = { class: "ms-netease-tracks-sub" }, Nt = {
  key: 0,
  class: "ms-rhine-search-wrap"
}, Vt = {
  key: 0,
  class: "ms-rhine-album-detail"
}, Ft = { class: "ms-rhine-detail-banner" }, zt = ["src"], qt = { class: "ms-rhine-detail-info" }, Ht = { class: "ms-rhine-detail-title" }, Ot = { class: "ms-rhine-detail-sub" }, Bt = {
  key: 0,
  class: "ms-netease-loading-box"
}, jt = {
  key: 1,
  class: "ms-rhine-track-list"
}, Qt = ["onClick"], Kt = { class: "ms-netease-track-idx" }, Yt = {
  key: 0,
  style: { color: "#f59e0b" }
}, Jt = { key: 1 }, Xt = { class: "ms-netease-track-info" }, Zt = ["title"], Gt = { class: "ms-netease-track-artist" }, es = {
  class: "ms-netease-track-dur",
  style: { display: "flex", "align-items": "center", gap: "8px" }
}, ts = ["title", "onClick"], ss = {
  key: 1,
  class: "ms-rhine-grid-wrap"
}, ns = {
  key: 0,
  class: "ms-dropdown-empty",
  style: { padding: "40px 0" }
}, as = { class: "ms-rhine-album-grid" }, is = ["onClick"], ls = { class: "ms-rhine-cover-wrap" }, os = ["src"], cs = { class: "ms-rhine-meta" }, rs = ["title"], us = {
  key: 0,
  class: "ms-netease-pagination-bar ms-rhine-pagination-bar"
}, ds = { class: "ms-pagination-info" }, vs = { class: "ms-pagination-btns" }, ms = ["disabled"], ps = ["disabled"], fs = ["onClick"], hs = ["disabled"], gs = ["disabled"], ys = {
  key: 0,
  class: "ms-dropdown-section"
}, _s = { class: "ms-search-history-tags" }, bs = ["onClick"], ks = ["onClick"], ws = {
  key: 1,
  class: "ms-dropdown-section"
}, Ss = { class: "ms-dropdown-head" }, Cs = { class: "ms-recent-dropdown-list" }, xs = ["onClick"], As = { class: "ms-drop-play" }, Ps = { class: "ms-drop-title" }, Rs = { class: "ms-drop-artist" }, Ls = { class: "ms-drop-dur" }, Us = {
  key: 2,
  class: "ms-dropdown-empty"
}, Ms = {
  key: 0,
  class: "ms-netease-msg-banner"
}, Es = { class: "ms-netease-tracks-head" }, $s = { class: "ms-netease-tracks-title" }, Ts = { class: "ms-netease-tracks-sub" }, Is = {
  key: 1,
  class: "ms-netease-loading-box"
}, Ws = ["onClick"], Ds = { class: "ms-netease-track-idx" }, Ns = ["src"], Vs = { class: "ms-netease-track-info" }, Fs = { class: "ms-netease-track-name" }, zs = { class: "ms-netease-track-artist" }, qs = { class: "ms-netease-track-dur" }, Hs = {
  key: 0,
  style: { padding: "30px", "text-align": "center", color: "var(--muted)", "font-size": "13px" }
}, Os = {
  key: 1,
  class: "ms-netease-pagination-bar"
}, Bs = { class: "ms-pagination-info" }, js = { class: "ms-pagination-btns" }, Qs = ["disabled"], Ks = ["disabled"], Ys = { style: { display: "flex", "align-items": "center", gap: "12px", padding: "10px 16px", "border-top": "1px solid var(--border)", background: "var(--panel)" } }, Js = ["src"], Xs = { style: { flex: "1", "min-width": "0", display: "flex", "flex-direction": "column", gap: "4px" } }, Zs = { style: { display: "flex", "justify-content": "space-between", "font-size": "12px" } }, Gs = { style: { "font-weight": "600", "white-space": "nowrap", overflow: "hidden", "text-overflow": "ellipsis", color: "var(--heading)" } }, en = { style: { color: "var(--muted)", "font-size": "11px" } }, tn = ["value"], sn = { style: { display: "flex", "align-items": "center", gap: "6px" } }, nn = ["title"], an = ["title"], ln = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23334155'/%3E%3Ccircle cx='32' cy='24' r='10' fill='%2364748b'/%3E%3Cpath d='M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16' fill='%2364748b'/%3E%3C/svg%3E", me = 8, ne = 10, on = /* @__PURE__ */ Ge({
  __name: "NeteaseWorkspaceDialog",
  setup(V) {
    const a = w(!document.hidden), k = C(() => K.visible && a.value), m = ut(() => k.value), u = m.state, E = w(!1), U = w("先在同一浏览器的网易云官网登录，再点击「连接官网账户」。无需音乐节点；插件断开不会退出官网。");
    function $() {
      typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: "https://music.163.com/" }) : window.open("https://music.163.com/", "_blank", "noopener,noreferrer");
    }
    async function H() {
      if (!E.value) {
        E.value = !0, U.value = "正在使用浏览器官网会话读取账户…";
        try {
          await m.connectWebsite(), U.value = "官网账户已连接。若歌单读取失败，请查看列表提示。";
        } catch (s) {
          U.value = s?.message || "官网账户连接失败，请确认已登录。";
        } finally {
          E.value = !1;
        }
      }
    }
    async function F() {
      await m.logout(), h.neteaseUser = null, h.neteaseSongs = [], h.neteasePlaylists = [], U.value = "已断开插件账户，官网仍保持登录。";
    }
    const O = w(null), x = w(""), T = w(!1);
    let A = null;
    const S = w([]);
    try {
      const s = localStorage.getItem("netease_search_history");
      if (s) {
        const t = JSON.parse(s);
        Array.isArray(t) && (S.value = t.slice(0, 15));
      }
    } catch {
    }
    function Y(s) {
      const t = s.trim();
      if (t) {
        S.value = [t, ...S.value.filter((n) => n !== t)].slice(0, 15);
        try {
          localStorage.setItem("netease_search_history", JSON.stringify(S.value));
        } catch {
        }
      }
    }
    function ae(s) {
      S.value = S.value.filter((t) => t !== s);
      try {
        localStorage.setItem("netease_search_history", JSON.stringify(S.value));
      } catch {
      }
    }
    function ie() {
      S.value = [];
      try {
        localStorage.removeItem("netease_search_history");
      } catch {
      }
    }
    function le(s) {
      x.value = s, T.value = !1, m.search(s);
    }
    function B(s) {
      s.target?.closest(".ms-netease-search-wrap") || (T.value = !1);
    }
    const i = w(!1), d = w(!1), v = w(null), y = w(!1), p = w(""), f = w(1), W = C(() => {
      const s = h.albums || [], t = p.value.trim().toLowerCase();
      return t ? s.filter((n) => (n.name || "").toLowerCase().includes(t)) : s;
    }), _ = C(() => Math.max(1, Math.ceil(W.value.length / me))), Re = C(() => {
      const s = (f.value - 1) * me;
      return W.value.slice(s, s + me);
    }), Le = C(() => {
      const s = _.value, t = f.value, n = [], b = Math.max(1, t - 2), D = Math.min(s, t + 2);
      for (let ue = b; ue <= D; ue++)
        n.push(ue);
      return n;
    });
    G(p, () => {
      f.value = 1;
    });
    function Ue() {
      m.pause(), d.value = !0, i.value = !1, v.value = null, (!h.albums || h.albums.length === 0) && M.getSirenAlbums().then((s) => {
        s?.length && (h.albums = s);
      });
    }
    async function Me(s) {
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
    function Ee(s) {
      if (v.value?._songs?.length) {
        const t = v.value._songs, n = t.findIndex((b) => String(b.cid) === String(s.cid));
        M.setQueue(t, n >= 0 ? n : 0, !0), h.activeAlbum = v.value;
      } else
        M.playSong(s);
    }
    function $e(s) {
      const t = s._songs || [];
      t.length > 0 && (M.setQueue(t, 0, !0), h.activeAlbum = s);
    }
    function oe(s) {
      if (!h.playing) return !1;
      const t = M.getState().currentSong;
      return !!(t && String(t.cid) === String(s.cid));
    }
    function ce(s) {
      return M.isLiked(s.cid);
    }
    function Te(s, t) {
      t?.stopPropagation();
      const n = M.toggleLike(s);
      oe(s) && (h.liked = n);
    }
    const j = C(() => u.neteasePlaylists.find((s) => s.name?.includes("喜欢的音乐") || s.specialType === 5)), Ie = C(() => {
      const s = j.value;
      return s ? u.neteasePlaylists.filter((t) => t.id !== s.id) : u.neteasePlaylists;
    }), J = C(() => d.value || i.value || z.value ? !1 : j.value && u.neteaseActivePlaylist?.id === j.value.id);
    function We() {
      m.pause(), d.value = !1, v.value = null, i.value = !1;
      const s = j.value;
      s ? m.selectPlaylist(s) : u.neteasePlaylists[0] && m.selectPlaylist(u.neteasePlaylists[0]);
    }
    const z = C(() => x.value.trim().length > 0 && u.neteaseSearchResults.length > 0), X = C(() => z.value ? u.neteaseSearchResults : i.value ? u.neteaseRecentSongs : u.neteaseSongs), P = w(1), Q = C(() => Math.max(1, Math.ceil(X.value.length / ne))), De = C(() => {
      const s = (P.value - 1) * ne;
      return X.value.slice(s, s + ne);
    });
    G(
      () => [u.neteaseActivePlaylist?.id, z.value, i.value],
      () => {
        P.value = 1;
      }
    ), G(Q, (s) => {
      P.value > s && (P.value = Math.max(1, s));
    });
    function Ne() {
      P.value > 1 && P.value--;
    }
    function Ve() {
      P.value < Q.value && P.value++;
    }
    const Fe = C(() => h.mode === "shuffle" ? "🔀" : h.mode === "one" ? "🔂" : "🔁");
    function ze() {
      Pe.minimize("music");
    }
    function qe() {
      Pe.close("music");
    }
    function He() {
      m.pause(), d.value = !1, v.value = null, i.value = !0, u.neteaseActivePlaylist = null;
    }
    function Oe(s) {
      d.value = !1, v.value = null, i.value = !1, m.selectPlaylist(s);
    }
    function Be() {
      m.pause(), A && clearTimeout(A), A = setTimeout(() => {
        if (!k.value) return;
        const s = x.value.trim();
        s && Y(s), m.search(x.value);
      }, 400);
    }
    function je() {
      A && clearTimeout(A);
      const s = x.value.trim();
      s && Y(s), T.value = !1, m.search(x.value);
    }
    function Qe() {
      m.pause(), x.value = "", u.neteaseSearchResults = [];
    }
    function pe(s) {
      q.playNeteaseTrack(s);
    }
    function Z(s) {
      return !!(s.id && String(s.id) === String(M.getState().currentSong?.neteaseId) || s.cid && String(s.cid) === String(M.getState().currentSong?.cid));
    }
    function Ke(s) {
      return s.picUrl || s.coverUrl || s.al?.picUrl || s.album?.picUrl || ot;
    }
    function fe(s) {
      const t = s.ar || s.artists;
      return Array.isArray(t) && t.length ? t.map((n) => n.name).join(", ") : "未知歌手";
    }
    function he(s) {
      const t = s.dt || s.duration || 0, n = Math.floor(t > 1e3 ? t / 1e3 : t), b = Math.floor(n / 60), D = n % 60;
      return `${b}:${String(D).padStart(2, "0")}`;
    }
    function Ye(s) {
      const t = Number(s.target.value);
      q.seek(t);
    }
    function Je() {
      m.refresh();
    }
    function re() {
      m.pause(), A && clearTimeout(A), A = null, T.value = !1, document.removeEventListener("click", B);
    }
    const Xe = lt(re);
    let ge = !1;
    function ye() {
      !ge && k.value && (ge = !0, m.refresh());
    }
    function _e() {
      a.value = !document.hidden;
    }
    function be() {
      m.syncLocal();
    }
    function ke() {
      m.accountChanged();
    }
    return G(k, (s) => {
      s ? (m.syncLocal(), document.addEventListener("click", B), ye()) : re();
    }, { flush: "sync" }), et(() => {
      document.addEventListener("visibilitychange", _e), window.addEventListener("netease:recent-updated", be), window.addEventListener("netease:account-updated", ke), m.syncLocal(), k.value && (document.addEventListener("click", B), ye());
    }), tt(() => {
      re(), Xe(), m.dispose(), document.removeEventListener("visibilitychange", _e), window.removeEventListener("netease:recent-updated", be), window.removeEventListener("netease:account-updated", ke);
    }), (s, t) => (l(), st(ct, {
      id: "music-workspace",
      "window-id": "music",
      title: "网易云模块",
      icon: "🎵",
      visible: c(K).visible,
      "default-width": 960,
      "default-height": 640,
      "min-width": 480,
      "min-height": 360,
      "custom-class": "ms-panel ms-source-netease",
      onMinimize: ze,
      onClose: qe
    }, {
      default: nt(() => [
        e("div", dt, [
          e("div", vt, [
            e("div", mt, [
              c(u).neteaseUser?.nickname ? (l(), o(R, { key: 0 }, [
                e("img", {
                  class: "ms-netease-avatar",
                  src: c(u).neteaseUser.avatarUrl || ln,
                  alt: "avatar"
                }, null, 8, pt),
                e("div", ft, [
                  e("span", ht, [
                    we(r(c(u).neteaseUser.nickname) + " ", 1),
                    c(u).neteaseUser.isVip ? (l(), o("span", gt, "VIP")) : L("", !0)
                  ]),
                  t[16] || (t[16] = e("span", { class: "ms-netease-status-text" }, "已连接网易云音乐账户", -1))
                ])
              ], 64)) : (l(), o("div", yt, [...t[17] || (t[17] = [
                e("span", { class: "ms-netease-name" }, "免登录模式", -1),
                e("span", { class: "ms-netease-status-text" }, "畅听精选榜单与全网搜索", -1)
              ])]))
            ]),
            e("div", _t, [
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                disabled: c(K).pendingWrites > 0,
                onClick: Je
              }, "⟳ 刷新列表", 8, bt),
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                style: { color: "#f43f5e", "border-color": "rgba(244, 63, 94, 0.4)", "font-weight": "600" },
                onClick: $
              }, " 官网登录 "),
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                disabled: E.value,
                onClick: H
              }, r(E.value ? "正在连接…" : "连接官网账户"), 9, kt),
              c(u).neteaseUser?.nickname ? (l(), o("button", {
                key: 0,
                type: "button",
                class: "ms-netease-logout-btn",
                onClick: F
              }, " 退出登录 ")) : L("", !0)
            ])
          ]),
          e("div", wt, [
            e("div", St, [
              t[24] || (t[24] = e("div", { class: "ms-netease-section-title" }, "官方原声", -1)),
              e("button", {
                type: "button",
                class: I(["ms-netease-pl-item ms-netease-pl-rhine", { active: d.value }]),
                onClick: Ue
              }, [
                t[19] || (t[19] = e("div", {
                  class: "ms-netease-pl-icon-box",
                  style: { background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(234, 88, 12, 0.2))", color: "#f59e0b" }
                }, "💿", -1)),
                e("div", Ct, [
                  t[18] || (t[18] = e("div", { class: "ms-netease-pl-name" }, "莱茵唱片", -1)),
                  e("div", xt, r(c(h).albums?.length || 0) + " 张官方专辑", 1)
                ])
              ], 2),
              t[25] || (t[25] = e("div", { class: "ms-netease-section-title" }, "我的歌单 & 精选推荐", -1)),
              e("button", {
                type: "button",
                class: I(["ms-netease-pl-item ms-netease-pl-favorites", { active: J.value }]),
                onClick: We
              }, [
                t[21] || (t[21] = e("div", {
                  class: "ms-netease-pl-icon-box",
                  style: { background: "rgba(244, 63, 94, 0.15)", color: "#f43f5e" }
                }, "❤️", -1)),
                e("div", At, [
                  t[20] || (t[20] = e("div", { class: "ms-netease-pl-name" }, "我喜欢的音乐", -1)),
                  e("div", Pt, r((j.value?.trackCount ?? c(u).neteaseSongs.length) || 0) + " 首曲目", 1)
                ])
              ], 2),
              e("button", {
                type: "button",
                class: I(["ms-netease-pl-item ms-netease-pl-recent", { active: i.value }]),
                onClick: He
              }, [
                t[23] || (t[23] = e("div", { class: "ms-netease-pl-icon-box" }, "🕒", -1)),
                e("div", Rt, [
                  t[22] || (t[22] = e("div", { class: "ms-netease-pl-name" }, "最近播放记录", -1)),
                  e("div", Lt, r(c(u).neteaseRecentSongs.length) + " 首曲目", 1)
                ])
              ], 2),
              (l(!0), o(R, null, N(Ie.value, (n) => (l(), o("button", {
                key: n.id,
                type: "button",
                class: I(["ms-netease-pl-item", { active: !d.value && !i.value && !J.value && c(u).neteaseActivePlaylist?.id === n.id }]),
                onClick: (b) => Oe(n)
              }, [
                e("img", {
                  class: "ms-netease-pl-cover",
                  src: n.coverImgUrl,
                  alt: "",
                  loading: "lazy"
                }, null, 8, Mt),
                e("div", Et, [
                  e("div", $t, r(n.name), 1),
                  e("div", Tt, r(n.trackCount || 0) + " 首曲目", 1)
                ])
              ], 10, Ut))), 128))
            ]),
            e("div", It, [
              d.value ? (l(), o(R, { key: 0 }, [
                e("div", Wt, [
                  e("div", null, [
                    t[26] || (t[26] = e("div", { class: "ms-netease-tracks-title" }, "莱茵唱片 · 官方原声曲库", -1)),
                    e("div", Dt, " 塞壬唱片 MSR 出品 · 共 " + r(c(h).albums?.length || 0) + " 张官方专辑 ", 1)
                  ]),
                  v.value ? L("", !0) : (l(), o("div", Nt, [
                    Se(e("input", {
                      "onUpdate:modelValue": t[0] || (t[0] = (n) => p.value = n),
                      type: "text",
                      class: "ms-rhine-search-input",
                      placeholder: "搜索专辑或艺术家…"
                    }, null, 512), [
                      [Ce, p.value]
                    ])
                  ]))
                ]),
                v.value ? (l(), o("div", Vt, [
                  e("header", Ft, [
                    e("button", {
                      type: "button",
                      class: "ms-rhine-back-btn",
                      onClick: t[1] || (t[1] = (n) => v.value = null)
                    }, " ‹ 返回专辑列表 "),
                    e("img", {
                      src: v.value.coverUrl || c(ve),
                      class: "ms-rhine-detail-cover",
                      alt: ""
                    }, null, 8, zt),
                    e("div", qt, [
                      t[27] || (t[27] = e("span", { class: "siren-badge" }, "OFFICIAL ALBUM", -1)),
                      e("h2", Ht, r(v.value.name), 1),
                      e("p", Ot, "塞壬唱片-MSR 出品 · 共 " + r(v.value._songs?.length || 0) + " 首曲目", 1),
                      e("button", {
                        type: "button",
                        class: "ms-rhine-play-album-btn",
                        onClick: t[2] || (t[2] = (n) => $e(v.value))
                      }, " ▶ 播放整张专辑 ")
                    ])
                  ]),
                  y.value ? (l(), o("div", Bt, [...t[28] || (t[28] = [
                    e("div", { class: "ms-netease-spinner" }, null, -1),
                    e("div", { class: "ms-netease-loading-tip" }, "正在调取专辑曲目列表…", -1)
                  ])])) : (l(), o("div", jt, [
                    (l(!0), o(R, null, N(v.value._songs || [], (n, b) => (l(), o("button", {
                      key: n.cid,
                      type: "button",
                      class: I(["ms-netease-track-row", { playing: oe(n) }]),
                      onClick: (D) => Ee(n)
                    }, [
                      e("span", Kt, [
                        oe(n) ? (l(), o("span", Yt, "▶")) : (l(), o("span", Jt, r(b + 1), 1))
                      ]),
                      e("div", Xt, [
                        e("span", {
                          class: "ms-netease-track-name",
                          title: n.name
                        }, r(n.name), 9, Zt),
                        e("span", Gt, r((n.artists || []).join(", ") || "塞壬唱片"), 1)
                      ]),
                      e("div", es, [
                        e("button", {
                          type: "button",
                          class: I(["siren-btn-icon", { liked: ce(n) }]),
                          title: ce(n) ? "取消收藏" : "收藏曲目",
                          onClick: de((D) => Te(n, D), ["stop"])
                        }, r(ce(n) ? "♥" : "♡"), 11, ts)
                      ])
                    ], 10, Qt))), 128))
                  ]))
                ])) : (l(), o("div", ss, [
                  W.value.length ? (l(), o(R, { key: 1 }, [
                    e("div", as, [
                      (l(!0), o(R, null, N(Re.value, (n) => (l(), o("div", {
                        key: n.cid,
                        class: "ms-rhine-album-card",
                        onClick: (b) => Me(n)
                      }, [
                        e("div", ls, [
                          e("img", {
                            src: n.coverUrl || c(ve),
                            class: "ms-rhine-cover",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, os),
                          t[29] || (t[29] = e("div", { class: "ms-rhine-hover-play" }, "▶", -1))
                        ]),
                        e("div", cs, [
                          e("span", {
                            class: "ms-rhine-album-name",
                            title: n.name
                          }, r(n.name), 9, rs),
                          t[30] || (t[30] = e("span", { class: "ms-rhine-corp" }, "塞壬唱片 MSR", -1))
                        ])
                      ], 8, is))), 128))
                    ]),
                    _.value > 1 ? (l(), o("div", us, [
                      e("span", ds, " 第 " + r(f.value) + " / " + r(_.value) + " 页 · 共 " + r(W.value.length) + " 张专辑 ", 1),
                      e("div", vs, [
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: f.value <= 1,
                          title: "首页",
                          onClick: t[3] || (t[3] = (n) => f.value = 1)
                        }, " « ", 8, ms),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: f.value <= 1,
                          title: "上一页",
                          onClick: t[4] || (t[4] = (n) => f.value = Math.max(1, f.value - 1))
                        }, " ◀ ", 8, ps),
                        (l(!0), o(R, null, N(Le.value, (n) => (l(), o("button", {
                          key: "rpage-" + n,
                          type: "button",
                          class: I(["ms-page-btn", { active: n === f.value }]),
                          onClick: (b) => f.value = n
                        }, r(n), 11, fs))), 128)),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: f.value >= _.value,
                          title: "下一页",
                          onClick: t[5] || (t[5] = (n) => f.value = Math.min(_.value, f.value + 1))
                        }, " ▶ ", 8, hs),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: f.value >= _.value,
                          title: "尾页",
                          onClick: t[6] || (t[6] = (n) => f.value = _.value)
                        }, " » ", 8, gs)
                      ])
                    ])) : L("", !0)
                  ], 64)) : (l(), o("div", ns, " 正在加载专辑或未找到匹配项… "))
                ]))
              ], 64)) : (l(), o(R, { key: 1 }, [
                e("div", {
                  class: "ms-netease-search-wrap",
                  ref_key: "searchWrapRef",
                  ref: O
                }, [
                  Se(e("input", {
                    type: "text",
                    class: "ms-netease-search-input",
                    placeholder: "全网搜索网易云单曲、歌手名或专辑…",
                    "onUpdate:modelValue": t[7] || (t[7] = (n) => x.value = n),
                    onKeydown: at(je, ["enter"]),
                    onInput: Be,
                    onFocus: t[8] || (t[8] = (n) => T.value = !0)
                  }, null, 544), [
                    [Ce, x.value]
                  ]),
                  T.value && !x.value.trim() ? (l(), o("div", {
                    key: 0,
                    class: "ms-netease-search-dropdown",
                    onMousedown: t[10] || (t[10] = de(() => {
                    }, ["prevent"]))
                  }, [
                    S.value.length > 0 ? (l(), o("div", ys, [
                      e("div", { class: "ms-dropdown-head" }, [
                        t[31] || (t[31] = e("span", { class: "ms-dropdown-title" }, "🔍 搜索历史", -1)),
                        e("button", {
                          type: "button",
                          class: "ms-dropdown-clear",
                          onClick: ie
                        }, "清空")
                      ]),
                      e("div", _s, [
                        (l(!0), o(R, null, N(S.value, (n) => (l(), o("span", {
                          key: "hist-" + n,
                          class: "ms-search-tag",
                          onClick: (b) => le(n)
                        }, [
                          we(r(n) + " ", 1),
                          e("b", {
                            class: "ms-tag-del",
                            onClick: de((b) => ae(n), ["stop"])
                          }, "×", 8, ks)
                        ], 8, bs))), 128))
                      ])
                    ])) : L("", !0),
                    c(u).neteaseRecentSongs.length > 0 ? (l(), o("div", ws, [
                      e("div", Ss, [
                        t[32] || (t[32] = e("span", { class: "ms-dropdown-title" }, "🕒 历史听歌记录", -1)),
                        e("button", {
                          type: "button",
                          class: "ms-dropdown-clear",
                          onClick: t[9] || (t[9] = (n) => c(m).clearRecent())
                        }, "清空")
                      ]),
                      e("div", Cs, [
                        (l(!0), o(R, null, N(c(u).neteaseRecentSongs.slice(0, 8), (n) => (l(), o("div", {
                          key: "drop-rec-" + n.id,
                          class: I(["ms-recent-dropdown-item", { playing: Z(n) }]),
                          onClick: (b) => {
                            pe(n), T.value = !1;
                          }
                        }, [
                          e("span", As, r(Z(n) ? "▶" : "♫"), 1),
                          e("span", Ps, r(n.name), 1),
                          e("span", Rs, r(fe(n)), 1),
                          e("span", Ls, r(he(n)), 1)
                        ], 10, xs))), 128))
                      ])
                    ])) : L("", !0),
                    !S.value.length && !c(u).neteaseRecentSongs.length ? (l(), o("div", Us, " 暂无搜索与播放历史，输入歌名或歌手即可开始畅听 ")) : L("", !0)
                  ], 32)) : L("", !0)
                ], 512),
                c(u).message ? (l(), o("div", Ms, [
                  e("span", null, r(c(u).message), 1)
                ])) : L("", !0),
                e("div", Es, [
                  e("div", null, [
                    e("div", $s, r(z.value ? `搜索结果 (${c(u).neteaseSearchResults.length})` : i.value ? `最近播放记录 (${c(u).neteaseRecentSongs.length})` : J.value ? `我喜欢的音乐 (${c(u).neteaseSongs.length})` : c(u).neteaseActivePlaylist?.name || "我喜欢的音乐"), 1),
                    e("div", Ts, r(z.value ? "网易云曲库实时检索" : i.value ? "近期点播收听的历史歌曲" : J.value ? "个人云端红心曲库，点击即可一键开始高保真串流播放" : "点击歌曲即可一键开始高保真串流播放"), 1)
                  ]),
                  z.value ? (l(), o("button", {
                    key: 0,
                    type: "button",
                    class: "ms-netease-logout-btn",
                    onClick: Qe
                  }, "清除搜索")) : i.value && c(u).neteaseRecentSongs.length > 0 ? (l(), o("button", {
                    key: 1,
                    type: "button",
                    class: "ms-netease-logout-btn",
                    onClick: t[11] || (t[11] = (n) => c(m).clearRecent())
                  }, "清空记录")) : L("", !0)
                ]),
                c(u).neteaseLoading ? (l(), o("div", Is, [...t[33] || (t[33] = [
                  e("div", { class: "ms-netease-spinner" }, null, -1),
                  e("div", { class: "ms-netease-loading-tip" }, "正在同步网易云音源与歌单…", -1)
                ])])) : (l(), o(R, { key: 2 }, [
                  (l(!0), o(R, null, N(De.value, (n, b) => (l(), o("div", {
                    key: n.id || b,
                    class: I(["ms-netease-track-row", { playing: Z(n) }]),
                    onClick: (D) => pe(n)
                  }, [
                    e("span", Ds, r(Z(n) ? "▶" : (P.value - 1) * ne + b + 1), 1),
                    e("img", {
                      class: "ms-netease-track-cover",
                      src: Ke(n),
                      alt: "",
                      loading: "lazy"
                    }, null, 8, Ns),
                    e("div", Vs, [
                      e("div", Fs, r(n.name), 1),
                      e("div", zs, r(fe(n)), 1)
                    ]),
                    e("span", qs, r(he(n)), 1)
                  ], 10, Ws))), 128)),
                  X.value.length ? L("", !0) : (l(), o("div", Hs, " 未找到曲目，可尝试在上方搜索框输入关键词 ")),
                  Q.value > 1 ? (l(), o("div", Os, [
                    e("span", Bs, " 第 " + r(P.value) + " / " + r(Q.value) + " 页 · 共 " + r(X.value.length) + " 首 ", 1),
                    e("div", js, [
                      e("button", {
                        type: "button",
                        class: "ms-page-btn",
                        disabled: P.value <= 1,
                        title: "上一页",
                        onClick: Ne
                      }, " ◀ 上一页 ", 8, Qs),
                      e("button", {
                        type: "button",
                        class: "ms-page-btn",
                        disabled: P.value >= Q.value,
                        title: "下一页",
                        onClick: Ve
                      }, " 下一页 ▶ ", 8, Ks)
                    ])
                  ])) : L("", !0)
                ], 64))
              ], 64))
            ])
          ])
        ]),
        e("footer", Ys, [
          e("img", {
            src: c(h).coverUrl || c(ve),
            alt: "",
            style: { width: "42px", height: "42px", "border-radius": "8px", "object-fit": "cover", "flex-shrink": "0" }
          }, null, 8, Js),
          e("div", Xs, [
            e("div", Zs, [
              e("span", Gs, r(c(h).title || "暂无播放曲目"), 1),
              e("span", en, r(c(h).formattedCurrent) + " / " + r(c(h).formattedDuration), 1)
            ]),
            e("input", {
              type: "range",
              min: "0",
              max: "100",
              step: "0.1",
              value: c(h).progressPercent,
              onInput: Ye,
              style: { width: "100%", height: "4px", "accent-color": "#f43f5e", cursor: "pointer" }
            }, null, 40, tn)
          ]),
          e("div", sn, [
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[12] || (t[12] = (n) => c(q).prev()),
              title: "上一首"
            }, "⏮"),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              style: { background: "#f43f5e", color: "#fff", "border-color": "#f43f5e" },
              onClick: t[13] || (t[13] = (n) => c(q).togglePlay()),
              title: c(h).playing ? "暂停" : "播放"
            }, r(c(h).playing ? "⏸" : "▶"), 9, nn),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[14] || (t[14] = (n) => c(q).next()),
              title: "下一首"
            }, "⏭"),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[15] || (t[15] = (n) => c(q).cycleMode()),
              title: c(h).mode
            }, r(Fe.value), 9, an)
          ])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
}), pn = /* @__PURE__ */ rt(on, [["__scopeId", "data-v-119994f2"]]);
export {
  pn as default
};
