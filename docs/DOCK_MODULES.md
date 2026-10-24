# Dock 内置模块注册（历史迁移台账）

> **本文件记录旧轮次，不是当前注册清单。** 当前来源是 `src/modules/builtins.ts`，现有 6 个卡片与 6 个浮窗；QQ、独立频道、旧监控/工作流已不能按下文恢复，其他仍有源码的模块也不代表已登记。现行导航见 [CURRENT_STATE.md](CURRENT_STATE.md)，界面/安全要求见 [AGENTS.md](../AGENTS.md)。下文所有数量、路径、下一步及部署状态均属于原时点。

## 历史实施记录（下文“当前/本轮/最新”均指当时）

当前共有12个内置窗口接入注册协议：QQ、同步备份、频道订阅、监控、工作流、表情包、ArkPets设置、音乐、壁纸、Todoist、Obsidian、任务日历。日历showInDock:false作为辅助窗口，Dock仍保留原11个模块图标。登记接入不等于生命周期和交互全部验收；不改主页/独立标签页导航、Dock顺序、图标或持久化设置键。

**日历最新实施**：统一宿主唯一挂载、WM/命令入口接通，窗口读Abort/版本与拖动监听配对，写入期间拒绝Quit/Reload但允许Hide；保留共享服务/月份/Google/侧栏/timer。旧layout/UI feature/mounted项删除。全构建通过，未运行浏览器/真实任务验收；详见 [CALENDAR_MODULE_BOUNDARIES.md](CALENDAR_MODULE_BOUNDARIES.md)。下一步模型价格卡片生命周期。

**前轮主线记录**：用户暂缓验收，继续源码清理。本轮已移除intro的QQ init、Dock的QQ service/store直接导入与首页隐藏旧n8n；注册协议提供可选badgeCount/canOpen，WM open在改变焦点/transition前守卫，QQ停止中拒绝打开。徽标只读取轻量数值，不为它加载聊天数据；首次加载QQ领域前显示零，不代表后台没有未读。QQ通知/手机入口经领域navigation异步加载、迟到聚焦失效。加载错误面板只提供Reload/Hide，不以普通关闭触发beforeQuit。Hide/Reload/首次连接策略与持久键不改，无浏览器/QQ操作。源码全构建通过，日历/globals/监控别名及全屏卡片仍待迁移。最新实施记录见 [MODULE_ARCHITECTURE_REVIEW.md](MODULE_ARCHITECTURE_REVIEW.md)，优先于后文历史“下一步”。

## 所有权与入口

| 层 | 文件 | 边界 |
| --- | --- | --- |
| 协议与注册表 | `src/modules/registry.ts` | schemaVersion=1、ID、显示信息、挂载root、懒加载View、设置键名、能力说明、生命周期hook；不读取设置值 |
| 内置目录 | `src/modules/builtins.ts` | 编译进扩展的可信模块，启动时登记；将metadata合入旧Dock列表 |
| 通用宿主 | `src/modules/DockModuleHost.vue` | 首次显示后请求挂载；隐藏保活；按mounted/key真正拆建Vue实例，显示加载错误与手动重试入口 |
| 同步模块定义 | `src/sync/module.ts` | Dock名称/位置/图标、原root ID、设置键、懒加载入口与生命周期hook |
| 频道模块定义/状态 | `src/channels/module.ts`、`module-state.ts`、`settings-keys.ts` | 单一频道View入口、visible/写入计数与键名；登记不导入业务service或读凭据 |
| 频道动作与业务 | `src/channels/runtime.ts`、`src/services/channel.service.ts` | View挂载装订动作监听，隐藏取消资讯请求，卸载解除监听与重置内存；没有新增轮询 |
| 监控模块与读请求暂停 | `src/monitor/module.ts`、`module-state.ts`、`settings-keys.ts` | 轻量visible/写入计数、已挂载子页pause回调；注册不读取节点/凭据 |
| 监控子页 | `MonitorCard.vue`、`NativeAlistExplorer.vue`、`MonitorSettingsPanel.vue` | 首次进入云盘挂载保活；目录/直链/公开页面HEAD读请求取消、iframe移除；写入不伪装成可撤销任务 |
| 工作流快照模块 | `src/workflow/module.ts`、`module-state.ts`、View/store/data | metadata不读快照；View懒加载内置数据，内存排版/查看复制，无实时任务引擎与持久化设置 |
| 表情包定义与实例 | `src/stickers/module.ts`、`module-state.ts`、`settings-keys.ts`、StickerBoard | 第五个模块，Dock本地controller/service，其他页与QQ保留各自共享数据服务；metadata不读目录 |
| 表情库领域服务 | `src/services/stickers.service.ts` | 目录/文件读取版本与协作取消、显式授权/保存删除、作用域动作订阅、图片URL清理；数据init不绑定DOM |
| 同步生命周期状态 | `src/sync/module-state.ts` | 仅visible/busy，不放Token、密码、草稿或备份数据 |
| 同步UI/设置/传输 | `src/sync/SyncWorkspaceDialog.vue`、`settings.ts`、`src/services/{webdav,sync}.service.ts` | 原草稿、凭据持久化和手动确认传输；注册层不自动执行它们 |
| 宿主适配器 | `src/dock/dock-lifecycle.store.ts`、`src/core/window-manager.store.ts` | 运行指示、挂载/渲染key、置顶/隐藏、退出重载门禁及后续操作使旧重载失效 |

`capabilities` 只是说明，不授予/隔离浏览器权限。当前没有外部JSON加载、用户模块安装、热注册、启用开关、第三方代码执行、依赖解析或安全沙箱。注册在宿主构建实例前完成；不要把静态注册表当成可运行任意插件的市场。

## 生命周期语义

- **打开**：在当前主页视图中显示并请求首次挂载；不退出当前全屏卡片。独立页面仍按原规则回主页，不在原独立页伪造一个已运行实例。
- **隐藏/最小化/窗口关闭**：保留Vue实例及草稿。同步取消未确认动作，不取消已发传输；频道取消前台资讯加载和设置连通性测试，保留列表/筛选/抽屉/草稿，不自动刷新。已发设置与已读写入继续完成。监控隐藏/切页/标签隐藏会取消前台目录/直链/Cal.com检测并移除预览，保留已访问云盘View与草稿；已请求的目录重开不自动重试。
- **退出**：模块自身允许卸载时，隐藏、熄灭当前页运行指示、撤销挂载请求，再等Vue更新。不会清空已保存配置、取消远端任务、停止Native Host或卸载已下载的JS模块。
- **重载**：允许卸载时，先隐藏并实际卸载Vue实例，等下一次Vue更新，再递增key、重建并显示。丢弃未保存草稿，只重新读取本机设置，不重放测试/上传/恢复。
- **门禁**：同步窗口保存/测试/上传恢复进行中，或频道设置/已读记录写入（包含队列）、监控设置/预约/AList节点、授权保存或登录进行中，`canUnmount` 为false。退出/重载返回`ok:false`，仍可隐藏；频道纯读取可取消后退出。门禁只覆盖本页模块跟踪的操作，不覆盖其他页面、后台worker或CLI直接调用服务的任务。
- **竞态**：窗口管理器的每次已注册模块打开/隐藏会更新操作序号。等待Vue更新的旧重载不能覆盖随后发生的隐藏、退出或重新打开。仅当前页面内排序，不是跨页面事务。
- **失败**：View加载失败显示非模态错误块，允许手动重载/退出，隐藏也隐藏该块；不自动重试传输。注册窗口以getter身份注销，释放旧实例闭包与冻结计时器，避免老实例删除新实例的登记。

`running`/`mounted` 表示本页的保活与挂载请求，不保证异步组件已加载或DOM已完成渲染。`visible` 来自模块自己的可见状态，不是独立浏览器可视验收。HTTP成功、窗口隐藏和Vue卸载都不能证明服务端任务取消或完成。

## 迁移台账

| Dock项 | 当前所有者 | 本轮状态 |
| --- | --- | --- |
| 同步备份 | `sync/module.ts` + 注册层/宿主 | 首个已接入试点；UI/传输待人工验收 |
| 频道订阅 | `channels/module.ts` + runtime/service + 注册宿主 | 第二个已接入试点；只有选择平台/手动刷新才读资讯，交互待验收 |
| 监控 | `monitor/module.ts` + 子页View/settings + 注册宿主 | 第三个已接入试点，前台读取与写入分离；无真实服务/浏览器验收 |
| 工作流 | `workflow/module.ts` + 快照View/store + 注册宿主 | 第四个接入；只有内存排版/脚本查看复制，无联网任务或写入门禁 |
| 表情包 | `stickers/module.ts` + 实例化Board/service | 第五个接入，退出不销毁同页QQ单例，存取/授权与QQ交互未实际验收 |
| ArkPets 设置面板 | `pets/module.ts` + PetOptionsApp/ArkPetsDialog | 第六个接入，面板读/交互独立管理，不接管页面引擎或 Native Host |
| 音乐窗口 | `music/module.ts` + 实例workspace-data + 共享播放器 | 第七个接入，退出继续首页播放，浏览/扫码调度归本实例，实际播放与登录待验收 |
| 壁纸库 | `wallpaper/module.ts` + 实例Workspace + 当前Renderer | 第八个接入，退出保留当前壁纸，独立URL/预览/读写门禁，实际连续性待验收 |
| Todoist | `todoist/module.ts` + session/可见读 + 共享领域服务 | 第九个接入，退出保留首页限时任务和独立日历；任务实际读写仍待验收 |
| QQ | `qq/module.ts` + 注册宿主 + `background/qq-owner.ts` | 第十一个接入；v3原生宿主已部署、helper只读身份检查通过，浏览器链路/常驻/启停未验收；总入口直接init与宿主耦合仍待清理 |
| Obsidian | `obsidian/module.ts` + Workspace/草稿/共享service | 第十个接入，未保存/文件操作拒绝Quit/Reload；实际读写待验收 |
| B站、GitHub、AI HOT、YouTube、模型价格 | 全屏卡片/独立页面导航 | 本轮不迁为浮窗模块，不取消独立页 |

sync/channels/monitor/workflow/stickers/arkpets/music/wallpaper/todoist/obsidian/qq的旧固定挂载/元数据条目已按迁移记录去重；QQ的宿主专属行为与总入口init仍有遗留。此前十个模块的硬编码Dock/WindowManager默认条目、ToolModal可见状态、AppOverlays专用挂载/loader、生命周期默认mounted键都已移除。频道另移除主页常驻隐藏的重复ChannelsFeed、对应旧UI feature登记、全局bridge.init；只由模块View装订动作监听。原窗口/卡片/root ID、位置键、凭据/订阅/缓存/已读持久化键保留，不删用户数据。

## 频道请求与写入边界

- runtime使用epoch拦截隐藏/卸载后才完成的service动态import；服务为每轮资讯加载提供AbortController与版本号。切平台/刷新/隐藏/卸载取消旧组；响应体与请求头都受父signal+浏览器超时约束。RSSHub取消不继续公开网页回退，普通失败的既有公开回退保留。
- 隐藏的设置面板连同Teleport一起隐藏，保留未保存草稿，停止定位ResizeObserver/scroll/resize监听；显示后重新定位。关闭/卸载设置或隐藏整个频道取消连通性测试等待；这不等于服务端未收到请求。
- 退出清掉动作监听、资讯/状态/抽屉/筛选/已读集合的本页内存，动态import代码可仍缓存，不删除Chrome/localStorage缓存或后台订阅。宿主卸载也清可见/挂载请求，不能撤销已提交的写入/远端任务。
- 设置保存/增删成功会使旧资讯任务失效，但不自动刷新或删缓存。15分钟平台缓存策略保留，配置签名/跨账号隔离不是本轮完成项；保存后请显式刷新。
- 已读操作在本页串行，每次写前读取最新集合，失败不吞掉；设置/已读写入计数包含排队动作。不是跨页/跨存储事务；已提交的cache/local storage写入无法撤销，取消后只保证旧资讯不回写当前UI，不保证撤回已发缓存写入。
- 页面没有订阅推送/SSE或新增轮询，不把一个动作监听称成网络流。后台`social-sync`、Gmail同步等仍有自己的生命周期，本轮不停止它们。
- 未新增B站消息、Discord/Slack完整资讯获取实现，公开默认频道不变；设置连通性和资讯功能是不同验收范围，不因生命周期接管宣称每个平台均可用。

## 监控真实能力与资源范围

- 删除主页常驻隐藏的重复MonitorCard、旧UI feature/loader、Overlay专用挂载、ToolModal状态和默认mounted项。保留monitor/窗口/root/卡片ID、原位置/图标、设置键和所有用户数据。alist/calcom打开别名直接设monitor mode再打开，不再调用未定义全局函数的60ms计时器；别名不是独立注册实例。
- 原AstrBot监控页已按用户要求撤出UI；遗留AstrbotMonitor.vue和唯一对应的subscribe/EventSource/保活超时代码无入口，已删除而非重新加回。CLI `monitor`仍独立调用快照诊断；保留service/网关/已部署后端，600ms读取重试等待可Abort清计时器，不执行真实诊断。
- 全部服务检测/自动轮询/n8n检查与打开/RSSHub检查/备份/救援动作没有接收者，旧dispatch空总线与调用删除，相应按钮禁用。系统/n8n页明确未接入，部署矩阵标历史说明，备份初值不再伪称在线。不是修好了实时探针或n8n管理功能。
- AList首次进入才挂载，按既有行为尝试一次目录读取；View保活。目录/直链有父signal及版本保护，隐藏/切页/卸载同步取消，响应体也受期限约束；已请求的目录（包括失败/取消）重开不自动重试，需手动刷新。配置失效清旧列表与授权输入，其他页变更时仍保留安全校验；metadata读取用单独序号避免旧节点重新就绪。
- Cal.com纯手动HEAD，读取配置阶段也可使任务失效，Abort+版本禁止旧响应/错误污染新窗口。预览只在手动点击、预约页且可见时挂载，离开/隐藏/卸载移除，不自动恢复。iframe里已经发出的预约/登录属于网站行为，移除不能保证撤销。
- 节点/预约保存、AList登录与Token绑定计入写入门禁，隐藏/切页不撤销已发操作；Vue卸载前只保障本页Quit/Reload门禁，关闭整个页面不可撤回已发持久化/RPC。登录完成不自动刷新目录；不保存/输出密码或复制Token到新存储。
- 设置Teleport随窗口/浏览器可见性隐藏并暂停定位监听，隐藏保留草稿；退出清Vue与共享监控内存及storage/visibility监听、复制反馈计时器，持久化节点/授权/预约不删。只取消前台读取，不撤回已提交的剪贴板写入、打开的独立标签/下载。
- 顶栏SystemStatus的VPS探针和手机事件是独立所有者，既有15秒任务不随monitor隐藏停止，本轮不改SystemService或后台/原生进程。共享vpsUrl新值仍需刷新扩展应用加载，不宣称保存已切换实时探针。

## 工作流快照与交互范围

- workflow当前是静态快照查看器；data.ts内的脚本和请求/执行语句仅为字符串，用Vue文本展示，不导入执行、eval或提交。没有实时读取VPS/n8n、运行/持久化接口，settingsKeys为空且不添加虚假busy/凭据设置。看见启用标记不代表真实定时任务就绪。
- 删除旧Overlay loader/mount、ToolModal visible、store.isOpen与无消费者open/close/toggle、默认mounted和Dock/WindowManager重复条目。无主页重复卡片可删。ID/root/位置/图标/顺序不变；workflow先登记，monitor才可在其前插入，保留原Dock位置。
- Hide保留tab/节点与脚本选择/缩放平移/内存坐标，但结束当前拖动、取消复制反馈timer、使过期回调失效；标签隐藏也暂停交互。鼠标全局move/up/blur监听只在拖动期间存在，mouseup/失去焦点/切工作流/隐藏/卸载解除，切tab卸载子View也清理。
- Quit/Reload丢弃本次内存排版并深拷贝初始快照，防止浅数组副本让拖动永久污染内置种子。JS/data模块仍可缓存，不保证释放所有编译代码。没有运行任务，因此允许卸载；不能把剪贴板提交称为工作流写入，已提交剪贴板写入无法撤销。
- 脚本复制只复制快照，不执行；等待期间禁止重复点击，隐藏/切脚本/卸载后不显示旧成功/失败反馈。没有复制运行环境中的Token。空脚本列表有占位，失败提示非模态且不输出源码/错误对象。
- 源码快照发现明文API密钥、邮件应用密码及个人邮箱字段，改为requiredEnv读取GEMINI_API_KEY/GMAIL_USER/GMAIL_PASS，TARGET_EMAIL可回退GMAIL_USER；仅显示字符串中的引用，不是Viewer加载env。没新增存储字段或模块密钥输入。重建后的工作流chunk与data.ts中这四项已发现值匹配数为0，不是全仓/历史审计。
- 建议用户轮换已暴露凭据。旧Git提交、备份/副本、缓存或VPS原脚本未清理，不宣称凭据已吊销；不连接账号、修改远端部署或重写Git历史。其他历史个人路径/预设仍待治理。

## 表情包范围与共享服务

- 移除主页常驻隐藏StickerBoard、旧feature/loader、Overlay专用挂载、ToolModal/default mounted/Dock/WindowManager重复项，以及无调用者toggleUtilityCard和toggle-stickers事件。注册顺序先stickers、再workflow、再monitor，保留原Dock顺序和stickers/root/窗口/卡片ID。
- createStickerBoardController提供实例状态；Dock用new StickersService(本地controller, canRead, 写入计数, 120)，不复用QQ共享单例。Globals仍指共享数据兼容对象，不是Dock看板控制器。独立stickers.html/sticker-sidepanel.html、Popup/SidePanel收藏投递、QQ、设置页保留消费者与原IDB数据库/handles/root及偏好键。
- init仅数据读取与具名storage监听，QQ init不订阅看板动作或查DOM。挂载Board才attachBoard，卸载对称解绑；旧scanCurrentPage/bindDomEvents没有消费者，删除DOM拼接/匿名监听，文件change/drop交Vue。独立页仍由原父Vue扫描网页，不新增主页网页注入。
- 目录元数据每组16个原生读取，缩略图每组8个，版本/signal在各await后与循环检查；隐藏/退出停止后续工作与过期回写，不保证撤销已发getFile/迭代器操作。首次打开查询既有授权，不自动弹权限；重开不重新扫描，可按缓存列表补齐缺失缩略图，取消的初次扫描需手动刷新。
- 真正Board首批120图、显式“再显示120”；切目录释放非当前展示URL，退出释放本实例URL。共享QQ大列表保留旧缓存上界，未接管QQ自身生命周期/优化/复制反馈；不声称全项目无后台加载或测得提速。
- 用户授权/更换目录、创建/删除、上传/拖入、选目录/展开偏好及已提交QQ发送计入本页门禁，忙碌时不自动排队。Hide可继续已提交写入/授权返回，Quit/Reload拒绝；关闭整页无法保证撤销或完整完成原生操作。外页/QQ原生收藏保存不在此计数内，不替它们加“已取消”状态。
- saveRootHandle等待IDB事务complete，不以put.success伪报持久化完成。新增非敏感stickerRootHandleRevision通知同名根目录更换，原偏好/句柄键不删。IDB/Chrome存储非原子跨库事务，通知或偏好失败时可能句柄已保存，需重读确认；其他页并发仍不保证事务一致性。usableRoot每次重读已存句柄，过期读取不恢复销毁后的实例。
- 保存写流失败尝试abort，不吞保存错误/自动重试；批量前几张可能已完成，失败不伪报整批成功或回滚。URL保存HTTP有15秒响应/响应体期限；图片大小校验仍在取得Blob后，不宣称网络下载按25MB流式截断。文件写入无应用强制中断期限，不撤回已创建文件。
- 复制成功只在剪贴板承诺返回且仍为当前可见操作后反馈；准备可中止/忽略，已提交剪贴板写入不能撤回。QQ准备父Abort+epoch、FileReader中止，准备中隐藏/退出不晚发；会话/登录账号变化拒绝自动发送。发出后计数门禁等待，不把sendComposite的void返回说成送达；需在会话核对。跨模块账号/节点/回复和停后端并非事务；独立页无QQ宿主时不伪报打开了窗口。
- 大图为标题栏可拖的本地非模态浮窗、无全屏遮罩/模糊；菜单无遮罩，外部点击仅关闭菜单并继续原点击。隐藏关闭菜单/预览/拖动、复制/通知timer，表单草稿保留；退出解除storage/visibility/键盘/定位与预览拖动监听，清本实例句柄/tree/cache，不删除用户文件或持久数据。
- 用户表示凭据暂不处理；不再展开轮换/历史清理，也不恢复上轮已去掉的明文。未操作真实收藏目录/授权/图片/QQ或浏览器。

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

## CLI与验收

`node scripts/lw-cli.mjs dock modules` 只返回注册元数据（ID、版本、root、能力和设置键名），不调用loader或读取凭据值。但它是page命令，连接缺失时仍可能唤醒主页，遵守 `CLI_CONTROL.md` 的许可边界。

`dock list/open/hide/reload/quit sync|channels|monitor|workflow|stickers|arkpets|music|wallpaper|todoist|obsidian` 保留语法。obsidian dirty或文件/目录操作中拒绝Quit/Reload，Hide不保存或丢稿。todoist quit保留首页timer与独立日历；写入中拒绝quit/reload，读取可取消。wallpaper quit不应用纯色或清当前壁纸。music quit只退出窗口，继续首页播放。`nav arkpets/pet`改走WM注册入口，不启停桌宠。忙碌时quit/reload明确返回失败，右键菜单不再把拒绝当成“已退出”；返回状态也不能替代DOM/实际业务验收。

建议人工检查（本轮未执行，不运行断言或无头E2E）：
1. 首次点击同步：窗口打开，不触发上传/恢复；其余Dock顺序与主页/独立页导航不变。
2. 改草稿→隐藏→再打开：草稿保留；保存后dirty同步更新，保存不传输。
3. 确认条→隐藏→再打开：不保留旧确认；取消不发请求。
4. 无传输时重载：新实例重新读配置，不重放操作；快速重载/退出不重新复活窗口。
5. 真实测试/传输只有用户另行授权后进行：忙碌时拒绝Quit/Reload，隐藏不中断或误报取消；不自动重试。

频道人工检查还需覆盖：首次打开不请求、切平台/手动刷新、隐藏中止旧响应而保留草稿、重新显示不自动刷新、Teleport面板无残留、写入时拒绝卸载、退出重开只有一个动作监听。真实写入/连通测试仍需另行许可，本轮未执行。

监控人工清单：首次打开系统页不读云盘；首次进云盘一次请求，隐藏/切页取消慢目录及直链且不晚开标签；重显目录不自动重试；跨页节点变化旧回应无效；Cal.com HEAD取消无晚回写、预览退出无残留；保存/登录期间拒绝Quit/Reload，Hide不伪报撤销；新实例重读配置但不自动登录；顶栏探针独立。以上均未实际执行。

工作流人工清单：首次打开不联网；移动节点/平移缩放后隐藏再开保留；隐藏中mousemove不继续改变节点；切tab/工作流/失焦终止拖动；退出/重载恢复初始坐标；复制等待切tab/隐藏无旧反馈、不重复复制，缺权限显示失败。未实际执行剪贴板或浏览器操作。

表情包人工清单：首次无授权不弹选择器；授权后刷新、120图分页；隐藏慢扫描无新缩略图/旧状态回写，重开缓存补图不扫库；Root同名更换跨页失效；保存/删除/授权/发送拒绝卸载、Hide不误报撤销；复制失败无假成功；预览拖动/隐藏无遮罩残留；退出只撤Dock URL而QQ仍能使用；独立页、侧栏拖入和QQ收藏回归另需验收。真实存取/删除/授权/发消息逐项许可，本轮均未执行。

ArkPets人工清单：打开面板无CDN/引擎/混合开关写入；目录读取隐藏后无迟到回写/新CDN请求、重开不自动重试；搜索/草稿保留；命令代码加载/提交中拒绝退出而可隐藏；提交后退出面板不停止页面桌宠；存储失败不假保存/运行；选择面板无全屏遮罩/模糊，换人消息匹配、旧加载不覆盖新选择；独立页/引擎菜单入口回归。实际启停/偏好写入/模型加载须单独许可，本轮均未操作。

源码及产物类型/构建检查通过不等于以上交互已通过。QQ的stop-all/stop-main范围差异、其他工具窗口回调与实际资源清理、跨页并发、模块管理开关和外部模块协议仍待单独治理。
