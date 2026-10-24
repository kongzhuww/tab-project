<template>
  <div class="settings-view-root" :aria-busy="settingsSaving || settingsLoading">
    <div class="settings-view-shell">
      <!-- 视窗右上角控制按钮：固定在设置窗口右上角，无论滚动到多下面始终可见 -->
      <div v-if="!isStandalonePage" class="settings-window-actions">
        <button
          id="settings-minimize"
          type="button"
          class="settings-win-btn"
          title="最小化（标签保留）"
          @click.stop="handleMinimize"
        >−</button>
        <button
          id="settings-close"
          type="button"
          class="settings-win-btn close"
          title="关闭"
          @click.stop="handleClose"
        >✕</button>
      </div>

      <!-- 侧边栏导航 -->
      <aside class="settings-view-nav">
        <div class="settings-brand" @pointerdown="onDragPointerDown">
          <span class="settings-brand-mark">TP</span>
          <div>
            <strong>tab-project</strong>
            <small>CONTROL CENTER</small>
          </div>
        </div>

        <p class="settings-nav-label">设置分类</p>
        <nav class="settings-nav-links">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="nav-tab-btn"
            :class="{ active: currentTab === tab.id }"
            @click="currentTab = tab.id"
          >
            <span>{{ tab.index }}</span>
            {{ tab.name }}
          </button>
        </nav>

        <!-- 开发者与测试：新用户开箱视角体验沙箱 -->
        <div class="settings-nav-dev-card">
          <button
            type="button"
            class="btn-nav-dev-preview secondary"
            :class="{ active: isGuestPreviewActive }"
            @click="handleToggleGuestPreview"
          >
            <span>{{ isGuestPreviewActive ? '👀 恢复真实数据' : '🧪 页面内空态预览' }}</span>
          </button>
          <p>零数据空态视角，体验新用户初次打开的开箱状态。</p>
        </div>
      </aside>

      <!-- 主设置内容区域 -->
      <main ref="settingsMain" class="settings-view-main">
        <header
          class="settings-hero"
          @pointerdown="onDragPointerDown"
          @dblclick="onHeroDblClick"
        >
          <div class="settings-hero-copy">
            <p class="settings-kicker">CONTROL CENTER / PERSONAL SETTINGS</p>
            <h1>{{ currentTabTitle }}</h1>
            <p>集中管理首页组件、服务连接、快捷键与多端云同步。开关即时保存，输入项可完成编辑后统一保存。</p>
          </div>
        </header>

        <fieldset class="settings-fields" :disabled="!settingsReady || settingsSaving">
        <!-- 01 模块与功能 -->
        <section v-show="currentTab === 'modules'" class="settings-panel">
          <header class="panel-head">
            <span class="panel-index">01</span>
            <div>
              <h2>模块与功能</h2>
              <p>决定新标签页首页显示哪些核心卡片与启动行为。</p>
            </div>
          </header>

          <!-- 1. 界面布局与基础行为 -->
          <div class="settings-subgroup">
            <div class="settings-subgroup-title">
              <span>🧭 界面布局与基础交互</span>
              <small>LAYOUT & BEHAVIOR</small>
            </div>

            <div class="field full-width">
              <label>Dock 栏停靠位置 <em>DOCK POSITION</em></label>
              <select v-model="form.dockPosition" @change="onDockPositionChange">
                <option value="bottom">⬇️ 屏幕底部居中（默认 · 经典 Dock）</option>
                <option value="left">⬅️ 屏幕左侧居中（紧凑垂直侧边栏）</option>
                <option value="right">➡️ 屏幕右侧居中（紧凑垂直侧边栏）</option>
                <option value="top">⬆️ 屏幕顶部悬浮（顶栏下方居中）</option>
              </select>
              <p class="hint">自由切换底部、顶部、左侧或右侧停靠，满足多显示器与不同屏幕的使用习惯。</p>
            </div>

            <div class="field full-width" style="margin-top: 8px;">
              <label>默认搜索引擎 <em>SEARCH ENGINE</em></label>
              <select v-model="form.searchEngine" @change="saveImmediate('searchEngine')">
                <option value="bing">🔷 必应 (Bing) · 国内外综合智能检索</option>
                <option value="google">🌐 谷歌 (Google) · 全球学术与开发生态检索</option>
                <option value="baidu">🐾 百度 (Baidu) · 中文资讯与本土生活搜索</option>
                <option value="duckduckgo">🦆 DuckDuckGo · 隐私保护与零追踪搜索</option>
              </select>
              <p class="hint">新标签页搜索栏回车或选择第一项直达时，将调用所选的默认搜索引擎。</p>
            </div>

            <div class="field full-width" style="margin-top: 8px;">
              <label>开屏动画风格 <em>STARTUP STYLE</em></label>
              <div style="display:flex;gap:10px;align-items:center;">
                <select v-model="form.startupAnimationStyle" style="flex:1;" @change="saveImmediate('startupAnimationStyle')">
                  <option value="endfield">终末地 (Endfield) · 工业高能黑黄动效</option>
                  <option value="rhinelab">莱茵生命 (Rhine Lab) · 科研终端科技动效 (Joyce Moore)</option>
                </select>
                <button type="button" class="btn-secondary" style="min-width:110px;" @click="previewStartup">预览动效 ↗</button>
              </div>
              <p class="hint">可自由切换明日方舟「终末地」黑黄工业动效，或「莱茵生命」科研终端动效。</p>
            </div>

            <div class="module-toggles" style="margin-top: 10px;">
              <label class="toggle-card">
                <span class="toggle-copy">
                  <b>开屏启动动画</b>
                  <small>新标签页启动进度与品牌动画</small>
                </span>
                <input v-model="form.showStartupAnimation" type="checkbox" @change="saveImmediate('showStartupAnimation')" />
                <i class="switch"></i>
              </label>
              <label class="toggle-card">
                <span class="toggle-copy"><b>仅保留一个主界面</b><small>后续标签打开大号搜索</small></span>
                <input v-model="form.singleNewTab" type="checkbox" @change="saveImmediate('singleNewTab')" />
                <i class="switch"></i>
              </label>
            </div>
          </div>

          <!-- 3. 搜索栏位与引擎管理 -->
          <div class="settings-subgroup">
            <div class="settings-subgroup-title">
              <span>🔍 搜索栏位与引擎管理</span>
              <small>SEARCH MODES & ENGINES</small>
            </div>
            <p class="hint" style="margin: 0 0 10px;">
              管理主搜索框可切换的搜索栏位。点击搜索框左侧图标可循环切换，支持自定义添加任意网站搜索直达（低代码免开发）。
            </p>

            <!-- 搜索栏位列表 -->
            <div class="search-slots-list">
              <div
                v-for="(slot, idx) in searchSlots"
                :key="slot.id"
                class="search-slot-row"
                :class="{ disabled: !slot.enabled }"
              >
                <!-- 排序与移动 -->
                <div class="search-slot-order">
                  <button
                    type="button"
                    class="btn-slot-move"
                    :disabled="idx === 0"
                    title="上移"
                    @click="moveSearchSlot(slot.id, 'up')"
                  >▲</button>
                  <button
                    type="button"
                    class="btn-slot-move"
                    :disabled="idx === searchSlots.length - 1"
                    title="下移"
                    @click="moveSearchSlot(slot.id, 'down')"
                  >▼</button>
                </div>

                <!-- 图标徽章预览 -->
                <div
                  class="search-slot-badge-preview"
                  :style="{ borderColor: slot.themeColor, color: slot.themeColor, backgroundColor: `color-mix(in srgb, ${slot.themeColor} 12%, transparent)` }"
                >
                  <img v-if="slot.iconType === 'svg'" :src="slot.iconValue" alt="" style="width:16px;height:16px;" />
                  <span v-else>{{ slot.iconValue || '⌕' }}</span>
                </div>

                <!-- 名称与 URL 提示 -->
                <div class="search-slot-info">
                  <div class="search-slot-title-row">
                    <strong class="search-slot-name">{{ slot.name }}</strong>
                    <span v-if="slot.isBuiltin" class="search-slot-tag builtin">默认内置</span>
                    <span v-else class="search-slot-tag custom">自定义</span>
                  </div>
                  <small class="search-slot-url" :title="slot.searchUrl">{{ slot.placeholder || slot.searchUrl }}</small>
                </div>

                <!-- 动作操作区 -->
                <div class="search-slot-actions">
                  <button
                    v-if="!slot.isBuiltin"
                    type="button"
                    class="btn-slot-del"
                    title="删除此自定义栏位"
                    @click="deleteSearchSlot(slot.id)"
                  >✕</button>

                  <!-- 启用开关 -->
                  <label class="slot-switch-label" :title="slot.enabled ? '已启用，点击禁用' : '已禁用，点击启用'">
                    <input
                      type="checkbox"
                      v-model="slot.enabled"
                      @change="handleToggleSlot(slot.id)"
                    />
                    <i class="switch"></i>
                  </label>
                </div>
              </div>
            </div>

            <!-- 底部添加按钮与重置 -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px; gap: 8px;">
              <button
                type="button"
                class="btn-secondary"
                style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; font-size: 12px;"
                @click="showAddSlotForm = !showAddSlotForm"
              >
                <span>{{ showAddSlotForm ? "▲ 收起面板" : "+ 添加自定义搜索栏位" }}</span>
              </button>
              <button
                type="button"
                class="btn-ghost-small"
                style="font-size: 11px; opacity: 0.75;"
                title="重置所有搜索栏位为初始状态"
                @click="handleResetSlots"
              >
                恢复默认栏位
              </button>
            </div>

            <!-- 低代码添加自定义栏位抽屉 -->
            <div v-if="showAddSlotForm" class="search-slot-add-drawer">
              <div class="drawer-header">
                <strong>✨ 快速添加自定义搜索栏位</strong>
                <small>支持一键套用常用平台，或填入包含 {query} 的搜索网址</small>
              </div>

              <!-- 快捷预设芯片 -->
              <div class="template-chips-section">
                <span class="chips-label">一键套用预设：</span>
                <div class="template-chips">
                  <button
                    v-for="tmpl in SEARCH_SLOT_TEMPLATES"
                    :key="tmpl.name"
                    type="button"
                    class="template-chip-btn"
                    @click="applySlotTemplate(tmpl)"
                  >
                    <span>{{ tmpl.iconValue }}</span>
                    <span>{{ tmpl.name }}</span>
                  </button>
                </div>
              </div>

              <!-- 输入表单 -->
              <div class="slot-form-grid">
                <div class="slot-form-field">
                  <label>栏位名称 <em>NAME</em></label>
                  <input
                    v-model="newSlotForm.name"
                    type="text"
                    placeholder="如：YouTube、小红书"
                  />
                </div>

                <div class="slot-form-field">
                  <label>图标 (Emoji) <em>ICON</em></label>
                  <div style="display:flex;gap:6px;align-items:center;">
                    <input
                      v-model="newSlotForm.iconValue"
                      type="text"
                      placeholder="🎬"
                      style="width: 50px; text-align: center; font-size: 15px;"
                    />
                    <div class="quick-emojis">
                      <span
                        v-for="emo in ['🎬', '📕', '💡', '🤖', '🔍', '🎓', '🛍️', '🎧', '💻', '📰']"
                        :key="emo"
                        class="quick-emo-item"
                        @click="newSlotForm.iconValue = emo"
                      >{{ emo }}</span>
                    </div>
                  </div>
                </div>

                <div class="slot-form-field full-width">
                  <label>主题颜色 <em>THEME COLOR</em></label>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <input
                      v-model="newSlotForm.themeColor"
                      type="color"
                      style="width: 32px; height: 28px; padding: 0; border: 1px solid var(--border); border-radius: 6px; cursor: pointer; background: transparent;"
                    />
                    <div class="quick-color-palette">
                      <span
                        v-for="color in ['#38bdf8', '#f43f5e', '#ff2442', '#10b981', '#0084ff', '#8b5cf6', '#f59e0b', '#06b6d4']"
                        :key="color"
                        class="palette-dot"
                        :style="{ backgroundColor: color }"
                        :class="{ active: newSlotForm.themeColor === color }"
                        @click="newSlotForm.themeColor = color"
                      ></span>
                    </div>
                  </div>
                </div>

                <div class="slot-form-field full-width">
                  <label>搜索直达 URL 模板 <em>SEARCH URL ({query})</em></label>
                  <input
                    v-model="newSlotForm.searchUrl"
                    type="text"
                    placeholder="如：https://www.youtube.com/results?search_query={query}"
                  />
                  <p class="field-hint">请使用 <code>{query}</code> 作为你的搜索词占位符，回车将自动拼接并打开。</p>
                </div>

                <div class="slot-form-field full-width">
                  <label>占位提示文字 (选填) <em>PLACEHOLDER</em></label>
                  <input
                    v-model="newSlotForm.placeholder"
                    type="text"
                    placeholder="如：搜索 YouTube 精彩视频与博主…"
                  />
                </div>
              </div>

              <div class="slot-form-actions">
                <button type="button" class="btn-secondary" @click="showAddSlotForm = false">取消</button>
                <button type="button" class="btn-save-green" @click="handleAddSlotSubmit">确认添加</button>
              </div>
            </div>
          </div>

          <!-- 4. 首页组件与动效开关 -->
          <div class="settings-subgroup">
            <div class="settings-subgroup-title">
              <span>🧩 首页卡片组件与动效</span>
              <small>CARDS & VISUAL EFFECTS</small>
            </div>
            <div class="module-toggles">
              <label class="toggle-card">
                <span class="toggle-copy"><b>天气模块</b><small>当前天气与短期预报</small></span>
                <input v-model="form.showWeather" type="checkbox" @change="saveImmediate('showWeather')" />
                <i class="switch"></i>
              </label>
              <label class="toggle-card">
                <span class="toggle-copy"><b>常用网站</b><small>快捷入口与自定义分区</small></span>
                <input v-model="form.showSites" type="checkbox" @change="saveImmediate('showSites')" />
                <i class="switch"></i>
              </label>
              <label class="toggle-card">
                <span class="toggle-copy"><b>B站收藏夹</b><small>读取当前登录账号收藏</small></span>
                <input v-model="form.showBili" type="checkbox" @change="saveImmediate('showBili')" />
                <i class="switch"></i>
              </label>
              <label class="toggle-card">
                <span class="toggle-copy"><b>日报 · YouTube</b><small>订阅更新与播放列表</small></span>
                <input v-model="form.showYouTube" type="checkbox" @change="saveImmediate('showYouTube')" />
                <i class="switch"></i>
              </label>
              <label class="toggle-card">
                <span class="toggle-copy"><b>任务串</b><small>首页任务轮播区域</small></span>
                <input v-model="form.showTodo" type="checkbox" @change="saveImmediate('showTodo')" />
                <i class="switch"></i>
              </label>
              <label class="toggle-card">
                <span class="toggle-copy"><b>常驻导航悬浮球</b><small>关闭则仅快捷键唤出</small></span>
                <input v-model="form.showNavBall" type="checkbox" @change="saveImmediate('showNavBall')" />
                <i class="switch"></i>
              </label>
              <label class="toggle-card">
                <span class="toggle-copy"><b>浏览器书签菜单</b><small>侧边书签整理面板</small></span>
                <input v-model="form.showBookmarkPanel" type="checkbox" @change="saveImmediate('showBookmarkPanel')" />
                <i class="switch"></i>
              </label>
              <label class="toggle-card">
                <span class="toggle-copy"><b>顶部书签文件夹</b><small>替代浏览器原生书签栏</small></span>
                <input v-model="form.showBookmarkFoldersTop" type="checkbox" @change="saveImmediate('showBookmarkFoldersTop')" />
                <i class="switch"></i>
              </label>
              <label class="toggle-card">
                <span class="toggle-copy"><b>音乐卡片音频频谱</b><small>跟随音频实时跳动频谱柱</small></span>
                <input v-model="form.showHomeMusicVisualizer" type="checkbox" @change="saveImmediate('showHomeMusicVisualizer')" />
                <i class="switch"></i>
              </label>
              <label class="toggle-card">
                <span class="toggle-copy"><b>边狱巴士 漫游歌词</b><small>屏幕随机位置逐字跟随演出</small></span>
                <input v-model="form.showLimbusLyricEffect" type="checkbox" @change="saveImmediate('showLimbusLyricEffect')" />
                <i class="switch"></i>
              </label>
            </div>
          </div>
        </section>

        <!-- 02 快捷键配置 -->
        <section v-show="currentTab === 'shortcuts'" class="settings-panel">
          <header class="panel-head">
            <span class="panel-index">02</span>
            <div>
              <h2>快捷键与工具触发</h2>
              <p>点击右侧按键槽后，直接在键盘上按下你期望的快捷键组合，即可自动录入。</p>
            </div>
          </header>

          <div class="shortcuts-grid">
            <div v-for="tool in shortcutTools" :key="tool.id" class="shortcut-row">
              <span class="shortcut-label">{{ tool.label }}</span>
              <div class="shortcut-actions">
                <button
                  type="button"
                  class="shortcut-key-btn"
                  :class="{ recording: recordingToolId === tool.id }"
                  @click="startRecordShortcut(tool.id)"
                >
                  {{ recordingToolId === tool.id ? '请按下按键...' : (customShortcuts[tool.id] || tool.defaultKey || '未分配') }}
                </button>
                <button
                  v-if="customShortcuts[tool.id] || tool.defaultKey"
                  type="button"
                  class="shortcut-clear-btn"
                  title="清除此按键"
                  @click="clearShortcut(tool.id)"
                >✕</button>
              </div>
            </div>
          </div>

          <div class="fixed-shortcuts-card" style="margin-top: 18px;">
            <div class="fixed-shortcuts-head">⚡ 系统内置快捷键速查</div>
            <div class="fixed-shortcuts-grid">
              <div class="fixed-row"><span class="fs-desc">🔍 快速聚焦搜索框</span><span class="fs-keys"><kbd>Ctrl</kbd> + <kbd>E</kbd> / <kbd>K</kbd> / <kbd>/</kbd></span></div>
              <div class="fixed-row"><span class="fs-desc">➕ Todoist 快速新建任务</span><span class="fs-keys"><kbd>Alt</kbd> + <kbd>A</kbd></span></div>
              <div class="fixed-row"><span class="fs-desc">✕ 关闭当前活动的多窗口</span><span class="fs-keys"><kbd>Alt</kbd> + <kbd>W</kbd></span></div>
              <div class="fixed-row"><span class="fs-desc">⚡ 极速搜索页进入主标签页</span><span class="fs-keys"><kbd>Alt</kbd> + <kbd>H</kbd></span></div>
              <div class="fixed-row"><span class="fs-desc">⎋ 清除搜索 / 退出弹窗</span><span class="fs-keys"><kbd>Esc</kbd></span></div>
            </div>
          </div>
        </section>

        <!-- 03 搜索与书签过滤 -->
        <section v-show="currentTab === 'privacy'" class="settings-panel">
          <header class="panel-head">
            <span class="panel-index">03</span>
            <div>
              <h2>搜索与书签过滤</h2>
              <p>排除特定书签文件夹，避免其出现在主搜索框的实时联想建议中。</p>
            </div>
          </header>

          <div class="fields-grid">
            <div class="field full-width">
              <label>排除书签文件夹 <em>SEARCH FILTER</em></label>
              <div style="display:flex;gap:10px;align-items:center;">
                <select v-model="selectedFolderToAdd" style="flex:1;">
                  <option value="">{{ availableFolders.length ? '选择要排除的书签文件夹…' : '正在读取浏览器书签…' }}</option>
                  <option v-for="f in availableFolders" :key="f.id" :value="f.id">{{ f.path }}</option>
                </select>
                <button type="button" class="btn-secondary" :disabled="!selectedFolderToAdd" @click="addIgnoredFolder">＋ 添加到排除</button>
              </div>

              <div class="ignored-folders-list" style="margin-top: 14px;">
                <div v-for="folder in visibleIgnoredFolders" :key="folder.rowKey" class="ignored-folder-row">
                  <span class="folder-path">{{ folder.path }}</span>
                  <button type="button" class="icon-btn-danger" @click="removeIgnoredFolder(folder.id)">✕</button>
                </div>
                <p v-if="legacyIgnoredCount" class="hint">另有 {{ legacyIgnoredCount }} 条旧格式规则原样保留，本面板不编辑或清理它们。</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 04 漫游歌词高级定制 -->
        <section v-show="currentTab === 'limbus'" class="settings-panel">
          <header class="panel-head">
            <span class="panel-index">04</span>
            <div>
              <h2>边狱巴士 漫游歌词定制</h2>
              <p>深度调整全屏漫游歌词色彩、字体、描边宽度、光晕与 3D 透视视差。</p>
            </div>
          </header>

          <div class="fields-grid">
            <div class="field full-width">
              <label>色彩风格预设 <em>PRESET</em></label>
              <select v-model="limbus.preset" @change="applyLimbusPreset">
                <option value="cover">🖼 封面自适应 (随当前播放专辑封面实时变色 - 强烈推荐)</option>
                <option value="default">👑 通用 (经典金珀) — Limbus 默认战役风格</option>
                <option value="heartbreak">💔 心碎 (暴怒紫红) — 绯红暴怒战斗色相</option>
                <option value="command">💠 指令 (科技青蓝) — 绝密指引深空荧光</option>
                <option value="custom">🎨 自定义色彩与特效</option>
              </select>
            </div>

            <div class="field">
              <label>主文字颜色 <em>TEXT COLOR</em></label>
              <div style="display:flex;gap:10px;align-items:center;">
                <input v-model="limbus.textColor" type="color" class="color-picker" @input="markLimbusField('textColor')" />
                <input v-model="limbus.textColor" type="text" style="flex:1;" @input="markLimbusField('textColor')" />
              </div>
            </div>

            <div class="field">
              <label>轮廓描边颜色 <em>STROKE</em></label>
              <div style="display:flex;gap:10px;align-items:center;">
                <input v-model="limbus.strokeColor" type="color" class="color-picker" @input="markLimbusField('strokeColor')" />
                <input v-model="limbus.strokeColor" type="text" style="flex:1;" @input="markLimbusField('strokeColor')" />
              </div>
            </div>

            <div class="field">
              <label>辉光光晕颜色 <em>GLOW</em></label>
              <div style="display:flex;gap:10px;align-items:center;">
                <input v-model="limbus.glowColor" type="color" class="color-picker" @input="markLimbusField('glowColor')" />
                <input v-model="limbus.glowColor" type="text" style="flex:1;" @input="markLimbusField('glowColor')" />
              </div>
            </div>

            <div class="field">
              <label>描边轮廓宽度 <em>WIDTH</em></label>
              <select v-model="limbus.strokeWidth" @change="markLimbusField('strokeWidth')">
                <option value="1.5">细致 (1.5px)</option>
                <option value="2.2">标准 (2.2px - 原版预设)</option>
                <option value="3.0">浓重 (3.0px)</option>
                <option value="4.0">超厚 (4.0px)</option>
              </select>
            </div>

            <div class="field">
              <label>字号大小 <em>FONT SIZE</em></label>
              <select v-model="limbus.fontSize" @change="markLimbusField('fontSize')">
                <option value="26">紧凑 (26px)</option>
                <option value="36">标准 (36px - 推荐)</option>
                <option value="46">大型 (46px - 巨幕沉浸)</option>
                <option value="56">特大 (56px - 冲击力)</option>
              </select>
            </div>

            <div class="field">
              <label>3D 透视视差倾角 <em>PERSPECTIVE</em></label>
              <select v-model="limbus.perspectiveStrength" @change="markLimbusField('perspectiveStrength')">
                <option value="0">关闭透视 (纯平面)</option>
                <option value="0.6">轻柔透视 (0.6x)</option>
                <option value="1.0">标准透视 (1.0x - 原版算法)</option>
                <option value="1.5">强烈透视 (1.5x - 视差拉扯)</option>
              </select>
            </div>
          </div>
        </section>

        <!-- 05 壁纸与桌面背景 -->
        <section v-show="currentTab === 'wallpaper'" class="settings-panel">
          <header class="panel-head">
            <span class="panel-index">05</span>
            <div>
              <h2>壁纸与桌面背景</h2>
              <p>个性化定制新标签页背景：支持预设山景、纯黑无干扰、赛博霓虹渐变、自定义本地图片与动态视频壁纸。</p>
            </div>
          </header>

          <div class="fields-grid">
            <!-- 快捷导入与工具栏 -->
            <div class="field full-width">
              <label>导入与管理 <em>IMPORT & ACTIONS</em></label>
              <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
                <button type="button" class="btn-primary" @click="handleImportWallpaperImage">
                  ＋ 导入本地图片
                </button>
                <button type="button" class="btn-primary" @click="handleImportWallpaperVideo">
                  ▶ 导入动态视频 (MP4/WebM)
                </button>
                <button type="button" class="btn-secondary" @click="handleImportWallpaperFolder">
                  📁 批量导入文件夹
                </button>
                <button type="button" class="btn-secondary" :disabled="wallpaperLoading" @click="loadWallpaperData">
                  🔄 刷新壁纸库
                </button>
              </div>
              <div v-if="wallpaperStatusMsg" style="margin-top: 8px; font-size: 11px; padding: 6px 10px; border-radius: 6px; background: var(--panel); border: 1px solid var(--border); color: var(--text);">
                {{ wallpaperStatusMsg }}
              </div>
            </div>

            <!-- 1. 精选风格与内置预设 -->
            <div class="field full-width">
              <label>精选预设与风格 <em>BUILTIN PRESETS</em></label>
              <div class="wallpaper-presets-grid">
                <div
                  v-for="item in BUILTIN_WALLPAPERS"
                  :key="item.id"
                  class="wallpaper-item-card"
                  :class="{ 'is-active': isWallpaperActive(item) }"
                  @click="handleSelectWallpaper(item)"
                >
                  <div
                    class="wallpaper-card-preview"
                    :style="item.style ? item.style : (item.thumb ? { backgroundImage: `url(${item.thumb})` } : {})"
                  >
                    <span class="wallpaper-card-badge">{{ item.kind }}</span>
                    <span v-if="isWallpaperActive(item)" class="wallpaper-card-active-pill">✓ 使用中</span>
                  </div>
                  <div class="wallpaper-card-meta">
                    <span class="wallpaper-card-title">{{ item.title }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. 我的壁纸库 (用户自导入) -->
            <div class="field full-width">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label style="margin-bottom: 0;">本地与自导入壁纸库 <em>MY WALLPAPERS ({{ wallpaperHistory.length }})</em></label>
                <!-- 分页操作 -->
                <div v-if="totalWallpaperPages > 1" style="display: flex; gap: 6px; align-items: center; font-size: 11px;">
                  <button
                    type="button"
                    class="btn-secondary"
                    style="padding: 2px 8px; font-size: 11px;"
                    :disabled="wallpaperCurrentPage <= 1"
                    @click="wallpaperCurrentPage--"
                  >
                    ◀
                  </button>
                  <span style="color: var(--muted);">{{ wallpaperCurrentPage }} / {{ totalWallpaperPages }}</span>
                  <button
                    type="button"
                    class="btn-secondary"
                    style="padding: 2px 8px; font-size: 11px;"
                    :disabled="wallpaperCurrentPage >= totalWallpaperPages"
                    @click="wallpaperCurrentPage++"
                  >
                    ▶
                  </button>
                </div>
              </div>

              <div v-if="wallpaperHistory.length === 0" style="padding: 24px; text-align: center; border: 1px dashed var(--border); border-radius: 10px; margin-top: 10px; color: var(--muted); font-size: 12px;">
                暂无导入的自定义壁纸，点击上方「＋ 导入本地图片」或「▶ 导入动态视频」添加你喜爱的桌面壁纸！
              </div>

              <div v-else class="wallpaper-library-grid">
                <div
                  v-for="item in paginatedUserWallpapers"
                  :key="item.id"
                  class="wallpaper-item-card"
                  :class="{ 'is-active': isWallpaperActive(item) }"
                  @click="handleSelectWallpaper(item)"
                >
                  <div class="wallpaper-card-preview">
                    <!-- 视频缩略图预览 -->
                    <video
                      v-if="item.kind === '视频' && wallpaperPreviewMap[item.id]"
                      :src="wallpaperPreviewMap[item.id]"
                      autoplay
                      loop
                      muted
                      playsinline
                      preload="metadata"
                    />
                    <!-- 图片缩略图预览 -->
                    <img
                      v-else-if="wallpaperPreviewMap[item.id] || (item as any).thumb"
                      :src="wallpaperPreviewMap[item.id] || (item as any).thumb"
                      alt=""
                      loading="lazy"
                    />
                    <div v-else style="font-size: 20px; color: var(--muted);">
                      {{ item.kind === '视频' ? '▶' : '🖼️' }}
                    </div>

                    <span class="wallpaper-card-badge">{{ item.kind || '本地' }}</span>
                    <span v-if="isWallpaperActive(item)" class="wallpaper-card-active-pill">✓ 使用中</span>

                    <!-- 删除按钮 -->
                    <button
                      type="button"
                      class="wallpaper-card-delete-btn"
                      :title="confirmingWallpaperDelete === item.id ? '再次点击确认删除' : '删除该壁纸'"
                      @click.stop="handleDeleteWallpaper(item)"
                    >
                      {{ confirmingWallpaperDelete === item.id ? '✓' : '×' }}
                    </button>
                  </div>

                  <div class="wallpaper-card-meta" @click.stop>
                    <template v-if="editingWallpaperId === item.id">
                      <input
                        v-model="editingWallpaperTitle"
                        type="text"
                        style="width: 100%; box-sizing: border-box; padding: 2px 6px; font-size: 11px; border: 1px solid #38bdf8; border-radius: 4px; background: var(--panel); color: var(--text);"
                        @keydown.enter="saveRenameWallpaper(item)"
                        @keydown.esc="cancelRenameWallpaper"
                      />
                      <button type="button" class="wallpaper-card-edit-btn" title="保存" @click="saveRenameWallpaper(item)">✓</button>
                      <button type="button" class="wallpaper-card-edit-btn" title="取消" @click="cancelRenameWallpaper">✕</button>
                    </template>
                    <template v-else>
                      <span class="wallpaper-card-title" :title="item.title">{{ item.title || '自定义壁纸' }}</span>
                      <button type="button" class="wallpaper-card-edit-btn" title="重命名" @click="startRenameWallpaper(item)">✏️</button>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 06 版本与在线更新 -->
        <section v-show="currentTab === 'sync'" class="settings-panel">
          <header class="panel-head">
            <span class="panel-index">06</span>
            <div>
              <h2>数据备份、多端云同步与版本更新</h2>
              <p>管理新标签页的 WebDAV 云端同步、本地 JSON 配置快照导出，以及版本检查与热重载。</p>
            </div>
          </header>

          <div class="fields-grid">
            <!-- 1. WebDAV 云端备份与漫游 -->
            <div class="field full-width">
              <label>☁️ WebDAV 多端云端漫游 <em>WEBDAV CLOUD SYNC</em></label>
              <p class="hint" style="margin: 0 0 10px;">
                支持坚果云、Nextcloud、私有 NAS 或 VPS 搭建的 WebDAV 服务。配置后可实现不同电脑间配置一键漫游同步。
              </p>

              <div style="display: flex; flex-direction: column; gap: 10px; background: color-mix(in srgb, var(--panel) 92%, var(--text) 8%); padding: 14px; border-radius: 10px; border: 1px solid var(--border);">
                <div>
                  <label style="font-size: 11.5px; color: var(--text);">WebDAV 服务器地址</label>
                  <input
                    v-model="webdavDraft.webdavUrl"
                    type="url"
                    placeholder="https://dav.jianguoyun.com/dav/LogicWeaver/"
                    style="width: 100%; box-sizing: border-box; padding: 7px 10px; border: 1px solid var(--border); border-radius: 7px; background: var(--panel); color: var(--text); font-size: 12px;"
                  />
                  <small style="font-size: 10px; color: var(--muted); margin-top: 2px; display: block;">坚果云用户推荐在应用管理生成应用密码，地址填写根目录或子文件夹。</small>
                </div>

                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                  <div style="flex: 1; min-width: 180px;">
                    <label style="font-size: 11.5px; color: var(--text);">账号 / 邮箱</label>
                    <input
                      v-model="webdavDraft.webdavUsername"
                      type="text"
                      placeholder="account@example.com"
                      style="width: 100%; box-sizing: border-box; padding: 7px 10px; border: 1px solid var(--border); border-radius: 7px; background: var(--panel); color: var(--text); font-size: 12px;"
                    />
                  </div>
                  <div style="flex: 1; min-width: 180px;">
                    <label style="font-size: 11.5px; color: var(--text);">应用专用密码</label>
                    <input
                      v-model="webdavDraft.webdavPassword"
                      type="password"
                      placeholder="••••••••••••"
                      style="width: 100%; box-sizing: border-box; padding: 7px 10px; border: 1px solid var(--border); border-radius: 7px; background: var(--panel); color: var(--text); font-size: 12px;"
                    />
                  </div>
                  <div style="flex: 1; min-width: 160px;">
                    <label style="font-size: 11.5px; color: var(--text);">备份文件名</label>
                    <input
                      v-model="webdavDraft.webdavFilename"
                      type="text"
                      placeholder="logicweaver-settings.json"
                      style="width: 100%; box-sizing: border-box; padding: 7px 10px; border: 1px solid var(--border); border-radius: 7px; background: var(--panel); color: var(--text); font-size: 12px;"
                    />
                  </div>
                </div>

                <!-- WebDAV 操作按钮行 -->
                <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-top: 4px;">
                  <button type="button" class="btn-primary" :disabled="webdavBusy" @click="handleSaveWebDav">
                    保存连接设置
                  </button>
                  <button type="button" class="btn-secondary" :disabled="webdavBusy" @click="handleTestWebDav">
                    测试连接
                  </button>
                  <button type="button" class="btn-save-green" :disabled="webdavBusy" @click="handlePushWebDav">
                    ⬆️ 上传备份到云端
                  </button>
                  <button type="button" class="btn-secondary" :disabled="webdavBusy" style="color: #0284c7;" @click="handlePullWebDav">
                    ⬇️ 从云端恢复备份
                  </button>
                </div>

                <!-- 提示反馈 -->
                <div v-if="webdavStatusMsg" style="font-size: 11px; padding: 6px 10px; border-radius: 6px; background: var(--panel); border: 1px solid var(--border); color: var(--text);">
                  {{ webdavStatusMsg }}
                </div>
              </div>
            </div>

            <!-- 2. 本地数据快照文件 -->
            <div class="field full-width">
              <label>📦 本地数据快照文件 <em>LOCAL BACKUP & RESTORE</em></label>
              <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; background: color-mix(in srgb, var(--panel) 92%, var(--text) 8%); padding: 12px 14px; border-radius: 10px; border: 1px solid var(--border);">
                <button type="button" class="btn-secondary" @click="handleExportLocalJson">
                  💾 导出配置为本地 JSON
                </button>
                <label class="btn-secondary" style="cursor: pointer; margin: 0; display: inline-flex; align-items: center;">
                  📂 导入本地 JSON 恢复
                  <input type="file" accept=".json,application/json" style="display: none;" @change="handleImportLocalJson" />
                </label>
                <span v-if="localBackupMsg" style="font-size: 11px; color: #10b981; font-weight: bold;">
                  {{ localBackupMsg }}
                </span>
                <small style="flex-basis: 100%; color: var(--muted); font-size: 10.5px; margin-top: 2px;">
                  本地快照包含常用网站、分组布局、主题、快捷键等普通配置，不含任何账户密码私密信息。
                </small>
              </div>
            </div>

            <!-- 3. 插件版本控制与更新 -->
            <div class="field full-width">
              <label>🚀 插件版本与 GitHub 在线更新 <em>RELEASE & GIT</em></label>
              <div class="sync-banner">
                <div>
                  <div style="font-weight:700;font-size:13px;color:var(--heading);">{{ currentVersionText }}</div>
                  <div style="font-size:10px;color:var(--dim);margin-top:4px;">{{ currentCommitText }}</div>
                </div>
                <div style="display:flex;gap:8px;align-items:center;">
                  <button v-if="needsReloadToApply" type="button" class="btn-save-green" title="本地文件已更新，点击一键重新载入扩展生效" @click="reloadExtension">
                    🔄 立即重新载入扩展
                  </button>
                  <button type="button" class="btn-secondary" :disabled="checkingUpdate || isDownloading" @click="checkAllUpdates">
                    {{ checkingUpdate ? '正在检测最新版…' : '🔍 检查最新版本' }}
                  </button>
                  <button v-if="canApplyUpdate" type="button" class="btn-primary" @click="applyGitUpdate">
                    一键本地拉取 (Git)
                  </button>
                </div>
              </div>

              <!-- 状态与反馈提示 -->
              <div v-if="updateStatusMessage" class="update-log-box">
                {{ updateStatusMessage }}
              </div>

              <!-- 私有仓库 Token 快捷设置（未填或失效时可展开/显示） -->
              <div v-if="showTokenInput || !githubToken" class="github-token-box">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <strong style="font-size:12px;">GitHub 访问 Token（私有仓库协作者在线拉取）</strong>
                  <button type="button" style="padding:2px 8px;font-size:11px;" @click="saveGithubToken">保存 Token</button>
                </div>
                <input v-model="githubToken" type="password" placeholder="ghp_... 输入你的 GitHub Personal Access Token" style="font-size:11px;padding:6px 8px;" />
                <p class="hint" style="margin:0;">填写后可免安装 Git 直接从 GitHub 在线检测、进度条下载最新版插件压缩包。</p>
              </div>

              <!-- 在线新版本卡片 -->
              <div v-if="onlineRelease" class="release-card">
                <div class="release-header">
                  <div>
                    <span class="release-tag">🎉 发现新版本：{{ onlineRelease.tag_name }}</span>
                    <span v-if="onlineRelease.name" style="margin-left:6px;font-size:11px;color:var(--muted);">({{ onlineRelease.name }})</span>
                  </div>
                  <button
                    v-if="onlineAsset && !downloadCompleted"
                    type="button"
                    class="btn-primary"
                    :disabled="isDownloading"
                    @click="downloadReleaseAsset"
                  >
                    {{ isDownloading ? '下载中…' : '⬇️ 一键下载更新包' }}
                  </button>
                </div>

                <!-- 变更日志摘要 -->
                <div v-if="onlineRelease.body" class="release-notes">
                  {{ onlineRelease.body }}
                </div>

                <!-- 下载进度条 -->
                <div v-if="isDownloading || downloadPercent > 0" class="download-progress-box">
                  <div class="download-progress-label">
                    <span>{{ isDownloading ? '正在从 GitHub 下载安装包…' : (downloadCompleted ? '已交给浏览器保存' : '已暂停') }}</span>
                    <strong>{{ downloadReceivedText }}</strong>
                  </div>
                  <div class="download-progress-track">
                    <div class="download-progress-bar" :style="{ width: `${downloadPercent}%` }"></div>
                  </div>
                </div>

                <!-- 下载完成引导与热重启按钮 -->
                <div v-if="downloadCompleted" class="download-finish-card">
                  <strong>安装包已交给浏览器，请在下载列表确认保存完成。</strong>
                  <p style="margin:0;font-size:11px;line-height:1.4;">
                    解压安装包覆盖到当前扩展目录后，点击下方按钮即可一键重新载入生效，无需重启浏览器：
                  </p>
                  <button type="button" class="btn-save-green" style="align-self:flex-start;margin-top:4px;" @click="reloadExtension">
                    🔄 立即重新载入扩展 (Hot Reload)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section v-show="currentTab === 'storage'" class="settings-panel">
          <header class="panel-head">
            <span class="panel-index">07</span>
            <div><h2>文件夹与存储</h2><p>按用途管理本地目录，各目录独立授权。</p></div>
          </header>
          <StorageSettings
            v-if="currentTab === 'storage'"
            :active="props.active && currentTab === 'storage'"
            :target="settingsController.state.requestedStorageTarget"
            :request="settingsController.state.sectionRequest"
          />
        </section>
        </fieldset>
      </main>
    </div>

    <!-- 底部常驻悬浮 Dock -->
    <div class="save-dock">
      <span v-if="saveMessage" class="save-status-msg" :class="{ error: isSaveError }">
        {{ saveMessage }}
      </span>
      <span v-if="settingsLoading || settingsSaving" role="status" class="save-status-msg">{{ settingsLoading ? "正在读取设置…" : "正在保存改动项…" }}</span>
      <button type="button" class="btn-save-green" :disabled="!settingsReady || settingsSaving" @click="handleSave(false)">保存</button>
      <button type="button" class="btn-secondary" @click="handleBack">返回</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onUnmounted, defineAsyncComponent, nextTick } from "vue";
const StorageSettings = defineAsyncComponent(() => import("./StorageSettings.vue"));
import settingsCss from "./settings-view.css?inline";
import { useExtensionUpdates } from "./useExtensionUpdates";
import { ensureViewStyles } from "../core/view-styles";
ensureViewStyles("logicweaver-settings-styles", settingsCss);
import {
  optionsService,
  GLOBAL_SETTINGS_KEYS,
  SETTINGS_TOGGLE_KEYS,
  AVAILABLE_SHORTCUT_TOOLS,
  DEFAULT_LIMBUS_CONFIG,
  LIMBUS_PRESETS,
  SHORTCUT_STORAGE_KEY,
  LIMBUS_STORAGE_KEY,
  SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY,
  type GlobalSettingsConfig as SettingsConfig,
  type LimbusConfig,
  type IgnoredBookmarkFolder
} from "../services/options.service";
import { settingsController } from "./store";
import { sameSettingValue, cloneSettingValue, SettingsSaveUnconfirmedError } from "./draft-values";
import { ignoredFolderId } from "./entry-preferences";
import { WallpaperService, DEFAULT_MOUNTAIN_VALUE, type WallpaperHistoryItem } from "../services/wallpaper.service";
import { macDockController, macDockState, isValidDockPosition, type DockPosition } from "../dock/store";
import { appDialog } from "../core/app-dialog.store";
import {
  searchSlots,
  SEARCH_SLOT_TEMPLATES,
  addSearchSlot,
  deleteSearchSlot,
  toggleSearchSlot,
  moveSearchSlot,
  resetSearchSlotsToDefault,
  persistSlots
} from "../search/search-slots.store";
import { isGuestPreviewActive, guestPreviewController } from "../core/guest-preview-store";

declare const chrome: any;
const props = withDefaults(defineProps<{ active?: boolean }>(), { active: true });

// Tabs 导航定义
const tabs = [
  { id: "modules", index: "01", name: "模块与功能" },
  { id: "shortcuts", index: "02", name: "快捷键配置" },
  { id: "privacy", index: "03", name: "搜索书签过滤" },
  { id: "limbus", index: "04", name: "漫游歌词定制" },
  { id: "wallpaper", index: "05", name: "壁纸与背景" },
  { id: "sync", index: "06", name: "数据备份与同步" },
  { id: "storage", index: "07", name: "文件夹与存储" }
];

const currentTab = ref("modules");
const settingsMain = ref<HTMLElement | null>(null);
watch(() => settingsController.state.sectionRequest, () => {
  const section = settingsController.state.requestedSection;
  if (section && tabs.some(tab => tab.id === section)) currentTab.value = section;
}, { immediate: true });
const currentTabTitle = computed(() => {
  const t = tabs.find((x) => x.id === currentTab.value);
  return t ? `${t.index} ${t.name}` : "设置";
});

const isStandalonePage = computed(() => {
  return typeof location !== "undefined" && location.pathname.endsWith("/options.html");
});

function handleMinimize() {
  stopSettingsDrag();
  settingsController.minimize();
  const win = typeof window !== "undefined" ? (window as any) : null;
  if (win?.LogicWeaverWindowManager?.minimize) {
    win.LogicWeaverWindowManager.minimize("settings");
  }
}

import { webDavService } from "../services/webdav.service";
import { createSyncBackup, restoreSyncBackup, readSyncSettings } from "../services/sync.service";
import { loadWebDavSettings, saveWebDavSettings, toWebDavConfig, type WebDavSettings } from "../sync/settings";



const webdavDraft = reactive<WebDavSettings>({
  webdavUrl: "https://dav.jianguoyun.com/dav/LogicWeaver/",
  webdavUsername: "",
  webdavPassword: "",
  webdavFilename: "logicweaver-settings.json"
});
const webdavInitial = ref<WebDavSettings>({ ...webdavDraft });
const webdavStatusMsg = ref("");
const webdavBusy = ref(false);
const localBackupMsg = ref("");

async function initWebDav() {
  try {
    const s = await loadWebDavSettings();
    webdavInitial.value = { ...s };
    Object.assign(webdavDraft, s);
  } catch {}
}

async function handleSaveWebDav() {
  if (webdavBusy.value) return;
  webdavBusy.value = true;
  webdavStatusMsg.value = "";
  try {
    await saveWebDavSettings(webdavDraft, webdavInitial.value);
    webdavInitial.value = { ...webdavDraft };
    webdavStatusMsg.value = "✓ WebDAV 连接设置已保存";
    notify("WebDAV 连接设置已保存");
  } catch (e: any) {
    webdavStatusMsg.value = `保存失败: ${e.message || "请检查URL格式"}`;
  } finally {
    webdavBusy.value = false;
  }
}

async function handleTestWebDav() {
  if (webdavBusy.value) return;
  webdavBusy.value = true;
  webdavStatusMsg.value = "正在连接 WebDAV 服务器…";
  try {
    const config = toWebDavConfig(webdavDraft);
    const res = await webDavService.testConnection(config);
    if (res.ok) {
      webdavStatusMsg.value = "✓ WebDAV 连接成功！服务器响应正常。";
      notify("WebDAV 连通性测试通过！");
    } else {
      webdavStatusMsg.value = `✕ 连接失败: ${res.message || "请检查服务器地址与密码"}`;
    }
  } catch (e: any) {
    webdavStatusMsg.value = `✕ 测试异常: ${e.message}`;
  } finally {
    webdavBusy.value = false;
  }
}

async function handlePushWebDav() {
  if (webdavBusy.value) return;
  webdavBusy.value = true;
  webdavStatusMsg.value = "正在上传配置备份至 WebDAV…";
  try {
    const config = toWebDavConfig(webdavDraft);
    const res = await webDavService.pushCurrentConfig(config);
    if (res.ok) {
      webdavStatusMsg.value = `✓ 上传成功！已将全部设置备份至云端 (${res.byteLength || 0} 字节)`;
      notify("已成功上传云端备份！");
    } else {
      webdavStatusMsg.value = `✕ 上传失败: ${res.error || "请检查写入权限"}`;
    }
  } catch (e: any) {
    webdavStatusMsg.value = `✕ 上传异常: ${e.message}`;
  } finally {
    webdavBusy.value = false;
  }
}

async function handlePullWebDav() {
  if (webdavBusy.value) return;
  if (!confirm("确定从 WebDAV 恢复备份吗？恢复后将覆盖当前本地设置。")) return;
  webdavBusy.value = true;
  webdavStatusMsg.value = "正在从 WebDAV 拉取配置并恢复…";
  try {
    const config = toWebDavConfig(webdavDraft);
    const res = await webDavService.pullCurrentConfig(config);
    if (res.ok) {
      webdavStatusMsg.value = `✓ 恢复成功！已成功还原 ${res.restoredCount || 0} 项配置。请刷新页面查看。`;
      notify(`恢复成功！已还原 ${res.restoredCount || 0} 项配置`);
    } else {
      webdavStatusMsg.value = `✕ 恢复失败: ${res.error || "未在服务器找到对应备份文件"}`;
    }
  } catch (e: any) {
    webdavStatusMsg.value = `✕ 恢复异常: ${e.message}`;
  } finally {
    webdavBusy.value = false;
  }
}

// 本地快照导出与导入
async function handleExportLocalJson() {
  try {
    const rawSettings = await readSyncSettings();
    const backup = createSyncBackup(rawSettings);
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logicweaver-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    localBackupMsg.value = "✓ 本地备份已导出！";
    notify("本地配置快照已成功导出");
  } catch (e: any) {
    localBackupMsg.value = `导出失败: ${e.message}`;
  }
}

async function handleImportLocalJson(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!confirm(`确定导入「${file.name}」恢复配置吗？`)) return;
    const res = await restoreSyncBackup(data);
    localBackupMsg.value = `✓ 恢复成功！已成功还原 ${res.restoredCount || 0} 项配置。`;
    notify(`成功导入 ${res.restoredCount || 0} 项配置！建议刷新页面。`);
  } catch (e: any) {
    localBackupMsg.value = `恢复失败: ${e.message || "文件格式不匹配"}`;
  } finally {
    target.value = "";
  }
}

function handleToggleGuestPreview() {
  guestPreviewController.toggle();
  if (guestPreviewController.isActive) {
    notify("已切入「新用户空态视角」沙箱，常用网站已清空，真实数据已安全封存");
    settingsController.close();
  } else {
    notify("已恢复真实数据");
  }
}

function handleClose() {
  stopSettingsDrag();
  settingsController.close();
  const win = typeof window !== "undefined" ? (window as any) : null;
  if (win?.LogicWeaverWindowManager?.close) {
    win.LogicWeaverWindowManager.close("settings");
  }
}

// Keep pointer updates outside Vue's form state and read geometry once per gesture.
let cleanupSettingsDrag: (() => void) | undefined;
function stopSettingsDrag() {
  const cleanup = cleanupSettingsDrag;
  cleanupSettingsDrag = undefined;
  cleanup?.();
}
watch(() => props.active, active => { if (!active) stopSettingsDrag(); }, { flush: "sync" });

function onDragPointerDown(e: PointerEvent) {
  if (isStandalonePage.value || !props.active || document.hidden || e.button !== 0 || !e.isPrimary) return;
  const target = e.target as HTMLElement | null;
  if (!target || target.closest("button, input, select, textarea, a, .settings-window-actions")) return;
  const dialog = document.getElementById("settings-dialog");
  const handle = e.currentTarget as HTMLElement | null;
  if (!dialog || !handle) return;
  stopSettingsDrag();

  const rect = dialog.getBoundingClientRect();
  const startX = e.clientX, startY = e.clientY;
  const pointerId = e.pointerId;
  const maxLeft = Math.max(8, window.innerWidth - rect.width - 8);
  const maxTop = Math.max(8, window.innerHeight - 56);
  let hasDragged = false, frame = 0;
  let left = rect.left, top = rect.top;

  const render = () => {
    frame = 0;
    dialog.style.setProperty("--settings-drag-x", `${left - rect.left}px`);
    dialog.style.setProperty("--settings-drag-y", `${top - rect.top}px`);
  };
  const updatePosition = (event: PointerEvent) => {
    left = Math.max(8, Math.min(rect.left + event.clientX - startX, maxLeft));
    top = Math.max(8, Math.min(rect.top + event.clientY - startY, maxTop));
  };
  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) return;
    if (!hasDragged) {
      if (Math.hypot(event.clientX - startX, event.clientY - startY) <= 4) return;
      hasDragged = true;
      // Pin the centered dialog once; subsequent frames only change its transform.
      dialog.classList.add("dragged");
      dialog.style.width = `${rect.width}px`;
      dialog.style.height = `${rect.height}px`;
      dialog.style.left = `${rect.left}px`;
      dialog.style.top = `${rect.top}px`;
      dialog.style.right = "auto";
      dialog.style.bottom = "auto";
      dialog.style.margin = "0";
      dialog.style.transform = "none";
      dialog.style.setProperty("--settings-drag-x", "0px");
      dialog.style.setProperty("--settings-drag-y", "0px");
      dialog.classList.add("settings-dragging");
      try { handle.setPointerCapture(pointerId); } catch {}
    }
    updatePosition(event);
    if (!frame) frame = requestAnimationFrame(render);
  };
  const onPointerEnd = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) return;
    if (hasDragged && event.type === "pointerup") updatePosition(event);
    stopSettingsDrag();
  };
  const onVisibility = () => { if (document.hidden) stopSettingsDrag(); };
  const onResize = () => {
    left = Math.max(8, Math.min(left, Math.max(8, window.innerWidth - rect.width - 8)));
    top = Math.max(8, Math.min(top, Math.max(8, window.innerHeight - 56)));
    stopSettingsDrag();
  };

  cleanupSettingsDrag = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerEnd);
    window.removeEventListener("pointercancel", onPointerEnd);
    window.removeEventListener("blur", stopSettingsDrag);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    handle.removeEventListener("lostpointercapture", onPointerEnd);
    if (hasDragged) {
      // Commit the final position once, before dropping the temporary translation.
      dialog.style.left = `${left}px`;
      dialog.style.top = `${top}px`;
      dialog.classList.remove("settings-dragging");
      dialog.style.removeProperty("--settings-drag-x");
      dialog.style.removeProperty("--settings-drag-y");
    }
    try { if (handle.hasPointerCapture(pointerId)) handle.releasePointerCapture(pointerId); } catch {}
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerup", onPointerEnd);
  window.addEventListener("pointercancel", onPointerEnd);
  window.addEventListener("blur", stopSettingsDrag);
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);
  handle.addEventListener("lostpointercapture", onPointerEnd);
}

function onHeroDblClick(e: MouseEvent) {
  if (isStandalonePage.value) return;
  stopSettingsDrag();
  if ((e.target as HTMLElement).closest("button, input, select, textarea, a, .settings-window-actions")) return;
  const dialog = document.getElementById("settings-dialog");
  if (!dialog) return;
  dialog.classList.remove("dragged");
  dialog.style.left = "";
  dialog.style.top = "";
  dialog.style.right = "";
  dialog.style.bottom = "";
  dialog.style.width = "";
  dialog.style.height = "";
  dialog.style.margin = "";
  dialog.style.transform = "";
}

// 表单响应式数据
const defaultForm: SettingsConfig = {
  displaySize: "auto",
  city: "",
  showWeather: true,
  showSites: true,
  showBili: true,
  showYouTube: true,
  showTodo: true,
  showLeftNavigation: true,
  showNavBall: false,
  showBookmarkPanel: true,
  showBookmarkFoldersTop: false,
  showStartupAnimation: true,
  startupAnimationStyle: "endfield",
  searchEngine: "bing",
  singleNewTab: false,
  showHomeMusicVisualizer: true,
  showLimbusLyricEffect: true,
  dockPosition: "bottom",
  deepseekApiKey: "",
  deepseekBaseUrl: "https://api.deepseek.com",
  deepseekModel: "deepseek-chat"
};
const form = reactive<SettingsConfig>({ ...defaultForm });

// Limbus 歌词配置
const limbus = reactive<LimbusConfig>({ ...DEFAULT_LIMBUS_CONFIG });
const limbusExplicitFields = new Set<string>();
let limbusIntentVersion = 0;

// 快捷键状态
const shortcutTools = AVAILABLE_SHORTCUT_TOOLS;
const customShortcuts = ref<Record<string, string>>({});
const recordingToolId = ref<string | null>(null);

// 书签排除状态
const availableFolders = ref<IgnoredBookmarkFolder[]>([]);
const ignoredFolders = ref<unknown[]>([]);
const visibleIgnoredFolders = computed(() => ignoredFolders.value.flatMap((value, index) => {
  const id = ignoredFolderId(value);
  if (id === undefined) return [];
  const folder = value as Record<string, unknown>;
  const path = typeof folder.path === "string" && folder.path ? folder.path
    : typeof folder.title === "string" && folder.title ? folder.title : id;
  return [{ id, path, rowKey: `${id}:${index}` }];
}));
const legacyIgnoredCount = computed(() => ignoredFolders.value.length - visibleIgnoredFolders.value.length);
const selectedFolderToAdd = ref("");

const {
  needsReloadToApply, currentVersionText, currentCommitText, checkingUpdate, canApplyUpdate,
  updateStatusMessage, onlineRelease, onlineAsset, isDownloading, downloadPercent,
  downloadReceivedText, downloadCompleted, githubToken, showTokenInput, syncLocalVersion,
  loadGithubToken, saveGithubToken, checkAllUpdates, downloadReleaseAsset, reloadExtension, applyGitUpdate
} = useExtensionUpdates(notify, () => props.active);
// 保存与提示状态
const saveMessage = ref("");
const isSaveError = ref(false);
const settingsReady = ref(false);
const settingsLoading = ref(false);
const settingsSaving = ref(false);
let alive = true;
let hasLoadedDraft = false;
let reloadPromptOpen = false;
let storedBaseline: Record<string, any> = {};
let draftBaseline: Record<string, any> = {};

function draftSnapshot(): Record<string, any> {
  const values: Record<string, any> = {};
  for (const key of GLOBAL_SETTINGS_KEYS) values[key] = form[key];
  values[LIMBUS_STORAGE_KEY] = limbus;
  values[SHORTCUT_STORAGE_KEY] = customShortcuts.value;
  values[SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY] = ignoredFolders.value;
  return cloneSettingValue(values);
}

// ========================================================
// 05 壁纸与桌面背景 (Wallpaper Settings)
// ========================================================
const BUILTIN_WALLPAPERS = [
  {
    id: "builtin-mountain",
    title: "默认山景 (Mountains)",
    kind: "内置",
    value: DEFAULT_MOUNTAIN_VALUE,
    thumb: "assets/newtab-mountains.png",
    isBuiltin: true
  },
  {
    id: "builtin-pure-dark",
    title: "极简深色 (Pure Dark)",
    kind: "纯色",
    value: null,
    style: "background: #090d16;",
    isPure: true
  },
  {
    id: "builtin-cyber-gradient",
    title: "赛博霓虹 (Cyber Neon)",
    kind: "渐变",
    value: { type: "style", style: "background: radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.25), transparent 45%), radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.2), transparent 45%), #090d16;" },
    style: "background: radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.25), transparent 45%), radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.2), transparent 45%), #090d16;",
    isGradient: true
  },
  {
    id: "builtin-aurora",
    title: "极光翡翠 (Aurora Green)",
    kind: "渐变",
    value: { type: "style", style: "background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.28), transparent 60%), #0c141f;" },
    style: "background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.28), transparent 60%), #0c141f;",
    isGradient: true
  }
];

const wallpaperHistory = ref<WallpaperHistoryItem[]>([]);
const currentWallpaperValue = ref<any>(null);
const wallpaperLoading = ref(false);
const wallpaperStatusMsg = ref("");
const wallpaperPreviewMap = reactive<Record<string, string>>({});
const wallpaperCurrentPage = ref(1);
const WALLPAPER_PAGE_SIZE = 8;
const editingWallpaperId = ref<string | null>(null);
const editingWallpaperTitle = ref("");
const confirmingWallpaperDelete = ref<string | null>(null);

const totalWallpaperPages = computed(() => {
  return Math.ceil(wallpaperHistory.value.length / WALLPAPER_PAGE_SIZE) || 1;
});

const paginatedUserWallpapers = computed(() => {
  const start = (wallpaperCurrentPage.value - 1) * WALLPAPER_PAGE_SIZE;
  return wallpaperHistory.value.slice(start, start + WALLPAPER_PAGE_SIZE);
});

function isWallpaperActive(item: any): boolean {
  if (item.id === "builtin-mountain") {
    return currentWallpaperValue.value === DEFAULT_MOUNTAIN_VALUE;
  }
  if (item.isPure) {
    return !currentWallpaperValue.value || currentWallpaperValue.value === "none" || currentWallpaperValue.value?.type === "none";
  }
  if (currentWallpaperValue.value && item.value) {
    return JSON.stringify(currentWallpaperValue.value) === JSON.stringify(item.value);
  }
  return false;
}

async function loadWallpaperData() {
  wallpaperLoading.value = true;
  try {
    const data = await WallpaperService.loadHistory();
    wallpaperHistory.value = data.history || [];
    currentWallpaperValue.value = data.currentValue;
    void preloadWallpaperPreviews();
  } catch (e: any) {
    wallpaperStatusMsg.value = `壁纸库读取失败: ${e.message || "未知错误"}`;
  } finally {
    wallpaperLoading.value = false;
  }
}

async function preloadWallpaperPreviews() {
  const items = [...paginatedUserWallpapers.value];
  for (const item of items) {
    if ((item as any).thumb || (item as any).style || item.previewUrl || wallpaperPreviewMap[item.id]) continue;
    const key = item.value?.storageKey;
    if (!key) continue;
    try {
      const url = await WallpaperService.createLibraryPreviewUrl(key);
      if (url) wallpaperPreviewMap[item.id] = url;
    } catch {}
  }
}

async function handleSelectWallpaper(item: any) {
  try {
    if (item.id === "builtin-mountain") {
      await WallpaperService.setMountain();
      currentWallpaperValue.value = DEFAULT_MOUNTAIN_VALUE;
    } else if (item.isPure) {
      await WallpaperService.clearWallpaper();
      currentWallpaperValue.value = null;
    } else {
      await WallpaperService.setWallpaper(item.value);
      currentWallpaperValue.value = item.value;
    }
    notify(`已应用壁纸: ${item.title || "自定义壁纸"}`);
    wallpaperStatusMsg.value = `✓ 已成功应用壁纸「${item.title || "壁纸"}」`;
  } catch (e: any) {
    notify(`应用失败: ${e.message}`, true);
  }
}

async function handleImportWallpaperImage() {
  try {
    const files = await WallpaperService.chooseBackgroundFile("image");
    if (!files || files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      await WallpaperService.importBackgroundFile(files[i], { apply: i === files.length - 1 });
    }
    await loadWallpaperData();
    notify("本地图片壁纸已成功导入并应用！");
  } catch (e: any) {
    if (e?.name !== "AbortError") notify(`导入图片失败: ${e.message}`, true);
  }
}

async function handleImportWallpaperVideo() {
  try {
    const files = await WallpaperService.chooseBackgroundFile("video");
    if (!files || files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      await WallpaperService.importBackgroundFile(files[i], { apply: i === files.length - 1 });
    }
    await loadWallpaperData();
    notify("动态视频壁纸已成功导入并应用！");
  } catch (e: any) {
    if (e?.name !== "AbortError") notify(`导入视频失败: ${e.message}`, true);
  }
}

async function handleImportWallpaperFolder() {
  try {
    await WallpaperService.importWallpaperDirectory();
    await loadWallpaperData();
    notify("文件夹图片已成功批量导入！");
  } catch (e: any) {
    if (e?.name !== "AbortError") notify(`导入文件夹失败: ${e.message}`, true);
  }
}

async function handleDeleteWallpaper(item: WallpaperHistoryItem) {
  if (confirmingWallpaperDelete.value !== item.id) {
    confirmingWallpaperDelete.value = item.id;
    return;
  }
  confirmingWallpaperDelete.value = null;
  try {
    await WallpaperService.deleteHistory(item);
    if (wallpaperPreviewMap[item.id]) {
      URL.revokeObjectURL(wallpaperPreviewMap[item.id]);
      delete wallpaperPreviewMap[item.id];
    }
    await loadWallpaperData();
    notify("壁纸已从历史库中删除");
  } catch (e: any) {
    notify(`删除失败: ${e.message}`, true);
  }
}

function startRenameWallpaper(item: WallpaperHistoryItem) {
  editingWallpaperId.value = item.id;
  editingWallpaperTitle.value = item.title || "";
}

async function saveRenameWallpaper(item: WallpaperHistoryItem) {
  const id = editingWallpaperId.value;
  const title = editingWallpaperTitle.value.trim();
  if (!id || !title) return;
  try {
    await WallpaperService.updateHistoryTitle(item.id, title);
    item.title = title;
    editingWallpaperId.value = null;
    notify("壁纸名称已更新");
  } catch (e: any) {
    notify(`更新名称失败: ${e.message}`, true);
  }
}

function cancelRenameWallpaper() {
  editingWallpaperId.value = null;
}

watch(currentTab, (val) => {
  void nextTick(() => { if (settingsMain.value) settingsMain.value.scrollTop = 0; });
  if (val === "wallpaper") {
    void loadWallpaperData();
  }
});

let saveTimer: any = null;

function notify(msg: string, isError = false) {
  saveMessage.value = msg;
  isSaveError.value = isError;
  if (saveTimer) clearTimeout(saveTimer);
  if (!isError) saveTimer = setTimeout(() => {
    saveMessage.value = "";
  }, 3500);
}

// 预览开屏动画
function previewStartup() {
  const win = typeof window !== "undefined" ? (window as any) : null;
  if (win?.LogicWeaverStartupIntro?.playIntro) {
    win.LogicWeaverStartupIntro.playIntro({ force: true, style: form.startupAnimationStyle });
  } else {
    notify(`正在使用 ${form.startupAnimationStyle} 动效风格`);
  }
}

// 搜索栏位管理
const showAddSlotForm = ref(false);
const newSlotForm = ref<{
  name: string;
  iconType: "text" | "svg" | "url";
  iconValue: string;
  themeColor: string;
  searchUrl: string;
  placeholder: string;
}>({
  name: "",
  iconType: "text",
  iconValue: "🎬",
  themeColor: "#38bdf8",
  searchUrl: "",
  placeholder: ""
});

function applySlotTemplate(tmpl: typeof SEARCH_SLOT_TEMPLATES[0]) {
  newSlotForm.value = {
    name: tmpl.name,
    iconType: tmpl.iconType,
    iconValue: tmpl.iconValue,
    themeColor: tmpl.themeColor,
    searchUrl: tmpl.searchUrl,
    placeholder: tmpl.placeholder
  };
  showAddSlotForm.value = true;
}

function handleAddSlotSubmit() {
  const name = newSlotForm.value.name.trim();
  const url = newSlotForm.value.searchUrl.trim();
  if (!name || !url) {
    notify("请填写栏位名称和搜索 URL 模板", true);
    return;
  }
  addSearchSlot({
    name,
    placeholder: newSlotForm.value.placeholder.trim() || `在 ${name} 中搜索…`,
    iconType: newSlotForm.value.iconType,
    iconValue: newSlotForm.value.iconValue.trim() || "🔍",
    themeColor: newSlotForm.value.themeColor || "#38bdf8",
    searchUrl: url
  });
  notify(`已成功添加「${name}」搜索栏位`);
  showAddSlotForm.value = false;
  newSlotForm.value = {
    name: "",
    iconType: "text",
    iconValue: "🎬",
    themeColor: "#38bdf8",
    searchUrl: "",
    placeholder: ""
  };
}

function handleToggleSlot(id: string) {
  const slot = searchSlots.value.find((s) => s.id === id);
  if (!slot) return;
  const enabledCount = searchSlots.value.filter((s) => s.enabled).length;
  if (!slot.enabled && enabledCount === 0) {
    slot.enabled = true;
    notify("至少需要保留一个启用的搜索栏位", true);
    return;
  }
  persistSlots();
}

function handleResetSlots() {
  if (confirm("确定要恢复默认搜索栏位配置吗？自定义添加的栏位将被清空。")) {
    resetSearchSlotsToDefault();
    notify("已恢复默认搜索栏位");
  }
}

// 快捷键录制
function startRecordShortcut(toolId: string) {
  recordingToolId.value = toolId;
}

function clearShortcut(toolId: string) {
  const map = { ...customShortcuts.value };
  delete map[toolId];
  customShortcuts.value = map;
  saveShortcuts();
}

function handleGlobalKeyDown(e: KeyboardEvent) {
  if (!settingsReady.value || settingsSaving.value || !recordingToolId.value) return;
  e.preventDefault();
  e.stopPropagation();

  if (["Control", "Alt", "Shift", "Meta"].includes(e.key)) return;

  const parts: string[] = [];
  if (e.ctrlKey) parts.push("Ctrl");
  if (e.altKey) parts.push("Alt");
  if (e.shiftKey) parts.push("Shift");
  if (e.metaKey) parts.push("Cmd");

  let keyName = e.key.toUpperCase();
  if (keyName === " ") keyName = "Space";
  parts.push(keyName);

  const shortcut = parts.join("+");
  customShortcuts.value = {
    ...customShortcuts.value,
    [recordingToolId.value]: shortcut
  };
  recordingToolId.value = null;
  saveShortcuts();
}

async function saveShortcuts() {
  await handleSave(false, false, [SHORTCUT_STORAGE_KEY]);
}

// 书签过滤
function addIgnoredFolder() {
  const f = availableFolders.value.find((x) => x.id === selectedFolderToAdd.value);
  if (!f) return;
  if (!ignoredFolders.value.some((x) => ignoredFolderId(x) === f.id)) {
    ignoredFolders.value.push(f);
    saveIgnoredFolders();
  }
  selectedFolderToAdd.value = "";
}

function removeIgnoredFolder(id: string) {
  ignoredFolders.value = ignoredFolders.value.filter((x) => ignoredFolderId(x) !== id);
  saveIgnoredFolders();
}

async function saveIgnoredFolders() {
  await handleSave(false, false, [SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY]);
}

function markLimbusField(field: string) {
  ++limbusIntentVersion;
  limbusExplicitFields.add(field);
}

function applyLimbusPreset() {
  const p = limbus.preset;
  ++limbusIntentVersion;
  limbusExplicitFields.add("preset");
  if (LIMBUS_PRESETS[p]) {
    for (const field of Object.keys(LIMBUS_PRESETS[p])) limbusExplicitFields.add(field);
    Object.assign(limbus, LIMBUS_PRESETS[p]);
  }
}

// Immediate controls submit only their own field, never other unfinished drafts.
function onDockPositionChange() {
  const pos = form.dockPosition || "bottom";
  if (isValidDockPosition(pos)) {
    macDockController.setPosition(pos);
  }
  void saveImmediate("dockPosition");
}

async function saveImmediate(key: keyof SettingsConfig) {
  await handleSave(false, true, [key]);
}

async function handleSave(closeAfter = false, silent = false, onlyKeys?: string[]) {
  if (!settingsReady.value || settingsSaving.value || !alive) {
    if (alive) notify("设置尚未读完、保存中或结果待核对，草稿保留；请等待或重读设置。", true);
    return false;
  }
  settingsSaving.value = true;
  try {
    const snapshot = draftSnapshot();
    const explicitLimbusFields = [...limbusExplicitFields];
    const intentVersion = limbusIntentVersion;
    const payload: Record<string, any> = {};
    const expected: Record<string, unknown> = {};
    for (const key of onlyKeys || Object.keys(snapshot)) {
      if (!sameSettingValue(snapshot[key], draftBaseline[key]) ||
          (key === LIMBUS_STORAGE_KEY && explicitLimbusFields.length > 0)) {
        payload[key] = snapshot[key];
        expected[key] = storedBaseline[key];
      }
    }
    const editedBaseline = Object.fromEntries(Object.keys(payload).map(key => [key, draftBaseline[key]]));
    const accepted = await optionsService.saveSettings(payload, expected, editedBaseline, explicitLimbusFields);
    if (!alive) return true;
    const live = draftSnapshot();
    for (const key of [SHORTCUT_STORAGE_KEY, SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY, LIMBUS_STORAGE_KEY]) {
      if (Object.prototype.hasOwnProperty.call(payload, key) &&
          (!sameSettingValue(live[key], snapshot[key]) || (key === LIMBUS_STORAGE_KEY && intentVersion !== limbusIntentVersion))) {
        throw new SettingsSaveUnconfirmedError("本次修改已保存，但保存期间产生了新的设置草稿；请重读核对后再写入，草稿未覆盖");
      }
    }
    // Adopt the confirmed merged collections, including other tabs' untouched entries.
    // A late avatar read can still remain dirty; do not overwrite unrelated live drafts.
    for (const key of Object.keys(payload)) {
      const confirmed = cloneSettingValue(accepted[key]);
      if (key === SHORTCUT_STORAGE_KEY) customShortcuts.value = confirmed;
      if (key === SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY) ignoredFolders.value = confirmed;
      const effective = key === LIMBUS_STORAGE_KEY ? { ...DEFAULT_LIMBUS_CONFIG, ...confirmed } : confirmed;
      if (key === LIMBUS_STORAGE_KEY) {
        for (const field of Object.keys(limbus)) delete (limbus as any)[field];
        Object.assign(limbus, effective);
        for (const field of explicitLimbusFields) limbusExplicitFields.delete(field);
      }
      storedBaseline[key] = cloneSettingValue(confirmed);
      draftBaseline[key] = cloneSettingValue(effective);
    }
    if (!silent) notify(Object.keys(payload).length ? "✓ 本次改动已保存生效" : "没有待保存的改动");
    if (closeAfter) settingsController.close();
    return true;
  } catch (err: any) {
    if (alive) {
      if (err instanceof SettingsSaveUnconfirmedError) settingsReady.value = false;
      notify(err?.message || "保存未确认，草稿保留；请重读核对", true);
    }
    return false;
  } finally {
    settingsSaving.value = false;
  }
}

async function reloadSettings() {
  if (settingsSaving.value || settingsLoading.value || reloadPromptOpen || !alive) return;
  if (hasLoadedDraft && (!sameSettingValue(draftSnapshot(), draftBaseline) || limbusExplicitFields.size > 0)) {
    reloadPromptOpen = true;
    let discard = false;
    try {
      discard = await appDialog.confirm({
        title: "重读已保存设置",
        message: "将放弃本页未保存的设置草稿，并读取最新已保存设置。是否继续？"
      });
    } finally { reloadPromptOpen = false; }
    if (!discard || !alive || settingsSaving.value || settingsLoading.value) return;
  }
  recordingToolId.value = null;
  await loadAll();
}

function handleBack() {
  if (location.pathname.endsWith("/options.html")) {
    location.assign(chrome.runtime.getURL("newtab.html"));
  } else {
    settingsController.close();
  }
}

// 加载全部初始配置
async function loadAll() {
  if (settingsLoading.value || !alive) return;
  settingsLoading.value = true;
  settingsReady.value = false;
  try {
    const cfg = await optionsService.loadGlobalSettings();
    if (!alive) return;
    for (const key of GLOBAL_SETTINGS_KEYS) {
      if (cfg[key] !== undefined && typeof cfg[key] !== typeof defaultForm[key]) {
        throw new Error("设置数据格式异常，未允许覆盖；请核对已有配置");
      }
    }
    for (const key of [LIMBUS_STORAGE_KEY, SHORTCUT_STORAGE_KEY]) {
      if (cfg[key] !== undefined && (!cfg[key] || typeof cfg[key] !== "object" || Array.isArray(cfg[key]))) {
        throw new Error("设置数据格式异常，未允许覆盖；请核对已有配置");
      }
    }
    if (cfg[SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY] !== undefined &&
        !Array.isArray(cfg[SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY])) {
      throw new Error("书签过滤设置格式异常，未允许覆盖");
    }
    Object.assign(form, defaultForm);
    for (const key of Object.keys(limbus)) delete (limbus as any)[key];
    Object.assign(limbus, DEFAULT_LIMBUS_CONFIG);
    limbusExplicitFields.clear();
    ++limbusIntentVersion;
    customShortcuts.value = {};
    ignoredFolders.value = [];

    for (const key of GLOBAL_SETTINGS_KEYS) {
      if (cfg[key] !== undefined) {
        (form as any)[key] = cfg[key];
      }
    }

    if (cfg[LIMBUS_STORAGE_KEY]) {
      Object.assign(limbus, cfg[LIMBUS_STORAGE_KEY]);
    }
    if (cfg[SHORTCUT_STORAGE_KEY]) {
      customShortcuts.value = cfg[SHORTCUT_STORAGE_KEY];
    }
    if (Array.isArray(cfg[SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY])) {
      ignoredFolders.value = cfg[SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY];
    }

    if (form.dockPosition && isValidDockPosition(form.dockPosition)) {
      macDockController.setPosition(form.dockPosition);
    } else if (macDockState.position) {
      form.dockPosition = macDockState.position;
    }

    storedBaseline = cloneSettingValue(cfg);
    draftBaseline = draftSnapshot();
    settingsReady.value = true;
    hasLoadedDraft = true;
    saveMessage.value = "";
    isSaveError.value = false;

    // 尝试读取书签树
    if (typeof chrome !== "undefined" && chrome.bookmarks?.getTree) {
      chrome.bookmarks.getTree((tree: any) => {
        if (alive && tree && tree[0]) {
          availableFolders.value = optionsService.collectBookmarkFolders(tree[0]);
        }
      });
    }

    // 读取扩展版本与本地 Commit
    void syncLocalVersion();
    void loadGithubToken();
  } catch {
    if (alive) {
      settingsReady.value = false;
      notify("设置读取失败或初始化异常，草稿保留，暂不允许保存；可点击重读设置再核对。", true);
    }
  } finally {
    settingsLoading.value = false;
  }
}

onMounted(() => {
  loadAll();
  initWebDav();
  window.addEventListener("keydown", handleGlobalKeyDown, true);
});

onUnmounted(() => {
  stopSettingsDrag();
  alive = false;
  window.removeEventListener("keydown", handleGlobalKeyDown, true);
  if (saveTimer) clearTimeout(saveTimer);
});
</script>
