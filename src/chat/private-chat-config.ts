import { reactive, computed } from "vue";
import { validatePrivateRoom, type PrivateRoom } from "./private-chat-identity";
export { validatePrivateRoom } from "./private-chat-identity";
export type { PrivateRoom } from "./private-chat-identity";
const KEY = "lw_private_chat_v1";
export const privateChatConfig = reactive<{ room: PrivateRoom | null; diagnostic: string }>({ room: null, diagnostic: "" });
export function reloadPrivatePublicConfig(): void {
  let room: PrivateRoom | null = null;
  let diagnostic = "";
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === null) diagnostic = "当前浏览器配置中没有保存聊天室连接。请确认使用的是原来的浏览器用户和插件，或重新导入自己的邀请。";
    else {
      try { room = validatePrivateRoom(JSON.parse(raw)); }
      catch { diagnostic = "已保存的聊天室配置格式无效，原记录未删除。请重新导入自己的邀请。"; }
    }
  } catch { diagnostic = "无法读取本机存储，请检查浏览器是否限制存储访问。"; }
  privateChatConfig.diagnostic = diagnostic;
  if (JSON.stringify(room) !== JSON.stringify(privateChatConfig.room)) privateChatConfig.room = room;
}
reloadPrivatePublicConfig();
// Other tabs may save an invitation after this module has initialized.
window.addEventListener("storage", event => { if (event.key === KEY || event.key === null) reloadPrivatePublicConfig(); });
window.addEventListener("focus", reloadPrivatePublicConfig);
export const privateChatConfigured = computed(() => !!privateChatConfig.room);
export function privateEndpoint(c: PrivateRoom): string { return c.origin.replace(/^http:/, "ws:").replace(/^https:/, "wss:") + "/ws?room=" + encodeURIComponent(c.room); }
export function savePrivatePublicConfig(c: PrivateRoom): void {
  const validated = validatePrivateRoom(c);
  localStorage.setItem(KEY, JSON.stringify(validated));
  privateChatConfig.diagnostic = "";
  privateChatConfig.room = validated;
}
export function disablePrivateChat(): void {
  localStorage.removeItem(KEY); privateChatConfig.room = null;
  privateChatConfig.diagnostic = "已停用本机连接；聊天记录和凭证未删除，重新导入邀请可启用。";
}
