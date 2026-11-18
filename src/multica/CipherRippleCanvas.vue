<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import {
  RIPPLE,
  createGlyphField,
  createWaveField,
  type GlyphField,
  type RipplePalette,
  type WaveField,
} from './ripple-core';

const hostEl = ref<HTMLElement | null>(null);
const canvasEl = ref<HTMLCanvasElement | null>(null);

let ro: ResizeObserver | null = null;
let parentEl: HTMLElement | null = null;
let rafId = 0;
let timer = 0;
let frameWanted = false;
let drawnOnce = false;
let previous = 0;
let destroyed = false;
let width = -1;
let height = -1;
let dpr = 0;
let waves: WaveField = createWaveField(0, 0);
let field: GlyphField | null = null;

function motionReduced(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function readPalette(): RipplePalette {
  const dark = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark';
  return {
    ink: dark ? [136, 146, 159] : [132, 136, 146],
    wave: dark ? [127, 166, 255] : [59, 110, 240],
    dark,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  };
}

function wake() {
  clearTimeout(timer);
  timer = 0;
  if (destroyed || frameWanted) return;
  if (document.hidden) {
    if (!drawnOnce && canvasEl.value && canvasEl.value.width > 0) drawFrame(performance.now());
    return;
  }
  frameWanted = true;
  rafId = requestAnimationFrame(drawFrame);
}

function sleep(now: number) {
  if (destroyed || document.hidden) return;
  const period = 1000 / RIPPLE.changeRate;
  timer = window.setTimeout(wake, period - (now % period) + 1);
}

function drawFrame(now: number) {
  rafId = 0;
  frameWanted = false;
  if (destroyed || !canvasEl.value || !field) return;
  const still = motionReduced();
  waves.advance(still ? 0 : (now - previous) / 1000);
  previous = now;
  if (canvasEl.value.width > 0 && field.needsDraw(now, still)) {
    field.draw(now, readPalette(), still);
    drawnOnce = true;
  }
  if (field.busy() && !still) wake();
  else sleep(now);
}

function layout() {
  const host = hostEl.value;
  const canvas = canvasEl.value;
  if (!host || !canvas) return;
  const w = host.clientWidth;
  const h = host.clientHeight;
  const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
  if (w === width && h === height && nextDpr === dpr) return;
  const cols = Math.ceil(w / RIPPLE.cellWidth);
  const rows = Math.ceil(h / RIPPLE.cellHeight);
  width = w;
  height = h;
  dpr = nextDpr;
  canvas.width = Math.round(cols * RIPPLE.cellWidth * nextDpr);
  canvas.height = Math.round(rows * RIPPLE.cellHeight * nextDpr);
  canvas.style.width = `${cols * RIPPLE.cellWidth}px`;
  canvas.style.height = `${rows * RIPPLE.cellHeight}px`;
  field?.dispose();
  waves = createWaveField(cols, rows);
  field = createGlyphField(canvas, cols, rows, waves);
  drawnOnce = false;
}

function onPress(ev: PointerEvent) {
  if (ev.button !== 0 || motionReduced() || !canvasEl.value) return;
  const rect = canvasEl.value.getBoundingClientRect();
  const col = Math.floor((ev.clientX - rect.left) / RIPPLE.cellWidth);
  const row = Math.floor((ev.clientY - rect.top) / RIPPLE.cellHeight);
  previous = performance.now();
  waves.disturb(col, row);
  wake();
}

function onVis() {
  if (!document.hidden) {
    previous = performance.now();
    wake();
  } else {
    clearTimeout(timer);
    timer = 0;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    frameWanted = false;
  }
}

onMounted(() => {
  previous = performance.now();
  layout();
  wake();
  parentEl = hostEl.value?.parentElement || null;
  parentEl?.addEventListener('pointerdown', onPress, { passive: true });
  document.addEventListener('visibilitychange', onVis);
  if (typeof ResizeObserver === 'function' && hostEl.value) {
    ro = new ResizeObserver(() => {
      layout();
      wake();
    });
    ro.observe(hostEl.value);
  }
});

onBeforeUnmount(() => {
  destroyed = true;
  clearTimeout(timer);
  if (rafId) cancelAnimationFrame(rafId);
  ro?.disconnect();
  parentEl?.removeEventListener('pointerdown', onPress);
  document.removeEventListener('visibilitychange', onVis);
  field?.dispose();
});
</script>

<template>
  <div ref="hostEl" class="cipher-ripple-host" aria-hidden="true">
    <canvas ref="canvasEl" class="cipher-ripple-canvas" aria-hidden="true" />
  </div>
</template>

<style scoped>
.cipher-ripple-host {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  -webkit-mask-image: radial-gradient(ellipse 92% 84% at 50% 48%, rgba(0, 0, 0, .95) 25%, rgba(0, 0, 0, .35) 75%, transparent 100%);
  mask-image: radial-gradient(ellipse 92% 84% at 50% 48%, rgba(0, 0, 0, .95) 25%, rgba(0, 0, 0, .35) 75%, transparent 100%);
}
.cipher-ripple-canvas {
  display: block;
}
</style>
