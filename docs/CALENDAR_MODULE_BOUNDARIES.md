# 任务日历：注册阶段与共享资源边界记录

> **当前差异**：`calendar` 源码仍在，但没有在当前 `src/modules/builtins.ts` 登记。下文“第12个窗口/11个图标/WM命中模块”等是当时注册阶段的记录，不是今天的入口保证；不要据此恢复 Dock 注册或重复迁移。当前导航见 [CURRENT_STATE.md](CURRENT_STATE.md)。

## 历史注册阶段状态（以下编号与下一步指原时点）

日历已作为第12个内置窗口注册，`showInDock: false`，Dock仍是原11个模块图标，不改变排序。类型/全部构建通过，真实日历/任务交互尚未验收。

入口：`calendar/module.ts` + `module-state.ts` + `workspace-store.ts` → 唯一 `DockModuleHost` → `CalendarWorkspace.vue`。Todoist设置的WM.open(calendar)现在命中模块；`LogicWeaverCalendar`接到领域控制器，命令中心提供打开、已就绪可见窗口的刷新/今天操作。

## 本轮实现

- 注册协议增加可选showInDock（默认true），仅控制Dock菜单装配，不影响窗口注册、生命周期及CLI元数据；元数据投影包含该值，不包含任务或凭据。
- 删除AppWorkspaces的CalendarWorkspace/useRetainedMount/key专用挂载，以及dock-lifecycle初始mounted中的calendar硬编码。ui-features的calendar-view/calendar-workspace旧登记删除；现行非归档HTML中没有对应根容器消费者，独立页面没有删除。
- View使用现有useWindowDraggable、WM getter身份登记/注销；保留日历内容与标题控件ID。增加实际拖动/四向缩放事件，隐藏/卸载停止手势；位置使用标准lw_win_pos_calendar键，不读取实际用户位置。无模态遮罩、模糊或缩放入场，去掉窗口宽度过渡和浏览器原生resize双轨。
- 可见与页面前台共同决定active。首次激活请求一次初始化/任务读取，重显保留月份/详情/数据，不自动重新发起已取消或失败的任务读取；用户点击刷新重新读取。尚未就绪的全局刷新返回false，不冒充成功。
- 窗口自己持有AbortController和viewVersion，隐藏/后台标签/卸载取消自己的任务读取，初始化等待结束后仍检查可见与版本。Todoist listCalendarTasks(signal)传递到实际getTasks/API；已经提交的缓存存储不能物理取消。
- CalendarService显式init仍合并Promise，共享课表/Google初始化不随一个窗口隐藏而中止。任务读取使用taskReadSequence + taskRevision + signal挡迟到结果和旧finally；有独立signal的窗口不借用共享请求的取消控制器。
- CalendarView动作由窗口attachActions拥有，隐藏时拒绝新UI写操作，卸载按身份解绑；共享service不再永久装订窗口动作。窗口关闭不清共享选中日期、月份、课表、Google数据、任务缓存或Todoist首页timer。
- canUnmountCalendar读取同页todoistModuleState.pendingWrites，覆盖日历截止日操作（包括缓存提交）及其他同页Todoist/账号写操作，期间拒绝Quit/Reload；Hide不撤回已提交请求。整页关闭、其他页/外部进程不受该门禁保护。
- 刷新/打开Todoist不再由共享service订阅窗口事件或点击隐藏DOM按钮。日历task点击通过`todoist/task-navigation.ts`只传任务ID与窗口transition，Todoist View挂载且活跃后消费。关闭/后续窗口操作使旧请求失效；写入忙或另一个任务详情仍打开时保留原详情并提示，避免静默覆盖编辑。相同详情不重复读取。

## 前轮准备保留

- CalendarService构造仅绑侧栏动作，不在导入时自动读取数据。显式初始化完成才置initialized。
- 刷新/截止日直接调用Todoist领域API，不依赖失效的LogicWeaverTodoistTasks全局桥。无配置不返回空数组假装成功，失败保留原列表。
- 截止日有效性校验、同任务重复提交拒绝、返回任务ID核对、写入期间拒绝新刷新；失败不自动重试。完成时不强制修改用户当前日期选择。
- 远端更新确认与本地缓存失败分别提示，storage Promise传播错误；不因缓存失败建议重发远端写入。

## 尚未治理的边界

- Google范围读取/OAuth、共享侧栏订阅、月份/范围缓存和账号切换仍属于共享服务后续专项；不能声称所有日历网络活动随窗口隐藏暂停。
- 不同任务并发、本地缓存与远端提交、跨页设置/Token/任务更新不是事务。新的窗口读可以淘汰旧共享读的展示，但不取消另一消费者已经发出的请求。
- 月份/选中日期/任务列表仍有意共享；卸载仅释放窗口资源，并非清空全部共享内存。异常后状态恢复及真实多窗口互动仍待验收。
- 独立页面沿用其既有模块宿主能力，没有取消或新建用户标签；没有对所有独立页做实机覆盖验证。

## 验证

npm run check（vue-tsc、三个Vite入口、后台构建）、后台/CLI node语法、git diff --check通过，generated同步。没有断言/E2E、浏览器导航/重载、读取真实Token/任务、Google授权、远端修改任务或真实用户存储写入、提交推送。

人机验证问题：用户反馈“找到了，成功”后恢复本主线，记录为用户侧恢复；没有追加扩展重载、实际DNR读取或网络设置修改，不把该反馈当成日历验收。

下一步：模型价格卡片生命周期试点，保留独立标签页。日历集中验收以后需覆盖打开/隐藏/重开、拖动缩放、刷新取消、任务详情跳转及写入门禁；真实任务改期须单独授权。
