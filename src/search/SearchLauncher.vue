<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import SearchBox from "./SearchBox.vue";
import { searchController } from "./store";

const now = ref(new Date());
const theme = ref(document.documentElement.dataset.theme || "light");
let clockTimer = 0;

const greeting = computed(() => {
  const h = now.value.getHours();
  return h >= 5 && h < 9 ? "早上好" : h >= 9 && h < 12 ? "上午好" : h >= 12 && h < 14 ? "中午好"
    : h >= 14 && h < 18 ? "下午好" : h >= 18 && h < 23 ? "晚上好" : h >= 23 || h < 5 ? "夜深了" : "你好";
});
const clock = computed(() => `${String(now.value.getHours()).padStart(2, "0")}:${String(now.value.getMinutes()).padStart(2, "0")}`);
const seconds = computed(() => `:${String(now.value.getSeconds()).padStart(2, "0")}`);
const dateText = computed(() => `${now.value.getFullYear()}年${now.value.getMonth() + 1}月${now.value.getDate()}日 · ${["周日", "周一", "周二", "周三", "周四", "周五", "周六"][now.value.getDay()]}`);

function tick(): void {
  if (!document.hidden) now.value = new Date();
}

function toggleTheme(): void {
  theme.value = theme.value === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = theme.value;
  localStorage.setItem("theme", theme.value);
}

function onKeyDown(event: KeyboardEvent): void {
  if (event.altKey && event.key.toLowerCase() === "h") {
    event.preventDefault();
    location.href = "newtab.html";
  }
}

function openHome(): void {
  location.href = "newtab.html";
}

onMounted(() => {
  clockTimer = window.setInterval(tick, 1000);
  document.addEventListener("visibilitychange", tick);
  window.addEventListener("keydown", onKeyDown);
  void nextTick(() => {
    searchController.focus();
  });
});

onUnmounted(() => {
  clearInterval(clockTimer);
  document.removeEventListener("visibilitychange", tick);
  window.removeEventListener("keydown", onKeyDown);
});
</script>

<template>
  <div class="sub-newtab-topbar">
    <button id="theme-toggle" class="sub-theme-toggle" type="button" title="切换主题" @click="toggleTheme">
      {{ theme === 'light' ? '☀' : '🌙' }}
    </button>
  </div>

  <div class="sub-newtab-center">
    <div class="hero-clock">
      <p id="greeting">{{ greeting }}</p>
      <p id="clock" class="clock">{{ clock }}<span id="secs">{{ seconds }}</span></p>
      <p id="date" class="date">{{ dateText }}</p>
    </div>

    <form id="search" class="search" @submit.prevent>
      <SearchBox />
    </form>
  </div>

  <aside class="enter-home-dock">
    <button id="enter-home-btn" class="enter-home-btn" type="button" title="进入主标签页（或按 Alt+H）" @click="openHome">
      <div class="enter-home-icon">⚡</div>
      <div class="enter-home-text">
        <span class="enter-home-title">进入主标签页</span>
        <span class="enter-home-desc">播放开屏动画 ➔</span>
      </div>
      <span class="enter-home-arrow">➔</span>
    </button>
  </aside>
</template>
