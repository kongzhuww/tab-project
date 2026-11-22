import { d as xe, f as t, g as s, h as e, F as j, i as te, q as Q, t as a, u as o, k as le, j as y, b as G, s as re, r as Ye, w as be, o as ht, e as bt, p as Re, z as at, m as ae, v as Ke, I as Tt, l as Se, T as Rt, n as ot, G as Gt, B as je, J as At, y as ze, x as Lt, A as gt, D as Dt } from "./vendor-vue-C-_ocEUS.js";
import { u as jt } from "./useCardActivity-B6_3u7ei.js";
import { x as Mt, y as nt, n as Ht, z as oe, A as mt, m as Z, R as xt, B as qt, q as yt, r as vt, C as zt, D as ft, G as Wt, E as Vt, w as Yt } from "./github.service-BkChs4sP.js";
import { A as Kt } from "./AccountSetupGuide-ChzB67-v.js";
import { c as Ot, g as _t, G as Zt, d as Xt } from "./github-task-modal-store-CWGp282C.js";
import Qt from "./GitHubTrending-B0hD-rGV.js";
import { _ as Ee, t as I, o as Et } from "./_plugin-vue_export-helper-CUD1GoS1.js";
import { i as Jt, l as es } from "./github-resources-ClrCxl1K.js";
import { s as it } from "./storage-cache.service-BYF2zxXX.js";
import { l as ts, a as ss, b as as, r as os, c as ns } from "./workspace-bridge-Cv_xUC_B.js";
import { z as kt, A as ls, B as is, g as rs } from "./search.service-gzbpg5BD.js";
import { m as Ve } from "./core-utils-KTt-RZby.js";
import { u as us } from "./workspace-wallpaper-CzwIpP3d.js";
import { W as cs } from "./WorkspaceWallpaperLayer-Qc_1VSdO.js";
const ds = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], ps = [
  // 1. AI 与大模型
  {
    id: "awesome-generative-ai",
    name: "awesome-generative-ai",
    title: "生成式 AI 大全 (Generative AI)",
    category: "ai",
    desc: "精选各类顶尖生成式 AI 工具、模型架构、API 服务与研究论文索引。",
    stars: "18k+",
    url: "https://github.com/steven2358/awesome-generative-ai",
    tags: ["LLM", "Diffusion", "AI工具", "GPT"]
  },
  {
    id: "awesome-llm",
    name: "Awesome-LLM",
    title: "大语言模型权威全景指南",
    category: "ai",
    desc: "覆盖全球主流大语言模型（LLM）的论文、微调框架、评测基准与实战资料。",
    stars: "22k+",
    url: "https://github.com/Hannibal046/Awesome-LLM",
    tags: ["深度学习", "LLM", "论文", "微调"]
  },
  {
    id: "awesome-chatgpt-prompts",
    name: "awesome-chatgpt-prompts",
    title: "ChatGPT / Claude 提示词神级指南",
    category: "ai",
    desc: "全球最受欢迎的优质提示词合集，包含编程专家、角色扮演、写作助理等海量 Prompt。",
    stars: "120k+",
    url: "https://github.com/f/awesome-chatgpt-prompts",
    tags: ["Prompt", "ChatGPT", "Claude", "效率"]
  },
  {
    id: "awesome-langchain",
    name: "awesome-langchain",
    title: "LangChain & Agent 生态精选",
    category: "ai",
    desc: "精选基于 LangChain、LlamaIndex 等构建的智能体、RAG 向量检索与应用示例。",
    stars: "11k+",
    url: "https://github.com/kyrolabs/awesome-langchain",
    tags: ["Agent", "RAG", "向量检索", "Python"]
  },
  // 2. 现代前端
  {
    id: "awesome-vue",
    name: "awesome-vue",
    title: "Vue.js 官方精选生态资源",
    category: "frontend",
    desc: "Vue 3 官方社区维护的周边全景：UI 组件库、状态管理、模板、工具与教程。",
    stars: "72k+",
    url: "https://github.com/vuejs/awesome-vue",
    tags: ["Vue3", "UI库", "Pinia", "Vite"]
  },
  {
    id: "awesome-react",
    name: "awesome-react",
    title: "React 生态完整全景清单",
    category: "frontend",
    desc: "精选 React 核心生态资源：Next.js、Hooks、动画库、表单与全栈方案。",
    stars: "66k+",
    url: "https://github.com/enaqx/awesome-react",
    tags: ["React", "Next.js", "前端", "Hooks"]
  },
  {
    id: "awesome-tailwind-css",
    name: "awesome-tailwindcss",
    title: "Tailwind CSS 神器集合",
    category: "frontend",
    desc: "优质 Tailwind 插件、设计系统组件、配色生成器与现代排版实践。",
    stars: "16k+",
    url: "https://github.com/aniftyco/awesome-tailwindcss",
    tags: ["CSS", "Tailwind", "样式", "UI"]
  },
  {
    id: "awesome-electron",
    name: "awesome-electron",
    title: "Electron 桌面端开发精选",
    category: "frontend",
    desc: "使用 Web 技术打造跨平台桌面软件的实用框架、打包工具与知名开源软件清单。",
    stars: "26k+",
    url: "https://github.com/sindresorhus/awesome-electron",
    tags: ["桌面端", "CrossPlatform", "Node"]
  },
  // 3. 后端与多语言
  {
    id: "awesome-python",
    name: "awesome-python",
    title: "Python 顶级开源库与框架大全",
    category: "backend",
    desc: "Python 开发者必备百科全书：涵盖爬虫、Web 框架、并发、科学计算与工具库。",
    stars: "230k+",
    url: "https://github.com/vinta/awesome-python",
    tags: ["Python", "FastAPI", "自动化", "爬虫"]
  },
  {
    id: "awesome-go",
    name: "awesome-go",
    title: "Go 语言实用包与高并发工具",
    category: "backend",
    desc: "Golang 高性能后端、微服务架构、网络库、存储引擎与脚手架。",
    stars: "140k+",
    url: "https://github.com/avelino/awesome-go",
    tags: ["Go", "高并发", "微服务", "网络"]
  },
  {
    id: "awesome-rust",
    name: "awesome-rust",
    title: "Rust 语言神级开源应用与库",
    category: "backend",
    desc: "极速且安全的现代系统编程：WebAssembly、高性能网络、CLI 工具与游戏开发。",
    stars: "45k+",
    url: "https://github.com/rust-unofficial/awesome-rust",
    tags: ["Rust", "系统级", "WASM", "高性能"]
  },
  {
    id: "awesome-nodejs",
    name: "awesome-nodejs",
    title: "Node.js 实用包与服务端清单",
    category: "backend",
    desc: "高星 Node.js 库、异步处理、文件系统与现代后端运行时方案。",
    stars: "57k+",
    url: "https://github.com/sindresorhus/awesome-nodejs",
    tags: ["Node.js", "TypeScript", "后端"]
  },
  // 4. 自建服务与私有云
  {
    id: "awesome-selfhosted",
    name: "awesome-selfhosted",
    title: "Self-Hosted 自由自建私有服务大全",
    category: "selfhosted",
    desc: "摆脱云服务垄断！自建个人网盘、家庭媒体中心、个人笔记、密码管理器与 Git 服务器。",
    stars: "210k+",
    url: "https://github.com/awesome-selfhosted/awesome-selfhosted",
    tags: ["私有云", "Docker", "NAS", "本地优先"]
  },
  {
    id: "awesome-docker",
    name: "awesome-docker",
    title: "Docker 容器技术与镜像实战",
    category: "selfhosted",
    desc: "容器化部署精选、Compose 模板、轻量运维面板与极速优化工具。",
    stars: "31k+",
    url: "https://github.com/veggiemonk/awesome-docker",
    tags: ["Docker", "容器", "DevOps", "运维"]
  },
  {
    id: "awesome-sysadmin",
    name: "awesome-sysadmin",
    title: "Linux 与系统管理员神级清单",
    category: "selfhosted",
    desc: "系统监控、备份方案、自动化编排、日志分析与安全加固必备开源神器。",
    stars: "28k+",
    url: "https://github.com/kahun/awesome-sysadmin",
    tags: ["Linux", "系统管理", "监控", "备份"]
  },
  // 5. CLI 与效率工具
  {
    id: "awesome-cli",
    name: "awesome-cli-apps",
    title: "现代命令行 CLI 生产力神器",
    category: "tools",
    desc: "终极终端生产力！现代替代品（bat、eza、ripgrep、fzf）与炫酷终端增强应用。",
    stars: "25k+",
    url: "https://github.com/agarrharr/awesome-cli-apps",
    tags: ["终端", "命令行", "CLI", "效率"]
  },
  {
    id: "awesome-mac",
    name: "awesome-mac",
    title: "macOS 绝赞开源与实用软件清单",
    category: "tools",
    desc: "让 Mac 体验更进一步的顶尖开发者工具、窗口管理、效率辅助与设计软件。",
    stars: "74k+",
    url: "https://github.com/jaywcjlove/awesome-mac",
    tags: ["macOS", "桌面", "效率", "开发工具"]
  },
  {
    id: "awesome-windows",
    name: "awesome-windows",
    title: "Windows 开发者高级工具合集",
    category: "tools",
    desc: "针对 Windows 10/11 的极简美化、WSL2、终端配置、PowerToys 与效率神器。",
    stars: "11k+",
    url: "https://github.com/Awesome-Windows/Awesome",
    tags: ["Windows", "WSL", "美化", "工具"]
  },
  // 6. 计算机体系与学习
  {
    id: "awesome-cs-courses",
    name: "awesome-cs-courses",
    title: "全球顶尖名校计算机公开课汇总",
    category: "learning",
    desc: "斯坦福、MIT、伯克利等世界名校的计算机科学系统化自学路线与视频作业。",
    stars: "61k+",
    url: "https://github.com/prakhar1989/awesome-courses",
    tags: ["计算机科学", "名校课程", "算法", "操作系统"]
  },
  {
    id: "awesome-free-programming-books",
    name: "free-programming-books",
    title: "经典免费编程电子书大全",
    category: "learning",
    desc: "全语言覆盖的权威经典开源技术书籍、教程与交互式编程学习资源。",
    stars: "340k+",
    url: "https://github.com/EbookFoundation/free-programming-books",
    tags: ["电子书", "编程入门", "教程", "免费资源"]
  },
  {
    id: "awesome-algorithms",
    name: "awesome-algorithms",
    title: "数据结构与算法精选索引",
    category: "learning",
    desc: "刷题必备、算法可视化、经典数据结构实现与面试精编题解。",
    stars: "17k+",
    url: "https://github.com/tayllan/awesome-algorithms",
    tags: ["算法", "数据结构", "LeetCode", "面试"]
  }
], hs = { class: "gh-awesome-wrapper" }, gs = { class: "gh-awesome-header" }, fs = { class: "gh-awesome-pills" }, ms = ["onClick"], vs = { class: "gh-awesome-grid" }, bs = ["onClick"], ys = { class: "gh-awesome-card-head" }, _s = { class: "gh-awesome-card-name" }, ks = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, ws = { class: "gh-awesome-desc" }, $s = { class: "gh-awesome-footer" }, Cs = { class: "gh-awesome-tags" }, Ss = ["href"], Rs = {
  key: 0,
  class: "gh-awesome-empty"
}, Gs = /* @__PURE__ */ xe({
  __name: "GitHubAwesome",
  setup(_) {
    const i = G("all"), l = re(() => ps.filter((p) => i.value === "all" || p.category === i.value));
    function c(p) {
      window.open(p, "_blank", "noreferrer");
    }
    return (p, f) => (t(), s("div", hs, [
      e("header", gs, [
        f[1] || (f[1] = e("div", { class: "gh-awesome-intro" }, [
          e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ])
        ], -1)),
        e("div", fs, [
          (t(!0), s(j, null, te(o(ds), (T) => (t(), s("button", {
            key: T.id,
            type: "button",
            class: Q(["gh-awesome-pill", { active: i.value === T.id }]),
            onClick: (C) => i.value = T.id
          }, [
            e("span", null, a(T.icon), 1),
            e("b", null, a(T.name), 1)
          ], 10, ms))), 128))
        ])
      ]),
      e("div", vs, [
        (t(!0), s(j, null, te(l.value, (T) => (t(), s("article", {
          key: T.id,
          class: "gh-awesome-card",
          onClick: (C) => c(T.url)
        }, [
          e("div", ys, [
            e("div", _s, [
              e("strong", null, a(T.title), 1),
              e("small", null, a(T.name), 1)
            ]),
            e("span", ks, "★ " + a(T.stars), 1)
          ]),
          e("p", ws, a(T.desc), 1),
          e("div", $s, [
            e("div", Cs, [
              (t(!0), s(j, null, te(T.tags, (C) => (t(), s("span", {
                key: C,
                class: "gh-awesome-tag"
              }, a(C), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: T.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: f[0] || (f[0] = le(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, Ss)
          ])
        ], 8, bs))), 128)),
        l.value.length ? y("", !0) : (t(), s("div", Rs, [...f[2] || (f[2] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), Ms = /* @__PURE__ */ Ee(Gs, [["__scopeId", "data-v-ce110d1d"]]), rt = "gh_my_repos_cache_v1", ut = "gh_my_repo_groups_v2", ct = "gh_my_repo_groups_map_v2", F = Ye({
  loading: !1,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});
function Je(_) {
  return _.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
}
class tt {
  constructor() {
    this.abortController = null, this.inFlightPromise = null;
  }
  static getInstance() {
    return tt.instance || (tt.instance = new tt()), tt.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略，支持并发防抖与请求去重）
   */
  async load(i = !1) {
    if (!i && this.inFlightPromise)
      return this.inFlightPromise;
    i && (this.abortController?.abort(), this.inFlightPromise = null), this.abortController = new AbortController();
    const l = this.abortController.signal, c = (async () => {
      await this.loadPersistedGroups();
      const p = await it.get(rt);
      if (p && p.length ? this.hydrateRepos(p) : F.repos.length && this.hydrateRepos(F.repos), i || !F.repos.length) {
        F.loading = !0, F.errorMessage = "";
        try {
          await this.fetchRemote(l);
        } catch (T) {
          if (T.name === "AbortError") return;
          F.errorMessage = T.message || "获取个人仓库失败";
        } finally {
          F.loading = !1;
        }
      } else
        this.fetchRemote(l).catch(() => {
        });
    })();
    return this.inFlightPromise = c.finally(() => {
      this.inFlightPromise === c && (this.inFlightPromise = null);
    }), this.inFlightPromise;
  }
  async fetchRemote(i) {
    const { ghUser: l, ghToken: c } = await Mt();
    if (!l && !c) {
      F.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    const p = nt(c), f = [], T = /* @__PURE__ */ new Set();
    if (l)
      try {
        const S = `https://api.github.com/users/${encodeURIComponent(l)}/repos?type=owner&sort=updated&per_page=100`, k = await fetch(S, { method: "GET", headers: p, signal: i });
        if (k.ok) {
          const N = await k.json();
          if (Array.isArray(N))
            for (const $ of N)
              $ && $.id && !T.has($.id) && (T.add($.id), f.push($));
        }
      } catch (S) {
        if (S.name === "AbortError") throw S;
      }
    if (c)
      try {
        const k = await fetch("https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100", { method: "GET", headers: p, signal: i });
        if (k.ok) {
          const N = await k.json();
          if (Array.isArray(N))
            for (const $ of N)
              $ && $.id && !T.has($.id) && (T.add($.id), f.push($));
        }
      } catch (S) {
        if (S.name === "AbortError") throw S;
      }
    if (!f.length) {
      F.repos.length || (F.errorMessage = "未能读取到个人仓库，请检查网络或 GitHub 设置。");
      return;
    }
    const C = f.map((S) => {
      const k = S.full_name || `${S.owner?.login || l}/${S.name}`, N = S.name, $ = F.repoGroupsMap[k] || F.repoGroupsMap[N] || F.repoGroupsMap[k.toLowerCase()] || F.repoGroupsMap[N.toLowerCase()] || [];
      return {
        id: S.id,
        name: S.name,
        fullName: k,
        description: S.description || "",
        isPrivate: !!S.private,
        isFork: !!S.fork,
        htmlUrl: S.html_url || `https://github.com/${l}/${S.name}`,
        language: S.language || null,
        stargazersCount: Number(S.stargazers_count) || 0,
        forksCount: Number(S.forks_count) || 0,
        openIssuesCount: Number(S.open_issues_count) || 0,
        topics: Array.isArray(S.topics) ? S.topics.map((x) => String(x).toLowerCase()) : [],
        localGroups: $,
        updatedAt: S.updated_at || "",
        pushedAt: S.pushed_at || "",
        defaultBranch: S.default_branch || "main"
      };
    });
    this.hydrateRepos(C), await it.set(rt, C, { ttlMs: 30 * 86400 * 1e3 });
  }
  hydrateRepos(i) {
    let l = !1;
    F.repos = i.map((c) => {
      const p = F.repoGroupsMap[c.fullName] || F.repoGroupsMap[c.name] || F.repoGroupsMap[c.fullName.toLowerCase()] || F.repoGroupsMap[c.name.toLowerCase()], f = c.localGroups && c.localGroups.length ? c.localGroups : null, T = Jt(c, F.customGroups), C = (p && p.length ? p : null) || f || T, S = C ? [...new Set(C.filter(Boolean))] : [];
      return S.length && (!F.repoGroupsMap[c.fullName] || !F.repoGroupsMap[c.fullName].length) && (F.repoGroupsMap[c.fullName] = S, l = !0), {
        ...c,
        localGroups: S
      };
    }), l && this.persistGroupsMap();
  }
  /**
   * 将仓库添加到本地自定义分组
   */
  async addRepoToGroup(i, l) {
    const c = Je(l);
    c && (i.localGroups.includes(c) || i.localGroups.push(c), F.repoGroupsMap[i.fullName] = [...i.localGroups], await this.persistGroupsMap(), await it.set(rt, F.repos, { ttlMs: 30 * 86400 * 1e3 }));
  }
  /**
   * 将仓库从指定本地分组中移出
   */
  async removeRepoFromGroup(i, l) {
    i.localGroups = i.localGroups.filter((c) => c !== l), F.repoGroupsMap[i.fullName] = [...i.localGroups], await this.persistGroupsMap(), await it.set(rt, F.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  async moveRepoToGroup(i, l) {
    if (!l)
      i.localGroups = [];
    else {
      const c = Je(l);
      if (!c) return;
      i.localGroups = [c];
    }
    F.repoGroupsMap[i.fullName] = [...i.localGroups], await this.persistGroupsMap(), await it.set(rt, F.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 新建一个本地分组板块
   */
  async createGroup(i) {
    const l = Je(i);
    return l ? F.customGroups.includes(l) ? (alert(`分组「${l}」已存在。`), null) : (F.customGroups.push(l), await this.persistGroups(), l) : (alert("分组名称不能为空。"), null);
  }
  /**
   * 重命名本地分组
   */
  async renameGroup(i, l) {
    const c = Je(l);
    return c ? i === c ? !0 : F.customGroups.includes(c) ? (alert(`已存在名为「${c}」的分组。`), !1) : (F.customGroups = F.customGroups.map((p) => p === i ? c : p), F.repos.forEach((p) => {
      p.localGroups.includes(i) && (p.localGroups = p.localGroups.map((f) => f === i ? c : f), F.repoGroupsMap[p.fullName] = [...p.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : (alert("新分组名称不能为空。"), !1);
  }
  /**
   * 删除本地分组
   */
  async deleteGroup(i) {
    const l = F.repos.filter((p) => p.localGroups.includes(i)).length, c = l > 0 ? `确定删除分组「${i}」吗？
该分组下的 ${l} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。` : `确定删除空分组「${i}」吗？`;
    return confirm(c) ? (F.customGroups = F.customGroups.filter((p) => p !== i), F.repos.forEach((p) => {
      p.localGroups.includes(i) && (p.localGroups = p.localGroups.filter((f) => f !== i), F.repoGroupsMap[p.fullName] = [...p.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : !1;
  }
  async loadPersistedGroups() {
    try {
      let i = null, l = null;
      if (typeof chrome < "u" && chrome.storage?.local) {
        const c = await chrome.storage.local.get([ut, ct]);
        i = c?.[ut], l = c?.[ct];
      }
      if (!i || !Array.isArray(i)) {
        const c = localStorage.getItem(ut);
        c && (i = JSON.parse(c));
      }
      if (!l || typeof l != "object") {
        const c = localStorage.getItem(ct);
        c && (l = JSON.parse(c));
      }
      Array.isArray(i) && (F.customGroups = i.map(Je).filter(Boolean)), l && typeof l == "object" && (F.repoGroupsMap = l);
    } catch {
    }
  }
  async persistGroupsMap() {
    try {
      const i = { ...F.repoGroupsMap };
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [ct]: i }), localStorage.setItem(ct, JSON.stringify(i));
    } catch {
    }
  }
  async persistGroups() {
    const i = Array.from(new Set(F.customGroups.map(Je).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [ut]: i }), localStorage.setItem(ut, JSON.stringify(i));
    } catch {
    }
  }
}
const Ce = tt.getInstance(), Ts = { class: "my-repos-workspace" }, As = {
  key: 0,
  class: "error-banner"
}, Ls = { class: "shelf-header" }, Ds = { class: "shelf-left" }, Hs = { class: "shelf-badge" }, xs = { class: "shelf-right" }, Es = ["title"], Is = ["onDragstart", "onContextmenu"], Us = { class: "repo-card-head" }, Ns = ["title", "onClick"], Ps = {
  key: 0,
  class: "badge-repo-visibility private"
}, Os = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Fs = ["title"], Bs = {
  key: 1,
  class: "repo-topics-row"
}, js = { class: "repo-card-footer" }, qs = { class: "meta-left" }, zs = {
  key: 0,
  class: "meta-item lang"
}, Ws = { class: "meta-item" }, Vs = {
  key: 1,
  class: "meta-item"
}, Ys = ["title"], Ks = { class: "board-columns-track" }, Zs = ["onDragover", "onDragleave", "onDrop"], Xs = { class: "column-header" }, Qs = {
  key: 0,
  class: "column-title-group"
}, Js = ["title"], ea = { class: "badge-count" }, ta = {
  key: 1,
  class: "column-rename-group"
}, sa = ["onKeydown"], aa = ["onClick"], oa = { class: "column-actions" }, na = ["onClick"], la = {
  key: 0,
  class: "col-popover-menu"
}, ia = ["onClick"], ra = ["onClick"], ua = { class: "column-cards-scroll" }, ca = ["onDragstart", "onContextmenu"], da = { class: "repo-card-head" }, pa = ["title", "onClick"], ha = {
  key: 0,
  class: "badge-repo-visibility private"
}, ga = {
  key: 1,
  class: "badge-repo-visibility fork"
}, fa = ["title"], ma = { class: "repo-topics-row" }, va = { class: "topic-chip active-chip" }, ba = ["onClick"], ya = { class: "repo-card-footer" }, _a = { class: "meta-left" }, ka = {
  key: 0,
  class: "meta-item lang"
}, wa = { class: "meta-item" }, $a = {
  key: 1,
  class: "meta-item"
}, Ca = { class: "meta-date" }, Sa = {
  key: 0,
  class: "empty-column-placeholder"
}, Ra = { class: "board-column new-column-slot" }, Ga = {
  key: 1,
  class: "new-column-composer"
}, Ma = { class: "composer-actions" }, Ta = ["onClick"], Aa = /* @__PURE__ */ xe({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(_) {
    const i = _, l = G(""), c = G(!1), p = G(null), f = G(""), T = G(null), C = G(null), S = G(null), k = G(!1);
    function N() {
      k.value = !k.value;
    }
    function $(g) {
      const h = S.value;
      h && (Math.abs(g.deltaX) > Math.abs(g.deltaY) && g.deltaX !== 0 || g.deltaY !== 0 && (g.preventDefault(), h.scrollLeft += g.deltaY));
    }
    const x = G(null), D = G(null), A = G(null);
    let E = null, J = 0;
    const H = Ye({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromGroup: null
    }), P = G(null), O = G(!1);
    function V() {
      H.visible = !1, P.value = null;
    }
    function pe(g, h, m) {
      g.preventDefault(), g.stopPropagation();
      let M = g.clientX, v = g.clientY;
      M > window.innerWidth - 200 && (M = window.innerWidth - 210), v > window.innerHeight - 240 && (v = window.innerHeight - 245), H.x = M, H.y = v, H.repo = h, H.fromGroup = m, H.visible = !0, P.value = "folder", O.value = M > window.innerWidth - 380;
    }
    async function ue() {
      const g = H.repo;
      V(), g && await Ce.moveRepoToGroup(g, null);
    }
    async function U(g) {
      const h = H.repo;
      V(), h && await Ce.moveRepoToGroup(h, g);
    }
    async function q() {
      const g = H.repo;
      if (V(), !!g)
        try {
          await navigator.clipboard.writeText(g.htmlUrl), Ht.show({
            appName: "GitHub",
            title: I("github.myRepos.copiedUrlTitle"),
            message: I("github.myRepos.copiedUrlMsg", { name: g.name })
          });
        } catch {
        }
    }
    async function X() {
      const g = H.repo;
      if (V(), !!g)
        try {
          const h = `git clone ${g.htmlUrl}.git`;
          await navigator.clipboard.writeText(h), Ht.show({
            appName: "GitHub",
            title: I("github.myRepos.copiedCloneTitle"),
            message: h
          });
        } catch {
        }
    }
    function ne() {
      const g = H.repo;
      V(), g && qe(g.htmlUrl);
    }
    function Y() {
      const g = H.repo;
      V(), g && Ot.open({
        fullName: g.fullName,
        description: g.description || "",
        stars: g.stargazersCount,
        language: g.language || void 0,
        updated: g.pushedAt
      });
    }
    function K(g) {
      g.target?.closest(".gh-repo-context-menu") || H.visible && V();
    }
    function ce(g) {
      g.key === "Escape" && H.visible && V();
    }
    const fe = re(() => F.customGroups), de = re(() => F.repos), ie = re(() => de.value.filter((g) => !g.localGroups.length));
    function we(g) {
      return de.value.filter((h) => h.localGroups.includes(g));
    }
    async function ye() {
      const g = l.value.trim();
      if (!g) return;
      await Ce.createGroup(g) && (l.value = "", c.value = !1);
    }
    function Te(g) {
      T.value = g, f.value = g, p.value = null;
    }
    async function Ie(g) {
      const h = f.value.trim();
      if (!h || h === g) {
        T.value = null;
        return;
      }
      await Ce.renameGroup(g, h) && (T.value = null);
    }
    async function De(g) {
      p.value = null, await Ce.deleteGroup(g);
    }
    async function Ue(g, h) {
      await Ce.removeRepoFromGroup(g, h);
    }
    function Oe(g) {
      const h = C.value;
      if (!h) return;
      const M = g.target?.closest(".column-cards-scroll");
      if (M && M.scrollHeight > M.clientHeight && !g.shiftKey && g.deltaX === 0) {
        const v = M.scrollTop <= 0 && g.deltaY < 0, d = M.scrollTop + M.clientHeight >= M.scrollHeight - 1 && g.deltaY > 0;
        if (!v && !d)
          return;
      }
      Math.abs(g.deltaX) > Math.abs(g.deltaY) && g.deltaX !== 0 || g.deltaY !== 0 && (g.preventDefault(), h.scrollLeft += g.deltaY);
    }
    function Ae(g) {
      if (!x.value || !C.value) return;
      g.preventDefault();
      const h = g.deltaX !== 0 ? g.deltaX : g.deltaY;
      C.value.scrollLeft += h;
    }
    function Le() {
      if (E !== null) return;
      const g = () => {
        C.value && J !== 0 ? (C.value.scrollLeft += J, E = requestAnimationFrame(g)) : Ge();
      };
      E = requestAnimationFrame(g);
    }
    function Ge() {
      E !== null && (cancelAnimationFrame(E), E = null), J = 0;
    }
    function B(g) {
      if (!x.value || !C.value) return;
      const h = C.value.getBoundingClientRect(), m = 100;
      if (g > h.right - m) {
        const M = Math.min(1, Math.max(0.1, (g - (h.right - m)) / m));
        J = Math.round(M * 20), Le();
      } else if (g < h.left + m) {
        const M = Math.min(1, Math.max(0.1, (h.left + m - g) / m));
        J = -Math.round(M * 20), Le();
      } else
        Ge();
    }
    function w(g) {
      x.value && (g.preventDefault(), B(g.clientX));
    }
    function z(g, h, m) {
      V(), x.value = h, D.value = m, g.dataTransfer && (g.dataTransfer.effectAllowed = "move", g.dataTransfer.setData("text/plain", `${h.id}:${m}`)), window.addEventListener("wheel", Ae, { passive: !1 });
    }
    function ke() {
      x.value = null, D.value = null, A.value = null, Ge(), window.removeEventListener("wheel", Ae);
    }
    function Fe(g, h) {
      x.value && (g.preventDefault(), g.dataTransfer && (g.dataTransfer.dropEffect = "move"), A.value = h, B(g.clientX));
    }
    function Ne(g, h) {
      const m = g.currentTarget, M = g.relatedTarget;
      m?.contains(M) || A.value === h && (A.value = null);
    }
    async function Ze(g, h) {
      g.preventDefault();
      const m = x.value, M = D.value;
      ke(), m && (h === "default" ? M && M !== "default" ? await Ce.removeRepoFromGroup(m, M) : await Ce.moveRepoToGroup(m, null) : (await Ce.addRepoToGroup(m, h), M && M !== "default" && M !== h && await Ce.removeRepoFromGroup(m, M)));
    }
    function qe(g) {
      window.open(g, "_blank", "noopener,noreferrer");
    }
    function Xe(g) {
      if (!g) return "";
      try {
        const h = new Date(g);
        return `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, "0")}-${String(h.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return be(
      () => i.active,
      (g) => {
        V(), g && Ce.load();
      }
    ), ht(() => {
      window.addEventListener("pointerdown", K), window.addEventListener("keydown", ce), Ce.load();
    }), bt(() => {
      Ge(), window.removeEventListener("wheel", Ae), window.removeEventListener("pointerdown", K), window.removeEventListener("keydown", ce);
    }), (g, h) => (t(), s("div", Ts, [
      o(F).errorMessage ? (t(), s("div", As, [
        e("span", null, "⚠️ " + a(o(F).errorMessage), 1),
        e("button", {
          type: "button",
          class: "btn-retry",
          onClick: h[0] || (h[0] = (m) => o(Ce).load(!0))
        }, "重试")
      ])) : y("", !0),
      e("section", {
        class: Q(["default-shelf-area", { "is-collapsed": k.value, "drop-active": A.value === "default" }]),
        onDragover: h[1] || (h[1] = (m) => Fe(m, "default")),
        onDragleave: h[2] || (h[2] = (m) => Ne(m, "default")),
        onDrop: h[3] || (h[3] = (m) => Ze(m, "default"))
      }, [
        e("header", Ls, [
          e("div", Ds, [
            h[21] || (h[21] = e("span", { class: "shelf-icon" }, "📁", -1)),
            h[22] || (h[22] = e("span", { class: "shelf-title" }, "未分类仓库", -1)),
            e("span", Hs, a(ie.value.length), 1),
            h[23] || (h[23] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）", -1))
          ]),
          e("div", xs, [
            ie.value.length ? (t(), s("button", {
              key: 0,
              type: "button",
              class: "shelf-toggle-btn",
              title: k.value ? o(I)("github.myRepos.expandShelf") : o(I)("github.myRepos.collapseShelf"),
              onClick: N
            }, a(k.value ? o(I)("github.myRepos.expandBtn") : o(I)("github.myRepos.collapseBtn")), 9, Es)) : y("", !0)
          ])
        ]),
        ie.value.length ? Re((t(), s("div", {
          key: 0,
          ref_key: "shelfScrollRef",
          ref: S,
          class: "shelf-cards-scroll",
          onWheel: $
        }, [
          (t(!0), s(j, null, te(ie.value, (m) => (t(), s("div", {
            key: m.id,
            class: Q(["repo-card shelf-card", { "card-dragging": x.value?.id === m.id }]),
            draggable: "true",
            onDragstart: (M) => z(M, m, "default"),
            onDragend: ke,
            onContextmenu: (M) => pe(M, m, "default")
          }, [
            e("div", Us, [
              e("span", {
                class: "repo-name",
                title: m.fullName,
                onClick: (M) => qe(m.htmlUrl)
              }, a(m.name), 9, Ns),
              m.isPrivate ? (t(), s("span", Ps, "私有")) : y("", !0),
              m.isFork ? (t(), s("span", Os, "Fork")) : y("", !0)
            ]),
            m.description ? (t(), s("p", {
              key: 0,
              class: "repo-desc",
              title: m.description
            }, a(m.description), 9, Fs)) : y("", !0),
            m.topics.length ? (t(), s("div", Bs, [
              (t(!0), s(j, null, te(m.topics, (M) => (t(), s("span", {
                key: M,
                class: "topic-chip-tag",
                title: "GitHub 远端引流标签"
              }, " #" + a(M), 1))), 128))
            ])) : y("", !0),
            e("div", js, [
              e("div", qs, [
                m.language ? (t(), s("span", zs, [
                  h[24] || (h[24] = e("span", { class: "lang-color" }, null, -1)),
                  ae(a(m.language), 1)
                ])) : y("", !0),
                e("span", Ws, "⭐ " + a(m.stargazersCount), 1),
                m.forksCount ? (t(), s("span", Vs, "🍴 " + a(m.forksCount), 1)) : y("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + m.updatedAt
              }, a(Xe(m.pushedAt || m.updatedAt)), 9, Ys)
            ])
          ], 42, Is))), 128))
        ], 544)), [
          [at, !k.value]
        ]) : y("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: C,
        class: "board-viewport",
        onWheel: Oe,
        onDragover: w
      }, [
        e("div", Ks, [
          (t(!0), s(j, null, te(fe.value, (m) => (t(), s("section", {
            key: m,
            class: Q(["board-column topic-column", { "drop-active": A.value === m }]),
            onDragover: (M) => Fe(M, m),
            onDragleave: (M) => Ne(M, m),
            onDrop: (M) => Ze(M, m)
          }, [
            e("header", Xs, [
              T.value !== m ? (t(), s("div", Qs, [
                h[25] || (h[25] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "自定义分组: " + m
                }, " 📁 " + a(m), 9, Js),
                e("span", ea, a(we(m).length), 1)
              ])) : (t(), s("div", ta, [
                Re(e("input", {
                  "onUpdate:modelValue": h[4] || (h[4] = (M) => f.value = M),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    (M) => o(Et)(M, () => Ie(m)),
                    h[5] || (h[5] = Tt((M) => T.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, sa), [
                  [Ke, f.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (M) => Ie(m)
                }, "✓", 8, aa),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: h[6] || (h[6] = (M) => T.value = null)
                }, "✕")
              ])),
              e("div", oa, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "分组操作",
                  onClick: (M) => p.value = p.value === m ? null : m
                }, "•••", 8, na),
                p.value === m ? (t(), s("div", la, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (M) => Te(m)
                  }, " 重命名分组 ", 8, ia),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (M) => De(m)
                  }, " 删除分组 ", 8, ra)
                ])) : y("", !0)
              ])
            ]),
            e("div", ua, [
              (t(!0), s(j, null, te(we(m), (M) => (t(), s("div", {
                key: M.id,
                class: Q(["repo-card", { "card-dragging": x.value?.id === M.id }]),
                draggable: "true",
                onDragstart: (v) => z(v, M, m),
                onDragend: ke,
                onContextmenu: (v) => pe(v, M, m)
              }, [
                e("div", da, [
                  e("span", {
                    class: "repo-name",
                    title: M.fullName,
                    onClick: (v) => qe(M.htmlUrl)
                  }, a(M.name), 9, pa),
                  M.isPrivate ? (t(), s("span", ha, "私有")) : y("", !0),
                  M.isFork ? (t(), s("span", ga, "Fork")) : y("", !0)
                ]),
                M.description ? (t(), s("p", {
                  key: 0,
                  class: "repo-desc",
                  title: M.description
                }, a(M.description), 9, fa)) : y("", !0),
                e("div", ma, [
                  e("span", va, [
                    ae(" 📁 " + a(m) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从该分组移出",
                      onClick: le((v) => Ue(M, m), ["stop"])
                    }, "✕", 8, ba)
                  ]),
                  (t(!0), s(j, null, te(M.topics, (v) => (t(), s("span", {
                    key: v,
                    class: "topic-chip-tag",
                    title: "GitHub 远端引流标签"
                  }, " #" + a(v), 1))), 128))
                ]),
                e("div", ya, [
                  e("div", _a, [
                    M.language ? (t(), s("span", ka, [
                      h[26] || (h[26] = e("span", { class: "lang-color" }, null, -1)),
                      ae(a(M.language), 1)
                    ])) : y("", !0),
                    e("span", wa, "⭐ " + a(M.stargazersCount), 1),
                    M.forksCount ? (t(), s("span", $a, "🍴 " + a(M.forksCount), 1)) : y("", !0)
                  ]),
                  e("span", Ca, a(Xe(M.pushedAt || M.updatedAt)), 1)
                ])
              ], 42, ca))), 128)),
              we(m).length ? y("", !0) : (t(), s("div", Sa, [...h[27] || (h[27] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, Zs))), 128)),
          e("section", Ra, [
            c.value ? (t(), s("div", Ga, [
              h[29] || (h[29] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建分组板块"),
                e("small", null, "支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics")
              ], -1)),
              Re(e("input", {
                "onUpdate:modelValue": h[8] || (h[8] = (m) => l.value = m),
                type: "text",
                placeholder: "输入分组名称（如：前端工具、深度学习）",
                class: "composer-input",
                onKeydown: [
                  h[9] || (h[9] = (m) => o(Et)(m, ye)),
                  h[10] || (h[10] = Tt((m) => c.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [Ke, l.value]
              ]),
              e("div", Ma, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: ye
                }, "创建"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: h[11] || (h[11] = (m) => c.value = !1)
                }, a(o(I)("common.cancel")), 1)
              ])
            ])) : (t(), s("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: h[7] || (h[7] = (m) => c.value = !0)
            }, [...h[28] || (h[28] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建分组板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (t(), Se(Rt, { to: "body" }, [
        H.visible && H.repo ? (t(), s("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ot({ left: `${H.x}px`, top: `${H.y}px` }),
          onClick: h[19] || (h[19] = le(() => {
          }, ["stop"])),
          onContextmenu: h[20] || (h[20] = le(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: Q(["gh-menu-has-sub", { "is-active": P.value === "folder" }]),
            onMouseenter: h[14] || (h[14] = (m) => P.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: h[12] || (h[12] = le((m) => P.value = P.value === "folder" ? null : "folder", ["stop"]))
            }, [...h[30] || (h[30] = [
              e("span", null, "移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: Q(["gh-sub-flyout", { "flyout-left": O.value }]),
              onClick: h[13] || (h[13] = le(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: Q(["fo-cover-menu-item", { primary: !H.repo.localGroups.length }]),
                type: "button",
                onClick: ue
              }, a(H.repo.localGroups.length ? "  " : "✓ ") + "设为未分类 ", 3),
              (t(!0), s(j, null, te(fe.value, (m) => (t(), s("button", {
                key: m,
                class: Q(["fo-cover-menu-item", { primary: H.repo.localGroups.includes(m) }]),
                type: "button",
                onClick: (M) => U(m)
              }, a(H.repo.localGroups.includes(m) ? "✓ " : "  ") + "📁 " + a(m), 11, Ta))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: h[15] || (h[15] = (m) => P.value = null),
            onClick: q
          }, a(o(I)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: h[16] || (h[16] = (m) => P.value = null),
            onClick: X
          }, a(o(I)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: h[17] || (h[17] = (m) => P.value = null),
            onClick: Y
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: h[18] || (h[18] = (m) => P.value = null),
            onClick: ne
          }, a(o(I)("github.myRepos.openInGitHub")), 33)
        ], 36)) : y("", !0)
      ]))
    ]));
  }
}), La = /* @__PURE__ */ Ee(Aa, [["__scopeId", "data-v-85f0a216"]]), He = Ye({
  uncatPage: 1,
  pageSize: 10
});
class st {
  static getInstance() {
    return st.instance || (st.instance = new st()), st.instance;
  }
  nextUncatPage() {
    this.uncatPage < this.uncatTotalPages && He.uncatPage++;
  }
  prevUncatPage() {
    He.uncatPage > 1 && He.uncatPage--;
  }
  setUncatPage(i) {
    const l = Math.max(1, Math.min(i, this.uncatTotalPages));
    He.uncatPage = l;
  }
  get uncatPage() {
    return He.uncatPage;
  }
  get uncatTotalPages() {
    const i = this.filteredUncatRepos.length;
    return Math.max(1, Math.ceil(i / He.pageSize));
  }
  /**
   * 未分类的所有 Star 仓库（带搜索过滤）
   */
  get filteredUncatRepos() {
    const i = oe.searchQuery.trim().toLowerCase(), l = oe.repos.filter((c) => mt(c.full_name).length === 0);
    return i ? l.filter(
      (c) => c.full_name.toLowerCase().includes(i) || c.description && c.description.toLowerCase().includes(i) || c.language && c.language.toLowerCase().includes(i) || c.topics && c.topics.some((p) => p.toLowerCase().includes(i))
    ) : l;
  }
  /**
   * 当前页切片的 10 个未分类 Star 仓库
   */
  get pagedUncatRepos() {
    const i = this.filteredUncatRepos, c = (Math.min(He.uncatPage, this.uncatTotalPages) - 1) * He.pageSize;
    return i.slice(c, c + He.pageSize);
  }
  /**
   * 各个本地分组板块列表（根据当前激活的大分组标签过滤）
   */
  get lists() {
    const i = oe.activeSection || "默认";
    return oe.lists.filter((l) => (l.section || "默认") === i);
  }
  /**
   * 获取归属于指定 GitHub List 的 Star 仓库（带搜索过滤）
   */
  getReposForList(i) {
    const l = oe.searchQuery.trim().toLowerCase(), c = oe.repos.filter((p) => mt(p.full_name).includes(i));
    return l ? c.filter(
      (p) => p.full_name.toLowerCase().includes(l) || p.description && p.description.toLowerCase().includes(l) || p.language && p.language.toLowerCase().includes(l) || p.topics && p.topics.some((f) => f.toLowerCase().includes(l))
    ) : c;
  }
  /**
   * 拖拽归入指定 List（若 target 为 'uncategorized' 则从所有 List 移出）
   */
  async moveRepoToList(i, l) {
    await Z.dropRepositoryIntoFolder(i, l);
  }
  /**
   * 从指定 List 移出仓库
   */
  async removeRepoFromList(i, l) {
    await Z.toggleRepoList(i, l);
  }
}
const se = st.getInstance(), et = {
  mode: "idle",
  activeDragRepo: null,
  activeDragFromList: null,
  hoverTargetColumn: null,
  draggingColumnId: null,
  hoverColumnId: null,
  repoMenu: null,
  columnMenu: null
};
class Da {
  constructor() {
    this._state = { ...et }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.githubStarsBoard = this);
  }
  get state() {
    return this._state;
  }
  get mode() {
    return this._state.mode;
  }
  get isDraggingRepo() {
    return this._state.mode === "dragging_repo";
  }
  get isDraggingColumn() {
    return this._state.mode === "dragging_column";
  }
  get activeDragRepo() {
    return this._state.activeDragRepo;
  }
  get activeDragFromList() {
    return this._state.activeDragFromList;
  }
  get hoverTargetColumn() {
    return this._state.hoverTargetColumn;
  }
  get draggingColumnId() {
    return this._state.draggingColumnId;
  }
  get hoverColumnId() {
    return this._state.hoverColumnId;
  }
  get repoMenu() {
    return this._state.repoMenu;
  }
  get columnMenu() {
    return this._state.columnMenu;
  }
  subscribe(i) {
    return this._listeners.add(i), () => {
      this._listeners.delete(i);
    };
  }
  _setState(i) {
    this._state = i;
    for (const l of this._listeners)
      l(i);
  }
  send(i) {
    const l = this._state;
    switch (i.type) {
      case "START_DRAG_REPO":
        return this._setState({
          mode: "dragging_repo",
          activeDragRepo: i.repo,
          activeDragFromList: i.fromList,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: null
        }), !0;
      case "HOVER_TARGET_COLUMN":
        return l.mode === "dragging_repo" ? (this._setState({
          ...l,
          hoverTargetColumn: i.columnId
        }), !0) : !1;
      case "END_DRAG_REPO":
        return l.mode === "dragging_repo" ? (this._setState({ ...et }), !0) : !1;
      case "START_DRAG_COLUMN":
        return this._setState({
          mode: "dragging_column",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: i.columnId,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: null
        }), !0;
      case "HOVER_COLUMN_REORDER":
        return l.mode === "dragging_column" ? (this._setState({
          ...l,
          hoverColumnId: i.columnId
        }), !0) : !1;
      case "END_DRAG_COLUMN":
        return l.mode === "dragging_column" ? (this._setState({ ...et }), !0) : !1;
      case "OPEN_REPO_MENU":
        return this._setState({
          mode: "repo_context_menu",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: i.payload,
          columnMenu: null
        }), !0;
      case "CLOSE_REPO_MENU":
        return l.mode === "repo_context_menu" ? (this._setState({ ...et }), !0) : !1;
      case "OPEN_COLUMN_MENU":
        return this._setState({
          mode: "column_menu",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: i.payload
        }), !0;
      case "CLOSE_COLUMN_MENU":
        return l.mode === "column_menu" ? (this._setState({ ...et }), !0) : !1;
      case "RESET_IDLE":
        return this._setState({ ...et }), !0;
      default:
        return !1;
    }
  }
}
const Ha = { class: "stars-board-workspace" }, xa = ["data-gh-list-drop"], Ea = { class: "shelf-header" }, Ia = { class: "shelf-left" }, Ua = { class: "shelf-badge" }, Na = { class: "shelf-right" }, Pa = {
  key: 0,
  class: "shelf-pager"
}, Oa = ["disabled"], Fa = { class: "pager-text" }, Ba = ["disabled"], ja = ["title"], qa = {
  key: 0,
  class: "shelf-cards-scroll"
}, za = ["onClick", "onDragstart", "onContextmenu"], Wa = ["onClick"], Va = { class: "gh-card-head" }, Ya = ["src"], Ka = ["href", "title"], Za = { class: "owner" }, Xa = { class: "gh-card-body" }, Qa = { class: "gh-card-badges" }, Ja = ["title"], eo = ["title"], to = ["title"], so = { class: "meta" }, ao = { class: "gh-stars" }, oo = {
  key: 0,
  class: "gh-lang"
}, no = { class: "gh-updated" }, lo = { class: "shelf-next-content" }, io = { class: "shelf-next-sub" }, ro = {
  key: 2,
  class: "shelf-empty",
  role: "status"
}, uo = {
  key: 0,
  class: "gh-drilldown-header"
}, co = { class: "gh-drilldown-current" }, po = { class: "gh-drilldown-sub-count" }, ho = {
  key: 0,
  class: "board-columns-track"
}, go = { class: "column-cards-scroll" }, fo = {
  key: 1,
  class: "board-columns-track"
}, mo = ["data-gh-list-drop", "onDragover", "onDragleave", "onDrop"], vo = ["title"], bo = ["onClick"], yo = ["title"], _o = {
  key: 0,
  class: "col-pinned-icon",
  title: "已置顶分组"
}, ko = ["title"], wo = ["title"], $o = { class: "column-actions" }, Co = ["onDragstart", "onClick"], So = { class: "column-cards-scroll" }, Ro = ["onClick", "onDragstart", "onContextmenu"], Go = ["onClick"], Mo = { class: "gh-card-head" }, To = ["src"], Ao = ["href", "title"], Lo = { class: "owner" }, Do = { class: "gh-card-body" }, Ho = { class: "gh-card-badges" }, xo = ["title"], Eo = ["onClick"], Io = ["title"], Uo = ["title"], No = ["title"], Po = { class: "meta" }, Oo = { class: "gh-stars" }, Fo = {
  key: 0,
  class: "gh-lang"
}, Bo = { class: "gh-updated" }, jo = {
  key: 0,
  class: "empty-column-dropzone"
}, qo = { class: "board-column add-column-panel" }, zo = ["title"], Wo = ["onClick"], Vo = /* @__PURE__ */ xe({
  __name: "GitHubStarsBoard",
  props: {
    active: { type: Boolean }
  },
  setup(_) {
    const i = _, l = G(null), c = G(null), p = G(!1);
    function f() {
      p.value = !p.value;
    }
    function T(n) {
      const r = c.value;
      r && (Math.abs(n.deltaX) > Math.abs(n.deltaY) && n.deltaX !== 0 || n.deltaY !== 0 && (n.preventDefault(), r.scrollLeft += n.deltaY));
    }
    const C = re(() => oe.loading), S = re(() => C.value && !oe.repos.length), k = G(null);
    function N(n) {
      if (!n) return null;
      const r = n.match(/^(.+)[/／]([^/／]+)$/);
      if (!r) return null;
      const u = r[1].trim(), b = r[2].trim();
      return !u || !b ? null : { parentPrefix: u, childName: b };
    }
    function $(n) {
      const r = N(n);
      if (!r) return null;
      const u = r.parentPrefix.toLowerCase(), b = se.lists.find((ee) => ee.name.trim().toLowerCase() === u);
      return b ? b.name : null;
    }
    function x(n) {
      const r = n.trim().toLowerCase();
      return se.lists.filter((u) => {
        const b = N(u.name);
        return b !== null && b.parentPrefix.toLowerCase() === r;
      });
    }
    function D(n) {
      return x(n).length > 0;
    }
    const A = re(() => k.value ? x(k.value).length : 0);
    function E(n) {
      k.value = n, l.value && (l.value.scrollLeft = 0);
    }
    function J() {
      k.value && (k.value = $(k.value));
    }
    const H = re(() => {
      const n = se.lists;
      if (!k.value)
        return n.filter((ee) => $(ee.name) === null);
      const r = k.value.trim().toLowerCase(), u = n.find((ee) => ee.name.trim().toLowerCase() === r), b = x(k.value);
      return !u && !b.length ? (k.value = null, n.filter((ee) => $(ee.name) === null)) : u ? [u, ...b] : b;
    });
    be(() => oe.activeSection, () => {
      k.value = null;
    });
    function P() {
      Z.promptCreateFolder(k.value || void 0);
    }
    const O = new Da(), V = G(O.activeDragRepo), pe = G(O.activeDragFromList), ue = G(O.hoverTargetColumn);
    let U = null, q = 0;
    function X() {
      U === null && (U = window.setInterval(() => {
        !l.value || q === 0 || (l.value.scrollLeft += q);
      }, 16));
    }
    function ne() {
      U !== null && (clearInterval(U), U = null), q = 0;
    }
    const Y = Ye({
      visible: !1,
      x: 0,
      y: 0,
      list: null
    }), K = Ye({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromList: null
    }), ce = G(null), fe = G(!1), de = G(O.draggingColumnId), ie = G(O.hoverColumnId), we = O.subscribe((n) => {
      V.value = n.activeDragRepo, pe.value = n.activeDragFromList, ue.value = n.hoverTargetColumn, de.value = n.draggingColumnId, ie.value = n.hoverColumnId, Y.visible = n.mode === "column_menu" && n.columnMenu !== null, Y.x = n.columnMenu?.x ?? 0, Y.y = n.columnMenu?.y ?? 0, Y.list = n.columnMenu?.list ?? null, K.visible = n.mode === "repo_context_menu" && n.repoMenu !== null, K.x = n.repoMenu?.x ?? 0, K.y = n.repoMenu?.y ?? 0, K.repo = n.repoMenu?.repo ?? null, K.fromList = n.repoMenu?.fromList ?? null, ce.value = n.repoMenu?.activeSubMenu ?? null, fe.value = n.repoMenu?.isFlyoutLeft ?? !1;
    });
    function ye() {
      O.send({ type: "CLOSE_COLUMN_MENU" });
    }
    function Te(n, r) {
      n.preventDefault(), n.stopPropagation();
      const u = 160, b = 175, ee = Math.min(n.clientX, window.innerWidth - u - 10), Qe = Math.min(n.clientY, window.innerHeight - b - 10);
      O.send({ type: "OPEN_COLUMN_MENU", payload: { x: ee, y: Qe, list: r } });
    }
    async function Ie() {
      const n = Y.list;
      ye(), n && await Z.promptCreateFolder(n.name);
    }
    async function De() {
      const n = Y.list;
      ye(), n && await Z.renameFolder(n.id, n.name);
    }
    async function Ue() {
      const n = Y.list;
      ye(), n && await Z.pinFolder(n.id);
    }
    async function Oe() {
      const n = Y.list;
      ye(), n && await Z.deleteFolder(n.name);
    }
    function Ae(n, r) {
      O.send({ type: "START_DRAG_COLUMN", columnId: r.id }), n.dataTransfer && (n.dataTransfer.effectAllowed = "move", n.dataTransfer.setData("application/x-gh-col-id", r.id));
    }
    function Le() {
      O.send({ type: "END_DRAG_COLUMN" });
    }
    function Ge(n, r) {
      !de.value || de.value === r || (n.preventDefault(), n.dataTransfer && (n.dataTransfer.dropEffect = "move"), O.send({ type: "HOVER_COLUMN_REORDER", columnId: r }));
    }
    function B(n, r) {
      ie.value === r && O.send({ type: "HOVER_COLUMN_REORDER", columnId: null });
    }
    async function w(n, r) {
      if (!de.value || de.value === r) return;
      n.preventDefault();
      const u = de.value;
      Le(), await Z.reorderFolders(u, r);
    }
    function z() {
      O.send({ type: "CLOSE_REPO_MENU" });
    }
    function ke(n, r, u) {
      n.preventDefault(), n.stopPropagation();
      const b = 190, ee = 270, Qe = Math.min(n.clientX, window.innerWidth - b - 10), Bt = Math.min(n.clientY, window.innerHeight - ee - 10);
      O.send({
        type: "OPEN_REPO_MENU",
        payload: {
          x: Qe,
          y: Bt,
          repo: r,
          fromList: u,
          activeSubMenu: "folder",
          isFlyoutLeft: Qe > window.innerWidth - 380
        }
      });
    }
    async function Fe() {
      const n = K.repo;
      z(), n && await se.moveRepoToList(n.full_name, Z.UNCAT);
    }
    async function Ne(n) {
      const r = K.repo;
      z(), r && await se.moveRepoToList(r.full_name, n);
    }
    async function Ze() {
      const n = K.repo;
      if (z(), !!n?.html_url)
        try {
          await navigator.clipboard.writeText(n.html_url);
        } catch {
        }
    }
    async function qe() {
      const n = K.repo;
      if (z(), !!n?.full_name)
        try {
          await navigator.clipboard.writeText(`git clone https://github.com/${n.full_name}.git`);
        } catch {
        }
    }
    function Xe() {
      const n = K.repo;
      z(), n && Ot.open({
        fullName: n.full_name,
        description: n.description || "",
        stars: n.stargazers_count,
        language: n.language || void 0,
        updated: n.updated_at
      });
    }
    function g() {
      const n = K.repo;
      z(), n?.html_url && ge(n.html_url);
    }
    function h(n) {
      const r = n.target;
      !r?.closest(".fo-cover-context-menu") && !r?.closest(".col-popover-menu") && !r?.closest(".gh-list-col-menu") && O.send({ type: "RESET_IDLE" });
    }
    function m(n) {
      if (n.key === "Escape") {
        if (k.value) {
          J();
          return;
        }
        O.send({ type: "RESET_IDLE" });
      }
    }
    function M(n) {
      const r = l.value;
      if (!r) return;
      const b = n.target?.closest(".column-cards-scroll");
      if (b && b.scrollHeight > b.clientHeight && !n.shiftKey && n.deltaX === 0) {
        const ee = b.scrollTop === 0 && n.deltaY < 0, Qe = Math.ceil(b.scrollTop + b.clientHeight) >= b.scrollHeight && n.deltaY > 0;
        if (!ee && !Qe)
          return;
      }
      Math.abs(n.deltaX) > Math.abs(n.deltaY) && n.deltaX !== 0 || n.deltaY !== 0 && (n.preventDefault(), r.scrollLeft += n.deltaY);
    }
    function v(n) {
      if (!V.value || !l.value) return;
      n.preventDefault();
      const r = n.deltaY !== 0 ? n.deltaY : n.deltaX;
      l.value.scrollLeft += r;
    }
    function d(n) {
      const r = l.value;
      if (!r) return;
      const u = r.getBoundingClientRect(), b = 100;
      if (n > u.right - b) {
        const ee = Math.min(1, Math.max(0.1, (n - (u.right - b)) / b));
        q = Math.round(ee * 20), X();
      } else if (n < u.left + b) {
        const ee = Math.min(1, Math.max(0.1, (u.left + b - n) / b));
        q = -Math.round(ee * 20), X();
      } else
        ne();
    }
    function R(n) {
      d(n.clientX);
    }
    function _e(n, r, u) {
      O.send({ type: "START_DRAG_REPO", repo: r, fromList: u }), n.dataTransfer && (n.dataTransfer.effectAllowed = "move", n.dataTransfer.setData(xt, r.full_name), n.dataTransfer.setData("text/plain", `${r.full_name}:${u || "uncategorized"}`)), window.addEventListener("wheel", v, { passive: !1 });
    }
    function me() {
      O.send({ type: "END_DRAG_REPO" }), ne(), window.removeEventListener("wheel", v);
    }
    function he(n, r) {
      !i.active || !V.value && !Array.from(n.dataTransfer?.types || []).includes(xt) || (n.preventDefault(), n.dataTransfer && (n.dataTransfer.dropEffect = "move"), O.send({ type: "HOVER_TARGET_COLUMN", columnId: r }));
    }
    function ve(n, r) {
      const u = n.currentTarget;
      u && n.relatedTarget instanceof Node && u.contains(n.relatedTarget) || ue.value === r && O.send({ type: "HOVER_TARGET_COLUMN", columnId: null });
    }
    async function Me(n, r) {
      n.preventDefault();
      const u = V.value?.full_name || qt(n.dataTransfer);
      me(), !(!i.active || !u) && await se.moveRepoToList(u, r === "uncategorized" ? Z.UNCAT : r);
    }
    function $e(n) {
      yt.open(n.full_name, void 0, n);
    }
    function ge(n) {
      window.open(n, "_blank", "noopener,noreferrer");
    }
    function lt(n) {
      const r = se.getReposForList(n.name).length, u = Number(n?.totalCount || 0);
      return !oe.searchQuery.trim() && u > r ? `${r}/${u}` : String(r);
    }
    function Be(n) {
      const r = se.getReposForList(n.name).length, u = Number(n?.totalCount || 0);
      return !oe.searchQuery.trim() && u > r ? oe.loading ? `已加载 ${r} 个，本地共记录 ${u} 个（正在补全 Star 列表…）` : `已显示 ${r} 个，本地共记录 ${u} 个（其余可能尚未拉取或已在 GitHub 取消 Star）` : `共 ${r} 个仓库`;
    }
    function Pe(n) {
      if (!n) return "";
      try {
        const r = new Date(n);
        return `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-${String(r.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return ht(() => {
      window.addEventListener("pointerdown", h), window.addEventListener("keydown", m);
    }), bt(() => {
      we(), O.send({ type: "RESET_IDLE" }), ne(), window.removeEventListener("wheel", v), window.removeEventListener("pointerdown", h), window.removeEventListener("keydown", m);
    }), (n, r) => (t(), s("div", Ha, [
      e("section", {
        class: Q(["default-shelf-area", { "is-collapsed": p.value, "drop-active": ue.value === "uncategorized" }]),
        "data-gh-list-drop": o(Z).UNCAT,
        onDragover: r[5] || (r[5] = (u) => he(u, "uncategorized")),
        onDragleave: r[6] || (r[6] = (u) => ve(u, "uncategorized")),
        onDrop: r[7] || (r[7] = (u) => Me(u, "uncategorized"))
      }, [
        e("header", Ea, [
          e("div", Ia, [
            r[24] || (r[24] = e("span", { class: "shelf-icon" }, "📁", -1)),
            r[25] || (r[25] = e("span", { class: "shelf-title" }, "未分类 Star 收藏", -1)),
            e("span", Ua, a(o(se).filteredUncatRepos.length), 1),
            r[26] || (r[26] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消本地分组归属；单排 10 个一页）", -1))
          ]),
          e("div", Na, [
            o(se).filteredUncatRepos.length > o(He).pageSize ? (t(), s("div", Pa, [
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: o(se).uncatPage <= 1,
                title: "上一页",
                onClick: r[0] || (r[0] = //@ts-ignore
                (...u) => o(se).prevUncatPage && o(se).prevUncatPage(...u))
              }, "‹", 8, Oa),
              e("span", Fa, a(o(se).uncatPage) + " / " + a(o(se).uncatTotalPages) + " 页", 1),
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: o(se).uncatPage >= o(se).uncatTotalPages,
                title: "下一页",
                onClick: r[1] || (r[1] = //@ts-ignore
                (...u) => o(se).nextUncatPage && o(se).nextUncatPage(...u))
              }, "›", 8, Ba)
            ])) : y("", !0),
            o(se).filteredUncatRepos.length ? (t(), s("button", {
              key: 1,
              type: "button",
              class: "shelf-toggle-btn",
              title: p.value ? "展开托盘" : "收起托盘",
              onClick: f
            }, a(p.value ? "展开 ▼" : "收起 ▲"), 9, ja)) : y("", !0)
          ])
        ]),
        S.value ? Re((t(), s("div", qa, [
          (t(), s(j, null, te(6, (u) => e("div", {
            key: "skel-shelf-" + u,
            class: "repo gh-card shelf-card skel-card"
          }, [...r[27] || (r[27] = [
            e("div", { class: "skel-line skel-title" }, null, -1),
            e("div", { class: "skel-line skel-desc" }, null, -1),
            e("div", { class: "skel-line skel-meta" }, null, -1)
          ])])), 64))
        ], 512)), [
          [at, !p.value]
        ]) : o(se).filteredUncatRepos.length ? Re((t(), s("div", {
          key: 1,
          ref_key: "shelfScrollRef",
          ref: c,
          class: "shelf-cards-scroll",
          onWheel: T
        }, [
          (t(!0), s(j, null, te(o(se).pagedUncatRepos, (u) => (t(), s("article", {
            key: u.full_name,
            class: Q(["repo gh-card shelf-card", { "card-dragging": V.value?.full_name === u.full_name }]),
            draggable: "true",
            onClick: (b) => $e(u),
            onDragstart: (b) => _e(b, u, null),
            onDragend: me,
            onContextmenu: (b) => ke(b, u, null)
          }, [
            e("button", {
              class: "fo-card-more",
              type: "button",
              "aria-label": "更多操作",
              title: "更多操作",
              onClick: le((b) => ke(b, u, null), ["stop"])
            }, "⋮", 8, Wa),
            e("div", Va, [
              e("img", {
                class: "gh-owner-avatar",
                src: u.owner?.avatar_url || "assets/github-star.svg",
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer",
                onError: r[2] || (r[2] = (b) => b.target.src = "assets/github-star.svg")
              }, null, 40, Ya),
              e("a", {
                href: u.html_url,
                target: "_blank",
                rel: "noreferrer",
                class: "name",
                title: u.full_name,
                onClick: r[3] || (r[3] = le(() => {
                }, ["stop"]))
              }, [
                e("span", Za, a(u.owner?.login || u.full_name.split("/")[0]) + "/", 1),
                ae(a(u.name), 1)
              ], 8, Ka)
            ]),
            e("div", Xa, [
              e("div", Qa, [
                r[28] || (r[28] = e("span", { class: "gh-badge-folder uncat" }, "＋ 未分类", -1)),
                u.topics && u.topics.length ? (t(), s(j, { key: 0 }, [
                  (t(!0), s(j, null, te(u.topics.slice(0, 2), (b) => (t(), s("span", {
                    key: b,
                    class: "gh-badge-topic-chip",
                    title: "Topic: " + b
                  }, " #" + a(b), 9, Ja))), 128)),
                  u.topics.length > 2 ? (t(), s("span", {
                    key: 0,
                    class: "gh-badge-topic-chip more",
                    title: u.topics.slice(2).map((b) => "#" + b).join(" ")
                  }, " +" + a(u.topics.length - 2), 9, eo)) : y("", !0)
                ], 64)) : y("", !0)
              ]),
              e("p", {
                class: "desc",
                title: u.description || ""
              }, a(u.description || "暂无描述"), 9, to)
            ]),
            e("div", so, [
              e("span", ao, "★ " + a(u.stargazers_count), 1),
              u.language ? (t(), s("span", oo, a(u.language), 1)) : y("", !0),
              e("span", no, "更新 " + a(Pe(u.updated_at)), 1)
            ])
          ], 42, za))), 128)),
          o(se).uncatPage < o(se).uncatTotalPages ? (t(), s("div", {
            key: 0,
            class: "repo gh-card shelf-card shelf-next-card",
            title: "点击翻到下一页",
            onClick: r[4] || (r[4] = //@ts-ignore
            (...u) => o(se).nextUncatPage && o(se).nextUncatPage(...u))
          }, [
            e("div", lo, [
              r[29] || (r[29] = e("span", { class: "shelf-next-icon" }, "➔", -1)),
              r[30] || (r[30] = e("span", { class: "shelf-next-title" }, "下一页", -1)),
              e("span", io, a(o(se).uncatPage + 1) + " / " + a(o(se).uncatTotalPages) + " 页", 1)
            ])
          ])) : y("", !0)
        ], 544)), [
          [at, !p.value]
        ]) : p.value ? y("", !0) : (t(), s("p", ro, a(o(oe).searchQuery ? "没有匹配的未分类仓库" : "暂无未分类 Star 仓库"), 1))
      ], 42, xa),
      k.value ? (t(), s("div", uo, [
        e("button", {
          type: "button",
          class: "gh-drilldown-back-btn",
          title: "返回上一级分组 (Esc)",
          onClick: J
        }, a($(k.value) ? "‹ 返回上一级" : "‹ 返回全部"), 1),
        r[31] || (r[31] = e("span", { class: "gh-drilldown-sep" }, "/", -1)),
        e("span", co, "📁 " + a(k.value), 1),
        e("span", po, " (含 " + a(A.value) + " 个子分组) ", 1),
        e("button", {
          type: "button",
          class: "gh-drilldown-exit-btn",
          title: "退出下钻视图",
          onClick: r[8] || (r[8] = (u) => k.value = null)
        }, " ✕ ")
      ])) : y("", !0),
      e("div", {
        ref_key: "boardViewportRef",
        ref: l,
        class: "board-viewport",
        onWheel: M,
        onDragover: R
      }, [
        C.value && !H.value.length ? (t(), s("div", ho, [
          (t(), s(j, null, te(4, (u) => e("div", {
            key: "skel-col-" + u,
            class: "board-column skel-column"
          }, [
            r[33] || (r[33] = e("div", { class: "column-header" }, [
              e("div", {
                class: "skel-line",
                style: { width: "120px", height: "16px" }
              })
            ], -1)),
            e("div", go, [
              (t(), s(j, null, te(3, (b) => e("div", {
                key: "skel-col-card-" + b,
                class: "repo gh-card skel-card"
              }, [...r[32] || (r[32] = [
                e("div", { class: "skel-line skel-title" }, null, -1),
                e("div", { class: "skel-line skel-desc" }, null, -1),
                e("div", { class: "skel-line skel-meta" }, null, -1)
              ])])), 64))
            ])
          ])), 64))
        ])) : (t(), s("div", fo, [
          (t(!0), s(j, null, te(H.value, (u) => (t(), s("section", {
            key: u.id,
            class: Q(["board-column list-column", {
              "drop-active": ue.value === u.name,
              "col-dragging": de.value === u.id,
              "col-hover-target": ie.value === u.id
            }]),
            "data-gh-list-drop": u.name,
            onDragover: (b) => V.value ? he(b, u.name) : Ge(b, u.id),
            onDragleave: (b) => V.value ? ve(b, u.name) : B(b, u.id),
            onDrop: (b) => V.value ? Me(b, u.name) : w(b, u.id)
          }, [
            e("header", {
              class: "column-header",
              title: D(u.name) && u.name !== k.value ? `📁 ${u.name}（包含 ${x(u.name).length} 个子分组，点击下钻进入）` : "拖动此列可调换位置；右侧更多可创建子分类、重命名、置顶或删除"
            }, [
              e("div", {
                class: Q(["column-title-group", { "is-parent-folder": D(u.name) && u.name !== k.value }]),
                onClick: (b) => D(u.name) && u.name !== k.value && E(u.name)
              }, [
                r[34] || (r[34] = e("span", { class: "col-dot list-dot" }, null, -1)),
                e("h3", {
                  class: Q(["column-title", { "title-clickable": D(u.name) && u.name !== k.value }]),
                  title: u.description || "本地分组: " + u.name
                }, " 📁 " + a(u.name), 11, yo),
                u.pinned ? (t(), s("span", _o, "📌")) : y("", !0),
                e("span", {
                  class: "badge-count",
                  title: Be(u)
                }, a(lt(u)), 9, ko),
                D(u.name) && u.name !== k.value ? (t(), s("span", {
                  key: 1,
                  class: "col-sub-badge",
                  title: `点击下钻查看 ${x(u.name).length} 个子分组（当前列仅显示直接归属「${u.name}」的仓库）`
                }, a(x(u.name).length) + "个子分组 › ", 9, wo)) : y("", !0)
              ], 10, bo),
              e("div", $o, [
                e("button", {
                  type: "button",
                  class: "col-more-btn col-drag-handle",
                  title: "按住拖动可调换分组位置；点击打开更多操作",
                  draggable: "true",
                  "aria-label": "分组操作与拖拽手柄",
                  onDragstart: (b) => Ae(b, u),
                  onDragend: Le,
                  onClick: le((b) => Te(b, u), ["stop"])
                }, "⋮", 40, Co)
              ])
            ], 8, vo),
            e("div", So, [
              (t(!0), s(j, null, te(o(se).getReposForList(u.name), (b) => (t(), s("article", {
                key: b.full_name,
                class: Q(["repo gh-card", { "card-dragging": V.value?.full_name === b.full_name }]),
                draggable: "true",
                onClick: (ee) => $e(b),
                onDragstart: (ee) => _e(ee, b, u.name),
                onDragend: me,
                onContextmenu: (ee) => ke(ee, b, u.name)
              }, [
                e("button", {
                  class: "fo-card-more",
                  type: "button",
                  "aria-label": "更多操作",
                  title: "更多操作",
                  onClick: le((ee) => ke(ee, b, u.name), ["stop"])
                }, "⋮", 8, Go),
                e("div", Mo, [
                  e("img", {
                    class: "gh-owner-avatar",
                    src: b.owner?.avatar_url || "assets/github-star.svg",
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer",
                    onError: r[9] || (r[9] = (ee) => ee.target.src = "assets/github-star.svg")
                  }, null, 40, To),
                  e("a", {
                    href: b.html_url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "name",
                    title: b.full_name,
                    onClick: r[10] || (r[10] = le(() => {
                    }, ["stop"]))
                  }, [
                    e("span", Lo, a(b.owner?.login || b.full_name.split("/")[0]) + "/", 1),
                    ae(a(b.name), 1)
                  ], 8, Ao)
                ]),
                e("div", Do, [
                  e("div", Ho, [
                    e("span", {
                      class: "gh-badge-folder",
                      title: "属于列表: " + u.name
                    }, [
                      ae(" 📁 " + a(u.name) + " ", 1),
                      e("span", {
                        class: "btn-inline-remove",
                        title: "从该列表中移出",
                        role: "button",
                        tabindex: "0",
                        onClick: le((ee) => o(se).removeRepoFromList(b.full_name, u.name), ["stop"])
                      }, "×", 8, Eo)
                    ], 8, xo),
                    b.topics && b.topics.length ? (t(), s(j, { key: 0 }, [
                      (t(!0), s(j, null, te(b.topics.slice(0, 2), (ee) => (t(), s("span", {
                        key: ee,
                        class: "gh-badge-topic-chip",
                        title: "Topic: " + ee
                      }, " #" + a(ee), 9, Io))), 128)),
                      b.topics.length > 2 ? (t(), s("span", {
                        key: 0,
                        class: "gh-badge-topic-chip more",
                        title: b.topics.slice(2).map((ee) => "#" + ee).join(" ")
                      }, " +" + a(b.topics.length - 2), 9, Uo)) : y("", !0)
                    ], 64)) : y("", !0)
                  ]),
                  e("p", {
                    class: "desc",
                    title: b.description || ""
                  }, a(b.description || "暂无描述"), 9, No)
                ]),
                e("div", Po, [
                  e("span", Oo, "★ " + a(b.stargazers_count), 1),
                  b.language ? (t(), s("span", Fo, a(b.language), 1)) : y("", !0),
                  e("span", Bo, "更新 " + a(Pe(b.updated_at)), 1)
                ])
              ], 42, Ro))), 128)),
              o(se).getReposForList(u.name).length ? y("", !0) : (t(), s("div", jo, [...r[35] || (r[35] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, mo))), 128)),
          e("section", qo, [
            e("button", {
              type: "button",
              class: "btn-trigger-add-col",
              title: k.value ? `在「${k.value}」下新建子分组` : "新建本地分组",
              onClick: P
            }, [
              r[36] || (r[36] = e("span", { class: "plus-icon" }, "＋", -1)),
              e("span", null, a(k.value ? `新建 ${k.value} 子分组` : "新建本地分组"), 1)
            ], 8, zo)
          ])
        ]))
      ], 544),
      (t(), Se(Rt, { to: "body" }, [
        K.visible && K.repo ? (t(), s("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ot({ left: `${K.x}px`, top: `${K.y}px` }),
          onClick: r[20] || (r[20] = le(() => {
          }, ["stop"])),
          onContextmenu: r[21] || (r[21] = le(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: Q(["gh-menu-has-sub", { "is-active": ce.value === "folder" }]),
            onMouseenter: r[13] || (r[13] = (u) => ce.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: r[11] || (r[11] = le((u) => ce.value = ce.value === "folder" ? null : "folder", ["stop"]))
            }, [...r[37] || (r[37] = [
              e("span", null, "移动/加入本地分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: Q(["gh-sub-flyout", { "flyout-left": fe.value }]),
              onClick: r[12] || (r[12] = le(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: Fe
              }, " 设为未分类 "),
              (t(!0), s(j, null, te(o(se).lists, (u) => (t(), s("button", {
                key: u.id,
                class: Q(["fo-cover-menu-item", { primary: o(mt)(K.repo.full_name).includes(u.name) }]),
                type: "button",
                onClick: (b) => Ne(u.name)
              }, a(o(mt)(K.repo.full_name).includes(u.name) ? "✓ " : "  ") + "📁 " + a(u.name), 11, Wo))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[14] || (r[14] = (u) => ce.value = null),
            onClick: r[15] || (r[15] = (u) => $e(K.repo))
          }, " 查看仓库详情 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[16] || (r[16] = (u) => ce.value = null),
            onClick: Ze
          }, " 复制仓库链接 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[17] || (r[17] = (u) => ce.value = null),
            onClick: qe
          }, " 复制克隆命令 (git clone) ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[18] || (r[18] = (u) => ce.value = null),
            onClick: Xe
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[19] || (r[19] = (u) => ce.value = null),
            onClick: g
          }, " 在 GitHub 打开 ", 32)
        ], 36)) : y("", !0),
        Y.visible && Y.list ? (t(), s("div", {
          key: 1,
          class: "fo-cover-context-menu gh-list-col-menu",
          style: ot({ left: `${Y.x}px`, top: `${Y.y}px` }),
          onClick: r[22] || (r[22] = le(() => {
          }, ["stop"])),
          onContextmenu: r[23] || (r[23] = le(() => {
          }, ["prevent"]))
        }, [
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: Ie
          }, " ➕ 创建子分类 "),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: De
          }, " ✏️ 重命名分组 "),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: Ue
          }, [
            e("span", null, a(Y.list?.pinned ? "📍 取消置顶" : "📌 置顶此分组"), 1)
          ]),
          e("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onClick: Oe
          }, " 🗑️ 删除分组 ")
        ], 36)) : y("", !0)
      ]))
    ]));
  }
}), Yo = /* @__PURE__ */ Ee(Vo, [["__scopeId", "data-v-5242b374"]]), Ko = { class: "star-wrap" }, Zo = ["disabled", "title", "aria-label"], Xo = {
  key: 0,
  class: "star-error",
  role: "status"
}, Qo = /* @__PURE__ */ xe({
  __name: "GitHubStarButton",
  props: {
    repo: {},
    alreadyStarred: { type: Boolean }
  },
  setup(_) {
    const i = _, l = G(!1), c = G(""), p = G(""), f = re(() => !!(i.alreadyStarred || oe.ownerKey && c.value === oe.ownerKey || Z.token && oe.repos.some((C) => C.full_name.toLowerCase() === i.repo.full_name.toLowerCase())));
    be(() => [oe.ownerKey, i.repo.full_name], () => {
      c.value = "", p.value = "";
    });
    async function T() {
      if (l.value || f.value) return;
      if (!Z.token) {
        p.value = "请先在 GitHub 账号设置中配置 Token。";
        return;
      }
      const C = oe.ownerKey;
      if (!C) {
        p.value = "GitHub 账号正在加载，请稍后再试。";
        return;
      }
      l.value = !0, p.value = "";
      try {
        const S = await Z.starRepository(i.repo, !0);
        if (C !== oe.ownerKey) return;
        S ? c.value = C : p.value = vt.actionText || "Star 未完成，请稍后重试。";
      } catch {
        C === oe.ownerKey && (p.value = "Star 结果未确认，请先刷新核对，勿重复提交。");
      } finally {
        l.value = !1;
      }
    }
    return (C, S) => (t(), s("span", Ko, [
      e("button", {
        type: "button",
        class: Q(["star-action", { starred: f.value }]),
        disabled: l.value || f.value,
        title: f.value ? "已 Star" : "点击 Star，未点击时状态可能尚未核对",
        "aria-label": f.value ? "已 Star" : `Star ${_.repo.full_name}`,
        onClick: le(T, ["stop"])
      }, a(l.value ? "…" : f.value ? "★" : "☆"), 11, Zo),
      p.value ? (t(), s("span", Xo, a(p.value), 1)) : y("", !0)
    ]));
  }
}), Ft = /* @__PURE__ */ Ee(Qo, [["__scopeId", "data-v-e3dd27c5"]]), Jo = { class: "gh-global-header" }, en = {
  key: 1,
  class: "gh-global-message",
  role: "status"
}, tn = {
  key: 2,
  class: "gh-global-message",
  role: "alert"
}, sn = { class: "gh-global-summary" }, an = { key: 0 }, on = {
  key: 0,
  class: "gh-global-message"
}, nn = {
  key: 1,
  class: "gh-global-grid"
}, ln = { class: "gh-global-card-head" }, rn = ["onClick"], un = { class: "gh-global-meta" }, cn = { key: 0 }, dn = {
  key: 2,
  class: "gh-global-pager"
}, pn = ["disabled"], hn = ["disabled"], wt = 20, gn = /* @__PURE__ */ xe({
  __name: "GitHubGlobalSearch",
  props: {
    query: {},
    requestId: {},
    rule: {},
    embedded: { type: Boolean }
  },
  emits: ["back"],
  setup(_, { emit: i }) {
    const l = _, c = i, p = G(l.query), f = G(""), T = G(1), C = G(0), S = G(!1), k = G([]), N = G(!1), $ = G("");
    let x;
    function D(J) {
      if (l.rule === "exact") return `"${J.replace(/"/g, "")}" in:name,description`;
      if (l.rule === "topic") return `topic:${J.replace(/\s+/g, "-")}`;
      if (l.rule === "smart") {
        const H = Vt[J.toLowerCase()] || [];
        if (H.length) return `${J} ${H.slice(0, 3).join(" OR ")}`;
      }
      return J;
    }
    async function A(J, H = 1) {
      const P = J.trim();
      if (!P) return;
      x?.abort();
      const O = new AbortController();
      x = O, p.value = P, f.value = P, T.value = H, k.value = [], C.value = 0, S.value = !1, $.value = "", N.value = !0;
      try {
        const V = await zt(O.signal), pe = new URLSearchParams({ q: D(P), sort: "stars", order: "desc", per_page: String(wt), page: String(H) }), { data: ue } = await ft(`/search/repositories?${pe}`, { headers: V, signal: O.signal, maxBytes: 2 * 1024 * 1024 });
        if (x !== O || O.signal.aborted) return;
        if (!Array.isArray(ue?.items)) throw new Error("GitHub 搜索响应格式异常");
        k.value = ue.items.filter((U) => typeof U?.full_name == "string" && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(U.full_name)), C.value = typeof ue.total_count == "number" ? Math.max(0, ue.total_count) : 0, S.value = ue.incomplete_results === !0;
      } catch (V) {
        if (x !== O || O.signal.aborted) return;
        $.value = V instanceof Wt || V instanceof Error ? V.message : "请稍后重试";
      } finally {
        x === O && (N.value = !1);
      }
    }
    function E(J) {
      yt.open(J.full_name, void 0, J);
    }
    return be(() => l.requestId, () => {
      A(l.query);
    }, { immediate: !0 }), Gt(() => {
      x?.abort();
    }), (J, H) => (t(), s("div", {
      class: Q(["gh-global-search", { "is-embedded": _.embedded }])
    }, [
      e("header", Jo, [
        H[6] || (H[6] = e("div", null, [
          e("h3", null, "GitHub 仓库搜索"),
          e("p", null, "在插件内查看公开仓库和 README")
        ], -1)),
        e("button", {
          type: "button",
          class: "gh-global-back",
          onClick: H[0] || (H[0] = (P) => c("back"))
        }, a(_.embedded ? "返回首页" : "返回收藏"), 1)
      ]),
      _.embedded ? y("", !0) : (t(), s("form", {
        key: 0,
        class: "gh-global-form",
        role: "search",
        onSubmit: H[2] || (H[2] = le((P) => A(p.value), ["prevent"]))
      }, [
        Re(e("input", {
          "onUpdate:modelValue": H[1] || (H[1] = (P) => p.value = P),
          type: "search",
          placeholder: "搜索 GitHub 仓库…",
          "aria-label": "搜索 GitHub 仓库"
        }, null, 512), [
          [Ke, p.value]
        ]),
        H[7] || (H[7] = e("button", { type: "submit" }, "搜索", -1))
      ], 32)),
      N.value ? (t(), s("p", en, "正在搜索 GitHub 仓库…")) : $.value ? (t(), s("div", tn, [
        e("p", null, "搜索失败：" + a($.value), 1),
        e("button", {
          type: "button",
          class: "gh-global-back",
          onClick: H[3] || (H[3] = (P) => A(f.value, T.value))
        }, "重试")
      ])) : (t(), s(j, { key: 3 }, [
        e("p", sn, [
          ae("“" + a(f.value) + "” · " + a(C.value.toLocaleString()) + " 个结果", 1),
          S.value ? (t(), s("span", an, " · GitHub 标记为不完整结果")) : y("", !0)
        ]),
        k.value.length ? (t(), s("div", nn, [
          (t(!0), s(j, null, te(k.value, (P) => (t(), s("article", {
            key: P.full_name,
            class: "gh-global-card"
          }, [
            e("div", ln, [
              e("button", {
                type: "button",
                class: "gh-global-repo",
                onClick: (O) => E(P)
              }, a(P.full_name), 9, rn),
              je(Ft, { repo: P }, null, 8, ["repo"])
            ]),
            e("p", null, a(P.description || "暂无描述"), 1),
            e("div", un, [
              P.language ? (t(), s("span", cn, a(P.language), 1)) : y("", !0),
              e("span", null, "★ " + a((P.stargazers_count || 0).toLocaleString()), 1),
              e("span", null, "⑂ " + a((P.forks_count || 0).toLocaleString()), 1)
            ])
          ]))), 128))
        ])) : (t(), s("p", on, "没有找到仓库，换个关键词试试。")),
        T.value > 1 || T.value * wt < Math.min(C.value, 1e3) ? (t(), s("div", dn, [
          e("button", {
            type: "button",
            disabled: T.value <= 1,
            onClick: H[4] || (H[4] = (P) => A(f.value, T.value - 1))
          }, "‹ 上一页", 8, pn),
          e("span", null, "第 " + a(T.value) + " 页", 1),
          e("button", {
            type: "button",
            disabled: T.value * wt >= Math.min(C.value, 1e3),
            onClick: H[5] || (H[5] = (P) => A(f.value, T.value + 1))
          }, "下一页 ›", 8, hn)
        ])) : y("", !0)
      ], 64))
    ], 2));
  }
}), It = /* @__PURE__ */ Ee(gn, [["__scopeId", "data-v-26667dd5"]]), fn = { class: "local-search" }, mn = {
  key: 0,
  class: "notice"
}, vn = {
  key: 1,
  class: "summary"
}, bn = {
  key: 2,
  class: "notice"
}, yn = {
  key: 3,
  class: "grid"
}, _n = { class: "repo-head" }, kn = ["onClick"], wn = { class: "meta" }, $n = { key: 0 }, Cn = {
  key: 4,
  class: "pager"
}, Sn = ["disabled"], Rn = ["disabled"], Gn = /* @__PURE__ */ xe({
  __name: "GitHubLocalSearch",
  emits: ["back"],
  setup(_, { emit: i }) {
    const l = i, c = G(1), p = re(() => (oe.repos, oe.repoListNames, oe.searchQuery, oe.activeSection, oe.loading, Z.getDashboardSearchResults())), f = re(() => p.value.slice((c.value - 1) * 20, c.value * 20)), T = re(() => Math.max(1, Math.ceil(p.value.length / 20)));
    return be(() => oe.searchQuery, () => {
      c.value = 1;
    }), be(T, (C) => {
      c.value > C && (c.value = C);
    }), (C, S) => (t(), s("div", fn, [
      e("header", null, [
        e("div", null, [
          S[3] || (S[3] = e("h3", null, "当前分类搜索", -1)),
          e("p", null, a(o(Z).active) + " · “" + a(o(oe).searchQuery) + "”", 1)
        ]),
        e("button", {
          type: "button",
          onClick: S[0] || (S[0] = (k) => l("back"))
        }, "返回首页")
      ]),
      o(vt).accountConfigured === !1 ? (t(), s("p", mn, "请先在账号设置中配置 GitHub 用户名，然后搜索已加载的 Star 仓库。")) : (t(), s("p", vn, a(o(oe).loading ? "正在读取 Star 仓库，结果可能尚未完整 · " : "") + a(p.value.length) + " 个结果", 1)),
      !p.value.length && o(vt).accountConfigured !== !1 ? (t(), s("p", bn, a(o(oe).loading ? "正在读取仓库…" : "当前分类没有匹配的仓库。"), 1)) : y("", !0),
      f.value.length ? (t(), s("div", yn, [
        (t(!0), s(j, null, te(f.value, (k) => (t(), s("article", {
          key: k.full_name,
          class: "repo-card"
        }, [
          e("div", _n, [
            e("button", {
              type: "button",
              class: "repo-name",
              onClick: (N) => o(yt).open(k.full_name, void 0, k)
            }, a(k.full_name), 9, kn),
            je(Ft, {
              repo: k,
              "already-starred": ""
            }, null, 8, ["repo"])
          ]),
          e("p", null, a(k.description || "暂无描述"), 1),
          e("div", wn, [
            k.language ? (t(), s("span", $n, a(k.language), 1)) : y("", !0),
            e("span", null, "★ " + a((k.stargazers_count || 0).toLocaleString()), 1),
            e("span", null, "⑂ " + a((k.forks_count || 0).toLocaleString()), 1)
          ])
        ]))), 128))
      ])) : y("", !0),
      T.value > 1 ? (t(), s("div", Cn, [
        e("button", {
          type: "button",
          disabled: c.value <= 1,
          onClick: S[1] || (S[1] = (k) => c.value--)
        }, "‹ 上一页", 8, Sn),
        e("span", null, a(c.value) + " / " + a(T.value), 1),
        e("button", {
          type: "button",
          disabled: c.value >= T.value,
          onClick: S[2] || (S[2] = (k) => c.value++)
        }, "下一页 ›", 8, Rn)
      ])) : y("", !0)
    ]));
  }
}), Mn = /* @__PURE__ */ Ee(Gn, [["__scopeId", "data-v-26ec6440"]]), Tn = { class: "gh-dashboard" }, An = { class: "dashboard-layout" }, Ln = { class: "dashboard-main" }, Dn = { class: "dashboard-search" }, Hn = { key: 0 }, xn = { class: "dashboard-home-content" }, En = { class: "dashboard-heading" }, In = { class: "heading-copy" }, Un = { class: "eyebrow-row" }, Nn = {
  key: 0,
  class: "user-pill"
}, Pn = ["disabled"], On = { class: "dashboard-composer" }, Fn = {
  class: "composer-prompts",
  "aria-label": "快捷提问"
}, Bn = ["onClick"], jn = { class: "composer-bottom" }, qn = { class: "composer-left" }, zn = { class: "repo-picker-anchor" }, Wn = ["aria-expanded"], Vn = {
  key: 0,
  class: "repo-picker"
}, Yn = { class: "repo-picker-head" }, Kn = ["disabled"], Zn = {
  key: 0,
  class: "repo-picker-hint"
}, Xn = {
  key: 1,
  class: "repo-picker-hint",
  role: "alert"
}, Qn = {
  key: 2,
  class: "repo-picker-hint"
}, Jn = { class: "repo-picker-list" }, el = ["onClick"], tl = {
  key: 0,
  class: "repo-picker-hint"
}, sl = { class: "model-picker-anchor" }, al = ["aria-expanded"], ol = {
  key: 0,
  class: "repo-picker model-picker"
}, nl = { class: "repo-picker-list" }, ll = ["onClick"], il = ["disabled"], rl = { class: "dashboard-section" }, ul = { class: "dashboard-list" }, cl = {
  key: 0,
  class: "skeleton-list",
  "aria-hidden": "true"
}, dl = {
  key: 1,
  class: "empty"
}, pl = ["onClick"], hl = { class: "row-copy" }, gl = {
  key: 2,
  class: "inline-error"
}, fl = { class: "dashboard-section" }, ml = { class: "section-heading" }, vl = ["href"], bl = { class: "dashboard-list" }, yl = {
  key: 0,
  class: "skeleton-list",
  "aria-hidden": "true"
}, _l = {
  key: 1,
  class: "empty"
}, kl = {
  key: 2,
  class: "inline-error"
}, wl = {
  key: 3,
  class: "empty"
}, $l = ["href"], Cl = { class: "row-copy" }, Sl = { class: "meta-pill" }, Rl = { class: "row-meta" }, Gl = { class: "dashboard-side" }, Ml = { class: "side-card" }, Tl = { class: "side-heading" }, Al = {
  key: 0,
  class: "skeleton-list compact",
  "aria-hidden": "true"
}, Ll = {
  key: 1,
  class: "side-empty"
}, Dl = {
  key: 2,
  class: "inline-error"
}, Hl = {
  key: 3,
  class: "side-empty"
}, xl = {
  key: 4,
  class: "repo-rows"
}, El = ["onClick"], Il = ["title"], Ul = { class: "repo-info" }, Nl = {
  key: 0,
  class: "repo-owner"
}, Pl = { class: "side-card quick-card" }, Ol = { class: "quick-links" }, Ut = "lw-gh-dashboard-cache-v1", Fl = 300 * 1e3, Bl = /* @__PURE__ */ xe({
  __name: "GitHubDashboard",
  props: {
    active: { type: Boolean },
    accountRevision: {},
    showResults: { type: Boolean }
  },
  emits: ["channel", "settings", "notifications"],
  setup(_, { emit: i }) {
    const l = _, c = i, p = G(""), f = G(""), T = G(!1), C = G(!1), S = G(""), k = G(""), N = G([]), $ = G(null), x = G(""), D = re(() => {
      const v = x.value.trim().toLowerCase();
      return v ? N.value.filter((d) => d.fullName.toLowerCase().includes(v)) : N.value;
    });
    let A;
    async function E() {
      A?.abort();
      const v = new AbortController();
      A = v, C.value = !0, S.value = "", k.value = "";
      try {
        const d = await es(v.signal);
        if (A !== v || v.signal.aborted) return;
        N.value = d.repos, k.value = d.warning;
      } catch (d) {
        A === v && !v.signal.aborted && (S.value = d instanceof Error ? d.message : "仓库读取失败。");
      } finally {
        A === v && (C.value = !1);
      }
    }
    function J() {
      T.value = !T.value, T.value && !N.value.length && !C.value && E();
    }
    function H(v) {
      $.value = v, T.value = !1, x.value = "";
    }
    be(() => l.accountRevision, () => {
      A?.abort(), A = void 0, N.value = [], $.value = null, C.value = !1, T.value = !1;
    });
    const P = G([]), O = G([]), V = G([]), pe = G(!1), ue = G(!1), U = G(""), q = G(""), X = G(""), ne = G(""), Y = G(null), K = G(!1);
    let ce, fe = 0;
    const de = G(!1), ie = G([]), we = G(""), ye = re(
      () => ie.value.find((v) => v.key === we.value) || ie.value[0] || null
    );
    async function Te() {
      const [v, d] = await Promise.allSettled([ts(), ss()]), R = [];
      if (v.status === "fulfilled" && v.value.configured) {
        const ve = v.value, Me = ve.models.length ? ve.models : ve.model ? [ve.model] : [];
        for (const $e of Me)
          R.push({
            key: `deepseek:${$e}`,
            label: $e,
            provider: ve.label || "AI 模型",
            target: { service: "deepseek", model: $e }
          });
      }
      const _e = d.status === "fulfilled" ? d.value : null, me = _e?.selectedAgentId || "pi", he = _e?.piModel || "";
      R.push({
        key: `native:${me}:${he}`,
        label: he ? he.includes("/") ? he.split("/").slice(1).join("/") : he : "本地 Agent",
        provider: me === "pi" ? "Pi 本地" : me,
        target: { service: "native", nativeAgentId: me, model: he }
      }), ie.value = R, R.some((ve) => ve.key === we.value) || (we.value = R[0]?.key || "");
    }
    function Ie() {
      T.value = !1, de.value = !de.value, de.value && Te();
    }
    function De(v) {
      we.value = v.key, de.value = !1;
    }
    function Ue(v) {
      const d = v.target;
      d?.closest(".repo-picker-anchor") || (T.value = !1), d?.closest(".model-picker-anchor") || (de.value = !1);
    }
    ht(() => {
      document.addEventListener("pointerdown", Ue), Te();
    });
    const Oe = re(() => {
      const v = (/* @__PURE__ */ new Date()).getHours();
      return v < 6 ? "夜深了" : v < 11 ? "早上好" : v < 14 ? "中午好" : v < 18 ? "下午好" : "晚上好";
    });
    function Ae(v) {
      if (!v) return "";
      const d = new Date(v).getTime();
      if (!Number.isFinite(d)) return "";
      const R = Math.max(0, Math.floor((Date.now() - d) / 6e4));
      return R < 60 ? R < 1 ? "刚刚" : `${R} 分钟前` : R < 1440 ? `${Math.floor(R / 60)} 小时前` : R < 43200 ? `${Math.floor(R / 1440)} 天前` : new Date(d).toLocaleDateString();
    }
    const Le = (v) => v instanceof Error ? v.message : "读取失败，请稍后重试。";
    function Ge(v) {
      return typeof v?.full_name == "string" && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(v.full_name);
    }
    function B(v) {
      try {
        const d = new URL(String(v));
        return d.protocol === "https:" && d.hostname === "github.com" && /^\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/pull\/\d+\/?$/.test(d.pathname) ? d.href : "";
      } catch {
        return "";
      }
    }
    function w() {
      try {
        const v = localStorage.getItem(Ut);
        if (!v) return null;
        const d = JSON.parse(v);
        return !d || typeof d.username != "string" || !Array.isArray(d.repos) || !Array.isArray(d.pulls) ? null : {
          username: d.username,
          repos: d.repos.filter(Ge).slice(0, 6),
          pulls: d.pulls.filter((R) => R && typeof R.title == "string" && B(R.html_url)).slice(0, 5),
          cachedAt: Number(d.cachedAt) || 0
        };
      } catch {
        return null;
      }
    }
    function z(v) {
      try {
        localStorage.setItem(Ut, JSON.stringify(v));
      } catch {
      }
    }
    async function ke(v = !1) {
      if (!v && Y.value === l.accountRevision) return;
      ce?.abort();
      const d = new AbortController();
      ce = d;
      const R = ++fe, _e = l.accountRevision, me = () => l.active && R === fe && !d.signal.aborted;
      K.value = !0;
      const he = w(), ve = !!(he && he.username);
      if (ve && he && !v ? (p.value = he.username, P.value = he.repos, O.value = he.pulls, U.value = "", q.value = "", X.value = "") : (v || Y.value === null || Y.value !== _e) && (p.value = "", P.value = [], O.value = [], V.value = [], U.value = "", q.value = "", X.value = "", ne.value = ""), pe.value = !ve || v, ue.value = !V.value.length, Te(), (async () => {
        try {
          const Me = await as();
          if (!me()) return;
          const $e = Me.map((ge) => ({
            kind: "deepseek",
            id: ge.id,
            title: ge.title || "未命名对话",
            updated: Number(ge.updatedAt) || 0,
            model: ge.model
          }));
          V.value = $e.sort((ge, lt) => lt.updated - ge.updated).slice(0, 4);
        } catch {
          me() && (ne.value = "DeepSeek 本机会话读取失败");
        } finally {
          me() && (ue.value = !1);
        }
      })(), !v && ve && he && Date.now() - he.cachedAt < Fl) {
        Y.value = _e, K.value = !1, pe.value = !1;
        return;
      }
      try {
        const Me = await Mt();
        if (!me()) return;
        const $e = nt(Me.ghToken);
        let ge = Me.ghUser.trim();
        if (!ge && Me.ghToken) {
          const n = await ft("/user", { headers: $e, signal: d.signal, maxBytes: 131072 });
          ge = typeof n.data?.login == "string" ? n.data.login : "";
        }
        if (!me()) return;
        if (!ge) {
          U.value = "配置 GitHub 用户名后即可查看仓库和 Pull Request。", Y.value = _e;
          return;
        }
        if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(ge)) throw new Error("GitHub 用户名格式无效，请检查设置。");
        p.value = ge;
        const lt = new URLSearchParams({ q: `is:pr is:open author:${ge}`, sort: "updated", order: "desc", per_page: "5" }), [Be, Pe] = await Promise.allSettled([
          ft(`/users/${encodeURIComponent(ge)}/repos?type=owner&sort=updated&per_page=6`, { headers: $e, signal: d.signal, maxBytes: 1024 * 1024 }),
          ft(`/search/issues?${lt}`, { headers: $e, signal: d.signal, maxBytes: 1024 * 1024 })
        ]);
        if (!me()) return;
        Be.status === "fulfilled" && Array.isArray(Be.value.data) ? P.value = Be.value.data.filter(Ge).slice(0, 6) : ve || (q.value = Be.status === "rejected" ? Le(Be.reason) : "仓库响应格式异常。"), Pe.status === "fulfilled" && Array.isArray(Pe.value.data?.items) ? O.value = Pe.value.data.items.filter((n) => n && typeof n.title == "string" && B(n.html_url)).slice(0, 5) : ve || (X.value = Pe.status === "rejected" ? Le(Pe.reason) : "Pull Request 响应格式异常。"), (Be.status === "fulfilled" || Pe.status === "fulfilled") && z({
          username: ge,
          repos: P.value,
          pulls: O.value,
          cachedAt: Date.now()
        }), Y.value = _e;
      } catch (Me) {
        me() && (U.value = Le(Me));
      } finally {
        R === fe && (K.value = !1, pe.value = !1, ue.value = !1);
      }
    }
    be(() => [l.active, l.accountRevision], ([v, d]) => {
      v ? Y.value !== d && ke() : K.value && (++fe, ce?.abort(), K.value = !1);
    }, { immediate: !0 }), Gt(() => {
      document.removeEventListener("pointerdown", Ue), ++fe, ce?.abort(), A?.abort();
    });
    function Fe() {
      if (!f.value.trim()) return;
      const v = $.value, d = v ? { kind: "github", id: v.fullName, title: v.fullName, url: `https://github.com/${v.fullName}`, description: v.description, language: v.language, visibility: v.isPrivate ? "private" : "public" } : void 0;
      os(f.value.trim(), d, ye.value?.target), kt("multica");
    }
    function Ne(v) {
      ns("deepseek", v.id), kt("multica");
    }
    function Ze() {
      kt("multica");
    }
    function qe(v) {
      const d = B(v.html_url);
      return d ? new URL(d).pathname.split("/").slice(1, 3).join("/") : "";
    }
    const Xe = [
      "总结这个仓库的核心架构",
      "帮我起草一个 PR 描述",
      "排查最近的构建或类型报错",
      "梳理下一步优化清单"
    ];
    function g(v) {
      const d = f.value.trim();
      f.value = d ? `${d}
${v}` : v;
    }
    function h(v) {
      const d = v.indexOf("/");
      return d === -1 ? { owner: "", name: v } : { owner: v.slice(0, d), name: v.slice(d + 1) };
    }
    const m = {
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      Vue: "#41b883",
      Python: "#3572a5",
      Go: "#00add8",
      Rust: "#dea584",
      Java: "#b07219",
      "C++": "#f34b7d",
      C: "#555555",
      "C#": "#178600",
      HTML: "#e34c26",
      CSS: "#563d7c",
      SCSS: "#c6538c",
      Shell: "#89e051",
      Swift: "#f05138",
      Kotlin: "#a97bff",
      Dart: "#00b4ab"
    };
    function M(v) {
      return v && m[v] || "#94a3b8";
    }
    return (v, d) => (t(), s("div", Tn, [
      e("div", An, [
        e("main", Ln, [
          e("div", Dn, [
            At(v.$slots, "search", {}, void 0, !0)
          ]),
          _.showResults ? (t(), s("div", Hn, [
            At(v.$slots, "results", {}, void 0, !0)
          ])) : y("", !0),
          Re(e("div", xn, [
            e("div", En, [
              e("div", In, [
                e("div", Un, [
                  d[10] || (d[10] = e("span", { class: "eyebrow" }, "GITHUB WORKSPACE", -1)),
                  p.value ? (t(), s("span", Nn, [
                    d[9] || (d[9] = e("i", {
                      class: "user-pill-dot",
                      "aria-hidden": "true"
                    }, null, -1)),
                    ae(" @" + a(p.value), 1)
                  ])) : y("", !0)
                ]),
                e("h2", null, [
                  ae(a(Oe.value), 1),
                  p.value ? (t(), s(j, { key: 0 }, [
                    ae("，" + a(p.value), 1)
                  ], 64)) : y("", !0),
                  d[11] || (d[11] = ae("。", -1))
                ])
              ]),
              e("button", {
                type: "button",
                class: "refresh-btn",
                disabled: pe.value,
                title: "刷新 GitHub 数据",
                onClick: d[0] || (d[0] = (R) => ke(!0))
              }, " ↻ " + a(pe.value ? "刷新中" : "刷新"), 9, Pn)
            ]),
            e("div", On, [
              Re(e("textarea", {
                "onUpdate:modelValue": d[1] || (d[1] = (R) => f.value = R),
                placeholder: "有什么想法？输入问题或选择仓库，在 AI 工作区继续探索…",
                "aria-label": "发送到 AI 工作区的草稿",
                maxlength: "100000"
              }, null, 512), [
                [Ke, f.value]
              ]),
              e("div", Fn, [
                (t(), s(j, null, te(Xe, (R) => e("button", {
                  key: R,
                  type: "button",
                  class: "prompt-chip",
                  onClick: (_e) => g(R)
                }, " + " + a(R), 9, Bn)), 64))
              ]),
              e("div", jn, [
                e("div", qn, [
                  e("div", zn, [
                    e("button", {
                      type: "button",
                      class: Q(["repo-picker-toggle", { selected: !!$.value }]),
                      "aria-expanded": T.value,
                      onClick: J
                    }, [
                      d[12] || (d[12] = e("svg", {
                        viewBox: "0 0 16 16",
                        "aria-hidden": "true"
                      }, [
                        e("path", {
                          fill: "currentColor",
                          d: "M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"
                        })
                      ], -1)),
                      e("span", null, a($.value ? $.value.fullName : "选择仓库"), 1),
                      d[13] || (d[13] = e("span", { class: "caret" }, "▾", -1))
                    ], 10, Wn),
                    T.value ? (t(), s("div", Vn, [
                      e("div", Yn, [
                        d[14] || (d[14] = e("strong", null, "选择我的仓库", -1)),
                        e("button", {
                          type: "button",
                          title: "刷新仓库",
                          disabled: C.value,
                          onClick: E
                        }, "↻", 8, Kn)
                      ]),
                      Re(e("input", {
                        "onUpdate:modelValue": d[2] || (d[2] = (R) => x.value = R),
                        placeholder: "搜索仓库名称…",
                        "aria-label": "搜索我的仓库"
                      }, null, 512), [
                        [Ke, x.value]
                      ]),
                      C.value ? (t(), s("p", Zn, "正在读取仓库…")) : S.value ? (t(), s("p", Xn, [
                        ae(a(S.value) + " ", 1),
                        e("button", {
                          type: "button",
                          onClick: E
                        }, "重试")
                      ])) : y("", !0),
                      k.value ? (t(), s("p", Qn, a(k.value), 1)) : y("", !0),
                      e("div", Jn, [
                        (t(!0), s(j, null, te(D.value, (R) => (t(), s("button", {
                          key: R.fullName,
                          type: "button",
                          onClick: (_e) => H(R)
                        }, [
                          e("span", null, a(R.fullName), 1),
                          e("small", null, a(R.isPrivate ? "私有" : "公开"), 1)
                        ], 8, el))), 128)),
                        !C.value && !S.value && !D.value.length ? (t(), s("p", tl, "没有找到仓库。")) : y("", !0)
                      ]),
                      $.value ? (t(), s("button", {
                        key: 3,
                        type: "button",
                        class: "repo-picker-clear",
                        onClick: d[3] || (d[3] = (R) => {
                          $.value = null, T.value = !1;
                        })
                      }, "不选择仓库")) : y("", !0),
                      d[15] || (d[15] = e("p", { class: "repo-picker-hint" }, "仅附带仓库链接与简介；发送时会共享所选信息，README 需手动读取。", -1))
                    ])) : y("", !0)
                  ]),
                  e("div", sl, [
                    e("button", {
                      type: "button",
                      class: "repo-picker-toggle model-toggle",
                      "aria-expanded": de.value,
                      onClick: Ie
                    }, [
                      d[16] || (d[16] = e("svg", {
                        viewBox: "0 0 16 16",
                        "aria-hidden": "true"
                      }, [
                        e("path", {
                          fill: "currentColor",
                          d: "M8 1.2l1.65 4.15L13.8 7l-4.15 1.65L8 12.8 6.35 8.65 2.2 7l4.15-1.65L8 1.2Z"
                        })
                      ], -1)),
                      e("span", null, a(ye.value ? ye.value.label : "选择模型"), 1),
                      d[17] || (d[17] = e("span", { class: "caret" }, "▾", -1))
                    ], 8, al),
                    de.value ? (t(), s("div", ol, [
                      e("div", { class: "repo-picker-head" }, [
                        d[18] || (d[18] = e("strong", null, "选择 AI 模型（同步 Agent / AI 设置）", -1)),
                        e("button", {
                          type: "button",
                          title: "刷新模型列表",
                          onClick: Te
                        }, "↻")
                      ]),
                      e("div", nl, [
                        (t(!0), s(j, null, te(ie.value, (R) => (t(), s("button", {
                          key: R.key,
                          type: "button",
                          class: Q({ chosen: ye.value?.key === R.key }),
                          onClick: (_e) => De(R)
                        }, [
                          e("span", null, a(R.label), 1),
                          e("small", null, a(R.provider), 1)
                        ], 10, ll))), 128))
                      ]),
                      d[19] || (d[19] = e("p", { class: "repo-picker-hint" }, "模型列表读取自 AI 工作区 / 数字员工同一套配置，跳转后不会自动发送。", -1))
                    ])) : y("", !0)
                  ]),
                  d[20] || (d[20] = e("span", { class: "ai-safe-tag" }, [
                    e("small", null, "· 不会自动发送")
                  ], -1))
                ]),
                e("button", {
                  type: "button",
                  class: "composer-submit",
                  disabled: !f.value.trim(),
                  onClick: Fe
                }, [...d[21] || (d[21] = [
                  ae(" 继续到 AI 工作区 ", -1),
                  e("span", null, "↗", -1)
                ])], 8, il)
              ])
            ]),
            e("section", rl, [
              e("div", { class: "section-heading" }, [
                d[23] || (d[23] = e("div", null, [
                  e("h3", null, "最近会话"),
                  e("small", null, "DeepSeek 本机记录")
                ], -1)),
                e("button", {
                  type: "button",
                  onClick: Ze
                }, [...d[22] || (d[22] = [
                  ae("查看全部 ", -1),
                  e("span", null, "→", -1)
                ])])
              ]),
              e("div", ul, [
                ue.value ? (t(), s("div", cl, [...d[24] || (d[24] = [
                  ze('<div class="skeleton-row" data-v-478fefc7><i class="sk-dot" data-v-478fefc7></i><div class="sk-lines" data-v-478fefc7><span class="sk-line w-60" data-v-478fefc7></span><span class="sk-line w-35" data-v-478fefc7></span></div></div><div class="skeleton-row" data-v-478fefc7><i class="sk-dot" data-v-478fefc7></i><div class="sk-lines" data-v-478fefc7><span class="sk-line w-48" data-v-478fefc7></span><span class="sk-line w-30" data-v-478fefc7></span></div></div>', 2)
                ])])) : V.value.length ? y("", !0) : (t(), s("p", dl, "暂无可显示的会话，打开 AI 工作区开始对话。")),
                (t(!0), s(j, null, te(V.value, (R) => (t(), s("button", {
                  key: `${R.kind}:${R.id}`,
                  type: "button",
                  class: "list-row",
                  onClick: (_e) => Ne(R)
                }, [
                  d[26] || (d[26] = e("span", { class: "row-badge session" }, [
                    e("svg", {
                      viewBox: "0 0 16 16",
                      "aria-hidden": "true"
                    }, [
                      e("path", {
                        fill: "currentColor",
                        d: "M2.75 2h10.5c.966 0 1.75.784 1.75 1.75v6.5A1.75 1.75 0 0 1 13.25 12H6.81l-2.93 2.56A.5.5 0 0 1 3 14.18V12h-.25A1.75 1.75 0 0 1 1 10.25v-6.5C1 2.784 1.784 2 2.75 2Z"
                      })
                    ])
                  ], -1)),
                  e("span", hl, [
                    e("strong", null, a(R.title), 1),
                    e("small", null, [
                      d[25] || (d[25] = e("span", { class: "meta-pill" }, "DeepSeek", -1)),
                      e("span", null, a(R.model), 1),
                      R.updated ? (t(), s(j, { key: 0 }, [
                        ae(" · " + a(Ae(R.updated)), 1)
                      ], 64)) : y("", !0)
                    ])
                  ]),
                  d[27] || (d[27] = e("span", { class: "row-arrow" }, "↗", -1))
                ], 8, pl))), 128)),
                ne.value ? (t(), s("p", gl, a(ne.value), 1)) : y("", !0)
              ])
            ]),
            e("section", fl, [
              e("div", ml, [
                d[28] || (d[28] = e("div", null, [
                  e("h3", null, "Pull requests"),
                  e("small", null, "由你创建、尚未关闭")
                ], -1)),
                p.value ? (t(), s("a", {
                  key: 0,
                  href: `https://github.com/pulls?q=${encodeURIComponent(`is:pr is:open author:${p.value}`)}`,
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, "查看全部 ↗", 8, vl)) : y("", !0)
              ]),
              e("div", bl, [
                pe.value ? (t(), s("div", yl, [...d[29] || (d[29] = [
                  ze('<div class="skeleton-row" data-v-478fefc7><i class="sk-dot" data-v-478fefc7></i><div class="sk-lines" data-v-478fefc7><span class="sk-line w-65" data-v-478fefc7></span><span class="sk-line w-40" data-v-478fefc7></span></div></div><div class="skeleton-row" data-v-478fefc7><i class="sk-dot" data-v-478fefc7></i><div class="sk-lines" data-v-478fefc7><span class="sk-line w-52" data-v-478fefc7></span><span class="sk-line w-32" data-v-478fefc7></span></div></div>', 2)
                ])])) : U.value ? (t(), s("p", _l, a(U.value), 1)) : X.value ? (t(), s("p", kl, a(X.value), 1)) : O.value.length ? y("", !0) : (t(), s("p", wl, "没有找到未关闭的 Pull Request。")),
                (t(!0), s(j, null, te(O.value, (R) => (t(), s("a", {
                  key: R.html_url,
                  class: "list-row",
                  href: B(R.html_url),
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, [
                  d[30] || (d[30] = e("span", { class: "row-badge pull" }, [
                    e("svg", {
                      viewBox: "0 0 16 16",
                      "aria-hidden": "true"
                    }, [
                      e("path", {
                        fill: "currentColor",
                        d: "M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"
                      })
                    ])
                  ], -1)),
                  e("span", Cl, [
                    e("strong", null, a(R.title), 1),
                    e("small", null, [
                      e("span", Sl, a(qe(R)), 1),
                      e("span", null, "#" + a(R.number), 1),
                      R.updated_at ? (t(), s(j, { key: 0 }, [
                        ae(" · 更新于 " + a(Ae(R.updated_at)), 1)
                      ], 64)) : y("", !0)
                    ])
                  ]),
                  e("span", Rl, a(R.comments || 0) + " 条评论 ↗", 1)
                ], 8, $l))), 128))
              ])
            ])
          ], 512), [
            [at, !_.showResults]
          ])
        ]),
        e("aside", Gl, [
          e("section", Ml, [
            e("div", Tl, [
              d[31] || (d[31] = e("div", null, [
                e("h3", null, "最近更新的仓库"),
                e("small", null, "GitHub 公开仓库")
              ], -1)),
              e("button", {
                type: "button",
                onClick: d[4] || (d[4] = (R) => c("channel", "repos"))
              }, "全部 →")
            ]),
            pe.value ? (t(), s("div", Al, [...d[32] || (d[32] = [
              ze('<div class="skeleton-row" data-v-478fefc7><i class="sk-dot sm" data-v-478fefc7></i><div class="sk-lines" data-v-478fefc7><span class="sk-line w-70" data-v-478fefc7></span><span class="sk-line w-45" data-v-478fefc7></span></div></div><div class="skeleton-row" data-v-478fefc7><i class="sk-dot sm" data-v-478fefc7></i><div class="sk-lines" data-v-478fefc7><span class="sk-line w-60" data-v-478fefc7></span><span class="sk-line w-40" data-v-478fefc7></span></div></div><div class="skeleton-row" data-v-478fefc7><i class="sk-dot sm" data-v-478fefc7></i><div class="sk-lines" data-v-478fefc7><span class="sk-line w-65" data-v-478fefc7></span><span class="sk-line w-35" data-v-478fefc7></span></div></div>', 3)
            ])])) : U.value ? (t(), s("p", Ll, a(U.value), 1)) : q.value ? (t(), s("p", Dl, a(q.value), 1)) : P.value.length ? (t(), s("div", xl, [
              (t(!0), s(j, null, te(P.value, (R) => (t(), s("button", {
                key: R.full_name,
                type: "button",
                class: "repo-row",
                onClick: (_e) => o(yt).open(R.full_name, void 0, R)
              }, [
                e("span", {
                  class: "repo-lang-dot",
                  style: ot({ background: M(R.language) }),
                  title: R.language || "仓库"
                }, null, 12, Il),
                e("span", Ul, [
                  e("strong", null, [
                    h(R.full_name).owner ? (t(), s("span", Nl, a(h(R.full_name).owner) + "/", 1)) : y("", !0),
                    ae(a(h(R.full_name).name), 1)
                  ]),
                  e("small", null, [
                    ae(a(R.language || "仓库") + " ", 1),
                    R.stargazers_count ? (t(), s(j, { key: 0 }, [
                      ae(" · ★ " + a(R.stargazers_count), 1)
                    ], 64)) : y("", !0),
                    R.updated_at ? (t(), s(j, { key: 1 }, [
                      ae(" · " + a(Ae(R.updated_at)), 1)
                    ], 64)) : y("", !0)
                  ])
                ])
              ], 8, El))), 128))
            ])) : (t(), s("p", Hl, "暂无公开仓库。"))
          ]),
          e("section", Pl, [
            d[37] || (d[37] = e("div", { class: "side-heading" }, [
              e("div", null, [
                e("h3", null, "快捷入口"),
                e("small", null, "你的 GitHub 工作台")
              ])
            ], -1)),
            e("div", Ol, [
              e("button", {
                type: "button",
                onClick: d[5] || (d[5] = (R) => c("channel", "stars"))
              }, [...d[33] || (d[33] = [
                ze('<span class="quick-left" data-v-478fefc7><i class="quick-icon star" data-v-478fefc7><svg viewBox="0 0 16 16" aria-hidden="true" data-v-478fefc7><path fill="currentColor" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" data-v-478fefc7></path></svg></i> Star 收藏 </span><span class="quick-arrow" data-v-478fefc7>→</span>', 2)
              ])]),
              e("button", {
                type: "button",
                onClick: d[6] || (d[6] = (R) => c("channel", "trending"))
              }, [...d[34] || (d[34] = [
                ze('<span class="quick-left" data-v-478fefc7><i class="quick-icon trending" data-v-478fefc7><svg viewBox="0 0 16 16" aria-hidden="true" data-v-478fefc7><path fill="currentColor" d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" data-v-478fefc7></path></svg></i> 开源发现 </span><span class="quick-arrow" data-v-478fefc7>→</span>', 2)
              ])]),
              e("button", {
                type: "button",
                onClick: d[7] || (d[7] = (R) => c("notifications"))
              }, [...d[35] || (d[35] = [
                ze('<span class="quick-left" data-v-478fefc7><i class="quick-icon notify" data-v-478fefc7><svg viewBox="0 0 16 16" aria-hidden="true" data-v-478fefc7><path fill="currentColor" d="M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16ZM3 5a5 5 0 0 1 10 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.519 1.519 0 0 1 13.482 13H2.518a1.519 1.519 0 0 1-1.263-2.36l1.703-2.554A.255.255 0 0 0 3 7.947V5Z" data-v-478fefc7></path></svg></i> GitHub 通知 </span><span class="quick-arrow" data-v-478fefc7>→</span>', 2)
              ])]),
              e("button", {
                type: "button",
                onClick: d[8] || (d[8] = (R) => c("settings", R.currentTarget))
              }, [...d[36] || (d[36] = [
                ze('<span class="quick-left" data-v-478fefc7><i class="quick-icon settings" data-v-478fefc7><svg viewBox="0 0 16 16" aria-hidden="true" data-v-478fefc7><path fill="currentColor" d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.162 1.4l.164.716a.25.25 0 0 0 .353.17l.657-.329c.688-.344 1.5-.195 2.02.371.482.523.597 1.31.287 1.948l-.33.658a.25.25 0 0 0 .171.353l.716.164c.755.172 1.305.718 1.369 1.461a8.2 8.2 0 0 1 0 1.402c-.064.743-.614 1.289-1.369 1.461l-.716.164a.25.25 0 0 0-.171.353l.33.658c.31.638.195 1.425-.287 1.948-.52.566-1.332.715-2.02.371l-.657-.329a.25.25 0 0 0-.353.17l-.164.716c-.172.755-.718 1.305-1.461 1.369a8.2 8.2 0 0 1-1.402 0c-.743-.064-1.289-.614-1.461-1.369l-.164-.716a.25.25 0 0 0-.353-.17l-.657.329c-.688.344-1.5.195-2.02-.371-.482-.523-.597-1.31-.287-1.948l.33-.658a.25.25 0 0 0-.171-.353l-.716-.164C.645 9.99.095 9.444.031 8.701a8.2 8.2 0 0 1 0-1.402C.095 6.556.645 6.01 1.4 5.838l.716-.164a.25.25 0 0 0 .17-.353l-.33-.658c-.31-.638-.195-1.425.287-1.948.52-.566 1.332-.715 2.02-.371l.657.329a.25.25 0 0 0 .353-.17l.164-.716C6.01.645 6.556.095 7.299.031A8.2 8.2 0 0 1 8 0ZM5.5 8a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z" data-v-478fefc7></path></svg></i> 账号设置 </span><span class="quick-arrow" data-v-478fefc7>→</span>', 2)
              ])])
            ])
          ])
        ])
      ])
    ]));
  }
}), jl = /* @__PURE__ */ Ee(Bl, [["__scopeId", "data-v-478fefc7"]]);
function ql(_) {
  const i = _.subject?.url, l = _.repository?.html_url || "https://github.com";
  if (!i) return l;
  const c = _.subject?.type;
  return c === "Issue" ? i.replace("https://api.github.com/repos/", "https://github.com/") : c === "PullRequest" ? i.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : c === "Release" ? i.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : i.replace("https://api.github.com/repos/", "https://github.com/");
}
function zl(_) {
  try {
    const i = Date.now() - new Date(_).getTime();
    if (i < 6e4) return "刚刚";
    const l = Math.floor(i / 6e4);
    if (l < 60) return `${l} 分钟前`;
    const c = Math.floor(l / 60);
    if (c < 24) return `${c} 小时前`;
    const p = Math.floor(c / 24);
    return p < 30 ? `${p} 天前` : _.slice(5, 10);
  } catch {
    return "";
  }
}
const W = Ye({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), We = {
  open() {
    W.isOpen = !0, (!W.items.length || Date.now() - W.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    W.isOpen = !1;
  },
  toggle() {
    W.isOpen ? this.close() : this.open();
  },
  setTab(_) {
    W.activeKind = _;
  },
  async refresh() {
    const _ = Z.token?.trim();
    if (!_) {
      W.items = [], W.unreadCount = 0, W.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    W.loading = !0, W.error = "";
    try {
      const i = {
        ...nt(_),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, l = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: i
      });
      if (!l.ok)
        throw l.status === 401 ? new Error("GitHub Token 无效或已过期") : l.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${l.status})`);
      const c = await l.json();
      if (!Array.isArray(c))
        throw new Error("GitHub 返回数据异常");
      const p = c.map((f) => ({
        id: String(f.id),
        unread: !!f.unread,
        reason: String(f.reason || ""),
        updatedAt: f.updated_at,
        formattedTime: zl(f.updated_at),
        subject: {
          title: String(f.subject?.title || "未命名通知"),
          url: String(f.subject?.url || ""),
          type: String(f.subject?.type || "Issue"),
          latestCommentUrl: f.subject?.latest_comment_url
        },
        repository: {
          id: Number(f.repository?.id || 0),
          name: String(f.repository?.name || ""),
          fullName: String(f.repository?.full_name || ""),
          owner: {
            login: String(f.repository?.owner?.login || ""),
            avatarUrl: f.repository?.owner?.avatar_url
          },
          htmlUrl: String(f.repository?.html_url || "")
        },
        url: String(f.url || ""),
        htmlUrl: ql(f)
      }));
      W.items = p, W.unreadCount = p.filter((f) => f.unread).length, W.lastFetchedAt = Date.now();
    } catch (i) {
      console.warn("[GitHubNotifications] 读取失败:", i), W.error = i?.message || "网络请求异常";
    } finally {
      W.loading = !1;
    }
  },
  openTarget(_) {
    typeof window < "u" && window.open(_.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, L = Ye({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function dt(_) {
  try {
    const i = Date.now() - new Date(_).getTime(), l = Math.floor(i / 6e4);
    if (l < 1) return "刚刚";
    if (l < 60) return `${l}分钟前`;
    const c = Math.floor(l / 60);
    if (c < 24) return `${c}小时前`;
    const p = Math.floor(c / 24);
    if (p < 30) return `${p}天前`;
    const f = new Date(_);
    return `${f.getFullYear()}/${f.getMonth() + 1}/${f.getDate()}`;
  } catch {
    return "";
  }
}
function pt(_) {
  switch (_) {
    case "OWNER":
      return "所有者";
    case "MEMBER":
      return "成员";
    case "COLLABORATOR":
      return "维护者";
    case "CONTRIBUTOR":
      return "贡献者";
    case "FIRST_TIME_CONTRIBUTOR":
      return "初次贡献";
    case "FIRST_TIMER":
      return "新人";
    case "AUTHOR":
      return "作者";
    default:
      return "";
  }
}
function Wl(_) {
  return _ ? {
    ":triangular_flag_on_post:": "🚩",
    ":speech_balloon:": "💬",
    ":bulb:": "💡",
    ":mega:": "📢",
    ":sparkles:": "✨",
    ":books:": "📚",
    ":tada:": "🎉",
    ":pray:": "🙏",
    ":question:": "❓",
    ":hammer:": "🔨",
    ":zap:": "⚡",
    ":fire:": "🔥",
    ":heart:": "❤️",
    ":rocket:": "🚀",
    ":eyes:": "👀"
  }[_] || (_.startsWith(":") && _.endsWith(":") ? _.slice(1, -1) : _) : "";
}
function $t(_) {
  if (!Array.isArray(_)) return [];
  const i = {
    THUMBS_UP: "👍",
    THUMBS_DOWN: "👎",
    LAUGH: "😄",
    HOORAY: "🎉",
    CONFUSED: "😕",
    HEART: "❤️",
    ROCKET: "🚀",
    EYES: "👀"
  };
  return _.map((l) => ({
    emoji: i[l.content] || l.content,
    count: l.reactors?.totalCount || l.users?.totalCount || 0
  })).filter((l) => l.count > 0);
}
function Nt(_) {
  if (!_ || typeof _ != "object") return [];
  const i = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, l = [];
  for (const [c, p] of Object.entries(i)) {
    const f = Number(_[c] || 0);
    f > 0 && l.push({ emoji: p, count: f });
  }
  return l;
}
async function Pt(_, i) {
  if (!_) return "";
  try {
    const l = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...nt(i),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: _, mode: "gfm" })
    });
    if (l.ok)
      return await l.text();
  } catch {
  }
  return Ve.renderMarkdown(_);
}
async function Vl(_, i, l, c) {
  const p = `
    query($owner: String!, $name: String!, $num: Int!) {
      repository(owner: $owner, name: $name) {
        discussion(number: $num) {
          title
          body
          bodyHTML
          author { login avatarUrl }
          authorAssociation
          createdAt
          url
          category {
            name
            emoji
          }
          reactionGroups {
            content
            reactors {
              totalCount
            }
          }
          comments(first: 30) {
            totalCount
            nodes {
              id
              body
              bodyHTML
              createdAt
              author { login avatarUrl }
              authorAssociation
              reactionGroups {
                content
                reactors {
                  totalCount
                }
              }
              replies(first: 30) {
                totalCount
                nodes {
                  id
                  body
                  bodyHTML
                  createdAt
                  author { login avatarUrl }
                  authorAssociation
                  reactionGroups {
                    content
                    reactors {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    const f = await fetch("https://api.github.com/graphql", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...nt(c),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: p,
        variables: { owner: _, name: i, num: l }
      })
    });
    if (!f.ok) return null;
    const C = (await f.json())?.data?.repository?.discussion;
    if (!C) return null;
    let S = 0;
    const k = (C.comments?.nodes || []).map((x) => {
      const D = x.replies?.nodes || [];
      S += D.length;
      const A = D.map((E) => ({
        id: E.id,
        author: {
          login: E.author?.login || "匿名",
          avatarUrl: E.author?.avatarUrl || "",
          association: pt(E.authorAssociation)
        },
        createdAt: E.createdAt,
        formattedTime: dt(E.createdAt),
        body: E.body || "",
        bodyHtml: E.bodyHTML || (E.body ? Ve.renderMarkdown(E.body) : ""),
        reactions: $t(E.reactionGroups)
      }));
      return {
        id: x.id,
        author: {
          login: x.author?.login || "匿名",
          avatarUrl: x.author?.avatarUrl || "",
          association: pt(x.authorAssociation)
        },
        createdAt: x.createdAt,
        formattedTime: dt(x.createdAt),
        body: x.body || "",
        bodyHtml: x.bodyHTML || (x.body ? Ve.renderMarkdown(x.body) : "<p>（评论内容为空）</p>"),
        reactions: $t(x.reactionGroups),
        replies: A
      };
    }), N = C.body || "", $ = C.bodyHTML && C.bodyHTML.trim().length > 10 ? C.bodyHTML : N ? Ve.renderMarkdown(N) : "<p>（主贴内容为空）</p>";
    return {
      title: C.title,
      number: l,
      state: "discussion",
      category: C.category ? {
        name: C.category.name,
        emoji: Wl(C.category.emoji)
      } : void 0,
      author: {
        login: C.author?.login || "未知",
        avatarUrl: C.author?.avatarUrl || "",
        association: pt(C.authorAssociation)
      },
      createdAt: C.createdAt,
      formattedTime: dt(C.createdAt),
      body: N,
      bodyHtml: $,
      htmlUrl: C.url,
      commentsCount: C.comments?.totalCount || k.length,
      totalRepliesCount: S,
      comments: k,
      reactions: $t(C.reactionGroups)
    };
  } catch {
    return null;
  }
}
const St = {
  async open(_) {
    L.isOpen = !0, L.loading = !0, L.error = "", L.data = null, L.notificationItem = _;
    const i = Z.token?.trim() || "", l = {
      ...nt(i),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const c = _.subject?.url, p = _.subject?.type, f = _.repository?.fullName || "", [T, C] = f.split("/"), S = c?.match(/\/(\d+)$/), k = S ? Number(S[1]) : void 0;
      if (p === "Discussion" && T && C && k) {
        const N = await Vl(T, C, k, i);
        if (N) {
          L.data = {
            notificationId: _.id,
            title: N.title || _.subject.title,
            number: k,
            state: "discussion",
            category: N.category,
            author: N.author || { login: _.repository.owner.login, avatarUrl: _.repository.owner.avatarUrl || "" },
            createdAt: N.createdAt || _.updatedAt,
            formattedTime: N.formattedTime || _.formattedTime,
            body: N.body || "",
            bodyHtml: N.bodyHtml || (N.body ? Ve.renderMarkdown(N.body) : ""),
            htmlUrl: N.htmlUrl || _.htmlUrl,
            commentsCount: N.commentsCount || 0,
            totalRepliesCount: N.totalRepliesCount || 0,
            comments: N.comments || [],
            reactions: N.reactions || [],
            repositoryFullName: f,
            type: "Discussion"
          };
          return;
        }
      }
      if (c) {
        const N = await fetch(c, { headers: l, cache: "no-store" });
        if (N.ok) {
          const $ = await N.json();
          let x = [];
          if ($.comments_url && $.comments > 0)
            try {
              const E = await fetch(`${$.comments_url}?per_page=50`, { headers: l, cache: "no-store" });
              if (E.ok) {
                const J = await E.json();
                Array.isArray(J) && (x = await Promise.all(
                  J.map(async (H) => {
                    const P = H.body_html || (H.body ? await Pt(H.body, i) : "");
                    return {
                      id: H.id,
                      author: {
                        login: H.user?.login || "匿名",
                        avatarUrl: H.user?.avatar_url || "",
                        association: pt(H.author_association)
                      },
                      createdAt: H.created_at,
                      formattedTime: dt(H.created_at),
                      body: H.body || "",
                      bodyHtml: P,
                      reactions: Nt(H.reactions)
                    };
                  })
                ));
              }
            } catch (E) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", E);
            }
          const D = $.body || "";
          let A = $.body_html || "";
          !A && D && (A = await Pt(D, i)), !A && D && (A = Ve.renderMarkdown(D)), L.data = {
            notificationId: _.id,
            title: $.title || $.name || _.subject.title,
            number: $.number || k,
            state: $.merged ? "merged" : $.state || $.conclusion || "open",
            author: {
              login: $.user?.login || $.author?.login || _.repository.owner.login,
              avatarUrl: $.user?.avatar_url || $.author?.avatar_url || _.repository.owner.avatarUrl || "",
              association: pt($.author_association)
            },
            createdAt: $.created_at || $.published_at || _.updatedAt,
            formattedTime: dt($.created_at || $.published_at || _.updatedAt),
            body: D,
            bodyHtml: A || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: $.html_url || _.htmlUrl,
            commentsCount: typeof $.comments == "number" ? $.comments : x.length,
            comments: x,
            reactions: Nt($.reactions),
            repositoryFullName: f,
            type: p || "Issue"
          };
          return;
        }
      }
      L.data = {
        notificationId: _.id,
        title: _.subject.title,
        number: k,
        state: "open",
        author: {
          login: _.repository.owner.login,
          avatarUrl: _.repository.owner.avatarUrl || ""
        },
        createdAt: _.updatedAt,
        formattedTime: _.formattedTime,
        body: "",
        bodyHtml: "<p style='color: var(--muted);'>未能通过 API 读取到详细正文，请点击右上角「在网页打开」直达原帖。</p>",
        htmlUrl: _.htmlUrl,
        commentsCount: 0,
        comments: [],
        repositoryFullName: f,
        type: p || "通知"
      };
    } catch (c) {
      console.warn("[GitHubNotificationDetail] 读取异常:", c), L.error = c?.message || "网络请求异常";
    } finally {
      L.loading = !1;
    }
  },
  close() {
    L.isOpen = !1, L.data = null, L.error = "";
  }
}, Yl = { class: "vue-gh-notification-panel-wrapper" }, Kl = { class: "gh-msg-header" }, Zl = { class: "gh-msg-account" }, Xl = { class: "gh-msg-subtitle" }, Ql = {
  class: "gh-msg-tabs",
  role: "tablist"
}, Jl = ["onClick"], ei = { class: "gh-msg-list" }, ti = {
  key: 0,
  class: "gh-msg-loading"
}, si = {
  key: 1,
  class: "gh-msg-error"
}, ai = {
  key: 2,
  class: "gh-msg-empty"
}, oi = ["onClick"], ni = { class: "gh-card-indicator-col" }, li = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, ii = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, ri = { class: "gh-card-type-col" }, ui = ["title"], ci = { class: "gh-card-main-col" }, di = { class: "gh-card-repo-row" }, pi = ["title"], hi = { class: "gh-card-reason-tag" }, gi = { class: "gh-card-time" }, fi = ["title"], mi = { class: "gh-card-footer-row" }, vi = { class: "gh-card-type-label" }, bi = ["onClick"], yi = /* @__PURE__ */ xe({
  __name: "GitHubNotificationPanel",
  setup(_) {
    const i = G(null), l = re(() => [
      { kind: "all", label: "所有", count: W.items.length },
      { kind: "unread", label: "未读", count: W.items.filter((D) => D.unread).length },
      { kind: "mention", label: "提及", count: W.items.filter((D) => D.reason === "mention").length },
      { kind: "author", label: "作者", count: W.items.filter((D) => D.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: W.items.filter((D) => D.reason === "ci_activity" || D.subject.type === "CheckSuite").length }
    ]), c = re(() => {
      const D = W.items;
      switch (W.activeKind) {
        case "unread":
          return D.filter((A) => A.unread);
        case "mention":
          return D.filter((A) => A.reason === "mention");
        case "author":
          return D.filter((A) => A.reason === "author");
        case "ci":
          return D.filter((A) => A.reason === "ci_activity" || A.subject.type === "CheckSuite");
        default:
          return D;
      }
    });
    function p(D, A) {
      if (A === "ci_activity" || D === "CheckSuite")
        return "⚡";
      switch (D) {
        case "Issue":
          return "🟢";
        case "PullRequest":
          return "🔀";
        case "Release":
          return "🏷️";
        case "Discussion":
          return "💡";
        default:
          return "📦";
      }
    }
    function f(D) {
      switch (D) {
        case "mention":
          return "提及";
        case "author":
          return "作者";
        case "ci_activity":
          return "CI 活动";
        case "review_requested":
          return "待我审查";
        case "comment":
          return "新评论";
        case "subscribed":
          return "关注动态";
        case "assign":
          return "指派给我";
        default:
          return D || "通知";
      }
    }
    function T() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function C() {
      We.refresh();
    }
    function S() {
      We.close();
    }
    function k(D) {
      St.open(D);
    }
    function N(D) {
      We.openTarget(D);
    }
    function $(D) {
      if (!W.isOpen) return;
      const A = D.target;
      !i.value?.contains(A) && !A?.closest("#gh-header-msg-center-btn") && We.close();
    }
    function x(D) {
      D.key === "Escape" && W.isOpen && We.close();
    }
    return ht(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", $), window.addEventListener("keydown", x));
    }), bt(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", $), window.removeEventListener("keydown", x));
    }), (D, A) => (t(), s("div", Yl, [
      o(W).isOpen ? (t(), s("section", {
        key: 0,
        ref_key: "panelRef",
        ref: i,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: A[0] || (A[0] = le(() => {
        }, ["stop"]))
      }, [
        e("header", Kl, [
          e("div", Zl, [
            A[2] || (A[2] = e("div", { class: "gh-msg-octo-avatar" }, [
              e("svg", {
                viewBox: "0 0 24 24",
                width: "18",
                height: "18",
                fill: "currentColor"
              }, [
                e("path", { d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" })
              ])
            ], -1)),
            e("div", null, [
              A[1] || (A[1] = e("h2", { class: "gh-msg-title" }, "GitHub 消息通知", -1)),
              e("p", Xl, " 共 " + a(o(W).items.length) + " 条通知 · " + a(o(W).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          A[3] || (A[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: T
          }, " ↗ "),
          e("button", {
            type: "button",
            class: Q(["gh-panel-btn", { "is-spinning": o(W).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: C
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: S
          }, " ✕ ")
        ]),
        e("nav", Ql, [
          (t(!0), s(j, null, te(l.value, (E) => (t(), s("button", {
            key: E.kind,
            type: "button",
            class: Q(["gh-msg-tab", { active: o(W).activeKind === E.kind }]),
            onClick: (J) => o(W).activeKind = E.kind
          }, [
            ae(a(E.label) + " ", 1),
            E.count > 0 ? (t(), s("span", {
              key: 0,
              class: Q(["gh-tab-pill", { "is-unread-pill": E.kind === "unread" }])
            }, a(E.count), 3)) : y("", !0)
          ], 10, Jl))), 128))
        ]),
        e("div", ei, [
          o(W).loading && !o(W).items.length ? (t(), s("div", ti, [...A[4] || (A[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : o(W).error ? (t(), s("div", si, [
            A[5] || (A[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, a(o(W).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: C
            }, "重试")
          ])) : c.value.length === 0 ? (t(), s("div", ai, [...A[6] || (A[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (t(!0), s(j, { key: 3 }, te(c.value, (E) => (t(), s("article", {
            key: E.id,
            class: Q(["gh-notification-card", { "is-unread": E.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (J) => k(E)
          }, [
            e("div", ni, [
              E.unread ? (t(), s("span", li)) : (t(), s("span", ii))
            ]),
            e("div", ri, [
              e("span", {
                class: "gh-type-badge",
                title: E.subject.type
              }, a(p(E.subject.type, E.reason)), 9, ui)
            ]),
            e("div", ci, [
              e("div", di, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: E.repository.fullName
                }, a(E.repository.fullName), 9, pi),
                e("span", hi, a(f(E.reason)), 1),
                e("time", gi, a(E.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: E.subject.title
              }, a(E.subject.title), 9, fi),
              e("div", mi, [
                e("span", vi, a(E.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: le((J) => N(E), ["stop"])
                }, "在网页打开 ↗", 8, bi)
              ])
            ])
          ], 10, oi))), 128))
        ])
      ], 512)) : y("", !0)
    ]));
  }
}), _i = /* @__PURE__ */ Ee(yi, [["__scopeId", "data-v-9a98e294"]]), ki = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, wi = ["aria-label"], $i = { class: "gh-modal-title-wrap" }, Ci = { class: "gh-modal-octo-icon" }, Si = ["href"], Ri = { class: "gh-owner" }, Gi = { class: "gh-name" }, Mi = {
  key: 1,
  class: "gh-modal-repo-name"
}, Ti = { class: "gh-name" }, Ai = { class: "gh-modal-actions" }, Li = { class: "gh-modal-content" }, Di = {
  key: 0,
  class: "gh-content-loading"
}, Hi = {
  key: 1,
  class: "gh-content-error"
}, xi = { class: "gh-discussion-title-header" }, Ei = { class: "gh-discussion-h1" }, Ii = {
  key: 0,
  class: "gh-discussion-num"
}, Ui = { class: "gh-discussion-sub-meta" }, Ni = {
  key: 0,
  class: "gh-category-pill"
}, Pi = {
  key: 0,
  class: "cat-emoji"
}, Oi = {
  key: 1,
  class: "gh-category-pill"
}, Fi = { class: "gh-sub-author" }, Bi = { class: "gh-sub-verb" }, ji = {
  key: 2,
  class: "gh-sub-comments-count"
}, qi = { class: "gh-op-post-card" }, zi = { class: "gh-op-post-head" }, Wi = { class: "gh-op-author-left" }, Vi = ["src"], Yi = { class: "gh-op-meta" }, Ki = { class: "gh-op-name-row" }, Zi = { class: "gh-op-name" }, Xi = {
  key: 0,
  class: "gh-role-pill"
}, Qi = { class: "gh-op-time" }, Ji = ["innerHTML"], er = {
  key: 0,
  class: "gh-reactions-bar"
}, tr = { class: "rx-emoji" }, sr = { class: "rx-count" }, ar = {
  key: 0,
  class: "gh-comments-block"
}, or = { class: "gh-comments-header" }, nr = { class: "gh-comments-count-pill" }, lr = { class: "gh-comments-feed" }, ir = { class: "gh-comment-head" }, rr = ["src"], ur = { class: "gh-comment-meta" }, cr = { class: "gh-comment-author" }, dr = {
  key: 0,
  class: "gh-role-pill small"
}, pr = { class: "gh-comment-time" }, hr = ["innerHTML"], gr = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, fr = { class: "rx-emoji" }, mr = { class: "rx-count" }, vr = {
  key: 1,
  class: "gh-comment-replies-thread"
}, br = { class: "gh-replies-thread-title" }, yr = { class: "gh-reply-head" }, _r = ["src"], kr = { class: "gh-reply-meta" }, wr = { class: "gh-reply-author" }, $r = {
  key: 0,
  class: "gh-role-pill tiny"
}, Cr = { class: "gh-reply-time" }, Sr = ["innerHTML"], Rr = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, Gr = { class: "rx-emoji" }, Mr = { class: "rx-count" }, Tr = {
  key: 1,
  class: "gh-no-comments"
}, Ar = /* @__PURE__ */ xe({
  __name: "GitHubNotificationDetailDrawer",
  setup(_) {
    const i = G(null), l = G(null), c = G(null);
    let p = !1, f = 0, T = 0, C = 0, S = 0, k = () => {
    };
    const N = re(() => (L.data?.repositoryFullName || L.notificationItem?.repository.fullName || "").split("/")[0] || ""), $ = re(() => {
      const U = L.data?.repositoryFullName || L.notificationItem?.repository.fullName || "";
      return U.split("/")[1] || U;
    }), x = re(() => {
      if (!L.data) return "";
      const U = L.data.bodyHtml?.trim() || "";
      if (U.length > 20) return U;
      const q = L.data.body?.trim() || "";
      return q.length > 0 ? Ve.renderMarkdown(q) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), D = re(() => c.value ? {
      position: "fixed",
      left: `${c.value.x}px`,
      top: `${c.value.y}px`,
      transform: "none"
    } : {});
    be(
      () => L.isOpen,
      (U) => {
        U && (c.value = null, Lt(() => {
          l.value && (l.value.scrollTop = 0);
        }));
      }
    ), be(
      () => L.data,
      (U) => {
        U && Lt(() => {
          l.value && (l.value.scrollTop = 0);
        });
      }
    );
    function A(U) {
      if (U.target.closest("button, a, input")) return;
      k();
      const q = i.value;
      if (!q || !L.isOpen) return;
      p = !0;
      const X = q.getBoundingClientRect();
      C = X.left, S = X.top, f = U.clientX, T = U.clientY, c.value = { x: C, y: S };
      const ne = (K) => {
        if (!p) return;
        const ce = K.clientX - f, fe = K.clientY - T;
        c.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, C + ce)),
          y: Math.max(10, Math.min(window.innerHeight - 80, S + fe))
        };
      }, Y = () => {
        p = !1, window.removeEventListener("mousemove", ne), window.removeEventListener("mouseup", Y);
      };
      k = Y, window.addEventListener("mousemove", ne), window.addEventListener("mouseup", Y);
    }
    function E() {
      St.close();
    }
    function J() {
      const U = L.data?.htmlUrl || L.notificationItem?.htmlUrl;
      U && typeof window < "u" && window.open(U, "_blank", "noopener,noreferrer");
    }
    function H(U) {
      const X = U.target?.closest("a");
      X && X.href && (U.preventDefault(), U.stopPropagation(), window.open(X.href, "_blank", "noopener,noreferrer"));
    }
    function P() {
      L.notificationItem && St.open(L.notificationItem);
    }
    function O(U) {
      switch (U) {
        case "Discussion":
          return "💡";
        case "Issue":
          return "🟢";
        case "PullRequest":
          return "🔀";
        case "Release":
          return "🏷️";
        case "CheckSuite":
          return "⚡";
        default:
          return "🐙";
      }
    }
    function V(U) {
      switch (U) {
        case "Discussion":
          return "Discussion 讨论";
        case "Issue":
          return "Issue 议题";
        case "PullRequest":
          return "Pull Request 合并请求";
        case "Release":
          return "Release 发行版";
        case "CheckSuite":
          return "CI 流水线";
        default:
          return U || "通知详情";
      }
    }
    function pe(U) {
      switch (U) {
        case "open":
          return "Open 开启";
        case "closed":
          return "Closed 已关闭";
        case "merged":
          return "Merged 已合并";
        case "discussion":
          return "活跃中";
        case "success":
          return "构建成功";
        case "failure":
          return "构建失败";
        default:
          return U || "";
      }
    }
    function ue(U) {
      U.key === "Escape" && L.isOpen && E();
    }
    return ht(() => {
      Yt(), window.addEventListener("keydown", ue);
    }), bt(() => {
      window.removeEventListener("keydown", ue), k();
    }), (U, q) => (t(), Se(Rt, { to: "body" }, [
      o(L).isOpen ? (t(), s("div", ki, [
        e("div", {
          ref_key: "windowRef",
          ref: i,
          class: "gh-nonmodal-window",
          style: ot(D.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": o(L).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: A
          }, [
            e("div", $i, [
              e("span", Ci, a(O(o(L).data?.type || o(L).notificationItem?.subject.type)), 1),
              o(L).data?.htmlUrl || o(L).notificationItem?.htmlUrl ? (t(), s("a", {
                key: 0,
                href: o(L).data?.htmlUrl || o(L).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", Ri, a(N.value), 1),
                q[0] || (q[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", Gi, a($.value), 1),
                q[1] || (q[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, Si)) : (t(), s("span", Mi, [
                e("strong", Ti, a(o(L).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", Ai, [
              o(L).data?.state ? (t(), s("span", {
                key: 0,
                class: Q(["gh-detail-state-pill", o(L).data.state])
              }, a(pe(o(L).data.state)), 3)) : y("", !0),
              o(L).data?.htmlUrl || o(L).notificationItem?.htmlUrl ? (t(), s("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: J
              }, " 在网页打开 ↗ ")) : y("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: E
              }, " ✕ ")
            ])
          ], 32),
          e("div", Li, [
            o(L).loading ? (t(), s("div", Di, [
              q[2] || (q[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + a(o(L).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : o(L).error ? (t(), s("div", Hi, [
              q[3] || (q[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, a(o(L).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: P
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: J
                }, "在 GitHub 打开 ↗")
              ])
            ])) : o(L).data ? (t(), s("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: l,
              class: "gh-detail-scrollable",
              onClick: H
            }, [
              e("div", xi, [
                e("h1", Ei, [
                  ae(a(o(L).data.title) + " ", 1),
                  o(L).data.number ? (t(), s("span", Ii, "#" + a(o(L).data.number), 1)) : y("", !0)
                ]),
                e("div", Ui, [
                  o(L).data.category ? (t(), s("span", Ni, [
                    o(L).data.category.emoji ? (t(), s("span", Pi, a(o(L).data.category.emoji), 1)) : y("", !0),
                    e("span", null, a(o(L).data.category.name), 1)
                  ])) : (t(), s("span", Oi, a(V(o(L).data.type)), 1)),
                  e("span", Fi, a(o(L).data.author.login), 1),
                  e("span", Bi, "发布于 " + a(o(L).data.formattedTime), 1),
                  o(L).data.commentsCount ? (t(), s("span", ji, [
                    ae(" · " + a(o(L).data.commentsCount) + " 条讨论主题 ", 1),
                    o(L).data.totalRepliesCount ? (t(), s(j, { key: 0 }, [
                      ae(" （含 " + a(o(L).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : y("", !0)
                  ])) : y("", !0)
                ])
              ]),
              e("article", qi, [
                e("div", zi, [
                  e("div", Wi, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: o(L).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, Vi),
                    e("div", Yi, [
                      e("div", Ki, [
                        e("strong", Zi, a(o(L).data.author.login), 1),
                        o(L).data.author.association ? (t(), s("span", Xi, a(o(L).data.author.association), 1)) : y("", !0)
                      ]),
                      e("time", Qi, a(o(L).data.formattedTime), 1)
                    ])
                  ]),
                  q[4] || (q[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                q[5] || (q[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: x.value
                }, null, 8, Ji),
                o(L).data.reactions?.length ? (t(), s("div", er, [
                  (t(!0), s(j, null, te(o(L).data.reactions, (X) => (t(), s("span", {
                    key: X.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", tr, a(X.emoji), 1),
                    e("span", sr, a(X.count), 1)
                  ]))), 128))
                ])) : y("", !0)
              ]),
              o(L).data.comments.length ? (t(), s("div", ar, [
                e("div", or, [
                  q[6] || (q[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", nr, [
                    ae(a(o(L).data.commentsCount) + " 条主题 ", 1),
                    o(L).data.totalRepliesCount ? (t(), s(j, { key: 0 }, [
                      ae(" · " + a(o(L).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : y("", !0)
                  ])
                ]),
                e("div", lr, [
                  (t(!0), s(j, null, te(o(L).data.comments, (X) => (t(), s("div", {
                    key: X.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", ir, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: X.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, rr),
                      e("div", ur, [
                        e("span", cr, a(X.author.login), 1),
                        X.author.association ? (t(), s("span", dr, a(X.author.association), 1)) : y("", !0),
                        e("time", pr, a(X.formattedTime), 1)
                      ])
                    ]),
                    q[7] || (q[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: X.bodyHtml
                    }, null, 8, hr),
                    X.reactions?.length ? (t(), s("div", gr, [
                      (t(!0), s(j, null, te(X.reactions, (ne) => (t(), s("span", {
                        key: ne.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", fr, a(ne.emoji), 1),
                        e("span", mr, a(ne.count), 1)
                      ]))), 128))
                    ])) : y("", !0),
                    X.replies?.length ? (t(), s("div", vr, [
                      e("div", br, [
                        e("span", null, "💬 " + a(X.replies.length) + " 条回复对话", 1)
                      ]),
                      (t(!0), s(j, null, te(X.replies, (ne) => (t(), s("div", {
                        key: ne.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", yr, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: ne.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, _r),
                          e("div", kr, [
                            e("strong", wr, a(ne.author.login), 1),
                            ne.author.association ? (t(), s("span", $r, a(ne.author.association), 1)) : y("", !0),
                            e("time", Cr, a(ne.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: ne.bodyHtml
                        }, null, 8, Sr),
                        ne.reactions?.length ? (t(), s("div", Rr, [
                          (t(!0), s(j, null, te(ne.reactions, (Y) => (t(), s("span", {
                            key: Y.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", Gr, a(Y.emoji), 1),
                            e("span", Mr, a(Y.count), 1)
                          ]))), 128))
                        ])) : y("", !0)
                      ]))), 128))
                    ])) : y("", !0)
                  ]))), 128))
                ])
              ])) : (t(), s("div", Tr, [...q[8] || (q[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : y("", !0)
          ])
        ], 12, wi)
      ])) : y("", !0)
    ]));
  }
}), Lr = /* @__PURE__ */ Ee(Ar, [["__scopeId", "data-v-053c788c"]]), Dr = [
  {
    chapterTitle: "基础篇 · 收藏与本地分类",
    left: { tag: "第 1 篇 · 数据边界", title: "⭐ 收藏从哪里来？", badge: "先看这里", steps: [
      { icon: "🔗", title: "连接 GitHub 账号", desc: "在右上角设置填写 GitHub 用户名。Token 可选，用于读取账号收藏、提高请求额度；本地分类不需要 GitHub Lists 写权限。" },
      { icon: "📥", title: "只把收藏读取到工作台", desc: "刷新会读取 GitHub 的 Star 收藏。同账号刷新保留已有卡片，完整读取成功后再替换；网络失败时保留上次内容并提示。" },
      { icon: "💾", title: "分类只存在本机", desc: "分组、仓库归属和左栏排序保存在当前浏览器的扩展数据中，不会同步修改 GitHub 官方 Lists。", tip: "首次切换会保留本机已有列表缓存作为分组初始数据；官网原有 Lists 不会被删除或改写。" }
    ] },
    right: { tag: "第 2 篇 · 整理收藏", title: "📁 像常用网站一样整理", badge: "本地分组", steps: [
      { icon: "➕", title: "创建与打开文件夹", desc: "点击左侧分组标题右边的 +，输入名称创建本地分组。左栏每行两个图标：文件夹代表分组，独立图标代表未分组仓库。" },
      { icon: "🖱️", title: "拖动归类，边缘排序", desc: "把仓库拖到文件夹中心可加入分组，保留其他分组归属；拖到图标边缘可以调整左栏顺序。点击文件夹会打开独立、实心的无模态窗口。", tip: "分组不支持嵌套；把两个仓库图标叠放只调整顺序，不会偷偷创建分组。" },
      { icon: "↩️", title: "右键移到未分组", desc: "右键仓库图标，选择“移到未分组”，即可移除它的所有本地分组归属。删除分组只影响本地整理，不会取消 GitHub Star。" }
    ] }
  },
  {
    chapterTitle: "进阶篇 · 检索、阅读与安全边界",
    left: { tag: "第 3 篇 · 查找与阅读", title: "🔎 快速找到有用的仓库", badge: "效率技巧", steps: [
      { icon: "⌨️", title: "统一使用顶部搜索", desc: "顶部选择本地搜索后，可按仓库名称、简介、语言或主题标签筛选已读取的收藏。未分组托盘和分组看板共用这一个搜索词。" },
      { icon: "📑", title: "托盘翻页与横向看板", desc: "顶部未分组收藏保持单排，每页 10 个；使用翻页按钮浏览。下方是本地分组的多列看板，支持横向滚动及拖拽归类。" },
      { icon: "📖", title: "打开 README 详情", desc: "点击仓库图标或卡片打开详情，查看说明文档与标题目录；可读取仓库提供的中文版本。近期读过的详情有短时内存缓存。", tip: "图片由原站提供；私有、已删除或网络不可达的资源仍可能加载失败。" }
    ] },
    right: { tag: "第 4 篇 · 使用须知", title: "🛡️ 哪些操作会改变什么？", badge: "真实边界", steps: [
      { icon: "🏠", title: "本地分组不跨设备同步", desc: "不同账号分开保存；首次导入后，刷新收藏不会用官网 Lists 覆盖本地分类。清理扩展数据、卸载扩展或更换扩展 ID 可能丢失本地分组，请谨慎操作。" },
      { icon: "⚠️", title: "Star 操作与分类不同", desc: "分类不修改云端；如果你主动使用已有的 Star / 取消 Star 功能，则仍会真实修改 GitHub 收藏。创建关联任务也会通过对应任务服务执行。" },
      { icon: "❔", title: "遇到加载或拖动问题", desc: "读取失败先检查网络、Token 或请求额度，不要连续重复刷新。Esc 可取消图标拖动、收起菜单或关闭当前说明书；点击窗口外也能收起说明书。", tip: "说明书底部可切换章节，键盘左右方向键也能翻页。" }
    ] }
  }
], Hr = ["inert"], xr = {
  key: 0,
  class: "muted small",
  role: "status"
}, Er = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, Ir = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, Ur = ["title"], Nr = { class: "fo-sidebar-toggle-title" }, Pr = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Or = ["aria-expanded", "title"], Fr = { class: "fo-sidebar-toggle-chevron" }, Br = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, jr = { class: "fo-sidebar-sub-wrap" }, qr = { class: "fo-sidebar-sub-wrap" }, zr = ["title"], Wr = { class: "fo-sidebar-sub-main" }, Vr = { class: "fo-sidebar-sub-text" }, Yr = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Kr = ["title"], Zr = { class: "fo-sidebar-sub-main" }, Xr = { class: "fo-sidebar-sub-text" }, Qr = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Jr = ["title"], eu = { class: "fo-sidebar-sub-main" }, tu = { class: "fo-sidebar-sub-text" }, su = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, au = ["title"], ou = { class: "fo-sidebar-sub-main" }, nu = { class: "fo-sidebar-sub-text" }, lu = { class: "gh-bili-sidebar-head" }, iu = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, ru = { style: { color: "var(--dim)", "font-size": "9.5px" } }, uu = ["title", "aria-label"], cu = {
  class: "gh-bili-folder-list",
  id: "gh-folder-list"
}, du = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, pu = { class: "card-fullscreen-gh-search" }, hu = ["title"], gu = { class: "gh-mode-icon" }, fu = { class: "gh-mode-text" }, mu = ["placeholder"], vu = ["title"], bu = { class: "gh-search-rule-icon" }, yu = { class: "gh-search-rule-text" }, _u = ["title"], ku = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, wu = {
  class: "card-fullscreen-gh-search gh-hero-search-box-wrap",
  id: "gh-head-search-wrap"
}, $u = ["title"], Cu = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Su = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, Ru = ["placeholder"], Gu = ["title"], Mu = { class: "gh-search-rule-icon" }, Tu = { class: "gh-search-rule-text" }, Au = ["title"], Lu = ["title"], Du = { class: "gh-header-msg-label" }, Hu = {
  key: 0,
  class: "gh-header-msg-badge"
}, xu = { class: "gh-settings-anchor" }, Eu = ["aria-expanded", "aria-label", "title"], Iu = {
  id: "vue-github-repositories-root",
  style: { flex: "1", "min-height": "0", display: "flex", "flex-direction": "column" }
}, Ct = "lw-github-active-channel", Uu = /* @__PURE__ */ xe({
  __name: "GitHubWorkspaceCard",
  setup(_) {
    const i = Dt(() => import("./GitHubSettingsModal-BPzW8nxw.js")), l = Dt(() => import("./LauncherBookGuideDialog-_f6OUezf.js")), { style: c, media: p } = us("github"), { active: f } = jt("card-github", "/github.html");
    let T = 0, C = !1, S;
    const k = G("");
    function N() {
      try {
        const B = sessionStorage.getItem(Ct);
        if (B === "dashboard" || B === "stars" || B === "trending" || B === "awesome" || B === "repos")
          return B;
      } catch {
      }
      return "dashboard";
    }
    const $ = G(N());
    $.value === "trending" && _t.switchTab("trending"), be(() => f.value && $.value === "stars", (B) => Z.setAiViewActive(B), { immediate: !0, flush: "sync" });
    const x = G(!1), D = G("local"), A = G(""), E = G(""), J = G(0), H = G("fuzzy"), P = G(null), O = G(!1), V = G(!1);
    be(f, (B) => {
      B || (V.value = !1);
    });
    const pe = G(0);
    function ue() {
      f.value && (O.value = !0, ++pe.value);
    }
    const U = G(!1);
    be(O, (B) => {
      B && (U.value = !0);
    });
    const q = G(null), X = G(0);
    function ne(B) {
      q.value = B || document.getElementById("gh-sidebar-stars-btn"), O.value = !0;
    }
    let Y = 0;
    function K(B) {
      if (B === "dashboard" && (P.value = null), $.value = B, B !== "search")
        try {
          sessionStorage.setItem(Ct, B);
        } catch {
        }
      B === "trending" ? _t.switchTab("trending") : _t.switchTab("stars");
    }
    function ce() {
      $.value = "stars";
      try {
        sessionStorage.setItem(Ct, "stars");
      } catch {
      }
    }
    const fe = re(() => [
      { id: "exact", icon: "🎯", name: I("search.rule.exact"), desc: I("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: I("search.rule.fuzzy"), desc: I("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: I("search.rule.topic"), desc: I("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: I("search.rule.smart"), desc: I("search.rule.smartDesc") }
    ]), de = G(Z.searchRule || "exact"), ie = re(() => fe.value.find((B) => B.id === de.value) || fe.value[0]);
    function we() {
      const B = Z.cycleSearchRule();
      de.value = B;
    }
    const ye = re(() => D.value === "global" ? I("github.searchGlobalPlaceholder") : I("github.searchLocalPlaceholder", { rule: ie.value.name }));
    function Te() {
      clearTimeout(Y), !(!f.value || D.value !== "local") && (Y = window.setTimeout(() => Z.setSearchQuery(A.value.trim().toLowerCase()), 180));
    }
    function Ie() {
      D.value = D.value === "local" ? "global" : "local", D.value === "local" && Te();
    }
    function De() {
      P.value = null, A.value = "", clearTimeout(Y), Z.resetLocalSearch();
    }
    function Ue(B, w) {
      const z = B.trim();
      z && (clearTimeout(Y), E.value = z, H.value = w, J.value++, D.value = "global", A.value = z, K("dashboard"), P.value = "global");
    }
    function Oe() {
      const B = A.value.trim();
      D.value === "local" ? (clearTimeout(Y), Z.setSearchQuery(B.toLowerCase())) : B && Ue(B, "fuzzy");
    }
    be(() => [f.value, is.github?.id], ([B, w]) => {
      if (!B || !w) return;
      const z = ls("github");
      z && Ue(z.keyword, Z.searchRule || "exact");
    }, { immediate: !0 });
    function Ae() {
      A.value.trim() && (D.value === "local" ? (clearTimeout(Y), Z.setSearchQuery(A.value.trim().toLowerCase()), P.value = "local") : Oe());
    }
    function Le() {
      ++X.value, ++T, C = !0, k.value = "";
    }
    be(f, async (B) => {
      if (clearTimeout(Y), !B) return;
      const w = ++T;
      if ((!S || S.signal.aborted) && (S = new AbortController(), Z.setRepositoryViewSignal(S.signal)), C) {
        await Z.resumeRepositoryReads();
        return;
      }
      if (Z.repos.length || Z.loadingAllStars || Z.loadingPage) {
        C = !0;
        return;
      }
      try {
        const z = await Mt();
        if (w !== T || S.signal.aborted) return;
        C = !0, await Z.loadGitHub(z.ghUser, z.ghToken);
      } catch {
        if (w !== T || S?.signal.aborted) return;
        C = !1, k.value = I("github.initError");
      }
    }, { immediate: !0, flush: "sync" });
    let Ge = "";
    return be(
      () => [f.value, $.value, oe.loading, oe.ownerKey, X.value],
      ([B, w, z, ke, Fe]) => {
        if (!B || w !== "stars" || z || !ke || Z.allStarsLoaded || Z.loadingAllStars || !Z.baseUrl || !Z.total) return;
        const Ne = `${ke}:${Fe}`;
        Ge !== Ne && (Ge = Ne, Z.ensureAllStarsLoaded());
      },
      { immediate: !0 }
    ), Gt(() => {
      Z.setAiViewActive(!1), ++T, S?.abort(), clearTimeout(Y);
    }), (B, w) => (t(), s("section", {
      class: Q(["card wide", { "card-fullscreen": o(rs).activeId === "card-github" }]),
      id: "card-github",
      inert: !o(f)
    }, [
      w[35] || (w[35] = e("header", { class: "card-head" }, [
        e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }),
        e("h2", null, "GitHub"),
        e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        })
      ], -1)),
      k.value ? (t(), s("p", xr, a(k.value), 1)) : y("", !0),
      e("div", Er, [
        e("div", {
          class: Q(["gh-bili-layout", { "has-workspace-wallpaper": !!o(c) }]),
          style: ot(o(c))
        }, [
          je(cs, { media: o(p) }, null, 8, ["media"]),
          e("aside", Ir, [
            e("div", {
              class: Q(["fo-sidebar-toggle-bar", { "is-collapsed": x.value }]),
              title: x.value ? o(I)("github.channel.toggleExpand") : o(I)("github.channel.toggleCollapse"),
              onClick: w[0] || (w[0] = (z) => x.value = !x.value)
            }, [
              e("div", Nr, [
                w[17] || (w[17] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, a(o(I)("github.channel.channels")), 1),
                x.value ? (t(), s("span", Pr, "5")) : y("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !x.value,
                title: x.value ? o(I)("github.expand") : o(I)("github.collapse")
              }, [
                e("span", null, a(x.value ? o(I)("github.expand") : o(I)("github.collapse")), 1),
                e("span", Fr, a(x.value ? "▾" : "▴"), 1)
              ], 8, Or)
            ], 10, Ur),
            x.value ? y("", !0) : (t(), s("div", Br, [
              e("div", jr, [
                e("button", {
                  id: "gh-sidebar-dashboard-btn",
                  type: "button",
                  class: Q(["fo-sidebar-sub-btn", { on: $.value === "dashboard" }]),
                  title: "GitHub 首页",
                  onClick: w[1] || (w[1] = (z) => K("dashboard"))
                }, [...w[18] || (w[18] = [
                  e("div", { class: "fo-sidebar-sub-main" }, [
                    e("span", { class: "fo-sidebar-sub-icon" }, "⌂"),
                    e("div", { class: "fo-sidebar-sub-text" }, [
                      e("strong", null, "首页"),
                      e("small", null, "工作区概览")
                    ])
                  ], -1),
                  e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "var(--surface-hover)", color: "var(--muted)" }
                  }, "HOME", -1)
                ])], 2)
              ]),
              e("div", qr, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: Q(["fo-sidebar-sub-btn", { on: $.value === "stars" }]),
                  title: o(I)("github.channel.starsTitle"),
                  onClick: w[2] || (w[2] = (z) => K("stars"))
                }, [
                  e("div", Wr, [
                    w[19] || (w[19] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", Vr, [
                      e("strong", null, a(o(I)("github.channel.stars")), 1),
                      e("small", null, a(o(I)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  w[20] || (w[20] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, zr)
              ]),
              e("div", Yr, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: Q(["fo-sidebar-sub-btn", { on: $.value === "trending" }]),
                  title: o(I)("github.channel.trendingTitle"),
                  onClick: w[3] || (w[3] = (z) => K("trending"))
                }, [
                  e("div", Zr, [
                    w[21] || (w[21] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", Xr, [
                      e("strong", null, a(o(I)("github.channel.trending")), 1),
                      e("small", null, a(o(I)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  w[22] || (w[22] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, Kr)
              ]),
              e("div", Qr, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: Q(["fo-sidebar-sub-btn", { on: $.value === "awesome" }]),
                  title: o(I)("github.channel.awesomeTitle"),
                  onClick: w[4] || (w[4] = (z) => K("awesome"))
                }, [
                  e("div", eu, [
                    w[23] || (w[23] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", tu, [
                      e("strong", null, a(o(I)("github.channel.awesome")), 1),
                      e("small", null, a(o(I)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  w[24] || (w[24] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, Jr)
              ]),
              e("div", su, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: Q(["fo-sidebar-sub-btn", { on: $.value === "repos" }]),
                  title: o(I)("github.channel.reposTitle"),
                  onClick: w[5] || (w[5] = (z) => K("repos"))
                }, [
                  e("div", ou, [
                    w[25] || (w[25] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", nu, [
                      e("strong", null, a(o(I)("github.channel.repos")), 1),
                      e("small", null, a(o(I)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  w[26] || (w[26] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, au)
              ])
            ])),
            e("header", lu, [
              e("div", null, [
                e("b", iu, [
                  w[27] || (w[27] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  ae(" " + a(o(I)("github.lists.title")), 1)
                ]),
                e("small", ru, a(o(I)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: o(I)("github.lists.new"),
                "aria-label": o(I)("github.lists.new"),
                onClick: w[6] || (w[6] = (z) => o(Z).promptCreateFolder())
              }, "＋", 8, uu)
            ]),
            e("nav", cu, [
              je(Zt, {
                active: o(f),
                onSelect: ce
              }, null, 8, ["active"])
            ])
          ]),
          e("section", du, [
            $.value === "dashboard" ? (t(), Se(jl, {
              key: 0,
              active: o(f),
              "account-revision": X.value,
              "show-results": !!P.value,
              onChannel: K,
              onSettings: ne,
              onNotifications: w[8] || (w[8] = (z) => o(We).open())
            }, {
              search: gt(() => [
                e("div", pu, [
                  e("form", {
                    class: "gh-search-box",
                    role: "search",
                    onSubmit: le(Ae, ["prevent"])
                  }, [
                    e("button", {
                      type: "button",
                      class: "gh-search-mode-toggle",
                      title: D.value === "local" ? o(I)("github.searchScope.toGlobal") : o(I)("github.searchScope.toLocal"),
                      onClick: Ie
                    }, [
                      e("span", gu, a(D.value === "local" ? "⭐" : "🌐"), 1),
                      e("span", fu, a(D.value === "local" ? o(I)("github.searchScope.local") : o(I)("github.searchScope.global")), 1),
                      w[28] || (w[28] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
                    ], 8, hu),
                    Re(e("input", {
                      "onUpdate:modelValue": w[7] || (w[7] = (z) => A.value = z),
                      placeholder: ye.value,
                      "aria-label": "搜索 GitHub 仓库",
                      autocomplete: "off"
                    }, null, 8, mu), [
                      [Ke, A.value]
                    ]),
                    D.value === "local" ? (t(), s("button", {
                      key: 0,
                      type: "button",
                      class: Q(["gh-search-rule-btn", `rule-${ie.value.id}`]),
                      title: o(I)("github.ruleHint", { rule: ie.value.name, desc: ie.value.desc }),
                      onClick: le(we, ["stop"])
                    }, [
                      e("span", bu, a(ie.value.icon), 1),
                      e("span", yu, a(ie.value.name), 1)
                    ], 10, vu)) : y("", !0),
                    Re(e("button", {
                      type: "button",
                      class: "gh-search-clear-btn",
                      title: o(I)("github.clearSearch"),
                      onClick: De
                    }, "✕", 8, _u), [
                      [at, A.value]
                    ]),
                    w[29] || (w[29] = e("button", {
                      type: "submit",
                      title: "搜索",
                      "aria-label": "搜索"
                    }, "⌕", -1))
                  ], 32)
                ])
              ]),
              results: gt(() => [
                P.value === "global" ? (t(), Se(It, {
                  key: 0,
                  embedded: "",
                  query: E.value,
                  "request-id": J.value,
                  rule: H.value,
                  onBack: De
                }, null, 8, ["query", "request-id", "rule"])) : P.value === "local" ? (t(), Se(Mn, {
                  key: 1,
                  onBack: De
                })) : y("", !0)
              ]),
              _: 1
            }, 8, ["active", "account-revision", "show-results"])) : $.value === "search" ? (t(), Se(It, {
              key: 1,
              query: E.value,
              "request-id": J.value,
              rule: H.value,
              onBack: w[9] || (w[9] = (z) => K("stars"))
            }, null, 8, ["query", "request-id", "rule"])) : $.value === "stars" && o(vt).accountConfigured === !1 ? (t(), Se(Kt, {
              key: 2,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: w[10] || (w[10] = (z) => ne())
            })) : $.value === "stars" ? (t(), s(j, { key: 3 }, [
              e("header", ku, [
                je(Xt, {
                  onOpenAiSettings: ue,
                  onOpenGuide: w[14] || (w[14] = (z) => V.value = !0)
                }, {
                  search: gt(() => [
                    e("div", wu, [
                      e("form", {
                        id: "gh-search-form",
                        class: "gh-search-box",
                        onSubmit: le(Oe, ["prevent"])
                      }, [
                        e("button", {
                          type: "button",
                          id: "gh-search-mode-toggle",
                          class: "gh-search-mode-toggle",
                          title: D.value === "local" ? o(I)("github.searchScope.toGlobal") : o(I)("github.searchScope.toLocal"),
                          onClick: Ie
                        }, [
                          e("span", Cu, a(D.value === "local" ? "⭐" : "🌐"), 1),
                          e("span", Su, a(D.value === "local" ? o(I)("github.searchScope.local") : o(I)("github.searchScope.global")), 1),
                          w[30] || (w[30] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
                        ], 8, $u),
                        Re(e("input", {
                          id: "gh-search-input",
                          "onUpdate:modelValue": w[11] || (w[11] = (z) => A.value = z),
                          placeholder: ye.value,
                          autocomplete: "off",
                          onInput: Te
                        }, null, 40, Ru), [
                          [Ke, A.value]
                        ]),
                        D.value === "local" ? (t(), s("button", {
                          key: 0,
                          type: "button",
                          class: Q(["gh-search-rule-btn", `rule-${ie.value.id}`]),
                          title: o(I)("github.ruleHint", { rule: ie.value.name, desc: ie.value.desc }),
                          onClick: le(we, ["stop"])
                        }, [
                          e("span", Mu, a(ie.value.icon), 1),
                          e("span", Tu, a(ie.value.name), 1)
                        ], 10, Gu)) : y("", !0),
                        Re(e("button", {
                          type: "button",
                          id: "gh-search-clear-btn",
                          class: "gh-search-clear-btn",
                          title: o(I)("github.clearSearch"),
                          onClick: De
                        }, "✕", 8, Au), [
                          [at, A.value]
                        ]),
                        w[31] || (w[31] = e("button", {
                          type: "submit",
                          id: "gh-search-submit-btn",
                          title: "搜索"
                        }, "⌕", -1))
                      ], 32),
                      w[32] || (w[32] = e("div", {
                        id: "gh-search-options",
                        class: "gh-search-options",
                        "aria-label": "搜索来源",
                        hidden: ""
                      }, [
                        e("label", { title: "精确：严格用你的原关键词搜索仓库名和描述" }, [
                          e("input", {
                            type: "checkbox",
                            value: "exact",
                            checked: ""
                          }),
                          ae("精确")
                        ]),
                        e("label", { title: "宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" }, [
                          e("input", {
                            type: "checkbox",
                            value: "loose"
                          }),
                          ae("宽松匹配")
                        ]),
                        e("label", { title: "近义词：自动扩展相关英文词，例如 ai → llm / machine learning" }, [
                          e("input", {
                            type: "checkbox",
                            value: "related"
                          }),
                          ae("近义词")
                        ]),
                        e("label", { title: "主题标签：搜索 GitHub Topics 标签，例如 topic:llm" }, [
                          e("input", {
                            type: "checkbox",
                            value: "topic"
                          }),
                          ae("主题标签")
                        ]),
                        e("label", { title: "说明文档：搜索仓库 README 内容" }, [
                          e("input", {
                            type: "checkbox",
                            value: "readme"
                          }),
                          ae("说明文档")
                        ])
                      ], -1)),
                      w[33] || (w[33] = e("div", {
                        id: "gh-search-suggest",
                        class: "gh-search-suggest",
                        hidden: ""
                      }, null, -1))
                    ])
                  ]),
                  "actions-prefix": gt(() => [
                    e("button", {
                      id: "gh-header-msg-center-btn",
                      class: Q(["gh-header-msg-btn", { "has-unread": o(W).unreadCount > 0, "is-active": o(W).isOpen }]),
                      type: "button",
                      title: o(W).unreadCount > 0 ? o(I)("github.header.msgUnread", { count: o(W).unreadCount }) : o(I)("github.header.msgCenter"),
                      onClick: w[12] || (w[12] = (z) => o(We).toggle())
                    }, [
                      w[34] || (w[34] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
                      e("span", Du, a(o(I)("github.header.msg")), 1),
                      o(W).unreadCount > 0 ? (t(), s("span", Hu, a(o(W).unreadCount > 99 ? "99+" : o(W).unreadCount), 1)) : y("", !0)
                    ], 10, Lu),
                    e("div", xu, [
                      e("button", {
                        type: "button",
                        ref_key: "settingsButton",
                        ref: q,
                        "aria-expanded": O.value,
                        "aria-label": o(I)("github.settings"),
                        class: "gh-head-settings-btn",
                        title: o(I)("github.header.settings"),
                        onClick: w[13] || (w[13] = (z) => O.value = !O.value)
                      }, " ⚙️ ", 8, Eu)
                    ])
                  ]),
                  _: 1
                })
              ]),
              e("div", Iu, [
                je(Yo, {
                  active: o(f) && $.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : $.value === "trending" ? (t(), Se(Qt, { key: 4 })) : $.value === "awesome" ? (t(), Se(Ms, { key: 5 })) : $.value === "repos" ? (t(), Se(La, {
              key: 6,
              active: o(f) && $.value === "repos"
            }, null, 8, ["active"])) : y("", !0)
          ])
        ], 6)
      ]),
      U.value ? (t(), Se(o(i), {
        key: 1,
        visible: o(f) && O.value,
        anchor: q.value,
        "ai-request": pe.value,
        onAccountReload: Le,
        onClose: w[15] || (w[15] = (z) => O.value = !1)
      }, null, 8, ["visible", "anchor", "ai-request"])) : y("", !0),
      V.value ? (t(), Se(o(l), {
        key: 2,
        open: V.value,
        title: "GitHub 使用手册",
        spreads: o(Dr),
        "help-selector": ".gh-github-help-btn",
        onClose: w[16] || (w[16] = (z) => V.value = !1)
      }, null, 8, ["open", "spreads"])) : y("", !0),
      je(_i),
      je(Lr)
    ], 10, Hr));
  }
}), Qu = /* @__PURE__ */ Ee(Uu, [["__scopeId", "data-v-124c47a6"]]);
export {
  Qu as default
};
