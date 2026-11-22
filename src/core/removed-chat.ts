// Keys that belonged exclusively to the removed Beaver Chat module.
export const REMOVED_CHAT_KEYS = [
  "lw_private_chat_v1",
  "lw_chat_session_v1",
  "lw_chat_server_url",
  "lw_chat_server_explicit",
  "lw_chat_user_id",
  "lw_chat_user_name",
  "lw_chat_user_avatar",
  "lw_chat_groups",
  "lw_chat_current_group",
  "lw_chat_rooms",
  "lw_chat_friends",
  "lw_chat_friend_requests_v1",
  "lw_chat_transport_mode",
  "lw_chat_current_room",
] as const;

export async function removeRetiredChatStorage(): Promise<void> {
  if (typeof chrome === "undefined" || !chrome.storage?.local) return;
  await chrome.storage.local.remove([...REMOVED_CHAT_KEYS]);
}

export function removeRetiredChatPageStorage(): void {
  if (typeof localStorage === "undefined") return;
  for (const key of REMOVED_CHAT_KEYS) {
    localStorage.removeItem(key);
    localStorage.removeItem(`logicweaver:${key}`);
  }
  const dynamicPrefixes = ["lw_chat_room_history:", "lw_chat_peer_roster:"];
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const k = localStorage.key(i);
    if (k && dynamicPrefixes.some((prefix) => k.startsWith(prefix))) {
      keysToRemove.push(k);
    }
  }
  for (const k of keysToRemove) {
    localStorage.removeItem(k);
  }
}
