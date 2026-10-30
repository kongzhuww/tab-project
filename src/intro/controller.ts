import { readonly, reactive, createApp } from "vue";

export interface IntroController {
  update(percent: number, status?: string): void;
  finish(status?: string, forced?: boolean): void;
  skip(status?: string): void;
  notifyBootReady(): void;
  playIntro(options?: { style?: "endfield" | "rhinelab"; force?: boolean }): Promise<void>;
  readonly enabled: boolean;
  readonly finished: boolean;
}

interface IntroState {
  enabled: boolean;
  style: "endfield" | "rhinelab";
  renderedProgress: number;
  targetProgress: number;
  status: string;
  finished: boolean;
  exiting: boolean;
  forced: boolean;
}

const startupStyle = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield";
// 默认不启用：只有显式为 "1" 或 "true" 才启用开屏动画
const isAnimEnabled = (() => {
  try {
    const s = localStorage.getItem("showStartupAnimation");
    const l = localStorage.getItem("logicweaverEndfieldLoader");
    return (s === "1" || s === "true" || l === "1" || l === "true") &&
      !document.documentElement.classList.contains("skip-endfield-loader");
  } catch {
    return false;
  }
})();

const state = reactive<IntroState>({
  enabled: isAnimEnabled,
  style: startupStyle === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !isAnimEnabled,
  exiting: false,
  forced: false
});

let frame = 0;
let from = 4;
let animationStartedAt = performance.now();
let animationDuration = 0;
let finishHandler: ((forced: boolean) => void) | null = null;
let sequenceStarted = false;
let bootReady = false;

function paint(now: number): void {
  const elapsed = now - animationStartedAt;
  const ratio = animationDuration ? Math.min(1, elapsed / animationDuration) : 1;
  const eased = ratio * ratio * (3 - 2 * ratio);
  state.renderedProgress = from + (state.targetProgress - from) * eased;
  if (ratio < 1 && !state.finished) frame = requestAnimationFrame(paint);
  else frame = 0;
}

function update(percent: number, status?: string): void {
  if (!state.enabled || state.finished) return;
  const value = Math.max(state.targetProgress, Math.max(4, Math.min(100, Number(percent) || 4)));
  if (status) state.status = status;
  from = state.renderedProgress;
  state.targetProgress = value;
  animationStartedAt = performance.now();
  animationDuration = Math.max(280, Math.min(920, 220 + Math.abs(value - from) * 7.5));
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(paint);
}

function finish(status = "Ready", forced = false): void {
  if (state.finished) return;
  state.finished = true;
  state.forced = forced;
  state.status = status;
  state.targetProgress = 100;
  cancelAnimationFrame(frame);
  frame = 0;
  state.renderedProgress = 100;
  finishHandler?.(forced);
}

function skip(status = "KEYBOARD SKIP"): void {
  finish(status, true);
}

function notifyBootReady(): void {
  bootReady = true;
  if (!state.enabled) {
    finish("BOOT COMPLETE", true);
  }
}

/**
 * 完整演播序列 (展示完全再进入)：
 * 阶段 1 (0ms ~ 380ms): 4% -> 38% 核心初始化
 * 阶段 2 (380ms ~ 880ms): 38% -> 76% 运行时装配
 * 阶段 3 (880ms ~ 1350ms): 76% -> 100% 满格就绪
 * 阶段 4 (1350ms ~ 1650ms): 100% 满格状态饱满定格 300ms 完整展示 Logo 与动效
 * 阶段 5 (1650ms): 触发平滑擦除退出并通知进入首页
 */
export function startIntroSequence(): void {
  if (!state.enabled || state.finished || sequenceStarted) return;
  sequenceStarted = true;

  update(38, "INITIALIZING CORE SHELL...");

  setTimeout(() => {
    if (state.finished) return;
    update(76, "SYNTHESIZING RUNTIME...");
  }, 400);

  setTimeout(() => {
    if (state.finished) return;
    update(100, state.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900);

  setTimeout(() => {
    if (state.finished) return;
    finish("BOOT COMPLETE / 首页就绪", false);
  }, 1650);
}

if (isAnimEnabled) {
  startIntroSequence();
}

export const introState = readonly(state);
export const introController: IntroController = Object.freeze({
  update,
  finish,
  skip,
  notifyBootReady,
  async playIntro(options?: { style?: "endfield" | "rhinelab"; force?: boolean }) {
    if (options?.style) (state as any).style = options.style;
    if (typeof document !== "undefined") {
      document.documentElement.dataset.startupStyle = state.style;
      document.documentElement.classList.remove("skip-endfield-loader");
      document.body.classList.add("is-starting");
    }
    state.enabled = true;
    state.finished = false;
    state.forced = Boolean(options?.force);
    state.renderedProgress = 4;
    state.targetProgress = 4;
    sequenceStarted = false;

    // 检查是否有现有 DOM 节点；若已进入新标签页，动态创建全屏容器以供预览
    if (typeof document !== "undefined") {
      let mountEl = document.getElementById("endfield-loader");
      if (!mountEl) {
        mountEl = document.createElement("div");
        mountEl.id = "endfield-loader";
        mountEl.className = "endfield-loader notranslate";
        document.body.appendChild(mountEl);

        const { default: IntroComp } = await import("./IntroAnimation.vue");
        const app = createApp(IntroComp);
        const onComplete = () => {
          window.removeEventListener("logicweaver:intro-complete", onComplete);
          app.unmount();
          mountEl?.remove();
          document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", onComplete, { once: true });
        app.mount(mountEl);
      }
    }

    startIntroSequence();
  },
  get enabled() { return state.enabled; },
  get finished() { return state.finished; }
});

export function registerFinishHandler(handler: (forced: boolean) => void): () => void {
  finishHandler = handler;
  if (state.finished) {
    handler(state.forced);
  }
  return () => {
    if (finishHandler === handler) finishHandler = null;
  };
}
