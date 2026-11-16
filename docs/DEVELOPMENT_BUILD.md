# 开发构建与界面验证

## 运行哪个版本

- 从源码构建：在仓库根目录执行 `npm ci`、`npm run check`，然后在浏览器中加载**仓库根目录**；实际入口为 `manifest.json` 与 `generated/`。
- `npm run release:build` 会在 `dist-extension/` 创建新的隔离目录，不会更新浏览器当前加载的目录。使用此产物需明确加载其 `extension/` 目录。
- 设置页的版本区显示当前运行的 UI 构建标识和 UTC 构建时间。新构建与运行中代码的标识不同（即便扩展版本号相同）时会提示重载。元数据缺失时会提示无法核对；标识用于排查构建，不是安全签名。新加的标识需要首次更新和重载后才能显示。
- 构建标识会在普通构建及 `npm run ui:watch` 的每次重新打包时变化。更新扩展代码后，优先在扩展管理页重载，再刷新扩展页面。

## 安全盘点旧切片

`npm run audit:chunks` 只读扫描当前构建入口和静态可识别的 JS 依赖；加 `-- --json` 可获得完整候选清单。候选文件只是扫描中未引用，不代表可以安全删除：旧标签、尚未结束的动态加载以及扫描器未识别的路径可能还会使用它们。

`npm run clean:chunks` 会实际删除候选文件，不是只读命令。先备份、关闭旧页面并确认清单，再决定是否执行；不要使用强制清理来代替人工核对。

## 可选浏览器行为测试

下列测试需要已安装并运行的 ego-browser，使用**隔离构建的 HTTP 预览**和测试用模拟数据，不应指向当前安装的扩展目录。它们验证两套侧栏的尺寸及切换行为，以及同版本但不同构建的重载提示，不证明第三方接口或真实账号可用。

1. 在仓库根目录执行 `npm run release:build`，记录输出的 `Clean extension` 路径。
2. 在一个终端进入该 `extension/` 目录，运行 `python3 -m http.server 18766 --bind 127.0.0.1`。
3. 在另一终端回到仓库根目录，运行：

   ```bash
   ego-browser skill
   ego-browser nodejs < scripts/test-sidebar-browser.mjs
   ego-browser nodejs < scripts/test-build-info-browser.mjs
   ```

4. 测试完成后用 Ctrl+C 关闭 HTTP 服务。每次测试都会结束自己创建的浏览器任务空间。
