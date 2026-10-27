import { bilibiliService } from "../services/bilibili.service";
import { biliFavoritesState } from "./bili-favorites-store";
import { biliRadioPlayer } from "./radio-player";
import { notificationController } from "../notifications/store";

const SERIES_KEY = "biliRadioSeriesV1";
const SERIES_BACKUP_KEY = "lw_backup_bili_radio_series";
type RadioTrack = (typeof biliFavoritesState.radioQueue)[number];
let requestId = 0;
let initialized = false;

function message(error: unknown): string {
  return error instanceof Error ? error.message : "读取电台失败";
}

function normalizeTrack(raw: any): RadioTrack {
  return {
    bvid: String(raw?.bvid || ""),
    title: String(raw?.title || "未命名视频"),
    cover: String(raw?.cover || "").replace(/^http:/, "https:"),
    author: String(raw?.author || raw?.upper?.name || raw?.upper || ""),
    duration: Number(raw?.duration || 0)
  };
}

async function storageGet(keys: string[]): Promise<Record<string, unknown>> {
  if (typeof chrome !== "undefined" && chrome.storage?.local) return chrome.storage.local.get(keys);
  return {};
}

type RadioSeries = (typeof biliFavoritesState.radioSeries)[number];
async function readSavedSeries(): Promise<unknown[]> {
  const stored = await storageGet([SERIES_KEY, SERIES_BACKUP_KEY]);
  for (const key of [SERIES_KEY, SERIES_BACKUP_KEY]) {
    if (stored[key] !== undefined) {
      if (!Array.isArray(stored[key])) throw new Error("电台存储格式无效，未覆盖数据");
      return stored[key];
    }
  }
  for (const key of [SERIES_KEY, SERIES_BACKUP_KEY]) {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      let parsed: unknown;
      try { parsed = JSON.parse(raw); }
      catch { throw new Error("电台本地副本无法解析，未覆盖数据"); }
      if (!Array.isArray(parsed)) throw new Error("电台本地副本格式无效，未覆盖数据");
      return parsed;
    }
  }
  return [];
}

function normalizeSavedSeries(rawList: unknown[]): RadioSeries[] {
  return rawList.map((raw) => {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("电台系列格式无效，未覆盖数据");
    const series = raw as Record<string, unknown>;
    const rawItems = series.items == null ? [] : Array.isArray(series.items) ? series.items
      : typeof series.items === "object" ? Object.values(series.items) : null;
    if (!rawItems) throw new Error("电台曲目格式无效，未覆盖数据");
    const items = rawItems.map((item: unknown) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) throw new Error("电台曲目格式无效，未覆盖数据");
      const track = item as Record<string, unknown>;
      if (typeof track.bvid !== "string" || !track.bvid.trim()) throw new Error("电台曲目缺少视频 ID，未覆盖数据");
      const normalized = normalizeTrack(track);
      if (!Number.isFinite(normalized.duration)) throw new Error("电台曲目时长格式无效，未覆盖数据");
      return { ...track, ...normalized };
    });
    return {
      ...series,
      id: String(series.id || `series_${Math.random().toString(36).slice(2, 9)}`),
      name: String(series.name || "未命名系列"),
      count: items.length,
      items
    };
  });
}

async function persistSeries(seriesList: RadioSeries[]): Promise<void> {
  // Keep the existing protection, but never report a rejected write as successful.
  if (!seriesList.length) {
    const existing = await storageGet([SERIES_KEY]);
    const current = existing[SERIES_KEY];
    if (Array.isArray(current) && current.length) throw new Error("空列表不能覆盖现有电台系列，未保存");
  }
  const serialized = JSON.stringify(seriesList);
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    await chrome.storage.local.set({ [SERIES_KEY]: seriesList, [SERIES_BACKUP_KEY]: seriesList });
  }
  // Preserve the existing mirror keys. Errors propagate instead of pretending success.
  localStorage.setItem(SERIES_KEY, serialized);
  localStorage.setItem(SERIES_BACKUP_KEY, serialized);
}

export function playBiliRadioQueue(startIndex = 0, shuffle = false, customName?: string): void {
  const items = biliFavoritesState.radioQueue.map((item) => ({ ...item, upper: item.author }));
  if (!items.length) return;
  if (shuffle) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    startIndex = 0;
  }
  const safeIndex = Math.max(0, Math.min(items.length - 1, Number(startIndex) || 0));
  biliRadioPlayer.playQueue({
    name: customName || (shuffle ? "B站电台 · 随机" : "B站电台"),
    items,
    startIndex: safeIndex
  });
}

if (typeof window !== "undefined") {
  (window as any).playBiliRadioQueue = playBiliRadioQueue;
}

export const biliRadioController = {
  async init(): Promise<void> {
    if (!initialized) {
      initialized = true;
      try {
        // Existing primary/backup data only. An explicit empty primary stays empty.
        biliFavoritesState.radioSeries = normalizeSavedSeries(await readSavedSeries());
      } catch (error) {
        initialized = false;
        console.warn("[BiliRadio] 读取系列失败", error);
      }
    }
    await this.refresh();
  },

  /** CLI repair is storage-only: no login, seed injection or inferred remote folder. */
  async repairStoredSeries() {
    const next = normalizeSavedSeries(await readSavedSeries());
    if (next.length) await persistSeries(next);
    biliFavoritesState.radioSeries = next;
    // Do not refresh folders or start audio from a repair command.
    return {
      ok: true,
      repairedCount: next.length,
      emptySeries: next.filter(series => !series.items.length).map(series => ({ id: series.id, name: series.name })),
      message: "仅整理已存曲目结构和数量；空系列请在电台选择收藏夹、添加队列后重新保存。",
      series: next.map(series => ({ id: series.id, name: series.name, count: series.count, sampleItem: series.items[0]?.title }))
    };
  },

  async refresh(): Promise<void> {
    const currentRequest = ++requestId;
    biliFavoritesState.radioLoading = true;
    biliFavoritesState.radioError = "";
    try {
      const nav = await bilibiliService.getUserNav();
      if (!nav.isLogin) throw new Error("请先登录 B站");
      const folders = await bilibiliService.getCreatedFolders(nav.mid);
      if (currentRequest !== requestId) return;
      biliFavoritesState.radioFolders = folders.map((folder) => ({
        id: Number(folder.id), title: folder.title || "收藏夹", count: Number(folder.media_count || 0)
      }));
      const first = biliFavoritesState.radioFolders[0];
      if (first) await this.selectFolder(first.id);
      else {
        biliFavoritesState.radioActiveFolderId = 0;
        biliFavoritesState.radioVideos = [];
      }
      // Existing empty series may match the logged-in account by exact folder title only.
      void this.autoHealEmptySeries();
    } catch (error) {
      if (currentRequest === requestId) biliFavoritesState.radioError = message(error);
    } finally {
      if (currentRequest === requestId) biliFavoritesState.radioLoading = false;
    }
  },

  async autoHealEmptySeries(): Promise<void> {
    let changed = false;
    for (const s of biliFavoritesState.radioSeries) {
      if (s.count === 0 || !s.items.length) {
        const match = biliFavoritesState.radioFolders.find(
          (f) => f.title.trim().toLowerCase() === s.name.trim().toLowerCase()
        );
        if (match) {
          try {
            const res = await bilibiliService.getFolderVideos(match.id, 1, 40);
            const tracks = (res.medias || []).map((raw: any) => normalizeTrack({ ...raw, author: raw.upper?.name }));
            if (tracks.length) {
              s.items = tracks;
              s.count = tracks.length;
              changed = true;
            }
          } catch {}
        }
      }
    }
    if (changed) {
      try { await persistSeries(biliFavoritesState.radioSeries); }
      catch (error) { biliFavoritesState.radioError = `系列已补全，但保存未确认：${message(error)}`; }
    }
  },

  async selectFolder(id: number | string): Promise<void> {
    const targetId = Number(id);
    if (!biliFavoritesState.radioFolders.some((folder) => Number(folder.id) === targetId)) return;
    if (targetId === biliFavoritesState.radioActiveFolderId && biliFavoritesState.radioVideos.length > 0) {
      return;
    }

    const currentRequest = ++requestId;
    biliFavoritesState.radioActiveFolderId = targetId;
    biliFavoritesState.radioLoading = true;
    biliFavoritesState.radioError = "";
    try {
      const videos = new Map<string, RadioTrack>();
      const maxPages = 4;
      for (let page = 1; page <= maxPages; page++) {
        const result = await bilibiliService.getFolderVideos(targetId, page, 40);
        if (currentRequest !== requestId) return;
        for (const raw of result.medias || []) {
          if (raw.bvid) videos.set(raw.bvid, normalizeTrack({ ...raw, author: raw.upper?.name }));
        }
        const folderCount = biliFavoritesState.radioFolders.find((folder) => Number(folder.id) === targetId)?.count || 0;
        if (!result.medias?.length || videos.size >= Math.max(result.total, folderCount)) break;
      }
      biliFavoritesState.radioVideos = [...videos.values()];
    } catch (error) {
      if (currentRequest === requestId) biliFavoritesState.radioError = message(error);
    } finally {
      if (currentRequest === requestId) biliFavoritesState.radioLoading = false;
    }
  },

  add(track: RadioTrack): void {
    if (!track.bvid || biliFavoritesState.radioQueue.some((item) => item.bvid === track.bvid)) return;
    biliFavoritesState.radioQueue.push(normalizeTrack(track));
  },
  remove(index: number): void {
    if (Number.isInteger(index) && index >= 0 && index < biliFavoritesState.radioQueue.length) {
      biliFavoritesState.radioQueue.splice(index, 1);
    }
  },
  clear(): void { biliFavoritesState.radioQueue = []; },
  play(shuffle = false, startIndex = 0): void {
    playBiliRadioQueue(startIndex, shuffle);
  },
  playAt(index: number): void {
    if (!biliFavoritesState.radioQueue.length) return;
    const safeIdx = Math.max(0, Math.min(biliFavoritesState.radioQueue.length - 1, Number(index) || 0));
    playBiliRadioQueue(safeIdx, false);
  },
  async loadSeries(id: string): Promise<void> {
    const series = biliFavoritesState.radioSeries.find((item) => item.id === id);
    if (!series) return;
    if (!series.items.length) {
      // 智能自愈：若系列为空，尝试从同名收藏夹中快速补全
      const matchingFolder = biliFavoritesState.radioFolders.find(
        (f) => f.title.trim().toLowerCase() === series.name.trim().toLowerCase()
      );
      if (matchingFolder) {
        notificationController.fetch("哔哩哔哩电台", `正在从「${matchingFolder.title}」收藏夹自动补齐系列曲目…`);
        try {
          const result = await bilibiliService.getFolderVideos(matchingFolder.id, 1, 40);
          const tracks = (result.medias || []).map((raw: any) => normalizeTrack({ ...raw, author: raw.upper?.name }));
          if (tracks.length) {
            series.items = tracks;
            series.count = tracks.length;
            await persistSeries(biliFavoritesState.radioSeries);
          }
        } catch (error) {
          biliFavoritesState.radioError = `读取或保存补全系列失败：${message(error)}`;
          notificationController.fetch("哔哩哔哩电台", biliFavoritesState.radioError);
        }
      }
    }
    if (!series.items.length) {
      notificationController.fetch("哔哩哔哩电台", `系列「${series.name}」暂无可播放曲目，请从左侧添加后保存`);
      return;
    }
    biliFavoritesState.radioQueue = series.items.map(normalizeTrack);
    biliFavoritesState.radioSeriesName = series.name;
    notificationController.fetch("哔哩哔哩电台", `已载入系列「${series.name}」（共 ${series.count} 首）`);
  },
  async playSeries(id: string, startIndex = 0): Promise<void> {
    await this.loadSeries(id);
    const series = biliFavoritesState.radioSeries.find((item) => item.id === id);
    if (!series?.items.length) return;
    playBiliRadioQueue(startIndex, false, series.name);
  },
  async deleteSeries(id: string): Promise<void> {
    const target = biliFavoritesState.radioSeries.find((item) => item.id === id);
    const targetName = target?.name || "系列";
    const next = biliFavoritesState.radioSeries.filter((item) => item.id !== id);
    try {
      await persistSeries(next);
      biliFavoritesState.radioSeries = next;
      notificationController.fetch("哔哩哔哩电台", `已删除电台系列「${targetName}」`);
    } catch (error) {
      biliFavoritesState.radioError = `删除系列失败：${message(error)}`;
      notificationController.fetch("哔哩哔哩电台", `删除系列失败：${message(error)}`);
    }
  },
  async renameSeries(id: string, newName: string): Promise<void> {
    const title = newName.trim();
    if (!title) return;
    const target = biliFavoritesState.radioSeries.find((item) => item.id === id);
    if (!target) return;
    const oldName = target.name;
    const next = biliFavoritesState.radioSeries.map((item) => {
      if (item.id === id) {
        return { ...item, name: title };
      }
      return item;
    });
    try {
      await persistSeries(next);
      biliFavoritesState.radioSeries = next;
      if (biliFavoritesState.radioSeriesName === oldName) {
        biliFavoritesState.radioSeriesName = title;
      }
      notificationController.fetch("哔哩哔哩电台", `✓ 系列已重命名为「${title}」`);
    } catch (error) {
      biliFavoritesState.radioError = `重命名系列失败：${message(error)}`;
      notificationController.fetch("哔哩哔哩电台", `重命名系列失败：${message(error)}`);
    }
  },
  async save(name: string): Promise<void> {
    if (!biliFavoritesState.radioQueue.length) {
      notificationController.fetch("哔哩哔哩电台", "播放队列为空，请先从左侧添加视频");
      return;
    }

    const title = (name || biliFavoritesState.radioSeriesName || "").trim();
    if (!title) {
      biliFavoritesState.radioError = "保存失败：系列名称不能为空，请输入系列名称";
      notificationController.fetch("哔哩哔哩电台", "保存失败：请先输入系列名称后再保存");
      return;
    }

    const items = biliFavoritesState.radioQueue.map((item) => ({ ...item }));
    const existingIndex = biliFavoritesState.radioSeries.findIndex((item) => item.name === title);
    let next = [...biliFavoritesState.radioSeries];

    if (existingIndex >= 0) {
      const existing = next[existingIndex];
      next[existingIndex] = {
        ...existing,
        count: items.length,
        items
      };
    } else {
      next.push({
        id: `series_${Date.now()}`,
        name: title,
        count: items.length,
        items
      });
    }

    try {
      await persistSeries(next);
      biliFavoritesState.radioSeries = next;
      biliFavoritesState.radioSeriesName = "";
      notificationController.fetch(
        "哔哩哔哩电台",
        existingIndex >= 0 ? `✓ 已更新系列「${title}」（共 ${items.length} 首）` : `★ 已保存系列「${title}」（共 ${items.length} 首）`
      );
    } catch (error) {
      const errText = message(error);
      biliFavoritesState.radioError = `保存系列失败：${errText}`;
      notificationController.fetch("哔哩哔哩电台", `保存系列失败：${errText}`);
    }
  }
};

if (typeof window !== "undefined") {
  window.addEventListener("logicweaver:sync-restored", () => {
    void (async () => {
      try {
        biliFavoritesState.radioSeries = normalizeSavedSeries(await readSavedSeries());
      } catch (e) {
        console.warn("[BiliRadio] 云同步恢复系列重载失败", e);
      }
    })();
  });
}
