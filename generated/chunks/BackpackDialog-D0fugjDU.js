import { f as r, g as l, h as e, J as he, r as tt, s as V, d as xt, o as It, l as Tt, V as Bt, A as R, q as C, t as v, u as c, j as y, F as m, p as w, i as I, z as Mt, I as ue, v as S, k as h, m as $, B as O, U as pe, M as Ke, L as ze, b as k } from "./vendor-vue-C-_ocEUS.js";
import { _ as st, o as be } from "./_plugin-vue_export-helper-CUD1GoS1.js";
import { w as ot, P as Ce, S as nt, p as Se, A as re } from "./revision-guard-5IS-EcTI.js";
import { S as Et } from "./StickerBoard-D_YCLRFN.js";
import He from "./MessageMarkdown-DGV41KZK.js";
const Vt = {}, Pt = {
  class: "backpack-embedded",
  "aria-label": "AI 工作区资料库"
}, Nt = { class: "backpack-embedded-header" }, Dt = { class: "backpack-embedded-brand" }, Lt = { class: "backpack-embedded-actions" };
function Rt(o, i) {
  return r(), l("section", Pt, [
    e("header", Nt, [
      e("div", Dt, [
        i[0] || (i[0] = e("h2", null, "资料库", -1)),
        he(o.$slots, "header-tabs", {}, void 0, !0)
      ]),
      e("div", Lt, [
        he(o.$slots, "header-actions", {}, void 0, !0)
      ])
    ]),
    he(o.$slots, "default", {}, void 0, !0)
  ]);
}
const Ot = /* @__PURE__ */ st(Vt, [["render", Rt], ["__scopeId", "data-v-a3a93d15"]]), H = "logicweaver_prompt_backpack_v1", Q = "logicweaver_prompt_backpack_categories_v1", M = "logicweaver_saved_articles_v1", E = "logicweaver_saved_article_categories_v1", it = [
  { id: "all", name: "全部", icon: "🎒", isBuiltin: !0 },
  { id: "starred", name: "星标置顶", icon: "⭐", isBuiltin: !0 },
  { id: "default", name: "默认分组", icon: "📁", isBuiltin: !1 }
], rt = [
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
function Qe(o, i) {
  return o ? o.replace(/\{\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}\}|\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}/g, (n, p, f) => {
    const g = (p || f || "").trim();
    return i[g] !== void 0 && i[g] !== "" ? i[g] : n;
  }) : "";
}
const a = tt({
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
let Ye = !1, we = 0, Ge = Promise.resolve();
function fe(o, i) {
  const n = [...i];
  return n.some((p) => p.id === "default") || n.push({ id: "default", name: "默认分组", icon: "📁", isBuiltin: !1 }), { prompts: [...o], categories: n };
}
function Ft() {
  try {
    if (typeof localStorage > "u") return null;
    const o = localStorage.getItem(H), i = localStorage.getItem(Q);
    if (!o && !i) return null;
    const n = o ? JSON.parse(o) : [], p = i ? JSON.parse(i) : null;
    return fe(
      Array.isArray(n) ? n : [],
      Array.isArray(p) && p.length ? p : it
    );
  } catch {
    return null;
  }
}
function ge(o, i) {
  try {
    if (typeof localStorage > "u") return;
    localStorage.setItem(H, JSON.stringify(o)), localStorage.setItem(Q, JSON.stringify(i));
  } catch (n) {
    console.warn("[Backpack] persistToLocalStorage failed", n);
  }
}
const _ = {
  get state() {
    return a;
  },
  async init() {
    if (Ye) return;
    Ye = !0, a.isLoading = !0;
    const o = Ft();
    o && o.prompts.length > 0 && (a.prompts = o.prompts, o.categories?.length && (a.categories = o.categories));
    try {
      if (typeof chrome < "u" && chrome.storage?.local) {
        const i = await chrome.storage.local.get([H, Q, Ce]);
        we = Se(i?.[Ce]);
        const n = i?.[H] || a.prompts, p = i?.[Q] || a.categories, f = fe(n, p);
        a.prompts = f.prompts, a.categories = f.categories, JSON.stringify(i?.[H]) !== JSON.stringify(f.prompts) || JSON.stringify(i?.[Q]) !== JSON.stringify(f.categories) ? await this.save() : ge(f.prompts, f.categories);
      } else {
        const i = fe(a.prompts, a.categories);
        a.prompts = i.prompts, a.categories = i.categories, ge(a.prompts, a.categories);
      }
    } catch (i) {
      console.warn("[Backpack] init storage error:", i);
      const n = fe(a.prompts, a.categories);
      a.prompts = n.prompts, a.categories = n.categories;
    } finally {
      a.isLoading = !1;
    }
  },
  async save() {
    const o = JSON.parse(JSON.stringify(a.prompts)), i = JSON.parse(JSON.stringify(a.categories));
    if (typeof chrome < "u" && chrome.storage?.local) {
      const n = Ge.then(async () => {
        try {
          if (typeof navigator > "u" || !navigator.locks) throw new Error("浏览器不支持安全的背包写入锁");
          return we = await ot(chrome.storage.local, navigator.locks, Ce, we, {
            [H]: o,
            [Q]: i
          }), ge(o, i), a.statusMessage = "", !0;
        } catch (p) {
          return a.statusMessage = p instanceof nt ? "提示词已在其他页面更改，当前修改未保存。请先导出本页内容，再刷新并核对。" : "提示词保存失败，当前修改未保存。请先导出本页内容，再检查存储。", console.warn("[Backpack] save failed", p), !1;
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
}, _e = V(() => {
  const o = a.searchQuery.trim().toLowerCase(), i = a.activeCategoryId, n = a.selectedTag;
  return a.prompts.filter((p) => {
    if (i === "starred") {
      if (!p.pinned) return !1;
    } else if (i !== "all" && p.category !== i)
      return !1;
    if (n && !p.tags.includes(n))
      return !1;
    if (o) {
      const f = p.title.toLowerCase().includes(o), g = p.description?.toLowerCase().includes(o), A = p.content.toLowerCase().includes(o), P = p.tags.some((N) => N.toLowerCase().includes(o));
      if (!f && !g && !A && !P)
        return !1;
    }
    return !0;
  }).sort((p, f) => p.pinned && !f.pinned ? -1 : !p.pinned && f.pinned ? 1 : f.updatedAt - p.updatedAt);
}), Ze = V(() => {
  const o = /* @__PURE__ */ new Set();
  for (const i of a.prompts)
    if (Array.isArray(i.tags))
      for (const n of i.tags)
        n.trim() && o.add(n.trim());
  return Array.from(o);
}), d = tt({
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
function jt() {
  try {
    if (typeof localStorage > "u") return null;
    const o = localStorage.getItem(M), i = localStorage.getItem(E);
    if (!o && !i) return null;
    const n = o ? JSON.parse(o) : [], p = i ? JSON.parse(i) : null;
    return {
      articles: Array.isArray(n) ? n : [],
      categories: Array.isArray(p) && p.length ? p : rt
    };
  } catch {
    return null;
  }
}
function Ae(o, i) {
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
    if (qe) return;
    qe = !0, d.isLoading = !0;
    const o = jt();
    o && (d.articles = o.articles, o.categories?.length && (d.categories = o.categories));
    try {
      if (typeof chrome < "u" && chrome.storage?.local) {
        const i = await chrome.storage.local.get([M, E, re]);
        ve = Se(i?.[re]), i?.[M] && Array.isArray(i[M]) && (d.articles = i[M]), i?.[E] && Array.isArray(i[E]) && (d.categories = i[E]), chrome.storage?.onChanged?.addListener && chrome.storage.onChanged.addListener((n, p) => {
          if (p === "local") {
            if (n[re])
              try {
                ve = Se(n[re].newValue);
              } catch {
              }
            n[M] && Array.isArray(n[M].newValue) && (d.articles = n[M].newValue), n[E] && Array.isArray(n[E].newValue) && (d.categories = n[E].newValue);
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
          return ve = await ot(chrome.storage.local, navigator.locks, re, ve, {
            [M]: o,
            [E]: i
          }), Ae(o, i), d.statusMessage = "", !0;
        } catch (p) {
          return d.statusMessage = p instanceof nt ? "文章已在其他页面更改，当前修改未保存。请先导出本页内容，再刷新并核对。" : "文章保存失败，当前修改未保存。请先导出本页内容，再检查存储。", console.warn("[ArticleService] save failed", p), !1;
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
}, Xe = V(() => {
  const o = d.activeCategoryId, i = d.selectedTag;
  return d.articles.filter((n) => {
    if (o === "starred") {
      if (!n.pinned) return !1;
    } else if (o !== "all" && n.category !== o)
      return !1;
    return !(i && !n.tags.includes(i));
  }).sort((n, p) => n.pinned && !p.pinned ? -1 : !n.pinned && p.pinned ? 1 : p.updatedAt - n.updatedAt);
}), et = V(() => {
  const o = /* @__PURE__ */ new Set();
  for (const i of d.articles)
    if (Array.isArray(i.tags))
      for (const n of i.tags)
        n.trim() && o.add(n.trim());
  return Array.from(o);
}), Ut = {
  class: "bp-seg-tabs",
  role: "tablist",
  "aria-label": "资料库频道"
}, Jt = ["aria-selected"], Kt = ["aria-selected"], zt = ["aria-selected"], Ht = {
  key: 0,
  class: "bp-search-pill"
}, Qt = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Yt = {
  key: 1,
  class: "bp-icon"
}, Gt = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Zt = {
  key: 1,
  class: "bp-icon"
}, qt = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.6",
  "stroke-linecap": "round",
  "aria-hidden": "true"
}, Wt = {
  key: 1,
  class: "bp-icon"
}, Xt = {
  key: 0,
  class: "bp-search-pill"
}, es = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, ts = {
  key: 1,
  class: "bp-icon"
}, ss = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, os = {
  key: 1,
  class: "bp-icon"
}, ns = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.6",
  "stroke-linecap": "round",
  "aria-hidden": "true"
}, is = {
  key: 1,
  class: "bp-icon"
}, rs = {
  key: 0,
  class: "bp-alert-tip-bar"
}, ls = {
  key: 1,
  class: "bp-alert-tip-bar",
  role: "alert"
}, as = {
  key: 2,
  class: "bp-alert-tip-bar",
  role: "alert"
}, ds = { class: "bp-work-area" }, cs = {
  key: 0,
  class: "bp-bili-sidebar"
}, us = { class: "bp-sidebar-toggle-action" }, ps = { class: "bp-sidebar-toggle-chevron" }, bs = { class: "bp-channels-list" }, gs = ["onClick"], vs = { class: "bp-channel-main" }, fs = { class: "bp-channel-icon" }, ys = { class: "bp-channel-text" }, ms = { class: "bp-channel-badge" }, ks = { class: "bp-sidebar-favorite-hub" }, hs = { class: "bp-hub-main" }, Cs = {
  key: 0,
  class: "bp-hub-icon"
}, ws = { class: "bp-hub-text" }, _s = { key: 0 }, As = {
  key: 0,
  class: "bp-add-category-box"
}, Ss = { class: "bp-folder-list" }, $s = {
  key: 0,
  class: "bp-folder-inline-edit"
}, xs = ["onKeydown"], Is = ["onClick"], Ts = ["onClick"], Bs = {
  key: 0,
  class: "bp-folder-icon"
}, Ms = ["title"], Es = {
  key: 1,
  class: "bp-folder-badge"
}, Vs = {
  key: 2,
  class: "bp-folder-badge"
}, Ps = {
  key: 3,
  class: "bp-folder-badge"
}, Ns = {
  key: 2,
  class: "bp-folder-actions"
}, Ds = ["onClick"], Ls = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Rs = ["onClick"], Os = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Fs = {
  key: 1,
  class: "bp-tags-container"
}, js = { class: "bp-tags-cloud" }, Us = ["onClick"], Js = { class: "bp-sidebar-favorite-hub bp-hub-article" }, Ks = { class: "bp-hub-main" }, zs = {
  key: 0,
  class: "bp-hub-icon"
}, Hs = { class: "bp-hub-text" }, Qs = { key: 0 }, Ys = {
  key: 0,
  class: "bp-add-category-box"
}, Gs = { class: "bp-folder-list" }, Zs = {
  key: 0,
  class: "bp-folder-inline-edit"
}, qs = ["onKeydown"], Ws = ["onClick"], Xs = ["onClick"], eo = {
  key: 0,
  class: "bp-folder-icon"
}, to = ["title"], so = {
  key: 1,
  class: "bp-folder-badge"
}, oo = {
  key: 2,
  class: "bp-folder-badge"
}, no = {
  key: 3,
  class: "bp-folder-badge"
}, io = {
  key: 2,
  class: "bp-folder-actions"
}, ro = ["onClick"], lo = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, ao = ["onClick"], co = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, uo = {
  key: 1,
  class: "bp-tags-container"
}, po = { class: "bp-tags-cloud" }, bo = ["onClick"], go = {
  key: 1,
  class: "bp-content-pane"
}, vo = { class: "bp-pane-header" }, fo = { class: "bp-result-stats" }, yo = {
  key: 0,
  class: "bp-active-filter-badge"
}, mo = {
  key: 0,
  class: "bp-empty-state"
}, ko = {
  key: 0,
  class: "bp-empty-svg",
  "aria-hidden": "true"
}, ho = {
  key: 1,
  class: "bp-empty-icon"
}, Co = { class: "bp-empty-title" }, wo = {
  key: 2,
  class: "bp-empty-desc"
}, _o = {
  key: 3,
  class: "bp-empty-desc"
}, Ao = {
  key: 1,
  class: "bp-card-grid"
}, So = ["onClick"], $o = { class: "bp-compact-head" }, xo = ["title"], Io = ["onClick"], To = ["title", "onClick"], Bo = {
  key: 0,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Mo = {
  key: 1,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Eo = ["onClick"], Vo = ["onClick"], Po = ["title"], No = { class: "bp-compact-chips" }, Do = ["title", "onClick"], Lo = ["onClick"], Ro = ["title", "onClick"], Oo = { class: "bp-compact-meta" }, Fo = { class: "bp-compact-meta-left" }, jo = { class: "bp-compact-kind" }, Uo = ["title", "onClick"], Jo = { key: 0 }, Ko = { class: "bp-compact-meta-right" }, zo = {
  key: 0,
  class: "bp-copied-tip"
}, Ho = {
  key: 1,
  class: "bp-compact-date"
}, Qo = { class: "bp-card-header" }, Yo = { class: "bp-card-title-group" }, Go = ["title", "onClick"], Zo = ["title"], qo = { class: "bp-card-actions" }, Wo = ["onClick"], Xo = ["onClick"], en = {
  key: 0,
  class: "bp-card-desc"
}, tn = ["title"], sn = {
  key: 1,
  class: "bp-card-vars"
}, on = ["title", "onClick"], nn = { class: "bp-card-footer" }, rn = { class: "bp-card-tags" }, ln = ["onClick"], an = { class: "bp-card-button-row" }, dn = {
  key: 0,
  class: "bp-copied-tip"
}, cn = ["onClick"], un = ["onClick"], pn = {
  key: 2,
  class: "bp-content-pane"
}, bn = { class: "bp-pane-header" }, gn = { class: "bp-result-stats" }, vn = {
  key: 0,
  class: "bp-active-filter-badge bp-badge-indigo"
}, fn = {
  key: 0,
  class: "bp-empty-state"
}, yn = {
  key: 0,
  class: "bp-empty-svg",
  "aria-hidden": "true"
}, mn = {
  key: 1,
  class: "bp-empty-icon"
}, kn = { class: "bp-empty-title" }, hn = { class: "bp-empty-desc" }, Cn = {
  key: 1,
  class: "bp-card-grid"
}, wn = { class: "bp-card-header" }, _n = { class: "bp-card-title-group" }, An = ["title", "onClick"], Sn = ["title"], $n = { class: "bp-card-actions" }, xn = ["href"], In = ["onClick"], Tn = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Bn = ["onClick"], Mn = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, En = {
  key: 0,
  class: "bp-article-meta-line"
}, Vn = {
  key: 0,
  class: "bp-article-source"
}, Pn = { class: "bp-article-date" }, Nn = {
  key: 1,
  class: "bp-card-desc"
}, Dn = { class: "bp-card-preview bp-article-preview" }, Ln = { class: "bp-card-footer" }, Rn = { class: "bp-card-tags" }, On = ["onClick"], Fn = { class: "bp-card-button-row" }, jn = {
  key: 0,
  class: "bp-copied-tip"
}, Un = ["onClick"], Jn = ["onClick"], Kn = {
  key: 3,
  class: "bp-content-pane bp-stickers-wrapper"
}, zn = {
  key: 0,
  class: "bp-side-drawer"
}, Hn = { class: "bp-drawer-header" }, Qn = { class: "bp-drawer-title" }, Yn = { class: "bp-drawer-body" }, Gn = { class: "bp-form-group" }, Zn = { class: "bp-form-row" }, qn = { class: "bp-form-group flex-1" }, Wn = ["value"], Xn = { class: "bp-form-group bp-form-checkbox-group" }, ei = { class: "bp-checkbox-label" }, ti = { class: "bp-form-group" }, si = { class: "bp-form-group flex-fill" }, oi = {
  key: 0,
  class: "bp-detected-vars"
}, ni = { class: "bp-form-group" }, ii = { class: "bp-drawer-footer" }, ri = {
  key: 0,
  class: "bp-side-drawer"
}, li = { class: "bp-drawer-header" }, ai = { class: "bp-drawer-title" }, di = { class: "bp-drawer-body" }, ci = { class: "bp-drawer-desc" }, ui = { class: "bp-vars-form" }, pi = { class: "bp-form-label" }, bi = ["onUpdate:modelValue", "placeholder"], gi = { class: "bp-preview-box" }, vi = { class: "bp-preview-text" }, fi = { class: "bp-drawer-footer" }, yi = {
  key: 0,
  class: "bp-side-drawer bp-drawer-article"
}, mi = { class: "bp-drawer-header" }, ki = { class: "bp-drawer-title" }, hi = { class: "bp-drawer-body" }, Ci = { class: "bp-form-group" }, wi = { class: "bp-form-row" }, _i = { class: "bp-form-group flex-1" }, Ai = ["value"], Si = { class: "bp-form-group bp-form-checkbox-group" }, $i = { class: "bp-checkbox-label" }, xi = { class: "bp-form-row" }, Ii = { class: "bp-form-group flex-1" }, Ti = { class: "bp-form-group flex-1" }, Bi = { class: "bp-form-group" }, Mi = { class: "bp-form-group flex-fill" }, Ei = { class: "bp-form-group" }, Vi = { class: "bp-drawer-footer" }, Pi = {
  key: 0,
  class: "bp-side-drawer bp-reader-drawer"
}, Ni = { class: "bp-drawer-header" }, Di = { class: "bp-reader-head-info" }, Li = { class: "bp-badge-pill" }, Ri = {
  key: 0,
  class: "bp-reader-source"
}, Oi = { class: "bp-drawer-body bp-reader-body" }, Fi = { class: "bp-reader-title" }, ji = { class: "bp-reader-meta" }, Ui = { key: 0 }, Ji = { key: 1 }, Ki = ["href"], zi = {
  key: 0,
  class: "bp-reader-quote"
}, Hi = { class: "bp-reader-text" }, Qi = { class: "bp-drawer-footer" }, Yi = /* @__PURE__ */ xt({
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
    ], n = k("prompts"), p = k(!1), f = k(!1), g = k(""), A = k(null), P = k(""), N = k(!1), le = k(""), F = k(null), j = k(""), $e = k(null), xe = k(null), U = k(""), J = k(""), D = k(""), Y = k(""), G = k("default"), Z = k(""), q = k(!1), K = k(""), z = k(""), W = k(""), X = k(""), ee = k(""), te = k("default"), se = k(""), oe = k(!1);
    It(() => {
      _.init(), x.init();
    });
    function lt() {
      p.value = !p.value;
    }
    function ae(u) {
      n.value = u, a.isEditing = !1, a.isVariableDialogOpen = !1, d.isEditing = !1, d.isReading = !1;
    }
    function Ie(u) {
      a.activeCategoryId = u;
    }
    function ye(u) {
      a.selectedTag = a.selectedTag === u ? null : u;
    }
    function at(u) {
      d.activeCategoryId = u;
    }
    function Te(u) {
      d.selectedTag = d.selectedTag === u ? null : u;
    }
    function Be(u) {
      _.copyPromptText(u);
    }
    function de(u) {
      a.isEditing = !1, _.openVariableDialog(u);
    }
    function dt() {
      if (!a.variableTargetPrompt) return;
      const u = Qe(
        a.variableTargetPrompt.content,
        a.variableFormValues
      );
      _.copyPromptText(a.variableTargetPrompt, u), _.closeVariableDialog();
    }
    const ct = V(() => a.variableTargetPrompt ? Qe(
      a.variableTargetPrompt.content,
      a.variableFormValues
    ) : ""), Me = V(() => B(D.value));
    function Ee() {
      a.isVariableDialogOpen = !1, J.value = "", D.value = "", Y.value = "", G.value = a.activeCategoryId === "all" || a.activeCategoryId === "starred" ? Le.value[0]?.id || "default" : a.activeCategoryId, Z.value = "", q.value = !1, _.openEditor();
    }
    function me(u) {
      a.isVariableDialogOpen = !1, J.value = u.title, D.value = u.content, Y.value = u.description || "", G.value = u.category, Z.value = u.tags.join(", "), q.value = !!u.pinned, _.openEditor(u);
    }
    function ut() {
      if (!J.value.trim() && !D.value.trim()) return;
      const u = Z.value.split(/[,，\s]+/).map((t) => t.trim()).filter(Boolean);
      _.saveEditorData({
        title: J.value.trim() || "未命名提示词",
        content: D.value,
        description: Y.value.trim(),
        category: G.value || "default",
        tags: u,
        pinned: q.value
      });
    }
    function Ve(u) {
      typeof window < "u" && !window.confirm("确定要删除这条提示词吗？") || _.deletePrompt(u);
    }
    function Pe(u) {
      _.togglePin(u);
    }
    function Ne() {
      const u = g.value.trim();
      u && _.addCategory(u) && (g.value = "", f.value = !1);
    }
    function pt(u) {
      A.value = u.id, P.value = u.name;
    }
    function De(u) {
      P.value.trim() && _.renameCategory(u, P.value.trim()), A.value = null, P.value = "";
    }
    function bt(u) {
      typeof window < "u" && !window.confirm(`确定删除分组「${u.name}」吗？组内提示词将归入默认分组。`) || _.deleteCategory(u.id);
    }
    const Le = V(() => a.categories.filter((u) => u.id !== "all" && u.id !== "starred"));
    function Re() {
      d.isReading = !1, K.value = "", z.value = "", W.value = "", X.value = "", ee.value = "", te.value = d.activeCategoryId === "all" || d.activeCategoryId === "starred" ? Ue.value[0]?.id || "default" : d.activeCategoryId, se.value = "", oe.value = !1, x.openEditor();
    }
    function gt(u) {
      d.isReading = !1, K.value = u.title, z.value = u.content, W.value = u.url || "", X.value = u.sourceName || "", ee.value = u.description || "", te.value = u.category, se.value = u.tags.join(", "), oe.value = !!u.pinned, x.openEditor(u);
    }
    function vt(u) {
      x.openReader(u);
    }
    function ft(u) {
      const t = String(u || "").trim();
      return t.length <= 600 ? t : `${t.slice(0, 600)}
…`;
    }
    function yt() {
      if (!K.value.trim() && !z.value.trim()) return;
      const u = se.value.split(/[,，\s]+/).map((t) => t.trim()).filter(Boolean);
      x.saveEditorData({
        title: K.value.trim() || "未命名文章",
        content: z.value,
        url: W.value.trim(),
        sourceName: X.value.trim(),
        description: ee.value.trim(),
        category: te.value || "default",
        tags: u,
        pinned: oe.value
      });
    }
    function mt(u) {
      typeof window < "u" && !window.confirm("确定要删除这篇保存的文章吗？") || x.deleteArticle(u);
    }
    function kt(u) {
      x.togglePin(u);
    }
    function Oe(u) {
      x.copyArticleText(u);
    }
    function Fe() {
      const u = le.value.trim();
      u && x.addCategory(u) && (le.value = "", N.value = !1);
    }
    function ht(u) {
      F.value = u.id, j.value = u.name;
    }
    function je(u) {
      j.value.trim() && x.renameCategory(u, j.value.trim()), F.value = null, j.value = "";
    }
    function Ct(u) {
      typeof window < "u" && !window.confirm(`确定删除分组「${u.name}」吗？组内文章将归入默认分组。`) || x.deleteCategory(u.id);
    }
    const Ue = V(() => d.categories.filter((u) => u.id !== "all" && u.id !== "starred"));
    function wt() {
      $e.value?.click();
    }
    function _t() {
      xe.value?.click();
    }
    function At(u) {
      const t = u.target, s = t.files?.[0];
      if (!s) return;
      const b = new FileReader();
      b.onload = (T) => {
        const ie = T.target?.result;
        if (ie) {
          const L = _.importBackup(ie);
          U.value = L.success ? `成功导入 ${L.count} 条提示词！` : L.error || "导入失败", setTimeout(() => {
            U.value = "";
          }, 3500);
        }
        t.value = "";
      }, b.readAsText(s);
    }
    function St(u) {
      const t = u.target, s = t.files?.[0];
      if (!s) return;
      const b = new FileReader();
      b.onload = (T) => {
        const ie = T.target?.result;
        if (ie) {
          const L = x.importBackup(ie);
          U.value = L.success ? `成功导入 ${L.count} 篇文章！` : L.error || "导入失败", setTimeout(() => {
            U.value = "";
          }, 3500);
        }
        t.value = "";
      }, b.readAsText(s);
    }
    function ce(u) {
      if (!u) return "";
      const t = new Date(u);
      return `${t.getMonth() + 1}/${t.getDate()}`;
    }
    function $t(u) {
      if (!u) return "";
      const t = new Date(u), s = (b) => String(b).padStart(2, "0");
      return `${t.getFullYear()}-${s(t.getMonth() + 1)}-${s(t.getDate())}`;
    }
    function Je(u) {
      return a.categories.find((t) => t.id === u)?.name || "默认分组";
    }
    const ne = k(""), ke = V(() => {
      const u = ne.value.trim().toLowerCase();
      return u ? Xe.value.filter(
        (t) => t.title.toLowerCase().includes(u) || t.description?.toLowerCase().includes(u) || t.sourceName?.toLowerCase().includes(u) || t.content.toLowerCase().includes(u) || t.tags.some((s) => s.toLowerCase().includes(u))
      ) : Xe.value;
    });
    return (u, t) => (r(), Tt(Ot, null, Bt({
      "header-actions": R(() => [
        e("div", {
          class: C(["bp-top-actions", { "bp-integrated": o.embedded }])
        }, [
          n.value === "prompts" ? (r(), l(m, { key: 0 }, [
            o.embedded ? (r(), l("label", Ht, [
              t[52] || (t[52] = e("svg", {
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
                "onUpdate:modelValue": t[3] || (t[3] = (s) => c(a).searchQuery = s),
                type: "search",
                placeholder: "搜索提示词…",
                "aria-label": "搜索提示词"
              }, null, 512), [
                [S, c(a).searchQuery]
              ])
            ])) : y("", !0),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "导出备份",
              onClick: t[4] || (t[4] = (s) => c(_).exportBackup())
            }, [
              o.embedded ? (r(), l("svg", Qt, [...t[53] || (t[53] = [
                e("path", { d: "M8 2.5v7.5M5 7l3 3 3-3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (r(), l("span", Yt, "💾")),
              t[54] || (t[54] = e("span", null, "导出", -1))
            ]),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "从文件导入",
              onClick: wt
            }, [
              o.embedded ? (r(), l("svg", Gt, [...t[55] || (t[55] = [
                e("path", { d: "M8 10V2.5M5 5.5l3-3 3 3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (r(), l("span", Zt, "📥")),
              t[56] || (t[56] = e("span", null, "导入", -1))
            ]),
            e("button", {
              type: "button",
              class: C(["bp-btn bp-btn-primary", { active: c(a).isEditing }]),
              title: "新建提示词",
              onClick: Ee
            }, [
              o.embedded ? (r(), l("svg", qt, [...t[57] || (t[57] = [
                e("path", { d: "M8 3v10M3 8h10" }, null, -1)
              ])])) : (r(), l("span", Wt, "➕")),
              e("span", null, v(o.embedded ? "新建" : "新建提示词"), 1)
            ], 2),
            e("input", {
              ref_key: "promptFileInputRef",
              ref: $e,
              type: "file",
              accept: ".json",
              style: { display: "none" },
              onChange: At
            }, null, 544)
          ], 64)) : n.value === "articles" ? (r(), l(m, { key: 1 }, [
            o.embedded ? (r(), l("label", Xt, [
              t[58] || (t[58] = e("svg", {
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
                "onUpdate:modelValue": t[5] || (t[5] = (s) => ne.value = s),
                type: "search",
                placeholder: "搜索文章…",
                "aria-label": "搜索文章"
              }, null, 512), [
                [S, ne.value]
              ])
            ])) : y("", !0),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "导出文章备份",
              onClick: t[6] || (t[6] = (s) => c(x).exportBackup())
            }, [
              o.embedded ? (r(), l("svg", es, [...t[59] || (t[59] = [
                e("path", { d: "M8 2.5v7.5M5 7l3 3 3-3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (r(), l("span", ts, "💾")),
              t[60] || (t[60] = e("span", null, "导出", -1))
            ]),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "从文件导入文章",
              onClick: _t
            }, [
              o.embedded ? (r(), l("svg", ss, [...t[61] || (t[61] = [
                e("path", { d: "M8 10V2.5M5 5.5l3-3 3 3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (r(), l("span", os, "📥")),
              t[62] || (t[62] = e("span", null, "导入", -1))
            ]),
            e("button", {
              type: "button",
              class: C(["bp-btn bp-btn-primary bp-btn-article-pri", { active: c(d).isEditing }]),
              title: "保存新文章",
              onClick: Re
            }, [
              o.embedded ? (r(), l("svg", ns, [...t[63] || (t[63] = [
                e("path", { d: "M8 3v10M3 8h10" }, null, -1)
              ])])) : (r(), l("span", is, "➕")),
              e("span", null, v(o.embedded ? "新建" : "新建文章"), 1)
            ], 2),
            e("input", {
              ref_key: "articleFileInputRef",
              ref: xe,
              type: "file",
              accept: ".json",
              style: { display: "none" },
              onChange: St
            }, null, 544)
          ], 64)) : y("", !0)
        ], 2)
      ]),
      default: R(() => [
        e("div", {
          class: C(["bp-container", { "bp-integrated": o.embedded }])
        }, [
          U.value ? (r(), l("div", rs, v(U.value), 1)) : y("", !0),
          c(a).statusMessage ? (r(), l("div", ls, v(c(a).statusMessage), 1)) : y("", !0),
          c(d).statusMessage ? (r(), l("div", as, v(c(d).statusMessage), 1)) : y("", !0),
          e("div", ds, [
            !o.embedded || n.value !== "stickers" ? (r(), l("aside", cs, [
              o.embedded ? y("", !0) : (r(), l(m, { key: 0 }, [
                e("div", {
                  class: C(["bp-sidebar-toggle-bar", { "is-collapsed": p.value }]),
                  onClick: lt
                }, [
                  t[64] || (t[64] = e("div", { class: "bp-sidebar-toggle-title" }, [
                    e("span", { class: "bp-sidebar-toggle-icon" }, "⚡"),
                    e("strong", null, "快捷频道")
                  ], -1)),
                  e("div", us, [
                    e("span", null, v(p.value ? "展开" : "收起"), 1),
                    e("span", ps, v(p.value ? "▾" : "▴"), 1)
                  ])
                ], 2),
                w(e("div", bs, [
                  (r(), l(m, null, I(i, (s) => e("div", {
                    key: s.id,
                    class: C(["bp-channel-wrap", s.themeClass])
                  }, [
                    e("button", {
                      type: "button",
                      class: C(["bp-channel-btn", { on: n.value === s.id }]),
                      onClick: (b) => ae(s.id)
                    }, [
                      e("div", vs, [
                        e("span", fs, v(s.icon), 1),
                        e("div", ys, [
                          e("strong", null, v(s.title), 1),
                          e("small", null, v(s.subTitle), 1)
                        ])
                      ]),
                      e("span", ms, v(s.badge), 1)
                    ], 10, gs)
                  ], 2)), 64))
                ], 512), [
                  [Mt, !p.value]
                ])
              ], 64)),
              n.value === "prompts" ? (r(), l(m, { key: 1 }, [
                e("div", ks, [
                  e("div", hs, [
                    o.embedded ? y("", !0) : (r(), l("span", Cs, "📁")),
                    e("div", ws, [
                      t[65] || (t[65] = e("strong", null, "提示词分组", -1)),
                      o.embedded ? y("", !0) : (r(), l("small", _s, "按自定义分组整理"))
                    ])
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-hub-add-btn",
                    title: "新增分组",
                    onClick: t[7] || (t[7] = (s) => f.value = !0)
                  }, "+")
                ]),
                f.value ? (r(), l("div", As, [
                  w(e("input", {
                    "onUpdate:modelValue": t[8] || (t[8] = (s) => g.value = s),
                    type: "text",
                    class: "bp-add-cat-input",
                    placeholder: "分组名称...",
                    maxlength: "16",
                    autofocus: "",
                    onKeydown: [
                      t[9] || (t[9] = (s) => c(be)(s, Ne)),
                      t[10] || (t[10] = ue((s) => f.value = !1, ["esc"]))
                    ]
                  }, null, 544), [
                    [S, g.value]
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini primary",
                    onClick: Ne
                  }, "✔"),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini",
                    onClick: t[11] || (t[11] = (s) => f.value = !1)
                  }, "✕")
                ])) : y("", !0),
                e("div", Ss, [
                  (r(!0), l(m, null, I(c(a).categories, (s) => (r(), l("div", {
                    key: s.id,
                    class: C(["bp-folder-row", { active: c(a).activeCategoryId === s.id }])
                  }, [
                    A.value === s.id ? (r(), l("div", $s, [
                      w(e("input", {
                        "onUpdate:modelValue": t[12] || (t[12] = (b) => P.value = b),
                        type: "text",
                        class: "bp-folder-rename-input",
                        maxlength: "16",
                        autofocus: "",
                        onKeydown: [
                          (b) => c(be)(b, () => De(s.id)),
                          t[13] || (t[13] = ue((b) => A.value = null, ["esc"]))
                        ]
                      }, null, 40, xs), [
                        [S, P.value]
                      ]),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini primary",
                        onClick: (b) => De(s.id)
                      }, "✔", 8, Is),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini",
                        onClick: t[14] || (t[14] = (b) => A.value = null)
                      }, "✕")
                    ])) : (r(), l("button", {
                      key: 1,
                      type: "button",
                      class: "bp-folder-btn",
                      onClick: (b) => Ie(s.id)
                    }, [
                      o.embedded ? y("", !0) : (r(), l("span", Bs, v(s.icon || "📁"), 1)),
                      e("span", {
                        class: "bp-folder-name",
                        title: s.name
                      }, v(s.name), 9, Ms),
                      s.id === "all" ? (r(), l("span", Es, v(c(a).prompts.length), 1)) : s.id === "starred" ? (r(), l("span", Vs, v(c(a).prompts.filter((b) => b.pinned).length), 1)) : (r(), l("span", Ps, v(c(a).prompts.filter((b) => b.category === s.id).length), 1))
                    ], 8, Ts)),
                    !s.isBuiltin && A.value !== s.id ? (r(), l("div", Ns, [
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn",
                        title: "重命名",
                        onClick: h((b) => pt(s), ["stop"])
                      }, [
                        o.embedded ? (r(), l("svg", Ls, [...t[66] || (t[66] = [
                          e("path", { d: "M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" }, null, -1)
                        ])])) : (r(), l(m, { key: 1 }, [
                          $("✏️")
                        ], 64))
                      ], 8, Ds),
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn danger",
                        title: "删除",
                        onClick: h((b) => bt(s), ["stop"])
                      }, [
                        o.embedded ? (r(), l("svg", Os, [...t[67] || (t[67] = [
                          e("path", { d: "M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5" }, null, -1)
                        ])])) : (r(), l(m, { key: 1 }, [
                          $("🗑️")
                        ], 64))
                      ], 8, Rs)
                    ])) : y("", !0)
                  ], 2))), 128))
                ]),
                !o.embedded && c(Ze).length > 0 ? (r(), l("div", Fs, [
                  t[68] || (t[68] = e("div", { class: "bp-tags-title" }, "常用标签", -1)),
                  e("div", js, [
                    (r(!0), l(m, null, I(c(Ze), (s) => (r(), l("span", {
                      key: s,
                      class: C(["bp-tag-pill", { active: c(a).selectedTag === s }]),
                      onClick: (b) => ye(s)
                    }, " #" + v(s), 11, Us))), 128))
                  ])
                ])) : y("", !0)
              ], 64)) : n.value === "articles" ? (r(), l(m, { key: 2 }, [
                e("div", Js, [
                  e("div", Ks, [
                    o.embedded ? y("", !0) : (r(), l("span", zs, "📚")),
                    e("div", Hs, [
                      t[69] || (t[69] = e("strong", null, "文章分组", -1)),
                      o.embedded ? y("", !0) : (r(), l("small", Qs, "文章多级分类整理"))
                    ])
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-hub-add-btn bp-btn-indigo",
                    title: "新增文章分组",
                    onClick: t[15] || (t[15] = (s) => N.value = !0)
                  }, "+")
                ]),
                N.value ? (r(), l("div", Ys, [
                  w(e("input", {
                    "onUpdate:modelValue": t[16] || (t[16] = (s) => le.value = s),
                    type: "text",
                    class: "bp-add-cat-input bp-border-indigo",
                    placeholder: "分组名称...",
                    maxlength: "16",
                    autofocus: "",
                    onKeydown: [
                      t[17] || (t[17] = (s) => c(be)(s, Fe)),
                      t[18] || (t[18] = ue((s) => N.value = !1, ["esc"]))
                    ]
                  }, null, 544), [
                    [S, le.value]
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini primary bp-bg-indigo",
                    onClick: Fe
                  }, "✔"),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini",
                    onClick: t[19] || (t[19] = (s) => N.value = !1)
                  }, "✕")
                ])) : y("", !0),
                e("div", Gs, [
                  (r(!0), l(m, null, I(c(d).categories, (s) => (r(), l("div", {
                    key: s.id,
                    class: C(["bp-folder-row bp-row-indigo", { active: c(d).activeCategoryId === s.id }])
                  }, [
                    F.value === s.id ? (r(), l("div", Zs, [
                      w(e("input", {
                        "onUpdate:modelValue": t[20] || (t[20] = (b) => j.value = b),
                        type: "text",
                        class: "bp-folder-rename-input",
                        maxlength: "16",
                        autofocus: "",
                        onKeydown: [
                          (b) => c(be)(b, () => je(s.id)),
                          t[21] || (t[21] = ue((b) => F.value = null, ["esc"]))
                        ]
                      }, null, 40, qs), [
                        [S, j.value]
                      ]),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini primary bp-bg-indigo",
                        onClick: (b) => je(s.id)
                      }, "✔", 8, Ws),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini",
                        onClick: t[22] || (t[22] = (b) => F.value = null)
                      }, "✕")
                    ])) : (r(), l("button", {
                      key: 1,
                      type: "button",
                      class: "bp-folder-btn",
                      onClick: (b) => at(s.id)
                    }, [
                      o.embedded ? y("", !0) : (r(), l("span", eo, v(s.icon || "📑"), 1)),
                      e("span", {
                        class: "bp-folder-name",
                        title: s.name
                      }, v(s.name), 9, to),
                      s.id === "all" ? (r(), l("span", so, v(c(d).articles.length), 1)) : s.id === "starred" ? (r(), l("span", oo, v(c(d).articles.filter((b) => b.pinned).length), 1)) : (r(), l("span", no, v(c(d).articles.filter((b) => b.category === s.id).length), 1))
                    ], 8, Xs)),
                    !s.isBuiltin && F.value !== s.id ? (r(), l("div", io, [
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn",
                        title: "重命名",
                        onClick: h((b) => ht(s), ["stop"])
                      }, [
                        o.embedded ? (r(), l("svg", lo, [...t[70] || (t[70] = [
                          e("path", { d: "M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" }, null, -1)
                        ])])) : (r(), l(m, { key: 1 }, [
                          $("✏️")
                        ], 64))
                      ], 8, ro),
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn danger",
                        title: "删除",
                        onClick: h((b) => Ct(s), ["stop"])
                      }, [
                        o.embedded ? (r(), l("svg", co, [...t[71] || (t[71] = [
                          e("path", { d: "M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5" }, null, -1)
                        ])])) : (r(), l(m, { key: 1 }, [
                          $("🗑️")
                        ], 64))
                      ], 8, ao)
                    ])) : y("", !0)
                  ], 2))), 128))
                ]),
                !o.embedded && c(et).length > 0 ? (r(), l("div", uo, [
                  t[72] || (t[72] = e("div", { class: "bp-tags-title" }, "文章标签", -1)),
                  e("div", po, [
                    (r(!0), l(m, null, I(c(et), (s) => (r(), l("span", {
                      key: s,
                      class: C(["bp-tag-pill bp-tag-indigo", { active: c(d).selectedTag === s }]),
                      onClick: (b) => Te(s)
                    }, " #" + v(s), 11, bo))), 128))
                  ])
                ])) : y("", !0)
              ], 64)) : y("", !0)
            ])) : y("", !0),
            n.value === "prompts" ? (r(), l("main", go, [
              e("div", vo, [
                e("div", fo, [
                  e("span", null, [
                    t[73] || (t[73] = $("共 ", -1)),
                    e("strong", null, v(c(_e).length), 1),
                    t[74] || (t[74] = $(" 条提示词", -1))
                  ]),
                  c(a).selectedTag ? (r(), l("span", yo, [
                    $(" 标签: #" + v(c(a).selectedTag) + " ", 1),
                    e("button", {
                      type: "button",
                      class: "bp-tag-close",
                      onClick: t[23] || (t[23] = (s) => c(a).selectedTag = null)
                    }, "✕")
                  ])) : y("", !0)
                ])
              ]),
              c(_e).length === 0 ? (r(), l("div", mo, [
                o.embedded ? (r(), l("div", ko, [...t[75] || (t[75] = [
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
                ])])) : (r(), l("div", ho, "🎒")),
                e("h3", Co, v(c(a).searchQuery.trim() || c(a).selectedTag ? "没有匹配的提示词" : "暂无提示词"), 1),
                c(a).searchQuery.trim() || c(a).selectedTag ? (r(), l("p", wo, "试试更换搜索词或清除标签筛选。")) : (r(), l("p", _o, [...t[76] || (t[76] = [
                  $("把常用的系统提示、模板指令和 ", -1),
                  e("code", null, "{{变量}}", -1),
                  $(" 存在这里，随时一键调用。", -1)
                ])])),
                e("button", {
                  type: "button",
                  class: "bp-btn bp-btn-primary",
                  onClick: Ee
                }, "新建提示词")
              ])) : (r(), l("div", Ao, [
                (r(!0), l(m, null, I(c(_e), (s) => (r(), l("article", {
                  key: s.id,
                  class: C(["bp-card", {
                    "bp-compact-card": o.embedded,
                    "is-pinned": s.pinned,
                    "is-selected": c(a).editingPrompt?.id === s.id
                  }]),
                  onClick: (b) => o.embedded && me(s)
                }, [
                  o.embedded ? (r(), l(m, { key: 0 }, [
                    e("div", $o, [
                      e("h4", {
                        class: "bp-compact-title",
                        title: s.title
                      }, v(s.title), 9, xo),
                      e("div", {
                        class: "bp-compact-actions",
                        onClick: t[24] || (t[24] = h(() => {
                        }, ["stop"]))
                      }, [
                        c(B)(s.content).length > 0 ? (r(), l("button", {
                          key: 0,
                          type: "button",
                          class: "bp-compact-icon-btn accent",
                          title: "填充变量并使用",
                          onClick: h((b) => de(s), ["stop"])
                        }, [...t[77] || (t[77] = [
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
                        ])], 8, Io)) : y("", !0),
                        e("button", {
                          type: "button",
                          class: C(["bp-compact-icon-btn", { success: c(a).copySuccessId === s.id }]),
                          title: c(a).copySuccessId === s.id ? "已复制" : "复制提示词",
                          onClick: h((b) => Be(s), ["stop"])
                        }, [
                          c(a).copySuccessId === s.id ? (r(), l("svg", Bo, [...t[78] || (t[78] = [
                            e("path", { d: "M3.5 8.5l3 3 6-6.5" }, null, -1)
                          ])])) : (r(), l("svg", Mo, [...t[79] || (t[79] = [
                            e("rect", {
                              x: "5.5",
                              y: "5.5",
                              width: "7.5",
                              height: "8.5",
                              rx: "1.4"
                            }, null, -1),
                            e("path", { d: "M10.5 5.5V3.6A1.4 1.4 0 0 0 9.1 2.2H4.2a1.4 1.4 0 0 0-1.4 1.4v6.7a1.4 1.4 0 0 0 1.4 1.4h1.3" }, null, -1)
                          ])]))
                        ], 10, To),
                        e("button", {
                          type: "button",
                          class: "bp-compact-icon-btn",
                          title: "编辑提示词",
                          onClick: h((b) => me(s), ["stop"])
                        }, [...t[80] || (t[80] = [
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
                        ])], 8, Eo),
                        e("button", {
                          type: "button",
                          class: "bp-compact-icon-btn danger",
                          title: "删除提示词",
                          onClick: h((b) => Ve(s.id), ["stop"])
                        }, [...t[81] || (t[81] = [
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
                        ])], 8, Vo)
                      ])
                    ]),
                    e("p", {
                      class: "bp-compact-desc",
                      title: s.description || s.content
                    }, v(s.description || s.content || "暂无内容描述"), 9, Po),
                    e("div", No, [
                      e("button", {
                        type: "button",
                        class: "bp-compact-folder-chip",
                        title: `查看分组「${Je(s.category)}」`,
                        onClick: h((b) => Ie(s.category || "default"), ["stop"])
                      }, [
                        t[82] || (t[82] = e("svg", {
                          viewBox: "0 0 16 16",
                          fill: "currentColor",
                          "aria-hidden": "true"
                        }, [
                          e("path", { d: "M2 4.2A1.7 1.7 0 0 1 3.7 2.5h2.5l1.3 1.4h4.8A1.7 1.7 0 0 1 14 5.6v6.2a1.7 1.7 0 0 1-1.7 1.7H3.7A1.7 1.7 0 0 1 2 11.8V4.2Z" })
                        ], -1)),
                        e("span", null, v(Je(s.category)), 1)
                      ], 8, Do),
                      (r(!0), l(m, null, I(s.tags, (b) => (r(), l("span", {
                        key: b,
                        class: "bp-compact-tag-chip",
                        onClick: h((T) => ye(b), ["stop"])
                      }, "#" + v(b), 9, Lo))), 128)),
                      (r(!0), l(m, null, I(c(B)(s.content), (b) => (r(), l("span", {
                        key: b,
                        class: "bp-compact-var-chip",
                        title: `点击填充变量 ${b}`,
                        onClick: h((T) => de(s), ["stop"])
                      }, "{{" + v(b) + "}}", 9, Ro))), 128))
                    ]),
                    e("div", Oo, [
                      e("div", Fo, [
                        e("span", jo, [
                          e("i", {
                            class: C(["bp-compact-dot", { hasVars: c(B)(s.content).length > 0 }])
                          }, null, 2),
                          e("span", null, v(c(B)(s.content).length > 0 ? `${c(B)(s.content).length} 变量` : "Prompt"), 1)
                        ]),
                        e("button", {
                          type: "button",
                          class: C(["bp-compact-star", { active: s.pinned }]),
                          title: s.pinned ? "取消置顶" : "星标置顶",
                          onClick: h((b) => Pe(s.id), ["stop"])
                        }, [
                          e("span", null, v(s.pinned ? "★" : "☆"), 1),
                          s.useCount ? (r(), l("span", Jo, v(s.useCount), 1)) : y("", !0)
                        ], 10, Uo)
                      ]),
                      e("div", Ko, [
                        c(a).copySuccessId === s.id ? (r(), l("span", zo, "已复制")) : (r(), l("span", Ho, v($t(s.updatedAt)), 1))
                      ])
                    ])
                  ], 64)) : (r(), l(m, { key: 1 }, [
                    e("div", Qo, [
                      e("div", Yo, [
                        e("button", {
                          type: "button",
                          class: C(["bp-pin-btn", { active: s.pinned }]),
                          title: s.pinned ? "取消置顶" : "星标置顶",
                          onClick: h((b) => Pe(s.id), ["stop"])
                        }, v(s.pinned ? "★" : "☆"), 11, Go),
                        e("h4", {
                          class: "bp-card-title",
                          title: s.title
                        }, v(s.title), 9, Zo)
                      ]),
                      e("div", qo, [
                        e("button", {
                          type: "button",
                          class: "bp-action-btn edit",
                          title: "编辑提示词",
                          onClick: h((b) => me(s), ["stop"])
                        }, "✏️", 8, Wo),
                        e("button", {
                          type: "button",
                          class: "bp-action-btn delete",
                          title: "删除提示词",
                          onClick: h((b) => Ve(s.id), ["stop"])
                        }, "🗑️", 8, Xo)
                      ])
                    ]),
                    s.description ? (r(), l("p", en, v(s.description), 1)) : y("", !0),
                    e("div", {
                      class: "bp-card-preview",
                      title: s.content
                    }, [
                      e("pre", null, [
                        e("code", null, v(s.content), 1)
                      ])
                    ], 8, tn),
                    c(B)(s.content).length > 0 ? (r(), l("div", sn, [
                      t[83] || (t[83] = e("span", { class: "bp-vars-hint" }, "变量:", -1)),
                      (r(!0), l(m, null, I(c(B)(s.content), (b) => (r(), l("span", {
                        key: b,
                        class: "bp-var-pill",
                        title: `在无模态侧栏中填充: ${b}`,
                        onClick: h((T) => de(s), ["stop"])
                      }, " {{" + v(b) + "}} ", 9, on))), 128))
                    ])) : y("", !0),
                    e("div", nn, [
                      e("div", rn, [
                        (r(!0), l(m, null, I(s.tags, (b) => (r(), l("span", {
                          key: b,
                          class: "bp-tag-micro",
                          onClick: h((T) => ye(b), ["stop"])
                        }, "#" + v(b), 9, ln))), 128))
                      ]),
                      e("div", an, [
                        c(a).copySuccessId === s.id ? (r(), l("span", dn, "✓ 已复制!")) : y("", !0),
                        c(B)(s.content).length > 0 ? (r(), l("button", {
                          key: 1,
                          type: "button",
                          class: "bp-btn-use",
                          title: "填充变量并复制",
                          onClick: h((b) => de(s), ["stop"])
                        }, " ⚡ 填充使用 ", 8, cn)) : y("", !0),
                        e("button", {
                          type: "button",
                          class: C(["bp-btn-copy", { success: c(a).copySuccessId === s.id }]),
                          title: "直接复制提示词文本",
                          onClick: h((b) => Be(s), ["stop"])
                        }, v(c(a).copySuccessId === s.id ? "已复制" : "复制"), 11, un)
                      ])
                    ])
                  ], 64))
                ], 10, So))), 128))
              ]))
            ])) : n.value === "articles" ? (r(), l("main", pn, [
              e("div", bn, [
                e("div", gn, [
                  e("span", null, [
                    t[84] || (t[84] = $("共 ", -1)),
                    e("strong", null, v(ke.value.length), 1),
                    t[85] || (t[85] = $(" 篇文章", -1))
                  ]),
                  c(d).selectedTag ? (r(), l("span", vn, [
                    $(" 标签: #" + v(c(d).selectedTag) + " ", 1),
                    e("button", {
                      type: "button",
                      class: "bp-tag-close",
                      onClick: t[25] || (t[25] = (s) => c(d).selectedTag = null)
                    }, "✕")
                  ])) : y("", !0)
                ])
              ]),
              ke.value.length === 0 ? (r(), l("div", fn, [
                o.embedded ? (r(), l("div", yn, [...t[86] || (t[86] = [
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
                ])])) : (r(), l("div", mn, "📑")),
                e("h3", kn, v(ne.value.trim() || c(d).selectedTag ? "没有匹配的文章" : "暂无保存文章"), 1),
                e("p", hn, v(ne.value.trim() || c(d).selectedTag ? "试试更换搜索词或清除标签筛选。" : "把有价值的深度长文、技术资料或视频分析笔记存在这里，随时离线阅读。"), 1),
                e("button", {
                  type: "button",
                  class: "bp-btn bp-btn-primary bp-btn-indigo",
                  onClick: Re
                }, "保存文章")
              ])) : (r(), l("div", Cn, [
                (r(!0), l(m, null, I(ke.value, (s) => (r(), l("article", {
                  key: s.id,
                  class: C(["bp-card bp-card-article", {
                    "is-pinned": s.pinned,
                    "is-selected": c(d).editingArticle?.id === s.id || c(d).readingArticle?.id === s.id
                  }])
                }, [
                  e("div", wn, [
                    e("div", _n, [
                      e("button", {
                        type: "button",
                        class: C(["bp-pin-btn", { active: s.pinned }]),
                        title: s.pinned ? "取消置顶" : "星标置顶",
                        onClick: h((b) => kt(s.id), ["stop"])
                      }, v(s.pinned ? "★" : "☆"), 11, An),
                      e("h4", {
                        class: "bp-card-title",
                        title: s.title
                      }, v(s.title), 9, Sn)
                    ]),
                    e("div", $n, [
                      s.url ? (r(), l("a", {
                        key: 0,
                        href: s.url,
                        target: "_blank",
                        rel: "noreferrer",
                        class: "bp-action-btn",
                        title: "在浏览器中打开原文"
                      }, " ↗ ", 8, xn)) : y("", !0),
                      e("button", {
                        type: "button",
                        class: "bp-action-btn edit",
                        title: "编辑文章",
                        onClick: h((b) => gt(s), ["stop"])
                      }, [
                        o.embedded ? (r(), l("svg", Tn, [...t[87] || (t[87] = [
                          e("path", { d: "M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" }, null, -1)
                        ])])) : (r(), l(m, { key: 1 }, [
                          $("✏️")
                        ], 64))
                      ], 8, In),
                      e("button", {
                        type: "button",
                        class: "bp-action-btn delete",
                        title: "删除文章",
                        onClick: h((b) => mt(s.id), ["stop"])
                      }, [
                        o.embedded ? (r(), l("svg", Mn, [...t[88] || (t[88] = [
                          e("path", { d: "M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5" }, null, -1)
                        ])])) : (r(), l(m, { key: 1 }, [
                          $("🗑️")
                        ], 64))
                      ], 8, Bn)
                    ])
                  ]),
                  s.sourceName || s.updatedAt ? (r(), l("div", En, [
                    s.sourceName ? (r(), l("span", Vn, v(o.embedded ? s.sourceName : `📰 ${s.sourceName}`), 1)) : y("", !0),
                    e("span", Pn, v(o.embedded ? ce(s.updatedAt) : `🕒 ${ce(s.updatedAt)}`), 1)
                  ])) : y("", !0),
                  s.description ? (r(), l("p", Nn, v(s.description), 1)) : y("", !0),
                  e("div", Dn, [
                    O(He, {
                      class: "bp-preview-md",
                      content: ft(s.content)
                    }, null, 8, ["content"])
                  ]),
                  e("div", Ln, [
                    e("div", Rn, [
                      (r(!0), l(m, null, I(s.tags, (b) => (r(), l("span", {
                        key: b,
                        class: "bp-tag-micro",
                        onClick: h((T) => Te(b), ["stop"])
                      }, "#" + v(b), 9, On))), 128))
                    ]),
                    e("div", Fn, [
                      c(d).copySuccessId === s.id ? (r(), l("span", jn, "✓ 已复制!")) : y("", !0),
                      e("button", {
                        type: "button",
                        class: "bp-btn-read",
                        title: "阅读全文",
                        onClick: h((b) => vt(s), ["stop"])
                      }, v(o.embedded ? "阅读全文" : "📖 阅读全文"), 9, Un),
                      e("button", {
                        type: "button",
                        class: C(["bp-btn-copy", { success: c(d).copySuccessId === s.id }]),
                        title: "复制文章全文",
                        onClick: h((b) => Oe(s), ["stop"])
                      }, v(c(d).copySuccessId === s.id ? "已复制" : "复制"), 11, Jn)
                    ])
                  ])
                ], 2))), 128))
              ]))
            ])) : n.value === "stickers" ? (r(), l("main", Kn, [
              O(Et, {
                "dock-owned": "",
                active: n.value === "stickers"
              }, null, 8, ["active"])
            ])) : y("", !0),
            O(pe, { name: "drawer-slide" }, {
              default: R(() => [
                c(a).isEditing && n.value === "prompts" ? (r(), l("aside", zn, [
                  e("header", Hn, [
                    e("h3", Qn, v(c(a).editingPrompt?.id ? o.embedded ? "编辑提示词" : "✏️ 编辑提示词" : o.embedded ? "新建提示词" : "➕ 新建提示词"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "收起",
                      onClick: t[26] || (t[26] = (s) => c(_).closeEditor())
                    }, "✕")
                  ]),
                  e("div", Yn, [
                    e("div", Gn, [
                      t[89] || (t[89] = e("label", { class: "bp-form-label" }, "提示词标题 *", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[27] || (t[27] = (s) => J.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：自研架构评审准则",
                        maxlength: "64"
                      }, null, 512), [
                        [S, J.value]
                      ])
                    ]),
                    e("div", Zn, [
                      e("div", qn, [
                        t[90] || (t[90] = e("label", { class: "bp-form-label" }, "所属分组", -1)),
                        w(e("select", {
                          "onUpdate:modelValue": t[28] || (t[28] = (s) => G.value = s),
                          class: "bp-form-select"
                        }, [
                          (r(!0), l(m, null, I(Le.value, (s) => (r(), l("option", {
                            key: s.id,
                            value: s.id
                          }, v(s.name), 9, Wn))), 128))
                        ], 512), [
                          [Ke, G.value]
                        ])
                      ]),
                      e("div", Xn, [
                        e("label", ei, [
                          w(e("input", {
                            "onUpdate:modelValue": t[29] || (t[29] = (s) => q.value = s),
                            type: "checkbox"
                          }, null, 512), [
                            [ze, q.value]
                          ]),
                          t[91] || (t[91] = e("span", null, "星标置顶", -1))
                        ])
                      ])
                    ]),
                    e("div", ti, [
                      t[92] || (t[92] = e("label", { class: "bp-form-label" }, "简介与用途（可选）", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[30] || (t[30] = (s) => Y.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "简短描述该 Prompt 适合什么场景",
                        maxlength: "128"
                      }, null, 512), [
                        [S, Y.value]
                      ])
                    ]),
                    e("div", si, [
                      t[94] || (t[94] = e("div", { class: "bp-label-row" }, [
                        e("label", { class: "bp-form-label" }, "正文内容 *"),
                        e("span", { class: "bp-label-tip" }, [
                          $("支持 "),
                          e("code", null, "{{变量}}"),
                          $(" 动态占位符")
                        ])
                      ], -1)),
                      w(e("textarea", {
                        "onUpdate:modelValue": t[31] || (t[31] = (s) => D.value = s),
                        class: "bp-form-input bp-textarea-main",
                        placeholder: "在此输入完整的提示词内容..."
                      }, null, 512), [
                        [S, D.value]
                      ]),
                      Me.value.length > 0 ? (r(), l("div", oi, [
                        t[93] || (t[93] = e("span", null, "检测到变量：", -1)),
                        (r(!0), l(m, null, I(Me.value, (s) => (r(), l("span", {
                          key: s,
                          class: "bp-var-pill mini"
                        }, "{{" + v(s) + "}}", 1))), 128))
                      ])) : y("", !0)
                    ]),
                    e("div", ni, [
                      t[95] || (t[95] = e("label", { class: "bp-form-label" }, "标签（用逗号或空格隔开）", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[32] || (t[32] = (s) => Z.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：架构设计, 审查清单"
                      }, null, 512), [
                        [S, Z.value]
                      ])
                    ])
                  ]),
                  e("footer", ii, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[33] || (t[33] = (s) => c(_).closeEditor())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary",
                      onClick: ut
                    }, "保存提示词")
                  ])
                ])) : y("", !0)
              ]),
              _: 1
            }),
            O(pe, { name: "drawer-slide" }, {
              default: R(() => [
                c(a).isVariableDialogOpen && n.value === "prompts" ? (r(), l("aside", ri, [
                  e("header", li, [
                    e("h3", ai, v(o.embedded ? "填充变量" : "⚡ 快速填充变量"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "关闭",
                      onClick: t[34] || (t[34] = (s) => c(_).closeVariableDialog())
                    }, "✕")
                  ]),
                  e("div", di, [
                    e("p", ci, [
                      t[96] || (t[96] = $("正在使用：", -1)),
                      e("strong", null, v(c(a).variableTargetPrompt?.title), 1)
                    ]),
                    e("div", ui, [
                      (r(!0), l(m, null, I(c(a).variableFormValues, (s, b) => (r(), l("div", {
                        key: b,
                        class: "bp-form-group"
                      }, [
                        e("label", pi, "{{" + v(b) + "}}", 1),
                        w(e("textarea", {
                          "onUpdate:modelValue": (T) => c(a).variableFormValues[b] = T,
                          class: "bp-form-input bp-textarea-small",
                          placeholder: `请输入 ${b} 的具体内容...`,
                          rows: "2"
                        }, null, 8, bi), [
                          [S, c(a).variableFormValues[b]]
                        ])
                      ]))), 128))
                    ]),
                    e("div", gi, [
                      t[97] || (t[97] = e("div", { class: "bp-preview-header" }, "实时合并预览", -1)),
                      e("pre", vi, [
                        e("code", null, v(ct.value), 1)
                      ])
                    ])
                  ]),
                  e("footer", fi, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[35] || (t[35] = (s) => c(_).closeVariableDialog())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary",
                      onClick: dt
                    }, "一键复制填充内容")
                  ])
                ])) : y("", !0)
              ]),
              _: 1
            }),
            O(pe, { name: "drawer-slide" }, {
              default: R(() => [
                c(d).isEditing && n.value === "articles" ? (r(), l("aside", yi, [
                  e("header", mi, [
                    e("h3", ki, v(c(d).editingArticle?.id ? o.embedded ? "编辑文章" : "✏️ 编辑文章" : o.embedded ? "保存新文章" : "➕ 保存新文章"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "收起",
                      onClick: t[36] || (t[36] = (s) => c(x).closeEditor())
                    }, "✕")
                  ]),
                  e("div", hi, [
                    e("div", Ci, [
                      t[98] || (t[98] = e("label", { class: "bp-form-label" }, "文章标题 *", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[37] || (t[37] = (s) => K.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：a16z 提出 B2A 经济架构深度解析",
                        maxlength: "128"
                      }, null, 512), [
                        [S, K.value]
                      ])
                    ]),
                    e("div", wi, [
                      e("div", _i, [
                        t[99] || (t[99] = e("label", { class: "bp-form-label" }, "所属分组", -1)),
                        w(e("select", {
                          "onUpdate:modelValue": t[38] || (t[38] = (s) => te.value = s),
                          class: "bp-form-select"
                        }, [
                          (r(!0), l(m, null, I(Ue.value, (s) => (r(), l("option", {
                            key: s.id,
                            value: s.id
                          }, v(s.name), 9, Ai))), 128))
                        ], 512), [
                          [Ke, te.value]
                        ])
                      ]),
                      e("div", Si, [
                        e("label", $i, [
                          w(e("input", {
                            "onUpdate:modelValue": t[39] || (t[39] = (s) => oe.value = s),
                            type: "checkbox"
                          }, null, 512), [
                            [ze, oe.value]
                          ]),
                          t[100] || (t[100] = e("span", null, "星标置顶", -1))
                        ])
                      ])
                    ]),
                    e("div", xi, [
                      e("div", Ii, [
                        t[101] || (t[101] = e("label", { class: "bp-form-label" }, "原文网址（可选）", -1)),
                        w(e("input", {
                          "onUpdate:modelValue": t[40] || (t[40] = (s) => W.value = s),
                          type: "url",
                          class: "bp-form-input",
                          placeholder: "https://..."
                        }, null, 512), [
                          [S, W.value]
                        ])
                      ]),
                      e("div", Ti, [
                        t[102] || (t[102] = e("label", { class: "bp-form-label" }, "来源 / 作者（可选）", -1)),
                        w(e("input", {
                          "onUpdate:modelValue": t[41] || (t[41] = (s) => X.value = s),
                          type: "text",
                          class: "bp-form-input",
                          placeholder: "例如：a16z News"
                        }, null, 512), [
                          [S, X.value]
                        ])
                      ])
                    ]),
                    e("div", Bi, [
                      t[103] || (t[103] = e("label", { class: "bp-form-label" }, "核心摘要与推荐理由（可选）", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[42] || (t[42] = (s) => ee.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "一句话提炼文章核心看点...",
                        maxlength: "256"
                      }, null, 512), [
                        [S, ee.value]
                      ])
                    ]),
                    e("div", Mi, [
                      t[104] || (t[104] = e("label", { class: "bp-form-label" }, "文章正文内容 *", -1)),
                      w(e("textarea", {
                        "onUpdate:modelValue": t[43] || (t[43] = (s) => z.value = s),
                        class: "bp-form-input bp-textarea-main",
                        placeholder: "在此粘贴或撰写完整的文章长文本或 Markdown 内容..."
                      }, null, 512), [
                        [S, z.value]
                      ])
                    ]),
                    e("div", Ei, [
                      t[105] || (t[105] = e("label", { class: "bp-form-label" }, "标签（用逗号或空格隔开）", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[44] || (t[44] = (s) => se.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：AI, 产业观察, 商业模式"
                      }, null, 512), [
                        [S, se.value]
                      ])
                    ])
                  ]),
                  e("footer", Vi, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[45] || (t[45] = (s) => c(x).closeEditor())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary bp-btn-indigo",
                      onClick: yt
                    }, "保存文章")
                  ])
                ])) : y("", !0)
              ]),
              _: 1
            }),
            O(pe, { name: "drawer-slide" }, {
              default: R(() => [
                c(d).isReading && n.value === "articles" ? (r(), l("aside", Pi, [
                  e("header", Ni, [
                    e("div", Di, [
                      e("span", Li, v(o.embedded ? "阅读模式" : "📖 阅读器"), 1),
                      c(d).readingArticle?.sourceName ? (r(), l("span", Ri, v(c(d).readingArticle.sourceName), 1)) : y("", !0)
                    ]),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "关闭阅读器",
                      onClick: t[46] || (t[46] = (s) => c(x).closeReader())
                    }, "✕")
                  ]),
                  e("div", Oi, [
                    e("h2", Fi, v(c(d).readingArticle?.title), 1),
                    e("div", ji, [
                      c(d).readingArticle?.sourceName ? (r(), l("span", Ui, v(o.embedded ? c(d).readingArticle.sourceName : `📰 ${c(d).readingArticle.sourceName}`), 1)) : y("", !0),
                      c(d).readingArticle?.updatedAt ? (r(), l("span", Ji, v(o.embedded ? ce(c(d).readingArticle.updatedAt) : `🕒 ${ce(c(d).readingArticle.updatedAt)}`), 1)) : y("", !0),
                      c(d).readingArticle?.url ? (r(), l("a", {
                        key: 2,
                        href: c(d).readingArticle.url,
                        target: "_blank",
                        rel: "noreferrer",
                        class: "bp-reader-link"
                      }, " 原文链接 ↗ ", 8, Ki)) : y("", !0)
                    ]),
                    c(d).readingArticle?.description ? (r(), l("blockquote", zi, v(o.embedded ? c(d).readingArticle.description : `💡 ${c(d).readingArticle.description}`), 1)) : y("", !0),
                    e("div", Hi, [
                      O(He, {
                        content: c(d).readingArticle?.content || ""
                      }, null, 8, ["content"])
                    ])
                  ]),
                  e("footer", Qi, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[47] || (t[47] = (s) => c(x).closeReader())
                    }, "关闭"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary bp-btn-indigo",
                      onClick: t[48] || (t[48] = (s) => c(d).readingArticle && Oe(c(d).readingArticle))
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
        fn: R(() => [
          e("nav", Ut, [
            e("button", {
              type: "button",
              role: "tab",
              "aria-selected": n.value === "prompts",
              class: C(["bp-seg-tab", { active: n.value === "prompts" }]),
              onClick: t[0] || (t[0] = (s) => ae("prompts"))
            }, [
              t[49] || (t[49] = e("span", null, "提示词", -1)),
              e("small", null, v(c(a).prompts.length), 1)
            ], 10, Jt),
            e("button", {
              type: "button",
              role: "tab",
              "aria-selected": n.value === "articles",
              class: C(["bp-seg-tab", { active: n.value === "articles" }]),
              onClick: t[1] || (t[1] = (s) => ae("articles"))
            }, [
              t[50] || (t[50] = e("span", null, "文章", -1)),
              e("small", null, v(c(d).articles.length), 1)
            ], 10, Kt),
            e("button", {
              type: "button",
              role: "tab",
              "aria-selected": n.value === "stickers",
              class: C(["bp-seg-tab", { active: n.value === "stickers" }]),
              onClick: t[2] || (t[2] = (s) => ae("stickers"))
            }, [...t[51] || (t[51] = [
              e("span", null, "表情包", -1)
            ])], 10, zt)
          ])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), er = /* @__PURE__ */ st(Yi, [["__scopeId", "data-v-7f742db9"]]);
export {
  er as default
};
