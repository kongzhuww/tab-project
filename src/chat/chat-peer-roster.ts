import { ref } from "vue";
import type { PeerInfo } from "./p2p-transport";

// Local record of direct peers, not an authoritative group membership/permission list.
const revision = ref(0);
export const rosterError = ref("");
const prefix = "lw_chat_room_peers_v1_";
export function roomPeers(scope: string): PeerInfo[] {
  void revision.value;
  try {
    const rows = JSON.parse(localStorage.getItem(prefix + scope) || "[]");
    if (!Array.isArray(rows)) return [];
    return rows.filter(p => p && typeof p.uid === "string" && p.uid.length <= 160 && typeof p.name === "string" && typeof p.avatar === "string").slice(-100);
  } catch { return []; }
}
export function rememberRoomPeers(scope: string, peers: PeerInfo[]): void {
  if (!peers.length) return;
  const merged = new Map(roomPeers(scope).map(p => [p.uid, p]));
  for (const p of peers) merged.set(p.uid, { uid: p.uid, name: p.name.slice(0, 100), avatar: p.avatar.slice(0, 500), connectedAt: p.connectedAt });
  try {
    localStorage.setItem(prefix + scope, JSON.stringify([...merged.values()].slice(-100)));
    revision.value++;
    rosterError.value = "";
  } catch { rosterError.value = "本房间的直连联系人未能保存，请检查浏览器存储。"; }
}
if (typeof window !== "undefined") window.addEventListener("storage", e => {
  if (!e.key || e.key.startsWith(prefix)) revision.value++;
});
