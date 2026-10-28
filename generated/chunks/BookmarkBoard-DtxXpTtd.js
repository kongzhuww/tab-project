import { d as Re, o as y, c as ae, w as Ue, e as x, F as de, h as he, i as $, B as ce, D as ee, k as ze, J as Ze, L as Qe, N as ie, b as P, C as et, y as tt, f as Q, u as C, t as ne, l as ot, p as rt, g as K, j as Fe, A as nt, E as Pe, s as N } from "./vendor-vue-DokqDua_.js";
import { L as fe, T as at, m as it, o as lt, p as st } from "./main-B0_cYACj.js";
import { _ as Ne } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { b as Me } from "./youtube-store-BnCNbLX-.js";
import { n as ut } from "./view-styles-BdZfWnGM.js";
const dt = ["href", "title", "data-bookmark-node", "onPointerdown", "onClick", "onContextmenu"], ct = ["data-bookmark-node", "title", "onPointerdown", "onClick", "onKeydown", "onContextmenu"], ft = /* @__PURE__ */ Re({
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
  setup(e, { emit: a }) {
    const i = a;
    function v(s) {
      try {
        const u = new URL(s);
        return ["http:", "https:", "ftp:", "file:"].includes(u.protocol) ? s : void 0;
      } catch {
        return;
      }
    }
    return (s, u) => (y(), ae(Ze, {
      key: e.folderId,
      tag: "div",
      class: "launcher-items launcher-site-items bookmark-tiles",
      "data-bookmark-grid": e.folderId,
      name: e.draggedId ? "launcher-grid" : "",
      css: !!e.draggedId
    }, {
      default: Ue(() => [
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
            onDragstart: u[0] || (u[0] = $(() => {
            }, ["prevent"])),
            onPointerdown: (l) => i("pointerDown", n, l),
            onClick: (l) => i("activate", n, l),
            onContextmenu: $((l) => i("menu", n, l), ["prevent", "stop"])
          }, [
            ee(fe, { link: n }, null, 8, ["link"])
          ], 42, dt)) : (y(), x("div", {
            key: 1,
            role: "button",
            tabindex: "0",
            class: ce(["launcher-folder", [`size-${e.sizes[n.id] || "small"}`, { "is-dragging": !e.ghost && e.draggedId === n.id, "drop-target": e.overFolder === n.id }]]),
            "data-bookmark-node": n.id,
            title: `${n.path}
${n.count} 个书签；拖动排序，右键管理`,
            draggable: "false",
            onDragstart: u[1] || (u[1] = $(() => {
            }, ["prevent"])),
            onPointerdown: (l) => i("pointerDown", n, l),
            onClick: (l) => i("activate", n, l),
            onKeydown: [
              ze($((l) => i("activate", n, l), ["prevent"]), ["enter"]),
              ze($((l) => i("activate", n, l), ["prevent"]), ["space"])
            ],
            onContextmenu: $((l) => i("menu", n, l), ["prevent", "stop"])
          }, [
            ee(fe, {
              folder: n,
              size: e.sizes[n.id] || "small"
            }, null, 8, ["folder", "size"])
          ], 42, ct))
        ], 64))), 128))
      ]),
      _: 1
    }, 8, ["data-bookmark-grid", "name", "css"]));
  }
}), $e = /* @__PURE__ */ Ne(ft, [["__scopeId", "data-v-35bd027d"]]);
function vt(e) {
  const a = P(""), i = P(""), v = ie({}), s = ie(null);
  let u = null, n = null, l = 0, c = 0, h = 0, k = 0, R = 0, f = 0, g = !1, w = 0, X = "", j = 0, S = null, b = !1, W = null;
  function H() {
    window.removeEventListener("pointermove", Y), window.removeEventListener("pointerup", O), window.removeEventListener("pointercancel", I), window.removeEventListener("blur", I), window.removeEventListener("keydown", q, !0), window.removeEventListener("pagehide", I), document.removeEventListener("visibilitychange", te);
    try {
      W && n !== null && W.releasePointerCapture(n);
    } catch {
    }
    W = null;
  }
  function I() {
    g && (w = Date.now() + 600), H(), u = null, n = null, g = !1, S = null, a.value = "", i.value = "", v.value = {}, s.value = null, X = "", j = 0;
  }
  function q(p) {
    p.key === "Escape" && (p.preventDefault(), p.stopImmediatePropagation(), I());
  }
  function te() {
    document.hidden && I();
  }
  function le(p, d) {
    if (d.button !== 0 || !d.isPrimary || !e.enabled() || e.beforeStart?.() === !1) return;
    I(), u = p, n = d.pointerId, l = d.clientX, c = d.clientY, W = d.currentTarget;
    const L = W.getBoundingClientRect();
    h = d.clientX - L.left, k = d.clientY - L.top, R = L.width, f = L.height;
    try {
      W.setPointerCapture(d.pointerId);
    } catch {
    }
    window.addEventListener("pointermove", Y, { passive: !1 }), window.addEventListener("pointerup", O), window.addEventListener("pointercancel", I), window.addEventListener("blur", I), window.addEventListener("keydown", q, !0), window.addEventListener("pagehide", I), document.addEventListener("visibilitychange", te);
  }
  function Y(p) {
    if (!u || p.pointerId !== n) return;
    if (!e.enabled()) {
      I();
      return;
    }
    if (!g && Math.hypot(p.clientX - l, p.clientY - c) <= at) return;
    p.preventDefault(), g = !0, a.value = u.id, s.value = { item: u, x: p.clientX - h, y: p.clientY - k, width: R, height: f };
    const d = e.hit(p.clientX, p.clientY);
    if (!d) {
      S = null, i.value = "";
      return;
    }
    const L = d.element.getBoundingClientRect(), oe = it(L, p.clientX, p.clientY), A = d.item && d.item.id !== u.id && e.isFolder(d.item) && oe && e.accepts(u, d.item.id);
    if (d.container || A) {
      const B = A ? d.item.id : d.parentId;
      if (!e.accepts(u, B)) {
        S = null, i.value = "";
        return;
      }
      S = B, b = !0, i.value = B;
      return;
    }
    if (!e.accepts(u, d.parentId)) {
      S = null, i.value = "";
      return;
    }
    i.value = "", S = d.parentId, b = !1;
    const V = e.parentOf(u), D = [...v.value[d.parentId] || e.items(d.parentId)], E = D.findIndex((B) => B.id === u.id), _ = d.item ? D.findIndex((B) => B.id === d.item.id) : -1;
    if (d.item && d.item.id !== u.id) {
      if (!lt(L, p.clientX, p.clientY)) return;
      const B = d.parentId + ":" + d.item.id, z = Date.now();
      if (B === X && z - j < st || _ < 0 || E === _) return;
      E >= 0 && D.splice(E, 1), D.splice(_, 0, u), X = B, j = z;
    } else if (E < 0) D.push(u);
    else return;
    v.value = {
      ...V === d.parentId ? {} : { [V]: e.items(V).filter((B) => B.id !== u.id) },
      [d.parentId]: D
    };
  }
  async function O(p) {
    if (p.pointerId !== n) return;
    g && Y(p);
    const d = u, L = S, oe = g && !!d && !!L && e.enabled(), A = L && !b ? v.value[L] : void 0, V = d && A ? A.findIndex((z) => z.id === d.id) + 1 : 0, D = A && V > 0 ? A[V]?.id : void 0, E = b ? L !== (d && e.parentOf(d)) : !!A, _ = v.value, B = !b && !D;
    if (I(), oe && E) {
      v.value = _;
      try {
        await e.commit(d, L, D, B);
      } finally {
        v.value = {};
      }
    } else
      v.value = {};
  }
  function U() {
    return g || Date.now() < w;
  }
  return Qe(I), { start: le, cancel: I, activeId: a, overFolder: i, previews: v, ghost: s, suppressClick: U };
}
function ge(e) {
  return "bookmarkBoardIcon:" + e;
}
function mt(e) {
  try {
    return localStorage.getItem(ge(e)) || "";
  } catch {
    return "";
  }
}
function Xe(e) {
  try {
    localStorage.removeItem(ge(e));
  } catch {
  }
}
function kt(e) {
  if (!e || e.length > 2 * 1024 * 1024) throw new Error("头像为空或超过2MiB。");
  if (/^data:image\/(?:png|jpeg|gif|webp|svg\+xml);base64,[A-Za-z0-9+/=\s]+$/.test(e)) return e;
  try {
    const a = new URL(e);
    if (["https:", "http:"].includes(a.protocol) && !a.username && !a.password) return e;
  } catch {
  }
  throw new Error("请使用图片文件或不含账号密码的HTTP(S)图片地址。");
}
function pt(e) {
  const a = /* @__PURE__ */ new Map();
  function i(s, u) {
    const n = s.title || "未命名文件夹", l = [...u, n], c = {
      kind: "folder",
      id: s.id,
      parentId: s.parentId,
      title: n,
      path: l.join(" / "),
      items: [],
      preview: [],
      count: 0
    };
    a.set(s.id, c);
    for (const h of s.children || [])
      if (h.url) {
        const k = {
          kind: "link",
          id: h.id,
          parentId: s.id,
          title: h.title || h.url,
          url: h.url,
          customIcon: mt(h.id)
        };
        c.items.push(k), c.count++, c.preview.length < 9 && c.preview.push(k);
      } else {
        const k = i(h, l);
        c.items.push(k), c.count += k.count, c.preview.push(...k.preview.slice(0, 9 - c.preview.length));
      }
    return c;
  }
  const v = [];
  for (const s of e) for (const u of s.children || []) {
    if (u.url) continue;
    const n = (u.title || "").replace(/[\s_-]/g, "").toLowerCase();
    if (/^(?:工作区|工作區|工作空间|工作空間|(?:microsoft)?edge工作区|(?:microsoft)?edgeworkspaces?|workspaces?)$/.test(n)) continue;
    const l = i(u, []);
    if (!l.items.length) continue;
    const c = l.items.filter((k) => k.kind === "folder"), h = l.items.filter((k) => k.kind === "link");
    if (h.length) {
      const k = { ...l, title: c.length ? "未分组书签" : l.title, items: h };
      a.set(l.id, k), c.unshift(k);
    }
    v.push({ id: u.id, title: l.title, sections: c });
  }
  return { sources: v, folders: a };
}
function F(e) {
  return new Promise((a, i) => {
    const v = setTimeout(() => i(new Error("书签操作结果未确认，请刷新核对，不要重复提交。")), 1e4);
    try {
      e((s) => {
        const u = !!chrome.runtime?.lastError;
        clearTimeout(v), u ? i(new Error("浏览器书签操作失败，请刷新核对。")) : a(s);
      });
    } catch {
      clearTimeout(v), i(new Error("浏览器书签接口不可用。"));
    }
  });
}
function ht() {
  return typeof chrome > "u" || !chrome.bookmarks?.getTree ? Promise.reject(new Error("当前页面无法读取浏览器书签，请在扩展新标签页打开。")) : F((e) => chrome.bookmarks.getTree(e));
}
async function gt(e, a, i, v = !1, s) {
  const u = await F((f) => chrome.bookmarks.get(e, f)), n = await F((f) => chrome.bookmarks.get(a, f)), l = u[0];
  if (!l?.parentId || l.parentId === "0" || !n[0] || n[0].url || a === "0") throw new Error("书签或目标文件夹已变化，或是浏览器固定目录，请刷新后再移动。");
  if (s && l.parentId !== s) throw new Error("该节点已被其他页面移动，请刷新核对后再操作。");
  if (!l.url) {
    let f = n[0];
    const g = /* @__PURE__ */ new Set();
    for (; f; ) {
      if (f.id === e) throw new Error("不能把文件夹移入自身或子文件夹。");
      if (!f.parentId) break;
      if (g.has(f.id)) throw new Error("目录结构异常，请刷新核对。");
      g.add(f.id), f = (await F((w) => chrome.bookmarks.get(f.parentId, w)))[0];
    }
  }
  let c;
  if (i) {
    if (i === e) return;
    const f = (await F((g) => chrome.bookmarks.get(i, g)))[0];
    if (!f || f.parentId !== a || f.index === void 0) throw new Error("目标书签已变化，请刷新后再移动。");
    c = f.index, l.parentId === a && l.index !== void 0 && l.index < c && c--;
  } else if (l.parentId === a) {
    if (!v) return;
    const f = await F((g) => chrome.bookmarks.getChildren(a, g));
    if (c = Math.max(0, f.length - 1), l.index === c) return;
  }
  const h = await F((f) => chrome.bookmarks.move(e, { parentId: a, ...c === void 0 ? {} : { index: c } }, f));
  if (h?.id !== e || h.parentId !== a) throw new Error("移动结果未确认，请刷新核对，不要重复提交。");
  const k = await F((f) => chrome.bookmarks.getChildren(a, f)), R = k.findIndex((f) => f.id === e);
  if (R < 0 || (i ? k[R + 1]?.id !== i : R !== k.length - 1))
    throw new Error("书签排列结果未确认，请刷新核对，不要重复提交。");
}
function wt(e) {
  if (typeof chrome > "u" || !chrome.bookmarks) return () => {
  };
  const a = [
    chrome.bookmarks.onCreated,
    chrome.bookmarks.onRemoved,
    chrome.bookmarks.onChanged,
    chrome.bookmarks.onMoved,
    chrome.bookmarks.onChildrenReordered,
    chrome.bookmarks.onImportEnded
  ];
  for (const i of a) i?.addListener(e);
  return () => {
    for (const i of a) i?.removeListener(e);
  };
}
function ve(e) {
  const a = e.trim();
  if (!a || a.length > 100) throw new Error("名称不能为空，且最多100个字符。");
  return a;
}
function Ye(e) {
  const a = e.trim();
  try {
    const i = new URL(a);
    if (!["http:", "https:"].includes(i.protocol) || i.username || i.password) throw new Error();
  } catch {
    throw new Error("请填写不含账号密码的 HTTP(S) 网址。");
  }
  return a;
}
async function we(e) {
  const a = (await F((i) => chrome.bookmarks.get(e, i)))[0];
  if (!a?.parentId || a.parentId === "0") throw new Error("浏览器固定目录不能修改。");
  return a;
}
async function bt(e, a, i) {
  const v = a === "title" ? ve(i) : Ye(i), s = await we(e.id), u = a === "title" ? s.title || s.url || "未命名文件夹" : s.url, n = a === "title" ? e.title : e.kind === "link" ? e.url : void 0;
  if (u !== n || a === "url" && !s.url) throw new Error("该字段已在其他页面修改，请刷新核对后再编辑。");
  const l = await F((c) => chrome.bookmarks.update(e.id, { [a]: v }, c));
  if (l?.id !== e.id || l[a] !== v) throw new Error("保存结果未确认，请刷新核对，不要重复提交。");
  return v;
}
async function yt(e, a) {
  const i = kt(a);
  if ((await we(e.id)).url !== e.url) throw new Error("网站网址已变化，请刷新后重新选择头像。");
  const s = ge(e.id);
  if ((localStorage.getItem(s) || "") !== (e.customIcon || "")) throw new Error("头像已在其他页面修改，请刷新核对。");
  if (localStorage.setItem(s, i), localStorage.getItem(s) !== i) throw new Error("头像保存未确认，请刷新核对，不要重复提交。");
}
function Oe(e) {
  return JSON.stringify(e.kind === "link" ? [e.id, e.title, e.url] : [e.id, e.title, e.items.map(Oe)]);
}
function Ae(e) {
  return JSON.stringify(e.url ? [e.id, e.title || e.url, e.url] : [e.id, e.title || "未命名文件夹", (e.children || []).map(Ae)]);
}
async function It(e) {
  const a = await we(e.id), i = (await F((s) => chrome.bookmarks.getSubTree(e.id, s)))[0];
  if (!i || Oe(e) !== Ae(i)) throw new Error("书签内容已变化，已拒绝删除，请刷新核对后重新确认。");
  if (await F((s) => e.kind === "folder" ? chrome.bookmarks.removeTree(e.id, s) : chrome.bookmarks.remove(e.id, s)), (await F((s) => chrome.bookmarks.getChildren(a.parentId, s))).some((s) => s.id === e.id)) throw new Error("删除结果未确认，请刷新核对，不要重复提交。");
  e.kind === "link" && Xe(e.id);
}
async function Et(e, a) {
  const i = ve(a), v = (await F((u) => chrome.bookmarks.get(e, u)))[0];
  if (!v || v.url || e === "0") throw new Error("无法在该位置创建文件夹，请刷新核对。");
  const s = await F((u) => chrome.bookmarks.create({ parentId: e, title: i }, u));
  if (!s?.id || s.parentId !== e || s.title !== i) throw new Error("创建结果未确认，请刷新核对，不要重复提交。");
  return i;
}
const Ct = {
  class: "launcher-page-tabs bookmark-section-tabs",
  "aria-label": "书签板块",
  role: "tablist"
}, Bt = ["data-bookmark-section", "aria-selected", "disabled", "title", "onClick", "onContextmenu"], xt = { class: "bookmark-board-tools" }, St = ["disabled"], Lt = ["value"], Tt = ["disabled"], Dt = {
  key: 0,
  class: "bookmark-board-status",
  role: "status"
}, zt = ["data-bookmark-drop", "aria-busy"], Ft = {
  key: 1,
  class: "bookmark-board-empty"
}, Pt = ["data-bookmark-drop"], Mt = {
  key: 1,
  class: "bookmark-board-empty"
}, $t = {
  key: 1,
  class: "launcher-link"
}, Rt = /* @__PURE__ */ Re({
  __name: "BookmarkBoard",
  props: {
    headerTarget: {}
  },
  emits: ["busy"],
  setup(e, { emit: a }) {
    const i = Pe(() => import("./BookmarkFolderDialog-BXBqSd5L.js")), v = Pe(() => import("./BookmarkBoardMenu-Fz9cV5FT.js")), s = e, u = a, n = ie({ sources: [], folders: /* @__PURE__ */ new Map() }), l = P(""), c = P(""), h = P(""), k = P(60), R = P(60), f = P(!1), g = P(!1), w = P(!1), X = P(""), j = P(""), S = ie({}), b = ie(null), W = P(null);
    let H = 0, I = !0, q, te = () => {
    };
    const le = N(() => n.value.sources.find((o) => o.id === l.value)), Y = N(() => le.value?.sections || []), O = N(() => Y.value.find((o) => o.id === c.value)), U = N(() => n.value.folders.get(h.value)), p = N(() => X.value || (g.value && !n.value.sources.length ? "正在读取书签…" : j.value)), d = N(() => w.value || g.value || f.value);
    function L(o, t) {
      if (!t || t === "0" || !n.value.folders.has(t) || !o.parentId || o.parentId === "0") return !1;
      if (o.kind === "link") return !0;
      const r = /* @__PURE__ */ new Set();
      for (let m = n.value.folders.get(t); m; m = m.parentId ? n.value.folders.get(m.parentId) : void 0) {
        if (m.id === o.id || r.has(m.id)) return !1;
        r.add(m.id);
      }
      return !0;
    }
    const oe = N(() => {
      const o = new Map(n.value.folders);
      for (const t of n.value.folders.values()) for (const r of t.items) o.set(r.id, r);
      return o;
    });
    function A(o) {
      return oe.value.get(o);
    }
    function V(o, t) {
      const r = document.elementsFromPoint(o, t);
      if (r.some((M) => M.closest(".bookmark-board-menu"))) return null;
      const m = r.map((M) => M.closest("[data-bookmark-section]")).find(Boolean);
      if (m) return { parentId: m.dataset.bookmarkSection, element: m, container: !0 };
      const G = r.map((M) => M.closest("[data-bookmark-node]")).find(Boolean), T = G?.closest("[data-bookmark-grid]") || r.map((M) => M.closest("[data-bookmark-grid], [data-bookmark-drop]")).find(Boolean);
      return T ? { parentId: T.dataset.bookmarkGrid || T.dataset.bookmarkDrop, element: G || T, item: G ? A(G.dataset.bookmarkNode) : void 0 } : null;
    }
    function D() {
      return w.value || b.value && W.value?.canDismiss === !1 ? !1 : (b.value = null, !0);
    }
    const E = vt({
      enabled: () => !d.value,
      parentOf: (o) => o.parentId || "",
      items: (o) => n.value.folders.get(o)?.items || [],
      isFolder: (o) => o.kind === "folder",
      accepts: L,
      hit: V,
      beforeStart: D,
      commit: async (o, t, r, m) => {
        try {
          await Te(o, t, r, m);
        } catch {
        }
      }
    }), _ = E.activeId, B = E.overFolder, z = E.ghost, be = E.previews, Z = P(""), se = N(() => O.value ? be.value[O.value.id] || O.value.items : []), me = N(() => {
      if (!U.value) return [];
      const o = be.value[U.value.id] || U.value.items, t = Z.value.trim().toLowerCase();
      return t ? o.filter((r) => (r.title || "").toLowerCase().includes(t) || r.kind === "link" && (r.url || "").toLowerCase().includes(t)) : o;
    }), je = N(() => {
      const o = b.value?.item;
      return o ? Y.value.filter((t) => t.id !== o.parentId && L(o, t.id)).map((t) => ({ id: t.id, title: t.title, disabled: !1 })) : [];
    }), We = N(() => {
      const o = b.value?.item?.parentId ? n.value.folders.get(b.value.item.parentId) : void 0;
      return o?.parentId && o.parentId !== "0" ? o.parentId : void 0;
    });
    function ye(o) {
      w.value || !D() || (E.cancel(), c.value = o, h.value = "", Z.value = "", k.value = 60);
    }
    function _e() {
      ye(le.value?.sections[0]?.id || Y.value[0]?.id || "");
    }
    function Ie(o) {
      w.value || !D() || (E.cancel(), h.value = o.id, Z.value = "", R.value = 60);
    }
    function Ee() {
      !w.value && !b.value && (E.cancel(), h.value = "", Z.value = "");
    }
    function Ke() {
      Z.value = "";
      const o = U.value?.parentId, t = o ? n.value.folders.get(o) : void 0;
      !t || t.id === c.value ? Ee() : Ie(t);
    }
    function Ce(o, t) {
      if (E.suppressClick() || w.value) {
        t.preventDefault();
        return;
      }
      if (o.kind === "folder") {
        Ie(o);
        return;
      }
      try {
        if (["http:", "https:", "ftp:", "file:"].includes(new URL(o.url).protocol)) return;
      } catch {
      }
      t.preventDefault(), j.value = "该书签网址无效，请右键编辑。";
    }
    function ke(o, t, r, m = !1) {
      r.preventDefault(), r.stopPropagation(), !(w.value || !D()) && (E.cancel(), !(o && (!o.parentId || o.parentId === "0")) && (b.value = { item: o, parentId: t, x: r.clientX, y: r.clientY, section: m }));
    }
    function Be(o, t) {
      t.target.closest("[data-bookmark-node], button, input, .launcher-folder-title-box") || !o || o === "0" || !n.value.folders.has(o) || ke(void 0, o, t);
    }
    function xe(o, t) {
      ke(o, o.parentId || "", t);
    }
    function He(o) {
      const t = S.value[o] === "large" ? "small" : "large";
      try {
        t === "large" ? localStorage.setItem("bookmarkBoardFolderSize:" + o, "large") : localStorage.removeItem("bookmarkBoardFolderSize:" + o), S.value = { ...S.value, [o]: t };
      } catch {
        j.value = "文件夹大小保存失败。";
      }
    }
    async function ue() {
      await Se();
    }
    async function Se(o = !1) {
      if (w.value) return;
      o || E.cancel();
      const t = ++H;
      g.value = !0, X.value = "";
      try {
        const r = await ht();
        if (I && t === H) {
          n.value = pt(r), n.value.sources.some((T) => T.id === l.value) || (l.value = n.value.sources.find((T) => T.id === "1")?.id || n.value.sources[0]?.id || ""), Y.value.some((T) => T.id === c.value) || (c.value = Y.value[0]?.id || "", h.value = ""), n.value.folders.has(h.value) || (h.value = "");
          const m = {}, G = new Set(n.value.folders.keys());
          for (const T of G)
            try {
              localStorage.getItem("bookmarkBoardFolderSize:" + T) === "large" && (m[T] = "large");
            } catch {
            }
          S.value = m, f.value = !1;
          try {
            const T = new Set(G);
            for (const M of n.value.folders.values())
              for (const J of M.items) T.add(J.id);
            for (let M = localStorage.length - 1; M >= 0; M--) {
              const J = localStorage.key(M);
              if (J?.startsWith("bookmarkBoardFolderSize:")) {
                const pe = J.slice(24);
                G.has(pe) || localStorage.removeItem(J);
              } else if (J?.startsWith("bookmarkBoardIcon:")) {
                const pe = J.slice(18);
                T.has(pe) || localStorage.removeItem(J);
              }
            }
          } catch {
          }
        }
      } catch (r) {
        I && t === H && (X.value = r instanceof Error ? r.message : "书签读取失败。", o && (f.value = !0));
      } finally {
        I && t === H && (g.value = !1);
      }
    }
    function Le() {
      w.value || f.value || (clearTimeout(q), q = setTimeout(() => {
        _.value ? Le() : ue();
      }, 180));
    }
    async function re(o, t = !1) {
      if (d.value) throw new Error("正在操作或结果未确认，请刷新核对后再操作。");
      t || E.cancel(), clearTimeout(q), ++H, g.value = !1, w.value = !0, u("busy", !0), X.value = "", j.value = "";
      try {
        return await o();
      } catch (r) {
        throw I && (f.value = !0, j.value = "", X.value = r instanceof Error ? r.message : "保存失败，请刷新核对。"), r;
      } finally {
        w.value = !1, u("busy", !1), I && !f.value && await Se(t);
      }
    }
    function Te(o, t, r, m) {
      return L(o, t) ? re(() => gt(o.id, t, r, m, o.parentId), !0) : Promise.reject(new Error("不能移入自身、子文件夹或浏览器固定根目录。"));
    }
    function Ve(o, t, r) {
      try {
        r = t === "title" ? ve(r) : Ye(r);
      } catch (m) {
        return Promise.reject(m);
      }
      return re(() => bt(o, t, r));
    }
    function Ge(o) {
      if (o.kind !== "link" || d.value || !D()) return;
      const t = { ...o }, r = t.title || t.url;
      Me.openIconPicker(t.title || "网站", r, t.url, "", async (m) => {
        if (!I) throw new Error("书签界面已关闭，请重新打开后选择头像。");
        await re(() => yt(t, m));
      }), Me.searchIcons(r, t.url).catch(() => {
        ut.show({ appName: "书签", title: "头像搜索未完成", message: "请在现有选择器内手动搜索或选择图片。" });
      });
    }
    function De(o) {
      for (const t of o.items)
        t.kind === "link" ? Xe(t.id) : De(t);
    }
    function Je(o, t) {
      try {
        t = ve(t);
      } catch (r) {
        return Promise.reject(r);
      }
      return re(() => Et(o, t));
    }
    function qe(o) {
      return re(async () => {
        await It(o), o.kind === "folder" && De(o);
      });
    }
    return et(() => {
      te = wt(Le), ue();
    }), tt(() => {
      I = !1, ++H, te(), clearTimeout(q), E.cancel();
    }), (o, t) => (y(), x("div", {
      class: "bookmark-board",
      onPointerdown: t[9] || (t[9] = $(() => {
      }, ["stop"])),
      onContextmenu: t[10] || (t[10] = $(() => {
      }, ["stop"])),
      onWheel: t[11] || (t[11] = $(() => {
      }, ["stop"]))
    }, [
      (y(), ae(Fe, {
        to: s.headerTarget
      }, [
        Q("div", {
          class: "bookmark-board-head",
          onPointerdown: t[1] || (t[1] = $(() => {
          }, ["stop"])),
          onContextmenu: t[2] || (t[2] = $(() => {
          }, ["stop"]))
        }, [
          Q("nav", Ct, [
            (y(!0), x(de, null, he(Y.value, (r) => (y(), x("button", {
              key: r.id,
              "data-bookmark-section": r.id,
              type: "button",
              role: "tab",
              class: ce(["launcher-page-tab", { active: c.value === r.id, "drop-target": C(B) === r.id }]),
              "aria-selected": c.value === r.id,
              "aria-controls": "bookmark-section-panel",
              disabled: w.value,
              title: r.title,
              onClick: (m) => ye(r.id),
              onContextmenu: $((m) => ke(r, r.parentId || "", m, !0), ["prevent"])
            }, ne(r.title), 43, Bt))), 128))
          ]),
          Q("div", xt, [
            n.value.sources.length > 1 ? ot((y(), x("select", {
              key: 0,
              "onUpdate:modelValue": t[0] || (t[0] = (r) => l.value = r),
              disabled: w.value || !!b.value,
              "aria-label": "书签来源",
              onChange: _e
            }, [
              (y(!0), x(de, null, he(n.value.sources, (r) => (y(), x("option", {
                key: r.id,
                value: r.id
              }, ne(r.title), 9, Lt))), 128))
            ], 40, St)), [
              [rt, l.value]
            ]) : K("", !0),
            Q("button", {
              type: "button",
              disabled: g.value || w.value,
              title: "刷新书签",
              "aria-label": "刷新书签",
              onClick: ue
            }, "↻", 8, Tt)
          ])
        ], 32)
      ], 8, ["to"])),
      p.value ? (y(), x("span", Dt, ne(p.value), 1)) : K("", !0),
      Q("div", {
        id: "bookmark-section-panel",
        class: "launcher-page-panel bookmark-board-content",
        role: "tabpanel",
        "data-bookmark-drop": O.value?.id,
        "aria-busy": g.value || w.value,
        onContextmenu: t[4] || (t[4] = (r) => O.value && Be(O.value.id, r))
      }, [
        ee($e, {
          items: se.value.slice(0, k.value),
          "folder-id": O.value?.id || "",
          busy: w.value,
          "dragged-id": C(_),
          "over-folder": C(B),
          sizes: S.value,
          onPointerDown: C(E).start,
          onActivate: Ce,
          onMenu: xe
        }, null, 8, ["items", "folder-id", "busy", "dragged-id", "over-folder", "sizes", "onPointerDown"]),
        se.value.length > k.value ? (y(), x("button", {
          key: 0,
          class: "bookmark-board-more",
          type: "button",
          onClick: t[3] || (t[3] = (r) => k.value += 60)
        }, "显示更多（剩余 " + ne(se.value.length - k.value) + "）", 1)) : K("", !0),
        !g.value && !se.value.length ? (y(), x("p", Ft, ne(X.value ? "书签读取失败，请刷新核对" : "暂无书签，右键创建文件夹或拖入网站"), 1)) : K("", !0)
      ], 40, zt),
      U.value ? (y(), ae(C(i), {
        key: 1,
        filter: Z.value,
        "onUpdate:filter": t[7] || (t[7] = (r) => Z.value = r),
        folder: U.value,
        busy: w.value || !!b.value,
        status: p.value,
        onClose: Ee,
        onUp: Ke
      }, {
        default: Ue(() => [
          Q("div", {
            class: "bookmark-folder-drop-area",
            "data-bookmark-drop": U.value.id,
            onContextmenu: t[6] || (t[6] = (r) => Be(U.value.id, r))
          }, [
            ee($e, {
              items: me.value.slice(0, R.value),
              "folder-id": U.value.id,
              busy: w.value,
              "dragged-id": C(_),
              "over-folder": C(B),
              sizes: S.value,
              onPointerDown: C(E).start,
              onActivate: Ce,
              onMenu: xe
            }, null, 8, ["items", "folder-id", "busy", "dragged-id", "over-folder", "sizes", "onPointerDown"]),
            me.value.length > R.value ? (y(), x("button", {
              key: 0,
              class: "bookmark-board-more",
              type: "button",
              onClick: t[5] || (t[5] = (r) => R.value += 60)
            }, "显示更多")) : K("", !0),
            me.value.length ? K("", !0) : (y(), x("p", Mt, "暂无书签，可从首页拖入网站"))
          ], 40, Pt)
        ]),
        _: 1
      }, 8, ["filter", "folder", "busy", "status"])) : K("", !0),
      b.value ? (y(), ae(C(v), {
        key: `${b.value.item?.id || b.value.parentId}:${b.value.x}:${b.value.y}`,
        ref_key: "menuRef",
        ref: W,
        target: b.value,
        busy: w.value,
        blocked: g.value || f.value,
        size: S.value[b.value.item?.id || ""] || "small",
        "outer-parent-id": We.value,
        destinations: je.value,
        "save-text": Ve,
        "create-folder": Je,
        remove: qe,
        move: Te,
        onClose: t[8] || (t[8] = (r) => b.value = null),
        onToggleSize: He,
        onRefresh: ue,
        onChangeIcon: Ge
      }, null, 8, ["target", "busy", "blocked", "size", "outer-parent-id", "destinations"])) : K("", !0),
      (y(), ae(Fe, { to: "body" }, [
        C(z) ? (y(), x("div", {
          key: 0,
          class: "launcher-drag-ghost bookmark-drag-ghost",
          style: nt({ left: C(z).x + "px", top: C(z).y + "px", width: C(z).width + "px", height: C(z).height + "px" }),
          "aria-hidden": "true"
        }, [
          C(z).item.kind === "folder" ? (y(), x("div", {
            key: 0,
            class: ce(["launcher-folder", "size-" + (S.value[C(z).item.id] || "small")])
          }, [
            ee(fe, {
              folder: C(z).item,
              size: S.value[C(z).item.id] || "small"
            }, null, 8, ["folder", "size"])
          ], 2)) : (y(), x("div", $t, [
            ee(fe, {
              link: C(z).item
            }, null, 8, ["link"])
          ]))
        ], 4)) : K("", !0)
      ]))
    ], 32));
  }
}), At = /* @__PURE__ */ Ne(Rt, [["__scopeId", "data-v-7b98f145"]]);
export {
  At as default
};
