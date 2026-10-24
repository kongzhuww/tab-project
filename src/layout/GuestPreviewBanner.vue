<script setup lang="ts">
import { isGuestPreviewActive, guestPreviewController } from "../core/guest-preview-store";

function handleExit() {
  guestPreviewController.exit();
}
</script>

<template>
  <Transition name="guest-banner-slide">
    <aside
      v-if="isGuestPreviewActive"
      id="guest-preview-banner"
      class="guest-preview-banner"
      role="alert"
      aria-label="新用户开箱视角预览提示"
    >
      <div class="banner-content">
        <span class="preview-pulse-dot" aria-hidden="true"></span>
        <div class="banner-texts">
          <strong>👀 新用户开箱视角预览中</strong>
          <small>当前正在模拟新用户刚安装时的纯净首屏体验 · 你的真实数据已安全封存</small>
        </div>
      </div>
      <button
        type="button"
        class="btn-exit-guest"
        title="退出沙箱，原样恢复我的真实网站与数据"
        @click="handleExit"
      >
        <span>✕ 退出预览，恢复我的数据</span>
      </button>
    </aside>
  </Transition>
</template>

<style scoped>
.guest-preview-banner {
  position: fixed;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 16px 8px 18px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--panel) 92%, #38bdf8 8%);
  border: 1.5px solid rgba(56, 189, 248, 0.45);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35), 0 0 16px rgba(56, 189, 248, 0.25);
  user-select: none;
  pointer-events: auto;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  animation: bannerGlow 2.5s ease-in-out infinite alternate;
}

@keyframes bannerGlow {
  from { border-color: rgba(56, 189, 248, 0.35); }
  to { border-color: rgba(56, 189, 248, 0.75); }
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.preview-pulse-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 10px #38bdf8;
  animation: dotPulse 1.4s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes dotPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.6; }
}

.banner-texts {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.banner-texts strong {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--heading);
  letter-spacing: 0.02em;
}

.banner-texts small {
  font-size: 10px;
  color: var(--muted);
}

.btn-exit-guest {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(56, 189, 248, 0.5);
  background: rgba(56, 189, 248, 0.15);
  color: #0284c7;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

html[data-theme="dark"] .btn-exit-guest,
html[data-theme="endfield"] .btn-exit-guest {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.22);
}

.btn-exit-guest:hover {
  background: #38bdf8;
  color: #ffffff;
  transform: scale(1.03);
  box-shadow: 0 4px 14px rgba(56, 189, 248, 0.4);
}

.guest-banner-slide-enter-active,
.guest-banner-slide-leave-active {
  transition: all 0.24s cubic-bezier(0.16, 1, 0.3, 1);
}

.guest-banner-slide-enter-from,
.guest-banner-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -24px) scale(0.95);
}
</style>
