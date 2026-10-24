<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import { clockState, clockController } from "./store";
import { clockSettingsController } from "./settings-store";
import { fullscreenCardState } from "../core/fullscreen-cards.store";

const WK = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

function greeting(h: number): string {
  if (h < 5) return "夜深了";
  if (h < 9) return "早上好";
  if (h < 12) return "上午好";
  if (h < 14) return "中午好";
  if (h < 18) return "下午好";
  if (h < 23) return "晚上好";
  return "夜深了";
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
  const dateText = `${year}年${month}月${dayDate}日 · ${WK[weekIdx]}`;

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
    <p id="clock" class="clock" :style="{ fontFamily: clockState.fontFamily, color: clockState.colorHex }">
      {{ clockState.timeText }}<span id="secs" :style="{ color: clockState.colorHex }">{{ clockState.secsText }}</span>
    </p>
    <p id="date" class="date" :style="{ color: clockState.dateColor }">{{ clockState.dateText }}</p>
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
