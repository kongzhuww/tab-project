// src/utils/markdown-ast.ts
var GREEK = {
  alpha: "\u03B1",
  beta: "\u03B2",
  gamma: "\u03B3",
  delta: "\u03B4",
  epsilon: "\u03B5",
  varepsilon: "\u03B5",
  zeta: "\u03B6",
  eta: "\u03B7",
  theta: "\u03B8",
  vartheta: "\u03D1",
  iota: "\u03B9",
  kappa: "\u03BA",
  lambda: "\u03BB",
  mu: "\u03BC",
  nu: "\u03BD",
  xi: "\u03BE",
  pi: "\u03C0",
  varpi: "\u03D6",
  rho: "\u03C1",
  varrho: "\u03F1",
  sigma: "\u03C3",
  varsigma: "\u03C2",
  tau: "\u03C4",
  upsilon: "\u03C5",
  phi: "\u03C6",
  varphi: "\u03D5",
  chi: "\u03C7",
  psi: "\u03C8",
  omega: "\u03C9",
  Gamma: "\u0393",
  Delta: "\u0394",
  Theta: "\u0398",
  Lambda: "\u039B",
  Xi: "\u039E",
  Pi: "\u03A0",
  Sigma: "\u03A3",
  Upsilon: "\u03A5",
  Phi: "\u03A6",
  Psi: "\u03A8",
  Omega: "\u03A9"
};
var SYMBOLS = {
  pm: "\xB1",
  mp: "\u2213",
  times: "\xD7",
  div: "\xF7",
  cdot: "\xB7",
  ast: "\u2217",
  star: "\u22C6",
  circ: "\u2218",
  bullet: "\u2022",
  cap: "\u2229",
  cup: "\u222A",
  uplus: "\u228E",
  sqcap: "\u2293",
  sqcup: "\u2294",
  vee: "\u2228",
  wedge: "\u2227",
  setminus: "\u2216",
  wr: "\u2240",
  leq: "\u2264",
  le: "\u2264",
  geq: "\u2265",
  ge: "\u2265",
  neq: "\u2260",
  ne: "\u2260",
  approx: "\u2248",
  equiv: "\u2261",
  sim: "\u223C",
  simeq: "\u2243",
  propto: "\u221D",
  ll: "\u226A",
  gg: "\u226B",
  in: "\u2208",
  notin: "\u2209",
  ni: "\u220B",
  subset: "\u2282",
  supset: "\u2283",
  subseteq: "\u2286",
  supseteq: "\u2287",
  forall: "\u2200",
  exists: "\u2203",
  nexists: "\u2204",
  empty: "\u2205",
  emptyset: "\u2205",
  infty: "\u221E",
  partial: "\u2202",
  nabla: "\u2207",
  int: "\u222B",
  iint: "\u222C",
  iiint: "\u222D",
  oint: "\u222E",
  sum: "\u2211",
  prod: "\u220F",
  coprod: "\u2210",
  leftarrow: "\u2190",
  gets: "\u2190",
  rightarrow: "\u2192",
  to: "\u2192",
  leftrightarrow: "\u2194",
  Leftarrow: "\u21D0",
  Rightarrow: "\u21D2",
  implies: "\u21D2",
  Leftrightarrow: "\u21D4",
  iff: "\u21D4",
  uparrow: "\u2191",
  downarrow: "\u2193",
  updownarrow: "\u2195",
  dots: "\u2026",
  cdots: "\u22EF",
  vdots: "\u22EE",
  ddots: "\u22F1",
  hbar: "\u210F",
  ell: "\u2113",
  Re: "\u211C",
  Im: "\u2111",
  wp: "\u2118",
  angle: "\u2220",
  top: "\u22A4",
  bot: "\u22A5",
  vdash: "\u22A2",
  models: "\u22A8",
  dag: "\u2020",
  ddag: "\u2021",
  flat: "\u266D",
  natural: "\u266E",
  sharp: "\u266F"
};
var FUNCTIONS = /* @__PURE__ */ new Set([
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
]);
var ACCENTS = {
  vec: "\u2192",
  bar: "\xAF",
  hat: "^",
  dot: "\u02D9",
  ddot: "\xA8",
  tilde: "~",
  overline: "\xAF",
  underline: "_"
};
var BLACKBOARD = {
  R: "\u211D",
  N: "\u2115",
  Z: "\u2124",
  Q: "\u211A",
  C: "\u2102",
  P: "\u2119",
  H: "\u210D"
};
function escapeXml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  })[c] || c);
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c] || c);
}
function escapeAttr(str) {
  return escapeHtml(str);
}
var MarkdownAstEngine = class _MarkdownAstEngine {
  static instance;
  static getInstance() {
    if (!_MarkdownAstEngine.instance) {
      _MarkdownAstEngine.instance = new _MarkdownAstEngine();
    }
    return _MarkdownAstEngine.instance;
  }
  // ==========================================================================
  // LaTeX 语法递归下降 AST 编译为标准 MathML Core
  // ==========================================================================
  latexToMathML(latex, isBlock = false) {
    if (!latex || typeof latex !== "string") return "";
    const trimmed = latex.trim();
    if (!trimmed) return "";
    function parseString(input) {
      let p = 0;
      const l = input.length;
      const nodes = [];
      function skip() {
        while (p < l && /\s/.test(input[p])) p++;
      }
      function readSubArg() {
        skip();
        if (p >= l) return "";
        if (input[p] === "{") {
          p++;
          let depth = 1;
          const start = p;
          while (p < l && depth > 0) {
            if (input[p] === "{" && input[p - 1] !== "\\") depth++;
            else if (input[p] === "}" && input[p - 1] !== "\\") depth--;
            p++;
          }
          return input.slice(start, p - 1);
        }
        if (input[p] === "\\") {
          const start = p;
          p++;
          while (p < l && /[a-zA-Z]/.test(input[p])) p++;
          return input.slice(start, p);
        }
        const ch = input[p];
        p++;
        return ch;
      }
      while (p < l) {
        skip();
        if (p >= l) break;
        const char = input[p];
        if (char === "}" || char === "&" || char === "\\") {
          if (char === "\\") {
            p++;
            if (p < l && (input[p] === "\\" || input[p] === " ")) {
              p++;
              nodes.push("<mspace linebreak='newline'/>");
              continue;
            }
            let cmd = "";
            while (p < l && /[a-zA-Z]/.test(input[p])) cmd += input[p++];
            if (!cmd) {
              if (p < l) {
                const sym = input[p++];
                nodes.push(`<mo>${escapeXml(sym)}</mo>`);
              }
              continue;
            }
            if (cmd === "frac") {
              const num = readSubArg();
              const den = readSubArg();
              nodes.push(`<mfrac><mrow>${parseString(num)}</mrow><mrow>${parseString(den)}</mrow></mfrac>`);
              continue;
            }
            if (cmd === "sqrt") {
              skip();
              let index = "";
              if (p < l && input[p] === "[") {
                p++;
                const bStart = p;
                while (p < l && input[p] !== "]") p++;
                index = input.slice(bStart, p);
                if (p < l && input[p] === "]") p++;
              }
              const rad = readSubArg();
              if (index) {
                nodes.push(`<mroot><mrow>${parseString(rad)}</mrow><mrow>${parseString(index)}</mrow></mroot>`);
              } else {
                nodes.push(`<msqrt><mrow>${parseString(rad)}</mrow></msqrt>`);
              }
              continue;
            }
            if (ACCENTS[cmd]) {
              const body = readSubArg();
              nodes.push(`<mover><mrow>${parseString(body)}</mrow><mo>${escapeXml(ACCENTS[cmd])}</mo></mover>`);
              continue;
            }
            if (cmd === "mathbf" || cmd === "boldsymbol") {
              const inner = readSubArg();
              nodes.push(`<mstyle mathvariant='bold'>${parseString(inner)}</mstyle>`);
              continue;
            }
            if (cmd === "mathbb") {
              const inner = readSubArg().trim();
              nodes.push(`<mi mathvariant='double-struck'>${escapeXml(BLACKBOARD[inner] || inner)}</mi>`);
              continue;
            }
            if (cmd === "text" || cmd === "mathrm") {
              const txt = readSubArg();
              nodes.push(`<mtext>${escapeXml(txt)}</mtext>`);
              continue;
            }
            if (GREEK[cmd]) {
              nodes.push(`<mi>${escapeXml(GREEK[cmd])}</mi>`);
              continue;
            }
            if (SYMBOLS[cmd]) {
              nodes.push(`<mo>${escapeXml(SYMBOLS[cmd])}</mo>`);
              continue;
            }
            if (FUNCTIONS.has(cmd)) {
              nodes.push(`<mi class='obs-math-fn'>${escapeXml(cmd)}</mi>`);
              continue;
            }
            nodes.push(`<mi>${escapeXml(cmd)}</mi>`);
            continue;
          }
        }
        let node = "";
        if (/[0-9]/.test(char)) {
          let num = "";
          while (p < l && /[0-9.]/.test(input[p])) num += input[p++];
          node = `<mn>${num}</mn>`;
        } else if (/[a-zA-Z]/.test(char)) {
          node = `<mi>${char}</mi>`;
          p++;
        } else if (char === "{") {
          p++;
          const start = p;
          let depth = 1;
          while (p < l && depth > 0) {
            if (input[p] === "{" && input[p - 1] !== "\\") depth++;
            else if (input[p] === "}" && input[p - 1] !== "\\") depth--;
            p++;
          }
          node = `<mrow>${parseString(input.slice(start, p - 1))}</mrow>`;
        } else {
          node = `<mo>${escapeXml(char)}</mo>`;
          p++;
        }
        while (p < l) {
          skip();
          if (p < l && (input[p] === "^" || input[p] === "_")) {
            const isSup = input[p] === "^";
            p++;
            const scriptContent = readSubArg();
            const scriptHtml = `<mrow>${parseString(scriptContent)}</mrow>`;
            skip();
            if (p < l && input[p] === (isSup ? "_" : "^")) {
              p++;
              const secondContent = readSubArg();
              const secondHtml = `<mrow>${parseString(secondContent)}</mrow>`;
              const subHtml = isSup ? secondHtml : scriptHtml;
              const supHtml = isSup ? scriptHtml : secondHtml;
              node = `<msubsup>${node}${subHtml}${supHtml}</msubsup>`;
            } else {
              node = isSup ? `<msup>${node}${scriptHtml}</msup>` : `<msub>${node}${scriptHtml}</msub>`;
            }
          } else {
            break;
          }
        }
        nodes.push(node);
      }
      return nodes.join("");
    }
    try {
      const mathmlBody = parseString(trimmed);
      const displayAttr = isBlock ? ' display="block"' : ' display="inline"';
      const blockClass = isBlock ? ' class="obs-math-block"' : ' class="obs-math-inline"';
      return `<math xmlns="http://www.w3.org/1998/Math/MathML"${displayAttr}${blockClass} data-latex="${escapeAttr(trimmed)}">${mathmlBody}</math>`;
    } catch (err) {
      console.warn("[MarkdownAst] LaTeX parse fallback:", err);
      return `<span class="obs-math-error" title="${escapeAttr(err?.message || String(err))}">${escapeHtml(trimmed)}</span>`;
    }
  }
  isValidInlineLatex(math) {
    const trimmed = math.trim();
    if (!trimmed || trimmed.length > 200) return false;
    if (math.startsWith(" ") || math.endsWith(" ")) return false;
    if (/^[\d,.]+[a-zA-Z%]*$/.test(trimmed)) return false;
    if (/[\u4e00-\u9fa5]/.test(trimmed) && !trimmed.includes("\\")) return false;
    const hasLatexMacro = /\\[a-zA-Z]+/.test(trimmed);
    const hasMathSuperSub = /[\^_]\{?[a-zA-Z0-9+\-=]\}?/.test(trimmed);
    const hasMathRelation = /[=<>+\-*/]/.test(trimmed) && /[a-zA-Z]/.test(trimmed);
    return hasLatexMacro || hasMathSuperSub || hasMathRelation;
  }
  isTableDelimiterRow(line) {
    if (!line) return false;
    const clean = line.trim().replace(/[\u2010-\u2015\u2212\ufe58\ufe63\uff0d]/g, "-").replace(/\uff5c/g, "|");
    if (!clean.includes("|")) return false;
    const cells = clean.replace(/^\||\|$/g, "").split("|");
    if (!cells.length) return false;
    return cells.every((c) => /^\s*:?-+:?\s*$/.test(c));
  }
  parseTableAlignments(delimiterLine) {
    const clean = delimiterLine.trim().replace(/[\u2010-\u2015\u2212\ufe58\ufe63\uff0d]/g, "-").replace(/\uff5c/g, "|");
    const cells = clean.replace(/^\||\|$/g, "").split("|");
    return cells.map((c) => {
      const trimmed = c.trim();
      const left = trimmed.startsWith(":");
      const right = trimmed.endsWith(":");
      if (left && right) return "center";
      if (right) return "right";
      return "left";
    });
  }
  tableCells(line, expectedColumns) {
    if (!line) return [];
    const clean = line.trim().replace(/\uff5c/g, "|");
    let parts = clean.split("|").map((cell) => cell.trim());
    if (clean.startsWith("|") && clean.endsWith("|") && parts.length >= 3) {
      parts = parts.slice(1, -1);
    } else if (clean.endsWith("|")) {
      parts = parts.slice(0, -1);
    } else if (clean.startsWith("|")) {
      if (expectedColumns && parts.length > expectedColumns) {
        parts = parts.slice(1);
      }
    }
    return parts;
  }
  // ==========================================================================
  // Markdown AST 分块与纯文本语法编译
  // ==========================================================================
  splitFrontmatter(source) {
    const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
    return match ? { frontmatter: match[1], body: source.slice(match[0].length) } : { frontmatter: "", body: source };
  }
  normalizeMarkdownHtml(source) {
    const fences = [];
    let text = String(source).replace(/```[\s\S]*?```/g, (block) => `\0FENCE${fences.push(block) - 1}\0`).replace(/\$\$[\s\S]*?\$\$/g, (block) => `\0FENCE${fences.push(block) - 1}\0`);
    text = text.replace(/<!--[\s\S]*?-->/g, "");
    text = text.replace(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>\s*<picture\b[^>]*>([\s\S]*?)<\/picture>\s*<\/a>/gi, (_, href, picture) => {
      const alt = picture.match(/<img\b[^>]*alt=["']([^"']*)["']/i)?.[1] || "\u67E5\u770B\u56FE\u7247";
      return `[${alt}](${href})`;
    });
    text = text.replace(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>([^<]*)<\/a>/gi, (_, href, label) => `[${label.trim() || href}](${href})`);
    text = text.replace(/<img\b([^>]*)\/?>/gi, (_, attrs) => {
      const srcMatch = attrs.match(/\bsrc=["']([^"']+)["']/i) || attrs.match(/\bdata-src=["']([^"']+)["']/i);
      const altMatch = attrs.match(/\balt=["']([^"']*)["']/i);
      const src = srcMatch ? srcMatch[1] : "";
      const alt = altMatch ? altMatch[1] : "";
      return src ? `![${alt}](${src})` : "";
    });
    text = text.replace(/<(https?:\/\/[^>\s]+)>/gi, (_, href) => `[${href}](${href})`);
    text = text.replace(/<([\w.+-]+@[\w.-]+\.[A-Za-z]{2,})>/g, (_, address) => `[${address}](mailto:${address})`);
    text = text.replace(/<br\s*\/?>/gi, "\n");
    text = text.replace(/<\/?(?:a|picture|source|sub|details|summary|b|input|button)\b[^>]*>/gi, "");
    return text.replace(/\u0000FENCE(\d+)\u0000/g, (_, index) => fences[Number(index)] || "");
  }
  extractFootnotes(source) {
    const lines = source.replace(/\r\n?/g, "\n").split("\n");
    const body = [];
    const definitions = /* @__PURE__ */ new Map();
    for (let index = 0; index < lines.length; index++) {
      const match = lines[index].match(/^\[\^([^\]]+)\]:\s*(.*)$/);
      if (!match) {
        body.push(lines[index]);
        continue;
      }
      const parts = [match[2]];
      while (index + 1 < lines.length && /^(?: {2,}|\t)\S/.test(lines[index + 1])) parts.push(lines[++index].trim());
      const id = match[1].trim();
      if (!definitions.has(id)) definitions.set(id, { id, number: definitions.size + 1, text: parts.join(" ").trim() });
    }
    return { body: body.join("\n"), definitions };
  }
  inlineMarkdown(value, options = {}) {
    const code = [];
    const semanticSpans = [];
    const mathTokens = [];
    let text = String(value);
    const renderMode = options.renderMode || "rendered";
    if (renderMode !== "md") {
      text = text.replace(/(?<![\w\\$])\$(?!\s|\d)(.+?)(?<!\s)\$(?![\w$])/g, (match, math) => {
        if (this.isValidInlineLatex(math)) {
          return `\0MATH${mathTokens.push(this.latexToMathML(math.trim(), false)) - 1}\0`;
        }
        return match;
      });
      text = text.replace(/\\\(([\s\S]+?)\\\)/g, (match, math) => {
        if (this.isValidInlineLatex(math)) {
          return `\0MATH${mathTokens.push(this.latexToMathML(math.trim(), false)) - 1}\0`;
        }
        return match;
      });
    }
    text = text.replace(/<span\s+class=["'](category|vocabulary|definition)["']\s*>|<\/span>/gi, (_, className) => {
      const safeTag = className ? `<span class="${className.toLowerCase()}">` : "</span>";
      return `\0SEM${semanticSpans.push(safeTag) - 1}\0`;
    }).replace(/`([^`]+)`/g, (_, content) => `\0CODE${code.push(`<code class="obs-inline-code">${escapeHtml(content)}</code>`) - 1}\0`);
    const safeHtmlTokens = [];
    if (options.linkMode === "web") {
      text = text.replace(/<\/?(?:a|img)\b[^>]*\/?>/gi, (tag) => `\0HTML${safeHtmlTokens.push(tag) - 1}\0`);
    }
    text = text.replace(/<\/?(?:h[1-6]|p|div|span|hr|br|sup|sub|strong|b|em|i|u|s|del|kbd|details|summary|table|thead|tbody|tr|th|td|ul|ol|li|picture|source)\b[^>]*\/?>/gi, (tag) => {
      if (/on\w+\s*=/i.test(tag) || /javascript:/i.test(tag)) {
        return "";
      }
      return `\0HTML${safeHtmlTokens.push(tag) - 1}\0`;
    });
    text = escapeHtml(text);
    text = text.replace(/\u0000HTML(\d+)\u0000/g, (_, idx) => safeHtmlTokens[Number(idx)] || "");
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, rawAlt, rawSrc) => {
      const alt = rawAlt.trim();
      const src = rawSrc.trim();
      const isRemote = /^https?:\/\//i.test(src) || src.startsWith("data:");
      const srcAttr = isRemote ? `src="${escapeAttr(src)}"` : `src="" data-vault-src="${escapeAttr(src)}"`;
      const caption = alt ? `<figcaption class="obs-media-caption">${escapeHtml(alt)}</figcaption>` : "";
      return `<figure class="obs-media-figure"><img class="obs-rendered-img" ${srcAttr} alt="${escapeAttr(alt)}" loading="lazy" referrerpolicy="no-referrer">${caption}</figure>`;
    });
    text = text.replace(/!\[\[([^\]]+)\]\]/g, (_, content) => {
      const [rawTarget, widthStr] = content.trim().split("|");
      const target = rawTarget.trim();
      const isImage = /\.(png|jpe?g|webp|gif|svg|bmp|avif)$/i.test(target);
      if (isImage) {
        const widthVal = parseInt(widthStr, 10);
        const styleAttr = widthVal > 0 ? `style="max-width:${widthVal}px;"` : "";
        return `<figure class="obs-media-figure"><img class="obs-rendered-img" src="" data-vault-src="${escapeAttr(target)}" alt="${escapeAttr(target)}" ${styleAttr} loading="lazy" referrerpolicy="no-referrer"><figcaption class="obs-media-caption">${escapeHtml(target)}</figcaption></figure>`;
      }
      return `<span class="obs-embed">\u25EB ${escapeHtml(content)}</span>`;
    });
    text = text.replace(/\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g, (_, target, heading, alias) => {
      return `<a class="obs-wikilink" href="#" data-target="${escapeAttr(target.trim())}">${escapeHtml(alias || target)}${heading ? ` \u203A ${escapeHtml(heading)}` : ""}</a>`;
    });
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, target) => {
      const cleanTarget = target.trim();
      if (options.linkMode !== "web" && /\.md(?:#.*)?$/i.test(cleanTarget)) {
        const noteTarget = cleanTarget.split("#")[0].replace(/\\/g, "/").split("/").pop()?.replace(/\.md$/i, "") || cleanTarget;
        return `<a class="obs-wikilink" href="#" data-target="${escapeAttr(noteTarget)}">${label}</a>`;
      }
      if (options.linkMode === "web" && cleanTarget.startsWith("#")) {
        return `<a href="${escapeAttr(cleanTarget)}">${label}</a>`;
      }
      if (/^https?:\/\//i.test(cleanTarget) || /^mailto:/i.test(cleanTarget)) {
        return `<a class="obs-external-link" href="${escapeAttr(cleanTarget)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
      }
      return `<span class="obs-relative-link" title="${escapeAttr(cleanTarget)}">${label}</span>`;
    });
    text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/~~([^~]+)~~/g, "<del>$1</del>").replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
    text = text.replace(/(^|\s)(#[\p{L}\p{N}_/-]+)/gu, '$1<span class="obs-tag-inline" data-tag="$2">$2</span>');
    text = text.replace(/\u0000CODE(\d+)\u0000/g, (_, index) => code[Number(index)] || "");
    text = text.replace(/\u0000SEM(\d+)\u0000/g, (_, index) => semanticSpans[Number(index)] || "");
    text = text.replace(/\u0000MATH(\d+)\u0000/g, (_, index) => mathTokens[Number(index)] || "");
    return text;
  }
  renderMarkdown(source, options = {}) {
    const { frontmatter, body } = this.splitFrontmatter(source);
    const footnoteDoc = this.extractFootnotes(this.normalizeMarkdownHtml(body));
    const lines = footnoteDoc.body.replace(/\u00a0/g, " ").replace(/\r\n?/g, "\n").split("\n");
    const renderMode = options.renderMode || "rendered";
    let html = "";
    let i = 0;
    let taskIndex = 0;
    let tableIndex = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (/^\s*\$\$/.test(line)) {
        const mathLines = [];
        let restOfLine = line.replace(/^\s*\$\$/, "");
        if (restOfLine.endsWith("$$") && restOfLine.length >= 2) {
          mathLines.push(restOfLine.slice(0, -2));
          i++;
        } else {
          mathLines.push(restOfLine);
          i++;
          while (i < lines.length && !lines[i].includes("$$")) {
            mathLines.push(lines[i++]);
          }
          if (i < lines.length) {
            const endIdx = lines[i].indexOf("$$");
            mathLines.push(lines[i].slice(0, endIdx));
            i++;
          }
        }
        const mathContent = mathLines.join("\n").trim();
        if (renderMode === "md") {
          html += `<pre class="obs-code-block obs-math-raw"><span class="obs-code-lang">latex</span><code>${escapeHtml(mathContent)}</code></pre>`;
        } else {
          html += `<div class="obs-math-block">${this.latexToMathML(mathContent, true)}</div>`;
        }
        continue;
      }
      if (/^```/.test(line)) {
        const language = line.slice(3).trim();
        const code = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) code.push(lines[i++]);
        i++;
        if ((language === "latex" || language === "math") && renderMode !== "md") {
          html += `<div class="obs-math-block">${this.latexToMathML(code.join("\n").trim(), true)}</div>`;
        } else {
          html += `<pre class="obs-code-block"><span class="obs-code-lang">${escapeHtml(language || "code")}</span><code>${escapeHtml(code.join("\n"))}</code></pre>`;
        }
        continue;
      }
      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) {
        const level = heading[1].length;
        const title = heading[2];
        html += `<h${level} class="obs-h${level}">${this.inlineMarkdown(title, options)}</h${level}>`;
        i++;
        continue;
      }
      if (/^\s*(---+|___+|\*\*\*+|——+|───+)\s*$/.test(line)) {
        html += "<hr>";
        i++;
        continue;
      }
      const task = line.match(/^\s*[-*]\s+\[([ xX])\]\s+(.+)$/);
      if (task) {
        const checked = task[1].toLowerCase() === "x";
        html += `<div class="obs-task-item ${checked ? "checked" : ""}"><input class="obs-task-cb" data-task-idx="${taskIndex++}" type="checkbox" ${checked ? "checked" : ""}><span class="obs-task-label">${this.inlineMarkdown(task[2], options)}</span></div>`;
        i++;
        continue;
      }
      if (/^>\s?/.test(line)) {
        const quote = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) quote.push(lines[i++].replace(/^>\s?/, ""));
        const callout = quote[0]?.match(/^\[!(\w+)\][+-]?\s*(.*)$/i);
        if (callout) {
          html += `<aside class="obs-callout obs-callout-${escapeAttr(callout[1].toLowerCase())}"><strong>${escapeHtml(callout[2] || callout[1])}</strong>${quote.slice(1).map((row) => `<p>${this.inlineMarkdown(row, options)}</p>`).join("")}</aside>`;
        } else {
          html += `<blockquote class="obs-quote">${quote.map((row) => this.inlineMarkdown(row, options)).join("<br>")}</blockquote>`;
        }
        continue;
      }
      if (/^\s*[-*+]\s+/.test(line)) {
        const rows = [];
        while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) rows.push(lines[i++].replace(/^\s*[-*+]\s+/, ""));
        html += `<ul>${rows.map((row) => `<li>${this.inlineMarkdown(row, options)}</li>`).join("")}</ul>`;
        continue;
      }
      let delimIdx = -1;
      if (line.includes("|") || line.includes("\uFF5C")) {
        if (i + 1 < lines.length && this.isTableDelimiterRow(lines[i + 1])) {
          delimIdx = i + 1;
        } else if (i + 2 < lines.length && !lines[i + 1].trim() && this.isTableDelimiterRow(lines[i + 2])) {
          delimIdx = i + 2;
        }
      }
      if (delimIdx !== -1) {
        const header = this.tableCells(line);
        const aligns = this.parseTableAlignments(lines[delimIdx]);
        i = delimIdx + 1;
        const rows = [];
        while (i < lines.length) {
          if (!lines[i].trim()) {
            let nextNonBlank = i + 1;
            while (nextNonBlank < lines.length && !lines[nextNonBlank].trim()) nextNonBlank++;
            if (nextNonBlank < lines.length && (lines[nextNonBlank].includes("|") || lines[nextNonBlank].includes("\uFF5C")) && !this.isTableDelimiterRow(lines[nextNonBlank])) {
              i = nextNonBlank;
            } else {
              break;
            }
          }
          const currLine = lines[i];
          if (!currLine.includes("|") && !currLine.includes("\uFF5C")) break;
          const cells = this.tableCells(currLine, header.length);
          while (cells.length < header.length) cells.push("");
          rows.push(cells);
          i++;
        }
        const currentTableIndex = tableIndex++;
        html += `<div class="obs-table-wrap" data-table-index="${currentTableIndex}"><table><thead><tr>${header.map((cell, idx) => `<th style="text-align:${aligns[idx] || "left"}">${this.inlineMarkdown(cell, options)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell, colIdx) => `<td style="text-align:${aligns[colIdx] || "left"}">${this.inlineMarkdown(cell, options)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
        continue;
      }
      if (!line.trim()) {
        i++;
        continue;
      }
      const paragraph = [line];
      i++;
      while (i < lines.length && lines[i].trim() && !/^(```|#{1,6}\s|>\s?|\s*[-*+]\s+|\s*\$\s*)/.test(lines[i]) && !(lines[i].includes("|") && this.isTableDelimiterRow(lines[i + 1]))) {
        paragraph.push(lines[i++]);
      }
      const rawCombined = paragraph.join("\n").trim();
      if (/^<([a-z0-9_-]+)[^>]*>/i.test(rawCombined) && /<\/([a-z0-9_-]+)>\s*$/i.test(rawCombined)) {
        html += this.inlineMarkdown(rawCombined.replace(/\r?\n/g, " "), options) + "\n";
      } else {
        const formatted = paragraph.map((p, idx) => {
          const hasHardBreak = /(?: {2,}|\\)$/.test(p);
          const cleanLine = p.replace(/(?: {2,}|\\)$/, "");
          const rendered = this.inlineMarkdown(cleanLine, options);
          return idx < paragraph.length - 1 ? hasHardBreak ? rendered + "<br>" : rendered + " " : rendered;
        }).join("");
        html += `<p>${formatted}</p>
`;
      }
    }
    return html;
  }
  extractWikilinks(source) {
    const links = [];
    const matches = source.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g);
    for (const m of matches) {
      if (m[1]) links.push(m[1].trim());
    }
    return [...new Set(links)];
  }
  extractTags(source) {
    const tags = [];
    const matches = source.matchAll(/(?:^|\s)(#[\p{L}\p{N}_/-]+)/gu);
    for (const m of matches) {
      if (m[1]) tags.push(m[1].trim());
    }
    return [...new Set(tags)];
  }
};
var markdownAstEngine = MarkdownAstEngine.getInstance();
export {
  ACCENTS,
  BLACKBOARD,
  FUNCTIONS,
  GREEK,
  MarkdownAstEngine,
  SYMBOLS,
  markdownAstEngine
};
