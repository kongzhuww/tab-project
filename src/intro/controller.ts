import { readonly, reactive } from "vue";

export interface IntroController {
  update(percent: number, status?: string): void;
  finish(status?: string, forced?: boolean): void;
  skip(status?: string): void;
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
const isAnimDisabled = (() => {
  try {
    const s = localStorage.getItem("showStartupAnimation");
    const l = localStorage.getItem("logicweaverEndfieldLoader");
    return s === "0" || s === "false" || l === "0" || l === "false" || document.documentElement.classList.contains("skip-endfield-loader");
  } catch {
    return false;
  }
})();

const state = reactive<IntroState>({
  enabled: !isAnimDisabled,
  style: startupStyle === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: isAnimDisabled,
  exiting: false,
  forced: false
});

let frame = 0;
let from = 4;
let animationStartedAt = performance.now();
let animationDuration = 0;
let finishHandler: ((forced: boolean) => void) | null = null;

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

export const introState = readonly(state);
export const introController: IntroController = Object.freeze({
  update,
  finish,
  skip,
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
