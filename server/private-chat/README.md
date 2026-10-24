# 海狸私有聊天室服务 (Beaver Private Chat Server)

私有聊天室/分享空间服务端，Python 3.12+ 标准库与 SQLite 持久化。客户端按已存配置重新认证并从游标继续同步，不是始终不断开的 WebSocket 连接。以下部署命令只供运营者获准后执行；已有实例升级不得重新初始化服主凭证。

---

## 一、设计理念与特性

- **纯自托管私有化**：不连接任何公共云中继，不对公众开放注册，只有服主和持有独立邀请的成员可进入。
- **零外部依赖**：仅使用 Python 3.12+ 内置模块（`http.server`、`sqlite3`、`hmac`、`secrets` 等），不需要安装 pip 库。
- **HTTP 增量同步**：当前客户端可见时请求 `wait=6` 长轮询，正常完成后的间隔约 2.5 秒，隐藏窗口约 10 秒；还有积压时缩短间隔，失败则退避。不是严格固定每 2 秒，也不保证后台标签始终运行。重开读取配置/凭证与同步游标，重新认证补收。
- **文字、分享与受限图片**：文字/卡片保留；新增 PNG/JPEG/GIF/WebP 图片消息，图片以 Base64 随原有鉴权 JSON 消息存入 SQLite，没有公共图床、远程抓图或独立文件服务。图片二进制最多1 MiB，静态大图由客户端压缩，超限动图明确拒绝，不自动转静态。仍不支持音视频文件上传。
- **安全隔离**：
  - 凭证使用安全随机数生成；数据库仅存储成员 Token 的 SHA-256 摘要（群主 Token 走常数时间比对）。
  - 所有消息落盘与成员操作均限制大小（文字/卡片消息体 <= 256KiB、图片消息体 <= 2MiB 且图片原始字节 <= 1MiB，数据库软上限保护）。
  - 支持单 IP / 成员频率限制与异常阻断。

---

## 二、部署步骤 (以 Ubuntu / Debian VPS 为例)

### 1. 准备目录与文件
将本目录下的 `server.py`、`image_policy.py`、`protocol_contract.py`、`protocol.json` 与 `bootstrap.py` 上传到服务器（例如 `/home/ubuntu/private-chat`）：

```bash
mkdir -p /home/ubuntu/private-chat/data /home/ubuntu/private-chat/secrets
cd /home/ubuntu/private-chat
```

### 2. 生成群主凭证与专属邀请
打开新标签页的 dock「海狸聊天室」→ 设置 →「我的聊天 ID」，取得当前浏览器身份 ID。ID 用于绑定邀请，不是访问 Token；不要覆盖现有 ID 来模拟另一个用户。

在服务器上运行初始化脚本（注意替换域名和你的 UID）：

```bash
python3 bootstrap.py \
  --origin https://chat.yourdomain.com \
  --uid "你的UID" \
  --output-dir ./secrets
```

该脚本会在 `./secrets` 下生成两个权限为 `0600` 的文件：
- `private-chat.env`：包含 `CHAT_OWNER_TOKEN` 与 `CHAT_OWNER_UID`。
- `owner-invite.txt`：你的群主专有加入名片代码（以 `BEAVER-PRIVATE1:` 开头）。请妥善保管，**切勿发给他人**。

### 3. 配置 systemd 守护进程
创建服务文件 `/etc/systemd/system/beaver-chat.service`：

```ini
[Unit]
Description=Beaver Private Chat Server
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/private-chat
EnvironmentFile=/home/ubuntu/private-chat/secrets/private-chat.env
Environment=CHAT_DATA=/home/ubuntu/private-chat/data
Environment=CHAT_PORT=8788
ExecStart=/usr/bin/python3 /home/ubuntu/private-chat/server.py
Restart=always
RestartSec=5

# 安全加固
ProtectSystem=strict
ReadWritePaths=/home/ubuntu/private-chat/data
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

启动并设置开机自启：
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now beaver-chat
sudo systemctl status beaver-chat
```

### 4. 配置反向代理与 HTTPS (以 Caddy 为例)
建议将服务反代至带 HTTPS 证书的子域名（如 `chat.yourdomain.com`）：

```caddy
chat.yourdomain.com {
    reverse_proxy 127.0.0.1:8788
}
```

或者使用 Nginx：
```nginx
server {
    server_name chat.yourdomain.com;

    location / {
        client_max_body_size 2m;
        proxy_pass http://127.0.0.1:8788;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    listen 443 ssl http2;
    # ... ssl 证书配置 ...
}
```

---

## 图片消息升级与边界

- **当前源码必须配套升级 server.py、image_policy.py、protocol_contract.py、protocol.json 后重启服务**；旧服务白名单不允许 image，只更新前端无法恢复发送。不要重新运行 bootstrap 或覆盖已有服主凭证。
- 升级前备份旧代码并用 SQLite backup API 备份数据库；线上更新/重启须服主授权，不将开发构建当部署完成。
- 当前消息类型和限制来自同目录 protocol.json；新同步响应提供schema/protocol/types/limits等完整能力，前端校验后才启用发送。旧imageMessages=1声明仍有兼容路径；未知、格式无效或不支持时保留草稿/预览，不假报发送成功。具体协商、队列暂停和未部署边界见 [CHAT_CAPABILITIES.md](../../docs/CHAT_CAPABILITIES.md)。
- 图片沿用父聊天室凭证、子房间隔离、消息 ID 去重、落盘确认及数据库总容量限制。仅接受带正确文件头/尺寸的 PNG/JPEG/GIF/WebP Data URL，拒绝 SVG/外链/任意文件，图片最多8192边长及约1600万像素。头部/尺寸校验不等于完整解码或病毒扫描。
- 客户端选图、粘贴和图库选择共用处理；源文件最多25MiB，小图/小动图可保留原字节，较大静态图缩放压缩；动图超1MiB不静默丢动画。消息发送不移动、不改写磁盘原图。
- Base64 约增加三分之一体积，图片及可能保留的元数据会被服主服务器保存，**不是端到端加密或公开图床**。消息原始字节/JSON/同步响应各有限制，不能宣称无限容量。
- 反向代理也必须允许至少2MiB请求体；例如上方 Nginx 的 client_max_body_size。实际图片发送、动图、断网补发与代理限制仍需授权人工验收。

本轮能力契约只做源码与静态构建验证，未部署或重启现有实例。Python验证只解析源码，不导入server执行环境/数据库初始化；旧实例继续走兼容路径。后续配套部署须再次获授权。

## 三、客户端配置与使用

- 当前 HTTP 同步也包含扩展内活动分享、同一父聊天室内好友请求/回应与关系返回，不是跨服联邦；`shareActivity` 当前缺省开启，具体隐私选择与真实交互需单独核对。
- 服务器会看到并保存消息，未提供端到端加密；`BEAVER-PRIVATE1:` 只是编码后的凭据，不是加密邀请。公网部署应使用 HTTPS，实际部署与安全验收另行授权。

### 空间导航与共享子房间

界面沿用原版三栏：左侧 44px 空间图标栏、当前空间的房间列表、右侧聊天。成员列表在房间栏底部。空间与房间都属于同一个邀请授权的聊天室，不会扩大到其他聊天室。

- 空间仅是房间的组织层；权限仍由父聊天室凭证校验。首次升级时补回原版“公共自习室”“宿舍开黑组”及预设房间，不改名或覆盖已有房间；新预设房间不导入旧本机缓存，以免错误合并历史。
- 服主可用图标栏 `＋` 创建空间，使用空间标题旁的菜单或右键设置空间名称、图标。每个空间内用 `＋` 创建房间，房间右键可设置。
- 空间上限 16，启用房间总计仍为 32。默认空间不可移除；其他空间移除时同时归档其中房间，消息不删除。
- API：`GET /api/v1/spaces` 返回共享空间与房间；服主可 `POST /api/v1/spaces` 创建、`POST /api/v1/spaces/{id}` 更新、`DELETE /api/v1/spaces/{id}` 归档。房间的 `space` 字段记录所属空间；消息存储键保持不变。

- 原邀请的 `room` 是聊天室的授权边界；子房间通过额外的 `channel` 参数选择，**不修改原邀请和访问凭证**。
- 默认“综合讨论”（`channel=main`，可省略）继续读取原房间历史。子房间采用独立消息存储键、同步游标与本机待发队列，消息不混用。
- 服主可在左侧“聊天房间”旁点击 `＋` 创建共享房间，通过每个房间的设置按钮修改名称、图标和说明。所有受邀成员可见并可切换。
- 每个聊天室最多 32 个启用房间。默认房间不能移除；其他房间移除时仅归档，不删除历史。正在其中的客户端会在下次同步时返回默认房间。
- API：`GET /api/v1/rooms` 列表；服主可用 `POST /api/v1/rooms` 创建、`POST /api/v1/rooms/{id}` 更新、`DELETE /api/v1/rooms/{id}` 归档。所有调用先校验父聊天室身份和权限。
- 升级服务文件并重启即可自动增加房间表；升级前备份 SQLite（使用 SQLite backup API，而非只复制正在使用的主文件）。不要重新运行初始化脚本覆盖原服主凭证。
- 新前端遇到旧服务端时仍可使用默认房间，但不显示共享房间管理入口。旧前端继续访问原默认房间。


1. **导入群主凭证**：
   - 打开服务器上的 `secrets/owner-invite.txt`，复制里面一整行 `BEAVER-PRIVATE1:...` 代码。
   - 打开 dock「海狸聊天室」的设置，在加入/使用邀请区域操作。
   - 粘贴到「服务器邀请」输入框中，点击「预览邀请」，核对域名无误后点击「确认加入并保存凭证」。
   - 保存只表示凭证与配置已写入；以上方认证/连接状态为准。dock 入口未配置时也应可见，不以图标点亮判定加入成功。

2. **邀请朋友加入**：
   - 让朋友在海狸聊天室设置的「我的聊天 ID」中复制自己的 ID。
   - 服主在聊天室设置中的服主管理区查看成员并创建专属邀请。
   - 填入朋友的 UID 与备注名，点击「创建独立邀请」。
   - 将生成的 `BEAVER-PRIVATE1:...` 邀请码复制私发给朋友，朋友同样在面板中粘贴加入即可。
   - 成员邀请有效期为 30 天，群主随时可以一键撤销某个成员的凭证。
