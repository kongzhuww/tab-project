# tab-project 架构演进与长期治理路线图

> 本文档基于 2026-11-03 v1.0.9 状态编写，系统性回应项目复杂度控制、权限最小化、业务测试扩展与构建一致性四大核心挑战，指导后续工程收口。

---

## 1. 复杂度控制与状态生命周期治理

### 1.1 现状与痛点
`src/services/`、`src/bilibili/`、`src/chat/` 体量庞大，涵盖浏览器登录态提取、媒体纯音频流解调、本地 IndexedDB/文件目录持久化、自托管长轮询与 P2P 状态同步。高复杂度模块最容易产生：
- **迟到请求覆盖新状态 (Race Conditions)**：连续点击不同项目时，先发出的慢请求覆盖了后发出的快请求；
- **抽屉与窗口关闭后的幽灵轮询**：组件已关闭，但后台数据流或轮询定时器未解绑；
- **多入口间状态割裂**：新标签页主页、独立全屏标签页（如 `bilibili.html`）与侧栏各自维护独立的响应式 Store，缺乏统一的跨页面状态总线。

### 1.2 治理准则与实施方案
1. **全链路 AbortController 拦截**：
   - 所有网络请求（B站 API、Todoist REST、GitHub GraphQL、资讯聚合）必须接受 `AbortSignal`；
   - 在路由切换、抽屉关闭（如 `GitHubRepoDetailDrawer`、`BiliTheaterDialog`）时显式调用 `abort()`，彻底阻断迟到请求对响应式状态的破坏。
2. **模块生命周期停用解绑**：
   - 依托 `src/modules/builtins.ts` 的 `DockModuleDefinition.lifecycle`，模块隐藏（`hide()`）或卸载（`unmount()`）时，必须成对注销事件监听与定时器（如 B站电台流断开、聊天室轮询暂停）。
3. **分层数据边界隔离**：
   - 严禁在 Vue 组件内部直接调用底层 `fetch` 或操作数据库；
   - 严格遵循：`Vue UI Component` → `Reactive Pinia/Store` → `Service Domain Facade` → `Storage/Network Client` 四层单向依赖链，杜绝把复杂状态塞回总门面。

---

## 2. 权限渐进式最小化路线图

当前扩展已收敛 `<all_urls>` 并删除了 13 个过期域名，但广域主机通配（`https://*/*`、`http://*/*`）以及 `tabs`、`cookies`、`scripting` 仍有较大优化空间。

```
[阶段 1：已达成]
收窄 <all_urls> 为 HTTP(S) -> 清理 13 个退役域名 -> 自动化策略门禁 (51 tests)
        │
        ▼
[阶段 2：短期落地]
移除未激活的 Google 日历 / 将 identity 与 topSites 降级为 optional_permissions
收口 YouTube 封存代码，将 cookies 严格限定于 B站 CSRF 必需路径
        │
        ▼
[阶段 3：中期进阶]
利用 activeTab 替代全局 tabs/scripting（仅在快捷键/点击触发时获取当前页面上下文）
自建 AI 节点与聊天室迁移至运行时精确 Origin 申请 (chrome.permissions.request)
彻底移除 https://*/* 通配主机访问权限！
```

### 详细规划：
- **`topSites` 降级**：常用网站仅在用户首次初始化或显式点击“从浏览器推荐导入”时通过 `chrome.permissions.request({ permissions: ['topSites'] })` 按需索取，不在安装时常驻声明；
- **`identity` 降级**：仅在用户开启 Google 日历同步时索取；
- **从广域通配到 `activeTab`**：覆盖式侧栏目前通过 `scripting` 注入任意网页。后续可验证使用用户显式快捷键（`Alt+W`）或扩展图标触发，依托 `activeTab` 机制在手势发生瞬间自动获得单标签页注入权限，从而完全移除 `host_permissions` 中的通配规则，消除用户的隐私疑虑。

---

## 3. 业务层测试与质量保障

### 3.1 现状
项目已建立 62 项全自动测试套件，并接入本地与 GitHub Actions CI。
- 策略测试（51 项）：覆盖 Manifest 权限上限、Release 不可变防护、版本一致性与 Tag 校验；
- 核心业务测试（11 项）：已覆盖 `Markdown AST` 递归下降解析器、MathML 公式编译、Wiki 双链提取、Todoist 结构化错误分类与重试策略、B站视频章节正则提取。

### 3.2 下一步扩充目标
1. **B站 DASH 音频流与卡顿切源逻辑**：针对网络抖动、403 防盗链自动轮换 CDN 的容灾状态机测试；
2. **Todoist 0ms 离线缓存与 SWR 同步机制**：测试跨页面缓存失效通知广播与本地快照直出。

---

## 4. 构建一致性与防漂移门禁

- **自动化漂移检测**：已在 CI 中接入 `git diff --exit-code generated/ background.js bookmarks-worker.js`；
- **强制规则**：修改 `src/` 下任何源码后，必须运行 `npm run build` 刷新编译产物后方可提交；若发生源码已改但生成产物未同步，CI 将直接以 Exit Code 1 阻断合并。
