/** Install trusted, compiled-in CSS before its view renders. Never use remote/user CSS here. */
export function ensureViewStyles(id: string, css: string): void {
  if (document.getElementById(id)) return;
  const sheet = document.createElement("style");
  sheet.id = id;
  sheet.textContent = css;
  document.head.appendChild(sheet);
  // Retain for this document's lifetime: avoids reparsing on reopen and covers retained views.
}
