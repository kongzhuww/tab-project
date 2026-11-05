import { d as ke, o as s, g as n, h as e, n as re, q as we, i as R, F as z, j as B, C as j, t as a, u as t, k as J, b as I, y as te, r as $e, w as _e, D as je, z as Fe, A as Ie, m as Ee, e as de, l as Ve, B as qe, p as le, G as et, L as rt, H as ct, s as Te, E as ut } from "./vendor-vue-D8gPZiit.js";
import { u as dt } from "./useCardActivity-D6eJ-QAP.js";
import { E as lt, F as He, w as xe, H as Ne, t as V, R as tt, y as pt, v as ht, A as gt } from "./search.service-CxU1OKVQ.js";
import { A as mt } from "./AccountSetupGuide-CuxnX0oV.js";
import { g as ft, G as bt, a as st, b as vt } from "./main-COSZZeI1.js";
import yt from "./GitHubTrending-wOYxdBv2.js";
import { _ as Ce, t as C } from "./_plugin-vue_export-helper-qhyPkMid.js";
import { s as Re } from "./storage-cache.service-BYF2zxXX.js";
import { n as ot, r as wt } from "./view-styles-DHa4nHWU.js";
import { m as he } from "./core-utils-DYgSCp9X.js";
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
], $t = { class: "gh-awesome-wrapper" }, Ct = { class: "gh-awesome-header" }, Gt = { class: "gh-awesome-intro" }, Tt = { class: "gh-awesome-search-box" }, Rt = { class: "gh-awesome-pills" }, St = ["onClick"], Mt = { class: "gh-awesome-grid" }, At = ["onClick"], xt = { class: "gh-awesome-card-head" }, Lt = { class: "gh-awesome-card-name" }, Dt = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, Ht = { class: "gh-awesome-desc" }, Ut = { class: "gh-awesome-footer" }, Pt = { class: "gh-awesome-tags" }, Et = ["href"], It = {
  key: 0,
  class: "gh-awesome-empty"
}, Nt = /* @__PURE__ */ ke({
  __name: "GitHubAwesome",
  setup(v) {
    const r = I("all"), o = I(""), l = te(() => {
      const m = o.value.trim().toLowerCase(), G = r.value;
      return kt.filter((d) => G === "all" || d.category === G ? m ? d.name.toLowerCase().includes(m) || d.title.toLowerCase().includes(m) || d.desc.toLowerCase().includes(m) || d.tags.some((M) => M.toLowerCase().includes(m)) : !0 : !1);
    });
    function h(m) {
      window.open(m, "_blank", "noreferrer");
    }
    return (m, G) => (s(), n("div", $t, [
      e("header", Ct, [
        e("div", Gt, [
          G[3] || (G[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", Tt, [
            re(e("input", {
              "onUpdate:modelValue": G[0] || (G[0] = (d) => o.value = d),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [we, o.value]
            ]),
            o.value ? (s(), n("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: G[1] || (G[1] = (d) => o.value = "")
            }, "✕")) : R("", !0)
          ])
        ]),
        e("div", Rt, [
          (s(!0), n(z, null, B(t(_t), (d) => (s(), n("button", {
            key: d.id,
            type: "button",
            class: j(["gh-awesome-pill", { active: r.value === d.id }]),
            onClick: (f) => r.value = d.id
          }, [
            e("span", null, a(d.icon), 1),
            e("b", null, a(d.name), 1)
          ], 10, St))), 128))
        ])
      ]),
      e("div", Mt, [
        (s(!0), n(z, null, B(l.value, (d) => (s(), n("article", {
          key: d.id,
          class: "gh-awesome-card",
          onClick: (f) => h(d.url)
        }, [
          e("div", xt, [
            e("div", Lt, [
              e("strong", null, a(d.title), 1),
              e("small", null, a(d.name), 1)
            ]),
            e("span", Dt, "★ " + a(d.stars), 1)
          ]),
          e("p", Ht, a(d.desc), 1),
          e("div", Ut, [
            e("div", Pt, [
              (s(!0), n(z, null, B(d.tags, (f) => (s(), n("span", {
                key: f,
                class: "gh-awesome-tag"
              }, a(f), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: d.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: G[2] || (G[2] = J(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, Et)
          ])
        ], 8, At))), 128)),
        l.value.length ? R("", !0) : (s(), n("div", It, [...G[4] || (G[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), jt = /* @__PURE__ */ Ce(Nt, [["__scopeId", "data-v-28a8995f"]]), Se = "gh_my_repos_cache_v1", Me = "gh_my_repo_groups_v2", Ae = "gh_my_repo_groups_map_v2", T = $e({
  loading: !1,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});
function fe(v) {
  return v.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
}
class ve {
  constructor() {
    this.abortController = null, this.inFlightPromise = null;
  }
  static getInstance() {
    return ve.instance || (ve.instance = new ve()), ve.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略，支持并发防抖与请求去重）
   */
  async load(r = !1) {
    if (!r && this.inFlightPromise)
      return this.inFlightPromise;
    r && (this.abortController?.abort(), this.inFlightPromise = null), this.abortController = new AbortController();
    const o = this.abortController.signal, l = (async () => {
      await this.loadPersistedGroups();
      const h = await Re.get(Se);
      if (h && h.length ? this.hydrateRepos(h) : T.repos.length && this.hydrateRepos(T.repos), r || !T.repos.length) {
        T.loading = !0, T.errorMessage = "";
        try {
          await this.fetchRemote(o);
        } catch (G) {
          if (G.name === "AbortError") return;
          T.errorMessage = G.message || "获取个人仓库失败";
        } finally {
          T.loading = !1;
        }
      } else
        this.fetchRemote(o).catch(() => {
        });
    })();
    return this.inFlightPromise = l.finally(() => {
      this.inFlightPromise === l && (this.inFlightPromise = null);
    }), this.inFlightPromise;
  }
  async fetchRemote(r) {
    const { ghUser: o, ghToken: l } = await lt();
    if (!o && !l) {
      T.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    const h = He(l), m = [], G = /* @__PURE__ */ new Set();
    if (o)
      try {
        const f = `https://api.github.com/users/${encodeURIComponent(o)}/repos?type=owner&sort=updated&per_page=100`, M = await fetch(f, { method: "GET", headers: h, signal: r });
        if (M.ok) {
          const D = await M.json();
          if (Array.isArray(D))
            for (const $ of D)
              $ && $.id && !G.has($.id) && (G.add($.id), m.push($));
        }
      } catch (f) {
        if (f.name === "AbortError") throw f;
      }
    if (l)
      try {
        const M = await fetch("https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100", { method: "GET", headers: h, signal: r });
        if (M.ok) {
          const D = await M.json();
          if (Array.isArray(D))
            for (const $ of D)
              $ && $.id && !G.has($.id) && (G.add($.id), m.push($));
        }
      } catch (f) {
        if (f.name === "AbortError") throw f;
      }
    if (!m.length) {
      T.repos.length || (T.errorMessage = "未能读取到个人仓库，请检查网络或 GitHub 设置。");
      return;
    }
    const d = m.map((f) => {
      const M = f.full_name || `${f.owner?.login || o}/${f.name}`, D = f.name, $ = T.repoGroupsMap[M] || T.repoGroupsMap[D] || T.repoGroupsMap[M.toLowerCase()] || T.repoGroupsMap[D.toLowerCase()] || [];
      return {
        id: f.id,
        name: f.name,
        fullName: M,
        description: f.description || "",
        isPrivate: !!f.private,
        isFork: !!f.fork,
        htmlUrl: f.html_url || `https://github.com/${o}/${f.name}`,
        language: f.language || null,
        stargazersCount: Number(f.stargazers_count) || 0,
        forksCount: Number(f.forks_count) || 0,
        openIssuesCount: Number(f.open_issues_count) || 0,
        topics: Array.isArray(f.topics) ? f.topics.map((H) => String(H).toLowerCase()) : [],
        localGroups: $,
        updatedAt: f.updated_at || "",
        pushedAt: f.pushed_at || "",
        defaultBranch: f.default_branch || "main"
      };
    });
    this.hydrateRepos(d), await Re.set(Se, d, { ttlMs: 30 * 86400 * 1e3 });
  }
  hydrateRepos(r) {
    let o = !1;
    T.repos = r.map((l) => {
      const h = T.repoGroupsMap[l.fullName] || T.repoGroupsMap[l.name] || T.repoGroupsMap[l.fullName.toLowerCase()] || T.repoGroupsMap[l.name.toLowerCase()], m = l.localGroups && l.localGroups.length ? l.localGroups : null, G = this.inferGroupsForRepo(l, T.customGroups), d = (h && h.length ? h : null) || m || G, f = d ? [...new Set(d.filter(Boolean))] : [];
      return f.length && (!T.repoGroupsMap[l.fullName] || !T.repoGroupsMap[l.fullName].length) && (T.repoGroupsMap[l.fullName] = f, o = !0), {
        ...l,
        localGroups: f
      };
    }), o && this.persistGroupsMap();
  }
  /**
   * 智能推断仓库最匹配的分组归属（仅在无手动归类时作为平滑桥接）
   */
  inferGroupsForRepo(r, o) {
    if (!o || !o.length) return [];
    const l = [], h = r.name.toLowerCase(), m = (r.topics || []).map((G) => G.toLowerCase());
    for (const G of o) {
      const d = G.toLowerCase();
      if ((d.includes("fork") || G.includes("分支")) && (r.isFork || m.includes("fork"))) {
        l.push(G);
        continue;
      }
      if ((d.includes("浏览器") || d.includes("browser") || d.includes("chrome") || d.includes("edge")) && (m.some((f) => f.includes("extension") || f.includes("browser") || f.includes("newtab")) || h.includes("tab-project"))) {
        l.push(G);
        continue;
      }
      if ((d.includes("pi") || G.includes("PI")) && (m.some((f) => f.includes("pi") || f.includes("grounding-pi")) || h.includes("pi-") || h.includes("-pi"))) {
        l.push(G);
        continue;
      }
      if (d.includes("herdr") && (m.some((f) => f.includes("herdr")) || h.includes("herdr"))) {
        l.push(G);
        continue;
      }
      if ((d.includes("嵌入式") || d.includes("embedded") || d.includes("单片机")) && (m.some((f) => f.includes("embedded") || f.includes("zephyr") || f.includes("stm32") || f.includes("k230")) || h.includes("k230") || h.includes("mspm0") || h.includes("pid-") || h.includes("zephyr"))) {
        l.push(G);
        continue;
      }
      if ((d.includes("美化") || d.includes("theme") || d.includes("style")) && (m.some((f) => f.includes("theme") || f.includes("beauty") || f.includes("ui")) || h.includes("theme") || h.includes("style"))) {
        l.push(G);
        continue;
      }
    }
    return l;
  }
  /**
   * 将仓库添加到本地自定义分组
   */
  async addRepoToGroup(r, o) {
    const l = fe(o);
    l && (r.localGroups.includes(l) || r.localGroups.push(l), T.repoGroupsMap[r.fullName] = [...r.localGroups], await this.persistGroupsMap(), await Re.set(Se, T.repos, { ttlMs: 30 * 86400 * 1e3 }));
  }
  /**
   * 将仓库从指定本地分组中移出
   */
  async removeRepoFromGroup(r, o) {
    r.localGroups = r.localGroups.filter((l) => l !== o), T.repoGroupsMap[r.fullName] = [...r.localGroups], await this.persistGroupsMap(), await Re.set(Se, T.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  async moveRepoToGroup(r, o) {
    if (!o)
      r.localGroups = [];
    else {
      const l = fe(o);
      if (!l) return;
      r.localGroups = [l];
    }
    T.repoGroupsMap[r.fullName] = [...r.localGroups], await this.persistGroupsMap(), await Re.set(Se, T.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 新建一个本地分组板块
   */
  async createGroup(r) {
    const o = fe(r);
    return o ? T.customGroups.includes(o) ? (alert(`分组「${o}」已存在。`), null) : (T.customGroups.push(o), await this.persistGroups(), o) : (alert("分组名称不能为空。"), null);
  }
  /**
   * 重命名本地分组
   */
  async renameGroup(r, o) {
    const l = fe(o);
    return l ? r === l ? !0 : T.customGroups.includes(l) ? (alert(`已存在名为「${l}」的分组。`), !1) : (T.customGroups = T.customGroups.map((h) => h === r ? l : h), T.repos.forEach((h) => {
      h.localGroups.includes(r) && (h.localGroups = h.localGroups.map((m) => m === r ? l : m), T.repoGroupsMap[h.fullName] = [...h.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : (alert("新分组名称不能为空。"), !1);
  }
  /**
   * 删除本地分组
   */
  async deleteGroup(r) {
    const o = T.repos.filter((h) => h.localGroups.includes(r)).length, l = o > 0 ? `确定删除分组「${r}」吗？
该分组下的 ${o} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。` : `确定删除空分组「${r}」吗？`;
    return confirm(l) ? (T.customGroups = T.customGroups.filter((h) => h !== r), T.repos.forEach((h) => {
      h.localGroups.includes(r) && (h.localGroups = h.localGroups.filter((m) => m !== r), T.repoGroupsMap[h.fullName] = [...h.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : !1;
  }
  async loadPersistedGroups() {
    try {
      let r = null, o = null;
      if (typeof chrome < "u" && chrome.storage?.local) {
        const l = await chrome.storage.local.get([Me, Ae]);
        r = l?.[Me], o = l?.[Ae];
      }
      if (!r || !Array.isArray(r)) {
        const l = localStorage.getItem(Me);
        l && (r = JSON.parse(l));
      }
      if (!o || typeof o != "object") {
        const l = localStorage.getItem(Ae);
        l && (o = JSON.parse(l));
      }
      Array.isArray(r) && (T.customGroups = r.map(fe).filter(Boolean)), o && typeof o == "object" && (T.repoGroupsMap = o);
    } catch {
    }
  }
  async persistGroupsMap() {
    try {
      const r = { ...T.repoGroupsMap };
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Ae]: r }), localStorage.setItem(Ae, JSON.stringify(r));
    } catch {
    }
  }
  async persistGroups() {
    const r = Array.from(new Set(T.customGroups.map(fe).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Me]: r }), localStorage.setItem(Me, JSON.stringify(r));
    } catch {
    }
  }
}
const oe = ve.getInstance(), Ft = { class: "my-repos-workspace" }, Ot = {
  key: 0,
  class: "error-banner"
}, zt = { class: "shelf-header" }, Wt = { class: "shelf-left" }, Bt = { class: "shelf-badge" }, Yt = { class: "shelf-right" }, Vt = { class: "shelf-search-wrap" }, qt = ["disabled", "title"], Kt = ["title"], Qt = ["onDragstart", "onContextmenu"], Xt = { class: "repo-card-head" }, Jt = ["title", "onClick"], Zt = {
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
}, rs = ["title"], cs = { class: "board-columns-track" }, us = ["onDragover", "onDragleave", "onDrop"], ds = { class: "column-header" }, ps = {
  key: 0,
  class: "column-title-group"
}, hs = ["title"], gs = { class: "badge-count" }, ms = {
  key: 1,
  class: "column-rename-group"
}, fs = ["onKeydown"], bs = ["onClick"], vs = { class: "column-actions" }, ys = ["onClick"], ws = {
  key: 0,
  class: "col-popover-menu"
}, _s = ["onClick"], ks = ["onClick"], $s = { class: "column-cards-scroll" }, Cs = ["onDragstart", "onContextmenu"], Gs = { class: "repo-card-head" }, Ts = ["title", "onClick"], Rs = {
  key: 0,
  class: "badge-repo-visibility private"
}, Ss = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Ms = ["title"], As = { class: "repo-topics-row" }, xs = { class: "topic-chip active-chip" }, Ls = ["onClick"], Ds = { class: "repo-card-footer" }, Hs = { class: "meta-left" }, Us = {
  key: 0,
  class: "meta-item lang"
}, Ps = { class: "meta-item" }, Es = {
  key: 1,
  class: "meta-item"
}, Is = { class: "meta-date" }, Ns = {
  key: 0,
  class: "empty-column-placeholder"
}, js = { class: "board-column new-column-slot" }, Fs = {
  key: 1,
  class: "new-column-composer"
}, Os = { class: "composer-actions" }, zs = ["onClick"], Ws = /* @__PURE__ */ ke({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(v) {
    const r = v, o = I(""), l = I(!1), h = I(null), m = I(""), G = I(null), d = I(null), f = I(null), M = I(!1);
    function D() {
      M.value = !M.value;
    }
    function $(c) {
      const i = f.value;
      i && (Math.abs(c.deltaX) > Math.abs(c.deltaY) && c.deltaX !== 0 || c.deltaY !== 0 && (c.preventDefault(), i.scrollLeft += c.deltaY));
    }
    const H = I(null), A = I(null), x = I(null);
    let S = null, P = 0;
    const L = $e({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromGroup: null
    }), X = I(null), ee = I(!1);
    function K() {
      L.visible = !1, X.value = null;
    }
    function ne(c, i, p) {
      c.preventDefault(), c.stopPropagation();
      let w = c.clientX, se = c.clientY;
      w > window.innerWidth - 200 && (w = window.innerWidth - 210), se > window.innerHeight - 240 && (se = window.innerHeight - 245), L.x = w, L.y = se, L.repo = i, L.fromGroup = p, L.visible = !0, X.value = "folder", ee.value = w > window.innerWidth - 380;
    }
    async function ce() {
      const c = L.repo;
      K(), c && await oe.moveRepoToGroup(c, null);
    }
    async function E(c) {
      const i = L.repo;
      K(), i && await oe.moveRepoToGroup(i, c);
    }
    async function N() {
      const c = L.repo;
      if (K(), !!c)
        try {
          await navigator.clipboard.writeText(c.htmlUrl), ot.show({
            appName: "GitHub",
            title: C("github.myRepos.copiedUrlTitle"),
            message: C("github.myRepos.copiedUrlMsg", { name: c.name })
          });
        } catch {
        }
    }
    async function F() {
      const c = L.repo;
      if (K(), !!c)
        try {
          const i = `git clone ${c.htmlUrl}.git`;
          await navigator.clipboard.writeText(i), ot.show({
            appName: "GitHub",
            title: C("github.myRepos.copiedCloneTitle"),
            message: i
          });
        } catch {
        }
    }
    function q() {
      const c = L.repo;
      K(), c && We(c.htmlUrl);
    }
    function ae() {
      const c = L.repo;
      K(), c && ft.open({
        fullName: c.fullName,
        description: c.description || "",
        stars: c.stargazersCount,
        language: c.language || void 0,
        updated: c.pushedAt
      });
    }
    function ie(c) {
      c.target?.closest(".gh-repo-context-menu") || L.visible && K();
    }
    function Y(c) {
      c.key === "Escape" && L.visible && K();
    }
    const k = te(() => T.customGroups), Q = te(() => {
      const c = T.searchQuery.trim().toLowerCase();
      return c ? T.repos.filter(
        (i) => i.name.toLowerCase().includes(c) || i.description.toLowerCase().includes(c) || i.localGroups.some((p) => p.toLowerCase().includes(c)) || i.topics.some((p) => p.toLowerCase().includes(c)) || i.language && i.language.toLowerCase().includes(c)
      ) : T.repos;
    }), ue = te(() => Q.value.filter((c) => !c.localGroups.length));
    function ge(c) {
      return Q.value.filter((i) => i.localGroups.includes(c));
    }
    async function Ge() {
      const c = o.value.trim();
      if (!c) return;
      await oe.createGroup(c) && (o.value = "", l.value = !1);
    }
    function Ue(c) {
      G.value = c, m.value = c, h.value = null;
    }
    async function me(c) {
      const i = m.value.trim();
      if (!i || i === c) {
        G.value = null;
        return;
      }
      await oe.renameGroup(c, i) && (G.value = null);
    }
    async function Pe(c) {
      h.value = null, await oe.deleteGroup(c);
    }
    async function b(c, i) {
      await oe.removeRepoFromGroup(c, i);
    }
    function u(c) {
      const i = d.value;
      if (!i) return;
      const w = c.target?.closest(".column-cards-scroll");
      if (w && w.scrollHeight > w.clientHeight && !c.shiftKey && c.deltaX === 0) {
        const se = w.scrollTop <= 0 && c.deltaY < 0, it = w.scrollTop + w.clientHeight >= w.scrollHeight - 1 && c.deltaY > 0;
        if (!se && !it)
          return;
      }
      Math.abs(c.deltaX) > Math.abs(c.deltaY) && c.deltaX !== 0 || c.deltaY !== 0 && (c.preventDefault(), i.scrollLeft += c.deltaY);
    }
    function g(c) {
      if (!H.value || !d.value) return;
      c.preventDefault();
      const i = c.deltaX !== 0 ? c.deltaX : c.deltaY;
      d.value.scrollLeft += i;
    }
    function _() {
      if (S !== null) return;
      const c = () => {
        d.value && P !== 0 ? (d.value.scrollLeft += P, S = requestAnimationFrame(c)) : W();
      };
      S = requestAnimationFrame(c);
    }
    function W() {
      S !== null && (cancelAnimationFrame(S), S = null), P = 0;
    }
    function pe(c) {
      if (!H.value || !d.value) return;
      const i = d.value.getBoundingClientRect(), p = 100;
      if (c > i.right - p) {
        const w = Math.min(1, Math.max(0.1, (c - (i.right - p)) / p));
        P = Math.round(w * 20), _();
      } else if (c < i.left + p) {
        const w = Math.min(1, Math.max(0.1, (i.left + p - c) / p));
        P = -Math.round(w * 20), _();
      } else
        W();
    }
    function Oe(c) {
      H.value && (c.preventDefault(), pe(c.clientX));
    }
    function Ke(c, i, p) {
      K(), H.value = i, A.value = p, c.dataTransfer && (c.dataTransfer.effectAllowed = "move", c.dataTransfer.setData("text/plain", `${i.id}:${p}`)), window.addEventListener("wheel", g, { passive: !1 });
    }
    function ze() {
      H.value = null, A.value = null, x.value = null, W(), window.removeEventListener("wheel", g);
    }
    function Qe(c, i) {
      H.value && (c.preventDefault(), c.dataTransfer && (c.dataTransfer.dropEffect = "move"), x.value = i, pe(c.clientX));
    }
    function Xe(c, i) {
      const p = c.currentTarget, w = c.relatedTarget;
      p?.contains(w) || x.value === i && (x.value = null);
    }
    async function Je(c, i) {
      c.preventDefault();
      const p = H.value, w = A.value;
      ze(), p && (i === "default" ? w && w !== "default" ? await oe.removeRepoFromGroup(p, w) : await oe.moveRepoToGroup(p, null) : (await oe.addRepoToGroup(p, i), w && w !== "default" && w !== i && await oe.removeRepoFromGroup(p, w)));
    }
    function We(c) {
      window.open(c, "_blank", "noopener,noreferrer");
    }
    function Ze(c) {
      if (!c) return "";
      try {
        const i = new Date(c);
        return `${i.getFullYear()}-${String(i.getMonth() + 1).padStart(2, "0")}-${String(i.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return _e(
      () => r.active,
      (c) => {
        K(), c && oe.load();
      }
    ), je(() => {
      window.addEventListener("pointerdown", ie), window.addEventListener("keydown", Y), oe.load();
    }), Fe(() => {
      W(), window.removeEventListener("wheel", g), window.removeEventListener("pointerdown", ie), window.removeEventListener("keydown", Y);
    }), (c, i) => (s(), n("div", Ft, [
      t(T).errorMessage ? (s(), n("div", Ot, [
        e("span", null, "⚠️ " + a(t(T).errorMessage), 1),
        e("button", {
          type: "button",
          class: "btn-retry",
          onClick: i[0] || (i[0] = (p) => t(oe).load(!0))
        }, "重试")
      ])) : R("", !0),
      e("section", {
        class: j(["default-shelf-area", { "is-collapsed": M.value, "drop-active": x.value === "default" }]),
        onDragover: i[4] || (i[4] = (p) => Qe(p, "default")),
        onDragleave: i[5] || (i[5] = (p) => Xe(p, "default")),
        onDrop: i[6] || (i[6] = (p) => Je(p, "default"))
      }, [
        e("header", zt, [
          e("div", Wt, [
            i[23] || (i[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            i[24] || (i[24] = e("span", { class: "shelf-title" }, "未分类仓库", -1)),
            e("span", Bt, a(ue.value.length), 1),
            i[25] || (i[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）", -1))
          ]),
          e("div", Yt, [
            e("div", Vt, [
              i[26] || (i[26] = e("span", { class: "search-icon" }, "🔍", -1)),
              re(e("input", {
                "onUpdate:modelValue": i[1] || (i[1] = (p) => t(T).searchQuery = p),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索我的仓库名称、简介或语言…"
              }, null, 512), [
                [we, t(T).searchQuery]
              ]),
              t(T).searchQuery ? (s(), n("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: i[2] || (i[2] = (p) => t(T).searchQuery = "")
              }, "✕")) : R("", !0)
            ]),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              disabled: t(T).loading,
              title: t(C)("github.myRepos.refreshBtnTitle"),
              onClick: i[3] || (i[3] = (p) => t(oe).load(!0))
            }, [
              e("span", {
                class: j({ spinning: t(T).loading })
              }, "🔄", 2),
              e("span", null, a(t(T).loading ? t(C)("github.myRepos.refreshing") : t(C)("common.refresh")), 1)
            ], 8, qt),
            ue.value.length ? (s(), n("button", {
              key: 0,
              type: "button",
              class: "shelf-toggle-btn",
              title: M.value ? t(C)("github.myRepos.expandShelf") : t(C)("github.myRepos.collapseShelf"),
              onClick: D
            }, a(M.value ? t(C)("github.myRepos.expandBtn") : t(C)("github.myRepos.collapseBtn")), 9, Kt)) : R("", !0)
          ])
        ]),
        ue.value.length ? re((s(), n("div", {
          key: 0,
          ref_key: "shelfScrollRef",
          ref: f,
          class: "shelf-cards-scroll",
          onWheel: $
        }, [
          (s(!0), n(z, null, B(ue.value, (p) => (s(), n("div", {
            key: p.id,
            class: j(["repo-card shelf-card", { "card-dragging": H.value?.id === p.id }]),
            draggable: "true",
            onDragstart: (w) => Ke(w, p, "default"),
            onDragend: ze,
            onContextmenu: (w) => ne(w, p, "default")
          }, [
            e("div", Xt, [
              e("span", {
                class: "repo-name",
                title: p.fullName,
                onClick: (w) => We(p.htmlUrl)
              }, a(p.name), 9, Jt),
              p.isPrivate ? (s(), n("span", Zt, "私有")) : R("", !0),
              p.isFork ? (s(), n("span", es, "Fork")) : R("", !0)
            ]),
            p.description ? (s(), n("p", {
              key: 0,
              class: "repo-desc",
              title: p.description
            }, a(p.description), 9, ts)) : R("", !0),
            p.topics.length ? (s(), n("div", ss, [
              (s(!0), n(z, null, B(p.topics, (w) => (s(), n("span", {
                key: w,
                class: "topic-chip-tag",
                title: "GitHub 远端引流标签"
              }, " #" + a(w), 1))), 128))
            ])) : R("", !0),
            e("div", os, [
              e("div", ns, [
                p.language ? (s(), n("span", as, [
                  i[27] || (i[27] = e("span", { class: "lang-color" }, null, -1)),
                  le(a(p.language), 1)
                ])) : R("", !0),
                e("span", ls, "⭐ " + a(p.stargazersCount), 1),
                p.forksCount ? (s(), n("span", is, "🍴 " + a(p.forksCount), 1)) : R("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + p.updatedAt
              }, a(Ze(p.pushedAt || p.updatedAt)), 9, rs)
            ])
          ], 42, Qt))), 128))
        ], 544)), [
          [Ie, !M.value]
        ]) : R("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: d,
        class: "board-viewport",
        onWheel: u,
        onDragover: Oe
      }, [
        e("div", cs, [
          (s(!0), n(z, null, B(k.value, (p) => (s(), n("section", {
            key: p,
            class: j(["board-column topic-column", { "drop-active": x.value === p }]),
            onDragover: (w) => Qe(w, p),
            onDragleave: (w) => Xe(w, p),
            onDrop: (w) => Je(w, p)
          }, [
            e("header", ds, [
              G.value !== p ? (s(), n("div", ps, [
                i[28] || (i[28] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "自定义分组: " + p
                }, " 📁 " + a(p), 9, hs),
                e("span", gs, a(ge(p).length), 1)
              ])) : (s(), n("div", ms, [
                re(e("input", {
                  "onUpdate:modelValue": i[7] || (i[7] = (w) => m.value = w),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    Ee((w) => me(p), ["enter"]),
                    i[8] || (i[8] = Ee((w) => G.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, fs), [
                  [we, m.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (w) => me(p)
                }, "✓", 8, bs),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: i[9] || (i[9] = (w) => G.value = null)
                }, "✕")
              ])),
              e("div", vs, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "分组操作",
                  onClick: (w) => h.value = h.value === p ? null : p
                }, "•••", 8, ys),
                h.value === p ? (s(), n("div", ws, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (w) => Ue(p)
                  }, " 重命名分组 ", 8, _s),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (w) => Pe(p)
                  }, " 删除分组 ", 8, ks)
                ])) : R("", !0)
              ])
            ]),
            e("div", $s, [
              (s(!0), n(z, null, B(ge(p), (w) => (s(), n("div", {
                key: w.id,
                class: j(["repo-card", { "card-dragging": H.value?.id === w.id }]),
                draggable: "true",
                onDragstart: (se) => Ke(se, w, p),
                onDragend: ze,
                onContextmenu: (se) => ne(se, w, p)
              }, [
                e("div", Gs, [
                  e("span", {
                    class: "repo-name",
                    title: w.fullName,
                    onClick: (se) => We(w.htmlUrl)
                  }, a(w.name), 9, Ts),
                  w.isPrivate ? (s(), n("span", Rs, "私有")) : R("", !0),
                  w.isFork ? (s(), n("span", Ss, "Fork")) : R("", !0)
                ]),
                w.description ? (s(), n("p", {
                  key: 0,
                  class: "repo-desc",
                  title: w.description
                }, a(w.description), 9, Ms)) : R("", !0),
                e("div", As, [
                  e("span", xs, [
                    le(" 📁 " + a(p) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从该分组移出",
                      onClick: J((se) => b(w, p), ["stop"])
                    }, "✕", 8, Ls)
                  ]),
                  (s(!0), n(z, null, B(w.topics, (se) => (s(), n("span", {
                    key: se,
                    class: "topic-chip-tag",
                    title: "GitHub 远端引流标签"
                  }, " #" + a(se), 1))), 128))
                ]),
                e("div", Ds, [
                  e("div", Hs, [
                    w.language ? (s(), n("span", Us, [
                      i[29] || (i[29] = e("span", { class: "lang-color" }, null, -1)),
                      le(a(w.language), 1)
                    ])) : R("", !0),
                    e("span", Ps, "⭐ " + a(w.stargazersCount), 1),
                    w.forksCount ? (s(), n("span", Es, "🍴 " + a(w.forksCount), 1)) : R("", !0)
                  ]),
                  e("span", Is, a(Ze(w.pushedAt || w.updatedAt)), 1)
                ])
              ], 42, Cs))), 128)),
              ge(p).length ? R("", !0) : (s(), n("div", Ns, [...i[30] || (i[30] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, us))), 128)),
          e("section", js, [
            l.value ? (s(), n("div", Fs, [
              i[32] || (i[32] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建分组板块"),
                e("small", null, "支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics")
              ], -1)),
              re(e("input", {
                "onUpdate:modelValue": i[11] || (i[11] = (p) => o.value = p),
                type: "text",
                placeholder: "输入分组名称（如：前端工具、深度学习）",
                class: "composer-input",
                onKeydown: [
                  Ee(Ge, ["enter"]),
                  i[12] || (i[12] = Ee((p) => l.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [we, o.value]
              ]),
              e("div", Os, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: Ge
                }, "创建"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: i[13] || (i[13] = (p) => l.value = !1)
                }, a(t(C)("common.cancel")), 1)
              ])
            ])) : (s(), n("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: i[10] || (i[10] = (p) => l.value = !0)
            }, [...i[31] || (i[31] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建分组板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (s(), de(Ve, { to: "body" }, [
        L.visible && L.repo ? (s(), n("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: qe({ left: `${L.x}px`, top: `${L.y}px` }),
          onClick: i[21] || (i[21] = J(() => {
          }, ["stop"])),
          onContextmenu: i[22] || (i[22] = J(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: j(["gh-menu-has-sub", { "is-active": X.value === "folder" }]),
            onMouseenter: i[16] || (i[16] = (p) => X.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: i[14] || (i[14] = J((p) => X.value = X.value === "folder" ? null : "folder", ["stop"]))
            }, [...i[33] || (i[33] = [
              e("span", null, "移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: j(["gh-sub-flyout", { "flyout-left": ee.value }]),
              onClick: i[15] || (i[15] = J(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: j(["fo-cover-menu-item", { primary: !L.repo.localGroups.length }]),
                type: "button",
                onClick: ce
              }, a(L.repo.localGroups.length ? "  " : "✓ ") + "设为未分类 ", 3),
              (s(!0), n(z, null, B(k.value, (p) => (s(), n("button", {
                key: p,
                class: j(["fo-cover-menu-item", { primary: L.repo.localGroups.includes(p) }]),
                type: "button",
                onClick: (w) => E(p)
              }, a(L.repo.localGroups.includes(p) ? "✓ " : "  ") + "📁 " + a(p), 11, zs))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: i[17] || (i[17] = (p) => X.value = null),
            onClick: N
          }, a(t(C)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: i[18] || (i[18] = (p) => X.value = null),
            onClick: F
          }, a(t(C)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: i[19] || (i[19] = (p) => X.value = null),
            onClick: ae
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: i[20] || (i[20] = (p) => X.value = null),
            onClick: q
          }, a(t(C)("github.myRepos.openInGitHub")), 33)
        ], 36)) : R("", !0)
      ]))
    ]));
  }
}), Bs = /* @__PURE__ */ Ce(Ws, [["__scopeId", "data-v-f77c8971"]]), Z = $e({
  uncatPage: 1,
  pageSize: 10,
  searchQuery: ""
});
class ye {
  static getInstance() {
    return ye.instance || (ye.instance = new ye()), ye.instance;
  }
  nextUncatPage() {
    this.uncatPage < this.uncatTotalPages && Z.uncatPage++;
  }
  prevUncatPage() {
    Z.uncatPage > 1 && Z.uncatPage--;
  }
  setUncatPage(r) {
    const o = Math.max(1, Math.min(r, this.uncatTotalPages));
    Z.uncatPage = o;
  }
  get uncatPage() {
    return Z.uncatPage;
  }
  get uncatTotalPages() {
    const r = this.filteredUncatRepos.length;
    return Math.max(1, Math.ceil(r / Z.pageSize));
  }
  /**
   * 未分类的所有 Star 仓库（带搜索过滤）
   */
  get filteredUncatRepos() {
    const r = Z.searchQuery.trim().toLowerCase(), o = xe.repos.filter((l) => Ne(l.full_name).length === 0);
    return r ? o.filter(
      (l) => l.full_name.toLowerCase().includes(r) || l.description && l.description.toLowerCase().includes(r) || l.language && l.language.toLowerCase().includes(r) || l.topics && l.topics.some((h) => h.toLowerCase().includes(r))
    ) : o;
  }
  /**
   * 当前页切片的 10 个未分类 Star 仓库
   */
  get pagedUncatRepos() {
    const r = this.filteredUncatRepos, l = (Math.min(Z.uncatPage, this.uncatTotalPages) - 1) * Z.pageSize;
    return r.slice(l, l + Z.pageSize);
  }
  /**
   * 各个 GitHub 原生 Lists 板块列表
   */
  get lists() {
    return xe.lists;
  }
  /**
   * 获取归属于指定 GitHub List 的 Star 仓库（带搜索过滤）
   */
  getReposForList(r) {
    const o = Z.searchQuery.trim().toLowerCase(), l = xe.repos.filter((h) => Ne(h.full_name).includes(r));
    return o ? l.filter(
      (h) => h.full_name.toLowerCase().includes(o) || h.description && h.description.toLowerCase().includes(o) || h.language && h.language.toLowerCase().includes(o) || h.topics && h.topics.some((m) => m.toLowerCase().includes(o))
    ) : l;
  }
  /**
   * 拖拽归入指定 List（若 target 为 'uncategorized' 则从所有 List 移出）
   */
  async moveRepoToList(r, o) {
    await V.dropRepositoryIntoFolder(r, o);
  }
  /**
   * 从指定 List 移出仓库
   */
  async removeRepoFromList(r, o) {
    await V.toggleRepoList(r, o);
  }
}
const O = ye.getInstance(), Ys = { class: "stars-board-workspace" }, Vs = ["data-gh-list-drop"], qs = { class: "shelf-header" }, Ks = { class: "shelf-left" }, Qs = { class: "shelf-badge" }, Xs = { class: "shelf-right" }, Js = { class: "shelf-search-wrap" }, Zs = {
  key: 0,
  class: "shelf-pager"
}, eo = ["disabled"], to = { class: "pager-text" }, so = ["disabled"], oo = ["disabled", "aria-busy"], no = ["title"], ao = {
  key: 0,
  class: "shelf-cards-scroll"
}, lo = ["onClick", "onDragstart", "onContextmenu"], io = ["onClick"], ro = { class: "gh-card-head" }, co = ["src"], uo = ["href", "title"], po = { class: "owner" }, ho = { class: "gh-card-body" }, go = { class: "gh-card-badges" }, mo = ["title"], fo = ["title"], bo = ["title"], vo = { class: "meta" }, yo = { class: "gh-stars" }, wo = {
  key: 0,
  class: "gh-lang"
}, _o = { class: "gh-updated" }, ko = { class: "shelf-next-content" }, $o = { class: "shelf-next-sub" }, Co = {
  key: 2,
  class: "shelf-empty",
  role: "status"
}, Go = {
  key: 0,
  class: "board-columns-track"
}, To = { class: "column-cards-scroll" }, Ro = {
  key: 1,
  class: "board-columns-track"
}, So = ["data-gh-list-drop", "onDragover", "onDragleave", "onDrop"], Mo = { class: "column-header" }, Ao = { class: "column-title-group" }, xo = ["title"], Lo = { class: "badge-count" }, Do = { class: "column-actions" }, Ho = ["onClick"], Uo = { class: "column-cards-scroll" }, Po = ["onClick", "onDragstart", "onContextmenu"], Eo = ["onClick"], Io = { class: "gh-card-head" }, No = ["src"], jo = ["href", "title"], Fo = { class: "owner" }, Oo = { class: "gh-card-body" }, zo = { class: "gh-card-badges" }, Wo = ["title"], Bo = ["onClick"], Yo = ["title"], Vo = ["title"], qo = ["title"], Ko = { class: "meta" }, Qo = { class: "gh-stars" }, Xo = {
  key: 0,
  class: "gh-lang"
}, Jo = { class: "gh-updated" }, Zo = {
  key: 0,
  class: "empty-column-dropzone"
}, en = { class: "board-column add-column-panel" }, tn = ["onClick"], sn = /* @__PURE__ */ ke({
  __name: "GitHubStarsBoard",
  props: {
    active: { type: Boolean }
  },
  setup(v) {
    const r = v, o = I(null), l = I(null), h = I(!1);
    function m() {
      h.value = !h.value;
    }
    function G(b) {
      const u = l.value;
      u && (Math.abs(b.deltaX) > Math.abs(b.deltaY) && b.deltaX !== 0 || b.deltaY !== 0 && (b.preventDefault(), u.scrollLeft += b.deltaY));
    }
    const d = te(() => xe.loading), f = te(() => d.value && !xe.repos.length), M = I(null), D = I(null), $ = I(null);
    let H = null, A = 0;
    function x() {
      H === null && (H = window.setInterval(() => {
        !o.value || A === 0 || (o.value.scrollLeft += A);
      }, 16));
    }
    function S() {
      H !== null && (clearInterval(H), H = null), A = 0;
    }
    const P = $e({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromList: null
    }), L = I(null), X = I(!1);
    function ee() {
      P.visible = !1, P.repo = null, P.fromList = null, L.value = null;
    }
    function K(b, u, g) {
      b.preventDefault(), b.stopPropagation();
      const _ = 190, W = 220, pe = Math.min(b.clientX, window.innerWidth - _ - 10), Oe = Math.min(b.clientY, window.innerHeight - W - 10);
      P.x = pe, P.y = Oe, P.repo = u, P.fromList = g, P.visible = !0, L.value = "folder", X.value = pe > window.innerWidth - 380;
    }
    async function ne() {
      const b = P.repo;
      ee(), b && await O.moveRepoToList(b.full_name, V.UNCAT);
    }
    async function ce(b) {
      const u = P.repo;
      ee(), u && await O.moveRepoToList(u.full_name, b);
    }
    async function E() {
      const b = P.repo;
      if (ee(), !!b?.html_url)
        try {
          await navigator.clipboard.writeText(b.html_url);
        } catch {
        }
    }
    async function N() {
      const b = P.repo;
      if (ee(), !!b?.full_name)
        try {
          await navigator.clipboard.writeText(`git clone https://github.com/${b.full_name}.git`);
        } catch {
        }
    }
    function F(b) {
      const u = b.target;
      !u?.closest(".fo-cover-context-menu") && !u?.closest(".col-popover-menu") && ee();
    }
    function q(b) {
      b.key === "Escape" && ee();
    }
    function ae(b) {
      const u = o.value;
      if (!u) return;
      const _ = b.target?.closest(".column-cards-scroll");
      if (_ && _.scrollHeight > _.clientHeight && !b.shiftKey && b.deltaX === 0) {
        const W = _.scrollTop === 0 && b.deltaY < 0, pe = Math.ceil(_.scrollTop + _.clientHeight) >= _.scrollHeight && b.deltaY > 0;
        if (!W && !pe)
          return;
      }
      Math.abs(b.deltaX) > Math.abs(b.deltaY) && b.deltaX !== 0 || b.deltaY !== 0 && (b.preventDefault(), u.scrollLeft += b.deltaY);
    }
    function ie(b) {
      if (!M.value || !o.value) return;
      b.preventDefault();
      const u = b.deltaY !== 0 ? b.deltaY : b.deltaX;
      o.value.scrollLeft += u;
    }
    function Y(b) {
      const u = o.value;
      if (!u) return;
      const g = u.getBoundingClientRect(), _ = 100;
      if (b > g.right - _) {
        const W = Math.min(1, Math.max(0.1, (b - (g.right - _)) / _));
        A = Math.round(W * 20), x();
      } else if (b < g.left + _) {
        const W = Math.min(1, Math.max(0.1, (g.left + _ - b) / _));
        A = -Math.round(W * 20), x();
      } else
        S();
    }
    function k(b) {
      Y(b.clientX);
    }
    function Q(b, u, g) {
      ee(), M.value = u, D.value = g, b.dataTransfer && (b.dataTransfer.effectAllowed = "move", b.dataTransfer.setData(tt, u.full_name), b.dataTransfer.setData("text/plain", `${u.full_name}:${g || "uncategorized"}`)), window.addEventListener("wheel", ie, { passive: !1 });
    }
    function ue() {
      M.value = null, D.value = null, $.value = null, S(), window.removeEventListener("wheel", ie);
    }
    function ge(b, u) {
      !r.active || !M.value && !Array.from(b.dataTransfer?.types || []).includes(tt) || (b.preventDefault(), b.dataTransfer && (b.dataTransfer.dropEffect = "move"), $.value = u);
    }
    function Ge(b, u) {
      const g = b.currentTarget;
      g && b.relatedTarget instanceof Node && g.contains(b.relatedTarget) || $.value === u && ($.value = null);
    }
    async function Ue(b, u) {
      b.preventDefault();
      const g = M.value?.full_name || pt(b.dataTransfer);
      ue(), !(!r.active || !g) && await O.moveRepoToList(g, u === "uncategorized" ? V.UNCAT : u);
    }
    function me(b) {
      ht.open(b.full_name, void 0, b);
    }
    function Pe(b) {
      if (!b) return "";
      try {
        const u = new Date(b);
        return `${u.getFullYear()}-${String(u.getMonth() + 1).padStart(2, "0")}-${String(u.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return je(() => {
      window.addEventListener("pointerdown", F), window.addEventListener("keydown", q);
    }), Fe(() => {
      S(), window.removeEventListener("wheel", ie), window.removeEventListener("pointerdown", F), window.removeEventListener("keydown", q);
    }), (b, u) => (s(), n("div", Ys, [
      e("section", {
        class: j(["default-shelf-area", { "is-collapsed": h.value, "drop-active": $.value === "uncategorized" }]),
        "data-gh-list-drop": t(V).UNCAT,
        onDragover: u[8] || (u[8] = (g) => ge(g, "uncategorized")),
        onDragleave: u[9] || (u[9] = (g) => Ge(g, "uncategorized")),
        onDrop: u[10] || (u[10] = (g) => Ue(g, "uncategorized"))
      }, [
        e("header", qs, [
          e("div", Ks, [
            u[23] || (u[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            u[24] || (u[24] = e("span", { class: "shelf-title" }, "未分类 Star 收藏", -1)),
            e("span", Qs, a(t(O).filteredUncatRepos.length), 1),
            u[25] || (u[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消列表归属；单排 10 个一页）", -1))
          ]),
          e("div", Xs, [
            e("div", Js, [
              u[26] || (u[26] = e("span", { class: "search-icon" }, "🔍", -1)),
              re(e("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (g) => t(Z).searchQuery = g),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索 Star 仓库名称、简介或语言…"
              }, null, 512), [
                [we, t(Z).searchQuery]
              ]),
              t(Z).searchQuery ? (s(), n("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: u[1] || (u[1] = (g) => t(Z).searchQuery = "")
              }, "✕")) : R("", !0)
            ]),
            t(O).filteredUncatRepos.length > t(Z).pageSize ? (s(), n("div", Zs, [
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(O).uncatPage <= 1,
                title: "上一页",
                onClick: u[2] || (u[2] = //@ts-ignore
                (...g) => t(O).prevUncatPage && t(O).prevUncatPage(...g))
              }, "‹", 8, eo),
              e("span", to, a(t(O).uncatPage) + " / " + a(t(O).uncatTotalPages) + " 页", 1),
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(O).uncatPage >= t(O).uncatTotalPages,
                title: "下一页",
                onClick: u[3] || (u[3] = //@ts-ignore
                (...g) => t(O).nextUncatPage && t(O).nextUncatPage(...g))
              }, "›", 8, so)
            ])) : R("", !0),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              title: "刷新 Star 列表",
              disabled: d.value,
              "aria-busy": d.value,
              onClick: u[4] || (u[4] = (g) => t(V).refreshRepositories())
            }, [
              e("span", {
                class: j({ spinning: d.value })
              }, "🔄", 2),
              e("span", null, a(d.value ? "读取中…" : "刷新"), 1)
            ], 8, oo),
            t(O).filteredUncatRepos.length ? (s(), n("button", {
              key: 1,
              type: "button",
              class: "shelf-toggle-btn",
              title: h.value ? "展开托盘" : "收起托盘",
              onClick: m
            }, a(h.value ? "展开 ▼" : "收起 ▲"), 9, no)) : R("", !0)
          ])
        ]),
        f.value ? re((s(), n("div", ao, [
          (s(), n(z, null, B(6, (g) => e("div", {
            key: "skel-shelf-" + g,
            class: "repo gh-card shelf-card skel-card"
          }, [...u[27] || (u[27] = [
            e("div", { class: "skel-line skel-title" }, null, -1),
            e("div", { class: "skel-line skel-desc" }, null, -1),
            e("div", { class: "skel-line skel-meta" }, null, -1)
          ])])), 64))
        ], 512)), [
          [Ie, !h.value]
        ]) : t(O).filteredUncatRepos.length ? re((s(), n("div", {
          key: 1,
          ref_key: "shelfScrollRef",
          ref: l,
          class: "shelf-cards-scroll",
          onWheel: G
        }, [
          (s(!0), n(z, null, B(t(O).pagedUncatRepos, (g) => (s(), n("article", {
            key: g.full_name,
            class: j(["repo gh-card shelf-card", { "card-dragging": M.value?.full_name === g.full_name }]),
            draggable: "true",
            onClick: (_) => me(g),
            onDragstart: (_) => Q(_, g, null),
            onDragend: ue,
            onContextmenu: (_) => K(_, g, null)
          }, [
            e("button", {
              class: "fo-card-more",
              type: "button",
              "aria-label": "更多操作",
              title: "更多操作",
              onClick: J((_) => K(_, g, null), ["stop"])
            }, "⋮", 8, io),
            e("div", ro, [
              e("img", {
                class: "gh-owner-avatar",
                src: g.owner?.avatar_url || "assets/github-star.svg",
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer",
                onError: u[5] || (u[5] = (_) => _.target.src = "assets/github-star.svg")
              }, null, 40, co),
              e("a", {
                href: g.html_url,
                target: "_blank",
                rel: "noreferrer",
                class: "name",
                title: g.full_name,
                onClick: u[6] || (u[6] = J(() => {
                }, ["stop"]))
              }, [
                e("span", po, a(g.owner?.login || g.full_name.split("/")[0]) + "/", 1),
                le(a(g.name), 1)
              ], 8, uo)
            ]),
            e("div", ho, [
              e("div", go, [
                u[28] || (u[28] = e("span", { class: "gh-badge-folder uncat" }, "＋ 未分类", -1)),
                g.topics && g.topics.length ? (s(), n(z, { key: 0 }, [
                  (s(!0), n(z, null, B(g.topics.slice(0, 2), (_) => (s(), n("span", {
                    key: _,
                    class: "gh-badge-topic-chip",
                    title: "Topic: " + _
                  }, " #" + a(_), 9, mo))), 128)),
                  g.topics.length > 2 ? (s(), n("span", {
                    key: 0,
                    class: "gh-badge-topic-chip more",
                    title: g.topics.slice(2).map((_) => "#" + _).join(" ")
                  }, " +" + a(g.topics.length - 2), 9, fo)) : R("", !0)
                ], 64)) : R("", !0)
              ]),
              e("p", {
                class: "desc",
                title: g.description || ""
              }, a(g.description || "暂无描述"), 9, bo)
            ]),
            e("div", vo, [
              e("span", yo, "★ " + a(g.stargazers_count), 1),
              g.language ? (s(), n("span", wo, a(g.language), 1)) : R("", !0),
              e("span", _o, "更新 " + a(Pe(g.updated_at)), 1)
            ])
          ], 42, lo))), 128)),
          t(O).uncatPage < t(O).uncatTotalPages ? (s(), n("div", {
            key: 0,
            class: "repo gh-card shelf-card shelf-next-card",
            title: "点击翻到下一页",
            onClick: u[7] || (u[7] = //@ts-ignore
            (...g) => t(O).nextUncatPage && t(O).nextUncatPage(...g))
          }, [
            e("div", ko, [
              u[29] || (u[29] = e("span", { class: "shelf-next-icon" }, "➔", -1)),
              u[30] || (u[30] = e("span", { class: "shelf-next-title" }, "下一页", -1)),
              e("span", $o, a(t(O).uncatPage + 1) + " / " + a(t(O).uncatTotalPages) + " 页", 1)
            ])
          ])) : R("", !0)
        ], 544)), [
          [Ie, !h.value]
        ]) : h.value ? R("", !0) : (s(), n("p", Co, a(t(Z).searchQuery ? "没有匹配的未分类仓库" : "暂无未分类 Star 仓库"), 1))
      ], 42, Vs),
      e("div", {
        ref_key: "boardViewportRef",
        ref: o,
        class: "board-viewport",
        onWheel: ae,
        onDragover: k
      }, [
        d.value && !t(O).lists.length ? (s(), n("div", Go, [
          (s(), n(z, null, B(4, (g) => e("div", {
            key: "skel-col-" + g,
            class: "board-column skel-column"
          }, [
            u[32] || (u[32] = e("div", { class: "column-header" }, [
              e("div", {
                class: "skel-line",
                style: { width: "120px", height: "16px" }
              })
            ], -1)),
            e("div", To, [
              (s(), n(z, null, B(3, (_) => e("div", {
                key: "skel-col-card-" + _,
                class: "repo gh-card skel-card"
              }, [...u[31] || (u[31] = [
                e("div", { class: "skel-line skel-title" }, null, -1),
                e("div", { class: "skel-line skel-desc" }, null, -1),
                e("div", { class: "skel-line skel-meta" }, null, -1)
              ])])), 64))
            ])
          ])), 64))
        ])) : (s(), n("div", Ro, [
          (s(!0), n(z, null, B(t(O).lists, (g) => (s(), n("section", {
            key: g.id,
            class: j(["board-column list-column", { "drop-active": $.value === g.name }]),
            "data-gh-list-drop": g.name,
            onDragover: (_) => ge(_, g.name),
            onDragleave: (_) => Ge(_, g.name),
            onDrop: (_) => Ue(_, g.name)
          }, [
            e("header", Mo, [
              e("div", Ao, [
                u[33] || (u[33] = e("span", { class: "col-dot list-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: g.description || "GitHub 列表: " + g.name
                }, " 📁 " + a(g.name), 9, xo),
                e("span", Lo, a(t(O).getReposForList(g.name).length), 1)
              ]),
              e("div", Do, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "删除此 GitHub 列表",
                  onClick: (_) => t(V).deleteFolder(g.name)
                }, "✕", 8, Ho)
              ])
            ]),
            e("div", Uo, [
              (s(!0), n(z, null, B(t(O).getReposForList(g.name), (_) => (s(), n("article", {
                key: _.full_name,
                class: j(["repo gh-card", { "card-dragging": M.value?.full_name === _.full_name }]),
                draggable: "true",
                onClick: (W) => me(_),
                onDragstart: (W) => Q(W, _, g.name),
                onDragend: ue,
                onContextmenu: (W) => K(W, _, g.name)
              }, [
                e("button", {
                  class: "fo-card-more",
                  type: "button",
                  "aria-label": "更多操作",
                  title: "更多操作",
                  onClick: J((W) => K(W, _, g.name), ["stop"])
                }, "⋮", 8, Eo),
                e("div", Io, [
                  e("img", {
                    class: "gh-owner-avatar",
                    src: _.owner?.avatar_url || "assets/github-star.svg",
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer",
                    onError: u[11] || (u[11] = (W) => W.target.src = "assets/github-star.svg")
                  }, null, 40, No),
                  e("a", {
                    href: _.html_url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "name",
                    title: _.full_name,
                    onClick: u[12] || (u[12] = J(() => {
                    }, ["stop"]))
                  }, [
                    e("span", Fo, a(_.owner?.login || _.full_name.split("/")[0]) + "/", 1),
                    le(a(_.name), 1)
                  ], 8, jo)
                ]),
                e("div", Oo, [
                  e("div", zo, [
                    e("span", {
                      class: "gh-badge-folder",
                      title: "属于列表: " + g.name
                    }, [
                      le(" 📁 " + a(g.name) + " ", 1),
                      e("span", {
                        class: "btn-inline-remove",
                        title: "从该列表中移出",
                        role: "button",
                        tabindex: "0",
                        onClick: J((W) => t(O).removeRepoFromList(_.full_name, g.name), ["stop"])
                      }, "×", 8, Bo)
                    ], 8, Wo),
                    _.topics && _.topics.length ? (s(), n(z, { key: 0 }, [
                      (s(!0), n(z, null, B(_.topics.slice(0, 2), (W) => (s(), n("span", {
                        key: W,
                        class: "gh-badge-topic-chip",
                        title: "Topic: " + W
                      }, " #" + a(W), 9, Yo))), 128)),
                      _.topics.length > 2 ? (s(), n("span", {
                        key: 0,
                        class: "gh-badge-topic-chip more",
                        title: _.topics.slice(2).map((W) => "#" + W).join(" ")
                      }, " +" + a(_.topics.length - 2), 9, Vo)) : R("", !0)
                    ], 64)) : R("", !0)
                  ]),
                  e("p", {
                    class: "desc",
                    title: _.description || ""
                  }, a(_.description || "暂无描述"), 9, qo)
                ]),
                e("div", Ko, [
                  e("span", Qo, "★ " + a(_.stargazers_count), 1),
                  _.language ? (s(), n("span", Xo, a(_.language), 1)) : R("", !0),
                  e("span", Jo, "更新 " + a(Pe(_.updated_at)), 1)
                ])
              ], 42, Po))), 128)),
              t(O).getReposForList(g.name).length ? R("", !0) : (s(), n("div", Zo, [...u[34] || (u[34] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, So))), 128)),
          e("section", en, [
            e("button", {
              type: "button",
              class: "btn-trigger-add-col",
              onClick: u[13] || (u[13] = (g) => t(V).promptCreateFolder())
            }, [...u[35] || (u[35] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", null, "新建 GitHub 列表", -1)
            ])])
          ])
        ]))
      ], 544),
      (s(), de(Ve, { to: "body" }, [
        P.visible && P.repo ? (s(), n("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: qe({ left: `${P.x}px`, top: `${P.y}px` }),
          onClick: u[21] || (u[21] = J(() => {
          }, ["stop"])),
          onContextmenu: u[22] || (u[22] = J(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: j(["gh-menu-has-sub", { "is-active": L.value === "folder" }]),
            onMouseenter: u[16] || (u[16] = (g) => L.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: u[14] || (u[14] = J((g) => L.value = L.value === "folder" ? null : "folder", ["stop"]))
            }, [...u[36] || (u[36] = [
              e("span", null, "移动/加入列表", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: j(["gh-sub-flyout", { "flyout-left": X.value }]),
              onClick: u[15] || (u[15] = J(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: ne
              }, " 设为未分类 "),
              (s(!0), n(z, null, B(t(O).lists, (g) => (s(), n("button", {
                key: g.id,
                class: j(["fo-cover-menu-item", { primary: t(Ne)(P.repo.full_name).includes(g.name) }]),
                type: "button",
                onClick: (_) => ce(g.name)
              }, a(t(Ne)(P.repo.full_name).includes(g.name) ? "✓ " : "  ") + "📁 " + a(g.name), 11, tn))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: u[17] || (u[17] = (g) => L.value = null),
            onClick: u[18] || (u[18] = (g) => me(P.repo))
          }, " 查看仓库详情 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: u[19] || (u[19] = (g) => L.value = null),
            onClick: E
          }, " 复制仓库链接 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: u[20] || (u[20] = (g) => L.value = null),
            onClick: N
          }, " 复制克隆命令 (git clone) ", 32)
        ], 36)) : R("", !0)
      ]))
    ]));
  }
}), on = /* @__PURE__ */ Ce(sn, [["__scopeId", "data-v-ae4b246a"]]);
function nn(v) {
  const r = v.subject?.url, o = v.repository?.html_url || "https://github.com";
  if (!r) return o;
  const l = v.subject?.type;
  return l === "Issue" ? r.replace("https://api.github.com/repos/", "https://github.com/") : l === "PullRequest" ? r.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : l === "Release" ? r.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : r.replace("https://api.github.com/repos/", "https://github.com/");
}
function an(v) {
  try {
    const r = Date.now() - new Date(v).getTime();
    if (r < 6e4) return "刚刚";
    const o = Math.floor(r / 6e4);
    if (o < 60) return `${o} 分钟前`;
    const l = Math.floor(o / 60);
    if (l < 24) return `${l} 小时前`;
    const h = Math.floor(l / 24);
    return h < 30 ? `${h} 天前` : v.slice(5, 10);
  } catch {
    return "";
  }
}
const U = $e({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), be = {
  open() {
    U.isOpen = !0, (!U.items.length || Date.now() - U.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    U.isOpen = !1;
  },
  toggle() {
    U.isOpen ? this.close() : this.open();
  },
  setTab(v) {
    U.activeKind = v;
  },
  async refresh() {
    const v = V.token?.trim();
    if (!v) {
      U.items = [], U.unreadCount = 0, U.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    U.loading = !0, U.error = "";
    try {
      const r = {
        ...He(v),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, o = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: r
      });
      if (!o.ok)
        throw o.status === 401 ? new Error("GitHub Token 无效或已过期") : o.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${o.status})`);
      const l = await o.json();
      if (!Array.isArray(l))
        throw new Error("GitHub 返回数据异常");
      const h = l.map((m) => ({
        id: String(m.id),
        unread: !!m.unread,
        reason: String(m.reason || ""),
        updatedAt: m.updated_at,
        formattedTime: an(m.updated_at),
        subject: {
          title: String(m.subject?.title || "未命名通知"),
          url: String(m.subject?.url || ""),
          type: String(m.subject?.type || "Issue"),
          latestCommentUrl: m.subject?.latest_comment_url
        },
        repository: {
          id: Number(m.repository?.id || 0),
          name: String(m.repository?.name || ""),
          fullName: String(m.repository?.full_name || ""),
          owner: {
            login: String(m.repository?.owner?.login || ""),
            avatarUrl: m.repository?.owner?.avatar_url
          },
          htmlUrl: String(m.repository?.html_url || "")
        },
        url: String(m.url || ""),
        htmlUrl: nn(m)
      }));
      U.items = h, U.unreadCount = h.filter((m) => m.unread).length, U.lastFetchedAt = Date.now();
    } catch (r) {
      console.warn("[GitHubNotifications] 读取失败:", r), U.error = r?.message || "网络请求异常";
    } finally {
      U.loading = !1;
    }
  },
  openTarget(v) {
    typeof window < "u" && window.open(v.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, y = $e({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function Le(v) {
  try {
    const r = Date.now() - new Date(v).getTime(), o = Math.floor(r / 6e4);
    if (o < 1) return "刚刚";
    if (o < 60) return `${o}分钟前`;
    const l = Math.floor(o / 60);
    if (l < 24) return `${l}小时前`;
    const h = Math.floor(l / 24);
    if (h < 30) return `${h}天前`;
    const m = new Date(v);
    return `${m.getFullYear()}/${m.getMonth() + 1}/${m.getDate()}`;
  } catch {
    return "";
  }
}
function De(v) {
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
function ln(v) {
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
function Be(v) {
  if (!Array.isArray(v)) return [];
  const r = {
    THUMBS_UP: "👍",
    THUMBS_DOWN: "👎",
    LAUGH: "😄",
    HOORAY: "🎉",
    CONFUSED: "😕",
    HEART: "❤️",
    ROCKET: "🚀",
    EYES: "👀"
  };
  return v.map((o) => ({
    emoji: r[o.content] || o.content,
    count: o.reactors?.totalCount || o.users?.totalCount || 0
  })).filter((o) => o.count > 0);
}
function nt(v) {
  if (!v || typeof v != "object") return [];
  const r = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, o = [];
  for (const [l, h] of Object.entries(r)) {
    const m = Number(v[l] || 0);
    m > 0 && o.push({ emoji: h, count: m });
  }
  return o;
}
async function at(v, r) {
  if (!v) return "";
  try {
    const o = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...He(r),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: v, mode: "gfm" })
    });
    if (o.ok)
      return await o.text();
  } catch {
  }
  return he.renderMarkdown(v);
}
async function rn(v, r, o, l) {
  const h = `
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
    const m = await fetch("https://api.github.com/graphql", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...He(l),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: h,
        variables: { owner: v, name: r, num: o }
      })
    });
    if (!m.ok) return null;
    const d = (await m.json())?.data?.repository?.discussion;
    if (!d) return null;
    let f = 0;
    const M = (d.comments?.nodes || []).map((H) => {
      const A = H.replies?.nodes || [];
      f += A.length;
      const x = A.map((S) => ({
        id: S.id,
        author: {
          login: S.author?.login || "匿名",
          avatarUrl: S.author?.avatarUrl || "",
          association: De(S.authorAssociation)
        },
        createdAt: S.createdAt,
        formattedTime: Le(S.createdAt),
        body: S.body || "",
        bodyHtml: S.bodyHTML || (S.body ? he.renderMarkdown(S.body) : ""),
        reactions: Be(S.reactionGroups)
      }));
      return {
        id: H.id,
        author: {
          login: H.author?.login || "匿名",
          avatarUrl: H.author?.avatarUrl || "",
          association: De(H.authorAssociation)
        },
        createdAt: H.createdAt,
        formattedTime: Le(H.createdAt),
        body: H.body || "",
        bodyHtml: H.bodyHTML || (H.body ? he.renderMarkdown(H.body) : "<p>（评论内容为空）</p>"),
        reactions: Be(H.reactionGroups),
        replies: x
      };
    }), D = d.body || "", $ = d.bodyHTML && d.bodyHTML.trim().length > 10 ? d.bodyHTML : D ? he.renderMarkdown(D) : "<p>（主贴内容为空）</p>";
    return {
      title: d.title,
      number: o,
      state: "discussion",
      category: d.category ? {
        name: d.category.name,
        emoji: ln(d.category.emoji)
      } : void 0,
      author: {
        login: d.author?.login || "未知",
        avatarUrl: d.author?.avatarUrl || "",
        association: De(d.authorAssociation)
      },
      createdAt: d.createdAt,
      formattedTime: Le(d.createdAt),
      body: D,
      bodyHtml: $,
      htmlUrl: d.url,
      commentsCount: d.comments?.totalCount || M.length,
      totalRepliesCount: f,
      comments: M,
      reactions: Be(d.reactionGroups)
    };
  } catch {
    return null;
  }
}
const Ye = {
  async open(v) {
    y.isOpen = !0, y.loading = !0, y.error = "", y.data = null, y.notificationItem = v;
    const r = V.token?.trim() || "", o = {
      ...He(r),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const l = v.subject?.url, h = v.subject?.type, m = v.repository?.fullName || "", [G, d] = m.split("/"), f = l?.match(/\/(\d+)$/), M = f ? Number(f[1]) : void 0;
      if (h === "Discussion" && G && d && M) {
        const D = await rn(G, d, M, r);
        if (D) {
          y.data = {
            notificationId: v.id,
            title: D.title || v.subject.title,
            number: M,
            state: "discussion",
            category: D.category,
            author: D.author || { login: v.repository.owner.login, avatarUrl: v.repository.owner.avatarUrl || "" },
            createdAt: D.createdAt || v.updatedAt,
            formattedTime: D.formattedTime || v.formattedTime,
            body: D.body || "",
            bodyHtml: D.bodyHtml || (D.body ? he.renderMarkdown(D.body) : ""),
            htmlUrl: D.htmlUrl || v.htmlUrl,
            commentsCount: D.commentsCount || 0,
            totalRepliesCount: D.totalRepliesCount || 0,
            comments: D.comments || [],
            reactions: D.reactions || [],
            repositoryFullName: m,
            type: "Discussion"
          };
          return;
        }
      }
      if (l) {
        const D = await fetch(l, { headers: o, cache: "no-store" });
        if (D.ok) {
          const $ = await D.json();
          let H = [];
          if ($.comments_url && $.comments > 0)
            try {
              const S = await fetch(`${$.comments_url}?per_page=50`, { headers: o, cache: "no-store" });
              if (S.ok) {
                const P = await S.json();
                Array.isArray(P) && (H = await Promise.all(
                  P.map(async (L) => {
                    const X = L.body_html || (L.body ? await at(L.body, r) : "");
                    return {
                      id: L.id,
                      author: {
                        login: L.user?.login || "匿名",
                        avatarUrl: L.user?.avatar_url || "",
                        association: De(L.author_association)
                      },
                      createdAt: L.created_at,
                      formattedTime: Le(L.created_at),
                      body: L.body || "",
                      bodyHtml: X,
                      reactions: nt(L.reactions)
                    };
                  })
                ));
              }
            } catch (S) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", S);
            }
          const A = $.body || "";
          let x = $.body_html || "";
          !x && A && (x = await at(A, r)), !x && A && (x = he.renderMarkdown(A)), y.data = {
            notificationId: v.id,
            title: $.title || $.name || v.subject.title,
            number: $.number || M,
            state: $.merged ? "merged" : $.state || $.conclusion || "open",
            author: {
              login: $.user?.login || $.author?.login || v.repository.owner.login,
              avatarUrl: $.user?.avatar_url || $.author?.avatar_url || v.repository.owner.avatarUrl || "",
              association: De($.author_association)
            },
            createdAt: $.created_at || $.published_at || v.updatedAt,
            formattedTime: Le($.created_at || $.published_at || v.updatedAt),
            body: A,
            bodyHtml: x || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: $.html_url || v.htmlUrl,
            commentsCount: typeof $.comments == "number" ? $.comments : H.length,
            comments: H,
            reactions: nt($.reactions),
            repositoryFullName: m,
            type: h || "Issue"
          };
          return;
        }
      }
      y.data = {
        notificationId: v.id,
        title: v.subject.title,
        number: M,
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
        repositoryFullName: m,
        type: h || "通知"
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
}, cn = { class: "vue-gh-notification-panel-wrapper" }, un = { class: "gh-msg-header" }, dn = { class: "gh-msg-account" }, pn = { class: "gh-msg-subtitle" }, hn = {
  class: "gh-msg-tabs",
  role: "tablist"
}, gn = ["onClick"], mn = { class: "gh-msg-list" }, fn = {
  key: 0,
  class: "gh-msg-loading"
}, bn = {
  key: 1,
  class: "gh-msg-error"
}, vn = {
  key: 2,
  class: "gh-msg-empty"
}, yn = ["onClick"], wn = { class: "gh-card-indicator-col" }, _n = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, kn = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, $n = { class: "gh-card-type-col" }, Cn = ["title"], Gn = { class: "gh-card-main-col" }, Tn = { class: "gh-card-repo-row" }, Rn = ["title"], Sn = { class: "gh-card-reason-tag" }, Mn = { class: "gh-card-time" }, An = ["title"], xn = { class: "gh-card-footer-row" }, Ln = { class: "gh-card-type-label" }, Dn = ["onClick"], Hn = /* @__PURE__ */ ke({
  __name: "GitHubNotificationPanel",
  setup(v) {
    const r = I(null), o = te(() => [
      { kind: "all", label: "所有", count: U.items.length },
      { kind: "unread", label: "未读", count: U.items.filter((A) => A.unread).length },
      { kind: "mention", label: "提及", count: U.items.filter((A) => A.reason === "mention").length },
      { kind: "author", label: "作者", count: U.items.filter((A) => A.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: U.items.filter((A) => A.reason === "ci_activity" || A.subject.type === "CheckSuite").length }
    ]), l = te(() => {
      const A = U.items;
      switch (U.activeKind) {
        case "unread":
          return A.filter((x) => x.unread);
        case "mention":
          return A.filter((x) => x.reason === "mention");
        case "author":
          return A.filter((x) => x.reason === "author");
        case "ci":
          return A.filter((x) => x.reason === "ci_activity" || x.subject.type === "CheckSuite");
        default:
          return A;
      }
    });
    function h(A, x) {
      if (x === "ci_activity" || A === "CheckSuite")
        return "⚡";
      switch (A) {
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
    function m(A) {
      switch (A) {
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
          return A || "通知";
      }
    }
    function G() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function d() {
      be.refresh();
    }
    function f() {
      be.close();
    }
    function M(A) {
      Ye.open(A);
    }
    function D(A) {
      be.openTarget(A);
    }
    function $(A) {
      if (!U.isOpen) return;
      const x = A.target;
      !r.value?.contains(x) && !x?.closest("#gh-header-msg-center-btn") && be.close();
    }
    function H(A) {
      A.key === "Escape" && U.isOpen && be.close();
    }
    return je(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", $), window.addEventListener("keydown", H));
    }), Fe(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", $), window.removeEventListener("keydown", H));
    }), (A, x) => (s(), n("div", cn, [
      t(U).isOpen ? (s(), n("section", {
        key: 0,
        ref_key: "panelRef",
        ref: r,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: x[0] || (x[0] = J(() => {
        }, ["stop"]))
      }, [
        e("header", un, [
          e("div", dn, [
            x[2] || (x[2] = e("div", { class: "gh-msg-octo-avatar" }, [
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
              x[1] || (x[1] = e("h2", { class: "gh-msg-title" }, "GitHub 消息通知", -1)),
              e("p", pn, " 共 " + a(t(U).items.length) + " 条通知 · " + a(t(U).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          x[3] || (x[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: G
          }, " ↗ "),
          e("button", {
            type: "button",
            class: j(["gh-panel-btn", { "is-spinning": t(U).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: d
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: f
          }, " ✕ ")
        ]),
        e("nav", hn, [
          (s(!0), n(z, null, B(o.value, (S) => (s(), n("button", {
            key: S.kind,
            type: "button",
            class: j(["gh-msg-tab", { active: t(U).activeKind === S.kind }]),
            onClick: (P) => t(U).activeKind = S.kind
          }, [
            le(a(S.label) + " ", 1),
            S.count > 0 ? (s(), n("span", {
              key: 0,
              class: j(["gh-tab-pill", { "is-unread-pill": S.kind === "unread" }])
            }, a(S.count), 3)) : R("", !0)
          ], 10, gn))), 128))
        ]),
        e("div", mn, [
          t(U).loading && !t(U).items.length ? (s(), n("div", fn, [...x[4] || (x[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : t(U).error ? (s(), n("div", bn, [
            x[5] || (x[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, a(t(U).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: d
            }, "重试")
          ])) : l.value.length === 0 ? (s(), n("div", vn, [...x[6] || (x[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (s(!0), n(z, { key: 3 }, B(l.value, (S) => (s(), n("article", {
            key: S.id,
            class: j(["gh-notification-card", { "is-unread": S.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (P) => M(S)
          }, [
            e("div", wn, [
              S.unread ? (s(), n("span", _n)) : (s(), n("span", kn))
            ]),
            e("div", $n, [
              e("span", {
                class: "gh-type-badge",
                title: S.subject.type
              }, a(h(S.subject.type, S.reason)), 9, Cn)
            ]),
            e("div", Gn, [
              e("div", Tn, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: S.repository.fullName
                }, a(S.repository.fullName), 9, Rn),
                e("span", Sn, a(m(S.reason)), 1),
                e("time", Mn, a(S.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: S.subject.title
              }, a(S.subject.title), 9, An),
              e("div", xn, [
                e("span", Ln, a(S.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: J((P) => D(S), ["stop"])
                }, "在网页打开 ↗", 8, Dn)
              ])
            ])
          ], 10, yn))), 128))
        ])
      ], 512)) : R("", !0)
    ]));
  }
}), Un = /* @__PURE__ */ Ce(Hn, [["__scopeId", "data-v-4271efab"]]), Pn = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, En = ["aria-label"], In = { class: "gh-modal-title-wrap" }, Nn = { class: "gh-modal-octo-icon" }, jn = ["href"], Fn = { class: "gh-owner" }, On = { class: "gh-name" }, zn = {
  key: 1,
  class: "gh-modal-repo-name"
}, Wn = { class: "gh-name" }, Bn = { class: "gh-modal-actions" }, Yn = { class: "gh-modal-content" }, Vn = {
  key: 0,
  class: "gh-content-loading"
}, qn = {
  key: 1,
  class: "gh-content-error"
}, Kn = { class: "gh-discussion-title-header" }, Qn = { class: "gh-discussion-h1" }, Xn = {
  key: 0,
  class: "gh-discussion-num"
}, Jn = { class: "gh-discussion-sub-meta" }, Zn = {
  key: 0,
  class: "gh-category-pill"
}, ea = {
  key: 0,
  class: "cat-emoji"
}, ta = {
  key: 1,
  class: "gh-category-pill"
}, sa = { class: "gh-sub-author" }, oa = { class: "gh-sub-verb" }, na = {
  key: 2,
  class: "gh-sub-comments-count"
}, aa = { class: "gh-op-post-card" }, la = { class: "gh-op-post-head" }, ia = { class: "gh-op-author-left" }, ra = ["src"], ca = { class: "gh-op-meta" }, ua = { class: "gh-op-name-row" }, da = { class: "gh-op-name" }, pa = {
  key: 0,
  class: "gh-role-pill"
}, ha = { class: "gh-op-time" }, ga = ["innerHTML"], ma = {
  key: 0,
  class: "gh-reactions-bar"
}, fa = { class: "rx-emoji" }, ba = { class: "rx-count" }, va = {
  key: 0,
  class: "gh-comments-block"
}, ya = { class: "gh-comments-header" }, wa = { class: "gh-comments-count-pill" }, _a = { class: "gh-comments-feed" }, ka = { class: "gh-comment-head" }, $a = ["src"], Ca = { class: "gh-comment-meta" }, Ga = { class: "gh-comment-author" }, Ta = {
  key: 0,
  class: "gh-role-pill small"
}, Ra = { class: "gh-comment-time" }, Sa = ["innerHTML"], Ma = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, Aa = { class: "rx-emoji" }, xa = { class: "rx-count" }, La = {
  key: 1,
  class: "gh-comment-replies-thread"
}, Da = { class: "gh-replies-thread-title" }, Ha = { class: "gh-reply-head" }, Ua = ["src"], Pa = { class: "gh-reply-meta" }, Ea = { class: "gh-reply-author" }, Ia = {
  key: 0,
  class: "gh-role-pill tiny"
}, Na = { class: "gh-reply-time" }, ja = ["innerHTML"], Fa = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, Oa = { class: "rx-emoji" }, za = { class: "rx-count" }, Wa = {
  key: 1,
  class: "gh-no-comments"
}, Ba = /* @__PURE__ */ ke({
  __name: "GitHubNotificationDetailDrawer",
  setup(v) {
    const r = I(null), o = I(null), l = I(null);
    let h = !1, m = 0, G = 0, d = 0, f = 0, M = () => {
    };
    const D = te(() => (y.data?.repositoryFullName || y.notificationItem?.repository.fullName || "").split("/")[0] || ""), $ = te(() => {
      const E = y.data?.repositoryFullName || y.notificationItem?.repository.fullName || "";
      return E.split("/")[1] || E;
    }), H = te(() => {
      if (!y.data) return "";
      const E = y.data.bodyHtml?.trim() || "";
      if (E.length > 20) return E;
      const N = y.data.body?.trim() || "";
      return N.length > 0 ? he.renderMarkdown(N) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), A = te(() => l.value ? {
      position: "fixed",
      left: `${l.value.x}px`,
      top: `${l.value.y}px`,
      transform: "none"
    } : {});
    _e(
      () => y.isOpen,
      (E) => {
        E && (l.value = null, et(() => {
          o.value && (o.value.scrollTop = 0);
        }));
      }
    ), _e(
      () => y.data,
      (E) => {
        E && et(() => {
          o.value && (o.value.scrollTop = 0);
        });
      }
    );
    function x(E) {
      if (E.target.closest("button, a, input")) return;
      M();
      const N = r.value;
      if (!N || !y.isOpen) return;
      h = !0;
      const F = N.getBoundingClientRect();
      d = F.left, f = F.top, m = E.clientX, G = E.clientY, l.value = { x: d, y: f };
      const q = (ie) => {
        if (!h) return;
        const Y = ie.clientX - m, k = ie.clientY - G;
        l.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, d + Y)),
          y: Math.max(10, Math.min(window.innerHeight - 80, f + k))
        };
      }, ae = () => {
        h = !1, window.removeEventListener("mousemove", q), window.removeEventListener("mouseup", ae);
      };
      M = ae, window.addEventListener("mousemove", q), window.addEventListener("mouseup", ae);
    }
    function S() {
      Ye.close();
    }
    function P() {
      const E = y.data?.htmlUrl || y.notificationItem?.htmlUrl;
      E && typeof window < "u" && window.open(E, "_blank", "noopener,noreferrer");
    }
    function L(E) {
      const F = E.target?.closest("a");
      F && F.href && (E.preventDefault(), E.stopPropagation(), window.open(F.href, "_blank", "noopener,noreferrer"));
    }
    function X() {
      y.notificationItem && Ye.open(y.notificationItem);
    }
    function ee(E) {
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
    function K(E) {
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
    function ne(E) {
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
    function ce(E) {
      E.key === "Escape" && y.isOpen && S();
    }
    return je(() => {
      window.addEventListener("keydown", ce);
    }), Fe(() => {
      window.removeEventListener("keydown", ce), M();
    }), (E, N) => (s(), de(Ve, { to: "body" }, [
      t(y).isOpen ? (s(), n("div", Pn, [
        e("div", {
          ref_key: "windowRef",
          ref: r,
          class: "gh-nonmodal-window",
          style: qe(A.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": t(y).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: x
          }, [
            e("div", In, [
              e("span", Nn, a(ee(t(y).data?.type || t(y).notificationItem?.subject.type)), 1),
              t(y).data?.htmlUrl || t(y).notificationItem?.htmlUrl ? (s(), n("a", {
                key: 0,
                href: t(y).data?.htmlUrl || t(y).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", Fn, a(D.value), 1),
                N[0] || (N[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", On, a($.value), 1),
                N[1] || (N[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, jn)) : (s(), n("span", zn, [
                e("strong", Wn, a(t(y).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", Bn, [
              t(y).data?.state ? (s(), n("span", {
                key: 0,
                class: j(["gh-detail-state-pill", t(y).data.state])
              }, a(ne(t(y).data.state)), 3)) : R("", !0),
              t(y).data?.htmlUrl || t(y).notificationItem?.htmlUrl ? (s(), n("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: P
              }, " 在网页打开 ↗ ")) : R("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: S
              }, " ✕ ")
            ])
          ], 32),
          e("div", Yn, [
            t(y).loading ? (s(), n("div", Vn, [
              N[2] || (N[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + a(t(y).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : t(y).error ? (s(), n("div", qn, [
              N[3] || (N[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, a(t(y).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: X
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: P
                }, "在 GitHub 打开 ↗")
              ])
            ])) : t(y).data ? (s(), n("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: o,
              class: "gh-detail-scrollable",
              onClick: L
            }, [
              e("div", Kn, [
                e("h1", Qn, [
                  le(a(t(y).data.title) + " ", 1),
                  t(y).data.number ? (s(), n("span", Xn, "#" + a(t(y).data.number), 1)) : R("", !0)
                ]),
                e("div", Jn, [
                  t(y).data.category ? (s(), n("span", Zn, [
                    t(y).data.category.emoji ? (s(), n("span", ea, a(t(y).data.category.emoji), 1)) : R("", !0),
                    e("span", null, a(t(y).data.category.name), 1)
                  ])) : (s(), n("span", ta, a(K(t(y).data.type)), 1)),
                  e("span", sa, a(t(y).data.author.login), 1),
                  e("span", oa, "发布于 " + a(t(y).data.formattedTime), 1),
                  t(y).data.commentsCount ? (s(), n("span", na, [
                    le(" · " + a(t(y).data.commentsCount) + " 条讨论主题 ", 1),
                    t(y).data.totalRepliesCount ? (s(), n(z, { key: 0 }, [
                      le(" （含 " + a(t(y).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : R("", !0)
                  ])) : R("", !0)
                ])
              ]),
              e("article", aa, [
                e("div", la, [
                  e("div", ia, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: t(y).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, ra),
                    e("div", ca, [
                      e("div", ua, [
                        e("strong", da, a(t(y).data.author.login), 1),
                        t(y).data.author.association ? (s(), n("span", pa, a(t(y).data.author.association), 1)) : R("", !0)
                      ]),
                      e("time", ha, a(t(y).data.formattedTime), 1)
                    ])
                  ]),
                  N[4] || (N[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                N[5] || (N[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: H.value
                }, null, 8, ga),
                t(y).data.reactions?.length ? (s(), n("div", ma, [
                  (s(!0), n(z, null, B(t(y).data.reactions, (F) => (s(), n("span", {
                    key: F.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", fa, a(F.emoji), 1),
                    e("span", ba, a(F.count), 1)
                  ]))), 128))
                ])) : R("", !0)
              ]),
              t(y).data.comments.length ? (s(), n("div", va, [
                e("div", ya, [
                  N[6] || (N[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", wa, [
                    le(a(t(y).data.commentsCount) + " 条主题 ", 1),
                    t(y).data.totalRepliesCount ? (s(), n(z, { key: 0 }, [
                      le(" · " + a(t(y).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : R("", !0)
                  ])
                ]),
                e("div", _a, [
                  (s(!0), n(z, null, B(t(y).data.comments, (F) => (s(), n("div", {
                    key: F.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", ka, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: F.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, $a),
                      e("div", Ca, [
                        e("span", Ga, a(F.author.login), 1),
                        F.author.association ? (s(), n("span", Ta, a(F.author.association), 1)) : R("", !0),
                        e("time", Ra, a(F.formattedTime), 1)
                      ])
                    ]),
                    N[7] || (N[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: F.bodyHtml
                    }, null, 8, Sa),
                    F.reactions?.length ? (s(), n("div", Ma, [
                      (s(!0), n(z, null, B(F.reactions, (q) => (s(), n("span", {
                        key: q.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", Aa, a(q.emoji), 1),
                        e("span", xa, a(q.count), 1)
                      ]))), 128))
                    ])) : R("", !0),
                    F.replies?.length ? (s(), n("div", La, [
                      e("div", Da, [
                        e("span", null, "💬 " + a(F.replies.length) + " 条回复对话", 1)
                      ]),
                      (s(!0), n(z, null, B(F.replies, (q) => (s(), n("div", {
                        key: q.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", Ha, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: q.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, Ua),
                          e("div", Pa, [
                            e("strong", Ea, a(q.author.login), 1),
                            q.author.association ? (s(), n("span", Ia, a(q.author.association), 1)) : R("", !0),
                            e("time", Na, a(q.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: q.bodyHtml
                        }, null, 8, ja),
                        q.reactions?.length ? (s(), n("div", Fa, [
                          (s(!0), n(z, null, B(q.reactions, (ae) => (s(), n("span", {
                            key: ae.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", Oa, a(ae.emoji), 1),
                            e("span", za, a(ae.count), 1)
                          ]))), 128))
                        ])) : R("", !0)
                      ]))), 128))
                    ])) : R("", !0)
                  ]))), 128))
                ])
              ])) : (s(), n("div", Wa, [...N[8] || (N[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : R("", !0)
          ])
        ], 12, En)
      ])) : R("", !0)
    ]));
  }
}), Ya = /* @__PURE__ */ Ce(Ba, [["__scopeId", "data-v-d22ba06c"]]), Va = ["inert"], qa = { class: "card-head" }, Ka = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, Qa = ["title"], Xa = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Ja = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, Za = ["placeholder"], el = ["title"], tl = { class: "gh-search-rule-icon" }, sl = { class: "gh-search-rule-text" }, ol = ["title"], nl = ["title"], al = { class: "gh-header-msg-label" }, ll = {
  key: 0,
  class: "gh-header-msg-badge"
}, il = { class: "gh-settings-anchor" }, rl = ["aria-expanded", "aria-label", "title"], cl = {
  key: 0,
  class: "muted small",
  role: "status"
}, ul = {
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
}, yl = { class: "fo-sidebar-sub-wrap" }, wl = ["title"], _l = { class: "fo-sidebar-sub-main" }, kl = { class: "fo-sidebar-sub-text" }, $l = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Cl = ["title"], Gl = { class: "fo-sidebar-sub-main" }, Tl = { class: "fo-sidebar-sub-text" }, Rl = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Sl = ["title"], Ml = { class: "fo-sidebar-sub-main" }, Al = { class: "fo-sidebar-sub-text" }, xl = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, Ll = ["title"], Dl = { class: "fo-sidebar-sub-main" }, Hl = { class: "fo-sidebar-sub-text" }, Ul = { class: "gh-bili-sidebar-head" }, Pl = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, El = { style: { color: "var(--dim)", "font-size": "9.5px" } }, Il = ["title", "aria-label"], Nl = {
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
}, zl = /* @__PURE__ */ ke({
  __name: "GitHubWorkspaceCard",
  setup(v) {
    const r = ut(() => import("./GitHubSettingsModal-DGVwXqdo.js")), { active: o } = dt("card-github", "/github.html");
    let l = 0, h = !1, m;
    const G = I(""), d = I("stars");
    _e(() => o.value && d.value === "stars", (Y) => V.setAiViewActive(Y), { immediate: !0, flush: "sync" });
    const f = I(!1), M = I("local"), D = I(""), $ = I(!1), H = I(0);
    function A() {
      o.value && ($.value = !0, ++H.value);
    }
    const x = I(!1);
    _e($, (Y) => {
      Y && (x.value = !0);
    });
    const S = I(null);
    let P = 0;
    function L(Y) {
      d.value = Y, Y === "trending" ? st.switchTab("trending") : st.switchTab("stars");
    }
    function X() {
      d.value = "stars";
    }
    const ee = te(() => [
      { id: "exact", icon: "🎯", name: C("search.rule.exact"), desc: C("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: C("search.rule.fuzzy"), desc: C("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: C("search.rule.topic"), desc: C("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: C("search.rule.smart"), desc: C("search.rule.smartDesc") }
    ]), K = I(V.searchRule || "exact"), ne = te(() => ee.value.find((Y) => Y.id === K.value) || ee.value[0]);
    function ce() {
      const Y = V.cycleSearchRule();
      K.value = Y;
    }
    const E = te(() => M.value === "global" ? C("github.searchGlobalPlaceholder") : C("github.searchLocalPlaceholder", { rule: ne.value.name }));
    function N() {
      clearTimeout(P), !(!o.value || M.value !== "local") && (P = window.setTimeout(() => V.setSearchQuery(D.value.trim().toLowerCase()), 180));
    }
    function F() {
      M.value = M.value === "local" ? "global" : "local", M.value === "local" && N();
    }
    function q() {
      D.value = "", clearTimeout(P), V.resetLocalSearch();
    }
    function ae() {
      const Y = D.value.trim();
      M.value === "local" ? (clearTimeout(P), V.setSearchQuery(Y.toLowerCase())) : Y && window.open(`https://github.com/search?q=${encodeURIComponent(Y)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function ie() {
      ++l, h = !0, G.value = "";
    }
    return _e(o, async (Y) => {
      if (clearTimeout(P), !Y) return;
      const k = ++l;
      if ((!m || m.signal.aborted) && (m = new AbortController(), V.setRepositoryViewSignal(m.signal)), h) {
        await V.resumeRepositoryReads();
        return;
      }
      if (V.repos.length || V.loadingAllStars || V.loadingPage) {
        h = !0;
        return;
      }
      try {
        const Q = await lt();
        if (k !== l || m.signal.aborted) return;
        h = !0, await V.loadGitHub(Q.ghUser, Q.ghToken);
      } catch {
        if (k !== l || m?.signal.aborted) return;
        h = !1, G.value = C("github.initError");
      }
    }, { immediate: !0, flush: "sync" }), rt(() => {
      V.setAiViewActive(!1), ++l, m?.abort(), clearTimeout(P);
    }), (Y, k) => (s(), n("section", {
      class: j(["card wide", { "card-fullscreen": t(wt).activeId === "card-github" }]),
      id: "card-github",
      inert: !t(o)
    }, [
      e("header", qa, [
        k[15] || (k[15] = e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }, null, -1)),
        k[16] || (k[16] = e("h2", null, "GitHub", -1)),
        k[17] || (k[17] = e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        }, null, -1)),
        e("div", Ka, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: J(ae, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: M.value === "local" ? t(C)("github.searchScope.toGlobal") : t(C)("github.searchScope.toLocal"),
              onClick: F
            }, [
              e("span", Xa, a(M.value === "local" ? "⭐" : "🌐"), 1),
              e("span", Ja, a(M.value === "local" ? t(C)("github.searchScope.local") : t(C)("github.searchScope.global")), 1),
              k[11] || (k[11] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, Qa),
            re(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": k[0] || (k[0] = (Q) => D.value = Q),
              placeholder: E.value,
              autocomplete: "off",
              onInput: N
            }, null, 40, Za), [
              [we, D.value]
            ]),
            M.value === "local" ? (s(), n("button", {
              key: 0,
              type: "button",
              class: j(["gh-search-rule-btn", `rule-${ne.value.id}`]),
              title: t(C)("github.ruleHint", { rule: ne.value.name, desc: ne.value.desc }),
              onClick: J(ce, ["stop"])
            }, [
              e("span", tl, a(ne.value.icon), 1),
              e("span", sl, a(ne.value.name), 1)
            ], 10, el)) : R("", !0),
            re(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: t(C)("github.clearSearch"),
              onClick: q
            }, "✕", 8, ol), [
              [Ie, D.value]
            ]),
            k[12] || (k[12] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          k[13] || (k[13] = ct('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-e55f7abe><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-e55f7abe><input type="checkbox" value="exact" checked data-v-e55f7abe>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-e55f7abe><input type="checkbox" value="loose" data-v-e55f7abe>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-e55f7abe><input type="checkbox" value="related" data-v-e55f7abe>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-e55f7abe><input type="checkbox" value="topic" data-v-e55f7abe>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-e55f7abe><input type="checkbox" value="readme" data-v-e55f7abe>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-e55f7abe></div>', 2))
        ]),
        e("button", {
          id: "gh-header-msg-center-btn",
          class: j(["gh-header-msg-btn", { "has-unread": t(U).unreadCount > 0, "is-active": t(U).isOpen }]),
          type: "button",
          title: t(U).unreadCount > 0 ? t(C)("github.header.msgUnread", { count: t(U).unreadCount }) : t(C)("github.header.msgCenter"),
          onClick: k[1] || (k[1] = (Q) => t(be).toggle())
        }, [
          k[14] || (k[14] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
          e("span", al, a(t(C)("github.header.msg")), 1),
          t(U).unreadCount > 0 ? (s(), n("span", ll, a(t(U).unreadCount > 99 ? "99+" : t(U).unreadCount), 1)) : R("", !0)
        ], 10, nl),
        e("div", il, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: S,
            "aria-expanded": $.value,
            "aria-label": t(C)("github.settings"),
            class: "gh-head-settings-btn",
            title: t(C)("github.header.settings"),
            onClick: k[2] || (k[2] = (Q) => $.value = !$.value)
          }, " ⚙️ ", 8, rl),
          x.value ? (s(), de(t(r), {
            key: 0,
            visible: t(o) && $.value,
            anchor: S.value,
            "ai-request": H.value,
            onAccountReload: ie,
            onClose: k[3] || (k[3] = (Q) => $.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : R("", !0)
        ])
      ]),
      G.value ? (s(), n("p", cl, a(G.value), 1)) : R("", !0),
      e("div", ul, [
        e("div", dl, [
          e("aside", pl, [
            e("div", {
              class: j(["fo-sidebar-toggle-bar", { "is-collapsed": f.value }]),
              title: f.value ? t(C)("github.channel.toggleExpand") : t(C)("github.channel.toggleCollapse"),
              onClick: k[4] || (k[4] = (Q) => f.value = !f.value)
            }, [
              e("div", gl, [
                k[18] || (k[18] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, a(t(C)("github.channel.channels")), 1),
                f.value ? (s(), n("span", ml, "3")) : R("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !f.value,
                title: f.value ? t(C)("github.expand") : t(C)("github.collapse")
              }, [
                e("span", null, a(f.value ? t(C)("github.expand") : t(C)("github.collapse")), 1),
                e("span", bl, a(f.value ? "▾" : "▴"), 1)
              ], 8, fl)
            ], 10, hl),
            f.value ? R("", !0) : (s(), n("div", vl, [
              e("div", yl, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: d.value === "stars" }]),
                  title: t(C)("github.channel.starsTitle"),
                  onClick: k[5] || (k[5] = (Q) => L("stars"))
                }, [
                  e("div", _l, [
                    k[19] || (k[19] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", kl, [
                      e("strong", null, a(t(C)("github.channel.stars")), 1),
                      e("small", null, a(t(C)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  k[20] || (k[20] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, wl)
              ]),
              e("div", $l, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: d.value === "trending" }]),
                  title: t(C)("github.channel.trendingTitle"),
                  onClick: k[6] || (k[6] = (Q) => L("trending"))
                }, [
                  e("div", Gl, [
                    k[21] || (k[21] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", Tl, [
                      e("strong", null, a(t(C)("github.channel.trending")), 1),
                      e("small", null, a(t(C)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  k[22] || (k[22] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, Cl)
              ]),
              e("div", Rl, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: d.value === "awesome" }]),
                  title: t(C)("github.channel.awesomeTitle"),
                  onClick: k[7] || (k[7] = (Q) => L("awesome"))
                }, [
                  e("div", Ml, [
                    k[23] || (k[23] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", Al, [
                      e("strong", null, a(t(C)("github.channel.awesome")), 1),
                      e("small", null, a(t(C)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  k[24] || (k[24] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, Sl)
              ]),
              e("div", xl, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: d.value === "repos" }]),
                  title: t(C)("github.channel.reposTitle"),
                  onClick: k[8] || (k[8] = (Q) => L("repos"))
                }, [
                  e("div", Dl, [
                    k[25] || (k[25] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", Hl, [
                      e("strong", null, a(t(C)("github.channel.repos")), 1),
                      e("small", null, a(t(C)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  k[26] || (k[26] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, Ll)
              ])
            ])),
            e("header", Ul, [
              e("div", null, [
                e("b", Pl, [
                  k[27] || (k[27] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  le(" " + a(t(C)("github.lists.title")), 1)
                ]),
                e("small", El, a(t(C)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: t(C)("github.lists.new"),
                "aria-label": t(C)("github.lists.new"),
                onClick: k[9] || (k[9] = (Q) => t(V).promptCreateFolder())
              }, "＋", 8, Il)
            ]),
            e("nav", Nl, [
              Te(bt, {
                active: t(o),
                onSelect: X
              }, null, 8, ["active"])
            ])
          ]),
          e("section", jl, [
            d.value === "stars" && t(gt).accountConfigured === !1 ? (s(), de(mt, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: k[10] || (k[10] = (Q) => $.value = !0)
            })) : d.value === "stars" ? (s(), n(z, { key: 1 }, [
              e("header", Fl, [
                Te(vt, { onOpenAiSettings: A })
              ]),
              e("div", Ol, [
                Te(on, {
                  active: t(o) && d.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : d.value === "trending" ? (s(), de(yt, { key: 2 })) : d.value === "awesome" ? (s(), de(jt, { key: 3 })) : d.value === "repos" ? (s(), de(Bs, {
              key: 4,
              active: t(o) && d.value === "repos"
            }, null, 8, ["active"])) : R("", !0)
          ])
        ])
      ]),
      Te(Un),
      Te(Ya)
    ], 10, Va));
  }
}), ei = /* @__PURE__ */ Ce(zl, [["__scopeId", "data-v-e55f7abe"]]);
export {
  ei as default
};
