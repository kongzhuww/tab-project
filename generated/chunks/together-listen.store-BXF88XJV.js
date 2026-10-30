import { n as p, M as A, h as b, N as o, O as H, Q as j, R as U, S as O, T as x } from "./view-styles-B1BFcrTI.js";
import { e as N } from "./bili-favorites-store-DAu7WALq.js";
import { r as F, x as S, y as $ } from "./vendor-vue-wIH4jcna.js";
function v(t = "") {
  return {
    isActive: !1,
    roomId: t,
    hostUid: "",
    hostName: "",
    track: null,
    position: 0,
    timestamp: 0,
    isPlaying: !1,
    listenersCount: 1
  };
}
function _(t, r, a) {
  const e = r.meta;
  if (r.type !== "music_party" || !e || !["switch", "play", "pause", "seek", "stop", "transfer_dj"].includes(String(e.partyAction))) return null;
  if (e.partyAction === "stop") return { ...v(a), timestamp: r.timestamp };
  const i = e.partySource;
  if (!["siren", "netease", "bilibili"].includes(String(i)) || typeof e.partyTrackId != "string" || !e.partyTrackId || e.partyTrackId.length > 160 || typeof e.partyTitle != "string" || !e.partyTitle || e.partyTitle.length > 500) return null;
  const n = e.partyAction === "transfer_dj";
  return n && (typeof e.partyNewHostUid != "string" || !e.partyNewHostUid || e.partyNewHostUid.length > 160) ? null : {
    isActive: !0,
    roomId: a,
    hostUid: n ? e.partyNewHostUid : r.sender.uid,
    hostName: n ? String(e.partyNewHostName || "海狸群友").slice(0, 100) : r.sender.name,
    track: {
      source: i,
      trackId: e.partyTrackId,
      title: e.partyTitle,
      artist: String(e.partyArtist || "未知歌手").slice(0, 500),
      cover: typeof e.partyCover == "string" ? e.partyCover : "",
      url: typeof e.partyUrl == "string" ? e.partyUrl : void 0
    },
    position: n && t.isActive ? t.position : typeof e.partyPosition == "number" && Number.isFinite(e.partyPosition) ? Math.max(0, e.partyPosition) : 0,
    timestamp: n && t.isActive ? t.timestamp : r.timestamp,
    isPlaying: n && t.isActive ? t.isPlaying : e.partyAction !== "pause",
    listenersCount: typeof e.partyListenersCount == "number" && Number.isFinite(e.partyListenersCount) ? Math.max(1, Math.min(65, Math.floor(e.partyListenersCount))) : 1
  };
}
class R {
  constructor() {
    this.scopes = /* @__PURE__ */ new Map();
  }
  accept(r, a, e) {
    let i = this.scopes.get(r);
    return i || (i = { sequence: 0, ids: /* @__PURE__ */ new Set() }, this.scopes.set(r, i), this.scopes.size > 32 && this.scopes.delete(this.scopes.keys().next().value)), e !== void 0 && e <= i.sequence || (e !== void 0 && (i.sequence = e), i.ids.has(a)) ? !1 : (i.ids.add(a), i.ids.size > 512 && i.ids.delete(i.ids.values().next().value), !0);
  }
}
const s = F({
  ...v(),
  isJoined: !1,
  djModalOpen: !1
}), f = S(() => O()), l = S(() => f.value?.scope || ""), g = new R();
let M = "", d = !1, m = !1, y = 0, P = "";
const T = (t) => JSON.stringify([l.value, t.source, t.trackId]);
function k(t, r = !0) {
  r && ++y, Object.assign(s, t), t.isActive || (P = "", s.isJoined = !1);
}
$(l, () => {
  ++y, M = "", d = !1, m = !1, P = "", Object.assign(
    s,
    v(f.value?.channel),
    { isJoined: !1, djModalOpen: !1 }
  );
}, { immediate: !0, flush: "sync" });
function L() {
  const t = f.value;
  if (!t || !U.ready || U.scope !== t.scope || M === t.scope || d) return;
  M = t.scope;
  let r = v(t.channel);
  for (const a of o.messages) {
    const e = _(r, a, t.channel);
    e && (r = e, g.accept(t.scope, a.id));
  }
  k(r);
}
$(
  () => [l.value, U.scope, U.ready],
  L,
  { immediate: !0 }
);
const G = S(() => !s.isActive || !s.hostUid || s.hostUid === o.currentUser.uid);
function W() {
  s.djModalOpen = !0;
}
function X() {
  s.djModalOpen = !1;
}
async function E(t, r) {
  const a = f.value;
  if (!a || !s.isActive || !s.track) return;
  d = !0, m = !0, s.hostUid = t, s.hostName = r;
  const e = {
    id: `msg_party_dj_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    sender: {
      uid: o.currentUser.uid,
      name: o.currentUser.name,
      avatar: o.currentUser.avatar
    },
    type: "music_party",
    content: `🎛️ 【${o.currentUser.name}】已将打碟机播控权移交给了【${r}】！`,
    meta: {
      partySource: s.track?.source,
      partyTrackId: s.track?.trackId,
      partyTitle: s.track?.title,
      partyArtist: s.track?.artist,
      partyCover: s.track?.cover,
      partyUrl: s.track?.url,
      partyPosition: s.position,
      partyAction: "transfer_dj",
      partyNewHostUid: t,
      partyNewHostName: r,
      partyListenersCount: s.listenersCount,
      silentPartySync: !0
      // 静默同频通知所有人更新 DJ 归属
    },
    timestamp: Date.now()
  };
  try {
    if (g.accept(a.scope, e.id), await j(e), a.scope !== l.value || s.hostUid !== t) return;
    p.fetch("海狸调音台", "播控权已移交", `已将打碟机控制权交给【${r}】`);
  } catch (i) {
    console.warn("[TogetherListen] 广播移交控制权失败:", i);
  }
}
async function Y() {
  await E(o.currentUser.uid, o.currentUser.name);
}
async function z(t, r = "switch", a = !1) {
  const e = f.value;
  if (!e) {
    p.fetch("海狸一起听", "尚未进入有效聊天室", "请先配置并进入要广播的房间。");
    return;
  }
  if (d = !0, m = !0, s.isActive = !0, s.isJoined = !0, s.roomId = H.channel, s.hostUid = o.currentUser.uid, s.hostName = o.currentUser.name, s.track = { ...t }, s.position = 0, s.timestamp = Date.now(), s.isPlaying = r !== "pause", s.listenersCount = Math.max(s.listenersCount, 1), r === "stop" ? D() : (r === "pause" || r === "play") && P === T(t) ? (++y, J(t.source, 0, r === "play")) : C(t, 0), e.scope !== l.value) return;
  const i = {
    id: `msg_party_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    sender: {
      uid: o.currentUser.uid,
      name: o.currentUser.name,
      avatar: o.currentUser.avatar
    },
    type: "music_party",
    content: r === "stop" ? `⏹️ 【${o.currentUser.name}】结束了本次海狸音乐派对。` : a ? `🎧 【${o.currentUser.name}】发起了海狸音乐派对，邀请大家一起听《${t.title}》！` : `[同频同步] 《${t.title}》`,
    meta: {
      partySource: t.source,
      partyTrackId: t.trackId,
      partyTitle: t.title,
      partyArtist: t.artist,
      partyCover: t.cover,
      partyUrl: t.url,
      partyPosition: 0,
      partyAction: r,
      partyListenersCount: s.listenersCount,
      silentPartySync: !a
      // 关键：只有显式拉人时才发卡片，切歌/暂停静默同频同步！
    },
    timestamp: Date.now()
  };
  try {
    g.accept(e.scope, i.id), await j(i);
  } catch (n) {
    console.warn("[TogetherListen] 广播派对状态失败:", n);
  }
}
async function K() {
  const t = s.track, r = l.value;
  if (!r || !s.isActive || !t) return;
  d = !0, m = !0, s.isJoined = !0;
  const a = Math.max(0, (Date.now() - s.timestamp) / 1e3), e = s.position + (s.isPlaying ? a : 0);
  await C(t, e), !(r !== l.value || !s.isJoined || s.track !== t) && p.fetch(
    "海狸一起听",
    `已加入音乐派对：${s.track.title}`,
    `当前正在与【${s.hostName}】同步收听。`
  );
}
function Z() {
  s.isJoined = !1, d = !0, m = !0, ++y, p.fetch("海狸一起听", "已退出一起听", "你现在可以独立控制播放。");
}
function D() {
  d = !0, m = !0, k(v(f.value?.channel));
}
async function tt(t = !0) {
  const r = l.value;
  if (t && s.track)
    try {
      await z(s.track, "stop", !0);
    } catch {
    }
  r === l.value && (t && s.isActive || (D(), p.fetch("海狸调音台", "派对已结束", "已关闭一起听音乐广播。")));
}
function Q(t, r) {
  const a = f.value;
  if (!a || r.scope !== a.scope || r.channel !== a.channel) return;
  const e = _(s, t, a.channel);
  if (!e || !g.accept(r.scope, t.id, r.sequence) || (d = !0, r.source === "history" && m)) return;
  const i = s.isActive, n = s.track?.source === e.track?.source && s.track?.trackId === e.track?.trackId;
  if (k(e, !(n && t.meta?.partyAction === "transfer_dj")), r.source !== "live") return;
  if (t.meta?.partyAction === "stop") {
    p.fetch(
      "海狸调音台",
      "一起听已结束",
      `【${t.sender.name}】已结束本次一起听派对。`
    );
    return;
  }
  if (t.meta?.partyAction === "transfer_dj") {
    p.fetch(
      "海狸调音台",
      "播控权已变更",
      `【${s.hostName}】已接管 DJ 调音台打碟控制权。`
    );
    return;
  }
  const c = s.track;
  if (c)
    if (s.isJoined) {
      b.setTrack(c.title, c.artist, c.cover);
      const h = Math.max(0, (Date.now() - s.timestamp) / 1e3), u = s.position + (s.isPlaying ? h : 0);
      !n || t.meta?.partyAction === "switch" || P !== T(c) ? C(c, t.meta?.partyAction === "switch" ? 0 : u) : J(c.source, u, s.isPlaying);
    } else !i && !t.meta?.silentPartySync && p.fetch(
      "海狸音乐派对",
      `【${t.sender.name}】发起了《${c.title}》`,
      "点击群内卡片或顶栏即可一键加入一起听！"
    );
}
async function et(t) {
  L();
  const r = s.track;
  if (t.meta?.partyAction === "stop" || !s.isActive || !r) {
    p.fetch("海狸一起听", "该邀请当前不可加入", "派对已结束或状态尚未恢复，请查看当前一起听状态。");
    return;
  }
  if (t.meta?.partySource !== r.source || t.meta?.partyTrackId !== r.trackId) {
    p.fetch("海狸一起听", "曲目已经更新", "这是一张旧邀请，请通过当前一起听顶栏加入。");
    return;
  }
  await K();
}
async function C(t, r) {
  const a = ++y, e = l.value, i = T(t), n = () => a === y && e === l.value && s.isJoined && s.isActive && s.track?.source === t.source && s.track?.trackId === t.trackId, c = { isCurrent: n, autoplay: s.isPlaying }, h = (u) => {
    if (!n()) return;
    P = i;
    const w = u.src, I = () => {
      if (n() && u.src === w && Number.isFinite(r) && r > 0)
        try {
          u.currentTime = r;
        } catch {
        }
    };
    u.readyState >= 1 ? I() : u.addEventListener("loadedmetadata", I, { once: !0 });
  };
  try {
    if (t.source === "bilibili")
      N.playQueue({
        name: `海狸一起听 · ${t.title}`,
        items: [{ bvid: t.trackId, title: t.title, cover: t.cover, author: t.artist }],
        startIndex: 0,
        ...c,
        onReady: h
      });
    else {
      const u = t.source === "netease" ? await A.playNeteaseSong({
        id: t.trackId,
        name: t.title,
        artists: [{ name: t.artist }],
        album: { picUrl: t.cover }
      }, c) : await A.playSong({
        cid: t.trackId,
        name: t.title,
        artists: [t.artist],
        coverUrl: t.cover
      }, c);
      if (!n() || !u) return;
      const w = A.getAudioElement();
      w && h(w);
    }
    n() && b.setTrack(t.title, t.artist, t.cover);
  } catch {
    n() && p.fetch("海狸一起听", "本地播放未就绪", "请检查音源或点击播放，不会自动重复广播。");
  }
}
function J(t, r, a) {
  const e = t === "bilibili" ? N.getAudioElement() : A.getAudioElement();
  if (!e) return;
  const i = y, n = l.value, c = e.src, h = () => i === y && n === l.value && s.isJoined && e.src === c, u = () => {
    if (h() && Number.isFinite(r) && r >= 0 && Math.abs(e.currentTime - r) > 4)
      try {
        e.currentTime = r;
      } catch {
      }
  };
  e.readyState >= 1 ? u() : e.addEventListener("loadedmetadata", u, { once: !0 }), a && e.paused ? e.play().catch(() => {
  }) : !a && !e.paused && e.pause();
}
x(Q);
export {
  Y as a,
  z as b,
  X as c,
  E as d,
  et as e,
  D as f,
  G as i,
  K as j,
  Z as l,
  W as o,
  tt as s,
  s as t
};
