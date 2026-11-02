<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const currentSpreadIndex = ref(0);

interface PageTopic {
  tag: string;
  title: string;
  badge?: string;
  steps: {
    icon: string;
    title: string;
    desc: string;
    tip?: string;
  }[];
}

interface Spread {
  chapterTitle: string;
  left: PageTopic;
  right: PageTopic;
}

const spreads: Spread[] = [
  {
    chapterTitle: "基础篇 · 文件夹与整理",
    left: {
      tag: "第 1 篇 · 结构搭建",
      title: "🗂️ 文件夹怎么创建？",
      badge: "基础技巧",
      steps: [
        {
          icon: "🖱️",
          title: "在空白处点击鼠标右键",
          desc: "常用网站的主界面没有突兀的新建按钮。请在图标之间的任意空白区域点击鼠标右键。"
        },
        {
          icon: "📐",
          title: "选择大文件夹或中文件夹",
          desc: "「大文件夹」内置 2×2 / 3×3 宫格实时预览，适合高频分类；「中文件夹」紧凑小巧，适合归档次要站点。"
        },
        {
          icon: "✏️",
          title: "命名与大小调整",
          desc: "点击文件夹标题可就地重命名；右键文件夹可随时在「大 / 中 / 小」尺寸之间自由切换。",
          tip: "小建议：右键文件夹还可以一键解散文件夹，里面的网站会自动释放到当前面板。"
        }
      ]
    },
    right: {
      tag: "第 2 篇 · 整理归纳",
      title: "🎯 网站怎么放进文件夹？",
      badge: "高频解惑",
      steps: [
        {
          icon: "🤔",
          title: "为什么拖动时总是换位置？",
          desc: "这是为了保护你的图标排版！当拖动到边缘时系统默认是「交换排序」，需要精准放入核心区。"
        },
        {
          icon: "🎯",
          title: "方式一：精准拖入核心区",
          desc: "按住网站图标拖拽，将光标平稳移到目标文件夹的正中央核心区域，看到高亮吸附框时松开鼠标即可。",
          tip: "核心吸附：文件夹四周亮起微蓝光晕时松手，即可稳妥收入！"
        },
        {
          icon: "⚡",
          title: "方式二：右键菜单直达（零失误）",
          desc: "在想要整理的网站图标上点击鼠标右键，找到「移动到文件夹」，在列表里直接点选目标文件夹。"
        }
      ]
    }
  },
  {
    chapterTitle: "进阶篇 · 分区与快捷技巧",
    left: {
      tag: "第 3 篇 · 分区分流",
      title: "📑 分区管理与快速流转",
      badge: "空间延展",
      steps: [
        {
          icon: "➕",
          title: "创建新分区（Tab）",
          desc: "点击右上角的「+」加号按钮，输入分类名（如：工作、娱乐、学习、资源），即可新增独立分区。"
        },
        {
          icon: "🚀",
          title: "跨分区快速迁移",
          desc: "按住任意网站卡片，直接拖动并悬停到顶部分区标签（Tab）上，松手就能把网站瞬间搬家过去。"
        },
        {
          icon: "🎡",
          title: "Shift + 滚轮平滑切区",
          desc: "按住键盘 Shift 键并在常用网站区域滑动鼠标滚轮，即可在多个分区之间平滑翻页切屏。",
          tip: "右键分区标签还可以对当前分区进行重命名或安全删除。"
        }
      ]
    },
    right: {
      tag: "第 4 篇 · 效率进阶",
      title: "✨ 快捷技巧与联动彩蛋",
      badge: "效率倍增",
      steps: [
        {
          icon: "📝",
          title: "网站备注与悬浮气泡",
          desc: "右键网站选择「修改备注」，可以为网站填写账号提示或说明，鼠标悬停时会以气泡优雅展示。"
        },
        {
          icon: "🔖",
          title: "原生书签无缝查看",
          desc: "点击常用网站左上角的「书签」切换器，即可无缝翻看浏览器原生书签栏，无需打开沉重的侧边栏。"
        },
        {
          icon: "⌨️",
          title: "极速搜索 Alt + S 直达",
          desc: "在任意时刻按下 Alt+S 或直接在空白处打字，即可瞬间唤出极速启动器，直达网址或搜索结果。",
          tip: "多端同步：在顶栏设置中开启配置同步，常用网站和文件夹可以在多台电脑间自动同步。"
        }
      ]
    }
  }
];

const currentSpread = computed(() => spreads[currentSpreadIndex.value] || spreads[0]);

function prevSpread() {
  if (currentSpreadIndex.value > 0) {
    currentSpreadIndex.value--;
  }
}

function nextSpread() {
  if (currentSpreadIndex.value < spreads.length - 1) {
    currentSpreadIndex.value++;
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (!props.open) return;
  if (e.key === "Escape") {
    emit("close");
  } else if (e.key === "ArrowLeft") {
    prevSpread();
  } else if (e.key === "ArrowRight") {
    nextSpread();
  }
}

function onWindowPointerDown(e: PointerEvent) {
  if (!props.open) return;
  const target = e.target as HTMLElement | null;
  // 点击问号按钮本身时不重复处理
  if (target?.closest(".launcher-page-help")) return;
  const bookEl = document.querySelector(".launcher-book-case");
  if (bookEl && !bookEl.contains(target as Node)) {
    emit("close");
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("pointerdown", onWindowPointerDown, true);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("pointerdown", onWindowPointerDown, true);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="book-fade">
      <!-- 纯无模态独立悬浮书本窗口：100% 实体纸张，绝不透光，无任何背景遮罩 -->
      <aside
        v-if="open"
        class="launcher-book-window"
        role="region"
        aria-label="常用网站使用手册"
      >
        <div class="launcher-book-case">
          <!-- 书本顶部装饰丝带与关闭 -->
          <button
            type="button"
            class="launcher-book-close-ribbon"
            title="合上说明书 (Esc)"
            aria-label="关闭指南"
            @click="emit('close')"
          >
            <span class="ribbon-tail"></span>
            <span class="ribbon-icon">✕</span>
          </button>

          <!-- 展开的双页主体（100% 实心纸面） -->
          <div class="launcher-book-spread">
            <!-- 左页 -->
            <div class="launcher-book-page page-left">
              <header class="page-header">
                <div class="page-meta">
                  <span class="page-tag">{{ currentSpread.left.tag }}</span>
                  <span v-if="currentSpread.left.badge" class="page-badge">{{ currentSpread.left.badge }}</span>
                </div>
                <span class="page-number">P. {{ currentSpreadIndex * 2 + 1 }}</span>
              </header>

              <div class="page-body">
                <h3 class="page-title">{{ currentSpread.left.title }}</h3>
                <div class="page-steps">
                  <div v-for="(step, i) in currentSpread.left.steps" :key="i" class="step-card">
                    <div class="step-icon">{{ step.icon }}</div>
                    <div class="step-detail">
                      <div class="step-title">{{ step.title }}</div>
                      <div class="step-desc">{{ step.desc }}</div>
                      <div v-if="step.tip" class="step-tip">
                        <span class="tip-dot"></span>
                        <span>{{ step.tip }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="page-corner page-corner-left"></div>
            </div>

            <!-- 中轴装订线与立体书脊折痕 (Spine & Stitches) -->
            <div class="launcher-book-spine">
              <div class="spine-line">
                <span class="spine-stitch"></span>
                <span class="spine-stitch"></span>
                <span class="spine-stitch"></span>
                <span class="spine-stitch"></span>
              </div>
            </div>

            <!-- 右页 -->
            <div class="launcher-book-page page-right">
              <header class="page-header">
                <div class="page-meta">
                  <span class="page-tag">{{ currentSpread.right.tag }}</span>
                  <span v-if="currentSpread.right.badge" class="page-badge">{{ currentSpread.right.badge }}</span>
                </div>
                <span class="page-number">P. {{ currentSpreadIndex * 2 + 2 }}</span>
              </header>

              <div class="page-body">
                <h3 class="page-title">{{ currentSpread.right.title }}</h3>
                <div class="page-steps">
                  <div v-for="(step, i) in currentSpread.right.steps" :key="i" class="step-card">
                    <div class="step-icon">{{ step.icon }}</div>
                    <div class="step-detail">
                      <div class="step-title">{{ step.title }}</div>
                      <div class="step-desc">{{ step.desc }}</div>
                      <div v-if="step.tip" class="step-tip">
                        <span class="tip-dot"></span>
                        <span>{{ step.tip }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="page-corner page-corner-right"></div>
            </div>
          </div>

          <!-- 一体化书页底栏：黑白分明，对比强烈，清晰易读 -->
          <footer class="launcher-book-footer">
            <button
              type="button"
              class="book-flip-btn"
              :disabled="currentSpreadIndex === 0"
              @click="prevSpread"
            >
              <span class="arrow">◀</span>
              <span>上一章</span>
            </button>

            <div class="book-chapter-switcher">
              <button
                v-for="(s, idx) in spreads"
                :key="idx"
                type="button"
                class="chapter-tab"
                :class="{ active: idx === currentSpreadIndex }"
                @click="currentSpreadIndex = idx"
              >
                <span class="chapter-dot"></span>
                <span class="chapter-name">{{ s.chapterTitle }}</span>
                <span class="chapter-pages">（{{ idx * 2 + 1 }}~{{ idx * 2 + 2 }}页）</span>
              </button>
            </div>

            <button
              type="button"
              class="book-flip-btn"
              :disabled="currentSpreadIndex === spreads.length - 1"
              @click="nextSpread"
            >
              <span>下一章</span>
              <span class="arrow">▶</span>
            </button>
          </footer>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* 无模态窗口：取消全屏黑色模糊遮罩，直接悬浮在页面中央，背景完全清晰可见 */
.launcher-book-window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2147483640;
  max-width: 960px;
  width: calc(100vw - 48px);
  pointer-events: auto;
}

/* 书本硬壳外封与多层立体投影：100% 实心纯白，坚决不透光 */
.launcher-book-case {
  position: relative;
  width: 100%;
  border-radius: 12px;
  background: #ffffff !important;
  border: 1px solid rgba(148, 163, 184, 0.4);
  box-shadow:
    0 24px 64px -12px rgba(15, 23, 42, 0.4),
    0 4px 18px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  overflow: visible;
  display: flex;
  flex-direction: column;
}

/* 右上角书签丝带关闭按钮 */
.launcher-book-close-ribbon {
  position: absolute;
  top: -8px;
  right: 28px;
  width: 34px;
  height: 42px;
  background: #e11d48;
  color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(225, 29, 72, 0.4);
  border-radius: 3px 3px 0 0;
  z-index: 20;
  transition: transform 0.15s ease, background 0.15s ease;
}
.launcher-book-close-ribbon:hover {
  transform: translateY(-2px);
  background: #be123c;
}
.ribbon-icon {
  font-size: 14px;
  font-weight: 800;
  line-height: 1;
}
.ribbon-tail {
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 0;
  height: 0;
  border-left: 17px solid transparent;
  border-right: 17px solid transparent;
  border-top: 8px solid #e11d48;
}
.launcher-book-close-ribbon:hover .ribbon-tail {
  border-top-color: #be123c;
}

/* 双页布局容器 */
.launcher-book-spread {
  display: flex;
  min-height: 490px;
  position: relative;
  background: #ffffff !important;
}

/* 单个书页：100% 实心纸面 */
.launcher-book-page {
  flex: 1;
  padding: 34px 34px 20px 34px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #ffffff !important;
}
.page-left {
  border-top-left-radius: 11px;
  background: linear-gradient(to right, #ffffff 96%, rgba(0, 0, 0, 0.035) 100%) !important;
}
.page-right {
  border-top-right-radius: 11px;
  background: linear-gradient(to left, #ffffff 96%, rgba(0, 0, 0, 0.035) 100%) !important;
}

/* 翻页角褶皱装饰 */
.page-corner {
  position: absolute;
  bottom: 0;
  width: 22px;
  height: 22px;
  pointer-events: none;
}
.page-corner-left {
  left: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.06) 45%, transparent 50%);
}
.page-corner-right {
  right: 0;
  background: linear-gradient(225deg, rgba(0, 0, 0, 0.06) 45%, transparent 50%);
}

/* 书脊中轴线装订区 (Spine & Stitches)：100% 实心 */
.launcher-book-spine {
  width: 36px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9 !important;
  border-left: 1px solid rgba(148, 163, 184, 0.25);
  border-right: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow:
    inset 4px 0 8px -2px rgba(0, 0, 0, 0.08),
    inset -4px 0 8px -2px rgba(0, 0, 0, 0.08);
  z-index: 5;
}
.spine-line {
  position: relative;
  height: 85%;
  width: 2px;
  background: rgba(148, 163, 184, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.spine-stitch {
  width: 7px;
  height: 3px;
  border-radius: 2px;
  background: #d97706;
  opacity: 0.9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* 书页头部与页码 */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dashed rgba(148, 163, 184, 0.35);
  padding-bottom: 10px;
  margin-bottom: 18px;
}
.page-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}
.page-tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #0284c7;
}
.page-badge {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(2, 132, 199, 0.12);
  color: #0284c7;
  font-weight: 700;
}
.page-number {
  font-size: 13px;
  font-family: serif, ui-serif, Georgia;
  font-weight: 700;
  color: #0f172a;
}

/* 页面内容与步骤卡片：100% 实心浅色背景 */
.page-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.page-title {
  margin: 0 0 16px 0;
  font-size: 17px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.2px;
}
.page-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.step-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 11px 13px;
  border-radius: 8px;
  background: #f8fafc !important;
  border: 1px solid rgba(148, 163, 184, 0.3);
  transition: transform 0.15s ease, background 0.15s ease;
}
.step-card:hover {
  transform: translateX(2px);
  background: #f1f5f9 !important;
}
.step-icon {
  font-size: 20px;
  line-height: 1.2;
  flex-shrink: 0;
}
.step-detail {
  flex: 1;
  min-width: 0;
}
.step-title {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 3px;
}
.step-desc {
  font-size: 12px;
  line-height: 1.5;
  color: #334155;
}
.step-tip {
  margin-top: 6px;
  padding-top: 5px;
  border-top: 1px dashed rgba(148, 163, 184, 0.3);
  font-size: 11px;
  font-weight: 600;
  color: #0284c7;
  display: flex;
  align-items: center;
  gap: 6px;
}
.tip-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #0284c7;
  flex-shrink: 0;
}

/* 一体化书页底栏：100% 实心纯净底色 */
.launcher-book-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: #f8fafc !important;
  border-top: 1px solid rgba(148, 163, 184, 0.3);
  border-bottom-left-radius: 11px;
  border-bottom-right-radius: 11px;
  gap: 12px;
}
.book-flip-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: #ffffff !important;
  color: #0f172a;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
.book-flip-btn .arrow {
  font-size: 11px;
  color: #0284c7;
}
.book-flip-btn:not(:disabled):hover {
  background: #0284c7 !important;
  color: #ffffff !important;
  border-color: #0284c7;
  box-shadow: 0 3px 10px rgba(2, 132, 199, 0.3);
}
.book-flip-btn:not(:disabled):hover .arrow {
  color: #ffffff;
}
.book-flip-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  box-shadow: none;
}

/* 章节指示切换器 */
.book-chapter-switcher {
  display: flex;
  align-items: center;
  gap: 8px;
}
.chapter-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  background: #ffffff !important;
  color: #334155;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}
.chapter-tab .chapter-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #94a3b8;
}
.chapter-tab .chapter-pages {
  font-size: 11px;
  color: #64748b;
  opacity: 0.85;
}
.chapter-tab:hover {
  border-color: #0284c7;
  color: #0284c7;
}
.chapter-tab.active {
  background: #0284c7 !important;
  border-color: #0284c7;
  color: #ffffff !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3);
}
.chapter-tab.active .chapter-dot {
  background: #ffffff;
}
.chapter-tab.active .chapter-pages {
  color: #ffffff;
  opacity: 0.9;
}

/* 转场动画 */
.book-fade-enter-active,
.book-fade-leave-active {
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.book-fade-enter-from,
.book-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -48%) scale(0.96);
}

/* 暗色与终末地主题适配：实心质感纸张，严禁透明混叠 */
:global(html[data-theme="dark"]) .launcher-book-case,
:global(html[data-theme="dark"]) .launcher-book-page,
:global(html[data-theme="dark"]) .launcher-book-spread {
  background: #1e293b !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
  box-shadow:
    0 24px 64px -12px rgba(0, 0, 0, 0.8),
    0 4px 18px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.12);
}
:global(html[data-theme="dark"]) .page-left {
  background: linear-gradient(to right, #1e293b 96%, rgba(0, 0, 0, 0.25) 100%) !important;
}
:global(html[data-theme="dark"]) .page-right {
  background: linear-gradient(to left, #1e293b 96%, rgba(0, 0, 0, 0.25) 100%) !important;
}
:global(html[data-theme="dark"]) .launcher-book-spine {
  background: #0f172a !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}
:global(html[data-theme="dark"]) .launcher-book-footer {
  background: #0f172a !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}
:global(html[data-theme="dark"]) .step-card {
  background: #273549 !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}
:global(html[data-theme="dark"]) .step-card:hover {
  background: #33435c !important;
}
:global(html[data-theme="dark"]) .page-title,
:global(html[data-theme="dark"]) .step-title,
:global(html[data-theme="dark"]) .page-number {
  color: #f8fafc !important;
}
:global(html[data-theme="dark"]) .step-desc {
  color: #cbd5e1 !important;
}
:global(html[data-theme="dark"]) .chapter-tab:not(.active) {
  background: #273549 !important;
  color: #cbd5e1 !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}
:global(html[data-theme="dark"]) .book-flip-btn {
  background: #273549 !important;
  color: #f8fafc !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
}

:global(html[data-theme="endfield"]) .launcher-book-case,
:global(html[data-theme="endfield"]) .launcher-book-page,
:global(html[data-theme="endfield"]) .launcher-book-spread {
  background: #182234 !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
}
:global(html[data-theme="endfield"]) .page-left {
  background: linear-gradient(to right, #182234 96%, rgba(0, 0, 0, 0.25) 100%) !important;
}
:global(html[data-theme="endfield"]) .page-right {
  background: linear-gradient(to left, #182234 96%, rgba(0, 0, 0, 0.25) 100%) !important;
}
:global(html[data-theme="endfield"]) .launcher-book-spine,
:global(html[data-theme="endfield"]) .launcher-book-footer {
  background: #0f1622 !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}
:global(html[data-theme="endfield"]) .step-card {
  background: #202d42 !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}
:global(html[data-theme="endfield"]) .step-card:hover {
  background: #2a3a54 !important;
}
:global(html[data-theme="endfield"]) .page-title,
:global(html[data-theme="endfield"]) .step-title,
:global(html[data-theme="endfield"]) .page-number {
  color: #f8fafc !important;
}
:global(html[data-theme="endfield"]) .step-desc {
  color: #cbd5e1 !important;
}
:global(html[data-theme="endfield"]) .chapter-tab:not(.active),
:global(html[data-theme="endfield"]) .book-flip-btn {
  background: #202d42 !important;
  color: #f8fafc !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
}
</style>
