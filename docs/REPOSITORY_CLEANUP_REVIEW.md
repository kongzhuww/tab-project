# 仓库整理初筛（历史审查记录）

> 下文规模、旧路径与各轮“下一步/通过”仅记录当时证据，不是当前模块清单或运行验收。QQ、频道、旧监控/工作流等历史文件可能已删除；现行入口先看 [CURRENT_STATE.md](CURRENT_STATE.md)，不据此恢复文件或重跑旧测试。

范围：静态文件规模、入口导入与部分大文件职责检查；不是全仓逐行审计、死代码证明或性能测量。未执行断言/E2E、浏览器操作或真实数据修改。

## 本轮定点修复

TopInfoCube 的右键菜单使用 clientX/clientY，但挂在具有 perspective:900px 的 .ms-top-player 内（src/styles/newtab.css），fixed 的包含块因此不是视口。菜单改为 Teleport 到 body，并复用 core/useContextMenu 的实际尺寸避边、可见期间监听与 Esc/外部点击关闭。不再按写死的 210x280 估算。Windows npm run check、generated/background.js 语法、git diff --check 均退出 0；实际位置待人工刷新验收。

## 规模快照

src 下 ts/vue/css/js 共 452 文件、约 138330 行（修复前快照，含空行注释）。最大三份文件均为 CSS，不是四千行 Vue 组件：

| 文件 | 行数 | 建议 |
| --- | ---: | --- |
| src/styles/newtab.css | 5107 | 按顶栏、首页、磁贴等所有者迁移，先确认选择器消费者 |
| src/styles/newtab-components.css | 4339 | 核对已迁移模块的重复样式及覆盖次序 |
| src/styles/newtab-workspaces.css | 4280 | 向各工作区归属，保留独立页加载路径 |
| src/bilibili/BiliFavorites.css | 3617 | 已属业务模块；按子组件分区，非首要性能问题 |
| src/mascot/engine/MascotEngine.ts | 3232 | 区分资源缓存、行为调度、交互与渲染；先测性能再改帧循环 |
| src/styles/newtab-windows.css | 3194 | 核对共享窗口与模块专属规则 |
| src/qq/qq-dialog.css | 2763 | 随组件边界迁移，暂缓 QQ 功能改动 |
| src/qq/QqDialog.vue | 2587 | 消息展示、文件/转发、账户、菜单、表情选择职责可分离；不可破坏发送/身份/退出门禁 |
| src/services/bilibili-channel.service.ts | 2256 | 分组、关注流、推荐、订阅与预览管理混合，按业务拆服务 |
| src/todoist/TodoistTaskList.vue | 1760 | 展示与拖动交互分离，保留写互斥与列表会话保护 |

src/assets/styles.css 仍集中导入多份 newtab 样式。拆文件不等于减小首屏负载，必须同时检查构建 CSS 装载契约及独立入口。旧立方体 traffic/timer/github/schedule 选择器仍存在于全局样式，属于下一轮引用核查候选，不能直接批量删除所有同名业务样式。

src 外也抽查了根目录、backend、native-host、scripts、mobile 的脚本规模：根 background.js 2213 行、mobile/mobile.js 1015 行、scripts/lw-cli.mjs 618 行。需先分清源码、桥接入口和生成文件，再决定拆分。未逐行审计 Android、第三方资源、vendor、生成产物和依赖。

## 第一轮执行记录

已完成 SDK 搜索限时与取消、稳定优先级、迟到结果保护、注册身份注销和菜单来源区分；PluginContext dispose 后拒绝新增挂载。搜索仅在全部范围调用插件，内置结果先显示。细节与限制见 src/sdk/README.md。

全仓非生成源码引用查询未发现退役立方体类名消费者；删除 newtab.css 的 80 条独立旧规则、收窄 1 条共享可见性规则，并删除 newtab-components.css 的 2 条旧响应式规则。保留 ms-cube-divider、音乐、工作区和 todoist-timer-toast。没有清理用户存储、历史 chunk 或其他模块。

Windows npm run check、node --check generated/background.js、git diff --check 退出 0；未运行断言/E2E或真实浏览器交互，不宣称性能实测提升。后续服务拆分见下方第二轮记录。

## 第二轮：B站服务按职责拆分

从 src/services/bilibili-channel.service.ts 拆出：
- src/bilibili/channel-types.ts：11 个频道数据契约，依赖仅为 type import。
- src/bilibili/channel-format.ts：5 个格式化/文本处理函数，保持算法不变，无网络/存储/DOM。
- src/bilibili/recommendations.ts：推荐分页状态、请求与快照转换。由原服务创建唯一实例，API/快照发布/滚动通过依赖传入；构造不发请求、不绑定监听。

原服务从 2257 行（本轮读取计数）降至 1980 行；新增文件分别为 121、64、128 行。目标为分清职责，不宣称代码总体减少或运行加速。原类型/函数继续重导出；loadRecommendations/publishRecommendationSnapshot 保留委托入口，rcmdState 始终引用领域实例同一对象，旧分页动作无需改写。

推荐参数、最多三轮补齐、热门回退、显示转换、错误与滚动时机保持原样。openRecommendationView 仍在入口层暂停嵌入播放后发起加载。搜索框的 8 条热门推荐/90 秒缓存是另一交互，不合并。关注流、字幕订阅、收藏写入、播放器、存储键和用户数据不动。

第二轮边界（当时）：推荐请求取消/会话隔离与错误语义未改；第三轮已单独处理推荐流，见下文。第二轮本身仅为结构拆分。

Windows npm run check、node --check generated/background.js、git diff --check 均退出 0。未运行断言/E2E、真实 B站请求、账号或浏览器操作。人工待验收：进入个性推荐、刷新、翻页后原显示和滚动是否正常；不要为验收修改真实收藏。

## 第三轮：个性推荐读取生命周期

- BilibiliWorkspace 复用 useCardActivity，以“卡片/独立页可见且当前 mode 为 recommendations”为推荐活动条件；同步监听，离开推荐/回首页/标签隐藏/pagehide/卸载时取消。监听由组件及共享 composable 清理，返回可见不自动重发。
- 推荐领域保存当前 AbortController 身份，刷新替换旧读取，旧 catch/finally 不能清新请求 loading、写视频或滚动。signal 经原 bilibiliService.api 的 RequestInit 传到 fetch 和响应体读取。
- 整轮推荐读取 15 秒超时（包含最多三轮补齐和热门回退），取消不会启动热门回退。真正失败/异常格式/超时提示错误，不再静默变空列表；正常空数组仍为暂无推荐。热门成功回退继续保留。
- 页码/freshIdx/视频先在局部准备，成功后共同提交；失败/取消不提前推进页码。翻页忙时拒绝、不排队，按钮同步禁用；换一批采用后发替换前发。加载取消保留已提交状态，不修改收藏、账号或播放状态。
- 响应快照不再写 mode；只有明确进入推荐的入口切换 mode。进入时先发布自己的旧推荐快照，避免复用关注流共享 specialVideos。原 openRecommendationView 的暂停嵌入播放行为保留。
- 范围仅个性推荐主列表；搜索框热门推荐、关注流、订阅流及收藏夹的其他迟到响应尚未统一治理，不宣称全 B站生命周期完成。请求取消不保证服务器尚未处理请求，无自动重试或恢复读取。

Windows npm run check、node --check generated/background.js、git diff --check 退出 0；没有真实网络/账号操作、浏览器刷新或断言/E2E。人工验收：进入推荐→换一批/翻页；读取中回收藏夹/首页；读取中切浏览器标签后返回，界面不被旧推荐抢回，需换一批才重新读取。失败保留内部已提交列表，现有界面优先显示错误提示，并非保证错误时旧卡片仍可见。

## 第四轮：正在关注读取与分页保护

- Workspace 以 useCardActivity + following mode 同步启停读取会话；切到其他模式、回首页、隐藏标签/pagehide/卸载即取消，返回不自动重发。每轮最多 30 秒，包含分组聚合和响应体读取。
- 本轮请求使用独立 AbortController；完成/错误/finally 核对身份。导航后的快照不写 mode、不滚动，不抢回已离开的界面。分页忙时拒绝，按钮禁用；分组/UP选择和刷新替换旧请求。
- 分组选择、成员、页码、offsetHistory/nextOffset/updateBaseline、视频列表在局部草稿准备，成功一起提交；失败/取消保留上一份已提交状态。仅接受相邻有效页，无 nextOffset 不向前翻全部关注流。
- 查看动态不再调用带隐式保存的 initBiliUpGroups：改为严格只读分组/关注缓存/取消关注列表，本地过滤，不写存储；Chrome错误/JSON解析失败明确报错，存储读取等待可取消。分组管理入口保持原样。
- 分组聚合的 UP 请求传独立 signal，不复用或撤销预览/订阅的共享 pending，也不污染其共享 UP 缓存；媒体库到空间动态的回退保留，取消不发回退，失败不再冒充正常空结果。并发每批 6 个，部分失败整轮不提交/不缓存。
- 聚合缓存键包含账号 MID、分组、成员筛选及当前成员集合；成功提交时才更新缓存。当前分组被同页管理器改动时拒绝迟到提交，其他入口更新的关注列表不被旧快照覆盖；不是跨页/跨账号配置事务。
- 分组树遍历增加已访问集合，避免循环 parentId 导致无限遍历。音乐/收藏写入/关注与取关 API、分组管理保存、独立 UP 预览、字幕订阅不改。

Windows npm run check、生成后台语法与 git diff --check 为本轮门禁；未执行断言/E2E、真实请求/账号或浏览器操作。待人工：全部关注翻页、切分组/UP、加载中返回收藏夹/首页/隐藏标签，返回后手动刷新；失败时旧内部状态保留，现有错误区域优先显示提示。订阅流和搜索框推荐仍待单独治理。

## 第五轮：字幕订阅读取会话与频道提交

- Workspace 沿用 useCardActivity 同步启停 subscription 会话，隐藏/离开/卸载中止本窗口的读取，返回不自动重发；切频道/刷新替换旧请求，60 秒整轮截止。UI 发布、错误和 finally 均核对当前请求身份，异步完成不写 organizer.mode。
- loadSubVideoData 收敛为私有纯读取入口，固定频道和条数，去掉重复的按日期字幕解析分支；成功才提交频道、条数、editions/内存缓存。继续获取有 busy 门禁，失败保留已提交选择；错误标明目标频道，可重新选择该频道重试。
- fetchVideoSubtitleDetails / getWbiKeys 新增可选 signal，传至 view、WBI nav、player 和字幕文件 fetch/body；订阅路径严查响应格式，失败不伪装无字幕、不归档不完整结果。真正返回空字幕轨道仍允许简介展示。播放器/电台等既有调用不传 signal，不由订阅会话取消。
- 读取不再自动改写自定义频道名称。添加订阅的显式保存入口保留；迟到保存结束只在原页面交互代次仍有效时发起新频道读取，不抢回离开的页面。添加弹窗与频道配置写入完整事务尚未治理。
- 10 分钟内存缓存命中不续期、不重新归档；历史没有字幕的占位稿会在重新联网读取时再次尝试。归档仍使用原键，本页串行、写前重读按频道合并并检查错误，旧会话未发写则跳过；已发存储写无法撤回，不宣称跨页锁/账号隔离/事务或回读确认。存储回调永久不返回时，后续归档队列不能安全越过，需刷新页面。
- 顶栏保持在原 shell 内，加载/错误时仍可选频道、刷新、返回；只隐藏播放器/稿件区域，与此前加载时卸载播放器行为一致。播放器内部读取、字幕导出、收藏写入不在此轮范围。
- Windows npm run check 首次 120 秒构建超时；确认无残留构建进程后以更长超时重跑退出 0，node --check generated/background.js 与 git diff --check 均退出 0。未进行真实接口/存储/浏览器操作、断言或 E2E。
- 人工验收：进入字幕订阅，A→B→A快速切换；加载时返回收藏夹/首页或隐藏标签，返回后手动刷新；连续继续获取；无字幕视频与接口失败区分；刷新/继续获取后保留仍存在的选中视频。尚待用户验收。

## 第六轮：字幕读取与章节组稿职责拆分

- 用户反馈推荐、正在关注、字幕订阅三项手动检查“正常”。记录为上轮所列快速切换/离开返回/基本分页交互通过，不扩大为故障注入、跨页缓存事务或全部功能验收。
- 新增 src/bilibili/subscription-reader.ts（98行）：持有缓存裁剪、动态请求、逐视频字幕读取与按日期组稿。输入显式包含频道、缓存、条数、force、signal，以及只读归档回调；不直接持有 UI、服务实例状态或存储写权限。
- 新增 src/bilibili/subscription-chapters.ts（173行）：原样迁移官方章节、简介时间戳、停顿切分与自然段组装，纯数据计算，不读取存储/网络/播放器。
- services/bilibili-channel.service.ts 当前1843行，保留 extractChapters 的公开委托及 loadSubVideoData 的私有委托；界面提交、60秒超时/取消、归档写队列和原存储键仍归协调层。本轮不改排序/分段阈值、缓存有效期、章节正文及复制结果逻辑，不增加生命周期所有者。
- Windows npm run check、node --check generated/background.js、git diff --check 退出0；本轮未进行浏览器/真实账号/存储操作、断言/E2E。用户上一轮验收不冒充本轮重构后的实机验证。
- 后续建议：关注流请求与聚合也按同一方式独立；继续保留协调层对会话和写入的唯一所有权，避免一边拆文件一边改变已验收交互。

## 第七轮：正在关注读取与聚合拆分

- 用户倾向每轮拆1～2个职责明确的文件。本轮新增1个，不按行数硬拆，不同时改界面、数据协议或交互规则。
- src/bilibili/following-reader.ts（187行）：固定输入草稿，读取登录状态/本地分组，再执行全部关注动态分页或分组UP聚合；返回 feed/groups/followings 与待提交聚合缓存，不写共享状态、不保存分组、不发布界面。
- services/bilibili-channel.service.ts 从1843行降至1705行：保留活动会话、30秒截止、选择/分页准备、缓存实例、UP读取公共入口，以及唯一成功提交点。helper只获得只读依赖回调及当前会话check，检查点/错误文案、聚合并发6、90秒缓存与全部流最多4轮请求保持不变。
- helpers没有导入协调服务实例，避免循环依赖；缓存清除/提交仍由原服务负责。分组管理、独立UP预览、关注/取关、订阅、播放器和存储格式未改。
- Windows npm run check、node --check generated/background.js、git diff --check 均退出0。未运行断言/E2E、真实接口/账号/存储操作或浏览器重载。本轮只做结构整理，不宣称额外节能或实测提速；此前人工验收不扩大为本轮浏览器验证。
- 后续优先核对重复分组树遍历与纯快照组装边界；保留写操作和弹窗管理在原协调层，不急着整套重构。

## 第八轮：统一分组树纯计算

- 新增1个文件 src/bilibili/up-group-tree.ts（67行），只导入类型：collectBiliGroupMids 收集本组/子组去重成员；flattenBiliUpGroups 生成管理器层级展示副本。无存储/网络/UI依赖，不修改原树。
- 关注读取聚合、关注快照计数/成员、订阅添加器分组筛选共用成员收集；保留根优先、后面的兄弟分组先出栈、成员首次出现顺序、严格ID匹配及find的首条匹配语义。
- 管理器展开独立保留原先的父先子后/兄弟原顺序、字符串归一化与不可达节点平铺回退，不与成员聚合强行共用排序。没有修复或删除用户原始分组。
- 订阅添加器原成员收集没有visited，现在沿用统一helper的循环保护；正常树行为不改。服务由1705行降至1647行。
- 分组保存、删除和拖动分支未改；move-group 的旧祖先判断仍缺少循环链终止及自身目标保护，列为下一轮定点检查，不宣称所有树操作均已安全。
- npm run check、node --check generated/background.js、git diff --check 退出0。没有断言/E2E、真实分组读写或浏览器操作；此轮待人工查看分组顺序、成员数量、订阅添加器筛选与管理器缩进。

## 第九轮：分组移动关系校验与AGENTS指路

- up-group-tree.ts 新增纯 validateBiliGroupMove，服务move-group在任何parentId/splice/保存前调用；移除旧无visited祖先while。
- 只接受root/into/before/after；来源必须存在且ID唯一。拒绝自身目标、目标是来源后代、目标祖先循环、目标/祖先缺失或重复ID。后代旁边排序仍沿用旧拒绝语义，不在此轮放宽。
- root不遍历来源旧父链，保留将节点移回顶级解除异常关系的路径；不扫描/修复无关分支，不批量删用户数据。校验失败通过管理器现有error区域显示并返回，不修改内存、不保存。
- 正常移动后的重排与saveAndPublish保持原样；没有写入互斥、失败回滚、lastError/回读或跨页事务保证。这轮处理关系安全，不把旧存储写流程重写混进来。
- AGENTS.md顶部新增当前B站主线指路表，覆盖types/format、recommendations、following-reader、subscription-reader/chapters、up-group-tree、协调服务、View与底层API，列明确认过的交互范围、当前门禁与下一步。
- Windows npm run check、node --check generated/background.js、git diff --check 退出0；没有断言/E2E、真实拖动/分组写入/浏览器重载或账号操作。
- 人工验收待执行：正常同级before/after、into与拖回root；父组拖入/排到后代旁边应拒绝；自身拖放保持不动（View原有拦截仍在，服务额外校验）；无效操作后正常拖动应恢复。异常循环/缺失/重复ID的故障场景仅完成源码防护，勿为验收主动破坏真实存储。
- 下一步先验收本轮，再考虑分组保存旧乐观更新/错误处理专项，保持每轮1～2个明确职责文件的节奏。

## 第十轮：UP 投稿/关系拆分与分组保存错误加固

- 新增 `src/bilibili/up-relation.ts`（61行）：持有 `followBiliUp` 和 `unfollowBiliUp` 纯网络 API 请求，依赖 bili_jct 鉴权，处理 `relation/modify` 结果；不触碰弹窗、分组缓存或 UI。
- 新增 `src/bilibili/up-videos.ts`（142行）：持有 `fetchUpLatestVideos` 与 `clearUpRecentVideosCache`；优先投稿媒体库，备用降级为空间动态，统一维护 5 分钟短期内存缓存与未结请求复用。
- 协调服务 `services/bilibili-channel.service.ts` 从 1647 行降至 1492 行：保留向后兼容的公开方法委托，关注/取关取消时调用 `clearUpRecentVideosCache`。
- 加固底层 `storageSet`：不再以空的 resolve 吞掉 `chrome.runtime?.lastError` 或 localStorage 异常，严格在失败时 reject。
- 加固分组管理器 `saveAndPublish`：捕捉 `saveBiliUpGroups` 异常并通过 `controller.update({ error: ... })` 呈现错误，不再假成功。
- Windows npm run check、node --check generated/background.js、git diff --check 均退出0；未运行断言/E2E、真实接口/账号/存储操作或浏览器重载。
- 人工验收：UP 头像右键预览卡片、关注/取关按钮反馈、分组管理器保存错误展示。

## 第十一轮：分组管理器动作派发与默认收藏夹写入拆分

- 新增 `src/bilibili/up-group-manager-actions.ts`（228行）：接管 `LogicWeaverBiliUpGroupManager` 的 open、publish 与 8 个动作派发（close/refresh/create/rename/delete/move/toggle-member/preview-up），通过 `UpGroupManagerAdapter` 解耦，保持原错误显示与操作反馈。
- 新增 `src/bilibili/default-favorite.ts`（82行）：接管 `saveBiliVideoToDefaultFavorite`，处理缺 AID 解析、收集箱/收件箱/默认收藏夹匹配、写入与错误提示。
- 协调服务 `services/bilibili-channel.service.ts` 从 1492 行降至 1270 行（最初 2257 行），保留公开方法委托及向后兼容性。
- 维持既有保存互斥与错误反馈规则；Windows npm run check、node --check generated/background.js、git diff --check 退出0。
- 人工验收：打开关注分组管理器测试创建/重命名/删除/勾选成员；在搜索框或推荐卡片右键保存到默认收藏夹。

## 第十二轮：UP 卡片弹窗预览与本地缓存动作拆分

- 新增 `src/bilibili/up-preview.ts`（257行）：接管 `showCustomConfirmModal` 与 `showUpRecentVideosPreview`，负责视口边界计算、空间资料补全、近期视频拉取、取消关注二次确认以及同步维护本地关注缓存。
- 扩充 `src/bilibili/organizer-actions.ts`（70行）：接管 `openCachedView`，将本地已缓存视频的列表读取与原有播放、删除动作合并管理。
- 协调服务 `services/bilibili-channel.service.ts` 从 1270 行降至 1097 行（较最初 2257 行减半），保留对外委托接口。
- Windows npm run check、node --check generated/background.js、git diff --check 均退出0；未运行断言/E2E、真实接口/账号/存储操作或浏览器重载。
- 人工验收：UP 主头像悬停/右键预览卡片、弹窗内关注/取关二次确认；切换到“本地缓存”视图查看已缓存视频列表。

## 第十三轮：动作总线路由与嵌入式播放管理拆分

- 新增 `src/bilibili/embedded-playback.ts`（55行）：接管 `rememberEmbeddedPosition` 与 `suspendEmbeddedPlayback`，使用 `biliEmbeddedPlaybackPositionsV1` 存储键记录各视频播放进度，并在界面切换时统一暂停所有区域正在播放的音视频。
- 新增 `src/bilibili/channel-actions-router.ts`（217行）：解耦 `biliFavoritesController.onAction` 的大分支 switch 路由表，统一通过 `ChannelActionsTarget` 接口把事件清晰派发给推荐、关注、订阅、本地缓存与分组管理执行器。
- 协调服务 `services/bilibili-channel.service.ts` 降至 917 行（最初 2257 行，净减超 1340 行，保留对外兼容委托）。
- Windows npm run check、node --check generated/background.js、git diff --check 均退出0；未运行断言/E2E、真实接口/账号/存储操作或浏览器重载。
- 人工验收：快捷动作（换一批、换关注分组/UP主、打开缓存、字幕跳转与复制）是否响应正常；切换视图时原视频是否正常暂停。

## 第十四轮：AI 字幕订阅协调器独立封装

- 新增 `src/bilibili/subscription-service.ts`（425行）：封装 `BiliSubscriptionCoordinator` 类，独立管理 `subChannels`、`subState`、自定义订阅频道读写、动态视频加载会话（60秒截止/取消）、本页归档写入串行队列、字幕复制与画中画跳转。
- `services/bilibili-channel.service.ts` 从 917 行降至 630 行（最初 2257 行，累计净减超 1620 行，缩减超 72%），保留 `subChannels`、`subState` 与全部业务方法的兼容委托，外部调用零感无缝衔接。
- 保证嵌入播放暂停、分组 MIDs 收集与已关注 UP 列表通过接口注入，无循环依赖。
- Windows npm run check、node --check generated/background.js、git diff --check 均退出0；未运行断言/E2E、真实接口/账号/存储操作或浏览器重载。
- 人工验收：进入字幕订阅视图，切换频道，测试“+ UP主”添加新订阅源，点击台词跳转播放器。

## 第十五轮：正在关注流协调器独立封装与主服务门面化

- 新增 `src/bilibili/following-service.ts`（234行）：封装 `BiliFollowingCoordinator` 类，独立持有 `feedState`、30秒超时截止、请求取消/防迟到覆盖、分组聚合内存缓存以及界面快照发布。
- `services/bilibili-channel.service.ts` 从 630 行降至 471 行（最初 2257 行，累计净减超 1780 行，缩减近 80%），仅保留关注基础数据（`initBiliUpGroups`/`loadFollowedUps`/`saveBiliUpGroups`）和门面委托，结构极致扁平透明。
- 外部调用者对 `bilibiliChannelService.feedState`、`loadFollowing`、`publishFeedSnapshot` 等的访问无缝保持原有属性引用，实现 100% 向后兼容。
- Windows npm run check、node --check generated/background.js、git diff --check 均退出0；未运行断言/E2E、真实接口/账号/存储操作或浏览器重载。
- 人工验收：进入正在关注流，切换分组与 UP 主筛选，翻页，确认数据加载与快照发布正常。

## 第十六轮：GitHub 搜索模式交互改造（按键不耗频次、点击界面直出、回车网页直达）

- 改造 `src/services/search.service.ts` 中的 GitHub 搜索模式：
  1. **输入按键零 API 消耗**：输入关键词（如 `rea`）时仅本地检索已星标/已缓存仓库，不向 GitHub API 发送高频请求，杜绝字符级限流与卡顿。
  2. **点击条目在界面内直出**：点击首项「在 GitHub 搜索」时，读取右侧选中的规则（精确 / 模糊 / 标签 / 智能），调用 GitHub `/search/repositories` API，将在线仓库结果（全名、描述、Stars数、语言、头像）直接渲染呈现在下拉框中，就像网易云歌曲列表一样。
  3. **回车外部网页跳转**：仅在搜索框按下 Enter 回车键时，才在浏览器新标签页跳转到 `https://github.com/search?q=...` 官方搜索页。
  4. **空输入即刻展示星标项目**：在 GitHub 模式下点击空搜索框，立即读取并展示星标仓库列表推荐，与网易云最近听过交互一致。
- 联动右侧模式按钮：`gitHubService.searchRule` 规则与搜索语法映射（exact 严格限制在 name/description、topic 匹配标签、smart 展开同义词），下拉框标签实时同步指示当前规则。
- 补充 `.search-suggestion-badge.badge-github` 样式变量适配，保证明暗主题与纸面模式自然和谐。
- Windows npm run check、node --check generated/background.js、git diff --check 均退出0。
- 人工验收：切换到 GitHub 模式，空点搜索框展示星标；输入 `rea` 确认首项提示“点击在此搜索”；点击首项后加载出真实在线 GitHub 仓库列表并可点击访问；直接在输入框按 Enter 确认跳转网页版。

## 建议顺序

1. SDK 正确性优先：搜索 provider 超时/取消/迟到覆盖、优先级稳定性、注册句柄所有权、菜单目标来源；当前插件接口不是权限沙箱。不要先扩展更多公共接口。
2. CSS 小范围试点：从已退役立方体专属规则开始查引用，再移动一个模块样式，确认主题/独立页/构建加载后继续。禁止一键去重或全仓重排 CSS。
3. B站服务拆领域：维持原公共调用入口，逐项迁移推荐、关注、订阅、缓存与 UI 协作；检查各自取消/清理责任，不复制单例。
4. 大组件拆职责：Todoist、侧边栏等按实际交互边界迁移；QQ 按既有用户要求暂缓。每轮只拆一个领域。
5. 桌宠引擎专项：测量帧循环、图片缓存、后台页面活动后决定优化，不以行数论性能。

生成产物 generated、vendor、node_modules、资源包不作人工源码拆分或批量清理。历史 hashed chunk 可能被旧标签页引用。已有大量未提交改动，不自动格式化全仓、不覆盖其他改动、不直接清用户数据。

验收区分：本轮只构建验证菜单修改；整理路线是建议，未实施上述全仓重构。每轮保留原存储键/接口，完成类型和构建门禁后，再由用户做对应浏览器交互验收。
