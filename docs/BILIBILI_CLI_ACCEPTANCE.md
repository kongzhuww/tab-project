# B站只读 CLI：发布前有限验收记录

> 这是指定轮次的有限验收证据，不是当前 Broker/浏览器状态或再次执行的授权。源码、受管副本与线上运行版本可能不同；先按 [CURRENT_STATE.md](CURRENT_STATE.md) 定位，调用 CLI/读取账号内容须另获授权，不重复执行历史验收来证明文档。

## 提交范围

本次只发布现有的只读取数补丁，不重写SDK：

- `scripts/lw-cli.mjs`：补齐bvid、aid、cid、分页、排序、楼中楼根评论ID等参数转发及只读命令提示。
- `src/core/cli-bridge.ts`：接入六个具名只读出口。
- 本验收说明。

不包含Multica界面/认证改动、其他模块改动、原始收藏/字幕/评论数据、本地配置和历次构建残留。生成文件仍保持本地现状，不把混有其他未提交功能的构建打包进这个范围受限的提交。

## 已定位的任务阻塞

任务副本的旧CLI虽然解析了 `--bvid`，但在bili命令分支未将该字段转发到浏览器。浏览器的video-info入口在调用B站前就因缺参数而拒绝请求。位置参数也不会解决旧分支缺少字段映射的问题。

检查时主目录与任务副本处于同一Git提交；只有主目录CLI存在未提交的参数补丁，任务副本不含该修改。因此本机验收通过，不代表独立任务副本也拥有相同工具。

提交或推送本身不会更新已经运行的任务目录。使用新任务或更新受管副本前，应由平台按授权完成版本更新，再核对CLI参数转发，不要让研究员工自行搜索/修改SDK。

## 本轮实际验收

通过现有CLI、已连接的本机Broker和现有浏览器扩展页面执行，没有打开/重载标签页，没有启动员工或模型，没有修改收藏。

| 出口 | 有限范围 | 实际结果 |
| --- | --- | --- |
| video-info | 原阻塞任务指定的单视频 | ok=true，返回匹配BV号、aid、1个分P及cid，不再缺bvid |
| video-subtitles | 同一视频、显式cid | ok=true，available=false，接口报告无可用字幕；不当作正文提取成功 |
| video-subtitles | 一个已知有字幕样本、显式cid | available=true，665字符、47段时间片 |
| video-comments | 指定视频第1页，每页3条 | 返回3条，响应total=22；没有遍历全部评论 |
| list-folders | 一次 | created/collected均非空；不代表已列出全部收藏夹 |
| list-videos | 一个非空收藏夹第1页，每页2条 | 返回2条，hasMore=true；明确未读完 |
| comment-replies | 已知根评论第1页，每页3条 | 返回1条回复 |

原始数据未加入版本库；此处不公布用户收藏夹标识、目录或报告内容。没有读取/导出Cookie、Token或受管任务认证文件。

## 代码门禁

在Windows当前工作区执行：

- `npm run check`：退出0，包含vue-tsc、Vite多入口构建及后台/worker构建。
- `node --check scripts/lw-cli.mjs`：退出0。
- `node --check generated/background.js`：退出0。
- `git diff --check`：退出0。

未运行断言或无头E2E。当前工作区仍有其他独立未提交修改；上述构建不是“GitHub上所有功能已完整验收”的证明。

## 使用与边界

前缀：`node scripts/lw-cli.mjs bili`。命令为list-folders、list-videos、video-info、video-subtitles、video-comments、comment-replies；所需参数详见CLI参数映射和上表。

需要已经连接的扩展页面。CLI的通用Broker逻辑可能在无页面时尝试唤醒页面，不应把无连接时的反复调用当作无副作用探测。本轮先确认现有连接再取数。

从本提交源码构建扩展时运行 `npm run check`；不以本机未提交的generated目录替代源码构建。不自动安装依赖、刷新浏览器或启动员工。

以下历史边界仍存在，本轮不擅自更改SDK：

- 收藏夹出口对读取异常catch为空，不能用空集合证明“没有收藏”；collected只有默认第一页。
- 置顶评论去重/标记、登录失效、风控、多P及慢请求取消未完整覆盖。
- 字幕调用沿用Broker默认等待；超时不能解释为没有字幕。
- 评论提取链接可能包含站内搜索和推广链接，消费者必须分类，不能全部当作原始资源。

这些结果只证明有限样本的只读链路可用，不证明完整研究报告、Multica派发、互斥队列、自动接手或知识归档已经验收。
