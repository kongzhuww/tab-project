# Dock 模块实际状态

当前按 `src/modules/builtins.ts`、`registry.ts`、`DockModuleHost.vue`、`src/dock/store.ts` 核对。未操作浏览器；登记存在不等于功能已验收或默认开放。入口导航见 [CURRENT_STATE.md](CURRENT_STATE.md)。

## 已注册模块

Dock 入口来自注册表合并，旧卡片/工具数组均为空。当前共 **12 个注册模块**：6 个浮窗（chat、multica、obsidian、stickers、siren、music），6 个卡片（todoist、B站、GitHub、AI HOT、YouTube、模型价格）。实际显示受安装/偏好/导航状态影响。QQ、独立频道及旧监控/工作流不再是当前注册模块；同步、壁纸、ArkPets、日历仍有部分源码，但未在当前 builtins 登记，不能把旧 17 项统计继续当事实。

注册定义统一提供身份、按需加载View与生命周期，分别由DockModuleHost（浮窗）和DockCardModuleHost（原位卡片）管理挂载；打开、隐藏、卸载门禁按各模块定义执行。共享后台服务不等于窗口组件；关闭隐藏不代表所有网络/音乐/QQ后台都停止。已注册也不代表所有内部异步操作、跨页面一致性和运行时验收全部完成。

## 卡片入口已统一注册

当前卡片有 todoist、B站、GitHub、AI HOT、YouTube、模型价格六项；元信息来自注册表，旧 DOCK_CARDS 数组为空。首页按钮不计入业务模块。YouTube 是否开放按用户要求和偏好处理，注册存在不是主动扩展的授权。

## 不是可独立安装的插件系统

这些是应用内置模块：同一扩展、同一构建产物，不是独立进程、安全沙箱或可任意下载安装的第三方插件。历史 QQ 子功能不构成当前可用模块。

## 历史注册增量（以下各轮与“后续”仅保留原时点结论）

> 以下哈希一致、已完成、未验收与待办均是各迁移轮的记录，不应覆盖上方当前清单或作为恢复旧入口的任务。

### YouTube 增量

- 新增src/youtube/module.ts；原vue-youtube-root容器、v-show、组件DOM与CSS不变，原mountYouTube和重复异步组件声明从AppWorkspaces删除。模块仅声明元信息和动态View，不加载推荐服务或读取账号。
- showYouTube仍是共享首页偏好，未迁键/写配置。仅将homePrefsState提到轻量home-prefs-state.ts，由旧store重导出同一个对象；避免注册模块导入首页运行时与书签/网站服务。可见条件保持activeId命中且showYouTube开启；关闭偏好时不首次挂载，已挂载则保留，原组件负责暂停读取。
- 原卡片组件、设置面板、YouTube store/service、MacDock与右键菜单本轮前后文件哈希一致。推荐/收藏、每页数量、分页位置、同步动作、外部播放、独立youtube.html入口没有在本轮改造。SPA内原ui-features入口已有spaOwned跳过，保留独立页面的挂载入口，不另建第二个服务实例。
- Dock插入点仍在模型价格前，顺序保持B站、GitHub、AI HOT、YouTube、模型价格。没有加Quit/Reload菜单；模块仍保守拒绝独立卸载以保护设置草稿与收藏操作。
- npm run check（类型+全部构建）、git diff --check通过。未操作浏览器、读取实际账号/收藏、同步喜欢视频、发起推荐请求、断言/E2E或提交推送；实际交互仍待用户验收。

## B站收藏增量

- 新增src/bilibili/module.ts，元信息不导入业务服务或读取账号；缓存目录仍归原cache.service.ts/IndexedDB所有，不伪造Cookie/UID设置键。AppWorkspaces保留vue-bili-favorites-root和原插槽位置，删除直接BiliFavorites异步声明，以DockCardModuleHost唯一挂载。
- 新增卡片专用mountPolicy，默认on-open不改变GitHub/YouTube。B站明确workspace-ready：保持原首页idle-ready后挂载/预加载，而非本轮强改懒加载。共享播放/频道初始化仍有历史耦合，未宣称已经全面按需或节能。
- B站在GitHub注册后插到其前面，原Dock顺序不变。只按原fullscreen状态判断可见，未新增showBili门禁；showBili原本不控制此卡片挂载，不在注册时改变此语义。
- 原BiliFavorites.vue/CSS、收藏store、radio store/player、设置面板、全屏控制器、MacDock、右键菜单、ui-features及bilibili.html本轮前后哈希一致。保留搜索、拖动、列表、订阅、电台、迷你播放及独立页入口；首页ui-features的spaOwned仍跳过重复装配。
- Hide只退出原全屏态，不停止共享播放或清收藏/目录；未开放Quit/Reload，保守阻止拆建。B站已有重复初始化/隐藏请求/设置面板等内部资源边界未在本轮重写。
- npm run check（类型+全部构建）和git diff --check通过；未运行断言/E2E，未重载/导航浏览器、读取实际收藏/账号、发起播放或目录授权、提交推送。真实交互待许可验收。

## AI HOT 增量

- src/aihot/module.ts声明原ID/图标和三个localStorage偏好键，不读偏好/缓存、不初始化服务。首次打开才经DockCardModuleHost动态挂载，隐藏保活；AppWorkspaces保留vue-aihot-root容器和原位置，删除旧mountAihot及直接异步声明，ui-features独立页入口不变。
- 注册顺序改为YouTube、AI HOT、GitHub、B站，逐个插到已有目标前；原Dock显示顺序仍是B站、GitHub、AI HOT、YouTube、模型价格。导航/循环/右键没有重写。
- AihotFeed.vue、aihot-feed-store.ts、aihot.service.ts、阅读器及其store、全屏控制器、MacDock、右键菜单、ui-features和aihot.html本轮前后哈希一致；三视图、筛选、刷新、空/缓存/错误提示、阅读器和独立页保留。
- 活跃View仍唯一拥有列表请求，隐藏/pagehide的暂停和恢复沿用原实现；模块hide仅退出原全屏态，不关闭独立文章阅读器。未开放Quit/Reload，不宣称正文安全/跨页缓存等内部治理已完成。
- npm run check（类型+完整构建）和git diff --check通过。未运行断言/E2E、浏览器重载/导航、真实资讯请求/偏好读写或提交推送，真实交互待验收。

## 模型价格增量

- 新增src/pricing/module.ts，沿用PRICING_SETTINGS_KEYS，注册时只读取常量、不调用存储函数、不读取凭据。原PricingRadar/View、settings、store、评分组件、全屏控制器、ui-features、MacDock、右键菜单和pricing.html本轮前后哈希一致。
- AppWorkspaces保留vue-pricing-root及原布局位置，替换为DockCardModuleHost，删除最后的useRetainedMount/直接异步组件声明。首次打开挂载、隐藏保活，配置存在性读取/监听仍由原active View控制；设置草稿、搜索、分页、内存关注和评分子组件加载不改。
- 模型价格先于其dockBefore依赖注册，五项顺序仍为B站、GitHub、AI HOT、YouTube、模型价格。独立页不改，不新增Quit/Reload。
- 模型价格/排行/评分仍为内置数据，在线刷新仍未接入；模块注册不改变数据真实性或关注持久化能力。共享OpenRouter键及其消费者保持原样。
- npm run check及git diff --check通过；未运行断言/E2E、读取真实配置/凭据、调用在线模型API、改用户数据、重载/导航浏览器或提交推送。

## 后续

用户已批准在保留原设计的前提下逐个迁移，顺序为GitHub、YouTube、B站收藏、AI HOT、模型价格。五项源码注册接入已全部完成，下一步是经用户许可集中验收打开/切换/返回首页/设置草稿/独立页，或另行审查内部生命周期；未改GitHubWorkspaceCard.vue界面、独立页面入口、配置键或真实用户数据。窗口管理对card类型跳过浮窗z-index、hidden属性与工具运行列表处理，返回首页和切卡仍走原全屏控制器。轻量fullscreen-card-state桥接避免注册表/Dock循环导入。卡片原右键菜单不变；canUnmount暂明确拒绝独立Quit/Reload，待汇总子编辑器/设置草稿门禁后再单独开放，不把安全卸载宣称完成。此次npm run check及diff检查通过，未浏览器重载、网络请求、断言/E2E或提交推送。源码类型/构建通过不等于浏览器人工验收完成。
