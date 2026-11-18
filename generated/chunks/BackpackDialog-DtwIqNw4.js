import { d as tt, e as a, i as e, H as ae, j as st, W as Bt, I as P, o as r, r as ot, s as V, B as Et, X as Pt, u as p, A as C, t as v, f as m, F as y, l as w, g as I, y as Vt, k as D, n as $, h, m as S, p as F, V as be, S as Je, v as ze, b as k } from "./vendor-vue-BrDsOMg2.js";
import { A as Nt } from "./AppWindowFrame-acZybale.js";
import { _ as nt } from "./_plugin-vue_export-helper-Do3lP4W5.js";
import { w as Ke } from "./window-manager.store-DE8sG7Nf.js";
import { au as Q, av as Y, aw as it, ax as B, ay as E, az as rt, aA as Dt } from "./view-styles-agM3PzgD.js";
import { w as at, P as he, S as lt, p as _e, A as le } from "./revision-guard-5IS-EcTI.js";
import { S as Lt } from "./StickerBoard-C-2RoE0P.js";
import He from "./MessageMarkdown-iQ9VhJuK.js";
const Rt = {
  key: 0,
  class: "backpack-embedded",
  "aria-label": "AI 工作区资料库"
}, Ot = { class: "backpack-embedded-header" }, Ft = { class: "backpack-embedded-brand" }, jt = { class: "backpack-embedded-actions" }, Ut = /* @__PURE__ */ tt({
  inheritAttrs: !1,
  __name: "BackpackFrame",
  props: {
    embedded: { type: Boolean },
    windowId: {},
    title: {}
  },
  emits: ["close", "minimize"],
  setup(o, { emit: i }) {
    const n = i;
    return (u, f) => o.embedded ? (r(), a("section", Rt, [
      e("header", Ot, [
        e("div", Ft, [
          f[2] || (f[2] = e("h2", null, "资料库", -1)),
          ae(u.$slots, "header-tabs", {}, void 0, !0)
        ]),
        e("div", jt, [
          ae(u.$slots, "header-actions", {}, void 0, !0)
        ])
      ]),
      ae(u.$slots, "default", {}, void 0, !0)
    ])) : (r(), st(Nt, Bt({ key: 1 }, u.$attrs, {
      "window-id": o.windowId,
      title: o.title,
      onClose: f[0] || (f[0] = (g) => n("close")),
      onMinimize: f[1] || (f[1] = (g) => n("minimize"))
    }), {
      "header-actions": P(() => [
        ae(u.$slots, "header-actions", {}, void 0, !0)
      ]),
      default: P(() => [
        ae(u.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["window-id", "title"]));
  }
}), Jt = /* @__PURE__ */ nt(Ut, [["__scopeId", "data-v-c4c73990"]]);
function M(o) {
  if (!o) return [];
  const i = /* @__PURE__ */ new Set(), n = /\{\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}\}|\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}/g;
  let u;
  for (; (u = n.exec(o)) !== null; ) {
    const f = u[1] || u[2];
    f && !/^\d+$/.test(f) && i.add(f.trim());
  }
  return Array.from(i);
}
function Qe(o, i) {
  return o ? o.replace(/\{\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}\}|\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}/g, (n, u, f) => {
    const g = (u || f || "").trim();
    return i[g] !== void 0 && i[g] !== "" ? i[g] : n;
  }) : "";
}
const l = ot({
  prompts: [],
  categories: [...it],
  activeCategoryId: "all",
  searchQuery: "",
  selectedTag: null,
  selectedPromptId: null,
  isEditing: !1,
  editingPrompt: null,
  isVariableDialogOpen: !1,
  variableTargetPrompt: null,
  variableFormValues: {},
  isLoading: !1,
  statusMessage: "",
  copySuccessId: null
});
let Ye = !1, Ce = 0, Ge = Promise.resolve();
function fe(o, i) {
  const n = [...i];
  return n.some((u) => u.id === "default") || n.push({ id: "default", name: "默认分组", icon: "📁", isBuiltin: !1 }), { prompts: [...o], categories: n };
}
function zt() {
  try {
    if (typeof localStorage > "u") return null;
    const o = localStorage.getItem(Y), i = localStorage.getItem(Q);
    if (!o && !i) return null;
    const n = o ? JSON.parse(o) : [], u = i ? JSON.parse(i) : null;
    return fe(
      Array.isArray(n) ? n : [],
      Array.isArray(u) && u.length ? u : it
    );
  } catch {
    return null;
  }
}
function ge(o, i) {
  try {
    if (typeof localStorage > "u") return;
    localStorage.setItem(Y, JSON.stringify(o)), localStorage.setItem(Q, JSON.stringify(i));
  } catch (n) {
    console.warn("[Backpack] persistToLocalStorage failed", n);
  }
}
const A = {
  get state() {
    return l;
  },
  async init() {
    if (Ye) return;
    Ye = !0, l.isLoading = !0;
    const o = zt();
    o && o.prompts.length > 0 && (l.prompts = o.prompts, o.categories?.length && (l.categories = o.categories));
    try {
      if (typeof chrome < "u" && chrome.storage?.local) {
        const i = await chrome.storage.local.get([Y, Q, he]);
        Ce = _e(i?.[he]);
        const n = i?.[Y] || l.prompts, u = i?.[Q] || l.categories, f = fe(n, u);
        l.prompts = f.prompts, l.categories = f.categories, JSON.stringify(i?.[Y]) !== JSON.stringify(f.prompts) || JSON.stringify(i?.[Q]) !== JSON.stringify(f.categories) ? await this.save() : ge(f.prompts, f.categories);
      } else {
        const i = fe(l.prompts, l.categories);
        l.prompts = i.prompts, l.categories = i.categories, ge(l.prompts, l.categories);
      }
    } catch (i) {
      console.warn("[Backpack] init storage error:", i);
      const n = fe(l.prompts, l.categories);
      l.prompts = n.prompts, l.categories = n.categories;
    } finally {
      l.isLoading = !1;
    }
  },
  async save() {
    const o = JSON.parse(JSON.stringify(l.prompts)), i = JSON.parse(JSON.stringify(l.categories));
    if (typeof chrome < "u" && chrome.storage?.local) {
      const n = Ge.then(async () => {
        try {
          if (typeof navigator > "u" || !navigator.locks) throw new Error("浏览器不支持安全的背包写入锁");
          return Ce = await at(chrome.storage.local, navigator.locks, he, Ce, {
            [Y]: o,
            [Q]: i
          }), ge(o, i), l.statusMessage = "", !0;
        } catch (u) {
          return l.statusMessage = u instanceof lt ? "提示词已在其他页面更改，当前修改未保存。请先导出本页内容，再刷新并核对。" : "提示词保存失败，当前修改未保存。请先导出本页内容，再检查存储。", console.warn("[Backpack] save failed", u), !1;
        }
      });
      return Ge = n, n;
    }
    return ge(o, i), !0;
  },
  createPrompt(o) {
    const i = Date.now(), n = {
      id: `prompt-${i}-${Math.random().toString(36).slice(2, 7)}`,
      title: o.title.trim() || "未命名提示词",
      content: o.content,
      description: o.description?.trim() || "",
      category: o.category || "default",
      tags: Array.isArray(o.tags) ? o.tags.filter(Boolean) : [],
      pinned: !!o.pinned,
      createdAt: i,
      updatedAt: i,
      useCount: 0
    };
    return l.prompts.unshift(n), this.save(), n;
  },
  updatePrompt(o, i) {
    const n = l.prompts.findIndex((f) => f.id === o);
    if (n === -1) return !1;
    const u = l.prompts[n];
    return l.prompts[n] = {
      ...u,
      ...i,
      updatedAt: Date.now()
    }, this.save(), !0;
  },
  deletePrompt(o) {
    const i = l.prompts.length;
    return l.prompts = l.prompts.filter((n) => n.id !== o), l.selectedPromptId === o && (l.selectedPromptId = null), l.editingPrompt?.id === o && (l.isEditing = !1, l.editingPrompt = null), l.prompts.length !== i ? (this.save(), !0) : !1;
  },
  togglePin(o) {
    const i = l.prompts.find((n) => n.id === o);
    i && (i.pinned = !i.pinned, i.updatedAt = Date.now(), this.save());
  },
  async copyPromptText(o, i) {
    const n = i !== void 0 ? i : o.content;
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(n);
      else {
        const u = document.createElement("textarea");
        u.value = n, u.style.position = "fixed", u.style.opacity = "0", document.body.appendChild(u), u.select(), document.execCommand("copy"), document.body.removeChild(u);
      }
      return o.useCount = (o.useCount || 0) + 1, o.updatedAt = Date.now(), l.copySuccessId = o.id, setTimeout(() => {
        l.copySuccessId === o.id && (l.copySuccessId = null);
      }, 1800), this.save(), !0;
    } catch (u) {
      return console.warn("[Backpack] copy failed", u), !1;
    }
  },
  openVariableDialog(o) {
    const i = M(o.content), n = {};
    for (const u of i)
      n[u] = "";
    l.variableTargetPrompt = o, l.variableFormValues = n, l.isVariableDialogOpen = !0;
  },
  closeVariableDialog() {
    l.isVariableDialogOpen = !1, l.variableTargetPrompt = null, l.variableFormValues = {};
  },
  openEditor(o) {
    o ? l.editingPrompt = { ...o, tags: [...o.tags] } : l.editingPrompt = {
      id: "",
      title: "",
      content: "",
      description: "",
      category: l.activeCategoryId === "all" || l.activeCategoryId === "starred" ? "default" : l.activeCategoryId,
      tags: [],
      pinned: !1,
      createdAt: 0,
      updatedAt: 0,
      useCount: 0
    }, l.isEditing = !0;
  },
  closeEditor() {
    l.isEditing = !1, l.editingPrompt = null;
  },
  saveEditorData(o) {
    l.editingPrompt?.id ? this.updatePrompt(l.editingPrompt.id, o) : this.createPrompt(o), this.closeEditor();
  },
  addCategory(o, i = "📁") {
    const n = o.trim();
    if (!n || l.categories.some((f) => f.name === n)) return !1;
    const u = `cat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    return l.categories.push({ id: u, name: n, icon: i, isBuiltin: !1 }), this.save(), !0;
  },
  renameCategory(o, i) {
    const n = i.trim();
    if (!n) return !1;
    const u = l.categories.find((f) => f.id === o);
    return !u || u.isBuiltin ? !1 : (u.name = n, this.save(), !0);
  },
  deleteCategory(o) {
    const i = l.categories.find((n) => n.id === o);
    if (!i || i.isBuiltin) return !1;
    l.categories = l.categories.filter((n) => n.id !== o), l.activeCategoryId === o && (l.activeCategoryId = "all");
    for (const n of l.prompts)
      n.category === o && (n.category = "default");
    return this.save(), !0;
  },
  exportBackup() {
    const o = {
      version: 1,
      appName: "tab-project-backpack",
      exportedAt: Date.now(),
      prompts: l.prompts,
      categories: l.categories
    }, i = new Blob([JSON.stringify(o, null, 2)], { type: "application/json" }), n = URL.createObjectURL(i), u = document.createElement("a"), f = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    u.href = n, u.download = `prompts-backpack-backup-${f}.json`, document.body.appendChild(u), u.click(), document.body.removeChild(u), URL.revokeObjectURL(n);
  },
  importBackup(o) {
    try {
      const i = JSON.parse(o);
      if (!i || !Array.isArray(i.prompts))
        return { success: !1, count: 0, error: "导入文件格式不合规，缺少 prompts 数组" };
      let n = 0;
      const u = new Set(l.prompts.map((g) => g.id)), f = [];
      for (const g of i.prompts) {
        if (!g || typeof g.title != "string" || typeof g.content != "string")
          continue;
        const _ = {
          id: g.id && !u.has(g.id) ? g.id : `prompt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: g.title.trim() || "未命名提示词",
          content: g.content,
          description: typeof g.description == "string" ? g.description : "",
          category: typeof g.category == "string" ? g.category : "coding",
          tags: Array.isArray(g.tags) ? g.tags.map(String).filter(Boolean) : [],
          pinned: !!g.pinned,
          createdAt: typeof g.createdAt == "number" ? g.createdAt : Date.now(),
          updatedAt: Date.now(),
          useCount: typeof g.useCount == "number" ? g.useCount : 0
        };
        f.push(_), u.add(_.id), n++;
      }
      if (n === 0)
        return { success: !1, count: 0, error: "未在文件中找到有效提示词条目" };
      if (Array.isArray(i.categories))
        for (const g of i.categories)
          g && g.name && !l.categories.some((_) => _.name === g.name) && l.categories.push({
            id: g.id || `cat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: String(g.name).trim(),
            icon: typeof g.icon == "string" ? g.icon : "📁",
            isBuiltin: !1
          });
      return l.prompts = [...f, ...l.prompts], this.save(), { success: !0, count: n };
    } catch (i) {
      return { success: !1, count: 0, error: `解析 JSON 失败: ${i?.message || i}` };
    }
  }
}, we = V(() => {
  const o = l.searchQuery.trim().toLowerCase(), i = l.activeCategoryId, n = l.selectedTag;
  return l.prompts.filter((u) => {
    if (i === "starred") {
      if (!u.pinned) return !1;
    } else if (i !== "all" && u.category !== i)
      return !1;
    if (n && !u.tags.includes(n))
      return !1;
    if (o) {
      const f = u.title.toLowerCase().includes(o), g = u.description?.toLowerCase().includes(o), _ = u.content.toLowerCase().includes(o), N = u.tags.some((L) => L.toLowerCase().includes(o));
      if (!f && !g && !_ && !N)
        return !1;
    }
    return !0;
  }).sort((u, f) => u.pinned && !f.pinned ? -1 : !u.pinned && f.pinned ? 1 : f.updatedAt - u.updatedAt);
}), Ze = V(() => {
  const o = /* @__PURE__ */ new Set();
  for (const i of l.prompts)
    if (Array.isArray(i.tags))
      for (const n of i.tags)
        n.trim() && o.add(n.trim());
  return Array.from(o);
}), d = ot({
  articles: [],
  categories: [...rt],
  activeCategoryId: "all",
  selectedTag: null,
  selectedArticleId: null,
  isEditing: !1,
  editingArticle: null,
  isReading: !1,
  readingArticle: null,
  isLoading: !1,
  copySuccessId: null,
  statusMessage: ""
});
let qe = !1, ve = 0, We = Promise.resolve();
function Kt() {
  try {
    if (typeof localStorage > "u") return null;
    const o = localStorage.getItem(E), i = localStorage.getItem(B);
    if (!o && !i) return null;
    const n = o ? JSON.parse(o) : [], u = i ? JSON.parse(i) : null;
    return {
      articles: Array.isArray(n) ? n : [],
      categories: Array.isArray(u) && u.length ? u : rt
    };
  } catch {
    return null;
  }
}
function Ae(o, i) {
  try {
    if (typeof localStorage > "u") return;
    localStorage.setItem(E, JSON.stringify(o)), localStorage.setItem(B, JSON.stringify(i));
  } catch (n) {
    console.warn("[ArticleService] persistToLocalStorage failed", n);
  }
}
const x = {
  get state() {
    return d;
  },
  async init() {
    if (qe) return;
    qe = !0, d.isLoading = !0;
    const o = Kt();
    o && (d.articles = o.articles, o.categories?.length && (d.categories = o.categories));
    try {
      if (typeof chrome < "u" && chrome.storage?.local) {
        const i = await chrome.storage.local.get([E, B, le]);
        ve = _e(i?.[le]), i?.[E] && Array.isArray(i[E]) && (d.articles = i[E]), i?.[B] && Array.isArray(i[B]) && (d.categories = i[B]), chrome.storage?.onChanged?.addListener && chrome.storage.onChanged.addListener((n, u) => {
          if (u === "local") {
            if (n[le])
              try {
                ve = _e(n[le].newValue);
              } catch {
              }
            n[E] && Array.isArray(n[E].newValue) && (d.articles = n[E].newValue), n[B] && Array.isArray(n[B].newValue) && (d.categories = n[B].newValue);
          }
        });
      } else o || Ae(d.articles, d.categories);
    } catch (i) {
      console.warn("[ArticleService] init storage error:", i);
    } finally {
      d.isLoading = !1;
    }
  },
  async save() {
    const o = JSON.parse(JSON.stringify(d.articles)), i = JSON.parse(JSON.stringify(d.categories));
    if (typeof chrome < "u" && chrome.storage?.local) {
      const n = We.then(async () => {
        try {
          if (typeof navigator > "u" || !navigator.locks) throw new Error("浏览器不支持安全的背包写入锁");
          return ve = await at(chrome.storage.local, navigator.locks, le, ve, {
            [E]: o,
            [B]: i
          }), Ae(o, i), d.statusMessage = "", !0;
        } catch (u) {
          return d.statusMessage = u instanceof lt ? "文章已在其他页面更改，当前修改未保存。请先导出本页内容，再刷新并核对。" : "文章保存失败，当前修改未保存。请先导出本页内容，再检查存储。", console.warn("[ArticleService] save failed", u), !1;
        }
      });
      return We = n, n;
    }
    return Ae(o, i), !0;
  },
  createArticle(o) {
    const i = Date.now(), n = {
      id: `art-${i}-${Math.random().toString(36).slice(2, 7)}`,
      title: o.title.trim() || "未命名文章",
      content: o.content,
      url: o.url?.trim() || "",
      sourceName: o.sourceName?.trim() || "",
      description: o.description?.trim() || "",
      category: o.category || "default",
      tags: Array.isArray(o.tags) ? o.tags.filter(Boolean) : [],
      pinned: !!o.pinned,
      createdAt: i,
      updatedAt: i
    };
    return d.articles.unshift(n), this.save(), n;
  },
  updateArticle(o, i) {
    const n = d.articles.findIndex((f) => f.id === o);
    if (n === -1) return !1;
    const u = d.articles[n];
    return d.articles[n] = {
      ...u,
      ...i,
      updatedAt: Date.now()
    }, this.save(), !0;
  },
  deleteArticle(o) {
    const i = d.articles.length;
    return d.articles = d.articles.filter((n) => n.id !== o), d.selectedArticleId === o && (d.selectedArticleId = null), d.editingArticle?.id === o && (d.isEditing = !1, d.editingArticle = null), d.readingArticle?.id === o && (d.isReading = !1, d.readingArticle = null), d.articles.length !== i ? (this.save(), !0) : !1;
  },
  togglePin(o) {
    const i = d.articles.find((n) => n.id === o);
    i && (i.pinned = !i.pinned, i.updatedAt = Date.now(), this.save());
  },
  async copyArticleText(o) {
    const i = `${o.title}

${o.description ? `${o.description}

` : ""}${o.content}${o.url ? `

原文：${o.url}` : ""}`;
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(i);
      else {
        const n = document.createElement("textarea");
        n.value = i, n.style.position = "fixed", n.style.opacity = "0", document.body.appendChild(n), n.select(), document.execCommand("copy"), document.body.removeChild(n);
      }
      return d.copySuccessId = o.id, setTimeout(() => {
        d.copySuccessId === o.id && (d.copySuccessId = null);
      }, 1800), !0;
    } catch (n) {
      return console.warn("[ArticleService] copy failed", n), !1;
    }
  },
  openEditor(o) {
    d.isReading = !1, o ? d.editingArticle = { ...o, tags: [...o.tags] } : d.editingArticle = {
      id: "",
      title: "",
      content: "",
      url: "",
      sourceName: "",
      description: "",
      category: d.activeCategoryId === "all" || d.activeCategoryId === "starred" ? "default" : d.activeCategoryId,
      tags: [],
      pinned: !1,
      createdAt: 0,
      updatedAt: 0
    }, d.isEditing = !0;
  },
  closeEditor() {
    d.isEditing = !1, d.editingArticle = null;
  },
  openReader(o) {
    d.isEditing = !1, d.readingArticle = o, d.isReading = !0;
  },
  closeReader() {
    d.isReading = !1, d.readingArticle = null;
  },
  saveEditorData(o) {
    d.editingArticle?.id ? this.updateArticle(d.editingArticle.id, o) : this.createArticle(o), this.closeEditor();
  },
  addCategory(o, i = "📁") {
    const n = o.trim();
    if (!n || d.categories.some((f) => f.name === n)) return !1;
    const u = `cat-art-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    return d.categories.push({ id: u, name: n, icon: i, isBuiltin: !1 }), this.save(), !0;
  },
  renameCategory(o, i) {
    const n = i.trim();
    if (!n) return !1;
    const u = d.categories.find((f) => f.id === o);
    return !u || u.isBuiltin ? !1 : (u.name = n, this.save(), !0);
  },
  deleteCategory(o) {
    const i = d.categories.find((n) => n.id === o);
    if (!i || i.isBuiltin) return !1;
    d.categories = d.categories.filter((n) => n.id !== o), d.activeCategoryId === o && (d.activeCategoryId = "all");
    for (const n of d.articles)
      n.category === o && (n.category = "default");
    return this.save(), !0;
  },
  exportBackup() {
    const o = {
      version: 1,
      appName: "tab-project-articles",
      exportedAt: Date.now(),
      articles: d.articles,
      categories: d.categories
    }, i = new Blob([JSON.stringify(o, null, 2)], { type: "application/json" }), n = URL.createObjectURL(i), u = document.createElement("a"), f = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    u.href = n, u.download = `saved-articles-backup-${f}.json`, document.body.appendChild(u), u.click(), document.body.removeChild(u), URL.revokeObjectURL(n);
  },
  importBackup(o) {
    try {
      const i = JSON.parse(o);
      if (!i || !Array.isArray(i.articles))
        return { success: !1, count: 0, error: "导入文件格式不合规，缺少 articles 数组" };
      let n = 0;
      const u = new Set(d.articles.map((g) => g.id)), f = [];
      for (const g of i.articles) {
        if (!g || typeof g.title != "string" || typeof g.content != "string")
          continue;
        const _ = {
          id: g.id && !u.has(g.id) ? g.id : `art-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: g.title.trim() || "未命名文章",
          content: g.content,
          url: typeof g.url == "string" ? g.url : "",
          sourceName: typeof g.sourceName == "string" ? g.sourceName : "",
          description: typeof g.description == "string" ? g.description : "",
          category: typeof g.category == "string" ? g.category : "default",
          tags: Array.isArray(g.tags) ? g.tags.map(String).filter(Boolean) : [],
          pinned: !!g.pinned,
          createdAt: typeof g.createdAt == "number" ? g.createdAt : Date.now(),
          updatedAt: Date.now()
        };
        f.push(_), u.add(_.id), n++;
      }
      if (n === 0)
        return { success: !1, count: 0, error: "未在文件中找到有效文章条目" };
      if (Array.isArray(i.categories))
        for (const g of i.categories)
          g && g.name && !d.categories.some((_) => _.name === g.name) && d.categories.push({
            id: g.id || `cat-art-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: String(g.name).trim(),
            icon: typeof g.icon == "string" ? g.icon : "📁",
            isBuiltin: !1
          });
      return d.articles = [...f, ...d.articles], this.save(), { success: !0, count: n };
    } catch (i) {
      return { success: !1, count: 0, error: `解析 JSON 失败: ${i?.message || i}` };
    }
  }
}, Xe = V(() => {
  const o = d.activeCategoryId, i = d.selectedTag;
  return d.articles.filter((n) => {
    if (o === "starred") {
      if (!n.pinned) return !1;
    } else if (o !== "all" && n.category !== o)
      return !1;
    return !(i && !n.tags.includes(i));
  }).sort((n, u) => n.pinned && !u.pinned ? -1 : !n.pinned && u.pinned ? 1 : u.updatedAt - n.updatedAt);
}), et = V(() => {
  const o = /* @__PURE__ */ new Set();
  for (const i of d.articles)
    if (Array.isArray(i.tags))
      for (const n of i.tags)
        n.trim() && o.add(n.trim());
  return Array.from(o);
}), Ht = {
  class: "bp-seg-tabs",
  role: "tablist",
  "aria-label": "资料库频道"
}, Qt = ["aria-selected"], Yt = ["aria-selected"], Gt = ["aria-selected"], Zt = {
  key: 0,
  class: "bp-search-pill"
}, qt = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Wt = {
  key: 1,
  class: "bp-icon"
}, Xt = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, es = {
  key: 1,
  class: "bp-icon"
}, ts = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.6",
  "stroke-linecap": "round",
  "aria-hidden": "true"
}, ss = {
  key: 1,
  class: "bp-icon"
}, os = {
  key: 0,
  class: "bp-search-pill"
}, ns = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, is = {
  key: 1,
  class: "bp-icon"
}, rs = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, as = {
  key: 1,
  class: "bp-icon"
}, ls = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.6",
  "stroke-linecap": "round",
  "aria-hidden": "true"
}, ds = {
  key: 1,
  class: "bp-icon"
}, cs = {
  key: 0,
  class: "bp-alert-tip-bar"
}, us = {
  key: 1,
  class: "bp-alert-tip-bar",
  role: "alert"
}, ps = {
  key: 2,
  class: "bp-alert-tip-bar",
  role: "alert"
}, bs = { class: "bp-work-area" }, gs = {
  key: 0,
  class: "bp-bili-sidebar"
}, vs = { class: "bp-sidebar-toggle-action" }, fs = { class: "bp-sidebar-toggle-chevron" }, ms = { class: "bp-channels-list" }, ys = ["onClick"], ks = { class: "bp-channel-main" }, hs = { class: "bp-channel-icon" }, Cs = { class: "bp-channel-text" }, ws = { class: "bp-channel-badge" }, As = { class: "bp-sidebar-favorite-hub" }, _s = { class: "bp-hub-main" }, $s = {
  key: 0,
  class: "bp-hub-icon"
}, Ss = { class: "bp-hub-text" }, xs = { key: 0 }, Is = {
  key: 0,
  class: "bp-add-category-box"
}, Ts = { class: "bp-folder-list" }, Ms = {
  key: 0,
  class: "bp-folder-inline-edit"
}, Bs = ["onKeydown"], Es = ["onClick"], Ps = ["onClick"], Vs = {
  key: 0,
  class: "bp-folder-icon"
}, Ns = ["title"], Ds = {
  key: 1,
  class: "bp-folder-badge"
}, Ls = {
  key: 2,
  class: "bp-folder-badge"
}, Rs = {
  key: 3,
  class: "bp-folder-badge"
}, Os = {
  key: 2,
  class: "bp-folder-actions"
}, Fs = ["onClick"], js = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Us = ["onClick"], Js = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, zs = {
  key: 1,
  class: "bp-tags-container"
}, Ks = { class: "bp-tags-cloud" }, Hs = ["onClick"], Qs = { class: "bp-sidebar-favorite-hub bp-hub-article" }, Ys = { class: "bp-hub-main" }, Gs = {
  key: 0,
  class: "bp-hub-icon"
}, Zs = { class: "bp-hub-text" }, qs = { key: 0 }, Ws = {
  key: 0,
  class: "bp-add-category-box"
}, Xs = { class: "bp-folder-list" }, eo = {
  key: 0,
  class: "bp-folder-inline-edit"
}, to = ["onKeydown"], so = ["onClick"], oo = ["onClick"], no = {
  key: 0,
  class: "bp-folder-icon"
}, io = ["title"], ro = {
  key: 1,
  class: "bp-folder-badge"
}, ao = {
  key: 2,
  class: "bp-folder-badge"
}, lo = {
  key: 3,
  class: "bp-folder-badge"
}, co = {
  key: 2,
  class: "bp-folder-actions"
}, uo = ["onClick"], po = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, bo = ["onClick"], go = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, vo = {
  key: 1,
  class: "bp-tags-container"
}, fo = { class: "bp-tags-cloud" }, mo = ["onClick"], yo = {
  key: 1,
  class: "bp-content-pane"
}, ko = { class: "bp-pane-header" }, ho = { class: "bp-result-stats" }, Co = {
  key: 0,
  class: "bp-active-filter-badge"
}, wo = {
  key: 0,
  class: "bp-empty-state"
}, Ao = {
  key: 0,
  class: "bp-empty-svg",
  "aria-hidden": "true"
}, _o = {
  key: 1,
  class: "bp-empty-icon"
}, $o = { class: "bp-empty-title" }, So = {
  key: 2,
  class: "bp-empty-desc"
}, xo = {
  key: 3,
  class: "bp-empty-desc"
}, Io = {
  key: 1,
  class: "bp-card-grid"
}, To = ["onClick"], Mo = { class: "bp-compact-head" }, Bo = ["title"], Eo = ["onClick"], Po = ["title", "onClick"], Vo = {
  key: 0,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, No = {
  key: 1,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Do = ["onClick"], Lo = ["onClick"], Ro = ["title"], Oo = { class: "bp-compact-chips" }, Fo = ["title", "onClick"], jo = ["onClick"], Uo = ["title", "onClick"], Jo = { class: "bp-compact-meta" }, zo = { class: "bp-compact-meta-left" }, Ko = { class: "bp-compact-kind" }, Ho = ["title", "onClick"], Qo = { key: 0 }, Yo = { class: "bp-compact-meta-right" }, Go = {
  key: 0,
  class: "bp-copied-tip"
}, Zo = {
  key: 1,
  class: "bp-compact-date"
}, qo = { class: "bp-card-header" }, Wo = { class: "bp-card-title-group" }, Xo = ["title", "onClick"], en = ["title"], tn = { class: "bp-card-actions" }, sn = ["onClick"], on = ["onClick"], nn = {
  key: 0,
  class: "bp-card-desc"
}, rn = ["title"], an = {
  key: 1,
  class: "bp-card-vars"
}, ln = ["title", "onClick"], dn = { class: "bp-card-footer" }, cn = { class: "bp-card-tags" }, un = ["onClick"], pn = { class: "bp-card-button-row" }, bn = {
  key: 0,
  class: "bp-copied-tip"
}, gn = ["onClick"], vn = ["onClick"], fn = {
  key: 2,
  class: "bp-content-pane"
}, mn = { class: "bp-pane-header" }, yn = { class: "bp-result-stats" }, kn = {
  key: 0,
  class: "bp-active-filter-badge bp-badge-indigo"
}, hn = {
  key: 0,
  class: "bp-empty-state"
}, Cn = {
  key: 0,
  class: "bp-empty-svg",
  "aria-hidden": "true"
}, wn = {
  key: 1,
  class: "bp-empty-icon"
}, An = { class: "bp-empty-title" }, _n = { class: "bp-empty-desc" }, $n = {
  key: 1,
  class: "bp-card-grid"
}, Sn = { class: "bp-card-header" }, xn = { class: "bp-card-title-group" }, In = ["title", "onClick"], Tn = ["title"], Mn = { class: "bp-card-actions" }, Bn = ["href"], En = ["onClick"], Pn = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Vn = ["onClick"], Nn = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Dn = {
  key: 0,
  class: "bp-article-meta-line"
}, Ln = {
  key: 0,
  class: "bp-article-source"
}, Rn = { class: "bp-article-date" }, On = {
  key: 1,
  class: "bp-card-desc"
}, Fn = { class: "bp-card-preview bp-article-preview" }, jn = { class: "bp-card-footer" }, Un = { class: "bp-card-tags" }, Jn = ["onClick"], zn = { class: "bp-card-button-row" }, Kn = {
  key: 0,
  class: "bp-copied-tip"
}, Hn = ["onClick"], Qn = ["onClick"], Yn = {
  key: 3,
  class: "bp-content-pane bp-stickers-wrapper"
}, Gn = {
  key: 0,
  class: "bp-side-drawer"
}, Zn = { class: "bp-drawer-header" }, qn = { class: "bp-drawer-title" }, Wn = { class: "bp-drawer-body" }, Xn = { class: "bp-form-group" }, ei = { class: "bp-form-row" }, ti = { class: "bp-form-group flex-1" }, si = ["value"], oi = { class: "bp-form-group bp-form-checkbox-group" }, ni = { class: "bp-checkbox-label" }, ii = { class: "bp-form-group" }, ri = { class: "bp-form-group flex-fill" }, ai = {
  key: 0,
  class: "bp-detected-vars"
}, li = { class: "bp-form-group" }, di = { class: "bp-drawer-footer" }, ci = {
  key: 0,
  class: "bp-side-drawer"
}, ui = { class: "bp-drawer-header" }, pi = { class: "bp-drawer-title" }, bi = { class: "bp-drawer-body" }, gi = { class: "bp-drawer-desc" }, vi = { class: "bp-vars-form" }, fi = { class: "bp-form-label" }, mi = ["onUpdate:modelValue", "placeholder"], yi = { class: "bp-preview-box" }, ki = { class: "bp-preview-text" }, hi = { class: "bp-drawer-footer" }, Ci = {
  key: 0,
  class: "bp-side-drawer bp-drawer-article"
}, wi = { class: "bp-drawer-header" }, Ai = { class: "bp-drawer-title" }, _i = { class: "bp-drawer-body" }, $i = { class: "bp-form-group" }, Si = { class: "bp-form-row" }, xi = { class: "bp-form-group flex-1" }, Ii = ["value"], Ti = { class: "bp-form-group bp-form-checkbox-group" }, Mi = { class: "bp-checkbox-label" }, Bi = { class: "bp-form-row" }, Ei = { class: "bp-form-group flex-1" }, Pi = { class: "bp-form-group flex-1" }, Vi = { class: "bp-form-group" }, Ni = { class: "bp-form-group flex-fill" }, Di = { class: "bp-form-group" }, Li = { class: "bp-drawer-footer" }, Ri = {
  key: 0,
  class: "bp-side-drawer bp-reader-drawer"
}, Oi = { class: "bp-drawer-header" }, Fi = { class: "bp-reader-head-info" }, ji = { class: "bp-badge-pill" }, Ui = {
  key: 0,
  class: "bp-reader-source"
}, Ji = { class: "bp-drawer-body bp-reader-body" }, zi = { class: "bp-reader-title" }, Ki = { class: "bp-reader-meta" }, Hi = { key: 0 }, Qi = { key: 1 }, Yi = ["href"], Gi = {
  key: 0,
  class: "bp-reader-quote"
}, Zi = { class: "bp-reader-text" }, qi = { class: "bp-drawer-footer" }, Wi = /* @__PURE__ */ tt({
  __name: "BackpackDialog",
  props: {
    embedded: { type: Boolean }
  },
  setup(o) {
    const i = [
      {
        id: "prompts",
        title: "提示词",
        subTitle: "Prompt 宝库",
        icon: "💬",
        badge: "PROMPT",
        themeClass: "bp-channel-prompts"
      },
      {
        id: "articles",
        title: "文章保存",
        subTitle: "长文收藏",
        icon: "📑",
        badge: "ARTICLE",
        themeClass: "bp-channel-articles"
      },
      {
        id: "stickers",
        title: "表情包管理",
        subTitle: "本地表情图库",
        icon: "🐱",
        badge: "STICKER",
        themeClass: "bp-channel-stickers"
      }
    ], n = k("prompts"), u = k(!1), f = k(!1), g = k(""), _ = k(null), N = k(""), L = k(!1), de = k(""), j = k(null), U = k(""), $e = k(null), Se = k(null), J = k(""), z = k(""), R = k(""), G = k(""), Z = k("default"), q = k(""), W = k(!1), K = k(""), H = k(""), X = k(""), ee = k(""), te = k(""), se = k("default"), oe = k(""), ne = k(!1);
    Et(() => {
      A.init(), x.init();
    });
    function dt() {
      u.value = !u.value;
    }
    function ce(c) {
      n.value = c, l.isEditing = !1, l.isVariableDialogOpen = !1, d.isEditing = !1, d.isReading = !1;
    }
    function xe(c) {
      l.activeCategoryId = c;
    }
    function me(c) {
      l.selectedTag = l.selectedTag === c ? null : c;
    }
    function ct(c) {
      d.activeCategoryId = c;
    }
    function Ie(c) {
      d.selectedTag = d.selectedTag === c ? null : c;
    }
    function ut() {
      Ke.close("backpack");
    }
    function pt() {
      Ke.minimize("backpack");
    }
    function Te(c) {
      A.copyPromptText(c);
    }
    function ue(c) {
      l.isEditing = !1, A.openVariableDialog(c);
    }
    function bt() {
      if (!l.variableTargetPrompt) return;
      const c = Qe(
        l.variableTargetPrompt.content,
        l.variableFormValues
      );
      A.copyPromptText(l.variableTargetPrompt, c), A.closeVariableDialog();
    }
    const gt = V(() => l.variableTargetPrompt ? Qe(
      l.variableTargetPrompt.content,
      l.variableFormValues
    ) : ""), Me = V(() => M(R.value));
    function Be() {
      l.isVariableDialogOpen = !1, z.value = "", R.value = "", G.value = "", Z.value = l.activeCategoryId === "all" || l.activeCategoryId === "starred" ? De.value[0]?.id || "default" : l.activeCategoryId, q.value = "", W.value = !1, A.openEditor();
    }
    function ye(c) {
      l.isVariableDialogOpen = !1, z.value = c.title, R.value = c.content, G.value = c.description || "", Z.value = c.category, q.value = c.tags.join(", "), W.value = !!c.pinned, A.openEditor(c);
    }
    function vt() {
      if (!z.value.trim() && !R.value.trim()) return;
      const c = q.value.split(/[,，\s]+/).map((t) => t.trim()).filter(Boolean);
      A.saveEditorData({
        title: z.value.trim() || "未命名提示词",
        content: R.value,
        description: G.value.trim(),
        category: Z.value || "default",
        tags: c,
        pinned: W.value
      });
    }
    function Ee(c) {
      typeof window < "u" && !window.confirm("确定要删除这条提示词吗？") || A.deletePrompt(c);
    }
    function Pe(c) {
      A.togglePin(c);
    }
    function Ve() {
      const c = g.value.trim();
      c && A.addCategory(c) && (g.value = "", f.value = !1);
    }
    function ft(c) {
      _.value = c.id, N.value = c.name;
    }
    function Ne(c) {
      N.value.trim() && A.renameCategory(c, N.value.trim()), _.value = null, N.value = "";
    }
    function mt(c) {
      typeof window < "u" && !window.confirm(`确定删除分组「${c.name}」吗？组内提示词将归入默认分组。`) || A.deleteCategory(c.id);
    }
    const De = V(() => l.categories.filter((c) => c.id !== "all" && c.id !== "starred"));
    function Le() {
      d.isReading = !1, K.value = "", H.value = "", X.value = "", ee.value = "", te.value = "", se.value = d.activeCategoryId === "all" || d.activeCategoryId === "starred" ? je.value[0]?.id || "default" : d.activeCategoryId, oe.value = "", ne.value = !1, x.openEditor();
    }
    function yt(c) {
      d.isReading = !1, K.value = c.title, H.value = c.content, X.value = c.url || "", ee.value = c.sourceName || "", te.value = c.description || "", se.value = c.category, oe.value = c.tags.join(", "), ne.value = !!c.pinned, x.openEditor(c);
    }
    function kt(c) {
      x.openReader(c);
    }
    function ht(c) {
      const t = String(c || "").trim();
      return t.length <= 600 ? t : `${t.slice(0, 600)}
…`;
    }
    function Ct() {
      if (!K.value.trim() && !H.value.trim()) return;
      const c = oe.value.split(/[,，\s]+/).map((t) => t.trim()).filter(Boolean);
      x.saveEditorData({
        title: K.value.trim() || "未命名文章",
        content: H.value,
        url: X.value.trim(),
        sourceName: ee.value.trim(),
        description: te.value.trim(),
        category: se.value || "default",
        tags: c,
        pinned: ne.value
      });
    }
    function wt(c) {
      typeof window < "u" && !window.confirm("确定要删除这篇保存的文章吗？") || x.deleteArticle(c);
    }
    function At(c) {
      x.togglePin(c);
    }
    function Re(c) {
      x.copyArticleText(c);
    }
    function Oe() {
      const c = de.value.trim();
      c && x.addCategory(c) && (de.value = "", L.value = !1);
    }
    function _t(c) {
      j.value = c.id, U.value = c.name;
    }
    function Fe(c) {
      U.value.trim() && x.renameCategory(c, U.value.trim()), j.value = null, U.value = "";
    }
    function $t(c) {
      typeof window < "u" && !window.confirm(`确定删除分组「${c.name}」吗？组内文章将归入默认分组。`) || x.deleteCategory(c.id);
    }
    const je = V(() => d.categories.filter((c) => c.id !== "all" && c.id !== "starred"));
    function St() {
      $e.value?.click();
    }
    function xt() {
      Se.value?.click();
    }
    function It(c) {
      const t = c.target, s = t.files?.[0];
      if (!s) return;
      const b = new FileReader();
      b.onload = (T) => {
        const re = T.target?.result;
        if (re) {
          const O = A.importBackup(re);
          J.value = O.success ? `成功导入 ${O.count} 条提示词！` : O.error || "导入失败", setTimeout(() => {
            J.value = "";
          }, 3500);
        }
        t.value = "";
      }, b.readAsText(s);
    }
    function Tt(c) {
      const t = c.target, s = t.files?.[0];
      if (!s) return;
      const b = new FileReader();
      b.onload = (T) => {
        const re = T.target?.result;
        if (re) {
          const O = x.importBackup(re);
          J.value = O.success ? `成功导入 ${O.count} 篇文章！` : O.error || "导入失败", setTimeout(() => {
            J.value = "";
          }, 3500);
        }
        t.value = "";
      }, b.readAsText(s);
    }
    function pe(c) {
      if (!c) return "";
      const t = new Date(c);
      return `${t.getMonth() + 1}/${t.getDate()}`;
    }
    function Mt(c) {
      if (!c) return "";
      const t = new Date(c), s = (b) => String(b).padStart(2, "0");
      return `${t.getFullYear()}-${s(t.getMonth() + 1)}-${s(t.getDate())}`;
    }
    function Ue(c) {
      return l.categories.find((t) => t.id === c)?.name || "默认分组";
    }
    const ie = k(""), ke = V(() => {
      const c = ie.value.trim().toLowerCase();
      return c ? Xe.value.filter(
        (t) => t.title.toLowerCase().includes(c) || t.description?.toLowerCase().includes(c) || t.sourceName?.toLowerCase().includes(c) || t.content.toLowerCase().includes(c) || t.tags.some((s) => s.toLowerCase().includes(c))
      ) : Xe.value;
    });
    return (c, t) => (r(), st(Jt, {
      embedded: o.embedded,
      id: "backpack-workspace-dialog",
      "window-id": "backpack",
      title: "背包工作台",
      icon: "🎒",
      visible: p(Dt).visible,
      "default-width": 980,
      "default-height": 660,
      "min-width": 740,
      "min-height": 500,
      "custom-class": "lw-backpack-window",
      onClose: ut,
      onMinimize: pt
    }, Pt({
      "header-actions": P(() => [
        e("div", {
          class: C(["bp-top-actions", { "bp-integrated": o.embedded }])
        }, [
          n.value === "prompts" ? (r(), a(y, { key: 0 }, [
            o.embedded ? (r(), a("label", Zt, [
              t[50] || (t[50] = e("svg", {
                viewBox: "0 0 16 16",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "1.45",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "aria-hidden": "true"
              }, [
                e("circle", {
                  cx: "7",
                  cy: "7",
                  r: "4.6"
                }),
                e("path", { d: "M10.5 10.5L14 14" })
              ], -1)),
              w(e("input", {
                "onUpdate:modelValue": t[3] || (t[3] = (s) => p(l).searchQuery = s),
                type: "search",
                placeholder: "搜索提示词…",
                "aria-label": "搜索提示词"
              }, null, 512), [
                [$, p(l).searchQuery]
              ])
            ])) : m("", !0),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "导出备份",
              onClick: t[4] || (t[4] = (s) => p(A).exportBackup())
            }, [
              o.embedded ? (r(), a("svg", qt, [...t[51] || (t[51] = [
                e("path", { d: "M8 2.5v7.5M5 7l3 3 3-3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (r(), a("span", Wt, "💾")),
              t[52] || (t[52] = e("span", null, "导出", -1))
            ]),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "从文件导入",
              onClick: St
            }, [
              o.embedded ? (r(), a("svg", Xt, [...t[53] || (t[53] = [
                e("path", { d: "M8 10V2.5M5 5.5l3-3 3 3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (r(), a("span", es, "📥")),
              t[54] || (t[54] = e("span", null, "导入", -1))
            ]),
            e("button", {
              type: "button",
              class: C(["bp-btn bp-btn-primary", { active: p(l).isEditing }]),
              title: "新建提示词",
              onClick: Be
            }, [
              o.embedded ? (r(), a("svg", ts, [...t[55] || (t[55] = [
                e("path", { d: "M8 3v10M3 8h10" }, null, -1)
              ])])) : (r(), a("span", ss, "➕")),
              e("span", null, v(o.embedded ? "新建" : "新建提示词"), 1)
            ], 2),
            e("input", {
              ref_key: "promptFileInputRef",
              ref: $e,
              type: "file",
              accept: ".json",
              style: { display: "none" },
              onChange: It
            }, null, 544)
          ], 64)) : n.value === "articles" ? (r(), a(y, { key: 1 }, [
            o.embedded ? (r(), a("label", os, [
              t[56] || (t[56] = e("svg", {
                viewBox: "0 0 16 16",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "1.45",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "aria-hidden": "true"
              }, [
                e("circle", {
                  cx: "7",
                  cy: "7",
                  r: "4.6"
                }),
                e("path", { d: "M10.5 10.5L14 14" })
              ], -1)),
              w(e("input", {
                "onUpdate:modelValue": t[5] || (t[5] = (s) => ie.value = s),
                type: "search",
                placeholder: "搜索文章…",
                "aria-label": "搜索文章"
              }, null, 512), [
                [$, ie.value]
              ])
            ])) : m("", !0),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "导出文章备份",
              onClick: t[6] || (t[6] = (s) => p(x).exportBackup())
            }, [
              o.embedded ? (r(), a("svg", ns, [...t[57] || (t[57] = [
                e("path", { d: "M8 2.5v7.5M5 7l3 3 3-3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (r(), a("span", is, "💾")),
              t[58] || (t[58] = e("span", null, "导出", -1))
            ]),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "从文件导入文章",
              onClick: xt
            }, [
              o.embedded ? (r(), a("svg", rs, [...t[59] || (t[59] = [
                e("path", { d: "M8 10V2.5M5 5.5l3-3 3 3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (r(), a("span", as, "📥")),
              t[60] || (t[60] = e("span", null, "导入", -1))
            ]),
            e("button", {
              type: "button",
              class: C(["bp-btn bp-btn-primary bp-btn-article-pri", { active: p(d).isEditing }]),
              title: "保存新文章",
              onClick: Le
            }, [
              o.embedded ? (r(), a("svg", ls, [...t[61] || (t[61] = [
                e("path", { d: "M8 3v10M3 8h10" }, null, -1)
              ])])) : (r(), a("span", ds, "➕")),
              e("span", null, v(o.embedded ? "新建" : "新建文章"), 1)
            ], 2),
            e("input", {
              ref_key: "articleFileInputRef",
              ref: Se,
              type: "file",
              accept: ".json",
              style: { display: "none" },
              onChange: Tt
            }, null, 544)
          ], 64)) : m("", !0)
        ], 2)
      ]),
      default: P(() => [
        e("div", {
          class: C(["bp-container", { "bp-integrated": o.embedded }])
        }, [
          J.value ? (r(), a("div", cs, v(J.value), 1)) : m("", !0),
          p(l).statusMessage ? (r(), a("div", us, v(p(l).statusMessage), 1)) : m("", !0),
          p(d).statusMessage ? (r(), a("div", ps, v(p(d).statusMessage), 1)) : m("", !0),
          e("div", bs, [
            !o.embedded || n.value !== "stickers" ? (r(), a("aside", gs, [
              o.embedded ? m("", !0) : (r(), a(y, { key: 0 }, [
                e("div", {
                  class: C(["bp-sidebar-toggle-bar", { "is-collapsed": u.value }]),
                  onClick: dt
                }, [
                  t[62] || (t[62] = e("div", { class: "bp-sidebar-toggle-title" }, [
                    e("span", { class: "bp-sidebar-toggle-icon" }, "⚡"),
                    e("strong", null, "快捷频道")
                  ], -1)),
                  e("div", vs, [
                    e("span", null, v(u.value ? "展开" : "收起"), 1),
                    e("span", fs, v(u.value ? "▾" : "▴"), 1)
                  ])
                ], 2),
                w(e("div", ms, [
                  (r(), a(y, null, I(i, (s) => e("div", {
                    key: s.id,
                    class: C(["bp-channel-wrap", s.themeClass])
                  }, [
                    e("button", {
                      type: "button",
                      class: C(["bp-channel-btn", { on: n.value === s.id }]),
                      onClick: (b) => ce(s.id)
                    }, [
                      e("div", ks, [
                        e("span", hs, v(s.icon), 1),
                        e("div", Cs, [
                          e("strong", null, v(s.title), 1),
                          e("small", null, v(s.subTitle), 1)
                        ])
                      ]),
                      e("span", ws, v(s.badge), 1)
                    ], 10, ys)
                  ], 2)), 64))
                ], 512), [
                  [Vt, !u.value]
                ])
              ], 64)),
              n.value === "prompts" ? (r(), a(y, { key: 1 }, [
                e("div", As, [
                  e("div", _s, [
                    o.embedded ? m("", !0) : (r(), a("span", $s, "📁")),
                    e("div", Ss, [
                      t[63] || (t[63] = e("strong", null, "提示词分组", -1)),
                      o.embedded ? m("", !0) : (r(), a("small", xs, "按自定义分组整理"))
                    ])
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-hub-add-btn",
                    title: "新增分组",
                    onClick: t[7] || (t[7] = (s) => f.value = !0)
                  }, "+")
                ]),
                f.value ? (r(), a("div", Is, [
                  w(e("input", {
                    "onUpdate:modelValue": t[8] || (t[8] = (s) => g.value = s),
                    type: "text",
                    class: "bp-add-cat-input",
                    placeholder: "分组名称...",
                    maxlength: "16",
                    autofocus: "",
                    onKeydown: [
                      D(Ve, ["enter"]),
                      t[9] || (t[9] = D((s) => f.value = !1, ["esc"]))
                    ]
                  }, null, 544), [
                    [$, g.value]
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini primary",
                    onClick: Ve
                  }, "✔"),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini",
                    onClick: t[10] || (t[10] = (s) => f.value = !1)
                  }, "✕")
                ])) : m("", !0),
                e("div", Ts, [
                  (r(!0), a(y, null, I(p(l).categories, (s) => (r(), a("div", {
                    key: s.id,
                    class: C(["bp-folder-row", { active: p(l).activeCategoryId === s.id }])
                  }, [
                    _.value === s.id ? (r(), a("div", Ms, [
                      w(e("input", {
                        "onUpdate:modelValue": t[11] || (t[11] = (b) => N.value = b),
                        type: "text",
                        class: "bp-folder-rename-input",
                        maxlength: "16",
                        autofocus: "",
                        onKeydown: [
                          D((b) => Ne(s.id), ["enter"]),
                          t[12] || (t[12] = D((b) => _.value = null, ["esc"]))
                        ]
                      }, null, 40, Bs), [
                        [$, N.value]
                      ]),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini primary",
                        onClick: (b) => Ne(s.id)
                      }, "✔", 8, Es),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini",
                        onClick: t[13] || (t[13] = (b) => _.value = null)
                      }, "✕")
                    ])) : (r(), a("button", {
                      key: 1,
                      type: "button",
                      class: "bp-folder-btn",
                      onClick: (b) => xe(s.id)
                    }, [
                      o.embedded ? m("", !0) : (r(), a("span", Vs, v(s.icon || "📁"), 1)),
                      e("span", {
                        class: "bp-folder-name",
                        title: s.name
                      }, v(s.name), 9, Ns),
                      s.id === "all" ? (r(), a("span", Ds, v(p(l).prompts.length), 1)) : s.id === "starred" ? (r(), a("span", Ls, v(p(l).prompts.filter((b) => b.pinned).length), 1)) : (r(), a("span", Rs, v(p(l).prompts.filter((b) => b.category === s.id).length), 1))
                    ], 8, Ps)),
                    !s.isBuiltin && _.value !== s.id ? (r(), a("div", Os, [
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn",
                        title: "重命名",
                        onClick: h((b) => ft(s), ["stop"])
                      }, [
                        o.embedded ? (r(), a("svg", js, [...t[64] || (t[64] = [
                          e("path", { d: "M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" }, null, -1)
                        ])])) : (r(), a(y, { key: 1 }, [
                          S("✏️")
                        ], 64))
                      ], 8, Fs),
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn danger",
                        title: "删除",
                        onClick: h((b) => mt(s), ["stop"])
                      }, [
                        o.embedded ? (r(), a("svg", Js, [...t[65] || (t[65] = [
                          e("path", { d: "M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5" }, null, -1)
                        ])])) : (r(), a(y, { key: 1 }, [
                          S("🗑️")
                        ], 64))
                      ], 8, Us)
                    ])) : m("", !0)
                  ], 2))), 128))
                ]),
                !o.embedded && p(Ze).length > 0 ? (r(), a("div", zs, [
                  t[66] || (t[66] = e("div", { class: "bp-tags-title" }, "常用标签", -1)),
                  e("div", Ks, [
                    (r(!0), a(y, null, I(p(Ze), (s) => (r(), a("span", {
                      key: s,
                      class: C(["bp-tag-pill", { active: p(l).selectedTag === s }]),
                      onClick: (b) => me(s)
                    }, " #" + v(s), 11, Hs))), 128))
                  ])
                ])) : m("", !0)
              ], 64)) : n.value === "articles" ? (r(), a(y, { key: 2 }, [
                e("div", Qs, [
                  e("div", Ys, [
                    o.embedded ? m("", !0) : (r(), a("span", Gs, "📚")),
                    e("div", Zs, [
                      t[67] || (t[67] = e("strong", null, "文章分组", -1)),
                      o.embedded ? m("", !0) : (r(), a("small", qs, "文章多级分类整理"))
                    ])
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-hub-add-btn bp-btn-indigo",
                    title: "新增文章分组",
                    onClick: t[14] || (t[14] = (s) => L.value = !0)
                  }, "+")
                ]),
                L.value ? (r(), a("div", Ws, [
                  w(e("input", {
                    "onUpdate:modelValue": t[15] || (t[15] = (s) => de.value = s),
                    type: "text",
                    class: "bp-add-cat-input bp-border-indigo",
                    placeholder: "分组名称...",
                    maxlength: "16",
                    autofocus: "",
                    onKeydown: [
                      D(Oe, ["enter"]),
                      t[16] || (t[16] = D((s) => L.value = !1, ["esc"]))
                    ]
                  }, null, 544), [
                    [$, de.value]
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini primary bp-bg-indigo",
                    onClick: Oe
                  }, "✔"),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini",
                    onClick: t[17] || (t[17] = (s) => L.value = !1)
                  }, "✕")
                ])) : m("", !0),
                e("div", Xs, [
                  (r(!0), a(y, null, I(p(d).categories, (s) => (r(), a("div", {
                    key: s.id,
                    class: C(["bp-folder-row bp-row-indigo", { active: p(d).activeCategoryId === s.id }])
                  }, [
                    j.value === s.id ? (r(), a("div", eo, [
                      w(e("input", {
                        "onUpdate:modelValue": t[18] || (t[18] = (b) => U.value = b),
                        type: "text",
                        class: "bp-folder-rename-input",
                        maxlength: "16",
                        autofocus: "",
                        onKeydown: [
                          D((b) => Fe(s.id), ["enter"]),
                          t[19] || (t[19] = D((b) => j.value = null, ["esc"]))
                        ]
                      }, null, 40, to), [
                        [$, U.value]
                      ]),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini primary bp-bg-indigo",
                        onClick: (b) => Fe(s.id)
                      }, "✔", 8, so),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini",
                        onClick: t[20] || (t[20] = (b) => j.value = null)
                      }, "✕")
                    ])) : (r(), a("button", {
                      key: 1,
                      type: "button",
                      class: "bp-folder-btn",
                      onClick: (b) => ct(s.id)
                    }, [
                      o.embedded ? m("", !0) : (r(), a("span", no, v(s.icon || "📑"), 1)),
                      e("span", {
                        class: "bp-folder-name",
                        title: s.name
                      }, v(s.name), 9, io),
                      s.id === "all" ? (r(), a("span", ro, v(p(d).articles.length), 1)) : s.id === "starred" ? (r(), a("span", ao, v(p(d).articles.filter((b) => b.pinned).length), 1)) : (r(), a("span", lo, v(p(d).articles.filter((b) => b.category === s.id).length), 1))
                    ], 8, oo)),
                    !s.isBuiltin && j.value !== s.id ? (r(), a("div", co, [
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn",
                        title: "重命名",
                        onClick: h((b) => _t(s), ["stop"])
                      }, [
                        o.embedded ? (r(), a("svg", po, [...t[68] || (t[68] = [
                          e("path", { d: "M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" }, null, -1)
                        ])])) : (r(), a(y, { key: 1 }, [
                          S("✏️")
                        ], 64))
                      ], 8, uo),
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn danger",
                        title: "删除",
                        onClick: h((b) => $t(s), ["stop"])
                      }, [
                        o.embedded ? (r(), a("svg", go, [...t[69] || (t[69] = [
                          e("path", { d: "M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5" }, null, -1)
                        ])])) : (r(), a(y, { key: 1 }, [
                          S("🗑️")
                        ], 64))
                      ], 8, bo)
                    ])) : m("", !0)
                  ], 2))), 128))
                ]),
                !o.embedded && p(et).length > 0 ? (r(), a("div", vo, [
                  t[70] || (t[70] = e("div", { class: "bp-tags-title" }, "文章标签", -1)),
                  e("div", fo, [
                    (r(!0), a(y, null, I(p(et), (s) => (r(), a("span", {
                      key: s,
                      class: C(["bp-tag-pill bp-tag-indigo", { active: p(d).selectedTag === s }]),
                      onClick: (b) => Ie(s)
                    }, " #" + v(s), 11, mo))), 128))
                  ])
                ])) : m("", !0)
              ], 64)) : m("", !0)
            ])) : m("", !0),
            n.value === "prompts" ? (r(), a("main", yo, [
              e("div", ko, [
                e("div", ho, [
                  e("span", null, [
                    t[71] || (t[71] = S("共 ", -1)),
                    e("strong", null, v(p(we).length), 1),
                    t[72] || (t[72] = S(" 条提示词", -1))
                  ]),
                  p(l).selectedTag ? (r(), a("span", Co, [
                    S(" 标签: #" + v(p(l).selectedTag) + " ", 1),
                    e("button", {
                      type: "button",
                      class: "bp-tag-close",
                      onClick: t[21] || (t[21] = (s) => p(l).selectedTag = null)
                    }, "✕")
                  ])) : m("", !0)
                ])
              ]),
              p(we).length === 0 ? (r(), a("div", wo, [
                o.embedded ? (r(), a("div", Ao, [...t[73] || (t[73] = [
                  e("svg", {
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "1.4",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, [
                    e("path", { d: "M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5z" }),
                    e("path", { d: "M8 9h8M8 13h5" })
                  ], -1)
                ])])) : (r(), a("div", _o, "🎒")),
                e("h3", $o, v(p(l).searchQuery.trim() || p(l).selectedTag ? "没有匹配的提示词" : "暂无提示词"), 1),
                p(l).searchQuery.trim() || p(l).selectedTag ? (r(), a("p", So, "试试更换搜索词或清除标签筛选。")) : (r(), a("p", xo, [...t[74] || (t[74] = [
                  S("把常用的系统提示、模板指令和 ", -1),
                  e("code", null, "{{变量}}", -1),
                  S(" 存在这里，随时一键调用。", -1)
                ])])),
                e("button", {
                  type: "button",
                  class: "bp-btn bp-btn-primary",
                  onClick: Be
                }, "新建提示词")
              ])) : (r(), a("div", Io, [
                (r(!0), a(y, null, I(p(we), (s) => (r(), a("article", {
                  key: s.id,
                  class: C(["bp-card", {
                    "bp-compact-card": o.embedded,
                    "is-pinned": s.pinned,
                    "is-selected": p(l).editingPrompt?.id === s.id
                  }]),
                  onClick: (b) => o.embedded && ye(s)
                }, [
                  o.embedded ? (r(), a(y, { key: 0 }, [
                    e("div", Mo, [
                      e("h4", {
                        class: "bp-compact-title",
                        title: s.title
                      }, v(s.title), 9, Bo),
                      e("div", {
                        class: "bp-compact-actions",
                        onClick: t[22] || (t[22] = h(() => {
                        }, ["stop"]))
                      }, [
                        p(M)(s.content).length > 0 ? (r(), a("button", {
                          key: 0,
                          type: "button",
                          class: "bp-compact-icon-btn accent",
                          title: "填充变量并使用",
                          onClick: h((b) => ue(s), ["stop"])
                        }, [...t[75] || (t[75] = [
                          e("svg", {
                            viewBox: "0 0 16 16",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "1.45",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "aria-hidden": "true"
                          }, [
                            e("path", { d: "M9 1.8L3.8 9h4.1L7 14.2 12.2 7H8.1L9 1.8Z" })
                          ], -1)
                        ])], 8, Eo)) : m("", !0),
                        e("button", {
                          type: "button",
                          class: C(["bp-compact-icon-btn", { success: p(l).copySuccessId === s.id }]),
                          title: p(l).copySuccessId === s.id ? "已复制" : "复制提示词",
                          onClick: h((b) => Te(s), ["stop"])
                        }, [
                          p(l).copySuccessId === s.id ? (r(), a("svg", Vo, [...t[76] || (t[76] = [
                            e("path", { d: "M3.5 8.5l3 3 6-6.5" }, null, -1)
                          ])])) : (r(), a("svg", No, [...t[77] || (t[77] = [
                            e("rect", {
                              x: "5.5",
                              y: "5.5",
                              width: "7.5",
                              height: "8.5",
                              rx: "1.4"
                            }, null, -1),
                            e("path", { d: "M10.5 5.5V3.6A1.4 1.4 0 0 0 9.1 2.2H4.2a1.4 1.4 0 0 0-1.4 1.4v6.7a1.4 1.4 0 0 0 1.4 1.4h1.3" }, null, -1)
                          ])]))
                        ], 10, Po),
                        e("button", {
                          type: "button",
                          class: "bp-compact-icon-btn",
                          title: "编辑提示词",
                          onClick: h((b) => ye(s), ["stop"])
                        }, [...t[78] || (t[78] = [
                          e("svg", {
                            viewBox: "0 0 16 16",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "1.35",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "aria-hidden": "true"
                          }, [
                            e("path", { d: "M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" })
                          ], -1)
                        ])], 8, Do),
                        e("button", {
                          type: "button",
                          class: "bp-compact-icon-btn danger",
                          title: "删除提示词",
                          onClick: h((b) => Ee(s.id), ["stop"])
                        }, [...t[79] || (t[79] = [
                          e("svg", {
                            viewBox: "0 0 16 16",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "1.35",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "aria-hidden": "true"
                          }, [
                            e("path", { d: "M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5" })
                          ], -1)
                        ])], 8, Lo)
                      ])
                    ]),
                    e("p", {
                      class: "bp-compact-desc",
                      title: s.description || s.content
                    }, v(s.description || s.content || "暂无内容描述"), 9, Ro),
                    e("div", Oo, [
                      e("button", {
                        type: "button",
                        class: "bp-compact-folder-chip",
                        title: `查看分组「${Ue(s.category)}」`,
                        onClick: h((b) => xe(s.category || "default"), ["stop"])
                      }, [
                        t[80] || (t[80] = e("svg", {
                          viewBox: "0 0 16 16",
                          fill: "currentColor",
                          "aria-hidden": "true"
                        }, [
                          e("path", { d: "M2 4.2A1.7 1.7 0 0 1 3.7 2.5h2.5l1.3 1.4h4.8A1.7 1.7 0 0 1 14 5.6v6.2a1.7 1.7 0 0 1-1.7 1.7H3.7A1.7 1.7 0 0 1 2 11.8V4.2Z" })
                        ], -1)),
                        e("span", null, v(Ue(s.category)), 1)
                      ], 8, Fo),
                      (r(!0), a(y, null, I(s.tags, (b) => (r(), a("span", {
                        key: b,
                        class: "bp-compact-tag-chip",
                        onClick: h((T) => me(b), ["stop"])
                      }, "#" + v(b), 9, jo))), 128)),
                      (r(!0), a(y, null, I(p(M)(s.content), (b) => (r(), a("span", {
                        key: b,
                        class: "bp-compact-var-chip",
                        title: `点击填充变量 ${b}`,
                        onClick: h((T) => ue(s), ["stop"])
                      }, "{{" + v(b) + "}}", 9, Uo))), 128))
                    ]),
                    e("div", Jo, [
                      e("div", zo, [
                        e("span", Ko, [
                          e("i", {
                            class: C(["bp-compact-dot", { hasVars: p(M)(s.content).length > 0 }])
                          }, null, 2),
                          e("span", null, v(p(M)(s.content).length > 0 ? `${p(M)(s.content).length} 变量` : "Prompt"), 1)
                        ]),
                        e("button", {
                          type: "button",
                          class: C(["bp-compact-star", { active: s.pinned }]),
                          title: s.pinned ? "取消置顶" : "星标置顶",
                          onClick: h((b) => Pe(s.id), ["stop"])
                        }, [
                          e("span", null, v(s.pinned ? "★" : "☆"), 1),
                          s.useCount ? (r(), a("span", Qo, v(s.useCount), 1)) : m("", !0)
                        ], 10, Ho)
                      ]),
                      e("div", Yo, [
                        p(l).copySuccessId === s.id ? (r(), a("span", Go, "已复制")) : (r(), a("span", Zo, v(Mt(s.updatedAt)), 1))
                      ])
                    ])
                  ], 64)) : (r(), a(y, { key: 1 }, [
                    e("div", qo, [
                      e("div", Wo, [
                        e("button", {
                          type: "button",
                          class: C(["bp-pin-btn", { active: s.pinned }]),
                          title: s.pinned ? "取消置顶" : "星标置顶",
                          onClick: h((b) => Pe(s.id), ["stop"])
                        }, v(s.pinned ? "★" : "☆"), 11, Xo),
                        e("h4", {
                          class: "bp-card-title",
                          title: s.title
                        }, v(s.title), 9, en)
                      ]),
                      e("div", tn, [
                        e("button", {
                          type: "button",
                          class: "bp-action-btn edit",
                          title: "编辑提示词",
                          onClick: h((b) => ye(s), ["stop"])
                        }, "✏️", 8, sn),
                        e("button", {
                          type: "button",
                          class: "bp-action-btn delete",
                          title: "删除提示词",
                          onClick: h((b) => Ee(s.id), ["stop"])
                        }, "🗑️", 8, on)
                      ])
                    ]),
                    s.description ? (r(), a("p", nn, v(s.description), 1)) : m("", !0),
                    e("div", {
                      class: "bp-card-preview",
                      title: s.content
                    }, [
                      e("pre", null, [
                        e("code", null, v(s.content), 1)
                      ])
                    ], 8, rn),
                    p(M)(s.content).length > 0 ? (r(), a("div", an, [
                      t[81] || (t[81] = e("span", { class: "bp-vars-hint" }, "变量:", -1)),
                      (r(!0), a(y, null, I(p(M)(s.content), (b) => (r(), a("span", {
                        key: b,
                        class: "bp-var-pill",
                        title: `在无模态侧栏中填充: ${b}`,
                        onClick: h((T) => ue(s), ["stop"])
                      }, " {{" + v(b) + "}} ", 9, ln))), 128))
                    ])) : m("", !0),
                    e("div", dn, [
                      e("div", cn, [
                        (r(!0), a(y, null, I(s.tags, (b) => (r(), a("span", {
                          key: b,
                          class: "bp-tag-micro",
                          onClick: h((T) => me(b), ["stop"])
                        }, "#" + v(b), 9, un))), 128))
                      ]),
                      e("div", pn, [
                        p(l).copySuccessId === s.id ? (r(), a("span", bn, "✓ 已复制!")) : m("", !0),
                        p(M)(s.content).length > 0 ? (r(), a("button", {
                          key: 1,
                          type: "button",
                          class: "bp-btn-use",
                          title: "填充变量并复制",
                          onClick: h((b) => ue(s), ["stop"])
                        }, " ⚡ 填充使用 ", 8, gn)) : m("", !0),
                        e("button", {
                          type: "button",
                          class: C(["bp-btn-copy", { success: p(l).copySuccessId === s.id }]),
                          title: "直接复制提示词文本",
                          onClick: h((b) => Te(s), ["stop"])
                        }, v(p(l).copySuccessId === s.id ? "已复制" : "复制"), 11, vn)
                      ])
                    ])
                  ], 64))
                ], 10, To))), 128))
              ]))
            ])) : n.value === "articles" ? (r(), a("main", fn, [
              e("div", mn, [
                e("div", yn, [
                  e("span", null, [
                    t[82] || (t[82] = S("共 ", -1)),
                    e("strong", null, v(ke.value.length), 1),
                    t[83] || (t[83] = S(" 篇文章", -1))
                  ]),
                  p(d).selectedTag ? (r(), a("span", kn, [
                    S(" 标签: #" + v(p(d).selectedTag) + " ", 1),
                    e("button", {
                      type: "button",
                      class: "bp-tag-close",
                      onClick: t[23] || (t[23] = (s) => p(d).selectedTag = null)
                    }, "✕")
                  ])) : m("", !0)
                ])
              ]),
              ke.value.length === 0 ? (r(), a("div", hn, [
                o.embedded ? (r(), a("div", Cn, [...t[84] || (t[84] = [
                  e("svg", {
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "1.4",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, [
                    e("path", { d: "M5 4.5A2.5 2.5 0 0 1 7.5 2H19v18H7.5A2.5 2.5 0 0 0 5 22z" }),
                    e("path", { d: "M5 4.5V22" })
                  ], -1)
                ])])) : (r(), a("div", wn, "📑")),
                e("h3", An, v(ie.value.trim() || p(d).selectedTag ? "没有匹配的文章" : "暂无保存文章"), 1),
                e("p", _n, v(ie.value.trim() || p(d).selectedTag ? "试试更换搜索词或清除标签筛选。" : "把有价值的深度长文、技术资料或视频分析笔记存在这里，随时离线阅读。"), 1),
                e("button", {
                  type: "button",
                  class: "bp-btn bp-btn-primary bp-btn-indigo",
                  onClick: Le
                }, "保存文章")
              ])) : (r(), a("div", $n, [
                (r(!0), a(y, null, I(ke.value, (s) => (r(), a("article", {
                  key: s.id,
                  class: C(["bp-card bp-card-article", {
                    "is-pinned": s.pinned,
                    "is-selected": p(d).editingArticle?.id === s.id || p(d).readingArticle?.id === s.id
                  }])
                }, [
                  e("div", Sn, [
                    e("div", xn, [
                      e("button", {
                        type: "button",
                        class: C(["bp-pin-btn", { active: s.pinned }]),
                        title: s.pinned ? "取消置顶" : "星标置顶",
                        onClick: h((b) => At(s.id), ["stop"])
                      }, v(s.pinned ? "★" : "☆"), 11, In),
                      e("h4", {
                        class: "bp-card-title",
                        title: s.title
                      }, v(s.title), 9, Tn)
                    ]),
                    e("div", Mn, [
                      s.url ? (r(), a("a", {
                        key: 0,
                        href: s.url,
                        target: "_blank",
                        rel: "noreferrer",
                        class: "bp-action-btn",
                        title: "在浏览器中打开原文"
                      }, " ↗ ", 8, Bn)) : m("", !0),
                      e("button", {
                        type: "button",
                        class: "bp-action-btn edit",
                        title: "编辑文章",
                        onClick: h((b) => yt(s), ["stop"])
                      }, [
                        o.embedded ? (r(), a("svg", Pn, [...t[85] || (t[85] = [
                          e("path", { d: "M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" }, null, -1)
                        ])])) : (r(), a(y, { key: 1 }, [
                          S("✏️")
                        ], 64))
                      ], 8, En),
                      e("button", {
                        type: "button",
                        class: "bp-action-btn delete",
                        title: "删除文章",
                        onClick: h((b) => wt(s.id), ["stop"])
                      }, [
                        o.embedded ? (r(), a("svg", Nn, [...t[86] || (t[86] = [
                          e("path", { d: "M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5" }, null, -1)
                        ])])) : (r(), a(y, { key: 1 }, [
                          S("🗑️")
                        ], 64))
                      ], 8, Vn)
                    ])
                  ]),
                  s.sourceName || s.updatedAt ? (r(), a("div", Dn, [
                    s.sourceName ? (r(), a("span", Ln, v(o.embedded ? s.sourceName : `📰 ${s.sourceName}`), 1)) : m("", !0),
                    e("span", Rn, v(o.embedded ? pe(s.updatedAt) : `🕒 ${pe(s.updatedAt)}`), 1)
                  ])) : m("", !0),
                  s.description ? (r(), a("p", On, v(s.description), 1)) : m("", !0),
                  e("div", Fn, [
                    F(He, {
                      class: "bp-preview-md",
                      content: ht(s.content)
                    }, null, 8, ["content"])
                  ]),
                  e("div", jn, [
                    e("div", Un, [
                      (r(!0), a(y, null, I(s.tags, (b) => (r(), a("span", {
                        key: b,
                        class: "bp-tag-micro",
                        onClick: h((T) => Ie(b), ["stop"])
                      }, "#" + v(b), 9, Jn))), 128))
                    ]),
                    e("div", zn, [
                      p(d).copySuccessId === s.id ? (r(), a("span", Kn, "✓ 已复制!")) : m("", !0),
                      e("button", {
                        type: "button",
                        class: "bp-btn-read",
                        title: "阅读全文",
                        onClick: h((b) => kt(s), ["stop"])
                      }, v(o.embedded ? "阅读全文" : "📖 阅读全文"), 9, Hn),
                      e("button", {
                        type: "button",
                        class: C(["bp-btn-copy", { success: p(d).copySuccessId === s.id }]),
                        title: "复制文章全文",
                        onClick: h((b) => Re(s), ["stop"])
                      }, v(p(d).copySuccessId === s.id ? "已复制" : "复制"), 11, Qn)
                    ])
                  ])
                ], 2))), 128))
              ]))
            ])) : n.value === "stickers" ? (r(), a("main", Yn, [
              F(Lt, {
                "dock-owned": "",
                active: n.value === "stickers"
              }, null, 8, ["active"])
            ])) : m("", !0),
            F(be, { name: "drawer-slide" }, {
              default: P(() => [
                p(l).isEditing && n.value === "prompts" ? (r(), a("aside", Gn, [
                  e("header", Zn, [
                    e("h3", qn, v(p(l).editingPrompt?.id ? o.embedded ? "编辑提示词" : "✏️ 编辑提示词" : o.embedded ? "新建提示词" : "➕ 新建提示词"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "收起",
                      onClick: t[24] || (t[24] = (s) => p(A).closeEditor())
                    }, "✕")
                  ]),
                  e("div", Wn, [
                    e("div", Xn, [
                      t[87] || (t[87] = e("label", { class: "bp-form-label" }, "提示词标题 *", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[25] || (t[25] = (s) => z.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：自研架构评审准则",
                        maxlength: "64"
                      }, null, 512), [
                        [$, z.value]
                      ])
                    ]),
                    e("div", ei, [
                      e("div", ti, [
                        t[88] || (t[88] = e("label", { class: "bp-form-label" }, "所属分组", -1)),
                        w(e("select", {
                          "onUpdate:modelValue": t[26] || (t[26] = (s) => Z.value = s),
                          class: "bp-form-select"
                        }, [
                          (r(!0), a(y, null, I(De.value, (s) => (r(), a("option", {
                            key: s.id,
                            value: s.id
                          }, v(s.name), 9, si))), 128))
                        ], 512), [
                          [Je, Z.value]
                        ])
                      ]),
                      e("div", oi, [
                        e("label", ni, [
                          w(e("input", {
                            "onUpdate:modelValue": t[27] || (t[27] = (s) => W.value = s),
                            type: "checkbox"
                          }, null, 512), [
                            [ze, W.value]
                          ]),
                          t[89] || (t[89] = e("span", null, "星标置顶", -1))
                        ])
                      ])
                    ]),
                    e("div", ii, [
                      t[90] || (t[90] = e("label", { class: "bp-form-label" }, "简介与用途（可选）", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[28] || (t[28] = (s) => G.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "简短描述该 Prompt 适合什么场景",
                        maxlength: "128"
                      }, null, 512), [
                        [$, G.value]
                      ])
                    ]),
                    e("div", ri, [
                      t[92] || (t[92] = e("div", { class: "bp-label-row" }, [
                        e("label", { class: "bp-form-label" }, "正文内容 *"),
                        e("span", { class: "bp-label-tip" }, [
                          S("支持 "),
                          e("code", null, "{{变量}}"),
                          S(" 动态占位符")
                        ])
                      ], -1)),
                      w(e("textarea", {
                        "onUpdate:modelValue": t[29] || (t[29] = (s) => R.value = s),
                        class: "bp-form-input bp-textarea-main",
                        placeholder: "在此输入完整的提示词内容..."
                      }, null, 512), [
                        [$, R.value]
                      ]),
                      Me.value.length > 0 ? (r(), a("div", ai, [
                        t[91] || (t[91] = e("span", null, "检测到变量：", -1)),
                        (r(!0), a(y, null, I(Me.value, (s) => (r(), a("span", {
                          key: s,
                          class: "bp-var-pill mini"
                        }, "{{" + v(s) + "}}", 1))), 128))
                      ])) : m("", !0)
                    ]),
                    e("div", li, [
                      t[93] || (t[93] = e("label", { class: "bp-form-label" }, "标签（用逗号或空格隔开）", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[30] || (t[30] = (s) => q.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：架构设计, 审查清单"
                      }, null, 512), [
                        [$, q.value]
                      ])
                    ])
                  ]),
                  e("footer", di, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[31] || (t[31] = (s) => p(A).closeEditor())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary",
                      onClick: vt
                    }, "保存提示词")
                  ])
                ])) : m("", !0)
              ]),
              _: 1
            }),
            F(be, { name: "drawer-slide" }, {
              default: P(() => [
                p(l).isVariableDialogOpen && n.value === "prompts" ? (r(), a("aside", ci, [
                  e("header", ui, [
                    e("h3", pi, v(o.embedded ? "填充变量" : "⚡ 快速填充变量"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "关闭",
                      onClick: t[32] || (t[32] = (s) => p(A).closeVariableDialog())
                    }, "✕")
                  ]),
                  e("div", bi, [
                    e("p", gi, [
                      t[94] || (t[94] = S("正在使用：", -1)),
                      e("strong", null, v(p(l).variableTargetPrompt?.title), 1)
                    ]),
                    e("div", vi, [
                      (r(!0), a(y, null, I(p(l).variableFormValues, (s, b) => (r(), a("div", {
                        key: b,
                        class: "bp-form-group"
                      }, [
                        e("label", fi, "{{" + v(b) + "}}", 1),
                        w(e("textarea", {
                          "onUpdate:modelValue": (T) => p(l).variableFormValues[b] = T,
                          class: "bp-form-input bp-textarea-small",
                          placeholder: `请输入 ${b} 的具体内容...`,
                          rows: "2"
                        }, null, 8, mi), [
                          [$, p(l).variableFormValues[b]]
                        ])
                      ]))), 128))
                    ]),
                    e("div", yi, [
                      t[95] || (t[95] = e("div", { class: "bp-preview-header" }, "实时合并预览", -1)),
                      e("pre", ki, [
                        e("code", null, v(gt.value), 1)
                      ])
                    ])
                  ]),
                  e("footer", hi, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[33] || (t[33] = (s) => p(A).closeVariableDialog())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary",
                      onClick: bt
                    }, "一键复制填充内容")
                  ])
                ])) : m("", !0)
              ]),
              _: 1
            }),
            F(be, { name: "drawer-slide" }, {
              default: P(() => [
                p(d).isEditing && n.value === "articles" ? (r(), a("aside", Ci, [
                  e("header", wi, [
                    e("h3", Ai, v(p(d).editingArticle?.id ? o.embedded ? "编辑文章" : "✏️ 编辑文章" : o.embedded ? "保存新文章" : "➕ 保存新文章"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "收起",
                      onClick: t[34] || (t[34] = (s) => p(x).closeEditor())
                    }, "✕")
                  ]),
                  e("div", _i, [
                    e("div", $i, [
                      t[96] || (t[96] = e("label", { class: "bp-form-label" }, "文章标题 *", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[35] || (t[35] = (s) => K.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：a16z 提出 B2A 经济架构深度解析",
                        maxlength: "128"
                      }, null, 512), [
                        [$, K.value]
                      ])
                    ]),
                    e("div", Si, [
                      e("div", xi, [
                        t[97] || (t[97] = e("label", { class: "bp-form-label" }, "所属分组", -1)),
                        w(e("select", {
                          "onUpdate:modelValue": t[36] || (t[36] = (s) => se.value = s),
                          class: "bp-form-select"
                        }, [
                          (r(!0), a(y, null, I(je.value, (s) => (r(), a("option", {
                            key: s.id,
                            value: s.id
                          }, v(s.name), 9, Ii))), 128))
                        ], 512), [
                          [Je, se.value]
                        ])
                      ]),
                      e("div", Ti, [
                        e("label", Mi, [
                          w(e("input", {
                            "onUpdate:modelValue": t[37] || (t[37] = (s) => ne.value = s),
                            type: "checkbox"
                          }, null, 512), [
                            [ze, ne.value]
                          ]),
                          t[98] || (t[98] = e("span", null, "星标置顶", -1))
                        ])
                      ])
                    ]),
                    e("div", Bi, [
                      e("div", Ei, [
                        t[99] || (t[99] = e("label", { class: "bp-form-label" }, "原文网址（可选）", -1)),
                        w(e("input", {
                          "onUpdate:modelValue": t[38] || (t[38] = (s) => X.value = s),
                          type: "url",
                          class: "bp-form-input",
                          placeholder: "https://..."
                        }, null, 512), [
                          [$, X.value]
                        ])
                      ]),
                      e("div", Pi, [
                        t[100] || (t[100] = e("label", { class: "bp-form-label" }, "来源 / 作者（可选）", -1)),
                        w(e("input", {
                          "onUpdate:modelValue": t[39] || (t[39] = (s) => ee.value = s),
                          type: "text",
                          class: "bp-form-input",
                          placeholder: "例如：a16z News"
                        }, null, 512), [
                          [$, ee.value]
                        ])
                      ])
                    ]),
                    e("div", Vi, [
                      t[101] || (t[101] = e("label", { class: "bp-form-label" }, "核心摘要与推荐理由（可选）", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[40] || (t[40] = (s) => te.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "一句话提炼文章核心看点...",
                        maxlength: "256"
                      }, null, 512), [
                        [$, te.value]
                      ])
                    ]),
                    e("div", Ni, [
                      t[102] || (t[102] = e("label", { class: "bp-form-label" }, "文章正文内容 *", -1)),
                      w(e("textarea", {
                        "onUpdate:modelValue": t[41] || (t[41] = (s) => H.value = s),
                        class: "bp-form-input bp-textarea-main",
                        placeholder: "在此粘贴或撰写完整的文章长文本或 Markdown 内容..."
                      }, null, 512), [
                        [$, H.value]
                      ])
                    ]),
                    e("div", Di, [
                      t[103] || (t[103] = e("label", { class: "bp-form-label" }, "标签（用逗号或空格隔开）", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[42] || (t[42] = (s) => oe.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：AI, 产业观察, 商业模式"
                      }, null, 512), [
                        [$, oe.value]
                      ])
                    ])
                  ]),
                  e("footer", Li, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[43] || (t[43] = (s) => p(x).closeEditor())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary bp-btn-indigo",
                      onClick: Ct
                    }, "保存文章")
                  ])
                ])) : m("", !0)
              ]),
              _: 1
            }),
            F(be, { name: "drawer-slide" }, {
              default: P(() => [
                p(d).isReading && n.value === "articles" ? (r(), a("aside", Ri, [
                  e("header", Oi, [
                    e("div", Fi, [
                      e("span", ji, v(o.embedded ? "阅读模式" : "📖 阅读器"), 1),
                      p(d).readingArticle?.sourceName ? (r(), a("span", Ui, v(p(d).readingArticle.sourceName), 1)) : m("", !0)
                    ]),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "关闭阅读器",
                      onClick: t[44] || (t[44] = (s) => p(x).closeReader())
                    }, "✕")
                  ]),
                  e("div", Ji, [
                    e("h2", zi, v(p(d).readingArticle?.title), 1),
                    e("div", Ki, [
                      p(d).readingArticle?.sourceName ? (r(), a("span", Hi, v(o.embedded ? p(d).readingArticle.sourceName : `📰 ${p(d).readingArticle.sourceName}`), 1)) : m("", !0),
                      p(d).readingArticle?.updatedAt ? (r(), a("span", Qi, v(o.embedded ? pe(p(d).readingArticle.updatedAt) : `🕒 ${pe(p(d).readingArticle.updatedAt)}`), 1)) : m("", !0),
                      p(d).readingArticle?.url ? (r(), a("a", {
                        key: 2,
                        href: p(d).readingArticle.url,
                        target: "_blank",
                        rel: "noreferrer",
                        class: "bp-reader-link"
                      }, " 原文链接 ↗ ", 8, Yi)) : m("", !0)
                    ]),
                    p(d).readingArticle?.description ? (r(), a("blockquote", Gi, v(o.embedded ? p(d).readingArticle.description : `💡 ${p(d).readingArticle.description}`), 1)) : m("", !0),
                    e("div", Zi, [
                      F(He, {
                        content: p(d).readingArticle?.content || ""
                      }, null, 8, ["content"])
                    ])
                  ]),
                  e("footer", qi, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[45] || (t[45] = (s) => p(x).closeReader())
                    }, "关闭"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary bp-btn-indigo",
                      onClick: t[46] || (t[46] = (s) => p(d).readingArticle && Re(p(d).readingArticle))
                    }, " 一键复制全文 ")
                  ])
                ])) : m("", !0)
              ]),
              _: 1
            })
          ])
        ], 2)
      ]),
      _: 2
    }, [
      o.embedded ? {
        name: "header-tabs",
        fn: P(() => [
          e("nav", Ht, [
            e("button", {
              type: "button",
              role: "tab",
              "aria-selected": n.value === "prompts",
              class: C(["bp-seg-tab", { active: n.value === "prompts" }]),
              onClick: t[0] || (t[0] = (s) => ce("prompts"))
            }, [
              t[47] || (t[47] = e("span", null, "提示词", -1)),
              e("small", null, v(p(l).prompts.length), 1)
            ], 10, Qt),
            e("button", {
              type: "button",
              role: "tab",
              "aria-selected": n.value === "articles",
              class: C(["bp-seg-tab", { active: n.value === "articles" }]),
              onClick: t[1] || (t[1] = (s) => ce("articles"))
            }, [
              t[48] || (t[48] = e("span", null, "文章", -1)),
              e("small", null, v(p(d).articles.length), 1)
            ], 10, Yt),
            e("button", {
              type: "button",
              role: "tab",
              "aria-selected": n.value === "stickers",
              class: C(["bp-seg-tab", { active: n.value === "stickers" }]),
              onClick: t[2] || (t[2] = (s) => ce("stickers"))
            }, [...t[49] || (t[49] = [
              e("span", null, "表情包", -1)
            ])], 10, Gt)
          ])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["embedded", "visible"]));
  }
}), ar = /* @__PURE__ */ nt(Wi, [["__scopeId", "data-v-dd661043"]]);
export {
  ar as default
};
