import { d as v, o as $, e as M, f, g as d, F as _, i as A, k as R, q as z, t as x, s as B, b as U } from "./vendor-vue-_upDT3S_.js";
import { _ as j } from "./_plugin-vue_export-helper-DtNgUcga.js";
const k = /[.,;:!?，。；：！？\s]+$/;
let m = null, g = null;
const b = /* @__PURE__ */ new Set();
function S() {
  for (const e of b)
    try {
      e();
    } catch {
    }
}
function C(e) {
  return b.add(e), () => b.delete(e);
}
function D(e) {
  const t = {};
  if (e?.emote && typeof e.emote == "object")
    for (const [r, s] of Object.entries(e.emote)) {
      const n = s?.url || s?.gif_url;
      typeof n == "string" && n && (t[r] = n.replace(/^http:/i, "https:"));
    }
  return t;
}
function H(e) {
  const t = {};
  if (e?.at_name_to_mid && typeof e.at_name_to_mid == "object")
    for (const [r, s] of Object.entries(e.at_name_to_mid)) {
      const n = String(r || "").trim(), p = s != null ? String(s).trim() : "";
      n && /^\d+$/.test(p) && (t[n] = p);
    }
  if (Array.isArray(e?.members))
    for (const r of e.members) {
      const s = String(r?.uname || "").trim(), n = r?.mid !== void 0 && r?.mid !== null ? String(r.mid).trim() : "";
      s && /^\d+$/.test(n) && !t[s] && (t[s] = n);
    }
  return t;
}
async function I() {
  return m && m.size > 0 ? m : (m || (m = /* @__PURE__ */ new Map()), g ? (await g, m) : (g = (async () => {
    try {
      const t = await (await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", {
        credentials: "include"
      })).json();
      if (t?.code === 0 && Array.isArray(t?.data?.packages)) {
        let r = !1;
        for (const s of t.data.packages)
          if (Array.isArray(s.emote))
            for (const n of s.emote)
              n.text && (n.url || n.gif_url) && (m.set(n.text, String(n.url || n.gif_url).replace(/^http:/i, "https:")), r = !0);
        r && S();
      }
    } catch {
    } finally {
      g = null;
    }
  })(), await g, m));
}
typeof window < "u" && I();
function N(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Z(e) {
  const t = /* @__PURE__ */ new Map();
  if (!e) return t;
  const r = e instanceof Map ? e.entries() : Object.entries(e);
  for (const [s, n] of r) {
    const p = String(s || "").trim(), u = n != null ? String(n).trim() : "";
    p && /^\d+$/.test(u) && t.set(p, u);
  }
  return t;
}
function E(e, t, r) {
  if (!e) return [];
  const s = (i) => {
    if (t instanceof Map) {
      if (t.has(i)) return t.get(i);
    } else if (t && typeof t == "object" && i in t)
      return t[i];
    return m?.get(i);
  }, n = Z(r), p = Array.from(n.keys()).sort((i, o) => o.length - i.length), u = [
    // 1. 标准 HTTP/HTTPS 链接（或常见裸域名如 github.com/xxx, bilibili.com/xxx）
    `(?<url>(?:https?:\\/\\/|(?<![\\w@])(?:[a-zA-Z0-9-]+\\.)+(?:com|cn|net|org|io|me|cc|tv|xyz|top|app|dev|site|vip)(?:\\/[^\\s\\u4e00-\\u9fa5<>"'()\\[\\]]*)?)[^\\s\\u4e00-\\u9fa5<>"'()\\[\\]]*)`,
    // 2. GitHub 仓库标记文本: GitHub - user/repo 或 GitHub: user/repo
    "(?<gh>GitHub\\s*[-–—:]\\s*(?<ghUser>[A-Za-z0-9_.\\-]+)\\/(?<ghRepo>[A-Za-z0-9_.\\-]+))",
    // 3. B站视频号: BV 或 av
    "(?<bvid>\\b(?:BV1[0-9A-Za-z]{9}|av\\d{4,12})\\b)",
    // 4. 表情短码: [xxx]（支持带空格的装扮/动态表情名）
    "(?<emote>\\[[^\\]\\r\\n]{1,64}\\])"
  ];
  if (p.length > 0) {
    const i = p.map(N).join("|");
    u.push(
      `(?<![A-Za-z0-9_.])@(?<knownMention>${i})(?=$|[\\s:：,，;；!！?？\\[\\]<>()（）"'~·。])`
    );
  }
  u.push("(?<![A-Za-z0-9_.])@(?<mention>[A-Za-z0-9_\\-\\u4e00-\\u9fa5\\u3040-\\u30ff]{1,32})");
  const l = new RegExp(u.join("|"), "g"), c = [];
  let h = 0, y;
  for (; (y = l.exec(e)) !== null; ) {
    y.index > h && c.push({ type: "text", text: e.slice(h, y.index) });
    const i = y.groups || {};
    if (i.url) {
      const o = i.url, a = o.replace(k, ""), w = /^https?:\/\//i.test(a) ? a : `https://${a}`;
      c.push({ type: "link", text: a, url: w }), a.length < o.length && c.push({ type: "text", text: o.slice(a.length) });
    } else if (i.gh && i.ghUser && i.ghRepo)
      c.push({
        type: "link",
        text: i.gh,
        url: `https://github.com/${i.ghUser}/${i.ghRepo}`
      });
    else if (i.bvid) {
      const o = i.bvid;
      c.push({
        type: "link",
        text: o,
        url: `https://www.bilibili.com/video/${o}`
      });
    } else if (i.emote) {
      const o = i.emote, a = s(o);
      a ? c.push({ type: "emote", text: o, url: a }) : c.push({ type: "text", text: o });
    } else if (i.knownMention) {
      const o = i.knownMention, a = n.get(o);
      c.push({
        type: "mention",
        text: `@${o}`,
        url: a ? `https://space.bilibili.com/${a}` : `https://search.bilibili.com/upuser?keyword=${encodeURIComponent(o)}`
      });
    } else if (i.mention) {
      const o = i.mention, a = n.get(o);
      c.push({
        type: "mention",
        text: `@${o}`,
        url: a ? `https://space.bilibili.com/${a}` : `https://search.bilibili.com/upuser?keyword=${encodeURIComponent(o)}`
      });
    }
    h = l.lastIndex;
  }
  return h < e.length && c.push({ type: "text", text: e.slice(h) }), c;
}
const L = { class: "bili-rich-text" }, T = ["href", "title"], G = ["src", "alt", "title"], O = { key: 2 }, F = /* @__PURE__ */ v({
  __name: "BiliRichText",
  props: {
    text: {},
    emotes: {},
    mentions: {}
  },
  setup(e) {
    const t = e, r = U(0);
    let s = null;
    $(() => {
      s = C(() => {
        r.value += 1;
      });
    }), M(() => {
      s?.(), s = null;
    });
    const n = B(() => (r.value, E(t.text || "", t.emotes, t.mentions)));
    return (p, u) => (f(), d("span", L, [
      (f(!0), d(_, null, A(n.value, (l, c) => (f(), d(_, { key: c }, [
        l.type === "link" || l.type === "mention" ? (f(), d("a", {
          key: 0,
          class: z(["bili-rich-link", { "bili-rich-mention": l.type === "mention" }]),
          href: l.url,
          target: "_blank",
          rel: "noopener noreferrer",
          title: l.type === "mention" ? `前往 ${l.text} 的B站主页` : l.url,
          onClick: u[0] || (u[0] = R(() => {
          }, ["stop"]))
        }, x(l.text), 11, T)) : l.type === "emote" && l.url ? (f(), d("img", {
          key: 1,
          class: "bili-comment-emote",
          src: l.url,
          alt: l.text,
          title: l.text,
          loading: "lazy",
          referrerpolicy: "no-referrer"
        }, null, 8, G)) : (f(), d("span", O, x(l.text), 1))
      ], 64))), 128))
    ]));
  }
}), V = /* @__PURE__ */ j(F, [["__scopeId", "data-v-a06dbbc3"]]);
export {
  V as B,
  H as a,
  D as e
};
