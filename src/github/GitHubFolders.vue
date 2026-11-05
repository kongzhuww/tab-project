<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import { AppWindowFrame } from "../sdk/ui";
import { useContextMenu } from "../sdk/interactions";
import LauncherTileContent from "../launchers/LauncherTileContent.vue";
import { TILE_DRAG_THRESHOLD, TILE_SWAP_COOLDOWN, inFolderDropCore, inTileSwapCore } from "../launchers/tile-drag-geometry";
import { REPOSITORY_DRAG_TYPE, readRepositoryDrag } from "./repository-drag";
import { categoryFeedback } from "./category-storage";
import { githubFolderController as controller, githubFolderState as state } from "./folders";
import { starBoardData } from "./stars-board-data";
import { githubRepoDetailController } from "./repo-detail-store";
import { buildSidebarTiles, repositoryShortcut, reorderSidebarTiles, validateSidebarOrder, type GitHubSidebarTile } from "./sidebar-tiles";
import { gitHubService, type GitHubRawRepo } from "../services/github.service";

declare const chrome: any;
const props = withDefaults(defineProps<{ active?: boolean }>(), { active: true });
const emit = defineEmits<{ select: [] }>();
const root = ref<HTMLElement | null>(null);
const openListId = ref("");
const dropTarget = ref("");
const localOrder = ref<string[]>([]);
const layoutError = ref("");
const contextTarget = ref<{ fullName: string; ownerKey: string; x: number; y: number } | null>(null);
const menuRepo = computed(() => contextTarget.value?.ownerKey === starBoardData.ownerKey
  ? starBoardData.repos.find(repo => repo.full_name === contextTarget.value?.fullName) : undefined);
const menuHasGroups = computed(() => Boolean(menuRepo.value && starBoardData.repoListNames.get(menuRepo.value.full_name.toLowerCase())?.length));
function closeContextMenu() { contextTarget.value = null; }
const { menuRef, style: menuStyle } = useContextMenu({
  visible: () => props.active && Boolean(menuRepo.value),
  anchor: () => contextTarget.value || { x: 0, y: 0 },
  dismiss: closeContextMenu
});
function openContextMenu(event: MouseEvent, repo: GitHubRawRepo) {
  event.preventDefault(); event.stopPropagation();
  if (!props.active) return;
  cancelDrag();
  contextTarget.value = { fullName: repo.full_name, ownerKey: starBoardData.ownerKey, x: event.clientX, y: event.clientY };
}
function moveMenuRepoToUnclassified() {
  const repo = menuRepo.value;
  if (!repo || !menuHasGroups.value || categoryFeedback.busy || !props.active) return;
  closeContextMenu(); applyDrop(repo.full_name, "未分类");
}
function openMenuRepo() {
  const repo = menuRepo.value;
  closeContextMenu();
  if (repo) openRepo(repo);
}
let layoutRevision = 0, storageGeneration = 0;
let writes = Promise.resolve();
const tiles = computed(() => buildSidebarTiles(starBoardData.repos, starBoardData.lists, starBoardData.repoListNames, localOrder.value, starBoardData.activeSection));
const openFolder = computed(() => tiles.value.find(tile => tile.kind === "folder" && tile.list.id === openListId.value));
const openRepos = computed(() => openFolder.value?.kind === "folder" ? openFolder.value.repos : []);
function folderPreview(tile: GitHubSidebarTile) {
  return tile.kind === "folder" ? { title: tile.title, preview: tile.repos.slice(0, 4).map(repositoryShortcut), count: Math.max(tile.repos.length, tile.list.totalCount) } : undefined;
}
const storageKey = () => starBoardData.ownerKey ? `ghSidebarTileOrderV1:${starBoardData.ownerKey}:${starBoardData.activeSection || 'default'}` : "";
function saveOrder() {
  ++layoutRevision;
  const key = storageKey(), order = [...localOrder.value];
  if (!key) return;
  writes = writes.catch(() => {}).then(async () => {
    try {
      if (typeof chrome !== "undefined" && chrome.storage?.local) await chrome.storage.local.set({ [key]: order });
      else localStorage.setItem(key, JSON.stringify(order));
      if (key === storageKey()) layoutError.value = "";
    } catch { if (key === storageKey()) layoutError.value = "顺序暂未保存，本页仍可使用。"; }
  });
}
function openRepo(repo: GitHubRawRepo) {
  if (!props.active || Date.now() < suppressClickUntil) return;
  closeContextMenu(); openListId.value = ""; emit("select");
  githubRepoDetailController.open(repo.full_name, undefined, repo);
}
function openTile(tile: GitHubSidebarTile) {
  if (!props.active || Date.now() < suppressClickUntil) return;
  if (tile.kind === "repo") { openRepo(tile.repo); return; }
  closeContextMenu();
  openListId.value = openListId.value === tile.list.id ? "" : tile.list.id;
  controller.select(tile.title); emit("select");
}
function canDrop(title: string) {
  return props.active && !categoryFeedback.busy && state.folders.some(folder => folder.title === title && (folder.kind === "custom" || folder.kind === "uncategorized"));
}
function applyDrop(fullName: string, title: string) {
  if (canDrop(title) && starBoardData.repos.some(repo => repo.full_name.toLowerCase() === fullName.toLowerCase())) controller.dropRepository(fullName, title);
}
function nativeDragOver(event: DragEvent, title: string) {
  if (!canDrop(title) || !Array.from(event.dataTransfer?.types || []).includes(REPOSITORY_DRAG_TYPE)) return;
  event.preventDefault(); event.stopPropagation();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  dropTarget.value = title;
}
function nativeDrop(event: DragEvent, title: string) {
  dropTarget.value = "";
  const name = readRepositoryDrag(event.dataTransfer);
  if (!name || !canDrop(title)) return;
  event.preventDefault(); event.stopPropagation(); applyDrop(name, title);
}
function nativeLeave(event: DragEvent) {
  const current = event.currentTarget;
  if (current instanceof Node && event.relatedTarget instanceof Node && current.contains(event.relatedTarget)) return;
  dropTarget.value = "";
}

// Same pointer threshold, center/edge classification and animated swaps as Favorite Sites.
const ghost = reactive({ visible: false, x: 0, y: 0, offsetX: 0, offsetY: 0, tile: null as GitHubSidebarTile | null });
let drag: { pointer: number; x: number; y: number; owner: string; tile: GitHubSidebarTile; original: string[] } | null = null;
let suppressClickUntil = 0, lastSwap = 0, lastTarget = "";
let autoScroll: ReturnType<typeof setInterval> | undefined;
let pointerDropElement: HTMLElement | null = null;
function clearPointerDrop() {
  pointerDropElement?.classList.remove("gh-sidebar-pointer-drop"); pointerDropElement = null;
}
function pointerDown(event: PointerEvent, tile: GitHubSidebarTile) {
  if (event.button !== 0 || !props.active || categoryFeedback.busy) return;
  cancelDrag(); closeContextMenu();
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  drag = { pointer: event.pointerId, x: event.clientX, y: event.clientY, owner: starBoardData.ownerKey, tile, original: [...localOrder.value] };
  ghost.x = event.clientX; ghost.y = event.clientY;
  ghost.offsetX = event.clientX - rect.left; ghost.offsetY = event.clientY - rect.top; ghost.tile = tile;
  window.addEventListener("pointermove", pointerMove, { passive: false });
  window.addEventListener("pointerup", pointerUp);
  window.addEventListener("pointercancel", cancelDrag);
}
function pointerRepo(event: PointerEvent, repo: GitHubRawRepo) {
  pointerDown(event, { key: `repo:${repo.full_name.toLowerCase()}`, kind: "repo", title: repo.name, repo });
}
function updateTarget() {
  clearPointerDrop();
  dropTarget.value = "";
  if (!drag || !ghost.visible) return;
  const target = document.elementFromPoint(ghost.x, ghost.y) as HTMLElement | null;
  const drop = target?.closest<HTMLElement>("[data-gh-list-drop]");
  const title = drop?.dataset.ghListDrop;
  // In the center of a folder, add membership; at tile edges, reorder locally.
  if (drag.tile.kind === "repo" && title && canDrop(title) && drop &&
      (!drop.hasAttribute("data-gh-tile") || inFolderDropCore(drop.getBoundingClientRect(), ghost.x, ghost.y))) {
    dropTarget.value = title;
    pointerDropElement = drop; drop.classList.add("gh-sidebar-pointer-drop");
    return;
  }
  const tile = target?.closest<HTMLElement>("[data-gh-tile]");
  const key = tile?.dataset.ghTile;
  if (!key || !tile || key === drag.tile.key || !inTileSwapCore(tile.getBoundingClientRect(), ghost.x, ghost.y)) return;
  if (key === lastTarget || Date.now() - lastSwap < TILE_SWAP_COOLDOWN) return;
  const keys = tiles.value.map(item => item.key);
  if (!keys.includes(drag.tile.key)) return;
  localOrder.value = reorderSidebarTiles(keys, drag.tile.key, key);
  lastTarget = key; lastSwap = Date.now();
}
function pointerMove(event: PointerEvent) {
  if (!drag || event.pointerId !== drag.pointer) return;
  ghost.x = event.clientX; ghost.y = event.clientY;
  if (!ghost.visible && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < TILE_DRAG_THRESHOLD) return;
  event.preventDefault();
  if (!ghost.visible) {
    ++layoutRevision; // Do not let late storage hydration replace an active reorder preview.
    ghost.visible = true;
    autoScroll = setInterval(() => {
      const target = document.elementFromPoint(ghost.x, ghost.y) as HTMLElement | null;
      const scroller = target?.closest<HTMLElement>(".gh-bili-folder-list, .gh-shortcut-window-content");
      if (scroller) {
        const rect = scroller.getBoundingClientRect();
        if (ghost.y < rect.top + 36) scroller.scrollTop -= 12;
        else if (ghost.y > rect.bottom - 36) scroller.scrollTop += 12;
      }
      updateTarget();
    }, 32);
  }
  updateTarget();
}
function pointerUp(event: PointerEvent) {
  if (!drag || event.pointerId !== drag.pointer) return;
  if (ghost.visible) { ghost.x = event.clientX; ghost.y = event.clientY; updateTarget(); }
  const source = drag, moved = ghost.visible, title = dropTarget.value;
  if (moved) {
    event.preventDefault(); suppressClickUntil = Date.now() + 300;
    if (source.owner === starBoardData.ownerKey && title && source.tile.kind === "repo") applyDrop(source.tile.repo.full_name, title);
    const reordered = source.original.length !== localOrder.value.length || source.original.some((key, index) => localOrder.value[index] !== key);
    if (source.owner === starBoardData.ownerKey && !title && reordered) saveOrder();
  }
  // Folder drops must not accidentally persist a hover-only reorder preview.
  if (title) localOrder.value = source.original;
  cleanupDrag();
}
function cleanupDrag() {
  clearPointerDrop();
  clearInterval(autoScroll); autoScroll = undefined;
  window.removeEventListener("pointermove", pointerMove);
  window.removeEventListener("pointerup", pointerUp);
  window.removeEventListener("pointercancel", cancelDrag);
  ghost.visible = false; ghost.tile = null; drag = null; dropTarget.value = ""; lastTarget = ""; lastSwap = 0;
}
function cancelDrag() {
  if (drag) {
    localOrder.value = drag.original;
    if (ghost.visible) suppressClickUntil = Date.now() + 300;
  }
  cleanupDrag();
}
function keyboardReorder(event: KeyboardEvent, tile: GitHubSidebarTile) {
  if (!event.altKey || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
  event.preventDefault();
  const keys = tiles.value.map(item => item.key), index = keys.indexOf(tile.key);
  const step = event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : event.key === "ArrowUp" ? -2 : 2;
  const target = keys[index + step]; if (!target) return;
  localOrder.value = reorderSidebarTiles(keys, tile.key, target); saveOrder();
}
function outside(event: PointerEvent) {
  const target = event.target as HTMLElement | null;
  if (!drag && !root.value?.contains(target) && !target?.closest("#gh-list-shortcut-window, .gh-shortcut-context-menu")) openListId.value = "";
}
function keydown(event: KeyboardEvent) { if (event.key === "Escape") { cancelDrag(); closeContextMenu(); openListId.value = ""; } }
function visibility() { if (document.hidden) { cancelDrag(); closeContextMenu(); openListId.value = ""; } }
function clearNativeDrop() { dropTarget.value = ""; }
watch(() => [starBoardData.ownerKey, starBoardData.activeSection] as const, async () => {
  const generation = ++storageGeneration;
  cancelDrag(); closeContextMenu(); openListId.value = ""; localOrder.value = []; layoutError.value = "";
  const key = storageKey(), revision = ++layoutRevision;
  if (!key) return;
  try {
    const order = typeof chrome !== "undefined" && chrome.storage?.local
      ? (await chrome.storage.local.get(key))[key] : JSON.parse(localStorage.getItem(key) || "[]");
    if (generation === storageGeneration && revision === layoutRevision) localOrder.value = validateSidebarOrder(order);
  } catch { if (generation === storageGeneration) layoutError.value = "图标顺序读取失败，可继续操作。"; }
}, { immediate: true });
// Fill the shortcut shelf once per account in this view. Failures do not auto-loop.
const attemptedCompletion = new Set<string>();
watch(() => [props.active, starBoardData.ownerKey, starBoardData.loading] as const, ([active, owner, loading]) => {
  if (!active || !owner || loading || attemptedCompletion.has(owner)) return;
  attemptedCompletion.add(owner);
  void gitHubService.ensureAllStarsLoaded();
}, { immediate: true });
watch(() => props.active, active => { if (!active) { cancelDrag(); closeContextMenu(); openListId.value = ""; } });
watch(() => openFolder.value, folder => { if (!folder) openListId.value = ""; });
watch(menuRepo, repo => { if (!repo) closeContextMenu(); });
onMounted(() => {
  window.addEventListener("pointerdown", outside); window.addEventListener("keydown", keydown);
  window.addEventListener("blur", cancelDrag); window.addEventListener("dragend", clearNativeDrop); window.addEventListener("drop", clearNativeDrop);
  document.addEventListener("visibilitychange", visibility);
});
onBeforeUnmount(() => {
  ++storageGeneration; cancelDrag();
  window.removeEventListener("pointerdown", outside); window.removeEventListener("keydown", keydown);
  window.removeEventListener("blur", cancelDrag); window.removeEventListener("dragend", clearNativeDrop); window.removeEventListener("drop", clearNativeDrop);
  document.removeEventListener("visibilitychange", visibility);
});
</script>

<template>
  <div ref="root" class="gh-shortcut-sidebar">
    <p v-if="categoryFeedback.message || layoutError" class="gh-shortcut-status" role="status">{{ categoryFeedback.message || layoutError }}</p>
    <TransitionGroup name="gh-shortcut" tag="div" class="gh-shortcut-grid">
      <div v-for="tile in tiles" :key="tile.key" class="gh-shortcut-cell" :data-gh-tile="tile.key"
        :data-gh-list-drop="tile.kind === 'folder' ? tile.title : undefined"
        :class="{ 'is-dragging': ghost.visible && ghost.tile?.key === tile.key, 'drop-into': tile.kind === 'folder' && dropTarget === tile.title }"
        @dragover="tile.kind === 'folder' && nativeDragOver($event, tile.title)" @dragleave="nativeLeave" @drop="tile.kind === 'folder' && nativeDrop($event, tile.title)">
        <button type="button" class="gh-shortcut-tile" :aria-label="tile.kind === 'folder' ? `打开本地分组 ${tile.title}` : `查看仓库 ${tile.repo.full_name}`"
          :title="tile.kind === 'folder' ? `${tile.title}（拖入将加入本地分组，保留其他归属）` : tile.repo.full_name"
          @contextmenu="tile.kind === 'repo' && openContextMenu($event, tile.repo)"
          @click="openTile(tile)" @pointerdown="pointerDown($event, tile)" @dragstart.prevent @keydown="keyboardReorder($event, tile)">
          <LauncherTileContent :link="tile.kind === 'repo' ? repositoryShortcut(tile.repo) : undefined" :folder="folderPreview(tile)" />
        </button>
      </div>
    </TransitionGroup>
    <p v-if="!tiles.length" class="gh-shortcut-help">{{ starBoardData.loading ? '正在读取仓库与列表…' : '暂无本地分组或未分类仓库' }}</p>
    <Teleport to="body">
      <AppWindowFrame v-if="openFolder && active" id="gh-list-shortcut-window" window-id="gh-list-shortcut" :title="openFolder.title" icon="📁"
        :default-width="420" :default-height="420" :min-width="300" :min-height="260" :show-minimize="false" :show-maximize="false"
        custom-class="gh-shortcut-folder-window" :custom-style="{ background: 'var(--panel)' }" @close="openListId = ''; closeContextMenu()">
        <template #header-actions>
          <button type="button" class="gh-folder-delete-action" :disabled="categoryFeedback.busy" title="删除本地分组（不会取消 Star）" @click="controller.delete(openFolder.title)">删除分组</button>
        </template>
        <div class="gh-shortcut-window-content" :class="{ 'drop-into': dropTarget === openFolder.title }" :data-gh-list-drop="openFolder.title"
          @dragover="nativeDragOver($event, openFolder.title)" @dragleave="nativeLeave" @drop="nativeDrop($event, openFolder.title)">
          <p class="gh-shortcut-help">{{ openRepos.length }} 个已加载仓库 · 可拖到其他文件夹以加入本地分组</p>
          <div class="gh-folder-repo-grid">
            <div v-for="repo in openRepos" :key="repo.full_name" class="gh-folder-repo-cell">
              <button type="button" class="gh-shortcut-tile" :title="repo.full_name" @contextmenu="openContextMenu($event, repo)" @click="openRepo(repo)" @pointerdown="pointerRepo($event, repo)" @dragstart.prevent>
                <LauncherTileContent :link="repositoryShortcut(repo)" />
              </button>
            </div>
          </div>
          <p v-if="!openRepos.length" class="gh-shortcut-help">{{ starBoardData.loading ? '正在读取…' : '空文件夹，可拖入仓库' }}</p>
        </div>
      </AppWindowFrame>
      <div v-if="menuRepo && active" ref="menuRef" class="gh-shortcut-context-menu" :style="menuStyle" role="menu" :aria-label="menuRepo.full_name + ' 操作'" @pointerdown.stop @click.stop @contextmenu.prevent>
        <div class="gh-shortcut-menu-title">{{ menuRepo.full_name }}</div>
        <button type="button" role="menuitem" @click="openMenuRepo">查看仓库详情</button>
        <button type="button" role="menuitem" :disabled="categoryFeedback.busy || !menuHasGroups" title="从所有本地分组移出，保留 GitHub 收藏" @click="moveMenuRepoToUnclassified">移到未分组</button>
      </div>
      <div v-if="ghost.visible && ghost.tile" class="gh-shortcut-ghost gh-shortcut-tile" :style="{ left: `${ghost.x - ghost.offsetX}px`, top: `${ghost.y - ghost.offsetY}px` }">
        <LauncherTileContent :link="ghost.tile.kind === 'repo' ? repositoryShortcut(ghost.tile.repo) : undefined" :folder="folderPreview(ghost.tile)" />
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.gh-shortcut-sidebar { min-width: 0; width: 100%; }




.gh-shortcut-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 6px; padding: 8px 2px 16px; align-content: start; }
.gh-shortcut-cell { position: relative; min-width: 0; border-radius: 12px; }
.gh-shortcut-tile { display: flex; position: relative; flex-direction: column; align-items: center; justify-content: start; gap: 6px; width: 100%; min-width: 0; padding: 6px 2px; color: var(--text); border: 0; border-radius: 12px; background: transparent; cursor: pointer; user-select: none; touch-action: none; }
.gh-shortcut-tile:hover { background: var(--surface); }
.gh-shortcut-tile:focus-visible { outline: 2px solid var(--accent, #0284c7); outline-offset: 1px; }
.gh-shortcut-tile :deep(.launcher-title) { display: block; width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: center; font-size: 11px; line-height: 16px; font-weight: 600; }
.gh-shortcut-tile :deep(.launcher-favicon) { background: var(--panel) !important; border: 1px solid var(--border); box-shadow: 0 2px 5px var(--border); box-sizing: border-box; }
.gh-shortcut-tile :deep(.launcher-folder-preview) { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); width: 48px; height: 48px; padding: 5px; gap: 3px; border: 1px solid var(--border); border-radius: 13px; background: var(--panel) !important; box-sizing: border-box; box-shadow: 0 2px 5px var(--border); }
.gh-shortcut-tile :deep(.launcher-folder-mini) { background: var(--panel) !important; border-radius: 3px; min-width: 0; min-height: 0; }
.gh-shortcut-tile :deep(.launcher-folder-more) { font-size: 8px; border-radius: 3px; display: grid; place-items: center; }
.gh-shortcut-help { margin: 8px 4px; color: var(--muted); font-size: 10px; line-height: 1.6; }
.gh-shortcut-status { margin: 4px; font-size: 11px; color: var(--danger, #ef4444); }
:global([data-gh-list-drop].gh-sidebar-pointer-drop) { outline: 2px solid var(--accent, #0284c7); outline-offset: -2px; }
.drop-into { outline: 2px solid var(--accent, #0284c7); outline-offset: -2px; background: var(--surface); }
.gh-shortcut-cell.is-dragging { opacity: 0.25; }
:global(.gh-shortcut-folder-window.lw-window-frame) { opacity: 1 !important; background: var(--panel) !important; }
.gh-shortcut-move { transition: transform 180ms ease; }
.gh-shortcut-enter-active, .gh-shortcut-leave-active { transition: opacity 150ms ease; }
.gh-shortcut-enter-from, .gh-shortcut-leave-to { opacity: 0; }
.gh-shortcut-ghost { position: fixed; z-index: 2147483646; width: 80px; pointer-events: none; background: var(--panel); border: 1px solid var(--border); box-shadow: 0 6px 18px var(--border); transform: scale(1.05); }
.gh-shortcut-window-content { height: 100%; overflow-y: auto; padding: 8px 12px 16px; box-sizing: border-box; background: var(--panel); }
.gh-folder-repo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(82px, 1fr)); gap: 14px 8px; }
.gh-folder-repo-cell { min-width: 0; text-align: center; }
.gh-shortcut-context-menu { z-index: 2147483646; min-width: 180px; padding: 5px; border: 1px solid var(--border); border-radius: 9px; background: var(--panel); opacity: 1; color: var(--text); box-shadow: 0 8px 24px var(--border); }
.gh-shortcut-menu-title { max-width: 240px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 6px 8px; color: var(--muted); font-size: 11px; }
.gh-shortcut-context-menu button { display: block; width: 100%; padding: 8px; border: 0; border-radius: 5px; background: transparent; color: var(--text); font-size: 12px; text-align: left; cursor: pointer; }
.gh-shortcut-context-menu button:hover:not(:disabled), .gh-shortcut-context-menu button:focus-visible { background: var(--surface); }
.gh-shortcut-context-menu button:disabled { opacity: 0.45; cursor: default; }
.gh-folder-delete-action { border: 1px solid var(--border); border-radius: 5px; background: var(--panel); color: var(--muted); font-size: 10px; padding: 3px 5px; cursor: pointer; }
.gh-folder-delete-action:hover { color: var(--danger, #ef4444); }
@media (prefers-reduced-motion: reduce) { .gh-shortcut-move, .gh-shortcut-enter-active, .gh-shortcut-leave-active { transition: none; } }
</style>
