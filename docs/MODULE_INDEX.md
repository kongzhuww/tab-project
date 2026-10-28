# tab-project-next 现行模块与组件索引

> **文档定位**：本文件是系统的**现行模块索引表**，仅保留当前源码中实际生效的组件、状态仓储、服务和运行时入口。
> - **使用者初访**：请阅读根目录 [README.md](../README.md)。
> - **开发者实时入口与改动**：请阅读 [docs/CURRENT_STATE.md](CURRENT_STATE.md) 与 [AGENTS.md](../AGENTS.md)。
> - **历史演进台账与审查报告**：已归档至 [docs/history/](history/README.md)（含 [原全量迁移台账](history/MODULE_MIGRATION_LEDGER.md)）。

---

## 1. 运行时入口清单

| 运行环境 / 入口 | 对应源文件与构建目标 | 核心职责与说明 |
| :--- | :--- | :--- |
| **新标签页主页 (SPA)** | `newtab.html` → `generated/vue-ui.js`<br>（由 `src/intro/main.ts` / `src/App.vue` 驱动） | 单根 Vue 3 SPA。集成首屏时钟、标语、天气、搜索、常用网站、底栏 Dock、全屏卡片与弹窗。 |
| **首绘主题引导** | `newtab.html` (内联) / `src/theme/theme-init.ts` | 极速同步执行，首帧确定主题变量（Light / Lonetrail / Dark），彻底杜绝白屏/黑屏闪烁。 |
| **后台服务 (Service Worker)** | `manifest.json` → `generated/background.js`<br>（源自 `src/background/index.ts`） | MV3 规范后台。负责扩展快捷键监听、侧边栏呼出、B站/YouTube/QQ图片代理、防盗链 DNR 规则注入、受限下载流管理。 |
| **浏览器侧边栏 (SidePanel)** | `sidepanel.html` → `generated/sidepanel-ui.js`<br>（源自 `src/sidepanel/SidePanelApp.vue`） | 浏览器原生右侧边栏，支持快捷键呼出（建议绑定 Alt+W），提供独立书签、小窗及便签导航。 |
| **极速搜索独立页** | `newtab-search.html` → `generated/search-ui.js`<br>（源自 `src/search/SearchLauncher.vue`） | 轻量零干扰搜索页，支持多引擎秒切与本地优先联想。 |
| **全屏卡片独立标签页** | `bilibili.html`、`github.html`、`aihot.html`、`pricing.html`、`youtube.html` | 均为产品的正式既有入口，由 Vue 构建 bundle 独立装配运行，不强行与主页合并。 |
| **独立设置页** | `options.html` → `src/settings/SettingsView.vue` | 独立全功能选项页，复用主页设置组件。 |
| **壁纸沙箱** | `wallpaper-sandbox.html` → `src/wallpaper/sandbox.ts` | 具有沙箱权限的隔离页面，用于运行用户自定义动态壁纸。 |
| **汉化浮层 (Content Script)** | `src/localizer/main.ts` → `generated/page-localizer-ui.js` | 注入外部网页的 Shadow DOM 单词翻译与编辑浮层。 |

---

## 2. 顶栏区域与基础组件 (TopBar)

| 用户口令 / 区域 | 对应源码文件 | 核心职责与状态仓储 |
| :--- | :--- | :--- |
| **头像 / 通知中心** | `src/notifications/NotificationCenter.vue`<br>`src/profile/ProfileMenu.vue`<br>`src/profile/TabManagerPanel.vue` | 顶栏最左侧头像。点击直达持久通知中心（聚合重要 Toast 与任务闹钟）；右键提供无模态标签页管理器（树状分组与聚焦）。 |
| **书签栏 / 看板** | `src/bookmarks/BookmarkFolderStrip.vue`<br>`src/bookmarks/BookmarkBoard.vue` | 顶栏书签文件夹横条，点击平铺展开书签看板，支持拖拽移动、多级目录进入与真实浏览器书签同步。 |
| **滚动立方体** | `src/layout/TopInfoCube.vue`<br>`src/layout/CubeConfigDialog.vue` | 顶栏 3D 旋转信息块（音乐默认面、倒计时、便签、链接快捷面配置）。 |
| **主题切换** | `src/layout/AppTopBar.vue` (`#theme-toggle`) | 一键轮换 Light / Lonetrail / Dark 主题。 |
| **全局设置** | `src/settings/SettingsDialog.vue`<br>`src/settings/SettingsView.vue` | 包含显示外观、组件启停、搜索偏好、快捷键管理、文件夹与存储、WebDAV 云同步备份。 |

---

## 3. 首屏展台区 (Hero Launcher)

| 组件口令 | 对应源码文件 | 核心职责 |
| :--- | :--- | :--- |
| **时钟** | `src/clock/HeroClock.vue` | 首屏大时钟与公历/农历日期展示。 |
| **标语** | `src/clock/HeroMotto.vue` | 时钟上方的个性标语，支持滚轮滚动切换与右键配置。 |
| **天气** | `src/weather/WeatherWidget.vue` | 首屏气温与城市天气预报卡片。 |
| **播放器** | `src/music/HomeMusicCard.vue` | 首屏 3D 旋转唱片与歌词卡片，随音乐/电台播放联动。 |
| **搜索栏** | `src/search/SearchBox.vue`<br>`src/services/search.service.ts` | 聚合搜索：普通关键词统一匹配历史、常用网站与书签（按精准度去重排序）；支持 `/bm` 与 `/sites` 范围限定；支持 GitHub、B站、网易云、企查查多模式。 |
| **常用网站** | `src/launchers/FavoriteSites.vue`<br>`src/launcher/LauncherMenus.vue` | 常用网站磁贴、大文件夹（2x2）与分组管理，支持内联非模态标题与 URL 实时修改。 |

---

## 4. 全屏插件卡片 (Dock 栏中段 · 展开占满全屏)

注册事实以 `src/modules/builtins.ts` 中的 `builtinCards` 为准：

| 插件口令 | 对应源码文件 | 核心功能与当前状态 |
| :--- | :--- | :--- |
| **todoist** | `src/todoist/TodoistWorkspace.vue` | 待办任务看板：0ms 本地离线直出；按 GitHub 关联仓库自动分层排版；支持任务日历与任务详情抽屉；跨页面缓存失效实时同步。 |
| **b站插件** | `src/bilibili/BilibiliWorkspace.vue` | B站双栏收藏夹整理、AI 字幕提取、刹那观察室订阅视频、小窗播放与电台系列管理。电台优先抓取 DASH 纯音频流（M4A，~3MB），防盗链与 8 秒卡顿自动切备用 CDN 源。 |
| **github插件** | `src/github/GitHubWorkspaceCard.vue`<br>`src/github/GitHubMyRepos.vue` | GitHub 工作区：Star 仓库深度检索、资源专区、开阔式 Markdown README 阅读与一键创建关联待办；**「我的仓库」** Todoist 风格看板（默认板块与 Topic 多列聚合、就地拖拽归类、重命名与远端 GitHub Topics 实时同步）。 |
| **ai hot插件** | `src/aihot/AihotFeed.vue`<br>`src/viewers/AihotViewer.vue` | 每日精选 AI 资讯热榜与沉浸式阅读器。 |
| **模型插件** | `src/pricing/ModelPricingCard.vue` | 全网主流大模型 Token 价格雷达与性价比对比。 |
| **youtube插件** | `src/youtube/YouTubeCard.vue` | YouTube 频道订阅、个性推荐（紫色胶囊卡片）与视频播放。 |

---

## 5. 独立模块与弹窗 (Dock 栏右侧 · 独立非模态弹窗)

注册事实以 `src/modules/builtins.ts` 中的 `builtinDialogs` 为准：

| 模块口令 | 对应源码文件 | 模组 ID | 状态与说明 |
| :--- | :--- | :--- | :--- |
| **海狸聊天室** | `src/chat/ChatDialog.vue`<br>`src/chat/SharedRoomNavigation.vue` | `chat` | 实验性，默认关闭（在商店手动开启）。自托管 HTTPS 增量同步私有聊天室，支持文字、卡片分享与受限图片消息，内置好友请求与活动感知。 |
| **模块商店** | `src/modules/PluginMarketDialog.vue` | `market` | 内置模块启用与停用管理，支持标题栏拖拽与主题自适应。 |
| **塞壬唱片** | `src/music/SirenWorkspaceDialog.vue` | `siren` | 塞壬唱片专辑音乐库浏览与播放。 |
| **网易云模块** | `src/music/NeteaseWorkspaceDialog.vue` | `music` | 网易云官网会话直连登录、歌单浏览与播放。 |
| **我的表情包 / 表情库** | `src/stickers/StickersDialog.vue`<br>`src/stickers/StickerBoard.vue` | `stickers` | 已从 Dock 和商店隐藏为辅助窗口，可在聊天室表情面板打开；支持本地磁盘目录挂载与内置表情库管理。 |
| **同步模块** | `src/sync/SyncWorkspaceDialog.vue` | `sync` | WebDAV 云端备份与多端漫游窗口，支持配置与电台系列完整备份/恢复。 |
| **日历模块** | `src/calendar/CalendarWorkspace.vue` | `calendar` | 独立日历视图，showInDock: false，辅助窗口形式注册。 |

*(注：原 ArkPets 桌宠、监控模块、N8N 模块、Obsidian 笔记本、旧 QQ 模块均已彻底物理移除，严禁恢复)*

---

## 6. 核心服务与 SDK (`src/sdk/`, `src/services/`)

### 6.1 统一 SDK (`src/sdk/`)
* **`src/sdk/images`**：单例全局图片查看器（支持平移缩放、Blob 自动释放），禁止自造模态大图弹窗。
* **`src/sdk/ui`**：无遮罩非模态窗口骨架（`AppWindowFrame`）、就地设置面板容器（`ModuleSettingsPanel`）、多视口避让拖拽钩子（`useWindowDraggable`）。
* **`src/sdk/notifications`**：统一非模态通知队列与自动回收。
* **`src/sdk/interactions`**：边缘自动避让右键菜单（`useContextMenu`）与无感内联编辑（`InlineTitleInput`、`useInlineTitleEdit`）。
* **`src/sdk/slots`**：系统挂载槽（搜索提供者带 1500ms 超时熔断，立方体自定义面隔离）。

### 6.2 核心数据服务 (`src/services/`)
* **`bilibili.service.ts` / `bilibili-channel.service.ts`**：B站 API 门面、WBI 鉴权、DASH 纯音频获取与视频流分发。
* **`todoist.service.ts`**：Todoist REST API 封装、结构化错误与限流冷却重试控制。
* **`github.service.ts` / `my-repos-store.ts`**：GitHub Star 仓库同步、分类缓存、个人仓库读取与 GitHub Topics 远端实时同步更新。
* **`webdav.service.ts` / `sync.service.ts`**：WebDAV 协议客户端、备份白名单与本地数据快照序列化。
* **`launcher.service.ts`**：常用网站与大文件夹本地持久化存储（带内存镜像与快速检索）。
* **`bookmarks.service.ts`**：Chrome 原生书签树遍历与 Web Worker 拼音/模糊全文分流搜索。
