import { pluginSlots } from "./slots";
import { notifications } from "./notifications";
import { images } from "./images";
import type { CubeFaceDefinition } from "../cube/cube-registry.store";
import type { SearchSuggestionItem } from "../search/store";
import type { MenuSlotAction } from "./slots";

export interface PluginManifest {
  id: string;
  name: string;
  version?: string;
  description?: string;
  author?: string;
}

/**
 * PluginContext — 可信随工程编译插件的便利上下文（非安全沙箱）
 * 为插件开发者提供开箱即用的系统能力，无需触碰复杂底层状态
 */
export class PluginContext {
  public readonly manifest: PluginManifest;
  private readonly storagePrefix: string;
  private cleanups = new Set<() => void>();
  private disposed = false;

  private ensureActive(): void {
    if (this.disposed) throw new Error("PluginContext 已注销，不能重新注册");
  }

  private track(cleanup: () => void): () => void {
    let done = false;
    const release = () => {
      if (done) return;
      cleanup();
      done = true;
      this.cleanups.delete(release);
    };
    this.cleanups.add(release);
    return release;
  }

  constructor(manifest: PluginManifest) {
    if (!/^[a-zA-Z0-9_-]+$/.test(manifest.id)) throw new Error("插件 ID 仅支持字母、数字、下划线和连字符");
    this.manifest = Object.freeze({ ...manifest });
    this.storagePrefix = `plugin:${manifest.id}:`;
  }

  // ==================== 1. 独立持久化存储 (Storage API) ====================
  public readonly storage = {
    get: <T = any>(key: string, defaultValue?: T): T | undefined => {
      try {
        const raw = localStorage.getItem(this.storagePrefix + key);
        if (raw === null) return defaultValue;
        return JSON.parse(raw);
      } catch {
        return defaultValue;
      }
    },
    set: <T = any>(key: string, value: T): void => {
      try {
        localStorage.setItem(this.storagePrefix + key, JSON.stringify(value));
      } catch (err) {
        console.warn(`[Plugin:${this.manifest.id}] Storage set failed:`, err);
      }
    },
    remove: (key: string): void => {
      try {
        localStorage.removeItem(this.storagePrefix + key);
      } catch {}
    },
    clear: (): void => {
      try {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const k = localStorage.key(i);
          if (k?.startsWith(this.storagePrefix)) localStorage.removeItem(k);
        }
      } catch {}
    }
  };

  // ==================== 2. 全局轻量通知 (Notice API) ====================
  public readonly notify = {
    show: (options: { title: string; message: string; duration?: number }) => {
      return notifications.show({
        appName: this.manifest.name,
        title: options.title,
        message: options.message,
        duration: options.duration
      });
    }
  };

  // ==================== 3. 顶栏信息立方体挂载 (Cube Slot) ====================
  public readonly cube = {
    register: (face: Omit<CubeFaceDefinition, "builtIn">) => {
      this.ensureActive();
      const fullFace: CubeFaceDefinition = { ...face, id: `${this.manifest.id}:${face.id}`, builtIn: false };
      const unregister = pluginSlots.registerCubeFace(fullFace);
      return this.track(unregister);
    }
  };

  // ==================== 4. 搜索框建议挂载 (Search Slot) ====================
  public readonly search = {
    provideSuggestions: (provider: (query: string, signal?: AbortSignal) => Promise<SearchSuggestionItem[]> | SearchSuggestionItem[], priority = 100) => {
      this.ensureActive();
      const unregister = pluginSlots.registerSearchProvider({
        id: this.manifest.id,
        name: this.manifest.name,
        provideSuggestions: provider,
        priority
      });
      return this.track(unregister);
    }
  };

  // ==================== 5. 右键菜单挂载 (Context Menu Slot) ====================
  public readonly contextMenu = {
    registerActions: (actions: MenuSlotAction[]) => {
      this.ensureActive();
      const unregister = pluginSlots.registerMenuProvider({
        id: this.manifest.id,
        name: this.manifest.name,
        actions
      });
      return this.track(unregister);
    }
  };

  // ==================== 6. 图片查看器 (Images API) ====================
  public readonly images = images;

  /** 插件注销/禁用时的资源整体回收 */
  public dispose(): void {
    this.disposed = true;
    for (const cleanup of [...this.cleanups]) {
      try { cleanup(); } catch (error) { console.warn("[PluginContext] Cleanup failed", error); }
    }
  }
}

/** 插件定义工厂函数 */
export function definePlugin(options: {
  manifest: PluginManifest;
  setup: (ctx: PluginContext) => void | Promise<void>;
  onUnload?: (ctx: PluginContext) => void;
}) {
  return options;
}
