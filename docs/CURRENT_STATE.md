# 当前源码导航与文档使用边界

> **tab-project-next 迁移说明**：本仓库从 2.3.0 当前代码创建全新历史，不带旧 Git 历史或个人截图。ArkPets、Neuro / Evil、Spine、角色素材、桌宠快捷栏和独立设置页已按用户要求删除；下文历史描述不代表它们仍存在。新仓库主入口和更新源指向 `kongzhuww/tab-project-next`。

> 这是开发阅读入口，不是运行验收报告。协作约束见 [AGENTS.md](../AGENTS.md)；页面/构建事实以 `manifest.json`、HTML、Vite 配置和当前源码为准。下面列的是本次静态核对结果，后续改动时需要同步更新。

## 1. 先读什么

1. `AGENTS.md`：用户约束、安全、界面要求及尚未实现的目标。
2. 本文：当前入口与容易混淆的历史方案。
3. 对应领域源码；`MODULE_INDEX.md` 的入口表辅助定位，长篇“最新/本轮/下一步”属于按时点追加的台账，不代表今天仍成立。
4. 历史文档仅解释演进。缺失的脚本/模块不能靠恢复旧文件来满足过时说明。

## 2. 运行入口

当前仅维护桌面 Chromium 扩展。独立 `android/`、`mobile/`、Capacitor 配置、准备脚本、移动端 npm 命令及 5 个 Capacitor 依赖已按用户要求删除；不再复制无人引用的 `generated/logicweaver-mobile.css`。浏览器窄屏响应式布局保留，旧敏感文件忽略规则保留，手机实机与旧隔离产物未操作。历史文档中的移动端说明不代表现行能力，不恢复旧代码。


| 功能 | 源码/入口 |
| --- | --- |
| 新标签页 | manifest 的 `newtab-bootstrap.html` → `newtab.html` → `generated/vue-ui.js` → `src/intro/main.ts` / `src/App.vue`；首页首帧主题当前为 HTML 内联初始化，不依赖已删除的根 `theme-init.js` |
| 侧边栏 | `sidepanel.html` → `src/sidepanel/index.ts` / `SidePanelApp.vue` → `generated/sidepanel-ui.js`；manifest 没有 `default_popup`，仓库没有 `popup.html` 或 `src/popup/PopupApp.vue` |
| 独立工作区 | `bilibili.html`、`github.html`、`aihot.html`、`pricing.html`、`youtube.html`；保留独立页，不为统一 SPA 而关闭或合并用户标签 |
| 独立工具 | `options.html`、`newtab-search.html`、`stickers.html`、`sticker-sidepanel.html`、`sync-bridge.html`；按 HTML 与 Vite 输入核对实际 bundle |
| 后台 | manifest 加载 `generated/background.js`，源文件 `src/background/index.ts`；根 `background.js` 同时作为构建输出保留，不应误当 manifest 当前目标 |
| 构建 | `package.json`、`vite.ui.config.ts`、`vite.sandbox.config.ts`、`vite.localizer.config.ts`；不要从历史测试文件推导允许执行的验证方式 |

`src/theme/theme-init.ts` 是部分入口使用的首绘脚本源码，不能据此声称所有页面都加载同一个根目录脚本。默认页面主题是 `light`，`rhinelab` 是独立启动动画选项。

## 最新默认行为与快捷键（源码已改，待人工验收）

- `shortcut-catalog.ts` 统一设置列表、默认键与派发可用性；设置按导航/组件分组，停用或未注册功能不出现、不触发，旧绑定不删除。× 保存空绑定以禁用，↺ 才恢复默认；录制统一Meta与物理键，Esc取消，固定键/重键提示，录制期间不触发原窗口/导航/命令面板快捷操作。
- Alt+E 主轮盘按组件启用状态过滤；Alt+Q 从商店中已注册且已启用的独立模块生成，不再列出任务架子、预约、云盘、监控等退役/未注册项。启用状态变化重绘，点击前再检查。
- 海狸聊天室已移出CORE，标为实验性、默认关闭；全部启用不自动开启实验组件，商店允许明确逐项开启。停用隐藏Dock/分享入口、停止后续同步和发送，保留配置/历史/凭据；已有显式启用偏好不强制清除，已提交POST不假称撤回。
- 工作台默认演示BV与视频焦点已移除：原占位BV与梯度下降标题不符，且隐藏的v-show组件仍创建iframe，导致首次进入出声。现在只有可见且本页主动点击的当前焦点视频才挂载iframe；切走或改变焦点取消播放意图。已有工作台条目和焦点记录保留，刷新不自动播放。

## 3. 当前注册模块不等于所有现存目录

`src/modules/builtins.ts` 登记卡片和浮窗定义，不能直接把注册数量当作 Dock 入口数量：

- 卡片：工作台、模型插件、YouTube、AI HOT、GitHub、B站。
- 浮窗：todoist、海狸聊天室、塞壬唱片、网易云，以及不在 Dock 展示的表情库辅助管理窗口。
- Multica 和笔记本已移除。表情包已从 Dock 和商店独立模块列表隐藏，但不删除源码和图库；聊天室“我的表情包”面板及其中“表情库”管理按钮保留。

实际显示还受商店、偏好与导航状态影响；登记不等于面向用户默认启用。YouTube 的封藏/开放仍遵守用户要求，不能凭注册存在就主动扩展。

QQ 与独立频道模块已经移除，不恢复 `src/qq/` 或 `src/channels/`。监控/工作流旧目录已不存在。同步、壁纸、ArkPets、日历仍可能有源码或其他入口，但**当前没有在 builtins 登记**；不能沿用旧文档的“17 个注册模块”“11 个 Dock 图标”等数字，也不要擅自重新注册。

## 4. 聊天室当前链路

### 自建指南与权限修复（本地合成接口已检查，未部署）

2026-10-24 已经用户明确授权，在 Windows Python 3.13 本机临时回环服务使用合成身份观察接口：普通成员管理请求403；两条长轮询等待期间目录读取约0.019秒、发送约0.037秒；等待中撤销/重发凭据返回401，归档房间/空间返回404；消息隔离和受限PNG保存/同步符合观察预期。临时进程已停止，未用真实凭据，未跑断言或无头E2E。浏览器由用户在独立配置中人工验收，真实双端、Linux部署、负载和防DoS检查未完成。


- `server/private-chat/server.py` 对成员、空间和房间的管理写请求统一校验服主权限；客户端同步收紧管理入口，但前端不替代服务端鉴权。
- 同步等待使用绑定全局数据库 RLock 的 Condition，等待期间释放该锁，醒后复核凭据和房间状态；成员凭据变更和目录变更会唤醒等待。
- 初始化与客户端仅允许 HTTPS 公网服务；HTTP 仅接受 localhost、127.0.0.1、[::1]。不自动改写旧配置、搬运凭据或修改线上端口。
- 默认端口统一为8788；已有依赖19828默认值的实例需在授权维护时显式设置CHAT_PORT或同步调整代理。
- `ChatPrivateSetup.vue` 提供与当前构建绑定的离线Markdown指南下载；来自服务端README的raw导入已加入隔离构建输入白名单。仓库源码链接仍需要访问权限。
- 部署、备份、恢复、权限及真实限制见 `server/private-chat/README.md`；不把标准库、健康检查或构建成功称为一键开服或完整安全验收。


- 入口：`src/chat/ChatDialog.vue`、`ChatPrivateSetup.vue`；传输：`private-chat-client.ts`；连接配置：`private-chat-config.ts`；服务：`server/private-chat/server.py`。
- 自托管 HTTP(S) 增量同步，公网部署应使用 HTTPS；不是默认 P2P、Cloudflare 信令或 WebSocket 中继。`privateEndpoint()` 返回的 `/ws?...` 字符串用于会话/历史分域，不代表建立 WebSocket。
- 非敏感 origin/父聊天室/UID 配置在 `lw_private_chat_v1`；邀请 Token 位于独立 IndexedDB 凭证库。`BEAVER-PRIVATE1:` 是编码后的凭据，不是“加密邀请”；聊天 ID 不是授权 Token，换 UID 后需要服主为新 ID 生成邀请。
- 服务器 SQLite 保存文字、分享卡片及新增的受限图片消息（Base64随鉴权消息，原字节最多1MiB，需升级服务端 server.py/image_policy.py 并返回 imageMessages=1 能力）；不提供公共图床、音视频文件上传或端到端加密。服务端落盘确认不等于对方已读。
- 聊天同步/待发协调已拆到 `private-chat-sync.ts` / `private-chat-outbox.ts`，类型/错误为叶模块，原client保留兼容、父认证、动作与边界装配。同步单轮复用读取会话且保持历史追赶语义，写入批次独立、不随切房撤回，批次中途失败仍等待已启动任务settle；无数据库或服务端变更。职责、保留范围和未验收项见 [CHAT_CLIENT_LAYERS.md](CHAT_CLIENT_LAYERS.md)。
- 同步页已由 `private-chat-sync-reader.ts` 先生成完整纯草稿，再持久消息/游标/回执，由 `private-chat-sync-projection.ts` current提交状态与通知；结构坏页不先推进游标，安全失效清发送能力，保留历史追赶来源与旧服务缺省规则。不是Vue多对象事务或副作用回滚；新边界、元数据预算和未验收项见 [CHAT_SYNC_PAGES.md](CHAT_SYNC_PAGES.md)。
- 凭据仓储/单次HTTP已拆到 `private-chat-credentials.ts` / `private-chat-http.ts`，无IO身份与等待为叶模块；原库版本/键/邀请与公开入口保留。请求限定目标origin，凭据/网络等待有预算，过期不迟到发请求，不自动重试或宣称写入撤回；详见 [CHAT_TRANSPORT_BOUNDARIES.md](CHAT_TRANSPORT_BOUNDARIES.md)。未使用真实凭据、联网、浏览器或部署验收。
- 聊天消息能力已集中到 `server/private-chat/protocol.json`，TS类型/校验和Python限制共用；鉴权同步协商后启用发送，旧服务显式兼容，非法新版声明禁止降级，待发不支持项保留暂停，文字/图片草稿不提前清空。只改源码，未部署/重启；后续配套文件及真实验收边界见 [CHAT_CAPABILITIES.md](CHAT_CAPABILITIES.md)。
- 聊天室图片预览统一接入全局浮层查看器（`src/sdk/images`）：聊天气泡中的图片与输入框待发送缩略图，点击均调用 `images.open` 唤起带平移/缩放的单例浮层，替代旧版 `window.open` 弹出浏览器原生空白标签页的行为，并以发送者昵称规范标题。
- **动态分享确实已接入源码**：`chat-activity.ts` 检测扩展内播放/工作区，客户端在 `shareActivity` 允许时随同步上传，服务器返回成员动态；当前缺省偏好为开启。不要再写“没有动态分享”或“默认关闭”。这不是读取所有浏览器标签或操作系统应用的全局监控，也未据此证明实时性/关闭效果已双端验收。
- 同一父聊天室范围的好友请求/回应与关系返回已接入 `/api/v1/friends/*`；这不等于跨服务器联邦好友、可信身份互认或全网联系人服务。
- `chat-history.ts` 保存消息与同步游标；`chat-delivery.ts` 保存待发状态；`ChatHistoryTools.vue` 提供分页、导出与保存失败重试。旧缓存恢复/导出专用入口已经移除，不凭旧文档重加。

一起听由 `together-listen-model.ts` 的纯状态投影与 `together-listen.store.ts` 的实时副作用协调分层。历史读取结束后静默恢复；首次网络分页追赶带 history 来源，去掉旧 600ms 重放与跨刷新自动加入。作用域/消息 ID/服务器顺序回执为本页有界保护，不承诺跨设备恰好一次；真实双端与音源行为仍需人工验收。

当前安全、会话及历史说明见 [CHAT_SECURITY.md](CHAT_SECURITY.md)、[CHAT_SESSION.md](CHAT_SESSION.md)、[CHAT_HISTORY.md](CHAT_HISTORY.md)。`CHAT_P2P*.md` 及旧 server 目录只作历史方案参考。

聊天链路已完成一轮源码收尾审查，未继续拆模块；仅补邀请过期激活、目录半提交及归档后过期导航三个入口边界。静态核对不等于真实验收；历史/回执等待、非当前私聊补发覆盖与特殊UID私聊编码仍有明确限制，见 [CHAT_ARCHITECTURE_CLOSEOUT.md](CHAT_ARCHITECTURE_CLOSEOUT.md)。建议暂停扩大重构，先正常使用或另行授权验收。

## 5. 表情包、账号与交互

- 设置窗口拖动已局部优化：几何只在开始读取，移动按帧合并translate3d、结束一次提交left/top，清理帧/指针捕获/监听，保持拖后fixed与双击回中。隐藏/失焦/关闭/卸载等均收尾；不修改共享SDK或其它窗口。拖动那轮未动图库；用户后续已确认精简图库设置而非删除图库能力，当前布局见下条。是否改善实际手感仍待用户刷新验收，不宣称已测帧率。

- 顶栏工作区整条及课表/热点/VPS/Phone Link专属代码链路已按用户确认删除：不再显示占位、不启动探针/短信轮询、不读取ClassIsland私有JSON、不导入或向Google批量同步课表。保留通用天气、Google/Todoist日历和已有云端事件、独立手机文件通知/复制（mobile-files.service.ts）、桌宠与监控快捷栏；顶栏由92px收紧为64px。后台固定phone-link路由与原生手机/联系人/通知库读取同时删除。用户另批准临时编译、核对并停止仓库默认宿主进程、替换EXE并校验hash；未改manifest/注册表、未运行安装器或主动重启浏览器/宿主。个人.local课表未读/未删，保持Git/干净打包排除。广泛<all_urls>等其它权限仍需另行全项目审查，不能把本次收尾称为绝对安全；真实视觉与手机文件能力待人工验收。

- 工作区移除验证：最终类型/普通构建/原生宿主编译/干净发布构建/差异及背景脚本语法均通过。隔离打包补上公开protocol.json构建输入，不复制服务器配置；定向清理未被128个当前输出引用的96个旧块。新干净目录dist-extension/v2.2.2-xmhelK/extension的退役链路标记与私有配置/密钥容器文件名检查均为0；新宿主读取短信的标记为0。Git全局忽略.env/.env.*、保留.env.example，个人课表仍忽略；这些检查不等于内容秘密/Git历史或全部权限审计。未上传新包、未覆盖旧发布目录，失败的首次隔离副本不是发布包。
- obsdian模块已按用户要求移除机械设备专用功能：菜单/插入动作、示例实验室、专用Markdown渲染、iframe主题监听、样式、模型页面/脚本及manifest资源公开项一并移除。保留笔记读写、草稿保护、图片、公式和双链；不迁移或删除用户已有笔记，旧专用围栏回归普通代码块。仅定向清理当前构建未引用的相关历史块；构建通过不等于真实Vault验收。
- obsdian文件夹标题现只显示末级名称，完整路径用于分组、悬停和文件操作；子库根目录与同名root文件夹不再靠同一分组哨兵区分。知识库右键菜单已按用户选择接入真实目录删除：通过SDK可拖动非模态窗口输入“永久删除<实际目录名>”（前缀后不加空格）确认，不再使用全局模态prompt；只阻止目标内未保存文件/指向目标的保存栏及实际待写，不再强制关闭所有文件标签或无关草稿；成功后只关闭目标内已保存标签，删除接受后的迟到编辑转成便签保留。挂载根需用户选择并核对直接父目录；失败可能部分删除，不自动重试。磁盘删除后才清理列表/收藏和根关联，本页门禁不等于跨标签/外部进程锁。本轮未执行真实删除或真实授权，仍须用可丢弃目录人工验收。
- 滚动立方体仅主界面保留：已删除跨大屏Teleport、真实DOM宿主注册表、各大屏占位及相关样式；AppTopBar通过active控制主界面可见性，保留实例/当前面，离开时关闭菜单/设置并暂停倒计时刷新。右键菜单到body的Teleport保留，Dock与大屏导航不变；已去掉为立方体保留的网格列。源码/生成文件引用核对和构建通过，真实界面待用户刷新确认。

- B站缓存与原本地图库设置现已合并为“文件夹与存储”分类（src/settings/StorageSettings.vue），按用途区分表情包图片文件夹与B站视频缓存目录。缓存页/表情包/聊天室入口直达相应子项，旧bili-cache/stickers调用别名仍归一兼容；独立 B站页复用同一窗口，右上角不再另设 B站设置浮层。目录句柄/历史目录关联见 `src/bilibili/cache-directory.ts`，缓存写入与本地播放见 `cache.service.ts`；不硬编码私人路径、不移动已有视频，源码接入不等于真实下载已验收。
- B站消息中心与私信图片/已读修复：私信中的图片附件（含 `url` 的 JSON）由 `message-panel-store.ts` 解析为 `[图片]` 摘要与独立缩略图卡片，点击调用 SDK `images.open` 放大预览，避免展示裸露 JSON 字符串；样式限定头像圆形规则，保障缩略图不变形。单条点击与“一键已读”通过 `ackPrivateSession` 调用 B站接口 `session_svr/v1/session_svr/update_ack`（携带 `bili_jct` CSRF）真实确认服务端会话已读，同时持久化 `BILI_LOCAL_KNOWN_KEY` 并在 `profileService` 同步未读数，彻底解决刷新后已读消息重新弹出的问题。构建检查通过，真实网络交互待人工验收。

- 开源合规与搜索/配置脱敏（最新）：
  - 主搜索框按用户要求移除“网页提炼”（`/extract` 与右键切换）和“AI 语义搜索”（`/ai`），仅保留 `/bm`（书签限定）与 `/sites`（常用网站限定），右侧按钮纯化为常用历史加载；
  - `manifest.json` 移除旧个人专属域名（含 CSP）、移除 n8n 5678 端口自动注入的内容脚本、移除 `externally_connectable` 中写死的私有扩展 ID；
  - `server/cloudflare-worker/wrangler.toml` 中的真实 D1 数据库 UUID 替换为通用占位符 `your-d1-database-id`；
  - `native-host/com.logicweaver.arkpets.json` 移除开发者的 D 盘绝对路径与本地测试扩展 ID，恢复为通用示例；
  - `src/multica/store.ts` 演示数据中的开发者 Windows 用户名及本地绝对路径完成脱敏替换；
  - **彻底移除 Native Host 与 Native Messaging**：删除整个 `native-host/` 源码及脚本目录，`manifest.json` 中移除 `nativeMessaging` 高危权限；移除后台及前端中所有关于纯净 Edge 启动、手机端文件监听传输、任务栏歌词、旧版 Codex/AI 桥接与原生 RPC 路由；扩展彻底升级为 100% 纯前端/纯浏览器插件架构，用户免编译、免注册表、解压即用。
  - **精简私有后端与废弃服务端资产**：物理删除 `n8n-workflows/`、`backend/`（原私有 VPS 后端）、`server/cloudflare-signaling/` 与 `server/chat/`，清理根目录下课表与 Gmail 遗留 `.local.json` 文件；`manifest.json` 的 `host_permissions` 剔除无用的 QQ 域名，服务端仅保留纯粹活跃的 `server/private-chat/` 与 `server/cloudflare-worker/`。
- 文件夹与存储还提供知识库的受保护管理入口：主页打开原obsdian文件栏，目录选择/更换仍在该模块完成，不绕过笔记/保存保护。独立页明确指引回新标签页，不另开标签。壁纸一次性文件夹导入等不当作持久目录设置搬动；文件/索引/句柄键和授权边界不迁移，真实跳转/定位及布局仍待人工验收。

- 原本地图库现为文件夹与存储内的表情包图片文件夹子项，布局已按确认精简：未选目录显示主要选择入口，关联后只显示文件夹短名、整库数量、更换与小刷新；只有读授权不足时出现重新授权。备份/恢复/旧隐藏兼容入口默认折叠在高级管理，去掉独立写权限按钮和处理函数，添加/删除原图仍按原路径申请权限与确认。纯展示字段从service发布，不按中文文案猜权限/解析数量，也不把子分类数量当总量；未知数量不伪报0。保留内置库及现有图片、索引、格式和安全检查，真实UI/授权仍待人工验收。
- 表情包入口、12 张分页、紧凑布局、固定返回卡片、空目录最小空间、右键及同级排序见 `AGENTS.md` 第 9 节。删除分类保留图片；目录模式的分类操作只改索引；明确导入写新文件。“删除图片”按用户最新要求，在逐张确认并取得写权限后真实删除磁盘原图，通常不进回收站；索引备份不能恢复原图。
- 图库分层已完成第二阶段：`directory-reader.ts`/`original-files.ts` 管磁盘读取与显式原图操作，`library-repository.ts` 管原有句柄与索引存取，`preview-resources.ts` 管每实例预览并发和URL回收；`StickersService` 保留兼容与界面/任务协调。未改UI、存储键或实际图库，真实验收边界见 [STICKER_ARCHITECTURE.md](STICKER_ARCHITECTURE.md)。
- 本地图库已接入 `src/stickers/library-index.ts`：原图留磁盘，虚拟分类/图片 UUID/隐藏标记保存在根句柄绑定的索引中；`folder-layout.ts` 仅用于旧展示分类的首次映射。新建分类不创建目录，删除分类保留原图；图片删除改为确认后删除真实文件，禁止递归删除目录。设置 → 文件夹与存储 → 表情包图片文件夹可选择/重授权目录、在折叠高级管理中导出/恢复分类索引，添加原图仍按需申请写权限；真实权限与旧数据映射仍待人工验收。
- 表情包模块与聊天室选择器共用 `StickersService` 当前源；旧内置库保留但不自动复制进磁盘图库。聊天室选择器已接入同图库图片发送，与文件选图/粘贴共用 chat-images.ts 的大小/格式/压缩规则；服务端不支持或本地入队失败保留待发预览，不假报发送成功。实际部署和双端发送须另行验收。边界、容量与备份匹配规则见 AGENTS.md 第9.4节。
- GitHub只读传输已统一为 `src/github/api-client.ts`：列表/详情/分析/AI前置README/设置连接检查/显式搜索/开源发现主源/Star状态读取共用；写入与第三方源隔离。原read-request为兼容适配，具体预算与未迁移边界见 [GITHUB_API_CLIENT.md](GITHUB_API_CLIENT.md)；图库分层见上方第二阶段。
- 第三阶段新增 `src/core/read-session.ts`：首批接入GitHub详情/只读分析/开源发现与图库目录/内置库，统一取消、整体等待预算、current检查和owner专属loading释放。图库跨模式移交不让旧finally清新loading；付费/文件/Star等写操作不套读取取消逻辑。实际范围与未迁移路径见 [READ_SESSIONS.md](READ_SESSIONS.md)，不代表全应用异步已统一或真实浏览器验收。
- github插件详情已改为用无服务依赖的 `src/github/account-settings.ts` 读取一次账号快照，README 等请求复用已配置鉴权，仅发固定 GitHub API；限额/权限/404/超时分开提示，账号改变会停止旧请求并等待重读。真实插件效果仍须用户刷新确认。
- todoist已按用户要求移除自定义主任务池/今日刷新：角色字段、名称猜测、标记配置与存储读写、专用设置文件/命令/桥接、徽章和CSS均已删除，旧规则不再进入普通同步备份/恢复。移除前没有每日任务复制调度器，旧自动生成文案并非现有能力。保留用户项目/分组/任务、账号和日历配置、今天视图及Todoist原生重复任务；日历撤销完成按真实当前视图重新读取，不再按池标记猜目标。已构建并定向清理当前输出未引用的旧块，未操作真实账号/远端任务，视觉仍待刷新验收。
- 大屏切换已修正工作台永久全屏类与display!important压过v-show的问题，并去掉共享全屏透明入场动画，避免切换时露出缓存工作台；缓存数据与Dock导航保留。todoist去掉优先级编辑、P1-P4徽标/颜色及旧处理代码，不重置云端priority；详情截止日期单独排列，云端标签改为左对齐单列纵向滚动。构建检查不代替视觉验收，仍待用户刷新确认。
- GitHub / todoist 使用 `src/core/AccountSetupGuide.vue`；GitHub Token 可选，todoist 需要 Token。读取配置失败和网络/认证错误不是未配置。
- Multica 刷新只旋转内部图标。常用网站与书签的拖动/菜单有共享组件，变更共享部分须回归两者，不能只检查一处。

## 性能热点优化（源码已接入，待浏览器验收）

- 第二轮十项：共用窗口缩放/Spine 网页桌宠按帧绘制，常用网站只在实际换位时复制数组；知识库扫描共享四读预算，文件树和聊天记录接入可变高度虚拟列表，收藏改为 Set 投影，Markdown 转换移到本地 Worker；GitHub 筛选单次投影复用，书签区分零结果/失败并检查取消。行为、Worker 资源路径和待人工验收的滚动/长文边界见 [PERFORMANCE_HOTSPOTS_2.md](PERFORMANCE_HOTSPOTS_2.md)。不删历史/笔记、不部署、不自动操作浏览器。

- Todoist 时间编辑局部投影、按批读取开始时间表、单一 Chrome 看板快照及字段级拷贝；虚拟列表只挂载可见行/预留行与拖动源/编辑行，描述派生缓存，拖动用逻辑高度与按帧合并。
- 工作台延时合并持久化并在页面隐藏/退出时补存；桌宠保留原暂停保护，限制高刷新率绘制与积压补算；dock 点击改为无强制布局的 Web Animations。
- 具体十项对应、旧缓存兼容、仅本机开始时间和虚拟列表边界见 [PERFORMANCE_HOTSPOTS.md](PERFORMANCE_HOTSPOTS.md)。没有浏览器性能录制、真实 Todoist 写入或 FPS 改善的实测结论；长列表滚动/拖动与保存需人工验收。

## 常用网站文件夹嵌套与拖拽专注目标（源码已接入，待浏览器验收）

- **文件夹展开时锁定外层换位**：`FavoriteSites.vue` 在文件夹弹窗打开时（`folderState.isOpen` / `isFolderActuallyOpen()`）直接短路全桌面拖拽换位预览、`previewPageItems` 生成与外部 drop 换位提交，使拖拽网站时的注意力完全集中于移入当前文件夹或放入子文件夹；关闭文件夹后恢复全网格换位与排序。
- **支持文件夹放入文件夹（子文件夹）**：
  - 数据模型在 `launcherFolders` 保留原有记录，新增可选 `parent?: string` 关联；孤立或格式异常父级自动显示在根层，不丢数据。
  - `folder-tree.ts` 提供子树查找与无环检查；`launcherService.moveFolderInto(source, target)` 使用 navigator.locks 原子校验，严格拦截移入自身、后代或环形循环，并随父级自动继承分区归属。
  - 文件夹展开窗口新增：新建子文件夹（`＋`）、返回上一级（`‹`）、将当前文件夹移到上一级（`↥`）以及子文件夹磁贴网格；支持直接将外部或内部网站/文件夹拖入子文件夹。
  - 重命名文件夹时自动级联更新子文件夹的 parent 引用；解散或删除文件夹时，子文件夹保留并安全移至上一级，不静默级联删除未确认的子文件夹。
  - 源码与静态检查已通过，真实层级拖拽、弹窗导航及存储仍需用户刷新后做人工视觉/交互验收。

## 6. 验证、安全与待办

- 代码改动基线：`npm run check`、`git diff --check`；按需 `node --check generated/background.js`。禁止断言和无头 E2E；`tests/` 中存在历史脚本不等于允许执行。
- 浏览器、Broker、页面桥接、扩展刷新、部署和真实账号/数据操作必须另获授权。构建成功不等于界面、联网或部署验收。
- `chrome.storage.local`、localStorage、IndexedDB 不自动提供应用级加密；凭据调用对应 API 时会发送给对应服务，聊天室消息保存在服主服务器。不得承诺“所有秘密已加密、从不离开本机”。
- 不读取私密配置排查文案，不自动执行文档里的部署/初始化/上传命令。旧 QQ 原生宿主或 CLI 兼容接口残留不代表旧 UI 模块仍可用或允许调用。
- 历史台账中的构建失败、已部署、人工验收和“下一步”仅属于原时点；是否仍成立需要重查，不能恢复旧功能来消除文档矛盾。
