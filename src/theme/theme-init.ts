/**
 * LogicWeaver · Theme Instant Init (TypeScript 重构版)
 * 在 <head> 中最先同步执行，确保主题变量首帧即刻生效，消灭白屏/闪黑
 */
(() => {
  try {
    const t = localStorage.getItem("theme") || "light";
    document.documentElement.dataset.theme = t;

    const animSetting = localStorage.getItem("showStartupAnimation");
    const loaderSetting = localStorage.getItem("logicweaverEndfieldLoader");
    // 默认不启用：只有显式为 "1" 或 "true" 时才启用开屏动画
    const isAnimEnabled = animSetting === "1" || animSetting === "true" || loaderSetting === "1" || loaderSetting === "true";
    if (!isAnimEnabled) {
      document.documentElement.classList.add("skip-endfield-loader");
    } else {
      const startupStyle =
        localStorage.getItem("startupAnimationStyle") ||
        localStorage.getItem("logicweaverStartupStyle") ||
        "endfield";
      document.documentElement.dataset.startupStyle = startupStyle;
    }
    const displaySize = localStorage.getItem("logicweaverDisplaySize") || "auto";
    if (["classic", "compact", "large"].includes(displaySize)) {
      document.documentElement.dataset.displaySize = displaySize;
    } else {
      delete document.documentElement.dataset.displaySize;
    }
  } catch {}
})();
