// src/bilibili/subscription-chapters.ts
function extractSubscriptionChapters(doc) {
  const cues = Array.isArray(doc?.cues) ? doc.cues : [];
  const desc = String(doc?.desc || "").trim();
  const viewPoints = Array.isArray(doc?.viewPoints) ? doc.viewPoints : [];
  const chapters = [];
  if (viewPoints.length > 0) {
    for (let i = 0; i < viewPoints.length; i++) {
      const vp = viewPoints[i];
      const from = Math.max(0, Number(vp.from || 0));
      const nextFrom = i + 1 < viewPoints.length ? Number(viewPoints[i + 1].from || 0) : 0;
      const to = Math.max(from, Number(vp.to || (nextFrom ? nextFrom : cues.length ? cues[cues.length - 1].to : from + 120)));
      const title = String(vp.content || vp.title || vp.part_name || `\u7B2C ${i + 1} \u8282`).trim();
      const matchedCues = cues.filter((c) => c.from >= from && (nextFrom ? c.from < nextFrom : c.from <= to));
      chapters.push({
        id: i,
        from,
        to,
        title,
        cues: matchedCues.map((c, idx) => ({ index: idx, from: c.from, to: c.to, content: c.content })),
        source: "viewpoint"
      });
    }
  }
  if (!chapters.length && desc) {
    const regex = /(?:^|\r?\n)\s*(?:\[?(\d{1,2}:)?(\d{1,2}):(\d{2})\]?)\s*(?:[-–—|：:\s]\s*)?([^\r\n]{2,80})/g;
    let match;
    const parsedPoints = [];
    while ((match = regex.exec(desc)) !== null) {
      const h = match[1] ? parseInt(match[1], 10) : 0;
      const m = parseInt(match[2], 10);
      const s = parseInt(match[3], 10);
      const from = h * 3600 + m * 60 + s;
      const title = match[4].replace(/^[-–—|：:\s]+/, "").trim();
      if (title && !/^(点赞|投币|收藏|关注|交流群|合作|vx|微信|qq|微博)/i.test(title)) {
        parsedPoints.push({ from, title });
      }
    }
    if (parsedPoints.length >= 2) {
      let isIncreasing = true;
      for (let i = 1; i < parsedPoints.length; i++) {
        if (parsedPoints[i].from <= parsedPoints[i - 1].from) {
          isIncreasing = false;
          break;
        }
      }
      if (isIncreasing) {
        for (let i = 0; i < parsedPoints.length; i++) {
          const pt = parsedPoints[i];
          const nextPt = parsedPoints[i + 1];
          const from = pt.from;
          const to = nextPt ? nextPt.from : cues.length ? cues[cues.length - 1].to : from + 120;
          const matchedCues = cues.filter((c) => c.from >= from && (nextPt ? c.from < nextPt.from : c.from <= to));
          chapters.push({
            id: i,
            from,
            to,
            title: pt.title,
            cues: matchedCues.map((c, idx) => ({ index: idx, from: c.from, to: c.to, content: c.content })),
            source: "desc"
          });
        }
      }
    }
  }
  if (!chapters.length && cues.length > 0) {
    let currentCues = [];
    let segStart = cues[0].from;
    const flushSegment = (forceNextFrom = null) => {
      if (!currentCues.length) return;
      const from = currentCues[0].from;
      const to = currentCues[currentCues.length - 1].to;
      const firstLine = currentCues[0].content || "";
      const rawTitle = firstLine.replace(/^(那么|其实|所以|大家好|今天|那我们|接下来|然后|就是说)[,，\s]*/g, "").trim();
      const title = (rawTitle.length >= 4 ? rawTitle.slice(0, 24) : firstLine.slice(0, 24)) || `\u5C0F\u8282 ${chapters.length + 1}`;
      chapters.push({
        id: chapters.length,
        from,
        to: forceNextFrom !== null ? forceNextFrom : to,
        title,
        cues: currentCues.map((c, idx) => ({ index: idx, from: c.from, to: c.to, content: c.content })),
        source: "smart"
      });
      currentCues = [];
    };
    for (let i = 0; i < cues.length; i++) {
      const cue = cues[i];
      const nextCue = cues[i + 1];
      currentCues.push(cue);
      const durationSoFar = cue.to - segStart;
      const pauseAfter = nextCue ? nextCue.from - cue.to : 0;
      const endsWithPunct = /[。！？!?]$/.test(cue.content);
      const isTransitionStart = nextCue && /^(接下来|第二|第三|第四|另外|总的来说|最后|在.+方面|回顾|来看)/.test(nextCue.content);
      const shouldSplit = pauseAfter >= 2.2 && (durationSoFar >= 18 || currentCues.length >= 4) || durationSoFar >= 45 && (endsWithPunct || isTransitionStart) || durationSoFar >= 75 && (endsWithPunct || pauseAfter >= 1);
      if (shouldSplit && nextCue) {
        flushSegment(nextCue.from);
        segStart = nextCue.from;
      }
    }
    flushSegment();
  }
  chapters.forEach((ch) => {
    if (ch.cues && ch.cues.length > 0) {
      const lines = ch.cues.map((c) => c.content.trim()).filter(Boolean);
      const paragraphs = [];
      const paragraphCues = [];
      let buf = [];
      let cueBuf = [];
      let charCount = 0;
      for (let i = 0; i < ch.cues.length; i++) {
        const cue = ch.cues[i];
        let line = (cue.content || "").trim();
        if (!line) continue;
        if (!/[。！？!?；;：:，,、…”’）》】）]$/.test(line)) {
          if (i === ch.cues.length - 1 || /^(为什么|为何|怎么|如何|什么|是否|谁)/.test(line)) {
            line += "\u3002";
          } else {
            line += "\uFF0C";
          }
        }
        buf.push(line);
        cueBuf.push({
          index: i,
          from: Number(cue.from || 0),
          to: Number(cue.to || 0),
          content: line
        });
        charCount += line.length;
        if (/[。！？!?]$/.test(line) && (charCount >= 85 || cueBuf.length >= 4)) {
          paragraphs.push(buf.join(""));
          paragraphCues.push(cueBuf);
          buf = [];
          cueBuf = [];
          charCount = 0;
        }
      }
      if (buf.length) {
        paragraphs.push(buf.join(""));
        paragraphCues.push(cueBuf);
      }
      ch.paragraphs = paragraphs.length ? paragraphs : [lines.join("\uFF0C") + "\u3002"];
      ch.paragraphCues = paragraphCues.length ? paragraphCues : [ch.cues.map((c, i) => ({ index: i, from: c.from, to: c.to, content: c.content }))];
    } else {
      ch.paragraphs = [ch.title || "\u672C\u5C0F\u8282\u6682\u65E0\u6587\u672C\u5185\u5BB9\u3002"];
      ch.paragraphCues = [];
    }
  });
  return chapters;
}
export {
  extractSubscriptionChapters
};
