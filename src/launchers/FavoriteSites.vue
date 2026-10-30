<script setup lang="ts">
import { ref, reactive, computed, nextTick, onMounted, onUnmounted, TransitionGroup, defineAsyncComponent } from "vue";
const BookmarkBoard = defineAsyncComponent(() => import("../bookmarks/BookmarkBoard.vue"));
const sitesView = ref<"sites" | "bookmarks">("sites");
const bookmarkSaving = ref(false);
import LauncherFavicon from "./LauncherFavicon.vue";
import LauncherTileContent from "./LauncherTileContent.vue";
import { TILE_DRAG_THRESHOLD, TILE_SWAP_COOLDOWN, inFolderDropCore, inTileSwapCore } from './tile-drag-geometry';
import LauncherAiHotCard from "./LauncherAiHotCard.vue";
import {
  launcherGroupsState,
  launcherGroupsController,
  type LauncherLink,
  type LauncherExternalDragHover
} from "./store";
import { launcherService } from "../services/launcher.service";
import { launcherMenusController } from "../launcher/menus-store";
import { folderState } from "../launcher/folder-store";
import { folderParent } from "../launcher/folder-tree";
import { notifications } from "../sdk/notifications";

function onWindowBlurOrHide() {
  cleanupPointerDrag();
  isDraggingTile = false;
  hasPointerMoved = false;
}

onMounted(() => {
  launcherGroupsController.setExternalDragHandler(onExternalDragHover);
  launcherGroupsController.setExternalDropHandler(onExternalDrop);
  window.addEventListener("blur", onWindowBlurOrHide);
  window.addEventListener("pagehide", onWindowBlurOrHide);
  document.addEventListener("visibilitychange", onWindowBlurOrHide);
  const win = window as any;
  if (launcherGroupsState.hasBili && typeof win.ensureLauncherMediaCards === "function") {
    win.ensureLauncherMediaCards();
  }
});

const isAddingPage = ref(false);
const newPageName = ref("");
const pageInputRef = ref<HTMLInputElement | null>(null);

const activeDragLinkId = ref<string | null>(null);
const activeDragGroupName = ref<string | null>(null);
const previewPageItems = ref<any[] | null>(null);
let isDraggingTile = false;
let dragEndedTimestamp = 0;
let mouseStartX = 0;
let mouseStartY = 0;

// ==================== 浮动跟手卡片状态 (Floating Drag Ghost) ====================
let lastDesktopSwapKey = "";
let lastDesktopSwapTime = 0;
let lastExternalTargetKey = "";
let lastExternalSwapTime = 0;

function onExternalDragHover(hover: LauncherExternalDragHover | null) {
  if (sitesView.value !== "sites") return;
  if (!hover || folderState.isOpen) {
    if (previewPageItems.value) previewPageItems.value = null;
    lastExternalTargetKey = "";
    return;
  }

  const targetElements = document.elementsFromPoint(hover.clientX, hover.clientY);
  const isOverSites = targetElements.some(
    (el) => el.classList.contains("launcher-site-items") || Boolean(el.closest?.(".launcher-site-items"))
  );
  if (!isOverSites) {
    if (previewPageItems.value) previewPageItems.value = null;
    lastExternalTargetKey = "";
    return;
  }

  const targetEl = targetElements.find((el) => {
    return (
      (el.classList.contains("launcher-link") && el.getAttribute("data-launcher-id") !== String(hover.link.id)) ||
      el.classList.contains("launcher-folder")
    );
  }) as HTMLElement | null;

  if (!targetEl) return;

  const isTargetLink = targetEl.classList.contains("launcher-link");
  const targetId = isTargetLink ? targetEl.getAttribute("data-launcher-id") : null;
  const targetGroup = !isTargetLink ? targetEl.getAttribute("data-launcher-folder") : null;
  const targetKey = isTargetLink ? `link-${targetId}` : `folder-${targetGroup}`;

  const rect = targetEl.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const distToCenter = Math.hypot(hover.clientX - centerX, hover.clientY - centerY);
  const now = Date.now();

  // 防抽动：光标进入核心区域，且有轻微时间冷却
  if (distToCenter > Math.max(rect.width, rect.height) * 0.55) return;
  if (targetKey === lastExternalTargetKey && now - lastExternalSwapTime < 180) return;

  const baseItems = activePageItems.value.filter(
    (item) => item.type !== "link" || String(item.link.id) !== String(hover.link.id)
  );
  const currentItems = [...(previewPageItems.value || baseItems)];
  const existingIdx = currentItems.findIndex(
    (item) => item.type === "link" && String(item.link.id) === String(hover.link.id)
  );
  const targetIdx = currentItems.findIndex((it) => it.key === targetKey);
  if (targetIdx < 0) return;

  const dragItem = {
    key: `link-${hover.link.id}`,
    type: "link" as const,
    link: hover.link
  };

  if (existingIdx >= 0) {
    if (existingIdx !== targetIdx) {
      currentItems.splice(existingIdx, 1);
      currentItems.splice(targetIdx, 0, dragItem);
      previewPageItems.value = currentItems;
      lastExternalTargetKey = targetKey;
      lastExternalSwapTime = now;
    }
  } else {
    currentItems.splice(targetIdx, 0, dragItem);
    previewPageItems.value = currentItems;
    lastExternalTargetKey = targetKey;
    lastExternalSwapTime = now;
  }
}

async function onExternalDrop(link: LauncherLink): Promise<boolean> {
  if (sitesView.value !== "sites" || folderState.isOpen) return false;
  if (previewPageItems.value) {
    const ordered = previewPageItems.value.map((item) => ({
      type: item.type,
      id: item.type === "link" ? String(item.link.id) : undefined,
      groupName: item.type === "folder" ? item.folder.groupName : undefined
    }));
    await launcherService.moveLinkTo(String(link.id), launcherGroupsState.activePage, "常用网站");
    await launcherService.reorderPageItems(launcherGroupsState.activePage, ordered);
    previewPageItems.value = null;
    lastExternalTargetKey = "";
    return true;
  }
  return false;
}

const ghostState = reactive({
  visible: false,
  x: 0,
  y: 0,
  type: "link" as "link" | "folder",
  link: null as LauncherLink | null,
  folder: null as { groupName: string; size: "small" | "large"; links: LauncherLink[] } | null,
  offsetX: 34,
  offsetY: 38
});

// ==================== 高性能 Pointer Drag 实时换位动力学系统 ====================
let activePointerId: number | null = null;
let pointerStartX = 0;
let pointerStartY = 0;
let draggedLinkId: string | null = null;
let draggedGroupName: string | null = null;
let hasPointerMoved = false;

function onTilePointerDown(link: LauncherLink, event: PointerEvent) {
  if (event.button !== 0) return;
  activePointerId = event.pointerId;
  pointerStartX = event.clientX;
  pointerStartY = event.clientY;
  mouseStartX = event.clientX;
  mouseStartY = event.clientY;
  draggedLinkId = String(link.id);
  draggedGroupName = null;
  hasPointerMoved = false;

  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  ghostState.offsetX = event.clientX - rect.left;
  ghostState.offsetY = event.clientY - rect.top;
  ghostState.type = "link";
  ghostState.link = link;
  ghostState.folder = null;

  window.addEventListener("pointermove", onGlobalPointerMove, { passive: false });
  window.addEventListener("pointerup", onGlobalPointerUp);
  window.addEventListener("pointercancel", onGlobalPointerUp);
}

function onFolderTilePointerDown(groupName: string, folder: any, event: PointerEvent) {
  if (event.button !== 0) return;
  if ((event.target as HTMLElement).closest(".launcher-folder-del-btn")) return;
  activePointerId = event.pointerId;
  pointerStartX = event.clientX;
  pointerStartY = event.clientY;
  mouseStartX = event.clientX;
  mouseStartY = event.clientY;
  draggedLinkId = null;
  draggedGroupName = groupName;
  hasPointerMoved = false;

  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  ghostState.offsetX = event.clientX - rect.left;
  ghostState.offsetY = event.clientY - rect.top;
  ghostState.type = "folder";
  ghostState.folder = {
    groupName,
    size: getFolderSize(groupName),
    links: folder?.links || []
  };
  ghostState.link = null;

  window.addEventListener("pointermove", onGlobalPointerMove, { passive: false });
  window.addEventListener("pointerup", onGlobalPointerUp);
  window.addEventListener("pointercancel", onGlobalPointerUp);
}

let pointerMoveFrame = 0;
let latestPointerMove: PointerEvent | null = null;

function cancelPointerMoveFrame() {
  cancelAnimationFrame(pointerMoveFrame);
  pointerMoveFrame = 0;
  latestPointerMove = null;
}

function onGlobalPointerMove(event: PointerEvent) {
  if (event.pointerId !== activePointerId) return;
  if (hasPointerMoved && event.cancelable) event.preventDefault();
  latestPointerMove = event;
  if (pointerMoveFrame) return;
  pointerMoveFrame = requestAnimationFrame(() => {
    pointerMoveFrame = 0;
    const latest = latestPointerMove;
    latestPointerMove = null;
    if (latest) processPointerMove(latest);
  });
}

function processPointerMove(event: PointerEvent) {
  if (event.pointerId !== activePointerId || (!draggedLinkId && !draggedGroupName)) return;
  const dist = Math.hypot(event.clientX - pointerStartX, event.clientY - pointerStartY);
  if (!hasPointerMoved && dist > TILE_DRAG_THRESHOLD) {
    hasPointerMoved = true;
    isDraggingTile = true;
    if (draggedLinkId) {
      activeDragLinkId.value = draggedLinkId;
    } else if (draggedGroupName) {
      activeDragGroupName.value = draggedGroupName;
    }
  }

  if (!hasPointerMoved) return;

  // 1. 更新挂在手上的浮动卡片坐标 (60FPS 跟手)
  if (ghostState.link || ghostState.folder) {
    ghostState.visible = true;
    ghostState.x = event.clientX - ghostState.offsetX;
    ghostState.y = event.clientY - ghostState.offsetY;
  }

  const targetElements = document.elementsFromPoint(event.clientX, event.clientY);
  const isFolderOpen = isFolderActuallyOpen();

  // While a folder is open, this gesture is collection-only, never desktop reordering.
  if (isFolderOpen) {
    const isOverFolderDialog = targetElements.some(
      (el) => el.id === "launcher-folder-dialog" || Boolean(el.closest?.("#launcher-folder-dialog"))
    );
    const folderDialogEl = document.querySelector("#launcher-folder-dialog");
    if (isOverFolderDialog && folderDialogEl) {
      folderDialogEl.classList.add("drop-hover-valid");
      folderState.dropHoverValid = true;
      return;
    } else {
      folderDialogEl?.classList.remove("drop-hover-valid");
      folderState.dropHoverValid = false;
    }
    previewPageItems.value = null;
    return;
  }

  // 3. 全网格（普通网站、中文件夹、大文件夹）统一实时换位预览 (Unified Grid Live Swap)
  const currentItems = previewPageItems.value || activePageItems.value;
  const draggedKey = draggedLinkId ? `link-${draggedLinkId}` : `folder-${draggedGroupName}`;

  if (currentItems.length) {
    const targetEl = targetElements.find((el) => {
      if (el.classList.contains("launcher-link")) {
        const id = el.getAttribute("data-launcher-id");
        return id && `link-${id}` !== draggedKey;
      }
      if (el.classList.contains("launcher-folder")) {
        const group = el.getAttribute("data-launcher-folder");
        return group && `folder-${group}` !== draggedKey;
      }
      return false;
    }) as HTMLElement | null;

    if (targetEl) {
      const isTargetLink = targetEl.classList.contains("launcher-link");
      const targetId = isTargetLink ? targetEl.getAttribute("data-launcher-id") : null;
      const targetGroup = !isTargetLink ? targetEl.getAttribute("data-launcher-folder") : null;
      const targetKey = isTargetLink ? `link-${targetId}` : `folder-${targetGroup}`;

      // Read geometry once before class writes; do not reuse it across frames,
      // since swapping, scrolling and folder changes move the hit targets.
      const rect = targetEl.getBoundingClientRect();
      let shouldSwap = true;
      // 当拖动的是链接且碰到文件夹：如果停在文件夹中央区域，判定为塞入文件夹，不换位
      if (draggedLinkId && !isTargetLink) {
        const isInCenterCore = inFolderDropCore(rect, event.clientX, event.clientY);

        if (isInCenterCore) {
          shouldSwap = false;
          targetEl.classList.add("drop-target");
        } else {
          targetEl.classList.remove("drop-target");
        }
      }

      // 防抽动：重合时需要进入目标核心区域并有冷却时间
      const now = Date.now();
      if (!inTileSwapCore(rect, event.clientX, event.clientY)) {
        shouldSwap = false;
      }
      if (targetKey === lastDesktopSwapKey && now - lastDesktopSwapTime < TILE_SWAP_COOLDOWN) {
        shouldSwap = false;
      }

      if (shouldSwap) {
        document.querySelectorAll(".launcher-folder.drop-target").forEach((f) => f.classList.remove("drop-target"));
        const fromIdx = currentItems.findIndex((it) => it.key === draggedKey);
        const toIdx = currentItems.findIndex((it) => it.key === targetKey);
        if (fromIdx >= 0 && toIdx >= 0 && fromIdx !== toIdx) {
          // Allocate only on a real swap, never once per pointer frame.
          const next = currentItems.slice();
          const item = next.splice(fromIdx, 1)[0];
          next.splice(toIdx, 0, item);
          previewPageItems.value = next;
          lastDesktopSwapKey = targetKey;
          lastDesktopSwapTime = now;
        }
      }
    }
  }

  // 4. 检测是否悬停在分区 Tab 上
  const targetTab = targetElements.find((el) => el.classList.contains("launcher-page-tab")) as HTMLElement | null;
  if (targetTab) {
    const page = targetTab.getAttribute("data-page");
    if (page && page !== launcherGroupsState.activePage) {
      targetTab.classList.add("drop-target");
    }
  } else {
    document.querySelectorAll(".launcher-page-tab.drop-target").forEach((t) => t.classList.remove("drop-target"));
  }
}

async function onGlobalPointerUp(event: PointerEvent) {
  if (event.pointerId !== activePointerId) return;
  cancelPointerMoveFrame();
  if (event.type === "pointercancel") {
    cleanupPointerDrag();
  } else {
    // Consume the release coordinates before committing the final order.
    processPointerMove(event);
  }
  window.removeEventListener("pointermove", onGlobalPointerMove);
  window.removeEventListener("pointerup", onGlobalPointerUp);
  window.removeEventListener("pointercancel", onGlobalPointerUp);

  try {
  if (hasPointerMoved) {
    dragEndedTimestamp = Date.now();
    isDraggingTile = false;

    const targetElements = document.elementsFromPoint(event.clientX, event.clientY);
    document.querySelectorAll(".launcher-page-tab.drop-target").forEach((t) => t.classList.remove("drop-target"));
    document.querySelectorAll(".launcher-folder.drop-target").forEach((f) => f.classList.remove("drop-target"));

    // 0. 文件夹打开状态：若松手在打开的文件夹弹窗内部，把网站收纳进正在打开的文件夹！
    if (isFolderActuallyOpen() && folderState.activeFolder) {
      const isOverFolderDialog = targetElements.some(
        (el) => el.id === "launcher-folder-dialog" || Boolean(el.closest?.("#launcher-folder-dialog"))
      );
      if (isOverFolderDialog) {
        const child = targetElements.find(el => el.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder");
        const target = child || folderState.activeFolder;
        if (draggedLinkId) await launcherService.moveLinkTo(draggedLinkId, undefined, target);
        else if (draggedGroupName) await launcherService.moveFolderInto(draggedGroupName, target);
      }
      return;
    }

    // 1. 拖到分区 Tab 上 -> 跨分区移动
    const targetTab = targetElements.find((el) => el.classList.contains("launcher-page-tab")) as HTMLElement | null;
    if (targetTab) {
      const targetPage = targetTab.getAttribute("data-page");
      if (targetPage) {
        if (draggedLinkId) {
          await launcherService.moveLinkTo(draggedLinkId, targetPage, "常用网站");
          await launcherService.setPage(targetPage);
        } else if (draggedGroupName) {
          await launcherService.moveFolderToPage(draggedGroupName, targetPage);
        }
        cleanupPointerDrag();
        return;
      }
    }

    // 2. 网站拖到文件夹中心 -> 放入文件夹
    if (draggedLinkId) {
      const targetFolder = targetElements.find((el) => el.classList.contains("launcher-folder")) as HTMLElement | null;
      if (targetFolder) {
        const folderName = targetFolder.getAttribute("data-launcher-folder");
        if (folderName) {
          await launcherService.moveLinkTo(draggedLinkId, launcherGroupsState.activePage, folderName);
          cleanupPointerDrag();
          return;
        }
      }
    }

    // 3. 提交全网格（网站、中/大文件夹）实时换位排列结果
    if (previewPageItems.value) {
      const ordered = previewPageItems.value.map((item) => ({
        type: item.type,
        id: item.type === "link" ? String(item.link.id) : undefined,
        groupName: item.type === "folder" ? item.folder.groupName : undefined
      }));
      await launcherService.reorderPageItems(launcherGroupsState.activePage, ordered);
    }
  }

  } catch (error) {
    notifications.show({ appName: "常用网站", title: "移动未完成", message: error instanceof Error ? error.message : "请刷新核对，未自动重试。" });
  } finally { cleanupPointerDrag(); }
}

function cleanupPointerDrag() {
  cancelPointerMoveFrame();
  activePointerId = null;
  draggedLinkId = null;
  draggedGroupName = null;
  hasPointerMoved = false;
  isDraggingTile = false;
  activeDragLinkId.value = null;
  activeDragGroupName.value = null;
  previewPageItems.value = null;
  ghostState.visible = false;
  ghostState.link = null;
  ghostState.folder = null;
  lastDesktopSwapKey = "";
  document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid");
  folderState.dropHoverValid = false;
  window.removeEventListener("pointermove", onGlobalPointerMove);
  window.removeEventListener("pointerup", onGlobalPointerUp);
  window.removeEventListener("pointercancel", onGlobalPointerUp);
}

onUnmounted(() => {
  launcherGroupsController.setExternalDragHandler(null);
  launcherGroupsController.setExternalDropHandler(null);
  cleanupPointerDrag();
  window.removeEventListener("blur", onWindowBlurOrHide);
  window.removeEventListener("pagehide", onWindowBlurOrHide);
  document.removeEventListener("visibilitychange", onWindowBlurOrHide);
  window.removeEventListener("pointermove", onGlobalPointerMove);
  window.removeEventListener("pointerup", onGlobalPointerUp);
  window.removeEventListener("pointercancel", onGlobalPointerUp);
});

function pageLabel(pageName: string): string {
  const labels = launcherGroupsState.pageLabels;
  if (labels && labels[pageName]) return labels[pageName];
  return pageName || "常用网站";
}

function isLinkInPage(link: LauncherLink, activePage: string): boolean {
  const linkPage = String(link.page || "").trim();
  const curPage = String(activePage || "").trim();
  const labels = launcherGroupsState.pageLabels || {};

  const isDefaultLink = !linkPage || linkPage === "常用网站" || linkPage === "默认";
  const isDefaultPage = !curPage || curPage === "常用网站" || curPage === "默认";
  if (isDefaultPage) return isDefaultLink;
  if (isDefaultLink) return false;

  if (linkPage === curPage) return true;

  const linkLabel = labels[linkPage] || linkPage;
  const curLabel = labels[curPage] || curPage;
  return linkLabel === curLabel || linkPage === curLabel || linkLabel === curPage;
}

// 获取文件夹大小（"small" 或 "large"）
function getFolderSize(groupName: string): "small" | "large" {
  const sizes = launcherGroupsState.groupSizes;
  if (sizes && sizes[groupName] === "large") return "large";
  return "small";
}

// 文件夹容量限制
function folderCapacity(size: "small" | "large"): number {
  return size === "large" ? 9 : 4;
}

// 获取预览中可见的微缩链接列表
function getVisibleFolderLinks(links: LauncherLink[], size: "small" | "large"): LauncherLink[] {
  const cap = folderCapacity(size);
  const visibleCount = links.length > cap ? cap - 1 : cap;
  return links.slice(0, visibleCount);
}

const activePageItems = computed(() => {
  const page = launcherGroupsState.activePage || "常用网站";
  const sourceLinks = launcherGroupsState.links;
  const pageLinks = sourceLinks.filter(
    (link) => isLinkInPage(link, page)
  );
  const folders = new Map<string, LauncherLink[]>();
  pageLinks.forEach((link) => {
    const group = link.group || "常用网站";
    if (group !== "常用网站") {
      if (!folders.has(group)) folders.set(group, []);
      folders.get(group)!.push(link);
    }
  });
  const renderedFolders = new Set<string>();
  const results: Array<
    | { key: string; type: "link"; link: LauncherLink }
    | {
        key: string;
        type: "folder";
        folder: { groupName: string; pageName: string; links: LauncherLink[] };
      }
  > = [];
  pageLinks.forEach((link) => {
    const group = link.group || "常用网站";
    if (folderParent(launcherGroupsState.folders, group)) return;
    if (group === "常用网站") {
      results.push({ key: `link-${link.id}`, type: "link", link });
    } else if (!renderedFolders.has(group)) {
      renderedFolders.add(group);
      results.push({
        key: `folder-${group}`,
        type: "folder",
        folder: {
          groupName: group,
          pageName: page,
          links: folders.get(group) || []
        }
      });
    }
  });

  // 支持渲染显式记录在当前分区的空文件夹
  const registeredFolders = launcherGroupsState.folders;
  if (registeredFolders) {
    Object.entries(registeredFolders).forEach(([groupName, info]) => {
      if (folderParent(launcherGroupsState.folders, groupName)) return;
      const fPage = info?.page || "常用网站";
      if ((fPage === page || (page === "常用网站" && (!fPage || fPage === "默认"))) && !renderedFolders.has(groupName)) {
        renderedFolders.add(groupName);
        results.push({
          key: `folder-${groupName}`,
          type: "folder",
          folder: {
            groupName,
            pageName: page,
            links: folders.get(groupName) || []
          }
        });
      }
    });
  }

  return results;
});

const displayedPageItems = computed(() => {
  if (previewPageItems.value && previewPageItems.value.length) {
    return previewPageItems.value;
  }
  return activePageItems.value;
});

const emptyText = computed(() => {
  const page = launcherGroupsState.activePage || "常用网站";
  const label = pageLabel(page);
  return label === "默认" || page === "常用网站"
    ? "还没有快捷入口，点击“编辑入口”后添加。"
    : `“${label}”还是空的，把网站拖到这里。`;
});

function setPage(pageName: string) {
  previewPageItems.value = null;
  activeDragLinkId.value = null;
  activeDragGroupName.value = null;
  launcherGroupsController.switchPage(pageName);
}

function startAddPage() {
  isAddingPage.value = true;
  newPageName.value = "";
  void nextTick(() => {
    pageInputRef.value?.focus();
  });
}

function finishAddPage() {
  if (!isAddingPage.value) return;
  const val = newPageName.value.trim();
  isAddingPage.value = false;
  if (val) {
    launcherGroupsController.addPage(val);
  }
}

function onPageInputKeydown(event: KeyboardEvent) {
  if (event.key === "Enter") {
    event.preventDefault();
    finishAddPage();
  } else if (event.key === "Escape") {
    isAddingPage.value = false;
  }
}

function openPageMenu(pageName: string, event: MouseEvent) {
  launcherGroupsController.openPageMenu(pageName, event);
}

function onPanelContextMenu(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  if (!target) return;
  if (target.closest(".launcher-link") || target.closest(".launcher-folder") || target.closest(".launcher-page-tab") || target.closest("button") || target.closest("input")) {
    return;
  }
  event.preventDefault();
  const page = launcherGroupsState.activePage || "常用网站";
  launcherMenusController.openBlankMenu(page, event.clientX, event.clientY);
}

function onWheel(event: WheelEvent) {
  if (sitesView.value !== "sites") return;
  if (!event.shiftKey || launcherGroupsState.pages.length < 2) return;
  event.preventDefault();
  if (event.deltaY > 0 || event.deltaX > 0) {
    launcherGroupsController.nextPage();
  } else {
    launcherGroupsController.prevPage();
  }
}

function onHeadContextMenu(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest(".launcher-page-tab")) {
    event.stopPropagation();
  }
}

function onLinkMouseDown(event: MouseEvent) {
  if (event.button !== 0) return;
  mouseStartX = event.clientX;
  mouseStartY = event.clientY;
}

function onLinkClick(link: LauncherLink, event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
  if (!activePointerId) {
    isDraggingTile = false;
  }
  const movedDist = Math.hypot(event.clientX - mouseStartX, event.clientY - mouseStartY);
  // 若发生位移超过 6px、或处于拖拽状态、或刚拖拽结束 600ms 内，坚决拦截一切打开行为！
  if (movedDist >= 6 || isDraggingTile || (Date.now() - dragEndedTimestamp < 600)) {
    return;
  }
  launcherGroupsController.openLink(link, event);
}

function onLinkContextMenu(link: LauncherLink, event: MouseEvent) {
  launcherGroupsController.openLinkMenu(link, event);
}

function onFolderClick(groupName: string, event: MouseEvent) {
  if (!activePointerId) {
    isDraggingTile = false;
  }
  if (isDraggingTile || (Date.now() - dragEndedTimestamp < 450)) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  launcherGroupsController.openFolder(groupName, event);
}

function onFolderContextMenu(groupName: string, pageName: string, event: MouseEvent) {
  launcherGroupsController.openFolderMenu(groupName, pageName, event);
}

function onDeleteFolder(groupName: string) {
  launcherGroupsController.deleteFolder(groupName);
}

function onTabDragOver(pageName: string, event: DragEvent) {
  const types = Array.from(event.dataTransfer?.types || []);
  if (!types.includes("application/x-newtab-launcher") && !types.includes("application/x-newtab-bookmark") && !types.includes("text/uri-list") && !types.includes("text/plain")) return;
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  if (launcherGroupsState.activePage !== pageName) {
    setPage(pageName);
  }
  const target = event.currentTarget as HTMLElement | null;
  target?.classList.add("drop-target");
}

function onTabDragLeave(event: DragEvent) {
  const target = event.currentTarget as HTMLElement | null;
  target?.classList.remove("drop-target");
}

async function onTabDrop(pageName: string, event: DragEvent) {
  const target = event.currentTarget as HTMLElement | null;
  target?.classList.remove("drop-target");

  let sourceId = "";
  const launcherRaw = event.dataTransfer?.getData("application/x-newtab-launcher");
  if (launcherRaw) {
    try {
      sourceId = String(JSON.parse(launcherRaw)?.id || "");
    } catch (_) {}
  }
  if (!sourceId && (activeDragLinkId.value || (window as any).__activeLauncherLink)) {
    sourceId = String((window as any).__activeLauncherLink?.id || activeDragLinkId.value || "");
  }

  if (sourceId) {
    event.preventDefault();
    event.stopPropagation();
    await launcherService.moveLinkTo(sourceId, pageName, "常用网站");
    await launcherService.setPage(pageName);
    return;
  }

  const win = window as any;
  if (typeof win.importDroppedLauncherItem === "function") {
    event.preventDefault();
    event.stopPropagation();
    await win.importDroppedLauncherItem(event, "常用网站", pageName);
  }
}

function onPanelDragOver(event: DragEvent) {
  const types = Array.from(event.dataTransfer?.types || []);
  if (!types.includes("application/x-newtab-launcher") && !types.includes("application/x-newtab-bookmark") && !types.includes("text/uri-list") && !types.includes("text/plain")) return;
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = types.includes("application/x-newtab-launcher") ? "move" : "copy";
  }
  const target = event.currentTarget as HTMLElement | null;
  target?.classList.add("drop-target");
}

function onPanelDragLeave(event: DragEvent) {
  const target = event.currentTarget as HTMLElement | null;
  if (!target?.contains(event.relatedTarget as Node | null)) {
    target?.classList.remove("drop-target");
  }
}

async function onPanelDrop(event: DragEvent) {
  const target = event.currentTarget as HTMLElement | null;
  target?.classList.remove("drop-target");

  // 如果拖拽的是已有的网站卡片，放置在面板空白处时移动到当前分区的末尾
  let sourceId = "";
  const launcherRaw = event.dataTransfer?.getData("application/x-newtab-launcher");
  if (launcherRaw) {
    try {
      sourceId = String(JSON.parse(launcherRaw)?.id || "");
    } catch (_) {}
  }
  if (!sourceId && (activeDragLinkId.value || (window as any).__activeLauncherLink)) {
    sourceId = String((window as any).__activeLauncherLink?.id || activeDragLinkId.value || "");
  }
  if (sourceId) {
    event.preventDefault();
    event.stopPropagation();
    await launcherService.moveLinkTo(sourceId, launcherGroupsState.activePage, "常用网站");
    return;
  }

  const win = window as any;
  if (typeof win.importDroppedLauncherItem === "function") {
    event.preventDefault();
    event.stopPropagation();
    await win.importDroppedLauncherItem(event, "常用网站", launcherGroupsState.activePage);
    return;
  }
  const text = event.dataTransfer?.getData("text/plain");
  if (text && /^https?:\/\//i.test(text.trim())) {
    event.preventDefault();
    event.stopPropagation();
    await launcherService.addLink({
      title: "",
      url: text.trim(),
      page: launcherGroupsState.activePage
    });
  }
}

function isFolderActuallyOpen(): boolean {
  if (!folderState.isOpen) return false;
  if (typeof document !== "undefined") {
    const dlg = document.querySelector("#launcher-folder-dialog") as HTMLDialogElement | null;
    return Boolean(dlg && dlg.open);
  }
  return false;
}

function onFolderDragStart(_groupName: string, event: DragEvent) {
  // Desktop folders use the pointer ghost; do not start a second native drag.
  event.preventDefault();
}

function onFolderDragOver(event: DragEvent) {
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  const el = event.currentTarget as HTMLElement | null;
  el?.classList.add("drop-target");
}

function onFolderDragLeave(event: DragEvent) {
  const el = event.currentTarget as HTMLElement | null;
  el?.classList.remove("drop-target");
}

async function onFolderDrop(targetGroupName: string, event: DragEvent) {
  const el = event.currentTarget as HTMLElement | null;
  el?.classList.remove("drop-target");
  event.preventDefault();
  event.stopPropagation();

  const folderRaw = event.dataTransfer?.getData("application/x-newtab-launcher-folder");
  if (folderRaw && folderRaw !== targetGroupName) {
    try { await launcherService.moveFolderInto(folderRaw, targetGroupName); }
    catch (error) { notifications.show({ appName: "常用网站", title: "移动未完成", message: error instanceof Error ? error.message : "请刷新后核对。" }); }
    return;
  }

  let sourceId = "";
  const launcherRaw = event.dataTransfer?.getData("application/x-newtab-launcher");
  if (launcherRaw) {
    try {
      sourceId = String(JSON.parse(launcherRaw)?.id || "");
    } catch (_) {}
  }
  if (!sourceId && (activeDragLinkId.value || (window as any).__activeLauncherLink)) {
    sourceId = String((window as any).__activeLauncherLink?.id || activeDragLinkId.value || "");
  }
  if (sourceId) {
    await launcherService.moveLinkTo(sourceId, launcherGroupsState.activePage, targetGroupName);
  }
}
</script>

<template>
  <section
    v-if="launcherGroupsState.showSites"
    class="launcher-group launcher-sites size-large"
    @wheel="onWheel"
  >
    <header
      class="launcher-group-head launcher-sites-head"
      @pointerdown.stop
      @contextmenu="onHeadContextMenu"
    >
      <div class="sites-view-switch" role="group" aria-label="网站与书签切换">
        <button type="button" :disabled="bookmarkSaving" :aria-pressed="sitesView === 'sites'" @click="sitesView = 'sites'">常用网站</button>
        <button type="button" :disabled="bookmarkSaving" :aria-pressed="sitesView === 'bookmarks'" @click="sitesView = 'bookmarks'">书签</button>
      </div>
      <div v-show="sitesView === 'sites'" class="launcher-page-tabs" role="tablist" aria-label="常用网站分区">
        <button
          v-for="pageName in launcherGroupsState.pages"
          :key="pageName"
          type="button"
          class="launcher-page-tab"
          :class="{ active: pageName === launcherGroupsState.activePage }"
          :data-page="pageName"
          role="tab"
          :title="`切换到${pageLabel(pageName)}；拖动网站到这里可移动分区；右键管理分区`"
          @pointerdown.stop
          @click.prevent.stop="setPage(pageName)"
          @contextmenu.prevent.stop="openPageMenu(pageName, $event)"
          @dragover="onTabDragOver(pageName, $event)"
          @dragleave="onTabDragLeave($event)"
          @drop="onTabDrop(pageName, $event)"
        >
          {{ pageLabel(pageName) }}
        </button>

        <button
          v-if="!isAddingPage"
          class="launcher-page-add"
          type="button"
          title="添加网站分区，例如游戏区"
          aria-label="添加网站分区"
          @click="startAddPage"
        >
          +
        </button>

        <input
          v-else
          ref="pageInputRef"
          class="launcher-page-input"
          maxlength="12"
          placeholder="例如：游戏区"
          v-model="newPageName"
          @keydown="onPageInputKeydown"
          @blur="finishAddPage"
        />

      </div>
      <div v-if="sitesView === 'bookmarks'" id="bookmark-board-header" class="launcher-page-tabs"></div>
    </header>

    <BookmarkBoard v-if="sitesView === 'bookmarks'" header-target="#bookmark-board-header" @busy="bookmarkSaving = $event" />
    <div
      v-show="sitesView === 'sites'"
      class="launcher-page-panel"
      :data-page="launcherGroupsState.activePage"
      :hidden="false"
      role="tabpanel"
      @contextmenu="onPanelContextMenu"
      @dragover="onPanelDragOver($event)"
      @dragleave="onPanelDragLeave($event)"
      @drop="onPanelDrop($event)"
    >
      <TransitionGroup
        tag="div"
        class="launcher-items launcher-site-items"
        :key="launcherGroupsState.activePage"
        :name="activeDragLinkId || activeDragGroupName ? 'launcher-grid' : ''"
      >
        <template v-for="item in displayedPageItems" :key="item.key">
          <!-- 快捷链接 -->
          <a
            v-if="item.type === 'link'"
            :key="item.key"
            class="launcher-link"
            :class="{
              'is-dragging': activeDragLinkId === String(item.link.id)
            }"
            :href="item.link.url"
            :title="item.link.title + (item.link.note ? '\n📝 ' + item.link.note : '') + '\n🔗 ' + item.link.url"
            :data-launcher-id="String(item.link.id)"
            target="_blank"
            rel="noreferrer"
            draggable="false"
            @dragstart.prevent
            @pointerdown="onTilePointerDown(item.link, $event)"
            @mousedown="onLinkMouseDown($event)"
            @click.prevent="onLinkClick(item.link, $event)"
            @contextmenu.prevent="onLinkContextMenu(item.link, $event)"
          >
            <LauncherTileContent :link="item.link" />
          </a>

          <!-- 分组大/小文件夹 -->
          <div
            v-else-if="item.type === 'folder'"
            :key="item.key"
            class="launcher-folder"
            :class="[
              `size-${getFolderSize(item.folder.groupName)}`,
              { 'is-dragging': activeDragGroupName === item.folder.groupName }
            ]"
            :title="`${item.folder.groupName}\n可拖动调整位置；右键调整收藏夹大小`"
            role="button"
            tabindex="0"
            :data-launcher-folder="String(item.folder.groupName)"
            draggable="true"
            @pointerdown="onFolderTilePointerDown(item.folder.groupName, item.folder, $event)"
            @dragstart="onFolderDragStart(item.folder.groupName, $event)"
            @dragover="onFolderDragOver($event)"
            @dragleave="onFolderDragLeave($event)"
            @drop="onFolderDrop(item.folder.groupName, $event)"
            @click="onFolderClick(item.folder.groupName, $event)"
            @contextmenu.prevent="
              onFolderContextMenu(item.folder.groupName, item.folder.pageName, $event)
            "
          >
            <LauncherTileContent :folder="{ title: item.folder.groupName, preview: item.folder.links, count: item.folder.links.length }" :size="getFolderSize(item.folder.groupName)">
              <button
                class="launcher-folder-del-btn"
                type="button"
                :title="`删除文件夹「${item.folder.groupName}」`"
                aria-label="删除文件夹"
                @pointerdown.stop
                @click.stop.prevent="onDeleteFolder(item.folder.groupName)"
              >
                ✕
              </button>
            </LauncherTileContent>
            <span class="launcher-folder-count" hidden>{{ item.folder.links.length }}</span>
          </div>
        </template>

        <!-- 空状态 -->
        <p v-if="!displayedPageItems.length" class="launcher-empty" :key="'empty-msg'">
          {{ emptyText }}
        </p>
      </TransitionGroup>
    </div>
  </section>

  <!-- 媒体卡片宿主区 -->
  <div
    v-if="launcherGroupsState.hasTodo || launcherGroupsState.hasBili"
    class="launcher-media-stack"
  >
    <LauncherAiHotCard v-if="launcherGroupsState.hasTodo" />
    <div v-else-if="launcherGroupsState.hasBili" id="launcher-bili"></div>
  </div>

  <!-- 挂在手上的超跟手浮动拖拽镜像 (Teleport 到 body，绝对跟手不被裁剪) -->
  <Teleport to="body">
    <div
      v-if="ghostState.visible"
      class="launcher-drag-ghost"
      :class="[
        ghostState.type === 'folder'
          ? `folder-ghost size-${ghostState.folder?.size}`
          : 'link-ghost'
      ]"
      :style="{
        left: `${ghostState.x}px`,
        top: `${ghostState.y}px`
      }"
    >
      <template v-if="ghostState.type === 'folder' && ghostState.folder">
        <div class="launcher-folder-preview">
          <LauncherFavicon
            v-for="(subLink, subIdx) in getVisibleFolderLinks(ghostState.folder.links, ghostState.folder.size)"
            :key="subLink.id || subIdx"
            :link="subLink"
            :mini="true"
          />
        </div>
        <span class="launcher-folder-label launcher-title">{{ ghostState.folder.groupName }}</span>
      </template>
      <template v-else-if="ghostState.link">
        <LauncherFavicon :link="ghostState.link" />
        <span class="launcher-label launcher-title">{{ ghostState.link.title }}</span>
      </template>
    </div>
  </Teleport>
</template>

<style scoped>
.sites-view-switch { display: flex; gap: 3px; flex-shrink: 0; padding: 3px; background: var(--surface); border: 1px solid var(--border); border-radius: 9px; }
.sites-view-switch button { padding: 5px 9px; border: 0; border-radius: 6px; background: transparent; color: var(--muted); font-size: 13px; font-weight: 600; cursor: pointer; }
.sites-view-switch button[aria-pressed="true"] { background: var(--panel); color: var(--heading); }
.launcher-sites { background: var(--panel) !important; border-color: var(--border) !important; }
.launcher-sites-head { flex-wrap: wrap; border-color: var(--border); }
</style>
