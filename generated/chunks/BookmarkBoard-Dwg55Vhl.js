import { d as Oe, o as E, j as re, H as Xe, e as D, F as Ee, g as Ye, h as R, A as ve, p as ne, k as Pe, I as tt, K as ot, M as le, b as P, B as rt, x as nt, i as oe, u as S, t as ce, f as _, T as $e, z as at, C as Me, s as M } from "./vendor-vue-9b0eS4bW.js";
import { L as me, T as it, m as lt, o as st, p as ut } from "./main-DW1F2v0Z.js";
import { _ as Ue } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { C as dt } from "./view-styles-KV13C9x1.js";
import { p as fe } from "./SearchBox-BAAvcwmE.js";
const ct = ["href", "title", "data-bookmark-node", "onPointerdown", "onClick", "onContextmenu"], ft = ["data-bookmark-node", "title", "onPointerdown", "onClick", "onKeydown", "onContextmenu"], vt = /* @__PURE__ */ Oe({
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
  setup(e, { emit: l }) {
    const a = l;
    function p(d) {
      try {
        const s = new URL(d);
        return ["http:", "https:", "ftp:", "file:"].includes(s.protocol) ? d : void 0;
      } catch {
        return;
      }
    }
    return (d, s) => (E(), re(tt, {
      key: e.folderId,
      tag: "div",
      class: "launcher-items launcher-site-items bookmark-tiles",
      "data-bookmark-grid": e.folderId,
      name: e.draggedId ? "launcher-grid" : "",
      css: !!e.draggedId
    }, {
      default: Xe(() => [
        (E(!0), D(Ee, null, Ye(e.items, (r) => (E(), D(Ee, {
          key: r.id
        }, [
          r.kind === "link" ? (E(), D("a", {
            key: 0,
            class: ve(["launcher-link", { "is-dragging": !e.ghost && e.draggedId === r.id }]),
            href: p(r.url),
            title: `${r.title}
${r.url}`,
            target: "_blank",
            rel: "noopener noreferrer",
            "data-bookmark-node": r.id,
            draggable: "false",
            onDragstart: s[0] || (s[0] = R(() => {
            }, ["prevent"])),
            onPointerdown: (i) => a("pointerDown", r, i),
            onClick: (i) => a("activate", r, i),
            onContextmenu: R((i) => a("menu", r, i), ["prevent", "stop"])
          }, [
            ne(me, { link: r }, null, 8, ["link"])
          ], 42, ct)) : (E(), D("div", {
            key: 1,
            role: "button",
            tabindex: "0",
            class: ve(["launcher-folder", [`size-${e.sizes[r.id] || "small"}`, { "is-dragging": !e.ghost && e.draggedId === r.id, "drop-target": e.overFolder === r.id }]]),
            "data-bookmark-node": r.id,
            title: `${r.path}
${r.count} 个书签；拖动排序，右键管理`,
            draggable: "false",
            onDragstart: s[1] || (s[1] = R(() => {
            }, ["prevent"])),
            onPointerdown: (i) => a("pointerDown", r, i),
            onClick: (i) => a("activate", r, i),
            onKeydown: [
              Pe(R((i) => a("activate", r, i), ["prevent"]), ["enter"]),
              Pe(R((i) => a("activate", r, i), ["prevent"]), ["space"])
            ],
            onContextmenu: R((i) => a("menu", r, i), ["prevent", "stop"])
          }, [
            ne(me, {
              folder: r,
              size: e.sizes[r.id] || "small"
            }, null, 8, ["folder", "size"])
          ], 42, ft))
        ], 64))), 128))
      ]),
      _: 1
    }, 8, ["data-bookmark-grid", "name", "css"]));
  }
}), Re = /* @__PURE__ */ Ue(vt, [["__scopeId", "data-v-05264f43"]]);
function mt(e) {
  const l = P(""), a = P(""), p = le({}), d = le(null);
  let s = null, r = null, i = 0, c = 0, b = 0, h = 0, O = 0, f = 0, w = !1, y = 0, V = "", K = 0, T = null, I = !1, j = null;
  function G() {
    window.removeEventListener("pointermove", te), window.removeEventListener("pointerup", N), window.removeEventListener("pointercancel", B), window.removeEventListener("blur", B), window.removeEventListener("keydown", Q, !0), window.removeEventListener("pagehide", B), document.removeEventListener("visibilitychange", ae);
    try {
      j && r !== null && j.releasePointerCapture(r);
    } catch {
    }
    j = null;
  }
  function B() {
    w && (y = Date.now() + 600), G(), s = null, r = null, w = !1, T = null, l.value = "", a.value = "", p.value = {}, d.value = null, V = "", K = 0;
  }
  function Q(m) {
    m.key === "Escape" && (m.preventDefault(), m.stopImmediatePropagation(), B());
  }
  function ae() {
    document.hidden && B();
  }
  function pe(m, u) {
    if (u.button !== 0 || !u.isPrimary || !e.enabled() || e.beforeStart?.() === !1) return;
    B(), s = m, r = u.pointerId, i = u.clientX, c = u.clientY, j = u.currentTarget;
    const z = j.getBoundingClientRect();
    b = u.clientX - z.left, h = u.clientY - z.top, O = z.width, f = z.height;
    try {
      j.setPointerCapture(u.pointerId);
    } catch {
    }
    window.addEventListener("pointermove", te, { passive: !1 }), window.addEventListener("pointerup", N), window.addEventListener("pointercancel", B), window.addEventListener("blur", B), window.addEventListener("keydown", Q, !0), window.addEventListener("pagehide", B), document.addEventListener("visibilitychange", ae);
  }
  function te(m) {
    if (!s || m.pointerId !== r) return;
    if (!e.enabled()) {
      B();
      return;
    }
    if (!w && Math.hypot(m.clientX - i, m.clientY - c) <= it) return;
    m.preventDefault(), w = !0, l.value = s.id, d.value = { item: s, x: m.clientX - b, y: m.clientY - h, width: O, height: f };
    const u = e.hit(m.clientX, m.clientY);
    if (!u) {
      T = null, a.value = "";
      return;
    }
    const z = u.element.getBoundingClientRect(), Z = lt(z, m.clientX, m.clientY), W = u.item && u.item.id !== s.id && e.isFolder(u.item) && Z && e.accepts(s, u.item.id);
    if (u.container || W) {
      const L = W ? u.item.id : u.parentId;
      if (!e.accepts(s, L)) {
        T = null, a.value = "";
        return;
      }
      T = L, I = !0, a.value = L;
      return;
    }
    if (!e.accepts(s, u.parentId)) {
      T = null, a.value = "";
      return;
    }
    a.value = "", T = u.parentId, I = !1;
    const q = e.parentOf(s), X = [...p.value[u.parentId] || e.items(u.parentId)], Y = X.findIndex((L) => L.id === s.id), C = u.item ? X.findIndex((L) => L.id === u.item.id) : -1;
    if (u.item && u.item.id !== s.id) {
      if (!st(z, m.clientX, m.clientY)) return;
      const L = u.parentId + ":" + u.item.id, J = Date.now();
      if (L === V && J - K < ut || C < 0 || Y === C) return;
      Y >= 0 && X.splice(Y, 1), X.splice(C, 0, s), V = L, K = J;
    } else if (Y < 0) X.push(s);
    else return;
    p.value = {
      ...q === u.parentId ? {} : { [q]: e.items(q).filter((L) => L.id !== s.id) },
      [u.parentId]: X
    };
  }
  async function N(m) {
    if (m.pointerId !== r) return;
    w && te(m);
    const u = s, z = T, Z = w && !!u && !!z && e.enabled(), W = z && !I ? p.value[z] : void 0, q = u && W ? W.findIndex((J) => J.id === u.id) + 1 : 0, X = W && q > 0 ? W[q]?.id : void 0, Y = I ? z !== (u && e.parentOf(u)) : !!W, C = p.value, L = !I && !X;
    if (B(), Z && Y) {
      p.value = C;
      try {
        await e.commit(u, z, X, L);
      } finally {
        p.value = {};
      }
    } else
      p.value = {};
  }
  function H() {
    return w || Date.now() < y;
  }
  return ot(B), { start: pe, cancel: B, activeId: l, overFolder: a, previews: p, ghost: d, suppressClick: H };
}
function Ve(e) {
  return "bookmarkBoardIcon:" + e;
}
function kt(e) {
  try {
    return localStorage.getItem(Ve(e)) || "";
  } catch {
    return "";
  }
}
function We(e) {
  try {
    localStorage.removeItem(Ve(e));
  } catch {
  }
}
function pt(e) {
  const l = /* @__PURE__ */ new Map();
  function a(d, s) {
    const r = d.title || "未命名文件夹", i = [...s, r], c = {
      kind: "folder",
      id: d.id,
      parentId: d.parentId,
      title: r,
      path: i.join(" / "),
      items: [],
      preview: [],
      count: 0
    };
    l.set(d.id, c);
    for (const b of d.children || [])
      if (b.url) {
        const h = {
          kind: "link",
          id: b.id,
          parentId: d.id,
          title: b.title || b.url,
          url: b.url,
          customIcon: kt(b.id)
        };
        c.items.push(h), c.count++, c.preview.length < 9 && c.preview.push(h);
      } else {
        const h = a(b, i);
        c.items.push(h), c.count += h.count, c.preview.push(...h.preview.slice(0, 9 - c.preview.length));
      }
    return c;
  }
  const p = [];
  for (const d of e) for (const s of d.children || []) {
    if (s.url) continue;
    const r = (s.title || "").replace(/[\s_-]/g, "").toLowerCase();
    if (/^(?:工作区|工作區|工作空间|工作空間|(?:microsoft)?edge工作区|(?:microsoft)?edgeworkspaces?|workspaces?)$/.test(r)) continue;
    const i = a(s, []);
    if (!i.items.length) continue;
    const c = i.items.filter((h) => h.kind === "folder"), b = i.items.filter((h) => h.kind === "link");
    if (b.length) {
      const h = { ...i, title: c.length ? "未分组书签" : i.title, items: b };
      l.set(i.id, h), c.unshift(h);
    }
    p.push({ id: s.id, title: i.title, sections: c });
  }
  return { sources: p, folders: l };
}
function F(e) {
  return new Promise((l, a) => {
    const p = setTimeout(() => a(new Error("书签操作结果未确认，请刷新核对，不要重复提交。")), 1e4);
    try {
      e((d) => {
        const s = !!chrome.runtime?.lastError;
        clearTimeout(p), s ? a(new Error("浏览器书签操作失败，请刷新核对。")) : l(d);
      });
    } catch {
      clearTimeout(p), a(new Error("浏览器书签接口不可用。"));
    }
  });
}
function ht() {
  return typeof chrome > "u" || !chrome.bookmarks?.getTree ? Promise.reject(new Error("当前页面无法读取浏览器书签，请在扩展新标签页打开。")) : F((e) => chrome.bookmarks.getTree(e));
}
async function gt(e, l, a, p = !1, d) {
  const s = await F((f) => chrome.bookmarks.get(e, f)), r = await F((f) => chrome.bookmarks.get(l, f)), i = s[0];
  if (!i?.parentId || i.parentId === "0" || !r[0] || r[0].url || l === "0") throw new Error("书签或目标文件夹已变化，或是浏览器固定目录，请刷新后再移动。");
  if (d && i.parentId !== d) throw new Error("该节点已被其他页面移动，请刷新核对后再操作。");
  if (!i.url) {
    let f = r[0];
    const w = /* @__PURE__ */ new Set();
    for (; f; ) {
      if (f.id === e) throw new Error("不能把文件夹移入自身或子文件夹。");
      if (!f.parentId) break;
      if (w.has(f.id)) throw new Error("目录结构异常，请刷新核对。");
      w.add(f.id), f = (await F((y) => chrome.bookmarks.get(f.parentId, y)))[0];
    }
  }
  let c;
  if (a) {
    if (a === e) return;
    const f = (await F((w) => chrome.bookmarks.get(a, w)))[0];
    if (!f || f.parentId !== l || f.index === void 0) throw new Error("目标书签已变化，请刷新后再移动。");
    c = f.index, i.parentId === l && i.index !== void 0 && i.index < c && c--;
  } else if (i.parentId === l) {
    if (!p) return;
    const f = await F((w) => chrome.bookmarks.getChildren(l, w));
    if (c = Math.max(0, f.length - 1), i.index === c) return;
  }
  const b = await F((f) => chrome.bookmarks.move(e, { parentId: l, ...c === void 0 ? {} : { index: c } }, f));
  if (b?.id !== e || b.parentId !== l) throw new Error("移动结果未确认，请刷新核对，不要重复提交。");
  const h = await F((f) => chrome.bookmarks.getChildren(l, f)), O = h.findIndex((f) => f.id === e);
  if (O < 0 || (a ? h[O + 1]?.id !== a : O !== h.length - 1))
    throw new Error("书签排列结果未确认，请刷新核对，不要重复提交。");
}
function bt(e) {
  if (typeof chrome > "u" || !chrome.bookmarks) return () => {
  };
  const l = [
    chrome.bookmarks.onCreated,
    chrome.bookmarks.onRemoved,
    chrome.bookmarks.onChanged,
    chrome.bookmarks.onMoved,
    chrome.bookmarks.onChildrenReordered,
    chrome.bookmarks.onImportEnded
  ];
  for (const a of l) a?.addListener(e);
  return () => {
    for (const a of l) a?.removeListener(e);
  };
}
function ke(e) {
  const l = e.trim();
  if (!l || l.length > 100) throw new Error("名称不能为空，且最多100个字符。");
  return l;
}
function Ae(e) {
  const l = e.trim();
  try {
    const a = new URL(l);
    if (!["http:", "https:"].includes(a.protocol) || a.username || a.password) throw new Error();
  } catch {
    throw new Error("请填写不含账号密码的 HTTP(S) 网址。");
  }
  return l;
}
async function Ke(e) {
  const l = (await F((a) => chrome.bookmarks.get(e, a)))[0];
  if (!l?.parentId || l.parentId === "0") throw new Error("浏览器固定目录不能修改。");
  return l;
}
async function wt(e, l, a) {
  const p = l === "title" ? ke(a) : Ae(a), d = await Ke(e.id), s = l === "title" ? d.title || d.url || "未命名文件夹" : d.url, r = l === "title" ? e.title : e.kind === "link" ? e.url : void 0;
  if (s !== r || l === "url" && !d.url) throw new Error("该字段已在其他页面修改，请刷新核对后再编辑。");
  const i = await F((c) => chrome.bookmarks.update(e.id, { [l]: p }, c));
  if (i?.id !== e.id || i[l] !== p) throw new Error("保存结果未确认，请刷新核对，不要重复提交。");
  return p;
}
function je(e) {
  return JSON.stringify(e.kind === "link" ? [e.id, e.title, e.url] : [e.id, e.title, e.items.map(je)]);
}
function Ne(e) {
  return JSON.stringify(e.url ? [e.id, e.title || e.url, e.url] : [e.id, e.title || "未命名文件夹", (e.children || []).map(Ne)]);
}
async function yt(e) {
  const l = await Ke(e.id), a = (await F((d) => chrome.bookmarks.getSubTree(e.id, d)))[0];
  if (!a || je(e) !== Ne(a)) throw new Error("书签内容已变化，已拒绝删除，请刷新核对后重新确认。");
  if (await F((d) => e.kind === "folder" ? chrome.bookmarks.removeTree(e.id, d) : chrome.bookmarks.remove(e.id, d)), (await F((d) => chrome.bookmarks.getChildren(l.parentId, d))).some((d) => d.id === e.id)) throw new Error("删除结果未确认，请刷新核对，不要重复提交。");
  e.kind === "link" && We(e.id);
}
async function It(e, l) {
  const a = ke(l), p = (await F((s) => chrome.bookmarks.get(e, s)))[0];
  if (!p || p.url || e === "0") throw new Error("无法在该位置创建文件夹，请刷新核对。");
  const d = await F((s) => chrome.bookmarks.create({ parentId: e, title: a }, s));
  if (!d?.id || d.parentId !== e || d.title !== a) throw new Error("创建结果未确认，请刷新核对，不要重复提交。");
  return a;
}
const Et = {
  class: "launcher-page-tabs bookmark-section-tabs",
  "aria-label": "书签板块",
  role: "tablist"
}, Bt = ["data-bookmark-section", "aria-selected", "disabled", "title", "onClick", "onContextmenu"], Ct = { class: "bookmark-board-tools" }, xt = ["disabled"], St = {
  key: 0,
  class: "bookmark-board-status",
  role: "status"
}, Lt = ["data-bookmark-drop", "aria-busy"], Tt = {
  key: 1,
  class: "bookmark-board-empty"
}, zt = ["data-bookmark-drop"], Dt = {
  key: 1,
  class: "bookmark-board-empty"
}, Ft = {
  key: 1,
  class: "launcher-link"
}, Pt = /* @__PURE__ */ Oe({
  __name: "BookmarkBoard",
  props: {
    headerTarget: {}
  },
  emits: ["busy"],
  setup(e, { emit: l }) {
    const a = Me(() => import("./BookmarkFolderDialog-BHCFo3sH.js")), p = Me(() => import("./BookmarkBoardMenu-CPercWkY.js")), d = e, s = l, r = le({ sources: [], folders: /* @__PURE__ */ new Map() }), i = P(""), c = P(""), b = P(""), h = P(60), O = P(60), f = P(!1), w = P(!1), y = P(!1), V = P(""), K = P(""), T = le({}), I = le(null), j = P(null);
    let G = 0, B = !0, Q, ae = () => {
    };
    const pe = M(() => r.value.sources.map((t) => ({
      value: t.id,
      label: t.title,
      icon: "🔖"
    }))), te = M(() => r.value.sources.find((t) => t.id === i.value)), N = M(() => te.value?.sections || []), H = M(() => N.value.find((t) => t.id === c.value)), m = M(() => r.value.folders.get(b.value)), u = M(() => V.value || (w.value && !r.value.sources.length ? "正在读取书签…" : K.value)), z = M(() => y.value || w.value || f.value);
    function Z(t, o) {
      if (!o || o === "0" || !r.value.folders.has(o) || !t.parentId || t.parentId === "0") return !1;
      if (t.kind === "link") return !0;
      const n = /* @__PURE__ */ new Set();
      for (let v = r.value.folders.get(o); v; v = v.parentId ? r.value.folders.get(v.parentId) : void 0) {
        if (v.id === t.id || n.has(v.id)) return !1;
        n.add(v.id);
      }
      return !0;
    }
    const W = M(() => {
      const t = new Map(r.value.folders);
      for (const o of r.value.folders.values()) for (const n of o.items) t.set(n.id, n);
      return t;
    });
    function q(t) {
      return W.value.get(t);
    }
    function X(t, o) {
      const n = document.elementsFromPoint(t, o);
      if (n.some((x) => x.closest(".bookmark-board-menu"))) return null;
      const v = n.map((x) => x.closest("[data-bookmark-section]")).find(Boolean);
      if (v) return { parentId: v.dataset.bookmarkSection, element: v, container: !0 };
      const $ = n.map((x) => x.closest("[data-bookmark-node]")).find(Boolean), g = $?.closest("[data-bookmark-grid]") || n.map((x) => x.closest("[data-bookmark-grid], [data-bookmark-drop]")).find(Boolean);
      return g ? { parentId: g.dataset.bookmarkGrid || g.dataset.bookmarkDrop, element: $ || g, item: $ ? q($.dataset.bookmarkNode) : void 0 } : null;
    }
    function Y() {
      return y.value || I.value && j.value?.canDismiss === !1 ? !1 : (I.value = null, !0);
    }
    const C = mt({
      enabled: () => !z.value,
      parentOf: (t) => t.parentId || "",
      items: (t) => r.value.folders.get(t)?.items || [],
      isFolder: (t) => t.kind === "folder",
      accepts: Z,
      hit: X,
      beforeStart: Y,
      commit: async (t, o, n, v) => {
        try {
          await Te(t, o, n, v);
        } catch {
        }
      }
    }), L = C.activeId, J = C.overFolder, A = C.ghost, Be = C.previews, se = M(() => H.value ? Be.value[H.value.id] || H.value.items : []), he = M(() => m.value ? Be.value[m.value.id] || m.value.items : []), He = M(() => {
      const t = I.value?.item;
      return t ? N.value.filter((o) => o.id !== t.parentId && Z(t, o.id)).map((o) => ({ id: o.id, title: o.title, disabled: !1 })) : [];
    }), _e = M(() => {
      const t = I.value?.item?.parentId ? r.value.folders.get(I.value.item.parentId) : void 0;
      return t?.parentId && t.parentId !== "0" ? t.parentId : void 0;
    });
    function ge(t) {
      y.value || !Y() || (C.cancel(), c.value = t, b.value = "", h.value = 60);
    }
    function Ge() {
      ge(te.value?.sections[0]?.id || N.value[0]?.id || "");
    }
    function be(t) {
      y.value || !Y() || (C.cancel(), b.value = t.id, O.value = 60);
    }
    function we() {
      !y.value && !I.value && (C.cancel(), b.value = "");
    }
    function qe() {
      const t = m.value?.parentId, o = t ? r.value.folders.get(t) : void 0;
      !o || o.id === c.value ? we() : be(o);
    }
    function Ce(t, o) {
      if (C.suppressClick() || y.value) {
        o.preventDefault();
        return;
      }
      if (t.kind === "folder") {
        be(t);
        return;
      }
      try {
        if (["http:", "https:", "ftp:", "file:"].includes(new URL(t.url).protocol)) return;
      } catch {
      }
      o.preventDefault(), K.value = "该书签网址无效，请右键编辑。";
    }
    function ye(t, o, n, v = !1) {
      n.preventDefault(), n.stopPropagation(), !(y.value || !Y()) && (C.cancel(), !(t && (!t.parentId || t.parentId === "0")) && (I.value = { item: t, parentId: o, x: n.clientX, y: n.clientY, section: v }));
    }
    function xe(t, o) {
      o.target.closest("[data-bookmark-node], button, input, .launcher-folder-title-box") || !t || t === "0" || !r.value.folders.has(t) || ye(void 0, t, o);
    }
    function Se(t, o) {
      ye(t, t.parentId || "", o);
    }
    function Je(t) {
      const o = T.value[t] === "large" ? "small" : "large";
      try {
        o === "large" ? localStorage.setItem("bookmarkBoardFolderSize:" + t, "large") : localStorage.removeItem("bookmarkBoardFolderSize:" + t), T.value = { ...T.value, [t]: o };
      } catch {
        K.value = "文件夹大小保存失败。";
      }
    }
    async function ue() {
      await Ie();
    }
    async function Ie(t = !1) {
      if (y.value) return;
      t || C.cancel();
      const o = ++G;
      w.value = !0, V.value = "";
      try {
        const n = await ht();
        if (B && o === G) {
          r.value = pt(n), r.value.sources.some((g) => g.id === i.value) || (i.value = r.value.sources.find((g) => g.id === "1")?.id || r.value.sources[0]?.id || ""), N.value.some((g) => g.id === c.value) || (c.value = N.value[0]?.id || "", b.value = ""), r.value.folders.has(b.value) || (b.value = "");
          const v = {}, $ = new Set(r.value.folders.keys());
          for (const g of $)
            try {
              localStorage.getItem("bookmarkBoardFolderSize:" + g) === "large" && (v[g] = "large");
            } catch {
            }
          T.value = v, f.value = !1;
          try {
            const g = new Set($);
            for (const x of r.value.folders.values())
              for (const k of x.items) g.add(k.id);
            for (let x = localStorage.length - 1; x >= 0; x--) {
              const k = localStorage.key(x);
              if (k?.startsWith("bookmarkBoardFolderSize:")) {
                const U = k.slice(24);
                $.has(U) || localStorage.removeItem(k);
              } else if (k?.startsWith("bookmarkBoardIcon:")) {
                const U = k.slice(18);
                g.has(U) || localStorage.removeItem(k);
              }
            }
          } catch {
          }
        }
      } catch (n) {
        B && o === G && (V.value = n instanceof Error ? n.message : "书签读取失败。", t && (f.value = !0));
      } finally {
        B && o === G && (w.value = !1);
      }
    }
    function Le() {
      y.value || f.value || (clearTimeout(Q), Q = setTimeout(() => {
        L.value ? Le() : ue();
      }, 180));
    }
    async function de(t, o = !1) {
      if (z.value) throw new Error("正在操作或结果未确认，请刷新核对后再操作。");
      o || C.cancel(), clearTimeout(Q), ++G, w.value = !1, y.value = !0, s("busy", !0), V.value = "", K.value = "";
      try {
        return await t();
      } catch (n) {
        throw B && (f.value = !0, K.value = "", V.value = n instanceof Error ? n.message : "保存失败，请刷新核对。"), n;
      } finally {
        y.value = !1, s("busy", !1), B && !f.value && await Ie(o);
      }
    }
    function Te(t, o, n, v) {
      return Z(t, o) ? de(() => gt(t.id, o, n, v, t.parentId), !0) : Promise.reject(new Error("不能移入自身、子文件夹或浏览器固定根目录。"));
    }
    function Qe(t, o, n) {
      try {
        n = o === "title" ? ke(n) : Ae(n);
      } catch (v) {
        return Promise.reject(v);
      }
      return de(() => wt(t, o, n));
    }
    function ze(t) {
      for (const o of t.items)
        o.kind === "link" ? We(o.id) : ze(o);
    }
    function Ze(t, o) {
      try {
        o = ke(o);
      } catch (n) {
        return Promise.reject(n);
      }
      return de(() => It(t, o));
    }
    function et(t) {
      return de(async () => {
        await yt(t), t.kind === "folder" && ze(t);
      });
    }
    async function De(t, o) {
      r.value.sources.length || await Ie();
      let n, v = "";
      for (const [k, U] of r.value.folders.entries()) {
        const ee = U.items.find(
          (ie) => t && String(ie.id) === String(t) || o && ie.kind === "link" && ie.url === o
        );
        if (ee) {
          n = ee, v = k;
          break;
        }
      }
      if (!n && t && r.value.folders.has(t) && (n = r.value.folders.get(t), v = n?.parentId || ""), !n) return !1;
      let $ = v, g = "", x = "";
      for (const k of r.value.sources) {
        const U = k.sections.find((ee) => ee.id === $);
        if (U) {
          g = U.id, x = k.id;
          break;
        }
      }
      if (!g && $) {
        let k = r.value.folders.get($);
        for (; k && k.parentId && k.parentId !== "0"; ) {
          for (const U of r.value.sources) {
            const ee = U.sections.find((ie) => ie.id === k.id);
            if (ee) {
              g = ee.id, x = U.id;
              break;
            }
          }
          if (g) break;
          k = r.value.folders.get(k.parentId);
        }
      }
      return x && i.value !== x && (i.value = x), g && c.value !== g && ge(g), v && v !== g && r.value.folders.has(v) ? be(r.value.folders.get(v)) : we(), setTimeout(() => {
        let k = null;
        n?.id && (k = document.querySelector(`[data-bookmark-node="${n.id}"]`)), !k && o && (k = document.querySelector(`.bookmark-board [href="${o}"]`)), k && (k.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" }), k.classList.remove("launcher-locate-highlight"), k.offsetWidth, k.classList.add("launcher-locate-highlight"), setTimeout(() => {
          k?.classList.remove("launcher-locate-highlight");
        }, 3200));
      }, 140), !0;
    }
    function Fe(t) {
      const o = t;
      De(o.detail?.nodeId, o.detail?.url);
    }
    return rt(() => {
      ae = bt(Le), window.addEventListener("logicweaver:locate-bookmark", Fe), ue().then(() => {
        if (fe.timestamp && Date.now() - fe.timestamp < 4e3) {
          const { nodeId: t, url: o } = fe;
          fe.timestamp = 0, De(t, o);
        }
      });
    }), nt(() => {
      B = !1, ++G, ae(), window.removeEventListener("logicweaver:locate-bookmark", Fe), clearTimeout(Q), C.cancel();
    }), (t, o) => (E(), D("div", {
      class: "bookmark-board",
      onPointerdown: o[8] || (o[8] = R(() => {
      }, ["stop"])),
      onContextmenu: o[9] || (o[9] = R(() => {
      }, ["stop"])),
      onWheel: o[10] || (o[10] = R(() => {
      }, ["stop"]))
    }, [
      (E(), re($e, {
        to: d.headerTarget
      }, [
        oe("div", {
          class: "bookmark-board-head",
          onPointerdown: o[1] || (o[1] = R(() => {
          }, ["stop"])),
          onContextmenu: o[2] || (o[2] = R(() => {
          }, ["stop"]))
        }, [
          oe("nav", Et, [
            (E(!0), D(Ee, null, Ye(N.value, (n) => (E(), D("button", {
              key: n.id,
              "data-bookmark-section": n.id,
              type: "button",
              role: "tab",
              class: ve(["launcher-page-tab", { active: c.value === n.id, "drop-target": S(J) === n.id }]),
              "aria-selected": c.value === n.id,
              "aria-controls": "bookmark-section-panel",
              disabled: y.value,
              title: n.title,
              onClick: (v) => ge(n.id),
              onContextmenu: R((v) => ye(n, n.parentId || "", v, !0), ["prevent"])
            }, ce(n.title), 43, Bt))), 128))
          ]),
          oe("div", Ct, [
            r.value.sources.length > 1 ? (E(), re(dt, {
              key: 0,
              modelValue: i.value,
              "onUpdate:modelValue": o[0] || (o[0] = (n) => i.value = n),
              options: pe.value,
              disabled: y.value || !!I.value,
              size: "xs",
              style: { width: "110px" },
              onChange: Ge
            }, null, 8, ["modelValue", "options", "disabled"])) : _("", !0),
            oe("button", {
              type: "button",
              disabled: w.value || y.value,
              title: "刷新书签",
              "aria-label": "刷新书签",
              onClick: ue
            }, "↻", 8, xt)
          ])
        ], 32)
      ], 8, ["to"])),
      u.value ? (E(), D("span", St, ce(u.value), 1)) : _("", !0),
      oe("div", {
        id: "bookmark-section-panel",
        class: "launcher-page-panel bookmark-board-content",
        role: "tabpanel",
        "data-bookmark-drop": H.value?.id,
        "aria-busy": w.value || y.value,
        onContextmenu: o[4] || (o[4] = (n) => H.value && xe(H.value.id, n))
      }, [
        ne(Re, {
          items: se.value.slice(0, h.value),
          "folder-id": H.value?.id || "",
          busy: y.value,
          "dragged-id": S(L),
          "over-folder": S(J),
          sizes: T.value,
          onPointerDown: S(C).start,
          onActivate: Ce,
          onMenu: Se
        }, null, 8, ["items", "folder-id", "busy", "dragged-id", "over-folder", "sizes", "onPointerDown"]),
        se.value.length > h.value ? (E(), D("button", {
          key: 0,
          class: "bookmark-board-more",
          type: "button",
          onClick: o[3] || (o[3] = (n) => h.value += 60)
        }, "显示更多（剩余 " + ce(se.value.length - h.value) + "）", 1)) : _("", !0),
        !w.value && !se.value.length ? (E(), D("p", Tt, ce(V.value ? "书签读取失败，请刷新核对" : "暂无书签，右键创建文件夹或拖入网站"), 1)) : _("", !0)
      ], 40, Lt),
      m.value ? (E(), re(S(a), {
        key: 1,
        folder: m.value,
        busy: y.value || !!I.value,
        status: u.value,
        onClose: we,
        onUp: qe
      }, {
        default: Xe(() => [
          oe("div", {
            class: "bookmark-folder-drop-area",
            "data-bookmark-drop": m.value.id,
            onContextmenu: o[6] || (o[6] = (n) => xe(m.value.id, n))
          }, [
            ne(Re, {
              items: he.value.slice(0, O.value),
              "folder-id": m.value.id,
              busy: y.value,
              "dragged-id": S(L),
              "over-folder": S(J),
              sizes: T.value,
              onPointerDown: S(C).start,
              onActivate: Ce,
              onMenu: Se
            }, null, 8, ["items", "folder-id", "busy", "dragged-id", "over-folder", "sizes", "onPointerDown"]),
            he.value.length > O.value ? (E(), D("button", {
              key: 0,
              class: "bookmark-board-more",
              type: "button",
              onClick: o[5] || (o[5] = (n) => O.value += 60)
            }, "显示更多")) : _("", !0),
            he.value.length ? _("", !0) : (E(), D("p", Dt, "暂无书签，可从首页拖入网站"))
          ], 40, zt)
        ]),
        _: 1
      }, 8, ["folder", "busy", "status"])) : _("", !0),
      I.value ? (E(), re(S(p), {
        key: `${I.value.item?.id || I.value.parentId}:${I.value.x}:${I.value.y}`,
        ref_key: "menuRef",
        ref: j,
        target: I.value,
        busy: y.value,
        blocked: w.value || f.value,
        size: T.value[I.value.item?.id || ""] || "small",
        "outer-parent-id": _e.value,
        destinations: He.value,
        "save-text": Qe,
        "create-folder": Ze,
        remove: et,
        move: Te,
        onClose: o[7] || (o[7] = (n) => I.value = null),
        onToggleSize: Je,
        onRefresh: ue
      }, null, 8, ["target", "busy", "blocked", "size", "outer-parent-id", "destinations"])) : _("", !0),
      (E(), re($e, { to: "body" }, [
        S(A) ? (E(), D("div", {
          key: 0,
          class: "launcher-drag-ghost bookmark-drag-ghost",
          style: at({ left: S(A).x + "px", top: S(A).y + "px", width: S(A).width + "px", height: S(A).height + "px" }),
          "aria-hidden": "true"
        }, [
          S(A).item.kind === "folder" ? (E(), D("div", {
            key: 0,
            class: ve(["launcher-folder", "size-" + (T.value[S(A).item.id] || "small")])
          }, [
            ne(me, {
              folder: S(A).item,
              size: T.value[S(A).item.id] || "small"
            }, null, 8, ["folder", "size"])
          ], 2)) : (E(), D("div", Ft, [
            ne(me, {
              link: S(A).item
            }, null, 8, ["link"])
          ]))
        ], 4)) : _("", !0)
      ]))
    ], 32));
  }
}), Yt = /* @__PURE__ */ Ue(Pt, [["__scopeId", "data-v-7807e764"]]);
export {
  Yt as default
};
