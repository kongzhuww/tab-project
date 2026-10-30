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
                <select v-model="form.startupAnimationStyle" style="flex:1;" @change="handleStartupStyleChange">
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
                <input v-model="form.showStartupAnimation" type="checkbox" @change="handleToggleStartupAnimation" />
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
        </section>

        <!-- 02 快捷键配置 -->
        <section v-show="currentTab === 'shortcuts'" class="settings-panel">
          <header class="panel-head">
            <span class="panel-index">02</span>
            <div>
              <h2>快捷键</h2>
              <p>按用途管理，仅显示可用功能。点击按键槽录入，Esc 取消；× 取消绑定，↺ 恢复默认。</p>
            </div>
          </header>

          <div v-for="group in shortcutGroups" :key="group.id" class="shortcut-group">
            <h3 class="shortcut-group-title">{{ group.title }}</h3>
            <div class="shortcuts-grid">
              <div v-for="tool in group.tools" :key="tool.id" class="shortcut-row">
                <span class="shortcut-label">{{ tool.label }}</span>
                <div class="shortcut-actions">
                  <button type="button" class="shortcut-key-btn" :class="{ recording: recordingToolId === tool.id }" @click="startRecordShortcut(tool.id)">
                    {{ recordingToolId === tool.id ? '请按下按键…' : (effectiveShortcut(customShortcuts, tool) || '未分配') }}
                  </button>
                  <button v-if="effectiveShortcut(customShortcuts, tool)" type="button" class="shortcut-clear-btn" :title="`取消${tool.label}的快捷键`" :aria-label="`取消${tool.label}的快捷键`" @click="clearShortcut(tool.id)">×</button>
                  <button v-if="Object.prototype.hasOwnProperty.call(customShortcuts, tool.id)" type="button" class="shortcut-clear-btn" :title="`恢复${tool.label}的默认键`" :aria-label="`恢复${tool.label}的默认键`" @click="resetShortcut(tool.id)">↺</button>
                </div>
              </div>
            </div>
          </div>
          <p class="hint">组件停用后，不显示也不触发对应快捷键；原绑定保留，重新启用后恢复。导航轮盘与工具轮盘同样只列出已启用组件。</p>

          <div class="fixed-shortcuts-card" style="margin-top: 18px;">
            <div class="fixed-shortcuts-head">浏览器快捷键（在浏览器中修改）</div>
            <div class="fixed-shortcuts-grid">
              <div class="fixed-row"><span class="fs-desc">侧边栏（浏览器右侧）</span><button type="button" class="shortcut-key-btn" @click="openBrowserShortcutSettings">{{ browserShortcutLabel('open-side-panel') }}</button></div>
              <div class="fixed-row"><span class="fs-desc">回到新标签页</span><button type="button" class="shortcut-key-btn" @click="openBrowserShortcutSettings">{{ browserShortcutLabel('focus-newtab') }}</button></div>
            </div>
            <p class="hint">侧边栏默认 Alt+W，回到新标签页默认 Alt+H；以上显示浏览器实际绑定。点击按键可前往浏览器修改。若未分配，请在那里手动设置。</p>
            <button type="button" class="shortcut-key-btn" @click="refreshBrowserShortcuts">重读浏览器绑定</button>
            <p class="hint">Esc：取消录制 / 退出当前浮层。Alt+W 不再关闭工作区或窗口。</p>
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

        <!-- 04 壁纸与桌面背景 -->
        <section v-show="currentTab === 'wallpaper'" class="settings-panel">
          <header class="panel-head">
            <span class="panel-index">04</span>
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

        <!-- 05 版本与在线更新 -->
        <section v-show="currentTab === 'sync'" class="settings-panel">
          <header class="panel-head">
            <span class="panel-index">05</span>
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
            <span class="panel-index">06</span>
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
  SHORTCUT_STORAGE_KEY,
  SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY,
  type GlobalSettingsConfig as SettingsConfig,
  type IgnoredBookmarkFolder
} from "../services/options.service";
import { settingsController } from "./store";
import { sameSettingValue, cloneSettingValue, SettingsSaveUnconfirmedError } from "./draft-values";
import { ignoredFolderId } from "./entry-preferences";
import { effectiveShortcut, isShortcutToolAvailable, parseShortcutEvent, shortcutCaptureState } from "../services/shortcut-catalog";
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
  { id: "wallpaper", index: "04", name: "壁纸与背景" },
  { id: "sync", index: "05", name: "数据备份与同步" },
  { id: "storage", index: "06", name: "文件夹与存储" }
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
  showStartupAnimation: false,
  startupAnimationStyle: "endfield",
  searchEngine: "bing",
  singleNewTab: false,
  showHomeMusicVisualizer: true,
  dockPosition: "bottom"
};
const form = reactive<SettingsConfig>({ ...defaultForm });

// 快捷键状态
const shortcutTools = computed(() => AVAILABLE_SHORTCUT_TOOLS.filter(tool => isShortcutToolAvailable(tool.id)));
const shortcutGroups = computed(() => [
  { id: "navigation", title: "导航与界面", tools: shortcutTools.value.filter(tool => tool.group === "navigation") },
  { id: "components", title: "已启用组件", tools: shortcutTools.value.filter(tool => tool.group === "components") }
].filter(group => group.tools.length));
const customShortcuts = ref<Record<string, string>>({});
const recordingToolId = ref<string | null>(null);
const browserShortcuts = ref<Record<string, string> | null>(null);
const browserShortcutDescriptions = ref<Record<string, string>>({});
let browserShortcutRead = 0;

function browserShortcutLabel(id: string) {
  if (!browserShortcuts.value) return '点击查看 / 修改';
  if (id === 'open-side-panel') {
    // 兼容 Chromium Action 触发（_execute_action，配合 openPanelOnActionClick 打开侧边栏）、
    // 自定义 open-side-panel 以及原生 _execute_side_panel
    const key = browserShortcuts.value['open-side-panel']
      || browserShortcuts.value['_execute_action']
      || browserShortcuts.value['_execute_side_panel']
      || browserShortcuts.value['open_side_panel']
      || browserShortcutDescriptions.value['open-side-panel'];
    return key || '未分配';
  }
  return browserShortcuts.value[id] || browserShortcutDescriptions.value?.[id] || '未分配';
}

async function refreshBrowserShortcuts() {
  if (!props.active || currentTab.value !== 'shortcuts') return;
  const version = ++browserShortcutRead;
  try {
    const commands = await chrome.commands.getAll();
    if (!alive || version !== browserShortcutRead) return;
    const map: Record<string, string> = {};
    const descMap: Record<string, string> = {};
    for (const item of commands || []) {
      if (typeof item.name === 'string') {
        const key = typeof item.shortcut === 'string' ? item.shortcut.trim() : '';
        map[item.name] = key;
        const desc = (item.description || '').toLowerCase();
        if (desc.includes('侧边栏') || desc.includes('side panel') || item.name === '_execute_action') {
          if (key) descMap['open-side-panel'] = key;
        }
        if (desc.includes('新标签') || desc.includes('newtab') || desc.includes('new tab')) {
          if (key) descMap['focus-newtab'] = key;
        }
      }
    }
    browserShortcuts.value = map;
    browserShortcutDescriptions.value = descMap;
  } catch {
    if (alive && version === browserShortcutRead) {
      browserShortcuts.value = null;
      browserShortcutDescriptions.value = {};
    }
  }
}
async function openBrowserShortcutSettings() {
  cancelShortcutRecording();
  const url = /Edg\//.test(navigator.userAgent) ? 'edge://extensions/shortcuts' : 'chrome://extensions/shortcuts';
  try { await chrome.tabs.create({ url }); }
  catch { notify(`请手动打开 ${url} 修改扩展快捷键。`, true); }
}
watch(() => [props.active, currentTab.value], () => {
  if (!props.active || currentTab.value !== 'shortcuts') cancelShortcutRecording();
  else void refreshBrowserShortcuts();
});

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
  values[SHORTCUT_STORAGE_KEY] = customShortcuts.value;
  values[SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY] = ignoredFolders.value;
  return cloneSettingValue(values);
}

// ========================================================
// 05 壁纸与桌面背景 (Wallpaper Settings)
// ========================================================
const BUILTIN_WALLPAPERS: Array<{
  id: string;
  title: string;
  kind: string;
  value: any;
  thumb?: string;
  style?: string;
  isBuiltin?: boolean;
}> = [
  {
    id: "builtin-mountain",
    title: "默认山景 (Mountains)",
    kind: "内置",
    value: DEFAULT_MOUNTAIN_VALUE,
    thumb: "assets/newtab-mountains.png",
    isBuiltin: true
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

function handleToggleStartupAnimation() {
  const val = form.showStartupAnimation ? "1" : "0";
  try {
    localStorage.setItem("showStartupAnimation", val);
    localStorage.setItem("logicweaverEndfieldLoader", val);
  } catch {}
  void saveImmediate("showStartupAnimation");
}

function handleStartupStyleChange() {
  try {
    localStorage.setItem("startupAnimationStyle", form.startupAnimationStyle || "endfield");
    localStorage.setItem("logicweaverStartupStyle", form.startupAnimationStyle || "endfield");
  } catch {}
  void saveImmediate("startupAnimationStyle");
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
function cancelShortcutRecording() {
  recordingToolId.value = null;
  shortcutCaptureState.active = false;
}
function startRecordShortcut(toolId: string) {
  if (!settingsReady.value || settingsSaving.value || !isShortcutToolAvailable(toolId)) return;
  recordingToolId.value = toolId;
  shortcutCaptureState.active = true;
}
function clearShortcut(toolId: string) {
  cancelShortcutRecording();
  customShortcuts.value = { ...customShortcuts.value, [toolId]: "" };
  void saveShortcuts();
}
function resetShortcut(toolId: string) {
  cancelShortcutRecording();
  const map = { ...customShortcuts.value };
  delete map[toolId];
  customShortcuts.value = map;
  void saveShortcuts();
}
function handleGlobalKeyDown(e: KeyboardEvent) {
  if (!settingsReady.value || settingsSaving.value || !recordingToolId.value || !props.active) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  if (e.key === "Escape") { cancelShortcutRecording(); return; }
  if (e.isComposing || e.repeat) return;
  if (!isShortcutToolAvailable(recordingToolId.value)) { cancelShortcutRecording(); return; }
  const shortcut = parseShortcutEvent(e);
  if (!shortcut) return;
  const browserBindings = browserShortcuts.value ? Object.values(browserShortcuts.value) : ['Alt+W', 'Alt+H'];
  if (browserBindings.some(key => key.replace(/^Command\+/, 'Meta+').toLowerCase() === shortcut.toLowerCase())) {
    notify('该组合用于浏览器快捷键，请在下方“浏览器快捷键”中修改；上方只配置页面内操作。', true);
    return;
  }
  if (['Alt+Space', 'Ctrl+K', 'Meta+K', 'Ctrl+W', 'Meta+W', 'Alt+H'].includes(shortcut)) {
    notify('该组合由浏览器或固定页面操作使用，请选择其他按键。', true);
    return;
  }
  const conflict = shortcutTools.value.find(tool => tool.id !== recordingToolId.value && effectiveShortcut(customShortcuts.value, tool).toLowerCase().replace(/^cmd\+/, "meta+") === shortcut.toLowerCase());
  if (conflict) { notify(`该组合已用于${conflict.label}，请先取消原绑定或换一个组合。`, true); return; }
  customShortcuts.value = { ...customShortcuts.value, [recordingToolId.value]: shortcut };
  cancelShortcutRecording();
  void saveShortcuts();
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
    const payload: Record<string, any> = {};
    const expected: Record<string, unknown> = {};
    for (const key of onlyKeys || Object.keys(snapshot)) {
      if (!sameSettingValue(snapshot[key], draftBaseline[key])) {
        payload[key] = snapshot[key];
        expected[key] = storedBaseline[key];
      }
    }
    const accepted = await optionsService.saveSettings(payload, expected);
    if (!alive) return true;
    const live = draftSnapshot();
    for (const key of [SHORTCUT_STORAGE_KEY, SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY]) {
      if (Object.prototype.hasOwnProperty.call(payload, key) &&
          !sameSettingValue(live[key], snapshot[key])) {
        throw new SettingsSaveUnconfirmedError("本次修改已保存，但保存期间产生了新的设置草稿；请重读核对后再写入，草稿未覆盖");
      }
    }
    // Adopt the confirmed merged collections, including other tabs' untouched entries.
    // A late avatar read can still remain dirty; do not overwrite unrelated live drafts.
    for (const key of Object.keys(payload)) {
      const confirmed = cloneSettingValue(accepted[key]);
      if (key === SHORTCUT_STORAGE_KEY) customShortcuts.value = confirmed;
      if (key === SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY) ignoredFolders.value = confirmed;
      storedBaseline[key] = cloneSettingValue(confirmed);
      draftBaseline[key] = cloneSettingValue(confirmed);
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
  if (hasLoadedDraft && !sameSettingValue(draftSnapshot(), draftBaseline)) {
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
    for (const key of [SHORTCUT_STORAGE_KEY]) {
      if (cfg[key] !== undefined && (!cfg[key] || typeof cfg[key] !== "object" || Array.isArray(cfg[key]))) {
        throw new Error("设置数据格式异常，未允许覆盖；请核对已有配置");
      }
    }
    if (cfg[SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY] !== undefined &&
        !Array.isArray(cfg[SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY])) {
      throw new Error("书签过滤设置格式异常，未允许覆盖");
    }
    Object.assign(form, defaultForm);
    customShortcuts.value = {};
    ignoredFolders.value = [];

    for (const key of GLOBAL_SETTINGS_KEYS) {
      if (cfg[key] !== undefined) {
        (form as any)[key] = cfg[key];
      }
    }
    // 同步到 localStorage 确保首绘脚本即时生效
    if (cfg.showStartupAnimation !== undefined) {
      const val = cfg.showStartupAnimation ? "1" : "0";
      try {
        localStorage.setItem("showStartupAnimation", val);
        localStorage.setItem("logicweaverEndfieldLoader", val);
      } catch {}
    }
    if (cfg.startupAnimationStyle) {
      try {
        localStorage.setItem("startupAnimationStyle", cfg.startupAnimationStyle);
        localStorage.setItem("logicweaverStartupStyle", cfg.startupAnimationStyle);
      } catch {}
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
  window.addEventListener('focus', refreshBrowserShortcuts);
  void refreshBrowserShortcuts();
});

onUnmounted(() => {
  cancelShortcutRecording();
  stopSettingsDrag();
  alive = false;
  window.removeEventListener("keydown", handleGlobalKeyDown, true);
  window.removeEventListener('focus', refreshBrowserShortcuts);
  if (saveTimer) clearTimeout(saveTimer);
});
</script>
