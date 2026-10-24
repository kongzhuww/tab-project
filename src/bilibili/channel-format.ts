/** Channel display helpers. No network, storage, DOM or singleton initialization. */
export function formatBiliDuration(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds || 0));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${String(rem).padStart(2, "0")}`;
}

export function formatBiliCompactNumber(value: number | string): string {
  const num = Number(value || 0);
  if (!Number.isFinite(num) || num <= 0) return "0";
  if (num >= 100000000) return `${(num / 100000000).toFixed(1).replace(/\.0$/, "")}亿`;
  if (num >= 10000) return `${(num / 10000).toFixed(1).replace(/\.0$/, "")}万`;
  return String(num);
}

export function formatSrtTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds || 0));
  const m = Math.floor(s / 60);
  const remS = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  if (m >= 60) {
    const h = Math.floor(m / 60);
    const remM = m % 60;
    return `${pad(h)}:${pad(remM)}:${pad(remS)}`;
  }
  return `${pad(m)}:${pad(remS)}`;
}

export function parseDurationToSeconds(str: string): number {
  if (!str) return 0;
  const parts = String(str).split(":").map(Number);
  if (parts.length === 2) return (parts[0] || 0) * 60 + (parts[1] || 0);
  if (parts.length === 3) return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
  return Number(str) || 0;
}

export function parseTranscriptParagraphs(text: string): string[] {
  const lines = String(text || "")
    .split(/\r?\r\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const sentences = lines
    .filter((line, index) => index === 0 || line !== lines[index - 1])
    .map((line) => {
      if (/[。！？!?；;：:，,、…”’）》】）]$/.test(line)) return line;
      if (/^(为什么|为何|怎么|如何|什么|是否|谁|哪[个里])/.test(line) || /(吗|么|呢|为何|为什么|怎么|如何|多少|什么|哪[个里]|是否)$/.test(line)) {
        return `${line}？`;
      }
      return `${line}。`;
    });
  const paragraphs: string[] = [];
  let paragraph = "";
  sentences.forEach((sentence) => {
    paragraph += sentence;
    if (paragraph.length >= 450) {
      paragraphs.push(paragraph);
      paragraph = "";
    }
  });
  if (paragraph) paragraphs.push(paragraph);
  return paragraphs;
}
