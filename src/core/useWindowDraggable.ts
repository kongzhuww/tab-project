import { ref, computed, onMounted, onUnmounted, nextTick, watch, type Ref } from "vue";
import { windowManagerController, windowManagerState } from "./window-manager.store";

declare const chrome: any;

export interface WindowRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface UseWindowDraggableOptions {
  windowId: string;
  storageKey?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultLeft?: number;
  defaultTop?: number;
  /** Standalone panels must not change/freeze WindowManager's active module. */
  managed?: boolean;
  minWidth?: number;
  minHeight?: number;
  resizable?: boolean;
  onFocus?: () => void;
  active?: () => boolean;
}

export function useWindowDraggable(options: UseWindowDraggableOptions) {
  const panelRef = ref<HTMLElement | null>(null);
  const headerRef = ref<HTMLElement | null>(null);

  let disposed = false;
  let layoutRevision = 0;
  let cleanupInteraction: (() => void) | undefined;
  function stopInteractions() {
    ++layoutRevision;
    const cleanup = cleanupInteraction;
    cleanupInteraction = undefined;
    cleanup?.();
  }
  const isDragging = ref(false);
  const isResizing = ref(false);
  const isMaximized = ref(false);
  const preMaxRect = ref<WindowRect | null>(null);

  const storageKey = options.storageKey || `lw_win_pos_${options.windowId}`;
  const defaultWidth = options.defaultWidth || 840;
  const defaultHeight = options.defaultHeight || 580;
  const minWidth = options.minWidth || 380;
  const minHeight = options.minHeight || 260;

  function bringToFront() {
    if (options.managed !== false) windowManagerController.bringToFront(options.windowId);
    if (options.onFocus) {
      options.onFocus();
    }
  }

  function parseWindowRect(value: unknown): WindowRect | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const rect = value as Record<string, unknown>;
    const { left, top, width, height } = rect;
    if (typeof left !== "number" || !Number.isFinite(left) ||
        typeof top !== "number" || !Number.isFinite(top) ||
        typeof width !== "number" || !Number.isFinite(width) || width <= 0 ||
        typeof height !== "number" || !Number.isFinite(height) || height <= 0) return null;
    return { left, top, width, height };
  }

  function getSavedPositionSync(): WindowRect | null {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) return parseWindowRect(JSON.parse(raw));
    } catch {}
    return null;
  }

  function computePosition(saved: WindowRect | null): WindowRect {
    const winW = typeof window !== "undefined" ? window.innerWidth : 1920;
    const winH = typeof window !== "undefined" ? window.innerHeight : 1080;

    let targetDefaultW = defaultWidth;
    let targetDefaultH = defaultHeight;

    // 小屏/笔记本分辨率或高缩放比弹性适应：绝不默认撑爆小屏幕
    if (winW <= 1366) {
      targetDefaultW = Math.min(defaultWidth, Math.max(minWidth, winW - 32));
      targetDefaultH = Math.min(defaultHeight, Math.max(minHeight, winH - 90));
    } else if (winW <= 1536) {
      targetDefaultW = Math.min(defaultWidth, Math.max(minWidth, winW - 48));
      targetDefaultH = Math.min(defaultHeight, Math.max(minHeight, winH - 100));
    }

    let w = saved?.width || targetDefaultW;
    let h = saved?.height || targetDefaultH;
    let l = saved?.left;
    let t = saved?.top;

    w = Math.max(1, Math.min(winW - 16, Math.max(minWidth, w)));
    h = Math.max(1, Math.min(winH - 16, Math.max(minHeight, h)));

    const minTop = 64; // 顶栏避让安全高度，杜绝浮窗标题栏滑入顶栏发生按键被遮挡/重叠
    if (typeof l !== "number" || typeof t !== "number") {
      const preferredLeft = options.defaultLeft !== undefined
        ? Math.min(options.defaultLeft, winW - w - 16)
        : Math.round((winW - w) / 2);
      l = Math.max(8, Math.min(preferredLeft, winW - w - 8));
      t = Math.max(minTop, Math.min(options.defaultTop ?? Math.max(minTop + 16, Math.round((winH - h) / 2)), winH - 50));
    } else {
      l = Math.max(8, Math.min(l, winW - w - 8));
      t = Math.max(minTop, Math.min(t, winH - 50));
    }

    return { left: l, top: t, width: w, height: h };
  }

  // 同步计算初始坐标样式，首帧即就位，彻底消除位置跳动闪烁与松手回弹
  const initialRect = computePosition(getSavedPositionSync());
  const currentRect = ref<WindowRect>(initialRect);
  const initialStyle = computed<Record<string, string>>(() => ({
    width: `${currentRect.value.width}px`,
    height: `${currentRect.value.height}px`,
    left: `${currentRect.value.left}px`,
    top: `${currentRect.value.top}px`,
    right: "auto",
    bottom: "auto",
    margin: "0",
    transform: "none"
  }));

  function getSavedPosition(callback: (rect: WindowRect | null) => void) {
    try {
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        chrome.storage.local.get([storageKey], (res: Record<string, unknown>) => {
          const failed = Boolean(chrome.runtime?.lastError);
          callback((!failed && parseWindowRect(res?.[storageKey])) || getSavedPositionSync());
        });
        return;
      }
    } catch {}
    callback(getSavedPositionSync());
  }

  function savePosition(rect: WindowRect) {
    try {
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        chrome.storage.local.set({ [storageKey]: rect }, () => { void chrome.runtime?.lastError; });
      }
    } catch {}
    // Position is best-effort; storage failure must not break a gesture.
    try {
      localStorage.setItem(storageKey, JSON.stringify(rect));
    } catch {}
  }

  function applyRect(rect: WindowRect) {
    currentRect.value = { ...rect };
    if (!panelRef.value) return;
    panelRef.value.style.width = `${rect.width}px`;
    panelRef.value.style.height = `${rect.height}px`;
    panelRef.value.style.left = `${rect.left}px`;
    panelRef.value.style.top = `${rect.top}px`;
    panelRef.value.style.right = "auto";
    panelRef.value.style.bottom = "auto";
    panelRef.value.style.transform = "none";
    panelRef.value.style.margin = "0";
  }

  function restoreSavedPosition() {
    const panel = panelRef.value;
    if (!panel || typeof window === "undefined") return;

    const revision = ++layoutRevision;
    // Restore only this instance's current positioning request.
    const syncSaved = getSavedPositionSync();
    applyRect(computePosition(syncSaved));

    // 2. 异步校对 chrome.storage
    getSavedPosition((saved) => {
      if (disposed || revision !== layoutRevision || options.active?.() === false || isMaximized.value) return;
      if (saved && (!syncSaved || saved.left !== syncSaved.left || saved.top !== syncSaved.top ||
          saved.width !== syncSaved.width || saved.height !== syncSaved.height)) {
        applyRect(computePosition(saved));
      }
    });
  }

  let suppressHeaderClick = false;
  function onHeaderClickCapture(event: MouseEvent) {
    if (!suppressHeaderClick) return;
    suppressHeaderClick = false;
    event.preventDefault();
    event.stopPropagation();
  }

  function onHeaderPointerDown(event: PointerEvent) {
    if (disposed || options.active?.() === false || isDragging.value || isResizing.value) return;
    suppressHeaderClick = false;
    stopInteractions();
    if (event.button !== 0 || isMaximized.value) return;
    const target = event.target as HTMLElement | null;
    if (!target || target.closest("button, a, input, textarea, select, [draggable='true'], .no-drag")) {
      return;
    }
    const panel = panelRef.value;
    if (!panel) return;

    bringToFront();

    const startX = event.clientX;
    const startY = event.clientY;
    let didDrag = false;
    const rect = panel.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const minTop = 64;
    const maxLeft = Math.max(8, window.innerWidth - rect.width - 8);
    const maxTop = Math.max(minTop, window.innerHeight - 50);

    panel.style.width = `${rect.width}px`;
    panel.style.height = `${rect.height}px`;
    panel.style.left = `${rect.left}px`;
    panel.style.top = `${rect.top}px`;
    panel.style.right = "auto";
    panel.style.bottom = "auto";
    panel.style.transform = "none";
    panel.style.margin = "0";

    isDragging.value = true;
    panel.classList.add("dragging");
    panel.style.willChange = "left, top";

    const headerEl = headerRef.value;
    try {
      headerEl?.setPointerCapture(event.pointerId);
    } catch {}

    let curLeft = rect.left;
    let curTop = rect.top;
    let rafId = 0;

    const renderPosition = () => {
      rafId = 0;
      if (panelRef.value) {
        panelRef.value.style.left = `${curLeft}px`;
        panelRef.value.style.top = `${curTop}px`;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerId !== event.pointerId) return;
      if (Math.hypot(e.clientX - startX, e.clientY - startY) > 4) didDrag = true;
      curLeft = Math.max(8, Math.min(e.clientX - offsetX, maxLeft));
      curTop = Math.max(minTop, Math.min(e.clientY - offsetY, maxTop));
      if (!rafId) {
        rafId = requestAnimationFrame(renderPosition);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerId !== event.pointerId) return;
      suppressHeaderClick = didDrag && e.type === "pointerup";
      const finalLeft = curLeft;
      const finalTop = curTop;
      const finalW = panel.offsetWidth || rect.width;
      const finalH = panel.offsetHeight || rect.height;
      const finalRect: WindowRect = { left: finalLeft, top: finalTop, width: finalW, height: finalH };
      currentRect.value = finalRect;
      stopInteractions();
      if (e.type === "pointerup") savePosition(finalRect);
    };
    const onVisibilityChange = () => { if (document.hidden) stopInteractions(); };
    cleanupInteraction = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("blur", stopInteractions);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (rafId) { cancelAnimationFrame(rafId); renderPosition(); }
      try { headerEl?.releasePointerCapture(event.pointerId); } catch {}
      const finalRect = panel.getBoundingClientRect();
      currentRect.value = { left: finalRect.left, top: finalRect.top, width: finalRect.width, height: finalRect.height };
      isDragging.value = false;
      isResizing.value = false;
      panel.classList.remove("dragging", "resizing");
      panel.style.willChange = "auto";
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    // Not once: releasing another pointer must not remove the initiating pointer's listener.
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("blur", stopInteractions);
    document.addEventListener("visibilitychange", onVisibilityChange);
  }

  function onResizePointerDown(event: PointerEvent, edge: string) {
    if (disposed || options.active?.() === false || isDragging.value || isResizing.value) return;
    stopInteractions();
    if (event.button !== 0 || isMaximized.value) return;
    const panel = panelRef.value;
    if (!panel) return;

    bringToFront();

    const rect = panel.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const minTop = 64;

    panel.style.width = `${rect.width}px`;
    panel.style.height = `${rect.height}px`;
    panel.style.left = `${rect.left}px`;
    panel.style.top = `${rect.top}px`;
    panel.style.right = "auto";
    panel.style.bottom = "auto";
    panel.style.transform = "none";
    panel.style.margin = "0";

    isResizing.value = true;
    panel.classList.add("resizing");
    panel.style.willChange = "width, height, left, top";

    const handleEl = event.currentTarget as HTMLElement | null;
    try {
      handleEl?.setPointerCapture(event.pointerId);
    } catch {}

    let resizeFrame = 0;
    let resizePoint: { x: number; y: number } | null = null;
    const renderResize = () => {
      resizeFrame = 0;
      if (!resizePoint) return;
      const dx = resizePoint.x - startX;
      const dy = resizePoint.y - startY;
      resizePoint = null;
      let left = rect.left;
      let top = rect.top;
      let width = rect.width;
      let height = rect.height;

      if (edge.includes("e")) {
        width = Math.max(minWidth, Math.min(rect.width + dx, window.innerWidth - rect.left - 8));
      }
      if (edge.includes("s")) {
        height = Math.max(minHeight, Math.min(rect.height + dy, window.innerHeight - rect.top - 8));
      }
      if (edge.includes("w")) {
        width = Math.max(minWidth, Math.min(rect.width - dx, rect.right - 8));
        left = rect.right - width;
      }
      if (edge.includes("n")) {
        height = Math.max(minHeight, Math.min(rect.height - dy, rect.bottom - minTop));
        top = rect.bottom - height;
      }

      panel.style.left = `${left}px`;
      panel.style.top = `${top}px`;
      panel.style.width = `${width}px`;
      panel.style.height = `${height}px`;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerId !== event.pointerId) return;
      resizePoint = { x: e.clientX, y: e.clientY };
      if (!resizeFrame) resizeFrame = requestAnimationFrame(renderResize);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerId !== event.pointerId) return;
      const finalW = panel.offsetWidth || rect.width;
      const finalH = panel.offsetHeight || rect.height;
      const finalL = panel.offsetLeft;
      const finalT = panel.offsetTop;
      const finalRect: WindowRect = { left: finalL, top: finalT, width: finalW, height: finalH };
      currentRect.value = finalRect;
      stopInteractions();
      if (e.type === "pointerup") savePosition(finalRect);
    };
    const onVisibilityChange = () => { if (document.hidden) stopInteractions(); };
    cleanupInteraction = () => {
      cancelAnimationFrame(resizeFrame);
      renderResize();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("blur", stopInteractions);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      try { handleEl?.releasePointerCapture(event.pointerId); } catch {}
      const finalRect = panel.getBoundingClientRect();
      currentRect.value = { left: finalRect.left, top: finalRect.top, width: finalRect.width, height: finalRect.height };
      isDragging.value = false;
      isResizing.value = false;
      panel.classList.remove("dragging", "resizing");
      panel.style.willChange = "auto";
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    // Not once: releasing another pointer must not remove the initiating pointer's listener.
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("blur", stopInteractions);
    document.addEventListener("visibilitychange", onVisibilityChange);
  }

  function toggleMaximize() {
    const panel = panelRef.value;
    if (!panel) return;
    stopInteractions();
    bringToFront();

    if (isMaximized.value) {
      // 还原
      isMaximized.value = false;
      panel.classList.remove("is-maximized");
      if (preMaxRect.value) {
        panel.style.left = `${preMaxRect.value.left}px`;
        panel.style.top = `${preMaxRect.value.top}px`;
        panel.style.width = `${preMaxRect.value.width}px`;
        panel.style.height = `${preMaxRect.value.height}px`;
      } else {
        restoreSavedPosition();
      }
    } else {
      // 最大化
      const rect = panel.getBoundingClientRect();
      preMaxRect.value = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
      };
      isMaximized.value = true;
      panel.classList.add("is-maximized");
      panel.style.left = "0px";
      panel.style.top = "0px";
      panel.style.width = "100vw";
      panel.style.height = "100vh";
    }
  }

  function handleViewportResize() {
    const panel = panelRef.value;
    if (!panel || isMaximized.value || disposed || options.active?.() === false) return;
    stopInteractions();
    const rect = panel.getBoundingClientRect();
    const nextRect = computePosition({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    nextRect.top = Math.max(0, Math.min(nextRect.top, window.innerHeight - nextRect.height - 8));
    applyRect(nextRect);
  }

  watch(() => options.active?.() ?? true, enabled => {
    if (!enabled) { stopInteractions(); window.removeEventListener("resize", handleViewportResize); }
    else if (!disposed) {
      window.addEventListener("resize", handleViewportResize);
      nextTick(() => { if (!disposed && options.active?.() !== false) handleViewportResize(); });
    }
  }, { flush: "sync" });
  onMounted(() => {
    nextTick(() => {
      if (disposed || options.active?.() === false) return;
      restoreSavedPosition();
    });
    if (options.active?.() !== false) window.addEventListener("resize", handleViewportResize);
  });

  onUnmounted(() => {
    disposed = true; stopInteractions();
    window.removeEventListener("resize", handleViewportResize);
  });

  return {
    panelRef,
    headerRef,
    initialStyle,
    isDragging,
    isResizing,
    isMaximized,
    bringToFront,
    restoreSavedPosition,
    onHeaderPointerDown,
    onHeaderClickCapture,
    onResizePointerDown,
    toggleMaximize,
    stopInteractions
  };
}
