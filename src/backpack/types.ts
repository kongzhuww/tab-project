export interface PromptItem {
  id: string;
  title: string;
  content: string;
  description?: string;
  category: string;
  tags: string[];
  pinned?: boolean;
  createdAt: number;
  updatedAt: number;
  useCount?: number;
}

export interface SavedArticleItem {
  id: string;
  title: string;
  content: string;
  url?: string;
  sourceName?: string;
  description?: string;
  category: string;
  tags: string[];
  pinned?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface PromptCategory {
  id: string;
  name: string;
  icon?: string;
  isBuiltin?: boolean;
}

export interface PromptExportData {
  version: 1;
  exportedAt: number;
  appName: "tab-project-backpack";
  prompts: PromptItem[];
  categories?: PromptCategory[];
}

export interface ArticleExportData {
  version: 1;
  exportedAt: number;
  appName: "tab-project-articles";
  articles: SavedArticleItem[];
  categories?: PromptCategory[];
}
