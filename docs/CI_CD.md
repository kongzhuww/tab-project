# CI 与版本发布

> 当前 `.github/workflows/release.yml` 在版本标签触发后自动构建并发布 Latest Release，不是草稿。用户已授权本次发布 v1.0.2。下文旧草稿流程描述属于历史，实际行为以工作流为准；不要在已有同名版本上重复触发，以免工作流覆盖附件。

## 边界

这些文件定义工作流，不代表已经在远端运行成功；本轮仅核对本地工作流源码，没有查询 GitHub 的实际运行、分支保护或仓库可见性，也不改变它们。
构建通过不代表浏览器功能、跨平台或敏感信息审计通过。
首次推送前检查源码、静态资源与 Git 历史中的敏感信息及第三方许可证。
私有仓库的 Actions 用量/存储额度取决于账户套餐，不承诺免费无限使用。

## 日常 CI

`.github/workflows/ci.yml` 在 main push、目标为 main 的 PR、手动操作时运行。
使用 Ubuntu 24.04、Node 22.x 和 `npm ci`；锁文件必须提交。
`npm run release:build` 内部运行 `npm run check`（类型检查、各入口构建），不重复构建。
不运行断言或无头 E2E，不调用浏览器、Broker、原生宿主或私人服务。

产物 `extension-review-<sha>` 是可解压加载的扩展；`build-info-<sha>` 单独记录来源。
保留 7 天，旧的同分支 CI 可取消。检查失败不会生成可下载包。
`git diff --check` 仅检查本轮工作树差异，并非整个提交历史的格式审计。

首次云端运行成功后，在 GitHub 分支保护/Rulesets 中把 `Extension build` 设置为必需检查；
单有工作流红叉不会自动禁止合并。外部 PR 不提供个人凭据，也不使用 pull_request_target。

## 隔离构建输入与私有文件边界

`scripts/build-release.mjs`从当前Git候选源码与固定运行资产白名单创建新的隔离目录，不复用已有generated块。前端依赖的公开`server/private-chat/protocol.json`只作为构建输入显式拷贝；不拷贝整个server、数据库或私有部署配置，也不把server源码目录装进扩展包。`.local.*`与`.env*`不进入构建输入，Git同时全局忽略.env/.env.*并保留公开.env.example。

工作区移除后已本地成功执行干净构建，并核对新包无退役工作区/短信读取标记、无私有配置/密钥容器文件名。此检查不代表完整内容秘密扫描、Git历史审计或真实浏览器验收；不要直接压缩整个开发目录。首次失败的隔离副本会保留排查，只有日志报告Clean extension的成功目录才可进入后续人工验收。单独获用户批准的本机宿主停止/替换不属于CI或release:build自动动作。

## 版本发布

1. 更新 package.json 与 manifest.json 的相同版本，提交全部所需源码和脚本。
2. 等 CI 成功，下载产物，在浏览器手动加载验收。
3. 经维护者批准后，在已验收提交上创建并推送 `v<版本>` 标签。
4. `.github/workflows/release.yml` 校验三处版本一致并重新隔离构建。
5. 创建草稿 Release：人工核对变更说明、ZIP 内容、隐私和浏览器功能后再发布。

附件名称 `tab-project-v<版本>-extension.zip` 保留 `-extension.zip` 后缀，
与现有 `src/settings/release-model.ts` 安装包选择规则兼容。
ZIP 根目录直接包含 manifest.json；另外附带 SHA256SUMS.txt 和 build-info.json。
校验和用于检查完整性，不等同于独立签名或供应链证明。

发布任务与构建任务分开：构建只有 contents:read，草稿任务才有 contents:write，
且草稿任务不 checkout、不安装项目依赖、不执行项目脚本。使用短期 GITHUB_TOKEN，无需 PAT。
Actions 使用完整提交 SHA 固定；Node 使用 22 主版本以接收补丁。
已有同名 Release 时拒绝改动，不覆盖附件；网络错误导致结果不明时先人工查看草稿再处理。

## 真实环境验收边界（本轮未查询线上状态）

- 需要另获授权核对 GitHub Actions 的实际 Ubuntu 构建、产物下载和权限策略；不能从旧“首次待验证”推断远端至今从未运行。
- 新包在浏览器的安装/更新验收，以及更新服务对草稿/预发布的筛选行为。
- 开源前秘密扫描、资源授权与全新用户默认配置审计。

不要为验证流程而擅自发布标签、上传 Release 或把仓库改为公开。
