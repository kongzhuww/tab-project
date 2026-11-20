<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
  AVAILABLE_EMPLOYEE_SKILLS,
  DIGITAL_EMPLOYEES_KEY,
  EMPLOYEE_RUN_LOG_KEY,
  EMPLOYEE_WORKER_STAMP,
  createDefaultBiliEmployee,
  createDefaultOrganizerEmployee,
  createDefaultSiteFinderEmployee,
  exportEmployeeBlueprint,
  localDayKey,
  normalizeEmployee,
  parseEmployeeImport,
  type DigitalEmployee,
  type EmployeePeekSnapshot,
  type EmployeeRunRecord,
  type EmployeeSkillId,
} from './employee-contract';
import { callEmployeeBackend, type EmployeeSnapshotResult } from './employee-client';
import { bilibiliService } from '../services/bilibili.service';
import LivePeekModal from './LivePeekModal.vue';
import OrganizerPeekModal from './OrganizerPeekModal.vue';
import SiteFinderModal from './SiteFinderModal.vue';

declare const chrome: any;

const props = defineProps<{
  active?: boolean;
}>();

const emit = defineEmits<{
  openLibrary: [];
}>();

const employees = ref<DigitalEmployee[]>([]);
const runs = ref<EmployeeRunRecord[]>([]);
const loading = ref(true);
const busyId = ref('');
const saving = ref(false);
const notice = ref('');
const errorText = ref('');
const backendStale = ref(false);
const importFileInput = ref<HTMLInputElement | null>(null);

// Drawer editor state
const drawerOpen = ref(false);
const drawerTab = ref<'runtime' | 'skills' | 'prompts' | 'logs'>('runtime');
const draft = ref<DigitalEmployee | null>(null);
const categoriesInput = ref('');
const skipCategoriesInput = ref('');

// Bilibili folders for bili-fav selector
const biliFolders = ref<Array<{ id: string; title: string; count: number }>>([]);
const foldersLoading = ref(false);

const peekModal = ref<{
  open: boolean;
  mode: 'live' | 'replay';
  employeeId?: string;
  employeeName?: string;
  replayFrames?: EmployeePeekSnapshot[];
}>({ open: false, mode: 'live' });

const organizerGenerationError = ref('');
const organizerModal = ref<{
  open: boolean;
  employeeId: string;
  employeeName: string;
  runId?: string;
}>({ open: false, employeeId: '', employeeName: '' });

const siteFinderModal = ref<{
  open: boolean;
  employeeId: string;
  employeeName: string;
}>({ open: false, employeeId: '', employeeName: '' });

function openSiteFinder(emp: DigitalEmployee) {
  siteFinderModal.value = { open: true, employeeId: emp.id, employeeName: emp.name };
}

const activeOrganizerRun = computed<EmployeeRunRecord | null>(() => {
  if (!organizerModal.value.open || !organizerModal.value.employeeId) return null;
  if (organizerModal.value.runId) {
    const exact = runs.value.find(r => r.id === organizerModal.value.runId);
    if (exact) return exact;
  }
  return runs.value.find(r => r.employeeId === organizerModal.value.employeeId && r.kind === 'organizer') || null;
});

function openOrganizerModal(emp: { id: string; name: string }, runId?: string) {
  if (organizerModal.value.employeeId !== emp.id) organizerGenerationError.value = '';
  organizerModal.value = {
    open: true,
    employeeId: emp.id,
    employeeName: emp.name,
    runId,
  };
}

function openLivePeek(emp: DigitalEmployee) {
  if (emp.source.kind === 'workspace-organizer') {
    openOrganizerModal(emp);
    return;
  }
  peekModal.value = {
    open: true,
    mode: 'live',
    employeeId: emp.id,
    employeeName: emp.name,
  };
}

function openReplayPeek(run: EmployeeRunRecord, empName?: string) {
  if (run.kind === 'organizer') {
    openOrganizerModal({ id: run.employeeId, name: empName || '整理专员' }, run.id);
    return;
  }
  peekModal.value = {
    open: true,
    mode: 'replay',
    employeeId: run.employeeId,
    employeeName: empName,
    replayFrames: run.peekFrames || [],
  };
}

const todayKey = computed(() => localDayKey());
const enabledCount = computed(() => employees.value.filter(e => e.enabled).length);
const todayTotalCount = computed(() =>
  runs.value.filter(r => r.status !== 'error' && localDayKey(r.createdAt) === todayKey.value).length
);

function runsForEmployee(employeeId: string): EmployeeRunRecord[] {
  return runs.value.filter(r => r.employeeId === employeeId);
}

function employeeTodayStats(employeeId: string): { analyzed: number; skipped: number } {
  let analyzed = 0;
  let skipped = 0;
  const today = todayKey.value;
  for (const r of runs.value) {
    if (r.employeeId !== employeeId || localDayKey(r.createdAt) !== today) continue;
    if (r.status === 'analyzed') analyzed++;
    else if (r.status === 'skipped-gate' || r.status === 'skipped-no-sub') skipped++;
  }
  return { analyzed, skipped };
}

async function refresh() {
  loading.value = true;
  errorText.value = '';
  try {
    const res = await callEmployeeBackend<EmployeeSnapshotResult>(
      typeof chrome === 'undefined' ? null : chrome.runtime,
      'list'
    );
    employees.value = Array.isArray(res?.employees) ? res.employees : [];
    runs.value = Array.isArray(res?.runs) ? res.runs : [];
    backendStale.value = typeof chrome !== 'undefined' && res?.workerStamp !== EMPLOYEE_WORKER_STAMP;
  } catch (err) {
    errorText.value = err instanceof Error ? err.message : '读取数字员工失败。';
  } finally {
    loading.value = false;
  }
}

function reloadExtensionWorker() {
  if (typeof chrome !== 'undefined' && chrome.runtime?.reload) {
    chrome.runtime.reload();
  }
}

async function loadBiliFolders() {
  if (foldersLoading.value) return;
  foldersLoading.value = true;
  try {
    const folders = await bilibiliService.getCreatedFolders();
    biliFolders.value = (folders || []).map((f: any) => ({
      id: String(f.id),
      title: String(f.title || '未命名收藏夹'),
      count: Number(f.media_count || 0),
    }));
  } catch {
    biliFolders.value = [];
  } finally {
    foldersLoading.value = false;
  }
}

function openEmployeeDrawer(emp: DigitalEmployee, tab: 'runtime' | 'skills' | 'prompts' | 'logs' = 'runtime') {
  draft.value = JSON.parse(JSON.stringify(emp)) as DigitalEmployee;
  categoriesInput.value = emp.decisionGate.categories.join(', ');
  skipCategoriesInput.value = emp.decisionGate.skipCategories.join(', ');
  drawerTab.value = tab;
  drawerOpen.value = true;
  if (!biliFolders.value.length) void loadBiliFolders();
}

function createNewOrganizerEmployee() {
  const fresh = createDefaultOrganizerEmployee();
  fresh.id = `emp-org-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  fresh.name = `桌面书签整理员 #${employees.value.filter(e => e.source.kind === 'workspace-organizer').length + 1}`;
  openEmployeeDrawer(fresh, 'runtime');
}

function createNewSiteFinderEmployee() {
  const fresh = createDefaultSiteFinderEmployee();
  fresh.id = `emp-sf-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  fresh.name = `记忆找站专员 #${employees.value.filter(e => e.source.kind === 'site-finder').length + 1}`;
  openEmployeeDrawer(fresh, 'runtime');
}

function createNewEmployee() {
  const fresh = createDefaultBiliEmployee();
  fresh.id = `emp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  fresh.name = `数字员工 #${employees.value.length + 1}`;
  openEmployeeDrawer(fresh, 'runtime');
}

function closeDrawer() {
  drawerOpen.value = false;
  draft.value = null;
}

function toggleSkill(skillId: EmployeeSkillId) {
  if (!draft.value) return;
  const idx = draft.value.skills.indexOf(skillId);
  if (idx >= 0) draft.value.skills.splice(idx, 1);
  else draft.value.skills.push(skillId);
}

function onFolderSelectChange() {
  if (!draft.value) return;
  const match = biliFolders.value.find(f => f.id === draft.value?.source.folderId);
  if (match) {
    draft.value.source.folderTitle = match.title;
  }
}

async function saveDraft() {
  if (!draft.value || saving.value) return;
  saving.value = true;
  errorText.value = '';
  notice.value = '';
  try {
    const cats = categoriesInput.value
      .split(/[,，\n]+/)
      .map(s => s.trim())
      .filter(Boolean);
    const skips = skipCategoriesInput.value
      .split(/[,，\n]+/)
      .map(s => s.trim())
      .filter(Boolean);
    draft.value.decisionGate.categories = cats.length ? cats : ['AI 与 Agent', '工程与效率', '行业洞察', '娱乐/低信息跳过'];
    draft.value.decisionGate.skipCategories = skips.filter(s => draft.value!.decisionGate.categories.includes(s));

    const payload = normalizeEmployee(draft.value);
    const saved = await callEmployeeBackend<DigitalEmployee>(
      typeof chrome === 'undefined' ? null : chrome.runtime,
      'save',
      { employee: payload }
    );
    draft.value = JSON.parse(JSON.stringify(saved));
    notice.value = `已保存员工「${saved.name}」配置。`;
    await refresh();
  } catch (err) {
    errorText.value = err instanceof Error ? err.message : '保存员工配置失败。';
  } finally {
    saving.value = false;
  }
}

async function togglePatrol(emp: DigitalEmployee) {
  if (busyId.value) return;
  busyId.value = emp.id;
  errorText.value = '';
  notice.value = '';
  try {
    const next = !emp.enabled;
    await callEmployeeBackend(typeof chrome === 'undefined' ? null : chrome.runtime, 'toggle', {
      id: emp.id,
      enabled: next,
    });
    notice.value = next ? `已开启「${emp.name}」后台自动巡检。` : `已暂停「${emp.name}」后台巡检。`;
    await refresh();
  } catch (err) {
    errorText.value = err instanceof Error ? err.message : '切换状态失败。';
  } finally {
    busyId.value = '';
  }
}

async function runOneNow(emp: DigitalEmployee) {
  if (emp.source.kind === 'site-finder') {
    openSiteFinder(emp);
    return;
  }
  if (busyId.value) return;
  const isOrg = emp.source.kind === 'workspace-organizer';
  busyId.value = emp.id;
  errorText.value = '';
  if (isOrg) organizerGenerationError.value = '';
  notice.value = isOrg
    ? `「${emp.name}」正在盘点桌面网站与书签，生成待审批提案…`
    : `「${emp.name}」正在抓取并分拣 1 条视频…`;
  if (isOrg) {
    openOrganizerModal(emp);
  }
  try {
    const res = await callEmployeeBackend<{ message: string; record?: EmployeeRunRecord }>(
      typeof chrome === 'undefined' ? null : chrome.runtime,
      'run-one',
      { id: emp.id, organizerConsent: true }
    );
    notice.value = res?.message || '试跑完成。';
    await refresh();
    if (isOrg && res?.record?.id && organizerModal.value.open && organizerModal.value.employeeId === emp.id) {
      openOrganizerModal(emp, res.record.id);
    }
    if (drawerOpen.value && draft.value?.id === emp.id) {
      const updated = employees.value.find(e => e.id === emp.id);
      if (updated) draft.value = JSON.parse(JSON.stringify(updated));
    }
  } catch (err) {
    errorText.value = err instanceof Error ? err.message : '试跑执行失败。';
    if (isOrg) organizerGenerationError.value = errorText.value;
    notice.value = '';
    await refresh();
  } finally {
    busyId.value = '';
  }
}

async function removeEmployee(emp: DigitalEmployee) {
  if (!window.confirm(`确定删除数字员工「${emp.name}」及其运行记录吗？资料库已沉淀的文章不会被删除。`)) return;
  try {
    await callEmployeeBackend(typeof chrome === 'undefined' ? null : chrome.runtime, 'delete', { id: emp.id });
    if (draft.value?.id === emp.id) closeDrawer();
    notice.value = `已删除员工「${emp.name}」。`;
    await refresh();
  } catch (err) {
    errorText.value = err instanceof Error ? err.message : '删除失败。';
  }
}

function exportEmployee(emp: DigitalEmployee) {
  const pkg = exportEmployeeBlueprint(emp);
  const blob = new Blob([JSON.stringify(pkg, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = emp.name.replace(/[^\w\u4e00-\u9fa5-]+/g, '_') || 'employee';
  a.href = url;
  a.download = `${safeName}.tab-agent.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  notice.value = `已导出分享包「${safeName}.tab-agent.json」（已自动脱敏私人收藏夹 ID 与反馈记忆）。`;
}

function triggerImport() {
  importFileInput.value?.click();
}

function onImportFile(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async e => {
    try {
      const text = String(e.target?.result || '');
      const imported = parseEmployeeImport(text);
      await callEmployeeBackend(typeof chrome === 'undefined' ? null : chrome.runtime, 'save', {
        employee: imported,
      });
      await refresh();
      openEmployeeDrawer(imported, 'runtime');
      notice.value = `已导入员工「${imported.name}」，请确认数据源与模型后开启巡检。`;
    } catch (err) {
      errorText.value = err instanceof Error ? err.message : '导入失败，请检查文件格式。';
    } finally {
      input.value = '';
    }
  };
  reader.readAsText(file);
}

async function submitFeedback(run: EmployeeRunRecord, verdict: 'keep' | 'skip') {
  if (!draft.value) return;
  try {
    const updated = await callEmployeeBackend<DigitalEmployee>(
      typeof chrome === 'undefined' ? null : chrome.runtime,
      'feedback',
      {
        employeeId: draft.value.id,
        title: run.title,
        verdict,
        category: run.category,
        note: verdict === 'keep' ? '主人标记为有价值' : '主人标记为低价值跳过',
      }
    );
    draft.value = JSON.parse(JSON.stringify(updated));
    notice.value = verdict === 'keep' ? '已记住：类似内容优先精读。' : '已记住：类似内容以后直接跳过。';
    await refresh();
  } catch (err) {
    errorText.value = err instanceof Error ? err.message : '记录反馈失败。';
  }
}

function removeFeedbackItem(id: string) {
  if (!draft.value) return;
  draft.value.ownerFeedback = draft.value.ownerFeedback.filter(f => f.id !== id);
}

async function clearRunLogs(employeeId: string) {
  try {
    await callEmployeeBackend(typeof chrome === 'undefined' ? null : chrome.runtime, 'clear-history', { id: employeeId });
    await refresh();
    notice.value = '已清空该员工的去重与运行历史。';
  } catch (err) {
    errorText.value = err instanceof Error ? err.message : '清空失败。';
  }
}

function sourceLabel(emp: DigitalEmployee): string {
  if (emp.source.kind === 'workspace-organizer') return '桌面网站 + 书签';
  if (emp.source.kind === 'site-finder') return '记忆找站 · 书签+桌面';
  if (emp.source.kind === 'bili-history') return '播放历史';
  if (emp.source.kind === 'bili-fav') return emp.source.folderTitle || '指定收藏夹';
  return '稍后再看';
}

function organizerRunStats(employeeId: string): { pending: number; applied: number } {
  const latest = runs.value.find(r => r.employeeId === employeeId && r.kind === 'organizer');
  const steps = latest?.planSteps || [];
  return {
    pending: steps.filter(s => s.status === 'pending').length,
    applied: steps.filter(s => s.status === 'applied').length,
  };
}

function statusBadge(status: EmployeeRunRecord['status'], kind?: EmployeeRunRecord['kind']): string {
  if (kind === 'organizer') return '整理提案';
  if (status === 'analyzed') return '已精读';
  if (status === 'skipped-gate') return '快筛跳过';
  if (status === 'skipped-no-sub') return '无字幕';
  return '异常';
}

function formatShortTime(ts?: number): string {
  if (!ts) return '尚未运行';
  return new Date(ts).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function onStorageChanged(changes: any, area: string) {
  if (area === 'local' && (changes[DIGITAL_EMPLOYEES_KEY] || changes[EMPLOYEE_RUN_LOG_KEY])) {
    void refresh();
  }
}

watch(
  () => props.active,
  val => {
    if (val) void refresh();
  }
);

onMounted(() => {
  void refresh();
  if (typeof chrome !== 'undefined' && chrome.storage?.onChanged?.addListener) {
    chrome.storage.onChanged.addListener(onStorageChanged);
  }
});

onBeforeUnmount(() => {
  if (typeof chrome !== 'undefined' && chrome.storage?.onChanged?.removeListener) {
    chrome.storage.onChanged.removeListener(onStorageChanged);
  }
});
</script>

<template>
  <section class="emp-shell" aria-label="数字员工工作台">
    <header class="emp-header">
      <div class="emp-title-group">
        <h2>数字员工</h2>
        <span class="emp-stats-pill">巡检中 {{ enabledCount }} / {{ employees.length }} · 今日处理 {{ todayTotalCount }} 条</span>
      </div>
      <div class="emp-head-actions">
        <button type="button" class="emp-pill-btn subtle" @click="triggerImport">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 10V2.5M5 5.5l3-3 3 3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3"/></svg>
          <span>导入员工</span>
        </button>
        <input ref="importFileInput" type="file" accept=".json" style="display:none" @change="onImportFile" />
        <button type="button" class="emp-pill-btn subtle" @click="createNewOrganizerEmployee">
          <span>+ 桌面书签专员</span>
        </button>
        <button type="button" class="emp-pill-btn subtle" @click="createNewSiteFinderEmployee">
          <span>+ 记忆找站专员</span>
        </button>
        <button type="button" class="emp-pill-btn primary" @click="createNewEmployee">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>
          <span>新建员工</span>
        </button>
      </div>
    </header>

    <div class="emp-body">
      <div class="emp-main">
        <div v-if="backendStale" class="emp-banner stale" role="alert">
          <span>检测到扩展后台服务脚本尚未更新（仅刷新了页面），实况窥屏与自动重试需重启后台服务后生效。</span>
          <button type="button" class="emp-mini-btn" @click="reloadExtensionWorker">🔄 立即热重载扩展</button>
        </div>
        <p v-if="errorText" class="emp-banner error" role="alert">{{ errorText }}</p>
        <p v-if="notice" class="emp-banner notice" role="status">{{ notice }}</p>

        <div v-if="loading && !employees.length" class="emp-empty">正在加载数字员工…</div>

        <div v-else-if="!employees.length" class="emp-empty">
          <h3>还没有数字员工</h3>
          <p>创建一个驻留后台的员工，或导入他人分享的 <code>.tab-agent.json</code> 员工包。</p>
          <button type="button" class="emp-pill-btn primary" @click="createNewEmployee">新建第一个员工</button>
        </div>

        <div v-else class="emp-grid">
          <article
            v-for="emp in employees"
            :key="emp.id"
            class="emp-card"
            :class="{ active: drawerOpen && draft?.id === emp.id, running: busyId === emp.id }"
            @click="openEmployeeDrawer(emp, 'runtime')"
          >
            <div class="emp-card-top">
              <div class="emp-card-name-wrap">
                <h3 class="emp-card-name" :title="emp.name">{{ emp.name }}</h3>
                <span class="emp-card-role">{{ emp.role }}</span>
              </div>
              <button
                type="button"
                class="emp-switch"
                :class="{ on: emp.enabled }"
                role="switch"
                :aria-checked="emp.enabled"
                :aria-label="`${emp.name}后台巡检`"
                :title="emp.enabled ? '已启用后台巡检（点击暂停）' : emp.source.kind === 'workspace-organizer' ? '开启后台巡检：按间隔将网站和书签样本交给配置的模型生成待审批提案' : '已暂停（点击开启后台自动巡检）'"
                :disabled="busyId === emp.id"
                @click.stop="togglePatrol(emp)"
              >
                <span class="emp-switch-knob"></span>
              </button>
            </div>

            <p class="emp-card-desc">{{ emp.description || '按自定义规则与 Skills 自动分拣处理数据。' }}</p>

            <div class="emp-card-chips">
              <span class="emp-chip sky">{{ sourceLabel(emp) }}</span>
              <span class="emp-chip indigo">{{ emp.runtime.decisionMode === 'jev-http' ? 'Jev 端点' : '快筛漏斗' }}</span>
              <span class="emp-chip neutral">{{ emp.runtime.analyzer === 'native-pi' ? '本机 Pi' : 'DeepSeek' }}</span>
              <span class="emp-chip neutral">{{ emp.skills.length }} Skills</span>
            </div>

            <div v-if="emp.lastError" class="emp-card-err" :title="emp.lastError">异常：{{ emp.lastError }}</div>

            <div class="emp-card-foot" @click.stop>
              <div class="emp-card-stat">
                <i class="emp-dot" :class="{ on: emp.enabled, err: Boolean(emp.lastError) }"></i>
                <span v-if="emp.source.kind === 'workspace-organizer'">
                  提案 {{ organizerRunStats(emp.id).pending }} 待批 / {{ organizerRunStats(emp.id).applied }} 已生效
                </span>
                <span v-else-if="emp.source.kind === 'site-finder'">
                  累计找站 {{ runs.filter(r => r.employeeId === emp.id && r.kind === 'site-finder').length }} 次
                </span>
                <span v-else>今日 {{ employeeTodayStats(emp.id).analyzed }} 精读 / {{ employeeTodayStats(emp.id).skipped }} 跳过</span>
              </div>
              <div class="emp-card-btns">
                <button
                  v-if="emp.source.kind === 'site-finder'"
                  type="button"
                  class="emp-mini-btn"
                  @click="openSiteFinder(emp)"
                >
                  🔍 输入描述找站
                </button>
                <template v-else>
                  <button
                    type="button"
                    class="emp-mini-btn"
                    :disabled="Boolean(busyId)"
                    :title="emp.source.kind === 'workspace-organizer' ? '只读盘点桌面网站与书签并生成提案' : '立即抓取 1 条未处理视频试跑'"
                    @click="runOneNow(emp)"
                  >
                    {{ busyId === emp.id ? '运行中…' : (emp.source.kind === 'workspace-organizer' ? '生成提案' : '试跑 1 条') }}
                  </button>
                  <button
                    type="button"
                    class="emp-mini-btn ghost"
                    :title="emp.source.kind === 'workspace-organizer' ? '打开整理预览与逐条审批清单' : '打开仿真实况窥屏窗口'"
                    @click="openLivePeek(emp)"
                  >
                    {{ emp.source.kind === 'workspace-organizer' ? '预览审批' : '窥屏' }}
                  </button>
                </template>
                <button type="button" class="emp-mini-btn ghost" title="导出脱敏员工包分享给别人" @click="exportEmployee(emp)">导出</button>
                <button type="button" class="emp-mini-btn ghost" title="编辑配置与查看运行记录" @click="openEmployeeDrawer(emp, 'runtime')">配置</button>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- 右侧无模态员工配置与运行流水抽屉 -->
      <aside v-if="drawerOpen && draft" class="emp-drawer" aria-label="编辑数字员工">
        <header class="emp-drawer-head">
          <div class="emp-drawer-title-wrap">
            <h3>{{ draft.name || '未命名员工' }}</h3>
            <small>最近运行：{{ formatShortTime(draft.lastRunAt) }}</small>
          </div>
          <button type="button" class="emp-close-btn" aria-label="关闭抽屉" @click="closeDrawer">×</button>
        </header>

        <nav class="emp-drawer-tabs" role="tablist">
          <button type="button" :class="{ active: drawerTab === 'runtime' }" @click="drawerTab = 'runtime'">基础与来源</button>
          <button type="button" :class="{ active: drawerTab === 'skills' }" @click="drawerTab = 'skills'">Jev 与 Skills</button>
          <button type="button" :class="{ active: drawerTab === 'prompts' }" @click="drawerTab = 'prompts'">提示词与记忆</button>
          <button type="button" :class="{ active: drawerTab === 'logs' }" @click="drawerTab = 'logs'">运行记录 ({{ runsForEmployee(draft.id).length }})</button>
        </nav>

        <div class="emp-drawer-body">
          <!-- Tab 1: 基础与来源 -->
          <template v-if="drawerTab === 'runtime'">
            <div class="emp-field">
              <label>员工名称</label>
              <input v-model="draft.name" type="text" maxlength="48" placeholder="例如：B站分拣研究员" />
            </div>
            <div class="emp-field">
              <label>定位标签</label>
              <input v-model="draft.role" type="text" maxlength="64" placeholder="例如：后台静默分拣 · 精读沉淀" />
            </div>
            <div class="emp-field">
              <label>职责简述</label>
              <textarea v-model="draft.description" rows="2" maxlength="240" />
            </div>

            <div class="emp-row-2">
              <div class="emp-field">
                <label>工作数据源</label>
                <select v-model="draft.source.kind">
                  <option value="workspace-organizer">桌面网站 + 浏览器书签（整理审批）</option>
                  <option value="site-finder">记忆找站（模糊检索书签/桌面 + 推荐入口）</option>
                  <option value="bili-toview">稍后再看</option>
                  <option value="bili-fav">指定 B 站收藏夹</option>
                  <option value="bili-history">播放历史</option>
                </select>
              </div>
              <div class="emp-field">
                <label>精读分析引擎</label>
                <select v-model="draft.runtime.analyzer">
                  <option value="deepseek">DeepSeek API</option>
                  <option value="native-pi">本机 Pi Agent</option>
                </select>
              </div>
            </div>

            <div v-if="draft.source.kind === 'bili-fav'" class="emp-field">
              <div class="emp-label-inline">
                <label>选择收藏夹（导出分享时自动脱敏）</label>
                <button type="button" class="emp-link-btn" :disabled="foldersLoading" @click="loadBiliFolders">
                  {{ foldersLoading ? '读取中…' : '刷新收藏夹' }}
                </button>
              </div>
              <select v-model="draft.source.folderId" @change="onFolderSelectChange">
                <option value="">请选择收藏夹…</option>
                <option v-for="f in biliFolders" :key="f.id" :value="f.id">{{ f.title }} ({{ f.count }})</option>
              </select>
            </div>

            <div v-if="draft.runtime.analyzer === 'native-pi'" class="emp-row-2">
              <div class="emp-field">
                <label>指定 Pi 模型（留空跟随默认）</label>
                <input v-model="draft.runtime.piModel" type="text" placeholder="如 openai-codex/gpt-6.1-sol" />
              </div>
              <div class="emp-field">
                <label>思考强度</label>
                <select v-model="draft.runtime.piThinking">
                  <option value="off">关闭</option>
                  <option value="low">低</option>
                  <option value="medium">中</option>
                  <option value="high">高</option>
                </select>
              </div>
            </div>

            <p v-if="draft.source.kind === 'workspace-organizer'" class="emp-field">整理专员采用「提案 preview + 右侧逐条点击生效」模式，不自动改动任何数据。</p>
            <div class="emp-row-3">
              <div class="emp-field">
                <label>巡检间隔 (分)</label>
                <input v-model.number="draft.schedulePolicy.intervalMinutes" type="number" min="5" max="1440" />
              </div>
              <div class="emp-field">
                <label>{{ draft.source.kind === 'workspace-organizer' ? '每日提案上限' : '每日上限 (条)' }}</label>
                <input v-model.number="draft.schedulePolicy.dailyLimit" type="number" min="1" max="50" />
              </div>
              <div v-if="draft.source.kind !== 'workspace-organizer'" class="emp-field">
                <label>每次扫前 N 条</label>
                <input v-model.number="draft.schedulePolicy.maxFetchItems" type="number" min="1" max="40" />
              </div>
            </div>

            <label class="emp-check-row">
              <input v-model="draft.enabled" type="checkbox" />
              <span>{{ draft.source.kind === 'workspace-organizer' ? '启用后台巡检（用配置的模型生成提案，审批后才修改）' : '启用后台自动巡检（每次仅温柔处理 1 条未读视频，不主动弹窗打扰）' }}</span>
            </label>
          </template>

          <!-- Tab 2: Jev 决策与 Skills -->
          <template v-else-if="drawerTab === 'skills'">
            <div class="emp-field">
              <label>System 1 前置分拣引擎</label>
              <select v-model="draft.runtime.decisionMode">
                <option value="llm-fast">快速轻量判断（内置 JSON Noul · Score · Choice）</option>
                <option value="jev-http">外部 Jev 决策模型端点（HTTP JSON API）</option>
              </select>
            </div>

            <div v-if="draft.runtime.decisionMode === 'jev-http'" class="emp-field">
              <label>Jev HTTP 接口地址（支持本地 http://127.0.0.1:...）</label>
              <input v-model="draft.runtime.jevEndpoint" type="url" placeholder="http://127.0.0.1:8787/decide" />
            </div>

            <div class="emp-field">
              <label>价值是非判断问题（Noul）</label>
              <textarea v-model="draft.decisionGate.worthQuestion" rows="2" />
            </div>

            <div class="emp-field">
              <div class="emp-label-inline">
                <label>精读最低分阈值（Score ≥ {{ draft.decisionGate.minScore.toFixed(2) }}）</label>
              </div>
              <input v-model.number="draft.decisionGate.minScore" type="range" min="0" max="1" step="0.05" />
            </div>

            <div class="emp-field">
              <label>分类标签选项（Choice，逗号隔开，同时作为资料库文章分类）</label>
              <input v-model="categoriesInput" type="text" placeholder="AI 与 Agent, 工程与效率, 行业洞察, 娱乐/低信息跳过" />
            </div>

            <div class="emp-field">
              <label>命中后直接跳过的分类（逗号隔开）</label>
              <input v-model="skipCategoriesInput" type="text" placeholder="娱乐/低信息跳过" />
            </div>

            <label class="emp-check-row">
              <input v-model="draft.decisionGate.skipWithoutSubtitle" type="checkbox" />
              <span>无字幕视频自动跳过（避免无根据编造内容，节省 Token）</span>
            </label>

            <label class="emp-check-row">
              <input v-model="draft.decisionGate.retryOnSkip" type="checkbox" />
              <span>跳过的任务自动重来一轮（继续抓取下一条候选视频，默认打开）</span>
            </label>

            <div class="emp-field">
              <label>员工挂载 Skills 能力权限</label>
              <div class="emp-skill-list">
                <label v-for="sk in AVAILABLE_EMPLOYEE_SKILLS" :key="sk.id" class="emp-skill-item">
                  <input
                    type="checkbox"
                    :checked="draft.skills.includes(sk.id)"
                    @change="toggleSkill(sk.id)"
                  />
                  <div>
                    <strong>{{ sk.name }}</strong>
                    <small>{{ sk.description }}</small>
                  </div>
                </label>
              </div>
            </div>

            <div class="emp-field">
              <label>自定义 Skill 补充规则（随员工包导出分享）</label>
              <textarea
                v-model="draft.customSkillInstructions"
                rows="3"
                placeholder="例如：如果视频提到 GitHub 开源项目，必须在总结末尾单独列出仓库要点。"
              />
            </div>
          </template>

          <!-- Tab 3: 提示词与记忆 -->
          <template v-else-if="drawerTab === 'prompts'">
            <div class="emp-field">
              <label>员工核心提示词 (System Prompt)</label>
              <textarea v-model="draft.prompt.systemPrompt" rows="5" />
            </div>
            <div class="emp-field">
              <label>沉淀笔记输出模板 (Markdown)</label>
              <textarea v-model="draft.prompt.reportTemplate" rows="5" class="mono" />
            </div>
            <div class="emp-field">
              <div class="emp-label-inline">
                <label>主人纠偏偏好记忆 ({{ draft.ownerFeedback.length }})</label>
                <small style="color: var(--muted,#94a3b8); font-size: 11px;">导出分享时默认剥离保护隐私</small>
              </div>
              <div v-if="!draft.ownerFeedback.length" class="emp-sub-empty">
                在「运行记录」里对判断结果点「标记有价值」或「以后跳过」，员工会自动学会你的口味。
              </div>
              <div v-else class="emp-fb-list">
                <div v-for="fb in draft.ownerFeedback" :key="fb.id" class="emp-fb-row">
                  <span class="emp-fb-tag" :class="fb.verdict">{{ fb.verdict === 'keep' ? '优先精读' : '跳过' }}</span>
                  <span class="emp-fb-title" :title="fb.title">{{ fb.title }}</span>
                  <span class="emp-fb-cat">{{ fb.category }}</span>
                  <button type="button" class="emp-fb-del" title="移除样本" @click="removeFeedbackItem(fb.id)">×</button>
                </div>
              </div>
            </div>
          </template>

          <!-- Tab 4: 运行记录 -->
          <template v-else>
            <div class="emp-logs-head">
              <span v-if="draft.source.kind === 'workspace-organizer'">记录包含审批与撤销凭据；清空或被历史上限淘汰后无法从此处撤销。</span>
              <span v-else>仅展示最近执行轨迹，已分析/跳过的 BV 号不会重复处理。</span>
              <button
                v-if="runsForEmployee(draft.id).length"
                type="button"
                class="emp-link-btn"
                @click="clearRunLogs(draft.id)"
              >
                清空记录
              </button>
            </div>
            <div v-if="!runsForEmployee(draft.id).length" class="emp-sub-empty">
              {{ draft.source.kind === 'workspace-organizer' ? '还没有整理提案。点击卡片上的「生成提案」或「预览审批」即可开始。' : '还没有运行流水。你可以点击卡片上的「试跑 1 条」立刻体验，或开启巡检开关。' }}
            </div>
            <div v-else class="emp-run-list">
              <article v-for="r in runsForEmployee(draft.id)" :key="r.id" class="emp-run-card">
                <div class="emp-run-top">
                  <span class="emp-run-badge" :class="r.status">{{ statusBadge(r.status, r.kind) }}</span>
                  <span class="emp-run-cat">{{ r.category }} · {{ Math.round(r.score * 100) }}分</span>
                  <span class="emp-run-time">{{ formatShortTime(r.createdAt) }}</span>
                </div>
                <div class="emp-run-title" :title="r.title">{{ r.title }}</div>
                <p class="emp-run-reason">{{ r.reason }}</p>
                <div v-if="r.toolTrace?.length" class="emp-run-trace">
                  <span v-for="(step, si) in r.toolTrace" :key="si" class="emp-trace-pill" :class="{ fail: !step.ok }">
                    {{ step.summary }}
                  </span>
                </div>
                <div class="emp-run-foot">
                  <div class="emp-run-links">
                    <button
                      v-if="r.kind === 'organizer' || r.peekFrames?.length"
                      type="button"
                      class="emp-link-btn"
                      @click="openReplayPeek(r, draft.name)"
                    >
                      {{ r.kind === 'organizer' ? '👀 预览与逐条审批' : '▶ 回放窥屏' }}
                    </button>
                    <a v-if="r.url" :href="r.url" target="_blank" rel="noreferrer">原视频 ↗</a>
                    <button v-if="r.articleId" type="button" class="emp-link-btn" @click="emit('openLibrary')">去资料库看笔记 →</button>
                  </div>
                  <div v-if="r.bvid !== '-'" class="emp-run-fb-btns">
                    <button type="button" @click="submitFeedback(r, 'keep')">✓ 记为重要</button>
                    <button type="button" @click="submitFeedback(r, 'skip')">✕ 以后跳过</button>
                  </div>
                </div>
              </article>
            </div>
          </template>
        </div>

        <footer class="emp-drawer-foot">
          <button type="button" class="emp-pill-btn danger-text" @click="removeEmployee(draft)">删除</button>
          <div class="emp-drawer-foot-right">
            <button type="button" class="emp-pill-btn subtle" @click="exportEmployee(draft)">导出分享</button>
            <button type="button" class="emp-pill-btn primary" :disabled="saving" @click="saveDraft">
              {{ saving ? '保存中…' : '保存配置' }}
            </button>
          </div>
        </footer>
      </aside>
    </div>
    <LivePeekModal
      v-if="peekModal.open"
      :mode="peekModal.mode"
      :employee-id="peekModal.employeeId"
      :employee-name="peekModal.employeeName"
      :replay-frames="peekModal.replayFrames"
      :running="Boolean(busyId)"
      :backend-stale="backendStale"
      @close="peekModal.open = false"
      @run-now="id => { const target = employees.find(e => e.id === id); if (target) void runOneNow(target); }"
      @reload-extension="reloadExtensionWorker"
    />
    <OrganizerPeekModal
      v-if="organizerModal.open"
      :employee-id="organizerModal.employeeId"
      :employee-name="organizerModal.employeeName"
      :latest-run="activeOrganizerRun"
      :running="busyId === organizerModal.employeeId"
      :generation-error="organizerGenerationError"
      :backend-stale="backendStale"
      @close="organizerModal.open = false"
      @run-now="id => { const target = employees.find(e => e.id === id); if (target) void runOneNow(target); }"
      @updated="void refresh()"
      @reload-extension="reloadExtensionWorker"
    />
    <SiteFinderModal
      v-if="siteFinderModal.open"
      :employee-id="siteFinderModal.employeeId"
      :employee-name="siteFinderModal.employeeName"
      :recent-runs="runs"
      @close="siteFinderModal.open = false"
      @updated="void refresh()"
    />
  </section>
</template>

<style scoped>
.emp-shell {
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: var(--text, #26334b);
}
.emp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 24px 14px;
  border-bottom: 1px solid var(--border, #e5e8ef);
  flex: none;
  flex-wrap: wrap;
}
.emp-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.emp-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--heading, #0f172a);
}
.emp-stats-pill {
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  font-size: 11.5px;
  font-weight: 550;
  font-variant-numeric: tabular-nums;
}
.emp-head-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.emp-pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 31px;
  padding: 0 13px;
  border-radius: 999px;
  border: 1px solid transparent;
  font: inherit;
  font-size: 12px;
  font-weight: 550;
  cursor: pointer;
  transition: filter 0.14s, box-shadow 0.14s, background-color 0.14s;
}
.emp-pill-btn svg { width: 13.5px; height: 13.5px; flex: none; }
.emp-pill-btn.subtle {
  background: var(--panel, #ffffff);
  border-color: var(--border, #dce2ec);
  color: var(--text, #334155);
}
.emp-pill-btn.subtle:hover {
  border-color: rgba(99, 102, 241, 0.35);
  color: #4f46e5;
}
.emp-pill-btn.primary {
  background: linear-gradient(135deg, #6366f1, #4f6ef7);
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.28);
}
.emp-pill-btn.primary:hover { filter: brightness(1.06); }
.emp-pill-btn.danger-text {
  background: transparent;
  color: #dc2626;
  padding: 0 8px;
}
.emp-pill-btn.danger-text:hover { background: rgba(239, 68, 68, 0.08); }

.emp-body {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  overflow: hidden;
}
.emp-main {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 18px 24px 28px;
}
.emp-banner {
  margin: 0 0 12px;
  padding: 9px 13px;
  border-radius: 10px;
  font-size: 12px;
}
.emp-banner.notice {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.22);
  color: #4338ca;
}
.emp-banner.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #b91c1c;
}
.emp-banner.stale {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.34);
  color: #b45309;
}
.emp-banner.stale .emp-mini-btn { flex: 0 0 auto; }
.emp-empty {
  margin: 48px auto;
  text-align: center;
  max-width: 360px;
  color: var(--muted, #64748b);
}
.emp-empty h3 { margin: 0 0 8px; color: var(--heading, #0f172a); }
.emp-empty p { margin: 0 0 14px; font-size: 12.5px; line-height: 1.6; }

.emp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(245px, 290px));
  gap: 14px;
  align-items: stretch;
}
.emp-card {
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 14px 15px 12px;
  border-radius: 13px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, #e4e8f0);
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}
.emp-card:hover {
  transform: translateY(-2px);
  border-color: rgba(99, 102, 241, 0.35);
  box-shadow: 0 10px 24px rgba(79, 70, 229, 0.08);
}
.emp-card.active {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.16);
}
.emp-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}
.emp-card-name-wrap { min-width: 0; flex: 1; }
.emp-card-name {
  margin: 0;
  font-size: 14px;
  font-weight: 650;
  color: var(--heading, #0f172a);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.emp-card-role {
  display: block;
  font-size: 11px;
  color: #5b5bd6;
  margin-top: 2px;
}
.emp-switch {
  position: relative;
  width: 36px;
  height: 20px;
  flex: none;
  border: 0;
  border-radius: 999px;
  background: var(--border, #cbd5e1);
  padding: 2px;
  cursor: pointer;
  transition: background-color 0.16s ease;
}
.emp-switch.on { background: linear-gradient(135deg, #6366f1, #4f6ef7); }
.emp-switch-knob {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.25);
  transform: translateX(0);
  transition: transform 0.16s ease;
}
.emp-switch.on .emp-switch-knob { transform: translateX(16px); }
.emp-card-desc {
  margin: 0;
  font-size: 12px;
  line-height: 1.48;
  color: var(--muted, #52627a);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 35px;
}
.emp-card-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.emp-chip {
  padding: 2px 7px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
}
.emp-chip.sky { background: rgba(14, 165, 233, 0.12); color: #0284c7; }
.emp-chip.indigo { background: rgba(99, 102, 241, 0.11); color: #4f46e5; }
.emp-chip.neutral { background: var(--surface, #f3f5f8); color: var(--muted, #52627a); }
.emp-card-err {
  font-size: 11px;
  color: #b91c1c;
  background: rgba(239, 68, 68, 0.08);
  padding: 4px 8px;
  border-radius: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.emp-card-foot {
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid color-mix(in srgb, var(--border, #e5e8ef) 70%, transparent);
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.emp-card-stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--muted, #64748b);
  font-variant-numeric: tabular-nums;
}
.emp-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #cbd5e1;
}
.emp-dot.on { background: #10b981; }
.emp-dot.err { background: #ef4444; }
.emp-card-btns {
  display: flex;
  align-items: center;
  gap: 5px;
}
.emp-mini-btn {
  flex: 1;
  height: 26px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid rgba(99, 102, 241, 0.25);
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  font: inherit;
  font-size: 11px;
  font-weight: 550;
  cursor: pointer;
}
.emp-mini-btn:hover:not(:disabled) {
  background: #6366f1;
  color: #ffffff;
}
.emp-mini-btn.ghost {
  flex: 0 0 auto;
  border-color: var(--border, #dce2ec);
  background: var(--panel, #ffffff);
  color: var(--text, #334155);
}
.emp-mini-btn.ghost:hover:not(:disabled) {
  border-color: rgba(99, 102, 241, 0.35);
  background: rgba(99, 102, 241, 0.06);
  color: #4f46e5;
}

/* 右侧抽屉（浮层叠加，不挤压左侧卡片列表） */
.emp-drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  width: min(440px, calc(100% - 24px));
  max-width: 460px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border, #e5e8ef);
  background: color-mix(in srgb, var(--panel, #ffffff) 96%, transparent);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: -16px 0 40px rgba(15, 23, 42, 0.16);
}
.emp-drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border, #e5e8ef);
  background: color-mix(in srgb, #6366f1 3%, var(--panel, #ffffff));
}
.emp-drawer-title-wrap h3 { margin: 0; font-size: 14.5px; color: var(--heading, #0f172a); }
.emp-drawer-title-wrap small { font-size: 11px; color: var(--muted, #94a3b8); }
.emp-close-btn {
  width: 26px;
  height: 26px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--muted, #64748b);
  font-size: 18px;
  cursor: pointer;
}
.emp-close-btn:hover { background: var(--surface, #f1f5f9); color: var(--text, #1e293b); }
.emp-drawer-tabs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 3px;
  margin: 10px 16px 0;
  padding: 3px;
  border-radius: 9px;
  background: var(--surface, #f2f4f8);
  border: 1px solid var(--border, #e2e8f0);
}
.emp-drawer-tabs button {
  height: 26px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--muted, #64748b);
  font: inherit;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.emp-drawer-tabs button.active {
  background: var(--panel, #ffffff);
  color: #4f46e5;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}
.emp-drawer-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.emp-field { display: flex; flex-direction: column; gap: 5px; }
.emp-field label { font-size: 12px; font-weight: 600; color: var(--text, #334155); }
.emp-field input[type='text'],
.emp-field input[type='url'],
.emp-field input[type='number'],
.emp-field select,
.emp-field textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--border, #dce2ec);
  border-radius: 9px;
  padding: 8px 10px;
  background: var(--panel, #ffffff);
  color: var(--text, #1e293b);
  font: inherit;
  font-size: 12px;
}
.emp-field textarea.mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11.5px; }
.emp-field input:focus,
.emp-field select:focus,
.emp-field textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.14);
}
.emp-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.emp-row-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.emp-label-inline { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.emp-link-btn {
  border: 0;
  background: transparent;
  color: #4f6ef7;
  font: inherit;
  font-size: 11.5px;
  font-weight: 550;
  padding: 0;
  cursor: pointer;
}
.emp-check-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12px;
  color: var(--text, #334155);
  cursor: pointer;
}
.emp-check-row input { margin-top: 2px; accent-color: #6366f1; }
.emp-skill-list { display: flex; flex-direction: column; gap: 6px; }
.emp-skill-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 9px;
  border: 1px solid var(--border, #e2e8f0);
  background: var(--panel, #ffffff);
  cursor: pointer;
}
.emp-skill-item input { margin-top: 2px; accent-color: #6366f1; }
.emp-skill-item strong { display: block; font-size: 12px; color: var(--heading, #0f172a); }
.emp-skill-item small { display: block; font-size: 11px; color: var(--muted, #64748b); margin-top: 1px; }
.emp-sub-empty {
  padding: 18px 12px;
  border-radius: 10px;
  background: var(--surface, #f6f8fc);
  font-size: 12px;
  color: var(--muted, #64748b);
  text-align: center;
  line-height: 1.6;
}
.emp-fb-list { display: flex; flex-direction: column; gap: 6px; }
.emp-fb-row {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 9px;
  border-radius: 8px;
  background: var(--surface, #f6f8fc);
  font-size: 11.5px;
}
.emp-fb-tag {
  padding: 1px 6px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 600;
  flex: none;
}
.emp-fb-tag.keep { background: rgba(16, 185, 129, 0.14); color: #059669; }
.emp-fb-tag.skip { background: rgba(245, 158, 11, 0.14); color: #d97706; }
.emp-fb-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.emp-fb-cat { color: var(--muted, #64748b); flex: none; }
.emp-fb-del { border: 0; background: transparent; color: var(--muted, #94a3b8); cursor: pointer; }

.emp-logs-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 11.5px;
  color: var(--muted, #64748b);
}
.emp-run-list { display: flex; flex-direction: column; gap: 8px; }
.emp-run-card {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--border, #e2e8f0);
  background: var(--panel, #ffffff);
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.emp-run-top { display: flex; align-items: center; gap: 7px; font-size: 11px; }
.emp-run-badge { padding: 1px 7px; border-radius: 999px; font-weight: 600; }
.emp-run-badge.analyzed { background: rgba(16, 185, 129, 0.14); color: #059669; }
.emp-run-badge.skipped-gate { background: rgba(245, 158, 11, 0.14); color: #b45309; }
.emp-run-badge.skipped-no-sub { background: var(--surface, #f1f5f9); color: var(--muted, #64748b); }
.emp-run-badge.error { background: rgba(239, 68, 68, 0.12); color: #dc2626; }
.emp-run-cat { color: #4f46e5; font-weight: 550; }
.emp-run-time { margin-left: auto; color: var(--muted, #94a3b8); }
.emp-run-title { font-size: 12.5px; font-weight: 600; color: var(--heading, #0f172a); }
.emp-run-reason { margin: 0; font-size: 11.5px; color: var(--muted, #52627a); line-height: 1.45; }
.emp-run-trace { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 2px; }
.emp-trace-pill {
  padding: 2px 7px;
  border-radius: 6px;
  background: rgba(99, 102, 241, 0.08);
  color: #4f46e5;
  font-size: 10.5px;
}
.emp-trace-pill.fail { background: rgba(239, 68, 68, 0.08); color: #dc2626; }
.emp-run-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 3px;
  font-size: 11px;
}
.emp-run-links { display: flex; align-items: center; gap: 10px; }
.emp-run-links a { color: #4f6ef7; text-decoration: none; }
.emp-run-fb-btns { display: flex; gap: 5px; }
.emp-run-fb-btns button {
  padding: 2px 7px;
  border-radius: 999px;
  border: 1px solid var(--border, #dce2ec);
  background: var(--surface, #f8fafc);
  color: var(--text, #334155);
  font: inherit;
  font-size: 10.5px;
  cursor: pointer;
}
.emp-run-fb-btns button:hover { border-color: #6366f1; color: #4f46e5; }

.emp-drawer-foot {
  padding: 12px 18px;
  border-top: 1px solid var(--border, #e5e8ef);
  background: color-mix(in srgb, var(--surface, #f7f8fb) 65%, transparent);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.emp-drawer-foot-right { display: flex; align-items: center; gap: 8px; }
@media (max-width: 820px) {
  .emp-drawer {
    position: absolute;
    inset: 0 0 0 auto;
    width: min(420px, 100%);
    max-width: 100%;
    z-index: 20;
  }
}
</style>
