function o(d, l) {
  const u = [], n = d.name.toLowerCase(), c = (d.topics || []).map((i) => i.toLowerCase());
  for (const i of l || []) {
    const s = i.toLowerCase();
    if ((s.includes("fork") || i.includes("分支")) && (d.isFork || c.includes("fork"))) {
      u.push(i);
      continue;
    }
    if ((s.includes("浏览器") || s.includes("browser") || s.includes("chrome") || s.includes("edge")) && (c.some((e) => e.includes("extension") || e.includes("browser") || e.includes("newtab")) || n.includes("tab-project"))) {
      u.push(i);
      continue;
    }
    if ((s.includes("pi") || i.includes("PI")) && (c.some((e) => e.includes("pi") || e.includes("grounding-pi")) || n.includes("pi-") || n.includes("-pi"))) {
      u.push(i);
      continue;
    }
    if (s.includes("herdr") && (c.some((e) => e.includes("herdr")) || n.includes("herdr"))) {
      u.push(i);
      continue;
    }
    if ((s.includes("嵌入式") || s.includes("embedded") || s.includes("单片机")) && (c.some((e) => e.includes("embedded") || e.includes("zephyr") || e.includes("stm32") || e.includes("k230")) || n.includes("k230") || n.includes("mspm0") || n.includes("pid-") || n.includes("zephyr"))) {
      u.push(i);
      continue;
    }
    (s.includes("美化") || s.includes("theme") || s.includes("style")) && (c.some((e) => e.includes("theme") || e.includes("beauty") || e.includes("ui")) || n.includes("theme") || n.includes("style")) && u.push(i);
  }
  return u;
}
export {
  o as i
};
