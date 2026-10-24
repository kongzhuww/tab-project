# 聊天凭据与HTTP边界

本阶段仅改前端源码与文档。未读取真实凭据、请求真实API、打开浏览器、变更数据库记录或部署服务。编译通过不代表邀请、双端发送或浏览器存储已验收。

## 模块与兼容

- `private-chat-client.ts` 保留原公开入口、邀请导入流程、父认证、能力与UI状态装配；请求函数只委托HTTP客户端，邀请存储委托凭据仓储。
- `private-chat-credentials.ts` 独立拥有懒加载连接与凭据读写，不import门面/Vue、不保存Token内存缓存。阻塞诊断由装配回调提供。
- `private-chat-http.ts` 负责单次鉴权请求、冻结目标、整体等待预算、响应上限与流清理；不拥有轮询、自动重发、队列回执或草稿。
- `private-chat-identity.ts` 是无存储副作用的公开身份校验/键/Token格式叶模块；原config模块继续重导出PrivateRoom与validatePrivateRoom，原调用不用改入口。
- `private-chat-operation.ts` 是本领域的有界等待与signal清理，不是读会话slot，也不把已提交写入当成可回滚任务。与 `core/read-session.ts` 的视图owner用途不同，不新增全应用HTTP框架。

原 `lw-private-chat-credentials` 数据库、版本1、`credentials` store及JSON.stringify([origin,room,uid])键完全保留；不导入/复制/清空/升级旧凭据。子channel不进入凭据键，仍沿用父聊天室授权。公共配置的 `lw_private_chat_v1`、邀请BEAVER-PRIVATE1编码、UID匹配与导入后重新认证约束保留。认证清理提前到凭据写入前，并在成功激活前再次清理，避免迟到的写入结果仍沿用旧权限；保存失败/超时也不保留这次导入前的已认证状态，原公开配置与记录不删除。HTTP配置仍支持HTTP/HTTPS，未借重构强制迁移部署地址。

## 凭据与超时

- read/write单次等待8秒；open本身也有8秒连接预算。blocked立即返回固定诊断，失败后只清自己的连接Promise；不删除数据库重建。
- 过期open迟到成功会关闭自己的连接，不发布到新连接缓存。versionchange同样只清自己拥有的连接。
- 等待open期间过期/取消的调用不得随后创建事务；读取的signal取消时尝试终止只读事务，监听与计时器负责清理。
- write不接受视图signal。事务已接受后可能在调用超时后完成；不能把停止等待写成确定未保存，不自动再写一遍。按原身份键写入，不能随UI切换改投。
- 邀请写入完成后的激活另受同页面版本、当前UID与原公开配置检查；保存后已断开/重连或选择另一邀请时，不由旧调用重新激活。接受的凭据写不回滚，跨页同键变化不等于有全局锁，审查范围见 [CHAT_ARCHITECTURE_CLOSEOUT.md](CHAT_ARCHITECTURE_CLOSEOUT.md)。
- write成功只按事务oncomplete报告，不按单个put.onsuccess假报提交。仓储分开报告missing、invalid、blocked、storage、timeout类别；超时也可能来自整体等待的TimeoutError。
- 缺失凭据与存储不可读不等同未配置，不生成替代身份/Token或给自己群主权限。现有同步UI仍保留原通用故障回退，不宣称每个仓储类别已新增专用界面。

## 单次HTTP请求

1. 先验证并快照origin/父room/UID/channel，再接受同origin的 `/api/v1/` 相对路径；绝对、跨源、反斜杠、hash等目标在读取凭据前拒绝。
2. 由目标强制设置room和channel，main删除channel，不能用path里的查询参数覆盖目标。不把Token写URL。
3. 凭据读取、fetch和响应消费共用整体等待signal。无调用方signal时15秒；有signal时沿用更早的12/15/20/25秒预算，并设30秒上限，避免任意signal无限等候。凭据仓储自身8秒限制仍可更早结束。
4. 凭据等待后再次检查signal，并在实际发送前以规范化pathname/大写method执行门面注入的能力校验，再序列化本次body、发送一次fetch。过期凭据读取不能迟到发起请求。构造/模块import本身不联网。
5. 保留Bearer头、redirect:error、credentials:omit、cache:no-store、no-referrer。非2xx保留共享HttpError状态身份，取消不用的响应体，不把响应正文当错误文案。
6. 流式累计解码前字节，仍最多2MiB。超限/取消时请求cancel，finally清监听并释放reader；JSON解析错误只返回固定文案，不传播可能带Token/正文片段的原生错误。

没有任何HTTP层自动GET/POST/DELETE重试。同步退避和待发有限补发仍由各自协调器负责；写请求继续用独立于读取轮次/视图的signal，超时结果仍可能已被服务器接受，不改原消息ID去重和stored/id确认规则。

## 未覆盖与验证

- 本阶段没有给chat-history/chat-delivery所有事务增加统一硬超时。回执保存迟迟不settle时，批次锁可能继续等待，不能为释放锁假称写入已完成或撤回。
- JSON有效不等于完整业务Schema有效；HTTP客户端不负责领域校验；同步页现已由独立reader先完整解析，见 [CHAT_SYNC_PAGES.md](CHAT_SYNC_PAGES.md)，其它动作不等于全部迁移。没有把邀请编码当加密、增加跨服联邦或端到端加密。
- 邀请预览的解码/JSON/配置异常也统一固定文案，避免原生JSON错误回显邀请片段；邀请协议与字段不变。不承诺全应用所有错误或日志都已审计。
- 预算依赖浏览器事件循环；不是标签冻结时仍能保证的硬实时截止。取消流/只读事务是尽力清理，不代表服务端写入可撤回。
- 已执行 `npm run check`、生成后台脚本语法及 `git diff --check`；未执行断言/无头E2E或真实账号/存储/联网验收。
- 后续获授权后人工确认：原邀请与旧凭据可继续使用、blocked/缺凭据/401/超时诊断、快速切房、发送保存确认与断网补发。后续同步页校验/状态投影已分层，见CHAT_SYNC_PAGES.md；不据此部署或重建凭据。
