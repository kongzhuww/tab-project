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
  left: PageTopic;
  right: PageTopic;
}

const spreads: Spread[] = [
  {
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

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="book-fade">
      <div v-if="open" class="launcher-book-backdrop" @pointerdown.self="emit('close')">
        <div class="launcher-book-modal" role="dialog" aria-modal="true" aria-label="常用网站使用手册">
          <!-- 书本外壳容器 -->
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

            <!-- 展开的双页主体 -->
            <div class="launcher-book-spread">
              <!-- 左页 -->
              <div class="launcher-book-page page-left">
                <header class="page-header">
                  <div class="page-meta">
                    <span class="page-tag">{{ currentSpread.left.tag }}</span>
                    <span v-if="currentSpread.left.badge" class="page-badge">{{ currentSpread.left.badge }}</span>
                  </div>
                  <span class="page-number">{{ currentSpreadIndex * 2 + 1 }}</span>
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

              <!-- 中轴装订线与立体书脊折痕 (Spine Crease) -->
              <div class="launcher-book-spine">
                <div class="spine-shade-left"></div>
                <div class="spine-line">
                  <span class="spine-stitch"></span>
                  <span class="spine-stitch"></span>
                  <span class="spine-stitch"></span>
                  <span class="spine-stitch"></span>
                </div>
                <div class="spine-shade-right"></div>
              </div>

              <!-- 右页 -->
              <div class="launcher-book-page page-right">
                <header class="page-header">
                  <div class="page-meta">
                    <span class="page-tag">{{ currentSpread.right.tag }}</span>
                    <span v-if="currentSpread.right.badge" class="page-badge">{{ currentSpread.right.badge }}</span>
                  </div>
                  <span class="page-number">{{ currentSpreadIndex * 2 + 2 }}</span>
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

            <!-- 书页底部多层纸张厚度装饰 (Page Deckle Edge) -->
            <div class="launcher-book-edge-shadow"></div>
          </div>

          <!-- 翻页与页码控制栏 -->
          <footer class="launcher-book-controller">
            <button
              type="button"
              class="book-flip-btn"
              :disabled="currentSpreadIndex === 0"
              @click="prevSpread"
            >
              <span>‹</span>
              <span>上一章</span>
            </button>

            <div class="book-progress">
              <button
                v-for="(_, idx) in spreads"
                :key="idx"
                type="button"
                class="progress-tab"
                :class="{ active: idx === currentSpreadIndex }"
                :title="`第 ${idx * 2 + 1} - ${idx * 2 + 2} 页`"
                @click="currentSpreadIndex = idx"
              >
                第 {{ idx * 2 + 1 }} ~ {{ idx * 2 + 2 }} 页
              </button>
            </div>

            <button
              type="button"
              class="book-flip-btn"
              :disabled="currentSpreadIndex === spreads.length - 1"
              @click="nextSpread"
            >
              <span>下一章</span>
              <span>›</span>
            </button>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.launcher-book-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2147483640;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.launcher-book-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 960px;
  width: 100%;
}

/* 书本硬壳外封与立体阴影 */
.launcher-book-case {
  position: relative;
  width: 100%;
  border-radius: 12px;
  background: var(--card-bg, #fcfaf7);
  box-shadow:
    0 24px 60px -12px rgba(15, 23, 42, 0.35),
    0 0 0 1px var(--border, rgba(148, 163, 184, 0.28)),
    0 8px 16px -4px rgba(0, 0, 0, 0.08);
  overflow: visible;
  transition: background 0.2s ease, border-color 0.2s ease;
}

/* 右上角书签丝带关闭按钮 */
.launcher-book-close-ribbon {
  position: absolute;
  top: -10px;
  right: 28px;
  width: 34px;
  height: 44px;
  background: #e11d48;
  color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(225, 29, 72, 0.35);
  border-radius: 3px 3px 0 0;
  z-index: 20;
  transition: transform 0.15s ease, background 0.15s ease;
}
.launcher-book-close-ribbon:hover {
  transform: translateY(-2px);
  background: #be123c;
}
.launcher-book-close-ribbon:active {
  transform: translateY(0);
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
  min-height: 520px;
  position: relative;
}

/* 单个书页 */
.launcher-book-page {
  flex: 1;
  padding: 36px 36px 28px 36px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: var(--surface, #ffffff);
}
.page-left {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background: linear-gradient(to right, var(--surface, #ffffff) 96%, rgba(0, 0, 0, 0.03) 100%);
}
.page-right {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background: linear-gradient(to left, var(--surface, #ffffff) 96%, rgba(0, 0, 0, 0.03) 100%);
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
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.05) 45%, transparent 50%);
  border-bottom-left-radius: 10px;
}
.page-corner-right {
  right: 0;
  background: linear-gradient(225deg, rgba(0, 0, 0, 0.05) 45%, transparent 50%);
  border-bottom-right-radius: 10px;
}

/* 书脊中轴线装订区 (Spine & Stitches) */
.launcher-book-spine {
  width: 44px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--panel, #f1f5f9);
  border-left: 1px solid var(--border, rgba(148, 163, 184, 0.2));
  border-right: 1px solid var(--border, rgba(148, 163, 184, 0.2));
  box-shadow:
    inset 4px 0 10px -2px rgba(0, 0, 0, 0.12),
    inset -4px 0 10px -2px rgba(0, 0, 0, 0.12);
  z-index: 5;
}
.spine-line {
  position: relative;
  height: 80%;
  width: 2px;
  background: var(--border, rgba(148, 163, 184, 0.4));
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.spine-stitch {
  width: 8px;
  height: 4px;
  border-radius: 2px;
  background: #d97706;
  opacity: 0.85;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

/* 书页头部与页码 */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dashed var(--border, rgba(148, 163, 184, 0.25));
  padding-bottom: 12px;
  margin-bottom: 20px;
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
  color: var(--primary, #0284c7);
}
.page-badge {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(2, 132, 199, 0.1);
  color: var(--primary, #0284c7);
  font-weight: 600;
}
.page-number {
  font-size: 13px;
  font-family: serif, ui-serif, Georgia;
  font-weight: 700;
  color: var(--muted, #64748b);
  opacity: 0.7;
}

/* 页面内容与步骤卡片 */
.page-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.page-title {
  margin: 0 0 18px 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--heading, #0f172a);
  letter-spacing: -0.2px;
}
.page-steps {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.step-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--panel, #f8fafc);
  border: 1px solid var(--border, rgba(148, 163, 184, 0.18));
  transition: transform 0.15s ease, background 0.15s ease;
}
.step-card:hover {
  transform: translateX(2px);
  background: var(--card-hover-bg, rgba(241, 245, 249, 0.8));
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
  color: var(--text, #1e293b);
  margin-bottom: 3px;
}
.step-desc {
  font-size: 12px;
  line-height: 1.5;
  color: var(--muted, #64748b);
}
.step-tip {
  margin-top: 6px;
  padding-top: 5px;
  border-top: 1px dashed var(--border, rgba(148, 163, 184, 0.2));
  font-size: 11px;
  color: var(--primary, #0284c7);
  display: flex;
  align-items: center;
  gap: 6px;
}
.tip-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--primary, #0284c7);
  flex-shrink: 0;
}

/* 控制栏与翻页 */
.launcher-book-controller {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 8px 16px;
  border-radius: 30px;
  background: var(--surface, #ffffff);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  border: 1px solid var(--border, rgba(148, 163, 184, 0.25));
}
.book-flip-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid var(--border, rgba(148, 163, 184, 0.25));
  background: var(--panel, #f1f5f9);
  color: var(--text, #1e293b);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}
.book-flip-btn:not(:disabled):hover {
  background: var(--primary, #0284c7);
  color: #ffffff;
  border-color: var(--primary, #0284c7);
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
}
.book-flip-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.book-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}
.progress-tab {
  padding: 4px 10px;
  border-radius: 12px;
  border: none;
  background: transparent;
  color: var(--muted, #64748b);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}
.progress-tab.active {
  background: var(--primary, #0284c7);
  color: #ffffff;
  font-weight: 700;
}

/* 转场动画 */
.book-fade-enter-active,
.book-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.book-fade-enter-from,
.book-fade-leave-to {
  opacity: 0;
  transform: scale(0.97);
}

/* 暗色与终末地主题适配 */
:global(html[data-theme="dark"]) .launcher-book-case,
:global(html[data-theme="endfield"]) .launcher-book-case {
  box-shadow:
    0 24px 60px -12px rgba(0, 0, 0, 0.65),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}
:global(html[data-theme="dark"]) .page-left,
:global(html[data-theme="endfield"]) .page-left {
  background: linear-gradient(to right, var(--surface) 96%, rgba(255, 255, 255, 0.02) 100%);
}
:global(html[data-theme="dark"]) .page-right,
:global(html[data-theme="endfield"]) .page-right {
  background: linear-gradient(to left, var(--surface) 96%, rgba(255, 255, 255, 0.02) 100%);
}
:global(html[data-theme="dark"]) .launcher-book-spine,
:global(html[data-theme="endfield"]) .launcher-book-spine {
  box-shadow:
    inset 4px 0 10px -2px rgba(0, 0, 0, 0.4),
    inset -4px 0 10px -2px rgba(0, 0, 0, 0.4);
}
</style>
