<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { todoistService } from "../services/todoist.service";
import type { TodoistColumnItem, TodoistTaskItem } from "../todoist/task-list-store";
import {
  getActiveWebTab, isWebTab, loadLauncherPages,
  saveQuickLink, tabHost, type PopupTab
} from "../services/quick-links-export.service";

// ============================================================================
// 0. 全网标签页智能聚合中心 (取代就地汉化)
// ============================================================================
// 底部视图分段切换: "tabs" (打开的标签页，默认) 或 "todoist" (Todoist 挂载板块)
const activeViewTab = ref<"tabs" | "todoist">("tabs");
const tabCenterOpen = ref(true);
const tabLoading = ref(false);
const flatTabs = ref<any[]>([]);
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
    const hostStr = u.hostname.toLowerCase();
    const protocol = u.protocol;

    if (protocol.includes("extension")) {
      return {
        domain: "tab-project",
        title: "tab-project 新标签页",
        favIcon: "assets/bilibili.svg"
      };
    }

    if (hostStr === "localhost" || hostStr === "127.0.0.1" || /^192\.168\./.test(hostStr) || /^10\./.test(hostStr) || /^172\.(1[6-9]|2\d|3[01])\./.test(hostStr)) {
      return { domain: hostStr, title: `局域网服务 (${hostStr})` };
    }

    const parts = hostStr.split(".");
    let rootDomain = hostStr;
    if (parts.length >= 3) {
      const lastTwo = `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
      if (KNOWN_SECOND_LEVEL_TLDS.has(lastTwo)) {
        rootDomain = `${parts[parts.length - 3]}.${lastTwo}`;
      } else {
        rootDomain = `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
      }
    } else {
      rootDomain = hostStr;
    }

    let brandTitle = "";
    if (rootDomain === "bilibili.com") brandTitle = "哔哩哔哩 (Bilibili)";
    else if (rootDomain === "github.com") brandTitle = "GitHub 开发者";
    else if (rootDomain === "youtube.com" || rootDomain === "youtu.be") brandTitle = "YouTube 视界";
    else if (rootDomain === "google.com") brandTitle = "Google 搜索与云";
    else if (rootDomain === "zhihu.com") brandTitle = "知乎";
    else if (rootDomain === "v2ex.com") brandTitle = "V2EX 社区";
    else if (rootDomain === "chaoxing.com") brandTitle = "学习通 (超星)";
    else if (rootDomain.includes("extensions")) brandTitle = "浏览器扩展管理";
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

declare const chrome: any;

// ============================================================================
// 1. Todoist 挂载板块状态（随手记、查看、划去、切换板块）
// ============================================================================
interface SectionOption {
  key: string; // "view:sectionId" 或 "projects:projId:sectionId"
  view: "inbox" | "today" | "projects";
  projectId?: string;
  sectionId?: string;
  label: string;
}

const todoistMountOpen = ref(true);
const todoistColumns = ref<TodoistColumnItem[]>([]);
const availableSections = ref<SectionOption[]>([]);
const currentMountKey = ref<string>("inbox:"); // 默认板块
const currentMountedColumn = ref<TodoistColumnItem | null>(null);
const sectionPickerOpen = ref(false);
const newTodoText = ref("");
const todoLoading = ref(false);

const MOUNT_STORAGE_KEY = "lw_sidepanel_todoist_mount_key";

async function loadTodoistMountData(): Promise<void> {
  todoLoading.value = true;
  try {
    const savedKey = localStorage.getItem(MOUNT_STORAGE_KEY) || "inbox:";
    currentMountKey.value = savedKey;

    // 1. 读取 Inbox 与 Today 的基础列
    const [inboxData, todayData] = await Promise.all([
      todoistService.loadWorkspaceData("inbox").catch(() => null),
      todoistService.loadWorkspaceData("today").catch(() => null)
    ]);

    const sections: SectionOption[] = [];

    // 收件箱板块
    if (inboxData?.columns) {
      for (const col of inboxData.columns) {
        sections.push({
          key: `inbox:${col.sectionId || ""}`,
          view: "inbox",
          sectionId: col.sectionId,
          label: `📥 收件箱 · ${col.title}`
        });
      }
    }

    // 今天与逾期
    if (todayData?.columns) {
      for (const col of todayData.columns) {
        sections.push({
          key: `today:${col.sectionId}`,
          view: "today",
          sectionId: col.sectionId,
          label: `📅 ${col.title}`
        });
      }
    }

    // 项目列表板块
    if (inboxData?.projects) {
      for (const p of inboxData.projects) {
        sections.push({
          key: `projects:${p.id}:`,
          view: "projects",
          projectId: String(p.id),
          sectionId: "",
          label: `📁 ${p.name} · 默认板块`
        });
      }
    }

    availableSections.value = sections;
    await applyMountedColumn(savedKey);
  } catch (err) {
    console.warn("[SidePanel] Load Todoist mount data failed:", err);
  } finally {
    todoLoading.value = false;
  }
}

async function applyMountedColumn(key: string): Promise<void> {
  currentMountKey.value = key;
  try { localStorage.setItem(MOUNT_STORAGE_KEY, key); } catch {}

  const [view, arg1, arg2] = key.split(":");
  let data: any = null;
  if (view === "inbox") {
    data = await todoistService.loadWorkspaceData("inbox").catch(() => null);
    const secId = arg1 || "";
    currentMountedColumn.value = data?.columns?.find((c: any) => (c.sectionId || "") === secId) || data?.columns?.[0] || null;
  } else if (view === "today") {
    data = await todoistService.loadWorkspaceData("today").catch(() => null);
    const secId = arg1 || "today";
    currentMountedColumn.value = data?.columns?.find((c: any) => c.sectionId === secId) || data?.columns?.[0] || null;
  } else if (view === "projects") {
    const projId = arg1;
    const secId = arg2 || "";
    data = await todoistService.loadWorkspaceData("projects", projId).catch(() => null);
    currentMountedColumn.value = data?.columns?.find((c: any) => (c.sectionId || "") === secId) || data?.columns?.[0] || null;
  }
}

function selectMountSection(s: SectionOption): void {
  sectionPickerOpen.value = false;
  void applyMountedColumn(s.key);
  showNotice(`已挂载 Todoist 板块「${s.label}」`);
}

async function onToggleTodoCheck(task: TodoistTaskItem): Promise<void> {
  const next = !task.completed;
  task.completed = next;
  try {
    await todoistService.toggleTaskCompletion(task.id, next);
    showNotice(next ? `✓ 已完成「${task.content}」` : `已恢复「${task.content}」`);
    // 若完成，350ms 后从局部列表中划去并移除
    if (next && currentMountedColumn.value) {
      setTimeout(() => {
        if (currentMountedColumn.value) {
          currentMountedColumn.value.tasks = currentMountedColumn.value.tasks.filter((t: TodoistTaskItem) => t.id !== task.id);
        }
      }, 400);
    }
  } catch (err: any) {
    task.completed = !next;
    showNotice(err?.message || "操作失败", true);
  }
}

async function submitQuickTodo(): Promise<void> {
  const text = newTodoText.value.trim();
  if (!text) return;
  newTodoText.value = "";
  showNotice("正在创建任务…");

  const [view, arg1, arg2] = currentMountKey.value.split(":");
  const payload: any = { content: text };
  if (view === "today") {
    payload.due_string = "today";
  } else if (view === "projects") {
    payload.project_id = arg1;
    if (arg2) payload.section_id = arg2;
  } else if (view === "inbox" && arg1) {
    payload.section_id = arg1;
  }

  try {
    const created = await todoistService.createTask(payload);
    showNotice(`✓ 任务「${text}」创建成功！`);
    if (currentMountedColumn.value && created) {
      currentMountedColumn.value.tasks.unshift({
        id: String(created.id),
        content: created.content,
        completed: false,
        priority: created.priority || 1,
        dueDate: created.due?.date || "",
        dueText: created.due?.string || ""
      } as any);
    }
  } catch (err: any) {
    showNotice(err?.message || "创建失败，请检查网络或 Token", true);
  }
}

// ============================================================================
// 1. 侧边栏基础状态与通知
// ============================================================================
const launcherPages = ref<string[]>(["常用网站", "游戏区", "办公区", "实验组", "就业区", "工具箱", "办公桌"]);
const targetPage = ref<string>("常用网站");
const pagePickerOpen = ref(false);
const notice = ref("");
const noticeBad = ref(false);
let noticeTimer = 0;

function showNotice(text: string, bad = false): void {
  notice.value = text;
  noticeBad.value = bad;
  clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(() => { notice.value = ""; }, 3200);
}

// ============================================================================
// 2. 网页快捷工具箱状态（当前网页收藏、汉化）
// ============================================================================
const currentWebTab = ref<PopupTab | null>(null);
const webIconVisible = ref(false);
const manualOpen = ref(false);
const localizerOpen = ref(false);
const busy = ref(false);
const manualUrl = ref("");
const manualTitle = ref("");
const manualUrlInput = ref<HTMLInputElement | null>(null);
const currentHost = computed(() => tabHost(currentWebTab.value));

async function refreshActiveTabInfo(): Promise<void> {
  try {
    currentWebTab.value = await getActiveWebTab();
    const url = currentWebTab.value?.favIconUrl || "";
    webIconVisible.value = /^https?:|^data:/i.test(url);
  } catch {
    // 忽略非普通网页读取错误
  }
}

function selectTargetPage(page: string): void {
  targetPage.value = page;
  pagePickerOpen.value = false;
  try { localStorage.setItem("lw_target_bookmark_page", page); } catch {}
  showNotice(`已选择目标分区「${page}」`);
}

async function saveCurrentPage(): Promise<void> {
  if (!isWebTab(currentWebTab.value)) {
    manualOpen.value = !manualOpen.value;
    if (manualOpen.value) {
      await nextTick();
      manualUrlInput.value?.focus();
    }
    return;
  }
  busy.value = true;
  showNotice("正在保存…");
  try {
    const result = await saveQuickLink(currentWebTab.value!, targetPage.value);
    showNotice(
      result.ok ? (result.existed ? `该网页已在「${targetPage.value}」中 ✓` : `已成功保存到「${targetPage.value}」 ✓`) : (result.error || "保存失败"),
      !result.ok
    );
  } catch (error: any) {
    showNotice(error?.message || "保存失败", true);
  } finally {
    busy.value = false;
  }
}

async function submitManualLink(): Promise<void> {
  const raw = manualUrl.value.trim();
  if (!raw) {
    showNotice("请输入网址", true);
    manualUrlInput.value?.focus();
    return;
  }
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  let url: string;
  try {
    const parsed = new URL(withScheme);
    if (!/^https?:$/.test(parsed.protocol) || !parsed.hostname) throw new Error("协议不受支持");
    url = parsed.href;
  } catch {
    showNotice("网址格式不正确", true);
    manualUrlInput.value?.focus();
    return;
  }
  busy.value = true;
  showNotice("正在添加…");
  try {
    const result = await saveQuickLink({
      url,
      title: manualTitle.value.trim() || new URL(url).hostname
    }, targetPage.value);
    showNotice(
      result.ok ? (result.existed ? `该网址已在「${targetPage.value}」中 ✓` : `已成功添加到「${targetPage.value}」 ✓`) : (result.error || "添加失败"),
      !result.ok
    );
    if (result.ok) {
      manualUrl.value = "";
      manualTitle.value = "";
      manualOpen.value = false;
    }
  } catch (error: any) {
    showNotice(error?.message || "添加失败", true);
  } finally {
    busy.value = false;
  }
}

function openDashboard(): void {
  void chrome.tabs.create({ url: chrome.runtime.getURL("newtab.html"), active: true });
}

function syncTheme(): void {
  try {
    const t = localStorage.getItem("theme") || "light";
    document.documentElement.dataset.theme = t;
    if (typeof chrome !== "undefined" && chrome?.storage?.local) {
      void chrome.storage.local.get("theme").then((data: any) => {
        if (data?.theme) document.documentElement.dataset.theme = data.theme;
      });
    }
  } catch {}
}

// 监听浏览器标签页切换与更新事件，侧边栏保持实时跟随
function onTabsChanged(): void {
  void refreshActiveTabInfo();
}

onMounted(() => {
  syncTheme();
  void refreshActiveTabInfo();
  void loadTodoistMountData();
  void loadOpenTabs();
  loadLauncherPages().then((pages) => {
    if (pages && pages.length) launcherPages.value = pages;
    const saved = localStorage.getItem("lw_target_bookmark_page");
    if (saved && launcherPages.value.includes(saved)) targetPage.value = saved;
  });
  if (typeof chrome !== "undefined" && chrome?.tabs) {
    chrome.tabs.onActivated?.addListener(onTabsChanged);
    chrome.tabs.onUpdated?.addListener(onTabsChanged);
    chrome.tabs.onCreated?.addListener(loadOpenTabs);
    chrome.tabs.onRemoved?.addListener(loadOpenTabs);
  }
  if (typeof chrome !== "undefined" && chrome?.storage?.onChanged) {
    chrome.storage.onChanged.addListener((changes: any) => {
      if (changes?.theme?.newValue) {
        document.documentElement.dataset.theme = changes.theme.newValue;
      }
    });
  }
});

onUnmounted(() => {
  clearTimeout(noticeTimer);
  if (typeof chrome !== "undefined" && chrome?.tabs) {
    chrome.tabs.onActivated?.removeListener(onTabsChanged);
    chrome.tabs.onUpdated?.removeListener(onTabsChanged);
  }
});
</script>

<template>
  <div class="sp-app-root">
    <!-- 顶栏：网页快捷工具箱与直通主页 -->
    <header class="sp-global-nav">
      <div class="sp-nav-title">
        <span class="sp-nav-title-icon">⚡</span>
        <span class="sp-nav-title-text">网页工具与收集箱</span>
      </div>
      <button
        type="button"
        class="sp-nav-icon-btn"
        title="打开完整新标签页仪表盘"
        @click="openDashboard"
      >
        ⌂
      </button>
    </header>

    <!-- 核心视图：图片收集箱与网页工具合为一体 -->
    <main class="sp-viewport sp-view-tools">
      <!-- 1. 当前网页指示卡片（集成收藏与保存分区切换） -->
      <div class="sp-page-card">
        <div class="sp-page-ico">
          <img v-if="webIconVisible && currentWebTab?.favIconUrl" :src="currentWebTab.favIconUrl" alt="" />
          <span v-else>🌐</span>
        </div>
        <div class="sp-page-meta">
          <small>当前活跃标签页</small>
          <strong :title="currentWebTab?.title">{{ currentWebTab?.title || '正在读取网页…' }}</strong>
          <span>{{ currentHost || '内部或本地页面' }}</span>
        </div>
        <div class="sp-page-actions">
          <button
            class="sp-collect-btn"
            type="button"
            :disabled="busy"
            :title="isWebTab(currentWebTab) ? `一键收藏至「${targetPage}」` : `手动添加到「${targetPage}」`"
            @click="saveCurrentPage"
          >
            ⭐ 收藏
          </button>
          <button
            class="sp-target-picker-btn"
            type="button"
            :class="{ active: pagePickerOpen }"
            :title="`点击切换保存分区（当前：${targetPage}）`"
            @click="pagePickerOpen = !pagePickerOpen"
          >
            <span class="picker-label">{{ targetPage }}</span>
            <span class="picker-arrow">{{ pagePickerOpen ? '▲' : '▼' }}</span>
          </button>
        </div>
      </div>

      <!-- 分区快速切换气泡菜单 -->
      <div v-show="pagePickerOpen" class="sp-page-picker-dropdown">
        <div class="dropdown-header">
          <span>切换目标保存分区</span>
          <button type="button" title="关闭" @click="pagePickerOpen = false">✕</button>
        </div>
        <div class="dropdown-list">
          <button
            v-for="p in launcherPages"
            :key="p"
            type="button"
            class="dropdown-item"
            :class="{ selected: p === targetPage }"
            @click="selectTargetPage(p)"
          >
            <span class="item-icon">{{ p === '常用网站' ? '⭐' : p.includes('游戏') ? '🎮' : p.includes('办公') ? '💼' : p.includes('实验') ? '🧪' : p.includes('就业') ? '🎯' : p.includes('工具') ? '🛠️' : '📁' }}</span>
            <span class="item-text">{{ p }}</span>
            <span v-if="p === targetPage" class="item-check">✓</span>
          </button>
        </div>
      </div>

      <!-- 手动添加面板 -->
      <div v-show="manualOpen" class="sp-manual-panel">
        <div class="manual-head">
          <span>✏️ 手动输入网址</span>
          <button type="button" @click="manualOpen = false">✕</button>
        </div>
        <input
          ref="manualUrlInput"
          v-model="manualUrl"
          type="text"
          placeholder="如 bilibili.com 或 https://..."
          @keydown.enter.prevent="submitManualLink"
        />
        <input
          v-model="manualTitle"
          type="text"
          placeholder="网站名称（选填）"
          @keydown.enter.prevent="submitManualLink"
        />
        <button class="manual-submit-btn" type="button" :disabled="busy" @click="submitManualLink">
          确定添加
        </button>
      </div>

      <!-- 3. 下半区切换：打开的标签页 与 Todoist 待办 -->
      <div class="sp-tab-switcher-card">
        <!-- 分段切换导航栏 -->
        <div class="sp-segment-bar">
          <button
            type="button"
            class="sp-segment-item"
            :class="{ active: activeViewTab === 'tabs' }"
            @click="activeViewTab = 'tabs'"
          >
            📑 打开的标签页 ({{ flatTabs.length }})
          </button>
          <button
            type="button"
            class="sp-segment-item"
            :class="{ active: activeViewTab === 'todoist' }"
            @click="activeViewTab = 'todoist'"
          >
            📋 Todoist 待办
          </button>
        </div>

        <!-- 视图 A：打开的标签页（默认激活） -->
        <div v-show="activeViewTab === 'tabs'" class="sp-switcher-view-content">
          <div class="sp-view-subheader">
            <span class="subheader-title">全网智能聚合 ({{ domainGroups.length }} 个分组)</span>
            <button
              type="button"
              class="sp-tab-refresh-btn"
              title="刷新标签页列表"
              @click.stop="loadOpenTabs"
            >
              ↻ 刷新
            </button>
          </div>

          <div v-if="tabLoading" class="tab-status-box muted small">
            <span>正在读取标签页…</span>
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
                <small class="grp-domain-sub" v-if="grp.domain !== 'tab-project' && grp.domain !== grp.domainTitle && !grp.domainTitle.includes(grp.domain)">
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
                  <span class="tab-title-text">{{ t.title || '未命名网页' }}</span>
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

        <!-- 视图 B：Todoist 待办看板 -->
        <div v-show="activeViewTab === 'todoist'" class="sp-switcher-view-content todoist-view-body">
          <div class="sp-view-subheader">
            <span class="subheader-title">{{ currentMountedColumn ? currentMountedColumn.title : '加载中…' }}</span>
            <button
              type="button"
              class="todoist-switch-btn"
              title="选择要挂载到侧边栏的板块"
              @click.stop="sectionPickerOpen = !sectionPickerOpen"
            >
              ⚙️ 切换板块
            </button>
          </div>

          <!-- 切换板块下拉面板 -->
          <div v-show="sectionPickerOpen" class="sp-page-picker-dropdown todoist-section-dropdown">
            <div class="dropdown-header">
              <span>选择挂载到侧边栏的板块</span>
              <button type="button" title="关闭" @click="sectionPickerOpen = false">✕</button>
            </div>
            <div class="dropdown-list">
              <button
                v-for="s in availableSections"
                :key="s.key"
                type="button"
                class="dropdown-item"
                :class="{ selected: s.key === currentMountKey }"
                @click="selectMountSection(s)"
              >
                <span class="item-text">{{ s.label }}</span>
                <span v-if="s.key === currentMountKey" class="item-check">✓</span>
              </button>
            </div>
          </div>

          <!-- 随手记极速添加行 -->
          <div class="todoist-quick-add-row">
            <input
              v-model="newTodoText"
              type="text"
              placeholder="随手记任务… 按 Enter 添加"
              class="todoist-quick-input"
              @keydown.enter.prevent="submitQuickTodo"
            />
            <button
              type="button"
              class="todoist-quick-submit"
              :disabled="!newTodoText.trim()"
              @click="submitQuickTodo"
            >
              添加
            </button>
          </div>

          <!-- 板块内任务列表 (勾选即划去并完成) -->
          <div v-if="currentMountedColumn && currentMountedColumn.tasks.length" class="todoist-tasks-scroll">
            <div
              v-for="task in currentMountedColumn.tasks"
              :key="task.id"
              class="todoist-task-item"
              :class="{ completed: task.completed }"
            >
              <button
                type="button"
                class="todoist-checkbox"
                :class="{ checked: task.completed }"
                :title="task.completed ? '已完成' : '点击划去完成'"
                @click="onToggleTodoCheck(task)"
              >
                <span v-if="task.completed">✓</span>
              </button>
              <div class="todoist-task-content" :title="task.content">
                <span class="todoist-task-title">{{ task.content }}</span>
                <span v-if="task.dueText" class="todoist-task-due">📅 {{ task.dueText }}</span>
              </div>
            </div>
          </div>
          <div v-else-if="todoLoading" class="todoist-empty-state">
            ⏳ 加载任务中…
          </div>
          <div v-else class="todoist-empty-state">
            ✨ 当前板块暂无待办任务，可在上方随时登记添加
          </div>
        </div>
      </div>
    </main>

    <!-- 底部拟物通知气泡 -->
    <div v-show="notice" class="sp-toast" :class="{ bad: noticeBad }">
      {{ notice }}
    </div>
  </div>
</template>

<style scoped>
.sp-app-root {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  user-select: none;
  box-sizing: border-box;
  overflow: hidden;
}

/* 顶部分段控制器 */
.sp-global-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  background: var(--panel);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.sp-nav-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--heading);
}
.sp-nav-title-icon {
  font-size: 14px;
  color: #b45309;
}
.sp-nav-icon-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.15s ease;
}
.sp-nav-icon-btn:hover {
  background: var(--surface-hover);
  color: var(--heading);
}

/* 视口滚动容器：确保侧边栏整体在内容超出时顺畅滚动 */
.sp-viewport {
  flex: 1 1 0%;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overscroll-behavior-y: contain;
}

/* 快捷工具视图 */
.sp-view-tools {
  padding: 10px 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 100%;
  box-sizing: border-box;
}
.sp-page-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
}
.sp-page-ico {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--panel);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
}
.sp-page-ico img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
.sp-page-meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.sp-page-meta small {
  font-size: 9px;
  color: var(--muted);
}
.sp-page-meta strong {
  font-size: 12px;
  color: var(--heading);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sp-page-meta span {
  font-size: 10px;
  color: #b45309;
}

.sp-action-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(201, 153, 63, 0.45);
  background: linear-gradient(135deg, rgba(201, 153, 63, 0.16), rgba(125, 146, 168, 0.08));
  color: var(--heading);
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}
.sp-action-btn:hover {
  background: linear-gradient(135deg, rgba(201, 153, 63, 0.25), rgba(125, 146, 168, 0.14));
}
.btn-icon {
  font-size: 18px;
  color: #b45309;
}
.btn-text {
  flex: 1;
  min-width: 0;
}
.btn-text strong {
  display: block;
  font-size: 12px;
}
.btn-text small {
  display: block;
  font-size: 10px;
  color: var(--muted);
}
.btn-arrow {
  color: var(--muted);
  font-size: 16px;
}

/* 🌟 分区操作组与切换按钮 */
.sp-action-split-group {
  display: flex;
  align-items: stretch;
  gap: 3px;
}
.sp-action-btn.split-main {
  flex: 1;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.sp-action-btn.split-addon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 62px;
  min-width: 62px;
  padding: 6px 4px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-radius: 4px 10px 10px 4px;
  text-align: center;
  background: rgba(201, 153, 63, 0.14);
  border: 1px solid rgba(201, 153, 63, 0.45);
  cursor: pointer;
  transition: all 0.15s ease;
}
.sp-action-btn.split-addon:hover,
.sp-action-btn.split-addon.active {
  background: rgba(201, 153, 63, 0.26);
}
.sp-action-btn.split-addon .addon-label {
  font-size: 10.5px;
  font-weight: 700;
  color: #b45309;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 54px;
}
.sp-action-btn.split-addon .addon-arrow {
  font-size: 8px;
  color: var(--muted);
  margin-top: 2px;
}

.sp-page-picker-dropdown {
  padding: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: -6px;
}
.sp-page-picker-dropdown .dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10.5px;
  font-weight: 700;
  color: #b45309;
  padding: 0 4px;
}
.sp-page-picker-dropdown .dropdown-header button {
  background: transparent;
  border: none;
  color: var(--muted);
  cursor: pointer;
  padding: 2px 4px;
}
.sp-page-picker-dropdown .dropdown-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.sp-page-picker-dropdown .dropdown-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--panel);
  color: var(--text);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}
.sp-page-picker-dropdown .dropdown-item:hover {
  background: var(--surface-hover);
}
.sp-page-picker-dropdown .dropdown-item.selected {
  background: rgba(201, 153, 63, 0.18);
  border-color: #b45309;
  color: #b45309;
}
.sp-page-picker-dropdown .item-icon {
  font-size: 12px;
}
.sp-page-picker-dropdown .item-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sp-page-picker-dropdown .item-check {
  font-size: 11px;
  font-weight: 900;
  color: #b45309;
}

.sp-manual-panel {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  border-radius: 8px;
  background: var(--surface);
  border: 1px solid var(--border);
}
.manual-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: #b45309;
}
.manual-head button {
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
}
.sp-manual-panel input {
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--panel);
  color: var(--text);
  font-size: 11px;
}
.manual-submit-btn {
  height: 28px;
  border-radius: 6px;
  border: none;
  background: #b45309;
  color: #fff;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
}

.sp-tool-card {
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  overflow: hidden;
}
.tool-card-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  cursor: pointer;
  background: transparent;
  transition: background 0.15s ease;
}
.tool-card-head:hover {
  background: var(--surface-hover);
}
.tool-ico {
  font-size: 18px;
}
.tool-info {
  flex: 1;
}
.tool-info strong {
  display: block;
  font-size: 12px;
  color: var(--heading);
}
.tool-info small {
  display: block;
  font-size: 10px;
  color: var(--muted);
}
.tool-arrow {
  color: var(--muted);
}
.tool-card-body {
  padding: 0 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid var(--border);
  padding-top: 10px;
}

/* 🌟 智能聚合标签页专属样式 (SidePanel) */
.sp-tab-refresh-btn {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 5px;
  font-size: 11px;
  color: var(--muted);
  padding: 1px 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-right: 4px;
}
.sp-tab-refresh-btn:hover {
  background: var(--surface-hover);
  color: var(--heading);
}
.sp-tab-center-body {
  padding: 8px 10px 10px;
  overflow: visible;
}
.tab-status-box {
  padding: 18px;
  text-align: center;
  color: var(--muted);
  font-size: 11px;
}
.tab-group-container::-webkit-scrollbar {
  width: 4px;
}
.tab-group-container::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}
.tab-group-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 2px 2px 10px 2px;
}
.tab-group-block {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}
.tab-group-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 9px;
  background: var(--surface);
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid transparent;
}
.tab-group-header:hover {
  background: var(--surface-hover);
}
.tab-group-block:has(.tab-group-items) .tab-group-header {
  border-bottom-color: var(--border);
}
.grp-toggle-arrow {
  font-size: 9px;
  color: var(--muted);
  width: 12px;
  text-align: center;
  flex-shrink: 0;
}
.grp-favicon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  flex-shrink: 0;
}
.grp-favicon-fallback {
  font-size: 12px;
  flex-shrink: 0;
}
.grp-domain-title {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--heading);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
}
.grp-domain-sub {
  font-size: 9.5px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90px;
}
.grp-count-badge {
  font-size: 9px;
  font-weight: 600;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--muted);
  padding: 0 5px;
  border-radius: 999px;
  margin-left: auto;
  flex-shrink: 0;
}

.tab-group-items {
  padding: 4px 5px 6px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  background: var(--panel);
}
.tab-tree-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  transition: all 0.12s ease;
  min-width: 0;
  background: transparent;
}
.tab-tree-row:hover {
  background: var(--surface-hover);
}
.tab-tree-row.is-active-tab {
  background: rgba(0, 174, 236, 0.12);
  border-left: 3px solid #00aeec;
}
.tab-favicon {
  width: 13px;
  height: 13px;
  object-fit: contain;
  flex-shrink: 0;
}
.tab-favicon-fallback {
  font-size: 11px;
  flex-shrink: 0;
}
.tab-title-text {
  flex: 1 1 0;
  font-size: 11px;
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
  font-size: 8.5px;
  background: #00aeec;
  color: #fff;
  padding: 1px 4px;
  border-radius: 3px;
  font-weight: 600;
  flex-shrink: 0;
}
.tab-close-btn {
  border: none;
  background: transparent;
  color: var(--muted);
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

/* 📋 Todoist 挂载板块卡片专属样式 */
.sp-todoist-card {
  position: relative;
}
.todoist-switch-btn {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 5px;
  font-size: 10.5px;
  font-weight: 600;
  color: #b45309;
  padding: 2px 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.todoist-switch-btn:hover {
  background: var(--surface-hover);
  border-color: #b45309;
}
.todoist-section-dropdown {
  position: absolute;
  top: 44px;
  left: 10px;
  right: 10px;
  z-index: 50;
}
.todoist-card-body {
  gap: 10px;
}
.todoist-quick-add-row {
  display: flex;
  gap: 6px;
}
.todoist-quick-input {
  flex: 1;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--panel);
  color: var(--text);
  font-size: 11.5px;
  outline: none;
}
.todoist-quick-input:focus {
  border-color: #b45309;
}
.todoist-quick-submit {
  padding: 0 10px;
  border-radius: 6px;
  border: none;
  background: #b45309;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.15s ease;
}
.todoist-quick-submit:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.todoist-tasks-scroll {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 2px 2px 10px 2px;
}
.todoist-task-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  background: var(--panel);
  border: 1px solid var(--border);
  transition: all 0.2s ease;
}
.todoist-task-item:hover {
  border-color: rgba(180, 83, 9, 0.4);
}
.todoist-task-item.completed {
  opacity: 0.45;
  background: rgba(0, 0, 0, 0.02);
}
.todoist-task-item.completed .todoist-task-title {
  text-decoration: line-through;
}

.todoist-checkbox {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid #94a3b8;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  margin-top: 1px;
  color: #fff;
  font-size: 11px;
  font-weight: 900;
  transition: all 0.15s ease;
}
.todoist-checkbox:hover {
  border-color: #b45309;
}
.todoist-checkbox.checked {
  background: #10b981;
  border-color: #10b981;
}

.todoist-task-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.todoist-task-title {
  font-size: 11.5px;
  font-weight: 500;
  color: var(--heading);
  word-break: break-word;
  line-height: 1.35;
}
.todoist-task-due {
  font-size: 9.5px;
  color: #b45309;
}
.todoist-empty-state {
  text-align: center;
  font-size: 11px;
  color: var(--muted);
  padding: 10px 4px;
}

/* 拟物 Toast */
.sp-toast {
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: #b45309;
  color: #fff;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  z-index: 1000;
}
.sp-toast.bad {
  background: #e11d48;
}

/* 🌟 顶层当前网页卡片与右侧快捷操作 */
.sp-page-actions {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
}
.sp-collect-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid rgba(201, 153, 63, 0.5);
  background: linear-gradient(135deg, rgba(201, 153, 63, 0.22), rgba(125, 146, 168, 0.1));
  color: #b45309;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.sp-collect-btn:hover {
  background: linear-gradient(135deg, rgba(201, 153, 63, 0.35), rgba(125, 146, 168, 0.18));
}
.sp-target-picker-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--panel);
  color: var(--text);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  max-width: 95px;
}
.sp-target-picker-btn:hover,
.sp-target-picker-btn.active {
  border-color: #b45309;
  color: #b45309;
  background: var(--surface-hover);
}
.sp-target-picker-btn .picker-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sp-target-picker-btn .picker-arrow {
  font-size: 8px;
  color: var(--muted);
}

/* 🌟 下半区分段切换卡片 */
.sp-tab-switcher-card {
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  overflow: visible;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 280px;
}
.sp-segment-bar {
  display: flex;
  background: var(--panel);
  border-bottom: 1px solid var(--border);
  padding: 3px;
  gap: 4px;
}
.sp-segment-item {
  flex: 1;
  padding: 7px 6px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--muted);
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;
}
.sp-segment-item:hover {
  color: var(--heading);
  background: var(--surface-hover);
}
.sp-segment-item.active {
  background: var(--surface);
  color: #b45309;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.sp-switcher-view-content {
  padding: 10px 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  overflow: visible;
}
.sp-view-subheader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px;
}
.subheader-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
}

</style>
