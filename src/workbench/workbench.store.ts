import { reactive, watch } from "vue";

export interface WorkbenchVideoItem {
  id: string; // bvid or unique id
  bvid?: string;
  title: string;
  pic?: string;
  owner?: { name: string; face?: string };
  duration?: number | string;
  addedAt: number;
}

export interface WorkbenchWebItem {
  id: string;
  title: string;
  url: string;
  icon?: string;
  customIcon?: string;
  addedAt: number;
}

export interface WorkbenchTaskItem {
  id: string;
  content: string;
  completed: boolean;
  priority?: number;
  dueDate?: string;
  addedAt: number;
}

export interface WorkbenchRepoItem {
  id: string;
  owner: string;
  name: string;
  description?: string;
  stars?: number;
  language?: string;
  htmlUrl: string;
  addedAt: number;
}

export type WorkbenchFocusType = "video" | "repo" | "note" | "web" | "none";

export interface WorkbenchFocusState {
  type: WorkbenchFocusType;
  id: string;
  title?: string;
  data?: any;
}

export interface WorkbenchData {
  title: string;
  videos: WorkbenchVideoItem[];
  websites: WorkbenchWebItem[];
  tasks: WorkbenchTaskItem[];
  repos: WorkbenchRepoItem[];
  scratchpad: string;
  focus: WorkbenchFocusState;
}

const STORAGE_KEY = "lw_workbench_data_v1";

function loadInitialData(): WorkbenchData {
  const fallback: WorkbenchData = {
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
        completed: false,
        addedAt: Date.now()
      },
      {
        id: "demo-task-2",
        content: "整理关联 GitHub 项目代码与灵感",
        completed: false,
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
        stars: 46000,
        htmlUrl: "https://github.com/vuejs/core",
        addedAt: Date.now()
      }
    ],
    scratchpad: "# 项目速记 / 灵感草稿\n\n- 聚集当前项目关联的所有视频、文档、任务和代码库\n- 点击左侧视频在中央大舞台聚焦播放\n- 随手写草稿，随时沉浸思考",
    focus: { type: "none", id: "" }
  };

  try {
    if (typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...fallback,
          ...parsed,
          focus: parsed.focus || fallback.focus
        };
      }
    }
  } catch (e) {
    console.warn("[Workbench] failed to load data from storage:", e);
  }
  return fallback;
}

export const workbenchState = reactive<WorkbenchData>(loadInitialData());

if (typeof window !== "undefined") {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let pendingSince = 0;
  let dirty = false;
  function flush() {
    clearTimeout(timer); timer = undefined;
    if (!dirty) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workbenchState));
      dirty = false; pendingSince = 0;
    } catch (error) { console.warn("[Workbench] failed to save data to storage:", error); }
  }
  const stop = watch(() => workbenchState, () => {
    dirty = true;
    if (!pendingSince) pendingSince = Date.now();
    clearTimeout(timer);
    timer = setTimeout(flush, Math.max(0, Math.min(400, 2000 - (Date.now() - pendingSince))));
  }, { deep: true });
  const onVisibility = () => { if (document.hidden) flush(); };
  window.addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", onVisibility);
  if (import.meta.hot) import.meta.hot.dispose(() => {
    stop(); flush();
    window.removeEventListener("pagehide", flush);
    document.removeEventListener("visibilitychange", onVisibility);
  });
}

// 动作方法
export function setWorkbenchFocus(focus: WorkbenchFocusState): void {
  workbenchState.focus = focus;
}

export function addWorkbenchVideo(video: Omit<WorkbenchVideoItem, "id" | "addedAt"> & { id?: string }): void {
  const id = video.id || video.bvid || `vid_${Date.now()}`;
  if (!workbenchState.videos.some(v => v.id === id || (video.bvid && v.bvid === video.bvid))) {
    workbenchState.videos.unshift({
      ...video,
      id,
      addedAt: Date.now()
    });
  }
}

export function removeWorkbenchVideo(id: string): void {
  workbenchState.videos = workbenchState.videos.filter(v => v.id !== id);
  if (workbenchState.focus.id === id) {
    workbenchState.focus = { type: "none", id: "" };
  }
}

export function addWorkbenchWeb(web: Omit<WorkbenchWebItem, "id" | "addedAt"> & { id?: string }): boolean {
  if (workbenchState.websites.some(w => w.url === web.url)) return false;
  workbenchState.websites.push({
    ...web,
    id: web.id || `web_${crypto.randomUUID()}`,
    addedAt: Date.now()
  });
  return true;
}

export function removeWorkbenchWeb(id: string): void {
  workbenchState.websites = workbenchState.websites.filter(w => w.id !== id);
}

export function addWorkbenchTask(
  content: string,
  details: Partial<Pick<WorkbenchTaskItem, "id" | "completed" | "priority" | "dueDate">> = {}
): boolean {
  if (!content.trim()) return false;
  const id = details.id || `task_${crypto.randomUUID()}`;
  if (workbenchState.tasks.some(task => task.id === id)) return false;
  workbenchState.tasks.push({
    ...details,
    id,
    content: content.trim(),
    completed: details.completed ?? false,
    addedAt: Date.now()
  });
  return true;
}

export function toggleWorkbenchTask(id: string): void {
  const t = workbenchState.tasks.find(item => item.id === id);
  if (t) {
    t.completed = !t.completed;
  }
}

export function removeWorkbenchTask(id: string): void {
  workbenchState.tasks = workbenchState.tasks.filter(t => t.id !== id);
}

export function addWorkbenchRepo(repo: Omit<WorkbenchRepoItem, "id" | "addedAt"> & { id?: string }): void {
  const id = repo.id || `${repo.owner}/${repo.name}`;
  if (!workbenchState.repos.some(r => r.id === id)) {
    workbenchState.repos.push({
      ...repo,
      id,
      addedAt: Date.now()
    });
  }
}

export function removeWorkbenchRepo(id: string): void {
  workbenchState.repos = workbenchState.repos.filter(r => r.id !== id);
  if (workbenchState.focus.id === id) {
    workbenchState.focus = { type: "none", id: "" };
  }
}
