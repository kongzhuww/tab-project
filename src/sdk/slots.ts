import { shallowReactive } from "vue";
import type { SearchSuggestionItem } from "../search/store";
import type { CubeFaceDefinition } from "../cube/cube-registry.store";
import { cubeRegistryStore } from "../cube/cube-registry.store";

// ============================================================================
// 1. 搜索建议挂载槽位 (Search Suggestion Slot Provider)
// ============================================================================
export interface SearchSlotProvider {
  id: string;
  name: string;
  /** 当用户在全局搜索栏输入关键词时触发，返回插件提供的联想建议 */
  provideSuggestions: (query: string, signal?: AbortSignal) => Promise<SearchSuggestionItem[]> | SearchSuggestionItem[];
  /** 优先级（数值越小越靠前，默认 100） */
  priority?: number;
}

// ============================================================================
// 2. 右键菜单挂载槽位 (Context Menu Action Slot Provider)
// ============================================================================
export interface MenuSlotTarget {
  id: string;
  title: string;
  url?: string;
  kind: "link" | "folder";
  source?: "launcher" | "bookmarks";
}

export interface MenuSlotAction {
  id: string;
  label: string;
  icon?: string;
  /** 适用的目标类型：'link' 网站、'folder' 文件夹、'all' 全部 */
  targetKind?: "link" | "folder" | "all";
  /** 点击菜单项执行的动作 */
  execute: (target: MenuSlotTarget) => void | Promise<void>;
  /** 是否禁用 */
  disabled?: (target: MenuSlotTarget) => boolean;
}

export interface MenuSlotProvider {
  id: string;
  name: string;
  actions: MenuSlotAction[];
}

// ============================================================================
// 3. 插件扩展挂载槽注册表状态 (Plugin Slots State)
// ============================================================================
interface PluginSlotsState {
  searchProviders: Map<string, SearchSlotProvider>;
  menuProviders: Map<string, MenuSlotProvider>;
}

const state: PluginSlotsState = {
  searchProviders: shallowReactive(new Map()),
  menuProviders: shallowReactive(new Map())
};

// Bounded waiting does not sandbox synchronous plugin code.
function boundedSuggestions(provider: SearchSlotProvider, query: string, parent?: AbortSignal): Promise<SearchSuggestionItem[]> {
  return new Promise(resolve => {
    const controller = new AbortController();
    let finished = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = (items: SearchSuggestionItem[] = []) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      parent?.removeEventListener("abort", cancel);
      resolve(items);
      controller.abort();
    };
    const cancel = () => finish();
    if (parent?.aborted) { finish(); return; }
    parent?.addEventListener("abort", cancel, { once: true });
    timer = setTimeout(cancel, 1500);
    Promise.resolve().then(() => {
      if (finished) return [];
      return provider.provideSuggestions(query, controller.signal);
    }).then(items => {
      if (finished) return;
      const safe: SearchSuggestionItem[] = [];
      for (const item of Array.isArray(items) ? items.slice(0, 10) : []) {
        if (!item || typeof item.title !== "string" || typeof item.url !== "string") continue;
        try {
          const url = new URL(item.url);
          if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) continue;
          safe.push({
            id: JSON.stringify(["plugin", provider.id, safe.length]),
            title: item.title.slice(0, 200), url: url.href,
            meta: typeof item.meta === "string" ? item.meta.slice(0, 300) : provider.name,
            badge: { text: provider.name }
          });
        } catch { /* Invalid URL is not a clickable suggestion. */ }
      }
      finish(safe);
    }).catch(() => finish());
  });
}

export const pluginSlots = {
  // --- A. 搜索挂载槽 (Search Slot) ---
  registerSearchProvider(provider: SearchSlotProvider): () => void {
    if (!provider.id.trim() || typeof provider.provideSuggestions !== "function") throw new Error("搜索提供者 ID 和函数不能为空");
    const entry = { ...provider };
    state.searchProviders.set(provider.id, entry);
    return () => { if (state.searchProviders.get(provider.id) === entry) state.searchProviders.delete(provider.id); };
  },

  unregisterSearchProvider(providerId: string): void {
    state.searchProviders.delete(providerId);
  },

  /** 聚合调用所有插件注册的搜索建议提供者 */
  async querySearchProviders(query: string, signal?: AbortSignal): Promise<SearchSuggestionItem[]> {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const sortedProviders = [...state.searchProviders.values()].sort((a, b) => (a.priority ?? 100) - (b.priority ?? 100));
    const results = await Promise.all(sortedProviders.map(provider =>
      boundedSuggestions(provider, trimmed, signal)
    ));
    if (signal?.aborted) return [];
    return results.flatMap((items, index) =>
      state.searchProviders.get(sortedProviders[index].id) === sortedProviders[index] ? items : []
    ).slice(0, 40);
  },

  // --- B. 右键菜单挂载槽 (Context Menu Slot) ---
  registerMenuProvider(provider: MenuSlotProvider): () => void {
    if (!provider.id.trim()) throw new Error("菜单提供者 ID 不能为空");
    const ids = new Set<string>();
    for (const action of provider.actions) {
      if (!action.id.trim() || ids.has(action.id) || typeof action.execute !== "function") throw new Error("菜单动作 ID 不能为空或重复，且须提供执行函数");
      ids.add(action.id);
    }
    const entry = { ...provider, actions: provider.actions.map(action => ({ ...action })) };
    state.menuProviders.set(provider.id, entry);
    return () => { if (state.menuProviders.get(provider.id) === entry) state.menuProviders.delete(provider.id); };
  },

  unregisterMenuProvider(providerId: string): void {
    state.menuProviders.delete(providerId);
  },

  /** 获取适用于指定目标的插件右键菜单动作 */
  getMenuActionsForTarget(target: MenuSlotTarget): MenuSlotAction[] {
    const list: MenuSlotAction[] = [];
    for (const provider of state.menuProviders.values()) {
      for (const action of provider.actions) {
        const kind = action.targetKind || "all";
        if (kind === "all" || kind === target.kind) {
          const current = () => state.menuProviders.get(provider.id) === provider;
          list.push({
            ...action,
            id: JSON.stringify([provider.id, action.id]),
            disabled: input => {
              if (!current()) return true;
              try { return Boolean(action.disabled?.({ ...input, source: target.source })); } catch { return true; }
            },
            execute: input => {
              const snapshot = { ...input, source: target.source };
              if (!current() || action.disabled?.(snapshot)) return;
              return action.execute(snapshot);
            }
          });
        }
      }
    }
    return list;
  },

  // --- C. 顶栏信息立方体挂载槽 (Cube Face Slot) ---
  registerCubeFace(face: CubeFaceDefinition, autoEnable = true): () => void {
    return cubeRegistryStore.registerFace(face, autoEnable);
  },

  unregisterCubeFace(faceId: string): void {
    cubeRegistryStore.unregisterFace(faceId);
  }
};
