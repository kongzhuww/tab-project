# WSL 构建验证（本机按需执行）

> WSL 是按需选择的 Linux 构建环境，不是普通前端修改的默认必跑流程。下方首次安装、依赖数量、版本及日志均是历史试点记录，不是当前机器探测结果；新增安装/联网、清理和浏览器操作须分别符合用户授权。

## 范围

Windows 仓库是本项目唯一权威源码，Git 写操作与编辑继续留在 Windows。Ubuntu ext4 副本仅做 Linux 类型检查和构建，不替代 Windows/Edge 运行验收。

当前 manifest 后台加载 Windows 仓库的 `generated/background.js`，页面加载对应 generated bundle；根目录后台文件仍是兼容构建输出，不能与 manifest 的实际入口混淆。**WSL 构建通过不会更新这些文件，也不会改变当前 Edge 界面**。暂不自动回传产物、不重载扩展、不调用 CLI Broker/QQ/Native Host、不操作账号或真实数据。

本项目使用 npm + package-lock.json，不改用 pnpm。遵守 AGENTS.md：不编写或运行断言测试，不启动无头 E2E。仅使用已有 `npm run check`（vue-tsc + Vite/esbuild 构建）。

## 命令（Windows PowerShell 7）

先进入本仓库，使用已配置的全局入口：

```powershell
linux-task.ps1 -Mode path
linux-task.ps1 -Mode sync
```

首次安装或 package-lock.json 变化后：

```powershell
linux-task.ps1 -Mode build -TimeoutSeconds 1800 -Command 'set -e; cfg=$(mktemp); trap "rm -f -- $cfg" EXIT; NPM_CONFIG_USERCONFIG=/dev/null NPM_CONFIG_GLOBALCONFIG="$cfg" npm ci --no-audit --no-fund'
```

`npm ci` 在 Linux 副本重建 node_modules，不修改 Windows 依赖；会联网下载锁定依赖并执行锁定依赖的安装脚本。当前锁文件下载源是 registry.npmmirror.com，未改源或锁文件。禁用用户/全局 npm 配置，避免意外使用宿主认证配置。

日常验证：

```powershell
linux-task.ps1 -Mode build -TimeoutSeconds 1800 -Command 'npm run check && node --check generated/background.js'
```

Windows 上对本次修改范围执行 `git diff --check`。不要在副本运行 Git 或修复源码；遇到源码错误回到 Windows 修改，再重跑。

只清理本项目副本（也会清除副本 node_modules 和构建输出）：

```powershell
linux-task.ps1 -Mode clean -ConfirmClean
```

## 同步边界

`.linux-task-exclude` 在机器默认规则之上增加排除：本地配置、密钥扩展名、原生宿主、Android、后端及其数据、手机包、工作流快照、文档、测试目录、Windows generated/后台产物。不会删除 Windows 中这些文件。

已有未提交与未跟踪源码会按当前工作目录同步；不执行 checkout/reset/stash，不要求先提交。同步不是文件系统快照，构建开始同步时应避免同时大规模修改源码。

`generated/` 被排除同步，因此副本里的构建产物会保留。Vite 原配置 emptyOutDir:false，连续构建可能保留旧 hashed chunk；需要干净验证时显式 clean 后重装依赖，不在 Windows 删除产物。

默认敏感文件排除不是全仓秘密审计；本轮未读取本机 OAuth/私密配置。新增文件如包含秘密，应先更新排除范围。

## 产物与后续

本阶段不提供整目录反向同步。若以后要把 Linux 产物用于正在加载的 Windows 扩展，须另行设计显式发布：核对源码版本、列出必要文件、保留仍被已打开页面引用的旧 chunks，并安排用户授权的刷新。

Windows 原生宿主编译、浏览器交互、Android 构建、ROS、Docker 均不在本次接入范围。Linux 编译成功不代表这些功能已验收。

## 历史首次试点结果（不是本轮重新执行）

首次 Linux 验证已完成：

- `npm ci --no-audit --no-fund`：成功，安装 144 个依赖包；未改 package-lock.json。
- `npm run check`：成功，包含 Vue/TypeScript 检查、主 UI、壁纸 sandbox、汉化 IIFE 和后台/worker 构建。
- `node --check generated/background.js`：成功。
- 副本位置：`/home/<username>/Build/my-newtab-b377f57e9f536e59`。
- 构建日志：`/home/<username>/.local/state/linux-task/b377f57e9f536e59-20261012-105402-655.log`。
- Linux Node 24.11.1、npm 11.6.2；没有安装 pnpm 或替换工具链。
- 未回传产物、未执行断言/E2E、未启动服务、未重载浏览器、未提交或推送；不是浏览器功能验收。

首次安装命令曾因 npm 不允许 user/global 配置同时指向 `/dev/null` 而提前退出；改为独立临时空 global 配置后安装成功，上方命令已修正。没有为此修改用户或系统 npm 配置。
