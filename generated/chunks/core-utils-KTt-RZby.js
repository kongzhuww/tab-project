class C {
  constructor() {
    this.currentSession = null, this.suppressClickUntil = 0;
  }
  static getInstance() {
    return C.instance || (C.instance = new C()), C.instance;
  }
  getCurrentSession() {
    return this.currentSession;
  }
  shouldSuppressClick() {
    return Date.now() < this.suppressClickUntil;
  }
  // ==========================================================================
  // FLIP 弹性重排动画 (First-Last-Invert-Play)
  // ==========================================================================
  animateFlip(t, l) {
    if (!t || !l) return;
    const s = [...t.children].filter(
      (e) => e.nodeType === 1 && !e.classList.contains("launcher-kinetic-ghost") && !e.classList.contains("launcher-kinetic-placeholder") && !e.classList.contains("launcher-empty")
    ), i = new Map(s.map((e) => [e, e.getBoundingClientRect()]));
    l(), !(typeof window < "u" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) && s.forEach((e) => {
      if (!e.isConnected) return;
      const u = i.get(e);
      if (!u) return;
      const m = e.getBoundingClientRect(), r = u.left - m.left, c = u.top - m.top;
      if (Math.abs(r) < 0.5 && Math.abs(c) < 0.5) return;
      e.getAnimations().filter((a) => a.id === "launcher-flip").forEach((a) => a.cancel());
      const $ = e.animate(
        [{ transform: `translate3d(${r}px,${c}px,0)` }, { transform: "translate3d(0,0,0)" }],
        { duration: 115, easing: "cubic-bezier(.16,.94,.2,1)" }
      );
      $.id = "launcher-flip";
    });
  }
  // ==========================================================================
  // 占位符位置与迟滞死区判定 (Hysteresis Deadzone)
  // ==========================================================================
  placePreview(t, l, s) {
    if (!t?.started || this.currentSession !== t) return;
    const i = document.elementsFromPoint(l, s), n = document.querySelector("#launcher-folder-dialog, .launcher-folder-dialog"), e = !!(n?.hasAttribute?.("open") || window.LogicWeaverLauncherFolder?.state?.isOpen), u = !t.isFolder && e, m = u ? i.map((p) => p.closest?.("#launcher-folder-dialog-items, .launcher-folder-dialog-items")).find(Boolean) : null;
    if (u) {
      if (document.querySelectorAll(".launcher-link.merge-target").forEach((p) => p.classList.remove("merge-target")), t.mergeTarget = null, m) {
        const p = document.getElementById("launcher-folder-dialog-items") || m;
        t.folderDropElement?.classList.remove("launcher-folder-drop-active"), t.folderDropElement = p;
        const b = window.LogicWeaverLauncherFolder?.state?.activeFolder || null;
        t.folderTarget = b && t.groupName !== b ? b : null, p.classList.add("launcher-folder-drop-active"), n?.classList.add("drop-hover-valid"), window.LogicWeaverLauncherFolder?.setDropHoverValid?.(!0);
      } else
        this.clearFolderDrop(t);
      return;
    }
    const r = performance.now();
    if (t._lastSwapTime && r - t._lastSwapTime < 70) return;
    const c = i.find(
      (p) => p.classList?.contains("launcher-site-items") || p.classList?.contains("launcher-items") || p.classList?.contains("launcher-folder-grid")
    ) || t.card.parentElement;
    if (!c) return;
    this.clearFolderDrop(t);
    const $ = [...c.children].filter(
      (p) => p.nodeType === 1 && p !== t.card && !p.classList.contains("launcher-kinetic-ghost") && !p.classList.contains("launcher-empty") && (p.classList.contains("launcher-link") || p.classList.contains("launcher-folder"))
    );
    if (!$.length) {
      t.card.parentElement !== c && (this.animateFlip(c, () => c.appendChild(t.card)), t.reference = null, t.targetContainer = c, t._lastSwapTime = r);
      return;
    }
    let a = null, o = 1 / 0, d = null;
    for (const p of $) {
      const b = p.getBoundingClientRect(), v = b.left + b.width / 2, y = b.top + b.height / 2, E = Math.hypot(l - v, s - y);
      E < o && (o = E, a = p, d = b);
    }
    if (!a || !d) return;
    if (!t.isFolder && a.classList.contains("launcher-folder") && l >= d.left && l <= d.right && s >= d.top && s <= d.bottom) {
      document.querySelectorAll(".launcher-link.merge-target").forEach((b) => b.classList.remove("merge-target")), t.mergeTarget = null, t.folderDropElement !== a && (t.folderDropElement?.classList.remove("launcher-folder-drop-active"), t.folderDropElement = a, t.folderTarget = a.dataset.launcherFolder || null, a.classList.add("launcher-folder-drop-active"));
      return;
    }
    if (!t.isFolder && !t.folderTarget && a.classList.contains("launcher-link") && o < Math.min(d.width, d.height) * 0.24) {
      a.classList.add("merge-target"), t.mergeTarget = a;
      return;
    }
    if (document.querySelectorAll(".launcher-link.merge-target").forEach((p) => p.classList.remove("merge-target")), t.mergeTarget = null, t.card.parentElement !== c) {
      const b = l > d.left + d.width * 0.5 ? a.nextElementSibling : a;
      t._lastSwapTime = r, this.animateFlip(c, () => {
        b ? c.insertBefore(t.card, b) : c.appendChild(t.card);
      }), t.reference = b, t.targetContainer = c;
      return;
    }
    const g = t.card.getBoundingClientRect(), k = Math.hypot(l - (g.left + g.width / 2), s - (g.top + g.height / 2));
    if (o >= k - 16) return;
    const f = !!(t.card.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING) ? a.nextElementSibling : a;
    (f ? t.card.nextElementSibling === f : t.card === c.lastElementChild) || (t._lastSwapTime = r, this.animateFlip(c, () => {
      f ? c.insertBefore(t.card, f) : c.appendChild(t.card);
    }), t.reference = f, t.targetContainer = c);
  }
  clearFolderDrop(t) {
    t?.folderDropElement?.classList.remove("launcher-folder-drop-active"), document.querySelectorAll(".launcher-folder-dialog, #launcher-folder-dialog").forEach((l) => l.classList.remove("drop-hover-valid")), document.querySelectorAll(".launcher-folder.launcher-folder-drop-active").forEach((l) => l.classList.remove("launcher-folder-drop-active")), window.LogicWeaverLauncherFolder?.setDropHoverValid?.(!1), t && (t.folderDropElement = null, t.folderTarget = null);
  }
  beginDrag(t) {
    if (t.started || this.currentSession !== t) return;
    t.started = !0, t.reducedMotion = typeof window < "u" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const l = t.card.getBoundingClientRect();
    t.offsetX = t.startX - l.left, t.offsetY = t.startY - l.top, t.x = l.left, t.y = l.top, t.targetX = l.left, t.targetY = l.top;
    const s = t.card.cloneNode(!0);
    t.ghost = s, s.className = `${t.card.className} launcher-kinetic-ghost`, s.removeAttribute("tabindex"), s.removeAttribute("title"), s.setAttribute("aria-hidden", "true"), s.querySelectorAll("button,input,a,[tabindex]").forEach((i) => i.setAttribute("tabindex", "-1")), s.style.width = `${l.width}px`, s.style.height = `${l.height}px`, t.card.classList.add("launcher-kinetic-placeholder"), document.body.appendChild(s), document.body.classList.add("launcher-kinetic-active"), this.paintLoop(t);
  }
  paintLoop(t) {
    this.currentSession !== t || !t.started || !t.ghost || (t.x += (t.targetX - t.x) * (t.reducedMotion ? 1 : 0.92), t.y += (t.targetY - t.y) * (t.reducedMotion ? 1 : 0.92), t.ghost.style.transform = `translate3d(${t.x}px,${t.y}px,0) scale(1.02)`, t.raf = requestAnimationFrame(() => this.paintLoop(t)));
  }
  finishDrag(t, l = !0, s = !1, i) {
    if (!t || this.currentSession !== t) return;
    t.cleanup?.(), cancelAnimationFrame(t.raf), t.previewRaf && cancelAnimationFrame(t.previewRaf);
    const n = t.card;
    try {
      n.releasePointerCapture(t.pointerId);
    } catch {
    }
    if (n.draggable = !1, !t.started) {
      this.currentSession = null;
      return;
    }
    this.suppressClickUntil = Date.now() + 450, this.clearFolderDrop(t), !l && t.sourceList?.isConnected && this.animateFlip(t.sourceList, () => {
      t.sourceNext?.isConnected ? t.sourceList?.insertBefore(t.card, t.sourceNext) : t.sourceList?.appendChild(t.card);
    });
    const e = n.getBoundingClientRect(), u = async () => {
      if (t.ghost?.remove(), n.classList.remove("launcher-kinetic-placeholder"), document.body.classList.remove("launcher-kinetic-active"), this.currentSession = null, !l) return;
      if (!t.isFolder && t.folderTarget) {
        i?.onMoveToFolder && t.linkId && await i.onMoveToFolder(t.linkId, t.folderTarget);
        return;
      }
      if (t.mergeTarget) {
        const g = t.mergeTarget.dataset.launcherId;
        g && t.linkId && i?.onStackLinks && await i.onStackLinks(t.linkId, g);
        return;
      }
      const r = n.parentElement;
      if (!r) return;
      const c = [...r.children].filter(
        (g) => g.classList.contains("launcher-link") || g.classList.contains("launcher-folder")
      ), $ = c.indexOf(n);
      if ($ < 0) return;
      const a = c[$ + 1], o = c[$ - 1], d = t.isFolder ? { kind: "folder", group: t.groupName } : { kind: "link", id: t.linkId };
      if (a && i?.onReorder) {
        const g = a.classList.contains("launcher-folder") ? { kind: "folder", group: a.dataset.launcherFolder } : { kind: "link", id: a.dataset.launcherId };
        await i.onReorder(d, g, "before");
      } else if (o && i?.onReorder) {
        const g = o.classList.contains("launcher-folder") ? { kind: "folder", group: o.dataset.launcherFolder } : { kind: "link", id: o.dataset.launcherId };
        await i.onReorder(d, g, "after");
      }
    };
    if (s || !t.ghost?.isConnected || typeof window < "u" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      u();
      return;
    }
    const m = t.ghost.animate(
      [
        { transform: `translate3d(${t.x}px,${t.y}px,0) scale(1.02)` },
        { transform: `translate3d(${e.left}px,${e.top}px,0) scale(1)` }
      ],
      { duration: 105, easing: "cubic-bezier(.14,.96,.2,1)" }
    );
    m.addEventListener("finish", () => {
      u();
    }, { once: !0 }), m.addEventListener("cancel", () => {
      u();
    }, { once: !0 });
  }
}
const _ = C.getInstance();
typeof window < "u" && (window.LogicWeaverKineticDrag = _);
const D = {
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  varepsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  vartheta: "ϑ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  pi: "π",
  varpi: "ϖ",
  rho: "ρ",
  varrho: "ϱ",
  sigma: "σ",
  varsigma: "ς",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  varphi: "ϕ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  Gamma: "Γ",
  Delta: "Δ",
  Theta: "Θ",
  Lambda: "Λ",
  Xi: "Ξ",
  Pi: "Π",
  Sigma: "Σ",
  Upsilon: "Υ",
  Phi: "Φ",
  Psi: "Ψ",
  Omega: "Ω"
}, I = {
  pm: "±",
  mp: "∓",
  times: "×",
  div: "÷",
  cdot: "·",
  ast: "∗",
  star: "⋆",
  circ: "∘",
  bullet: "•",
  cap: "∩",
  cup: "∪",
  uplus: "⊎",
  sqcap: "⊓",
  sqcup: "⊔",
  vee: "∨",
  wedge: "∧",
  setminus: "∖",
  wr: "≀",
  leq: "≤",
  le: "≤",
  geq: "≥",
  ge: "≥",
  neq: "≠",
  ne: "≠",
  approx: "≈",
  equiv: "≡",
  sim: "∼",
  simeq: "≃",
  propto: "∝",
  ll: "≪",
  gg: "≫",
  in: "∈",
  notin: "∉",
  ni: "∋",
  subset: "⊂",
  supset: "⊃",
  subseteq: "⊆",
  supseteq: "⊇",
  forall: "∀",
  exists: "∃",
  nexists: "∄",
  empty: "∅",
  emptyset: "∅",
  infty: "∞",
  partial: "∂",
  nabla: "∇",
  int: "∫",
  iint: "∬",
  iiint: "∭",
  oint: "∮",
  sum: "∑",
  prod: "∏",
  coprod: "∐",
  leftarrow: "←",
  gets: "←",
  rightarrow: "→",
  to: "→",
  leftrightarrow: "↔",
  Leftarrow: "⇐",
  Rightarrow: "⇒",
  implies: "⇒",
  Leftrightarrow: "⇔",
  iff: "⇔",
  uparrow: "↑",
  downarrow: "↓",
  updownarrow: "↕",
  dots: "…",
  cdots: "⋯",
  vdots: "⋮",
  ddots: "⋱",
  hbar: "ℏ",
  ell: "ℓ",
  Re: "ℜ",
  Im: "ℑ",
  wp: "℘",
  angle: "∠",
  top: "⊤",
  bot: "⊥",
  vdash: "⊢",
  models: "⊨",
  dag: "†",
  ddag: "‡",
  flat: "♭",
  natural: "♮",
  sharp: "♯"
}, q = /* @__PURE__ */ new Set([
  "sin",
  "cos",
  "tan",
  "cot",
  "sec",
  "csc",
  "arcsin",
  "arccos",
  "arctan",
  "sinh",
  "cosh",
  "tanh",
  "coth",
  "exp",
  "log",
  "ln",
  "lg",
  "lim",
  "min",
  "max",
  "sup",
  "inf",
  "det",
  "dim",
  "ker",
  "deg",
  "gcd",
  "hom",
  "arg"
]), R = {
  vec: "→",
  bar: "¯",
  hat: "^",
  dot: "˙",
  ddot: "¨",
  tilde: "~",
  overline: "¯",
  underline: "_"
}, N = {
  R: "ℝ",
  N: "ℕ",
  Z: "ℤ",
  Q: "ℚ",
  C: "ℂ",
  P: "ℙ",
  H: "ℍ"
};
function M(S) {
  return String(S).replace(/[&<>"']/g, (t) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  })[t] || t);
}
function x(S) {
  return String(S).replace(/[&<>"']/g, (t) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[t] || t);
}
function L(S) {
  return x(S);
}
class F {
  static getInstance() {
    return F.instance || (F.instance = new F()), F.instance;
  }
  // ==========================================================================
  // LaTeX 语法递归下降 AST 编译为标准 MathML Core
  // ==========================================================================
  latexToMathML(t, l = !1) {
    if (!t || typeof t != "string") return "";
    const s = t.trim();
    if (!s) return "";
    function i(n) {
      let e = 0;
      const u = n.length, m = [];
      function r() {
        for (; e < u && /\s/.test(n[e]); ) e++;
      }
      function c() {
        if (r(), e >= u) return "";
        if (n[e] === "{") {
          e++;
          let a = 1;
          const o = e;
          for (; e < u && a > 0; )
            n[e] === "{" && n[e - 1] !== "\\" ? a++ : n[e] === "}" && n[e - 1] !== "\\" && a--, e++;
          return n.slice(o, e - 1);
        }
        if (n[e] === "\\") {
          const a = e;
          for (e++; e < u && /[a-zA-Z]/.test(n[e]); ) e++;
          return n.slice(a, e);
        }
        const $ = n[e];
        return e++, $;
      }
      for (; e < u && (r(), !(e >= u)); ) {
        const $ = n[e];
        let a = "";
        if ($ === "\\") {
          if (e++, e < u && (n[e] === "\\" || n[e] === " ")) {
            e++, m.push("<mspace linebreak='newline'/>");
            continue;
          }
          let o = "";
          for (; e < u && /[a-zA-Z]/.test(n[e]); ) o += n[e++];
          if (o)
            if (o === "left" || o === "right") {
              if (r(), e < u) {
                const d = n[e++];
                d !== "." && m.push(`<mo>${M(d)}</mo>`);
              }
              continue;
            } else if (o === "frac") {
              const d = c(), g = c();
              a = `<mfrac><mrow>${i(d)}</mrow><mrow>${i(g)}</mrow></mfrac>`;
            } else if (o === "sqrt") {
              r();
              let d = "";
              if (e < u && n[e] === "[") {
                e++;
                const k = e;
                for (; e < u && n[e] !== "]"; ) e++;
                d = n.slice(k, e), e < u && n[e] === "]" && e++;
              }
              const g = c();
              a = d ? `<mroot><mrow>${i(g)}</mrow><mrow>${i(d)}</mrow></mroot>` : `<msqrt><mrow>${i(g)}</mrow></msqrt>`;
            } else if (R[o]) {
              const d = c();
              a = `<mover><mrow>${i(d)}</mrow><mo>${M(R[o])}</mo></mover>`;
            } else if (o === "mathbf" || o === "boldsymbol") {
              const d = c();
              a = `<mstyle mathvariant='bold'>${i(d)}</mstyle>`;
            } else if (o === "mathbb") {
              const d = c().trim();
              a = `<mi mathvariant='double-struck'>${M(N[d] || d)}</mi>`;
            } else if (o === "text" || o === "mathrm" || o === "textrm" || o === "operatorname") {
              const d = c();
              a = `<mtext>${M(d)}</mtext>`;
            } else if (o === "rm" || o === "bf") {
              r();
              let d = "";
              e < u && n[e] === "{" ? d = c() : (d = n.slice(e).trim(), e = u), a = o === "bf" ? `<mstyle mathvariant='bold'>${M(d)}</mstyle>` : `<mtext>${M(d)}</mtext>`;
            } else D[o] ? a = `<mi>${M(D[o])}</mi>` : I[o] ? a = `<mo>${M(I[o])}</mo>` : q.has(o) ? a = `<mi class='obs-math-fn'>${M(o)}</mi>` : a = `<mi>${M(o)}</mi>`;
          else if (e < u) {
            const d = n[e++];
            a = `<mo>${M(d)}</mo>`;
          }
        } else if (/[0-9]/.test($)) {
          let o = "";
          for (; e < u && /[0-9.]/.test(n[e]); ) o += n[e++];
          a = `<mn>${o}</mn>`;
        } else if (/[a-zA-Z]/.test($))
          a = `<mi>${$}</mi>`, e++;
        else if ($ === "{") {
          e++;
          const o = e;
          let d = 1;
          for (; e < u && d > 0; )
            n[e] === "{" && n[e - 1] !== "\\" ? d++ : n[e] === "}" && n[e - 1] !== "\\" && d--, e++;
          a = `<mrow>${i(n.slice(o, e - 1))}</mrow>`;
        } else
          a = `<mo>${M($)}</mo>`, e++;
        if (a) {
          for (; e < u && (r(), e < u && (n[e] === "^" || n[e] === "_")); ) {
            const o = n[e] === "^";
            e++;
            const d = c(), g = `<mrow>${i(d)}</mrow>`;
            if (r(), e < u && n[e] === (o ? "_" : "^")) {
              e++;
              const k = c(), T = `<mrow>${i(k)}</mrow>`;
              a = `<msubsup>${a}${o ? T : g}${o ? g : T}</msubsup>`;
            } else
              a = o ? `<msup>${a}${g}</msup>` : `<msub>${a}${g}</msub>`;
          }
          m.push(a);
        }
      }
      return m.join("");
    }
    try {
      const n = i(s);
      return `<math xmlns="http://www.w3.org/1998/Math/MathML"${l ? ' display="block"' : ' display="inline"'}${l ? ' class="obs-math-block"' : ' class="obs-math-inline"'} data-latex="${L(s)}">${n}</math>`;
    } catch (n) {
      return console.warn("[MarkdownAst] LaTeX parse fallback:", n), `<span class="obs-math-error" title="${L(n?.message || String(n))}">${x(s)}</span>`;
    }
  }
  isValidInlineLatex(t) {
    const l = t.trim();
    if (!l || l.length > 200 || t.startsWith(" ") || t.endsWith(" ") || /^[\d,.]+[a-zA-Z%]*$/.test(l) || /[\u4e00-\u9fa5]/.test(l) && !l.includes("\\")) return !1;
    const s = /\\[a-zA-Z]+/.test(l), i = /[\^_]\{?[a-zA-Z0-9+\-=]\}?/.test(l), n = /[=<>+\-*/]/.test(l) && /[a-zA-Z]/.test(l);
    return s || i || n;
  }
  isTableDelimiterRow(t) {
    if (!t) return !1;
    const l = t.trim().replace(/[\u2010-\u2015\u2212\ufe58\ufe63\uff0d]/g, "-").replace(/\uff5c/g, "|");
    if (!l.includes("|")) return !1;
    const s = l.replace(/^\||\|$/g, "").split("|");
    return s.length ? s.every((i) => /^\s*:?-+:?\s*$/.test(i)) : !1;
  }
  parseTableAlignments(t) {
    return t.trim().replace(/[\u2010-\u2015\u2212\ufe58\ufe63\uff0d]/g, "-").replace(/\uff5c/g, "|").replace(/^\||\|$/g, "").split("|").map((i) => {
      const n = i.trim(), e = n.startsWith(":"), u = n.endsWith(":");
      return e && u ? "center" : u ? "right" : "left";
    });
  }
  tableCells(t, l) {
    if (!t) return [];
    const s = t.trim().replace(/\uff5c/g, "|");
    let i = s.split("|").map((n) => n.trim());
    return s.startsWith("|") && s.endsWith("|") && i.length >= 3 ? i = i.slice(1, -1) : s.endsWith("|") ? i = i.slice(0, -1) : s.startsWith("|") && l && i.length > l && (i = i.slice(1)), i;
  }
  // ==========================================================================
  // Markdown AST 分块与纯文本语法编译
  // ==========================================================================
  splitFrontmatter(t) {
    const l = t.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
    return l ? { frontmatter: l[1], body: t.slice(l[0].length) } : { frontmatter: "", body: t };
  }
  normalizeMarkdownHtml(t) {
    const l = [];
    let s = String(t).replace(/```[\s\S]*?```/g, (i) => `\0FENCE${l.push(i) - 1}\0`).replace(/\$\$[\s\S]*?\$\$/g, (i) => `\0FENCE${l.push(i) - 1}\0`);
    return s = s.replace(/<!--[\s\S]*?-->/g, ""), s = s.replace(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>\s*<picture\b[^>]*>([\s\S]*?)<\/picture>\s*<\/a>/gi, (i, n, e) => `[${e.match(/<img\b[^>]*alt=["']([^"']*)["']/i)?.[1] || "查看图片"}](${n})`), s = s.replace(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>([^<]*)<\/a>/gi, (i, n, e) => `[${e.trim() || n}](${n})`), s = s.replace(/<img\b([^>]*)\/?>/gi, (i, n) => {
      const e = n.match(/\bsrc=["']([^"']+)["']/i) || n.match(/\bdata-src=["']([^"']+)["']/i), u = n.match(/\balt=["']([^"']*)["']/i), m = e ? e[1] : "", r = u ? u[1] : "";
      return m ? `![${r}](${m})` : "";
    }), s = s.replace(/<(https?:\/\/[^>\s]+)>/gi, (i, n) => `[${n}](${n})`), s = s.replace(/<([\w.+-]+@[\w.-]+\.[A-Za-z]{2,})>/g, (i, n) => `[${n}](mailto:${n})`), s = s.replace(/<br\s*\/?>/gi, `
`), s = s.replace(/<\/?(?:a|picture|source|sub|details|summary|b|input|button)\b[^>]*>/gi, ""), s.replace(/\u0000FENCE(\d+)\u0000/g, (i, n) => l[Number(n)] || "");
  }
  extractFootnotes(t) {
    const l = t.replace(/\r\n?/g, `
`).split(`
`), s = [], i = /* @__PURE__ */ new Map();
    for (let n = 0; n < l.length; n++) {
      const e = l[n].match(/^\[\^([^\]]+)\]:\s*(.*)$/);
      if (!e) {
        s.push(l[n]);
        continue;
      }
      const u = [e[2]];
      for (; n + 1 < l.length && /^(?: {2,}|\t)\S/.test(l[n + 1]); ) u.push(l[++n].trim());
      const m = e[1].trim();
      i.has(m) || i.set(m, { id: m, number: i.size + 1, text: u.join(" ").trim() });
    }
    return { body: s.join(`
`), definitions: i };
  }
  inlineMarkdown(t, l = {}) {
    const s = [], i = [], n = [];
    let e = String(t);
    (l.renderMode || "rendered") !== "md" && (e = e.replace(/(?<![\w\\$])\$(?!\s|\d)(.+?)(?<!\s)\$(?![\w$])/g, (r, c) => this.isValidInlineLatex(c) ? `\0MATH${n.push(this.latexToMathML(c.trim(), !1)) - 1}\0` : r), e = e.replace(/\\\(([\s\S]+?)\\\)/g, (r, c) => {
      const $ = String(c || "").trim();
      return $ && $.length <= 300 ? `\0MATH${n.push(this.latexToMathML($, !1)) - 1}\0` : r;
    })), e = e.replace(/<span\s+class=["'](category|vocabulary|definition)["']\s*>|<\/span>/gi, (r, c) => {
      const $ = c ? `<span class="${c.toLowerCase()}">` : "</span>";
      return `\0SEM${i.push($) - 1}\0`;
    }).replace(/`([^`]+)`/g, (r, c) => `\0CODE${s.push(`<code class="obs-inline-code">${x(c)}</code>`) - 1}\0`);
    const m = [];
    return l.linkMode === "web" && (e = e.replace(/<\/?(?:a|img)\b[^>]*\/?>/gi, (r) => `\0HTML${m.push(r) - 1}\0`)), e = e.replace(/<\/?(?:h[1-6]|p|div|span|hr|br|sup|sub|strong|b|em|i|u|s|del|kbd|details|summary|table|thead|tbody|tr|th|td|ul|ol|li|picture|source)\b[^>]*\/?>/gi, (r) => /on\w+\s*=/i.test(r) || /javascript:/i.test(r) ? "" : `\0HTML${m.push(r) - 1}\0`), e = x(e), e = e.replace(/\u0000HTML(\d+)\u0000/g, (r, c) => m[Number(c)] || ""), e = e.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (r, c, $) => {
      const a = c.trim(), o = $.trim(), g = /^https?:\/\//i.test(o) || o.startsWith("data:") ? `src="${L(o)}"` : `src="" data-vault-src="${L(o)}"`, k = a ? `<figcaption class="obs-media-caption">${x(a)}</figcaption>` : "";
      return `<figure class="obs-media-figure"><img class="obs-rendered-img" ${g} alt="${L(a)}" loading="lazy" referrerpolicy="no-referrer">${k}</figure>`;
    }), e = e.replace(/!\[\[([^\]]+)\]\]/g, (r, c) => {
      const [$, a] = c.trim().split("|"), o = $.trim();
      if (/\.(png|jpe?g|webp|gif|svg|bmp|avif)$/i.test(o)) {
        const g = parseInt(a, 10), k = g > 0 ? `style="max-width:${g}px;"` : "";
        return `<figure class="obs-media-figure"><img class="obs-rendered-img" src="" data-vault-src="${L(o)}" alt="${L(o)}" ${k} loading="lazy" referrerpolicy="no-referrer"><figcaption class="obs-media-caption">${x(o)}</figcaption></figure>`;
      }
      return `<span class="obs-embed">◫ ${x(c)}</span>`;
    }), e = e.replace(/\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g, (r, c, $, a) => `<a class="obs-wikilink" href="#" data-target="${L(c.trim())}">${x(a || c)}${$ ? ` › ${x($)}` : ""}</a>`), e = e.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (r, c, $) => {
      const a = $.trim();
      if (l.linkMode !== "web" && /\.md(?:#.*)?$/i.test(a)) {
        const o = a.split("#")[0].replace(/\\/g, "/").split("/").pop()?.replace(/\.md$/i, "") || a;
        return `<a class="obs-wikilink" href="#" data-target="${L(o)}">${c}</a>`;
      }
      return l.linkMode === "web" && a.startsWith("#") ? `<a href="${L(a)}">${c}</a>` : /^https?:\/\//i.test(a) || /^mailto:/i.test(a) ? `<a class="obs-external-link" href="${L(a)}" target="_blank" rel="noopener noreferrer">${c}</a>` : `<span class="obs-relative-link" title="${L(a)}">${c}</span>`;
    }), e = e.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/~~([^~]+)~~/g, "<del>$1</del>").replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>"), e = e.replace(/(^|\s)(#[\p{L}\p{N}_/-]+)/gu, '$1<span class="obs-tag-inline" data-tag="$2">$2</span>'), e = e.replace(/\u0000CODE(\d+)\u0000/g, (r, c) => s[Number(c)] || ""), e = e.replace(/\u0000SEM(\d+)\u0000/g, (r, c) => i[Number(c)] || ""), e = e.replace(/\u0000MATH(\d+)\u0000/g, (r, c) => n[Number(c)] || ""), e;
  }
  renderMarkdown(t, l = {}) {
    if (l.renderMode !== "md" && l.useFastRenderer !== !1 && A) {
      const a = A(t);
      if (typeof a == "string")
        return a;
    }
    const { frontmatter: s, body: i } = this.splitFrontmatter(t), e = this.extractFootnotes(this.normalizeMarkdownHtml(i)).body.replace(/\u00a0/g, " ").replace(/\r\n?/g, `
`).split(`
`), u = l.renderMode || "rendered";
    let m = "", r = 0, c = 0, $ = 0;
    for (; r < e.length; ) {
      const a = e[r];
      if (/^\s*\$\$/.test(a)) {
        const h = [];
        let f = a.replace(/^\s*\$\$/, "");
        if (f.endsWith("$$") && f.length >= 2)
          h.push(f.slice(0, -2)), r++;
        else {
          for (h.push(f), r++; r < e.length && !e[r].includes("$$"); )
            h.push(e[r++]);
          if (r < e.length) {
            const p = e[r].indexOf("$$");
            h.push(e[r].slice(0, p)), r++;
          }
        }
        const w = h.join(`
`).trim();
        u === "md" ? m += `<pre class="obs-code-block obs-math-raw"><span class="obs-code-lang">latex</span><code>${x(w)}</code></pre>` : m += `<div class="obs-math-block">${this.latexToMathML(w, !0)}</div>`;
        continue;
      }
      if (/^```/.test(a)) {
        const h = a.slice(3).trim(), f = [];
        for (r++; r < e.length && !/^```/.test(e[r]); ) f.push(e[r++]);
        r++, (h === "latex" || h === "math") && u !== "md" ? m += `<div class="obs-math-block">${this.latexToMathML(f.join(`
`).trim(), !0)}</div>` : m += `<pre class="obs-code-block"><span class="obs-code-lang">${x(h || "code")}</span><code>${x(f.join(`
`))}</code></pre>`;
        continue;
      }
      const o = a.match(/^(#{1,6})\s+(.+)$/);
      if (o) {
        const h = o[1].length, f = o[2];
        m += `<h${h} class="obs-h${h}">${this.inlineMarkdown(f, l)}</h${h}>`, r++;
        continue;
      }
      if (/^\s*(---+|___+|\*\*\*+|——+|───+)\s*$/.test(a)) {
        m += "<hr>", r++;
        continue;
      }
      const d = a.match(/^\s*[-*]\s+\[([ xX])\]\s+(.+)$/);
      if (d) {
        const h = d[1].toLowerCase() === "x";
        m += `<div class="obs-task-item ${h ? "checked" : ""}"><input class="obs-task-cb" data-task-idx="${c++}" type="checkbox" ${h ? "checked" : ""}><span class="obs-task-label">${this.inlineMarkdown(d[2], l)}</span></div>`, r++;
        continue;
      }
      if (/^>\s?/.test(a)) {
        const h = [];
        for (; r < e.length && /^>\s?/.test(e[r]); ) h.push(e[r++].replace(/^>\s?/, ""));
        const f = h[0]?.match(/^\[!(\w+)\][+-]?\s*(.*)$/i);
        f ? m += `<aside class="obs-callout obs-callout-${L(f[1].toLowerCase())}"><strong>${x(f[2] || f[1])}</strong>${h.slice(1).map((w) => `<p>${this.inlineMarkdown(w, l)}</p>`).join("")}</aside>` : m += `<blockquote class="obs-quote">${h.map((w) => this.inlineMarkdown(w, l)).join("<br>")}</blockquote>`;
        continue;
      }
      if (/^\s*[-*+]\s+/.test(a)) {
        const h = [];
        let f = null;
        for (; r < e.length && /^\s*[-*+]\s+/.test(e[r]); ) {
          const w = e[r].match(/^(\s*)[-*+]\s+(.*)$/), p = w ? w[1].length : 0, b = w ? w[2] : e[r].trim();
          f === null && (f = p), p > f && h.length > 0 ? h[h.length - 1].sub.push(b) : h.push({ indent: p, text: b, sub: [] }), r++;
        }
        m += `<ul>${h.map((w) => {
          const p = w.sub.length ? `<ul>${w.sub.map((b) => `<li>${this.inlineMarkdown(b, l)}</li>`).join("")}</ul>` : "";
          return `<li>${this.inlineMarkdown(w.text, l)}${p}</li>`;
        }).join("")}</ul>`;
        continue;
      }
      if (/^\s*\d+\.\s+/.test(a)) {
        const h = [];
        for (; r < e.length && /^\s*\d+\.\s+/.test(e[r]); ) {
          let f = e[r++].replace(/^\s*\d+\.\s+/, "");
          for (; r < e.length && /^(?: {2,}|\t)(?!\s*(?:\$\$|```|[-*+]\s|\d+\.\s))/.test(e[r]) && e[r].trim(); )
            f += " " + e[r++].trim();
          h.push(f);
        }
        m += `<ol>${h.map((f) => `<li>${this.inlineMarkdown(f, l)}</li>`).join("")}</ol>`;
        continue;
      }
      let g = -1;
      if ((a.includes("|") || a.includes("｜")) && (r + 1 < e.length && this.isTableDelimiterRow(e[r + 1]) ? g = r + 1 : r + 2 < e.length && !e[r + 1].trim() && this.isTableDelimiterRow(e[r + 2]) && (g = r + 2)), g !== -1) {
        const h = this.tableCells(a), f = this.parseTableAlignments(e[g]);
        r = g + 1;
        const w = [];
        for (; r < e.length; ) {
          if (!e[r].trim()) {
            let y = r + 1;
            for (; y < e.length && !e[y].trim(); ) y++;
            if (y < e.length && (e[y].includes("|") || e[y].includes("｜")) && !this.isTableDelimiterRow(e[y]))
              r = y;
            else
              break;
          }
          const b = e[r];
          if (!b.includes("|") && !b.includes("｜")) break;
          const v = this.tableCells(b, h.length);
          for (; v.length < h.length; ) v.push("");
          w.push(v), r++;
        }
        const p = $++;
        m += `<div class="obs-table-wrap" data-table-index="${p}"><table><thead><tr>${h.map((b, v) => `<th style="text-align:${f[v] || "left"}">${this.inlineMarkdown(b, l)}</th>`).join("")}</tr></thead><tbody>${w.map((b) => `<tr>${b.map((v, y) => `<td style="text-align:${f[y] || "left"}">${this.inlineMarkdown(v, l)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
        continue;
      }
      if (!a.trim()) {
        r++;
        continue;
      }
      const k = [a];
      for (r++; r < e.length && e[r].trim() && !/^(```|#{1,6}\s|>\s?|\s*[-*+]\s+|\s*\d+\.\s+|\s*\$\$)/.test(e[r]) && !(e[r].includes("|") && this.isTableDelimiterRow(e[r + 1])); )
        k.push(e[r++]);
      const T = k.join(`
`).trim();
      if (/^<([a-z0-9_-]+)[^>]*>/i.test(T) && /<\/([a-z0-9_-]+)>\s*$/i.test(T))
        m += this.inlineMarkdown(T.replace(/\r?\n/g, " "), l) + `
`;
      else {
        const h = k.map((f, w) => {
          const p = /(?: {2,}|\\)$/.test(f), b = f.replace(/(?: {2,}|\\)$/, ""), v = this.inlineMarkdown(b, l);
          return w < k.length - 1 ? p ? v + "<br>" : v + " " : v;
        }).join("");
        m += `<p>${h}</p>
`;
      }
    }
    return m;
  }
  extractWikilinks(t) {
    const l = [], s = t.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g);
    for (const i of s)
      i[1] && l.push(i[1].trim());
    return [...new Set(l)];
  }
  extractTags(t) {
    const l = [], s = t.matchAll(/(?:^|\s)(#[\p{L}\p{N}_/-]+)/gu);
    for (const i of s)
      i[1] && l.push(i[1].trim());
    return [...new Set(l)];
  }
}
const H = F.getInstance();
let A = null;
function B(S) {
  A = S;
}
export {
  _ as k,
  H as m,
  B as r
};
