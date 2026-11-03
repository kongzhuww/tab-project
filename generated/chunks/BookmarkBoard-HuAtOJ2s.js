import { d as Pe, o as y, e as ne, f as Me, g as x, F as de, j as he, k as $, C as ce, E as ee, m as Te, K as Je, M as qe, O as ae, b as P, D as Qe, z as Ze, h as Z, u as E, t as re, n as et, s as tt, i as A, l as De, B as ot, G as ze, y as O } from "./vendor-vue-dDCd4-uG.js";
import { L as fe, T as rt, p as nt, q as at, r as it } from "./main-C_dcpCRk.js";
import { _ as $e } from "./_plugin-vue_export-helper-CRVO6deU.js";
const lt = ["href", "title", "data-bookmark-node", "onPointerdown", "onClick", "onContextmenu"], st = ["data-bookmark-node", "title", "onPointerdown", "onClick", "onKeydown", "onContextmenu"], ut = /* @__PURE__ */ Pe({
  __name: "BookmarkTiles",
  props: {
    items: {},
    folderId: {},
    busy: { type: Boolean },
    draggedId: {},
    overFolder: {},
    sizes: {},
    ghost: { type: Boolean, default: !1 }
  },
  emits: ["pointerDown", "activate", "menu"],
  setup(e, { emit: i }) {
    const a = i;
    function v(u) {
      try {
        const s = new URL(u);
        return ["http:", "https:", "ftp:", "file:"].includes(s.protocol) ? u : void 0;
      } catch {
        return;
      }
    }
    return (u, s) => (y(), ne(Je, {
      key: e.folderId,
      tag: "div",
      class: "launcher-items launcher-site-items bookmark-tiles",
      "data-bookmark-grid": e.folderId,
      name: e.draggedId ? "launcher-grid" : "",
      css: !!e.draggedId
    }, {
      default: Me(() => [
        (y(!0), x(de, null, he(e.items, (n) => (y(), x(de, {
          key: n.id
        }, [
          n.kind === "link" ? (y(), x("a", {
            key: 0,
            class: ce(["launcher-link", { "is-dragging": !e.ghost && e.draggedId === n.id }]),
            href: v(n.url),
            title: `${n.title}
${n.url}`,
            target: "_blank",
            rel: "noopener noreferrer",
            "data-bookmark-node": n.id,
            draggable: "false",
            onDragstart: s[0] || (s[0] = $(() => {
            }, ["prevent"])),
            onPointerdown: (l) => a("pointerDown", n, l),
            onClick: (l) => a("activate", n, l),
            onContextmenu: $((l) => a("menu", n, l), ["prevent", "stop"])
          }, [
            ee(fe, { link: n }, null, 8, ["link"])
          ], 42, lt)) : (y(), x("div", {
            key: 1,
            role: "button",
            tabindex: "0",
            class: ce(["launcher-folder", [`size-${e.sizes[n.id] || "small"}`, { "is-dragging": !e.ghost && e.draggedId === n.id, "drop-target": e.overFolder === n.id }]]),
            "data-bookmark-node": n.id,
            title: `${n.path}
${n.count} 个书签；拖动排序，右键管理`,
            draggable: "false",
            onDragstart: s[1] || (s[1] = $(() => {
            }, ["prevent"])),
            onPointerdown: (l) => a("pointerDown", n, l),
            onClick: (l) => a("activate", n, l),
            onKeydown: [
              Te($((l) => a("activate", n, l), ["prevent"]), ["enter"]),
              Te($((l) => a("activate", n, l), ["prevent"]), ["space"])
            ],
            onContextmenu: $((l) => a("menu", n, l), ["prevent", "stop"])
          }, [
            ee(fe, {
              folder: n,
              size: e.sizes[n.id] || "small"
            }, null, 8, ["folder", "size"])
          ], 42, st))
        ], 64))), 128))
      ]),
      _: 1
    }, 8, ["data-bookmark-grid", "name", "css"]));
  }
}), Fe = /* @__PURE__ */ $e(ut, [["__scopeId", "data-v-35bd027d"]]);
function dt(e) {
  const i = P(""), a = P(""), v = ae({}), u = ae(null);
  let s = null, n = null, l = 0, c = 0, h = 0, m = 0, R = 0, f = 0, g = !1, b = 0, X = "", W = 0, S = null, w = !1, _ = null;
  function G() {
    window.removeEventListener("pointermove", Y), window.removeEventListener("pointerup", N), window.removeEventListener("pointercancel", C), window.removeEventListener("blur", C), window.removeEventListener("keydown", q, !0), window.removeEventListener("pagehide", C), document.removeEventListener("visibilitychange", te);
    try {
      _ && n !== null && _.releasePointerCapture(n);
    } catch {
    }
    _ = null;
  }
  function C() {
    g && (b = Date.now() + 600), G(), s = null, n = null, g = !1, S = null, i.value = "", a.value = "", v.value = {}, u.value = null, X = "", W = 0;
  }
  function q(k) {
    k.key === "Escape" && (k.preventDefault(), k.stopImmediatePropagation(), C());
  }
  function te() {
    document.hidden && C();
  }
  function ie(k, d) {
    if (d.button !== 0 || !d.isPrimary || !e.enabled() || e.beforeStart?.() === !1) return;
    C(), s = k, n = d.pointerId, l = d.clientX, c = d.clientY, _ = d.currentTarget;
    const L = _.getBoundingClientRect();
    h = d.clientX - L.left, m = d.clientY - L.top, R = L.width, f = L.height;
    try {
      _.setPointerCapture(d.pointerId);
    } catch {
    }
    window.addEventListener("pointermove", Y, { passive: !1 }), window.addEventListener("pointerup", N), window.addEventListener("pointercancel", C), window.addEventListener("blur", C), window.addEventListener("keydown", q, !0), window.addEventListener("pagehide", C), document.addEventListener("visibilitychange", te);
  }
  function Y(k) {
    if (!s || k.pointerId !== n) return;
    if (!e.enabled()) {
      C();
      return;
    }
    if (!g && Math.hypot(k.clientX - l, k.clientY - c) <= rt) return;
    k.preventDefault(), g = !0, i.value = s.id, u.value = { item: s, x: k.clientX - h, y: k.clientY - m, width: R, height: f };
    const d = e.hit(k.clientX, k.clientY);
    if (!d) {
      S = null, a.value = "";
      return;
    }
    const L = d.element.getBoundingClientRect(), oe = nt(L, k.clientX, k.clientY), K = d.item && d.item.id !== s.id && e.isFolder(d.item) && oe && e.accepts(s, d.item.id);
    if (d.container || K) {
      const B = K ? d.item.id : d.parentId;
      if (!e.accepts(s, B)) {
        S = null, a.value = "";
        return;
      }
      S = B, w = !0, a.value = B;
      return;
    }
    if (!e.accepts(s, d.parentId)) {
      S = null, a.value = "";
      return;
    }
    a.value = "", S = d.parentId, w = !1;
    const V = e.parentOf(s), F = [...v.value[d.parentId] || e.items(d.parentId)], I = F.findIndex((B) => B.id === s.id), j = d.item ? F.findIndex((B) => B.id === d.item.id) : -1;
    if (d.item && d.item.id !== s.id) {
      if (!at(L, k.clientX, k.clientY)) return;
      const B = d.parentId + ":" + d.item.id, D = Date.now();
      if (B === X && D - W < it || j < 0 || I === j) return;
      I >= 0 && F.splice(I, 1), F.splice(j, 0, s), X = B, W = D;
    } else if (I < 0) F.push(s);
    else return;
    v.value = {
      ...V === d.parentId ? {} : { [V]: e.items(V).filter((B) => B.id !== s.id) },
      [d.parentId]: F
    };
  }
  async function N(k) {
    if (k.pointerId !== n) return;
    g && Y(k);
    const d = s, L = S, oe = g && !!d && !!L && e.enabled(), K = L && !w ? v.value[L] : void 0, V = d && K ? K.findIndex((D) => D.id === d.id) + 1 : 0, F = K && V > 0 ? K[V]?.id : void 0, I = w ? L !== (d && e.parentOf(d)) : !!K, j = v.value, B = !w && !F;
    if (C(), oe && I) {
      v.value = j;
      try {
        await e.commit(d, L, F, B);
      } finally {
        v.value = {};
      }
    } else
      v.value = {};
  }
  function U() {
    return g || Date.now() < b;
  }
  return qe(C), { start: ie, cancel: C, activeId: i, overFolder: a, previews: v, ghost: u, suppressClick: U };
}
function Re(e) {
  return "bookmarkBoardIcon:" + e;
}
function ct(e) {
  try {
    return localStorage.getItem(Re(e)) || "";
  } catch {
    return "";
  }
}
function Ue(e) {
  try {
    localStorage.removeItem(Re(e));
  } catch {
  }
}
function ft(e) {
  const i = /* @__PURE__ */ new Map();
  function a(u, s) {
    const n = u.title || "未命名文件夹", l = [...s, n], c = {
      kind: "folder",
      id: u.id,
      parentId: u.parentId,
      title: n,
      path: l.join(" / "),
      items: [],
      preview: [],
      count: 0
    };
    i.set(u.id, c);
    for (const h of u.children || [])
      if (h.url) {
        const m = {
          kind: "link",
          id: h.id,
          parentId: u.id,
          title: h.title || h.url,
          url: h.url,
          customIcon: ct(h.id)
        };
        c.items.push(m), c.count++, c.preview.length < 9 && c.preview.push(m);
      } else {
        const m = a(h, l);
        c.items.push(m), c.count += m.count, c.preview.push(...m.preview.slice(0, 9 - c.preview.length));
      }
    return c;
  }
  const v = [];
  for (const u of e) for (const s of u.children || []) {
    if (s.url) continue;
    const n = (s.title || "").replace(/[\s_-]/g, "").toLowerCase();
    if (/^(?:工作区|工作區|工作空间|工作空間|(?:microsoft)?edge工作区|(?:microsoft)?edgeworkspaces?|workspaces?)$/.test(n)) continue;
    const l = a(s, []);
    if (!l.items.length) continue;
    const c = l.items.filter((m) => m.kind === "folder"), h = l.items.filter((m) => m.kind === "link");
    if (h.length) {
      const m = { ...l, title: c.length ? "未分组书签" : l.title, items: h };
      i.set(l.id, m), c.unshift(m);
    }
    v.push({ id: s.id, title: l.title, sections: c });
  }
  return { sources: v, folders: i };
}
function z(e) {
  return new Promise((i, a) => {
    const v = setTimeout(() => a(new Error("书签操作结果未确认，请刷新核对，不要重复提交。")), 1e4);
    try {
      e((u) => {
        const s = !!chrome.runtime?.lastError;
        clearTimeout(v), s ? a(new Error("浏览器书签操作失败，请刷新核对。")) : i(u);
      });
    } catch {
      clearTimeout(v), a(new Error("浏览器书签接口不可用。"));
    }
  });
}
function vt() {
  return typeof chrome > "u" || !chrome.bookmarks?.getTree ? Promise.reject(new Error("当前页面无法读取浏览器书签，请在扩展新标签页打开。")) : z((e) => chrome.bookmarks.getTree(e));
}
async function mt(e, i, a, v = !1, u) {
  const s = await z((f) => chrome.bookmarks.get(e, f)), n = await z((f) => chrome.bookmarks.get(i, f)), l = s[0];
  if (!l?.parentId || l.parentId === "0" || !n[0] || n[0].url || i === "0") throw new Error("书签或目标文件夹已变化，或是浏览器固定目录，请刷新后再移动。");
  if (u && l.parentId !== u) throw new Error("该节点已被其他页面移动，请刷新核对后再操作。");
  if (!l.url) {
    let f = n[0];
    const g = /* @__PURE__ */ new Set();
    for (; f; ) {
      if (f.id === e) throw new Error("不能把文件夹移入自身或子文件夹。");
      if (!f.parentId) break;
      if (g.has(f.id)) throw new Error("目录结构异常，请刷新核对。");
      g.add(f.id), f = (await z((b) => chrome.bookmarks.get(f.parentId, b)))[0];
    }
  }
  let c;
  if (a) {
    if (a === e) return;
    const f = (await z((g) => chrome.bookmarks.get(a, g)))[0];
    if (!f || f.parentId !== i || f.index === void 0) throw new Error("目标书签已变化，请刷新后再移动。");
    c = f.index, l.parentId === i && l.index !== void 0 && l.index < c && c--;
  } else if (l.parentId === i) {
    if (!v) return;
    const f = await z((g) => chrome.bookmarks.getChildren(i, g));
    if (c = Math.max(0, f.length - 1), l.index === c) return;
  }
  const h = await z((f) => chrome.bookmarks.move(e, { parentId: i, ...c === void 0 ? {} : { index: c } }, f));
  if (h?.id !== e || h.parentId !== i) throw new Error("移动结果未确认，请刷新核对，不要重复提交。");
  const m = await z((f) => chrome.bookmarks.getChildren(i, f)), R = m.findIndex((f) => f.id === e);
  if (R < 0 || (a ? m[R + 1]?.id !== a : R !== m.length - 1))
    throw new Error("书签排列结果未确认，请刷新核对，不要重复提交。");
}
function kt(e) {
  if (typeof chrome > "u" || !chrome.bookmarks) return () => {
  };
  const i = [
    chrome.bookmarks.onCreated,
    chrome.bookmarks.onRemoved,
    chrome.bookmarks.onChanged,
    chrome.bookmarks.onMoved,
    chrome.bookmarks.onChildrenReordered,
    chrome.bookmarks.onImportEnded
  ];
  for (const a of i) a?.addListener(e);
  return () => {
    for (const a of i) a?.removeListener(e);
  };
}
function ve(e) {
  const i = e.trim();
  if (!i || i.length > 100) throw new Error("名称不能为空，且最多100个字符。");
  return i;
}
function Oe(e) {
  const i = e.trim();
  try {
    const a = new URL(i);
    if (!["http:", "https:"].includes(a.protocol) || a.username || a.password) throw new Error();
  } catch {
    throw new Error("请填写不含账号密码的 HTTP(S) 网址。");
  }
  return i;
}
async function Xe(e) {
  const i = (await z((a) => chrome.bookmarks.get(e, a)))[0];
  if (!i?.parentId || i.parentId === "0") throw new Error("浏览器固定目录不能修改。");
  return i;
}
async function pt(e, i, a) {
  const v = i === "title" ? ve(a) : Oe(a), u = await Xe(e.id), s = i === "title" ? u.title || u.url || "未命名文件夹" : u.url, n = i === "title" ? e.title : e.kind === "link" ? e.url : void 0;
  if (s !== n || i === "url" && !u.url) throw new Error("该字段已在其他页面修改，请刷新核对后再编辑。");
  const l = await z((c) => chrome.bookmarks.update(e.id, { [i]: v }, c));
  if (l?.id !== e.id || l[i] !== v) throw new Error("保存结果未确认，请刷新核对，不要重复提交。");
  return v;
}
function Ye(e) {
  return JSON.stringify(e.kind === "link" ? [e.id, e.title, e.url] : [e.id, e.title, e.items.map(Ye)]);
}
function Ne(e) {
  return JSON.stringify(e.url ? [e.id, e.title || e.url, e.url] : [e.id, e.title || "未命名文件夹", (e.children || []).map(Ne)]);
}
async function ht(e) {
  const i = await Xe(e.id), a = (await z((u) => chrome.bookmarks.getSubTree(e.id, u)))[0];
  if (!a || Ye(e) !== Ne(a)) throw new Error("书签内容已变化，已拒绝删除，请刷新核对后重新确认。");
  if (await z((u) => e.kind === "folder" ? chrome.bookmarks.removeTree(e.id, u) : chrome.bookmarks.remove(e.id, u)), (await z((u) => chrome.bookmarks.getChildren(i.parentId, u))).some((u) => u.id === e.id)) throw new Error("删除结果未确认，请刷新核对，不要重复提交。");
  e.kind === "link" && Ue(e.id);
}
async function gt(e, i) {
  const a = ve(i), v = (await z((s) => chrome.bookmarks.get(e, s)))[0];
  if (!v || v.url || e === "0") throw new Error("无法在该位置创建文件夹，请刷新核对。");
  const u = await z((s) => chrome.bookmarks.create({ parentId: e, title: a }, s));
  if (!u?.id || u.parentId !== e || u.title !== a) throw new Error("创建结果未确认，请刷新核对，不要重复提交。");
  return a;
}
const bt = {
  class: "launcher-page-tabs bookmark-section-tabs",
  "aria-label": "书签板块",
  role: "tablist"
}, wt = ["data-bookmark-section", "aria-selected", "disabled", "title", "onClick", "onContextmenu"], yt = { class: "bookmark-board-tools" }, It = ["disabled"], Ct = ["value"], Et = ["disabled"], Bt = {
  key: 0,
  class: "bookmark-board-status",
  role: "status"
}, xt = ["data-bookmark-drop", "aria-busy"], St = {
  key: 1,
  class: "bookmark-board-empty"
}, Lt = ["data-bookmark-drop"], Tt = {
  key: 1,
  class: "bookmark-board-empty"
}, Dt = {
  key: 1,
  class: "launcher-link"
}, zt = /* @__PURE__ */ Pe({
  __name: "BookmarkBoard",
  props: {
    headerTarget: {}
  },
  emits: ["busy"],
  setup(e, { emit: i }) {
    const a = ze(() => import("./BookmarkFolderDialog-DmscvFF7.js")), v = ze(() => import("./BookmarkBoardMenu-9D2GHmLT.js")), u = e, s = i, n = ae({ sources: [], folders: /* @__PURE__ */ new Map() }), l = P(""), c = P(""), h = P(""), m = P(60), R = P(60), f = P(!1), g = P(!1), b = P(!1), X = P(""), W = P(""), S = ae({}), w = ae(null), _ = P(null);
    let G = 0, C = !0, q, te = () => {
    };
    const ie = O(() => n.value.sources.find((t) => t.id === l.value)), Y = O(() => ie.value?.sections || []), N = O(() => Y.value.find((t) => t.id === c.value)), U = O(() => n.value.folders.get(h.value)), k = O(() => X.value || (g.value && !n.value.sources.length ? "正在读取书签…" : W.value)), d = O(() => b.value || g.value || f.value);
    function L(t, o) {
      if (!o || o === "0" || !n.value.folders.has(o) || !t.parentId || t.parentId === "0") return !1;
      if (t.kind === "link") return !0;
      const r = /* @__PURE__ */ new Set();
      for (let p = n.value.folders.get(o); p; p = p.parentId ? n.value.folders.get(p.parentId) : void 0) {
        if (p.id === t.id || r.has(p.id)) return !1;
        r.add(p.id);
      }
      return !0;
    }
    const oe = O(() => {
      const t = new Map(n.value.folders);
      for (const o of n.value.folders.values()) for (const r of o.items) t.set(r.id, r);
      return t;
    });
    function K(t) {
      return oe.value.get(t);
    }
    function V(t, o) {
      const r = document.elementsFromPoint(t, o);
      if (r.some((M) => M.closest(".bookmark-board-menu"))) return null;
      const p = r.map((M) => M.closest("[data-bookmark-section]")).find(Boolean);
      if (p) return { parentId: p.dataset.bookmarkSection, element: p, container: !0 };
      const H = r.map((M) => M.closest("[data-bookmark-node]")).find(Boolean), T = H?.closest("[data-bookmark-grid]") || r.map((M) => M.closest("[data-bookmark-grid], [data-bookmark-drop]")).find(Boolean);
      return T ? { parentId: T.dataset.bookmarkGrid || T.dataset.bookmarkDrop, element: H || T, item: H ? K(H.dataset.bookmarkNode) : void 0 } : null;
    }
    function F() {
      return b.value || w.value && _.value?.canDismiss === !1 ? !1 : (w.value = null, !0);
    }
    const I = dt({
      enabled: () => !d.value,
      parentOf: (t) => t.parentId || "",
      items: (t) => n.value.folders.get(t)?.items || [],
      isFolder: (t) => t.kind === "folder",
      accepts: L,
      hit: V,
      beforeStart: F,
      commit: async (t, o, r, p) => {
        try {
          await Se(t, o, r, p);
        } catch {
        }
      }
    }), j = I.activeId, B = I.overFolder, D = I.ghost, ge = I.previews, Q = P(""), le = O(() => N.value ? ge.value[N.value.id] || N.value.items : []), me = O(() => {
      if (!U.value) return [];
      const t = ge.value[U.value.id] || U.value.items, o = Q.value.trim().toLowerCase();
      return o ? t.filter((r) => (r.title || "").toLowerCase().includes(o) || r.kind === "link" && (r.url || "").toLowerCase().includes(o)) : t;
    }), Ke = O(() => {
      const t = w.value?.item;
      return t ? Y.value.filter((o) => o.id !== t.parentId && L(t, o.id)).map((o) => ({ id: o.id, title: o.title, disabled: !1 })) : [];
    }), We = O(() => {
      const t = w.value?.item?.parentId ? n.value.folders.get(w.value.item.parentId) : void 0;
      return t?.parentId && t.parentId !== "0" ? t.parentId : void 0;
    });
    function be(t) {
      b.value || !F() || (I.cancel(), c.value = t, h.value = "", Q.value = "", m.value = 60);
    }
    function _e() {
      be(ie.value?.sections[0]?.id || Y.value[0]?.id || "");
    }
    function we(t) {
      b.value || !F() || (I.cancel(), h.value = t.id, Q.value = "", R.value = 60);
    }
    function ye() {
      !b.value && !w.value && (I.cancel(), h.value = "", Q.value = "");
    }
    function je() {
      Q.value = "";
      const t = U.value?.parentId, o = t ? n.value.folders.get(t) : void 0;
      !o || o.id === c.value ? ye() : we(o);
    }
    function Ie(t, o) {
      if (I.suppressClick() || b.value) {
        o.preventDefault();
        return;
      }
      if (t.kind === "folder") {
        we(t);
        return;
      }
      try {
        if (["http:", "https:", "ftp:", "file:"].includes(new URL(t.url).protocol)) return;
      } catch {
      }
      o.preventDefault(), W.value = "该书签网址无效，请右键编辑。";
    }
    function ke(t, o, r, p = !1) {
      r.preventDefault(), r.stopPropagation(), !(b.value || !F()) && (I.cancel(), !(t && (!t.parentId || t.parentId === "0")) && (w.value = { item: t, parentId: o, x: r.clientX, y: r.clientY, section: p }));
    }
    function Ce(t, o) {
      o.target.closest("[data-bookmark-node], button, input, .launcher-folder-title-box") || !t || t === "0" || !n.value.folders.has(t) || ke(void 0, t, o);
    }
    function Ee(t, o) {
      ke(t, t.parentId || "", o);
    }
    function Ae(t) {
      const o = S.value[t] === "large" ? "small" : "large";
      try {
        o === "large" ? localStorage.setItem("bookmarkBoardFolderSize:" + t, "large") : localStorage.removeItem("bookmarkBoardFolderSize:" + t), S.value = { ...S.value, [t]: o };
      } catch {
        W.value = "文件夹大小保存失败。";
      }
    }
    async function se() {
      await Be();
    }
    async function Be(t = !1) {
      if (b.value) return;
      t || I.cancel();
      const o = ++G;
      g.value = !0, X.value = "";
      try {
        const r = await vt();
        if (C && o === G) {
          n.value = ft(r), n.value.sources.some((T) => T.id === l.value) || (l.value = n.value.sources.find((T) => T.id === "1")?.id || n.value.sources[0]?.id || ""), Y.value.some((T) => T.id === c.value) || (c.value = Y.value[0]?.id || "", h.value = ""), n.value.folders.has(h.value) || (h.value = "");
          const p = {}, H = new Set(n.value.folders.keys());
          for (const T of H)
            try {
              localStorage.getItem("bookmarkBoardFolderSize:" + T) === "large" && (p[T] = "large");
            } catch {
            }
          S.value = p, f.value = !1;
          try {
            const T = new Set(H);
            for (const M of n.value.folders.values())
              for (const J of M.items) T.add(J.id);
            for (let M = localStorage.length - 1; M >= 0; M--) {
              const J = localStorage.key(M);
              if (J?.startsWith("bookmarkBoardFolderSize:")) {
                const pe = J.slice(24);
                H.has(pe) || localStorage.removeItem(J);
              } else if (J?.startsWith("bookmarkBoardIcon:")) {
                const pe = J.slice(18);
                T.has(pe) || localStorage.removeItem(J);
              }
            }
          } catch {
          }
        }
      } catch (r) {
        C && o === G && (X.value = r instanceof Error ? r.message : "书签读取失败。", t && (f.value = !0));
      } finally {
        C && o === G && (g.value = !1);
      }
    }
    function xe() {
      b.value || f.value || (clearTimeout(q), q = setTimeout(() => {
        j.value ? xe() : se();
      }, 180));
    }
    async function ue(t, o = !1) {
      if (d.value) throw new Error("正在操作或结果未确认，请刷新核对后再操作。");
      o || I.cancel(), clearTimeout(q), ++G, g.value = !1, b.value = !0, s("busy", !0), X.value = "", W.value = "";
      try {
        return await t();
      } catch (r) {
        throw C && (f.value = !0, W.value = "", X.value = r instanceof Error ? r.message : "保存失败，请刷新核对。"), r;
      } finally {
        b.value = !1, s("busy", !1), C && !f.value && await Be(o);
      }
    }
    function Se(t, o, r, p) {
      return L(t, o) ? ue(() => mt(t.id, o, r, p, t.parentId), !0) : Promise.reject(new Error("不能移入自身、子文件夹或浏览器固定根目录。"));
    }
    function Ge(t, o, r) {
      try {
        r = o === "title" ? ve(r) : Oe(r);
      } catch (p) {
        return Promise.reject(p);
      }
      return ue(() => pt(t, o, r));
    }
    function Le(t) {
      for (const o of t.items)
        o.kind === "link" ? Ue(o.id) : Le(o);
    }
    function Ve(t, o) {
      try {
        o = ve(o);
      } catch (r) {
        return Promise.reject(r);
      }
      return ue(() => gt(t, o));
    }
    function He(t) {
      return ue(async () => {
        await ht(t), t.kind === "folder" && Le(t);
      });
    }
    return Qe(() => {
      te = kt(xe), se();
    }), Ze(() => {
      C = !1, ++G, te(), clearTimeout(q), I.cancel();
    }), (t, o) => (y(), x("div", {
      class: "bookmark-board",
      onPointerdown: o[9] || (o[9] = $(() => {
      }, ["stop"])),
      onContextmenu: o[10] || (o[10] = $(() => {
      }, ["stop"])),
      onWheel: o[11] || (o[11] = $(() => {
      }, ["stop"]))
    }, [
      (y(), ne(De, {
        to: u.headerTarget
      }, [
        Z("div", {
          class: "bookmark-board-head",
          onPointerdown: o[1] || (o[1] = $(() => {
          }, ["stop"])),
          onContextmenu: o[2] || (o[2] = $(() => {
          }, ["stop"]))
        }, [
          Z("nav", bt, [
            (y(!0), x(de, null, he(Y.value, (r) => (y(), x("button", {
              key: r.id,
              "data-bookmark-section": r.id,
              type: "button",
              role: "tab",
              class: ce(["launcher-page-tab", { active: c.value === r.id, "drop-target": E(B) === r.id }]),
              "aria-selected": c.value === r.id,
              "aria-controls": "bookmark-section-panel",
              disabled: b.value,
              title: r.title,
              onClick: (p) => be(r.id),
              onContextmenu: $((p) => ke(r, r.parentId || "", p, !0), ["prevent"])
            }, re(r.title), 43, wt))), 128))
          ]),
          Z("div", yt, [
            n.value.sources.length > 1 ? et((y(), x("select", {
              key: 0,
              "onUpdate:modelValue": o[0] || (o[0] = (r) => l.value = r),
              disabled: b.value || !!w.value,
              "aria-label": "书签来源",
              onChange: _e
            }, [
              (y(!0), x(de, null, he(n.value.sources, (r) => (y(), x("option", {
                key: r.id,
                value: r.id
              }, re(r.title), 9, Ct))), 128))
            ], 40, It)), [
              [tt, l.value]
            ]) : A("", !0),
            Z("button", {
              type: "button",
              disabled: g.value || b.value,
              title: "刷新书签",
              "aria-label": "刷新书签",
              onClick: se
            }, "↻", 8, Et)
          ])
        ], 32)
      ], 8, ["to"])),
      k.value ? (y(), x("span", Bt, re(k.value), 1)) : A("", !0),
      Z("div", {
        id: "bookmark-section-panel",
        class: "launcher-page-panel bookmark-board-content",
        role: "tabpanel",
        "data-bookmark-drop": N.value?.id,
        "aria-busy": g.value || b.value,
        onContextmenu: o[4] || (o[4] = (r) => N.value && Ce(N.value.id, r))
      }, [
        ee(Fe, {
          items: le.value.slice(0, m.value),
          "folder-id": N.value?.id || "",
          busy: b.value,
          "dragged-id": E(j),
          "over-folder": E(B),
          sizes: S.value,
          onPointerDown: E(I).start,
          onActivate: Ie,
          onMenu: Ee
        }, null, 8, ["items", "folder-id", "busy", "dragged-id", "over-folder", "sizes", "onPointerDown"]),
        le.value.length > m.value ? (y(), x("button", {
          key: 0,
          class: "bookmark-board-more",
          type: "button",
          onClick: o[3] || (o[3] = (r) => m.value += 60)
        }, "显示更多（剩余 " + re(le.value.length - m.value) + "）", 1)) : A("", !0),
        !g.value && !le.value.length ? (y(), x("p", St, re(X.value ? "书签读取失败，请刷新核对" : "暂无书签，右键创建文件夹或拖入网站"), 1)) : A("", !0)
      ], 40, xt),
      U.value ? (y(), ne(E(a), {
        key: 1,
        filter: Q.value,
        "onUpdate:filter": o[7] || (o[7] = (r) => Q.value = r),
        folder: U.value,
        busy: b.value || !!w.value,
        status: k.value,
        onClose: ye,
        onUp: je
      }, {
        default: Me(() => [
          Z("div", {
            class: "bookmark-folder-drop-area",
            "data-bookmark-drop": U.value.id,
            onContextmenu: o[6] || (o[6] = (r) => Ce(U.value.id, r))
          }, [
            ee(Fe, {
              items: me.value.slice(0, R.value),
              "folder-id": U.value.id,
              busy: b.value,
              "dragged-id": E(j),
              "over-folder": E(B),
              sizes: S.value,
              onPointerDown: E(I).start,
              onActivate: Ie,
              onMenu: Ee
            }, null, 8, ["items", "folder-id", "busy", "dragged-id", "over-folder", "sizes", "onPointerDown"]),
            me.value.length > R.value ? (y(), x("button", {
              key: 0,
              class: "bookmark-board-more",
              type: "button",
              onClick: o[5] || (o[5] = (r) => R.value += 60)
            }, "显示更多")) : A("", !0),
            me.value.length ? A("", !0) : (y(), x("p", Tt, "暂无书签，可从首页拖入网站"))
          ], 40, Lt)
        ]),
        _: 1
      }, 8, ["filter", "folder", "busy", "status"])) : A("", !0),
      w.value ? (y(), ne(E(v), {
        key: `${w.value.item?.id || w.value.parentId}:${w.value.x}:${w.value.y}`,
        ref_key: "menuRef",
        ref: _,
        target: w.value,
        busy: b.value,
        blocked: g.value || f.value,
        size: S.value[w.value.item?.id || ""] || "small",
        "outer-parent-id": We.value,
        destinations: Ke.value,
        "save-text": Ge,
        "create-folder": Ve,
        remove: He,
        move: Se,
        onClose: o[8] || (o[8] = (r) => w.value = null),
        onToggleSize: Ae,
        onRefresh: se
      }, null, 8, ["target", "busy", "blocked", "size", "outer-parent-id", "destinations"])) : A("", !0),
      (y(), ne(De, { to: "body" }, [
        E(D) ? (y(), x("div", {
          key: 0,
          class: "launcher-drag-ghost bookmark-drag-ghost",
          style: ot({ left: E(D).x + "px", top: E(D).y + "px", width: E(D).width + "px", height: E(D).height + "px" }),
          "aria-hidden": "true"
        }, [
          E(D).item.kind === "folder" ? (y(), x("div", {
            key: 0,
            class: ce(["launcher-folder", "size-" + (S.value[E(D).item.id] || "small")])
          }, [
            ee(fe, {
              folder: E(D).item,
              size: S.value[E(D).item.id] || "small"
            }, null, 8, ["folder", "size"])
          ], 2)) : (y(), x("div", Dt, [
            ee(fe, {
              link: E(D).item
            }, null, 8, ["link"])
          ]))
        ], 4)) : A("", !0)
      ]))
    ], 32));
  }
}), $t = /* @__PURE__ */ $e(zt, [["__scopeId", "data-v-e902699f"]]);
export {
  $t as default
};
