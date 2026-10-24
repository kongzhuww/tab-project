import { r, w as c } from "./vendor-vue-BUkfvXUI.js";
const d = "lw_workbench_data_v1";
function f() {
  const e = {
    title: "海狸聚集工作台",
    videos: [],
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
    focus: { type: "none", id: "" }
  };
  try {
    if (typeof localStorage < "u") {
      const t = localStorage.getItem(d);
      if (t) {
        const n = JSON.parse(t);
        return {
          ...e,
          ...n,
          focus: n.focus || e.focus
        };
      }
    }
  } catch (t) {
    console.warn("[Workbench] failed to load data from storage:", t);
  }
  return e;
}
const o = r(f());
if (typeof window < "u") {
  let e = function() {
    if (clearTimeout(t), t = void 0, !!i)
      try {
        localStorage.setItem(d, JSON.stringify(o)), i = !1, n = 0;
      } catch (s) {
        console.warn("[Workbench] failed to save data to storage:", s);
      }
  }, t, n = 0, i = !1;
  c(() => o, () => {
    i = !0, n || (n = Date.now()), clearTimeout(t), t = setTimeout(e, Math.max(0, Math.min(400, 2e3 - (Date.now() - n))));
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
  o.videos.some((n) => n.id === t || e.bvid && n.bvid === e.bvid) || o.videos.unshift({
    ...e,
    id: t,
    addedAt: Date.now()
  });
}
function p(e) {
  o.videos = o.videos.filter((t) => t.id !== e), o.focus.id === e && (o.focus = { type: "none", id: "" });
}
function b(e) {
  return o.websites.some((t) => t.url === e.url) ? !1 : (o.websites.push({
    ...e,
    id: e.id || `web_${crypto.randomUUID()}`,
    addedAt: Date.now()
  }), !0);
}
function h(e) {
  o.websites = o.websites.filter((t) => t.id !== e);
}
function w(e, t = {}) {
  if (!e.trim()) return !1;
  const n = t.id || `task_${crypto.randomUUID()}`;
  return o.tasks.some((i) => i.id === n) ? !1 : (o.tasks.push({
    ...t,
    id: n,
    content: e.trim(),
    completed: t.completed ?? !1,
    addedAt: Date.now()
  }), !0);
}
function k(e) {
  const t = o.tasks.find((n) => n.id === e);
  t && (t.completed = !t.completed);
}
function v(e) {
  o.tasks = o.tasks.filter((t) => t.id !== e);
}
function g(e) {
  const t = e.id || `${e.owner}/${e.name}`;
  o.repos.some((n) => n.id === t) || o.repos.push({
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
  w as addWorkbenchTask,
  m as addWorkbenchVideo,
  b as addWorkbenchWeb,
  D as removeWorkbenchRepo,
  v as removeWorkbenchTask,
  p as removeWorkbenchVideo,
  h as removeWorkbenchWeb,
  u as setWorkbenchFocus,
  k as toggleWorkbenchTask,
  o as workbenchState
};
