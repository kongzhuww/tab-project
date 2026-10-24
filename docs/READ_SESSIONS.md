# 轻量读取会话与首批接入

第三阶段新增 `src/core/read-session.ts`。这是读取生命周期工具，不是HTTP客户端、调度框架、Vue store或跨页面全局单例。每个独立读取通道持有自己的 `ReadSessionSlot`；不同窗口/服务实例不会互相取消。

## 核心契约

- `begin({ signal?, timeoutMs?, isCurrent?, onStop? })`：替换同一通道的旧读取。可选预算须为1到300000毫秒，省略不代表自动有超时。
- `current()`：仍拥有通道、没有结束/中止，并且业务身份/活动条件仍成立；数据与错误提交前检查它。
- `owns()`：只检查通道归属，不把活动条件当作资源归属。
- `wait(() => read())`：只在当前会话开始操作；中止或超时后停止等待。底层仍可能完成，但成功结果不会交给过期调用方，迟到失败有处理器接住，不成为未处理拒绝。
- `finish()`：结束自己，清理计时器/父信号监听并中止自己的signal；只有仍拥有该通道且清理过程中没出现新读取时返回true。不能用旧任务的finally清新任务的loading。
- `cancel()`：关闭当前通道；不重试、不自动发起新读取。
- `onStop`：仅被取消任务仍拥有该通道时通知，用于结束本次忙碌状态或显示超时。被新任务替代的旧任务没有权改新任务UI，因此不会收到owner通知。回调不得提交或重发写操作。

工具只管理自己的signal、timer和等待监听。Blob URL仍由预览资源所有者管理；领域身份/仓库/目录/当前tab/版本由调用方提供，不让通用工具猜测。

## 使用形态

```ts
const reads = new ReadSessionSlot(); // 挂在服务/协调器实例，不放进每次读取函数

async function reload() {
  const capturedId = selectedId;
  const job = reads.begin({
    timeoutMs: 45000,
    isCurrent: () => viewActive && selectedId === capturedId,
    onStop: () => { loading = false; }
  });
  if (!job.current()) return;
  loading = true;
  try {
    const draft = await job.wait(() => readSource(job.signal));
    if (!job.current()) return;
    // 同步提交；不要在检查和提交之间再await。
    data = draft;
  } catch {
    if (job.current()) error = "读取失败，请手动重读";
  } finally {
    if (job.finish()) loading = false;
  }
}
```

示意中的capturedId须在该次任务开始时捕获。业务predicate应为无副作用的同步判断；新任务启动后立即设置自己的loading。关闭/隐藏/切换来源由原有生命周期显式cancel，不会因为工具import而启动任何操作。

## 本轮实际接入

| 通道 | 业务条件与预算 | 资源/暂停边界 |
| --- | --- | --- |
| GitHub仓库详情 | 仓库revision、详情打开、页面活动；整体45秒 | 关抽屉、换仓库、账号改变、页面暂停取消；保留既有手动重读与保存笔记版本守卫 |
| GitHub只读分析 | analysisVersion、当前tab、页面活动；整体60秒 | GitIngest/README摘录共用该分析读取通道；暂停/超时即时结束对应loading，所有采样等候使用wait |
| 开源发现 | 当前View父signal与时间范围；整体45秒 | 父活动中止、切范围或卸载取消；停止后不继续备用源，不自动刷新重试 |
| 图库目录与内置库 | 每个StickersService实例、readVersion、活动状态；每个owned读取整体60秒 | 根检测转入内置库时由内置库接管同一通道；旧根任务的finally不能关闭新分页的loading |

图库的设置读取、根句柄、权限检查、目录扫描、索引协调、内置库组/统计/分页与预览批次的等待均受所属会话约束。预览管理器原来的并发2、待处理失效、URL归属和回收继续有效；暂停/超时取消其待处理队列，不让迟到解码重新发布URL。当前展示仍可保留已生成预览，卸载才清空全部。

图库从根检测移交到内置库会开始一个新的60秒读取预算，不声称整条跨模式检测链只需60秒。计时器依赖浏览器事件循环，不是CPU抢占或实时系统承诺。

## 不变的写入与数据规则

- Star PUT/DELETE、付费AI POST、Webhook、Obsidian保存、原图导入/删除、索引显式编辑、聊天室发送都不套用这个读取取消协议，不改变写入确认和重试规则。
- 已经被底层接受的写入/元数据事务不会因为隐藏、超时或停止等待回滚，不自动重发，不改投当前新目录或新房间。
- 非AbortSignal原生文件读取、IndexedDB事务、bitmap解码未必可物理撤回。工具只能停止等待、后续调度和迟到提交；底层返回后仍须由原资源管理者关闭bitmap/连接等。
- `readVersion`、详情revision和analysisVersion等业务快照仍保留，复制/保存/删除确认可依赖它们；不是要求用一个全局epoch替代所有身份。
- UI布局、存储键/格式、真实图片与历史数据没有迁移。

## 明确未迁移的范围

这不是“全应用异步治理完成”。GitHub主列表/Star核对与AI任务的写入互斥协调、设置连接检查、搜索栏，以及B站/其它模块保留原有会话与守卫；不为了统一命名而大规模混改。聊天后续已仅在同步单轮等待复用本工具，发送写入仍独立，详见 [CHAT_CLIENT_LAYERS.md](CHAT_CLIENT_LAYERS.md)。之后按独立读取通道接入，必须先确认各自写操作边界。

本轮只做源码审查、类型检查、多入口构建、生成脚本语法和差异检查。没有运行断言/无头E2E、操作浏览器、使用真实API/Token/图库或部署。需要人工确认快速切仓库/范围/分类/页码、关闭重开/暂停后重读，及加载状态是否属于当前任务；构建通过不能代替这些验收。
