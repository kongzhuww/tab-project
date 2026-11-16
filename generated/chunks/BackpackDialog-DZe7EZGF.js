import { d as ze, e as p, i as e, H as re, j as je, W as St, I as N, o as d, r as Ye, s as B, B as $t, u, A as _, t as f, f as m, l as k, F as w, g as I, y as It, k as P, n as $, h as A, m as x, p as ne, V as le, R as De, v as Re, b as y } from "./vendor-vue-C09jaOfK.js";
import { A as xt } from "./AppWindowFrame-CtzBF0Q7.js";
import { _ as Ge } from "./_plugin-vue_export-helper-BTb4PcVA.js";
import { w as Ve } from "./window-manager.store-CzUcQOW-.js";
import { au as j, av as Y, aw as Qe, ax as O, ay as L, az as Ze, aA as Tt } from "./view-styles-BWvP_cB-.js";
import { w as qe, P as pe, S as He, p as We, A as ue } from "./revision-guard-5IS-EcTI.js";
import { S as Et } from "./StickerBoard-BoyQDzab.js";
const Pt = {
  key: 0,
  class: "backpack-embedded",
  "aria-label": "AI 工作区资料库"
}, Nt = { class: "backpack-embedded-header" }, Bt = { class: "backpack-embedded-actions" }, Dt = /* @__PURE__ */ ze({
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
    return (l, v) => o.embedded ? (d(), p("section", Pt, [
      e("header", Nt, [
        v[2] || (v[2] = e("div", null, [
          e("small", null, "LIBRARY"),
          e("h2", null, "资料库"),
          e("p", null, "集中管理提示词、文章与表情包。")
        ], -1)),
        e("div", Bt, [
          re(l.$slots, "header-actions", {}, void 0, !0)
        ])
      ]),
      re(l.$slots, "default", {}, void 0, !0)
    ])) : (d(), je(xt, St({ key: 1 }, l.$attrs, {
      "window-id": o.windowId,
      title: o.title,
      onClose: v[0] || (v[0] = (b) => n("close")),
      onMinimize: v[1] || (v[1] = (b) => n("minimize"))
    }), {
      "header-actions": N(() => [
        re(l.$slots, "header-actions", {}, void 0, !0)
      ]),
      default: N(() => [
        re(l.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["window-id", "title"]));
  }
}), Rt = /* @__PURE__ */ Ge(Dt, [["__scopeId", "data-v-8cc30b4e"]]);
function ie(o) {
  if (!o) return [];
  const i = /* @__PURE__ */ new Set(), n = /\{\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}\}|\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}/g;
  let l;
  for (; (l = n.exec(o)) !== null; ) {
    const v = l[1] || l[2];
    v && !/^\d+$/.test(v) && i.add(v.trim());
  }
  return Array.from(i);
}
function Oe(o, i) {
  return o ? o.replace(/\{\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}\}|\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}/g, (n, l, v) => {
    const b = (l || v || "").trim();
    return i[b] !== void 0 && i[b] !== "" ? i[b] : n;
  }) : "";
}
const a = Ye({
  prompts: [],
  categories: [...Qe],
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
let Le = !1, be = 0, Fe = Promise.resolve();
function ce(o, i) {
  const n = [...i];
  return n.some((l) => l.id === "default") || n.push({ id: "default", name: "默认分组", icon: "📁", isBuiltin: !1 }), { prompts: [...o], categories: n };
}
function Vt() {
  try {
    if (typeof localStorage > "u") return null;
    const o = localStorage.getItem(Y), i = localStorage.getItem(j);
    if (!o && !i) return null;
    const n = o ? JSON.parse(o) : [], l = i ? JSON.parse(i) : null;
    return ce(
      Array.isArray(n) ? n : [],
      Array.isArray(l) && l.length ? l : Qe
    );
  } catch {
    return null;
  }
}
function de(o, i) {
  try {
    if (typeof localStorage > "u") return;
    localStorage.setItem(Y, JSON.stringify(o)), localStorage.setItem(j, JSON.stringify(i));
  } catch (n) {
    console.warn("[Backpack] persistToLocalStorage failed", n);
  }
}
const h = {
  get state() {
    return a;
  },
  async init() {
    if (Le) return;
    Le = !0, a.isLoading = !0;
    const o = Vt();
    o && o.prompts.length > 0 && (a.prompts = o.prompts, o.categories?.length && (a.categories = o.categories));
    try {
      if (typeof chrome < "u" && chrome.storage?.local) {
        const i = await chrome.storage.local.get([Y, j, pe]);
        be = We(i?.[pe]);
        const n = i?.[Y] || a.prompts, l = i?.[j] || a.categories, v = ce(n, l);
        a.prompts = v.prompts, a.categories = v.categories, JSON.stringify(i?.[Y]) !== JSON.stringify(v.prompts) || JSON.stringify(i?.[j]) !== JSON.stringify(v.categories) ? await this.save() : de(v.prompts, v.categories);
      } else {
        const i = ce(a.prompts, a.categories);
        a.prompts = i.prompts, a.categories = i.categories, de(a.prompts, a.categories);
      }
    } catch (i) {
      console.warn("[Backpack] init storage error:", i);
      const n = ce(a.prompts, a.categories);
      a.prompts = n.prompts, a.categories = n.categories;
    } finally {
      a.isLoading = !1;
    }
  },
  async save() {
    const o = JSON.parse(JSON.stringify(a.prompts)), i = JSON.parse(JSON.stringify(a.categories));
    if (typeof chrome < "u" && chrome.storage?.local) {
      const n = Fe.then(async () => {
        try {
          if (typeof navigator > "u" || !navigator.locks) throw new Error("浏览器不支持安全的背包写入锁");
          return be = await qe(chrome.storage.local, navigator.locks, pe, be, {
            [Y]: o,
            [j]: i
          }), de(o, i), a.statusMessage = "", !0;
        } catch (l) {
          return a.statusMessage = l instanceof He ? "提示词已在其他页面更改，当前修改未保存。请先导出本页内容，再刷新并核对。" : "提示词保存失败，当前修改未保存。请先导出本页内容，再检查存储。", console.warn("[Backpack] save failed", l), !1;
        }
      });
      return Fe = n, n;
    }
    return de(o, i), !0;
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
    return a.prompts.unshift(n), this.save(), n;
  },
  updatePrompt(o, i) {
    const n = a.prompts.findIndex((v) => v.id === o);
    if (n === -1) return !1;
    const l = a.prompts[n];
    return a.prompts[n] = {
      ...l,
      ...i,
      updatedAt: Date.now()
    }, this.save(), !0;
  },
  deletePrompt(o) {
    const i = a.prompts.length;
    return a.prompts = a.prompts.filter((n) => n.id !== o), a.selectedPromptId === o && (a.selectedPromptId = null), a.editingPrompt?.id === o && (a.isEditing = !1, a.editingPrompt = null), a.prompts.length !== i ? (this.save(), !0) : !1;
  },
  togglePin(o) {
    const i = a.prompts.find((n) => n.id === o);
    i && (i.pinned = !i.pinned, i.updatedAt = Date.now(), this.save());
  },
  async copyPromptText(o, i) {
    const n = i !== void 0 ? i : o.content;
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(n);
      else {
        const l = document.createElement("textarea");
        l.value = n, l.style.position = "fixed", l.style.opacity = "0", document.body.appendChild(l), l.select(), document.execCommand("copy"), document.body.removeChild(l);
      }
      return o.useCount = (o.useCount || 0) + 1, o.updatedAt = Date.now(), a.copySuccessId = o.id, setTimeout(() => {
        a.copySuccessId === o.id && (a.copySuccessId = null);
      }, 1800), this.save(), !0;
    } catch (l) {
      return console.warn("[Backpack] copy failed", l), !1;
    }
  },
  openVariableDialog(o) {
    const i = ie(o.content), n = {};
    for (const l of i)
      n[l] = "";
    a.variableTargetPrompt = o, a.variableFormValues = n, a.isVariableDialogOpen = !0;
  },
  closeVariableDialog() {
    a.isVariableDialogOpen = !1, a.variableTargetPrompt = null, a.variableFormValues = {};
  },
  openEditor(o) {
    o ? a.editingPrompt = { ...o, tags: [...o.tags] } : a.editingPrompt = {
      id: "",
      title: "",
      content: "",
      description: "",
      category: a.activeCategoryId === "all" || a.activeCategoryId === "starred" ? "default" : a.activeCategoryId,
      tags: [],
      pinned: !1,
      createdAt: 0,
      updatedAt: 0,
      useCount: 0
    }, a.isEditing = !0;
  },
  closeEditor() {
    a.isEditing = !1, a.editingPrompt = null;
  },
  saveEditorData(o) {
    a.editingPrompt?.id ? this.updatePrompt(a.editingPrompt.id, o) : this.createPrompt(o), this.closeEditor();
  },
  addCategory(o, i = "📁") {
    const n = o.trim();
    if (!n || a.categories.some((v) => v.name === n)) return !1;
    const l = `cat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    return a.categories.push({ id: l, name: n, icon: i, isBuiltin: !1 }), this.save(), !0;
  },
  renameCategory(o, i) {
    const n = i.trim();
    if (!n) return !1;
    const l = a.categories.find((v) => v.id === o);
    return !l || l.isBuiltin ? !1 : (l.name = n, this.save(), !0);
  },
  deleteCategory(o) {
    const i = a.categories.find((n) => n.id === o);
    if (!i || i.isBuiltin) return !1;
    a.categories = a.categories.filter((n) => n.id !== o), a.activeCategoryId === o && (a.activeCategoryId = "all");
    for (const n of a.prompts)
      n.category === o && (n.category = "default");
    return this.save(), !0;
  },
  exportBackup() {
    const o = {
      version: 1,
      appName: "tab-project-backpack",
      exportedAt: Date.now(),
      prompts: a.prompts,
      categories: a.categories
    }, i = new Blob([JSON.stringify(o, null, 2)], { type: "application/json" }), n = URL.createObjectURL(i), l = document.createElement("a"), v = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    l.href = n, l.download = `prompts-backpack-backup-${v}.json`, document.body.appendChild(l), l.click(), document.body.removeChild(l), URL.revokeObjectURL(n);
  },
  importBackup(o) {
    try {
      const i = JSON.parse(o);
      if (!i || !Array.isArray(i.prompts))
        return { success: !1, count: 0, error: "导入文件格式不合规，缺少 prompts 数组" };
      let n = 0;
      const l = new Set(a.prompts.map((b) => b.id)), v = [];
      for (const b of i.prompts) {
        if (!b || typeof b.title != "string" || typeof b.content != "string")
          continue;
        const C = {
          id: b.id && !l.has(b.id) ? b.id : `prompt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: b.title.trim() || "未命名提示词",
          content: b.content,
          description: typeof b.description == "string" ? b.description : "",
          category: typeof b.category == "string" ? b.category : "coding",
          tags: Array.isArray(b.tags) ? b.tags.map(String).filter(Boolean) : [],
          pinned: !!b.pinned,
          createdAt: typeof b.createdAt == "number" ? b.createdAt : Date.now(),
          updatedAt: Date.now(),
          useCount: typeof b.useCount == "number" ? b.useCount : 0
        };
        v.push(C), l.add(C.id), n++;
      }
      if (n === 0)
        return { success: !1, count: 0, error: "未在文件中找到有效提示词条目" };
      if (Array.isArray(i.categories))
        for (const b of i.categories)
          b && b.name && !a.categories.some((C) => C.name === b.name) && a.categories.push({
            id: b.id || `cat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: String(b.name).trim(),
            icon: typeof b.icon == "string" ? b.icon : "📁",
            isBuiltin: !1
          });
      return a.prompts = [...v, ...a.prompts], this.save(), { success: !0, count: n };
    } catch (i) {
      return { success: !1, count: 0, error: `解析 JSON 失败: ${i?.message || i}` };
    }
  }
}, ge = B(() => {
  const o = a.searchQuery.trim().toLowerCase(), i = a.activeCategoryId, n = a.selectedTag;
  return a.prompts.filter((l) => {
    if (i === "starred") {
      if (!l.pinned) return !1;
    } else if (i !== "all" && l.category !== i)
      return !1;
    if (n && !l.tags.includes(n))
      return !1;
    if (o) {
      const v = l.title.toLowerCase().includes(o), b = l.description?.toLowerCase().includes(o), C = l.content.toLowerCase().includes(o), T = l.tags.some((D) => D.toLowerCase().includes(o));
      if (!v && !b && !C && !T)
        return !1;
    }
    return !0;
  }).sort((l, v) => l.pinned && !v.pinned ? -1 : !l.pinned && v.pinned ? 1 : v.updatedAt - l.updatedAt);
}), Me = B(() => {
  const o = /* @__PURE__ */ new Set();
  for (const i of a.prompts)
    if (Array.isArray(i.tags))
      for (const n of i.tags)
        n.trim() && o.add(n.trim());
  return Array.from(o);
}), r = Ye({
  articles: [],
  categories: [...Ze],
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
let Ue = !1, fe = 0, Je = Promise.resolve();
function Ot() {
  try {
    if (typeof localStorage > "u") return null;
    const o = localStorage.getItem(L), i = localStorage.getItem(O);
    if (!o && !i) return null;
    const n = o ? JSON.parse(o) : [], l = i ? JSON.parse(i) : null;
    return {
      articles: Array.isArray(n) ? n : [],
      categories: Array.isArray(l) && l.length ? l : Ze
    };
  } catch {
    return null;
  }
}
function ve(o, i) {
  try {
    if (typeof localStorage > "u") return;
    localStorage.setItem(L, JSON.stringify(o)), localStorage.setItem(O, JSON.stringify(i));
  } catch (n) {
    console.warn("[ArticleService] persistToLocalStorage failed", n);
  }
}
const S = {
  get state() {
    return r;
  },
  async init() {
    if (Ue) return;
    Ue = !0, r.isLoading = !0;
    const o = Ot();
    o && (r.articles = o.articles, o.categories?.length && (r.categories = o.categories));
    try {
      if (typeof chrome < "u" && chrome.storage?.local) {
        const i = await chrome.storage.local.get([L, O, ue]);
        fe = We(i?.[ue]), i?.[L] && Array.isArray(i[L]) && (r.articles = i[L]), i?.[O] && Array.isArray(i[O]) && (r.categories = i[O]);
      } else o || ve(r.articles, r.categories);
    } catch (i) {
      console.warn("[ArticleService] init storage error:", i);
    } finally {
      r.isLoading = !1;
    }
  },
  async save() {
    const o = JSON.parse(JSON.stringify(r.articles)), i = JSON.parse(JSON.stringify(r.categories));
    if (typeof chrome < "u" && chrome.storage?.local) {
      const n = Je.then(async () => {
        try {
          if (typeof navigator > "u" || !navigator.locks) throw new Error("浏览器不支持安全的背包写入锁");
          return fe = await qe(chrome.storage.local, navigator.locks, ue, fe, {
            [L]: o,
            [O]: i
          }), ve(o, i), r.statusMessage = "", !0;
        } catch (l) {
          return r.statusMessage = l instanceof He ? "文章已在其他页面更改，当前修改未保存。请先导出本页内容，再刷新并核对。" : "文章保存失败，当前修改未保存。请先导出本页内容，再检查存储。", console.warn("[ArticleService] save failed", l), !1;
        }
      });
      return Je = n, n;
    }
    return ve(o, i), !0;
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
    return r.articles.unshift(n), this.save(), n;
  },
  updateArticle(o, i) {
    const n = r.articles.findIndex((v) => v.id === o);
    if (n === -1) return !1;
    const l = r.articles[n];
    return r.articles[n] = {
      ...l,
      ...i,
      updatedAt: Date.now()
    }, this.save(), !0;
  },
  deleteArticle(o) {
    const i = r.articles.length;
    return r.articles = r.articles.filter((n) => n.id !== o), r.selectedArticleId === o && (r.selectedArticleId = null), r.editingArticle?.id === o && (r.isEditing = !1, r.editingArticle = null), r.readingArticle?.id === o && (r.isReading = !1, r.readingArticle = null), r.articles.length !== i ? (this.save(), !0) : !1;
  },
  togglePin(o) {
    const i = r.articles.find((n) => n.id === o);
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
      return r.copySuccessId = o.id, setTimeout(() => {
        r.copySuccessId === o.id && (r.copySuccessId = null);
      }, 1800), !0;
    } catch (n) {
      return console.warn("[ArticleService] copy failed", n), !1;
    }
  },
  openEditor(o) {
    r.isReading = !1, o ? r.editingArticle = { ...o, tags: [...o.tags] } : r.editingArticle = {
      id: "",
      title: "",
      content: "",
      url: "",
      sourceName: "",
      description: "",
      category: r.activeCategoryId === "all" || r.activeCategoryId === "starred" ? "default" : r.activeCategoryId,
      tags: [],
      pinned: !1,
      createdAt: 0,
      updatedAt: 0
    }, r.isEditing = !0;
  },
  closeEditor() {
    r.isEditing = !1, r.editingArticle = null;
  },
  openReader(o) {
    r.isEditing = !1, r.readingArticle = o, r.isReading = !0;
  },
  closeReader() {
    r.isReading = !1, r.readingArticle = null;
  },
  saveEditorData(o) {
    r.editingArticle?.id ? this.updateArticle(r.editingArticle.id, o) : this.createArticle(o), this.closeEditor();
  },
  addCategory(o, i = "📁") {
    const n = o.trim();
    if (!n || r.categories.some((v) => v.name === n)) return !1;
    const l = `cat-art-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    return r.categories.push({ id: l, name: n, icon: i, isBuiltin: !1 }), this.save(), !0;
  },
  renameCategory(o, i) {
    const n = i.trim();
    if (!n) return !1;
    const l = r.categories.find((v) => v.id === o);
    return !l || l.isBuiltin ? !1 : (l.name = n, this.save(), !0);
  },
  deleteCategory(o) {
    const i = r.categories.find((n) => n.id === o);
    if (!i || i.isBuiltin) return !1;
    r.categories = r.categories.filter((n) => n.id !== o), r.activeCategoryId === o && (r.activeCategoryId = "all");
    for (const n of r.articles)
      n.category === o && (n.category = "default");
    return this.save(), !0;
  },
  exportBackup() {
    const o = {
      version: 1,
      appName: "tab-project-articles",
      exportedAt: Date.now(),
      articles: r.articles,
      categories: r.categories
    }, i = new Blob([JSON.stringify(o, null, 2)], { type: "application/json" }), n = URL.createObjectURL(i), l = document.createElement("a"), v = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    l.href = n, l.download = `saved-articles-backup-${v}.json`, document.body.appendChild(l), l.click(), document.body.removeChild(l), URL.revokeObjectURL(n);
  },
  importBackup(o) {
    try {
      const i = JSON.parse(o);
      if (!i || !Array.isArray(i.articles))
        return { success: !1, count: 0, error: "导入文件格式不合规，缺少 articles 数组" };
      let n = 0;
      const l = new Set(r.articles.map((b) => b.id)), v = [];
      for (const b of i.articles) {
        if (!b || typeof b.title != "string" || typeof b.content != "string")
          continue;
        const C = {
          id: b.id && !l.has(b.id) ? b.id : `art-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: b.title.trim() || "未命名文章",
          content: b.content,
          url: typeof b.url == "string" ? b.url : "",
          sourceName: typeof b.sourceName == "string" ? b.sourceName : "",
          description: typeof b.description == "string" ? b.description : "",
          category: typeof b.category == "string" ? b.category : "default",
          tags: Array.isArray(b.tags) ? b.tags.map(String).filter(Boolean) : [],
          pinned: !!b.pinned,
          createdAt: typeof b.createdAt == "number" ? b.createdAt : Date.now(),
          updatedAt: Date.now()
        };
        v.push(C), l.add(C.id), n++;
      }
      if (n === 0)
        return { success: !1, count: 0, error: "未在文件中找到有效文章条目" };
      if (Array.isArray(i.categories))
        for (const b of i.categories)
          b && b.name && !r.categories.some((C) => C.name === b.name) && r.categories.push({
            id: b.id || `cat-art-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: String(b.name).trim(),
            icon: typeof b.icon == "string" ? b.icon : "📁",
            isBuiltin: !1
          });
      return r.articles = [...v, ...r.articles], this.save(), { success: !0, count: n };
    } catch (i) {
      return { success: !1, count: 0, error: `解析 JSON 失败: ${i?.message || i}` };
    }
  }
}, me = B(() => {
  const o = r.activeCategoryId, i = r.selectedTag;
  return r.articles.filter((n) => {
    if (o === "starred") {
      if (!n.pinned) return !1;
    } else if (o !== "all" && n.category !== o)
      return !1;
    return !(i && !n.tags.includes(i));
  }).sort((n, l) => n.pinned && !l.pinned ? -1 : !n.pinned && l.pinned ? 1 : l.updatedAt - n.updatedAt);
}), Ke = B(() => {
  const o = /* @__PURE__ */ new Set();
  for (const i of r.articles)
    if (Array.isArray(i.tags))
      for (const n of i.tags)
        n.trim() && o.add(n.trim());
  return Array.from(o);
}), Lt = {
  key: 0,
  class: "bp-alert-tip-bar"
}, Ft = {
  key: 1,
  class: "bp-alert-tip-bar",
  role: "alert"
}, Mt = {
  key: 2,
  class: "bp-alert-tip-bar",
  role: "alert"
}, Ut = { class: "bp-work-area" }, Jt = { class: "bp-bili-sidebar" }, Kt = { class: "bp-sidebar-toggle-title" }, zt = {
  key: 0,
  class: "bp-sidebar-toggle-icon"
}, jt = { class: "bp-sidebar-toggle-action" }, Yt = { class: "bp-sidebar-toggle-chevron" }, Gt = { class: "bp-channels-list" }, Qt = ["onClick"], Zt = { class: "bp-channel-main" }, qt = {
  key: 0,
  class: "bp-channel-icon"
}, Ht = { class: "bp-channel-text" }, Wt = {
  key: 0,
  class: "bp-channel-badge"
}, Xt = { class: "bp-sidebar-favorite-hub" }, es = { class: "bp-hub-main" }, ts = {
  key: 0,
  class: "bp-hub-icon"
}, ss = {
  key: 0,
  class: "bp-add-category-box"
}, os = { class: "bp-folder-list" }, ns = {
  key: 0,
  class: "bp-folder-inline-edit"
}, is = ["onKeydown"], as = ["onClick"], rs = ["onClick"], ls = {
  key: 0,
  class: "bp-folder-icon"
}, ds = ["title"], cs = {
  key: 1,
  class: "bp-folder-badge"
}, ps = {
  key: 2,
  class: "bp-folder-badge"
}, us = {
  key: 3,
  class: "bp-folder-badge"
}, bs = {
  key: 2,
  class: "bp-folder-actions"
}, gs = ["onClick"], fs = ["onClick"], vs = {
  key: 1,
  class: "bp-tags-container"
}, ms = { class: "bp-tags-cloud" }, ys = ["onClick"], ks = { class: "bp-sidebar-favorite-hub bp-hub-article" }, hs = { class: "bp-hub-main" }, Cs = {
  key: 0,
  class: "bp-hub-icon"
}, ws = {
  key: 0,
  class: "bp-add-category-box"
}, _s = { class: "bp-folder-list" }, As = {
  key: 0,
  class: "bp-folder-inline-edit"
}, Ss = ["onKeydown"], $s = ["onClick"], Is = ["onClick"], xs = {
  key: 0,
  class: "bp-folder-icon"
}, Ts = ["title"], Es = {
  key: 1,
  class: "bp-folder-badge"
}, Ps = {
  key: 2,
  class: "bp-folder-badge"
}, Ns = {
  key: 3,
  class: "bp-folder-badge"
}, Bs = {
  key: 2,
  class: "bp-folder-actions"
}, Ds = ["onClick"], Rs = ["onClick"], Vs = {
  key: 1,
  class: "bp-tags-container"
}, Os = { class: "bp-tags-cloud" }, Ls = ["onClick"], Fs = {
  key: 0,
  class: "bp-content-pane"
}, Ms = { class: "bp-pane-header" }, Us = { class: "bp-result-stats" }, Js = {
  key: 0,
  class: "bp-active-filter-badge"
}, Ks = {
  key: 0,
  class: "bp-empty-state"
}, zs = {
  key: 1,
  class: "bp-card-grid"
}, js = { class: "bp-card-header" }, Ys = { class: "bp-card-title-group" }, Gs = ["title", "onClick"], Qs = ["title"], Zs = { class: "bp-card-actions" }, qs = ["onClick"], Hs = ["onClick"], Ws = {
  key: 0,
  class: "bp-card-desc"
}, Xs = ["title"], eo = {
  key: 1,
  class: "bp-card-vars"
}, to = ["title", "onClick"], so = { class: "bp-card-footer" }, oo = { class: "bp-card-tags" }, no = ["onClick"], io = { class: "bp-card-button-row" }, ao = {
  key: 0,
  class: "bp-copied-tip"
}, ro = ["onClick"], lo = ["onClick"], co = {
  key: 1,
  class: "bp-content-pane"
}, po = { class: "bp-pane-header" }, uo = { class: "bp-result-stats" }, bo = {
  key: 0,
  class: "bp-active-filter-badge bp-badge-indigo"
}, go = {
  key: 0,
  class: "bp-empty-state"
}, fo = {
  key: 1,
  class: "bp-card-grid"
}, vo = { class: "bp-card-header" }, mo = { class: "bp-card-title-group" }, yo = ["title", "onClick"], ko = ["title"], ho = { class: "bp-card-actions" }, Co = ["href"], wo = ["onClick"], _o = ["onClick"], Ao = {
  key: 0,
  class: "bp-article-meta-line"
}, So = {
  key: 0,
  class: "bp-article-source"
}, $o = { class: "bp-article-date" }, Io = {
  key: 1,
  class: "bp-card-desc"
}, xo = ["title"], To = { class: "bp-card-footer" }, Eo = { class: "bp-card-tags" }, Po = ["onClick"], No = { class: "bp-card-button-row" }, Bo = {
  key: 0,
  class: "bp-copied-tip"
}, Do = ["onClick"], Ro = ["onClick"], Vo = {
  key: 2,
  class: "bp-content-pane bp-stickers-wrapper"
}, Oo = {
  key: 0,
  class: "bp-side-drawer"
}, Lo = { class: "bp-drawer-header" }, Fo = { class: "bp-drawer-title" }, Mo = { class: "bp-drawer-body" }, Uo = { class: "bp-form-group" }, Jo = { class: "bp-form-row" }, Ko = { class: "bp-form-group flex-1" }, zo = ["value"], jo = { class: "bp-form-group bp-form-checkbox-group" }, Yo = { class: "bp-checkbox-label" }, Go = { class: "bp-form-group" }, Qo = { class: "bp-form-group flex-fill" }, Zo = {
  key: 0,
  class: "bp-detected-vars"
}, qo = { class: "bp-form-group" }, Ho = { class: "bp-drawer-footer" }, Wo = {
  key: 0,
  class: "bp-side-drawer"
}, Xo = { class: "bp-drawer-header" }, en = { class: "bp-drawer-body" }, tn = { class: "bp-drawer-desc" }, sn = { class: "bp-vars-form" }, on = { class: "bp-form-label" }, nn = ["onUpdate:modelValue", "placeholder"], an = { class: "bp-preview-box" }, rn = { class: "bp-preview-text" }, ln = { class: "bp-drawer-footer" }, dn = {
  key: 0,
  class: "bp-side-drawer bp-drawer-article"
}, cn = { class: "bp-drawer-header" }, pn = { class: "bp-drawer-title" }, un = { class: "bp-drawer-body" }, bn = { class: "bp-form-group" }, gn = { class: "bp-form-row" }, fn = { class: "bp-form-group flex-1" }, vn = ["value"], mn = { class: "bp-form-group bp-form-checkbox-group" }, yn = { class: "bp-checkbox-label" }, kn = { class: "bp-form-row" }, hn = { class: "bp-form-group flex-1" }, Cn = { class: "bp-form-group flex-1" }, wn = { class: "bp-form-group" }, _n = { class: "bp-form-group flex-fill" }, An = { class: "bp-form-group" }, Sn = { class: "bp-drawer-footer" }, $n = {
  key: 0,
  class: "bp-side-drawer bp-reader-drawer"
}, In = { class: "bp-drawer-header" }, xn = { class: "bp-reader-head-info" }, Tn = {
  key: 0,
  class: "bp-reader-source"
}, En = { class: "bp-drawer-body bp-reader-body" }, Pn = { class: "bp-reader-title" }, Nn = { class: "bp-reader-meta" }, Bn = { key: 0 }, Dn = { key: 1 }, Rn = ["href"], Vn = {
  key: 0,
  class: "bp-reader-quote"
}, On = { class: "bp-reader-text" }, Ln = { class: "bp-drawer-footer" }, Fn = /* @__PURE__ */ ze({
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
    ], n = y("prompts"), l = y(!1), v = y(!1), b = y(""), C = y(null), T = y(""), D = y(!1), ae = y(""), F = y(null), M = y(""), ye = y(null), ke = y(null), U = y(""), J = y(""), R = y(""), G = y(""), Q = y("default"), Z = y(""), q = y(!1), K = y(""), z = y(""), H = y(""), W = y(""), X = y(""), ee = y("default"), te = y(""), se = y(!1);
    $t(() => {
      h.init(), S.init();
    });
    function Xe() {
      l.value = !l.value;
    }
    function et(c) {
      n.value = c, a.isEditing = !1, a.isVariableDialogOpen = !1, r.isEditing = !1, r.isReading = !1;
    }
    function tt(c) {
      a.activeCategoryId = c;
    }
    function he(c) {
      a.selectedTag = a.selectedTag === c ? null : c;
    }
    function st(c) {
      r.activeCategoryId = c;
    }
    function Ce(c) {
      r.selectedTag = r.selectedTag === c ? null : c;
    }
    function ot() {
      Ve.close("backpack");
    }
    function nt() {
      Ve.minimize("backpack");
    }
    function it(c) {
      h.copyPromptText(c);
    }
    function we(c) {
      a.isEditing = !1, h.openVariableDialog(c);
    }
    function at() {
      if (!a.variableTargetPrompt) return;
      const c = Oe(
        a.variableTargetPrompt.content,
        a.variableFormValues
      );
      h.copyPromptText(a.variableTargetPrompt, c), h.closeVariableDialog();
    }
    const rt = B(() => a.variableTargetPrompt ? Oe(
      a.variableTargetPrompt.content,
      a.variableFormValues
    ) : ""), _e = B(() => ie(R.value));
    function Ae() {
      a.isVariableDialogOpen = !1, J.value = "", R.value = "", G.value = "", Q.value = a.activeCategoryId === "all" || a.activeCategoryId === "starred" ? Ie.value[0]?.id || "default" : a.activeCategoryId, Z.value = "", q.value = !1, h.openEditor();
    }
    function lt(c) {
      a.isVariableDialogOpen = !1, J.value = c.title, R.value = c.content, G.value = c.description || "", Q.value = c.category, Z.value = c.tags.join(", "), q.value = !!c.pinned, h.openEditor(c);
    }
    function dt() {
      if (!J.value.trim() && !R.value.trim()) return;
      const c = Z.value.split(/[,，\s]+/).map((t) => t.trim()).filter(Boolean);
      h.saveEditorData({
        title: J.value.trim() || "未命名提示词",
        content: R.value,
        description: G.value.trim(),
        category: Q.value || "default",
        tags: c,
        pinned: q.value
      });
    }
    function ct(c) {
      typeof window < "u" && !window.confirm("确定要删除这条提示词吗？") || h.deletePrompt(c);
    }
    function pt(c) {
      h.togglePin(c);
    }
    function Se() {
      const c = b.value.trim();
      c && h.addCategory(c) && (b.value = "", v.value = !1);
    }
    function ut(c) {
      C.value = c.id, T.value = c.name;
    }
    function $e(c) {
      T.value.trim() && h.renameCategory(c, T.value.trim()), C.value = null, T.value = "";
    }
    function bt(c) {
      typeof window < "u" && !window.confirm(`确定删除分组「${c.name}」吗？组内提示词将归入默认分组。`) || h.deleteCategory(c.id);
    }
    const Ie = B(() => a.categories.filter((c) => c.id !== "all" && c.id !== "starred"));
    function xe() {
      r.isReading = !1, K.value = "", z.value = "", H.value = "", W.value = "", X.value = "", ee.value = r.activeCategoryId === "all" || r.activeCategoryId === "starred" ? Ne.value[0]?.id || "default" : r.activeCategoryId, te.value = "", se.value = !1, S.openEditor();
    }
    function gt(c) {
      r.isReading = !1, K.value = c.title, z.value = c.content, H.value = c.url || "", W.value = c.sourceName || "", X.value = c.description || "", ee.value = c.category, te.value = c.tags.join(", "), se.value = !!c.pinned, S.openEditor(c);
    }
    function ft(c) {
      S.openReader(c);
    }
    function vt() {
      if (!K.value.trim() && !z.value.trim()) return;
      const c = te.value.split(/[,，\s]+/).map((t) => t.trim()).filter(Boolean);
      S.saveEditorData({
        title: K.value.trim() || "未命名文章",
        content: z.value,
        url: H.value.trim(),
        sourceName: W.value.trim(),
        description: X.value.trim(),
        category: ee.value || "default",
        tags: c,
        pinned: se.value
      });
    }
    function mt(c) {
      typeof window < "u" && !window.confirm("确定要删除这篇保存的文章吗？") || S.deleteArticle(c);
    }
    function yt(c) {
      S.togglePin(c);
    }
    function Te(c) {
      S.copyArticleText(c);
    }
    function Ee() {
      const c = ae.value.trim();
      c && S.addCategory(c) && (ae.value = "", D.value = !1);
    }
    function kt(c) {
      F.value = c.id, M.value = c.name;
    }
    function Pe(c) {
      M.value.trim() && S.renameCategory(c, M.value.trim()), F.value = null, M.value = "";
    }
    function ht(c) {
      typeof window < "u" && !window.confirm(`确定删除分组「${c.name}」吗？组内文章将归入默认分组。`) || S.deleteCategory(c.id);
    }
    const Ne = B(() => r.categories.filter((c) => c.id !== "all" && c.id !== "starred"));
    function Ct() {
      ye.value?.click();
    }
    function wt() {
      ke.value?.click();
    }
    function _t(c) {
      const t = c.target, s = t.files?.[0];
      if (!s) return;
      const g = new FileReader();
      g.onload = (E) => {
        const oe = E.target?.result;
        if (oe) {
          const V = h.importBackup(oe);
          U.value = V.success ? `成功导入 ${V.count} 条提示词！` : V.error || "导入失败", setTimeout(() => {
            U.value = "";
          }, 3500);
        }
        t.value = "";
      }, g.readAsText(s);
    }
    function At(c) {
      const t = c.target, s = t.files?.[0];
      if (!s) return;
      const g = new FileReader();
      g.onload = (E) => {
        const oe = E.target?.result;
        if (oe) {
          const V = S.importBackup(oe);
          U.value = V.success ? `成功导入 ${V.count} 篇文章！` : V.error || "导入失败", setTimeout(() => {
            U.value = "";
          }, 3500);
        }
        t.value = "";
      }, g.readAsText(s);
    }
    function Be(c) {
      if (!c) return "";
      const t = new Date(c);
      return `${t.getMonth() + 1}/${t.getDate()}`;
    }
    return (c, t) => (d(), je(Rt, {
      embedded: o.embedded,
      id: "backpack-workspace-dialog",
      "window-id": "backpack",
      title: "背包工作台",
      icon: "🎒",
      visible: u(Tt).visible,
      "default-width": 980,
      "default-height": 660,
      "min-width": 740,
      "min-height": 500,
      "custom-class": "lw-backpack-window",
      onClose: ot,
      onMinimize: nt
    }, {
      "header-actions": N(() => [
        e("div", {
          class: _(["bp-top-actions", { "bp-integrated": o.embedded }])
        }, [
          n.value === "prompts" ? (d(), p(w, { key: 0 }, [
            e("button", {
              type: "button",
              class: _(["bp-btn bp-btn-primary", { active: u(a).isEditing }]),
              title: "新建提示词",
              onClick: Ae
            }, [...t[41] || (t[41] = [
              e("span", { class: "bp-icon" }, "➕", -1),
              e("span", null, "新建提示词", -1)
            ])], 2),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "导出备份",
              onClick: t[0] || (t[0] = (s) => u(h).exportBackup())
            }, [...t[42] || (t[42] = [
              e("span", { class: "bp-icon" }, "💾", -1),
              e("span", null, "导出", -1)
            ])]),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "从文件导入",
              onClick: Ct
            }, [...t[43] || (t[43] = [
              e("span", { class: "bp-icon" }, "📥", -1),
              e("span", null, "导入", -1)
            ])]),
            e("input", {
              ref_key: "promptFileInputRef",
              ref: ye,
              type: "file",
              accept: ".json",
              style: { display: "none" },
              onChange: _t
            }, null, 544)
          ], 64)) : n.value === "articles" ? (d(), p(w, { key: 1 }, [
            e("button", {
              type: "button",
              class: _(["bp-btn bp-btn-primary bp-btn-article-pri", { active: u(r).isEditing }]),
              title: "保存新文章",
              onClick: xe
            }, [...t[44] || (t[44] = [
              e("span", { class: "bp-icon" }, "➕", -1),
              e("span", null, "新建文章", -1)
            ])], 2),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "导出文章备份",
              onClick: t[1] || (t[1] = (s) => u(S).exportBackup())
            }, [...t[45] || (t[45] = [
              e("span", { class: "bp-icon" }, "💾", -1),
              e("span", null, "导出", -1)
            ])]),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "从文件导入文章",
              onClick: wt
            }, [...t[46] || (t[46] = [
              e("span", { class: "bp-icon" }, "📥", -1),
              e("span", null, "导入", -1)
            ])]),
            e("input", {
              ref_key: "articleFileInputRef",
              ref: ke,
              type: "file",
              accept: ".json",
              style: { display: "none" },
              onChange: At
            }, null, 544)
          ], 64)) : m("", !0)
        ], 2)
      ]),
      default: N(() => [
        e("div", {
          class: _(["bp-container", { "bp-integrated": o.embedded }])
        }, [
          U.value ? (d(), p("div", Lt, f(U.value), 1)) : m("", !0),
          u(a).statusMessage ? (d(), p("div", Ft, f(u(a).statusMessage), 1)) : m("", !0),
          u(r).statusMessage ? (d(), p("div", Mt, f(u(r).statusMessage), 1)) : m("", !0),
          e("div", Ut, [
            e("aside", Jt, [
              e("div", {
                class: _(["bp-sidebar-toggle-bar", { "is-collapsed": l.value }]),
                onClick: Xe
              }, [
                e("div", Kt, [
                  o.embedded ? m("", !0) : (d(), p("span", zt, "⚡")),
                  t[47] || (t[47] = e("strong", null, "快捷频道", -1))
                ]),
                e("div", jt, [
                  e("span", null, f(l.value ? "展开" : "收起"), 1),
                  e("span", Yt, f(l.value ? "▾" : "▴"), 1)
                ])
              ], 2),
              k(e("div", Gt, [
                (d(), p(w, null, I(i, (s) => e("div", {
                  key: s.id,
                  class: _(["bp-channel-wrap", s.themeClass])
                }, [
                  e("button", {
                    type: "button",
                    class: _(["bp-channel-btn", { on: n.value === s.id }]),
                    onClick: (g) => et(s.id)
                  }, [
                    e("div", Zt, [
                      o.embedded ? m("", !0) : (d(), p("span", qt, f(s.icon), 1)),
                      e("div", Ht, [
                        e("strong", null, f(s.title), 1),
                        e("small", null, f(s.subTitle), 1)
                      ])
                    ]),
                    o.embedded ? m("", !0) : (d(), p("span", Wt, f(s.badge), 1))
                  ], 10, Qt)
                ], 2)), 64))
              ], 512), [
                [It, !l.value]
              ]),
              n.value === "prompts" ? (d(), p(w, { key: 0 }, [
                e("div", Xt, [
                  e("div", es, [
                    o.embedded ? m("", !0) : (d(), p("span", ts, "📁")),
                    t[48] || (t[48] = e("div", { class: "bp-hub-text" }, [
                      e("strong", null, "提示词分组"),
                      e("small", null, "按自定义分组整理")
                    ], -1))
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-hub-add-btn",
                    title: "新增分组",
                    onClick: t[2] || (t[2] = (s) => v.value = !0)
                  }, "＋")
                ]),
                v.value ? (d(), p("div", ss, [
                  k(e("input", {
                    "onUpdate:modelValue": t[3] || (t[3] = (s) => b.value = s),
                    type: "text",
                    class: "bp-add-cat-input",
                    placeholder: "分组名称...",
                    maxlength: "16",
                    autofocus: "",
                    onKeydown: [
                      P(Se, ["enter"]),
                      t[4] || (t[4] = P((s) => v.value = !1, ["esc"]))
                    ]
                  }, null, 544), [
                    [$, b.value]
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini primary",
                    onClick: Se
                  }, "✔"),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini",
                    onClick: t[5] || (t[5] = (s) => v.value = !1)
                  }, "✕")
                ])) : m("", !0),
                e("div", os, [
                  (d(!0), p(w, null, I(u(a).categories, (s) => (d(), p("div", {
                    key: s.id,
                    class: _(["bp-folder-row", { active: u(a).activeCategoryId === s.id }])
                  }, [
                    C.value === s.id ? (d(), p("div", ns, [
                      k(e("input", {
                        "onUpdate:modelValue": t[6] || (t[6] = (g) => T.value = g),
                        type: "text",
                        class: "bp-folder-rename-input",
                        maxlength: "16",
                        autofocus: "",
                        onKeydown: [
                          P((g) => $e(s.id), ["enter"]),
                          t[7] || (t[7] = P((g) => C.value = null, ["esc"]))
                        ]
                      }, null, 40, is), [
                        [$, T.value]
                      ]),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini primary",
                        onClick: (g) => $e(s.id)
                      }, "✔", 8, as),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini",
                        onClick: t[8] || (t[8] = (g) => C.value = null)
                      }, "✕")
                    ])) : (d(), p("button", {
                      key: 1,
                      type: "button",
                      class: "bp-folder-btn",
                      onClick: (g) => tt(s.id)
                    }, [
                      o.embedded ? m("", !0) : (d(), p("span", ls, f(s.icon || "📁"), 1)),
                      e("span", {
                        class: "bp-folder-name",
                        title: s.name
                      }, f(s.name), 9, ds),
                      s.id === "all" ? (d(), p("span", cs, f(u(a).prompts.length), 1)) : s.id === "starred" ? (d(), p("span", ps, f(u(a).prompts.filter((g) => g.pinned).length), 1)) : (d(), p("span", us, f(u(a).prompts.filter((g) => g.category === s.id).length), 1))
                    ], 8, rs)),
                    !s.isBuiltin && C.value !== s.id ? (d(), p("div", bs, [
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn",
                        title: "重命名",
                        onClick: A((g) => ut(s), ["stop"])
                      }, "✏️", 8, gs),
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn danger",
                        title: "删除",
                        onClick: A((g) => bt(s), ["stop"])
                      }, "🗑️", 8, fs)
                    ])) : m("", !0)
                  ], 2))), 128))
                ]),
                !o.embedded && u(Me).length > 0 ? (d(), p("div", vs, [
                  t[49] || (t[49] = e("div", { class: "bp-tags-title" }, "常用标签", -1)),
                  e("div", ms, [
                    (d(!0), p(w, null, I(u(Me), (s) => (d(), p("span", {
                      key: s,
                      class: _(["bp-tag-pill", { active: u(a).selectedTag === s }]),
                      onClick: (g) => he(s)
                    }, " #" + f(s), 11, ys))), 128))
                  ])
                ])) : m("", !0)
              ], 64)) : n.value === "articles" ? (d(), p(w, { key: 1 }, [
                e("div", ks, [
                  e("div", hs, [
                    o.embedded ? m("", !0) : (d(), p("span", Cs, "📚")),
                    t[50] || (t[50] = e("div", { class: "bp-hub-text" }, [
                      e("strong", null, "文章分组"),
                      e("small", null, "文章多级分类整理")
                    ], -1))
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-hub-add-btn bp-btn-indigo",
                    title: "新增文章分组",
                    onClick: t[9] || (t[9] = (s) => D.value = !0)
                  }, "＋")
                ]),
                D.value ? (d(), p("div", ws, [
                  k(e("input", {
                    "onUpdate:modelValue": t[10] || (t[10] = (s) => ae.value = s),
                    type: "text",
                    class: "bp-add-cat-input bp-border-indigo",
                    placeholder: "分组名称...",
                    maxlength: "16",
                    autofocus: "",
                    onKeydown: [
                      P(Ee, ["enter"]),
                      t[11] || (t[11] = P((s) => D.value = !1, ["esc"]))
                    ]
                  }, null, 544), [
                    [$, ae.value]
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini primary bp-bg-indigo",
                    onClick: Ee
                  }, "✔"),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini",
                    onClick: t[12] || (t[12] = (s) => D.value = !1)
                  }, "✕")
                ])) : m("", !0),
                e("div", _s, [
                  (d(!0), p(w, null, I(u(r).categories, (s) => (d(), p("div", {
                    key: s.id,
                    class: _(["bp-folder-row bp-row-indigo", { active: u(r).activeCategoryId === s.id }])
                  }, [
                    F.value === s.id ? (d(), p("div", As, [
                      k(e("input", {
                        "onUpdate:modelValue": t[13] || (t[13] = (g) => M.value = g),
                        type: "text",
                        class: "bp-folder-rename-input",
                        maxlength: "16",
                        autofocus: "",
                        onKeydown: [
                          P((g) => Pe(s.id), ["enter"]),
                          t[14] || (t[14] = P((g) => F.value = null, ["esc"]))
                        ]
                      }, null, 40, Ss), [
                        [$, M.value]
                      ]),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini primary bp-bg-indigo",
                        onClick: (g) => Pe(s.id)
                      }, "✔", 8, $s),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini",
                        onClick: t[15] || (t[15] = (g) => F.value = null)
                      }, "✕")
                    ])) : (d(), p("button", {
                      key: 1,
                      type: "button",
                      class: "bp-folder-btn",
                      onClick: (g) => st(s.id)
                    }, [
                      o.embedded ? m("", !0) : (d(), p("span", xs, f(s.icon || "📑"), 1)),
                      e("span", {
                        class: "bp-folder-name",
                        title: s.name
                      }, f(s.name), 9, Ts),
                      s.id === "all" ? (d(), p("span", Es, f(u(r).articles.length), 1)) : s.id === "starred" ? (d(), p("span", Ps, f(u(r).articles.filter((g) => g.pinned).length), 1)) : (d(), p("span", Ns, f(u(r).articles.filter((g) => g.category === s.id).length), 1))
                    ], 8, Is)),
                    !s.isBuiltin && F.value !== s.id ? (d(), p("div", Bs, [
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn",
                        title: "重命名",
                        onClick: A((g) => kt(s), ["stop"])
                      }, "✏️", 8, Ds),
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn danger",
                        title: "删除",
                        onClick: A((g) => ht(s), ["stop"])
                      }, "🗑️", 8, Rs)
                    ])) : m("", !0)
                  ], 2))), 128))
                ]),
                u(Ke).length > 0 ? (d(), p("div", Vs, [
                  t[51] || (t[51] = e("div", { class: "bp-tags-title" }, "文章标签", -1)),
                  e("div", Os, [
                    (d(!0), p(w, null, I(u(Ke), (s) => (d(), p("span", {
                      key: s,
                      class: _(["bp-tag-pill bp-tag-indigo", { active: u(r).selectedTag === s }]),
                      onClick: (g) => Ce(s)
                    }, " #" + f(s), 11, Ls))), 128))
                  ])
                ])) : m("", !0)
              ], 64)) : m("", !0)
            ]),
            n.value === "prompts" ? (d(), p("main", Fs, [
              e("div", Ms, [
                e("div", Us, [
                  e("span", null, [
                    t[52] || (t[52] = x("共 ", -1)),
                    e("strong", null, f(u(ge).length), 1),
                    t[53] || (t[53] = x(" 条提示词", -1))
                  ]),
                  u(a).selectedTag ? (d(), p("span", Js, [
                    x(" 标签: #" + f(u(a).selectedTag) + " ", 1),
                    e("button", {
                      type: "button",
                      class: "bp-tag-close",
                      onClick: t[16] || (t[16] = (s) => u(a).selectedTag = null)
                    }, "✕")
                  ])) : m("", !0)
                ])
              ]),
              u(ge).length === 0 ? (d(), p("div", Ks, [
                t[54] || (t[54] = e("div", { class: "bp-empty-icon" }, "🎒", -1)),
                t[55] || (t[55] = e("h3", { class: "bp-empty-title" }, "提示词背包空空如也", -1)),
                t[56] || (t[56] = e("p", { class: "bp-empty-desc" }, "创建你的第一个提示词，永久收纳属于你的 Prompt 宝库！", -1)),
                e("button", {
                  type: "button",
                  class: "bp-btn bp-btn-primary",
                  onClick: Ae
                }, "立即新建提示词")
              ])) : (d(), p("div", zs, [
                (d(!0), p(w, null, I(u(ge), (s) => (d(), p("article", {
                  key: s.id,
                  class: _(["bp-card", {
                    "is-pinned": s.pinned,
                    "is-selected": u(a).editingPrompt?.id === s.id
                  }])
                }, [
                  e("div", js, [
                    e("div", Ys, [
                      e("button", {
                        type: "button",
                        class: _(["bp-pin-btn", { active: s.pinned }]),
                        title: s.pinned ? "取消置顶" : "星标置顶",
                        onClick: A((g) => pt(s.id), ["stop"])
                      }, f(s.pinned ? "★" : "☆"), 11, Gs),
                      e("h4", {
                        class: "bp-card-title",
                        title: s.title
                      }, f(s.title), 9, Qs)
                    ]),
                    e("div", Zs, [
                      e("button", {
                        type: "button",
                        class: "bp-action-btn edit",
                        title: "编辑提示词",
                        onClick: A((g) => lt(s), ["stop"])
                      }, "✏️", 8, qs),
                      e("button", {
                        type: "button",
                        class: "bp-action-btn delete",
                        title: "删除提示词",
                        onClick: A((g) => ct(s.id), ["stop"])
                      }, "🗑️", 8, Hs)
                    ])
                  ]),
                  s.description ? (d(), p("p", Ws, f(s.description), 1)) : m("", !0),
                  e("div", {
                    class: "bp-card-preview",
                    title: s.content
                  }, [
                    e("pre", null, [
                      e("code", null, f(s.content), 1)
                    ])
                  ], 8, Xs),
                  u(ie)(s.content).length > 0 ? (d(), p("div", eo, [
                    t[57] || (t[57] = e("span", { class: "bp-vars-hint" }, "变量:", -1)),
                    (d(!0), p(w, null, I(u(ie)(s.content), (g) => (d(), p("span", {
                      key: g,
                      class: "bp-var-pill",
                      title: `在无模态侧栏中填充: ${g}`,
                      onClick: A((E) => we(s), ["stop"])
                    }, " {{" + f(g) + "}} ", 9, to))), 128))
                  ])) : m("", !0),
                  e("div", so, [
                    e("div", oo, [
                      (d(!0), p(w, null, I(s.tags, (g) => (d(), p("span", {
                        key: g,
                        class: "bp-tag-micro",
                        onClick: A((E) => he(g), ["stop"])
                      }, "#" + f(g), 9, no))), 128))
                    ]),
                    e("div", io, [
                      u(a).copySuccessId === s.id ? (d(), p("span", ao, "✓ 已复制!")) : m("", !0),
                      u(ie)(s.content).length > 0 ? (d(), p("button", {
                        key: 1,
                        type: "button",
                        class: "bp-btn-use",
                        title: "填充变量并复制",
                        onClick: A((g) => we(s), ["stop"])
                      }, " ⚡ 填充使用 ", 8, ro)) : m("", !0),
                      e("button", {
                        type: "button",
                        class: _(["bp-btn-copy", { success: u(a).copySuccessId === s.id }]),
                        title: "直接复制提示词文本",
                        onClick: A((g) => it(s), ["stop"])
                      }, f(u(a).copySuccessId === s.id ? "已复制" : "复制"), 11, lo)
                    ])
                  ])
                ], 2))), 128))
              ]))
            ])) : n.value === "articles" ? (d(), p("main", co, [
              e("div", po, [
                e("div", uo, [
                  e("span", null, [
                    t[58] || (t[58] = x("共 ", -1)),
                    e("strong", null, f(u(me).length), 1),
                    t[59] || (t[59] = x(" 篇保存文章", -1))
                  ]),
                  u(r).selectedTag ? (d(), p("span", bo, [
                    x(" 标签: #" + f(u(r).selectedTag) + " ", 1),
                    e("button", {
                      type: "button",
                      class: "bp-tag-close",
                      onClick: t[17] || (t[17] = (s) => u(r).selectedTag = null)
                    }, "✕")
                  ])) : m("", !0)
                ])
              ]),
              u(me).length === 0 ? (d(), p("div", go, [
                t[60] || (t[60] = e("div", { class: "bp-empty-icon" }, "📑", -1)),
                t[61] || (t[61] = e("h3", { class: "bp-empty-title" }, "文章收藏库空空如也", -1)),
                t[62] || (t[62] = e("p", { class: "bp-empty-desc" }, "在此保存精选长文、技术博客与深度报道，随时随地离线畅读！", -1)),
                e("button", {
                  type: "button",
                  class: "bp-btn bp-btn-primary bp-btn-indigo",
                  onClick: xe
                }, "立即保存第一篇文章")
              ])) : (d(), p("div", fo, [
                (d(!0), p(w, null, I(u(me), (s) => (d(), p("article", {
                  key: s.id,
                  class: _(["bp-card bp-card-article", {
                    "is-pinned": s.pinned,
                    "is-selected": u(r).editingArticle?.id === s.id || u(r).readingArticle?.id === s.id
                  }])
                }, [
                  e("div", vo, [
                    e("div", mo, [
                      e("button", {
                        type: "button",
                        class: _(["bp-pin-btn", { active: s.pinned }]),
                        title: s.pinned ? "取消置顶" : "星标置顶",
                        onClick: A((g) => yt(s.id), ["stop"])
                      }, f(s.pinned ? "★" : "☆"), 11, yo),
                      e("h4", {
                        class: "bp-card-title",
                        title: s.title
                      }, f(s.title), 9, ko)
                    ]),
                    e("div", ho, [
                      s.url ? (d(), p("a", {
                        key: 0,
                        href: s.url,
                        target: "_blank",
                        rel: "noreferrer",
                        class: "bp-action-btn",
                        title: "在浏览器中打开原文"
                      }, " ↗ ", 8, Co)) : m("", !0),
                      e("button", {
                        type: "button",
                        class: "bp-action-btn edit",
                        title: "编辑文章",
                        onClick: A((g) => gt(s), ["stop"])
                      }, "✏️", 8, wo),
                      e("button", {
                        type: "button",
                        class: "bp-action-btn delete",
                        title: "删除文章",
                        onClick: A((g) => mt(s.id), ["stop"])
                      }, "🗑️", 8, _o)
                    ])
                  ]),
                  s.sourceName || s.updatedAt ? (d(), p("div", Ao, [
                    s.sourceName ? (d(), p("span", So, "📰 " + f(s.sourceName), 1)) : m("", !0),
                    e("span", $o, "🕒 " + f(Be(s.updatedAt)), 1)
                  ])) : m("", !0),
                  s.description ? (d(), p("p", Io, f(s.description), 1)) : m("", !0),
                  e("div", {
                    class: "bp-card-preview bp-article-preview",
                    title: s.content
                  }, [
                    e("pre", null, [
                      e("code", null, f(s.content), 1)
                    ])
                  ], 8, xo),
                  e("div", To, [
                    e("div", Eo, [
                      (d(!0), p(w, null, I(s.tags, (g) => (d(), p("span", {
                        key: g,
                        class: "bp-tag-micro",
                        onClick: A((E) => Ce(g), ["stop"])
                      }, "#" + f(g), 9, Po))), 128))
                    ]),
                    e("div", No, [
                      u(r).copySuccessId === s.id ? (d(), p("span", Bo, "✓ 已复制!")) : m("", !0),
                      e("button", {
                        type: "button",
                        class: "bp-btn-read",
                        title: "阅读全文",
                        onClick: A((g) => ft(s), ["stop"])
                      }, " 📖 阅读全文 ", 8, Do),
                      e("button", {
                        type: "button",
                        class: _(["bp-btn-copy", { success: u(r).copySuccessId === s.id }]),
                        title: "复制文章全文",
                        onClick: A((g) => Te(s), ["stop"])
                      }, f(u(r).copySuccessId === s.id ? "已复制" : "复制"), 11, Ro)
                    ])
                  ])
                ], 2))), 128))
              ]))
            ])) : n.value === "stickers" ? (d(), p("main", Vo, [
              ne(Et, {
                "dock-owned": "",
                active: n.value === "stickers"
              }, null, 8, ["active"])
            ])) : m("", !0),
            ne(le, { name: "drawer-slide" }, {
              default: N(() => [
                u(a).isEditing && n.value === "prompts" ? (d(), p("aside", Oo, [
                  e("header", Lo, [
                    e("h3", Fo, f(u(a).editingPrompt?.id ? "✏️ 编辑提示词" : "➕ 新建提示词"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "收起",
                      onClick: t[18] || (t[18] = (s) => u(h).closeEditor())
                    }, "✕")
                  ]),
                  e("div", Mo, [
                    e("div", Uo, [
                      t[63] || (t[63] = e("label", { class: "bp-form-label" }, "提示词标题 *", -1)),
                      k(e("input", {
                        "onUpdate:modelValue": t[19] || (t[19] = (s) => J.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：自研架构评审准则",
                        maxlength: "64"
                      }, null, 512), [
                        [$, J.value]
                      ])
                    ]),
                    e("div", Jo, [
                      e("div", Ko, [
                        t[64] || (t[64] = e("label", { class: "bp-form-label" }, "所属分组", -1)),
                        k(e("select", {
                          "onUpdate:modelValue": t[20] || (t[20] = (s) => Q.value = s),
                          class: "bp-form-select"
                        }, [
                          (d(!0), p(w, null, I(Ie.value, (s) => (d(), p("option", {
                            key: s.id,
                            value: s.id
                          }, f(s.name), 9, zo))), 128))
                        ], 512), [
                          [De, Q.value]
                        ])
                      ]),
                      e("div", jo, [
                        e("label", Yo, [
                          k(e("input", {
                            "onUpdate:modelValue": t[21] || (t[21] = (s) => q.value = s),
                            type: "checkbox"
                          }, null, 512), [
                            [Re, q.value]
                          ]),
                          t[65] || (t[65] = e("span", null, "星标置顶", -1))
                        ])
                      ])
                    ]),
                    e("div", Go, [
                      t[66] || (t[66] = e("label", { class: "bp-form-label" }, "简介与用途（可选）", -1)),
                      k(e("input", {
                        "onUpdate:modelValue": t[22] || (t[22] = (s) => G.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "简短描述该 Prompt 适合什么场景",
                        maxlength: "128"
                      }, null, 512), [
                        [$, G.value]
                      ])
                    ]),
                    e("div", Qo, [
                      t[68] || (t[68] = e("div", { class: "bp-label-row" }, [
                        e("label", { class: "bp-form-label" }, "正文内容 *"),
                        e("span", { class: "bp-label-tip" }, [
                          x("支持 "),
                          e("code", null, "{{变量}}"),
                          x(" 动态占位符")
                        ])
                      ], -1)),
                      k(e("textarea", {
                        "onUpdate:modelValue": t[23] || (t[23] = (s) => R.value = s),
                        class: "bp-form-input bp-textarea-main",
                        placeholder: "在此输入完整的提示词内容..."
                      }, null, 512), [
                        [$, R.value]
                      ]),
                      _e.value.length > 0 ? (d(), p("div", Zo, [
                        t[67] || (t[67] = e("span", null, "检测到变量：", -1)),
                        (d(!0), p(w, null, I(_e.value, (s) => (d(), p("span", {
                          key: s,
                          class: "bp-var-pill mini"
                        }, "{{" + f(s) + "}}", 1))), 128))
                      ])) : m("", !0)
                    ]),
                    e("div", qo, [
                      t[69] || (t[69] = e("label", { class: "bp-form-label" }, "标签（用逗号或空格隔开）", -1)),
                      k(e("input", {
                        "onUpdate:modelValue": t[24] || (t[24] = (s) => Z.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：架构设计, 审查清单"
                      }, null, 512), [
                        [$, Z.value]
                      ])
                    ])
                  ]),
                  e("footer", Ho, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[25] || (t[25] = (s) => u(h).closeEditor())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary",
                      onClick: dt
                    }, "保存提示词")
                  ])
                ])) : m("", !0)
              ]),
              _: 1
            }),
            ne(le, { name: "drawer-slide" }, {
              default: N(() => [
                u(a).isVariableDialogOpen && n.value === "prompts" ? (d(), p("aside", Wo, [
                  e("header", Xo, [
                    t[70] || (t[70] = e("h3", { class: "bp-drawer-title" }, "⚡ 快速填充变量", -1)),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "关闭",
                      onClick: t[26] || (t[26] = (s) => u(h).closeVariableDialog())
                    }, "✕")
                  ]),
                  e("div", en, [
                    e("p", tn, [
                      t[71] || (t[71] = x("正在使用：", -1)),
                      e("strong", null, f(u(a).variableTargetPrompt?.title), 1)
                    ]),
                    e("div", sn, [
                      (d(!0), p(w, null, I(u(a).variableFormValues, (s, g) => (d(), p("div", {
                        key: g,
                        class: "bp-form-group"
                      }, [
                        e("label", on, "{{" + f(g) + "}}", 1),
                        k(e("textarea", {
                          "onUpdate:modelValue": (E) => u(a).variableFormValues[g] = E,
                          class: "bp-form-input bp-textarea-small",
                          placeholder: `请输入 ${g} 的具体内容...`,
                          rows: "2"
                        }, null, 8, nn), [
                          [$, u(a).variableFormValues[g]]
                        ])
                      ]))), 128))
                    ]),
                    e("div", an, [
                      t[72] || (t[72] = e("div", { class: "bp-preview-header" }, "实时合并预览", -1)),
                      e("pre", rn, [
                        e("code", null, f(rt.value), 1)
                      ])
                    ])
                  ]),
                  e("footer", ln, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[27] || (t[27] = (s) => u(h).closeVariableDialog())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary",
                      onClick: at
                    }, "一键复制填充内容")
                  ])
                ])) : m("", !0)
              ]),
              _: 1
            }),
            ne(le, { name: "drawer-slide" }, {
              default: N(() => [
                u(r).isEditing && n.value === "articles" ? (d(), p("aside", dn, [
                  e("header", cn, [
                    e("h3", pn, f(u(r).editingArticle?.id ? "✏️ 编辑文章" : "➕ 保存新文章"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "收起",
                      onClick: t[28] || (t[28] = (s) => u(S).closeEditor())
                    }, "✕")
                  ]),
                  e("div", un, [
                    e("div", bn, [
                      t[73] || (t[73] = e("label", { class: "bp-form-label" }, "文章标题 *", -1)),
                      k(e("input", {
                        "onUpdate:modelValue": t[29] || (t[29] = (s) => K.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：a16z 提出 B2A 经济架构深度解析",
                        maxlength: "128"
                      }, null, 512), [
                        [$, K.value]
                      ])
                    ]),
                    e("div", gn, [
                      e("div", fn, [
                        t[74] || (t[74] = e("label", { class: "bp-form-label" }, "所属分组", -1)),
                        k(e("select", {
                          "onUpdate:modelValue": t[30] || (t[30] = (s) => ee.value = s),
                          class: "bp-form-select"
                        }, [
                          (d(!0), p(w, null, I(Ne.value, (s) => (d(), p("option", {
                            key: s.id,
                            value: s.id
                          }, f(s.name), 9, vn))), 128))
                        ], 512), [
                          [De, ee.value]
                        ])
                      ]),
                      e("div", mn, [
                        e("label", yn, [
                          k(e("input", {
                            "onUpdate:modelValue": t[31] || (t[31] = (s) => se.value = s),
                            type: "checkbox"
                          }, null, 512), [
                            [Re, se.value]
                          ]),
                          t[75] || (t[75] = e("span", null, "星标置顶", -1))
                        ])
                      ])
                    ]),
                    e("div", kn, [
                      e("div", hn, [
                        t[76] || (t[76] = e("label", { class: "bp-form-label" }, "原文网址（可选）", -1)),
                        k(e("input", {
                          "onUpdate:modelValue": t[32] || (t[32] = (s) => H.value = s),
                          type: "url",
                          class: "bp-form-input",
                          placeholder: "https://..."
                        }, null, 512), [
                          [$, H.value]
                        ])
                      ]),
                      e("div", Cn, [
                        t[77] || (t[77] = e("label", { class: "bp-form-label" }, "来源 / 作者（可选）", -1)),
                        k(e("input", {
                          "onUpdate:modelValue": t[33] || (t[33] = (s) => W.value = s),
                          type: "text",
                          class: "bp-form-input",
                          placeholder: "例如：a16z News"
                        }, null, 512), [
                          [$, W.value]
                        ])
                      ])
                    ]),
                    e("div", wn, [
                      t[78] || (t[78] = e("label", { class: "bp-form-label" }, "核心摘要与推荐理由（可选）", -1)),
                      k(e("input", {
                        "onUpdate:modelValue": t[34] || (t[34] = (s) => X.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "一句话提炼文章核心看点...",
                        maxlength: "256"
                      }, null, 512), [
                        [$, X.value]
                      ])
                    ]),
                    e("div", _n, [
                      t[79] || (t[79] = e("label", { class: "bp-form-label" }, "文章正文内容 *", -1)),
                      k(e("textarea", {
                        "onUpdate:modelValue": t[35] || (t[35] = (s) => z.value = s),
                        class: "bp-form-input bp-textarea-main",
                        placeholder: "在此粘贴或撰写完整的文章长文本或 Markdown 内容..."
                      }, null, 512), [
                        [$, z.value]
                      ])
                    ]),
                    e("div", An, [
                      t[80] || (t[80] = e("label", { class: "bp-form-label" }, "标签（用逗号或空格隔开）", -1)),
                      k(e("input", {
                        "onUpdate:modelValue": t[36] || (t[36] = (s) => te.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：AI, 产业观察, 商业模式"
                      }, null, 512), [
                        [$, te.value]
                      ])
                    ])
                  ]),
                  e("footer", Sn, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[37] || (t[37] = (s) => u(S).closeEditor())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary bp-btn-indigo",
                      onClick: vt
                    }, "保存文章")
                  ])
                ])) : m("", !0)
              ]),
              _: 1
            }),
            ne(le, { name: "drawer-slide" }, {
              default: N(() => [
                u(r).isReading && n.value === "articles" ? (d(), p("aside", $n, [
                  e("header", In, [
                    e("div", xn, [
                      t[81] || (t[81] = e("span", { class: "bp-badge-pill" }, "📖 阅读器", -1)),
                      u(r).readingArticle?.sourceName ? (d(), p("span", Tn, f(u(r).readingArticle.sourceName), 1)) : m("", !0)
                    ]),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "关闭阅读器",
                      onClick: t[38] || (t[38] = (s) => u(S).closeReader())
                    }, "✕")
                  ]),
                  e("div", En, [
                    e("h2", Pn, f(u(r).readingArticle?.title), 1),
                    e("div", Nn, [
                      u(r).readingArticle?.sourceName ? (d(), p("span", Bn, "📰 " + f(u(r).readingArticle.sourceName), 1)) : m("", !0),
                      u(r).readingArticle?.updatedAt ? (d(), p("span", Dn, "🕒 " + f(Be(u(r).readingArticle.updatedAt)), 1)) : m("", !0),
                      u(r).readingArticle?.url ? (d(), p("a", {
                        key: 2,
                        href: u(r).readingArticle.url,
                        target: "_blank",
                        rel: "noreferrer",
                        class: "bp-reader-link"
                      }, " 原文链接 ↗ ", 8, Rn)) : m("", !0)
                    ]),
                    u(r).readingArticle?.description ? (d(), p("blockquote", Vn, " 💡 " + f(u(r).readingArticle.description), 1)) : m("", !0),
                    e("div", On, [
                      e("pre", null, [
                        e("code", null, f(u(r).readingArticle?.content), 1)
                      ])
                    ])
                  ]),
                  e("footer", Ln, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[39] || (t[39] = (s) => u(S).closeReader())
                    }, "关闭"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary bp-btn-indigo",
                      onClick: t[40] || (t[40] = (s) => u(r).readingArticle && Te(u(r).readingArticle))
                    }, " 一键复制全文 ")
                  ])
                ])) : m("", !0)
              ]),
              _: 1
            })
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["embedded", "visible"]));
  }
}), Gn = /* @__PURE__ */ Ge(Fn, [["__scopeId", "data-v-58ef45b3"]]);
export {
  Gn as default
};
