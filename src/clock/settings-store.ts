import { reactive } from "vue";
import { clockController } from "./store";

export interface ClockFontItem {
  id: string;
  label: string;
  font: string;
  sample: string;
}

export interface ClockColorItem {
  id: string;
  label: string;
  hex: string;
}

export interface ClockTimezoneItem {
  id: string;
  label: string;
  offset: string;
}

export const CLOCK_FONTS: ClockFontItem[] = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
];

export const CLOCK_COLORS: ClockColorItem[] = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
];

export const CLOCK_TIMEZONES: ClockTimezoneItem[] = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
];

export interface ClockSettingsState {
  mounted: boolean;
  isOpen: boolean;
  x: number;
  y: number;
  font: string;
  color: string;
  timezone: string;
}

const state = reactive<ClockSettingsState>({
  mounted: false,
  isOpen: false,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});

type ClockSettingsActionCallback = (action: string, payload?: any) => void | Promise<void>;
let actionCallback: ClockSettingsActionCallback | null = null;

export const clockSettingsController = {
  state,

  setMounted(mounted: boolean) {
    state.mounted = mounted;
  },

  onAction(cb: ClockSettingsActionCallback) {
    actionCallback = cb;
  },

  dispatch(action: string, payload?: any) {
    if (actionCallback) {
      return actionCallback(action, payload);
    }
    return undefined;
  },

  open(coords?: { clientX?: number; clientY?: number; x?: number; y?: number }) {
    const menuWidth = 290;
    const menuHeight = 420;
    const winW = typeof window !== "undefined" ? window.innerWidth : 1280;
    const winH = typeof window !== "undefined" ? window.innerHeight : 800;

    const clickX = coords?.clientX ?? coords?.x ?? winW / 2;
    const clickY = coords?.clientY ?? coords?.y ?? winH / 2;

    const left = Math.max(12, Math.min(clickX - 40, winW - menuWidth - 12));
    const top = Math.max(12, Math.min(clickY + 10, winH - menuHeight - 12));

    state.x = left;
    state.y = top;
    state.isOpen = true;
    this.dispatch("open", { x: left, y: top });
  },

  close() {
    state.isOpen = false;
    this.dispatch("close");
  },

  setFont(fontId: string) {
    state.font = fontId;
    const item = CLOCK_FONTS.find((f) => f.id === fontId);
    if (item) {
      clockController.applyConfig({ fontFamily: item.font });
      try {
        localStorage.setItem("lw_clock_font", fontId);
      } catch (_) {}
    }
    this.dispatch("change", { font: fontId, color: state.color, timezone: state.timezone });
  },

  setColor(colorId: string) {
    state.color = colorId;
    const item = CLOCK_COLORS.find((c) => c.id === colorId);
    if (item) {
      clockController.applyConfig({
        colorHex: item.hex,
        greetColor: item.hex,
        dateColor: item.hex,
        isCustomColor: true
      });
      try {
        localStorage.setItem("lw_clock_color", colorId);
      } catch (_) {}
    }
    this.dispatch("change", { font: state.font, color: colorId, timezone: state.timezone });
  },

  setTimezone(tzId: string) {
    state.timezone = tzId;
    try {
      localStorage.setItem("lw_clock_tz", tzId);
    } catch (_) {}
    this.dispatch("change", { font: state.font, color: state.color, timezone: tzId });
  },

  initPreferences() {
    try {
      const savedFont = localStorage.getItem("lw_clock_font");
      if (savedFont) {
        state.font = savedFont;
        const item = CLOCK_FONTS.find((f) => f.id === savedFont);
        if (item) clockController.applyConfig({ fontFamily: item.font });
      }
      const savedColor = localStorage.getItem("lw_clock_color");
      if (savedColor) {
        state.color = savedColor;
        const item = CLOCK_COLORS.find((c) => c.id === savedColor);
        if (item) clockController.applyConfig({ colorHex: item.hex, greetColor: item.hex, dateColor: item.hex, isCustomColor: true });
      }
      const savedTz = localStorage.getItem("lw_clock_tz");
      if (savedTz) {
        state.timezone = savedTz;
      }
    } catch (_) {}
  },

  syncConfig(config: { font?: string; color?: string; timezone?: string }) {
    if (config.font) state.font = config.font;
    if (config.color) state.color = config.color;
    if (config.timezone) state.timezone = config.timezone;
  }
};
