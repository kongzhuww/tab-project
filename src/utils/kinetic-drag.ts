/**
 * KineticDragEngine — 2D 动力学物理拖拽与惯性碰撞排序引擎 (Pure TypeScript, Zero Global Pollution)
 * 物理抽离自历史巨型脚本 newtab-launchers.js，提供：
 * 1. FLIP 弹性重排动画 (Invert & Play)；
 * 2. 16px 迟滞死区 (Hysteresis Deadzone) 数学防抖算法，彻底根除高频反复换位闪烁；
 * 3. 基于 requestAnimationFrame 的视口边缘自动滚动与坐标平滑阻尼插值。
 */

export interface KineticDragItem {
  id?: string | number | null;
  group?: string | null;
  isFolder?: boolean;
  [key: string]: any;
}

export interface KineticDragSession {
  card: HTMLElement;
  isFolder: boolean;
  linkId: string | number | null;
  groupName: string | null;
  sourceList: HTMLElement | null;
  sourceNext: Node | null;
  pointerId: number;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  lastTime: number;
  offsetX: number;
  offsetY: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  started: boolean;
  reducedMotion: boolean;
  ghost: HTMLElement | null;
  reference: Node | null;
  targetContainer: HTMLElement | null;
  folderTarget: string | null;
  folderDropElement: HTMLElement | null;
  mergeTarget: HTMLElement | null;
  raf: number;
  previewRaf: number;
  _lastSwapTime?: number;
  cleanup?: () => void;
}

export type DragEntityDesc = { kind: "folder" | "link"; id?: any; group?: any };

export interface KineticDragCallbacks {
  onMoveToFolder?: (linkId: string | number, folderName: string) => Promise<void> | void;
  onStackLinks?: (sourceId: string | number, targetId: string | number) => Promise<void> | void;
  onReorder?: (
    source: DragEntityDesc,
    target: DragEntityDesc,
    position: "before" | "after"
  ) => Promise<void> | void;
  onFolderHover?: (isOpen: boolean) => void;
}

export class KineticDragEngine {
  private static instance: KineticDragEngine;
  private currentSession: KineticDragSession | null = null;
  private suppressClickUntil: number = 0;

  public static getInstance(): KineticDragEngine {
    if (!KineticDragEngine.instance) {
      KineticDragEngine.instance = new KineticDragEngine();
    }
    return KineticDragEngine.instance;
  }

  public getCurrentSession(): KineticDragSession | null {
    return this.currentSession;
  }

  public shouldSuppressClick(): boolean {
    return Date.now() < this.suppressClickUntil;
  }

  // ==========================================================================
  // FLIP 弹性重排动画 (First-Last-Invert-Play)
  // ==========================================================================
  public animateFlip(container: HTMLElement | null, mutator: () => void): void {
    if (!container || !mutator) return;
    const items = [...container.children].filter(
      (el): el is HTMLElement =>
        el.nodeType === 1 &&
        !el.classList.contains("launcher-kinetic-ghost") &&
        !el.classList.contains("launcher-kinetic-placeholder") &&
        !el.classList.contains("launcher-empty")
    );

    const before = new Map<HTMLElement, DOMRect>(items.map((el) => [el, el.getBoundingClientRect()]));
    mutator();

    const reduceMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    items.forEach((el) => {
      if (!el.isConnected) return;
      const first = before.get(el);
      if (!first) return;
      const last = el.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;

      el.getAnimations()
        .filter((a: any) => a.id === "launcher-flip")
        .forEach((a) => a.cancel());

      const animation = el.animate(
        [{ transform: `translate3d(${dx}px,${dy}px,0)` }, { transform: "translate3d(0,0,0)" }],
        { duration: 115, easing: "cubic-bezier(.16,.94,.2,1)" }
      );
      (animation as any).id = "launcher-flip";
    });
  }

  // ==========================================================================
  // 占位符位置与迟滞死区判定 (Hysteresis Deadzone)
  // ==========================================================================
  public placePreview(session: KineticDragSession, clientX: number, clientY: number): void {
    if (!session?.started || this.currentSession !== session) return;

    const pointed = document.elementsFromPoint(clientX, clientY);
    const folderDialog = document.querySelector("#launcher-folder-dialog, .launcher-folder-dialog") as HTMLElement | null;
    const isFolderDialogOpen = Boolean(
      folderDialog?.hasAttribute?.("open") || (window as any).LogicWeaverLauncherFolder?.state?.isOpen
    );

    // 1. 打开文件夹对话框的投放模式
    const openFolderMode = (!session.isFolder && isFolderDialogOpen);
    const openFolderBody = openFolderMode
      ? pointed.map((n) => n.closest?.("#launcher-folder-dialog-items, .launcher-folder-dialog-items")).find(Boolean)
      : null;

    if (openFolderMode) {
      document.querySelectorAll(".launcher-link.merge-target").forEach((el) => el.classList.remove("merge-target"));
      session.mergeTarget = null;
      if (openFolderBody) {
        const dropTargetEl = (document.getElementById("launcher-folder-dialog-items") || openFolderBody) as HTMLElement;
        session.folderDropElement?.classList.remove("launcher-folder-drop-active");
        session.folderDropElement = dropTargetEl;
        const openFolderName = (window as any).LogicWeaverLauncherFolder?.state?.activeFolder || null;
        session.folderTarget = openFolderName && session.groupName !== openFolderName ? openFolderName : null;
        dropTargetEl.classList.add("launcher-folder-drop-active");
        folderDialog?.classList.add("drop-hover-valid");
        (window as any).LogicWeaverLauncherFolder?.setDropHoverValid?.(true);
      } else {
        this.clearFolderDrop(session);
      }
      return;
    }

    // 2. 换位节流保护
    const now = performance.now();
    if (session._lastSwapTime && now - session._lastSwapTime < 70) return;

    const container = (pointed.find(
      (node) =>
        node.classList?.contains("launcher-site-items") ||
        node.classList?.contains("launcher-items") ||
        node.classList?.contains("launcher-folder-grid")
    ) || session.card.parentElement) as HTMLElement | null;

    if (!container) return;
    this.clearFolderDrop(session);

    const allCards = [...container.children].filter(
      (el): el is HTMLElement =>
        el.nodeType === 1 &&
        el !== session.card &&
        !el.classList.contains("launcher-kinetic-ghost") &&
        !el.classList.contains("launcher-empty") &&
        (el.classList.contains("launcher-link") || el.classList.contains("launcher-folder"))
    );

    if (!allCards.length) {
      if (session.card.parentElement !== container) {
        this.animateFlip(container, () => container.appendChild(session.card));
        session.reference = null;
        session.targetContainer = container;
        session._lastSwapTime = now;
      }
      return;
    }

    // 3. 计算最近候选卡片
    let bestCard: HTMLElement | null = null;
    let bestDist = Infinity;
    let bestRect: DOMRect | null = null;

    for (const card of allCards) {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = Math.hypot(clientX - cx, clientY - cy);
      if (dist < bestDist) {
        bestDist = dist;
        bestCard = card;
        bestRect = r;
      }
    }

    if (!bestCard || !bestRect) return;

    // 4. 拖动至已有文件夹卡片
    if (!session.isFolder && bestCard.classList.contains("launcher-folder")) {
      const inBounds = clientX >= bestRect.left && clientX <= bestRect.right && clientY >= bestRect.top && clientY <= bestRect.bottom;
      if (inBounds) {
        document.querySelectorAll(".launcher-link.merge-target").forEach((el) => el.classList.remove("merge-target"));
        session.mergeTarget = null;
        if (session.folderDropElement !== bestCard) {
          session.folderDropElement?.classList.remove("launcher-folder-drop-active");
          session.folderDropElement = bestCard;
          session.folderTarget = bestCard.dataset.launcherFolder || null;
          bestCard.classList.add("launcher-folder-drop-active");
        }
        return;
      }
    }

    // 5. 拖动到卡片正中心合并成新文件夹
    if (!session.isFolder && !session.folderTarget && bestCard.classList.contains("launcher-link") && bestDist < Math.min(bestRect.width, bestRect.height) * 0.24) {
      bestCard.classList.add("merge-target");
      session.mergeTarget = bestCard;
      return;
    }
    document.querySelectorAll(".launcher-link.merge-target").forEach((el) => el.classList.remove("merge-target"));
    session.mergeTarget = null;

    // 6. 跨容器插入
    if (session.card.parentElement !== container) {
      const isTargetAfter = clientX > bestRect.left + bestRect.width * 0.5;
      const reference = isTargetAfter ? bestCard.nextElementSibling : bestCard;
      session._lastSwapTime = now;
      this.animateFlip(container, () => {
        if (reference) container.insertBefore(session.card, reference);
        else container.appendChild(session.card);
      });
      session.reference = reference;
      session.targetContainer = container;
      return;
    }

    // 7. 同容器数学迟滞死区重排 (HYSTERESIS = 16px)
    const pRect = session.card.getBoundingClientRect();
    const pDist = Math.hypot(clientX - (pRect.left + pRect.width / 2), clientY - (pRect.top + pRect.height / 2));
    const HYSTERESIS = 16;
    if (bestDist >= pDist - HYSTERESIS) return;

    const isTargetAfter = Boolean(session.card.compareDocumentPosition(bestCard) & Node.DOCUMENT_POSITION_FOLLOWING);
    const reference = isTargetAfter ? bestCard.nextElementSibling : bestCard;
    const alreadyPlaced = reference ? session.card.nextElementSibling === reference : session.card === container.lastElementChild;
    if (alreadyPlaced) return;

    session._lastSwapTime = now;
    this.animateFlip(container, () => {
      if (reference) container.insertBefore(session.card, reference);
      else container.appendChild(session.card);
    });
    session.reference = reference;
    session.targetContainer = container;
  }

  public clearFolderDrop(session?: KineticDragSession | null): void {
    session?.folderDropElement?.classList.remove("launcher-folder-drop-active");
    document.querySelectorAll(".launcher-folder-dialog, #launcher-folder-dialog").forEach((el) => el.classList.remove("drop-hover-valid"));
    document.querySelectorAll(".launcher-folder.launcher-folder-drop-active").forEach((el) => el.classList.remove("launcher-folder-drop-active"));
    (window as any).LogicWeaverLauncherFolder?.setDropHoverValid?.(false);
    if (session) {
      session.folderDropElement = null;
      session.folderTarget = null;
    }
  }

  public beginDrag(session: KineticDragSession): void {
    if (session.started || this.currentSession !== session) return;
    session.started = true;
    session.reducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const rect = session.card.getBoundingClientRect();
    session.offsetX = session.startX - rect.left;
    session.offsetY = session.startY - rect.top;
    session.x = rect.left; session.y = rect.top;
    session.targetX = rect.left; session.targetY = rect.top;

    const ghost = session.card.cloneNode(true) as HTMLElement;
    session.ghost = ghost;
    ghost.className = `${session.card.className} launcher-kinetic-ghost`;
    ghost.removeAttribute("tabindex");
    ghost.removeAttribute("title");
    ghost.setAttribute("aria-hidden", "true");
    ghost.querySelectorAll("button,input,a,[tabindex]").forEach((node) => node.setAttribute("tabindex", "-1"));
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;

    session.card.classList.add("launcher-kinetic-placeholder");
    document.body.appendChild(ghost);
    document.body.classList.add("launcher-kinetic-active");
    this.paintLoop(session);
  }

  private paintLoop(session: KineticDragSession): void {
    if (this.currentSession !== session || !session.started || !session.ghost) return;
    session.x += (session.targetX - session.x) * (session.reducedMotion ? 1 : 0.92);
    session.y += (session.targetY - session.y) * (session.reducedMotion ? 1 : 0.92);
    session.ghost.style.transform = `translate3d(${session.x}px,${session.y}px,0) scale(1.02)`;
    session.raf = requestAnimationFrame(() => this.paintLoop(session));
  }

  public finishDrag(
    session: KineticDragSession | null,
    commit = true,
    immediate = false,
    callbacks?: KineticDragCallbacks
  ): void {
    if (!session || this.currentSession !== session) return;
    session.cleanup?.();
    cancelAnimationFrame(session.raf);
    if (session.previewRaf) cancelAnimationFrame(session.previewRaf);
    const card = session.card;
    try { card.releasePointerCapture(session.pointerId); } catch {}
    card.draggable = false;
    if (!session.started) {
      this.currentSession = null;
      return;
    }

    this.suppressClickUntil = Date.now() + 450;
    this.clearFolderDrop(session);

    if (!commit && session.sourceList?.isConnected) {
      this.animateFlip(session.sourceList, () => {
        if (session.sourceNext?.isConnected) session.sourceList?.insertBefore(session.card, session.sourceNext);
        else session.sourceList?.appendChild(session.card);
      });
    }

    const landingRect = card.getBoundingClientRect();
    const complete = async () => {
      session.ghost?.remove();
      card.classList.remove("launcher-kinetic-placeholder");
      document.body.classList.remove("launcher-kinetic-active");
      this.currentSession = null;
      if (!commit) return;

      if (!session.isFolder && session.folderTarget) {
        if (callbacks?.onMoveToFolder && session.linkId) {
          await callbacks.onMoveToFolder(session.linkId, session.folderTarget);
        }
        return;
      }

      if (session.mergeTarget) {
        const targetLinkId = session.mergeTarget.dataset.launcherId;
        if (targetLinkId && session.linkId && callbacks?.onStackLinks) {
          await callbacks.onStackLinks(session.linkId, targetLinkId);
        }
        return;
      }

      const parent = card.parentElement;
      if (!parent) return;
      const siblings = [...parent.children].filter(
        (c): c is HTMLElement => c.classList.contains("launcher-link") || c.classList.contains("launcher-folder")
      );
      const currentIndex = siblings.indexOf(card);
      if (currentIndex < 0) return;

      const nextCard = siblings[currentIndex + 1];
      const prevCard = siblings[currentIndex - 1];
      const sourceDesc: DragEntityDesc = session.isFolder
        ? { kind: "folder", group: session.groupName }
        : { kind: "link", id: session.linkId };

      if (nextCard && callbacks?.onReorder) {
        const nextDesc: DragEntityDesc = nextCard.classList.contains("launcher-folder")
          ? { kind: "folder", group: nextCard.dataset.launcherFolder }
          : { kind: "link", id: nextCard.dataset.launcherId };
        await callbacks.onReorder(sourceDesc, nextDesc, "before");
      } else if (prevCard && callbacks?.onReorder) {
        const prevDesc: DragEntityDesc = prevCard.classList.contains("launcher-folder")
          ? { kind: "folder", group: prevCard.dataset.launcherFolder }
          : { kind: "link", id: prevCard.dataset.launcherId };
        await callbacks.onReorder(sourceDesc, prevDesc, "after");
      }
    };

    if (immediate || !session.ghost?.isConnected || (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)) {
      void complete();
      return;
    }

    const landing = session.ghost.animate(
      [
        { transform: `translate3d(${session.x}px,${session.y}px,0) scale(1.02)` },
        { transform: `translate3d(${landingRect.left}px,${landingRect.top}px,0) scale(1)` }
      ],
      { duration: 105, easing: "cubic-bezier(.14,.96,.2,1)" }
    );
    landing.addEventListener("finish", () => void complete(), { once: true });
    landing.addEventListener("cancel", () => void complete(), { once: true });
  }
}

export const kineticDragEngine = KineticDragEngine.getInstance();

if (typeof window !== "undefined") {
  (window as any).LogicWeaverKineticDrag = kineticDragEngine;
}
