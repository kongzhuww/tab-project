<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { introController, introState, registerFinishHandler } from "./controller";

const viewportHeight = ref(window.innerHeight);
const viewportWidth = ref(window.innerWidth);
const scanActive = ref(false);
const whiteFlash = ref(false);
const wipeWidth = ref(10);
const rootOpacity = ref(1);
const rootBlur = ref(0);
const timers = new Set<number>();
let animationFrame = 0;
let unregisterFinish = () => {};

const percentText = computed(() => `${String(Math.round(introState.renderedProgress)).padStart(2, "0")}%`);
const meterTop = computed(() => {
  const raw = introState.renderedProgress / 100 * viewportHeight.value + 10;
  return `${Math.min(raw, Math.max(0, viewportHeight.value - 102)).toFixed(1)}px`;
});
const rhineAuthText = computed(() => {
  if (introState.renderedProgress >= 75) return "START PROCESSING...";
  if (introState.renderedProgress >= 35) return "REQUEST RECEIVED";
  return "ID CONFIRMED : JOYCE MOORE";
});
const rhineCaption = computed(() => {
  if (introState.finished) return "身份验证通过 · 欢迎进入终端";
  return introState.status ? `身份信息确认 · ${introState.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE";
});
const rhineScale = computed(() => String(Math.max(0.35, Math.min(viewportWidth.value / 1920, viewportHeight.value / 1080))));

function later(callback: () => void, delay: number): void {
  const id = window.setTimeout(() => {
    timers.delete(id);
    callback();
  }, delay);
  timers.add(id);
}

function completeExit(): void {
  window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
}

function exitEndfield(forced: boolean): void {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    completeExit();
    return;
  }
  const wipeMs = forced ? 180 : 260;
  const fadeMs = forced ? 200 : 280;
  const startedAt = performance.now();
  const draw = (now: number) => {
    const elapsed = now - startedAt;
    const sweep = Math.min(1, elapsed / wipeMs);
    const eased = 1 - Math.pow(1 - sweep, 3);
    wipeWidth.value = 10 + eased * Math.max(0, viewportWidth.value - 10);
    if (elapsed > wipeMs) rootOpacity.value = Math.max(0, 1 - (elapsed - wipeMs) / fadeMs);
    if (elapsed >= wipeMs + fadeMs) {
      completeExit();
      return;
    }
    animationFrame = requestAnimationFrame(draw);
  };
  later(() => { animationFrame = requestAnimationFrame(draw); }, forced ? 60 : 120);
}

function exitRhineLab(forced: boolean): void {
  if (!forced) scanActive.value = true;
  later(() => {
    whiteFlash.value = true;
    rootBlur.value = 6;
    rootOpacity.value = 0;
    later(completeExit, 380);
  }, forced ? 40 : 420);
}

function startExit(forced: boolean): void {
  if (introState.style === "rhinelab") exitRhineLab(forced);
  else exitEndfield(forced);
}

function onResize(): void {
  viewportWidth.value = window.innerWidth;
  viewportHeight.value = window.innerHeight;
}

function onKeydown(event: KeyboardEvent): void {
  if (introState.finished) return;
  if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
    event.preventDefault();
    introController.skip("KEYBOARD SKIP");
  }
}

onMounted(() => {
  document.documentElement.style.setProperty("--rhine-scale", rhineScale.value);
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("keydown", onKeydown, true);
  unregisterFinish = registerFinishHandler(startExit);
  if (introState.finished) {
    startExit(introState.forced);
  }
});

onBeforeUnmount(() => {
  unregisterFinish();
  window.removeEventListener("resize", onResize);
  window.removeEventListener("keydown", onKeydown, true);
  cancelAnimationFrame(animationFrame);
  for (const timer of timers) clearTimeout(timer);
  timers.clear();
});
</script>

<template>
  <div
    class="intro-vue-content"
    :style="{ '--rhine-scale': rhineScale, opacity: rootOpacity, filter: `blur(${rootBlur}px)` }"
  >
    <div class="endfield-stage" aria-hidden="true">
      <div class="endfield-loader-texture"></div>
      <div class="endfield-loader-rail"></div>
      <div class="endfield-loader-fill" :style="{ height: `${introState.renderedProgress}%` }"></div>
      <div class="endfield-loader-meter" :style="{ top: meterTop }">
        <span class="endfield-loader-tick"></span>
        <b>{{ percentText }}</b>
        <small>{{ introState.status }}</small>
      </div>
      <section class="endfield-loader-brand">
        <span class="endfield-loader-kicker">DEEPSEEK HARNESS</span>
        <strong>END</strong><strong>FIELD</strong>
        <span class="endfield-loader-detail">
          <i class="endfield-loader-chevron"></i>
          <span>EDGE INTELLIGENCE THEME</span>
          <small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small>
          <span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span>
        </span>
        <em>OVER THE FRONTIER / INTO THE FRONT</em>
      </section>
      <div class="endfield-loader-wipe" :style="{ width: `${wipeWidth}px`, opacity: wipeWidth > 10 ? 1 : 0 }"></div>
    </div>

    <div class="rhinelab-stage" aria-hidden="true">
      <div class="rhine-background">
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="none">
          <g fill="none" stroke="#ffffff" stroke-width="2.5">
            <path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"/>
            <path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"/>
            <circle class="rhine-drift-circle" cx="1450" cy="648" r="346"/>
            <circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"/>
          </g>
        </svg>
      </div>
      <div class="rhine-scaler">
        <header class="rhine-brand">
          <h1>RHINE LAB</h1>
          <div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div>
          <p class="rhine-brand-os">
            <span class="rhine-brand-analysis">
              <span style="left:2px">A</span><span style="left:28px">N</span><span style="left:55px">A</span><span style="left:81px">L</span><span style="left:103px">Y</span><span style="left:129px">S</span><span style="left:154px">I</span><span style="left:166px">S</span>
            </span>
            <b>OS</b>
          </p>
        </header>
        <button class="rhine-skip" type="button" title="点击进入系统 (或按 Enter)" @click="introController.skip('ENTER SYSTEM')">ENTER SYSTEM <span>↗</span></button>
        <div class="rhine-center-group">
          <div class="rhine-logo-box">
            <svg class="rhine-logo-svg" viewBox="0 0 310 185" aria-label="Rhine Lab" role="img">
              <path class="rhine-logo-contour" d="M295 73C295 41 273 15 240 15C221 15 207 23 192 38C186 43 181 47 176 52C127 96 103 128 70 128C38 128 15 101 15 70C15 39 37 15 70 15C103 15 127 48 156 75C182 99 208 128 240 128C273 128 295 105 295 73Z" fill="none" stroke="currentColor" stroke-width="26" pathLength="1"/>
              <path class="rhine-logo-plus" d="M44 70h50M69 45v50" fill="none" stroke="currentColor" stroke-width="15"/>
              <path class="rhine-logo-minus" d="M219 70h44" fill="none" stroke="currentColor" stroke-width="15"/>
              <text class="rhine-logo-text" x="165" y="174" text-anchor="middle" font-size="16" font-weight="700" letter-spacing="22">RHINE·LAB</text>
            </svg>
          </div>
          <div class="rhine-auth-status">
            <span class="rhine-auth-dot">·</span>
            <span class="rhine-auth-text">{{ rhineAuthText }}</span>
            <i class="rhine-cursor" aria-hidden="true"></i>
          </div>
        </div>
        <div class="rhine-scan" :class="{ active: scanActive }" :hidden="!scanActive">
          <svg viewBox="0 0 1920 1080" aria-hidden="true">
            <g fill="none" stroke="#080a08" stroke-linecap="round">
              <circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5" />
              <circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5" />
              <circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2" />
              <circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"/>
              <circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"/>
              <circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"/>
            </g>
          </svg>
          <span class="rhine-scan-label">PERMISSION AUTHORIZED</span>
        </div>
        <div class="rhine-cinema-caption">{{ rhineCaption }}</div>
        <div class="rhine-powered">POWERED BY <b>RHINE LAB</b><i></i></div>
      </div>
      <div class="rhine-white" :class="{ flash: whiteFlash }" aria-hidden="true"></div>
    </div>
  </div>
</template>
