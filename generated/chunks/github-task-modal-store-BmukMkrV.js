import { R as Je, a as Re } from "./read-session-B_uIJVOk.js";
import { C as Ve, D as je, G as We, z as v, m as W, u as E, c as se, q as qe, R as Ze, B as Qe, v as et, F as A, r as I, g as tt, d as ae } from "./github.service-mYu1TuZI.js";
import { r as pe, d as Pe, w as P, o as ot, H as nt, f as w, g as _, u as a, t as C, j as R, C as V, D as rt, B as le, F as q, i as fe, s as K, h as f, k as B, l as Ie, n as He, T as it, b as H, x as F, J as Me } from "./vendor-vue-BbmU9NUg.js";
import { A as st } from "./AppWindowFrame-BGiK3atJ.js";
/* empty css                                                                             */
import "./window-manager.store-D9RSYghK.js";
import { u as at } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DwclBqWw.js";
import { L as ce } from "./LauncherTileContent-DDJOD3Wm.js";
import { _ as Be, t as S } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
const m = pe({
  currentTab: "stars",
  rangeText: "近 7 天",
  sinceDays: 7,
  repos: [],
  isLoading: !1,
  errorMessage: "",
  sourceText: "",
  fetchedAt: 0,
  hasLoaded: !1
}), ue = /* @__PURE__ */ new Set();
let M;
const de = new Je();
async function lt(t, c) {
  if (c.throwIfAborted(), new URL(t).origin !== "https://ghapi.h11.dev") throw new Error("Unexpected public source");
  const s = new AbortController(), d = () => s.abort();
  c.addEventListener("abort", d, { once: !0 });
  const p = setTimeout(d, 15e3);
  try {
    const u = await fetch(t, {
      signal: s.signal,
      credentials: "omit",
      redirect: "error",
      referrerPolicy: "no-referrer",
      cache: "no-store",
      headers: { Accept: "application/json" }
    });
    if (!u.ok)
      throw u.body?.cancel().catch(() => {
      }), new Error("Source unavailable");
    if (!u.body) throw new Error("Empty public source");
    const r = u.body.getReader(), i = new TextDecoder("utf-8", { fatal: !0 });
    let y = 0, g = "";
    try {
      for (; ; ) {
        s.signal.throwIfAborted();
        const b = await r.read();
        if (b.done) break;
        if (y += b.value.byteLength, y > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        g += i.decode(b.value, { stream: !0 });
      }
      return s.signal.throwIfAborted(), JSON.parse(g + i.decode());
    } finally {
      r.cancel().catch(() => {
      }), r.releaseLock();
    }
  } finally {
    clearTimeout(p), c.removeEventListener("abort", d);
  }
}
function Oe(t, c) {
  const s = t?.name || t?.repository, d = c ? t?.full_name || (typeof s == "string" && s.includes("/") ? s : t?.author && s ? `${t.author}/${s}` : "") : t?.full_name;
  if (typeof d != "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(d) || d.split("/").some((i) => i === "." || i === "..")) throw new Error("Invalid repository");
  const [p, u] = d.split("/"), r = (i) => typeof i == "number" && Number.isFinite(i) && i >= 0 ? i : void 0;
  return {
    name: u,
    full_name: d,
    owner: { login: p },
    description: typeof t.description == "string" ? t.description : "",
    language: typeof t.language == "string" ? t.language : "",
    stargazers_count: r(c ? t.stars ?? t.stargazers_count : t.stargazers_count),
    forks_count: r(c ? t.forks ?? t.forks_count : t.forks_count),
    html_url: `https://github.com/${encodeURIComponent(p)}/${encodeURIComponent(u)}`
  };
}
async function ct(t, c) {
  const s = new Date(Date.now() - t * 864e5).toISOString().slice(0, 10);
  let d = "";
  try {
    const r = await Ve(c), { data: i } = await je(`/search/repositories?q=${encodeURIComponent(`is:public created:>${s}`)}&sort=stars&order=desc&per_page=30`, { headers: r, signal: c, maxBytes: 2 * 1024 * 1024 });
    if (c.throwIfAborted(), !Array.isArray(i?.items)) throw new Error("Invalid search response");
    return {
      repos: i.items.slice(0, 30).map((y) => Oe(y, !1)),
      sourceText: `GitHub Search：UTC 日期 ${s} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${i.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (r) {
    c.throwIfAborted(), d = r instanceof We ? r.message : "主源响应格式无效。";
  }
  const p = t === 1 ? "daily" : t === 7 ? "weekly" : "monthly", u = await lt(`https://ghapi.h11.dev/repositories?since=${p}`, c);
  if (c.throwIfAborted(), !Array.isArray(u)) throw new Error("Invalid fallback response");
  return {
    repos: u.slice(0, 30).map((r) => Oe(r, !0)),
    sourceText: `GitHub Search 不可用：${d} 改用第三方 ghapi.h11.dev 的 ${p} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const so = {
  get state() {
    return m;
  },
  // View attachment permits starting reads; detaching does not cancel an
  // already requested read. Range changes still replace the old session.
  attachView(t) {
    return M = t, !t.aborted && !m.hasLoaded && !de.pending && this.refresh(), () => {
      M === t && (M = void 0);
    };
  },
  switchTab(t) {
    m.currentTab = t, this.dispatch("switch-tab", t);
  },
  async switchRange(t, c) {
    !M || M.aborted || ![1, 7, 30].includes(t) || t === m.sinceDays || (de.cancel(), Object.assign(m, {
      sinceDays: t,
      rangeText: `近 ${t} 天`,
      repos: [],
      sourceText: "",
      fetchedAt: 0,
      hasLoaded: !1,
      errorMessage: "",
      isLoading: !1
    }), this.dispatch("switch-range", { days: t, text: m.rangeText }), await this.refresh());
  },
  async refresh() {
    const t = M;
    if (!t || t.aborted || m.isLoading) return;
    const c = m.sinceDays, s = de.begin({
      timeoutMs: 45e3,
      isCurrent: () => m.sinceDays === c,
      onStop: (p) => {
        m.isLoading = !1, p === "timeout" && (m.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), d = s.current;
    if (d()) {
      m.isLoading = !0, m.errorMessage = "";
      try {
        const p = await s.wait(() => ct(c, s.signal));
        if (!d()) return;
        m.repos = p.repos, m.sourceText = p.sourceText, m.fetchedAt = Date.now(), m.hasLoaded = !0;
      } catch {
        d() && (m.errorMessage = m.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        s.finish() && (m.isLoading = !1, this.dispatch("refresh"));
      }
    }
  },
  selectRepo(t) {
    this.dispatch("select-repo", t);
  },
  onAction(t) {
    return ue.add(t), () => {
      ue.delete(t);
    };
  },
  dispatch(t, c) {
    for (const s of ue)
      try {
        s(t, c);
      } catch {
      }
  }
}, ut = 5, dt = 180;
function ht(t, c, s) {
  const d = c - t.left, p = s - t.top;
  return d > t.width * 0.25 && d < t.width * 0.75 && p > t.height * 0.25 && p < t.height * 0.75;
}
function ft(t, c, s) {
  return Math.hypot(c - (t.left + t.width / 2), s - (t.top + t.height / 2)) <= Math.max(t.width, t.height) * 0.55;
}
function j(t) {
  return {
    id: t.full_name,
    title: t.name,
    url: t.html_url || `https://github.com/${t.full_name}`,
    customIcon: t.owner?.avatar_url || "assets/github-star.svg"
  };
}
function pt(t, c, s, d, p) {
  const u = p || "默认", i = c.filter((g) => (g.section || "默认") === u).map((g) => ({
    key: `list:${g.id}`,
    kind: "folder",
    title: g.name,
    list: g,
    repos: t.filter((b) => s.get(b.full_name.toLowerCase())?.includes(g.name))
  }));
  for (const g of t)
    s.get(g.full_name.toLowerCase())?.length || i.push({ key: `repo:${g.full_name.toLowerCase()}`, kind: "repo", title: g.name, repo: g });
  const y = new Map(d.map((g, b) => [g, b]));
  return i.sort((g, b) => (y.get(g.key) ?? d.length) - (y.get(b.key) ?? d.length));
}
function Ge(t, c, s) {
  const d = t.indexOf(c), p = t.indexOf(s);
  if (d < 0 || p < 0 || d === p) return [...t];
  const u = [...t];
  return u.splice(d, 1), u.splice(p, 0, c), u;
}
function gt(t) {
  return Array.isArray(t) ? [...new Set(t.filter((c) => typeof c == "string" && c.length <= 300 && /^(list|repo):.+/.test(c)))].slice(0, 2e3) : [];
}
const vt = {
  key: 0,
  class: "gh-shortcut-status",
  role: "status"
}, mt = ["data-gh-tile", "data-gh-list-drop", "onDragover", "onDrop"], bt = ["aria-label", "title", "onContextmenu", "onClick", "onPointerdown", "onKeydown"], wt = {
  key: 1,
  class: "gh-shortcut-help"
}, yt = ["disabled"], kt = ["data-gh-list-drop"], _t = { class: "gh-shortcut-help" }, xt = { class: "gh-folder-repo-grid" }, Ct = ["title", "onContextmenu", "onClick", "onPointerdown"], Tt = {
  key: 0,
  class: "gh-shortcut-help"
}, Lt = ["aria-label"], Dt = { class: "gh-shortcut-menu-title" }, St = ["disabled"], $t = /* @__PURE__ */ Pe({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  emits: ["select"],
  setup(t, { emit: c }) {
    const s = t, d = c, p = H(null), u = H(""), r = H(""), i = H([]), y = H(""), g = H(null), b = F(() => g.value?.ownerKey === v.ownerKey ? v.repos.find((e) => e.full_name === g.value?.fullName) : void 0), ge = F(() => !!(b.value && v.repoListNames.get(b.value.full_name.toLowerCase())?.length));
    function x() {
      g.value = null;
    }
    const { menuRef: Fe, style: Ke } = at({
      visible: () => s.active && !!b.value,
      anchor: () => g.value || { x: 0, y: 0 },
      dismiss: x
    });
    function ve(e, o) {
      e.preventDefault(), e.stopPropagation(), s.active && (T(), g.value = { fullName: o.full_name, ownerKey: v.ownerKey, x: e.clientX, y: e.clientY });
    }
    function ze() {
      const e = b.value;
      !e || !ge.value || E.busy || !s.active || (x(), ee(e.full_name, "未分类"));
    }
    function Ne() {
      const e = b.value;
      x(), e && Q(e);
    }
    let z = 0, N = 0, me = Promise.resolve();
    const O = F(() => pt(v.repos, v.lists, v.repoListNames, i.value, v.activeSection)), L = F(() => O.value.find((e) => e.kind === "folder" && e.list.id === u.value)), Z = F(() => L.value?.kind === "folder" ? L.value.repos : []);
    function be(e) {
      return e.kind === "folder" ? { title: e.title, preview: e.repos.slice(0, 4).map(j), count: Math.max(e.repos.length, e.list.totalCount) } : void 0;
    }
    const Y = () => v.ownerKey ? `ghSidebarTileOrderV1:${v.ownerKey}:${v.activeSection || "default"}` : "";
    function we() {
      ++z;
      const e = Y(), o = [...i.value];
      e && (me = me.catch(() => {
      }).then(async () => {
        try {
          typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [e]: o }) : localStorage.setItem(e, JSON.stringify(o)), e === Y() && (y.value = "");
        } catch {
          e === Y() && (y.value = "顺序暂未保存，本页仍可使用。");
        }
      }));
    }
    function Q(e) {
      !s.active || Date.now() < X || (x(), u.value = "", d("select"), qe.open(e.full_name, void 0, e));
    }
    function Ye(e) {
      if (!(!s.active || Date.now() < X)) {
        if (e.kind === "repo") {
          Q(e.repo);
          return;
        }
        x(), u.value = u.value === e.list.id ? "" : e.list.id, se.select(e.title), d("select");
      }
    }
    function U(e) {
      return s.active && !E.busy && et.folders.some((o) => o.title === e && (o.kind === "custom" || o.kind === "uncategorized"));
    }
    function ee(e, o) {
      U(o) && v.repos.some((n) => n.full_name.toLowerCase() === e.toLowerCase()) && se.dropRepository(e, o);
    }
    function ye(e, o) {
      !U(o) || !Array.from(e.dataTransfer?.types || []).includes(Ze) || (e.preventDefault(), e.stopPropagation(), e.dataTransfer && (e.dataTransfer.dropEffect = "move"), r.value = o);
    }
    function ke(e, o) {
      r.value = "";
      const n = Qe(e.dataTransfer);
      !n || !U(o) || (e.preventDefault(), e.stopPropagation(), ee(n, o));
    }
    function _e(e) {
      const o = e.currentTarget;
      o instanceof Node && e.relatedTarget instanceof Node && o.contains(e.relatedTarget) || (r.value = "");
    }
    const l = pe({ visible: !1, x: 0, y: 0, offsetX: 0, offsetY: 0, tile: null });
    let k = null, X = 0, te = 0, oe = "", ne, re = null;
    function xe() {
      re?.classList.remove("gh-sidebar-pointer-drop"), re = null;
    }
    function Ce(e, o) {
      if (e.button !== 0 || !s.active || E.busy) return;
      T(), x();
      const n = e.currentTarget.getBoundingClientRect();
      k = { pointer: e.pointerId, x: e.clientX, y: e.clientY, owner: v.ownerKey, tile: o, original: [...i.value] }, l.x = e.clientX, l.y = e.clientY, l.offsetX = e.clientX - n.left, l.offsetY = e.clientY - n.top, l.tile = o, window.addEventListener("pointermove", Te, { passive: !1 }), window.addEventListener("pointerup", Le), window.addEventListener("pointercancel", T);
    }
    function Ue(e, o) {
      Ce(e, { key: `repo:${o.full_name.toLowerCase()}`, kind: "repo", title: o.name, repo: o });
    }
    function ie() {
      if (xe(), r.value = "", !k || !l.visible) return;
      const e = document.elementFromPoint(l.x, l.y), o = e?.closest("[data-gh-list-drop]"), n = o?.dataset.ghListDrop;
      if (k.tile.kind === "repo" && n && U(n) && o && (!o.hasAttribute("data-gh-tile") || ht(o.getBoundingClientRect(), l.x, l.y))) {
        r.value = n, re = o, o.classList.add("gh-sidebar-pointer-drop");
        return;
      }
      const h = e?.closest("[data-gh-tile]"), D = h?.dataset.ghTile;
      if (!D || !h || D === k.tile.key || !ft(h.getBoundingClientRect(), l.x, l.y) || D === oe || Date.now() - te < dt) return;
      const $ = O.value.map((G) => G.key);
      $.includes(k.tile.key) && (i.value = Ge($, k.tile.key, D), oe = D, te = Date.now());
    }
    function Te(e) {
      !k || e.pointerId !== k.pointer || (l.x = e.clientX, l.y = e.clientY, !(!l.visible && Math.hypot(e.clientX - k.x, e.clientY - k.y) < ut) && (e.preventDefault(), l.visible || (++z, l.visible = !0, ne = setInterval(() => {
        const n = document.elementFromPoint(l.x, l.y)?.closest(".gh-bili-folder-list, .gh-shortcut-window-content");
        if (n) {
          const h = n.getBoundingClientRect();
          l.y < h.top + 36 ? n.scrollTop -= 12 : l.y > h.bottom - 36 && (n.scrollTop += 12);
        }
        ie();
      }, 32)), ie()));
    }
    function Le(e) {
      if (!k || e.pointerId !== k.pointer) return;
      l.visible && (l.x = e.clientX, l.y = e.clientY, ie());
      const o = k, n = l.visible, h = r.value;
      if (n) {
        e.preventDefault(), X = Date.now() + 300, o.owner === v.ownerKey && h && o.tile.kind === "repo" && ee(o.tile.repo.full_name, h);
        const D = o.original.length !== i.value.length || o.original.some(($, G) => i.value[G] !== $);
        o.owner === v.ownerKey && !h && D && we();
      }
      h && (i.value = o.original), De();
    }
    function De() {
      xe(), clearInterval(ne), ne = void 0, window.removeEventListener("pointermove", Te), window.removeEventListener("pointerup", Le), window.removeEventListener("pointercancel", T), l.visible = !1, l.tile = null, k = null, r.value = "", oe = "", te = 0;
    }
    function T() {
      k && (i.value = k.original, l.visible && (X = Date.now() + 300)), De();
    }
    function Xe(e, o) {
      if (!e.altKey || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
      e.preventDefault();
      const n = O.value.map((G) => G.key), h = n.indexOf(o.key), D = e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" ? -2 : 2, $ = n[h + D];
      $ && (i.value = Ge(n, o.key, $), we());
    }
    function Se(e) {
      const o = e.target;
      !k && !p.value?.contains(o) && !o?.closest("#gh-list-shortcut-window, .gh-shortcut-context-menu") && (u.value = "");
    }
    function $e(e) {
      e.key === "Escape" && (T(), x(), u.value = "");
    }
    function Ee() {
      document.hidden && (T(), x(), u.value = "");
    }
    function J() {
      r.value = "";
    }
    P(() => [v.ownerKey, v.activeSection], async () => {
      const e = ++N;
      T(), x(), u.value = "", i.value = [], y.value = "";
      const o = Y(), n = ++z;
      if (o)
        try {
          const h = typeof chrome < "u" && chrome.storage?.local ? (await chrome.storage.local.get(o))[o] : JSON.parse(localStorage.getItem(o) || "[]");
          e === N && n === z && (i.value = gt(h));
        } catch {
          e === N && (y.value = "图标顺序读取失败，可继续操作。");
        }
    }, { immediate: !0 });
    const Ae = /* @__PURE__ */ new Set();
    return P(() => [s.active, v.ownerKey, v.loading], ([e, o, n]) => {
      !e || !o || n || Ae.has(o) || (Ae.add(o), W.ensureAllStarsLoaded());
    }, { immediate: !0 }), P(() => s.active, (e) => {
      e || (T(), x(), u.value = "");
    }), P(() => L.value, (e) => {
      e || (u.value = "");
    }), P(b, (e) => {
      e || x();
    }), ot(() => {
      window.addEventListener("pointerdown", Se), window.addEventListener("keydown", $e), window.addEventListener("blur", T), window.addEventListener("dragend", J), window.addEventListener("drop", J), document.addEventListener("visibilitychange", Ee);
    }), nt(() => {
      ++N, T(), window.removeEventListener("pointerdown", Se), window.removeEventListener("keydown", $e), window.removeEventListener("blur", T), window.removeEventListener("dragend", J), window.removeEventListener("drop", J), document.removeEventListener("visibilitychange", Ee);
    }), (e, o) => (w(), _("div", {
      ref_key: "root",
      ref: p,
      class: "gh-shortcut-sidebar"
    }, [
      a(E).message || y.value ? (w(), _("p", vt, C(a(E).message || y.value), 1)) : R("", !0),
      V(rt, {
        name: "gh-shortcut",
        tag: "div",
        class: "gh-shortcut-grid"
      }, {
        default: le(() => [
          (w(!0), _(q, null, fe(O.value, (n) => (w(), _("div", {
            key: n.key,
            class: K(["gh-shortcut-cell", { "is-dragging": l.visible && l.tile?.key === n.key, "drop-into": n.kind === "folder" && r.value === n.title }]),
            "data-gh-tile": n.key,
            "data-gh-list-drop": n.kind === "folder" ? n.title : void 0,
            onDragover: (h) => n.kind === "folder" && ye(h, n.title),
            onDragleave: _e,
            onDrop: (h) => n.kind === "folder" && ke(h, n.title)
          }, [
            f("button", {
              type: "button",
              class: "gh-shortcut-tile",
              "aria-label": n.kind === "folder" ? `打开本地分组 ${n.title}` : `查看仓库 ${n.repo.full_name}`,
              title: n.kind === "folder" ? `${n.title}（拖入将加入本地分组，保留其他归属）` : n.repo.full_name,
              onContextmenu: (h) => n.kind === "repo" && ve(h, n.repo),
              onClick: (h) => Ye(n),
              onPointerdown: (h) => Ce(h, n),
              onDragstart: o[0] || (o[0] = B(() => {
              }, ["prevent"])),
              onKeydown: (h) => Xe(h, n)
            }, [
              V(ce, {
                link: n.kind === "repo" ? a(j)(n.repo) : void 0,
                folder: be(n)
              }, null, 8, ["link", "folder"])
            ], 40, bt)
          ], 42, mt))), 128))
        ]),
        _: 1
      }),
      O.value.length ? R("", !0) : (w(), _("p", wt, C(a(v).loading ? "正在读取仓库与列表…" : "暂无本地分组或未分类仓库"), 1)),
      (w(), Ie(it, { to: "body" }, [
        L.value && t.active ? (w(), Ie(a(st), {
          key: 0,
          id: "gh-list-shortcut-window",
          "window-id": "gh-list-shortcut",
          title: L.value.title,
          icon: "📁",
          "default-width": 420,
          "default-height": 420,
          "min-width": 300,
          "min-height": 260,
          "show-minimize": !1,
          "show-maximize": !1,
          "custom-class": "gh-shortcut-folder-window",
          "custom-style": { background: "var(--panel)" },
          onClose: o[5] || (o[5] = (n) => {
            u.value = "", x();
          })
        }, {
          "header-actions": le(() => [
            f("button", {
              type: "button",
              class: "gh-folder-delete-action",
              disabled: a(E).busy,
              title: "删除本地分组（不会取消 Star）",
              onClick: o[1] || (o[1] = (n) => a(se).delete(L.value.title))
            }, "删除分组", 8, yt)
          ]),
          default: le(() => [
            f("div", {
              class: K(["gh-shortcut-window-content", { "drop-into": r.value === L.value.title }]),
              "data-gh-list-drop": L.value.title,
              onDragover: o[3] || (o[3] = (n) => ye(n, L.value.title)),
              onDragleave: _e,
              onDrop: o[4] || (o[4] = (n) => ke(n, L.value.title))
            }, [
              f("p", _t, C(Z.value.length) + " 个已加载仓库 · 可拖到其他文件夹以加入本地分组", 1),
              f("div", xt, [
                (w(!0), _(q, null, fe(Z.value, (n) => (w(), _("div", {
                  key: n.full_name,
                  class: "gh-folder-repo-cell"
                }, [
                  f("button", {
                    type: "button",
                    class: "gh-shortcut-tile",
                    title: n.full_name,
                    onContextmenu: (h) => ve(h, n),
                    onClick: (h) => Q(n),
                    onPointerdown: (h) => Ue(h, n),
                    onDragstart: o[2] || (o[2] = B(() => {
                    }, ["prevent"]))
                  }, [
                    V(ce, {
                      link: a(j)(n)
                    }, null, 8, ["link"])
                  ], 40, Ct)
                ]))), 128))
              ]),
              Z.value.length ? R("", !0) : (w(), _("p", Tt, C(a(v).loading ? "正在读取…" : "空文件夹，可拖入仓库"), 1))
            ], 42, kt)
          ]),
          _: 1
        }, 8, ["title"])) : R("", !0),
        b.value && t.active ? (w(), _("div", {
          key: 1,
          ref_key: "menuRef",
          ref: Fe,
          class: "gh-shortcut-context-menu",
          style: He(a(Ke)),
          role: "menu",
          "aria-label": b.value.full_name + " 操作",
          onPointerdown: o[6] || (o[6] = B(() => {
          }, ["stop"])),
          onClick: o[7] || (o[7] = B(() => {
          }, ["stop"])),
          onContextmenu: o[8] || (o[8] = B(() => {
          }, ["prevent"]))
        }, [
          f("div", Dt, C(b.value.full_name), 1),
          f("button", {
            type: "button",
            role: "menuitem",
            onClick: Ne
          }, "查看仓库详情"),
          f("button", {
            type: "button",
            role: "menuitem",
            disabled: a(E).busy || !ge.value,
            title: "从所有本地分组移出，保留 GitHub 收藏",
            onClick: ze
          }, "移到未分组", 8, St)
        ], 44, Lt)) : R("", !0),
        l.visible && l.tile ? (w(), _("div", {
          key: 2,
          class: "gh-shortcut-ghost gh-shortcut-tile",
          style: He({ left: `${l.x - l.offsetX}px`, top: `${l.y - l.offsetY}px` })
        }, [
          V(ce, {
            link: l.tile.kind === "repo" ? a(j)(l.tile.repo) : void 0,
            folder: be(l.tile)
          }, null, 8, ["link", "folder"])
        ], 4)) : R("", !0)
      ]))
    ], 512));
  }
}), ao = /* @__PURE__ */ Be($t, [["__scopeId", "data-v-5b72c353"]]), Et = { class: "gh-hero-left" }, At = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, Rt = { key: 0 }, It = { key: 1 }, Ht = {
  key: 2,
  class: "fo-folder-icon"
}, Mt = { class: "gh-bili-heading" }, Ot = { class: "gh-hero-title-row" }, Gt = ["title"], Pt = {
  class: "gh-hero-sections-tabs",
  role: "tablist",
  "aria-label": "收藏大分组标签"
}, Bt = ["title", "onClick", "onContextmenu"], Ft = ["role", "aria-live"], Kt = ["title"], zt = ["title", "aria-label"], Nt = { id: "gh-hero-desc" }, Yt = { class: "gh-hero-search-area" }, Ut = { class: "gh-bili-actions" }, Xt = ["title"], Jt = { class: "gh-batch-btn-text" }, Vt = ["title"], jt = ["title"], Wt = /* @__PURE__ */ Pe({
  __name: "GitHubHero",
  emits: ["open-ai-settings", "open-guide"],
  setup(t, { emit: c }) {
    const s = c;
    async function d() {
      let u;
      try {
        u = await Re.prompt({
          title: "新建分组标签",
          message: "创建一个新的顶层分组标签（类似常用网站的分区）：",
          placeholder: "分组名称（如：工作区、AI、工具）…"
        });
      } catch {
        return;
      }
      const r = u?.trim();
      r && await W.createSection(r);
    }
    async function p(u, r) {
      if (u.preventDefault(), u.stopPropagation(), r === "默认" && v.sections.length === 1) return;
      await Re.confirm({
        title: "删除分组标签",
        message: `确定删除分组标签「${r}」吗？里面的文件夹会自动合并至默认分组，仓库不会丢失。`,
        danger: !0
      }) && await W.deleteSection(r);
    }
    return (u, r) => (w(), _(q, null, [
      f("div", Et, [
        f("div", At, [
          a(A).kind === "all" ? (w(), _("span", Rt, "⭐")) : a(A).kind === "uncategorized" ? (w(), _("span", It, "📄")) : (w(), _("i", Ht))
        ]),
        f("div", Mt, [
          f("div", Ot, [
            f("h3", {
              id: "gh-hero-title",
              title: a(A).title
            }, C(a(A).title), 9, Gt),
            f("div", Pt, [
              (w(!0), _(q, null, fe(a(v).sections, (i) => (w(), _("button", {
                key: i,
                type: "button",
                class: K(["gh-section-tab", { active: i === a(v).activeSection }]),
                title: `切换到分组「${i}」；右键可删除此标签`,
                onClick: (y) => a(W).switchSection(i),
                onContextmenu: (y) => p(y, i)
              }, C(i), 43, Bt))), 128)),
              f("button", {
                type: "button",
                class: "gh-section-add-btn",
                title: "添加新分组标签",
                "aria-label": "添加新分组标签",
                onClick: d
              }, " ＋ ")
            ]),
            a(I).actionText ? (w(), _("div", {
              key: 0,
              class: K(["gh-hero-inline-status", { "is-error": a(I).actionError }]),
              role: a(I).actionError ? "alert" : "status",
              "aria-live": a(I).actionError ? "assertive" : "polite",
              "aria-atomic": "true"
            }, [
              f("span", {
                class: "gh-hero-status-text",
                title: a(I).actionText
              }, C(a(I).actionText), 9, Kt),
              f("button", {
                type: "button",
                title: a(S)("github.hero.closeTip"),
                "aria-label": a(S)("github.hero.closeTip"),
                onClick: r[0] || (r[0] = (i) => a(tt).update({ actionText: "", actionError: !1 }))
              }, "×", 8, zt)
            ], 10, Ft)) : R("", !0)
          ]),
          f("p", Nt, C(a(A).description), 1)
        ])
      ]),
      f("div", Yt, [
        Me(u.$slots, "search", {}, void 0, !0)
      ]),
      f("div", Ut, [
        Me(u.$slots, "actions-prefix", {}, void 0, !0),
        f("button", {
          type: "button",
          class: "gh-hero-btn gh-github-help-btn",
          title: "GitHub 使用手册",
          "aria-label": "打开 GitHub 使用手册",
          onClick: r[1] || (r[1] = (i) => s("open-guide"))
        }, "?"),
        f("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: K(["gh-hero-btn gh-batch-toggle-btn", { active: a(A).batchMode }]),
          title: a(S)("github.hero.batchToggle"),
          onClick: r[2] || (r[2] = (i) => a(ae).toggleBatch())
        }, [
          r[5] || (r[5] = f("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          f("span", Jt, C(a(A).batchMode ? a(S)("github.hero.batchBack") : a(S)("github.hero.batch")), 1)
        ], 10, Xt),
        f("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: a(S)("github.hero.refreshTitle"),
          onClick: r[3] || (r[3] = (i) => a(ae).refresh())
        }, C(a(S)("github.hero.refresh")), 9, Vt),
        f("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          title: a(S)("github.hero.addFolderTitle"),
          onClick: r[4] || (r[4] = (i) => a(ae).createFolder())
        }, C(a(S)("github.hero.addFolder")), 9, jt)
      ])
    ], 64));
  }
}), lo = /* @__PURE__ */ Be(Wt, [["__scopeId", "data-v-2869cb71"]]), he = pe({
  isOpen: !1,
  repository: null
}), co = {
  open(t) {
    he.repository = t, he.isOpen = !0;
  },
  close() {
    he.isOpen = !1;
  }
};
export {
  ao as G,
  ut as T,
  ft as a,
  dt as b,
  co as c,
  lo as d,
  m as e,
  he as f,
  so as g,
  ht as i
};
