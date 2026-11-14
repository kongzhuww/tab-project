import { reactive, computed } from "vue";
import type { PromptCategory, SavedArticleItem, ArticleExportData } from "./types";
import { ARTICLE_REVISION_KEY, parseBackpackRevision, StaleBackpackError, writeBackpackIfCurrent, type RevisionLocks } from './revision-guard';
import {
  ARTICLES_STORAGE_KEY,
  ARTICLE_CATEGORIES_KEY,
  DEFAULT_ARTICLE_CATEGORIES
} from "./constants";

export interface ArticleBackpackState {
  articles: SavedArticleItem[];
  categories: PromptCategory[];
  activeCategoryId: string;
  selectedTag: string | null;
  selectedArticleId: string | null;
  isEditing: boolean;
  editingArticle: SavedArticleItem | null;
  isReading: boolean;
  readingArticle: SavedArticleItem | null;
  isLoading: boolean;
  copySuccessId: string | null;
  statusMessage: string;
}

export const articleState = reactive<ArticleBackpackState>({
  articles: [],
  categories: [...DEFAULT_ARTICLE_CATEGORIES],
  activeCategoryId: "all",
  selectedTag: null,
  selectedArticleId: null,
  isEditing: false,
  editingArticle: null,
  isReading: false,
  readingArticle: null,
  isLoading: false,
  copySuccessId: null,
  statusMessage: ''
});

let initialized = false;
let storedRevision = 0;
let writeQueue: Promise<unknown> = Promise.resolve();

function loadFromLocalStorage(): { articles: SavedArticleItem[]; categories: PromptCategory[] } | null {
  try {
    if (typeof localStorage === "undefined") return null;
    const rawArticles = localStorage.getItem(ARTICLES_STORAGE_KEY);
    const rawCategories = localStorage.getItem(ARTICLE_CATEGORIES_KEY);
    if (!rawArticles && !rawCategories) return null;
    const parsedArticles = rawArticles ? JSON.parse(rawArticles) : [];
    const parsedCategories = rawCategories ? JSON.parse(rawCategories) : null;
    return {
      articles: Array.isArray(parsedArticles) ? parsedArticles : [],
      categories: Array.isArray(parsedCategories) && parsedCategories.length ? parsedCategories : DEFAULT_ARTICLE_CATEGORIES
    };
  } catch {
    return null;
  }
}

function persistToLocalStorage(articles: SavedArticleItem[], categories: PromptCategory[]): void {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles));
    localStorage.setItem(ARTICLE_CATEGORIES_KEY, JSON.stringify(categories));
  } catch (err) {
    console.warn("[ArticleService] persistToLocalStorage failed", err);
  }
}

export const articleService = {
  get state() {
    return articleState;
  },

  async init(): Promise<void> {
    if (initialized) return;
    initialized = true;
    articleState.isLoading = true;

    // 1. 本地快速水合
    const local = loadFromLocalStorage();
    if (local) {
      articleState.articles = local.articles;
      if (local.categories?.length) articleState.categories = local.categories;
    }

    // 2. chrome.storage.local 校准
    try {
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        const stored = await chrome.storage.local.get([ARTICLES_STORAGE_KEY, ARTICLE_CATEGORIES_KEY, ARTICLE_REVISION_KEY]);
        storedRevision = parseBackpackRevision(stored?.[ARTICLE_REVISION_KEY]);
        if (stored?.[ARTICLES_STORAGE_KEY] && Array.isArray(stored[ARTICLES_STORAGE_KEY])) {
          articleState.articles = stored[ARTICLES_STORAGE_KEY];
        }
        if (stored?.[ARTICLE_CATEGORIES_KEY] && Array.isArray(stored[ARTICLE_CATEGORIES_KEY])) {
          articleState.categories = stored[ARTICLE_CATEGORIES_KEY];
        }
      } else if (!local) {
        persistToLocalStorage(articleState.articles, articleState.categories);
      }
    } catch (err) {
      console.warn("[ArticleService] init storage error:", err);
    } finally {
      articleState.isLoading = false;
    }
  },

  async save(): Promise<boolean> {
    const plainArticles = JSON.parse(JSON.stringify(articleState.articles));
    const plainCategories = JSON.parse(JSON.stringify(articleState.categories));
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      const operation = writeQueue.then(async () => {
        try {
          if (typeof navigator === 'undefined' || !navigator.locks) throw new Error('浏览器不支持安全的背包写入锁');
          storedRevision = await writeBackpackIfCurrent(chrome.storage.local, navigator.locks as unknown as RevisionLocks, ARTICLE_REVISION_KEY, storedRevision, {
            [ARTICLES_STORAGE_KEY]: plainArticles,
            [ARTICLE_CATEGORIES_KEY]: plainCategories
          });
          persistToLocalStorage(plainArticles, plainCategories);
          articleState.statusMessage = '';
          return true;
        } catch (err) {
          articleState.statusMessage = err instanceof StaleBackpackError
            ? '文章已在其他页面更改，当前修改未保存。请先导出本页内容，再刷新并核对。'
            : '文章保存失败，当前修改未保存。请先导出本页内容，再检查存储。';
          console.warn('[ArticleService] save failed', err);
          return false;
        }
      });
      writeQueue = operation;
      return operation;
    }
    persistToLocalStorage(plainArticles, plainCategories);
    return true;
  },

  createArticle(data: {
    title: string;
    content: string;
    url?: string;
    sourceName?: string;
    description?: string;
    category?: string;
    tags?: string[];
    pinned?: boolean;
  }): SavedArticleItem {
    const now = Date.now();
    const newArticle: SavedArticleItem = {
      id: `art-${now}-${Math.random().toString(36).slice(2, 7)}`,
      title: data.title.trim() || "未命名文章",
      content: data.content,
      url: data.url?.trim() || "",
      sourceName: data.sourceName?.trim() || "",
      description: data.description?.trim() || "",
      category: data.category || "default",
      tags: Array.isArray(data.tags) ? data.tags.filter(Boolean) : [],
      pinned: Boolean(data.pinned),
      createdAt: now,
      updatedAt: now
    };

    articleState.articles.unshift(newArticle);
    void this.save();
    return newArticle;
  },

  updateArticle(id: string, patch: Partial<Omit<SavedArticleItem, "id" | "createdAt">>): boolean {
    const index = articleState.articles.findIndex(a => a.id === id);
    if (index === -1) return false;

    const current = articleState.articles[index];
    articleState.articles[index] = {
      ...current,
      ...patch,
      updatedAt: Date.now()
    };
    void this.save();
    return true;
  },

  deleteArticle(id: string): boolean {
    const prevLen = articleState.articles.length;
    articleState.articles = articleState.articles.filter(a => a.id !== id);
    if (articleState.selectedArticleId === id) {
      articleState.selectedArticleId = null;
    }
    if (articleState.editingArticle?.id === id) {
      articleState.isEditing = false;
      articleState.editingArticle = null;
    }
    if (articleState.readingArticle?.id === id) {
      articleState.isReading = false;
      articleState.readingArticle = null;
    }
    if (articleState.articles.length !== prevLen) {
      void this.save();
      return true;
    }
    return false;
  },

  togglePin(id: string): void {
    const item = articleState.articles.find(a => a.id === id);
    if (item) {
      item.pinned = !item.pinned;
      item.updatedAt = Date.now();
      void this.save();
    }
  },

  async copyArticleText(item: SavedArticleItem): Promise<boolean> {
    const textToCopy = `${item.title}\n\n${item.description ? `${item.description}\n\n` : ""}${item.content}${item.url ? `\n\n原文：${item.url}` : ""}`;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      articleState.copySuccessId = item.id;
      setTimeout(() => {
        if (articleState.copySuccessId === item.id) {
          articleState.copySuccessId = null;
        }
      }, 1800);
      return true;
    } catch (err) {
      console.warn("[ArticleService] copy failed", err);
      return false;
    }
  },

  openEditor(item?: SavedArticleItem): void {
    articleState.isReading = false;
    if (item) {
      articleState.editingArticle = { ...item, tags: [...item.tags] };
    } else {
      articleState.editingArticle = {
        id: "",
        title: "",
        content: "",
        url: "",
        sourceName: "",
        description: "",
        category: articleState.activeCategoryId === "all" || articleState.activeCategoryId === "starred"
          ? "default"
          : articleState.activeCategoryId,
        tags: [],
        pinned: false,
        createdAt: 0,
        updatedAt: 0
      };
    }
    articleState.isEditing = true;
  },

  closeEditor(): void {
    articleState.isEditing = false;
    articleState.editingArticle = null;
  },

  openReader(item: SavedArticleItem): void {
    articleState.isEditing = false;
    articleState.readingArticle = item;
    articleState.isReading = true;
  },

  closeReader(): void {
    articleState.isReading = false;
    articleState.readingArticle = null;
  },

  saveEditorData(data: {
    title: string;
    content: string;
    url?: string;
    sourceName?: string;
    description?: string;
    category?: string;
    tags?: string[];
    pinned?: boolean;
  }): void {
    if (articleState.editingArticle?.id) {
      this.updateArticle(articleState.editingArticle.id, data);
    } else {
      this.createArticle(data);
    }
    this.closeEditor();
  },

  addCategory(name: string, icon = "📁"): boolean {
    const cleanName = name.trim();
    if (!cleanName) return false;
    if (articleState.categories.some(c => c.name === cleanName)) return false;

    const id = `cat-art-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    articleState.categories.push({ id, name: cleanName, icon, isBuiltin: false });
    void this.save();
    return true;
  },

  renameCategory(id: string, newName: string): boolean {
    const cleanName = newName.trim();
    if (!cleanName) return false;
    const cat = articleState.categories.find(c => c.id === id);
    if (!cat || cat.isBuiltin) return false;
    cat.name = cleanName;
    void this.save();
    return true;
  },

  deleteCategory(id: string): boolean {
    const cat = articleState.categories.find(c => c.id === id);
    if (!cat || cat.isBuiltin) return false;

    articleState.categories = articleState.categories.filter(c => c.id !== id);
    if (articleState.activeCategoryId === id) {
      articleState.activeCategoryId = "all";
    }
    for (const a of articleState.articles) {
      if (a.category === id) {
        a.category = "default";
      }
    }
    void this.save();
    return true;
  },

  exportBackup(): void {
    const payload: ArticleExportData = {
      version: 1,
      appName: "tab-project-articles",
      exportedAt: Date.now(),
      articles: articleState.articles,
      categories: articleState.categories
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `saved-articles-backup-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  importBackup(jsonString: string): { success: boolean; count: number; error?: string } {
    try {
      const data = JSON.parse(jsonString);
      if (!data || !Array.isArray(data.articles)) {
        return { success: false, count: 0, error: "导入文件格式不合规，缺少 articles 数组" };
      }

      let importedCount = 0;
      const existingIds = new Set(articleState.articles.map(a => a.id));
      const newArticles: SavedArticleItem[] = [];

      for (const item of data.articles) {
        if (!item || typeof item.title !== "string" || typeof item.content !== "string") {
          continue;
        }
        const validItem: SavedArticleItem = {
          id: item.id && !existingIds.has(item.id) ? item.id : `art-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: item.title.trim() || "未命名文章",
          content: item.content,
          url: typeof item.url === "string" ? item.url : "",
          sourceName: typeof item.sourceName === "string" ? item.sourceName : "",
          description: typeof item.description === "string" ? item.description : "",
          category: typeof item.category === "string" ? item.category : "default",
          tags: Array.isArray(item.tags) ? item.tags.map(String).filter(Boolean) : [],
          pinned: Boolean(item.pinned),
          createdAt: typeof item.createdAt === "number" ? item.createdAt : Date.now(),
          updatedAt: Date.now()
        };
        newArticles.push(validItem);
        existingIds.add(validItem.id);
        importedCount++;
      }

      if (importedCount === 0) {
        return { success: false, count: 0, error: "未在文件中找到有效文章条目" };
      }

      if (Array.isArray(data.categories)) {
        for (const cat of data.categories) {
          if (cat && cat.name && !articleState.categories.some(c => c.name === cat.name)) {
            articleState.categories.push({
              id: cat.id || `cat-art-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              name: String(cat.name).trim(),
              icon: typeof cat.icon === "string" ? cat.icon : "📁",
              isBuiltin: false
            });
          }
        }
      }

      articleState.articles = [...newArticles, ...articleState.articles];
      void this.save();
      return { success: true, count: importedCount };
    } catch (err: any) {
      return { success: false, count: 0, error: `解析 JSON 失败: ${err?.message || err}` };
    }
  }
};

export const filteredArticles = computed(() => {
  const categoryId = articleState.activeCategoryId;
  const tag = articleState.selectedTag;

  return articleState.articles.filter(item => {
    if (categoryId === "starred") {
      if (!item.pinned) return false;
    } else if (categoryId !== "all") {
      if (item.category !== categoryId) return false;
    }

    if (tag && !item.tags.includes(tag)) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.updatedAt - a.updatedAt;
  });
});

export const allArticleTags = computed(() => {
  const tags = new Set<string>();
  for (const a of articleState.articles) {
    if (Array.isArray(a.tags)) {
      for (const t of a.tags) {
        if (t.trim()) tags.add(t.trim());
      }
    }
  }
  return Array.from(tags);
});
