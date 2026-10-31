# 覆盖式侧栏

## 入口与边界

- 扩展工具栏图标、浏览器命令 `open-side-panel`（建议 Alt+W）统一展开/收起；实际键位由浏览器 commands 管理。
- 本扩展新标签页：runtime 消息按目标 tab ID 派发，挂载页面内 InPageSideDrawer。
- 普通 HTTP(S) 网页：仅用户触发时 scripting.executeScript 注入顶层文档；不增加常驻 content_scripts、不改网页宽度或 body padding。
- 页面内隔离容器使用 closed Shadow DOM + manual popover 顶层，无模态遮罩；侧栏 380px，窄屏最多 90vw。账号 UI 在扩展 iframe 中复用 SidePanelApp，不复制到网站 DOM。
- ×、Esc、再次快捷键/图标关闭；外网页关闭时移除容器与 iframe，并移除宿主监听。
- 浏览器内部页、其他扩展页、扩展商店等受保护页面不保证可注入；失败显示通知，不回退原生侧栏。
- manifest 已删除 side_panel 与 sidePanel 权限。历史 sticker-sidepanel.html 等文件保留不表示仍注册原生入口。

## iframe 安全边界

- 只公开 sidepanel.html 供 HTTP(S) 嵌入，未额外公开 bundle/chunks。
- iframe 首先请求后台授权，成功前不挂载账号界面、不调用侧栏数据加载。
- 授权为 storage.session 中按 tab ID 绑定的随机一次性凭据，30秒过期；后台校验扩展 sender、iframe 页面 URL、frameId、宿主 HTTP(S) URL 与凭据；成功消费后删除，标签关闭也清理。
- iframe 只向经后台确认的宿主 origin 发送关闭消息；宿主校验 source、扩展 origin 和该次随机凭据。postMessage 不传账号、任务、Cookie 或 Token。
- 这些是隔离/最小暴露措施，不承诺对恶意网站的全面安全审计；网站仍可导航或替换自己的整个页面。

## 实际验证

- npm run check、node --check generated/background.js、git diff --check 通过。
- 用户授权下在已有 Edge 正式扩展重载后，于 B站主页操作扩展图标与 Alt+W 展开、× 与 Esc 关闭：网页文档区域保持 1912×948，侧栏 380px。PrintWindow 截图确认侧栏覆盖右侧，不缩窄网页。
- 侧栏展开时真实鼠标点击网页搜索框，焦点仍进入网站输入框；未输入或提交内容。
- 未运行断言/无头 E2E；未测试全部网站、全屏/播放器顶层竞争、受限站点提示路径、所有浏览器版本或所有主题。
