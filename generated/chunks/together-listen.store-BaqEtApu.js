import { a2 as o, a1 as A, h as I, a3 as j, a4 as H, a5 as U, a6 as O, a7 as x } from "./search.service-gzbpg5BD.js";
import { b as N } from "./radio-player-CCUSmV1E.js";
import { n as p } from "./github.service-BkChs4sP.js";
import { w as $, r as F, s as S } from "./vendor-vue-C-_ocEUS.js";
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
function _(t, s, a) {
  const e = s.meta;
  if (s.type !== "music_party" || !e || !["switch", "play", "pause", "seek", "stop", "transfer_dj"].includes(String(e.partyAction))) return null;
  if (e.partyAction === "stop") return { ...v(a), timestamp: s.timestamp };
  const i = e.partySource;
  if (!["siren", "netease", "bilibili"].includes(String(i)) || typeof e.partyTrackId != "string" || !e.partyTrackId || e.partyTrackId.length > 160 || typeof e.partyTitle != "string" || !e.partyTitle || e.partyTitle.length > 500) return null;
  const n = e.partyAction === "transfer_dj";
  return n && (typeof e.partyNewHostUid != "string" || !e.partyNewHostUid || e.partyNewHostUid.length > 160) ? null : {
    isActive: !0,
    roomId: a,
    hostUid: n ? e.partyNewHostUid : s.sender.uid,
    hostName: n ? String(e.partyNewHostName || "海狸群友").slice(0, 100) : s.sender.name,
    track: {
      source: i,
      trackId: e.partyTrackId,
      title: e.partyTitle,
      artist: String(e.partyArtist || "未知歌手").slice(0, 500),
      cover: typeof e.partyCover == "string" ? e.partyCover : "",
      url: typeof e.partyUrl == "string" ? e.partyUrl : void 0
    },
    position: n && t.isActive ? t.position : typeof e.partyPosition == "number" && Number.isFinite(e.partyPosition) ? Math.max(0, e.partyPosition) : 0,
    timestamp: n && t.isActive ? t.timestamp : s.timestamp,
    isPlaying: n && t.isActive ? t.isPlaying : e.partyAction !== "pause",
    listenersCount: typeof e.partyListenersCount == "number" && Number.isFinite(e.partyListenersCount) ? Math.max(1, Math.min(65, Math.floor(e.partyListenersCount))) : 1
  };
}
class E {
  constructor() {
    this.scopes = /* @__PURE__ */ new Map();
  }
  accept(s, a, e) {
    let i = this.scopes.get(s);
    return i || (i = { sequence: 0, ids: /* @__PURE__ */ new Set() }, this.scopes.set(s, i), this.scopes.size > 32 && this.scopes.delete(this.scopes.keys().next().value)), e !== void 0 && e <= i.sequence || (e !== void 0 && (i.sequence = e), i.ids.has(a)) ? !1 : (i.ids.add(a), i.ids.size > 512 && i.ids.delete(i.ids.values().next().value), !0);
  }
}
const r = F({
  ...v(),
  isJoined: !1,
  djModalOpen: !1
}), f = S(() => O()), l = S(() => f.value?.scope || ""), g = new E();
let M = "", d = !1, m = !1, y = 0, P = "";
const T = (t) => JSON.stringify([l.value, t.source, t.trackId]);
function b(t, s = !0) {
  s && ++y, Object.assign(r, t), t.isActive || (P = "", r.isJoined = !1);
}
$(l, () => {
  ++y, M = "", d = !1, m = !1, P = "", Object.assign(
    r,
    v(f.value?.channel),
    { isJoined: !1, djModalOpen: !1 }
  );
}, { immediate: !0, flush: "sync" });
function L() {
  const t = f.value;
  if (!t || !U.ready || U.scope !== t.scope || M === t.scope || d) return;
  M = t.scope;
  let s = v(t.channel);
  for (const a of o.messages) {
    const e = _(s, a, t.channel);
    e && (s = e, g.accept(t.scope, a.id));
  }
  b(s);
}
$(
  () => [l.value, U.scope, U.ready],
  L,
  { immediate: !0 }
);
const W = S(() => !r.isActive || !r.hostUid || r.hostUid === o.currentUser.uid);
function X() {
  r.djModalOpen = !0;
}
function Y() {
  r.djModalOpen = !1;
}
async function R(t, s) {
  const a = f.value;
  if (!a || !r.isActive || !r.track) return;
  d = !0, m = !0, r.hostUid = t, r.hostName = s;
  const e = {
    id: `msg_party_dj_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    sender: {
      uid: o.currentUser.uid,
      name: o.currentUser.name,
      avatar: o.currentUser.avatar
    },
    type: "music_party",
    content: `🎛️ 【${o.currentUser.name}】已将打碟机播控权移交给了【${s}】！`,
    meta: {
      partySource: r.track?.source,
      partyTrackId: r.track?.trackId,
      partyTitle: r.track?.title,
      partyArtist: r.track?.artist,
      partyCover: r.track?.cover,
      partyUrl: r.track?.url,
      partyPosition: r.position,
      partyAction: "transfer_dj",
      partyNewHostUid: t,
      partyNewHostName: s,
      partyListenersCount: r.listenersCount,
      silentPartySync: !0
      // 静默同频通知所有人更新 DJ 归属
    },
    timestamp: Date.now()
  };
  try {
    if (g.accept(a.scope, e.id), await j(e), a.scope !== l.value || r.hostUid !== t) return;
    p.fetch("海狸调音台", "播控权已移交", `已将打碟机控制权交给【${s}】`);
  } catch (i) {
    console.warn("[TogetherListen] 广播移交控制权失败:", i);
  }
}
async function Z() {
  await R(o.currentUser.uid, o.currentUser.name);
}
async function z(t, s = "switch", a = !1) {
  const e = f.value;
  if (!e) {
    p.fetch("海狸一起听", "尚未进入有效聊天室", "请先配置并进入要广播的房间。");
    return;
  }
  if (d = !0, m = !0, r.isActive = !0, r.isJoined = !0, r.roomId = H.channel, r.hostUid = o.currentUser.uid, r.hostName = o.currentUser.name, r.track = { ...t }, r.position = 0, r.timestamp = Date.now(), r.isPlaying = s !== "pause", r.listenersCount = Math.max(r.listenersCount, 1), s === "stop" ? D() : (s === "pause" || s === "play") && P === T(t) ? (++y, J(t.source, 0, s === "play")) : k(t, 0), e.scope !== l.value) return;
  const i = {
    id: `msg_party_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    sender: {
      uid: o.currentUser.uid,
      name: o.currentUser.name,
      avatar: o.currentUser.avatar
    },
    type: "music_party",
    content: s === "stop" ? `⏹️ 【${o.currentUser.name}】结束了本次海狸音乐派对。` : a ? `🎧 【${o.currentUser.name}】发起了海狸音乐派对，邀请大家一起听《${t.title}》！` : `[同频同步] 《${t.title}》`,
    meta: {
      partySource: t.source,
      partyTrackId: t.trackId,
      partyTitle: t.title,
      partyArtist: t.artist,
      partyCover: t.cover,
      partyUrl: t.url,
      partyPosition: 0,
      partyAction: s,
      partyListenersCount: r.listenersCount,
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
  const t = r.track, s = l.value;
  if (!s || !r.isActive || !t) return;
  d = !0, m = !0, r.isJoined = !0;
  const a = Math.max(0, (Date.now() - r.timestamp) / 1e3), e = r.position + (r.isPlaying ? a : 0);
  await k(t, e), !(s !== l.value || !r.isJoined || r.track !== t) && p.fetch(
    "海狸一起听",
    `已加入音乐派对：${r.track.title}`,
    `当前正在与【${r.hostName}】同步收听。`
  );
}
function tt() {
  r.isJoined = !1, d = !0, m = !0, ++y, p.fetch("海狸一起听", "已退出一起听", "你现在可以独立控制播放。");
}
function D() {
  d = !0, m = !0, b(v(f.value?.channel));
}
async function et(t = !0) {
  const s = l.value;
  if (t && r.track)
    try {
      await z(r.track, "stop", !0);
    } catch {
    }
  s === l.value && (t && r.isActive || (D(), p.fetch("海狸调音台", "派对已结束", "已关闭一起听音乐广播。")));
}
function q(t, s) {
  const a = f.value;
  if (!a || s.scope !== a.scope || s.channel !== a.channel) return;
  const e = _(r, t, a.channel);
  if (!e || !g.accept(s.scope, t.id, s.sequence) || (d = !0, s.source === "history" && m)) return;
  const i = r.isActive, n = r.track?.source === e.track?.source && r.track?.trackId === e.track?.trackId;
  if (b(e, !(n && t.meta?.partyAction === "transfer_dj")), s.source !== "live") return;
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
      `【${r.hostName}】已接管 DJ 调音台打碟控制权。`
    );
    return;
  }
  const c = r.track;
  if (c)
    if (r.isJoined) {
      I.setTrack(c.title, c.artist, c.cover);
      const h = Math.max(0, (Date.now() - r.timestamp) / 1e3), u = r.position + (r.isPlaying ? h : 0);
      !n || t.meta?.partyAction === "switch" || P !== T(c) ? k(c, t.meta?.partyAction === "switch" ? 0 : u) : J(c.source, u, r.isPlaying);
    } else !i && !t.meta?.silentPartySync && p.fetch(
      "海狸音乐派对",
      `【${t.sender.name}】发起了《${c.title}》`,
      "点击群内卡片或顶栏即可一键加入一起听！"
    );
}
async function rt(t) {
  L();
  const s = r.track;
  if (t.meta?.partyAction === "stop" || !r.isActive || !s) {
    p.fetch("海狸一起听", "该邀请当前不可加入", "派对已结束或状态尚未恢复，请查看当前一起听状态。");
    return;
  }
  if (t.meta?.partySource !== s.source || t.meta?.partyTrackId !== s.trackId) {
    p.fetch("海狸一起听", "曲目已经更新", "这是一张旧邀请，请通过当前一起听顶栏加入。");
    return;
  }
  await K();
}
async function k(t, s) {
  const a = ++y, e = l.value, i = T(t), n = () => a === y && e === l.value && r.isJoined && r.isActive && r.track?.source === t.source && r.track?.trackId === t.trackId, c = { isCurrent: n, autoplay: r.isPlaying }, h = (u) => {
    if (!n()) return;
    P = i;
    const w = u.src, C = () => {
      if (n() && u.src === w && Number.isFinite(s) && s > 0)
        try {
          u.currentTime = s;
        } catch {
        }
    };
    u.readyState >= 1 ? C() : u.addEventListener("loadedmetadata", C, { once: !0 });
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
    n() && I.setTrack(t.title, t.artist, t.cover);
  } catch {
    n() && p.fetch("海狸一起听", "本地播放未就绪", "请检查音源或点击播放，不会自动重复广播。");
  }
}
function J(t, s, a) {
  const e = t === "bilibili" ? N.getAudioElement() : A.getAudioElement();
  if (!e) return;
  const i = y, n = l.value, c = e.src, h = () => i === y && n === l.value && r.isJoined && e.src === c, u = () => {
    if (h() && Number.isFinite(s) && s >= 0 && Math.abs(e.currentTime - s) > 4)
      try {
        e.currentTime = s;
      } catch {
      }
  };
  e.readyState >= 1 ? u() : e.addEventListener("loadedmetadata", u, { once: !0 }), a && e.paused ? e.play().catch(() => {
  }) : !a && !e.paused && e.pause();
}
x(q);
export {
  R as a,
  Z as b,
  Y as c,
  z as d,
  rt as e,
  D as f,
  W as i,
  K as j,
  tt as l,
  X as o,
  et as s,
  r as t
};
