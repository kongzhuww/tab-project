import { r as Ge, d as et, w as ee, B as tt, K as st, j as nt, H as at, u as i, s as C, b as S, o as c, i as e, e as r, F as R, m as we, t as o, f as L, A as W, g as V, l as Ce, n as xe, h as ve, k as it } from "./vendor-vue-9b0eS4bW.js";
import { t as M, _ as lt } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { U as g } from "./search.service-BG_n92VW.js";
import { S as Ae, T as te, U as se, V as ne, j as Y, X as ot, Y as Pe, Z as ct, i as f, _ as me, h as q, K as E, $ as rt } from "./view-styles-CzGB4dOj.js";
import { A as ut } from "./AppWindowFrame-7RspgAYO.js";
import { w as Re } from "./window-manager.store-BdI_8a-H.js";
function dt(F) {
  const a = Ge({
    neteaseUser: null,
    neteasePlaylists: [],
    neteaseActivePlaylist: null,
    neteaseSongs: [],
    neteaseSearchResults: [],
    neteaseRecentSongs: [],
    neteaseLoading: !1,
    message: ""
  });
  let k = !1, m = 0, u, $;
  function U() {
    if (!k) {
      if (a.neteaseUser = g.getUser(), a.neteaseRecentSongs = g.getRecentSongs(), !a.neteasePlaylists.length)
        try {
          const l = Ae(te);
          if (l.length && Array.isArray(l) && l.length) {
            a.neteasePlaylists = l;
            const d = l.find((v) => v.name?.includes("喜欢的音乐") || v.specialType === 5) || l[0];
            d && !a.neteaseActivePlaylist && (a.neteaseActivePlaylist = d);
          }
        } catch {
        }
      if (!a.neteaseSongs.length)
        try {
          const l = Ae(se);
          l.length && Array.isArray(l) && l.length && (a.neteaseSongs = l);
        } catch {
        }
    }
  }
  function T() {
    m++, u?.abort(), u = void 0, a.neteaseLoading = !1, $ !== void 0 && clearTimeout($), $ = void 0;
  }
  async function B(l) {
    if (k || !F()) return;
    if (Y.pendingWrites) {
      a.message = "音乐操作正在处理，请稍候；未自动排队。";
      return;
    }
    T();
    const d = new AbortController(), v = m;
    u = d, a.neteaseLoading = !0, a.message = "";
    const y = () => !k && F() && m === v && !d.signal.aborted;
    try {
      await g.whenReady(), y() && await l(d.signal, y);
    } catch (h) {
      y() && (a.message = h?.message || "读取失败，请检查节点设置或网络后手动重试。");
    } finally {
      u === d && (u = void 0, a.neteaseLoading = !1);
    }
  }
  async function z(l, d, v = 500, y = 0) {
    try {
      const h = await g.request("/playlist/track/all", { id: l, limit: v, offset: y }, d);
      if (h.songs?.length) return h.songs;
    } catch {
      d.throwIfAborted();
    }
    return y === 0 ? (await g.request("/playlist/detail", { id: l }, d)).playlist?.tracks || [] : [];
  }
  async function O() {
    await B(async (l, d) => {
      U();
      const y = a.neteaseUser?.uid;
      let h = [];
      if (y)
        try {
          h = (await g.request("/user/playlist", { uid: y, limit: 100 }, l)).playlist || [];
        } catch (_) {
          d() && (a.message = _?.message || "官网歌单读取失败，请重新连接账户。");
          return;
        }
      if (!h.length)
        try {
          h = (await g.request("/toplist", {}, l)).list || [];
        } catch {
        }
      if (!d()) return;
      if (h.length) {
        a.neteasePlaylists = h;
        try {
          Pe(te, h);
        } catch {
        }
      }
      const p = h.find((_) => _.id === a.neteaseActivePlaylist?.id) || h.find((_) => _.name?.includes("喜欢的音乐") || _.specialType === 5) || h[0];
      if (!p) return;
      if (!a.neteaseSongs.length)
        try {
          const _ = await z(p.id, l, 10, 0);
          d() && !a.neteaseSongs.length && (a.neteaseActivePlaylist = p, a.neteaseSongs = _, a.neteaseLoading = !1);
        } catch {
        }
      const D = await z(p.id, l, 500, 0);
      if (d() && (a.neteaseActivePlaylist = p, a.neteaseSongs = D, p.name?.includes("喜欢的音乐") || p.specialType === 5))
        try {
          Pe(se, D);
        } catch {
        }
    });
  }
  async function x(l) {
    await B(async (d, v) => {
      const y = g.getUser()?.uid;
      if (a.neteaseActivePlaylist = l, !a.neteaseSongs.length || a.neteaseActivePlaylist?.id !== l.id)
        try {
          const p = await z(l.id, d, 10, 0);
          v() && y === g.getUser()?.uid && (!a.neteaseSongs.length || a.neteaseActivePlaylist?.id !== l.id) && (a.neteaseSongs = p, a.neteaseLoading = !1);
        } catch {
        }
      const h = await z(l.id, d, 500, 0);
      v() && y === g.getUser()?.uid && (a.neteaseActivePlaylist = l, a.neteaseSongs = h);
    });
  }
  async function I(l) {
    if (!l.trim()) {
      T(), a.neteaseSearchResults = [];
      return;
    }
    await B(async (d, v) => {
      a.neteaseSearchResults = [];
      const y = g.getUser()?.uid;
      let h = [];
      try {
        h = (await g.request("/cloudsearch", { keywords: l.trim(), type: 1, limit: 60 }, d)).result?.songs || [];
      } catch {
        d.throwIfAborted();
      }
      h.length || (h = (await g.request("/search", { keywords: l.trim(), limit: 60 }, d)).result?.songs || []), v() && y === g.getUser()?.uid && (a.neteaseSearchResults = h);
    });
  }
  async function A(l) {
    if (!(k || !F())) {
      if (Y.pendingWrites) {
        a.message = "音乐操作正在处理，请稍候；未自动排队。";
        return;
      }
      try {
        await ot(l);
      } catch {
        k || (a.message = "操作未完整完成，部分变更可能已保存，请重读核对；未自动重试。");
      }
    }
  }
  async function w() {
    if (k || !F()) throw new Error("请先打开网易云模块。");
    T(), await g.connectWebsiteAccount(), ne(te), ne(se), !(k || !F()) && (U(), await O());
  }
  async function J() {
    if (T(), typeof localStorage < "u")
      try {
        localStorage.setItem("netease_explicit_logout", "true"), ne(se), ne(te);
      } catch {
      }
    await A(async () => {
      await g.logout(), a.neteaseUser = null, a.neteasePlaylists = [], a.neteaseActivePlaylist = null, a.neteaseSongs = [], a.neteaseSearchResults = [], a.message = "已断开插件账户；可点击「连接官网账户」重新连接，不影响官网登录。";
    });
  }
  async function ie() {
    await A(async () => {
      await g.connectWebsiteAccount(), await g.fetchAccountRecentSongs(60), U(), O(), a.message = "✓ 账号历史与歌单已同步刷新！";
    });
  }
  async function le() {
    await A(async () => {
      await g.clearRecentSongs(), U();
    });
  }
  function oe() {
    k || (T(), U(), a.neteasePlaylists = [], a.neteaseSongs = [], a.neteaseSearchResults = [], a.neteaseActivePlaylist = null, a.message = "账号资料发生变化，请核对；需要时手动刷新歌单。");
  }
  function j() {
    k = !0, T();
  }
  return { state: a, refresh: O, selectPlaylist: x, search: I, connectWebsite: w, logout: J, clearRecent: le, syncLocal: U, pause: T, dispose: j, accountChanged: oe, syncHistory: ie };
}
const vt = { class: "ms-source-pane ms-netease-source" }, mt = { class: "ms-netease-user-bar" }, ht = { class: "ms-netease-user-info" }, pt = ["src"], ft = { class: "ms-netease-meta" }, gt = { class: "ms-netease-name" }, yt = {
  key: 0,
  class: "ms-netease-vip-badge"
}, _t = { class: "ms-netease-status-text" }, bt = {
  key: 1,
  class: "ms-netease-meta"
}, kt = { class: "ms-netease-name" }, St = { class: "ms-netease-status-text" }, wt = { style: { display: "flex", gap: "8px", "align-items": "center" } }, Ct = ["disabled"], xt = ["disabled"], At = { class: "ms-netease-body" }, Pt = { class: "ms-netease-playlists" }, Rt = { class: "ms-netease-section-title" }, Lt = { class: "ms-netease-pl-info" }, Ut = { class: "ms-netease-pl-name" }, Mt = { class: "ms-netease-pl-count" }, Et = { class: "ms-netease-pl-info" }, $t = { class: "ms-netease-pl-count" }, Tt = { class: "ms-netease-pl-info" }, It = { class: "ms-netease-pl-count" }, Wt = ["onClick"], Dt = ["src"], Nt = { class: "ms-netease-pl-info" }, Vt = { class: "ms-netease-pl-name" }, Ft = { class: "ms-netease-pl-count" }, zt = { class: "ms-netease-tracks" }, Ht = { class: "ms-netease-tracks-head" }, qt = { class: "ms-netease-tracks-sub" }, Bt = {
  key: 0,
  class: "ms-rhine-search-wrap"
}, Ot = {
  key: 0,
  class: "ms-rhine-album-detail"
}, jt = { class: "ms-rhine-detail-banner" }, Kt = ["src"], Qt = { class: "ms-rhine-detail-info" }, Yt = { class: "ms-rhine-detail-title" }, Jt = { class: "ms-rhine-detail-sub" }, Xt = {
  key: 0,
  class: "ms-netease-loading-box"
}, Zt = {
  key: 1,
  class: "ms-rhine-track-list"
}, Gt = ["onClick"], es = { class: "ms-netease-track-idx" }, ts = {
  key: 0,
  style: { color: "#f59e0b" }
}, ss = { key: 1 }, ns = { class: "ms-netease-track-info" }, as = ["title"], is = { class: "ms-netease-track-artist" }, ls = {
  class: "ms-netease-track-dur",
  style: { display: "flex", "align-items": "center", gap: "8px" }
}, os = ["title", "onClick"], cs = {
  key: 1,
  class: "ms-rhine-grid-wrap"
}, rs = {
  key: 0,
  class: "ms-dropdown-empty",
  style: { padding: "40px 0" }
}, us = { class: "ms-rhine-album-grid" }, ds = ["onClick"], vs = { class: "ms-rhine-cover-wrap" }, ms = ["src"], hs = { class: "ms-rhine-meta" }, ps = ["title"], fs = {
  key: 0,
  class: "ms-netease-pagination-bar ms-rhine-pagination-bar"
}, gs = { class: "ms-pagination-info" }, ys = { class: "ms-pagination-btns" }, _s = ["disabled"], bs = ["disabled"], ks = ["onClick"], Ss = ["disabled"], ws = ["disabled"], Cs = {
  key: 0,
  class: "ms-dropdown-section"
}, xs = { class: "ms-search-history-tags" }, As = ["onClick"], Ps = ["onClick"], Rs = {
  key: 1,
  class: "ms-dropdown-section"
}, Ls = { class: "ms-dropdown-head" }, Us = { class: "ms-recent-dropdown-list" }, Ms = ["onClick"], Es = { class: "ms-drop-play" }, $s = { class: "ms-drop-title" }, Ts = { class: "ms-drop-artist" }, Is = { class: "ms-drop-dur" }, Ws = {
  key: 2,
  class: "ms-dropdown-empty"
}, Ds = {
  key: 0,
  class: "ms-netease-msg-banner"
}, Ns = { class: "ms-netease-tracks-head" }, Vs = { class: "ms-netease-tracks-title" }, Fs = { class: "ms-netease-tracks-sub" }, zs = {
  key: 1,
  class: "ms-netease-loading-box"
}, Hs = ["onClick"], qs = { class: "ms-netease-track-idx" }, Bs = ["src"], Os = { class: "ms-netease-track-info" }, js = { class: "ms-netease-track-name" }, Ks = { class: "ms-netease-track-artist" }, Qs = { class: "ms-netease-track-dur" }, Ys = {
  key: 0,
  style: { padding: "30px", "text-align": "center", color: "var(--muted)", "font-size": "13px" }
}, Js = {
  key: 1,
  class: "ms-netease-pagination-bar"
}, Xs = { class: "ms-pagination-info" }, Zs = { class: "ms-pagination-btns" }, Gs = ["disabled"], en = ["disabled"], tn = { style: { display: "flex", "align-items": "center", gap: "12px", padding: "10px 16px", "border-top": "1px solid var(--border)", background: "var(--panel)" } }, sn = ["src"], nn = { style: { flex: "1", "min-width": "0", display: "flex", "flex-direction": "column", gap: "4px" } }, an = { style: { display: "flex", "justify-content": "space-between", "font-size": "12px" } }, ln = { style: { "font-weight": "600", "white-space": "nowrap", overflow: "hidden", "text-overflow": "ellipsis", color: "var(--heading)" } }, on = { style: { color: "var(--muted)", "font-size": "11px" } }, cn = ["value"], rn = { style: { display: "flex", "align-items": "center", gap: "6px" } }, un = ["title"], dn = ["title"], vn = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23334155'/%3E%3Ccircle cx='32' cy='24' r='10' fill='%2364748b'/%3E%3Cpath d='M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16' fill='%2364748b'/%3E%3C/svg%3E", he = 8, ae = 10, mn = /* @__PURE__ */ et({
  __name: "NeteaseWorkspaceDialog",
  setup(F) {
    const a = S(!document.hidden), k = C(() => Y.visible && a.value), m = dt(() => k.value), u = m.state, $ = S(!1), U = S("先在同一浏览器的网易云官网登录，再点击「连接官网账户」。无需音乐节点；插件断开不会退出官网。");
    function T() {
      typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: "https://music.163.com/" }) : window.open("https://music.163.com/", "_blank", "noopener,noreferrer");
    }
    async function B() {
      if (!$.value) {
        $.value = !0, U.value = "正在使用浏览器官网会话读取账户…";
        try {
          await m.connectWebsite(), U.value = "官网账户已连接。若歌单读取失败，请查看列表提示。";
        } catch (s) {
          U.value = s?.message || "官网账户连接失败，请确认已登录。";
        } finally {
          $.value = !1;
        }
      }
    }
    async function z() {
      await m.logout(), f.neteaseUser = null, f.neteaseSongs = [], f.neteasePlaylists = [], U.value = "已断开插件账户，官网仍保持登录。";
    }
    const O = S(null), x = S(""), I = S(!1);
    let A = null;
    const w = S([]);
    try {
      const s = localStorage.getItem("netease_search_history");
      if (s) {
        const t = JSON.parse(s);
        Array.isArray(t) && (w.value = t.slice(0, 15));
      }
    } catch {
    }
    function J(s) {
      const t = s.trim();
      if (t) {
        w.value = [t, ...w.value.filter((n) => n !== t)].slice(0, 15);
        try {
          localStorage.setItem("netease_search_history", JSON.stringify(w.value));
        } catch {
        }
      }
    }
    function ie(s) {
      w.value = w.value.filter((t) => t !== s);
      try {
        localStorage.setItem("netease_search_history", JSON.stringify(w.value));
      } catch {
      }
    }
    function le() {
      w.value = [];
      try {
        localStorage.removeItem("netease_search_history");
      } catch {
      }
    }
    function oe(s) {
      x.value = s, I.value = !1, m.search(s);
    }
    function j(s) {
      s.target?.closest(".ms-netease-search-wrap") || (I.value = !1);
    }
    const l = S(!1), d = S(!1), v = S(null), y = S(!1), h = S(""), p = S(1), D = C(() => {
      const s = f.albums || [], t = h.value.trim().toLowerCase();
      return t ? s.filter((n) => (n.name || "").toLowerCase().includes(t)) : s;
    }), _ = C(() => Math.max(1, Math.ceil(D.value.length / he))), Le = C(() => {
      const s = (p.value - 1) * he;
      return D.value.slice(s, s + he);
    }), Ue = C(() => {
      const s = _.value, t = p.value, n = [], b = Math.max(1, t - 2), N = Math.min(s, t + 2);
      for (let de = b; de <= N; de++)
        n.push(de);
      return n;
    });
    ee(h, () => {
      p.value = 1;
    });
    function Me() {
      m.pause(), d.value = !0, l.value = !1, v.value = null, (!f.albums || f.albums.length === 0) && E.getSirenAlbums().then((s) => {
        s?.length && (f.albums = s);
      });
    }
    async function Ee(s) {
      if (v.value = s, !s._songs || !s._songs.length) {
        y.value = !0;
        try {
          const t = await E.getSirenAlbumDetail(s.cid);
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
        E.setQueue(t, n >= 0 ? n : 0, !0), f.activeAlbum = v.value;
      } else
        E.playSong(s);
    }
    function Te(s) {
      const t = s._songs || [];
      t.length > 0 && (E.setQueue(t, 0, !0), f.activeAlbum = s);
    }
    function ce(s) {
      if (!f.playing) return !1;
      const t = E.getState().currentSong;
      return !!(t && String(t.cid) === String(s.cid));
    }
    function re(s) {
      return E.isLiked(s.cid);
    }
    function Ie(s, t) {
      t?.stopPropagation();
      const n = E.toggleLike(s);
      ce(s) && (f.liked = n);
    }
    const K = C(() => u.neteasePlaylists.find((s) => s.name?.includes("喜欢的音乐") || s.specialType === 5)), We = C(() => {
      const s = K.value;
      return s ? u.neteasePlaylists.filter((t) => t.id !== s.id) : u.neteasePlaylists;
    }), X = C(() => d.value || l.value || H.value ? !1 : K.value && u.neteaseActivePlaylist?.id === K.value.id);
    function De() {
      m.pause(), d.value = !1, v.value = null, l.value = !1;
      const s = K.value;
      s ? m.selectPlaylist(s) : u.neteasePlaylists[0] && m.selectPlaylist(u.neteasePlaylists[0]);
    }
    const H = C(() => x.value.trim().length > 0 && u.neteaseSearchResults.length > 0), Z = C(() => H.value ? u.neteaseSearchResults : l.value ? u.neteaseRecentSongs : u.neteaseSongs), P = S(1), Q = C(() => Math.max(1, Math.ceil(Z.value.length / ae))), Ne = C(() => {
      const s = (P.value - 1) * ae;
      return Z.value.slice(s, s + ae);
    });
    ee(
      () => [u.neteaseActivePlaylist?.id, H.value, l.value],
      () => {
        P.value = 1;
      }
    ), ee(Q, (s) => {
      P.value > s && (P.value = Math.max(1, s));
    });
    function Ve() {
      P.value > 1 && P.value--;
    }
    function Fe() {
      P.value < Q.value && P.value++;
    }
    const ze = C(() => f.mode === "shuffle" ? "🔀" : f.mode === "one" ? "🔂" : "🔁");
    function He() {
      Re.minimize("music");
    }
    function qe() {
      Re.close("music");
    }
    function Be() {
      m.pause(), d.value = !1, v.value = null, l.value = !0, u.neteaseActivePlaylist = null;
    }
    function Oe(s) {
      d.value = !1, v.value = null, l.value = !1, m.selectPlaylist(s);
    }
    function je() {
      m.pause(), A && clearTimeout(A), A = setTimeout(() => {
        if (!k.value) return;
        const s = x.value.trim();
        s && J(s), m.search(x.value);
      }, 400);
    }
    function Ke() {
      A && clearTimeout(A);
      const s = x.value.trim();
      s && J(s), I.value = !1, m.search(x.value);
    }
    function Qe() {
      m.pause(), x.value = "", u.neteaseSearchResults = [];
    }
    function pe(s) {
      q.playNeteaseTrack(s);
    }
    function G(s) {
      return !!(s.id && String(s.id) === String(E.getState().currentSong?.neteaseId) || s.cid && String(s.cid) === String(E.getState().currentSong?.cid));
    }
    function Ye(s) {
      return s.picUrl || s.coverUrl || s.al?.picUrl || s.album?.picUrl || rt;
    }
    function fe(s) {
      const t = s.ar || s.artists;
      return Array.isArray(t) && t.length ? t.map((n) => n.name).join(", ") : "未知歌手";
    }
    function ge(s) {
      const t = s.dt || s.duration || 0, n = Math.floor(t > 1e3 ? t / 1e3 : t), b = Math.floor(n / 60), N = n % 60;
      return `${b}:${String(N).padStart(2, "0")}`;
    }
    function Je(s) {
      const t = Number(s.target.value);
      q.seek(t);
    }
    function Xe() {
      m.refresh();
    }
    function ue() {
      m.pause(), A && clearTimeout(A), A = null, I.value = !1, document.removeEventListener("click", j);
    }
    const Ze = ct(ue);
    let ye = !1;
    function _e() {
      !ye && k.value && (ye = !0, m.refresh());
    }
    function be() {
      a.value = !document.hidden;
    }
    function ke() {
      m.syncLocal();
    }
    function Se() {
      m.accountChanged();
    }
    return ee(k, (s) => {
      s ? (m.syncLocal(), document.addEventListener("click", j), _e()) : ue();
    }, { flush: "sync" }), tt(() => {
      document.addEventListener("visibilitychange", be), window.addEventListener("netease:recent-updated", ke), window.addEventListener("netease:account-updated", Se), m.syncLocal(), k.value && (document.addEventListener("click", j), _e());
    }), st(() => {
      ue(), Ze(), m.dispose(), document.removeEventListener("visibilitychange", be), window.removeEventListener("netease:recent-updated", ke), window.removeEventListener("netease:account-updated", Se);
    }), (s, t) => (c(), nt(ut, {
      id: "music-workspace",
      "window-id": "music",
      title: i(M)("netease.title"),
      icon: "🎵",
      visible: i(Y).visible,
      "default-width": 960,
      "default-height": 640,
      "min-width": 480,
      "min-height": 360,
      "custom-class": "ms-panel ms-source-netease",
      onMinimize: He,
      onClose: qe
    }, {
      default: at(() => [
        e("div", vt, [
          e("div", mt, [
            e("div", ht, [
              i(u).neteaseUser?.nickname ? (c(), r(R, { key: 0 }, [
                e("img", {
                  class: "ms-netease-avatar",
                  src: i(u).neteaseUser.avatarUrl || vn,
                  alt: "avatar"
                }, null, 8, pt),
                e("div", ft, [
                  e("span", gt, [
                    we(o(i(u).neteaseUser.nickname) + " ", 1),
                    i(u).neteaseUser.isVip ? (c(), r("span", yt, "VIP")) : L("", !0)
                  ]),
                  e("span", _t, o(i(M)("netease.connected")), 1)
                ])
              ], 64)) : (c(), r("div", bt, [
                e("span", kt, o(i(M)("netease.guestMode")), 1),
                e("span", St, o(i(M)("netease.guestSub")), 1)
              ]))
            ]),
            e("div", wt, [
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                disabled: i(Y).pendingWrites > 0,
                onClick: Xe
              }, o(i(M)("netease.refreshList")), 9, Ct),
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                style: { color: "#f43f5e", "border-color": "rgba(244, 63, 94, 0.4)", "font-weight": "600" },
                onClick: T
              }, o(i(M)("netease.webLogin")), 1),
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                disabled: $.value,
                onClick: B
              }, o($.value ? i(M)("netease.connecting") : i(M)("netease.connectWebsite")), 9, xt),
              i(u).neteaseUser?.nickname ? (c(), r("button", {
                key: 0,
                type: "button",
                class: "ms-netease-logout-btn",
                onClick: z
              }, o(i(M)("netease.logout")), 1)) : L("", !0)
            ])
          ]),
          e("div", At, [
            e("div", Pt, [
              e("div", Rt, o(i(M)("netease.officialSoundtrack")), 1),
              e("button", {
                type: "button",
                class: W(["ms-netease-pl-item ms-netease-pl-rhine", { active: d.value }]),
                onClick: Me
              }, [
                t[16] || (t[16] = e("div", {
                  class: "ms-netease-pl-icon-box",
                  style: { background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(234, 88, 12, 0.2))", color: "#f59e0b" }
                }, "💿", -1)),
                e("div", Lt, [
                  e("div", Ut, o(i(M)("netease.rhineMusic")), 1),
                  e("div", Mt, o(i(f).albums?.length || 0) + " 张官方专辑", 1)
                ])
              ], 2),
              t[21] || (t[21] = e("div", { class: "ms-netease-section-title" }, "我的歌单 & 精选推荐", -1)),
              e("button", {
                type: "button",
                class: W(["ms-netease-pl-item ms-netease-pl-favorites", { active: X.value }]),
                onClick: De
              }, [
                t[18] || (t[18] = e("div", {
                  class: "ms-netease-pl-icon-box",
                  style: { background: "rgba(244, 63, 94, 0.15)", color: "#f43f5e" }
                }, "❤️", -1)),
                e("div", Et, [
                  t[17] || (t[17] = e("div", { class: "ms-netease-pl-name" }, "我喜欢的音乐", -1)),
                  e("div", $t, o((K.value?.trackCount ?? i(u).neteaseSongs.length) || 0) + " 首曲目", 1)
                ])
              ], 2),
              e("button", {
                type: "button",
                class: W(["ms-netease-pl-item ms-netease-pl-recent", { active: l.value }]),
                onClick: Be
              }, [
                t[20] || (t[20] = e("div", { class: "ms-netease-pl-icon-box" }, "🕒", -1)),
                e("div", Tt, [
                  t[19] || (t[19] = e("div", { class: "ms-netease-pl-name" }, "最近播放记录", -1)),
                  e("div", It, o(i(u).neteaseRecentSongs.length) + " 首曲目", 1)
                ])
              ], 2),
              (c(!0), r(R, null, V(We.value, (n) => (c(), r("button", {
                key: n.id,
                type: "button",
                class: W(["ms-netease-pl-item", { active: !d.value && !l.value && !X.value && i(u).neteaseActivePlaylist?.id === n.id }]),
                onClick: (b) => Oe(n)
              }, [
                e("img", {
                  class: "ms-netease-pl-cover",
                  src: n.coverImgUrl,
                  alt: "",
                  loading: "lazy"
                }, null, 8, Dt),
                e("div", Nt, [
                  e("div", Vt, o(n.name), 1),
                  e("div", Ft, o(n.trackCount || 0) + " 首曲目", 1)
                ])
              ], 10, Wt))), 128))
            ]),
            e("div", zt, [
              d.value ? (c(), r(R, { key: 0 }, [
                e("div", Ht, [
                  e("div", null, [
                    t[22] || (t[22] = e("div", { class: "ms-netease-tracks-title" }, "莱茵唱片 · 官方原声曲库", -1)),
                    e("div", qt, " 塞壬唱片 MSR 出品 · 共 " + o(i(f).albums?.length || 0) + " 张官方专辑 ", 1)
                  ]),
                  v.value ? L("", !0) : (c(), r("div", Bt, [
                    Ce(e("input", {
                      "onUpdate:modelValue": t[0] || (t[0] = (n) => h.value = n),
                      type: "text",
                      class: "ms-rhine-search-input",
                      placeholder: "搜索专辑或艺术家…"
                    }, null, 512), [
                      [xe, h.value]
                    ])
                  ]))
                ]),
                v.value ? (c(), r("div", Ot, [
                  e("header", jt, [
                    e("button", {
                      type: "button",
                      class: "ms-rhine-back-btn",
                      onClick: t[1] || (t[1] = (n) => v.value = null)
                    }, " ‹ 返回专辑列表 "),
                    e("img", {
                      src: v.value.coverUrl || i(me),
                      class: "ms-rhine-detail-cover",
                      alt: ""
                    }, null, 8, Kt),
                    e("div", Qt, [
                      t[23] || (t[23] = e("span", { class: "siren-badge" }, "OFFICIAL ALBUM", -1)),
                      e("h2", Yt, o(v.value.name), 1),
                      e("p", Jt, "塞壬唱片-MSR 出品 · 共 " + o(v.value._songs?.length || 0) + " 首曲目", 1),
                      e("button", {
                        type: "button",
                        class: "ms-rhine-play-album-btn",
                        onClick: t[2] || (t[2] = (n) => Te(v.value))
                      }, " ▶ 播放整张专辑 ")
                    ])
                  ]),
                  y.value ? (c(), r("div", Xt, [...t[24] || (t[24] = [
                    e("div", { class: "ms-netease-spinner" }, null, -1),
                    e("div", { class: "ms-netease-loading-tip" }, "正在调取专辑曲目列表…", -1)
                  ])])) : (c(), r("div", Zt, [
                    (c(!0), r(R, null, V(v.value._songs || [], (n, b) => (c(), r("button", {
                      key: n.cid,
                      type: "button",
                      class: W(["ms-netease-track-row", { playing: ce(n) }]),
                      onClick: (N) => $e(n)
                    }, [
                      e("span", es, [
                        ce(n) ? (c(), r("span", ts, "▶")) : (c(), r("span", ss, o(b + 1), 1))
                      ]),
                      e("div", ns, [
                        e("span", {
                          class: "ms-netease-track-name",
                          title: n.name
                        }, o(n.name), 9, as),
                        e("span", is, o((n.artists || []).join(", ") || "塞壬唱片"), 1)
                      ]),
                      e("div", ls, [
                        e("button", {
                          type: "button",
                          class: W(["siren-btn-icon", { liked: re(n) }]),
                          title: re(n) ? "取消收藏" : "收藏曲目",
                          onClick: ve((N) => Ie(n, N), ["stop"])
                        }, o(re(n) ? "♥" : "♡"), 11, os)
                      ])
                    ], 10, Gt))), 128))
                  ]))
                ])) : (c(), r("div", cs, [
                  D.value.length ? (c(), r(R, { key: 1 }, [
                    e("div", us, [
                      (c(!0), r(R, null, V(Le.value, (n) => (c(), r("div", {
                        key: n.cid,
                        class: "ms-rhine-album-card",
                        onClick: (b) => Ee(n)
                      }, [
                        e("div", vs, [
                          e("img", {
                            src: n.coverUrl || i(me),
                            class: "ms-rhine-cover",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, ms),
                          t[25] || (t[25] = e("div", { class: "ms-rhine-hover-play" }, "▶", -1))
                        ]),
                        e("div", hs, [
                          e("span", {
                            class: "ms-rhine-album-name",
                            title: n.name
                          }, o(n.name), 9, ps),
                          t[26] || (t[26] = e("span", { class: "ms-rhine-corp" }, "塞壬唱片 MSR", -1))
                        ])
                      ], 8, ds))), 128))
                    ]),
                    _.value > 1 ? (c(), r("div", fs, [
                      e("span", gs, " 第 " + o(p.value) + " / " + o(_.value) + " 页 · 共 " + o(D.value.length) + " 张专辑 ", 1),
                      e("div", ys, [
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: p.value <= 1,
                          title: "首页",
                          onClick: t[3] || (t[3] = (n) => p.value = 1)
                        }, " « ", 8, _s),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: p.value <= 1,
                          title: "上一页",
                          onClick: t[4] || (t[4] = (n) => p.value = Math.max(1, p.value - 1))
                        }, " ◀ ", 8, bs),
                        (c(!0), r(R, null, V(Ue.value, (n) => (c(), r("button", {
                          key: "rpage-" + n,
                          type: "button",
                          class: W(["ms-page-btn", { active: n === p.value }]),
                          onClick: (b) => p.value = n
                        }, o(n), 11, ks))), 128)),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: p.value >= _.value,
                          title: "下一页",
                          onClick: t[5] || (t[5] = (n) => p.value = Math.min(_.value, p.value + 1))
                        }, " ▶ ", 8, Ss),
                        e("button", {
                          type: "button",
                          class: "ms-page-btn",
                          disabled: p.value >= _.value,
                          title: "尾页",
                          onClick: t[6] || (t[6] = (n) => p.value = _.value)
                        }, " » ", 8, ws)
                      ])
                    ])) : L("", !0)
                  ], 64)) : (c(), r("div", rs, " 正在加载专辑或未找到匹配项… "))
                ]))
              ], 64)) : (c(), r(R, { key: 1 }, [
                e("div", {
                  class: "ms-netease-search-wrap",
                  ref_key: "searchWrapRef",
                  ref: O
                }, [
                  Ce(e("input", {
                    type: "text",
                    class: "ms-netease-search-input",
                    placeholder: "全网搜索网易云单曲、歌手名或专辑…",
                    "onUpdate:modelValue": t[7] || (t[7] = (n) => x.value = n),
                    onKeydown: it(Ke, ["enter"]),
                    onInput: je,
                    onFocus: t[8] || (t[8] = (n) => I.value = !0)
                  }, null, 544), [
                    [xe, x.value]
                  ]),
                  I.value && !x.value.trim() ? (c(), r("div", {
                    key: 0,
                    class: "ms-netease-search-dropdown",
                    onMousedown: t[10] || (t[10] = ve(() => {
                    }, ["prevent"]))
                  }, [
                    w.value.length > 0 ? (c(), r("div", Cs, [
                      e("div", { class: "ms-dropdown-head" }, [
                        t[27] || (t[27] = e("span", { class: "ms-dropdown-title" }, "🔍 搜索历史", -1)),
                        e("button", {
                          type: "button",
                          class: "ms-dropdown-clear",
                          onClick: le
                        }, "清空")
                      ]),
                      e("div", xs, [
                        (c(!0), r(R, null, V(w.value, (n) => (c(), r("span", {
                          key: "hist-" + n,
                          class: "ms-search-tag",
                          onClick: (b) => oe(n)
                        }, [
                          we(o(n) + " ", 1),
                          e("b", {
                            class: "ms-tag-del",
                            onClick: ve((b) => ie(n), ["stop"])
                          }, "×", 8, Ps)
                        ], 8, As))), 128))
                      ])
                    ])) : L("", !0),
                    i(u).neteaseRecentSongs.length > 0 ? (c(), r("div", Rs, [
                      e("div", Ls, [
                        t[28] || (t[28] = e("span", { class: "ms-dropdown-title" }, "🕒 历史听歌记录", -1)),
                        e("button", {
                          type: "button",
                          class: "ms-dropdown-clear",
                          onClick: t[9] || (t[9] = (n) => i(m).clearRecent())
                        }, "清空")
                      ]),
                      e("div", Us, [
                        (c(!0), r(R, null, V(i(u).neteaseRecentSongs.slice(0, 8), (n) => (c(), r("div", {
                          key: "drop-rec-" + n.id,
                          class: W(["ms-recent-dropdown-item", { playing: G(n) }]),
                          onClick: (b) => {
                            pe(n), I.value = !1;
                          }
                        }, [
                          e("span", Es, o(G(n) ? "▶" : "♫"), 1),
                          e("span", $s, o(n.name), 1),
                          e("span", Ts, o(fe(n)), 1),
                          e("span", Is, o(ge(n)), 1)
                        ], 10, Ms))), 128))
                      ])
                    ])) : L("", !0),
                    !w.value.length && !i(u).neteaseRecentSongs.length ? (c(), r("div", Ws, " 暂无搜索与播放历史，输入歌名或歌手即可开始畅听 ")) : L("", !0)
                  ], 32)) : L("", !0)
                ], 512),
                i(u).message ? (c(), r("div", Ds, [
                  e("span", null, o(i(u).message), 1)
                ])) : L("", !0),
                e("div", Ns, [
                  e("div", null, [
                    e("div", Vs, o(H.value ? `搜索结果 (${i(u).neteaseSearchResults.length})` : l.value ? `最近播放记录 (${i(u).neteaseRecentSongs.length})` : X.value ? `我喜欢的音乐 (${i(u).neteaseSongs.length})` : i(u).neteaseActivePlaylist?.name || "我喜欢的音乐"), 1),
                    e("div", Fs, o(H.value ? "网易云曲库实时检索" : l.value ? "近期点播收听的历史歌曲" : X.value ? "个人云端红心曲库，点击即可一键开始高保真串流播放" : "点击歌曲即可一键开始高保真串流播放"), 1)
                  ]),
                  H.value ? (c(), r("button", {
                    key: 0,
                    type: "button",
                    class: "ms-netease-logout-btn",
                    onClick: Qe
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
                  (c(!0), r(R, null, V(Ne.value, (n, b) => (c(), r("div", {
                    key: n.id || b,
                    class: W(["ms-netease-track-row", { playing: G(n) }]),
                    onClick: (N) => pe(n)
                  }, [
                    e("span", qs, o(G(n) ? "▶" : (P.value - 1) * ae + b + 1), 1),
                    e("img", {
                      class: "ms-netease-track-cover",
                      src: Ye(n),
                      alt: "",
                      loading: "lazy"
                    }, null, 8, Bs),
                    e("div", Os, [
                      e("div", js, o(n.name), 1),
                      e("div", Ks, o(fe(n)), 1)
                    ]),
                    e("span", Qs, o(ge(n)), 1)
                  ], 10, Hs))), 128)),
                  Z.value.length ? L("", !0) : (c(), r("div", Ys, " 未找到曲目，可尝试在上方搜索框输入关键词 ")),
                  Q.value > 1 ? (c(), r("div", Js, [
                    e("span", Xs, " 第 " + o(P.value) + " / " + o(Q.value) + " 页 · 共 " + o(Z.value.length) + " 首 ", 1),
                    e("div", Zs, [
                      e("button", {
                        type: "button",
                        class: "ms-page-btn",
                        disabled: P.value <= 1,
                        title: "上一页",
                        onClick: Ve
                      }, " ◀ 上一页 ", 8, Gs),
                      e("button", {
                        type: "button",
                        class: "ms-page-btn",
                        disabled: P.value >= Q.value,
                        title: "下一页",
                        onClick: Fe
                      }, " 下一页 ▶ ", 8, en)
                    ])
                  ])) : L("", !0)
                ], 64))
              ], 64))
            ])
          ])
        ]),
        e("footer", tn, [
          e("img", {
            src: i(f).coverUrl || i(me),
            alt: "",
            style: { width: "42px", height: "42px", "border-radius": "8px", "object-fit": "cover", "flex-shrink": "0" }
          }, null, 8, sn),
          e("div", nn, [
            e("div", an, [
              e("span", ln, o(i(f).title || "暂无播放曲目"), 1),
              e("span", on, o(i(f).formattedCurrent) + " / " + o(i(f).formattedDuration), 1)
            ]),
            e("input", {
              type: "range",
              min: "0",
              max: "100",
              step: "0.1",
              value: i(f).progressPercent,
              onInput: Je,
              style: { width: "100%", height: "4px", "accent-color": "#f43f5e", cursor: "pointer" }
            }, null, 40, cn)
          ]),
          e("div", rn, [
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[12] || (t[12] = (n) => i(q).prev()),
              title: "上一首"
            }, "⏮"),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              style: { background: "#f43f5e", color: "#fff", "border-color": "#f43f5e" },
              onClick: t[13] || (t[13] = (n) => i(q).togglePlay()),
              title: i(f).playing ? "暂停" : "播放"
            }, o(i(f).playing ? "⏸" : "▶"), 9, un),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[14] || (t[14] = (n) => i(q).next()),
              title: "下一首"
            }, "⏭"),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[15] || (t[15] = (n) => i(q).cycleMode()),
              title: i(f).mode
            }, o(ze.value), 9, dn)
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "visible"]));
  }
}), bn = /* @__PURE__ */ lt(mn, [["__scopeId", "data-v-e0293e6b"]]);
export {
  bn as default
};
