# tab-project-next 系统架构设计说明

> **三层文档指引**：
> - **使用者与首次访问**：请参阅根目录 [README.md](README.md)。
> - **开发者实时入口与改动**：请参阅 [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md) 与 [AGENTS.md](AGENTS.md)。
> - **现行模块与组件索引**：请参阅 [docs/MODULE_INDEX.md](docs/MODULE_INDEX.md)。
> - **历史演进台账与审查报告**：已归档至 [docs/history/](docs/history/README.md)（含 [原架构迁移台账](docs/history/ARCHITECTURE_MIGRATION_LEDGER.md)）。

---

## 1. 核心架构与运行模型

tab-project-next 是基于 **Chromium Manifest V3** 规范构建的现代化浏览器新标签页工作台，采用纯前端静态单页应用（SPA）架构：

```
+--------------------------------------------------------------------------+
|                       Chromium Browser (Edge / Chrome)                  |
+------------------------------------+-------------------------------------+
|         UI 层 (Vue 3 SPA)          |        后台层 (Service Worker)       |
|                                    |                                     |
|  newtab.html (主标签页入口)         |  generated/background.js            |
|  ├── 首屏展台 (时钟/搜索/常用网站)  |  ├── 扩展全局快捷键分发             |
|  ├── 顶栏 (书签/立方体/通知中心)   |  ├── 原生侧边栏呼出控制             |
|  ├── Dock 栏与全屏插件卡片         |  ├── 跨域图片安全代理与格式转换     |
|  └── 独立非模态功能弹窗            |  └── 媒体防盗链 DNR 规则管理        |
|                                    |                                     |
|  独立标签页 (bilibili/github等)    |  Web Worker                         |
|  ├── 独立工作区视图                |  └── bookmarks.worker.js (书签检索) |
|  └── 侧边栏 (sidepanel.html)       |                                     |
+------------------------------------+-------------------------------------+
```

### 运行前提与物理边界
1. **纯浏览器原生扩展**：
   - 彻底移除 Native Host 外部辅助程序及 `manifest.json` 中的 `nativeMessaging` 权限；
   - 绝不依赖外部 EXE、PowerShell 脚本或系统注册表，所有音视频缓存、表情库管理均由浏览器标准 File System Access API 驱动。
2. **调试桥接已彻底退役**：
   - 移除了内建 CLI / Broker、页面与后台长轮询、任意 JavaScript 执行入口及 Jev 页面协作桥接。
3. **单根 Vue 3 SPA + Vite 多入口打包**：
   - 主页由 `newtab.html` → `generated/vue-ui.js` 驱动，组件均采用 Vue 3 `<script setup lang="ts">`；
   - 关键独立入口（搜索独立页、侧边栏、壁纸沙箱、汉化浮层）按需输出独立 bundle，保证首屏冷启动开销最小。

---

## 2. 软件分层架构设计

为防止多功能扩展中容易出现的“状态散落、代码耦合、内存泄漏”，系统严格遵循四层正向单向依赖规范：

```
[视图层 (View)]
  ├── Vue 3 SFC (单文件组件)
  └── Scoped CSS (严格继承主题变量)
       │
       ▼
[状态与控制器层 (Store & Controller)]
  ├── 响应式状态管理 (Vue reactive)
  └── 活动守卫 (useCardActivity 拦截迟到数据)
       │
       ▼
[领域服务层 (Domain Service)]
  ├── 纯 TypeScript 实现 (Zero DOM)
  ├── 结构化错误处理与有界超时 (AbortSignal)
  └── 统一 SDK 套件接入 (src/sdk/)
       │
       ▼
[底层存储与浏览器能力 (Infrastructure)]
  ├── chrome.storage.local / IndexedDB / Web Locks
  ├── declarativeNetRequest (网络请求头重写)
  └── File System Access API (用户本地目录读写)
```

### 关键设计模式：
* **Thin Facade（瘦门面）**：服务类仅负责业务流程协调与输入输出契约校验，不直接操作 DOM，不堆砌超长单函数；
* **Draft-Commit Pattern（草稿-提交模式）**：网络读取模块为无副作用纯函数，仅当读取会话未失效时才由控制器原子提交至响应式状态；
* **Activity-Guarded Sessions（活动守卫）**：利用 `useCardActivity` 在页面切走或组件卸载时立即触发 `AbortController`，阻止迟到响应覆盖新页面状态；
* **Fail-Fast Storage（防静默吞错）**：底层读写显式检查 `chrome.runtime?.lastError`，失败时明确报错并保留用户当前草稿。

---

## 3. 全局共享 SDK 套件 (`src/sdk/`)

所有新功能与扩展模块必须优先复用 SDK 标准套件，杜绝重复造轮子：

| SDK 模块 | 核心导出品 | 规范与使用场景 |
| :--- | :--- | :--- |
| **`src/sdk/images`** | `images.open({ source, title })` | 全局共享图片查看器（单例非模态浮层），支持平移缩放与自建 Blob 生命周期自动释放，禁止自造模态大图弹窗。 |
| **`src/sdk/ui`** | `AppWindowFrame`<br>`ModuleSettingsPanel`<br>`useWindowDraggable` | 统一的无遮罩非模态窗口骨架、模块就地设置面板容器与多视口避让拖拽钩子。 |
| **`src/sdk/modules`** | `registerDockModule`<br>`dockModuleRegistry` | 内置模块唯一注册中心，提供轻量元数据与动态挂载契约。 |
| **`src/sdk/notifications`** | `notifications.fetch`<br>`notifications.show` | 统一非模态通知队列与自动回收句柄，禁止自造遮挡屏幕的 alert/toast。 |
| **`src/sdk/interactions`** | `useContextMenu`<br>`InlineTitleInput`<br>`useInlineTitleEdit` | 边缘自动避让右键菜单，与接管常用网站标题/URL修改的无感内联编辑（防连击与 IME 冲突，严禁使用 `prompt()`）。 |
| **`src/sdk/slots`** | `pluginSlots` | 系统级扩展挂载槽（搜索提供者带 1500ms 超时熔断，立方体自定义面带独立注销句柄隔离）。 |

---

## 4. 状态同步与网络边界安全

1. **跨页面状态同步 (Cross-Tab Invalidation)**：
   - Todoist 等异步任务模块通过 `BroadcastChannel` 广播轻量事件（如 `task-updated`），同账号的其他页面收到后标记缓存失效；前台页面即时重读，后台页面延后至可见时刷新，绝不在事件中明文传递 Token。
2. **网络请求有限等待与有界重试**：
   - 播放流与音视频网络请求均设置整轮时间预算（如 18~20s）与单次请求限时（如 5s）；
   - 遇到 401/403 鉴权失败、429 限流或网络超时时立即熔断停止，严格遵守 Retry-After 冷却，不进行无休止轮询重试。
3. **音视频流控优化**：
   - B站电台优先抓取 DASH 纯音频轨（M4A，~3MB），彻底省去 720P 完整视频（50~80MB）的带宽占用与 CDN 限速；
   - 接入 8 秒停滞看门狗，遇到断流或解码错误时自动切至备用 CDN 线路续播。
4. **主题系统铁律（严禁黑色起手）**：
   - 界面主题规范：系统支持 4 套正式界面主题：白天模式 (`light`，默认)、夜晚模式 (`dark`)、终末地风格 (`endfield`)、孤星风格 (`lonetrail`)。旧版本中曾使用 Lone Trail / Endfield 等名称，当前主题键以源码小写为准；
   - 独立开机启动动画：由 `startupAnimationStyle` 独立控制（莱茵生命 `rhinelab` / 终末地 `endfield`），与页面界面主题互不干扰；
   - 变量继承原则：所有界面与组件必须继承 CSS 主题变量（`var(--panel)`、`var(--surface)`、`var(--text)`、`var(--heading)`、`var(--border)` 等），保证在各类明亮与暗黑主题下均自适应且对比度清晰，严禁硬编码纯黑背景。

---

## 5. 质量门禁与验证准则

根据项目核心规范，代码提交前必须执行严格的门禁检查：

* **零断言测试禁令**：**严格禁止编写或运行任何断言/无头 E2E 测试**（用户明确指示）；
* **本地基线门禁**：
  1. `npm run check`（执行 `vue-tsc --noEmit` 类型检查 + Vite 前端多入口完整构建打包）；
  2. `node --check generated/background.js`（后台 Service Worker 语法验证）；
  3. `git diff --check`（无非法空白字符与冲突标记）。
* **浏览器验收事实**：构建与静态检查通过不代表浏览器功能已验收，所有界面交互与网络改动均须提示用户在实际浏览器中刷新验证。
