# tab-project 模块入口索引与历史台账

> **当前退役状态**：用户要求开发版和商店版都移除 CLI/Broker 和 Jev 调试桥接。本文旧 CLI 命令、eval 和自动化运行记录仅为历史，不能视为现行功能或恢复依据。见 [DEBUG_BRIDGE_REMOVAL.md](DEBUG_BRIDGE_REMOVAL.md)。

> **现行入口优先看 [CURRENT_STATE.md](CURRENT_STATE.md) 和根 [AGENTS.md](../AGENTS.md)。** 本文件体积较大，包含按时点追加的历史摘要；“最新/本轮/下一步”、失败状态、模块数量和部署结论不自动代表当前状态。
> 当前注册表是 `src/modules/builtins.ts`，目前 6 个卡片与 6 个浮窗；QQ、独立频道、Popup、旧监控/工作流入口不能按历史资料恢复。聊天当前使用 HTTP 私有服务，动态分享与同父聊天室好友请求已接入，旧 P2P/中继记录不是现行链路。

## 历史增量摘要（以下“最新”均指记录当时）

**最新：个人面板升级为树状标签页中心（Tab Manager）与海狸聊天室全域感知**：
1. `src/profile/ProfilePanel.vue`：左上角头像点击弹出的面板全面升级为双选项卡（`📑 标签页树` 与 `⚡ 性能与指纹`），支持基于主域名的自动智能聚合、基于 `openerTabId` 的派生树、以及用户自定义分组（新建组、移动标签页到组、持久化保存）；点击标签页秒级切换并聚焦，悬浮可单点关闭，彻底解决原本半截截断与不可滚动问题。
2. `src/chat/ChatDialog.vue` / `chat.service.ts`：海狸聊天室支持图文、B站视频/电台系列、GitHub仓库、AI HOT资讯、YouTube视频全卡片右键一键转发与小窗联动播放；接入全域状态感知引擎（`currentMyActivity` 与 Presence 变更驱动同步），支持多客户端实时查看好友“正在看什么/正在听什么”。
3. 扩展全量权威名称规范统一为 **`tab-project`**，清理历史死代码与过时口令。

**最新：移动菜单实际复用常用网站组件**：用户反对书签自造内嵌滚动框。`launcher/LauncherMoveMenu.vue`从原LauncherMenus提取侧向子菜单结构/皮肤/左右上下方向/悬停/280ms关闭timer，常用网站网站+文件夹菜单和书签菜单三处使用同一组件，原DOM ID与业务保存保留。删除原重复两套timer/方向/模板、书签180px内嵌框与专用样式/218px宽度覆盖；书签仅映射id/name/disabled到组件、选择继续真实书签接口，父菜单允许侧向overflow避免SDK裁切。共享菜单行不收缩，长列表原子菜单内滚动。Windows类型/全构建/后台语法/diff通过，未浏览器/数据操作；刷新验收书签与原常用网站悬停侧菜单。详见[最新说明](BOOKMARK_BOARD.md)。

**最新：删除工作区接入/修正右键空框**：按用户要求移除工作区来源识别导出、分组状态、标签/分隔线/提示和专用样式，恢复普通书签分区；投影仅保留排除浏览器工作区占位根的过滤，防止入口/移动目标回流，不改浏览器工作区/收藏数据或普通书签中的同名用户文件夹。菜单空框是移动目标目录列表：限制高度的flex列原会把overflow:hidden行压扁，现目标行固定32px不收缩、主题文字清晰、内部滚动，无目录有提示，限定书签菜单。Windowscheck/后台语法/diff通过，原工作区分组/UI引用扫描为0；未浏览器操作/真实数据写入/断言E2E。刷新人工验收待执行。详见[最新说明](BOOKMARK_BOARD.md)。

**最新：书签切分区网格隔离与工作区尝试停止**：按用户要求对照FavoriteSites的activePage网格key，BookmarkTiles新增folderId key，CSS过渡明确仅拖动时启用，普通分区/目录切换不走旧过渡组；共享图标缓存和拖动让位保留，不增加全分区保活或每次切换读树。工作区只读字段探测经现有CLI尝试，被扩展CSP拒绝eval，函数未运行、未读tabs/windows/URL/标题；不改CSP/绕过/隐藏接口/新增常驻探针，按用户“找不到就算了”停止，仍不宣称能读取实时工作区标签页。Windowscheck/后台语法/diff通过，闪烁实际效果待刷新验收；未断言/E2E、浏览器点击或重载。详见[最新说明](BOOKMARK_BOARD.md)。

**最新：纠正工作区收藏/标签页混淆**：用户截图Edge工作区有15/4个打开标签页而本界面目录为空。唯一读取仍为bookmarks.getTree，没有工作区标签页读取；不能从标签页数量推断收藏数量或丢失。右侧标识改“工作区收藏”，tooltip及空态明确接口不含打开标签页；保留左右分隔线与真实收藏交互，不伪造tabs为收藏。Exa检索未找到官方公开的工作区专用扩展API，旧微软问答不推广为未来版本绝对不支持；直接官方抓取被fake-IP安全策略阻止未绕过。实时标签页接入待用户许可的归属字段只读验证，不读浏览器私密缓存/调隐藏接口。本轮Windowscheck/后台语法/diff通过，未实际浏览器读写或刷新。详见[接入边界](BOOKMARK_BOARD.md)。

**最新：工作区书签合并顶部**：用户选择左书签、右工作区，中间竖向分隔线。board-data按根来源名称识别工作区（中文/繁体/英文），BookmarkBoard同一行显示普通书签板块与右侧工作区标签/标识，使用主题边框变量；其余普通来源仍可下拉切左侧，工作区不再藏入下拉。统一选择状态、磁贴/浮窗/右键/跟手拖动与真实ID保存，刷新保仍存在的工作区选择。没有工作区则无分隔线。只读取浏览器书签树中的工作区目录，不等于能读取Edge工作区实时标签页；不复制/创建/迁移用户数据。Windowscheck/后台语法/diff退出0，未浏览器/真实书签写入，刷新人工验收待执行。详见[最新说明](BOOKMARK_BOARD.md)。

**最新：书签排版、右键、拖动按常用网站对齐**：删104x64宽文件夹/两格宽/90px自定义网格，首页与浮窗直接用现行launcher-site-items；中文件夹一格size-small、大文件夹size-large两列两行。提取LauncherTileContent与LauncherMenuTitle，原常用网站和书签实际共用内容/菜单标题；共用tile-drag-geometry门槛/核心区/冷却，书签useLauncherPointerDrag适配跟手镜像/让位/网站及文件夹排序/中心收纳/跨板块/浮窗内外移动。右键内联标题/网址、真实目录移动、大小偏好与二次确认删除；空白可创建中文件夹，不用prompt。保存改走bookmarks.move/update/create/remove(Tree)，保护固定目录/自身后代/旧字段和删除子树确认快照，写后核对，不传书签ID给launcherService；非跨页原子事务。失败保草稿/暂停写须刷新；不添加假头像接口。Windows类型/完整构建、后台语法、diff退出0，未真实书签/浏览器/断言E2E/提交。用户刷新后集中验收磁贴、菜单和拖动，并回归原常用网站。详见[最新说明](BOOKMARK_BOARD.md)。

**书签向常用网站实现看齐（最新）**：FavoriteSites标题行提供书签标签挂载点，复用原launcher-page-tabs/tab样式而非第二行标签。`launcher/LauncherFolderSurface.vue`从原LauncherFolderDialog提取共享dialog/shell，书签新BookmarkFolderDialog也使用；点击文件夹打开可拖非模态浮窗，首页板块内容不换，嵌套目录只在浮窗进入/返回。`bookmarks/BookmarkTiles.vue`唯一渲染首页/浮窗磁贴，不把书签ID提交launcherService；原常用网站标题编辑/pointer拖动业务保留。搜索保持删除。Windowscheck/后台语法/diff退出0，未真实书签/浏览器操作，原常用网站共享外壳和新浮窗待人工回归。详见[当前说明](BOOKMARK_BOARD.md)。

**书签界面继续收敛**：删除当前板块搜索输入及query/递归过滤/结果路径代码；顶部板块、来源选择和刷新图标收至一行，仅进入子文件夹显示面包屑。中文件夹预览104x64、网站共用64px图标区，标题基线对齐，网格90px。Windowscheck/后台语法/diff退出0，未自动刷新浏览器或读写书签，用户刷新视觉验收待执行。

**书签层级设计调整**：用户要求与常用网站同构，最上层5个文件夹应为5个板块而非所有目录横向列。`bookmarks/board-data.ts`保留树并映射来源/顶层板块，`BookmarkBoard.vue`展示板块标签、中文件夹磁贴与网站磁贴，支持目录进入/返回（随后按用户要求取消板块搜索），保留原单URL拖动写入边界。没有移动用户数据/自动刷新浏览器；Windows类型/完整构建通过，真实层级数量及视觉待用户刷新验收。

**双栏资源管理器已删除**：用户明确确认删除书签/常用网站左右双栏旧窗口。移除`src/explorer/`两文件、AppOverlays挂载、ui-features注册、globals桥、launcher.open-explorer命令、常用网站/书签抽屉打开按钮及无人接收的link:dopus菜单；删除专用CSS区块。共享bookmarks.service与launcher.service、顶部原书签抽屉、新书签看板保留，未读写真实书签或清用户存储。Windows npm run check、生成后台语法与git diff --check均退出0；源码/scripts旧引用扫描为0，当前generated/vue-ui.js静态JS依赖遍历106文件无缺失/旧双栏标识。另删除33个DualExplorerDialog专用历史chunk，其它历史混合产物未批量清理。仍需用户刷新人工验收；不自动重载浏览器。

**书签看板试点**：`launchers/FavoriteSites.vue`新增常用网站/书签切换，`bookmarks/BookmarkBoard.vue`按需挂载并复用LauncherFavicon与磁贴。`bookmarks/board-data.ts`直接投影浏览器书签树，不复制quickLinks；最新改为层级板块：书签栏直属文件夹各对应一个标签（数量来自真实树），当前层子文件夹默认两列一行的中文件夹磁贴、书签为网站磁贴，点击进入/面包屑返回。其他浏览器容器通过来源选择访问，根部URL保留为未分组板块；每批60项，不再全目录横向列；板块搜索已按用户新要求删除。支持单个URL书签跨文件夹移动及拖到网站前排序，写前检查当前节点，单次提交后重读；失败/未知不重试、不反向回滚，须刷新核对后再写，非跨页事务。事件监听/定时刷新随组件卸载清理；顶部原书签入口保留；双栏资源管理器已按用户确认删除，详见下方最新记录。未清理用户数据。Windows类型/构建及静态检查结果见[试点简报](BOOKMARK_BOARD.md)，真实书签交互待人工验收。

**第四轮网址编辑**：前三轮用户反馈无问题；网址沿用SDK输入与保存状态，service单字段合并/确认，标题与网址共用原锁而非全域事务。不访问目标、不改原菜单布局；备注菜单死代码删除但CLI方法/数据保留。Windows构建检查通过，新增网址验收待执行，见[联合清单第四轮](SDK_ROUNDS_1_3_ACCEPTANCE.md)。

**SDK第三轮**：`core/useInlineTitleEdit.ts`、`components/InlineEditStatus.vue`经SDK复用保存状态；`launcher/title-storage.ts`负责三个标题入口的严格存储确认，业务不进通用UI。网站字段意图与文件夹校验/副本保存，失败保当前草稿，未知结果不重试。不是旧增删移动/同步的全域事务。Windowscheck/后台语法/diff通过，人工待验收：[前三轮逐步操作](SDK_ROUNDS_1_3_ACCEPTANCE.md)。

**SDK交互第二轮**：`src/sdk/interactions.ts`统一导出菜单定位/活动监听（`core/useContextMenu.ts`）与无皮肤标题输入（`components/InlineTitleInput.vue`）。Dock与常用网站三个标题入口接入，原UI及业务服务保留；不包括嵌套子菜单/方向键导航或持久化事务。Windows类型/全构建/后台语法/diff通过，浏览器交互待人工验收，见[SDK说明](../src/sdk/README.md)。

**最新：频道模块已删除，公共 SDK 0.1 试点已接入**。旧频道源码、抓取与机器人管道、入口/全局桥/专用样式已移除；QQ聊天与b站自身频道不属于删除范围。历史文档中的频道模块说明失效。共享Google日历配置仍用原键，由calendar/GoogleCalendarConnection.vue在todoist设置中展示；监控RSSHub helper归monitor。公共接口与边界见[SDK复用清单](../src/sdk/README.md)：原图片查看器、窗口/设置组件、注册中心和通知均只有一份实现。GitHub图片/内置登记/todoist设置为试点。类型与全构建、当前产物依赖检查通过，浏览器人工验收待执行；未自动刷新、调用真实账号或写用户数据。

**开发环境补充：WSL 构建验证已接入**。Windows 仍是权威源码和 Edge 加载目录；Ubuntu 副本仅执行 npm 锁定依赖安装、类型检查与完整构建。首次 `npm run check` 和生成后台语法检查通过，不回传产物、不重载浏览器、不运行断言/E2E。命令和同步排除边界见 [WSL_BUILD.md](WSL_BUILD.md)。

**最新：Todoist预览抽动修复（源码）**。悬停不再读取动画中卡片的实时中线，也不把预览周围空白当成尾部。拖动开始一次捕获原始逻辑插槽，悬停仅换算列表当前top/scrollTop，10px边界滞回；布局dragLeave保留最后有效槽，另列进入或取消才更新/清理。保留预览/140ms动画/保存中，取消清几何Map、不写用户数据。类型/完整构建/后台语法/diff通过，实际平滑度待用户手动刷新验收。

**最新：Todoist途中落位预览**。任务drag清除默认数据，不再携带text/plain，只传任务专用类型（保留看板/侧栏/日历消费者），阻断任务拖动冒泡到普通文本搜索。悬停按上下半部插入展示层卡片，原节点保留但收起占位，周围任务140ms让位；拖过预览本身保持落点，松手沿用预览锚点、立即放置并后台保存。取消/隐藏/看板替换清预览，实际columns与_taskRaw在悬停时不改、不发API；保存中/失败保护保持。类型/完整构建/后台语法/diff通过，未操作真实任务/浏览器；文本搜索提示及实际跟手效果待用户刷新验收，不保证第三方扩展捕获阶段行为。

**最新：Todoist拖动前端/保存分离**。松手立即乐观放置；140ms轻量列表过渡、上下落点线、原生拖动影像精确抓取偏移，源卡不再被重复透明化。保存中卡片标记，不等API才动，也不把动画完成当保存成功。失败仅局部恢复本页展示，云端未知要求显式刷新，不重发/反向写；板块已确认则不退回旧板块。保留写计数/同页移动互斥，保存时暂缓看板刷新/切换，隐藏仍结算原看板，替换看板不被旧结果覆盖；非跨页事务。状态行预留高度避免松手布局跳动，遵循减少动画偏好。类型/完整构建/后台语法/diff通过，未实际移动任务/浏览器操作；实际跟手效果待用户刷新验收，不宣称服务器更快。

**最新：歌词逐字段保存已接入**。原始存储与有效草稿双基线按拥有字段合并，保留未知旧字段/最新未编辑字段，不补写全部显示默认；同字段冲突拒绝整批并保草稿。明确预设选择记录涵盖字段意图，确认保存才清除；重读有草稿先非模态确认，显示/原始基线分别回填。Todoist排序回复追加目标范围核对、重读清过期错误。最终类型/完整构建/语法/diff通过，无真实任务/歌词偏好/目录/账号/浏览器操作。人工刷新验收待执行；仅配置存储边界，不宣称所有歌词参数已被实际渲染器消费，非全仓事务。详情见 `docs/ARCHITECTURE_INCREMENTAL_REVIEW.md`（docs内同名）。

**最新：Todoist任务移动源码修复**。原生拖拽被旧CSS user-drag:none禁用，已恢复element并删除无实现的attachCardEvents桥；跨板块改用官方tasks/{id}/move，默认板块明确项目根部，右键项目移动补dispatch。同列child_order/今天day_order保存并核对，日期汇总不发假sectionID；失败/部分完成非模态提示、不自动重试。移动互斥/写门禁、迟到读取/本页旧缓存失效；不删除用户数据，非跨页事务。类型/完整构建/语法/diff通过，无真实任务/浏览器/账号操作，用户手动刷新后拖动验收待执行。详情见 `docs/ARCHITECTURE_INCREMENTAL_REVIEW.md`（docs内同名）。

**最新：快捷键/书签过滤按条目保存**。新 entry-preferences.ts 在共享设置锁内只应用草稿改动ID，不同条目保留双方修改、同条目冲突拒绝本次提交；确认后集合/基线回填。未知快捷键、过滤规则额外字段/旧格式原样保留，重复ID不静默清理；旧规则只显示保留数量。公开 ShortcutService.setShortcut 保留但改走同保存保护，不整表写默认值/先改运行态/吞错；运行时监听单次绑定、迟到初读与返回保护，非法非字符串不参与调度且不删存储。类型/完整构建/语法/diff通过，无实际浏览器/键/书签/账号操作；新版页面需人工刷新，歌词仍整键冲突、非全仓事务。详见 `docs/ARCHITECTURE_INCREMENTAL_REVIEW.md`（docs内同名）。

**最新：全局设置旧草稿保护**。开关仅保存自身，统一保存仅提交改动键，头像/快捷键/书签过滤统一经OptionsService白名单与同源Web Lock、最新值/原始基线冲突检查及回读确认。冲突保草稿，未确认暂停写入并要求重读；有脏草稿重读先用既有非模态确认。开屏缓存只更新编辑字段，缺失存储不假成功，原键/格式/账号隔离保留。对象/列表仍按整键拒绝冲突，非全仓事务，旧页须用户手动刷新；未真实浏览器/设置/账号操作。详情见 `docs/ARCHITECTURE_INCREMENTAL_REVIEW.md`（docs内同名）。

**最新：商店跨标签偏好写入保护**。install/uninstall/toggle/批量动作持同源Web Lock、重读原键后应用增删意图；同页保存互斥，10秒等待截止/不可用时拒写，不降级覆盖。批量停用保留未知旧ID和核心偏好，实验启用核对最新展示开关，保存回读确认后更新Dock。商店非模态写按钮暂禁用，Dock右键停用失败有通知。原键/数组格式保留；仅新版合作页面受锁约束，旧页面需用户手动刷新，非全仓事务。未真实浏览器/偏好/账号/收藏操作，待人工验收；记录见 `docs/ARCHITECTURE_INCREMENTAL_REVIEW.md`（docs内同名）。

**最新：直接原生调用与同步重发保护**。core/native-protocol.ts / native-messaging.ts 共享回复校验与95秒等待；OptionsService仅Git命令、SyncService仅同步命令，移除无人注册的window委托和旧宿主自动重发。本页备份/恢复互斥，超时不自动重试，Mac仅本地快照不报云备份成功；Git检查字段/warning严格处理，检查与应用互斥、旧更新标志清理。普通备份V2/白名单/原键保留；非跨页事务或原生操作撤销，无真实Git/上传恢复/凭据/服务操作。记录见 `docs/ARCHITECTURE_INCREMENTAL_REVIEW.md`（docs内同名）。

**最新：后台原生入口来源与命令收窄**。明确扩展 UI 顶层来源才可调用；通用 petNativeCommand 仅三种实际使用的只读服务状态，通过 requestId 返回结果，不再转发任意 QQ/写入命令。手机条数/路径/应用与 AI model 校验，无效参数拒发。移除无当前调用者的 logicWeaverSyncGet/Put、n8nGitHubUsedSync、mobileWatcherSetFolder 后台路由；普通备份直接原生通道与 profile 更新读取保留。三项顶栏原生状态失败不当作已停止，迟到查询受版本保护。直接 Native Messaging 与 6198 网关仍不在此沙箱范围；未真实服务/手机/账号操作，交互待验收。见 `docs/ARCHITECTURE_INCREMENTAL_REVIEW.md`（docs 内同名）。

**最新：原生桥通用响应与请求边界加固（源码）**。unknown 校验 Native Messaging envelope 与布尔运行标记，不将缺失 ok / 字符串 false 当成功；requestId RPC 发送失败、断线、关闭、超时成对清理，旧端口/偏好读取受代次保护，不重放写入。单次消息有限等待；DSH/Pi Web/Pi WSL 状态须明确才启动/确认停止，页面打开失败不重发启动。保留命令 payload、数字 stopped、混合模式重连与 QQ owner 单主账号协议；未做全命令 schema 或部署/真实服务操作。检查与边界见 `docs/ARCHITECTURE_INCREMENTAL_REVIEW.md`（docs 内同名）。

**最新增量：商店非模态已由用户验收，复制策略与按需样式试点已接入源码**。intro/search 页面展示区限制选中与复制，保留编辑区和显式复制动作。商店首次打开加载 View/CSS，设置通过共享 SettingsView 在弹窗/独立页渲染前安装 CSS；命名空间限制样式作用范围，不改变全局 cssCodeSplit。全局 CSS 输出降至 1409.51 kB，不宣称实测提速。npm run check 通过；用户反馈上一轮样式与复制没有问题。商店已新增标题栏拖动（非模态、位置记忆、按钮排除），共享拖动坐标读取/迟到保护/手势清理与视口适配已加固；新拖动回归待验收。未自动刷新浏览器或操作数据。范围与记录见 `docs/ARCHITECTURE_INCREMENTAL_REVIEW.md`（docs 内同名）。

**最新：商店与启用状态边界整理**。启用/停用内置入口不等于下载代码或停止后台；核心入口默认可用、实验室仅展示开关。未知/未开放实验启用有控制器校验；偏好初读失败不覆盖、保存成功才更新 Dock，并监听其他标签偏好更新（非跨页事务）。YouTube 保持注册、Dock 元数据从注册中心读取，未制作公开构建。样式 cssCodeSplit 离线试验发现 library mode 缺少 CSS 自动加载契约，未改正式样式加载。npm run check 通过，浏览器人工验收待用户执行；未重载浏览器或操作账号/QQ/数据。范围、试验结果与验收清单见 `docs/ARCHITECTURE_INCREMENTAL_REVIEW.md`（docs 内用同名文件）。

**最新：保留设计的五个卡片注册已全部完成**。GitHub、YouTube、B站收藏、AI HOT、模型价格通过各自module.ts与DockCardModuleHost在原工作区位置挂载，Dock图标/顺序/右键、全屏导航及独立页保留。B站使用显式workspace-ready策略保持原首页准备后预加载，不宣称已实现首次打开才读取；隐藏不停止共享电台，独立Quit/Reload保守拒绝。AI HOT沿用首次打开挂载、隐藏暂停列表/保活及独立阅读器边界，界面/store/service本轮哈希一致。模型价格沿用首次打开挂载及原设置草稿/评分加载，仍为内置数据而非实时接口。合计17个内置注册模块（11工具+1隐藏日历+5卡片），Dock旧卡片数组已为空，剩余集中交互验收与各模块内部治理。npm run check与diff检查通过，未运行断言/E2E或操作真实浏览器/收藏/播放/目录/账号。详细边界见 [Dock模块实际状态](DOCK_MODULE_STATUS.md)，本条覆盖下文历史注册数量。

**阶段收尾：GitHub源码治理与技术报告**。最后核对并移除无调用入口的syncN8n/loadN8nUpdates、局部状态与隐藏同步栏；profile.service仍有共享读取，后台/Native Host协议及Archify明确确认Webhook保留，未部署或调用宿主。完整类型/构建/后台CLI语法/diff通过；未真实浏览器/存储/AI/Star/n8n/断言/E2E/提交。技术报告 `docs/TECHNICAL_REPORT_MODULE_LIFECYCLE_AND_GITHUB.md`（docs内同名）汇总12个模块登记与GitHub会话/写入保护，验收清单 `docs/GITHUB_ACCEPTANCE_CHECKLIST.md` 待许可执行。当前是源码治理阶段完成，不是全应用完成或实测节能；跨页事务、持久恢复、共享服务和性能测量列后续专项。

**最新：YouTube收藏/同步写入保护已接入源码**。严格独立收藏存储检查错误并回读核对；同页增删/分组/同步互斥，修改副本后保存成功才更新展示。迟到初读失效，结果未确认须显式重读后再写。同步隐藏不撤提交、不弹模态，只说明本次页面可解析的新增视频；不是账号完整同步或跨页事务。原存储键/用户数据保留，完整类型/构建/语法/diff通过并更新generated；未实际收藏/账号/浏览器操作。详见 `docs/YOUTUBE_CARD_LIFECYCLE.md`。下一步GitHub卡片读取与Star写入边界梳理。

**最新：YouTube推荐/翻页读取会话已接入**。可见推荐View持有取消signal，隐藏/换tab/卸载失效；推荐新读取消旧读，翻页串行与代次保护；解析器token改读取私有，成功才提交，不被喜欢同步污染。后台消息有限时可停止等待但不撤回worker已发请求，RSS回退与fetch/body支持signal，缓存已发写非事务。CLI显式推荐读独立于View；设置不再误报取消读取成功。完整类型/构建/语法/diff通过，无真实浏览器/接口/凭据/收藏操作。详见 `docs/YOUTUBE_CARD_LIFECYCLE.md`（docs内同名）；下一步收藏/同步写入门禁。

**最新：YouTube第一阶段完成，非全生命周期完成**。首页卡片首次可见才初始化，独立页保留；移除宿主额外订阅RSS更新和init频道预热，保留收藏与兼容方法。设置隐藏保草稿、初次读版本保护；保存返回后面板不可见则不新发推荐刷新。立方体等待目标挂载。完整类型/构建通过、generated同步，未浏览器/实际接口验收；已发推荐/翻页请求的隐藏取消、continuation迟到写与收藏写门禁尚未接入。详见 `docs/YOUTUBE_CARD_LIFECYCLE.md`（docs内同名）。下一步优先推荐与翻页读取会话。

**最新：AI HOT 卡片源码整理完成**。首次进入挂载，View唯一负责列表加载；移除首页600ms预读与宿主重复加载。隐藏取消列表请求，按请求身份防迟到覆盖；缓存/空结果/失败明确显示，删除默认新闻样例，独立页与文章阅读器保留。类型/完整构建通过，未浏览器或实际接口验收，不声称实测省内存。详见 `docs/AIHOT_CARD_LIFECYCLE.md`（docs内同名）。下一步YouTube入口与请求边界检查。

**最新主线：模型价格卡片试点已完成源码接入**。首页首次激活才挂载、独立pricing页保留；useCardActivity统一可见/pagehide恢复，配置状态读取与监听只在active时，迟到结果失效。设置面板保活/隐藏保草稿，存储写已发不撤回；评分组件异步加载，信息立方体等真实目标挂载再Teleport。发现没有实时价格/排行接收者，已标明内置示例、停用无效刷新及纠正“认证成功”徽标，不新造API调用。全类型/构建、语法/diff通过，产物同步，无浏览器/真实配置凭据/网络操作或断言/E2E。详见 `docs/PRICING_CARD_LIFECYCLE.md`（docs内用同名文件）。下一步AI HOT按需生命周期；实时数据源单独规划。

**日历已注册**：第12个内置窗口、showInDock:false（Dock图标仍11个）。统一宿主唯一挂载，WM/命令入口、窗口任务读取消/迟到保护、共享写计数卸载门禁、拖动缩放与任务详情导航接通；共享Google/课表/月份/侧栏/timer保持。旧layout/UI feature/mounted重复项删除。见 [日历边界记录](CALENDAR_MODULE_BOUNDARIES.md)。类型/全构建通过，未浏览器/真实任务验收。下一步模型价格卡片试点。

**当前进度**：11个浮窗已经登记。已移除总入口QQ init、Dock的QQ service/store直接导入、首页隐藏旧n8n控制台；badgeCount/canOpen由模块提供，QQ通知/手机导航按需加载。首次加载QQ领域前不预读历史徽标，窗口首次挂载仍按原配置初始化；Hide/Reload不停止共享后台。全构建通过，未浏览器验收。下一步日历共享服务边界、全屏卡片生命周期；globals/监控依赖尚有遗留。见 [模组架构审查](MODULE_ARCHITECTURE_REVIEW.md)。不重载或操作用户正在使用的QQ。

最新验证：用户已人工验收 GitHub 设置入口正常；全项目 `npm run ui:check` 与 `git diff --check` 已通过。下文各轮记录中的“typecheck仍失败/GitHub入口未修复”为当时历史状态，以本条为准；其他交互尚未验收。

更新原则：这里记录**当前入口与边界**，不是迁移完成声明。先找 Vue 视图/状态，再找服务；仍有经典脚本时检查两者之间的桥接。当前架构事实见 `docs/ARCHITECTURE_INCREMENTAL_REVIEW.md`。

## 本机 CLI 控制

现行入口 `scripts/lw-cli.mjs` → loopback Broker `127.0.0.1:19826` → `src/core/cli-bridge.ts` / `src/background/cli-bridge.ts`。AI 应读取 [CLI_CONTROL.md](CLI_CONTROL.md) 后使用限定命令诊断；禁止读取秘密或默认导航/重载。CLI 链路已做限定元素只读调用，不能推断交互功能已验收。

## 入口与共享层

| 模块 | 职责 | 关键入口 / 依赖 |
| --- | --- | --- |
| 极速搜索页 | `newtab-search.html` → `src/search/SearchLauncher.vue` + 独立入口 `generated/search-ui.js` | Vue 管理搜索引擎切换、联想与时钟；旧 `newtab-search.js` 已删除 |
| 桌宠设置页 | `pet-options.html` → `src/pets/PetOptionsApp.vue` + `generated/pet-options-ui.js` | Vue 写入原有 localStorage 键并向同源父页面发送桌宠消息；旧 `pet-options.js` 已删除 |
| 贴纸独立页 / 侧栏 | `stickers.html`、`sticker-sidepanel.html` → `src/stickers/StickerStandalone.vue` + `StickerBoard.vue` | 共用 `generated/sticker-ui.js`；保留本地目录、上传/拖入/复制与网页图片扫描；旧 `stickers.js` 已删除 |
| 新标签跳转引导 | `newtab-bootstrap.html` → `src/bootstrap/main.ts` → `generated/bootstrap-ui.js` | 500ms 回退与单主页分流保留；重定向页没有 Vue UI，不加载 Vue |
| 网页汉化编辑气泡 | `src/localizer/LocalizerOverlay.vue` + `src/localizer/main.ts` → 单文件 `generated/page-localizer-ui.js` | MV3 ISOLATED world 的 Vue Shadow DOM 编辑与提示；保留本地词典键、Alt+点击和页面文字翻译；旧 `page-localizer.js` 已删除，不与宿主页面共享框架 |
| 隔离壁纸沙箱 | `wallpaper-sandbox.html` → `src/wallpaper/sandbox.ts` → `generated/wallpaper-sandbox-ui.js` | 仍为 manifest sandbox 且经典 IIFE 单文件，不共享 Vue 模块或扩展页同源权限；仅接受父页壁纸消息 |
| 本机同步过继页 | `sync-bridge.html` → `src/sync/SyncBridgeApp.vue` + `generated/sync-bridge-ui.js` | 只在用户点击时调用本机 `/api/sync-push`/`sync-pull`；Token 输入使用 Vue 状态，不写入日志；旧 `sync-bridge.js` 已删除 |
| 侧边栏 | `sidepanel.html` → `src/sidepanel/index.ts` / `SidePanelApp.vue` → `generated/sidepanel-ui.js` | manifest 的 `side_panel` 指向该页，无 `default_popup`；`popup.html` 与 `src/popup/PopupApp.vue` 已不存在，不按旧说明重建 |
| 独立设置页 | `options.html` → `src/settings/SettingsView.vue` | Vue 复用首页设置视图；缓存与贴纸目录句柄由 TypeScript 服务管理，B站缓存兼容旧 IDB 句柄；原 `options.js` 已删除，保存并返回从独立页回新标签 |
| 主页面 / 独立页 | 新标签页由 Vue SPA 管理；B站、AI HOT、价格、YouTube 与 GitHub 独立页由 Vue bundle 管理 | `newtab.html` → 内联首绘主题/启动看门狗 + `generated/vue-ui.js`；`bilibili.html`、`aihot.html`、`pricing.html`、`youtube.html`、`github.html` → Vue bundle；`newtab.js` 已不再被页面加载；不要把首页已卸载的脚本当成生效入口 |
| Vue 装配 | 单根 SPA、懒加载、能力/命令注册、窗口与全屏卡片调度 | `src/intro/main.ts`, `src/App.vue`, `src/core/navigation-state.ts`, `src/core/ui-features.ts`, `src/core/ui-commands.ts`, `src/core/window-manager.store.ts`, `src/core/fullscreen-cards.store.ts` |
| 内置 Dock 模块 | 以 `src/modules/builtins.ts` 的实际登记为准，不以所有残留 `module.ts` 推断启用 | 当前登记 chat、multica、obsidian、stickers、siren、music 六个浮窗，以及 todoist、B站、GitHub、AI HOT、YouTube、模型价格六个卡片；旧迁移数量不再适用 |
| 数据服务 | 与界面分离的网络、存储和业务计算 | `src/services/{bilibili,todoist,launcher,obsidian,music,sync,wallpaper}.service.ts`；保留尚未迁移的经典兼容边界 |
| 构建/验证 | Vue 类型检查、多入口构建与差异检查；不是浏览器验收 | `package.json` / Vite 配置；使用 `npm run check`、`git diff --check` 与按需语法检查。禁止执行历史断言/无头 E2E，`tests/` 中存在文件不构成授权 |
| 生成产物 | 浏览器直接加载的 Vite bundle | `generated/`；由构建刷新，不直接手改；注意源文件改动可能使 chunk 哈希变化 |

## 功能定位

| 模块 | UI / 状态 | 网络、持久化与兼容入口 |
| --- | --- | --- |
| B站收藏夹 | `src/bilibili/BilibiliWorkspace.vue` + `BiliFavorites.css`, `bili-favorites-store.ts`；订阅、弹窗、电台各有同目录组件 | `src/services/bilibili.service.ts` 与 Vue store 管数据/状态；`bilibili.html` 的收藏夹及迷你播放器由 Vue 挂载，电台收藏夹/视频读取、队列与系列持久化由 `src/bilibili/radio-store.ts` 接管，音频播放/磁带同步由 `radio-player.ts` 与 `radio-tape-store.ts` 接管；Vue 渲染电台列表/队列。`src/bilibili/cache.service.ts` 管缓存读写，`src/bilibili/playback-sync.ts` 管实时歌词同步；独立页和首页 Vue 收藏夹的快捷频道由 `src/services/bilibili-channel.service.ts` 动作总线负责（关注列表先显示 24 个，再逐批补齐），经典重复动作监听已随旧脚本移除；流解析、CSRF 与字幕获取改用 `src/services/bilibili.service.ts`，独立页不再依赖 `newtab.js`；评论图片直接由 `BiliSubscriptionPlayer.vue` 打开，无经典全局点击监听；特殊视频、缓存视图的过渡动作归 `src/bilibili/organizer-actions.ts`，原 `newtab-bilibili-organizer.js` 与独立页重复启动脚本 `bilibili.js` 已移除。 |
| Todoist / 日历 | `src/todoist/TodoistTaskList.vue`, `task-list-store.ts`, `TodoistWorkspace.vue`, `src/calendar/` | `src/services/todoist.service.ts`、`calendar.service.ts`；日历通过 `calendar/module.ts` 注册，旧JS已归档，不恢复。共享资源/窗口边界见 [日历记录](CALENDAR_MODULE_BOUNDARIES.md) |
| 启动器 / 书签 | `src/launchers/`, `src/launcher/`, `src/bookmarks/`；编辑/图标/移动/合并弹窗直接调用 TS 服务，菜单由 `src/launcher/menu-actions.ts` 管理；初始化与跨标签同步归 `src/launcher/runtime.ts`，首页偏好归 `src/launcher/home-prefs.store.ts` | `src/services/launcher.service.ts`、`launcher-icon-search.service.ts`、`bookmarks.service.ts`；首页不加载 `newtab-launchers.js`、`newtab-launcher-data.js` 或 `newtab-bookmarks.js`。课表/流量顶栏归 `src/schedule/runtime.ts` |
| GitHub | `src/github/GitHubWorkspaceCard.vue` + 列表、文件夹、趋势、批量操作 Vue 组件 | `src/services/github.service.ts` 负责 API、缓存和状态；`github.html` 已改为 Vue 挂载，旧 `newtab.js`、`newtab-github.js`、`newtab-discovery.js`、`github.js` 已移除；敏感 Star 写操作仍由现有服务控制 |
| Obsidian | `src/obsidian/` / `ObsidianWorkspace.vue` | `src/services/obsidian.service.ts`；旧 `src/books/`、`books.js` 和 `obsidian.js` 不作为现行入口 |
| 音乐 / 电台 | `src/music/`, `src/bilibili/BiliRadioTapePlayer.vue` | `src/services/music.service.ts`, `src/services/netease.service.ts`, `src/bilibili/playback-sync.ts`；不要加载已删除的根 `music.js` |
| AI HOT 独立页 | `aihot.html` → `AihotFeed.vue`、`AihotViewer.vue` | 顶栏、资讯列表、刷新和视图切换由 Vue/TS 管理；独立页不再加载 `newtab.js`、`newtab-discovery.js` 和已删除的 `aihot.js`；数据请求在 `src/services/aihot.service.ts`，仍保留首绘主题脚本 `theme-init.js` |
| 首页 / 发现 / 搜索 | `src/search/`, `src/weather/`, `src/aihot/`, `src/dock/`；全屏卡片由 `src/core/fullscreen-cards.store.ts` 管理，导航轮盘由 `src/nav-wheel/runtime.ts` 管理，截图中的左侧电梯及快捷方式抽屉已移除（`siteShelfLinks` 仍供导航轮盘兼容读取），快捷键由 `src/services/shortcut.service.ts` 管理 | 首页以 Vue/TS 为运行入口；`newtab-discovery.js`、`newtab.js` 已删除；搜索独立页现由 `src/search/SearchLauncher.vue` + 独立轻量入口 `generated/search-ui.js` 驱动，旧 `newtab-search.js` 已删除；`newtab-shell.js` 的去留须按实际入口核对 |
| YouTube 独立页 | `youtube.html` → `src/youtube/YouTubeCard.vue` | 订阅、推荐、搜索、频道管理与刷新由 `src/services/youtube.service.ts` 管理；不再加载 `newtab.js`，`newtab-youtube.js`、`youtube.js` 已删除；首页全屏入口直接调用 TS 服务 |
| 模型定价 / 图片测评 | `src/pricing/ModelPricingCard.vue`, `ImageBenchmarkView.vue` + `ImageBenchmarkView.css` | `src/pricing/pricing-store.ts`, `image-benchmark-data.ts`, `pricing.html`（由 Vue bundle 装配，不再加载 `newtab.js` / `newtab-discovery.js` / 已移除的 `pricing.js`） |
| 手机 / 系统 / 同步 | `src/phone/`, `src/system/`, `src/settings/` | `src/background/`、`src/services/sync.service.ts`、`native-host/`、`backend/`；不以已删除的 `newtab-system.js` 定位请求 |

## AstrBot 只读监控

原AstrBot子页已按用户要求撤出，遗留无入口View及其SSE订阅在监控迁移轮删除，不重新加入。独立CLI `monitor`仍消费 `src/services/astrbot-monitor.service.ts` 的只读快照；网关/Mac agent部署保留，未启停任何后端。本轮全项目检查通过，真实诊断/浏览器未执行。旧部署与验证仅作历史记录。

## 历史迁移台账：模组自治设置及后续各轮

> **从此处至文末保留原时点记录，不是当前功能清单或待办。** 其中 QQ、频道、旧监控/工作流路径，旧构建失败，旧设置入口问题，以及“已部署/下一步”均需重新核对。当前入口见本文上方入口表与 [CURRENT_STATE.md](CURRENT_STATE.md)，不要恢复旧文件或重跑历史测试。

### 模组自治设置（当时的增量迁移）

- 通用非模态面板：`src/components/ModuleSettingsPanel.vue`。Teleport 到 body，按按钮位置和视口定位；无全屏遮罩、模糊或入场动画。仅面板内部 Escape 关闭，点击页面不丢弃编辑草稿；卸载释放 resize/scroll/ResizeObserver。
- GitHub：`src/github/settings.ts` 管原 `ghUser`、`ghToken`、`ghAiServiceConfigV1` 键，兼容旧 AI JSON 字符串；`GitHubSettingsModal.vue` 仍保留文件名，但已不是模态。读取失败禁用保存、只提交编辑字段、AI 单独保存不重载仓库。全局设置不再写 GitHub 凭据，避免旧快照覆盖。
- YouTube：`src/youtube/settings.ts`、`YouTubeSettingsPanel.vue` 管账号推荐优先开关与备用 RSS ID；推荐缓存按配置签名匹配，旧请求不能覆盖新请求界面。保留既有默认频道以兼容当前用户，开源默认值治理仍待规划。
- 构建与相关文件 diff 检查通过；全项目类型检查仍有其他报错。尚未进行浏览器交互验收，不运行断言/无头 E2E，不提交推送。

## Todoist / B站专属设置迁移（源码已接入，待集中验收）

- Todoist 工作区右上角 → `TodoistAccountSettings.vue` + `account-settings.ts`；保留 `todoistToken` 键，保存通过服务等待本地持久化后更新凭据。原每日刷新/板块规则仍通过既有入口打开，不自动补齐或创建任务。
- B站收藏工作区右上角 → `BiliSettingsPanel.vue`，缓存目录复用 `cache.service.ts` 的原 IndexedDB 句柄。桌面收藏夹读取浏览器登录账号，已删除无作用的 UID 编辑、保存和 `src/bilibili/settings.ts`。手机/同步仍有 UID 消费者，保持不动；用户存储未清空。
- 全局设置移除 Todoist Token、B站 UID/缓存目录 UI，并跳过专属凭据键写入；旧配置保持兼容，共享 OAuth 未迁移。
- 用户当前要求先推进迁移、后集中检查：GitHub 设置按钮无响应是已知未解决问题。此次未进行浏览器点击、目录授权或任务写入验收；ui:build 通过，全项目类型检查仍失败。

## 剩余凭据 / 私有节点迁移（源码已接入）

| 所有者 / 入口 | 设置代码 | 管理字段 |
| --- | --- | --- |
| 模型页右上角设置 | `src/pricing/PricingSettingsPanel.vue` + `settings.ts` | Artificial Analysis / OpenRouter 密钥，原存储键不变 |
| Dock 频道订阅右上角订阅设置 | `src/channels/ChannelSettingsPanel.vue` + `settings.ts` | 频道列表及 Discord/Slack Token、RSSHub、邮件转发来源、共享 Google Client ID |
| Dock 同步备份窗口 | `src/sync/SyncWorkspaceDialog.vue` + `settings.ts` | WebDAV 账号 / 应用密码 / URL / 文件名、WebDAV 与 Native Host 上传/恢复 |
| 网易云工作区标题栏设置 | `src/music/settings.ts` + `EndpointSettingsPanel.vue` | 网易云服务节点；保存后更新当前 NeteaseService 配置，不自动登录/搜索 |
| 监控标题栏节点设置 | `src/monitor/settings.ts` + `EndpointSettingsPanel.vue` | 顶栏 VPS 探针 URL；保存后需手动刷新扩展应用新节点 |

- 全局 `SettingsView.vue` 使用显式 `GLOBAL_SETTINGS_KEYS` 与 `loadGlobalSettings()`，不再读取或写入密钥、账号连接、私有节点、社群凭据列表。旧聚合 `loadAllSettings()` 已无消费者，删除而非保留空壳。
- 共享配置管理入口不等于独占使用。Google 的 YouTube / 日历消费者仍沿用原键；GitHub OpenRouter 回退改为读取 pricing/settings，不再自动复制共享密钥到 GitHub AI 配置。仓库分析 Token 通过 GitHub settings 读取，CLI 同步通过 sync/settings 读取。
- 原模型页目前的 AA / OpenRouter 凭据主要用于配置状态展示；此次不新增排行网络实现，不把密钥保存称作接口连通。频道测试仅用户点击触发，保存不自动刷新网络；列表每次增删先读最新存储，**仍非多标签原子事务**。
- 同步为非模态窗口，首次打开才挂载、Dock Quit 卸载。上传 / 恢复须在窗口内明确二次确认；修正旧 WebDAV 对 Promise 没有 await 而可能绕过确认的问题。WebDAV 目标被其他页修改时中止操作、重新读取，不默默换目标；本轮未执行真实上传、恢复或登录。
- 全局删除 models/channels/devices 编辑区；删除无实际消费者的 LMSpeed/Hugging Face/Jev 设置字段和旧频道跳转全局设置动作。原存储数据 / 同步名单未清空。仍有其他服务历史默认地址、备份凭据隔离等后续治理，不声明开源安全完成。
- 构建通过与全项目 typecheck 通过是不同门禁；目前后者仍有历史失败。新增模块和 Dock 入口等待集中浏览器验收。

## 本轮：Firecrawl 就地节点设置

- `src/firecrawl/FirecrawlModal.vue` 右上角设置 → 通用非模态 `EndpointSettingsPanel.vue` + `src/firecrawl/settings.ts`，沿用 `firecrawlApiUrl` 存储键。
- 删除服务里硬编码的个人 VPS 回退、构造时异步读取的竞态、没有消费者的 `setApiUrl()`。每次抓取前等待读取最新配置；未配置时明确提示，不自动写入旧地址。以前仅依赖硬编码默认地址的用户需设置一次；已保存配置不变。
- 抓取失败也释放超时定时器，拒绝非 HTTP(S) 目标和带账号密码的 URL；本轮未发起真实抓取或读取用户凭据。
- 补全既有 Firecrawl 窗口状态声明，修正三处不存在的 notificationController.notify 调用为已有 fetch 通知 API。不宣称已验证复制/归档功能。
- 剩余待迁移/治理：RSSHub 与网易云服务的私有默认回退、Cal.com 个人域名和默认预约路径、QQ 默认个人账号与本机启动/保存路径；监控中的静态设备说明须与实际请求配置区分。备份凭据隔离及 GitHub 设置等交互验收仍待处理。

## 本轮：RSSHub / 网易云 / Cal.com 私有默认值收敛

- RSSHub：页面订阅、频道连通性测试、后台 X 轮询、模型页徽标全部移除个人 IP 回退；`src/channels/rsshub-node.ts` 共用 URL 校验，不允许节点带账号密码/query/hash。未配置时后台跳过 X 轮询，前台 X 提示配置节点；Telegram 的公开预览回退仍保留。监控显示已存节点而非写死 IP，不宣称 Tailscale/防火墙已检测通过。
- 网易云：`src/music/settings.ts` 持有原 `neteaseApiUrl`，每次 NeteaseService 请求前读取/校验节点。删除两个服务的私有默认常量、无消费者的 getter/setter，以及 MusicService 从未使用的 URL/Cookie 字段和重复读取。设置保存不再重新读取整组音乐凭据；Cookie 仍由实际 NeteaseService 登录逻辑管理，没有清空。
- Cal.com：监控右上角 `MonitorSettingsPanel.vue` 管 VPS 探针和新增 `calcomBaseUrl`；预约页沿用 `calcomBookingUrl`。无根地址但已有合法绝对预约链接时可推导 origin；不从个人默认域名推导，不静默写入旧地址。根地址纳入普通配置同步名单，本轮不执行同步。
- 删除个人 /15min、/30min 预设及默认链接、无接收者的 Cal.com 动作分派。保存/复制/打开/预览改为模块直接处理；保存只写预约键，预览仅显式点击时加载，保留原查询参数。服务根地址按钮打开已配置地址，首次设置按钮打开本地配置面板。
- Cal.com 手动 HEAD 只检测公开页面，8秒超时并在卸载时取消，不自动轮询；初始状态不再假称在线。CORS/HEAD限制可能导致检测失败，不能据此推断整个服务不可用。
- 已存节点/预约数据保留。若此前仅靠硬编码默认地址，需在对应入口配置一次；留空表示未配置，不再自动请求个人服务器。后台与前台产物均通过 ui:build 更新。
- 构建和 diff 检查通过，全项目类型检查仍有其他历史错误；本批相关文件未见类型报错。真实登录、抓取、预约预览/复制、浏览器点击尚未验收。
- 后续仍剩 AList 硬编码域名、QQ个人账号/启动与保存路径、备份凭据隔离，以及集中交互验收。不要把本批改动当作整个仓库开源安全清理完成。

## 本轮：AList 节点和授权归属

- 云盘工作区右上角「连接设置」为无模态展开面板，管理新增 `alistBaseUrl`；`src/alist/settings.ts` 拥有存取和 URL 校验。空值不连接个人默认站点；以前只靠源码默认站点的用户须配置一次。
- `alist.service.ts` 每次请求读取同一节点/授权快照；原 `logicweaver_alist_token` 保留，新增 `logicweaver_alist_token_base` 绑定完整规范化节点。旧未绑定令牌不自动发送，须用户重新粘贴或登录确认。删除服务内存缓存和 localStorage/chrome 双写逻辑，不自动清除历史副本，不把 Token 加入同步名单。
- 登录操作明确核对当前已保存节点，不存账号密码；带授权/密码的请求禁止重定向和自动 Cookie，设 15 秒超时，旧节点响应不能覆盖新节点；多标签读写仍非原子事务，不宣称整个凭据系统安全治理完成。
- API、下载回退路径、官方网页、管理入口和 WebDAV 地址均由已存节点生成；路径按段编码，拒绝不安全 raw_url。API/权限失败不再伪装复制成功或生成备用链接。
- 删除 MonitorCard 中无消费者的 AList iframe 地址状态、私人常量及动作分派；刷新直接调用原生浏览器。删除设置面板滑入动画和无作用的常量 getter/token 预填。原生浏览器只在进入云盘模式时请求目录，隐藏/卸载/导航/配置失效时取消目录请求；storage监听和复制反馈定时器均清理。
- 保存节点/Token不自动请求目录，先重读已存配置，再由用户刷新；配置读取失败或其他页面变更时禁用保存/授权和旧目录操作。状态只表示目录读取结果，不宣称全部网盘或 WebDAV 已验证。
- 构建及 diff 检查通过；全项目类型检查仍有历史错误，相关改动文件未报错。未连接实际云盘、登录、复制或下载，未重载扩展、提交/推送。
- 下一步：QQ 个人默认账号与本机路径，再做备份凭据隔离；GitHub 设置无响应和新入口集中交互验收仍待处理。

## 本轮：QQ 个人预设与本机路径收敛

- `src/qq/settings.ts` 持有原 localStorage `logicweaver_qq_config`；`account-settings.ts` 负责账号草稿、URL校验和编辑字段保存。删除源码内两位个人 QQ 号/昵称/头像及私人端口预设；新安装为空账号槽位、默认不自动连接。main/bot 稳定ID和已有个人配置、历史会话/IndexedDB键保留，旧顶层有效 WS/Token 合并回当前账号，避免保存名称时恢复旧节点。
- 连接设置用实际账号列表编辑名称、显示QQ号、节点和新Token；选择编辑对象不切换、不启动后台。不预填Token，未编辑保留；换节点清除旧Token，明确编辑的新Token可用于新节点。保存读取最新配置、冲突时中止，保存不自动连接。当前账号保存后断开旧WS，点击「连接当前已保存账号」或侧栏切号才连接；非原子多标签事务仍属后续治理。
- `QqService.config` 保持响应式对象身份，删除没有消费方的 HTTP URL 默认字段及私有 WS 回退。配置读取/持久化失败不伪装成功；无节点不连接、不排队重连。旧请求/Socket回调/切号延迟、心跳超时和启动轮询在断开/卸载时清理，避免旧账号回调或卸载后的重连。
- 本机控制收归服务，启动/停止串行：有Native Messaging只发Native Host，不同时再发Broker/6198；失败或超时不自动换通道重试。无Native API时才使用固定loopback Broker POST。启动限main+已存本机WS；远程节点不能自动拉起本机QQ。配置默认空值不会自动启动，已有autoConnect选择保留。
- Broker启动/停止路径由当前用户home构造，匹配现行Native Host的 `Projects/napcat-win` 安装约定，不再写死用户名，不接受HTTP传入任意脚本路径。只允许POST、检查文件存在、处理spawn错误；成功仅代表请求已发出，不代表登录就绪或进程已退出。现有Broker未重启，Native Host源码/EXE未修改。
- QQ图片保存复用表情库目录句柄和下载回退，不另存一套物理路径；添加显式「选择表情库目录」入口，须选择父目录（服务在其内使用收藏夹）。删除固定D盘的错误文案，检查保存返回的ok再报告成功。后台下载相对路径/现有目录句柄和Junction均未改动或删除。
- Native Host的qq-stop仍采用现行stop-all脚本，Broker停止脚本为stop-main，两者范围不一致；本轮没有运行它们，不宣称进程所有权/停止范围或Mac可搬运已解决。不要在后续未确认范围时擅自停止QQ或修改外部脚本。
- ui:build、CLI node --check和diff检查通过；全项目typecheck仍失败。对比本轮前日志去掉行号后的错误文本未新增，但QQ现有类型错误未修复。未实际登录/连接/切号/启动/停止/选择目录/保存图片，未重载、提交或推送。
- 下一步建议：默认备份不携带凭据、恢复覆盖保护；随后按用户安排集中验收，Native Host安装约定与停止范围另行确认。

## 本轮：普通备份排除凭据（版本 2，源码已接入）

- `sync.service.ts` 普通白名单只读偏好/布局/常用网站/分组/备注/头像等数据；移除API密钥、用户账号/UID、OAuth/邮件来源、所有已列私有节点、WebDAV连接，以及可能夹带Token的频道与旧AI整组配置。默认不新增「含凭据导出」开关，也不删除用户本机存储。
- `readSyncSettings` 仅向存储请求普通白名单；`extractSyncPayload`、`createSyncBackup`、WebDAV公开upload边界、Native Host push、CLI status/push/pull使用同一范围。未发现当前Vue普通JSON本地导出入口，不凭空增加另一套导出逻辑。新模块配置不会自动加入普通备份。
- 普通备份新 envelope 为formatVersion=2、backupKind=preferences、credentialsIncluded=false；旧版本1/无版本文件可按同一普通白名单恢复。版本2缺少/伪造范围标记拒绝。旧客户端可能拒绝版本2，跨设备请先更新。未修改Native Host二进制或后端数据。
- 恢复只写选中的普通字段，不clear/remove缺失项，不覆盖现有凭据、节点、账号、频道/AI配置。旧备份中这些字段即使为空或含敏感值，也被整组忽略。备份不再等于全量迁移；新设备须在模块中重新配置连接。
- JSON嵌套敏感字段、含认证userinfo/常见认证查询或OAuth片段的HTTP/WS链接触发拒绝，不悄悄删字段/截断；校验补默认值前先克隆，避免修改源快照。仅安全、无值的校验错误展示给用户，其他传输/写入错误仍不回显详细凭据。
- 这不是任意文本脱敏/加密：手填书签/备注可能含秘密、内部网址和个人信息。JSON仍未加密，恢复覆盖普通数据不是合并，用户需确认；旧云端文件/服务端历史版本可能仍含以前的凭据，本轮不读取或删除它们。
- SyncWorkspace确认文案说明普通覆盖范围与旧文件覆盖风险；CLI status增加范围标记、不返回值。单独SyncBridgeApp手机凭据过继仍为用户手动填写/点击的独立功能，不是普通备份，不自动读取模块凭据；改正不存在的全局凭据同步入口说明。
- 构建/diff检查通过；全项目typecheck仍失败，备份相关文件未报错。未运行断言/无头测试，未读取实际存储或备份，未连接WebDAV/VPS/手机同步池，未上传恢复或重载/提交推送。
- 下一步建议：先集中修复全项目类型检查与GitHub设置入口，再按用户许可验收各模块；QQ Native/Broker停止范围差异仍需单独确认，之后才能继续模块注册与生命周期治理。

## 本轮：集中修复类型与实际失效调用

- 全项目 `npm run ui:check` 成功：Vue/TS检查与主UI、沙箱、汉化、后台构建均通过；产物已更新，diff检查通过。未用ts-ignore、扩大any或关闭类型检查掩盖错误，未运行断言/无头E2E。
- GitHub分析/仓库服务/图片查看器改用实际notification.show接口，而不是添加不存在的notify空壳；补正确full_name字段和Obsidian保存结果处理。用户验收的GitHub设置入口保持不动，其人工通过仅覆盖该入口。
- 补齐YouTube服务实际消费的频道/播放列表/搜索/收藏分组状态与空初值，音乐控制器补电台同步声明；电台暂停音乐改用已有真实Audio接口，不调用不存在的方法。
- QQ修正消息类型import、图片判别、清空按钮真实确认函数、头像字段，移除isGroup块内遮蔽导致的运行时TDZ。表情保存结果统一ok/error对象；使用只读路径/tree/cache查询接口，不公开可变私有缓存或直接写服务内部路径。
- MiniPlayer将拖动/缩放结束清理闭包显式交给组件卸载，释放监听、RAF和原始pointer capture；不在卸载时引用仅存在于事件函数作用域的变量。折叠调用、主App标题恢复、顶部计时面状态名、异步服务状态查询、CLI检索范围与收藏数量字段一并对齐真实接口。
- 启动器声明实际备注字段；Todoist分栏声明并填写真实projectId；Obsidian打开代码预览使用其工作区控制器，不误走不接受obsidian的工具弹窗注册。删除Popup中没有任何消费者、还引用不存在activeView的旧openStickers函数；拖图收藏和其他入口未删除。
- 未实际播放/复制/清空消息/移动任务/登录/触发GitHub流水线、上传恢复、操作浏览器或重载/提交推送。类型通过不代表以上真实链路已验收。
- 新发现的剩余实际个人默认值：GitHub Archify→n8n Webhook地址、CLI按名称修复电台的个人收藏夹ID；未为类型检查盲目删除。QQ Native/Broker停止范围差异和其他模块交互仍待确认。
- 下一步建议先治理这些有消费者的个人连接/数据回退，再按用户许可集中验收，之后继续Dock模块注册与生命周期。

## 本轮：GitHub 流水线与电台个人回退治理

- GitHub设置新增“流水线”页，`settings.ts` 只写被编辑的 `ghArchifyWebhookUrl`，独立轻量 `workflow-settings.ts` 管节点读取/URL校验。默认空，不从旧源码IP推导或自动持久化；只设置流水线无需先填写GitHub账号。保存不连接、不执行；其他页已改同一节点时拒绝旧草稿覆盖。
- 必须填写完整HTTP(S) Webhook路径，不接受userinfo/query/hash；不增加未经消费的认证Key字段。普通备份白名单不含该新键，GitHub Token/AI密钥不会随提交附带。URL仍可能属于私人连接信息，HTTP应用层不加密，须自行设置可信节点。
- “发往n8n”只准备分析窗口内的非模态确认条；确认前二次读取节点并核对仓库、图谱快照。关闭/取消/切库清确认，关闭已开始请求仅中断等待，不能撤销服务端任务。提交15秒超时、omit Cookie、error redirect、禁止自动重试；HTTP成功只代表节点接受请求，不代表编译/归档成功。
- CLI `bili radio-repair` 参数解析不变，page handler委托 `biliRadioController.repairStoredSeries()`；仅读取两个原系列/备份键，整理已存曲目结构/数量并返回空系列清单，不登录、刷新收藏夹、播放或抓取。读取/格式/保存失败向调用者报错，不伪装成功。
- 删除CLI两段按个人系列名称猜固定收藏夹ID的抓取，以及仅为此引入的B站服务import；删除radio-store的个人SEED_SERIES及自动写入初始歌单分支，无消费者的extractSeriesItems一并移除。已有个人系列不删除，不从源码重新注入或覆盖；有效空主键也不复活旧备份。
- 电台普通界面仍支持当前登录账号收藏夹读取、精确同名补全、队列保存/播放；仅删除play名称猜“音乐”夹的个人别名回退，不另增无用UID/Cookie设置。空系列可自行选夹添加队列后保存，CLI不替用户猜来源。
- 原Chrome/localStorage主副本键保留；保存错误不再吞掉，异步补全写入也等待并报告失败。两种存储和多标签之间仍非原子事务；Chrome保存后本地镜像失败可能部分更新，不自动重试。既有空数组防误覆盖机制保留，但被拒绝时现在明确报错。
- `npm run ui:check`、CLI `node --check`、diff检查通过；源码及构建产物已更新。不运行断言/无头测试；未读取真实凭据/歌单存储、连接n8n/B站、触发提交/修复/播放/保存、操作浏览器/重载/提交推送，新增交互仍待人工验收。
- 剩余：QQ Native/Broker停止范围差异须另行确认，其他设置交互待验收；manifest/内容脚本与其他历史个人默认值不属于本轮两条消费链，未宣称全仓开源安全完成。下一步建议建立Dock模块注册/生命周期清单，保留现有导航，先迁一个有边界的模块。

## 本轮：Dock 内置模块注册首个试点

- 新增 `src/modules/registry.ts` 协议/登记、`builtins.ts` 内置清单和 `DockModuleHost.vue` 通用懒加载宿主；定义版本、ID/显示信息、root、设置键名、能力说明、View loader与可见/打开/隐藏/允许卸载hook。
- 首个接入同步备份 `src/sync/module.ts`，生命周期状态只含visible/busy；界面草稿、凭据持久化和传输仍由同步模块负责。模块设置读取/能力说明不等于连通、权限授予或沙箱；本轮无外部模块加载/安装、运行时热注册或启用开关。
- 保留sync ID、root、窗口位置键、WebDAV键、Dock顺序和主页/独立页导航。删除旧Dock/WindowManager的sync重复条目、ToolModal sync状态、布局专用mount/loader与生命周期默认mounted项，真实消费者改从定义/宿主读取；不清用户存储。
- 首次显示才请求View；Hide保活，Quit等Vue更新后卸载，Reload先卸载再重建。同步窗口保存/测试/传输忙碌时拒绝Quit/Reload，仍可隐藏；此门禁不覆盖其他页或CLI直接发起的传输，不能把隐藏或卸载当远端任务取消。
- 窗口管理器为注册模块更新操作序号，旧重载不能覆盖之后的打开/隐藏/退出；仅本页内排序。WindowFrame按getter身份注销旧窗口与冻结计时器，注册模块绕过旧close/minimize回调重入；其他旧模块未全量治理。
- Sync隐藏清未确认动作，卸载后的读取不回写新实例；初始配置快照改成响应式ref，让保存后dirty正确更新。Quit/Reload会丢未保存草稿，已加入窗口说明。
- CLI新增 `dock modules` 只输出元数据/设置键名，不读凭据或调用loader；仍受page唤醒规则限制。quit/reload拒绝时返回ok:false，右键不误报已退出；running/mounted是请求状态，不保证View已加载或DOM验收通过。
- View加载失败提供非模态手动重载/退出，隐藏也隐藏错误块；没有自动重试备份、测试或账号操作。JS动态import和已发远端请求不是可撤销的Vue实例。
- `npm run ui:check`、CLI语法及diff检查通过，源码/产物更新。未运行断言或无头E2E，未触发真实保存/测试/备份恢复/CLI控制/浏览器导航重载/提交推送；新交互待许可验收。
- 完整接口、迁移台账和人工清单见 [DOCK_MODULES.md](DOCK_MODULES.md)。下一步建议迁频道订阅，核对显示/隐藏/退出时订阅和请求资源；QQ停止范围仍需单独确认，其他模块不是已接管或已验收。

## 本轮：频道订阅接入注册模块及前台资源生命周期

- 第二个注册模块 `src/channels/module.ts` + `module-state.ts`（仅visible/写入计数）+`settings-keys.ts`（键名）。原channels ID、Dock位置/图标、窗口/root/卡片ID与凭据、订阅、缓存、已读键保留；注册metadata不导入业务service或读取凭据。
- 删除AppWorkspaces中常驻隐藏的重复ChannelsFeed、对应旧UI feature登记/loader、全局bridge.init、专用Overlay挂载与旧Dock/WindowManager/ToolModal/mounted重复项。真实频道UI由注册宿主唯一装配；原频道卡片的hidden属性也移除，显示由模块/窗口控制。
- runtime仅在View挂载装订一个动作监听，卸载解除；epoch防止隐藏/退出后动态import旧动作启动请求。服务每轮资讯请求用父AbortController/版本号，切平台、刷新、隐藏、退出取消旧请求；响应体仍受超时/取消约束，取消后不走备用公共抓取。不新增轮询/SSE。
- Hide保留列表、筛选、抽屉和设置草稿；重新显示不自动拉取。Teleport设置面板随模块隐藏并暂停ResizeObserver/resize/scroll定位，重显重新定位；连通性测试支持外部signal，在隐藏/关闭/卸载时取消等待且不显示过期结果。
- Quit/Reload重置本页UI与服务内存、清动作监听，不清持久缓存/已读/订阅/凭据，不停止后台social-sync/Gmail或撤回服务端已收请求。宿主卸载清本页运行/挂载请求，仍不能撤销已发送写入。
- 设置保存/增删和已读写入用模块计数（含排队动作）阻止Quit/Reload，Hide允许已发写入完成；已读本页串行读最新集合再写，写入错误不吞掉。设置面板写入中不被关闭按钮/再次设置按钮卸载，防旧写入与新草稿混用。
- 保存订阅/连接后取消旧资讯加载，不自动抓取；既有15分钟按平台缓存保留，手动刷新才强制拉新。未完成配置签名缓存/跨页事务；已经发出的cache写入无法撤回，取消只阻止旧响应回写当前UI。
- 共享Google Client ID仍有YouTube/日历消费者；OptionsService沿用重导出的原来源key，设置持久化值不变。测试认证请求omit Cookie/拒重定向，不添加未消费凭据字段；公开默认频道未改，B站/Discord/Slack完整资讯实现不是本轮补齐项。
- 窗口注册时给已显示模块设置前景层级，复用同步试点的生命周期门禁/后续操作序号。完整协议和人工清单见 [DOCK_MODULES.md](DOCK_MODULES.md)。
- `npm run ui:check`、CLI语法及diff检查通过，产物更新；未运行断言/无头测试、读取真实凭据/缓存、请求真实频道/测试连通性、修改订阅/已读、登录/备份、操作浏览器/重载/提交推送。交互尚待许可验收。
- 下一步建议迁监控模块，按子页核对AstrBot事件流/探针/云盘请求的可见性和释放；QQ停止范围差异仍待确认，其他模块未接入或未验收。

## 本轮：监控接入注册模块（第三个试点）

- `src/monitor/module.ts` + `module-state.ts` + `settings-keys.ts`登记monitor，保留原ID、图标、Dock顺序、位置/root/卡片ID、VPS/Cal.com/预约/AList节点与绑定授权键。注册仅轻量键名、visible、写入计数及读请求暂停hook，不读取凭据或加载业务View。
- 删除主页重复隐藏MonitorCard、对应UI feature/loader、专用Overlay、旧ToolModal/mounted/Dock/WindowManager重复项。窗口只由模块宿主装配；alist/calcom别名直接设mode，不再依赖未定义的全局回调计时器。
- AList第一次进入才挂载并尝试一次目录读取，之后保活；隐藏/切页/标签隐藏取消目录和直链读取、清复制反馈timer，版本与active阻止旧响应/晚剪贴板反馈/晚开标签。已请求过（含取消/失败）的目录不因重开自动重试，手动刷新；连接metadata独立序号保护，跨页配置变化仍失效授权/列表。
- Cal.com手动HEAD父Abort+超时+版本保护，隐藏/切页/退出使旧结果无效；预览只显式点击且预约页可见时挂载，隐藏/离开即移除，不自动恢复。配置读取不发网络；设置面板Teleport随窗口与标签可见性隐藏并暂停定位监听，保留草稿。
- 设置、预约链接、节点/Token写入和AList登录计数门禁，拒绝Quit/Reload、允许Hide，已发送写入继续；退出清View/监控内存与storage/visibility监听，不清用户数据、不停止进程。整个页面关闭或已发剪贴板/网站预约/网络任务不能被前端销毁撤回。
- AstrBot UI已按用户旧要求退出，遗留组件和仅其使用的SSE/保活实现无入口，已删除。独立CLI快照service与网关保留，600ms读取重试等待可中止并解除timer/监听。没有恢复AstrBot监控页、修改Mac/Windows部署、启动/停止任何服务。
- 原全服务刷新/轮询/n8n/RSSHub/备份/救援动作无接收者，删除空动作总线及调用、禁用对应按钮，明确系统/n8n未接入；历史部署说明不冒充实时健康，备份初值不再假称在线。后续补齐这些功能仍是单独任务。
- 顶栏SystemStatus VPS探针及手机事件由SystemService独立管理，monitor隐藏不停止既有15秒轮询。vpsUrl保存后仍需刷新扩展应用加载；本轮没有把跨模块轮询错误认领为监控清理完成。
- 完整 `npm run ui:check`、CLI语法、diff检查通过，产物刷新；未断言/无头E2E、真实请求/登录/保存、浏览器操作/重载/提交推送。浏览器交互待许可验收，QQ停止范围差异仍待确认。
- 下一步建议接入工作流（核对任务读取/运行与退出门禁），或集中人工验收现有三个试点；不默认执行真实工作流。

## 本轮：工作流静态快照接入注册模块（第四个试点）

- `src/workflow/module.ts` + `module-state.ts`登记workflow，保留ID、root/窗口位置、图标和Dock顺序；metadata不读data或业务store，设置键为空，能力仅内置快照/内存排版/脚本查看复制。workflow先插入，再让monitor插于其前，避免目标条目尚不存在导致Dock错位。
- 删除旧Overlay loader/mount、ToolModal可见状态、默认mounted/Dock/WindowManager重复项，以及无消费者store.isOpen/open/close/toggle。没有主页重复workflow卡片。真实View/store只由懒加载窗口使用，不新增全局业务初始化。
- 核实没有网络读取/运行/保存任务接口，脚本中的请求/CLI命令只是字符串。UI标内置静态快照、非实时启用标记，不声称VPS脚本最新/工作流已就绪，也不添加假执行busy或未消费API Key设置。
- Hide保留排版、tab和节点/脚本选择，暂停拖动和复制反馈；mousemove/up/blur全局监听仅在拖动期间装订，释放/失焦/隐藏/切工作流/卸载解除。标签隐藏也暂停，切tab子View卸载配对清理；复制等待不重复提交、错误非模态、过期回调不污染新View/脚本。
- Quit/Reload清本次UI并用structuredClone重新生成种子数据；修复原浅数组拷贝会使拖动后的节点坐标污染初始快照。JS模块代码仍可缓存，没有真实任务门禁/持久化写入，已提交剪贴板不能撤销。
- 在内置脚本快照发现明文API密钥/邮件应用密码及邮箱字段，改为环境变量引用（缺必需变量拒绝继续，收件人可回退邮件账户），不读本机env、不新增secret存储。重建后对本轮data.ts及工作流chunk检查，四项已发现值无匹配；未运行脚本/连接账号/VPS。
- **安全剩余项：建议轮换这些凭据。** 旧Git提交/备份/副本/浏览器旧缓存和VPS原脚本未清理，未吊销凭据，未做全仓敏感信息审计，未重写Git历史。其他个人默认路径/数据仍待治理；不要在日志/报告里重复值。
- `npm run ui:check`、CLI语法和diff检查通过，产物更新；无断言/无头测试、实际剪贴板/浏览器操作、真实网络/任务/存储写入或提交推送。交互待许可验收，QQ停止范围仍待确认。
- 下一步建议先迁表情包模块（目录授权/保存/退出门禁），或集中验收四个试点；实际工作流连接/运行另行设计并授权，不默认补接口。

## 本轮：表情包注册与实例边界（第五个试点）

- `src/stickers/module.ts`/`module-state.ts`/`settings-keys.ts`接入stickers，保留ID/root/卡片/窗口位置、图标和顺序；先插stickers再workflow/monitor。移除旧Dock/WM/ToolModal/mounted/Overlay重复项、主页隐藏Board/feature及无消费者toggleUtilityCard/toggle-stickers事件。
- Dock用实例controller和new StickersService，Qt/侧栏/设置/独立页保留原共享消费者；Dock Quit不销毁QQ单例或撤QQ的URL。数据init不绑定DOM/看板动作；挂载Board装订动作，文件change/drop归Vue，删除无消费者的旧DOM事件/网页扫描渲染。
- 首次按既有授权读目录（不自动权限弹窗），目录元数据16个一组、缩略图8个一组；版本/协作signal防过期回写。Hide/卸载停止后续读与创建URL，原生getFile本身不可撤回。缓存/草稿保留，重新显示不重扫库、可补缺失图；初次扫描被取消需显式刷新。
- 真实Board分页首120/再120，切目录释放非当前URL、退出清本实例全部URL。QQ旧大列表/单例生命周期未接管，保留原缓存上界；不宣称已测提速/全局无后台加载。独立页面与Sidebar的原投递入口未删除或自动打开库。
- 授权、更换/创建目录、文件保存/删除、偏好写入及提交QQ发送计数阻止Quit/Reload，Hide允许已提交操作；未实际操作文件或目录。saveRootHandle等IDB事务complete，新增非敏感stickerRootHandleRevision通知同名目录更换，旧库/handles/root/偏好键不变；IDB和Chrome并非跨库/跨页事务。
- 文件写流失败尝试abort，保存/批量错误传播而非假成功，已写前几张不回滚/重试。URL保存15秒期限覆盖响应体，25MB验证在Blob取得后，未做流式网络限制；原生写入没有强制取消期限。用户选择的句柄目标已捕获，其他页更换配置不撤回已发写入。
- 复制回调和timer有版本/可见性保护，只有返回成功才显示徽标；发出的剪贴板不可撤销。QQ图片准备可在隐藏时Abort/FileReader取消，提交前核对会话/登录账号，已发发送计数等待，不以void返回伪报送达，需用户在QQ核对；跨模块账号/节点/回复/停进程仍不是事务。独立页无QQ宿主不伪报打开窗口。
- 预览改成本地可拖标题栏的非模态浮窗，无全屏遮罩/模糊；菜单用成对外部点击监听，不挡页面。Hide关闭预览/菜单/拖动与复制通知timer，字段草稿保留；退出解除当前实例动作/storage/visibility/键盘/resize/拖动监听并清内存，不清持久数据，不停止任何后端。
- `npm run ui:check`、CLI语法、diff检查通过，源码/产物文档更新；无断言/无头E2E、真实目录/权限/存取删除/QQ消息/剪贴板/浏览器或提交推送。独立页/QQ回归与五试点交互待许可验收，QQ stop-all/stop-main差异仍待确认。
- 用户要求凭据先不处理：不再展开历史/轮换操作，也不恢复已移除的源码明文。后续建议接入ArkPets（只梳理前端媒体/监听与命令，不自动启停桌宠），或先集中人工验收五个试点。

## 本轮：ArkPets 设置面板注册（第六个试点）

- 新增 `src/pets/module.ts`/`module-state.ts`/`settings-keys.ts`/`settings.ts`，仅轻量metadata/状态注册。保留arkpets/root/dialog/Dock图标、顺序和独立pet-options.html入口及原localStorage偏好；移除ToolModal/mounted/Dock/WM默认项、AppOverlays专用重复挂载与CLI旧open路径，统一注册宿主/WM。无新权限/原生进程控制。
- 面板不是页面桌宠引擎的所有者。打开面板只读偏好，不ensurePetLoaded、不预取CDN、不渲染Spine、不写原生混合开关；删掉原onMounted强写lw-arkpets-hybrid-enabled=0，保留后台/同步/其他原生消费者及既有值。AppWorkspaces按已有enabled恢复引擎的行为保留，Dock关闭/重载不停止它或Native Host。
- View拥有目录AbortController/readVersion、搜索/列表/草稿、闪烁timer、visibility/storage/Escape监听；隐藏/标签隐藏/关闭选择器取消目录请求和迟到回写，不自动重新拉取。重开保留列表、搜索/未成功保存草稿；中断的读取需显式重试。卸载成对清理，共享目录缓存不删除。
- getModels支持调用者signal并覆盖6秒每CDN响应体超时，Abort不继续换CDN或写新缓存；保留缓存键与三个旧回退CDN，校验缓存/目录行基本形状。只读取模型目录，不把文本列表说成骨骼或预览加载。
- 偏好写入经模块savePetPreference显式白名单并通知同源window/parent；读取失败控件禁用，写入/通知失败保留草稿并说明可能部分保存，无自动重试/假成功。同步localStorage写入没有跨页事务；一些引擎参数只启动时读取，明确需重新加载页面而非面板。
- 启动/隐藏/换人由显式用户操作，Dock对ensure引擎代码/保存/消息提交计数，忙时拒绝Quit/Reload、不排队，Hide不撤回已提交命令。提交之后的Spine/模型/伙伴异步加载不在此计数中，无命令ACK，不声称送达、运行或停止计算。状态徽标改“保存开关”，按钮“关闭”改“隐藏桌宠”；删除无接收者get-state和无发布者state监听及假运行/换人成功通知。
- 修正换人服务lw-pet-pick为引擎真实arkpet-select-model，接收后显示主角色；引擎initPet版本防旧SDK/回调覆盖，切换时尝试stopRendering/dispose旧主实例，默认目录响应不再覆盖已有选择。引擎菜单旧open-tool-modal事件无消费者，改用户点击时主页面WM打开注册面板，独立页面提供pet-options.html。未自动打开标签。
- 引擎主循环/伙伴/原生心跳/全局监听及右键退出后的重建没有整体接管；隐藏桌宠仍可能计算/加载，新增小范围版本保护不是完整引擎治理。独立页/嵌套父页多引擎行为、跨页命令与存储一致性未实际验收。
- 干员选择为非模态固定小面板，无全屏遮罩/模糊/缩放动画；外部点击不清搜索，Esc或关闭按钮关闭、草稿保留；小视口高度受视口约束。没有新增Spine预览挂载。
- `npm run ui:check`、CLI语法及diff检查通过，重建generated；未断言/无头E2E、CDN请求/写实际偏好/桌宠启停/原生连接/浏览器/提交推送。六试点与独立页仍待许可验收，QQ停止范围待确认；凭据后续处理继续暂缓。
- 下一步可集中人工验收六个面板，或接入音乐并先区分关闭窗口与停止共享播放；QQ在确定stop-main/stop-all范围后迁移。

## 本轮：音乐窗口注册（第七个试点）

- 用户明确选择“退出窗口、继续首页播放”；Hide/Quit/Reload均不暂停/销毁共享MusicService、首页音频、队列、可视化或B站电台，播放控制仍由homeMusicController路由。面板退出不是停止整套音乐服务。
- 新增src/music/module.ts、module-state.ts、settings-keys.ts、workspace-data.ts；metadata仅节点键名/轻量状态、不载播放器或凭据。保留music/root/window/Dock顺序/图标/旧存储键。删除AppOverlays重复挂载、旧mounted/Dock/WM条目、无消费者workspaceOpen/openWorkspace/closeWorkspace和音乐专用隐藏首页picker分支。
- Dock歌单/曲目/搜索/二维码与调度为实例状态，不再与首页业务列表共用；只有播放器/账号服务和已存数据仍共享。退出只销毁本窗口资源，不清Cookie、喜欢、历史、节点或首页状态，不停止首页扫码timer。
- 首次可见请求列表，重新打开不自动重发。Hide/切来源/卸载中止浏览请求、搜索debounce、串行扫码timer和点击监听，版本/signal/账号UID防迟到回写；搜索/来源/列表/节点表单草稿保留。扫码暂停需显式重新扫码。未使用全屏遮罩/模糊，EndpointSettingsPanel新增visible与卸载后回写保护，其他消费者默认行为不变。
- 专用浏览直接使用Netease request(signal)，不加入首页共享pendingRequests、不撤首页请求/缓存，不在读取时隐式登录或写云端历史。账号历史同步改显式按钮，并等待持久化Promise；失败可能只保留本地记录，文案不假报云同步成功。匿名也能手动刷新列表。
- 节点保存、已发checkQrStatus（可能写Cookie/资料/喜欢）、退出登录、清最近记录与显式历史同步计数，忙时拒绝Quit/Reload、不排队，Hide不撤回已提交写入。QR准备可Abort，确认发出后不伪报取消；串行setTimeout避免并发interval确认。已提交播放/记历史由共享播放器继续，其他首页/跨页/原生写入不在本窗口计数内。
- request支持父signal+15秒响应体期限、omit浏览器凭据/禁止重定向、目标必须同配置节点origin；沿用服务Cookie协议与原存储键，不导出或查看凭据。该公共底层变化也影响首页/音源接口，真实兼容性待验收，节点/账号绑定与跨页事务没有全面治理。
- checkQr完成/退出发不带凭据account-updated，刷新共享首页资料及使窗口旧列表失效；新Cookie确认清旧资料/喜欢缓存以免失败后展示旧账号，fetchLikedSongs纳入await。多步存储不是事务，失败可能部分提交；旧首页同时登录/退出/初始化、节点/账号并发仍可能竞争，不能称完全一致。
- 退出登录沿用远端失败后本地清理行为，说明不保证远端退出；Cookie保存/资料/喜欢接口内部历史错误回退未全部重写，不以803或Promise返回声称全部账户同步已完成。源切换/退出窗口不是退出登录。
- ui:check、CLI语法与diff检查通过，generated同步；未实际播放/暂停/浏览器/扫码/退出登录/写节点或历史、未断言或无头E2E、未提交推送。首页播放连续性、原扫码任务和节点/目录接口回归需人工许可验收。
- 下一步建议集中验收七个试点；或迁壁纸库，先明确退出窗口与当前壁纸/sandbox的关系。QQ仍等待stop-main/stop-all范围确认。

## 本轮：壁纸库注册（第八个试点）

- 用户选择“退出窗口，保留当前壁纸”。新增wallpaper/module.ts、module-state.ts、settings-keys.ts；metadata仅heroBackground/heroBackgroundHistory键名，不读内容。注册wallpaper先于依赖它的stickers/workflow/monitor，保留Dock顺序、图标、root/window及lw_wallpaper_workspace_pos位置键。
- 删除AppWorkspaces专用挂载、Dock/WM/mounted旧分支、旧background-library feature及无HTML/SPA消费者的BackgroundLibrary.vue模态实现。store.ts只保留palette/Globals实际使用的openDialog/closeDialog/resetDefault桥，开关转WM，重置有写门禁；不删除这些真实消费者。
- WallpaperWorkspace实例拥有历史/状态/页码/重命名草稿、预览Map与读取版本；首次可见读库，Hide取消后续读取/预览回写、暂停移除库内视频src/解码元素、停止拖动/键盘，重开不重新扫历史但可补当前页缺图。退出清本实例URL/监听/登记，不调用clearActiveWallpaperUrls，不停当前图片/视频/sandbox。
- 移除旧onMounted主动移除hero-background-media iframe的副作用；预览createLibraryPreviewUrl独立创建、由调用者回收，不与当前壁纸池混用。只读当前8项，翻页回收离页URL；模板不再发getPreview异步请求，避免重绘重复读。已发原生IDB读不可撤回，但Abort/version阻止迟到URL；Web包不创建iframe缩略图，继续显示占位。
- 导入/文件夹/应用/重命名/删除计数门禁，忙时不排队、Quit/Reload拒绝，Hide不撤回提交；写入后重读失败/变更明确失败提示，不伪称媒体已加载。保存rename失败留草稿；删除二次确认，当前项明确会恢复纯色。Palette显式重置与页面写入共用本页计数，其他页/同步写入不在此事务内。
- 新文件input属单次请求，change/cancel成对解绑/删除并结算，不留下常驻匿名控件；目录入口保留，显式用户选择后才扫描。目录读取每次迭代核对450文件/180MB上限，导入保存错误说明可能部分完成，不回滚/重试。
- storageGet/Set检查runtime.lastError，不伪装读空/保存成功；IDB put/delete等待complete并处理abort。文件与Chrome元数据跨库/跨页仍非原子事务，历史30上限沿用。导入不再无条件清legacy current-background；自动修剪不删除当前选中storageKey载荷，当前项即便离开历史列表仍可继续持有文件。
- 当前Renderer仍独立：apply版本防迟到DB响应或旧fallback覆盖新选择，支持原内置style渐变；退出窗口不触发apply。原web iframe加载超时回退/后台初始化行为未完整治理，不把提交配置当图片/视频/web成功加载或保证不会自行回退。
- 保留自定义轻量窗口样式和拖动，新增WM getter身份登记/注销；共享useWindowDraggable支持可见性停止手势/RAF与resize、卸载停止手势、过期坐标读保护和小视口裁限，其他调用者默认语义不改。位置存储仍为公共布局逻辑，不计入媒体写门禁，真实拖拽回归待验收。
- 去掉标题中的个人文件hash特判，显示已存原名；高亮文案改“已选配置”，不伪报实际正在显示。纯色type:none识别保留。
- ui:check、CLI语法、diff检查通过并重建generated；没有断言/无头E2E、真实目录/导入/重命名/删除/应用/浏览器或提交推送。八试点和当前动态壁纸连续性仍待许可验收，QQ stop-main/stop-all范围未定，凭据处理继续暂缓。
- 下一步可接入Todoist，核对任务写入/隐藏读取/首页共享数据边界；或先集中人工验收八个试点。

## 本轮：Todoist 接入准备与详情归属修复（尚未注册）

- 现行入口是AppWorkspaces懒挂载、Dock/WM和main-workspace-store兼容桥；Todoist尚非第九个注册模块，八个已注册模块保持不变。
- 第十六轮已优化 GitHub 搜索模式交互：打字零 API 消耗并匹配本地星标；点击「在 GitHub 搜索」按右侧规则在线检索并在下拉框直接呈现仓库结果；仅按 Enter 跳转外部 GitHub 搜索。Windows check/后台语法/diff通过；见 docs/REPOSITORY_CLEANUP_REVIEW.md 第十六轮与根 AGENTS.md。
- 第十五轮已拆出 `src/bilibili/following-service.ts`（正在关注流协调器 `BiliFollowingCoordinator`）；原服务彻底门面化，降至 471 行（最初 2257 行，累计净减超 1780 行，仅剩 20%）。Windows check/后台语法/diff通过；见 docs/REPOSITORY_CLEANUP_REVIEW.md 第十五轮与根 AGENTS.md。
- 第十四轮已拆出 `src/bilibili/subscription-service.ts`（字幕订阅协调器 `BiliSubscriptionCoordinator`）；原服务降至 630 行（最初 2257 行，净减超 1620 行，仅剩 28%）。Windows check/后台语法/diff通过；见 docs/REPOSITORY_CLEANUP_REVIEW.md 第十四轮与根 AGENTS.md。
- 第十三轮已拆出 `src/bilibili/channel-actions-router.ts`（收藏夹动作事件路由分发）与 `embedded-playback.ts`（嵌入播放进度与暂停）；原服务降至 917 行（最初 2257 行，净减超 1340 行）。Windows check/后台语法/diff通过；见 docs/REPOSITORY_CLEANUP_REVIEW.md 第十三轮与根 AGENTS.md。
- 第十二轮已拆出 `src/bilibili/up-preview.ts`（UP 卡片弹窗预览）并扩充 `organizer-actions.ts`（本地缓存视频动作）；原服务降至 1097 行（较最初 2257 行已减少超 1160 行）。Windows check/后台语法/diff通过；见 docs/REPOSITORY_CLEANUP_REVIEW.md 第十二轮与根 AGENTS.md。
- 第十一轮已拆出 `src/bilibili/up-group-manager-actions.ts`（分组管理器弹窗动作派发）与 `default-favorite.ts`（默认收藏夹写入）；原服务降至 1270 行（净减近千行）。Windows check/后台语法/diff退出0；见 docs/REPOSITORY_CLEANUP_REVIEW.md 第十一轮与根 AGENTS.md。
- 第十轮已拆出 `src/bilibili/up-relation.ts`（关注/取关 API）与 `up-videos.ts`（UP 投稿与缓存）；底层 `storageSet` 增加 lastError 校验，分组管理器保存错误能上报至 UI；原服务降至 1492 行。Windows check/后台语法/diff退出0，待人工验收；见 docs/REPOSITORY_CLEANUP_REVIEW.md 第十轮与根 AGENTS.md。
- 分组移动校验已收敛到 `up-group-tree.ts` 的 `validateBiliGroupMove`，服务写前拒绝自身/后代目标、循环或缺失/重复ID的目标父链，原无界祖先遍历已移除；不改旧保存事务。Windows check/后台语法/diff退出0，浏览器待验收。最新文件指路已写入根 AGENTS.md；详见 docs/REPOSITORY_CLEANUP_REVIEW.md 第九轮。
- 分组树纯计算统一到 `src/bilibili/up-group-tree.ts`：关注读取/快照/订阅添加器共用成员收集，管理器层级展开单独保持原排序；不写原树，订阅选择器补循环终止。服务当前1647行。Windows check/后台语法/diff通过，浏览器未另验；拖动祖先校验仍待下一轮定点处理。见 docs/REPOSITORY_CLEANUP_REVIEW.md 第八轮。
- 本轮新增 `src/bilibili/following-reader.ts`（187行），负责全部关注请求、分组聚合与结果草稿；协调服务保留会话/超时/分页准备/唯一提交点，降至1705行。按用户偏好每轮只拆1～2个明确职责文件，不改交互/存储。Windows check/后台语法/diff退出0，重构后浏览器未另验；见 docs/REPOSITORY_CLEANUP_REVIEW.md 第七轮。
- 用户已反馈推荐/正在关注/字幕订阅三项基本交互正常；本轮继续职责拆分：`src/bilibili/subscription-reader.ts` 持有只读拉取与按日期组稿，`subscription-chapters.ts` 持有纯章节/段落算法，原服务保留委托及会话/归档写入所有权。Windows check/后台语法/diff通过；本轮重构未另作浏览器验收。见 docs/REPOSITORY_CLEANUP_REVIEW.md 第六轮。
- 字幕订阅已接入活动会话、60秒整轮取消/迟到保护；读取私有化并消除重复解析，频道/条数成功才提交，字幕网络失败不当作无字幕。顶栏在加载/错误时仍可用；本页归档串行按频道重读合并，非跨页事务。共享字幕 API 新增可选 signal，播放器调用不被订阅取消。Windows完整check/后台语法/diff通过，浏览器待验收；见 docs/REPOSITORY_CLEANUP_REVIEW.md 第五轮。
- 正在关注流已接入活动会话、30秒整轮超时、独立 Abort、草稿式分页/游标提交及部分聚合失败保护；查看动态改为只读分组加载，不触发旧隐式保存。独立 UP 预览和关注/取关写入口不改。详情及人工验收见 docs/REPOSITORY_CLEANUP_REVIEW.md 第四轮。
- B站服务第一轮职责拆分：`src/bilibili/channel-types.ts`、`channel-format.ts`、`recommendations.ts` 分别持有契约、纯工具、推荐流；`services/bilibili-channel.service.ts` 保留原导出、委托入口和同一 rcmdState 引用（2257 → 1980 行）。结构拆分不改存储/写操作；后续已为个性推荐主列表接入 useCardActivity、Abort/15秒整轮超时、当前请求身份保护及成功后分页提交。隐藏/离开取消，返回不自动重发；关注/订阅/搜索框推荐不在此保护范围。Windows 类型/构建/后台语法/diff通过；无浏览器或断言测试，详见 `docs/REPOSITORY_CLEANUP_REVIEW.md`。
- SDK 挂载槽已补搜索限时/取消/稳定排序、注册身份清理、菜单来源与注销后禁止注册；清除 82 条退役立方体 CSS 规则，保留音乐/自定义面/Todoist提醒。Windows check/后台语法/diff 通过，无浏览器或断言测试；详细边界见 src/sdk/README.md。
- 本轮全仓规模初筛与整理优先级见 `docs/REPOSITORY_CLEANUP_REVIEW.md`；立方体右键菜单已 Teleport 到 body 并复用 useContextMenu，避免 perspective 祖先使视口坐标偏移。构建通过，浏览器位置待验收。
- TopInfoCube现仅保留音乐默认面与自定义文本/倒数日/链接面；已移除限时任务/GitHub订阅及流量/课表渲染，管理入口支持右键增删、JSON导入与恢复音乐，见src/sdk/README.md。CalendarService仍同时服务独立日历及Todoist侧栏，不能随任务窗口退出销毁单例或全局撤销请求。loadWorkspaceData的SWR后台直接更新任务store，fetch还写共享活动项目和缓存，后续必须隔离窗口读取与迟到回写，不只删除View。
- 本轮修复inspector-store：选择版本与独立detail/labels/comments AbortController，切任务/关闭抽屉取消旧读取；同通道重读淘汰旧请求。迟到响应及finally不覆盖新选择/加载标志。切任务立即清旧详情/评论；读取失败说明，不假装成功。getLabels/getComments仅新增可选signal，旧调用者不变。
- 保存标题/描述、附件、评论和新建标签绑定提交时taskId与上下文；上传期间换任务，不把附件/评论/标签写到新任务。保存后只更新原目标的看板卡片，当前抽屉回写要求同一选择版本；新标签用原目标标签快照，不再上传后调用当前选择toggleLabel。开始写操作取消尚未完成的详情读取，避免旧详情覆盖新编辑；不撤回已提交写入。
- 仅标题/描述与图片保存沿用saving并增加局部重复提交保护；这不是全部写入计数/事务。跨页/同任务并发修改、乐观失败回滚、上传失败的旧base64与评论回退、账号变更/共享缓存范围仍未全面治理。本轮没有接入窗口Hide/Quit清理、关闭门禁或把共享store改成实例。
- ui:check、CLI语法、diff检查通过并重建generated；未断言/无头E2E、真实网络/任务读取与修改、附件上传、Token存取、浏览器或提交推送。窗口生命周期及实际切任务行为待许可验收。
- 下一步：接Todoist注册宿主，处理窗口专属读/SWR、设置Teleport与草稿、任务/附件/评论/规则写门禁，再删重复入口。首页限时任务与独立日历默认保留，不更改其完成/删除语义。

## 本轮：Todoist 注册（第九个试点）

- 新增todoist/module.ts、module-state.ts、settings-keys.ts；注册仅轻量状态/键名，不读Token或导入业务View/service。保留todoist/root/图标/Dock顺序和todoistWorkspacePosition等原键。删AppWorkspaces专用挂载、旧Dock/WM/mounted条目及六个无人消费HTML的Todoist UI feature登记；原Globals开关桥改WM，不递归注册旧窗口动作。
- 主窗口采用单页session租约和active(窗口+标签可见)控制。首次可见读任务；Hide/标签隐藏取消看板、标签、日期历史、Inspector读取与迟到回写，停本窗口键盘/粘贴/拖动和timer订阅，设置Teleport一并隐藏，保留草稿/结果。重开不自动重发已请求的任务；中断可手动刷新。Quit清窗口展示副本、规则/账号草稿、blob/监听与getter登记，不清持久数据、首页timer或独立日历/共享CalendarService。
- 移除service中脱离窗口的SWR后台直接写任务store回调；窗口先显示JSON克隆缓存，再await带signal的在线读取，seq/session校验提交。本页API支持父signal与每请求15秒含body期限，取消不继续filter/版本回退；限制Todoist origin、omit浏览器Cookie、拒绝重定向。服务共享活动项目/缓存仍按旧键写入；已发storage/cache写入不能撤回，不声称跨页事务。
- exported服务和Inspector用稳定领域Proxy计数：HTTP mutation、完整上传/附件创建/评论和设置/规则写入等直到Promise结束；活跃项目/旧setToken持久化也计数。计数不排队、不撤销/重试，涵盖同页首页timer/日历的共享写入（因此可能保守阻止退出），不覆盖其他页/worker、绕过出口的外部调用或整页关闭。Hide不撤已经提交的操作。
- 粘贴composer图片只建本地预览，显式提交才串行上传，移除粘贴预上传+提交再次上传的重复行为；固定view/project/section/content/附件快照，创建失败留草稿并提示未确认。写入中不把取消按钮当成撤回；成功清理只针对同一草稿。composer/comment blob在替换/删除/卸载回收；隐藏原生选择器后返回文件不继续上传。
- Inspector延续上轮taskId/选择版本保护；评论附件上传失败不再发空评论，失败保留评论草稿。TaskList本地完成记录的动态import等待纳入计数；既有乐观更新/部分错误吞掉、附件评论关联部分失败、同任务/跨页竞争尚未整体重写。
- 规则设置迁为窗口内非模态ModuleSettingsPanel，读失败禁止保存、仅保存编辑的主池/目标ID，保留旧autoRefresh等字段；不自动造任务。“保存排序并同步”无执行接收者，移除其按钮；旧“自动补齐每日任务”无调度器，移除界面承诺/立即造任务按钮，改真实板块标记。标题限时拖放/滚轮也无现行接收者，改共享长度展示，引导首页已有控件。移除无人调用的旧任务详情模态挂载，不删除其兼容store/Globals。
- 任务Prompt/确认改无全屏遮罩/模糊/缩放的非模态小面板；账号设置首次打开后保活、显式可见与卸载保护，忙时不更换账号配置。不复制/迁移/删除真实凭据，未治理账号初始化/跨页绑定竞争。
- CLI todoist status不额外读网络；view/project/refresh要求窗口已就绪且可见，隐藏时明确拒绝，不悄悄重开或假应用；视图/子命令校验。没有实际运行page命令或启动Broker。
- ui:check、CLI语法、diff检查通过，generated同步；未断言/无头E2E、真实API/任务/附件/Token或规则写入、浏览器/提交推送。旧部分右键动作无执行接收者仍待专项治理；img已经发出的子资源与共享日历初始化请求不在窗口Abort范围，不能宣称所有网络停止或整个Todoist可用。
- 下一步建议集中人工验收九个试点；或继续Obsidian，先确定未保存笔记的退出策略。Todoist既有右键动作/失败回滚可另开专项，QQ停止范围仍待确认。

## Obsidian 接入准备：标签草稿（尚未注册）

- 用户已选择：未保存笔记禁止Dock Quit/Reload；Hide保留，不自动写文件。这一门禁须在下一步注册接入，不能把当前旧Dock退出当成已有保护。
- tabs-store新增仅内存content/savedContent/mode/fileHandle；切换使用各标签缓冲，空白便签保留、新建另开标签。关闭单标签/其他标签保留未保存或正在保存者。QQ外部同名文件不会覆盖已打开缓冲。
- workspace-controller选择版本阻止迟到文件读取覆盖新选择，空文件不再当作读取失败。切换前及读取结束前捕获原标签编辑；打开失败保留当前草稿。
- 普通保存与另存均固定目标标签、句柄/路径、正文快照，重复保存同标签拒绝；保存期间的新编辑保持dirty，失败保留缓冲、标未确认，不重试、不用旧定时器改新标题。另存结束不重新读文件覆盖新编辑；目标已有其他打开标签则拒绝，重命名同步标签路径并使旧句柄失效。文件流写失败尝试abort后仍报错，不宣称磁盘回滚。
- 标签右键重命名/删除在有未保存笔记/本窗口保存中拒绝；删除确认后再检查。其它入口的重命名/删除、权限选择等待、文件名覆盖确认与root/vault路径一致性待统一治理，不是全领域写入门禁。
- 文件夹列表与openNote路径回退只读恢复/查询权限，不自动选择目录/申请写权限/创建目录；文件夹失败仍有旧根目录回退，完整错误展示待接入。
- ui:check与diff检查通过、generated同步；未访问真实目录/笔记、写文件、操作浏览器、断言/E2E或提交推送。下一步接Obsidian module/View、可见读协作取消、成对解绑监听、全写入计数及未保存Quit/Reload门禁；共享外部导入不得被窗口退出销毁。

## 最新：Obsidian 第十个注册模块（覆盖上文准备阶段）

- module.ts/module-state.ts/settings-keys.ts与ObsidianWorkspace.vue接入。metadata不读目录/正文；保留ID、图标、Dock位置、窗口位置键、收藏及IDB句柄。不接管共享外部导入，不关闭共享服务/数据库。移除旧AppWorkspaces挂载、Dock/WM/mounted分支与七个重复UI feature；独立全局ObsidianDialogs入口未迁。
- 用户选择已经落实：dirty或本页文件/目录操作计数大于0，Quit/Reload拒绝；Hide/窗口关闭保活，不自动写文件。dirty同步计算，不把正文/句柄放进metadata。退出清窗口缓冲、关键词/保存栏/目录展示与监听，已保存文件/句柄/收藏保留。整页关闭/浏览器崩溃不会保证内存草稿恢复。
- 看板/文件/保存目录读取按可见性、版本和AbortSignal协作失效；目录循环不继续发起下一读取，迟到结果不应用。原生getFile/text/IDB/权限等待不能物理撤销；重开不自动重发已请求任务，保存目录有显式重读。移除file-drawer-store独立重复扫描/初始化，动作订阅随View成对解绑，键盘/点击/拖动在隐藏时暂停，getter身份注销。
- 领域出口计数保存、创建、重命名、删除、句柄授权/持久化与导入；同页其它导入也保守阻止退出，其他页/绕过出口/外部进程不在此门禁。保存流不重试，写失败attempt abort不承诺磁盘回滚；句柄在IDB事务成功后才切换，错误/abort返回失败。
- canonical笔记路径改根目录相对路径，子库加子目录前缀；列表/保存选项用vault ID，root保存不误创建同名子目录。已知重命名/另存目标存在则拒绝，不覆盖；检查与创建非原子，root同名子目录碰撞、外部进程并发、各导入器覆盖/资源下载与部分扫描失败仍待治理。
- 原草稿快照保护继续，保存中不能把关闭保存栏当取消或改其提交字段。有草稿/文件操作时不能重命名/删除；删除再次点击同目标确认、隐藏取消确认，错误通知非模态。重命名面板无全屏遮罩/模糊/缩放；左文件栏遮罩移除，渲染预览由Vue正文驱动。
- 初次挂载允许保留未关联便签/QQ草稿，避免“先挂载才能保存、先保存才能挂载”死锁；已有文件关联标签须先关闭再换根目录，操作中不换。选目录为显式行为、取消不切根；成功换根清旧展示再扫描。
- CLI open/close经WM；drawer/tab/close-tab要求已就绪可见，close-tab拒绝dirty/写入；状态只投影标签元信息，不回传content/savedContent/fileHandle。未运行实际CLI page命令或操作浏览器。
- ui:check、CLI语法及diff检查通过，generated重建。未真实读写笔记/目录、授权/覆盖/删除/导入、浏览器、断言/E2E、提交推送。既有搜索/移动/创建目录/部分关键词等未接动作不因此宣称可用；旧收藏相对路径未批量迁移，实际回归待验收。
- 下一步：集中验收十个试点（须许可）；或梳理QQ生命周期，先确认退出仅停主QQ还是所有后台；或单独治理Obsidian旧动作/路径与覆盖回归。

## QQ 生命周期准备（尚未注册，停止入口未完成）

- 用户最新策略：正常浏览器使用保持QQ登录，隐藏/窗口关闭/界面重载/切账号不自动停止本机QQ；只有右键Dock停止才允许停后台。
- 已核实Native Host源码qq-stop调用stop-all-qq.bat且缺脚本/超时也可误报stopped；Broker调用stop-main-headless.bat。专用脚本虽存在，但按命令行中的账号标识匹配全部进程，可能包含执行脚本自身/其他进程，不当作已验证的仅主QQ停止。不复制个人标识到项目源码。
- 当前源码先移除switchAccount的自动停止、View卸载disconnect。QQ store/service继续保留当前页面的WS/心跳/事件订阅；切账号仅切OneBot连接，不退出其他QQ后台。添加页面级backendStartRequested记录，界面重载不自动重放已经请求且结果可能不确定的启动；手动启动仍为显式动作，原autoConnect配置不改。
- stopMainBackend与后台具名qqStop明确拒绝旧宽范围命令，不发送、换通道或重试。旧Dock手动Quit await结果，失败返回ok:false且保留窗口/连接/运行指示，不伪称停止。此阶段右键停止暂不可用，安全停止协议完成后再启用。
- Native Host EXE、外部脚本、正在运行的Broker和已加载浏览器页面未部署/修改/重载；旧原生qq-stop与Broker外部接口仍存在，不宣称全系统危险入口已消除。启动宿主管理双后台的范围、队列/连接竞态也待继续核对。
- 页面WS不等于整个浏览器生命周期常驻：关闭承载扩展页面会失去该页WS，后台QQ登录是否持续未运行验证；未加入offscreen/background连接治理、浏览器启动/退出钩子或自动停止。
- ui:check、CLI语法及diff检查通过，generated同步；未连接QQ、启停/读取进程状态、发送/撤回消息、读配置/凭据、部署原生宿主/脚本、浏览器/断言/E2E/提交。
- 下一步先设计可验证的仅主QQ停止协议与部署边界，再注册QQ模块、划清页面连接与View资源/草稿/发送门禁；不能绕过安全停止阻塞宣布QQ迁移完成。

## QQ 安全停止协议源码（未部署、未运行）

- 新增native-host/qq-main-stop.ps1（ASCII），Check默认只读、Stop显式单进程；Native Host新增qq-main-stop-check / qq-stop-main，旧qq-stop在新版源码中明确拒绝，不执行stop-all脚本。Broker新版源码 /qq/stop-main 返回409，不执行现有stop-main脚本；后台具名qqStop仍拒绝宽范围调用。
- 校验固定3002仅回环监听/唯一PID、QQ.exe非renderer、当前Windows用户/会话、保留OS句柄与启动时间一致、Windows argv中唯一-q与保存的main账号UIN精确相等；固定3001账户若共用目标进程或位于其子树则拒绝。无监听不当作退出证明，不依赖账号子串/进程名批量匹配，不杀树/其他账号，不读私密配置/Token。
- 这是已配置主QQ监听进程的快照身份校验，不是本模块启动所有权lease/任意账号沙箱；仅支持这些端口、参数形态及QQ主进程，无-q、非回环、未知QQ启动形态明确拒绝。没有验证实际Qt/NapCat argv/监听布局或子进程自动清理，不宣称全部QQ后台退出或任意其他账号绝不受影响。
- 前端仅已配置本机3002+main UIN才能发送新协议，不回退Broker/旧命令。验证protocol/scope/port/stopped/main-process-exited全字段后才disconnect并让Dock卸载。Native调用超时/错误/校验失败保留窗口、返回失败，不伪称未发送或已退出；超时后的迟到回调不再改页面状态。
- 本页停止等待期间拒绝发送/连接请求、切账号、保存或重读连接配置、启动/重载/重开；已有OneBot请求未结束先拒绝。心跳不因停止门禁误断连接。串行排队与目标快照只覆盖本页，未实现跨页发送事务、取消已发请求或任意启动服务所有权。
- Native helper超时返回结果不确定；不为了限时强杀helper，不自动重试，helper可能继续执行。未知结果须人工检查；Check只表示当次快照eligible，非之后的Stop保证。身份/共享关系与端口检查并非跨进程原子事务，不宣称消除所有并发变化。
- 旧启动脚本经只读源码核对，会启动双账号且对未监听者清理进程；单main安全启动及其部署仍待治理。本轮没有执行启动脚本或拷贝个人账号/本机QQ路径到新源码。
- PS AST、嵌入argv解析C#独立临时DLL、Native Host独立临时EXE编译、ui:check、CLI语法和diff通过。编译输出仅TEMP，未运行它们或覆盖已安装EXE/manifest/外部脚本，未重启Broker/浏览器、连接QQ、读实际进程状态/私密配置、启停或发消息、断言/E2E/提交推送。
- 下一步须确认宿主部署方式；优先并排版本EXE更新固定manifest路径，保留旧EXE、不使用会强停宿主的install.ps1，不触发QQ停止/扩展重载；部署后单独许可只读qq-main-stop-check。QQ注册/浏览器级连接常驻、草稿/读资源/全发送门禁继续待接。

## QQ 部署与只读核对（最新，覆盖上文未部署状态）

- 用户明确授权“部署并只读核对”。核对Edge/Chrome注册均指向仓库固定manifest；并排编译EXE、原子替换manifest的path，其余字段不变，最终指向native-host/ArkPetsNativeHost.qq-main-v2.exe。原ArkPetsNativeHost.exe、v1及pre-qq-main-v1/v2清单备份保留；未运行install.ps1、未改注册表、未停现有宿主或重载浏览器/Broker。
- 只读Check首次发现3002监听者为QQ utility子进程；不放宽到直接杀子进程，改为最多8层QQ.exe父链、每层保留OS句柄/启动时间/用户/会话校验，定位无--type的QQ根进程后验证唯一-q账号参数。停止前重查父边、监听身份及3001账号不在目标子树；仍只停止一个核实的根进程，不杀树/launcher或其他账号。
- 使用本机启动脚本已有main账号元信息，仅运行helper -Action Check，返回ok:true、state:eligible-at-snapshot、stopped:false；没有读取QQ Token/私密配置，也未输出进程命令行。此结果只证明当次本机helper快照符合守卫，不证明浏览器当前保存账号一致、Native Messaging链路可达、真实Stop成功或所有QQ子进程会清理。
- 只读检查实测约7.9秒，因此宿主等待调整为20秒、前端25秒，并排部署v2而非覆写已运行EXE；超时仍是结果不确定，不自动重试。已连接的旧常驻宿主/运行中Broker不会自动升级，原外部脚本未修改；新sendNativeMessage启动使用新manifest路径。
- 未执行Stop/Kill/旧启动脚本、QQ连接/发消息、浏览器重载或断言/E2E。仅只读Check验证；部署修改了宿主文件与清单，不能继续宣称“本轮未部署”。当前UI生成产物更新不代表已加载页面自动更新。
- 仍待：QQ注册迁移、浏览器级连接常驻、草稿/全发送门禁；旧启动脚本双账号与残留清理风险未解决。真实停止仅在用户明确许可时单次执行，结果不确定先只读核对，禁止自动重试。

## QQ 注册第一阶段（最新：第十一个登记，完整迁移未完成）

- 新增src/qq/module.ts/module-state.ts，由DockModuleHost唯一挂载，保留qq ID/root/图标/位置和原配置键；元信息只导入轻量状态。QQ先登记作为music等dockBefore目标，保持原Dock排序。
- 移除AppOverlays独立QqDialog/useRetainedMount、ToolModal qq状态、Dock/WM旧元数据及固定mounted项。全局打开/手机/表情库/QQ通知入口改走windowManagerController；未删除实际功能或用户数据。
- registry新增可选beforeQuit，仅显式Dock Quit调用并await，失败保留View；不在Hide/Reload运行。执行前后核对卸载门禁/transition版本，异步期间有后续窗口动作不擅自卸载。QQ动态导入服务走qq-stop-main，已登记后不再依赖旧QQ专用quit分支。
- 隐藏/普通关闭继续保活，重载不停止共享WS/QQ后台；仅确认安全停止后断共享连接。当前同页OneBot请求及启动请求计数、停止中、发送/漫游中、输入/附件/引用草稿、设置抽屉、转发面板及预览读取时保守拒绝停止/重载。设置抽屉即使无改动也需先关；输入空白不算草稿。这不是全操作门禁/跨页事务。
- View点击监听按visible绑定/解绑，卸载撤销guard/Toast timer；隐藏取消启动轮询/延时、收起主要菜单；启动响应在隐藏后不再启轮询。消息列表隐藏不自动滚动、打开不重复刷新联系人，联系人由共享连接负责。共享store/service不dispose，历史/收藏/Token/目录句柄保留。
- ui:check、CLI语法及diff通过、generated已更新；本轮未操作浏览器、部署宿主、读取真实QQ数据/凭据、启动/停止QQ或发送消息，不做断言/E2E/提交。前轮宿主部署与Check快照仍有效记录，不代表本轮注册交互已验收。
- 尚未完成：View详情/历史/转发/预览等迟到读取与完整隐藏暂停、全部异步提交门禁、账号切换草稿分槽/设置关闭丢稿边界、旧启动双账号残留清理；QQ只是登记接入第一阶段，不能称完整迁移完成。
- 特别注意：保留的是承载扩展页面中的WS，关闭该页不保证连接继续；后台QQ进程登录与浏览器级消息接收是两回事，offscreen/worker或跨页面单连接所有权尚未实现。用户目标“正常使用不自动停止，只有Dock停止”不等于浏览器级常驻已验收。
- 下一步：先完成QQ界面异步/草稿/全操作边界，再设计浏览器级单连接所有权；真实手动停止仍须用户许可，不能用编译通过代替验收。

## QQ 草稿与迟到读取保护（最新增量，整体仍未完成）

- 文字草稿改为页面内存中的账号+会话分槽，切换后恢复；metadata/普通备份不包含正文。所有槽存在非空草稿时拒绝Dock停止/重载，用户需回对应会话处理；不是磁盘保存，关闭承载页可能丢草稿。
- 发送不再预先清空输入；提交成功仅清与提交快照相同的原槽，不清发送期间的新输入。图片/引用/文件也只清对应快照。失败保留、不自动重发；网络结果未知时可能已送达，用户需核对，不能称事务回滚。
- 发送并发拒绝；发送中不切会话/账号。有待发图片、文件或引用时暂禁止切换并提示，尚非所有附件按会话分槽。文件与文字/图片混合提交明确拒绝，请分别发送；删除自动连带发送“完成后新选文件”的分支，文件失败不再吞成成功。
- 选图按钮改为本地待发准备，不立即发送。FileReader隐藏/切账号会话/卸载时abort，迟到结果检查View版本、账号会话键与连接版本；本地读取中阻止卸载。图片预备大小/错误提示等边界仍待治理。
- 服务disconnect递增连接版本；登录信息、联系人、历史漫游及账号历史IDB恢复添加请求/账号/连接或加载序号校验，跨账号及切走又切回不应用旧结果。后台漫游循环连接变化停止后续读取；历史同会话最新请求优先。删除“空好友每1.5秒无限重试”的递归timer、View重复漫游请求；空列表不假定故障。
- 文件预览fetch支持Abort及迟到结果检查，转发详情版本化，关闭转发淘汰旧结果；隐藏/切会话不应用旧预览。共享联系人和后台历史并不因隐藏全部停掉。PDF迟到打开受版本保护，普通下载/复制/Obsidian导入/右键等其他异步动作仍待逐项治理。
- 设置保存遇到请求/发送拒绝，未改原配置键或读真实Token。原发送后会话统计、跨页竞争、直接服务调用/断线重连与全操作门禁未全部完成，不能称所有写操作安全封闭。
- 类型/构建/CLI语法/diff检查通过，generated同步；未实际读取QQ数据/连接/启停/发送/撤回/配置保存/浏览器重载/原生部署/断言/E2E/提交。前轮只读Check及宿主部署不扩展为本轮交互验收。
- 下一步：其余右键下载/导入/复制及设置草稿、发送快照/重连竞态，再做浏览器级连接单一所有者；承载页关闭后的常驻仍未实现。

## QQ 设置草稿与文件/剪贴板动作（最新增量）

- QqDialog设置草稿在面板关闭/重开时保留，不因showConfigDrawer反复读取覆盖。有dirty设置时拒绝切编辑账号并提示，新增二次点击放弃修改；保存成功重新读取并清输入Token，未保存Token只留当前View内存，不新建持久副本。隐藏取消放弃确认，dirty即使面板关闭也阻止Dock停止/重载；其他配置冲突仍沿用原saveAccountDraft，跨页不是事务。
- 文案纠正：QQ号参与主账号停止身份核对，不再说仅展示；自动连接仅首次打开QQ，不承诺新标签启动/浏览器级常驻。
- 新增View动作ticket：固定会话键/连接/View版本、20秒Abort与卸载门禁；隐藏/切会话/切号撤销准备读取，已开始的clipboard/下载/笔记交接不能撤回。所有实际写动作前核对current，迟到反馈不覆盖新会话。
- 下载fetch/body完成后才提交一次浏览器下载，失败不自动回退直链/新标签；状态只说提交浏览器，不保证落盘。blob URL定时与卸载回收；不取消已经交给浏览器的下载。
- Obsidian导入区分undefined与有效空正文，读取失败不创建“加载中”占位内容；只交接未保存笔记，不宣称磁盘保存。已交接后的Obsidian生命周期仍由笔记模块负责。
- 文本复制await真实结果；图片复制读取/转码/写前核对ticket，后台只读回退有8秒等待上限；失败不再覆盖剪贴板为URL、不自动重发写入。后台已发抓取与Clipboard API不能物理撤回；timeout后不追加写。未全面重写所有ID复制/图片转换异常资源边界。
- 卸载补下载URL/timer和清历史确认timer清理。原生宿主、已运行Broker、浏览器均未部署/重载或调用；未真实QQ连接/启停/发消息/读取配置Token/下载/剪贴板/笔记导入/断言/E2E/提交。
- ui:check、CLI语法和diff通过，generated更新；不是浏览器人工验收。尚余表情收藏/删除/发送、权限授权、其他右键异步与全写门禁，以及浏览器级单一连接所有者/旧启动脚本双账号清理风险。QQ迁移任务继续in_progress。

## QQ 表情提交与收藏持久化（最新增量）

- 两个表情发送入口合并准备流程，ticket捕获账号/会话/连接/View版本，图片fetch/FileReader支持取消与错误终结，准备完成后校验再单次提交；隐藏/切会话不晚发给新会话。本View表情操作busy防连点，动作等待阻止卸载；已发OneBot消息不撤回/自动重试。不是跨页消息事务。
- 收藏写入新增QQ专用strictLocal选项：仅授权目录写入，失败或结果未知不回退下载/Junction；现有其他调用默认行为不变。一次文件写入与收藏IDB并非跨存储事务，文件已确认但记录失败明确部分完成，不鼓励重复写；共享服务目录授权/已提交磁盘写入隐藏后不能物理撤销。
- 新增可选idbReadStrict/idbUpdateStrict：事务complete才成功，abort/error传播，read-modify-write在同一IDB事务。QQ收藏增删按页面队列串行、提交后更新内存；初始化读版本挡迟到覆盖。只在IDB键缺失时读取原同名localStorage收藏，验证数组后合并，不自动删除旧副本、不做隐式迁移写；异常不以空列表覆盖。其他模块原idbGet/idbSet保持不动。
- 删除需同对象再次点击，菜单关闭/隐藏/会话切换取消确认；仅relPath唯一精确匹配才能删除磁盘文件，不用file/id猜同名文件。只有明确存在的QQ收藏记录可执行record-only删除，磁盘失败不伪报删收藏成功；磁盘删除与记录更新仍非事务，可能部分完成。
- 共享deleteStickerFile新增可选exactPath，QQ启用，其他调用维持原行为。文件写入/删除后的共享loadLibrary失败仍可能导致结果未确认，不自动重试或宣称磁盘回滚。目录根变化/其他页面或Dock表情库同时操作尚非全局锁。
- 目录选择按钮纳入View动作计数与错误提示，已显示的系统权限窗口不会因隐藏强行取消；未新增开机服务或浏览器常驻策略。
- ui:check、CLI语法、diff通过并更新generated。未操作真实QQ/连接/启停/消息/撤回、目录授权/图片下载/收藏读写删除、凭据/浏览器/原生部署/断言/E2E/提交。
- 后续：浏览器级单连接所有权方案（当前连接仍属于承载页面），以及剩余直接服务提交/重连竞态、跨实例表情库授权与目录一致性、旧双账号启动脚本风险。不能宣称QQ完整迁移或实际停止/收藏发送已验收。

## QQ 连接层独立（后台迁移准备，尚非浏览器级常驻）

- 新增src/qq/onebot-transport.ts，纯WebSocket owner，无Vue/DOM/localStorage/chrome/原生宿主依赖；导入与构造不自动连接。QqService保留领域API/配置/Native流程，socket/echo/pending/心跳/重连唯一实现在transport，不在同一服务保留两套连接。
- connect固定账号与节点快照，已连接时目标不同拒绝隐式切换；显式disconnect使版本递增并拒绝全部未完成请求、解除回调/计时器、清连接配置引用。重连仅重新建连接，不重放任何消息/文件/撤回请求。
- 15秒握手超时，20秒序列心跳get_status/6秒等待，不重叠setInterval；关闭/错误按socket身份与generation失效旧事件，迟到echo不作为新消息解析。请求错误使用安全通用文案，不输出Token/URL/远端异常正文。
- 原生停止等待暂停transport心跳/重连；确认成功disconnect，失败恢复连接维护但不重发停止/写请求。UI正在提交计数仍由service持有；transport版本覆盖自动重连，旧联系人/历史结果会被既有guard拒绝。
- ui:check/CLI语法/diff通过，产物更新；无真实WebSocket/QQ/凭据读取、浏览器/后台启停、原生部署、断言/E2E或提交。没有增加manifest权限、offscreen页或浏览器启动钩子，不宣称已接入浏览器后台。
- 下一步需要确定启动语义：首次打开QQ后本次浏览器持续保持，或每次浏览器启动恢复已启用账号。随后实现单一后台owner+受限页面RPC/事件/无页面消息存储，避免跨页面重复发送/存储；配置仍在页面localStorage，MV3 worker无该API，必须设计明确凭据交接且不新增无必要持久副本。浏览器级消息收取与QQ进程登录不是同一件事。

## QQ 浏览器会话后台所有者（最新源码接入，未浏览器验收）

- 新增background/qq-owner.ts、qq/background-protocol.ts/background-client.ts/owner-transport.ts；后台index注册唯一OneBotTransport，页面QqService改为RPC facade，不再实例化页面socket。构建检查QQ页面service chunk无new WebSocket；不是运行时断言或真实连接验收。
- 用户确定“首次打开后保持”。QQ View初始化只读attach已有owner；原autoConnect启用时首次打开可请求连接，未启用仍须显式连接。无浏览器onStartup登录/本机启动；仅同次浏览器session已有enabled配置时worker重启恢复。页面pagehide只detach取消息，不断WS/停QQ；普通Hide/Reload继续共享连接。当前pagehide/bfcache恢复及多页面提示还需实机核对。
- 后台源校验sender.id+精确扩展protocol/hostname+固定页面path+顶层frame，拒绝外部网页/content script/incognito；RPC可status/connect/disconnect/限定OneBot action/events/stop-main，无任意JS/URL或脚本入口。账号ID+owner epoch必须匹配，不同连接配置需显式replace；只有一个worker socket。后台不可用明确失败，不回退页面WebSocket/Broker/旧停止。
- 首次显式连接将有效连接快照（含Token）放chrome.storage.session专属键，仅本次浏览器内存会话、非新增磁盘凭据/普通备份；worker不读页面localStorage。status与事件接口不返回配置/Token。没有新增权限/offscreen/系统自启，manifest最小Chromium版本120以匹配构建与后台WS生命周期前提。
- 已启用owner建立一分钟恢复alarm，worker被回收时读取session意图恢复连接；会话消失时无账号不连接并清alarm。20秒WS心跳来自transport，不重发已提交消息。首次初始化空session只读，不连接QQ。休眠/进程被杀/系统关闭不承诺永不中断。
- 接收message/message_sent/撤回事件存bounded session邮箱：单事件UTF8上限256KiB、最多200条/总2MiB，合并写入避免事件洪峰排出无界存储任务；失败/截断标志提示手动历史补拉，不称完整离线记录/磁盘归档。页面打开QQ后2秒串行只读取状态/邮箱，按inboxId/account/sequence游标取增量，既有messageId去重保留；每页只按当前账号消费。多页面历史IDB镜像仍非事务；无页面期间只有bounded邮箱，不发系统通知/自动打开页面。
- stop-main迁入后台：全局busy/pending门禁、校验已存main/本机3002/UIN；先写session suspended锁再发原生一次。失败/超时保留暂停锁，worker重启和普通自动connect不会偷偷恢复；无自动重试。明确disconnect只断OneBot不杀QQ，确认Native Stop后断连接/清owner配置/恢复alarm。对原生停止后的session提交失败仍报未确认，不假成功。页面保存、切账号与后台失败回滚还须集中核对，跨页草稿不是全局事务。
- 切号改为后台单个replace请求，不再本页disconnect+延时重连。View启动轮询仅观察，不重复断开共享连接；删除View打开及切main时隐式调用旧双账号原生启动脚本。显式启动按钮仍是历史Native启动入口，双账号与残留清理风险尚未重新治理，不宣称已实现安全单main启动或全部后台控制统一。
- ui:check、后台/CLI语法、diff通过，generated重建；未重载扩展或浏览器、读真实配置/Token/消息/session、连接QQ/启停进程/发送撤回、部署原生宿主、断言/E2E/提交推送。已加载旧页面/worker不会因磁盘构建自动切换，旧页面可能仍持有旧socket，实机切换必须经许可集中关闭/刷新QQ承载页，不能混跑后称唯一已验收。
- 下一步先核对账号切换失败的前台回滚/设置重连与多页面竞争、pagehide恢复等，再在用户许可后重载并仅验证状态与关闭页面后仍连接；真正发送/停止单独确认。QQ整体任务维持in_progress。

## QQ / NapCat 页面恢复与切号边界（最新增量，仍待实机验收）

- 用户再次确认是无头QQ + NapCat，经OneBot WS接入，不是网页QQ。扩展owner只持有NapCat通道；断WS不等于退出QQ进程。保留显式本机启动入口，不更换后端、不改NapCat配置或登录方式；旧双账号启动脚本风险仍待治理。
- owner-transport增加pagehide/pageshow persisted生命周期代次：返回缓存页只读恢复原已启用的页面订阅，旧状态/事件/控制回调不能覆盖新生命周期或重复安排轮询；排队但未提交控制过期拒绝，已提交不重放。pagehide清页面状态、不发disconnect/Native命令；普通隐藏与返回缓存页不是一回事。
- 切号改为await后台接受目标配置后再持久化当前选择/更换会话展示；失败保留原界面/文字槽并提示后台可能已变化，不反向自动切回。等待前后比对本地配置快照，变化则不覆盖；此检查不是跨页面原子事务。单页切号门禁与卸载计数覆盖等待，切同账号仅显式连接不清展示。后台接受配置不代表NapCat握手/QQ登录成功。
- 显式连接按钮改为单次replace，不再disconnect后无条件connect。通道控制失败清页面可信状态，等只读状态更新，不将旧connected当成功。联系人/历史自动读取按connectionVersion去重，缓存截断/其他账号等提示不再被“已连接”吞掉；不同连接控制仍可触发一次刷新。
- 配置保存当前账号时await通道断开后才保存；失败留草稿且不自动连接。保存全程本页pending与configSaving/inert防重复提交、切编辑目标和等待期草稿被覆盖；不承诺断开与localStorage写入事务，断开后保存失败可能保持断开。没有全局设置锁；同ID不同节点的跨页绑定仍需下一轮治理。
- QQ标题与说明明确NapCat；删除写死“默认端口3001”、已过期“常驻未接入”及QQ收藏下载回退承诺。实际端口由各账号NapCat配置决定，不修改实际端口。
- npm run check（类型+全部构建）、生成后台语法与diff通过；无断言/E2E。未真实连接NapCat、读取Token/聊天/实际配置、启停无头QQ、发送撤回/写真实设置或表情、重载浏览器/宿主部署/提交。此为源码修复，不宣称浏览器缓存恢复、多页切号或常驻验收成功。
- 下一步：同ID不同节点的页面与后台配置绑定/多页设置竞争，及旧双账号启动入口；随后经许可集中重载验证只读状态与页面关闭后的NapCat连接。实际启动/停止与发送单独授权。整体QQ任务继续in_progress。

## NapCat 多页面连接配置绑定（最新增量，未运行验收）

- 内部RPC升至v2；v1收到明确拒绝，不回退旧通道。新增只读bind：比较规范化账号ID、WS地址、Token、UIN、自动重连偏好，匹配才返回随机bindingId，不返回节点或凭据。发送/读取邮箱/disconnect/stop-main均由后台同时核对账号、epoch与bindingId；同名main但不同节点的旧页面不能仅靠刷新status就操作新连接。bindingId是配置关联标识，不是独立鉴权，原sender来源检查保留。
- 页面connected还要求当前内存配置匹配绑定、epoch有效；页面恢复或worker/socket代次改变后只读重绑，不重连/启动QQ。已确认不匹配在该epoch+本地配置内记忆，继续只读status但不每2秒重复发送配置；控制超时、生命周期改变和配置变化拒绝旧结果。配置比较key含Token但仅内存使用、不输出/新建磁盘记录/导出。显式连接前额外比对已保存配置，拒绝旧页面用过时配置连接。
- bindingId随owner session保存，worker恢复保持现行消息流；旧session缺标识时先写补标识再恢复，旧无标识缓存提示截断、不猜归属。显式换连接配置生成新标识；接收事件标记流ID，邮箱和页面游标按流隔离。既有已持久化账号历史未改命名空间/未清空，仍不承诺同ID换真人账号的历史自动分库；切到新流不补发上一流的未消费缓存，须手动历史同步。缓存不是完整离线消息存储。
- 恢复alarm遇到全局busy跳过，避免在连接控制/停止等待中另行触发重连。bind不启停或发送OneBot操作，status不返回binding或凭据；已取得旧标识的请求会被新epoch/标识拒绝，不自动重发。
- 只读源码核对Native QqStart与Broker /qq/start-main：仍调用历史launch-headless-qq.ps1；Native还会按双端口判断并顺带拉起Broker，创建脚本进程即回started，不证明NapCat就绪。此次未改原生EXE/清单/外部启动脚本/运行中Broker，不称安全单main启动已完成。
- npm run check（类型+全构建）、生成后台语法及diff通过；generated重建。未断言/E2E、浏览器重载/真实NapCat连接/读实际配置Token或消息/设置写入、QQ启停/发送撤回/原生部署/提交推送。
- 部署验收仍需经许可协调重载所有QQ承载页与扩展；新旧v1/v2不得混跑后宣称可用。整体QQ任务维持in_progress：下一步治理显式无头QQ启动的单账号范围/就绪判定，并集中验收跨页绑定与关闭页面后保持；跨页设置存储不是全局事务。

## 无头 QQ 单主账号启动协议准备（最新：仅源码，未接入/部署）

- 新增native-host/qq-main-start.ps1，默认Check，显式Start才创建一个NapCatWinBootMain进程。新增qq-main-start-native.cs与qq-main-launch.example.json；公共样例仅空qqExe/napcatHome，不写个人路径/UIN或Token。实际qq-main-launch.local.json尚未创建，现有*.local.*规则忽略它，后续部署需用户许可配置。
- helper仅固定main/3002，UIN按数字白名单由调用方传入；本机路径仅读同目录专用local文件，不从页面传任意执行路径，不执行旧启动脚本、不读NapCat账号/Token配置。检查固定磁盘安装文件和既有loadNapCat.js精确结构，不改写共享bootstrap/qqnt.json或启停副账号/Broker。
- 已监听时只调用现行qq-main-stop.ps1的Check复用根QQ身份/UIN/当前用户会话/3001隔离验证，绝不调用Stop。未监听时按Windows argv精确扫描QQ根与NapCat启动器：目标已存在或未知参数形态拒绝，不把没监听视为死锁、不杀残留。检查仅快照，不与外部启动器原子互斥。
- 与停止helper共用Local\\LogicWeaver.QqMainStop.<SID>命名mutex，涵盖同用户同会话的新helper操作；不锁旧脚本/外部工具。Start在spawn前用CreateNew建立LocalAppData/LogicWeaver/qq-main-launch-pending.json不确定性标记（仅nonce/状态/时间、无UIN/Token）。等待3002最多约30秒，再做身份检查；只有本次创建且nonce相符的标记可在验证后删除。失败/超时保留标记，不重试、不结束新进程、不自动清理旧标记；须后续人工核对恢复。
- 低层CreateProcessW使用STARTUPINFOEX句柄白名单，仅继承NUL标准流，避免NapCat输出混入Native Messaging/错误日志或继承宿主管道；子进程单独环境载入NAPCAT路径，不污染调用进程环境。CREATE_NO_WINDOW、隐藏窗口只是请求，QQ本体是否有异常界面仍待实机。
- Native新增qq-main-start-check/qq-start-main，UIN校验、固定helper、90秒等待、限长/协议scope/port/ready字段验证；超时不杀helper或重试。协议ready永远false：listener-identity-verified只是账号监听身份，不证明OneBot鉴权/get_login_info或QQ登录；launched只报告本次CreateProcess成功返回。
- 重要边界：本轮未修改既有QqStart/qq-start和Broker旧双账号入口、页面startMainBackend路由或owner请求协议。新入口尚未被页面调用，已安装v2宿主不支持新命令，不能声称按钮已经安全单账号化或直接部署后全部可用。下一步接后台统一busy/配置绑定/不确定锁与OneBot登录就绪判定，替换当前按钮并禁用宽范围回退，再单独授权部署。
- PowerShell AST无语法错误；启动侧car C#编译临时DLL、Native Host+CodexBridge编译临时EXE均通过；只在TEMP输出，未运行二进制/helper（包括Check）。diff检查通过。不运行断言/E2E；无真实QQ配置/Token/进程快照读取、启动停止/发消息/真实local配置与标记写入、扩展重载、已安装EXE/manifest/注册表修改、提交推送。只对旧启动脚本进行脱敏源码核对，没有执行它。
- 整体QQ任务保持in_progress。保留无头QQ+NapCat形态；下一步完成后台/按钮接入后，经许可部署并先做只读Check，真实启动与停止另行确认。

## 单主账号启动接后台与登录就绪（最新源码，未部署/实机）

- QQ startMainBackend改走owner-transport/backend owner，页面不再Native Messaging或HTTP Broker启动。新增start-main/verify-main RPC，必须当前epoch、main/回环3002/有效UIN；已有owner须完整配置+bindingId匹配。全局busy/pending挡并发切号、发请求与停止，页面pending门禁覆盖等待，隐藏仅失效反馈不重发/取消已提交启动。
- 先调用qq-main-start-check，只读预检失败（含旧宿主不支持）不发Start、不修改启动暂停意图。已确认监听身份则不重复启动；允许启动快照才写chrome.storage.session的launchUncertain+suspended锁后单次qq-start-main。原生未知结果不回退、不自动重试、不杀新进程；worker恢复保持锁，连接/切号/断开/停止也不能用常规按钮清启动不确定性。
- Native监听确认后只做一次有界NapCat就绪流程：重新建立本次目标WS，最多15秒握手，get_login_info/get_status各7秒，QQ号精确一致且online/good均true才报告ready。读取失败/账号不符/代次变化保留暂停并断开浏览器通道，不停止无头QQ。loginVerified仅当前socket代次内有效、不持久化成功状态；普通connected仍只表示通道连接。核对期间不缓存未确认身份的推送，不承诺完整离线消息。
- verify-main按钮只调用Native Check、不调用Start/Stop，随后可重新建WS并执行两项只读OneBot查询/更新session状态，因此不是完全无副作用的“纯读浏览器状态”。若Check确认启动资格（无监听/目标进程/launcher/待核对磁盘标记）返回not-started、不自动启动；若监听身份和登录检查通过才解除浏览器启动锁。磁盘旧pending标记不会被自动清理；启动超时后遗留标记仍可能需要单独人工核对，不能称自动恢复全部实现。
- 页面删除18秒轮询和“WS打开就启动成功”推断，所有显式启动入口仅main显示；新增核对按钮与常显安全状态文案，侧栏允许换行，无模态遮罩/模糊。请求等待不因Hide重置busy；没有浏览器开机登录/系统自启或自动运行本机脚本。
- Native源码旧QqStart直接拒绝，删除双端口检查/拉Broker/调用旧脚本主体；background旧qqStart拒绝；Broker /qq/start-main返回409，不spawn。移除无消费者QQ_HOME/homedir/LwCliPort。旧qq-stop拒绝及新仅主QQ停止保持。运行中的旧Broker/已安装v2EXE/已加载旧页面未变，不能声称现网旧入口已全部禁用。
- 时间上限：原生Check前端25秒、Start95秒（宿主90秒），完整页面RPC180秒；任何超时不杀helper、不重发写入。worker存活与真实窗口/登陆行为尚未验收，不保证长调用不被系统回收；session锁用于未知结果保护。
- npm run check（vue-tsc+全构建）、生成后台/CLI语法、Native+CodexBridge临时EXE编译、diff通过；未运行断言/E2E/新EXE或helper，包括未执行Check。未读真实QQ配置/Token/消息/进程快照、启动/停止/发送/保存设置，未创建真实local路径文件或pending标记、修改已安装EXE/manifest/注册表/重载浏览器与Broker/提交推送。
- **下一步需明确授权部署**：新按钮依赖新版宿主与qq-main-launch.local.json（仅QQ.exe/NapCat目录）且尚未部署，不应现在尝试旧宿主回退。建议并排EXE保留旧版本、更新固定manifest、先独立只读qq-main-start-check；不使用会停宿主的install.ps1。之后再经许可协调重载浏览器/后台，真实启动、登录查询和停止分别限定范围。整体QQ任务继续in_progress，实机常驻/跨页/新启动仍未验收。

## qq-main-v3 已授权部署与只读检查（最新实际状态）

- 用户在结构化确认中选择“部署并只读检查”：保留旧版、设置本机QQ/NapCat路径并更新清单，仅检查，不启动停止/发消息/重载浏览器。此次已实际部署，不再按上一轮“未部署”描述。
- 核对Edge/Chrome现有注册均指向仓库固定com.logicweaver.arkpets.json；并排编译native-host/ArkPetsNativeHost.qq-main-v3.exe，创建被*.local.*忽略的qq-main-launch.local.json（仅两个本机安装路径、无UIN/Token），原子替换固定manifest的path，备份为com.logicweaver.arkpets.pre-qq-main-v3.json。v2/v1/原EXE与旧备份保留，未改注册表/运行install.ps1/停止旧宿主/Broker/浏览器。路径从旧脚本AST的唯一字面量赋值抽取，不执行旧脚本。
- 仅执行qq-main-start.ps1 -Action Check；UIN来自旧脚本AST中唯一3002调用的账号元信息，在内存传参、未输出。返回ok:true、protocol:qq-main-start-v1、state:listener-identity-verified、scope:main、port:3002、launched:false、ready:false，耗时11.68秒。检查前后均无qq-main-launch-pending.json。
- 此结果验证现有3002监听对应根QQ身份、账号参数与3001隔离快照，覆盖新helper复用Stop helper的只读Check及命名mutex重入；没有运行Start/Stop、低层CreateProcess、OneBot登录查询或消息发送，不是“冷启动成功/QQ登录就绪”证明。已有监听分支未覆盖无监听时的完整启动资格/真实启动路径；浏览器保存UIN/Token与现有脚本账号是否一致也未读取核对。
- 新宿主主程序启动会附带StartEventListener/MobileDeviceWatcher。为保持此次只读检查边界，没有运行整个Native EXE做帧协议请求；仅编译部署EXE、执行独立Check helper。浏览器Native Messaging往返、新RPC界面、关闭页面常驻及跨页行为仍未验收，不能将helper成功推广为整条链路通过。
- 清单使后续新Native调用选择v3；已运行旧宿主/Broker/已加载页面不会自动替换，旧运行时宽范围入口仍可能存在。无浏览器/扩展重载、QQ启停/消息/Token或聊天读取、真实启动标记写入、断言/E2E、提交推送。部署时本机路径文件和宿主manifest是明确获准的写入，不称“完全没有修改本机”。
- 下一步需另行许可协调重载扩展/承载页并只核对连接（会建立NapCat WS，前端既有逻辑可能加载联系人/历史）；若只要不读聊天，应先添加/使用限定状态验收路径。实际启动或停止仍单独确认。本轮授权范围已经完成，QQ整体迁移与实机验收继续in_progress。

## QQ 已读后会话位置稳定（最新用户反馈与修复）

- 用户反馈当前QQ打开和显示正常；这是当前可见页面的人工反馈，不推定已加载最新v3前端/完整常驻与启停链路验收通过。
- 用户要求点开带红点群聊后清除未读，但会话不要因此下移。定位src/qq/qq.store.ts的qqFilteredSessions按未读/免打扰分层排序，selectSession清unreadCount触发降级。
- 已去掉未读数/免打扰的排序权重，保留置顶优先、特别关注优先及同层最近消息时间降序。红点清除与已读持久化保持，不伪造未读来固定位置；好友与群会话都适用。新消息/补齐更新消息时间、主动置顶或星标仍可改变位置，不是永久冻结整个列表。
- npm run check与diff通过，generated同步；无断言/E2E、QQ网络/读凭据聊天/发送/启停/存储数据写入或浏览器重载。只修改排序源码及产物，未改用户收藏或聊天历史。
- 请用户保存未发送草稿后刷新承载QQ的插件页面，点开带红点会话，确认徽标清除但位置保持。未擅自刷新页面；新代码尚未由用户人工验收。后续再验收关闭承载页后的NapCat常驻、新Native链路；真实启动/停止仍需逐项许可，不能因用户说目前正常就自动启停。

## 旧代码清理记录

- 桌面 B站 UID 表单及 `src/bilibili/settings.ts`：收藏夹通过 `getUserNav()` 获取登录账号，没有读取 UID，填写无作用，故删除；全局 OptionsService 同时去掉该专属字段读取，手机/同步仍保留各自消费者。
- CLI 第二个 `bili` 与第二个 `eval` 分支：前面的同命令分支均执行后 return，后面的代码不可达，故删除；保留原来的实际分派行为。
- 没有删除用户本地存储、缓存目录、手机代码或云同步数据。后续按真实消费者清理，不按文件年代批量删。

## 分拆约定和后续顺序

1. B站视图、状态与电台核心已归入 `src/bilibili/`；`bilibili.html` 已不加载经典 B站脚本，播放器/字幕/缓存由 TS 模块管理。回归优先查左侧选夹、分页、电台、缓存及独立页。
2. B站收藏夹与图片测评组件将 scoped CSS 分到同目录 `.css`；`<style scoped src="...">` 保留原选择器作用域，不要在全局样式里重复粘贴。
3. 巨型原生脚本提纯与物理归仓成果（2026-09）：
   - `src/services/bilibili.service.ts`（B站收藏夹双头怪胎彻底归仓）：建立了纯 TypeScript 强类型 `BilibiliFavoritesTreeManager` 树拓扑管理器与 `BilibiliService` 视频及收藏夹 CRUD 服务（支持自建、合集、稍后再看、我的追番多维路由、650ms 频率保护写队列与 Cookie CSRF 自动提取）；`bili-favorites-store.ts` 升级为真正的单一事实来源，全面接管收藏夹树展开/折叠、排序移动、分页检索、批量管理与删除撤销；`newtab-bilibili-organizer.js`（由 1,904 行裁撤至 339 行，净减 1,565 行）与 `newtab-bilibili-tools.js`（净减 494 行）累计物理清除了 **2,059 行陈年老代码与废弃 DOM 逻辑**！
   - `src/utils/kinetic-drag.ts`（动力学物理拖拽引擎物理归仓）：建立了现代纯 TypeScript 2D 动力学物理拖拽与惯性碰撞排序引擎，包含 16px 迟滞死区（Hysteresis Deadzone）数学防抖算法、FLIP 弹性重排、基于 rAF 的视口边缘自动滚动及生命周期管理，彻底剥离并委托了 `newtab-launchers.js` 中的 2D 碰撞与重排计算；
   - `src/utils/markdown-ast.ts`（Markdown/MathML/双链 AST 编译引擎物理归仓）：建立了现代纯 TypeScript 自研 LaTeX 到 MathML Core 递归下降分析器与全语法树解析器，完整承载行内/块级 Markdown 解析、表格、任务列表、Callout 块、参考文献脚注、Obsidian Wiki 双链（`[[WikiLink]]`）、嵌入语法（`![[Image]]`）与标签语义提取；`obsidian.js` 内部 600+ 行原生嵌套语法解析器与 180+ 行原生确认/输入模态对话框全部连根拔起并彻底委托！
   - `music.js`（网易云音乐与播放器逻辑物理归仓）：建立了现代纯 TypeScript 强类型服务 [`src/services/netease.service.ts`](../src/services/netease.service.ts) 与 [`src/services/music.service.ts`](../src/services/music.service.ts)，将扫码登录（生成/轮询）、Cookie 自动嗅探（Cookies API & 标签页直读）、用户资料解析、歌单/榜单、歌曲全网搜索、无损音源提取与歌词同步全面物理搬迁至纯 TS 服务层；`music.js` 中将近 1,000 行原生网络请求与废弃 DOM 拼接彻底连根拔起并物理删除（净减 928 行），`window.LogicWeaverMusicPlayer` 全量委托至现代服务类，保留音频底层调度与 Topbar 3D 信息立方体；
   - `newtab-discovery.js`（搜索建议与发现页逻辑物理归仓）：重构搜索建议管道为发布式架构（`publishSearchSuggestions`），彻底连根拔起并裁撤了 B站、GitHub、网易云音乐、网页与书签近千行原生 DOM 手动拼接逻辑，全量委托由 [`src/search/SearchBox.vue`](../src/search/SearchBox.vue) 声明式 `v-for` 响应式驱动；AI Hot 资讯与大模型排行榜、AA 定价与模型雷达全量桥接至 `AihotFeed.vue` 和 `PricingRadar.vue`，彻底终结原生脚本与 Vue 虚拟 DOM 争抢控制权的混乱状态；净减 444 行代码，语法检查与类型检查 0 错误；
   - `newtab-launchers.js`（启动器交互与壁纸服务物理归仓）：退役原生 AI HOT 资讯与媒体卡片 DOM 生成（`createAiHotLauncherCard`、`loadAiHotLauncherNews` 等 220+ 行），全面交由 [`src/launchers/LauncherAiHotCard.vue`](../src/launchers/LauncherAiHotCard.vue) 组件驱动；退役原生图标选择器网格渲染，交由 [`src/launcher/LauncherDialogs.vue`](../src/launcher/LauncherDialogs.vue) 响应式驱动；壁纸解压、格式检测与 WebPack 构建全量委托给纯 TS 服务 [`src/services/wallpaper.service.ts`](../src/services/wallpaper.service.ts)；工作区顶栏课表日程与手机互联短信/通知全面接入 Vue 响应式状态；净减 314 行代码，自检与打包 100% 通过；
   - `obsidian.js`（知识库与编辑器引擎彻底物理归仓）：建立了现代纯 TypeScript 强类型服务 [`src/services/obsidian.service.ts`](../src/services/obsidian.service.ts) 与集中状态协调器 [`src/obsidian/workspace-controller.ts`](../src/obsidian/workspace-controller.ts)，全面接管 File System Access API 根目录挂载持久化、递归多级目录扫描、笔记增删改读、AI Hot / B站字幕 / AI 知识点三大外部导入引擎、双链与反向链接拓扑提取以及关键词统计；原本 **5,931 行** 的原生陈年巨兽脚本彻底瘦身为仅 85 行的极简轻量门面，累计净裁撤物理删除 **5,846 行** 历史原生废弃代码！所有笔记编辑与目录树全面由 Vue 响应式 Store 与纯 TS 服务层驱动！
4. 修改兼容入口时同步更新 `newtab.html` / `bilibili.html`、`tests/architecture.test.mjs`、本索引；验证 `node --check`（经典脚本）、`npm run ui:check` 和真实扩展交互。不要清理现有未提交修改或把登录态测试写成已验证。
