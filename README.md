# tab-project

<p align="center">
  <img src="assets/icon-128.png" alt="tab-project" width="80" height="80" />
</p>

<p align="center"><strong>以浏览器新标签页为核心的个人生产力工作台</strong></p>

<p align="center">
  <a href="https://chromewebstore.google.com/detail/tab-project-%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/hogpkihhicjhiakkgjkbchpdoicmbolj"><img src="https://img.shields.io/badge/Chrome_Web_Store-Install-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="从 Chrome 网上应用店安装" /></a>
  <a href="https://microsoftedge.microsoft.com/addons/detail/tabproject-%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/dbkaiojfbolnkpaegflocfbdgpmhjcco"><img src="https://img.shields.io/badge/Microsoft_Edge-Install-0078D4?style=for-the-badge&logo=microsoftedge&logoColor=white" alt="从 Microsoft Edge 商店安装" /></a>
</p>

<p align="center">
  <a href="README_en.md">English</a> · <strong>简体中文</strong>
</p>

<p align="center">
  <a href="https://chromewebstore.google.com/detail/tab-project-%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/hogpkihhicjhiakkgjkbchpdoicmbolj"><strong>Chrome 商店安装</strong></a> ·
  <a href="https://microsoftedge.microsoft.com/addons/detail/tabproject-%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/dbkaiojfbolnkpaegflocfbdgpmhjcco"><strong>Edge 商店安装</strong></a> ·
  <a href="https://github.com/kongzhuww/tab-project/releases/latest">Release 下载</a> ·
  <a href="CHANGELOG.md">更新日志</a> ·
  <a href="#安装">安装指南</a> ·
  <a href="#开发">开发说明</a>
</p>

> **核心定位**：`tab-project` 是一个基于 **Vue 3、TypeScript、Rust WebAssembly 与 Chromium Manifest V3** 的桌面浏览器新标签页工作台（面向 Chrome / Edge）。它把常用网站、书签看板、极速搜索、Todoist、GitHub、B 站电台与小窗、音乐播放以及 AI 工作区聚合在同一个自适应主题界面中。

> **仓库版本**：**1.0.28**。本版重塑 B 站电台封面主舞台并持久化收藏夹文件夹、支持 B 站评论表情包与 `@` 提及点击、完成存储/同步架构与背包阅读样式优化，并彻底移除海狸聊天室模块。商店版本由平台审核自动更新，可能与 GitHub 主分支源码存在发布时间差。详见 [更新日志](CHANGELOG.md)。

## 反馈与更新

[报告问题](https://github.com/kongzhuww/tab-project/issues/new?template=bug_report.yml) · [功能建议](https://github.com/kongzhuww/tab-project/issues/new?template=feature_request.yml) · [使用交流](https://github.com/kongzhuww/tab-project/discussions) · [版本更新](https://github.com/kongzhuww/tab-project/releases)

反馈问题时请附上实际版本、浏览器版本与复现步骤；截图前请先遮挡个人隐私，切勿公开 Token、Cookie 或密钥。

---

## 核心功能概览

| 模块 | 核心能力 | 使用条件与说明 |
| :--- | :--- | :--- |
| **动态壁纸与工坊** | 纯浏览器 Wallpaper Engine 运行时（OPFS 私有缓存秒开、Steam 创意工坊 `431960` 扫描、4K 视频 / Web / Scene 一键应用、128 位对数音频频谱）、5 项高刷/视网膜屏降温守护、**支持各工作区独立设置壁纸** | 默认可用；支持关联本地 Steam 工坊目录或自定义目录 |
| **常用网站与书签看板** | 多分组常用网站、`2×2` 大文件夹、拖拽排序与整理专员建议；浏览器书签平铺展示、层级穿梭与 WebAssembly / Worker 离线拼音模糊搜索 | 默认可用；书签功能需授予 `bookmarks` 权限，仅响应主动整理操作 |
| **极速搜索与首屏** | 合并检索历史、书签与常用网站，支持 `/bm`、`/sites` 过滤与 GitHub / B站 / 网易云 / 企查查直达；3D 时钟、精选配色、标语滚轮切换与 Open-Meteo 天气 | 默认可用；极速搜索可跟随壁纸并打开侧栏，天气发送只读坐标/气象请求 |
| **B 站工作台与电台** | 收藏夹整理与顶部全局搜索、个性推荐、关注 UP 主与分组管理；**电台封面主舞台**（大封面、`♥` 喜欢、上一曲/下一曲切换、直接基于当前 B 站收藏夹文件夹连播、Offscreen 后台续播与刷新恢复条）；悬浮视频小窗与评论区**图片表情包与蓝色 `@` 点击跳转**、字幕提取及本地缓存 | 公开浏览免登录；个人收藏、关注与评论操作需在同一浏览器登录 B 站；支持刷新保留二级界面 |
| **GitHub 工作区** | Star 仓库 Lists 分组、Topic 看板拖拽与远端同步、PR / 最近更新缓存、Markdown README 阅读、关联仓库 Todoist 待办 | 公开仓库免鉴权；个人仓库管理与高频访问需配置 GitHub Token |
| **Todoist 任务看板** | 本地优先缓存、今日任务有序排布、日历侧栏、附件看图与 GitHub 仓库关联任务 | 需在设置中填写 Todoist API Token |
| **音乐工作区** | 网易云音乐（官网会话连接）与塞壬唱片（默认可用）双队列分离、首屏 3D 唱片机、歌词与标签页关闭联动 | 塞壬唱片开箱即用；网易云需在同一浏览器登录官网后连接 |
| **AIHOT 资讯与 RSS** | AIHOT 热点资讯、模型榜、日报，以及自选 RSS / Atom 订阅频道与原文阅读 | 默认可用；支持二级界面刷新保留 |
| **AI 工作区与数字员工** | OpenAI 兼容多模型接入（DeepSeek / Kimi / 硅基流动 / 智谱 / 百炼 / OpenAI / OpenRouter / 本机 Ollama / LM Studio）与模型切换；Native Messaging 本机 CLI 引擎桥接（Pi / Claude Code / Codex / OpenCode / ACP）；数字员工（含 GitHub 榜单精选、找网站员工等）与定时任务；支持实时「窥屏」与「回放窥屏」 | 按需配置对应 API Key 或本机终端宿主；定时与依赖说明见 [调度说明](docs/AI_WORKSPACE_SCHEDULING.md) |
| **AI 资料库** | 本地管理提示词、变量模板、沉淀文章与表情包；文章正文图片支持点击打开悬浮看图器并滚轮缩放 | 默认可用；沿用本机存储并支持备份导出 |

### 可选扩展服务

| 服务 | 说明 | 使用条件 |
| :--- | :--- | :--- |
| **WebDAV 云漫游** | 本机加密备份常用网站、配置与资料库，支持差异对比与智能合并，冲突时暂停提示 | 需自备支持 HTTPS 的 WebDAV 服务（如坚果云）、账号密码及独立加密口令 |
| **我的表情包 / 表情库** | 资料库表情包集中管理与本地目录挂载（File System Access API） | 作为资料库辅助能力按需授权本地目录 |

> **主题与系统架构**：全站由设置统一管理 **白天 (`light`) / 夜晚 (`dark`) / 暖纸色 (`lonetrail`)** 三种主题与独立启动动效（`endfield` / `rhinelab`）；覆盖式侧栏支持 `Alt+W` 随时在网页上方唤起。

---

## 最近更新亮点

- **v1.0.28**：
  - **B 站电台与评论体验升级**：电台界面重构为封面主舞台（展示当前封面、`♥` 喜欢与上一曲/下一曲切换，直接基于 B 站收藏夹文件夹连播），移除本地自定义歌单机制并修复暂停后重置到首文件夹的问题；评论与动态正文新增图片表情包渲染及可点击蓝色 `@用户` 跳转。
  - **模块精简与架构优化**：彻底卸载移除「海狸聊天室」及 `lw_private_chat_v1` 残留；修复背包文章抽屉 CSS 作用域问题，完成存储仓储/同步 Schema 与设置子模块拆包，支持 Chrome Web Store Service Account 自动上传。
- **v1.0.27**：
  - **B 站电台重塑**：视频卡片与播放队列统一为 2 列 7 行小卡，支持 `♥` 喜欢、自定义歌单下拉管理与二次确认删除、虚线箭头拖拽队列；移除电台磁带机横条、侧边栏订阅频道入口与报纸模式，收藏夹顶部补充全局搜索栏。
  - **效率与缓存**：支持 B 站、GitHub、Agent、AIHOT 二级界面刷新保持；GitHub PR / 最近更新及 Todoist 数据缓存；Agent 资料库正文图片支持滚轮缩放；新增「找网站」数字员工与 AIHOT RSS 频道。
  - **工作区壁纸与稳定性**：支持各工作区独立壁纸配置；修复跨标签切回偶发视频点不开、刷新音乐暂停提示恢复，并补齐合规隐私与许可证查看页。
- **v1.0.24 ~ v1.0.26**：落地显式状态机与 Vue 3 网桥、多模型 OpenAI 兼容预设与本机 Native Messaging 多引擎桥接、数字员工与 GitHub 今日榜单定时任务「窥屏」监控、常用网站/书签整理专员及各模块测试加固。

> 更早版本的完整变更记录请参阅 [CHANGELOG.md](CHANGELOG.md)。

---

## 安装

### 推荐：通过官方应用商店安装（自动更新）

- **Google Chrome**：打开 [Chrome 网上应用店页面](https://chromewebstore.google.com/detail/tab-project-%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/hogpkihhicjhiakkgjkbchpdoicmbolj)，点击「添加至 Chrome」。
- **Microsoft Edge**：打开 [Microsoft Edge 加载项商店页面](https://microsoftedge.microsoft.com/addons/detail/tabproject-%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/dbkaiojfbolnkpaegflocfbdgpmhjcco)，点击「获取」。

> **从手动解压版迁移提示**：商店版与手动开发者加载版的扩展 ID 不同，不会自动继承原存储。切换前请在设置中导出备份并保留旧版，确认数据恢复无误后再停用旧版本。

### 手动安装：使用 Release 打包产物

1. 前往 [GitHub Releases](https://github.com/kongzhuww/tab-project/releases/latest) 下载 `tab-project-v版本号-extension.zip` 并解压至固定目录（请勿直接加载 GitHub 自动生成的 `Source code` 源码压缩包）。
2. 打开 `chrome://extensions` 或 `edge://extensions`，开启「开发者模式」。
3. 点击「加载解压缩的扩展」，选择包含 `manifest.json` 的目录即可；升级时直接覆盖解压该目录并刷新扩展。

### 从源码构建

```bash
git clone https://github.com/kongzhuww/tab-project.git
cd tab-project
npm ci
npm run check
```

构建完成后可直接在浏览器开发者模式加载仓库根目录，或运行 `npm run release:build` 生成隔离的发行包目录。更多构建与切片工具说明见 [开发构建文档](docs/DEVELOPMENT_BUILD.md)。

---

## 权限声明与数据隐私

本扩展严格遵循 **Chromium Manifest V3** 规范：**无任何统计埋点或第三方遥测上报服务器**，个人数据默认保留在浏览器本地（`chrome.storage.local` / IndexedDB / OPFS）。

| Manifest 权限 | 用途与必要性说明 |
| :--- | :--- |
| `storage` / `unlimitedStorage` | 在本地保存设置偏好、常用网站、资料库、电台歌单与缓存数据。 |
| `bookmarks` / `favicon` | 展示与整理浏览器书签及站点图标，并在 Web Worker 中执行本地检索。 |
| `tabs` / `activeTab` | 顶栏标签页管理器切换与定位已有工作区标签页。 |
| `cookies` | 在用户使用 B 站工作台交互时读取 `bili_jct` CSRF 校验字段；不使用隐藏账号凭证。 |
| `declarativeNetRequest` | 为扩展内部发起的 B 站音视频与图片请求补充合规的来源/Referer 头。 |
| `scripting` | 仅在用户主动触发（如 `Alt+W` 或右键菜单）时向普通网页注入覆盖式侧栏或网页汉化浮层。 |
| `alarms` / `notifications` | 支持用户主动创建的 AI 定时任务调度与任务完成本地桌面提醒。 |
| `downloads` | 用于导出配置文件备份、本地保存壁纸与用户主动触发的离线媒体下载。 |
| `identity` | 用于可选的 Google Calendar OAuth2 授权登录。 |
| `nativeMessaging` | 仅当用户在 AI 工作区主动启用本机终端代理桥接（Pi / Claude Code / Codex / OpenCode / ACP）时，与本机已授权宿主通信。 |
| `offscreen` | 通过 MV3 Offscreen Document 在后台稳定宿主电台等连续音频播放。 |
| `contextMenus` / `clipboardWrite` | 提供快捷右键操作与一键复制链接/文章/字幕内容到剪贴板。 |

> 详情请参阅 [隐私说明 (PRIVACY.md)](PRIVACY.md)、[第三方服务与内容来源](THIRD-PARTY-SERVICES.md) 与 [权限审计文档](docs/MANIFEST_PERMISSION_AUDIT.md)。

---

## 开发

```bash
npm test              # 运行离线回归与策略测试
npm run ui:watch      # 监听前端源码增量重编
npm run check         # 校验多语言、vue-tsc 类型检查并构建前端与后台脚本
npm run release:build # 生成纯净的隔离发布产物目录与压缩包
```

主要目录结构：

```text
src/                 前端组件、SDK、工作区与后台服务源码
crates/fast-search/  Rust / WebAssembly 本地快速检索模块
server/private-chat/ 私有聊天室可选服务端
tests/               自动化单元测试与策略回归集
docs/                架构设计、模块索引与历史归档
generated/           构建输出的静态产物
manifest.json        Chromium MV3 扩展清单
```

### 延伸阅读

- **架构与现行入口**：[系统架构设计](ARCHITECTURE.md) · [现行真实入口说明](docs/CURRENT_STATE.md) · [模块索引](docs/MODULE_INDEX.md)
- **许可与合规**：[LICENSE](LICENSE) · [第三方开源许可](THIRD-PARTY-LICENSES.md) · [素材与致谢](ATTRIBUTION.md) · [隐私说明](PRIVACY.md)
