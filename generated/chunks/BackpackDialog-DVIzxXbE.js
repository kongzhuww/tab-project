import { r as Ke, s as N, d as Ct, B as _t, j as wt, H as j, u as p, o as u, i as e, e as b, t as f, f as m, A as S, l as h, F as _, g as x, y as At, k as P, n as I, h as w, m as $, p as ne, U as re, R as De, v as Re, b as y } from "./vendor-vue-BkY5-p5y.js";
import { A as St } from "./AppWindowFrame-Djt1Bcfh.js";
import { w as Oe } from "./window-manager.store-fHSi_Uh8.js";
import { aL as z, aM as G, aN as je, aO as V, aP as B, aQ as ze, aR as It } from "./view-styles-yuz8wQEV.js";
import { w as Ge, P as de, S as Ye, p as Qe, A as pe } from "./revision-guard-5IS-EcTI.js";
import { S as xt } from "./StickerBoard-BZGARh75.js";
import { _ as $t } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
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
function Ve(o, i) {
  return o ? o.replace(/\{\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}\}|\{([a-zA-Z0-9_\u4e00-\u9fa5-]+)\}/g, (n, l, v) => {
    const d = (l || v || "").trim();
    return i[d] !== void 0 && i[d] !== "" ? i[d] : n;
  }) : "";
}
const a = Ke({
  prompts: [],
  categories: [...je],
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
let Be = !1, ue = 0, Le = Promise.resolve();
const Tt = /* @__PURE__ */ new Set(["preset-code-review", "preset-prompt-enhancer", "preset-bilingual-polisher", "preset-summary-action"]), Et = /* @__PURE__ */ new Set(["coding", "writing", "productivity", "roleplay"]);
function ce(o, i) {
  const n = o.filter((d) => !Tt.has(d.id) && !d.id.startsWith("preset-"));
  let l = i.filter((d) => !Et.has(d.id));
  l.some((d) => d.id === "default") || l.push({ id: "default", name: "默认分组", icon: "📁", isBuiltin: !1 });
  const v = new Set(l.map((d) => d.id));
  for (const d of n)
    v.has(d.category) || (d.category = "default");
  return { prompts: n, categories: l };
}
function Pt() {
  try {
    if (typeof localStorage > "u") return null;
    const o = localStorage.getItem(G), i = localStorage.getItem(z);
    if (!o && !i) return null;
    const n = o ? JSON.parse(o) : [], l = i ? JSON.parse(i) : null;
    return ce(
      Array.isArray(n) ? n : [],
      Array.isArray(l) && l.length ? l : je
    );
  } catch {
    return null;
  }
}
function le(o, i) {
  try {
    if (typeof localStorage > "u") return;
    localStorage.setItem(G, JSON.stringify(o)), localStorage.setItem(z, JSON.stringify(i));
  } catch (n) {
    console.warn("[Backpack] persistToLocalStorage failed", n);
  }
}
const k = {
  get state() {
    return a;
  },
  async init() {
    if (Be) return;
    Be = !0, a.isLoading = !0;
    const o = Pt();
    o && o.prompts.length > 0 && (a.prompts = o.prompts, o.categories?.length && (a.categories = o.categories));
    try {
      if (typeof chrome < "u" && chrome.storage?.local) {
        const i = await chrome.storage.local.get([G, z, de]);
        ue = Qe(i?.[de]);
        const n = i?.[G] || a.prompts, l = i?.[z] || a.categories, v = ce(n, l);
        a.prompts = v.prompts, a.categories = v.categories, JSON.stringify(i?.[G]) !== JSON.stringify(v.prompts) || JSON.stringify(i?.[z]) !== JSON.stringify(v.categories) ? await this.save() : le(v.prompts, v.categories);
      } else {
        const i = ce(a.prompts, a.categories);
        a.prompts = i.prompts, a.categories = i.categories, le(a.prompts, a.categories);
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
      const n = Le.then(async () => {
        try {
          if (typeof navigator > "u" || !navigator.locks) throw new Error("浏览器不支持安全的背包写入锁");
          return ue = await Ge(chrome.storage.local, navigator.locks, de, ue, {
            [G]: o,
            [z]: i
          }), le(o, i), a.statusMessage = "", !0;
        } catch (l) {
          return a.statusMessage = l instanceof Ye ? "提示词已在其他页面更改，当前修改未保存。请先导出本页内容，再刷新并核对。" : "提示词保存失败，当前修改未保存。请先导出本页内容，再检查存储。", console.warn("[Backpack] save failed", l), !1;
        }
      });
      return Le = n, n;
    }
    return le(o, i), !0;
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
      const l = new Set(a.prompts.map((d) => d.id)), v = [];
      for (const d of i.prompts) {
        if (!d || typeof d.title != "string" || typeof d.content != "string")
          continue;
        const C = {
          id: d.id && !l.has(d.id) ? d.id : `prompt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: d.title.trim() || "未命名提示词",
          content: d.content,
          description: typeof d.description == "string" ? d.description : "",
          category: typeof d.category == "string" ? d.category : "coding",
          tags: Array.isArray(d.tags) ? d.tags.map(String).filter(Boolean) : [],
          pinned: !!d.pinned,
          createdAt: typeof d.createdAt == "number" ? d.createdAt : Date.now(),
          updatedAt: Date.now(),
          useCount: typeof d.useCount == "number" ? d.useCount : 0
        };
        v.push(C), l.add(C.id), n++;
      }
      if (n === 0)
        return { success: !1, count: 0, error: "未在文件中找到有效提示词条目" };
      if (Array.isArray(i.categories))
        for (const d of i.categories)
          d && d.name && !a.categories.some((C) => C.name === d.name) && a.categories.push({
            id: d.id || `cat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: String(d.name).trim(),
            icon: typeof d.icon == "string" ? d.icon : "📁",
            isBuiltin: !1
          });
      return a.prompts = [...v, ...a.prompts], this.save(), { success: !0, count: n };
    } catch (i) {
      return { success: !1, count: 0, error: `解析 JSON 失败: ${i?.message || i}` };
    }
  }
}, be = N(() => {
  const o = a.searchQuery.trim().toLowerCase(), i = a.activeCategoryId, n = a.selectedTag;
  return a.prompts.filter((l) => {
    if (i === "starred") {
      if (!l.pinned) return !1;
    } else if (i !== "all" && l.category !== i)
      return !1;
    if (n && !l.tags.includes(n))
      return !1;
    if (o) {
      const v = l.title.toLowerCase().includes(o), d = l.description?.toLowerCase().includes(o), C = l.content.toLowerCase().includes(o), T = l.tags.some((D) => D.toLowerCase().includes(o));
      if (!v && !d && !C && !T)
        return !1;
    }
    return !0;
  }).sort((l, v) => l.pinned && !v.pinned ? -1 : !l.pinned && v.pinned ? 1 : v.updatedAt - l.updatedAt);
}), Me = N(() => {
  const o = /* @__PURE__ */ new Set();
  for (const i of a.prompts)
    if (Array.isArray(i.tags))
      for (const n of i.tags)
        n.trim() && o.add(n.trim());
  return Array.from(o);
}), r = Ke({
  articles: [],
  categories: [...ze],
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
let Fe = !1, ge = 0, Ue = Promise.resolve();
function Nt() {
  try {
    if (typeof localStorage > "u") return null;
    const o = localStorage.getItem(B), i = localStorage.getItem(V);
    if (!o && !i) return null;
    const n = o ? JSON.parse(o) : [], l = i ? JSON.parse(i) : null;
    return {
      articles: Array.isArray(n) ? n : [],
      categories: Array.isArray(l) && l.length ? l : ze
    };
  } catch {
    return null;
  }
}
function fe(o, i) {
  try {
    if (typeof localStorage > "u") return;
    localStorage.setItem(B, JSON.stringify(o)), localStorage.setItem(V, JSON.stringify(i));
  } catch (n) {
    console.warn("[ArticleService] persistToLocalStorage failed", n);
  }
}
const A = {
  get state() {
    return r;
  },
  async init() {
    if (Fe) return;
    Fe = !0, r.isLoading = !0;
    const o = Nt();
    o && (r.articles = o.articles, o.categories?.length && (r.categories = o.categories));
    try {
      if (typeof chrome < "u" && chrome.storage?.local) {
        const i = await chrome.storage.local.get([B, V, pe]);
        ge = Qe(i?.[pe]), i?.[B] && Array.isArray(i[B]) && (r.articles = i[B]), i?.[V] && Array.isArray(i[V]) && (r.categories = i[V]);
      } else o || fe(r.articles, r.categories);
    } catch (i) {
      console.warn("[ArticleService] init storage error:", i);
    } finally {
      r.isLoading = !1;
    }
  },
  async save() {
    const o = JSON.parse(JSON.stringify(r.articles)), i = JSON.parse(JSON.stringify(r.categories));
    if (typeof chrome < "u" && chrome.storage?.local) {
      const n = Ue.then(async () => {
        try {
          if (typeof navigator > "u" || !navigator.locks) throw new Error("浏览器不支持安全的背包写入锁");
          return ge = await Ge(chrome.storage.local, navigator.locks, pe, ge, {
            [B]: o,
            [V]: i
          }), fe(o, i), r.statusMessage = "", !0;
        } catch (l) {
          return r.statusMessage = l instanceof Ye ? "文章已在其他页面更改，当前修改未保存。请先导出本页内容，再刷新并核对。" : "文章保存失败，当前修改未保存。请先导出本页内容，再检查存储。", console.warn("[ArticleService] save failed", l), !1;
        }
      });
      return Ue = n, n;
    }
    return fe(o, i), !0;
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
      const l = new Set(r.articles.map((d) => d.id)), v = [];
      for (const d of i.articles) {
        if (!d || typeof d.title != "string" || typeof d.content != "string")
          continue;
        const C = {
          id: d.id && !l.has(d.id) ? d.id : `art-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: d.title.trim() || "未命名文章",
          content: d.content,
          url: typeof d.url == "string" ? d.url : "",
          sourceName: typeof d.sourceName == "string" ? d.sourceName : "",
          description: typeof d.description == "string" ? d.description : "",
          category: typeof d.category == "string" ? d.category : "default",
          tags: Array.isArray(d.tags) ? d.tags.map(String).filter(Boolean) : [],
          pinned: !!d.pinned,
          createdAt: typeof d.createdAt == "number" ? d.createdAt : Date.now(),
          updatedAt: Date.now()
        };
        v.push(C), l.add(C.id), n++;
      }
      if (n === 0)
        return { success: !1, count: 0, error: "未在文件中找到有效文章条目" };
      if (Array.isArray(i.categories))
        for (const d of i.categories)
          d && d.name && !r.categories.some((C) => C.name === d.name) && r.categories.push({
            id: d.id || `cat-art-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: String(d.name).trim(),
            icon: typeof d.icon == "string" ? d.icon : "📁",
            isBuiltin: !1
          });
      return r.articles = [...v, ...r.articles], this.save(), { success: !0, count: n };
    } catch (i) {
      return { success: !1, count: 0, error: `解析 JSON 失败: ${i?.message || i}` };
    }
  }
}, ve = N(() => {
  const o = r.activeCategoryId, i = r.selectedTag;
  return r.articles.filter((n) => {
    if (o === "starred") {
      if (!n.pinned) return !1;
    } else if (o !== "all" && n.category !== o)
      return !1;
    return !(i && !n.tags.includes(i));
  }).sort((n, l) => n.pinned && !l.pinned ? -1 : !n.pinned && l.pinned ? 1 : l.updatedAt - n.updatedAt);
}), Je = N(() => {
  const o = /* @__PURE__ */ new Set();
  for (const i of r.articles)
    if (Array.isArray(i.tags))
      for (const n of i.tags)
        n.trim() && o.add(n.trim());
  return Array.from(o);
}), Dt = { class: "bp-top-actions" }, Rt = { class: "bp-container" }, Ot = {
  key: 0,
  class: "bp-alert-tip-bar"
}, Vt = {
  key: 1,
  class: "bp-alert-tip-bar",
  role: "alert"
}, Bt = {
  key: 2,
  class: "bp-alert-tip-bar",
  role: "alert"
}, Lt = { class: "bp-work-area" }, Mt = { class: "bp-bili-sidebar" }, Ft = { class: "bp-sidebar-toggle-action" }, Ut = { class: "bp-sidebar-toggle-chevron" }, Jt = { class: "bp-channels-list" }, Kt = ["onClick"], jt = { class: "bp-channel-main" }, zt = { class: "bp-channel-icon" }, Gt = { class: "bp-channel-text" }, Yt = { class: "bp-channel-badge" }, Qt = { class: "bp-sidebar-favorite-hub" }, Zt = {
  key: 0,
  class: "bp-add-category-box"
}, qt = { class: "bp-folder-list" }, Ht = {
  key: 0,
  class: "bp-folder-inline-edit"
}, Wt = ["onKeydown"], Xt = ["onClick"], es = ["onClick"], ts = { class: "bp-folder-icon" }, ss = ["title"], os = {
  key: 0,
  class: "bp-folder-badge"
}, ns = {
  key: 1,
  class: "bp-folder-badge"
}, is = {
  key: 2,
  class: "bp-folder-badge"
}, as = {
  key: 2,
  class: "bp-folder-actions"
}, rs = ["onClick"], ls = ["onClick"], cs = {
  key: 1,
  class: "bp-tags-container"
}, ds = { class: "bp-tags-cloud" }, ps = ["onClick"], us = { class: "bp-sidebar-favorite-hub bp-hub-article" }, bs = {
  key: 0,
  class: "bp-add-category-box"
}, gs = { class: "bp-folder-list" }, fs = {
  key: 0,
  class: "bp-folder-inline-edit"
}, vs = ["onKeydown"], ms = ["onClick"], ys = ["onClick"], hs = { class: "bp-folder-icon" }, ks = ["title"], Cs = {
  key: 0,
  class: "bp-folder-badge"
}, _s = {
  key: 1,
  class: "bp-folder-badge"
}, ws = {
  key: 2,
  class: "bp-folder-badge"
}, As = {
  key: 2,
  class: "bp-folder-actions"
}, Ss = ["onClick"], Is = ["onClick"], xs = {
  key: 1,
  class: "bp-tags-container"
}, $s = { class: "bp-tags-cloud" }, Ts = ["onClick"], Es = {
  key: 0,
  class: "bp-content-pane"
}, Ps = { class: "bp-pane-header" }, Ns = { class: "bp-result-stats" }, Ds = {
  key: 0,
  class: "bp-active-filter-badge"
}, Rs = {
  key: 0,
  class: "bp-empty-state"
}, Os = {
  key: 1,
  class: "bp-card-grid"
}, Vs = { class: "bp-card-header" }, Bs = { class: "bp-card-title-group" }, Ls = ["title", "onClick"], Ms = ["title"], Fs = { class: "bp-card-actions" }, Us = ["onClick"], Js = ["onClick"], Ks = {
  key: 0,
  class: "bp-card-desc"
}, js = ["title"], zs = {
  key: 1,
  class: "bp-card-vars"
}, Gs = ["title", "onClick"], Ys = { class: "bp-card-footer" }, Qs = { class: "bp-card-tags" }, Zs = ["onClick"], qs = { class: "bp-card-button-row" }, Hs = {
  key: 0,
  class: "bp-copied-tip"
}, Ws = ["onClick"], Xs = ["onClick"], eo = {
  key: 1,
  class: "bp-content-pane"
}, to = { class: "bp-pane-header" }, so = { class: "bp-result-stats" }, oo = {
  key: 0,
  class: "bp-active-filter-badge bp-badge-indigo"
}, no = {
  key: 0,
  class: "bp-empty-state"
}, io = {
  key: 1,
  class: "bp-card-grid"
}, ao = { class: "bp-card-header" }, ro = { class: "bp-card-title-group" }, lo = ["title", "onClick"], co = ["title"], po = { class: "bp-card-actions" }, uo = ["href"], bo = ["onClick"], go = ["onClick"], fo = {
  key: 0,
  class: "bp-article-meta-line"
}, vo = {
  key: 0,
  class: "bp-article-source"
}, mo = { class: "bp-article-date" }, yo = {
  key: 1,
  class: "bp-card-desc"
}, ho = ["title"], ko = { class: "bp-card-footer" }, Co = { class: "bp-card-tags" }, _o = ["onClick"], wo = { class: "bp-card-button-row" }, Ao = {
  key: 0,
  class: "bp-copied-tip"
}, So = ["onClick"], Io = ["onClick"], xo = {
  key: 2,
  class: "bp-content-pane bp-stickers-wrapper"
}, $o = {
  key: 0,
  class: "bp-side-drawer"
}, To = { class: "bp-drawer-header" }, Eo = { class: "bp-drawer-title" }, Po = { class: "bp-drawer-body" }, No = { class: "bp-form-group" }, Do = { class: "bp-form-row" }, Ro = { class: "bp-form-group flex-1" }, Oo = ["value"], Vo = { class: "bp-form-group bp-form-checkbox-group" }, Bo = { class: "bp-checkbox-label" }, Lo = { class: "bp-form-group" }, Mo = { class: "bp-form-group flex-fill" }, Fo = {
  key: 0,
  class: "bp-detected-vars"
}, Uo = { class: "bp-form-group" }, Jo = { class: "bp-drawer-footer" }, Ko = {
  key: 0,
  class: "bp-side-drawer"
}, jo = { class: "bp-drawer-header" }, zo = { class: "bp-drawer-body" }, Go = { class: "bp-drawer-desc" }, Yo = { class: "bp-vars-form" }, Qo = { class: "bp-form-label" }, Zo = ["onUpdate:modelValue", "placeholder"], qo = { class: "bp-preview-box" }, Ho = { class: "bp-preview-text" }, Wo = { class: "bp-drawer-footer" }, Xo = {
  key: 0,
  class: "bp-side-drawer bp-drawer-article"
}, en = { class: "bp-drawer-header" }, tn = { class: "bp-drawer-title" }, sn = { class: "bp-drawer-body" }, on = { class: "bp-form-group" }, nn = { class: "bp-form-row" }, an = { class: "bp-form-group flex-1" }, rn = ["value"], ln = { class: "bp-form-group bp-form-checkbox-group" }, cn = { class: "bp-checkbox-label" }, dn = { class: "bp-form-row" }, pn = { class: "bp-form-group flex-1" }, un = { class: "bp-form-group flex-1" }, bn = { class: "bp-form-group" }, gn = { class: "bp-form-group flex-fill" }, fn = { class: "bp-form-group" }, vn = { class: "bp-drawer-footer" }, mn = {
  key: 0,
  class: "bp-side-drawer bp-reader-drawer"
}, yn = { class: "bp-drawer-header" }, hn = { class: "bp-reader-head-info" }, kn = {
  key: 0,
  class: "bp-reader-source"
}, Cn = { class: "bp-drawer-body bp-reader-body" }, _n = { class: "bp-reader-title" }, wn = { class: "bp-reader-meta" }, An = { key: 0 }, Sn = { key: 1 }, In = ["href"], xn = {
  key: 0,
  class: "bp-reader-quote"
}, $n = { class: "bp-reader-text" }, Tn = { class: "bp-drawer-footer" }, En = /* @__PURE__ */ Ct({
  __name: "BackpackDialog",
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
    ], n = y("prompts"), l = y(!1), v = y(!1), d = y(""), C = y(null), T = y(""), D = y(!1), ae = y(""), L = y(null), M = y(""), me = y(null), ye = y(null), F = y(""), U = y(""), R = y(""), Y = y(""), Q = y("default"), Z = y(""), q = y(!1), J = y(""), K = y(""), H = y(""), W = y(""), X = y(""), ee = y("default"), te = y(""), se = y(!1);
    _t(() => {
      k.init(), A.init();
    });
    function Ze() {
      l.value = !l.value;
    }
    function qe(c) {
      n.value = c, a.isEditing = !1, a.isVariableDialogOpen = !1, r.isEditing = !1, r.isReading = !1;
    }
    function He(c) {
      a.activeCategoryId = c;
    }
    function he(c) {
      a.selectedTag = a.selectedTag === c ? null : c;
    }
    function We(c) {
      r.activeCategoryId = c;
    }
    function ke(c) {
      r.selectedTag = r.selectedTag === c ? null : c;
    }
    function Xe() {
      Oe.close("backpack");
    }
    function et() {
      Oe.minimize("backpack");
    }
    function tt(c) {
      k.copyPromptText(c);
    }
    function Ce(c) {
      a.isEditing = !1, k.openVariableDialog(c);
    }
    function st() {
      if (!a.variableTargetPrompt) return;
      const c = Ve(
        a.variableTargetPrompt.content,
        a.variableFormValues
      );
      k.copyPromptText(a.variableTargetPrompt, c), k.closeVariableDialog();
    }
    const ot = N(() => a.variableTargetPrompt ? Ve(
      a.variableTargetPrompt.content,
      a.variableFormValues
    ) : ""), _e = N(() => ie(R.value));
    function we() {
      a.isVariableDialogOpen = !1, U.value = "", R.value = "", Y.value = "", Q.value = a.activeCategoryId === "all" || a.activeCategoryId === "starred" ? Ie.value[0]?.id || "default" : a.activeCategoryId, Z.value = "", q.value = !1, k.openEditor();
    }
    function nt(c) {
      a.isVariableDialogOpen = !1, U.value = c.title, R.value = c.content, Y.value = c.description || "", Q.value = c.category, Z.value = c.tags.join(", "), q.value = !!c.pinned, k.openEditor(c);
    }
    function it() {
      if (!U.value.trim() && !R.value.trim()) return;
      const c = Z.value.split(/[,，\s]+/).map((t) => t.trim()).filter(Boolean);
      k.saveEditorData({
        title: U.value.trim() || "未命名提示词",
        content: R.value,
        description: Y.value.trim(),
        category: Q.value || "default",
        tags: c,
        pinned: q.value
      });
    }
    function at(c) {
      typeof window < "u" && !window.confirm("确定要删除这条提示词吗？") || k.deletePrompt(c);
    }
    function rt(c) {
      k.togglePin(c);
    }
    function Ae() {
      const c = d.value.trim();
      c && k.addCategory(c) && (d.value = "", v.value = !1);
    }
    function lt(c) {
      C.value = c.id, T.value = c.name;
    }
    function Se(c) {
      T.value.trim() && k.renameCategory(c, T.value.trim()), C.value = null, T.value = "";
    }
    function ct(c) {
      typeof window < "u" && !window.confirm(`确定删除分组「${c.name}」吗？组内提示词将归入默认分组。`) || k.deleteCategory(c.id);
    }
    const Ie = N(() => a.categories.filter((c) => c.id !== "all" && c.id !== "starred"));
    function xe() {
      r.isReading = !1, J.value = "", K.value = "", H.value = "", W.value = "", X.value = "", ee.value = r.activeCategoryId === "all" || r.activeCategoryId === "starred" ? Pe.value[0]?.id || "default" : r.activeCategoryId, te.value = "", se.value = !1, A.openEditor();
    }
    function dt(c) {
      r.isReading = !1, J.value = c.title, K.value = c.content, H.value = c.url || "", W.value = c.sourceName || "", X.value = c.description || "", ee.value = c.category, te.value = c.tags.join(", "), se.value = !!c.pinned, A.openEditor(c);
    }
    function pt(c) {
      A.openReader(c);
    }
    function ut() {
      if (!J.value.trim() && !K.value.trim()) return;
      const c = te.value.split(/[,，\s]+/).map((t) => t.trim()).filter(Boolean);
      A.saveEditorData({
        title: J.value.trim() || "未命名文章",
        content: K.value,
        url: H.value.trim(),
        sourceName: W.value.trim(),
        description: X.value.trim(),
        category: ee.value || "default",
        tags: c,
        pinned: se.value
      });
    }
    function bt(c) {
      typeof window < "u" && !window.confirm("确定要删除这篇保存的文章吗？") || A.deleteArticle(c);
    }
    function gt(c) {
      A.togglePin(c);
    }
    function $e(c) {
      A.copyArticleText(c);
    }
    function Te() {
      const c = ae.value.trim();
      c && A.addCategory(c) && (ae.value = "", D.value = !1);
    }
    function ft(c) {
      L.value = c.id, M.value = c.name;
    }
    function Ee(c) {
      M.value.trim() && A.renameCategory(c, M.value.trim()), L.value = null, M.value = "";
    }
    function vt(c) {
      typeof window < "u" && !window.confirm(`确定删除分组「${c.name}」吗？组内文章将归入默认分组。`) || A.deleteCategory(c.id);
    }
    const Pe = N(() => r.categories.filter((c) => c.id !== "all" && c.id !== "starred"));
    function mt() {
      me.value?.click();
    }
    function yt() {
      ye.value?.click();
    }
    function ht(c) {
      const t = c.target, s = t.files?.[0];
      if (!s) return;
      const g = new FileReader();
      g.onload = (E) => {
        const oe = E.target?.result;
        if (oe) {
          const O = k.importBackup(oe);
          F.value = O.success ? `成功导入 ${O.count} 条提示词！` : O.error || "导入失败", setTimeout(() => {
            F.value = "";
          }, 3500);
        }
        t.value = "";
      }, g.readAsText(s);
    }
    function kt(c) {
      const t = c.target, s = t.files?.[0];
      if (!s) return;
      const g = new FileReader();
      g.onload = (E) => {
        const oe = E.target?.result;
        if (oe) {
          const O = A.importBackup(oe);
          F.value = O.success ? `成功导入 ${O.count} 篇文章！` : O.error || "导入失败", setTimeout(() => {
            F.value = "";
          }, 3500);
        }
        t.value = "";
      }, g.readAsText(s);
    }
    function Ne(c) {
      if (!c) return "";
      const t = new Date(c);
      return `${t.getMonth() + 1}/${t.getDate()}`;
    }
    return (c, t) => (u(), wt(St, {
      id: "backpack-workspace-dialog",
      "window-id": "backpack",
      title: "背包工作台",
      icon: "🎒",
      visible: p(It).visible,
      "default-width": 980,
      "default-height": 660,
      "min-width": 740,
      "min-height": 500,
      "custom-class": "lw-backpack-window",
      onClose: Xe,
      onMinimize: et
    }, {
      "header-actions": j(() => [
        e("div", Dt, [
          n.value === "prompts" ? (u(), b(_, { key: 0 }, [
            e("button", {
              type: "button",
              class: S(["bp-btn bp-btn-primary", { active: p(a).isEditing }]),
              title: "新建提示词",
              onClick: we
            }, [...t[41] || (t[41] = [
              e("span", { class: "bp-icon" }, "➕", -1),
              e("span", null, "新建提示词", -1)
            ])], 2),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "导出备份",
              onClick: t[0] || (t[0] = (s) => p(k).exportBackup())
            }, [...t[42] || (t[42] = [
              e("span", { class: "bp-icon" }, "💾", -1),
              e("span", null, "导出", -1)
            ])]),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "从文件导入",
              onClick: mt
            }, [...t[43] || (t[43] = [
              e("span", { class: "bp-icon" }, "📥", -1),
              e("span", null, "导入", -1)
            ])]),
            e("input", {
              ref_key: "promptFileInputRef",
              ref: me,
              type: "file",
              accept: ".json",
              style: { display: "none" },
              onChange: ht
            }, null, 544)
          ], 64)) : n.value === "articles" ? (u(), b(_, { key: 1 }, [
            e("button", {
              type: "button",
              class: S(["bp-btn bp-btn-primary bp-btn-article-pri", { active: p(r).isEditing }]),
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
              onClick: t[1] || (t[1] = (s) => p(A).exportBackup())
            }, [...t[45] || (t[45] = [
              e("span", { class: "bp-icon" }, "💾", -1),
              e("span", null, "导出", -1)
            ])]),
            e("button", {
              type: "button",
              class: "bp-btn bp-btn-ghost",
              title: "从文件导入文章",
              onClick: yt
            }, [...t[46] || (t[46] = [
              e("span", { class: "bp-icon" }, "📥", -1),
              e("span", null, "导入", -1)
            ])]),
            e("input", {
              ref_key: "articleFileInputRef",
              ref: ye,
              type: "file",
              accept: ".json",
              style: { display: "none" },
              onChange: kt
            }, null, 544)
          ], 64)) : m("", !0)
        ])
      ]),
      default: j(() => [
        e("div", Rt, [
          F.value ? (u(), b("div", Ot, f(F.value), 1)) : m("", !0),
          p(a).statusMessage ? (u(), b("div", Vt, f(p(a).statusMessage), 1)) : m("", !0),
          p(r).statusMessage ? (u(), b("div", Bt, f(p(r).statusMessage), 1)) : m("", !0),
          e("div", Lt, [
            e("aside", Mt, [
              e("div", {
                class: S(["bp-sidebar-toggle-bar", { "is-collapsed": l.value }]),
                onClick: Ze
              }, [
                t[47] || (t[47] = e("div", { class: "bp-sidebar-toggle-title" }, [
                  e("span", { class: "bp-sidebar-toggle-icon" }, "⚡"),
                  e("strong", null, "快捷频道")
                ], -1)),
                e("div", Ft, [
                  e("span", null, f(l.value ? "展开" : "收起"), 1),
                  e("span", Ut, f(l.value ? "▾" : "▴"), 1)
                ])
              ], 2),
              h(e("div", Jt, [
                (u(), b(_, null, x(i, (s) => e("div", {
                  key: s.id,
                  class: S(["bp-channel-wrap", s.themeClass])
                }, [
                  e("button", {
                    type: "button",
                    class: S(["bp-channel-btn", { on: n.value === s.id }]),
                    onClick: (g) => qe(s.id)
                  }, [
                    e("div", jt, [
                      e("span", zt, f(s.icon), 1),
                      e("div", Gt, [
                        e("strong", null, f(s.title), 1),
                        e("small", null, f(s.subTitle), 1)
                      ])
                    ]),
                    e("span", Yt, f(s.badge), 1)
                  ], 10, Kt)
                ], 2)), 64))
              ], 512), [
                [At, !l.value]
              ]),
              n.value === "prompts" ? (u(), b(_, { key: 0 }, [
                e("div", Qt, [
                  t[48] || (t[48] = e("div", { class: "bp-hub-main" }, [
                    e("span", { class: "bp-hub-icon" }, "📁"),
                    e("div", { class: "bp-hub-text" }, [
                      e("strong", null, "提示词分组"),
                      e("small", null, "按自定义分组整理")
                    ])
                  ], -1)),
                  e("button", {
                    type: "button",
                    class: "bp-hub-add-btn",
                    title: "新增分组",
                    onClick: t[2] || (t[2] = (s) => v.value = !0)
                  }, "＋")
                ]),
                v.value ? (u(), b("div", Zt, [
                  h(e("input", {
                    "onUpdate:modelValue": t[3] || (t[3] = (s) => d.value = s),
                    type: "text",
                    class: "bp-add-cat-input",
                    placeholder: "分组名称...",
                    maxlength: "16",
                    autofocus: "",
                    onKeydown: [
                      P(Ae, ["enter"]),
                      t[4] || (t[4] = P((s) => v.value = !1, ["esc"]))
                    ]
                  }, null, 544), [
                    [I, d.value]
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini primary",
                    onClick: Ae
                  }, "✔"),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini",
                    onClick: t[5] || (t[5] = (s) => v.value = !1)
                  }, "✕")
                ])) : m("", !0),
                e("div", qt, [
                  (u(!0), b(_, null, x(p(a).categories, (s) => (u(), b("div", {
                    key: s.id,
                    class: S(["bp-folder-row", { active: p(a).activeCategoryId === s.id }])
                  }, [
                    C.value === s.id ? (u(), b("div", Ht, [
                      h(e("input", {
                        "onUpdate:modelValue": t[6] || (t[6] = (g) => T.value = g),
                        type: "text",
                        class: "bp-folder-rename-input",
                        maxlength: "16",
                        autofocus: "",
                        onKeydown: [
                          P((g) => Se(s.id), ["enter"]),
                          t[7] || (t[7] = P((g) => C.value = null, ["esc"]))
                        ]
                      }, null, 40, Wt), [
                        [I, T.value]
                      ]),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini primary",
                        onClick: (g) => Se(s.id)
                      }, "✔", 8, Xt),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini",
                        onClick: t[8] || (t[8] = (g) => C.value = null)
                      }, "✕")
                    ])) : (u(), b("button", {
                      key: 1,
                      type: "button",
                      class: "bp-folder-btn",
                      onClick: (g) => He(s.id)
                    }, [
                      e("span", ts, f(s.icon || "📁"), 1),
                      e("span", {
                        class: "bp-folder-name",
                        title: s.name
                      }, f(s.name), 9, ss),
                      s.id === "all" ? (u(), b("span", os, f(p(a).prompts.length), 1)) : s.id === "starred" ? (u(), b("span", ns, f(p(a).prompts.filter((g) => g.pinned).length), 1)) : (u(), b("span", is, f(p(a).prompts.filter((g) => g.category === s.id).length), 1))
                    ], 8, es)),
                    !s.isBuiltin && C.value !== s.id ? (u(), b("div", as, [
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn",
                        title: "重命名",
                        onClick: w((g) => lt(s), ["stop"])
                      }, "✏️", 8, rs),
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn danger",
                        title: "删除",
                        onClick: w((g) => ct(s), ["stop"])
                      }, "🗑️", 8, ls)
                    ])) : m("", !0)
                  ], 2))), 128))
                ]),
                p(Me).length > 0 ? (u(), b("div", cs, [
                  t[49] || (t[49] = e("div", { class: "bp-tags-title" }, "常用标签", -1)),
                  e("div", ds, [
                    (u(!0), b(_, null, x(p(Me), (s) => (u(), b("span", {
                      key: s,
                      class: S(["bp-tag-pill", { active: p(a).selectedTag === s }]),
                      onClick: (g) => he(s)
                    }, " #" + f(s), 11, ps))), 128))
                  ])
                ])) : m("", !0)
              ], 64)) : n.value === "articles" ? (u(), b(_, { key: 1 }, [
                e("div", us, [
                  t[50] || (t[50] = e("div", { class: "bp-hub-main" }, [
                    e("span", { class: "bp-hub-icon" }, "📚"),
                    e("div", { class: "bp-hub-text" }, [
                      e("strong", null, "文章分组"),
                      e("small", null, "文章多级分类整理")
                    ])
                  ], -1)),
                  e("button", {
                    type: "button",
                    class: "bp-hub-add-btn bp-btn-indigo",
                    title: "新增文章分组",
                    onClick: t[9] || (t[9] = (s) => D.value = !0)
                  }, "＋")
                ]),
                D.value ? (u(), b("div", bs, [
                  h(e("input", {
                    "onUpdate:modelValue": t[10] || (t[10] = (s) => ae.value = s),
                    type: "text",
                    class: "bp-add-cat-input bp-border-indigo",
                    placeholder: "分组名称...",
                    maxlength: "16",
                    autofocus: "",
                    onKeydown: [
                      P(Te, ["enter"]),
                      t[11] || (t[11] = P((s) => D.value = !1, ["esc"]))
                    ]
                  }, null, 544), [
                    [I, ae.value]
                  ]),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini primary bp-bg-indigo",
                    onClick: Te
                  }, "✔"),
                  e("button", {
                    type: "button",
                    class: "bp-btn-mini",
                    onClick: t[12] || (t[12] = (s) => D.value = !1)
                  }, "✕")
                ])) : m("", !0),
                e("div", gs, [
                  (u(!0), b(_, null, x(p(r).categories, (s) => (u(), b("div", {
                    key: s.id,
                    class: S(["bp-folder-row bp-row-indigo", { active: p(r).activeCategoryId === s.id }])
                  }, [
                    L.value === s.id ? (u(), b("div", fs, [
                      h(e("input", {
                        "onUpdate:modelValue": t[13] || (t[13] = (g) => M.value = g),
                        type: "text",
                        class: "bp-folder-rename-input",
                        maxlength: "16",
                        autofocus: "",
                        onKeydown: [
                          P((g) => Ee(s.id), ["enter"]),
                          t[14] || (t[14] = P((g) => L.value = null, ["esc"]))
                        ]
                      }, null, 40, vs), [
                        [I, M.value]
                      ]),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini primary bp-bg-indigo",
                        onClick: (g) => Ee(s.id)
                      }, "✔", 8, ms),
                      e("button", {
                        type: "button",
                        class: "bp-btn-mini",
                        onClick: t[15] || (t[15] = (g) => L.value = null)
                      }, "✕")
                    ])) : (u(), b("button", {
                      key: 1,
                      type: "button",
                      class: "bp-folder-btn",
                      onClick: (g) => We(s.id)
                    }, [
                      e("span", hs, f(s.icon || "📑"), 1),
                      e("span", {
                        class: "bp-folder-name",
                        title: s.name
                      }, f(s.name), 9, ks),
                      s.id === "all" ? (u(), b("span", Cs, f(p(r).articles.length), 1)) : s.id === "starred" ? (u(), b("span", _s, f(p(r).articles.filter((g) => g.pinned).length), 1)) : (u(), b("span", ws, f(p(r).articles.filter((g) => g.category === s.id).length), 1))
                    ], 8, ys)),
                    !s.isBuiltin && L.value !== s.id ? (u(), b("div", As, [
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn",
                        title: "重命名",
                        onClick: w((g) => ft(s), ["stop"])
                      }, "✏️", 8, Ss),
                      e("button", {
                        type: "button",
                        class: "bp-tool-btn danger",
                        title: "删除",
                        onClick: w((g) => vt(s), ["stop"])
                      }, "🗑️", 8, Is)
                    ])) : m("", !0)
                  ], 2))), 128))
                ]),
                p(Je).length > 0 ? (u(), b("div", xs, [
                  t[51] || (t[51] = e("div", { class: "bp-tags-title" }, "文章标签", -1)),
                  e("div", $s, [
                    (u(!0), b(_, null, x(p(Je), (s) => (u(), b("span", {
                      key: s,
                      class: S(["bp-tag-pill bp-tag-indigo", { active: p(r).selectedTag === s }]),
                      onClick: (g) => ke(s)
                    }, " #" + f(s), 11, Ts))), 128))
                  ])
                ])) : m("", !0)
              ], 64)) : m("", !0)
            ]),
            n.value === "prompts" ? (u(), b("main", Es, [
              e("div", Ps, [
                e("div", Ns, [
                  e("span", null, [
                    t[52] || (t[52] = $("共 ", -1)),
                    e("strong", null, f(p(be).length), 1),
                    t[53] || (t[53] = $(" 条提示词", -1))
                  ]),
                  p(a).selectedTag ? (u(), b("span", Ds, [
                    $(" 标签: #" + f(p(a).selectedTag) + " ", 1),
                    e("button", {
                      type: "button",
                      class: "bp-tag-close",
                      onClick: t[16] || (t[16] = (s) => p(a).selectedTag = null)
                    }, "✕")
                  ])) : m("", !0)
                ])
              ]),
              p(be).length === 0 ? (u(), b("div", Rs, [
                t[54] || (t[54] = e("div", { class: "bp-empty-icon" }, "🎒", -1)),
                t[55] || (t[55] = e("h3", { class: "bp-empty-title" }, "提示词背包空空如也", -1)),
                t[56] || (t[56] = e("p", { class: "bp-empty-desc" }, "创建你的第一个提示词，永久收纳属于你的 Prompt 宝库！", -1)),
                e("button", {
                  type: "button",
                  class: "bp-btn bp-btn-primary",
                  onClick: we
                }, "立即新建提示词")
              ])) : (u(), b("div", Os, [
                (u(!0), b(_, null, x(p(be), (s) => (u(), b("article", {
                  key: s.id,
                  class: S(["bp-card", {
                    "is-pinned": s.pinned,
                    "is-selected": p(a).editingPrompt?.id === s.id
                  }])
                }, [
                  e("div", Vs, [
                    e("div", Bs, [
                      e("button", {
                        type: "button",
                        class: S(["bp-pin-btn", { active: s.pinned }]),
                        title: s.pinned ? "取消置顶" : "星标置顶",
                        onClick: w((g) => rt(s.id), ["stop"])
                      }, f(s.pinned ? "★" : "☆"), 11, Ls),
                      e("h4", {
                        class: "bp-card-title",
                        title: s.title
                      }, f(s.title), 9, Ms)
                    ]),
                    e("div", Fs, [
                      e("button", {
                        type: "button",
                        class: "bp-action-btn edit",
                        title: "编辑提示词",
                        onClick: w((g) => nt(s), ["stop"])
                      }, "✏️", 8, Us),
                      e("button", {
                        type: "button",
                        class: "bp-action-btn delete",
                        title: "删除提示词",
                        onClick: w((g) => at(s.id), ["stop"])
                      }, "🗑️", 8, Js)
                    ])
                  ]),
                  s.description ? (u(), b("p", Ks, f(s.description), 1)) : m("", !0),
                  e("div", {
                    class: "bp-card-preview",
                    title: s.content
                  }, [
                    e("pre", null, [
                      e("code", null, f(s.content), 1)
                    ])
                  ], 8, js),
                  p(ie)(s.content).length > 0 ? (u(), b("div", zs, [
                    t[57] || (t[57] = e("span", { class: "bp-vars-hint" }, "变量:", -1)),
                    (u(!0), b(_, null, x(p(ie)(s.content), (g) => (u(), b("span", {
                      key: g,
                      class: "bp-var-pill",
                      title: `在无模态侧栏中填充: ${g}`,
                      onClick: w((E) => Ce(s), ["stop"])
                    }, " {{" + f(g) + "}} ", 9, Gs))), 128))
                  ])) : m("", !0),
                  e("div", Ys, [
                    e("div", Qs, [
                      (u(!0), b(_, null, x(s.tags, (g) => (u(), b("span", {
                        key: g,
                        class: "bp-tag-micro",
                        onClick: w((E) => he(g), ["stop"])
                      }, "#" + f(g), 9, Zs))), 128))
                    ]),
                    e("div", qs, [
                      p(a).copySuccessId === s.id ? (u(), b("span", Hs, "✓ 已复制!")) : m("", !0),
                      p(ie)(s.content).length > 0 ? (u(), b("button", {
                        key: 1,
                        type: "button",
                        class: "bp-btn-use",
                        title: "填充变量并复制",
                        onClick: w((g) => Ce(s), ["stop"])
                      }, " ⚡ 填充使用 ", 8, Ws)) : m("", !0),
                      e("button", {
                        type: "button",
                        class: S(["bp-btn-copy", { success: p(a).copySuccessId === s.id }]),
                        title: "直接复制提示词文本",
                        onClick: w((g) => tt(s), ["stop"])
                      }, f(p(a).copySuccessId === s.id ? "已复制" : "复制"), 11, Xs)
                    ])
                  ])
                ], 2))), 128))
              ]))
            ])) : n.value === "articles" ? (u(), b("main", eo, [
              e("div", to, [
                e("div", so, [
                  e("span", null, [
                    t[58] || (t[58] = $("共 ", -1)),
                    e("strong", null, f(p(ve).length), 1),
                    t[59] || (t[59] = $(" 篇保存文章", -1))
                  ]),
                  p(r).selectedTag ? (u(), b("span", oo, [
                    $(" 标签: #" + f(p(r).selectedTag) + " ", 1),
                    e("button", {
                      type: "button",
                      class: "bp-tag-close",
                      onClick: t[17] || (t[17] = (s) => p(r).selectedTag = null)
                    }, "✕")
                  ])) : m("", !0)
                ])
              ]),
              p(ve).length === 0 ? (u(), b("div", no, [
                t[60] || (t[60] = e("div", { class: "bp-empty-icon" }, "📑", -1)),
                t[61] || (t[61] = e("h3", { class: "bp-empty-title" }, "文章收藏库空空如也", -1)),
                t[62] || (t[62] = e("p", { class: "bp-empty-desc" }, "在此保存精选长文、技术博客与深度报道，随时随地离线畅读！", -1)),
                e("button", {
                  type: "button",
                  class: "bp-btn bp-btn-primary bp-btn-indigo",
                  onClick: xe
                }, "立即保存第一篇文章")
              ])) : (u(), b("div", io, [
                (u(!0), b(_, null, x(p(ve), (s) => (u(), b("article", {
                  key: s.id,
                  class: S(["bp-card bp-card-article", {
                    "is-pinned": s.pinned,
                    "is-selected": p(r).editingArticle?.id === s.id || p(r).readingArticle?.id === s.id
                  }])
                }, [
                  e("div", ao, [
                    e("div", ro, [
                      e("button", {
                        type: "button",
                        class: S(["bp-pin-btn", { active: s.pinned }]),
                        title: s.pinned ? "取消置顶" : "星标置顶",
                        onClick: w((g) => gt(s.id), ["stop"])
                      }, f(s.pinned ? "★" : "☆"), 11, lo),
                      e("h4", {
                        class: "bp-card-title",
                        title: s.title
                      }, f(s.title), 9, co)
                    ]),
                    e("div", po, [
                      s.url ? (u(), b("a", {
                        key: 0,
                        href: s.url,
                        target: "_blank",
                        rel: "noreferrer",
                        class: "bp-action-btn",
                        title: "在浏览器中打开原文"
                      }, " ↗ ", 8, uo)) : m("", !0),
                      e("button", {
                        type: "button",
                        class: "bp-action-btn edit",
                        title: "编辑文章",
                        onClick: w((g) => dt(s), ["stop"])
                      }, "✏️", 8, bo),
                      e("button", {
                        type: "button",
                        class: "bp-action-btn delete",
                        title: "删除文章",
                        onClick: w((g) => bt(s.id), ["stop"])
                      }, "🗑️", 8, go)
                    ])
                  ]),
                  s.sourceName || s.updatedAt ? (u(), b("div", fo, [
                    s.sourceName ? (u(), b("span", vo, "📰 " + f(s.sourceName), 1)) : m("", !0),
                    e("span", mo, "🕒 " + f(Ne(s.updatedAt)), 1)
                  ])) : m("", !0),
                  s.description ? (u(), b("p", yo, f(s.description), 1)) : m("", !0),
                  e("div", {
                    class: "bp-card-preview bp-article-preview",
                    title: s.content
                  }, [
                    e("pre", null, [
                      e("code", null, f(s.content), 1)
                    ])
                  ], 8, ho),
                  e("div", ko, [
                    e("div", Co, [
                      (u(!0), b(_, null, x(s.tags, (g) => (u(), b("span", {
                        key: g,
                        class: "bp-tag-micro",
                        onClick: w((E) => ke(g), ["stop"])
                      }, "#" + f(g), 9, _o))), 128))
                    ]),
                    e("div", wo, [
                      p(r).copySuccessId === s.id ? (u(), b("span", Ao, "✓ 已复制!")) : m("", !0),
                      e("button", {
                        type: "button",
                        class: "bp-btn-read",
                        title: "阅读全文",
                        onClick: w((g) => pt(s), ["stop"])
                      }, " 📖 阅读全文 ", 8, So),
                      e("button", {
                        type: "button",
                        class: S(["bp-btn-copy", { success: p(r).copySuccessId === s.id }]),
                        title: "复制文章全文",
                        onClick: w((g) => $e(s), ["stop"])
                      }, f(p(r).copySuccessId === s.id ? "已复制" : "复制"), 11, Io)
                    ])
                  ])
                ], 2))), 128))
              ]))
            ])) : n.value === "stickers" ? (u(), b("main", xo, [
              ne(xt, {
                "dock-owned": "",
                active: n.value === "stickers"
              }, null, 8, ["active"])
            ])) : m("", !0),
            ne(re, { name: "drawer-slide" }, {
              default: j(() => [
                p(a).isEditing && n.value === "prompts" ? (u(), b("aside", $o, [
                  e("header", To, [
                    e("h3", Eo, f(p(a).editingPrompt?.id ? "✏️ 编辑提示词" : "➕ 新建提示词"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "收起",
                      onClick: t[18] || (t[18] = (s) => p(k).closeEditor())
                    }, "✕")
                  ]),
                  e("div", Po, [
                    e("div", No, [
                      t[63] || (t[63] = e("label", { class: "bp-form-label" }, "提示词标题 *", -1)),
                      h(e("input", {
                        "onUpdate:modelValue": t[19] || (t[19] = (s) => U.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：自研架构评审准则",
                        maxlength: "64"
                      }, null, 512), [
                        [I, U.value]
                      ])
                    ]),
                    e("div", Do, [
                      e("div", Ro, [
                        t[64] || (t[64] = e("label", { class: "bp-form-label" }, "所属分组", -1)),
                        h(e("select", {
                          "onUpdate:modelValue": t[20] || (t[20] = (s) => Q.value = s),
                          class: "bp-form-select"
                        }, [
                          (u(!0), b(_, null, x(Ie.value, (s) => (u(), b("option", {
                            key: s.id,
                            value: s.id
                          }, f(s.name), 9, Oo))), 128))
                        ], 512), [
                          [De, Q.value]
                        ])
                      ]),
                      e("div", Vo, [
                        e("label", Bo, [
                          h(e("input", {
                            "onUpdate:modelValue": t[21] || (t[21] = (s) => q.value = s),
                            type: "checkbox"
                          }, null, 512), [
                            [Re, q.value]
                          ]),
                          t[65] || (t[65] = e("span", null, "星标置顶", -1))
                        ])
                      ])
                    ]),
                    e("div", Lo, [
                      t[66] || (t[66] = e("label", { class: "bp-form-label" }, "简介与用途（可选）", -1)),
                      h(e("input", {
                        "onUpdate:modelValue": t[22] || (t[22] = (s) => Y.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "简短描述该 Prompt 适合什么场景",
                        maxlength: "128"
                      }, null, 512), [
                        [I, Y.value]
                      ])
                    ]),
                    e("div", Mo, [
                      t[68] || (t[68] = e("div", { class: "bp-label-row" }, [
                        e("label", { class: "bp-form-label" }, "正文内容 *"),
                        e("span", { class: "bp-label-tip" }, [
                          $("支持 "),
                          e("code", null, "{{变量}}"),
                          $(" 动态占位符")
                        ])
                      ], -1)),
                      h(e("textarea", {
                        "onUpdate:modelValue": t[23] || (t[23] = (s) => R.value = s),
                        class: "bp-form-input bp-textarea-main",
                        placeholder: "在此输入完整的提示词内容..."
                      }, null, 512), [
                        [I, R.value]
                      ]),
                      _e.value.length > 0 ? (u(), b("div", Fo, [
                        t[67] || (t[67] = e("span", null, "检测到变量：", -1)),
                        (u(!0), b(_, null, x(_e.value, (s) => (u(), b("span", {
                          key: s,
                          class: "bp-var-pill mini"
                        }, "{{" + f(s) + "}}", 1))), 128))
                      ])) : m("", !0)
                    ]),
                    e("div", Uo, [
                      t[69] || (t[69] = e("label", { class: "bp-form-label" }, "标签（用逗号或空格隔开）", -1)),
                      h(e("input", {
                        "onUpdate:modelValue": t[24] || (t[24] = (s) => Z.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：架构设计, 审查清单"
                      }, null, 512), [
                        [I, Z.value]
                      ])
                    ])
                  ]),
                  e("footer", Jo, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[25] || (t[25] = (s) => p(k).closeEditor())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary",
                      onClick: it
                    }, "保存提示词")
                  ])
                ])) : m("", !0)
              ]),
              _: 1
            }),
            ne(re, { name: "drawer-slide" }, {
              default: j(() => [
                p(a).isVariableDialogOpen && n.value === "prompts" ? (u(), b("aside", Ko, [
                  e("header", jo, [
                    t[70] || (t[70] = e("h3", { class: "bp-drawer-title" }, "⚡ 快速填充变量", -1)),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "关闭",
                      onClick: t[26] || (t[26] = (s) => p(k).closeVariableDialog())
                    }, "✕")
                  ]),
                  e("div", zo, [
                    e("p", Go, [
                      t[71] || (t[71] = $("正在使用：", -1)),
                      e("strong", null, f(p(a).variableTargetPrompt?.title), 1)
                    ]),
                    e("div", Yo, [
                      (u(!0), b(_, null, x(p(a).variableFormValues, (s, g) => (u(), b("div", {
                        key: g,
                        class: "bp-form-group"
                      }, [
                        e("label", Qo, "{{" + f(g) + "}}", 1),
                        h(e("textarea", {
                          "onUpdate:modelValue": (E) => p(a).variableFormValues[g] = E,
                          class: "bp-form-input bp-textarea-small",
                          placeholder: `请输入 ${g} 的具体内容...`,
                          rows: "2"
                        }, null, 8, Zo), [
                          [I, p(a).variableFormValues[g]]
                        ])
                      ]))), 128))
                    ]),
                    e("div", qo, [
                      t[72] || (t[72] = e("div", { class: "bp-preview-header" }, "实时合并预览", -1)),
                      e("pre", Ho, [
                        e("code", null, f(ot.value), 1)
                      ])
                    ])
                  ]),
                  e("footer", Wo, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[27] || (t[27] = (s) => p(k).closeVariableDialog())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary",
                      onClick: st
                    }, "一键复制填充内容")
                  ])
                ])) : m("", !0)
              ]),
              _: 1
            }),
            ne(re, { name: "drawer-slide" }, {
              default: j(() => [
                p(r).isEditing && n.value === "articles" ? (u(), b("aside", Xo, [
                  e("header", en, [
                    e("h3", tn, f(p(r).editingArticle?.id ? "✏️ 编辑文章" : "➕ 保存新文章"), 1),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "收起",
                      onClick: t[28] || (t[28] = (s) => p(A).closeEditor())
                    }, "✕")
                  ]),
                  e("div", sn, [
                    e("div", on, [
                      t[73] || (t[73] = e("label", { class: "bp-form-label" }, "文章标题 *", -1)),
                      h(e("input", {
                        "onUpdate:modelValue": t[29] || (t[29] = (s) => J.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：a16z 提出 B2A 经济架构深度解析",
                        maxlength: "128"
                      }, null, 512), [
                        [I, J.value]
                      ])
                    ]),
                    e("div", nn, [
                      e("div", an, [
                        t[74] || (t[74] = e("label", { class: "bp-form-label" }, "所属分组", -1)),
                        h(e("select", {
                          "onUpdate:modelValue": t[30] || (t[30] = (s) => ee.value = s),
                          class: "bp-form-select"
                        }, [
                          (u(!0), b(_, null, x(Pe.value, (s) => (u(), b("option", {
                            key: s.id,
                            value: s.id
                          }, f(s.name), 9, rn))), 128))
                        ], 512), [
                          [De, ee.value]
                        ])
                      ]),
                      e("div", ln, [
                        e("label", cn, [
                          h(e("input", {
                            "onUpdate:modelValue": t[31] || (t[31] = (s) => se.value = s),
                            type: "checkbox"
                          }, null, 512), [
                            [Re, se.value]
                          ]),
                          t[75] || (t[75] = e("span", null, "星标置顶", -1))
                        ])
                      ])
                    ]),
                    e("div", dn, [
                      e("div", pn, [
                        t[76] || (t[76] = e("label", { class: "bp-form-label" }, "原文网址（可选）", -1)),
                        h(e("input", {
                          "onUpdate:modelValue": t[32] || (t[32] = (s) => H.value = s),
                          type: "url",
                          class: "bp-form-input",
                          placeholder: "https://..."
                        }, null, 512), [
                          [I, H.value]
                        ])
                      ]),
                      e("div", un, [
                        t[77] || (t[77] = e("label", { class: "bp-form-label" }, "来源 / 作者（可选）", -1)),
                        h(e("input", {
                          "onUpdate:modelValue": t[33] || (t[33] = (s) => W.value = s),
                          type: "text",
                          class: "bp-form-input",
                          placeholder: "例如：a16z News"
                        }, null, 512), [
                          [I, W.value]
                        ])
                      ])
                    ]),
                    e("div", bn, [
                      t[78] || (t[78] = e("label", { class: "bp-form-label" }, "核心摘要与推荐理由（可选）", -1)),
                      h(e("input", {
                        "onUpdate:modelValue": t[34] || (t[34] = (s) => X.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "一句话提炼文章核心看点...",
                        maxlength: "256"
                      }, null, 512), [
                        [I, X.value]
                      ])
                    ]),
                    e("div", gn, [
                      t[79] || (t[79] = e("label", { class: "bp-form-label" }, "文章正文内容 *", -1)),
                      h(e("textarea", {
                        "onUpdate:modelValue": t[35] || (t[35] = (s) => K.value = s),
                        class: "bp-form-input bp-textarea-main",
                        placeholder: "在此粘贴或撰写完整的文章长文本或 Markdown 内容..."
                      }, null, 512), [
                        [I, K.value]
                      ])
                    ]),
                    e("div", fn, [
                      t[80] || (t[80] = e("label", { class: "bp-form-label" }, "标签（用逗号或空格隔开）", -1)),
                      h(e("input", {
                        "onUpdate:modelValue": t[36] || (t[36] = (s) => te.value = s),
                        type: "text",
                        class: "bp-form-input",
                        placeholder: "例如：AI, 产业观察, 商业模式"
                      }, null, 512), [
                        [I, te.value]
                      ])
                    ])
                  ]),
                  e("footer", vn, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[37] || (t[37] = (s) => p(A).closeEditor())
                    }, "取消"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary bp-btn-indigo",
                      onClick: ut
                    }, "保存文章")
                  ])
                ])) : m("", !0)
              ]),
              _: 1
            }),
            ne(re, { name: "drawer-slide" }, {
              default: j(() => [
                p(r).isReading && n.value === "articles" ? (u(), b("aside", mn, [
                  e("header", yn, [
                    e("div", hn, [
                      t[81] || (t[81] = e("span", { class: "bp-badge-pill" }, "📖 阅读器", -1)),
                      p(r).readingArticle?.sourceName ? (u(), b("span", kn, f(p(r).readingArticle.sourceName), 1)) : m("", !0)
                    ]),
                    e("button", {
                      type: "button",
                      class: "bp-btn-icon",
                      title: "关闭阅读器",
                      onClick: t[38] || (t[38] = (s) => p(A).closeReader())
                    }, "✕")
                  ]),
                  e("div", Cn, [
                    e("h2", _n, f(p(r).readingArticle?.title), 1),
                    e("div", wn, [
                      p(r).readingArticle?.sourceName ? (u(), b("span", An, "📰 " + f(p(r).readingArticle.sourceName), 1)) : m("", !0),
                      p(r).readingArticle?.updatedAt ? (u(), b("span", Sn, "🕒 " + f(Ne(p(r).readingArticle.updatedAt)), 1)) : m("", !0),
                      p(r).readingArticle?.url ? (u(), b("a", {
                        key: 2,
                        href: p(r).readingArticle.url,
                        target: "_blank",
                        rel: "noreferrer",
                        class: "bp-reader-link"
                      }, " 原文链接 ↗ ", 8, In)) : m("", !0)
                    ]),
                    p(r).readingArticle?.description ? (u(), b("blockquote", xn, " 💡 " + f(p(r).readingArticle.description), 1)) : m("", !0),
                    e("div", $n, [
                      e("pre", null, [
                        e("code", null, f(p(r).readingArticle?.content), 1)
                      ])
                    ])
                  ]),
                  e("footer", Tn, [
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-ghost",
                      onClick: t[39] || (t[39] = (s) => p(A).closeReader())
                    }, "关闭"),
                    e("button", {
                      type: "button",
                      class: "bp-btn bp-btn-primary bp-btn-indigo",
                      onClick: t[40] || (t[40] = (s) => p(r).readingArticle && $e(p(r).readingArticle))
                    }, " 一键复制全文 ")
                  ])
                ])) : m("", !0)
              ]),
              _: 1
            })
          ])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
}), Ln = /* @__PURE__ */ $t(En, [["__scopeId", "data-v-f3253c8d"]]);
export {
  Ln as default
};
