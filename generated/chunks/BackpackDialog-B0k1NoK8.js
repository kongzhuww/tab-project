import { f as r, g as l, h as e, J as ke, r as et, x as V, d as St, o as xt, l as It, V as Tt, B as O, s as C, t as v, u, j as y, F as m, p as w, i as I, A as Bt, q as N, v as $, k as h, m as S, C as F, U as pe, M as Je, L as Ke, b as k } from "./vendor-vue-BbmU9NUg.js";
import { _ as tt } from "./_plugin-vue_export-helper-CP_tFnee.js";
import { w as st, P as he, S as ot, p as Ae, A as le } from "./revision-guard-5IS-EcTI.js";
import { S as Mt } from "./StickerBoard-ywD9rePR.js";
import ze from "./MessageMarkdown-CDpRSLVW.js";
const Et = {}, Vt = {
  class: "backpack-embedded",
  "aria-label": "AI 工作区资料库"
}, Pt = { class: "backpack-embedded-header" }, Nt = { class: "backpack-embedded-brand" }, Dt = { class: "backpack-embedded-actions" };
function Lt(o, i) {
  return r(), l("section", Vt, [
    e("header", Pt, [
      e("div", Nt, [
        i[0] || (i[0] = e("h2", null, "资料库", -1)),
        ke(o.$slots, "header-tabs", {}, void 0, !0)
      ]),
      e("div", Dt, [
        ke(o.$slots, "header-actions", {}, void 0, !0)
      ])
    ]),
    ke(o.$slots, "default", {}, void 0, !0)
  ]);
}
const Rt = /* @__PURE__ */ tt(Et, [["render", Lt], ["__scopeId", "data-v-a3a93d15"]]), Q = "logicweaver_prompt_backpack_v1", Y = "logicweaver_prompt_backpack_categories_v1", M = "logicweaver_saved_articles_v1", E = "logicweaver_saved_article_categories_v1", nt = [
  { id: "all", name: "全部", icon: "🎒", isBuiltin: !0 },
  { id: "starred", name: "星标置顶", icon: "⭐", isBuiltin: !0 },
  { id: "default", name: "默认分组", icon: "📁", isBuiltin: !1 }
], it = [
  { id: "all", name: "全部", icon: "📑", isBuiltin: !0 },
  { id: "starred", name: "星标置顶", icon: "⭐", isBuiltin: !0 },
  { id: "default", name: "默认分组", icon: "📁", isBuiltin: !1 }
];
function B(o) {
  if (!o) return [];
  const i = /* @__PURE__ */ new Set(), n = /\{\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}\}|\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}/g;
  let p;
  for (; (p = n.exec(o)) !== null; ) {
    const f = p[1] || p[2];
    f && !/^\d+$/.test(f) && i.add(f.trim());
  }
  return Array.from(i);
}
function He(o, i) {
  return o ? o.replace(/\{\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}\}|\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}/g, (n, p, f) => {
    const g = (p || f || "").trim();
    return i[g] !== void 0 && i[g] !== "" ? i[g] : n;
  }) : "";
}
const a = et({
  prompts: [],
  categories: [...nt],
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
let Qe = !1, Ce = 0, Ye = Promise.resolve();
function ve(o, i) {
  const n = [...i];
  return n.some((p) => p.id === "default") || n.push({ id: "default", name: "默认分组", icon: "📁", isBuiltin: !1 }), { prompts: [...o], categories: n };
}
function Ot() {
  try {
    if (typeof localStorage > "u") return null;
    const o = localStorage.getItem(Q), i = localStorage.getItem(Y);
    if (!o && !i) return null;
    const n = o ? JSON.parse(o) : [], p = i ? JSON.parse(i) : null;
    return ve(
      Array.isArray(n) ? n : [],
      Array.isArray(p) && p.length ? p : nt
    );
  } catch {
    return null;
  }
}
function be(o, i) {
  try {
    if (typeof localStorage > "u") return;
    localStorage.setItem(Q, JSON.stringify(o)), localStorage.setItem(Y, JSON.stringify(i));
  } catch (n) {
    console.warn("[Backpack] persistToLocalStorage failed", n);
  }
}
const _ = {
  get state() {
    return a;
  },
  async init() {
    if (Qe) return;
    Qe = !0, a.isLoading = !0;
    const o = Ot();
    o && o.prompts.length > 0 && (a.prompts = o.prompts, o.categories?.length && (a.categories = o.categories));
    try {
      if (typeof chrome < "u" && chrome.storage?.local) {
        const i = await chrome.storage.local.get([Q, Y, he]);
        Ce = Ae(i?.[he]);
        const n = i?.[Q] || a.prompts, p = i?.[Y] || a.categories, f = ve(n, p);
        a.prompts = f.prompts, a.categories = f.categories, JSON.stringify(i?.[Q]) !== JSON.stringify(f.prompts) || JSON.stringify(i?.[Y]) !== JSON.stringify(f.categories) ? await this.save() : be(f.prompts, f.categories);
      } else {
        const i = ve(a.prompts, a.categories);
        a.prompts = i.prompts, a.categories = i.categories, be(a.prompts, a.categories);
      }
    } catch (i) {
      console.warn("[Backpack] init storage error:", i);
      const n = ve(a.prompts, a.categories);
      a.prompts = n.prompts, a.categories = n.categories;
    } finally {
      a.isLoading = !1;
    }
  },
  async save() {
    const o = JSON.parse(JSON.stringify(a.prompts)), i = JSON.parse(JSON.stringify(a.categories));
    if (typeof chrome < "u" && chrome.storage?.local) {
      const n = Ye.then(async () => {
        try {
          if (typeof navigator > "u" || !navigator.locks) throw new Error("浏览器不支持安全的背包写入锁");
          return Ce = await st(chrome.storage.local, navigator.locks, he, Ce, {
            [Q]: o,
            [Y]: i
          }), be(o, i), a.statusMessage = "", !0;
        } catch (p) {
          return a.statusMessage = p instanceof ot ? "提示词已在其他页面更改，当前修改未保存。请先导出本页内容，再刷新并核对。" : "提示词保存失败，当前修改未保存。请先导出本页内容，再检查存储。", console.warn("[Backpack] save failed", p), !1;
        }
      });
      return Ye = n, n;
    }
    return be(o, i), !0;
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
    const n = a.prompts.findIndex((f) => f.id === o);
    if (n === -1) return !1;
    const p = a.prompts[n];
    return a.prompts[n] = {
      ...p,
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
        const p = document.createElement("textarea");
        p.value = n, p.style.position = "fixed", p.style.opacity = "0", document.body.appendChild(p), p.select(), document.execCommand("copy"), document.body.removeChild(p);
      }
      return o.useCount = (o.useCount || 0) + 1, o.updatedAt = Date.now(), a.copySuccessId = o.id, setTimeout(() => {
        a.copySuccessId === o.id && (a.copySuccessId = null);
      }, 1800), this.save(), !0;
    } catch (p) {
      return console.warn("[Backpack] copy failed", p), !1;
    }
  },
  openVariableDialog(o) {
    const i = B(o.content), n = {};
    for (const p of i)
      n[p] = "";
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
    if (!n || a.categories.some((f) => f.name === n)) return !1;
    const p = `cat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    return a.categories.push({ id: p, name: n, icon: i, isBuiltin: !1 }), this.save(), !0;
  },
  renameCategory(o, i) {
    const n = i.trim();
    if (!n) return !1;
    const p = a.categories.find((f) => f.id === o);
    return !p || p.isBuiltin ? !1 : (p.name = n, this.save(), !0);
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
    }, i = new Blob([JSON.stringify(o, null, 2)], { type: "application/json" }), n = URL.createObjectURL(i), p = document.createElement("a"), f = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    p.href = n, p.download = `prompts-backpack-backup-${f}.json`, document.body.appendChild(p), p.click(), document.body.removeChild(p), URL.revokeObjectURL(n);
  },
  importBackup(o) {
    try {
      const i = JSON.parse(o);
      if (!i || !Array.isArray(i.prompts))
        return { success: !1, count: 0, error: "导入文件格式不合规，缺少 prompts 数组" };
      let n = 0;
      const p = new Set(a.prompts.map((g) => g.id)), f = [];
      for (const g of i.prompts) {
        if (!g || typeof g.title != "string" || typeof g.content != "string")
          continue;
        const A = {
          id: g.id && !p.has(g.id) ? g.id : `prompt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
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
        f.push(A), p.add(A.id), n++;
      }
      if (n === 0)
        return { success: !1, count: 0, error: "未在文件中找到有效提示词条目" };
      if (Array.isArray(i.categories))
        for (const g of i.categories)
          g && g.name && !a.categories.some((A) => A.name === g.name) && a.categories.push({
            id: g.id || `cat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: String(g.name).trim(),
            icon: typeof g.icon == "string" ? g.icon : "📁",
            isBuiltin: !1
          });
      return a.prompts = [...f, ...a.prompts], this.save(), { success: !0, count: n };
    } catch (i) {
      return { success: !1, count: 0, error: `解析 JSON 失败: ${i?.message || i}` };
    }
  }
}, we = V(() => {
  const o = a.searchQuery.trim().toLowerCase(), i = a.activeCategoryId, n = a.selectedTag;
  return a.prompts.filter((p) => {
    if (i === "starred") {
      if (!p.pinned) return !1;
    } else if (i !== "all" && p.category !== i)
      return !1;
    if (n && !p.tags.includes(n))
      return !1;
    if (o) {
      const f = p.title.toLowerCase().includes(o), g = p.description?.toLowerCase().includes(o), A = p.content.toLowerCase().includes(o), P = p.tags.some((D) => D.toLowerCase().includes(o));
      if (!f && !g && !A && !P)
        return !1;
    }
    return !0;
  }).sort((p, f) => p.pinned && !f.pinned ? -1 : !p.pinned && f.pinned ? 1 : f.updatedAt - p.updatedAt);
}), Ge = V(() => {
  const o = /* @__PURE__ */ new Set();
  for (const i of a.prompts)
    if (Array.isArray(i.tags))
      for (const n of i.tags)
        n.trim() && o.add(n.trim());
  return Array.from(o);
}), d = et({
  articles: [],
  categories: [...it],
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
let Ze = !1, ge = 0, qe = Promise.resolve();
function Ft() {
  try {
    if (typeof localStorage > "u") return null;
    const o = localStorage.getItem(M), i = localStorage.getItem(E);
    if (!o && !i) return null;
    const n = o ? JSON.parse(o) : [], p = i ? JSON.parse(i) : null;
    return {
      articles: Array.isArray(n) ? n : [],
      categories: Array.isArray(p) && p.length ? p : it
    };
  } catch {
    return null;
  }
}
function _e(o, i) {
  try {
    if (typeof localStorage > "u") return;
    localStorage.setItem(M, JSON.stringify(o)), localStorage.setItem(E, JSON.stringify(i));
  } catch (n) {
    console.warn("[ArticleService] persistToLocalStorage failed", n);
  }
}
const x = {
  get state() {
    return d;
  },
  async init() {
    if (Ze) return;
    Ze = !0, d.isLoading = !0;
    const o = Ft();
    o && (d.articles = o.articles, o.categories?.length && (d.categories = o.categories));
    try {
      if (typeof chrome < "u" && chrome.storage?.local) {
        const i = await chrome.storage.local.get([M, E, le]);
        ge = Ae(i?.[le]), i?.[M] && Array.isArray(i[M]) && (d.articles = i[M]), i?.[E] && Array.isArray(i[E]) && (d.categories = i[E]), chrome.storage?.onChanged?.addListener && chrome.storage.onChanged.addListener((n, p) => {
          if (p === "local") {
            if (n[le])
              try {
                ge = Ae(n[le].newValue);
              } catch {
              }
            n[M] && Array.isArray(n[M].newValue) && (d.articles = n[M].newValue), n[E] && Array.isArray(n[E].newValue) && (d.categories = n[E].newValue);
          }
        });
      } else o || _e(d.articles, d.categories);
    } catch (i) {
      console.warn("[ArticleService] init storage error:", i);
    } finally {
      d.isLoading = !1;
    }
  },
  async save() {
    const o = JSON.parse(JSON.stringify(d.articles)), i = JSON.parse(JSON.stringify(d.categories));
    if (typeof chrome < "u" && chrome.storage?.local) {
      const n = qe.then(async () => {
        try {
          if (typeof navigator > "u" || !navigator.locks) throw new Error("浏览器不支持安全的背包写入锁");
          return ge = await st(chrome.storage.local, navigator.locks, le, ge, {
            [M]: o,
            [E]: i
          }), _e(o, i), d.statusMessage = "", !0;
        } catch (p) {
          return d.statusMessage = p instanceof ot ? "文章已在其他页面更改，当前修改未保存。请先导出本页内容，再刷新并核对。" : "文章保存失败，当前修改未保存。请先导出本页内容，再检查存储。", console.warn("[ArticleService] save failed", p), !1;
        }
      });
      return qe = n, n;
    }
    return _e(o, i), !0;
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
    const p = d.articles[n];
    return d.articles[n] = {
      ...p,
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
    const p = `cat-art-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    return d.categories.push({ id: p, name: n, icon: i, isBuiltin: !1 }), this.save(), !0;
  },
  renameCategory(o, i) {
    const n = i.trim();
    if (!n) return !1;
    const p = d.categories.find((f) => f.id === o);
    return !p || p.isBuiltin ? !1 : (p.name = n, this.save(), !0);
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
    }, i = new Blob([JSON.stringify(o, null, 2)], { type: "application/json" }), n = URL.createObjectURL(i), p = document.createElement("a"), f = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    p.href = n, p.download = `saved-articles-backup-${f}.json`, document.body.appendChild(p), p.click(), document.body.removeChild(p), URL.revokeObjectURL(n);
  },
  importBackup(o) {
    try {
      const i = JSON.parse(o);
      if (!i || !Array.isArray(i.articles))
        return { success: !1, count: 0, error: "导入文件格式不合规，缺少 articles 数组" };
      let n = 0;
      const p = new Set(d.articles.map((g) => g.id)), f = [];
      for (const g of i.articles) {
        if (!g || typeof g.title != "string" || typeof g.content != "string")
          continue;
        const A = {
          id: g.id && !p.has(g.id) ? g.id : `art-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
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
        f.push(A), p.add(A.id), n++;
      }
      if (n === 0)
        return { success: !1, count: 0, error: "未在文件中找到有效文章条目" };
      if (Array.isArray(i.categories))
        for (const g of i.categories)
          g && g.name && !d.categories.some((A) => A.name === g.name) && d.categories.push({
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
}, We = V(() => {
  const o = d.activeCategoryId, i = d.selectedTag;
  return d.articles.filter((n) => {
    if (o === "starred") {
      if (!n.pinned) return !1;
    } else if (o !== "all" && n.category !== o)
      return !1;
    return !(i && !n.tags.includes(i));
  }).sort((n, p) => n.pinned && !p.pinned ? -1 : !n.pinned && p.pinned ? 1 : p.updatedAt - n.updatedAt);
}), Xe = V(() => {
  const o = /* @__PURE__ */ new Set();
  for (const i of d.articles)
    if (Array.isArray(i.tags))
      for (const n of i.tags)
        n.trim() && o.add(n.trim());
  return Array.from(o);
}), jt = {
  class: "bp-seg-tabs",
  role: "tablist",
  "aria-label": "资料库频道"
}, Ut = ["aria-selected"], Jt = ["aria-selected"], Kt = ["aria-selected"], zt = {
  key: 0,
  class: "bp-search-pill"
}, Ht = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Qt = {
  key: 1,
  class: "bp-icon"
}, Yt = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Gt = {
  key: 1,
  class: "bp-icon"
}, Zt = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.6",
  "stroke-linecap": "round",
  "aria-hidden": "true"
}, qt = {
  key: 1,
  class: "bp-icon"
}, Wt = {
  key: 0,
  class: "bp-search-pill"
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
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, ss = {
  key: 1,
  class: "bp-icon"
}, os = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.6",
  "stroke-linecap": "round",
  "aria-hidden": "true"
}, ns = {
  key: 1,
  class: "bp-icon"
}, is = {
  key: 0,
  class: "bp-alert-tip-bar"
}, rs = {
  key: 1,
  class: "bp-alert-tip-bar",
  role: "alert"
}, ls = {
  key: 2,
  class: "bp-alert-tip-bar",
  role: "alert"
}, as = { class: "bp-work-area" }, ds = {
  key: 0,
  class: "bp-bili-sidebar"
}, cs = { class: "bp-sidebar-toggle-action" }, us = { class: "bp-sidebar-toggle-chevron" }, ps = { class: "bp-channels-list" }, bs = ["onClick"], gs = { class: "bp-channel-main" }, vs = { class: "bp-channel-icon" }, fs = { class: "bp-channel-text" }, ys = { class: "bp-channel-badge" }, ms = { class: "bp-sidebar-favorite-hub" }, ks = { class: "bp-hub-main" }, hs = {
  key: 0,
  class: "bp-hub-icon"
}, Cs = { class: "bp-hub-text" }, ws = { key: 0 }, _s = {
  key: 0,
  class: "bp-add-category-box"
}, As = { class: "bp-folder-list" }, $s = {
  key: 0,
  class: "bp-folder-inline-edit"
}, Ss = ["onKeydown"], xs = ["onClick"], Is = ["onClick"], Ts = {
  key: 0,
  class: "bp-folder-icon"
}, Bs = ["title"], Ms = {
  key: 1,
  class: "bp-folder-badge"
}, Es = {
  key: 2,
  class: "bp-folder-badge"
}, Vs = {
  key: 3,
  class: "bp-folder-badge"
}, Ps = {
  key: 2,
  class: "bp-folder-actions"
}, Ns = ["onClick"], Ds = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Ls = ["onClick"], Rs = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Os = {
  key: 1,
  class: "bp-tags-container"
}, Fs = { class: "bp-tags-cloud" }, js = ["onClick"], Us = { class: "bp-sidebar-favorite-hub bp-hub-article" }, Js = { class: "bp-hub-main" }, Ks = {
  key: 0,
  class: "bp-hub-icon"
}, zs = { class: "bp-hub-text" }, Hs = { key: 0 }, Qs = {
  key: 0,
  class: "bp-add-category-box"
}, Ys = { class: "bp-folder-list" }, Gs = {
  key: 0,
  class: "bp-folder-inline-edit"
}, Zs = ["onKeydown"], qs = ["onClick"], Ws = ["onClick"], Xs = {
  key: 0,
  class: "bp-folder-icon"
}, eo = ["title"], to = {
  key: 1,
  class: "bp-folder-badge"
}, so = {
  key: 2,
  class: "bp-folder-badge"
}, oo = {
  key: 3,
  class: "bp-folder-badge"
}, no = {
  key: 2,
  class: "bp-folder-actions"
}, io = ["onClick"], ro = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, lo = ["onClick"], ao = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, co = {
  key: 1,
  class: "bp-tags-container"
}, uo = { class: "bp-tags-cloud" }, po = ["onClick"], bo = {
  key: 1,
  class: "bp-content-pane"
}, go = { class: "bp-pane-header" }, vo = { class: "bp-result-stats" }, fo = {
  key: 0,
  class: "bp-active-filter-badge"
}, yo = {
  key: 0,
  class: "bp-empty-state"
}, mo = {
  key: 0,
  class: "bp-empty-svg",
  "aria-hidden": "true"
}, ko = {
  key: 1,
  class: "bp-empty-icon"
}, ho = { class: "bp-empty-title" }, Co = {
  key: 2,
  class: "bp-empty-desc"
}, wo = {
  key: 3,
  class: "bp-empty-desc"
}, _o = {
  key: 1,
  class: "bp-card-grid"
}, Ao = ["onClick"], $o = { class: "bp-compact-head" }, So = ["title"], xo = ["onClick"], Io = ["title", "onClick"], To = {
  key: 0,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Bo = {
  key: 1,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Mo = ["onClick"], Eo = ["onClick"], Vo = ["title"], Po = { class: "bp-compact-chips" }, No = ["title", "onClick"], Do = ["onClick"], Lo = ["title", "onClick"], Ro = { class: "bp-compact-meta" }, Oo = { class: "bp-compact-meta-left" }, Fo = { class: "bp-compact-kind" }, jo = ["title", "onClick"], Uo = { key: 0 }, Jo = { class: "bp-compact-meta-right" }, Ko = {
  key: 0,
  class: "bp-copied-tip"
}, zo = {
  key: 1,
  class: "bp-compact-date"
}, Ho = { class: "bp-card-header" }, Qo = { class: "bp-card-title-group" }, Yo = ["title", "onClick"], Go = ["title"], Zo = { class: "bp-card-actions" }, qo = ["onClick"], Wo = ["onClick"], Xo = {
  key: 0,
  class: "bp-card-desc"
}, en = ["title"], tn = {
  key: 1,
  class: "bp-card-vars"
}, sn = ["title", "onClick"], on = { class: "bp-card-footer" }, nn = { class: "bp-card-tags" }, rn = ["onClick"], ln = { class: "bp-card-button-row" }, an = {
  key: 0,
  class: "bp-copied-tip"
}, dn = ["onClick"], cn = ["onClick"], un = {
  key: 2,
  class: "bp-content-pane"
}, pn = { class: "bp-pane-header" }, bn = { class: "bp-result-stats" }, gn = {
  key: 0,
  class: "bp-active-filter-badge bp-badge-indigo"
}, vn = {
  key: 0,
  class: "bp-empty-state"
}, fn = {
  key: 0,
  class: "bp-empty-svg",
  "aria-hidden": "true"
}, yn = {
  key: 1,
  class: "bp-empty-icon"
}, mn = { class: "bp-empty-title" }, kn = { class: "bp-empty-desc" }, hn = {
  key: 1,
  class: "bp-card-grid"
}, Cn = { class: "bp-card-header" }, wn = { class: "bp-card-title-group" }, _n = ["title", "onClick"], An = ["title"], $n = { class: "bp-card-actions" }, Sn = ["href"], xn = ["onClick"], In = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Tn = ["onClick"], Bn = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Mn = {
  key: 0,
  class: "bp-article-meta-line"
}, En = {
  key: 0,
  class: "bp-article-source"
}, Vn = { class: "bp-article-date" }, Pn = {
  key: 1,
  class: "bp-card-desc"
}, Nn = { class: "bp-card-preview bp-article-preview" }, Dn = { class: "bp-card-footer" }, Ln = { class: "bp-card-tags" }, Rn = ["onClick"], On = { class: "bp-card-button-row" }, Fn = {
  key: 0,
  class: "bp-copied-tip"
}, jn = ["onClick"], Un = ["onClick"], Jn = {
  key: 3,
  class: "bp-content-pane bp-stickers-wrapper"
}, Kn = {
  key: 0,
  class: "bp-side-drawer"
}, zn = { class: "bp-drawer-header" }, Hn = { class: "bp-drawer-title" }, Qn = { class: "bp-drawer-body" }, Yn = { class: "bp-form-group" }, Gn = { class: "bp-form-row" }, Zn = { class: "bp-form-group flex-1" }, qn = ["value"], Wn = { class: "bp-form-group bp-form-checkbox-group" }, Xn = { class: "bp-checkbox-label" }, ei = { class: "bp-form-group" }, ti = { class: "bp-form-group flex-fill" }, si = {
  key: 0,
  class: "bp-detected-vars"
}, oi = { class: "bp-form-group" }, ni = { class: "bp-drawer-footer" }, ii = {
  key: 0,
  class: "bp-side-drawer"
}, ri = { class: "bp-drawer-header" }, li = { class: "bp-drawer-title" }, ai = { class: "bp-drawer-body" }, di = { class: "bp-drawer-desc" }, ci = { class: "bp-vars-form" }, ui = { class: "bp-form-label" }, pi = ["onUpdate:modelValue", "placeholder"], bi = { class: "bp-preview-box" }, gi = { class: "bp-preview-text" }, vi = { class: "bp-drawer-footer" }, fi = {
  key: 0,
  class: "bp-side-drawer bp-drawer-article"
}, yi = { class: "bp-drawer-header" }, mi = { class: "bp-drawer-title" }, ki = { class: "bp-drawer-body" }, hi = { class: "bp-form-group" }, Ci = { class: "bp-form-row" }, wi = { class: "bp-form-group flex-1" }, _i = ["value"], Ai = { class: "bp-form-group bp-form-checkbox-group" }, $i = { class: "bp-checkbox-label" }, Si = { class: "bp-form-row" }, xi = { class: "bp-form-group flex-1" }, Ii = { class: "bp-form-group flex-1" }, Ti = { class: "bp-form-group" }, Bi = { class: "bp-form-group flex-fill" }, Mi = { class: "bp-form-group" }, Ei = { class: "bp-drawer-footer" }, Vi = {
  key: 0,
  class: "bp-side-drawer bp-reader-drawer"
}, Pi = { class: "bp-drawer-header" }, Ni = { class: "bp-reader-head-info" }, Di = { class: "bp-badge-pill" }, Li = {
  key: 0,
  class: "bp-reader-source"
}, Ri = { class: "bp-drawer-body bp-reader-body" }, Oi = { class: "bp-reader-title" }, Fi = { class: "bp-reader-meta" }, ji = { key: 0 }, Ui = { key: 1 }, Ji = ["href"], Ki = {
  key: 0,
  class: "bp-reader-quote"
}, zi = { class: "bp-reader-text" }, Hi = { class: "bp-drawer-footer" }, Qi = /* @__PURE__ */ St({
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
    ], n = k("prompts"), p = k(!1), f = k(!1), g = k(""), A = k(null), P = k(""), D = k(!1), ae = k(""), j = k(null), U = k(""), $e = k(null), Se = k(null), J = k(""), K = k(""), L = k(""), G = k(""), Z = k("default"), q = k(""), W = k(!1), z = k(""), H = k(""), X = k(""), ee = k(""), te = k(""), se = k("default"), oe = k(""), ne = k(!1);
    xt(() => {
      _.init(), x.init();
    });
    function rt() {
      p.value = !p.value;
    }
    function de(c) {
      n.value = c, a.isEditing = !1, a.isVariableDialogOpen = !1, d.isEditing = !1, d.isReading = !1;
    }
    function xe(c) {
      a.activeCategoryId = c;
    }
    function fe(c) {
      a.selectedTag = a.selectedTag === c ? null : c;
    }
    function lt(c) {
      d.activeCategoryId = c;
    }
    function Ie(c) {
      d.selectedTag = d.selectedTag === c ? null : c;
    }
    function Te(c) {
      _.copyPromptText(c);
    }
    function ce(c) {
      a.isEditing = !1, _.openVariableDialog(c);
    }
    function at() {
      if (!a.variableTargetPrompt) return;
      const c = He(
        a.variableTargetPrompt.content,
        a.variableFormValues
      );
      _.copyPromptText(a.variableTargetPrompt, c), _.closeVariableDialog();
    }
    const dt = V(() => a.variableTargetPrompt ? He(
      a.variableTargetPrompt.content,
      a.variableFormValues
    ) : ""), Be = V(() => B(L.value));
    function Me() {
      a.isVariableDialogOpen = !1, K.value = "", L.value = "", G.value = "", Z.value = a.activeCategoryId === "all" || a.activeCategoryId === "starred" ? De.value[0]?.id || "default" : a.activeCategoryId, q.value = "", W.value = !1, _.openEditor();
    }
    function ye(c) {
      a.isVariableDialogOpen = !1, K.value = c.title, L.value = c.content, G.value = c.description || "", Z.value = c.category, q.value = c.tags.join(", "), W.value = !!c.pinned, _.openEditor(c);
    }
    function ct() {
      if (!K.value.trim() && !L.value.trim()) return;
      const c = q.value.split(/[,，\s]+/).map((t) => t.trim()).filter(Boolean);
      _.saveEditorData({
        title: K.value.trim() || "未命名提示词",
        content: L.value,
        description: G.value.trim(),
        category: Z.value || "default",
        tags: c,
        pinned: W.value
      });
    }
    function Ee(c) {
      typeof window < "u" && !window.confirm("确定要删除这条提示词吗？") || _.deletePrompt(c);
    }
    function Ve(c) {
      _.togglePin(c);
    }
    function Pe() {
      const c = g.value.trim();
      c && _.addCategory(c) && (g.value = "", f.value = !1);
    }
    function ut(c) {
      A.value = c.id, P.value = c.name;
    }
    function Ne(c) {
      P.value.trim() && _.renameCategory(c, P.value.trim()), A.value = null, P.value = "";
    }
    function pt(c) {
      typeof window < "u" && !window.confirm(`确定删除分组「${c.name}」吗？组内提示词将归入默认分组。`) || _.deleteCategory(c.id);
    }
    const De = V(() => a.categories.filter((c) => c.id !== "all" && c.id !== "starred"));
    function Le() {
      d.isReading = !1, z.value = "", H.value = "", X.value = "", ee.value = "", te.value = "", se.value = d.activeCategoryId === "all" || d.activeCategoryId === "starred" ? je.value[0]?.id || "default" : d.activeCategoryId, oe.value = "", ne.value = !1, x.openEditor();
    }
    function bt(c) {
      d.isReading = !1, z.value = c.title, H.value = c.content, X.value = c.url || "", ee.value = c.sourceName || "", te.value = c.description || "", se.value = c.category, oe.value = c.tags.join(", "), ne.value = !!c.pinned, x.openEditor(c);
    }
    function gt(c) {
      x.openReader(c);
    }
    function vt(c) {
      const t = String(c || "").trim();
      return t.length <= 600 ? t : `${t.slice(0, 600)}
…`;
    }
    function ft() {
      if (!z.value.trim() && !H.value.trim()) return;
      const c = oe.value.split(/[,，\s]+/).map((t) => t.trim()).filter(Boolean);
      x.saveEditorData({
        title: z.value.trim() || "未命名文章",
        content: H.value,
        url: X.value.trim(),
        sourceName: ee.value.trim(),
        description: te.value.trim(),
        category: se.value || "default",
        tags: c,
        pinned: ne.value
      });
    }
    function yt(c) {
      typeof window < "u" && !window.confirm("确定要删除这篇保存的文章吗？") || x.deleteArticle(c);
    }
    function mt(c) {
      x.togglePin(c);
    }
    function Re(c) {
      x.copyArticleText(c);
    }
    function Oe() {
      const c = ae.value.trim();
      c && x.addCategory(c) && (ae.value = "", D.value = !1);
    }
    function kt(c) {
      j.value = c.id, U.value = c.name;
    }
    function Fe(c) {
      U.value.trim() && x.renameCategory(c, U.value.trim()), j.value = null, U.value = "";
    }
    function ht(c) {
      typeof window < "u" && !window.confirm(`确定删除分组「${c.name}」吗？组内文章将归入默认分组。`) || x.deleteCategory(c.id);
    }
    const je = V(() => d.categories.filter((c) => c.id !== "all" && c.id !== "starred"));
    function Ct() {
      $e.value?.click();
    }
    function wt() {
      Se.value?.click();
    }
    function _t(c) {
      const t = c.target, s = t.files?.[0];
      if (!s) return;
      const b = new FileReader();
      b.onload = (T) => {
        const re = T.target?.result;
        if (re) {
          const R = _.importBackup(re);
          J.value = R.success ? `成功导入 ${R.count} 条提示词！` : R.error || "导入失败", setTimeout(() => {
            J.value = "";
          }, 3500);
        }
        t.value = "";
      }, b.readAsText(s);
    }
    function At(c) {
      const t = c.target, s = t.files?.[0];
      if (!s) return;
      const b = new FileReader();
      b.onload = (T) => {
        const re = T.target?.result;
        if (re) {
          const R = x.importBackup(re);
          J.value = R.success ? `成功导入 ${R.count} 篇文章！` : R.error || "导入失败", setTimeout(() => {
            J.value = "";
          }, 3500);
        }
        t.value = "";
      }, b.readAsText(s);
    }
    function ue(c) {
      if (!c) return "";
      const t = new Date(c);
      return `${t.getMonth() + 1}/${t.getDate()}`;
    }
    function $t(c) {
      if (!c) return "";
      const t = new Date(c), s = (b) => String(b).padStart(2, "0");
      return `${t.getFullYear()}-${s(t.getMonth() + 1)}-${s(t.getDate())}`;
    }
    function Ue(c) {
      return a.categories.find((t) => t.id === c)?.name || "默认分组";
    }
    const ie = k(""), me = V(() => {
      const c = ie.value.trim().toLowerCase();
      return c ? We.value.filter(
        (t) => t.title.toLowerCase().includes(c) || t.description?.toLowerCase().includes(c) || t.sourceName?.toLowerCase().includes(c) || t.content.toLowerCase().includes(c) || t.tags.some((s) => s.toLowerCase().includes(c))
      ) : We.value;
    });
    return (c, t) => (r(), It(Rt, null, Tt({
      "header-actions": O(() => [
        e("div", {
          class: C(["bp-top-actions", { "bp-integrated": o.embedded }])
        }, [
          n.value === "prompts" ? (r(), l(m, { key: 0 }, [
            o.embedded ? (r(), l("label", zt, [
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
                "onUpdate:modelValue": t[3] || (t[3] = (s) => u(a).searchQuery = s),
                type: "search",
                placeholder: "搜索提示词…",
                "aria-label": "搜索提示词"
              }, null, 512), [
                [$, u(a).searchQuery]
              ])
            ])) : y("", !0),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "导出备份",
              onClick: t[4] || (t[4] = (s) => u(_).exportBackup())
            }, [
              o.embedded ? (r(), l("svg", Ht, [...t[51] || (t[51] = [
                e("path", { d: "M8 2.5v7.5M5 7l3 3 3-3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (r(), l("span", Qt, "💾")),
              t[52] || (t[52] = e("span", null, "导出", -1))
            ]),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "从文件导入",
              onClick: Ct
            }, [
              o.embedded ? (r(), l("svg", Yt, [...t[53] || (t[53] = [
                e("path", { d: "M8 10V2.5M5 5.5l3-3 3 3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (r(), l("span", Gt, "📥")),
              t[54] || (t[54] = e("span", null, "导入", -1))
            ]),
            e("button", {
              type: "button",
              class: C(["bp-btn bp-btn-primary", { active: u(a).isEditing }]),
              title: "新建提示词",
              onClick: Me
            }, [
              o.embedded ? (r(), l("svg", Zt, [...t[55] || (t[55] = [
                e("path", { d: "M8 3v10M3 8h10" }, null, -1)
              ])])) : (r(), l("span", qt, "➕")),
              e("span", null, v(o.embedded ? "新建" : "新建提示词"), 1)
            ], 2),
            e("input", {
              ref_key: "promptFileInputRef",
              ref: $e,
              type: "file",
              accept: ".json",
              style: { display: "none" },
              onChange: _t
            }, null, 544)
          ], 64)) : n.value === "articles" ? (r(), l(m, { key: 1 }, [
            o.embedded ? (r(), l("label", Wt, [
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
            ])) : y("", !0),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "导出文章备份",
              onClick: t[6] || (t[6] = (s) => u(x).exportBackup())
            }, [
              o.embedded ? (r(), l("svg", Xt, [...t[57] || (t[57] = [
                e("path", { d: "M8 2.5v7.5M5 7l3 3 3-3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (r(), l("span", es, "💾")),
              t[58] || (t[58] = e("span", null, "导出", -1))
            ]),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "从文件导入文章",
              onClick: wt
            }, [
              o.embedded ? (r(), l("svg", ts, [...t[59] || (t[59] = [
                e("path", { d: "M8 10V2.5M5 5.5l3-3 3 3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (r(), l("span", ss, "📥")),
              t[60] || (t[60] = e("span", null, "导入", -1))
            ]),
            e("button", {
              type: "button",
              class: C(["bp-btn bp-btn-primary bp-btn-article-pri", { active: u(d).isEditing }]),
              title: "保存新文章",
              onClick: Le
            }, [
              o.embedded ? (r(), l("svg", os, [...t[61] || (t[61] = [
                e("path", { d: "M8 3v10M3 8h10" }, null, -1)
              ])])) : (r(), l("span", ns, "➕")),
              e("span", null, v(o.embedded ? "新建" : "新建文章"), 1)
            ], 2),
            e("input", {
              ref_key: "articleFileInputRef",
              ref: Se,
              type: "file",
              accept: ".json",
              style: { display: "none" },
              onChange: At
            }, null, 544)
          ], 64)) : y("", !0)
        ], 2)
      ]),
      default: O(() => [
        e("div", {
          class: C(["bp-container", { "bp-integrated": o.embedded }])
        }, [
          J.value ? (r(), l("div", is, v(J.value), 1)) : y("", !0),
          u(a).statusMessage ? (r(), l("div", rs, v(u(a).statusMessage), 1)) : y("", !0),
          u(d).statusMessage ? (r(), l("div", ls, v(u(d).statusMessage), 1)) : y("", !0),
          e("div", as, [
            !o.embedded || n.value !== "stickers" ? (r(), l("aside", ds, [
              o.embedded ? y("", !0) : (r(), l(m, { key: 0 }, [
                e("div", {
                  class: C(["bp-sidebar-toggle-bar", { "is-collapsed": p.value }]),
                  onClick: rt
                }, [
                  t[62] || (t[62] = e("div", { class: "bp-sidebar-toggle-title" }, [
                    e("span", { class: "bp-sidebar-toggle-icon" }, "⚡"),
                    e("strong", null, "快捷频道")
                  ], -1)),
                  e("div", cs, [
                    e("span", null, v(p.value ? "展开" : "收起"), 1),
                    e("span", us, v(p.value ? "▾" : "▴"), 1)
                  ])
                ], 2),
                w(e("div", ps, [
                  (r(), l(m, null, I(i, (s) => e("div", {
                    key: s.id,
                    class: C(["bp-channel-wrap", s.themeClass])
                  }, [
                    e("button", {
                      type: "button",
                      class: C(["bp-channel-btn", { on: n.value === s.id }]),
                      onClick: (b) => de(s.id)
                    }, [
                      e("div", gs, [
                        e("span", vs, v(s.icon), 1),
                        e("div", fs, [
                          e("strong", null, v(s.title), 1),
                          e("small", null, v(s.subTitle), 1)
                        ])
                      ]),
                      e("span", ys, v(s.badge), 1)
                    ], 10, bs)
                  ], 2)), 64))
                ], 512), [
                  [Bt, !p.value]
                ])
              ], 64)),
              n.value === "prompts" ? (r(), l(m, { key: 1 }, [
                e("div", ms, [
                  e("div", ks, [
                    o.embedded ? y("", !0) : (r(), l("span", hs, "📁")),
                    e("div", Cs, [
                      t[63] || (t[63] = e("strong", null, "提示词分组", -1)),
                      o.embedded ? y("", !0) : (r(), l("small", ws, "按自定义分组整理"))
                    ])
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-hub-add-btn",
                    title: "新增分组",
                    onClick: t[7] || (t[7] = (s) => f.value = !0)
                  }, "+")
                ]),
                f.value ? (r(), l("div", _s, [
                  w(e("input", {
                    "onUpdate:modelValue": t[8] || (t[8] = (s) => g.value = s),
                    type: "text",
                    class: "bp-add-cat-input",
                    placeholder: "分组名称...",
                    maxlength: "16",
                    autofocus: "",
                    onKeydown: [
                      N(Pe, ["enter"]),
                      t[9] || (t[9] = N((s) => f.value = !1, ["esc"]))
                    ]
                  }, null, 544), [
                    [$, g.value]
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini primary",
                    onClick: Pe
                  }, "✔"),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini",
                    onClick: t[10] || (t[10] = (s) => f.value = !1)
                  }, "✕")
                ])) : y("", !0),
                e("div", As, [
                  (r(!0), l(m, null, I(u(a).categories, (s) => (r(), l("div", {
                    key: s.id,
                    class: C(["bp-folder-row", { active: u(a).activeCategoryId === s.id }])
                  }, [
                    A.value === s.id ? (r(), l("div", $s, [
                      w(e("input", {
                        "onUpdate:modelValue": t[11] || (t[11] = (b) => P.value = b),
                        type: "text",
                        class: "bp-folder-rename-input",
                        maxlength: "16",
                        autofocus: "",
                        onKeydown: [
                          N((b) => Ne(s.id), ["enter"]),
                          t[12] || (t[12] = N((b) => A.value = null, ["esc"]))
                        ]
                      }, null, 40, Ss), [
                        [$, P.value]
                      ]),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini primary",
                        onClick: (b) => Ne(s.id)
                      }, "✔", 8, xs),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini",
                        onClick: t[13] || (t[13] = (b) => A.value = null)
                      }, "✕")
                    ])) : (r(), l("button", {
                      key: 1,
                      type: "button",
                      class: "bp-folder-btn",
                      onClick: (b) => xe(s.id)
                    }, [
                      o.embedded ? y("", !0) : (r(), l("span", Ts, v(s.icon || "📁"), 1)),
                      e("span", {
                        class: "bp-folder-name",
                        title: s.name
                      }, v(s.name), 9, Bs),
                      s.id === "all" ? (r(), l("span", Ms, v(u(a).prompts.length), 1)) : s.id === "starred" ? (r(), l("span", Es, v(u(a).prompts.filter((b) => b.pinned).length), 1)) : (r(), l("span", Vs, v(u(a).prompts.filter((b) => b.category === s.id).length), 1))
                    ], 8, Is)),
                    !s.isBuiltin && A.value !== s.id ? (r(), l("div", Ps, [
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn",
                        title: "重命名",
                        onClick: h((b) => ut(s), ["stop"])
                      }, [
                        o.embedded ? (r(), l("svg", Ds, [...t[64] || (t[64] = [
                          e("path", { d: "M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" }, null, -1)
                        ])])) : (r(), l(m, { key: 1 }, [
                          S("✏️")
                        ], 64))
                      ], 8, Ns),
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn danger",
                        title: "删除",
                        onClick: h((b) => pt(s), ["stop"])
                      }, [
                        o.embedded ? (r(), l("svg", Rs, [...t[65] || (t[65] = [
                          e("path", { d: "M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5" }, null, -1)
                        ])])) : (r(), l(m, { key: 1 }, [
                          S("🗑️")
                        ], 64))
                      ], 8, Ls)
                    ])) : y("", !0)
                  ], 2))), 128))
                ]),
                !o.embedded && u(Ge).length > 0 ? (r(), l("div", Os, [
                  t[66] || (t[66] = e("div", { class: "bp-tags-title" }, "常用标签", -1)),
                  e("div", Fs, [
                    (r(!0), l(m, null, I(u(Ge), (s) => (r(), l("span", {
                      key: s,
                      class: C(["bp-tag-pill", { active: u(a).selectedTag === s }]),
                      onClick: (b) => fe(s)
                    }, " #" + v(s), 11, js))), 128))
                  ])
                ])) : y("", !0)
              ], 64)) : n.value === "articles" ? (r(), l(m, { key: 2 }, [
                e("div", Us, [
                  e("div", Js, [
                    o.embedded ? y("", !0) : (r(), l("span", Ks, "📚")),
                    e("div", zs, [
                      t[67] || (t[67] = e("strong", null, "文章分组", -1)),
                      o.embedded ? y("", !0) : (r(), l("small", Hs, "文章多级分类整理"))
                    ])
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-hub-add-btn bp-btn-indigo",
                    title: "新增文章分组",
                    onClick: t[14] || (t[14] = (s) => D.value = !0)
                  }, "+")
                ]),
                D.value ? (r(), l("div", Qs, [
                  w(e("input", {
                    "onUpdate:modelValue": t[15] || (t[15] = (s) => ae.value = s),
                    type: "text",
                    class: "bp-add-cat-input bp-border-indigo",
                    placeholder: "分组名称...",
                    maxlength: "16",
                    autofocus: "",
                    onKeydown: [
                      N(Oe, ["enter"]),
                      t[16] || (t[16] = N((s) => D.value = !1, ["esc"]))
                    ]
                  }, null, 544), [
                    [$, ae.value]
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini primary bp-bg-indigo",
                    onClick: Oe
                  }, "✔"),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini",
                    onClick: t[17] || (t[17] = (s) => D.value = !1)
                  }, "✕")
                ])) : y("", !0),
                e("div", Ys, [
                  (r(!0), l(m, null, I(u(d).categories, (s) => (r(), l("div", {
                    key: s.id,
                    class: C(["bp-folder-row bp-row-indigo", { active: u(d).activeCategoryId === s.id }])
                  }, [
                    j.value === s.id ? (r(), l("div", Gs, [
                      w(e("input", {
                        "onUpdate:modelValue": t[18] || (t[18] = (b) => U.value = b),
                        type: "text",
                        class: "bp-folder-rename-input",
                        maxlength: "16",
                        autofocus: "",
                        onKeydown: [
                          N((b) => Fe(s.id), ["enter"]),
                          t[19] || (t[19] = N((b) => j.value = null, ["esc"]))
                        ]
                      }, null, 40, Zs), [
                        [$, U.value]
                      ]),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini primary bp-bg-indigo",
                        onClick: (b) => Fe(s.id)
                      }, "✔", 8, qs),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini",
                        onClick: t[20] || (t[20] = (b) => j.value = null)
                      }, "✕")
                    ])) : (r(), l("button", {
                      key: 1,
                      type: "button",
                      class: "bp-folder-btn",
                      onClick: (b) => lt(s.id)
                    }, [
                      o.embedded ? y("", !0) : (r(), l("span", Xs, v(s.icon || "📑"), 1)),
                      e("span", {
                        class: "bp-folder-name",
                        title: s.name
                      }, v(s.name), 9, eo),
                      s.id === "all" ? (r(), l("span", to, v(u(d).articles.length), 1)) : s.id === "starred" ? (r(), l("span", so, v(u(d).articles.filter((b) => b.pinned).length), 1)) : (r(), l("span", oo, v(u(d).articles.filter((b) => b.category === s.id).length), 1))
                    ], 8, Ws)),
                    !s.isBuiltin && j.value !== s.id ? (r(), l("div", no, [
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn",
                        title: "重命名",
                        onClick: h((b) => kt(s), ["stop"])
                      }, [
                        o.embedded ? (r(), l("svg", ro, [...t[68] || (t[68] = [
                          e("path", { d: "M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" }, null, -1)
                        ])])) : (r(), l(m, { key: 1 }, [
                          S("✏️")
                        ], 64))
                      ], 8, io),
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn danger",
                        title: "删除",
                        onClick: h((b) => ht(s), ["stop"])
                      }, [
                        o.embedded ? (r(), l("svg", ao, [...t[69] || (t[69] = [
                          e("path", { d: "M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5" }, null, -1)
                        ])])) : (r(), l(m, { key: 1 }, [
                          S("🗑️")
                        ], 64))
                      ], 8, lo)
                    ])) : y("", !0)
                  ], 2))), 128))
                ]),
                !o.embedded && u(Xe).length > 0 ? (r(), l("div", co, [
                  t[70] || (t[70] = e("div", { class: "bp-tags-title" }, "文章标签", -1)),
                  e("div", uo, [
                    (r(!0), l(m, null, I(u(Xe), (s) => (r(), l("span", {
                      key: s,
                      class: C(["bp-tag-pill bp-tag-indigo", { active: u(d).selectedTag === s }]),
                      onClick: (b) => Ie(s)
                    }, " #" + v(s), 11, po))), 128))
                  ])
                ])) : y("", !0)
              ], 64)) : y("", !0)
            ])) : y("", !0),
            n.value === "prompts" ? (r(), l("main", bo, [
              e("div", go, [
                e("div", vo, [
                  e("span", null, [
                    t[71] || (t[71] = S("共 ", -1)),
                    e("strong", null, v(u(we).length), 1),
                    t[72] || (t[72] = S(" 条提示词", -1))
                  ]),
                  u(a).selectedTag ? (r(), l("span", fo, [
                    S(" 标签: #" + v(u(a).selectedTag) + " ", 1),
                    e("button", {
                      type: "button",
                      class: "bp-tag-close",
                      onClick: t[21] || (t[21] = (s) => u(a).selectedTag = null)
                    }, "✕")
                  ])) : y("", !0)
                ])
              ]),
              u(we).length === 0 ? (r(), l("div", yo, [
                o.embedded ? (r(), l("div", mo, [...t[73] || (t[73] = [
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
                ])])) : (r(), l("div", ko, "🎒")),
                e("h3", ho, v(u(a).searchQuery.trim() || u(a).selectedTag ? "没有匹配的提示词" : "暂无提示词"), 1),
                u(a).searchQuery.trim() || u(a).selectedTag ? (r(), l("p", Co, "试试更换搜索词或清除标签筛选。")) : (r(), l("p", wo, [...t[74] || (t[74] = [
                  S("把常用的系统提示、模板指令和 ", -1),
                  e("code", null, "{{变量}}", -1),
                  S(" 存在这里，随时一键调用。", -1)
                ])])),
                e("button", {
                  type: "button",
                  class: "bp-btn bp-btn-primary",
                  onClick: Me
                }, "新建提示词")
              ])) : (r(), l("div", _o, [
                (r(!0), l(m, null, I(u(we), (s) => (r(), l("article", {
                  key: s.id,
                  class: C(["bp-card", {
                    "bp-compact-card": o.embedded,
                    "is-pinned": s.pinned,
                    "is-selected": u(a).editingPrompt?.id === s.id
                  }]),
                  onClick: (b) => o.embedded && ye(s)
                }, [
                  o.embedded ? (r(), l(m, { key: 0 }, [
                    e("div", $o, [
                      e("h4", {
                        class: "bp-compact-title",
                        title: s.title
                      }, v(s.title), 9, So),
                      e("div", {
                        class: "bp-compact-actions",
                        onClick: t[22] || (t[22] = h(() => {
                        }, ["stop"]))
                      }, [
                        u(B)(s.content).length > 0 ? (r(), l("button", {
                          key: 0,
                          type: "button",
                          class: "bp-compact-icon-btn accent",
                          title: "填充变量并使用",
                          onClick: h((b) => ce(s), ["stop"])
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
                        ])], 8, xo)) : y("", !0),
                        e("button", {
                          type: "button",
                          class: C(["bp-compact-icon-btn", { success: u(a).copySuccessId === s.id }]),
                          title: u(a).copySuccessId === s.id ? "已复制" : "复制提示词",
                          onClick: h((b) => Te(s), ["stop"])
                        }, [
                          u(a).copySuccessId === s.id ? (r(), l("svg", To, [...t[76] || (t[76] = [
                            e("path", { d: "M3.5 8.5l3 3 6-6.5" }, null, -1)
                          ])])) : (r(), l("svg", Bo, [...t[77] || (t[77] = [
                            e("rect", {
                              x: "5.5",
                              y: "5.5",
                              width: "7.5",
                              height: "8.5",
                              rx: "1.4"
                            }, null, -1),
                            e("path", { d: "M10.5 5.5V3.6A1.4 1.4 0 0 0 9.1 2.2H4.2a1.4 1.4 0 0 0-1.4 1.4v6.7a1.4 1.4 0 0 0 1.4 1.4h1.3" }, null, -1)
                          ])]))
                        ], 10, Io),
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
                        ])], 8, Mo),
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
                        ])], 8, Eo)
                      ])
                    ]),
                    e("p", {
                      class: "bp-compact-desc",
                      title: s.description || s.content
                    }, v(s.description || s.content || "暂无内容描述"), 9, Vo),
                    e("div", Po, [
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
                      ], 8, No),
                      (r(!0), l(m, null, I(s.tags, (b) => (r(), l("span", {
                        key: b,
                        class: "bp-compact-tag-chip",
                        onClick: h((T) => fe(b), ["stop"])
                      }, "#" + v(b), 9, Do))), 128)),
                      (r(!0), l(m, null, I(u(B)(s.content), (b) => (r(), l("span", {
                        key: b,
                        class: "bp-compact-var-chip",
                        title: `点击填充变量 ${b}`,
                        onClick: h((T) => ce(s), ["stop"])
                      }, "{{" + v(b) + "}}", 9, Lo))), 128))
                    ]),
                    e("div", Ro, [
                      e("div", Oo, [
                        e("span", Fo, [
                          e("i", {
                            class: C(["bp-compact-dot", { hasVars: u(B)(s.content).length > 0 }])
                          }, null, 2),
                          e("span", null, v(u(B)(s.content).length > 0 ? `${u(B)(s.content).length} 变量` : "Prompt"), 1)
                        ]),
                        e("button", {
                          type: "button",
                          class: C(["bp-compact-star", { active: s.pinned }]),
                          title: s.pinned ? "取消置顶" : "星标置顶",
                          onClick: h((b) => Ve(s.id), ["stop"])
                        }, [
                          e("span", null, v(s.pinned ? "★" : "☆"), 1),
                          s.useCount ? (r(), l("span", Uo, v(s.useCount), 1)) : y("", !0)
                        ], 10, jo)
                      ]),
                      e("div", Jo, [
                        u(a).copySuccessId === s.id ? (r(), l("span", Ko, "已复制")) : (r(), l("span", zo, v($t(s.updatedAt)), 1))
                      ])
                    ])
                  ], 64)) : (r(), l(m, { key: 1 }, [
                    e("div", Ho, [
                      e("div", Qo, [
                        e("button", {
                          type: "button",
                          class: C(["bp-pin-btn", { active: s.pinned }]),
                          title: s.pinned ? "取消置顶" : "星标置顶",
                          onClick: h((b) => Ve(s.id), ["stop"])
                        }, v(s.pinned ? "★" : "☆"), 11, Yo),
                        e("h4", {
                          class: "bp-card-title",
                          title: s.title
                        }, v(s.title), 9, Go)
                      ]),
                      e("div", Zo, [
                        e("button", {
                          type: "button",
                          class: "bp-action-btn edit",
                          title: "编辑提示词",
                          onClick: h((b) => ye(s), ["stop"])
                        }, "✏️", 8, qo),
                        e("button", {
                          type: "button",
                          class: "bp-action-btn delete",
                          title: "删除提示词",
                          onClick: h((b) => Ee(s.id), ["stop"])
                        }, "🗑️", 8, Wo)
                      ])
                    ]),
                    s.description ? (r(), l("p", Xo, v(s.description), 1)) : y("", !0),
                    e("div", {
                      class: "bp-card-preview",
                      title: s.content
                    }, [
                      e("pre", null, [
                        e("code", null, v(s.content), 1)
                      ])
                    ], 8, en),
                    u(B)(s.content).length > 0 ? (r(), l("div", tn, [
                      t[81] || (t[81] = e("span", { class: "bp-vars-hint" }, "变量:", -1)),
                      (r(!0), l(m, null, I(u(B)(s.content), (b) => (r(), l("span", {
                        key: b,
                        class: "bp-var-pill",
                        title: `在无模态侧栏中填充: ${b}`,
                        onClick: h((T) => ce(s), ["stop"])
                      }, " {{" + v(b) + "}} ", 9, sn))), 128))
                    ])) : y("", !0),
                    e("div", on, [
                      e("div", nn, [
                        (r(!0), l(m, null, I(s.tags, (b) => (r(), l("span", {
                          key: b,
                          class: "bp-tag-micro",
                          onClick: h((T) => fe(b), ["stop"])
                        }, "#" + v(b), 9, rn))), 128))
                      ]),
                      e("div", ln, [
                        u(a).copySuccessId === s.id ? (r(), l("span", an, "✓ 已复制!")) : y("", !0),
                        u(B)(s.content).length > 0 ? (r(), l("button", {
                          key: 1,
                          type: "button",
                          class: "bp-btn-use",
                          title: "填充变量并复制",
                          onClick: h((b) => ce(s), ["stop"])
                        }, " ⚡ 填充使用 ", 8, dn)) : y("", !0),
                        e("button", {
                          type: "button",
                          class: C(["bp-btn-copy", { success: u(a).copySuccessId === s.id }]),
                          title: "直接复制提示词文本",
                          onClick: h((b) => Te(s), ["stop"])
                        }, v(u(a).copySuccessId === s.id ? "已复制" : "复制"), 11, cn)
                      ])
                    ])
                  ], 64))
                ], 10, Ao))), 128))
              ]))
            ])) : n.value === "articles" ? (r(), l("main", un, [
              e("div", pn, [
                e("div", bn, [
                  e("span", null, [
                    t[82] || (t[82] = S("共 ", -1)),
                    e("strong", null, v(me.value.length), 1),
                    t[83] || (t[83] = S(" 篇文章", -1))
                  ]),
                  u(d).selectedTag ? (r(), l("span", gn, [
                    S(" 标签: #" + v(u(d).selectedTag) + " ", 1),
                    e("button", {
                      type: "button",
                      class: "bp-tag-close",
                      onClick: t[23] || (t[23] = (s) => u(d).selectedTag = null)
                    }, "✕")
                  ])) : y("", !0)
                ])
              ]),
              me.value.length === 0 ? (r(), l("div", vn, [
                o.embedded ? (r(), l("div", fn, [...t[84] || (t[84] = [
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
                ])])) : (r(), l("div", yn, "📑")),
                e("h3", mn, v(ie.value.trim() || u(d).selectedTag ? "没有匹配的文章" : "暂无保存文章"), 1),
                e("p", kn, v(ie.value.trim() || u(d).selectedTag ? "试试更换搜索词或清除标签筛选。" : "把有价值的深度长文、技术资料或视频分析笔记存在这里，随时离线阅读。"), 1),
                e("button", {
                  type: "button",
                  class: "bp-btn bp-btn-primary bp-btn-indigo",
                  onClick: Le
                }, "保存文章")
              ])) : (r(), l("div", hn, [
                (r(!0), l(m, null, I(me.value, (s) => (r(), l("article", {
                  key: s.id,
                  class: C(["bp-card bp-card-article", {
                    "is-pinned": s.pinned,
                    "is-selected": u(d).editingArticle?.id === s.id || u(d).readingArticle?.id === s.id
                  }])
                }, [
                  e("div", Cn, [
                    e("div", wn, [
                      e("button", {
                        type: "button",
                        class: C(["bp-pin-btn", { active: s.pinned }]),
                        title: s.pinned ? "取消置顶" : "星标置顶",
                        onClick: h((b) => mt(s.id), ["stop"])
                      }, v(s.pinned ? "★" : "☆"), 11, _n),
                      e("h4", {
                        class: "bp-card-title",
                        title: s.title
                      }, v(s.title), 9, An)
                    ]),
                    e("div", $n, [
                      s.url ? (r(), l("a", {
                        key: 0,
                        href: s.url,
                        target: "_blank",
                        rel: "noreferrer",
                        class: "bp-action-btn",
                        title: "在浏览器中打开原文"
                      }, " ↗ ", 8, Sn)) : y("", !0),
                      e("button", {
                        type: "button",
                        class: "bp-action-btn edit",
                        title: "编辑文章",
                        onClick: h((b) => bt(s), ["stop"])
                      }, [
                        o.embedded ? (r(), l("svg", In, [...t[85] || (t[85] = [
                          e("path", { d: "M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" }, null, -1)
                        ])])) : (r(), l(m, { key: 1 }, [
                          S("✏️")
                        ], 64))
                      ], 8, xn),
                      e("button", {
                        type: "button",
                        class: "bp-action-btn delete",
                        title: "删除文章",
                        onClick: h((b) => yt(s.id), ["stop"])
                      }, [
                        o.embedded ? (r(), l("svg", Bn, [...t[86] || (t[86] = [
                          e("path", { d: "M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5" }, null, -1)
                        ])])) : (r(), l(m, { key: 1 }, [
                          S("🗑️")
                        ], 64))
                      ], 8, Tn)
                    ])
                  ]),
                  s.sourceName || s.updatedAt ? (r(), l("div", Mn, [
                    s.sourceName ? (r(), l("span", En, v(o.embedded ? s.sourceName : `📰 ${s.sourceName}`), 1)) : y("", !0),
                    e("span", Vn, v(o.embedded ? ue(s.updatedAt) : `🕒 ${ue(s.updatedAt)}`), 1)
                  ])) : y("", !0),
                  s.description ? (r(), l("p", Pn, v(s.description), 1)) : y("", !0),
                  e("div", Nn, [
                    F(ze, {
                      class: "bp-preview-md",
                      content: vt(s.content)
                    }, null, 8, ["content"])
                  ]),
                  e("div", Dn, [
                    e("div", Ln, [
                      (r(!0), l(m, null, I(s.tags, (b) => (r(), l("span", {
                        key: b,
                        class: "bp-tag-micro",
                        onClick: h((T) => Ie(b), ["stop"])
                      }, "#" + v(b), 9, Rn))), 128))
                    ]),
                    e("div", On, [
                      u(d).copySuccessId === s.id ? (r(), l("span", Fn, "✓ 已复制!")) : y("", !0),
                      e("button", {
                        type: "button",
                        class: "bp-btn-read",
                        title: "阅读全文",
                        onClick: h((b) => gt(s), ["stop"])
                      }, v(o.embedded ? "阅读全文" : "📖 阅读全文"), 9, jn),
                      e("button", {
                        type: "button",
                        class: C(["bp-btn-copy", { success: u(d).copySuccessId === s.id }]),
                        title: "复制文章全文",
                        onClick: h((b) => Re(s), ["stop"])
                      }, v(u(d).copySuccessId === s.id ? "已复制" : "复制"), 11, Un)
                    ])
                  ])
                ], 2))), 128))
              ]))
            ])) : n.value === "stickers" ? (r(), l("main", Jn, [
              F(Mt, {
                "dock-owned": "",
                active: n.value === "stickers"
              }, null, 8, ["active"])
            ])) : y("", !0),
            F(pe, { name: "drawer-slide" }, {
              default: O(() => [
                u(a).isEditing && n.value === "prompts" ? (r(), l("aside", Kn, [
                  e("header", zn, [
                    e("h3", Hn, v(u(a).editingPrompt?.id ? o.embedded ? "编辑提示词" : "✏️ 编辑提示词" : o.embedded ? "新建提示词" : "➕ 新建提示词"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "收起",
                      onClick: t[24] || (t[24] = (s) => u(_).closeEditor())
                    }, "✕")
                  ]),
                  e("div", Qn, [
                    e("div", Yn, [
                      t[87] || (t[87] = e("label", { class: "bp-form-label" }, "提示词标题 *", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[25] || (t[25] = (s) => K.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：自研架构评审准则",
                        maxlength: "64"
                      }, null, 512), [
                        [$, K.value]
                      ])
                    ]),
                    e("div", Gn, [
                      e("div", Zn, [
                        t[88] || (t[88] = e("label", { class: "bp-form-label" }, "所属分组", -1)),
                        w(e("select", {
                          "onUpdate:modelValue": t[26] || (t[26] = (s) => Z.value = s),
                          class: "bp-form-select"
                        }, [
                          (r(!0), l(m, null, I(De.value, (s) => (r(), l("option", {
                            key: s.id,
                            value: s.id
                          }, v(s.name), 9, qn))), 128))
                        ], 512), [
                          [Je, Z.value]
                        ])
                      ]),
                      e("div", Wn, [
                        e("label", Xn, [
                          w(e("input", {
                            "onUpdate:modelValue": t[27] || (t[27] = (s) => W.value = s),
                            type: "checkbox"
                          }, null, 512), [
                            [Ke, W.value]
                          ]),
                          t[89] || (t[89] = e("span", null, "星标置顶", -1))
                        ])
                      ])
                    ]),
                    e("div", ei, [
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
                    e("div", ti, [
                      t[92] || (t[92] = e("div", { class: "bp-label-row" }, [
                        e("label", { class: "bp-form-label" }, "正文内容 *"),
                        e("span", { class: "bp-label-tip" }, [
                          S("支持 "),
                          e("code", null, "{{变量}}"),
                          S(" 动态占位符")
                        ])
                      ], -1)),
                      w(e("textarea", {
                        "onUpdate:modelValue": t[29] || (t[29] = (s) => L.value = s),
                        class: "bp-form-input bp-textarea-main",
                        placeholder: "在此输入完整的提示词内容..."
                      }, null, 512), [
                        [$, L.value]
                      ]),
                      Be.value.length > 0 ? (r(), l("div", si, [
                        t[91] || (t[91] = e("span", null, "检测到变量：", -1)),
                        (r(!0), l(m, null, I(Be.value, (s) => (r(), l("span", {
                          key: s,
                          class: "bp-var-pill mini"
                        }, "{{" + v(s) + "}}", 1))), 128))
                      ])) : y("", !0)
                    ]),
                    e("div", oi, [
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
                  e("footer", ni, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[31] || (t[31] = (s) => u(_).closeEditor())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary",
                      onClick: ct
                    }, "保存提示词")
                  ])
                ])) : y("", !0)
              ]),
              _: 1
            }),
            F(pe, { name: "drawer-slide" }, {
              default: O(() => [
                u(a).isVariableDialogOpen && n.value === "prompts" ? (r(), l("aside", ii, [
                  e("header", ri, [
                    e("h3", li, v(o.embedded ? "填充变量" : "⚡ 快速填充变量"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "关闭",
                      onClick: t[32] || (t[32] = (s) => u(_).closeVariableDialog())
                    }, "✕")
                  ]),
                  e("div", ai, [
                    e("p", di, [
                      t[94] || (t[94] = S("正在使用：", -1)),
                      e("strong", null, v(u(a).variableTargetPrompt?.title), 1)
                    ]),
                    e("div", ci, [
                      (r(!0), l(m, null, I(u(a).variableFormValues, (s, b) => (r(), l("div", {
                        key: b,
                        class: "bp-form-group"
                      }, [
                        e("label", ui, "{{" + v(b) + "}}", 1),
                        w(e("textarea", {
                          "onUpdate:modelValue": (T) => u(a).variableFormValues[b] = T,
                          class: "bp-form-input bp-textarea-small",
                          placeholder: `请输入 ${b} 的具体内容...`,
                          rows: "2"
                        }, null, 8, pi), [
                          [$, u(a).variableFormValues[b]]
                        ])
                      ]))), 128))
                    ]),
                    e("div", bi, [
                      t[95] || (t[95] = e("div", { class: "bp-preview-header" }, "实时合并预览", -1)),
                      e("pre", gi, [
                        e("code", null, v(dt.value), 1)
                      ])
                    ])
                  ]),
                  e("footer", vi, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[33] || (t[33] = (s) => u(_).closeVariableDialog())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary",
                      onClick: at
                    }, "一键复制填充内容")
                  ])
                ])) : y("", !0)
              ]),
              _: 1
            }),
            F(pe, { name: "drawer-slide" }, {
              default: O(() => [
                u(d).isEditing && n.value === "articles" ? (r(), l("aside", fi, [
                  e("header", yi, [
                    e("h3", mi, v(u(d).editingArticle?.id ? o.embedded ? "编辑文章" : "✏️ 编辑文章" : o.embedded ? "保存新文章" : "➕ 保存新文章"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "收起",
                      onClick: t[34] || (t[34] = (s) => u(x).closeEditor())
                    }, "✕")
                  ]),
                  e("div", ki, [
                    e("div", hi, [
                      t[96] || (t[96] = e("label", { class: "bp-form-label" }, "文章标题 *", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[35] || (t[35] = (s) => z.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：a16z 提出 B2A 经济架构深度解析",
                        maxlength: "128"
                      }, null, 512), [
                        [$, z.value]
                      ])
                    ]),
                    e("div", Ci, [
                      e("div", wi, [
                        t[97] || (t[97] = e("label", { class: "bp-form-label" }, "所属分组", -1)),
                        w(e("select", {
                          "onUpdate:modelValue": t[36] || (t[36] = (s) => se.value = s),
                          class: "bp-form-select"
                        }, [
                          (r(!0), l(m, null, I(je.value, (s) => (r(), l("option", {
                            key: s.id,
                            value: s.id
                          }, v(s.name), 9, _i))), 128))
                        ], 512), [
                          [Je, se.value]
                        ])
                      ]),
                      e("div", Ai, [
                        e("label", $i, [
                          w(e("input", {
                            "onUpdate:modelValue": t[37] || (t[37] = (s) => ne.value = s),
                            type: "checkbox"
                          }, null, 512), [
                            [Ke, ne.value]
                          ]),
                          t[98] || (t[98] = e("span", null, "星标置顶", -1))
                        ])
                      ])
                    ]),
                    e("div", Si, [
                      e("div", xi, [
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
                      e("div", Ii, [
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
                    e("div", Ti, [
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
                    e("div", Bi, [
                      t[102] || (t[102] = e("label", { class: "bp-form-label" }, "文章正文内容 *", -1)),
                      w(e("textarea", {
                        "onUpdate:modelValue": t[41] || (t[41] = (s) => H.value = s),
                        class: "bp-form-input bp-textarea-main",
                        placeholder: "在此粘贴或撰写完整的文章长文本或 Markdown 内容..."
                      }, null, 512), [
                        [$, H.value]
                      ])
                    ]),
                    e("div", Mi, [
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
                  e("footer", Ei, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[43] || (t[43] = (s) => u(x).closeEditor())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary bp-btn-indigo",
                      onClick: ft
                    }, "保存文章")
                  ])
                ])) : y("", !0)
              ]),
              _: 1
            }),
            F(pe, { name: "drawer-slide" }, {
              default: O(() => [
                u(d).isReading && n.value === "articles" ? (r(), l("aside", Vi, [
                  e("header", Pi, [
                    e("div", Ni, [
                      e("span", Di, v(o.embedded ? "阅读模式" : "📖 阅读器"), 1),
                      u(d).readingArticle?.sourceName ? (r(), l("span", Li, v(u(d).readingArticle.sourceName), 1)) : y("", !0)
                    ]),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "关闭阅读器",
                      onClick: t[44] || (t[44] = (s) => u(x).closeReader())
                    }, "✕")
                  ]),
                  e("div", Ri, [
                    e("h2", Oi, v(u(d).readingArticle?.title), 1),
                    e("div", Fi, [
                      u(d).readingArticle?.sourceName ? (r(), l("span", ji, v(o.embedded ? u(d).readingArticle.sourceName : `📰 ${u(d).readingArticle.sourceName}`), 1)) : y("", !0),
                      u(d).readingArticle?.updatedAt ? (r(), l("span", Ui, v(o.embedded ? ue(u(d).readingArticle.updatedAt) : `🕒 ${ue(u(d).readingArticle.updatedAt)}`), 1)) : y("", !0),
                      u(d).readingArticle?.url ? (r(), l("a", {
                        key: 2,
                        href: u(d).readingArticle.url,
                        target: "_blank",
                        rel: "noreferrer",
                        class: "bp-reader-link"
                      }, " 原文链接 ↗ ", 8, Ji)) : y("", !0)
                    ]),
                    u(d).readingArticle?.description ? (r(), l("blockquote", Ki, v(o.embedded ? u(d).readingArticle.description : `💡 ${u(d).readingArticle.description}`), 1)) : y("", !0),
                    e("div", zi, [
                      F(ze, {
                        content: u(d).readingArticle?.content || ""
                      }, null, 8, ["content"])
                    ])
                  ]),
                  e("footer", Hi, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[45] || (t[45] = (s) => u(x).closeReader())
                    }, "关闭"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary bp-btn-indigo",
                      onClick: t[46] || (t[46] = (s) => u(d).readingArticle && Re(u(d).readingArticle))
                    }, " 一键复制全文 ")
                  ])
                ])) : y("", !0)
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
        fn: O(() => [
          e("nav", jt, [
            e("button", {
              type: "button",
              role: "tab",
              "aria-selected": n.value === "prompts",
              class: C(["bp-seg-tab", { active: n.value === "prompts" }]),
              onClick: t[0] || (t[0] = (s) => de("prompts"))
            }, [
              t[47] || (t[47] = e("span", null, "提示词", -1)),
              e("small", null, v(u(a).prompts.length), 1)
            ], 10, Ut),
            e("button", {
              type: "button",
              role: "tab",
              "aria-selected": n.value === "articles",
              class: C(["bp-seg-tab", { active: n.value === "articles" }]),
              onClick: t[1] || (t[1] = (s) => de("articles"))
            }, [
              t[48] || (t[48] = e("span", null, "文章", -1)),
              e("small", null, v(u(d).articles.length), 1)
            ], 10, Jt),
            e("button", {
              type: "button",
              role: "tab",
              "aria-selected": n.value === "stickers",
              class: C(["bp-seg-tab", { active: n.value === "stickers" }]),
              onClick: t[2] || (t[2] = (s) => de("stickers"))
            }, [...t[49] || (t[49] = [
              e("span", null, "表情包", -1)
            ])], 10, Kt)
          ])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), Xi = /* @__PURE__ */ tt(Qi, [["__scopeId", "data-v-d96d53aa"]]);
export {
  Xi as default
};
