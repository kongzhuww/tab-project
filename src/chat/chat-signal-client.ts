import { reactive, watch } from "vue";
import { chatModuleState as state, joinChatEndpoint, setTransportMode } from "./chat-state";
import { p2pCoordinator } from "./p2p-transport";

export interface SignalMember { id: string; uid: string; name: string; role: "owner" | "member"; expiresAt: number; revoked: boolean; online: boolean }
interface Config { endpoint: string; token: string; uid: string }
export const signalState = reactive({ status: "未启用自动连线", connected: false, role: "", members: [] as SignalMember[], enabled: false });
const uidValid = (v: unknown): v is string => typeof v === "string" && /^[A-Za-z0-9_-]{1,160}$/.test(v);
export function signalEndpoint(raw: string): string {
  const u = new URL(raw);
  if (u.protocol !== "wss:" || u.username || u.password || u.hash || !/^\/rooms\/[a-f0-9-]{36}\/ws$/.test(u.pathname)) throw new Error("信令地址格式无效");
  const room = u.pathname.split("/")[2];
  u.search = ""; u.searchParams.set("room", room);
  return u.href;
}
function roomOf(endpoint: string): string { return new URL(endpoint).pathname.split("/")[2]; }
function isSignalEndpoint(raw: string): boolean { try { return signalEndpoint(raw) === raw; } catch { return false; } }
let dbPromise: Promise<IDBDatabase> | undefined;
function db(): Promise<IDBDatabase> {
  return dbPromise ||= new Promise<IDBDatabase>((resolve, reject) => {
    const r = indexedDB.open("lw-chat-signal-credentials", 2);
    r.onupgradeneeded = () => {
      if (!r.result.objectStoreNames.contains("config")) r.result.createObjectStore("config", { keyPath: "endpoint" });
      if (!r.result.objectStoreNames.contains("roster")) r.result.createObjectStore("roster", { keyPath: "endpoint" });
    };
    r.onsuccess = () => { r.result.onversionchange = () => { r.result.close(); dbPromise = undefined; }; resolve(r.result); };
    r.onerror = () => reject(r.error);
    r.onblocked = () => { signalState.status = "信令凭证存储被旧窗口阻塞，请关闭旧窗口后重试"; };
  }).catch(e => { dbPromise = undefined; throw e; });
}
async function config(endpoint: string): Promise<Config | undefined> {
  const d = await db();
  return new Promise((resolve, reject) => {
    const tx = d.transaction("config", "readonly"); const r = tx.objectStore("config").get(endpoint);
    tx.oncomplete = () => resolve(r.result); tx.onabort = () => reject(tx.error); r.onerror = () => reject(r.error);
  });
}
async function save(c: Config): Promise<void> {
  const d = await db();
  return new Promise((resolve, reject) => {
    const tx = d.transaction("config", "readwrite"); tx.objectStore("config").put(c);
    tx.oncomplete = () => resolve(); tx.onabort = () => reject(tx.error); tx.onerror = () => reject(tx.error);
  });
}
export function previewSignalInvite(raw: string): Config {
  if (!raw.startsWith("BEAVER-SIGNAL1:") || raw.length > 8000) throw new Error("信令邀请格式无效");
  const c = JSON.parse(decodeURIComponent(atob(raw.slice(15))));
  if (!uidValid(c.uid) || !/^[A-Za-z0-9_-]{43}$/.test(c.token)) throw new Error("信令邀请格式无效");
  return { endpoint: signalEndpoint(c.endpoint), token: c.token, uid: c.uid };
}
export async function joinSignalInvite(raw: string): Promise<void> {
  const c = previewSignalInvite(raw);
  if (c.uid !== state.currentUser.uid) throw new Error("邀请绑定的 UID 与当前账号不同，请让群主为本账号重新创建");
  await save(c);
  setTransportMode("p2p");
  if (!joinChatEndpoint(c.endpoint, roomOf(c.endpoint))) throw new Error("无法切换信令房间");
  restartSignal();
}
async function rosterCache(endpoint: string, members?: SignalMember[]): Promise<SignalMember[]> {
  const d = await db();
  return new Promise((resolve, reject) => {
    const tx = d.transaction("roster", members ? "readwrite" : "readonly");
    const store = tx.objectStore("roster");
    const r = members ? store.put({ endpoint, members: JSON.parse(JSON.stringify(members.map(m => ({ ...m, online: false })))) }) : store.get(endpoint);
    tx.oncomplete = () => {
      const value = members || r.result?.members;
      resolve(Array.isArray(value) ? value.slice(0, 32) : []);
    };
    tx.onabort = () => reject(tx.error); r.onerror = () => reject(r.error);
  });
}
function invitation(c: Config): string { return "BEAVER-SIGNAL1:" + btoa(encodeURIComponent(JSON.stringify(c))); }
async function request(url: string, token: string, method: string, data?: unknown): Promise<any> {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const r = await fetch(url, { method, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: data === undefined ? undefined : JSON.stringify(data), signal: controller.signal, redirect: "error", credentials: "omit", referrerPolicy: "no-referrer", cache: "no-store" });
    if (!r.ok) throw new Error(`操作未确认（${r.status}），请刷新成员列表核对，不要直接重复创建`);
    const raw = await r.text(); if (raw.length > 65536) throw new Error("服务响应过大");
    return JSON.parse(raw);
  } finally { clearTimeout(timer); }
}
export async function createSignalRoom(origin: string, createKey: string, name: string): Promise<void> {
  const u = new URL(origin);
  if (u.protocol !== "https:" || u.username || u.password || u.search || u.hash || u.pathname !== "/") throw new Error("请输入 HTTPS 信令服务根地址");
  const uid = state.currentUser.uid;
  const result = await request(u.origin + "/rooms", createKey, "POST", { uid, name });
  if (!/^[a-f0-9-]{36}$/.test(result.roomId) || !/^[A-Za-z0-9_-]{43}$/.test(result.token)) throw new Error("服务器返回格式无效");
  const c = { endpoint: signalEndpoint(u.origin.replace("https:", "wss:") + `/rooms/${result.roomId}/ws`), token: result.token, uid };
  await save(c);
  if (uid !== state.currentUser.uid) throw new Error("账号已切换，房间凭证已保存，未自动加入");
  setTransportMode("p2p"); joinChatEndpoint(c.endpoint, result.roomId); restartSignal();
}
async function currentConfig(): Promise<Config> {
  const endpoint = state.serverUrl, uid = state.currentUser.uid;
  const c = await config(endpoint);
  if (!c || c.uid !== uid || endpoint !== state.serverUrl || uid !== state.currentUser.uid) throw new Error("当前账号没有此信令房间的凭证");
  return c;
}
function api(c: Config): string { const u = new URL(c.endpoint); u.protocol = "https:"; u.search = ""; u.pathname = u.pathname.replace(/\/ws$/, "/members"); return u.href; }
export async function createSignalMember(uid: string, name: string): Promise<string> {
  if (!uidValid(uid)) throw new Error("请输入朋友的完整 UID");
  const c = await currentConfig(); const r = await request(api(c), c.token, "POST", { uid, name, days: 30 });
  if (!/^[A-Za-z0-9_-]{43}$/.test(r.token)) throw new Error("服务器返回格式无效");
  return invitation({ endpoint: c.endpoint, token: r.token, uid });
}
export async function revokeSignalMember(id: string): Promise<void> {
  if (!/^[a-f0-9-]{36}$/.test(id)) throw new Error("成员标识无效");
  const c = await currentConfig(); await request(api(c) + "/" + id, c.token, "DELETE");
}
let socket: WebSocket | undefined, epoch = 0, retries = 0;
let retryTimer: ReturnType<typeof setTimeout> | undefined, heartbeat: ReturnType<typeof setInterval> | undefined;
let connectTimer: ReturnType<typeof setTimeout> | undefined;
let lastFrame = 0;
const attempts = new Map<string, number>();
let handshakes = Promise.resolve();
function stop(): void {
  epoch++; clearTimeout(retryTimer); clearTimeout(connectTimer); clearInterval(heartbeat);
  if (socket) { socket.onopen = socket.onmessage = socket.onerror = socket.onclose = null; socket.close(); socket = undefined; }
  signalState.connected = false; signalState.members = []; signalState.role = "";
  attempts.clear();
}
export function restartSignal(): void { retries = 0; void start(); }
async function start(): Promise<void> {
  stop(); const generation = epoch;
  signalState.enabled = state.transportMode === "p2p" && isSignalEndpoint(state.serverUrl);
  if (!signalState.enabled) { p2pCoordinator.restrictPeers(null); signalState.status = "未启用自动连线"; return; }
  p2pCoordinator.restrictPeers([]);
  signalState.status = "正在连接信令（不转发聊天内容）";
  try {
    const c = await currentConfig();
    const cached = await rosterCache(c.endpoint).catch(() => []);
    if (generation !== epoch) return;
    signalState.members = cached.map(m => ({ ...m, online: false }));
    const ws = new WebSocket(c.endpoint, ["beaver-signal-v1", "auth." + c.token]); socket = ws;
    connectTimer = setTimeout(() => { if (generation === epoch && !signalState.connected) ws.close(); }, 15000);
    const send = (to: string, ticket: any) => { if (generation === epoch && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "signal", to, ticket })); };
    const initiate = async () => {
      for (const m of signalState.members) {
        if (generation !== epoch || !signalState.connected) return;
        if (!m.online || c.uid >= m.uid || p2pCoordinator.hasPeer(m.uid) || (attempts.get(m.uid) || 0) >= 3) continue;
        attempts.set(m.uid, (attempts.get(m.uid) || 0) + 1);
        try { const ticket = JSON.parse(await p2pCoordinator.createOffer(m.uid, true)); send(m.uid, ticket); }
        catch { if (generation === epoch) signalState.status = "直连协商失败；本服务不中转，请检查双方网络"; }
      }
    };
    ws.onmessage = event => {
      if (generation !== epoch || typeof event.data !== "string" || event.data.length > 80000) return;
      lastFrame = Date.now();
      try {
        const d = JSON.parse(event.data);
        if (d.type === "ready") {
          if (d.uid !== c.uid) { ws.close(4003, "identity_mismatch"); return; }
          clearTimeout(connectTimer); signalState.connected = true; signalState.role = d.role === "owner" ? "owner" : "member";
          signalState.status = "信令已连接，正在尝试 P2P；直连失败时不中转";
        } else if (d.type === "roster" && signalState.connected && Array.isArray(d.members) && d.members.length <= 32) {
          signalState.members = d.members.filter((m: SignalMember) => uidValid(m?.uid) && typeof m.id === "string" && typeof m.name === "string");
          void rosterCache(c.endpoint, signalState.members).catch(() => { if (generation === epoch) signalState.status = "信令在线，但成员缓存未能保存"; });
          p2pCoordinator.restrictPeers(signalState.members.filter(m => m.online && m.uid !== c.uid).map(m => m.uid));
          handshakes = handshakes.then(initiate).catch(() => {});
        } else if (d.type === "signal" && signalState.connected && d.ticket?.roomId === roomOf(c.endpoint) && signalState.members.some(m => m.uid === d.from && m.online)) {
          handshakes = handshakes.then(async () => {
            if (generation !== epoch) return;
            const t = d.ticket;
            if (t.from?.uid !== d.from || t.toUid !== c.uid) return;
            // Scope comes from the selected local endpoint, not arbitrary remote input.
            t.roomId = p2pCoordinator.getRoom();
            if (t.type === "offer" && d.from < c.uid) {
              const answer = JSON.parse(await p2pCoordinator.handleOffer(JSON.stringify(t), true)); send(d.from, answer);
            } else if (t.type === "answer" && d.from > c.uid) await p2pCoordinator.handleAnswer(JSON.stringify(t), true);
          }).catch(() => { if (generation === epoch) signalState.status = "P2P 协商未完成；可重试自动连线，不会切换到中转"; });
        }
      } catch { /* Invalid frames are not applied. */ }
    };
    ws.onopen = () => {
      lastFrame = Date.now();
      heartbeat = setInterval(() => {
        if (generation !== epoch) return;
        if (Date.now() - lastFrame > 65000) { ws.close(); return; }
        if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "ping" }));
        handshakes = handshakes.then(initiate).catch(() => {});
        if ([...attempts].some(([uid, count]) => count >= 3 && !p2pCoordinator.hasPeer(uid))) signalState.status = "部分成员直连失败，已达尝试上限；当前未启用中转，可手动重试";
      }, 20000);
    };
    ws.onerror = () => { signalState.status = "信令连接异常，请检查地址、凭证和网络可达性"; };
    ws.onclose = e => {
      if (generation !== epoch) return;
      clearTimeout(connectTimer); clearInterval(heartbeat); signalState.connected = false;
      signalState.members = signalState.members.map(m => ({ ...m, online: false })); p2pCoordinator.restrictPeers([]);
      if ([4001, 4003].includes(e.code)) { signalState.status = e.code === 4001 ? "已由另一个窗口接管；本窗口不自动抢回" : "成员凭证被撤销或已过期"; return; }
      if (++retries > 8) { signalState.status = "信令重连已暂停，请检查服务及凭证后手动重试"; return; }
      signalState.status = `信令断开，等待第 ${retries}/8 次重连；P2P 已暂停`;
      retryTimer = setTimeout(() => { if (generation === epoch) void start(); }, Math.min(30000, 1000 * 2 ** retries) + Math.random() * 500);
    };
  } catch { if (generation === epoch) signalState.status = "没有可用的本房间凭证或存储不可用，请粘贴绑定当前 UID 的邀请"; }
}
let installed = false;
export function installSignalClient(): void {
  if (installed) return; installed = true;
  watch(() => JSON.stringify([state.serverUrl, state.currentRoomId, state.currentUser.uid, state.transportMode]), () => restartSignal(), { immediate: true, flush: "post" });
}
