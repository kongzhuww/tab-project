# 模组架构剩余工作：历史静态核对

> **归档范围说明**：本文件的“当前/最新/下一步”属于当时的迁移阶段，不是当前任务清单。QQ、频道、监控/工作流旧路径及旧模块计数已过时；现行入口看 [CURRENT_STATE.md](CURRENT_STATE.md)，注册以 `src/modules/builtins.ts` 为准。不要据此恢复已删除模块或擅自运行旧验收。

**阶段收尾：GitHub源码治理与技术报告**。最后核对并移除无调用入口的syncN8n/loadN8nUpdates、局部状态与隐藏同步栏；profile.service仍有共享读取，后台/Native Host协议及Archify明确确认Webhook保留，未部署或调用宿主。完整类型/构建/后台CLI语法/diff通过；未真实浏览器/存储/AI/Star/n8n/断言/E2E/提交。原轮次引用的技术报告与独立验收清单现已不存在；当前请按现行源码与领域文档核对，不据此补建文件或恢复当时的12项清单。当前是源码治理阶段完成，不是全应用完成或实测节能；跨页事务、持久恢复、共享服务和性能测量列后续专项。

> 用户暂缓人工验收。下方编号章节保留首次静态审查时的证据快照；**以本节最新实施状态为准**，不要把已完成项重复迁移。没有重载扩展、调用真实服务、读取实际设置/凭据、运行断言/E2E或启停 QQ。

## 最新实施：QQ宿主边界与旧n8n清理

- `intro/main.ts` 已移除QQ聚合出口及init调用。QQ View onMounted是唯一qqController.init调用点，保留幂等初始化/autoConnect原配置。仅按需导航不调用init，不触发原生启动。
- `registry.ts` 新增可选同步canOpen及轻量badgeCount；WM open在transition/焦点变化前检查，Dock不再写QQ专属判断或导入qqService。Reload仍先检查canUnmount，且重新打开失败不报告成功。
- MacDock改读各模块的badgeCount，不导入聊天store。QQ轻量module-state只发布未读总数；共享store拥有同步watch，窗口Hide/Quit不销毁后台。新页在首次加载QQ领域前不恢复历史徽标，显示零不能理解为后台确实没有未读；本轮没有为了徽标新增轮询或持久键。
- globals/phone的QQ点击入口转到`qq/navigation.ts`：先打开窗口，再动态加载会话store；窗口隐藏、后续开关或停止会淘汰迟到的聚焦。按已有缓存匹配会话，不假称联系人一定已加载。表情库仍是明确的QQ领域消费者，打开表情库可能载入QQ store，但不直接调用QQ init。
- `AppWorkspaces.vue` 删除完整的隐藏card-n8n旧控制台和过时空注释。源码JS/TS/脚本及根HTML未找到该旧入口的执行消费者；monitor中的同名说明控件及共享CSS仍有消费者，保持原禁用状态，不伪接功能，也没停n8n服务。
- `DockModuleHost.vue` 加载失败界面的“退出”改为“隐藏窗口”，不调用beforeQuit；需要停止后台仍由用户显式Dock操作处理。
- QQ capabilities从shared-page-connection更正为browser-session-owner，仅元数据修正，不是常驻验收。
- 验证：npm run check（vue-tsc、三个Vite入口与后台构建）、后台/CLI node语法、git diff --check通过；generated同步。没有断言/E2E或真实浏览器交互、QQ启停/消息/凭据读取、原生宿主部署或提交推送。不声称性能提升已测量或所有静态依赖消失。
- **剩余**：globals仍有CalendarService构造初始化，WM仍导入monitorController处理业务别名；通用宿主其他生命周期/共享服务治理尚未结束。下一步以任务日历共享资源边界为切口，再做模型价格卡片试点；暂不大改其他域。

## 日历后续实施更新

共享服务准备之后，日历已作为第12个辅助窗口注册，showInDock:false维持11个Dock图标。唯一宿主/WM及命令入口、窗口任务读取消/版本、同页共享写计数卸载门禁、任务详情意图导航与真实拖动缩放已接，旧layout/feature/mounted重复项删除。保留共享Google/课表/月份/侧栏/timer。完整构建通过，浏览器/真实任务未验收；下一步模型价格卡片生命周期。见 [CALENDAR_MODULE_BOUNDARIES.md](CALENDAR_MODULE_BOUNDARIES.md)。下文编号审查为原始快照，“11个注册/日历未注册/构造自动init”等不再作为当前源码事实。

## 模型价格卡片实施更新

首个全屏卡片试点已接：首页首次激活挂载，独立页保留；active控制配置读取/监听与设置Teleport，草稿保活；评分组件异步加载，立方体等待真实目标。源码发现价格/排行没有实时刷新接收者，现状改为内置示例说明及禁用无效刷新，不冒称在线能力。全构建通过，交互未验收，详情见 [PRICING_CARD_LIFECYCLE.md](PRICING_CARD_LIFECYCLE.md)。下一步AI HOT。

## 结论

浮窗注册层已覆盖 **11 个内置模块**，但“登记完成”不等于“全应用自治完成”。下一阶段应先清理宿主对业务的直接依赖和重复入口，再处理尚未统一的窗口，最后扩展全屏卡片的生命周期。不要把五个卡片强行改成浮窗，也不要取消独立标签页。

目前登记：QQ、同步备份、频道订阅、监控、工作流、表情包、ArkPets 设置、音乐窗口、壁纸库、Todoist、Obsidian。以 `src/modules/builtins.ts` 的实际登记为准。

## 1. 最高优先：通用宿主仍然直接拉起业务

### 已核对事实

- `src/intro/main.ts` 导入 `../qq`，并在页面启动时无条件调用 `qqController.init()`。
- `src/qq/index.ts` 是聚合出口，同时导出 service、store 和三个 Vue 视图；它不是纯轻量元数据入口。仅靠这里的源码不能量化打包体积，但它不适合作为通用启动器的业务入口。
- `src/qq/qq.store.ts` 的 init 会挂订阅、恢复收藏/历史，按已保存 autoConnect 请求连接。因此“首次打开 QQ 后才请求连接”的说明与总入口调用链仍有差距。
- `src/dock/dock-lifecycle.store.ts` 直接导入 qqService；openApp/reloadApp 仍有 QQ 专属判断。
- `src/core/globals.ts` 直接导入 QQ store、CalendarService 等。日历 service 的 constructor 会 initControllers 并调用 init；init 包括读取缓存/课表、尝试 Google 日历范围读取，实际是否联网取决于运行设置。
- `src/core/window-manager.store.ts` 直接导入 monitorController，仍知道云盘/预约等业务别名。

### 下一步

1. 分清三种动作：模块元数据登记、只读附着已有后台、首次用户打开后的初始化。不要把它们都叫 init。
2. 将 QQ 专属开关守卫收回模块契约/轻量 module-state；通用 Dock 不导入业务 service。
3. 总入口移除绕过模块策略的直接初始化，通知/快捷入口通过受控的领域路由按需加载；不能简单删掉调用而遗漏通知、表情发送与会话聚焦消费者。
4. 保留“首次进入后保持 NapCat 连接”的用户策略，不能为了懒加载在 Hide/Quit View 时停共享后台。
5. 分批收敛 globals，暂不一次性重写所有桥接。

**验收边界**：这些改动会影响初始化时点，源码修改可先做，当前用户运行页面不自动重载。不能把用户说“当前 QQ 正常”当成最新初始化路径已验收。

## 2. 同批清理：隐藏的旧 n8n DOM 与重复 ID

- `src/layout/AppWorkspaces.vue` 仍有 `id="card-n8n"` 的隐藏旧控制台，含 n8n-workspace-refresh / n8n-workspace-external / n8n-control-open。
- `src/monitor/MonitorCard.vue` 也有上述控件 ID，其按钮明确 disabled、属于尚未接入能力的说明。
- 这说明存在重复标记来源；是否在某一具体运行时同时出现在 DOM 中取决于挂载状态，尚未浏览器验证。querySelector/getElementById 与未来事件装订容易选择错误入口。

**处理方式**：核对 HTML/JS/CLI/样式消费者后，删除确定无消费者的旧首页控制台及过期空注释。不要因此给监控中尚未实现的按钮接假事件，不操作真实 VPS/n8n。

## 3. 下一窗口：任务日历；随后处理辅助窗口

### 任务日历

- `AppWorkspaces.vue` 仍以 useRetainedMount + calendar key 单独挂载。
- `dock-lifecycle.store.ts` 的手工 mounted 初始表只剩 calendar。
- `calendar/CalendarWorkspace.vue`、`workspace-store.ts`、`CalendarView.vue` 通过全局 CalendarService 工作，而非独立注册实例。
- `src/services/calendar.service.ts` 同时服务日历窗口和 Todoist 日历侧栏，含动作订阅、月份状态、Google 日历与任务写操作。不能让关闭一个窗口销毁整套共享服务。
- `src/core/ui-features.ts` 仍登记 calendar-view/calendar-workspace；需检查独立 HTML 消费者与 spaOwned 分支后再判断能否删除，不直接断言重复挂载已发生。

**迁移顺序**：先写清窗口资源与共享数据归属，再接模块生命周期。日历拖任务改截止日属于真实写入，等待期间阻止卸载，不通过真实任务修改来验证源码。保留当前入口，不凭注册行为新增用户没要求的 Dock 图标。

### 辅助窗口

`src/core/tool-modals.store.ts` 仍保留 firecrawl；`AppOverlays.vue` 还有 Firecrawl、GitHub 分析/仓库详情、图片查看器、B站播放器/字幕与旧 Obsidian 辅助弹窗等。它们不必全部变成独立 Dock 模块。

先分为：领域子窗口、跨模块共享查看器、真正独立工具。分别规定谁打开、谁保存草稿、谁取消读取、谁销毁 URL/监听，避免又造一套重复宿主。

## 4. 五个全屏卡片需要另一种呈现契约

目标：B站、GitHub、AI HOT、YouTube、模型价格。

### 已核对事实

- `src/dock/store.ts` 中 DOCK_CARDS 与 DOCK_TOOLS 是分开的；独立页仍有导航消费者。
- `AppWorkspaces.vue` 在短暂 idle 后挂载整个 daily-section，里面装配五个卡片；YouTube 的 v-show 不会阻止组件首次挂载。
- GitHubWorkspaceCard 的 onMounted 可读取 ghUser/ghToken 并发起加载。
- YouTubeCard 的 onMounted 调用 service.init；service.init 挂动作处理，实际后续读取需沿调用链继续核对。
- AihotFeed 挂载时设置延迟 switchView，当前 View 内没有对应卸载清 timer 的代码。
- PricingRadar 挂载读取领域设置，有 storage 监听卸载处理，但尚未统一页面可见/激活状态的读取契约。

### 建议实现

先从相对独立的模型价格卡片试点，再 AI HOT、YouTube，最后 GitHub 与 B站。依次区分：

- 元数据与导航位置；
- 首次激活时的 View/data 加载；
- 离开卡片时暂停的读取和前台计时器；
- 必须保持的播放器、账号服务和共享缓存；
- 独立标签页自己的实例生命周期。

可复用注册元数据与加载状态，但不要把所有卡片套用浮窗的 Quit/beforeQuit；尤其不能把关闭 B站卡片当成停止电台或把关闭资料抽屉当成退出账号。

本轮没有性能测量，不声明现有卡片一定造成多少卡顿或占用。

## 5. 宿主协议后续补项

- registry 目前校验 ID、schemaVersion、root/title；后续可加重复 root、缺失 loadView/生命周期函数的静态登记校验，不运行断言测试。
- mounted/running 目前只是挂载请求，不是 ready。建议统一暴露 loading/ready/error 和业务 busy 摘要，但不把凭据、聊天或草稿放进 metadata。
- DockModuleHost 的加载失败组件提供“退出”，实际调用 quitApp，可能触发 beforeQuit。QQ 的 beforeQuit 会停止后台，应明确“隐藏错误界面”和“显式停止后台”的不同文案/操作，不将其视为普通关闭。
- pagehide/pageshow、宿主卸载、子实例解绑仍需按作用域检查；已有模块的局部完成记录不等于所有共享服务都完成生命周期治理。
- 当前 capabilities 只是声明，不是安全沙箱。用户模块安装、权限授予、依赖解析、热注册先不做；先稳定内置模块。

## 6. 文档要收敛，不再只追加历史

`DOCK_MODULES.md` 首页迁移台账仍曾把 QQ 写作 ToolModals、停止待确认，但后文和源码已经是第 11 个模块及后台连接协议。QQ capabilities 仍写 shared-page-connection，也与当前实现不符。

本轮先更新文档顶部当前事实并增加本审查链接；源码 metadata 的修正应与下一轮宿主解耦一起进行。历史部署/验证记录保留，但以最新事实摘要为入口，不能让过期“下一步”驱动重复实现。

## 推荐工作顺序

1. 宿主去业务依赖与旧首页 n8n 重复入口清理。
2. 任务日历窗口边界与注册准备。
3. 模型价格卡片生命周期试点，保留独立页。
4. 推广到其余卡片，再集中检查辅助窗口和共享服务。
5. 待用户有空时集中验收 QQ 排序、常驻、新 Native 链路及各模块交互；真实启停/发送/任务文件写入另行确认。

**暂不开展**：外部插件市场、真实QQ/远端服务操作、同步恢复、凭据轮换或仓库历史改写。用户明确暂缓验收时，不通过自动点击/重载绕过这一决定。
