import { d as ke, o as s, g as n, h as e, n as ue, q as Ae, i as R, F as z, j as Y, C as j, t as a, u as t, k as J, b as P, y as ee, r as $e, w as me, D as je, z as Fe, A as Ie, m as Pe, e as ce, l as Ve, B as qe, p as ne, G as et, L as ct, H as ut, s as Te, E as tt } from "./vendor-vue-D8gPZiit.js";
import { u as dt } from "./useCardActivity-DM2wdtpo.js";
import { E as it, F as De, w as he, H as Ne, t as K, R as st, y as pt, v as ht, A as gt } from "./search.service-Boal8ceH.js";
import { A as mt } from "./AccountSetupGuide-uXTqBHr0.js";
import { g as ft, G as bt, a as ot, b as vt } from "./main-D3JUiiYV.js";
import yt from "./GitHubTrending-CixJSw-9.js";
import { _ as Ce, t as G } from "./_plugin-vue_export-helper-aCvtv1YP.js";
import { s as Se } from "./storage-cache.service-BYF2zxXX.js";
import { n as nt, r as wt } from "./view-styles-D76pmMV8.js";
import { m as fe } from "./core-utils-DYgSCp9X.js";
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
], $t = { class: "gh-awesome-wrapper" }, Ct = { class: "gh-awesome-header" }, Gt = { class: "gh-awesome-intro" }, Tt = { class: "gh-awesome-search-box" }, St = { class: "gh-awesome-pills" }, Rt = ["onClick"], Mt = { class: "gh-awesome-grid" }, xt = ["onClick"], At = { class: "gh-awesome-card-head" }, Lt = { class: "gh-awesome-card-name" }, Ht = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, Dt = { class: "gh-awesome-desc" }, Ut = { class: "gh-awesome-footer" }, Et = { class: "gh-awesome-tags" }, Pt = ["href"], It = {
  key: 0,
  class: "gh-awesome-empty"
}, Nt = /* @__PURE__ */ ke({
  __name: "GitHubAwesome",
  setup(v) {
    const r = P("all"), l = P(""), o = ee(() => {
      const f = l.value.trim().toLowerCase(), $ = r.value;
      return kt.filter((g) => $ === "all" || g.category === $ ? f ? g.name.toLowerCase().includes(f) || g.title.toLowerCase().includes(f) || g.desc.toLowerCase().includes(f) || g.tags.some((x) => x.toLowerCase().includes(f)) : !0 : !1);
    });
    function p(f) {
      window.open(f, "_blank", "noreferrer");
    }
    return (f, $) => (s(), n("div", $t, [
      e("header", Ct, [
        e("div", Gt, [
          $[3] || ($[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", Tt, [
            ue(e("input", {
              "onUpdate:modelValue": $[0] || ($[0] = (g) => l.value = g),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [Ae, l.value]
            ]),
            l.value ? (s(), n("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: $[1] || ($[1] = (g) => l.value = "")
            }, "✕")) : R("", !0)
          ])
        ]),
        e("div", St, [
          (s(!0), n(z, null, Y(t(_t), (g) => (s(), n("button", {
            key: g.id,
            type: "button",
            class: j(["gh-awesome-pill", { active: r.value === g.id }]),
            onClick: (m) => r.value = g.id
          }, [
            e("span", null, a(g.icon), 1),
            e("b", null, a(g.name), 1)
          ], 10, Rt))), 128))
        ])
      ]),
      e("div", Mt, [
        (s(!0), n(z, null, Y(o.value, (g) => (s(), n("article", {
          key: g.id,
          class: "gh-awesome-card",
          onClick: (m) => p(g.url)
        }, [
          e("div", At, [
            e("div", Lt, [
              e("strong", null, a(g.title), 1),
              e("small", null, a(g.name), 1)
            ]),
            e("span", Ht, "★ " + a(g.stars), 1)
          ]),
          e("p", Dt, a(g.desc), 1),
          e("div", Ut, [
            e("div", Et, [
              (s(!0), n(z, null, Y(g.tags, (m) => (s(), n("span", {
                key: m,
                class: "gh-awesome-tag"
              }, a(m), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: g.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: $[2] || ($[2] = J(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, Pt)
          ])
        ], 8, xt))), 128)),
        o.value.length ? R("", !0) : (s(), n("div", It, [...$[4] || ($[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), jt = /* @__PURE__ */ Ce(Nt, [["__scopeId", "data-v-28a8995f"]]), Re = "gh_my_repos_cache_v1", Me = "gh_my_repo_groups_v2", xe = "gh_my_repo_groups_map_v2", S = $e({
  loading: !1,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});
function ve(v) {
  return v.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
}
class we {
  constructor() {
    this.abortController = null, this.inFlightPromise = null;
  }
  static getInstance() {
    return we.instance || (we.instance = new we()), we.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略，支持并发防抖与请求去重）
   */
  async load(r = !1) {
    if (!r && this.inFlightPromise)
      return this.inFlightPromise;
    r && (this.abortController?.abort(), this.inFlightPromise = null), this.abortController = new AbortController();
    const l = this.abortController.signal, o = (async () => {
      await this.loadPersistedGroups();
      const p = await Se.get(Re);
      if (p && p.length ? this.hydrateRepos(p) : S.repos.length && this.hydrateRepos(S.repos), r || !S.repos.length) {
        S.loading = !0, S.errorMessage = "";
        try {
          await this.fetchRemote(l);
        } catch ($) {
          if ($.name === "AbortError") return;
          S.errorMessage = $.message || "获取个人仓库失败";
        } finally {
          S.loading = !1;
        }
      } else
        this.fetchRemote(l).catch(() => {
        });
    })();
    return this.inFlightPromise = o.finally(() => {
      this.inFlightPromise === o && (this.inFlightPromise = null);
    }), this.inFlightPromise;
  }
  async fetchRemote(r) {
    const { ghUser: l, ghToken: o } = await it();
    if (!l && !o) {
      S.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    const p = De(o), f = [], $ = /* @__PURE__ */ new Set();
    if (l)
      try {
        const m = `https://api.github.com/users/${encodeURIComponent(l)}/repos?type=owner&sort=updated&per_page=100`, x = await fetch(m, { method: "GET", headers: p, signal: r });
        if (x.ok) {
          const A = await x.json();
          if (Array.isArray(A))
            for (const C of A)
              C && C.id && !$.has(C.id) && ($.add(C.id), f.push(C));
        }
      } catch (m) {
        if (m.name === "AbortError") throw m;
      }
    if (o)
      try {
        const x = await fetch("https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100", { method: "GET", headers: p, signal: r });
        if (x.ok) {
          const A = await x.json();
          if (Array.isArray(A))
            for (const C of A)
              C && C.id && !$.has(C.id) && ($.add(C.id), f.push(C));
        }
      } catch (m) {
        if (m.name === "AbortError") throw m;
      }
    if (!f.length) {
      S.repos.length || (S.errorMessage = "未能读取到个人仓库，请检查网络或 GitHub 设置。");
      return;
    }
    const g = f.map((m) => {
      const x = m.full_name || `${m.owner?.login || l}/${m.name}`, A = m.name, C = S.repoGroupsMap[x] || S.repoGroupsMap[A] || S.repoGroupsMap[x.toLowerCase()] || S.repoGroupsMap[A.toLowerCase()] || [];
      return {
        id: m.id,
        name: m.name,
        fullName: x,
        description: m.description || "",
        isPrivate: !!m.private,
        isFork: !!m.fork,
        htmlUrl: m.html_url || `https://github.com/${l}/${m.name}`,
        language: m.language || null,
        stargazersCount: Number(m.stargazers_count) || 0,
        forksCount: Number(m.forks_count) || 0,
        openIssuesCount: Number(m.open_issues_count) || 0,
        topics: Array.isArray(m.topics) ? m.topics.map((D) => String(D).toLowerCase()) : [],
        localGroups: C,
        updatedAt: m.updated_at || "",
        pushedAt: m.pushed_at || "",
        defaultBranch: m.default_branch || "main"
      };
    });
    this.hydrateRepos(g), await Se.set(Re, g, { ttlMs: 30 * 86400 * 1e3 });
  }
  hydrateRepos(r) {
    let l = !1;
    S.repos = r.map((o) => {
      const p = S.repoGroupsMap[o.fullName] || S.repoGroupsMap[o.name] || S.repoGroupsMap[o.fullName.toLowerCase()] || S.repoGroupsMap[o.name.toLowerCase()], f = o.localGroups && o.localGroups.length ? o.localGroups : null, $ = this.inferGroupsForRepo(o, S.customGroups), g = (p && p.length ? p : null) || f || $, m = g ? [...new Set(g.filter(Boolean))] : [];
      return m.length && (!S.repoGroupsMap[o.fullName] || !S.repoGroupsMap[o.fullName].length) && (S.repoGroupsMap[o.fullName] = m, l = !0), {
        ...o,
        localGroups: m
      };
    }), l && this.persistGroupsMap();
  }
  /**
   * 智能推断仓库最匹配的分组归属（仅在无手动归类时作为平滑桥接）
   */
  inferGroupsForRepo(r, l) {
    if (!l || !l.length) return [];
    const o = [], p = r.name.toLowerCase(), f = (r.topics || []).map(($) => $.toLowerCase());
    for (const $ of l) {
      const g = $.toLowerCase();
      if ((g.includes("fork") || $.includes("分支")) && (r.isFork || f.includes("fork"))) {
        o.push($);
        continue;
      }
      if ((g.includes("浏览器") || g.includes("browser") || g.includes("chrome") || g.includes("edge")) && (f.some((m) => m.includes("extension") || m.includes("browser") || m.includes("newtab")) || p.includes("tab-project"))) {
        o.push($);
        continue;
      }
      if ((g.includes("pi") || $.includes("PI")) && (f.some((m) => m.includes("pi") || m.includes("grounding-pi")) || p.includes("pi-") || p.includes("-pi"))) {
        o.push($);
        continue;
      }
      if (g.includes("herdr") && (f.some((m) => m.includes("herdr")) || p.includes("herdr"))) {
        o.push($);
        continue;
      }
      if ((g.includes("嵌入式") || g.includes("embedded") || g.includes("单片机")) && (f.some((m) => m.includes("embedded") || m.includes("zephyr") || m.includes("stm32") || m.includes("k230")) || p.includes("k230") || p.includes("mspm0") || p.includes("pid-") || p.includes("zephyr"))) {
        o.push($);
        continue;
      }
      if ((g.includes("美化") || g.includes("theme") || g.includes("style")) && (f.some((m) => m.includes("theme") || m.includes("beauty") || m.includes("ui")) || p.includes("theme") || p.includes("style"))) {
        o.push($);
        continue;
      }
    }
    return o;
  }
  /**
   * 将仓库添加到本地自定义分组
   */
  async addRepoToGroup(r, l) {
    const o = ve(l);
    o && (r.localGroups.includes(o) || r.localGroups.push(o), S.repoGroupsMap[r.fullName] = [...r.localGroups], await this.persistGroupsMap(), await Se.set(Re, S.repos, { ttlMs: 30 * 86400 * 1e3 }));
  }
  /**
   * 将仓库从指定本地分组中移出
   */
  async removeRepoFromGroup(r, l) {
    r.localGroups = r.localGroups.filter((o) => o !== l), S.repoGroupsMap[r.fullName] = [...r.localGroups], await this.persistGroupsMap(), await Se.set(Re, S.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  async moveRepoToGroup(r, l) {
    if (!l)
      r.localGroups = [];
    else {
      const o = ve(l);
      if (!o) return;
      r.localGroups = [o];
    }
    S.repoGroupsMap[r.fullName] = [...r.localGroups], await this.persistGroupsMap(), await Se.set(Re, S.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 新建一个本地分组板块
   */
  async createGroup(r) {
    const l = ve(r);
    return l ? S.customGroups.includes(l) ? (alert(`分组「${l}」已存在。`), null) : (S.customGroups.push(l), await this.persistGroups(), l) : (alert("分组名称不能为空。"), null);
  }
  /**
   * 重命名本地分组
   */
  async renameGroup(r, l) {
    const o = ve(l);
    return o ? r === o ? !0 : S.customGroups.includes(o) ? (alert(`已存在名为「${o}」的分组。`), !1) : (S.customGroups = S.customGroups.map((p) => p === r ? o : p), S.repos.forEach((p) => {
      p.localGroups.includes(r) && (p.localGroups = p.localGroups.map((f) => f === r ? o : f), S.repoGroupsMap[p.fullName] = [...p.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : (alert("新分组名称不能为空。"), !1);
  }
  /**
   * 删除本地分组
   */
  async deleteGroup(r) {
    const l = S.repos.filter((p) => p.localGroups.includes(r)).length, o = l > 0 ? `确定删除分组「${r}」吗？
该分组下的 ${l} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。` : `确定删除空分组「${r}」吗？`;
    return confirm(o) ? (S.customGroups = S.customGroups.filter((p) => p !== r), S.repos.forEach((p) => {
      p.localGroups.includes(r) && (p.localGroups = p.localGroups.filter((f) => f !== r), S.repoGroupsMap[p.fullName] = [...p.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : !1;
  }
  async loadPersistedGroups() {
    try {
      let r = null, l = null;
      if (typeof chrome < "u" && chrome.storage?.local) {
        const o = await chrome.storage.local.get([Me, xe]);
        r = o?.[Me], l = o?.[xe];
      }
      if (!r || !Array.isArray(r)) {
        const o = localStorage.getItem(Me);
        o && (r = JSON.parse(o));
      }
      if (!l || typeof l != "object") {
        const o = localStorage.getItem(xe);
        o && (l = JSON.parse(o));
      }
      Array.isArray(r) && (S.customGroups = r.map(ve).filter(Boolean)), l && typeof l == "object" && (S.repoGroupsMap = l);
    } catch {
    }
  }
  async persistGroupsMap() {
    try {
      const r = { ...S.repoGroupsMap };
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [xe]: r }), localStorage.setItem(xe, JSON.stringify(r));
    } catch {
    }
  }
  async persistGroups() {
    const r = Array.from(new Set(S.customGroups.map(ve).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Me]: r }), localStorage.setItem(Me, JSON.stringify(r));
    } catch {
    }
  }
}
const se = we.getInstance(), Ft = { class: "my-repos-workspace" }, Ot = {
  key: 0,
  class: "error-banner"
}, zt = { class: "shelf-header" }, Wt = { class: "shelf-left" }, Bt = { class: "shelf-badge" }, Yt = { class: "shelf-right" }, Vt = { class: "shelf-search-wrap" }, qt = ["disabled", "title"], Kt = ["title"], Xt = ["onDragstart", "onContextmenu"], Qt = { class: "repo-card-head" }, Jt = ["title", "onClick"], Zt = {
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
}, _s = ["onClick"], ks = ["onClick"], $s = { class: "column-cards-scroll" }, Cs = ["onDragstart", "onContextmenu"], Gs = { class: "repo-card-head" }, Ts = ["title", "onClick"], Ss = {
  key: 0,
  class: "badge-repo-visibility private"
}, Rs = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Ms = ["title"], xs = { class: "repo-topics-row" }, As = { class: "topic-chip active-chip" }, Ls = ["onClick"], Hs = { class: "repo-card-footer" }, Ds = { class: "meta-left" }, Us = {
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
}, Os = { class: "composer-actions" }, zs = ["onClick"], Ws = /* @__PURE__ */ ke({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(v) {
    const r = v, l = P(""), o = P(!1), p = P(null), f = P(""), $ = P(null), g = P(null), m = P(null), x = P(!1);
    function A() {
      x.value = !x.value;
    }
    function C(c) {
      const i = m.value;
      i && (Math.abs(c.deltaX) > Math.abs(c.deltaY) && c.deltaX !== 0 || c.deltaY !== 0 && (c.preventDefault(), i.scrollLeft += c.deltaY));
    }
    const D = P(null), T = P(null), L = P(null);
    let M = null, I = 0;
    const H = $e({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromGroup: null
    }), V = P(null), Z = P(!1);
    function Q() {
      H.visible = !1, V.value = null;
    }
    function ie(c, i, d) {
      c.preventDefault(), c.stopPropagation();
      let _ = c.clientX, te = c.clientY;
      _ > window.innerWidth - 200 && (_ = window.innerWidth - 210), te > window.innerHeight - 240 && (te = window.innerHeight - 245), H.x = _, H.y = te, H.repo = i, H.fromGroup = d, H.visible = !0, V.value = "folder", Z.value = _ > window.innerWidth - 380;
    }
    async function re() {
      const c = H.repo;
      Q(), c && await se.moveRepoToGroup(c, null);
    }
    async function U(c) {
      const i = H.repo;
      Q(), i && await se.moveRepoToGroup(i, c);
    }
    async function N() {
      const c = H.repo;
      if (Q(), !!c)
        try {
          await navigator.clipboard.writeText(c.htmlUrl), nt.show({
            appName: "GitHub",
            title: G("github.myRepos.copiedUrlTitle"),
            message: G("github.myRepos.copiedUrlMsg", { name: c.name })
          });
        } catch {
        }
    }
    async function F() {
      const c = H.repo;
      if (Q(), !!c)
        try {
          const i = `git clone ${c.htmlUrl}.git`;
          await navigator.clipboard.writeText(i), nt.show({
            appName: "GitHub",
            title: G("github.myRepos.copiedCloneTitle"),
            message: i
          });
        } catch {
        }
    }
    function q() {
      const c = H.repo;
      Q(), c && We(c.htmlUrl);
    }
    function oe() {
      const c = H.repo;
      Q(), c && ft.open({
        fullName: c.fullName,
        description: c.description || "",
        stars: c.stargazersCount,
        language: c.language || void 0,
        updated: c.pushedAt
      });
    }
    function ae(c) {
      c.target?.closest(".gh-repo-context-menu") || H.visible && Q();
    }
    function de(c) {
      c.key === "Escape" && H.visible && Q();
    }
    const pe = ee(() => S.customGroups), B = ee(() => {
      const c = S.searchQuery.trim().toLowerCase();
      return c ? S.repos.filter(
        (i) => i.name.toLowerCase().includes(c) || i.description.toLowerCase().includes(c) || i.localGroups.some((d) => d.toLowerCase().includes(c)) || i.topics.some((d) => d.toLowerCase().includes(c)) || i.language && i.language.toLowerCase().includes(c)
      ) : S.repos;
    }), w = ee(() => B.value.filter((c) => !c.localGroups.length));
    function X(c) {
      return B.value.filter((i) => i.localGroups.includes(c));
    }
    async function Ge() {
      const c = l.value.trim();
      if (!c) return;
      await se.createGroup(c) && (l.value = "", o.value = !1);
    }
    function Ue(c) {
      $.value = c, f.value = c, p.value = null;
    }
    async function be(c) {
      const i = f.value.trim();
      if (!i || i === c) {
        $.value = null;
        return;
      }
      await se.renameGroup(c, i) && ($.value = null);
    }
    async function Ee(c) {
      p.value = null, await se.deleteGroup(c);
    }
    async function b(c, i) {
      await se.removeRepoFromGroup(c, i);
    }
    function u(c) {
      const i = g.value;
      if (!i) return;
      const _ = c.target?.closest(".column-cards-scroll");
      if (_ && _.scrollHeight > _.clientHeight && !c.shiftKey && c.deltaX === 0) {
        const te = _.scrollTop <= 0 && c.deltaY < 0, rt = _.scrollTop + _.clientHeight >= _.scrollHeight - 1 && c.deltaY > 0;
        if (!te && !rt)
          return;
      }
      Math.abs(c.deltaX) > Math.abs(c.deltaY) && c.deltaX !== 0 || c.deltaY !== 0 && (c.preventDefault(), i.scrollLeft += c.deltaY);
    }
    function h(c) {
      if (!D.value || !g.value) return;
      c.preventDefault();
      const i = c.deltaX !== 0 ? c.deltaX : c.deltaY;
      g.value.scrollLeft += i;
    }
    function k() {
      if (M !== null) return;
      const c = () => {
        g.value && I !== 0 ? (g.value.scrollLeft += I, M = requestAnimationFrame(c)) : W();
      };
      M = requestAnimationFrame(c);
    }
    function W() {
      M !== null && (cancelAnimationFrame(M), M = null), I = 0;
    }
    function ge(c) {
      if (!D.value || !g.value) return;
      const i = g.value.getBoundingClientRect(), d = 100;
      if (c > i.right - d) {
        const _ = Math.min(1, Math.max(0.1, (c - (i.right - d)) / d));
        I = Math.round(_ * 20), k();
      } else if (c < i.left + d) {
        const _ = Math.min(1, Math.max(0.1, (i.left + d - c) / d));
        I = -Math.round(_ * 20), k();
      } else
        W();
    }
    function Oe(c) {
      D.value && (c.preventDefault(), ge(c.clientX));
    }
    function Ke(c, i, d) {
      Q(), D.value = i, T.value = d, c.dataTransfer && (c.dataTransfer.effectAllowed = "move", c.dataTransfer.setData("text/plain", `${i.id}:${d}`)), window.addEventListener("wheel", h, { passive: !1 });
    }
    function ze() {
      D.value = null, T.value = null, L.value = null, W(), window.removeEventListener("wheel", h);
    }
    function Xe(c, i) {
      D.value && (c.preventDefault(), c.dataTransfer && (c.dataTransfer.dropEffect = "move"), L.value = i, ge(c.clientX));
    }
    function Qe(c, i) {
      const d = c.currentTarget, _ = c.relatedTarget;
      d?.contains(_) || L.value === i && (L.value = null);
    }
    async function Je(c, i) {
      c.preventDefault();
      const d = D.value, _ = T.value;
      ze(), d && (i === "default" ? _ && _ !== "default" ? await se.removeRepoFromGroup(d, _) : await se.moveRepoToGroup(d, null) : (await se.addRepoToGroup(d, i), _ && _ !== "default" && _ !== i && await se.removeRepoFromGroup(d, _)));
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
    return me(
      () => r.active,
      (c) => {
        Q(), c && se.load();
      }
    ), je(() => {
      window.addEventListener("pointerdown", ae), window.addEventListener("keydown", de), se.load();
    }), Fe(() => {
      W(), window.removeEventListener("wheel", h), window.removeEventListener("pointerdown", ae), window.removeEventListener("keydown", de);
    }), (c, i) => (s(), n("div", Ft, [
      t(S).errorMessage ? (s(), n("div", Ot, [
        e("span", null, "⚠️ " + a(t(S).errorMessage), 1),
        e("button", {
          type: "button",
          class: "btn-retry",
          onClick: i[0] || (i[0] = (d) => t(se).load(!0))
        }, "重试")
      ])) : R("", !0),
      e("section", {
        class: j(["default-shelf-area", { "is-collapsed": x.value, "drop-active": L.value === "default" }]),
        onDragover: i[4] || (i[4] = (d) => Xe(d, "default")),
        onDragleave: i[5] || (i[5] = (d) => Qe(d, "default")),
        onDrop: i[6] || (i[6] = (d) => Je(d, "default"))
      }, [
        e("header", zt, [
          e("div", Wt, [
            i[23] || (i[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            i[24] || (i[24] = e("span", { class: "shelf-title" }, "未分类仓库", -1)),
            e("span", Bt, a(w.value.length), 1),
            i[25] || (i[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）", -1))
          ]),
          e("div", Yt, [
            e("div", Vt, [
              i[26] || (i[26] = e("span", { class: "search-icon" }, "🔍", -1)),
              ue(e("input", {
                "onUpdate:modelValue": i[1] || (i[1] = (d) => t(S).searchQuery = d),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索我的仓库名称、简介或语言…"
              }, null, 512), [
                [Ae, t(S).searchQuery]
              ]),
              t(S).searchQuery ? (s(), n("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: i[2] || (i[2] = (d) => t(S).searchQuery = "")
              }, "✕")) : R("", !0)
            ]),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              disabled: t(S).loading,
              title: t(G)("github.myRepos.refreshBtnTitle"),
              onClick: i[3] || (i[3] = (d) => t(se).load(!0))
            }, [
              e("span", {
                class: j({ spinning: t(S).loading })
              }, "🔄", 2),
              e("span", null, a(t(S).loading ? t(G)("github.myRepos.refreshing") : t(G)("common.refresh")), 1)
            ], 8, qt),
            w.value.length ? (s(), n("button", {
              key: 0,
              type: "button",
              class: "shelf-toggle-btn",
              title: x.value ? t(G)("github.myRepos.expandShelf") : t(G)("github.myRepos.collapseShelf"),
              onClick: A
            }, a(x.value ? t(G)("github.myRepos.expandBtn") : t(G)("github.myRepos.collapseBtn")), 9, Kt)) : R("", !0)
          ])
        ]),
        w.value.length ? ue((s(), n("div", {
          key: 0,
          ref_key: "shelfScrollRef",
          ref: m,
          class: "shelf-cards-scroll",
          onWheel: C
        }, [
          (s(!0), n(z, null, Y(w.value, (d) => (s(), n("div", {
            key: d.id,
            class: j(["repo-card shelf-card", { "card-dragging": D.value?.id === d.id }]),
            draggable: "true",
            onDragstart: (_) => Ke(_, d, "default"),
            onDragend: ze,
            onContextmenu: (_) => ie(_, d, "default")
          }, [
            e("div", Qt, [
              e("span", {
                class: "repo-name",
                title: d.fullName,
                onClick: (_) => We(d.htmlUrl)
              }, a(d.name), 9, Jt),
              d.isPrivate ? (s(), n("span", Zt, "私有")) : R("", !0),
              d.isFork ? (s(), n("span", es, "Fork")) : R("", !0)
            ]),
            d.description ? (s(), n("p", {
              key: 0,
              class: "repo-desc",
              title: d.description
            }, a(d.description), 9, ts)) : R("", !0),
            d.topics.length ? (s(), n("div", ss, [
              (s(!0), n(z, null, Y(d.topics, (_) => (s(), n("span", {
                key: _,
                class: "topic-chip-tag",
                title: "GitHub 远端引流标签"
              }, " #" + a(_), 1))), 128))
            ])) : R("", !0),
            e("div", os, [
              e("div", ns, [
                d.language ? (s(), n("span", as, [
                  i[27] || (i[27] = e("span", { class: "lang-color" }, null, -1)),
                  ne(a(d.language), 1)
                ])) : R("", !0),
                e("span", ls, "⭐ " + a(d.stargazersCount), 1),
                d.forksCount ? (s(), n("span", is, "🍴 " + a(d.forksCount), 1)) : R("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + d.updatedAt
              }, a(Ze(d.pushedAt || d.updatedAt)), 9, rs)
            ])
          ], 42, Xt))), 128))
        ], 544)), [
          [Ie, !x.value]
        ]) : R("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: g,
        class: "board-viewport",
        onWheel: u,
        onDragover: Oe
      }, [
        e("div", cs, [
          (s(!0), n(z, null, Y(pe.value, (d) => (s(), n("section", {
            key: d,
            class: j(["board-column topic-column", { "drop-active": L.value === d }]),
            onDragover: (_) => Xe(_, d),
            onDragleave: (_) => Qe(_, d),
            onDrop: (_) => Je(_, d)
          }, [
            e("header", ds, [
              $.value !== d ? (s(), n("div", ps, [
                i[28] || (i[28] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "自定义分组: " + d
                }, " 📁 " + a(d), 9, hs),
                e("span", gs, a(X(d).length), 1)
              ])) : (s(), n("div", ms, [
                ue(e("input", {
                  "onUpdate:modelValue": i[7] || (i[7] = (_) => f.value = _),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    Pe((_) => be(d), ["enter"]),
                    i[8] || (i[8] = Pe((_) => $.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, fs), [
                  [Ae, f.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (_) => be(d)
                }, "✓", 8, bs),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: i[9] || (i[9] = (_) => $.value = null)
                }, "✕")
              ])),
              e("div", vs, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "分组操作",
                  onClick: (_) => p.value = p.value === d ? null : d
                }, "•••", 8, ys),
                p.value === d ? (s(), n("div", ws, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (_) => Ue(d)
                  }, " 重命名分组 ", 8, _s),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (_) => Ee(d)
                  }, " 删除分组 ", 8, ks)
                ])) : R("", !0)
              ])
            ]),
            e("div", $s, [
              (s(!0), n(z, null, Y(X(d), (_) => (s(), n("div", {
                key: _.id,
                class: j(["repo-card", { "card-dragging": D.value?.id === _.id }]),
                draggable: "true",
                onDragstart: (te) => Ke(te, _, d),
                onDragend: ze,
                onContextmenu: (te) => ie(te, _, d)
              }, [
                e("div", Gs, [
                  e("span", {
                    class: "repo-name",
                    title: _.fullName,
                    onClick: (te) => We(_.htmlUrl)
                  }, a(_.name), 9, Ts),
                  _.isPrivate ? (s(), n("span", Ss, "私有")) : R("", !0),
                  _.isFork ? (s(), n("span", Rs, "Fork")) : R("", !0)
                ]),
                _.description ? (s(), n("p", {
                  key: 0,
                  class: "repo-desc",
                  title: _.description
                }, a(_.description), 9, Ms)) : R("", !0),
                e("div", xs, [
                  e("span", As, [
                    ne(" 📁 " + a(d) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从该分组移出",
                      onClick: J((te) => b(_, d), ["stop"])
                    }, "✕", 8, Ls)
                  ]),
                  (s(!0), n(z, null, Y(_.topics, (te) => (s(), n("span", {
                    key: te,
                    class: "topic-chip-tag",
                    title: "GitHub 远端引流标签"
                  }, " #" + a(te), 1))), 128))
                ]),
                e("div", Hs, [
                  e("div", Ds, [
                    _.language ? (s(), n("span", Us, [
                      i[29] || (i[29] = e("span", { class: "lang-color" }, null, -1)),
                      ne(a(_.language), 1)
                    ])) : R("", !0),
                    e("span", Es, "⭐ " + a(_.stargazersCount), 1),
                    _.forksCount ? (s(), n("span", Ps, "🍴 " + a(_.forksCount), 1)) : R("", !0)
                  ]),
                  e("span", Is, a(Ze(_.pushedAt || _.updatedAt)), 1)
                ])
              ], 42, Cs))), 128)),
              X(d).length ? R("", !0) : (s(), n("div", Ns, [...i[30] || (i[30] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, us))), 128)),
          e("section", js, [
            o.value ? (s(), n("div", Fs, [
              i[32] || (i[32] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建分组板块"),
                e("small", null, "支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics")
              ], -1)),
              ue(e("input", {
                "onUpdate:modelValue": i[11] || (i[11] = (d) => l.value = d),
                type: "text",
                placeholder: "输入分组名称（如：前端工具、深度学习）",
                class: "composer-input",
                onKeydown: [
                  Pe(Ge, ["enter"]),
                  i[12] || (i[12] = Pe((d) => o.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [Ae, l.value]
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
                  onClick: i[13] || (i[13] = (d) => o.value = !1)
                }, a(t(G)("common.cancel")), 1)
              ])
            ])) : (s(), n("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: i[10] || (i[10] = (d) => o.value = !0)
            }, [...i[31] || (i[31] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建分组板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (s(), ce(Ve, { to: "body" }, [
        H.visible && H.repo ? (s(), n("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: qe({ left: `${H.x}px`, top: `${H.y}px` }),
          onClick: i[21] || (i[21] = J(() => {
          }, ["stop"])),
          onContextmenu: i[22] || (i[22] = J(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: j(["gh-menu-has-sub", { "is-active": V.value === "folder" }]),
            onMouseenter: i[16] || (i[16] = (d) => V.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: i[14] || (i[14] = J((d) => V.value = V.value === "folder" ? null : "folder", ["stop"]))
            }, [...i[33] || (i[33] = [
              e("span", null, "移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: j(["gh-sub-flyout", { "flyout-left": Z.value }]),
              onClick: i[15] || (i[15] = J(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: j(["fo-cover-menu-item", { primary: !H.repo.localGroups.length }]),
                type: "button",
                onClick: re
              }, a(H.repo.localGroups.length ? "  " : "✓ ") + "设为未分类 ", 3),
              (s(!0), n(z, null, Y(pe.value, (d) => (s(), n("button", {
                key: d,
                class: j(["fo-cover-menu-item", { primary: H.repo.localGroups.includes(d) }]),
                type: "button",
                onClick: (_) => U(d)
              }, a(H.repo.localGroups.includes(d) ? "✓ " : "  ") + "📁 " + a(d), 11, zs))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: i[17] || (i[17] = (d) => V.value = null),
            onClick: N
          }, a(t(G)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: i[18] || (i[18] = (d) => V.value = null),
            onClick: F
          }, a(t(G)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: i[19] || (i[19] = (d) => V.value = null),
            onClick: oe
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: i[20] || (i[20] = (d) => V.value = null),
            onClick: q
          }, a(t(G)("github.myRepos.openInGitHub")), 33)
        ], 36)) : R("", !0)
      ]))
    ]));
  }
}), Bs = /* @__PURE__ */ Ce(Ws, [["__scopeId", "data-v-f77c8971"]]), le = $e({
  uncatPage: 1,
  pageSize: 10
});
class _e {
  static getInstance() {
    return _e.instance || (_e.instance = new _e()), _e.instance;
  }
  nextUncatPage() {
    this.uncatPage < this.uncatTotalPages && le.uncatPage++;
  }
  prevUncatPage() {
    le.uncatPage > 1 && le.uncatPage--;
  }
  setUncatPage(r) {
    const l = Math.max(1, Math.min(r, this.uncatTotalPages));
    le.uncatPage = l;
  }
  get uncatPage() {
    return le.uncatPage;
  }
  get uncatTotalPages() {
    const r = this.filteredUncatRepos.length;
    return Math.max(1, Math.ceil(r / le.pageSize));
  }
  /**
   * 未分类的所有 Star 仓库（带搜索过滤）
   */
  get filteredUncatRepos() {
    const r = he.searchQuery.trim().toLowerCase(), l = he.repos.filter((o) => Ne(o.full_name).length === 0);
    return r ? l.filter(
      (o) => o.full_name.toLowerCase().includes(r) || o.description && o.description.toLowerCase().includes(r) || o.language && o.language.toLowerCase().includes(r) || o.topics && o.topics.some((p) => p.toLowerCase().includes(r))
    ) : l;
  }
  /**
   * 当前页切片的 10 个未分类 Star 仓库
   */
  get pagedUncatRepos() {
    const r = this.filteredUncatRepos, o = (Math.min(le.uncatPage, this.uncatTotalPages) - 1) * le.pageSize;
    return r.slice(o, o + le.pageSize);
  }
  /**
   * 各个本地分组板块列表
   */
  get lists() {
    return he.lists;
  }
  /**
   * 获取归属于指定 GitHub List 的 Star 仓库（带搜索过滤）
   */
  getReposForList(r) {
    const l = he.searchQuery.trim().toLowerCase(), o = he.repos.filter((p) => Ne(p.full_name).includes(r));
    return l ? o.filter(
      (p) => p.full_name.toLowerCase().includes(l) || p.description && p.description.toLowerCase().includes(l) || p.language && p.language.toLowerCase().includes(l) || p.topics && p.topics.some((f) => f.toLowerCase().includes(l))
    ) : o;
  }
  /**
   * 拖拽归入指定 List（若 target 为 'uncategorized' 则从所有 List 移出）
   */
  async moveRepoToList(r, l) {
    await K.dropRepositoryIntoFolder(r, l);
  }
  /**
   * 从指定 List 移出仓库
   */
  async removeRepoFromList(r, l) {
    await K.toggleRepoList(r, l);
  }
}
const O = _e.getInstance(), Ys = { class: "stars-board-workspace" }, Vs = ["data-gh-list-drop"], qs = { class: "shelf-header" }, Ks = { class: "shelf-left" }, Xs = { class: "shelf-badge" }, Qs = { class: "shelf-right" }, Js = {
  key: 0,
  class: "shelf-pager"
}, Zs = ["disabled"], eo = { class: "pager-text" }, to = ["disabled"], so = ["disabled", "aria-busy"], oo = ["title"], no = {
  key: 0,
  class: "shelf-cards-scroll"
}, ao = ["onClick", "onDragstart", "onContextmenu"], lo = ["onClick"], io = { class: "gh-card-head" }, ro = ["src"], co = ["href", "title"], uo = { class: "owner" }, po = { class: "gh-card-body" }, ho = { class: "gh-card-badges" }, go = ["title"], mo = ["title"], fo = ["title"], bo = { class: "meta" }, vo = { class: "gh-stars" }, yo = {
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
}, So = ["data-gh-list-drop", "onDragover", "onDragleave", "onDrop"], Ro = { class: "column-header" }, Mo = { class: "column-title-group" }, xo = ["title"], Ao = { class: "badge-count" }, Lo = { class: "column-actions" }, Ho = ["onClick"], Do = { class: "column-cards-scroll" }, Uo = ["onClick", "onDragstart", "onContextmenu"], Eo = ["onClick"], Po = { class: "gh-card-head" }, Io = ["src"], No = ["href", "title"], jo = { class: "owner" }, Fo = { class: "gh-card-body" }, Oo = { class: "gh-card-badges" }, zo = ["title"], Wo = ["onClick"], Bo = ["title"], Yo = ["title"], Vo = ["title"], qo = { class: "meta" }, Ko = { class: "gh-stars" }, Xo = {
  key: 0,
  class: "gh-lang"
}, Qo = { class: "gh-updated" }, Jo = {
  key: 0,
  class: "empty-column-dropzone"
}, Zo = { class: "board-column add-column-panel" }, en = ["onClick"], tn = /* @__PURE__ */ ke({
  __name: "GitHubStarsBoard",
  props: {
    active: { type: Boolean }
  },
  setup(v) {
    const r = v, l = P(null), o = P(null), p = P(!1);
    function f() {
      p.value = !p.value;
    }
    function $(b) {
      const u = o.value;
      u && (Math.abs(b.deltaX) > Math.abs(b.deltaY) && b.deltaX !== 0 || b.deltaY !== 0 && (b.preventDefault(), u.scrollLeft += b.deltaY));
    }
    const g = ee(() => he.loading), m = ee(() => g.value && !he.repos.length), x = P(null), A = P(null), C = P(null);
    let D = null, T = 0;
    function L() {
      D === null && (D = window.setInterval(() => {
        !l.value || T === 0 || (l.value.scrollLeft += T);
      }, 16));
    }
    function M() {
      D !== null && (clearInterval(D), D = null), T = 0;
    }
    const I = $e({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromList: null
    }), H = P(null), V = P(!1);
    function Z() {
      I.visible = !1, I.repo = null, I.fromList = null, H.value = null;
    }
    function Q(b, u, h) {
      b.preventDefault(), b.stopPropagation();
      const k = 190, W = 220, ge = Math.min(b.clientX, window.innerWidth - k - 10), Oe = Math.min(b.clientY, window.innerHeight - W - 10);
      I.x = ge, I.y = Oe, I.repo = u, I.fromList = h, I.visible = !0, H.value = "folder", V.value = ge > window.innerWidth - 380;
    }
    async function ie() {
      const b = I.repo;
      Z(), b && await O.moveRepoToList(b.full_name, K.UNCAT);
    }
    async function re(b) {
      const u = I.repo;
      Z(), u && await O.moveRepoToList(u.full_name, b);
    }
    async function U() {
      const b = I.repo;
      if (Z(), !!b?.html_url)
        try {
          await navigator.clipboard.writeText(b.html_url);
        } catch {
        }
    }
    async function N() {
      const b = I.repo;
      if (Z(), !!b?.full_name)
        try {
          await navigator.clipboard.writeText(`git clone https://github.com/${b.full_name}.git`);
        } catch {
        }
    }
    function F(b) {
      const u = b.target;
      !u?.closest(".fo-cover-context-menu") && !u?.closest(".col-popover-menu") && Z();
    }
    function q(b) {
      b.key === "Escape" && Z();
    }
    function oe(b) {
      const u = l.value;
      if (!u) return;
      const k = b.target?.closest(".column-cards-scroll");
      if (k && k.scrollHeight > k.clientHeight && !b.shiftKey && b.deltaX === 0) {
        const W = k.scrollTop === 0 && b.deltaY < 0, ge = Math.ceil(k.scrollTop + k.clientHeight) >= k.scrollHeight && b.deltaY > 0;
        if (!W && !ge)
          return;
      }
      Math.abs(b.deltaX) > Math.abs(b.deltaY) && b.deltaX !== 0 || b.deltaY !== 0 && (b.preventDefault(), u.scrollLeft += b.deltaY);
    }
    function ae(b) {
      if (!x.value || !l.value) return;
      b.preventDefault();
      const u = b.deltaY !== 0 ? b.deltaY : b.deltaX;
      l.value.scrollLeft += u;
    }
    function de(b) {
      const u = l.value;
      if (!u) return;
      const h = u.getBoundingClientRect(), k = 100;
      if (b > h.right - k) {
        const W = Math.min(1, Math.max(0.1, (b - (h.right - k)) / k));
        T = Math.round(W * 20), L();
      } else if (b < h.left + k) {
        const W = Math.min(1, Math.max(0.1, (h.left + k - b) / k));
        T = -Math.round(W * 20), L();
      } else
        M();
    }
    function pe(b) {
      de(b.clientX);
    }
    function B(b, u, h) {
      Z(), x.value = u, A.value = h, b.dataTransfer && (b.dataTransfer.effectAllowed = "move", b.dataTransfer.setData(st, u.full_name), b.dataTransfer.setData("text/plain", `${u.full_name}:${h || "uncategorized"}`)), window.addEventListener("wheel", ae, { passive: !1 });
    }
    function w() {
      x.value = null, A.value = null, C.value = null, M(), window.removeEventListener("wheel", ae);
    }
    function X(b, u) {
      !r.active || !x.value && !Array.from(b.dataTransfer?.types || []).includes(st) || (b.preventDefault(), b.dataTransfer && (b.dataTransfer.dropEffect = "move"), C.value = u);
    }
    function Ge(b, u) {
      const h = b.currentTarget;
      h && b.relatedTarget instanceof Node && h.contains(b.relatedTarget) || C.value === u && (C.value = null);
    }
    async function Ue(b, u) {
      b.preventDefault();
      const h = x.value?.full_name || pt(b.dataTransfer);
      w(), !(!r.active || !h) && await O.moveRepoToList(h, u === "uncategorized" ? K.UNCAT : u);
    }
    function be(b) {
      ht.open(b.full_name, void 0, b);
    }
    function Ee(b) {
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
      M(), window.removeEventListener("wheel", ae), window.removeEventListener("pointerdown", F), window.removeEventListener("keydown", q);
    }), (b, u) => (s(), n("div", Ys, [
      e("section", {
        class: j(["default-shelf-area", { "is-collapsed": p.value, "drop-active": C.value === "uncategorized" }]),
        "data-gh-list-drop": t(K).UNCAT,
        onDragover: u[6] || (u[6] = (h) => X(h, "uncategorized")),
        onDragleave: u[7] || (u[7] = (h) => Ge(h, "uncategorized")),
        onDrop: u[8] || (u[8] = (h) => Ue(h, "uncategorized"))
      }, [
        e("header", qs, [
          e("div", Ks, [
            u[21] || (u[21] = e("span", { class: "shelf-icon" }, "📁", -1)),
            u[22] || (u[22] = e("span", { class: "shelf-title" }, "未分类 Star 收藏", -1)),
            e("span", Xs, a(t(O).filteredUncatRepos.length), 1),
            u[23] || (u[23] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消本地分组归属；单排 10 个一页）", -1))
          ]),
          e("div", Qs, [
            t(O).filteredUncatRepos.length > t(le).pageSize ? (s(), n("div", Js, [
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(O).uncatPage <= 1,
                title: "上一页",
                onClick: u[0] || (u[0] = //@ts-ignore
                (...h) => t(O).prevUncatPage && t(O).prevUncatPage(...h))
              }, "‹", 8, Zs),
              e("span", eo, a(t(O).uncatPage) + " / " + a(t(O).uncatTotalPages) + " 页", 1),
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(O).uncatPage >= t(O).uncatTotalPages,
                title: "下一页",
                onClick: u[1] || (u[1] = //@ts-ignore
                (...h) => t(O).nextUncatPage && t(O).nextUncatPage(...h))
              }, "›", 8, to)
            ])) : R("", !0),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              title: "刷新 Star 列表",
              disabled: g.value,
              "aria-busy": g.value,
              onClick: u[2] || (u[2] = (h) => t(K).refreshRepositories())
            }, [
              e("span", {
                class: j({ spinning: g.value })
              }, "🔄", 2),
              e("span", null, a(g.value ? "读取中…" : "刷新"), 1)
            ], 8, so),
            t(O).filteredUncatRepos.length ? (s(), n("button", {
              key: 1,
              type: "button",
              class: "shelf-toggle-btn",
              title: p.value ? "展开托盘" : "收起托盘",
              onClick: f
            }, a(p.value ? "展开 ▼" : "收起 ▲"), 9, oo)) : R("", !0)
          ])
        ]),
        m.value ? ue((s(), n("div", no, [
          (s(), n(z, null, Y(6, (h) => e("div", {
            key: "skel-shelf-" + h,
            class: "repo gh-card shelf-card skel-card"
          }, [...u[24] || (u[24] = [
            e("div", { class: "skel-line skel-title" }, null, -1),
            e("div", { class: "skel-line skel-desc" }, null, -1),
            e("div", { class: "skel-line skel-meta" }, null, -1)
          ])])), 64))
        ], 512)), [
          [Ie, !p.value]
        ]) : t(O).filteredUncatRepos.length ? ue((s(), n("div", {
          key: 1,
          ref_key: "shelfScrollRef",
          ref: o,
          class: "shelf-cards-scroll",
          onWheel: $
        }, [
          (s(!0), n(z, null, Y(t(O).pagedUncatRepos, (h) => (s(), n("article", {
            key: h.full_name,
            class: j(["repo gh-card shelf-card", { "card-dragging": x.value?.full_name === h.full_name }]),
            draggable: "true",
            onClick: (k) => be(h),
            onDragstart: (k) => B(k, h, null),
            onDragend: w,
            onContextmenu: (k) => Q(k, h, null)
          }, [
            e("button", {
              class: "fo-card-more",
              type: "button",
              "aria-label": "更多操作",
              title: "更多操作",
              onClick: J((k) => Q(k, h, null), ["stop"])
            }, "⋮", 8, lo),
            e("div", io, [
              e("img", {
                class: "gh-owner-avatar",
                src: h.owner?.avatar_url || "assets/github-star.svg",
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer",
                onError: u[3] || (u[3] = (k) => k.target.src = "assets/github-star.svg")
              }, null, 40, ro),
              e("a", {
                href: h.html_url,
                target: "_blank",
                rel: "noreferrer",
                class: "name",
                title: h.full_name,
                onClick: u[4] || (u[4] = J(() => {
                }, ["stop"]))
              }, [
                e("span", uo, a(h.owner?.login || h.full_name.split("/")[0]) + "/", 1),
                ne(a(h.name), 1)
              ], 8, co)
            ]),
            e("div", po, [
              e("div", ho, [
                u[25] || (u[25] = e("span", { class: "gh-badge-folder uncat" }, "＋ 未分类", -1)),
                h.topics && h.topics.length ? (s(), n(z, { key: 0 }, [
                  (s(!0), n(z, null, Y(h.topics.slice(0, 2), (k) => (s(), n("span", {
                    key: k,
                    class: "gh-badge-topic-chip",
                    title: "Topic: " + k
                  }, " #" + a(k), 9, go))), 128)),
                  h.topics.length > 2 ? (s(), n("span", {
                    key: 0,
                    class: "gh-badge-topic-chip more",
                    title: h.topics.slice(2).map((k) => "#" + k).join(" ")
                  }, " +" + a(h.topics.length - 2), 9, mo)) : R("", !0)
                ], 64)) : R("", !0)
              ]),
              e("p", {
                class: "desc",
                title: h.description || ""
              }, a(h.description || "暂无描述"), 9, fo)
            ]),
            e("div", bo, [
              e("span", vo, "★ " + a(h.stargazers_count), 1),
              h.language ? (s(), n("span", yo, a(h.language), 1)) : R("", !0),
              e("span", wo, "更新 " + a(Ee(h.updated_at)), 1)
            ])
          ], 42, ao))), 128)),
          t(O).uncatPage < t(O).uncatTotalPages ? (s(), n("div", {
            key: 0,
            class: "repo gh-card shelf-card shelf-next-card",
            title: "点击翻到下一页",
            onClick: u[5] || (u[5] = //@ts-ignore
            (...h) => t(O).nextUncatPage && t(O).nextUncatPage(...h))
          }, [
            e("div", _o, [
              u[26] || (u[26] = e("span", { class: "shelf-next-icon" }, "➔", -1)),
              u[27] || (u[27] = e("span", { class: "shelf-next-title" }, "下一页", -1)),
              e("span", ko, a(t(O).uncatPage + 1) + " / " + a(t(O).uncatTotalPages) + " 页", 1)
            ])
          ])) : R("", !0)
        ], 544)), [
          [Ie, !p.value]
        ]) : p.value ? R("", !0) : (s(), n("p", $o, a(t(he).searchQuery ? "没有匹配的未分类仓库" : "暂无未分类 Star 仓库"), 1))
      ], 42, Vs),
      e("div", {
        ref_key: "boardViewportRef",
        ref: l,
        class: "board-viewport",
        onWheel: oe,
        onDragover: pe
      }, [
        g.value && !t(O).lists.length ? (s(), n("div", Co, [
          (s(), n(z, null, Y(4, (h) => e("div", {
            key: "skel-col-" + h,
            class: "board-column skel-column"
          }, [
            u[29] || (u[29] = e("div", { class: "column-header" }, [
              e("div", {
                class: "skel-line",
                style: { width: "120px", height: "16px" }
              })
            ], -1)),
            e("div", Go, [
              (s(), n(z, null, Y(3, (k) => e("div", {
                key: "skel-col-card-" + k,
                class: "repo gh-card skel-card"
              }, [...u[28] || (u[28] = [
                e("div", { class: "skel-line skel-title" }, null, -1),
                e("div", { class: "skel-line skel-desc" }, null, -1),
                e("div", { class: "skel-line skel-meta" }, null, -1)
              ])])), 64))
            ])
          ])), 64))
        ])) : (s(), n("div", To, [
          (s(!0), n(z, null, Y(t(O).lists, (h) => (s(), n("section", {
            key: h.id,
            class: j(["board-column list-column", { "drop-active": C.value === h.name }]),
            "data-gh-list-drop": h.name,
            onDragover: (k) => X(k, h.name),
            onDragleave: (k) => Ge(k, h.name),
            onDrop: (k) => Ue(k, h.name)
          }, [
            e("header", Ro, [
              e("div", Mo, [
                u[30] || (u[30] = e("span", { class: "col-dot list-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: h.description || "本地分组: " + h.name
                }, " 📁 " + a(h.name), 9, xo),
                e("span", Ao, a(t(O).getReposForList(h.name).length), 1)
              ]),
              e("div", Lo, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "删除此本地分组",
                  onClick: (k) => t(K).deleteFolder(h.name)
                }, "✕", 8, Ho)
              ])
            ]),
            e("div", Do, [
              (s(!0), n(z, null, Y(t(O).getReposForList(h.name), (k) => (s(), n("article", {
                key: k.full_name,
                class: j(["repo gh-card", { "card-dragging": x.value?.full_name === k.full_name }]),
                draggable: "true",
                onClick: (W) => be(k),
                onDragstart: (W) => B(W, k, h.name),
                onDragend: w,
                onContextmenu: (W) => Q(W, k, h.name)
              }, [
                e("button", {
                  class: "fo-card-more",
                  type: "button",
                  "aria-label": "更多操作",
                  title: "更多操作",
                  onClick: J((W) => Q(W, k, h.name), ["stop"])
                }, "⋮", 8, Eo),
                e("div", Po, [
                  e("img", {
                    class: "gh-owner-avatar",
                    src: k.owner?.avatar_url || "assets/github-star.svg",
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer",
                    onError: u[9] || (u[9] = (W) => W.target.src = "assets/github-star.svg")
                  }, null, 40, Io),
                  e("a", {
                    href: k.html_url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "name",
                    title: k.full_name,
                    onClick: u[10] || (u[10] = J(() => {
                    }, ["stop"]))
                  }, [
                    e("span", jo, a(k.owner?.login || k.full_name.split("/")[0]) + "/", 1),
                    ne(a(k.name), 1)
                  ], 8, No)
                ]),
                e("div", Fo, [
                  e("div", Oo, [
                    e("span", {
                      class: "gh-badge-folder",
                      title: "属于列表: " + h.name
                    }, [
                      ne(" 📁 " + a(h.name) + " ", 1),
                      e("span", {
                        class: "btn-inline-remove",
                        title: "从该列表中移出",
                        role: "button",
                        tabindex: "0",
                        onClick: J((W) => t(O).removeRepoFromList(k.full_name, h.name), ["stop"])
                      }, "×", 8, Wo)
                    ], 8, zo),
                    k.topics && k.topics.length ? (s(), n(z, { key: 0 }, [
                      (s(!0), n(z, null, Y(k.topics.slice(0, 2), (W) => (s(), n("span", {
                        key: W,
                        class: "gh-badge-topic-chip",
                        title: "Topic: " + W
                      }, " #" + a(W), 9, Bo))), 128)),
                      k.topics.length > 2 ? (s(), n("span", {
                        key: 0,
                        class: "gh-badge-topic-chip more",
                        title: k.topics.slice(2).map((W) => "#" + W).join(" ")
                      }, " +" + a(k.topics.length - 2), 9, Yo)) : R("", !0)
                    ], 64)) : R("", !0)
                  ]),
                  e("p", {
                    class: "desc",
                    title: k.description || ""
                  }, a(k.description || "暂无描述"), 9, Vo)
                ]),
                e("div", qo, [
                  e("span", Ko, "★ " + a(k.stargazers_count), 1),
                  k.language ? (s(), n("span", Xo, a(k.language), 1)) : R("", !0),
                  e("span", Qo, "更新 " + a(Ee(k.updated_at)), 1)
                ])
              ], 42, Uo))), 128)),
              t(O).getReposForList(h.name).length ? R("", !0) : (s(), n("div", Jo, [...u[31] || (u[31] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, So))), 128)),
          e("section", Zo, [
            e("button", {
              type: "button",
              class: "btn-trigger-add-col",
              onClick: u[11] || (u[11] = (h) => t(K).promptCreateFolder())
            }, [...u[32] || (u[32] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", null, "新建本地分组", -1)
            ])])
          ])
        ]))
      ], 544),
      (s(), ce(Ve, { to: "body" }, [
        I.visible && I.repo ? (s(), n("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: qe({ left: `${I.x}px`, top: `${I.y}px` }),
          onClick: u[19] || (u[19] = J(() => {
          }, ["stop"])),
          onContextmenu: u[20] || (u[20] = J(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: j(["gh-menu-has-sub", { "is-active": H.value === "folder" }]),
            onMouseenter: u[14] || (u[14] = (h) => H.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: u[12] || (u[12] = J((h) => H.value = H.value === "folder" ? null : "folder", ["stop"]))
            }, [...u[33] || (u[33] = [
              e("span", null, "移动/加入本地分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: j(["gh-sub-flyout", { "flyout-left": V.value }]),
              onClick: u[13] || (u[13] = J(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: ie
              }, " 设为未分类 "),
              (s(!0), n(z, null, Y(t(O).lists, (h) => (s(), n("button", {
                key: h.id,
                class: j(["fo-cover-menu-item", { primary: t(Ne)(I.repo.full_name).includes(h.name) }]),
                type: "button",
                onClick: (k) => re(h.name)
              }, a(t(Ne)(I.repo.full_name).includes(h.name) ? "✓ " : "  ") + "📁 " + a(h.name), 11, en))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: u[15] || (u[15] = (h) => H.value = null),
            onClick: u[16] || (u[16] = (h) => be(I.repo))
          }, " 查看仓库详情 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: u[17] || (u[17] = (h) => H.value = null),
            onClick: U
          }, " 复制仓库链接 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: u[18] || (u[18] = (h) => H.value = null),
            onClick: N
          }, " 复制克隆命令 (git clone) ", 32)
        ], 36)) : R("", !0)
      ]))
    ]));
  }
}), sn = /* @__PURE__ */ Ce(tn, [["__scopeId", "data-v-347538c6"]]);
function on(v) {
  const r = v.subject?.url, l = v.repository?.html_url || "https://github.com";
  if (!r) return l;
  const o = v.subject?.type;
  return o === "Issue" ? r.replace("https://api.github.com/repos/", "https://github.com/") : o === "PullRequest" ? r.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : o === "Release" ? r.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : r.replace("https://api.github.com/repos/", "https://github.com/");
}
function nn(v) {
  try {
    const r = Date.now() - new Date(v).getTime();
    if (r < 6e4) return "刚刚";
    const l = Math.floor(r / 6e4);
    if (l < 60) return `${l} 分钟前`;
    const o = Math.floor(l / 60);
    if (o < 24) return `${o} 小时前`;
    const p = Math.floor(o / 24);
    return p < 30 ? `${p} 天前` : v.slice(5, 10);
  } catch {
    return "";
  }
}
const E = $e({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), ye = {
  open() {
    E.isOpen = !0, (!E.items.length || Date.now() - E.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    E.isOpen = !1;
  },
  toggle() {
    E.isOpen ? this.close() : this.open();
  },
  setTab(v) {
    E.activeKind = v;
  },
  async refresh() {
    const v = K.token?.trim();
    if (!v) {
      E.items = [], E.unreadCount = 0, E.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    E.loading = !0, E.error = "";
    try {
      const r = {
        ...De(v),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, l = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: r
      });
      if (!l.ok)
        throw l.status === 401 ? new Error("GitHub Token 无效或已过期") : l.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${l.status})`);
      const o = await l.json();
      if (!Array.isArray(o))
        throw new Error("GitHub 返回数据异常");
      const p = o.map((f) => ({
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
      E.items = p, E.unreadCount = p.filter((f) => f.unread).length, E.lastFetchedAt = Date.now();
    } catch (r) {
      console.warn("[GitHubNotifications] 读取失败:", r), E.error = r?.message || "网络请求异常";
    } finally {
      E.loading = !1;
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
    const r = Date.now() - new Date(v).getTime(), l = Math.floor(r / 6e4);
    if (l < 1) return "刚刚";
    if (l < 60) return `${l}分钟前`;
    const o = Math.floor(l / 60);
    if (o < 24) return `${o}小时前`;
    const p = Math.floor(o / 24);
    if (p < 30) return `${p}天前`;
    const f = new Date(v);
    return `${f.getFullYear()}/${f.getMonth() + 1}/${f.getDate()}`;
  } catch {
    return "";
  }
}
function He(v) {
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
  return v.map((l) => ({
    emoji: r[l.content] || l.content,
    count: l.reactors?.totalCount || l.users?.totalCount || 0
  })).filter((l) => l.count > 0);
}
function at(v) {
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
  }, l = [];
  for (const [o, p] of Object.entries(r)) {
    const f = Number(v[o] || 0);
    f > 0 && l.push({ emoji: p, count: f });
  }
  return l;
}
async function lt(v, r) {
  if (!v) return "";
  try {
    const l = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...De(r),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: v, mode: "gfm" })
    });
    if (l.ok)
      return await l.text();
  } catch {
  }
  return fe.renderMarkdown(v);
}
async function ln(v, r, l, o) {
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
        ...De(o),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: p,
        variables: { owner: v, name: r, num: l }
      })
    });
    if (!f.ok) return null;
    const g = (await f.json())?.data?.repository?.discussion;
    if (!g) return null;
    let m = 0;
    const x = (g.comments?.nodes || []).map((D) => {
      const T = D.replies?.nodes || [];
      m += T.length;
      const L = T.map((M) => ({
        id: M.id,
        author: {
          login: M.author?.login || "匿名",
          avatarUrl: M.author?.avatarUrl || "",
          association: He(M.authorAssociation)
        },
        createdAt: M.createdAt,
        formattedTime: Le(M.createdAt),
        body: M.body || "",
        bodyHtml: M.bodyHTML || (M.body ? fe.renderMarkdown(M.body) : ""),
        reactions: Be(M.reactionGroups)
      }));
      return {
        id: D.id,
        author: {
          login: D.author?.login || "匿名",
          avatarUrl: D.author?.avatarUrl || "",
          association: He(D.authorAssociation)
        },
        createdAt: D.createdAt,
        formattedTime: Le(D.createdAt),
        body: D.body || "",
        bodyHtml: D.bodyHTML || (D.body ? fe.renderMarkdown(D.body) : "<p>（评论内容为空）</p>"),
        reactions: Be(D.reactionGroups),
        replies: L
      };
    }), A = g.body || "", C = g.bodyHTML && g.bodyHTML.trim().length > 10 ? g.bodyHTML : A ? fe.renderMarkdown(A) : "<p>（主贴内容为空）</p>";
    return {
      title: g.title,
      number: l,
      state: "discussion",
      category: g.category ? {
        name: g.category.name,
        emoji: an(g.category.emoji)
      } : void 0,
      author: {
        login: g.author?.login || "未知",
        avatarUrl: g.author?.avatarUrl || "",
        association: He(g.authorAssociation)
      },
      createdAt: g.createdAt,
      formattedTime: Le(g.createdAt),
      body: A,
      bodyHtml: C,
      htmlUrl: g.url,
      commentsCount: g.comments?.totalCount || x.length,
      totalRepliesCount: m,
      comments: x,
      reactions: Be(g.reactionGroups)
    };
  } catch {
    return null;
  }
}
const Ye = {
  async open(v) {
    y.isOpen = !0, y.loading = !0, y.error = "", y.data = null, y.notificationItem = v;
    const r = K.token?.trim() || "", l = {
      ...De(r),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const o = v.subject?.url, p = v.subject?.type, f = v.repository?.fullName || "", [$, g] = f.split("/"), m = o?.match(/\/(\d+)$/), x = m ? Number(m[1]) : void 0;
      if (p === "Discussion" && $ && g && x) {
        const A = await ln($, g, x, r);
        if (A) {
          y.data = {
            notificationId: v.id,
            title: A.title || v.subject.title,
            number: x,
            state: "discussion",
            category: A.category,
            author: A.author || { login: v.repository.owner.login, avatarUrl: v.repository.owner.avatarUrl || "" },
            createdAt: A.createdAt || v.updatedAt,
            formattedTime: A.formattedTime || v.formattedTime,
            body: A.body || "",
            bodyHtml: A.bodyHtml || (A.body ? fe.renderMarkdown(A.body) : ""),
            htmlUrl: A.htmlUrl || v.htmlUrl,
            commentsCount: A.commentsCount || 0,
            totalRepliesCount: A.totalRepliesCount || 0,
            comments: A.comments || [],
            reactions: A.reactions || [],
            repositoryFullName: f,
            type: "Discussion"
          };
          return;
        }
      }
      if (o) {
        const A = await fetch(o, { headers: l, cache: "no-store" });
        if (A.ok) {
          const C = await A.json();
          let D = [];
          if (C.comments_url && C.comments > 0)
            try {
              const M = await fetch(`${C.comments_url}?per_page=50`, { headers: l, cache: "no-store" });
              if (M.ok) {
                const I = await M.json();
                Array.isArray(I) && (D = await Promise.all(
                  I.map(async (H) => {
                    const V = H.body_html || (H.body ? await lt(H.body, r) : "");
                    return {
                      id: H.id,
                      author: {
                        login: H.user?.login || "匿名",
                        avatarUrl: H.user?.avatar_url || "",
                        association: He(H.author_association)
                      },
                      createdAt: H.created_at,
                      formattedTime: Le(H.created_at),
                      body: H.body || "",
                      bodyHtml: V,
                      reactions: at(H.reactions)
                    };
                  })
                ));
              }
            } catch (M) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", M);
            }
          const T = C.body || "";
          let L = C.body_html || "";
          !L && T && (L = await lt(T, r)), !L && T && (L = fe.renderMarkdown(T)), y.data = {
            notificationId: v.id,
            title: C.title || C.name || v.subject.title,
            number: C.number || x,
            state: C.merged ? "merged" : C.state || C.conclusion || "open",
            author: {
              login: C.user?.login || C.author?.login || v.repository.owner.login,
              avatarUrl: C.user?.avatar_url || C.author?.avatar_url || v.repository.owner.avatarUrl || "",
              association: He(C.author_association)
            },
            createdAt: C.created_at || C.published_at || v.updatedAt,
            formattedTime: Le(C.created_at || C.published_at || v.updatedAt),
            body: T,
            bodyHtml: L || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: C.html_url || v.htmlUrl,
            commentsCount: typeof C.comments == "number" ? C.comments : D.length,
            comments: D,
            reactions: at(C.reactions),
            repositoryFullName: f,
            type: p || "Issue"
          };
          return;
        }
      }
      y.data = {
        notificationId: v.id,
        title: v.subject.title,
        number: x,
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
    } catch (o) {
      console.warn("[GitHubNotificationDetail] 读取异常:", o), y.error = o?.message || "网络请求异常";
    } finally {
      y.loading = !1;
    }
  },
  close() {
    y.isOpen = !1, y.data = null, y.error = "";
  }
}, rn = { class: "vue-gh-notification-panel-wrapper" }, cn = { class: "gh-msg-header" }, un = { class: "gh-msg-account" }, dn = { class: "gh-msg-subtitle" }, pn = {
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
}, kn = { class: "gh-card-type-col" }, $n = ["title"], Cn = { class: "gh-card-main-col" }, Gn = { class: "gh-card-repo-row" }, Tn = ["title"], Sn = { class: "gh-card-reason-tag" }, Rn = { class: "gh-card-time" }, Mn = ["title"], xn = { class: "gh-card-footer-row" }, An = { class: "gh-card-type-label" }, Ln = ["onClick"], Hn = /* @__PURE__ */ ke({
  __name: "GitHubNotificationPanel",
  setup(v) {
    const r = P(null), l = ee(() => [
      { kind: "all", label: "所有", count: E.items.length },
      { kind: "unread", label: "未读", count: E.items.filter((T) => T.unread).length },
      { kind: "mention", label: "提及", count: E.items.filter((T) => T.reason === "mention").length },
      { kind: "author", label: "作者", count: E.items.filter((T) => T.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: E.items.filter((T) => T.reason === "ci_activity" || T.subject.type === "CheckSuite").length }
    ]), o = ee(() => {
      const T = E.items;
      switch (E.activeKind) {
        case "unread":
          return T.filter((L) => L.unread);
        case "mention":
          return T.filter((L) => L.reason === "mention");
        case "author":
          return T.filter((L) => L.reason === "author");
        case "ci":
          return T.filter((L) => L.reason === "ci_activity" || L.subject.type === "CheckSuite");
        default:
          return T;
      }
    });
    function p(T, L) {
      if (L === "ci_activity" || T === "CheckSuite")
        return "⚡";
      switch (T) {
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
    function f(T) {
      switch (T) {
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
          return T || "通知";
      }
    }
    function $() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function g() {
      ye.refresh();
    }
    function m() {
      ye.close();
    }
    function x(T) {
      Ye.open(T);
    }
    function A(T) {
      ye.openTarget(T);
    }
    function C(T) {
      if (!E.isOpen) return;
      const L = T.target;
      !r.value?.contains(L) && !L?.closest("#gh-header-msg-center-btn") && ye.close();
    }
    function D(T) {
      T.key === "Escape" && E.isOpen && ye.close();
    }
    return je(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", C), window.addEventListener("keydown", D));
    }), Fe(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", C), window.removeEventListener("keydown", D));
    }), (T, L) => (s(), n("div", rn, [
      t(E).isOpen ? (s(), n("section", {
        key: 0,
        ref_key: "panelRef",
        ref: r,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: L[0] || (L[0] = J(() => {
        }, ["stop"]))
      }, [
        e("header", cn, [
          e("div", un, [
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
              e("p", dn, " 共 " + a(t(E).items.length) + " 条通知 · " + a(t(E).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          L[3] || (L[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: $
          }, " ↗ "),
          e("button", {
            type: "button",
            class: j(["gh-panel-btn", { "is-spinning": t(E).loading }]),
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
          (s(!0), n(z, null, Y(l.value, (M) => (s(), n("button", {
            key: M.kind,
            type: "button",
            class: j(["gh-msg-tab", { active: t(E).activeKind === M.kind }]),
            onClick: (I) => t(E).activeKind = M.kind
          }, [
            ne(a(M.label) + " ", 1),
            M.count > 0 ? (s(), n("span", {
              key: 0,
              class: j(["gh-tab-pill", { "is-unread-pill": M.kind === "unread" }])
            }, a(M.count), 3)) : R("", !0)
          ], 10, hn))), 128))
        ]),
        e("div", gn, [
          t(E).loading && !t(E).items.length ? (s(), n("div", mn, [...L[4] || (L[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : t(E).error ? (s(), n("div", fn, [
            L[5] || (L[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, a(t(E).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: g
            }, "重试")
          ])) : o.value.length === 0 ? (s(), n("div", bn, [...L[6] || (L[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (s(!0), n(z, { key: 3 }, Y(o.value, (M) => (s(), n("article", {
            key: M.id,
            class: j(["gh-notification-card", { "is-unread": M.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (I) => x(M)
          }, [
            e("div", yn, [
              M.unread ? (s(), n("span", wn)) : (s(), n("span", _n))
            ]),
            e("div", kn, [
              e("span", {
                class: "gh-type-badge",
                title: M.subject.type
              }, a(p(M.subject.type, M.reason)), 9, $n)
            ]),
            e("div", Cn, [
              e("div", Gn, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: M.repository.fullName
                }, a(M.repository.fullName), 9, Tn),
                e("span", Sn, a(f(M.reason)), 1),
                e("time", Rn, a(M.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: M.subject.title
              }, a(M.subject.title), 9, Mn),
              e("div", xn, [
                e("span", An, a(M.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: J((I) => A(M), ["stop"])
                }, "在网页打开 ↗", 8, Ln)
              ])
            ])
          ], 10, vn))), 128))
        ])
      ], 512)) : R("", !0)
    ]));
  }
}), Dn = /* @__PURE__ */ Ce(Hn, [["__scopeId", "data-v-4271efab"]]), Un = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, En = ["aria-label"], Pn = { class: "gh-modal-title-wrap" }, In = { class: "gh-modal-octo-icon" }, Nn = ["href"], jn = { class: "gh-owner" }, Fn = { class: "gh-name" }, On = {
  key: 1,
  class: "gh-modal-repo-name"
}, zn = { class: "gh-name" }, Wn = { class: "gh-modal-actions" }, Bn = { class: "gh-modal-content" }, Yn = {
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
}, na = { class: "gh-op-post-card" }, aa = { class: "gh-op-post-head" }, la = { class: "gh-op-author-left" }, ia = ["src"], ra = { class: "gh-op-meta" }, ca = { class: "gh-op-name-row" }, ua = { class: "gh-op-name" }, da = {
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
}, Ma = { class: "rx-emoji" }, xa = { class: "rx-count" }, Aa = {
  key: 1,
  class: "gh-comment-replies-thread"
}, La = { class: "gh-replies-thread-title" }, Ha = { class: "gh-reply-head" }, Da = ["src"], Ua = { class: "gh-reply-meta" }, Ea = { class: "gh-reply-author" }, Pa = {
  key: 0,
  class: "gh-role-pill tiny"
}, Ia = { class: "gh-reply-time" }, Na = ["innerHTML"], ja = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, Fa = { class: "rx-emoji" }, Oa = { class: "rx-count" }, za = {
  key: 1,
  class: "gh-no-comments"
}, Wa = /* @__PURE__ */ ke({
  __name: "GitHubNotificationDetailDrawer",
  setup(v) {
    const r = P(null), l = P(null), o = P(null);
    let p = !1, f = 0, $ = 0, g = 0, m = 0, x = () => {
    };
    const A = ee(() => (y.data?.repositoryFullName || y.notificationItem?.repository.fullName || "").split("/")[0] || ""), C = ee(() => {
      const U = y.data?.repositoryFullName || y.notificationItem?.repository.fullName || "";
      return U.split("/")[1] || U;
    }), D = ee(() => {
      if (!y.data) return "";
      const U = y.data.bodyHtml?.trim() || "";
      if (U.length > 20) return U;
      const N = y.data.body?.trim() || "";
      return N.length > 0 ? fe.renderMarkdown(N) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), T = ee(() => o.value ? {
      position: "fixed",
      left: `${o.value.x}px`,
      top: `${o.value.y}px`,
      transform: "none"
    } : {});
    me(
      () => y.isOpen,
      (U) => {
        U && (o.value = null, et(() => {
          l.value && (l.value.scrollTop = 0);
        }));
      }
    ), me(
      () => y.data,
      (U) => {
        U && et(() => {
          l.value && (l.value.scrollTop = 0);
        });
      }
    );
    function L(U) {
      if (U.target.closest("button, a, input")) return;
      x();
      const N = r.value;
      if (!N || !y.isOpen) return;
      p = !0;
      const F = N.getBoundingClientRect();
      g = F.left, m = F.top, f = U.clientX, $ = U.clientY, o.value = { x: g, y: m };
      const q = (ae) => {
        if (!p) return;
        const de = ae.clientX - f, pe = ae.clientY - $;
        o.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, g + de)),
          y: Math.max(10, Math.min(window.innerHeight - 80, m + pe))
        };
      }, oe = () => {
        p = !1, window.removeEventListener("mousemove", q), window.removeEventListener("mouseup", oe);
      };
      x = oe, window.addEventListener("mousemove", q), window.addEventListener("mouseup", oe);
    }
    function M() {
      Ye.close();
    }
    function I() {
      const U = y.data?.htmlUrl || y.notificationItem?.htmlUrl;
      U && typeof window < "u" && window.open(U, "_blank", "noopener,noreferrer");
    }
    function H(U) {
      const F = U.target?.closest("a");
      F && F.href && (U.preventDefault(), U.stopPropagation(), window.open(F.href, "_blank", "noopener,noreferrer"));
    }
    function V() {
      y.notificationItem && Ye.open(y.notificationItem);
    }
    function Z(U) {
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
    function Q(U) {
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
    function ie(U) {
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
    function re(U) {
      U.key === "Escape" && y.isOpen && M();
    }
    return je(() => {
      window.addEventListener("keydown", re);
    }), Fe(() => {
      window.removeEventListener("keydown", re), x();
    }), (U, N) => (s(), ce(Ve, { to: "body" }, [
      t(y).isOpen ? (s(), n("div", Un, [
        e("div", {
          ref_key: "windowRef",
          ref: r,
          class: "gh-nonmodal-window",
          style: qe(T.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": t(y).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: L
          }, [
            e("div", Pn, [
              e("span", In, a(Z(t(y).data?.type || t(y).notificationItem?.subject.type)), 1),
              t(y).data?.htmlUrl || t(y).notificationItem?.htmlUrl ? (s(), n("a", {
                key: 0,
                href: t(y).data?.htmlUrl || t(y).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", jn, a(A.value), 1),
                N[0] || (N[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", Fn, a(C.value), 1),
                N[1] || (N[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, Nn)) : (s(), n("span", On, [
                e("strong", zn, a(t(y).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", Wn, [
              t(y).data?.state ? (s(), n("span", {
                key: 0,
                class: j(["gh-detail-state-pill", t(y).data.state])
              }, a(ie(t(y).data.state)), 3)) : R("", !0),
              t(y).data?.htmlUrl || t(y).notificationItem?.htmlUrl ? (s(), n("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: I
              }, " 在网页打开 ↗ ")) : R("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: M
              }, " ✕ ")
            ])
          ], 32),
          e("div", Bn, [
            t(y).loading ? (s(), n("div", Yn, [
              N[2] || (N[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + a(t(y).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : t(y).error ? (s(), n("div", Vn, [
              N[3] || (N[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, a(t(y).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: V
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: I
                }, "在 GitHub 打开 ↗")
              ])
            ])) : t(y).data ? (s(), n("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: l,
              class: "gh-detail-scrollable",
              onClick: H
            }, [
              e("div", qn, [
                e("h1", Kn, [
                  ne(a(t(y).data.title) + " ", 1),
                  t(y).data.number ? (s(), n("span", Xn, "#" + a(t(y).data.number), 1)) : R("", !0)
                ]),
                e("div", Qn, [
                  t(y).data.category ? (s(), n("span", Jn, [
                    t(y).data.category.emoji ? (s(), n("span", Zn, a(t(y).data.category.emoji), 1)) : R("", !0),
                    e("span", null, a(t(y).data.category.name), 1)
                  ])) : (s(), n("span", ea, a(Q(t(y).data.type)), 1)),
                  e("span", ta, a(t(y).data.author.login), 1),
                  e("span", sa, "发布于 " + a(t(y).data.formattedTime), 1),
                  t(y).data.commentsCount ? (s(), n("span", oa, [
                    ne(" · " + a(t(y).data.commentsCount) + " 条讨论主题 ", 1),
                    t(y).data.totalRepliesCount ? (s(), n(z, { key: 0 }, [
                      ne(" （含 " + a(t(y).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : R("", !0)
                  ])) : R("", !0)
                ])
              ]),
              e("article", na, [
                e("div", aa, [
                  e("div", la, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: t(y).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, ia),
                    e("div", ra, [
                      e("div", ca, [
                        e("strong", ua, a(t(y).data.author.login), 1),
                        t(y).data.author.association ? (s(), n("span", da, a(t(y).data.author.association), 1)) : R("", !0)
                      ]),
                      e("time", pa, a(t(y).data.formattedTime), 1)
                    ])
                  ]),
                  N[4] || (N[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                N[5] || (N[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: D.value
                }, null, 8, ha),
                t(y).data.reactions?.length ? (s(), n("div", ga, [
                  (s(!0), n(z, null, Y(t(y).data.reactions, (F) => (s(), n("span", {
                    key: F.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", ma, a(F.emoji), 1),
                    e("span", fa, a(F.count), 1)
                  ]))), 128))
                ])) : R("", !0)
              ]),
              t(y).data.comments.length ? (s(), n("div", ba, [
                e("div", va, [
                  N[6] || (N[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", ya, [
                    ne(a(t(y).data.commentsCount) + " 条主题 ", 1),
                    t(y).data.totalRepliesCount ? (s(), n(z, { key: 0 }, [
                      ne(" · " + a(t(y).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : R("", !0)
                  ])
                ]),
                e("div", wa, [
                  (s(!0), n(z, null, Y(t(y).data.comments, (F) => (s(), n("div", {
                    key: F.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", _a, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: F.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, ka),
                      e("div", $a, [
                        e("span", Ca, a(F.author.login), 1),
                        F.author.association ? (s(), n("span", Ga, a(F.author.association), 1)) : R("", !0),
                        e("time", Ta, a(F.formattedTime), 1)
                      ])
                    ]),
                    N[7] || (N[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: F.bodyHtml
                    }, null, 8, Sa),
                    F.reactions?.length ? (s(), n("div", Ra, [
                      (s(!0), n(z, null, Y(F.reactions, (q) => (s(), n("span", {
                        key: q.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", Ma, a(q.emoji), 1),
                        e("span", xa, a(q.count), 1)
                      ]))), 128))
                    ])) : R("", !0),
                    F.replies?.length ? (s(), n("div", Aa, [
                      e("div", La, [
                        e("span", null, "💬 " + a(F.replies.length) + " 条回复对话", 1)
                      ]),
                      (s(!0), n(z, null, Y(F.replies, (q) => (s(), n("div", {
                        key: q.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", Ha, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: q.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, Da),
                          e("div", Ua, [
                            e("strong", Ea, a(q.author.login), 1),
                            q.author.association ? (s(), n("span", Pa, a(q.author.association), 1)) : R("", !0),
                            e("time", Ia, a(q.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: q.bodyHtml
                        }, null, 8, Na),
                        q.reactions?.length ? (s(), n("div", ja, [
                          (s(!0), n(z, null, Y(q.reactions, (oe) => (s(), n("span", {
                            key: oe.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", Fa, a(oe.emoji), 1),
                            e("span", Oa, a(oe.count), 1)
                          ]))), 128))
                        ])) : R("", !0)
                      ]))), 128))
                    ])) : R("", !0)
                  ]))), 128))
                ])
              ])) : (s(), n("div", za, [...N[8] || (N[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : R("", !0)
          ])
        ], 12, En)
      ])) : R("", !0)
    ]));
  }
}), Ba = /* @__PURE__ */ Ce(Wa, [["__scopeId", "data-v-d22ba06c"]]), Ya = [
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
}, yl = { class: "fo-sidebar-sub-wrap" }, wl = ["title"], _l = { class: "fo-sidebar-sub-main" }, kl = { class: "fo-sidebar-sub-text" }, $l = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Cl = ["title"], Gl = { class: "fo-sidebar-sub-main" }, Tl = { class: "fo-sidebar-sub-text" }, Sl = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Rl = ["title"], Ml = { class: "fo-sidebar-sub-main" }, xl = { class: "fo-sidebar-sub-text" }, Al = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, Ll = ["title"], Hl = { class: "fo-sidebar-sub-main" }, Dl = { class: "fo-sidebar-sub-text" }, Ul = { class: "gh-bili-sidebar-head" }, El = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, Pl = { style: { color: "var(--dim)", "font-size": "9.5px" } }, Il = { style: { display: "flex", "align-items": "center", gap: "6px" } }, Nl = ["aria-expanded"], jl = ["title", "aria-label"], Fl = {
  class: "gh-bili-folder-list",
  id: "gh-folder-list"
}, Ol = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, zl = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, Wl = {
  id: "vue-github-repositories-root",
  style: { flex: "1", "min-height": "0", display: "flex", "flex-direction": "column" }
}, Bl = /* @__PURE__ */ ke({
  __name: "GitHubWorkspaceCard",
  setup(v) {
    const r = tt(() => import("./GitHubSettingsModal-DAo58SdO.js")), l = tt(() => import("./LauncherBookGuideDialog-AvNz964d.js")), { active: o } = dt("card-github", "/github.html");
    let p = 0, f = !1, $;
    const g = P(""), m = P("stars");
    me(() => o.value && m.value === "stars", (B) => K.setAiViewActive(B), { immediate: !0, flush: "sync" });
    const x = P(!1), A = P("local"), C = P(""), D = P(!1), T = P(!1);
    me(o, (B) => {
      B || (T.value = !1);
    });
    const L = P(0);
    function M() {
      o.value && (D.value = !0, ++L.value);
    }
    const I = P(!1);
    me(D, (B) => {
      B && (I.value = !0);
    });
    const H = P(null);
    let V = 0;
    function Z(B) {
      m.value = B, B === "trending" ? ot.switchTab("trending") : ot.switchTab("stars");
    }
    function Q() {
      m.value = "stars";
    }
    const ie = ee(() => [
      { id: "exact", icon: "🎯", name: G("search.rule.exact"), desc: G("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: G("search.rule.fuzzy"), desc: G("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: G("search.rule.topic"), desc: G("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: G("search.rule.smart"), desc: G("search.rule.smartDesc") }
    ]), re = P(K.searchRule || "exact"), U = ee(() => ie.value.find((B) => B.id === re.value) || ie.value[0]);
    function N() {
      const B = K.cycleSearchRule();
      re.value = B;
    }
    const F = ee(() => A.value === "global" ? G("github.searchGlobalPlaceholder") : G("github.searchLocalPlaceholder", { rule: U.value.name }));
    function q() {
      clearTimeout(V), !(!o.value || A.value !== "local") && (V = window.setTimeout(() => K.setSearchQuery(C.value.trim().toLowerCase()), 180));
    }
    function oe() {
      A.value = A.value === "local" ? "global" : "local", A.value === "local" && q();
    }
    function ae() {
      C.value = "", clearTimeout(V), K.resetLocalSearch();
    }
    function de() {
      const B = C.value.trim();
      A.value === "local" ? (clearTimeout(V), K.setSearchQuery(B.toLowerCase())) : B && window.open(`https://github.com/search?q=${encodeURIComponent(B)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function pe() {
      ++p, f = !0, g.value = "";
    }
    return me(o, async (B) => {
      if (clearTimeout(V), !B) return;
      const w = ++p;
      if ((!$ || $.signal.aborted) && ($ = new AbortController(), K.setRepositoryViewSignal($.signal)), f) {
        await K.resumeRepositoryReads();
        return;
      }
      if (K.repos.length || K.loadingAllStars || K.loadingPage) {
        f = !0;
        return;
      }
      try {
        const X = await it();
        if (w !== p || $.signal.aborted) return;
        f = !0, await K.loadGitHub(X.ghUser, X.ghToken);
      } catch {
        if (w !== p || $?.signal.aborted) return;
        f = !1, g.value = G("github.initError");
      }
    }, { immediate: !0, flush: "sync" }), ct(() => {
      K.setAiViewActive(!1), ++p, $?.abort(), clearTimeout(V);
    }), (B, w) => (s(), n("section", {
      class: j(["card wide", { "card-fullscreen": t(wt).activeId === "card-github" }]),
      id: "card-github",
      inert: !t(o)
    }, [
      e("header", qa, [
        w[17] || (w[17] = e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }, null, -1)),
        w[18] || (w[18] = e("h2", null, "GitHub", -1)),
        w[19] || (w[19] = e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        }, null, -1)),
        e("div", Ka, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: J(de, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: A.value === "local" ? t(G)("github.searchScope.toGlobal") : t(G)("github.searchScope.toLocal"),
              onClick: oe
            }, [
              e("span", Qa, a(A.value === "local" ? "⭐" : "🌐"), 1),
              e("span", Ja, a(A.value === "local" ? t(G)("github.searchScope.local") : t(G)("github.searchScope.global")), 1),
              w[13] || (w[13] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, Xa),
            ue(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": w[0] || (w[0] = (X) => C.value = X),
              placeholder: F.value,
              autocomplete: "off",
              onInput: q
            }, null, 40, Za), [
              [Ae, C.value]
            ]),
            A.value === "local" ? (s(), n("button", {
              key: 0,
              type: "button",
              class: j(["gh-search-rule-btn", `rule-${U.value.id}`]),
              title: t(G)("github.ruleHint", { rule: U.value.name, desc: U.value.desc }),
              onClick: J(N, ["stop"])
            }, [
              e("span", tl, a(U.value.icon), 1),
              e("span", sl, a(U.value.name), 1)
            ], 10, el)) : R("", !0),
            ue(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: t(G)("github.clearSearch"),
              onClick: ae
            }, "✕", 8, ol), [
              [Ie, C.value]
            ]),
            w[14] || (w[14] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          w[15] || (w[15] = ut('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-2c644ba0><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-2c644ba0><input type="checkbox" value="exact" checked data-v-2c644ba0>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-2c644ba0><input type="checkbox" value="loose" data-v-2c644ba0>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-2c644ba0><input type="checkbox" value="related" data-v-2c644ba0>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-2c644ba0><input type="checkbox" value="topic" data-v-2c644ba0>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-2c644ba0><input type="checkbox" value="readme" data-v-2c644ba0>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-2c644ba0></div>', 2))
        ]),
        e("button", {
          id: "gh-header-msg-center-btn",
          class: j(["gh-header-msg-btn", { "has-unread": t(E).unreadCount > 0, "is-active": t(E).isOpen }]),
          type: "button",
          title: t(E).unreadCount > 0 ? t(G)("github.header.msgUnread", { count: t(E).unreadCount }) : t(G)("github.header.msgCenter"),
          onClick: w[1] || (w[1] = (X) => t(ye).toggle())
        }, [
          w[16] || (w[16] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
          e("span", al, a(t(G)("github.header.msg")), 1),
          t(E).unreadCount > 0 ? (s(), n("span", ll, a(t(E).unreadCount > 99 ? "99+" : t(E).unreadCount), 1)) : R("", !0)
        ], 10, nl),
        e("div", il, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: H,
            "aria-expanded": D.value,
            "aria-label": t(G)("github.settings"),
            class: "gh-head-settings-btn",
            title: t(G)("github.header.settings"),
            onClick: w[2] || (w[2] = (X) => D.value = !D.value)
          }, " ⚙️ ", 8, rl),
          I.value ? (s(), ce(t(r), {
            key: 0,
            visible: t(o) && D.value,
            anchor: H.value,
            "ai-request": L.value,
            onAccountReload: pe,
            onClose: w[3] || (w[3] = (X) => D.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : R("", !0)
        ])
      ]),
      g.value ? (s(), n("p", cl, a(g.value), 1)) : R("", !0),
      e("div", ul, [
        e("div", dl, [
          e("aside", pl, [
            e("div", {
              class: j(["fo-sidebar-toggle-bar", { "is-collapsed": x.value }]),
              title: x.value ? t(G)("github.channel.toggleExpand") : t(G)("github.channel.toggleCollapse"),
              onClick: w[4] || (w[4] = (X) => x.value = !x.value)
            }, [
              e("div", gl, [
                w[20] || (w[20] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, a(t(G)("github.channel.channels")), 1),
                x.value ? (s(), n("span", ml, "3")) : R("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !x.value,
                title: x.value ? t(G)("github.expand") : t(G)("github.collapse")
              }, [
                e("span", null, a(x.value ? t(G)("github.expand") : t(G)("github.collapse")), 1),
                e("span", bl, a(x.value ? "▾" : "▴"), 1)
              ], 8, fl)
            ], 10, hl),
            x.value ? R("", !0) : (s(), n("div", vl, [
              e("div", yl, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: m.value === "stars" }]),
                  title: t(G)("github.channel.starsTitle"),
                  onClick: w[5] || (w[5] = (X) => Z("stars"))
                }, [
                  e("div", _l, [
                    w[21] || (w[21] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", kl, [
                      e("strong", null, a(t(G)("github.channel.stars")), 1),
                      e("small", null, a(t(G)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  w[22] || (w[22] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, wl)
              ]),
              e("div", $l, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: m.value === "trending" }]),
                  title: t(G)("github.channel.trendingTitle"),
                  onClick: w[6] || (w[6] = (X) => Z("trending"))
                }, [
                  e("div", Gl, [
                    w[23] || (w[23] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", Tl, [
                      e("strong", null, a(t(G)("github.channel.trending")), 1),
                      e("small", null, a(t(G)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  w[24] || (w[24] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, Cl)
              ]),
              e("div", Sl, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: m.value === "awesome" }]),
                  title: t(G)("github.channel.awesomeTitle"),
                  onClick: w[7] || (w[7] = (X) => Z("awesome"))
                }, [
                  e("div", Ml, [
                    w[25] || (w[25] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", xl, [
                      e("strong", null, a(t(G)("github.channel.awesome")), 1),
                      e("small", null, a(t(G)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  w[26] || (w[26] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, Rl)
              ]),
              e("div", Al, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: m.value === "repos" }]),
                  title: t(G)("github.channel.reposTitle"),
                  onClick: w[8] || (w[8] = (X) => Z("repos"))
                }, [
                  e("div", Hl, [
                    w[27] || (w[27] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", Dl, [
                      e("strong", null, a(t(G)("github.channel.repos")), 1),
                      e("small", null, a(t(G)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  w[28] || (w[28] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, Ll)
              ])
            ])),
            e("header", Ul, [
              e("div", null, [
                e("b", El, [
                  w[29] || (w[29] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  ne(" " + a(t(G)("github.lists.title")), 1)
                ]),
                e("small", Pl, a(t(G)("github.lists.sub")), 1)
              ]),
              e("span", Il, [
                e("button", {
                  class: "fo-sidebar-add gh-github-help",
                  type: "button",
                  title: "GitHub 使用手册",
                  "aria-label": "打开 GitHub 使用手册",
                  "aria-expanded": T.value,
                  onClick: w[9] || (w[9] = (X) => T.value = !T.value)
                }, "?", 8, Nl),
                e("button", {
                  class: "fo-sidebar-add",
                  id: "gh-folder-add-btn",
                  type: "button",
                  title: t(G)("github.lists.new"),
                  "aria-label": t(G)("github.lists.new"),
                  onClick: w[10] || (w[10] = (X) => t(K).promptCreateFolder())
                }, "＋", 8, jl)
              ])
            ]),
            e("nav", Fl, [
              Te(bt, {
                active: t(o),
                onSelect: Q
              }, null, 8, ["active"])
            ])
          ]),
          e("section", Ol, [
            m.value === "stars" && t(gt).accountConfigured === !1 ? (s(), ce(mt, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: w[11] || (w[11] = (X) => D.value = !0)
            })) : m.value === "stars" ? (s(), n(z, { key: 1 }, [
              e("header", zl, [
                Te(vt, { onOpenAiSettings: M })
              ]),
              e("div", Wl, [
                Te(sn, {
                  active: t(o) && m.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : m.value === "trending" ? (s(), ce(yt, { key: 2 })) : m.value === "awesome" ? (s(), ce(jt, { key: 3 })) : m.value === "repos" ? (s(), ce(Bs, {
              key: 4,
              active: t(o) && m.value === "repos"
            }, null, 8, ["active"])) : R("", !0)
          ])
        ])
      ]),
      T.value ? (s(), ce(t(l), {
        key: 1,
        open: T.value,
        title: "GitHub 使用手册",
        spreads: t(Ya),
        "help-selector": ".gh-github-help",
        onClose: w[12] || (w[12] = (X) => T.value = !1)
      }, null, 8, ["open", "spreads"])) : R("", !0),
      Te(Dn),
      Te(Ba)
    ], 10, Va));
  }
}), si = /* @__PURE__ */ Ce(Bl, [["__scopeId", "data-v-2c644ba0"]]);
export {
  si as default
};
