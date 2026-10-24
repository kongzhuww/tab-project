<template>
  <div class="vue-profile-panel-wrapper">
    <!-- 纯粹标签页智能聚合面板 -->
    <section
      v-if="state.isOpen"
      id="bili-message-panel"
      class="bili-message-panel my-info-panel"
      :style="{ zIndex: 99999 }"
    >
      <header>
        <div class="bili-message-account">
          <img id="bili-message-avatar" :src="state.userAvatar" alt="用户头像" referrerpolicy="no-referrer" />
          <h2 id="bili-message-user">{{ state.userName }}</h2>
        </div>
        <span class="grow"></span>
        <button id="bili-message-refresh" type="button" title="刷新标签页" @click="handleRefresh">↻</button>
        <button
          id="bili-message-close"
          class="panel-header-close-btn"
          type="button"
          title="关闭面板"
          @click.stop.prevent="handleClose"
        >
          ✕
        </button>
      </header>

      <!-- 纯粹聚合列表：全网网站通用算法自适应分类 -->
      <div class="tab-manager-body">
        <div v-if="tabLoading" class="tab-status-box muted small">
          <span>正在读取打开的标签页…</span>
        </div>
        <div v-else-if="flatTabs.length === 0" class="tab-status-box muted small">
          <span>暂无打开的标签页</span>
        </div>
        <div v-else class="tab-group-container">
          <div v-for="grp in domainGroups" :key="grp.domain" class="tab-group-block">
            <div class="tab-group-header" @click="toggleDomainCollapse(grp.domain)">
              <span class="grp-toggle-arrow">{{ isDomainCollapsed(grp.domain) ? '▶' : '▼' }}</span>
              <img
                v-if="grp.favIconUrl && !grp.favIconUrl.startsWith('chrome://')"
                :src="grp.favIconUrl"
                class="grp-favicon"
                alt=""
                loading="lazy"
                @error="($event.target as HTMLElement).style.display = 'none'"
              />
              <span v-else class="grp-favicon-fallback">🌐</span>
              <strong class="grp-domain-title">{{ grp.domainTitle }}</strong>
              <small class="grp-domain-sub" v-if="grp.domain !== 'tab-project' && grp.domain !== grp.domainTitle">
                ({{ grp.domain }})
              </small>
              <span class="grp-count-badge">{{ grp.tabs.length }}</span>
            </div>

            <div v-if="!isDomainCollapsed(grp.domain)" class="tab-group-items">
              <div
                v-for="t in grp.tabs"
                :key="t.id"
                class="tab-tree-row"
                :class="{ 'is-active-tab': t.active }"
                :title="`${t.title}\n${t.url}`"
                @click="handleSwitchTab(t)"
              >
                <img
                  v-if="t.favIconUrl && !t.favIconUrl.startsWith('chrome://')"
                  :src="t.favIconUrl"
                  class="tab-favicon"
                  alt=""
                  loading="lazy"
                  @error="($event.target as HTMLElement).style.display = 'none'"
                />
                <span v-else class="tab-favicon-fallback">🌐</span>
                <span class="tab-title-text">{{ t.title || "未命名网页" }}</span>
                <span v-if="t.active" class="tab-current-pill">当前</span>
                <button
                  type="button"
                  class="tab-close-btn"
                  title="关闭此标签页"
                  @click.stop="handleCloseTab(t.id)"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { profilePanelController } from "./panel-store";

const state = profilePanelController.state;
const tabLoading = ref(false);
const flatTabs = ref<any[]>([]);

// 域名折叠状态
const collapsedDomains = ref<Set<string>>(new Set());

function isDomainCollapsed(domain: string): boolean {
  return collapsedDomains.value.has(domain);
}

function toggleDomainCollapse(domain: string) {
  if (collapsedDomains.value.has(domain)) {
    collapsedDomains.value.delete(domain);
  } else {
    collapsedDomains.value.add(domain);
  }
}

// 域名智能聚合计算
interface DomainGroup {
  domain: string;
  domainTitle: string;
  favIconUrl: string;
  tabs: any[];
}

const KNOWN_SECOND_LEVEL_TLDS = new Set([
  "com.cn", "org.cn", "net.cn", "gov.cn", "edu.cn",
  "co.uk", "org.uk", "gov.uk", "ac.uk",
  "co.jp", "ne.jp", "ac.jp", "go.jp",
  "com.hk", "org.hk", "edu.hk",
  "com.tw", "org.tw", "club.tw"
]);

function parseDomain(urlStr: string, firstTabTitle = ""): { domain: string; title: string; favIcon?: string } {
  try {
    const u = new URL(urlStr);
    const host = u.hostname.toLowerCase();
    const protocol = u.protocol;

    if (protocol.includes("extension")) {
      return {
        domain: "tab-project",
        title: "tab-project 新标签页",
        favIcon: "assets/bilibili.svg"
      };
    }

    if (host === "localhost" || host === "127.0.0.1" || /^192\.168\./.test(host) || /^10\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host)) {
      return { domain: host, title: `局域网服务 (${host})` };
    }

    const parts = host.split(".");
    let rootDomain = host;
    if (parts.length >= 3) {
      const lastTwo = `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
      if (KNOWN_SECOND_LEVEL_TLDS.has(lastTwo)) {
        rootDomain = `${parts[parts.length - 3]}.${lastTwo}`;
      } else {
        rootDomain = `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
      }
    } else {
      rootDomain = host;
    }

    let brandTitle = "";
    if (rootDomain === "bilibili.com") brandTitle = "哔哩哔哩 (Bilibili)";
    else if (rootDomain === "github.com") brandTitle = "GitHub 开发者";
    else if (rootDomain === "youtube.com" || rootDomain === "youtu.be") brandTitle = "YouTube 视界";
    else if (rootDomain === "google.com") brandTitle = "Google 搜索与云";
    else if (rootDomain === "zhihu.com") brandTitle = "知乎";
    else if (rootDomain === "v2ex.com") brandTitle = "V2EX 社区";
    else {
      if (firstTabTitle) {
        const splitMatches = firstTabTitle.split(/[\-_|_—|•]/);
        if (splitMatches.length > 1) {
          const suffix = splitMatches[splitMatches.length - 1].trim();
          if (suffix.length >= 2 && suffix.length <= 15) {
            brandTitle = suffix;
          }
        }
      }
      if (!brandTitle) {
        const mainPart = rootDomain.split(".")[0];
        brandTitle = mainPart.charAt(0).toUpperCase() + mainPart.slice(1);
      }
    }

    return { domain: rootDomain, title: brandTitle };
  } catch {
    return { domain: "other", title: "其它网页" };
  }
}

const domainGroups = computed<DomainGroup[]>(() => {
  const tabs = flatTabs.value;
  const grpMap = new Map<string, DomainGroup>();

  for (const t of tabs) {
    const { domain, title, favIcon } = parseDomain(t.url || "", t.title || "");
    if (!grpMap.has(domain)) {
      grpMap.set(domain, {
        domain,
        domainTitle: title,
        favIconUrl: favIcon || t.favIconUrl || "",
        tabs: []
      });
    }
    grpMap.get(domain)!.tabs.push(t);
  }

  return Array.from(grpMap.values()).sort((a, b) => b.tabs.length - a.tabs.length);
});

async function loadOpenTabs() {
  if (typeof chrome === "undefined" || !chrome.tabs?.query) {
    flatTabs.value = [
      { id: 1, title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili", url: "https://www.bilibili.com", favIconUrl: "https://www.bilibili.com/favicon.ico", active: false },
      { id: 2, title: "Rewrite-番剧-全集-高清独家在线观看-bilibili", url: "https://www.bilibili.com/bangumi/play/ep...", favIconUrl: "https://www.bilibili.com/favicon.ico", active: true }
    ];
    return;
  }
  tabLoading.value = true;
  try {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    flatTabs.value = tabs || [];
  } catch {
    flatTabs.value = [];
  } finally {
    tabLoading.value = false;
  }
}

function handleSwitchTab(tab: any) {
  if (typeof chrome !== "undefined" && chrome.tabs?.update && tab?.id) {
    chrome.tabs.update(tab.id, { active: true });
    if (tab.windowId && chrome.windows?.update) {
      chrome.windows.update(tab.windowId, { focused: true });
    }
  }
}

function handleCloseTab(tabId: number) {
  if (typeof chrome !== "undefined" && chrome.tabs?.remove && tabId) {
    chrome.tabs.remove(tabId).then(() => {
      flatTabs.value = flatTabs.value.filter((t) => t.id !== tabId);
    });
  } else {
    flatTabs.value = flatTabs.value.filter((t) => t.id !== tabId);
  }
}

watch(
  () => state.isOpen,
  (open) => {
    if (open) {
      void loadOpenTabs();
    }
  },
  { immediate: true }
);

onMounted(() => profilePanelController.setMounted(true));
onUnmounted(() => {
  profilePanelController.setMounted(false);
});

function handleRefresh() {
  void loadOpenTabs();
}

function handleClose() {
  profilePanelController.closePanel();
}
</script>

<style scoped>
.tab-manager-body {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  overflow: hidden;
  background: var(--panel);
}

.tab-group-container::-webkit-scrollbar {
  width: 5px;
}
.tab-group-container::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}
.tab-group-container {
  flex: 1;
  overflow-y: auto;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.tab-group-block {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}
.tab-group-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  background: rgba(0, 0, 0, 0.02);
  cursor: pointer;
  user-select: none;
}
.tab-group-header:hover {
  background: var(--surface-hover);
}
.grp-toggle-arrow {
  font-size: 10px;
  color: var(--dim);
  width: 14px;
  text-align: center;
}
.grp-favicon {
  width: 14px;
  height: 14px;
  object-fit: contain;
}
.grp-domain-title {
  font-size: 12px;
  color: var(--heading);
}
.grp-domain-sub {
  font-size: 10.5px;
  color: var(--dim);
}
.grp-count-badge {
  font-size: 9.5px;
  background: var(--panel);
  border: 1px solid var(--border);
  color: var(--muted);
  padding: 1px 6px;
  border-radius: 999px;
  margin-left: 4px;
}

.tab-group-items {
  padding: 2px 4px 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tab-status-box {
  padding: 24px;
  text-align: center;
  color: var(--muted);
}

.tab-tree-row {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  transition: background 0.12s ease;
  min-width: 0;
}
.tab-tree-row:hover {
  background: var(--surface-hover);
}
.tab-tree-row.is-active-tab {
  background: rgba(0, 174, 236, 0.12);
  border-left: 2.5px solid #00aeec;
}

.tab-favicon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  flex-shrink: 0;
}
.tab-favicon-fallback {
  font-size: 12px;
  flex-shrink: 0;
}
.tab-title-text {
  flex: 1 1 0;
  font-size: 12px;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tab-tree-row.is-active-tab .tab-title-text {
  font-weight: 600;
  color: #00aeec;
}
.tab-current-pill {
  font-size: 9.5px;
  background: #00aeec;
  color: #fff;
  padding: 1px 5px;
  border-radius: 4px;
  font-weight: 600;
  flex-shrink: 0;
}
.tab-close-btn {
  border: none;
  background: transparent;
  color: var(--dim);
  font-size: 11px;
  padding: 2px 4px;
  border-radius: 3px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s, color 0.15s;
  flex-shrink: 0;
}
.tab-tree-row:hover .tab-close-btn {
  opacity: 1;
}
.tab-close-btn:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.12);
}

.panel-header-close-btn {
  width: 32px !important;
  height: 32px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  pointer-events: auto !important;
  font-size: 15px !important;
  border-radius: 8px !important;
  border: 1px solid transparent !important;
  background: transparent !important;
  color: var(--muted) !important;
  transition: all 0.15s ease !important;
  user-select: none !important;
}
.panel-header-close-btn:hover {
  background: rgba(239, 68, 68, 0.14) !important;
  color: #ef4444 !important;
}
</style>
