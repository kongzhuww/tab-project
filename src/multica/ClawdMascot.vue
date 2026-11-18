<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
  CRAB_EXTRAS,
  decideStage,
  finishStage,
  frameOffset,
  freshStage,
  levelFromActiveInfo,
  nextDecisionAt,
  switchSettles,
  takeMoment,
  cellSize,
} from './mascot-core';
import { CRAB_FRAME_MS, CRAB_GUTTER, CRAB_SHEETS, CRAB_SHEET_URLS } from './crab-assets';

const props = defineProps<{
  isRunning?: boolean;
  isThinking?: boolean;
  hasError?: boolean;
  hidden?: boolean;
}>();

const rootEl = ref<HTMLElement | null>(null);
const stripEl = ref<HTMLElement | null>(null);
const hitEl = ref<HTMLElement | null>(null);
const ready = ref(false);
const activeAnimKey = ref('idle');

const stage = freshStage(Date.now());
let wasRunning = Boolean(props.isRunning);
let unmounted = false;

function motionReduced(): boolean {
  return typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
}

function playSheetAnimation(key: string, mode: 'once' | 'loop') {
  const strip = stripEl.value;
  if (!strip) return;
  if (stage.animation) {
    stage.animation.cancel();
    stage.animation = null;
  }
  const sheet = CRAB_SHEETS[key];
  if (!sheet) return;
  if (motionReduced() && !stage.reaction) {
    strip.style.transform = frameOffset(sheet, sheet.still, CRAB_GUTTER);
    return;
  }
  strip.style.transform = '';
  const duration = sheet.frames * CRAB_FRAME_MS;
  const keyframes: Keyframe[] = [];
  for (let f = 0; f < sheet.frames; f++) {
    keyframes.push({
      offset: f / sheet.frames,
      transform: frameOffset(sheet, f, CRAB_GUTTER),
      easing: 'steps(1)',
    });
  }
  keyframes.push({
    offset: 1,
    transform: frameOffset(sheet, mode === 'loop' ? 0 : sheet.frames - 1, CRAB_GUTTER),
  });
  const anim = strip.animate(keyframes, {
    duration,
    iterations: mode === 'loop' ? Infinity : 1,
    fill: 'forwards',
  });
  stage.animation = anim;
  if (mode === 'once') {
    anim.finished.then(
      () => {
        if (unmounted || stage.animation !== anim || !stage.current || stage.current.key !== key || stage.current.done) return;
        stage.current.done = true;
        finishStage(stage, key, Date.now(), Math.random);
        stepMascot();
      },
      () => {}
    );
  }
}

function showSheet(next: { key: string; mode: 'once' | 'loop'; priority: number }, now: number) {
  const root = rootEl.value;
  const sheet = CRAB_SHEETS[next.key];
  const urls = CRAB_SHEET_URLS[next.key];
  if (!root || !sheet || !urls) return;
  const [cw, ch] = cellSize(sheet, CRAB_GUTTER);
  stage.current = { key: next.key, mode: next.mode, priority: next.priority, start: now };
  if (stage.reaction && stage.reaction.key === next.key) {
    stage.reaction.fresh = false;
  }
  const st = root.style;
  st.setProperty('--clawd-sheet', `url("${urls.body}")`);
  st.setProperty('--clawd-ink', `url("${urls.ink}")`);
  st.setProperty('--clawd-x', String(sheet.box[0]));
  st.setProperty('--clawd-y', String(sheet.box[1]));
  st.setProperty('--clawd-w', String(sheet.box[2]));
  st.setProperty('--clawd-h', String(sheet.box[3]));
  st.setProperty('--clawd-cell-w', String(cw));
  st.setProperty('--clawd-columns', '8');
  st.setProperty('--clawd-strip-h', String(ch * Math.ceil(sheet.frames / 8)));
  activeAnimKey.value = next.key;
  playSheetAnimation(next.key, next.mode);
  ready.value = true;
}

function stepMascot() {
  if (unmounted || !rootEl.value || !stripEl.value) return;
  const now = Date.now();
  if (
    stage.current &&
    stage.current.mode === 'once' &&
    !stage.current.done &&
    now - stage.current.start >= (CRAB_SHEETS[stage.current.key]?.frames || 1) * CRAB_FRAME_MS
  ) {
    stage.current.done = true;
    finishStage(stage, stage.current.key, now, Math.random);
  }
  const next = decideStage(stage, now, stage.level, {
    extras: CRAB_EXTRAS,
    extrasAllowed: !motionReduced() && (typeof document === 'undefined' || !document.hidden),
    random: Math.random,
  });
  const switching =
    !stage.current ||
    next.key !== stage.current.key ||
    Boolean(stage.reaction && stage.reaction.fresh);
  const settled = switchSettles(stage, next, now);
  if (switching && settled) {
    showSheet(next, now);
  }
  if (stage.timer) {
    clearTimeout(stage.timer);
    stage.timer = null;
  }
  const at = nextDecisionAt(
    stage,
    now,
    switching && !settled,
    (k) => (CRAB_SHEETS[k]?.frames || 1) * CRAB_FRAME_MS
  );
  if (at !== Infinity) {
    stage.timer = setTimeout(() => {
      stage.timer = null;
      stepMascot();
    }, Math.max(0, at - now));
  }
}

function onPointerDown(ev: PointerEvent) {
  if (ev.button !== 0) return;
  stage.quietSince = Date.now();
  stage.asleep = false;
  stage.press = { id: ev.pointerId, x: ev.clientX, y: ev.clientY, lifted: false };
  try {
    hitEl.value?.setPointerCapture(ev.pointerId);
  } catch {}
}

function onPointerMove(ev: PointerEvent) {
  const p = stage.press;
  if (!p || p.lifted || ev.pointerId !== p.id) return;
  if (Math.hypot(ev.clientX - p.x, ev.clientY - p.y) < 4) return;
  p.lifted = true;
  stage.clicks = [];
  stage.reaction = { key: 'drag', mode: 'loop', fresh: true };
  stepMascot();
}

function endPress(ev: PointerEvent, allowPoke: boolean) {
  const p = stage.press;
  if (!p || ev.pointerId !== p.id) return;
  const lifted = p.lifted;
  stage.press = null;
  if (lifted) {
    stage.reaction = null;
    stepMascot();
    return;
  }
  if (!allowPoke) return;
  const now = Date.now();
  if (stage.clicks.length > 0 && now - stage.clicks[stage.clicks.length - 1] > 450) {
    stage.clicks = [];
  }
  stage.clicks.push(now);
  if (stage.clicks.length >= 4) {
    stage.clicks = [];
    stage.reaction = { key: 'tickle', mode: 'once', fresh: true };
    stepMascot();
    return;
  }
  const box = hitEl.value?.getBoundingClientRect();
  const key = box && ev.clientX - box.left < box.width / 2 ? 'poke-left' : 'poke-right';
  stage.reaction = { key, mode: 'once', fresh: true };
  stepMascot();
}

function syncFromProps() {
  const now = Date.now();
  const running = Boolean(props.isRunning);
  if (wasRunning && !running) {
    takeMoment(stage, props.hasError ? 'error' : 'attention', now);
  }
  wasRunning = running;
  stage.level = levelFromActiveInfo({
    isRunning: props.isRunning,
    isThinking: props.isThinking,
    hasError: props.hasError,
  });
  stepMascot();
}

watch(
  () => [props.isRunning, props.isThinking, props.hasError],
  syncFromProps,
  { flush: 'post' }
);

function onVisibilityChange() {
  if (!document.hidden) stepMascot();
}

onMounted(() => {
  stage.level = levelFromActiveInfo({
    isRunning: props.isRunning,
    isThinking: props.isThinking,
    hasError: props.hasError,
  });
  stepMascot();
  document.addEventListener('visibilitychange', onVisibilityChange);
});

onBeforeUnmount(() => {
  unmounted = true;
  document.removeEventListener('visibilitychange', onVisibilityChange);
  if (stage.timer) clearTimeout(stage.timer);
  if (stage.animation) stage.animation.cancel();
});
</script>

<template>
  <span
    ref="rootEl"
    class="clawd-mascot"
    :class="{ ready, hidden }"
    :data-animation="activeAnimKey"
    data-testid="clawd-mascot"
    aria-hidden="true"
  >
    <span class="clawd-sprite">
      <span ref="stripEl" class="clawd-strip" />
    </span>
    <span
      ref="hitEl"
      class="clawd-hit"
      title="Claude 小宠 · 点一点打招呼 / 连点 4 次挠痒 / 长按拖动"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="endPress($event, true)"
      @pointercancel="endPress($event, false)"
      @click.stop
    />
  </span>
</template>

<style scoped>
.clawd-mascot {
  position: absolute;
  right: 12px;
  bottom: 100%;
  z-index: 8;
  width: 104px;
  height: 72px;
  pointer-events: none;
  user-select: none;
  opacity: 0;
  transition: opacity 120ms ease;
}
.clawd-mascot.ready {
  opacity: 1;
}
.clawd-mascot.hidden {
  opacity: 0 !important;
  pointer-events: none !important;
}
.clawd-sprite {
  position: absolute;
  left: calc(var(--clawd-x, 0) * 2px);
  top: calc(var(--clawd-y, 0) * 2px);
  width: calc(var(--clawd-w, 0) * 2px);
  height: calc(var(--clawd-h, 0) * 2px);
  overflow: hidden;
}
.clawd-strip {
  position: relative;
  display: block;
  width: calc(var(--clawd-cell-w, 0) * var(--clawd-columns, 8) * 2px);
  height: calc(var(--clawd-strip-h, 0) * 2px);
  background-image: var(--clawd-sheet, none);
  background-repeat: no-repeat;
  background-size: calc(var(--clawd-cell-w, 0) * var(--clawd-columns, 8) * 2px) auto;
  image-rendering: pixelated;
}
.clawd-strip::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--muted, #88929f);
  -webkit-mask: var(--clawd-ink, none) no-repeat 0 0 / 100% 100%;
  mask: var(--clawd-ink, none) no-repeat 0 0 / 100% 100%;
  image-rendering: pixelated;
}
.clawd-hit {
  position: absolute;
  left: 48px;
  top: 38px;
  width: 50px;
  height: 34px;
  pointer-events: auto;
  touch-action: none;
  cursor: grab;
}
.clawd-hit:active {
  cursor: grabbing;
}
</style>
