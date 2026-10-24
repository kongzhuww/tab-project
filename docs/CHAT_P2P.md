# 历史方案：海狸聊天室 WebRTC P2P

> **已被当前私有 HTTP 聊天链路取代，不是使用/部署指南。** 现行源码见 `src/chat/private-chat-client.ts` 与 [私有服务说明](../server/private-chat/README.md)，入口边界见 [CURRENT_STATE.md](CURRENT_STATE.md)。下方握手 UI、默认传输、STUN、费用/可达性与“实测”说法只保留原方案文本，不作为当前承诺或运行证据；不要恢复旧入口、交换连线码或据此修改现行服务。

## 1. 核心设计理念

传统的即时通讯软件强制依赖昂贵的中心服务器转发每一条消息与图片。当插件拥有海量用户时，服主面临极大的服务器租金成本、带宽费用和审查合规风险；同时国内直连海外 Serverless（如 `*.workers.dev`）存在 DNS 污染与 GFW 阻断导致频繁报 1006 的物理屏障。

**去中心化 WebRTC P2P 自习室** 彻底颠覆了这种模式：
- **0 服务器带宽成本**：文字、卡片、图片与听歌动态直接通过浏览器的 `RTCDataChannel` 点对点加密传输。
- **国内免翻极速直连**：配置国内大厂（腾讯、B站、小米）公开的高速 STUN 节点进行 NAT 打洞，局域网、校园网与公网穿透延迟低至毫秒级。
- **本地优先 (Local-First)**：IndexedDB 存储完整消息流，数据完全掌握在用户本机。
- **双模式插拔**：既支持 WebRTC P2P 直连（默认推荐），也保留 WebSocket 自定义中继模式，满足极客搭建私有节点的需求。

---

## 2. 公开免翻 STUN 节点池

在 `src/chat/p2p-transport.ts` 中内置了经过国内实测的高可用 STUN 节点：
1. `stun:stun.qq.com:4430`（腾讯公开节点，国内免翻，穿透极速）
2. `stun:stun.bilibili.com:443`（B站公开节点）
3. `stun:stun.chat.bilibili.com:443`（B站聊天公开节点）
4. `stun:stun.miwifi.com:3478`（小米公开路由器打洞节点）
5. `stun:stun1.l.google.com:19302`（全球备选节点）

---

## 3. 连线握手交互流程 (Signaling)

用户之间建立直连采用紧凑编码的连线名片（`BEAVER-P2P:...`）：

```
[用户 A] ---------------------------------------------> [用户 B]
1. 点击「复制我的连线名片」
   生成 Offer Ticket (带完整 ICE 候选)
                                                  2. 粘贴 Offer Ticket
                                                     生成 Answer Ticket 回应码
3. 粘贴 Answer Ticket
   完成 RTCPeerConnection 远程协商
=========================================================
      [P2P RTCDataChannel 直通隧道成功建立！]
   - 后续所有文字/图片/动态 100% 走两台电脑直连 -
```

---

## 4. 连接状态与监控

在聊天室顶栏与设置面板中：
- `🟢 P2P 直连 · N 位在线 (RTT: xx ms)`：展示连通人数与端到端实时网络延迟。
- DataChannel 内置每 15 秒轻量 Ping/Pong 探测，毫秒级感知对端在线与断开。
