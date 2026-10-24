import { onBeforeUnmount, ref, shallowRef } from "vue";
import { TILE_DRAG_THRESHOLD, TILE_SWAP_COOLDOWN, inFolderDropCore, inTileSwapCore } from './tile-drag-geometry';

export interface LauncherTileHit<T> { parentId: string; item?: T; element: HTMLElement; container?: boolean; }
// UI-only adapter of FavoriteSites' pointer/ghost/live-swap interaction.
// The caller owns the tree, target hit-testing and persistence. Never writes during hover.
export function useLauncherPointerDrag<T extends { id: string }>(options: {
  enabled: () => boolean;
  parentOf: (item: T) => string;
  items: (parentId: string) => T[];
  isFolder: (item: T) => boolean;
  accepts: (item: T, parentId: string) => boolean;
  hit: (x: number, y: number) => LauncherTileHit<T> | null;
  beforeStart?: () => boolean;
  commit: (item: T, parentId: string, beforeId?: string, atEnd?: boolean) => Promise<void>;
}) {
  const activeId = ref('');
  const overFolder = ref('');
  const previews = shallowRef<Record<string, T[]>>({});
  const ghost = shallowRef<{ item: T; x: number; y: number; width: number; height: number } | null>(null);
  let source: T | null = null, pointer: number | null = null;
  let startX = 0, startY = 0, offsetX = 0, offsetY = 0, width = 0, height = 0;
  let moved = false, suppressedUntil = 0, lastKey = '', lastTime = 0;
  let destination: string | null = null, containerDrop = false;
  let captured: HTMLElement | null = null;
  function detach() {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', finish);
    window.removeEventListener('pointercancel', cancel);
    window.removeEventListener('blur', cancel);
    window.removeEventListener('keydown', keydown, true);
    window.removeEventListener('pagehide', cancel);
    document.removeEventListener('visibilitychange', visibility);
    try { if (captured && pointer !== null) captured.releasePointerCapture(pointer); } catch {}
    captured = null;
  }
  function cancel() {
    if (moved) suppressedUntil = Date.now() + 600;
    detach(); source = null; pointer = null; moved = false; destination = null;
    activeId.value = ''; overFolder.value = ''; previews.value = {}; ghost.value = null;
    lastKey = ''; lastTime = 0;
  }
  function keydown(event: KeyboardEvent) {
    if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); cancel(); }
  }
  function visibility() { if (document.hidden) cancel(); }
  function start(item: T, event: PointerEvent) {
    if (event.button !== 0 || !event.isPrimary || !options.enabled()) return;
    if (options.beforeStart?.() === false) return;
    cancel(); source = item; pointer = event.pointerId; startX = event.clientX; startY = event.clientY;
    captured = event.currentTarget as HTMLElement;
    const rect = captured.getBoundingClientRect();
    offsetX = event.clientX - rect.left; offsetY = event.clientY - rect.top; width = rect.width; height = rect.height;
    try { captured.setPointerCapture(event.pointerId); } catch {}
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', cancel);
    window.addEventListener('blur', cancel);
    window.addEventListener('keydown', keydown, true);
    window.addEventListener('pagehide', cancel);
    document.addEventListener('visibilitychange', visibility);
  }
  function move(event: PointerEvent) {
    if (!source || event.pointerId !== pointer) return;
    if (!options.enabled()) { cancel(); return; }
    if (!moved && Math.hypot(event.clientX - startX, event.clientY - startY) <= TILE_DRAG_THRESHOLD) return;
    event.preventDefault(); moved = true; activeId.value = source.id;
    ghost.value = { item: source, x: event.clientX - offsetX, y: event.clientY - offsetY, width, height };
    const hit = options.hit(event.clientX, event.clientY);
    if (!hit) { destination = null; overFolder.value = ''; return; }
    const rect = hit.element.getBoundingClientRect();
    const center = inFolderDropCore(rect, event.clientX, event.clientY);
    const folderTarget = hit.item && hit.item.id !== source.id && options.isFolder(hit.item) && center && options.accepts(source, hit.item.id);
    if (hit.container || folderTarget) {
      const target = folderTarget ? hit.item!.id : hit.parentId;
      if (!options.accepts(source, target)) { destination = null; overFolder.value = ''; return; }
      destination = target; containerDrop = true; overFolder.value = target;
      // FavoriteSites keeps the live ordering while highlighting a folder/tab.
      // Resetting it here snaps the target back under the pointer and causes oscillation.
      return;
    }
    if (!options.accepts(source, hit.parentId)) { destination = null; overFolder.value = ''; return; }
    overFolder.value = ''; destination = hit.parentId; containerDrop = false;
    const parent = options.parentOf(source);
    const current = [...(previews.value[hit.parentId] || options.items(hit.parentId))];
    const from = current.findIndex(item => item.id === source!.id);
    const to = hit.item ? current.findIndex(item => item.id === hit.item!.id) : -1;
    if (hit.item && hit.item.id !== source.id) {
      if (!inTileSwapCore(rect, event.clientX, event.clientY)) return;
      const key = hit.parentId + ':' + hit.item.id, now = Date.now();
      if (key === lastKey && now - lastTime < TILE_SWAP_COOLDOWN) return;
      if (to < 0 || from === to) return;
      if (from >= 0) current.splice(from, 1);
      current.splice(to, 0, source);
      lastKey = key; lastTime = now;
    } else if (from < 0) current.push(source);
    else return;
    previews.value = {
      ...(parent === hit.parentId ? {} : { [parent]: options.items(parent).filter(item => item.id !== source!.id) }),
      [hit.parentId]: current
    };
  }
  async function finish(event: PointerEvent) {
    if (event.pointerId !== pointer) return;
    if (moved) move(event); // Recheck the real release position; outside/invalid drops never commit.
    const item = source, target = destination, shouldWrite = moved && !!item && !!target && options.enabled();
    const preview = target && !containerDrop ? previews.value[target] : undefined;
    const nextIndex = item && preview ? preview.findIndex(node => node.id === item.id) + 1 : 0;
    const beforeId = preview && nextIndex > 0 ? preview[nextIndex]?.id : undefined;
    const changed = containerDrop ? target !== (item && options.parentOf(item)) : !!preview;
    const pendingPreview = previews.value;
    const atEnd = !containerDrop && !beforeId;
    cancel();
    if (shouldWrite && changed) {
      // 保持当前预览插槽，直到持久化与回读彻底就绪，消除松手时的瞬时回弹
      previews.value = pendingPreview;
      try { await options.commit(item!, target!, beforeId, atEnd); }
      finally { previews.value = {}; }
    } else {
      previews.value = {};
    }
  }
  function suppressClick() { return moved || Date.now() < suppressedUntil; }
  onBeforeUnmount(cancel);
  return { start, cancel, activeId, overFolder, previews, ghost, suppressClick };
}
