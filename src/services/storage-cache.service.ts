/**
 * StorageCacheService — 统一离线与持久化多级缓存层 (L1 Memory + L2 Chrome Storage + L3 LocalStorage)
 * 支持 Stale-While-Revalidate (SWR) 策略、TTL 自动失效、内存预读秒开与容量保护
 */

declare const chrome: any;

export interface CacheEntry<T = any> {
  data: T;
  savedAt: number;
  expireAt?: number;
}

export interface CacheSetOptions {
  ttlMs?: number;       // 有效期（毫秒），不传则永不过期
  persist?: boolean;     // 是否持久化到硬盘（默认 true）
}

export interface SwrOptions<T> {
  ttlMs?: number;
  onBackgroundUpdate?: (freshData: T) => void;
  onErrorFallback?: (err: any) => void;
}

const STORAGE_PREFIX = "lw_cache_";

class StorageCacheService {
  private static instance: StorageCacheService;
  private memoryCache = new Map<string, CacheEntry>();
  private pendingFetches = new Map<string, Promise<any>>();
  private initialized = false;

  private constructor() {
    this.preloadCommonKeys();
  }

  public static getInstance(): StorageCacheService {
    if (!StorageCacheService.instance) {
      StorageCacheService.instance = new StorageCacheService();
    }
    return StorageCacheService.instance;
  }

  /**
   * 预读常用键至内存缓存，保证首屏渲染 0ms 同步读取
   */
  private preloadCommonKeys(): void {
    if (typeof window === "undefined") return;
    try {
      if (typeof localStorage !== "undefined") {
        let loadedCount = 0;
        for (let i = 0; i < localStorage.length && loadedCount < 40; i++) {
          const rawKey = localStorage.key(i);
          if (rawKey && rawKey.startsWith(STORAGE_PREFIX)) {
            const cleanKey = rawKey.slice(STORAGE_PREFIX.length);
            try {
              const rawStr = localStorage.getItem(rawKey) || "";
              // 跳过超大条目（>64KB），交由按需异步读取，保护首屏不卡顿
              if (rawStr.length > 65536) continue;
              const parsed: CacheEntry = JSON.parse(rawStr);
              if (parsed && typeof parsed.savedAt === "number") {
                if (!parsed.expireAt || parsed.expireAt > Date.now()) {
                  this.memoryCache.set(cleanKey, parsed);
                  loadedCount++;
                }
              }
            } catch (_) {}
          }
        }
      }
    } catch (_) {}
  }

  /**
   * 同步直接获取内存中的缓存（0ms 秒开）
   */
  public getSync<T>(key: string, defaultValue?: T): T | null {
    const entry = this.memoryCache.get(key);
    if (!entry) return defaultValue ?? null;
    if (entry.expireAt && entry.expireAt < Date.now()) {
      this.memoryCache.delete(key);
      return defaultValue ?? null;
    }
    return entry.data as T;
  }

  /**
   * 异步获取缓存（从 L1 Memory -> L2 Chrome Storage -> L3 LocalStorage 级联查找）
   */
  public async get<T>(key: string, defaultValue?: T): Promise<T | null> {
    // 1. 检查内存
    const mem = this.getSync<T>(key);
    if (mem !== null) return mem;

    const fullKey = `${STORAGE_PREFIX}${key}`;

    // 2. 检查 chrome.storage.local
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const res = await chrome.storage.local.get([fullKey]);
        const entry: CacheEntry<T> = res?.[fullKey];
        if (entry && typeof entry.savedAt === "number") {
          if (!entry.expireAt || entry.expireAt > Date.now()) {
            this.memoryCache.set(key, entry);
            return entry.data;
          }
        }
      } catch (_) {}
    }

    // 3. 检查 localStorage
    if (typeof localStorage !== "undefined") {
      try {
        const raw = localStorage.getItem(fullKey);
        if (raw) {
          const entry: CacheEntry<T> = JSON.parse(raw);
          if (entry && typeof entry.savedAt === "number") {
            if (!entry.expireAt || entry.expireAt > Date.now()) {
              this.memoryCache.set(key, entry);
              return entry.data;
            }
          }
        }
      } catch (_) {}
    }

    return defaultValue ?? null;
  }

  /**
   * 写入缓存（写入内存并异步持久化至双轨存储）
   */
  public async set<T>(key: string, data: T, options?: CacheSetOptions): Promise<void> {
    const now = Date.now();
    const expireAt = options?.ttlMs ? now + options.ttlMs : undefined;
    const entry: CacheEntry<T> = {
      data,
      savedAt: now,
      expireAt
    };

    // 写入 L1 内存
    this.memoryCache.set(key, entry);

    if (options?.persist === false) return;

    const fullKey = `${STORAGE_PREFIX}${key}`;

    // 写入 L2 Chrome Storage
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        await chrome.storage.local.set({ [fullKey]: entry });
      } catch (_) {}
    }

    // 写入 L3 LocalStorage（带超限清理防护）
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem(fullKey, JSON.stringify(entry));
      } catch (err: any) {
        if (err?.name === "QuotaExceededError") {
          this.pruneOldEntries();
          try {
            localStorage.setItem(fullKey, JSON.stringify(entry));
          } catch (_) {}
        }
      }
    }
  }

  /**
   * 核心：Stale-While-Revalidate (SWR) 缓存模式
   * - 存在本地缓存时：立即返回旧数据实现瞬时响应；
   * - 后台并行请求 fetcher，获取成功后静默写入新缓存并通过 onBackgroundUpdate 通知界面。
   */
  public async swr<T>(
    key: string,
    fetcher: () => Promise<T>,
    options?: SwrOptions<T>
  ): Promise<T> {
    const cached = await this.get<T>(key);

    // 如果已有缓存（即使可能稍微过期），先返回给界面做即时渲染
    if (cached !== null) {
      // 在后台静默刷新
      void this.triggerBackgroundFetch(key, fetcher, options);
      return cached;
    }

    // 若无任何缓存，则正常执行并等待网络请求
    return this.triggerBackgroundFetch(key, fetcher, options);
  }

  private async triggerBackgroundFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    options?: SwrOptions<T>
  ): Promise<T> {
    // 竞态去重：同一个 key 正在 fetch 时复用 promise，避免瞬时并发重复打后端
    if (this.pendingFetches.has(key)) {
      return this.pendingFetches.get(key) as Promise<T>;
    }

    const task = (async () => {
      try {
        const fresh = await fetcher();
        if (fresh !== undefined && fresh !== null) {
          await this.set<T>(key, fresh, { ttlMs: options?.ttlMs });
          if (options?.onBackgroundUpdate) {
            try {
              options.onBackgroundUpdate(fresh);
            } catch (err) {
              console.warn(`[StorageCache] onBackgroundUpdate error for ${key}:`, err);
            }
          }
        }
        return fresh;
      } catch (err) {
        if (options?.onErrorFallback) {
          options.onErrorFallback(err);
        }
        throw err;
      } finally {
        this.pendingFetches.delete(key);
      }
    })();

    this.pendingFetches.set(key, task);
    return task;
  }

  /**
   * 删除指定缓存
   */
  public async remove(key: string): Promise<void> {
    this.memoryCache.delete(key);
    const fullKey = `${STORAGE_PREFIX}${key}`;
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        await chrome.storage.local.remove([fullKey]);
      } catch (_) {}
    }
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.removeItem(fullKey);
      } catch (_) {}
    }
  }

  /**
   * 清理过期或老旧缓存条目以释放空间
   */
  private pruneOldEntries(): void {
    if (typeof localStorage === "undefined") return;
    try {
      const candidates: { key: string; savedAt: number }[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(STORAGE_PREFIX)) {
          try {
            const item = JSON.parse(localStorage.getItem(k) || "{}");
            candidates.push({ key: k, savedAt: item.savedAt || 0 });
          } catch (_) {}
        }
      }
      // 按保存时间升序排序，剔除最老的 20%
      candidates.sort((a, b) => a.savedAt - b.savedAt);
      const toRemove = Math.ceil(candidates.length * 0.2);
      const removedKeys: string[] = [];
      for (let i = 0; i < toRemove; i++) {
        const k = candidates[i].key;
        localStorage.removeItem(k);
        removedKeys.push(k);
      }
      if (typeof chrome !== "undefined" && chrome.storage?.local && removedKeys.length > 0) {
        chrome.storage.local.remove(removedKeys).catch(() => {});
      }
    } catch (_) {}
  }
}

export const storageCache = StorageCacheService.getInstance();
