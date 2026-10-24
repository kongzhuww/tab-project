# 海狸私有聊天室：部署、权限与恢复

这是需要手动部署的 Python 3.12+ / SQLite 服务，不是扩展内的一键开服功能。服务使用标准库，没有 pip 依赖；域名、HTTPS、进程守护、磁盘和备份仍需服主维护。

**已有实例升级不要重新运行 `bootstrap.py`，也不要覆盖原凭据或数据库。** 新前端不能代替服务端权限修复；升级流程见第七节。本文命令只供运营者检查并授权后手动执行，不代表已经部署或验证你的服务器。

## 一、部署前准备

- 本文系统服务示例面向 systemd Linux，使用独立的 `beaver-chat` 系统用户；不假设存在 `ubuntu` 用户。
- 准备 Python 3.12+，并使用**同一个解释器**运行检查、初始化与 systemd 服务。较旧发行版的默认 `python3` 可能不满足要求。
- 准备域名，例如 `chat.example.com`，将 A / AAAA 记录正确解析到服务器。公网服务必须使用 HTTPS。
- 安装并配置 Caddy 或 Nginx，二选一即可。安装方法以发行版与代理官方文档为准：<https://caddyserver.com/docs/install>、<https://nginx.org/en/docs/>。
- 公网仅开放反向代理需要的 TCP 80 / 443；SSH 管理端口按你的安全策略保留。**不要对外暴露聊天应用端口**。应用固定绑定 `127.0.0.1`，默认端口为 `8788`。
- SQLite 由 Python 的 `sqlite3` 模块访问，不要求安装独立的 sqlite 命令行程序。

先在服务器检查，不要导入 `server.py` 做环境探测，因为导入会初始化数据库：

```bash
python3 --version
python3 -c 'import sqlite3; print("SQLite", sqlite3.sqlite_version)'
```

如果解释器不是 `/usr/bin/python3`，后面的初始化命令和 systemd `ExecStart` 都应改成已核对的实际路径。

## 二、准备五个文件与独立目录

扩展安装包不包含完整服务端源码。请从你有权限访问的仓库下载同一版本的以下五个文件到服务器的临时上传目录，然后在该上传目录执行后续安装命令：

```text
server.py
image_policy.py
protocol_contract.py
protocol.json
bootstrap.py
```

源码位置：<https://github.com/kongzhuww/tab-project-next/tree/main/server/private-chat>。仓库私有时需要登录有访问权限的账号。不要把真实环境文件、数据库或邀请上传到源码仓库。

以下仅适用于**首次部署**；已有实例保留其原目录和服务用户，不照搬目录迁移：

```bash
id -u beaver-chat >/dev/null 2>&1 || sudo useradd --system --home-dir /srv/beaver-chat --shell /usr/sbin/nologin beaver-chat
sudo install -d -o root -g beaver-chat -m 0750 /srv/beaver-chat
sudo install -o root -g beaver-chat -m 0640 server.py image_policy.py protocol_contract.py protocol.json bootstrap.py /srv/beaver-chat/
sudo install -d -o beaver-chat -g beaver-chat -m 0700 /srv/beaver-chat/data
sudo install -d -o root -g root -m 0700 /etc/beaver-chat
```

服务代码由 root 管理，进程用户只需读取源码、写入数据目录。秘密目录由管理员管理；systemd 系统服务在切换运行用户前读取 `EnvironmentFile`，聊天进程不需要读取该环境文件本身。

## 三、仅首次初始化服主凭证

先在扩展「商店 → 独立模块」中逐项启用实验性的「海狸聊天室」（默认关闭），再打开 dock「海狸聊天室」→ 设置 →「我的聊天 ID」，复制**你将实际使用的浏览器身份 ID**。它不是密码，但服主邀请必须与这个 ID 匹配。

替换下面的域名和 `OWNER_UID_HERE`，不要原样执行占位符：

```bash
sudo python3 /srv/beaver-chat/bootstrap.py \
  --origin https://chat.example.com \
  --uid OWNER_UID_HERE \
  --output-dir /etc/beaver-chat
```

三个参数都是必填项。`python3 bootstrap.py` 单独运行不会成功。公网 HTTP 会被拒绝；HTTP 仅允许 `localhost`、`127.0.0.1`、`[::1]` 这三个回环主机作本机开发使用，不允许用 HTTP 传输公网或局域网服务凭据。

脚本生成以下文件，在 POSIX 主机上使用 `0600` 权限，秘密目录为 `0700`：

- `/etc/beaver-chat/private-chat.env`：服主 Token 和服主 UID。
- `/etc/beaver-chat/owner-invite.txt`：以 `BEAVER-PRIVATE1:` 开头的完整一行服主邀请。

**生成的是随机 Token，不是非对称加密私钥。** 邀请只是编码了凭据，不是加密。不得把文件内容写入日志、发给别人、提交 Git 或粘贴给 AI。初始化脚本拒绝覆盖已有文件；遇到拒绝时不要删除旧文件后强行重建。

## 四、启动 systemd 服务

创建 `/etc/systemd/system/beaver-chat.service`，将下面内容保存为服务单元：

```ini
[Unit]
Description=Beaver Private Chat Server
After=network.target

[Service]
Type=simple
User=beaver-chat
Group=beaver-chat
WorkingDirectory=/srv/beaver-chat
EnvironmentFile=/etc/beaver-chat/private-chat.env
Environment=CHAT_DATA=/srv/beaver-chat/data
Environment=CHAT_PORT=8788
Environment=PYTHONDONTWRITEBYTECODE=1
ExecStart=/usr/bin/python3 /srv/beaver-chat/server.py
Restart=on-failure
RestartSec=5
UMask=0077
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/srv/beaver-chat/data
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

确认解释器和路径正确后再启动：

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now beaver-chat
sudo systemctl status beaver-chat --no-pager
curl --fail --max-time 10 http://127.0.0.1:8788/health
```

`/health` 不需要身份凭据，返回服务名称、协议和消息能力；它只能证明服务可访问，不能证明服主认证、图片发送或双端同步已经成功。

## 五、配置 HTTPS 反向代理

### 方案 A：Caddy

在管理员核对 Caddy 配置后加入如下站点。域名解析和公网 80 / 443 必须正确，代理才能取得证书并接受连接：

```caddy
chat.example.com {
    reverse_proxy 127.0.0.1:8788
}
```

常见配置位置是 `/etc/caddy/Caddyfile`；如果使用不同路径，请替换命令。核对站点后先验证配置，再在获准后重载：

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

不要同时启用另一个占用相同端口的 Nginx 站点。不要使用 `curl -k` 绕过证书错误来宣称 HTTPS 配置成功。

### 方案 B：Nginx

以下为示例，需要替换域名、证书路径，并放入正确的 Nginx 配置上下文。证书申请和续期需另行配置。

`http` 上下文中的 IP 限流示例：

```nginx
limit_req_zone $binary_remote_addr zone=beaver_chat_ip:10m rate=10r/s;
```

对应 HTTPS 站点：

```nginx
server {
    listen 443 ssl;
    server_name chat.example.com;
    ssl_certificate /etc/letsencrypt/live/chat.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/chat.example.com/privkey.pem;

    location / {
        limit_req zone=beaver_chat_ip burst=20 nodelay;
        client_max_body_size 2m;
        proxy_pass http://127.0.0.1:8788;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 30s;
        proxy_buffering off;
    }
}
```

代理限流参数需按实际人数和共享出口调整。如果代理前还有 CDN，不要直接信任任意客户端提交的转发 IP 头；先按代理官方方法限制可信代理范围。应用当前不读取这些头实现 IP 限流。

申请证书所需的 HTTP 站点、80 到 HTTPS 的重定向按你使用的代理和证书工具配置。Nginx 修改后先运行 `sudo nginx -t`，再在获准后重载。

从有公网访问能力的位置检查：

```bash
curl --fail --max-time 10 https://chat.example.com/health
```

HTTPS 配置完成前不要导入公网 HTTP 邀请。已有 HTTP 配置不会被自动改写或删除；凭据按 origin 存储，换成 HTTPS 需要服主使用相同的服务身份重新提供 HTTPS 邀请，不会自动跨 origin 搬运秘密。

## 六、导入邀请与权限边界

聊天室是默认关闭的实验性组件，需要在商店逐项手动启用；「全部启用」不会替你开启它。停用后隐藏入口并停止后续同步/发送，原配置、凭据和历史保留；已经提交给服务器的请求不能假称撤回。只有启用组件后，导入邀请才会激活连接。

1. 由管理员在受信任环境中私下取得 `owner-invite.txt` 的完整一行内容；不要把它当作公开加入链接。
2. 在扩展设置的「加入朋友的聊天室」或「使用另一份邀请」中粘贴，先检查域名和聊天 ID，再确认加入。
3. 以服务器返回的认证状态为准；保存邀请不代表认证成功，导入邀请也不会替你启动服务器。
4. 仅服主可以列出/创建/撤销成员邀请，以及创建、修改、归档空间和房间。普通成员仍可读取已授权目录、发送消息和使用已有的好友功能。
5. 邀请朋友时，让朋友先发来自己的聊天 ID，再为该 ID 创建独立邀请，私发给本人。成员邀请有效期为 30 天；对同一 ID 重新生成会撤销旧凭据，请明确告知对方并私下发送新邀请。
6. 默认空间、默认房间不能移除。其余空间/房间使用归档而不是删除历史；空间最多 16 个、启用房间总计最多 32 个，活跃受邀凭据总计最多 64 个。

服务在处理管理写请求前校验服主角色，不依赖前端隐藏按钮实现安全。同步长轮询等待会释放数据库锁，醒来后重新检查凭据与房间状态，避免撤销或归档后继续返回消息；这些变更需要更新服务端才会生效。

## 七、升级、备份和恢复

### 升级已有实例

- 先记录原服务用户、代码目录、`CHAT_DATA` 和端口；不要把上面的首次部署示例当成自动迁移命令。
- 备份旧服务文件、SQLite 和服主凭据；**不重新执行初始化**，也不修改现有成员的邀请来试错。
- 同时更新 `server.py`、`image_policy.py`、`protocol_contract.py`、`protocol.json`。`bootstrap.py` 可作为工具更新，但不要重新运行它。
- 经运营者确认后重启原服务，先检查本地与 HTTPS `/health`，再人工验证服主/成员权限、消息和图片。不要仅凭前端能预览图片判断发送成功。
- 本次默认端口统一为 `8788`；原来依赖默认 `19828` 的手工启动实例应显式保留 `CHAT_PORT=19828` 并核对代理，或在维护时统一调整两端。不会自动修改你的线上环境。

### 数据库在线备份

不要只复制正在运行的 `chat.sqlite3` 主文件。数据库使用 WAL；采用 SQLite backup API 取得完整快照。以下路径对应本文首次部署示例，旧实例需替换成自己的路径：

```bash
sudo install -d -o beaver-chat -g beaver-chat -m 0700 /srv/beaver-chat/backups
sudo -u beaver-chat python3 - <<'PY'
import os
import sqlite3
import tempfile
from pathlib import Path

folder = Path('/srv/beaver-chat/backups')
fd, name = tempfile.mkstemp(prefix='chat-', suffix='.sqlite3', dir=folder)
os.close(fd)
with sqlite3.connect('file:/srv/beaver-chat/data/chat.sqlite3?mode=ro', uri=True) as source:
    with sqlite3.connect(name) as target:
        source.backup(target)
os.chmod(name, 0o600)
print('Created protected database snapshot:', Path(name).name)
PY
```

只有程序正常完成的快照才可用于恢复；失败时保留现场并核查，不把半成品当成功备份。另由管理员把 `/etc/beaver-chat/` 中的两个凭据文件备份到受保护、最好加密的离线存储，不放在 Git、网站根目录或公开共享盘。浏览器身份 ID、用户配置和本机历史的备份也应单独保存。

### 从完整备份恢复

1. 在维护窗口停止服务，确认旧进程已退出，避免活跃 WAL 与恢复文件混用。
2. 保留整个旧数据目录作为回退，不直接覆盖运行中的数据库；新建权限 `0700`、属于服务用户的数据目录。
3. 把已完成的 backup API 快照作为新目录的 `chat.sqlite3`，属主设为原服务用户、权限 `0600`。不要把旧目录的 WAL / SHM 文件混进新目录。
4. 恢复与该实例匹配的凭据文件和服务配置；凭据只在管理员受保护目录中操作，不粘贴到日志。
5. 启动后检查健康接口，再使用原浏览器身份与对应邀请验证。服务器数据恢复不能恢复一个已丢失的浏览器 UID。
6. 原服主 UID 已丢失时，旧邀请不能直接导入一个新 UID。本项目没有自动身份恢复工具；不要伪装原身份或重新初始化覆盖现场，需要单独授权并设计服主身份重绑。

凭据泄露时，恢复旧备份并不能撤回已被窃取的 Token。应暂停服务、保留备份、轮换受影响的服主凭据，并审查/撤销可能由被盗服主身份生成的成员邀请。单独轮换服主 Token 不会自动撤销数据库里所有成员 Token；本项目不提供一键恢复或轮换承诺。

## 八、常见问题与真实限制

| 现象 | 先检查什么 |
| --- | --- |
| 缺模块或启动失败 | 五个文件是否同版本、解释器是否为 3.12+、服务用户能否读源码和写数据目录 |
| 反代 502 | 服务是否启动、代理上游是否与实际 `CHAT_PORT` 一致 |
| HTTPS / 证书错误 | DNS、80 / 443、防火墙、证书域名和续期；不要关闭证书验证 |
| 401 | Token 是否被撤销、过期，或环境文件是否不属于原实例 |
| 403 | 当前凭据是否真是服主，而不是普通成员邀请 |
| 邀请 ID 不符 | 是否在原浏览器资料与原扩展安装中操作；不是让你修改 ID 去冒用邀请 |
| 413 | 代理和服务体积上限是否匹配；图片原字节最大 1 MiB，JSON 最大 2 MiB |
| 429 | 成员限流或代理限流；不要持续重试制造更多请求 |
| 507 | 数据目录容量；先备份并由运营者处理，不随意删除消息数据库 |
| 前端已选图但未发送 | 服务端是否升级、是否协商了图片能力、是否收到服务器保存确认 |

检查 `systemctl status` 与受保护的服务日志时，不公开粘贴环境文件、邀请或用户消息。状态中出现活动进程也不等于权限和双端通信已经验收。

### 当前安全与隐私边界

- 当前是 HTTP 增量同步，不是 WebSocket。可见窗口请求 `wait=6`，正常轮询完成后再间隔约 2.5 秒；隐藏窗口约 10 秒，失败有退避。浏览器后台仍可能暂停。
- 应用有成员级频率限制（每分钟 180 个计数请求）、64 个并发连接槽与 30 秒 socket 超时。**没有应用层单 IP 限流或自动异常封禁**；需要在可信反向代理/网络边缘另行配置，也不能把有限连接槽当成完整防 DoS 方案。
- 群主 Token 做常数时间比对；成员 Token 在库中存 SHA-256 摘要。消息内容仍由服主服务器保存，不提供端到端加密。
- 默认数据库软上限约 1 GiB，发送消息时检查数据库与 WAL 等文件体积；不是严格磁盘配额，也不保证限制所有管理数据增长。没有自动过期清理或无限容量承诺。
- 图片只接受经过文件头/尺寸检查的 PNG/JPEG/GIF/WebP Data URL；原字节最多 1 MiB，最长边 8192，约 1600 万像素。不是完整解码、元数据清除或病毒扫描；Base64 会增加体积。
- 本地目录、浏览器授权、分类索引和服务器消息不是同一份数据；备份其中一个不代表备份其余内容。
- 能力契约、图片队列与兼容说明见 [CHAT_CAPABILITIES.md](../../docs/CHAT_CAPABILITIES.md)。旧实例只更新前端不能获得新服务端能力或权限修复。

已在 Windows Python 3.13 的临时回环服务中，使用合成身份完成管理权限、消息隔离、小 PNG 保存/同步、两条长轮询并行以及等待中撤销/归档的接口观察；不是断言或无头 E2E，也没有使用线上凭据。这不代表已经部署，或完成 Linux、生产负载、防 DoS、真实浏览器双端/图片显示与硬件验收。远端变更、恢复、密钥轮换与实际邀请测试必须由运营者另行授权。
