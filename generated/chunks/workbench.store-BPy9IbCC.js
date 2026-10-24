import { r as s, w as c } from "./vendor-vue-BUkfvXUI.js";
const d = "lw_workbench_data_v1";
function l() {
  const e = {
    title: "海狸聚集工作台",
    videos: [
      {
        id: "demo-bili-1",
        bvid: "BV1GJ411x7h7",
        title: "【官方双语】深度学习之梯度下降法到底是什么？",
        owner: { name: "3Blue1Brown" },
        addedAt: Date.now()
      }
    ],
    websites: [
      {
        id: "demo-web-1",
        title: "Vue 3 官方文档",
        url: "https://vuejs.org",
        addedAt: Date.now()
      },
      {
        id: "demo-web-2",
        title: "MDN Web 开发技术",
        url: "https://developer.mozilla.org",
        addedAt: Date.now()
      }
    ],
    tasks: [
      {
        id: "demo-task-1",
        content: "调研工作台六区域交互与聚合效果",
        completed: !1,
        addedAt: Date.now()
      },
      {
        id: "demo-task-2",
        content: "整理关联 GitHub 项目代码与灵感",
        completed: !1,
        addedAt: Date.now()
      }
    ],
    repos: [
      {
        id: "demo-repo-1",
        owner: "vuejs",
        name: "core",
        description: "🖖 Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.",
        language: "TypeScript",
        stars: 46e3,
        htmlUrl: "https://github.com/vuejs/core",
        addedAt: Date.now()
      }
    ],
    scratchpad: `# 项目速记 / 灵感草稿

- 聚集当前项目关联的所有视频、文档、任务和代码库
- 点击左侧视频在中央大舞台聚焦播放
- 随手写草稿，随时沉浸思考`,
    focus: {
      type: "video",
      id: "demo-bili-1",
      title: "【官方双语】深度学习之梯度下降法到底是什么？",
      data: { bvid: "BV1GJ411x7h7" }
    }
  };
  try {
    if (typeof localStorage < "u") {
      const t = localStorage.getItem(d);
      if (t) {
        const i = JSON.parse(t);
        return {
          ...e,
          ...i,
          focus: i.focus || e.focus
        };
      }
    }
  } catch (t) {
    console.warn("[Workbench] failed to load data from storage:", t);
  }
  return e;
}
const o = s(l());
if (typeof window < "u") {
  let e = function() {
    if (clearTimeout(t), t = void 0, !!n)
      try {
        localStorage.setItem(d, JSON.stringify(o)), n = !1, i = 0;
      } catch (r) {
        console.warn("[Workbench] failed to save data to storage:", r);
      }
  }, t, i = 0, n = !1;
  c(() => o, () => {
    n = !0, i || (i = Date.now()), clearTimeout(t), t = setTimeout(e, Math.max(0, Math.min(400, 2e3 - (Date.now() - i))));
  }, { deep: !0 });
  const a = () => {
    document.hidden && e();
  };
  window.addEventListener("pagehide", e), document.addEventListener("visibilitychange", a);
}
function u(e) {
  o.focus = e;
}
function m(e) {
  const t = e.id || e.bvid || `vid_${Date.now()}`;
  o.videos.some((i) => i.id === t || e.bvid && i.bvid === e.bvid) || o.videos.unshift({
    ...e,
    id: t,
    addedAt: Date.now()
  });
}
function b(e) {
  o.videos = o.videos.filter((t) => t.id !== e), o.focus.id === e && (o.focus = { type: "none", id: "" });
}
function p(e) {
  return o.websites.some((t) => t.url === e.url) ? !1 : (o.websites.push({
    ...e,
    id: e.id || `web_${crypto.randomUUID()}`,
    addedAt: Date.now()
  }), !0);
}
function w(e) {
  o.websites = o.websites.filter((t) => t.id !== e);
}
function h(e, t = {}) {
  if (!e.trim()) return !1;
  const i = t.id || `task_${crypto.randomUUID()}`;
  return o.tasks.some((n) => n.id === i) ? !1 : (o.tasks.push({
    ...t,
    id: i,
    content: e.trim(),
    completed: t.completed ?? !1,
    addedAt: Date.now()
  }), !0);
}
function k(e) {
  const t = o.tasks.find((i) => i.id === e);
  t && (t.completed = !t.completed);
}
function v(e) {
  o.tasks = o.tasks.filter((t) => t.id !== e);
}
function g(e) {
  const t = e.id || `${e.owner}/${e.name}`;
  o.repos.some((i) => i.id === t) || o.repos.push({
    ...e,
    id: t,
    addedAt: Date.now()
  });
}
function D(e) {
  o.repos = o.repos.filter((t) => t.id !== e), o.focus.id === e && (o.focus = { type: "none", id: "" });
}
export {
  g as addWorkbenchRepo,
  h as addWorkbenchTask,
  m as addWorkbenchVideo,
  p as addWorkbenchWeb,
  D as removeWorkbenchRepo,
  v as removeWorkbenchTask,
  b as removeWorkbenchVideo,
  w as removeWorkbenchWeb,
  u as setWorkbenchFocus,
  k as toggleWorkbenchTask,
  o as workbenchState
};
