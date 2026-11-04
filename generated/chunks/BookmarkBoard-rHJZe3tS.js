import { d as Pe, o as y, e as oe, f as $e, g as T, F as he, j as Me, k as $, C as de, s as re, m as Te, J as qe, L as Qe, N as ae, b as D, D as Ze, z as et, h as te, u as E, t as ue, i as A, l as ze, B as tt, E as De, y as P } from "./vendor-vue-FFI3kJnP.js";
import { L as ce, T as ot, q as rt, r as nt, s as at } from "./main-PGpVyRMP.js";
import { _ as Re } from "./_plugin-vue_export-helper-CVWGtx1v.js";
import { C as it } from "./view-styles-3u4F4KhK.js";
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
      default: $e(() => [
        (y(!0), T(he, null, Me(e.items, (r) => (y(), T(he, {
          key: r.id
        }, [
          r.kind === "link" ? (y(), T("a", {
            key: 0,
            class: de(["launcher-link", { "is-dragging": !e.ghost && e.draggedId === r.id }]),
            href: m(r.url),
            title: `${r.title}
${r.url}`,
            target: "_blank",
            rel: "noopener noreferrer",
            "data-bookmark-node": r.id,
            draggable: "false",
            onDragstart: s[0] || (s[0] = $(() => {
            }, ["prevent"])),
            onPointerdown: (l) => a("pointerDown", r, l),
            onClick: (l) => a("activate", r, l),
            onContextmenu: $((l) => a("menu", r, l), ["prevent", "stop"])
          }, [
            re(ce, { link: r }, null, 8, ["link"])
          ], 42, lt)) : (y(), T("div", {
            key: 1,
            role: "button",
            tabindex: "0",
            class: de(["launcher-folder", [`size-${e.sizes[r.id] || "small"}`, { "is-dragging": !e.ghost && e.draggedId === r.id, "drop-target": e.overFolder === r.id }]]),
            "data-bookmark-node": r.id,
            title: `${r.path}
${r.count} 个书签；拖动排序，右键管理`,
            draggable: "false",
            onDragstart: s[1] || (s[1] = $(() => {
            }, ["prevent"])),
            onPointerdown: (l) => a("pointerDown", r, l),
            onClick: (l) => a("activate", r, l),
            onKeydown: [
              Te($((l) => a("activate", r, l), ["prevent"]), ["enter"]),
              Te($((l) => a("activate", r, l), ["prevent"]), ["space"])
            ],
            onContextmenu: $((l) => a("menu", r, l), ["prevent", "stop"])
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
  let s = null, r = null, l = 0, c = 0, h = 0, k = 0, M = 0, f = 0, g = !1, b = 0, N = "", Y = 0, x = null, w = !1, V = null;
  function K() {
    window.removeEventListener("pointermove", ee), window.removeEventListener("pointerup", W), window.removeEventListener("pointercancel", I), window.removeEventListener("blur", I), window.removeEventListener("keydown", q, !0), window.removeEventListener("pagehide", I), document.removeEventListener("visibilitychange", ne);
    try {
      V && r !== null && V.releasePointerCapture(r);
    } catch {
    }
    V = null;
  }
  function I() {
    g && (b = Date.now() + 600), K(), s = null, r = null, g = !1, x = null, i.value = "", a.value = "", m.value = {}, d.value = null, N = "", Y = 0;
  }
  function q(v) {
    v.key === "Escape" && (v.preventDefault(), v.stopImmediatePropagation(), I());
  }
  function ne() {
    document.hidden && I();
  }
  function ve(v, u) {
    if (u.button !== 0 || !u.isPrimary || !e.enabled() || e.beforeStart?.() === !1) return;
    I(), s = v, r = u.pointerId, l = u.clientX, c = u.clientY, V = u.currentTarget;
    const S = V.getBoundingClientRect();
    h = u.clientX - S.left, k = u.clientY - S.top, M = S.width, f = S.height;
    try {
      V.setPointerCapture(u.pointerId);
    } catch {
    }
    window.addEventListener("pointermove", ee, { passive: !1 }), window.addEventListener("pointerup", W), window.addEventListener("pointercancel", I), window.addEventListener("blur", I), window.addEventListener("keydown", q, !0), window.addEventListener("pagehide", I), document.addEventListener("visibilitychange", ne);
  }
  function ee(v) {
    if (!s || v.pointerId !== r) return;
    if (!e.enabled()) {
      I();
      return;
    }
    if (!g && Math.hypot(v.clientX - l, v.clientY - c) <= ot) return;
    v.preventDefault(), g = !0, i.value = s.id, d.value = { item: s, x: v.clientX - h, y: v.clientY - k, width: M, height: f };
    const u = e.hit(v.clientX, v.clientY);
    if (!u) {
      x = null, a.value = "";
      return;
    }
    const S = u.element.getBoundingClientRect(), Q = rt(S, v.clientX, v.clientY), O = u.item && u.item.id !== s.id && e.isFolder(u.item) && Q && e.accepts(s, u.item.id);
    if (u.container || O) {
      const B = O ? u.item.id : u.parentId;
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
    const G = e.parentOf(s), R = [...m.value[u.parentId] || e.items(u.parentId)], U = R.findIndex((B) => B.id === s.id), C = u.item ? R.findIndex((B) => B.id === u.item.id) : -1;
    if (u.item && u.item.id !== s.id) {
      if (!nt(S, v.clientX, v.clientY)) return;
      const B = u.parentId + ":" + u.item.id, H = Date.now();
      if (B === N && H - Y < at || C < 0 || U === C) return;
      U >= 0 && R.splice(U, 1), R.splice(C, 0, s), N = B, Y = H;
    } else if (U < 0) R.push(s);
    else return;
    m.value = {
      ...G === u.parentId ? {} : { [G]: e.items(G).filter((B) => B.id !== s.id) },
      [u.parentId]: R
    };
  }
  async function W(v) {
    if (v.pointerId !== r) return;
    g && ee(v);
    const u = s, S = x, Q = g && !!u && !!S && e.enabled(), O = S && !w ? m.value[S] : void 0, G = u && O ? O.findIndex((H) => H.id === u.id) + 1 : 0, R = O && G > 0 ? O[G]?.id : void 0, U = w ? S !== (u && e.parentOf(u)) : !!O, C = m.value, B = !w && !R;
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
  function j() {
    return g || Date.now() < b;
  }
  return Qe(I), { start: ve, cancel: I, activeId: i, overFolder: a, previews: m, ghost: d, suppressClick: j };
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
function Ne(e) {
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
  const k = await z((f) => chrome.bookmarks.getChildren(i, f)), M = k.findIndex((f) => f.id === e);
  if (M < 0 || (a ? k[M + 1]?.id !== a : M !== k.length - 1))
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
  const m = i === "title" ? fe(a) : Oe(a), d = await Xe(e.id), s = i === "title" ? d.title || d.url || "未命名文件夹" : d.url, r = i === "title" ? e.title : e.kind === "link" ? e.url : void 0;
  if (s !== r || i === "url" && !d.url) throw new Error("该字段已在其他页面修改，请刷新核对后再编辑。");
  const l = await z((c) => chrome.bookmarks.update(e.id, { [i]: m }, c));
  if (l?.id !== e.id || l[i] !== m) throw new Error("保存结果未确认，请刷新核对，不要重复提交。");
  return m;
}
function Ye(e) {
  return JSON.stringify(e.kind === "link" ? [e.id, e.title, e.url] : [e.id, e.title, e.items.map(Ye)]);
}
function Ve(e) {
  return JSON.stringify(e.url ? [e.id, e.title || e.url, e.url] : [e.id, e.title || "未命名文件夹", (e.children || []).map(Ve)]);
}
async function ht(e) {
  const i = await Xe(e.id), a = (await z((d) => chrome.bookmarks.getSubTree(e.id, d)))[0];
  if (!a || Ye(e) !== Ve(a)) throw new Error("书签内容已变化，已拒绝删除，请刷新核对后重新确认。");
  if (await z((d) => e.kind === "folder" ? chrome.bookmarks.removeTree(e.id, d) : chrome.bookmarks.remove(e.id, d)), (await z((d) => chrome.bookmarks.getChildren(i.parentId, d))).some((d) => d.id === e.id)) throw new Error("删除结果未确认，请刷新核对，不要重复提交。");
  e.kind === "link" && Ne(e.id);
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
}, Lt = {
  key: 1,
  class: "launcher-link"
}, Tt = /* @__PURE__ */ Pe({
  __name: "BookmarkBoard",
  props: {
    headerTarget: {}
  },
  emits: ["busy"],
  setup(e, { emit: i }) {
    const a = De(() => import("./BookmarkFolderDialog-Cu8fL-i3.js")), m = De(() => import("./BookmarkBoardMenu-cYeYBUDW.js")), d = e, s = i, r = ae({ sources: [], folders: /* @__PURE__ */ new Map() }), l = D(""), c = D(""), h = D(""), k = D(60), M = D(60), f = D(!1), g = D(!1), b = D(!1), N = D(""), Y = D(""), x = ae({}), w = ae(null), V = D(null);
    let K = 0, I = !0, q, ne = () => {
    };
    const ve = P(() => r.value.sources.map((t) => ({
      value: t.id,
      label: t.title,
      icon: "🔖"
    }))), ee = P(() => r.value.sources.find((t) => t.id === l.value)), W = P(() => ee.value?.sections || []), j = P(() => W.value.find((t) => t.id === c.value)), v = P(() => r.value.folders.get(h.value)), u = P(() => N.value || (g.value && !r.value.sources.length ? "正在读取书签…" : Y.value)), S = P(() => b.value || g.value || f.value);
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
    const O = P(() => {
      const t = new Map(r.value.folders);
      for (const o of r.value.folders.values()) for (const n of o.items) t.set(n.id, n);
      return t;
    });
    function G(t) {
      return O.value.get(t);
    }
    function R(t, o) {
      const n = document.elementsFromPoint(t, o);
      if (n.some((F) => F.closest(".bookmark-board-menu"))) return null;
      const p = n.map((F) => F.closest("[data-bookmark-section]")).find(Boolean);
      if (p) return { parentId: p.dataset.bookmarkSection, element: p, container: !0 };
      const J = n.map((F) => F.closest("[data-bookmark-node]")).find(Boolean), L = J?.closest("[data-bookmark-grid]") || n.map((F) => F.closest("[data-bookmark-grid], [data-bookmark-drop]")).find(Boolean);
      return L ? { parentId: L.dataset.bookmarkGrid || L.dataset.bookmarkDrop, element: J || L, item: J ? G(J.dataset.bookmarkNode) : void 0 } : null;
    }
    function U() {
      return b.value || w.value && V.value?.canDismiss === !1 ? !1 : (w.value = null, !0);
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
    }), B = C.activeId, H = C.overFolder, X = C.ghost, ge = C.previews, Z = D(""), ie = P(() => j.value ? ge.value[j.value.id] || j.value.items : []), me = P(() => {
      if (!v.value) return [];
      const t = ge.value[v.value.id] || v.value.items, o = Z.value.trim().toLowerCase();
      return o ? t.filter((n) => (n.title || "").toLowerCase().includes(o) || n.kind === "link" && (n.url || "").toLowerCase().includes(o)) : t;
    }), We = P(() => {
      const t = w.value?.item;
      return t ? W.value.filter((o) => o.id !== t.parentId && Q(t, o.id)).map((o) => ({ id: o.id, title: o.title, disabled: !1 })) : [];
    }), je = P(() => {
      const t = w.value?.item?.parentId ? r.value.folders.get(w.value.item.parentId) : void 0;
      return t?.parentId && t.parentId !== "0" ? t.parentId : void 0;
    });
    function be(t) {
      b.value || !U() || (C.cancel(), c.value = t, h.value = "", Z.value = "", k.value = 60);
    }
    function Ae() {
      be(ee.value?.sections[0]?.id || W.value[0]?.id || "");
    }
    function we(t) {
      b.value || !U() || (C.cancel(), h.value = t.id, Z.value = "", M.value = 60);
    }
    function ye() {
      !b.value && !w.value && (C.cancel(), h.value = "", Z.value = "");
    }
    function Ke() {
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
      o.preventDefault(), Y.value = "该书签网址无效，请右键编辑。";
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
    function Ge(t) {
      const o = x.value[t] === "large" ? "small" : "large";
      try {
        o === "large" ? localStorage.setItem("bookmarkBoardFolderSize:" + t, "large") : localStorage.removeItem("bookmarkBoardFolderSize:" + t), x.value = { ...x.value, [t]: o };
      } catch {
        Y.value = "文件夹大小保存失败。";
      }
    }
    async function le() {
      await Be();
    }
    async function Be(t = !1) {
      if (b.value) return;
      t || C.cancel();
      const o = ++K;
      g.value = !0, N.value = "";
      try {
        const n = await vt();
        if (I && o === K) {
          r.value = ft(n), r.value.sources.some((L) => L.id === l.value) || (l.value = r.value.sources.find((L) => L.id === "1")?.id || r.value.sources[0]?.id || ""), W.value.some((L) => L.id === c.value) || (c.value = W.value[0]?.id || "", h.value = ""), r.value.folders.has(h.value) || (h.value = "");
          const p = {}, J = new Set(r.value.folders.keys());
          for (const L of J)
            try {
              localStorage.getItem("bookmarkBoardFolderSize:" + L) === "large" && (p[L] = "large");
            } catch {
            }
          x.value = p, f.value = !1;
          try {
            const L = new Set(J);
            for (const F of r.value.folders.values())
              for (const _ of F.items) L.add(_.id);
            for (let F = localStorage.length - 1; F >= 0; F--) {
              const _ = localStorage.key(F);
              if (_?.startsWith("bookmarkBoardFolderSize:")) {
                const pe = _.slice(24);
                J.has(pe) || localStorage.removeItem(_);
              } else if (_?.startsWith("bookmarkBoardIcon:")) {
                const pe = _.slice(18);
                L.has(pe) || localStorage.removeItem(_);
              }
            }
          } catch {
          }
        }
      } catch (n) {
        I && o === K && (N.value = n instanceof Error ? n.message : "书签读取失败。", t && (f.value = !0));
      } finally {
        I && o === K && (g.value = !1);
      }
    }
    function xe() {
      b.value || f.value || (clearTimeout(q), q = setTimeout(() => {
        B.value ? xe() : le();
      }, 180));
    }
    async function se(t, o = !1) {
      if (S.value) throw new Error("正在操作或结果未确认，请刷新核对后再操作。");
      o || C.cancel(), clearTimeout(q), ++K, g.value = !1, b.value = !0, s("busy", !0), N.value = "", Y.value = "";
      try {
        return await t();
      } catch (n) {
        throw I && (f.value = !0, Y.value = "", N.value = n instanceof Error ? n.message : "保存失败，请刷新核对。"), n;
      } finally {
        b.value = !1, s("busy", !1), I && !f.value && await Be(o);
      }
    }
    function Se(t, o, n, p) {
      return Q(t, o) ? se(() => mt(t.id, o, n, p, t.parentId), !0) : Promise.reject(new Error("不能移入自身、子文件夹或浏览器固定根目录。"));
    }
    function He(t, o, n) {
      try {
        n = o === "title" ? fe(n) : Oe(n);
      } catch (p) {
        return Promise.reject(p);
      }
      return se(() => pt(t, o, n));
    }
    function Le(t) {
      for (const o of t.items)
        o.kind === "link" ? Ne(o.id) : Le(o);
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
        await ht(t), t.kind === "folder" && Le(t);
      });
    }
    return Ze(() => {
      ne = kt(xe), le();
    }), et(() => {
      I = !1, ++K, ne(), clearTimeout(q), C.cancel();
    }), (t, o) => (y(), T("div", {
      class: "bookmark-board",
      onPointerdown: o[9] || (o[9] = $(() => {
      }, ["stop"])),
      onContextmenu: o[10] || (o[10] = $(() => {
      }, ["stop"])),
      onWheel: o[11] || (o[11] = $(() => {
      }, ["stop"]))
    }, [
      (y(), oe(ze, {
        to: d.headerTarget
      }, [
        te("div", {
          class: "bookmark-board-head",
          onPointerdown: o[1] || (o[1] = $(() => {
          }, ["stop"])),
          onContextmenu: o[2] || (o[2] = $(() => {
          }, ["stop"]))
        }, [
          te("nav", bt, [
            (y(!0), T(he, null, Me(W.value, (n) => (y(), T("button", {
              key: n.id,
              "data-bookmark-section": n.id,
              type: "button",
              role: "tab",
              class: de(["launcher-page-tab", { active: c.value === n.id, "drop-target": E(H) === n.id }]),
              "aria-selected": c.value === n.id,
              "aria-controls": "bookmark-section-panel",
              disabled: b.value,
              title: n.title,
              onClick: (p) => be(n.id),
              onContextmenu: $((p) => ke(n, n.parentId || "", p, !0), ["prevent"])
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
              onChange: Ae
            }, null, 8, ["modelValue", "options", "disabled"])) : A("", !0),
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
      u.value ? (y(), T("span", Ct, ue(u.value), 1)) : A("", !0),
      te("div", {
        id: "bookmark-section-panel",
        class: "launcher-page-panel bookmark-board-content",
        role: "tabpanel",
        "data-bookmark-drop": j.value?.id,
        "aria-busy": g.value || b.value,
        onContextmenu: o[4] || (o[4] = (n) => j.value && Ce(j.value.id, n))
      }, [
        re(Fe, {
          items: ie.value.slice(0, k.value),
          "folder-id": j.value?.id || "",
          busy: b.value,
          "dragged-id": E(B),
          "over-folder": E(H),
          sizes: x.value,
          onPointerDown: E(C).start,
          onActivate: Ie,
          onMenu: Ee
        }, null, 8, ["items", "folder-id", "busy", "dragged-id", "over-folder", "sizes", "onPointerDown"]),
        ie.value.length > k.value ? (y(), T("button", {
          key: 0,
          class: "bookmark-board-more",
          type: "button",
          onClick: o[3] || (o[3] = (n) => k.value += 60)
        }, "显示更多（剩余 " + ue(ie.value.length - k.value) + "）", 1)) : A("", !0),
        !g.value && !ie.value.length ? (y(), T("p", Bt, ue(N.value ? "书签读取失败，请刷新核对" : "暂无书签，右键创建文件夹或拖入网站"), 1)) : A("", !0)
      ], 40, Et),
      v.value ? (y(), oe(E(a), {
        key: 1,
        filter: Z.value,
        "onUpdate:filter": o[7] || (o[7] = (n) => Z.value = n),
        folder: v.value,
        busy: b.value || !!w.value,
        status: u.value,
        onClose: ye,
        onUp: Ke
      }, {
        default: $e(() => [
          te("div", {
            class: "bookmark-folder-drop-area",
            "data-bookmark-drop": v.value.id,
            onContextmenu: o[6] || (o[6] = (n) => Ce(v.value.id, n))
          }, [
            re(Fe, {
              items: me.value.slice(0, M.value),
              "folder-id": v.value.id,
              busy: b.value,
              "dragged-id": E(B),
              "over-folder": E(H),
              sizes: x.value,
              onPointerDown: E(C).start,
              onActivate: Ie,
              onMenu: Ee
            }, null, 8, ["items", "folder-id", "busy", "dragged-id", "over-folder", "sizes", "onPointerDown"]),
            me.value.length > M.value ? (y(), T("button", {
              key: 0,
              class: "bookmark-board-more",
              type: "button",
              onClick: o[5] || (o[5] = (n) => M.value += 60)
            }, "显示更多")) : A("", !0),
            me.value.length ? A("", !0) : (y(), T("p", St, "暂无书签，可从首页拖入网站"))
          ], 40, xt)
        ]),
        _: 1
      }, 8, ["filter", "folder", "busy", "status"])) : A("", !0),
      w.value ? (y(), oe(E(m), {
        key: `${w.value.item?.id || w.value.parentId}:${w.value.x}:${w.value.y}`,
        ref_key: "menuRef",
        ref: V,
        target: w.value,
        busy: b.value,
        blocked: g.value || f.value,
        size: x.value[w.value.item?.id || ""] || "small",
        "outer-parent-id": je.value,
        destinations: We.value,
        "save-text": He,
        "create-folder": Je,
        remove: _e,
        move: Se,
        onClose: o[8] || (o[8] = (n) => w.value = null),
        onToggleSize: Ge,
        onRefresh: le
      }, null, 8, ["target", "busy", "blocked", "size", "outer-parent-id", "destinations"])) : A("", !0),
      (y(), oe(ze, { to: "body" }, [
        E(X) ? (y(), T("div", {
          key: 0,
          class: "launcher-drag-ghost bookmark-drag-ghost",
          style: tt({ left: E(X).x + "px", top: E(X).y + "px", width: E(X).width + "px", height: E(X).height + "px" }),
          "aria-hidden": "true"
        }, [
          E(X).item.kind === "folder" ? (y(), T("div", {
            key: 0,
            class: de(["launcher-folder", "size-" + (x.value[E(X).item.id] || "small")])
          }, [
            re(ce, {
              folder: E(X).item,
              size: x.value[E(X).item.id] || "small"
            }, null, 8, ["folder", "size"])
          ], 2)) : (y(), T("div", Lt, [
            re(ce, {
              link: E(X).item
            }, null, 8, ["link"])
          ]))
        ], 4)) : A("", !0)
      ]))
    ], 32));
  }
}), $t = /* @__PURE__ */ Re(Tt, [["__scopeId", "data-v-b87ac9c9"]]);
export {
  $t as default
};
