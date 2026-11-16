import type { AiHotDailyArchive, AiHotDailyReport } from "./aihot-feed-store";

/** Adapt the official nested daily response into the workspace article model. */
export function parseDailyReport(value: unknown): AiHotDailyReport | null {
  if (value === null) return null;
  const report = value as any;
  if (!report || typeof report.date !== "string" || !Array.isArray(report.sections)) throw new Error("日报响应格式不匹配");
  const sections = report.sections.map((section: any) => {
    if (!section || typeof section.label !== "string" || !Array.isArray(section.items)) throw new Error("日报分组格式不匹配");
    return { label: section.label, items: section.items.map((item: any) => {
      if (!item || typeof item.title !== "string") throw new Error("日报条目格式不匹配");
      const url = item.links?.aihot || item.links?.original || item.url || "";
      if (typeof url !== "string" || !/^https?:\/\//i.test(url)) throw new Error("日报条目链接格式不匹配");
      const match = url.match(/\/items\/([^/?#]+)/);
      return { id: String(item.id || match?.[1] || url), title: item.title, summary: typeof item.summary === "string" ? item.summary : "", sourceName: item.source?.name || item.sourceName || "AI 资讯", published: item.publishedAt || item.published || "", url, raw: item };
    }) };
  });
  return {
    date: report.date,
    leadTitle: typeof report.lead?.title === "string" ? report.lead.title : (typeof report.leadTitle === "string" ? report.leadTitle : ""),
    leadParagraph: typeof report.lead?.leadParagraph === "string" ? report.lead.leadParagraph : (typeof report.leadParagraph === "string" ? report.leadParagraph : ""),
    links: typeof report.links?.aihot === "string" && /^https?:\/\//i.test(report.links.aihot) ? { aihot: report.links.aihot } : undefined,
    sections
  };
}
export function parseDailyArchives(value: unknown): AiHotDailyArchive[] {
  const items = (value as any)?.items;
  if (!Array.isArray(items)) throw new Error("日报历史列表格式不匹配");
  return items.filter((item: any) => typeof item?.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(item.date)).map((item: any) => ({ date: item.date }));
}
