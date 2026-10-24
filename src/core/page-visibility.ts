import { ref, readonly, type DeepReadonly, type Ref } from "vue";

export type VisibilityCallback = (visible: boolean) => void;

class PageVisibilityService {
  private static instance: PageVisibilityService;
  private _isVisible = ref(typeof document !== "undefined" ? !document.hidden : true);
  private callbacks = new Set<VisibilityCallback>();
  private activeIntervals = new Set<{
    handler: () => void;
    intervalMs: number;
    timerId: ReturnType<typeof setInterval> | null;
  }>();

  private constructor() {
    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", () => {
        const visible = !document.hidden;
        this._isVisible.value = visible;

        if (visible) {
          this.resumeIntervals();
          try {
            window.dispatchEvent(new CustomEvent("logicweaver:page-visible"));
          } catch (_) {}
        } else {
          this.pauseIntervals();
          try {
            window.dispatchEvent(new CustomEvent("logicweaver:page-hidden"));
          } catch (_) {}
        }

        for (const cb of this.callbacks) {
          try {
            cb(visible);
          } catch (err) {
            console.warn("[PageVisibility] callback error:", err);
          }
        }
      });
    }
  }

  public static getInstance(): PageVisibilityService {
    if (!PageVisibilityService.instance) {
      PageVisibilityService.instance = new PageVisibilityService();
    }
    return PageVisibilityService.instance;
  }

  public get isVisible(): DeepReadonly<Ref<boolean>> {
    return readonly(this._isVisible);
  }

  public isVisibleNow(): boolean {
    return typeof document !== "undefined" ? !document.hidden : true;
  }

  public onChange(callback: VisibilityCallback): () => void {
    this.callbacks.add(callback);
    return () => {
      this.callbacks.delete(callback);
    };
  }

  /**
   * 创建低功耗定时任务：后台标签自动暂停定时器，切回前台时自动无感唤醒并立即执行一次
   */
  public createInterval(handler: () => void, intervalMs: number): {
    start: () => void;
    stop: () => void;
  } {
    const item = {
      handler,
      intervalMs,
      timerId: null as ReturnType<typeof setInterval> | null
    };

    const start = () => {
      this.activeIntervals.add(item);
      if (this.isVisibleNow() && !item.timerId) {
        item.timerId = setInterval(item.handler, item.intervalMs);
      }
    };

    const stop = () => {
      this.activeIntervals.delete(item);
      if (item.timerId) {
        clearInterval(item.timerId);
        item.timerId = null;
      }
    };

    return { start, stop };
  }

  private pauseIntervals(): void {
    for (const item of this.activeIntervals) {
      if (item.timerId) {
        clearInterval(item.timerId);
        item.timerId = null;
      }
    }
  }

  private resumeIntervals(): void {
    for (const item of this.activeIntervals) {
      if (!item.timerId) {
        // 切回前台时先执行一次最新状态同步
        try {
          item.handler();
        } catch (_) {}
        item.timerId = setInterval(item.handler, item.intervalMs);
      }
    }
  }
}

export const pageVisibility = PageVisibilityService.getInstance();
