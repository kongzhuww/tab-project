import { m as f } from "./core-utils-BHmA-Jjh.js";
import { d as h, B as b, w, o as k, e as g, b as M } from "./vendor-vue-BkY5-p5y.js";
import { _ } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
function y(l) {
  let e = "";
  return l.replace(/\r\n?/g, `
`).split(`
`).map((t) => {
    const s = t.match(/^\s*(`{3,}|~{3,})/);
    if (s) {
      const r = s[1][0];
      return e ? e === r && (e = "") : e = r, t;
    }
    return e ? t : t.replace(/^(\s*)\\\[/, (r, n) => `${n}$$`).replace(/\\\](\s*)$/, (r, n) => `$$${n}`);
  }).join(`
`);
}
function A(l) {
  return f.renderMarkdown(y(l), { linkMode: "web", useFastRenderer: !1 });
}
const v = "http://www.w3.org/1999/xhtml", d = "http://www.w3.org/1998/Math/MathML", T = /* @__PURE__ */ new Set(["p", "br", "hr", "div", "span", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "b", "em", "i", "del", "s", "ul", "ol", "li", "blockquote", "pre", "code", "a", "table", "thead", "tbody", "tr", "th", "td", "sup", "sub", "kbd", "aside"]), x = /* @__PURE__ */ new Set(["math", "mrow", "mi", "mn", "mo", "mfrac", "msqrt", "mroot", "msup", "msub", "msubsup", "mover", "mspace", "mstyle", "mtext"]), N = /* @__PURE__ */ new Set(["script", "style", "iframe", "object", "embed", "svg", "img", "picture", "source", "video", "audio", "form", "input", "button", "link", "meta"]);
function C(l, e = document) {
  const t = e.createElement("template");
  t.innerHTML = l;
  const s = e.createDocumentFragment();
  function r(n, u) {
    if (n.nodeType === 3) {
      u.appendChild(e.createTextNode(n.textContent || ""));
      return;
    }
    if (n.nodeType !== 1) return;
    const o = n, a = o.localName.toLowerCase();
    if (N.has(a)) return;
    const i = o.namespaceURI === d && x.has(a);
    if (!(i || o.namespaceURI === v && T.has(a))) {
      for (const m of Array.from(o.childNodes)) r(m, u);
      return;
    }
    const c = i ? e.createElementNS(d, a) : e.createElement(a);
    if (a === "a" && !i) {
      const m = o.getAttribute("href") || "";
      try {
        const p = new URL(m);
        (p.protocol === "https:" || p.protocol === "http:" || p.protocol === "mailto:") && (c.setAttribute("href", p.href), c.setAttribute("target", "_blank"), c.setAttribute("rel", "noopener noreferrer"));
      } catch {
      }
    }
    i && a === "math" && o.getAttribute("display") === "block" && c.setAttribute("display", "block"), i && a === "mstyle" && o.getAttribute("mathvariant") === "bold" && c.setAttribute("mathvariant", "bold"), i && a === "mspace" && o.getAttribute("linebreak") === "newline" && c.setAttribute("linebreak", "newline");
    for (const m of Array.from(o.childNodes)) r(m, c);
    u.appendChild(c);
  }
  for (const n of Array.from(t.content.childNodes)) r(n, s);
  return s;
}
const $ = /* @__PURE__ */ h({
  __name: "MessageMarkdown",
  props: {
    content: {}
  },
  setup(l) {
    const e = l, t = M(null);
    function s() {
      if (t.value)
        try {
          t.value.replaceChildren(C(A(e.content || "")));
        } catch {
          t.value.textContent = e.content || "";
        }
    }
    return b(s), w(() => e.content, s, { flush: "post" }), (r, n) => (k(), g("div", {
      ref_key: "container",
      ref: t,
      class: "message-markdown"
    }, null, 512));
  }
}), R = /* @__PURE__ */ _($, [["__scopeId", "data-v-0069601c"]]);
export {
  R as default
};
