<script setup lang="ts">
import { computed, ref, onBeforeUnmount, watch, TransitionGroup } from "vue";
import { InlineTitleInput, InlineEditStatus, useInlineTitleEdit } from "../sdk/interactions";
import { notifications } from "../sdk/notifications";
import { cleanFolderTitle } from "./title-storage";
import { folderState, launcherFolderController, type LauncherFolderLink } from "./folder-store";
import { launcherService } from "../services/launcher.service";
import { launcherGroupsController } from "../launchers/store";
import LauncherFavicon from "../launchers/LauncherFavicon.vue";
import LauncherFolderSurface from "./LauncherFolderSurface.vue";
import LauncherTileContent from "../launchers/LauncherTileContent.vue";

const state = folderState;
const wasAlreadyOpen = ref(false);
const folderBusy = ref(false);
function folderError(error: unknown) {
  notifications.show({ appName: "常用网站", title: "文件夹操作未完成", message: error instanceof Error ? error.message : "请刷新核对，未自动重试。" });
}
function openChild(name: string) {
  if (moveBusy || folderBusy.value || Date.now() < suppressUntil) return;
  launcherFolderController.dispatch("folder:open", name);
}
async function createChild() {
  const parent = state.activeFolder;
  if (!parent || folderBusy.value) return;
  folderBusy.value = true;
  try { await launcherService.createFolder("small", undefined, undefined, parent); }
  catch (error) { folderError(error); }
  finally { folderBusy.value = false; }
}
async function moveCurrentUp() {
  const source = state.activeFolder, parent = state.parentFolder;
  if (!source || !parent || folderBusy.value) return;
  folderBusy.value = true;
  try { await launcherService.moveFolderInto(source, launcherService.getFolderParent(parent)); }
  catch (error) { folderError(error); }
  finally { folderBusy.value = false; }
}
function startChildDrag(name: string, event: DragEvent) {
  event.dataTransfer?.setData("application/x-newtab-launcher-folder", name);
  if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
}
function endChildDrag() { state.dropHoverValid = false; }

watch(() => state.isOpen, (open) => {
  if (!open) {
    wasAlreadyOpen.value = false;
  } else {
    // 延迟一帧，保证初次打开有动画，后续切文件夹无闪烁重入动画
    requestAnimationFrame(() => {
      wasAlreadyOpen.value = true;
    });
  }
});

let isDragging = false;
let startX = 0;
let startY = 0;
let initialLeft = 0;
let initialTop = 0;

const dialogStyle = computed(() => {
  const pos = state.position;
  if (!pos) {
    return {
      left: "50%",
      top: "46%",
      transform: "translate(-50%, -50%)",
      margin: "0"
    };
  }
  const style: Record<string, string> = {
    transform: "none",
    margin: "0"
  };
  if (pos.left !== undefined) style.left = typeof pos.left === "number" ? `${pos.left}px` : String(pos.left);
  if (pos.top !== undefined) style.top = typeof pos.top === "number" ? `${pos.top}px` : String(pos.top);
  if (pos.bottom !== undefined) style.bottom = typeof pos.bottom === "number" ? `${pos.bottom}px` : String(pos.bottom);
  if (pos.right !== undefined) style.right = typeof pos.right === "number" ? `${pos.right}px` : String(pos.right);
  if (pos.maxHeight !== undefined) style.maxHeight = typeof pos.maxHeight === "number" ? `${pos.maxHeight}px` : String(pos.maxHeight);
  return style;
});

function onHeaderPointerDown(e: PointerEvent) {
  if ((e.target as HTMLElement).closest("button")) return;
  const dialog = document.getElementById("launcher-folder-dialog");
  if (!dialog) return;
  isDragging = true;
  state.isDragging = true;
  const rect = dialog.getBoundingClientRect();
  initialLeft = rect.left;
  initialTop = rect.top;
  startX = e.clientX;
  startY = e.clientY;
  try {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  } catch (_) {}
}

function onHeaderPointerMove(e: PointerEvent) {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  const nextLeft = Math.max(12, Math.min(window.innerWidth - 300, initialLeft + dx));
  const nextTop = Math.max(12, Math.min(window.innerHeight - 200, initialTop + dy));
  launcherFolderController.setPosition({ left: nextLeft, top: nextTop });
}

function onHeaderPointerUp(e: PointerEvent) {
  if (!isDragging) return;
  isDragging = false;
  state.isDragging = false;
  try {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  } catch (_) {}
}

function handleHeaderDblClick() {
  launcherFolderController.setPosition(null);
}

const titleEdit = useInlineTitleEdit<string>({
  save: async (group, draft) => {
    const clean = cleanFolderTitle(draft);
    await launcherService.renameGroup(group, clean);
    return clean;
  },
  apply: (_group, saved) => {
    launcherFolderController.dispatch("folder:open", saved);
    titleMessage.value = "已保存";
  },
  detachedError: message => {
    notifications.show({ appName: "常用网站", title: "文件夹标题保存未完成", message, duration: 12000 });
  }
});
const { editing: isEditingTitle, draft: editingTitleText, busy: titleBusy,
  message: titleMessage, failed: titleFailed, revision: titleRevision } = titleEdit;
watch(() => [state.isOpen, state.activeFolder], titleEdit.reset, { flush: "sync" });
function startEditTitle() {
  if (state.activeFolder) titleEdit.start(state.activeFolder, state.activeFolder);
}
const saveTitle = titleEdit.commit;
const cancelEditTitle = titleEdit.cancel;

function handleClose() {
  titleEdit.reset();
  launcherFolderController.closeFolder();
  launcherFolderController.dispatch("close");
}

function handleBackdropClick() {
  if (titleBusy.value || (isEditingTitle.value && titleFailed.value)) return;
  titleEdit.reset();
  launcherFolderController.closeFolder();
  launcherFolderController.dispatch("close");
}

let dialogActivePointerId: number | null = null;
let startPointerX = 0, startPointerY = 0, offsetX = 0, offsetY = 0;
let draggedId: string | null = null;
let moved = false, moveBusy = false, suppressUntil = 0;
let capture: HTMLElement | null = null;
let lastFolderSwapTargetId = "";
let lastFolderSwapTime = 0;
const previewLinks = ref<LauncherFolderLink[] | null>(null);
const displayedLinks = computed(() => previewLinks.value || state.links);
const dragGhost = ref<{ link: LauncherFolderLink; x: number; y: number; width: number; height: number } | null>(null);
let pendingGhost: NonNullable<typeof dragGhost.value> | null = null;

function clearLinkDrag() {
  window.removeEventListener("pointermove", onDialogPointerMove);
  window.removeEventListener("pointerup", onDialogPointerUp);
  window.removeEventListener("pointercancel", onDialogPointerUp);
  window.removeEventListener("blur", clearLinkDrag);
  window.removeEventListener("keydown", onDragKeyDown);
  if (moved) suppressUntil = Date.now() + 400;
  try { if (capture && dialogActivePointerId !== null) capture.releasePointerCapture(dialogActivePointerId); } catch {}
  capture = null; pendingGhost = null; dragGhost.value = null; previewLinks.value = null;
  dialogActivePointerId = null; draggedId = null; moved = false;
  lastFolderSwapTargetId = "";
  launcherGroupsController.handleExternalDragHover(null);
  document.querySelectorAll(".launcher-page-tab.drop-target, #launcher-folder-dialog [data-child-folder].drop-target").forEach(el => el.classList.remove("drop-target"));
}
function onDragKeyDown(event: KeyboardEvent) {
  if (event.key === "Escape") { event.preventDefault(); clearLinkDrag(); }
}
watch(() => [state.isOpen, state.activeFolder], clearLinkDrag);
onBeforeUnmount(clearLinkDrag);

function onDialogLinkPointerDown(link: LauncherFolderLink, event: PointerEvent) {
  if (event.button !== 0 || !event.isPrimary || moveBusy) return;
  clearLinkDrag(); event.preventDefault(); event.stopPropagation();
  capture = event.currentTarget as HTMLElement; capture.blur();
  const rect = capture.getBoundingClientRect();
  offsetX = event.clientX - rect.left; offsetY = event.clientY - rect.top;
  pendingGhost = { link, x: rect.left, y: rect.top, width: rect.width, height: rect.height };
  dialogActivePointerId = event.pointerId;
  startPointerX = event.clientX; startPointerY = event.clientY;
  draggedId = String(link.id);
  lastFolderSwapTargetId = "";
  lastFolderSwapTime = 0;
  previewLinks.value = [...state.links];
  try { capture.setPointerCapture(event.pointerId); } catch {}
  window.addEventListener("pointermove", onDialogPointerMove, { passive: false });
  window.addEventListener("pointerup", onDialogPointerUp);
  window.addEventListener("pointercancel", onDialogPointerUp);
  window.addEventListener("blur", clearLinkDrag);
  window.addEventListener("keydown", onDragKeyDown);
}

function onDialogPointerMove(event: PointerEvent) {
  if (event.pointerId !== dialogActivePointerId || !pendingGhost) return;
  if (!moved && Math.hypot(event.clientX - startPointerX, event.clientY - startPointerY) <= 5) return;
  event.preventDefault(); moved = true;
  dragGhost.value = { ...pendingGhost, x: event.clientX - offsetX, y: event.clientY - offsetY };
  document.querySelectorAll(".launcher-page-tab.drop-target").forEach(el => el.classList.remove("drop-target"));
  const elements = document.elementsFromPoint(event.clientX, event.clientY);
  elements.find(el => el.classList.contains("launcher-page-tab"))?.classList.add("drop-target");

  const isInsideFolder = elements.some(
    (el) => el.id === "launcher-folder-dialog" || Boolean(el.closest?.("#launcher-folder-dialog"))
  );

  if (isInsideFolder) {
    // 正在文件夹内部：通知外部桌面取消让位预览
    launcherGroupsController.handleExternalDragHover(null);

    document.querySelectorAll("#launcher-folder-dialog [data-child-folder].drop-target").forEach(el => el.classList.remove("drop-target"));
    const child = elements.find(el => el.hasAttribute("data-child-folder"));
    if (child) { child.classList.add("drop-target"); return; }
    if (!previewLinks.value) return;

    // 1. 直觉命中：光标移到文件夹内其他图标核心区域时，平滑对调让位
    const targetLinkEl = elements.find((el) => {
      if (el.classList.contains("launcher-link") && el.closest("#launcher-folder-dialog-items")) {
        const id = el.getAttribute("data-launcher-id");
        return id && String(id) !== draggedId;
      }
      return false;
    }) as HTMLElement | null;

    if (targetLinkEl) {
      const targetId = targetLinkEl.getAttribute("data-launcher-id") || "";
      const rect = targetLinkEl.getBoundingClientRect();
      const distToCenter = Math.hypot(
        event.clientX - (rect.left + rect.width / 2),
        event.clientY - (rect.top + rect.height / 2)
      );
      const now = Date.now();

      // 防抽动关键：必须进入目标图标核心区域，且有轻微冷却保护，防止重合时高频往复抽动
      if (distToCenter < Math.max(rect.width, rect.height) * 0.48) {
        if (targetId !== lastFolderSwapTargetId || now - lastFolderSwapTime > 180) {
          const to = previewLinks.value.findIndex((link) => String(link.id) === targetId);
          const from = previewLinks.value.findIndex((link) => String(link.id) === draggedId);
          if (from >= 0 && to >= 0 && from !== to) {
            const next = [...previewLinks.value];
            const item = next.splice(from, 1)[0];
            next.splice(to, 0, item);
            previewLinks.value = next;
            lastFolderSwapTargetId = targetId;
            lastFolderSwapTime = now;
          }
        }
      }
    }
  } else {
    // 拖出了文件夹：让外部主桌面的网站实时平滑让位！
    launcherGroupsController.handleExternalDragHover({
      link: pendingGhost.link as any,
      clientX: event.clientX,
      clientY: event.clientY
    });
  }
}

async function onDialogPointerUp(event: PointerEvent) {
  if (event.pointerId !== dialogActivePointerId) return;
  const id = draggedId, didMove = moved, order = previewLinks.value;
  const hit = document.elementsFromPoint(event.clientX, event.clientY).find(el => el.id !== "launcher-folder-backdrop");

  window.removeEventListener("pointermove", onDialogPointerMove);
  window.removeEventListener("pointerup", onDialogPointerUp);
  window.removeEventListener("pointercancel", onDialogPointerUp);
  window.removeEventListener("blur", clearLinkDrag);
  window.removeEventListener("keydown", onDragKeyDown);
  if (moved) suppressUntil = Date.now() + 400;
  try { if (capture && dialogActivePointerId !== null) capture.releasePointerCapture(dialogActivePointerId); } catch {}
  capture = null; pendingGhost = null; dragGhost.value = null;
  dialogActivePointerId = null; draggedId = null; moved = false;
  lastFolderSwapTargetId = "";
  document.querySelectorAll(".launcher-page-tab.drop-target").forEach(el => el.classList.remove("drop-target"));

  if (event.type === "pointercancel" || !didMove || !id || moveBusy) {
    launcherGroupsController.handleExternalDragHover(null);
    previewLinks.value = null;
    return;
  }
  if (!hit) {
    launcherGroupsController.handleExternalDragHover(null);
    previewLinks.value = null;
    return;
  }

  const inside = hit.closest("#launcher-folder-dialog");
  const insideGrid = hit.closest("#launcher-folder-dialog-items");

  moveBusy = true;
  try {
    if (inside) {
      launcherGroupsController.handleExternalDragHover(null);
      const child = hit.closest<HTMLElement>("[data-child-folder]")?.dataset.childFolder;
      if (child) await launcherService.moveLinkTo(id, undefined, child);
      else if (insideGrid && order) await launcherService.reorderFolderLinks(state.activeFolder, order.map(link => String(link.id)));
      previewLinks.value = null;
    } else {
      // 拖到文件夹外部：尝试在主桌面让位位置落位
      const droppedOnDesktop = await launcherGroupsController.handleExternalDrop({ id } as any);
      launcherGroupsController.handleExternalDragHover(null);
      if (droppedOnDesktop) {
        folderState.links = folderState.links.filter(l => String(l.id) !== id);
        previewLinks.value = null;
      } else {
        const tab = hit.closest<HTMLElement>(".launcher-page-tab");
        const folder = hit.closest<HTMLElement>("[data-launcher-folder]");
        previewLinks.value = null;
        await launcherService.moveLinkTo(id, tab?.dataset.page || launcherService.getState().activePage, folder?.dataset.launcherFolder || "常用网站");
      }
    }
  } catch (error) {
    folderError(error);
    previewLinks.value = null;
    launcherGroupsController.handleExternalDragHover(null);
  } finally {
    document.querySelectorAll("#launcher-folder-dialog [data-child-folder].drop-target").forEach(el => el.classList.remove("drop-target"));
    moveBusy = false;
  }
}
function handleLinkClick(link: LauncherFolderLink, event: MouseEvent) {
  if (moved || Date.now() < suppressUntil) { event.preventDefault(); event.stopPropagation(); return; }
  launcherFolderController.dispatch("link:click", { link, event });
}
function handleLinkContextMenu(link: LauncherFolderLink, event: MouseEvent) {
  event.preventDefault();
  launcherFolderController.dispatch("link:contextmenu", { link, clientX: event.clientX, clientY: event.clientY });
}

function onFolderDragOver(event: DragEvent) {
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  folderState.dropHoverValid = true;
}

function onFolderDragLeave() {
  folderState.dropHoverValid = false;
}

async function onFolderDrop(event: DragEvent, target = state.activeFolder) {
  folderState.dropHoverValid = false;
  event.preventDefault(); event.stopPropagation();
  if (!target) return;
  const sourceFolder = event.dataTransfer?.getData("application/x-newtab-launcher-folder");
  const raw = event.dataTransfer?.getData("application/x-newtab-launcher");
  try {
    if (sourceFolder) await launcherService.moveFolderInto(sourceFolder, target);
    else if (raw) {
      const sourceLink = JSON.parse(raw) as LauncherFolderLink;
      if (sourceLink.id) await launcherService.moveLinkTo(sourceLink.id, undefined, target);
    }
  } catch (error) { folderError(error); }
}
</script>

<template>
  <div class="launcher-folder-island">
    <!-- 弹窗遮罩背景 -->
    <div
      id="launcher-folder-backdrop"
      class="launcher-folder-backdrop"
      :hidden="!state.isOpen"
      @click="handleBackdropClick"
    ></div>

    <!-- 大文件夹展开原生/Vue dialog -->
    <LauncherFolderSurface
      id="launcher-folder-dialog"
      class="launcher-dialog launcher-folder-dialog"
      :class="{
        'drop-hover-valid': state.dropHoverValid,
        dragging: state.isDragging
      }"
      :open="state.isOpen"
      :data-opened="wasAlreadyOpen ? 'active' : undefined"
      :style="dialogStyle"
    >
        <header
          title="按住鼠标可自由拖动；双击恢复屏幕居中"
          style="cursor: grab; user-select: none;"
          @pointerdown="onHeaderPointerDown"
          @pointermove="onHeaderPointerMove"
          @pointerup="onHeaderPointerUp"
          @pointercancel="onHeaderPointerUp"
          @dblclick="handleHeaderDblClick"
        >
          <button v-if="state.parentFolder" type="button" class="folder-nav-action" :title="`返回 ${state.parentFolder}`"
            aria-label="返回上一级" @pointerdown.stop @click.stop="openChild(state.parentFolder)">‹</button>
          <!-- 仅名字文字自身紧凑占据宽度，外部整片空间皆可拖动 -->
          <div class="launcher-folder-title-box">
            <InlineTitleInput
              v-if="isEditingTitle"
              v-model="editingTitleText"
              :busy="titleBusy"
              :revision="titleRevision"
              :aria-invalid="titleFailed || undefined"
              class="launcher-folder-title-input"
              maxlength="20"
              placeholder="输入文件夹名称"
              @pointerdown.stop
              @dblclick.stop
              @commit="saveTitle"
              @cancel="cancelEditTitle"
            />
            <h2
              v-else
              id="launcher-folder-dialog-title"
              title="点击修改名称"
              style="cursor: pointer; user-select: none;"
              @pointerdown.stop
              @dblclick.stop
              @click.stop="startEditTitle"
            >
              <span class="folder-title-text">{{ state.activeFolder }}</span>
              <span class="folder-title-edit-hint" aria-hidden="true">✎</span>
            </h2>
          </div>

          <!-- 拖动区域占位垫片：鼠标按住整片区域皆可自由拖拽 -->
          <div class="launcher-folder-drag-spacer" aria-hidden="true"></div>

          <button v-if="state.parentFolder" type="button" class="folder-nav-action" title="将当前文件夹移到上一级"
            :disabled="folderBusy" @pointerdown.stop @click.stop="moveCurrentUp">↥</button>
          <button type="button" class="folder-nav-action" title="新建子文件夹" aria-label="新建子文件夹"
            :disabled="folderBusy" @pointerdown.stop @click.stop="createChild">＋</button>
          <button
            id="launcher-folder-close"
            type="button"
            title="关闭"
            @pointerdown.stop
            @click.stop="handleClose"
          >✕</button>
        </header>
        <InlineEditStatus :message="titleMessage" :failed="titleFailed" />

        <TransitionGroup
          tag="div"
          id="launcher-folder-dialog-items"
          class="launcher-folder-dialog-items"
          :name="dragGhost ? 'folder-items-grid' : undefined"
          :css="Boolean(dragGhost)"
          @dragover="onFolderDragOver"
          @dragleave="onFolderDragLeave"
          @drop="onFolderDrop"
        >
          <button v-for="child in state.folders" :key="'folder:' + child.groupName" type="button"
            class="launcher-folder size-small child-folder-tile" :data-child-folder="child.groupName"
            :title="`${child.groupName}（点击打开；可拖入其他文件夹）`" draggable="true"
            @pointerdown.stop @click.stop="openChild(child.groupName)"
            @contextmenu.prevent="launcherGroupsController.openFolderMenu(child.groupName, launcherService.getFolderPage(child.groupName), $event)"
            @dragstart.stop="startChildDrag(child.groupName, $event)" @dragend="endChildDrag"
            @dragover.prevent.stop @drop="onFolderDrop($event, child.groupName)">
            <LauncherTileContent :folder="{ title: child.groupName, preview: child.links, count: child.count }" size="small" />
          </button>
          <a
            v-for="link in displayedLinks"
            :key="link.id"
            class="launcher-link"
            :href="link.url"
            target="_blank"
            rel="noreferrer"
            :title="`${link.title}${link.note ? '\n📝 ' + link.note : ''}\n🔗 ${link.url}`"
            :data-launcher-id="link.id"
            :class="{ 'is-pointer-dragging': dragGhost && String(dragGhost.link.id) === String(link.id) }"
            draggable="false"
            @pointerdown="onDialogLinkPointerDown(link, $event)"
            @dragstart.prevent
            @click="handleLinkClick(link, $event)"
            @contextmenu="handleLinkContextMenu(link, $event)"
          >
            <LauncherFavicon :link="link" />
            <span class="launcher-label">{{ link.title }}</span>
          </a>
        </TransitionGroup>
    </LauncherFolderSurface>
    <Teleport to="body">
      <div v-if="dragGhost" class="launcher-drag-ghost folder-link-ghost"
        :style="{ left: '0', top: '0', width: dragGhost.width + 'px', height: dragGhost.height + 'px', transform: 'translate3d(' + dragGhost.x + 'px,' + dragGhost.y + 'px,0)' }"
        aria-hidden="true">
        <LauncherFavicon :link="dragGhost.link" />
        <span class="launcher-label">{{ dragGhost.link.title }}</span>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.folder-nav-action { flex-shrink: 0; border: 1px solid var(--border); border-radius: 6px; background: var(--surface); color: var(--text); width: 27px; height: 27px; cursor: pointer; }
.folder-nav-action:disabled { opacity: .5; cursor: default; }
.child-folder-tile { font: inherit; color: var(--text); border: 0; background: transparent; cursor: pointer; min-width: 0; width: 100%; padding: 4px; }
.child-folder-tile.drop-target { outline: 2px solid var(--accent, var(--text)); border-radius: 10px; }
.folder-items-grid-move {
  transition: transform 0.22s cubic-bezier(0.2, 0, 0, 1);
}
.folder-items-grid-enter-active,
.folder-items-grid-leave-active {
  transition: none !important;
}
.launcher-folder-dialog-items .launcher-link { touch-action: none; user-select: none; }
.launcher-folder-dialog-items .launcher-link:not(:focus-visible) { outline: none !important; }
.launcher-folder-dialog-items .launcher-link:focus-visible { outline: 2px solid var(--text); outline-offset: 2px; }
.launcher-folder-dialog-items .is-pointer-dragging { opacity: .22; transition: none !important; }
.folder-link-ghost { filter: none; will-change: transform; transition: none; }
.folder-link-ghost .launcher-label { max-width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--text); }
</style>
