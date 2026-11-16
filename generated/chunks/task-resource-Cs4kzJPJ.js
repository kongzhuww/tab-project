const n = "application/x-tab-project-todoist-resource";
function i(e, t) {
  return Array.from(e).slice(0, t).join("");
}
function o(e) {
  if (!/^[a-z0-9_-]{1,128}$/i.test(e.id) || !e.content?.trim()) return null;
  const t = e.description || "";
  return {
    kind: "todoist",
    id: e.id,
    title: i(e.content.trim(), 300),
    url: `https://app.todoist.com/app/task/${encodeURIComponent(e.id)}`,
    description: i(t, 2e3),
    truncated: Array.from(t).length > 2e3,
    dueDate: i(e.dueDate || "", 40)
  };
}
function r(e) {
  if (!e || e.length > 16e3) return null;
  try {
    const t = JSON.parse(e);
    return !t || t.kind !== "todoist" || typeof t.id != "string" || !/^[a-z0-9_-]{1,128}$/i.test(t.id) || typeof t.title != "string" || !t.title.trim() || Array.from(t.title).length > 300 || t.description != null && (typeof t.description != "string" || Array.from(t.description).length > 2e3) || t.dueDate != null && (typeof t.dueDate != "string" || Array.from(t.dueDate).length > 40) ? null : {
      kind: "todoist",
      id: t.id,
      title: t.title.trim(),
      url: `https://app.todoist.com/app/task/${encodeURIComponent(t.id)}`,
      description: t.description || "",
      dueDate: t.dueDate || "",
      truncated: t.truncated === !0
    };
  } catch {
    return null;
  }
}
export {
  n as T,
  o as m,
  r as p
};
