<script setup lang="ts">
import { ref, computed, reactive, watch, nextTick, onUnmounted } from "vue";
import { useWindowDraggable } from "../core/useWindowDraggable";
import {
  pluginMarketController,
  PLUGIN_CATALOG,
  type PluginCategory
} from "./market-store";
import { t } from "../i18n";

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

const failedIcons = reactive<Record<string, boolean>>({});
function onIconError(id: string) {
  failedIcons[id] = true;
}

function getItemTitle(id: string, fallback: string): string {
  const key = `market.item.${id}.title` as const;
  try {
    return t(key as any);
  } catch {
    return fallback;
  }
}

function getItemCategory(id: string, fallback: string): string {
  const key = `market.item.${id}.category` as const;
  try {
    return t(key as any);
  } catch {
    return fallback;
  }
}

function getItemAuthor(id: string, fallback: string): string {
  const key = `market.item.${id}.author` as const;
  try {
    return t(key as any);
  } catch {
    return fallback;
  }
}

function getItemDesc(id: string, fallback: string): string {
  const key = `market.item.${id}.desc` as const;
  try {
    return t(key as any);
  } catch {
    return fallback;
  }
}

function getItemDevNotice(id: string, fallback?: string): string | undefined {
  if (!fallback) return undefined;
  const key = `market.item.${id}.devNotice` as const;
  try {
    return t(key as any);
  } catch {
    return fallback;
  }
}

function getItemTags(id: string, fallback: string[]): string[] {
  const key = `market.item.${id}.tags` as const;
  try {
    const raw = t(key as any);
    if (typeof raw === "string" && raw.includes(",")) {
      return raw.split(",");
    }
    return fallback;
  } catch {
    return fallback;
  }
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
        :aria-label="t('market.dialogLabel')"
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
                {{ t('market.tab.plugins') }}
              </button>
              <button
                type="button"
                class="pm-kind-tab"
                :class="{ active: state.kindFilter === 'module' }"
                @click="pluginMarketController.setKindFilter('module')"
              >
                {{ t('market.tab.modules') }}
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
            <p>{{ t('market.empty') }}</p>
            <small>{{ t('market.emptyHint') }}</small>
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
                    :alt="getItemTitle(item.id, item.title)"
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
                    <h3 class="pm-card-title">{{ getItemTitle(item.id, item.title) }}</h3>
                    <span class="pm-card-version">{{ item.version }}</span>
                  </div>
                  <div class="pm-card-meta-row">
                    <span class="pm-card-kind-badge" :class="item.kind || 'module'">
                      {{ item.kind === 'plugin' ? t('market.pluginBadge') : t('market.moduleBadge') }}
                    </span>
                    <span v-if="item.isDev" class="pm-card-dev-badge">{{ t('market.experimentalBadge') }}</span>
                    <span class="pm-card-cat-badge">{{ getItemCategory(item.id, item.categoryLabel) }}</span>
                    <span class="pm-card-author">by {{ getItemAuthor(item.id, item.author) }}</span>
                  </div>
                </div>
              </div>

              <p class="pm-card-desc">{{ getItemDesc(item.id, item.desc) }}</p>
              <p v-if="item.devNotice" class="pm-core-tip">{{ getItemDevNotice(item.id, item.devNotice) }}</p>

              <div class="pm-card-tags">
                <span v-for="tag in getItemTags(item.id, item.tags)" :key="tag" class="pm-card-tag">
                  #{{ tag }}
                </span>
              </div>

              <footer class="pm-card-footer">
                <span class="pm-installed-pill">{{ pluginMarketController.isInstalled(item.id) ? '已开启' : '已关闭' }}</span>
                <div class="pm-footer-right">
                  <a v-if="item.downloadUrl" :href="item.downloadUrl" target="_blank" rel="noreferrer" class="pm-card-download-link" @click.stop>{{ t('market.runtime') }}</a>
                  <button type="button" class="pm-switch" :class="{ on: pluginMarketController.isInstalled(item.id) }"
                    role="switch" :aria-checked="pluginMarketController.isInstalled(item.id)" :aria-label="`${item.title}开关`"
                    :disabled="state.isSaving" @click="pluginMarketController.isInstalled(item.id) ? handleUninstall(item.id) : handleInstall(item.id)">
                    <span />
                  </button>
                </div>
              </footer>
            </article>
          </div>
        </main>

      </div>
</template>
