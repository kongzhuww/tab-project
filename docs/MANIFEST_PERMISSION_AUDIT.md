# Manifest 权限审计

> 审计日期：2026-11-02，基于仓库 1.0.8 源码静态核对。本文是当前权限事实源；README 只做用户可读摘要。静态审计不等于浏览器实测、商店审核结论或安全保证。

## 本轮已收口

| 变更 | 原因 |
| --- | --- |
| `<all_urls>` 改为 `https://*/*`、`http://*/*` | 现行源码未发现 `file:`、`ftp:` 等非 HTTP(S) 访问需求；减少本地文件等协议的授权面。 |
| `web_accessible_resources` 的图标资源匹配改为 HTTP(S) | 侧栏只注入普通网页，与上项口径保持一致。 |
| 删除 13 个遗留域名声明 | Multica（模块已移除）、微信读书、翻译/MyMemory、jsDelivr、favicon.im、Artificial Analysis、ModelGrep、LMSpeed、Hugging Face。源码未发现对这些域名的扩展请求（Artificial Analysis 仅为普通外链）。 |

**重要边界**：仍保留全部 HTTP(S) 主机访问，因此删除单个域名主要是清理声明与审计噪音，并不会让扩展失去对这些站点的访问能力。真正的最小权限需要逐模块迁移到 `optional_host_permissions` 与运行时授权，见下文后续计划。

## API 权限用途

| 权限 | 现行源码证据 | 结论 |
| --- | --- | --- |
| `storage` | 设置、缓存、会话授权等大量 `chrome.storage` 调用 | 保留 |
| `unlimitedStorage` | IndexedDB 表情库、聊天历史、离线缓存 | 保留；空间增长需依赖各模块自身上限 |
| `topSites` | `src/launcher/runtime.ts` 首次初始化常用网站 | 保留；可评估改为可选权限 |
| `bookmarks` | 书签看板读写、搜索与整理 | 保留 |
| `favicon` | `_favicon/?pageUrl=` 图标 | 保留 |
| `alarms` | Todoist 同步、本地提醒、退役闹钟清理 | 保留 |
| `activeTab` / `tabs` | 标签页管理、侧栏、单页主页复用、导出当前标签 | 保留；`tabs` 可读取所有标签的 URL/标题，属高敏感权限 |
| `cookies` | B站 `bili_jct` CSRF；后台仍保留 YouTube SAPISID 鉴权与 YouTube/Google Cookie 名称诊断消息 | 保留；YouTube 封藏但代码未删，需专项收口 |
| `declarativeNetRequest` | B站 Referer/Origin 动态规则；旧全站规则与 YouTube Cookie 规则清理 | 保留 |
| `identity` | Google 日历 OAuth | 保留；日历模块当前未注册 Dock，需决定是否保留功能 |
| `scripting` | 覆盖式侧栏按需注入；表情包独立页的页面图片收集 | 保留；仅用户动作触发 |
| `notifications` | 待办提醒与后台通知 | 保留 |
| `downloads` | 配置导出、媒体/壁纸下载、更新包下载 | 保留 |
| `contextMenus` | 后台右键菜单 | 保留 |
| `clipboardWrite` | 复制链接、字幕、邀请、图片等 | 保留 |

## 主机访问说明

- 剩余具体域名对应 B站、Todoist、Google API、YouTube、GitHub、OpenRouter/DeepSeek/Gemini、Open-Meteo、AI HOT、塞壬唱片、Jina 正文提取、iTunes/Bing/百度图标搜索、网易云、坚果云 WebDAV 与本机回环。由于仍有 HTTP(S) 通配，它们目前也属于审计记录，而非实际隔离边界。
- 必须保留的广域场景：用户在任意普通网页打开覆盖侧栏、用户自定义 AI/OpenAI 兼容节点、自托管聊天室、图片/网页提取等。迁移按需授权前不能简单删除通配，否则会破坏这些功能。
- WebDAV 当前同步实现调用已退役的 Native 存根，坚果云域名不能作为“同步正在使用”的证据；WebDAV 功能现状需单独修复或下线。

## 自动检查

`tests/manifest-permissions.test.mjs` 使用 `scripts/manifest-permission-policy.mjs`：

- API 权限只能是已审计清单中的项目；新增需同步更新策略与本文。
- 拒绝重复项、`<all_urls>` 与非 HTTP(S) 主机模式、Multica/微信读书遗留域名。
- 拒绝重新声明原生 `side_panel`、自动 `content_scripts`、`externally_connectable` 及范围不受限的可访问资源。
- 每个 API 权限保留粗粒度源码证据检查；该检查只能发现明显陈旧项，不能证明权限必要或最小。

## 后续计划（未完成）

1. 将用户自定义 AI 节点、聊天室服务器、网页提取等改为运行时请求精确 origin 的 `optional_host_permissions`，拒绝后给出明确提示。
2. 侧栏改为仅依赖 `activeTab` 用户手势注入的可行性验证，再评估移除 HTTP(S) 通配。
3. 收口已封藏 YouTube 的后台 Cookie 鉴权和诊断消息，或明确恢复其产品范围。
4. 评估 `topSites`、`identity`、`tabs` 是否可改为可选权限；处理 WebDAV 退役存根。
5. 权限变化会影响已安装用户的授权提示，变更需随新版本发布并在商店说明中同步。
