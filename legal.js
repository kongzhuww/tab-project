const documents = {
  licenses: "THIRD-PARTY-LICENSES.md",
  services: "THIRD-PARTY-SERVICES.md",
  privacy: "PRIVACY.md",
  attribution: "ATTRIBUTION.md"
};
const key = new URLSearchParams(location.search).get("doc") || "licenses";
const output = document.getElementById("document");

function appendLink(label, target) {
  const localDoc = Object.entries(documents).find(([, filename]) => filename === target);
  let url;
  try { url = new URL(localDoc ? `legal.html?doc=${localDoc[0]}` : target, location.href); }
  catch { output.append(document.createTextNode(label)); return; }
  const isLocal = url.protocol === location.protocol && url.host === location.host;
  if (!["https:", "http:"].includes(url.protocol) && !isLocal) {
    output.append(document.createTextNode(label));
    return;
  }
  const link = document.createElement("a");
  link.textContent = label;
  link.href = url.href;
  if (!isLocal) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
  output.append(link);
}

async function showDocument() {
  if (!Object.hasOwn(documents, key)) { output.textContent = "文档不存在。"; return; }
  try {
    const response = await fetch(documents[key]);
    if (!response.ok) throw new Error("document unavailable");
    const text = await response.text();
    output.replaceChildren();
    const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    let position = 0;
    for (const match of text.matchAll(pattern)) {
      output.append(document.createTextNode(text.slice(position, match.index)));
      appendLink(match[1], match[2]);
      position = match.index + match[0].length;
    }
    output.append(document.createTextNode(text.slice(position)));
  } catch { output.textContent = "无法读取文档，请检查扩展文件是否完整。"; }
}
void showDocument();
