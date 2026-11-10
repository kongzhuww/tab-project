import { d as x, o as p, e as u, F as h, g as y, h as _, t as d, s as g } from "./vendor-vue-9b0eS4bW.js";
import { _ as b } from "./_plugin-vue_export-helper-BxikU0LD.js";
const w = /[.,;:!?，。；：！？\s]+$/;
let r = null, f = null;
async function A() {
  return r && r.size > 0 ? r : (r || (r = /* @__PURE__ */ new Map()), f ? (await f, r) : (f = (async () => {
    try {
      const i = await (await fetch("https://api.bilibili.com/x/emote/user/panel/web?business=reply", {
        credentials: "include"
      })).json();
      if (i?.code === 0 && Array.isArray(i?.data?.packages)) {
        for (const c of i.data.packages)
          if (Array.isArray(c.emote))
            for (const a of c.emote)
              a.text && a.url && r.set(a.text, String(a.url).replace(/^http:/, "https:"));
      }
    } catch {
    } finally {
      f = null;
    }
  })(), await f, r));
}
typeof window < "u" && A();
function v(o, i) {
  if (!o) return [];
  const c = (e) => {
    if (i instanceof Map) {
      if (i.has(e)) return i.get(e);
    } else if (i && typeof i == "object" && e in i)
      return i[e];
    return r?.get(e);
  }, a = new RegExp(
    [
      // 1. 标准 HTTP/HTTPS 链接（或常见裸域名如 github.com/xxx, bilibili.com/xxx）
      `((?:https?:\\/\\/|(?<![\\w@])(?:[a-zA-Z0-9-]+\\.)+(?:com|cn|net|org|io|me|cc|tv|xyz|top|app|dev|site|vip)(?:\\/[^\\s\\u4e00-\\u9fa5<>"'()\\[\\]]*)?)[^\\s\\u4e00-\\u9fa5<>"'()\\[\\]]*)`,
      // 2. GitHub 仓库标记文本: GitHub - user/repo 或 GitHub: user/repo
      "(GitHub\\s*[-–—:]\\s*([A-Za-z0-9_.\\-]+)\\/([A-Za-z0-9_.\\-]+))",
      // 3. B站视频号: BV 或 av
      "(\\b(?:BV1[0-9A-Za-z]{9}|av\\d{4,12})\\b)",
      // 4. 表情短码: [xxx]
      "(\\[([^\\s\\]\\r\\n]{1,32})\\])"
    ].join("|"),
    "g"
  ), n = [];
  let t = 0, s;
  for (; (s = a.exec(o)) !== null; ) {
    if (s.index > t && n.push({ type: "text", text: o.slice(t, s.index) }), s[1]) {
      const e = s[1], l = e.replace(w, ""), m = /^https?:\/\//i.test(l) ? l : `https://${l}`;
      n.push({ type: "link", text: l, url: m }), l.length < e.length && n.push({ type: "text", text: e.slice(l.length) });
    } else if (s[2]) {
      const e = s[3], l = s[4];
      n.push({
        type: "link",
        text: s[2],
        url: `https://github.com/${e}/${l}`
      });
    } else if (s[5]) {
      const e = s[5];
      n.push({
        type: "link",
        text: e,
        url: `https://www.bilibili.com/video/${e}`
      });
    } else if (s[6]) {
      const e = s[6], l = c(e);
      l ? n.push({ type: "emote", text: e, url: l }) : n.push({ type: "text", text: e });
    }
    t = a.lastIndex;
  }
  return t < o.length && n.push({ type: "text", text: o.slice(t) }), n;
}
const B = { class: "bili-rich-text" }, z = ["href", "title"], I = ["src", "alt", "title"], R = { key: 2 }, T = /* @__PURE__ */ x({
  __name: "BiliRichText",
  props: {
    text: {},
    emotes: {}
  },
  setup(o) {
    const i = o, c = g(() => v(i.text || "", i.emotes));
    return (a, n) => (p(), u("span", B, [
      (p(!0), u(h, null, y(c.value, (t, s) => (p(), u(h, { key: s }, [
        t.type === "link" ? (p(), u("a", {
          key: 0,
          class: "bili-rich-link",
          href: t.url,
          target: "_blank",
          rel: "noopener noreferrer",
          title: t.url,
          onClick: n[0] || (n[0] = _(() => {
          }, ["stop"]))
        }, d(t.text), 9, z)) : t.type === "emote" && t.url ? (p(), u("img", {
          key: 1,
          class: "bili-comment-emote",
          src: t.url,
          alt: t.text,
          title: t.text,
          loading: "lazy",
          referrerpolicy: "no-referrer"
        }, null, 8, I)) : (p(), u("span", R, d(t.text), 1))
      ], 64))), 128))
    ]));
  }
}), $ = /* @__PURE__ */ b(T, [["__scopeId", "data-v-227eaeed"]]);
export {
  $ as B
};
