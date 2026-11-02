# Edge 商店自动提交

## 触发与范围

- 推送正式版本 Tag（例如 `v1.0.9`）：现有 Release 工作流先检查、隔离构建并发布附件，再调用 `Submit to Edge Add-ons` 工作流上传同一 Release ZIP 并提交审核。
- 普通 main 提交不送审。GitHub Release 工作流使用内置 GITHUB_TOKEN，因此不依赖另一个 `release.published` 事件触发工作流。
- 补交已有版本：在 Actions 的 `Submit to Edge Add-ons` 中选择 Run workflow，填写已有正式 Release Tag，例如 `v1.0.8`。不要重复提交正在审核或已经上架的相同版本。
- GitHub Release 成功与 Edge 提交是独立状态；Edge 提交失败不会删除已发布附件，应先检查后台状态再决定是否重试。

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
