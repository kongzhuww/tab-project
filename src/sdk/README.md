# LogicWeaver SDK 0.1（内置应用试点）

> 当前入口与模块启用状态先看 [CURRENT_STATE](../../docs/CURRENT_STATE.md) / [AGENTS](../../AGENTS.md)。本文件含 SDK 各轮实施与验收记录；其中 QQ、监控、频道及“待迁移”描述属于原时点，不构成恢复旧模块或执行旧测试的指令。

目标：把现有能力变成稳定调用入口，不新增第二套窗口、图片界面或主题。
仅用于可信、随工程编译的 Vue 应用；尚非外部插件运行时或权限沙箱。
按子路径导入，无聚合入口，避免只看一张图却导入整个桌面。

## 已接入

| 子路径 | 能力 | 唯一实现 / 试点 |
| --- | --- | --- |
| `sdk/images` | `images.open({ source, title })` | `viewers/image-viewer-store.ts` + 原 `FloatingImageViewer.vue`；github插件README图片已接入 |
| `sdk/ui` | `AppWindowFrame`、`ModuleSettingsPanel`、`useWindowDraggable` | 直接导出现有组件；todoist设置已接入 |
| `sdk/modules` | `registerDockModule`、元数据查询、`DockModuleDefinition` | 原 `modules/registry.ts`；builtins通过此入口登记，无第二个注册表 |
| `sdk/notifications` | `notifications.show` / `fetch`，返回可关闭通知的句柄 | 原通知队列；没有重复队列或计时器 |
| `sdk/interactions` | `useContextMenu`、`InlineTitleInput`、`useInlineTitleEdit`、`InlineEditStatus` | Dock菜单几何/监听与常用网站三个标题编辑入口已接入；不接管业务写入 |
| `sdk/slots` | `pluginSlots`（搜索建议槽位、右键动作槽位、立方体滚动槽位） | 统一供插件注入系统级交互挂载点，解耦核心模块 |
| `sdk/plugin-context` | `definePlugin` / `PluginContext` (带前缀存储、通知、挂载槽、查看器) | 仅可信随工程编译代码的上下文；不是权限沙箱，也没有外部插件加载器 |

```ts
import { images } from "../sdk/images";

const preview = images.open({ source: imageBlob, title: "图片预览" });
// 可选：只关闭本次预览，不能误关其他应用后来打开的图片。
preview?.close();
```

- 共享图片查看器一次显示一张图，新调用替换旧图。不是每个应用一个窗口。
- 主页由 `AppOverlays.vue` 挂载唯一查看器，应用不得重复挂载。未挂载该宿主的独立入口不自动获得查看器。
- `Blob` 输入由查看器创建/撤销 URL；字符串 blob URL 仍归调用方所有，不得在显示期间撤销。
- 打开仅改变内存与显示，不保存、复制或下载；复制和打开原图仍由用户点击。
- 关闭/替换/宿主卸载会清理查看器自建 URL；迟到图片加载和复制反馈不能覆盖新预览。已提交的剪贴板写入不能撤销。
- 图片画布平移、自适应窗口、缩放、标题栏拖动和主题均沿用现有界面，不换皮。

## 能力盘点与边界

窗口与dock生命周期继续由 `core/window-manager.store.ts`、`dock/dock-lifecycle.store.ts` 和原宿主负责。打开、隐藏、退出不是同义词；现行模块的未保存/忙碌门禁必须保留；旧 QQ 退出记录不代表当前还存在该模块。第一版没有新增通用“强制退出”API。

`capabilities` 是描述，不是鉴权；注册表仅支持可信内置模块。不得下载并执行第三方JS、任意ZIP或远端脚本。

主题沿用 `--panel`、`--surface`、`--text`、`--heading`、`--muted`、`--border` 等变量。UI子路径只在View引用，不在轻量模块元数据中引用。

右键菜单和标题内联编辑仅统一交互层，保留现有业务实现。存储、网络、账号授权、本机操作仍未提供公共SDK；先明确所有权和失败语义，不用一个万能接口绕过原保护。

### 菜单与标题交互（第二轮）

```ts
import { useContextMenu, InlineTitleInput } from "../sdk/interactions";

const { menuRef, style } = useContextMenu({
  visible: () => Boolean(target.value),
  anchor: () => target.value || { x: 0, y: 0 },
  placement: "above", align: "center", gap: 12,
  dismiss: () => { target.value = null; }
});
```

`menuRef`与`style`绑定同一个固定定位菜单根元素。几何按offsetWidth/offsetHeight测量，避开入场缩放的测量漂移；ResizeObserver与窗口变化更新边界，超过视口时菜单内部滚动。仅可见期间监听外部pointerdown、Esc、页面隐藏与离开；关闭和卸载成对清理。不创建遮罩、不替换菜单内容、不执行菜单动作。已用于 Dock、书签及表情包等单层菜单定位；不应直接套到需要越界展开的嵌套子菜单，焦点漫游/方向键协议尚未提供。

```vue
<InlineTitleInput v-if="editing" v-model="draft"
  class="existing-title-input" maxlength="50"
  @commit="saveTitle" @cancel="cancelTitle" />
```

原输入框的class、maxlength及指针修饰事件通过根input保留。每次挂载自动聚焦/全选，非输入法状态下Enter或blur提交，Esc取消并阻止随后的blur提交；组合输入不被Enter/Esc误提交。默认每次挂载只发一个终结事件；第三轮新增busy（只读且不重复提交）与revision（失败后显式重新允许提交）属性。组件不调用保存服务、不读账号、不处理服务回滚，不能独自当作完整表单。

试点：LauncherMenus的网站标题、文件夹标题，以及LauncherFolderDialog标题。URL编辑在第四轮接入同一交互；备注菜单无现行入口，其死代码已删除但CLI与数据保留；这是第二轮的迁移状态；书签菜单随后已有共享交互接入，不再以此处的“尚未迁移”作为当前待办，笔记情况另查源码。目标改变会清掉旧编辑/删除确认状态；文件夹异步保存完成时检查页面会话，避免切换后跳回旧文件夹。第二轮未改持久化；第三轮已单独接入标题保存，其他旧写入口仍未治理，不宣称数据事务完成。

### 保存结果与错误反馈（第三轮）

`useInlineTitleEdit<T>`只管理草稿、保存中、结果、失败重试准备与会话失效；消费者提供save(target, draft)、apply(target, confirmedTitle)、detachedError(message)。开始编辑固定目标/原名；保存未完成不能重复提交，成功后离开编辑态，失败保留当前草稿并递增revision。reset/卸载使迟到结果不再覆盖新目标，不撤回已经发出的存储操作，也不持久保存草稿。apply失败不当成存储失败再次提交。`InlineEditStatus`为主题变量驱动的非模态文本提示，不新增通知队列。

常用网站三个标题入口使用这套状态；标题持久化留在launcher领域：`renameLinkTitle`只修改最新记录的title（不重发旧URL/分组/备注），`renameGroup`在副本上改分组引用/目录/尺寸，检查空名、20字符、大小写同名（含空文件夹）与已知变动。原键保持，不先乐观改菜单名。

`launcher/title-storage.ts`仅限扩展chrome.storage环境，检查runtime.lastError与保存后回读，合作标题写入用同源Web Lock；提交前等待10秒，已发写不超时释放锁、不自动重试。结果不确定时暂停本页标题写，需复制草稿、刷新核对。localStorage仅是已确认数据的尽力镜像，不作失败后的替代成功来源。旧移动/删除/导入/同步未用此锁，不提供全应用或所有标签间事务保证，旧乐观save/saveLink仍待治理。

输入框保持原皮肤。失焦保存期间以及错误未处理时，外部点击不会立即丢弃本次菜单草稿；Esc可明确取消，主动关闭/切目标会结束该次编辑。错误隐藏后使用原通知提醒，不强抢焦点。文件夹名输入限制与服务统一为20，不再服务静默截断。

第三轮Windows完整check、生成后台语法、diff均退出0；未浏览器交互、故障注入、真实数据写入或断言/E2E。

### 网址编辑（第四轮）

常用网站网址编辑复用原InlineTitleInput/useInlineTitleEdit/InlineEditStatus，标题与URL同一菜单保存互斥。名称沿用已发布的标题API，不另建输入/保存系统。service内部saveLinkTextField以最新值为基础只应用title或url，原标题入口与新editLinkUrl共享确认存储和同一锁；缺失/重复ID、同字段已知冲突拒绝，不提交旧URL/备注/分组/页面快照。

editLinkUrl沿用normalizeUrl补HTTPS，再验证URL、HTTP/HTTPS协议与不含username/password；不访问目标、不开标签，不证明网址可达。空值/校验/持久化错误保当前草稿；Esc取消，切目标使旧结果失效。不改变全记录saveLink、新增网站或CLI备注saveLinkNote的原行为。

launcher/title-storage文件与锁名称保持不变，以便与已有标题消费者共用；其保护范围现在含标题/URL，不等于旧移动/删除/导入/同步已接入。未知结果暂停当前页这两个字段及文件夹改名直到刷新核对。删除LauncherMenus内无人渲染的备注编辑refs/处理函数；全仓检查确认CLI仍用service备注方法，因此保留服务与全部note字段。

第四轮Windowscheck、生成后台语法、diff退出0；没有真实浏览器/网址写入/CLI调用/网络访问或断言/E2E。验收只需网址取消、空值错误、测试网站改址并刷新恢复，见联合验收文档第四轮部分。

## 历史轮次：频道清理

> 下文是删除频道当时的记录；当时保留的 QQ/监控现已不能当作当前入口，模块状态以 builtins 为准。

删除 `src/channels/`、`services/channel.service.ts`、`background/social-sync.ts`、Telegram机器人内容脚本及构建步骤；移除频道注册、商店条目、快捷入口、设置服务内的频道测试、全局桥、邮件/X通知入口和专用样式。

新后台加载时仅清除历史 `gmail-inbox-poll` / `x-account-poll` alarm，不清其他模块alarm或用户数据。旧频道缓存/授权配置未读取或批量抹除。QQ聊天、b站订阅、YouTube封存代码、AI HOT均保留。

Google日历继续使用原 `gmailOAuthClientId` 存储键与原本地文件回退；配置入口迁到todoist设置中的日历区，由 `calendar/GoogleCalendarConnection.vue` 持有。保存不登录、不同步、不清现有token。监控仍读取原RSSHub节点，校验函数迁到monitor目录；不是继续运行频道抓取。

## 滚动立方体：音乐默认面与配置扩展

默认仅音乐。右键可添加/管理、删除当前面（包括音乐）、恢复默认；允许全部删空，保留添加入口。恢复默认仅启用音乐，自定义配置保留在未启用列表，不批量清除配置。旧流量/限时任务/GitHub/课表面已移除，相关业务模块不受影响。

管理面板非模态，无遮罩/模糊。可填写表单或粘贴 JSON：
```json
{"title":"每日一句","icon":"📝","customType":"memo","customData":{"text":"记得休息"}}
```
支持 memo/text、countdown/targetDate（YYYY-MM-DD）、link/url（无凭据 HTTP(S)）。纯文本渲染，不执行 HTML/JavaScript。不支持粘贴 Vue 或任意代码运行。

可信、随工程编译的开发者代码可以注册同一数据结构：
```ts
import { pluginSlots } from "./slots";
const remove = pluginSlots.registerCubeFace({
  id: "my-plugin:status", title: "状态", icon: "◇", desc: "",
  builtIn: false, customType: "memo", customData: { text: "准备好了" }
});
// 插件退出时调用 remove()；重复注册同 ID 可更新内容。
```
注册会持久化可序列化面数据，不持久化回调，不自动启动插件。音乐 ID 不可被插件覆盖。返回的注销句柄检查注册身份：旧句柄不再误删同 ID 的新注册。显式 unregister*(id) 仍是可信宿主的按 ID 删除，不是权限隔离。PluginContext.dispose 只清挂载槽、不清 storage，不是安全沙箱。

本轮 Windows 类型/构建与后台语法检查；浏览器增删、刷新恢复和音乐播放仍需人工验收。保留旧存储键，显式空数组不会恢复音乐；仅含退役 ID 的旧配置回到音乐。多页配置写入尚无事务合并。

## 挂载槽可靠性整理

- 搜索提供者并发等待最多 1500ms；传递 AbortSignal，清理计时器/监听。忽略取消、超时及已替换提供者的结果。按 priority 稳定合并，不按返回快慢排序。同步阻塞代码无法被此超时中断；本 SDK 不是脚本沙箱。
- 每提供者最多 10 条，总计最多 40 条；输出收敛为标题、描述、无账号密码 HTTP(S) URL 和提供者名称徽标，不接受任意行为类型。宿主按 URL 去重。自定义徽标/图片暂不传入搜索渲染器。
- 仅网页搜索“全部”范围调用插件；书签/常用网站专属范围不混入插件。内置建议先显示，插件完成后追加。输入 debounce 开始即取消旧请求；清空/范围/模式切换阻止迟到结果，空输入推荐也核对会话。
- 搜索、菜单及立方体注销句柄按注册身份清理，菜单项 key 包含提供者 ID；disabled 抛错视为禁用，执行前再次核对注册身份与禁用状态。目标增加 source（launcher/bookmarks），区分同名/同 ID 来源。
- PluginContext 注销后拒绝新挂载；主动注销从清理集合移除，失败清理可再次 dispose 重试。cube.register 自动使用 pluginId:faceId；manifest.id 限字母/数字/下划线/连字符。dispose 不清持久存储，不撤销已发业务动作。
- 仍无自动插件加载器；存储写错误处理、跨页配置事务及插件权限系统不在本轮范围。已提交的网络/写入不可通过 AbortSignal 保证撤销。

Windows 类型/构建、后台语法和 diff 门禁；未运行断言/E2E、故障注入或浏览器验收。人工检查搜索快速改词/切范围/清空、右键原有操作、立方体音乐/新增面/恢复默认。

## 验收

用户无需看代码的逐步操作说明：[前三轮联合验收](../../docs/SDK_ROUNDS_1_3_ACCEPTANCE.md)。前三轮用户已反馈“没有问题”；第四轮网址编辑待验收，不推广为后台或存储故障已验证。

代码门禁：`npm run check`、生成后台语法、`git diff --check`。第一轮均通过；9个当时入口的静态导入/动态import依赖遍历共114个JS文件，没有缺失依赖、频道模块chunk或已删除频道管道标记。此检查不是浏览器运行测试。遵守项目约定不运行断言/无头E2E。

人工待验收（先保存草稿，再由用户刷新页面/重载扩展）：
1. 频道不再出现在 dock、商店、轮盘和快捷键列表；保留当前 B站、GitHub、AI HOT 等既有入口，不把旧“只留 AI HOT”误当作删除其他卡片的要求。
2. github插件 README 图片与 todoist 等现行消费者的查看器需检查拖动/缩放/关闭及连续换图；旧 QQ 查看器不作为当前验收入口。
3. todoist设置仍非模态，日历配置独立显示；不必为验收写入真实凭据。
4. 明亮、Lonetrail、暗色下查看器与设置面板均沿用主题。
5. 第二轮类型/完整构建、后台语法和diff检查通过（Windows；无断言/E2E）。待人工核对Dock菜单在屏幕边缘/小视口定位、外部点击/Esc关闭；右键目标切换不继承删除确认。
6. 标题编辑先用Esc取消做无写入验收；中文拼音候选确认不应立即退出编辑。Enter/失焦的真实保存需用可修改的测试网站/文件夹人工验收。

构建保留历史hashed chunk是项目既有策略，避免尚未刷新的旧标签页断链；只核对当前构建依赖图不再包含频道。不能将磁盘构建当作已加载浏览器升级。历史chunk应在关闭旧页面后或独立发布目录清理，不能批量删除用户未跟踪文件。
