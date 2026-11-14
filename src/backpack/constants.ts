import type { PromptCategory, PromptItem, SavedArticleItem } from "./types";

export const BACKPACK_STORAGE_KEY = "logicweaver_prompt_backpack_v1";
export const BACKPACK_CATEGORIES_KEY = "logicweaver_prompt_backpack_categories_v1";

export const ARTICLES_STORAGE_KEY = "logicweaver_saved_articles_v1";
export const ARTICLE_CATEGORIES_KEY = "logicweaver_saved_article_categories_v1";

export const DEFAULT_PROMPT_CATEGORIES: PromptCategory[] = [
  { id: "all", name: "全部", icon: "🎒", isBuiltin: true },
  { id: "starred", name: "星标置顶", icon: "⭐", isBuiltin: true },
  { id: "default", name: "默认分组", icon: "📁", isBuiltin: false }
];

export const DEFAULT_ARTICLE_CATEGORIES: PromptCategory[] = [
  { id: "all", name: "全部", icon: "📑", isBuiltin: true },
  { id: "starred", name: "星标置顶", icon: "⭐", isBuiltin: true },
  { id: "default", name: "默认分组", icon: "📁", isBuiltin: false }
];

export const INITIAL_PRESET_PROMPTS: PromptItem[] = [];
export const INITIAL_PRESET_ARTICLES: SavedArticleItem[] = [];
