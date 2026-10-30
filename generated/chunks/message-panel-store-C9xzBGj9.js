import { c as M } from "./view-styles-D_56CpcO.js";
import { r as N, s as O } from "./vendor-vue-DokqDua_.js";
const w = "biliLocallyKnownMessageIdsV1", r = N({
  isOpen: !1,
  loading: !1,
  userAvatar: "assets/bilibili.svg",
  userName: "哔哩哔哩用户",
  userMid: "",
  activeKind: "reply",
  unreadCounts: {
    reply: 0,
    at: 0,
    like: 0,
    system: 0,
    private: 0
  },
  items: [],
  emptyText: ""
}), T = O(() => {
  const t = r.unreadCounts;
  return (t.reply || 0) + (t.at || 0) + (t.like || 0) + (t.system || 0) + (t.private || 0);
}), b = /* @__PURE__ */ new Set();
async function v() {
  if (typeof chrome < "u" && chrome?.storage?.local)
    try {
      const n = (await chrome.storage.local.get([w]))?.[w];
      if (n && typeof n == "object") return n;
    } catch {
    }
  return {};
}
async function $(t, n, i) {
  if (!(typeof chrome > "u" || !chrome?.storage?.local))
    try {
      const o = await v(), a = Array.isArray(o[t]) ? [...o[t]] : [];
      n && !a.includes(n) && a.push(n), i && !a.includes(i) && a.push(i), o[t] = a, await chrome.storage.local.set({ [w]: o });
    } catch {
    }
}
async function C(t, n, i = []) {
  if (!(typeof chrome > "u" || !chrome?.storage?.local))
    try {
      const o = await v(), a = new Set(Array.isArray(o[t]) ? o[t] : []);
      for (const s of n) s && a.add(s);
      for (const s of i) s && a.add(s);
      const l = Number(r.unreadCounts[t] || 0);
      if (a.size < l) {
        const s = l - a.size;
        for (let m = 0; m < s; m++) a.add(`__pad_${Date.now()}_${m}`);
      }
      o[t] = Array.from(a), await chrome.storage.local.set({ [w]: o });
    } catch {
    }
}
async function A(t, n = 1, i) {
  if (!t) return !1;
  try {
    const o = await M.getBiliJct();
    if (!o) return !1;
    const a = new URLSearchParams({
      talker_id: String(t),
      session_type: String(n || 1),
      csrf: o,
      csrf_token: o,
      build: "0",
      mobi_app: "web"
    });
    return i && a.set("ack_seqno", String(i)), (await (await fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/update_ack", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      credentials: "include",
      body: a
    })).json())?.code === 0;
  } catch {
    return !1;
  }
}
async function _(t) {
  r.activeKind = t, r.loading = !0, r.emptyText = "";
  try {
    const n = await v(), i = new Set(Array.isArray(n[t]) ? n[t] : []), o = Number(r.unreadCounts[t] || 0) <= 0;
    let a = [];
    if (t === "reply") {
      const s = await (await fetch("https://api.bilibili.com/x/msgfeed/reply?platform=web&build=0&mobi_app=web", { credentials: "include" })).json();
      a = (Array.isArray(s?.data?.items) ? s.data.items : []).map((e) => {
        const f = String(e.id || e.cursor || Math.random());
        return {
          id: f,
          title: e.user?.nickname || "回复了你",
          content: e.item?.source_content || e.item?.target_reply_content || e.item?.title || "",
          time: e.reply_time ? new Date(e.reply_time * 1e3).toLocaleString() : "",
          avatar: e.user?.avatar || "assets/bilibili.svg",
          url: e.item?.uri || (e.item?.subject_id ? `https://www.bilibili.com/video/av${e.item.subject_id}` : "https://message.bilibili.com/"),
          isKnown: o || i.has(f)
        };
      });
    } else if (t === "at") {
      const s = await (await fetch("https://api.bilibili.com/x/msgfeed/at?build=0&mobi_app=web", { credentials: "include" })).json();
      a = (Array.isArray(s?.data?.items) ? s.data.items : []).map((e) => {
        const f = String(e.id || Math.random());
        return {
          id: f,
          title: e.user?.nickname ? `@${e.user.nickname}` : "@了我",
          content: e.item?.source_content || e.item?.title || "",
          time: e.at_time ? new Date(e.at_time * 1e3).toLocaleString() : "",
          avatar: e.user?.avatar || "assets/bilibili.svg",
          url: e.item?.uri || "https://message.bilibili.com/",
          isKnown: o || i.has(f)
        };
      });
    } else if (t === "like") {
      const s = await (await fetch("https://api.bilibili.com/x/msgfeed/like?platform=web&build=0&mobi_app=web", { credentials: "include" })).json();
      a = (Array.isArray(s?.data?.total?.items) ? s.data.total.items : Array.isArray(s?.data?.items) ? s.data.items : []).map((e) => {
        const f = Array.isArray(e.users) && e.users.length ? e.users[0] : null, c = e.users?.map((y) => y.nickname).filter(Boolean).join("、") || "B站用户", d = String(e.id || Math.random());
        return {
          id: d,
          title: `${c} 赞了你`,
          content: e.item?.title || e.item?.desc || e.item?.business || "点赞了你的评论或动态",
          time: e.like_time ? new Date(e.like_time * 1e3).toLocaleString() : "",
          avatar: f?.avatar || "assets/bilibili.svg",
          url: e.item?.uri || "https://message.bilibili.com/",
          isKnown: o || i.has(d)
        };
      });
    } else if (t === "system") {
      let l = [];
      try {
        const m = await (await fetch("https://message.bilibili.com/api/notify/query.sysnotify.list.do?data_type=1&page_size=20", { credentials: "include" })).text();
        if (m.trim().startsWith("{")) {
          const e = JSON.parse(m);
          l = Array.isArray(e?.data) ? e.data : Array.isArray(e?.data?.result) ? e.data.result : [];
        }
      } catch {
      }
      if (!l.length)
        try {
          const m = await (await fetch("https://api.vc.bilibili.com/sys_msg/v1/sys_msg/query_notify_list?page_size=20&build=0&mobi_app=web", { credentials: "include" })).text();
          if (m.trim().startsWith("{")) {
            const e = JSON.parse(m);
            l = Array.isArray(e?.data) ? e.data : Array.isArray(e?.data?.result) ? e.data.result : [];
          }
        } catch {
        }
      a = l.map((s) => {
        const m = String(s.id || s.cursor || Math.random());
        return {
          id: m,
          title: s.title || "系统通知",
          content: String(s.content || s.text || s.msg || "").replace(/<[^>]+>/g, ""),
          time: s.time ? typeof s.time == "number" ? new Date(s.time * 1e3).toLocaleString() : String(s.time) : "",
          avatar: "assets/bilibili.svg",
          url: s.url || s.link || "https://message.bilibili.com/",
          isKnown: o || i.has(m)
        };
      });
    } else if (t === "private") {
      const s = await (await fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/get_sessions?session_type=1&group_fold=1&unfollow_fold=0&sort_rule=2&build=0&mobi_app=web", { credentials: "include" })).json(), m = Array.isArray(s?.data?.session_list) ? s.data.session_list : [], e = m.map((c) => c.talker_id).filter(Boolean), f = /* @__PURE__ */ new Map();
      if (e.length > 0)
        try {
          const d = await (await fetch(`https://api.vc.bilibili.com/account/v1/user/cards?uids=${e.slice(0, 50).join(",")}`, { credentials: "include" })).json(), y = Array.isArray(d?.data) ? d.data : [];
          for (const p of y) {
            const g = String(p.mid || p.uid || "");
            g && f.set(g, {
              name: p.name || p.uname || "",
              avatar: p.face || p.avatar || ""
            });
          }
        } catch {
        }
      a = m.map((c) => {
        let d = "", y;
        try {
          const h = typeof c.last_msg?.content == "string" ? c.last_msg.content.trim() : "";
          if (h.startsWith("{") && h.endsWith("}")) {
            const u = JSON.parse(h);
            if (u && typeof u == "object")
              if (typeof u.url == "string" && u.url.trim())
                y = u.url.trim().replace(/^http:/, "https:"), d = u.text || "[图片]";
              else if (u.title) {
                const L = u.attach_msg?.content ? ` · ${u.attach_msg.content}` : "";
                d = `[视频分享] ${u.title}${L}`;
              } else (u.content || u.text) && (d = u.content || u.text);
          } else
            d = h;
        } catch {
          d = String(c.last_msg?.content || "");
        }
        if (!y && d.startsWith("{") && d.includes('"url"'))
          try {
            const h = JSON.parse(d);
            typeof h?.url == "string" && h.url.trim() && (y = h.url.trim().replace(/^http:/, "https:"), d = h.text || "[图片]");
          } catch {
          }
        !d && !y && (d = "一条私信消息");
        const p = String(c.talker_id || ""), g = f.get(p), K = g?.name ? g.name : `用户 ${p}`, j = g?.avatar ? g.avatar.replace(/^http:/, "https:") : "assets/bilibili.svg", S = String(c.session_ts || c.talker_id || Math.random()), x = Number(c.unread_count || 0) > 0, k = i.has(S) || p && i.has(p), I = o || !x || !!k;
        return {
          id: S,
          talkerId: p,
          sessionType: Number(c.session_type || 1),
          ackSeqno: c.last_msg?.msg_seqno || c.max_seqno || c.ack_seqno,
          title: K,
          content: d,
          image: y,
          time: c.session_ts ? new Date(Number(String(c.session_ts).slice(0, 13))).toLocaleString() : "",
          avatar: j,
          url: `https://message.bilibili.com/#/whisper/mid${c.talker_id}`,
          isKnown: I
        };
      });
    }
    r.items = a, a.length === 0 && (r.emptyText = "暂无相关互动消息");
  } catch (n) {
    r.emptyText = `获取消息失败：${n?.message || "网络错误"}`;
  } finally {
    r.loading = !1;
  }
}
const q = {
  get state() {
    return r;
  },
  updateState(t) {
    Object.assign(r, t);
  },
  openPanel() {
    r.isOpen = !0, r.items.length === 0 && !r.loading && _(r.activeKind);
  },
  closePanel() {
    r.isOpen = !1, this.dispatch("close");
  },
  togglePanel(t) {
    const n = t !== void 0 ? t : !r.isOpen;
    r.isOpen = n, n ? r.items.length === 0 && !r.loading && _(r.activeKind) : this.dispatch("close");
  },
  switchKind(t) {
    _(t);
  },
  markAllKnown(t) {
    r.unreadCounts[t] = 0;
    const n = r.items.filter((a) => !a.isKnown);
    if (r.items.forEach((a) => a.isKnown = !0), t === "private") {
      const a = n.filter((l) => !!l.talkerId).map((l) => A(l.talkerId, l.sessionType || 1, l.ackSeqno));
      Promise.allSettled(a);
    }
    const i = n.map((a) => a.id).filter(Boolean), o = n.map((a) => a.talkerId).filter(Boolean);
    C(t, i, o), this.dispatch("mark-all-known", { kind: t, ids: i, talkerIds: o });
  },
  markKnown(t, n) {
    const i = r.items.find((o) => o.id === n);
    i && !i.isKnown && (i.isKnown = !0, r.unreadCounts[t] > 0 && r.unreadCounts[t]--, t === "private" && i.talkerId && A(i.talkerId, i.sessionType || 1, i.ackSeqno), $(t, n, i?.talkerId), this.dispatch("mark-known", { kind: t, id: n, talkerId: i?.talkerId }));
  },
  setLoading(t) {
    r.loading = t;
  },
  setItems(t) {
    r.items = [...t];
  },
  onAction(t) {
    return b.add(t), () => {
      b.delete(t);
    };
  },
  dispatch(t, n) {
    for (const i of b)
      try {
        i(t, n);
      } catch (o) {
        console.error(`[BiliMessagePanel] Handler error for action ${t}:`, o);
      }
  }
};
export {
  w as BILI_LOCAL_KNOWN_KEY,
  A as ackPrivateSession,
  q as biliMessagePanelController,
  r as biliMessagePanelState,
  v as getStoredKnownIds,
  _ as loadBiliMessages,
  T as unreadTotal
};
