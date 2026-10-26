# 调试桥接退役：开发版与商店版一致

## 用户要求与范围

用户要求不再保留开发调试桥接。此变更不设置开发开关、不仅在商店构建中隐藏，而是删除相应源码与启动链路。

移除：

- `src/core/cli-bridge.ts`：页面命令分发、DOM 操作、`eval` / `new Function` 入口、本机 Broker 轮询及全局 `LogicWeaverCLI`。
- `src/background/cli-bridge.ts`：后台命令、标签页/存储控制与 Broker 长轮询。
- `scripts/lw-cli.mjs`、package.json 的 `lw` 命令：专用 CLI 与 Broker 守护进程。
- `src/background/jev-bridge.ts`、`src/services/jev-cooperative.service.ts`、`src/services/jev-page-adapter.ts`：Jev 外部消息入口、端口、观察与操作适配器。
- 主页全局控制器、搜索独立页、intro 入口及后台的相关 import、延迟启动和注册调用。

更新 AGENTS.md 与现行导航；CLI_CONTROL.md、BILIBILI_CLI_ACCEPTANCE.md 和 MODULE_INDEX.md 中的旧命令仅作已明确标记的历史记录。不要依据历史文档重建执行入口。

## 保留的正常能力

页面内部 commandRegistry、用户快捷键、普通控制器、书签/标签页界面、侧边栏、资源下载、业务网络代理、聊天、同步及其他正常组件不因调试桥接退役而删除。没有清除用户浏览器存储、登录状态、笔记、消息、书签或文件。

壁纸沙箱及用户导入 HTML/JS 的功能没有在本轮修改。删除 CLI 动态代码入口不等于已经完成壁纸策略审核，也不等于可以直接承诺商店“无远程代码”。

## 生成产物与发布

普通 Windows 构建更新当前入口和后台；仅在核对当前入口依赖可达性后定向删除含退役桥接的旧产物，不清空整个 generated，也不运行全量自动清理。仍引用这些已删除历史块的旧浏览器页面需要用户自行刷新；本轮不自动刷新或关闭页面。

新商店包必须来自 `npm run release:build` 报告成功的全新隔离目录，不打包整个本机开发目录。旧发布目录和旧 ZIP 不覆盖；其内容不会因源码修改而自动改变，不能继续当作本次去调试版上传。

本轮不提交、推送、部署、上传商店，不操作外部 Pi/浏览器扩展工具，也不自动停止可能由其他工作区启动的 Broker。构建和静态扫描不能替代真实浏览器功能验收。

## 本轮验证结果

- Windows `npm run check`：退出 0，包含 Vue 类型检查、Vite 多入口与后台/worker 构建。
- `node --check generated/background.js`、`node --check background.js`、`git diff --check`：退出 0。
- `npm run release:build`：退出 0，隔离输出 94 个 chunks。构建仍有既有动态/静态 import 分包提示，无构建错误。
- 当前开发目录与隔离目录均从 11 个生成入口沿相对 JS 依赖静态遍历，共 105 个 JS 文件；无缺失依赖、无调试桥接标记。仅删除已确认不可达的 3 个 cli-bridge 块与 3 个含旧桥接启动代码的 main 块，不清除其余历史产物。
- 源码、脚本和当前 generated 中退役通道及 `new Function` 标记扫描未命中。这是定向静态检查，不是全面安全审计。
- 新包 `tab-project-next-store-v1.0.1-no-debug.zip`：151 个条目，根目录有 manifest.json；122 个 JS/HTML/JSON 文件中退役标记未命中，未发现指定敏感/开发文件名。不能把文件名检查当作全部秘密内容扫描。
- 新包 SHA256：`645A69142E5B66FC16B4388AD7BD69E28D1B224DD6326326ADD45610831CE49C`。

没有浏览器/账号功能实测、断言或无头 E2E。旧 `tab-project-next-store-v1.0.1.zip` 和历史发布目录保留原样，不是本次去调试版本。版本号仍为 1.0.1；是否接受同版本替换取决于商店当前提交状态，不自动发布标签或增加版本。
