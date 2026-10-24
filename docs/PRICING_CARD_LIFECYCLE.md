# 模型价格卡片：按需生命周期试点

> 这是分轮次实现记录；当前 UI 文件为 `src/pricing/ModelPricingCard.vue`，旧名 PricingRadar 不能当作仍存在的文件。现行注册与数据边界见 [CURRENT_STATE.md](CURRENT_STATE.md)，历史“下一步”不是恢复旧迁移的任务。

## 最新：Dock 卡片注册

src/pricing/module.ts与DockCardModuleHost接管原AppWorkspaces挂载点；首次打开加载、隐藏保活和原vue-pricing-root位置保留。元信息只引用原设置键常量，不读取凭据或启动API；价格、排行、评分仍为内置数据。原View/store/settings/设置面板/评分组件与pricing.html本轮哈希一致，Dock顺序/独立页不变，不开放Quit/Reload。npm run check与diff通过，未运行断言/E2E或真实配置/网络/浏览器操作。详见 [DOCK_MODULE_STATUS.md](DOCK_MODULE_STATUS.md)。

## 先前实现

- 首页AppWorkspaces保留轻量vue-pricing-root占位，仅fullscreen activeId首次为daily-pricing时通过DockCardModuleHost挂载ModelPricingCard（替代原useRetainedMount）；进入后保活，离开不丢搜索、分页、关注和设置草稿。没有把卡片注册为浮窗，不新增Dock图标/改变导航。
- pricing.html保留现行独立Vue island入口，SPA的spaOwned跳过机制不变。
- 新增core/useCardActivity.ts：同时核对组件已挂载、页面可见、pagehide/pageshow状态，以及首页选中卡片/独立页身份。移除监听与卸载配对，没有常驻轮询。
- ModelPricingCard仅active期间读取配置存在性及绑定chrome.storage/storage监听；离开/隐藏/卸载递增版本，迟到结果不写状态。chrome.storage读取不能物理Abort；重新激活会读取最新状态，不会因此发模型API请求。
- 配置状态通过pricing/settings.ts只向卡片返回hasOpenRouterKey/hasAaApiKey布尔值，不把Token交给卡片store或saved事件。原settings读取/持久化键和GitHub共享OpenRouter消费者保留，没有复制凭据或实际调用配置存储。
- 删除价格页没有实际请求消费者的RSSHub读取/徽标及store字段，当时没有清理共享 rsshubUrl 存储；这是历史数据兼容记录，不代表当前仍有独立频道模块。
- PricingSettingsPanel首次点击后保留实例，visible同时受设置开关与card active约束；Teleport真实隐藏且停止定位监听，面板X仅隐藏。草稿不因隐藏/重开而被重读覆盖，整页关闭仍会丢未保存内容。
- 初次配置读取有可见性/版本保护，失败不启用保存，有显式重试；保存固定快照与初始值，仅写编辑字段，忙时字段禁用。隐藏不撤回已发存储写入，成功/失败仍保留结果；卸载不应用迟到反馈。无跨页原子事务，也不假称保存即连通。
- ImageBenchmarkView改为异步组件，只在选择评分页时加载组件/评测数据；已有本地选择与父store行为保持。
- 用户已要求立方体仅保留主界面；价格View不再创建立方体宿主或注册/注销目标，fullscreen-cards.store的DOM宿主注册表及TopInfoCube跨屏迁移已删除。保留价格页自身标题、视图切换、设置及大屏导航；不恢复历史宿主方案。

## 实际数据能力：不可混淆

静态检查发现当前没有pricingController.onAction接收者，也没有价格/排行的在线获取实现；价格store是内置样例，评分组件亦是内置数据。

因此本轮没有制造后台轮询、无效刷新或“API已激活”成功状态：
- 刷新按钮禁用并解释实时刷新未接入，空接收者refresh dispatch返回false。
- 来源和提示明确内置示例/未实时拉取，已保存Key徽标仅说明配置存在、未验证连通。
- 关注仍是本页内存，不宣传持久收藏；本轮没有实现新的持久化。

pricing-store仍被globals/ui-features作为兼容状态出口静态引用，默认样例数组仍可能进入初始公共chunk。此轮实现的是View挂载、配置读取/监听与评分View的按需加载，不宣称全部价格代码已经离开首包或实测提速。

## 验证与剩余

npm run check（vue-tsc、UI/沙箱/汉化及后台构建）、后台/CLI node语法、git diff --check通过，generated同步。无断言/E2E、浏览器导航/重载、真实配置/Token读取、API请求或用户设置写入；没有原生部署或提交推送。

需以后集中验收首页首次打开、切走/重开、独立价格页、设置Teleport/草稿与保存结果、大屏顶栏无立方体占位及评分页懒加载。跨页设置竞争、整页关闭草稿恢复和真实模型数据源不在本轮完成范围。

AI HOT 等后续治理已有对应记录，不将这条旧建议当成尚未开始的任务。真实价格/排行接口仍需独立规划，不与生命周期迁移或保存 Key 混为一项。
