# 历史方案：Cloudflare Workers + D1 聊天中继

> 本目录不是当前客户端的聊天后端。现行实现见 [私有 HTTP 服务](../private-chat/README.md) 与 [CURRENT_STATE](../../docs/CURRENT_STATE.md)。旧 WebSocket 设置路径不可直接用于当前 UI，不据此恢复旧入口或自动部署。

这是旧中继方案的部署记录，不承诺永久免费、永久存储、国内可达或无需维护。

---

## 当时记录的额度（不是现行配额或费用保证）

> 以下数字未在本轮联网核对；实际计划、计费、资源上限和可达性须由部署者在部署前核对，不能当作永久免费承诺。
- **请求次数**：每天 100,000 次免费请求
- **D1 数据库读取**：每天 5,000,000 行免费读取
- **D1 数据库写入**：每天 100,000 行免费写入
- **存储空间**：5 GB 免费容量（历史记录，不能据此承诺不会达到上限）

---

## 历史部署步骤（不得自动执行）

### 1. 注册 Cloudflare
前往 [https://dash.cloudflare.com](https://dash.cloudflare.com) 注册免费账号（已有账号直接登录）。

### 2. 创建免费 D1 数据库
1. 在 Cloudflare 控制台左侧菜单点击 **Workers & Pages** -> **D1 SQL Database**；
2. 点击 **Create Database**，数据库名称填 `beaver_chat_db`，点击创建；
3. 进入刚建好的数据库，切换到 **Console** 标签页，将本目录下的 `schema.sql` 内容全部复制进去，点击 **Execute** 执行建表；
4. 复制数据库页面的 **Database ID**。

### 3. 配置与部署 Worker
1. 打开本目录下的 `wrangler.toml`；
2. 将 `database_id = "your-d1-database-id"` 中的 ID 替换为你刚刚复制的真实 ID；
3. 本地终端执行部署：
   ```bash
   npx wrangler deploy
   ```
4. 部署成功后，Cloudflare 会在终端为你输出一个专属地址，例如：
   `https://beaver-study-relay.your-account.workers.dev`

### 4. 旧客户端接入方式（当前 UI 已不适用）
- 在浏览器新标签页打开海狸聊天室 -> 右上角 **⚙️ 设置**；
- 在服务器地址栏输入：
  `wss://beaver-study-relay.your-account.workers.dev/ws?room=你的房间号`
- 以上是旧客户端的接入步骤，不证明当前可用、安全隔离或永久可达。当前客户端使用私有 HTTP 邀请，不应填入这条旧 WS 地址。

---

## 进阶特性与测试提示

### 1. 全球单例房间 (Durable Objects)
本服务已配置 Durable Objects 绑定。当在 Cloudflare 控制台或 Wrangler 部署启用后，同一房间的所有全球客户端将汇聚到同一个单例房间实例，彻底解决多边缘节点之间的广播隔离问题；未开启时自动平滑降级为普通实例模式。

### 2. 双向好友与申请握手
- 支持客户端通过自习室实时发送与确认双向好友申请（包含持久化 D1 记录）。
- 双方同意后即固化为双向好友，并展示状态徽章。

### 3. 多账号测试提示
由于同一浏览器正常窗口中的所有标签页共享同一个 `localStorage`（即读取同一个身份 UID），若需要在同一台电脑上测试“两个人互相加好友 / 聊天”，应在获得授权后使用独立浏览器个人资料，并由服主为各自聊天 ID 生成邀请；不能覆盖原 ID。InPrivate 是否可用还取决于扩展隐私窗口权限，不能当作必然可用的测试环境。
