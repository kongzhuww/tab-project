import { markdownAstEngine } from "../utils/markdown-ast";

/** Recognize the common LaTeX \[...\] block form without altering fenced code. */
export function normalizeMathBlocks(source: string): string {
  let fence = "";
  return source.replace(/\r\n?/g, "\n").split("\n").map(line => {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      const type = marker[1][0];
      if (!fence) fence = type; else if (fence === type) fence = "";
      return line;
    }
    if (fence) return line;
    return line.replace(/^(\s*)\\\[/, (_match, indent: string) => `${indent}$$`).replace(/\\\](\s*)$/, (_match, trailing: string) => `$$${trailing}`);
  }).join("\n");
}

export function renderMessageMarkdown(source: string): string {
  return markdownAstEngine.renderMarkdown(normalizeMathBlocks(source), { linkMode: 'web', useFastRenderer: false });
}

const HTML_NS = 'http://www.w3.org/1999/xhtml';
const MATH_NS = 'http://www.w3.org/1998/Math/MathML';
const htmlTags = new Set(['p','br','hr','div','span','h1','h2','h3','h4','h5','h6','strong','b','em','i','del','s','ul','ol','li','blockquote','pre','code','a','table','thead','tbody','tr','th','td','sup','sub','kbd','aside']);
const mathTags = new Set(['math','mrow','mi','mn','mo','mfrac','msqrt','mroot','msup','msub','msubsup','mover','mspace','mstyle','mtext']);
const dropTags = new Set(['script','style','iframe','object','embed','svg','img','picture','source','video','audio','form','input','button','link','meta']);

/** Rebuild only inert, known markup. Never insert model-supplied HTML or attributes. */
export function safeMarkdownFragment(html: string, doc: Document = document): DocumentFragment {
  const template = doc.createElement('template');
  template.innerHTML = html;
  const result = doc.createDocumentFragment();
  function copy(source: Node, target: Node): void {
    if (source.nodeType === 3) { target.appendChild(doc.createTextNode(source.textContent || '')); return; }
    if (source.nodeType !== 1) return;
    const element = source as Element;
    const name = element.localName.toLowerCase();
    if (dropTags.has(name)) return;
    const math = element.namespaceURI === MATH_NS && mathTags.has(name);
    const allowed = math || (element.namespaceURI === HTML_NS && htmlTags.has(name));
    if (!allowed) { for (const child of Array.from(element.childNodes)) copy(child, target); return; }
    const clean = math ? doc.createElementNS(MATH_NS, name) : doc.createElement(name);
    if (name === 'a' && !math) {
      const href = element.getAttribute('href') || '';
      try {
        const url = new URL(href);
        if (url.protocol === 'https:' || url.protocol === 'http:' || url.protocol === 'mailto:') {
          clean.setAttribute('href', url.href);
          clean.setAttribute('target', '_blank');
          clean.setAttribute('rel', 'noopener noreferrer');
        }
      } catch { /* Non-absolute or malformed links remain inert. */ }
    }
    if (math && name === 'math' && element.getAttribute('display') === 'block') clean.setAttribute('display', 'block');
    if (math && name === 'mstyle' && element.getAttribute('mathvariant') === 'bold') clean.setAttribute('mathvariant', 'bold');
    if (math && name === 'mspace' && element.getAttribute('linebreak') === 'newline') clean.setAttribute('linebreak', 'newline');
    for (const child of Array.from(element.childNodes)) copy(child, clean);
    target.appendChild(clean);
  }
  for (const child of Array.from(template.content.childNodes)) copy(child, result);
  return result;
}
