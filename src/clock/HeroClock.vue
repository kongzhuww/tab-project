<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import { clockState, clockController } from "./store";
import { clockSettingsController } from "./settings-store";
import { fullscreenCardState } from "../core/fullscreen-cards.store";
import { t, currentLanguage } from "../i18n";

const WK_KEYS = [
  "clock.weekday.sun",
  "clock.weekday.mon",
  "clock.weekday.tue",
  "clock.weekday.wed",
  "clock.weekday.thu",
  "clock.weekday.fri",
  "clock.weekday.sat"
] as const;

function greeting(h: number): string {
  if (h < 5) return t("clock.greeting.lateNight");
  if (h < 9) return t("clock.greeting.morning");
  if (h < 12) return t("clock.greeting.forenoon");
  if (h < 14) return t("clock.greeting.noon");
  if (h < 18) return t("clock.greeting.afternoon");
  if (h < 23) return t("clock.greeting.evening");
  return t("clock.greeting.lateNight");
}

function getZonedDate(): Date {
  const tz = clockSettingsController.state.timezone;
  if (!tz || tz === "local") return new Date();
  try {
    const s = new Date().toLocaleString("en-US", { timeZone: tz });
    return new Date(s);
  } catch {
    return new Date();
  }
}

function tick(): void {
  const p = (n: number) => String(n).padStart(2, "0");
  const d = getZonedDate();
  const h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
  const year = d.getFullYear(), month = d.getMonth() + 1, dayDate = d.getDate(), weekIdx = d.getDay();

  const timeText = `${p(h)}:${p(m)}`;
  const secsText = `:${p(s)}`;
  const greetingText = greeting(h);
  const weekText = t(WK_KEYS[weekIdx]);
  const dateText = t("clock.datePattern", {
    year,
    month,
    day: dayDate,
    week: weekText
  });

  clockController.updateTime(timeText, secsText, greetingText, dateText);
}

function onClockContextMenu(event: MouseEvent): void {
  event.preventDefault();
  clockSettingsController.open({ clientX: event.clientX, clientY: event.clientY });
}

function onVisibilityChange(): void {
  if (document.hidden) {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  } else {
    tick();
    if (!timer) {
      timer = setInterval(tick, 1000);
    }
  }
}

let timer: ReturnType<typeof setInterval> | null = null;

// 立即运行一次保证首屏渲染有时间
clockSettingsController.initPreferences();
tick();

onMounted(() => {
  clockSettingsController.initPreferences();
  watch(currentLanguage, () => {
    tick();
  });
  if (!fullscreenCardState.activeId) {
    tick();
    timer = setInterval(tick, 1000);
  }
  document.addEventListener("visibilitychange", onVisibilityChange);
});

watch(
  () => fullscreenCardState.activeId,
  (activeCard) => {
    if (activeCard) {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    } else {
      if (!document.hidden) {
        tick();
        if (!timer) timer = setInterval(tick, 1000);
      }
    }
  }
);

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  document.removeEventListener("visibilitychange", onVisibilityChange);
});
</script>

<template>
  <div class="hero-clock-vue-container" @contextmenu="onClockContextMenu">
    <!-- 时钟与日期 -->
    <p
      id="clock"
      class="clock"
      :style="{
        fontFamily: clockState.fontFamily,
        color: clockState.colorHex,
        textShadow: clockState.colorHex === '#0f172a' ? 'none' : '0 2px 14px rgba(0, 0, 0, 0.45)'
      }"
    >
      {{ clockState.timeText }}<span id="secs" :style="{ color: clockState.colorHex }">{{ clockState.secsText }}</span>
    </p>
    <p
      id="date"
      class="date"
      :style="{
        color: clockState.dateColor,
        textShadow: clockState.dateColor === '#0f172a' ? 'none' : '0 1px 8px rgba(0, 0, 0, 0.35)'
      }"
    >
      {{ clockState.dateText }}
    </p>
  </div>
</template>

<style scoped>
.hero-clock-vue-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: default;
}

.clock {
  margin: 0;
  font-size: 72px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -2px;
  display: flex;
  align-items: baseline;
  justify-content: center;
}

#secs {
  font-size: 24px;
  opacity: 0.65;
  margin-left: 2px;
  font-weight: 500;
}

.date {
  margin: 8px 0 0;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;
  letter-spacing: 0.5px;
}
</style>
