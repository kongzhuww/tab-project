import { reactive } from "vue";

declare const chrome: any;

export const MOTTO_STORAGE_KEY = "heroCustomMottoV1";

export interface MottoEntry {
  id: string;
  date: string;
  time: string;
  text: string;
  createdAt: number;
}

export interface MottoState {
  loaded: boolean;
  customText: string | null;
  history: MottoEntry[];
  currentIndex: number;
  menuOpen: boolean;
  menuPos: { x: number; y: number };
}

// 0毫秒极速读取本地备份，避免任何异步空白
function loadLocalSnapshot(): { customText: string | null; history: MottoEntry[] } {
  try {
    if (typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(MOTTO_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          customText: typeof parsed?.customText === "string" ? parsed.customText : null,
          history: Array.isArray(parsed?.history) ? parsed.history : []
        };
      }
    }
  } catch {}
  return { customText: null, history: [] };
}

const initialSnapshot = loadLocalSnapshot();

export const mottoState = reactive<MottoState>({
  loaded: false,
  customText: initialSnapshot.customText,
  history: initialSnapshot.history,
  currentIndex: initialSnapshot.customText && initialSnapshot.history.length
    ? initialSnapshot.history.findIndex((h) => h.text === initialSnapshot.customText)
    : -1,
  menuOpen: false,
  menuPos: { x: 0, y: 0 }
});

function storageGetChrome(key: string): Promise<any> {
  return new Promise((resolve) => {
    if (typeof chrome !== "undefined" && chrome?.storage?.local?.get) {
      chrome.storage.local.get([key], (res: any) => resolve(res?.[key]));
    } else {
      resolve(null);
    }
  });
}

function storageSetDual(key: string, value: any): Promise<void> {
  // 1. 同步写入 localStorage，永远不丢失
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch {}

  // 2. 异步持久化到 chrome.storage.local
  return new Promise((resolve) => {
    if (typeof chrome !== "undefined" && chrome?.storage?.local?.set) {
      chrome.storage.local.set({ [key]: value }, () => resolve());
    } else {
      resolve();
    }
  });
}

function formatDate(d: Date): { date: string; time: string } {
  const p = (n: number) => String(n).padStart(2, "0");
  const date = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  const time = `${p(d.getHours())}:${p(d.getMinutes())}`;
  return { date, time };
}

export const mottoController = {
  async init(): Promise<void> {
    try {
      const data = await storageGetChrome(MOTTO_STORAGE_KEY);
      if (data && typeof data === "object") {
        const chromeHistory = Array.isArray(data.history) ? data.history : [];
        // 合并 localStorage 与 chrome.storage.local 中的历史
        if (chromeHistory.length >= mottoState.history.length) {
          mottoState.history = chromeHistory;
          if (data.customText !== undefined) {
            mottoState.customText = data.customText;
          }
        }
      }
    } catch (e) {
      console.warn("[HeroMotto] Sync chrome.storage failed:", e);
    } finally {
      mottoState.loaded = true;
      if (mottoState.customText && mottoState.history.length) {
        mottoState.currentIndex = mottoState.history.findIndex(
          (h) => h.text === mottoState.customText
        );
      }
    }
  },

  async persist(): Promise<void> {
    const payload = {
      customText: mottoState.customText,
      history: mottoState.history
    };
    await storageSetDual(MOTTO_STORAGE_KEY, payload);
  },

  setCustomMotto(rawText: string) {
    const text = rawText.trim();
    if (!text) {
      this.resetToSystem();
      return;
    }

    const { date, time } = formatDate(new Date());
    mottoState.customText = text;

    // 检查历史中是否已有一模一样的内容，有则移至首位，无则新增
    const existIdx = mottoState.history.findIndex((h) => h.text === text);
    if (existIdx !== -1) {
      const item = mottoState.history.splice(existIdx, 1)[0];
      item.date = date;
      item.time = time;
      mottoState.history.unshift(item);
    } else {
      mottoState.history.unshift({
        id: `motto_${Date.now()}`,
        date,
        time,
        text,
        createdAt: Date.now()
      });
    }

    // 保留最近 50 条心情记录
    if (mottoState.history.length > 50) {
      mottoState.history = mottoState.history.slice(0, 50);
    }

    mottoState.currentIndex = 0;
    void this.persist();
  },

  selectHistory(entry: MottoEntry) {
    mottoState.customText = entry.text;
    mottoState.currentIndex = mottoState.history.findIndex((h) => h.id === entry.id);
    this.closeMenu();
    void this.persist();
  },

  resetToSystem() {
    mottoState.customText = null;
    mottoState.currentIndex = -1;
    this.closeMenu();
    void this.persist();
  },

  deleteEntry(id: string) {
    const idx = mottoState.history.findIndex((h) => h.id === id);
    if (idx !== -1) {
      mottoState.history.splice(idx, 1);
      if (mottoState.currentIndex === idx) {
        if (mottoState.history.length > 0) {
          this.selectHistory(mottoState.history[0]);
        } else {
          this.resetToSystem();
        }
      }
      void this.persist();
    }
  },

  clearHistory() {
    mottoState.history = [];
    this.resetToSystem();
  },

  stepHistory(delta: number) {
    if (!mottoState.history.length) return;
    let nextIdx = mottoState.currentIndex + delta;
    if (nextIdx < 0) {
      this.resetToSystem();
      return;
    }
    if (nextIdx >= mottoState.history.length) {
      nextIdx = 0;
    }
    this.selectHistory(mottoState.history[nextIdx]);
  },

  openMenu(x: number, y: number) {
    mottoState.menuPos = { x, y };
    mottoState.menuOpen = true;
  },

  closeMenu() {
    mottoState.menuOpen = false;
  }
};
