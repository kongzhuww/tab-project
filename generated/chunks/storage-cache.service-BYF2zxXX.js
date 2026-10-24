const c = "lw_cache_";
class s {
  constructor() {
    this.memoryCache = /* @__PURE__ */ new Map(), this.pendingFetches = /* @__PURE__ */ new Map(), this.initialized = !1, this.preloadCommonKeys();
  }
  static getInstance() {
    return s.instance || (s.instance = new s()), s.instance;
  }
  /**
   * 预读常用键至内存缓存，保证首屏渲染 0ms 同步读取
   */
  preloadCommonKeys() {
    if (!(typeof window > "u"))
      try {
        if (typeof localStorage < "u") {
          let e = 0;
          for (let n = 0; n < localStorage.length && e < 40; n++) {
            const t = localStorage.key(n);
            if (t && t.startsWith(c)) {
              const o = t.slice(c.length);
              try {
                const r = localStorage.getItem(t) || "";
                if (r.length > 65536) continue;
                const a = JSON.parse(r);
                a && typeof a.savedAt == "number" && (!a.expireAt || a.expireAt > Date.now()) && (this.memoryCache.set(o, a), e++);
              } catch {
              }
            }
          }
        }
      } catch {
      }
  }
  /**
   * 同步直接获取内存中的缓存（0ms 秒开）
   */
  getSync(e, n) {
    const t = this.memoryCache.get(e);
    return t ? t.expireAt && t.expireAt < Date.now() ? (this.memoryCache.delete(e), n ?? null) : t.data : n ?? null;
  }
  /**
   * 异步获取缓存（从 L1 Memory -> L2 Chrome Storage -> L3 LocalStorage 级联查找）
   */
  async get(e, n) {
    const t = this.getSync(e);
    if (t !== null) return t;
    const o = `${c}${e}`;
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const a = (await chrome.storage.local.get([o]))?.[o];
        if (a && typeof a.savedAt == "number" && (!a.expireAt || a.expireAt > Date.now()))
          return this.memoryCache.set(e, a), a.data;
      } catch {
      }
    if (typeof localStorage < "u")
      try {
        const r = localStorage.getItem(o);
        if (r) {
          const a = JSON.parse(r);
          if (a && typeof a.savedAt == "number" && (!a.expireAt || a.expireAt > Date.now()))
            return this.memoryCache.set(e, a), a.data;
        }
      } catch {
      }
    return n ?? null;
  }
  /**
   * 写入缓存（写入内存并异步持久化至双轨存储）
   */
  async set(e, n, t) {
    const o = Date.now(), r = t?.ttlMs ? o + t.ttlMs : void 0, a = {
      data: n,
      savedAt: o,
      expireAt: r
    };
    if (this.memoryCache.set(e, a), t?.persist === !1) return;
    const i = `${c}${e}`;
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        await chrome.storage.local.set({ [i]: a });
      } catch {
      }
    if (typeof localStorage < "u")
      try {
        localStorage.setItem(i, JSON.stringify(a));
      } catch (l) {
        if (l?.name === "QuotaExceededError") {
          this.pruneOldEntries();
          try {
            localStorage.setItem(i, JSON.stringify(a));
          } catch {
          }
        }
      }
  }
  /**
   * 核心：Stale-While-Revalidate (SWR) 缓存模式
   * - 存在本地缓存时：立即返回旧数据实现瞬时响应；
   * - 后台并行请求 fetcher，获取成功后静默写入新缓存并通过 onBackgroundUpdate 通知界面。
   */
  async swr(e, n, t) {
    const o = await this.get(e);
    return o !== null ? (this.triggerBackgroundFetch(e, n, t), o) : this.triggerBackgroundFetch(e, n, t);
  }
  async triggerBackgroundFetch(e, n, t) {
    if (this.pendingFetches.has(e))
      return this.pendingFetches.get(e);
    const o = (async () => {
      try {
        const r = await n();
        if (r != null && (await this.set(e, r, { ttlMs: t?.ttlMs }), t?.onBackgroundUpdate))
          try {
            t.onBackgroundUpdate(r);
          } catch (a) {
            console.warn(`[StorageCache] onBackgroundUpdate error for ${e}:`, a);
          }
        return r;
      } catch (r) {
        throw t?.onErrorFallback && t.onErrorFallback(r), r;
      } finally {
        this.pendingFetches.delete(e);
      }
    })();
    return this.pendingFetches.set(e, o), o;
  }
  /**
   * 删除指定缓存
   */
  async remove(e) {
    this.memoryCache.delete(e);
    const n = `${c}${e}`;
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        await chrome.storage.local.remove([n]);
      } catch {
      }
    if (typeof localStorage < "u")
      try {
        localStorage.removeItem(n);
      } catch {
      }
  }
  /**
   * 清理过期或老旧缓存条目以释放空间
   */
  pruneOldEntries() {
    if (!(typeof localStorage > "u"))
      try {
        const e = [];
        for (let o = 0; o < localStorage.length; o++) {
          const r = localStorage.key(o);
          if (r && r.startsWith(c))
            try {
              const a = JSON.parse(localStorage.getItem(r) || "{}");
              e.push({ key: r, savedAt: a.savedAt || 0 });
            } catch {
            }
        }
        e.sort((o, r) => o.savedAt - r.savedAt);
        const n = Math.ceil(e.length * 0.2), t = [];
        for (let o = 0; o < n; o++) {
          const r = e[o].key;
          localStorage.removeItem(r), t.push(r);
        }
        typeof chrome < "u" && chrome.storage?.local && t.length > 0 && chrome.storage.local.remove(t).catch(() => {
        });
      } catch {
      }
  }
}
const d = s.getInstance();
export {
  d as s
};
