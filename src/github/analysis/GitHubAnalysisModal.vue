<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import {
  githubAnalysisState as state,
  githubAnalysisController as controller,
  type AnalysisTab
} from "./analysis-store";

const windowRef = ref<HTMLElement | null>(null);
const pos = ref<{ x: number; y: number }>({
  x: Math.max(20, Math.round((window.innerWidth - 640) / 2)),
  y: Math.max(40, Math.round((window.innerHeight - 560) / 2))
});
const pageVisible = ref(!document.hidden);
let pagePresent = true;
let dragTarget: HTMLElement | undefined;
let dragPointer = 0;
function stopDrag() {
  if (dragTarget?.hasPointerCapture(dragPointer)) dragTarget.releasePointerCapture(dragPointer);
  dragTarget = undefined; isDragging = false;
}
let isDragging = false;
let startMouseX = 0;
let startMouseY = 0;
let startPosX = 0;
let startPosY = 0;

const showTreeOnly = ref(false);
const diagramViewMode = ref<"graph" | "mermaid">("graph");
const archifyViewMode = ref<"graph" | "json">("graph");
const isToolMenuOpen = ref(false);
const submissionBusy = computed(() => !!state.actionBusy || state.n8nSubmitting);
const contentReady = computed(() => {
  if (state[state.activeTab].loading) return false;
  const content = state.activeTab === "gitingest" ? state.gitingest.fullText : state.activeTab === "gitdiagram" ? state.gitdiagram.mermaidCode : state.activeTab === "archify" ? state.archify.rawJson : state.deepwiki.wikiMarkdown;
  return !!content.trim();
});

const toolOptions: { tab: AnalysisTab; label: string; desc: string }[] = [
  { tab: "gitingest", label: "代码采样", desc: "本地 Git Tree / Blob 读取" },
  { tab: "gitdiagram", label: "目录示意", desc: "关键词规则，不是已验证架构" },
  { tab: "archify", label: "结构示意", desc: "本地模板，无源码行号证据" },
  { tab: "deepwiki", label: "README 摘录", desc: "读取文档，不调用在线 DeepWiki" }
];

const currentToolLabel = computed(() => {
  const cur = toolOptions.find((t) => t.tab === state.activeTab);
  return cur ? cur.label : "选择工具";
});

function selectTool(tab: AnalysisTab) {
  controller.setTab(tab);
  isToolMenuOpen.value = false;
}

function handleGlobalClick(e: MouseEvent) {
  if (!(e.target as HTMLElement).closest(".analysis-tool-dropdown-wrap")) {
    isToolMenuOpen.value = false;
  }
}

watch(
  () => state.isOpen,
  (open) => {
    if (open) {
      const w = windowRef.value?.offsetWidth || 640;
      const h = windowRef.value?.offsetHeight || 560;
      pos.value = {
        x: Math.max(20, Math.round((window.innerWidth - w) / 2)),
        y: Math.max(40, Math.round((window.innerHeight - h) / 2))
      };
      showTreeOnly.value = false;
    }
  }
);

function onHeaderPointerDown(e: PointerEvent) {
  if ((e.target as HTMLElement).closest("button, a, input, select")) return;
  if (!state.isOpen || !pageVisible.value) return;
  stopDrag();
  const header = e.currentTarget as HTMLElement;
  dragTarget = header; dragPointer = e.pointerId;
  try {
    header.setPointerCapture(e.pointerId);
  } catch (_) {}
  isDragging = true;
  startMouseX = e.clientX;
  startMouseY = e.clientY;
  startPosX = pos.value.x;
  startPosY = pos.value.y;
}

function onHeaderPointerMove(e: PointerEvent) {
  if (!isDragging) return;
  const dx = e.clientX - startMouseX;
  const dy = e.clientY - startMouseY;
  pos.value = {
    x: Math.max(10, Math.min(window.innerWidth - 100, startPosX + dx)),
    y: Math.max(10, Math.min(window.innerHeight - 60, startPosY + dy))
  };
}

function onHeaderPointerUp(_e: PointerEvent) { stopDrag(); }

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && state.isOpen) {
    controller.close();
  }
}

function visibility() {
  pageVisible.value = pagePresent && !document.hidden;
  controller.setPageActive(pageVisible.value);
}
function pageHide() { pagePresent = false; visibility(); }
function pageShow() { pagePresent = true; visibility(); }
watch(() => [state.isOpen, state.fullName, state.activeTab, pageVisible.value], () => {
  stopDrag(); isToolMenuOpen.value = false;
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("click", handleGlobalClick);
  if (state.isOpen && pageVisible.value) {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("click", handleGlobalClick);
  }
}, { immediate: true, flush: "sync" });
onMounted(() => {
  document.addEventListener("visibilitychange", visibility);
  window.addEventListener("pagehide", pageHide);
  window.addEventListener("pageshow", pageShow);
  visibility();
});
onUnmounted(() => {
  stopDrag(); controller.setPageActive(false);
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("click", handleGlobalClick);
  document.removeEventListener("visibilitychange", visibility);
  window.removeEventListener("pagehide", pageHide);
  window.removeEventListener("pageshow", pageShow);
});
</script>

<template>
  <Teleport to="body">
    <div v-if="state.isOpen" class="analysis-modal-overlay">
      <!-- 🌟 非模态独立桌面分析视窗：0模糊、0暗黑遮罩、实体白底黑字、支持自由拖动与拉伸 -->
      <div
        ref="windowRef"
        class="analysis-modal-window"
        :style="{ position: 'fixed', left: `${pos.x}px`, top: `${pos.y}px`, margin: '0', transform: 'none' }"
        role="dialog"
        aria-modal="false"
      >
        <!-- 标题栏与标签切换 (PointerCapture 跟手拖拽) -->
        <header
          class="analysis-header"
          @pointerdown="onHeaderPointerDown"
          @pointermove="onHeaderPointerMove"
          @pointerup="onHeaderPointerUp"
          @pointercancel="onHeaderPointerUp"
        >
          <div class="analysis-tabs">
            <span class="analysis-repo-chip" :title="state.fullName">
              {{ state.fullName.split("/")[1] || state.fullName }}
            </span>
            <!-- 🌟 下拉切换工具菜单 (4合1，彻底释放横向空间，告别按钮被挤压换行) -->
            <div class="analysis-tool-dropdown-wrap" @click.stop>
              <button
                type="button"
                class="analysis-dropdown-trigger"
                :class="{ open: isToolMenuOpen }"
                title="点击切换分析工具"
                @click="isToolMenuOpen = !isToolMenuOpen"
              >
                <span class="active-tool-name">{{ currentToolLabel }}</span>
                <span class="dropdown-arrow">▾</span>
              </button>
              <div v-show="isToolMenuOpen" class="analysis-dropdown-menu">
                <button
                  v-for="tool in toolOptions"
                  :key="tool.tab"
                  type="button"
                  class="dropdown-menu-item"
                  :class="{ active: state.activeTab === tool.tab }"
                  @click="selectTool(tool.tab)"
                >
                  <span class="item-title">{{ tool.label }}</span>
                  <span class="item-hint">{{ tool.desc }}</span>
                  <span v-if="state.activeTab === tool.tab" class="item-check">✓</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 工具栏动作 -->
          <div class="analysis-actions">
            <button type="button" class="analysis-tool-btn" :disabled="submissionBusy || state[state.activeTab].loading" @click="controller.refreshCurrent">重新读取 / 生成</button>
            <button
              v-if="state.activeTab === 'archify'"
              type="button"
              class="analysis-tool-btn n8n"
              title="确认后提交到 GitHub 设置中的 n8n Webhook"
              :disabled="submissionBusy || !!state.n8nConfirmation || !!state.n8nResult?.uncertain || state.archify.loading || !state.archify.data"
              @click="controller.triggerN8nWorkflow"
            >
              发往 n8n
            </button>
            <button
              type="button"
              class="analysis-tool-btn"
              title="复制当前文本（喂给 LLM / 存档）"
              :disabled="submissionBusy || !contentReady"
              @click="controller.copyCurrentContent"
            >
              复制
            </button>
            <button
              type="button"
              class="analysis-close-btn"
              title="关闭视窗 (Esc)"
              @click="controller.close"
            >
              ✕
            </button>
          </div>
        </header>

        <!-- 主体内容区域 -->
        <main class="analysis-body">
          <p class="analysis-source-notice" v-if="state.activeTab === 'gitingest'">本地代码采样：最多18个文件，每个最多64KiB、展示8000字符；目录预览最多150项，不是完整仓库或 AI 分析。</p>
          <p class="analysis-source-notice" v-else-if="state.activeTab === 'deepwiki'">GitHub README 摘录；不是 DeepWiki 在线服务，没有 AI 推理或未经验证的功能介绍。</p>
          <p class="analysis-source-notice" v-else>本地目录关键词与固定模板示意。节点、连接、协议未经源码验证，不是 GitDiagram / Archify 在线分析，也不提供源码证据。</p>
          <p v-if="state.actionMessage" class="analysis-source-notice" role="status">{{ state.actionMessage }}</p>
          <p v-if="state.actionBusy" class="analysis-source-notice" role="status">{{ state.actionBusy === "save" ? "原目标笔记保存仍在进行；切换或关闭窗口不撤回写入。" : "正在等待剪贴板确认；不会自动重试。" }}</p>
          <section v-if="state.n8nResult" class="n8n-confirm-inline" aria-label="上次提交记录">
            <p>提交记录：{{ state.n8nResult.repo }} → {{ state.n8nResult.origin }}。{{ state.n8nResult.message }}</p>
            <template v-if="state.n8nResult.uncertain">
              <p>这是本页内存记录，整页关闭或重载会丢失；扩展没有自动核对节点任务的接口。</p>
              <button v-if="!state.n8nUnlockConfirmation" type="button" class="analysis-tool-btn" :disabled="submissionBusy" @click="controller.requestN8nUnlock">我已在节点侧核对</button>
              <template v-else>
                <p>确认已人工核对上述原仓库任务？此操作仅解除本页限制，不证明远端成功，也不会重新发送请求。</p>
                <button type="button" class="analysis-tool-btn" :disabled="submissionBusy" @click="controller.acknowledgeN8nChecked">确认解除本页限制</button>
                <button type="button" class="analysis-tool-btn" @click="controller.cancelN8nUnlock">保持锁定</button>
              </template>
            </template>
          </section>
          <section v-if="state.n8nConfirmation" class="n8n-confirm-inline" aria-label="确认提交 n8n">
            <p>将 {{ state.n8nConfirmation.repo }} 的仓库名与架构数据发送到已配置节点 {{ state.n8nConfirmation.origin }}。内容是本地规则示意，不是已验证架构；可能含仓库路径，请确认节点可信，不发送 GitHub Token 或 AI 密钥。</p>
            <button type="button" class="analysis-tool-btn primary" :disabled="state.n8nSubmitting" @click="controller.confirmN8nWorkflow">确认提交</button>
            <button type="button" class="analysis-tool-btn" :disabled="state.n8nSubmitting" @click="controller.cancelN8nWorkflow">取消</button>
          </section>
          <p v-if="state.n8nSubmitting" role="status">正在准备或等待节点响应。关闭窗口不撤回已提交请求；请求发出后等待最长15秒，结果记录在原任务名下。</p>
          <!-- 1. GitIngest 板块 -->
          <div v-if="state.activeTab === 'gitingest'" class="analysis-pane">
            <div class="analysis-stat-bar">
              <span class="stat-pill">返回路径数: <b>{{ state.gitingest.fileCount }}</b></span>
              <span class="stat-pill">预估 Tokens: <b>~{{ state.gitingest.tokenCount.toLocaleString() }}</b></span>
              <div class="stat-toggle">
                <button
                  type="button"
                  class="toggle-chip"
                  :class="{ active: !showTreeOnly }"
                  @click="showTreeOnly = false"
                >
                  采样代码 Prompt
                </button>
                <button
                  type="button"
                  class="toggle-chip"
                  :class="{ active: showTreeOnly }"
                  @click="showTreeOnly = true"
                >
                  仅目录树
                </button>
              </div>
            </div>

            <div v-if="state.gitingest.loading" class="analysis-loading">
              <div class="loading-spin">⚡</div>
              <p>{{ state.gitingest.progress || "正在抓取仓库并提炼…" }}</p>
            </div>
            <div v-else-if="state.gitingest.error" class="analysis-error">
              ⚠️ {{ state.gitingest.error }}
            </div>
            <div v-else class="analysis-code-viewport">
              <pre class="analysis-pre"><code>{{ showTreeOnly ? state.gitingest.treeText : state.gitingest.fullText }}</code></pre>
            </div>
          </div>

          <!-- 2. GitDiagram 板块 -->
          <div v-else-if="state.activeTab === 'gitdiagram'" class="analysis-pane">
            <div class="analysis-stat-bar">
              <span class="stat-pill">规则节点: <b>{{ state.gitdiagram.graph?.nodes.length || 0 }} 个</b></span>
              <span class="stat-pill">示意连接: <b>{{ state.gitdiagram.graph?.edges.length || 0 }} 条</b></span>
              <div class="stat-toggle">
                <button
                  type="button"
                  class="toggle-chip"
                  :class="{ active: diagramViewMode === 'graph' }"
                  @click="diagramViewMode = 'graph'"
                >
                  架构拓扑图
                </button>
                <button
                  type="button"
                  class="toggle-chip"
                  :class="{ active: diagramViewMode === 'mermaid' }"
                  @click="diagramViewMode = 'mermaid'"
                >
                  Mermaid 代码
                </button>
              </div>
            </div>

            <div v-if="state.gitdiagram.loading" class="analysis-loading">
              <div class="loading-spin">⚡</div>
              <p>正在为仓库绘制架构拓扑图…</p>
            </div>
            <div v-else-if="state.gitdiagram.error" class="analysis-error">
              ⚠️ {{ state.gitdiagram.error }}
            </div>
            <div v-else-if="diagramViewMode === 'mermaid'" class="analysis-diagram-viewport">
              <pre class="analysis-pre mermaid-pre"><code>{{ state.gitdiagram.mermaidCode }}</code></pre>
            </div>
            <!-- 🌟 真正的 SVG 交互式架构拓扑大图 -->
            <div v-else class="analysis-canvas-viewport">
              <svg
                v-if="state.gitdiagram.graph"
                class="diagram-svg-canvas"
                :viewBox="`0 0 ${state.gitdiagram.graph.width} ${state.gitdiagram.graph.height}`"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <!-- 连线箭头 -->
                  <marker
                    id="diagram-arrow"
                    viewBox="0 0 10 10"
                    refX="9"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
                  </marker>
                </defs>

                <!-- 连线层 -->
                <g class="diagram-edges">
                  <g v-for="(edge, idx) in state.gitdiagram.graph.edges" :key="idx" class="edge-group">
                    <path :d="edge.pathD" class="edge-glow-line" />
                    <path :d="edge.pathD" class="edge-main-line" marker-end="url(#diagram-arrow)" />
                  </g>
                </g>

                <!-- 架构节点层 -->
                <g class="diagram-nodes">
                  <g
                    v-for="node in state.gitdiagram.graph.nodes"
                    :key="node.id"
                    class="node-group"
                    :transform="`translate(${node.x}, ${node.y})`"
                  >
                    <!-- 节点外壳 -->
                    <rect
                      class="node-rect"
                      :class="`type-${node.category}`"
                      :width="node.width"
                      :height="node.height"
                      rx="8"
                    />
                    <!-- 分类标签 -->
                    <text class="node-category-tag" x="12" y="20">{{ node.categoryLabel }}</text>
                    <!-- 模块名称 -->
                    <text class="node-title" x="12" y="38">{{ node.name }}</text>
                    <!-- 简述 -->
                    <text class="node-desc" x="12" y="56">{{ node.desc }}</text>
                  </g>
                </g>
              </svg>
            </div>
          </div>

          <!-- 3. Archify 板块 (强类型零像素架构与源码证据追踪) -->
          <div v-else-if="state.activeTab === 'archify'" class="analysis-pane">
            <div class="analysis-stat-bar">
              <span class="stat-pill">架构组件: <b>{{ state.archify.data?.nodes.length || 0 }} 个</b></span>
              <span class="stat-pill">模板分组: <b>{{ state.archify.data?.clusters.length || 0 }} 个</b></span>
              <div class="stat-toggle">
                <button
                  type="button"
                  class="toggle-chip"
                  :class="{ active: archifyViewMode === 'graph' }"
                  @click="archifyViewMode = 'graph'"
                >
                  交互式图谱
                </button>
                <button
                  type="button"
                  class="toggle-chip"
                  :class="{ active: archifyViewMode === 'json' }"
                  @click="archifyViewMode = 'json'"
                >
                  强类型 JSON IR
                </button>
              </div>
            </div>

            <div v-if="state.archify.loading" class="analysis-loading">
              <div class="loading-spin">⚡</div>
              <p>正在生成本地规则示意…</p>
            </div>
            <div v-else-if="state.archify.error" class="analysis-error">
              ⚠️ {{ state.archify.error }}
            </div>
            <div v-else-if="archifyViewMode === 'json'" class="analysis-code-viewport">
              <pre class="analysis-pre"><code>{{ state.archify.rawJson }}</code></pre>
            </div>
            <!-- 🌟 Archify 原生编译高保真矢量拓扑与证据标牌 -->
            <div v-else class="analysis-canvas-viewport archify-viewport">
              <svg
                v-if="state.archify.data"
                class="diagram-svg-canvas"
                :viewBox="`0 0 ${state.archify.data.width} ${state.archify.data.height}`"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <marker
                    id="archify-arrow"
                    viewBox="0 0 10 10"
                    refX="9"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
                  </marker>
                </defs>

                <!-- 集群边界层 (Boundaries) -->
                <g class="archify-clusters">
                  <g v-for="c in state.archify.data.clusters" :key="c.id">
                    <rect
                      class="cluster-rect"
                      :x="c.x"
                      :y="c.y"
                      :width="c.width"
                      :height="c.height"
                      rx="10"
                    />
                    <text class="cluster-title" :x="c.x + 12" :y="c.y + 20">{{ c.name }}</text>
                  </g>
                </g>

                <!-- 关系连线层 -->
                <g class="diagram-edges">
                  <g v-for="(edge, idx) in state.archify.data.edges" :key="idx" class="edge-group">
                    <path :d="edge.pathD" class="edge-glow-line" />
                    <path :d="edge.pathD" class="edge-main-line" marker-end="url(#archify-arrow)" />
                  </g>
                </g>

                <!-- 架构节点层 (带 SRC 证据标牌) -->
                <g class="diagram-nodes">
                  <g
                    v-for="node in state.archify.data.nodes"
                    :key="node.id"
                    class="node-group"
                    :transform="`translate(${node.x}, ${node.y})`"
                  >
                    <!-- 节点主体外壳 -->
                    <rect
                      class="node-rect"
                      :class="`type-${node.role}`"
                      :width="node.width"
                      :height="node.height"
                      rx="8"
                    />
                    <!-- 角色分类 -->
                    <text class="node-category-tag" x="12" y="22">{{ node.roleLabel }}</text>
                    <!-- 🌟 Archify 独门源码证据胶囊 (SRC) -->
                    <g :transform="`translate(${node.width - 64}, 10)`">
                      <rect class="src-pill-bg" width="54" height="16" rx="3" />
                      <text class="src-pill-text" x="27" y="11.5" text-anchor="middle">未验证</text>
                    </g>
                    <!-- 模块名称 -->
                    <text class="node-title" x="12" y="42">{{ node.label }}</text>
                    <!-- 代码源码路径 -->
                    <text class="node-source-ref" x="12" y="60">📍 {{ node.sourceRef }}</text>
                    <!-- 通信协议 -->
                    <text class="node-protocol-tag" x="12" y="78">⚡ {{ node.protocol }}</text>
                  </g>
                </g>
              </svg>
            </div>
          </div>

          <!-- 4. DeepWiki 板块 -->
          <div v-else-if="state.activeTab === 'deepwiki'" class="analysis-pane">
            <div v-if="state.deepwiki.loading" class="analysis-loading">
              <div class="loading-spin">🌐</div>
              <p>正在读取 README 文档…</p>
            </div>
            <div v-else-if="state.deepwiki.error" class="analysis-error">
              ⚠️ {{ state.deepwiki.error }}
            </div>
            <div v-else class="analysis-wiki-viewport">
              <pre class="analysis-pre wiki-pre"><code>{{ state.deepwiki.wikiMarkdown }}</code></pre>
            </div>
          </div>
        </main>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.analysis-source-notice { margin: 10px 16px; font-size: 12px; line-height: 1.6; color: #475569; }

/* 全局透明穿透，绝无高斯模糊（0 blur） */
.analysis-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100000;
  background: transparent !important;
  pointer-events: none;
}

/* 实体白底黑字便签视窗 (640px × 560px) */
.analysis-modal-window {
  pointer-events: auto;
  position: fixed;
  width: 640px;
  height: 560px;
  min-width: 380px;
  min-height: 320px;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 40px);
  background: #ffffff !important;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 20px 48px -10px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  resize: both;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  color: #111827;
}

:root[data-theme="dark"] .analysis-modal-window,
:root[data-theme="endfield"] .analysis-modal-window {
  background: #1e293b !important;
  border-color: rgba(255, 255, 255, 0.15);
  color: #f1f5f9;
  box-shadow: 0 24px 60px -10px rgba(0, 0, 0, 0.7);
}

/* 标题栏 */
.analysis-header {
  height: 42px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  cursor: grab;
  user-select: none;
  flex-shrink: 0;
}
.analysis-header:active {
  cursor: grabbing;
}
:root[data-theme="dark"] .analysis-header,
:root[data-theme="endfield"] .analysis-header {
  background: #0f172a !important;
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.analysis-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
}

.analysis-repo-chip {
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
  background: rgba(0, 0, 0, 0.06);
  padding: 2px 8px;
  border-radius: 6px;
  margin-right: 4px;
  white-space: nowrap;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
}
:root[data-theme="dark"] .analysis-repo-chip,
:root[data-theme="endfield"] .analysis-repo-chip {
  color: #f8fafc;
  background: rgba(255, 255, 255, 0.08);
}

.analysis-tab-btn {
  height: 26px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: transparent;
  font-size: 11.5px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.15s ease;
}
.analysis-tab-btn:hover {
  background: rgba(0, 0, 0, 0.04);
  color: #0f172a;
}
.analysis-tab-btn.active {
  background: #ffffff;
  color: #0284c7;
  border-color: rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
:root[data-theme="dark"] .analysis-tab-btn.active,
:root[data-theme="endfield"] .analysis-tab-btn.active {
  background: #334155;
  color: #38bdf8;
  border-color: rgba(255, 255, 255, 0.12);
}

.analysis-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.analysis-tool-btn {
  height: 24px;
  padding: 0 8px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #ffffff;
  font-size: 11px;
  font-weight: 550;
  color: #334155;
  cursor: pointer;
}
.analysis-tool-btn:hover {
  background: #f1f5f9;
}
.analysis-tool-btn.primary {
  background: #0284c7;
  color: #ffffff;
  border-color: #0284c7;
}
.analysis-tool-btn.primary:hover {
  background: #0369a1;
}
.analysis-tool-btn.n8n {
  background: #ea580c;
  color: #ffffff;
  border-color: #ea580c;
  font-weight: 600;
}
.analysis-tool-btn.n8n:hover {
  background: #c2410c;
}
:root[data-theme="dark"] .analysis-tool-btn,
:root[data-theme="endfield"] .analysis-tool-btn {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.12);
  color: #f1f5f9;
}

.analysis-close-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 13px;
  border-radius: 4px;
  cursor: pointer;
}
.analysis-close-btn:hover {
  background: #fee2e2;
  color: #ef4444;
}

/* 主体内容 */
.analysis-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fafafa;
}
:root[data-theme="dark"] .analysis-body,
:root[data-theme="endfield"] .analysis-body {
  background: #0f172a;
}

.analysis-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 统计条 */
.analysis-stat-bar {
  height: 32px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f1f5f9;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  font-size: 11px;
  color: #475569;
}
:root[data-theme="dark"] .analysis-stat-bar,
:root[data-theme="endfield"] .analysis-stat-bar {
  background: #1e293b;
  border-bottom-color: rgba(255, 255, 255, 0.06);
  color: #94a3b8;
}

.stat-pill b {
  color: #0284c7;
}
:root[data-theme="dark"] .stat-pill b {
  color: #38bdf8;
}

.stat-toggle {
  margin-left: auto;
  display: flex;
  gap: 4px;
}
.toggle-chip {
  font-size: 10.5px;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #ffffff;
  color: #64748b;
  cursor: pointer;
}
.toggle-chip.active {
  background: #0284c7;
  color: #ffffff;
  border-color: #0284c7;
}

/* 载入与报错 */
.analysis-loading {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #64748b;
  font-size: 13px;
}
.loading-spin {
  font-size: 28px;
  animation: fo-spin 1.2s linear infinite;
}
@keyframes fo-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.analysis-error {
  margin: 20px;
  padding: 12px 14px;
  border-radius: 8px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #ef4444;
  font-size: 12px;
}

.analysis-code-viewport,
.analysis-diagram-viewport,
.analysis-wiki-viewport {
  flex: 1;
  overflow: auto;
  padding: 12px 16px;
}

/* 🌟 SVG 架构拓扑大图画布 */
.analysis-canvas-viewport {
  flex: 1;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: #f8fafc;
}
:root[data-theme="dark"] .analysis-canvas-viewport,
:root[data-theme="endfield"] .analysis-canvas-viewport {
  background: #0b1120;
}

.diagram-svg-canvas {
  width: 100%;
  height: 100%;
  max-height: 440px;
  min-width: 640px;
  user-select: none;
}

/* 连线与动画 */
.edge-main-line {
  stroke: #0284c7;
  stroke-width: 2px;
  fill: none;
  stroke-dasharray: 6 3;
  animation: edgeFlow 1.2s linear infinite;
}
.edge-glow-line {
  stroke: rgba(2, 132, 199, 0.15);
  stroke-width: 6px;
  fill: none;
}
@keyframes edgeFlow {
  0% { stroke-dashoffset: 9; }
  100% { stroke-dashoffset: 0; }
}

/* 节点外观：彻底移除 transform 避免乱跳抽搐，采用纯边框与发光高亮 */
.node-group {
  cursor: pointer;
}
.node-group:hover .node-rect {
  stroke-width: 2.5px;
  filter: drop-shadow(0 4px 14px rgba(2, 132, 199, 0.35));
}
.node-rect {
  stroke-width: 1.5px;
  transition: stroke-width 0.15s ease, filter 0.15s ease;
}
.type-ui { stroke: #0284c7; fill: #f0f9ff; }
.type-service { stroke: #3b82f6; fill: #eff6ff; }
.type-store { stroke: #8b5cf6; fill: #f5f3ff; }
.type-network { stroke: #10b981; fill: #ecfdf5; }
.type-storage { stroke: #f59e0b; fill: #fffbeb; }
.type-worker { stroke: #ec4899; fill: #fdf2f8; }

:root[data-theme="dark"] .type-ui,
:root[data-theme="endfield"] .type-ui { stroke: #38bdf8; fill: #0f2744; }
:root[data-theme="dark"] .type-service,
:root[data-theme="endfield"] .type-service { stroke: #60a5fa; fill: #172554; }
:root[data-theme="dark"] .type-store,
:root[data-theme="endfield"] .type-store { stroke: #a78bfa; fill: #2e1065; }
:root[data-theme="dark"] .type-network,
:root[data-theme="endfield"] .type-network { stroke: #34d399; fill: #064e3b; }
:root[data-theme="dark"] .type-storage,
:root[data-theme="endfield"] .type-storage { stroke: #fbbf24; fill: #451a03; }
:root[data-theme="dark"] .type-worker,
:root[data-theme="endfield"] .type-worker { stroke: #f472b6; fill: #500724; }

.node-category-tag {
  font-size: 10.5px;
  font-weight: 700;
  fill: #0369a1;
  letter-spacing: 0.5px;
}
:root[data-theme="dark"] .node-category-tag,
:root[data-theme="endfield"] .node-category-tag {
  fill: #38bdf8;
}

.node-title {
  font-size: 13.5px;
  font-weight: 700;
  fill: #0f172a;
}
:root[data-theme="dark"] .node-title,
:root[data-theme="endfield"] .node-title {
  fill: #f8fafc;
}

.node-desc {
  font-size: 10px;
  fill: #475569;
}
:root[data-theme="dark"] .node-desc,
:root[data-theme="endfield"] .node-desc {
  fill: #cbd5e1;
}

.diagram-info-banner {
  font-size: 11px;
  color: #64748b;
  margin-bottom: 8px;
}

.n8n-confirm-inline { padding:12px; margin-bottom:12px; border:1px solid var(--border); border-radius:6px; overflow-wrap:anywhere; }
.n8n-confirm-inline p { font-size:12px; line-height:1.5; }

/* 🌟 Archify 集群边界与源码证据标牌 */
.cluster-rect {
  fill: rgba(0, 0, 0, 0.015);
  stroke: rgba(0, 0, 0, 0.12);
  stroke-dasharray: 4 3;
}
:root[data-theme="dark"] .cluster-rect,
:root[data-theme="endfield"] .cluster-rect {
  fill: rgba(255, 255, 255, 0.02);
  stroke: rgba(255, 255, 255, 0.12);
}

.cluster-title {
  font-size: 11px;
  font-weight: 700;
  fill: #475569;
  letter-spacing: 0.5px;
}
:root[data-theme="dark"] .cluster-title,
:root[data-theme="endfield"] .cluster-title {
  fill: #94a3b8;
}

.src-pill-bg {
  fill: rgba(2, 132, 199, 0.12);
  stroke: #0284c7;
  stroke-width: 0.8px;
}
.src-pill-text {
  font-size: 9.5px;
  font-weight: 700;
  fill: #0284c7;
}
:root[data-theme="dark"] .src-pill-bg,
:root[data-theme="endfield"] .src-pill-bg {
  fill: rgba(56, 189, 248, 0.15);
  stroke: #38bdf8;
}
:root[data-theme="dark"] .src-pill-text,
:root[data-theme="endfield"] .src-pill-text {
  fill: #38bdf8;
}

.node-source-ref {
  font-size: 11px;
  font-weight: 600;
  fill: #0284c7;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
}
:root[data-theme="dark"] .node-source-ref,
:root[data-theme="endfield"] .node-source-ref {
  fill: #38bdf8;
}

.node-protocol-tag {
  font-size: 10px;
  font-weight: 550;
  fill: #475569;
}
:root[data-theme="dark"] .node-protocol-tag,
:root[data-theme="endfield"] .node-protocol-tag {
  fill: #94a3b8;
}

/* 🌟 下拉工具切换菜单 */
.analysis-tool-dropdown-wrap {
  position: relative;
  display: inline-flex;
}
.analysis-dropdown-trigger {
  height: 26px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #ffffff;
  font-size: 12px;
  font-weight: 600;
  color: #0284c7;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.15s ease;
}
.analysis-dropdown-trigger:hover,
.analysis-dropdown-trigger.open {
  background: #f0f9ff;
  border-color: #0284c7;
}
:root[data-theme="dark"] .analysis-dropdown-trigger,
:root[data-theme="endfield"] .analysis-dropdown-trigger {
  background: #1e293b;
  border-color: rgba(255, 255, 255, 0.15);
  color: #38bdf8;
}
:root[data-theme="dark"] .analysis-dropdown-trigger:hover,
:root[data-theme="endfield"] .analysis-dropdown-trigger:hover,
:root[data-theme="dark"] .analysis-dropdown-trigger.open,
:root[data-theme="endfield"] .analysis-dropdown-trigger.open {
  background: #0f172a;
  border-color: #38bdf8;
}

.dropdown-arrow {
  font-size: 10px;
  opacity: 0.7;
}

.analysis-dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 190px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 1000;
  animation: fo-pop-in 0.12s cubic-bezier(0.16, 1, 0.3, 1);
}
:root[data-theme="dark"] .analysis-dropdown-menu,
:root[data-theme="endfield"] .analysis-dropdown-menu {
  background: #1e293b;
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 14px 38px rgba(0, 0, 0, 0.5);
}

.dropdown-menu-item {
  width: 100%;
  padding: 7px 10px;
  border: none;
  background: transparent;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-align: left;
  transition: all 0.12s ease;
}
.dropdown-menu-item:hover {
  background: #f1f5f9;
}
:root[data-theme="dark"] .dropdown-menu-item:hover,
:root[data-theme="endfield"] .dropdown-menu-item:hover {
  background: rgba(255, 255, 255, 0.08);
}
.dropdown-menu-item.active {
  background: #f0f9ff;
}
:root[data-theme="dark"] .dropdown-menu-item.active,
:root[data-theme="endfield"] .dropdown-menu-item.active {
  background: rgba(56, 189, 248, 0.12);
}

.item-title {
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
}
:root[data-theme="dark"] .item-title,
:root[data-theme="endfield"] .item-title {
  color: #f8fafc;
}
.dropdown-menu-item.active .item-title {
  color: #0284c7;
}
:root[data-theme="dark"] .dropdown-menu-item.active .item-title {
  color: #38bdf8;
}

.item-hint {
  font-size: 10.5px;
  color: #64748b;
  margin-left: auto;
  margin-right: 6px;
}
.item-check {
  font-size: 11px;
  font-weight: bold;
  color: #0284c7;
}
:root[data-theme="dark"] .item-check {
  color: #38bdf8;
}

.analysis-pre {
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 11.5px;
  line-height: 1.55;
  color: #1e293b;
  white-space: pre-wrap;
  word-break: break-all;
  user-select: text;
}
:root[data-theme="dark"] .analysis-pre,
:root[data-theme="endfield"] .analysis-pre {
  color: #e2e8f0;
}
</style>
