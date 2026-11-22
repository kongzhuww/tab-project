import { f as a, g as r, h as e, J as me, r as lt, s as E, d as Tt, o as Mt, l as Et, V as Vt, A as J, q as C, t as f, u, j as y, F as m, p as w, i as x, z as Pt, I as ce, v as S, k as h, m as $, B as z, U as ke, M as ze, L as Ke, D as He, b as k } from "./vendor-vue-_upDT3S_.js";
import { _ as at, o as ue } from "./_plugin-vue_export-helper-DtNgUcga.js";
import { w as rt, P as he, S as dt, p as Ae, A as ie } from "./revision-guard-5IS-EcTI.js";
import { h as Dt, r as Nt, b as Qe, a as Ye } from "./storage-repo-CeKQXDMh.js";
import { S as Lt } from "./StickerBoard-CoEBwyRr.js";
const Rt = {}, Ot = {
  class: "backpack-embedded",
  "aria-label": "AI 工作区资料库"
}, jt = { class: "backpack-embedded-header" }, Ft = { class: "backpack-embedded-brand" }, Ut = { class: "backpack-embedded-actions" };
function Jt(s, n) {
  return a(), r("section", Ot, [
    e("header", jt, [
      e("div", Ft, [
        n[0] || (n[0] = e("h2", null, "资料库", -1)),
        me(s.$slots, "header-tabs", {}, void 0, !0)
      ]),
      e("div", Ut, [
        me(s.$slots, "header-actions", {}, void 0, !0)
      ])
    ]),
    me(s.$slots, "default", {}, void 0, !0)
  ]);
}
const zt = /* @__PURE__ */ at(Rt, [["render", Jt], ["__scopeId", "data-v-a3a93d15"]]), K = "logicweaver_prompt_backpack_v1", H = "logicweaver_prompt_backpack_categories_v1", T = "logicweaver_saved_articles_v1", M = "logicweaver_saved_article_categories_v1", ct = [
  { id: "all", name: "全部", icon: "🎒", isBuiltin: !0 },
  { id: "starred", name: "星标置顶", icon: "⭐", isBuiltin: !0 },
  { id: "default", name: "默认分组", icon: "📁", isBuiltin: !1 }
], ut = [
  { id: "all", name: "全部", icon: "📑", isBuiltin: !0 },
  { id: "starred", name: "星标置顶", icon: "⭐", isBuiltin: !0 },
  { id: "default", name: "默认分组", icon: "📁", isBuiltin: !1 }
];
function B(s) {
  if (!s) return [];
  const n = /* @__PURE__ */ new Set(), i = /\{\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}\}|\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}/g;
  let p;
  for (; (p = i.exec(s)) !== null; ) {
    const v = p[1] || p[2];
    v && !/^\d+$/.test(v) && n.add(v.trim());
  }
  return Array.from(n);
}
function Ge(s, n) {
  return s ? s.replace(/\{\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}\}|\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}/g, (i, p, v) => {
    const b = (p || v || "").trim();
    return n[b] !== void 0 && n[b] !== "" ? n[b] : i;
  }) : "";
}
const l = lt({
  prompts: [],
  categories: [...ct],
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
let Ze = !1, Ce = 0, qe = Promise.resolve();
function ge(s, n) {
  const i = [...n];
  return i.some((p) => p.id === "default") || i.push({ id: "default", name: "默认分组", icon: "📁", isBuiltin: !1 }), { prompts: [...s], categories: i };
}
function Kt() {
  try {
    if (typeof localStorage > "u") return null;
    const s = localStorage.getItem(K), n = localStorage.getItem(H);
    if (!s && !n) return null;
    const i = s ? JSON.parse(s) : [], p = n ? JSON.parse(n) : null;
    return ge(
      Array.isArray(i) ? i : [],
      Array.isArray(p) && p.length ? p : ct
    );
  } catch {
    return null;
  }
}
function pe(s, n) {
  try {
    if (typeof localStorage > "u") return;
    localStorage.setItem(K, JSON.stringify(s)), localStorage.setItem(H, JSON.stringify(n));
  } catch (i) {
    console.warn("[Backpack] persistToLocalStorage failed", i);
  }
}
const A = {
  get state() {
    return l;
  },
  async init() {
    if (Ze) return;
    Ze = !0, l.isLoading = !0;
    const s = Kt();
    s && s.prompts.length > 0 && (l.prompts = s.prompts, s.categories?.length && (l.categories = s.categories));
    try {
      if (typeof chrome < "u" && chrome.storage?.local) {
        const n = await chrome.storage.local.get([K, H, he]);
        Ce = Ae(n?.[he]);
        const i = n?.[K] || l.prompts, p = n?.[H] || l.categories, v = ge(i, p);
        l.prompts = v.prompts, l.categories = v.categories, JSON.stringify(n?.[K]) !== JSON.stringify(v.prompts) || JSON.stringify(n?.[H]) !== JSON.stringify(v.categories) ? await this.save() : pe(v.prompts, v.categories);
      } else {
        const n = ge(l.prompts, l.categories);
        l.prompts = n.prompts, l.categories = n.categories, pe(l.prompts, l.categories);
      }
    } catch (n) {
      console.warn("[Backpack] init storage error:", n);
      const i = ge(l.prompts, l.categories);
      l.prompts = i.prompts, l.categories = i.categories;
    } finally {
      l.isLoading = !1;
    }
  },
  async save() {
    const s = JSON.parse(JSON.stringify(l.prompts)), n = JSON.parse(JSON.stringify(l.categories));
    if (typeof chrome < "u" && chrome.storage?.local) {
      const i = qe.then(async () => {
        try {
          if (typeof navigator > "u" || !navigator.locks) throw new Error("浏览器不支持安全的背包写入锁");
          return Ce = await rt(chrome.storage.local, navigator.locks, he, Ce, {
            [K]: s,
            [H]: n
          }), pe(s, n), l.statusMessage = "", !0;
        } catch (p) {
          return l.statusMessage = p instanceof dt ? "提示词已在其他页面更改，当前修改未保存。请先导出本页内容，再刷新并核对。" : "提示词保存失败，当前修改未保存。请先导出本页内容，再检查存储。", console.warn("[Backpack] save failed", p), !1;
        }
      });
      return qe = i, i;
    }
    return pe(s, n), !0;
  },
  createPrompt(s) {
    const n = Date.now(), i = {
      id: `prompt-${n}-${Math.random().toString(36).slice(2, 7)}`,
      title: s.title.trim() || "未命名提示词",
      content: s.content,
      description: s.description?.trim() || "",
      category: s.category || "default",
      tags: Array.isArray(s.tags) ? s.tags.filter(Boolean) : [],
      pinned: !!s.pinned,
      createdAt: n,
      updatedAt: n,
      useCount: 0
    };
    return l.prompts.unshift(i), this.save(), i;
  },
  updatePrompt(s, n) {
    const i = l.prompts.findIndex((v) => v.id === s);
    if (i === -1) return !1;
    const p = l.prompts[i];
    return l.prompts[i] = {
      ...p,
      ...n,
      updatedAt: Date.now()
    }, this.save(), !0;
  },
  deletePrompt(s) {
    const n = l.prompts.length;
    return l.prompts = l.prompts.filter((i) => i.id !== s), l.selectedPromptId === s && (l.selectedPromptId = null), l.editingPrompt?.id === s && (l.isEditing = !1, l.editingPrompt = null), l.prompts.length !== n ? (this.save(), !0) : !1;
  },
  togglePin(s) {
    const n = l.prompts.find((i) => i.id === s);
    n && (n.pinned = !n.pinned, n.updatedAt = Date.now(), this.save());
  },
  async copyPromptText(s, n) {
    const i = n !== void 0 ? n : s.content;
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(i);
      else {
        const p = document.createElement("textarea");
        p.value = i, p.style.position = "fixed", p.style.opacity = "0", document.body.appendChild(p), p.select(), document.execCommand("copy"), document.body.removeChild(p);
      }
      return s.useCount = (s.useCount || 0) + 1, s.updatedAt = Date.now(), l.copySuccessId = s.id, setTimeout(() => {
        l.copySuccessId === s.id && (l.copySuccessId = null);
      }, 1800), this.save(), !0;
    } catch (p) {
      return console.warn("[Backpack] copy failed", p), !1;
    }
  },
  openVariableDialog(s) {
    const n = B(s.content), i = {};
    for (const p of n)
      i[p] = "";
    l.variableTargetPrompt = s, l.variableFormValues = i, l.isVariableDialogOpen = !0;
  },
  closeVariableDialog() {
    l.isVariableDialogOpen = !1, l.variableTargetPrompt = null, l.variableFormValues = {};
  },
  openEditor(s) {
    s ? l.editingPrompt = { ...s, tags: [...s.tags] } : l.editingPrompt = {
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
  saveEditorData(s) {
    l.editingPrompt?.id ? this.updatePrompt(l.editingPrompt.id, s) : this.createPrompt(s), this.closeEditor();
  },
  addCategory(s, n = "📁") {
    const i = s.trim();
    if (!i || l.categories.some((v) => v.name === i)) return !1;
    const p = `cat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    return l.categories.push({ id: p, name: i, icon: n, isBuiltin: !1 }), this.save(), !0;
  },
  renameCategory(s, n) {
    const i = n.trim();
    if (!i) return !1;
    const p = l.categories.find((v) => v.id === s);
    return !p || p.isBuiltin ? !1 : (p.name = i, this.save(), !0);
  },
  deleteCategory(s) {
    const n = l.categories.find((i) => i.id === s);
    if (!n || n.isBuiltin) return !1;
    l.categories = l.categories.filter((i) => i.id !== s), l.activeCategoryId === s && (l.activeCategoryId = "all");
    for (const i of l.prompts)
      i.category === s && (i.category = "default");
    return this.save(), !0;
  },
  exportBackup() {
    const s = {
      version: 1,
      appName: "tab-project-backpack",
      exportedAt: Date.now(),
      prompts: l.prompts,
      categories: l.categories
    }, n = new Blob([JSON.stringify(s, null, 2)], { type: "application/json" }), i = URL.createObjectURL(n), p = document.createElement("a"), v = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    p.href = i, p.download = `prompts-backpack-backup-${v}.json`, document.body.appendChild(p), p.click(), document.body.removeChild(p), URL.revokeObjectURL(i);
  },
  importBackup(s) {
    try {
      const n = JSON.parse(s);
      if (!n || !Array.isArray(n.prompts))
        return { success: !1, count: 0, error: "导入文件格式不合规，缺少 prompts 数组" };
      let i = 0;
      const p = new Set(l.prompts.map((b) => b.id)), v = [];
      for (const b of n.prompts) {
        if (!b || typeof b.title != "string" || typeof b.content != "string")
          continue;
        const _ = {
          id: b.id && !p.has(b.id) ? b.id : `prompt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
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
        v.push(_), p.add(_.id), i++;
      }
      if (i === 0)
        return { success: !1, count: 0, error: "未在文件中找到有效提示词条目" };
      if (Array.isArray(n.categories))
        for (const b of n.categories)
          b && b.name && !l.categories.some((_) => _.name === b.name) && l.categories.push({
            id: b.id || `cat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: String(b.name).trim(),
            icon: typeof b.icon == "string" ? b.icon : "📁",
            isBuiltin: !1
          });
      return l.prompts = [...v, ...l.prompts], this.save(), { success: !0, count: i };
    } catch (n) {
      return { success: !1, count: 0, error: `解析 JSON 失败: ${n?.message || n}` };
    }
  }
}, we = E(() => {
  const s = l.searchQuery.trim().toLowerCase(), n = l.activeCategoryId, i = l.selectedTag;
  return l.prompts.filter((p) => {
    if (n === "starred") {
      if (!p.pinned) return !1;
    } else if (n !== "all" && p.category !== n)
      return !1;
    if (i && !p.tags.includes(i))
      return !1;
    if (s) {
      const v = p.title.toLowerCase().includes(s), b = p.description?.toLowerCase().includes(s), _ = p.content.toLowerCase().includes(s), D = p.tags.some((V) => V.toLowerCase().includes(s));
      if (!v && !b && !_ && !D)
        return !1;
    }
    return !0;
  }).sort((p, v) => p.pinned && !v.pinned ? -1 : !p.pinned && v.pinned ? 1 : v.updatedAt - p.updatedAt);
}), We = E(() => {
  const s = /* @__PURE__ */ new Set();
  for (const n of l.prompts)
    if (Array.isArray(n.tags))
      for (const i of n.tags)
        i.trim() && s.add(i.trim());
  return Array.from(s);
}), d = lt({
  articles: [],
  categories: [...ut],
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
let Xe = !1, be = 0, et = Promise.resolve();
function Ht() {
  try {
    const s = Ye(T), n = Ye(M);
    return s === void 0 && n === void 0 ? null : {
      articles: Array.isArray(s) ? s : [],
      categories: Array.isArray(n) && n.length ? n : ut
    };
  } catch {
    return null;
  }
}
function _e(s, n) {
  Qe(T, s), Qe(M, n);
}
const I = {
  get state() {
    return d;
  },
  async init() {
    if (Xe) return;
    Xe = !0, d.isLoading = !0;
    const s = Ht();
    s && (d.articles = s.articles, s.categories?.length && (d.categories = s.categories));
    try {
      if (Dt()) {
        const n = await Nt([T, M, ie]);
        be = Ae(n?.[ie]), n?.[T] && Array.isArray(n[T]) && (d.articles = n[T]), n?.[M] && Array.isArray(n[M]) && (d.categories = n[M]), chrome.storage?.onChanged?.addListener && chrome.storage.onChanged.addListener((i, p) => {
          if (p === "local") {
            if (i[ie])
              try {
                be = Ae(i[ie].newValue);
              } catch {
              }
            i[T] && Array.isArray(i[T].newValue) && (d.articles = i[T].newValue), i[M] && Array.isArray(i[M].newValue) && (d.categories = i[M].newValue);
          }
        });
      } else s || _e(d.articles, d.categories);
    } catch (n) {
      console.warn("[ArticleService] init storage error:", n);
    } finally {
      d.isLoading = !1;
    }
  },
  async save() {
    const s = JSON.parse(JSON.stringify(d.articles)), n = JSON.parse(JSON.stringify(d.categories));
    if (typeof chrome < "u" && chrome.storage?.local) {
      const i = et.then(async () => {
        try {
          if (typeof navigator > "u" || !navigator.locks) throw new Error("浏览器不支持安全的背包写入锁");
          return be = await rt(chrome.storage.local, navigator.locks, ie, be, {
            [T]: s,
            [M]: n
          }), _e(s, n), d.statusMessage = "", !0;
        } catch (p) {
          return d.statusMessage = p instanceof dt ? "文章已在其他页面更改，当前修改未保存。请先导出本页内容，再刷新并核对。" : "文章保存失败，当前修改未保存。请先导出本页内容，再检查存储。", console.warn("[ArticleService] save failed", p), !1;
        }
      });
      return et = i, i;
    }
    return _e(s, n), !0;
  },
  createArticle(s) {
    const n = Date.now(), i = {
      id: `art-${n}-${Math.random().toString(36).slice(2, 7)}`,
      title: s.title.trim() || "未命名文章",
      content: s.content,
      url: s.url?.trim() || "",
      sourceName: s.sourceName?.trim() || "",
      description: s.description?.trim() || "",
      category: s.category || "default",
      tags: Array.isArray(s.tags) ? s.tags.filter(Boolean) : [],
      pinned: !!s.pinned,
      createdAt: n,
      updatedAt: n
    };
    return d.articles.unshift(i), this.save(), i;
  },
  updateArticle(s, n) {
    const i = d.articles.findIndex((v) => v.id === s);
    if (i === -1) return !1;
    const p = d.articles[i];
    return d.articles[i] = {
      ...p,
      ...n,
      updatedAt: Date.now()
    }, this.save(), !0;
  },
  deleteArticle(s) {
    const n = d.articles.length;
    return d.articles = d.articles.filter((i) => i.id !== s), d.selectedArticleId === s && (d.selectedArticleId = null), d.editingArticle?.id === s && (d.isEditing = !1, d.editingArticle = null), d.readingArticle?.id === s && (d.isReading = !1, d.readingArticle = null), d.articles.length !== n ? (this.save(), !0) : !1;
  },
  togglePin(s) {
    const n = d.articles.find((i) => i.id === s);
    n && (n.pinned = !n.pinned, n.updatedAt = Date.now(), this.save());
  },
  async copyArticleText(s) {
    const n = `${s.title}

${s.description ? `${s.description}

` : ""}${s.content}${s.url ? `

原文：${s.url}` : ""}`;
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(n);
      else {
        const i = document.createElement("textarea");
        i.value = n, i.style.position = "fixed", i.style.opacity = "0", document.body.appendChild(i), i.select(), document.execCommand("copy"), document.body.removeChild(i);
      }
      return d.copySuccessId = s.id, setTimeout(() => {
        d.copySuccessId === s.id && (d.copySuccessId = null);
      }, 1800), !0;
    } catch (i) {
      return console.warn("[ArticleService] copy failed", i), !1;
    }
  },
  openEditor(s) {
    d.isReading = !1, s ? d.editingArticle = { ...s, tags: [...s.tags] } : d.editingArticle = {
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
  openReader(s) {
    d.isEditing = !1, d.readingArticle = s, d.isReading = !0;
  },
  closeReader() {
    d.isReading = !1, d.readingArticle = null;
  },
  saveEditorData(s) {
    d.editingArticle?.id ? this.updateArticle(d.editingArticle.id, s) : this.createArticle(s), this.closeEditor();
  },
  addCategory(s, n = "📁") {
    const i = s.trim();
    if (!i || d.categories.some((v) => v.name === i)) return !1;
    const p = `cat-art-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    return d.categories.push({ id: p, name: i, icon: n, isBuiltin: !1 }), this.save(), !0;
  },
  renameCategory(s, n) {
    const i = n.trim();
    if (!i) return !1;
    const p = d.categories.find((v) => v.id === s);
    return !p || p.isBuiltin ? !1 : (p.name = i, this.save(), !0);
  },
  deleteCategory(s) {
    const n = d.categories.find((i) => i.id === s);
    if (!n || n.isBuiltin) return !1;
    d.categories = d.categories.filter((i) => i.id !== s), d.activeCategoryId === s && (d.activeCategoryId = "all");
    for (const i of d.articles)
      i.category === s && (i.category = "default");
    return this.save(), !0;
  },
  exportBackup() {
    const s = {
      version: 1,
      appName: "tab-project-articles",
      exportedAt: Date.now(),
      articles: d.articles,
      categories: d.categories
    }, n = new Blob([JSON.stringify(s, null, 2)], { type: "application/json" }), i = URL.createObjectURL(n), p = document.createElement("a"), v = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    p.href = i, p.download = `saved-articles-backup-${v}.json`, document.body.appendChild(p), p.click(), document.body.removeChild(p), URL.revokeObjectURL(i);
  },
  importBackup(s) {
    try {
      const n = JSON.parse(s);
      if (!n || !Array.isArray(n.articles))
        return { success: !1, count: 0, error: "导入文件格式不合规，缺少 articles 数组" };
      let i = 0;
      const p = new Set(d.articles.map((b) => b.id)), v = [];
      for (const b of n.articles) {
        if (!b || typeof b.title != "string" || typeof b.content != "string")
          continue;
        const _ = {
          id: b.id && !p.has(b.id) ? b.id : `art-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
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
        v.push(_), p.add(_.id), i++;
      }
      if (i === 0)
        return { success: !1, count: 0, error: "未在文件中找到有效文章条目" };
      if (Array.isArray(n.categories))
        for (const b of n.categories)
          b && b.name && !d.categories.some((_) => _.name === b.name) && d.categories.push({
            id: b.id || `cat-art-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: String(b.name).trim(),
            icon: typeof b.icon == "string" ? b.icon : "📁",
            isBuiltin: !1
          });
      return d.articles = [...v, ...d.articles], this.save(), { success: !0, count: i };
    } catch (n) {
      return { success: !1, count: 0, error: `解析 JSON 失败: ${n?.message || n}` };
    }
  }
}, tt = E(() => {
  const s = d.activeCategoryId, n = d.selectedTag;
  return d.articles.filter((i) => {
    if (s === "starred") {
      if (!i.pinned) return !1;
    } else if (s !== "all" && i.category !== s)
      return !1;
    return !(n && !i.tags.includes(n));
  }).sort((i, p) => i.pinned && !p.pinned ? -1 : !i.pinned && p.pinned ? 1 : p.updatedAt - i.updatedAt);
}), ot = E(() => {
  const s = /* @__PURE__ */ new Set();
  for (const n of d.articles)
    if (Array.isArray(n.tags))
      for (const i of n.tags)
        i.trim() && s.add(i.trim());
  return Array.from(s);
});
function st(s) {
  if (!s) return "";
  const n = new Date(s);
  return `${n.getMonth() + 1}/${n.getDate()}`;
}
function Qt(s) {
  if (!s) return "";
  const n = new Date(s), i = (p) => String(p).padStart(2, "0");
  return `${n.getFullYear()}-${i(n.getMonth() + 1)}-${i(n.getDate())}`;
}
function nt(s) {
  return String(s || "").split(/[,，\s]+/).map((n) => n.trim()).filter(Boolean);
}
function Yt(s, n = 600) {
  const i = String(s || "").trim();
  return i.length <= n ? i : `${i.slice(0, n)}
…`;
}
function Gt(s, n) {
  return s.find((i) => i.id === n)?.name || "默认分组";
}
function it(s, n) {
  const i = s.target, p = i?.files?.[0];
  if (!p || typeof FileReader > "u") return;
  const v = new FileReader();
  v.onload = (b) => {
    const _ = typeof b.target?.result == "string" ? b.target.result : "";
    _ && n(_), i && (i.value = "");
  }, v.readAsText(p);
}
const Zt = {
  class: "bp-seg-tabs",
  role: "tablist",
  "aria-label": "资料库频道"
}, qt = ["aria-selected"], Wt = ["aria-selected"], Xt = ["aria-selected"], eo = {
  key: 0,
  class: "bp-search-pill"
}, to = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, oo = {
  key: 1,
  class: "bp-icon"
}, so = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, no = {
  key: 1,
  class: "bp-icon"
}, io = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.6",
  "stroke-linecap": "round",
  "aria-hidden": "true"
}, lo = {
  key: 1,
  class: "bp-icon"
}, ao = {
  key: 0,
  class: "bp-search-pill"
}, ro = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, co = {
  key: 1,
  class: "bp-icon"
}, uo = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, po = {
  key: 1,
  class: "bp-icon"
}, bo = {
  key: 0,
  class: "bp-svg-icon",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.6",
  "stroke-linecap": "round",
  "aria-hidden": "true"
}, go = {
  key: 1,
  class: "bp-icon"
}, vo = {
  key: 0,
  class: "bp-alert-tip-bar"
}, fo = {
  key: 1,
  class: "bp-alert-tip-bar",
  role: "alert"
}, yo = {
  key: 2,
  class: "bp-alert-tip-bar",
  role: "alert"
}, mo = { class: "bp-work-area" }, ko = {
  key: 0,
  class: "bp-bili-sidebar"
}, ho = { class: "bp-sidebar-toggle-action" }, Co = { class: "bp-sidebar-toggle-chevron" }, wo = { class: "bp-channels-list" }, _o = ["onClick"], Ao = { class: "bp-channel-main" }, So = { class: "bp-channel-icon" }, $o = { class: "bp-channel-text" }, xo = { class: "bp-channel-badge" }, Io = { class: "bp-sidebar-favorite-hub" }, Bo = { class: "bp-hub-main" }, To = {
  key: 0,
  class: "bp-hub-icon"
}, Mo = { class: "bp-hub-text" }, Eo = { key: 0 }, Vo = {
  key: 0,
  class: "bp-add-category-box"
}, Po = { class: "bp-folder-list" }, Do = {
  key: 0,
  class: "bp-folder-inline-edit"
}, No = ["onKeydown"], Lo = ["onClick"], Ro = ["onClick"], Oo = {
  key: 0,
  class: "bp-folder-icon"
}, jo = ["title"], Fo = {
  key: 1,
  class: "bp-folder-badge"
}, Uo = {
  key: 2,
  class: "bp-folder-badge"
}, Jo = {
  key: 3,
  class: "bp-folder-badge"
}, zo = {
  key: 2,
  class: "bp-folder-actions"
}, Ko = ["onClick"], Ho = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Qo = ["onClick"], Yo = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Go = {
  key: 1,
  class: "bp-tags-container"
}, Zo = { class: "bp-tags-cloud" }, qo = ["onClick"], Wo = { class: "bp-sidebar-favorite-hub bp-hub-article" }, Xo = { class: "bp-hub-main" }, es = {
  key: 0,
  class: "bp-hub-icon"
}, ts = { class: "bp-hub-text" }, os = { key: 0 }, ss = {
  key: 0,
  class: "bp-add-category-box"
}, ns = { class: "bp-folder-list" }, is = {
  key: 0,
  class: "bp-folder-inline-edit"
}, ls = ["onKeydown"], as = ["onClick"], rs = ["onClick"], ds = {
  key: 0,
  class: "bp-folder-icon"
}, cs = ["title"], us = {
  key: 1,
  class: "bp-folder-badge"
}, ps = {
  key: 2,
  class: "bp-folder-badge"
}, bs = {
  key: 3,
  class: "bp-folder-badge"
}, gs = {
  key: 2,
  class: "bp-folder-actions"
}, vs = ["onClick"], fs = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, ys = ["onClick"], ms = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, ks = {
  key: 1,
  class: "bp-tags-container"
}, hs = { class: "bp-tags-cloud" }, Cs = ["onClick"], ws = {
  key: 1,
  class: "bp-content-pane"
}, _s = { class: "bp-pane-header" }, As = { class: "bp-result-stats" }, Ss = {
  key: 0,
  class: "bp-active-filter-badge"
}, $s = {
  key: 0,
  class: "bp-empty-state"
}, xs = {
  key: 0,
  class: "bp-empty-svg",
  "aria-hidden": "true"
}, Is = {
  key: 1,
  class: "bp-empty-icon"
}, Bs = { class: "bp-empty-title" }, Ts = {
  key: 2,
  class: "bp-empty-desc"
}, Ms = {
  key: 3,
  class: "bp-empty-desc"
}, Es = {
  key: 1,
  class: "bp-card-grid"
}, Vs = ["onClick"], Ps = { class: "bp-compact-head" }, Ds = ["title"], Ns = ["onClick"], Ls = ["title", "onClick"], Rs = {
  key: 0,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Os = {
  key: 1,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, js = ["onClick"], Fs = ["onClick"], Us = ["title"], Js = { class: "bp-compact-chips" }, zs = ["title", "onClick"], Ks = ["onClick"], Hs = ["title", "onClick"], Qs = { class: "bp-compact-meta" }, Ys = { class: "bp-compact-meta-left" }, Gs = { class: "bp-compact-kind" }, Zs = ["title", "onClick"], qs = { key: 0 }, Ws = { class: "bp-compact-meta-right" }, Xs = {
  key: 0,
  class: "bp-copied-tip"
}, en = {
  key: 1,
  class: "bp-compact-date"
}, tn = { class: "bp-card-header" }, on = { class: "bp-card-title-group" }, sn = ["title", "onClick"], nn = ["title"], ln = { class: "bp-card-actions" }, an = ["onClick"], rn = ["onClick"], dn = {
  key: 0,
  class: "bp-card-desc"
}, cn = ["title"], un = {
  key: 1,
  class: "bp-card-vars"
}, pn = ["title", "onClick"], bn = { class: "bp-card-footer" }, gn = { class: "bp-card-tags" }, vn = ["onClick"], fn = { class: "bp-card-button-row" }, yn = {
  key: 0,
  class: "bp-copied-tip"
}, mn = ["onClick"], kn = ["onClick"], hn = {
  key: 2,
  class: "bp-content-pane"
}, Cn = { class: "bp-pane-header" }, wn = { class: "bp-result-stats" }, _n = {
  key: 0,
  class: "bp-active-filter-badge bp-badge-indigo"
}, An = {
  key: 0,
  class: "bp-empty-state"
}, Sn = {
  key: 0,
  class: "bp-empty-svg",
  "aria-hidden": "true"
}, $n = {
  key: 1,
  class: "bp-empty-icon"
}, xn = { class: "bp-empty-title" }, In = { class: "bp-empty-desc" }, Bn = {
  key: 1,
  class: "bp-card-grid"
}, Tn = { class: "bp-card-header" }, Mn = { class: "bp-card-title-group" }, En = ["title", "onClick"], Vn = ["title"], Pn = { class: "bp-card-actions" }, Dn = ["href"], Nn = ["onClick"], Ln = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Rn = ["onClick"], On = {
  key: 0,
  class: "bp-svg-icon-sm",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.35",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, jn = {
  key: 0,
  class: "bp-article-meta-line"
}, Fn = {
  key: 0,
  class: "bp-article-source"
}, Un = { class: "bp-article-date" }, Jn = {
  key: 1,
  class: "bp-card-desc"
}, zn = { class: "bp-card-preview bp-article-preview" }, Kn = { class: "bp-card-footer" }, Hn = { class: "bp-card-tags" }, Qn = ["onClick"], Yn = { class: "bp-card-button-row" }, Gn = {
  key: 0,
  class: "bp-copied-tip"
}, Zn = ["onClick"], qn = ["onClick"], Wn = {
  key: 3,
  class: "bp-content-pane bp-stickers-wrapper"
}, Xn = {
  key: 0,
  class: "bp-side-drawer"
}, ei = { class: "bp-drawer-header" }, ti = { class: "bp-drawer-title" }, oi = { class: "bp-drawer-body" }, si = { class: "bp-form-group" }, ni = { class: "bp-form-row" }, ii = { class: "bp-form-group flex-1" }, li = ["value"], ai = { class: "bp-form-group bp-form-checkbox-group" }, ri = { class: "bp-checkbox-label" }, di = { class: "bp-form-group" }, ci = { class: "bp-form-group flex-fill" }, ui = {
  key: 0,
  class: "bp-detected-vars"
}, pi = { class: "bp-form-group" }, bi = { class: "bp-drawer-footer" }, gi = {
  key: 0,
  class: "bp-side-drawer"
}, vi = { class: "bp-drawer-header" }, fi = { class: "bp-drawer-title" }, yi = { class: "bp-drawer-body" }, mi = { class: "bp-drawer-desc" }, ki = { class: "bp-vars-form" }, hi = { class: "bp-form-label" }, Ci = ["onUpdate:modelValue", "placeholder"], wi = { class: "bp-preview-box" }, _i = { class: "bp-preview-text" }, Ai = { class: "bp-drawer-footer" }, Si = {
  key: 0,
  class: "bp-side-drawer bp-drawer-article"
}, $i = { class: "bp-drawer-header" }, xi = { class: "bp-drawer-title" }, Ii = { class: "bp-drawer-body" }, Bi = { class: "bp-form-group" }, Ti = { class: "bp-form-row" }, Mi = { class: "bp-form-group flex-1" }, Ei = ["value"], Vi = { class: "bp-form-group bp-form-checkbox-group" }, Pi = { class: "bp-checkbox-label" }, Di = { class: "bp-form-row" }, Ni = { class: "bp-form-group flex-1" }, Li = { class: "bp-form-group flex-1" }, Ri = { class: "bp-form-group" }, Oi = { class: "bp-form-group flex-fill" }, ji = { class: "bp-form-group" }, Fi = { class: "bp-drawer-footer" }, Ui = /* @__PURE__ */ Tt({
  __name: "BackpackDialog",
  props: {
    embedded: { type: Boolean }
  },
  setup(s) {
    const n = He(() => import("./MessageMarkdown-CRwTqMK-.js")), i = He(() => import("./BackpackArticleReaderDrawer-CEjezn-7.js")), p = [
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
    ], v = k("prompts"), b = k(!1), _ = k(!1), D = k(""), V = k(null), N = k(""), Q = k(!1), le = k(""), L = k(null), R = k(""), Se = k(null), $e = k(null), ae = k(""), O = k(""), P = k(""), Y = k(""), G = k("default"), Z = k(""), q = k(!1), j = k(""), F = k(""), W = k(""), X = k(""), ee = k(""), te = k("default"), oe = k(""), se = k(!1);
    Mt(() => {
      A.init(), I.init();
    });
    function pt() {
      b.value = !b.value;
    }
    function re(c) {
      v.value = c, l.isEditing = !1, l.isVariableDialogOpen = !1, d.isEditing = !1, d.isReading = !1;
    }
    function xe(c) {
      l.activeCategoryId = c;
    }
    function ve(c) {
      l.selectedTag = l.selectedTag === c ? null : c;
    }
    function bt(c) {
      d.activeCategoryId = c;
    }
    function Ie(c) {
      d.selectedTag = d.selectedTag === c ? null : c;
    }
    function Be(c) {
      A.copyPromptText(c);
    }
    function de(c) {
      l.isEditing = !1, A.openVariableDialog(c);
    }
    function gt() {
      if (!l.variableTargetPrompt) return;
      const c = Ge(
        l.variableTargetPrompt.content,
        l.variableFormValues
      );
      A.copyPromptText(l.variableTargetPrompt, c), A.closeVariableDialog();
    }
    const vt = E(() => l.variableTargetPrompt ? Ge(
      l.variableTargetPrompt.content,
      l.variableFormValues
    ) : ""), Te = E(() => B(P.value));
    function Me() {
      l.isVariableDialogOpen = !1, O.value = "", P.value = "", Y.value = "", G.value = l.activeCategoryId === "all" || l.activeCategoryId === "starred" ? Ne.value[0]?.id || "default" : l.activeCategoryId, Z.value = "", q.value = !1, A.openEditor();
    }
    function fe(c) {
      l.isVariableDialogOpen = !1, O.value = c.title, P.value = c.content, Y.value = c.description || "", G.value = c.category, Z.value = c.tags.join(", "), q.value = !!c.pinned, A.openEditor(c);
    }
    function ft() {
      if (!O.value.trim() && !P.value.trim()) return;
      const c = nt(Z.value);
      A.saveEditorData({
        title: O.value.trim() || "未命名提示词",
        content: P.value,
        description: Y.value.trim(),
        category: G.value || "default",
        tags: c,
        pinned: q.value
      });
    }
    function Ee(c) {
      typeof window < "u" && !window.confirm("确定要删除这条提示词吗？") || A.deletePrompt(c);
    }
    function Ve(c) {
      A.togglePin(c);
    }
    function Pe() {
      const c = D.value.trim();
      c && A.addCategory(c) && (D.value = "", _.value = !1);
    }
    function yt(c) {
      V.value = c.id, N.value = c.name;
    }
    function De(c) {
      N.value.trim() && A.renameCategory(c, N.value.trim()), V.value = null, N.value = "";
    }
    function mt(c) {
      typeof window < "u" && !window.confirm(`确定删除分组「${c.name}」吗？组内提示词将归入默认分组。`) || A.deleteCategory(c.id);
    }
    const Ne = E(() => l.categories.filter((c) => c.id !== "all" && c.id !== "starred"));
    function Le() {
      d.isReading = !1, j.value = "", F.value = "", W.value = "", X.value = "", ee.value = "", te.value = d.activeCategoryId === "all" || d.activeCategoryId === "starred" ? Fe.value[0]?.id || "default" : d.activeCategoryId, oe.value = "", se.value = !1, I.openEditor();
    }
    function kt(c) {
      d.isReading = !1, j.value = c.title, F.value = c.content, W.value = c.url || "", X.value = c.sourceName || "", ee.value = c.description || "", te.value = c.category, oe.value = c.tags.join(", "), se.value = !!c.pinned, I.openEditor(c);
    }
    function ht(c) {
      I.openReader(c);
    }
    function Ct() {
      if (!j.value.trim() && !F.value.trim()) return;
      const c = nt(oe.value);
      I.saveEditorData({
        title: j.value.trim() || "未命名文章",
        content: F.value,
        url: W.value.trim(),
        sourceName: X.value.trim(),
        description: ee.value.trim(),
        category: te.value || "default",
        tags: c,
        pinned: se.value
      });
    }
    function wt(c) {
      typeof window < "u" && !window.confirm("确定要删除这篇保存的文章吗？") || I.deleteArticle(c);
    }
    function _t(c) {
      I.togglePin(c);
    }
    function Re(c) {
      I.copyArticleText(c);
    }
    function Oe() {
      const c = le.value.trim();
      c && I.addCategory(c) && (le.value = "", Q.value = !1);
    }
    function At(c) {
      L.value = c.id, R.value = c.name;
    }
    function je(c) {
      R.value.trim() && I.renameCategory(c, R.value.trim()), L.value = null, R.value = "";
    }
    function St(c) {
      typeof window < "u" && !window.confirm(`确定删除分组「${c.name}」吗？组内文章将归入默认分组。`) || I.deleteCategory(c.id);
    }
    const Fe = E(() => d.categories.filter((c) => c.id !== "all" && c.id !== "starred"));
    function $t() {
      Se.value?.click();
    }
    function xt() {
      $e.value?.click();
    }
    function Ue(c, t) {
      ae.value = c.success ? `成功导入 ${c.count} ${t}！` : c.error || "导入失败", setTimeout(() => {
        ae.value = "";
      }, 3500);
    }
    function It(c) {
      it(c, (t) => Ue(A.importBackup(t), "条提示词"));
    }
    function Bt(c) {
      it(c, (t) => Ue(I.importBackup(t), "篇文章"));
    }
    function Je(c) {
      return Gt(l.categories, c);
    }
    const ne = k(""), ye = E(() => {
      const c = ne.value.trim().toLowerCase();
      return c ? tt.value.filter(
        (t) => t.title.toLowerCase().includes(c) || t.description?.toLowerCase().includes(c) || t.sourceName?.toLowerCase().includes(c) || t.content.toLowerCase().includes(c) || t.tags.some((o) => o.toLowerCase().includes(c))
      ) : tt.value;
    });
    return (c, t) => (a(), Et(zt, null, Vt({
      "header-actions": J(() => [
        e("div", {
          class: C(["bp-top-actions", { "bp-integrated": s.embedded }])
        }, [
          v.value === "prompts" ? (a(), r(m, { key: 0 }, [
            s.embedded ? (a(), r("label", eo, [
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
                "onUpdate:modelValue": t[3] || (t[3] = (o) => u(l).searchQuery = o),
                type: "search",
                placeholder: "搜索提示词…",
                "aria-label": "搜索提示词"
              }, null, 512), [
                [S, u(l).searchQuery]
              ])
            ])) : y("", !0),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "导出备份",
              onClick: t[4] || (t[4] = (o) => u(A).exportBackup())
            }, [
              s.embedded ? (a(), r("svg", to, [...t[51] || (t[51] = [
                e("path", { d: "M8 2.5v7.5M5 7l3 3 3-3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (a(), r("span", oo, "💾")),
              t[52] || (t[52] = e("span", null, "导出", -1))
            ]),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "从文件导入",
              onClick: $t
            }, [
              s.embedded ? (a(), r("svg", so, [...t[53] || (t[53] = [
                e("path", { d: "M8 10V2.5M5 5.5l3-3 3 3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (a(), r("span", no, "📥")),
              t[54] || (t[54] = e("span", null, "导入", -1))
            ]),
            e("button", {
              type: "button",
              class: C(["bp-btn bp-btn-primary", { active: u(l).isEditing }]),
              title: "新建提示词",
              onClick: Me
            }, [
              s.embedded ? (a(), r("svg", io, [...t[55] || (t[55] = [
                e("path", { d: "M8 3v10M3 8h10" }, null, -1)
              ])])) : (a(), r("span", lo, "➕")),
              e("span", null, f(s.embedded ? "新建" : "新建提示词"), 1)
            ], 2),
            e("input", {
              ref_key: "promptFileInputRef",
              ref: Se,
              type: "file",
              accept: ".json",
              style: { display: "none" },
              onChange: It
            }, null, 544)
          ], 64)) : v.value === "articles" ? (a(), r(m, { key: 1 }, [
            s.embedded ? (a(), r("label", ao, [
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
                "onUpdate:modelValue": t[5] || (t[5] = (o) => ne.value = o),
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
              onClick: t[6] || (t[6] = (o) => u(I).exportBackup())
            }, [
              s.embedded ? (a(), r("svg", ro, [...t[57] || (t[57] = [
                e("path", { d: "M8 2.5v7.5M5 7l3 3 3-3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (a(), r("span", co, "💾")),
              t[58] || (t[58] = e("span", null, "导出", -1))
            ]),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "从文件导入文章",
              onClick: xt
            }, [
              s.embedded ? (a(), r("svg", uo, [...t[59] || (t[59] = [
                e("path", { d: "M8 10V2.5M5 5.5l3-3 3 3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" }, null, -1)
              ])])) : (a(), r("span", po, "📥")),
              t[60] || (t[60] = e("span", null, "导入", -1))
            ]),
            e("button", {
              type: "button",
              class: C(["bp-btn bp-btn-primary bp-btn-article-pri", { active: u(d).isEditing }]),
              title: "保存新文章",
              onClick: Le
            }, [
              s.embedded ? (a(), r("svg", bo, [...t[61] || (t[61] = [
                e("path", { d: "M8 3v10M3 8h10" }, null, -1)
              ])])) : (a(), r("span", go, "➕")),
              e("span", null, f(s.embedded ? "新建" : "新建文章"), 1)
            ], 2),
            e("input", {
              ref_key: "articleFileInputRef",
              ref: $e,
              type: "file",
              accept: ".json",
              style: { display: "none" },
              onChange: Bt
            }, null, 544)
          ], 64)) : y("", !0)
        ], 2)
      ]),
      default: J(() => [
        e("div", {
          class: C(["bp-container", { "bp-integrated": s.embedded }])
        }, [
          ae.value ? (a(), r("div", vo, f(ae.value), 1)) : y("", !0),
          u(l).statusMessage ? (a(), r("div", fo, f(u(l).statusMessage), 1)) : y("", !0),
          u(d).statusMessage ? (a(), r("div", yo, f(u(d).statusMessage), 1)) : y("", !0),
          e("div", mo, [
            !s.embedded || v.value !== "stickers" ? (a(), r("aside", ko, [
              s.embedded ? y("", !0) : (a(), r(m, { key: 0 }, [
                e("div", {
                  class: C(["bp-sidebar-toggle-bar", { "is-collapsed": b.value }]),
                  onClick: pt
                }, [
                  t[62] || (t[62] = e("div", { class: "bp-sidebar-toggle-title" }, [
                    e("span", { class: "bp-sidebar-toggle-icon" }, "⚡"),
                    e("strong", null, "快捷频道")
                  ], -1)),
                  e("div", ho, [
                    e("span", null, f(b.value ? "展开" : "收起"), 1),
                    e("span", Co, f(b.value ? "▾" : "▴"), 1)
                  ])
                ], 2),
                w(e("div", wo, [
                  (a(), r(m, null, x(p, (o) => e("div", {
                    key: o.id,
                    class: C(["bp-channel-wrap", o.themeClass])
                  }, [
                    e("button", {
                      type: "button",
                      class: C(["bp-channel-btn", { on: v.value === o.id }]),
                      onClick: (g) => re(o.id)
                    }, [
                      e("div", Ao, [
                        e("span", So, f(o.icon), 1),
                        e("div", $o, [
                          e("strong", null, f(o.title), 1),
                          e("small", null, f(o.subTitle), 1)
                        ])
                      ]),
                      e("span", xo, f(o.badge), 1)
                    ], 10, _o)
                  ], 2)), 64))
                ], 512), [
                  [Pt, !b.value]
                ])
              ], 64)),
              v.value === "prompts" ? (a(), r(m, { key: 1 }, [
                e("div", Io, [
                  e("div", Bo, [
                    s.embedded ? y("", !0) : (a(), r("span", To, "📁")),
                    e("div", Mo, [
                      t[63] || (t[63] = e("strong", null, "提示词分组", -1)),
                      s.embedded ? y("", !0) : (a(), r("small", Eo, "按自定义分组整理"))
                    ])
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-hub-add-btn",
                    title: "新增分组",
                    onClick: t[7] || (t[7] = (o) => _.value = !0)
                  }, "+")
                ]),
                _.value ? (a(), r("div", Vo, [
                  w(e("input", {
                    "onUpdate:modelValue": t[8] || (t[8] = (o) => D.value = o),
                    type: "text",
                    class: "bp-add-cat-input",
                    placeholder: "分组名称...",
                    maxlength: "16",
                    autofocus: "",
                    onKeydown: [
                      t[9] || (t[9] = (o) => u(ue)(o, Pe)),
                      t[10] || (t[10] = ce((o) => _.value = !1, ["esc"]))
                    ]
                  }, null, 544), [
                    [S, D.value]
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini primary",
                    onClick: Pe
                  }, "✔"),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini",
                    onClick: t[11] || (t[11] = (o) => _.value = !1)
                  }, "✕")
                ])) : y("", !0),
                e("div", Po, [
                  (a(!0), r(m, null, x(u(l).categories, (o) => (a(), r("div", {
                    key: o.id,
                    class: C(["bp-folder-row", { active: u(l).activeCategoryId === o.id }])
                  }, [
                    V.value === o.id ? (a(), r("div", Do, [
                      w(e("input", {
                        "onUpdate:modelValue": t[12] || (t[12] = (g) => N.value = g),
                        type: "text",
                        class: "bp-folder-rename-input",
                        maxlength: "16",
                        autofocus: "",
                        onKeydown: [
                          (g) => u(ue)(g, () => De(o.id)),
                          t[13] || (t[13] = ce((g) => V.value = null, ["esc"]))
                        ]
                      }, null, 40, No), [
                        [S, N.value]
                      ]),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini primary",
                        onClick: (g) => De(o.id)
                      }, "✔", 8, Lo),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini",
                        onClick: t[14] || (t[14] = (g) => V.value = null)
                      }, "✕")
                    ])) : (a(), r("button", {
                      key: 1,
                      type: "button",
                      class: "bp-folder-btn",
                      onClick: (g) => xe(o.id)
                    }, [
                      s.embedded ? y("", !0) : (a(), r("span", Oo, f(o.icon || "📁"), 1)),
                      e("span", {
                        class: "bp-folder-name",
                        title: o.name
                      }, f(o.name), 9, jo),
                      o.id === "all" ? (a(), r("span", Fo, f(u(l).prompts.length), 1)) : o.id === "starred" ? (a(), r("span", Uo, f(u(l).prompts.filter((g) => g.pinned).length), 1)) : (a(), r("span", Jo, f(u(l).prompts.filter((g) => g.category === o.id).length), 1))
                    ], 8, Ro)),
                    !o.isBuiltin && V.value !== o.id ? (a(), r("div", zo, [
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn",
                        title: "重命名",
                        onClick: h((g) => yt(o), ["stop"])
                      }, [
                        s.embedded ? (a(), r("svg", Ho, [...t[64] || (t[64] = [
                          e("path", { d: "M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" }, null, -1)
                        ])])) : (a(), r(m, { key: 1 }, [
                          $("✏️")
                        ], 64))
                      ], 8, Ko),
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn danger",
                        title: "删除",
                        onClick: h((g) => mt(o), ["stop"])
                      }, [
                        s.embedded ? (a(), r("svg", Yo, [...t[65] || (t[65] = [
                          e("path", { d: "M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5" }, null, -1)
                        ])])) : (a(), r(m, { key: 1 }, [
                          $("🗑️")
                        ], 64))
                      ], 8, Qo)
                    ])) : y("", !0)
                  ], 2))), 128))
                ]),
                !s.embedded && u(We).length > 0 ? (a(), r("div", Go, [
                  t[66] || (t[66] = e("div", { class: "bp-tags-title" }, "常用标签", -1)),
                  e("div", Zo, [
                    (a(!0), r(m, null, x(u(We), (o) => (a(), r("span", {
                      key: o,
                      class: C(["bp-tag-pill", { active: u(l).selectedTag === o }]),
                      onClick: (g) => ve(o)
                    }, " #" + f(o), 11, qo))), 128))
                  ])
                ])) : y("", !0)
              ], 64)) : v.value === "articles" ? (a(), r(m, { key: 2 }, [
                e("div", Wo, [
                  e("div", Xo, [
                    s.embedded ? y("", !0) : (a(), r("span", es, "📚")),
                    e("div", ts, [
                      t[67] || (t[67] = e("strong", null, "文章分组", -1)),
                      s.embedded ? y("", !0) : (a(), r("small", os, "文章多级分类整理"))
                    ])
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-hub-add-btn bp-btn-indigo",
                    title: "新增文章分组",
                    onClick: t[15] || (t[15] = (o) => Q.value = !0)
                  }, "+")
                ]),
                Q.value ? (a(), r("div", ss, [
                  w(e("input", {
                    "onUpdate:modelValue": t[16] || (t[16] = (o) => le.value = o),
                    type: "text",
                    class: "bp-add-cat-input bp-border-indigo",
                    placeholder: "分组名称...",
                    maxlength: "16",
                    autofocus: "",
                    onKeydown: [
                      t[17] || (t[17] = (o) => u(ue)(o, Oe)),
                      t[18] || (t[18] = ce((o) => Q.value = !1, ["esc"]))
                    ]
                  }, null, 544), [
                    [S, le.value]
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini primary bp-bg-indigo",
                    onClick: Oe
                  }, "✔"),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini",
                    onClick: t[19] || (t[19] = (o) => Q.value = !1)
                  }, "✕")
                ])) : y("", !0),
                e("div", ns, [
                  (a(!0), r(m, null, x(u(d).categories, (o) => (a(), r("div", {
                    key: o.id,
                    class: C(["bp-folder-row bp-row-indigo", { active: u(d).activeCategoryId === o.id }])
                  }, [
                    L.value === o.id ? (a(), r("div", is, [
                      w(e("input", {
                        "onUpdate:modelValue": t[20] || (t[20] = (g) => R.value = g),
                        type: "text",
                        class: "bp-folder-rename-input",
                        maxlength: "16",
                        autofocus: "",
                        onKeydown: [
                          (g) => u(ue)(g, () => je(o.id)),
                          t[21] || (t[21] = ce((g) => L.value = null, ["esc"]))
                        ]
                      }, null, 40, ls), [
                        [S, R.value]
                      ]),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini primary bp-bg-indigo",
                        onClick: (g) => je(o.id)
                      }, "✔", 8, as),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini",
                        onClick: t[22] || (t[22] = (g) => L.value = null)
                      }, "✕")
                    ])) : (a(), r("button", {
                      key: 1,
                      type: "button",
                      class: "bp-folder-btn",
                      onClick: (g) => bt(o.id)
                    }, [
                      s.embedded ? y("", !0) : (a(), r("span", ds, f(o.icon || "📑"), 1)),
                      e("span", {
                        class: "bp-folder-name",
                        title: o.name
                      }, f(o.name), 9, cs),
                      o.id === "all" ? (a(), r("span", us, f(u(d).articles.length), 1)) : o.id === "starred" ? (a(), r("span", ps, f(u(d).articles.filter((g) => g.pinned).length), 1)) : (a(), r("span", bs, f(u(d).articles.filter((g) => g.category === o.id).length), 1))
                    ], 8, rs)),
                    !o.isBuiltin && L.value !== o.id ? (a(), r("div", gs, [
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn",
                        title: "重命名",
                        onClick: h((g) => At(o), ["stop"])
                      }, [
                        s.embedded ? (a(), r("svg", fs, [...t[68] || (t[68] = [
                          e("path", { d: "M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" }, null, -1)
                        ])])) : (a(), r(m, { key: 1 }, [
                          $("✏️")
                        ], 64))
                      ], 8, vs),
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn danger",
                        title: "删除",
                        onClick: h((g) => St(o), ["stop"])
                      }, [
                        s.embedded ? (a(), r("svg", ms, [...t[69] || (t[69] = [
                          e("path", { d: "M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5" }, null, -1)
                        ])])) : (a(), r(m, { key: 1 }, [
                          $("🗑️")
                        ], 64))
                      ], 8, ys)
                    ])) : y("", !0)
                  ], 2))), 128))
                ]),
                !s.embedded && u(ot).length > 0 ? (a(), r("div", ks, [
                  t[70] || (t[70] = e("div", { class: "bp-tags-title" }, "文章标签", -1)),
                  e("div", hs, [
                    (a(!0), r(m, null, x(u(ot), (o) => (a(), r("span", {
                      key: o,
                      class: C(["bp-tag-pill bp-tag-indigo", { active: u(d).selectedTag === o }]),
                      onClick: (g) => Ie(o)
                    }, " #" + f(o), 11, Cs))), 128))
                  ])
                ])) : y("", !0)
              ], 64)) : y("", !0)
            ])) : y("", !0),
            v.value === "prompts" ? (a(), r("main", ws, [
              e("div", _s, [
                e("div", As, [
                  e("span", null, [
                    t[71] || (t[71] = $("共 ", -1)),
                    e("strong", null, f(u(we).length), 1),
                    t[72] || (t[72] = $(" 条提示词", -1))
                  ]),
                  u(l).selectedTag ? (a(), r("span", Ss, [
                    $(" 标签: #" + f(u(l).selectedTag) + " ", 1),
                    e("button", {
                      type: "button",
                      class: "bp-tag-close",
                      onClick: t[23] || (t[23] = (o) => u(l).selectedTag = null)
                    }, "✕")
                  ])) : y("", !0)
                ])
              ]),
              u(we).length === 0 ? (a(), r("div", $s, [
                s.embedded ? (a(), r("div", xs, [...t[73] || (t[73] = [
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
                ])])) : (a(), r("div", Is, "🎒")),
                e("h3", Bs, f(u(l).searchQuery.trim() || u(l).selectedTag ? "没有匹配的提示词" : "暂无提示词"), 1),
                u(l).searchQuery.trim() || u(l).selectedTag ? (a(), r("p", Ts, "试试更换搜索词或清除标签筛选。")) : (a(), r("p", Ms, [...t[74] || (t[74] = [
                  $("把常用的系统提示、模板指令和 ", -1),
                  e("code", null, "{{变量}}", -1),
                  $(" 存在这里，随时一键调用。", -1)
                ])])),
                e("button", {
                  type: "button",
                  class: "bp-btn bp-btn-primary",
                  onClick: Me
                }, "新建提示词")
              ])) : (a(), r("div", Es, [
                (a(!0), r(m, null, x(u(we), (o) => (a(), r("article", {
                  key: o.id,
                  class: C(["bp-card", {
                    "bp-compact-card": s.embedded,
                    "is-pinned": o.pinned,
                    "is-selected": u(l).editingPrompt?.id === o.id
                  }]),
                  onClick: (g) => s.embedded && fe(o)
                }, [
                  s.embedded ? (a(), r(m, { key: 0 }, [
                    e("div", Ps, [
                      e("h4", {
                        class: "bp-compact-title",
                        title: o.title
                      }, f(o.title), 9, Ds),
                      e("div", {
                        class: "bp-compact-actions",
                        onClick: t[24] || (t[24] = h(() => {
                        }, ["stop"]))
                      }, [
                        u(B)(o.content).length > 0 ? (a(), r("button", {
                          key: 0,
                          type: "button",
                          class: "bp-compact-icon-btn accent",
                          title: "填充变量并使用",
                          onClick: h((g) => de(o), ["stop"])
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
                        ])], 8, Ns)) : y("", !0),
                        e("button", {
                          type: "button",
                          class: C(["bp-compact-icon-btn", { success: u(l).copySuccessId === o.id }]),
                          title: u(l).copySuccessId === o.id ? "已复制" : "复制提示词",
                          onClick: h((g) => Be(o), ["stop"])
                        }, [
                          u(l).copySuccessId === o.id ? (a(), r("svg", Rs, [...t[76] || (t[76] = [
                            e("path", { d: "M3.5 8.5l3 3 6-6.5" }, null, -1)
                          ])])) : (a(), r("svg", Os, [...t[77] || (t[77] = [
                            e("rect", {
                              x: "5.5",
                              y: "5.5",
                              width: "7.5",
                              height: "8.5",
                              rx: "1.4"
                            }, null, -1),
                            e("path", { d: "M10.5 5.5V3.6A1.4 1.4 0 0 0 9.1 2.2H4.2a1.4 1.4 0 0 0-1.4 1.4v6.7a1.4 1.4 0 0 0 1.4 1.4h1.3" }, null, -1)
                          ])]))
                        ], 10, Ls),
                        e("button", {
                          type: "button",
                          class: "bp-compact-icon-btn",
                          title: "编辑提示词",
                          onClick: h((g) => fe(o), ["stop"])
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
                        ])], 8, js),
                        e("button", {
                          type: "button",
                          class: "bp-compact-icon-btn danger",
                          title: "删除提示词",
                          onClick: h((g) => Ee(o.id), ["stop"])
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
                        ])], 8, Fs)
                      ])
                    ]),
                    e("p", {
                      class: "bp-compact-desc",
                      title: o.description || o.content
                    }, f(o.description || o.content || "暂无内容描述"), 9, Us),
                    e("div", Js, [
                      e("button", {
                        type: "button",
                        class: "bp-compact-folder-chip",
                        title: `查看分组「${Je(o.category)}」`,
                        onClick: h((g) => xe(o.category || "default"), ["stop"])
                      }, [
                        t[80] || (t[80] = e("svg", {
                          viewBox: "0 0 16 16",
                          fill: "currentColor",
                          "aria-hidden": "true"
                        }, [
                          e("path", { d: "M2 4.2A1.7 1.7 0 0 1 3.7 2.5h2.5l1.3 1.4h4.8A1.7 1.7 0 0 1 14 5.6v6.2a1.7 1.7 0 0 1-1.7 1.7H3.7A1.7 1.7 0 0 1 2 11.8V4.2Z" })
                        ], -1)),
                        e("span", null, f(Je(o.category)), 1)
                      ], 8, zs),
                      (a(!0), r(m, null, x(o.tags, (g) => (a(), r("span", {
                        key: g,
                        class: "bp-compact-tag-chip",
                        onClick: h((U) => ve(g), ["stop"])
                      }, "#" + f(g), 9, Ks))), 128)),
                      (a(!0), r(m, null, x(u(B)(o.content), (g) => (a(), r("span", {
                        key: g,
                        class: "bp-compact-var-chip",
                        title: `点击填充变量 ${g}`,
                        onClick: h((U) => de(o), ["stop"])
                      }, "{{" + f(g) + "}}", 9, Hs))), 128))
                    ]),
                    e("div", Qs, [
                      e("div", Ys, [
                        e("span", Gs, [
                          e("i", {
                            class: C(["bp-compact-dot", { hasVars: u(B)(o.content).length > 0 }])
                          }, null, 2),
                          e("span", null, f(u(B)(o.content).length > 0 ? `${u(B)(o.content).length} 变量` : "Prompt"), 1)
                        ]),
                        e("button", {
                          type: "button",
                          class: C(["bp-compact-star", { active: o.pinned }]),
                          title: o.pinned ? "取消置顶" : "星标置顶",
                          onClick: h((g) => Ve(o.id), ["stop"])
                        }, [
                          e("span", null, f(o.pinned ? "★" : "☆"), 1),
                          o.useCount ? (a(), r("span", qs, f(o.useCount), 1)) : y("", !0)
                        ], 10, Zs)
                      ]),
                      e("div", Ws, [
                        u(l).copySuccessId === o.id ? (a(), r("span", Xs, "已复制")) : (a(), r("span", en, f(u(Qt)(o.updatedAt)), 1))
                      ])
                    ])
                  ], 64)) : (a(), r(m, { key: 1 }, [
                    e("div", tn, [
                      e("div", on, [
                        e("button", {
                          type: "button",
                          class: C(["bp-pin-btn", { active: o.pinned }]),
                          title: o.pinned ? "取消置顶" : "星标置顶",
                          onClick: h((g) => Ve(o.id), ["stop"])
                        }, f(o.pinned ? "★" : "☆"), 11, sn),
                        e("h4", {
                          class: "bp-card-title",
                          title: o.title
                        }, f(o.title), 9, nn)
                      ]),
                      e("div", ln, [
                        e("button", {
                          type: "button",
                          class: "bp-action-btn edit",
                          title: "编辑提示词",
                          onClick: h((g) => fe(o), ["stop"])
                        }, "✏️", 8, an),
                        e("button", {
                          type: "button",
                          class: "bp-action-btn delete",
                          title: "删除提示词",
                          onClick: h((g) => Ee(o.id), ["stop"])
                        }, "🗑️", 8, rn)
                      ])
                    ]),
                    o.description ? (a(), r("p", dn, f(o.description), 1)) : y("", !0),
                    e("div", {
                      class: "bp-card-preview",
                      title: o.content
                    }, [
                      e("pre", null, [
                        e("code", null, f(o.content), 1)
                      ])
                    ], 8, cn),
                    u(B)(o.content).length > 0 ? (a(), r("div", un, [
                      t[81] || (t[81] = e("span", { class: "bp-vars-hint" }, "变量:", -1)),
                      (a(!0), r(m, null, x(u(B)(o.content), (g) => (a(), r("span", {
                        key: g,
                        class: "bp-var-pill",
                        title: `在无模态侧栏中填充: ${g}`,
                        onClick: h((U) => de(o), ["stop"])
                      }, " {{" + f(g) + "}} ", 9, pn))), 128))
                    ])) : y("", !0),
                    e("div", bn, [
                      e("div", gn, [
                        (a(!0), r(m, null, x(o.tags, (g) => (a(), r("span", {
                          key: g,
                          class: "bp-tag-micro",
                          onClick: h((U) => ve(g), ["stop"])
                        }, "#" + f(g), 9, vn))), 128))
                      ]),
                      e("div", fn, [
                        u(l).copySuccessId === o.id ? (a(), r("span", yn, "✓ 已复制!")) : y("", !0),
                        u(B)(o.content).length > 0 ? (a(), r("button", {
                          key: 1,
                          type: "button",
                          class: "bp-btn-use",
                          title: "填充变量并复制",
                          onClick: h((g) => de(o), ["stop"])
                        }, " ⚡ 填充使用 ", 8, mn)) : y("", !0),
                        e("button", {
                          type: "button",
                          class: C(["bp-btn-copy", { success: u(l).copySuccessId === o.id }]),
                          title: "直接复制提示词文本",
                          onClick: h((g) => Be(o), ["stop"])
                        }, f(u(l).copySuccessId === o.id ? "已复制" : "复制"), 11, kn)
                      ])
                    ])
                  ], 64))
                ], 10, Vs))), 128))
              ]))
            ])) : v.value === "articles" ? (a(), r("main", hn, [
              e("div", Cn, [
                e("div", wn, [
                  e("span", null, [
                    t[82] || (t[82] = $("共 ", -1)),
                    e("strong", null, f(ye.value.length), 1),
                    t[83] || (t[83] = $(" 篇文章", -1))
                  ]),
                  u(d).selectedTag ? (a(), r("span", _n, [
                    $(" 标签: #" + f(u(d).selectedTag) + " ", 1),
                    e("button", {
                      type: "button",
                      class: "bp-tag-close",
                      onClick: t[25] || (t[25] = (o) => u(d).selectedTag = null)
                    }, "✕")
                  ])) : y("", !0)
                ])
              ]),
              ye.value.length === 0 ? (a(), r("div", An, [
                s.embedded ? (a(), r("div", Sn, [...t[84] || (t[84] = [
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
                ])])) : (a(), r("div", $n, "📑")),
                e("h3", xn, f(ne.value.trim() || u(d).selectedTag ? "没有匹配的文章" : "暂无保存文章"), 1),
                e("p", In, f(ne.value.trim() || u(d).selectedTag ? "试试更换搜索词或清除标签筛选。" : "把有价值的深度长文、技术资料或视频分析笔记存在这里，随时离线阅读。"), 1),
                e("button", {
                  type: "button",
                  class: "bp-btn bp-btn-primary bp-btn-indigo",
                  onClick: Le
                }, "保存文章")
              ])) : (a(), r("div", Bn, [
                (a(!0), r(m, null, x(ye.value, (o) => (a(), r("article", {
                  key: o.id,
                  class: C(["bp-card bp-card-article", {
                    "is-pinned": o.pinned,
                    "is-selected": u(d).editingArticle?.id === o.id || u(d).readingArticle?.id === o.id
                  }])
                }, [
                  e("div", Tn, [
                    e("div", Mn, [
                      e("button", {
                        type: "button",
                        class: C(["bp-pin-btn", { active: o.pinned }]),
                        title: o.pinned ? "取消置顶" : "星标置顶",
                        onClick: h((g) => _t(o.id), ["stop"])
                      }, f(o.pinned ? "★" : "☆"), 11, En),
                      e("h4", {
                        class: "bp-card-title",
                        title: o.title
                      }, f(o.title), 9, Vn)
                    ]),
                    e("div", Pn, [
                      o.url ? (a(), r("a", {
                        key: 0,
                        href: o.url,
                        target: "_blank",
                        rel: "noreferrer",
                        class: "bp-action-btn",
                        title: "在浏览器中打开原文"
                      }, " ↗ ", 8, Dn)) : y("", !0),
                      e("button", {
                        type: "button",
                        class: "bp-action-btn edit",
                        title: "编辑文章",
                        onClick: h((g) => kt(o), ["stop"])
                      }, [
                        s.embedded ? (a(), r("svg", Ln, [...t[85] || (t[85] = [
                          e("path", { d: "M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" }, null, -1)
                        ])])) : (a(), r(m, { key: 1 }, [
                          $("✏️")
                        ], 64))
                      ], 8, Nn),
                      e("button", {
                        type: "button",
                        class: "bp-action-btn delete",
                        title: "删除文章",
                        onClick: h((g) => wt(o.id), ["stop"])
                      }, [
                        s.embedded ? (a(), r("svg", On, [...t[86] || (t[86] = [
                          e("path", { d: "M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5" }, null, -1)
                        ])])) : (a(), r(m, { key: 1 }, [
                          $("🗑️")
                        ], 64))
                      ], 8, Rn)
                    ])
                  ]),
                  o.sourceName || o.updatedAt ? (a(), r("div", jn, [
                    o.sourceName ? (a(), r("span", Fn, f(s.embedded ? o.sourceName : `📰 ${o.sourceName}`), 1)) : y("", !0),
                    e("span", Un, f(s.embedded ? u(st)(o.updatedAt) : `🕒 ${u(st)(o.updatedAt)}`), 1)
                  ])) : y("", !0),
                  o.description ? (a(), r("p", Jn, f(o.description), 1)) : y("", !0),
                  e("div", zn, [
                    z(u(n), {
                      class: "bp-preview-md",
                      content: u(Yt)(o.content)
                    }, null, 8, ["content"])
                  ]),
                  e("div", Kn, [
                    e("div", Hn, [
                      (a(!0), r(m, null, x(o.tags, (g) => (a(), r("span", {
                        key: g,
                        class: "bp-tag-micro",
                        onClick: h((U) => Ie(g), ["stop"])
                      }, "#" + f(g), 9, Qn))), 128))
                    ]),
                    e("div", Yn, [
                      u(d).copySuccessId === o.id ? (a(), r("span", Gn, "✓ 已复制!")) : y("", !0),
                      e("button", {
                        type: "button",
                        class: "bp-btn-read",
                        title: "阅读全文",
                        onClick: h((g) => ht(o), ["stop"])
                      }, f(s.embedded ? "阅读全文" : "📖 阅读全文"), 9, Zn),
                      e("button", {
                        type: "button",
                        class: C(["bp-btn-copy", { success: u(d).copySuccessId === o.id }]),
                        title: "复制文章全文",
                        onClick: h((g) => Re(o), ["stop"])
                      }, f(u(d).copySuccessId === o.id ? "已复制" : "复制"), 11, qn)
                    ])
                  ])
                ], 2))), 128))
              ]))
            ])) : v.value === "stickers" ? (a(), r("main", Wn, [
              z(Lt, {
                "dock-owned": "",
                active: v.value === "stickers"
              }, null, 8, ["active"])
            ])) : y("", !0),
            z(ke, { name: "drawer-slide" }, {
              default: J(() => [
                u(l).isEditing && v.value === "prompts" ? (a(), r("aside", Xn, [
                  e("header", ei, [
                    e("h3", ti, f(u(l).editingPrompt?.id ? s.embedded ? "编辑提示词" : "✏️ 编辑提示词" : s.embedded ? "新建提示词" : "➕ 新建提示词"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "收起",
                      onClick: t[26] || (t[26] = (o) => u(A).closeEditor())
                    }, "✕")
                  ]),
                  e("div", oi, [
                    e("div", si, [
                      t[87] || (t[87] = e("label", { class: "bp-form-label" }, "提示词标题 *", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[27] || (t[27] = (o) => O.value = o),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：自研架构评审准则",
                        maxlength: "64"
                      }, null, 512), [
                        [S, O.value]
                      ])
                    ]),
                    e("div", ni, [
                      e("div", ii, [
                        t[88] || (t[88] = e("label", { class: "bp-form-label" }, "所属分组", -1)),
                        w(e("select", {
                          "onUpdate:modelValue": t[28] || (t[28] = (o) => G.value = o),
                          class: "bp-form-select"
                        }, [
                          (a(!0), r(m, null, x(Ne.value, (o) => (a(), r("option", {
                            key: o.id,
                            value: o.id
                          }, f(o.name), 9, li))), 128))
                        ], 512), [
                          [ze, G.value]
                        ])
                      ]),
                      e("div", ai, [
                        e("label", ri, [
                          w(e("input", {
                            "onUpdate:modelValue": t[29] || (t[29] = (o) => q.value = o),
                            type: "checkbox"
                          }, null, 512), [
                            [Ke, q.value]
                          ]),
                          t[89] || (t[89] = e("span", null, "星标置顶", -1))
                        ])
                      ])
                    ]),
                    e("div", di, [
                      t[90] || (t[90] = e("label", { class: "bp-form-label" }, "简介与用途（可选）", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[30] || (t[30] = (o) => Y.value = o),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "简短描述该 Prompt 适合什么场景",
                        maxlength: "128"
                      }, null, 512), [
                        [S, Y.value]
                      ])
                    ]),
                    e("div", ci, [
                      t[92] || (t[92] = e("div", { class: "bp-label-row" }, [
                        e("label", { class: "bp-form-label" }, "正文内容 *"),
                        e("span", { class: "bp-label-tip" }, [
                          $("支持 "),
                          e("code", null, "{{变量}}"),
                          $(" 动态占位符")
                        ])
                      ], -1)),
                      w(e("textarea", {
                        "onUpdate:modelValue": t[31] || (t[31] = (o) => P.value = o),
                        class: "bp-form-input bp-textarea-main",
                        placeholder: "在此输入完整的提示词内容..."
                      }, null, 512), [
                        [S, P.value]
                      ]),
                      Te.value.length > 0 ? (a(), r("div", ui, [
                        t[91] || (t[91] = e("span", null, "检测到变量：", -1)),
                        (a(!0), r(m, null, x(Te.value, (o) => (a(), r("span", {
                          key: o,
                          class: "bp-var-pill mini"
                        }, "{{" + f(o) + "}}", 1))), 128))
                      ])) : y("", !0)
                    ]),
                    e("div", pi, [
                      t[93] || (t[93] = e("label", { class: "bp-form-label" }, "标签（用逗号或空格隔开）", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[32] || (t[32] = (o) => Z.value = o),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：架构设计, 审查清单"
                      }, null, 512), [
                        [S, Z.value]
                      ])
                    ])
                  ]),
                  e("footer", bi, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[33] || (t[33] = (o) => u(A).closeEditor())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary",
                      onClick: ft
                    }, "保存提示词")
                  ])
                ])) : y("", !0)
              ]),
              _: 1
            }),
            z(ke, { name: "drawer-slide" }, {
              default: J(() => [
                u(l).isVariableDialogOpen && v.value === "prompts" ? (a(), r("aside", gi, [
                  e("header", vi, [
                    e("h3", fi, f(s.embedded ? "填充变量" : "⚡ 快速填充变量"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "关闭",
                      onClick: t[34] || (t[34] = (o) => u(A).closeVariableDialog())
                    }, "✕")
                  ]),
                  e("div", yi, [
                    e("p", mi, [
                      t[94] || (t[94] = $("正在使用：", -1)),
                      e("strong", null, f(u(l).variableTargetPrompt?.title), 1)
                    ]),
                    e("div", ki, [
                      (a(!0), r(m, null, x(u(l).variableFormValues, (o, g) => (a(), r("div", {
                        key: g,
                        class: "bp-form-group"
                      }, [
                        e("label", hi, "{{" + f(g) + "}}", 1),
                        w(e("textarea", {
                          "onUpdate:modelValue": (U) => u(l).variableFormValues[g] = U,
                          class: "bp-form-input bp-textarea-small",
                          placeholder: `请输入 ${g} 的具体内容...`,
                          rows: "2"
                        }, null, 8, Ci), [
                          [S, u(l).variableFormValues[g]]
                        ])
                      ]))), 128))
                    ]),
                    e("div", wi, [
                      t[95] || (t[95] = e("div", { class: "bp-preview-header" }, "实时合并预览", -1)),
                      e("pre", _i, [
                        e("code", null, f(vt.value), 1)
                      ])
                    ])
                  ]),
                  e("footer", Ai, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[35] || (t[35] = (o) => u(A).closeVariableDialog())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary",
                      onClick: gt
                    }, "一键复制填充内容")
                  ])
                ])) : y("", !0)
              ]),
              _: 1
            }),
            z(ke, { name: "drawer-slide" }, {
              default: J(() => [
                u(d).isEditing && v.value === "articles" ? (a(), r("aside", Si, [
                  e("header", $i, [
                    e("h3", xi, f(u(d).editingArticle?.id ? s.embedded ? "编辑文章" : "✏️ 编辑文章" : s.embedded ? "保存新文章" : "➕ 保存新文章"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "收起",
                      onClick: t[36] || (t[36] = (o) => u(I).closeEditor())
                    }, "✕")
                  ]),
                  e("div", Ii, [
                    e("div", Bi, [
                      t[96] || (t[96] = e("label", { class: "bp-form-label" }, "文章标题 *", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[37] || (t[37] = (o) => j.value = o),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：a16z 提出 B2A 经济架构深度解析",
                        maxlength: "128"
                      }, null, 512), [
                        [S, j.value]
                      ])
                    ]),
                    e("div", Ti, [
                      e("div", Mi, [
                        t[97] || (t[97] = e("label", { class: "bp-form-label" }, "所属分组", -1)),
                        w(e("select", {
                          "onUpdate:modelValue": t[38] || (t[38] = (o) => te.value = o),
                          class: "bp-form-select"
                        }, [
                          (a(!0), r(m, null, x(Fe.value, (o) => (a(), r("option", {
                            key: o.id,
                            value: o.id
                          }, f(o.name), 9, Ei))), 128))
                        ], 512), [
                          [ze, te.value]
                        ])
                      ]),
                      e("div", Vi, [
                        e("label", Pi, [
                          w(e("input", {
                            "onUpdate:modelValue": t[39] || (t[39] = (o) => se.value = o),
                            type: "checkbox"
                          }, null, 512), [
                            [Ke, se.value]
                          ]),
                          t[98] || (t[98] = e("span", null, "星标置顶", -1))
                        ])
                      ])
                    ]),
                    e("div", Di, [
                      e("div", Ni, [
                        t[99] || (t[99] = e("label", { class: "bp-form-label" }, "原文网址（可选）", -1)),
                        w(e("input", {
                          "onUpdate:modelValue": t[40] || (t[40] = (o) => W.value = o),
                          type: "url",
                          class: "bp-form-input",
                          placeholder: "https://..."
                        }, null, 512), [
                          [S, W.value]
                        ])
                      ]),
                      e("div", Li, [
                        t[100] || (t[100] = e("label", { class: "bp-form-label" }, "来源 / 作者（可选）", -1)),
                        w(e("input", {
                          "onUpdate:modelValue": t[41] || (t[41] = (o) => X.value = o),
                          type: "text",
                          class: "bp-form-input",
                          placeholder: "例如：a16z News"
                        }, null, 512), [
                          [S, X.value]
                        ])
                      ])
                    ]),
                    e("div", Ri, [
                      t[101] || (t[101] = e("label", { class: "bp-form-label" }, "核心摘要与推荐理由（可选）", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[42] || (t[42] = (o) => ee.value = o),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "一句话提炼文章核心看点...",
                        maxlength: "256"
                      }, null, 512), [
                        [S, ee.value]
                      ])
                    ]),
                    e("div", Oi, [
                      t[102] || (t[102] = e("label", { class: "bp-form-label" }, "文章正文内容 *", -1)),
                      w(e("textarea", {
                        "onUpdate:modelValue": t[43] || (t[43] = (o) => F.value = o),
                        class: "bp-form-input bp-textarea-main",
                        placeholder: "在此粘贴或撰写完整的文章长文本或 Markdown 内容..."
                      }, null, 512), [
                        [S, F.value]
                      ])
                    ]),
                    e("div", ji, [
                      t[103] || (t[103] = e("label", { class: "bp-form-label" }, "标签（用逗号或空格隔开）", -1)),
                      w(e("input", {
                        "onUpdate:modelValue": t[44] || (t[44] = (o) => oe.value = o),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：AI, 产业观察, 商业模式"
                      }, null, 512), [
                        [S, oe.value]
                      ])
                    ])
                  ]),
                  e("footer", Fi, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[45] || (t[45] = (o) => u(I).closeEditor())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary bp-btn-indigo",
                      onClick: Ct
                    }, "保存文章")
                  ])
                ])) : y("", !0)
              ]),
              _: 1
            }),
            z(u(i), {
              visible: u(d).isReading && v.value === "articles",
              embedded: s.embedded,
              article: u(d).readingArticle,
              onClose: t[46] || (t[46] = (o) => u(I).closeReader()),
              onCopy: Re
            }, null, 8, ["visible", "embedded", "article"])
          ])
        ], 2)
      ]),
      _: 2
    }, [
      s.embedded ? {
        name: "header-tabs",
        fn: J(() => [
          e("nav", Zt, [
            e("button", {
              type: "button",
              role: "tab",
              "aria-selected": v.value === "prompts",
              class: C(["bp-seg-tab", { active: v.value === "prompts" }]),
              onClick: t[0] || (t[0] = (o) => re("prompts"))
            }, [
              t[47] || (t[47] = e("span", null, "提示词", -1)),
              e("small", null, f(u(l).prompts.length), 1)
            ], 10, qt),
            e("button", {
              type: "button",
              role: "tab",
              "aria-selected": v.value === "articles",
              class: C(["bp-seg-tab", { active: v.value === "articles" }]),
              onClick: t[1] || (t[1] = (o) => re("articles"))
            }, [
              t[48] || (t[48] = e("span", null, "文章", -1)),
              e("small", null, f(u(d).articles.length), 1)
            ], 10, Wt),
            e("button", {
              type: "button",
              role: "tab",
              "aria-selected": v.value === "stickers",
              class: C(["bp-seg-tab", { active: v.value === "stickers" }]),
              onClick: t[2] || (t[2] = (o) => re("stickers"))
            }, [...t[49] || (t[49] = [
              e("span", null, "表情包", -1)
            ])], 10, Xt)
          ])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), Ji = /* @__PURE__ */ at(Ui, [["__scopeId", "data-v-d858a540"]]), Gi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ji
}, Symbol.toStringTag, { value: "Module" }));
export {
  Gi as B,
  st as f
};
