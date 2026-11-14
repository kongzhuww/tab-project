import { d as Me, o, e as i, i as e, l as ge, n as Ie, f as $, F as Y, g as K, A as F, t as a, u as t, h as Q, b as N, s as se, r as ve, w as me, B as et, x as tt, y as Qe, k as Xe, j as he, T as ut, z as Je, m as te, D as gt, K as Mt, p as Ae, H as mt, C as ft } from "./vendor-vue-BkY5-p5y.js";
import { u as Tt } from "./useCardActivity-Czd5WK9V.js";
import { F as kt, H as Oe, w as ce, I as Ze, t as V, R as vt, y as Rt, v as St, D as Dt, A as Lt } from "./search.service-DF5Rt2Wp.js";
import { A as At } from "./AccountSetupGuide-Bd0SUfNT.js";
import { g as Ct, G as xt, a as Et, b as bt } from "./main-DSMpLbio.js";
import Ht from "./GitHubTrending-CkbtiwcN.js";
import { _ as Te, t as G } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
import { i as Ut } from "./repo-group-inference-C5Imc1uu.js";
import { s as xe } from "./storage-cache.service-BYF2zxXX.js";
import { n as yt, o as It } from "./view-styles-yuz8wQEV.js";
import { m as fe } from "./core-utils-BHmA-Jjh.js";
const Nt = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], Pt = [
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
], Ot = { class: "gh-awesome-wrapper" }, Ft = { class: "gh-awesome-header" }, jt = { class: "gh-awesome-intro" }, Bt = { class: "gh-awesome-search-box" }, Wt = { class: "gh-awesome-pills" }, zt = ["onClick"], Yt = { class: "gh-awesome-grid" }, Vt = ["onClick"], qt = { class: "gh-awesome-card-head" }, Kt = { class: "gh-awesome-card-name" }, Xt = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, Qt = { class: "gh-awesome-desc" }, Jt = { class: "gh-awesome-footer" }, Zt = { class: "gh-awesome-tags" }, es = ["href"], ts = {
  key: 0,
  class: "gh-awesome-empty"
}, ss = /* @__PURE__ */ Me({
  __name: "GitHubAwesome",
  setup(b) {
    const l = N("all"), r = N(""), d = se(() => {
      const v = r.value.trim().toLowerCase(), A = l.value;
      return Pt.filter((f) => A === "all" || f.category === A ? v ? f.name.toLowerCase().includes(v) || f.title.toLowerCase().includes(v) || f.desc.toLowerCase().includes(v) || f.tags.some((k) => k.toLowerCase().includes(v)) : !0 : !1);
    });
    function m(v) {
      window.open(v, "_blank", "noreferrer");
    }
    return (v, A) => (o(), i("div", Ot, [
      e("header", Ft, [
        e("div", jt, [
          A[3] || (A[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", Bt, [
            ge(e("input", {
              "onUpdate:modelValue": A[0] || (A[0] = (f) => r.value = f),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [Ie, r.value]
            ]),
            r.value ? (o(), i("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: A[1] || (A[1] = (f) => r.value = "")
            }, "✕")) : $("", !0)
          ])
        ]),
        e("div", Wt, [
          (o(!0), i(Y, null, K(t(Nt), (f) => (o(), i("button", {
            key: f.id,
            type: "button",
            class: F(["gh-awesome-pill", { active: l.value === f.id }]),
            onClick: (w) => l.value = f.id
          }, [
            e("span", null, a(f.icon), 1),
            e("b", null, a(f.name), 1)
          ], 10, zt))), 128))
        ])
      ]),
      e("div", Yt, [
        (o(!0), i(Y, null, K(d.value, (f) => (o(), i("article", {
          key: f.id,
          class: "gh-awesome-card",
          onClick: (w) => m(f.url)
        }, [
          e("div", qt, [
            e("div", Kt, [
              e("strong", null, a(f.title), 1),
              e("small", null, a(f.name), 1)
            ]),
            e("span", Xt, "★ " + a(f.stars), 1)
          ]),
          e("p", Qt, a(f.desc), 1),
          e("div", Jt, [
            e("div", Zt, [
              (o(!0), i(Y, null, K(f.tags, (w) => (o(), i("span", {
                key: w,
                class: "gh-awesome-tag"
              }, a(w), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: f.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: A[2] || (A[2] = Q(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, es)
          ])
        ], 8, Vt))), 128)),
        d.value.length ? $("", !0) : (o(), i("div", ts, [...A[4] || (A[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), os = /* @__PURE__ */ Te(ss, [["__scopeId", "data-v-84728b47"]]), Ee = "gh_my_repos_cache_v1", He = "gh_my_repo_groups_v2", Ue = "gh_my_repo_groups_map_v2", M = ve({
  loading: !1,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});
function we(b) {
  return b.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
}
class $e {
  constructor() {
    this.abortController = null, this.inFlightPromise = null;
  }
  static getInstance() {
    return $e.instance || ($e.instance = new $e()), $e.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略，支持并发防抖与请求去重）
   */
  async load(l = !1) {
    if (!l && this.inFlightPromise)
      return this.inFlightPromise;
    l && (this.abortController?.abort(), this.inFlightPromise = null), this.abortController = new AbortController();
    const r = this.abortController.signal, d = (async () => {
      await this.loadPersistedGroups();
      const m = await xe.get(Ee);
      if (m && m.length ? this.hydrateRepos(m) : M.repos.length && this.hydrateRepos(M.repos), l || !M.repos.length) {
        M.loading = !0, M.errorMessage = "";
        try {
          await this.fetchRemote(r);
        } catch (A) {
          if (A.name === "AbortError") return;
          M.errorMessage = A.message || "获取个人仓库失败";
        } finally {
          M.loading = !1;
        }
      } else
        this.fetchRemote(r).catch(() => {
        });
    })();
    return this.inFlightPromise = d.finally(() => {
      this.inFlightPromise === d && (this.inFlightPromise = null);
    }), this.inFlightPromise;
  }
  async fetchRemote(l) {
    const { ghUser: r, ghToken: d } = await kt();
    if (!r && !d) {
      M.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    const m = Oe(d), v = [], A = /* @__PURE__ */ new Set();
    if (r)
      try {
        const w = `https://api.github.com/users/${encodeURIComponent(r)}/repos?type=owner&sort=updated&per_page=100`, k = await fetch(w, { method: "GET", headers: m, signal: l });
        if (k.ok) {
          const D = await k.json();
          if (Array.isArray(D))
            for (const T of D)
              T && T.id && !A.has(T.id) && (A.add(T.id), v.push(T));
        }
      } catch (w) {
        if (w.name === "AbortError") throw w;
      }
    if (d)
      try {
        const k = await fetch("https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100", { method: "GET", headers: m, signal: l });
        if (k.ok) {
          const D = await k.json();
          if (Array.isArray(D))
            for (const T of D)
              T && T.id && !A.has(T.id) && (A.add(T.id), v.push(T));
        }
      } catch (w) {
        if (w.name === "AbortError") throw w;
      }
    if (!v.length) {
      M.repos.length || (M.errorMessage = "未能读取到个人仓库，请检查网络或 GitHub 设置。");
      return;
    }
    const f = v.map((w) => {
      const k = w.full_name || `${w.owner?.login || r}/${w.name}`, D = w.name, T = M.repoGroupsMap[k] || M.repoGroupsMap[D] || M.repoGroupsMap[k.toLowerCase()] || M.repoGroupsMap[D.toLowerCase()] || [];
      return {
        id: w.id,
        name: w.name,
        fullName: k,
        description: w.description || "",
        isPrivate: !!w.private,
        isFork: !!w.fork,
        htmlUrl: w.html_url || `https://github.com/${r}/${w.name}`,
        language: w.language || null,
        stargazersCount: Number(w.stargazers_count) || 0,
        forksCount: Number(w.forks_count) || 0,
        openIssuesCount: Number(w.open_issues_count) || 0,
        topics: Array.isArray(w.topics) ? w.topics.map((x) => String(x).toLowerCase()) : [],
        localGroups: T,
        updatedAt: w.updated_at || "",
        pushedAt: w.pushed_at || "",
        defaultBranch: w.default_branch || "main"
      };
    });
    this.hydrateRepos(f), await xe.set(Ee, f, { ttlMs: 30 * 86400 * 1e3 });
  }
  hydrateRepos(l) {
    let r = !1;
    M.repos = l.map((d) => {
      const m = M.repoGroupsMap[d.fullName] || M.repoGroupsMap[d.name] || M.repoGroupsMap[d.fullName.toLowerCase()] || M.repoGroupsMap[d.name.toLowerCase()], v = d.localGroups && d.localGroups.length ? d.localGroups : null, A = Ut(d, M.customGroups), f = (m && m.length ? m : null) || v || A, w = f ? [...new Set(f.filter(Boolean))] : [];
      return w.length && (!M.repoGroupsMap[d.fullName] || !M.repoGroupsMap[d.fullName].length) && (M.repoGroupsMap[d.fullName] = w, r = !0), {
        ...d,
        localGroups: w
      };
    }), r && this.persistGroupsMap();
  }
  /**
   * 将仓库添加到本地自定义分组
   */
  async addRepoToGroup(l, r) {
    const d = we(r);
    d && (l.localGroups.includes(d) || l.localGroups.push(d), M.repoGroupsMap[l.fullName] = [...l.localGroups], await this.persistGroupsMap(), await xe.set(Ee, M.repos, { ttlMs: 30 * 86400 * 1e3 }));
  }
  /**
   * 将仓库从指定本地分组中移出
   */
  async removeRepoFromGroup(l, r) {
    l.localGroups = l.localGroups.filter((d) => d !== r), M.repoGroupsMap[l.fullName] = [...l.localGroups], await this.persistGroupsMap(), await xe.set(Ee, M.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  async moveRepoToGroup(l, r) {
    if (!r)
      l.localGroups = [];
    else {
      const d = we(r);
      if (!d) return;
      l.localGroups = [d];
    }
    M.repoGroupsMap[l.fullName] = [...l.localGroups], await this.persistGroupsMap(), await xe.set(Ee, M.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 新建一个本地分组板块
   */
  async createGroup(l) {
    const r = we(l);
    return r ? M.customGroups.includes(r) ? (alert(`分组「${r}」已存在。`), null) : (M.customGroups.push(r), await this.persistGroups(), r) : (alert("分组名称不能为空。"), null);
  }
  /**
   * 重命名本地分组
   */
  async renameGroup(l, r) {
    const d = we(r);
    return d ? l === d ? !0 : M.customGroups.includes(d) ? (alert(`已存在名为「${d}」的分组。`), !1) : (M.customGroups = M.customGroups.map((m) => m === l ? d : m), M.repos.forEach((m) => {
      m.localGroups.includes(l) && (m.localGroups = m.localGroups.map((v) => v === l ? d : v), M.repoGroupsMap[m.fullName] = [...m.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : (alert("新分组名称不能为空。"), !1);
  }
  /**
   * 删除本地分组
   */
  async deleteGroup(l) {
    const r = M.repos.filter((m) => m.localGroups.includes(l)).length, d = r > 0 ? `确定删除分组「${l}」吗？
该分组下的 ${r} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。` : `确定删除空分组「${l}」吗？`;
    return confirm(d) ? (M.customGroups = M.customGroups.filter((m) => m !== l), M.repos.forEach((m) => {
      m.localGroups.includes(l) && (m.localGroups = m.localGroups.filter((v) => v !== l), M.repoGroupsMap[m.fullName] = [...m.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : !1;
  }
  async loadPersistedGroups() {
    try {
      let l = null, r = null;
      if (typeof chrome < "u" && chrome.storage?.local) {
        const d = await chrome.storage.local.get([He, Ue]);
        l = d?.[He], r = d?.[Ue];
      }
      if (!l || !Array.isArray(l)) {
        const d = localStorage.getItem(He);
        d && (l = JSON.parse(d));
      }
      if (!r || typeof r != "object") {
        const d = localStorage.getItem(Ue);
        d && (r = JSON.parse(d));
      }
      Array.isArray(l) && (M.customGroups = l.map(we).filter(Boolean)), r && typeof r == "object" && (M.repoGroupsMap = r);
    } catch {
    }
  }
  async persistGroupsMap() {
    try {
      const l = { ...M.repoGroupsMap };
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Ue]: l }), localStorage.setItem(Ue, JSON.stringify(l));
    } catch {
    }
  }
  async persistGroups() {
    const l = Array.from(new Set(M.customGroups.map(we).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [He]: l }), localStorage.setItem(He, JSON.stringify(l));
    } catch {
    }
  }
}
const le = $e.getInstance(), ns = { class: "my-repos-workspace" }, as = {
  key: 0,
  class: "error-banner"
}, ls = { class: "shelf-header" }, rs = { class: "shelf-left" }, is = { class: "shelf-badge" }, us = { class: "shelf-right" }, cs = { class: "shelf-search-wrap" }, ds = ["disabled", "title"], ps = ["title"], hs = ["onDragstart", "onContextmenu"], gs = { class: "repo-card-head" }, ms = ["title", "onClick"], fs = {
  key: 0,
  class: "badge-repo-visibility private"
}, vs = {
  key: 1,
  class: "badge-repo-visibility fork"
}, bs = ["title"], ys = {
  key: 1,
  class: "repo-topics-row"
}, _s = { class: "repo-card-footer" }, ws = { class: "meta-left" }, ks = {
  key: 0,
  class: "meta-item lang"
}, Cs = { class: "meta-item" }, $s = {
  key: 1,
  class: "meta-item"
}, Gs = ["title"], Ms = { class: "board-columns-track" }, Ts = ["onDragover", "onDragleave", "onDrop"], Rs = { class: "column-header" }, Ss = {
  key: 0,
  class: "column-title-group"
}, Ds = ["title"], Ls = { class: "badge-count" }, As = {
  key: 1,
  class: "column-rename-group"
}, xs = ["onKeydown"], Es = ["onClick"], Hs = { class: "column-actions" }, Us = ["onClick"], Is = {
  key: 0,
  class: "col-popover-menu"
}, Ns = ["onClick"], Ps = ["onClick"], Os = { class: "column-cards-scroll" }, Fs = ["onDragstart", "onContextmenu"], js = { class: "repo-card-head" }, Bs = ["title", "onClick"], Ws = {
  key: 0,
  class: "badge-repo-visibility private"
}, zs = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Ys = ["title"], Vs = { class: "repo-topics-row" }, qs = { class: "topic-chip active-chip" }, Ks = ["onClick"], Xs = { class: "repo-card-footer" }, Qs = { class: "meta-left" }, Js = {
  key: 0,
  class: "meta-item lang"
}, Zs = { class: "meta-item" }, eo = {
  key: 1,
  class: "meta-item"
}, to = { class: "meta-date" }, so = {
  key: 0,
  class: "empty-column-placeholder"
}, oo = { class: "board-column new-column-slot" }, no = {
  key: 1,
  class: "new-column-composer"
}, ao = { class: "composer-actions" }, lo = ["onClick"], ro = /* @__PURE__ */ Me({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(b) {
    const l = b, r = N(""), d = N(!1), m = N(null), v = N(""), A = N(null), f = N(null), w = N(null), k = N(!1);
    function D() {
      k.value = !k.value;
    }
    function T(p) {
      const c = w.value;
      c && (Math.abs(p.deltaX) > Math.abs(p.deltaY) && p.deltaX !== 0 || p.deltaY !== 0 && (p.preventDefault(), c.scrollLeft += p.deltaY));
    }
    const x = N(null), R = N(null), L = N(null);
    let S = null, J = 0;
    const I = ve({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromGroup: null
    }), H = N(null), Z = N(!1);
    function oe() {
      I.visible = !1, H.value = null;
    }
    function ie(p, c, h) {
      p.preventDefault(), p.stopPropagation();
      let y = p.clientX, ne = p.clientY;
      y > window.innerWidth - 200 && (y = window.innerWidth - 210), ne > window.innerHeight - 240 && (ne = window.innerHeight - 245), I.x = y, I.y = ne, I.repo = c, I.fromGroup = h, I.visible = !0, H.value = "folder", Z.value = y > window.innerWidth - 380;
    }
    async function re() {
      const p = I.repo;
      oe(), p && await le.moveRepoToGroup(p, null);
    }
    async function E(p) {
      const c = I.repo;
      oe(), c && await le.moveRepoToGroup(c, p);
    }
    async function j() {
      const p = I.repo;
      if (oe(), !!p)
        try {
          await navigator.clipboard.writeText(p.htmlUrl), yt.show({
            appName: "GitHub",
            title: G("github.myRepos.copiedUrlTitle"),
            message: G("github.myRepos.copiedUrlMsg", { name: p.name })
          });
        } catch {
        }
    }
    async function B() {
      const p = I.repo;
      if (oe(), !!p)
        try {
          const c = `git clone ${p.htmlUrl}.git`;
          await navigator.clipboard.writeText(c), yt.show({
            appName: "GitHub",
            title: G("github.myRepos.copiedCloneTitle"),
            message: c
          });
        } catch {
        }
    }
    function P() {
      const p = I.repo;
      oe(), p && De(p.htmlUrl);
    }
    function z() {
      const p = I.repo;
      oe(), p && Ct.open({
        fullName: p.fullName,
        description: p.description || "",
        stars: p.stargazersCount,
        language: p.language || void 0,
        updated: p.pushedAt
      });
    }
    function ee(p) {
      p.target?.closest(".gh-repo-context-menu") || I.visible && oe();
    }
    function de(p) {
      p.key === "Escape" && I.visible && oe();
    }
    const ae = se(() => M.customGroups), q = se(() => {
      const p = M.searchQuery.trim().toLowerCase();
      return p ? M.repos.filter(
        (c) => c.name.toLowerCase().includes(p) || c.description.toLowerCase().includes(p) || c.localGroups.some((h) => h.toLowerCase().includes(p)) || c.topics.some((h) => h.toLowerCase().includes(p)) || c.language && c.language.toLowerCase().includes(p)
      ) : M.repos;
    }), C = se(() => q.value.filter((p) => !p.localGroups.length));
    function X(p) {
      return q.value.filter((c) => c.localGroups.includes(p));
    }
    async function Fe() {
      const p = r.value.trim();
      if (!p) return;
      await le.createGroup(p) && (r.value = "", d.value = !1);
    }
    function st(p) {
      A.value = p, v.value = p, m.value = null;
    }
    async function je(p) {
      const c = v.value.trim();
      if (!c || c === p) {
        A.value = null;
        return;
      }
      await le.renameGroup(p, c) && (A.value = null);
    }
    async function ot(p) {
      m.value = null, await le.deleteGroup(p);
    }
    async function nt(p, c) {
      await le.removeRepoFromGroup(p, c);
    }
    function Be(p) {
      const c = f.value;
      if (!c) return;
      const y = p.target?.closest(".column-cards-scroll");
      if (y && y.scrollHeight > y.clientHeight && !p.shiftKey && p.deltaX === 0) {
        const ne = y.scrollTop <= 0 && p.deltaY < 0, Ke = y.scrollTop + y.clientHeight >= y.scrollHeight - 1 && p.deltaY > 0;
        if (!ne && !Ke)
          return;
      }
      Math.abs(p.deltaX) > Math.abs(p.deltaY) && p.deltaX !== 0 || p.deltaY !== 0 && (p.preventDefault(), c.scrollLeft += p.deltaY);
    }
    function Re(p) {
      if (!x.value || !f.value) return;
      p.preventDefault();
      const c = p.deltaX !== 0 ? p.deltaX : p.deltaY;
      f.value.scrollLeft += c;
    }
    function We() {
      if (S !== null) return;
      const p = () => {
        f.value && J !== 0 ? (f.value.scrollLeft += J, S = requestAnimationFrame(p)) : be();
      };
      S = requestAnimationFrame(p);
    }
    function be() {
      S !== null && (cancelAnimationFrame(S), S = null), J = 0;
    }
    function pe(p) {
      if (!x.value || !f.value) return;
      const c = f.value.getBoundingClientRect(), h = 100;
      if (p > c.right - h) {
        const y = Math.min(1, Math.max(0.1, (p - (c.right - h)) / h));
        J = Math.round(y * 20), We();
      } else if (p < c.left + h) {
        const y = Math.min(1, Math.max(0.1, (c.left + h - p) / h));
        J = -Math.round(y * 20), We();
      } else
        be();
    }
    function ye(p) {
      x.value && (p.preventDefault(), pe(p.clientX));
    }
    function ze(p, c, h) {
      oe(), x.value = c, R.value = h, p.dataTransfer && (p.dataTransfer.effectAllowed = "move", p.dataTransfer.setData("text/plain", `${c.id}:${h}`)), window.addEventListener("wheel", Re, { passive: !1 });
    }
    function Se() {
      x.value = null, R.value = null, L.value = null, be(), window.removeEventListener("wheel", Re);
    }
    function Ye(p, c) {
      x.value && (p.preventDefault(), p.dataTransfer && (p.dataTransfer.dropEffect = "move"), L.value = c, pe(p.clientX));
    }
    function Ve(p, c) {
      const h = p.currentTarget, y = p.relatedTarget;
      h?.contains(y) || L.value === c && (L.value = null);
    }
    async function qe(p, c) {
      p.preventDefault();
      const h = x.value, y = R.value;
      Se(), h && (c === "default" ? y && y !== "default" ? await le.removeRepoFromGroup(h, y) : await le.moveRepoToGroup(h, null) : (await le.addRepoToGroup(h, c), y && y !== "default" && y !== c && await le.removeRepoFromGroup(h, y)));
    }
    function De(p) {
      window.open(p, "_blank", "noopener,noreferrer");
    }
    function Le(p) {
      if (!p) return "";
      try {
        const c = new Date(p);
        return `${c.getFullYear()}-${String(c.getMonth() + 1).padStart(2, "0")}-${String(c.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return me(
      () => l.active,
      (p) => {
        oe(), p && le.load();
      }
    ), et(() => {
      window.addEventListener("pointerdown", ee), window.addEventListener("keydown", de), le.load();
    }), tt(() => {
      be(), window.removeEventListener("wheel", Re), window.removeEventListener("pointerdown", ee), window.removeEventListener("keydown", de);
    }), (p, c) => (o(), i("div", ns, [
      t(M).errorMessage ? (o(), i("div", as, [
        e("span", null, "⚠️ " + a(t(M).errorMessage), 1),
        e("button", {
          type: "button",
          class: "btn-retry",
          onClick: c[0] || (c[0] = (h) => t(le).load(!0))
        }, "重试")
      ])) : $("", !0),
      e("section", {
        class: F(["default-shelf-area", { "is-collapsed": k.value, "drop-active": L.value === "default" }]),
        onDragover: c[4] || (c[4] = (h) => Ye(h, "default")),
        onDragleave: c[5] || (c[5] = (h) => Ve(h, "default")),
        onDrop: c[6] || (c[6] = (h) => qe(h, "default"))
      }, [
        e("header", ls, [
          e("div", rs, [
            c[23] || (c[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            c[24] || (c[24] = e("span", { class: "shelf-title" }, "未分类仓库", -1)),
            e("span", is, a(C.value.length), 1),
            c[25] || (c[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）", -1))
          ]),
          e("div", us, [
            e("div", cs, [
              c[26] || (c[26] = e("span", { class: "search-icon" }, "🔍", -1)),
              ge(e("input", {
                "onUpdate:modelValue": c[1] || (c[1] = (h) => t(M).searchQuery = h),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索我的仓库名称、简介或语言…"
              }, null, 512), [
                [Ie, t(M).searchQuery]
              ]),
              t(M).searchQuery ? (o(), i("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: c[2] || (c[2] = (h) => t(M).searchQuery = "")
              }, "✕")) : $("", !0)
            ]),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              disabled: t(M).loading,
              title: t(G)("github.myRepos.refreshBtnTitle"),
              onClick: c[3] || (c[3] = (h) => t(le).load(!0))
            }, [
              e("span", {
                class: F({ spinning: t(M).loading })
              }, "🔄", 2),
              e("span", null, a(t(M).loading ? t(G)("github.myRepos.refreshing") : t(G)("common.refresh")), 1)
            ], 8, ds),
            C.value.length ? (o(), i("button", {
              key: 0,
              type: "button",
              class: "shelf-toggle-btn",
              title: k.value ? t(G)("github.myRepos.expandShelf") : t(G)("github.myRepos.collapseShelf"),
              onClick: D
            }, a(k.value ? t(G)("github.myRepos.expandBtn") : t(G)("github.myRepos.collapseBtn")), 9, ps)) : $("", !0)
          ])
        ]),
        C.value.length ? ge((o(), i("div", {
          key: 0,
          ref_key: "shelfScrollRef",
          ref: w,
          class: "shelf-cards-scroll",
          onWheel: T
        }, [
          (o(!0), i(Y, null, K(C.value, (h) => (o(), i("div", {
            key: h.id,
            class: F(["repo-card shelf-card", { "card-dragging": x.value?.id === h.id }]),
            draggable: "true",
            onDragstart: (y) => ze(y, h, "default"),
            onDragend: Se,
            onContextmenu: (y) => ie(y, h, "default")
          }, [
            e("div", gs, [
              e("span", {
                class: "repo-name",
                title: h.fullName,
                onClick: (y) => De(h.htmlUrl)
              }, a(h.name), 9, ms),
              h.isPrivate ? (o(), i("span", fs, "私有")) : $("", !0),
              h.isFork ? (o(), i("span", vs, "Fork")) : $("", !0)
            ]),
            h.description ? (o(), i("p", {
              key: 0,
              class: "repo-desc",
              title: h.description
            }, a(h.description), 9, bs)) : $("", !0),
            h.topics.length ? (o(), i("div", ys, [
              (o(!0), i(Y, null, K(h.topics, (y) => (o(), i("span", {
                key: y,
                class: "topic-chip-tag",
                title: "GitHub 远端引流标签"
              }, " #" + a(y), 1))), 128))
            ])) : $("", !0),
            e("div", _s, [
              e("div", ws, [
                h.language ? (o(), i("span", ks, [
                  c[27] || (c[27] = e("span", { class: "lang-color" }, null, -1)),
                  te(a(h.language), 1)
                ])) : $("", !0),
                e("span", Cs, "⭐ " + a(h.stargazersCount), 1),
                h.forksCount ? (o(), i("span", $s, "🍴 " + a(h.forksCount), 1)) : $("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + h.updatedAt
              }, a(Le(h.pushedAt || h.updatedAt)), 9, Gs)
            ])
          ], 42, hs))), 128))
        ], 544)), [
          [Qe, !k.value]
        ]) : $("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: f,
        class: "board-viewport",
        onWheel: Be,
        onDragover: ye
      }, [
        e("div", Ms, [
          (o(!0), i(Y, null, K(ae.value, (h) => (o(), i("section", {
            key: h,
            class: F(["board-column topic-column", { "drop-active": L.value === h }]),
            onDragover: (y) => Ye(y, h),
            onDragleave: (y) => Ve(y, h),
            onDrop: (y) => qe(y, h)
          }, [
            e("header", Rs, [
              A.value !== h ? (o(), i("div", Ss, [
                c[28] || (c[28] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "自定义分组: " + h
                }, " 📁 " + a(h), 9, Ds),
                e("span", Ls, a(X(h).length), 1)
              ])) : (o(), i("div", As, [
                ge(e("input", {
                  "onUpdate:modelValue": c[7] || (c[7] = (y) => v.value = y),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    Xe((y) => je(h), ["enter"]),
                    c[8] || (c[8] = Xe((y) => A.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, xs), [
                  [Ie, v.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (y) => je(h)
                }, "✓", 8, Es),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: c[9] || (c[9] = (y) => A.value = null)
                }, "✕")
              ])),
              e("div", Hs, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "分组操作",
                  onClick: (y) => m.value = m.value === h ? null : h
                }, "•••", 8, Us),
                m.value === h ? (o(), i("div", Is, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (y) => st(h)
                  }, " 重命名分组 ", 8, Ns),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (y) => ot(h)
                  }, " 删除分组 ", 8, Ps)
                ])) : $("", !0)
              ])
            ]),
            e("div", Os, [
              (o(!0), i(Y, null, K(X(h), (y) => (o(), i("div", {
                key: y.id,
                class: F(["repo-card", { "card-dragging": x.value?.id === y.id }]),
                draggable: "true",
                onDragstart: (ne) => ze(ne, y, h),
                onDragend: Se,
                onContextmenu: (ne) => ie(ne, y, h)
              }, [
                e("div", js, [
                  e("span", {
                    class: "repo-name",
                    title: y.fullName,
                    onClick: (ne) => De(y.htmlUrl)
                  }, a(y.name), 9, Bs),
                  y.isPrivate ? (o(), i("span", Ws, "私有")) : $("", !0),
                  y.isFork ? (o(), i("span", zs, "Fork")) : $("", !0)
                ]),
                y.description ? (o(), i("p", {
                  key: 0,
                  class: "repo-desc",
                  title: y.description
                }, a(y.description), 9, Ys)) : $("", !0),
                e("div", Vs, [
                  e("span", qs, [
                    te(" 📁 " + a(h) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从该分组移出",
                      onClick: Q((ne) => nt(y, h), ["stop"])
                    }, "✕", 8, Ks)
                  ]),
                  (o(!0), i(Y, null, K(y.topics, (ne) => (o(), i("span", {
                    key: ne,
                    class: "topic-chip-tag",
                    title: "GitHub 远端引流标签"
                  }, " #" + a(ne), 1))), 128))
                ]),
                e("div", Xs, [
                  e("div", Qs, [
                    y.language ? (o(), i("span", Js, [
                      c[29] || (c[29] = e("span", { class: "lang-color" }, null, -1)),
                      te(a(y.language), 1)
                    ])) : $("", !0),
                    e("span", Zs, "⭐ " + a(y.stargazersCount), 1),
                    y.forksCount ? (o(), i("span", eo, "🍴 " + a(y.forksCount), 1)) : $("", !0)
                  ]),
                  e("span", to, a(Le(y.pushedAt || y.updatedAt)), 1)
                ])
              ], 42, Fs))), 128)),
              X(h).length ? $("", !0) : (o(), i("div", so, [...c[30] || (c[30] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, Ts))), 128)),
          e("section", oo, [
            d.value ? (o(), i("div", no, [
              c[32] || (c[32] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建分组板块"),
                e("small", null, "支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics")
              ], -1)),
              ge(e("input", {
                "onUpdate:modelValue": c[11] || (c[11] = (h) => r.value = h),
                type: "text",
                placeholder: "输入分组名称（如：前端工具、深度学习）",
                class: "composer-input",
                onKeydown: [
                  Xe(Fe, ["enter"]),
                  c[12] || (c[12] = Xe((h) => d.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [Ie, r.value]
              ]),
              e("div", ao, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: Fe
                }, "创建"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: c[13] || (c[13] = (h) => d.value = !1)
                }, a(t(G)("common.cancel")), 1)
              ])
            ])) : (o(), i("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: c[10] || (c[10] = (h) => d.value = !0)
            }, [...c[31] || (c[31] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建分组板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (o(), he(ut, { to: "body" }, [
        I.visible && I.repo ? (o(), i("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Je({ left: `${I.x}px`, top: `${I.y}px` }),
          onClick: c[21] || (c[21] = Q(() => {
          }, ["stop"])),
          onContextmenu: c[22] || (c[22] = Q(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: F(["gh-menu-has-sub", { "is-active": H.value === "folder" }]),
            onMouseenter: c[16] || (c[16] = (h) => H.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: c[14] || (c[14] = Q((h) => H.value = H.value === "folder" ? null : "folder", ["stop"]))
            }, [...c[33] || (c[33] = [
              e("span", null, "移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: F(["gh-sub-flyout", { "flyout-left": Z.value }]),
              onClick: c[15] || (c[15] = Q(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: F(["fo-cover-menu-item", { primary: !I.repo.localGroups.length }]),
                type: "button",
                onClick: re
              }, a(I.repo.localGroups.length ? "  " : "✓ ") + "设为未分类 ", 3),
              (o(!0), i(Y, null, K(ae.value, (h) => (o(), i("button", {
                key: h,
                class: F(["fo-cover-menu-item", { primary: I.repo.localGroups.includes(h) }]),
                type: "button",
                onClick: (y) => E(h)
              }, a(I.repo.localGroups.includes(h) ? "✓ " : "  ") + "📁 " + a(h), 11, lo))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[17] || (c[17] = (h) => H.value = null),
            onClick: j
          }, a(t(G)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[18] || (c[18] = (h) => H.value = null),
            onClick: B
          }, a(t(G)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[19] || (c[19] = (h) => H.value = null),
            onClick: z
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[20] || (c[20] = (h) => H.value = null),
            onClick: P
          }, a(t(G)("github.myRepos.openInGitHub")), 33)
        ], 36)) : $("", !0)
      ]))
    ]));
  }
}), io = /* @__PURE__ */ Te(ro, [["__scopeId", "data-v-f77c8971"]]), ue = ve({
  uncatPage: 1,
  pageSize: 10
});
class Ge {
  static getInstance() {
    return Ge.instance || (Ge.instance = new Ge()), Ge.instance;
  }
  nextUncatPage() {
    this.uncatPage < this.uncatTotalPages && ue.uncatPage++;
  }
  prevUncatPage() {
    ue.uncatPage > 1 && ue.uncatPage--;
  }
  setUncatPage(l) {
    const r = Math.max(1, Math.min(l, this.uncatTotalPages));
    ue.uncatPage = r;
  }
  get uncatPage() {
    return ue.uncatPage;
  }
  get uncatTotalPages() {
    const l = this.filteredUncatRepos.length;
    return Math.max(1, Math.ceil(l / ue.pageSize));
  }
  /**
   * 未分类的所有 Star 仓库（带搜索过滤）
   */
  get filteredUncatRepos() {
    const l = ce.searchQuery.trim().toLowerCase(), r = ce.repos.filter((d) => Ze(d.full_name).length === 0);
    return l ? r.filter(
      (d) => d.full_name.toLowerCase().includes(l) || d.description && d.description.toLowerCase().includes(l) || d.language && d.language.toLowerCase().includes(l) || d.topics && d.topics.some((m) => m.toLowerCase().includes(l))
    ) : r;
  }
  /**
   * 当前页切片的 10 个未分类 Star 仓库
   */
  get pagedUncatRepos() {
    const l = this.filteredUncatRepos, d = (Math.min(ue.uncatPage, this.uncatTotalPages) - 1) * ue.pageSize;
    return l.slice(d, d + ue.pageSize);
  }
  /**
   * 各个本地分组板块列表（根据当前激活的大分组标签过滤）
   */
  get lists() {
    const l = ce.activeSection || "默认";
    return ce.lists.filter((r) => (r.section || "默认") === l);
  }
  /**
   * 获取归属于指定 GitHub List 的 Star 仓库（带搜索过滤）
   */
  getReposForList(l) {
    const r = ce.searchQuery.trim().toLowerCase(), d = ce.repos.filter((m) => Ze(m.full_name).includes(l));
    return r ? d.filter(
      (m) => m.full_name.toLowerCase().includes(r) || m.description && m.description.toLowerCase().includes(r) || m.language && m.language.toLowerCase().includes(r) || m.topics && m.topics.some((v) => v.toLowerCase().includes(r))
    ) : d;
  }
  /**
   * 拖拽归入指定 List（若 target 为 'uncategorized' 则从所有 List 移出）
   */
  async moveRepoToList(l, r) {
    await V.dropRepositoryIntoFolder(l, r);
  }
  /**
   * 从指定 List 移出仓库
   */
  async removeRepoFromList(l, r) {
    await V.toggleRepoList(l, r);
  }
}
const W = Ge.getInstance(), ke = {
  mode: "idle",
  activeDragRepo: null,
  activeDragFromList: null,
  hoverTargetColumn: null,
  draggingColumnId: null,
  hoverColumnId: null,
  repoMenu: null,
  columnMenu: null
};
class uo {
  constructor() {
    this._state = { ...ke }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.githubStarsBoard = this);
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
  subscribe(l) {
    return this._listeners.add(l), () => {
      this._listeners.delete(l);
    };
  }
  _setState(l) {
    this._state = l;
    for (const r of this._listeners)
      r(l);
  }
  send(l) {
    const r = this._state;
    switch (l.type) {
      case "START_DRAG_REPO":
        return this._setState({
          mode: "dragging_repo",
          activeDragRepo: l.repo,
          activeDragFromList: l.fromList,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: null
        }), !0;
      case "HOVER_TARGET_COLUMN":
        return r.mode === "dragging_repo" ? (this._setState({
          ...r,
          hoverTargetColumn: l.columnId
        }), !0) : !1;
      case "END_DRAG_REPO":
        return r.mode === "dragging_repo" ? (this._setState({ ...ke }), !0) : !1;
      case "START_DRAG_COLUMN":
        return this._setState({
          mode: "dragging_column",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: l.columnId,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: null
        }), !0;
      case "HOVER_COLUMN_REORDER":
        return r.mode === "dragging_column" ? (this._setState({
          ...r,
          hoverColumnId: l.columnId
        }), !0) : !1;
      case "END_DRAG_COLUMN":
        return r.mode === "dragging_column" ? (this._setState({ ...ke }), !0) : !1;
      case "OPEN_REPO_MENU":
        return this._setState({
          mode: "repo_context_menu",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: l.payload,
          columnMenu: null
        }), !0;
      case "CLOSE_REPO_MENU":
        return r.mode === "repo_context_menu" ? (this._setState({ ...ke }), !0) : !1;
      case "OPEN_COLUMN_MENU":
        return this._setState({
          mode: "column_menu",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: l.payload
        }), !0;
      case "CLOSE_COLUMN_MENU":
        return r.mode === "column_menu" ? (this._setState({ ...ke }), !0) : !1;
      case "RESET_IDLE":
        return this._setState({ ...ke }), !0;
      default:
        return !1;
    }
  }
}
const co = { class: "stars-board-workspace" }, po = ["data-gh-list-drop"], ho = { class: "shelf-header" }, go = { class: "shelf-left" }, mo = { class: "shelf-badge" }, fo = { class: "shelf-right" }, vo = {
  key: 0,
  class: "shelf-pager"
}, bo = ["disabled"], yo = { class: "pager-text" }, _o = ["disabled"], wo = ["disabled", "aria-busy"], ko = ["title"], Co = {
  key: 0,
  class: "shelf-cards-scroll"
}, $o = ["onClick", "onDragstart", "onContextmenu"], Go = ["onClick"], Mo = { class: "gh-card-head" }, To = ["src"], Ro = ["href", "title"], So = { class: "owner" }, Do = { class: "gh-card-body" }, Lo = { class: "gh-card-badges" }, Ao = ["title"], xo = ["title"], Eo = ["title"], Ho = { class: "meta" }, Uo = { class: "gh-stars" }, Io = {
  key: 0,
  class: "gh-lang"
}, No = { class: "gh-updated" }, Po = { class: "shelf-next-content" }, Oo = { class: "shelf-next-sub" }, Fo = {
  key: 2,
  class: "shelf-empty",
  role: "status"
}, jo = {
  key: 0,
  class: "gh-drilldown-header"
}, Bo = { class: "gh-drilldown-current" }, Wo = { class: "gh-drilldown-sub-count" }, zo = {
  key: 0,
  class: "board-columns-track"
}, Yo = { class: "column-cards-scroll" }, Vo = {
  key: 1,
  class: "board-columns-track"
}, qo = ["data-gh-list-drop", "onDragover", "onDragleave", "onDrop"], Ko = ["title"], Xo = ["onClick"], Qo = ["title"], Jo = {
  key: 0,
  class: "col-pinned-icon",
  title: "已置顶分组"
}, Zo = { class: "badge-count" }, en = {
  key: 1,
  class: "col-sub-badge",
  title: "点击下钻查看所有子分组"
}, tn = { class: "column-actions" }, sn = ["onDragstart", "onClick"], on = { class: "column-cards-scroll" }, nn = ["onClick", "onDragstart", "onContextmenu"], an = ["onClick"], ln = { class: "gh-card-head" }, rn = ["src"], un = ["href", "title"], cn = { class: "owner" }, dn = { class: "gh-card-body" }, pn = { class: "gh-card-badges" }, hn = ["title"], gn = ["onClick"], mn = ["title"], fn = ["title"], vn = ["title"], bn = { class: "meta" }, yn = { class: "gh-stars" }, _n = {
  key: 0,
  class: "gh-lang"
}, wn = { class: "gh-updated" }, kn = {
  key: 0,
  class: "empty-column-dropzone"
}, Cn = { class: "board-column add-column-panel" }, $n = ["title"], Gn = ["onClick"], Mn = /* @__PURE__ */ Me({
  __name: "GitHubStarsBoard",
  props: {
    active: { type: Boolean }
  },
  setup(b) {
    const l = b, r = N(null), d = N(null), m = N(!1);
    function v() {
      m.value = !m.value;
    }
    function A(s) {
      const n = d.value;
      n && (Math.abs(s.deltaX) > Math.abs(s.deltaY) && s.deltaX !== 0 || s.deltaY !== 0 && (s.preventDefault(), n.scrollLeft += s.deltaY));
    }
    const f = se(() => ce.loading), w = se(() => f.value && !ce.repos.length), k = N(null);
    function D(s) {
      if (!s) return null;
      const n = s.match(/^(.+?)[/／](.+)$/);
      if (!n) return null;
      const u = n[1].trim(), g = n[2].trim();
      return !u || !g ? null : { parentPrefix: u, childName: g };
    }
    function T(s) {
      const n = D(s);
      if (!n) return null;
      const u = n.parentPrefix.toLowerCase(), g = W.lists.find((O) => O.name.trim().toLowerCase() === u);
      return g ? g.name : null;
    }
    function x(s) {
      const n = s.trim().toLowerCase();
      return W.lists.filter((u) => {
        const g = D(u.name);
        return g !== null && g.parentPrefix.toLowerCase() === n;
      });
    }
    function R(s) {
      return x(s).length > 0;
    }
    const L = se(() => k.value ? x(k.value).length : 0);
    function S(s) {
      k.value = s, r.value && (r.value.scrollLeft = 0);
    }
    const J = se(() => {
      const s = W.lists;
      if (!k.value)
        return s.filter((O) => T(O.name) === null);
      const n = k.value.trim().toLowerCase(), u = s.find((O) => O.name.trim().toLowerCase() === n), g = x(k.value);
      return !u && !g.length ? (k.value = null, s.filter((O) => T(O.name) === null)) : u ? [u, ...g] : g;
    });
    me(() => ce.activeSection, () => {
      k.value = null;
    });
    function I() {
      V.promptCreateFolder(k.value || void 0);
    }
    const H = new uo(), Z = N(H.activeDragRepo), oe = N(H.activeDragFromList), ie = N(H.hoverTargetColumn);
    let re = null, E = 0;
    function j() {
      re === null && (re = window.setInterval(() => {
        !r.value || E === 0 || (r.value.scrollLeft += E);
      }, 16));
    }
    function B() {
      re !== null && (clearInterval(re), re = null), E = 0;
    }
    const P = ve({
      visible: !1,
      x: 0,
      y: 0,
      list: null
    }), z = ve({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromList: null
    }), ee = N(null), de = N(!1), ae = N(H.draggingColumnId), q = N(H.hoverColumnId), C = H.subscribe((s) => {
      Z.value = s.activeDragRepo, oe.value = s.activeDragFromList, ie.value = s.hoverTargetColumn, ae.value = s.draggingColumnId, q.value = s.hoverColumnId, P.visible = s.mode === "column_menu" && s.columnMenu !== null, P.x = s.columnMenu?.x ?? 0, P.y = s.columnMenu?.y ?? 0, P.list = s.columnMenu?.list ?? null, z.visible = s.mode === "repo_context_menu" && s.repoMenu !== null, z.x = s.repoMenu?.x ?? 0, z.y = s.repoMenu?.y ?? 0, z.repo = s.repoMenu?.repo ?? null, z.fromList = s.repoMenu?.fromList ?? null, ee.value = s.repoMenu?.activeSubMenu ?? null, de.value = s.repoMenu?.isFlyoutLeft ?? !1;
    });
    function X() {
      H.send({ type: "CLOSE_COLUMN_MENU" });
    }
    function Fe(s, n) {
      s.preventDefault(), s.stopPropagation();
      const u = 150, g = 130, O = Math.min(s.clientX, window.innerWidth - u - 10), _e = Math.min(s.clientY, window.innerHeight - g - 10);
      H.send({ type: "OPEN_COLUMN_MENU", payload: { x: O, y: _e, list: n } });
    }
    async function st() {
      const s = P.list;
      X(), s && await V.renameFolder(s.id, s.name);
    }
    async function je() {
      const s = P.list;
      X(), s && await V.pinFolder(s.id);
    }
    async function ot() {
      const s = P.list;
      X(), s && await V.deleteFolder(s.name);
    }
    function nt(s, n) {
      H.send({ type: "START_DRAG_COLUMN", columnId: n.id }), s.dataTransfer && (s.dataTransfer.effectAllowed = "move", s.dataTransfer.setData("application/x-gh-col-id", n.id));
    }
    function Be() {
      H.send({ type: "END_DRAG_COLUMN" });
    }
    function Re(s, n) {
      !ae.value || ae.value === n || (s.preventDefault(), s.dataTransfer && (s.dataTransfer.dropEffect = "move"), H.send({ type: "HOVER_COLUMN_REORDER", columnId: n }));
    }
    function We(s, n) {
      q.value === n && H.send({ type: "HOVER_COLUMN_REORDER", columnId: null });
    }
    async function be(s, n) {
      if (!ae.value || ae.value === n) return;
      s.preventDefault();
      const u = ae.value;
      Be(), await V.reorderFolders(u, n);
    }
    function pe() {
      H.send({ type: "CLOSE_REPO_MENU" });
    }
    function ye(s, n, u) {
      s.preventDefault(), s.stopPropagation();
      const g = 190, O = 270, _e = Math.min(s.clientX, window.innerWidth - g - 10), Gt = Math.min(s.clientY, window.innerHeight - O - 10);
      H.send({
        type: "OPEN_REPO_MENU",
        payload: {
          x: _e,
          y: Gt,
          repo: n,
          fromList: u,
          activeSubMenu: "folder",
          isFlyoutLeft: _e > window.innerWidth - 380
        }
      });
    }
    async function ze() {
      const s = z.repo;
      pe(), s && await W.moveRepoToList(s.full_name, V.UNCAT);
    }
    async function Se(s) {
      const n = z.repo;
      pe(), n && await W.moveRepoToList(n.full_name, s);
    }
    async function Ye() {
      const s = z.repo;
      if (pe(), !!s?.html_url)
        try {
          await navigator.clipboard.writeText(s.html_url);
        } catch {
        }
    }
    async function Ve() {
      const s = z.repo;
      if (pe(), !!s?.full_name)
        try {
          await navigator.clipboard.writeText(`git clone https://github.com/${s.full_name}.git`);
        } catch {
        }
    }
    function qe() {
      const s = z.repo;
      pe(), s && Ct.open({
        fullName: s.full_name,
        description: s.description || "",
        stars: s.stargazers_count,
        language: s.language || void 0,
        updated: s.updated_at
      });
    }
    function De() {
      const s = z.repo;
      pe(), s?.html_url && $t(s.html_url);
    }
    function Le(s) {
      const n = s.target;
      !n?.closest(".fo-cover-context-menu") && !n?.closest(".col-popover-menu") && !n?.closest(".gh-list-col-menu") && H.send({ type: "RESET_IDLE" });
    }
    function p(s) {
      if (s.key === "Escape") {
        if (k.value) {
          k.value = null;
          return;
        }
        H.send({ type: "RESET_IDLE" });
      }
    }
    function c(s) {
      const n = r.value;
      if (!n) return;
      const g = s.target?.closest(".column-cards-scroll");
      if (g && g.scrollHeight > g.clientHeight && !s.shiftKey && s.deltaX === 0) {
        const O = g.scrollTop === 0 && s.deltaY < 0, _e = Math.ceil(g.scrollTop + g.clientHeight) >= g.scrollHeight && s.deltaY > 0;
        if (!O && !_e)
          return;
      }
      Math.abs(s.deltaX) > Math.abs(s.deltaY) && s.deltaX !== 0 || s.deltaY !== 0 && (s.preventDefault(), n.scrollLeft += s.deltaY);
    }
    function h(s) {
      if (!Z.value || !r.value) return;
      s.preventDefault();
      const n = s.deltaY !== 0 ? s.deltaY : s.deltaX;
      r.value.scrollLeft += n;
    }
    function y(s) {
      const n = r.value;
      if (!n) return;
      const u = n.getBoundingClientRect(), g = 100;
      if (s > u.right - g) {
        const O = Math.min(1, Math.max(0.1, (s - (u.right - g)) / g));
        E = Math.round(O * 20), j();
      } else if (s < u.left + g) {
        const O = Math.min(1, Math.max(0.1, (u.left + g - s) / g));
        E = -Math.round(O * 20), j();
      } else
        B();
    }
    function ne(s) {
      y(s.clientX);
    }
    function Ke(s, n, u) {
      H.send({ type: "START_DRAG_REPO", repo: n, fromList: u }), s.dataTransfer && (s.dataTransfer.effectAllowed = "move", s.dataTransfer.setData(vt, n.full_name), s.dataTransfer.setData("text/plain", `${n.full_name}:${u || "uncategorized"}`)), window.addEventListener("wheel", h, { passive: !1 });
    }
    function at() {
      H.send({ type: "END_DRAG_REPO" }), B(), window.removeEventListener("wheel", h);
    }
    function ct(s, n) {
      !l.active || !Z.value && !Array.from(s.dataTransfer?.types || []).includes(vt) || (s.preventDefault(), s.dataTransfer && (s.dataTransfer.dropEffect = "move"), H.send({ type: "HOVER_TARGET_COLUMN", columnId: n }));
    }
    function dt(s, n) {
      const u = s.currentTarget;
      u && s.relatedTarget instanceof Node && u.contains(s.relatedTarget) || ie.value === n && H.send({ type: "HOVER_TARGET_COLUMN", columnId: null });
    }
    async function pt(s, n) {
      s.preventDefault();
      const u = Z.value?.full_name || Rt(s.dataTransfer);
      at(), !(!l.active || !u) && await W.moveRepoToList(u, n === "uncategorized" ? V.UNCAT : n);
    }
    function lt(s) {
      St.open(s.full_name, void 0, s);
    }
    function $t(s) {
      window.open(s, "_blank", "noopener,noreferrer");
    }
    function ht(s) {
      if (!s) return "";
      try {
        const n = new Date(s);
        return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return et(() => {
      window.addEventListener("pointerdown", Le), window.addEventListener("keydown", p);
    }), tt(() => {
      C(), H.send({ type: "RESET_IDLE" }), B(), window.removeEventListener("wheel", h), window.removeEventListener("pointerdown", Le), window.removeEventListener("keydown", p);
    }), (s, n) => (o(), i("div", co, [
      e("section", {
        class: F(["default-shelf-area", { "is-collapsed": m.value, "drop-active": ie.value === "uncategorized" }]),
        "data-gh-list-drop": t(V).UNCAT,
        onDragover: n[6] || (n[6] = (u) => ct(u, "uncategorized")),
        onDragleave: n[7] || (n[7] = (u) => dt(u, "uncategorized")),
        onDrop: n[8] || (n[8] = (u) => pt(u, "uncategorized"))
      }, [
        e("header", ho, [
          e("div", go, [
            n[26] || (n[26] = e("span", { class: "shelf-icon" }, "📁", -1)),
            n[27] || (n[27] = e("span", { class: "shelf-title" }, "未分类 Star 收藏", -1)),
            e("span", mo, a(t(W).filteredUncatRepos.length), 1),
            n[28] || (n[28] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消本地分组归属；单排 10 个一页）", -1))
          ]),
          e("div", fo, [
            t(W).filteredUncatRepos.length > t(ue).pageSize ? (o(), i("div", vo, [
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(W).uncatPage <= 1,
                title: "上一页",
                onClick: n[0] || (n[0] = //@ts-ignore
                (...u) => t(W).prevUncatPage && t(W).prevUncatPage(...u))
              }, "‹", 8, bo),
              e("span", yo, a(t(W).uncatPage) + " / " + a(t(W).uncatTotalPages) + " 页", 1),
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(W).uncatPage >= t(W).uncatTotalPages,
                title: "下一页",
                onClick: n[1] || (n[1] = //@ts-ignore
                (...u) => t(W).nextUncatPage && t(W).nextUncatPage(...u))
              }, "›", 8, _o)
            ])) : $("", !0),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              title: "刷新 Star 列表",
              disabled: f.value,
              "aria-busy": f.value,
              onClick: n[2] || (n[2] = (u) => t(V).refreshRepositories())
            }, [
              e("span", {
                class: F({ spinning: f.value })
              }, "🔄", 2),
              e("span", null, a(f.value ? "读取中…" : "刷新"), 1)
            ], 8, wo),
            t(W).filteredUncatRepos.length ? (o(), i("button", {
              key: 1,
              type: "button",
              class: "shelf-toggle-btn",
              title: m.value ? "展开托盘" : "收起托盘",
              onClick: v
            }, a(m.value ? "展开 ▼" : "收起 ▲"), 9, ko)) : $("", !0)
          ])
        ]),
        w.value ? ge((o(), i("div", Co, [
          (o(), i(Y, null, K(6, (u) => e("div", {
            key: "skel-shelf-" + u,
            class: "repo gh-card shelf-card skel-card"
          }, [...n[29] || (n[29] = [
            e("div", { class: "skel-line skel-title" }, null, -1),
            e("div", { class: "skel-line skel-desc" }, null, -1),
            e("div", { class: "skel-line skel-meta" }, null, -1)
          ])])), 64))
        ], 512)), [
          [Qe, !m.value]
        ]) : t(W).filteredUncatRepos.length ? ge((o(), i("div", {
          key: 1,
          ref_key: "shelfScrollRef",
          ref: d,
          class: "shelf-cards-scroll",
          onWheel: A
        }, [
          (o(!0), i(Y, null, K(t(W).pagedUncatRepos, (u) => (o(), i("article", {
            key: u.full_name,
            class: F(["repo gh-card shelf-card", { "card-dragging": Z.value?.full_name === u.full_name }]),
            draggable: "true",
            onClick: (g) => lt(u),
            onDragstart: (g) => Ke(g, u, null),
            onDragend: at,
            onContextmenu: (g) => ye(g, u, null)
          }, [
            e("button", {
              class: "fo-card-more",
              type: "button",
              "aria-label": "更多操作",
              title: "更多操作",
              onClick: Q((g) => ye(g, u, null), ["stop"])
            }, "⋮", 8, Go),
            e("div", Mo, [
              e("img", {
                class: "gh-owner-avatar",
                src: u.owner?.avatar_url || "assets/github-star.svg",
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer",
                onError: n[3] || (n[3] = (g) => g.target.src = "assets/github-star.svg")
              }, null, 40, To),
              e("a", {
                href: u.html_url,
                target: "_blank",
                rel: "noreferrer",
                class: "name",
                title: u.full_name,
                onClick: n[4] || (n[4] = Q(() => {
                }, ["stop"]))
              }, [
                e("span", So, a(u.owner?.login || u.full_name.split("/")[0]) + "/", 1),
                te(a(u.name), 1)
              ], 8, Ro)
            ]),
            e("div", Do, [
              e("div", Lo, [
                n[30] || (n[30] = e("span", { class: "gh-badge-folder uncat" }, "＋ 未分类", -1)),
                u.topics && u.topics.length ? (o(), i(Y, { key: 0 }, [
                  (o(!0), i(Y, null, K(u.topics.slice(0, 2), (g) => (o(), i("span", {
                    key: g,
                    class: "gh-badge-topic-chip",
                    title: "Topic: " + g
                  }, " #" + a(g), 9, Ao))), 128)),
                  u.topics.length > 2 ? (o(), i("span", {
                    key: 0,
                    class: "gh-badge-topic-chip more",
                    title: u.topics.slice(2).map((g) => "#" + g).join(" ")
                  }, " +" + a(u.topics.length - 2), 9, xo)) : $("", !0)
                ], 64)) : $("", !0)
              ]),
              e("p", {
                class: "desc",
                title: u.description || ""
              }, a(u.description || "暂无描述"), 9, Eo)
            ]),
            e("div", Ho, [
              e("span", Uo, "★ " + a(u.stargazers_count), 1),
              u.language ? (o(), i("span", Io, a(u.language), 1)) : $("", !0),
              e("span", No, "更新 " + a(ht(u.updated_at)), 1)
            ])
          ], 42, $o))), 128)),
          t(W).uncatPage < t(W).uncatTotalPages ? (o(), i("div", {
            key: 0,
            class: "repo gh-card shelf-card shelf-next-card",
            title: "点击翻到下一页",
            onClick: n[5] || (n[5] = //@ts-ignore
            (...u) => t(W).nextUncatPage && t(W).nextUncatPage(...u))
          }, [
            e("div", Po, [
              n[31] || (n[31] = e("span", { class: "shelf-next-icon" }, "➔", -1)),
              n[32] || (n[32] = e("span", { class: "shelf-next-title" }, "下一页", -1)),
              e("span", Oo, a(t(W).uncatPage + 1) + " / " + a(t(W).uncatTotalPages) + " 页", 1)
            ])
          ])) : $("", !0)
        ], 544)), [
          [Qe, !m.value]
        ]) : m.value ? $("", !0) : (o(), i("p", Fo, a(t(ce).searchQuery ? "没有匹配的未分类仓库" : "暂无未分类 Star 仓库"), 1))
      ], 42, po),
      k.value ? (o(), i("div", jo, [
        e("button", {
          type: "button",
          class: "gh-drilldown-back-btn",
          title: "返回查看全部一级分组 (Esc)",
          onClick: n[9] || (n[9] = (u) => k.value = null)
        }, " ‹ 返回全部 "),
        n[33] || (n[33] = e("span", { class: "gh-drilldown-sep" }, "/", -1)),
        e("span", Bo, "📁 " + a(k.value), 1),
        e("span", Wo, " (含 " + a(L.value) + " 个子分组) ", 1),
        e("button", {
          type: "button",
          class: "gh-drilldown-exit-btn",
          title: "退出下钻视图",
          onClick: n[10] || (n[10] = (u) => k.value = null)
        }, " ✕ ")
      ])) : $("", !0),
      e("div", {
        ref_key: "boardViewportRef",
        ref: r,
        class: "board-viewport",
        onWheel: c,
        onDragover: ne
      }, [
        f.value && !J.value.length ? (o(), i("div", zo, [
          (o(), i(Y, null, K(4, (u) => e("div", {
            key: "skel-col-" + u,
            class: "board-column skel-column"
          }, [
            n[35] || (n[35] = e("div", { class: "column-header" }, [
              e("div", {
                class: "skel-line",
                style: { width: "120px", height: "16px" }
              })
            ], -1)),
            e("div", Yo, [
              (o(), i(Y, null, K(3, (g) => e("div", {
                key: "skel-col-card-" + g,
                class: "repo gh-card skel-card"
              }, [...n[34] || (n[34] = [
                e("div", { class: "skel-line skel-title" }, null, -1),
                e("div", { class: "skel-line skel-desc" }, null, -1),
                e("div", { class: "skel-line skel-meta" }, null, -1)
              ])])), 64))
            ])
          ])), 64))
        ])) : (o(), i("div", Vo, [
          (o(!0), i(Y, null, K(J.value, (u) => (o(), i("section", {
            key: u.id,
            class: F(["board-column list-column", {
              "drop-active": ie.value === u.name,
              "col-dragging": ae.value === u.id,
              "col-hover-target": q.value === u.id
            }]),
            "data-gh-list-drop": u.name,
            onDragover: (g) => Z.value ? ct(g, u.name) : Re(g, u.id),
            onDragleave: (g) => Z.value ? dt(g, u.name) : We(g, u.id),
            onDrop: (g) => Z.value ? pt(g, u.name) : be(g, u.id)
          }, [
            e("header", {
              class: "column-header",
              title: R(u.name) ? `📁 ${u.name}（包含 ${x(u.name).length} 个子分组，点击下钻进入）` : "拖动此列可调换位置；右侧更多可重命名、置顶或删除"
            }, [
              e("div", {
                class: F(["column-title-group", { "is-parent-folder": R(u.name) && !k.value }]),
                onClick: (g) => R(u.name) && !k.value && S(u.name)
              }, [
                n[36] || (n[36] = e("span", { class: "col-dot list-dot" }, null, -1)),
                e("h3", {
                  class: F(["column-title", { "title-clickable": R(u.name) && !k.value }]),
                  title: u.description || "本地分组: " + u.name
                }, " 📁 " + a(u.name), 11, Qo),
                u.pinned ? (o(), i("span", Jo, "📌")) : $("", !0),
                e("span", Zo, a(t(W).getReposForList(u.name).length), 1),
                R(u.name) && !k.value ? (o(), i("span", en, a(x(u.name).length) + "个子分组 › ", 1)) : $("", !0)
              ], 10, Xo),
              e("div", tn, [
                e("button", {
                  type: "button",
                  class: "col-more-btn col-drag-handle",
                  title: "按住拖动可调换分组位置；点击打开更多操作",
                  draggable: "true",
                  "aria-label": "分组操作与拖拽手柄",
                  onDragstart: (g) => nt(g, u),
                  onDragend: Be,
                  onClick: Q((g) => Fe(g, u), ["stop"])
                }, "⋮", 40, sn)
              ])
            ], 8, Ko),
            e("div", on, [
              (o(!0), i(Y, null, K(t(W).getReposForList(u.name), (g) => (o(), i("article", {
                key: g.full_name,
                class: F(["repo gh-card", { "card-dragging": Z.value?.full_name === g.full_name }]),
                draggable: "true",
                onClick: (O) => lt(g),
                onDragstart: (O) => Ke(O, g, u.name),
                onDragend: at,
                onContextmenu: (O) => ye(O, g, u.name)
              }, [
                e("button", {
                  class: "fo-card-more",
                  type: "button",
                  "aria-label": "更多操作",
                  title: "更多操作",
                  onClick: Q((O) => ye(O, g, u.name), ["stop"])
                }, "⋮", 8, an),
                e("div", ln, [
                  e("img", {
                    class: "gh-owner-avatar",
                    src: g.owner?.avatar_url || "assets/github-star.svg",
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer",
                    onError: n[11] || (n[11] = (O) => O.target.src = "assets/github-star.svg")
                  }, null, 40, rn),
                  e("a", {
                    href: g.html_url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "name",
                    title: g.full_name,
                    onClick: n[12] || (n[12] = Q(() => {
                    }, ["stop"]))
                  }, [
                    e("span", cn, a(g.owner?.login || g.full_name.split("/")[0]) + "/", 1),
                    te(a(g.name), 1)
                  ], 8, un)
                ]),
                e("div", dn, [
                  e("div", pn, [
                    e("span", {
                      class: "gh-badge-folder",
                      title: "属于列表: " + u.name
                    }, [
                      te(" 📁 " + a(u.name) + " ", 1),
                      e("span", {
                        class: "btn-inline-remove",
                        title: "从该列表中移出",
                        role: "button",
                        tabindex: "0",
                        onClick: Q((O) => t(W).removeRepoFromList(g.full_name, u.name), ["stop"])
                      }, "×", 8, gn)
                    ], 8, hn),
                    g.topics && g.topics.length ? (o(), i(Y, { key: 0 }, [
                      (o(!0), i(Y, null, K(g.topics.slice(0, 2), (O) => (o(), i("span", {
                        key: O,
                        class: "gh-badge-topic-chip",
                        title: "Topic: " + O
                      }, " #" + a(O), 9, mn))), 128)),
                      g.topics.length > 2 ? (o(), i("span", {
                        key: 0,
                        class: "gh-badge-topic-chip more",
                        title: g.topics.slice(2).map((O) => "#" + O).join(" ")
                      }, " +" + a(g.topics.length - 2), 9, fn)) : $("", !0)
                    ], 64)) : $("", !0)
                  ]),
                  e("p", {
                    class: "desc",
                    title: g.description || ""
                  }, a(g.description || "暂无描述"), 9, vn)
                ]),
                e("div", bn, [
                  e("span", yn, "★ " + a(g.stargazers_count), 1),
                  g.language ? (o(), i("span", _n, a(g.language), 1)) : $("", !0),
                  e("span", wn, "更新 " + a(ht(g.updated_at)), 1)
                ])
              ], 42, nn))), 128)),
              t(W).getReposForList(u.name).length ? $("", !0) : (o(), i("div", kn, [...n[37] || (n[37] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, qo))), 128)),
          e("section", Cn, [
            e("button", {
              type: "button",
              class: "btn-trigger-add-col",
              title: k.value ? `在「${k.value}」下新建子分组` : "新建本地分组",
              onClick: I
            }, [
              n[38] || (n[38] = e("span", { class: "plus-icon" }, "＋", -1)),
              e("span", null, a(k.value ? `新建 ${k.value} 子分组` : "新建本地分组"), 1)
            ], 8, $n)
          ])
        ]))
      ], 544),
      (o(), he(ut, { to: "body" }, [
        z.visible && z.repo ? (o(), i("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Je({ left: `${z.x}px`, top: `${z.y}px` }),
          onClick: n[22] || (n[22] = Q(() => {
          }, ["stop"])),
          onContextmenu: n[23] || (n[23] = Q(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: F(["gh-menu-has-sub", { "is-active": ee.value === "folder" }]),
            onMouseenter: n[15] || (n[15] = (u) => ee.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: n[13] || (n[13] = Q((u) => ee.value = ee.value === "folder" ? null : "folder", ["stop"]))
            }, [...n[39] || (n[39] = [
              e("span", null, "移动/加入本地分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: F(["gh-sub-flyout", { "flyout-left": de.value }]),
              onClick: n[14] || (n[14] = Q(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: ze
              }, " 设为未分类 "),
              (o(!0), i(Y, null, K(t(W).lists, (u) => (o(), i("button", {
                key: u.id,
                class: F(["fo-cover-menu-item", { primary: t(Ze)(z.repo.full_name).includes(u.name) }]),
                type: "button",
                onClick: (g) => Se(u.name)
              }, a(t(Ze)(z.repo.full_name).includes(u.name) ? "✓ " : "  ") + "📁 " + a(u.name), 11, Gn))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: n[16] || (n[16] = (u) => ee.value = null),
            onClick: n[17] || (n[17] = (u) => lt(z.repo))
          }, " 查看仓库详情 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: n[18] || (n[18] = (u) => ee.value = null),
            onClick: Ye
          }, " 复制仓库链接 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: n[19] || (n[19] = (u) => ee.value = null),
            onClick: Ve
          }, " 复制克隆命令 (git clone) ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: n[20] || (n[20] = (u) => ee.value = null),
            onClick: qe
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: n[21] || (n[21] = (u) => ee.value = null),
            onClick: De
          }, " 在 GitHub 打开 ", 32)
        ], 36)) : $("", !0),
        P.visible && P.list ? (o(), i("div", {
          key: 1,
          class: "fo-cover-context-menu gh-list-col-menu",
          style: Je({ left: `${P.x}px`, top: `${P.y}px` }),
          onClick: n[24] || (n[24] = Q(() => {
          }, ["stop"])),
          onContextmenu: n[25] || (n[25] = Q(() => {
          }, ["prevent"]))
        }, [
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: st
          }, " ✏️ 重命名分组 "),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: je
          }, [
            e("span", null, a(P.list?.pinned ? "📍 取消置顶" : "📌 置顶此分组"), 1)
          ]),
          e("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onClick: ot
          }, " 🗑️ 删除分组 ")
        ], 36)) : $("", !0)
      ]))
    ]));
  }
}), Tn = /* @__PURE__ */ Te(Mn, [["__scopeId", "data-v-ae416c99"]]);
function Rn(b) {
  const l = b.subject?.url, r = b.repository?.html_url || "https://github.com";
  if (!l) return r;
  const d = b.subject?.type;
  return d === "Issue" ? l.replace("https://api.github.com/repos/", "https://github.com/") : d === "PullRequest" ? l.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : d === "Release" ? l.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : l.replace("https://api.github.com/repos/", "https://github.com/");
}
function Sn(b) {
  try {
    const l = Date.now() - new Date(b).getTime();
    if (l < 6e4) return "刚刚";
    const r = Math.floor(l / 6e4);
    if (r < 60) return `${r} 分钟前`;
    const d = Math.floor(r / 60);
    if (d < 24) return `${d} 小时前`;
    const m = Math.floor(d / 24);
    return m < 30 ? `${m} 天前` : b.slice(5, 10);
  } catch {
    return "";
  }
}
const U = ve({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), Ce = {
  open() {
    U.isOpen = !0, (!U.items.length || Date.now() - U.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    U.isOpen = !1;
  },
  toggle() {
    U.isOpen ? this.close() : this.open();
  },
  setTab(b) {
    U.activeKind = b;
  },
  async refresh() {
    const b = V.token?.trim();
    if (!b) {
      U.items = [], U.unreadCount = 0, U.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    U.loading = !0, U.error = "";
    try {
      const l = {
        ...Oe(b),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, r = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: l
      });
      if (!r.ok)
        throw r.status === 401 ? new Error("GitHub Token 无效或已过期") : r.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${r.status})`);
      const d = await r.json();
      if (!Array.isArray(d))
        throw new Error("GitHub 返回数据异常");
      const m = d.map((v) => ({
        id: String(v.id),
        unread: !!v.unread,
        reason: String(v.reason || ""),
        updatedAt: v.updated_at,
        formattedTime: Sn(v.updated_at),
        subject: {
          title: String(v.subject?.title || "未命名通知"),
          url: String(v.subject?.url || ""),
          type: String(v.subject?.type || "Issue"),
          latestCommentUrl: v.subject?.latest_comment_url
        },
        repository: {
          id: Number(v.repository?.id || 0),
          name: String(v.repository?.name || ""),
          fullName: String(v.repository?.full_name || ""),
          owner: {
            login: String(v.repository?.owner?.login || ""),
            avatarUrl: v.repository?.owner?.avatar_url
          },
          htmlUrl: String(v.repository?.html_url || "")
        },
        url: String(v.url || ""),
        htmlUrl: Rn(v)
      }));
      U.items = m, U.unreadCount = m.filter((v) => v.unread).length, U.lastFetchedAt = Date.now();
    } catch (l) {
      console.warn("[GitHubNotifications] 读取失败:", l), U.error = l?.message || "网络请求异常";
    } finally {
      U.loading = !1;
    }
  },
  openTarget(b) {
    typeof window < "u" && window.open(b.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, _ = ve({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function Ne(b) {
  try {
    const l = Date.now() - new Date(b).getTime(), r = Math.floor(l / 6e4);
    if (r < 1) return "刚刚";
    if (r < 60) return `${r}分钟前`;
    const d = Math.floor(r / 60);
    if (d < 24) return `${d}小时前`;
    const m = Math.floor(d / 24);
    if (m < 30) return `${m}天前`;
    const v = new Date(b);
    return `${v.getFullYear()}/${v.getMonth() + 1}/${v.getDate()}`;
  } catch {
    return "";
  }
}
function Pe(b) {
  switch (b) {
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
function Dn(b) {
  return b ? {
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
  }[b] || (b.startsWith(":") && b.endsWith(":") ? b.slice(1, -1) : b) : "";
}
function rt(b) {
  if (!Array.isArray(b)) return [];
  const l = {
    THUMBS_UP: "👍",
    THUMBS_DOWN: "👎",
    LAUGH: "😄",
    HOORAY: "🎉",
    CONFUSED: "😕",
    HEART: "❤️",
    ROCKET: "🚀",
    EYES: "👀"
  };
  return b.map((r) => ({
    emoji: l[r.content] || r.content,
    count: r.reactors?.totalCount || r.users?.totalCount || 0
  })).filter((r) => r.count > 0);
}
function _t(b) {
  if (!b || typeof b != "object") return [];
  const l = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, r = [];
  for (const [d, m] of Object.entries(l)) {
    const v = Number(b[d] || 0);
    v > 0 && r.push({ emoji: m, count: v });
  }
  return r;
}
async function wt(b, l) {
  if (!b) return "";
  try {
    const r = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...Oe(l),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: b, mode: "gfm" })
    });
    if (r.ok)
      return await r.text();
  } catch {
  }
  return fe.renderMarkdown(b);
}
async function Ln(b, l, r, d) {
  const m = `
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
    const v = await fetch("https://api.github.com/graphql", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...Oe(d),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: m,
        variables: { owner: b, name: l, num: r }
      })
    });
    if (!v.ok) return null;
    const f = (await v.json())?.data?.repository?.discussion;
    if (!f) return null;
    let w = 0;
    const k = (f.comments?.nodes || []).map((x) => {
      const R = x.replies?.nodes || [];
      w += R.length;
      const L = R.map((S) => ({
        id: S.id,
        author: {
          login: S.author?.login || "匿名",
          avatarUrl: S.author?.avatarUrl || "",
          association: Pe(S.authorAssociation)
        },
        createdAt: S.createdAt,
        formattedTime: Ne(S.createdAt),
        body: S.body || "",
        bodyHtml: S.bodyHTML || (S.body ? fe.renderMarkdown(S.body) : ""),
        reactions: rt(S.reactionGroups)
      }));
      return {
        id: x.id,
        author: {
          login: x.author?.login || "匿名",
          avatarUrl: x.author?.avatarUrl || "",
          association: Pe(x.authorAssociation)
        },
        createdAt: x.createdAt,
        formattedTime: Ne(x.createdAt),
        body: x.body || "",
        bodyHtml: x.bodyHTML || (x.body ? fe.renderMarkdown(x.body) : "<p>（评论内容为空）</p>"),
        reactions: rt(x.reactionGroups),
        replies: L
      };
    }), D = f.body || "", T = f.bodyHTML && f.bodyHTML.trim().length > 10 ? f.bodyHTML : D ? fe.renderMarkdown(D) : "<p>（主贴内容为空）</p>";
    return {
      title: f.title,
      number: r,
      state: "discussion",
      category: f.category ? {
        name: f.category.name,
        emoji: Dn(f.category.emoji)
      } : void 0,
      author: {
        login: f.author?.login || "未知",
        avatarUrl: f.author?.avatarUrl || "",
        association: Pe(f.authorAssociation)
      },
      createdAt: f.createdAt,
      formattedTime: Ne(f.createdAt),
      body: D,
      bodyHtml: T,
      htmlUrl: f.url,
      commentsCount: f.comments?.totalCount || k.length,
      totalRepliesCount: w,
      comments: k,
      reactions: rt(f.reactionGroups)
    };
  } catch {
    return null;
  }
}
const it = {
  async open(b) {
    _.isOpen = !0, _.loading = !0, _.error = "", _.data = null, _.notificationItem = b;
    const l = V.token?.trim() || "", r = {
      ...Oe(l),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const d = b.subject?.url, m = b.subject?.type, v = b.repository?.fullName || "", [A, f] = v.split("/"), w = d?.match(/\/(\d+)$/), k = w ? Number(w[1]) : void 0;
      if (m === "Discussion" && A && f && k) {
        const D = await Ln(A, f, k, l);
        if (D) {
          _.data = {
            notificationId: b.id,
            title: D.title || b.subject.title,
            number: k,
            state: "discussion",
            category: D.category,
            author: D.author || { login: b.repository.owner.login, avatarUrl: b.repository.owner.avatarUrl || "" },
            createdAt: D.createdAt || b.updatedAt,
            formattedTime: D.formattedTime || b.formattedTime,
            body: D.body || "",
            bodyHtml: D.bodyHtml || (D.body ? fe.renderMarkdown(D.body) : ""),
            htmlUrl: D.htmlUrl || b.htmlUrl,
            commentsCount: D.commentsCount || 0,
            totalRepliesCount: D.totalRepliesCount || 0,
            comments: D.comments || [],
            reactions: D.reactions || [],
            repositoryFullName: v,
            type: "Discussion"
          };
          return;
        }
      }
      if (d) {
        const D = await fetch(d, { headers: r, cache: "no-store" });
        if (D.ok) {
          const T = await D.json();
          let x = [];
          if (T.comments_url && T.comments > 0)
            try {
              const S = await fetch(`${T.comments_url}?per_page=50`, { headers: r, cache: "no-store" });
              if (S.ok) {
                const J = await S.json();
                Array.isArray(J) && (x = await Promise.all(
                  J.map(async (I) => {
                    const H = I.body_html || (I.body ? await wt(I.body, l) : "");
                    return {
                      id: I.id,
                      author: {
                        login: I.user?.login || "匿名",
                        avatarUrl: I.user?.avatar_url || "",
                        association: Pe(I.author_association)
                      },
                      createdAt: I.created_at,
                      formattedTime: Ne(I.created_at),
                      body: I.body || "",
                      bodyHtml: H,
                      reactions: _t(I.reactions)
                    };
                  })
                ));
              }
            } catch (S) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", S);
            }
          const R = T.body || "";
          let L = T.body_html || "";
          !L && R && (L = await wt(R, l)), !L && R && (L = fe.renderMarkdown(R)), _.data = {
            notificationId: b.id,
            title: T.title || T.name || b.subject.title,
            number: T.number || k,
            state: T.merged ? "merged" : T.state || T.conclusion || "open",
            author: {
              login: T.user?.login || T.author?.login || b.repository.owner.login,
              avatarUrl: T.user?.avatar_url || T.author?.avatar_url || b.repository.owner.avatarUrl || "",
              association: Pe(T.author_association)
            },
            createdAt: T.created_at || T.published_at || b.updatedAt,
            formattedTime: Ne(T.created_at || T.published_at || b.updatedAt),
            body: R,
            bodyHtml: L || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: T.html_url || b.htmlUrl,
            commentsCount: typeof T.comments == "number" ? T.comments : x.length,
            comments: x,
            reactions: _t(T.reactions),
            repositoryFullName: v,
            type: m || "Issue"
          };
          return;
        }
      }
      _.data = {
        notificationId: b.id,
        title: b.subject.title,
        number: k,
        state: "open",
        author: {
          login: b.repository.owner.login,
          avatarUrl: b.repository.owner.avatarUrl || ""
        },
        createdAt: b.updatedAt,
        formattedTime: b.formattedTime,
        body: "",
        bodyHtml: "<p style='color: var(--muted);'>未能通过 API 读取到详细正文，请点击右上角「在网页打开」直达原帖。</p>",
        htmlUrl: b.htmlUrl,
        commentsCount: 0,
        comments: [],
        repositoryFullName: v,
        type: m || "通知"
      };
    } catch (d) {
      console.warn("[GitHubNotificationDetail] 读取异常:", d), _.error = d?.message || "网络请求异常";
    } finally {
      _.loading = !1;
    }
  },
  close() {
    _.isOpen = !1, _.data = null, _.error = "";
  }
}, An = { class: "vue-gh-notification-panel-wrapper" }, xn = { class: "gh-msg-header" }, En = { class: "gh-msg-account" }, Hn = { class: "gh-msg-subtitle" }, Un = {
  class: "gh-msg-tabs",
  role: "tablist"
}, In = ["onClick"], Nn = { class: "gh-msg-list" }, Pn = {
  key: 0,
  class: "gh-msg-loading"
}, On = {
  key: 1,
  class: "gh-msg-error"
}, Fn = {
  key: 2,
  class: "gh-msg-empty"
}, jn = ["onClick"], Bn = { class: "gh-card-indicator-col" }, Wn = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, zn = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, Yn = { class: "gh-card-type-col" }, Vn = ["title"], qn = { class: "gh-card-main-col" }, Kn = { class: "gh-card-repo-row" }, Xn = ["title"], Qn = { class: "gh-card-reason-tag" }, Jn = { class: "gh-card-time" }, Zn = ["title"], ea = { class: "gh-card-footer-row" }, ta = { class: "gh-card-type-label" }, sa = ["onClick"], oa = /* @__PURE__ */ Me({
  __name: "GitHubNotificationPanel",
  setup(b) {
    const l = N(null), r = se(() => [
      { kind: "all", label: "所有", count: U.items.length },
      { kind: "unread", label: "未读", count: U.items.filter((R) => R.unread).length },
      { kind: "mention", label: "提及", count: U.items.filter((R) => R.reason === "mention").length },
      { kind: "author", label: "作者", count: U.items.filter((R) => R.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: U.items.filter((R) => R.reason === "ci_activity" || R.subject.type === "CheckSuite").length }
    ]), d = se(() => {
      const R = U.items;
      switch (U.activeKind) {
        case "unread":
          return R.filter((L) => L.unread);
        case "mention":
          return R.filter((L) => L.reason === "mention");
        case "author":
          return R.filter((L) => L.reason === "author");
        case "ci":
          return R.filter((L) => L.reason === "ci_activity" || L.subject.type === "CheckSuite");
        default:
          return R;
      }
    });
    function m(R, L) {
      if (L === "ci_activity" || R === "CheckSuite")
        return "⚡";
      switch (R) {
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
    function v(R) {
      switch (R) {
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
          return R || "通知";
      }
    }
    function A() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function f() {
      Ce.refresh();
    }
    function w() {
      Ce.close();
    }
    function k(R) {
      it.open(R);
    }
    function D(R) {
      Ce.openTarget(R);
    }
    function T(R) {
      if (!U.isOpen) return;
      const L = R.target;
      !l.value?.contains(L) && !L?.closest("#gh-header-msg-center-btn") && Ce.close();
    }
    function x(R) {
      R.key === "Escape" && U.isOpen && Ce.close();
    }
    return et(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", T), window.addEventListener("keydown", x));
    }), tt(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", T), window.removeEventListener("keydown", x));
    }), (R, L) => (o(), i("div", An, [
      t(U).isOpen ? (o(), i("section", {
        key: 0,
        ref_key: "panelRef",
        ref: l,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: L[0] || (L[0] = Q(() => {
        }, ["stop"]))
      }, [
        e("header", xn, [
          e("div", En, [
            L[2] || (L[2] = e("div", { class: "gh-msg-octo-avatar" }, [
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
              L[1] || (L[1] = e("h2", { class: "gh-msg-title" }, "GitHub 消息通知", -1)),
              e("p", Hn, " 共 " + a(t(U).items.length) + " 条通知 · " + a(t(U).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          L[3] || (L[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: A
          }, " ↗ "),
          e("button", {
            type: "button",
            class: F(["gh-panel-btn", { "is-spinning": t(U).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: f
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: w
          }, " ✕ ")
        ]),
        e("nav", Un, [
          (o(!0), i(Y, null, K(r.value, (S) => (o(), i("button", {
            key: S.kind,
            type: "button",
            class: F(["gh-msg-tab", { active: t(U).activeKind === S.kind }]),
            onClick: (J) => t(U).activeKind = S.kind
          }, [
            te(a(S.label) + " ", 1),
            S.count > 0 ? (o(), i("span", {
              key: 0,
              class: F(["gh-tab-pill", { "is-unread-pill": S.kind === "unread" }])
            }, a(S.count), 3)) : $("", !0)
          ], 10, In))), 128))
        ]),
        e("div", Nn, [
          t(U).loading && !t(U).items.length ? (o(), i("div", Pn, [...L[4] || (L[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : t(U).error ? (o(), i("div", On, [
            L[5] || (L[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, a(t(U).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: f
            }, "重试")
          ])) : d.value.length === 0 ? (o(), i("div", Fn, [...L[6] || (L[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (o(!0), i(Y, { key: 3 }, K(d.value, (S) => (o(), i("article", {
            key: S.id,
            class: F(["gh-notification-card", { "is-unread": S.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (J) => k(S)
          }, [
            e("div", Bn, [
              S.unread ? (o(), i("span", Wn)) : (o(), i("span", zn))
            ]),
            e("div", Yn, [
              e("span", {
                class: "gh-type-badge",
                title: S.subject.type
              }, a(m(S.subject.type, S.reason)), 9, Vn)
            ]),
            e("div", qn, [
              e("div", Kn, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: S.repository.fullName
                }, a(S.repository.fullName), 9, Xn),
                e("span", Qn, a(v(S.reason)), 1),
                e("time", Jn, a(S.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: S.subject.title
              }, a(S.subject.title), 9, Zn),
              e("div", ea, [
                e("span", ta, a(S.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: Q((J) => D(S), ["stop"])
                }, "在网页打开 ↗", 8, sa)
              ])
            ])
          ], 10, jn))), 128))
        ])
      ], 512)) : $("", !0)
    ]));
  }
}), na = /* @__PURE__ */ Te(oa, [["__scopeId", "data-v-9a98e294"]]), aa = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, la = ["aria-label"], ra = { class: "gh-modal-title-wrap" }, ia = { class: "gh-modal-octo-icon" }, ua = ["href"], ca = { class: "gh-owner" }, da = { class: "gh-name" }, pa = {
  key: 1,
  class: "gh-modal-repo-name"
}, ha = { class: "gh-name" }, ga = { class: "gh-modal-actions" }, ma = { class: "gh-modal-content" }, fa = {
  key: 0,
  class: "gh-content-loading"
}, va = {
  key: 1,
  class: "gh-content-error"
}, ba = { class: "gh-discussion-title-header" }, ya = { class: "gh-discussion-h1" }, _a = {
  key: 0,
  class: "gh-discussion-num"
}, wa = { class: "gh-discussion-sub-meta" }, ka = {
  key: 0,
  class: "gh-category-pill"
}, Ca = {
  key: 0,
  class: "cat-emoji"
}, $a = {
  key: 1,
  class: "gh-category-pill"
}, Ga = { class: "gh-sub-author" }, Ma = { class: "gh-sub-verb" }, Ta = {
  key: 2,
  class: "gh-sub-comments-count"
}, Ra = { class: "gh-op-post-card" }, Sa = { class: "gh-op-post-head" }, Da = { class: "gh-op-author-left" }, La = ["src"], Aa = { class: "gh-op-meta" }, xa = { class: "gh-op-name-row" }, Ea = { class: "gh-op-name" }, Ha = {
  key: 0,
  class: "gh-role-pill"
}, Ua = { class: "gh-op-time" }, Ia = ["innerHTML"], Na = {
  key: 0,
  class: "gh-reactions-bar"
}, Pa = { class: "rx-emoji" }, Oa = { class: "rx-count" }, Fa = {
  key: 0,
  class: "gh-comments-block"
}, ja = { class: "gh-comments-header" }, Ba = { class: "gh-comments-count-pill" }, Wa = { class: "gh-comments-feed" }, za = { class: "gh-comment-head" }, Ya = ["src"], Va = { class: "gh-comment-meta" }, qa = { class: "gh-comment-author" }, Ka = {
  key: 0,
  class: "gh-role-pill small"
}, Xa = { class: "gh-comment-time" }, Qa = ["innerHTML"], Ja = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, Za = { class: "rx-emoji" }, el = { class: "rx-count" }, tl = {
  key: 1,
  class: "gh-comment-replies-thread"
}, sl = { class: "gh-replies-thread-title" }, ol = { class: "gh-reply-head" }, nl = ["src"], al = { class: "gh-reply-meta" }, ll = { class: "gh-reply-author" }, rl = {
  key: 0,
  class: "gh-role-pill tiny"
}, il = { class: "gh-reply-time" }, ul = ["innerHTML"], cl = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, dl = { class: "rx-emoji" }, pl = { class: "rx-count" }, hl = {
  key: 1,
  class: "gh-no-comments"
}, gl = /* @__PURE__ */ Me({
  __name: "GitHubNotificationDetailDrawer",
  setup(b) {
    const l = N(null), r = N(null), d = N(null);
    let m = !1, v = 0, A = 0, f = 0, w = 0, k = () => {
    };
    const D = se(() => (_.data?.repositoryFullName || _.notificationItem?.repository.fullName || "").split("/")[0] || ""), T = se(() => {
      const E = _.data?.repositoryFullName || _.notificationItem?.repository.fullName || "";
      return E.split("/")[1] || E;
    }), x = se(() => {
      if (!_.data) return "";
      const E = _.data.bodyHtml?.trim() || "";
      if (E.length > 20) return E;
      const j = _.data.body?.trim() || "";
      return j.length > 0 ? fe.renderMarkdown(j) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), R = se(() => d.value ? {
      position: "fixed",
      left: `${d.value.x}px`,
      top: `${d.value.y}px`,
      transform: "none"
    } : {});
    me(
      () => _.isOpen,
      (E) => {
        E && (d.value = null, gt(() => {
          r.value && (r.value.scrollTop = 0);
        }));
      }
    ), me(
      () => _.data,
      (E) => {
        E && gt(() => {
          r.value && (r.value.scrollTop = 0);
        });
      }
    );
    function L(E) {
      if (E.target.closest("button, a, input")) return;
      k();
      const j = l.value;
      if (!j || !_.isOpen) return;
      m = !0;
      const B = j.getBoundingClientRect();
      f = B.left, w = B.top, v = E.clientX, A = E.clientY, d.value = { x: f, y: w };
      const P = (ee) => {
        if (!m) return;
        const de = ee.clientX - v, ae = ee.clientY - A;
        d.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, f + de)),
          y: Math.max(10, Math.min(window.innerHeight - 80, w + ae))
        };
      }, z = () => {
        m = !1, window.removeEventListener("mousemove", P), window.removeEventListener("mouseup", z);
      };
      k = z, window.addEventListener("mousemove", P), window.addEventListener("mouseup", z);
    }
    function S() {
      it.close();
    }
    function J() {
      const E = _.data?.htmlUrl || _.notificationItem?.htmlUrl;
      E && typeof window < "u" && window.open(E, "_blank", "noopener,noreferrer");
    }
    function I(E) {
      const B = E.target?.closest("a");
      B && B.href && (E.preventDefault(), E.stopPropagation(), window.open(B.href, "_blank", "noopener,noreferrer"));
    }
    function H() {
      _.notificationItem && it.open(_.notificationItem);
    }
    function Z(E) {
      switch (E) {
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
    function oe(E) {
      switch (E) {
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
          return E || "通知详情";
      }
    }
    function ie(E) {
      switch (E) {
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
          return E || "";
      }
    }
    function re(E) {
      E.key === "Escape" && _.isOpen && S();
    }
    return et(() => {
      Dt(), window.addEventListener("keydown", re);
    }), tt(() => {
      window.removeEventListener("keydown", re), k();
    }), (E, j) => (o(), he(ut, { to: "body" }, [
      t(_).isOpen ? (o(), i("div", aa, [
        e("div", {
          ref_key: "windowRef",
          ref: l,
          class: "gh-nonmodal-window",
          style: Je(R.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": t(_).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: L
          }, [
            e("div", ra, [
              e("span", ia, a(Z(t(_).data?.type || t(_).notificationItem?.subject.type)), 1),
              t(_).data?.htmlUrl || t(_).notificationItem?.htmlUrl ? (o(), i("a", {
                key: 0,
                href: t(_).data?.htmlUrl || t(_).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", ca, a(D.value), 1),
                j[0] || (j[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", da, a(T.value), 1),
                j[1] || (j[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, ua)) : (o(), i("span", pa, [
                e("strong", ha, a(t(_).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", ga, [
              t(_).data?.state ? (o(), i("span", {
                key: 0,
                class: F(["gh-detail-state-pill", t(_).data.state])
              }, a(ie(t(_).data.state)), 3)) : $("", !0),
              t(_).data?.htmlUrl || t(_).notificationItem?.htmlUrl ? (o(), i("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: J
              }, " 在网页打开 ↗ ")) : $("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: S
              }, " ✕ ")
            ])
          ], 32),
          e("div", ma, [
            t(_).loading ? (o(), i("div", fa, [
              j[2] || (j[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + a(t(_).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : t(_).error ? (o(), i("div", va, [
              j[3] || (j[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, a(t(_).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: H
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: J
                }, "在 GitHub 打开 ↗")
              ])
            ])) : t(_).data ? (o(), i("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: r,
              class: "gh-detail-scrollable",
              onClick: I
            }, [
              e("div", ba, [
                e("h1", ya, [
                  te(a(t(_).data.title) + " ", 1),
                  t(_).data.number ? (o(), i("span", _a, "#" + a(t(_).data.number), 1)) : $("", !0)
                ]),
                e("div", wa, [
                  t(_).data.category ? (o(), i("span", ka, [
                    t(_).data.category.emoji ? (o(), i("span", Ca, a(t(_).data.category.emoji), 1)) : $("", !0),
                    e("span", null, a(t(_).data.category.name), 1)
                  ])) : (o(), i("span", $a, a(oe(t(_).data.type)), 1)),
                  e("span", Ga, a(t(_).data.author.login), 1),
                  e("span", Ma, "发布于 " + a(t(_).data.formattedTime), 1),
                  t(_).data.commentsCount ? (o(), i("span", Ta, [
                    te(" · " + a(t(_).data.commentsCount) + " 条讨论主题 ", 1),
                    t(_).data.totalRepliesCount ? (o(), i(Y, { key: 0 }, [
                      te(" （含 " + a(t(_).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : $("", !0)
                  ])) : $("", !0)
                ])
              ]),
              e("article", Ra, [
                e("div", Sa, [
                  e("div", Da, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: t(_).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, La),
                    e("div", Aa, [
                      e("div", xa, [
                        e("strong", Ea, a(t(_).data.author.login), 1),
                        t(_).data.author.association ? (o(), i("span", Ha, a(t(_).data.author.association), 1)) : $("", !0)
                      ]),
                      e("time", Ua, a(t(_).data.formattedTime), 1)
                    ])
                  ]),
                  j[4] || (j[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                j[5] || (j[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: x.value
                }, null, 8, Ia),
                t(_).data.reactions?.length ? (o(), i("div", Na, [
                  (o(!0), i(Y, null, K(t(_).data.reactions, (B) => (o(), i("span", {
                    key: B.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", Pa, a(B.emoji), 1),
                    e("span", Oa, a(B.count), 1)
                  ]))), 128))
                ])) : $("", !0)
              ]),
              t(_).data.comments.length ? (o(), i("div", Fa, [
                e("div", ja, [
                  j[6] || (j[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", Ba, [
                    te(a(t(_).data.commentsCount) + " 条主题 ", 1),
                    t(_).data.totalRepliesCount ? (o(), i(Y, { key: 0 }, [
                      te(" · " + a(t(_).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : $("", !0)
                  ])
                ]),
                e("div", Wa, [
                  (o(!0), i(Y, null, K(t(_).data.comments, (B) => (o(), i("div", {
                    key: B.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", za, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: B.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, Ya),
                      e("div", Va, [
                        e("span", qa, a(B.author.login), 1),
                        B.author.association ? (o(), i("span", Ka, a(B.author.association), 1)) : $("", !0),
                        e("time", Xa, a(B.formattedTime), 1)
                      ])
                    ]),
                    j[7] || (j[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: B.bodyHtml
                    }, null, 8, Qa),
                    B.reactions?.length ? (o(), i("div", Ja, [
                      (o(!0), i(Y, null, K(B.reactions, (P) => (o(), i("span", {
                        key: P.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", Za, a(P.emoji), 1),
                        e("span", el, a(P.count), 1)
                      ]))), 128))
                    ])) : $("", !0),
                    B.replies?.length ? (o(), i("div", tl, [
                      e("div", sl, [
                        e("span", null, "💬 " + a(B.replies.length) + " 条回复对话", 1)
                      ]),
                      (o(!0), i(Y, null, K(B.replies, (P) => (o(), i("div", {
                        key: P.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", ol, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: P.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, nl),
                          e("div", al, [
                            e("strong", ll, a(P.author.login), 1),
                            P.author.association ? (o(), i("span", rl, a(P.author.association), 1)) : $("", !0),
                            e("time", il, a(P.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: P.bodyHtml
                        }, null, 8, ul),
                        P.reactions?.length ? (o(), i("div", cl, [
                          (o(!0), i(Y, null, K(P.reactions, (z) => (o(), i("span", {
                            key: z.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", dl, a(z.emoji), 1),
                            e("span", pl, a(z.count), 1)
                          ]))), 128))
                        ])) : $("", !0)
                      ]))), 128))
                    ])) : $("", !0)
                  ]))), 128))
                ])
              ])) : (o(), i("div", hl, [...j[8] || (j[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : $("", !0)
          ])
        ], 12, la)
      ])) : $("", !0)
    ]));
  }
}), ml = /* @__PURE__ */ Te(gl, [["__scopeId", "data-v-053c788c"]]), fl = [
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
], vl = ["inert"], bl = {
  key: 0,
  class: "muted small",
  role: "status"
}, yl = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, _l = { class: "gh-bili-layout" }, wl = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, kl = ["title"], Cl = { class: "fo-sidebar-toggle-title" }, $l = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Gl = ["aria-expanded", "title"], Ml = { class: "fo-sidebar-toggle-chevron" }, Tl = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, Rl = { class: "fo-sidebar-sub-wrap" }, Sl = ["title"], Dl = { class: "fo-sidebar-sub-main" }, Ll = { class: "fo-sidebar-sub-text" }, Al = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, xl = ["title"], El = { class: "fo-sidebar-sub-main" }, Hl = { class: "fo-sidebar-sub-text" }, Ul = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Il = ["title"], Nl = { class: "fo-sidebar-sub-main" }, Pl = { class: "fo-sidebar-sub-text" }, Ol = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, Fl = ["title"], jl = { class: "fo-sidebar-sub-main" }, Bl = { class: "fo-sidebar-sub-text" }, Wl = { class: "gh-bili-sidebar-head" }, zl = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, Yl = { style: { color: "var(--dim)", "font-size": "9.5px" } }, Vl = ["title", "aria-label"], ql = {
  class: "gh-bili-folder-list",
  id: "gh-folder-list"
}, Kl = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, Xl = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, Ql = {
  class: "card-fullscreen-gh-search gh-hero-search-box-wrap",
  id: "gh-head-search-wrap"
}, Jl = ["title"], Zl = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, er = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, tr = ["placeholder"], sr = ["title"], or = { class: "gh-search-rule-icon" }, nr = { class: "gh-search-rule-text" }, ar = ["title"], lr = ["title"], rr = { class: "gh-header-msg-label" }, ir = {
  key: 0,
  class: "gh-header-msg-badge"
}, ur = { class: "gh-settings-anchor" }, cr = ["aria-expanded", "aria-label", "title"], dr = {
  id: "vue-github-repositories-root",
  style: { flex: "1", "min-height": "0", display: "flex", "flex-direction": "column" }
}, pr = /* @__PURE__ */ Me({
  __name: "GitHubWorkspaceCard",
  setup(b) {
    const l = ft(() => import("./GitHubSettingsModal-1b0mOSVl.js")), r = ft(() => import("./LauncherBookGuideDialog-D8xtZBeH.js")), { active: d } = Tt("card-github", "/github.html");
    let m = 0, v = !1, A;
    const f = N(""), w = N("stars");
    me(() => d.value && w.value === "stars", (q) => V.setAiViewActive(q), { immediate: !0, flush: "sync" });
    const k = N(!1), D = N("local"), T = N(""), x = N(!1), R = N(!1);
    me(d, (q) => {
      q || (R.value = !1);
    });
    const L = N(0);
    function S() {
      d.value && (x.value = !0, ++L.value);
    }
    const J = N(!1);
    me(x, (q) => {
      q && (J.value = !0);
    });
    const I = N(null);
    let H = 0;
    function Z(q) {
      w.value = q, q === "trending" ? bt.switchTab("trending") : bt.switchTab("stars");
    }
    function oe() {
      w.value = "stars";
    }
    const ie = se(() => [
      { id: "exact", icon: "🎯", name: G("search.rule.exact"), desc: G("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: G("search.rule.fuzzy"), desc: G("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: G("search.rule.topic"), desc: G("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: G("search.rule.smart"), desc: G("search.rule.smartDesc") }
    ]), re = N(V.searchRule || "exact"), E = se(() => ie.value.find((q) => q.id === re.value) || ie.value[0]);
    function j() {
      const q = V.cycleSearchRule();
      re.value = q;
    }
    const B = se(() => D.value === "global" ? G("github.searchGlobalPlaceholder") : G("github.searchLocalPlaceholder", { rule: E.value.name }));
    function P() {
      clearTimeout(H), !(!d.value || D.value !== "local") && (H = window.setTimeout(() => V.setSearchQuery(T.value.trim().toLowerCase()), 180));
    }
    function z() {
      D.value = D.value === "local" ? "global" : "local", D.value === "local" && P();
    }
    function ee() {
      T.value = "", clearTimeout(H), V.resetLocalSearch();
    }
    function de() {
      const q = T.value.trim();
      D.value === "local" ? (clearTimeout(H), V.setSearchQuery(q.toLowerCase())) : q && window.open(`https://github.com/search?q=${encodeURIComponent(q)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function ae() {
      ++m, v = !0, f.value = "";
    }
    return me(d, async (q) => {
      if (clearTimeout(H), !q) return;
      const C = ++m;
      if ((!A || A.signal.aborted) && (A = new AbortController(), V.setRepositoryViewSignal(A.signal)), v) {
        await V.resumeRepositoryReads();
        return;
      }
      if (V.repos.length || V.loadingAllStars || V.loadingPage) {
        v = !0;
        return;
      }
      try {
        const X = await kt();
        if (C !== m || A.signal.aborted) return;
        v = !0, await V.loadGitHub(X.ghUser, X.ghToken);
      } catch {
        if (C !== m || A?.signal.aborted) return;
        v = !1, f.value = G("github.initError");
      }
    }, { immediate: !0, flush: "sync" }), Mt(() => {
      V.setAiViewActive(!1), ++m, A?.abort(), clearTimeout(H);
    }), (q, C) => (o(), i("section", {
      class: F(["card wide", { "card-fullscreen": t(It).activeId === "card-github" }]),
      id: "card-github",
      inert: !t(d)
    }, [
      C[28] || (C[28] = e("header", { class: "card-head" }, [
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
      f.value ? (o(), i("p", bl, a(f.value), 1)) : $("", !0),
      e("div", yl, [
        e("div", _l, [
          e("aside", wl, [
            e("div", {
              class: F(["fo-sidebar-toggle-bar", { "is-collapsed": k.value }]),
              title: k.value ? t(G)("github.channel.toggleExpand") : t(G)("github.channel.toggleCollapse"),
              onClick: C[0] || (C[0] = (X) => k.value = !k.value)
            }, [
              e("div", Cl, [
                C[13] || (C[13] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, a(t(G)("github.channel.channels")), 1),
                k.value ? (o(), i("span", $l, "3")) : $("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !k.value,
                title: k.value ? t(G)("github.expand") : t(G)("github.collapse")
              }, [
                e("span", null, a(k.value ? t(G)("github.expand") : t(G)("github.collapse")), 1),
                e("span", Ml, a(k.value ? "▾" : "▴"), 1)
              ], 8, Gl)
            ], 10, kl),
            k.value ? $("", !0) : (o(), i("div", Tl, [
              e("div", Rl, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: w.value === "stars" }]),
                  title: t(G)("github.channel.starsTitle"),
                  onClick: C[1] || (C[1] = (X) => Z("stars"))
                }, [
                  e("div", Dl, [
                    C[14] || (C[14] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", Ll, [
                      e("strong", null, a(t(G)("github.channel.stars")), 1),
                      e("small", null, a(t(G)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  C[15] || (C[15] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, Sl)
              ]),
              e("div", Al, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: w.value === "trending" }]),
                  title: t(G)("github.channel.trendingTitle"),
                  onClick: C[2] || (C[2] = (X) => Z("trending"))
                }, [
                  e("div", El, [
                    C[16] || (C[16] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", Hl, [
                      e("strong", null, a(t(G)("github.channel.trending")), 1),
                      e("small", null, a(t(G)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  C[17] || (C[17] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, xl)
              ]),
              e("div", Ul, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: w.value === "awesome" }]),
                  title: t(G)("github.channel.awesomeTitle"),
                  onClick: C[3] || (C[3] = (X) => Z("awesome"))
                }, [
                  e("div", Nl, [
                    C[18] || (C[18] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", Pl, [
                      e("strong", null, a(t(G)("github.channel.awesome")), 1),
                      e("small", null, a(t(G)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  C[19] || (C[19] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, Il)
              ]),
              e("div", Ol, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: w.value === "repos" }]),
                  title: t(G)("github.channel.reposTitle"),
                  onClick: C[4] || (C[4] = (X) => Z("repos"))
                }, [
                  e("div", jl, [
                    C[20] || (C[20] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", Bl, [
                      e("strong", null, a(t(G)("github.channel.repos")), 1),
                      e("small", null, a(t(G)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  C[21] || (C[21] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, Fl)
              ])
            ])),
            e("header", Wl, [
              e("div", null, [
                e("b", zl, [
                  C[22] || (C[22] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  te(" " + a(t(G)("github.lists.title")), 1)
                ]),
                e("small", Yl, a(t(G)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: t(G)("github.lists.new"),
                "aria-label": t(G)("github.lists.new"),
                onClick: C[5] || (C[5] = (X) => t(V).promptCreateFolder())
              }, "＋", 8, Vl)
            ]),
            e("nav", ql, [
              Ae(xt, {
                active: t(d),
                onSelect: oe
              }, null, 8, ["active"])
            ])
          ]),
          e("section", Kl, [
            w.value === "stars" && t(Lt).accountConfigured === !1 ? (o(), he(At, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: C[6] || (C[6] = (X) => x.value = !0)
            })) : w.value === "stars" ? (o(), i(Y, { key: 1 }, [
              e("header", Xl, [
                Ae(Et, {
                  onOpenAiSettings: S,
                  onOpenGuide: C[11] || (C[11] = (X) => R.value = !0)
                }, {
                  search: mt(() => [
                    e("div", Ql, [
                      e("form", {
                        id: "gh-search-form",
                        class: "gh-search-box",
                        onSubmit: Q(de, ["prevent"])
                      }, [
                        e("button", {
                          type: "button",
                          id: "gh-search-mode-toggle",
                          class: "gh-search-mode-toggle",
                          title: D.value === "local" ? t(G)("github.searchScope.toGlobal") : t(G)("github.searchScope.toLocal"),
                          onClick: z
                        }, [
                          e("span", Zl, a(D.value === "local" ? "⭐" : "🌐"), 1),
                          e("span", er, a(D.value === "local" ? t(G)("github.searchScope.local") : t(G)("github.searchScope.global")), 1),
                          C[23] || (C[23] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
                        ], 8, Jl),
                        ge(e("input", {
                          id: "gh-search-input",
                          "onUpdate:modelValue": C[7] || (C[7] = (X) => T.value = X),
                          placeholder: B.value,
                          autocomplete: "off",
                          onInput: P
                        }, null, 40, tr), [
                          [Ie, T.value]
                        ]),
                        D.value === "local" ? (o(), i("button", {
                          key: 0,
                          type: "button",
                          class: F(["gh-search-rule-btn", `rule-${E.value.id}`]),
                          title: t(G)("github.ruleHint", { rule: E.value.name, desc: E.value.desc }),
                          onClick: Q(j, ["stop"])
                        }, [
                          e("span", or, a(E.value.icon), 1),
                          e("span", nr, a(E.value.name), 1)
                        ], 10, sr)) : $("", !0),
                        ge(e("button", {
                          type: "button",
                          id: "gh-search-clear-btn",
                          class: "gh-search-clear-btn",
                          title: t(G)("github.clearSearch"),
                          onClick: ee
                        }, "✕", 8, ar), [
                          [Qe, T.value]
                        ]),
                        C[24] || (C[24] = e("button", {
                          type: "submit",
                          id: "gh-search-submit-btn",
                          title: "搜索"
                        }, "⌕", -1))
                      ], 32),
                      C[25] || (C[25] = e("div", {
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
                          te("精确")
                        ]),
                        e("label", { title: "宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" }, [
                          e("input", {
                            type: "checkbox",
                            value: "loose"
                          }),
                          te("宽松匹配")
                        ]),
                        e("label", { title: "近义词：自动扩展相关英文词，例如 ai → llm / machine learning" }, [
                          e("input", {
                            type: "checkbox",
                            value: "related"
                          }),
                          te("近义词")
                        ]),
                        e("label", { title: "主题标签：搜索 GitHub Topics 标签，例如 topic:llm" }, [
                          e("input", {
                            type: "checkbox",
                            value: "topic"
                          }),
                          te("主题标签")
                        ]),
                        e("label", { title: "说明文档：搜索仓库 README 内容" }, [
                          e("input", {
                            type: "checkbox",
                            value: "readme"
                          }),
                          te("说明文档")
                        ])
                      ], -1)),
                      C[26] || (C[26] = e("div", {
                        id: "gh-search-suggest",
                        class: "gh-search-suggest",
                        hidden: ""
                      }, null, -1))
                    ])
                  ]),
                  "actions-prefix": mt(() => [
                    e("button", {
                      id: "gh-header-msg-center-btn",
                      class: F(["gh-header-msg-btn", { "has-unread": t(U).unreadCount > 0, "is-active": t(U).isOpen }]),
                      type: "button",
                      title: t(U).unreadCount > 0 ? t(G)("github.header.msgUnread", { count: t(U).unreadCount }) : t(G)("github.header.msgCenter"),
                      onClick: C[8] || (C[8] = (X) => t(Ce).toggle())
                    }, [
                      C[27] || (C[27] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
                      e("span", rr, a(t(G)("github.header.msg")), 1),
                      t(U).unreadCount > 0 ? (o(), i("span", ir, a(t(U).unreadCount > 99 ? "99+" : t(U).unreadCount), 1)) : $("", !0)
                    ], 10, lr),
                    e("div", ur, [
                      e("button", {
                        type: "button",
                        ref_key: "settingsButton",
                        ref: I,
                        "aria-expanded": x.value,
                        "aria-label": t(G)("github.settings"),
                        class: "gh-head-settings-btn",
                        title: t(G)("github.header.settings"),
                        onClick: C[9] || (C[9] = (X) => x.value = !x.value)
                      }, " ⚙️ ", 8, cr),
                      J.value ? (o(), he(t(l), {
                        key: 0,
                        visible: t(d) && x.value,
                        anchor: I.value,
                        "ai-request": L.value,
                        onAccountReload: ae,
                        onClose: C[10] || (C[10] = (X) => x.value = !1)
                      }, null, 8, ["visible", "anchor", "ai-request"])) : $("", !0)
                    ])
                  ]),
                  _: 1
                })
              ]),
              e("div", dr, [
                Ae(Tn, {
                  active: t(d) && w.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : w.value === "trending" ? (o(), he(Ht, { key: 2 })) : w.value === "awesome" ? (o(), he(os, { key: 3 })) : w.value === "repos" ? (o(), he(io, {
              key: 4,
              active: t(d) && w.value === "repos"
            }, null, 8, ["active"])) : $("", !0)
          ])
        ])
      ]),
      R.value ? (o(), he(t(r), {
        key: 1,
        open: R.value,
        title: "GitHub 使用手册",
        spreads: t(fl),
        "help-selector": ".gh-github-help-btn",
        onClose: C[12] || (C[12] = (X) => R.value = !1)
      }, null, 8, ["open", "spreads"])) : $("", !0),
      Ae(na),
      Ae(ml)
    ], 10, vl));
  }
}), $r = /* @__PURE__ */ Te(pr, [["__scopeId", "data-v-53375c13"]]);
export {
  $r as default
};
