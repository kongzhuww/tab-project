import { m as d } from "./core-utils-KTt-RZby.js";
import { d as h, o as b, w, f as g, g as k, b as y } from "./vendor-vue-BbmU9NUg.js";
import { _ as A } from "./_plugin-vue_export-helper-CP_tFnee.js";
function M(m) {
  let e = "";
  return m.replace(/\r\n?/g, `
`).split(`
`).map((r) => {
    const i = r.match(/^\s*(`{3,}|~{3,})/);
    if (i) {
      const c = i[1][0];
      return e ? e === c && (e = "") : e = c, r;
    }
    return e ? r : r.replace(/^(\s*)\\\[/, (c, o) => `${o}$$`).replace(/\\\](\s*)$/, (c, o) => `$$${o}`);
  }).join(`
`);
}
function _(m) {
  return d.renderMarkdown(M(m), { linkMode: "web", useFastRenderer: !1 });
}
const v = "http://www.w3.org/1999/xhtml", p = "http://www.w3.org/1998/Math/MathML", x = /* @__PURE__ */ new Set(["p", "br", "hr", "div", "span", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "b", "em", "i", "del", "s", "ul", "ol", "li", "blockquote", "pre", "code", "a", "table", "thead", "tbody", "tr", "th", "td", "sup", "sub", "kbd", "aside"]), T = /* @__PURE__ */ new Set(["math", "mrow", "mi", "mn", "mo", "mfrac", "msqrt", "mroot", "msup", "msub", "msubsup", "mover", "mspace", "mstyle", "mtext"]), $ = /* @__PURE__ */ new Set(["script", "style", "iframe", "object", "embed", "svg", "img", "picture", "source", "video", "audio", "form", "input", "button", "link", "meta"]);
function C(m, e = document) {
  const r = e.createElement("template");
  r.innerHTML = m;
  const i = e.createDocumentFragment();
  function c(o, u) {
    if (o.nodeType === 3) {
      u.appendChild(e.createTextNode(o.textContent || ""));
      return;
    }
    if (o.nodeType !== 1) return;
    const a = o, n = a.localName.toLowerCase();
    if ($.has(n)) return;
    const l = a.namespaceURI === p && T.has(n);
    if (!(l || a.namespaceURI === v && x.has(n))) {
      for (const t of Array.from(a.childNodes)) c(t, u);
      return;
    }
    const s = l ? e.createElementNS(p, n) : e.createElement(n);
    if (n === "a" && !l) {
      const t = a.getAttribute("href") || "";
      try {
        const f = new URL(t);
        (f.protocol === "https:" || f.protocol === "http:" || f.protocol === "mailto:") && (s.setAttribute("href", f.href), s.setAttribute("target", "_blank"), s.setAttribute("rel", "noopener noreferrer"));
      } catch {
      }
    }
    if (n === "div" && !l && a.getAttribute("class") === "obs-math-block" && s.setAttribute("class", "obs-math-block"), (n === "th" || n === "td") && !l) {
      const t = (a.getAttribute("style") || "").match(/^text-align:\s*(left|center|right)$/i);
      t && s.setAttribute("style", `text-align:${t[1].toLowerCase()}`);
    }
    if (l && n === "math") {
      const t = a.getAttribute("display");
      (t === "block" || t === "inline") && s.setAttribute("display", t);
    }
    if (l && (n === "mstyle" || n === "mi")) {
      const t = a.getAttribute("mathvariant");
      (t === "bold" || t === "double-struck") && s.setAttribute("mathvariant", t);
    }
    l && n === "mspace" && a.getAttribute("linebreak") === "newline" && s.setAttribute("linebreak", "newline");
    for (const t of Array.from(a.childNodes)) c(t, s);
    u.appendChild(s);
  }
  for (const o of Array.from(r.content.childNodes)) c(o, i);
  return i;
}
const N = /* @__PURE__ */ h({
  __name: "MessageMarkdown",
  props: {
    content: {}
  },
  setup(m) {
    const e = m, r = y(null);
    function i() {
      if (r.value)
        try {
          r.value.replaceChildren(C(_(e.content || "")));
        } catch {
          r.value.textContent = e.content || "";
        }
    }
    return b(i), w(() => e.content, i, { flush: "post" }), (c, o) => (g(), k("div", {
      ref_key: "container",
      ref: r,
      class: "message-markdown"
    }, null, 512));
  }
}), B = /* @__PURE__ */ A(N, [["__scopeId", "data-v-5c8faa8c"]]);
export {
  B as default
};
