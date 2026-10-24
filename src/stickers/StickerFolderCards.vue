<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, reactive, ref, watch } from "vue";
import { useContextMenu } from "../sdk/interactions";
import type { StickerSubFolderCard } from "./sticker-board-store";

const props = defineProps<{
  folders: StickerSubFolderCard[];
  activePath: string;
  parentPath: string;
  active: boolean;
  busy: boolean;
  directoryBacked: boolean;
  canReorder: boolean;
  renameFolder: (path: string, name: string) => Promise<void>;
  deleteFolder: (path: string) => Promise<void>;
  reorderFolders: (parentPath: string, paths: string[]) => Promise<void>;
}>();
const emit = defineEmits<{ select: [path: string] }>();
const listRef = ref<HTMLElement | null>(null);
const preview = ref<StickerSubFolderCard[] | null>(null);
const displayed = computed(() => preview.value || props.folders);
const working = ref(false), error = ref("");
const menu = reactive({ visible: false, x: 0, y: 0, folder: null as StickerSubFolderCard | null, mode: "menu" as "menu" | "rename" | "delete", name: "" });
const nameInput = ref<HTMLInputElement | null>(null);
function closeMenu() { if (!working.value) { menu.visible = false; menu.folder = null; error.value = ""; } }
const { menuRef, style: menuStyle } = useContextMenu({ visible: () => menu.visible && props.active, anchor: () => menu, dismiss: closeMenu });
const protectedFolder = computed(() => !menu.folder?.path || (!props.directoryBacked && menu.folder.path === "默认"));
function openMenu(folder: StickerSubFolderCard, event: MouseEvent) {
  if (!props.active || props.busy || working.value) return;
  cancelDrag();
  Object.assign(menu, { visible: true, x: event.clientX, y: event.clientY, folder: { ...folder }, mode: "menu", name: folder.name });
  error.value = "";
}
async function editName() {
  menu.mode = "rename";
  await nextTick(); nameInput.value?.focus(); nameInput.value?.select();
}
async function submitMenu() {
  const folder = menu.folder;
  if (!folder || protectedFolder.value || working.value || props.busy || !props.active) return;
  working.value = true; error.value = "";
  try {
    if (menu.mode === "rename") await props.renameFolder(folder.path, menu.name.trim());
    else if (menu.mode === "delete") await props.deleteFolder(folder.path);
    menu.visible = false; menu.folder = null;
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : "操作未确认完成，请重新打开模块核对；未自动重试。";
  } finally { working.value = false; }
}

const drag = reactive({ visible: false, path: "", x: 0, y: 0, width: 0, height: 0, offsetX: 0, offsetY: 0, name: "", count: 0 });
let pointerId: number | null = null, startX = 0, startY = 0, frame = 0, suppressClickUntil = 0;
let scrollEl: HTMLElement | null = null;
let dragParent = "";
function clearPointer() {
  window.removeEventListener("pointermove", pointerMove);
  window.removeEventListener("pointerup", pointerUp);
  window.removeEventListener("pointercancel", pointerCancel);
  window.removeEventListener("blur", cancelDrag);
  window.removeEventListener("keydown", dragKey, true);
  cancelAnimationFrame(frame); frame = 0; pointerId = null; scrollEl = null;
}
function cancelDrag() {
  if (drag.visible) suppressClickUntil = performance.now() + 300;
  clearPointer(); drag.visible = false; drag.path = ""; preview.value = null;
}
function startPointer(folder: StickerSubFolderCard, event: PointerEvent) {
  if (event.button !== 0 || !props.canReorder || props.busy || working.value || !props.active) return;
  cancelDrag(); closeMenu();
  const element = event.currentTarget as HTMLElement, rect = element.getBoundingClientRect();
  pointerId = event.pointerId; startX = event.clientX; startY = event.clientY; dragParent = props.parentPath;
  Object.assign(drag, { path: folder.path, x: event.clientX, y: event.clientY, width: rect.width, height: rect.height,
    offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top, name: folder.name, count: folder.count });
  scrollEl = listRef.value?.closest<HTMLElement>(".sticker-packs") || null;
  window.addEventListener("pointermove", pointerMove, { passive: false });
  window.addEventListener("pointerup", pointerUp);
  window.addEventListener("pointercancel", pointerCancel);
  window.addEventListener("blur", cancelDrag);
  window.addEventListener("keydown", dragKey, true);
}
function pointerMove(event: PointerEvent) {
  if (event.pointerId !== pointerId) return;
  if (!drag.visible && Math.hypot(event.clientX - startX, event.clientY - startY) < 6) return;
  event.preventDefault();
  if (!drag.visible) { drag.visible = true; preview.value = [...props.folders]; }
  drag.x = event.clientX; drag.y = event.clientY;
  if (!frame) frame = requestAnimationFrame(tick);
}
function tick() {
  frame = 0;
  if (!drag.visible || !scrollEl || !listRef.value) return;
  const bounds = scrollEl.getBoundingClientRect();
  // Only preview same-level positions within this list, never another folder's contents.
  if (drag.x >= bounds.left - 24 && drag.x <= bounds.right + 24) {
    if (drag.y < bounds.top + 28) scrollEl.scrollTop -= 7;
    else if (drag.y > bounds.bottom - 28) scrollEl.scrollTop += 7;
    const cards = [...listRef.value.querySelectorAll<HTMLElement>("[data-folder-path]")];
    const others = (preview.value || props.folders).filter(folder => folder.path !== drag.path);
    // offsetTop is unaffected by FLIP transforms while neighbors ease into their new places.
    const listTop = listRef.value.getBoundingClientRect().top;
    let index = 0;
    for (const folder of others) {
      const card = cards.find(card => card.dataset.folderPath === folder.path);
      if (card && drag.y > listTop + card.offsetTop + card.offsetHeight / 2) index++;
    }
    const source = props.folders.find(folder => folder.path === drag.path);
    if (source) {
      const next = [...others]; next.splice(index, 0, source);
      if (next.some((folder, i) => folder.path !== preview.value?.[i]?.path)) preview.value = next;
    }
  }
  frame = requestAnimationFrame(tick);
}
async function pointerUp(event: PointerEvent) {
  if (event.pointerId !== pointerId) return;
  if (!drag.visible) { cancelDrag(); return; }
  const bounds = scrollEl?.getBoundingClientRect();
  const valid = bounds && event.clientX >= bounds.left - 24 && event.clientX <= bounds.right + 24 &&
    event.clientY >= bounds.top - 24 && event.clientY <= bounds.bottom + 24;
  drag.x = event.clientX; drag.y = event.clientY;
  cancelAnimationFrame(frame); frame = 0;
  if (valid) tick();
  const paths = (preview.value || props.folders).map(folder => folder.path);
  const changed = paths.some((path, index) => path !== props.folders[index]?.path);
  clearPointer(); drag.visible = false; suppressClickUntil = performance.now() + 300;
  if (!valid || !changed || !props.active || props.busy) { cancelDrag(); return; }
  working.value = true; error.value = "";
  try { await props.reorderFolders(dragParent, paths); }
  catch (reason) { error.value = reason instanceof Error ? reason.message : "排序保存未确认，请重新打开模块核对。"; }
  finally { working.value = false; preview.value = null; drag.path = ""; }
}
function pointerCancel(event: PointerEvent) { if (event.pointerId === pointerId) cancelDrag(); }
function dragKey(event: KeyboardEvent) {
  if (event.key === "Escape" && pointerId !== null) { event.preventDefault(); event.stopPropagation(); cancelDrag(); }
}
function select(path: string) {
  if (performance.now() < suppressClickUntil || working.value || props.busy) return;
  emit("select", path);
}
watch(() => [props.active, props.parentPath, props.folders.map(folder => folder.path).sort().join("\u0000")] as const, () => {
  cancelDrag(); if (!working.value) closeMenu();
});
onBeforeUnmount(cancelDrag);
</script>

<template>
  <div ref="listRef" class="sticker-folder-cards-wrap">
    <TransitionGroup tag="div" name="sticker-folder" class="sticker-folder-cards">
      <div v-for="folder in displayed" :key="folder.path" class="sidebar-folder-card subfolder-card folder-card"
        :class="{ active: folder.path === activePath, 'is-dragging': drag.visible && drag.path === folder.path, 'can-sort': canReorder && !busy && !working }"
        :data-folder-path="folder.path" role="button" tabindex="0" :aria-label="folder.name" :aria-disabled="busy || working"
        @pointerdown="startPointer(folder, $event)" @dragstart.prevent
        @click="select(folder.path)" @keydown.enter.prevent="select(folder.path)" @keydown.space.prevent="select(folder.path)"
        @contextmenu.prevent.stop="openMenu(folder, $event)">
        <span class="folder-icon" aria-hidden="true">📁</span>
        <div class="folder-info"><strong>{{ folder.name }}</strong><small>{{ folder.count }} 张图片</small></div>
        <span class="folder-arrow" aria-hidden="true">›</span>
      </div>
    </TransitionGroup>
    <p v-if="error && !menu.visible" class="folder-error" role="alert">{{ error }}</p>
  </div>
  <Teleport to="body">
    <div v-if="drag.visible" class="folder-drag-ghost" :style="{ left: `${drag.x - drag.offsetX}px`, top: `${drag.y - drag.offsetY}px`, width: `${drag.width}px`, height: `${drag.height}px` }" aria-hidden="true">
      <span class="folder-icon">📁</span><div class="folder-info"><strong>{{ drag.name }}</strong><small>{{ drag.count }} 张图片</small></div>
    </div>
    <div v-if="menu.visible && active" ref="menuRef" class="folder-context-menu" :style="menuStyle" @pointerdown.stop @click.stop>
      <template v-if="menu.mode === 'menu'">
        <strong class="menu-heading">{{ menu.folder?.name }}</strong>
        <button type="button" :disabled="protectedFolder || busy || working" @click="editName">重命名</button>
        <button type="button" class="danger" :disabled="protectedFolder || busy || working" @click="menu.mode = 'delete'">删除分类</button>
        <small v-if="protectedFolder" class="menu-note">默认分类保留，用于接收未分类图片。</small>
      </template>
      <form v-else @submit.prevent="submitMenu">
        <strong class="menu-heading">{{ menu.mode === 'rename' ? '重命名分类' : '删除分类' }}</strong>
        <template v-if="menu.mode === 'rename'">
          <input ref="nameInput" v-model="menu.name" maxlength="50" aria-label="分类新名称" :disabled="working" required />
          <small v-if="directoryBacked" class="menu-note">只修改虚拟分类名称，不改磁盘目录或原图。</small>
        </template>
        <p v-else class="menu-note">{{ directoryBacked ? '移除该分类及子分类，索引中的图片归入上一级；磁盘原图和目录均不改动。' : '移除该分类，图片转入默认分类，不删除图片。' }}</p>
        <p v-if="error" class="folder-error" role="alert">{{ error }}</p>
        <div class="menu-actions"><button type="button" :disabled="working" @click="closeMenu">取消</button><button type="submit" :disabled="working || busy" :class="{ danger: menu.mode === 'delete' }">{{ working ? '保存中…' : '确认' }}</button></div>
      </form>
    </div>
  </Teleport>
</template>

<style scoped>
.sticker-folder-cards-wrap { flex:none; min-width:0; }
.sticker-folder-cards { display:flex; flex-direction:column; gap:8px; position:relative; }
.folder-card, .folder-drag-ghost { display:flex; align-items:center; gap:8px; min-height:48px; padding:9px 10px; box-sizing:border-box; border:1px solid var(--border); border-radius:7px; background:var(--surface); color:var(--text); user-select:none; }
.folder-card { cursor:pointer; transition:opacity .15s, border-color .15s, background .15s; }
.folder-card.can-sort { cursor:grab; touch-action:none; }
.folder-card:focus-visible { outline:2px solid var(--accent, #38bdf8); outline-offset:2px; }
.folder-card:hover { background:var(--surface-hover, var(--panel)); border-color:var(--accent, #38bdf8); }
.folder-card.active { background:color-mix(in srgb, #38bdf8 15%, var(--surface)); border-color:#38bdf8; }
.folder-card.is-dragging { opacity:.22; border-style:dashed; }
.folder-icon { flex:none; font-size:18px; }
.folder-info { display:flex; flex:1; flex-direction:column; gap:2px; min-width:0; }
.folder-info strong { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:11.5px; font-weight:600; }
.folder-info small { font-size:10px; color:var(--muted); }
.folder-arrow { flex:none; color:var(--muted); }
.sticker-folder-move { transition:transform .2s cubic-bezier(.2,.8,.2,1); }
.folder-drag-ghost { position:fixed; z-index:10010; pointer-events:none; opacity:.94; transform:scale(1.025); box-shadow:0 12px 28px rgba(0,0,0,.16); border-color:var(--accent, #38bdf8); }
.folder-context-menu { z-index:10020; width:260px; padding:7px; border:1px solid var(--border); border-radius:10px; background:var(--panel); color:var(--text); box-shadow:0 10px 32px rgba(0,0,0,.15); }
.folder-context-menu button { display:block; width:100%; padding:8px 10px; border:0; border-radius:6px; background:transparent; color:var(--text); text-align:left; font:inherit; font-size:12px; cursor:pointer; }
.folder-context-menu button:hover:not(:disabled) { background:var(--surface-hover, var(--surface)); }
.folder-context-menu button:disabled { opacity:.5; cursor:default; }
.folder-context-menu .danger, .folder-error { color:var(--danger, #d14343); }
.menu-heading { display:block; padding:5px 8px; overflow-wrap:anywhere; font-size:12px; }
.menu-note { display:block; margin:6px 8px; font-size:11px; line-height:1.6; color:var(--muted); }
.folder-context-menu input { width:100%; padding:8px; box-sizing:border-box; border:1px solid var(--border); border-radius:6px; background:var(--surface); color:var(--text); font:inherit; font-size:12px; }
.menu-actions { display:flex; justify-content:flex-end; gap:6px; margin-top:8px; }
.menu-actions button { width:auto; border:1px solid var(--border); }
.folder-error { margin:6px 4px; font-size:11px; line-height:1.5; overflow-wrap:anywhere; }
@media (prefers-reduced-motion:reduce) { .sticker-folder-move { transition:none; } .folder-drag-ghost { transform:none; } }
</style>
