<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { weatherState, weatherController as controller } from "./store";
import { weatherService, type WeatherCityItem } from "../services/weather.service";

const contextMenuVisible = ref(false);
const contextMenuPos = ref({ x: 0, y: 0 });
const cityInput = ref("");
const contextMenuRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

const quickCities = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"];

const citySuggestions = computed<WeatherCityItem[]>(() => {
  const q = cityInput.value.trim();
  if (!q) return [];
  return weatherService.filterCities(q, 6);
});

function openContextMenu(e?: MouseEvent): void {
  const pad = 12;
  const menuWidth = 280;
  const menuHeight = 320;
  const clientX = e?.clientX ?? (window.innerWidth / 2 - menuWidth / 2);
  const clientY = e?.clientY ?? (window.innerHeight / 2 - menuHeight / 2);
  const x = Math.max(pad, Math.min(window.innerWidth - menuWidth - pad, clientX));
  const y = Math.max(pad, Math.min(window.innerHeight - menuHeight - pad, clientY));

  contextMenuPos.value = { x, y };
  contextMenuVisible.value = true;
  cityInput.value = "";

  void nextTick(() => {
    inputRef.value?.focus();
  });
}

function closeContextMenu(): void {
  contextMenuVisible.value = false;
  cityInput.value = "";
}

async function selectCity(cityName: string): Promise<void> {
  const clean = cityName.trim();
  if (!clean) return;
  closeContextMenu();
  await weatherService.changeCity(clean);
}

function submitCity(): void {
  const q = cityInput.value.trim();
  if (!q) return;
  void selectCity(q);
}

function onGlobalPointerDown(e: PointerEvent): void {
  if (!contextMenuVisible.value) return;
  const target = e.target as HTMLElement | null;
  if (contextMenuRef.value && !contextMenuRef.value.contains(target)) {
    closeContextMenu();
  }
}

function onGlobalKeyDown(e: KeyboardEvent): void {
  if (!contextMenuVisible.value) return;
  if (e.key === "Escape") {
    e.preventDefault();
    closeContextMenu();
  }
}

onMounted(() => {
  controller.setRefreshAction(() => {
    void weatherService.loadWeather();
  });
  controller.setChangeLocationAction((e) => {
    openContextMenu(e);
  });
  void weatherService.loadWeather();

  window.addEventListener("pointerdown", onGlobalPointerDown, true);
  window.addEventListener("keydown", onGlobalKeyDown, true);
});

onUnmounted(() => {
  window.removeEventListener("pointerdown", onGlobalPointerDown, true);
  window.removeEventListener("keydown", onGlobalKeyDown, true);
});

function onWidgetClick(e: MouseEvent): void {
  const target = e.target as HTMLElement | null;
  if (target?.closest("a, button, input, .weather-location-context-menu")) return;
  controller.openForecastModal();
}

function onContextMenu(e: MouseEvent): void {
  e.preventDefault();
  openContextMenu(e);
}

function handleCloseModal(): void {
  controller.closeForecastModal();
}

function handleDialogClick(e: MouseEvent): void {
  if ((e.target as HTMLElement)?.id === "weather-forecast-dialog") {
    handleCloseModal();
  }
}
</script>

<template>
  <div class="weather-widget-container" @contextmenu="onContextMenu">
    <template v-if="weatherState.state === 'unconfigured'">
      <p class="notice">
        未设置城市。右键此处快速设置，或到 <a href="options.html">设置</a> 填写城市名（如 武汉 / Tokyo）。
      </p>
    </template>

    <template v-else-if="weatherState.state === 'loading'">
      <p class="muted small">加载中…</p>
    </template>

    <template v-else-if="weatherState.state === 'not_found'">
      <p class="notice">找不到城市「{{ weatherState.city }}」，右键可重新选择地点。</p>
    </template>

    <template v-else-if="weatherState.state === 'error'">
      <p class="notice">{{ weatherState.errorMessage || "天气加载失败，右键此处可重新选择地点。" }}</p>
    </template>

    <template v-else-if="weatherState.state === 'ready' && weatherState.data">
      <div class="wx-cur">
        <span class="wx-emoji">{{ weatherState.data.currentEmoji }}</span>
        <span class="wx-temp">{{ weatherState.data.currentTemp }}°</span>
      </div>
      <p class="wx-sub">{{ weatherState.data.subText }}</p>
      <p class="wx-rain">{{ weatherState.data.rainText }}</p>
      <div class="wx-hours">
        <div v-for="(h, idx) in weatherState.data.hours" :key="idx" class="wx-h">
          <span class="hh">{{ h.time }}</span>
          <span class="he">{{ h.emoji }}</span>
          <span class="ht">{{ h.temp }}°</span>
        </div>
      </div>
      <div class="wx-days">
        <span v-for="(d, idx) in weatherState.data.days" :key="idx">
          {{ d.label }} {{ d.emoji }} {{ d.tempRange }}
        </span>
      </div>
    </template>

    <!-- 天气未来 7 天详细预报弹窗 (WeatherForecastModal) -->
    <dialog
      id="weather-forecast-dialog"
      class="weather-forecast-dialog"
      :open="weatherState.forecastModalOpen"
      @click="handleDialogClick"
    >
      <div class="weather-forecast-shell" @click.stop>
        <header class="weather-forecast-head">
          <div class="weather-forecast-city-info">
            <span class="weather-forecast-icon">{{ weatherState.data?.currentEmoji || "🌤️" }}</span>
            <div>
              <h3 id="weather-forecast-city-title">{{ weatherState.city || weatherState.data?.cityName || "天气预报" }}</h3>
              <p class="small muted">{{ weatherState.data?.subText || "未来多日天气趋势与生活气象指数" }}</p>
            </div>
          </div>
          <div class="weather-forecast-actions">
            <button
              id="weather-forecast-refresh-btn"
              type="button"
              class="weather-forecast-btn"
              title="刷新天气数据"
              @click="controller.refresh()"
            >
              ↻ 刷新
            </button>
            <button
              id="weather-forecast-close-btn"
              type="button"
              class="weather-forecast-close"
              title="关闭"
              @click="handleCloseModal"
            >
              ✕
            </button>
          </div>
        </header>

        <!-- 生活指标网格 -->
        <div class="weather-metrics-grid" v-if="weatherState.detailInfo">
          <div class="weather-metric-item">
            <span class="metric-label">💧 相对湿度</span>
            <span class="metric-val" id="weather-forecast-humidity">{{ weatherState.detailInfo.humidity || "50%" }}</span>
          </div>
          <div class="weather-metric-item">
            <span class="metric-label">💨 风力风向</span>
            <span class="metric-val" id="weather-forecast-wind">{{ weatherState.detailInfo.wind || "微风" }}</span>
          </div>
          <div class="weather-metric-item">
            <span class="metric-label">☀️ 紫外线指数</span>
            <span class="metric-val" id="weather-forecast-uv">{{ weatherState.detailInfo.uvIndex || "中等" }}</span>
          </div>
          <div class="weather-metric-item">
            <span class="metric-label">🍃 空气质量</span>
            <span class="metric-val" id="weather-forecast-aqi">{{ weatherState.detailInfo.airQuality || "良" }}</span>
          </div>
        </div>

        <!-- 未来多日趋势卡片 -->
        <div class="weather-forecast-list" id="weather-forecast-days-list">
          <div
            v-for="(day, idx) in weatherState.forecastDays"
            :key="idx"
            class="weather-forecast-day-row forecast-day-item"
          >
            <div class="day-date-col">
              <span class="day-name">{{ day.dayName }}</span>
              <span class="day-date small muted">{{ day.date }}</span>
            </div>
            <div class="day-weather-col">
              <span class="day-emoji">{{ day.emoji }}</span>
              <span class="day-cond">{{ day.condition }}</span>
            </div>
            <div class="day-rain-col">
              <span class="rain-tag" v-if="day.rainProb > 0">☂️ {{ day.rainProb }}%</span>
              <span class="rain-tag empty" v-else>无降水</span>
            </div>
            <div class="day-temp-bar-col">
              <span class="low-temp">{{ day.lowTemp }}°</span>
              <div class="temp-track">
                <div
                  class="temp-range-fill"
                  :style="{
                    left: `${Math.max(0, Math.min(100, (day.lowTemp + 10) * 2))}%`,
                    width: `${Math.max(20, Math.min(80, (day.highTemp - day.lowTemp) * 6))}%`
                  }"
                ></div>
              </div>
              <span class="high-temp">{{ day.highTemp }}°</span>
            </div>
          </div>
        </div>
      </div>
    </dialog>

    <!-- 🌤️ 天气地点快捷右键菜单 -->
    <Teleport to="body">
      <div
        v-if="contextMenuVisible"
        ref="contextMenuRef"
        class="weather-location-context-menu"
        :style="{ left: `${contextMenuPos.x}px`, top: `${contextMenuPos.y}px` }"
        @click.stop
        @contextmenu.prevent
      >
        <div class="weather-location-head">
          <div class="weather-location-title-row">
            <span class="weather-location-title">切换天气地点</span>
            <span class="weather-location-curr-badge" :title="weatherState.city">
              <span class="weather-curr-dot"></span>
              {{ weatherState.city || "未设置" }}
            </span>
          </div>
        </div>

        <form class="weather-location-form" @submit.prevent="submitCity">
          <div class="weather-input-wrapper">
            <span class="weather-input-icon">🔍</span>
            <input
              ref="inputRef"
              class="weather-location-input"
              placeholder="输入城市名或拼音…"
              v-model="cityInput"
              @keydown.enter.prevent="submitCity"
              autocomplete="off"
            />
            <button
              v-if="cityInput"
              type="button"
              class="weather-input-clear"
              @click="cityInput = ''"
              title="清除输入"
            >✕</button>
          </div>
          <button type="submit" class="weather-location-submit">确定</button>
        </form>

        <div v-if="cityInput.trim()">
          <div class="weather-section-subtitle">匹配建议</div>
          <div class="weather-location-suggestions" v-if="citySuggestions.length">
            <button
              v-for="item in citySuggestions"
              :key="item.name + item.admin"
              type="button"
              class="weather-suggestion-item"
              @click="selectCity(item.name)"
            >
              <span class="weather-suggestion-name">{{ item.name }}</span>
              <span class="weather-suggestion-sub">{{ item.admin }}</span>
            </button>
          </div>
          <div v-else class="weather-suggestion-empty">
            未找到完全匹配城市，回车或点击「确定」直接尝试检索
          </div>
        </div>

        <div v-else>
          <div class="weather-section-subtitle">常用城市</div>
          <div class="weather-quick-chips-grid">
            <button
              v-for="c in quickCities"
              :key="c"
              type="button"
              class="weather-quick-chip"
              :class="{ active: weatherState.city === c }"
              @click="selectCity(c)"
            >
              {{ c }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.weather-widget-container {
  width: 100%;
  cursor: pointer;
}

.weather-forecast-dialog {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: var(--lw-modal-overlay, rgba(0, 0, 0, 0.72));
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  z-index: 99999;
  padding: 20px;
}

.weather-forecast-dialog:not([open]) {
  display: none;
}

.weather-forecast-shell {
  width: 100%;
  max-width: 580px;
  background: var(--card-bg, #1e293b);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
  padding: 20px;
  color: #f1f5f9;
}

.weather-forecast-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 14px;
  margin-bottom: 16px;
}

.weather-forecast-city-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.weather-forecast-icon {
  font-size: 32px;
}

.weather-forecast-city-info h3 {
  margin: 0;
  font-size: 18px;
  color: #f8fafc;
}

.weather-forecast-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.weather-forecast-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #cbd5e1;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.weather-forecast-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.weather-forecast-close {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 16px;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.weather-forecast-close:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.weather-metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 18px;
}

.weather-metric-item {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-label {
  font-size: 11px;
  color: #94a3b8;
}

.metric-val {
  font-size: 13px;
  font-weight: 600;
  color: #38bdf8;
}

.weather-forecast-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.weather-forecast-day-row {
  display: grid;
  grid-template-columns: 80px 90px 90px 1fr;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  font-size: 13px;
}

.day-date-col {
  display: flex;
  flex-direction: column;
}

.day-name {
  font-weight: 500;
  color: #f1f5f9;
}

.day-weather-col {
  display: flex;
  align-items: center;
  gap: 6px;
}

.day-emoji {
  font-size: 18px;
}

.rain-tag {
  font-size: 11px;
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.12);
  padding: 2px 6px;
  border-radius: 4px;
}

.rain-tag.empty {
  color: #64748b;
  background: transparent;
}

.day-temp-bar-col {
  display: flex;
  align-items: center;
  gap: 10px;
}

.low-temp, .high-temp {
  font-size: 12px;
  width: 24px;
  text-align: center;
  color: #94a3b8;
}

.high-temp {
  color: #f8fafc;
  font-weight: 600;
}

.temp-track {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.temp-range-fill {
  position: absolute;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, #38bdf8, #f59e0b);
  border-radius: 3px;
}
</style>
