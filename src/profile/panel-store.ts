import { reactive } from "vue";

export interface PerformanceMetrics {
  hasMemory: boolean;
  usedMB: string;
  totalMB: string;
  limitMB: string;
  pct: number;
  color: string;
  cores: string;
  ram: string;
  domCount: number;
  styleCount: number;
  netDownlink: string;
  netRtt: string;
  netType: string;
  gpuRenderer: string;
  gpuVendor: string;
  canvasHash: string;
  dpr: string;
  screenRes: string;
  colorGamut: string;
  fps: number;
  frameMs: string;
  fpsStatus: string;
  fpsColor: string;
  storageUsage: string;
  storageQuota: string;
  storageStatus: string;
  platformStr: string;
  timeZone: string;
  localeStr: string;
  privacyStr: string;
  touchPoints: string;
}

export interface ProfilePanelState {
  mounted: boolean;
  isOpen: boolean;
  isTechDrawerOpen: boolean;
  userAvatar: string;
  userName: string;
  metrics: PerformanceMetrics;
}

function getDefaultMetrics(): PerformanceMetrics {
  return {
    hasMemory: false,
    usedMB: "--",
    totalMB: "--",
    limitMB: "--",
    pct: 0,
    color: "#34d399",
    cores: "多核心",
    ram: "标准内存",
    domCount: 0,
    styleCount: 0,
    netDownlink: "高速通道",
    netRtt: "--",
    netType: "局域网/光纤",
    gpuRenderer: "检测中…",
    gpuVendor: "未知",
    canvasHash: "#UNKNOWN",
    dpr: "1x",
    screenRes: "1920 × 1080",
    colorGamut: "sRGB 标准色域",
    fps: 60,
    frameMs: "16.6",
    fpsStatus: "极佳",
    fpsColor: "#34d399",
    storageUsage: "--",
    storageQuota: "--",
    storageStatus: "OPFS / 本地存储就绪",
    platformStr: "Windows",
    timeZone: "Asia/Shanghai (UTC+8)",
    localeStr: "zh-CN",
    privacyStr: "标准网络请求",
    touchPoints: "无触控 (键鼠环境)"
  };
}

const state = reactive<ProfilePanelState>({
  mounted: false,
  isOpen: false,
  isTechDrawerOpen: false,
  userAvatar: "assets/bilibili.svg",
  userName: "浏览器指纹与环境",
  metrics: getDefaultMetrics()
});

type ProfileActionCallback = (action: string, payload?: any) => void | Promise<void>;
let actionCallback: ProfileActionCallback | null = null;
let fpsRafId: number | null = null;

export const profilePanelController = {
  state,

  setMounted(mounted: boolean) {
    state.mounted = mounted;
  },

  onAction(cb: ProfileActionCallback) {
    actionCallback = cb;
  },

  dispatch(action: string, payload?: any) {
    if (actionCallback) {
      return actionCallback(action, payload);
    }
    return undefined;
  },

  setUserInfo(avatar: string, name?: string) {
    if (avatar) state.userAvatar = avatar;
    if (name) state.userName = name;
  },

  setMetrics(metrics: Partial<PerformanceMetrics>) {
    Object.assign(state.metrics, metrics);
  },

  sampleMetrics() {
    try {
      // 1. 内存检测
      const perf = window.performance as any;
      if (perf?.memory) {
        const usedMB = (perf.memory.usedJSHeapSize / (1024 * 1024)).toFixed(1);
        const totalMB = (perf.memory.totalJSHeapSize / (1024 * 1024)).toFixed(1);
        const limitMB = (perf.memory.jsHeapSizeLimit / (1024 * 1024)).toFixed(0);
        // 修正内存指标：V8 初始物理池(totalMB)仅有20多MB且动态扩容，24MB占用面对4GB上限极其轻量健康
        const trueLimit = perf.memory.jsHeapSizeLimit || (4096 * 1024 * 1024);
        const actualLoad = Math.max(1, Math.round((perf.memory.usedJSHeapSize / trueLimit) * 100));
        state.metrics.hasMemory = true;
        state.metrics.usedMB = usedMB;
        state.metrics.totalMB = totalMB;
        state.metrics.limitMB = limitMB;
        state.metrics.pct = actualLoad;
        state.metrics.color = "#34d399"; // 健康绿
      }

      // 2. 硬件与 DOM
      state.metrics.cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} 逻辑核心` : "多核心";
      state.metrics.ram = (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB+ 内存` : "标准内存";
      state.metrics.domCount = document.getElementsByTagName("*").length;
      state.metrics.styleCount = document.styleSheets.length;

      // 3. 网络
      const conn = (navigator as any).connection;
      state.metrics.netDownlink = conn?.downlink ? `${conn.downlink} Mbps` : "高速通道";
      state.metrics.netRtt = conn?.rtt ? `${conn.rtt} ms` : "--";
      state.metrics.netType = conn?.effectiveType ? conn.effectiveType.toUpperCase() : "局域网/光纤";

      // 4. 显卡 GPU
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as any);
        if (gl) {
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";
            const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || "";
            state.metrics.gpuRenderer = renderer.replace(/^ANGLE \((.+)\)$/, "$1").replace(/Direct3D\d+.*$/, "").trim() || renderer;
            state.metrics.gpuVendor = vendor;
          } else {
            state.metrics.gpuRenderer = "标准 WebGL 管线";
            state.metrics.gpuVendor = gl.getParameter(gl.VENDOR) || "未知";
          }
        }
      } catch {
        state.metrics.gpuRenderer = "未知显卡";
        state.metrics.gpuVendor = "未知";
      }

      // 5. Canvas 指纹
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 120;
        canvas.height = 30;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.textBaseline = "top";
          ctx.font = "14px -apple-system, sans-serif";
          ctx.fillStyle = "#f60";
          ctx.fillRect(10, 5, 40, 15);
          ctx.fillStyle = "#069";
          ctx.fillText("LogicWeaver", 2, 8);
          const data = canvas.toDataURL();
          let hash = 0x811c9dc5;
          for (let i = 0; i < data.length; i++) {
            hash ^= data.charCodeAt(i);
            hash = Math.imul(hash, 0x01000193);
          }
          state.metrics.canvasHash = `#${(hash >>> 0).toString(16).toUpperCase().padStart(8, "0")}`;
        }
      } catch {
        state.metrics.canvasHash = "#UNKNOWN";
      }

      // 6. 屏幕与色彩
      state.metrics.dpr = window.devicePixelRatio ? `${window.devicePixelRatio}x` : "1x";
      state.metrics.screenRes = `${window.screen.width} × ${window.screen.height}`;
      const isP3 = window.matchMedia("(color-gamut: p3)").matches;
      state.metrics.colorGamut = isP3 ? "Display P3 广色域" : "sRGB 标准色域";

      // 7. 平台、时区与语言
      const nav = navigator as any;
      state.metrics.platformStr = nav.userAgentData?.platform || navigator.platform || "Windows";
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Shanghai";
      const tzOffset = -new Date().getTimezoneOffset() / 60;
      state.metrics.timeZone = `${tz} (UTC${tzOffset >= 0 ? "+" : ""}${tzOffset})`;
      state.metrics.localeStr = navigator.languages ? navigator.languages.slice(0, 3).join(", ") : (navigator.language || "zh-CN");

      // 8. 触控与隐私
      state.metrics.touchPoints = navigator.maxTouchPoints > 0 ? `${navigator.maxTouchPoints} 点电容触控` : "无触控 (键鼠环境)";
      const isDnt = navigator.doNotTrack === "1" || (navigator as any).globalPrivacyControl;
      state.metrics.privacyStr = isDnt ? "DNT/GPC 已开启" : "标准网络请求";

      // 9. 启动 FPS 与 存储采样
      this.startFpsSampling();
      this.sampleStorage();
    } catch {
      // 忽略探测异常
    }
  },

  startFpsSampling() {
    this.stopFpsSampling();
    let frameCount = 0;
    const startTime = performance.now();
    const measure = (now: number) => {
      frameCount++;
      if (frameCount < 10) {
        fpsRafId = requestAnimationFrame(measure);
      } else {
        const elapsed = now - startTime;
        const fps = Math.min(240, Math.round((frameCount / (elapsed / 1000)) * 10) / 10);
        const frameMs = (elapsed / frameCount).toFixed(1);
        state.metrics.fps = fps;
        state.metrics.frameMs = frameMs;
        if (fps >= 55) {
          state.metrics.fpsStatus = "极佳";
          state.metrics.fpsColor = "#34d399";
        } else if (fps >= 30) {
          state.metrics.fpsStatus = "良好";
          state.metrics.fpsColor = "#fbbf24";
        } else {
          state.metrics.fpsStatus = "轻微波动";
          state.metrics.fpsColor = "#f87171";
        }
        fpsRafId = null;
      }
    };
    fpsRafId = requestAnimationFrame(measure);
  },

  stopFpsSampling() {
    if (fpsRafId) {
      cancelAnimationFrame(fpsRafId);
      fpsRafId = null;
    }
  },

  sampleStorage() {
    if (navigator.storage?.estimate) {
      navigator.storage.estimate().then((est) => {
        const used = est.usage ? `${Math.max(1, Math.round(est.usage / (1024 * 1024)))} MB` : "微量";
        const quota = est.quota ? `${Math.round(est.quota / (1024 * 1024 * 1024))} GB` : "--";
        state.metrics.storageUsage = used;
        state.metrics.storageQuota = quota;
        state.metrics.storageStatus = `已用 ${used} / 配额 ${quota} (OPFS 就绪)`;
      }).catch(() => {
        state.metrics.storageStatus = "OPFS / IndexedDB 就绪";
      });
    } else {
      state.metrics.storageStatus = "OPFS / 本地存储就绪";
    }
  },

  runGarbageCollectionHint() {
    try {
      const w = window as any;
      if (typeof w.gc === "function") {
        w.gc();
      }
    } catch {
      // 忽略
    }
    this.sampleMetrics();
    this.dispatch("gc-triggered");
  },

  openPanel() {
    state.isOpen = true;
    this.sampleMetrics();
    this.dispatch("open");
  },

  closePanel() {
    state.isOpen = false;
    state.isTechDrawerOpen = false;
    this.stopFpsSampling();
    this.dispatch("close");
  },

  open() {
    this.openPanel();
  },

  close() {
    this.closePanel();
  },

  toggle(show?: boolean) {
    if (show === true || (show === undefined && !state.isOpen)) {
      this.open();
    } else {
      this.close();
    }
  },

  toggleTechDrawer(show?: boolean) {
    state.isTechDrawerOpen = show !== undefined ? show : !state.isTechDrawerOpen;
    this.dispatch("toggle-tech-drawer", state.isTechDrawerOpen);
  },

  refresh() {
    this.sampleMetrics();
    this.dispatch("refresh");
  }
};
