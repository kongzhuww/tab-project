import { d as Pe, o as y, j as oe, H as Me, e as L, F as he, g as $e, h as M, A as de, p as re, k as Le, I as qe, K as Qe, M as ae, b as D, B as Ze, x as et, i as te, u as E, t as ue, f as W, T as ze, z as tt, C as De, s as P } from "./vendor-vue-9b0eS4bW.js";
import { L as ce, T as ot, m as rt, o as nt, p as at } from "./main-6Tkb8jOI.js";
import { _ as Re } from "./_plugin-vue_export-helper-D0Oc3lep.js";
import { C as it } from "./view-styles-BF8Cs_hc.js";
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
    function m(d) {
      try {
        const s = new URL(d);
        return ["http:", "https:", "ftp:", "file:"].includes(s.protocol) ? d : void 0;
      } catch {
        return;
      }
    }
    return (d, s) => (y(), oe(qe, {
      key: e.folderId,
      tag: "div",
      class: "launcher-items launcher-site-items bookmark-tiles",
      "data-bookmark-grid": e.folderId,
      name: e.draggedId ? "launcher-grid" : "",
      css: !!e.draggedId
    }, {
      default: Me(() => [
        (y(!0), L(he, null, $e(e.items, (r) => (y(), L(he, {
          key: r.id
        }, [
          r.kind === "link" ? (y(), L("a", {
            key: 0,
            class: de(["launcher-link", { "is-dragging": !e.ghost && e.draggedId === r.id }]),
            href: m(r.url),
            title: `${r.title}
${r.url}`,
            target: "_blank",
            rel: "noopener noreferrer",
            "data-bookmark-node": r.id,
            draggable: "false",
            onDragstart: s[0] || (s[0] = M(() => {
            }, ["prevent"])),
            onPointerdown: (l) => a("pointerDown", r, l),
            onClick: (l) => a("activate", r, l),
            onContextmenu: M((l) => a("menu", r, l), ["prevent", "stop"])
          }, [
            re(ce, { link: r }, null, 8, ["link"])
          ], 42, lt)) : (y(), L("div", {
            key: 1,
            role: "button",
            tabindex: "0",
            class: de(["launcher-folder", [`size-${e.sizes[r.id] || "small"}`, { "is-dragging": !e.ghost && e.draggedId === r.id, "drop-target": e.overFolder === r.id }]]),
            "data-bookmark-node": r.id,
            title: `${r.path}
${r.count} 个书签；拖动排序，右键管理`,
            draggable: "false",
            onDragstart: s[1] || (s[1] = M(() => {
            }, ["prevent"])),
            onPointerdown: (l) => a("pointerDown", r, l),
            onClick: (l) => a("activate", r, l),
            onKeydown: [
              Le(M((l) => a("activate", r, l), ["prevent"]), ["enter"]),
              Le(M((l) => a("activate", r, l), ["prevent"]), ["space"])
            ],
            onContextmenu: M((l) => a("menu", r, l), ["prevent", "stop"])
          }, [
            re(ce, {
              folder: r,
              size: e.sizes[r.id] || "small"
            }, null, 8, ["folder", "size"])
          ], 42, st))
        ], 64))), 128))
      ]),
      _: 1
    }, 8, ["data-bookmark-grid", "name", "css"]));
  }
}), Fe = /* @__PURE__ */ Re(ut, [["__scopeId", "data-v-35bd027d"]]);
function dt(e) {
  const i = D(""), a = D(""), m = ae({}), d = ae(null);
  let s = null, r = null, l = 0, c = 0, h = 0, k = 0, $ = 0, f = 0, g = !1, b = 0, O = "", N = 0, x = null, w = !1, A = null;
  function j() {
    window.removeEventListener("pointermove", ee), window.removeEventListener("pointerup", K), window.removeEventListener("pointercancel", I), window.removeEventListener("blur", I), window.removeEventListener("keydown", q, !0), window.removeEventListener("pagehide", I), document.removeEventListener("visibilitychange", ne);
    try {
      A && r !== null && A.releasePointerCapture(r);
    } catch {
    }
    A = null;
  }
  function I() {
    g && (b = Date.now() + 600), j(), s = null, r = null, g = !1, x = null, i.value = "", a.value = "", m.value = {}, d.value = null, O = "", N = 0;
  }
  function q(v) {
    v.key === "Escape" && (v.preventDefault(), v.stopImmediatePropagation(), I());
  }
  function ne() {
    document.hidden && I();
  }
  function ve(v, u) {
    if (u.button !== 0 || !u.isPrimary || !e.enabled() || e.beforeStart?.() === !1) return;
    I(), s = v, r = u.pointerId, l = u.clientX, c = u.clientY, A = u.currentTarget;
    const S = A.getBoundingClientRect();
    h = u.clientX - S.left, k = u.clientY - S.top, $ = S.width, f = S.height;
    try {
      A.setPointerCapture(u.pointerId);
    } catch {
    }
    window.addEventListener("pointermove", ee, { passive: !1 }), window.addEventListener("pointerup", K), window.addEventListener("pointercancel", I), window.addEventListener("blur", I), window.addEventListener("keydown", q, !0), window.addEventListener("pagehide", I), document.addEventListener("visibilitychange", ne);
  }
  function ee(v) {
    if (!s || v.pointerId !== r) return;
    if (!e.enabled()) {
      I();
      return;
    }
    if (!g && Math.hypot(v.clientX - l, v.clientY - c) <= ot) return;
    v.preventDefault(), g = !0, i.value = s.id, d.value = { item: s, x: v.clientX - h, y: v.clientY - k, width: $, height: f };
    const u = e.hit(v.clientX, v.clientY);
    if (!u) {
      x = null, a.value = "";
      return;
    }
    const S = u.element.getBoundingClientRect(), Q = rt(S, v.clientX, v.clientY), X = u.item && u.item.id !== s.id && e.isFolder(u.item) && Q && e.accepts(s, u.item.id);
    if (u.container || X) {
      const B = X ? u.item.id : u.parentId;
      if (!e.accepts(s, B)) {
        x = null, a.value = "";
        return;
      }
      x = B, w = !0, a.value = B;
      return;
    }
    if (!e.accepts(s, u.parentId)) {
      x = null, a.value = "";
      return;
    }
    a.value = "", x = u.parentId, w = !1;
    const H = e.parentOf(s), R = [...m.value[u.parentId] || e.items(u.parentId)], U = R.findIndex((B) => B.id === s.id), C = u.item ? R.findIndex((B) => B.id === u.item.id) : -1;
    if (u.item && u.item.id !== s.id) {
      if (!nt(S, v.clientX, v.clientY)) return;
      const B = u.parentId + ":" + u.item.id, G = Date.now();
      if (B === O && G - N < at || C < 0 || U === C) return;
      U >= 0 && R.splice(U, 1), R.splice(C, 0, s), O = B, N = G;
    } else if (U < 0) R.push(s);
    else return;
    m.value = {
      ...H === u.parentId ? {} : { [H]: e.items(H).filter((B) => B.id !== s.id) },
      [u.parentId]: R
    };
  }
  async function K(v) {
    if (v.pointerId !== r) return;
    g && ee(v);
    const u = s, S = x, Q = g && !!u && !!S && e.enabled(), X = S && !w ? m.value[S] : void 0, H = u && X ? X.findIndex((G) => G.id === u.id) + 1 : 0, R = X && H > 0 ? X[H]?.id : void 0, U = w ? S !== (u && e.parentOf(u)) : !!X, C = m.value, B = !w && !R;
    if (I(), Q && U) {
      m.value = C;
      try {
        await e.commit(u, S, R, B);
      } finally {
        m.value = {};
      }
    } else
      m.value = {};
  }
  function V() {
    return g || Date.now() < b;
  }
  return Qe(I), { start: ve, cancel: I, activeId: i, overFolder: a, previews: m, ghost: d, suppressClick: V };
}
function Ue(e) {
  return "bookmarkBoardIcon:" + e;
}
function ct(e) {
  try {
    return localStorage.getItem(Ue(e)) || "";
  } catch {
    return "";
  }
}
function Oe(e) {
  try {
    localStorage.removeItem(Ue(e));
  } catch {
  }
}
function ft(e) {
  const i = /* @__PURE__ */ new Map();
  function a(d, s) {
    const r = d.title || "未命名文件夹", l = [...s, r], c = {
      kind: "folder",
      id: d.id,
      parentId: d.parentId,
      title: r,
      path: l.join(" / "),
      items: [],
      preview: [],
      count: 0
    };
    i.set(d.id, c);
    for (const h of d.children || [])
      if (h.url) {
        const k = {
          kind: "link",
          id: h.id,
          parentId: d.id,
          title: h.title || h.url,
          url: h.url,
          customIcon: ct(h.id)
        };
        c.items.push(k), c.count++, c.preview.length < 9 && c.preview.push(k);
      } else {
        const k = a(h, l);
        c.items.push(k), c.count += k.count, c.preview.push(...k.preview.slice(0, 9 - c.preview.length));
      }
    return c;
  }
  const m = [];
  for (const d of e) for (const s of d.children || []) {
    if (s.url) continue;
    const r = (s.title || "").replace(/[\s_-]/g, "").toLowerCase();
    if (/^(?:工作区|工作區|工作空间|工作空間|(?:microsoft)?edge工作区|(?:microsoft)?edgeworkspaces?|workspaces?)$/.test(r)) continue;
    const l = a(s, []);
    if (!l.items.length) continue;
    const c = l.items.filter((k) => k.kind === "folder"), h = l.items.filter((k) => k.kind === "link");
    if (h.length) {
      const k = { ...l, title: c.length ? "未分组书签" : l.title, items: h };
      i.set(l.id, k), c.unshift(k);
    }
    m.push({ id: s.id, title: l.title, sections: c });
  }
  return { sources: m, folders: i };
}
function z(e) {
  return new Promise((i, a) => {
    const m = setTimeout(() => a(new Error("书签操作结果未确认，请刷新核对，不要重复提交。")), 1e4);
    try {
      e((d) => {
        const s = !!chrome.runtime?.lastError;
        clearTimeout(m), s ? a(new Error("浏览器书签操作失败，请刷新核对。")) : i(d);
      });
    } catch {
      clearTimeout(m), a(new Error("浏览器书签接口不可用。"));
    }
  });
}
function vt() {
  return typeof chrome > "u" || !chrome.bookmarks?.getTree ? Promise.reject(new Error("当前页面无法读取浏览器书签，请在扩展新标签页打开。")) : z((e) => chrome.bookmarks.getTree(e));
}
async function mt(e, i, a, m = !1, d) {
  const s = await z((f) => chrome.bookmarks.get(e, f)), r = await z((f) => chrome.bookmarks.get(i, f)), l = s[0];
  if (!l?.parentId || l.parentId === "0" || !r[0] || r[0].url || i === "0") throw new Error("书签或目标文件夹已变化，或是浏览器固定目录，请刷新后再移动。");
  if (d && l.parentId !== d) throw new Error("该节点已被其他页面移动，请刷新核对后再操作。");
  if (!l.url) {
    let f = r[0];
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
    if (!m) return;
    const f = await z((g) => chrome.bookmarks.getChildren(i, g));
    if (c = Math.max(0, f.length - 1), l.index === c) return;
  }
  const h = await z((f) => chrome.bookmarks.move(e, { parentId: i, ...c === void 0 ? {} : { index: c } }, f));
  if (h?.id !== e || h.parentId !== i) throw new Error("移动结果未确认，请刷新核对，不要重复提交。");
  const k = await z((f) => chrome.bookmarks.getChildren(i, f)), $ = k.findIndex((f) => f.id === e);
  if ($ < 0 || (a ? k[$ + 1]?.id !== a : $ !== k.length - 1))
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
function fe(e) {
  const i = e.trim();
  if (!i || i.length > 100) throw new Error("名称不能为空，且最多100个字符。");
  return i;
}
function Xe(e) {
  const i = e.trim();
  try {
    const a = new URL(i);
    if (!["http:", "https:"].includes(a.protocol) || a.username || a.password) throw new Error();
  } catch {
    throw new Error("请填写不含账号密码的 HTTP(S) 网址。");
  }
  return i;
}
async function Ye(e) {
  const i = (await z((a) => chrome.bookmarks.get(e, a)))[0];
  if (!i?.parentId || i.parentId === "0") throw new Error("浏览器固定目录不能修改。");
  return i;
}
async function pt(e, i, a) {
  const m = i === "title" ? fe(a) : Xe(a), d = await Ye(e.id), s = i === "title" ? d.title || d.url || "未命名文件夹" : d.url, r = i === "title" ? e.title : e.kind === "link" ? e.url : void 0;
  if (s !== r || i === "url" && !d.url) throw new Error("该字段已在其他页面修改，请刷新核对后再编辑。");
  const l = await z((c) => chrome.bookmarks.update(e.id, { [i]: m }, c));
  if (l?.id !== e.id || l[i] !== m) throw new Error("保存结果未确认，请刷新核对，不要重复提交。");
  return m;
}
function Ne(e) {
  return JSON.stringify(e.kind === "link" ? [e.id, e.title, e.url] : [e.id, e.title, e.items.map(Ne)]);
}
function Ae(e) {
  return JSON.stringify(e.url ? [e.id, e.title || e.url, e.url] : [e.id, e.title || "未命名文件夹", (e.children || []).map(Ae)]);
}
async function ht(e) {
  const i = await Ye(e.id), a = (await z((d) => chrome.bookmarks.getSubTree(e.id, d)))[0];
  if (!a || Ne(e) !== Ae(a)) throw new Error("书签内容已变化，已拒绝删除，请刷新核对后重新确认。");
  if (await z((d) => e.kind === "folder" ? chrome.bookmarks.removeTree(e.id, d) : chrome.bookmarks.remove(e.id, d)), (await z((d) => chrome.bookmarks.getChildren(i.parentId, d))).some((d) => d.id === e.id)) throw new Error("删除结果未确认，请刷新核对，不要重复提交。");
  e.kind === "link" && Oe(e.id);
}
async function gt(e, i) {
  const a = fe(i), m = (await z((s) => chrome.bookmarks.get(e, s)))[0];
  if (!m || m.url || e === "0") throw new Error("无法在该位置创建文件夹，请刷新核对。");
  const d = await z((s) => chrome.bookmarks.create({ parentId: e, title: a }, s));
  if (!d?.id || d.parentId !== e || d.title !== a) throw new Error("创建结果未确认，请刷新核对，不要重复提交。");
  return a;
}
const bt = {
  class: "launcher-page-tabs bookmark-section-tabs",
  "aria-label": "书签板块",
  role: "tablist"
}, wt = ["data-bookmark-section", "aria-selected", "disabled", "title", "onClick", "onContextmenu"], yt = { class: "bookmark-board-tools" }, It = ["disabled"], Ct = {
  key: 0,
  class: "bookmark-board-status",
  role: "status"
}, Et = ["data-bookmark-drop", "aria-busy"], Bt = {
  key: 1,
  class: "bookmark-board-empty"
}, xt = ["data-bookmark-drop"], St = {
  key: 1,
  class: "bookmark-board-empty"
}, Tt = {
  key: 1,
  class: "launcher-link"
}, Lt = /* @__PURE__ */ Pe({
  __name: "BookmarkBoard",
  props: {
    headerTarget: {}
  },
  emits: ["busy"],
  setup(e, { emit: i }) {
    const a = De(() => import("./BookmarkFolderDialog-DxhDBW-G.js")), m = De(() => import("./BookmarkBoardMenu-DLCnoTJV.js")), d = e, s = i, r = ae({ sources: [], folders: /* @__PURE__ */ new Map() }), l = D(""), c = D(""), h = D(""), k = D(60), $ = D(60), f = D(!1), g = D(!1), b = D(!1), O = D(""), N = D(""), x = ae({}), w = ae(null), A = D(null);
    let j = 0, I = !0, q, ne = () => {
    };
    const ve = P(() => r.value.sources.map((t) => ({
      value: t.id,
      label: t.title,
      icon: "🔖"
    }))), ee = P(() => r.value.sources.find((t) => t.id === l.value)), K = P(() => ee.value?.sections || []), V = P(() => K.value.find((t) => t.id === c.value)), v = P(() => r.value.folders.get(h.value)), u = P(() => O.value || (g.value && !r.value.sources.length ? "正在读取书签…" : N.value)), S = P(() => b.value || g.value || f.value);
    function Q(t, o) {
      if (!o || o === "0" || !r.value.folders.has(o) || !t.parentId || t.parentId === "0") return !1;
      if (t.kind === "link") return !0;
      const n = /* @__PURE__ */ new Set();
      for (let p = r.value.folders.get(o); p; p = p.parentId ? r.value.folders.get(p.parentId) : void 0) {
        if (p.id === t.id || n.has(p.id)) return !1;
        n.add(p.id);
      }
      return !0;
    }
    const X = P(() => {
      const t = new Map(r.value.folders);
      for (const o of r.value.folders.values()) for (const n of o.items) t.set(n.id, n);
      return t;
    });
    function H(t) {
      return X.value.get(t);
    }
    function R(t, o) {
      const n = document.elementsFromPoint(t, o);
      if (n.some((F) => F.closest(".bookmark-board-menu"))) return null;
      const p = n.map((F) => F.closest("[data-bookmark-section]")).find(Boolean);
      if (p) return { parentId: p.dataset.bookmarkSection, element: p, container: !0 };
      const J = n.map((F) => F.closest("[data-bookmark-node]")).find(Boolean), T = J?.closest("[data-bookmark-grid]") || n.map((F) => F.closest("[data-bookmark-grid], [data-bookmark-drop]")).find(Boolean);
      return T ? { parentId: T.dataset.bookmarkGrid || T.dataset.bookmarkDrop, element: J || T, item: J ? H(J.dataset.bookmarkNode) : void 0 } : null;
    }
    function U() {
      return b.value || w.value && A.value?.canDismiss === !1 ? !1 : (w.value = null, !0);
    }
    const C = dt({
      enabled: () => !S.value,
      parentOf: (t) => t.parentId || "",
      items: (t) => r.value.folders.get(t)?.items || [],
      isFolder: (t) => t.kind === "folder",
      accepts: Q,
      hit: R,
      beforeStart: U,
      commit: async (t, o, n, p) => {
        try {
          await Se(t, o, n, p);
        } catch {
        }
      }
    }), B = C.activeId, G = C.overFolder, Y = C.ghost, ge = C.previews, Z = D(""), ie = P(() => V.value ? ge.value[V.value.id] || V.value.items : []), me = P(() => {
      if (!v.value) return [];
      const t = ge.value[v.value.id] || v.value.items, o = Z.value.trim().toLowerCase();
      return o ? t.filter((n) => (n.title || "").toLowerCase().includes(o) || n.kind === "link" && (n.url || "").toLowerCase().includes(o)) : t;
    }), Ke = P(() => {
      const t = w.value?.item;
      return t ? K.value.filter((o) => o.id !== t.parentId && Q(t, o.id)).map((o) => ({ id: o.id, title: o.title, disabled: !1 })) : [];
    }), Ve = P(() => {
      const t = w.value?.item?.parentId ? r.value.folders.get(w.value.item.parentId) : void 0;
      return t?.parentId && t.parentId !== "0" ? t.parentId : void 0;
    });
    function be(t) {
      b.value || !U() || (C.cancel(), c.value = t, h.value = "", Z.value = "", k.value = 60);
    }
    function We() {
      be(ee.value?.sections[0]?.id || K.value[0]?.id || "");
    }
    function we(t) {
      b.value || !U() || (C.cancel(), h.value = t.id, Z.value = "", $.value = 60);
    }
    function ye() {
      !b.value && !w.value && (C.cancel(), h.value = "", Z.value = "");
    }
    function je() {
      Z.value = "";
      const t = v.value?.parentId, o = t ? r.value.folders.get(t) : void 0;
      !o || o.id === c.value ? ye() : we(o);
    }
    function Ie(t, o) {
      if (C.suppressClick() || b.value) {
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
      o.preventDefault(), N.value = "该书签网址无效，请右键编辑。";
    }
    function ke(t, o, n, p = !1) {
      n.preventDefault(), n.stopPropagation(), !(b.value || !U()) && (C.cancel(), !(t && (!t.parentId || t.parentId === "0")) && (w.value = { item: t, parentId: o, x: n.clientX, y: n.clientY, section: p }));
    }
    function Ce(t, o) {
      o.target.closest("[data-bookmark-node], button, input, .launcher-folder-title-box") || !t || t === "0" || !r.value.folders.has(t) || ke(void 0, t, o);
    }
    function Ee(t, o) {
      ke(t, t.parentId || "", o);
    }
    function He(t) {
      const o = x.value[t] === "large" ? "small" : "large";
      try {
        o === "large" ? localStorage.setItem("bookmarkBoardFolderSize:" + t, "large") : localStorage.removeItem("bookmarkBoardFolderSize:" + t), x.value = { ...x.value, [t]: o };
      } catch {
        N.value = "文件夹大小保存失败。";
      }
    }
    async function le() {
      await Be();
    }
    async function Be(t = !1) {
      if (b.value) return;
      t || C.cancel();
      const o = ++j;
      g.value = !0, O.value = "";
      try {
        const n = await vt();
        if (I && o === j) {
          r.value = ft(n), r.value.sources.some((T) => T.id === l.value) || (l.value = r.value.sources.find((T) => T.id === "1")?.id || r.value.sources[0]?.id || ""), K.value.some((T) => T.id === c.value) || (c.value = K.value[0]?.id || "", h.value = ""), r.value.folders.has(h.value) || (h.value = "");
          const p = {}, J = new Set(r.value.folders.keys());
          for (const T of J)
            try {
              localStorage.getItem("bookmarkBoardFolderSize:" + T) === "large" && (p[T] = "large");
            } catch {
            }
          x.value = p, f.value = !1;
          try {
            const T = new Set(J);
            for (const F of r.value.folders.values())
              for (const _ of F.items) T.add(_.id);
            for (let F = localStorage.length - 1; F >= 0; F--) {
              const _ = localStorage.key(F);
              if (_?.startsWith("bookmarkBoardFolderSize:")) {
                const pe = _.slice(24);
                J.has(pe) || localStorage.removeItem(_);
              } else if (_?.startsWith("bookmarkBoardIcon:")) {
                const pe = _.slice(18);
                T.has(pe) || localStorage.removeItem(_);
              }
            }
          } catch {
          }
        }
      } catch (n) {
        I && o === j && (O.value = n instanceof Error ? n.message : "书签读取失败。", t && (f.value = !0));
      } finally {
        I && o === j && (g.value = !1);
      }
    }
    function xe() {
      b.value || f.value || (clearTimeout(q), q = setTimeout(() => {
        B.value ? xe() : le();
      }, 180));
    }
    async function se(t, o = !1) {
      if (S.value) throw new Error("正在操作或结果未确认，请刷新核对后再操作。");
      o || C.cancel(), clearTimeout(q), ++j, g.value = !1, b.value = !0, s("busy", !0), O.value = "", N.value = "";
      try {
        return await t();
      } catch (n) {
        throw I && (f.value = !0, N.value = "", O.value = n instanceof Error ? n.message : "保存失败，请刷新核对。"), n;
      } finally {
        b.value = !1, s("busy", !1), I && !f.value && await Be(o);
      }
    }
    function Se(t, o, n, p) {
      return Q(t, o) ? se(() => mt(t.id, o, n, p, t.parentId), !0) : Promise.reject(new Error("不能移入自身、子文件夹或浏览器固定根目录。"));
    }
    function Ge(t, o, n) {
      try {
        n = o === "title" ? fe(n) : Xe(n);
      } catch (p) {
        return Promise.reject(p);
      }
      return se(() => pt(t, o, n));
    }
    function Te(t) {
      for (const o of t.items)
        o.kind === "link" ? Oe(o.id) : Te(o);
    }
    function Je(t, o) {
      try {
        o = fe(o);
      } catch (n) {
        return Promise.reject(n);
      }
      return se(() => gt(t, o));
    }
    function _e(t) {
      return se(async () => {
        await ht(t), t.kind === "folder" && Te(t);
      });
    }
    return Ze(() => {
      ne = kt(xe), le();
    }), et(() => {
      I = !1, ++j, ne(), clearTimeout(q), C.cancel();
    }), (t, o) => (y(), L("div", {
      class: "bookmark-board",
      onPointerdown: o[9] || (o[9] = M(() => {
      }, ["stop"])),
      onContextmenu: o[10] || (o[10] = M(() => {
      }, ["stop"])),
      onWheel: o[11] || (o[11] = M(() => {
      }, ["stop"]))
    }, [
      (y(), oe(ze, {
        to: d.headerTarget
      }, [
        te("div", {
          class: "bookmark-board-head",
          onPointerdown: o[1] || (o[1] = M(() => {
          }, ["stop"])),
          onContextmenu: o[2] || (o[2] = M(() => {
          }, ["stop"]))
        }, [
          te("nav", bt, [
            (y(!0), L(he, null, $e(K.value, (n) => (y(), L("button", {
              key: n.id,
              "data-bookmark-section": n.id,
              type: "button",
              role: "tab",
              class: de(["launcher-page-tab", { active: c.value === n.id, "drop-target": E(G) === n.id }]),
              "aria-selected": c.value === n.id,
              "aria-controls": "bookmark-section-panel",
              disabled: b.value,
              title: n.title,
              onClick: (p) => be(n.id),
              onContextmenu: M((p) => ke(n, n.parentId || "", p, !0), ["prevent"])
            }, ue(n.title), 43, wt))), 128))
          ]),
          te("div", yt, [
            r.value.sources.length > 1 ? (y(), oe(it, {
              key: 0,
              modelValue: l.value,
              "onUpdate:modelValue": o[0] || (o[0] = (n) => l.value = n),
              options: ve.value,
              disabled: b.value || !!w.value,
              size: "xs",
              style: { width: "110px" },
              onChange: We
            }, null, 8, ["modelValue", "options", "disabled"])) : W("", !0),
            te("button", {
              type: "button",
              disabled: g.value || b.value,
              title: "刷新书签",
              "aria-label": "刷新书签",
              onClick: le
            }, "↻", 8, It)
          ])
        ], 32)
      ], 8, ["to"])),
      u.value ? (y(), L("span", Ct, ue(u.value), 1)) : W("", !0),
      te("div", {
        id: "bookmark-section-panel",
        class: "launcher-page-panel bookmark-board-content",
        role: "tabpanel",
        "data-bookmark-drop": V.value?.id,
        "aria-busy": g.value || b.value,
        onContextmenu: o[4] || (o[4] = (n) => V.value && Ce(V.value.id, n))
      }, [
        re(Fe, {
          items: ie.value.slice(0, k.value),
          "folder-id": V.value?.id || "",
          busy: b.value,
          "dragged-id": E(B),
          "over-folder": E(G),
          sizes: x.value,
          onPointerDown: E(C).start,
          onActivate: Ie,
          onMenu: Ee
        }, null, 8, ["items", "folder-id", "busy", "dragged-id", "over-folder", "sizes", "onPointerDown"]),
        ie.value.length > k.value ? (y(), L("button", {
          key: 0,
          class: "bookmark-board-more",
          type: "button",
          onClick: o[3] || (o[3] = (n) => k.value += 60)
        }, "显示更多（剩余 " + ue(ie.value.length - k.value) + "）", 1)) : W("", !0),
        !g.value && !ie.value.length ? (y(), L("p", Bt, ue(O.value ? "书签读取失败，请刷新核对" : "暂无书签，右键创建文件夹或拖入网站"), 1)) : W("", !0)
      ], 40, Et),
      v.value ? (y(), oe(E(a), {
        key: 1,
        filter: Z.value,
        "onUpdate:filter": o[7] || (o[7] = (n) => Z.value = n),
        folder: v.value,
        busy: b.value || !!w.value,
        status: u.value,
        onClose: ye,
        onUp: je
      }, {
        default: Me(() => [
          te("div", {
            class: "bookmark-folder-drop-area",
            "data-bookmark-drop": v.value.id,
            onContextmenu: o[6] || (o[6] = (n) => Ce(v.value.id, n))
          }, [
            re(Fe, {
              items: me.value.slice(0, $.value),
              "folder-id": v.value.id,
              busy: b.value,
              "dragged-id": E(B),
              "over-folder": E(G),
              sizes: x.value,
              onPointerDown: E(C).start,
              onActivate: Ie,
              onMenu: Ee
            }, null, 8, ["items", "folder-id", "busy", "dragged-id", "over-folder", "sizes", "onPointerDown"]),
            me.value.length > $.value ? (y(), L("button", {
              key: 0,
              class: "bookmark-board-more",
              type: "button",
              onClick: o[5] || (o[5] = (n) => $.value += 60)
            }, "显示更多")) : W("", !0),
            me.value.length ? W("", !0) : (y(), L("p", St, "暂无书签，可从首页拖入网站"))
          ], 40, xt)
        ]),
        _: 1
      }, 8, ["filter", "folder", "busy", "status"])) : W("", !0),
      w.value ? (y(), oe(E(m), {
        key: `${w.value.item?.id || w.value.parentId}:${w.value.x}:${w.value.y}`,
        ref_key: "menuRef",
        ref: A,
        target: w.value,
        busy: b.value,
        blocked: g.value || f.value,
        size: x.value[w.value.item?.id || ""] || "small",
        "outer-parent-id": Ve.value,
        destinations: Ke.value,
        "save-text": Ge,
        "create-folder": Je,
        remove: _e,
        move: Se,
        onClose: o[8] || (o[8] = (n) => w.value = null),
        onToggleSize: He,
        onRefresh: le
      }, null, 8, ["target", "busy", "blocked", "size", "outer-parent-id", "destinations"])) : W("", !0),
      (y(), oe(ze, { to: "body" }, [
        E(Y) ? (y(), L("div", {
          key: 0,
          class: "launcher-drag-ghost bookmark-drag-ghost",
          style: tt({ left: E(Y).x + "px", top: E(Y).y + "px", width: E(Y).width + "px", height: E(Y).height + "px" }),
          "aria-hidden": "true"
        }, [
          E(Y).item.kind === "folder" ? (y(), L("div", {
            key: 0,
            class: de(["launcher-folder", "size-" + (x.value[E(Y).item.id] || "small")])
          }, [
            re(ce, {
              folder: E(Y).item,
              size: x.value[E(Y).item.id] || "small"
            }, null, 8, ["folder", "size"])
          ], 2)) : (y(), L("div", Tt, [
            re(ce, {
              link: E(Y).item
            }, null, 8, ["link"])
          ]))
        ], 4)) : W("", !0)
      ]))
    ], 32));
  }
}), Mt = /* @__PURE__ */ Re(Lt, [["__scopeId", "data-v-b87ac9c9"]]);
export {
  Mt as default
};
