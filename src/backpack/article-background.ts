import type { PromptCategory, SavedArticleItem } from "./types";
import { ARTICLE_REVISION_KEY, parseBackpackRevision, StaleBackpackError, writeBackpackIfCurrent, type RevisionLocks } from "./revision-guard";
import {
  ARTICLES_STORAGE_KEY,
  ARTICLE_CATEGORIES_KEY,
  DEFAULT_ARTICLE_CATEGORIES
} from "./constants";

declare const chrome: any;

export async function saveArticleFromBackground(data: {
  title: string;
  content: string;
  url?: string;
  sourceName?: string;
  description?: string;
  categoryName?: string;
  tags?: string[];
  pinned?: boolean;
}): Promise<SavedArticleItem> {
  if (typeof chrome === "undefined" || !chrome.storage?.local) {
    throw new Error("chrome.storage.local 不可用");
  }
  if (typeof navigator === "undefined" || !navigator.locks) {
    throw new Error("浏览器不支持安全的资料库写入锁");
  }
  const now = Date.now();
  const articleId = `art-${now}-${Math.random().toString(36).slice(2, 7)}`;

  for (let attempt = 0; attempt < 3; attempt++) {
    const stored = await chrome.storage.local.get([ARTICLES_STORAGE_KEY, ARTICLE_CATEGORIES_KEY, ARTICLE_REVISION_KEY]);
    const currentRevision = parseBackpackRevision(stored?.[ARTICLE_REVISION_KEY]);
    const articles: SavedArticleItem[] = Array.isArray(stored?.[ARTICLES_STORAGE_KEY])
      ? [...stored[ARTICLES_STORAGE_KEY]]
      : [];
    const categories: PromptCategory[] = Array.isArray(stored?.[ARTICLE_CATEGORIES_KEY]) && stored[ARTICLE_CATEGORIES_KEY].length
      ? [...stored[ARTICLE_CATEGORIES_KEY]]
      : [...DEFAULT_ARTICLE_CATEGORIES];

    let categoryId = "default";
    const desiredCat = (data.categoryName || "").trim();
    if (desiredCat) {
      const existing = categories.find(c => c.name === desiredCat && c.id !== "all" && c.id !== "starred");
      if (existing) {
        categoryId = existing.id;
      } else {
        categoryId = `art-cat-${now}-${Math.random().toString(36).slice(2, 6)}`;
        categories.push({ id: categoryId, name: desiredCat, icon: "📑", isBuiltin: false });
      }
    }

    const newArticle: SavedArticleItem = {
      id: articleId,
      title: data.title.trim() || "未命名文章",
      content: data.content,
      url: data.url?.trim() || "",
      sourceName: data.sourceName?.trim() || "",
      description: data.description?.trim() || "",
      category: categoryId,
      tags: Array.isArray(data.tags) ? data.tags.filter(Boolean) : [],
      pinned: Boolean(data.pinned),
      createdAt: now,
      updatedAt: now,
    };
    articles.unshift(newArticle);

    try {
      await writeBackpackIfCurrent(chrome.storage.local, navigator.locks as unknown as RevisionLocks, ARTICLE_REVISION_KEY, currentRevision, {
        [ARTICLES_STORAGE_KEY]: articles,
        [ARTICLE_CATEGORIES_KEY]: categories,
      });
      return newArticle;
    } catch (err) {
      if (err instanceof StaleBackpackError && attempt < 2) continue;
      throw err;
    }
  }
  throw new Error("文章写入并发冲突，请稍后重试。");
}
