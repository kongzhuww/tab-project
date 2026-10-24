<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref, shallowRef } from 'vue';
import BookmarkTiles from './BookmarkTiles.vue';
import LauncherTileContent from '../launchers/LauncherTileContent.vue';
import { useLauncherPointerDrag, type LauncherTileHit } from '../launchers/useLauncherPointerDrag';
import { moveBoardNode, projectBookmarkBoard, readBookmarkBoard, subscribeBookmarkBoard,
  type BookmarkBoardFolder, type BookmarkBoardItem, type BookmarkBoardProjection } from './board-data';
import { cleanBookmarkTitle, cleanBookmarkUrl, saveBookmarkText, saveBookmarkIcon, deleteBookmarkItem, createBookmarkFolder } from './board-actions';
import { removeBookmarkIcon } from './icon-storage';
import { launcherDialogsController } from '../launcher/dialogs-store';
import { notifications } from '../sdk/notifications';
const BookmarkFolderDialog = defineAsyncComponent(() => import('./BookmarkFolderDialog.vue'));
const BookmarkBoardMenu = defineAsyncComponent(() => import('./BookmarkBoardMenu.vue'));
const props = defineProps<{ headerTarget: string }>();
const emit = defineEmits<{ busy: [value: boolean] }>();
const board = shallowRef<BookmarkBoardProjection>({ sources: [], folders: new Map() });
const sourceId = ref(''), sectionId = ref(''), openedFolderId = ref('');
const limit = ref(60), folderLimit = ref(60);
const writeUncertain = ref(false), loading = ref(false), saving = ref(false);
const error = ref(''), message = ref('');
const sizes = shallowRef<Record<string, 'small' | 'large'>>({});
const menu = shallowRef<{ item?: BookmarkBoardItem; parentId: string; x: number; y: number; section?: boolean } | null>(null);
const menuRef = ref<{ canDismiss: boolean } | null>(null);
let generation = 0, mounted = true;
let refreshTimer: ReturnType<typeof setTimeout> | undefined;
let unsubscribe = () => {};
const source = computed(() => board.value.sources.find(item => item.id === sourceId.value));
const sections = computed(() => source.value?.sections || []);
const section = computed(() => sections.value.find(item => item.id === sectionId.value));
const dialogFolder = computed(() => board.value.folders.get(openedFolderId.value));
const status = computed(() => error.value || (loading.value && !board.value.sources.length ? '正在读取书签…' : message.value));
const writeBlocked = computed(() => saving.value || loading.value || writeUncertain.value);
function accepts(item: BookmarkBoardItem, parentId: string): boolean {
  if (!parentId || parentId === '0' || !board.value.folders.has(parentId) || !item.parentId || item.parentId === '0') return false;
  if (item.kind === 'link') return true;
  const seen = new Set<string>();
  for (let folder = board.value.folders.get(parentId); folder; folder = folder.parentId ? board.value.folders.get(folder.parentId) : undefined) {
    if (folder.id === item.id || seen.has(folder.id)) return false;
    seen.add(folder.id);
  }
  return true;
}
const itemLookup = computed(() => {
  const items = new Map<string, BookmarkBoardItem>(board.value.folders);
  for (const folder of board.value.folders.values()) for (const item of folder.items) items.set(item.id, item);
  return items;
});
function findItem(id: string): BookmarkBoardItem | undefined { return itemLookup.value.get(id); }
function hit(x: number, y: number): LauncherTileHit<BookmarkBoardItem> | null {
  const elements = document.elementsFromPoint(x, y);
  if (elements.some(element => element.closest('.bookmark-board-menu'))) return null;
  const tab = elements.map(el => el.closest<HTMLElement>('[data-bookmark-section]')).find(Boolean);
  if (tab) return { parentId: tab.dataset.bookmarkSection!, element: tab, container: true };
  const tile = elements.map(el => el.closest<HTMLElement>('[data-bookmark-node]')).find(Boolean);
  const grid = tile?.closest<HTMLElement>('[data-bookmark-grid]') || elements.map(el => el.closest<HTMLElement>('[data-bookmark-grid], [data-bookmark-drop]')).find(Boolean);
  if (!grid) return null;
  return { parentId: grid.dataset.bookmarkGrid || grid.dataset.bookmarkDrop!, element: tile || grid, item: tile ? findItem(tile.dataset.bookmarkNode!) : undefined };
}
function closeMenu(): boolean {
  if (saving.value || (menu.value && menuRef.value?.canDismiss === false)) return false;
  menu.value = null;
  return true;
}
const drag = useLauncherPointerDrag<BookmarkBoardItem>({
  enabled: () => !writeBlocked.value, parentOf: item => item.parentId || '', items: id => board.value.folders.get(id)?.items || [],
  isFolder: item => item.kind === 'folder', accepts, hit, beforeStart: closeMenu,
  commit: async (item, parentId, beforeId, atEnd) => { try { await moveItem(item, parentId, beforeId, atEnd); } catch { /* status owns failure; never retry */ } }
});
const draggedId = drag.activeId, overFolder = drag.overFolder, ghost = drag.ghost, previews = drag.previews;
const folderFilter = ref('');
const displayedItems = computed(() => section.value ? (previews.value[section.value.id] || section.value.items) : []);
const folderItems = computed(() => {
  if (!dialogFolder.value) return [];
  const base = previews.value[dialogFolder.value.id] || dialogFolder.value.items;
  const kw = folderFilter.value.trim().toLowerCase();
  if (!kw) return base;
  return base.filter(item => {
    return (item.title || '').toLowerCase().includes(kw) ||
      (item.kind === 'link' && (item.url || '').toLowerCase().includes(kw));
  });
});
// Match FavoriteSites: offer only the visible top-level partitions, not every nested folder.
const destinations = computed(() => {
  const item = menu.value?.item;
  if (!item) return [];
  return sections.value.filter(folder => folder.id !== item.parentId && accepts(item, folder.id))
    .map(folder => ({ id: folder.id, title: folder.title, disabled: false }));
});
const outerParentId = computed(() => {
  const parent = menu.value?.item?.parentId ? board.value.folders.get(menu.value.item.parentId) : undefined;
  return parent?.parentId && parent.parentId !== '0' ? parent.parentId : undefined;
});
function selectSection(id: string) {
  if (saving.value || !closeMenu()) return;
  drag.cancel(); sectionId.value = id; openedFolderId.value = ''; folderFilter.value = ''; limit.value = 60;
}
function selectSource() { selectSection(source.value?.sections[0]?.id || sections.value[0]?.id || ''); }
function openFolder(folder: BookmarkBoardFolder) {
  if (saving.value || !closeMenu()) return;
  drag.cancel(); openedFolderId.value = folder.id; folderFilter.value = ''; folderLimit.value = 60;
}
function closeFolder() { if (!saving.value && !menu.value) { drag.cancel(); openedFolderId.value = ''; folderFilter.value = ''; } }
function goUp() {
  folderFilter.value = '';
  const parentId = dialogFolder.value?.parentId;
  const parent = parentId ? board.value.folders.get(parentId) : undefined;
  if (!parent || parent.id === sectionId.value) closeFolder(); else openFolder(parent);
}
function activate(item: BookmarkBoardItem, event: MouseEvent | KeyboardEvent) {
  if (drag.suppressClick() || saving.value) { event.preventDefault(); return; }
  if (item.kind === 'folder') { openFolder(item); return; }
  try { if (['http:', 'https:', 'ftp:', 'file:'].includes(new URL(item.url).protocol)) return; }
  catch { /* Refuse malformed URLs without changing the stored bookmark. */ }
  event.preventDefault(); message.value = '该书签网址无效，请右键编辑。';
}
function openMenu(item: BookmarkBoardItem | undefined, parentId: string, event: MouseEvent, isSection = false) {
  event.preventDefault(); event.stopPropagation();
  if (saving.value || !closeMenu()) return;
  drag.cancel();
  // Browser-owned root containers are not editable sections.
  if (item && (!item.parentId || item.parentId === '0')) return;
  menu.value = { item, parentId, x: event.clientX, y: event.clientY, section: isSection };
}
function blankMenu(parentId: string, event: MouseEvent) {
  if ((event.target as HTMLElement).closest('[data-bookmark-node], button, input, .launcher-folder-title-box')) return;
  // 必须是有效非根目录才允许右键弹出创建菜单，防止向未知/根目录创建
  if (!parentId || parentId === '0' || !board.value.folders.has(parentId)) return;
  openMenu(undefined, parentId, event);
}
function tileMenu(item: BookmarkBoardItem, event: MouseEvent) { openMenu(item, item.parentId || '', event); }
function toggleSize(id: string) {
  const nextSize = sizes.value[id] === 'large' ? 'small' : 'large';
  try {
    if (nextSize === 'large') localStorage.setItem('bookmarkBoardFolderSize:' + id, 'large');
    else localStorage.removeItem('bookmarkBoardFolderSize:' + id);
    sizes.value = { ...sizes.value, [id]: nextSize };
  } catch { message.value = '文件夹大小保存失败。'; }
}
async function refresh() { await refreshBoard(); }
async function refreshBoard(retainPreview = false) {
  if (saving.value) return;
  if (!retainPreview) drag.cancel();
  const version = ++generation; loading.value = true; error.value = '';
  try {
    const tree = await readBookmarkBoard();
    if (mounted && version === generation) {
      board.value = projectBookmarkBoard(tree);
      if (!board.value.sources.some(item => item.id === sourceId.value)) sourceId.value = board.value.sources.find(item => item.id === '1')?.id || board.value.sources[0]?.id || '';
      if (!sections.value.some(item => item.id === sectionId.value)) { sectionId.value = sections.value[0]?.id || ''; openedFolderId.value = ''; }
      if (!board.value.folders.has(openedFolderId.value)) openedFolderId.value = '';
      const next: Record<string, 'small' | 'large'> = {};
      const validFolderIds = new Set(board.value.folders.keys());
      for (const id of validFolderIds) {
        try { if (localStorage.getItem('bookmarkBoardFolderSize:' + id) === 'large') next[id] = 'large'; } catch {}
      }
      sizes.value = next; writeUncertain.value = false;
      // 清理已在外部或被删除文件夹的历史大小残留键，以及无效的自定义头像缓存
      try {
        const validNodeIds = new Set<string>(validFolderIds);
        for (const folder of board.value.folders.values()) {
          for (const item of folder.items) validNodeIds.add(item.id);
        }
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const k = localStorage.key(i);
          if (k?.startsWith('bookmarkBoardFolderSize:')) {
            const folderId = k.slice('bookmarkBoardFolderSize:'.length);
            if (!validFolderIds.has(folderId)) localStorage.removeItem(k);
          } else if (k?.startsWith('bookmarkBoardIcon:')) {
            const linkId = k.slice('bookmarkBoardIcon:'.length);
            if (!validNodeIds.has(linkId)) localStorage.removeItem(k);
          }
        }
      } catch {}
    }
  } catch (err) {
    if (mounted && version === generation) {
      error.value = err instanceof Error ? err.message : '书签读取失败。';
      if (retainPreview) writeUncertain.value = true;
    }
  }
  finally { if (mounted && version === generation) loading.value = false; }
}
function scheduleRefresh() {
  if (saving.value || writeUncertain.value) return;
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => { if (draggedId.value) scheduleRefresh(); else void refresh(); }, 180);
}
async function mutate<T>(action: () => Promise<T>, retainPreview = false): Promise<T> {
  if (writeBlocked.value) throw new Error('正在操作或结果未确认，请刷新核对后再操作。');
  if (!retainPreview) drag.cancel();
  clearTimeout(refreshTimer); ++generation; loading.value = false;
  saving.value = true; emit('busy', true); error.value = ''; message.value = '';
  try {
    const result = await action();
    return result;
  } catch (err) {
    if (mounted) { writeUncertain.value = true; message.value = ''; error.value = err instanceof Error ? err.message : '保存失败，请刷新核对。'; }
    throw err;
  } finally {
    saving.value = false; emit('busy', false);
    if (mounted && !writeUncertain.value) await refreshBoard(retainPreview);
  }
}
function moveItem(item: BookmarkBoardItem, parentId: string, beforeId?: string, atEnd?: boolean): Promise<void> {
  if (!accepts(item, parentId)) return Promise.reject(new Error('不能移入自身、子文件夹或浏览器固定根目录。'));
  return mutate(() => moveBoardNode(item.id, parentId, beforeId, atEnd, item.parentId), true);
}
function saveText(item: BookmarkBoardItem, field: 'title' | 'url', value: string): Promise<string> {
  try { value = field === 'title' ? cleanBookmarkTitle(value) : cleanBookmarkUrl(value); }
  catch (err) { return Promise.reject(err); }
  return mutate(() => saveBookmarkText(item, field, value));
}
function changeIcon(item: BookmarkBoardItem) {
  if (item.kind !== 'link' || writeBlocked.value || !closeMenu()) return;
  const target = { ...item };
  const query = target.title || target.url;
  launcherDialogsController.openIconPicker(target.title || '网站', query, target.url, '', async icon => {
    if (!mounted) throw new Error('书签界面已关闭，请重新打开后选择头像。');
    await mutate(() => saveBookmarkIcon(target, icon));
  });
  void launcherDialogsController.searchIcons(query, target.url).catch(() => {
    notifications.show({ appName: '书签', title: '头像搜索未完成', message: '请在现有选择器内手动搜索或选择图片。' });
  });
}
function deleteFolderRecursiveIcons(folder: BookmarkBoardFolder) {
  for (const child of folder.items) {
    if (child.kind === 'link') removeBookmarkIcon(child.id);
    else deleteFolderRecursiveIcons(child);
  }
}
function createFolder(parentId: string, title: string): Promise<string> {
  try { title = cleanBookmarkTitle(title); } catch (err) { return Promise.reject(err); }
  return mutate(() => createBookmarkFolder(parentId, title));
}
function remove(item: BookmarkBoardItem): Promise<void> {
  return mutate(async () => {
    await deleteBookmarkItem(item);
    if (item.kind === 'folder') deleteFolderRecursiveIcons(item);
  });
}
onMounted(() => { unsubscribe = subscribeBookmarkBoard(scheduleRefresh); void refresh(); });
onUnmounted(() => { mounted = false; ++generation; unsubscribe(); clearTimeout(refreshTimer); drag.cancel(); });
</script>

<template>
  <div class="bookmark-board" @pointerdown.stop @contextmenu.stop @wheel.stop>
    <Teleport :to="props.headerTarget">
      <div class="bookmark-board-head" @pointerdown.stop @contextmenu.stop>
        <nav class="launcher-page-tabs bookmark-section-tabs" aria-label="书签板块" role="tablist">
          <button v-for="item in sections" :key="item.id" :data-bookmark-section="item.id" type="button" role="tab" class="launcher-page-tab"
            :aria-selected="sectionId === item.id" aria-controls="bookmark-section-panel" :disabled="saving" :title="item.title"
            :class="{ active: sectionId === item.id, 'drop-target': overFolder === item.id }"
            @click="selectSection(item.id)" @contextmenu.prevent="openMenu(item, item.parentId || '', $event, true)">{{ item.title }}</button>
        </nav>
        <div class="bookmark-board-tools">
          <select v-if="board.sources.length > 1" v-model="sourceId" :disabled="saving || !!menu" aria-label="书签来源" @change="selectSource">
            <option v-for="item in board.sources" :key="item.id" :value="item.id">{{ item.title }}</option>
          </select>
          <button type="button" :disabled="loading || saving" title="刷新书签" aria-label="刷新书签" @click="refresh">↻</button>
        </div>
      </div>
    </Teleport>
    <span v-if="status" class="bookmark-board-status" role="status">{{ status }}</span>
    <div id="bookmark-section-panel" class="launcher-page-panel bookmark-board-content" role="tabpanel" :data-bookmark-drop="section?.id" :aria-busy="loading || saving"
      @contextmenu="section && blankMenu(section.id, $event)">
      <BookmarkTiles :items="displayedItems.slice(0, limit)" :folder-id="section?.id || ''" :busy="saving" :dragged-id="draggedId" :over-folder="overFolder" :sizes="sizes"
        @pointer-down="drag.start" @activate="activate" @menu="tileMenu" />
      <button v-if="displayedItems.length > limit" class="bookmark-board-more" type="button" @click="limit += 60">显示更多（剩余 {{ displayedItems.length - limit }}）</button>
      <p v-if="!loading && !displayedItems.length" class="bookmark-board-empty">{{ error ? '书签读取失败，请刷新核对' : '暂无书签，右键创建文件夹或拖入网站' }}</p>
    </div>
    <BookmarkFolderDialog v-if="dialogFolder" v-model:filter="folderFilter" :folder="dialogFolder" :busy="saving || !!menu" :status="status" @close="closeFolder" @up="goUp">
      <div class="bookmark-folder-drop-area" :data-bookmark-drop="dialogFolder.id" @contextmenu="blankMenu(dialogFolder.id, $event)">
        <BookmarkTiles :items="folderItems.slice(0, folderLimit)" :folder-id="dialogFolder.id" :busy="saving" :dragged-id="draggedId" :over-folder="overFolder" :sizes="sizes"
          @pointer-down="drag.start" @activate="activate" @menu="tileMenu" />
        <button v-if="folderItems.length > folderLimit" class="bookmark-board-more" type="button" @click="folderLimit += 60">显示更多</button>
        <p v-if="!folderItems.length" class="bookmark-board-empty">暂无书签，可从首页拖入网站</p>
      </div>
    </BookmarkFolderDialog>
    <BookmarkBoardMenu v-if="menu" :key="`${menu.item?.id || menu.parentId}:${menu.x}:${menu.y}`" ref="menuRef" :target="menu"
      :busy="saving" :blocked="loading || writeUncertain" :size="sizes[menu.item?.id || ''] || 'small'" :outer-parent-id="outerParentId"
      :destinations="destinations" :save-text="saveText" :create-folder="createFolder" :remove="remove" :move="moveItem"
      @close="menu = null" @toggle-size="toggleSize" @refresh="refresh" @change-icon="changeIcon" />
    <Teleport to="body">
      <div v-if="ghost" class="launcher-drag-ghost bookmark-drag-ghost" :style="{ left: ghost.x + 'px', top: ghost.y + 'px', width: ghost.width + 'px', height: ghost.height + 'px' }" aria-hidden="true">
        <div v-if="ghost.item.kind === 'folder'" class="launcher-folder" :class="'size-' + (sizes[ghost.item.id] || 'small')"><LauncherTileContent :folder="ghost.item" :size="sizes[ghost.item.id] || 'small'" /></div>
        <div v-else class="launcher-link"><LauncherTileContent :link="ghost.item" /></div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.bookmark-board { display: flex; flex-direction: column; flex: 1; min-height: 0; color: var(--text); }
.bookmark-board-head { display: flex; width: 100%; align-items: center; gap: 5px; min-width: 0; }
.bookmark-section-tabs { min-width: 0; flex: 1; }
.bookmark-board-tools { display: flex; flex: none; align-items: center; gap: 5px; }
.bookmark-board-tools select { max-width: 95px; padding: 4px 6px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); color: var(--muted); font-size: 10px; }
.bookmark-board-tools button, .bookmark-board-more { border: 1px solid var(--border); border-radius: 8px; padding: 5px 9px; background: var(--surface); color: var(--text); cursor: pointer; }
.bookmark-board-status { font-size: 11px; color: var(--muted); }
.bookmark-board-content { display: block; flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; }
.bookmark-folder-drop-area { min-height: 100px; }
.bookmark-board-more { margin-top: 10px; }
.bookmark-board-empty { color: var(--muted); font-size: 12px; }
.bookmark-drag-ghost { filter: none; transition: none; pointer-events: none; }
.bookmark-drag-ghost .launcher-link { width: 100%; height: 100%; }
</style>
