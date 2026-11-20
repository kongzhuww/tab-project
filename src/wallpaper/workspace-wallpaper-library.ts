import { backgroundDbGet, DEFAULT_MOUNTAIN_VALUE, WallpaperService, type WallpaperHistoryItem } from '../services/wallpaper.service';
import { loadCachedWorkshopItems, getSavedWorkshopDirectoryHandle, scanWorkshopDirectory, verifyDirectoryPermission, type WorkshopItemInfo } from './workshop-scanner';
import { loadWorkshopWallpaperPack } from './workshop-applier';
import type { WorkspaceWallpaperSelection } from './workspace-wallpaper-store';

export interface WorkspaceWallpaperOption { id: string; title: string; kind: string; unavailable?: boolean; history?: WallpaperHistoryItem; workshop?: WorkshopItemInfo; builtin?: 'mountain' }

export async function loadWorkspaceWallpaperOptions(rescan = false): Promise<WorkspaceWallpaperOption[]> {
  const builtin: WorkspaceWallpaperOption[] = [
    { id: 'builtin-mountain', title: '默认山景', kind: '内置', builtin: 'mountain' },
  ];
  const { history } = await WallpaperService.loadHistory();
  let workshop = await loadCachedWorkshopItems();
  if (rescan || !workshop.length) {
    const root = await getSavedWorkshopDirectoryHandle();
    if (root && await verifyDirectoryPermission(root, rescan)) workshop = await scanWorkshopDirectory(root);
  }
  const linked = workshop.map(item => ({ id: `workshop:${item.id}`, title: item.title, kind: item.type === 'video' ? '工坊视频' : item.type === 'web' ? '工坊网页' : '暂不支持', unavailable: item.type !== 'video' && item.type !== 'web', workshop: item }));
  const linkedIds = new Set(workshop.map(item => item.id));
  const saved = history.filter(item => !item.value?.workshopId).map(item => ({ id: `history:${item.id}`, title: item.title || '未命名壁纸', kind: item.kind || '壁纸库', history: item }));
  for (const item of history) {
    const id = item.value?.workshopId;
    const type = item.value?.type;
    if (id && !linkedIds.has(String(id)) && (type === 'video' || type === 'web')) {
      linked.push({ id: `workshop:${id}`, title: item.title || '工坊壁纸', kind: type === 'video' ? '工坊视频' : '工坊网页', unavailable: false, workshop: { id: String(id), title: item.title || '工坊壁纸', type, entryFile: item.value.entry } });
      linkedIds.add(String(id));
    }
  }
  return [...builtin, ...saved, ...linked];
}

export async function resolveWorkspaceWallpaper(option: WorkspaceWallpaperOption): Promise<WorkspaceWallpaperSelection> {
  const sourceId = option.id;
  if (option.builtin === 'mountain') return { sourceId, kind: 'image', src: DEFAULT_MOUNTAIN_VALUE };
  if (option.workshop) {
    const pack = await loadWorkshopWallpaperPack(option.workshop);
    if (pack.type === 'video') {
      const video = pack.files.find(file => file.path === pack.entry) || pack.files.find(file => /^video\//.test(file.file.type) || /\.(mp4|webm|mkv|mov)$/i.test(file.path));
      if (!video) throw new Error('未找到壁纸视频文件');
      return { sourceId, kind: 'video', blob: video.file };
    }
    return { sourceId, kind: 'web', pack };
  }
  const value = option.history?.value;
  if (typeof value === 'string') return { sourceId, kind: 'image', src: value };
  if (value?.type === 'style' && typeof value.style === 'string') return { sourceId, kind: 'css', background: value.style.replace(/^\s*background\s*:\s*/i, '').replace(/;\s*$/, '') };
  if (value?.type === 'db') {
    const file = await backgroundDbGet(value.storageKey);
    if (!(file instanceof Blob)) throw new Error('壁纸文件未找到，请在壁纸库重新添加');
    return { sourceId, kind: /^video\//i.test(file.type) || /\.(mp4|webm|mov)$/i.test((file as File).name || '') ? 'video' : 'image', blob: file };
  }
  throw new Error('这款壁纸暂不支持作为工作区背景');
}
