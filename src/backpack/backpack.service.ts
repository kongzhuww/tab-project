import { reactive, computed } from "vue";
import type { PromptCategory, PromptItem, PromptExportData } from "./types";
import { parseBackpackRevision, PROMPT_REVISION_KEY, StaleBackpackError, writeBackpackIfCurrent, type RevisionLocks } from './revision-guard';
import {
  BACKPACK_STORAGE_KEY,
  BACKPACK_CATEGORIES_KEY,
  DEFAULT_PROMPT_CATEGORIES,
  INITIAL_PRESET_PROMPTS
} from "./constants";

export interface BackpackState {
  prompts: PromptItem[];
  categories: PromptCategory[];
  activeCategoryId: string;
  searchQuery: string;
  selectedTag: string | null;
  selectedPromptId: string | null;
  isEditing: boolean;
  editingPrompt: PromptItem | null;
  isVariableDialogOpen: boolean;
  variableTargetPrompt: PromptItem | null;
  variableFormValues: Record<string, string>;
  isLoading: boolean;
  statusMessage: string;
  copySuccessId: string | null;
}

export const backpackState = reactive<BackpackState>({
  prompts: [],
  categories: [...DEFAULT_PROMPT_CATEGORIES],
  activeCategoryId: "all",
  searchQuery: "",
  selectedTag: null,
  selectedPromptId: null,
  isEditing: false,
  editingPrompt: null,
  isVariableDialogOpen: false,
  variableTargetPrompt: null,
  variableFormValues: {},
  isLoading: false,
  statusMessage: "",
  copySuccessId: null
});

let initialized = false;
let storedRevision = 0;
let writeQueue: Promise<unknown> = Promise.resolve();

import { extractVariables, fillVariables } from "./utils";
export { extractVariables, fillVariables };

const LEGACY_PRESET_IDS = new Set(["preset-code-review", "preset-prompt-enhancer", "preset-bilingual-polisher", "preset-summary-action"]);
const LEGACY_CATEGORIES = new Set(["coding", "writing", "productivity", "roleplay"]);

function sanitizeData(prompts: PromptItem[], categories: PromptCategory[]): { prompts: PromptItem[]; categories: PromptCategory[] } {
  // 过滤用户要求删除的旧内置示例提示词
  const cleanPrompts = prompts.filter(p => !LEGACY_PRESET_IDS.has(p.id) && !p.id.startsWith("preset-"));
  // 过滤旧系统预制分类
  let cleanCategories = categories.filter(c => !LEGACY_CATEGORIES.has(c.id));
  if (!cleanCategories.some(c => c.id === "default")) {
    cleanCategories.push({ id: "default", name: "默认分组", icon: "📁", isBuiltin: false });
  }
  // 确保 prompt 的 category 指向有效分类
  const validCatIds = new Set(cleanCategories.map(c => c.id));
  for (const p of cleanPrompts) {
    if (!validCatIds.has(p.category)) {
      p.category = "default";
    }
  }
  return { prompts: cleanPrompts, categories: cleanCategories };
}

function loadFromLocalStorage(): { prompts: PromptItem[]; categories: PromptCategory[] } | null {
  try {
    if (typeof localStorage === "undefined") return null;
    const rawPrompts = localStorage.getItem(BACKPACK_STORAGE_KEY);
    const rawCategories = localStorage.getItem(BACKPACK_CATEGORIES_KEY);
    if (!rawPrompts && !rawCategories) return null;
    const parsedPrompts = rawPrompts ? JSON.parse(rawPrompts) : [];
    const parsedCategories = rawCategories ? JSON.parse(rawCategories) : null;
    return sanitizeData(
      Array.isArray(parsedPrompts) ? parsedPrompts : [],
      Array.isArray(parsedCategories) && parsedCategories.length ? parsedCategories : DEFAULT_PROMPT_CATEGORIES
    );
  } catch {
    return null;
  }
}

function persistToLocalStorage(prompts: PromptItem[], categories: PromptCategory[]): void {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(BACKPACK_STORAGE_KEY, JSON.stringify(prompts));
    localStorage.setItem(BACKPACK_CATEGORIES_KEY, JSON.stringify(categories));
  } catch (err) {
    console.warn("[Backpack] persistToLocalStorage failed", err);
  }
}

export const backpackService = {
  get state() {
    return backpackState;
  },

  async init(): Promise<void> {
    if (initialized) return;
    initialized = true;
    backpackState.isLoading = true;

    // 1. 先尝试从 localStorage 同步快速渲染（防闪烁）
    const local = loadFromLocalStorage();
    if (local && local.prompts.length > 0) {
      backpackState.prompts = local.prompts;
      if (local.categories?.length) backpackState.categories = local.categories;
    }

    // 2. 尝试从 chrome.storage.local 校准
    try {
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        const stored = await chrome.storage.local.get([BACKPACK_STORAGE_KEY, BACKPACK_CATEGORIES_KEY, PROMPT_REVISION_KEY]);
        storedRevision = parseBackpackRevision(stored?.[PROMPT_REVISION_KEY]);
        const promptsCandidate = stored?.[BACKPACK_STORAGE_KEY] || backpackState.prompts;
        const categoriesCandidate = stored?.[BACKPACK_CATEGORIES_KEY] || backpackState.categories;
        const clean = sanitizeData(promptsCandidate, categoriesCandidate);
        backpackState.prompts = clean.prompts;
        backpackState.categories = clean.categories;
        if (JSON.stringify(stored?.[BACKPACK_STORAGE_KEY]) !== JSON.stringify(clean.prompts) || JSON.stringify(stored?.[BACKPACK_CATEGORIES_KEY]) !== JSON.stringify(clean.categories)) await this.save();
        else persistToLocalStorage(clean.prompts, clean.categories);
      } else {
        const clean = sanitizeData(backpackState.prompts, backpackState.categories);
        backpackState.prompts = clean.prompts;
        backpackState.categories = clean.categories;
        persistToLocalStorage(backpackState.prompts, backpackState.categories);
      }
    } catch (err) {
      console.warn("[Backpack] init storage error:", err);
      const clean = sanitizeData(backpackState.prompts, backpackState.categories);
      backpackState.prompts = clean.prompts;
      backpackState.categories = clean.categories;
    } finally {
      backpackState.isLoading = false;
    }
  },

  async save(): Promise<boolean> {
    const plainPrompts = JSON.parse(JSON.stringify(backpackState.prompts));
    const plainCategories = JSON.parse(JSON.stringify(backpackState.categories));
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      const operation = writeQueue.then(async () => {
        try {
          if (typeof navigator === 'undefined' || !navigator.locks) throw new Error('浏览器不支持安全的背包写入锁');
          storedRevision = await writeBackpackIfCurrent(chrome.storage.local, navigator.locks as unknown as RevisionLocks, PROMPT_REVISION_KEY, storedRevision, {
            [BACKPACK_STORAGE_KEY]: plainPrompts,
            [BACKPACK_CATEGORIES_KEY]: plainCategories
          });
          persistToLocalStorage(plainPrompts, plainCategories);
          backpackState.statusMessage = '';
          return true;
        } catch (err) {
          backpackState.statusMessage = err instanceof StaleBackpackError
            ? '提示词已在其他页面更改，当前修改未保存。请先导出本页内容，再刷新并核对。'
            : '提示词保存失败，当前修改未保存。请先导出本页内容，再检查存储。';
          console.warn('[Backpack] save failed', err);
          return false;
        }
      });
      writeQueue = operation;
      return operation;
    }
    persistToLocalStorage(plainPrompts, plainCategories);
    return true;
  },

  createPrompt(data: {
    title: string;
    content: string;
    description?: string;
    category?: string;
    tags?: string[];
    pinned?: boolean;
  }): PromptItem {
    const now = Date.now();
    const newPrompt: PromptItem = {
      id: `prompt-${now}-${Math.random().toString(36).slice(2, 7)}`,
      title: data.title.trim() || "未命名提示词",
      content: data.content,
      description: data.description?.trim() || "",
      category: data.category || "default",
      tags: Array.isArray(data.tags) ? data.tags.filter(Boolean) : [],
      pinned: Boolean(data.pinned),
      createdAt: now,
      updatedAt: now,
      useCount: 0
    };

    backpackState.prompts.unshift(newPrompt);
    void this.save();
    return newPrompt;
  },

  updatePrompt(id: string, patch: Partial<Omit<PromptItem, "id" | "createdAt">>): boolean {
    const index = backpackState.prompts.findIndex(p => p.id === id);
    if (index === -1) return false;

    const current = backpackState.prompts[index];
    backpackState.prompts[index] = {
      ...current,
      ...patch,
      updatedAt: Date.now()
    };
    void this.save();
    return true;
  },

  deletePrompt(id: string): boolean {
    const prevLen = backpackState.prompts.length;
    backpackState.prompts = backpackState.prompts.filter(p => p.id !== id);
    if (backpackState.selectedPromptId === id) {
      backpackState.selectedPromptId = null;
    }
    if (backpackState.editingPrompt?.id === id) {
      backpackState.isEditing = false;
      backpackState.editingPrompt = null;
    }
    if (backpackState.prompts.length !== prevLen) {
      void this.save();
      return true;
    }
    return false;
  },

  togglePin(id: string): void {
    const item = backpackState.prompts.find(p => p.id === id);
    if (item) {
      item.pinned = !item.pinned;
      item.updatedAt = Date.now();
      void this.save();
    }
  },

  async copyPromptText(item: PromptItem, filledText?: string): Promise<boolean> {
    const textToCopy = filledText !== undefined ? filledText : item.content;
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

      // 复制成功，更新计数与视觉反馈
      item.useCount = (item.useCount || 0) + 1;
      item.updatedAt = Date.now();
      backpackState.copySuccessId = item.id;
      setTimeout(() => {
        if (backpackState.copySuccessId === item.id) {
          backpackState.copySuccessId = null;
        }
      }, 1800);
      void this.save();
      return true;
    } catch (err) {
      console.warn("[Backpack] copy failed", err);
      return false;
    }
  },

  openVariableDialog(item: PromptItem): void {
    const vars = extractVariables(item.content);
    const initialValues: Record<string, string> = {};
    for (const v of vars) {
      initialValues[v] = "";
    }
    backpackState.variableTargetPrompt = item;
    backpackState.variableFormValues = initialValues;
    backpackState.isVariableDialogOpen = true;
  },

  closeVariableDialog(): void {
    backpackState.isVariableDialogOpen = false;
    backpackState.variableTargetPrompt = null;
    backpackState.variableFormValues = {};
  },

  openEditor(item?: PromptItem): void {
    if (item) {
      backpackState.editingPrompt = { ...item, tags: [...item.tags] };
    } else {
      backpackState.editingPrompt = {
        id: "",
        title: "",
        content: "",
        description: "",
        category: backpackState.activeCategoryId === "all" || backpackState.activeCategoryId === "starred"
          ? "default"
          : backpackState.activeCategoryId,
        tags: [],
        pinned: false,
        createdAt: 0,
        updatedAt: 0,
        useCount: 0
      };
    }
    backpackState.isEditing = true;
  },

  closeEditor(): void {
    backpackState.isEditing = false;
    backpackState.editingPrompt = null;
  },

  saveEditorData(data: {
    title: string;
    content: string;
    description?: string;
    category?: string;
    tags?: string[];
    pinned?: boolean;
  }): void {
    if (backpackState.editingPrompt?.id) {
      this.updatePrompt(backpackState.editingPrompt.id, data);
    } else {
      this.createPrompt(data);
    }
    this.closeEditor();
  },

  addCategory(name: string, icon = "📁"): boolean {
    const cleanName = name.trim();
    if (!cleanName) return false;
    if (backpackState.categories.some(c => c.name === cleanName)) return false;

    const id = `cat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    backpackState.categories.push({ id, name: cleanName, icon, isBuiltin: false });
    void this.save();
    return true;
  },

  renameCategory(id: string, newName: string): boolean {
    const cleanName = newName.trim();
    if (!cleanName) return false;
    const cat = backpackState.categories.find(c => c.id === id);
    if (!cat || cat.isBuiltin) return false;
    cat.name = cleanName;
    void this.save();
    return true;
  },

  deleteCategory(id: string): boolean {
    const cat = backpackState.categories.find(c => c.id === id);
    if (!cat || cat.isBuiltin) return false;

    backpackState.categories = backpackState.categories.filter(c => c.id !== id);
    if (backpackState.activeCategoryId === id) {
      backpackState.activeCategoryId = "all";
    }
    // 将属于该分类的提示词归纳到默认 default 分组
    for (const p of backpackState.prompts) {
      if (p.category === id) {
        p.category = "default";
      }
    }
    void this.save();
    return true;
  },

  exportBackup(): void {
    const payload: PromptExportData = {
      version: 1,
      appName: "tab-project-backpack",
      exportedAt: Date.now(),
      prompts: backpackState.prompts,
      categories: backpackState.categories
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `prompts-backpack-backup-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  importBackup(jsonString: string): { success: boolean; count: number; error?: string } {
    try {
      const data = JSON.parse(jsonString);
      if (!data || !Array.isArray(data.prompts)) {
        return { success: false, count: 0, error: "导入文件格式不合规，缺少 prompts 数组" };
      }

      let importedCount = 0;
      const existingIds = new Set(backpackState.prompts.map(p => p.id));
      const newPrompts: PromptItem[] = [];

      for (const item of data.prompts) {
        if (!item || typeof item.title !== "string" || typeof item.content !== "string") {
          continue;
        }
        const validItem: PromptItem = {
          id: item.id && !existingIds.has(item.id) ? item.id : `prompt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: item.title.trim() || "未命名提示词",
          content: item.content,
          description: typeof item.description === "string" ? item.description : "",
          category: typeof item.category === "string" ? item.category : "coding",
          tags: Array.isArray(item.tags) ? item.tags.map(String).filter(Boolean) : [],
          pinned: Boolean(item.pinned),
          createdAt: typeof item.createdAt === "number" ? item.createdAt : Date.now(),
          updatedAt: Date.now(),
          useCount: typeof item.useCount === "number" ? item.useCount : 0
        };
        newPrompts.push(validItem);
        existingIds.add(validItem.id);
        importedCount++;
      }

      if (importedCount === 0) {
        return { success: false, count: 0, error: "未在文件中找到有效提示词条目" };
      }

      // 合并自定义分类
      if (Array.isArray(data.categories)) {
        for (const cat of data.categories) {
          if (cat && cat.name && !backpackState.categories.some(c => c.name === cat.name)) {
            backpackState.categories.push({
              id: cat.id || `cat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              name: String(cat.name).trim(),
              icon: typeof cat.icon === "string" ? cat.icon : "📁",
              isBuiltin: false
            });
          }
        }
      }

      backpackState.prompts = [...newPrompts, ...backpackState.prompts];
      void this.save();
      return { success: true, count: importedCount };
    } catch (err: any) {
      return { success: false, count: 0, error: `解析 JSON 失败: ${err?.message || err}` };
    }
  }
};

// 过滤提示词的计算属性
export const filteredPrompts = computed(() => {
  const query = backpackState.searchQuery.trim().toLowerCase();
  const categoryId = backpackState.activeCategoryId;
  const tag = backpackState.selectedTag;

  return backpackState.prompts.filter(item => {
    // 1. 分类筛选
    if (categoryId === "starred") {
      if (!item.pinned) return false;
    } else if (categoryId !== "all") {
      if (item.category !== categoryId) return false;
    }

    // 2. 标签筛选
    if (tag && !item.tags.includes(tag)) {
      return false;
    }

    // 3. 搜索过滤
    if (query) {
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchDesc = item.description?.toLowerCase().includes(query);
      const matchContent = item.content.toLowerCase().includes(query);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(query));
      if (!matchTitle && !matchDesc && !matchContent && !matchTags) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    // 置顶排前面，再按更新时间排序
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.updatedAt - a.updatedAt;
  });
});

// 全部已有标签集合
export const allBackpackTags = computed(() => {
  const tags = new Set<string>();
  for (const p of backpackState.prompts) {
    if (Array.isArray(p.tags)) {
      for (const t of p.tags) {
        if (t.trim()) tags.add(t.trim());
      }
    }
  }
  return Array.from(tags);
});
