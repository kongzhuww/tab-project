# Edge 商店自动提交

## 触发与范围

- 推送正式版本 Tag（例如 `v1.0.9`）：现有 Release 工作流先检查、隔离构建并发布附件，再调用 `Submit to Edge Add-ons` 工作流上传同一 Release ZIP 并提交审核。
- 普通 main 提交不送审。GitHub Release 工作流使用内置 GITHUB_TOKEN，因此不依赖另一个 `release.published` 事件触发工作流。
- 补交已有版本：在 Actions 的 `Submit to Edge Add-ons` 中选择 Run workflow，填写已有正式 Release Tag，例如 `v1.0.8`。不要重复提交正在审核或已经上架的相同版本。
- GitHub Release 成功与 Edge 提交是独立状态；Edge 提交失败不会删除已发布附件，应先检查后台状态再决定是否重试。若安装包已成功上传为草稿，但因前序版本正在审核中导致自动提审排队受阻，脚本会输出警告与 Job Summary，不阻断 GitHub 发行流水线。

## GitHub Release 不可覆盖保护

- 发行工作流只创建新 Release，不上传、编辑、删除或覆盖已有 Release；相同版本已存在（含草稿、预发布版）时失败退出。重跑失败任务不会自动替换附件，也不会继续商店提交。
- 写权限任务不检出项目源码、不安装 npm 依赖、不执行发行包内脚本；只运行工作流内联校验和固定的 `gh release create` 命令。
- 创建前校验：附件恰为指定 ZIP、SHA256SUMS.txt、build-info.json，均是普通文件；ZIP 哈希、根 manifest 的 MV3/版本、构建来源的 version/commit/github-actions 环境均匹配；现存远端 Tag（支持有限层级注解 Tag）必须指向该次工作流的提交。
- 先核对仓库访问权限，再确认版本确实返回 404；鉴权失败、限流、网络故障、异常响应与缺少 Tag 均停止，不尝试自动建 Tag 或把错误当成版本不存在。
- 手动触发只允许发布已有且指向本次构建提交的版本 Tag；`publish_latest` 控制是否设为 Latest。已有 Release 不可借手动触发补写附件；残缺发行应先核对原因并另行授权处理，默认发布新版本。
- 发行运行串行执行，检查后若其他操作者创建同名 Release，创建命令应失败，不使用覆盖分支或自动重试。该策略不等于已经开启 GitHub 服务端 Immutable Releases 或 Tag 保护，也不承诺对外部操作者移动 Tag 的零竞态保护。
- `npm test` 执行无外网/真实凭据的发行策略回归，并已接入 CI 与发行构建前门禁。测试范围与限制见 [TESTING.md](TESTING.md)。商店任务自身的重试、审核及在线状态仍按下文边界处理。

## 一次性配置

仓库 Actions Secrets：`EDGE_CLIENT_ID`、`EDGE_API_KEY`。
仓库 Actions Variables：`EDGE_PRODUCT_ID`，使用 Partner Center 产品 ID，不使用公开扩展 ID。

不把密钥存入源码、日志、构建产物或截图。密钥轮换只需更新同名 Secret，无需修改代码。曾在聊天或其他非密钥管理渠道分享的 Key 应立即轮换。

## 安全与校验

仅允许稳定版数字 Tag；拒绝草稿、预发布版和版本不匹配的 ZIP。下载时校验 Release 提供的 SHA256SUMS（完整性检查，不是独立来源签名），读取根 manifest.json 确认 MV3 和版本。发布步骤不安装依赖、不执行发行 ZIP 内代码；商店凭据只注入最后的 API 步骤，且不跟随 API 重定向。

对上传和提交写请求不自动重试。上传超时或提交结果不明时先去 Partner Center 查看，不能假称请求已撤回。提交轮询到达时间预算后保留待处理状态，不重复发起审核。

## 状态口径

API 返回 202 只代表请求被接受。上传成功、提交操作成功、微软审核通过、商店公开上线、浏览器自动更新是不同阶段。最终审核及公开版本以 Partner Center 和商店为准；商店介绍、截图等元数据仍在后台管理。商店安装由 Edge 自动更新，解压安装不会因此自动转换为商店安装。

官方参考：https://learn.microsoft.com/en-us/microsoft-edge/extensions/update/api/using-addons-api
