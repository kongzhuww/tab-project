/**
 * LogicWeaver 新标签页 - 图片搜索代理与提取（突破页面 CSP 与跨域限制）(TypeScript 模块)
 */

export interface WebImageResult {
  title: string;
  url: string;
  fallbackUrl?: string;
  source: string;
  sourceLabel: string;
}

export function handleSearchWebImages(message: any, sendResponse: (res: any) => void): boolean {
  const query = String(message?.query || "").trim();
  if (!query) {
    sendResponse({ ok: true, items: [] });
    return false;
  }

  // 1. Edge / Bing 官方图片引擎搜索（限时 3.5s 超时）
  const bingPromise = (async (): Promise<WebImageResult[]> => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3500);
      const bingUrl = `https://cn.bing.com/images/async?q=${encodeURIComponent(query + " 图标")}&first=1&count=20&mmasync=1`;
      const res = await fetch(bingUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"
        }
      });
      clearTimeout(timer);
      const html = await res.text();
      const cards = [...html.matchAll(/class=["']iusc["'][^>]*m=["']([^"']+)["']/g)]
        .map((m) => {
          try {
            return JSON.parse(m[1].replace(/&quot;/g, '"'));
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      const list: WebImageResult[] = [];
      cards.slice(0, 16).forEach((card) => {
        const rawTitle = (card.t || card.desc || `${query} 图标`).replace(/[\uE000-\uE001]|<[^>]+>/g, "").slice(0, 20);
        const cdnThumb = card.turl ? card.turl.replace(/&amp;/g, "&") : "";
        const original = card.murl;
        const primaryUrl = cdnThumb || original;
        if (primaryUrl) {
          list.push({
            title: rawTitle,
            url: primaryUrl,
            fallbackUrl: original !== primaryUrl ? original : "",
            source: "webimg",
            sourceLabel: "高清图标"
          });
        }
      });
      return list;
    } catch {
      return [];
    }
  })();

  // 2. 百度图片引擎搜索（限时 3s 超时，只发起 1 个精准请求）
  const baiduPromise = (async (): Promise<WebImageResult[]> => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3000);
      const url = `https://image.baidu.com/search/acjson?tn=resultjson_com&logid=1&ipn=rj&ct=201326592&is=&fp=result&fr=&word=${encodeURIComponent(
        query + " 图标"
      )}&queryWord=${encodeURIComponent(
        query + " 图标"
      )}&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&hd=&latest=&copyright=&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&expermode=&nojc=&isAsync=&pn=0&rn=12`;
      const r = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);
      const data = await r.json();
      return (data?.data || [])
        .filter((x: any) => x?.thumbURL)
        .slice(0, 12)
        .map((x: any) => ({
          title: (x.fromPageTitleEnc || query).replace(/<[^>]+>/g, "").slice(0, 20),
          url: x.thumbURL,
          source: "webimg",
          sourceLabel: "精选图标"
        }));
    } catch {
      return [];
    }
  })();

  Promise.allSettled([bingPromise, baiduPromise])
    .then((resultsArray) => {
      const merged: WebImageResult[] = [];
      const seen = new Set<string>();
      resultsArray.forEach((res) => {
        if (res.status === "fulfilled" && Array.isArray(res.value)) {
          res.value.forEach((item) => {
            if (!seen.has(item.url)) {
              seen.add(item.url);
              merged.push(item);
            }
          });
        }
      });
      sendResponse({ ok: true, items: merged.slice(0, 24) });
    })
    .catch((err) => {
      sendResponse({ ok: false, error: err?.message, items: [] });
    });
  return true;
}

export function handleFetchSiteImages(message: any, sendResponse: (res: any) => void): boolean {
  const siteUrl = String(message?.url || "").trim();
  if (!siteUrl) {
    sendResponse({ ok: true, items: [] });
    return false;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  fetch(siteUrl, { signal: controller.signal })
    .then((r) => r.text())
    .then((html) => {
      clearTimeout(timer);
      const origin = new URL(siteUrl).origin;
      const items: WebImageResult[] = [];
      const seen = new Set<string>();
      const matches = [...html.matchAll(/(?:src|href)=["']([^"']+\.(?:png|jpg|jpeg|svg|ico|webp)(?:\?[^"']*)?)["']/gi)];
      matches.forEach((m) => {
        try {
          const raw = m[1];
          const fullUrl = new URL(raw, origin).href;
          const lower = fullUrl.toLowerCase();
          if (seen.has(fullUrl)) return;
          if (/logo|icon|favicon|touch|brand|avatar|mark/i.test(lower)) {
            seen.add(fullUrl);
            items.unshift({
              title: "网站图标",
              url: fullUrl,
              source: "siteextract",
              sourceLabel: "站点原生"
            });
          } else if (items.length < 8) {
            seen.add(fullUrl);
            items.push({
              title: "网页图片",
              url: fullUrl,
              source: "siteextract",
              sourceLabel: "网页图片"
            });
          }
        } catch {}
      });
      sendResponse({ ok: true, items: items.slice(0, 10) });
    })
    .catch((err) => {
      clearTimeout(timer);
      sendResponse({ ok: false, error: err?.message, items: [] });
    });
  return true;
}
