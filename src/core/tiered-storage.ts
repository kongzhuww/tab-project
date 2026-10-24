/**
 * 多级持久化存储体系 (Tiered Storage)
 * L1: 内存状态层 (Memory Store) - 微秒级同步读写，零 JSON 解析开销
 * L2: 本地持久层 (Web Storage / chrome.storage) - 防抖异步批量落盘，杜绝主线程 I/O 阻塞
 */

class TieredStorage {
  private memCache = new Map<string, any>();
  private dirtyKeys = new Set<string>();
  private flushTimer: number | null = null;
  private flushDelayMs: number;

  constructor(flushDelayMs = 150) {
    this.flushDelayMs = flushDelayMs;
    this.initCrossTabSync();
  }

  /**
   * 同步读取（优先从 L1 内存命中）
   */
  public get<T>(key: string, defaultValue: T): T {
    if (this.memCache.has(key)) {
      return this.memCache.get(key) as T;
    }

    try {
      const raw = localStorage.getItem(key);
      if (raw === null) {
        this.memCache.set(key, defaultValue);
        return defaultValue;
      }
      const parsed = JSON.parse(raw);
      this.memCache.set(key, parsed);
      return parsed as T;
    } catch {
      this.memCache.set(key, defaultValue);
      return defaultValue;
    }
  }

  /**
   * 同步更新内存层，并触发异步防抖持久化落盘
   */
  public set<T>(key: string, value: T, immediate = false): void {
    this.memCache.set(key, value);
    this.dirtyKeys.add(key);

    if (immediate) {
      this.flushSync();
    } else {
      this.scheduleFlush();
    }
  }

  /**
   * 删除键
   */
  public remove(key: string): void {
    this.memCache.delete(key);
    this.dirtyKeys.delete(key);
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.warn(`[TieredStorage] Failed to removeItem "${key}":`, err);
    }
  }

  /**
   * 立即将所有 dirty 缓存刷入磁盘/localStorage
   */
  public flushSync(): void {
    if (this.flushTimer !== null) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }

    if (this.dirtyKeys.size === 0) return;

    for (const key of this.dirtyKeys) {
      try {
        const val = this.memCache.get(key);
        if (val === undefined) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(val));
        }
      } catch (err) {
        console.warn(`[TieredStorage] Flush error for key "${key}":`, err);
      }
    }
    this.dirtyKeys.clear();
  }

  /**
   * 安排防抖落盘
   */
  private scheduleFlush(): void {
    if (this.flushTimer !== null) return;
    this.flushTimer = window.setTimeout(() => {
      this.flushTimer = null;
      this.flushSync();
    }, this.flushDelayMs);
  }

  /**
   * 监听跨标签页 storage 事件，更新 L1 缓存以保持多标签页一致性
   */
  private initCrossTabSync(): void {
    if (typeof window === "undefined") return;
    window.addEventListener("storage", (e) => {
      if (!e.key) return;
      if (e.newValue === null) {
        this.memCache.delete(e.key);
      } else {
        try {
          this.memCache.set(e.key, JSON.parse(e.newValue));
        } catch {
          // not json
        }
      }
    });

    // 页面即将卸载时强制将剩余脏数据同步写入
    window.addEventListener("beforeunload", () => {
      this.flushSync();
    });
  }
}

export const tieredStorage = new TieredStorage();
