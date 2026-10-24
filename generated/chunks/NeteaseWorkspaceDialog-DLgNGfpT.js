import { r as Le, f as Me, w as ee, o as Te, a as Ie, g as v, I as $e, K as We, i as e, x as l, h as f, F as $, j as ue, t as u, u as x, s as F, z as B, q as Ne, A as De, v as Ve, k as de, c as U, b as E } from "./vendor-vue-BUkfvXUI.js";
import { $ as g, a0 as ve, a1 as j, a2 as K, a3 as J, a4 as q, a5 as ze, a6 as me, a7 as Fe, b as w, a8 as qe, h as W, B as fe, S as He } from "./search.service-BE0VV64-.js";
import { A as Oe } from "./AppWindowFrame-CdaabCwe.js";
import { w as pe } from "./read-session-BWENvNUM.js";
import { _ as Be } from "./_plugin-vue_export-helper-CHgC5LLL.js";
function je(T) {
  const n = Le({
    neteaseUser: null,
    neteasePlaylists: [],
    neteaseActivePlaylist: null,
    neteaseSongs: [],
    neteaseSearchResults: [],
    neteaseRecentSongs: [],
    neteaseLoading: !1,
    message: ""
  });
  let h = !1, r = 0, o, P;
  function S() {
    if (!h) {
      if (n.neteaseUser = g.getUser(), n.neteaseRecentSongs = g.getRecentSongs(), !n.neteasePlaylists.length)
        try {
          const a = ve(j);
          if (a.length && Array.isArray(a) && a.length) {
            n.neteasePlaylists = a;
            const c = a.find((_) => _.name?.includes("喜欢的音乐") || _.specialType === 5) || a[0];
            c && !n.neteaseActivePlaylist && (n.neteaseActivePlaylist = c);
          }
        } catch {
        }
      if (!n.neteaseSongs.length)
        try {
          const a = ve(K);
          a.length && Array.isArray(a) && a.length && (n.neteaseSongs = a);
        } catch {
        }
    }
  }
  function A() {
    r++, o?.abort(), o = void 0, n.neteaseLoading = !1, P !== void 0 && clearTimeout(P), P = void 0;
  }
  async function N(a) {
    if (h || !T()) return;
    if (q.pendingWrites) {
      n.message = "音乐操作正在处理，请稍候；未自动排队。";
      return;
    }
    A();
    const c = new AbortController(), _ = r;
    o = c, n.neteaseLoading = !0, n.message = "";
    const p = () => !h && T() && r === _ && !c.signal.aborted;
    try {
      await g.whenReady(), p() && await a(c.signal, p);
    } catch (d) {
      p() && (n.message = d?.message || "读取失败，请检查节点设置或网络后手动重试。");
    } finally {
      o === c && (o = void 0, n.neteaseLoading = !1);
    }
  }
  async function I(a, c, _ = 500, p = 0) {
    try {
      const d = await g.request("/playlist/track/all", { id: a, limit: _, offset: p }, c);
      if (d.songs?.length) return d.songs;
    } catch {
      c.throwIfAborted();
    }
    return p === 0 ? (await g.request("/playlist/detail", { id: a }, c)).playlist?.tracks || [] : [];
  }
  async function D() {
    await N(async (a, c) => {
      S();
      const p = n.neteaseUser?.uid;
      let d = [];
      if (p)
        try {
          d = (await g.request("/user/playlist", { uid: p, limit: 100 }, a)).playlist || [];
        } catch (m) {
          c() && (n.message = m?.message || "官网歌单读取失败，请重新连接账户。");
          return;
        }
      if (!d.length)
        try {
          d = (await g.request("/toplist", {}, a)).list || [];
        } catch {
        }
      if (!c()) return;
      if (d.length) {
        n.neteasePlaylists = d;
        try {
          me(j, d);
        } catch {
        }
      }
      const y = d.find((m) => m.id === n.neteaseActivePlaylist?.id) || d.find((m) => m.name?.includes("喜欢的音乐") || m.specialType === 5) || d[0];
      if (!y) return;
      if (!n.neteaseSongs.length)
        try {
          const m = await I(y.id, a, 10, 0);
          c() && !n.neteaseSongs.length && (n.neteaseActivePlaylist = y, n.neteaseSongs = m, n.neteaseLoading = !1);
        } catch {
        }
      const M = await I(y.id, a, 500, 0);
      if (c() && (n.neteaseActivePlaylist = y, n.neteaseSongs = M, y.name?.includes("喜欢的音乐") || y.specialType === 5))
        try {
          me(K, M);
        } catch {
        }
    });
  }
  async function k(a) {
    await N(async (c, _) => {
      const p = g.getUser()?.uid;
      if (n.neteaseActivePlaylist = a, !n.neteaseSongs.length || n.neteaseActivePlaylist?.id !== a.id)
        try {
          const y = await I(a.id, c, 10, 0);
          _() && p === g.getUser()?.uid && (!n.neteaseSongs.length || n.neteaseActivePlaylist?.id !== a.id) && (n.neteaseSongs = y, n.neteaseLoading = !1);
        } catch {
        }
      const d = await I(a.id, c, 500, 0);
      _() && p === g.getUser()?.uid && (n.neteaseActivePlaylist = a, n.neteaseSongs = d);
    });
  }
  async function R(a) {
    if (!a.trim()) {
      A(), n.neteaseSearchResults = [];
      return;
    }
    await N(async (c, _) => {
      n.neteaseSearchResults = [];
      const p = g.getUser()?.uid;
      let d = [];
      try {
        d = (await g.request("/cloudsearch", { keywords: a.trim(), type: 1, limit: 60 }, c)).result?.songs || [];
      } catch {
        c.throwIfAborted();
      }
      d.length || (d = (await g.request("/search", { keywords: a.trim(), limit: 60 }, c)).result?.songs || []), _() && p === g.getUser()?.uid && (n.neteaseSearchResults = d);
    });
  }
  async function C(a) {
    if (!(h || !T())) {
      if (q.pendingWrites) {
        n.message = "音乐操作正在处理，请稍候；未自动排队。";
        return;
      }
      try {
        await ze(a);
      } catch {
        h || (n.message = "操作未完整完成，部分变更可能已保存，请重读核对；未自动重试。");
      }
    }
  }
  async function b() {
    if (h || !T()) throw new Error("请先打开网易云模块。");
    A(), await g.connectWebsiteAccount(), J(j), J(K), !(h || !T()) && (S(), await D());
  }
  async function H() {
    if (A(), typeof localStorage < "u")
      try {
        localStorage.setItem("netease_explicit_logout", "true"), J(K), J(j);
      } catch {
      }
    await C(async () => {
      await g.logout(), n.neteaseUser = null, n.neteasePlaylists = [], n.neteaseActivePlaylist = null, n.neteaseSongs = [], n.neteaseSearchResults = [], n.message = "已断开插件账户；可点击「连接官网账户」重新连接，不影响官网登录。";
    });
  }
  async function Q() {
    await C(async () => {
      await g.connectWebsiteAccount(), await g.fetchAccountRecentSongs(60), S(), D(), n.message = "✓ 账号历史与歌单已同步刷新！";
    });
  }
  async function G() {
    await C(async () => {
      await g.clearRecentSongs(), S();
    });
  }
  function X() {
    h || (A(), S(), n.neteasePlaylists = [], n.neteaseSongs = [], n.neteaseSearchResults = [], n.neteaseActivePlaylist = null, n.message = "账号资料发生变化，请核对；需要时手动刷新歌单。");
  }
  function V() {
    h = !0, A();
  }
  return { state: n, refresh: D, selectPlaylist: k, search: R, connectWebsite: b, logout: H, clearRecent: G, syncLocal: S, pause: A, dispose: V, accountChanged: X, syncHistory: Q };
}
const Ke = { class: "ms-source-pane ms-netease-source" }, Je = { class: "ms-netease-user-bar" }, Ye = { class: "ms-netease-user-info" }, Qe = ["src"], Ge = { class: "ms-netease-meta" }, Xe = { class: "ms-netease-name" }, Ze = {
  key: 0,
  class: "ms-netease-vip-badge"
}, et = {
  key: 1,
  class: "ms-netease-meta"
}, tt = { style: { display: "flex", gap: "8px", "align-items": "center" } }, st = ["disabled"], nt = ["disabled"], at = {
  class: "ms-netease-status-text",
  style: { padding: "0 16px" },
  role: "status"
}, it = { class: "ms-netease-body" }, ot = { class: "ms-netease-playlists" }, lt = { class: "ms-netease-pl-info" }, ct = { class: "ms-netease-pl-count" }, rt = { class: "ms-netease-pl-info" }, ut = { class: "ms-netease-pl-count" }, dt = ["onClick"], vt = ["src"], mt = { class: "ms-netease-pl-info" }, ft = { class: "ms-netease-pl-name" }, pt = { class: "ms-netease-pl-count" }, gt = { class: "ms-netease-tracks" }, yt = {
  key: 0,
  class: "ms-dropdown-section"
}, ht = { class: "ms-search-history-tags" }, _t = ["onClick"], bt = ["onClick"], wt = {
  key: 1,
  class: "ms-dropdown-section"
}, St = { class: "ms-dropdown-head" }, kt = { class: "ms-recent-dropdown-list" }, Ct = ["onClick"], xt = { class: "ms-drop-play" }, Pt = { class: "ms-drop-title" }, At = { class: "ms-drop-artist" }, Rt = { class: "ms-drop-dur" }, Ut = {
  key: 2,
  class: "ms-dropdown-empty"
}, Et = {
  key: 0,
  class: "ms-netease-msg-banner"
}, Lt = { class: "ms-netease-tracks-head" }, Mt = { class: "ms-netease-tracks-title" }, Tt = { class: "ms-netease-tracks-sub" }, It = {
  key: 1,
  class: "ms-netease-loading-box"
}, $t = ["onClick"], Wt = { class: "ms-netease-track-idx" }, Nt = ["src"], Dt = { class: "ms-netease-track-info" }, Vt = { class: "ms-netease-track-name" }, zt = { class: "ms-netease-track-artist" }, Ft = { class: "ms-netease-track-dur" }, qt = {
  key: 0,
  style: { padding: "30px", "text-align": "center", color: "var(--muted)", "font-size": "13px" }
}, Ht = {
  key: 1,
  class: "ms-netease-pagination-bar"
}, Ot = { class: "ms-pagination-info" }, Bt = { class: "ms-pagination-btns" }, jt = ["disabled"], Kt = ["disabled"], Jt = { style: { display: "flex", "align-items": "center", gap: "12px", padding: "10px 16px", "border-top": "1px solid var(--border)", background: "var(--panel)" } }, Yt = ["src"], Qt = { style: { flex: "1", "min-width": "0", display: "flex", "flex-direction": "column", gap: "4px" } }, Gt = { style: { display: "flex", "justify-content": "space-between", "font-size": "12px" } }, Xt = { style: { "font-weight": "600", "white-space": "nowrap", overflow: "hidden", "text-overflow": "ellipsis", color: "var(--heading)" } }, Zt = { style: { color: "var(--muted)", "font-size": "11px" } }, es = ["value"], ts = { style: { display: "flex", "align-items": "center", gap: "6px" } }, ss = ["title"], ns = ["title"], as = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23334155'/%3E%3Ccircle cx='32' cy='24' r='10' fill='%2364748b'/%3E%3Cpath d='M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16' fill='%2364748b'/%3E%3C/svg%3E", Y = 10, is = /* @__PURE__ */ Me({
  __name: "NeteaseWorkspaceDialog",
  setup(T) {
    const n = E(!document.hidden), h = U(() => q.visible && n.value), r = je(() => h.value), o = r.state, P = E(!1), S = E("先在同一浏览器的网易云官网登录，再点击「连接官网账户」。无需音乐节点；插件断开不会退出官网。");
    function A() {
      typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: "https://music.163.com/" }) : window.open("https://music.163.com/", "_blank", "noopener,noreferrer");
    }
    async function N() {
      if (!P.value) {
        P.value = !0, S.value = "正在使用浏览器官网会话读取账户…";
        try {
          await r.connectWebsite(), S.value = "官网账户已连接。若歌单读取失败，请查看列表提示。";
        } catch (s) {
          S.value = s?.message || "官网账户连接失败，请确认已登录。";
        } finally {
          P.value = !1;
        }
      }
    }
    async function I() {
      await r.logout(), w.neteaseUser = null, w.neteaseSongs = [], w.neteasePlaylists = [], S.value = "已断开插件账户，官网仍保持登录。";
    }
    const D = E(null), k = E(""), R = E(!1);
    let C = null;
    const b = E([]);
    try {
      const s = localStorage.getItem("netease_search_history");
      if (s) {
        const t = JSON.parse(s);
        Array.isArray(t) && (b.value = t.slice(0, 15));
      }
    } catch {
    }
    function H(s) {
      const t = s.trim();
      if (t) {
        b.value = [t, ...b.value.filter((i) => i !== t)].slice(0, 15);
        try {
          localStorage.setItem("netease_search_history", JSON.stringify(b.value));
        } catch {
        }
      }
    }
    function Q(s) {
      b.value = b.value.filter((t) => t !== s);
      try {
        localStorage.setItem("netease_search_history", JSON.stringify(b.value));
      } catch {
      }
    }
    function G() {
      b.value = [];
      try {
        localStorage.removeItem("netease_search_history");
      } catch {
      }
    }
    function X(s) {
      k.value = s, R.value = !1, r.search(s);
    }
    function V(s) {
      s.target?.closest(".ms-netease-search-wrap") || (R.value = !1);
    }
    const a = E(!1), c = U(() => o.neteasePlaylists.find((s) => s.name?.includes("喜欢的音乐") || s.specialType === 5)), _ = U(() => {
      const s = c.value;
      return s ? o.neteasePlaylists.filter((t) => t.id !== s.id) : o.neteasePlaylists;
    }), p = U(() => a.value || y.value ? !1 : c.value && o.neteaseActivePlaylist?.id === c.value.id);
    function d() {
      r.pause(), a.value = !1;
      const s = c.value;
      s ? r.selectPlaylist(s) : o.neteasePlaylists[0] && r.selectPlaylist(o.neteasePlaylists[0]);
    }
    const y = U(() => k.value.trim().length > 0 && o.neteaseSearchResults.length > 0), M = U(() => y.value ? o.neteaseSearchResults : a.value ? o.neteaseRecentSongs : o.neteaseSongs), m = E(1), z = U(() => Math.max(1, Math.ceil(M.value.length / Y))), ge = U(() => {
      const s = (m.value - 1) * Y;
      return M.value.slice(s, s + Y);
    });
    ee(
      () => [o.neteaseActivePlaylist?.id, y.value, a.value],
      () => {
        m.value = 1;
      }
    ), ee(z, (s) => {
      m.value > s && (m.value = Math.max(1, s));
    });
    function ye() {
      m.value > 1 && m.value--;
    }
    function he() {
      m.value < z.value && m.value++;
    }
    const _e = U(() => w.mode === "shuffle" ? "🔀" : w.mode === "one" ? "🔂" : "🔁");
    function be() {
      pe.minimize("music");
    }
    function we() {
      pe.close("music");
    }
    function Se() {
      r.pause(), a.value = !0, o.neteaseActivePlaylist = null;
    }
    function ke(s) {
      a.value = !1, r.selectPlaylist(s);
    }
    function Ce() {
      r.pause(), C && clearTimeout(C), C = setTimeout(() => {
        if (!h.value) return;
        const s = k.value.trim();
        s && H(s), r.search(k.value);
      }, 400);
    }
    function xe() {
      C && clearTimeout(C);
      const s = k.value.trim();
      s && H(s), R.value = !1, r.search(k.value);
    }
    function Pe() {
      r.pause(), k.value = "", o.neteaseSearchResults = [];
    }
    function te(s) {
      W.playNeteaseTrack(s);
    }
    function O(s) {
      return !!(s.id && String(s.id) === String(fe.getState().currentSong?.neteaseId) || s.cid && String(s.cid) === String(fe.getState().currentSong?.cid));
    }
    function Ae(s) {
      return s.picUrl || s.coverUrl || s.al?.picUrl || s.album?.picUrl || He;
    }
    function se(s) {
      const t = s.ar || s.artists;
      return Array.isArray(t) && t.length ? t.map((i) => i.name).join(", ") : "未知歌手";
    }
    function ne(s) {
      const t = s.dt || s.duration || 0, i = Math.floor(t > 1e3 ? t / 1e3 : t), L = Math.floor(i / 60), re = i % 60;
      return `${L}:${String(re).padStart(2, "0")}`;
    }
    function Re(s) {
      const t = Number(s.target.value);
      W.seek(t);
    }
    function Ue() {
      r.refresh();
    }
    function Z() {
      r.pause(), C && clearTimeout(C), C = null, R.value = !1, document.removeEventListener("click", V);
    }
    const Ee = Fe(Z);
    let ae = !1;
    function ie() {
      !ae && h.value && (ae = !0, r.refresh());
    }
    function oe() {
      n.value = !document.hidden;
    }
    function le() {
      r.syncLocal();
    }
    function ce() {
      r.accountChanged();
    }
    return ee(h, (s) => {
      s ? (r.syncLocal(), document.addEventListener("click", V), ie()) : Z();
    }, { flush: "sync" }), Te(() => {
      document.addEventListener("visibilitychange", oe), window.addEventListener("netease:recent-updated", le), window.addEventListener("netease:account-updated", ce), r.syncLocal(), h.value && (document.addEventListener("click", V), ie());
    }), Ie(() => {
      Z(), Ee(), r.dispose(), document.removeEventListener("visibilitychange", oe), window.removeEventListener("netease:recent-updated", le), window.removeEventListener("netease:account-updated", ce);
    }), (s, t) => (v(), $e(Oe, {
      id: "music-workspace",
      "window-id": "music",
      title: "网易云模块",
      icon: "🎵",
      visible: l(q).visible,
      "default-width": 960,
      "default-height": 640,
      "min-width": 480,
      "min-height": 360,
      "custom-class": "ms-panel ms-source-netease",
      onMinimize: be,
      onClose: we
    }, {
      default: We(() => [
        e("div", Ke, [
          e("div", Je, [
            e("div", Ye, [
              l(o).neteaseUser?.nickname ? (v(), f($, { key: 0 }, [
                e("img", {
                  class: "ms-netease-avatar",
                  src: l(o).neteaseUser.avatarUrl || as,
                  alt: "avatar"
                }, null, 8, Qe),
                e("div", Ge, [
                  e("span", Xe, [
                    ue(u(l(o).neteaseUser.nickname) + " ", 1),
                    l(o).neteaseUser.isVip ? (v(), f("span", Ze, "VIP")) : x("", !0)
                  ]),
                  t[9] || (t[9] = e("span", { class: "ms-netease-status-text" }, "已连接网易云音乐账户", -1))
                ])
              ], 64)) : (v(), f("div", et, [...t[10] || (t[10] = [
                e("span", { class: "ms-netease-name" }, "免登录模式", -1),
                e("span", { class: "ms-netease-status-text" }, "畅听精选榜单与全网搜索", -1)
              ])]))
            ]),
            e("div", tt, [
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                disabled: l(q).pendingWrites > 0,
                onClick: Ue
              }, "⟳ 刷新列表", 8, st),
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                style: { color: "#f43f5e", "border-color": "rgba(244, 63, 94, 0.4)", "font-weight": "600" },
                onClick: A
              }, " 官网登录 "),
              e("button", {
                type: "button",
                class: "ms-netease-logout-btn",
                disabled: P.value,
                onClick: N
              }, u(P.value ? "正在连接…" : "连接官网账户"), 9, nt),
              l(o).neteaseUser?.nickname ? (v(), f("button", {
                key: 0,
                type: "button",
                class: "ms-netease-logout-btn",
                onClick: I
              }, " 退出登录 ")) : x("", !0)
            ])
          ]),
          e("p", at, u(S.value), 1),
          e("div", it, [
            e("div", ot, [
              t[15] || (t[15] = e("div", { class: "ms-netease-section-title" }, "我的歌单 & 精选推荐", -1)),
              e("button", {
                type: "button",
                class: F(["ms-netease-pl-item ms-netease-pl-favorites", { active: p.value }]),
                onClick: d
              }, [
                t[12] || (t[12] = e("div", {
                  class: "ms-netease-pl-icon-box",
                  style: { background: "rgba(244, 63, 94, 0.15)", color: "#f43f5e" }
                }, "❤️", -1)),
                e("div", lt, [
                  t[11] || (t[11] = e("div", { class: "ms-netease-pl-name" }, "我喜欢的音乐", -1)),
                  e("div", ct, u((c.value?.trackCount ?? l(o).neteaseSongs.length) || 0) + " 首曲目", 1)
                ])
              ], 2),
              e("button", {
                type: "button",
                class: F(["ms-netease-pl-item ms-netease-pl-recent", { active: a.value }]),
                onClick: Se
              }, [
                t[14] || (t[14] = e("div", { class: "ms-netease-pl-icon-box" }, "🕒", -1)),
                e("div", rt, [
                  t[13] || (t[13] = e("div", { class: "ms-netease-pl-name" }, "最近播放记录", -1)),
                  e("div", ut, u(l(o).neteaseRecentSongs.length) + " 首曲目", 1)
                ])
              ], 2),
              (v(!0), f($, null, B(_.value, (i) => (v(), f("button", {
                key: i.id,
                type: "button",
                class: F(["ms-netease-pl-item", { active: !a.value && !p.value && l(o).neteaseActivePlaylist?.id === i.id }]),
                onClick: (L) => ke(i)
              }, [
                e("img", {
                  class: "ms-netease-pl-cover",
                  src: i.coverImgUrl,
                  alt: "",
                  loading: "lazy"
                }, null, 8, vt),
                e("div", mt, [
                  e("div", ft, u(i.name), 1),
                  e("div", pt, u(i.trackCount || 0) + " 首曲目", 1)
                ])
              ], 10, dt))), 128))
            ]),
            e("div", gt, [
              e("div", {
                class: "ms-netease-search-wrap",
                ref_key: "searchWrapRef",
                ref: D
              }, [
                Ne(e("input", {
                  type: "text",
                  class: "ms-netease-search-input",
                  placeholder: "全网搜索网易云单曲、歌手名或专辑…",
                  "onUpdate:modelValue": t[0] || (t[0] = (i) => k.value = i),
                  onKeydown: De(xe, ["enter"]),
                  onInput: Ce,
                  onFocus: t[1] || (t[1] = (i) => R.value = !0)
                }, null, 544), [
                  [Ve, k.value]
                ]),
                R.value && !k.value.trim() ? (v(), f("div", {
                  key: 0,
                  class: "ms-netease-search-dropdown",
                  onMousedown: t[3] || (t[3] = de(() => {
                  }, ["prevent"]))
                }, [
                  b.value.length > 0 ? (v(), f("div", yt, [
                    e("div", { class: "ms-dropdown-head" }, [
                      t[16] || (t[16] = e("span", { class: "ms-dropdown-title" }, "🔍 搜索历史", -1)),
                      e("button", {
                        type: "button",
                        class: "ms-dropdown-clear",
                        onClick: G
                      }, "清空")
                    ]),
                    e("div", ht, [
                      (v(!0), f($, null, B(b.value, (i) => (v(), f("span", {
                        key: "hist-" + i,
                        class: "ms-search-tag",
                        onClick: (L) => X(i)
                      }, [
                        ue(u(i) + " ", 1),
                        e("b", {
                          class: "ms-tag-del",
                          onClick: de((L) => Q(i), ["stop"])
                        }, "×", 8, bt)
                      ], 8, _t))), 128))
                    ])
                  ])) : x("", !0),
                  l(o).neteaseRecentSongs.length > 0 ? (v(), f("div", wt, [
                    e("div", St, [
                      t[17] || (t[17] = e("span", { class: "ms-dropdown-title" }, "🕒 历史听歌记录", -1)),
                      e("button", {
                        type: "button",
                        class: "ms-dropdown-clear",
                        onClick: t[2] || (t[2] = (i) => l(r).clearRecent())
                      }, "清空")
                    ]),
                    e("div", kt, [
                      (v(!0), f($, null, B(l(o).neteaseRecentSongs.slice(0, 8), (i) => (v(), f("div", {
                        key: "drop-rec-" + i.id,
                        class: F(["ms-recent-dropdown-item", { playing: O(i) }]),
                        onClick: (L) => {
                          te(i), R.value = !1;
                        }
                      }, [
                        e("span", xt, u(O(i) ? "▶" : "♫"), 1),
                        e("span", Pt, u(i.name), 1),
                        e("span", At, u(se(i)), 1),
                        e("span", Rt, u(ne(i)), 1)
                      ], 10, Ct))), 128))
                    ])
                  ])) : x("", !0),
                  !b.value.length && !l(o).neteaseRecentSongs.length ? (v(), f("div", Ut, " 暂无搜索与播放历史，输入歌名或歌手即可开始畅听 ")) : x("", !0)
                ], 32)) : x("", !0)
              ], 512),
              l(o).message ? (v(), f("div", Et, [
                e("span", null, u(l(o).message), 1)
              ])) : x("", !0),
              e("div", Lt, [
                e("div", null, [
                  e("div", Mt, u(y.value ? `搜索结果 (${l(o).neteaseSearchResults.length})` : a.value ? `最近播放记录 (${l(o).neteaseRecentSongs.length})` : p.value ? `我喜欢的音乐 (${l(o).neteaseSongs.length})` : l(o).neteaseActivePlaylist?.name || "我喜欢的音乐"), 1),
                  e("div", Tt, u(y.value ? "网易云曲库实时检索" : a.value ? "近期点播收听的历史歌曲" : p.value ? "个人云端红心曲库，点击即可一键开始高保真串流播放" : "点击歌曲即可一键开始高保真串流播放"), 1)
                ]),
                y.value ? (v(), f("button", {
                  key: 0,
                  type: "button",
                  class: "ms-netease-logout-btn",
                  onClick: Pe
                }, "清除搜索")) : a.value && l(o).neteaseRecentSongs.length > 0 ? (v(), f("button", {
                  key: 1,
                  type: "button",
                  class: "ms-netease-logout-btn",
                  onClick: t[4] || (t[4] = (i) => l(r).clearRecent())
                }, "清空记录")) : x("", !0)
              ]),
              l(o).neteaseLoading ? (v(), f("div", It, [...t[18] || (t[18] = [
                e("div", { class: "ms-netease-spinner" }, null, -1),
                e("div", { class: "ms-netease-loading-tip" }, "正在同步网易云音源与歌单…", -1)
              ])])) : (v(), f($, { key: 2 }, [
                (v(!0), f($, null, B(ge.value, (i, L) => (v(), f("div", {
                  key: i.id || L,
                  class: F(["ms-netease-track-row", { playing: O(i) }]),
                  onClick: (re) => te(i)
                }, [
                  e("span", Wt, u(O(i) ? "▶" : (m.value - 1) * Y + L + 1), 1),
                  e("img", {
                    class: "ms-netease-track-cover",
                    src: Ae(i),
                    alt: "",
                    loading: "lazy"
                  }, null, 8, Nt),
                  e("div", Dt, [
                    e("div", Vt, u(i.name), 1),
                    e("div", zt, u(se(i)), 1)
                  ]),
                  e("span", Ft, u(ne(i)), 1)
                ], 10, $t))), 128)),
                M.value.length ? x("", !0) : (v(), f("div", qt, " 未找到曲目，可尝试在上方搜索框输入关键词 ")),
                z.value > 1 ? (v(), f("div", Ht, [
                  e("span", Ot, " 第 " + u(m.value) + " / " + u(z.value) + " 页 · 共 " + u(M.value.length) + " 首 ", 1),
                  e("div", Bt, [
                    e("button", {
                      type: "button",
                      class: "ms-page-btn",
                      disabled: m.value <= 1,
                      title: "上一页",
                      onClick: ye
                    }, " ◀ 上一页 ", 8, jt),
                    e("button", {
                      type: "button",
                      class: "ms-page-btn",
                      disabled: m.value >= z.value,
                      title: "下一页",
                      onClick: he
                    }, " 下一页 ▶ ", 8, Kt)
                  ])
                ])) : x("", !0)
              ], 64))
            ])
          ])
        ]),
        e("footer", Jt, [
          e("img", {
            src: l(w).coverUrl || l(qe),
            alt: "",
            style: { width: "42px", height: "42px", "border-radius": "8px", "object-fit": "cover", "flex-shrink": "0" }
          }, null, 8, Yt),
          e("div", Qt, [
            e("div", Gt, [
              e("span", Xt, u(l(w).title || "暂无播放曲目"), 1),
              e("span", Zt, u(l(w).formattedCurrent) + " / " + u(l(w).formattedDuration), 1)
            ]),
            e("input", {
              type: "range",
              min: "0",
              max: "100",
              step: "0.1",
              value: l(w).progressPercent,
              onInput: Re,
              style: { width: "100%", height: "4px", "accent-color": "#f43f5e", cursor: "pointer" }
            }, null, 40, es)
          ]),
          e("div", ts, [
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[5] || (t[5] = (i) => l(W).prev()),
              title: "上一首"
            }, "⏮"),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              style: { background: "#f43f5e", color: "#fff", "border-color": "#f43f5e" },
              onClick: t[6] || (t[6] = (i) => l(W).togglePlay()),
              title: l(w).playing ? "暂停" : "播放"
            }, u(l(w).playing ? "⏸" : "▶"), 9, ss),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[7] || (t[7] = (i) => l(W).next()),
              title: "下一首"
            }, "⏭"),
            e("button", {
              type: "button",
              class: "ms-netease-logout-btn",
              onClick: t[8] || (t[8] = (i) => l(W).cycleMode()),
              title: l(w).mode
            }, u(_e.value), 9, ns)
          ])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
}), ds = /* @__PURE__ */ Be(is, [["__scopeId", "data-v-2147af0a"]]);
export {
  ds as default
};
