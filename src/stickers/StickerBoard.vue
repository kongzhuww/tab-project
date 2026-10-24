<template>
  <div class="vue-sticker-board-wrapper">
    <section class="card wide utility-workspace-stickers" id="card-stickers" v-show="active()">
      <p v-if="notice && noticeBad" role="alert" class="bad">{{ notice }}</p>

      <!-- 表情包主布局 (紧凑左导航 + 右侧主画廊) -->
      <div class="sticker-layout" :class="{ 'is-narrow-layout': isNarrow }">
        <!-- 左侧文件夹目录侧边栏 (在窄屏下支持平滑抽屉展开/折叠) -->
        <aside
          v-show="!isNarrow || isFolderDrawerOpen"
          class="sticker-sidebar"
          :class="{ 'is-drawer': isNarrow }"
          aria-label="图片分类导航"
          @wheel.passive="onSidebarWheel"
        >
          <div class="sticker-sidebar-top">
            <div class="sticker-sidebar-heading">
              <span class="sidebar-heading-title">🏷️ 分类</span>
            </div>
            <form id="sticker-pack-form" class="sticker-pack-form" @submit.prevent="onCreateFolder">
              <input
                id="sticker-pack-name"
                v-model="newFolderName"
                maxlength="40"
                placeholder="＋ 新建分类"
                autocomplete="off"
                required
              />
              <button type="submit" title="创建新分类">新建</button>
            </form>
          </div>

          <!-- Navigation stays outside the scrolling folder list. -->
          <button
            v-if="state.hasFolder"
            type="button"
            class="sidebar-folder-card subfolder-card sidebar-navigation-card"
            :class="{ active: state.parentPath === null && state.activePath === '' }"
            :disabled="busy || state.loading"
            @click="onNavigateToPath(state.parentPath ?? '')"
          >
            <span class="subfolder-card-icon" aria-hidden="true">{{ state.parentPath !== null ? '⬅' : '🗂️' }}</span>
            <span class="subfolder-card-info">
              <strong class="subfolder-card-name">{{ state.parentPath !== null ? '返回上一级' : '全部表情' }}</strong>
              <span class="subfolder-card-count">{{ state.parentPath !== null ? `当前：${state.displayTitle}` : `${totalStickersCount} 张图片` }}</span>
            </span>
            <span class="subfolder-card-arrow" aria-hidden="true">{{ state.parentPath !== null ? '‹' : '›' }}</span>
          </button>

          <nav ref="folderList" id="sticker-packs" class="sticker-packs" aria-label="表情包分类列表">
            <div v-if="!state.hasFolder && (!state.subFolders || state.subFolders.length === 0)" class="sticker-empty">
              {{ state.loading ? '正在读取图片库…' : '图片库尚未就绪，请重新加载页面或重载本模块' }}
            </div>
            <template v-else>
              <StickerFolderCards
                :folders="sidebarFolders"
                :active-path="state.activePath"
                :parent-path="state.storageKind === 'indexeddb' ? '' : state.activePath"
                :active="active()"
                :busy="busy || state.loading"
                :directory-backed="state.storageKind === 'directory'"
                :can-reorder="state.subFolders.length > 1"
                :rename-folder="renameFolder"
                :delete-folder="deleteFolder"
                :reorder-folders="reorderFolders"
                @select="onNavigateToPath"
              />
            </template>
          </nav>
        </aside>

        <!-- 右侧表情包主工作区 (极简模式：直接呈现图片网格与底部分页) -->
        <div
          class="sticker-main-pane"
          @dragover.prevent
          @drop.prevent="onDrop"
        >
          <!-- 隐式本地图片选择器 -->
          <input
            id="sticker-file-input"
            ref="fileInput"
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp,image/bmp"
            multiple
            hidden
            @change="onFilesChanged"
          />

          <!-- 表情包网格展示库 -->
          <section class="sticker-library">
            <header class="sticker-library-header">
              <div class="library-title-group">
                <strong id="sticker-library-title">{{ state.displayTitle }}</strong>
                <span id="sticker-library-count">{{ state.totalCountText }}</span>
              </div>
              <button type="button" class="tool-btn" @click="openLibrarySettings">图库设置</button>
              <button
                type="button"
                class="tool-btn sticker-quick-import-btn"
                title="导入图片到当前分类"
                @click="onPickFiles"
              >
                ＋ 导入图片
              </button>
            </header>

            <div id="sticker-items" class="sticker-grid">
              <div v-if="state.loading" class="sticker-empty">
                正在加载表情包…
              </div>
              <div v-else-if="state.emptyText" class="sticker-empty">
                {{ state.emptyText }}
              </div>
              <div v-else-if="state.items.length === 0" class="sticker-empty">
                当前分类暂无表情包 · 可直接从电脑或网页拖入图片保存
              </div>
              <template v-else>
                <article
                  v-for="item in state.items"
                  :key="item.id"
                  class="sticker-item"
                  :class="{ 'just-copied': copiedId === item.id }"
                  tabindex="0"
                  title="单击复制原图；右键查看、归类或删除图片"
                  @click="onCopyItem(item)"
                  @contextmenu="openItemContextMenu(item, $event)"
                >
                  <img
                    v-if="item.url"
                    :src="item.url"
                    :alt="item.file"
                    loading="lazy"
                  />
                  <span v-if="item.folderName" class="sticker-badge-tag">
                    {{ item.folderName }}
                  </span>

                  <!-- 复制成功徽标反馈 -->
                  <span v-if="copiedId === item.id" class="sticker-copied-pill">
                    ✓ 已复制
                  </span>

                  <footer>
                    <span>{{ item.sizeText }}</span>
                    <button
                      type="button"
                      title="图片操作"
                      @click.stop="openItemContextMenu(item, $event)"
                    >
                      ···
                    </button>
                  </footer>
                </article>
              </template>
            </div>
            <!-- 表情包底部分页器 -->
            <nav v-if="state.totalPages > 1" class="sticker-pagination" aria-label="表情包翻页导航">
              <div class="sticker-page-left">
                <span class="sticker-page-summary">共 <strong>{{ state.totalCount }}</strong> 张</span>
                <span class="sticker-page-badge">每页 {{ state.pageSize }} 张</span>
              </div>

              <div class="sticker-page-controls">
                <button
                  type="button"
                  class="sticker-nav-btn"
                  :disabled="busy || state.currentPage <= 1"
                  title="上一页"
                  @click="onPrevPage"
                >
                  ‹ 上一页
                </button>

                <div class="sticker-page-numbers">
                  <template v-for="(p, idx) in visiblePages" :key="idx">
                    <span v-if="p === -1" class="sticker-page-ellipsis">…</span>
                    <button
                      v-else
                      type="button"
                      class="sticker-num-btn"
                      :class="{ active: p === state.currentPage }"
                      :disabled="busy"
                      @click="onGoPage(p)"
                    >
                      {{ p }}
                    </button>
                  </template>
                </div>

                <button
                  type="button"
                  class="sticker-nav-btn"
                  :disabled="busy || state.currentPage >= state.totalPages"
                  title="下一页"
                  @click="onNextPage"
                >
                  下一页 ›
                </button>
              </div>

              <div class="sticker-page-right">
                <span class="sticker-page-progress">{{ state.currentPage }} / {{ state.totalPages }}</span>
              </div>
            </nav>
          </section>
        </div>
      </div>
    </section>

    <!-- 右键卡片菜单 (Teleport 到 body，定位精准不被裁剪) -->
    <Teleport to="body">
      <div
        v-if="contextMenu.visible"
        class="sticker-context-menu"
        :style="{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }"
        @click.stop
      >
        <button type="button" class="sticker-menu-item" @click="handleMenuCopy">
          <span class="menu-icon">📋</span> 复制图片
        </button>
        <button type="button" class="sticker-menu-item" @click="handleMenuView">
          <span class="menu-icon">🔍</span> 查看大图
        </button>
        <div v-if="state.storageKind === 'directory'" class="sticker-menu-classify">
          <select v-model="classificationTarget" aria-label="选择图片分类" :disabled="busy">
            <option value="__choose__" disabled>归类到…</option>
            <option v-for="folder in state.folders" :key="folder.path" :value="folder.path">{{ folder.path ? `${'－'.repeat(folder.depth)}${folder.name}` : '未分类（全部中保留）' }}</option>
          </select>
          <button type="button" class="sticker-menu-item" :disabled="busy || classificationTarget === '__choose__'" @click="handleMenuClassify">保存分类（不移动原图）</button>
        </div>
        <div class="sticker-menu-divider"></div>
        <button
          type="button"
          class="sticker-menu-item danger"
          :class="{ 'is-confirming': contextMenu.isConfirmingDelete }"
          @click="handleMenuDelete($event)"
        >
          <span class="menu-icon">🗑️</span> {{ state.storageKind === "directory" ? "删除磁盘原图…" : (contextMenu.isConfirmingDelete ? "确定删除内置副本？" : "删除内置图片") }}
        </button>
      </div>
    </Teleport>

    <!-- 可拖动的本地非模态浮窗，不打开网页标签或遮挡整页 -->
    <Teleport to="body">
      <div
        v-if="previewModal.visible && previewModal.item"
        class="sticker-lightbox-window"
        :style="{ left: `${previewPosition.x}px`, top: `${previewPosition.y}px` }"
      >
        <div class="sticker-lightbox-dialog" @click.stop>
          <header class="sticker-lightbox-head" @mousedown="startPreviewDrag">
            <div class="sticker-lightbox-info">
              <strong>{{ previewModal.item.file }}</strong>
              <small>{{ previewModal.item.sizeText }} · 本地浮窗预览（拖动标题栏移动，Esc 关闭）</small>
            </div>
            <div class="sticker-lightbox-actions">
              <button
                type="button"
                class="lightbox-action-btn copy"
                title="复制到剪贴板，支持直接在微信/QQ粘贴"
                @click="onCopyItem(previewModal.item)"
              >
                📋 复制图片
              </button>
              <button
                type="button"
                class="lightbox-close-btn"
                title="关闭大图预览 (Esc)"
                @click="closePreviewModal"
              >
                ✕
              </button>
            </div>
          </header>
          <div class="sticker-lightbox-body">
            <img
              :src="previewModal.item.url"
              :alt="previewModal.item.file"
              class="sticker-lightbox-img"
            />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed, watch, reactive, ref } from "vue";
import { stickersService as sharedService, StickersService, MAX_IMAGE_BYTES } from "../services/stickers.service";
import { stickerBoardController as sharedController, createStickerBoardController, type StickerFolderNode, type StickerCardItem, type StickerSubnavPill, type StickerBoardAction } from "./sticker-board-store";
import { stickersModuleState, withStickersWrite, onStickersPause } from "./module-state";
import { windowManagerController } from "../core/window-manager.store";
import StickerFolderCards from "./StickerFolderCards.vue";
import { settingsController } from "../settings/store";
function openLibrarySettings() { settingsController.open("storage", "stickers"); windowManagerController.activate("settings"); }
const classificationTarget = ref("__choose__");
async function handleMenuClassify() {
  const item = contextMenu.item, path = classificationTarget.value;
  if (!item || path === "__choose__" || busy.value) return;
  closeContextMenu(); closePreviewModal();
  await dispatch("assign-item", { item, path });
}
const props = withDefaults(defineProps<{ dockOwned?: boolean; active?: boolean }>(), { dockOwned: false, active: true });
const pageVisible = ref(!document.hidden);
let disposed = false, epoch = 0;
function active() { return !disposed && props.active && pageVisible.value; }
function mutation<T>(operation: () => Promise<T>): Promise<T> { return withStickersWrite(operation); }
const controller = props.dockOwned ? createStickerBoardController() : sharedController;
const service = props.dockOwned ? new StickersService(controller, active, mutation, 120) : sharedService;
const state = controller.state;
const folderSaving = ref(false);
const busy = computed(() => folderSaving.value || stickersModuleState.pendingWrites > 0);
const sidebarFolders = computed(() => state.subFolders.length ? state.subFolders : state.activePath
  ? [{ name: state.displayTitle, path: state.activePath, count: state.totalCount }] : []);
async function folderAction(action: "rename-folder" | "delete-folder" | "reorder-folders", payload: unknown) {
  if (!active() || busy.value || state.loading) throw new Error("目录正在读取或保存，请稍后再操作。");
  closeContextMenu(); closePreviewModal();
  folderSaving.value = true;
  try { await controller.dispatch(action, payload); }
  finally { folderSaving.value = false; }
}
function renameFolder(path: string, name: string) { return folderAction("rename-folder", { path, name }); }
function deleteFolder(path: string) { return folderAction("delete-folder", { path }); }
function reorderFolders(parentPath: string, paths: string[]) { return folderAction("reorder-folders", { parentPath, paths }); }
const standalone = !!document.getElementById("vue-sticker-standalone-root");
const isNarrow = ref(false), isFolderDrawerOpen = ref(false), newFolderName = ref("");
const folderList = ref<HTMLElement | null>(null);
watch(() => state.activePath, () => {
  // A newly opened level must not inherit the previous list's scroll offset.
  if (folderList.value) folderList.value.scrollTop = 0;
}, { flush: "post" });
const copiedId = ref<string | null>(null), copying = ref(false);
const notice = ref(""), noticeBad = ref(false);
let copyTimer: ReturnType<typeof setTimeout> | undefined, noticeTimer: ReturnType<typeof setTimeout> | undefined;
let detachActions: (() => void) | undefined;
let sendRequest: AbortController | undefined, reader: FileReader | undefined;
const contextMenu = reactive({ visible: false, x: 0, y: 0, item: null as StickerCardItem | null, isConfirmingDelete: false });
const previewModal = reactive({ visible: false, item: null as StickerCardItem | null });
const previewPosition = reactive({ x: 24, y: 80 });
let previewDrag: { mouseX: number; mouseY: number; x: number; y: number } | undefined;
function stopPreviewDrag() {
  previewDrag = undefined;
  window.removeEventListener("mousemove", movePreview); window.removeEventListener("mouseup", stopPreviewDrag);
  window.removeEventListener("blur", stopPreviewDrag);
}
function movePreview(event: MouseEvent) {
  if (!active() || !previewDrag || event.buttons === 0) { stopPreviewDrag(); return; }
  previewPosition.x = Math.max(8, Math.min(window.innerWidth - 100, previewDrag.x + event.clientX - previewDrag.mouseX));
  previewPosition.y = Math.max(8, Math.min(window.innerHeight - 40, previewDrag.y + event.clientY - previewDrag.mouseY));
}
function startPreviewDrag(event: MouseEvent) {
  if (!active() || event.button !== 0 || (event.target as Element).closest("button")) return;
  event.preventDefault(); stopPreviewDrag();
  previewDrag = { mouseX: event.clientX, mouseY: event.clientY, x: previewPosition.x, y: previewPosition.y };
  window.addEventListener("mousemove", movePreview); window.addEventListener("mouseup", stopPreviewDrag);
  window.addEventListener("blur", stopPreviewDrag);
}
function checkNarrow() { isNarrow.value = standalone || document.body.dataset.mode === "sidepanel" || window.innerWidth < 680; }
function showNotice(message: string, bad = false) {
  if (disposed) return;
  notice.value = message; noticeBad.value = bad;
  if (noticeTimer !== undefined) clearTimeout(noticeTimer);
  if (active()) noticeTimer = setTimeout(() => { notice.value = ""; noticeTimer = undefined; }, 3200);
}
function closeContextMenu() { contextMenu.visible = false; contextMenu.item = null; contextMenu.isConfirmingDelete = false; }
let previewOriginalUrl = "", previewLoadVersion = 0;
function closePreviewModal() {
  ++previewLoadVersion;
  if (previewOriginalUrl) URL.revokeObjectURL(previewOriginalUrl);
  previewOriginalUrl = ""; previewModal.visible = false; previewModal.item = null; stopPreviewDrag();
}
function pause() {
  epoch++; service.pauseReads(); closeContextMenu(); closePreviewModal();
  sendRequest?.abort(); sendRequest = undefined; reader?.abort(); reader = undefined;
  if (copyTimer !== undefined) clearTimeout(copyTimer);
  if (noticeTimer !== undefined) clearTimeout(noticeTimer);
  copyTimer = undefined; noticeTimer = undefined; copiedId.value = null;
  window.removeEventListener("resize", checkNarrow);
}
const detachPause = props.dockOwned ? onStickersPause(pause) : () => {};
function visibility() {
  pageVisible.value = !document.hidden;
  if (document.hidden) pause();
  else if (props.active) { checkNarrow(); window.addEventListener("resize", checkNarrow); service.activate(); }
}
watch(() => props.active, enabled => {
  if (!enabled) pause();
  else if (pageVisible.value) { checkNarrow(); window.addEventListener("resize", checkNarrow); service.activate(); }
}, { flush: "sync" });
function onGlobalKeyDown(event: KeyboardEvent) {
  if (active() && event.key === "Escape") {
    if (previewModal.visible) closePreviewModal(); else closeContextMenu();
  }
}
function outsideMenu(event: Event) {
  if (!(event.target as Element)?.closest?.(".sticker-context-menu")) closeContextMenu();
}
watch(() => [contextMenu.visible, previewModal.visible], () => {
  const visible = contextMenu.visible || previewModal.visible;
  window.removeEventListener("keydown", onGlobalKeyDown); document.removeEventListener("pointerdown", outsideMenu, true);
  if (visible && active()) {
    window.addEventListener("keydown", onGlobalKeyDown);
    if (contextMenu.visible) document.addEventListener("pointerdown", outsideMenu, true);
  }
}, { flush: "sync" });
watch(() => state.hasFolder, hasFolder => { if (!hasFolder) { closeContextMenu(); closePreviewModal(); } });
onMounted(() => {
  if (props.dockOwned) service.onToast = showNotice;
  service.enableBoardPaging(); detachActions = service.attachBoard(); service.init(); checkNarrow();
  document.addEventListener("visibilitychange", visibility);
  if (active()) window.addEventListener("resize", checkNarrow);
});
onBeforeUnmount(() => {
  disposed = true; pause(); detachPause(); detachActions?.();
  document.removeEventListener("visibilitychange", visibility);
  document.removeEventListener("pointerdown", outsideMenu, true); window.removeEventListener("keydown", onGlobalKeyDown);
  // Dock is isolated. Default board exists only in its standalone page realm.
  service.dispose();
});
async function dispatch(action: StickerBoardAction, payload?: unknown): Promise<void> {
  if (!active()) return;
  if (busy.value) { showNotice("操作尚未结束，请稍候；没有自动排队。"); return; }
  try { await controller.dispatch(action, payload); }
  catch (error: any) {
    showNotice(action === "delete-item" ? (error?.message || "删除未确认，请刷新核对，不要重复删除。")
      : "操作未完成，目录关联或部分文件可能已保存，请核对后再操作；未自动重试。", true);
  }
}
async function onCreateFolder() {
  const name = newFolderName.value.trim();
  if (!name || !active() || busy.value) return;
  try { await controller.dispatch("create-folder", name); if (!disposed) newFolderName.value = ""; }
  catch { showNotice("新建或后续读取失败，请核对目录后再操作。", true); }
}
function onSelectFolder(folder: StickerFolderNode) { onNavigateToPath(folder.path); }
function onSidebarWheel(e: WheelEvent) {
  const sidebar = e.currentTarget as HTMLElement | null;
  const packsEl = sidebar?.querySelector<HTMLElement>(".sticker-packs");
  // The list already scrolls natively; only forward wheel events from its header.
  if (!packsEl || (e.target instanceof Node && packsEl.contains(e.target))) return;
  const delta = e.deltaMode === WheelEvent.DOM_DELTA_LINE ? e.deltaY * 16
    : e.deltaMode === WheelEvent.DOM_DELTA_PAGE ? e.deltaY * packsEl.clientHeight : e.deltaY;
  packsEl.scrollTop += delta;
}
const totalStickersCount = computed(() => {
  return state.folders.find((f) => f.path === "")?.itemCount || state.totalCount;
});
function onNavigateToPath(path: string) {
  if (busy.value) return;
  closeContextMenu(); closePreviewModal(); void dispatch("select-folder", path);
  if (isNarrow.value) isFolderDrawerOpen.value = false;
}
function onToggleExpand(folder: StickerFolderNode) { void dispatch("toggle-expand", folder.path); }
function onSelectPill(pill: StickerSubnavPill) { onNavigateToPath(pill.path); }
const fileInput = ref<HTMLInputElement | null>(null);
async function onPickFiles() {
  if (!active() || busy.value) return;
  const target = service.getActiveTargetHandle();
  if (state.storageKind === "directory" && (!target || !await service.ensureHandlePermission(target.handle))) {
    showNotice("请先在图库设置中授权读取或允许添加图片。", true); return;
  }
  if (active()) fileInput.value?.click();
}

function scrollToGridTop() {
  const grid = document.getElementById("sticker-items");
  if (grid) {
    grid.scrollTo({ top: 0, behavior: "smooth" });
  }
}

const visiblePages = computed(() => {
  const total = state.totalPages;
  const current = state.currentPage;
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: number[] = [1];
  if (current > 3) {
    pages.push(-1);
  }
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (current < total - 2) {
    pages.push(-1);
  }
  pages.push(total);
  return pages;
});

function onGoPage(page: number) {
  if (page < 1 || page > state.totalPages || page === state.currentPage || busy.value) return;
  void dispatch("go-page", page);
  scrollToGridTop();
}

function onPrevPage() {
  void dispatch("prev-page");
  scrollToGridTop();
}

function onNextPage() {
  void dispatch("next-page");
  scrollToGridTop();
}
async function saveFiles(files: File[]) {
  if (!active() || busy.value || !files.length) return;
  if (files.length > 50) { showNotice("一次最多导入50张，请分批；已在图库文件夹中的图片无需再次导入。", true); return; }
  const target = service.getActiveTargetHandle();
  if (!target) {
    if (state.storageKind !== "indexeddb") { showNotice("请先在设置中重新授权图库，未转存到内置库。", true); return; }
    try {
      await mutation(() => service.saveFilesToIndexedDb(files));
      showNotice(`✓ 已保存 ${files.length} 张表情到内置库`);
    } catch {
      showNotice("保存表情失败，请稍后重试", true);
    }
    return;
  }
  try { await mutation(() => service.saveFilesToDir(target.handle, files, target.name)); }
  catch { showNotice("保存未完成，可能已有部分文件写入，请核对；未自动重试。", true); }
}
function onFilesChanged(event: Event) {
  const input = event.target as HTMLInputElement, files = Array.from(input.files || []); input.value = "";
  void saveFiles(files);
}
async function onDrop(event: DragEvent) {
  const transfer = event.dataTransfer;
  if (!transfer || !active() || busy.value) return;
  const files = Array.from(transfer.files);
  if (files.length) { await saveFiles(files); return; }
  const url = service.extractImageUrlFromTransfer(transfer) || service.droppedUrl(transfer);
  if (!url) { showNotice("未识别到可拖入的图片内容。", true); return; }
  const target = service.getActiveTargetHandle();
  if (!target) {
    if (state.storageKind !== "indexeddb") { showNotice("请先在设置中重新授权图库，未转存到内置库。", true); return; }
    try {
      await mutation(() => service.saveUrlToIndexedDb(url));
      showNotice("✓ 已保存网络表情到内置库");
    } catch {
      showNotice("读取或保存网络表情失败，请核对。", true);
    }
    return;
  }
  try { await mutation(() => service.saveUrlToDir(target.handle, url, target.name)); }
  catch { showNotice("读取或保存失败，请核对目录；未自动重试。", true); }
}
async function onCopyItem(item: StickerCardItem) {
  if (!active() || copying.value) return;
  copying.value = true;
  const current = epoch;
  try {
    const ok = await service.copyItem(item);
    if (!ok || !active() || current !== epoch) return;
    copiedId.value = item.id;
    if (copyTimer !== undefined) clearTimeout(copyTimer);
    copyTimer = setTimeout(() => { copiedId.value = null; copyTimer = undefined; }, 1800);
  } finally { if (!disposed) copying.value = false; }
}
function openItemContextMenu(item: StickerCardItem, event: MouseEvent) {
  event.preventDefault(); event.stopPropagation();
  if (!active()) return;
  contextMenu.item = item; contextMenu.isConfirmingDelete = false; classificationTarget.value = "__choose__";
  contextMenu.x = Math.max(8, Math.min(event.clientX, window.innerWidth - 250));
  contextMenu.y = Math.max(8, Math.min(event.clientY, window.innerHeight - 280)); contextMenu.visible = true;
}
function handleMenuCopy() { const item = contextMenu.item; closeContextMenu(); if (item) void onCopyItem(item); }
async function handleMenuView() {
  const item = contextMenu.item, current = epoch; closeContextMenu(); closePreviewModal();
  const previewVersion = previewLoadVersion;
  if (!item) return;
  try {
    const blob = await service.readItemBlob(item);
    if (!active() || current !== epoch || previewVersion !== previewLoadVersion) return;
    previewOriginalUrl = URL.createObjectURL(blob);
    previewPosition.x = Math.max(8, window.innerWidth - 700); previewPosition.y = 80;
    previewModal.item = { ...item, url: previewOriginalUrl }; previewModal.visible = true;
  } catch { showNotice("原图读取失败，请核对图库授权。", true); }
}
function handleMenuDelete(event: MouseEvent) {
  event.stopPropagation();
  if (!contextMenu.item || busy.value) return;
  if (state.storageKind !== "directory" && !contextMenu.isConfirmingDelete) { contextMenu.isConfirmingDelete = true; return; }
  const item = contextMenu.item; closeContextMenu(); closePreviewModal(); void dispatch("delete-item", item);
}

</script>

<style scoped>
.vue-sticker-board-wrapper {
  width: 100%;
}
.sticker-menu-classify { padding:6px; max-width:min(230px, calc(100vw - 24px)); }
.sticker-menu-classify select { width:100%; color:var(--text); background:var(--panel); border:1px solid var(--border); border-radius:6px; padding:5px; }
.sticker-menu-classify button { white-space:normal; }

.sidebar-navigation-card {
  width: 100%;
  text-align: left;
  font: inherit;
}
.sidebar-navigation-card:disabled {
  cursor: default;
  opacity: 0.6;
}

.tree-branch-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  font-size: 13px;
  color: var(--dim, #94a3b8);
  margin-right: 4px;
  flex-shrink: 0;
  user-select: none;
  font-weight: 700;
  line-height: 1;
  opacity: 0.85;
}

:deep(.sticker-tree-row.on .tree-branch-icon) {
  color: #38bdf8;
  opacity: 1;
}

/* 资源管理器风格地址与导航栏 */
.sticker-explorer-nav {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--surface, rgba(255, 255, 255, 0.05));
  border: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  border-radius: 8px;
  margin-bottom: 12px;
  box-sizing: border-box;
}

html[data-theme="lonetrail"] .sticker-explorer-nav {
  background: rgba(238, 233, 222, 0.7);
  border-color: rgba(138, 126, 114, 0.2);
}

.explorer-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text, #dbe4ee);
  background: var(--surface-hover, rgba(255, 255, 255, 0.08));
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

html[data-theme="lonetrail"] .explorer-back-btn {
  background: #ffffff;
  color: #3b332b;
  border-color: rgba(138, 126, 114, 0.3);
}

.explorer-back-btn:hover {
  background: var(--surface-active, rgba(56, 189, 248, 0.18));
  border-color: #38bdf8;
  color: #38bdf8;
}

.explorer-breadcrumb-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  min-width: 0;
  font-size: 12.5px;
}

.crumb-arrow {
  color: var(--dim, #64748b);
  font-size: 13px;
  user-select: none;
}

.crumb-link {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: none;
  border: none;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 12.5px;
  color: var(--muted, #94a3b8);
  cursor: pointer;
  transition: all 0.12s ease;
}

html[data-theme="lonetrail"] .crumb-link {
  color: #786d63;
}

.crumb-link:hover {
  color: #38bdf8;
  background: var(--surface-hover, rgba(255, 255, 255, 0.08));
}

.crumb-link.is-active {
  color: var(--text, #f8fafc);
  font-weight: 700;
  cursor: default;
}

html[data-theme="lonetrail"] .crumb-link.is-active {
  color: #2b241e;
}

/* 子文件夹卡片区 */
.sticker-subfolders-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}

.subfolders-section-header {
  font-size: 12px;
  font-weight: 700;
  color: var(--muted, #94a3b8);
}

html[data-theme="lonetrail"] .subfolders-section-header {
  color: #8c7e72;
}

.subfolders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
}

.subfolder-card {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  background: var(--surface, rgba(255, 255, 255, 0.04));
  border: 1px solid var(--border, rgba(255, 255, 255, 0.09));
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.12s ease;
  user-select: none;
  flex-shrink: 0 !important;
}

.subfolder-card:hover {
  background: var(--surface-hover, rgba(56, 189, 248, 0.1));
  border-color: rgba(56, 189, 248, 0.35);
  transform: translateX(1px);
}

.sidebar-folder-card.active {
  background: color-mix(in srgb, #38bdf8 15%, var(--surface)) !important;
  border-color: #38bdf8 !important;
  box-shadow: 0 1px 6px rgba(56, 189, 248, 0.2) !important;
}

.subfolder-card-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.subfolder-card-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.subfolder-card-name {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text, #f1f5f9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.subfolder-card-count {
  font-size: 10px;
  color: var(--muted, #64748b);
}

.sticker-library-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--surface, rgba(255, 255, 255, 0.04));
  border: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  border-radius: 8px;
  margin-bottom: 10px;
}

.library-title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sticker-quick-import-btn {
  padding: 4px 10px;
  font-size: 11.5px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface-hover);
  color: var(--text);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.12s ease;
}

.sticker-quick-import-btn:hover {
  background: #38bdf8;
  color: #ffffff;
  border-color: #38bdf8;
}

html[data-theme="lonetrail"] .subfolder-card {
  background: #ffffff;
  border-color: rgba(138, 126, 114, 0.2);
  box-shadow: 0 1px 3px rgba(74, 53, 39, 0.05);
}

.subfolder-card:hover {
  background: var(--surface-hover, rgba(56, 189, 248, 0.1));
  border-color: rgba(56, 189, 248, 0.35);
  transform: translateY(-1px);
}

.sidebar-folder-card.active {
  background: color-mix(in srgb, #38bdf8 15%, var(--surface)) !important;
  border-color: #38bdf8 !important;
  box-shadow: 0 2px 10px rgba(56, 189, 248, 0.2) !important;
}

.sidebar-folder-card.active .subfolder-card-name {
  color: #38bdf8 !important;
}

.sidebar-folder-card.active .subfolder-card-arrow {
  color: #38bdf8 !important;
  font-weight: 700 !important;
  transform: translateX(2px);
}

.sidebar-back-card {
  border-style: dashed !important;
  background: var(--surface-hover, rgba(56, 189, 248, 0.08)) !important;
  color: #38bdf8 !important;
}

.sidebar-back-card:hover {
  border-style: solid !important;
  border-color: #38bdf8 !important;
  transform: translateX(-2px) !important;
}

.sidebar-leaf-tag {
  font-size: 10px;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.15);
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 600;
  margin-left: auto;
  white-space: nowrap;
}

.sub-folder-indent-symbol {
  color: var(--muted);
  font-weight: normal;
  font-size: 11px;
}

.subfolder-card-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.subfolder-card-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.subfolder-card-name {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text, #f1f5f9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

html[data-theme="lonetrail"] .subfolder-card-name {
  color: #3b332b;
}

.subfolder-card-count {
  font-size: 11px;
  color: var(--muted, #64748b);
}

html[data-theme="lonetrail"] .subfolder-card-count {
  color: #8c7e72;
}

.subfolder-card-arrow {
  color: var(--dim, #64748b);
  font-size: 14px;
}

.tree-toggle-spacer {
  width: 16px;
  height: 16px;
  display: inline-block;
  flex-shrink: 0;
  margin-right: 2px;
}

/* 卡片点击复制反馈动画 */
.sticker-item {
  position: relative;
  cursor: pointer;
  content-visibility: auto;
  contain-intrinsic-size: 110px 110px;
  transition: transform 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;
}

.sticker-item:hover {
  transform: translateY(-2px);
  border-color: rgba(56, 189, 248, 0.45) !important;
}

.sticker-item.just-copied {
  border-color: #10b981 !important;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.4) !important;
}

.sticker-copied-pill {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 4;
  padding: 2px 7px;
  border-radius: 999px;
  background: #10b981;
  color: #ffffff;
  font-size: 10px;
  font-weight: 750;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
  animation: popIn 0.15s ease-out;
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

/* 右键浮动上下文菜单 */
.sticker-context-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2147483640;
}

.sticker-context-menu {
  position: fixed;
  z-index: 2147483641;
  min-width: 136px;
  background: var(--panel, #0f172a);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.14));
  border-radius: 8px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  user-select: none;
  animation: popIn 0.1s ease-out;
}

.sticker-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 10px;
  border-radius: 5px;
  border: 0;
  background: transparent;
  color: var(--text, #e2e8f0);
  font-size: 11.5px;
  font-weight: 550;
  cursor: pointer;
  text-align: left;
  transition: background 0.12s ease;
}

.sticker-menu-item:hover {
  background: var(--surface-hover, rgba(255, 255, 255, 0.1));
  color: #38bdf8;
}

.sticker-menu-item.danger {
  color: #fb7185;
}

.sticker-menu-item.danger:hover {
  background: rgba(239, 68, 68, 0.16);
  color: #ef4444;
}

.sticker-menu-item.danger.is-confirming {
  background: rgba(239, 68, 68, 0.28) !important;
  color: #ff4d6d !important;
  font-weight: 750;
}

.sticker-menu-divider {
  height: 1px;
  background: var(--border, rgba(255, 255, 255, 0.08));
  margin: 3px 0;
}

.menu-icon {
  font-size: 13px;
  line-height: 1;
}

/* 本地大图无损画廊查看层 */
.sticker-lightbox-window { position:fixed; z-index:2147483645; max-width:calc(100vw - 16px); }

.sticker-lightbox-dialog {
  display: flex;
  flex-direction: column;
  width: min(680px, calc(100vw - 16px));
  max-width: calc(100vw - 16px);
  max-height: min(75vh, 680px);
  background: var(--panel, #0f172a);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.16));
  border-radius: 14px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
  overflow: hidden;
}

.sticker-lightbox-head {
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: var(--surface, #1e293b);
  border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.1));
  gap: 12px;
}

.sticker-lightbox-info strong {
  display: block;
  font-size: 12.5px;
  color: var(--heading, #ffffff);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 450px;
}

.sticker-lightbox-info small {
  color: var(--dim, #94a3b8);
  font-size: 10.5px;
}

.sticker-lightbox-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lightbox-action-btn {
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid rgba(56, 189, 248, 0.4);
  background: rgba(56, 189, 248, 0.12);
  color: #38bdf8;
  font-size: 11px;
  font-weight: 650;
  cursor: pointer;
}

.lightbox-action-btn:hover {
  background: rgba(56, 189, 248, 0.22);
}

.lightbox-close-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  background: transparent;
  color: var(--muted, #cbd5e1);
  display: grid;
  place-items: center;
  font-size: 12px;
  cursor: pointer;
}

.lightbox-close-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.4);
}

.sticker-lightbox-body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow: auto;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
}

.sticker-lightbox-img {
  max-width: min(82vw, 840px);
  max-height: min(72vh, 640px);
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
}

/* ================= 表情包现代高级分页器 ================= */
.sticker-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 16px;
  border-top: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  background: var(--surface, rgba(255, 255, 255, 0.03));
  user-select: none;
  flex-shrink: 0;
  box-sizing: border-box;
}

.sticker-page-left,
.sticker-page-right {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 110px;
}

.sticker-page-right {
  justify-content: flex-end;
}

.sticker-page-summary {
  font-size: 11.5px;
  color: var(--muted, #94a3b8);
}

.sticker-page-summary strong {
  color: var(--text, #f1f5f9);
  font-weight: 700;
}

.sticker-page-badge {
  font-size: 10px;
  color: var(--dim, #64748b);
  background: var(--hover, rgba(255, 255, 255, 0.06));
  padding: 1px 6px;
  border-radius: 4px;
}

.sticker-page-progress {
  font-size: 11px;
  font-weight: 600;
  color: var(--dim, #64748b);
  letter-spacing: 0.5px;
}

.sticker-page-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1;
}

.sticker-nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 28px;
  padding: 0 12px;
  font-size: 11.5px;
  font-weight: 600;
  border-radius: 7px;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.1));
  background: var(--panel, rgba(255, 255, 255, 0.05));
  color: var(--text, #e2e8f0);
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.sticker-nav-btn:hover:not(:disabled) {
  border-color: #38bdf8;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(56, 189, 248, 0.18);
}

.sticker-nav-btn:active:not(:disabled) {
  transform: translateY(0);
}

.sticker-nav-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  border-color: var(--border, rgba(255, 255, 255, 0.05));
  color: var(--muted, #64748b);
}

.sticker-page-numbers {
  display: flex;
  align-items: center;
  gap: 4px;
}

.sticker-num-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 6px;
  font-size: 11.5px;
  font-weight: 600;
  border-radius: 7px;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  background: var(--panel, rgba(255, 255, 255, 0.04));
  color: var(--text, #cbd5e1);
  cursor: pointer;
  transition: all 0.14s ease;
  outline: none;
}

.sticker-num-btn:hover:not(:disabled):not(.active) {
  border-color: #38bdf8;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.08);
}

.sticker-num-btn.active {
  border-color: #38bdf8;
  background: #38bdf8;
  color: #0f172a;
  font-weight: 750;
  box-shadow: 0 2px 8px rgba(56, 189, 248, 0.4);
  cursor: default;
}

.sticker-page-ellipsis {
  font-size: 11px;
  color: var(--dim, #64748b);
  padding: 0 2px;
}

/* 浅色主题 (Light) 特化 */
html[data-theme="light"] .sticker-pagination {
  background: #f8fafc;
  border-top-color: rgba(15, 23, 42, 0.08);
}

html[data-theme="light"] .sticker-nav-btn,
html[data-theme="light"] .sticker-num-btn {
  background: #ffffff;
  border-color: rgba(15, 23, 42, 0.12);
  color: #334155;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
}

html[data-theme="light"] .sticker-nav-btn:hover:not(:disabled),
html[data-theme="light"] .sticker-num-btn:hover:not(:disabled):not(.active) {
  border-color: #0284c7;
  color: #0284c7;
  background: #f0f9ff;
}

html[data-theme="light"] .sticker-num-btn.active {
  background: #0284c7;
  border-color: #0284c7;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.35);
}

/* 孤星纸面主题 (Lonetrail) 特化 */
html[data-theme="lonetrail"] .sticker-pagination {
  background: #f4f0e8;
  border-top-color: rgba(138, 126, 114, 0.2);
}

html[data-theme="lonetrail"] .sticker-nav-btn,
html[data-theme="lonetrail"] .sticker-num-btn {
  background: #ffffff;
  border-color: rgba(138, 126, 114, 0.25);
  color: #3b332b;
  box-shadow: 0 1px 3px rgba(74, 53, 39, 0.04);
}

html[data-theme="lonetrail"] .sticker-nav-btn:hover:not(:disabled),
html[data-theme="lonetrail"] .sticker-num-btn:hover:not(:disabled):not(.active) {
  border-color: #a34e3c;
  color: #a34e3c;
  background: rgba(163, 78, 60, 0.07);
}

html[data-theme="lonetrail"] .sticker-num-btn.active {
  background: #a34e3c;
  border-color: #a34e3c;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(163, 78, 60, 0.35);
}

/* 窄屏响应式折叠 */
@media (max-width: 600px) {
  .sticker-page-left,
  .sticker-page-right {
    display: none;
  }
}
</style>
