# v1.0.9 发行说明

- **版本**：1.0.9
- **发布日期**：2026-11-03
- **构建环境**：Windows 11 / Node.js 22 / Chromium MV3
- **主要焦点**：Manifest 权限与域名最小化、不可变发布防护、全套回归测试接入、历史废弃代码全面收口。

---

## 核心变更

### 1. 权限与域名最小化审计
- **移除本地协议暴露**：将 `manifest.json` 与 `web_accessible_resources` 中的 `<all_urls>` 收敛为明确的 `https://*/*` 与 `http://*/*`，不再默认允许对本地文件系统（`file:`）和非 HTTP(S) 资源的访问。
- **清理 13 个遗留域名声明**：清除已移除模块（Multica、微信读书）以及纯外链/未请求域名（`favicon.im`、`jsdelivr`、`huggingface` 等）。
- **自动化门禁测试**：新增 `scripts/manifest-permission-policy.mjs` 与 `tests/manifest-permissions.test.mjs`，确保声明的每个 API 权限均有源码引用支撑，严禁意外新增未审计权限或引入已退役域名。

### 2. 发布工作流安全防护（不可变 Release）
- **禁止覆盖旧版本附件**：彻底移除 `gh release upload --clobber`，改为检测到同名版本已存在时立即 fail-closed 停止，防止误篡改已发布版本。
- **发布来源与一致性强校验**：严格校验 `package.json`、`manifest.json`、Tag 名称、Git commit SHA、SHA256SUMS 哈希清单与构建环境一致性。
- **全套离线回归测试**：新增针对发布策略与权限门禁的 51 项测试套件，全面接入 GitHub Actions CI。

### 3. 历史死代码与样式大扫除（净减 5,400+ 行）
- **CSS 瘦身**：清理 `src/styles/newtab-workspaces.css` 中已退役的 Obsidian 笔记专属工作区、多仓库树、草稿抽屉、系统监控与 AList 网盘样式，样式包体积净减 66.4KB。
- **Markdown 类名通用化**：将 GitHub 抽屉与通知中使用的 `obsidian-markdown-rendered` 升级为通用标准的 `markdown-rendered`。
- **QQ 残留完全清除**：清理模块注册中的 `dockBefore: "qq"` 与 `qq:explicit-send`，移除通知系统中的 QQ 预设，物理删除 `assets/qq.png` 孤立图片。

### 4. 文档事实源对齐
- 统一 `docs/MODULE_INDEX.md`、`docs/DOCK_MODULE_STATUS.md`，确立现行 9 个内置注册模块与覆盖式侧栏架构的事实源。

---

## 验证结论

- **类型检查与打包**：`npm run check`、`npm run build`、`npm run release:build` 均 0 错误通过。
- **自动化测试**：`npm test` 51 项测试套件全部通过。
- **工作区状态**：干净无悬挂文件。
