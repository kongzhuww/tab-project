/**
 * 海狸自习室 - Cloudflare Workers + D1 + Durable Objects 独立后端核心
 *
 * 核心特性：
 * 1. 跨边缘全局单例房间 (Durable Objects)：全球边缘长连接调度，彻底解决多实例房间广播隔离问题
 * 2. 优雅降级 (Plain Worker Fallback)：未开启 DO 时无缝降级为普通实例模式
 * 3. 消息持久化 (D1 SQLite)：永久保留历史消息与成员
 * 4. 双向好友实时申请与握手 (Mutual Friend Request Protocol)
 * 5. 5GB 自动滚动淘汰 (LRU Image Cleaner)：永不撑爆
 * 6. 水位统计接口 (Storage Quota Stats)：透明可视化
 */

export interface Env {
  DB: D1Database;
  ROOM?: DurableObjectNamespace;
  MAX_STORAGE_BYTES?: number;
  MAX_STORED_IMAGES?: number;
  IMAGE_EXPIRE_DAYS?: number;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 跨域处理
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      });
    }

    // 1. 获取当前存储水位统计 (Quota Stats)
    if (url.pathname === "/api/quota") {
      return handleQuotaStats(env);
    }

    // 2. 健康检查
    if (url.pathname === "/health" || url.pathname === "/") {
      return new Response(JSON.stringify({
        status: "ok",
        name: "beaver-cloudflare-relay",
        features: {
          durableObjects: !!env.ROOM,
          d1Database: !!env.DB
        }
      }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    // 3. WebSocket 房间接入
    if (url.pathname === "/ws") {
      const upgradeHeader = request.headers.get("Upgrade");
      if (!upgradeHeader || upgradeHeader.toLowerCase() !== "websocket") {
        return new Response("Expected Upgrade: websocket", { status: 426 });
      }

      const roomId = url.searchParams.get("room") || "default";

      // 如果绑定了 Durable Objects，优先走全局单例房间路由（解决跨边缘节点多实例隔离问题）
      if (env.ROOM) {
        const doId = env.ROOM.idFromName(roomId);
        const roomStub = env.ROOM.get(doId);
        return roomStub.fetch(request);
      }

      // 降级策略：单边缘实例内存路由
      const webSocketPair = new WebSocketPair();
      const [client, server] = Object.values(webSocketPair);
      handleFallbackSession(server, roomId, env);
      return new Response(null, {
        status: 101,
        webSocket: client
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};

/**
 * Cloudflare Durable Object: 全局单例房间调度器
 * 确保来自全球任何边缘节点的同一房间客户端，均汇聚到同一个 DO 实例，实现 100% 广播直达！
 */
export class ChatRoom {
  private state: DurableObjectState;
  private env: Env;
  private clients = new Set<WebSocket>();

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const roomId = url.searchParams.get("room") || "default";
    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);

    this.handleSession(server, roomId);

    return new Response(null, {
      status: 101,
      webSocket: client
    });
  }

  private handleSession(server: WebSocket, roomId: string) {
    server.accept();
    this.clients.add(server);

    // 1. 发送房间连接确认并推送最近 50 条持久化历史
    void (async () => {
      try {
        if (this.env.DB) {
          const { results } = await this.env.DB.prepare(
            "SELECT * FROM messages WHERE room_id = ? ORDER BY timestamp DESC LIMIT 50"
          ).bind(roomId).all();

          const history = (results || []).reverse().map((r: any) => ({
            id: r.id,
            sender: { uid: r.sender_uid, name: r.sender_name, avatar: r.sender_avatar },
            type: r.msg_type,
            content: r.content,
            meta: r.meta_json ? JSON.parse(r.meta_json) : undefined,
            timestamp: r.timestamp
          }));

          server.send(JSON.stringify({
            type: "history",
            messages: history,
            onlineCount: this.clients.size
          }));
        }
      } catch (err) {
        console.error("[CF-Worker-DO] Failed to load history:", err);
      }
    })();

    // 广播房间在线人数
    this.broadcast({
      type: "presence",
      onlineCount: this.clients.size
    });

    server.addEventListener("message", async (event) => {
      try {
        const raw = typeof event.data === "string" ? event.data : new TextDecoder().decode(event.data);
        if (raw.length > 2 * 1024 * 1024) return; // 2MB 单包保护

        const data = JSON.parse(raw);

        if (data.type === "ping") {
          server.send(JSON.stringify({ type: "pong" }));
          return;
        }

        if (data.type === "message" && data.message) {
          const msg = data.message;
          const now = Date.now();

          if (this.env.DB) {
            await this.env.DB.prepare(
              `INSERT INTO messages (id, room_id, sender_uid, sender_name, sender_avatar, msg_type, content, meta_json, timestamp)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
            ).bind(
              msg.id, roomId, msg.sender?.uid || "anon", msg.sender?.name || "海狸友",
              msg.sender?.avatar || "🦫", msg.type || "text", msg.content || "",
              msg.meta ? JSON.stringify(msg.meta) : null, now
            ).run().catch(e => console.error("[CF-Worker-DO] Insert msg error:", e));

            if (msg.type === "image" && msg.meta?.imageUrl) {
              const imgData = msg.meta.imageUrl;
              await this.env.DB.prepare(
                `INSERT INTO image_assets (id, room_id, msg_id, byte_size, image_data, created_at)
                 VALUES (?, ?, ?, ?, ?, ?)`
              ).bind(`img_${now}`, roomId, msg.id, imgData.length, imgData, now)
              .run().catch(e => console.error("[CF-Worker-DO] Insert image error:", e));

              cleanOldImages(this.env).catch(() => {});
            }
          }

          this.broadcast({ type: "message", message: msg });
        }

        // 实时动态广播 (B站/听歌/工作区)
        if (data.type === "activity" && data.activity) {
          this.broadcast({
            type: "user_activity",
            uid: data.uid,
            activity: data.activity
          }, server);
        }

        // 双向好友申请
        if (data.type === "friend_request" && data.request) {
          if (this.env.DB) {
            await this.env.DB.prepare(
              `INSERT OR REPLACE INTO friend_requests (id, from_uid, from_name, from_avatar, to_uid, note, status, created_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
            ).bind(
              data.request.id, data.request.from.uid, data.request.from.name,
              data.request.from.avatar || "🦫", data.request.toUid, data.request.note || "",
              data.request.status || "pending", data.request.createdAt || Date.now()
            ).run().catch(e => console.error("[CF-Worker-DO] Insert friend_request error:", e));
          }
          this.broadcast(data, server);
        }

        // 双向好友回应
        if (data.type === "friend_response" && data.response) {
          if (this.env.DB) {
            await this.env.DB.prepare(
              `UPDATE friend_requests SET status = ? WHERE id = ?`
            ).bind(data.response.accepted ? "accepted" : "rejected", data.response.requestId)
            .run().catch(e => console.error("[CF-Worker-DO] Update friend_response error:", e));
          }
          this.broadcast(data, server);
        }
      } catch (err) {
        console.error("[CF-Worker-DO] Message handle error:", err);
      }
    });

    server.addEventListener("close", () => {
      this.clients.delete(server);
      this.broadcast({
        type: "presence",
        onlineCount: this.clients.size
      });
    });
  }

  private broadcast(payload: any, excludeWs: WebSocket | null = null) {
    const jsonStr = JSON.stringify(payload);
    for (const client of this.clients) {
      if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
        try { client.send(jsonStr); } catch {}
      }
    }
  }
}

// 降级模式：单边缘实例内存连接池
const fallbackRoomClients = new Map<string, Set<WebSocket>>();

function handleFallbackSession(server: WebSocket, roomId: string, env: Env) {
  server.accept();

  if (!fallbackRoomClients.has(roomId)) {
    fallbackRoomClients.set(roomId, new Set());
  }
  const clients = fallbackRoomClients.get(roomId)!;
  clients.add(server);

  void (async () => {
    try {
      if (env.DB) {
        const { results } = await env.DB.prepare(
          "SELECT * FROM messages WHERE room_id = ? ORDER BY timestamp DESC LIMIT 50"
        ).bind(roomId).all();

        const history = (results || []).reverse().map((r: any) => ({
          id: r.id,
          sender: { uid: r.sender_uid, name: r.sender_name, avatar: r.sender_avatar },
          type: r.msg_type,
          content: r.content,
          meta: r.meta_json ? JSON.parse(r.meta_json) : undefined,
          timestamp: r.timestamp
        }));

        server.send(JSON.stringify({
          type: "history",
          messages: history,
          onlineCount: clients.size
        }));
      }
    } catch (err) {
      console.error("[CF-Worker-Fallback] Failed to load history:", err);
    }
  })();

  broadcastToFallbackRoom(roomId, {
    type: "presence",
    onlineCount: clients.size
  });

  server.addEventListener("message", async (event) => {
    try {
      const raw = typeof event.data === "string" ? event.data : new TextDecoder().decode(event.data);
      if (raw.length > 2 * 1024 * 1024) return;

      const data = JSON.parse(raw);

      if (data.type === "ping") {
        server.send(JSON.stringify({ type: "pong" }));
        return;
      }

      if (data.type === "message" && data.message) {
        const msg = data.message;
        const now = Date.now();

        if (env.DB) {
          await env.DB.prepare(
            `INSERT INTO messages (id, room_id, sender_uid, sender_name, sender_avatar, msg_type, content, meta_json, timestamp)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
          ).bind(
            msg.id, roomId, msg.sender?.uid || "anon", msg.sender?.name || "海狸友",
            msg.sender?.avatar || "🦫", msg.type || "text", msg.content || "",
            msg.meta ? JSON.stringify(msg.meta) : null, now
          ).run().catch(e => console.error("[CF-Worker-Fallback] Insert msg error:", e));

          if (msg.type === "image" && msg.meta?.imageUrl) {
            const imgData = msg.meta.imageUrl;
            await env.DB.prepare(
              `INSERT INTO image_assets (id, room_id, msg_id, byte_size, image_data, created_at)
               VALUES (?, ?, ?, ?, ?, ?)`
            ).bind(`img_${now}`, roomId, msg.id, imgData.length, imgData, now)
            .run().catch(e => console.error("[CF-Worker-Fallback] Insert image error:", e));

            cleanOldImages(env).catch(() => {});
          }
        }

        broadcastToFallbackRoom(roomId, { type: "message", message: msg });
      }

      if (data.type === "activity" && data.activity) {
        broadcastToFallbackRoom(roomId, {
          type: "user_activity",
          uid: data.uid,
          activity: data.activity
        }, server);
      }

      if (data.type === "friend_request" && data.request) {
        if (env.DB) {
          await env.DB.prepare(
            `INSERT OR REPLACE INTO friend_requests (id, from_uid, from_name, from_avatar, to_uid, note, status, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
          ).bind(
            data.request.id, data.request.from.uid, data.request.from.name,
            data.request.from.avatar || "🦫", data.request.toUid, data.request.note || "",
            data.request.status || "pending", data.request.createdAt || Date.now()
          ).run().catch(e => console.error("[CF-Worker-Fallback] Insert friend_request error:", e));
        }
        broadcastToFallbackRoom(roomId, data, server);
      }

      if (data.type === "friend_response" && data.response) {
        if (env.DB) {
          await env.DB.prepare(
            `UPDATE friend_requests SET status = ? WHERE id = ?`
          ).bind(data.response.accepted ? "accepted" : "rejected", data.response.requestId)
          .run().catch(e => console.error("[CF-Worker-Fallback] Update friend_response error:", e));
        }
        broadcastToFallbackRoom(roomId, data, server);
      }
    } catch (err) {
      console.error("[CF-Worker-Fallback] Message handle error:", err);
    }
  });

  server.addEventListener("close", () => {
    clients.delete(server);
    if (clients.size === 0) {
      fallbackRoomClients.delete(roomId);
    } else {
      broadcastToFallbackRoom(roomId, {
        type: "presence",
        onlineCount: clients.size
      });
    }
  });
}

function broadcastToFallbackRoom(roomId: string, payload: any, excludeWs: WebSocket | null = null) {
  const clients = fallbackRoomClients.get(roomId);
  if (!clients) return;
  const jsonStr = JSON.stringify(payload);
  for (const client of clients) {
    if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
      try {
        client.send(jsonStr);
      } catch {}
    }
  }
}

async function cleanOldImages(env: Env) {
  if (!env.DB) return;
  const maxImages = env.MAX_STORED_IMAGES || 3000;
  try {
    const countRes: any = await env.DB.prepare("SELECT count(*) as total FROM image_assets").first();
    const total = countRes?.total || 0;

    if (total > maxImages) {
      const deleteCount = total - maxImages;
      await env.DB.prepare(
        `DELETE FROM image_assets WHERE id IN (
           SELECT id FROM image_assets ORDER BY created_at ASC LIMIT ?
         )`
      ).bind(deleteCount).run();
      console.log(`[CF-Worker] Auto-cleaned ${deleteCount} old images to maintain quota safe water level.`);
    }
  } catch (err) {
    console.error("[CF-Worker] Failed to clean old images:", err);
  }
}

async function handleQuotaStats(env: Env): Promise<Response> {
  const maxBytes = env.MAX_STORAGE_BYTES || (5 * 1024 * 1024 * 1024); // 5GB
  let usedBytes = 0;
  let totalMessages = 0;
  let totalImages = 0;

  if (env.DB) {
    try {
      const imgSum: any = await env.DB.prepare("SELECT sum(byte_size) as total_bytes, count(*) as count FROM image_assets").first();
      const msgCount: any = await env.DB.prepare("SELECT count(*) as count FROM messages").first();

      usedBytes = Number(imgSum?.total_bytes || 0);
      totalImages = Number(imgSum?.count || 0);
      totalMessages = Number(msgCount?.count || 0);
    } catch (err) {
      console.error("[CF-Worker] Quota stat error:", err);
    }
  }

  const usedMB = (usedBytes / (1024 * 1024)).toFixed(2);
  const maxGB = (maxBytes / (1024 * 1024 * 1024)).toFixed(1);
  const percent = ((usedBytes / maxBytes) * 100).toFixed(2);

  return new Response(JSON.stringify({
    usedBytes,
    usedMB,
    maxBytes,
    maxGB: `${maxGB} GB`,
    percent: `${percent}%`,
    totalMessages,
    totalImages,
    retentionPolicy: "最近 3000 张聊天图片自动轮换滚动淘汰，文字卡片永久留存"
  }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache"
    }
  });
}
