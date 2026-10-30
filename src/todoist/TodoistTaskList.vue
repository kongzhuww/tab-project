<template>
  <div id="todoist-workspace-body" class="todoist-workspace-body" @click="closeAllPopovers">
    <p v-if="state.moveError && state.moveMessage" class="todoist-move-status error" role="alert">{{ state.moveMessage }}</p>
    <p v-if="state.emptyText && state.columns.length > 0 && !state.loading" class="todoist-move-status error" role="status">{{ state.emptyText }} 已显示的任务保留。</p>
    <!-- 加载中或全屏空态提示 -->
    <p v-if="state.loading && state.columns.length === 0" class="todoist-empty">加载中…</p>
    <p v-else-if="state.emptyText && state.columns.length === 0" class="todoist-empty">{{ state.emptyText }}</p>

    <!-- 项目视图空状态 -->
    <div
      v-else-if="state.view === 'projects' && state.projects.length === 0"
      class="todoist-projects-empty-state"
    >
      <div class="empty-icon">📁</div>
      <h3>暂无自定义项目</h3>
      <p>你还没有创建任何 Todoist 项目，现在创建一个专属项目来组织任务吧！</p>
      <button
        type="button"
        class="todoist-add-section-submit"
        style="padding:8px 18px; font-size:13px; cursor:pointer;"
        @click="openCreateProjectPrompt"
      >＋ 新建第一个项目</button>
    </div>

    <!-- 正常看板内容区 -->
    <template v-else>
      <!-- 项目顶部工具栏 -->
      <div v-if="state.view === 'projects' && state.projects.length" class="todoist-projects-toolbar">
        <div class="todoist-projects-toolbar-inner">
          <div class="todoist-project-tabs-scroll">
            <button
              v-for="proj in state.projects"
              :key="proj.id"
              type="button"
              class="todoist-project-tab"
              :class="{ active: String(proj.id) === String(state.activeProjectId) }"
              @click="onSwitchProject(proj.id)"
            >
              <span class="todoist-project-dot" :style="{ background: proj.colorHex || '#0ea5e9' }"></span>
              <span class="todoist-project-tab-name">{{ proj.name }}</span>
            </button>
            <button
              type="button"
              class="todoist-project-new-btn"
              title="创建新项目"
              @click="openCreateProjectPrompt"
            >＋ 新建项目</button>
          </div>

          <!-- 项目操作按钮固定在右侧独立区域，绝不被标签挤压或垂直折行 -->
          <div v-if="activeProject" class="todoist-project-actions-group">
            <button
              type="button"
              class="todoist-project-action-btn"
              title="重命名项目"
              @click="openRenameProjectPrompt(activeProject)"
            >
              <span class="action-icon">✏️</span>
              <span class="action-text">重命名</span>
            </button>
            <button
              type="button"
              class="todoist-project-action-btn danger"
              title="删除项目"
              @click="openDeleteProjectConfirm(activeProject)"
            >
              <span class="action-icon">🗑️</span>
              <span class="action-text">删除项目</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 看板主体分栏 -->
      <div class="todoist-board">
        <section
          v-for="(col, colIndex) in state.columns"
          :key="col.sectionId || col.title || colIndex"
          class="todoist-board-column"
          :data-section-id="col.sectionId"
          :data-title="col.title"
          :data-column-index="colIndex"
        >
          <header class="todoist-board-column-head">
            <h3>
              {{ col.title }}
              <span>{{ col.tasks.length }}</span>
            </h3>
            <button
              type="button"
              class="todoist-column-more"
              :title="col.sectionId ? '板块操作（重命名／删除／移动）' : '默认板块信息'"
              @click.stop="toggleSectionMenu(col, colIndex, $event)"
            >•••</button>
          </header>

          <button
            type="button"
            class="todoist-column-add"
            @click="openComposer(col, colIndex, $event)"
          >＋ 添加任务</button>

          <!-- 展开的添加任务内嵌表单 -->
          <form
            v-if="activeComposerKey === getColKey(col, colIndex)"
            class="todoist-inline-add"
            @submit.prevent="submitComposer(col)"
          >
            <textarea
              v-model="composerContent"
              rows="2"
              placeholder="任务名称（Enter 创建，Shift+Enter 换行，支持 Ctrl+V 粘贴图片）"
              @keydown="onComposerKeyDown($event, col)"
              @paste="onComposerPaste($event)"
            ></textarea>

            <!-- 智能日期识别提示条 (0ms 本地识别) -->
            <div
              v-if="detectedComposerDate"
              class="todoist-composer-date-hint"
              :class="{ 'is-ignored': ignoreDetectedDate }"
            >
              <div class="date-hint-left">
                <span class="date-hint-icon">📅</span>
                <span class="date-hint-badge">
                  {{ detectedComposerDate.label }}{{ detectedComposerDate.time ? ' ' + detectedComposerDate.time : '' }}
                  <span class="date-hint-sub">({{ detectedComposerDate.formattedDate }})</span>
                </span>
                <span v-if="!ignoreDetectedDate" class="date-hint-preview">
                  精简任务名: <strong>{{ detectedComposerDate.cleanTitle }}</strong>
                </span>
                <span v-else class="date-hint-preview ignored-text">
                  (已忽略日期，按纯文本创建)
                </span>
              </div>
              <button
                type="button"
                class="date-hint-toggle-btn"
                @click="ignoreDetectedDate = !ignoreDetectedDate"
              >
                {{ ignoreDetectedDate ? '↺ 恢复识别' : '× 忽略' }}
              </button>
            </div>

            <!-- 粘贴的图片预览区 -->
            <div v-if="composerPastedImages.length > 0" class="todoist-composer-images">
              <div
                v-for="(imgItem, idx) in composerPastedImages"
                :key="idx"
                class="todoist-composer-img-pill"
              >
                <img :src="imgItem.previewUrl" class="todoist-composer-img-thumb" alt="预览" />
                <span class="todoist-composer-img-name">{{ imgItem.name }}</span>
                <span v-if="imgItem.uploading" class="todoist-composer-img-status">上传中…</span>
                <button
                  type="button"
                  class="todoist-composer-img-remove"
                  title="移除此图片"
                  @click="removeComposerImage(idx)"
                >×</button>
              </div>
            </div>

            <div class="todoist-inline-actions">
              <button type="button" :disabled="isSubmittingComposer" @click="closeComposer">取消</button>
              <button type="submit" class="primary" :disabled="isSubmittingComposer">{{ isSubmittingComposer ? (composerPastedImages.length ? '图片上传中…' : '添加中…') : '添加任务' }}</button>
            </div>
          </form>

          <!-- 普通板块使用虚拟列表保持高性能 -->
          <TodoistVirtualList
            :tasks="previewTasks(col, colIndex)"
            :pinned-id="draggingTaskId || editingTaskId"
            :hidden-id="dragOverColIndex !== null ? draggingTaskId : null"
            :is-preview="isDragPreview"
            class="todoist-board-list"
            :data-group-index="colIndex"
            :class="{ 'drag-over': dragOverColIndex === colIndex }"
            @dragover.prevent="onColDragOver($event, colIndex)"
            @dragleave="onColDragLeave($event, colIndex)"
            @drop.prevent="onColDrop($event, col)"
          >
            <template #empty>
              <p v-if="col.tasks.length === 0 && dragOverColIndex !== colIndex" class="todoist-column-empty">
                暂无任务 · 可拖到这里
              </p>
            </template>

            <template #default="{ task, index: taskIdx }">
            <article
              class="todoist-board-task"
              :class="[
                {
                  completed: task.completed,
                  'has-custom-color': !!task.customColorHex,
                  editing: editingTaskId === task.id,
                  'dragging-task': !isDragPreview(task) && draggingTaskId === task.id,
                  'drop-before': dragOverTaskId === task.id && !dragAfterTask,
                  'drop-after': dragOverTaskId === task.id && dragAfterTask,
                  'saving-position': state.movingTaskId === task.id,
                  'todoist-task-preview': isDragPreview(task),
                  'drag-origin-hidden': draggingTaskId === task.id && !isDragPreview(task) && dragOverColIndex !== null
                }
              ]"
              :style="task.customColorHex ? { '--task-custom-color': task.customColorHex } : {}"
              :data-task-id="isDragPreview(task) ? undefined : task.id"
              :aria-hidden="isDragPreview(task) || undefined"
              :tabindex="isDragPreview(task) ? -1 : 0"
              :title="getCardTitle()"
              :draggable="!isDragPreview(task) && !task.completed && !state.loading && !state.movingTaskId && !state.moveNeedsRefresh && editingTaskId !== task.id && !task.id.startsWith('optimistic-')"
              @dragstart="onTaskDragStart($event, task, col, taskIdx)"
              @dragend="onTaskDragEnd"
              @dragover.stop.prevent="onTaskDragOver($event, task, col, taskIdx)"
              @drop.stop.prevent="onTaskDrop($event, task, col, taskIdx)"
              @dblclick="onCardDblClick(task, $event)"
              @click="onCardClick(task, $event)"
              @contextmenu.prevent.stop="openTaskContextMenu(task, col, $event)"
            >
              <button
                type="button"
                class="todoist-board-check"
                :class="{ checked: task.completed }"
                :disabled="isDragPreview(task) || state.movingTaskId === task.id"
                :title="task.completed ? '撤销完成' : '完成任务'"
                :aria-label="(task.completed ? '撤销完成：' : '完成：') + task.content"
                @click.stop="onToggleCheck(task, col)"
              ></button>

              <div class="todoist-board-task-main">
                <span v-if="state.movingTaskId === task.id" class="todoist-position-pending" role="status">保存中</span>

                <!-- 🐙 关联 GitHub 仓库标识 (上面有仓库名字) -->
                <div v-if="getTaskRepos(task.id, task.description).length" class="todoist-card-repo-strip">
                  <button
                    v-for="repo in getTaskRepos(task.id, task.description)"
                    :key="repo.fullName"
                    type="button"
                    class="todoist-card-repo-btn"
                    :title="'关联 GitHub 仓库：' + repo.fullName + ' · 点击在插件内查看详情'"
                    @click.stop="openGitHubRepo(repo.fullName)"
                  >
                    <span class="repo-badge-icon">🐙</span>
                    <span class="repo-badge-name">{{ repo.fullName }}</span>
                  </button>
                </div>

                <!-- 原地就地编辑框 -->
                <textarea
                  v-if="editingTaskId === task.id"
                  ref="editingInputRef"
                  v-model="editingContent"
                  class="todoist-task-editor"
                  rows="2"
                  aria-label="编辑任务名称"
                  @keydown="onEditorKeyDown($event, task)"
                  @blur="finishEditing(task, true)"
                  @click.stop
                ></textarea>

                <!-- 正常卡片标题 -->
                <p v-else class="todoist-board-task-title todoist-task-content">{{ task.content || "未命名任务" }}</p>

                <!-- 任务描述 (如果纯文本且不是纯图片链接) -->
                <p
                  v-if="getTaskCleanDesc(task)"
                  class="todoist-board-task-description"
                >{{ getTaskCleanDesc(task) }}</p>

                <!-- 任务元信息标签 (日期、标签等) -->
                <div v-if="hasMeta(task)" class="todoist-board-task-meta">
                  <span
                    v-if="task.startDate && !task.dueDate"
                    class="todoist-board-due start-only"
                    :title="`开始时间：${task.startDate}`"
                  >
                    🛫 自 {{ formatMonthDayTime(task.startDate) }} 起
                  </span>
                  <span
                    v-else-if="task.startDate && task.dueDate"
                    class="todoist-board-due date-range"
                    :title="`时间区间：${task.startDate} 至 ${task.dueDate}`"
                  >
                    ⏱ {{ formatMonthDayTime(task.startDate) }} ~ {{ formatMonthDayTime(task.dueDate) }}
                  </span>
                  <span
                    v-else-if="task.dueText"
                    class="todoist-board-due"
                    :class="{ recurring: task.isRecurring }"
                    :title="task.isRecurring ? `循环任务：${task.dueString || task.dueText}` : undefined"
                  >{{ task.isRecurring ? '↻ ' : '▣ ' }}{{ task.dueText }}</span>
                  <span
                    v-for="lbl in (task.labels || []).slice(0, 3)"
                    :key="lbl"
                    class="todoist-board-label"
                  >◇ {{ lbl }}</span>
                  <span
                    v-if="task.timedDeadlineText"
                    class="todoist-board-timer"
                    :title="(task.timedDurationMinutes || 0) + '分钟时间限制'"
                  >⏱ {{ task.timedDeadlineText }}</span>
                  <span
                    v-if="task.extraCountText"
                    class="todoist-board-extra"
                  >{{ task.extraCountText }}</span>
                </div>

                <!-- 🖼️ 任务照片 -->
                <div
                  v-if="getTaskThumb(task)"
                  class="todoist-card-thumb-wrap"
                  title="点击在小窗查看大图"
                  @click.stop="openCardImage(getTaskThumb(task)!, task)"
                >
                  <img :src="getTaskThumb(task)!" class="todoist-card-thumb" alt="任务照片" loading="lazy" />
                  <span class="todoist-card-img-badge">🖼️ 附件照片</span>
                </div>
              </div>
            </article>
            </template>
          </TodoistVirtualList>

        </section>

        <!-- 添加板块栏 -->
        <div
          v-if="state.view === 'inbox' || state.view === 'projects'"
          class="todoist-board-add-column"
        >
          <button
            v-if="!state.addingSection"
            type="button"
            class="todoist-board-add-column-btn"
            @click="state.addingSection = true"
          ><span aria-hidden="true">＋</span><span>添加板块</span></button>
          <div v-else class="todoist-add-section-form">
            <input
              v-model="newSectionName"
              type="text"
              class="todoist-add-section-input"
              placeholder="板块名称…"
              autofocus
              @keydown.enter.prevent="submitAddSection"
              @keydown.esc="cancelAddSection"
            />
            <div class="todoist-add-section-actions">
              <button
                type="button"
                class="todoist-add-section-submit"
                @click="submitAddSection"
              >添加板块</button>
              <button
                type="button"
                class="todoist-add-section-cancel"
                @click="cancelAddSection"
              >取消</button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 声明式板块操作菜单（Section Menu） -->
    <div
      v-if="sectionMenu.isOpen && sectionMenu.col"
      class="todoist-section-menu"
      :style="{ left: sectionMenu.x + 'px', top: sectionMenu.y + 'px' }"
      @click.stop
    >
      <button
        type="button"
        class="todoist-section-menu-item"
        @click="openRenameSectionPrompt(sectionMenu.col)"
      >
        <span class="section-menu-icon">✏️</span>
        <span class="section-menu-text">重命名板块</span>
      </button>

      <div v-if="sectionMenu.col.sectionId" class="todoist-section-menu-move-row">
        <button
          type="button"
          class="todoist-section-menu-move-btn"
          :disabled="!sectionMenu.canMoveLeft"
          title="向左移动板块"
          @click="onMoveSection(sectionMenu.col, -1)"
        >◀ 左移</button>
        <span class="move-btn-divider"></span>
        <button
          type="button"
          class="todoist-section-menu-move-btn"
          :disabled="!sectionMenu.canMoveRight"
          title="向右移动板块"
          @click="onMoveSection(sectionMenu.col, 1)"
        >右移 ▶</button>
      </div>

      <div v-if="sectionMenu.col.sectionId" class="todoist-section-menu-divider"></div>

      <button
        v-if="sectionMenu.col.sectionId"
        type="button"
        class="todoist-section-menu-item danger"
        @click="openDeleteSectionConfirm(sectionMenu.col)"
      >
        <span class="section-menu-icon">🗑️</span>
        <span class="section-menu-text">删除分组</span>
      </button>
    </div>

    <!-- 声明式任务卡片右键菜单（Task Context Menu） -->
    <div
      v-if="taskContextMenu.isOpen && taskContextMenu.task"
      class="todoist-task-context-menu"
      :style="{ left: taskContextMenu.x + 'px', top: taskContextMenu.y + 'px' }"
      role="menu"
      @click.stop
    >
      <!-- 菜单标题头 -->
      <div class="todoist-task-menu-header">
        <span class="todoist-task-menu-title">{{ taskContextMenu.task.content || '任务操作' }}</span>
      </div>

      <!-- 🏷️ 云端标签管理 -->
      <button
        type="button"
        class="todoist-task-menu-item"
        :class="{ active: taskContextMenu.activeSubpanel === 'labels' }"
        @click="toggleTaskSubpanel('labels')"
      >
        <span class="todoist-menu-icon">🏷️</span>
        <span class="todoist-menu-text">云端标签</span>
        <span class="todoist-menu-badge">
          {{ (taskContextMenu.task.labels && taskContextMenu.task.labels.length) ? `已选 ${taskContextMenu.task.labels.length}` : '无' }}
        </span>
      </button>

      <!-- 标签子面板 -->
      <div v-if="taskContextMenu.activeSubpanel === 'labels'" class="todoist-labels-panel">
        <div class="todoist-labels-quick-input">
          <input
            v-model="taskContextMenu.newLabelText"
            type="text"
            placeholder="新建或添加标签…"
            class="todoist-label-input"
            @keydown.enter.prevent="onMenuAddNewLabel"
          />
          <button type="button" class="todoist-label-add-btn" @click="onMenuAddNewLabel">＋</button>
        </div>
        <div class="todoist-labels-chip-grid">
          <button
            v-for="lbl in combinedAvailableLabels"
            :key="lbl"
            type="button"
            class="todoist-label-chip"
            :class="{ selected: isTaskLabelSelected(lbl) }"
            @click="onMenuToggleLabel(lbl)"
          >
            <span>◇ {{ lbl }}</span>
            <span v-if="isTaskLabelSelected(lbl)" class="chip-check">✓</span>
          </button>
        </div>
      </div>

      <!-- 6. 设置循环周期 -->
      <button
        type="button"
        class="todoist-task-menu-item"
        :class="{ active: taskContextMenu.activeSubpanel === 'recur' }"
        @click="toggleTaskSubpanel('recur')"
      >
        <span class="todoist-menu-icon">🔄</span>
        <span class="todoist-menu-text">设置循环周期</span>
        <span
          class="todoist-menu-badge"
          :style="taskContextMenu.task.isRecurring ? 'color:#7c3aed;font-weight:700;' : ''"
        >{{ taskContextMenu.task.isRecurring ? (taskContextMenu.task.dueString || '循环') : '无' }}</span>
      </button>

      <!-- 循环子面板 -->
      <div v-if="taskContextMenu.activeSubpanel === 'recur'" class="todoist-recur-panel">
        <div class="todoist-recur-grid">
          <button
            v-for="opt in recurOptions"
            :key="opt.rule"
            type="button"
            class="todoist-recur-chip"
            :class="{ selected: isRecurSelected(opt.rule) }"
            @click="onMenuSelectRecur(opt.rule, opt.label)"
          >
            <span>{{ opt.icon }}</span>
            <span>{{ opt.label }}</span>
          </button>
        </div>
        <div class="todoist-recur-custom-row">
          <input
            v-model="taskContextMenu.customRecurText"
            type="text"
            class="todoist-recur-custom-input"
            placeholder="自定义循环 (如: every 2 weeks)…"
            @keydown.enter.prevent="onMenuSubmitCustomRecur"
          />
          <button type="button" class="todoist-recur-custom-submit" @click="onMenuSubmitCustomRecur">确定</button>
        </div>
        <button
          v-if="taskContextMenu.task.isRecurring"
          type="button"
          class="todoist-recur-clear-btn"
          @click="onMenuClearRecur"
        >❌ 清除循环（转为单次任务）</button>
      </div>

      <!-- 7. 选择标签颜色 -->
      <button
        type="button"
        class="todoist-task-menu-item"
        :class="{ active: taskContextMenu.activeSubpanel === 'color' }"
        @click="toggleTaskSubpanel('color')"
      >
        <span class="todoist-menu-icon">🎨</span>
        <span class="todoist-menu-text">选择标签颜色</span>
        <span class="todoist-menu-badge" style="display:inline-flex;align-items:center;gap:5px;">
          <span
            v-if="getCurrentColorObj.id === 'none'"
            class="todoist-color-dot none"
            style="width:10px;height:10px;display:inline-flex;align-items:center;justify-content:center;line-height:1;font-size:8px;"
          >⊘</span>
          <span
            v-else
            class="todoist-color-dot"
            :style="{
              display: 'inline-block',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              background: getCurrentColorObj.hex
            }"
          ></span>
          {{ getCurrentColorObj.name }}
        </span>
      </button>

      <!-- 颜色子面板 -->
      <div v-if="taskContextMenu.activeSubpanel === 'color'" class="todoist-color-panel">
        <div class="todoist-color-grid">
          <button
            v-for="c in colorPalette"
            :key="c.id"
            type="button"
            class="todoist-color-swatch"
            :class="{ selected: getCurrentColorObj.id === c.id }"
            :title="c.name"
            @click="onMenuSelectColor(c.id)"
          >
            <span
              class="todoist-color-dot"
              :class="{ none: c.id === 'none' }"
              :style="c.id !== 'none' ? { background: c.hex } : {}"
            >{{ c.id === 'none' ? (getCurrentColorObj.id === 'none' ? '✓' : '⊘') : (getCurrentColorObj.id === c.id ? '✓' : '') }}</span>
            <span class="todoist-color-name">{{ c.name }}</span>
          </button>
        </div>
      </div>

      <!-- 8. 移动到项目 -->
      <button
        type="button"
        class="todoist-task-menu-item"
        :class="{ active: taskContextMenu.activeSubpanel === 'project' }"
        @click="toggleTaskSubpanel('project')"
      >
        <span class="todoist-menu-icon">📁</span>
        <span class="todoist-menu-text">移动到项目…</span>
        <span class="todoist-menu-arrow">›</span>
      </button>

      <!-- 移动到项目飞出面板 -->
      <div
        v-if="taskContextMenu.activeSubpanel === 'project'"
        class="todoist-project-flyout"
        :class="{ 'open-left': taskContextMenu.flyoutOpenLeft }"
        :style="taskContextMenu.flyoutStyle"
      >
        <button
          v-for="p in state.projects"
          :key="p.id"
          type="button"
          class="todoist-project-flyout-item"
          :class="{ active: String(p.id) === contextTaskProjectId }"
          :disabled="!!state.movingTaskId || String(p.id) === contextTaskProjectId"
          @click="onMenuMoveToProject(p)"
        >
          <span class="todoist-menu-icon">📁</span>
          <span class="todoist-project-flyout-name">{{ p.name }}</span>
          <span v-if="String(p.id) === contextTaskProjectId" class="todoist-menu-badge">当前</span>
        </button>
      </div>

      <!-- 分割线与删除按钮 -->
      <div class="todoist-task-menu-divider"></div>
      <button
        type="button"
        class="todoist-task-menu-item danger"
        @click="onMenuDeleteTask"
      >
        <span class="todoist-menu-icon">🗑️</span>
        <span class="todoist-menu-text">{{ taskContextMenu.task.isRecurring ? '删除重复任务…' : '删除任务' }}</span>
      </button>
    </div>

    <!-- 声明式输入对话框（Prompt Dialog Modal） -->
      <div
        v-if="promptModal.isOpen && todoistModuleState.active"
        class="todoist-dialog-overlay"
        @keydown.esc.stop.prevent="closePromptModal"
      >
        <div class="todoist-dialog-card" @click.stop>
          <div class="todoist-dialog-head">
            <span class="todoist-dialog-icon">✏️</span>
            <h3 class="todoist-dialog-title">{{ promptModal.title }}</h3>
          </div>
          <div class="todoist-dialog-body">
            <p v-if="promptModal.message" class="todoist-dialog-desc">{{ promptModal.message }}</p>
            <input
              ref="promptInputRef"
              v-model="promptModal.value"
              type="text"
              class="todoist-dialog-input"
              :placeholder="promptModal.placeholder"
              @keydown.enter.prevent="submitPromptModal"
            />
          </div>
          <div class="todoist-dialog-foot">
            <button type="button" class="todoist-dialog-btn" @click="closePromptModal">取消</button>
            <button type="button" class="todoist-dialog-btn primary" @click="submitPromptModal">
              {{ promptModal.confirmText || '确定' }}
            </button>
          </div>
        </div>
      </div>


    <!-- 声明式确认对话框（Confirm Dialog Modal） -->
      <div
        v-if="confirmModal.isOpen && todoistModuleState.active"
        class="todoist-dialog-overlay"
        @keydown.esc.stop.prevent="closeConfirmModal"
      >
        <div class="todoist-dialog-card" @click.stop>
          <div class="todoist-dialog-head">
            <span class="todoist-dialog-icon">{{ confirmModal.icon || '⚠️' }}</span>
            <h3 class="todoist-dialog-title">{{ confirmModal.title }}</h3>
          </div>
          <div class="todoist-dialog-body">
            <div
              v-if="confirmModal.danger"
              style="background:#fef2f2; padding:10px 12px; border-radius:8px; border:1px solid #fee2e2; margin-bottom:10px;"
            >
              <div style="font-weight:700; color:#dc2626; font-size:13.5px;">{{ confirmModal.alertText }}</div>
            </div>
            <p style="margin:0; color:#64748b; font-size:12.5px; line-height:1.5;">{{ confirmModal.message }}</p>
          </div>
          <div class="todoist-dialog-foot">
            <button type="button" class="todoist-dialog-btn" @click="closeConfirmModal">取消</button>
            <button
              type="button"
              class="todoist-dialog-btn"
              :class="confirmModal.danger ? 'danger' : 'primary'"
              @click="submitConfirmModal"
            >{{ confirmModal.confirmText || '确定' }}</button>
          </div>
        </div>
      </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick, watch, onMounted, onUnmounted } from "vue";
import { useTodoistBoardDrag } from "./useTodoistBoardDrag";
import TodoistVirtualList from "./TodoistVirtualList.vue";
import { todoistModuleState, withTodoistWrite } from "./module-state";
import { imageViewerController } from "../viewers/image-viewer-store";
import {
  todoistTaskListState,
  todoistTaskListController,
  type TodoistColumnItem,
  type TodoistTaskItem,
  type TodoistProjectOption
} from "./task-list-store";
import { todoistService } from "../services/todoist.service";
import { todoistInspectorController } from "./inspector-store";
import { notifications } from "../sdk/notifications";
import { formatMonthDayTime, parseDateKeyword } from "./task-date-helper";
import { githubTaskCreation } from "./github-task-target";
import { getTaskRepositoryLinks, type RepositoryLink } from "./repository-links";
import { githubRepoDetailController } from "../github/repo-detail-store";

const repoLinksVersion = ref(0);
function onRepoLinksChanged() {
  repoLinksVersion.value++;
}
onMounted(() => {
  window.addEventListener('storage', onRepoLinksChanged);
  window.addEventListener('todoist-repository-links-changed', onRepoLinksChanged);
});
onUnmounted(() => {
  window.removeEventListener('storage', onRepoLinksChanged);
  window.removeEventListener('todoist-repository-links-changed', onRepoLinksChanged);
});

function getTaskRepos(taskId: string, description?: string): RepositoryLink[] {
  void repoLinksVersion.value;
  return getTaskRepositoryLinks(taskId, description);
}

function openGitHubRepo(fullName: string) {
  githubRepoDetailController.open(fullName);
}

const state = todoistTaskListState;

// 添加板块
const newSectionName = ref("");

// 内嵌创建任务
const activeComposerKey = ref<string | null>(null);
const composerContent = ref("");
const ignoreDetectedDate = ref(false);

const detectedComposerDate = computed(() => {
  if (!composerContent.value) return null;
  return parseDateKeyword(composerContent.value);
});

interface PastedImageItem {
  file: File;
  previewUrl: string;
  name: string;
  uploading: boolean;
  uploadedUrl?: string;
}

const composerPastedImages = ref<PastedImageItem[]>([]);
const hasUploadingImages = computed(() => composerPastedImages.value.some((img) => img.uploading));

function onComposerPaste(event: ClipboardEvent) {
  const items = event.clipboardData?.items;
  if (!items) return;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.indexOf("image") !== -1) {
      event.preventDefault();
      const file = item.getAsFile();
      if (!file) continue;

      const previewUrl = URL.createObjectURL(file);
      const timeStr = new Date().toLocaleTimeString("zh-CN", { hour12: false }).replace(/:/g, "");
      const imgObj: PastedImageItem = {
        file,
        previewUrl,
        name: `截图_${timeStr}.png`,
        uploading: false
      };
      composerPastedImages.value.push(imgObj);

      // Pasting prepares a local draft only. Upload happens on explicit submit.
    }
  }
}

function removeComposerImage(index: number) {
  const removed = composerPastedImages.value.splice(index, 1)[0];
  if (removed && removed.previewUrl) {
    try {
      URL.revokeObjectURL(removed.previewUrl);
    } catch {}
  }
}

// 就地编辑
const editingTaskId = ref<string | null>(null);
const editingContent = ref("");
const editingInputRef = ref<HTMLTextAreaElement | null>(null);

// 响应式板块菜单
const sectionMenu = reactive({
  isOpen: false,
  x: 0,
  y: 0,
  col: null as TodoistColumnItem | null,
  canMoveLeft: false,
  canMoveRight: false
});

type RenameTarget = { projectId: string } | { sectionId: string };
type DeleteTarget = RenameTarget | { taskId: string; isRecurring: boolean };

// 响应式 Prompt 对话框
const promptModal = reactive({
  isOpen: false,
  title: "",
  message: "",
  value: "",
  placeholder: "",
  confirmText: "确定",
  actionType: "" as "create-project" | "rename-project" | "rename-section" | "",
  payload: null as RenameTarget | null
});
const promptInputRef = ref<HTMLInputElement | null>(null);

// 响应式 Confirm 对话框
const confirmModal = reactive({
  isOpen: false,
  title: "确认操作",
  icon: "⚠️",
  alertText: "",
  message: "",
  confirmText: "确定",
  danger: false,
  actionType: "" as "delete-project" | "delete-section" | "delete-task" | "",
  payload: null as DeleteTarget | null
});

// 响应式任务右键上下文菜单
const taskContextMenu = reactive({
  isOpen: false,
  x: 0,
  y: 0,
  task: null as TodoistTaskItem | null,
  col: null as TodoistColumnItem | null,
  activeSubpanel: null as "desc" | "due" | "labels" | "recur" | "color" | "project" | null,
  descText: "",
  isSavingDesc: false,
  calYear: new Date().getFullYear(),
  calMonth: new Date().getMonth(),
  newLabelText: "",
  customRecurText: "",
  flyoutOpenLeft: false,
  flyoutStyle: {} as Record<string, string>
});
const taskDescInputRef = ref<HTMLTextAreaElement | null>(null);
const taskLabelInputRef = ref<HTMLInputElement | null>(null);

// 常量配置
const colorPalette = [
  { id: "none", name: "无颜色", hex: "" },
  { id: "purple", name: "紫罗兰", hex: "#8b5cf6" },
  { id: "blue", name: "天青蓝", hex: "#3b82f6" },
  { id: "emerald", name: "翡翠绿", hex: "#10b981" },
  { id: "amber", name: "琥珀橙", hex: "#f59e0b" },
  { id: "rose", name: "珊瑚红", hex: "#f43f5e" },
  { id: "cyan", name: "薄荷青", hex: "#06b6d4" },
  { id: "pink", name: "蔷薇粉", hex: "#ec4899" },
  { id: "slate", name: "石墨灰", hex: "#64748b" }
];

const recurOptions = [
  { label: "每天", rule: "every day", icon: "☀️" },
  { label: "每个工作日", rule: "every weekday", icon: "💼" },
  { label: "每周", rule: "every week", icon: "📅" },
  { label: "每周一", rule: "every mon", icon: "1️⃣" },
  { label: "每周二", rule: "every tue", icon: "2️⃣" },
  { label: "每周三", rule: "every wed", icon: "3️⃣" },
  { label: "每周四", rule: "every thu", icon: "4️⃣" },
  { label: "每周五", rule: "every fri", icon: "5️⃣" },
  { label: "周末 (六与日)", rule: "every weekend", icon: "🏖️" },
  { label: "每月", rule: "every month", icon: "📆" }
];

const contextTaskProjectId = computed(() => String(taskContextMenu.task?._taskRaw?.project_id || taskContextMenu.col?.projectId || ""));

const activeProject = computed(() => {
  if (state.view !== "projects") return null;
  return state.projects.find((p) => String(p.id) === String(state.activeProjectId)) || state.projects[0] || null;
});

const totalTaskCount = computed(() => {
  return state.columns.reduce((total, col) => total + (col.tasks?.length || 0), 0);
});

const combinedAvailableLabels = computed(() => {
  const set = new Set<string>(state.availableLabels || []);
  if (taskContextMenu.task?.labels) {
    taskContextMenu.task.labels.forEach((l) => set.add(l));
  }
  return Array.from(set);
});

const getCurrentColorObj = computed(() => {
  const customHex = taskContextMenu.task?.customColorHex;
  if (!customHex) return colorPalette[0];
  const found = colorPalette.find((c) => c.hex.toLowerCase() === customHex.toLowerCase());
  return found || colorPalette[0];
});

const calendarDays = computed(() => {
  const year = taskContextMenu.calYear;
  const month = taskContextMenu.calMonth;
  const firstDay = new Date(year, month, 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const cursor = new Date(year, month, 1 - mondayOffset);
  const now = new Date();
  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const taskDueKey = taskContextMenu.task?.dueDate ? String(taskContextMenu.task.dueDate).slice(0, 10) : "";

  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(cursor);
    d.setDate(cursor.getDate() + i);
    const dYear = d.getFullYear();
    const dMonth = String(d.getMonth() + 1).padStart(2, "0");
    const dDate = String(d.getDate()).padStart(2, "0");
    const dateStr = `${dYear}-${dMonth}-${dDate}`;
    days.push({
      dateStr,
      dayNum: d.getDate(),
      isOutside: d.getMonth() !== month,
      isToday: dateStr === todayKey,
      isSelected: dateStr === taskDueKey
    });
  }
  return days;
});

function getColKey(col: TodoistColumnItem, index: number) {
  return col.sectionId || col.title || String(index);
}

function getCardTitle() {
  return `${state.view === "inbox" ? "拖动卡片实时调整顺序，或移动到其他版块" : "拖动卡片实时调整当前分组内顺序"}；按住Alt可使用原生外部拖动；双击改标题，右键打开详情`;
}

function hasMeta(task: TodoistTaskItem) {
  return (
    task.startDate ||
    task.dueText ||
    (task.labels && task.labels.length > 0) ||
    task.timedDeadlineText ||
    task.extraCountText
  );
}

function closeAllPopovers() {
  sectionMenu.isOpen = false;
  taskContextMenu.isOpen = false;
  taskContextMenu.activeSubpanel = null;
}

const {
  draggingTaskId, dragOverColIndex, dragOverTaskId, dragAfterTask,
  isDragPreview, previewTasks, onTaskDragStart, onTaskDragEnd,
  onColDragOver, onColDragLeave, onTaskDragOver, onTaskDrop, onColDrop
} = useTodoistBoardDrag({
  state,
  isActive: () => todoistModuleState.active,
  editingTaskId: () => editingTaskId.value,
  closePopovers: closeAllPopovers,
  moveTask: (id, target, before) => todoistTaskListController.moveTask(id, target, before),
  dropLabel: (task, label) => {
    if (!task.labels) task.labels = [];
    if (!task.labels.includes(label)) {
      task.labels.push(label);
      if (todoistService.getToken()) {
        void todoistService.updateTask(task.id, { labels: task.labels });
      }
    }
  }
});

// 任务完成切换
function onToggleCheck(task: TodoistTaskItem, col: TodoistColumnItem) {
  todoistTaskListController.dispatch("toggle-task", { task, group: col });
}

// 双击就地编辑
function onCardDblClick(task: TodoistTaskItem, event: MouseEvent) {
  if (task.completed) return;
  const target = event.target as HTMLElement;
  if (target && target.closest("button,input,textarea,select,a")) return;
  startEditing(task);
}

function startEditing(task: TodoistTaskItem) {
  if (state.movingTaskId === task.id) return;
  editingTaskId.value = task.id;
  editingContent.value = task.content;
  nextTick(() => {
    if (editingInputRef.value) {
      editingInputRef.value.focus();
      editingInputRef.value.select();
    }
  });
}

function finishEditing(task: TodoistTaskItem, save: boolean) {
  if (editingTaskId.value !== task.id) return;
  const newText = editingContent.value.trim();
  editingTaskId.value = null;
  if (save && newText && newText !== task.content) {
    task.content = newText;
    todoistTaskListController.dispatch("update-task-title", {
      taskId: task.id,
      content: newText,
      task,
      newContent: newText
    });
  }
}

function onEditorKeyDown(event: KeyboardEvent, task: TodoistTaskItem) {
  if (event.key === "Enter") {
    if (!event.shiftKey) {
      event.preventDefault();
      finishEditing(task, true);
    }
  } else if (event.key === "Escape") {
    event.preventDefault();
    event.stopPropagation();
    finishEditing(task, false);
  }
}

function onCardClick(task: TodoistTaskItem, event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  if (target?.closest(".todoist-board-check, .todoist-task-actions, textarea, input, button")) return;
  void todoistInspectorController.openTask(task.id, task);
}

// 任务内嵌添加器
function openComposer(col: TodoistColumnItem, index: number, event: MouseEvent) {
  const button = event.currentTarget as HTMLButtonElement;
  activeComposerKey.value = getColKey(col, index);
  composerContent.value = "";
  ignoreDetectedDate.value = false;
  nextTick(() => {
    // Each column renders its own composer; focus the one opened by this button.
    button.nextElementSibling?.querySelector("textarea")?.focus();
  });
}

function closeComposer() { if (!isSubmittingComposer.value) clearComposerDraft(); }
function clearComposerDraft() {
  activeComposerKey.value = null;
  composerContent.value = "";
  ignoreDetectedDate.value = false;
  for (const img of composerPastedImages.value) {
    try {
      URL.revokeObjectURL(img.previewUrl);
    } catch {}
  }
  composerPastedImages.value = [];
}

const isSubmittingComposer = ref(false);

const descriptionCache = new WeakMap<TodoistTaskItem, { source: string; text: string; thumb: string | null }>();
function taskDescription(task: TodoistTaskItem) {
  const source = task.description || task._taskRaw?.description || "";
  const cached = descriptionCache.get(task);
  if (cached && cached.source === source) return cached;
  const thumb = source.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1] || null;
  const value = {
    source, thumb,
    text: source.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim()
  };
  descriptionCache.set(task, value);
  return value;
}
function getTaskCleanDesc(task: TodoistTaskItem): string { return taskDescription(task).text; }
function getTaskThumb(task: TodoistTaskItem): string | null { return taskDescription(task).thumb; }

function openCardImage(url: string, task?: TodoistTaskItem) {
  if (url) {
    imageViewerController.open(url, task?.content || "任务照片");
  }
}

async function submitComposer(col: TodoistColumnItem) {
  if (!todoistModuleState.active || isSubmittingComposer.value) return;
  const images = [...composerPastedImages.value];
  const rawText = composerContent.value.trim();
  let finalContent = rawText || images[0]?.name || "";
  if (!finalContent) return;

  let dueDate: string | undefined = undefined;
  let dueText: string | undefined = undefined;
  let dueString: string | undefined = undefined;

  if (detectedComposerDate.value && !ignoreDetectedDate.value) {
    const d = detectedComposerDate.value;
    finalContent = d.cleanTitle || finalContent;
    dueDate = d.date;
    dueText = d.label + (d.time ? ` ${d.time}` : "");
    dueString = d.time ? `${d.date} ${d.time}` : d.date;
  }

  const key = activeComposerKey.value, originalText = composerContent.value;
  const view = state.view;
  const projectId = col.projectId || (view === "projects" ? (state.activeProjectId || undefined) : undefined);
  const sectionId = col.sectionId !== undefined ? col.sectionId : undefined;
  isSubmittingComposer.value = true;
  try {
    await withTodoistWrite(async () => {
      for (const image of images) {
        if (image.uploadedUrl) continue;
        image.uploading = true;
        try {
          const uploaded = await todoistService.uploadFile(image.file, image.name);
          image.uploadedUrl = uploaded.file_url;
        } catch {
          image.uploadedUrl = image.previewUrl;
        } finally {
          image.uploading = false;
        }
      }
      const ok = await todoistTaskListController.dispatch("add-task-submit", {
        content: finalContent,
        view,
        group: col,
        projectId,
        sectionId,
        dueDate,
        dueText,
        dueString,
        attachments: images.map(image => ({ file_url: image.uploadedUrl!, file_name: image.name, file_type: image.file.type || "image/png" }))
      });
      if (ok && key === activeComposerKey.value && originalText === composerContent.value &&
          images.length === composerPastedImages.value.length && images.every((image, index) => image === composerPastedImages.value[index])) clearComposerDraft();
    });
  } catch {
    state.emptyText = "提交未确认；保留草稿，没有自动重试。请核对后再操作。";
  } finally { isSubmittingComposer.value = false; }
}

function onComposerKeyDown(event: KeyboardEvent, col: TodoistColumnItem) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    submitComposer(col);
  } else if (event.key === "Escape") {
    event.preventDefault();
    closeComposer();
  }
}

// 板块添加
function submitAddSection() {
  const name = newSectionName.value.trim();
  if (!name) return;
  const col = state.columns.find((c) => c.projectId);
  const projectId = col?.projectId || state.activeProjectId || undefined;
  todoistTaskListController.dispatch("add-section-submit", { name, projectId });
  cancelAddSection();
}

function cancelAddSection() {
  state.addingSection = false;
  newSectionName.value = "";
}

// 板块操作菜单
function toggleSectionMenu(col: TodoistColumnItem, colIndex: number, event: MouseEvent) {
  if (sectionMenu.isOpen && sectionMenu.col === col) {
    sectionMenu.isOpen = false;
    return;
  }
  taskContextMenu.isOpen = false;
  const btn = event.currentTarget as HTMLElement;
  const rect = btn.getBoundingClientRect();
  const menuWidth = 175;
  const left = Math.max(8, Math.min(window.innerWidth - menuWidth - 8, rect.left));
  const top = Math.max(8, Math.min(window.innerHeight - 220, rect.bottom + 4));

  sectionMenu.col = col;
  sectionMenu.x = left;
  sectionMenu.y = top;
  sectionMenu.canMoveLeft = colIndex > 0 && !!state.columns[colIndex - 1]?.sectionId;
  sectionMenu.canMoveRight = colIndex < state.columns.length - 1 && !!state.columns[colIndex + 1]?.sectionId;
  sectionMenu.isOpen = true;
}

function onMoveSection(col: TodoistColumnItem, direction: number) {
  sectionMenu.isOpen = false;
  todoistTaskListController.dispatch("move-section", { sectionId: col.sectionId, direction });
}

// 任务右键上下文菜单控制
function openTaskContextMenu(task: TodoistTaskItem, col: TodoistColumnItem, event: MouseEvent) {
  if (state.movingTaskId === task.id) return;
  if (task.completed) return;
  sectionMenu.isOpen = false;

  const menuWidth = 236;
  const menuHeight = 340;
  const safeLeft = Math.max(8, Math.min(window.innerWidth - menuWidth - 8, event.clientX));
  const safeTop = Math.max(8, Math.min(window.innerHeight - menuHeight - 8, event.clientY));

  taskContextMenu.task = task;
  taskContextMenu.col = col;
  taskContextMenu.x = safeLeft;
  taskContextMenu.y = safeTop;
  taskContextMenu.activeSubpanel = null;
  taskContextMenu.descText = task.description || "";
  taskContextMenu.isSavingDesc = false;
  taskContextMenu.newLabelText = "";
  taskContextMenu.customRecurText = "";

  if (task.dueDate) {
    const parsed = new Date(`${task.dueDate.slice(0, 10)}T00:00:00`);
    if (Number.isFinite(parsed.getTime())) {
      taskContextMenu.calYear = parsed.getFullYear();
      taskContextMenu.calMonth = parsed.getMonth();
    }
  } else {
    const now = new Date();
    taskContextMenu.calYear = now.getFullYear();
    taskContextMenu.calMonth = now.getMonth();
  }

  // 飞出面板边界探测
  const flyoutWidth = 252;
  const openLeft = safeLeft + menuWidth + flyoutWidth > window.innerWidth - 8;
  taskContextMenu.flyoutOpenLeft = openLeft;
  taskContextMenu.flyoutStyle = {
    left: openLeft ? `${-flyoutWidth - 6}px` : `${menuWidth + 6}px`,
    top: "0px"
  };

  taskContextMenu.isOpen = true;
}

function toggleTaskSubpanel(panel: "desc" | "due" | "labels" | "recur" | "color" | "project") {
  if (taskContextMenu.activeSubpanel === panel) {
    taskContextMenu.activeSubpanel = null;
  } else {
    taskContextMenu.activeSubpanel = panel;
    if (panel === "desc") {
      nextTick(() => {
        taskDescInputRef.value?.focus();
        taskDescInputRef.value?.select();
      });
    } else if (panel === "labels") {
      nextTick(() => {
        taskLabelInputRef.value?.focus();
      });
    }
  }
}

function onMenuEditTitle() {
  const task = taskContextMenu.task;
  closeAllPopovers();
  if (task) startEditing(task);
}

function onMenuSaveDesc() {
  if (!taskContextMenu.task) return;
  const taskId = taskContextMenu.task.id;
  const newDesc = taskContextMenu.descText.trim();
  taskContextMenu.isSavingDesc = true;
  taskContextMenu.task.description = newDesc;
  todoistTaskListController.dispatch("update-task-desc", { taskId, description: newDesc });
  closeAllPopovers();
}

function onDescKeyDown(event: KeyboardEvent) {
  if (event.key === "Enter") {
    if (!event.shiftKey) {
      event.preventDefault();
      onMenuSaveDesc();
    }
  } else if (event.key === "Escape") {
    event.preventDefault();
    toggleTaskSubpanel("desc");
  }
}

function getMenuDueBadge(task: TodoistTaskItem | null): string {
  if (!task || !task.dueText) return "无";
  return task.dueText.slice(5) || task.dueText;
}

function onMenuApplyQuickDate(type: "today" | "tomorrow" | "next-week" | "clear") {
  if (!taskContextMenu.task) return;
  const taskId = taskContextMenu.task.id;
  let dateStr: string | null = null;
  if (type === "today") {
    const d = new Date();
    dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  } else if (type === "tomorrow") {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  } else if (type === "next-week") {
    const d = new Date();
    d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7 || 7));
    dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  todoistTaskListController.dispatch("update-task-due", { taskId, dateStr });
  closeAllPopovers();
}

function calMonthPrev() {
  taskContextMenu.calMonth--;
  if (taskContextMenu.calMonth < 0) {
    taskContextMenu.calMonth = 11;
    taskContextMenu.calYear--;
  }
}

function calMonthNext() {
  taskContextMenu.calMonth++;
  if (taskContextMenu.calMonth > 11) {
    taskContextMenu.calMonth = 0;
    taskContextMenu.calYear++;
  }
}

function onMenuSelectDate(dateStr: string) {
  if (!taskContextMenu.task) return;
  const taskId = taskContextMenu.task.id;
  todoistTaskListController.dispatch("update-task-due", { taskId, dateStr });
  closeAllPopovers();
}

function isTaskLabelSelected(label: string): boolean {
  return !!taskContextMenu.task?.labels?.includes(label);
}

function onMenuToggleLabel(label: string) {
  if (!taskContextMenu.task) return;
  const taskId = taskContextMenu.task.id;
  const current = [...(taskContextMenu.task.labels || [])];
  const nextLabels = current.includes(label) ? current.filter((l) => l !== label) : [...current, label];
  taskContextMenu.task.labels = nextLabels;
  todoistTaskListController.dispatch("update-task-labels", { taskId, labels: nextLabels });
}

function onMenuAddNewLabel() {
  if (!taskContextMenu.task) return;
  const val = taskContextMenu.newLabelText.trim();
  if (!val) return;
  taskContextMenu.newLabelText = "";
  const taskId = taskContextMenu.task.id;
  const current = [...(taskContextMenu.task.labels || [])];
  if (!current.includes(val)) {
    current.push(val);
    taskContextMenu.task.labels = current;
    todoistTaskListController.dispatch("update-task-labels", { taskId, labels: current });
  }
  closeAllPopovers();
}

function isRecurSelected(rule: string): boolean {
  return String(taskContextMenu.task?.dueString || "").toLowerCase().includes(rule.toLowerCase());
}

function onMenuSelectRecur(rule: string, label: string) {
  if (!taskContextMenu.task) return;
  const taskId = taskContextMenu.task.id;
  todoistTaskListController.dispatch("update-task-recurring", { taskId, rule, label });
  closeAllPopovers();
}

function onMenuSubmitCustomRecur() {
  if (!taskContextMenu.task) return;
  const val = taskContextMenu.customRecurText.trim();
  if (!val) return;
  const taskId = taskContextMenu.task.id;
  todoistTaskListController.dispatch("update-task-recurring", { taskId, rule: val, label: val });
  closeAllPopovers();
}

function onMenuClearRecur() {
  if (!taskContextMenu.task) return;
  const taskId = taskContextMenu.task.id;
  todoistTaskListController.dispatch("clear-task-recurring", { taskId });
  closeAllPopovers();
}

function onMenuSelectColor(colorId: string) {
  if (!taskContextMenu.task) return;
  const taskId = taskContextMenu.task.id;
  const found = colorPalette.find((c) => c.id === colorId);
  taskContextMenu.task.customColorHex = found?.hex || "";
  todoistTaskListController.dispatch("update-task-color", { taskId, colorId });
  closeAllPopovers();
}

function onMenuMoveToProject(proj: TodoistProjectOption) {
  if (!taskContextMenu.task) return;
  const taskId = taskContextMenu.task.id;
  todoistTaskListController.dispatch("move-task-to-project", {
    taskId,
    targetProjectId: proj.id,
    targetProjectName: proj.name
  });
  closeAllPopovers();
}

function onMenuDeleteTask() {
  if (!taskContextMenu.task) return;
  const task = taskContextMenu.task;
  closeAllPopovers();

  if (task.isRecurring) {
    confirmModal.title = "删除重复任务确认";
    confirmModal.icon = "⚠️";
    confirmModal.danger = true;
    confirmModal.alertText = "此任务使用 Todoist 原生重复规则。删除后将移除此任务，之后不再按该规则重复，无法撤销。";
    confirmModal.message = `任务内容：${task.content}\n循环规则：${task.dueString || "循环任务"}`;
    confirmModal.confirmText = "删除重复任务";
    confirmModal.actionType = "delete-task";
    confirmModal.payload = { taskId: task.id, isRecurring: true };
    confirmModal.isOpen = true;
  } else {
    confirmModal.title = "删除任务确认";
    confirmModal.icon = "🗑️";
    confirmModal.danger = true;
    confirmModal.alertText = `确定要删除任务「${task.content}」吗？`;
    confirmModal.message = "此操作不可撤销。";
    confirmModal.confirmText = "确认删除";
    confirmModal.actionType = "delete-task";
    confirmModal.payload = { taskId: task.id, isRecurring: false };
    confirmModal.isOpen = true;
  }
}

// 暴露 openTaskMenu 供外部命令式桥接调用，避免对象展开导致原型链方法（如 updateState）丢失
if ((window as any).LogicWeaverTodoistTaskList) {
  (window as any).LogicWeaverTodoistTaskList.openTaskMenu = function(task: any, col: any, event: MouseEvent) {
    openTaskContextMenu(task, col, event);
  };
}

// 模态弹窗相关操作
function openCreateProjectPrompt() {
  promptModal.title = "新建项目";
  promptModal.message = "请输入新项目名称：";
  promptModal.value = "";
  promptModal.placeholder = "项目名称…";
  promptModal.confirmText = "创建";
  promptModal.actionType = "create-project";
  promptModal.payload = null;
  promptModal.isOpen = true;
  nextTick(() => promptInputRef.value?.focus());
}

function openRenameProjectPrompt(project: TodoistProjectOption) {
  promptModal.title = "重命名项目";
  promptModal.message = `正在重命名项目「${project.name}」：`;
  promptModal.value = project.name;
  promptModal.placeholder = "新项目名称…";
  promptModal.confirmText = "保存";
  promptModal.actionType = "rename-project";
  promptModal.payload = { projectId: project.id };
  promptModal.isOpen = true;
  nextTick(() => {
    promptInputRef.value?.focus();
    promptInputRef.value?.select();
  });
}

function openRenameSectionPrompt(col: TodoistColumnItem) {
  sectionMenu.isOpen = false;
  promptModal.title = "重命名板块";
  promptModal.message = `正在重命名板块「${col.title}」：`;
  promptModal.value = col.title;
  promptModal.placeholder = "新板块名称…";
  promptModal.confirmText = "保存";
  promptModal.actionType = "rename-section";
  promptModal.payload = { sectionId: col.sectionId };
  promptModal.isOpen = true;
  nextTick(() => {
    promptInputRef.value?.focus();
    promptInputRef.value?.select();
  });
}

function closePromptModal() {
  promptModal.isOpen = false;
}

function submitPromptModal() {
  const val = promptModal.value.trim();
  if (!val) return;
  const { actionType, payload } = promptModal;
  closePromptModal();

  if (actionType === "create-project") {
    todoistTaskListController.dispatch("create-project-submit", val);
  } else if (actionType === "rename-project" && payload && "projectId" in payload) {
    todoistTaskListController.dispatch("rename-project-submit", { projectId: payload.projectId, newName: val });
  } else if (actionType === "rename-section" && payload && "sectionId" in payload) {
    todoistTaskListController.dispatch("rename-section", { sectionId: payload.sectionId, newName: val });
  }
}

function openDeleteProjectConfirm(project: TodoistProjectOption) {
  confirmModal.title = "删除项目确认";
  confirmModal.icon = "🗑️";
  confirmModal.danger = true;
  confirmModal.alertText = `确定要彻底删除项目「${project.name}」吗？`;
  confirmModal.message = "此操作不可撤销，项目下的所有板块与任务也将一并删除！";
  confirmModal.confirmText = "彻底删除";
  confirmModal.actionType = "delete-project";
  confirmModal.payload = { projectId: project.id };
  confirmModal.isOpen = true;
}

function openDeleteSectionConfirm(col: TodoistColumnItem) {
  sectionMenu.isOpen = false;
  confirmModal.title = "删除板块确认";
  confirmModal.icon = "🗑️";
  confirmModal.danger = true;
  confirmModal.alertText = `确定要删除板块「${col.title}」吗？`;
  confirmModal.message = "板块内的任务将自动保留并移至默认收件箱。";
  confirmModal.confirmText = "删除板块";
  confirmModal.actionType = "delete-section";
  confirmModal.payload = { sectionId: col.sectionId };
  confirmModal.isOpen = true;
}

function closeConfirmModal() {
  confirmModal.isOpen = false;
}

function submitConfirmModal() {
  const { actionType, payload } = confirmModal;
  closeConfirmModal();

  if (actionType === "delete-project" && payload && "projectId" in payload) {
    todoistTaskListController.dispatch("delete-project-submit", payload.projectId);
  } else if (actionType === "delete-section" && payload && "sectionId" in payload) {
    todoistTaskListController.dispatch("delete-section", { sectionId: payload.sectionId });
  } else if (actionType === "delete-task" && payload && "taskId" in payload) {
    todoistTaskListController.dispatch("delete-task-submit", payload);
  }
}

function onSwitchProject(projectId: string) {
  todoistTaskListController.dispatch("switch-project", projectId);
}

function handleGlobalKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    if (taskContextMenu.isOpen) {
      taskContextMenu.isOpen = false;
      taskContextMenu.activeSubpanel = null;
    }
    if (sectionMenu.isOpen) {
      sectionMenu.isOpen = false;
    }
  }
}

watch(() => todoistModuleState.active, active => {
  document.removeEventListener("keydown", handleGlobalKeydown);
  if (active) document.addEventListener("keydown", handleGlobalKeydown);
}, { immediate: true, flush: "sync" });

onUnmounted(() => {
  document.removeEventListener("keydown", handleGlobalKeydown);
  clearComposerDraft();
});
</script>

<style scoped>
.github-task-section-badge { margin-left: 5px; padding: 2px 4px; border-radius: 4px; color: var(--accent); background: var(--surface); font-size: 9px; font-weight: 500; }

/* GitHub 任务区分层排版样式 */
.todoist-github-grouped-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  min-height: 80px;
  padding: 4px 2px 16px;
}

.todoist-card-repo-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 5px;
}

.todoist-card-repo-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  max-width: 100%;
  padding: 2px 7px;
  border-radius: 6px;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--heading);
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  box-sizing: border-box;
}

.todoist-card-repo-btn:hover {
  background: var(--surface-hover, var(--border));
  color: var(--accent);
  border-color: var(--accent);
}

.todoist-card-repo-btn .repo-badge-icon {
  font-size: 11.5px;
  line-height: 1;
  flex-shrink: 0;
}

.todoist-card-repo-btn .repo-badge-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1 1 auto;
}

/* Match the accepted native-button typography, including project/recurrence choices. */
.todoist-task-context-menu .todoist-task-menu-item,
.todoist-task-context-menu .todoist-project-flyout-item,
.todoist-task-context-menu .todoist-recur-chip {
  font-family: revert;
  font-size: 11.5px;
  font-weight: 500;
  line-height: normal;
}
.todoist-task-context-menu { background: var(--panel); border-color: var(--border); color: var(--text); }
.todoist-task-context-menu .todoist-task-menu-title { color: var(--heading); }
.todoist-task-context-menu .todoist-task-menu-header { border-color: var(--border); }
.todoist-task-context-menu .todoist-task-menu-item { color: var(--text); gap: 8px; border-radius: 6px; }
.todoist-task-context-menu .todoist-task-menu-item:hover,
.todoist-task-context-menu .todoist-task-menu-item.active {
  background: var(--surface-hover, var(--surface)); color: var(--primary);
}
.todoist-task-context-menu .todoist-task-menu-item.danger { color: var(--danger, #ef4444); }
.todoist-task-context-menu .todoist-menu-icon { font-size: 13px; opacity: .8; }
.todoist-task-context-menu .todoist-task-menu-divider { background: var(--border); }
.todoist-task-context-menu .todoist-project-flyout { background: var(--panel); border-color: var(--border); }
.todoist-task-context-menu .todoist-project-flyout-item,
.todoist-task-context-menu .todoist-recur-chip { color: var(--text); background: var(--surface); border-color: var(--border); }
.todoist-task-context-menu .todoist-project-flyout-item:hover,
.todoist-task-context-menu .todoist-recur-chip:hover,
.todoist-task-context-menu .todoist-project-flyout-item.active,
.todoist-task-context-menu .todoist-recur-chip.selected {
  background: var(--surface-hover, var(--surface)); color: var(--primary);
}
.todoist-task-context-menu .todoist-menu-badge { color: var(--muted); background: var(--surface); }
.todoist-task-context-menu .todoist-menu-arrow { color: var(--muted); }
.todoist-task-menu-item:focus-visible { outline: 2px solid var(--heading); outline-offset: -2px; }
.todoist-board-list { position: relative; }
.todoist-board-list.drag-over {
  background: color-mix(in srgb, var(--primary) 5%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary) 35%, transparent);
}
.todoist-board-task.dragging-task { opacity: 1; border-style: dashed; transform: none; transition: none; }
.todoist-board-task.drop-before::before, .todoist-board-task.drop-after::after {
  content: ""; position: absolute; left: 0; right: 0; height: 2px;
  border-radius: 2px; background: var(--primary); pointer-events: none;
}
.todoist-board-task.drop-before::before { top: 0; }
.todoist-board-task.drop-after::after { bottom: 0; }
.todoist-board-task.saving-position { border-color: var(--primary); }
.todoist-board-task.todoist-task-preview {
  opacity: .65; border: 1px dashed var(--primary); background: var(--panel);
  pointer-events: none; content-visibility: visible;
}
.todoist-board-task.drag-origin-hidden {
  height: 0; min-height: 0; padding: 0; margin: 0; border-width: 0;
  overflow: hidden; opacity: 0; pointer-events: none; contain-intrinsic-size: 0 0;
}
.todoist-position-pending {
  float: right; margin-left: 6px; color: var(--muted); font-size: 10px; line-height: 16px;
}
.todoist-board-task.todoist-task-motion-move,
.todoist-task-motion-enter-active, .todoist-task-motion-leave-active {
  transition: transform .14s ease-out, opacity .14s ease-out;
}
.todoist-task-motion-enter-from { opacity: .55; transform: translateY(4px); }
.todoist-task-motion-leave-to { opacity: 0; }
.todoist-task-motion-leave-active { position: absolute; left: 2px; right: 2px; pointer-events: none; }
@media (prefers-reduced-motion: reduce) {
  .todoist-board-task.todoist-task-motion-move,
  .todoist-task-motion-enter-active, .todoist-task-motion-leave-active { transition: none !important; }
}
.todoist-move-status.error { margin: 0 0 6px 0; padding: 4px 12px; color: var(--text); border-left: 3px solid var(--primary); font-size: 13px; line-height: 18px; }
.todoist-board-add-column-btn {
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  min-height: 40px;
  padding: 10px 14px;
  border: 1px dashed var(--border, #c9cdd2);
  border-radius: 10px;
  background: transparent;
  color: var(--dim, #6b7280);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}
.todoist-board-add-column-btn:hover {
  color: var(--text, #252b34);
  border-style: solid;
  background: var(--surface-hover, rgba(127,127,127,.08));
}
.todoist-board-add-column-btn:focus-visible {
  outline: 2px solid var(--accent, #3b82f6);
  outline-offset: 2px;
}
.todoist-board-add-column-btn > span:first-child { font-size: 18px; line-height: 1; }

.todoist-composer-images {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 6px 0 8px;
}

.todoist-composer-img-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 6px;
  background: var(--panel-hover, rgba(0, 0, 0, 0.05));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  font-size: 12px;
  color: var(--text, #333);
}

.todoist-composer-img-thumb {
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 4px;
}

.todoist-composer-img-name {
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.todoist-composer-img-status {
  font-size: 11px;
  color: var(--accent, #db4035);
}

.todoist-composer-img-remove {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 2px;
  font-size: 14px;
  color: var(--muted, #888);
  display: flex;
  align-items: center;
  justify-content: center;
}

.todoist-composer-img-remove:hover {
  color: var(--accent, #db4035);
}

/* 🖼️ 看板任务卡片图片缩略图预览 */
.todoist-card-thumb-wrap {
  margin: 6px 0 4px;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  max-height: 100px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  background: var(--panel-hover, rgba(0, 0, 0, 0.04));
}

.todoist-card-thumb {
  width: 100%;
  height: 90px;
  object-fit: cover;
  display: block;
}

.todoist-card-img-badge {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 4px;
  backdrop-filter: blur(4px);
}

.todoist-dialog-overlay {
  position: fixed; inset: auto; top: 90px; right: 24px;
  width: min(360px, calc(100vw - 32px)); height: auto;
  background: transparent; backdrop-filter: none; pointer-events: auto;
}
.todoist-dialog-card { width: 100%; max-height: calc(100vh - 120px); overflow: auto; transition: none; }

/* 智能日期识别提示条样式 (适配主题规范，严禁暗色死色) */
.todoist-composer-date-hint {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 5px 8px;
  margin: 6px 0;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 6px;
  font-size: 11px;
  color: var(--text, #334155);
}

.todoist-composer-date-hint.is-ignored {
  opacity: 0.6;
  background: transparent;
  border-style: dashed;
}

.date-hint-left {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.date-hint-icon {
  font-size: 12px;
}

.date-hint-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 1px 6px;
  background: rgba(2, 132, 199, 0.12);
  color: #0284c7;
  border-radius: 4px;
  font-weight: 600;
  font-size: 11px;
}

.date-hint-sub {
  font-weight: normal;
  opacity: 0.8;
  font-size: 10px;
}

.date-hint-preview {
  color: var(--muted, #64748b);
  font-size: 11px;
}

.date-hint-preview strong {
  color: var(--heading, #0f172a);
}

.date-hint-preview.ignored-text {
  font-style: italic;
  color: var(--muted, #94a3b8);
}

.date-hint-toggle-btn {
  background: transparent;
  border: none;
  color: var(--muted, #64748b);
  cursor: pointer;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.15s;
}

.date-hint-toggle-btn:hover {
  background: var(--panel-hover, rgba(0, 0, 0, 0.05));
  color: var(--heading, #0f172a);
}
</style>
