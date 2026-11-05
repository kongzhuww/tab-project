import { d as $e, o as a, g as i, h as e, n as re, q as Ae, i as $, F as j, j as B, C as P, t as r, u as n, k as q, b as H, y as Z, r as pe, w as ce, D as Ve, z as qe, A as ze, m as We, e as ie, l as et, B as Be, p as se, G as tt, L as ut, H as ct, s as Re, E as st } from "./vendor-vue-D8gPZiit.js";
import { u as dt } from "./useCardActivity-wC5QAX_o.js";
import { E as rt, F as Ee, w as ue, H as Ye, t as F, R as ot, y as pt, v as ht, A as gt } from "./search.service-5IiHCVmV.js";
import { A as mt } from "./AccountSetupGuide-CdPrdaxt.js";
import { g as ft, G as bt, a as vt, b as nt } from "./main-_eUvXSfq.js";
import yt from "./GitHubTrending-D4WN1jEO.js";
import { _ as Ce, t as k } from "./_plugin-vue_export-helper-CHsDq6Yy.js";
import { s as Me } from "./storage-cache.service-BYF2zxXX.js";
import { n as at, r as wt } from "./view-styles-BcD2WjPK.js";
import { m as de } from "./core-utils-DYgSCp9X.js";
const _t = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], kt = [
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
], $t = { class: "gh-awesome-wrapper" }, Ct = { class: "gh-awesome-header" }, Gt = { class: "gh-awesome-intro" }, Tt = { class: "gh-awesome-search-box" }, St = { class: "gh-awesome-pills" }, Rt = ["onClick"], Mt = { class: "gh-awesome-grid" }, xt = ["onClick"], Dt = { class: "gh-awesome-card-head" }, Lt = { class: "gh-awesome-card-name" }, At = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, Ht = { class: "gh-awesome-desc" }, Ut = { class: "gh-awesome-footer" }, Et = { class: "gh-awesome-tags" }, Pt = ["href"], It = {
  key: 0,
  class: "gh-awesome-empty"
}, Nt = /* @__PURE__ */ $e({
  __name: "GitHubAwesome",
  setup(v) {
    const c = H("all"), u = H(""), l = Z(() => {
      const f = u.value.trim().toLowerCase(), w = c.value;
      return kt.filter((g) => w === "all" || g.category === w ? f ? g.name.toLowerCase().includes(f) || g.title.toLowerCase().includes(f) || g.desc.toLowerCase().includes(f) || g.tags.some((S) => S.toLowerCase().includes(f)) : !0 : !1);
    });
    function p(f) {
      window.open(f, "_blank", "noreferrer");
    }
    return (f, w) => (a(), i("div", $t, [
      e("header", Ct, [
        e("div", Gt, [
          w[3] || (w[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", Tt, [
            re(e("input", {
              "onUpdate:modelValue": w[0] || (w[0] = (g) => u.value = g),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [Ae, u.value]
            ]),
            u.value ? (a(), i("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: w[1] || (w[1] = (g) => u.value = "")
            }, "✕")) : $("", !0)
          ])
        ]),
        e("div", St, [
          (a(!0), i(j, null, B(n(_t), (g) => (a(), i("button", {
            key: g.id,
            type: "button",
            class: P(["gh-awesome-pill", { active: c.value === g.id }]),
            onClick: (m) => c.value = g.id
          }, [
            e("span", null, r(g.icon), 1),
            e("b", null, r(g.name), 1)
          ], 10, Rt))), 128))
        ])
      ]),
      e("div", Mt, [
        (a(!0), i(j, null, B(l.value, (g) => (a(), i("article", {
          key: g.id,
          class: "gh-awesome-card",
          onClick: (m) => p(g.url)
        }, [
          e("div", Dt, [
            e("div", Lt, [
              e("strong", null, r(g.title), 1),
              e("small", null, r(g.name), 1)
            ]),
            e("span", At, "★ " + r(g.stars), 1)
          ]),
          e("p", Ht, r(g.desc), 1),
          e("div", Ut, [
            e("div", Et, [
              (a(!0), i(j, null, B(g.tags, (m) => (a(), i("span", {
                key: m,
                class: "gh-awesome-tag"
              }, r(m), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: g.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: w[2] || (w[2] = q(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, Pt)
          ])
        ], 8, xt))), 128)),
        l.value.length ? $("", !0) : (a(), i("div", It, [...w[4] || (w[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), jt = /* @__PURE__ */ Ce(Nt, [["__scopeId", "data-v-28a8995f"]]), xe = "gh_my_repos_cache_v1", De = "gh_my_repo_groups_v2", Le = "gh_my_repo_groups_map_v2", C = pe({
  loading: !1,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});
function ye(v) {
  return v.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
}
class _e {
  constructor() {
    this.abortController = null, this.inFlightPromise = null;
  }
  static getInstance() {
    return _e.instance || (_e.instance = new _e()), _e.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略，支持并发防抖与请求去重）
   */
  async load(c = !1) {
    if (!c && this.inFlightPromise)
      return this.inFlightPromise;
    c && (this.abortController?.abort(), this.inFlightPromise = null), this.abortController = new AbortController();
    const u = this.abortController.signal, l = (async () => {
      await this.loadPersistedGroups();
      const p = await Me.get(xe);
      if (p && p.length ? this.hydrateRepos(p) : C.repos.length && this.hydrateRepos(C.repos), c || !C.repos.length) {
        C.loading = !0, C.errorMessage = "";
        try {
          await this.fetchRemote(u);
        } catch (w) {
          if (w.name === "AbortError") return;
          C.errorMessage = w.message || "获取个人仓库失败";
        } finally {
          C.loading = !1;
        }
      } else
        this.fetchRemote(u).catch(() => {
        });
    })();
    return this.inFlightPromise = l.finally(() => {
      this.inFlightPromise === l && (this.inFlightPromise = null);
    }), this.inFlightPromise;
  }
  async fetchRemote(c) {
    const { ghUser: u, ghToken: l } = await rt();
    if (!u && !l) {
      C.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    const p = Ee(l), f = [], w = /* @__PURE__ */ new Set();
    if (u)
      try {
        const m = `https://api.github.com/users/${encodeURIComponent(u)}/repos?type=owner&sort=updated&per_page=100`, S = await fetch(m, { method: "GET", headers: p, signal: c });
        if (S.ok) {
          const R = await S.json();
          if (Array.isArray(R))
            for (const _ of R)
              _ && _.id && !w.has(_.id) && (w.add(_.id), f.push(_));
        }
      } catch (m) {
        if (m.name === "AbortError") throw m;
      }
    if (l)
      try {
        const S = await fetch("https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100", { method: "GET", headers: p, signal: c });
        if (S.ok) {
          const R = await S.json();
          if (Array.isArray(R))
            for (const _ of R)
              _ && _.id && !w.has(_.id) && (w.add(_.id), f.push(_));
        }
      } catch (m) {
        if (m.name === "AbortError") throw m;
      }
    if (!f.length) {
      C.repos.length || (C.errorMessage = "未能读取到个人仓库，请检查网络或 GitHub 设置。");
      return;
    }
    const g = f.map((m) => {
      const S = m.full_name || `${m.owner?.login || u}/${m.name}`, R = m.name, _ = C.repoGroupsMap[S] || C.repoGroupsMap[R] || C.repoGroupsMap[S.toLowerCase()] || C.repoGroupsMap[R.toLowerCase()] || [];
      return {
        id: m.id,
        name: m.name,
        fullName: S,
        description: m.description || "",
        isPrivate: !!m.private,
        isFork: !!m.fork,
        htmlUrl: m.html_url || `https://github.com/${u}/${m.name}`,
        language: m.language || null,
        stargazersCount: Number(m.stargazers_count) || 0,
        forksCount: Number(m.forks_count) || 0,
        openIssuesCount: Number(m.open_issues_count) || 0,
        topics: Array.isArray(m.topics) ? m.topics.map((x) => String(x).toLowerCase()) : [],
        localGroups: _,
        updatedAt: m.updated_at || "",
        pushedAt: m.pushed_at || "",
        defaultBranch: m.default_branch || "main"
      };
    });
    this.hydrateRepos(g), await Me.set(xe, g, { ttlMs: 30 * 86400 * 1e3 });
  }
  hydrateRepos(c) {
    let u = !1;
    C.repos = c.map((l) => {
      const p = C.repoGroupsMap[l.fullName] || C.repoGroupsMap[l.name] || C.repoGroupsMap[l.fullName.toLowerCase()] || C.repoGroupsMap[l.name.toLowerCase()], f = l.localGroups && l.localGroups.length ? l.localGroups : null, w = this.inferGroupsForRepo(l, C.customGroups), g = (p && p.length ? p : null) || f || w, m = g ? [...new Set(g.filter(Boolean))] : [];
      return m.length && (!C.repoGroupsMap[l.fullName] || !C.repoGroupsMap[l.fullName].length) && (C.repoGroupsMap[l.fullName] = m, u = !0), {
        ...l,
        localGroups: m
      };
    }), u && this.persistGroupsMap();
  }
  /**
   * 智能推断仓库最匹配的分组归属（仅在无手动归类时作为平滑桥接）
   */
  inferGroupsForRepo(c, u) {
    if (!u || !u.length) return [];
    const l = [], p = c.name.toLowerCase(), f = (c.topics || []).map((w) => w.toLowerCase());
    for (const w of u) {
      const g = w.toLowerCase();
      if ((g.includes("fork") || w.includes("分支")) && (c.isFork || f.includes("fork"))) {
        l.push(w);
        continue;
      }
      if ((g.includes("浏览器") || g.includes("browser") || g.includes("chrome") || g.includes("edge")) && (f.some((m) => m.includes("extension") || m.includes("browser") || m.includes("newtab")) || p.includes("tab-project"))) {
        l.push(w);
        continue;
      }
      if ((g.includes("pi") || w.includes("PI")) && (f.some((m) => m.includes("pi") || m.includes("grounding-pi")) || p.includes("pi-") || p.includes("-pi"))) {
        l.push(w);
        continue;
      }
      if (g.includes("herdr") && (f.some((m) => m.includes("herdr")) || p.includes("herdr"))) {
        l.push(w);
        continue;
      }
      if ((g.includes("嵌入式") || g.includes("embedded") || g.includes("单片机")) && (f.some((m) => m.includes("embedded") || m.includes("zephyr") || m.includes("stm32") || m.includes("k230")) || p.includes("k230") || p.includes("mspm0") || p.includes("pid-") || p.includes("zephyr"))) {
        l.push(w);
        continue;
      }
      if ((g.includes("美化") || g.includes("theme") || g.includes("style")) && (f.some((m) => m.includes("theme") || m.includes("beauty") || m.includes("ui")) || p.includes("theme") || p.includes("style"))) {
        l.push(w);
        continue;
      }
    }
    return l;
  }
  /**
   * 将仓库添加到本地自定义分组
   */
  async addRepoToGroup(c, u) {
    const l = ye(u);
    l && (c.localGroups.includes(l) || c.localGroups.push(l), C.repoGroupsMap[c.fullName] = [...c.localGroups], await this.persistGroupsMap(), await Me.set(xe, C.repos, { ttlMs: 30 * 86400 * 1e3 }));
  }
  /**
   * 将仓库从指定本地分组中移出
   */
  async removeRepoFromGroup(c, u) {
    c.localGroups = c.localGroups.filter((l) => l !== u), C.repoGroupsMap[c.fullName] = [...c.localGroups], await this.persistGroupsMap(), await Me.set(xe, C.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  async moveRepoToGroup(c, u) {
    if (!u)
      c.localGroups = [];
    else {
      const l = ye(u);
      if (!l) return;
      c.localGroups = [l];
    }
    C.repoGroupsMap[c.fullName] = [...c.localGroups], await this.persistGroupsMap(), await Me.set(xe, C.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 新建一个本地分组板块
   */
  async createGroup(c) {
    const u = ye(c);
    return u ? C.customGroups.includes(u) ? (alert(`分组「${u}」已存在。`), null) : (C.customGroups.push(u), await this.persistGroups(), u) : (alert("分组名称不能为空。"), null);
  }
  /**
   * 重命名本地分组
   */
  async renameGroup(c, u) {
    const l = ye(u);
    return l ? c === l ? !0 : C.customGroups.includes(l) ? (alert(`已存在名为「${l}」的分组。`), !1) : (C.customGroups = C.customGroups.map((p) => p === c ? l : p), C.repos.forEach((p) => {
      p.localGroups.includes(c) && (p.localGroups = p.localGroups.map((f) => f === c ? l : f), C.repoGroupsMap[p.fullName] = [...p.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : (alert("新分组名称不能为空。"), !1);
  }
  /**
   * 删除本地分组
   */
  async deleteGroup(c) {
    const u = C.repos.filter((p) => p.localGroups.includes(c)).length, l = u > 0 ? `确定删除分组「${c}」吗？
该分组下的 ${u} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。` : `确定删除空分组「${c}」吗？`;
    return confirm(l) ? (C.customGroups = C.customGroups.filter((p) => p !== c), C.repos.forEach((p) => {
      p.localGroups.includes(c) && (p.localGroups = p.localGroups.filter((f) => f !== c), C.repoGroupsMap[p.fullName] = [...p.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : !1;
  }
  async loadPersistedGroups() {
    try {
      let c = null, u = null;
      if (typeof chrome < "u" && chrome.storage?.local) {
        const l = await chrome.storage.local.get([De, Le]);
        c = l?.[De], u = l?.[Le];
      }
      if (!c || !Array.isArray(c)) {
        const l = localStorage.getItem(De);
        l && (c = JSON.parse(l));
      }
      if (!u || typeof u != "object") {
        const l = localStorage.getItem(Le);
        l && (u = JSON.parse(l));
      }
      Array.isArray(c) && (C.customGroups = c.map(ye).filter(Boolean)), u && typeof u == "object" && (C.repoGroupsMap = u);
    } catch {
    }
  }
  async persistGroupsMap() {
    try {
      const c = { ...C.repoGroupsMap };
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Le]: c }), localStorage.setItem(Le, JSON.stringify(c));
    } catch {
    }
  }
  async persistGroups() {
    const c = Array.from(new Set(C.customGroups.map(ye).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [De]: c }), localStorage.setItem(De, JSON.stringify(c));
    } catch {
    }
  }
}
const ee = _e.getInstance(), Ft = { class: "my-repos-workspace" }, Ot = {
  key: 0,
  class: "error-banner"
}, Wt = { class: "shelf-header" }, zt = { class: "shelf-left" }, Bt = { class: "shelf-badge" }, Yt = { class: "shelf-right" }, Vt = { class: "shelf-search-wrap" }, qt = ["disabled", "title"], Kt = ["title"], Xt = ["onDragstart", "onContextmenu"], Qt = { class: "repo-card-head" }, Jt = ["title", "onClick"], Zt = {
  key: 0,
  class: "badge-repo-visibility private"
}, es = {
  key: 1,
  class: "badge-repo-visibility fork"
}, ts = ["title"], ss = {
  key: 1,
  class: "repo-topics-row"
}, os = { class: "repo-card-footer" }, ns = { class: "meta-left" }, as = {
  key: 0,
  class: "meta-item lang"
}, ls = { class: "meta-item" }, is = {
  key: 1,
  class: "meta-item"
}, rs = ["title"], us = { class: "board-columns-track" }, cs = ["onDragover", "onDragleave", "onDrop"], ds = { class: "column-header" }, ps = {
  key: 0,
  class: "column-title-group"
}, hs = ["title"], gs = { class: "badge-count" }, ms = {
  key: 1,
  class: "column-rename-group"
}, fs = ["onKeydown"], bs = ["onClick"], vs = { class: "column-actions" }, ys = ["onClick"], ws = {
  key: 0,
  class: "col-popover-menu"
}, _s = ["onClick"], ks = ["onClick"], $s = { class: "column-cards-scroll" }, Cs = ["onDragstart", "onContextmenu"], Gs = { class: "repo-card-head" }, Ts = ["title", "onClick"], Ss = {
  key: 0,
  class: "badge-repo-visibility private"
}, Rs = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Ms = ["title"], xs = { class: "repo-topics-row" }, Ds = { class: "topic-chip active-chip" }, Ls = ["onClick"], As = { class: "repo-card-footer" }, Hs = { class: "meta-left" }, Us = {
  key: 0,
  class: "meta-item lang"
}, Es = { class: "meta-item" }, Ps = {
  key: 1,
  class: "meta-item"
}, Is = { class: "meta-date" }, Ns = {
  key: 0,
  class: "empty-column-placeholder"
}, js = { class: "board-column new-column-slot" }, Fs = {
  key: 1,
  class: "new-column-composer"
}, Os = { class: "composer-actions" }, Ws = ["onClick"], zs = /* @__PURE__ */ $e({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(v) {
    const c = v, u = H(""), l = H(!1), p = H(null), f = H(""), w = H(null), g = H(null), m = H(null), S = H(!1);
    function R() {
      S.value = !S.value;
    }
    function _(t) {
      const s = m.value;
      s && (Math.abs(t.deltaX) > Math.abs(t.deltaY) && t.deltaX !== 0 || t.deltaY !== 0 && (t.preventDefault(), s.scrollLeft += t.deltaY));
    }
    const x = H(null), G = H(null), M = H(null);
    let T = null, U = 0;
    const L = pe({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromGroup: null
    }), Y = H(null), oe = H(!1);
    function X() {
      L.visible = !1, Y.value = null;
    }
    function ae(t, s, o) {
      t.preventDefault(), t.stopPropagation();
      let h = t.clientX, K = t.clientY;
      h > window.innerWidth - 200 && (h = window.innerWidth - 210), K > window.innerHeight - 240 && (K = window.innerHeight - 245), L.x = h, L.y = K, L.repo = s, L.fromGroup = o, L.visible = !0, Y.value = "folder", oe.value = h > window.innerWidth - 380;
    }
    async function Q() {
      const t = L.repo;
      X(), t && await ee.moveRepoToGroup(t, null);
    }
    async function D(t) {
      const s = L.repo;
      X(), s && await ee.moveRepoToGroup(s, t);
    }
    async function E() {
      const t = L.repo;
      if (X(), !!t)
        try {
          await navigator.clipboard.writeText(t.htmlUrl), at.show({
            appName: "GitHub",
            title: k("github.myRepos.copiedUrlTitle"),
            message: k("github.myRepos.copiedUrlMsg", { name: t.name })
          });
        } catch {
        }
    }
    async function I() {
      const t = L.repo;
      if (X(), !!t)
        try {
          const s = `git clone ${t.htmlUrl}.git`;
          await navigator.clipboard.writeText(s), at.show({
            appName: "GitHub",
            title: k("github.myRepos.copiedCloneTitle"),
            message: s
          });
        } catch {
        }
    }
    function V() {
      const t = L.repo;
      X(), t && ve(t.htmlUrl);
    }
    function te() {
      const t = L.repo;
      X(), t && ft.open({
        fullName: t.fullName,
        description: t.description || "",
        stars: t.stargazersCount,
        language: t.language || void 0,
        updated: t.pushedAt
      });
    }
    function le(t) {
      t.target?.closest(".gh-repo-context-menu") || L.visible && X();
    }
    function O(t) {
      t.key === "Escape" && L.visible && X();
    }
    const J = Z(() => C.customGroups), W = Z(() => {
      const t = C.searchQuery.trim().toLowerCase();
      return t ? C.repos.filter(
        (s) => s.name.toLowerCase().includes(t) || s.description.toLowerCase().includes(t) || s.localGroups.some((o) => o.toLowerCase().includes(t)) || s.topics.some((o) => o.toLowerCase().includes(t)) || s.language && s.language.toLowerCase().includes(t)
      ) : C.repos;
    }), b = Z(() => W.value.filter((t) => !t.localGroups.length));
    function z(t) {
      return W.value.filter((s) => s.localGroups.includes(t));
    }
    async function Pe() {
      const t = u.value.trim();
      if (!t) return;
      await ee.createGroup(t) && (u.value = "", l.value = !1);
    }
    function Ke(t) {
      w.value = t, f.value = t, p.value = null;
    }
    async function Ie(t) {
      const s = f.value.trim();
      if (!s || s === t) {
        w.value = null;
        return;
      }
      await ee.renameGroup(t, s) && (w.value = null);
    }
    async function Xe(t) {
      p.value = null, await ee.deleteGroup(t);
    }
    async function Ne(t, s) {
      await ee.removeRepoFromGroup(t, s);
    }
    function je(t) {
      const s = g.value;
      if (!s) return;
      const h = t.target?.closest(".column-cards-scroll");
      if (h && h.scrollHeight > h.clientHeight && !t.shiftKey && t.deltaX === 0) {
        const K = h.scrollTop <= 0 && t.deltaY < 0, Qe = h.scrollTop + h.clientHeight >= h.scrollHeight - 1 && t.deltaY > 0;
        if (!K && !Qe)
          return;
      }
      Math.abs(t.deltaX) > Math.abs(t.deltaY) && t.deltaX !== 0 || t.deltaY !== 0 && (t.preventDefault(), s.scrollLeft += t.deltaY);
    }
    function Ge(t) {
      if (!x.value || !g.value) return;
      t.preventDefault();
      const s = t.deltaX !== 0 ? t.deltaX : t.deltaY;
      g.value.scrollLeft += s;
    }
    function he() {
      if (T !== null) return;
      const t = () => {
        g.value && U !== 0 ? (g.value.scrollLeft += U, T = requestAnimationFrame(t)) : ge();
      };
      T = requestAnimationFrame(t);
    }
    function ge() {
      T !== null && (cancelAnimationFrame(T), T = null), U = 0;
    }
    function Fe(t) {
      if (!x.value || !g.value) return;
      const s = g.value.getBoundingClientRect(), o = 100;
      if (t > s.right - o) {
        const h = Math.min(1, Math.max(0.1, (t - (s.right - o)) / o));
        U = Math.round(h * 20), he();
      } else if (t < s.left + o) {
        const h = Math.min(1, Math.max(0.1, (s.left + o - t) / o));
        U = -Math.round(h * 20), he();
      } else
        ge();
    }
    function Oe(t) {
      x.value && (t.preventDefault(), Fe(t.clientX));
    }
    function me(t, s, o) {
      X(), x.value = s, G.value = o, t.dataTransfer && (t.dataTransfer.effectAllowed = "move", t.dataTransfer.setData("text/plain", `${s.id}:${o}`)), window.addEventListener("wheel", Ge, { passive: !1 });
    }
    function fe() {
      x.value = null, G.value = null, M.value = null, ge(), window.removeEventListener("wheel", Ge);
    }
    function Te(t, s) {
      x.value && (t.preventDefault(), t.dataTransfer && (t.dataTransfer.dropEffect = "move"), M.value = s, Fe(t.clientX));
    }
    function Se(t, s) {
      const o = t.currentTarget, h = t.relatedTarget;
      o?.contains(h) || M.value === s && (M.value = null);
    }
    async function be(t, s) {
      t.preventDefault();
      const o = x.value, h = G.value;
      fe(), o && (s === "default" ? h && h !== "default" ? await ee.removeRepoFromGroup(o, h) : await ee.moveRepoToGroup(o, null) : (await ee.addRepoToGroup(o, s), h && h !== "default" && h !== s && await ee.removeRepoFromGroup(o, h)));
    }
    function ve(t) {
      window.open(t, "_blank", "noopener,noreferrer");
    }
    function d(t) {
      if (!t) return "";
      try {
        const s = new Date(t);
        return `${s.getFullYear()}-${String(s.getMonth() + 1).padStart(2, "0")}-${String(s.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return ce(
      () => c.active,
      (t) => {
        X(), t && ee.load();
      }
    ), Ve(() => {
      window.addEventListener("pointerdown", le), window.addEventListener("keydown", O), ee.load();
    }), qe(() => {
      ge(), window.removeEventListener("wheel", Ge), window.removeEventListener("pointerdown", le), window.removeEventListener("keydown", O);
    }), (t, s) => (a(), i("div", Ft, [
      n(C).errorMessage ? (a(), i("div", Ot, [
        e("span", null, "⚠️ " + r(n(C).errorMessage), 1),
        e("button", {
          type: "button",
          class: "btn-retry",
          onClick: s[0] || (s[0] = (o) => n(ee).load(!0))
        }, "重试")
      ])) : $("", !0),
      e("section", {
        class: P(["default-shelf-area", { "is-collapsed": S.value, "drop-active": M.value === "default" }]),
        onDragover: s[4] || (s[4] = (o) => Te(o, "default")),
        onDragleave: s[5] || (s[5] = (o) => Se(o, "default")),
        onDrop: s[6] || (s[6] = (o) => be(o, "default"))
      }, [
        e("header", Wt, [
          e("div", zt, [
            s[23] || (s[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            s[24] || (s[24] = e("span", { class: "shelf-title" }, "未分类仓库", -1)),
            e("span", Bt, r(b.value.length), 1),
            s[25] || (s[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）", -1))
          ]),
          e("div", Yt, [
            e("div", Vt, [
              s[26] || (s[26] = e("span", { class: "search-icon" }, "🔍", -1)),
              re(e("input", {
                "onUpdate:modelValue": s[1] || (s[1] = (o) => n(C).searchQuery = o),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索我的仓库名称、简介或语言…"
              }, null, 512), [
                [Ae, n(C).searchQuery]
              ]),
              n(C).searchQuery ? (a(), i("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: s[2] || (s[2] = (o) => n(C).searchQuery = "")
              }, "✕")) : $("", !0)
            ]),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              disabled: n(C).loading,
              title: n(k)("github.myRepos.refreshBtnTitle"),
              onClick: s[3] || (s[3] = (o) => n(ee).load(!0))
            }, [
              e("span", {
                class: P({ spinning: n(C).loading })
              }, "🔄", 2),
              e("span", null, r(n(C).loading ? n(k)("github.myRepos.refreshing") : n(k)("common.refresh")), 1)
            ], 8, qt),
            b.value.length ? (a(), i("button", {
              key: 0,
              type: "button",
              class: "shelf-toggle-btn",
              title: S.value ? n(k)("github.myRepos.expandShelf") : n(k)("github.myRepos.collapseShelf"),
              onClick: R
            }, r(S.value ? n(k)("github.myRepos.expandBtn") : n(k)("github.myRepos.collapseBtn")), 9, Kt)) : $("", !0)
          ])
        ]),
        b.value.length ? re((a(), i("div", {
          key: 0,
          ref_key: "shelfScrollRef",
          ref: m,
          class: "shelf-cards-scroll",
          onWheel: _
        }, [
          (a(!0), i(j, null, B(b.value, (o) => (a(), i("div", {
            key: o.id,
            class: P(["repo-card shelf-card", { "card-dragging": x.value?.id === o.id }]),
            draggable: "true",
            onDragstart: (h) => me(h, o, "default"),
            onDragend: fe,
            onContextmenu: (h) => ae(h, o, "default")
          }, [
            e("div", Qt, [
              e("span", {
                class: "repo-name",
                title: o.fullName,
                onClick: (h) => ve(o.htmlUrl)
              }, r(o.name), 9, Jt),
              o.isPrivate ? (a(), i("span", Zt, "私有")) : $("", !0),
              o.isFork ? (a(), i("span", es, "Fork")) : $("", !0)
            ]),
            o.description ? (a(), i("p", {
              key: 0,
              class: "repo-desc",
              title: o.description
            }, r(o.description), 9, ts)) : $("", !0),
            o.topics.length ? (a(), i("div", ss, [
              (a(!0), i(j, null, B(o.topics, (h) => (a(), i("span", {
                key: h,
                class: "topic-chip-tag",
                title: "GitHub 远端引流标签"
              }, " #" + r(h), 1))), 128))
            ])) : $("", !0),
            e("div", os, [
              e("div", ns, [
                o.language ? (a(), i("span", as, [
                  s[27] || (s[27] = e("span", { class: "lang-color" }, null, -1)),
                  se(r(o.language), 1)
                ])) : $("", !0),
                e("span", ls, "⭐ " + r(o.stargazersCount), 1),
                o.forksCount ? (a(), i("span", is, "🍴 " + r(o.forksCount), 1)) : $("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + o.updatedAt
              }, r(d(o.pushedAt || o.updatedAt)), 9, rs)
            ])
          ], 42, Xt))), 128))
        ], 544)), [
          [ze, !S.value]
        ]) : $("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: g,
        class: "board-viewport",
        onWheel: je,
        onDragover: Oe
      }, [
        e("div", us, [
          (a(!0), i(j, null, B(J.value, (o) => (a(), i("section", {
            key: o,
            class: P(["board-column topic-column", { "drop-active": M.value === o }]),
            onDragover: (h) => Te(h, o),
            onDragleave: (h) => Se(h, o),
            onDrop: (h) => be(h, o)
          }, [
            e("header", ds, [
              w.value !== o ? (a(), i("div", ps, [
                s[28] || (s[28] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "自定义分组: " + o
                }, " 📁 " + r(o), 9, hs),
                e("span", gs, r(z(o).length), 1)
              ])) : (a(), i("div", ms, [
                re(e("input", {
                  "onUpdate:modelValue": s[7] || (s[7] = (h) => f.value = h),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    We((h) => Ie(o), ["enter"]),
                    s[8] || (s[8] = We((h) => w.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, fs), [
                  [Ae, f.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (h) => Ie(o)
                }, "✓", 8, bs),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: s[9] || (s[9] = (h) => w.value = null)
                }, "✕")
              ])),
              e("div", vs, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "分组操作",
                  onClick: (h) => p.value = p.value === o ? null : o
                }, "•••", 8, ys),
                p.value === o ? (a(), i("div", ws, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (h) => Ke(o)
                  }, " 重命名分组 ", 8, _s),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (h) => Xe(o)
                  }, " 删除分组 ", 8, ks)
                ])) : $("", !0)
              ])
            ]),
            e("div", $s, [
              (a(!0), i(j, null, B(z(o), (h) => (a(), i("div", {
                key: h.id,
                class: P(["repo-card", { "card-dragging": x.value?.id === h.id }]),
                draggable: "true",
                onDragstart: (K) => me(K, h, o),
                onDragend: fe,
                onContextmenu: (K) => ae(K, h, o)
              }, [
                e("div", Gs, [
                  e("span", {
                    class: "repo-name",
                    title: h.fullName,
                    onClick: (K) => ve(h.htmlUrl)
                  }, r(h.name), 9, Ts),
                  h.isPrivate ? (a(), i("span", Ss, "私有")) : $("", !0),
                  h.isFork ? (a(), i("span", Rs, "Fork")) : $("", !0)
                ]),
                h.description ? (a(), i("p", {
                  key: 0,
                  class: "repo-desc",
                  title: h.description
                }, r(h.description), 9, Ms)) : $("", !0),
                e("div", xs, [
                  e("span", Ds, [
                    se(" 📁 " + r(o) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从该分组移出",
                      onClick: q((K) => Ne(h, o), ["stop"])
                    }, "✕", 8, Ls)
                  ]),
                  (a(!0), i(j, null, B(h.topics, (K) => (a(), i("span", {
                    key: K,
                    class: "topic-chip-tag",
                    title: "GitHub 远端引流标签"
                  }, " #" + r(K), 1))), 128))
                ]),
                e("div", As, [
                  e("div", Hs, [
                    h.language ? (a(), i("span", Us, [
                      s[29] || (s[29] = e("span", { class: "lang-color" }, null, -1)),
                      se(r(h.language), 1)
                    ])) : $("", !0),
                    e("span", Es, "⭐ " + r(h.stargazersCount), 1),
                    h.forksCount ? (a(), i("span", Ps, "🍴 " + r(h.forksCount), 1)) : $("", !0)
                  ]),
                  e("span", Is, r(d(h.pushedAt || h.updatedAt)), 1)
                ])
              ], 42, Cs))), 128)),
              z(o).length ? $("", !0) : (a(), i("div", Ns, [...s[30] || (s[30] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, cs))), 128)),
          e("section", js, [
            l.value ? (a(), i("div", Fs, [
              s[32] || (s[32] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建分组板块"),
                e("small", null, "支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics")
              ], -1)),
              re(e("input", {
                "onUpdate:modelValue": s[11] || (s[11] = (o) => u.value = o),
                type: "text",
                placeholder: "输入分组名称（如：前端工具、深度学习）",
                class: "composer-input",
                onKeydown: [
                  We(Pe, ["enter"]),
                  s[12] || (s[12] = We((o) => l.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [Ae, u.value]
              ]),
              e("div", Os, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: Pe
                }, "创建"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: s[13] || (s[13] = (o) => l.value = !1)
                }, r(n(k)("common.cancel")), 1)
              ])
            ])) : (a(), i("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: s[10] || (s[10] = (o) => l.value = !0)
            }, [...s[31] || (s[31] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建分组板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (a(), ie(et, { to: "body" }, [
        L.visible && L.repo ? (a(), i("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Be({ left: `${L.x}px`, top: `${L.y}px` }),
          onClick: s[21] || (s[21] = q(() => {
          }, ["stop"])),
          onContextmenu: s[22] || (s[22] = q(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: P(["gh-menu-has-sub", { "is-active": Y.value === "folder" }]),
            onMouseenter: s[16] || (s[16] = (o) => Y.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: s[14] || (s[14] = q((o) => Y.value = Y.value === "folder" ? null : "folder", ["stop"]))
            }, [...s[33] || (s[33] = [
              e("span", null, "移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: P(["gh-sub-flyout", { "flyout-left": oe.value }]),
              onClick: s[15] || (s[15] = q(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: P(["fo-cover-menu-item", { primary: !L.repo.localGroups.length }]),
                type: "button",
                onClick: Q
              }, r(L.repo.localGroups.length ? "  " : "✓ ") + "设为未分类 ", 3),
              (a(!0), i(j, null, B(J.value, (o) => (a(), i("button", {
                key: o,
                class: P(["fo-cover-menu-item", { primary: L.repo.localGroups.includes(o) }]),
                type: "button",
                onClick: (h) => D(o)
              }, r(L.repo.localGroups.includes(o) ? "✓ " : "  ") + "📁 " + r(o), 11, Ws))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[17] || (s[17] = (o) => Y.value = null),
            onClick: E
          }, r(n(k)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[18] || (s[18] = (o) => Y.value = null),
            onClick: I
          }, r(n(k)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[19] || (s[19] = (o) => Y.value = null),
            onClick: te
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[20] || (s[20] = (o) => Y.value = null),
            onClick: V
          }, r(n(k)("github.myRepos.openInGitHub")), 33)
        ], 36)) : $("", !0)
      ]))
    ]));
  }
}), Bs = /* @__PURE__ */ Ce(zs, [["__scopeId", "data-v-f77c8971"]]), ne = pe({
  uncatPage: 1,
  pageSize: 10
});
class ke {
  static getInstance() {
    return ke.instance || (ke.instance = new ke()), ke.instance;
  }
  nextUncatPage() {
    this.uncatPage < this.uncatTotalPages && ne.uncatPage++;
  }
  prevUncatPage() {
    ne.uncatPage > 1 && ne.uncatPage--;
  }
  setUncatPage(c) {
    const u = Math.max(1, Math.min(c, this.uncatTotalPages));
    ne.uncatPage = u;
  }
  get uncatPage() {
    return ne.uncatPage;
  }
  get uncatTotalPages() {
    const c = this.filteredUncatRepos.length;
    return Math.max(1, Math.ceil(c / ne.pageSize));
  }
  /**
   * 未分类的所有 Star 仓库（带搜索过滤）
   */
  get filteredUncatRepos() {
    const c = ue.searchQuery.trim().toLowerCase(), u = ue.repos.filter((l) => Ye(l.full_name).length === 0);
    return c ? u.filter(
      (l) => l.full_name.toLowerCase().includes(c) || l.description && l.description.toLowerCase().includes(c) || l.language && l.language.toLowerCase().includes(c) || l.topics && l.topics.some((p) => p.toLowerCase().includes(c))
    ) : u;
  }
  /**
   * 当前页切片的 10 个未分类 Star 仓库
   */
  get pagedUncatRepos() {
    const c = this.filteredUncatRepos, l = (Math.min(ne.uncatPage, this.uncatTotalPages) - 1) * ne.pageSize;
    return c.slice(l, l + ne.pageSize);
  }
  /**
   * 各个本地分组板块列表
   */
  get lists() {
    return ue.lists;
  }
  /**
   * 获取归属于指定 GitHub List 的 Star 仓库（带搜索过滤）
   */
  getReposForList(c) {
    const u = ue.searchQuery.trim().toLowerCase(), l = ue.repos.filter((p) => Ye(p.full_name).includes(c));
    return u ? l.filter(
      (p) => p.full_name.toLowerCase().includes(u) || p.description && p.description.toLowerCase().includes(u) || p.language && p.language.toLowerCase().includes(u) || p.topics && p.topics.some((f) => f.toLowerCase().includes(u))
    ) : l;
  }
  /**
   * 拖拽归入指定 List（若 target 为 'uncategorized' 则从所有 List 移出）
   */
  async moveRepoToList(c, u) {
    await F.dropRepositoryIntoFolder(c, u);
  }
  /**
   * 从指定 List 移出仓库
   */
  async removeRepoFromList(c, u) {
    await F.toggleRepoList(c, u);
  }
}
const N = ke.getInstance(), Ys = { class: "stars-board-workspace" }, Vs = ["data-gh-list-drop"], qs = { class: "shelf-header" }, Ks = { class: "shelf-left" }, Xs = { class: "shelf-badge" }, Qs = { class: "shelf-right" }, Js = {
  key: 0,
  class: "shelf-pager"
}, Zs = ["disabled"], eo = { class: "pager-text" }, to = ["disabled"], so = ["disabled", "aria-busy"], oo = ["title"], no = {
  key: 0,
  class: "shelf-cards-scroll"
}, ao = ["onClick", "onDragstart", "onContextmenu"], lo = ["onClick"], io = { class: "gh-card-head" }, ro = ["src"], uo = ["href", "title"], co = { class: "owner" }, po = { class: "gh-card-body" }, ho = { class: "gh-card-badges" }, go = ["title"], mo = ["title"], fo = ["title"], bo = { class: "meta" }, vo = { class: "gh-stars" }, yo = {
  key: 0,
  class: "gh-lang"
}, wo = { class: "gh-updated" }, _o = { class: "shelf-next-content" }, ko = { class: "shelf-next-sub" }, $o = {
  key: 2,
  class: "shelf-empty",
  role: "status"
}, Co = {
  key: 0,
  class: "board-columns-track"
}, Go = { class: "column-cards-scroll" }, To = {
  key: 1,
  class: "board-columns-track"
}, So = ["data-gh-list-drop", "onDragover", "onDragleave", "onDrop"], Ro = {
  class: "column-header",
  title: "拖动此列可调换位置；右侧更多可重命名、置顶或删除"
}, Mo = { class: "column-title-group" }, xo = ["title"], Do = { class: "badge-count" }, Lo = { class: "column-actions" }, Ao = ["onDragstart", "onClick"], Ho = { class: "column-cards-scroll" }, Uo = ["onClick", "onDragstart", "onContextmenu"], Eo = ["onClick"], Po = { class: "gh-card-head" }, Io = ["src"], No = ["href", "title"], jo = { class: "owner" }, Fo = { class: "gh-card-body" }, Oo = { class: "gh-card-badges" }, Wo = ["title"], zo = ["onClick"], Bo = ["title"], Yo = ["title"], Vo = ["title"], qo = { class: "meta" }, Ko = { class: "gh-stars" }, Xo = {
  key: 0,
  class: "gh-lang"
}, Qo = { class: "gh-updated" }, Jo = {
  key: 0,
  class: "empty-column-dropzone"
}, Zo = { class: "board-column add-column-panel" }, en = ["onClick"], tn = /* @__PURE__ */ $e({
  __name: "GitHubStarsBoard",
  props: {
    active: { type: Boolean }
  },
  setup(v) {
    const c = v, u = H(null), l = H(null), p = H(!1);
    function f() {
      p.value = !p.value;
    }
    function w(d) {
      const t = l.value;
      t && (Math.abs(d.deltaX) > Math.abs(d.deltaY) && d.deltaX !== 0 || d.deltaY !== 0 && (d.preventDefault(), t.scrollLeft += d.deltaY));
    }
    const g = Z(() => ue.loading), m = Z(() => g.value && !ue.repos.length), S = H(null), R = H(null), _ = H(null);
    let x = null, G = 0;
    function M() {
      x === null && (x = window.setInterval(() => {
        !u.value || G === 0 || (u.value.scrollLeft += G);
      }, 16));
    }
    function T() {
      x !== null && (clearInterval(x), x = null), G = 0;
    }
    const U = pe({
      visible: !1,
      x: 0,
      y: 0,
      list: null
    });
    function L() {
      U.visible = !1, U.list = null;
    }
    function Y(d, t) {
      d.preventDefault(), d.stopPropagation(), b();
      const s = 150, o = 130, h = Math.min(d.clientX, window.innerWidth - s - 10), K = Math.min(d.clientY, window.innerHeight - o - 10);
      U.x = h, U.y = K, U.list = t, U.visible = !0;
    }
    async function oe() {
      const d = U.list;
      L(), d && await F.renameFolder(d.id, d.name);
    }
    async function X() {
      const d = U.list;
      L(), d && await F.pinFolder(d.id);
    }
    async function ae() {
      const d = U.list;
      L(), d && await F.deleteFolder(d.name);
    }
    const Q = H(null), D = H(null);
    function E(d, t) {
      L(), b(), Q.value = t.id, d.dataTransfer && (d.dataTransfer.effectAllowed = "move", d.dataTransfer.setData("application/x-gh-col-id", t.id));
    }
    function I() {
      Q.value = null, D.value = null;
    }
    function V(d, t) {
      !Q.value || Q.value === t || (d.preventDefault(), d.dataTransfer && (d.dataTransfer.dropEffect = "move"), D.value = t);
    }
    function te(d, t) {
      D.value === t && (D.value = null);
    }
    async function le(d, t) {
      if (!Q.value || Q.value === t) return;
      d.preventDefault();
      const s = Q.value;
      I(), await F.reorderFolders(s, t);
    }
    const O = pe({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromList: null
    }), J = H(null), W = H(!1);
    function b() {
      O.visible = !1, O.repo = null, O.fromList = null, J.value = null;
    }
    function z(d, t, s) {
      d.preventDefault(), d.stopPropagation();
      const o = 190, h = 220, K = Math.min(d.clientX, window.innerWidth - o - 10), Qe = Math.min(d.clientY, window.innerHeight - h - 10);
      O.x = K, O.y = Qe, O.repo = t, O.fromList = s, O.visible = !0, J.value = "folder", W.value = K > window.innerWidth - 380;
    }
    async function Pe() {
      const d = O.repo;
      b(), d && await N.moveRepoToList(d.full_name, F.UNCAT);
    }
    async function Ke(d) {
      const t = O.repo;
      b(), t && await N.moveRepoToList(t.full_name, d);
    }
    async function Ie() {
      const d = O.repo;
      if (b(), !!d?.html_url)
        try {
          await navigator.clipboard.writeText(d.html_url);
        } catch {
        }
    }
    async function Xe() {
      const d = O.repo;
      if (b(), !!d?.full_name)
        try {
          await navigator.clipboard.writeText(`git clone https://github.com/${d.full_name}.git`);
        } catch {
        }
    }
    function Ne(d) {
      const t = d.target;
      !t?.closest(".fo-cover-context-menu") && !t?.closest(".col-popover-menu") && !t?.closest(".gh-list-col-menu") && (b(), L());
    }
    function je(d) {
      d.key === "Escape" && (b(), L());
    }
    function Ge(d) {
      const t = u.value;
      if (!t) return;
      const o = d.target?.closest(".column-cards-scroll");
      if (o && o.scrollHeight > o.clientHeight && !d.shiftKey && d.deltaX === 0) {
        const h = o.scrollTop === 0 && d.deltaY < 0, K = Math.ceil(o.scrollTop + o.clientHeight) >= o.scrollHeight && d.deltaY > 0;
        if (!h && !K)
          return;
      }
      Math.abs(d.deltaX) > Math.abs(d.deltaY) && d.deltaX !== 0 || d.deltaY !== 0 && (d.preventDefault(), t.scrollLeft += d.deltaY);
    }
    function he(d) {
      if (!S.value || !u.value) return;
      d.preventDefault();
      const t = d.deltaY !== 0 ? d.deltaY : d.deltaX;
      u.value.scrollLeft += t;
    }
    function ge(d) {
      const t = u.value;
      if (!t) return;
      const s = t.getBoundingClientRect(), o = 100;
      if (d > s.right - o) {
        const h = Math.min(1, Math.max(0.1, (d - (s.right - o)) / o));
        G = Math.round(h * 20), M();
      } else if (d < s.left + o) {
        const h = Math.min(1, Math.max(0.1, (s.left + o - d) / o));
        G = -Math.round(h * 20), M();
      } else
        T();
    }
    function Fe(d) {
      ge(d.clientX);
    }
    function Oe(d, t, s) {
      b(), S.value = t, R.value = s, d.dataTransfer && (d.dataTransfer.effectAllowed = "move", d.dataTransfer.setData(ot, t.full_name), d.dataTransfer.setData("text/plain", `${t.full_name}:${s || "uncategorized"}`)), window.addEventListener("wheel", he, { passive: !1 });
    }
    function me() {
      S.value = null, R.value = null, _.value = null, T(), window.removeEventListener("wheel", he);
    }
    function fe(d, t) {
      !c.active || !S.value && !Array.from(d.dataTransfer?.types || []).includes(ot) || (d.preventDefault(), d.dataTransfer && (d.dataTransfer.dropEffect = "move"), _.value = t);
    }
    function Te(d, t) {
      const s = d.currentTarget;
      s && d.relatedTarget instanceof Node && s.contains(d.relatedTarget) || _.value === t && (_.value = null);
    }
    async function Se(d, t) {
      d.preventDefault();
      const s = S.value?.full_name || pt(d.dataTransfer);
      me(), !(!c.active || !s) && await N.moveRepoToList(s, t === "uncategorized" ? F.UNCAT : t);
    }
    function be(d) {
      ht.open(d.full_name, void 0, d);
    }
    function ve(d) {
      if (!d) return "";
      try {
        const t = new Date(d);
        return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return Ve(() => {
      window.addEventListener("pointerdown", Ne), window.addEventListener("keydown", je);
    }), qe(() => {
      T(), window.removeEventListener("wheel", he), window.removeEventListener("pointerdown", Ne), window.removeEventListener("keydown", je);
    }), (d, t) => (a(), i("div", Ys, [
      e("section", {
        class: P(["default-shelf-area", { "is-collapsed": p.value, "drop-active": _.value === "uncategorized" }]),
        "data-gh-list-drop": n(F).UNCAT,
        onDragover: t[6] || (t[6] = (s) => fe(s, "uncategorized")),
        onDragleave: t[7] || (t[7] = (s) => Te(s, "uncategorized")),
        onDrop: t[8] || (t[8] = (s) => Se(s, "uncategorized"))
      }, [
        e("header", qs, [
          e("div", Ks, [
            t[23] || (t[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            t[24] || (t[24] = e("span", { class: "shelf-title" }, "未分类 Star 收藏", -1)),
            e("span", Xs, r(n(N).filteredUncatRepos.length), 1),
            t[25] || (t[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消本地分组归属；单排 10 个一页）", -1))
          ]),
          e("div", Qs, [
            n(N).filteredUncatRepos.length > n(ne).pageSize ? (a(), i("div", Js, [
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: n(N).uncatPage <= 1,
                title: "上一页",
                onClick: t[0] || (t[0] = //@ts-ignore
                (...s) => n(N).prevUncatPage && n(N).prevUncatPage(...s))
              }, "‹", 8, Zs),
              e("span", eo, r(n(N).uncatPage) + " / " + r(n(N).uncatTotalPages) + " 页", 1),
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: n(N).uncatPage >= n(N).uncatTotalPages,
                title: "下一页",
                onClick: t[1] || (t[1] = //@ts-ignore
                (...s) => n(N).nextUncatPage && n(N).nextUncatPage(...s))
              }, "›", 8, to)
            ])) : $("", !0),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              title: "刷新 Star 列表",
              disabled: g.value,
              "aria-busy": g.value,
              onClick: t[2] || (t[2] = (s) => n(F).refreshRepositories())
            }, [
              e("span", {
                class: P({ spinning: g.value })
              }, "🔄", 2),
              e("span", null, r(g.value ? "读取中…" : "刷新"), 1)
            ], 8, so),
            n(N).filteredUncatRepos.length ? (a(), i("button", {
              key: 1,
              type: "button",
              class: "shelf-toggle-btn",
              title: p.value ? "展开托盘" : "收起托盘",
              onClick: f
            }, r(p.value ? "展开 ▼" : "收起 ▲"), 9, oo)) : $("", !0)
          ])
        ]),
        m.value ? re((a(), i("div", no, [
          (a(), i(j, null, B(6, (s) => e("div", {
            key: "skel-shelf-" + s,
            class: "repo gh-card shelf-card skel-card"
          }, [...t[26] || (t[26] = [
            e("div", { class: "skel-line skel-title" }, null, -1),
            e("div", { class: "skel-line skel-desc" }, null, -1),
            e("div", { class: "skel-line skel-meta" }, null, -1)
          ])])), 64))
        ], 512)), [
          [ze, !p.value]
        ]) : n(N).filteredUncatRepos.length ? re((a(), i("div", {
          key: 1,
          ref_key: "shelfScrollRef",
          ref: l,
          class: "shelf-cards-scroll",
          onWheel: w
        }, [
          (a(!0), i(j, null, B(n(N).pagedUncatRepos, (s) => (a(), i("article", {
            key: s.full_name,
            class: P(["repo gh-card shelf-card", { "card-dragging": S.value?.full_name === s.full_name }]),
            draggable: "true",
            onClick: (o) => be(s),
            onDragstart: (o) => Oe(o, s, null),
            onDragend: me,
            onContextmenu: (o) => z(o, s, null)
          }, [
            e("button", {
              class: "fo-card-more",
              type: "button",
              "aria-label": "更多操作",
              title: "更多操作",
              onClick: q((o) => z(o, s, null), ["stop"])
            }, "⋮", 8, lo),
            e("div", io, [
              e("img", {
                class: "gh-owner-avatar",
                src: s.owner?.avatar_url || "assets/github-star.svg",
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer",
                onError: t[3] || (t[3] = (o) => o.target.src = "assets/github-star.svg")
              }, null, 40, ro),
              e("a", {
                href: s.html_url,
                target: "_blank",
                rel: "noreferrer",
                class: "name",
                title: s.full_name,
                onClick: t[4] || (t[4] = q(() => {
                }, ["stop"]))
              }, [
                e("span", co, r(s.owner?.login || s.full_name.split("/")[0]) + "/", 1),
                se(r(s.name), 1)
              ], 8, uo)
            ]),
            e("div", po, [
              e("div", ho, [
                t[27] || (t[27] = e("span", { class: "gh-badge-folder uncat" }, "＋ 未分类", -1)),
                s.topics && s.topics.length ? (a(), i(j, { key: 0 }, [
                  (a(!0), i(j, null, B(s.topics.slice(0, 2), (o) => (a(), i("span", {
                    key: o,
                    class: "gh-badge-topic-chip",
                    title: "Topic: " + o
                  }, " #" + r(o), 9, go))), 128)),
                  s.topics.length > 2 ? (a(), i("span", {
                    key: 0,
                    class: "gh-badge-topic-chip more",
                    title: s.topics.slice(2).map((o) => "#" + o).join(" ")
                  }, " +" + r(s.topics.length - 2), 9, mo)) : $("", !0)
                ], 64)) : $("", !0)
              ]),
              e("p", {
                class: "desc",
                title: s.description || ""
              }, r(s.description || "暂无描述"), 9, fo)
            ]),
            e("div", bo, [
              e("span", vo, "★ " + r(s.stargazers_count), 1),
              s.language ? (a(), i("span", yo, r(s.language), 1)) : $("", !0),
              e("span", wo, "更新 " + r(ve(s.updated_at)), 1)
            ])
          ], 42, ao))), 128)),
          n(N).uncatPage < n(N).uncatTotalPages ? (a(), i("div", {
            key: 0,
            class: "repo gh-card shelf-card shelf-next-card",
            title: "点击翻到下一页",
            onClick: t[5] || (t[5] = //@ts-ignore
            (...s) => n(N).nextUncatPage && n(N).nextUncatPage(...s))
          }, [
            e("div", _o, [
              t[28] || (t[28] = e("span", { class: "shelf-next-icon" }, "➔", -1)),
              t[29] || (t[29] = e("span", { class: "shelf-next-title" }, "下一页", -1)),
              e("span", ko, r(n(N).uncatPage + 1) + " / " + r(n(N).uncatTotalPages) + " 页", 1)
            ])
          ])) : $("", !0)
        ], 544)), [
          [ze, !p.value]
        ]) : p.value ? $("", !0) : (a(), i("p", $o, r(n(ue).searchQuery ? "没有匹配的未分类仓库" : "暂无未分类 Star 仓库"), 1))
      ], 42, Vs),
      e("div", {
        ref_key: "boardViewportRef",
        ref: u,
        class: "board-viewport",
        onWheel: Ge,
        onDragover: Fe
      }, [
        g.value && !n(N).lists.length ? (a(), i("div", Co, [
          (a(), i(j, null, B(4, (s) => e("div", {
            key: "skel-col-" + s,
            class: "board-column skel-column"
          }, [
            t[31] || (t[31] = e("div", { class: "column-header" }, [
              e("div", {
                class: "skel-line",
                style: { width: "120px", height: "16px" }
              })
            ], -1)),
            e("div", Go, [
              (a(), i(j, null, B(3, (o) => e("div", {
                key: "skel-col-card-" + o,
                class: "repo gh-card skel-card"
              }, [...t[30] || (t[30] = [
                e("div", { class: "skel-line skel-title" }, null, -1),
                e("div", { class: "skel-line skel-desc" }, null, -1),
                e("div", { class: "skel-line skel-meta" }, null, -1)
              ])])), 64))
            ])
          ])), 64))
        ])) : (a(), i("div", To, [
          (a(!0), i(j, null, B(n(N).lists, (s) => (a(), i("section", {
            key: s.id,
            class: P(["board-column list-column", {
              "drop-active": _.value === s.name,
              "col-dragging": Q.value === s.id,
              "col-hover-target": D.value === s.id
            }]),
            "data-gh-list-drop": s.name,
            onDragover: (o) => S.value ? fe(o, s.name) : V(o, s.id),
            onDragleave: (o) => S.value ? Te(o, s.name) : te(o, s.id),
            onDrop: (o) => S.value ? Se(o, s.name) : le(o, s.id)
          }, [
            e("header", Ro, [
              e("div", Mo, [
                t[32] || (t[32] = e("span", { class: "col-dot list-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: s.description || "本地分组: " + s.name
                }, " 📁 " + r(s.name), 9, xo),
                e("span", Do, r(n(N).getReposForList(s.name).length), 1)
              ]),
              e("div", Lo, [
                e("button", {
                  type: "button",
                  class: "col-more-btn col-drag-handle",
                  title: "按住拖动可调换分组位置；点击打开更多操作",
                  draggable: "true",
                  "aria-label": "分组操作与拖拽手柄",
                  onDragstart: (o) => E(o, s),
                  onDragend: I,
                  onClick: q((o) => Y(o, s), ["stop"])
                }, "⋮", 40, Ao)
              ])
            ]),
            e("div", Ho, [
              (a(!0), i(j, null, B(n(N).getReposForList(s.name), (o) => (a(), i("article", {
                key: o.full_name,
                class: P(["repo gh-card", { "card-dragging": S.value?.full_name === o.full_name }]),
                draggable: "true",
                onClick: (h) => be(o),
                onDragstart: (h) => Oe(h, o, s.name),
                onDragend: me,
                onContextmenu: (h) => z(h, o, s.name)
              }, [
                e("button", {
                  class: "fo-card-more",
                  type: "button",
                  "aria-label": "更多操作",
                  title: "更多操作",
                  onClick: q((h) => z(h, o, s.name), ["stop"])
                }, "⋮", 8, Eo),
                e("div", Po, [
                  e("img", {
                    class: "gh-owner-avatar",
                    src: o.owner?.avatar_url || "assets/github-star.svg",
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer",
                    onError: t[9] || (t[9] = (h) => h.target.src = "assets/github-star.svg")
                  }, null, 40, Io),
                  e("a", {
                    href: o.html_url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "name",
                    title: o.full_name,
                    onClick: t[10] || (t[10] = q(() => {
                    }, ["stop"]))
                  }, [
                    e("span", jo, r(o.owner?.login || o.full_name.split("/")[0]) + "/", 1),
                    se(r(o.name), 1)
                  ], 8, No)
                ]),
                e("div", Fo, [
                  e("div", Oo, [
                    e("span", {
                      class: "gh-badge-folder",
                      title: "属于列表: " + s.name
                    }, [
                      se(" 📁 " + r(s.name) + " ", 1),
                      e("span", {
                        class: "btn-inline-remove",
                        title: "从该列表中移出",
                        role: "button",
                        tabindex: "0",
                        onClick: q((h) => n(N).removeRepoFromList(o.full_name, s.name), ["stop"])
                      }, "×", 8, zo)
                    ], 8, Wo),
                    o.topics && o.topics.length ? (a(), i(j, { key: 0 }, [
                      (a(!0), i(j, null, B(o.topics.slice(0, 2), (h) => (a(), i("span", {
                        key: h,
                        class: "gh-badge-topic-chip",
                        title: "Topic: " + h
                      }, " #" + r(h), 9, Bo))), 128)),
                      o.topics.length > 2 ? (a(), i("span", {
                        key: 0,
                        class: "gh-badge-topic-chip more",
                        title: o.topics.slice(2).map((h) => "#" + h).join(" ")
                      }, " +" + r(o.topics.length - 2), 9, Yo)) : $("", !0)
                    ], 64)) : $("", !0)
                  ]),
                  e("p", {
                    class: "desc",
                    title: o.description || ""
                  }, r(o.description || "暂无描述"), 9, Vo)
                ]),
                e("div", qo, [
                  e("span", Ko, "★ " + r(o.stargazers_count), 1),
                  o.language ? (a(), i("span", Xo, r(o.language), 1)) : $("", !0),
                  e("span", Qo, "更新 " + r(ve(o.updated_at)), 1)
                ])
              ], 42, Uo))), 128)),
              n(N).getReposForList(s.name).length ? $("", !0) : (a(), i("div", Jo, [...t[33] || (t[33] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, So))), 128)),
          e("section", Zo, [
            e("button", {
              type: "button",
              class: "btn-trigger-add-col",
              onClick: t[11] || (t[11] = (s) => n(F).promptCreateFolder())
            }, [...t[34] || (t[34] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", null, "新建本地分组", -1)
            ])])
          ])
        ]))
      ], 544),
      (a(), ie(et, { to: "body" }, [
        O.visible && O.repo ? (a(), i("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Be({ left: `${O.x}px`, top: `${O.y}px` }),
          onClick: t[19] || (t[19] = q(() => {
          }, ["stop"])),
          onContextmenu: t[20] || (t[20] = q(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: P(["gh-menu-has-sub", { "is-active": J.value === "folder" }]),
            onMouseenter: t[14] || (t[14] = (s) => J.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: t[12] || (t[12] = q((s) => J.value = J.value === "folder" ? null : "folder", ["stop"]))
            }, [...t[35] || (t[35] = [
              e("span", null, "移动/加入本地分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: P(["gh-sub-flyout", { "flyout-left": W.value }]),
              onClick: t[13] || (t[13] = q(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: Pe
              }, " 设为未分类 "),
              (a(!0), i(j, null, B(n(N).lists, (s) => (a(), i("button", {
                key: s.id,
                class: P(["fo-cover-menu-item", { primary: n(Ye)(O.repo.full_name).includes(s.name) }]),
                type: "button",
                onClick: (o) => Ke(s.name)
              }, r(n(Ye)(O.repo.full_name).includes(s.name) ? "✓ " : "  ") + "📁 " + r(s.name), 11, en))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: t[15] || (t[15] = (s) => J.value = null),
            onClick: t[16] || (t[16] = (s) => be(O.repo))
          }, " 查看仓库详情 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: t[17] || (t[17] = (s) => J.value = null),
            onClick: Ie
          }, " 复制仓库链接 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: t[18] || (t[18] = (s) => J.value = null),
            onClick: Xe
          }, " 复制克隆命令 (git clone) ", 32)
        ], 36)) : $("", !0),
        U.visible && U.list ? (a(), i("div", {
          key: 1,
          class: "fo-cover-context-menu gh-list-col-menu",
          style: Be({ left: `${U.x}px`, top: `${U.y}px` }),
          onClick: t[21] || (t[21] = q(() => {
          }, ["stop"])),
          onContextmenu: t[22] || (t[22] = q(() => {
          }, ["prevent"]))
        }, [
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: oe
          }, " ✏️ 重命名分组 "),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: X
          }, " 📌 置顶此分组 "),
          e("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onClick: ae
          }, " 🗑️ 删除分组 ")
        ], 36)) : $("", !0)
      ]))
    ]));
  }
}), sn = /* @__PURE__ */ Ce(tn, [["__scopeId", "data-v-1d61d451"]]);
function on(v) {
  const c = v.subject?.url, u = v.repository?.html_url || "https://github.com";
  if (!c) return u;
  const l = v.subject?.type;
  return l === "Issue" ? c.replace("https://api.github.com/repos/", "https://github.com/") : l === "PullRequest" ? c.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : l === "Release" ? c.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : c.replace("https://api.github.com/repos/", "https://github.com/");
}
function nn(v) {
  try {
    const c = Date.now() - new Date(v).getTime();
    if (c < 6e4) return "刚刚";
    const u = Math.floor(c / 6e4);
    if (u < 60) return `${u} 分钟前`;
    const l = Math.floor(u / 60);
    if (l < 24) return `${l} 小时前`;
    const p = Math.floor(l / 24);
    return p < 30 ? `${p} 天前` : v.slice(5, 10);
  } catch {
    return "";
  }
}
const A = pe({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), we = {
  open() {
    A.isOpen = !0, (!A.items.length || Date.now() - A.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    A.isOpen = !1;
  },
  toggle() {
    A.isOpen ? this.close() : this.open();
  },
  setTab(v) {
    A.activeKind = v;
  },
  async refresh() {
    const v = F.token?.trim();
    if (!v) {
      A.items = [], A.unreadCount = 0, A.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    A.loading = !0, A.error = "";
    try {
      const c = {
        ...Ee(v),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, u = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: c
      });
      if (!u.ok)
        throw u.status === 401 ? new Error("GitHub Token 无效或已过期") : u.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${u.status})`);
      const l = await u.json();
      if (!Array.isArray(l))
        throw new Error("GitHub 返回数据异常");
      const p = l.map((f) => ({
        id: String(f.id),
        unread: !!f.unread,
        reason: String(f.reason || ""),
        updatedAt: f.updated_at,
        formattedTime: nn(f.updated_at),
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
        htmlUrl: on(f)
      }));
      A.items = p, A.unreadCount = p.filter((f) => f.unread).length, A.lastFetchedAt = Date.now();
    } catch (c) {
      console.warn("[GitHubNotifications] 读取失败:", c), A.error = c?.message || "网络请求异常";
    } finally {
      A.loading = !1;
    }
  },
  openTarget(v) {
    typeof window < "u" && window.open(v.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, y = pe({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function He(v) {
  try {
    const c = Date.now() - new Date(v).getTime(), u = Math.floor(c / 6e4);
    if (u < 1) return "刚刚";
    if (u < 60) return `${u}分钟前`;
    const l = Math.floor(u / 60);
    if (l < 24) return `${l}小时前`;
    const p = Math.floor(l / 24);
    if (p < 30) return `${p}天前`;
    const f = new Date(v);
    return `${f.getFullYear()}/${f.getMonth() + 1}/${f.getDate()}`;
  } catch {
    return "";
  }
}
function Ue(v) {
  switch (v) {
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
function an(v) {
  return v ? {
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
  }[v] || (v.startsWith(":") && v.endsWith(":") ? v.slice(1, -1) : v) : "";
}
function Je(v) {
  if (!Array.isArray(v)) return [];
  const c = {
    THUMBS_UP: "👍",
    THUMBS_DOWN: "👎",
    LAUGH: "😄",
    HOORAY: "🎉",
    CONFUSED: "😕",
    HEART: "❤️",
    ROCKET: "🚀",
    EYES: "👀"
  };
  return v.map((u) => ({
    emoji: c[u.content] || u.content,
    count: u.reactors?.totalCount || u.users?.totalCount || 0
  })).filter((u) => u.count > 0);
}
function lt(v) {
  if (!v || typeof v != "object") return [];
  const c = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, u = [];
  for (const [l, p] of Object.entries(c)) {
    const f = Number(v[l] || 0);
    f > 0 && u.push({ emoji: p, count: f });
  }
  return u;
}
async function it(v, c) {
  if (!v) return "";
  try {
    const u = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...Ee(c),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: v, mode: "gfm" })
    });
    if (u.ok)
      return await u.text();
  } catch {
  }
  return de.renderMarkdown(v);
}
async function ln(v, c, u, l) {
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
        ...Ee(l),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: p,
        variables: { owner: v, name: c, num: u }
      })
    });
    if (!f.ok) return null;
    const g = (await f.json())?.data?.repository?.discussion;
    if (!g) return null;
    let m = 0;
    const S = (g.comments?.nodes || []).map((x) => {
      const G = x.replies?.nodes || [];
      m += G.length;
      const M = G.map((T) => ({
        id: T.id,
        author: {
          login: T.author?.login || "匿名",
          avatarUrl: T.author?.avatarUrl || "",
          association: Ue(T.authorAssociation)
        },
        createdAt: T.createdAt,
        formattedTime: He(T.createdAt),
        body: T.body || "",
        bodyHtml: T.bodyHTML || (T.body ? de.renderMarkdown(T.body) : ""),
        reactions: Je(T.reactionGroups)
      }));
      return {
        id: x.id,
        author: {
          login: x.author?.login || "匿名",
          avatarUrl: x.author?.avatarUrl || "",
          association: Ue(x.authorAssociation)
        },
        createdAt: x.createdAt,
        formattedTime: He(x.createdAt),
        body: x.body || "",
        bodyHtml: x.bodyHTML || (x.body ? de.renderMarkdown(x.body) : "<p>（评论内容为空）</p>"),
        reactions: Je(x.reactionGroups),
        replies: M
      };
    }), R = g.body || "", _ = g.bodyHTML && g.bodyHTML.trim().length > 10 ? g.bodyHTML : R ? de.renderMarkdown(R) : "<p>（主贴内容为空）</p>";
    return {
      title: g.title,
      number: u,
      state: "discussion",
      category: g.category ? {
        name: g.category.name,
        emoji: an(g.category.emoji)
      } : void 0,
      author: {
        login: g.author?.login || "未知",
        avatarUrl: g.author?.avatarUrl || "",
        association: Ue(g.authorAssociation)
      },
      createdAt: g.createdAt,
      formattedTime: He(g.createdAt),
      body: R,
      bodyHtml: _,
      htmlUrl: g.url,
      commentsCount: g.comments?.totalCount || S.length,
      totalRepliesCount: m,
      comments: S,
      reactions: Je(g.reactionGroups)
    };
  } catch {
    return null;
  }
}
const Ze = {
  async open(v) {
    y.isOpen = !0, y.loading = !0, y.error = "", y.data = null, y.notificationItem = v;
    const c = F.token?.trim() || "", u = {
      ...Ee(c),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const l = v.subject?.url, p = v.subject?.type, f = v.repository?.fullName || "", [w, g] = f.split("/"), m = l?.match(/\/(\d+)$/), S = m ? Number(m[1]) : void 0;
      if (p === "Discussion" && w && g && S) {
        const R = await ln(w, g, S, c);
        if (R) {
          y.data = {
            notificationId: v.id,
            title: R.title || v.subject.title,
            number: S,
            state: "discussion",
            category: R.category,
            author: R.author || { login: v.repository.owner.login, avatarUrl: v.repository.owner.avatarUrl || "" },
            createdAt: R.createdAt || v.updatedAt,
            formattedTime: R.formattedTime || v.formattedTime,
            body: R.body || "",
            bodyHtml: R.bodyHtml || (R.body ? de.renderMarkdown(R.body) : ""),
            htmlUrl: R.htmlUrl || v.htmlUrl,
            commentsCount: R.commentsCount || 0,
            totalRepliesCount: R.totalRepliesCount || 0,
            comments: R.comments || [],
            reactions: R.reactions || [],
            repositoryFullName: f,
            type: "Discussion"
          };
          return;
        }
      }
      if (l) {
        const R = await fetch(l, { headers: u, cache: "no-store" });
        if (R.ok) {
          const _ = await R.json();
          let x = [];
          if (_.comments_url && _.comments > 0)
            try {
              const T = await fetch(`${_.comments_url}?per_page=50`, { headers: u, cache: "no-store" });
              if (T.ok) {
                const U = await T.json();
                Array.isArray(U) && (x = await Promise.all(
                  U.map(async (L) => {
                    const Y = L.body_html || (L.body ? await it(L.body, c) : "");
                    return {
                      id: L.id,
                      author: {
                        login: L.user?.login || "匿名",
                        avatarUrl: L.user?.avatar_url || "",
                        association: Ue(L.author_association)
                      },
                      createdAt: L.created_at,
                      formattedTime: He(L.created_at),
                      body: L.body || "",
                      bodyHtml: Y,
                      reactions: lt(L.reactions)
                    };
                  })
                ));
              }
            } catch (T) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", T);
            }
          const G = _.body || "";
          let M = _.body_html || "";
          !M && G && (M = await it(G, c)), !M && G && (M = de.renderMarkdown(G)), y.data = {
            notificationId: v.id,
            title: _.title || _.name || v.subject.title,
            number: _.number || S,
            state: _.merged ? "merged" : _.state || _.conclusion || "open",
            author: {
              login: _.user?.login || _.author?.login || v.repository.owner.login,
              avatarUrl: _.user?.avatar_url || _.author?.avatar_url || v.repository.owner.avatarUrl || "",
              association: Ue(_.author_association)
            },
            createdAt: _.created_at || _.published_at || v.updatedAt,
            formattedTime: He(_.created_at || _.published_at || v.updatedAt),
            body: G,
            bodyHtml: M || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: _.html_url || v.htmlUrl,
            commentsCount: typeof _.comments == "number" ? _.comments : x.length,
            comments: x,
            reactions: lt(_.reactions),
            repositoryFullName: f,
            type: p || "Issue"
          };
          return;
        }
      }
      y.data = {
        notificationId: v.id,
        title: v.subject.title,
        number: S,
        state: "open",
        author: {
          login: v.repository.owner.login,
          avatarUrl: v.repository.owner.avatarUrl || ""
        },
        createdAt: v.updatedAt,
        formattedTime: v.formattedTime,
        body: "",
        bodyHtml: "<p style='color: var(--muted);'>未能通过 API 读取到详细正文，请点击右上角「在网页打开」直达原帖。</p>",
        htmlUrl: v.htmlUrl,
        commentsCount: 0,
        comments: [],
        repositoryFullName: f,
        type: p || "通知"
      };
    } catch (l) {
      console.warn("[GitHubNotificationDetail] 读取异常:", l), y.error = l?.message || "网络请求异常";
    } finally {
      y.loading = !1;
    }
  },
  close() {
    y.isOpen = !1, y.data = null, y.error = "";
  }
}, rn = { class: "vue-gh-notification-panel-wrapper" }, un = { class: "gh-msg-header" }, cn = { class: "gh-msg-account" }, dn = { class: "gh-msg-subtitle" }, pn = {
  class: "gh-msg-tabs",
  role: "tablist"
}, hn = ["onClick"], gn = { class: "gh-msg-list" }, mn = {
  key: 0,
  class: "gh-msg-loading"
}, fn = {
  key: 1,
  class: "gh-msg-error"
}, bn = {
  key: 2,
  class: "gh-msg-empty"
}, vn = ["onClick"], yn = { class: "gh-card-indicator-col" }, wn = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, _n = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, kn = { class: "gh-card-type-col" }, $n = ["title"], Cn = { class: "gh-card-main-col" }, Gn = { class: "gh-card-repo-row" }, Tn = ["title"], Sn = { class: "gh-card-reason-tag" }, Rn = { class: "gh-card-time" }, Mn = ["title"], xn = { class: "gh-card-footer-row" }, Dn = { class: "gh-card-type-label" }, Ln = ["onClick"], An = /* @__PURE__ */ $e({
  __name: "GitHubNotificationPanel",
  setup(v) {
    const c = H(null), u = Z(() => [
      { kind: "all", label: "所有", count: A.items.length },
      { kind: "unread", label: "未读", count: A.items.filter((G) => G.unread).length },
      { kind: "mention", label: "提及", count: A.items.filter((G) => G.reason === "mention").length },
      { kind: "author", label: "作者", count: A.items.filter((G) => G.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: A.items.filter((G) => G.reason === "ci_activity" || G.subject.type === "CheckSuite").length }
    ]), l = Z(() => {
      const G = A.items;
      switch (A.activeKind) {
        case "unread":
          return G.filter((M) => M.unread);
        case "mention":
          return G.filter((M) => M.reason === "mention");
        case "author":
          return G.filter((M) => M.reason === "author");
        case "ci":
          return G.filter((M) => M.reason === "ci_activity" || M.subject.type === "CheckSuite");
        default:
          return G;
      }
    });
    function p(G, M) {
      if (M === "ci_activity" || G === "CheckSuite")
        return "⚡";
      switch (G) {
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
    function f(G) {
      switch (G) {
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
          return G || "通知";
      }
    }
    function w() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function g() {
      we.refresh();
    }
    function m() {
      we.close();
    }
    function S(G) {
      Ze.open(G);
    }
    function R(G) {
      we.openTarget(G);
    }
    function _(G) {
      if (!A.isOpen) return;
      const M = G.target;
      !c.value?.contains(M) && !M?.closest("#gh-header-msg-center-btn") && we.close();
    }
    function x(G) {
      G.key === "Escape" && A.isOpen && we.close();
    }
    return Ve(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", _), window.addEventListener("keydown", x));
    }), qe(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", _), window.removeEventListener("keydown", x));
    }), (G, M) => (a(), i("div", rn, [
      n(A).isOpen ? (a(), i("section", {
        key: 0,
        ref_key: "panelRef",
        ref: c,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: M[0] || (M[0] = q(() => {
        }, ["stop"]))
      }, [
        e("header", un, [
          e("div", cn, [
            M[2] || (M[2] = e("div", { class: "gh-msg-octo-avatar" }, [
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
              M[1] || (M[1] = e("h2", { class: "gh-msg-title" }, "GitHub 消息通知", -1)),
              e("p", dn, " 共 " + r(n(A).items.length) + " 条通知 · " + r(n(A).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          M[3] || (M[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: w
          }, " ↗ "),
          e("button", {
            type: "button",
            class: P(["gh-panel-btn", { "is-spinning": n(A).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: g
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: m
          }, " ✕ ")
        ]),
        e("nav", pn, [
          (a(!0), i(j, null, B(u.value, (T) => (a(), i("button", {
            key: T.kind,
            type: "button",
            class: P(["gh-msg-tab", { active: n(A).activeKind === T.kind }]),
            onClick: (U) => n(A).activeKind = T.kind
          }, [
            se(r(T.label) + " ", 1),
            T.count > 0 ? (a(), i("span", {
              key: 0,
              class: P(["gh-tab-pill", { "is-unread-pill": T.kind === "unread" }])
            }, r(T.count), 3)) : $("", !0)
          ], 10, hn))), 128))
        ]),
        e("div", gn, [
          n(A).loading && !n(A).items.length ? (a(), i("div", mn, [...M[4] || (M[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : n(A).error ? (a(), i("div", fn, [
            M[5] || (M[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, r(n(A).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: g
            }, "重试")
          ])) : l.value.length === 0 ? (a(), i("div", bn, [...M[6] || (M[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (a(!0), i(j, { key: 3 }, B(l.value, (T) => (a(), i("article", {
            key: T.id,
            class: P(["gh-notification-card", { "is-unread": T.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (U) => S(T)
          }, [
            e("div", yn, [
              T.unread ? (a(), i("span", wn)) : (a(), i("span", _n))
            ]),
            e("div", kn, [
              e("span", {
                class: "gh-type-badge",
                title: T.subject.type
              }, r(p(T.subject.type, T.reason)), 9, $n)
            ]),
            e("div", Cn, [
              e("div", Gn, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: T.repository.fullName
                }, r(T.repository.fullName), 9, Tn),
                e("span", Sn, r(f(T.reason)), 1),
                e("time", Rn, r(T.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: T.subject.title
              }, r(T.subject.title), 9, Mn),
              e("div", xn, [
                e("span", Dn, r(T.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: q((U) => R(T), ["stop"])
                }, "在网页打开 ↗", 8, Ln)
              ])
            ])
          ], 10, vn))), 128))
        ])
      ], 512)) : $("", !0)
    ]));
  }
}), Hn = /* @__PURE__ */ Ce(An, [["__scopeId", "data-v-4271efab"]]), Un = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, En = ["aria-label"], Pn = { class: "gh-modal-title-wrap" }, In = { class: "gh-modal-octo-icon" }, Nn = ["href"], jn = { class: "gh-owner" }, Fn = { class: "gh-name" }, On = {
  key: 1,
  class: "gh-modal-repo-name"
}, Wn = { class: "gh-name" }, zn = { class: "gh-modal-actions" }, Bn = { class: "gh-modal-content" }, Yn = {
  key: 0,
  class: "gh-content-loading"
}, Vn = {
  key: 1,
  class: "gh-content-error"
}, qn = { class: "gh-discussion-title-header" }, Kn = { class: "gh-discussion-h1" }, Xn = {
  key: 0,
  class: "gh-discussion-num"
}, Qn = { class: "gh-discussion-sub-meta" }, Jn = {
  key: 0,
  class: "gh-category-pill"
}, Zn = {
  key: 0,
  class: "cat-emoji"
}, ea = {
  key: 1,
  class: "gh-category-pill"
}, ta = { class: "gh-sub-author" }, sa = { class: "gh-sub-verb" }, oa = {
  key: 2,
  class: "gh-sub-comments-count"
}, na = { class: "gh-op-post-card" }, aa = { class: "gh-op-post-head" }, la = { class: "gh-op-author-left" }, ia = ["src"], ra = { class: "gh-op-meta" }, ua = { class: "gh-op-name-row" }, ca = { class: "gh-op-name" }, da = {
  key: 0,
  class: "gh-role-pill"
}, pa = { class: "gh-op-time" }, ha = ["innerHTML"], ga = {
  key: 0,
  class: "gh-reactions-bar"
}, ma = { class: "rx-emoji" }, fa = { class: "rx-count" }, ba = {
  key: 0,
  class: "gh-comments-block"
}, va = { class: "gh-comments-header" }, ya = { class: "gh-comments-count-pill" }, wa = { class: "gh-comments-feed" }, _a = { class: "gh-comment-head" }, ka = ["src"], $a = { class: "gh-comment-meta" }, Ca = { class: "gh-comment-author" }, Ga = {
  key: 0,
  class: "gh-role-pill small"
}, Ta = { class: "gh-comment-time" }, Sa = ["innerHTML"], Ra = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, Ma = { class: "rx-emoji" }, xa = { class: "rx-count" }, Da = {
  key: 1,
  class: "gh-comment-replies-thread"
}, La = { class: "gh-replies-thread-title" }, Aa = { class: "gh-reply-head" }, Ha = ["src"], Ua = { class: "gh-reply-meta" }, Ea = { class: "gh-reply-author" }, Pa = {
  key: 0,
  class: "gh-role-pill tiny"
}, Ia = { class: "gh-reply-time" }, Na = ["innerHTML"], ja = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, Fa = { class: "rx-emoji" }, Oa = { class: "rx-count" }, Wa = {
  key: 1,
  class: "gh-no-comments"
}, za = /* @__PURE__ */ $e({
  __name: "GitHubNotificationDetailDrawer",
  setup(v) {
    const c = H(null), u = H(null), l = H(null);
    let p = !1, f = 0, w = 0, g = 0, m = 0, S = () => {
    };
    const R = Z(() => (y.data?.repositoryFullName || y.notificationItem?.repository.fullName || "").split("/")[0] || ""), _ = Z(() => {
      const D = y.data?.repositoryFullName || y.notificationItem?.repository.fullName || "";
      return D.split("/")[1] || D;
    }), x = Z(() => {
      if (!y.data) return "";
      const D = y.data.bodyHtml?.trim() || "";
      if (D.length > 20) return D;
      const E = y.data.body?.trim() || "";
      return E.length > 0 ? de.renderMarkdown(E) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), G = Z(() => l.value ? {
      position: "fixed",
      left: `${l.value.x}px`,
      top: `${l.value.y}px`,
      transform: "none"
    } : {});
    ce(
      () => y.isOpen,
      (D) => {
        D && (l.value = null, tt(() => {
          u.value && (u.value.scrollTop = 0);
        }));
      }
    ), ce(
      () => y.data,
      (D) => {
        D && tt(() => {
          u.value && (u.value.scrollTop = 0);
        });
      }
    );
    function M(D) {
      if (D.target.closest("button, a, input")) return;
      S();
      const E = c.value;
      if (!E || !y.isOpen) return;
      p = !0;
      const I = E.getBoundingClientRect();
      g = I.left, m = I.top, f = D.clientX, w = D.clientY, l.value = { x: g, y: m };
      const V = (le) => {
        if (!p) return;
        const O = le.clientX - f, J = le.clientY - w;
        l.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, g + O)),
          y: Math.max(10, Math.min(window.innerHeight - 80, m + J))
        };
      }, te = () => {
        p = !1, window.removeEventListener("mousemove", V), window.removeEventListener("mouseup", te);
      };
      S = te, window.addEventListener("mousemove", V), window.addEventListener("mouseup", te);
    }
    function T() {
      Ze.close();
    }
    function U() {
      const D = y.data?.htmlUrl || y.notificationItem?.htmlUrl;
      D && typeof window < "u" && window.open(D, "_blank", "noopener,noreferrer");
    }
    function L(D) {
      const I = D.target?.closest("a");
      I && I.href && (D.preventDefault(), D.stopPropagation(), window.open(I.href, "_blank", "noopener,noreferrer"));
    }
    function Y() {
      y.notificationItem && Ze.open(y.notificationItem);
    }
    function oe(D) {
      switch (D) {
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
    function X(D) {
      switch (D) {
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
          return D || "通知详情";
      }
    }
    function ae(D) {
      switch (D) {
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
          return D || "";
      }
    }
    function Q(D) {
      D.key === "Escape" && y.isOpen && T();
    }
    return Ve(() => {
      window.addEventListener("keydown", Q);
    }), qe(() => {
      window.removeEventListener("keydown", Q), S();
    }), (D, E) => (a(), ie(et, { to: "body" }, [
      n(y).isOpen ? (a(), i("div", Un, [
        e("div", {
          ref_key: "windowRef",
          ref: c,
          class: "gh-nonmodal-window",
          style: Be(G.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": n(y).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: M
          }, [
            e("div", Pn, [
              e("span", In, r(oe(n(y).data?.type || n(y).notificationItem?.subject.type)), 1),
              n(y).data?.htmlUrl || n(y).notificationItem?.htmlUrl ? (a(), i("a", {
                key: 0,
                href: n(y).data?.htmlUrl || n(y).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", jn, r(R.value), 1),
                E[0] || (E[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", Fn, r(_.value), 1),
                E[1] || (E[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, Nn)) : (a(), i("span", On, [
                e("strong", Wn, r(n(y).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", zn, [
              n(y).data?.state ? (a(), i("span", {
                key: 0,
                class: P(["gh-detail-state-pill", n(y).data.state])
              }, r(ae(n(y).data.state)), 3)) : $("", !0),
              n(y).data?.htmlUrl || n(y).notificationItem?.htmlUrl ? (a(), i("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: U
              }, " 在网页打开 ↗ ")) : $("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: T
              }, " ✕ ")
            ])
          ], 32),
          e("div", Bn, [
            n(y).loading ? (a(), i("div", Yn, [
              E[2] || (E[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + r(n(y).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : n(y).error ? (a(), i("div", Vn, [
              E[3] || (E[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, r(n(y).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: Y
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: U
                }, "在 GitHub 打开 ↗")
              ])
            ])) : n(y).data ? (a(), i("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: u,
              class: "gh-detail-scrollable",
              onClick: L
            }, [
              e("div", qn, [
                e("h1", Kn, [
                  se(r(n(y).data.title) + " ", 1),
                  n(y).data.number ? (a(), i("span", Xn, "#" + r(n(y).data.number), 1)) : $("", !0)
                ]),
                e("div", Qn, [
                  n(y).data.category ? (a(), i("span", Jn, [
                    n(y).data.category.emoji ? (a(), i("span", Zn, r(n(y).data.category.emoji), 1)) : $("", !0),
                    e("span", null, r(n(y).data.category.name), 1)
                  ])) : (a(), i("span", ea, r(X(n(y).data.type)), 1)),
                  e("span", ta, r(n(y).data.author.login), 1),
                  e("span", sa, "发布于 " + r(n(y).data.formattedTime), 1),
                  n(y).data.commentsCount ? (a(), i("span", oa, [
                    se(" · " + r(n(y).data.commentsCount) + " 条讨论主题 ", 1),
                    n(y).data.totalRepliesCount ? (a(), i(j, { key: 0 }, [
                      se(" （含 " + r(n(y).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : $("", !0)
                  ])) : $("", !0)
                ])
              ]),
              e("article", na, [
                e("div", aa, [
                  e("div", la, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: n(y).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, ia),
                    e("div", ra, [
                      e("div", ua, [
                        e("strong", ca, r(n(y).data.author.login), 1),
                        n(y).data.author.association ? (a(), i("span", da, r(n(y).data.author.association), 1)) : $("", !0)
                      ]),
                      e("time", pa, r(n(y).data.formattedTime), 1)
                    ])
                  ]),
                  E[4] || (E[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                E[5] || (E[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: x.value
                }, null, 8, ha),
                n(y).data.reactions?.length ? (a(), i("div", ga, [
                  (a(!0), i(j, null, B(n(y).data.reactions, (I) => (a(), i("span", {
                    key: I.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", ma, r(I.emoji), 1),
                    e("span", fa, r(I.count), 1)
                  ]))), 128))
                ])) : $("", !0)
              ]),
              n(y).data.comments.length ? (a(), i("div", ba, [
                e("div", va, [
                  E[6] || (E[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", ya, [
                    se(r(n(y).data.commentsCount) + " 条主题 ", 1),
                    n(y).data.totalRepliesCount ? (a(), i(j, { key: 0 }, [
                      se(" · " + r(n(y).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : $("", !0)
                  ])
                ]),
                e("div", wa, [
                  (a(!0), i(j, null, B(n(y).data.comments, (I) => (a(), i("div", {
                    key: I.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", _a, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: I.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, ka),
                      e("div", $a, [
                        e("span", Ca, r(I.author.login), 1),
                        I.author.association ? (a(), i("span", Ga, r(I.author.association), 1)) : $("", !0),
                        e("time", Ta, r(I.formattedTime), 1)
                      ])
                    ]),
                    E[7] || (E[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: I.bodyHtml
                    }, null, 8, Sa),
                    I.reactions?.length ? (a(), i("div", Ra, [
                      (a(!0), i(j, null, B(I.reactions, (V) => (a(), i("span", {
                        key: V.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", Ma, r(V.emoji), 1),
                        e("span", xa, r(V.count), 1)
                      ]))), 128))
                    ])) : $("", !0),
                    I.replies?.length ? (a(), i("div", Da, [
                      e("div", La, [
                        e("span", null, "💬 " + r(I.replies.length) + " 条回复对话", 1)
                      ]),
                      (a(!0), i(j, null, B(I.replies, (V) => (a(), i("div", {
                        key: V.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", Aa, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: V.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, Ha),
                          e("div", Ua, [
                            e("strong", Ea, r(V.author.login), 1),
                            V.author.association ? (a(), i("span", Pa, r(V.author.association), 1)) : $("", !0),
                            e("time", Ia, r(V.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: V.bodyHtml
                        }, null, 8, Na),
                        V.reactions?.length ? (a(), i("div", ja, [
                          (a(!0), i(j, null, B(V.reactions, (te) => (a(), i("span", {
                            key: te.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", Fa, r(te.emoji), 1),
                            e("span", Oa, r(te.count), 1)
                          ]))), 128))
                        ])) : $("", !0)
                      ]))), 128))
                    ])) : $("", !0)
                  ]))), 128))
                ])
              ])) : (a(), i("div", Wa, [...E[8] || (E[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : $("", !0)
          ])
        ], 12, En)
      ])) : $("", !0)
    ]));
  }
}), Ba = /* @__PURE__ */ Ce(za, [["__scopeId", "data-v-d22ba06c"]]), Ya = [
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
], Va = ["inert"], qa = { class: "card-head" }, Ka = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, Xa = ["title"], Qa = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Ja = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, Za = ["placeholder"], el = ["title"], tl = { class: "gh-search-rule-icon" }, sl = { class: "gh-search-rule-text" }, ol = ["title"], nl = ["title"], al = { class: "gh-header-msg-label" }, ll = {
  key: 0,
  class: "gh-header-msg-badge"
}, il = { class: "gh-settings-anchor" }, rl = ["aria-expanded", "aria-label", "title"], ul = {
  key: 0,
  class: "muted small",
  role: "status"
}, cl = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, dl = { class: "gh-bili-layout" }, pl = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, hl = ["title"], gl = { class: "fo-sidebar-toggle-title" }, ml = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, fl = ["aria-expanded", "title"], bl = { class: "fo-sidebar-toggle-chevron" }, vl = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, yl = { class: "fo-sidebar-sub-wrap" }, wl = ["title"], _l = { class: "fo-sidebar-sub-main" }, kl = { class: "fo-sidebar-sub-text" }, $l = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Cl = ["title"], Gl = { class: "fo-sidebar-sub-main" }, Tl = { class: "fo-sidebar-sub-text" }, Sl = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Rl = ["title"], Ml = { class: "fo-sidebar-sub-main" }, xl = { class: "fo-sidebar-sub-text" }, Dl = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, Ll = ["title"], Al = { class: "fo-sidebar-sub-main" }, Hl = { class: "fo-sidebar-sub-text" }, Ul = { class: "gh-bili-sidebar-head" }, El = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, Pl = { style: { color: "var(--dim)", "font-size": "9.5px" } }, Il = ["title", "aria-label"], Nl = {
  class: "gh-bili-folder-list",
  id: "gh-folder-list"
}, jl = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, Fl = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, Ol = {
  id: "vue-github-repositories-root",
  style: { flex: "1", "min-height": "0", display: "flex", "flex-direction": "column" }
}, Wl = /* @__PURE__ */ $e({
  __name: "GitHubWorkspaceCard",
  setup(v) {
    const c = st(() => import("./GitHubSettingsModal-DBKxMMcI.js")), u = st(() => import("./LauncherBookGuideDialog-C33lWv1J.js")), { active: l } = dt("card-github", "/github.html");
    let p = 0, f = !1, w;
    const g = H(""), m = H("stars");
    ce(() => l.value && m.value === "stars", (W) => F.setAiViewActive(W), { immediate: !0, flush: "sync" });
    const S = H(!1), R = H("local"), _ = H(""), x = H(!1), G = H(!1);
    ce(l, (W) => {
      W || (G.value = !1);
    });
    const M = H(0);
    function T() {
      l.value && (x.value = !0, ++M.value);
    }
    const U = H(!1);
    ce(x, (W) => {
      W && (U.value = !0);
    });
    const L = H(null);
    let Y = 0;
    function oe(W) {
      m.value = W, W === "trending" ? nt.switchTab("trending") : nt.switchTab("stars");
    }
    function X() {
      m.value = "stars";
    }
    const ae = Z(() => [
      { id: "exact", icon: "🎯", name: k("search.rule.exact"), desc: k("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: k("search.rule.fuzzy"), desc: k("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: k("search.rule.topic"), desc: k("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: k("search.rule.smart"), desc: k("search.rule.smartDesc") }
    ]), Q = H(F.searchRule || "exact"), D = Z(() => ae.value.find((W) => W.id === Q.value) || ae.value[0]);
    function E() {
      const W = F.cycleSearchRule();
      Q.value = W;
    }
    const I = Z(() => R.value === "global" ? k("github.searchGlobalPlaceholder") : k("github.searchLocalPlaceholder", { rule: D.value.name }));
    function V() {
      clearTimeout(Y), !(!l.value || R.value !== "local") && (Y = window.setTimeout(() => F.setSearchQuery(_.value.trim().toLowerCase()), 180));
    }
    function te() {
      R.value = R.value === "local" ? "global" : "local", R.value === "local" && V();
    }
    function le() {
      _.value = "", clearTimeout(Y), F.resetLocalSearch();
    }
    function O() {
      const W = _.value.trim();
      R.value === "local" ? (clearTimeout(Y), F.setSearchQuery(W.toLowerCase())) : W && window.open(`https://github.com/search?q=${encodeURIComponent(W)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function J() {
      ++p, f = !0, g.value = "";
    }
    return ce(l, async (W) => {
      if (clearTimeout(Y), !W) return;
      const b = ++p;
      if ((!w || w.signal.aborted) && (w = new AbortController(), F.setRepositoryViewSignal(w.signal)), f) {
        await F.resumeRepositoryReads();
        return;
      }
      if (F.repos.length || F.loadingAllStars || F.loadingPage) {
        f = !0;
        return;
      }
      try {
        const z = await rt();
        if (b !== p || w.signal.aborted) return;
        f = !0, await F.loadGitHub(z.ghUser, z.ghToken);
      } catch {
        if (b !== p || w?.signal.aborted) return;
        f = !1, g.value = k("github.initError");
      }
    }, { immediate: !0, flush: "sync" }), ut(() => {
      F.setAiViewActive(!1), ++p, w?.abort(), clearTimeout(Y);
    }), (W, b) => (a(), i("section", {
      class: P(["card wide", { "card-fullscreen": n(wt).activeId === "card-github" }]),
      id: "card-github",
      inert: !n(l)
    }, [
      e("header", qa, [
        b[17] || (b[17] = e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }, null, -1)),
        b[18] || (b[18] = e("h2", null, "GitHub", -1)),
        b[19] || (b[19] = e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        }, null, -1)),
        e("div", Ka, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: q(O, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: R.value === "local" ? n(k)("github.searchScope.toGlobal") : n(k)("github.searchScope.toLocal"),
              onClick: te
            }, [
              e("span", Qa, r(R.value === "local" ? "⭐" : "🌐"), 1),
              e("span", Ja, r(R.value === "local" ? n(k)("github.searchScope.local") : n(k)("github.searchScope.global")), 1),
              b[13] || (b[13] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, Xa),
            re(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": b[0] || (b[0] = (z) => _.value = z),
              placeholder: I.value,
              autocomplete: "off",
              onInput: V
            }, null, 40, Za), [
              [Ae, _.value]
            ]),
            R.value === "local" ? (a(), i("button", {
              key: 0,
              type: "button",
              class: P(["gh-search-rule-btn", `rule-${D.value.id}`]),
              title: n(k)("github.ruleHint", { rule: D.value.name, desc: D.value.desc }),
              onClick: q(E, ["stop"])
            }, [
              e("span", tl, r(D.value.icon), 1),
              e("span", sl, r(D.value.name), 1)
            ], 10, el)) : $("", !0),
            re(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: n(k)("github.clearSearch"),
              onClick: le
            }, "✕", 8, ol), [
              [ze, _.value]
            ]),
            b[14] || (b[14] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          b[15] || (b[15] = ct('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-5db78e65><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-5db78e65><input type="checkbox" value="exact" checked data-v-5db78e65>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-5db78e65><input type="checkbox" value="loose" data-v-5db78e65>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-5db78e65><input type="checkbox" value="related" data-v-5db78e65>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-5db78e65><input type="checkbox" value="topic" data-v-5db78e65>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-5db78e65><input type="checkbox" value="readme" data-v-5db78e65>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-5db78e65></div>', 2))
        ]),
        e("button", {
          id: "gh-header-msg-center-btn",
          class: P(["gh-header-msg-btn", { "has-unread": n(A).unreadCount > 0, "is-active": n(A).isOpen }]),
          type: "button",
          title: n(A).unreadCount > 0 ? n(k)("github.header.msgUnread", { count: n(A).unreadCount }) : n(k)("github.header.msgCenter"),
          onClick: b[1] || (b[1] = (z) => n(we).toggle())
        }, [
          b[16] || (b[16] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
          e("span", al, r(n(k)("github.header.msg")), 1),
          n(A).unreadCount > 0 ? (a(), i("span", ll, r(n(A).unreadCount > 99 ? "99+" : n(A).unreadCount), 1)) : $("", !0)
        ], 10, nl),
        e("div", il, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: L,
            "aria-expanded": x.value,
            "aria-label": n(k)("github.settings"),
            class: "gh-head-settings-btn",
            title: n(k)("github.header.settings"),
            onClick: b[2] || (b[2] = (z) => x.value = !x.value)
          }, " ⚙️ ", 8, rl),
          U.value ? (a(), ie(n(c), {
            key: 0,
            visible: n(l) && x.value,
            anchor: L.value,
            "ai-request": M.value,
            onAccountReload: J,
            onClose: b[3] || (b[3] = (z) => x.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : $("", !0)
        ])
      ]),
      g.value ? (a(), i("p", ul, r(g.value), 1)) : $("", !0),
      e("div", cl, [
        e("div", dl, [
          e("aside", pl, [
            e("div", {
              class: P(["fo-sidebar-toggle-bar", { "is-collapsed": S.value }]),
              title: S.value ? n(k)("github.channel.toggleExpand") : n(k)("github.channel.toggleCollapse"),
              onClick: b[4] || (b[4] = (z) => S.value = !S.value)
            }, [
              e("div", gl, [
                b[20] || (b[20] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, r(n(k)("github.channel.channels")), 1),
                S.value ? (a(), i("span", ml, "3")) : $("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !S.value,
                title: S.value ? n(k)("github.expand") : n(k)("github.collapse")
              }, [
                e("span", null, r(S.value ? n(k)("github.expand") : n(k)("github.collapse")), 1),
                e("span", bl, r(S.value ? "▾" : "▴"), 1)
              ], 8, fl)
            ], 10, hl),
            S.value ? $("", !0) : (a(), i("div", vl, [
              e("div", yl, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: P(["fo-sidebar-sub-btn", { on: m.value === "stars" }]),
                  title: n(k)("github.channel.starsTitle"),
                  onClick: b[5] || (b[5] = (z) => oe("stars"))
                }, [
                  e("div", _l, [
                    b[21] || (b[21] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", kl, [
                      e("strong", null, r(n(k)("github.channel.stars")), 1),
                      e("small", null, r(n(k)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  b[22] || (b[22] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, wl)
              ]),
              e("div", $l, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: P(["fo-sidebar-sub-btn", { on: m.value === "trending" }]),
                  title: n(k)("github.channel.trendingTitle"),
                  onClick: b[6] || (b[6] = (z) => oe("trending"))
                }, [
                  e("div", Gl, [
                    b[23] || (b[23] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", Tl, [
                      e("strong", null, r(n(k)("github.channel.trending")), 1),
                      e("small", null, r(n(k)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  b[24] || (b[24] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, Cl)
              ]),
              e("div", Sl, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: P(["fo-sidebar-sub-btn", { on: m.value === "awesome" }]),
                  title: n(k)("github.channel.awesomeTitle"),
                  onClick: b[7] || (b[7] = (z) => oe("awesome"))
                }, [
                  e("div", Ml, [
                    b[25] || (b[25] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", xl, [
                      e("strong", null, r(n(k)("github.channel.awesome")), 1),
                      e("small", null, r(n(k)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  b[26] || (b[26] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, Rl)
              ]),
              e("div", Dl, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: P(["fo-sidebar-sub-btn", { on: m.value === "repos" }]),
                  title: n(k)("github.channel.reposTitle"),
                  onClick: b[8] || (b[8] = (z) => oe("repos"))
                }, [
                  e("div", Al, [
                    b[27] || (b[27] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", Hl, [
                      e("strong", null, r(n(k)("github.channel.repos")), 1),
                      e("small", null, r(n(k)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  b[28] || (b[28] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, Ll)
              ])
            ])),
            e("header", Ul, [
              e("div", null, [
                e("b", El, [
                  b[29] || (b[29] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  se(" " + r(n(k)("github.lists.title")), 1)
                ]),
                e("small", Pl, r(n(k)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: n(k)("github.lists.new"),
                "aria-label": n(k)("github.lists.new"),
                onClick: b[9] || (b[9] = (z) => n(F).promptCreateFolder())
              }, "＋", 8, Il)
            ]),
            e("nav", Nl, [
              Re(bt, {
                active: n(l),
                onSelect: X
              }, null, 8, ["active"])
            ])
          ]),
          e("section", jl, [
            m.value === "stars" && n(gt).accountConfigured === !1 ? (a(), ie(mt, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: b[10] || (b[10] = (z) => x.value = !0)
            })) : m.value === "stars" ? (a(), i(j, { key: 1 }, [
              e("header", Fl, [
                Re(vt, {
                  onOpenAiSettings: T,
                  onOpenGuide: b[11] || (b[11] = (z) => G.value = !0)
                })
              ]),
              e("div", Ol, [
                Re(sn, {
                  active: n(l) && m.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : m.value === "trending" ? (a(), ie(yt, { key: 2 })) : m.value === "awesome" ? (a(), ie(jt, { key: 3 })) : m.value === "repos" ? (a(), ie(Bs, {
              key: 4,
              active: n(l) && m.value === "repos"
            }, null, 8, ["active"])) : $("", !0)
          ])
        ])
      ]),
      G.value ? (a(), ie(n(u), {
        key: 1,
        open: G.value,
        title: "GitHub 使用手册",
        spreads: n(Ya),
        "help-selector": ".gh-github-help-btn",
        onClose: b[12] || (b[12] = (z) => G.value = !1)
      }, null, 8, ["open", "spreads"])) : $("", !0),
      Re(Hn),
      Re(Ba)
    ], 10, Va));
  }
}), ei = /* @__PURE__ */ Ce(Wl, [["__scopeId", "data-v-5db78e65"]]);
export {
  ei as default
};
