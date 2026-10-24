<template>
  <div
    v-if="state.isOpen"
    ref="menuRef"
    class="clock-context-menu"
    :style="{ left: state.x + 'px', top: state.y + 'px' }"
  >
    <div class="clock-menu-head">
      <span class="clock-menu-title">🕒 时钟个性化设置</span>
      <button class="clock-menu-close" type="button" title="关闭" @click="handleClose">✕</button>
    </div>

    <div class="clock-menu-section-title">🔤 字体样式</div>
    <div class="clock-menu-font-list">
      <button
        v-for="f in CLOCK_FONTS"
        :key="f.id"
        type="button"
        class="clock-menu-font-btn"
        :class="{ active: state.font === f.id }"
        :data-font="f.id"
        :style="{ fontFamily: f.font }"
        @click="handleSelectFont(f.id)"
      >
        <span>{{ f.label }}</span>
        <span class="clock-menu-font-preview">{{ f.sample }}</span>
      </button>
    </div>

    <div class="clock-menu-section-title">🎨 时钟颜色</div>
    <div class="clock-menu-color-row">
      <button
        v-for="c in CLOCK_COLORS"
        :key="c.id"
        type="button"
        class="clock-menu-color-chip"
        :class="{ active: state.color === c.id }"
        :data-color="c.id"
        :title="c.label"
        :style="{ background: c.hex, borderColor: c.id === 'white' ? '#cbd5e1' : undefined }"
        @click="handleSelectColor(c.id)"
      ></button>
    </div>

    <div class="clock-menu-section-title">🌐 显示时区</div>
    <div class="clock-menu-tz-list">
      <button
        v-for="tz in CLOCK_TIMEZONES"
        :key="tz.id"
        type="button"
        class="clock-menu-tz-btn"
        :class="{ active: state.timezone === tz.id }"
        :data-tz="tz.id"
        @click="handleSelectTimezone(tz.id)"
      >
        <span>{{ tz.label }}</span>
        <span class="clock-menu-tz-offset">{{ tz.offset }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  clockSettingsController,
  CLOCK_FONTS,
  CLOCK_COLORS,
  CLOCK_TIMEZONES
} from "./settings-store";

// 时钟设置菜单响应式状态
const state = clockSettingsController.state;
const menuRef = ref<HTMLElement | null>(null);

// 关闭时钟配置菜单
function handleClose() {
  clockSettingsController.close();
}

// 选择时钟字体
function handleSelectFont(fontId: string) {
  clockSettingsController.setFont(fontId);
}

// 选择时钟主色
function handleSelectColor(colorId: string) {
  clockSettingsController.setColor(colorId);
}

// 选择时区
function handleSelectTimezone(tzId: string) {
  clockSettingsController.setTimezone(tzId);
}

// 点击外部关闭
function onPointerDown(e: PointerEvent) {
  if (state.isOpen && menuRef.value && !menuRef.value.contains(e.target as Node)) {
    clockSettingsController.close();
  }
}

// 按下 Escape 键关闭
function onKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape" && state.isOpen) {
    clockSettingsController.close();
  }
}

onMounted(() => {
  clockSettingsController.setMounted(true);
  document.addEventListener("pointerdown", onPointerDown, true);
  document.addEventListener("keydown", onKeyDown, true);
});

onUnmounted(() => {
  clockSettingsController.setMounted(false);
  document.removeEventListener("pointerdown", onPointerDown, true);
  document.removeEventListener("keydown", onKeyDown, true);
});
</script>
