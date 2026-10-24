<script setup lang="ts">
import { ref, computed, reactive, watch, nextTick, onUnmounted } from "vue";
import { useWindowDraggable } from "../core/useWindowDraggable";
import {
  pluginMarketController,
  PLUGIN_CATALOG,
  type PluginCategory
} from "./market-store";
import ChatPrivateSetup from "../chat/ChatPrivateSetup.vue";

const state = pluginMarketController.state;
const topbarHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topbar-height")) || 48;
const width = Math.min(920, Math.max(1, window.innerWidth - 40));
const { panelRef: windowRef, headerRef, initialStyle, onHeaderPointerDown, onHeaderClickCapture, restoreSavedPosition } = useWindowDraggable({
  windowId: "market",
  managed: false,
  defaultWidth: width,
  defaultHeight: Math.min(680, Math.max(260, window.innerHeight - topbarHeight - 110)),
  defaultLeft: window.innerWidth - width - 20,
  defaultTop: topbarHeight + 12,
  active: () => state.isOpen,
  onFocus: () => windowRef.value?.focus({ preventScroll: true })
});
let openVersion = 0;
watch(() => state.isOpen, async open => {
  const version = ++openVersion;
  if (!open) return;
  await nextTick();
  if (!state.isOpen || version !== openVersion) return;
  restoreSavedPosition();
  windowRef.value?.focus({ preventScroll: true });
}, { immediate: true });

const filteredPlugins = computed(() => {
  const kind = state.kindFilter;
  return PLUGIN_CATALOG.filter((plugin) => (plugin.kind || "module") === kind);
});

function handleInstall(id: string) {
  pluginMarketController.install(id);
}

function handleUninstall(id: string) {
  pluginMarketController.uninstall(id);
}

const visibleCatalog = computed(() => PLUGIN_CATALOG);
const installedCount = computed(() => visibleCatalog.value.filter(p => pluginMarketController.isInstalled(p.id)).length);
const totalCount = computed(() => visibleCatalog.value.length);

const failedIcons = reactive<Record<string, boolean>>({});
function onIconError(id: string) {
  failedIcons[id] = true;
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && state.isOpen) {
    e.preventDefault();
    e.stopPropagation();
    pluginMarketController.close();
  }
}
</script>

<template>
      <div
        v-if="state.isOpen"
        ref="windowRef"
        class="plugin-market-window"
        :style="initialStyle"
        :aria-busy="state.isSaving"
        role="dialog"
        aria-modal="false"
        aria-label="组件与模块管理"
        tabindex="-1"
        @keydown="handleKeydown"
      >
        <!-- 头部导航栏（全屏插件在左、独立模块在右，契合全局 Dock 布局；去除冗余搜索框） -->
        <header ref="headerRef" class="pm-header" @pointerdown="onHeaderPointerDown" @click.capture="onHeaderClickCapture">
          <div class="pm-header-left">
            <div class="pm-kind-tabs">
              <button
                type="button"
                class="pm-kind-tab"
                :class="{ active: state.kindFilter === 'plugin' }"
                @click="pluginMarketController.setKindFilter('plugin')"
              >
                🖥️ 全屏插件
              </button>
              <button
                type="button"
                class="pm-kind-tab"
                :class="{ active: state.kindFilter === 'module' }"
                @click="pluginMarketController.setKindFilter('module')"
              >
                🧩 独立模块
              </button>
            </div>
          </div>
          <button
            type="button"
            class="pm-close-btn"
            title="关闭 (Esc)"
            aria-label="关闭"
            @click="pluginMarketController.close()"
          >
            ✕
          </button>
        </header>

        <p v-if="state.isSaving" role="status" class="pm-operation-error">正在保存入口设置…</p>
        <p v-if="state.errorMessage" role="alert" class="pm-operation-error">{{ state.errorMessage }}</p>
        <!-- 插件卡片网格 -->
        <main class="pm-body">
          <div v-if="filteredPlugins.length === 0" class="pm-empty">
            <span class="pm-empty-icon">📦</span>
            <p>未找到匹配的模块</p>
            <small>试试其他关键词或分类筛选</small>
          </div>

          <div v-else class="pm-grid">
            <article
              v-for="item in filteredPlugins"
              :key="item.id"
              class="pm-card"
              :class="{ 'is-installed': pluginMarketController.isInstalled(item.id) }"
            >
              <div class="pm-card-top">
                <div class="pm-card-icon-box">
                  <img
                    v-if="item.icon && !failedIcons[item.id]"
                    :src="item.icon"
                    :alt="item.title"
                    class="pm-card-icon-img"
                    @error="onIconError(item.id)"
                  />
                  <span
                    v-else
                    class="pm-card-icon-emoji"
                  >{{ item.emoji || "📦" }}</span>
                </div>
                <div class="pm-card-title-col">
                  <div class="pm-card-name-row">
                    <h3 class="pm-card-title">{{ item.title }}</h3>
                    <span class="pm-card-version">{{ item.version }}</span>
                  </div>
                  <div class="pm-card-meta-row">
                    <span class="pm-card-kind-badge" :class="item.kind || 'module'">
                      {{ item.kind === 'plugin' ? '全屏插件' : '独立模块' }}
                    </span>
                    <span v-if="item.isDev" class="pm-card-dev-badge">🧪 实验性</span>
                    <span class="pm-card-cat-badge">{{ item.categoryLabel }}</span>
                    <span class="pm-card-author">by {{ item.author }}</span>
                  </div>
                </div>
              </div>

              <p class="pm-card-desc">{{ item.desc }}</p>
              <p v-if="item.devNotice" class="pm-core-tip">{{ item.devNotice }}</p>
              <details v-if="item.id === 'chat' && pluginMarketController.isInstalled(item.id)"><summary>配置私有服务器 / 加入受邀房间</summary><ChatPrivateSetup /></details>

              <div class="pm-card-tags">
                <span v-for="tag in item.tags" :key="tag" class="pm-card-tag">
                  #{{ tag }}
                </span>
              </div>

              <footer class="pm-card-footer">
                <!-- Core entries are available by default; experimental components require opt-in. -->
                <template v-if="pluginMarketController.isCorePlugin(item.id)">
                  <span class="pm-installed-pill core">✓ 核心入口默认可用</span>
                  <span class="pm-core-tip">核心预设</span>
                </template>

                <!-- 其他模块：支持自由安装与卸载 -->
                <template v-else-if="pluginMarketController.isInstalled(item.id)">
                  <span class="pm-installed-pill">✓ 已启用</span>
                  <div class="pm-footer-right">
                    <a
                      v-if="item.downloadUrl"
                      :href="item.downloadUrl"
                      target="_blank"
                      rel="noreferrer"
                      class="pm-card-download-link"
                      title="前往 GitHub Releases 下载运行时附件"
                      @click.stop
                    >
                      运行时 ↗
                    </a>
                    <button
                      type="button"
                      class="pm-btn-uninstall"
                      :disabled="state.isSaving"
                      :title="item.id === 'chat' ? '停用聊天室并停止后续同步；保留配置和历史，已提交的请求不假称撤回' : '从 Dock 隐藏入口；保留数据，不停止正在运行的窗口或服务'"
                      @click="handleUninstall(item.id)"
                    >
                      {{ item.id === "chat" ? "停用组件" : "停用入口" }}
                    </button>
                  </div>
                </template>
                <template v-else>
                  <button
                    type="button"
                    class="pm-btn-install"
                    :disabled="state.isSaving"
                    @click="handleInstall(item.id)"
                  >
                    <span v-if="item.isDev">🧪 启用实验组件</span>
                    <span v-else>启用</span>
                  </button>
                  <a
                    v-if="item.downloadUrl"
                    :href="item.downloadUrl"
                    target="_blank"
                    rel="noreferrer"
                    class="pm-card-download-link"
                    title="前往 GitHub Releases 下载运行时附件"
                    @click.stop
                  >
                    获取运行时 ↗
                  </a>
                </template>
              </footer>
            </article>
          </div>
        </main>

        <!-- 底部状态与全局操作栏 -->
        <footer class="pm-footer">
          <div class="pm-footer-stat">
            当前列表已启用 <strong>{{ installedCount }}</strong> / {{ totalCount }} 项
          </div>
          <div class="pm-footer-actions">
            <button
              type="button"
              class="pm-btn-text"
              :disabled="state.isSaving"
              title="启用全部稳定组件，不自动启用开发中组件"
              @click="pluginMarketController.installAll()"
            >
              启用全部稳定组件
            </button>
            <button
              v-if="installedCount > 0"
              type="button"
              class="pm-btn-text danger"
              :disabled="state.isSaving"
              title="停用可选入口；核心入口与旧偏好保留，不清数据、不停止服务"
              @click="pluginMarketController.uninstallAll()"
            >
              停用可选入口
            </button>
          </div>
        </footer>
      </div>
</template>
