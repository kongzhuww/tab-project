// Classic external script: MV3 blocks inline JavaScript in extension pages.
(() => {
  const html = document.documentElement;
  try {
    const primary = localStorage.getItem("showStartupAnimation");
    const saved = primary ?? localStorage.getItem("logicweaverEndfieldLoader");
    const enabled = saved === "1" || saved === "true";
    html.classList.toggle("skip-endfield-loader", !enabled);
    document.body.classList.toggle("is-starting", enabled);
    const card = location.hash.slice(1) || sessionStorage.getItem("lw_active_card");
    if (["todoist", "card-github", "daily-aihot", "daily-bilibili", "daily-youtube", "daily-pricing"].includes(card || "")) {
      html.classList.add("has-card-fullscreen");
      document.body.classList.add("has-card-fullscreen");
    }
  } catch {
    html.classList.add("skip-endfield-loader");
  }

  // Only a failure escape hatch; normal teardown belongs to the Vue intro host.
  const watchdog = window.setTimeout(() => {
    if (!document.body.classList.contains("is-starting")) return;
    document.getElementById("endfield-loader")?.remove();
    document.body.classList.remove("is-starting");
  }, 10000);
  window.addEventListener("logicweaver:intro-complete", () => clearTimeout(watchdog), { once: true });
  window.addEventListener("load", () => { html.dataset.windowLoaded = "true"; }, { once: true });
})();
