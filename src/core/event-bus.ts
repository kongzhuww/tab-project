type Handler<T = any> = (payload: T) => void;

class TypedEventBus {
  private listeners = new Map<string, Set<Handler>>();

  /**
   * 注册事件监听器，返回反注册取消函数
   */
  public on<T = any>(event: string, handler: Handler<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);

    return () => {
      this.off(event, handler);
    };
  }

  /**
   * 单次事件监听
   */
  public once<T = any>(event: string, handler: Handler<T>): () => void {
    const unbind = this.on<T>(event, (payload) => {
      unbind();
      handler(payload);
    });
    return unbind;
  }

  /**
   * 移除特定监听器
   */
  public off<T = any>(event: string, handler: Handler<T>): void {
    const set = this.listeners.get(event);
    if (!set) return;
    set.delete(handler);
    if (set.size === 0) {
      this.listeners.delete(event);
    }
  }

  /**
   * 派发应用内事件，并可选择向 window 广播 CustomEvent
   */
  public emit<T = any>(event: string, payload?: T, dispatchToWindow = false): void {
    const set = this.listeners.get(event);
    if (set && set.size > 0) {
      // 浅拷贝执行，避免回调内部新增/删除监听器导致的迭代冲突
      const frozenHandlers = Array.from(set);
      for (const handler of frozenHandlers) {
        try {
          handler(payload);
        } catch (err) {
          console.error(`[AppEventBus] Error in handler for event "${event}":`, err);
        }
      }
    }

    if (dispatchToWindow && typeof window !== "undefined") {
      try {
        window.dispatchEvent(new CustomEvent(`lw:${event}`, { detail: payload }));
      } catch (err) {
        // window dispatch ignore
      }
    }
  }

  /**
   * 清除特定事件或全部监听
   */
  public clear(event?: string): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
}

export const appEventBus = new TypedEventBus();

// 挂载到 window 方便全局调试与跨上下文调用
if (typeof window !== "undefined") {
  (window as any).__LW_EVENT_BUS__ = appEventBus;
}
