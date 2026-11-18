import { d as Se, o as t, e as s, i as e, l as ge, n as Me, f as $, F as B, g as J, A as W, t as o, u as n, h as te, b as R, s as ae, r as Ue, w as he, B as lt, x as rt, y as je, k as et, j as be, T as mt, z as ot, m as Q, C as ft, p as He, H as kt, E as $t, I as tt, D as Ct } from "./vendor-vue-BrDsOMg2.js";
import { u as Et } from "./useCardActivity-CxxoOp6_.js";
import { u as vt, v as Be, s as se, w as nt, f as Y, R as St, m as Ut, j as it, o as at, l as It, r as st, G as Nt, x as Pt, t as Ot } from "./github.service-CDL2AZ5t.js";
import { A as Ft } from "./AccountSetupGuide-Cc8M89t4.js";
import { g as Dt, G as jt, a as Bt, b as Rt } from "./main-CjA0aHN2.js";
import zt from "./GitHubTrending-B5c5A2XP.js";
import { _ as Re, t as E } from "./_plugin-vue_export-helper-Do3lP4W5.js";
import { i as qt, l as Wt } from "./github-resources-B56ACkK0.js";
import { s as We } from "./storage-cache.service-BYF2zxXX.js";
import { n as Gt } from "./mini-player-store-HSHTqfkQ.js";
import { l as Vt, r as Yt, a as Kt } from "./workspace-bridge-DoEt_1yp.js";
import { o as dt, f as Qt } from "./fullscreen-presentation-Byb88Aul.js";
import { k as Xt, w as Zt } from "./search.service-Cpqvf4pp.js";
import { m as Ee } from "./core-utils-KTt-RZby.js";
const Jt = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], es = [
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
], ts = { class: "gh-awesome-wrapper" }, ss = { class: "gh-awesome-header" }, os = { class: "gh-awesome-intro" }, ns = { class: "gh-awesome-search-box" }, as = { class: "gh-awesome-pills" }, ls = ["onClick"], rs = { class: "gh-awesome-grid" }, is = ["onClick"], us = { class: "gh-awesome-card-head" }, cs = { class: "gh-awesome-card-name" }, ds = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, ps = { class: "gh-awesome-desc" }, hs = { class: "gh-awesome-footer" }, gs = { class: "gh-awesome-tags" }, ms = ["href"], fs = {
  key: 0,
  class: "gh-awesome-empty"
}, vs = /* @__PURE__ */ Se({
  __name: "GitHubAwesome",
  setup(k) {
    const u = R("all"), l = R(""), r = ae(() => {
      const v = l.value.trim().toLowerCase(), G = u.value;
      return es.filter((m) => G === "all" || m.category === G ? v ? m.name.toLowerCase().includes(v) || m.title.toLowerCase().includes(v) || m.desc.toLowerCase().includes(v) || m.tags.some((y) => y.toLowerCase().includes(v)) : !0 : !1);
    });
    function g(v) {
      window.open(v, "_blank", "noreferrer");
    }
    return (v, G) => (t(), s("div", ts, [
      e("header", ss, [
        e("div", os, [
          G[3] || (G[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", ns, [
            ge(e("input", {
              "onUpdate:modelValue": G[0] || (G[0] = (m) => l.value = m),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [Me, l.value]
            ]),
            l.value ? (t(), s("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: G[1] || (G[1] = (m) => l.value = "")
            }, "✕")) : $("", !0)
          ])
        ]),
        e("div", as, [
          (t(!0), s(B, null, J(n(Jt), (m) => (t(), s("button", {
            key: m.id,
            type: "button",
            class: W(["gh-awesome-pill", { active: u.value === m.id }]),
            onClick: (b) => u.value = m.id
          }, [
            e("span", null, o(m.icon), 1),
            e("b", null, o(m.name), 1)
          ], 10, ls))), 128))
        ])
      ]),
      e("div", rs, [
        (t(!0), s(B, null, J(r.value, (m) => (t(), s("article", {
          key: m.id,
          class: "gh-awesome-card",
          onClick: (b) => g(m.url)
        }, [
          e("div", us, [
            e("div", cs, [
              e("strong", null, o(m.title), 1),
              e("small", null, o(m.name), 1)
            ]),
            e("span", ds, "★ " + o(m.stars), 1)
          ]),
          e("p", ps, o(m.desc), 1),
          e("div", hs, [
            e("div", gs, [
              (t(!0), s(B, null, J(m.tags, (b) => (t(), s("span", {
                key: b,
                class: "gh-awesome-tag"
              }, o(b), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: m.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: G[2] || (G[2] = te(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, ms)
          ])
        ], 8, is))), 128)),
        r.value.length ? $("", !0) : (t(), s("div", fs, [...G[4] || (G[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), bs = /* @__PURE__ */ Re(vs, [["__scopeId", "data-v-84728b47"]]), Ve = "gh_my_repos_cache_v1", Ye = "gh_my_repo_groups_v2", Ke = "gh_my_repo_groups_map_v2", I = Ue({
  loading: !1,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});
function Ne(k) {
  return k.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
}
class Oe {
  constructor() {
    this.abortController = null, this.inFlightPromise = null;
  }
  static getInstance() {
    return Oe.instance || (Oe.instance = new Oe()), Oe.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略，支持并发防抖与请求去重）
   */
  async load(u = !1) {
    if (!u && this.inFlightPromise)
      return this.inFlightPromise;
    u && (this.abortController?.abort(), this.inFlightPromise = null), this.abortController = new AbortController();
    const l = this.abortController.signal, r = (async () => {
      await this.loadPersistedGroups();
      const g = await We.get(Ve);
      if (g && g.length ? this.hydrateRepos(g) : I.repos.length && this.hydrateRepos(I.repos), u || !I.repos.length) {
        I.loading = !0, I.errorMessage = "";
        try {
          await this.fetchRemote(l);
        } catch (G) {
          if (G.name === "AbortError") return;
          I.errorMessage = G.message || "获取个人仓库失败";
        } finally {
          I.loading = !1;
        }
      } else
        this.fetchRemote(l).catch(() => {
        });
    })();
    return this.inFlightPromise = r.finally(() => {
      this.inFlightPromise === r && (this.inFlightPromise = null);
    }), this.inFlightPromise;
  }
  async fetchRemote(u) {
    const { ghUser: l, ghToken: r } = await vt();
    if (!l && !r) {
      I.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    const g = Be(r), v = [], G = /* @__PURE__ */ new Set();
    if (l)
      try {
        const b = `https://api.github.com/users/${encodeURIComponent(l)}/repos?type=owner&sort=updated&per_page=100`, y = await fetch(b, { method: "GET", headers: g, signal: u });
        if (y.ok) {
          const D = await y.json();
          if (Array.isArray(D))
            for (const S of D)
              S && S.id && !G.has(S.id) && (G.add(S.id), v.push(S));
        }
      } catch (b) {
        if (b.name === "AbortError") throw b;
      }
    if (r)
      try {
        const y = await fetch("https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100", { method: "GET", headers: g, signal: u });
        if (y.ok) {
          const D = await y.json();
          if (Array.isArray(D))
            for (const S of D)
              S && S.id && !G.has(S.id) && (G.add(S.id), v.push(S));
        }
      } catch (b) {
        if (b.name === "AbortError") throw b;
      }
    if (!v.length) {
      I.repos.length || (I.errorMessage = "未能读取到个人仓库，请检查网络或 GitHub 设置。");
      return;
    }
    const m = v.map((b) => {
      const y = b.full_name || `${b.owner?.login || l}/${b.name}`, D = b.name, S = I.repoGroupsMap[y] || I.repoGroupsMap[D] || I.repoGroupsMap[y.toLowerCase()] || I.repoGroupsMap[D.toLowerCase()] || [];
      return {
        id: b.id,
        name: b.name,
        fullName: y,
        description: b.description || "",
        isPrivate: !!b.private,
        isFork: !!b.fork,
        htmlUrl: b.html_url || `https://github.com/${l}/${b.name}`,
        language: b.language || null,
        stargazersCount: Number(b.stargazers_count) || 0,
        forksCount: Number(b.forks_count) || 0,
        openIssuesCount: Number(b.open_issues_count) || 0,
        topics: Array.isArray(b.topics) ? b.topics.map((N) => String(N).toLowerCase()) : [],
        localGroups: S,
        updatedAt: b.updated_at || "",
        pushedAt: b.pushed_at || "",
        defaultBranch: b.default_branch || "main"
      };
    });
    this.hydrateRepos(m), await We.set(Ve, m, { ttlMs: 30 * 86400 * 1e3 });
  }
  hydrateRepos(u) {
    let l = !1;
    I.repos = u.map((r) => {
      const g = I.repoGroupsMap[r.fullName] || I.repoGroupsMap[r.name] || I.repoGroupsMap[r.fullName.toLowerCase()] || I.repoGroupsMap[r.name.toLowerCase()], v = r.localGroups && r.localGroups.length ? r.localGroups : null, G = qt(r, I.customGroups), m = (g && g.length ? g : null) || v || G, b = m ? [...new Set(m.filter(Boolean))] : [];
      return b.length && (!I.repoGroupsMap[r.fullName] || !I.repoGroupsMap[r.fullName].length) && (I.repoGroupsMap[r.fullName] = b, l = !0), {
        ...r,
        localGroups: b
      };
    }), l && this.persistGroupsMap();
  }
  /**
   * 将仓库添加到本地自定义分组
   */
  async addRepoToGroup(u, l) {
    const r = Ne(l);
    r && (u.localGroups.includes(r) || u.localGroups.push(r), I.repoGroupsMap[u.fullName] = [...u.localGroups], await this.persistGroupsMap(), await We.set(Ve, I.repos, { ttlMs: 30 * 86400 * 1e3 }));
  }
  /**
   * 将仓库从指定本地分组中移出
   */
  async removeRepoFromGroup(u, l) {
    u.localGroups = u.localGroups.filter((r) => r !== l), I.repoGroupsMap[u.fullName] = [...u.localGroups], await this.persistGroupsMap(), await We.set(Ve, I.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  async moveRepoToGroup(u, l) {
    if (!l)
      u.localGroups = [];
    else {
      const r = Ne(l);
      if (!r) return;
      u.localGroups = [r];
    }
    I.repoGroupsMap[u.fullName] = [...u.localGroups], await this.persistGroupsMap(), await We.set(Ve, I.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 新建一个本地分组板块
   */
  async createGroup(u) {
    const l = Ne(u);
    return l ? I.customGroups.includes(l) ? (alert(`分组「${l}」已存在。`), null) : (I.customGroups.push(l), await this.persistGroups(), l) : (alert("分组名称不能为空。"), null);
  }
  /**
   * 重命名本地分组
   */
  async renameGroup(u, l) {
    const r = Ne(l);
    return r ? u === r ? !0 : I.customGroups.includes(r) ? (alert(`已存在名为「${r}」的分组。`), !1) : (I.customGroups = I.customGroups.map((g) => g === u ? r : g), I.repos.forEach((g) => {
      g.localGroups.includes(u) && (g.localGroups = g.localGroups.map((v) => v === u ? r : v), I.repoGroupsMap[g.fullName] = [...g.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : (alert("新分组名称不能为空。"), !1);
  }
  /**
   * 删除本地分组
   */
  async deleteGroup(u) {
    const l = I.repos.filter((g) => g.localGroups.includes(u)).length, r = l > 0 ? `确定删除分组「${u}」吗？
该分组下的 ${l} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。` : `确定删除空分组「${u}」吗？`;
    return confirm(r) ? (I.customGroups = I.customGroups.filter((g) => g !== u), I.repos.forEach((g) => {
      g.localGroups.includes(u) && (g.localGroups = g.localGroups.filter((v) => v !== u), I.repoGroupsMap[g.fullName] = [...g.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : !1;
  }
  async loadPersistedGroups() {
    try {
      let u = null, l = null;
      if (typeof chrome < "u" && chrome.storage?.local) {
        const r = await chrome.storage.local.get([Ye, Ke]);
        u = r?.[Ye], l = r?.[Ke];
      }
      if (!u || !Array.isArray(u)) {
        const r = localStorage.getItem(Ye);
        r && (u = JSON.parse(r));
      }
      if (!l || typeof l != "object") {
        const r = localStorage.getItem(Ke);
        r && (l = JSON.parse(r));
      }
      Array.isArray(u) && (I.customGroups = u.map(Ne).filter(Boolean)), l && typeof l == "object" && (I.repoGroupsMap = l);
    } catch {
    }
  }
  async persistGroupsMap() {
    try {
      const u = { ...I.repoGroupsMap };
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Ke]: u }), localStorage.setItem(Ke, JSON.stringify(u));
    } catch {
    }
  }
  async persistGroups() {
    const u = Array.from(new Set(I.customGroups.map(Ne).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Ye]: u }), localStorage.setItem(Ye, JSON.stringify(u));
    } catch {
    }
  }
}
const fe = Oe.getInstance(), ys = { class: "my-repos-workspace" }, _s = {
  key: 0,
  class: "error-banner"
}, ws = { class: "shelf-header" }, ks = { class: "shelf-left" }, $s = { class: "shelf-badge" }, Cs = { class: "shelf-right" }, Ss = { class: "shelf-search-wrap" }, Rs = ["disabled", "title"], Gs = ["title"], Ms = ["onDragstart", "onContextmenu"], Ts = { class: "repo-card-head" }, Ls = ["title", "onClick"], Ds = {
  key: 0,
  class: "badge-repo-visibility private"
}, As = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Hs = ["title"], xs = {
  key: 1,
  class: "repo-topics-row"
}, Es = { class: "repo-card-footer" }, Us = { class: "meta-left" }, Is = {
  key: 0,
  class: "meta-item lang"
}, Ns = { class: "meta-item" }, Ps = {
  key: 1,
  class: "meta-item"
}, Os = ["title"], Fs = { class: "board-columns-track" }, js = ["onDragover", "onDragleave", "onDrop"], Bs = { class: "column-header" }, zs = {
  key: 0,
  class: "column-title-group"
}, qs = ["title"], Ws = { class: "badge-count" }, Vs = {
  key: 1,
  class: "column-rename-group"
}, Ys = ["onKeydown"], Ks = ["onClick"], Qs = { class: "column-actions" }, Xs = ["onClick"], Zs = {
  key: 0,
  class: "col-popover-menu"
}, Js = ["onClick"], eo = ["onClick"], to = { class: "column-cards-scroll" }, so = ["onDragstart", "onContextmenu"], oo = { class: "repo-card-head" }, no = ["title", "onClick"], ao = {
  key: 0,
  class: "badge-repo-visibility private"
}, lo = {
  key: 1,
  class: "badge-repo-visibility fork"
}, ro = ["title"], io = { class: "repo-topics-row" }, uo = { class: "topic-chip active-chip" }, co = ["onClick"], po = { class: "repo-card-footer" }, ho = { class: "meta-left" }, go = {
  key: 0,
  class: "meta-item lang"
}, mo = { class: "meta-item" }, fo = {
  key: 1,
  class: "meta-item"
}, vo = { class: "meta-date" }, bo = {
  key: 0,
  class: "empty-column-placeholder"
}, yo = { class: "board-column new-column-slot" }, _o = {
  key: 1,
  class: "new-column-composer"
}, wo = { class: "composer-actions" }, ko = ["onClick"], $o = /* @__PURE__ */ Se({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(k) {
    const u = k, l = R(""), r = R(!1), g = R(null), v = R(""), G = R(null), m = R(null), b = R(null), y = R(!1);
    function D() {
      y.value = !y.value;
    }
    function S(h) {
      const p = b.value;
      p && (Math.abs(h.deltaX) > Math.abs(h.deltaY) && h.deltaX !== 0 || h.deltaY !== 0 && (h.preventDefault(), p.scrollLeft += h.deltaY));
    }
    const N = R(null), U = R(null), A = R(null);
    let H = null, z = 0;
    const L = Ue({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromGroup: null
    }), x = R(null), X = R(!1);
    function ee() {
      L.visible = !1, x.value = null;
    }
    function ie(h, p, f) {
      h.preventDefault(), h.stopPropagation();
      let M = h.clientX, de = h.clientY;
      M > window.innerWidth - 200 && (M = window.innerWidth - 210), de > window.innerHeight - 240 && (de = window.innerHeight - 245), L.x = M, L.y = de, L.repo = p, L.fromGroup = f, L.visible = !0, x.value = "folder", X.value = M > window.innerWidth - 380;
    }
    async function ne() {
      const h = L.repo;
      ee(), h && await fe.moveRepoToGroup(h, null);
    }
    async function P(h) {
      const p = L.repo;
      ee(), p && await fe.moveRepoToGroup(p, h);
    }
    async function O() {
      const h = L.repo;
      if (ee(), !!h)
        try {
          await navigator.clipboard.writeText(h.htmlUrl), Gt.show({
            appName: "GitHub",
            title: E("github.myRepos.copiedUrlTitle"),
            message: E("github.myRepos.copiedUrlMsg", { name: h.name })
          });
        } catch {
        }
    }
    async function F() {
      const h = L.repo;
      if (ee(), !!h)
        try {
          const p = `git clone ${h.htmlUrl}.git`;
          await navigator.clipboard.writeText(p), Gt.show({
            appName: "GitHub",
            title: E("github.myRepos.copiedCloneTitle"),
            message: p
          });
        } catch {
        }
    }
    function q() {
      const h = L.repo;
      ee(), h && ze(h.htmlUrl);
    }
    function V() {
      const h = L.repo;
      ee(), h && Dt.open({
        fullName: h.fullName,
        description: h.description || "",
        stars: h.stargazersCount,
        language: h.language || void 0,
        updated: h.pushedAt
      });
    }
    function oe(h) {
      h.target?.closest(".gh-repo-context-menu") || L.visible && ee();
    }
    function le(h) {
      h.key === "Escape" && L.visible && ee();
    }
    const ue = ae(() => I.customGroups), ve = ae(() => {
      const h = I.searchQuery.trim().toLowerCase();
      return h ? I.repos.filter(
        (p) => p.name.toLowerCase().includes(h) || p.description.toLowerCase().includes(h) || p.localGroups.some((f) => f.toLowerCase().includes(h)) || p.topics.some((f) => f.toLowerCase().includes(h)) || p.language && p.language.toLowerCase().includes(h)
      ) : I.repos;
    }), _e = ae(() => ve.value.filter((h) => !h.localGroups.length));
    function me(h) {
      return ve.value.filter((p) => p.localGroups.includes(h));
    }
    async function ye() {
      const h = l.value.trim();
      if (!h) return;
      await fe.createGroup(h) && (l.value = "", r.value = !1);
    }
    function Te(h) {
      G.value = h, v.value = h, g.value = null;
    }
    async function Ge(h) {
      const p = v.value.trim();
      if (!p || p === h) {
        G.value = null;
        return;
      }
      await fe.renameGroup(h, p) && (G.value = null);
    }
    async function De(h) {
      g.value = null, await fe.deleteGroup(h);
    }
    async function Ae(h, p) {
      await fe.removeRepoFromGroup(h, p);
    }
    function C(h) {
      const p = m.value;
      if (!p) return;
      const M = h.target?.closest(".column-cards-scroll");
      if (M && M.scrollHeight > M.clientHeight && !h.shiftKey && h.deltaX === 0) {
        const de = M.scrollTop <= 0 && h.deltaY < 0, Je = M.scrollTop + M.clientHeight >= M.scrollHeight - 1 && h.deltaY > 0;
        if (!de && !Je)
          return;
      }
      Math.abs(h.deltaX) > Math.abs(h.deltaY) && h.deltaX !== 0 || h.deltaY !== 0 && (h.preventDefault(), p.scrollLeft += h.deltaY);
    }
    function a(h) {
      if (!N.value || !m.value) return;
      h.preventDefault();
      const p = h.deltaX !== 0 ? h.deltaX : h.deltaY;
      m.value.scrollLeft += p;
    }
    function _() {
      if (H !== null) return;
      const h = () => {
        m.value && z !== 0 ? (m.value.scrollLeft += z, H = requestAnimationFrame(h)) : ce();
      };
      H = requestAnimationFrame(h);
    }
    function ce() {
      H !== null && (cancelAnimationFrame(H), H = null), z = 0;
    }
    function pe(h) {
      if (!N.value || !m.value) return;
      const p = m.value.getBoundingClientRect(), f = 100;
      if (h > p.right - f) {
        const M = Math.min(1, Math.max(0.1, (h - (p.right - f)) / f));
        z = Math.round(M * 20), _();
      } else if (h < p.left + f) {
        const M = Math.min(1, Math.max(0.1, (p.left + f - h) / f));
        z = -Math.round(M * 20), _();
      } else
        ce();
    }
    function re(h) {
      N.value && (h.preventDefault(), pe(h.clientX));
    }
    function Le(h, p, f) {
      ee(), N.value = p, U.value = f, h.dataTransfer && (h.dataTransfer.effectAllowed = "move", h.dataTransfer.setData("text/plain", `${p.id}:${f}`)), window.addEventListener("wheel", a, { passive: !1 });
    }
    function we() {
      N.value = null, U.value = null, A.value = null, ce(), window.removeEventListener("wheel", a);
    }
    function $e(h, p) {
      N.value && (h.preventDefault(), h.dataTransfer && (h.dataTransfer.dropEffect = "move"), A.value = p, pe(h.clientX));
    }
    function ke(h, p) {
      const f = h.currentTarget, M = h.relatedTarget;
      f?.contains(M) || A.value === p && (A.value = null);
    }
    async function Ze(h, p) {
      h.preventDefault();
      const f = N.value, M = U.value;
      we(), f && (p === "default" ? M && M !== "default" ? await fe.removeRepoFromGroup(f, M) : await fe.moveRepoToGroup(f, null) : (await fe.addRepoToGroup(f, p), M && M !== "default" && M !== p && await fe.removeRepoFromGroup(f, M)));
    }
    function ze(h) {
      window.open(h, "_blank", "noopener,noreferrer");
    }
    function qe(h) {
      if (!h) return "";
      try {
        const p = new Date(h);
        return `${p.getFullYear()}-${String(p.getMonth() + 1).padStart(2, "0")}-${String(p.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return he(
      () => u.active,
      (h) => {
        ee(), h && fe.load();
      }
    ), lt(() => {
      window.addEventListener("pointerdown", oe), window.addEventListener("keydown", le), fe.load();
    }), rt(() => {
      ce(), window.removeEventListener("wheel", a), window.removeEventListener("pointerdown", oe), window.removeEventListener("keydown", le);
    }), (h, p) => (t(), s("div", ys, [
      n(I).errorMessage ? (t(), s("div", _s, [
        e("span", null, "⚠️ " + o(n(I).errorMessage), 1),
        e("button", {
          type: "button",
          class: "btn-retry",
          onClick: p[0] || (p[0] = (f) => n(fe).load(!0))
        }, "重试")
      ])) : $("", !0),
      e("section", {
        class: W(["default-shelf-area", { "is-collapsed": y.value, "drop-active": A.value === "default" }]),
        onDragover: p[4] || (p[4] = (f) => $e(f, "default")),
        onDragleave: p[5] || (p[5] = (f) => ke(f, "default")),
        onDrop: p[6] || (p[6] = (f) => Ze(f, "default"))
      }, [
        e("header", ws, [
          e("div", ks, [
            p[23] || (p[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            p[24] || (p[24] = e("span", { class: "shelf-title" }, "未分类仓库", -1)),
            e("span", $s, o(_e.value.length), 1),
            p[25] || (p[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）", -1))
          ]),
          e("div", Cs, [
            e("div", Ss, [
              p[26] || (p[26] = e("span", { class: "search-icon" }, "🔍", -1)),
              ge(e("input", {
                "onUpdate:modelValue": p[1] || (p[1] = (f) => n(I).searchQuery = f),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索我的仓库名称、简介或语言…"
              }, null, 512), [
                [Me, n(I).searchQuery]
              ]),
              n(I).searchQuery ? (t(), s("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: p[2] || (p[2] = (f) => n(I).searchQuery = "")
              }, "✕")) : $("", !0)
            ]),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              disabled: n(I).loading,
              title: n(E)("github.myRepos.refreshBtnTitle"),
              onClick: p[3] || (p[3] = (f) => n(fe).load(!0))
            }, [
              e("span", {
                class: W({ spinning: n(I).loading })
              }, "🔄", 2),
              e("span", null, o(n(I).loading ? n(E)("github.myRepos.refreshing") : n(E)("common.refresh")), 1)
            ], 8, Rs),
            _e.value.length ? (t(), s("button", {
              key: 0,
              type: "button",
              class: "shelf-toggle-btn",
              title: y.value ? n(E)("github.myRepos.expandShelf") : n(E)("github.myRepos.collapseShelf"),
              onClick: D
            }, o(y.value ? n(E)("github.myRepos.expandBtn") : n(E)("github.myRepos.collapseBtn")), 9, Gs)) : $("", !0)
          ])
        ]),
        _e.value.length ? ge((t(), s("div", {
          key: 0,
          ref_key: "shelfScrollRef",
          ref: b,
          class: "shelf-cards-scroll",
          onWheel: S
        }, [
          (t(!0), s(B, null, J(_e.value, (f) => (t(), s("div", {
            key: f.id,
            class: W(["repo-card shelf-card", { "card-dragging": N.value?.id === f.id }]),
            draggable: "true",
            onDragstart: (M) => Le(M, f, "default"),
            onDragend: we,
            onContextmenu: (M) => ie(M, f, "default")
          }, [
            e("div", Ts, [
              e("span", {
                class: "repo-name",
                title: f.fullName,
                onClick: (M) => ze(f.htmlUrl)
              }, o(f.name), 9, Ls),
              f.isPrivate ? (t(), s("span", Ds, "私有")) : $("", !0),
              f.isFork ? (t(), s("span", As, "Fork")) : $("", !0)
            ]),
            f.description ? (t(), s("p", {
              key: 0,
              class: "repo-desc",
              title: f.description
            }, o(f.description), 9, Hs)) : $("", !0),
            f.topics.length ? (t(), s("div", xs, [
              (t(!0), s(B, null, J(f.topics, (M) => (t(), s("span", {
                key: M,
                class: "topic-chip-tag",
                title: "GitHub 远端引流标签"
              }, " #" + o(M), 1))), 128))
            ])) : $("", !0),
            e("div", Es, [
              e("div", Us, [
                f.language ? (t(), s("span", Is, [
                  p[27] || (p[27] = e("span", { class: "lang-color" }, null, -1)),
                  Q(o(f.language), 1)
                ])) : $("", !0),
                e("span", Ns, "⭐ " + o(f.stargazersCount), 1),
                f.forksCount ? (t(), s("span", Ps, "🍴 " + o(f.forksCount), 1)) : $("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + f.updatedAt
              }, o(qe(f.pushedAt || f.updatedAt)), 9, Os)
            ])
          ], 42, Ms))), 128))
        ], 544)), [
          [je, !y.value]
        ]) : $("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: m,
        class: "board-viewport",
        onWheel: C,
        onDragover: re
      }, [
        e("div", Fs, [
          (t(!0), s(B, null, J(ue.value, (f) => (t(), s("section", {
            key: f,
            class: W(["board-column topic-column", { "drop-active": A.value === f }]),
            onDragover: (M) => $e(M, f),
            onDragleave: (M) => ke(M, f),
            onDrop: (M) => Ze(M, f)
          }, [
            e("header", Bs, [
              G.value !== f ? (t(), s("div", zs, [
                p[28] || (p[28] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "自定义分组: " + f
                }, " 📁 " + o(f), 9, qs),
                e("span", Ws, o(me(f).length), 1)
              ])) : (t(), s("div", Vs, [
                ge(e("input", {
                  "onUpdate:modelValue": p[7] || (p[7] = (M) => v.value = M),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    et((M) => Ge(f), ["enter"]),
                    p[8] || (p[8] = et((M) => G.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, Ys), [
                  [Me, v.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (M) => Ge(f)
                }, "✓", 8, Ks),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: p[9] || (p[9] = (M) => G.value = null)
                }, "✕")
              ])),
              e("div", Qs, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "分组操作",
                  onClick: (M) => g.value = g.value === f ? null : f
                }, "•••", 8, Xs),
                g.value === f ? (t(), s("div", Zs, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (M) => Te(f)
                  }, " 重命名分组 ", 8, Js),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (M) => De(f)
                  }, " 删除分组 ", 8, eo)
                ])) : $("", !0)
              ])
            ]),
            e("div", to, [
              (t(!0), s(B, null, J(me(f), (M) => (t(), s("div", {
                key: M.id,
                class: W(["repo-card", { "card-dragging": N.value?.id === M.id }]),
                draggable: "true",
                onDragstart: (de) => Le(de, M, f),
                onDragend: we,
                onContextmenu: (de) => ie(de, M, f)
              }, [
                e("div", oo, [
                  e("span", {
                    class: "repo-name",
                    title: M.fullName,
                    onClick: (de) => ze(M.htmlUrl)
                  }, o(M.name), 9, no),
                  M.isPrivate ? (t(), s("span", ao, "私有")) : $("", !0),
                  M.isFork ? (t(), s("span", lo, "Fork")) : $("", !0)
                ]),
                M.description ? (t(), s("p", {
                  key: 0,
                  class: "repo-desc",
                  title: M.description
                }, o(M.description), 9, ro)) : $("", !0),
                e("div", io, [
                  e("span", uo, [
                    Q(" 📁 " + o(f) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从该分组移出",
                      onClick: te((de) => Ae(M, f), ["stop"])
                    }, "✕", 8, co)
                  ]),
                  (t(!0), s(B, null, J(M.topics, (de) => (t(), s("span", {
                    key: de,
                    class: "topic-chip-tag",
                    title: "GitHub 远端引流标签"
                  }, " #" + o(de), 1))), 128))
                ]),
                e("div", po, [
                  e("div", ho, [
                    M.language ? (t(), s("span", go, [
                      p[29] || (p[29] = e("span", { class: "lang-color" }, null, -1)),
                      Q(o(M.language), 1)
                    ])) : $("", !0),
                    e("span", mo, "⭐ " + o(M.stargazersCount), 1),
                    M.forksCount ? (t(), s("span", fo, "🍴 " + o(M.forksCount), 1)) : $("", !0)
                  ]),
                  e("span", vo, o(qe(M.pushedAt || M.updatedAt)), 1)
                ])
              ], 42, so))), 128)),
              me(f).length ? $("", !0) : (t(), s("div", bo, [...p[30] || (p[30] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, js))), 128)),
          e("section", yo, [
            r.value ? (t(), s("div", _o, [
              p[32] || (p[32] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建分组板块"),
                e("small", null, "支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics")
              ], -1)),
              ge(e("input", {
                "onUpdate:modelValue": p[11] || (p[11] = (f) => l.value = f),
                type: "text",
                placeholder: "输入分组名称（如：前端工具、深度学习）",
                class: "composer-input",
                onKeydown: [
                  et(ye, ["enter"]),
                  p[12] || (p[12] = et((f) => r.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [Me, l.value]
              ]),
              e("div", wo, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: ye
                }, "创建"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: p[13] || (p[13] = (f) => r.value = !1)
                }, o(n(E)("common.cancel")), 1)
              ])
            ])) : (t(), s("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: p[10] || (p[10] = (f) => r.value = !0)
            }, [...p[31] || (p[31] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建分组板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (t(), be(mt, { to: "body" }, [
        L.visible && L.repo ? (t(), s("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ot({ left: `${L.x}px`, top: `${L.y}px` }),
          onClick: p[21] || (p[21] = te(() => {
          }, ["stop"])),
          onContextmenu: p[22] || (p[22] = te(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: W(["gh-menu-has-sub", { "is-active": x.value === "folder" }]),
            onMouseenter: p[16] || (p[16] = (f) => x.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: p[14] || (p[14] = te((f) => x.value = x.value === "folder" ? null : "folder", ["stop"]))
            }, [...p[33] || (p[33] = [
              e("span", null, "移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: W(["gh-sub-flyout", { "flyout-left": X.value }]),
              onClick: p[15] || (p[15] = te(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: W(["fo-cover-menu-item", { primary: !L.repo.localGroups.length }]),
                type: "button",
                onClick: ne
              }, o(L.repo.localGroups.length ? "  " : "✓ ") + "设为未分类 ", 3),
              (t(!0), s(B, null, J(ue.value, (f) => (t(), s("button", {
                key: f,
                class: W(["fo-cover-menu-item", { primary: L.repo.localGroups.includes(f) }]),
                type: "button",
                onClick: (M) => P(f)
              }, o(L.repo.localGroups.includes(f) ? "✓ " : "  ") + "📁 " + o(f), 11, ko))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: p[17] || (p[17] = (f) => x.value = null),
            onClick: O
          }, o(n(E)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: p[18] || (p[18] = (f) => x.value = null),
            onClick: F
          }, o(n(E)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: p[19] || (p[19] = (f) => x.value = null),
            onClick: V
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: p[20] || (p[20] = (f) => x.value = null),
            onClick: q
          }, o(n(E)("github.myRepos.openInGitHub")), 33)
        ], 36)) : $("", !0)
      ]))
    ]));
  }
}), Co = /* @__PURE__ */ Re($o, [["__scopeId", "data-v-f77c8971"]]), Ce = Ue({
  uncatPage: 1,
  pageSize: 10
});
class Fe {
  static getInstance() {
    return Fe.instance || (Fe.instance = new Fe()), Fe.instance;
  }
  nextUncatPage() {
    this.uncatPage < this.uncatTotalPages && Ce.uncatPage++;
  }
  prevUncatPage() {
    Ce.uncatPage > 1 && Ce.uncatPage--;
  }
  setUncatPage(u) {
    const l = Math.max(1, Math.min(u, this.uncatTotalPages));
    Ce.uncatPage = l;
  }
  get uncatPage() {
    return Ce.uncatPage;
  }
  get uncatTotalPages() {
    const u = this.filteredUncatRepos.length;
    return Math.max(1, Math.ceil(u / Ce.pageSize));
  }
  /**
   * 未分类的所有 Star 仓库（带搜索过滤）
   */
  get filteredUncatRepos() {
    const u = se.searchQuery.trim().toLowerCase(), l = se.repos.filter((r) => nt(r.full_name).length === 0);
    return u ? l.filter(
      (r) => r.full_name.toLowerCase().includes(u) || r.description && r.description.toLowerCase().includes(u) || r.language && r.language.toLowerCase().includes(u) || r.topics && r.topics.some((g) => g.toLowerCase().includes(u))
    ) : l;
  }
  /**
   * 当前页切片的 10 个未分类 Star 仓库
   */
  get pagedUncatRepos() {
    const u = this.filteredUncatRepos, r = (Math.min(Ce.uncatPage, this.uncatTotalPages) - 1) * Ce.pageSize;
    return u.slice(r, r + Ce.pageSize);
  }
  /**
   * 各个本地分组板块列表（根据当前激活的大分组标签过滤）
   */
  get lists() {
    const u = se.activeSection || "默认";
    return se.lists.filter((l) => (l.section || "默认") === u);
  }
  /**
   * 获取归属于指定 GitHub List 的 Star 仓库（带搜索过滤）
   */
  getReposForList(u) {
    const l = se.searchQuery.trim().toLowerCase(), r = se.repos.filter((g) => nt(g.full_name).includes(u));
    return l ? r.filter(
      (g) => g.full_name.toLowerCase().includes(l) || g.description && g.description.toLowerCase().includes(l) || g.language && g.language.toLowerCase().includes(l) || g.topics && g.topics.some((v) => v.toLowerCase().includes(l))
    ) : r;
  }
  /**
   * 拖拽归入指定 List（若 target 为 'uncategorized' 则从所有 List 移出）
   */
  async moveRepoToList(u, l) {
    await Y.dropRepositoryIntoFolder(u, l);
  }
  /**
   * 从指定 List 移出仓库
   */
  async removeRepoFromList(u, l) {
    await Y.toggleRepoList(u, l);
  }
}
const Z = Fe.getInstance(), Pe = {
  mode: "idle",
  activeDragRepo: null,
  activeDragFromList: null,
  hoverTargetColumn: null,
  draggingColumnId: null,
  hoverColumnId: null,
  repoMenu: null,
  columnMenu: null
};
class So {
  constructor() {
    this._state = { ...Pe }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.githubStarsBoard = this);
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
  subscribe(u) {
    return this._listeners.add(u), () => {
      this._listeners.delete(u);
    };
  }
  _setState(u) {
    this._state = u;
    for (const l of this._listeners)
      l(u);
  }
  send(u) {
    const l = this._state;
    switch (u.type) {
      case "START_DRAG_REPO":
        return this._setState({
          mode: "dragging_repo",
          activeDragRepo: u.repo,
          activeDragFromList: u.fromList,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: null
        }), !0;
      case "HOVER_TARGET_COLUMN":
        return l.mode === "dragging_repo" ? (this._setState({
          ...l,
          hoverTargetColumn: u.columnId
        }), !0) : !1;
      case "END_DRAG_REPO":
        return l.mode === "dragging_repo" ? (this._setState({ ...Pe }), !0) : !1;
      case "START_DRAG_COLUMN":
        return this._setState({
          mode: "dragging_column",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: u.columnId,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: null
        }), !0;
      case "HOVER_COLUMN_REORDER":
        return l.mode === "dragging_column" ? (this._setState({
          ...l,
          hoverColumnId: u.columnId
        }), !0) : !1;
      case "END_DRAG_COLUMN":
        return l.mode === "dragging_column" ? (this._setState({ ...Pe }), !0) : !1;
      case "OPEN_REPO_MENU":
        return this._setState({
          mode: "repo_context_menu",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: u.payload,
          columnMenu: null
        }), !0;
      case "CLOSE_REPO_MENU":
        return l.mode === "repo_context_menu" ? (this._setState({ ...Pe }), !0) : !1;
      case "OPEN_COLUMN_MENU":
        return this._setState({
          mode: "column_menu",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: u.payload
        }), !0;
      case "CLOSE_COLUMN_MENU":
        return l.mode === "column_menu" ? (this._setState({ ...Pe }), !0) : !1;
      case "RESET_IDLE":
        return this._setState({ ...Pe }), !0;
      default:
        return !1;
    }
  }
}
const Ro = { class: "stars-board-workspace" }, Go = ["data-gh-list-drop"], Mo = { class: "shelf-header" }, To = { class: "shelf-left" }, Lo = { class: "shelf-badge" }, Do = { class: "shelf-right" }, Ao = {
  key: 0,
  class: "shelf-pager"
}, Ho = ["disabled"], xo = { class: "pager-text" }, Eo = ["disabled"], Uo = ["disabled", "aria-busy"], Io = ["title"], No = {
  key: 0,
  class: "shelf-cards-scroll"
}, Po = ["onClick", "onDragstart", "onContextmenu"], Oo = ["onClick"], Fo = { class: "gh-card-head" }, jo = ["src"], Bo = ["href", "title"], zo = { class: "owner" }, qo = { class: "gh-card-body" }, Wo = { class: "gh-card-badges" }, Vo = ["title"], Yo = ["title"], Ko = ["title"], Qo = { class: "meta" }, Xo = { class: "gh-stars" }, Zo = {
  key: 0,
  class: "gh-lang"
}, Jo = { class: "gh-updated" }, en = { class: "shelf-next-content" }, tn = { class: "shelf-next-sub" }, sn = {
  key: 2,
  class: "shelf-empty",
  role: "status"
}, on = {
  key: 0,
  class: "gh-drilldown-header"
}, nn = { class: "gh-drilldown-current" }, an = { class: "gh-drilldown-sub-count" }, ln = {
  key: 0,
  class: "board-columns-track"
}, rn = { class: "column-cards-scroll" }, un = {
  key: 1,
  class: "board-columns-track"
}, cn = ["data-gh-list-drop", "onDragover", "onDragleave", "onDrop"], dn = ["title"], pn = ["onClick"], hn = ["title"], gn = {
  key: 0,
  class: "col-pinned-icon",
  title: "已置顶分组"
}, mn = { class: "badge-count" }, fn = {
  key: 1,
  class: "col-sub-badge",
  title: "点击下钻查看所有子分组"
}, vn = { class: "column-actions" }, bn = ["onDragstart", "onClick"], yn = { class: "column-cards-scroll" }, _n = ["onClick", "onDragstart", "onContextmenu"], wn = ["onClick"], kn = { class: "gh-card-head" }, $n = ["src"], Cn = ["href", "title"], Sn = { class: "owner" }, Rn = { class: "gh-card-body" }, Gn = { class: "gh-card-badges" }, Mn = ["title"], Tn = ["onClick"], Ln = ["title"], Dn = ["title"], An = ["title"], Hn = { class: "meta" }, xn = { class: "gh-stars" }, En = {
  key: 0,
  class: "gh-lang"
}, Un = { class: "gh-updated" }, In = {
  key: 0,
  class: "empty-column-dropzone"
}, Nn = { class: "board-column add-column-panel" }, Pn = ["title"], On = ["onClick"], Fn = /* @__PURE__ */ Se({
  __name: "GitHubStarsBoard",
  props: {
    active: { type: Boolean }
  },
  setup(k) {
    const u = k, l = R(null), r = R(null), g = R(!1);
    function v() {
      g.value = !g.value;
    }
    function G(i) {
      const c = r.value;
      c && (Math.abs(i.deltaX) > Math.abs(i.deltaY) && i.deltaX !== 0 || i.deltaY !== 0 && (i.preventDefault(), c.scrollLeft += i.deltaY));
    }
    const m = ae(() => se.loading), b = ae(() => m.value && !se.repos.length), y = R(null);
    function D(i) {
      if (!i) return null;
      const c = i.match(/^(.+?)[/／](.+)$/);
      if (!c) return null;
      const d = c[1].trim(), w = c[2].trim();
      return !d || !w ? null : { parentPrefix: d, childName: w };
    }
    function S(i) {
      const c = D(i);
      if (!c) return null;
      const d = c.parentPrefix.toLowerCase(), w = Z.lists.find((K) => K.name.trim().toLowerCase() === d);
      return w ? w.name : null;
    }
    function N(i) {
      const c = i.trim().toLowerCase();
      return Z.lists.filter((d) => {
        const w = D(d.name);
        return w !== null && w.parentPrefix.toLowerCase() === c;
      });
    }
    function U(i) {
      return N(i).length > 0;
    }
    const A = ae(() => y.value ? N(y.value).length : 0);
    function H(i) {
      y.value = i, l.value && (l.value.scrollLeft = 0);
    }
    const z = ae(() => {
      const i = Z.lists;
      if (!y.value)
        return i.filter((K) => S(K.name) === null);
      const c = y.value.trim().toLowerCase(), d = i.find((K) => K.name.trim().toLowerCase() === c), w = N(y.value);
      return !d && !w.length ? (y.value = null, i.filter((K) => S(K.name) === null)) : d ? [d, ...w] : w;
    });
    he(() => se.activeSection, () => {
      y.value = null;
    });
    function L() {
      Y.promptCreateFolder(y.value || void 0);
    }
    const x = new So(), X = R(x.activeDragRepo), ee = R(x.activeDragFromList), ie = R(x.hoverTargetColumn);
    let ne = null, P = 0;
    function O() {
      ne === null && (ne = window.setInterval(() => {
        !l.value || P === 0 || (l.value.scrollLeft += P);
      }, 16));
    }
    function F() {
      ne !== null && (clearInterval(ne), ne = null), P = 0;
    }
    const q = Ue({
      visible: !1,
      x: 0,
      y: 0,
      list: null
    }), V = Ue({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromList: null
    }), oe = R(null), le = R(!1), ue = R(x.draggingColumnId), ve = R(x.hoverColumnId), _e = x.subscribe((i) => {
      X.value = i.activeDragRepo, ee.value = i.activeDragFromList, ie.value = i.hoverTargetColumn, ue.value = i.draggingColumnId, ve.value = i.hoverColumnId, q.visible = i.mode === "column_menu" && i.columnMenu !== null, q.x = i.columnMenu?.x ?? 0, q.y = i.columnMenu?.y ?? 0, q.list = i.columnMenu?.list ?? null, V.visible = i.mode === "repo_context_menu" && i.repoMenu !== null, V.x = i.repoMenu?.x ?? 0, V.y = i.repoMenu?.y ?? 0, V.repo = i.repoMenu?.repo ?? null, V.fromList = i.repoMenu?.fromList ?? null, oe.value = i.repoMenu?.activeSubMenu ?? null, le.value = i.repoMenu?.isFlyoutLeft ?? !1;
    });
    function me() {
      x.send({ type: "CLOSE_COLUMN_MENU" });
    }
    function ye(i, c) {
      i.preventDefault(), i.stopPropagation();
      const d = 150, w = 130, K = Math.min(i.clientX, window.innerWidth - d - 10), Ie = Math.min(i.clientY, window.innerHeight - w - 10);
      x.send({ type: "OPEN_COLUMN_MENU", payload: { x: K, y: Ie, list: c } });
    }
    async function Te() {
      const i = q.list;
      me(), i && await Y.renameFolder(i.id, i.name);
    }
    async function Ge() {
      const i = q.list;
      me(), i && await Y.pinFolder(i.id);
    }
    async function De() {
      const i = q.list;
      me(), i && await Y.deleteFolder(i.name);
    }
    function Ae(i, c) {
      x.send({ type: "START_DRAG_COLUMN", columnId: c.id }), i.dataTransfer && (i.dataTransfer.effectAllowed = "move", i.dataTransfer.setData("application/x-gh-col-id", c.id));
    }
    function C() {
      x.send({ type: "END_DRAG_COLUMN" });
    }
    function a(i, c) {
      !ue.value || ue.value === c || (i.preventDefault(), i.dataTransfer && (i.dataTransfer.dropEffect = "move"), x.send({ type: "HOVER_COLUMN_REORDER", columnId: c }));
    }
    function _(i, c) {
      ve.value === c && x.send({ type: "HOVER_COLUMN_REORDER", columnId: null });
    }
    async function ce(i, c) {
      if (!ue.value || ue.value === c) return;
      i.preventDefault();
      const d = ue.value;
      C(), await Y.reorderFolders(d, c);
    }
    function pe() {
      x.send({ type: "CLOSE_REPO_MENU" });
    }
    function re(i, c, d) {
      i.preventDefault(), i.stopPropagation();
      const w = 190, K = 270, Ie = Math.min(i.clientX, window.innerWidth - w - 10), xt = Math.min(i.clientY, window.innerHeight - K - 10);
      x.send({
        type: "OPEN_REPO_MENU",
        payload: {
          x: Ie,
          y: xt,
          repo: c,
          fromList: d,
          activeSubMenu: "folder",
          isFlyoutLeft: Ie > window.innerWidth - 380
        }
      });
    }
    async function Le() {
      const i = V.repo;
      pe(), i && await Z.moveRepoToList(i.full_name, Y.UNCAT);
    }
    async function we(i) {
      const c = V.repo;
      pe(), c && await Z.moveRepoToList(c.full_name, i);
    }
    async function $e() {
      const i = V.repo;
      if (pe(), !!i?.html_url)
        try {
          await navigator.clipboard.writeText(i.html_url);
        } catch {
        }
    }
    async function ke() {
      const i = V.repo;
      if (pe(), !!i?.full_name)
        try {
          await navigator.clipboard.writeText(`git clone https://github.com/${i.full_name}.git`);
        } catch {
        }
    }
    function Ze() {
      const i = V.repo;
      pe(), i && Dt.open({
        fullName: i.full_name,
        description: i.description || "",
        stars: i.stargazers_count,
        language: i.language || void 0,
        updated: i.updated_at
      });
    }
    function ze() {
      const i = V.repo;
      pe(), i?.html_url && Ht(i.html_url);
    }
    function qe(i) {
      const c = i.target;
      !c?.closest(".fo-cover-context-menu") && !c?.closest(".col-popover-menu") && !c?.closest(".gh-list-col-menu") && x.send({ type: "RESET_IDLE" });
    }
    function h(i) {
      if (i.key === "Escape") {
        if (y.value) {
          y.value = null;
          return;
        }
        x.send({ type: "RESET_IDLE" });
      }
    }
    function p(i) {
      const c = l.value;
      if (!c) return;
      const w = i.target?.closest(".column-cards-scroll");
      if (w && w.scrollHeight > w.clientHeight && !i.shiftKey && i.deltaX === 0) {
        const K = w.scrollTop === 0 && i.deltaY < 0, Ie = Math.ceil(w.scrollTop + w.clientHeight) >= w.scrollHeight && i.deltaY > 0;
        if (!K && !Ie)
          return;
      }
      Math.abs(i.deltaX) > Math.abs(i.deltaY) && i.deltaX !== 0 || i.deltaY !== 0 && (i.preventDefault(), c.scrollLeft += i.deltaY);
    }
    function f(i) {
      if (!X.value || !l.value) return;
      i.preventDefault();
      const c = i.deltaY !== 0 ? i.deltaY : i.deltaX;
      l.value.scrollLeft += c;
    }
    function M(i) {
      const c = l.value;
      if (!c) return;
      const d = c.getBoundingClientRect(), w = 100;
      if (i > d.right - w) {
        const K = Math.min(1, Math.max(0.1, (i - (d.right - w)) / w));
        P = Math.round(K * 20), O();
      } else if (i < d.left + w) {
        const K = Math.min(1, Math.max(0.1, (d.left + w - i) / w));
        P = -Math.round(K * 20), O();
      } else
        F();
    }
    function de(i) {
      M(i.clientX);
    }
    function Je(i, c, d) {
      x.send({ type: "START_DRAG_REPO", repo: c, fromList: d }), i.dataTransfer && (i.dataTransfer.effectAllowed = "move", i.dataTransfer.setData(St, c.full_name), i.dataTransfer.setData("text/plain", `${c.full_name}:${d || "uncategorized"}`)), window.addEventListener("wheel", f, { passive: !1 });
    }
    function ut() {
      x.send({ type: "END_DRAG_REPO" }), F(), window.removeEventListener("wheel", f);
    }
    function bt(i, c) {
      !u.active || !X.value && !Array.from(i.dataTransfer?.types || []).includes(St) || (i.preventDefault(), i.dataTransfer && (i.dataTransfer.dropEffect = "move"), x.send({ type: "HOVER_TARGET_COLUMN", columnId: c }));
    }
    function yt(i, c) {
      const d = i.currentTarget;
      d && i.relatedTarget instanceof Node && d.contains(i.relatedTarget) || ie.value === c && x.send({ type: "HOVER_TARGET_COLUMN", columnId: null });
    }
    async function _t(i, c) {
      i.preventDefault();
      const d = X.value?.full_name || Ut(i.dataTransfer);
      ut(), !(!u.active || !d) && await Z.moveRepoToList(d, c === "uncategorized" ? Y.UNCAT : c);
    }
    function ct(i) {
      it.open(i.full_name, void 0, i);
    }
    function Ht(i) {
      window.open(i, "_blank", "noopener,noreferrer");
    }
    function wt(i) {
      if (!i) return "";
      try {
        const c = new Date(i);
        return `${c.getFullYear()}-${String(c.getMonth() + 1).padStart(2, "0")}-${String(c.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return lt(() => {
      window.addEventListener("pointerdown", qe), window.addEventListener("keydown", h);
    }), rt(() => {
      _e(), x.send({ type: "RESET_IDLE" }), F(), window.removeEventListener("wheel", f), window.removeEventListener("pointerdown", qe), window.removeEventListener("keydown", h);
    }), (i, c) => (t(), s("div", Ro, [
      e("section", {
        class: W(["default-shelf-area", { "is-collapsed": g.value, "drop-active": ie.value === "uncategorized" }]),
        "data-gh-list-drop": n(Y).UNCAT,
        onDragover: c[6] || (c[6] = (d) => bt(d, "uncategorized")),
        onDragleave: c[7] || (c[7] = (d) => yt(d, "uncategorized")),
        onDrop: c[8] || (c[8] = (d) => _t(d, "uncategorized"))
      }, [
        e("header", Mo, [
          e("div", To, [
            c[26] || (c[26] = e("span", { class: "shelf-icon" }, "📁", -1)),
            c[27] || (c[27] = e("span", { class: "shelf-title" }, "未分类 Star 收藏", -1)),
            e("span", Lo, o(n(Z).filteredUncatRepos.length), 1),
            c[28] || (c[28] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消本地分组归属；单排 10 个一页）", -1))
          ]),
          e("div", Do, [
            n(Z).filteredUncatRepos.length > n(Ce).pageSize ? (t(), s("div", Ao, [
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: n(Z).uncatPage <= 1,
                title: "上一页",
                onClick: c[0] || (c[0] = //@ts-ignore
                (...d) => n(Z).prevUncatPage && n(Z).prevUncatPage(...d))
              }, "‹", 8, Ho),
              e("span", xo, o(n(Z).uncatPage) + " / " + o(n(Z).uncatTotalPages) + " 页", 1),
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: n(Z).uncatPage >= n(Z).uncatTotalPages,
                title: "下一页",
                onClick: c[1] || (c[1] = //@ts-ignore
                (...d) => n(Z).nextUncatPage && n(Z).nextUncatPage(...d))
              }, "›", 8, Eo)
            ])) : $("", !0),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              title: "刷新 Star 列表",
              disabled: m.value,
              "aria-busy": m.value,
              onClick: c[2] || (c[2] = (d) => n(Y).refreshRepositories())
            }, [
              e("span", {
                class: W({ spinning: m.value })
              }, "🔄", 2),
              e("span", null, o(m.value ? "读取中…" : "刷新"), 1)
            ], 8, Uo),
            n(Z).filteredUncatRepos.length ? (t(), s("button", {
              key: 1,
              type: "button",
              class: "shelf-toggle-btn",
              title: g.value ? "展开托盘" : "收起托盘",
              onClick: v
            }, o(g.value ? "展开 ▼" : "收起 ▲"), 9, Io)) : $("", !0)
          ])
        ]),
        b.value ? ge((t(), s("div", No, [
          (t(), s(B, null, J(6, (d) => e("div", {
            key: "skel-shelf-" + d,
            class: "repo gh-card shelf-card skel-card"
          }, [...c[29] || (c[29] = [
            e("div", { class: "skel-line skel-title" }, null, -1),
            e("div", { class: "skel-line skel-desc" }, null, -1),
            e("div", { class: "skel-line skel-meta" }, null, -1)
          ])])), 64))
        ], 512)), [
          [je, !g.value]
        ]) : n(Z).filteredUncatRepos.length ? ge((t(), s("div", {
          key: 1,
          ref_key: "shelfScrollRef",
          ref: r,
          class: "shelf-cards-scroll",
          onWheel: G
        }, [
          (t(!0), s(B, null, J(n(Z).pagedUncatRepos, (d) => (t(), s("article", {
            key: d.full_name,
            class: W(["repo gh-card shelf-card", { "card-dragging": X.value?.full_name === d.full_name }]),
            draggable: "true",
            onClick: (w) => ct(d),
            onDragstart: (w) => Je(w, d, null),
            onDragend: ut,
            onContextmenu: (w) => re(w, d, null)
          }, [
            e("button", {
              class: "fo-card-more",
              type: "button",
              "aria-label": "更多操作",
              title: "更多操作",
              onClick: te((w) => re(w, d, null), ["stop"])
            }, "⋮", 8, Oo),
            e("div", Fo, [
              e("img", {
                class: "gh-owner-avatar",
                src: d.owner?.avatar_url || "assets/github-star.svg",
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer",
                onError: c[3] || (c[3] = (w) => w.target.src = "assets/github-star.svg")
              }, null, 40, jo),
              e("a", {
                href: d.html_url,
                target: "_blank",
                rel: "noreferrer",
                class: "name",
                title: d.full_name,
                onClick: c[4] || (c[4] = te(() => {
                }, ["stop"]))
              }, [
                e("span", zo, o(d.owner?.login || d.full_name.split("/")[0]) + "/", 1),
                Q(o(d.name), 1)
              ], 8, Bo)
            ]),
            e("div", qo, [
              e("div", Wo, [
                c[30] || (c[30] = e("span", { class: "gh-badge-folder uncat" }, "＋ 未分类", -1)),
                d.topics && d.topics.length ? (t(), s(B, { key: 0 }, [
                  (t(!0), s(B, null, J(d.topics.slice(0, 2), (w) => (t(), s("span", {
                    key: w,
                    class: "gh-badge-topic-chip",
                    title: "Topic: " + w
                  }, " #" + o(w), 9, Vo))), 128)),
                  d.topics.length > 2 ? (t(), s("span", {
                    key: 0,
                    class: "gh-badge-topic-chip more",
                    title: d.topics.slice(2).map((w) => "#" + w).join(" ")
                  }, " +" + o(d.topics.length - 2), 9, Yo)) : $("", !0)
                ], 64)) : $("", !0)
              ]),
              e("p", {
                class: "desc",
                title: d.description || ""
              }, o(d.description || "暂无描述"), 9, Ko)
            ]),
            e("div", Qo, [
              e("span", Xo, "★ " + o(d.stargazers_count), 1),
              d.language ? (t(), s("span", Zo, o(d.language), 1)) : $("", !0),
              e("span", Jo, "更新 " + o(wt(d.updated_at)), 1)
            ])
          ], 42, Po))), 128)),
          n(Z).uncatPage < n(Z).uncatTotalPages ? (t(), s("div", {
            key: 0,
            class: "repo gh-card shelf-card shelf-next-card",
            title: "点击翻到下一页",
            onClick: c[5] || (c[5] = //@ts-ignore
            (...d) => n(Z).nextUncatPage && n(Z).nextUncatPage(...d))
          }, [
            e("div", en, [
              c[31] || (c[31] = e("span", { class: "shelf-next-icon" }, "➔", -1)),
              c[32] || (c[32] = e("span", { class: "shelf-next-title" }, "下一页", -1)),
              e("span", tn, o(n(Z).uncatPage + 1) + " / " + o(n(Z).uncatTotalPages) + " 页", 1)
            ])
          ])) : $("", !0)
        ], 544)), [
          [je, !g.value]
        ]) : g.value ? $("", !0) : (t(), s("p", sn, o(n(se).searchQuery ? "没有匹配的未分类仓库" : "暂无未分类 Star 仓库"), 1))
      ], 42, Go),
      y.value ? (t(), s("div", on, [
        e("button", {
          type: "button",
          class: "gh-drilldown-back-btn",
          title: "返回查看全部一级分组 (Esc)",
          onClick: c[9] || (c[9] = (d) => y.value = null)
        }, " ‹ 返回全部 "),
        c[33] || (c[33] = e("span", { class: "gh-drilldown-sep" }, "/", -1)),
        e("span", nn, "📁 " + o(y.value), 1),
        e("span", an, " (含 " + o(A.value) + " 个子分组) ", 1),
        e("button", {
          type: "button",
          class: "gh-drilldown-exit-btn",
          title: "退出下钻视图",
          onClick: c[10] || (c[10] = (d) => y.value = null)
        }, " ✕ ")
      ])) : $("", !0),
      e("div", {
        ref_key: "boardViewportRef",
        ref: l,
        class: "board-viewport",
        onWheel: p,
        onDragover: de
      }, [
        m.value && !z.value.length ? (t(), s("div", ln, [
          (t(), s(B, null, J(4, (d) => e("div", {
            key: "skel-col-" + d,
            class: "board-column skel-column"
          }, [
            c[35] || (c[35] = e("div", { class: "column-header" }, [
              e("div", {
                class: "skel-line",
                style: { width: "120px", height: "16px" }
              })
            ], -1)),
            e("div", rn, [
              (t(), s(B, null, J(3, (w) => e("div", {
                key: "skel-col-card-" + w,
                class: "repo gh-card skel-card"
              }, [...c[34] || (c[34] = [
                e("div", { class: "skel-line skel-title" }, null, -1),
                e("div", { class: "skel-line skel-desc" }, null, -1),
                e("div", { class: "skel-line skel-meta" }, null, -1)
              ])])), 64))
            ])
          ])), 64))
        ])) : (t(), s("div", un, [
          (t(!0), s(B, null, J(z.value, (d) => (t(), s("section", {
            key: d.id,
            class: W(["board-column list-column", {
              "drop-active": ie.value === d.name,
              "col-dragging": ue.value === d.id,
              "col-hover-target": ve.value === d.id
            }]),
            "data-gh-list-drop": d.name,
            onDragover: (w) => X.value ? bt(w, d.name) : a(w, d.id),
            onDragleave: (w) => X.value ? yt(w, d.name) : _(w, d.id),
            onDrop: (w) => X.value ? _t(w, d.name) : ce(w, d.id)
          }, [
            e("header", {
              class: "column-header",
              title: U(d.name) ? `📁 ${d.name}（包含 ${N(d.name).length} 个子分组，点击下钻进入）` : "拖动此列可调换位置；右侧更多可重命名、置顶或删除"
            }, [
              e("div", {
                class: W(["column-title-group", { "is-parent-folder": U(d.name) && !y.value }]),
                onClick: (w) => U(d.name) && !y.value && H(d.name)
              }, [
                c[36] || (c[36] = e("span", { class: "col-dot list-dot" }, null, -1)),
                e("h3", {
                  class: W(["column-title", { "title-clickable": U(d.name) && !y.value }]),
                  title: d.description || "本地分组: " + d.name
                }, " 📁 " + o(d.name), 11, hn),
                d.pinned ? (t(), s("span", gn, "📌")) : $("", !0),
                e("span", mn, o(n(Z).getReposForList(d.name).length), 1),
                U(d.name) && !y.value ? (t(), s("span", fn, o(N(d.name).length) + "个子分组 › ", 1)) : $("", !0)
              ], 10, pn),
              e("div", vn, [
                e("button", {
                  type: "button",
                  class: "col-more-btn col-drag-handle",
                  title: "按住拖动可调换分组位置；点击打开更多操作",
                  draggable: "true",
                  "aria-label": "分组操作与拖拽手柄",
                  onDragstart: (w) => Ae(w, d),
                  onDragend: C,
                  onClick: te((w) => ye(w, d), ["stop"])
                }, "⋮", 40, bn)
              ])
            ], 8, dn),
            e("div", yn, [
              (t(!0), s(B, null, J(n(Z).getReposForList(d.name), (w) => (t(), s("article", {
                key: w.full_name,
                class: W(["repo gh-card", { "card-dragging": X.value?.full_name === w.full_name }]),
                draggable: "true",
                onClick: (K) => ct(w),
                onDragstart: (K) => Je(K, w, d.name),
                onDragend: ut,
                onContextmenu: (K) => re(K, w, d.name)
              }, [
                e("button", {
                  class: "fo-card-more",
                  type: "button",
                  "aria-label": "更多操作",
                  title: "更多操作",
                  onClick: te((K) => re(K, w, d.name), ["stop"])
                }, "⋮", 8, wn),
                e("div", kn, [
                  e("img", {
                    class: "gh-owner-avatar",
                    src: w.owner?.avatar_url || "assets/github-star.svg",
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer",
                    onError: c[11] || (c[11] = (K) => K.target.src = "assets/github-star.svg")
                  }, null, 40, $n),
                  e("a", {
                    href: w.html_url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "name",
                    title: w.full_name,
                    onClick: c[12] || (c[12] = te(() => {
                    }, ["stop"]))
                  }, [
                    e("span", Sn, o(w.owner?.login || w.full_name.split("/")[0]) + "/", 1),
                    Q(o(w.name), 1)
                  ], 8, Cn)
                ]),
                e("div", Rn, [
                  e("div", Gn, [
                    e("span", {
                      class: "gh-badge-folder",
                      title: "属于列表: " + d.name
                    }, [
                      Q(" 📁 " + o(d.name) + " ", 1),
                      e("span", {
                        class: "btn-inline-remove",
                        title: "从该列表中移出",
                        role: "button",
                        tabindex: "0",
                        onClick: te((K) => n(Z).removeRepoFromList(w.full_name, d.name), ["stop"])
                      }, "×", 8, Tn)
                    ], 8, Mn),
                    w.topics && w.topics.length ? (t(), s(B, { key: 0 }, [
                      (t(!0), s(B, null, J(w.topics.slice(0, 2), (K) => (t(), s("span", {
                        key: K,
                        class: "gh-badge-topic-chip",
                        title: "Topic: " + K
                      }, " #" + o(K), 9, Ln))), 128)),
                      w.topics.length > 2 ? (t(), s("span", {
                        key: 0,
                        class: "gh-badge-topic-chip more",
                        title: w.topics.slice(2).map((K) => "#" + K).join(" ")
                      }, " +" + o(w.topics.length - 2), 9, Dn)) : $("", !0)
                    ], 64)) : $("", !0)
                  ]),
                  e("p", {
                    class: "desc",
                    title: w.description || ""
                  }, o(w.description || "暂无描述"), 9, An)
                ]),
                e("div", Hn, [
                  e("span", xn, "★ " + o(w.stargazers_count), 1),
                  w.language ? (t(), s("span", En, o(w.language), 1)) : $("", !0),
                  e("span", Un, "更新 " + o(wt(w.updated_at)), 1)
                ])
              ], 42, _n))), 128)),
              n(Z).getReposForList(d.name).length ? $("", !0) : (t(), s("div", In, [...c[37] || (c[37] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, cn))), 128)),
          e("section", Nn, [
            e("button", {
              type: "button",
              class: "btn-trigger-add-col",
              title: y.value ? `在「${y.value}」下新建子分组` : "新建本地分组",
              onClick: L
            }, [
              c[38] || (c[38] = e("span", { class: "plus-icon" }, "＋", -1)),
              e("span", null, o(y.value ? `新建 ${y.value} 子分组` : "新建本地分组"), 1)
            ], 8, Pn)
          ])
        ]))
      ], 544),
      (t(), be(mt, { to: "body" }, [
        V.visible && V.repo ? (t(), s("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ot({ left: `${V.x}px`, top: `${V.y}px` }),
          onClick: c[22] || (c[22] = te(() => {
          }, ["stop"])),
          onContextmenu: c[23] || (c[23] = te(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: W(["gh-menu-has-sub", { "is-active": oe.value === "folder" }]),
            onMouseenter: c[15] || (c[15] = (d) => oe.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: c[13] || (c[13] = te((d) => oe.value = oe.value === "folder" ? null : "folder", ["stop"]))
            }, [...c[39] || (c[39] = [
              e("span", null, "移动/加入本地分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: W(["gh-sub-flyout", { "flyout-left": le.value }]),
              onClick: c[14] || (c[14] = te(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: Le
              }, " 设为未分类 "),
              (t(!0), s(B, null, J(n(Z).lists, (d) => (t(), s("button", {
                key: d.id,
                class: W(["fo-cover-menu-item", { primary: n(nt)(V.repo.full_name).includes(d.name) }]),
                type: "button",
                onClick: (w) => we(d.name)
              }, o(n(nt)(V.repo.full_name).includes(d.name) ? "✓ " : "  ") + "📁 " + o(d.name), 11, On))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[16] || (c[16] = (d) => oe.value = null),
            onClick: c[17] || (c[17] = (d) => ct(V.repo))
          }, " 查看仓库详情 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[18] || (c[18] = (d) => oe.value = null),
            onClick: $e
          }, " 复制仓库链接 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[19] || (c[19] = (d) => oe.value = null),
            onClick: ke
          }, " 复制克隆命令 (git clone) ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[20] || (c[20] = (d) => oe.value = null),
            onClick: Ze
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[21] || (c[21] = (d) => oe.value = null),
            onClick: ze
          }, " 在 GitHub 打开 ", 32)
        ], 36)) : $("", !0),
        q.visible && q.list ? (t(), s("div", {
          key: 1,
          class: "fo-cover-context-menu gh-list-col-menu",
          style: ot({ left: `${q.x}px`, top: `${q.y}px` }),
          onClick: c[24] || (c[24] = te(() => {
          }, ["stop"])),
          onContextmenu: c[25] || (c[25] = te(() => {
          }, ["prevent"]))
        }, [
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: Te
          }, " ✏️ 重命名分组 "),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: Ge
          }, [
            e("span", null, o(q.list?.pinned ? "📍 取消置顶" : "📌 置顶此分组"), 1)
          ]),
          e("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onClick: De
          }, " 🗑️ 删除分组 ")
        ], 36)) : $("", !0)
      ]))
    ]));
  }
}), jn = /* @__PURE__ */ Re(Fn, [["__scopeId", "data-v-ae416c99"]]), Bn = { class: "star-wrap" }, zn = ["disabled", "title", "aria-label"], qn = {
  key: 0,
  class: "star-error",
  role: "status"
}, Wn = /* @__PURE__ */ Se({
  __name: "GitHubStarButton",
  props: {
    repo: {},
    alreadyStarred: { type: Boolean }
  },
  setup(k) {
    const u = k, l = R(!1), r = R(""), g = R(""), v = ae(() => !!(u.alreadyStarred || se.ownerKey && r.value === se.ownerKey || Y.token && se.repos.some((m) => m.full_name.toLowerCase() === u.repo.full_name.toLowerCase())));
    he(() => [se.ownerKey, u.repo.full_name], () => {
      r.value = "", g.value = "";
    });
    async function G() {
      if (l.value || v.value) return;
      if (!Y.token) {
        g.value = "请先在 GitHub 账号设置中配置 Token。";
        return;
      }
      const m = se.ownerKey;
      if (!m) {
        g.value = "GitHub 账号正在加载，请稍后再试。";
        return;
      }
      l.value = !0, g.value = "";
      try {
        const b = await Y.starRepository(u.repo, !0);
        if (m !== se.ownerKey) return;
        b ? r.value = m : g.value = at.actionText || "Star 未完成，请稍后重试。";
      } catch {
        m === se.ownerKey && (g.value = "Star 结果未确认，请先刷新核对，勿重复提交。");
      } finally {
        l.value = !1;
      }
    }
    return (m, b) => (t(), s("span", Bn, [
      e("button", {
        type: "button",
        class: W(["star-action", { starred: v.value }]),
        disabled: l.value || v.value,
        title: v.value ? "已 Star" : "点击 Star，未点击时状态可能尚未核对",
        "aria-label": v.value ? "已 Star" : `Star ${k.repo.full_name}`,
        onClick: te(G, ["stop"])
      }, o(l.value ? "…" : v.value ? "★" : "☆"), 11, zn),
      g.value ? (t(), s("span", qn, o(g.value), 1)) : $("", !0)
    ]));
  }
}), At = /* @__PURE__ */ Re(Wn, [["__scopeId", "data-v-e3dd27c5"]]), Vn = { class: "gh-global-header" }, Yn = {
  key: 1,
  class: "gh-global-message",
  role: "status"
}, Kn = {
  key: 2,
  class: "gh-global-message",
  role: "alert"
}, Qn = { class: "gh-global-summary" }, Xn = { key: 0 }, Zn = {
  key: 0,
  class: "gh-global-message"
}, Jn = {
  key: 1,
  class: "gh-global-grid"
}, ea = { class: "gh-global-card-head" }, ta = ["onClick"], sa = { class: "gh-global-meta" }, oa = { key: 0 }, na = {
  key: 2,
  class: "gh-global-pager"
}, aa = ["disabled"], la = ["disabled"], pt = 20, ra = /* @__PURE__ */ Se({
  __name: "GitHubGlobalSearch",
  props: {
    query: {},
    requestId: {},
    rule: {},
    embedded: { type: Boolean }
  },
  emits: ["back"],
  setup(k, { emit: u }) {
    const l = k, r = u, g = R(l.query), v = R(""), G = R(1), m = R(0), b = R(!1), y = R([]), D = R(!1), S = R("");
    let N;
    function U(z) {
      if (l.rule === "exact") return `"${z.replace(/"/g, "")}" in:name,description`;
      if (l.rule === "topic") return `topic:${z.replace(/\s+/g, "-")}`;
      if (l.rule === "smart") {
        const L = Pt[z.toLowerCase()] || [];
        if (L.length) return `${z} ${L.slice(0, 3).join(" OR ")}`;
      }
      return z;
    }
    async function A(z, L = 1) {
      const x = z.trim();
      if (!x) return;
      N?.abort();
      const X = new AbortController();
      N = X, g.value = x, v.value = x, G.value = L, y.value = [], m.value = 0, b.value = !1, S.value = "", D.value = !0;
      try {
        const ee = await It(X.signal), ie = new URLSearchParams({ q: U(x), sort: "stars", order: "desc", per_page: String(pt), page: String(L) }), { data: ne } = await st(`/search/repositories?${ie}`, { headers: ee, signal: X.signal, maxBytes: 2 * 1024 * 1024 });
        if (N !== X || X.signal.aborted) return;
        if (!Array.isArray(ne?.items)) throw new Error("GitHub 搜索响应格式异常");
        y.value = ne.items.filter((P) => typeof P?.full_name == "string" && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(P.full_name)), m.value = typeof ne.total_count == "number" ? Math.max(0, ne.total_count) : 0, b.value = ne.incomplete_results === !0;
      } catch (ee) {
        if (N !== X || X.signal.aborted) return;
        S.value = ee instanceof Nt || ee instanceof Error ? ee.message : "请稍后重试";
      } finally {
        N === X && (D.value = !1);
      }
    }
    function H(z) {
      it.open(z.full_name, void 0, z);
    }
    return he(() => l.requestId, () => {
      A(l.query);
    }, { immediate: !0 }), ft(() => {
      N?.abort();
    }), (z, L) => (t(), s("div", {
      class: W(["gh-global-search", { "is-embedded": k.embedded }])
    }, [
      e("header", Vn, [
        L[6] || (L[6] = e("div", null, [
          e("h3", null, "GitHub 仓库搜索"),
          e("p", null, "在插件内查看公开仓库和 README")
        ], -1)),
        e("button", {
          type: "button",
          class: "gh-global-back",
          onClick: L[0] || (L[0] = (x) => r("back"))
        }, o(k.embedded ? "返回首页" : "返回收藏"), 1)
      ]),
      k.embedded ? $("", !0) : (t(), s("form", {
        key: 0,
        class: "gh-global-form",
        role: "search",
        onSubmit: L[2] || (L[2] = te((x) => A(g.value), ["prevent"]))
      }, [
        ge(e("input", {
          "onUpdate:modelValue": L[1] || (L[1] = (x) => g.value = x),
          type: "search",
          placeholder: "搜索 GitHub 仓库…",
          "aria-label": "搜索 GitHub 仓库"
        }, null, 512), [
          [Me, g.value]
        ]),
        L[7] || (L[7] = e("button", { type: "submit" }, "搜索", -1))
      ], 32)),
      D.value ? (t(), s("p", Yn, "正在搜索 GitHub 仓库…")) : S.value ? (t(), s("div", Kn, [
        e("p", null, "搜索失败：" + o(S.value), 1),
        e("button", {
          type: "button",
          class: "gh-global-back",
          onClick: L[3] || (L[3] = (x) => A(v.value, G.value))
        }, "重试")
      ])) : (t(), s(B, { key: 3 }, [
        e("p", Qn, [
          Q("“" + o(v.value) + "” · " + o(m.value.toLocaleString()) + " 个结果", 1),
          b.value ? (t(), s("span", Xn, " · GitHub 标记为不完整结果")) : $("", !0)
        ]),
        y.value.length ? (t(), s("div", Jn, [
          (t(!0), s(B, null, J(y.value, (x) => (t(), s("article", {
            key: x.full_name,
            class: "gh-global-card"
          }, [
            e("div", ea, [
              e("button", {
                type: "button",
                class: "gh-global-repo",
                onClick: (X) => H(x)
              }, o(x.full_name), 9, ta),
              He(At, { repo: x }, null, 8, ["repo"])
            ]),
            e("p", null, o(x.description || "暂无描述"), 1),
            e("div", sa, [
              x.language ? (t(), s("span", oa, o(x.language), 1)) : $("", !0),
              e("span", null, "★ " + o((x.stargazers_count || 0).toLocaleString()), 1),
              e("span", null, "⑂ " + o((x.forks_count || 0).toLocaleString()), 1)
            ])
          ]))), 128))
        ])) : (t(), s("p", Zn, "没有找到仓库，换个关键词试试。")),
        G.value > 1 || G.value * pt < Math.min(m.value, 1e3) ? (t(), s("div", na, [
          e("button", {
            type: "button",
            disabled: G.value <= 1,
            onClick: L[4] || (L[4] = (x) => A(v.value, G.value - 1))
          }, "‹ 上一页", 8, aa),
          e("span", null, "第 " + o(G.value) + " 页", 1),
          e("button", {
            type: "button",
            disabled: G.value * pt >= Math.min(m.value, 1e3),
            onClick: L[5] || (L[5] = (x) => A(v.value, G.value + 1))
          }, "下一页 ›", 8, la)
        ])) : $("", !0)
      ], 64))
    ], 2));
  }
}), Mt = /* @__PURE__ */ Re(ra, [["__scopeId", "data-v-26667dd5"]]), ia = { class: "local-search" }, ua = {
  key: 0,
  class: "notice"
}, ca = {
  key: 1,
  class: "summary"
}, da = {
  key: 2,
  class: "notice"
}, pa = {
  key: 3,
  class: "grid"
}, ha = { class: "repo-head" }, ga = ["onClick"], ma = { class: "meta" }, fa = { key: 0 }, va = {
  key: 4,
  class: "pager"
}, ba = ["disabled"], ya = ["disabled"], _a = /* @__PURE__ */ Se({
  __name: "GitHubLocalSearch",
  emits: ["back"],
  setup(k, { emit: u }) {
    const l = u, r = R(1), g = ae(() => (se.repos, se.repoListNames, se.searchQuery, se.activeSection, se.loading, Y.getDashboardSearchResults())), v = ae(() => g.value.slice((r.value - 1) * 20, r.value * 20)), G = ae(() => Math.max(1, Math.ceil(g.value.length / 20)));
    return he(() => se.searchQuery, () => {
      r.value = 1;
    }), he(G, (m) => {
      r.value > m && (r.value = m);
    }), (m, b) => (t(), s("div", ia, [
      e("header", null, [
        e("div", null, [
          b[3] || (b[3] = e("h3", null, "当前分类搜索", -1)),
          e("p", null, o(n(Y).active) + " · “" + o(n(se).searchQuery) + "”", 1)
        ]),
        e("button", {
          type: "button",
          onClick: b[0] || (b[0] = (y) => l("back"))
        }, "返回首页")
      ]),
      n(at).accountConfigured === !1 ? (t(), s("p", ua, "请先在账号设置中配置 GitHub 用户名，然后搜索已加载的 Star 仓库。")) : (t(), s("p", ca, o(n(se).loading ? "正在读取 Star 仓库，结果可能尚未完整 · " : "") + o(g.value.length) + " 个结果", 1)),
      !g.value.length && n(at).accountConfigured !== !1 ? (t(), s("p", da, o(n(se).loading ? "正在读取仓库…" : "当前分类没有匹配的仓库。"), 1)) : $("", !0),
      v.value.length ? (t(), s("div", pa, [
        (t(!0), s(B, null, J(v.value, (y) => (t(), s("article", {
          key: y.full_name,
          class: "repo-card"
        }, [
          e("div", ha, [
            e("button", {
              type: "button",
              class: "repo-name",
              onClick: (D) => n(it).open(y.full_name, void 0, y)
            }, o(y.full_name), 9, ga),
            He(At, {
              repo: y,
              "already-starred": ""
            }, null, 8, ["repo"])
          ]),
          e("p", null, o(y.description || "暂无描述"), 1),
          e("div", ma, [
            y.language ? (t(), s("span", fa, o(y.language), 1)) : $("", !0),
            e("span", null, "★ " + o((y.stargazers_count || 0).toLocaleString()), 1),
            e("span", null, "⑂ " + o((y.forks_count || 0).toLocaleString()), 1)
          ])
        ]))), 128))
      ])) : $("", !0),
      G.value > 1 ? (t(), s("div", va, [
        e("button", {
          type: "button",
          disabled: r.value <= 1,
          onClick: b[1] || (b[1] = (y) => r.value--)
        }, "‹ 上一页", 8, ba),
        e("span", null, o(r.value) + " / " + o(G.value), 1),
        e("button", {
          type: "button",
          disabled: r.value >= G.value,
          onClick: b[2] || (b[2] = (y) => r.value++)
        }, "下一页 ›", 8, ya)
      ])) : $("", !0)
    ]));
  }
}), wa = /* @__PURE__ */ Re(_a, [["__scopeId", "data-v-26ec6440"]]), ka = { class: "gh-dashboard" }, $a = { class: "dashboard-layout" }, Ca = { class: "dashboard-main" }, Sa = { class: "dashboard-search" }, Ra = { key: 0 }, Ga = { class: "dashboard-home-content" }, Ma = { class: "dashboard-heading" }, Ta = { class: "dashboard-composer" }, La = { class: "composer-bottom" }, Da = { class: "composer-left" }, Aa = { class: "repo-picker-anchor" }, Ha = ["aria-expanded"], xa = {
  key: 0,
  class: "repo-picker"
}, Ea = { class: "repo-picker-head" }, Ua = ["disabled"], Ia = {
  key: 0,
  class: "repo-picker-hint"
}, Na = {
  key: 1,
  class: "repo-picker-hint",
  role: "alert"
}, Pa = {
  key: 2,
  class: "repo-picker-hint"
}, Oa = { class: "repo-picker-list" }, Fa = ["onClick"], ja = {
  key: 0,
  class: "repo-picker-hint"
}, Ba = ["disabled"], za = { class: "dashboard-section" }, qa = { class: "dashboard-list" }, Wa = {
  key: 0,
  class: "empty"
}, Va = {
  key: 1,
  class: "empty"
}, Ya = ["onClick"], Ka = { class: "row-copy" }, Qa = {
  key: 2,
  class: "inline-error"
}, Xa = { class: "dashboard-section" }, Za = { class: "section-heading" }, Ja = ["href"], el = { class: "dashboard-list" }, tl = {
  key: 0,
  class: "empty"
}, sl = {
  key: 1,
  class: "empty"
}, ol = {
  key: 2,
  class: "inline-error"
}, nl = {
  key: 3,
  class: "empty"
}, al = ["href"], ll = { class: "row-copy" }, rl = { class: "row-meta" }, il = { class: "dashboard-side" }, ul = { class: "side-card" }, cl = { class: "side-heading" }, dl = {
  key: 0,
  class: "side-empty"
}, pl = {
  key: 1,
  class: "side-empty"
}, hl = {
  key: 2,
  class: "inline-error"
}, gl = {
  key: 3,
  class: "side-empty"
}, ml = ["onClick"], fl = { class: "side-card quick-card" }, vl = /* @__PURE__ */ Se({
  __name: "GitHubDashboard",
  props: {
    active: { type: Boolean },
    accountRevision: {},
    showResults: { type: Boolean }
  },
  emits: ["channel", "settings", "notifications"],
  setup(k, { emit: u }) {
    const l = k, r = u, g = R(""), v = R(""), G = R(!1), m = R(!1), b = R(""), y = R(""), D = R([]), S = R(null), N = R(""), U = ae(() => {
      const C = N.value.trim().toLowerCase();
      return C ? D.value.filter((a) => a.fullName.toLowerCase().includes(C)) : D.value;
    });
    let A;
    async function H() {
      A?.abort();
      const C = new AbortController();
      A = C, m.value = !0, b.value = "", y.value = "";
      try {
        const a = await Wt(C.signal);
        if (A !== C || C.signal.aborted) return;
        D.value = a.repos, y.value = a.warning;
      } catch (a) {
        A === C && !C.signal.aborted && (b.value = a instanceof Error ? a.message : "仓库读取失败。");
      } finally {
        A === C && (m.value = !1);
      }
    }
    function z() {
      G.value = !G.value, G.value && !D.value.length && !m.value && H();
    }
    function L(C) {
      S.value = C, G.value = !1, N.value = "";
    }
    he(() => l.accountRevision, () => {
      A?.abort(), A = void 0, D.value = [], S.value = null, m.value = !1, G.value = !1;
    });
    const x = R([]), X = R([]), ee = R([]), ie = R(!1), ne = R(!1), P = R(""), O = R(""), F = R(""), q = R("");
    let V, oe = 0;
    const le = ae(() => {
      const C = (/* @__PURE__ */ new Date()).getHours();
      return C < 6 ? "夜深了" : C < 11 ? "早上好" : C < 14 ? "中午好" : C < 18 ? "下午好" : "晚上好";
    });
    function ue(C) {
      if (!C) return "";
      const a = new Date(C).getTime();
      if (!Number.isFinite(a)) return "";
      const _ = Math.max(0, Math.floor((Date.now() - a) / 6e4));
      return _ < 60 ? _ < 1 ? "刚刚" : `${_} 分钟前` : _ < 1440 ? `${Math.floor(_ / 60)} 小时前` : _ < 43200 ? `${Math.floor(_ / 1440)} 天前` : new Date(a).toLocaleDateString();
    }
    const ve = (C) => C instanceof Error ? C.message : "读取失败，请稍后重试。";
    function _e(C) {
      return typeof C?.full_name == "string" && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(C.full_name);
    }
    function me(C) {
      try {
        const a = new URL(String(C));
        return a.protocol === "https:" && a.hostname === "github.com" && /^\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/pull\/\d+\/?$/.test(a.pathname) ? a.href : "";
      } catch {
        return "";
      }
    }
    async function ye() {
      V?.abort();
      const C = new AbortController();
      V = C;
      const a = ++oe, _ = () => l.active && a === oe && !C.signal.aborted;
      g.value = "", x.value = [], X.value = [], ee.value = [], P.value = "", O.value = "", F.value = "", q.value = "", ie.value = !0, ne.value = !0, (async () => {
        try {
          const ce = await Vt();
          if (!_()) return;
          const pe = ce.map((re) => ({
            kind: "deepseek",
            id: re.id,
            title: re.title || "未命名对话",
            updated: Number(re.updatedAt) || 0,
            model: re.model
          }));
          ee.value = pe.sort((re, Le) => Le.updated - re.updated).slice(0, 4);
        } catch {
          _() && (q.value = "DeepSeek 本机会话读取失败");
        } finally {
          _() && (ne.value = !1);
        }
      })();
      try {
        const ce = await vt();
        if (!_()) return;
        const pe = Be(ce.ghToken);
        let re = ce.ghUser.trim();
        if (!re && ce.ghToken) {
          const ke = await st("/user", { headers: pe, signal: C.signal, maxBytes: 131072 });
          re = typeof ke.data?.login == "string" ? ke.data.login : "";
        }
        if (!_()) return;
        if (!re) {
          P.value = "配置 GitHub 用户名后即可查看仓库和 Pull Request。";
          return;
        }
        if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(re)) throw new Error("GitHub 用户名格式无效，请检查设置。");
        g.value = re;
        const Le = new URLSearchParams({ q: `is:pr is:open author:${re}`, sort: "updated", order: "desc", per_page: "5" }), [we, $e] = await Promise.allSettled([
          st(`/users/${encodeURIComponent(re)}/repos?type=owner&sort=updated&per_page=6`, { headers: pe, signal: C.signal, maxBytes: 1024 * 1024 }),
          st(`/search/issues?${Le}`, { headers: pe, signal: C.signal, maxBytes: 1024 * 1024 })
        ]);
        if (!_()) return;
        we.status === "fulfilled" && Array.isArray(we.value.data) ? x.value = we.value.data.filter(_e).slice(0, 6) : O.value = we.status === "rejected" ? ve(we.reason) : "仓库响应格式异常。", $e.status === "fulfilled" && Array.isArray($e.value.data?.items) ? X.value = $e.value.data.items.filter((ke) => ke && typeof ke.title == "string" && me(ke.html_url)).slice(0, 5) : F.value = $e.status === "rejected" ? ve($e.reason) : "Pull Request 响应格式异常。";
      } catch (ce) {
        _() && (P.value = ve(ce));
      } finally {
        _() && (ie.value = !1);
      }
    }
    he(() => [l.active, l.accountRevision], ([C]) => {
      C ? ye() : (++oe, V?.abort());
    }, { immediate: !0 }), ft(() => {
      ++oe, V?.abort(), A?.abort();
    });
    function Te() {
      if (!v.value.trim()) return;
      const C = S.value, a = C ? { kind: "github", id: C.fullName, title: C.fullName, url: `https://github.com/${C.fullName}`, description: C.description, language: C.language, visibility: C.isPrivate ? "private" : "public" } : void 0;
      Yt(v.value.trim(), a), dt("multica");
    }
    function Ge(C) {
      Kt("deepseek", C.id), dt("multica");
    }
    function De() {
      dt("multica");
    }
    function Ae(C) {
      const a = me(C.html_url);
      return a ? new URL(a).pathname.split("/").slice(1, 3).join("/") : "";
    }
    return (C, a) => (t(), s("div", ka, [
      e("div", $a, [
        e("main", Ca, [
          e("div", Sa, [
            kt(C.$slots, "search", {}, void 0, !0)
          ]),
          k.showResults ? (t(), s("div", Ra, [
            kt(C.$slots, "results", {}, void 0, !0)
          ])) : $("", !0),
          ge(e("div", Ga, [
            e("div", Ma, [
              e("div", null, [
                a[9] || (a[9] = e("span", { class: "eyebrow" }, "GITHUB WORKSPACE", -1)),
                e("h2", null, [
                  Q(o(le.value), 1),
                  g.value ? (t(), s(B, { key: 0 }, [
                    Q("，" + o(g.value), 1)
                  ], 64)) : $("", !0),
                  a[8] || (a[8] = Q("。", -1))
                ])
              ]),
              e("button", {
                type: "button",
                class: "subtle-button",
                onClick: ye
              }, "↻ 刷新")
            ]),
            e("div", Ta, [
              ge(e("textarea", {
                "onUpdate:modelValue": a[0] || (a[0] = (_) => v.value = _),
                placeholder: "有什么想法？在 AI 工作区继续探索…",
                "aria-label": "发送到 AI 工作区的草稿",
                maxlength: "100000"
              }, null, 512), [
                [Me, v.value]
              ]),
              e("div", La, [
                e("div", Da, [
                  e("div", Aa, [
                    e("button", {
                      type: "button",
                      class: "repo-picker-toggle",
                      "aria-expanded": G.value,
                      onClick: z
                    }, "⌘ " + o(S.value ? S.value.fullName : "选择仓库") + " ▾", 9, Ha),
                    G.value ? (t(), s("div", xa, [
                      e("div", Ea, [
                        a[10] || (a[10] = e("strong", null, "选择我的仓库", -1)),
                        e("button", {
                          type: "button",
                          title: "刷新仓库",
                          disabled: m.value,
                          onClick: H
                        }, "↻", 8, Ua)
                      ]),
                      ge(e("input", {
                        "onUpdate:modelValue": a[1] || (a[1] = (_) => N.value = _),
                        placeholder: "搜索仓库名称…",
                        "aria-label": "搜索我的仓库"
                      }, null, 512), [
                        [Me, N.value]
                      ]),
                      m.value ? (t(), s("p", Ia, "正在读取仓库…")) : b.value ? (t(), s("p", Na, [
                        Q(o(b.value) + " ", 1),
                        e("button", {
                          type: "button",
                          onClick: H
                        }, "重试")
                      ])) : $("", !0),
                      y.value ? (t(), s("p", Pa, o(y.value), 1)) : $("", !0),
                      e("div", Oa, [
                        (t(!0), s(B, null, J(U.value, (_) => (t(), s("button", {
                          key: _.fullName,
                          type: "button",
                          onClick: (ce) => L(_)
                        }, [
                          e("span", null, o(_.fullName), 1),
                          e("small", null, o(_.isPrivate ? "私有" : "公开"), 1)
                        ], 8, Fa))), 128)),
                        !m.value && !b.value && !U.value.length ? (t(), s("p", ja, "没有找到仓库。")) : $("", !0)
                      ]),
                      S.value ? (t(), s("button", {
                        key: 3,
                        type: "button",
                        class: "repo-picker-clear",
                        onClick: a[2] || (a[2] = (_) => {
                          S.value = null, G.value = !1;
                        })
                      }, "不选择仓库")) : $("", !0),
                      a[11] || (a[11] = e("p", { class: "repo-picker-hint" }, "仅附带仓库链接与简介；发送时会共享所选信息，README 需手动读取。", -1))
                    ])) : $("", !0)
                  ]),
                  a[12] || (a[12] = e("span", null, [
                    Q("✳  AI 工作区 "),
                    e("small", null, "· 不会自动发送")
                  ], -1))
                ]),
                e("button", {
                  type: "button",
                  disabled: !v.value.trim(),
                  onClick: Te
                }, [...a[13] || (a[13] = [
                  Q("继续到 AI 工作区 ", -1),
                  e("span", null, "↗", -1)
                ])], 8, Ba)
              ])
            ]),
            e("section", za, [
              e("div", { class: "section-heading" }, [
                a[15] || (a[15] = e("div", null, [
                  e("h3", null, "最近会话"),
                  e("small", null, "DeepSeek 本机记录")
                ], -1)),
                e("button", {
                  type: "button",
                  onClick: De
                }, [...a[14] || (a[14] = [
                  Q("查看全部 ", -1),
                  e("span", null, "→", -1)
                ])])
              ]),
              e("div", qa, [
                ne.value ? (t(), s("p", Wa, "正在读取会话…")) : ee.value.length ? $("", !0) : (t(), s("p", Va, "暂无可显示的会话，打开 AI 工作区开始对话。")),
                (t(!0), s(B, null, J(ee.value, (_) => (t(), s("button", {
                  key: `${_.kind}:${_.id}`,
                  type: "button",
                  class: "list-row",
                  onClick: (ce) => Ge(_)
                }, [
                  a[16] || (a[16] = e("span", { class: "status-dot" }, null, -1)),
                  e("span", Ka, [
                    e("strong", null, o(_.title), 1),
                    e("small", null, [
                      Q("DeepSeek · " + o(_.model), 1),
                      _.updated ? (t(), s(B, { key: 0 }, [
                        Q(" · " + o(ue(_.updated)), 1)
                      ], 64)) : $("", !0)
                    ])
                  ]),
                  a[17] || (a[17] = e("span", { class: "row-arrow" }, "↗", -1))
                ], 8, Ya))), 128)),
                q.value ? (t(), s("p", Qa, o(q.value), 1)) : $("", !0)
              ])
            ]),
            e("section", Xa, [
              e("div", Za, [
                a[18] || (a[18] = e("div", null, [
                  e("h3", null, "Pull requests"),
                  e("small", null, "由你创建、尚未关闭")
                ], -1)),
                g.value ? (t(), s("a", {
                  key: 0,
                  href: `https://github.com/pulls?q=${encodeURIComponent(`is:pr is:open author:${g.value}`)}`,
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, "查看全部 ↗", 8, Ja)) : $("", !0)
              ]),
              e("div", el, [
                ie.value ? (t(), s("p", tl, "正在读取 Pull Request…")) : P.value ? (t(), s("p", sl, o(P.value), 1)) : F.value ? (t(), s("p", ol, o(F.value), 1)) : X.value.length ? $("", !0) : (t(), s("p", nl, "没有找到未关闭的 Pull Request。")),
                (t(!0), s(B, null, J(X.value, (_) => (t(), s("a", {
                  key: _.html_url,
                  class: "list-row",
                  href: me(_.html_url),
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, [
                  a[19] || (a[19] = e("span", { class: "pull-icon" }, "⑂", -1)),
                  e("span", ll, [
                    e("strong", null, o(_.title), 1),
                    e("small", null, [
                      Q(o(Ae(_)) + " #" + o(_.number), 1),
                      _.updated_at ? (t(), s(B, { key: 0 }, [
                        Q(" · 更新于 " + o(ue(_.updated_at)), 1)
                      ], 64)) : $("", !0)
                    ])
                  ]),
                  e("span", rl, o(_.comments || 0) + " 条评论 ↗", 1)
                ], 8, al))), 128))
              ])
            ])
          ], 512), [
            [je, !k.showResults]
          ])
        ]),
        e("aside", il, [
          e("section", ul, [
            e("div", cl, [
              a[20] || (a[20] = e("div", null, [
                e("h3", null, "最近更新的仓库"),
                e("small", null, "GitHub 公开仓库")
              ], -1)),
              e("button", {
                type: "button",
                onClick: a[3] || (a[3] = (_) => r("channel", "repos"))
              }, "全部 →")
            ]),
            ie.value ? (t(), s("p", dl, "正在读取仓库…")) : P.value ? (t(), s("p", pl, o(P.value), 1)) : O.value ? (t(), s("p", hl, o(O.value), 1)) : x.value.length ? $("", !0) : (t(), s("p", gl, "暂无公开仓库。")),
            (t(!0), s(B, null, J(x.value, (_) => (t(), s("button", {
              key: _.full_name,
              type: "button",
              class: "repo-row",
              onClick: (ce) => n(it).open(_.full_name, void 0, _)
            }, [
              a[21] || (a[21] = e("span", { class: "repo-mark" }, "▣", -1)),
              e("span", null, [
                e("strong", null, o(_.full_name), 1),
                e("small", null, [
                  Q(o(_.language || "仓库"), 1),
                  _.updated_at ? (t(), s(B, { key: 0 }, [
                    Q(" · " + o(ue(_.updated_at)), 1)
                  ], 64)) : $("", !0)
                ])
              ])
            ], 8, ml))), 128))
          ]),
          e("section", fl, [
            a[26] || (a[26] = e("div", { class: "side-heading" }, [
              e("div", null, [
                e("h3", null, "快捷入口"),
                e("small", null, "你的 GitHub 工作台")
              ])
            ], -1)),
            e("button", {
              type: "button",
              onClick: a[4] || (a[4] = (_) => r("channel", "stars"))
            }, [...a[22] || (a[22] = [
              e("span", null, "⭐  Star 收藏", -1),
              e("span", null, "→", -1)
            ])]),
            e("button", {
              type: "button",
              onClick: a[5] || (a[5] = (_) => r("channel", "trending"))
            }, [...a[23] || (a[23] = [
              e("span", null, "◈  开源发现", -1),
              e("span", null, "→", -1)
            ])]),
            e("button", {
              type: "button",
              onClick: a[6] || (a[6] = (_) => r("notifications"))
            }, [...a[24] || (a[24] = [
              e("span", null, "♧  GitHub 通知", -1),
              e("span", null, "→", -1)
            ])]),
            e("button", {
              type: "button",
              onClick: a[7] || (a[7] = (_) => r("settings", _.currentTarget))
            }, [...a[25] || (a[25] = [
              e("span", null, "⚙  账号设置", -1),
              e("span", null, "→", -1)
            ])])
          ])
        ])
      ])
    ]));
  }
}), bl = /* @__PURE__ */ Re(vl, [["__scopeId", "data-v-7bb89870"]]);
function yl(k) {
  const u = k.subject?.url, l = k.repository?.html_url || "https://github.com";
  if (!u) return l;
  const r = k.subject?.type;
  return r === "Issue" ? u.replace("https://api.github.com/repos/", "https://github.com/") : r === "PullRequest" ? u.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : r === "Release" ? u.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : u.replace("https://api.github.com/repos/", "https://github.com/");
}
function _l(k) {
  try {
    const u = Date.now() - new Date(k).getTime();
    if (u < 6e4) return "刚刚";
    const l = Math.floor(u / 6e4);
    if (l < 60) return `${l} 分钟前`;
    const r = Math.floor(l / 60);
    if (r < 24) return `${r} 小时前`;
    const g = Math.floor(r / 24);
    return g < 30 ? `${g} 天前` : k.slice(5, 10);
  } catch {
    return "";
  }
}
const j = Ue({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), xe = {
  open() {
    j.isOpen = !0, (!j.items.length || Date.now() - j.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    j.isOpen = !1;
  },
  toggle() {
    j.isOpen ? this.close() : this.open();
  },
  setTab(k) {
    j.activeKind = k;
  },
  async refresh() {
    const k = Y.token?.trim();
    if (!k) {
      j.items = [], j.unreadCount = 0, j.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    j.loading = !0, j.error = "";
    try {
      const u = {
        ...Be(k),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, l = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: u
      });
      if (!l.ok)
        throw l.status === 401 ? new Error("GitHub Token 无效或已过期") : l.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${l.status})`);
      const r = await l.json();
      if (!Array.isArray(r))
        throw new Error("GitHub 返回数据异常");
      const g = r.map((v) => ({
        id: String(v.id),
        unread: !!v.unread,
        reason: String(v.reason || ""),
        updatedAt: v.updated_at,
        formattedTime: _l(v.updated_at),
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
        htmlUrl: yl(v)
      }));
      j.items = g, j.unreadCount = g.filter((v) => v.unread).length, j.lastFetchedAt = Date.now();
    } catch (u) {
      console.warn("[GitHubNotifications] 读取失败:", u), j.error = u?.message || "网络请求异常";
    } finally {
      j.loading = !1;
    }
  },
  openTarget(k) {
    typeof window < "u" && window.open(k.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, T = Ue({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function Qe(k) {
  try {
    const u = Date.now() - new Date(k).getTime(), l = Math.floor(u / 6e4);
    if (l < 1) return "刚刚";
    if (l < 60) return `${l}分钟前`;
    const r = Math.floor(l / 60);
    if (r < 24) return `${r}小时前`;
    const g = Math.floor(r / 24);
    if (g < 30) return `${g}天前`;
    const v = new Date(k);
    return `${v.getFullYear()}/${v.getMonth() + 1}/${v.getDate()}`;
  } catch {
    return "";
  }
}
function Xe(k) {
  switch (k) {
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
function wl(k) {
  return k ? {
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
  }[k] || (k.startsWith(":") && k.endsWith(":") ? k.slice(1, -1) : k) : "";
}
function ht(k) {
  if (!Array.isArray(k)) return [];
  const u = {
    THUMBS_UP: "👍",
    THUMBS_DOWN: "👎",
    LAUGH: "😄",
    HOORAY: "🎉",
    CONFUSED: "😕",
    HEART: "❤️",
    ROCKET: "🚀",
    EYES: "👀"
  };
  return k.map((l) => ({
    emoji: u[l.content] || l.content,
    count: l.reactors?.totalCount || l.users?.totalCount || 0
  })).filter((l) => l.count > 0);
}
function Tt(k) {
  if (!k || typeof k != "object") return [];
  const u = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, l = [];
  for (const [r, g] of Object.entries(u)) {
    const v = Number(k[r] || 0);
    v > 0 && l.push({ emoji: g, count: v });
  }
  return l;
}
async function Lt(k, u) {
  if (!k) return "";
  try {
    const l = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...Be(u),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: k, mode: "gfm" })
    });
    if (l.ok)
      return await l.text();
  } catch {
  }
  return Ee.renderMarkdown(k);
}
async function kl(k, u, l, r) {
  const g = `
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
        ...Be(r),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: g,
        variables: { owner: k, name: u, num: l }
      })
    });
    if (!v.ok) return null;
    const m = (await v.json())?.data?.repository?.discussion;
    if (!m) return null;
    let b = 0;
    const y = (m.comments?.nodes || []).map((N) => {
      const U = N.replies?.nodes || [];
      b += U.length;
      const A = U.map((H) => ({
        id: H.id,
        author: {
          login: H.author?.login || "匿名",
          avatarUrl: H.author?.avatarUrl || "",
          association: Xe(H.authorAssociation)
        },
        createdAt: H.createdAt,
        formattedTime: Qe(H.createdAt),
        body: H.body || "",
        bodyHtml: H.bodyHTML || (H.body ? Ee.renderMarkdown(H.body) : ""),
        reactions: ht(H.reactionGroups)
      }));
      return {
        id: N.id,
        author: {
          login: N.author?.login || "匿名",
          avatarUrl: N.author?.avatarUrl || "",
          association: Xe(N.authorAssociation)
        },
        createdAt: N.createdAt,
        formattedTime: Qe(N.createdAt),
        body: N.body || "",
        bodyHtml: N.bodyHTML || (N.body ? Ee.renderMarkdown(N.body) : "<p>（评论内容为空）</p>"),
        reactions: ht(N.reactionGroups),
        replies: A
      };
    }), D = m.body || "", S = m.bodyHTML && m.bodyHTML.trim().length > 10 ? m.bodyHTML : D ? Ee.renderMarkdown(D) : "<p>（主贴内容为空）</p>";
    return {
      title: m.title,
      number: l,
      state: "discussion",
      category: m.category ? {
        name: m.category.name,
        emoji: wl(m.category.emoji)
      } : void 0,
      author: {
        login: m.author?.login || "未知",
        avatarUrl: m.author?.avatarUrl || "",
        association: Xe(m.authorAssociation)
      },
      createdAt: m.createdAt,
      formattedTime: Qe(m.createdAt),
      body: D,
      bodyHtml: S,
      htmlUrl: m.url,
      commentsCount: m.comments?.totalCount || y.length,
      totalRepliesCount: b,
      comments: y,
      reactions: ht(m.reactionGroups)
    };
  } catch {
    return null;
  }
}
const gt = {
  async open(k) {
    T.isOpen = !0, T.loading = !0, T.error = "", T.data = null, T.notificationItem = k;
    const u = Y.token?.trim() || "", l = {
      ...Be(u),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const r = k.subject?.url, g = k.subject?.type, v = k.repository?.fullName || "", [G, m] = v.split("/"), b = r?.match(/\/(\d+)$/), y = b ? Number(b[1]) : void 0;
      if (g === "Discussion" && G && m && y) {
        const D = await kl(G, m, y, u);
        if (D) {
          T.data = {
            notificationId: k.id,
            title: D.title || k.subject.title,
            number: y,
            state: "discussion",
            category: D.category,
            author: D.author || { login: k.repository.owner.login, avatarUrl: k.repository.owner.avatarUrl || "" },
            createdAt: D.createdAt || k.updatedAt,
            formattedTime: D.formattedTime || k.formattedTime,
            body: D.body || "",
            bodyHtml: D.bodyHtml || (D.body ? Ee.renderMarkdown(D.body) : ""),
            htmlUrl: D.htmlUrl || k.htmlUrl,
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
      if (r) {
        const D = await fetch(r, { headers: l, cache: "no-store" });
        if (D.ok) {
          const S = await D.json();
          let N = [];
          if (S.comments_url && S.comments > 0)
            try {
              const H = await fetch(`${S.comments_url}?per_page=50`, { headers: l, cache: "no-store" });
              if (H.ok) {
                const z = await H.json();
                Array.isArray(z) && (N = await Promise.all(
                  z.map(async (L) => {
                    const x = L.body_html || (L.body ? await Lt(L.body, u) : "");
                    return {
                      id: L.id,
                      author: {
                        login: L.user?.login || "匿名",
                        avatarUrl: L.user?.avatar_url || "",
                        association: Xe(L.author_association)
                      },
                      createdAt: L.created_at,
                      formattedTime: Qe(L.created_at),
                      body: L.body || "",
                      bodyHtml: x,
                      reactions: Tt(L.reactions)
                    };
                  })
                ));
              }
            } catch (H) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", H);
            }
          const U = S.body || "";
          let A = S.body_html || "";
          !A && U && (A = await Lt(U, u)), !A && U && (A = Ee.renderMarkdown(U)), T.data = {
            notificationId: k.id,
            title: S.title || S.name || k.subject.title,
            number: S.number || y,
            state: S.merged ? "merged" : S.state || S.conclusion || "open",
            author: {
              login: S.user?.login || S.author?.login || k.repository.owner.login,
              avatarUrl: S.user?.avatar_url || S.author?.avatar_url || k.repository.owner.avatarUrl || "",
              association: Xe(S.author_association)
            },
            createdAt: S.created_at || S.published_at || k.updatedAt,
            formattedTime: Qe(S.created_at || S.published_at || k.updatedAt),
            body: U,
            bodyHtml: A || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: S.html_url || k.htmlUrl,
            commentsCount: typeof S.comments == "number" ? S.comments : N.length,
            comments: N,
            reactions: Tt(S.reactions),
            repositoryFullName: v,
            type: g || "Issue"
          };
          return;
        }
      }
      T.data = {
        notificationId: k.id,
        title: k.subject.title,
        number: y,
        state: "open",
        author: {
          login: k.repository.owner.login,
          avatarUrl: k.repository.owner.avatarUrl || ""
        },
        createdAt: k.updatedAt,
        formattedTime: k.formattedTime,
        body: "",
        bodyHtml: "<p style='color: var(--muted);'>未能通过 API 读取到详细正文，请点击右上角「在网页打开」直达原帖。</p>",
        htmlUrl: k.htmlUrl,
        commentsCount: 0,
        comments: [],
        repositoryFullName: v,
        type: g || "通知"
      };
    } catch (r) {
      console.warn("[GitHubNotificationDetail] 读取异常:", r), T.error = r?.message || "网络请求异常";
    } finally {
      T.loading = !1;
    }
  },
  close() {
    T.isOpen = !1, T.data = null, T.error = "";
  }
}, $l = { class: "vue-gh-notification-panel-wrapper" }, Cl = { class: "gh-msg-header" }, Sl = { class: "gh-msg-account" }, Rl = { class: "gh-msg-subtitle" }, Gl = {
  class: "gh-msg-tabs",
  role: "tablist"
}, Ml = ["onClick"], Tl = { class: "gh-msg-list" }, Ll = {
  key: 0,
  class: "gh-msg-loading"
}, Dl = {
  key: 1,
  class: "gh-msg-error"
}, Al = {
  key: 2,
  class: "gh-msg-empty"
}, Hl = ["onClick"], xl = { class: "gh-card-indicator-col" }, El = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, Ul = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, Il = { class: "gh-card-type-col" }, Nl = ["title"], Pl = { class: "gh-card-main-col" }, Ol = { class: "gh-card-repo-row" }, Fl = ["title"], jl = { class: "gh-card-reason-tag" }, Bl = { class: "gh-card-time" }, zl = ["title"], ql = { class: "gh-card-footer-row" }, Wl = { class: "gh-card-type-label" }, Vl = ["onClick"], Yl = /* @__PURE__ */ Se({
  __name: "GitHubNotificationPanel",
  setup(k) {
    const u = R(null), l = ae(() => [
      { kind: "all", label: "所有", count: j.items.length },
      { kind: "unread", label: "未读", count: j.items.filter((U) => U.unread).length },
      { kind: "mention", label: "提及", count: j.items.filter((U) => U.reason === "mention").length },
      { kind: "author", label: "作者", count: j.items.filter((U) => U.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: j.items.filter((U) => U.reason === "ci_activity" || U.subject.type === "CheckSuite").length }
    ]), r = ae(() => {
      const U = j.items;
      switch (j.activeKind) {
        case "unread":
          return U.filter((A) => A.unread);
        case "mention":
          return U.filter((A) => A.reason === "mention");
        case "author":
          return U.filter((A) => A.reason === "author");
        case "ci":
          return U.filter((A) => A.reason === "ci_activity" || A.subject.type === "CheckSuite");
        default:
          return U;
      }
    });
    function g(U, A) {
      if (A === "ci_activity" || U === "CheckSuite")
        return "⚡";
      switch (U) {
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
    function v(U) {
      switch (U) {
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
          return U || "通知";
      }
    }
    function G() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function m() {
      xe.refresh();
    }
    function b() {
      xe.close();
    }
    function y(U) {
      gt.open(U);
    }
    function D(U) {
      xe.openTarget(U);
    }
    function S(U) {
      if (!j.isOpen) return;
      const A = U.target;
      !u.value?.contains(A) && !A?.closest("#gh-header-msg-center-btn") && xe.close();
    }
    function N(U) {
      U.key === "Escape" && j.isOpen && xe.close();
    }
    return lt(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", S), window.addEventListener("keydown", N));
    }), rt(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", S), window.removeEventListener("keydown", N));
    }), (U, A) => (t(), s("div", $l, [
      n(j).isOpen ? (t(), s("section", {
        key: 0,
        ref_key: "panelRef",
        ref: u,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: A[0] || (A[0] = te(() => {
        }, ["stop"]))
      }, [
        e("header", Cl, [
          e("div", Sl, [
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
              e("p", Rl, " 共 " + o(n(j).items.length) + " 条通知 · " + o(n(j).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          A[3] || (A[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: G
          }, " ↗ "),
          e("button", {
            type: "button",
            class: W(["gh-panel-btn", { "is-spinning": n(j).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: m
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: b
          }, " ✕ ")
        ]),
        e("nav", Gl, [
          (t(!0), s(B, null, J(l.value, (H) => (t(), s("button", {
            key: H.kind,
            type: "button",
            class: W(["gh-msg-tab", { active: n(j).activeKind === H.kind }]),
            onClick: (z) => n(j).activeKind = H.kind
          }, [
            Q(o(H.label) + " ", 1),
            H.count > 0 ? (t(), s("span", {
              key: 0,
              class: W(["gh-tab-pill", { "is-unread-pill": H.kind === "unread" }])
            }, o(H.count), 3)) : $("", !0)
          ], 10, Ml))), 128))
        ]),
        e("div", Tl, [
          n(j).loading && !n(j).items.length ? (t(), s("div", Ll, [...A[4] || (A[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : n(j).error ? (t(), s("div", Dl, [
            A[5] || (A[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, o(n(j).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: m
            }, "重试")
          ])) : r.value.length === 0 ? (t(), s("div", Al, [...A[6] || (A[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (t(!0), s(B, { key: 3 }, J(r.value, (H) => (t(), s("article", {
            key: H.id,
            class: W(["gh-notification-card", { "is-unread": H.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (z) => y(H)
          }, [
            e("div", xl, [
              H.unread ? (t(), s("span", El)) : (t(), s("span", Ul))
            ]),
            e("div", Il, [
              e("span", {
                class: "gh-type-badge",
                title: H.subject.type
              }, o(g(H.subject.type, H.reason)), 9, Nl)
            ]),
            e("div", Pl, [
              e("div", Ol, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: H.repository.fullName
                }, o(H.repository.fullName), 9, Fl),
                e("span", jl, o(v(H.reason)), 1),
                e("time", Bl, o(H.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: H.subject.title
              }, o(H.subject.title), 9, zl),
              e("div", ql, [
                e("span", Wl, o(H.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: te((z) => D(H), ["stop"])
                }, "在网页打开 ↗", 8, Vl)
              ])
            ])
          ], 10, Hl))), 128))
        ])
      ], 512)) : $("", !0)
    ]));
  }
}), Kl = /* @__PURE__ */ Re(Yl, [["__scopeId", "data-v-9a98e294"]]), Ql = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, Xl = ["aria-label"], Zl = { class: "gh-modal-title-wrap" }, Jl = { class: "gh-modal-octo-icon" }, er = ["href"], tr = { class: "gh-owner" }, sr = { class: "gh-name" }, or = {
  key: 1,
  class: "gh-modal-repo-name"
}, nr = { class: "gh-name" }, ar = { class: "gh-modal-actions" }, lr = { class: "gh-modal-content" }, rr = {
  key: 0,
  class: "gh-content-loading"
}, ir = {
  key: 1,
  class: "gh-content-error"
}, ur = { class: "gh-discussion-title-header" }, cr = { class: "gh-discussion-h1" }, dr = {
  key: 0,
  class: "gh-discussion-num"
}, pr = { class: "gh-discussion-sub-meta" }, hr = {
  key: 0,
  class: "gh-category-pill"
}, gr = {
  key: 0,
  class: "cat-emoji"
}, mr = {
  key: 1,
  class: "gh-category-pill"
}, fr = { class: "gh-sub-author" }, vr = { class: "gh-sub-verb" }, br = {
  key: 2,
  class: "gh-sub-comments-count"
}, yr = { class: "gh-op-post-card" }, _r = { class: "gh-op-post-head" }, wr = { class: "gh-op-author-left" }, kr = ["src"], $r = { class: "gh-op-meta" }, Cr = { class: "gh-op-name-row" }, Sr = { class: "gh-op-name" }, Rr = {
  key: 0,
  class: "gh-role-pill"
}, Gr = { class: "gh-op-time" }, Mr = ["innerHTML"], Tr = {
  key: 0,
  class: "gh-reactions-bar"
}, Lr = { class: "rx-emoji" }, Dr = { class: "rx-count" }, Ar = {
  key: 0,
  class: "gh-comments-block"
}, Hr = { class: "gh-comments-header" }, xr = { class: "gh-comments-count-pill" }, Er = { class: "gh-comments-feed" }, Ur = { class: "gh-comment-head" }, Ir = ["src"], Nr = { class: "gh-comment-meta" }, Pr = { class: "gh-comment-author" }, Or = {
  key: 0,
  class: "gh-role-pill small"
}, Fr = { class: "gh-comment-time" }, jr = ["innerHTML"], Br = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, zr = { class: "rx-emoji" }, qr = { class: "rx-count" }, Wr = {
  key: 1,
  class: "gh-comment-replies-thread"
}, Vr = { class: "gh-replies-thread-title" }, Yr = { class: "gh-reply-head" }, Kr = ["src"], Qr = { class: "gh-reply-meta" }, Xr = { class: "gh-reply-author" }, Zr = {
  key: 0,
  class: "gh-role-pill tiny"
}, Jr = { class: "gh-reply-time" }, ei = ["innerHTML"], ti = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, si = { class: "rx-emoji" }, oi = { class: "rx-count" }, ni = {
  key: 1,
  class: "gh-no-comments"
}, ai = /* @__PURE__ */ Se({
  __name: "GitHubNotificationDetailDrawer",
  setup(k) {
    const u = R(null), l = R(null), r = R(null);
    let g = !1, v = 0, G = 0, m = 0, b = 0, y = () => {
    };
    const D = ae(() => (T.data?.repositoryFullName || T.notificationItem?.repository.fullName || "").split("/")[0] || ""), S = ae(() => {
      const P = T.data?.repositoryFullName || T.notificationItem?.repository.fullName || "";
      return P.split("/")[1] || P;
    }), N = ae(() => {
      if (!T.data) return "";
      const P = T.data.bodyHtml?.trim() || "";
      if (P.length > 20) return P;
      const O = T.data.body?.trim() || "";
      return O.length > 0 ? Ee.renderMarkdown(O) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), U = ae(() => r.value ? {
      position: "fixed",
      left: `${r.value.x}px`,
      top: `${r.value.y}px`,
      transform: "none"
    } : {});
    he(
      () => T.isOpen,
      (P) => {
        P && (r.value = null, $t(() => {
          l.value && (l.value.scrollTop = 0);
        }));
      }
    ), he(
      () => T.data,
      (P) => {
        P && $t(() => {
          l.value && (l.value.scrollTop = 0);
        });
      }
    );
    function A(P) {
      if (P.target.closest("button, a, input")) return;
      y();
      const O = u.value;
      if (!O || !T.isOpen) return;
      g = !0;
      const F = O.getBoundingClientRect();
      m = F.left, b = F.top, v = P.clientX, G = P.clientY, r.value = { x: m, y: b };
      const q = (oe) => {
        if (!g) return;
        const le = oe.clientX - v, ue = oe.clientY - G;
        r.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, m + le)),
          y: Math.max(10, Math.min(window.innerHeight - 80, b + ue))
        };
      }, V = () => {
        g = !1, window.removeEventListener("mousemove", q), window.removeEventListener("mouseup", V);
      };
      y = V, window.addEventListener("mousemove", q), window.addEventListener("mouseup", V);
    }
    function H() {
      gt.close();
    }
    function z() {
      const P = T.data?.htmlUrl || T.notificationItem?.htmlUrl;
      P && typeof window < "u" && window.open(P, "_blank", "noopener,noreferrer");
    }
    function L(P) {
      const F = P.target?.closest("a");
      F && F.href && (P.preventDefault(), P.stopPropagation(), window.open(F.href, "_blank", "noopener,noreferrer"));
    }
    function x() {
      T.notificationItem && gt.open(T.notificationItem);
    }
    function X(P) {
      switch (P) {
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
    function ee(P) {
      switch (P) {
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
          return P || "通知详情";
      }
    }
    function ie(P) {
      switch (P) {
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
          return P || "";
      }
    }
    function ne(P) {
      P.key === "Escape" && T.isOpen && H();
    }
    return lt(() => {
      Ot(), window.addEventListener("keydown", ne);
    }), rt(() => {
      window.removeEventListener("keydown", ne), y();
    }), (P, O) => (t(), be(mt, { to: "body" }, [
      n(T).isOpen ? (t(), s("div", Ql, [
        e("div", {
          ref_key: "windowRef",
          ref: u,
          class: "gh-nonmodal-window",
          style: ot(U.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": n(T).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: A
          }, [
            e("div", Zl, [
              e("span", Jl, o(X(n(T).data?.type || n(T).notificationItem?.subject.type)), 1),
              n(T).data?.htmlUrl || n(T).notificationItem?.htmlUrl ? (t(), s("a", {
                key: 0,
                href: n(T).data?.htmlUrl || n(T).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", tr, o(D.value), 1),
                O[0] || (O[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", sr, o(S.value), 1),
                O[1] || (O[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, er)) : (t(), s("span", or, [
                e("strong", nr, o(n(T).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", ar, [
              n(T).data?.state ? (t(), s("span", {
                key: 0,
                class: W(["gh-detail-state-pill", n(T).data.state])
              }, o(ie(n(T).data.state)), 3)) : $("", !0),
              n(T).data?.htmlUrl || n(T).notificationItem?.htmlUrl ? (t(), s("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: z
              }, " 在网页打开 ↗ ")) : $("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: H
              }, " ✕ ")
            ])
          ], 32),
          e("div", lr, [
            n(T).loading ? (t(), s("div", rr, [
              O[2] || (O[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + o(n(T).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : n(T).error ? (t(), s("div", ir, [
              O[3] || (O[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, o(n(T).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: x
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: z
                }, "在 GitHub 打开 ↗")
              ])
            ])) : n(T).data ? (t(), s("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: l,
              class: "gh-detail-scrollable",
              onClick: L
            }, [
              e("div", ur, [
                e("h1", cr, [
                  Q(o(n(T).data.title) + " ", 1),
                  n(T).data.number ? (t(), s("span", dr, "#" + o(n(T).data.number), 1)) : $("", !0)
                ]),
                e("div", pr, [
                  n(T).data.category ? (t(), s("span", hr, [
                    n(T).data.category.emoji ? (t(), s("span", gr, o(n(T).data.category.emoji), 1)) : $("", !0),
                    e("span", null, o(n(T).data.category.name), 1)
                  ])) : (t(), s("span", mr, o(ee(n(T).data.type)), 1)),
                  e("span", fr, o(n(T).data.author.login), 1),
                  e("span", vr, "发布于 " + o(n(T).data.formattedTime), 1),
                  n(T).data.commentsCount ? (t(), s("span", br, [
                    Q(" · " + o(n(T).data.commentsCount) + " 条讨论主题 ", 1),
                    n(T).data.totalRepliesCount ? (t(), s(B, { key: 0 }, [
                      Q(" （含 " + o(n(T).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : $("", !0)
                  ])) : $("", !0)
                ])
              ]),
              e("article", yr, [
                e("div", _r, [
                  e("div", wr, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: n(T).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, kr),
                    e("div", $r, [
                      e("div", Cr, [
                        e("strong", Sr, o(n(T).data.author.login), 1),
                        n(T).data.author.association ? (t(), s("span", Rr, o(n(T).data.author.association), 1)) : $("", !0)
                      ]),
                      e("time", Gr, o(n(T).data.formattedTime), 1)
                    ])
                  ]),
                  O[4] || (O[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                O[5] || (O[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: N.value
                }, null, 8, Mr),
                n(T).data.reactions?.length ? (t(), s("div", Tr, [
                  (t(!0), s(B, null, J(n(T).data.reactions, (F) => (t(), s("span", {
                    key: F.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", Lr, o(F.emoji), 1),
                    e("span", Dr, o(F.count), 1)
                  ]))), 128))
                ])) : $("", !0)
              ]),
              n(T).data.comments.length ? (t(), s("div", Ar, [
                e("div", Hr, [
                  O[6] || (O[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", xr, [
                    Q(o(n(T).data.commentsCount) + " 条主题 ", 1),
                    n(T).data.totalRepliesCount ? (t(), s(B, { key: 0 }, [
                      Q(" · " + o(n(T).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : $("", !0)
                  ])
                ]),
                e("div", Er, [
                  (t(!0), s(B, null, J(n(T).data.comments, (F) => (t(), s("div", {
                    key: F.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", Ur, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: F.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, Ir),
                      e("div", Nr, [
                        e("span", Pr, o(F.author.login), 1),
                        F.author.association ? (t(), s("span", Or, o(F.author.association), 1)) : $("", !0),
                        e("time", Fr, o(F.formattedTime), 1)
                      ])
                    ]),
                    O[7] || (O[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: F.bodyHtml
                    }, null, 8, jr),
                    F.reactions?.length ? (t(), s("div", Br, [
                      (t(!0), s(B, null, J(F.reactions, (q) => (t(), s("span", {
                        key: q.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", zr, o(q.emoji), 1),
                        e("span", qr, o(q.count), 1)
                      ]))), 128))
                    ])) : $("", !0),
                    F.replies?.length ? (t(), s("div", Wr, [
                      e("div", Vr, [
                        e("span", null, "💬 " + o(F.replies.length) + " 条回复对话", 1)
                      ]),
                      (t(!0), s(B, null, J(F.replies, (q) => (t(), s("div", {
                        key: q.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", Yr, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: q.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, Kr),
                          e("div", Qr, [
                            e("strong", Xr, o(q.author.login), 1),
                            q.author.association ? (t(), s("span", Zr, o(q.author.association), 1)) : $("", !0),
                            e("time", Jr, o(q.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: q.bodyHtml
                        }, null, 8, ei),
                        q.reactions?.length ? (t(), s("div", ti, [
                          (t(!0), s(B, null, J(q.reactions, (V) => (t(), s("span", {
                            key: V.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", si, o(V.emoji), 1),
                            e("span", oi, o(V.count), 1)
                          ]))), 128))
                        ])) : $("", !0)
                      ]))), 128))
                    ])) : $("", !0)
                  ]))), 128))
                ])
              ])) : (t(), s("div", ni, [...O[8] || (O[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : $("", !0)
          ])
        ], 12, Xl)
      ])) : $("", !0)
    ]));
  }
}), li = /* @__PURE__ */ Re(ai, [["__scopeId", "data-v-053c788c"]]), ri = [
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
], ii = ["inert"], ui = {
  key: 0,
  class: "muted small",
  role: "status"
}, ci = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, di = { class: "gh-bili-layout" }, pi = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, hi = ["title"], gi = { class: "fo-sidebar-toggle-title" }, mi = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, fi = ["aria-expanded", "title"], vi = { class: "fo-sidebar-toggle-chevron" }, bi = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, yi = { class: "fo-sidebar-sub-wrap" }, _i = { class: "fo-sidebar-sub-wrap" }, wi = ["title"], ki = { class: "fo-sidebar-sub-main" }, $i = { class: "fo-sidebar-sub-text" }, Ci = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Si = ["title"], Ri = { class: "fo-sidebar-sub-main" }, Gi = { class: "fo-sidebar-sub-text" }, Mi = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Ti = ["title"], Li = { class: "fo-sidebar-sub-main" }, Di = { class: "fo-sidebar-sub-text" }, Ai = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, Hi = ["title"], xi = { class: "fo-sidebar-sub-main" }, Ei = { class: "fo-sidebar-sub-text" }, Ui = { class: "gh-bili-sidebar-head" }, Ii = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, Ni = { style: { color: "var(--dim)", "font-size": "9.5px" } }, Pi = ["title", "aria-label"], Oi = {
  class: "gh-bili-folder-list",
  id: "gh-folder-list"
}, Fi = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, ji = { class: "card-fullscreen-gh-search" }, Bi = ["title"], zi = { class: "gh-mode-icon" }, qi = { class: "gh-mode-text" }, Wi = ["placeholder"], Vi = ["title"], Yi = { class: "gh-search-rule-icon" }, Ki = { class: "gh-search-rule-text" }, Qi = ["title"], Xi = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, Zi = {
  class: "card-fullscreen-gh-search gh-hero-search-box-wrap",
  id: "gh-head-search-wrap"
}, Ji = ["title"], eu = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, tu = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, su = ["placeholder"], ou = ["title"], nu = { class: "gh-search-rule-icon" }, au = { class: "gh-search-rule-text" }, lu = ["title"], ru = ["title"], iu = { class: "gh-header-msg-label" }, uu = {
  key: 0,
  class: "gh-header-msg-badge"
}, cu = { class: "gh-settings-anchor" }, du = ["aria-expanded", "aria-label", "title"], pu = {
  id: "vue-github-repositories-root",
  style: { flex: "1", "min-height": "0", display: "flex", "flex-direction": "column" }
}, hu = /* @__PURE__ */ Se({
  __name: "GitHubWorkspaceCard",
  setup(k) {
    const u = Ct(() => import("./GitHubSettingsModal-BUEeJlHi.js")), l = Ct(() => import("./LauncherBookGuideDialog-BEewsPK3.js")), { active: r } = Et("card-github", "/github.html");
    let g = 0, v = !1, G;
    const m = R(""), b = R("dashboard");
    he(() => r.value && b.value === "stars", (C) => Y.setAiViewActive(C), { immediate: !0, flush: "sync" });
    const y = R(!1), D = R("local"), S = R(""), N = R(""), U = R(0), A = R("fuzzy"), H = R(null), z = R(!1), L = R(!1);
    he(r, (C) => {
      C || (L.value = !1);
    });
    const x = R(0);
    function X() {
      r.value && (z.value = !0, ++x.value);
    }
    const ee = R(!1);
    he(z, (C) => {
      C && (ee.value = !0);
    });
    const ie = R(null), ne = R(0);
    function P(C) {
      ie.value = C || document.getElementById("gh-sidebar-stars-btn"), z.value = !0;
    }
    let O = 0;
    function F(C) {
      C === "dashboard" && (H.value = null), b.value = C, C === "trending" ? Rt.switchTab("trending") : Rt.switchTab("stars");
    }
    function q() {
      b.value = "stars";
    }
    const V = ae(() => [
      { id: "exact", icon: "🎯", name: E("search.rule.exact"), desc: E("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: E("search.rule.fuzzy"), desc: E("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: E("search.rule.topic"), desc: E("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: E("search.rule.smart"), desc: E("search.rule.smartDesc") }
    ]), oe = R(Y.searchRule || "exact"), le = ae(() => V.value.find((C) => C.id === oe.value) || V.value[0]);
    function ue() {
      const C = Y.cycleSearchRule();
      oe.value = C;
    }
    const ve = ae(() => D.value === "global" ? E("github.searchGlobalPlaceholder") : E("github.searchLocalPlaceholder", { rule: le.value.name }));
    function _e() {
      clearTimeout(O), !(!r.value || D.value !== "local") && (O = window.setTimeout(() => Y.setSearchQuery(S.value.trim().toLowerCase()), 180));
    }
    function me() {
      D.value = D.value === "local" ? "global" : "local", D.value === "local" && _e();
    }
    function ye() {
      H.value = null, S.value = "", clearTimeout(O), Y.resetLocalSearch();
    }
    function Te(C, a) {
      const _ = C.trim();
      _ && (clearTimeout(O), N.value = _, A.value = a, U.value++, D.value = "global", S.value = _, F("dashboard"), H.value = "global");
    }
    function Ge() {
      const C = S.value.trim();
      D.value === "local" ? (clearTimeout(O), Y.setSearchQuery(C.toLowerCase())) : C && Te(C, "fuzzy");
    }
    he(() => [r.value, Zt.github?.id], ([C, a]) => {
      if (!C || !a) return;
      const _ = Xt("github");
      _ && Te(_.keyword, Y.searchRule || "exact");
    }, { immediate: !0 });
    function De() {
      S.value.trim() && (D.value === "local" ? (clearTimeout(O), Y.setSearchQuery(S.value.trim().toLowerCase()), H.value = "local") : Ge());
    }
    function Ae() {
      ++ne.value, ++g, v = !0, m.value = "";
    }
    return he(r, async (C) => {
      if (clearTimeout(O), !C) return;
      const a = ++g;
      if ((!G || G.signal.aborted) && (G = new AbortController(), Y.setRepositoryViewSignal(G.signal)), v) {
        await Y.resumeRepositoryReads();
        return;
      }
      if (Y.repos.length || Y.loadingAllStars || Y.loadingPage) {
        v = !0;
        return;
      }
      try {
        const _ = await vt();
        if (a !== g || G.signal.aborted) return;
        v = !0, await Y.loadGitHub(_.ghUser, _.ghToken);
      } catch {
        if (a !== g || G?.signal.aborted) return;
        v = !1, m.value = E("github.initError");
      }
    }, { immediate: !0, flush: "sync" }), ft(() => {
      Y.setAiViewActive(!1), ++g, G?.abort(), clearTimeout(O);
    }), (C, a) => (t(), s("section", {
      class: W(["card wide", { "card-fullscreen": n(Qt).activeId === "card-github" }]),
      id: "card-github",
      inert: !n(r)
    }, [
      a[35] || (a[35] = e("header", { class: "card-head" }, [
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
      m.value ? (t(), s("p", ui, o(m.value), 1)) : $("", !0),
      e("div", ci, [
        e("div", di, [
          e("aside", pi, [
            e("div", {
              class: W(["fo-sidebar-toggle-bar", { "is-collapsed": y.value }]),
              title: y.value ? n(E)("github.channel.toggleExpand") : n(E)("github.channel.toggleCollapse"),
              onClick: a[0] || (a[0] = (_) => y.value = !y.value)
            }, [
              e("div", gi, [
                a[17] || (a[17] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, o(n(E)("github.channel.channels")), 1),
                y.value ? (t(), s("span", mi, "5")) : $("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !y.value,
                title: y.value ? n(E)("github.expand") : n(E)("github.collapse")
              }, [
                e("span", null, o(y.value ? n(E)("github.expand") : n(E)("github.collapse")), 1),
                e("span", vi, o(y.value ? "▾" : "▴"), 1)
              ], 8, fi)
            ], 10, hi),
            y.value ? $("", !0) : (t(), s("div", bi, [
              e("div", yi, [
                e("button", {
                  id: "gh-sidebar-dashboard-btn",
                  type: "button",
                  class: W(["fo-sidebar-sub-btn", { on: b.value === "dashboard" }]),
                  title: "GitHub 首页",
                  onClick: a[1] || (a[1] = (_) => F("dashboard"))
                }, [...a[18] || (a[18] = [
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
              e("div", _i, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: W(["fo-sidebar-sub-btn", { on: b.value === "stars" }]),
                  title: n(E)("github.channel.starsTitle"),
                  onClick: a[2] || (a[2] = (_) => F("stars"))
                }, [
                  e("div", ki, [
                    a[19] || (a[19] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", $i, [
                      e("strong", null, o(n(E)("github.channel.stars")), 1),
                      e("small", null, o(n(E)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  a[20] || (a[20] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, wi)
              ]),
              e("div", Ci, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: W(["fo-sidebar-sub-btn", { on: b.value === "trending" }]),
                  title: n(E)("github.channel.trendingTitle"),
                  onClick: a[3] || (a[3] = (_) => F("trending"))
                }, [
                  e("div", Ri, [
                    a[21] || (a[21] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", Gi, [
                      e("strong", null, o(n(E)("github.channel.trending")), 1),
                      e("small", null, o(n(E)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  a[22] || (a[22] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, Si)
              ]),
              e("div", Mi, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: W(["fo-sidebar-sub-btn", { on: b.value === "awesome" }]),
                  title: n(E)("github.channel.awesomeTitle"),
                  onClick: a[4] || (a[4] = (_) => F("awesome"))
                }, [
                  e("div", Li, [
                    a[23] || (a[23] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", Di, [
                      e("strong", null, o(n(E)("github.channel.awesome")), 1),
                      e("small", null, o(n(E)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  a[24] || (a[24] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, Ti)
              ]),
              e("div", Ai, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: W(["fo-sidebar-sub-btn", { on: b.value === "repos" }]),
                  title: n(E)("github.channel.reposTitle"),
                  onClick: a[5] || (a[5] = (_) => F("repos"))
                }, [
                  e("div", xi, [
                    a[25] || (a[25] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", Ei, [
                      e("strong", null, o(n(E)("github.channel.repos")), 1),
                      e("small", null, o(n(E)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  a[26] || (a[26] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, Hi)
              ])
            ])),
            e("header", Ui, [
              e("div", null, [
                e("b", Ii, [
                  a[27] || (a[27] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  Q(" " + o(n(E)("github.lists.title")), 1)
                ]),
                e("small", Ni, o(n(E)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: n(E)("github.lists.new"),
                "aria-label": n(E)("github.lists.new"),
                onClick: a[6] || (a[6] = (_) => n(Y).promptCreateFolder())
              }, "＋", 8, Pi)
            ]),
            e("nav", Oi, [
              He(jt, {
                active: n(r),
                onSelect: q
              }, null, 8, ["active"])
            ])
          ]),
          e("section", Fi, [
            b.value === "dashboard" ? (t(), be(bl, {
              key: 0,
              active: n(r),
              "account-revision": ne.value,
              "show-results": !!H.value,
              onChannel: F,
              onSettings: P,
              onNotifications: a[8] || (a[8] = (_) => n(xe).open())
            }, {
              search: tt(() => [
                e("div", ji, [
                  e("form", {
                    class: "gh-search-box",
                    role: "search",
                    onSubmit: te(De, ["prevent"])
                  }, [
                    e("button", {
                      type: "button",
                      class: "gh-search-mode-toggle",
                      title: D.value === "local" ? n(E)("github.searchScope.toGlobal") : n(E)("github.searchScope.toLocal"),
                      onClick: me
                    }, [
                      e("span", zi, o(D.value === "local" ? "⭐" : "🌐"), 1),
                      e("span", qi, o(D.value === "local" ? n(E)("github.searchScope.local") : n(E)("github.searchScope.global")), 1),
                      a[28] || (a[28] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
                    ], 8, Bi),
                    ge(e("input", {
                      "onUpdate:modelValue": a[7] || (a[7] = (_) => S.value = _),
                      placeholder: ve.value,
                      "aria-label": "搜索 GitHub 仓库",
                      autocomplete: "off"
                    }, null, 8, Wi), [
                      [Me, S.value]
                    ]),
                    D.value === "local" ? (t(), s("button", {
                      key: 0,
                      type: "button",
                      class: W(["gh-search-rule-btn", `rule-${le.value.id}`]),
                      title: n(E)("github.ruleHint", { rule: le.value.name, desc: le.value.desc }),
                      onClick: te(ue, ["stop"])
                    }, [
                      e("span", Yi, o(le.value.icon), 1),
                      e("span", Ki, o(le.value.name), 1)
                    ], 10, Vi)) : $("", !0),
                    ge(e("button", {
                      type: "button",
                      class: "gh-search-clear-btn",
                      title: n(E)("github.clearSearch"),
                      onClick: ye
                    }, "✕", 8, Qi), [
                      [je, S.value]
                    ]),
                    a[29] || (a[29] = e("button", {
                      type: "submit",
                      title: "搜索",
                      "aria-label": "搜索"
                    }, "⌕", -1))
                  ], 32)
                ])
              ]),
              results: tt(() => [
                H.value === "global" ? (t(), be(Mt, {
                  key: 0,
                  embedded: "",
                  query: N.value,
                  "request-id": U.value,
                  rule: A.value,
                  onBack: ye
                }, null, 8, ["query", "request-id", "rule"])) : H.value === "local" ? (t(), be(wa, {
                  key: 1,
                  onBack: ye
                })) : $("", !0)
              ]),
              _: 1
            }, 8, ["active", "account-revision", "show-results"])) : b.value === "search" ? (t(), be(Mt, {
              key: 1,
              query: N.value,
              "request-id": U.value,
              rule: A.value,
              onBack: a[9] || (a[9] = (_) => F("stars"))
            }, null, 8, ["query", "request-id", "rule"])) : b.value === "stars" && n(at).accountConfigured === !1 ? (t(), be(Ft, {
              key: 2,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: a[10] || (a[10] = (_) => P())
            })) : b.value === "stars" ? (t(), s(B, { key: 3 }, [
              e("header", Xi, [
                He(Bt, {
                  onOpenAiSettings: X,
                  onOpenGuide: a[14] || (a[14] = (_) => L.value = !0)
                }, {
                  search: tt(() => [
                    e("div", Zi, [
                      e("form", {
                        id: "gh-search-form",
                        class: "gh-search-box",
                        onSubmit: te(Ge, ["prevent"])
                      }, [
                        e("button", {
                          type: "button",
                          id: "gh-search-mode-toggle",
                          class: "gh-search-mode-toggle",
                          title: D.value === "local" ? n(E)("github.searchScope.toGlobal") : n(E)("github.searchScope.toLocal"),
                          onClick: me
                        }, [
                          e("span", eu, o(D.value === "local" ? "⭐" : "🌐"), 1),
                          e("span", tu, o(D.value === "local" ? n(E)("github.searchScope.local") : n(E)("github.searchScope.global")), 1),
                          a[30] || (a[30] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
                        ], 8, Ji),
                        ge(e("input", {
                          id: "gh-search-input",
                          "onUpdate:modelValue": a[11] || (a[11] = (_) => S.value = _),
                          placeholder: ve.value,
                          autocomplete: "off",
                          onInput: _e
                        }, null, 40, su), [
                          [Me, S.value]
                        ]),
                        D.value === "local" ? (t(), s("button", {
                          key: 0,
                          type: "button",
                          class: W(["gh-search-rule-btn", `rule-${le.value.id}`]),
                          title: n(E)("github.ruleHint", { rule: le.value.name, desc: le.value.desc }),
                          onClick: te(ue, ["stop"])
                        }, [
                          e("span", nu, o(le.value.icon), 1),
                          e("span", au, o(le.value.name), 1)
                        ], 10, ou)) : $("", !0),
                        ge(e("button", {
                          type: "button",
                          id: "gh-search-clear-btn",
                          class: "gh-search-clear-btn",
                          title: n(E)("github.clearSearch"),
                          onClick: ye
                        }, "✕", 8, lu), [
                          [je, S.value]
                        ]),
                        a[31] || (a[31] = e("button", {
                          type: "submit",
                          id: "gh-search-submit-btn",
                          title: "搜索"
                        }, "⌕", -1))
                      ], 32),
                      a[32] || (a[32] = e("div", {
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
                          Q("精确")
                        ]),
                        e("label", { title: "宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" }, [
                          e("input", {
                            type: "checkbox",
                            value: "loose"
                          }),
                          Q("宽松匹配")
                        ]),
                        e("label", { title: "近义词：自动扩展相关英文词，例如 ai → llm / machine learning" }, [
                          e("input", {
                            type: "checkbox",
                            value: "related"
                          }),
                          Q("近义词")
                        ]),
                        e("label", { title: "主题标签：搜索 GitHub Topics 标签，例如 topic:llm" }, [
                          e("input", {
                            type: "checkbox",
                            value: "topic"
                          }),
                          Q("主题标签")
                        ]),
                        e("label", { title: "说明文档：搜索仓库 README 内容" }, [
                          e("input", {
                            type: "checkbox",
                            value: "readme"
                          }),
                          Q("说明文档")
                        ])
                      ], -1)),
                      a[33] || (a[33] = e("div", {
                        id: "gh-search-suggest",
                        class: "gh-search-suggest",
                        hidden: ""
                      }, null, -1))
                    ])
                  ]),
                  "actions-prefix": tt(() => [
                    e("button", {
                      id: "gh-header-msg-center-btn",
                      class: W(["gh-header-msg-btn", { "has-unread": n(j).unreadCount > 0, "is-active": n(j).isOpen }]),
                      type: "button",
                      title: n(j).unreadCount > 0 ? n(E)("github.header.msgUnread", { count: n(j).unreadCount }) : n(E)("github.header.msgCenter"),
                      onClick: a[12] || (a[12] = (_) => n(xe).toggle())
                    }, [
                      a[34] || (a[34] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
                      e("span", iu, o(n(E)("github.header.msg")), 1),
                      n(j).unreadCount > 0 ? (t(), s("span", uu, o(n(j).unreadCount > 99 ? "99+" : n(j).unreadCount), 1)) : $("", !0)
                    ], 10, ru),
                    e("div", cu, [
                      e("button", {
                        type: "button",
                        ref_key: "settingsButton",
                        ref: ie,
                        "aria-expanded": z.value,
                        "aria-label": n(E)("github.settings"),
                        class: "gh-head-settings-btn",
                        title: n(E)("github.header.settings"),
                        onClick: a[13] || (a[13] = (_) => z.value = !z.value)
                      }, " ⚙️ ", 8, du)
                    ])
                  ]),
                  _: 1
                })
              ]),
              e("div", pu, [
                He(jn, {
                  active: n(r) && b.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : b.value === "trending" ? (t(), be(zt, { key: 4 })) : b.value === "awesome" ? (t(), be(bs, { key: 5 })) : b.value === "repos" ? (t(), be(Co, {
              key: 6,
              active: n(r) && b.value === "repos"
            }, null, 8, ["active"])) : $("", !0)
          ])
        ])
      ]),
      ee.value ? (t(), be(n(u), {
        key: 1,
        visible: n(r) && z.value,
        anchor: ie.value,
        "ai-request": x.value,
        onAccountReload: Ae,
        onClose: a[15] || (a[15] = (_) => z.value = !1)
      }, null, 8, ["visible", "anchor", "ai-request"])) : $("", !0),
      L.value ? (t(), be(n(l), {
        key: 2,
        open: L.value,
        title: "GitHub 使用手册",
        spreads: n(ri),
        "help-selector": ".gh-github-help-btn",
        onClose: a[16] || (a[16] = (_) => L.value = !1)
      }, null, 8, ["open", "spreads"])) : $("", !0),
      He(Kl),
      He(li)
    ], 10, ii));
  }
}), Mu = /* @__PURE__ */ Re(hu, [["__scopeId", "data-v-4d379f02"]]);
export {
  Mu as default
};
