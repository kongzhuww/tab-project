# LogicWeaver 本机 CLI 控制（当前源码入口）

这不是 Pi 的通用浏览器工具，而是仓库内置的扩展 RPC 控制链路。只有获得用户页面诊断授权后才考虑这些命令；`status/inspect` 也可能启动 Broker 或唤醒主页，不能因“只读”而绕过浏览器授权。当前功能导航先读 [CURRENT_STATE.md](CURRENT_STATE.md)。QQ UI 已移除，下方 QQ 章节仅为历史审计；CLI/原生宿主兼容入口残留不代表允许调用或应该恢复旧模块。

## 入口与连接

- 客户端 / Broker：`scripts/lw-cli.mjs`（也可用 `npm run lw -- ...`）。Node.js 运行，Broker 只监听 `127.0.0.1:19826`。
- 页面执行器：`src/core/cli-bridge.ts`；`src/core/globals.ts` 动态启动，搜索独立页另由 `src/search/main.ts` 启动。
- 后台执行器：`src/background/cli-bridge.ts`，由 `src/background/index.ts` 启动。
- 页面、后台长轮询 `/poll`，Broker `/exec` 分派，再通过 `/reply` 返回结构化结果。
- 历史轮次只读检查（不是当前运行状态）：Broker health 返回 2 个客户端，角色为 `background` 与 `page`；运行 `inspect ".gh-head-settings-btn"` 返回 1 个元素、当时不可见。当时仅证明链路通和选择器匹配；用户最新已人工验收 GitHub 设置入口正常，入口问题不再待排查。此确认不覆盖其他浏览器操作。

## 历史 QQ 控制记录（以下至“普通备份范围”前仅作旧时点审计）

### QQ 本机控制边界（当时的源码更新，未运行）

`/qq/start-main`、`/qq/stop-main` 仅接受 POST。脚本从当前用户 `home/Projects/napcat-win` 定位，不接受请求传入的路径；检查脚本存在并处理 spawn 错误。成功仅表示发出启动/停止请求，不证明 QQ 已就绪或退出。Native Host 的停止脚本仍是 stop-all，Broker 为 stop-main，两者范围不同，执行前需确认。此次没有重启现有 Broker、启动/停止 QQ 或修改 Native Host EXE。

## QQ 最新源码安全暂停

QQ正常窗口关闭/重载/切账号不再自动停后台，View卸载不主动断页面共享WS。右键Dock停止现阶段明确拒绝：旧Native qq-stop停全部，专用Broker stop-main脚本按宽泛命令行标识匹配，范围尚未可靠验证。前端stopMainBackend/后台具名qqStop不会发旧停止；Native EXE与正在运行Broker未替换，不能从源码暂停推断外部老接口已禁用。未执行启动/停止/连接/读配置/部署或浏览器命令；仅主QQ安全协议及浏览器级连接所有权待接入。

## QQ 部署与只读核对（最新，覆盖上文未部署状态）

- 用户明确授权“部署并只读核对”。核对Edge/Chrome注册均指向仓库固定manifest；并排编译EXE、原子替换manifest的path，其余字段不变，最终指向native-host/ArkPetsNativeHost.qq-main-v2.exe。原ArkPetsNativeHost.exe、v1及pre-qq-main-v1/v2清单备份保留；未运行install.ps1、未改注册表、未停现有宿主或重载浏览器/Broker。
- 只读Check首次发现3002监听者为QQ utility子进程；不放宽到直接杀子进程，改为最多8层QQ.exe父链、每层保留OS句柄/启动时间/用户/会话校验，定位无--type的QQ根进程后验证唯一-q账号参数。停止前重查父边、监听身份及3001账号不在目标子树；仍只停止一个核实的根进程，不杀树/launcher或其他账号。
- 使用本机启动脚本已有main账号元信息，仅运行helper -Action Check，返回ok:true、state:eligible-at-snapshot、stopped:false；没有读取QQ Token/私密配置，也未输出进程命令行。此结果只证明当次本机helper快照符合守卫，不证明浏览器当前保存账号一致、Native Messaging链路可达、真实Stop成功或所有QQ子进程会清理。
- 只读检查实测约7.9秒，因此宿主等待调整为20秒、前端25秒，并排部署v2而非覆写已运行EXE；超时仍是结果不确定，不自动重试。已连接的旧常驻宿主/运行中Broker不会自动升级，原外部脚本未修改；新sendNativeMessage启动使用新manifest路径。
- 未执行Stop/Kill/旧启动脚本、QQ连接/发消息、浏览器重载或断言/E2E。仅只读Check验证；部署修改了宿主文件与清单，不能继续宣称“本轮未部署”。当前UI生成产物更新不代表已加载页面自动更新。
- 仍待：QQ注册迁移、浏览器级连接常驻、草稿/全发送门禁；旧启动脚本双账号与残留清理风险未解决。真实停止仅在用户明确许可时单次执行，结果不确定先只读核对，禁止自动重试。

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

## 普通备份范围（版本 2）

`sync status` 只读普通偏好白名单并返回数量/键名与范围标记，不读取账号连接与模块凭据。Native/WebDAV上传及恢复采用同一策略，旧备份中的凭据/连接字段忽略，不清空现有登录设置；覆盖普通设置不是合并。JSON仍可能含个人书签和手填备注，不能当作匿名文件。不得未经授权运行实际push/pull；此次未执行上传恢复。

## Dock注册模块边界（首个试点）

当前同步备份sync、频道订阅channels、监控monitor、工作流workflow、表情包stickers、ArkPets设置面板arkpets、音乐窗口music、壁纸库wallpaper和Todoist todoist已接入内置注册协议；Todoist退出只清窗口资源，保留首页timer/独立日历；隐藏取消窗口API读取和晚回写，任务/附件/评论/配置及同页共享服务写入时拒绝Quit/Reload。todoist view/project/refresh须窗口已就绪可见，隐藏时拒绝而非假成功，不自动再打开；status不额外发任务网络请求。用户选择wallpaper quit仅卸载管理窗口，保留当前图片/视频/sandbox，清其预览与监听，不执行恢复纯色；导入/修改/删除/应用期间拒绝Quit/Reload，Hide不撤提交。用户选择music quit只卸载窗口、首页音频/B站电台继续；Hide取消本窗口浏览/扫码调度，节点保存/已发登录确认/退出/历史写入中拒绝Quit/Reload，不代替实际交互验收。arkpets管理面板的目录读取/监听/草稿，命令代码加载/提交时拒绝退出重载，Hide不撤回提交；不接管模型完成、页面引擎或Native Host。nav arkpets/pet走WM注册入口，不执行桌宠命令。stickers的Dock实例与QQ共享服务隔离；Hide暂停读/准备并保留草稿，写入/授权/已发QQ发送时拒绝Quit/Reload，退出只清自身图片URL/监听，不清持久句柄/图片/QQ。外页或原生收藏写入不在此门禁内；workflow只展示内置快照，无实时任务/持久化写入；Hide保留排版但结束交互，Quit/Reload恢复深拷贝初始状态，无伪造任务忙碌门禁。monitor隐藏/切页取消前台目录/直链/Cal.com读取、移除预览，已请求目录重开不自动重试；设置/预约/云盘登录授权写入时拒绝Quit/Reload，Hide不撤销写入，顶栏探针/后端进程独立。CLI monitor快照命令不属于Dock实例生命周期；频道隐藏取消前台资讯加载/设置连通测试，重开不自动刷新；已读/设置正在写入时拒绝退出重载，旧后台worker任务不停止。详见 [DOCK_MODULES.md](DOCK_MODULES.md)。Hide/窗口关闭只隐藏保活，不撤销已发传输；Quit/Reload会丢弃未保存草稿，窗口发起的保存/测试/同步忙碌时返回ok:false并保留实例。其他页或CLI直接调用同步服务不在该UI门禁内。重载只重建本页Vue实例、读取本机设置，不重放上传恢复。运行/可见标记只表示生命周期请求，不保证组件已加载、DOM渲染或远端任务完成；本轮未实际执行这些CLI命令或浏览器操作。

## Obsidian 注册补充（第十个试点，未运行）

`dock open/hide/quit/reload obsidian` 经注册宿主。dirty或同页文件/目录/导入操作中拒绝Quit/Reload；窗口close仅隐藏，不保存/丢稿。`obsidian open/close`经WM；drawer/tab/close-tab要求窗口可见就绪，未保存标签不能关闭。status仅标签元信息，禁止回传新增正文草稿/文件句柄；状态不等于实际磁盘保存/组件渲染。共享导入、其它页/进程、原生等待不可撤销和根目录路径/覆盖竞争见DOCK_MODULES.md。未操作浏览器或真实CLI page命令。

## 电台修复边界（更新）

`node scripts/lw-cli.mjs bili radio-repair` 仍是会写存储的命令，不是只读诊断：只整理已存系列的数组/对象曲目和数量，返回空系列清单；不登录、刷新收藏夹、抓取、注入个人种子歌单或播放。空系列由用户在电台选择收藏夹、添加队列后保存。存储读取/解析/写入失败报错，原Chrome/localStorage主副本键保留但非跨存储/多标签原子事务。此次没有运行该命令或读取真实歌单；风险写入仍需用户许可。页面命令仍可能唤醒主页，不能因领域handler无网络就把整个CLI链路说成无副作用。

## 用法

在仓库根目录通过 PowerShell 执行：

```powershell
node scripts/lw-cli.mjs help
node scripts/lw-cli.mjs health
node scripts/lw-cli.mjs inspect ".gh-head-settings-btn"
node scripts/lw-cli.mjs inspect "#bili-up-group-manager-top"
node scripts/lw-cli.mjs inspect "#todoist-settings-open"
node scripts/lw-cli.mjs inspect ".gh-head-settings-btn" "#gh-head-search-wrap"
```

`help` 打印 CLI 帮助；`health/clients` 查看连接；`inspect` 返回限定元素的坐标、尺寸、可见性、样式和简短文字，两选择器可查看间距/重叠。不要 inspect 包含秘密或私密消息的容器。当前 CLI 没有按标签 ID 精确选择客户端的参数，Broker 优先已连通的主页，再考虑活跃状态；先核对返回页面/元素，不要把别的独立页结果当目标页结果。

其他已实现命令（执行前阅读对应 handler，分类不代表无副作用）：

- 状态 / 内容：`status`、`dock list`、`github status`、`todoist status`、`bili status`、`youtube status`、`text <selector>`。
- 页面交互：`nav <home|github|bilibili|youtube|todoist|...>`、`click <selector>`、`contextmenu <selector>`、`input <selector> <value>`、`drag <selector> <dx> <dy>`。
- 注册元数据：`dock modules` 列出当前可信内置模块的ID、schema版本、root、能力说明与设置键名，不读凭据值/调用View loader；仍是可能唤醒主页的page命令。
- 生命周期：`dock <open|hide|reload|quit> <id>`，其中新同步窗口 ID 为 `sync`；`reload`（所有已打开的扩展页）、`reload-ext`（整个扩展）。这些都不是无副作用只读命令。
- 模块命令：Todoist `view/project/refresh`，GitHub/B站/YouTube 领域命令等，以 CLI 解析器和页面 switch 为准。
- 高风险能力：`eval <code>` 任意页面 JS；`sync webdav-push/webdav-pull/cloud-push/cloud-pull` 上传或覆盖配置；后台还包含存储读写命令。

## AI 操作约束

1. 先取得用户诊断授权，再查连接和限定元素；没有授权时只看本地截图和源码，不运行本节示例。要只读检查且不启动服务时，可请求 `GET http://127.0.0.1:19826/health`，只保留角色和连接数量；不要输出全部标签 URL/标题。
2. CLI 的 `health/clients/status` 会在 Broker 不存在时自动启动它。页面类命令在无 page 客户端而有 background 时，会尝试唤醒/打开主页；因此 `status/inspect` 也不能无条件标成纯只读。先确认 page 已连接；用户暂缓浏览器验收时不执行导航/点击/重载。
3. `input` 会原样回显输入值；禁止通过它提交 Token、Cookie、密码。不得 `eval` 导出 storage、读取凭据或私密页面，禁止后台全量 `bg-get-storage`。状态/列表也可能包含任务标题、书签、消息和 URL，避免无范围输出。
4. 优先具名命令。确需 `eval`，必须先说明范围，仅做用户授权的有限诊断/操作；不得用它绕过风险确认。
5. `ok:true` 只说明 handler 返回，不证明网络同步、真实鼠标点击、播放或保存成功。对用户授权的交互，执行后用限定 inspect/只读状态复核；超时的写操作不自动重试。
6. `reload` 会刷新多个扩展标签，`reload-ext` 可能中断现有工作；须用户明确同意，不作每次构建的默认收尾。
7. 当前 Broker 未实现认证，且允许宽松 CORS，后台有广泛存储权限，页面有 eval；loopback 并不等于完备安全。只用于可信本机开发，不暴露端口，不宣称开源安全审查已完成。认证、Origin 约束与能力白名单列入后续治理，不在本轮擅自改变连接协议。

修改命令时同时核对 CLI 参数解析、page/background handler、此文档；只存在于帮助文字而 handler 不支持的命令不能当作可用。
