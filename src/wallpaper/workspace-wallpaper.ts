import { computed, onMounted, onUnmounted, ref } from 'vue';
import { readWorkspaceWallpaper, WORKSPACE_WALLPAPER_EVENT, WORKSPACE_WALLPAPER_REVISION, type WallpaperWorkspace, type WorkspaceWallpaper } from './workspace-wallpaper-store';
export { saveWorkspaceWallpaper, type WallpaperWorkspace } from './workspace-wallpaper-store';
declare const chrome: any;

export function useWorkspaceWallpaper(id: WallpaperWorkspace) {
  const value = ref<WorkspaceWallpaper>({ enabled: false, image: null, name: '' });
  const error = ref('');
  const url = ref('');
  let generation = 0;
  async function reload() {
    const current = ++generation;
    try {
      const next = await readWorkspaceWallpaper(id);
      if (current !== generation) return;
      const previousUrl = url.value;
      value.value = next;
      const blob = next.selection?.blob || next.image;
      url.value = next.enabled && blob ? URL.createObjectURL(blob) : '';
      if (previousUrl) URL.revokeObjectURL(previousUrl);
      error.value = '';
    } catch { if (current === generation) error.value = '背景读取失败'; }
  }
  const media = computed(() => {
    if (!value.value.enabled) return null;
    const selected = value.value.selection;
    if (!selected) return url.value ? { kind: 'image' as const, src: url.value } : null;
    if (selected.kind === 'web') return selected.pack ? { kind: 'web' as const, pack: selected.pack } : null;
    if (selected.kind === 'css') return selected.background ? { kind: 'css' as const, background: selected.background } : null;
    const src = url.value || selected.src;
    return src ? { kind: selected.kind, src } : null;
  });
  const style = computed(() => media.value ? { '--workspace-wallpaper-enabled': '1' } : undefined);
  function changed(event: Event) { if ((event as CustomEvent).detail === id) void reload(); }
  function storageChanged(changes: Record<string, unknown>, area: string) {
    if (area === 'local' && changes[WORKSPACE_WALLPAPER_REVISION + id]) void reload();
  }
  onMounted(() => {
    void reload();
    window.addEventListener(WORKSPACE_WALLPAPER_EVENT, changed);
    if (typeof chrome !== 'undefined') chrome.storage?.onChanged?.addListener(storageChanged);
  });
  onUnmounted(() => {
    generation++;
    window.removeEventListener(WORKSPACE_WALLPAPER_EVENT, changed);
    if (typeof chrome !== 'undefined') chrome.storage?.onChanged?.removeListener(storageChanged);
    if (url.value) URL.revokeObjectURL(url.value);
  });
  return { value, style, media, error, reload };
}
